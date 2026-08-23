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
import { warmupDue } from '../engine/core/warmups.js';
import * as world from '../engine/core/world.js';
import { initPlayer, updatePlayer, camera, controls, getPosition, teleport, isLocked,
         setGround, setBounds, moveState, touchControls } from '../engine/core/player.js';
import { updateInteractions, getCurrentTarget } from '../engine/core/interactions.js';
import { initCrowd, updateCrowd, getNPCs, setWantedMarkers } from '../engine/people/crowd.js';
import { initAvatars, updateAvatars } from '../engine/people/avatars.js';
// Co-op. Every call is a no-op unless the page was opened with `?room=CODE`.
import * as room from '../engine/core/room.js';
import { createCoopHUD } from '../engine/core/coopHUD.js';
import {
  getState, save, tryLoadSaved, createFresh, advanceTime, getNextMissionStop, walkCost,
  endDayNow, dayRunning, completeMission, applyRemoteState, tickDay,
} from '../engine/core/gameState.js';
import { updateHUD, updateDayClock, renderStats } from '../engine/core/dashboard.js';
import { renderMap, setMapPins } from '../engine/core/map.js';
import { passageHTML, bindPassage } from '../engine/core/personQuiz.js';
import { openVisit, openPersonVisit, closeModal, panelFreezesClock,
         setWorldHandle, setModalLock, modalLocked } from '../engine/core/questionUI.js';
import { def, groupPct } from '../engine/core/simulation.js';
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
import { BALLPARK_CALCS } from '../engine/core/curriculum.js';

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
document.getElementById('titleStakes').innerHTML =
  (theme.opening ?? []).map(p => `<p class="stakes">${p}</p>`).join('');
// The scope line — "a fictional scenario for teaching, nothing here is a real
// procedure" — is gone. It was the last thing between the player and the game
// and it told them the stakes they had just read were not real.
document.getElementById('titleScope').textContent = '';

// ------------------------------------------------------------------- state
// Every area starts at zero readiness, led by the person groups.js names.
const assign = Object.fromEntries(theme.content.GROUPS.map(g => [g.id, g.defaultLeader]));
if(!tryLoadSaved()) createFresh(assign);

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
  groundHeight: world.groundHeight,
  // Which floor is under the player's feet, in a stacked building. Undefined
  // everywhere else, and `crowd.js` treats that as "there is only one floor".
  activeLevel: world.activeFloorId ? () => world.activeFloorId() : undefined,
  // The pad is the caller's: one metre keeps somebody from being *placed* hard
  // against a wall, and that same metre used while walking would wall a person
  // into a four-metre passage.
  blocked: (x, z, pad = 1) => world.colliders.some(c =>
    x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
});

// The other players, drawn with the same rig the crowd uses. Inert solo: with
// no room there are never any members, so this draws nothing and costs a loop
// over an empty array.
initAvatars({ scene, groundHeight: world.groundHeight });

