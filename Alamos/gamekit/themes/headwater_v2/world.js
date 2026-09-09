// world.js — five floors of the Ashfell control tower, and the one thing the
// engine's levels world does not have: a way for a room to read the campaign.
//
// The stacking, the stairs and the height function are
// `engine/world/interiorLevels.js`; what is about this building is `plan.js`
// (five levels, one glazed side) and `props.js` (the gorge and the fall behind
// the glass, built in `decorate`). This shim re-exports all of that, because
// `vite.config.js` resolves a theme's own world from `themes/<name>/` and a
// theme cannot point `world:` straight at the engine.
//
// ## The state hook
//
// The outdoor world gives its props `stateHooks`; `interiorBuilding.js` rooms
// get `room.applyState`. A plan built by `interiorLevels.js` gets neither — its
// `updateWorldFromState` tints doors and moves the waypoint and nothing else,
// so every one of the bible's fifteen physical aftermaths (a card pinned beside
// the water curve, a hoist turned to its test notch, a drawer unsealed) had
// nowhere to happen. This file wraps the engine's `updateWorldFromState` with
// one that also runs the hooks `story.js` registers, so nothing in `engine/`
// changes and the rooms still read the campaign.
//
// Hooks run when the *situation* changes — day, missions accepted, status,
// hour — not on every refresh, because `refreshWorld` in src/main.js is called
// from a MutationObserver and a hook repaints a canvas.
import * as engine from '../../engine/world/interiorLevels.js';

export * from '../../engine/world/interiorLevels.js';

/** The registered hooks, `(state) => void`, in registration order. */
const HOOKS = [];
let lastState = null;
let lastKey = null;

/**
 * Register a hook. If the world already has a state, the hook runs at once,
 * so a room dressed after the first refresh is not a day behind.
 */
export function registerStateHook(fn){
  if(typeof fn !== 'function') return;
  HOOKS.push(fn);
  if(lastState){
    try{ fn(lastState); }catch(err){ console.warn('[headwater] a state hook failed', err); }
  }
}

/** An array-shaped view for code written against `ctx.stateHooks.push`. */
export const stateHooks = { push: registerStateHook };

function keyOf(state){
  const done = Array.isArray(state.missionStopsCompleted) ? state.missionStopsCompleted.length : 0;
  return `${state.week ?? 1}|${state.status ?? ''}|${done}|${Math.floor(state.timeHours ?? 0)}`;
}

/** Run every hook against `state` now, whether or not anything changed. */
export function runStateHooks(state){
  if(!state) return;
  lastState = state;
  lastKey = keyOf(state);
  for(const fn of HOOKS){
    try{ fn(state); }catch(err){ console.warn('[headwater] a state hook failed', err); }
  }
}

/**
 * The engine's own, after emptying the hook list.
 *
 * A hook closes over the meshes the fit-out built, and `initWorld` rebuilds
 * the building — so without this a second build (a theme switch, a hot reload)
 * leaves every hook of the first one in the list, painting canvases on
 * disposed materials. Changeover's tower shim does the same for the same
 * reason.
 */
export function initWorld(canvas, activeTheme){
  HOOKS.length = 0;
  lastState = null;
  lastKey = null;
  return engine.initWorld(canvas, activeTheme);
}

export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  engine.updateWorldFromState(state, nextStopId, pct);
  if(!state) return;
  const key = keyOf(state);
  if(key === lastKey && lastState === state) return;
  runStateHooks(state);
}
