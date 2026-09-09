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
  { name: 'trailer--genetics', at: { x: -10, z: -22 }, yaw: WEST,
    note: 'the genetics trailer against the old trench' },
  { name: 'shore-route--to-the-sampling-point', at: { x: 4, z: -60 }, yaw: SEAWARD,
    note: 'the shore route, marked the whole way down to the sampling point' },
  { name: 'sampling-point--seaward', at: { x: 4, z: -108 }, yaw: SEAWARD,
    note: 'the shore sampling point, its quadrat, and the nesting patch beyond' },
  { name: 'crest--the-sea', at: { x: 4, z: -196 }, yaw: SEAWARD,
    note: 'at the crest fence: the sea should be past it, and the world ends here' },
  { name: 'dune-track--to-the-bay', at: { x: -34, z: -120 }, yaw: SEAWARD,
    note: 'the dune track, and the bay at the end of it' },
  { name: 'bay--marsh-research', at: { x: -70, z: -172 }, yaw: SEAWARD,
    note: 'the marsh research bay from the track, the marsh behind the camera' },
  { name: 'bay--back-at-the-station', at: { x: -70, z: -186 }, yaw: LANDWARD,
    note: 'the far tier looking back — three hundred metres of empty dune is the shielding' },
  { name: 'store--covered-cart', at: { x: -44, z: 34 }, yaw: LANDWARD,
    note: "the shipping store, the hose reel and the covered pilot cart at its door" },

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
  { name: 'jetty--offshore', at: { x: 30, z: -180 }, yaw: SEAWARD,
    note: 'the jetty and the water past it — empty until day 14, when the ship rides at anchor' },
  { name: 'nesting--patch', at: { x: 40, z: -98 }, yaw: SEAWARD,
    note: 'the fenced nesting patch in the dune grass, and its state sign' },
  { name: 'dune-trays--flowers', at: { x: -27, z: -40 }, yaw: SEAWARD,
    note: 'the staggered flower trays out by the grazing, and the insects over them' },
  { name: 'notice-board--tide', at: { x: 10, z: 60 }, yaw: SEAWARD,
    note: 'the Field Notice Board: tide, nesting and visiting hours, the day header over it' },
  { name: 'station--quarantine', at: { x: -14, z: 34 }, yaw: Math.PI,
    note: 'the boot wash, the coat rail and the clinic door behind them' },
  { name: 'station--mast', at: { x: 4, z: 2 }, yaw: 0,
    note: 'the weather mast, its anemometer and the vane' },
];
export default VIEWS;
