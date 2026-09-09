// main.js — the entry point. Wires a theme to the engine and runs the loop.
//
// Everything specific to a game lives in themes/<name>/; this file names none
// of it. The theme arrives through the `@theme` alias set by vite.config.js,
// and the world through `@world`, chosen from the theme's site kind.
//
//   THEME=contamcity npm run dev
import theme from '@theme/theme.js';
import { tiersFor, unlockDay } from '../engine/core/orientation.js';
import { gatesFor, lapCardHTML } from '../engine/core/orientationLap.js';
import { warmupDue, WARMUP_MAX_STOPS } from '../engine/core/warmups.js';
import * as world from '../engine/core/world.js';
import { initPlayer, updatePlayer, camera, controls, getPosition, teleport, isLocked,
         setGround, setBounds, moveState, touchControls } from '../engine/core/player.js';
import { updateInteractions, getCurrentTarget } from '../engine/core/interactions.js';
import { initCrowd, updateCrowd, getNPCs, setWantedMarkers, getNPCByCharId,
         stationIndoors, stationPeople } from '../engine/people/crowd.js';
import { initAvatars, updateAvatars } from '../engine/people/avatars.js';
// Co-op. Every call is a no-op unless the page was opened with `?room=CODE`.
import * as room from '../engine/core/room.js';
import { createCoopHUD } from '../engine/core/coopHUD.js';
import {
  getState, save, tryLoadSaved, createFresh, advanceTime, getNextMissionStop, walkCost,
  endDayNow, dayRunning, completeMission, applyRemoteState, tickDay,
  // Beats fire off a closing stop, and this is the only place that knows.
  onStopClosed, markMissionStopComplete,
} from '../engine/core/gameState.js';
import { updateHUD, updateDayClock, renderStats,
         updateMetricHUD, updateMissionClock } from '../engine/core/dashboard.js';
// The four campaign bars, the stopwatch and the Recovery Point arithmetic.
// Inert in a theme with no `theme.metrics` — which is every theme but this one.
import { hasMetrics, freshMetrics, applyDeltas, recoveryPoints, award,
         missionPlan, lockable, lock, clockText, goalSentence } from '../engine/core/metrics.js';
import { createMissionClock, PAUSE } from '../engine/core/missionClock.js';
import { metricScreenHTML, bindMetricScreen, reviewHTML } from '../engine/core/metricScreen.js';
import { hasDeeper, deeperHTML, bindDeeper } from '../engine/core/deeper.js';
import { splitOpening, quoteHTML } from '../engine/core/openingQuote.js';
import { renderMap, setMapPins } from '../engine/core/map.js';
import { passageHTML, bindPassage } from '../engine/core/personQuiz.js';
import { openVisit, openPersonVisit, closeModal, panelFreezesClock,
         setWorldHandle, setModalLock, modalLocked } from '../engine/core/questionUI.js';
import { sitedAt } from '../engine/world/interiorFixtures.js';
import { def, groupPct, getCurrentMission, isPersonStopForIdx, getPersonIdForStop,
         openStopIndices, openStopGroups } from '../engine/core/simulation.js';
// The one rule for "where is this call actually asked?", shared with
// engine/dev/placement.mjs so the checker and the game cannot disagree.
import { siteForStop } from '../engine/world/siting.js';
import { createInteriors, makeActivate, exposeDebug, createDay, openPersonOrPassage,
         showEnding, createMiniMap, openCaseGroups } from '../engine/core/app.js';
import { PANEL_PACE } from '../engine/core/day.js';
// The lift. Inert in every game whose world has no floors to move between —
// `world.floorMenu` is undefined and this is never constructed.
import { createLift } from '../engine/core/lift.js';
import { createDriving } from '../engine/world/driving.js';
import { createFlying } from '../engine/world/flying.js';
import { createTrial, trialLimit } from '../engine/world/trial.js';
import { createWorldFormats } from '../engine/world/worldFormats.js';
import { DAY_NOUN, WEEKS } from '../engine/core/constants.js';
import { dayDebrief } from '../engine/core/debrief.js';
import { deliveryGainHTML, deliveryCaseHTML, deliveryProgress,
         deliveryPieces } from '../engine/core/delivery.js';
import { BALLPARK_CALCS } from '../engine/core/curriculum.js';
// The mission beat script: what happens when the player walks in, and after
// each stop closes. Data-driven from the book — see engine/core/beats.js.
import { initBeats, playing as beatPlaying, place as beatPlace,
         dismiss as beatDismiss, queued as beatQueued } from '../engine/core/beats.js';
// The board a beat's world change is shown on, rather than described to.
import { addStageWall } from '../engine/world/stageWall.js';
// What the place sounds like. Inert until the first gesture; a headless render
// never sends one and never hears about this.
import { initAudio, unlockAudio, updateAudio, lightningAt, audioReport } from '../engine/core/audio.js';

const canvas = document.getElementById('canvas');
const promptEl = document.getElementById('prompt');
const blocker = document.getElementById('blocker');
const overlay = document.getElementById('overlay');

// --------------------------------------------------------------- title card
document.title = `${theme.title} — ${theme.subtitle}`;
document.getElementById('titleName').textContent = theme.title;
document.getElementById('titleRole').textContent = theme.subtitle;
// The opening is the theme's, not this file's: it was written for one game and
// every other theme served from here inherited a paragraph about a river city.
// The map is of a place, and the place has a name. index.html said "Riverton"
// for every theme served from here.
document.getElementById('mapTitle').textContent = theme.site?.name ?? theme.title;
// THE LAST LINE IS SOMEBODY SPEAKING, so it is drawn as speech. Every one of the
// eight bibles ends its opening with a named person handing over the thing the
// campaign produces and saying one sentence about who is depending on it — and
// as the fourth paragraph of a wall of prose it read as a sentence about a
// person rather than as the person. `splitOpening` returns the card untouched
// for anything that is not that shape; see engine/core/openingQuote.js.
{
  const { body, said } = splitOpening(theme.opening ?? [], theme.content?.ROSTER ?? []);
  document.getElementById('titleStakes').innerHTML =
    body.map(p => `<p class="stakes">${p}</p>`).join('') + quoteHTML(said);
}
// The scope line is gone from the markup too — emptying its text left a
// gold-shaded bar with nothing in it, between the opening's last line and the
// button. See index.html.
// ONE CARD, DISMISSED ONCE. The bible names the control; "Ready to save the day"
// is the default, and a theme relabels it only where its own bible says so.
if(theme.openingButton){
  document.getElementById('startBtn').textContent = theme.openingButton;
}

// ------------------------------------------------------------------- state
// Every area starts at zero readiness, led by the person groups.js names.
const assign = Object.fromEntries(theme.content.GROUPS.map(g => [g.id, g.defaultLeader]));
if(!tryLoadSaved()) createFresh(assign);

// ------------------------------------------------------------- the four bars
//
// Seeded here rather than in `createFresh`, because the bars are a theme's
// declaration and `gameState` may not reach the manifest. A save written before
// this existed gets them at their starting values, which is right: it has not
// spent any Recovery Points either.
const METRICS = hasMetrics(theme);
if(METRICS){
  const st0 = getState();
  if(st0 && !st0.metrics) st0.metrics = freshMetrics(theme);
  // A reloaded save is past the opening card, so the HUD is already earned and
  // the objective card has to start out of its way.
  if(st0?.metricsShown) document.body.classList.add('metricsHud');
}

// THE SHIFT CLOCK. One per campaign, reset at the start of each mission. It does
// not start here: the bible has it start when the arrival beat closes and the
// first stop becomes active, which is `startMissionClock` below.
const missionClock = METRICS ? createMissionClock() : null;
/** The mission this clock belongs to, so a new mission gets a new clock. */
let clockMission = 0;
/** Committed wrong answers this mission, read off the state the panel writes. */
const wrongThisMission = () => {
  const st = getState();
  return st?.wrongSubmissions?.[st.week] ?? 0;
};
const missionTarget = () => missionPlan(theme, getState()?.week ?? 1)?.target ?? 0;

/**
 * Start the shift clock, once, for this mission.
 *
 * Called from two places — the arrival beat closing, and the first stop opening
 * without one — because a mission whose first call is a person is answered in
 * the open and may never fire an arrival beat at all. `start()` is idempotent,
 * so whichever gets there first owns it and the second is free.
 */
function startMissionClock(){
  if(!missionClock) return;
  const week = getState()?.week ?? 1;
  if(clockMission !== week){ missionClock.reset(); clockMission = week; }
  missionClock.start();
}

// ------------------------------------------------------------------- world
world.initWorld(canvas, theme);
const { scene, renderer } = world;

initPlayer(canvas, scene, renderer, {
  fov: theme.look?.fov, near: theme.look?.near, far: theme.look?.far,
  start: theme.start ?? theme.site?.spawn,
  bounds: theme.site?.terrain?.playerLimit,
  // How wide the player is for collision — an interior with doorways needs less
  // than a street does.
  radius: theme.look?.playerRadius,
  // The world's own height function, never a second opinion about the floor.
  groundHeight: world.groundHeight,
});
if(theme.start?.yaw !== undefined) teleport(theme.start, theme.start.yaw);

// The crowd is wired here rather than inside the world, so neither module has
// to import the other. Every third mission stop is a person stop: without
// people, a third of the campaign has nobody to talk to.
initCrowd({
  scene, camera,
  interactables: world.interactables,
  softColliders: world.softColliders,
  roster: theme.content.ROSTER,
  outfits: theme.people.OUTFITS,
  roleToOutfit: theme.people.roleToOutfit,
  stations: world.getPeopleStations?.() ?? [],
  extraSpots: world.getExtraSpots?.() ?? [],
  extras: theme.people.extras ?? 0,
  // How fast the town walks. 1 is a stroll; a boom town or a rescue is quicker.
  pace: theme.people.pace ?? 1,
  // Where somebody can sit down — bench seats outdoors, `plan.seats` indoors.
  // A share of the extras sit; the rest walk. See `seats` in crowd.js.
  seats: world.getSeats?.() ?? [],
  // The named cast lives INSIDE their area, not at its door. Off by default:
  // every game written before this meets its people in the street. See
  // `stationIndoors` in crowd.js.
  indoorOnly: theme.people?.indoors === true,
  groundHeight: world.groundHeight,
  // Which floor is under the player's feet, in a stacked building. Undefined
  // everywhere else, and `crowd.js` treats that as "there is only one floor".
  activeLevel: world.activeFloorId ? () => world.activeFloorId() : undefined,
  // The pad is the caller's: one metre keeps somebody from being *placed* hard
  // against a wall, and that same metre used while walking would wall a person
  // into a four-metre passage.
  //
  // BOTH KINDS OF COLLIDER, and the second one was missing for the life of this
  // engine. `player.js` stops the player on `colliders` AND on `softColliders`
  // — the cylinders a bin, a bench, a stall or a barricade is registered as —
  // and this predicate read only the first, so the crowd walked through every
  // soft-collided prop in every game while the player could not. It is what a
  // player notices first: at Corbin Park people strolled through the stalls and
  // the arm-nine barricade. Squared distance, the same test `player.js` uses.
  blocked: (x, z, pad = 1) => world.colliders.some(c =>
    x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad)
    || (world.softColliders ?? []).some(c => {
      // …but not the people. `crowd.js` puts a travelling collider in this same
      // array for every walker, so counting them here blocks each person with
      // their own body.
      if(c.person) return false;
      const dx = x - c.x, dz = z - c.z, rr = c.r + pad;
      return dx * dx + dz * dz < rr * rr;
    }),
});

