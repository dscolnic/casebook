// main.js — the entry point. Wires a theme to the engine and runs the loop.
//
// Everything specific to a game lives in themes/<name>/; this file names none
// of it. The theme arrives through the `@theme` alias set by vite.config.js,
// and the world through `@world`, chosen from the theme's site kind.
//
//   THEME=contamcity npm run dev
import theme from '@theme/theme.js';
import * as world from '../engine/core/world.js';
import { initPlayer, updatePlayer, camera, controls, getPosition, teleport, isLocked,
         setGround, setBounds, moveState } from '../engine/core/player.js';
import { updateInteractions, getCurrentTarget } from '../engine/core/interactions.js';
import { initCrowd, updateCrowd, getNPCs } from '../engine/people/crowd.js';
import {
  getState, save, tryLoadSaved, createFresh, advanceTime, getNextMissionStop, walkCost,
  endDayNow, dayRunning, completeMission,
} from '../engine/core/gameState.js';
import { updateHUD, updateDayClock, renderStats } from '../engine/core/dashboard.js';
import { renderMap } from '../engine/core/map.js';
import { passageHTML, bindPassage } from '../engine/core/personQuiz.js';
import { openVisit, openPersonVisit, closeModal } from '../engine/core/questionUI.js';
import { def, groupPct } from '../engine/core/simulation.js';
import { createInteriors, makeActivate, exposeDebug, createDay, openPersonOrPassage,
         showEnding, createMiniMap } from '../engine/core/app.js';
import { PANEL_PACE } from '../engine/core/day.js';
import { createDriving } from '../engine/world/driving.js';
import { createFlying } from '../engine/world/flying.js';
import { DAY_NOUN } from '../engine/core/constants.js';
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
  // The pad is the caller's: one metre keeps somebody from being *placed* hard
  // against a wall, and that same metre used while walking would wall a person
  // into a four-metre passage.
  blocked: (x, z, pad = 1) => world.colliders.some(c =>
    x > c.min.x - pad && x < c.max.x + pad && z > c.min.z - pad && z < c.max.z + pad),
});

// --------------------------------------------------------------- objective
/** The area the current mission wants next, or null when the mission is done. */
function nextStopGroup(){
  const stop = getNextMissionStop();
  return stop ? stop.group : null;
}
/**
 * The first day the theme's aircraft flies. 0 — every theme without one, and
 * every theme whose aircraft is available from the start — is never refused.
 */
const AIRCRAFT_FROM_DAY = Number.isFinite(theme.aircraftFromDay) ? theme.aircraftFromDay : 0;

