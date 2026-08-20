// plan.js — the place, as data.
//
// TWO parallel gowned corridors with a glazed link between them, which is what
// a fab floor actually is: process on one side, analysis and offices on the
// other, and one crossing that everybody uses. The engine's interior builder
// makes exactly one corridor with rooms down both sides, so this theme brings
// its own world — `world:` below is read by vite.config.js, which points
// `@world` at it instead of at engine/world/interiorFloor.js.
//
//   themes/yellowbay/world.js   builds each wing with the engine's own
//                               `buildInterior`, then the link between them
//
// The link is the one part of this building nobody forgets: its floor is glass
// over the subfab, so you walk across six hundred metres of gas line, the pumps
// and the abatement stack while you carry a lot from one wing to the other.
//
// Units are metres. +z runs along both wings, +x is across them.

// vite.config.js finds this by reading the file, so it has to be written as a
// literal key with a literal string — `export const world = …` and a `world,`
// shorthand both parse fine and are both invisible to it, which is an hour
// spent looking at a building that had quietly been built by the shared
// single-corridor module instead.
export const OWN_WORLD = 'themes/yellowbay/world.js';

/** Shared by both wings, and by the link that joins them. */
const METRICS = {
  corridorHalfWidth: 2.1,     // wide enough for a wafer cart and a gowned person
  roomDepth: 7.6,
  ceilingH: 3.2,
  tileH: 2.9,
  palette: {
    floorSpine: [206, 194, 160],
    floorRoom:  [201, 196, 176],
    wall:  '#efe6cf',
    base:  '#6a6353',
    rail:  '#9a9280',
    frame: '#c3bca8',
    door:  '#b08a4a',
    signBand: '#7a5c16',
  },
};

/**
 * Where the link crosses.
 *
 * At the far end of both wings rather than half way down them, because
 * `buildInterior` builds each wing's two long walls end to end and there is no
 * hole to be had in the middle of one — but it takes `openEnds`, which leaves
 * the corridor's own width clear at a z end for exactly this: "a link to
 * another wing", in the builder's own words. So the floor is a U: down the
 * process wing, across the glass, back up the analysis wing.
 */
export const LINK = { z0: 40, z1: 47 };

/**
 * The two wings.
 *
 * `x` is where each wing's corridor centreline sits in world space; everything
 * inside `rooms` is in that wing's own coordinates, which is what
 * `buildInterior` expects. Nothing on the inner side may cross LINK — that gap
 * is where the bridge lands, and its own end walls close it.
 */
export const WINGS = [
  {
    id: 'W', x: -14, name: 'Process wing',
    metrics: METRICS,
    spine: { z0: -6, z1: 40 },
    // The far end is where the link lands. Open means an opening: the end wall
    // is still built either side of the corridor.
    openEnds: { z1: true },
    rooms: [
      { id: 'ARRIVE', side: 'w', z0: -4, z1: 6,  name: 'Gown Room',       kind: 'reception', open: true },
      { id: 'LITHO',  side: 'w', z0: 6,  z1: 22, name: 'Yellow Bay',      kind: 'workroom',  group: 'LITHO', door: 'wide' },
      { id: 'DEP',    side: 'w', z0: 22, z1: 38, name: 'Deposition Bay',  kind: 'lab',       group: 'DEP',   door: 'wide' },
      { id: 'WAFER',  side: 'e', z0: -4, z1: 14, name: 'Wafer Store',     kind: 'supply',    group: 'WAFER', door: 'wide' },
      { id: 'STORE',  side: 'e', z0: 14, z1: 24, name: 'Chemical Stores', kind: 'supply' },
      { id: 'QUIET',  side: 'e', z0: 24, z1: 38, name: 'Quiet Room',      kind: 'quiet' },
    ],
    bladeSigns: [
      { z: 7.0,  west: 'Yellow Bay',    east: 'Wafer Store' },
      { z: 23.0, west: 'Deposition',    east: 'Quiet Room' },
      { z: 37.0, west: 'To the link',   east: 'To the link' },
    ],
  },
  {
    id: 'E', x: 14, name: 'Analysis wing',
    metrics: METRICS,
    spine: { z0: -6, z1: 40 },
    openEnds: { z1: true },
    rooms: [
      { id: 'DOPE',   side: 'w', z0: -4, z1: 14, name: 'Implant Bay',      kind: 'workroom', group: 'DOPE', door: 'wide' },
      { id: 'WET',    side: 'w', z0: 14, z1: 30, name: 'Wet Bench',        kind: 'lab',      group: 'WET',  door: 'wide' },
      { id: 'ATOM',   side: 'e', z0: -4, z1: 12, name: 'Metrology Bay',    kind: 'lab',      group: 'ATOM', door: 'wide' },
      { id: 'DESK',   side: 'e', z0: 12, z1: 22, name: 'Integration Desk', kind: 'station',  open: true },
      { id: 'BACK',   side: 'e', z0: 22, z1: 32, name: 'Subfab Stair',     kind: 'supply' },
    ],
    bladeSigns: [
      { z: 8.0,  west: 'Implant Bay', east: 'Metrology' },
      { z: 22.0, west: 'Wet Bench',   east: 'Subfab Stair' },
      { z: 37.0, west: 'To the link', east: 'To the link' },
    ],
  },
];

