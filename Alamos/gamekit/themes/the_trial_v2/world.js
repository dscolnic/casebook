// world.js — three floors of the Fenwick Coordinating Centre.
//
// The stacking, the stairs and the height function are
// `engine/world/interiorLevels.js`, which this building was the first to need
// and Ashfell Dam was the second — two copies of a world module is how the
// engine got forked three ways the first time, so it moved.
//
// What is left in the theme is the part that is actually about this building:
// `plan.js` (three levels, offset along the spine as well as vertically, and why
// they have to be), `props.js` (the warehouse, the infusion bay, the walls) and
// `story.js` (the building changing as the fifteen missions are accepted).
//
// The shim exists because `vite.config.js` resolves a theme's own world from
// `themes/<name>/`, so a theme cannot point `world:` straight at the engine.
//
// ## The one thing this file does
//
// The engine's interior fit-out has no campaign-state hook: the outdoor world
// hands its props `stateHooks`, and a town's door-rooms get `applyState`, but a
// plan game's rooms are the shell and read nothing after they are built. So two
// of the engine's exports are wrapped here and every other one passes straight
// through: `initWorld` clears the story's hook list before the building is
// rebuilt, and `updateWorldFromState` runs the engine's own pass and then every
// hook the fit-out registered — with the world's collider list, so the board
// room door can be opened on the last day. An explicit export shadows the same
// name from `export *`, which is the whole mechanism.
import * as engine from '../../engine/world/interiorLevels.js';
import { applyStoryState, resetStoryHooks } from './story.js';

export * from '../../engine/world/interiorLevels.js';

let activeTheme = null;

export function initWorld(canvas, theme){
  activeTheme = theme;
  resetStoryHooks();
  return engine.initWorld(canvas, theme);
}

export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  engine.updateWorldFromState(state, nextStopId, pct);
  applyStoryState(state, activeTheme, { colliders: engine.colliders });
}
