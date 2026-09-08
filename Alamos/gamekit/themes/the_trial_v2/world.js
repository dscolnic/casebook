// world.js — three floors of the Fenwick Coordinating Centre.
//
// There is nothing here. The stacking, the stairs and the height function are
// `engine/world/interiorLevels.js`, which this building was the first to need
// and Ashfell Dam was the second — two copies of a world module is how the
// engine got forked three ways the first time, so it moved.
//
// What is left in the theme is the part that is actually about this building:
// `plan.js` (three levels, offset along the spine as well as vertically, and why
// they have to be) and `props.js` (the warehouse, the infusion bay, the walls).
//
// The shim exists because `vite.config.js` resolves a theme's own world from
// `themes/<name>/`, so a theme cannot point `world:` straight at the engine.
export * from '../../engine/world/interiorLevels.js';
