// shots.js — where to stand to photograph Saltmere Point.
//
// The world is generated from site.js, so `shots` can find the buildings on its
// own. What it cannot find is the thing this place is *for*: the rings, the
// empty bands between them, the cliff, the causeway and the farm across the
// water. A contact sheet of six doorways would say nothing about whether the
// layout reads as a layout, which is the only reason it was rebuilt.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// which is north, up the Point toward the crossing block at the centre.
const N = 0;                 // toward −z, up the Point
const S = Math.PI;           // toward +z, back down the causeway
const E = -Math.PI / 2;
const W = Math.PI / 2;

export const VIEWS = [
  // ---------------------------------------------------------- the approach
  { name: 'a-gate', at: { x: 0, z: 318 }, yaw: N,
    note: 'from the gate, the whole walk in: causeway, compound, and the Point beyond' },
  { name: 'b-causeway', at: { x: 0, z: 260 }, yaw: N,
    note: 'on the causeway — sea both sides, and it should read as a neck' },
  { name: 'c-causeway-back', at: { x: 0, z: 240 }, yaw: S,
    note: 'looking back down the causeway at the gate and the mainland' },
  { name: 'd-mainland', at: { x: -30, z: 300 }, yaw: S,
    note: "Fenn's farm across the water, upwind, and never reachable" },

  // ---------------------------------------------------------- the compound
  { name: 'e-spawn', at: { x: 0, z: 155 }, yaw: N,
    note: 'where the day starts: vault and laboratory either side, rings beyond' },
  { name: 'f-compound-back', at: { x: 0, z: 150 }, yaw: S,
    note: 'records, the threshing floor, and the causeway leaving south' },
  { name: 'g-windsock', at: { x: 34, z: 158 }, yaw: E,
    note: 'the windsock, which points at the argument' },

  // -------------------------------------------------------- the trial ring
  { name: 'h-trial-marker', at: { x: 0, z: 112 }, yaw: N,
    note: 'the TRIAL RING boundary sign, standing on the boundary it names' },
  { name: 'i-trial-arc', at: { x: 30, z: 118 }, yaw: W,
    note: 'along the arc — the plots should curve, which no other game has' },
  { name: 'j-trial-lab', at: { x: 62, z: -62 }, yaw: -Math.PI * 0.25,
    note: 'the field laboratory, standing in its own wedge of the ring' },
  { name: 'k-trial-seaward', at: { x: -96, z: -60 }, yaw: W,
    note: 'the seaward plots, which stand thinner, and the cliff behind them' },

  // ------------------------------------------------------------ the buffers
  { name: 'l-buffer-outer', at: { x: 0, z: 90 }, yaw: N,
    note: 'the outer buffer: it is meant to be empty, and empty is the lesson' },
  { name: 'm-increase-marker', at: { x: 0, z: 80 }, yaw: N,
    note: 'the INCREASE RING boundary, where the empty band ends' },
  { name: 'n-screenhouses', at: { x: -40, z: 62 }, yaw: -Math.PI * 0.75,
    note: 'the screenhouses, in the ring whose radius is why they work' },
  { name: 'o-increase-arc', at: { x: -58, z: -20 }, yaw: N,
    note: 'the increase ring from inside it: smaller plots, one accession each' },

  // ------------------------------------------------------------ the centre
  { name: 'p-inner-buffer', at: { x: 0, z: 34 }, yaw: N,
    note: 'the last buffer, and the crossing block alone at the middle of it' },
  { name: 'q-crossing', at: { x: 0, z: 22 }, yaw: N,
    note: 'the crossing block: the most isolated point on the site, by design' },
  { name: 'r-centre-out', at: { x: 0, z: -12 }, yaw: N,
    note: 'from the centre looking out — rings, cliff, and sea past them' },
  { name: 's-centre-sea', at: { x: -8, z: 6 }, yaw: W,
    note: 'west from the centre: every ring in one frame, ending at the water' },

  // --------------------------------------------------------------- the edge
  // North-west, clear of the shelterbelt. The first version of this viewpoint
  // stood inside a tree, which is what a soft collider stops the player doing
  // and does not stop a teleport doing.
  { name: 't-cliff', at: { x: -108, z: -108 }, yaw: Math.PI * 0.25,
    note: 'the cliff edge and its fence, with open sea beyond' },
];

export default VIEWS;
