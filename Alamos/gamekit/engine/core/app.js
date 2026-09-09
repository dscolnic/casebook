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
// The day's shape, so what is seen through a room's door agrees with the sun.
import { dayBlendAt } from '../world/outdoorSite.js';

/**
 * The colours outside a room's door, read off the site. A theme whose site
 * declares a haze uses that as its sky; otherwise the fog colour; otherwise a
 * daylight grey. The ground is the terrain's base colour.
 */
function outsideOf(theme){
  const site = theme?.site ?? {};
  const look = theme?.look ?? {};
  const sky = site.atmosphere?.haze?.day ?? look.fog?.colour ?? 0xb9c4c8;
  const ground = site.terrain?.ground?.base ?? [116, 96, 68];
  return { sky, ground };
}
import { addProbeStations } from '../world/interiorStations.js';
import { addFixture, fixtureFor, sitedAt } from '../world/interiorFixtures.js';
import { siteForStop } from '../world/siting.js';
import { probeKey, probeReadsFor, setProbeSited, markProbeRead } from './questionUI.js';
import { getState, getNextMissionStop, startDay, restartDay, tickDay, endDayNow, jumpToMission, save,
         spendReserve } from './gameState.js';
import { nextMissionStopIndex, openStopIndices, isPersonStopForIdx, getCurrentMission, completedMissionStops,
         getPersonIdForStop } from './simulation.js';
import { HISTORIC_CHARACTERS } from './historicCharacters.js';
import { callLabel } from './place.js';
import { deliveryPieces, deliveryPlanLine } from './delivery.js';
import { esc } from './utils.js';
import { DAY_NOUN, RUN_SKIP_COST, STOPS_IN_ORDER, TIMED } from './constants.js';
// The five worked examples the mission card offers behind a button.
import { hasWorked, workedLabel, workedHTML, bindWorked } from './worked.js';
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
/**
 * The lesson of the call open in this area, or null. Both `stationForOpenCall`
 * and the fixture lookup need it, and they used to each find it their own way.
 */
