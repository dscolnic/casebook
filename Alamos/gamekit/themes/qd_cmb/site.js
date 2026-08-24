// site.js — the hilltop antenna site, as data. Outdoor.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. Outdoors because the antenna is: a twenty-foot horn on a hill above a
// road is the whole reason the first explanation offered was pigeons, and none of
// that survives being moved into a corridor.
//
// Looking down, -Z is away from the player at spawn:
//
//        [ Theory Room ]                              z = -86
//                        [ Spectrum Building ]        z = -44
//   [ Horn ]   [ Receiver Hut ]                       z = -10
//                    ¤ spawn ¤                        z =  40
//
// Two things here are load-bearing rather than decorative:
//
//   · The horn and the receiver hut are a few metres apart and everything else is
//     a long way up the ridge. That is the campaign's own chronology as geometry:
//     level one happens at the antenna, and level two is a walk to a building put
//     there decades later.
//   · The spawn at (0, 40) has nothing within ten metres of it. A prop over the
//     spawn welds the player in place: the scene renders and W does nothing.

const PI = Math.PI;

export const site = {
  kind: 'outdoor',
  name: 'The Hilltop Antenna Site',

  terrain: {
    // Nearly flat, with the sense of height carried by the horizon ranks rather
    // than by the ground.
    //
    // The first cut used `profile: 'hill'` with 7 m of relief, which is honest to
    // the description and unusable: the profile puts its mound at the origin, so
    // the camera at eye height halfway up the track was looking into the side of
    // it and the whole site was one green slope with two roof ridges poking over
    // the top. A hilltop reads from the horizon and the fog, not from being made
    // to walk up it — and nothing in this campaign happens on a gradient.
    size: 900, segments: 320, playerLimit: 135,
    profile: 'flat', relief: 1.6,
    ground: { base: [58, 66, 42], spread: [28, 32, 20], repeat: 15, normalRepeat: 160 },
  },

  // Temperate, hazy, and low: this is a working site in autumn rather than a
  // tropical plain.
  atmosphere: { turbidity: 3.0, rayleigh: 2.6, mie: 0.004, mieG: 0.78, scale: 880, stars: 800 },

  paths: [
    { cx: 0, cz: 16, w: 7, d: 60, worn: 6 },
    { cx: -8, cz: -50, w: 6, d: 90, worn: 5 },
    { cx: 0, cz: -12, w: 44, d: 6, worn: 6 },
  ],

  buildings: [
    { id: 'HORN', group: 'HORN', name: 'Horn Antenna', sub: 'Twenty feet, open to the sky',
      x: -22, z: -10, w: 12, d: 10, h: 4.0, facing: 0, colour: 0x8f8a7a,
      roof: 'flat', siding: 'panel', base: 0.4 },
    { id: 'RECV', group: 'RECV', name: 'Receiver Hut', sub: 'A cold load and a list',
      x: 8, z: -10, w: 12, d: 9, h: 3.6, facing: 0, colour: 0x726b5c,
      roof: 'gable', siding: 'board', base: 0.5, stoop: true },
    { id: 'SPECTRUM', group: 'SPECTRUM', name: 'Spectrum Building', sub: 'Forty channels, decades later',
      x: 24, z: -44, w: 20, d: 13, h: 6.4, facing: 0, colour: 0xa7a9a2,
      roof: 'flat', siding: 'panel', base: 0 },
    { id: 'COSMO', group: 'COSMO', name: 'Theory Room', sub: 'Two blackboards, no instruments',
      x: -26, z: -86, w: 14, d: 11, h: 4.2, facing: 0, colour: 0x9a9382,
      roof: 'gable', siding: 'board', base: 0.4, stoop: true },

    // No group: the place rather than a lesson.
    { id: 'GATE', name: 'Site Hut', sub: 'The log everybody signs',
      x: 20, z: 30, w: 10, d: 8, h: 3.4, facing: PI, colour: 0x8d8670,
      roof: 'gable', siding: 'board', base: 0.4 },
  ],

  board: { x: 8, z: 34, facing: PI, title: 'Site log' },

  furniture: [
    { kind: 'bench', x: -9, z: 26, facing: PI / 2 },
    { kind: 'bin', x: 8, z: 22 },
    { kind: 'post', x: 5, z: 6, height: 3.2, r: 0.10 },
    { kind: 'post', x: 5, z: -26, height: 3.2, r: 0.10 },
    { kind: 'post', x: -12, z: -60, height: 3.2, r: 0.10 },
    { kind: 'bench', x: 14, z: -34, facing: -PI / 2 },
  ],

  scrubCount: 620,
  scrubColour: 0x4f5c34,
  scrubBand: [30, 300],

  horizon: [
    { radius: 540, height: 34, colour: 0x54604f, haze: 0.48 },
    { radius: 720, height: 56, colour: 0x66705f, haze: 0.68 },
  ],

  // yaw 0 is -Z, the camera's default direction: this looks up the track toward
  // the horn.
  spawn: { x: 0, z: 40, yaw: 0 },
};

export default site;
