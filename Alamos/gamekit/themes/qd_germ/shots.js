// shots.js — where to stand to photograph Marlow Fields.
//
// `engine/dev/shots.mjs` reads this. Without it an outdoor theme gets a turn on
// the spot at the spawn and nothing else, which here means eight pictures of a
// lane and none of the pump the game is named after.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z, up
// the lane past the court; θ = π looks back at the gate lodge.
const N = 0;                // toward −z, up the lane
const S = Math.PI;          // toward +z, back down it
const E = -Math.PI / 2;     // toward +x
const W = Math.PI / 2;      // toward −x

export const VIEWS = [
  { name: 'spawn--up-the-lane', at: { x: 0, z: 38 }, yaw: N,
    note: 'the whole site, from where the level starts' },
  { name: 'spawn--back-at-the-lodge', at: { x: 0, z: 38 }, yaw: S,
    note: 'the gate lodge and the parish board' },

  // The pump is at (−25, 1), in front of its own shelter rather than behind it.
  // The other outdoor site in this set put a horn antenna north of its hut,
  // which is right for a real site and means the hut is exactly in front of the
  // thing the campaign is named after from everywhere anybody walks.
  // Down the gap between the two terraces rather than across the near one: the
  // first version of this view stood at z = 14, which is inside the near
  // terrace's row, and photographed the back of a house.
  { name: 'pump--from-the-lane', at: { x: -7, z: 1 }, yaw: W,
    note: 'the standpipe down the gap between the terraces, as somebody on the lane sees it' },
  { name: 'pump--the-handle', at: { x: -25, z: 7 }, yaw: N,
    note: 'close on the handle — the object the whole campaign turns on' },
  { name: 'pump--across-the-court', at: { x: -36, z: 1 }, yaw: E,
    note: 'side on, with both terraces either side of it' },

  { name: 'court--between-the-terraces', at: { x: -25, z: 6 }, yaw: N,
    note: 'forty households on one standpipe, which is the argument as a picture' },
  { name: 'registrar--from-the-lane', at: { x: 2, z: 4 }, yaw: E,
    note: "the registrar's office, opposite the court" },
  { name: 'fence--the-gate', at: { x: 0, z: -18 }, yaw: N,
    note: 'the fence between the court and the hospital ground, and the way through it' },
  { name: 'ward--from-the-lane', at: { x: 4, z: -40 }, yaw: E,
    note: 'the fever ward, two wings off one entrance' },
  { name: 'lab--up-the-lane', at: { x: -8, z: -70 }, yaw: N,
    note: 'the laboratory hut at the far end, ninety metres from the court' },
  { name: 'transport--the-barrow', at: { x: -13, z: 32 }, yaw: N,
    note: 'the barrow and the bicycle, which is how the far end gets reached' },
];

export default VIEWS;
