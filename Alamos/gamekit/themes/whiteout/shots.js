// shots.js — the viewpoints `npm run shots whiteout` renders.
//
// Aster Station in a storm: what has to be checked is whether the modules loom
// out of the white, whether the clock and the flags read, whether the rover is
// where the campaign put it, and — with `--sol 15` — whether the runway door
// stands open with a plane at the end of the runway. `engine/dev/shots.mjs`
// drives the game's own teleport to each.
export const shots = [
  { name: 'spawn-into-camp', at: { x: 0, z: 44 }, yaw: 0 },
  { name: 'clock-and-board', at: { x: 2, z: 46 }, yaw: 296 },
  { name: 'camp-ring', at: { x: 0, z: 14 }, yaw: 0 },
  { name: 'power-and-hab', at: { x: 0, z: -14 }, yaw: 0 },
  { name: 'vehicle-bay-and-rover', at: { x: -8, z: -44 }, yaw: 0 },
  { name: 'mess-and-med', at: { x: 0, z: 48 }, yaw: 0 },
  { name: 'out-to-comms', at: { x: 40, z: 26 }, yaw: 270 },
  { name: 'comms-and-mast', at: { x: 76, z: 40 }, yaw: 276 },
  { name: 'runway-door', at: { x: -52, z: 40 }, yaw: 0 },
  { name: 'runway', at: { x: -96, z: 80 }, yaw: 0 },
  { name: 'runway-threshold', at: { x: -80, z: 100 }, yaw: 76 },
];

export default shots;
