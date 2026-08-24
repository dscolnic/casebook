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
import { addProbeStations } from '../world/interiorStations.js';
import { probeKey, probeReadsFor, setProbeSited, markProbeRead } from './questionUI.js';
import { getState, getNextMissionStop, startDay, restartDay, tickDay, endDayNow, jumpToMission, save,
         spendReserve } from './gameState.js';
import { nextMissionStopIndex, openStopIndices, isPersonStopForIdx, getCurrentMission, completedMissionStops,
         getPersonIdForStop } from './simulation.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { callLabel } from './place.js';
import { esc } from './utils.js';
import { DAY_NOUN, RUN_SKIP_COST } from './constants.js';
import { readRating, postRating } from './cloudSave.js';

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
 * What the instrument in a room should be showing.
 *
 * Every area room has a live screen, and it used to show the same authored rows
 * whatever the day was doing — so a player walked into Control & Readout, read a
 * generic tune-up panel, then clicked the stand and met a completely different
 * instrument in a modal. The screen on the wall and the question in front of you
 * were about different things.
 *
 * Now the room shows *today's* instrument, derived from the open call:
 *
 *   DIAGNOSIS  its own readings — the panel is literally what this format is
 *   SWEEP      the axis, its range, and what the instrument reads before it moves
 *   BALLPARK   the quantities the estimate is given
 *   otherwise  the theme's authored rows, which is the old behaviour
 *
 * Derived in the engine rather than authored per theme, so all ten games get it
 * and there is nothing new to type in a book.
 */
