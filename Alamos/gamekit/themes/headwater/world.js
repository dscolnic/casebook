// world.js — five floors of the Ashfell control tower.
//
// There is nothing here. The stacking, the stairs and the height function are
// `engine/world/interiorLevels.js`; what is about this building is `plan.js`
// (five levels, one glazed side) and `props.js` (the gorge and the fall behind
// the glass, built in `decorate`).
//
// The shim exists because `vite.config.js` resolves a theme's own world from
// `themes/<name>/`, so a theme cannot point `world:` straight at the engine.
export * from '../../engine/world/interiorLevels.js';
