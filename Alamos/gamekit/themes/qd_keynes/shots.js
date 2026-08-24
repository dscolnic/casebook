// shots.js — where to stand to photograph this building.
//
// Without one, `engine/dev/shots.mjs` derives views from plan.js and gets three
// pictures of every room and none of the corridor. The corridor is where the
// chain band is painted, and a band set against `tileH` rather than eye height
// renders perfectly and cannot be seen from anywhere a player walks — which only
// a picture taken ALONG the corridor will tell you.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = π looks up the corridor
// toward the model room; θ = 0 looks back toward the porch.
const UP = Math.PI;        // toward +z, deeper into the building
const BACK = 0;            // toward −z, back to the front door
const EAST = -Math.PI / 2; // toward +x, at the chain wall
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'corridor--from-the-entrance', at: { x: 0, z: 2 }, yaw: UP,
    note: 'the whole corridor, from where the level starts' },
  { name: 'corridor--chain-at-walking-distance', at: { x: -1.1, z: 10 }, yaw: UP,
    note: 'the painted chain on the east wall, seen the way somebody walking sees it' },
  { name: 'corridor--chain-square-on', at: { x: -1.4, z: 25 }, yaw: EAST,
    note: 'square on to the band, so the stations and their numbering read' },
  { name: 'corridor--west-band', at: { x: 1.35, z: 34 }, yaw: WEST,
    note: 'the plain painted band opposite, which should say nothing' },
  { name: 'corridor--from-the-far-end', at: { x: 0, z: 44 }, yaw: BACK,
    note: 'back down the length of it, past the model room door' },

  // One view into each of the four rooms a stop happens in, looking across it at
  // the far wall — which is where the fit-out and the room's own screen are.
  // Standing 3.5 m off the room's centre line, not on it.
  //
  // The first cut of these put the camera on the centre line looking at the far
  // wall — which is exactly where the case stand is, and the case beacon over it
  // draws through everything by design. Every one of the sixteen group rooms came
  // back as a pale yellow slab filling the middle of the frame with the room
  // behind it. Nothing was wrong with the room; the camera was aimed down the one
  // object in it that is meant to be unmissable.
  { name: 'flow-room--doorway', at: { x: -3.4, y: 1.6, z: 8.5 }, yaw: WEST,
    note: 'across the flow room, looking at the far wall' },
  { name: 'model-room--doorway', at: { x: -3.4, y: 1.6, z: 32.0 }, yaw: WEST,
    note: 'across the model room, looking at the far wall' },
  { name: 'statistics-room--doorway', at: { x: 3.4, y: 1.6, z: 8.0 }, yaw: EAST,
    note: 'across the statistics room, looking at the far wall' },
  { name: 'policy-desk--doorway', at: { x: 3.4, y: 1.6, z: 23.0 }, yaw: EAST,
    note: 'across the policy desk, looking at the far wall' },
];

export default VIEWS;
