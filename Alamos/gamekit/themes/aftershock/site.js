// site.js — Kestrel Bay, three days after, as data.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. What makes this place unlike the other eight is that it is *two*
// places, and the earthquake treated them differently:
//
//   Upper Town stands on a granite bench at the foot of the range. Short, hard
//   shaking. Masonry parapets in the street, chimneys down, timber houses shoved
//   off their foundations — and almost everything still standing.
//
//   The Flats are hydraulic fill over delta mud, dredged and pumped in eighty
//   years ago to make a port. Long, slow shaking that the soft ground amplified,
//   and then the ground itself liquefied. Sand fans in the streets, a wharf that
//   walked seaward, a six-storey block sitting over at eight degrees on a raft
//   that is perfectly intact.
//
// Between them runs the Kestrel Fault, and it broke the surface. The scarp
// crosses the map on a diagonal, and the player walks it: a 1.8 m step in the
// ground with a road, a kerb line and a fence offset across it.
//
// That geography is the course. Same magnitude, same distance from the source,
// two different disasters — which is site effect, and it is the single idea a
// student takes out of this subject. The map argues it before any card does.
//
// Looking down, -Z is north, up toward the range and the fault:
//
//        ▲▲▲  the range front, and the fault at its foot     z = -230
//        [ Seismic Network — the vault on rock ]             z = -150
//   ╲ ╲ ╲  the surface rupture, crossing on a diagonal  ╲ ╲ ╲
//        [ Structural Assessment ]  [ Geotechnical ]         z =  -70
//                 UPPER TOWN, on the bench                   z =  -40
//   ═══════════════ the scarp, and the step down ═══════════════  z = -20
//                 THE FLATS, on fill                         z =   30
//        [ Incident Base — the hub ]                         z =  30
//                     ¤ spawn ¤                              z =  56
//        [ Materials & Testing ]  [ Hazard & Forecasting ]   z =  90
//        [ Public Safety ]        the port, the wharf        z = 150
//
// Load-bearing rather than decorative:
//
//   · The spawn at (0, 56) is in the middle of the base-camp car park with ten
//     clear metres round it. A prop over the spawn welds the player in place.
//   · Every `group` is a group id in content/groups.js. A group with no building
//     is a call nobody can reach and only `worldParity` notices.
//   · The scarp is a *terrain* feature, not a prop, so `groundHeight` knows about
//     it — one source of truth for the ground, which this repo has shipped broken
//     twice. It comes from the `range` profile: high to the north, low to the
//     south, with the break between them.

import { ranges, opening, N, S, E, W, NW } from '../../engine/world/horizonShape.js';

const PI = Math.PI;

/** One building per area of study, placed on the side of the fault it belongs to. */
const AREA_BUILDINGS = [
  // On rock, above the scarp.
  { id: 'SEIS', group: 'SEIS', name: 'Seismic Network',
    sub: 'The vault, on bedrock', x: -26, z: -150, w: 18, d: 13, h: 5.4, facing: PI, colour: 0x8d949a },
  { id: 'STRUCT', group: 'STRUCT', name: 'Structural Assessment',
    sub: 'Placards and the queue for them', x: -52, z: -70, w: 26, d: 15, h: 7.4, facing: 0, colour: 0xa4998a },
  { id: 'GEO', group: 'GEO', name: 'Geotechnical',
    sub: 'What the ground did', x: 44, z: -70, w: 22, d: 14, h: 6.6, facing: 0, colour: 0x93a08e },

  // The hub, on the boundary itself — the one building with a foot on each side.
  // Off the spine deliberately. It sat dead centre and filled the opening shot
  // with the broad side of a shed; from here the street runs unobstructed to the
  // scarp, the hospital and the range behind them.
  { id: 'HAZ', group: 'HAZ', name: 'Incident Base',
    sub: 'Where the day is argued', x: -40, z: 34, w: 32, d: 17, h: 7.8, facing: Math.PI / 2, colour: 0x8b94a0, accent: 0xc0392b },

  // On fill, below it.
  { id: 'MAT', group: 'MAT', name: 'Materials & Testing',
    sub: 'Cores, coupons and the press', x: -50, z: 90, w: 24, d: 15, h: 6.8, facing: PI, colour: 0xa197ab },
  { id: 'SAFE', group: 'SAFE', name: 'Public Safety',
    sub: 'Cordons, and who is told what', x: 46, z: 92, w: 22, d: 14, h: 6.4, facing: PI, colour: 0xaea089 },
];

/**
 * Places with no lesson attached. Every one of them is a piece of evidence: the
 * hospital is the decision the campaign turns on, the school is the building
 * everybody assumes is fine, and the two blocks are the same building on
 * different ground.
 */
