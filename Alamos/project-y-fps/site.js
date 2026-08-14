import { ranges, N, E, W } from '../gamekit/engine/world/horizonShape.js';
// site.js — Los Alamos, as data.
//
// The first slice of moving this town onto gamekit's world layer: the five
// division buildings, which are the ones that matter for gameplay because each
// carries a mission stop. Everything here was read out of the running game —
// positions and angles from buildingMeshes, dimensions and colours from
// world.js's BUILDING_DATA — so this reproduces the town rather than
// reinterpreting it.
//
// This file is now wired up: `src/world.js` is a thin adapter over
// engine/world/outdoorTown.js, which builds the mesa, the roads, the pond, the
// buildings and the sky from what is here. The Los Alamos-specific objects —
// boardwalks, power poles, the Tech Area wire, vehicles, the Ponderosa forest —
// live in props.js beside this file, because they are the place rather than the
// shape of the ground.
//
// The engine's 'mesa' profile was checked against the heightfield env.js used to
// compute by hand before the switch: mean difference 0.06 m over the town, worst
// case 0.5 m. Pads now read level where the old surface noise dipped them half a
// metre, which is what a graded bench is supposed to do.
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

  // The roads, which `env.js` held as ROADS and graded by hand. `worn` is what it
  // called `rut`: the width of the wheel-polished strip down the middle.
  paths: [
    { cx: 0,  cz: 10, w: 240, d: 16,  worn: 10 },   // Trinity Drive
    { cx: 16, cz: 54, w: 11,  d: 104, worn: 6.5 },  // north to the canyon bridge
    { cx: -8, cz: 19, w: 11,  d: 22,  worn: 6 },    // the lab access spur
  ],

  // Ashley Pond is not a building. It sat in the same table only because that
  // table was "things to place"; here it is what it actually is.
  //
  // `bed` and `shore` are set explicitly and are much smaller than the engine's
  // river defaults for a reason: the bed is cut into the terrain, and the default
  // 14 m shore feather on a 14 m pond would dig a soft two-metre crater across
  // the middle of town, eight metres from the spawn.
  water: { cx: 0, cz: -8, width: 14, depth: 14, level: -0.35, bed: 0.8, shore: 4 },

  // The status board on Trinity Drive, which src/world.js drew by hand as
  // `centralBoardMesh`. Same place, same facing.
  board: { x: 0, z: 22, facing: 0, title: 'Project Y — Status' },

  // The Hill had two mountain ranges and they are nothing like each other: the
  // Jemez rise immediately west, close and dark, and the Sangre de Cristo stand
  // forty miles east across the Rio Grande valley, high and blue with distance.
  // The site shipped with no horizon at all, which left the mesa floating.
  horizon: [
    { radius: 520, height: 96, colour: 0x4c4a42, haze: 0.30,
      amp: ranges([{ at: W, width: 2.2, hi: 1.0 }], 0.06) },
    { radius: 900, height: 150, colour: 0x5a5f63, haze: 0.55,
      amp: ranges([{ at: W, width: 1.8, hi: 1.1 }, { at: N, width: 1.0, hi: 0.5 }], 0.05) },
    // Across the valley: far, low in the frame, and blued out by the air.
    { radius: 1700, height: 210, colour: 0x6d7a86, haze: 0.78,
      amp: ranges([{ at: E, width: 2.0, hi: 1.0 }], 0.03) },
  ],

  spawn: { x: 0, z: 14, yaw: 0 },
};

export default site;
