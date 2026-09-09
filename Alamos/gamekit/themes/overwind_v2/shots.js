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

  // ---- the dressing pass. A place is only as built as its last screenshot,
  // and every one of these is a view nothing pointed at before.
  { name: 'yard--tub-road', at: { x: 6, z: 2 }, yaw: -0.9,
    note: 'the tub road from the collar to the tip, with the tubs on it' },
  { name: 'yard--spoil-heap', at: { x: 34, z: -30 }, yaw: -0.7,
    note: 'the spoil heap behind the tip — the second silhouette on the site' },
  { name: 'yard--weighbridge', at: { x: 4, z: 58 }, yaw: UP_YARD,
    note: 'the weighbridge and its kiosk at the yard entrance' },
  { name: 'yard--rope-coils', at: { x: -40, z: 34 }, yaw: WEST,
    note: 'the rope shop yard: four coils, one run out, and the offcut rack' },
  { name: 'yard--fan-house', at: { x: -14, z: -8 }, yaw: UP_YARD,
    note: 'the fan house, its duct to the collar and the plume off it' },
  { name: 'yard--ponds', at: { x: 50, z: -6 }, yaw: EAST,
    note: 'the settling ponds downhill of the tip' },
  { name: 'yard--gate', at: { x: 0, z: 30 }, yaw: UP_YARD,
    note: 'the passenger gate, shut until the twelfth day' },
  { name: 'moor--wall', at: { x: -36, z: -70 }, yaw: UP_YARD,
    note: 'the dry-stone wall along the bench track, and the moor behind it' },
  { name: 'moor--wall-stile', at: { x: -24, z: -38 }, yaw: WEST,
    note: 'the stile where the track crosses the wall' },
  { name: 'moor--peat', at: { x: -18, z: -108 }, yaw: UP_YARD,
    note: 'the peat cuttings, the stacked turves and the barrow run' },
  { name: 'moor--telegraph', at: { x: -30, z: -150 }, yaw: UP_YARD,
    note: 'the poles and the sag between them, following the track' },
  { name: 'moor--wreck', at: { x: -14, z: -160 }, yaw: -1.2,
    note: 'the previous winding drum, half-buried off the track' },
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
