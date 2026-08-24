// shots.js — where to stand to photograph this floor.
//
// Without one, `engine/dev/shots.mjs` derives views from plan.js and gets three
// pictures of every room and none of the corridor. The corridor is where the
// chain band is painted, and a band set against `tileH` rather than eye height
// renders perfectly and cannot be seen from anywhere a player walks — which only
// a picture taken ALONG the corridor will tell you.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = π looks up the corridor
// toward the design desk; θ = 0 looks back toward the porch.
const UP = Math.PI;        // toward +z, deeper into the building
const BACK = 0;            // toward −z, back to the front door
const EAST = -Math.PI / 2; // toward +x, at the chain wall
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'corridor--from-the-entrance', at: { x: 0, z: 2 }, yaw: UP,
    note: 'the whole corridor, from where the level starts' },
  { name: 'corridor--chain-at-walking-distance', at: { x: -1.1, z: 16 }, yaw: UP,
    note: 'the painted chain on the east wall, seen the way somebody walking sees it' },
  { name: 'corridor--chain-square-on', at: { x: -1.3, z: 22 }, yaw: EAST,
    note: 'square on to the band, so the stations and their numbering read' },
  { name: 'corridor--west-band', at: { x: 1.3, z: 32 }, yaw: WEST,
    note: 'the plain painted band opposite, which should say nothing' },
  { name: 'corridor--from-the-far-end', at: { x: 0, z: 43 }, yaw: BACK,
    note: 'back down the length of it, past the design desk door' },
];

export default VIEWS;