// The other players, drawn with the same rig the crowd uses. Inert solo: with
// no room there are never any members, so this draws nothing and costs a loop
// over an empty array.
initAvatars({ scene, groundHeight: world.groundHeight });

// The sound of the place. The theme's `audio:` block, or the world's default —
// wind outdoors, plant hum indoors. Every emitter's level is set from the eye
// once a frame, in the loop below.
initAudio(theme, { kind: theme.site?.kind ?? 'outdoor' });
// A flash in the weather layer becomes thunder here, delayed by its distance.
world.onLightning?.(({ distance }) => lightningAt(distance));

// --------------------------------------------------------------- objective
/** The area the current mission wants next, or null when the mission is done. */
/**
 * WHERE THE PLAYER IS ACTUALLY BEING SENT, which is not always the stop's area.
 *
 * A call may be sited at a fixture in another place — the tank farm, the pad
 * office, or another area's own board — and `siteForStop` is the one rule that
 * resolves it (engine/world/siting.js). The waypoint post, the day's route and
 * its budget all read this, so returning the raw `stop.group` pointed the post
 * at a building the question is not asked in.
 */
function placeOfStop(stop){
  if(!stop) return null;
  const lesson = theme.content?.CURRICULUM?.[stop.group]?.[stop.lesson];
  return siteForStop(theme, stop, lesson)?.place ?? stop.group;
}
function nextStopGroup(){
  // Nothing is signposted while a warm-up is running: the waypoint post over the
  // day's next building is the same confusion as the cone over its next person.
  if(runActive()) return null;
  const stop = getNextMissionStop();
  if(!stop) return null;
  // A PERSON stop is answered by finding somebody, and the cone over their head
  // is the marker for it. A post over their area's door as well says the answer
  // is behind that door, which it is not.
  //
  // UNLESS IT IS. Where the cast lives indoors (`people.indoors`) the person is
  // not on the street at all, so the cone is behind a wall and the door is
  // exactly where the player has to go. Suppressing the post there leaves a
  // call with no signposting whatever.
  const st = getState();
  const idx = st ? (getCurrentMission(st)?.stops ?? []).indexOf(stop) : -1;
  const indoors = theme.people?.indoors === true;
  if(!indoors && st && idx >= 0 && isPersonStopForIdx(st, idx)) return null;
  return placeOfStop(stop);
}
/**
 * Turn the day's own markers off for the length of a run, and back on after.
 *
 * Three of them, and they are in three different places: the waypoint post comes
 * from the world's state update, the cones from the crowd, and the "Still open"
 * banner from the dashboard. One call, so a fourth cannot be forgotten.
 */
function showDayMarkers(on){
  setWantedMarkers(on);
  const obj = document.getElementById('objective');
  if(obj) obj.classList.toggle('hidden', !on);
  refreshWorld();
}
/**
 * The first day the theme's vehicles are signed out.
 *
 * Two sources, and the geometry wins where it applies. A site with two tiers of
 * ground opens the far tier on its unlock day, and the vehicles are what make the
 * far tier reachable — signing them out earlier would let a player drive to
 * ground the campaign has not called yet and find nothing there, which teaches
 * that the far half of the map is empty. `theme.aircraftFromDay` stays for a
 * one-tier theme that wants its aircraft held back anyway.
 *
 * 0 means never refused, which is every theme with one tier of ground and no
 * authored hold — that is, every theme that exists today.
 */
const TIERS = tiersFor(theme.site);
const UNLOCK_DAY = unlockDay(theme.site);
const VEHICLES_FROM_DAY = TIERS.hasFar
  ? UNLOCK_DAY
  : (Number.isFinite(theme.aircraftFromDay) ? theme.aircraftFromDay : 0);
/** Kept under its old name for the aircraft prompt, which reads differently. */
const AIRCRAFT_FROM_DAY = VEHICLES_FROM_DAY;

function refreshWorld(){
  const state = getState();
  world.updateWorldFromState(state, nextStopGroup(), (id) => {
    const gs = state.groups?.find(g => g.id === id);
    return gs ? groupPct(gs) : 0;
  });
  // The delivery board, in a game whose rooms are part of the place rather than
  // behind a door. An outdoor game's board is refreshed by `interiors.enter`,
  // which is the only moment it can be seen; a floor game's room is walked into
  // with no event to hang it on, so it is refreshed with everything else. Absent
  // in a world module that builds no board, and in every theme with no delivery.
  world.setDeliveryPieces?.(deliveryPieces(theme, state));
  // A grounded aircraft whose prompt still reads "E — Fly" is a prompt that lies.
  // Rewritten here rather than at registration because it changes with the day.
  if(VEHICLES_FROM_DAY > 0){
    for(const it of world.interactables){
      if(it.type === 'aircraft'){
        it.prompt = state.week < AIRCRAFT_FROM_DAY
          ? `${it.aircraft.label} — grounded until ${DAY_NOUN.toLowerCase()} ${AIRCRAFT_FROM_DAY}`
          : `E — Fly the ${it.aircraft.label}`;
      } else if(it.type === 'vehicle'){
        it.prompt = state.week < VEHICLES_FROM_DAY
          ? `${it.vehicle?.label ?? 'Vehicle'} — not signed out until ${DAY_NOUN.toLowerCase()} ${VEHICLES_FROM_DAY}`
          : (it.vehicle?.prompt ?? `E — Take the ${it.vehicle?.label ?? 'vehicle'}`);
      }
    }
  }
  // Light the marker over each case stand that has a call open. An interior game's
  // rooms are off the corridor and the player can see three doorways at once, so
  // the marker is how they know which one today wants.
  if(typeof world.setCaseOpen === 'function'){
    const open = openCaseGroups();
    for(const g of theme.content?.GROUPS ?? []) world.setCaseOpen(g.id, open.has(g.id));
  }
  /**
   * And light the OBJECT the call is asked at, where the campaign sites one.
   *
   * A plan's rooms build every fixture the theme declares — see
   * `interiorSite.js` — and they stand as furniture until a call is open at
   * one. This is the same walk `syncFixtures` does for a town, one level up:
   * the town rebuilds its room, a plan's room is already built and only the
   * label moves.
   */
  if(typeof world.setFixtureCall === 'function'){
    const st = getState();
    const mission = st ? getCurrentMission(st) : null;
    const live = new Map();
    for(const i of (st ? openStopIndices(st) : [])){
      const stop = mission?.stops?.[i];
      const lesson = stop && theme.content?.CURRICULUM?.[stop.group]?.[stop.lesson];
      if(!lesson || !lesson.at) continue;
      // A person stop is answered by finding the person, never at an object.
      if(isPersonStopForIdx(st, i)) continue;
      // THE ROOM THAT HOLDS THE OBJECT, not the area that owns the question.
      // Changeover asks four of its Rate Room's calls at the counter floor's
      // boards, which is what `sitedAt` is for and what the placement checker
      // means by "sited at a place that is not their own area". Keyed by the
      // group of the room the fixture stands in, because that is the room whose
      // fixtures were built.
      const sited = sitedAt(theme, stop.group, lesson);
      const room = sited ? sited.place : stop.group;
      if(!live.has(room)) live.set(room, { at: lesson.at, index: i, area: stop.group });
    }
    for(const g of theme.content?.GROUPS ?? []){
      const call = live.get(g.id);
      world.setFixtureCall(g.id, call?.at ?? null, call?.index ?? null, call?.area ?? null);
    }
  }
  updateHUD();
}

// ----------------------------------------------------------- interactions
function showInfo(title, html){
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalEyebrow').textContent = '';
  document.getElementById('modalBody').innerHTML =
    `<div class="briefBox">${html}</div>`
    + `<div class="modalActions"><button class="btn primary" id="infoClose" type="button">Close</button></div>`;
  setModalLock(false);
  overlay.classList.add('show');
  if(document.pointerLockElement) document.exitPointerLock();
  document.getElementById('infoClose').onclick = () => closeModal();
}


/**
 * Stand an area's people in its room, facing the door.
 *
 * `facing` is the station's own convention: `crowd.js` turns a body to
 * `facing + PI`, and the room's `enterTransform` looks along +z into it, so PI
 * here is somebody looking back at whoever just walked in.
 *
 * The spreads are tighter than a town square's because a room is nine metres
 * across with a bench down one side of it.
 */
/**
 * Who is expected in this room today who does not work here.
 *
 * A person stop carries a `siteForStop`, and when that resolves somewhere other
 * than the person's own area the DAY has moved them: Red Sand's mission 2 asks
 * Sundqvist at the Atmosphere Intake because that is where the compressors she
 * is arguing about are. Everything else on the day already read that — the call
 * line, the access rules, the room's fixtures — and the cast did not, so she
 * stayed in the Catalyst Bay behind a door mission 2 does not open, and the
 * intake the player was actually sent to had nobody in it.
 */
function guestsSitedAt(id){
  const st = getState();
  const mission = st ? getCurrentMission(st) : null;
  if(!mission) return [];
  const out = [];
  for(const i of openStopIndices(st)){
    if(!isPersonStopForIdx(st, i)) continue;
    const stop = mission.stops[i];
    const lesson = theme.content?.CURRICULUM?.[stop.group]?.[stop.lesson];
    if(siteForStop(theme, stop, lesson)?.place !== id) continue;
    const pid = getPersonIdForStop(st, i);
    if(pid) out.push(pid);
  }
  return out;
}

/** Whoever this room borrowed, so `onExit` can send them back. */
let roomGuests = [];
/** The station of the room the player is standing in, and the set it was staged for. */
let guestStation = null;
let guestKey = null;

function peopleIndoors(id, room){
  // ONLY WHERE THE THEME ASKED. A game whose cast is met at their door keeps it
  // that way: bringing them inside as well would put every one of them in two
  // places over a mission, which is the defect `people.indoors` was added to
  // fix rather than to spread. Sixty campaigns behave exactly as they did.
  if(theme.people?.indoors !== true) return 0;
  const b = room?.bounds, o = room?.origin;
  if(!b || !o) return 0;
  // Mid-floor, not against the back wall. The back third is where the case
  // stand, the wall boards and today's fixture all are, and the first version
  // stood the station commander half inside a plan table. This is the open lane
  // a player walks up, which is where somebody waiting for you would stand.
  const z = o.z + (b.z0 + b.z1) / 2 + 1.1;
  const station = {
    // OFF THE DOOR LINE. Dead centre put the station commander a metre from the
    // player's nose on the frame the room opened, filling the view she was
    // supposed to be standing in. Offset toward the case-stand hand, which is
    // the side of the room the call is on anyway.
    x: o.x + 1.9 * (b.flip > 0 ? 1 : -1), z,
    y: room.groundHeight?.(o.x, z) ?? 0,
    facing: Math.PI,
    // Tight, and fanning BACKWARD from the middle: a room is nine metres across
    // and the two front corners are furnished.
    spread: 1.15, rankSpread: 1.35, backSpread: 1.1,
  };
  // One of them at the bench, hands on the work — see `workSpot` in
  // interiorBuilding.js. Null in a room with no bench, and then nobody works.
  const own = stationIndoors(id, station, { work: room.workSpot ?? null });
  guestStation = { id, station, own };
  guestKey = null;
  return own + syncGuests();
}

