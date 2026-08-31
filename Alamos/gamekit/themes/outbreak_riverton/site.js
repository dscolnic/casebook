import { ranges, opening, N, S, E, W } from '../../engine/world/horizonShape.js';
// site.js — Riverton General under an outbreak, as data.
//
// Deliberately NOT a city. The Contaminated City is a river town with wide
// streets and buildings spaced apart; this is the same river, twelve blocks
// away, and it is a hospital campus that has been improvised on top of for
// three weeks. The difference the player should feel in the first ten seconds:
//
//   · you move through COURTYARDS, not streets — buildings are pushed close
//     enough that the gaps between them are rooms with sky, and the sight lines
//     are short everywhere except one;
//   · the campus is FULL. Triage marquees in the courtyards, container labs in
//     the car park, crate stacks against every wall, floodlight masts because
//     the response does not stop at night;
//   · there is exactly one long view, north out of the gate to the field
//     station on the flood plain, and it is the one call that takes real time
//     to reach.
//
// Looking down, -Z is north toward the river:
//
//              [ One Health Field Station ]              z = -190   ← the hike
//        · · · · · · perimeter fence · · · · · ·         z =  -70
//   [ Immunology ]  ¤ north court ¤  [ Molecular Dx ]    z =  -44
//        [ Epidemiology Operations · the hub ]           z =  -12
//   [ Clinical Wing ]  ¤ south court ¤  [ Cell Biology ] z =   22
//                    ¤ spawn ¤                           z =   44
//        [ Ambulance ramp ]   [ Container labs ]         z =   62
//
// Every `group` must exist in content/groups.js. The spawn has ten clear metres
// around it — a prop over the spawn welds the player in place and the scene
// still renders perfectly.

const PI = Math.PI;

/**
 * One per area of study, packed tight. Four of them face each other across two
 * courtyards; the operations room sits between the courts because everything
 * routes through it; the field station is 190 m north, outside the fence.
 */
const AREA_BUILDINGS = [
  { id: 'IMM', group: 'IMM', name: 'Immunology & Treatment',
    x: -28, z: -44, w: 26, d: 15, h: 8.4, facing: 0, colour: 0x9e9a90 },
  { id: 'MOL', group: 'MOL', name: 'Molecular Diagnostics',
    x: 28, z: -44, w: 26, d: 15, h: 8.4, facing: 0, colour: 0x99a0a6 },
  { id: 'POP', group: 'POP', name: 'Epidemiology Operations',
    x: 0, z: -12, w: 34, d: 13, h: 6.6, facing: 0, colour: 0xa8a08c, accent: 0x1f5c4d },
  { id: 'CLIN', group: 'CLIN', name: 'Riverton General — Clinical Wing',
    x: -30, z: 22, w: 30, d: 17, h: 10.5, facing: PI, colour: 0xa6a49c },
  { id: 'CELL', group: 'CELL', name: 'Cell & Membrane Biology',
    x: 30, z: 22, w: 26, d: 15, h: 8.0, facing: PI, colour: 0x93a29c },
  // The one that is not on the campus at all.
  { id: 'FIELD', group: 'FIELD', name: 'One Health Field Station',
    x: -14, z: -190, w: 20, d: 13, h: 5.6, facing: 0, colour: 0x8d9b7f },
];

const LANDMARKS = [
  // `enter:` — no `group`, so this is not an area, but two authored stops
  // (day 14's TRIGGER and day 15's SEQUENCE) are both about what happens
  // inside it, which clears the two-stop bar. See ./minors.js.
  { id: 'CMD', enter: 'CMD', name: 'City Health Command', sub: 'Incident command · Riverton',
    x: 62, z: -12, w: 18, d: 12, h: 7.0, facing: -PI / 2, colour: 0x8b94a0, accent: 0x1f3b4d },
  { id: 'BRIEF', name: 'Public Briefing Room', sub: 'What the city is told',
    x: -62, z: -12, w: 18, d: 12, h: 6.4, facing: PI / 2, colour: 0xa79f90 },
  { id: 'TRANSIT', name: 'Transit & Mobility Centre', sub: 'Where the city moves',
    x: 58, z: 62, w: 20, d: 12, h: 6.0, facing: PI, colour: 0xa79f90 },
  { id: 'WASTE', name: 'Wastewater Sampling Station', sub: 'The city, before it sees a doctor',
    x: 56, z: -120, w: 18, d: 12, h: 6.2, facing: 0, colour: 0x8fa0a4 },
];

