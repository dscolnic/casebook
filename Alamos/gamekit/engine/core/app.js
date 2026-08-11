// app.js — the wiring three entry points kept forking.
//
// `main.js` is per game and always will be to some degree: each game owns its
// title card, its setup overlay and its HUD chrome. What it should not own is
// the machinery every game needs identically, because that is where the fork
// bugs come from — the passage quiz that shipped in one game of three, the
// interior manager written twice, the debug handle added three times by hand,
// the walk-cost bug that existed in exactly one copy.
//
// Everything here is a factory taking the game's own pieces as arguments, so it
// works whether the game reaches the world through the engine's module or
// through its own. Nothing here reads a global.
import { buildInteriorBuilding, DISTRICT_X } from '../world/interiorBuilding.js';
import { getState, getNextMissionStop, startDay, restartDay, tickDay, endDayNow, jumpToMission } from './gameState.js';
import { nextMissionStopIndex, openStopIndices, isPersonStopForIdx, getCurrentMission, completedMissionStops } from './simulation.js';
import { esc } from './utils.js';

/**
 * Which area has a case open right now, or null.
 *
 * A person stop counts as nothing open anywhere: the player is looking for
 * somebody, and a lit stand in an empty room would send them the wrong way.
 */
export function openCaseGroup(){
  const groups = openCaseGroups();
  return groups.size ? [...groups][0] : null;
}

/**
 * Every area with a call open right now.
 *
 * The player picks their own order, so more than one stand can be lit at once.
 * Person stops are not in here: they are answered by finding somebody, and a
 * lit stand in an empty room would send the player to the wrong place.
 */
export function openCaseGroups(){
  const state = getState();
  const out = new Set();
  if(!state) return out;
  const m = getCurrentMission(state);
  if(!m) return out;
  for(const i of openStopIndices(state)){
    if(isPersonStopForIdx(state, i)) continue;
    out.add(m.stops[i].group);
  }
  return out;
}

/**
 * The interiors: one walkable room per area, built on first entry, in a
 * district far from the town. Returns the manager the entry point drives.
 *
 * The caller supplies the moving parts rather than the module they come from:
 * two of the three games have their own world module with a different API, and
 * the point of this is that neither has to grow a copy of the logic.
 *
 *   scene, camera            three.js handles
 *   theme                    read for `interiors` and `content.ROSTER`
 *   def(groupId)             the area's name, code and colour
 *   colliders, interactables the world's own arrays; rooms push into them
 *   player                   { getPosition, teleport, setGround, setBounds }
 *   townGround, townBounds    restored on the way out
 *   onEnter(id)               charge time, if this room holds the open case
 */
