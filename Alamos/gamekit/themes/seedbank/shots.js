// shots.js — where to stand to photograph Wellmere.
//
// The world is generated from site.js, so `shots` can find the buildings on its
// own. What it cannot find is the half of this place that is not a building:
// the trial grid, the wet corner, the shelterbelt and the glasshouse range read
// from *between* things, and every one of them is evidence a lesson turns on.
// A contact sheet of six doorways would say nothing about whether the grid is
// laid out, whether the wet corner is visible from the alley, or whether the
// glasshouse roofs are sitting on their parapets — which is exactly the defect
// they had first time round.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// which is north, up the site toward the trial ground.
const N = 0;                 // toward −z, up the slope
const S = Math.PI;           // toward +z, back to the road
const E = -Math.PI / 2;      // toward +x
const W = Math.PI / 2;       // toward −x

export const VIEWS = [
  // ---------------------------------------------------------------- the yard
  { name: 'yard--spawn', at: { x: 0, z: 52 }, yaw: N,
    note: 'where the day starts: the glasshouses ahead, the ground beyond them' },
  { name: 'yard--vault', at: { x: -18, z: 50 }, yaw: W,
    note: 'the vault, from the yard — the one building with no windows' },
  { name: 'yard--drying', at: { x: 20, z: 50 }, yaw: E,
    note: 'the drying hall and the seed crates outside its door' },
  { name: 'yard--board', at: { x: 10, z: 54 }, yaw: N,
    note: 'the season board, read from where somebody would stand at it' },
  { name: 'yard--south', at: { x: 0, z: 58 }, yaw: S,
    note: 'records and the threshing floor, and the sacks waiting to be threshed' },

  // ------------------------------------------------------- the working middle
  { name: 'middle--crossing', at: { x: -24, z: 2 }, yaw: W,
    note: 'the crossing hall, with the nursery benches of pots outside it' },
  { name: 'middle--lab', at: { x: 24, z: 2 }, yaw: E,
    note: 'the molecular laboratory' },

  // ------------------------------------------------- the glasshouse range
  // Three glazed bays in a row: the shape that carries the place at a distance,
  // and the one that was wrong first time — the gables sat inside the parapets
  // and read as a fan of loose slats from the road.
  { name: 'glasshouse--range', at: { x: -2, z: -14 }, yaw: N,
    note: 'the range head on: roofs should sit ON the parapets, not inside them' },
  // Three quarters from the north-west, out on open ground. Due west puts the
  // three bays one behind another and photographs the end of the nearest — they
  // are 26 m deep and 26 m apart — and the south-west approach is blocked by the
  // crossing hall.
  { name: 'glasshouse--along', at: { x: -72, z: -70 }, yaw: -1.97,
    note: 'all three bays at three quarters, so the range reads as one run of glass' },
  { name: 'glasshouse--screening', at: { x: 26, z: -22 }, yaw: N,
    note: 'the screening bay, which carries the red band and is kept apart' },

  // ----------------------------------------------------------- the ground
  { name: 'field--road', at: { x: 0, z: -84 }, yaw: N,
    note: 'the field road, with the two field buildings either side' },
  { name: 'field--screenhouse', at: { x: 12, z: -88 }, yaw: N,
    note: 'the screenhouse: mesh on a frame, benched trays inside' },
  { name: 'field--gate', at: { x: 0, z: -125 }, yaw: N,
    note: 'the trial gate, and the whole grid behind it to the shelterbelt' },

  // The grid itself. Half the campaign's calls are made looking at this, and
  // the wet corner is the evidence in three of them — it has to be legible from
  // the alley without anybody being told it is there.
  { name: 'trial--alley', at: { x: -30, z: -150 }, yaw: E,
    note: 'down an alley, across the rows' },
  { name: 'trial--middle', at: { x: 0, z: -170 }, yaw: N,
    note: 'in among the plots, halfway up' },
  { name: 'trial--wet-corner', at: { x: 40, z: -190 }, yaw: N,
    note: 'the north-east corner: these plots should read darker and thicker' },
  { name: 'trial--shelterbelt', at: { x: 0, z: -222 }, yaw: N,
    note: 'the top of the ground, the shelterbelt, and the ridge behind it' },
  { name: 'trial--back', at: { x: 0, z: -205 }, yaw: S,
    note: 'looking back down the grid at the station, which is the long view' },
];

export default VIEWS;
