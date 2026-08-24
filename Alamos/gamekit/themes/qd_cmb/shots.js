// shots.js — where to stand to photograph this site.
//
// `engine/dev/shots.mjs` reads this. Without it an outdoor theme gets a turn on
// the spot at the spawn and nothing else, which here means eight pictures of a
// track and none of the antenna the whole campaign is about.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). So θ = 0 looks toward −z, up
// the track toward the horn, and θ = π looks back down at the gate.
const N = 0;                // toward −z, up the track
const S = Math.PI;          // toward +z, back down the track
const E = -Math.PI / 2;     // toward +x
const W = Math.PI / 2;      // toward −x

export const VIEWS = [
  { name: 'spawn--up-the-track', at: { x: 0, z: 40 }, yaw: N,
    note: 'the whole site, from where the day starts' },
  { name: 'spawn--back-at-the-gate', at: { x: 0, z: 40 }, yaw: S,
    note: 'the site hut and the log' },

  // The horn is at (−22, −20), behind its own hut from the track, so a view has to
  // be taken round the side of the hut rather than up the middle of the site. The
  // first set of these was aimed at x = −8 and framed two roofs and no antenna.
  { name: 'horn--three-quarter', at: { x: -40, z: 10 }, yaw: N,
    note: 'the horn on its mount, inside the ring of ground shielding' },
  { name: 'horn--mouth', at: { x: -40, z: -1 }, yaw: N,
    note: 'straight up the mouth of it — the taper and the tilt are the whole silhouette' },
  { name: 'horn--side-on', at: { x: -54, z: -10 }, yaw: E,
    note: 'side on, so the tilt of the open end reads' },
  { name: 'horn--from-the-hut', at: { x: -24, z: -8 }, yaw: W,
    note: 'what somebody standing at the receiver end of the site sees' },
  { name: 'horn--shield', at: { x: -33, z: -16 }, yaw: -Math.PI * 0.72,
    note: 'the ground shield, which is what stops it collecting the hill' },
  { name: 'horn--hut-door', at: { x: -22, z: -2 }, yaw: N,
    note: 'the antenna hut door — nothing should be standing in front of it' },

  { name: 'receiver--approach', at: { x: 8, z: 2 }, yaw: N,
    note: 'the receiver hut, the dewar and the cable coming down from the horn' },
  { name: 'receiver--door', at: { x: 8, z: -4 }, yaw: N, note: 'the door itself' },
  { name: 'cable--run', at: { x: -6, z: -14 }, yaw: E,
    note: 'the cable on its trestles, horn to hut' },

  { name: 'spectrum--approach', at: { x: 24, z: -30 }, yaw: N,
    note: 'the newer building up the ridge, and its three dishes' },
  { name: 'spectrum--dishes', at: { x: 36, z: -38 }, yaw: N, note: 'the dishes close to' },
  { name: 'spectrum--door', at: { x: 24, z: -36 }, yaw: N, note: 'the door itself' },

  { name: 'theory--approach', at: { x: -26, z: -74 }, yaw: N,
    note: 'the theory room at the end of the track' },
  { name: 'theory--door', at: { x: -26, z: -80 }, yaw: N, note: 'the door itself' },

  { name: 'ridge--east', at: { x: 0, z: -40 }, yaw: E, note: 'along the ridge, and how far it goes' },
  { name: 'ridge--west', at: { x: 0, z: -40 }, yaw: W, note: 'the other way' },
];

export default VIEWS;