export function createInteriors({
  scene, camera, theme, def,
  colliders, interactables,
  player, townGround, townBounds,
  onEnter,
}){
  const rooms = new Map();
  let inside = null;
  let sinceCheck = 0;
  // `scene` and `camera` may still be undefined when this is built: two of the
  // three games assign theirs inside initWorld/initPlayer, and the manager has
  // to exist before the frame loop starts. Resolve them at first use, and
  // accept a getter for a game that hands one over.
  const live = (v) => (typeof v === 'function' ? v() : v);

  /** The person this room's case is about, and the line under their name. */
  function caseFor(groupId){
    const roster = theme.content?.ROSTER ?? [];
    const here = roster.filter(p => p.division === groupId);
    if(!here.length) return {};
    const seed = [...groupId].reduce((a, c) => a + c.charCodeAt(0), 0);
    const person = here[seed % here.length];
    const prose = String(person.bio || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { name: person.name, line: prose.split(/(?<=[.?!])\s/)[0] || '' };
  }

  function roomFor(id){
    if(rooms.has(id)) return rooms.get(id);
    const spec = theme.interiors?.[id];
    if(!spec) return null;
    const d = def?.(id);
    const order = (theme.content?.GROUPS ?? []).findIndex(g => g.id === id);
    const who = caseFor(id);
    const room = buildInteriorBuilding(live(scene), {
      id, index: Math.max(0, order),
      name: d?.name ?? id, code: d?.code ?? '',
      colour: d?.color,
      // How the room is *built* is the theme's, not the area's: a wartime
      // building on a mesa should not be a Riverton laboratory with different
      // numbers on the screen.
      style: theme.interiorStyle ?? 'lab',
      ...spec,
      caseName: who.name, caseLine: who.line,
    });
    // The room's walls and its case stand join the arrays the town already
    // uses. Nothing leaks: the raycast stops at twelve metres and the collision
    // boxes are four kilometres away in x.
    colliders.push(...room.colliders);
    interactables.push(...room.interactables);
    room.setVisible(false);
    rooms.set(id, room);
    return room;
  }

  return {
    /** True when the player is standing in one. */
    get current(){ return inside; },
    /** Does this theme have a room for this area at all? */
    has: (id) => !!theme.interiors?.[id],
    enter(id){
      const room = roomFor(id);
      if(!room) return false;
      onEnter?.(id);
      inside = { id, room, back: player.getPosition().clone(), yaw: live(camera).rotation.y };
      room.setVisible(true);
      room.setCaseOpen(openCaseGroups().has(id));
      player.setGround(room.groundHeight);
      player.setBounds(DISTRICT_X + 400);
      player.teleport(room.enterTransform, room.enterTransform.yaw);
      return true;
    },
    exit(){
      if(!inside) return false;
      const { room, back, yaw } = inside;
      room.setVisible(false);
      inside = null;
      player.setGround(townGround);
      player.setBounds(townBounds);
      player.teleport({ x: back.x, z: back.z }, yaw + Math.PI);
      return true;
    },
    /** Per frame. Only the room the player is in repaints its screen. */
    update(delta){
      if(!inside) return;
      inside.room.update(delta, live(camera));
      // The case can close while the player is standing in the room — they
      // answer it, and the marker has to go out with it.
      sinceCheck += delta;
      if(sinceCheck > 0.4){
        sinceCheck = 0;
        inside.room.setCaseOpen(openCaseGroups().has(inside.id));
      }
    },
  };
}

/**
 * The E-key dispatch, as a table rather than an if-chain per game.
 *
 * `handlers` maps an interactable's `type` to a function. `fallback` catches
 * anything the game has not declared, so a new interactable type shows up as
 * one silent no-op rather than three.
 */
export function makeActivate(handlers, fallback){
  return function activate(target){
    if(!target) return false;
    const fn = handlers[target.type] ?? fallback;
    if(!fn) return false;
    fn(target);
    return true;
  };
}

/**
 * The handle a throttled tab needs.
 *
 * A background tab gets no requestAnimationFrame: the scene renders dark,
 * nothing animates, and every interaction looks broken whether it is or not. A
 * dynamic import() from the console is no help either — it resolves to a second
 * copy of the module graph with its own empty world. So each game exposes the
 * running one, and this is that, in one place, under a name derived from the
 * theme.
 */
export function exposeDebug(theme, parts){
  if(typeof window === 'undefined') return;
  const name = theme?.id ? String(theme.id).replace(/[^a-z0-9]/gi, '') : 'game';
  window[name] = parts;
  window.gamekit = window.gamekit ?? parts;
}

/**
 * The day: plan it, run it down, restart it, close it.
 *
 * A mission is a working day now. It opens with a plan — the calls, where they
 * are, and how far apart — and the countdown does not start until the player
 * accepts it. After that the clock runs in real time whatever they are doing,
 * including while a question is open, because reading the panel is part of the
 * day and pausing there would make thinking free.
 *
 * The entry point owns the world, so it passes in the two things this cannot
 * know: where a group's stop physically is, and where the player starts.
 *
 *   positionOf(groupId)  {x, z} or null
 *   spawn                {x, z}
 *   personPositionOf(i)  optional, for a person stop
 *   onPlanShown/onDayStart/onDayEnd  hooks for pointer lock and HUD
 */
export function createDay({
  theme, def, positionOf, spawn, onDayStart, onDayEnd, mapHTML, ui, pace,
}){
  let planOpen = false;

  // ——— turning in for the night ————————————————————————————————————
  //
  // The last call of the day does not end the day: whatever is left on the
  // clock is the player's to walk the town with. That left no way *out* of an
  // evening except waiting for the light to go, which on a day with three
  // hours spare is three minutes of standing still.
  //
  // So once every call is made there is a button. It lives here rather than in
  // a game's HUD because `main.js` and `index.html` are forked three ways and
  // this is exactly the kind of thing that ships in one game of three.
  let bar = null;
  const canSleep = () => {
    const state = getState();
    return !!state && state.status === 'playing' && state.dayStarted && !state.dayEnded
      && !planOpen && openStopIndices(state).length === 0;
  };
  const panelUp = () =>
    ['overlay', 'verdictOverlay', 'statsOverlay', 'mapOverlay', 'settingsOverlay']
      .some(id => document.getElementById(id)?.classList.contains('show'));

  function ensureBar(){
    if(bar) return bar;
    bar = document.createElement('div');
    bar.id = 'turnInBar';
    bar.className = 'hidden';
    // The keyboard hint is not decoration. While the pointer is locked the
    // mouse belongs to the camera and no DOM click can land, so Enter is the
    // path most players will actually take; the button is what they see.
    bar.innerHTML = '<button class="btn primary" id="turnInBtn" type="button">'
      + 'Go to sleep, wake up tomorrow.<small>Enter</small></button>';
    document.body.appendChild(bar);
    bar.querySelector('#turnInBtn').onclick = () => api.sleep();
    return bar;
  }

  /** Show or hide the button. Called every frame; touches the DOM only on a change. */
  function refreshBar(){
    const want = canSleep() && !panelUp();
    const el = want ? ensureBar() : bar;
    if(!el) return;
    el.classList.toggle('hidden', !want);
  }

  // ——— reading the briefing again ————————————————————————————————————
  //
  // The day's briefing is a hundred and fifty words and it used to sit under
  // the objective banner for the whole day, so the thing a walking player
  // actually needs from that banner — who is still to see — was buried under
  // prose they read two minutes ago. The banner is now just the calls, and the
  // briefing is one button away.
  function installBriefingButton(){
    if(typeof document === 'undefined') return;
    const host = document.getElementById('objective');
    if(!host || document.getElementById('briefingBtn')) return;
    const b = document.createElement('button');
    b.id = 'briefingBtn';
    b.type = 'button';
    b.textContent = 'Why today matters';
    // Reopening the plan is a briefing, not a restart: `showPlan` puts the day
    // card up with "Back to it" on it and the countdown stops while it is open.
    b.onclick = () => api.showPlan();
    host.appendChild(b);
  }
  installBriefingButton();

  window.addEventListener('keydown', (e) => {
    if(e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    if(panelUp() || !canSleep()) return;
    e.preventDefault();
    api.sleep();
  });
  // The verdict card offers the same thing at the moment the last call closes,
  // where the player is already looking. It has no handle on the day, so it
  // asks for one.
  window.addEventListener('projecty:sleep', () => api.sleep());

  // ——— jumping to a mission —————————————————————————————————————————
  //
  // Project Y and the hospital each had this in their own settings panel, with
  // their own fifteen <option> tags typed into index.html — which had already
  // drifted from the real mission titles — and the four themes served from
  // gamekit had it in no form at all. Fifth fork bug of the same shape.
  //
  // It belongs to the day controller because a jump is a day operation: the
  // week changes, so the clock, the budget and the plan all have to be rebuilt,
  // and this is the object that knows how to do that.
  function installMissionJump(){
    if(typeof document === 'undefined') return;
    // Two shapes of settings panel across the three entry points.
    const body = document.querySelector('#settingsOverlay .sheetBody')
      || document.getElementById('settingsPanel');
    if(!body || document.getElementById('missionJump')) return;
    const missions = theme?.content?.MISSIONS ?? [];
    if(missions.length < 2) return;
    const row = document.createElement('div');
    row.className = 'settingRow missionJumpRow';
    row.innerHTML =
      '<span><b>Jump to a day</b><small>Opens that day fresh. Anything already answered '
      + 'in it is cleared.</small></span>'
      + '<div class="missionJump" id="missionJump">'
      + '<select id="missionJumpSelect">'
      + missions.map((m, i) =>
          `<option value="${i + 1}">${i + 1} — ${esc(m.title ?? '')}</option>`).join('')
      + '</select>'
      + '<button class="btn small" id="missionJumpBtn" type="button">Go</button></div>';
    // Above the restart row, which should stay last where there is one.
    body.insertBefore(row, body.querySelector('.settingRow.danger') ?? null);
    const sel = row.querySelector('#missionJumpSelect');
    // The open panel should show where the player actually is.
    const sync = () => { const s = getState(); if(s) sel.value = String(s.week); };
    sync();
    document.getElementById('settingsBtn')?.addEventListener('click', sync);
    row.querySelector('#missionJumpBtn').onclick = () => api.jumpTo(+sel.value);
  }
  installMissionJump();

  const stopPositions = () => {
    const state = getState();
    const m = getCurrentMission(state);
    if(!m) return [];
    return m.stops.map(s => positionOf?.(s.group) ?? null);
  };

  /**
   * What yesterday left behind.
   *
   * Fifteen days of a campaign in which day 7's card reads the same whether
   * day 4 held or fell over is not a story, it is fifteen first days. The
   * results are already stored — `missionResults` is keyed `${week}-${stop}` —
   * and nothing ever asked. One line, and it is the *engine* that says it,
   * because a day card written to assume success would be lying to half the
   * players who read it.
   */
  function continuityHTML(state){
    const week = state?.week ?? 1;
    if(week < 2) return '';
    const rows = Object.entries(state.missionResults ?? {})
      .filter(([k]) => k.startsWith(`${week - 1}-`))
      .map(([, v]) => v);
    if(!rows.length) return '';
    const bad = rows.filter(r => !r.correct).length;
    const text = bad === 0
      ? `Everything you called on day ${week - 1} held overnight.`
      : bad === rows.length
        ? `None of day ${week - 1}'s calls held. Everything built on them is being worked again from the start.`
        : `${bad} of day ${week - 1}'s ${rows.length} calls did not hold. What was built on them is being checked again while you work.`;
    return `<div class="planSince ${bad ? 'planSinceBad' : ''}">${esc(text)}</div>`;
  }

  function planHTML(resuming = false){
    const state = getState();
    const m = getCurrentMission(state);
    if(!m) return '';
    const done = new Set(completedMissionStops(state));
    // No distances. The map shows where these are and how far apart they look;
    // printing metres beside each one turns choosing a route into arithmetic,
    // and reads as though the game is telling you how long each will take.
    const rows = m.stops.map((s, i) => {
      const person = isPersonStopForIdx(state, i);
      const d = def?.(s.group);
      const made = done.has(i);
      return `<tr class="${made ? 'planDone' : ''}"><td class="planNum">${made ? '✓' : i + 1}</td>`
        + `<td><b>${esc(d?.name ?? s.group)}</b><div class="planTask">${esc(s.task ?? '')}</div></td>`
        // What a non-person stop *is* depends on the game. In a town it is a
        // room you walk into; in Mission Control it is a console on the floor
        // you are already standing on, and calling that "a room" sent players
        // looking for a door that does not exist.
        + `<td class="planKind">${made ? 'made' : person ? 'a person' : (theme.stopNoun ?? 'a room')}</td></tr>`;
    }).join('');
    // The map first: it is what the player is choosing an order from, and a
    // plan drawn to the site's own aspect can be seventeen hundred pixels tall,
    // so under a table in a 70vh card it is a map nobody ever sees.
    return `<div class="planCard">`
      + continuityHTML(state)
      + `<div class="planStake">${esc(m.stake || m.objective || '')}</div>`
      + (mapHTML ? `<div class="planMap">${mapHTML()}</div>` : '')
      + `<table class="planTable"><thead><tr><th></th><th>Call</th><th></th></tr></thead>`
      + `<tbody>${rows}</tbody></table>`
      // One line. The rest of what used to be here — how fast the clock runs
      // while you walk, drive or read — is a rule the player learns by playing
      // and read past by everyone else.
      + `<div class="planNote">${resuming
          ? `${openStopIndices(state).length} still open. Take them in whatever order.`
          : 'Take them in whatever order.'}</div>`
      + `</div>`;
  }

  const api = {
    get planOpen(){ return planOpen; },
    // The entry point's own end-of-day card uses the same overlay this does.
    ui,
    /**
     * Put the plan up. The countdown does not move while it is open.
     *
     * It shows for a day already in progress too, as a briefing rather than a
     * plan — the games auto-save, so most sessions after the first resume a
     * half-finished day, and skipping the card meant being dropped into the
     * town with no map and no list of what was still owed.
     */
    showPlan(){
      const state = getState();
      const m = getCurrentMission(state);
      if(!m) return;
      const resuming = !!state.dayStarted && !state.dayEnded;
      planOpen = true;
      ui.open(`Day ${state.week} — ${m.title}`, planHTML(resuming), [
        resuming
          ? { id: 'planStart', label: 'Back to it', primary: true, onClick: () => this.resume() }
          : { id: 'planStart', label: 'Start the day', primary: true, onClick: () => this.start() },
      ]);
    },
    /** Close a briefing without touching the clock. */
    resume(){
      planOpen = false;
      ui.close();
      onDayStart?.(getState()?.dayBudget ?? 0);
    },
    /** Accept the plan: budget the day from the route and start the clock. */
    start(){
      const budget = startDay(stopPositions(), spawn?.() ?? { x: 0, z: 0 });
      planOpen = false;
      ui.close();
      onDayStart?.(budget);
    },
    /**
     * Go to another day. Debug affordance, and the only way to see the back
     * half of a fifteen-day campaign without playing to it.
     *
     * `jumpToMission` clears that day's progress and puts the day back in its
     * unopened state, so what the player gets is the plan card for the new day
     * with a budget measured from its own route.
     */
    jumpTo(week){
      if(!jumpToMission(week)) return false;
      planOpen = false;
      refreshBar();
      // Close whatever settings panel the game has — the two shapes again.
      document.getElementById('settingsOverlay')?.classList.remove('show');
      document.getElementById('settingsPanel')?.classList.add('hidden');
      this.showPlan();
      return true;
    },
    /** Same day again, from the top. */
    restart(){
      restartDay(stopPositions(), spawn?.() ?? { x: 0, z: 0 });
      planOpen = false;
      this.showPlan();
    },
    /**
     * Per frame, in real seconds. Returns 'expired' once, when it runs out.
     *
     * `pace()` is the entry point's answer to "is the player reading rather
     * than walking?" — a quarter rate while a panel is up. The plan itself is
     * not paced, it is paused: nothing has started yet.
     */
    tick(delta){
      refreshBar();
      if(planOpen) return null;
      return tickDay(delta, pace ? pace() : 1);
    },
    /**
     * Turn in early. Only legal with every call made — the day is retaken when
     * one is still open, so a sleep button that worked then would be a button
     * for throwing the day away.
     *
     * Ends the same way the clock running out ends it, so a game has one
     * end-of-day card rather than two.
     */
    sleep(){
      if(!canSleep()) return false;
      endDayNow();
      refreshBar();
      onDayEnd?.(0);
      return true;
    },
    /** The day ran out or the player closed it. */
    close(){
      const state = getState();
      const outstanding = openStopIndices(state).length;
      onDayEnd?.(outstanding);
      return outstanding;
    },
  };
  return api;
}

/**
 * Walking up to somebody, in one place.
 *
 * This is the fourth fork bug of its kind. The rule is simple — a person the
 * day wants asks their call's question, anybody else talks — and each entry
 * point implemented it separately. Two of the three decided it themselves,
 * against `nextMissionStopIndex`, which is the FIRST stop not yet made: if the
 * day's first open call was a room, the mission's own person was not recognised
 * at all, and walking up to them opened their biography while the call stayed
 * open with a marker over their head.
 *
 * The decision belongs to `openPersonVisit`, which checks every open call and
 * returns quietly when this is nobody today wants. That quiet return is the
 * whole protocol, and the only thing a caller has to do is notice it.
 *
 * The DOM stays with the game: `showPassage` is called only when neither a
 * funding request nor a call claimed this person.
 *
 * @param npc          the crowd member, if the game found one
 * @param char         their roster entry
 * @param showPassage  (char) => void — open this person's biography and quiz
 * @param opts.openPersonVisit    required; the engine's, or the game's re-export
 * @param opts.openSpecialRequest optional; games with a funding meeting
 * @param opts.isSpecialRequestActive, opts.getSpecialRequest  same
 * @param opts.division  fallback division id when the roster entry has none
 * @returns true when a panel opened, false when the passage was shown
 */
export function openPersonOrPassage(npc, char, showPassage, opts = {}){
  const {
    openPersonVisit, openSpecialRequest,
    isSpecialRequestActive, getSpecialRequest,
    division = 'TRI',
  } = opts;
  const overlay = typeof document !== 'undefined' ? document.getElementById('overlay') : null;
  const shown = () => !!overlay?.classList.contains('show');
  const state = getState();
  const person = npc ?? (char ? { char, division: char.division ?? division } : null);
  if(!person) return false;

  // A funding meeting takes the person for that day, and only that person.
  if(state && isSpecialRequestActive?.(state) && openSpecialRequest){
    const req = getSpecialRequest?.(state.week);
    if(req && char?.id === req.personId){
      const before = shown();
      const opened = openSpecialRequest(person);
      if(opened || (shown() && !before)) return true;
    }
    // A request is live and this is somebody else. They may still owe the day a
    // call: this used to be an `else if`, so a live request sent every other
    // mission person to their passage.
  }
  if(openPersonVisit){
    // Ask, do not infer. `openPersonVisit` reports whether it opened the
    // question; the overlay test below is only for a caller still passing an
    // older one, and it is wrong whenever a panel was already open.
    const before = shown();
    const opened = openPersonVisit(person);
    if(opened === true) return true;
    if(opened === undefined && shown() && !before) return true;
  }
  showPassage?.(char);
  return false;
}
