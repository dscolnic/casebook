// site.js — the Wellmere Seed Bank and Breeding Station, as data.
//
// Outbreak: Riverton is the other AP Biology game, and it is a hospital campus
// in week three of an epidemic. This is the other half of the course — heredity,
// selection, energetics — so it had to be the other half of biology's world as
// well: plants, seasons and populations rather than patients and pathogens.
//
// The place is a working farm with a vault under it. Two things carry the
// silhouette and nothing in the set has either:
//
//   · **the glasshouse range** — three glazed volumes in a row, which read as
//     nothing else at any distance;
//   · **the trial grid** — 240 plots on a numbered lattice, walked between. The
//     field is not scenery here; it is where half the calls happen, and a grid
//     of markers stretching to the treeline is a shape no town has.
//
// Looking down, -Z is north, up the slope toward the trial ground:
//
//        ~ ~ ~ the shelterbelt, and the hills beyond ~ ~ ~        z = -240
//              THE TRIAL GRID — 240 plots, staked and numbered     z = -180
//        [ Field Laboratory ]        [ Screenhouse ]               z =  -96
//        [ Glasshouse range: three bays ]                          z =  -40
//        [ Crossing Hall ]  [ Molecular Lab ]                      z =   -6
//        [ Seed Vault ]     [ Drying & Processing ]                z =   34
//                          ¤ spawn ¤                               z =   52
//        [ Records ]        [ Threshing Floor ]                    z =   74
//
// Load-bearing rather than decorative:
//
//   · Every `group` is a group id in content/groups.js, or that area's calls
//     are unreachable and only `worldParity` says so.
//   · The vault is the coldest building on site and the only one with no
//     windows: seeds die by respiring, and the whole conservation half of this
//     course is a temperature and a moisture content.
//   · The spawn has ten clear metres round it. A prop over the spawn welds the
//     player in place and the scene still renders perfectly.

import { ranges, opening, N, NW, E } from '../../engine/world/horizonShape.js';

const PI = Math.PI;

/** The six areas of study, each in the building where that work is done. */
const AREA_BUILDINGS = [
  // ---- the conservation end, nearest the road
  { id: 'VAULT', group: 'VAULT', name: 'Seed Vault', dome: 0,
    x: -34, z: 34, w: 26, d: 16, h: 6.2, facing: 0, colour: 0x9aa39c, accent: 0x2f5d52 },
  { id: 'DRY', group: 'DRY', name: 'Drying & Processing Hall', dome: 0,
    x: 34, z: 34, w: 24, d: 15, h: 7.0, facing: 0, colour: 0xa8a695 },
  // ---- the working middle
  { id: 'CROSS', group: 'CROSS', name: 'Crossing Hall', dome: 0,
    x: -40, z: -6, w: 22, d: 14, h: 6.4, facing: 0, colour: 0x9ea892 },
  { id: 'LAB', group: 'LAB', name: 'Molecular Laboratory', dome: 0,
    x: 40, z: -6, w: 22, d: 14, h: 6.4, facing: 0, colour: 0x94a0a6 },
  // ---- out toward the ground
  { id: 'TRIAL', group: 'TRIAL', name: 'Field Laboratory', dome: 0,
    x: -44, z: -96, w: 20, d: 13, h: 5.6, facing: PI, colour: 0xa39e8c },
  { id: 'POP', group: 'POP', name: 'Genetic Resources Office', dome: 0,
    x: 44, z: -96, w: 20, d: 13, h: 5.6, facing: PI, colour: 0x9d9f8e },
];

