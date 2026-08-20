// shots.js — the views `npm run shots yellowbay` takes.
//
// A theme with its own world needs these. The default generator in
// engine/dev/shots.mjs assumes one corridor on x = 0 with rooms either side of
// it, which is exactly the shape this floor is not: it photographed the void
// between the two wings eight times and called it a corridor.
//
// Yaw is in degrees, and the convention is the engine's rather than a compass:
// 0 looks along −z, 180 along +z, 90 along −x and −90 along +x. Getting this
// backwards photographs the corridor you have just walked down instead of the
// thing you meant to look at, and every frame still looks plausible.

const W = -14, E = 14;        // the two corridor centrelines
const LINK_Z = 43.5;          // the middle of the glass link, at the far end

export default [
  // ---- the process wing, north to south
  { name: 'process-wing--from-the-gown-room', at: { x: W, z: -3 }, yaw: 180,
    note: 'the whole process wing from the gown room end' },
  { name: 'process-wing--at-the-yellow-bay', at: { x: W, z: 12 }, yaw: 180 },
  { name: 'process-wing--at-the-link', at: { x: W, z: 36 }, yaw: 180 },
  { name: 'process-wing--looking-back', at: { x: W, z: 34 }, yaw: 0 },

  // ---- the link itself, which is what this building is remembered for
  { name: 'link--arriving-from-the-process-wing', at: { x: W, z: 39 }, yaw: 180,
    note: 'the last few metres of the process wing, with the crossing beyond it' },
  { name: 'link--stepping-on', at: { x: W + 1.5, z: LINK_Z }, yaw: -90,
    note: 'onto the glass from the process side' },
  { name: 'link--the-whole-crossing', at: { x: -8, z: LINK_Z }, yaw: -90,
    note: 'the full width of the link' },
  { name: 'link--middle', at: { x: 0, z: LINK_Z }, yaw: -90 },
  { name: 'link--middle-across', at: { x: 0, z: LINK_Z }, yaw: 180,
    note: 'the far wall of the crossing' },
  { name: 'link--from-the-analysis-wing', at: { x: E - 1.5, z: LINK_Z }, yaw: 90 },

  // ---- the analysis wing
  { name: 'analysis-wing--from-metrology', at: { x: E, z: -3 }, yaw: 180 },
  { name: 'analysis-wing--at-the-desk', at: { x: E, z: 15 }, yaw: 180 },
  { name: 'analysis-wing--at-the-link', at: { x: E, z: 38 }, yaw: 0 },
  { name: 'analysis-wing--from-the-link', at: { x: E, z: 36 }, yaw: 0 },

  // ---- the six rooms a call sends you to, from just inside the door
  { name: 'yellow-bay', at: { x: W - 3.4, z: 14 }, yaw: 90 },
  { name: 'deposition-bay', at: { x: W - 3.4, z: 30 }, yaw: 90 },
  { name: 'wafer-store', at: { x: W + 3.4, z: 5 }, yaw: -90 },
  { name: 'implant-bay', at: { x: E - 3.4, z: 5 }, yaw: 90 },
  { name: 'wet-bench', at: { x: E - 3.4, z: 22 }, yaw: 90 },
  { name: 'metrology-bay', at: { x: E + 3.4, z: 4 }, yaw: -90 },

  // ---- and the rooms that carry the place rather than a lesson
  { name: 'gown-room', at: { x: W - 3.4, z: 1 }, yaw: 90 },
  { name: 'chemical-stores', at: { x: W + 3.4, z: 19 }, yaw: -90 },
  { name: 'quiet-room', at: { x: W + 3.4, z: 31 }, yaw: -90 },
  { name: 'integration-desk', at: { x: E + 3.4, z: 17 }, yaw: -90 },
  { name: 'subfab-stair', at: { x: E + 3.4, z: 27 }, yaw: -90 },
];
