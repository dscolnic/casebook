// site.js — the place, as data. Outdoor.
//
// `engine/world/outdoorTown.js` builds everything below; nothing here is
// geometry. Four buildings, one per group in book.yml, a couple of landmarks
// that carry the place rather than a lesson, and a spawn point.
//
// Looking down, -Z is away from the player at spawn:
//
//   [ Records Office ]      [ Response Desk ]      z = -34
//   [ Field Station  ]      [ Sample Room   ]      z =   4
//                 ¤ spawn ¤                        z =  36
//
// Two things here are load-bearing rather than decorative:
//
//   · The spawn at (0, 36) has nothing within ten metres of it. A prop dropped
//     over the spawn welds the player in place — the scene renders perfectly
//     and W does nothing.
//   · Every `group` below must be a group id in content/groups.js. A group with
//     no building is a call the player cannot reach, and `worldParity` is the
//     only thing that notices.

const PI = Math.PI;

export const site = {
  kind: 'outdoor',
  name: 'Replace with the name of this place',

  terrain: {
    size: 760, segments: 300, playerLimit: 105,
    profile: 'flat', relief: 0.8,
    // Darker and more saturated than looks right written down. Under a bright
    // sky IBL with ACES tone mapping a mid albedo renders close to white.
    ground: { base: [78, 74, 64], spread: [42, 40, 34], repeat: 14, normalRepeat: 150 },
  },

  atmosphere: { turbidity: 3.4, rayleigh: 2.5, mie: 0.004, mieG: 0.78, scale: 850, stars: 900 },

  paths: [
    { cx: 0, cz: -16, w: 200, d: 9, worn: 5 },
    { cx: 0, cz: 20,  w: 10, d: 120, worn: 6 },
  ],

  buildings: [
    { id: 'G1', group: 'G1', name: 'Field Station',
      x: -48, z: 4, w: 22, d: 14, h: 7.0, facing: 0, colour: 0x93a29c },
    { id: 'G2', group: 'G2', name: 'Sample Room',
      x: 48, z: 4, w: 22, d: 14, h: 7.0, facing: 0, colour: 0x99a3ad },
    { id: 'G3', group: 'G3', name: 'Records Office',
      x: -40, z: -34, w: 20, d: 13, h: 6.6, facing: 0, colour: 0xa79f90 },
    { id: 'G4', group: 'G4', name: 'Response Desk',
      x: 42, z: -34, w: 20, d: 13, h: 6.6, facing: 0, colour: 0xa89388 },

    // No group: places that carry the story and the wayfinding.
    { id: 'GATE', name: 'Gatehouse', sub: 'Where the day starts',
      x: -70, z: 58, w: 16, d: 11, h: 5.6, facing: PI, colour: 0x9a9078 },
  ],

  board: { x: 9, z: 30, facing: PI, title: 'Status' },

  // Kept off the avenue (|x| < 5) so nothing narrows the main route.
  furniture: [
    { kind: 'bench', x: -8, z: 22, facing: PI / 2 },
    { kind: 'bin', x: 7, z: 20 },
    { kind: 'post', x: 6, z: -12, height: 3.2, r: 0.11 },
    { kind: 'post', x: -6, z: -12, height: 3.2, r: 0.11 },
  ],

  scrubCount: 340,
  scrubColour: 0x5f6b45,
  scrubBand: [26, 250],

  horizon: [
    { radius: 520, height: 44, colour: 0x4a5b66, haze: 0.42 },
    { radius: 680, height: 70, colour: 0x5c6b76, haze: 0.62 },
  ],

  // yaw 0 is -Z, the camera's default direction: this looks up the street.
  spawn: { x: 0, z: 36, yaw: 0 },
};

export default site;
