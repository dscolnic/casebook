// site.js — Marlow Fields, as data. Outdoor.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. Outdoors because the first evidence in this subject is a map: a
// pump standing in a court with houses round it, and the houses that drew from
// it falling ill while the ones fifty yards off did not. A cluster is a shape on
// the ground, and nothing about it survives being moved into a corridor.
//
// Looking down, -Z is away from the player at spawn:
//
//        [ Laboratory Hut ]                           z = -88
//                      [ Fever Ward ]                 z = -46
//   [ The Court Pump ]      [ Registrar's Office ]    z = -12
//                    ¤ spawn ¤                        z =  38
//
// Two things here are load-bearing rather than decorative:
//
//   · The pump and the registrar's office are within sight of each other and the
//     ward and the laboratory are a long way up the lane. That is the campaign's
//     chronology as geometry: level one is a map and a doorstep, and level two is
//     a walk to a building where the argument becomes an experiment.
//   · The spawn at (0, 38) has nothing within ten metres of it. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.

const PI = Math.PI;

export const site = {
  kind: 'outdoor',
  name: 'Marlow Fields',

  terrain: {
    // Flat river ground on the edge of a town. The sense of place comes from the
    // horizon ranks and the fog rather than from relief — and `profile: 'hill'`
    // would put its mound at the origin and leave the camera looking into it.
    size: 900, segments: 320, playerLimit: 140,
    profile: 'flat', relief: 1.4,
    ground: { base: [64, 62, 48], spread: [26, 24, 18], repeat: 15, normalRepeat: 160 },
  },

  // Damp, smoky and low. A town in autumn under coal smoke: hazier than the
  // radio site and with the sun sitting lower in it.
  atmosphere: { turbidity: 4.6, rayleigh: 2.2, mie: 0.006, mieG: 0.76, scale: 880, stars: 700 },

  paths: [
    { cx: 0, cz: 14, w: 8, d: 60, worn: 7 },
    { cx: -6, cz: -54, w: 6, d: 92, worn: 5 },
    { cx: 0, cz: -14, w: 46, d: 7, worn: 7 },
  ],

  buildings: [
    { id: 'PUMP', group: 'PUMP', name: 'The Court Pump', sub: 'One standpipe, forty households',
      x: -24, z: -12, w: 6, d: 6, h: 3.2, facing: 0, colour: 0x55503f,
      roof: 'gable', siding: 'board', base: 0.5 },
    { id: 'REG', group: 'REG', name: "Registrar's Office", sub: 'Every death, with an address on it',
      x: 12, z: -12, w: 13, d: 10, h: 4.0, facing: 0, colour: 0x5c5344,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true },
    { id: 'WARD', group: 'WARD', name: 'Fever Ward', sub: 'Two wings, and different rates in each',
      x: 22, z: -46, w: 24, d: 12, h: 5.0, facing: 0, colour: 0x6b6555,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },
    { id: 'LAB', group: 'LAB', name: 'Laboratory Hut', sub: 'Plates, a microscope, and matched animals',
      x: -26, z: -88, w: 15, d: 11, h: 4.2, facing: 0, colour: 0x625f52,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },

    // No group: the place rather than a lesson.
    { id: 'LODGE', name: 'Gate Lodge', sub: 'The book everybody signs',
      x: 18, z: 28, w: 9, d: 7, h: 3.4, facing: PI, colour: 0x585141,
      roof: 'gable', siding: 'board', base: 0.4 },
    // East of the lane. At (−20, 20) its door opened straight into the back of
    // the near terrace, and `reachable` correctly reported it walled off — the
    // court is five houses wide and the office was standing inside them.
    { id: 'WATER', name: 'Water Company Office', sub: 'Which street is on which main',
      x: 14, z: 16, w: 11, d: 8, h: 3.8, facing: PI, colour: 0x5f594a,
      roof: 'gable', siding: 'board', base: 0.4 },
    { id: 'MORT', name: 'Mortuary', sub: 'Where a cause of death is written down',
      x: 30, z: -76, w: 10, d: 8, h: 3.6, facing: 0, colour: 0x4b483f,
      roof: 'gable', siding: 'board', base: 0.4 },
  ],

  board: { x: 6, z: 32, facing: PI, title: 'Parish notices' },

  furniture: [
    { kind: 'bench', x: -8, z: 24, facing: PI / 2 },
    { kind: 'bin', x: 7, z: 20 },
    { kind: 'post', x: 5, z: 4, height: 3.4, r: 0.11 },
    { kind: 'post', x: 5, z: -30, height: 3.4, r: 0.11 },
    { kind: 'post', x: -10, z: -62, height: 3.4, r: 0.11 },
    { kind: 'bench', x: 13, z: -36, facing: -PI / 2 },
  ],

  scrubCount: 560,
  scrubColour: 0x4a5530,
  scrubBand: [30, 300],

  horizon: [
    { radius: 540, height: 30, colour: 0x585f4c, haze: 0.54 },
    { radius: 720, height: 50, colour: 0x686e5c, haze: 0.72 },
  ],

  // yaw 0 is -Z, the camera's default direction: this looks up the lane toward
  // the pump and the registrar's office.
  spawn: { x: 0, z: 38, yaw: 0 },
};

export default site;