function openLessonFor(theme, groupId){
  const state = getState();
  const m = state ? getCurrentMission(state) : null;
  if(!m) return null;
  const idx = openStopIndices(state).find(i => m.stops[i]?.group === groupId);
  if(idx === undefined) return null;
  const stop = m.stops[idx];
  return theme.content?.CURRICULUM?.[groupId]?.[stop.lesson] ?? null;
}

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
  // Called with the area's id and the built room. `onExit` is the other half of
  // it, and both exist so that something outside this file can put people in
  // the room and take them out again — see `stationIndoors` in crowd.js. This
  // module must not import the crowd: the entry point owns the cast.
  onEnter, onExit,
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
    // The room's slot in the interior district, which is `DISTRICT_X + index * GAP`.
    // TWO ROOMS MAY NOT SHARE AN INDEX. `findIndex` returns -1 for a minor place —
    // one that is not an area — and the old `Math.max(0, order)` turned every one
    // of those into slot 0, which is the first area's room: seven new rooms would
    // have been built inside Electrolysis Hall, on top of each other. Nothing
    // would have thrown and nothing would have looked wrong from outside.
    const groups = theme.content?.GROUPS ?? [];
    let order = groups.findIndex(g => g.id === id);
    if(order < 0){
      const minors = (theme.site?.buildings ?? []).map(b => b.enter).filter(Boolean);
      const at = minors.indexOf(id);
      order = groups.length + (at < 0 ? minors.length : at);
    }
    const who = caseFor(id);
    // The name on the door, which is not the area's name: the area is "Discovery
    // & Imaging" and the building is the Survey Telescope. The room builder reads
    // it to decide what KIND of room to build, so the layout matches the place the
    // player walked into.
    const site = theme.site ?? {};
    const place = (site.buildings ?? []).find(b => b.group === id || b.enter === id)
               ?? (site.plan?.rooms ?? []).find(r => r.group === id);
    const room = buildInteriorBuilding(live(scene), {
      id, index: order,
      name: d?.name ?? id, code: d?.code ?? '',
      placeName: place?.name ?? '',
      colour: d?.color,
      // A place that is not an area: no case, no beacon, no delivery. The room
      // builder needs to know before it registers its stand.
      minor: !d,
      // How the room is *built* is the theme's, not the area's: a wartime
      // building on a mesa should not be a Riverton laboratory with different
      // numbers on the screen.
      style: theme.interiorStyle ?? 'lab',
      // THE ROOM'S AUTHORED FIXTURES, so the fit-out can keep off them. They are
      // added later by `addFixture` below, from this same file, which is exactly
      // why the fit-out never knew they were coming.
      fixtures: theme.fixtures?.[id] ?? [],
      // What is seen through the door: the site's own sky and ground colours,
      // so the view out of a Martian module is butterscotch over regolith and
      // the view out of a salt-flat hut is storm grey over crust.
      outside: outsideOf(theme),
      ...spec,
      caseName: who.name, caseLine: who.line,
      // The campaign's product, in the one room the manifest names. Every other
      // room gets `undefined` and builds exactly what it built before.
      delivery: theme.delivery?.where === id && theme.delivery?.pieces?.length
        ? { name: theme.delivery.name, total: theme.delivery.pieces.length }
        : undefined,
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

  /**
   * TODAY'S OBJECTS, IN THIS ROOM, AS OF NOW.
   *
   * Called on the way in AND on the room's own tick, and the difference is a
   * defect that was reported: with the calls opening one at a time, closing one
   * *while standing in the room* opens the next — and this only ever ran on
   * entry. So the object the player had just finished with kept its marker lit,
   * and the object the HUD had started naming had not been built at all.
   *
   * The rebuild is keyed on the set of open calls, so the ordinary tick costs a
   * string compare and the room is torn down only when what is open changes.
   */
  function syncFixtures(id, room){
    const wanted = [];
    {
      const st = getState();
      const mission = st ? getCurrentMission(st) : null;
      for(const i of (st ? openStopIndices(st) : [])){
        const stop = mission?.stops?.[i];
        const lesson = stop && theme.content?.CURRICULUM?.[stop.group]?.[stop.lesson];
        if(!lesson) continue;
        // A PERSON STOP GETS NO OBJECT. It is answered by finding the person,
        // and `openVisit` refuses it in a room — with a card headed "no case
        // open right now", which is worse than useless when somebody IS
        // waiting. Red Sand's sol 291 and 294 both put their person call in
        // the same room as the rest of the day, so the room stood an object
        // there that said nothing is here.
        if(st && isPersonStopForIdx(st, i)) continue;
        const sited = siteForStop(theme, stop, lesson);
        // Sited here from another area, or asked at home in this one.
        const fx = sited && sited.place === id ? sited.fixture
          : (!sited && stop.group === id ? fixtureFor(theme, id, lesson) : null);
        if(fx && !wanted.some(w => w.fixture.id === fx.id))
          wanted.push({ fixture: fx, caseId: sited ? stop.group : null, stopIndex: i });
      }
    }
    // One key for the set, so the same day's room is not torn down and rebuilt
    // every entry, and a day that changes which calls are open still is.
    const wantKey = wanted.map(w => w.fixture.id).join('|') || null;
    if(room.fixtureKey !== wantKey){
      for(const old of room.fixtures ?? []){
        const drop = new Set(old.interactables);
        for(let i = interactables.length - 1; i >= 0; i--)
          if(drop.has(interactables[i])) interactables.splice(i, 1);
        const ci = colliders.indexOf(old.collider);
        if(ci >= 0) colliders.splice(ci, 1);
        old.dispose();
      }
      room.fixtures = [];
      for(const w of wanted){
        const built = addFixture(room, w.fixture, { caseId: w.caseId, stopIndex: w.stopIndex });
        if(built){
          built.key = w.fixture.id;
          room.fixtures.push(built);
          interactables.push(...built.interactables);
          colliders.push(built.collider);
        }
      }
      room.fixtureKey = wantKey;
      // Kept for anything still reading the old singular field.
      room.fixture = room.fixtures[0] ?? null;
    }
  }

  return {
    /** True when the player is standing in one. */
    get current(){ return inside; },
    /** Does this theme have a room for this area at all? */
    has: (id) => !!theme.interiors?.[id],
    enter(id){
      const room = roomFor(id);
      if(!room) return false;
      onEnter?.(id, room);
      inside = { id, room, back: player.getPosition().clone(), yaw: live(camera).rotation.y };
      room.setVisible(true);
      room.setCaseOpen(openCaseGroups().has(id));
      // The board says what is in as of this morning. Refreshed on entry rather
      // than at the end of a day, because the day that fills a cell is closed
      // from wherever the player was standing and this room may be four
      // kilometres away and not yet built.
      room.delivery?.setPieces(deliveryPieces(theme, getState()));
      // And the door shows the time of day the town is having.
      room.setOutsideNight?.(1 - dayBlendAt(getState()?.timeHours ?? 12));
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
      // THE FIXTURE: the object this call is actually about, standing in the room.
      // Same lifetime rule as the probe chain and for the same reason — which
      // call is open here changes from day to day, so the room only ever holds
      // today's object. The case stand stays where it is; this is a second way
      // into the same call, so a player who cannot find the thing is never stuck.
      // A MINOR place asks the other question: not "what is open in this area?"
      // — it has no area — but "is any of today's calls sited here?". That is how
      // the tank farm and the array shed carry a stop without being areas.
      // EVERY open call in this room gets its object, not just the first.
      //
      // This used to build ONE. The area's own open call won, and any call sited
      // here was only looked at when the area had none — which is exactly
      // backwards on the day the feature was built for. Red Sand's sol 291 asks
      // all three of its questions in the Reactor Hall: the area's own call is a
      // PERSON stop answered outside with Herrera, so the single slot went to
      // that call's skid, and the bed and the cold line take-off — the two
      // questions the player actually walks in to answer — had no object at all.
      // A room with nothing to grab in it.
      // ONE PASS OVER TODAY'S OPEN CALLS, and every one that belongs in this room
      // gets its object — whether it is this area's own call or one sited here.
      //
      // This used to ask `openLessonFor` for THE open call of the room's own
      // area, which returns one lesson. A day with TWO calls in the same area
      // therefore built one object and left the other with nothing to stand at:
      // Red Sand's sol 294 has four calls in the Reactor Hall, two of them
      // EQUIL, and the hall showed three objects. The player walks up to a room
      // that is missing a call it is supposed to be holding.
      syncFixtures(id, room);
      // THINGS THAT GET BUILT. A fixture with `from: <day>` is not there before
      // that day and is there afterwards, whatever the open call is — the second
      // polishing column that sol 10 spends the last spare parts on, the
      // conductivity alarm wired four sols before the rotation ends. Both are
      // already canon: the ending card has said for the life of the game that
      // the lead-and-lag columns are plumbed and the alarm has never sounded,
      // and the rooms never showed either.
      //
      // This is how the world grows without anything being locked. A player who
      // walks into the Water Plant on sol 11 and finds a second column standing
      // there has been told something no HUD can tell them — and on sol 9 there
      // is no invisible wall, because there is no column. See PLACEMENT_PASS.md.
      // `until:` is the same idea running the other way, and it is the half that
      // makes a plant look unfinished rather than merely incomplete. A propellant
      // plant racing a transfer window IS a construction site: capped stubs,
      // strapped crates, scaffolding on the cold end. Those are there on sol 1 and
      // gone by the sol the work that removed them is done, so the world fills in
      // on ground the player already walks every day — which is a far stronger
      // reading of "the world grew" than a building opening 300 m away.
      const week = getState()?.week ?? 1;
      // A DATED FIXTURE MAY ALSO BE A QUESTION'S OBJECT, and then today's call
      // already built it: Overwind's March board is `from: 10` and is what
      // CAGE-9 is asked at, so from sol 10 the room stood two boards in one
      // place — the call's, and a second scenery copy in the same coordinates
      // with its own hit box. Whichever the raycast reached first won.
      // From the room rather than from a local: `syncFixtures` has just built
      // today's objects and records each one's id as `key`, and it is also
      // called from the room's tick now — so reaching into its locals is not
      // available and was the wrong coupling anyway.
      const alreadyBuilt = new Set((room.fixtures ?? []).map(f => f.key));
      const due = (theme.fixtures?.[id] ?? []).filter(f =>
        (f.from || f.until) && week >= (f.from ?? 1) && week < (f.until ?? Infinity)
        && !alreadyBuilt.has(f.id));
      const dueKey = due.map(f => f.id).join(',');
      if((room.standing?.key ?? '') !== dueKey){
        for(const built of room.standing?.list ?? []){
          const drop = new Set(built.interactables);
          for(let i = interactables.length - 1; i >= 0; i--)
            if(drop.has(interactables[i])) interactables.splice(i, 1);
          const ci = colliders.indexOf(built.collider);
          if(ci >= 0) colliders.splice(ci, 1);
          built.dispose();
        }
        const list = [];
        for(const f of due){
          const built = addFixture(room, f, { scenery: true,
            openPrompt: f.until ? 'Not finished yet' : 'Built this rotation' });
          if(built){
            list.push(built);
            interactables.push(...built.interactables);
            colliders.push(built.collider);
          }
        }
        room.standing = { key: dueKey, list };
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
      const { id, room, back, yaw } = inside;
      // Before the room goes dark, so whoever was standing in it is put back on
      // their own doorstep rather than left in an invisible box.
      onExit?.(id, room);
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
      // The marker on today's object. Its arrow bobs and turns to face the
      // player, the same as the case stand's — the room's own `update` drives
      // that one and knows nothing about the fixtures added after it was built.
      for(const f of inside.room.fixtures ?? []) f.beacon?.update?.(delta, live(camera));
      // The case can close while the player is standing in the room — they
      // answer it, and the marker has to go out with it.
      sinceCheck += delta;
      if(sinceCheck > 0.4){
        sinceCheck = 0;
        inside.room.setCaseOpen(openCaseGroups().has(inside.id));
        // AND THE OBJECTS. Same reason as the line above, one level out: a call
        // can close while the player is standing in the room, and with the
        // calls opening one at a time that opens the next one. Without this the
        // finished object kept its marker and the new one was never built —
        // "I need to go to the technician's spreadsheet, but the conversion
        // board, which I solved, is still highlighted."
        syncFixtures(inside.id, inside.room);
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
    // The place the call is actually asked at, not the area it belongs to. A
    // day whose stops are sited elsewhere had its budget measured to the wrong
    // buildings — see `siteForStop` and `placeOfStop` in the entry point.
    return m.stops.map(s => {
      const lesson = theme.content?.CURRICULUM?.[s.group]?.[s.lesson];
      const place = siteForStop(theme, s, lesson)?.place ?? s.group;
      return positionOf?.(place) ?? positionOf?.(s.group) ?? null;
    });
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
    const allTerms = (m.primerTerms ?? []).filter(t => t?.name && t?.def);
    const allRest = lines.slice(allTerms.length);

    // SAY IT ONCE. The primer is derived from three sources that do not know
    // about each other — the glossary, `relationship` on an estimate, and the
    // syllabus equations — and on sol 293 all three described Q against K. The
    // card carried the term, a sentence spelling the formula out in words, the
    // equation's own caption AND its prose line: one idea, four times, before
    // the player had read a single objective.
    //
    // So a bullet that is mostly the equation block's own words is dropped, and
    // so is a term the equations already name. Conservative on purpose: a short
    // line is never dropped on a ratio, and a term is dropped only when EVERY
    // word of its name is in the equations.
    const CONTENT = (t) => new Set(String(t).toLowerCase().match(/[a-z\u2080-\u2089]{4,}/g) ?? []);
    const eqWords = CONTENT((m.equations ?? []).filter(x => x?.e && x.card !== false)
      .map(x => [x.e, x.c, ...(x.v ?? []).flat(), x.s].filter(Boolean).join(' ')).join(' '));
    const saidByAnEquation = (line) => {
      const w = [...CONTENT(line)];
      if(w.length < 5 || !eqWords.size) return false;
      return w.filter(x => eqWords.has(x)).length / w.length >= 0.7;
    };
    // BULLETS ONLY. Dropping a TERM the equations happen to name was tried and
    // is wrong: an equation MENTIONS a word, a term DEFINES it, and those are
    // different jobs. Sol 297 lost both "Cryogenic" and "Boil-off" because its
    // equation's caption reads "heat into a cryogenic tank, paid in kilograms",
    // which names them and defines neither.
    const terms = allTerms;
    const kept = allRest.filter(l => !saidByAnEquation(l));
    // Assumptions get their own heading. Mixed in above they read as a stray
    // fact; under a heading that says what they are, they read as the ground the
    // day's questions stand on — which is what they are.
    const assumedSet = new Set(m.primerAssumes ?? []);
    const rest = kept.filter(l => !assumedSet.has(l));
    const assumed = kept.filter(l => assumedSet.has(l));
    // Vocabulary first, equations last. A formula is the densest thing on the
    // card and the one that assumes the most, so it reads better once the words
    // in it have been defined a few lines above.
    /**
     * ONE BOX, ONE FORMAT.
     *
     * These were three different things on the same card: the terms as a
     * definition list, the primer lines as a bulleted list, and the equations in
     * a bordered block of their own with its own type. Three treatments for one
     * idea — here is what you need to know before you start — so the card read as
     * three cards stacked, and which of them a line landed in was decided by
     * where it happened to be written in the bible rather than by what it says.
     *
     * Every row is now the same shape: an optional label, then the line. A term
     * labels itself with its name, an equation with the equation, and a primer
     * sentence has no label because it is already a whole sentence.
     */
    const row = (label, text, cls = '') =>
      `<div class="planRow${cls ? ' ' + cls : ''}">`
      + (label ? `<b>${label}</b>` : '')
      + (text ? `<span>${text}</span>` : '') + `</div>`;

    const eqs = (m.equations ?? []).filter(x => x?.e && x.card !== false);
    /**
     * THE HEADING AND THE BUTTON SHARE A LINE.
     *
     * The button was at the foot of the box, under an equation's symbol list,
     * where it read as one more row of reference rather than as a way out to a
     * different panel. On the heading it is where a reader looks first and it
     * costs the box no height at all.
     */
    const head = `<div class="planPrimerHead"><h4>Worth knowing first</h4>`
      + (hasWorked(m.worked)
          ? `<button type="button" id="planWorked" class="btn small">`
            + `${esc(workedLabel(m.worked))}</button>` : '')
      + `</div>`;
    return `<div class="planPrimer">${head}`
      + terms.map(t => row(esc(t.name), esc(t.def))).join('')
      + rest.map(l => row('', esc(l))).join('')
      // The equation is the label, its purpose is the line, and the symbols run
      // underneath in the same box rather than in one of their own. `x.s` is
      // still not printed here — see the note where `equationsHTML` used to be.
      + eqs.map(x => row(`<code>${esc(x.e)}</code>`, esc(x.c ?? ''), 'planRowEq')
          + (Array.isArray(x.v) && x.v.length
              ? `<div class="planRow planRowVars"><span>${x.v.map(([sym, mean]) =>
                  `<em><b>${esc(sym)}</b> ${esc(mean)}</em>`).join('')}</span></div>`
              : '')).join('')
      + (assumed.length ? `<h4>Taken as given</h4>`
          + assumed.map(l => row('', esc(l))).join('') : '')
      + `</div>`;
  }

  // `equationsHTML` is gone: the equations are rows in the primer box now, in the
  // same shape as the terms and the primer lines — see `primerHTML` above. It had
  // its own block, its own border and its own type, which made one card read as
  // three. `x.s`, the discursive sentence about an equation, is still not on this
  // card; `askMoreHTML` prints it behind the question's own fold, which is where
  // somebody who wants the commentary is standing when they want it.

  /**
   * One clause saying why this call is worth making.
   *
   * Generated, for the reason `debrief.js` composes its card rather than taking a
   * `praise:` key: a `reason:` on every stop is 1,600 lines of writing across the
   * campaigns and a new book key the importer would have to carry, and everything
   * a reason needs is already authored somewhere better. A person holds a job —
   * that is why it is them — and an area is for something, which is what the
   * book's own `desc` on the group says. A book may still override it per stop
   * with `reason:`, and where one does, that wins.
   */
  /** Where a stop is asked when that is not its own area: `{place, fixture}`. */
  function siteOf(stop){
    const lesson = theme.content?.CURRICULUM?.[stop?.group]?.[stop?.lesson];
    return siteForStop(theme, stop, lesson);
  }

  function reasonFor(state, stop, idx, person){
    if(stop?.reason) return String(stop.reason);
    if(person){
      const role = String(person.role ?? '').trim();
      return role || '';
    }
    const g = (theme?.content?.GROUPS ?? []).find(x => x.id === stop?.group);
    const desc = String(g?.desc ?? '').trim();
    if(!desc) return '';
    // One clause. A group description is a sentence and some of them are two.
    const first = desc.split(/(?<=[.?!])\s/)[0] ?? desc;
    return first.replace(/\.$/, '');
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
      // WHY THIS ONE, under the call. The card named six places and gave no
      // reason to walk to any of them, so a day read as an itinerary somebody
      // else had drawn up — and the one thing the player is actually deciding is
      // the route. A person's reason is the job they hold, which is why it is
      // them and not somebody else; a room's is what that area is for, which the
      // book already wrote as the area's own description.
      //
      // Deliberately NOT the day's question, which used to be here and was taken
      // out for being a second briefing. A reason is a clause, and a call with
      // three lines under it is a card nobody reads twice.
      // ONE LINE, AND IT IS THE WORK. The row used to be an instruction —
      // "Go to Reactor Hall" — with the reason under it, which made the card a
      // route somebody else had drawn plus a second briefing. Two things went
      // wrong with that. A day whose calls share one place printed the same
      // instruction three times, naming nothing that told them apart; and the
      // reason lines referred to people the card had not introduced ("She wants
      // the reactor run hotter" under a call that names Herrera).
      //
      // So the objective is the stop's own `task`: what the player has to work
      // out. Where to walk is on the map beside it, in the HUD while walking,
      // and — when a day is all in one place — in the stake above.
      const line = String(s.task ?? '').trim()
        || callLabel(person, s.group, siteOf(s));
      return `<div class="planCall${made ? ' planDone' : ''}">`
        + `<span class="planNum">${made ? '✓' : i + 1}</span>`
        + `<span class="planCallText"><b>${esc(line)}</b>`
        + `${made ? '<span class="planMade">made</span>' : ''}</span></div>`;
    }).join('');
    // Order: what happened, what you are called to, what you need to know, and
    // the map last — the map is what the player chooses a route from, so it is
    // the thing they should still be looking at when they press start.
    // What today adds to the thing the fortnight is building. One line, under the
    // stake, because "why am I doing today at all" is a different question from
    // "what has happened" — and until the delivery existed the campaign answered
    // it with a week number in the corner of the HUD.
    //
    // OFF BY DEFAULT, EVERYWHERE. Read on its own it is a good line; read in
    // place it is the third block of prose above the objectives, on a card whose
    // whole point is that the player gets to the objectives — and it is the same
    // sentence with one noun and one number changed, fifteen mornings running:
    // "Today you add the counting notebook to The Evidence Chain. 0 of 15 are on
    // the board in Civic Advice Office."
    //
    // It was dropped for a brief plan card first and kept everywhere else, which
    // made it the default for every campaign that had not opted out. What it
    // says is not lost: the delivery is named on the opening card, and
    // `deliveryGainHTML` puts the count on the card that closes every day, which
    // is where a running total belongs. A campaign that wants it back says
    // `deliveryPlanLine: true`. See gamekit/BRIEFING_PASS.md.
    const deliverLine = theme?.deliveryPlanLine === true
      ? deliveryPlanLine(theme, state, { dayNoun: DAY_NOUN }) : '';
    // ------------------------------------------------- the authored card
    //
    // A campaign bible can write the briefing card as exact player copy — a
    // header, a card title, a "go now" line, a body and an objective. Where a
    // book does that, those lines are printed verbatim and the generated stake
    // line steps aside: the whole point of authoring the card is that the words
    // are chosen.
    //
    // TWO FIELDS THE CARD NO LONGER PRINTS. `failureMeans` and `laterTravel`
    // were on it and are gone. Both restated something the card already had:
    // "the crew loses time it may need" is the body's own stake said twice, and
    // "None. All four stops remain in Plant Control" is a travel note for a
    // mission with no travel — a line whose whole content is that it does not
    // apply. The importer no longer carries either, so a book writing them is
    // not quietly holding dead copy.
    //
    // Every field is optional and a book that writes none of them renders
    // exactly as it always did.
    /**
     * THE CARD IS THREE THINGS, NOT FIVE.
     *
     * It had a header, a title, a shaded body, a "Go now" row and an "Objective"
     * row — five treatments, four type sizes and a colour of its own. Two of
     * those rows are one thing said in two halves: the objective is what the day
     * is for and `goNow` is where to start on it, and split under separate labels
     * the player read them as two instructions and had to work out that the
     * second was the first one's address.
     *
     * So: the header and title as they were, then CONTEXT (the body, in the
     * card's own type rather than a shaded box of its own), then one OBJECTIVE
     * row — the aim first and the place after it, which is the order they are
     * acted in.
     */
    const card = m.card ?? null;
    const aim = card
      ? [card.objective, card.goNow].map(x => String(x ?? '').trim()).filter(Boolean).join(' ')
      : '';
    const cardHTML = card ? ''
      + (card.header ? `<div class="planHeader">${esc(card.header)}</div>` : '')
      + (card.title ? `<h4 class="planCardTitle">${esc(card.title)}</h4>` : '')
      + `<div class="planStake"><span>Context</span>`
      + `${esc(card.body || m.stake || m.objective || '')}</div>`
      + (aim ? `<div class="planAim"><span>Objective</span>${esc(aim)}</div>` : '')
      : `<div class="planStake"><span>Context</span>${esc(m.stake || m.objective || '')}</div>`;
    return `<div class="planCard">`
      + continuityHTML(state)
      + cardHTML
      + (deliverLine ? `<div class="planDeliver">${esc(deliverLine)}</div>` : '')
      // ------------------------------------------------------ the call list
      //
      // A list of "go to the conversion board, in Plant Control" ×4 is what the
      // plan card is FOR in a campaign the player routes themselves: it is the
      // day's shape, and the map underneath is planned from it.
      //
      // It is noise in a sequential one. Only the first is available, the HUD
      // banner names it, a beacon marks the object and a beat sets it up — so
      // the card was listing three places the player cannot go yet and one they
      // are already being told about. Reported as not needed, and it is not.
      //
      // AND IT IS NOISE IN A TIMED ONE, for the same reason wearing a different
      // hat. A campaign scored on four bars and a stopwatch sets each call up in
      // a beat, names the open one in the HUD banner and puts a beacon on the
      // object; the card was repeating four stop titles — "Signal or statistic",
      // "Counter tradeoff", "Page one standard" — above a map that already shows
      // them. `economy: false` is the timed model's own switch.
      + (STOPS_IN_ORDER || TIMED ? ''
        : `<div class="planCalls"><h4>Objectives</h4><div class="planCallRow">${rows}</div></div>`)
      + primerHTML(m)
      + (mapHTML ? `<div class="planMap">${mapHTML()}</div>` : '')
      // One line. The rest of what used to be here — how fast the clock runs
      // while you walk, drive or read — is a rule the player learns by playing
      // and read past by everyone else.
      // What the note says depends on whether the calls are the player's to
      // order. A sequential campaign must not print "in whatever order" — see
      // STOPS_IN_ORDER in constants.js.
      // NO NOTE ON A SEQUENTIAL CAMPAIGN. "One call at a time, in the order they
      // are listed" describes the rule rather than the day, and the rule is
      // visible without being stated: one call is open, the map marks it, and
      // the next appears when it closes. It stays where the player DOES have a
      // choice, because there the order is a decision and the card should say so.
      + (STOPS_IN_ORDER ? ''
        : `<div class="planNote">${resuming
            ? `${openStopIndices(state).length} still open. Take them in whatever order.`
            : 'Take them in whatever order.'}</div>`)
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
      const start = resuming
        ? { id: 'planStart', label: 'Back to it', primary: true, onClick: () => this.resume() }
        : { id: 'planStart', label: 'Start the day', primary: true, onClick: () => this.start() };
      ui.open(`${DAY_NOUN} ${state.week} — ${m.title}`, planHTML(resuming), [start]);
      /**
       * THE PANEL, AND THE WAY BACK.
       *
       * "Back to mission restores the same mission card and progress" — so the
       * way back is this same call with the same argument, which re-renders the
       * card from the same state rather than restarting or resuming the day.
       * Nothing about the day is touched by opening this: the clock has not
       * started on an unresumed plan card, and on a resumed one the caller is
       * already holding it.
       */
      const worked = m.worked;
      document.getElementById('planWorked')?.addEventListener('click', () => {
        ui.open(String(worked.title ?? 'Worked examples'), workedHTML(worked), [
          { id: 'workedBack', label: 'Back to mission', primary: true,
            // `showPlan` takes no argument — it reads `resuming` off the state
            // itself, so this comes back to exactly the card that was open.
            onClick: () => this.showPlan() },
        ]);
        bindWorked(document.getElementById('modalBody'));
      });
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