function stationForOpenCall(theme, groupId, calcs){
  const state = getState();
  const m = state ? getCurrentMission(state) : null;
  if(!m) return null;
  const idx = openStopIndices(state).find(i => m.stops[i]?.group === groupId);
  if(idx === undefined) return null;
  const stop = m.stops[idx];
  const lesson = theme.content?.CURRICULUM?.[groupId]?.[stop.lesson];
  const ch = lesson?.game;
  if(!ch) return null;
  const kind = String(ch.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
  const num = (v) => (Math.round(v * 1000) / 1000).toString();

  if(kind === 'DIAGNOSIS' && (ch.readings ?? []).length){
    return { kind: 'panel', title: lesson.title ?? 'Panel', animated: true,
      rows: ch.readings.slice(0, 5).map(r => ({
        label: [r.zone, r.label].filter(Boolean).join(' · '),
        value: r.value, status: r.status })) };
  }
  if(kind === 'SWEEP' && ch.sweep){
    const w = ch.sweep, a = w.axis ?? {};
    return { kind: 'panel', title: lesson.title ?? 'Sweep', animated: true, rows: [
      { label: a.label || 'Control', value: `${num(a.min)}–${num(a.max)} ${a.unit ?? ''}`.trim(), status: 'normal' },
      { label: 'Set to', value: `${num(w.start)} ${a.unit ?? ''}`.trim(), status: 'low' },
      { label: w.readout?.label || 'Response', value: num(w.baseline ?? 0), status: 'low' },
      { label: 'Sweep', value: 'not run', status: 'alarm' },
    ] };
  }
  if(kind === 'BALLPARK'){
    const spec = calcs?.[`${groupId}-${lesson.day}`];
    const givens = (spec?.givens ?? []).slice(0, 4);
    if(givens.length){
      return { kind: 'panel', title: lesson.title ?? 'Estimate', animated: true,
        rows: givens.map(g => ({ label: String(g), value: '', status: 'normal' })) };
    }
  }
  return null;
}

/**
 * The PROBE this room's open call is, if it is one.
 *
 * Used to decide whether to put stations in the room. Same lookup as
 * `stationForOpenCall`, and deliberately not folded into it: that one answers
 * "what does the wall screen show", which every format can answer, and this one
 * answers "does this room contain a chain the player walks", which only PROBE does.
 */
export function probeForOpenCall(theme, groupId){
  const state = getState();
  const m = state ? getCurrentMission(state) : null;
  if(!m) return null;
  const idx = openStopIndices(state).find(i => m.stops[i]?.group === groupId);
  if(idx === undefined) return null;
  const stop = m.stops[idx];
  const lesson = theme.content?.CURRICULUM?.[groupId]?.[stop.lesson];
  const ch = lesson?.game;
  if(!ch || String(ch.type ?? '').toUpperCase() !== 'PROBE' || !ch.probe) return null;
  return { lesson, ch, probe: ch.probe, key: probeKey(groupId, lesson.day) };
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
  // Estimate specs, so a BALLPARK room can show the quantities it is given. The
  // caller passes them because app.js must not reach for a game's own module.
  calcs,
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
    // The name on the door, which is not the area's name: the area is "Discovery
    // & Imaging" and the building is the Survey Telescope. The room builder reads
    // it to decide what KIND of room to build, so the layout matches the place the
    // player walked into.
    const site = theme.site ?? {};
    const place = (site.buildings ?? []).find(b => b.group === id)
               ?? (site.plan?.rooms ?? []).find(r => r.group === id);
    const room = buildInteriorBuilding(live(scene), {
      id, index: Math.max(0, order),
      name: d?.name ?? id, code: d?.code ?? '',
      placeName: place?.name ?? '',
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
      // The screen on the wall shows the instrument this call is actually about.
      const station = stationForOpenCall(theme, id, calcs);
      if(station) room.screen?.set?.(station);
      // A PROBE's chain is physical: one post per station, down the room, in the
      // order the chain runs. Built on entry rather than with the room, because
      // which call is open here changes from day to day and so does the chain.
      const probe = probeForOpenCall(theme, id);
      if(probe && room.probeChain?.key !== probe.key){
        room.probeChain?.dispose?.();
        const chain = addProbeStations(room, probe.probe);
        if(chain){
          chain.key = probe.key;
          room.probeChain = chain;
          interactables.push(...chain.interactables);
          // The hook keeps the posts honest: a reading taken in the panel lights
          // its post too, so the room and the card never disagree.
          setProbeSited(probe.key, true, (sid) => chain.setRead(sid));
        }
      }
      // Anything read earlier today is still read: the player walked out to think
      // and came back, which is not a reason to take six readings again.
      if(probe && room.probeChain) probeReadsFor(probe.key).forEach(sid => room.probeChain.setRead(sid));
      player.setGround(room.groundHeight);
      player.setBounds(DISTRICT_X + 400);
      player.teleport(room.enterTransform, room.enterTransform.yaw);
      return true;
    },
    /**
     * Take a reading at one of this room's probe stations.
     *
     * The world writes into the same store the panel reads from, so a station read
     * at the post is already read when the case is opened at the stand. Returns how
     * many of the chain have been read, or null when this is not one of them.
     */
    readStation(stationId){
      const chain = inside?.room?.probeChain;
      if(!chain || !chain.ids.includes(String(stationId))) return null;
      markProbeRead(chain.key, stationId);
      chain.setRead(stationId);
      return probeReadsFor(chain.key).length;
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

/**
 * The corner map: a small always-on plan in the top right, instead of a button
 * you have to remember to press.
 *
 * The full map was a keystroke away and still went unused, because a map you
 * have to ask for does not help you decide where to walk — it helps you recover
 * once you are already lost. This is the version that answers "which way is the
 * thing I am walking to" without stopping the game.
 *
 * It re-renders on a timer rather than per frame. `renderMap` builds a whole
 * SVG string, which is far too much to do sixty times a second and completely
 * unnecessary: at walking pace nothing on it moves meaningfully inside a third
 * of a second.
 *
 * Clicking it opens the full map, so the button it replaces still exists in the
 * only place anybody looks for it.
 */
export function createMiniMap({ renderMap, onOpen, size = 171, every = 320 } = {}){
  if(typeof document === 'undefined' || !renderMap) return null;
  const el = document.createElement('div');
  el.id = 'miniMap';
  el.className = 'miniMap';
  el.title = 'Click for the full map';
  document.body.appendChild(el);

  let last = 0, on = true;
  const draw = () => { el.innerHTML = renderMap({ maxW: size, maxH: size, mini: true }); };
  el.addEventListener('click', (e) => { e.stopPropagation(); onOpen?.(); });

  draw();
  return {
    el,
    /** Called from the frame loop; throttled internally. */
    update(nowMs = performance.now()){
      if(!on) return;
      if(nowMs - last < every) return;
      last = nowMs;
      draw();
    },
    /** Hidden while a panel or a sheet is up, so it never sits over a card. */
    setVisible(v){ on = v; el.classList.toggle('hidden', !v); if(v) draw(); },
  };
}

/**
 * The card that closes a campaign.
 *
 * Fifteen missions used to end with the words "Campaign complete" appearing in the
 * corner of the HUD, and nothing else: no resolution, no ending, no statement of
 * whether any of it worked. A theme now writes `ending: [...]` in its manifest —
 * paragraphs in its own voice, the counterpart of `opening` — and this puts them up.
 *
 * Shared, because all three entry points need it and the last thing this repo needs
 * is a fourth copy of the same card.
 */
export function showEnding(theme, ui, onClose){
  const paras = theme?.ending ?? [];
  if(!paras.length) return false;
  ui.open(`${theme.title} — how it ends`,
    `<div class="briefBox endingCard">${paras.map(p => `<p>${p}</p>`).join('')}</div>`
    + historyHTML(theme)
    + ratingHTML(),
    [{ id: 'endingDone', label: 'Close', primary: true, onClick: () => { ui.close(); onClose?.(); } }]);
  mountRating();
  return true;
}

/**
 * What really happened, under the ending, in the games that re-enact something.
 *
 * WHY IT IS SEPARATE FROM THE ENDING AND NOT PART OF IT. The ending is the last
 * paragraph of the fiction and is addressed to the player — *that was your
 * fortnight* — which `checkStory` enforces. This is the opposite voice: it steps
 * out, names the real people and the real date, and says where the game departed
 * from the record. Folding the two together would either put a bibliography in
 * the middle of a story beat or leave the credit sounding like more fiction.
 *
 * WHY IT EXISTS AT ALL. The Quick Discoveries dramatise real work by people who
 * are named on the roster, and several of them are alive. A game may put a real
 * scientist in a room and have them ask for a number; what it may not do is
 * leave a player unable to tell which parts happened. Naming the date, the
 * institution and the compression is the difference between a dramatisation and
 * a claim about somebody.
 *
 * Absent on every game that invents its place, and inert there — a theme with no
 * `history` renders exactly what it rendered before.
 */
function historyHTML(theme){
  const paras = theme?.history ?? [];
  if(!paras.length) return '';
  return `<div class="briefBox historyCard">
    <p class="historyLabel">What really happened</p>
    ${paras.map(p => `<p>${p}</p>`).join('')}
  </div>`;
}

/**
 * Five stars on the card that closes a campaign.
 *
 * WHY IT IS DRAWN HIDDEN AND SHOWN LATER. There is no rating without an
 * account, and whether there is one cannot be known synchronously — the games
 * are served two ways and behind a static host `/api/ratings` is a 404. So the
 * block is written into the card empty-handed, `readRating()` decides, and it
 * is either filled in or removed. Drawing it and then leaving dead stars behind
 * on a static host would be worse than never offering it: a control that
 * answers nothing teaches the player not to press the next one.
 *
 * WHY IT SHOWS WHAT THEY SAID LAST TIME. A rating is one per account per game,
 * so a second campaign re-rates rather than voting twice. Offering an empty row
 * of stars over a rating already given asks a question whose answer is on the
 * server, and quietly replaces it whatever they press.
 */
const RATE_WORDS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];

function ratingHTML(){
  const stars = [1, 2, 3, 4, 5].map(n =>
    `<button class="rateStar" type="button" data-stars="${n}" role="radio" aria-checked="false"
       aria-label="${n} out of 5 — ${RATE_WORDS[n]}">★</button>`).join('');
  return `<div class="briefBox rateBox hidden" id="rateBox">
    <p class="rateAsk">How was it?</p>
    <div class="rateStars" id="rateStars" role="radiogroup" aria-label="Rate this game from 1 to 5">${stars}</div>
    <p class="rateNote" id="rateNote"></p>
  </div>`;
}

function mountRating(){
  const box = document.getElementById('rateBox');
  const row = document.getElementById('rateStars');
  const note = document.getElementById('rateNote');
  if(!box || !row || !note) return;
  const buttons = Array.from(row.querySelectorAll('.rateStar'));
  let mine = null;

  /** Fill up to n stars. `over` is a hover, which must not survive the pointer. */
  const paint = (n) => {
    buttons.forEach((b, i) => {
      b.classList.toggle('on', n != null && i < n);
      b.setAttribute('aria-checked', String(mine === i + 1));
    });
  };
  // The average is what the shelf shows, so the count goes with it here too:
  // 4.5 from two people and 4.5 from two hundred are the same number and not
  // the same claim.
  const standing = (avg, count) => (avg == null || !count) ? ''
    : ` It averages ${avg.toFixed(1)} from ${count} ${count === 1 ? 'player' : 'players'}.`;

  row.addEventListener('mouseleave', () => paint(mine));
  for(const b of buttons){
    const n = Number(b.dataset.stars);
    b.addEventListener('mouseenter', () => paint(n));
    b.addEventListener('focus', () => paint(n));
    b.addEventListener('click', async () => {
      buttons.forEach(x => { x.disabled = true; });
      note.textContent = 'Sending…';
      const out = await postRating(n);
      buttons.forEach(x => { x.disabled = false; });
      if(!out){
        // The rating did not land, and saying so is the point: a star that
        // lights up on a request that failed is a lie the player cannot see.
        note.textContent = 'That could not be sent. Try again in a moment.';
        paint(mine);
        return;
      }
      mine = out.mine;
      paint(mine);
      note.textContent = `Thanks — ${RATE_WORDS[mine].toLowerCase()}.${standing(out.avg, out.count)}`;
    });
  }

  readRating().then((out) => {
    if(!out) { box.remove(); return; }
    mine = out.mine;
    paint(mine);
    note.textContent = mine
      ? `You rated this ${mine} of 5.${standing(out.avg, out.count)} Press another star to change it.`
      : `Nobody sees who rated what.${standing(out.avg, out.count)}`;
    box.classList.remove('hidden');
  }).catch(() => box.remove());
}

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
  // Optional, and absent in every one-tier game: run an orientation lap and call
  // back when it is over. `main.js` supplies it because the TRIAL controller
  // needs the scene, which this file has never had.
  runLap,
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
    // A submarine runs watches and a hospital runs shifts, so the wording
    // follows whatever the theme calls a mission.
    const label = DAY_NOUN === 'Day'
      ? 'Go to sleep, wake up tomorrow.'
      : `Finish this ${DAY_NOUN.toLowerCase()} and move on.`;
    bar.innerHTML = '<button class="btn primary" id="turnInBtn" type="button">'
      + esc(label) + '<small>Enter</small></button>';
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
    // A key as well as a click, and the key is on the button. Clicking it means
    // releasing the pointer first, which is two deliberate actions to re-read a
    // paragraph — and the button spent its whole life inside a
    // `pointer-events:none` banner, where the click did nothing at all.
    b.innerHTML = 'Why today matters<small>B</small>';
    // Reopening the plan is a briefing, not a restart: `showPlan` puts the day
    // card up with "Back to it" on it and the countdown stops while it is open.
    b.onclick = () => api.showPlan();
    host.appendChild(b);
  }
  installBriefingButton();

  window.addEventListener('keydown', (e) => {
    if(e.code !== 'KeyB' || panelUp()) return;
    e.preventDefault();
    api.showPlan();
  });

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
    const noun = DAY_NOUN.toLowerCase();
    const text = bad === 0
      ? `Everything you called in ${noun} ${week - 1} has held since.`
      : bad === rows.length
        ? `Nothing you called in ${noun} ${week - 1} held. All of it is being worked again from the start.`
        : `${bad} of ${noun} ${week - 1}'s ${rows.length} calls did not hold. What was built on them is being checked again while you work.`;
    return `<div class="planSince ${bad ? 'planSinceBad' : ''}">${esc(text)}</div>`;
  }

  /**
   * The words and the formulas today's questions are entitled to expect.
   *
   * A day card said what had happened and who wanted what, and then the first
   * question used "state vector" as though the player had met it. The primer is
   * authored per mission — `mission.primer`, a term with its meaning or a
   * relationship with its symbols — and it is the last thing read before the
   * map, which is the last thing seen before the day starts.
   *
   * The terms on it are every term the day's questions will offer a definition
   * button for, so the list is as long as the day makes it and the definitions
   * are set as a definition list: a dozen bullets of "Name — meaning" is a wall,
   * and the same dozen with the word in front of its meaning is a glossary the
   * eye can skip through. The prose lines below it are the formula and what the
   * questions assume, which read as prose and stay a list.
   *
   * It is deliberately not the takeaway. A takeaway is what the day teaches,
   * and printing that here would answer the questions before they are asked;
   * `checkStory` fails a primer that contains a day's answer.
   */
  function primerHTML(m){
    const lines = (m.primer ?? []).filter(x => typeof x === 'string' && x.trim());
    if(!lines.length) return '';
    // A book may author its own primer, in which case there is no structured term
    // list and every line is prose as far as this knows.
    const terms = (m.primerTerms ?? []).filter(t => t?.name && t?.def);
    const rest = lines.slice(terms.length);
    // Vocabulary first, equations last. A formula is the densest thing on the
    // card and the one that assumes the most, so it reads better once the words
    // in it have been defined a few lines above.
    return `<div class="planPrimer"><h4>Worth knowing first</h4>`
      + (terms.length ? `<dl>${terms.map(t =>
          `<dt>${esc(t.name)}</dt><dd>${esc(t.def)}</dd>`).join('')}</dl>` : '')
      + (rest.length ? `<ul>${rest.map(l => `<li>${esc(l)}</li>`).join('')}</ul>` : '')
      + equationsHTML(m)
      + `</div>`;
  }

  /**
   * The course equations this day is the first to need.
   *
   * Above the vocabulary, because an equation is the one thing on the card the
   * player may have to hold in their hand while they work, and `normalize.js`
   * puts each one on the first day that touches it — so it is on screen before the
   * question that wants it, rather than assumed by it.
   */
  function equationsHTML(m){
    const eqs = (m.equations ?? []).filter(x => x?.e && x.card !== false);
    if(!eqs.length) return '';
    // Every symbol is named with its unit, and one sentence says what the
    // equation asserts. Printing `df/dt = (P_gen − P_load) / 2H` beside the
    // phrase "frequency as the running balance of supply and demand" is a label
    // rather than an explanation: a reader who does not already know what H is
    // cannot use the line, and a reader who does did not need it.
    return `<div class="planEqs">${eqs.map(x =>
      `<div class="planEq"><div class="planEqHead"><code>${esc(x.e)}</code>`
      + (x.c ? `<span>${esc(x.c)}</span>` : '') + `</div>`
      + (Array.isArray(x.v) && x.v.length
          ? `<p class="eqVars">${x.v.map(([sym, mean]) =>
              `<span><b>${esc(sym)}</b> ${esc(mean)}</span>`).join('')}</p>` : '')
      + (x.s ? `<p class="eqSays">${esc(x.s)}</p>` : '')
      + `</div>`).join('')}</div>`;
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
      const isPerson = isPersonStopForIdx(state, i);
      const made = done.has(i);
      // A call is an instruction — "Go to the Spectroscopy Dome", "Talk to Dr.
      // Nguyen" — not the subject it is about. The subject was all this printed,
      // and "Astrometry & Orbit" is the name of no room the player can find.
      const personId = isPerson ? getPersonIdForStop(state, i) : null;
      const person = personId ? HISTORIC_CHARACTERS.find(c => c.id === personId) : null;
      // A call is the instruction and nothing else. It used to carry the day's
      // question under it and a column saying "a person" or "a room" beside it:
      // the question is what the stop is for and reads as a second briefing,
      // and whether a call is somebody or somewhere is said by the call itself.
      // Across the card rather than down it. Three calls stacked as table rows
      // read as an itinerary in order, which is the one thing this list is not —
      // they are taken in whatever order the player likes, and side by side is
      // what that looks like.
      return `<div class="planCall${made ? ' planDone' : ''}">`
        + `<span class="planNum">${made ? '✓' : i + 1}</span>`
        + `<b>${esc(callLabel(person, s.group))}</b>`
        + `${made ? '<span class="planMade">made</span>' : ''}</div>`;
    }).join('');
    // Order: what happened, what you are called to, what you need to know, and
    // the map last — the map is what the player chooses a route from, so it is
    // the thing they should still be looking at when they press start.
    return `<div class="planCard">`
      + continuityHTML(state)
      + `<div class="planStake">${esc(m.stake || m.objective || '')}</div>`
      + `<div class="planCalls"><h4>Objectives</h4><div class="planCallRow">${rows}</div></div>`
      + primerHTML(m)
      + (mapHTML ? `<div class="planMap">${mapHTML()}</div>` : '')
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

      // ---- the orientation lap, before the plan rather than after it
      //
      // The plan card names six places and draws a map of them. On a site with a
      // far tier that map is of ground the player has never walked, so the lap
      // goes first: it is what makes the plan readable. Only when the day has not
      // already started — reopening the plan mid-morning is a briefing, and a
      // briefing should not restart a tutorial.
      if(!resuming && runLap){
        state.laps = state.laps ?? {};
        const lap = runLap.due(state.week, state.laps);
        if(lap){
          planOpen = true;
          // TWO buttons, and the second one is priced. A free "Skip it" taught
          // that the map is optional, and the map is what the day is planned
          // from; no way past at all makes a player who has walked that ground
          // twice walk it again to reach the lessons. So it is the wrong-call
          // shape: the free way on is to take the run, and $10 says get on with
          // the day. Paying marks the run done — you are buying the morning, not
          // renting it — and a run given up on (Esc) still does not, so the card
          // comes straight back with both options on it.
          //
          // The clock has not started either way: the plan is what starts it.
          const funds = getState().reserve ?? 0;
          const canPay = funds >= RUN_SKIP_COST;
          // A greyed-out button is only fair when the card says what is missing.
          const shortNote = canPay ? ''
            : `<p class="lapOutcome dim">Getting on with the day costs $${RUN_SKIP_COST}`
              + ` and Director funds are $${funds}. The run is the free way on.</p>`;
          ui.open(lap.title, runLap.cardHTML(lap) + shortNote, [
            { id: 'lapGo', label: 'Take the run', primary: true, onClick: () => {
              ui.close();
              runLap.start(lap, (r) => {
                // Done only if the run says the goal was reached. `ok` absent —
                // a lap that could not be built at all — still counts, or the
                // card loops for ever with nothing behind it.
                const done = r?.ok !== false;
                if(done) state.laps[lap.slot ?? lap.tier] = true;
                save();
                // A card about what just happened, before anything else. Without
                // it a run ends and the morning simply carries on, which reads as
                // the game ignoring the thing you were just doing — and on a
                // failed run leaves nobody any idea why they are being handed the
                // same card again.
                planOpen = true;
                // On a finished run the card says one thing and gets out of the
                // way: the run is not graded and its tally is already on the HUD
                // the player was just looking at, so a summary line under the
                // heading is a second description of what they have done.
                ui.open(done ? 'Congrats! You are now ready to start the day' : 'Not this time',
                  done ? '' : `<p class="lapOutcome">${esc(r?.summary ?? 'Not finished.')}</p>`
                    + `<p class="lapOutcome dim">It has to be done before the day`
                    + ` starts. Nothing is lost — the clock has not begun.</p>`,
                  [{ id: 'lapOn', label: done ? 'Get on with the day' : 'Take it again',
                    primary: true, onClick: () => { ui.close(); this.showPlan(); } }]);
              });
            } },
            { id: 'lapPay', label: `Pay $${RUN_SKIP_COST} and get on with the day`,
              disabled: !canPay,
              onClick: () => {
                // Charge first: spendReserve refuses when the money is not there,
                // and a run marked done by a payment that failed is a run bought
                // for nothing.
                if(!spendReserve(RUN_SKIP_COST)) return;
                state.laps[lap.slot ?? lap.tier] = true;
                save();
                ui.close();
                this.showPlan();
              } },
          ]);
          return;
        }
      }
      planOpen = true;
      ui.open(`${DAY_NOUN} ${state.week} — ${m.title}`, planHTML(resuming), [
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
     * than walking?" — the day is stopped while a panel is up, in every game.
     * The plan card is paused for a different reason: nothing has started yet.
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