const LANDMARKS = [
  { id: 'HOSP', name: 'Kestrel Bay Hospital', sub: 'Yellow placard, and 90 beds inside',
    x: -6, z: -18, w: 40, d: 20, h: 13.5, facing: 0, colour: 0xb8b0a2, accent: 0xd8a02a },
  { id: 'SCHOOL', name: 'Bay Road School', sub: 'Green placard, and nobody has looked at the gym',
    x: 74, z: 34, w: 26, d: 14, h: 6.2, facing: PI / 2, colour: 0xa9a897 },
  // Marina Court is built in props.js instead: it leans, and a site building
  // cannot — kit.box rotates about Y only, so anything out of plumb has to be
  // a group with a z-rotation.
  { id: 'CLOCK', name: 'Post Office Clock', sub: 'The top third is in the yard, and the clock stopped at 04:12',
    x: -30, z: -104, w: 12, d: 12, h: 15.0, facing: PI / 2, colour: 0xa89a83 },
  { id: 'PARADE', name: 'Parade Buildings', sub: 'Unreinforced masonry, parapets in the street',
    x: -74, z: -34, w: 30, d: 12, h: 8.4, facing: PI / 2, colour: 0xb0a08a },
  { id: 'DEPOT', name: 'Port Gate', sub: 'The wharf moved two metres seaward',
    x: 8, z: 160, w: 18, d: 12, h: 5.8, facing: PI, colour: 0x9a9078, accent: 0xb0762a },
];

export const site = {
  kind: 'outdoor',
  name: 'Kestrel Bay',

  // `range`: high ground north, falling to the delta. The profile does the work
  // the story needs — the bench, the step, and the flats — so the ground itself
  // is the first thing that tells you which half of the town you are in.
  terrain: {
    size: 800, segments: 320, playerLimit: 108,
    // `range` with the summits north: the town sits in the basin at the foot of
    // them. Relief is well below 1 because this profile's ridge noise is scaled
    // for a mountainside, and at full strength it puts four-metre humps down
    // the middle of a high street.
    profile: 'range', relief: 0.22, basin: 0,
    summits: [
      { x: -120, z: -430, r: 340, height: 150, sharp: true },
      { x: 130, z: -470, r: 300, height: 120, sharp: true },
      { x: 10, z: -300, r: 220, height: 46 },
    ],
    // The rupture. It comes ashore in the west, crosses Kestrel Street between
    // the hospital and the base, and runs out toward the range front — 1.8 m of
    // vertical throw, made over six metres of ground, with Upper Town standing
    // on the high side.
    scarp: { x0: -400, z0: 40, x1: 400, z1: -110, throw: 1.8, width: 6.5 },
    // Dust. Three days of it on everything, so the ground reads paler and
    // greyer than a normal soil — still written darker than it looks, because a
    // mid albedo under a bright sky IBL renders close to white.
    ground: { base: [88, 82, 72], spread: [34, 32, 28], repeat: 15, normalRepeat: 150 },
  },

  // Dust in the air is why this looks like nowhere else in the set: high
  // turbidity kills the blue and leaves a bleached, flat sky, which is exactly
  // what a city looks like three days after.
  atmosphere: { turbidity: 6.2, rayleigh: 1.7, mie: 0.009, mieG: 0.74, scale: 850, stars: 700 },

  // The bay, south past the port. Water needs a bed cut or the terrain sits on
  // top of it — THEME_CONTRACT rule 4, learned on Riverton's invisible river.
  water: { cx: 0, cz: 300, width: 900, depth: 200, level: -2.4, bed: 3.0, shore: 26 },

  paths: [
    { cx: 0, cz: 40, w: 260, d: 12, worn: 8 },     // Bay Road, the length of the Flats
    { cx: 0, cz: -20, w: 12, d: 210, worn: 7 },    // Kestrel Street, climbing to the vault
    { cx: -52, cz: -60, w: 9, d: 70, worn: 5 },    // the assessment yard
    { cx: 10, cz: 130, w: 9, d: 90, worn: 6 },     // down to the port gate
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: -22, z: 46, facing: PI / 2, title: 'Placard Board' },

  furniture: [
    { kind: 'bench', x: -10, z: 46, facing: PI / 2 },
    { kind: 'bench', x: -10, z: 66, facing: PI / 2 },
    { kind: 'bin', x: 9, z: 44 },
    { kind: 'post', x: 7, z: 20, height: 3.2, r: 0.12 },
    { kind: 'post', x: -7, z: 20, height: 3.2, r: 0.12 },
    { kind: 'post', x: 7, z: 78, height: 3.2, r: 0.12 },
    { kind: 'post', x: -7, z: 78, height: 3.2, r: 0.12 },
  ],

  scrubCount: 200,
  scrubColour: 0x6a6a4c,
  scrubBand: [40, 260],

  // The range front to the north, and the fault runs along its foot. Open to
  // the south, because that is the bay. This is the geography the whole course
  // is about, so the skyline says it before anybody explains it.
  horizon: [
    { radius: 520, height: 78, colour: 0x4f5348, haze: 0.38,
      amp: ranges([{ at: N, width: 2.3, hi: 1.15 }, { at: NW, width: 1.4, hi: 1.0 }], 0.06) },
    { radius: 760, height: 128, colour: 0x5d6259, haze: 0.60,
      amp: ranges([{ at: N, width: 2.0, hi: 1.2 }], 0.04) },
    // Nothing across the water. The bay is the one direction with no hills.
    { radius: 980, height: 40, colour: 0x6b727a, haze: 0.75,
      amp: opening(S, 2.0, { deep: 0.02, hi: 0.7 }) },
  ],

  // In the base-camp car park, facing north up Kestrel Street toward the scarp,
  // the hospital and the range behind them. yaw 0 is -Z, the camera's default.
  spawn: { x: 0, z: 56, yaw: 0 },
};

export default site;
