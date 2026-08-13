// world.js — the adapter that put Los Alamos on the shared world layer.
//
// This file used to build the mesa by hand: 1315 lines of terrain, roads, sky,
// nineteen buildings, a canvas status board and a Ponderosa forest, none of it
// shared with the other six games. It is now a thin door onto
// engine/world/outdoorTown.js, which builds all of that from `site.js`.
//
// It is an ADAPTER rather than a rewrite, and deliberately: `main.js` is the one
// file the migration left forked on purpose, and it calls the old names —
// `initWorld(canvas)` with one argument, `updateWorldFromState()` with none,
// `getBuildingPosition`, `updateDayNight`. Every one of those is kept here and
// mapped onto the engine's contract, so the flip touched the world and not the
// game. Deep Watch's boat came across the same way.
//
// What moved where:
//
//   terrain, sky, roads, pond, buildings   -> site.js, built by outdoorTown
//   boardwalks, wire, poles, jeeps, trees  -> ../props.js (theme-level)
//   the five division buildings' interiors -> unchanged, ../interiors.js
//   BUILDING_DATA's historical notes       -> content/copy.js, already there
//
// The engine's 'mesa' profile was checked against the heightfield this file used
// to compute before the switch: mean difference 0.06 m across the town, worst
// case 0.5 m, and the half-metre cases are all pads — where the old surface
// noise dipped a graded bench that should have read level.
//
// The audit's below-floor rule and the six-light ceiling both still apply; the
// lamp rig that used to live here is in props.js now, unchanged in count.
import theme from '../theme.js';
import { getState } from './gameState.js';
import { missionStopForGroup, nextMissionStopIndex, getCurrentMission } from './simulation.js';
import {
  initWorld as engineInitWorld,
  updateWorldFromState as engineUpdateFromState,
  updateTimeOfDay,
  getStopPosition,
  getWaypointMesh,
  setWaypointPosition,
  groundHeight,
  colliders,
  softColliders,
  interactables,
  stopMeshes,
  updateWorldAnimation,
  getPeopleStations,
  getExtraSpots,
} from '../../gamekit/engine/world/outdoorTown.js';
import * as engine from '../../gamekit/engine/world/outdoorTown.js';

export { colliders, softColliders, interactables, groundHeight, getWaypointMesh,
         setWaypointPosition, updateWorldAnimation, getPeopleStations, getExtraSpots,
         stopMeshes };

// `scene` and `renderer` are assigned by the engine during initWorld, and main.js
// imports them as bindings rather than reading them through a getter — so they
// are re-exported live rather than copied once, which would hand main.js an
// undefined scene forever.
export let scene = null;
export let renderer = null;

/**
 * Kept because main.js imports it. The status board is `site.board` now, drawn by
 * the engine, and nothing in this game ever read the canvas: main.js imported
 * `centralBoardMesh` and never used it.
 */
export const centralBoardMesh = null;
export const centralBoardCanvas = null;
export const centralBoardTexture = null;

export function initWorld(canvas){
  engineInitWorld(canvas, theme);
  scene = engine.scene;
  renderer = engine.renderer;
  return scene;
}

/**
 * The old signature: no arguments, read the state yourself.
 *
 * The engine wants (state, nextStopId, pct) because a theme served from gamekit/
 * has its main loop in one shared file that already holds all three. Project Y's
 * fork does not, so they are gathered here.
 */
export function updateWorldFromState(){
  const state = getState();
  if(!state) return;
  const mission = getCurrentMission(state);
  const idx = nextMissionStopIndex(state);
  const stop = mission?.stops?.[idx] ?? null;
  const nextStopId = stop?.group ?? null;
  // Progress per area, which is what the engine tints a door by.
  const pct = (id) => {
    const s = missionStopForGroup?.(state, id);
    return s?.done ? 100 : 0;
  };
  engineUpdateFromState(state, nextStopId, pct);
}

/** The old name for the time-of-day pass. */
export function updateDayNight(){
  const state = getState();
  return updateTimeOfDay(state?.timeHours ?? 9);
}

/** The old name. Areas of study are 'stops' in the engine's vocabulary. */
export function getBuildingPosition(id){
  return getStopPosition(id);
}

export function isNightNow(){
  const h = getState()?.timeHours ?? 9;
  return h < 6.2 || h > 19.4;
}

/**
 * The old world exported this and it was an empty function body with four lines
 * of comment saying the caller should manage visibility. Interiors are built by
 * `engine/core/app.js` from `interiors.js`, and always were.
 */
export function createInteriorScene(){ return null; }
