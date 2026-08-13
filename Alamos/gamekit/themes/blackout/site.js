// site.js — the Calder control centre and the plant around it, as data.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. The place has to read as a working power system in the first ten
// seconds, and what makes it one is the switchyard: a low sprawl of steel with
// transmission towers walking off the map in two directions. Nothing else in the
// seven games looks anything like it.
//
// Looking down, -Z is north, out along the transmission corridor:
//
//        ▲ ▲ ▲  towers marching north, out of the map        z = -150
//        ==========  switchyard  ==========                  z = -96
//   [ Transmission & Protection ]                            z = -62
//         [ Generation Hall ]      ‖ cooling tower ‖         z = -30
//   [ Metering & Standards ]   [ Load & Forecasting ]        z =   6
//        [ SYSTEM OPERATIONS — the hub ]                     z =  34
//                     ¤ spawn ¤                              z =  56
//             [ Distribution Depot ]                         z =  84
//
// Load-bearing rather than decorative:
//
//   · The spawn at (0, 56) is on the apron with nothing inside ten metres. A prop
//     over the spawn welds the player in place; the scene still renders perfectly.
//   · Every `group` below is a group id in content/groups.js. A group with no
//     building is a call the player cannot reach, and `worldParity` is the only
//     thing that notices.
//   · Operations sits between the spawn and everything else on purpose. It is the
//     area that holds the whole system, and the route to every other call passes
//     its door.

const PI = Math.PI;

/** One building per area of study. */
const AREA_BUILDINGS = [
  { id: 'OPS', group: 'OPS', name: 'System Operations',
    x: 0, z: 34, w: 30, d: 16, h: 8.2, facing: 0, colour: 0x8b94a0, accent: 0xc0392b },
  { id: 'GEN', group: 'GEN', name: 'Generation Hall',
    x: -34, z: -30, w: 34, d: 20, h: 12.5, facing: 0, colour: 0x9aa0a4 },
  { id: 'TRANS', group: 'TRANS', name: 'Transmission & Protection',
    x: -22, z: -62, w: 22, d: 14, h: 7.0, facing: 0, colour: 0x93a29c },
  { id: 'DIST', group: 'DIST', name: 'Distribution Depot',
    x: 6, z: 84, w: 28, d: 17, h: 7.6, facing: PI, colour: 0x8f9a86 },
  { id: 'LOAD', group: 'LOAD', name: 'Load & Forecasting',
    x: 44, z: 6, w: 20, d: 13, h: 6.8, facing: 0, colour: 0xa197ab },
  { id: 'METER', group: 'METER', name: 'Metering & Standards',
    x: -50, z: 6, w: 20, d: 13, h: 6.4, facing: 0, colour: 0xaea089 },
];

/** Places with no lesson attached. They carry the story and the wayfinding. */
const LANDMARKS = [
  { id: 'GATE', name: 'Site Gatehouse', sub: 'Badge and permit-to-work',
    x: 0, z: 100, w: 8, d: 7, h: 4.2, facing: PI, colour: 0x9a9078, accent: 0xb0762a },
  { id: 'STORE', name: 'Spares & Cable Store', sub: 'Where a restoration is actually limited',
    x: 40, z: 84, w: 16, d: 12, h: 6.0, facing: PI, colour: 0xa79f90 },
  { id: 'TRAINING', name: 'Operator Training Room', sub: 'The simulator, and last year’s event replayed',
    x: 46, z: 34, w: 16, d: 12, h: 6.2, facing: 0, colour: 0xa79f90 },
];

export const site = {
  kind: 'outdoor',
  name: 'Calder Switching Station',

  // A river-plain industrial site: flat, graded, and deliberately dull ground,
  // because everything interesting here is steel and stands up.
  terrain: {
    size: 760, segments: 300, playerLimit: 105,
    profile: 'flat', relief: 0.7,
    // Kept darker and more saturated than it looks written down: under a bright
    // sky IBL with ACES a mid albedo renders close to white.
    ground: { base: [74, 72, 66], spread: [38, 36, 32], repeat: 14, normalRepeat: 150 },
  },

  atmosphere: { turbidity: 3.0, rayleigh: 2.6, mie: 0.004, mieG: 0.78, scale: 850, stars: 900 },

  paths: [
    { cx: 0, cz: 56, w: 220, d: 11, worn: 7 },    // the apron, east-west
    { cx: 0, cz: 10, w: 11, d: 150, worn: 6 },    // the spine, north to the yard
    { cx: -34, cz: -6, w: 9, d: 60, worn: 5 },    // generation access
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 10, z: 50, facing: PI, title: 'System Status' },

  // Kept off the spine (|x| < 6) so nothing narrows the main route.
  furniture: [
    { kind: 'bench', x: -9, z: 46, facing: PI / 2 },
    { kind: 'bench', x: -9, z: 64, facing: PI / 2 },
    { kind: 'bin', x: 8, z: 44 },
    { kind: 'bin', x: -8, z: 70 },
    { kind: 'post', x: 7, z: 24, height: 3.4, r: 0.12 },
    { kind: 'post', x: -7, z: 24, height: 3.4, r: 0.12 },
    { kind: 'post', x: 7, z: 76, height: 3.4, r: 0.12 },
    { kind: 'post', x: -7, z: 76, height: 3.4, r: 0.12 },
  ],

  scrubCount: 260,
  scrubColour: 0x5e6a48,
  scrubBand: [30, 250],

  horizon: [
    { radius: 520, height: 40, colour: 0x4d5a63, haze: 0.44 },
    { radius: 680, height: 64, colour: 0x5d6a74, haze: 0.62 },
  ],

  // On the apron, ten clear metres all round, facing north up the spine toward
  // Operations and the yard beyond it. yaw 0 is -Z, the camera's default.
  spawn: { x: 0, z: 56, yaw: 0 },
};

export default site;
