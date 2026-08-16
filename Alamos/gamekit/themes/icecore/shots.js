// shots.js — the viewpoints `npm run shots icecore` renders.
//
// A hand-placed list because the interesting things here are not the rooms:
// the place is a flat plain with a camp on it, and what has to be checked is
// the horizon, the flag line, and whether the trench reads as dug in rather
// than raised. `engine/dev/shots.mjs` drives the game's own teleport to each.
export const shots = [
  { name: 'spawn-into-camp', at: { x: 0, z: 44 }, yaw: 0 },
  { name: 'camp-street', at: { x: 0, z: 6 }, yaw: 0 },
  { name: 'trench-from-the-route', at: { x: -2, z: -44 }, yaw: 0 },
  { name: 'trench-close', at: { x: -4, z: -52 }, yaw: 0 },
  { name: 'science-module', at: { x: -22, z: 14 }, yaw: 0 },
  { name: 'core-line', at: { x: 20, z: 13 }, yaw: 0 },
  { name: 'cold-and-gas', at: { x: 0, z: -22 }, yaw: 0 },
  // The two that carry the place: the walk out to the stake array, and the
  // empty plain behind camp with nothing on the skyline at all.
  { name: 'out-to-the-stakes', at: { x: 40, z: 26 }, yaw: 90 },
  { name: 'the-empty-side', at: { x: 0, z: 60 }, yaw: 180 },
  { name: 'skiway', at: { x: -96, z: 60 }, yaw: 180 },
];

export default shots;
