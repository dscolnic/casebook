// world.js — the top six floors of Kesteven House.
//
// The stacking, the lift shaft, the active floor and the height function are
// `engine/world/interiorTower.js`; what is about this building is `plan.js`
// (six floors on one footprint, glass on four faces) and `props.js` (the city
// out of the glass, built in `decorate`). The shim exists because
// `vite.config.js` resolves a theme's own world from `themes/<name>/`, so a
// theme cannot point `world:` straight at the engine.
//
// AND ONE THING MORE, WHICH IS WHY THIS IS NO LONGER A ONE-LINE FILE. The tower
// gives a room's fit-out no campaign-state hook: `ctx.stateHooks` exists for
// outdoor props (`outdoorTown.js`) and for rooms built by `interiorBuilding.js`,
// and this building's rooms are neither. So `story.js` keeps its own list of
// hooks, each room pushes into it while `fitOutRoom` runs, and this module's
// `updateWorldFromState` — the one `engine/core/world.js` re-exports and
// `main.js` calls on every state change — runs the tower's own and then the
// story's. No engine file is touched; the plan names this file as the world.
import * as tower from '../../engine/world/interiorTower.js';
import { applyStoryState, clearStateHooks, setFloorProbe } from './story.js';

export * from '../../engine/world/interiorTower.js';

/** The tower's own, after clearing the story hooks of the last build. */
export function initWorld(canvas, activeTheme){
  clearStateHooks();
  setFloorProbe(tower.activeFloorId);
  return tower.initWorld(canvas, activeTheme);
}

/** The tower's own, then every prop that reads the campaign. */
export function updateWorldFromState(state, nextStopId = null, pct = () => 0){
  tower.updateWorldFromState(state, nextStopId, pct);
  applyStoryState(state);
}
