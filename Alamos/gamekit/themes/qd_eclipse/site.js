// site.js — the eclipse camp, as data. Outdoor.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. This is the first Quick Discovery that is not a corridor, and the
// reason is the subject: an eclipse expedition is a camp pitched on a flat place
// with a clear horizon, and half of what makes it hard is that it is a camp.
//
// Looking down, -Z is away from the player at spawn:
//
//                  [ Camera Field ]                z = -78
//        [ Plate Hut ]      [ Computing Tent ]     z = -18
//              [ Telegraph Hut ]                   z =  16
//                  ¤ spawn ¤                       z =  44
//
// Two things here are load-bearing rather than decorative:
//
//   · The camera field is a long way out on its own. That is the shape of the
//     campaign — level one and level two are a walk apart, and the walk is what
//     five minutes of totality costs you if a plate box is in the wrong hut.
//   · The spawn at (0, 44) has nothing within ten metres of it. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.

const PI = Math.PI;

export const site = {
  kind: 'outdoor',
  name: 'The Eclipse Camp',

  terrain: {
    // Flat, wide, and with a long clear horizon, because that is why the site
    // was chosen. `playerLimit` keeps the player inside the scrub band.
    size: 900, segments: 320, playerLimit: 130,
    profile: 'flat', relief: 1.1,
    // Dry red-brown dust. Darker and more saturated than looks right written
    // down: under a bright sky IBL with ACES tone mapping a mid albedo renders
    // close to white, which is house rule 6.
    ground: { base: [96, 68, 46], spread: [46, 34, 24], repeat: 16, normalRepeat: 170 },
  },

  // Tropical, hazy, and bright. High turbidity is the dust in the air, which is
  // also why the horizon ranks are close in tone to the sky.
  atmosphere: { turbidity: 3.4, rayleigh: 2.8, mie: 0.005, mieG: 0.80, scale: 900, stars: 700 },

  paths: [
    // The track in from the road, and the spur out to the camera field.
    { cx: 0, cz: 14, w: 8, d: 90, worn: 7 },
    { cx: 0, cz: -50, w: 6, d: 70, worn: 5 },
    { cx: 0, cz: -18, w: 90, d: 7, worn: 6 },
  ],

  buildings: [
    { id: 'CAMERA', group: 'CAMERA', name: 'Camera Field', sub: 'Coelostat and lens',
      x: 0, z: -78, w: 16, d: 10, h: 3.6, facing: 0, colour: 0x9d8f72,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true, windows: false },
    { id: 'PLATES', group: 'PLATES', name: 'Plate Hut', sub: 'Light-tight',
      x: -34, z: -18, w: 14, d: 10, h: 3.8, facing: 0, colour: 0x6b6152,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true, windows: false },
    { id: 'COMPUTE', group: 'COMPUTE', name: 'Computing Tent', sub: 'Tables and the budget',
      x: 34, z: -18, w: 13, d: 10, h: 3.4, facing: 0, colour: 0x8f8368,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },
    { id: 'CABLE', group: 'CABLE', name: 'Telegraph Hut', sub: 'One wire to the coast',
      x: 26, z: 16, w: 10, d: 8, h: 3.2, facing: PI / 2, colour: 0x86704f,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },

    // No group: the place rather than a lesson.
    { id: 'GATE', name: 'Store Tent', sub: 'Water, plates, and the day\'s times',
      x: -26, z: 20, w: 13, d: 9, h: 3.4, facing: PI, colour: 0x8d8158,
      roof: 'gable', siding: 'board', base: 0.4 },
  ],

  board: { x: 8, z: 36, facing: PI, title: 'Times' },

  // Kept off the track (|x| < 5) so nothing narrows the route out to the field.
  furniture: [
    { kind: 'bench', x: -9, z: 30, facing: PI / 2 },
    { kind: 'bin', x: 8, z: 26 },
    { kind: 'post', x: 6, z: 2, height: 3.4, r: 0.10 },
    { kind: 'post', x: 6, z: -34, height: 3.4, r: 0.10 },
    { kind: 'post', x: 6, z: -58, height: 3.4, r: 0.10 },
    { kind: 'bench', x: 9, z: -12, facing: -PI / 2 },
  ],

  scrubCount: 520,
  scrubColour: 0x6b6238,
  scrubBand: [34, 300],

  horizon: [
    { radius: 560, height: 26, colour: 0x6d6552, haze: 0.55 },
    { radius: 760, height: 42, colour: 0x7d7666, haze: 0.72 },
  ],

  // yaw 0 is -Z, the camera's default direction: this looks up the track toward
  // the camera field.
  spawn: { x: 0, z: 44, yaw: 0 },
};

export default site;
