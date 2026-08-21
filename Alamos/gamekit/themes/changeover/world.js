// world.js — the top four floors of Kesteven House.
//
// There is nothing here. The stacking, the lift shaft, the active floor and the
// height function are `engine/world/interiorTower.js`; what is about this
// building is `plan.js` (four floors on one footprint, glass on four faces) and
// `props.js` (the city out of the glass, built in `decorate`).
//
// The shim exists because `vite.config.js` resolves a theme's own world from
// `themes/<name>/`, so a theme cannot point `world:` straight at the engine.
export * from '../../engine/world/interiorTower.js';
