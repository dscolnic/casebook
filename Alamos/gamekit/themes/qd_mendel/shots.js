// shots.js — where to stand to photograph the Abbey Garden.
//
// `engine/dev/shots.mjs` reads this. Without it an outdoor theme gets a turn on
// the spot at the spawn and nothing else, which here means eight pictures of a
// walk and none of the beds the whole campaign is about.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z, down
// the walk; θ = π looks back at the gate house.
const N = 0;                // toward −z, down the walk
const S = Math.PI;          // toward +z, back to the gate
const E = -Math.PI / 2;     // toward +x
const W = Math.PI / 2;      // toward −x

export const VIEWS = [
  { name: 'spawn--down-the-walk', at: { x: 0, z: 36 }, yaw: N,
    note: 'the whole garden, from where the level starts' },
  { name: 'spawn--back-at-the-gate', at: { x: 0, z: 36 }, yaw: S,
    note: 'the gate house and the garden book' },

  // The beds are what the campaign is about, so they are between the player and
  // the glasshouse rather than behind it.
  { name: 'beds--from-the-walk', at: { x: 0, z: 20 }, yaw: N,
    note: 'both blocks either side of the walk, with the canes reading against the ground' },
  { name: 'beds--down-an-alley', at: { x: -13.7, z: 20 }, yaw: N,
    note: 'along one alley — the width of it is why the block is walkable at all' },
  { name: 'beds--close', at: { x: -9, z: 12 }, yaw: W,
    note: 'one bed at arm\'s length: edging, haulm, canes and the label stake' },

  { name: 'glasshouse--from-the-walk', at: { x: -8, z: -2 }, yaw: W,
    note: 'the glasshouse, past the end of the near block' },
  { name: 'plot-shelter--from-the-walk', at: { x: 6, z: -2 }, yaw: E,
    note: 'the plot shelter at the head of the beds' },
  { name: 'bees--against-the-wall', at: { x: -32, z: 6 }, yaw: W,
    note: 'the bee house and the six skeps, forty yards from the glasshouse' },
  { name: 'counting--down-the-walk', at: { x: 4, z: -34 }, yaw: E,
    note: 'the counting room, where a season becomes a number' },
  { name: 'store--far-end', at: { x: -10, z: -70 }, yaw: N,
    note: 'the seed store at the far end, eighty-five metres from the beds' },
  { name: 'transport--barrow-and-bowser', at: { x: -2, z: 30 }, yaw: W,
    note: 'the wheelbarrow and the water bowser, which is how the far end gets reached' },
];

export default VIEWS;
