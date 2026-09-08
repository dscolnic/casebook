// shots.js — where to stand to photograph Kerrow No. 3.
//
// `engine/dev/shots.mjs` reads this. The fallback is a turn on the spot at the
// spawn, which photographs the headframe and misses the two things it is joined
// to: the rope crossing the yard at head height, and the drum in the winder
// house it comes off.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z, up
// the yard at the headframe.
const UP_YARD = 0;
const DOWN_YARD = Math.PI;
const EAST = -Math.PI / 2;
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'yard--headframe', at: { x: 0, z: 46 }, yaw: UP_YARD,
    note: 'up the yard: 32 m of lattice, two sheave wheels, and nothing else above nine metres' },
  { name: 'yard--under-the-rope', at: { x: -14, z: 6 }, yaw: WEST,
    note: 'standing under the rope run, looking at the winder house it leaves' },
  { name: 'winder--drum', at: { x: -30, z: 16 }, yaw: UP_YARD,
    note: 'the drum, its flanges and the brake weights' },
  { name: 'shaft--collar', at: { x: 0, z: 8 }, yaw: UP_YARD,
    note: 'the shaft collar and the dark hole in it, from the bank side' },
  { name: 'headframe--back-legs', at: { x: -18, z: -4 }, yaw: EAST,
    note: 'the back legs taking the rope pull, and the frame in profile' },
  { name: 'tip--bins', at: { x: 30, z: -8 }, yaw: UP_YARD,
    note: 'the tip, the bins and the conveyor leaving the map' },
  { name: 'bench--track', at: { x: -36, z: -60 }, yaw: UP_YARD,
    note: 'the bench track out to the gravity station, marked the whole way' },
  { name: 'gravity--hut', at: { x: -70, z: -270 }, yaw: UP_YARD,
    note: 'the gravity station, its concrete pillar, and the moor' },
  { name: 'gravity--back-at-the-mine', at: { x: -70, z: -270 }, yaw: DOWN_YARD,
    note: 'the far tier looking back: the headframe should be the only vertical thing' },
  { name: 'lamp-room--and-change-house', at: { x: 10, z: 22 }, yaw: DOWN_YARD,
    note: 'where a shift starts, and the shift board' },
];
export default VIEWS;
