// shots.js — where to stand to photograph Vellan.
//
// `engine/dev/shots.mjs` reads VIEWS. Without it the tool turns on the spot at
// the spawn and produces eight views of the harbour apron. The island's whole
// argument is that everything is visible from everything else, so the useful
// contact sheet is one view per area plus two of the coast — because the sea
// being visible from the road is what makes every budget on this island closed.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). So θ = 0 looks toward −z,
// north up the island road, and θ = π looks back south at the berth.
const N = 0;
const S = Math.PI;
const E = -Math.PI / 2;
const W = Math.PI / 2;

export const VIEWS = [
  { name: 'the-road-in', at: { x: 0, z: 72 }, yaw: N,
    note: 'the apron, looking north up the island road' },
  { name: 'harbour-office', at: { x: 8, z: 58 }, yaw: N,
    note: 'the harbour office front — the sign should be under the eaves, not above them' },
  { name: 'the-berth-looking-out', at: { x: -30, z: 82 }, yaw: S,
    note: 'from beside the berth, out over the water toward the mainland' },
  { name: 'waterworks', at: { x: -34, z: -30 }, yaw: W,
    note: 'the waterworks, from the road' },
  { name: 'the-common', at: { x: 38, z: -30 }, yaw: E,
    note: 'the common office, with the grazing behind it' },
  { name: 'the-tip', at: { x: -74, z: -206 }, yaw: W,
    note: 'the tip spur — the yard should read as a yard rather than a shed' },
  { name: 'the-turbine-yard', at: { x: 72, z: -206 }, yaw: E,
    note: 'the hill spur and the diesel house' },
  { name: 'reef-station', at: { x: 4, z: -286 }, yaw: N,
    note: 'the reef station at the point' },
  { name: 'the-point-and-the-sea', at: { x: 0, z: -330 }, yaw: N,
    note: 'past the station to open water — nothing should be on this horizon' },
  { name: 'the-south-coast', at: { x: 40, z: 92 }, yaw: S,
    note: 'the south-east bearing: the mainland smudge the ferry comes from' },
];

export default VIEWS;
