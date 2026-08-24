// shots.js — where to stand to photograph this laboratory.
//
// Without one, `engine/dev/shots.mjs` derives views from plan.js and gets three
// pictures of every room and none of the corridor. The corridor is where the
// chain band is painted, and a band set against `tileH` rather than eye height
// renders perfectly and cannot be seen from anywhere a player walks — which only
// a picture taken ALONG the corridor will tell you.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = π looks up the corridor
// toward the tabulation room; θ = 0 looks back toward the porch.
const UP = Math.PI;        // toward +z, deeper into the building
const BACK = 0;            // toward −z, back to the front door
const EAST = -Math.PI / 2; // toward +x, at the chain wall
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'corridor--from-the-entrance', at: { x: 0, z: 2 }, yaw: UP,
    note: 'the whole corridor, from where the level starts' },
  { name: 'corridor--chain-at-walking-distance', at: { x: -1.0, z: 14 }, yaw: UP,
    note: 'the painted chain on the east wall, seen the way somebody walking sees it' },
  { name: 'corridor--chain-square-on', at: { x: -1.2, z: 20 }, yaw: EAST,
    note: 'square on to the band, so the stations and their numbering read' },
  { name: 'corridor--west-band', at: { x: 1.2, z: 30 }, yaw: WEST,
    note: 'the plain painted band opposite, which should say nothing' },
  { name: 'corridor--from-the-far-end', at: { x: 0, z: 42 }, yaw: BACK,
    note: 'back down the length of it, past the tabulation room door' },

  // One view into each of the four rooms a stop happens in, standing just
  // inside the door and looking at the far wall — which is where the fit-out,
  // the case stand and the room's own screen are.
  { name: 'testing-booth--doorway', at: { x: -3.25, y: 1.6, z: 9.5 }, yaw: WEST,
    note: 'inside the door of the testing booth, looking at the far wall' },
  { name: 'tabulation-room--doorway', at: { x: -3.25, y: 1.6, z: 31.0 }, yaw: WEST,
    note: 'inside the door of the tabulation room, looking at the far wall' },
  { name: 'chronoscope-bench--doorway', at: { x: 3.25, y: 1.6, z: 11.0 }, yaw: EAST,
    note: 'inside the door of the chronoscope bench, looking at the far wall' },
  { name: 'distribution-wall--doorway', at: { x: 3.25, y: 1.6, z: 26.0 }, yaw: EAST,
    note: 'inside the door of the distribution wall, looking at the far wall' },
];

export default VIEWS;
