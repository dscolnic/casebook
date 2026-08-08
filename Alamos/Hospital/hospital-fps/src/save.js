// save.js — now the engine's, not this game's.
//
// engine copy scopes the save slot per theme.
// Keeping a second copy here meant every fix had to be made twice; three times
// once the chemistry game existed. The forked original is beside this file as
// save.js.forked until the migration is proven.
export * from '../../../gamekit/engine/core/save.js';
