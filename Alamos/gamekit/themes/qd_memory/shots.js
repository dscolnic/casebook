// shots.js — where to stand to photograph this unit.
//
// Without one, `engine/dev/shots.mjs` derives views from plan.js and gets three
// pictures of every room and none of the corridor. The corridor is where the
// chain band is painted, and a band set against `tileH` rather than eye height
// renders perfectly and cannot be seen from anywhere a player walks — which only
// a picture taken ALONG the corridor will tell you.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = π looks up the corridor
// toward the transcript store; θ = 0 looks back at the two open bays.
const UP = Math.PI;
const BACK = 0;
const EAST = -Math.PI / 2;
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'corridor--from-the-bays', at: { x: 0, z: -6 }, yaw: UP,
    note: 'the whole corridor, from where the level starts between the two open bays' },
  { name: 'bays--study-room', at: { x: 0, z: -4 }, yaw: WEST,
    note: 'the study room, open to the corridor, with nothing on its walls worth reading' },
  { name: 'bays--event-bay', at: { x: 0, z: -4 }, yaw: EAST,
    note: 'the event bay opposite it — one screen, one seat' },
  { name: 'corridor--chain-at-walking-distance', at: { x: -1.0, z: 6 }, yaw: UP,
    note: 'the painted chain on the east wall, seen the way somebody walking sees it' },
  { name: 'corridor--chain-square-on', at: { x: -1.2, z: 18 }, yaw: EAST,
    note: 'square on to the band, so the stations and their numbering read' },
  { name: 'corridor--west-band', at: { x: 1.2, z: 24 }, yaw: WEST,
    note: 'the plain painted band opposite, which should say nothing' },
  { name: 'corridor--from-the-far-end', at: { x: 0, z: 35 }, yaw: BACK,
    note: 'back down the length of it, past the data room door' },
];

export default VIEWS;