/** Places with no lesson attached. They carry the place and the wayfinding. */
const LANDMARKS = [
  { id: 'GH1', name: 'Glasshouse 1', sub: 'Warm bay · the crosses that cannot wait for spring',
    x: -26, z: -40, w: 14, d: 26, h: 5.4, facing: 0, colour: 0x9db2ab, accent: 0x6f9487 },
  { id: 'GH2', name: 'Glasshouse 2', sub: 'Cool bay · vernalisation',
    x: 0, z: -40, w: 14, d: 26, h: 5.4, facing: 0, colour: 0x9db2ab, accent: 0x6f9487 },
  { id: 'GH3', name: 'Glasshouse 3', sub: 'Screening bay · rust nursery, kept apart',
    x: 26, z: -40, w: 14, d: 26, h: 5.4, facing: 0, colour: 0x9db2ab, accent: 0xb5502f },
  // The screenhouse is NOT here. It is a mesh cage rather than a building, and
  // giving it a 0.1 m entry to carry the nameplate put a full-size door slab and
  // signboard standing in the middle of the cage — `kit.building` sizes its door
  // and its sign in metres, not as a fraction of the shell. props.js builds the
  // cage and hangs a plain `sign` on it instead.
  { id: 'RECORDS', name: 'Passport Records', sub: 'Where every accession came from',
    x: -36, z: 74, w: 16, d: 11, h: 5.0, facing: PI, colour: 0xa7a293 },
  { id: 'THRESH', name: 'Threshing Floor', sub: 'Harvest in, chaff out',
    x: 32, z: 74, w: 18, d: 12, h: 5.8, facing: PI, colour: 0x9c9384 },
];

export const site = {
  kind: 'outdoor',
  name: 'Wellmere Seed Bank',

  terrain: {
    // A river terrace: flat where the ground is, rising gently to the north
    // where the trial grid sits, because a trial ground is chosen for being
    // level and the land beyond it never is.
    size: 900, segments: 320, playerLimit: 300,
    profile: 'rolling', relief: 0.35,
    // Worked ground: not grass, not desert. Kept a stop darker than it looks,
    // because under ACES a mid albedo blows out to sand.
    ground: { base: [104, 102, 74], spread: [30, 30, 22], repeat: 34, normalRepeat: 300 },
  },

  // Temperate, and the sky is doing something. This is a place whose whole
  // argument is about seasons.
  atmosphere: {
    turbidity: 3.2, rayleigh: 2.2, mie: 0.004, mieG: 0.78, scale: 700, stars: 1200,
  },

  paths: [
    { cx: 0, cz: 40, w: 150, d: 8, worn: 6 },        // the yard, in front of the vault
    { cx: 0, cz: -20, w: 9, d: 130, worn: 6 },       // the spine road, north to the ground
    { cx: 0, cz: -96, w: 120, d: 7, worn: 5 },       // the field road
    { cx: 0, cz: -118, w: 8, d: 50, worn: 4 },       // up to the trial gate
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 10, z: 46, facing: PI, title: 'Season Board' },

  furniture: [
    { kind: 'post', x: -8, z: 20, height: 3.6, r: 0.1, colour: 0x4a4a3e },
    { kind: 'post', x: 8, z: -14, height: 3.6, r: 0.1, colour: 0x4a4a3e },
    { kind: 'post', x: -8, z: -60, height: 3.6, r: 0.1, colour: 0x4a4a3e },
    { kind: 'bench', x: -14, z: 44, facing: 0 },
    { kind: 'bin', x: 12, z: 44 },
  ],

  // Rough grass on the margins only. The band starts outside the trial fence,
  // because scrub growing between the plots is the one thing a trial ground
  // does not have.
  scrubCount: 900,
  scrubColour: 0x4f5a36,
  scrubBand: [285, 430],

  // Not a ring. A ring of hills at every bearing is what every theme here
  // shipped by accident, and it makes the skyline say nothing about which way
  // anything is. Wellmere sits on a terrace with the hills closing it off to
  // the north, above the trial ground and the shelterbelt — and the east open
  // to the horizon, which is the direction the rust is coming from and the one
  // the campaign keeps pointing at.
  horizon: [
    { radius: 820, height: 70, colour: 0x59654f, haze: 0.34,
      amp: ranges([{ at: N, width: 2.4, hi: 1.0 }, { at: NW, width: 1.5, hi: 0.72 }], 0.10) },
    { radius: 1050, height: 150, colour: 0x66735c, haze: 0.56,
      amp: ranges([{ at: N, width: 1.9, hi: 1.15 }], 0.05) },
    // Farmland going away east: a low line, and a gap where it is flattest.
    { radius: 960, height: 22, colour: 0x6d7663, haze: 0.5,
      amp: opening(E, 2.1, { deep: 0.02, hi: 0.38 }) },
  ],

  // In the yard, facing north up the spine road: the vault behind you, the
  // glasshouses ahead, the ground beyond them.
  spawn: { x: 0, z: 52, yaw: 0 },
};

export default site;