// --------------------------------------------------------------- objective
/** The area the current mission wants next, or null when the mission is done. */
function nextStopGroup(){
  // Nothing is signposted while a warm-up is running: the waypoint post over the
  // day's next building is the same confusion as the cone over its next person.
  if(runActive()) return null;
  const stop = getNextMissionStop();
  return stop ? stop.group : null;
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


// ------------------------------------------------------------- interiors
// A door opens a room. The manager is the engine's — it was written here first
// and then again in Project Y's entry point, which is exactly the duplication
// this file is not supposed to own.
const interiors = createInteriors({
  scene, camera, theme, def, calcs: BALLPARK_CALCS,
  colliders: world.colliders,
  interactables: world.interactables,
  player: { getPosition, teleport, setGround, setBounds },
  townGround: world.groundHeight,
  townBounds: theme.site?.terrain?.playerLimit ?? 105,
  // Walking there costs time. Standing in a laboratory with nothing open in it
  // does not.
  onEnter: (id) => {
    const stop = world.stopMeshes.get(id);
    if(stop && id === nextStopGroup()) walkCost(getPosition().distanceTo(stop.entry));
  },
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
const RUN_LOCOMOTION = new Set(['lift', 'vehicle', 'aircraft']);
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
            const gates = gatesFor({ ...lap, groups: lap.groups ?? tierGroups }, entryFor);
            // Driven rather than walked where the vehicles have just come out, so
            // the far lap is not given an hour for ground it crosses in a truck.
            return gates.length >= 2 && trial.start({ gates,
              limit: +lap.seconds || trialLimit(gates, theme.start,
                { pace: lap.far ? 6 : 1.35, rise: world.floorRise?.() ?? 0 }) },
              done);
          }
          case 'GREET': {
            const list = (lap.roster ?? roster()).slice(0, 14);
            return list.length >= 2 && worldFormats.greet({
              roster: list, target: +lap.target || Math.min(8, Math.max(2, Math.ceil(list.length * 0.7))),
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
  onDayStart: () => { updateHUD(); refreshWorld(); },
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
  day.ui.open(`${DAY_NOUN} ${state.week} closed`,
    debrief.html
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
  case: (t) => openVisit(t.id),
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
  npc: (t) => openPersonOrPassage(t.npc, t.char, (person) => {
    showInfo(person?.name ?? 'Someone', passageHTML(person));
    bindPassage(document.getElementById('modalBody'), person, () => refreshWorld());
  }, { openPersonVisit }),
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
  // The day is planned before it is walked: the calls, where they are, and how
  // far apart. Nothing moves until the player accepts it — and grabbing the
  // pointer while that card is up only takes it away again.
  // Always: a plan for a fresh day, a briefing for one already running.
  day.showPlan();
});
// ---- map and settings
const sheet = (id, on) => {
  const el = document.getElementById(id);
  el.classList.toggle('show', on);
  if(on && document.pointerLockElement) document.exitPointerLock();
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
  const delta = Math.min(0.1, (now - last) / 1000);
  last = now;

  // Two things must never write the camera position in the same frame. While
  // the player is in a vehicle, the vehicle owns it.
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

  // A trial run, if one is on. Cheap and returns immediately when it is not.
  trial.update(delta);
  // And any of the other five. Same contract, same cost when idle.
  worldFormats.update(delta);
  // The day runs down in real time — walking, driving, reading, answering.
  if(day.tick(delta) === 'expired') day.close();
  // The countdown is written every frame. The rest of the HUD is not: it does
  // forecast arithmetic, and a clock refreshed at 2 Hz steps unevenly.
  updateDayClock();

  world.updateWorldAnimation?.(now / 1000);
  updateCrowd(delta, now / 1000);
  // The other players. `sendPos` throttles itself to ten a second and both calls
  // return immediately when there is no room, so this costs a solo game two
  // function calls a frame.
  const eye = getPosition();
  const space = coopSpace();
  room.sendPos(eye.x, eye.y, eye.z, camera.rotation.y, space,
               !!(moveState?.forward || moveState?.right));
  updateAvatars(delta, room.members(), space);
  coop?.update(now);
  // Only the room the player is standing in repaints its screen.
  interiors.update(delta);

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
                       // A stacked building: which floor is active is not a
                       // position, so a harness that only teleports lands the
                       // camera inside the ceiling of whichever floor is on.
                       // `npm run shots` uses this; undefined elsewhere.
                       goToFloor: floorLift ? (id) => floorLift.ride(id) : undefined,
                       // A trial run is reachable in the game only by playing to
                       // the right day with time on the clock, which is no way to
                       // look at gates.
                       trial });
  console.log(
    `%c${theme.title}%c — theme "${theme.id}", ${theme.content.MISSIONS.length} missions, `
    + `${Object.values(theme.content.CURRICULUM).reduce((n, v) => n + v.length, 0)} lessons.\n`
    + 'Run the audit before judging how it looks:\n'
    + "  const { reportAudit } = await import('/engine/dev/audit.js');\n"
    + '  reportAudit(gamekit.scene, gamekit.renderer, { spawn: gamekit.theme.start });',
    'font-weight:700', 'font-weight:400');
}