export const site = {
  kind: 'outdoor',
  name: 'Riverton General',

  terrain: {
    size: 780, segments: 300, playerLimit: 210,
    profile: 'flat', relief: 0.5,
    // Tarmac and hardstanding rather than ground: this is a paved campus, so
    // the surface is grey-brown and nearly uniform.
    ground: { base: [66, 64, 60], spread: [26, 25, 23], repeat: 18, normalRepeat: 170 },
  },

  atmosphere: { turbidity: 4.2, rayleigh: 2.8, mie: 0.005, mieG: 0.76, scale: 850, stars: 700 },

  // The river is a long way north, past the field station, and mostly out of
  // sight — this game is not about the river, it is about the campus.
  water: { cx: 0, cz: -300, width: 520, depth: 120, level: -1.0 },

  paths: [
    { cx: 0, cz: 34, w: 120, d: 8, worn: 7 },      // the ambulance apron
    { cx: 0, cz: 5, w: 8, d: 90, worn: 7 },        // the spine between courts
    { cx: 0, cz: -60, w: 100, d: 7, worn: 5 },     // north court walk
    { cx: -14, cz: -130, w: 8, d: 130, worn: 4 },  // the track out to the field station
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 12, z: 36, facing: PI, title: 'Outbreak Status' },

  // Dense. A campus in its third week of an emergency is not tidy, and the
  // clutter is what makes the courtyards read as rooms.
  furniture: [
    { kind: 'bench', x: -10, z: 8, facing: PI / 2 },
    { kind: 'bench', x: 10, z: 8, facing: -PI / 2 },
    { kind: 'bench', x: -10, z: -34, facing: PI / 2 },
    { kind: 'bin', x: 9, z: 30 },
    { kind: 'bin', x: -9, z: -28 },
    { kind: 'bin', x: 13, z: -56 },
    { kind: 'post', x: 6, z: 40, height: 3.0, r: 0.1 },
    { kind: 'post', x: -6, z: 40, height: 3.0, r: 0.1 },
    { kind: 'post', x: 6, z: -66, height: 3.0, r: 0.1 },
    { kind: 'post', x: -6, z: -66, height: 3.0, r: 0.1 },
  ],

  // Where the anonymous crowd stands, over and above the paths the engine
  // works out for itself. A response is people, and on a campus they are not on
  // the roads — they are queueing at a triage tent, waiting to be swabbed,
  // doffing at the end of the decon tunnel, or standing at the gate being
  // screened. `weight` asks for more than one at a spot; the crowd jitters each
  // by a few metres and nudges anybody who lands in a wall.
  //
  // Nothing within ten metres of the spawn at (0, 44): a person placed over the
  // spawn welds the player in place.
  crowdSpots: [
    { x: -11.5, z: 24, weight: 4 },   // red triage, walking wounded side
    { x: 11.5, z: 24, weight: 4 },    // yellow triage
    { x: 22, z: 6, weight: 3 },       // green tent, east of the spine
    { x: 0, z: 17, weight: 2 },       // the queue into the decon tunnel
    { x: 0, z: -1, weight: 2 },       // doffing, at the far end of it
    { x: -17, z: -54, weight: 4 },    // the swab line, north court
    { x: 17, z: -54, weight: 4 },
    { x: 26, z: 50, weight: 2 },      // container labs
    { x: -24, z: 38, weight: 2 },     // the ambulance apron, both bays
    { x: 24, z: 36, weight: 2 },
    { x: -30, z: 11, weight: 2 },     // clinical wing doors
    { x: 30, z: 11, weight: 2 },      // cell biology doors
    { x: 0, z: -4, weight: 2 },       // operations
    { x: -28, z: -36, weight: 2 },    // immunology
    { x: 28, z: -36, weight: 2 },     // molecular diagnostics
    { x: 0, z: -66, weight: 2 },      // gate screening, inside
    { x: 6, z: -80, weight: 2 },      // outside the gate: press, relatives
    { x: -14, z: -120, weight: 1 },   // the long track north
  ],

  // Almost none on the campus; it starts once you are through the gate and on
  // the track to the field station.
  scrubCount: 240,
  scrubColour: 0x53603c,
  scrubBand: [110, 300],

  // A hospital campus is inside a town, and this one has been standing in open
  // country with hills all round it — which quietly removed the population the
  // whole outbreak is about. The town presses against the fence to the south,
  // low and close; the floodplain and the river are north, past the field
  // station, and the ground opens out that way.
  horizon: [
    { radius: 480, height: 34, colour: 0x51606a, haze: 0.45,
      amp: ranges([{ at: S, width: 2.4, hi: 1.0 }, { at: E, width: 1.0, hi: 0.62 }], 0.12) },
    { radius: 660, height: 56, colour: 0x62707a, haze: 0.66,
      amp: opening(N, 1.5, { deep: 0.08, hi: 0.9 }) },
  ],

  // In the middle of the south court, facing north up the spine at the
  // operations room. yaw 0 is -Z.
  spawn: { x: 0, z: 44, yaw: 0 },
};

export default site;