/**
 * Bring in whoever the day now expects here, and only when that changes.
 *
 * THE CALLS OPEN ONE AT A TIME. `openStopIndices` gates a mission in order, so
 * on the frame the player walks into the Atmosphere Intake the only open call
 * is the first one and the person stop three calls later is not open yet —
 * which is why staging the cast on entry alone left the intake empty for the
 * whole of the visit that mattered. `syncFixtures` in app.js has run on a tick
 * for exactly this reason since the day a finished board kept its marker; the
 * people needed the same tick and never had it.
 *
 * Keyed on the set of open calls, so the ordinary tick costs a string compare.
 */
function syncGuests(){
  if(!guestStation) return 0;
  const { id, station, own } = guestStation;
  const want = guestsSitedAt(id).filter(pid => getNPCByCharId(pid)?.division !== id);
  const key = want.join('|');
  if(key === guestKey) return 0;
  guestKey = key;
  // Anybody the day no longer expects here goes back to their own doorstep.
  const gone = roomGuests.filter(pid => !want.includes(pid));
  if(gone.length) stationPeople(gone, null);
  roomGuests = want;
  return stationPeople(want, station, { from: own });
}

// ------------------------------------------------------------- interiors
// A door opens a room. The manager is the engine's — it was written here first
// and then again in Project Y's entry point, which is exactly the duplication
// this file is not supposed to own.
// THE CONTROL WALL of the room the player is standing in, or null. Built with
// the room in `onEnter` below and disposed with it. Declared above both the
// builder and the `stage` callback that writes to it, because a binding read by
// a callback declared earlier in the file is the shape a TDZ bug hides in — this
// repo has already paid for one of those, in a loop that ran every frame.
let stageWall = null;
// WHICH ROOM THE BOARD BELONGS TO, and not `interiors.current`.
//
// The arrival beat fires from inside `onEnter`, before `createInteriors` has
// assigned `current` — so the `stage` callback below read a null room, found no
// id to file the rows under, and saved nothing. The board still lit up, because
// that goes through the handle in `stageWall`; it was only the persistence that
// went missing, and only for the one beat whose whole job is to set the scene
// the room opens on. Walk out and back in and the wall was blank again.
let stageWallRoom = null;
const HAS_BEATS = (theme.content?.MISSIONS ?? [])
  .some(m => Array.isArray(m?.beats) && m.beats.length > 0);

const interiors = createInteriors({
  scene, camera, theme, def, calcs: BALLPARK_CALCS,
  colliders: world.colliders,
  interactables: world.interactables,
  player: { getPosition, teleport, setGround, setBounds },
  townGround: world.groundHeight,
  townBounds: theme.site?.terrain?.playerLimit ?? 105,
  // Walking there costs time. Standing in a laboratory with nothing open in it
  // does not.
  onEnter: (id, room) => {
    const stop = world.stopMeshes.get(id);
    if(stop && id === nextStopGroup()) walkCost(getPosition().distanceTo(stop.entry));
    // THE PEOPLE COME INSIDE.
    //
    // Named people stand at their area's building, outdoors, because that is
    // where the world's own stations are — so every room was furnished, lit and
    // empty, and a mission beat spoken by somebody indoors had nobody to be
    // spoken by. This puts the area's cast in the room as the door opens.
    //
    // Two-thirds of the way back and facing the door, which is where a room
    // reads as occupied from the threshold. The bounds are the room's own — see
    // `bounds` in interiorBuilding.js, which exists so nothing has to keep a
    // second copy of the wall positions — and `origin` is where the room sits in
    // the interior district, four kilometres out in x.
    peopleIndoors(id, room);
    // THE CONTROL WALL, and what it already said.
    //
    // Built with the room, because the room is built on entry and thrown away
    // on exit. Its rows come out of campaign state, so a room left with an amber
    // warning on the wall still has it when the player walks back in — the
    // bible's word for the effect is `persistent_world_change` and a board that
    // resets at the door is not persistent.
    stageWall?.dispose();
    // The room has no name of its own — `bounds` is all it exposes — so the
    // board is titled from the site, which is where the door's name comes from
    // too. Never from the area's subject: "Reactor & Conversion" is not what is
    // written over the door the player just walked through.
    const named = (theme.site?.buildings ?? []).find(b => b.enter === id || b.id === id);
    // The spot this room's board took the first time, so it takes the same one
    // every time. See the note on `addStageWall`: what is standing in a room
    // changes between visits, and the board may not.
    const st0 = getState();
    stageWall = HAS_BEATS
      ? addStageWall(room, { title: named?.name ?? '', spot: st0?.stageWallSpots?.[id] ?? null })
      : null;
    stageWallRoom = id;
    if(stageWall && st0){
      if(!st0.stageWallSpots) st0.stageWallSpots = {};
      // A spot saved before the board could take a side wall has no `axis`, so
      // `addStageWall` ignores it and reasons again — and this overwrites it
      // with one that knows which wall it is on.
      const had = st0.stageWallSpots[id];
      if(!had || !had.axis){ st0.stageWallSpots[id] = stageWall.spot; save(); }
    }
    const saved = getState()?.stageWalls?.[id];
    if(stageWall && Array.isArray(saved) && saved.length) stageWall.set(saved);
    // The arrival beat. Fired after the room is standing AND after the cast is
    // in it, so a bubble has somebody to point at. Once per mission: a beat that
    // replays every time the player walks back through the door tells them the
    // world is a loop. beats.js records what it has played.
    // The arrival beat. The clock is already running by now — it starts when the
    // briefing is accepted, in `onDayStart` — so this is only a backstop for a
    // room entered without one, and `start()` is idempotent.
    if(!beats?.fire({ kind: 'enter', at: id }, { done: startMissionClock })) startMissionClock();
  },
  // Back to their own doorstep, or back off the street. A no-op in a theme
  // that never brought them in.
  onExit: (id) => {
    stationIndoors(id, null);
    // And the visitor goes back to their own doorstep too, or they are left
    // standing in an empty intake for the rest of the campaign.
    if(roomGuests.length){ stationPeople(roomGuests, null); roomGuests = []; }
    guestStation = null;
    guestKey = null;
    stageWall?.dispose();
    stageWall = null;
    stageWallRoom = null;
  },
});

// ----------------------------------------------------------------- beats
// What happens when the player walks in, and after each stop. Every beat is
// book data; this is only the plumbing that gives beats.js the things it cannot
// reach — the camera, the crowd, the control wall of the room the player is in,
// and the two HUD surfaces it writes to. A theme whose book has no `beats` never
// fires one and pays two function calls a frame for the privilege.
const beatPanelEl = document.getElementById('beatPanel');
const beats = initBeats({
  theme, camera,
  renderer,
  // The campaign state, handed over rather than imported: beats.js has a node
  // selftest and a module that reaches gameState cannot be loaded outside a
  // browser at all.
  getState, save,
  npcByCharId: (id) => getNPCByCharId(id),
  // ------------------------------------------------ WHERE DIALOGUE IS PRINTED
  //
  // The verdict card's own dialogue slot when one is on screen, and nothing
  // otherwise. An after-stop beat fires within a second of that card appearing,
  // so its balloon used to be out in the world behind the card the player is
  // reading, pointing at a head the card is covering. Given a host, beats.js
  // prints the whole run there with each speaker's face beside their words.
  //
  // Arrival beats and the outcome beat get null and keep the world balloon:
  // there is no card open when they fire.
  hostFor: () => {
    const overlay = document.getElementById('verdictOverlay');
    if(!overlay?.classList.contains('show')) return null;
    return document.getElementById('verdictDialogue');
  },
  // ------------------------------------------------- WHERE A WORLD CHANGE GOES
  //
  // Onto the control wall of the room the player is standing in. A beat's
  // `persistent_world_change` is rows on that board — a lamp and a reading, a
  // sort into named columns, a lit path between three units — and not a
  // sentence, which is what it was and what was reported: "you aren't showing
  // the world states, you are just saying them as text."
  //
  // The rows are kept in campaign state as well as on the board, because the
  // bible calls the effect *persistent*: a player who leaves a room with an
  // amber warning on its wall has to find it still amber when they come back,
  // and the board itself is rebuilt every time the room is entered.
  stage: (rows, { flash = false, at = null } = {}) => {
    // THE BEAT'S OWN AREA FIRST. Where the player is standing is the fallback
    // and not the answer: a person stop answered in the open used to file the
    // rows against nothing, and the board the beat was describing stayed blank
    // for the rest of the campaign.
    const roomId = at ?? stageWallRoom ?? interiors.current?.id ?? null;
    const st = getState();
    if(st && roomId){
      if(!st.stageWalls) st.stageWalls = {};
      st.stageWalls[roomId] = rows;
      save();
    }
    // Only light the board actually standing in front of the player. A beat for
    // a room they are not in has still happened — it is in the state above, and
    // the room puts it up when they walk in.
    //
    // RETURNS WHETHER THE PLAYER CAN SEE IT. `beats.js` prints its `world`
    // sentence only when nothing showed the change, so this has to be honest:
    // true means the rows are on a board in the room the player is standing in.
    if((!roomId || roomId === stageWallRoom) && stageWall){
      stageWall.set(rows, { flash });
      return true;
    }
    return false;
  },
  // The bible's own sentence for what just changed, as a subtitle under the
  // change. It labels something the player can see; it does not stand in for it.
  // NO TIMER ON IT. The caption labels a change that is still on the wall, and
  // it comes down when the player opens their next call — the same moment the
  // held bubble does. On a read-speed fade it was gone before they had walked
  // across the plant to the thing it was about. An empty string is the
  // take-down, which is what `beats.dismiss()` sends.
  caption: (text) => {
    const el = document.getElementById('beatCaption');
    if(!el) return;
    const line = String(text ?? '').trim();
    if(!line){ el.classList.remove('show'); el.textContent = ''; return; }
    el.textContent = line;
    el.classList.add('show');
  },
  panel: (text) => {
    if(!beatPanelEl) return;
    beatPanelEl.textContent = text;
    beatPanelEl.classList.toggle('show', !!String(text ?? '').trim());
  },
  waypoint: (text) => {
    // The next destination goes where the day's own objective line goes, under
    // the clock, because that is where a player already looks for "where now".
    const why = document.getElementById('objectiveWhy');
    if(why && String(text ?? '').trim()) why.textContent = text;
  },
});

