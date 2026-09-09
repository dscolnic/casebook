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

  // ---- the dressing pass. A place is only as built as its last screenshot.
  { name: 'nursery--beds', at: { x: 22, z: 6 }, yaw: -Math.PI / 2,
    note: 'the raised beds, the hoop tunnels and the seedling trays' },
  { name: 'nursery--trestles', at: { x: 26, z: 18 }, yaw: 0,
    note: 'the potting trestles, the trays and the coiled hose' },
  { name: 'marsh--boardwalk', at: { x: -72, z: -132 }, yaw: Math.PI,
    note: 'the boardwalk out over the water, and the hide at the end of it' },
  { name: 'marsh--from-the-track', at: { x: -50, z: -150 }, yaw: Math.PI / 2,
    note: 'the marsh, its reed beds and the birds over it' },
  { name: 'grazing--enclosure', at: { x: -30, z: -44 }, yaw: Math.PI,
    note: 'the fence, the trough and the animals in it' },
  { name: 'orchard--rows', at: { x: -40, z: 6 }, yaw: Math.PI,
    note: 'thirty young trees in guards, in a grid' },
  { name: 'shore--strand', at: { x: 0, z: -186 }, yaw: Math.PI,
    note: 'wet rock, pools and the kelp on the strand line' },
  { name: 'ship--alongside', at: { x: 20, z: -178 }, yaw: Math.PI,
    note: 'the coaster at the jetty — the ship the campaign counts down to' },
  { name: 'ship--gangway', at: { x: 34, z: -188 }, yaw: Math.PI,
    note: 'the gangway and the sample cart at the foot of it' },
  { name: 'station--quarantine', at: { x: -14, z: 34 }, yaw: Math.PI,
    note: 'the boot wash, the coat rail and the clinic door behind them' },
  { name: 'station--mast', at: { x: 4, z: 2 }, yaw: 0,
    note: 'the weather mast, its anemometer and the vane' },
];
export default VIEWS;
