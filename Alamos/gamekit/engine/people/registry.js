// registry.js — who the crowd is, for engine code that must not care which
// crowd this game runs.
//
// `map.js` imported `getNPCs` straight from `crowd.js`, which is right for the
// themes served out of gamekit and wrong for the two games that fork
// `npcs.js`. Their people live in a different module's array, so the engine's
// array was empty, `wantedPeople` was always empty, and a mission person never
// appeared on the map in Project Y or the hospital — no error anywhere, just a
// map with nobody on it.
//
// Each crowd registers itself when it is imported. The last one to register
// wins, which is correct: a game imports exactly one.

let source = () => [];

/** Called by a crowd module at import time. `fn` returns the live NPC array. */
export function registerNPCSource(fn){
  if(typeof fn === 'function') source = fn;
}

/** Every NPC in this game, whichever crowd module owns them. */
export function npcsForEngine(){
  try{ return source() ?? []; }
  catch{ return []; }
}