// Which of this mission's own stop numbers have closed. The book counts stops
// from one within the mission, which is how the bible is written; translating
// to a campaign-wide index is somewhere for an off-by-one to live.
function missionStopsClosed(){
  const st = getState();
  return (st?.missionStopsCompleted ?? []).map(i => i + 1).sort((a, b) => a - b);
}
onStopClosed((stopIndex) => {
  const closed = missionStopsClosed();
  const st = getState();
  const mission = theme.content.MISSIONS[(st?.week ?? 1) - 1];
  const total = (mission?.stops ?? []).length;
  const lastStop = total > 0 && closed.length >= total;
  // The outcome beat waits for the per-stop beat to be read, or plays on its
  // own when the last stop has none. Chaining through `done` rather than
  // firing both is what stops the mission hook talking over the stop's own.
  // RESOLUTION ORDER, and it is the bible's, in this order:
  //   1. stop the clock when the final graded stop is done
  //   2. play the outcome beat
  //   3. apply the authored deltas and name what caused them
  //   4. fail the mission if a bar collapsed
  //   5. work out the Recovery Points
  //   6. let the player spend or bank them
  //   7. the concept review, then the next briefing
  // Steps 3 to 7 are `openMetricScreen`, chained behind the outcome beat so the
  // award never talks over the scene that earned it.
  //
  // AND IT WAITS FOR THE VERDICT TO COME DOWN FIRST.
  //
  // `openMetricScreen` writes the end-of-shift card into `#overlay`, which is
  // the same overlay the question panel is using — and the last stop's verdict
  // is still on screen when this runs, because the whole chain fires out of
  // `markMissionStopComplete`, one frame into `finishVisit`. So the card went
  // up behind the verdict, and the Continue the player then pressed ran
  // `closeVerdict(); closeModal();` and took the overlay's `show` class with it.
  // Symptom: finish every question in mission 1 and no end-of-mission card ever
  // appears. It is the same collision `sleepNow` already guards against — "the
  // day controller puts its end-of-day card up in the same overlay this modal is
  // using, and closing afterwards would close the card instead" — and this is
  // the one path that reaches the overlay before the close rather than after it.
  //
  // Only Red Sand has metric bars, which is why sixty-odd campaigns never met
  // it: `openMetricScreen` returns immediately without them.
  const openMetricsWhenClear = () => {
    const up = (id) => document.getElementById(id)?.classList.contains('show');
    if(!up('verdictOverlay') && !up('overlay')){ openMetricScreen(); return; }
    // Every way out of a visit — Continue, move on, wait it out, walk away —
    // ends on this event, so there is no exit that leaves the card unopened.
    // One frame later, so the two `classList.remove('show')` calls that come
    // with it have already run and cannot take this card's own class off.
    const once = () => {
      window.removeEventListener('projecty:visitdone', once);
      requestAnimationFrame(() => openMetricScreen());
    };
    window.addEventListener('projecty:visitdone', once);
  };
  const endBeat = () => {
    if(!lastStop) return;
    if(!beats.fire({ kind: 'mission-end' }, { done: METRICS ? openMetricsWhenClear : undefined })){
      if(METRICS) openMetricsWhenClear();
    }
  };
  // Step 1, before anything else: the clock stops on the last graded stop, not
  // when the player finishes reading about it.
  if(lastStop && missionClock) missionClock.stop();
  const stopBeat = () => {
    if(!beats.fire({ kind: 'stop', stop: stopIndex + 1, closed }, { done: endBeat })) endBeat();
  };
  // THE ARRIVAL BEAT CANNOT BE SKIPPED BY A PERSON STOP.
  //
  // A day's first call is often a person, and people stand *outside* their own
  // area's door — so the player can answer stop 1 in the open air and never
  // have entered the room whose `enter` beat sets the scene for it. The beat
  // then arrives after the beat that answers it, which reads as the mission
  // playing out of order. So a closing stop fires its area's arrival beat
  // first, and chains its own behind it. beats.js has already recorded a beat
  // that played on the door, so this is a no-op in the ordinary case.
  const area = (mission?.stops ?? [])[stopIndex]?.group;
  // ONE FRAME LATER, so the verdict card exists to print the dialogue on.
  //
  // `markMissionStopComplete` is called near the top of `finishVisit` and the
  // verdict card is written two hundred lines further down it — so a beat fired
  // straight from here ran while there was no card on screen, `hostFor` returned
  // null, and the dialogue went out into the world behind the card that was
  // about to appear. Measured: verdict "Correct" on screen, dialogue slot empty,
  // world balloon up.
  requestAnimationFrame(() => {
    if(area && beats.fire({ kind: 'enter', at: area }, { done: stopBeat })) return;
    stopBeat();
  });
});

// ------------------------------------------------------------- the vehicles
// The parked trucks are driveable. `props.js` registered them; this is the
// controller, and it needs the world's own arrays so a moving vehicle collides
// with the same boxes the player does.
const driving = createDriving({
  camera,
  colliders: world.colliders,
  softColliders: world.softColliders,
  groundHeight: world.groundHeight,
  bounds: theme.site?.terrain?.playerLimit ?? 105,
  input: () => moveState,
  player: { teleport, getPosition },
});

// A theme whose sites are kilometres apart parks an aircraft instead. `props.js`
// registers it with `flyable()`; a theme with none never builds one and this
// controller sits idle. The collective is its own two keys — the walk keys are
// already spoken for and a helicopter needs a third axis.
const lift = { up: false, down: false };
const flying = createFlying({
  camera,
  colliders: world.colliders,
  groundHeight: world.groundHeight,
  bounds: theme.site?.terrain?.playerLimit ?? 105,
  input: () => ({ ...moveState, up: lift.up, down: lift.down }),
  player: { teleport, getPosition },
});

