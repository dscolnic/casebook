// shots.js — where to stand to photograph Pellow Head.
//
// `engine/dev/shots.mjs` reads this. The fallback is a turn on the spot at the
// spawn, which photographs a compound of low grey boxes and none of the three
// things that make the place itself: the manhole where the cable comes out of the
// dunes, the bay with its barrier at the distance day nine computes, and the sea
// beyond the crest.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// which is seaward.
const SEAWARD = 0;
const LANDWARD = Math.PI;
const EAST = -Math.PI / 2;
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'compound--from-the-road', at: { x: 0, z: 50 }, yaw: SEAWARD,
    note: 'up the compound road: the station is one storey and the dunes are higher' },
  { name: 'compound--roofs', at: { x: 4, z: 22 }, yaw: EAST,
    note: 'the power hall and its roof racks and aerial' },
  { name: 'trailer--and-trench', at: { x: -10, z: -22 }, yaw: WEST,
    note: 'the splice trailer against the open duct trench' },
  { name: 'duct--to-the-manhole', at: { x: 4, z: -60 }, yaw: SEAWARD,
    note: 'the duct route, marked the whole way to the beach manhole' },
  { name: 'manhole--seaward', at: { x: 4, z: -108 }, yaw: SEAWARD,
    note: 'the manhole lid, its bollards, and the dune crest beyond it' },
  { name: 'crest--the-sea', at: { x: 4, z: -196 }, yaw: SEAWARD,
    note: 'at the crest fence: the sea should be past it, and the world ends here' },
  { name: 'dune-track--to-the-bay', at: { x: -34, z: -120 }, yaw: SEAWARD,
    note: 'the dune track, and the bay at the end of it' },
  { name: 'bay--barrier', at: { x: -70, z: -172 }, yaw: SEAWARD,
    note: 'the radiography bay: the barrier ring stands at eighteen metres, which is the arithmetic' },
  { name: 'bay--back-at-the-station', at: { x: -70, z: -186 }, yaw: LANDWARD,
    note: 'the far tier looking back — three hundred metres of empty dune is the shielding' },
  { name: 'store--cable-drum', at: { x: -44, z: 34 }, yaw: LANDWARD,
    note: "the ship's store and the drum of armoured cable, the only visible bight of it" },
];
export default VIEWS;
