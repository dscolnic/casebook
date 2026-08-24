// site.js — the monastery garden, as data. Outdoor.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. Outdoors because the experiment is a garden: two hundred and fifty
// trial beds, bagged flowers, and a season between one question and its answer.
// The scale of it is the argument — nobody infers a three-to-one ratio from a
// windowsill — and none of that survives being moved into a corridor.
//
// Looking down, -Z is away from the player at spawn:
//
//        [ Seed Store ]                                z = -84
//                        [ Counting Room ]             z = -46
//   [ Glasshouse ]           [ Plot Shelter ]          z = -11
//                    ¤ spawn ¤                         z =  36
//
// Two things here are load-bearing rather than decorative:
//
//   · The glasshouse and the plot shelter are either side of the beds and the
//     counting room and seed store are a long way down the walk. That is the
//     campaign's own chronology as geometry: level one is a cross, level two is a
//     tally, and the walk between them is a season.
//   · The spawn at (0, 36) has nothing within ten metres of it. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.

const PI = Math.PI;

export const site = {
  kind: 'outdoor',
  name: 'The Abbey Garden',

  terrain: {
    // A walled garden on level ground. Relief here would be a slope across the
    // trial beds, which is the one thing a comparison of plots must not have —
    // and `profile: 'hill'` puts its mound at the origin, which is where the
    // player is standing.
    size: 900, segments: 320, playerLimit: 135,
    profile: 'flat', relief: 0.9,
    ground: { base: [72, 66, 48], spread: [22, 20, 14], repeat: 15, normalRepeat: 160 },
  },

  // Continental summer: high, bright and clear, which is what a growing season
  // in Moravia looks like and is the opposite of the smoky river town next door
  // in this set.
  atmosphere: { turbidity: 2.4, rayleigh: 2.0, mie: 0.003, mieG: 0.8, scale: 880, stars: 900 },

  paths: [
    { cx: 0, cz: 12, w: 6, d: 58, worn: 6 },
    { cx: -6, cz: -52, w: 5, d: 88, worn: 4 },
    { cx: 0, cz: -12, w: 42, d: 5, worn: 6 },
  ],

  buildings: [
    { id: 'GLASS', group: 'GLASS', name: 'Glasshouse', sub: 'Where a flower is opened and bagged',
      x: -24, z: -12, w: 16, d: 9, h: 4.2, facing: 0, colour: 0xb9bdb0,
      roof: 'gable', siding: 'panel', base: 0.4, stoop: true },
    { id: 'PLOT', group: 'PLOT', name: 'Plot Shelter', sub: 'The bed book, and a bench out of the sun',
      x: 14, z: -11, w: 10, d: 7, h: 3.4, facing: 0, colour: 0x8d7f63,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },
    { id: 'COUNT', group: 'COUNT', name: 'Counting Room', sub: 'Trays, a ledger and nothing growing',
      x: 20, z: -46, w: 14, d: 11, h: 4.2, facing: 0, colour: 0xa2977e,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true },
    { id: 'STORE', group: 'STORE', name: 'Seed Store',  sub: 'Every line kept separate, and labelled twice',
      x: -26, z: -84, w: 13, d: 10, h: 4.0, facing: 0, colour: 0x8f8873,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true },

    // No group: the place rather than a lesson.
    { id: 'GATE', name: 'Gate House', sub: 'The garden book everybody signs',
      x: 17, z: 27, w: 9, d: 7, h: 3.6, facing: PI, colour: 0x8a8069,
      roof: 'gable', siding: 'board', base: 0.4 },
    // West of the trial beds and against the garden wall rather than at the head
    // of them. At (−20, 17) its door opened into the alley between two pea beds,
    // and `reachable` correctly reported the place unreachable behind its own crop.
    { id: 'BEES', name: 'Bee House', sub: 'Six skeps, and the reason a flower must be bagged',
      x: -38, z: 12, w: 7, d: 5, h: 2.8, facing: PI, colour: 0x554d3b,
      roof: 'gable', siding: 'board', base: 0.4 },
    { id: 'TOOLS', name: 'Tool Shed', sub: 'Canes, netting, twine and a sharpening stone',
      x: 28, z: -70, w: 9, d: 7, h: 3.2, facing: 0, colour: 0x6f6650,
      roof: 'gable', siding: 'board', base: 0.4 },
  ],

  board: { x: 6, z: 30, facing: PI, title: 'Garden book' },

  furniture: [
    { kind: 'bench', x: -9, z: 22, facing: PI / 2 },
    { kind: 'bin', x: 8, z: 19 },
    { kind: 'post', x: 4, z: 3, height: 3.0, r: 0.09 },
    { kind: 'post', x: 4, z: -28, height: 3.0, r: 0.09 },
    { kind: 'post', x: -10, z: -58, height: 3.0, r: 0.09 },
    { kind: 'bench', x: 12, z: -34, facing: -PI / 2 },
  ],

  scrubCount: 480,
  scrubColour: 0x556b32,
  scrubBand: [40, 300],

  horizon: [
    { radius: 540, height: 38, colour: 0x5d6b46, haze: 0.42 },
    { radius: 720, height: 62, colour: 0x6d7a58, haze: 0.62 },
  ],

  // yaw 0 is -Z, the camera's default direction: this looks down the walk with
  // the trial beds either side of it.
  spawn: { x: 0, z: 36, yaw: 0 },
};

export default site;
