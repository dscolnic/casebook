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
import { nextMissionStopIndex, openStopIndices, isPersonStopForIdx, getCurrentMission } from './simulation.js';
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

  function planHTML(){
    const state = getState();
    const m = getCurrentMission(state);
    if(!m) return '';
    const here = spawn?.() ?? { x: 0, z: 0 };
    const rows = m.stops.map((s, i) => {
      const p = positionOf?.(s.group);
      const away = p ? Math.round(Math.hypot(p.x - here.x, p.z - here.z)) : null;
      const person = isPersonStopForIdx(state, i);
      const d = def?.(s.group);
      return `<tr><td class="planNum">${i + 1}</td>`
        + `<td><b>${esc(d?.name ?? s.group)}</b><div class="planTask">${esc(s.task ?? '')}</div></td>`
        + `<td class="planKind">${person ? 'a person' : 'a room'}</td>`
        + `<td class="planDist">${away == null ? '—' : `${away} m`}</td></tr>`;
    }).join('');
    return `<div class="planCard">`
      + `<div class="planStake">${esc(m.stake || m.objective || '')}</div>`
      + `<table class="planTable"><thead><tr><th></th><th>Call</th><th></th><th>from here</th></tr></thead>`
      + `<tbody>${rows}</tbody></table>`
      + `<div class="planNote">Take them in whatever order you like. The clock runs from the moment you start — walking, driving, reading and answering all cost the same time.</div>`
      + (mapHTML ? `<div class="planMap">${mapHTML()}</div>` : '')
      + `</div>`;
  }

  return {
    get planOpen(){ return planOpen; },
    // The entry point's own end-of-day card uses the same overlay this does.
    ui,
    /** Put the plan up. The countdown does not move until `start()`. */
    showPlan(){
      const state = getState();
      const m = getCurrentMission(state);
      if(!m) return;
      planOpen = true;
      ui.open(`Day ${state.week} — ${m.title}`, planHTML(), [
        { id: 'planStart', label: `Start the day`, primary: true, onClick: () => this.start() },
      ]);
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
