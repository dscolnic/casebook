import { ranges, opening, N, S, E, W } from '../../engine/world/horizonShape.js';
// site.js — Riverton, as data.
//
// The design book names forty-five locations but never says what kind of place
// this is. It is a working river city: a freight yard on the high side, the
// drinking-water intake and the laboratories along a cross street, and the
// river itself across the north edge, behind a bank the player cannot walk off.
//
// Layout, looking down (-Z is north, toward the river):
//
//        ~~~~~~~~~~~~~~ RIVER ~~~~~~~~~~~~~~          z = -112
//        ============ river bank ==========           z = -66
//        ------------ riverfront road -----           z = -52
//                   [ City Command ]                  z = -40
//     [ Water Intake ]                [ Air & Plume ]  z = -34
//        ------------ cross street --------           z = -16
//     [ Molecular ID ]                [ Quant / QA  ]  z =   4
//   [Records]        | avenue |          [Briefing]    z =  26
//                    ¤ spawn ¤                         z =  36
//        ------------ yard road -----------           z =  58
//     [ Reactions   ]                [ Treatment   ]   z =  76
//                  [ Freight Yard ]                    z =  92
//
// Two things here are load-bearing rather than decorative:
//
//   · The spawn point at (0, 36) sits on the avenue with nothing within ten
//     metres. A prop dropped over the spawn welds the player in place — the
//     scene renders perfectly and W does nothing.
//   · Every building's footprint becomes a graded pad inside groundHeight().
//     outdoorTown registers them before the first height query, so the visible
//     ground and the height function cannot disagree.

const PI = Math.PI;

/** The six areas of study, in the order a player meets them. */
const AREA_BUILDINGS = [
  { id: 'WATER', group: 'WATER', name: 'Water Intake Laboratory',
    x: -48, z: -34, w: 22, d: 14, h: 7.0, facing: 0, colour: 0x93a29c },
  { id: 'GASES', group: 'GASES', name: 'Air & Plume Station',
    x: 46, z: -34, w: 20, d: 13, h: 6.4, facing: 0, colour: 0x99a3ad },
  { id: 'IDENT', group: 'IDENT', name: 'Molecular Identification Lab',
    x: -54, z: 4, w: 24, d: 15, h: 7.4, facing: 0, colour: 0xa197ab },
  { id: 'QUANT', group: 'QUANT', name: 'Quantitative Analysis & QA',
    x: 54, z: 4, w: 22, d: 14, h: 7.0, facing: 0, colour: 0xaea089 },
  { id: 'ENERGY', group: 'ENERGY', name: 'Reaction & Thermal Hall',
    x: -42, z: 76, w: 26, d: 16, h: 8.4, facing: PI, colour: 0xa89388 },
  { id: 'TREAT', group: 'TREAT', name: 'Pilot Treatment Plant',
    x: 44, z: 76, w: 28, d: 18, h: 8.8, facing: PI, colour: 0x8f9aa2 },
];

/** Places with no lesson attached. They carry the story and the wayfinding. */
const LANDMARKS = [
  { id: 'CMD', name: 'City Command', sub: 'Incident command · Riverton',
    x: 0, z: -40, w: 20, d: 13, h: 7.6, facing: 0, colour: 0x8b94a0, accent: 0x2c3e50 },
  { id: 'RECORDS', name: 'Records & Shipping Office', sub: 'Manifests · chain of custody',
    x: -86, z: 26, w: 18, d: 12, h: 6.2, facing: 0, colour: 0xa79f90 },
  { id: 'BRIEF', name: 'Public Briefing Center', sub: 'What the city is told',
    x: 86, z: 26, w: 18, d: 12, h: 6.2, facing: 0, colour: 0xa79f90 },
  { id: 'YARD', name: 'Freight Yard Gatehouse', sub: 'Where it started',
    x: 0, z: 92, w: 16, d: 11, h: 5.6, facing: PI, colour: 0x9a9078, accent: 0xb3462f },
];

export const site = {
  kind: 'outdoor',
  name: 'Riverton',

  // A river floodplain: flat, not a mesa. `relief` keeps a little undulation so
  // the ground is not a billiard table, and the pads flatten it under buildings.
  terrain: {
    size: 760, segments: 300, playerLimit: 105,
    profile: 'flat', relief: 0.8,
    // Kept a stop darker and more saturated than it looks written down. Under a
    // strong sun with ACES tone mapping a pale albedo blows straight out to
    // white — the first pass at these values rendered Riverton as a salt flat.
    ground: { base: [78, 74, 64], spread: [42, 40, 34], repeat: 14, normalRepeat: 150 },
  },

  // River-valley air: hazier and less blue than a high desert, which is what
  // the outdoor site was originally tuned for.
  atmosphere: { turbidity: 3.4, rayleigh: 2.5, mie: 0.004, mieG: 0.78, scale: 850, stars: 900 },

  water: { cx: 0, cz: -112, width: 420, depth: 90, level: -0.8 },

  paths: [
    { cx: 0, cz: -52, w: 280, d: 10, worn: 6 },   // riverfront road
    { cx: 0, cz: -16, w: 200, d: 9,  worn: 5 },   // cross street, the lab row
    { cx: 0, cz: 26,  w: 10,  d: 112, worn: 6 },  // the avenue, north-south
    { cx: 0, cz: 58,  w: 200, d: 9,  worn: 5 },   // yard road
  ],

  buildings: [...AREA_BUILDINGS, ...LANDMARKS],

  board: { x: 9, z: 30, facing: PI, title: 'Response Status' },

  // Kept off the avenue (|x| < 5) so nothing narrows the main route.
  furniture: [
    { kind: 'bench', x: -8, z: 22, facing: PI / 2 },
    { kind: 'bench', x: -8, z: 40, facing: PI / 2 },
    { kind: 'bin', x: 7, z: 20 },
    { kind: 'bin', x: -7, z: 46 },
    { kind: 'post', x: 6, z: -12, height: 3.2, r: 0.11 },
    { kind: 'post', x: -6, z: -12, height: 3.2, r: 0.11 },
    { kind: 'post', x: 6, z: 54, height: 3.2, r: 0.11 },
    { kind: 'post', x: -6, z: 54, height: 3.2, r: 0.11 },
  ],

  scrubCount: 340,
  scrubColour: 0x5f6b45,
  scrubBand: [26, 250],

  // The river runs east-west across the north of the map and the contamination
  // cannot leave the valley — which is half the argument of the questions, and
  // was invisible while the city sat in an even ring of hills. Bluffs rise on
  // the far bank, the valley closes to the west, and the east is open, because
  // that is downstream and downstream is where the intake is.
  horizon: [
    { radius: 520, height: 44, colour: 0x4a5b66, haze: 0.42,
      amp: ranges([{ at: N, width: 2.1, hi: 1.2 }, { at: W, width: 1.2, hi: 0.8 }], 0.10) },
    { radius: 680, height: 70, colour: 0x5c6b76, haze: 0.62,
      amp: opening(E, 1.3, { deep: 0.05, hi: 1 }) },
  ],

  // On the avenue, ten metres clear of everything, facing north up the street
  // toward City Command. yaw 0 is -Z: the camera's default direction, so this
  // looks up the street rather than back at the freight yard.
  spawn: { x: 0, z: 36, yaw: 0 },
};

export default site;
