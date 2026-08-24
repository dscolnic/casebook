// shots.js — where to stand to photograph this camp.
//
// `engine/dev/shots.mjs` reads this. Without it an outdoor theme gets a turn on
// the spot at the spawn and nothing else, which for this game means eight
// pictures of a track and none of the instrument the whole campaign is about.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). So θ = 0 looks toward −z,
// up the track toward the camera field, and θ = π looks back at the gate.
const N = 0;                // toward −z, up the track
const S = Math.PI;          // toward +z, back toward the gate
const E = -Math.PI / 2;     // toward +x
const W = Math.PI / 2;      // toward −x

export const VIEWS = [
  { name: 'spawn--up-the-track', at: { x: 0, z: 44 }, yaw: N,
    note: 'the whole camp, from where the day starts' },
  { name: 'spawn--back-at-the-gate', at: { x: 0, z: 44 }, yaw: S,
    note: 'the store tent and the board' },

  { name: 'camera-field--from-the-track', at: { x: 0, z: -52 }, yaw: N,
    note: 'both coelostats and both lenses, with the hut behind them' },
  { name: 'camera-field--west-instrument', at: { x: -13, z: -56 }, yaw: N,
    note: 'the long lens on its trestles, looking at the mirror' },
  { name: 'camera-field--mirror', at: { x: -13, z: -68 }, yaw: N,
    note: 'the coelostat close to — mirror, drive and pier' },
  { name: 'camera-field--observers-awning', at: { x: -18, z: -60 }, yaw: W,
    note: 'the guyed awning and the plate boxes' },
  { name: 'camera-field--hut-door', at: { x: 0, z: -70 }, yaw: N,
    note: 'the camera hut door — nothing should be standing in front of it' },

  { name: 'plate-hut--approach', at: { x: -34, z: -6 }, yaw: N,
    note: 'the plate hut, its dark tent and the water' },
  { name: 'plate-hut--door', at: { x: -34, z: -12 }, yaw: N, note: 'the door itself' },

  { name: 'computing--approach', at: { x: 34, z: -6 }, yaw: N,
    note: 'the computing tent, with its awning to the east' },
  { name: 'computing--awning', at: { x: 46, z: -6 }, yaw: N,
    note: 'the folding table under canvas' },

  { name: 'telegraph--hut', at: { x: 34, z: 22 }, yaw: E,
    note: 'the telegraph hut, and the wire leaving the camp' },
  { name: 'telegraph--wire-out', at: { x: 40, z: 30 }, yaw: S,
    note: 'the line of poles running off the map toward the coast' },

  { name: 'store--tent', at: { x: -26, z: 30 }, yaw: N, note: 'the store tent and the crates' },
  { name: 'horizon--east', at: { x: 0, z: 0 }, yaw: E, note: 'the flat, and how far it goes' },
  { name: 'horizon--west', at: { x: 0, z: 0 }, yaw: W, note: 'the other way' },
];

export default VIEWS;