function refreshWorld(){
  const state = getState();
  world.updateWorldFromState(state, nextStopGroup(), (id) => {
    const gs = state.groups?.find(g => g.id === id);
    return gs ? groupPct(gs) : 0;
  });
  // A grounded aircraft whose prompt still reads "E — Fly" is a prompt that lies.
  // Rewritten here rather than at registration because it changes with the day.
  if(AIRCRAFT_FROM_DAY > 0){
    for(const it of world.interactables){
      if(it.type !== 'aircraft') continue;
      it.prompt = state.week < AIRCRAFT_FROM_DAY
        ? `${it.aircraft.label} — grounded until ${DAY_NOUN.toLowerCase()} ${AIRCRAFT_FROM_DAY}`
        : `E — Fly the ${it.aircraft.label}`;
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
  // A quarter rate while any panel is up: reading the evidence is the game, and
  // at full rate a Diagnosis costs more of the day than the walk to reach it.
  pace: () => (overlay.classList.contains('show') ? PANEL_PACE : 1),
  ui: {
    open(title, html, actions){
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalEyebrow').textContent = '';
      document.getElementById('modalBody').innerHTML = html
        + `<div class="modalActions">` + actions.map(a =>
            `<button class="btn ${a.primary ? 'primary' : ''}" id="${a.id}" type="button">${a.label}</button>`).join('') + `</div>`;
      overlay.classList.add('show');
      if(document.pointerLockElement) document.exitPointerLock();
      for(const a of actions){
        const b = document.getElementById(a.id);
        if(b) b.onclick = a.onClick;
      }
    },
    close(){ overlay.classList.remove('show'); },
  },
  onDayStart: () => { updateHUD(); refreshWorld(); },
  onDayEnd: (outstanding) => showDayOver(outstanding),
});

/**
 * The end of a day, either way it happens.
 *
 * Outstanding calls mean the day is retaken — that is the only hard rule in
 * the game, and the stipend plus a fresh set of conversations is what keeps it
 * from being a dead end.
 */
function showDayOver(outstanding){
  const state = getState();
  if(outstanding > 0){
    day.ui.open(`The day ran out`,
      `<div class="briefBox"><p><b>${outstanding} call${outstanding === 1 ? '' : 's'} still open when the light went.</b></p>`
      + `<p>Tomorrow is this same day again — the calls reopen, the clock refills, and the morning pays an allowance.</p></div>`,
      [{ id: 'dayRetry', label: 'Take the day again', primary: true, onClick: () => retakeDay() }]);
    return;
  }
  day.ui.open(`${DAY_NOUN} ${state.week} closed`,
    `<div class="briefBox"><p>Every call made. ${COPY.dayEnd ?? 'The team writes it up overnight.'}</p></div>`,
    [{ id: 'dayNext', label: 'Start the next day', primary: true, onClick: () => {
      const res = completeMission();
      overlay.classList.remove('show');
      updateHUD(); refreshWorld();
      // The last mission ends the campaign, and a campaign that ends without saying
      // how it turned out is fifteen days of work answered with a HUD label.
      if(res === 'won') showEnding(theme, day.ui);
      else day.showPlan();
    } }]);
}

const COPY = theme.content.COPY ?? {};
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
  // A probe station. The feedback is the post itself — its face fills in and its
  // lamp goes from grey to blue — so there is nothing to open and nothing to say.
  station: (t) => {
    const read = interiors.readStation(t.id);
    if(read !== null) t.prompt = `Read — ${t.station?.label ?? t.id}`;
  },
  roomexit: () => interiors.exit(),
  vehicle: (t) => driving.enter(t.vehicle),
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
  document.getElementById('mapBody').innerHTML = renderMap({
    maxW: Math.min(1100, innerWidth - 120), maxH: Math.min(760, innerHeight - 190),
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
document.getElementById('setReset').addEventListener('click', () => {
  // Destructive and irreversible, so it asks first.
  if(!confirm('Restart the campaign? The current run is deleted and cannot be recovered.')) return;
  localStorage.removeItem('gamekit_' + theme.id + '_v1');
  window.removeEventListener('beforeunload', saveOnExit);
  location.reload();
});

document.getElementById('modalClose').addEventListener('click', () => closeModal());
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
    activate(getCurrentTarget());
  }
  if(e.code === 'KeyR') lift.up = true;
  if(e.code === 'KeyF') lift.down = true;
  if(e.code === 'Escape'){
    overlay.classList.remove('show');
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
  miniMap?.update(now);
  if(isLocked && !driving.active && !flying.active) updateInteractions(promptEl);
  else if(driving.active){
    promptEl.textContent = 'W/S drive · A/D steer · Shift faster · E — get out';
    promptEl.classList.remove('hidden');
  } else if(flying.active){
    const alt = Math.round(flying.altitude);
    promptEl.textContent = `R climb · F descend · W/S · A/D yaw · Shift faster · ${alt} m · `
      + (flying.airborne ? 'E — land first' : 'E — get out');
    promptEl.classList.remove('hidden');
  } else promptEl.classList.add('hidden');

  // The day runs down in real time — walking, driving, reading, answering.
  if(day.tick(delta) === 'expired') day.close();
  // The countdown is written every frame. The rest of the HUD is not: it does
  // forecast arithmetic, and a clock refreshed at 2 Hz steps unevenly.
  updateDayClock();

  world.updateWorldAnimation?.(now / 1000);
  updateCrowd(delta, now / 1000);
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
  exposeDebug(theme, { theme, world, scene, renderer, camera, getState, getPosition, teleport,
                       updateCrowd, getNPCs, activate, updateInteractions, getCurrentTarget, driving, flying, day,
                       interiors });
  console.log(
    `%c${theme.title}%c — theme "${theme.id}", ${theme.content.MISSIONS.length} missions, `
    + `${Object.values(theme.content.CURRICULUM).reduce((n, v) => n + v.length, 0)} lessons.\n`
    + 'Run the audit before judging how it looks:\n'
    + "  const { reportAudit } = await import('/engine/dev/audit.js');\n"
    + '  reportAudit(gamekit.scene, gamekit.renderer, { spawn: gamekit.theme.start });',
    'font-weight:700', 'font-weight:400');
}