const HALF = METRICS.corridorHalfWidth;
const DEPTH = METRICS.roomDepth;

/**
 * Every room in world coordinates, with the footprint the map draws it at.
 *
 * Derived rather than authored: a second hand-written copy of eleven rooms is
 * a second copy that goes stale the first time one moves. `map.js` uses `x0`
 * and `x1` where a room has them, which is the hook a theme with its own world
 * is meant to use; `worldParity` and the world module read the same list.
 */
export const rooms = WINGS.flatMap(w => w.rooms.map(r => ({
  ...r,
  wing: w.id,
  x0: r.side === 'w' ? w.x - HALF - DEPTH : w.x + HALF,
  x1: r.side === 'w' ? w.x - HALF : w.x + HALF + DEPTH,
})));

/** The building itself, for the map: two corridors and the link across them. */
const shapes = [
  ...WINGS.map(w => ({ kind: 'floor', x0: w.x - HALF, x1: w.x + HALF,
                       z0: w.spine.z0, z1: w.spine.z1 })),
  { kind: 'open', name: 'Glass link', x0: WINGS[0].x - HALF, x1: WINGS[1].x + HALF,
    z0: LINK.z0, z1: LINK.z1 },
];

export const plan = {
  world: 'themes/yellowbay/world.js',
  metrics: METRICS,
  wings: WINGS,
  link: LINK,
  // The z range both wings share. The light rig and anything asking "how long
  // is this place" reads it.
  spine: { z0: -6, z1: LINK.z1 },
  rooms,
  shapes,
  halfWidth: HALF,

  /** Seating in the gown room and at the integration desk, in world space. */
  seats: [
    [-18.6, -1.4, Math.PI / 2], [-18.6, 0.2, Math.PI / 2], [-18.6, 1.8, Math.PI / 2],
    [-21.8, -1.4, -Math.PI / 2], [-21.8, 0.2, -Math.PI / 2], [-21.8, 1.8, -Math.PI / 2],
    [-20.0, 3.8, 0], [-18.8, 3.8, 0],
    [19.4, 14.4, Math.PI], [20.8, 14.4, Math.PI], [19.4, 17.6, 0],
    // and two on the link, facing the glass
    [-6.0, 41.6, 0], [6.0, 41.6, 0],
  ],

  /** Where people stand and where the shift sends them, in world space. */
  spots: {
    spine: [
      // process wing
      [-15.5, -3], [-12.5, 0], [-15.5, 4], [-12.5, 8], [-15.5, 12], [-12.5, 16],
      [-15.5, 20], [-12.5, 24], [-15.5, 28], [-12.5, 32], [-15.5, 36],
      // analysis wing
      [12.5, -3], [15.5, 0], [12.5, 4], [15.5, 8], [12.5, 12], [15.5, 16],
      [12.5, 20], [15.5, 24], [12.5, 28], [15.5, 32], [12.5, 36],
      // the link — people do stop on it, which is half of why it is there
      [-9.0, 43.5], [-3.0, 42.5], [3.0, 44.5], [9.0, 43.5],
    ],
    open: [[-19.4, 0], [-21.0, 2.4], [-18.6, 4.4], [19.6, 16], [21.0, 18.6]],
  },
  anchors: {
    base:  [[19.6, 16], [21.0, 18.6], [15.5, 15], [12.5, 18]],
    work:  [[-15.5, 12], [-12.5, 28], [-15.5, 32], [15.5, 8], [12.5, 24], [15.5, 30]],
    front: [[-19.4, 0], [-21.0, 2.4], [-12.5, 0], [-15.5, 4], [12.5, 0]],
  },
};

export default plan;
