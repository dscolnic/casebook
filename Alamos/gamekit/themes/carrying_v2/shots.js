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
  { name: 'the-ferry-at-the-slip', at: { x: -30, z: 118 }, yaw: S,
    note: 'down the slipway. The boat is alongside on days 2, 5, 9 and 12 only — on any '
      + 'other day this should be an empty slip, four dolphins and open water' },
  { name: 'the-quay', at: { x: 18, z: 118 }, yaw: S,
    note: 'the stone quay running out over the water. The deck should read about four '
      + 'metres above the sea, with the ladder down the east face and the boat below it' },
  { name: 'the-fishing-boat', at: { x: 31, z: 126 }, yaw: S,
    note: 'the moored boat from the shore, rocking. Watch it for a second: three periods, '
      + 'never in phase, and the mooring lines should still reach the bollards' },
  { name: 'waterworks', at: { x: -34, z: -30 }, yaw: W,
    note: 'the waterworks, from the road' },
  { name: 'the-road-and-its-walls', at: { x: 0, z: -8 }, yaw: N,
    note: 'up the island road between the dry-stone walls. Both walls should run parallel '
      + 'at about five metres out, break for the waterworks and common approaches ahead, '
      + 'and the road itself stay completely clear' },
  { name: 'the-common', at: { x: 38, z: -30 }, yaw: E,
    note: 'the common office, with the grazing behind it' },
  { name: 'the-flock', at: { x: 30, z: -50 }, yaw: E,
    note: 'the stocked common. Forty sheep, none of them on the road, none inside a '
      + 'building pad, and six of them slowly moving' },
  { name: 'the-tip', at: { x: -74, z: -206 }, yaw: W,
    note: 'the tip spur — the yard should read as a yard rather than a shed' },
  { name: 'the-tip-yard', at: { x: -62, z: -226 }, yaw: W,
    note: 'the cells and the skips south of the shed: spoil heaps, five painted skips, '
      + 'stacked freight and a pile of tyres' },
  { name: 'the-old-light', at: { x: -8, z: -308 }, yaw: N,
    note: 'the Old Light from the road. The lantern room, its gallery rail and the dark '
      + 'cap should all be on top of the tower — and the glass must NOT glow: unlit since 1974' },
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
