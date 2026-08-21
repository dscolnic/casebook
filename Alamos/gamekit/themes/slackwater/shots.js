// shots.js — where to stand to photograph Sarn Barrage.
//
// `engine/dev/shots.mjs` reads this. Without it the tool falls back to a turn on
// the spot at the spawn, and at this site that photographs the barrage and none
// of the things the barrage exists for: the estuary on its far face, the gates
// along it, and the training wall running out into the water.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// which is seaward, across the barrage.
const SEAWARD = 0;
const LANDWARD = Math.PI;
const EAST = -Math.PI / 2;
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'road--at-the-gates', at: { x: 0, z: 34 }, yaw: SEAWARD,
    note: 'down the road at the barrage: six gate bays, gauge tower left, turbine hall right' },
  { name: 'gates--from-the-west', at: { x: -60, z: 26 }, yaw: EAST,
    note: 'along the line of the barrage from the west end — the water should be beyond it' },
  { name: 'gates--from-the-east', at: { x: 64, z: 24 }, yaw: WEST,
    note: 'the same line from the east end, past the turbine hall' },
  { name: 'barrage--close', at: { x: 0, z: 13 }, yaw: SEAWARD,
    note: 'up against the barrage: leaves at six different heights, hoists over them' },
  { name: 'jetty--over-the-water', at: { x: -58, z: 16 }, yaw: SEAWARD,
    note: 'the jetty from the boat shed, piles standing in the estuary' },
  { name: 'shore--east-to-the-wall', at: { x: 70, z: 6 }, yaw: EAST,
    note: 'the shore track east, marked the whole way to the wall station' },
  { name: 'wall--head', at: { x: 170, z: 16 }, yaw: SEAWARD,
    note: 'from the wall station: armour running out into the water, lower as it goes' },
  { name: 'wall--back-at-the-barrage', at: { x: 162, z: 10 }, yaw: WEST,
    note: 'the far tier looking back — 200 m of shore, and the barrage as a line' },
  { name: 'pontoon--float-rack', at: { x: -42, z: 30 }, yaw: SEAWARD,
    note: 'the survey pontoon, the rack of nine floats and the empty cradle' },
  { name: 'offices--from-the-road', at: { x: 8, z: 30 }, yaw: EAST,
    note: 'the currents room and the mud laboratory, and the tide board' },
];
export default VIEWS;
