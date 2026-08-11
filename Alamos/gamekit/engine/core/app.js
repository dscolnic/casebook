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
import { getState, getNextMissionStop, startDay, restartDay, tickDay } from './gameState.js';
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

  const stopPositions = () => {
    const state = getState();
    const m = getCurrentMission(state);
    if(!m) return [];
    return m.stops.map(s => positionOf?.(s.group) ?? null);
  };

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

  return {
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
      if(planOpen) return null;
      return tickDay(delta, pace ? pace() : 1);
    },
    /** The day ran out or the player closed it. */
    close(){
      const state = getState();
      const outstanding = openStopIndices(state).length;
      onDayEnd?.(outstanding);
      return outstanding;
    },
  };
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
    // A request is live and this is somebody else: they still talk.
  } else if(openPersonVisit){
    const before = shown();
    openPersonVisit(person);
    if(shown() && !before) return true;
  }
  showPassage?.(char);
  return false;
}