// --------------------------------------------------------------- the trial
// TRIAL is the one format that is graded against the place rather than against a
// board, so it needs the scene, the player and the spawn. `questionUI` gets a
// handle rather than an import: it is loaded in Node by `instrumentGoals.mjs`
// and in a page with no scene by `instruments.html`, and a three.js import on
// that path breaks both. Every harness registers nothing and the format renders
// with its run button disabled, which is what keeps it inspectable.
const trial = createTrial({
  // Floor-to-floor, where the world has floors on one footprint. Undefined in
  // every other game, and TRIAL then behaves exactly as it always has.
  rise: world.floorRise?.() ?? 0,
  // Escape belongs to whatever is on top. Without this, closing the lift panel
  // mid-lap also abandoned the lap.
  panelOpen: () => overlay.classList.contains('show'),
  scene,
  camera,
  getPosition,
  groundHeight: world.groundHeight,
  spawn: theme.start ?? theme.site?.spawn ?? { x: 0, z: 0 },
  player: { teleport },
  // The stop is opened from a case stand inside a building, and a theme's
  // interiors are built four kilometres along +x. Without this the player is
  // handed back to a room with the gates over the horizon.
  onLeaveRoom: () => interiors.exit?.(),
  // The gates go on the map, and the day's own calls come off it. See map.js.
  pins: setMapPins,
});
// The five that arrived after it — GREET, FOLLOW, HUNT, CANVASS, EVADE — share
// one lifecycle in `worldFormats.js` for the reason house rule 1 exists. Four of
// them are about people, so the crowd goes across; HUNT draws its items on the
// map, and gets a callback rather than reaching into `engine/core` from the
// world layer.
const worldFormats = createWorldFormats({
  scene,
  camera,
  panelOpen: () => overlay.classList.contains('show'),
  // Floor-to-floor, where the world has floors on one footprint. Undefined in
  // every other game, and all seven runs then measure exactly as they always did.
  floorRise: world.floorRise?.() ?? 0,
  getPosition,
  groundHeight: world.groundHeight,
  spawn: theme.start ?? theme.site?.spawn ?? { x: 0, z: 0 },
  player: { teleport },
  onLeaveRoom: () => interiors.exit?.(),
  people: getNPCs,
  pins: setMapPins,
  bounds: theme.site?.terrain?.playerLimit ?? Infinity,
  // The same predicate the crowd walks by. Without it a guide walks through
  // parked cars and building corners, which is what a player saw first.
  blocked: (x, z, pad = 1) => world.colliders.some(c =>
    x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
});

/**
 * Whether one of the seven world-graded formats has the player out in the world.
 *
 * A run owns the world while it lasts. Walking up to somebody during a GREET is
 * the greeting, and popping their three-paragraph biography over it is the
 * passage feature answering a question nobody asked — so interaction is off for
 * the duration, prompt and key alike. The clock is frozen, the panel is down,
 * and the only thing that ends a run is the run.
 */
const runActive = () => trial.active || worldFormats.active;
/**
 * The interactions a run leaves switched on, because they are not content.
 *
 * A lift is the only way between the floors of a stacked building and a vehicle
 * is what a far lap is taken in — so with interaction off wholesale, a TRIAL that
 * spans floors cannot be finished and neither can the far lap that says "take the
 * vehicle" on its own card. Reported by a player, on a run, in a tower: the lift
 * worked all day and did nothing during the lap.
 */
// `roomdoor` is on the list for exactly that reason: the doors on a floor plan
// are shut now, so a run whose gates are inside rooms is unfinishable without
// them. Opening a door is getting somewhere, not answering something.
const RUN_LOCOMOTION = new Set(['lift', 'vehicle', 'aircraft', 'roomdoor']);
setWorldHandle({
  run: (spec, done) => trial.start(spec, done),
  greet: (spec, done) => worldFormats.greet(spec, done),
  follow: (spec, done) => worldFormats.follow(spec, done),
  hunt: (spec, done) => worldFormats.hunt(spec, done),
  canvass: (spec, done) => worldFormats.canvass(spec, done),
  evade: (spec, done) => worldFormats.evade(spec, done),
  tag: (spec, done) => worldFormats.tag(spec, done),
  // Whichever of the six is running. Both calls are no-ops when idle, and the
  // panel that owns the run is the only thing that knows which one it started.
  abort: () => { trial.finish(true); worldFormats.finish(true); },
});

// ------------------------------------------------------------------ the day
// A mission is a working day: the plan opens it, the countdown runs it down in
// real time whatever the player is doing, and running out restarts it.
const day = createDay({
  theme, def,
  positionOf: (id) => {
    const s = world.stopMeshes.get(id);
    return s ? { x: s.pos.x, z: s.pos.z } : null;
  },
  // The town's own start, not wherever the player happens to be standing. A
  // day's budget must not depend on which corner yesterday ended in — and a
  // restart taken from inside an interior measured a route to the interior
  // district, four kilometres away, and handed out a forty-hour day.
  spawn: () => theme.start ?? theme.site?.spawn ?? { x: 0, z: 0 },
  // The plan card is 70vh tall with a table under the map, so the map gets a
  // box rather than the whole card.
  mapHTML: () => renderMap({ maxW: 660, maxH: 340 }),
  // The orientation laps. Absent unless the site has two tiers of ground, which
  // is what makes every interior game — and every compact outdoor one — ignore
  // this entirely without a flag to set. The gates are the areas' own entry
  // points, so the lap follows the buildings the way the budget does.
  // ---------------------------------------------------------- the warm-ups
  //
  // Seven world-graded runs, one before each of the campaign's first days. The
  // schedule is `engine/core/warmups.js` and the story is the book's `warmups`
  // block, so nothing about which run comes when is decided here — this is only
  // the wiring that turns a due run into a started one.
  //
  // Every game has these now, including the interiors: TRIAL's gates are the
  // areas' own entry points and GREET's roster is the cast, both of which every
  // campaign has. The far lap is the one that is still geometry, and it is absent
  // wherever `tiersFor` says the ground is one tier.
  runLap: {
    due: (week, done) => warmupDue(week, done, theme.content?.WARMUPS ?? {}, {
      days: (theme.content?.MISSIONS ?? []).length || 15,
      hasFar: TIERS.hasFar,
      unlockDay: UNLOCK_DAY,
      // No run before mission 1 on a campaign the four bars time. See warmups.js.
      opener: !METRICS,
      // …and none at all where the campaign says it has none.
      runs: theme.warmupRuns !== false,
    }),
    cardHTML: (lap) => lapCardHTML(lap, lap.far
      ? `The keys are on the board from this ${DAY_NOUN.toLowerCase()}.`
      : ''),
    start: (lap, onDone) => {
      // The day's own markers go down for the length of the run and come back
      // however it ends — finished, timed out or given up — so the flag can never
      // be left off on a world with no run in it.
      const done = (r) => { showDayMarkers(true); onDone(r); };
      showDayMarkers(false);
      // `entry`, not `pos`. `pos` is the middle of the building — the point the
      // roof is over — so a run aimed at it sends a walker into a solid collider:
      // TRIAL's gates rendered under the floor for exactly this reason, and
      // FOLLOW's guide walked into the wall of the first area and oscillated
      // against it for the whole run, because a leg is only finished at 0.3 m and
      // a point inside a building is never reached. `entry` is the standing spot
      // outside the door, and it is the same point the crowd's stations, the map's
      // waypoint and the day's route budget all use.
      // `y` as well as (x, z), because in a stacked building the floor is part of
      // where a place is — see `floorRise` in engine/world/interiorTower.js. Every
      // other world puts every area at y = 0 and nothing downstream changes.
      const entryFor = (id) => {
        const s2 = world.stopMeshes.get(id);
        if(!s2) return null;
        const p = s2.entry ?? s2.pos;
        return { x: p.x, z: p.z, y: p.y ?? 0, level: s2.level ?? null };
      };
      // The subtitle over somebody's head is their job, not their department code.
      // `division` is a four-letter area id — OPS, TRI, SONAR — which is what the
      // save file and the map need and is not a thing a person would say about
      // themselves. `role` is the authored job title, and a greeting round is
      // exactly the run where knowing what somebody does is the point.
      const roster = () => (theme.content?.ROSTER ?? []).map(p => ({
        id: p.id, name: p.name,
        where: p.role ?? p.title ?? p.division ?? p.group ?? '' }));
      const areaPoints = () => (theme.content?.GROUPS ?? [])
        .map(g => entryFor(g.id)).filter(Boolean);
      const started = (() => {
        switch(lap.format){
          case 'TRIAL': {
            // A lap of ONE tier of ground. The near lap used to be handed every
            // area on the site, so at Planetary Defense — base camp inside 200 m
            // and the outstations 1.6 km down the ridge — the first morning's lap
            // was the whole range, and its countdown came out at eighty-one
            // minutes. The tiers already exist and `orientation.js` computes them
            // from the map; the far lap is the far half and the near lap is the
            // rest, which is what makes the second lap worth taking.
            const tierGroups = lap.far ? TIERS.far
              : (TIERS.hasFar ? TIERS.near : (theme.content?.GROUPS ?? []).map(g => g.id));
            // A lap with nothing to visit is not a lap. Better to say nothing
            // happened than to drop the player at the spawn with no gates.
            //
            // Capped at WARMUP_MAX_STOPS, in the site's own order: a lap of ten
            // sheds is a tutorial, not an orientation. An authored `groups:` is
            // capped the same way — the cap is about how long a player is kept
            // off the work, not about who chose the list.
            const gates = gatesFor({ ...lap,
              groups: (lap.groups ?? tierGroups).slice(0, WARMUP_MAX_STOPS) }, entryFor);
            // Driven rather than walked where the vehicles have just come out, so
            // the far lap is not given an hour for ground it crosses in a truck.
            return gates.length >= 2 && trial.start({ gates,
              limit: +lap.seconds || trialLimit(gates, theme.start,
                { pace: lap.far ? 6 : 1.35, rise: world.floorRise?.() ?? 0 }) },
              done);
          }
          case 'GREET': {
            const list = (lap.roster ?? roster()).slice(0, WARMUP_MAX_STOPS);
            return list.length >= 2 && worldFormats.greet({
              roster: list,
              target: +lap.target || Math.min(WARMUP_MAX_STOPS,
                Math.max(2, Math.ceil(list.length * 0.7))),
              minutes: +lap.minutes || 60, hint: lap.hint, moral: lap.moral }, done);
          }
          case 'FOLLOW': {
            const guide = lap.guide ?? (theme.content?.ROSTER ?? [])[0]?.id;
            const path = lap.path ?? areaPoints();
            return !!guide && path.length >= 2 && worldFormats.follow({
              guide, path, band: lap.band ?? { near: 3, far: 14 },
              speed: +lap.speed || 1.5, seconds: +lap.seconds || 90 }, done);
          }
          case 'HUNT': {
            const at = lap.at ?? areaPoints();
            return at.length >= 2 && worldFormats.hunt({
              at, item: lap.item ?? { name: 'marker' },
              target: +lap.target || at.length, minutes: +lap.minutes || 45 }, done);
          }
          case 'CANVASS': {
            const pop = lap.population ?? roster();
            return pop.length >= 2 && worldFormats.canvass({
              population: pop, minutes: +lap.minutes || 60,
              question: lap.question, target: +lap.target || 0 }, done);
          }
          case 'EVADE':
            // `pursuer`, not `quarry`: EVADE is the one format where the named
            // person is chasing rather than being chased, and passing the wrong
            // key here started a run with nobody in it that ended on its first
            // frame — a HUD that never appeared and a lap marked done.
            return worldFormats.evade({
              pursuer: lap.pursuer ?? lap.quarry ?? (theme.content?.ROSTER ?? [])[0]?.id,
              distance: +lap.distance || 9, seconds: +lap.seconds || 30,
              speed: +lap.speed || 3.4 }, done);
          case 'TAG':
            return worldFormats.tag({
              quarry: lap.quarry ?? (theme.content?.ROSTER ?? [])[0]?.id,
              reach: +lap.reach || 2.5, seconds: +lap.seconds || 30,
              speed: +lap.speed || 2.8 }, done);
          default: return false;
        }
      })();
      // A run that could not be built is a run that is over. The alternative is a
      // player looking at a spawn point with no instructions and no way back.
      if(!started) done();
    },
  },
  // The day stops while a panel is up. PANEL_PACE is 0 for every game now — the
  // clock is there to make the route a decision, and no route decision is being
  // made while a question is open. `panelFreezesClock` stays because a format
  // may declare `pausesClock` and must keep freezing even if PANEL_PACE is ever
  // put back; BELT is the one that does.
  // `panelFreezesClock` is tested FIRST, not inside the overlay branch: a TRIAL
  // suspends its panel and sends the player out to drive the route, so the run
  // that must not be charged is happening with the overlay down.
  pace: () => (panelFreezesClock() ? 0
    : overlay.classList.contains('show') ? PANEL_PACE : 1),
  ui: {
    // Every card that comes through here is a decision with named ways out on
    // it: take the run or pay to skip it, start the day or go back to it, take
    // the day again. The corner X and Escape are neither of those — they put the
    // overlay down and leave the decision unmade, so the morning carries on with
    // the run not taken and not marked, or the plan never accepted and the clock
    // never started. A question is different: walking away from one hands the
    // stop back and costs the player the answer, which is a real choice, so
    // `questionUI` keeps both and clears the lock on its way in.
    open(title, html, actions){
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalEyebrow').textContent = '';
      document.getElementById('modalBody').innerHTML = html
        + `<div class="modalActions">` + actions.map(a =>
            `<button class="btn ${a.primary ? 'primary' : ''}" id="${a.id}" type="button"`
            + `${a.disabled ? ' disabled' : ''}>${a.label}</button>`).join('') + `</div>`;
      setModalLock(true);
      overlay.classList.add('show');
      if(document.pointerLockElement) document.exitPointerLock();
      for(const a of actions){
        const b = document.getElementById(a.id);
        if(b) b.onclick = a.onClick;
      }
    },
    close(){ setModalLock(false); overlay.classList.remove('show'); },
  },
  onDayStart: () => {
    // The bars as this shift found them, for a collapse to restart from.
    snapshotMetrics();
    // THE SHIFT CLOCK STARTS THE MOMENT THE BRIEFING IS ACCEPTED.
    //
    // The bible starts it when the arrival beat closes, which meant the walk
    // across the plant to the first call was free — and the walk is the part of
    // a shift the player actually controls. Starting it here puts the travel on
    // the clock, which is the whole reason the target time is six minutes and
    // not six minutes of standing in one room.
    startMissionClock();
    updateHUD(); refreshWorld();
  },
  onDayEnd: (outstanding) => showDayOver(outstanding),
});

/**
 * The end of a day, either way it happens.
 *
 * Outstanding calls mean the day is retaken — that is the only hard rule in
 * the game, and a fresh set of conversations is what keeps it from being a dead
 * end. It used to be that plus a morning stipend; the stipend is 0 now, so the
 * people in the town are the whole of the way back from broke.
 */
function showDayOver(outstanding){
  const state = getState();
  if(outstanding > 0){
    day.ui.open(`The day ran out`,
      `<div class="briefBox"><p><b>${outstanding} call${outstanding === 1 ? '' : 's'} still open when the light went.</b></p>`
      + `<p>Tomorrow is this same day again — the calls reopen, the clock refills, and everybody in the town is worth talking to again.</p></div>`,
      [{ id: 'dayRetry', label: 'Take the day again', primary: true, onClick: () => retakeDay() }]);
    return;
  }
  // What the day amounted to, and somebody in the building saying so. Composed
  // by the engine from this day's own results — see `engine/core/debrief.js` for
  // why it is not authored, and why a day on which nothing held does not get
  // told it went well.
  //
  // The last card of a campaign neither offers a next day nor hands over a
  // takeaway to carry into one: `completeMission` returns 'won' and the
  // campaign's own ending is the next thing up.
  const lastDay = state.week >= WEEKS;
  const debrief = dayDebrief(theme.content ?? {}, state, {
    dayNoun: DAY_NOUN,
    grade: theme.audience?.grade,
    lastDay,
  });
  // The debrief is how the day went; the handover is what it left behind. Under
  // it rather than inside it, because one is composed from the day's results and
  // the other is true whichever way the day went.
  day.ui.open(`${DAY_NOUN} ${state.week} closed`,
    debrief.html
      + deliveryGainHTML(theme, state, { dayNoun: DAY_NOUN, grade: theme.audience?.grade })
      + (COPY.dayEnd ? `<div class="briefBox"><p>${COPY.dayEnd}</p></div>` : ''),
    [{ id: 'dayNext',
      label: lastDay ? 'See how it ended' : `Start the next ${DAY_NOUN.toLowerCase()}`,
      primary: true, onClick: () => {
      const res = completeMission();
      day.ui.close();
      updateHUD(); refreshWorld();
      // The last mission ends the campaign, and a campaign that ends without saying
      // how it turned out is fifteen days of work answered with a HUD label.
      if(res === 'won') showEnding(theme, day.ui);
      else day.showPlan();
    } }]);
}

/**
 * THE POST-MISSION METRIC SCREEN — steps 3 to 7 of the bible's resolution order.
 *
 * Everything the player is told here is either something they did (the clock and
 * the wrong answers) or something the shift did to them with a named cause. The
 * one thing that is theirs to decide is where the Recovery Points go, and this
 * screen does not decide it: no recommendation, no default allocation, and
 * banking every point is a legitimate answer.
 *
 * A mission with no authored plan in `theme.metrics.missions` opens nothing and
 * falls through to the ordinary day-over card. That is deliberate — a screen
 * awarding points off numbers nobody wrote is worse than no screen — and it is
 * why only mission 1 has one today.
 */
function openMetricScreen(){
  const state = getState();
  const week = state?.week ?? 1;
  const plan = missionPlan(theme, week);
  if(!plan){ showDayOver(0); return; }
  if(!state.metrics) state.metrics = freshMetrics(theme);

  // 3 — the authored story deltas, with the event that caused them.
  const { changes, collapsed } = applyDeltas(theme, state.metrics, plan.deltas ?? {},
    { cause: plan.event });

  // 5 — the award. Time and correctness, both of which the player controls.
  const elapsed = missionClock ? missionClock.elapsed() : 0;
  const incorrect = wrongThisMission();
  const rp = recoveryPoints(theme, { target: plan.target ?? 0, elapsed, incorrect });
  const awarded = award(theme, state.metrics, week, rp.rp);
  save();

  const report = { mission: week, elapsed, target: plan.target ?? 0,
                   incorrect, rp, awarded, changes, collapsed, event: plan.event };

  // 4 — a collapsed bar ends the mission. Offered as a retake of this shift from
  // the snapshot taken when it started, so the loss is real without being a
  // dead campaign.
  if(collapsed.length){
    day.ui.open(`${DAY_NOUN} ${week} failed`,
      metricScreenHTML(theme, state, report),
      [{ id: 'metricRetry', label: `Take the ${DAY_NOUN.toLowerCase()} again`, primary: true,
         onClick: () => { restoreMetricSnapshot(); day.ui.close(); retakeDay(); } }]);
    return;
  }

  /**
   * GO DEEPER, ON THE CARD THAT SAYS THE SHIFT IS COMPLETE.
   *
   * It was one card further on, beside the concept review, which is a card the
   * player is already leaving. This is the screen they stop on — the bars, the
   * clock, the points — so it is where an optional review is worth offering.
   * It changes nothing: `continueOn` below is reached the same way whether it
   * was opened or not.
   */
  const deeper = (theme.content?.MISSIONS ?? [])[week - 1]?.deeper;
  const continueOn = { id: 'metricNext', label: 'Continue', primary: true, onClick: () => {
      save();
      // Locks are campaign events with a mission number on them, and they are
      // decided after the spending: a bar the player just pushed to 100 is
      // eligible on the same shift that made it so.
      for(const key of lockable(theme, state.metrics, week)) lock(state.metrics, key);
      save();
      day.ui.close();
      openConceptReview(plan, week);
    } };
  /**
   * The card, drawn from the report that has already been worked out.
   *
   * A function rather than a call, because Go Deeper has to come BACK here and
   * re-opening `openMetricScreen` would apply the shift's deltas and award its
   * points a second time. Everything above this line happens once; everything
   * below it is drawing.
   */
  const showCard = () => {
    const goDeeper = hasDeeper(deeper) ? [{ id: 'goDeeper', label: 'Go deeper',
      onClick: () => openDeeper(deeper, showCard) }] : [];
    day.ui.open(`${DAY_NOUN} ${week} complete`,
      metricScreenHTML(theme, state, report),
      [...goDeeper, continueOn]);
    bindMetricScreen(document.getElementById('modalBody'), theme, state,
      { onChange: () => { save(); updateMetricHUD(); } });
  };
  // 6 — spend or bank.
  showCard();
}

/** 7 — the quick concept review, then the next briefing. */
function openConceptReview(plan, week){
  const lines = plan.review ?? [];
  const lastDay = week >= WEEKS;
  const next = () => {
    const res = completeMission();
    day.ui.close();
    updateHUD(); updateMetricHUD(); refreshWorld();
    if(res === 'won') showEnding(theme, day.ui);
    else { snapshotMetrics(); day.showPlan(); }
  };
  // Go deeper is NOT here. It was, and this is the card the player is already
  // leaving; it is offered on the shift-complete screen above instead.
  const onward = { id: 'reviewNext', primary: true,
    label: lastDay ? 'See how it ended' : `Start the next ${DAY_NOUN.toLowerCase()}`,
    onClick: next };
  if(!lines.length){ next(); return; }
  day.ui.open('What that shift settled', reviewHTML(lines), [onward]);
}

/**
 * The optional review itself. Nothing it does is written down anywhere.
 *
 * The bible puts it after the mission is complete and says what it must not do:
 * change no metric, no Recovery Point, no unlock. `back` redraws the card the
 * player came from, so reading this leaves the end of a shift exactly where not
 * reading it would have.
 */
function openDeeper(deeper, back){
  day.ui.open('Go deeper', deeperHTML(deeper),
    // BACK, not onward. The points on the card behind this may not be spent
    // yet, and sending the player past that screen because they read a review
    // would take the one decision the end of a shift actually asks of them.
    [{ id: 'deeperBack', label: 'Back', primary: true, onClick: back }]);
  bindDeeper(document.getElementById('modalBody'));
}

/**
 * The bars as they stood when this mission began.
 *
 * A collapse restarts from here, so it has to be taken before the mission's own
 * deltas land and not after — and it may not include the Recovery Bank spending
 * the player has already done, which is theirs.
 */
function snapshotMetrics(){
  if(!METRICS) return;
  const st = getState();
  if(!st?.metrics) return;
  st.metricsSnapshot = { bars: { ...st.metrics.bars }, locked: [...(st.metrics.locked ?? [])] };
  save();
}
function restoreMetricSnapshot(){
  const st = getState();
  const snap = st?.metricsSnapshot;
  if(!snap || !st.metrics) return;
  st.metrics.bars = { ...snap.bars };
  st.metrics.locked = [...(snap.locked ?? [])];
  // The wrong answers go back with the bars: a retaken shift is scored fresh.
  if(st.wrongSubmissions) st.wrongSubmissions[st.week] = 0;
  save();
  updateMetricHUD();
}

// ------------------------------------------------------------------- co-op
//
// Everything below is inert unless the page was opened with `?room=CODE`.
//
// Which SPACE the player is in, not only where they are. Interiors are built in
// a district four kilometres along +x, so a teammate's coordinates mean nothing
// without knowing which room they belong to — without this, somebody who walked
// through a door appears to everyone outside as a figure standing far out across
// the terrain.
const coopSpace = () => (interiors.current ? `int:${interiors.current.id}` : 'out');
/** Seconds since the room last asked whether anybody new is expected in it. */
let guestAccum = 0;

const coop = createCoopHUD({
  room, getState,
  getPosition: () => getPosition(),
  getYaw: () => camera.rotation.y,
});

// A campaign written by somebody else. `applyRemoteState` keeps our own copy of
// the day's clock, which is the server's, and swaps everything else.
room.onState((next) => {
  const wasEnded = !!getState()?.dayEnded;
  if(!applyRemoteState(next)) return;
  updateHUD();
  refreshWorld();
  // Somebody accepted the plan. Standing on a plan card for a day that is
  // already running is standing outside the day — the clock moves, the calls
  // are open, and this player sees a briefing.
  if(next.dayStarted && !next.dayEnded && day.planOpen) day.resume();
  // Somebody TURNED IN. `endDayNow` sets `dayEnded` and stops the room's clock,
  // so from this side the day is over and there is nothing left that can notice
  // it: `dayRunning()` is false, so `tickDay` returns null instead of 'expired'
  // and the frame loop never reaches `day.close()`; `canSleep()` is false, so
  // the turn-in button stays hidden. The clock freezes, the calls stop
  // responding, no card appears, and reloading is the only way out — which is
  // what happened the first time this was played with two people.
  //
  // Raised here and only on the transition. The client that pressed the button
  // has already shown its own card and does not receive an echo of its own
  // write; a client whose clock ran out set `dayEnded` locally first, so
  // `wasEnded` is already true by the time her copy of it lands.
  if(next.dayEnded && !wasEnded){
    // The day-over card is written over whatever is on the overlay, which may be
    // a question panel this player was in the middle of. That skips
    // `questionUI`'s own close, and with it the `setPanel(false)` the room's
    // clock pace is decided from — so tomorrow would run at a quarter all day
    // because of a panel nobody has been looking at since last night.
    room.setPanel(false);
    day.close();
  }
});

// The clock is the server's, and the day ends two ways. Running out is noticed
// the way it always was: `tickDay` reads the room's countdown and returns
// 'expired' once, on the frame it reaches zero, and the frame loop turns that
// into the day-over card — listening for the server's `expired` as well would
// raise that card twice on any client that was running when it landed. Somebody
// turning in early is not on the clock at all; it arrives as a campaign write,
// and the handler above is where it is caught.

const COPY = theme.content.COPY ?? {};

// Built only where there is more than one floor to be on. `world.floorMenu` is
// the tower module's and undefined in every other world, so this is null and the
// `lift` handler below never fires — there is nothing in those games to press.
const floorLift = typeof world.floorMenu === 'function'
  ? createLift({
      world,
      teleport,
      // Charged through the day's own countdown rather than through `day.tick`,
      // which applies the panel rate — and the panel has just been closed, so
      // the rate at that instant depends on the order two lines run in.
      charge: (mins) => tickDay(mins, 1),
    })
  : null;

const activate = makeActivate({
  board: () => {
    renderStats();
    document.getElementById('statsOverlay').classList.add('show');
    if(document.pointerLockElement) document.exitPointerLock();
  },
  info: (t) => showInfo(t.prompt.replace(/^E — /, ''), COPY[t.id] || t.info || 'Nothing here yet.'),
  // Every door opens, mission stop or not. What changes is whether there is a
  // case on the stand inside.
  door: (t) => { if(!interiors.enter(t.id)) openVisit(t.id); },
  // A ROOM DOOR ON A FLOOR PLAN, which is a different thing from the `door` above:
  // nothing is entered and nothing opens on screen. The leaf swings and its
  // collider goes with it, and the player walks in themselves.
  roomdoor: (t) => { t.toggle?.(); },
  // OPENING A CALL IS WHAT ENDS THE BEAT. The held line and the world caption
  // stay up all the way across the site; they come down here, and in `npc`
  // below, because those are the two ways a stop is opened.
  case: (t) => { beatDismiss(); openVisit(t.id, false, t.stopIndex ?? null); },
  // The lift, in a building whose floors are stacked on one footprint. The
  // panel is the directory as well as the control: it is the only place all
  // four floors are named at once, because the map can only draw the one the
  // player is standing on.
  lift: () => floorLift?.open(),
  // A probe station. The feedback is the post itself — its face fills in and its
  // lamp goes from grey to blue — so there is nothing to open and nothing to say.
  station: (t) => {
    const read = interiors.readStation(t.id);
    if(read !== null) t.prompt = `Read — ${t.station?.label ?? t.id}`;
  },
  // The case where the campaign's product is kept. The board and the plinth say
  // how far through it is at a glance; this is the reading of it — every piece,
  // what each one was for, and which of them rests on a call that did not hold.
  delivery: () => {
    const state = getState();
    const { got, total } = deliveryProgress(theme, state);
    day.ui.open(theme.delivery?.name ?? 'The case',
      deliveryCaseHTML(theme, state, { dayNoun: DAY_NOUN, grade: theme.audience?.grade }),
      [{ id: 'deliverClose', label: got >= total && total ? 'It is finished' : 'Back to it',
         primary: true, onClick: () => day.ui.close() }]);
  },
  roomexit: () => interiors.exit(),
  // Held back on the same day as the aircraft, and for the same reason: on a
  // two-tier site the vehicles are what make the far ground reachable, and the
  // far ground has nothing open on it until the unlock day.
  vehicle: (t) => {
    if(getState().week < VEHICLES_FROM_DAY){
      showInfo(`The ${t.vehicle.label ?? 'vehicle'} is not signed out`,
        `<p>The keys come out on ${DAY_NOUN.toLowerCase()} ${VEHICLES_FROM_DAY}, with the run out `
        + `to the far end of the site. Today everything you have been called to is walkable.</p>`);
      return;
    }
    driving.enter(t.vehicle);
  },
  // A theme may hold the aircraft on the ground for the opening days:
  // `aircraftFromDay` is the first day it flies. Refusing has to say why — a key
  // that does nothing is a key the player decides is broken.
  aircraft: (t) => {
    if(getState().week < AIRCRAFT_FROM_DAY){
      showInfo(`The ${t.aircraft.label} stays on the pad`,
        `<p>It is not signed out to you yet. The ${t.aircraft.label} flies from `
        + `${DAY_NOUN.toLowerCase()} ${AIRCRAFT_FROM_DAY}; until then the range is driven.</p>`);
      return;
    }
    flying.enter(t.aircraft);
  },
  npc: (t) => { beatDismiss(); return openPersonOrPassage(t.npc, t.char, (person) => {
    // THE PASSAGE ERRAND IS NOT OFFERED INSIDE A ROOM THE DAY HAS CALLED YOU TO.
    //
    // The cast is brought indoors with the player, so every mission room is full
    // of people who each owe a dollar for a biography question — an errand
    // standing between the player and the call they walked in for. Talking is
    // still talking; what is withheld is the quiz.
    // `openStopGroups`, NOT `openCaseGroups`. The second one deliberately skips
    // person stops — it exists to light the marker over a case stand, and a
    // person is not a stand — so a room whose open call is a person came back
    // as having nothing open, which is every room where this matters most.
    const room = interiors.current?.id ?? stageWallRoom;
    const st = getState();
    const askable = !(room && st && openStopGroups(st).has(room));
    showInfo(person?.name ?? 'Someone', passageHTML(person, { askable }));
    bindPassage(document.getElementById('modalBody'), person, () => refreshWorld());
  }, { openPersonVisit }); },
});

// The verdict card raises this when a wrong call leaves the player unable to
// pay for either way forward.
/**
 * Take the day again.
 *
 * Whatever room the player is standing in, they come out of it first: the
 * interior district is four kilometres from the town, and a day planned from
 * out there is planned from nowhere.
 */
function retakeDay(){
  interiors.exit();
  day.restart();
}
window.addEventListener('projecty:restartday', () => retakeDay());

// -------------------------------------------------------------- input glue
document.getElementById('startBtn').addEventListener('click', () => {
  blocker.classList.add('hidden');
  // The one gesture every player makes. The audio context can start on it.
  unlockAudio();
  // THE BARS APPEAR AS THE CARD CLEARS, at their starting values. The bible is
  // specific about the order — the story card, dismissed once, and then the HUD
  // — and about what the card may not say: not the 18% shortfall, because the
  // 82% methane bar is that fact and this is the moment the player meets it.
  if(METRICS){
    const st = getState();
    if(st){ st.metricsShown = true; save(); }
    // The objective card lives directly under the HUD, and the HUD is now four
    // bars tall instead of one strip. Without this the card covers two of them.
    document.body.classList.add('metricsHud');
    updateMetricHUD();
  }
  // WHAT WINNING LOOKS LIKE, ON ITS OWN CARD, and after the bars are up.
  //
  // Its own card rather than a paragraph under the story: the story is a
  // situation and this is the rule of the game, and one card carrying both was
  // read as one long card. It comes after the reveal deliberately — the
  // sentence says "all at 100%" and the four bars are already on screen behind
  // it, sitting at 82, 88, 72 and 70.
  const goal = METRICS ? goalSentence(theme) : '';
  if(goal){
    day.ui.open(theme.metrics?.goalTitle ?? 'Before you start',
      `<div class="briefBox goalCard"><p>${goal}</p></div>`,
      [{ id: 'goalGo', label: 'Continue', primary: true,
         onClick: () => { day.ui.close(); day.showPlan(); } }]);
    return;
  }
  // The day is planned before it is walked: the calls, where they are, and how
  // far apart. Nothing moves until the player accepts it — and grabbing the
  // pointer while that card is up only takes it away again.
  // Always: a plan for a fresh day, a briefing for one already running.
  day.showPlan();
});
// A BACKGROUNDED TAB IS NOT THE PLAYER'S TIME. It also gets no
// requestAnimationFrame, so the frame loop above cannot notice this for itself —
// the clock would keep counting wall time through a tab nobody is looking at and
// hand back an award nobody earned.
if(missionClock){
  document.addEventListener('visibilitychange', () => {
    if(document.hidden) missionClock.pause(PAUSE.HIDDEN);
    else missionClock.resume(PAUSE.HIDDEN);
  });
  // The plan card is the briefing, before the shift has been accepted.
  window.addEventListener('blur', () => missionClock.pause(PAUSE.HIDDEN));
  window.addEventListener('focus', () => missionClock.resume(PAUSE.HIDDEN));
}

// ---- map and settings
const sheet = (id, on) => {
  const el = document.getElementById(id);
  el.classList.toggle('show', on);
  if(on && document.pointerLockElement) document.exitPointerLock();
  // The map and the settings sheet are the game's own interruptions, so the
  // shift clock stops for them. The question panel is not one of these: reading
  // it is the work, and pausing there would make thinking free.
  if(missionClock){
    const anyOpen = ['mapOverlay', 'settingsOverlay']
      .some(x => document.getElementById(x)?.classList.contains('show'));
    if(anyOpen) missionClock.pause(PAUSE.MENU);
    else missionClock.resume(PAUSE.MENU);
  }
};
function openMap(){
  // The M-key sheet is the whole screen: give the map most of it.
  // 760, not 1100: the sheet card is `min(820px, 100%)` and the body and the map
  // wrapper take 30 px of padding a side out of that. The old number was never
  // reached while the map was the whole site — the aspect of the place capped the
  // width first — and the moment a windowed map filled it, the right-hand edge of
  // the drawing and every label on it went under the edge of the card.
  document.getElementById('mapBody').innerHTML = renderMap({
    maxW: Math.min(760, innerWidth - 120), maxH: Math.min(760, innerHeight - 190),
  });
  sheet('mapOverlay', true);
}
document.getElementById('mapBtn').addEventListener('click', openMap);
// The always-on corner map. Clicking it opens the same sheet the button does.
const miniMap = createMiniMap({ renderMap, onOpen: openMap });
document.getElementById('mapClose').addEventListener('click', () => sheet('mapOverlay', false));
// player.js already emits this on M.
window.addEventListener('projecty:togglemap', () => {
  const open = document.getElementById('mapOverlay').classList.contains('show');
  open ? sheet('mapOverlay', false) : openMap();
});

const PREFS = 'gamekit_prefs_v1';
const prefs = JSON.parse(localStorage.getItem(PREFS) || '{}');
const applyPrefs = () => {
  document.body.classList.toggle('highContrast', !!prefs.highContrast);
  document.body.classList.toggle('reduceMotion', !!prefs.reduceMotion);
};
applyPrefs();
document.getElementById('settingsBtn').addEventListener('click', () => {
  document.getElementById('setHighContrast').checked = !!prefs.highContrast;
  document.getElementById('setReduceMotion').checked = !!prefs.reduceMotion;
  sheet('settingsOverlay', true);
});
document.getElementById('settingsClose').addEventListener('click', () => sheet('settingsOverlay', false));
for(const [id, key] of [['setHighContrast', 'highContrast'], ['setReduceMotion', 'reduceMotion']]){
  document.getElementById(id).addEventListener('change', (e) => {
    prefs[key] = e.target.checked;
    localStorage.setItem(PREFS, JSON.stringify(prefs));
    applyPrefs();
  });
}
document.getElementById('setLeave').addEventListener('click', () => {
  // `../index.html` rather than an absolute path, because the shelf is in a
  // different place in each of the four ways these games are served and the
  // relative one is right in all of them: /games/<id>/ -> /games/ in the
  // casebook app and inside the iOS bundle, dist/<theme>/ -> dist/ for the
  // gallery a plain static server shows.
  //
  // Saved BEFORE navigating rather than relying on beforeunload, which browsers
  // are entitled to skip: the local save is the authoritative copy, and a
  // pending cloud write that this outruns is pushed by the next session, since
  // the local stamp is then the newer one.
  saveOnExit();
  window.removeEventListener('beforeunload', saveOnExit);
  location.href = '../index.html';
});

document.getElementById('setReset').addEventListener('click', () => {
  // Destructive and irreversible, so it asks first.
  if(!confirm('Restart the campaign? The current run is deleted and cannot be recovered.')) return;
  localStorage.removeItem('gamekit_' + theme.id + '_v1');
  window.removeEventListener('beforeunload', saveOnExit);
  location.reload();
});

document.getElementById('modalClose').addEventListener('click', () => {
  if(modalLocked()) return;
  closeModal();
});
document.getElementById('statsOverlay').addEventListener('click', (e) => {
  if(e.target.id === 'statsOverlay') e.currentTarget.classList.remove('show');
});
window.addEventListener('keydown', (e) => {
  // ANY KEY ADVANCES A BEAT, and nothing else gets through.
  //
  // NO KEY ADVANCES A BEAT. It was every key, when a beat was a modal with a
  // Continue button on it. Nothing is modal now: a bubble hangs beside its
  // speaker and clears itself on a read-speed timer, so the keys mean what they
  // always meant. Advancing on a key would mean either the player stands still
  // to read, or W — held down for most of the walk the bubble plays over —
  // skips the line.
  if(e.code === 'KeyE'){
    if(overlay.classList.contains('show')) return;
    // Getting out is the same key that got you in. The raycast from a seat
    // rarely finds anything, so this cannot go through the interactables.
    if(driving.active){ driving.exit(); return; }
    // Refuses in the air, and says so rather than silently doing nothing.
    if(flying.active){
      if(!flying.exit()) promptEl.textContent = 'Land first — set it down before you get out.';
      return;
    }
    // A run owns the world, and the key is the other half of that — but the
    // prompt is already filtered to locomotion while a run is going, so what
    // `getCurrentTarget()` can hold here is a lift or a vehicle and nothing else.
    // Guarding the key as well as the prompt is what made the lift dead during a
    // lap while working all day outside one.
    const target = getCurrentTarget();
    if(runActive() && !RUN_LOCOMOTION.has(target?.type)) return;
    activate(target);
  }
  if(e.code === 'KeyR') lift.up = true;
  if(e.code === 'KeyF') lift.down = true;
  if(e.code === 'Escape'){
    // A locked card keeps the overlay: Escape here would leave the run untaken
    // and unmarked, or the day unaccepted, which is the same bypass as the X.
    if(!modalLocked()) overlay.classList.remove('show');
    document.getElementById('statsOverlay').classList.remove('show');
    sheet('mapOverlay', false);
    sheet('settingsOverlay', false);
  }
});
window.addEventListener('keyup', (e) => {
  if(e.code === 'KeyR') lift.up = false;
  if(e.code === 'KeyF') lift.down = false;
});

// questionUI closes its own modal; the world has to catch up afterwards.
const observer = new MutationObserver(() => { if(!overlay.classList.contains('show')) refreshWorld(); });
observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
const saveOnExit = () => save();
window.addEventListener('beforeunload', saveOnExit);

// -------------------------------------------------------------- the loop
let last = performance.now();
let clockAccum = 0;

function frame(now){
  requestAnimationFrame(frame);
  // CLAMPED AT BOTH ENDS, and the low end is not theoretical.
  //
  // `last` is set to `performance.now()` when this module is evaluated, and the
  // first `now` a browser hands rAF can be the timestamp of a frame that began
  // BEFORE that — on this page, measured, 4.7 seconds before. `Math.min` alone
  // passed that straight through as a delta of −4.709 s: every accumulator in
  // this loop went that far negative and spent the next five seconds climbing
  // back to zero, the day's countdown was handed back the same time, and
  // `updateCrowd` walked everybody backwards through it. It was found because a
  // 0.4 s tick added below did not fire for its first fifty frames.
  const delta = Math.max(0, Math.min(0.1, (now - last) / 1000));
  last = now;

  // Two things must never write the camera position in the same frame. While
  // the player is in a vehicle, the vehicle owns it.
  //
  // A BEAT DOES NOT TAKE THE FRAME. It used to: the camera held still behind a
  // Continue button, which made the reward for closing a call a modal. The
  // bubble is peripheral text over a world the player is still moving through.
  if(flying.active) flying.update(delta);
  else if(driving.active) driving.update(delta);
  else updatePlayer(delta);
  // The collective is the one control that does not exist on foot, so the two
  // buttons for it come and go with the aircraft. Null on anything with a mouse.
  touchControls?.setMode(flying.active ? 'fly' : driving.active ? 'drive' : 'walk');
  miniMap?.update(now);
  // A run owns the world, with one exception: the things that *move* you. See
  // `RUN_LOCOMOTION` and `updateInteractions`.
  if(isLocked && !driving.active && !flying.active){
    updateInteractions(promptEl, runActive() ? RUN_LOCOMOTION : null);
  }
  else if(driving.active){
    // A scooter is not got out of. The vehicle carries its own line where the
    // default one would be wrong.
    promptEl.textContent = driving.vehicle?.hint
      ?? (touchControls ? 'Thumb forward to drive · left and right to steer · Run for speed · Use — get out'
                        : 'W/S drive · A/D steer · Shift faster · E — get out');
    promptEl.classList.remove('hidden');
  } else if(flying.active){
    const alt = Math.round(flying.altitude);
    promptEl.textContent = touchControls
      ? `Climb · Descend · thumb to fly and yaw · Run for speed · ${alt} m · `
        + (flying.airborne ? 'Use — land first' : 'Use — get out')
      : `R climb · F descend · W/S · A/D yaw · Shift faster · ${alt} m · `
        + (flying.airborne ? 'E — land first' : 'E — get out');
    promptEl.classList.remove('hidden');
  } else promptEl.classList.add('hidden');

  // A bubble follows whoever is speaking: the crowd walks, and one pinned to
  // where somebody was by the second sentence points at nobody. Returns
  // immediately when no beat is up.
  if(beatPlaying()) beatPlace();
  // The wall's own pulse. Outside the beat check deliberately: the flash outlives
  // the bubble that started it, and the emissive settles after it.
  stageWall?.update(delta);

  // A trial run, if one is on. Cheap and returns immediately when it is not.
  trial.update(delta);
  // And any of the other five. Same contract, same cost when idle.
  worldFormats.update(delta);
  // The shift clock's face. The clock itself is authoritative and runs on wall
  // time, so this only reads it — and it reads it every frame because it is a
  // stopwatch the player is scored against.
  if(missionClock) updateMissionClock(missionClock, { target: missionTarget() });
  // HELD WHILE A BEAT IS SPEAKING — and `beatQueued()`, not `beatPlaying()`.
  //
  // The two are different since a run's last line started staying up until the
  // player opens their next call: `playing()` counts that held line, so it is
  // true from the first beat of the shift until the next call opens, and the
  // clock was held for the whole mission. It read 00:00 at the award.
  //
  // `queued()` is dialogue still to be read, which is what the bible means by
  // "required dialogue bubbles". A line left standing is not required reading —
  // it is there to be glanced at while walking — and the shift runs through it.
  if(missionClock){
    if(beatQueued() > 0) missionClock.pause(PAUSE.BEAT);
    else missionClock.resume(PAUSE.BEAT);
  }
  // The day runs down in real time — walking, driving, reading, answering. A
  // metrics campaign has no day budget: `economy:false` turns the countdown off
  // and the shift clock above is the only clock on screen.
  if(theme.economy !== false && day.tick(delta) === 'expired') day.close();
  // The countdown is written every frame. The rest of the HUD is not: it does
  // forecast arithmetic, and a clock refreshed at 2 Hz steps unevenly.
  updateDayClock();

  // The eye first: the weather cloud follows it, the emitters are levelled from
  // it, and the other players are told about it.
  const eye = getPosition();
  world.updateWorldAnimation?.(now / 1000, eye);
  updateCrowd(delta, now / 1000);
  // The sound, from where the player stands and which way they face. Indoors
  // fades to the room bed; a card up on screen ducks the lot.
  /**
   * INDOORS, AND A PLAN IS ALL INDOORS.
   *
   * `interiors.current` is the town's model: a door per area, and you are inside
   * when you have gone through one. A campaign whose place is a plan has no such
   * doors — the rooms are off a corridor and you are in the building from the
   * first step — so that flag was false for the whole of Changeover, Headwater
   * and The Trial. The indoor bed each of them declares never played, and
   * Changeover ran its outdoor city wash forty-five floors up for fifteen days.
   */
  updateAudio(delta, eye, camera.rotation.y, {
    indoors: !!interiors.current || theme.site?.kind === 'interior',
    ducked: overlay.classList.contains('show'),
  });
  // The other players. `sendPos` throttles itself to ten a second and both calls
  // return immediately when there is no room, so this costs a solo game two
  // function calls a frame.
  const space = coopSpace();
  room.sendPos(eye.x, eye.y, eye.z, camera.rotation.y, space,
               !!(moveState?.forward || moveState?.right));
  updateAvatars(delta, room.members(), space);
  coop?.update(now);
  // Only the room the player is standing in repaints its screen.
  interiors.update(delta);
  // And only when the day's open calls change does anybody walk into it. Same
  // period as `syncFixtures`, for the same reason — see `syncGuests`.
  guestAccum += delta;
  if(guestAccum > 0.4){ guestAccum = 0; if(interiors.current) syncGuests(); }

  // The clock only needs to move a few times a second, and updateTimeOfDay
  // rebakes the sky IBL when the sun moves far enough — not per frame.
  clockAccum += delta;
  if(clockAccum > 0.5){
    clockAccum = 0;
    const state = getState();
    world.updateTimeOfDay?.(((state?.timeHours ?? 8) % 24));
    // The HUD owns every clock element; writing to them here would fight it.
    updateHUD();
  }

  renderer.render(scene, camera);
}

refreshWorld();
requestAnimationFrame(frame);

// Dev handles. audit.js is run from the console, and needs the scene.
if(import.meta.env?.DEV){
  // crowd + updateCrowd so a frozen background tab can be stepped by hand;
  // rAF is throttled to nothing there, which makes the town look dead.
  // activate + updateInteractions as well, so 'is the E key actually wired to
  // this?' can be answered without a foreground tab. A throttled tab never runs
  // the raycast, so getCurrentTarget is null there and every interaction looks
  // broken whether it is or not.
  // `teleport` is here because a background tab gets no animation frame, so the
  // player never walks and every interaction test fails for a reason that has
  // nothing to do with the game. Fourth time that cost an hour.
  // `moveState` + `updatePlayer` for the same reason, one level down: teleport
  // answers "can the player be somewhere", not "does the input that is supposed
  // to walk them actually walk them". Importing player.js from the console does
  // not answer it either — that resolves to a second copy of the module with its
  // own uninitialised `camera`, which is the trap in THEME_CONTRACT's console
  // note. Stepping through this handle is the only honest test of an input path.
  exposeDebug(theme, { theme, world, scene, renderer, camera, getState, getPosition, teleport,
                       updateCrowd, getNPCs, activate, updateInteractions, getCurrentTarget, driving, flying, day,
                       interiors, moveState, updatePlayer, touchControls,
                       // Close a stop from the console. A mission with a BEAT
                       // SCRIPT can only be walked through in order, and the
                       // beats fire off this exact call — so testing the third
                       // beat otherwise means answering two questions by hand
                       // first, with a mouse, in a foreground tab. A dynamic
                       // import is no substitute: it resolves to a second copy
                       // of the module with its own state, which is the trap
                       // THEME_CONTRACT's console note already names.
                       markMissionStopComplete,
                       // And OPEN one, for the same reason. A question panel can
                       // otherwise only be looked at by playing to it with a
                       // mouse in a foreground tab, which is how a card that
                       // renders nothing — Whiteout's first stop asks the player
                       // to "read the three displayed lines" — stays unseen. The
                       // interactable's own handler is one line above this
                       // (`case:`), and this is that call by name.
                       openVisit,
                       // The beat runner itself, for the same reason: a held
                       // last line comes down when the player opens their next
                       // call, and there is no way to watch that from outside
                       // the running game.
                       beats,
                       // A stacked building: which floor is active is not a
                       // position, so a harness that only teleports lands the
                       // camera inside the ceiling of whichever floor is on.
                       // `npm run shots` uses this; undefined elsewhere.
                       goToFloor: floorLift ? (id) => floorLift.ride(id) : undefined,
                       // A trial run is reachable in the game only by playing to
                       // the right day with time on the clock, which is no way to
                       // look at gates.
                       trial,
                       // What is playing and how loud, and the weather cloud, so
                       // both can be read off a throttled tab.
                       audioReport, weather: world.getWeather?.(),
                       // The whole state -> world push, in one call. `npm run shots
                       // --sol N` advances the campaign by hand and then has to make
                       // the WORLD agree with it: a props layer's stateHooks fire
                       // from here, and the delivery board is repainted from here.
                       // Without it a later-day render advanced the state and
                       // photographed the day-one scene.
                       refreshWorld, deliveryPieces });
  console.log(
    `%c${theme.title}%c — theme "${theme.id}", ${theme.content.MISSIONS.length} missions, `
    + `${Object.values(theme.content.CURRICULUM).reduce((n, v) => n + v.length, 0)} lessons.\n`
    + 'Run the audit before judging how it looks:\n'
    + "  const { reportAudit } = await import('/engine/dev/audit.js');\n"
    + '  reportAudit(gamekit.scene, gamekit.renderer, { spawn: gamekit.theme.start });',
    'font-weight:700', 'font-weight:400');
}
