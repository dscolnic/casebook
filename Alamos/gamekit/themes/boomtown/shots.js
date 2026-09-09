// shots.js — where to stand to photograph the mesa town.
//
// There was no list here: the fallback is a turn on the spot at the spawn,
// which photographs Fuller Lodge four times and misses everything the town has
// — the trailer row, the freight yard, the pond, the construction site. A place
// is only as built as its last screenshot, and nothing had pointed a camera at
// any of this.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// down Trinity Drive toward the pond and the lodge.
const SOUTH = 0;
const NORTH = Math.PI;
const EAST = -Math.PI / 2;
const WEST = Math.PI / 2;

export const VIEWS = [
  { name: 'drive--from-the-spawn', at: { x: 0, z: 30 }, yaw: SOUTH,
    note: 'down Trinity Drive: the pond, the lodge and the queue outside it' },
  { name: 'lodge--porch', at: { x: 0, z: -14 }, yaw: SOUTH,
    note: 'the benches, the urn, the dog and the people sitting' },
  { name: 'pond--jetty', at: { x: 10, z: -2 }, yaw: WEST,
    note: 'the jetty, the two boats and the reeds along the north shore' },
  { name: 'trailers--the-row', at: { x: -90, z: 24 }, yaw: WEST,
    note: 'the tent and trailer row, the washing and the standpipe' },
  { name: 'trailers--down-the-line', at: { x: -103, z: -4 }, yaw: NORTH,
    note: 'along the row, which is what a town short of housing looks like' },
  { name: 'build--site', at: { x: -48, z: 14 }, yaw: SOUTH,
    note: 'the slab, the stud walls, the lumber and the mixer' },
  { name: 'freight--yard', at: { x: 44, z: 50 }, yaw: SOUTH,
    note: 'the bays, the pallets, the container and the forklift' },
  { name: 'checkpoint--gate', at: { x: 27, z: 94 }, yaw: SOUTH,
    note: 'the barrier, the desk and the delivery signage' },
  { name: 'market--stalls', at: { x: 52, z: 32 }, yaw: NORTH,
    note: 'the stalls, the awnings and the chalk price board' },
  { name: 'hoardings--trinity', at: { x: -14, z: 24 }, yaw: SOUTH,
    note: 'the hoardings and the bills the campaign posts on them' },
  { name: 'ribbon--new-line', at: { x: 34, z: 62 }, yaw: SOUTH,
    note: 'the ribbon over the proposed new line, up until mission 14' },
  { name: 'town--from-the-north', at: { x: 17, z: 92 }, yaw: SOUTH,
    note: 'the approach road, the dust on it and the town beyond' },
];

export default VIEWS;
