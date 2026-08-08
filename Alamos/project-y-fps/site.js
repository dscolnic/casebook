// site.js — Los Alamos, as data.
//
// The first slice of moving this town onto gamekit's world layer: the five
// division buildings, which are the ones that matter for gameplay because each
// carries a mission stop. Everything here was read out of the running game —
// positions and angles from buildingMeshes, dimensions and colours from
// world.js's BUILDING_DATA — so this reproduces the town rather than
// reinterpreting it.
//
// NOT YET MIGRATED, and still built by src/world.js: the fifteen filler
// buildings, Ashley Pond, the roads, boardwalks, power poles, fences, vehicles
// and the central board. `@world` still points at src/world.js; nothing in this
// file is wired up yet. It is data waiting for the rest of the town.
//
// Each building was a `createBuilding` call — 213 lines of shared geometry
// driven by one row of a table. With kit.building's roof/siding/base/stoop
// options that row is now the whole description.

const PI = Math.PI;

/**
 * `wall` is the siding colour and `accent` the division colour, which is what
 * the original drew the sign and door in. Every one of these is board-and-batten
 * on a half-metre pier plinth with a low-pitch gable — the mesa vernacular.
 */
export const DIVISIONS = [
  { id: 'T',  group: 'T',  name: 'Theory & Calculations',
    x: 0,   z: 58,  w: 20, d: 11, h: 5.4, facing: PI,
    colour: 0x3d4a3a, accent: 0x315c78 },
  { id: 'P',  group: 'P',  name: 'Experimental Physics',
    x: -48, z: -10, w: 15, d: 13, h: 6.2, facing: PI / 2,
    colour: 0x8b8375, accent: 0x4b775f },
  { id: 'X',  group: 'X',  name: 'Implosion & Integration',
    x: 48,  z: -10, w: 18, d: 12, h: 5.8, facing: -PI / 2,
    colour: 0x5c5347, accent: 0x704f88 },
  { id: 'CM', group: 'CM', name: 'Chemistry & Metallurgy',
    x: -30, z: 42,  w: 16, d: 14, h: 6.6, facing: PI,
    colour: 0x6f6a5c, accent: 0x8a6921 },
  { id: 'E',  group: 'E',  name: 'Ordnance & Engineering',
    x: 32,  z: 42,  w: 20, d: 10, h: 5.2, facing: PI,
    colour: 0x44503c, accent: 0x865044 },
];

/** The vernacular every division building shares, applied on top of its row. */
export const DIVISION_STYLE = {
  roof: 'gable',
  siding: 'board',
  base: 0.5,          // pier plinth — nothing on the mesa sat on a slab
  stoop: true,
  windows: true,      // 'true' resolves to punched, because the roof is pitched
  trim: 0x53483a,
};


/**
 * The town around the divisions. These carry no mission stop — they are what
 * makes the place a town rather than five sheds on a mesa — so they have no
 * group, and the engine treats a building without one as scenery.
 *
 * Each row's construction is what world.js's createFillerBuilding did with its
 * flag: log walls on a deeper plinth for the two lodges, board-and-batten for
 * the housing rows, stucco for the chapel and infirmary, and the shallow plinth
 * the hutments barely had.
 */
export const FILLER = [
  { id: 'FULLER', name: 'Fuller Lodge',       x: 0,   z: -30, w: 22, d: 12, h: 8,
    colour: 0x7a4a2e, siding: 'wood',   base: 0.6,  corners: false },
  { id: 'BIG',    name: 'Big House',          x: 10,  z: -38, w: 16, d: 10, h: 7.5,
    colour: 0x6b3a1f, siding: 'wood',   base: 0.6,  corners: false },
  { id: 'SUNDTS', name: 'Sundt 4-Plex Row',   x: -48, z: -26, w: 18, d: 9,  h: 7,
    colour: 0x8a6a3a, siding: 'board',  base: 0.45 },
  { id: 'SUNDTS2', name: 'Sundt 4-Plex Row',  x: 44,  z: -26, w: 18, d: 9,  h: 7,
    colour: 0x8a6a3a, siding: 'board',  base: 0.45 },
  { id: 'DUP',    name: 'Sundt Duplexes',     x: -28, z: 24,  w: 14, d: 8,  h: 5.5,
    colour: 0x9a8a73, siding: 'board',  base: 0.45 },
  { id: 'MCKEE',  name: 'McKee Hutments',     x: 30,  z: 26,  w: 16, d: 8,  h: 4.5,
    colour: 0x6b7a6b, siding: 'board',  base: 0.22 },
  { id: 'DORMF',  name: 'Women\u2019s Dorm T-178', x: -66, z: -6, w: 14, d: 10, h: 6,
    colour: 0xd9d2c5, siding: 'board',  base: 0.45 },
  { id: 'DORMM',  name: 'Men\u2019s Dorm',        x: -80, z: -6,  w: 14, d: 10, h: 6,
    colour: 0xd9d2c5, siding: 'board',  base: 0.45 },
  { id: 'WAC',    name: 'WAC Barracks',       x: -76, z: 26,  w: 16, d: 9,  h: 5,
    colour: 0x5a6a7a, siding: 'board',  base: 0.45 },
  { id: 'THEAT',  name: 'Theater No. 2',      x: 68,  z: -6,  w: 16, d: 12, h: 8,
    colour: 0x4a3d2e, siding: 'board',  base: 0.45 },
  { id: 'PX',     name: 'Post Exchange',      x: 58,  z: 24,  w: 11, d: 10, h: 6,
    colour: 0x9a741d, siding: 'board',  base: 0.45 },
  { id: 'CHAPL',  name: 'Army Chapel',        x: -48, z: 34,  w: 10, d: 12, h: 7,
    colour: 0xf5f1e9, siding: 'stucco', base: 0.45, corners: false },
  { id: 'INFIR',  name: 'Infirmary',          x: 58,  z: 38,  w: 12, d: 10, h: 6.5,
    colour: 0xf2f2f0, siding: 'stucco', base: 0.45, corners: false },
  { id: 'GUARD',  name: 'Main Gate House',    x: 27,  z: 88,  w: 6,  d: 6,  h: 4,
    colour: 0x3a2e22, siding: 'board',  base: 0.22 },
];

/** What every filler building shares: pitched roof, punched windows, a stoop. */
export const FILLER_STYLE = { roof: 'gable', stoop: true, windows: true, trim: 0x53483a };

export const site = {
  kind: 'outdoor',

  // A mesa: flat on top with a hard rim, which is the profile outdoorSite was
  // generalised from in the first place.
  terrain: {
    size: 760, segments: 300, playerLimit: 105,
    profile: 'mesa', relief: 1.0,
    ground: { base: [116, 96, 68], spread: [76, 66, 50], repeat: 12, normalRepeat: 150 },
  },

  // Thin, dry, high air: low turbidity and high rayleigh. A low rayleigh washes
  // the whole dome out to near-white.
  atmosphere: { turbidity: 1.8, rayleigh: 2.6, mie: 0.0026, mieG: 0.80, scale: 850, stars: 1600 },

  buildings: [
    ...DIVISIONS.map(b => ({ ...DIVISION_STYLE, ...b })),
    ...FILLER.map(b => ({ ...FILLER_STYLE, ...b })),
  ],

  // Ashley Pond is not a building. It sat in the same table only because that
  // table was "things to place"; here it is what it actually is.
  water: { cx: 0, cz: -8, width: 14, depth: 14, level: -0.35 },

  spawn: { x: 0, z: 14, yaw: 0 },
};

export default site;
