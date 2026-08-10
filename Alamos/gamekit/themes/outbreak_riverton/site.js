// site.js — Riverton during the outbreak, as data.
//
// The book names forty hospital rooms and laboratories but never says what kind
// of place they sit in. This is a mid-sized river city with its medical campus
// on one side of a boulevard and its public-health and field services on the
// other — close enough to walk between in a working day, far enough apart that
// choosing an order matters.
//
// Looking down, -Z is north, toward the river and the field stations:
//
//        ~~~~~~~~~~~~~~~ RIVER ~~~~~~~~~~~~~~~          z = -118
//     [ One Health Field Station ]                      z = -60
//                [ City Health Command ]                z = -44
//   [ Immunology & Treatment ]   [ Molecular Diagnostics ]  z = -20
//        ------------- campus boulevard ------------    z =   0
//   [ Clinical Physiology  ]     [ Cell & Membrane Lab ]    z =  20
//              [ Epidemiology Operations ]              z =  50
//                     ¤ spawn ¤                         z =  64
//        ------------- transit plaza ---------------    z =  78
//
// Two things here are load-bearing rather than decorative: the spawn at (0, 64)
// has nothing within ten metres of it — a prop over the spawn welds the player
// in place — and every `group` below must exist in content/groups.js or that
// area's calls are unreachable.

const PI = Math.PI;

/** One per area of study. Ids match content/groups.js. */
const AREA_BUILDINGS = [
  { id: 'CLIN', group: 'CLIN', name: 'Riverton General — Clinical Wing',
    x: -52, z: 20, w: 30, d: 18, h: 9.6, facing: 0, colour: 0x9aa3a8 },
  { id: 'CELL', group: 'CELL', name: 'Cell & Membrane Biology Building',
    x: 52, z: 20, w: 24, d: 15, h: 7.6, facing: 0, colour: 0x93a29c },
  { id: 'IMM', group: 'IMM', name: 'Immunology & Treatment Centre',
    x: -50, z: -20, w: 26, d: 16, h: 8.2, facing: 0, colour: 0xa197ab },
  { id: 'MOL', group: 'MOL', name: 'Molecular Diagnostics Laboratory',
    x: 52, z: -20, w: 26, d: 16, h: 8.0, facing: 0, colour: 0x8f9aa2 },
  { id: 'POP', group: 'POP', name: 'Epidemiology Operations Room',
    x: 0, z: 50, w: 28, d: 16, h: 7.4, facing: PI, colour: 0xaea089 },
  { id: 'FIELD', group: 'FIELD', name: 'One Health Field Station',
    x: -34, z: -60, w: 22, d: 14, h: 6.6, facing: 0, colour: 0x8d9b7f },
];

/** Places that carry the story and the wayfinding rather than a lesson. */
const LANDMARKS = [
  { id: 'CMD', name: 'City Health Command', sub: 'Incident command · Riverton',
    x: 30, z: -44, w: 22, d: 14, h: 8.4, facing: 0, colour: 0x8b94a0, accent: 0x1f3b4d },
  { id: 'TRANSIT', name: 'Transit and Mobility Centre', sub: 'Where the city moves',
    x: -62, z: 78, w: 20, d: 13, h: 6.4, facing: PI, colour: 0xa79f90 },
  { id: 'BRIEF', name: 'Public Briefing Room', sub: 'What the city is told',
    x: 62, z: 78, w: 20, d: 13, h: 6.4, facing: PI, colour: 0xa79f90 },
  { id: 'WASTE', name: 'Wastewater Treatment Plant', sub: 'Surveillance upstream of the hospital',
    x: 66, z: -62, w: 26, d: 16, h: 7.0, facing: 0, colour: 0x8fa0a4 },
];

export const site = {
  kind: 'outdoor',
  name: 'Riverton',

  terrain: {
    size: 780, segments: 300, playerLimit: 118,
    profile: 'flat', relief: 0.7,
    // Darker and more saturated than looks right written down: under a bright
    // sky IBL with ACES a mid albedo renders close to white.
    ground: { base: [74, 76, 66], spread: [38, 40, 32], repeat: 14, normalRepeat: 150 },
  },

  atmosphere: { turbidity: 3.2, rayleigh: 2.6, mie: 0.004, mieG: 0.78, scale: 850, stars: 900 },

  water: { cx: 0, cz: -118, width: 440, depth: 92, level: -0.8 },

  paths: [
    { cx: 0, cz: 0,   w: 240, d: 11, worn: 6 },    // campus boulevard
    { cx: 0, cz: -44, w: 200, d: 9,  worn: 5 },    // command row
    { cx: 0, cz: 30,  w: 10,  d: 150, worn: 6 },   // the walk, north-south
    { cx: 0, cz: 78,  w: 220, d: 9,  worn: 5 },    // transit plaza
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 10, z: 58, facing: PI, title: 'Outbreak Status' },

  // Kept off the walk (|x| < 5) so nothing narrows the main route.
  furniture: [
    { kind: 'bench', x: -9, z: 40, facing: PI / 2 },
    { kind: 'bench', x: -9, z: 12, facing: PI / 2 },
    { kind: 'bench', x: 9, z: 68, facing: -PI / 2 },
    { kind: 'bin', x: 8, z: 36 },
    { kind: 'bin', x: -8, z: 70 },
    { kind: 'post', x: 6, z: 6, height: 3.4, r: 0.11 },
    { kind: 'post', x: -6, z: 6, height: 3.4, r: 0.11 },
    { kind: 'post', x: 6, z: 74, height: 3.4, r: 0.11 },
    { kind: 'post', x: -6, z: 74, height: 3.4, r: 0.11 },
  ],

  scrubCount: 300,
  scrubColour: 0x5c6b46,
  scrubBand: [30, 250],

  horizon: [
    { radius: 520, height: 40, colour: 0x4c5b63, haze: 0.42 },
    { radius: 690, height: 66, colour: 0x5d6b74, haze: 0.62 },
  ],

  // On the walk, ten metres clear of everything, facing north up the campus
  // toward the hospital. yaw 0 is -Z, the camera's default direction.
  spawn: { x: 0, z: 64, yaw: 0 },
};

export default site;
