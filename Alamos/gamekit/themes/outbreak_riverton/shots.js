// shots.js — where to stand to photograph this campus.
//
// `engine/dev/shots.mjs` reads this. Without it the tool turns on the spot at
// the spawn, which is one courtyard out of the six places on this site that
// carry the story: the ambulance bays, the triage court, the decon tunnel, the
// swab line, the gate, and the service side.
//
// Yaw is the game's: forward is (−sin θ, 0, −cos θ). θ = 0 looks toward −z,
// north up the spine at the operations room; θ = π looks back south at the
// apron and the ambulance bays.
const N = 0;                 // toward −z, up the spine
const S = Math.PI;           // toward +z, down at the apron
const E = -Math.PI / 2;      // toward +x
const W = Math.PI / 2;       // toward −x

export const VIEWS = [
  { name: 'spawn--north', at: { x: 0, z: 44 }, yaw: N,
    note: 'the first ten seconds: triage court, decon tunnel, operations beyond' },
  { name: 'spawn--south', at: { x: 0, z: 44 }, yaw: S,
    note: 'behind the player at the spawn — the apron and the container labs' },

  { name: 'apron--west-bays', at: { x: -30, z: 33 }, yaw: W,
    note: 'ambulance bays 1–2, cones and bay markings, trolley at the doors' },
  { name: 'apron--east-bays', at: { x: 30, z: 33 }, yaw: E,
    note: 'bays 3–4 and the container labs behind them' },
  { name: 'apron--along', at: { x: -50, z: 36 }, yaw: E,
    note: 'the whole apron in one line: four ambulances, one waiting' },

  { name: 'triage--red', at: { x: -10, z: 17 }, yaw: S,
    note: 'the red tent from inside the queue — zone sign, barriers, spacing marks' },
  { name: 'triage--yellow', at: { x: 10, z: 17 }, yaw: S,
    note: 'the yellow tent, same queue treatment' },
  { name: 'triage--court', at: { x: 0, z: 26 }, yaw: N,
    note: 'both tents and the mouth of the decon tunnel' },

  { name: 'decon--entrance', at: { x: 0, z: 20 }, yaw: N,
    note: 'PPE sign, placards either side of the mouth, beacons' },
  { name: 'decon--exit', at: { x: 0, z: -2 }, yaw: S,
    note: 'the doffing end, looking back down the tunnel' },

  { name: 'ops--front', at: { x: 0, z: 4 }, yaw: N,
    note: 'operations, with the case-definition sign on the way in' },

  { name: 'swab--line', at: { x: -17, z: -30 }, yaw: N,
    note: 'the swab line: barrier lanes, marks, blue suits' },
  { name: 'northcourt--wide', at: { x: 0, z: -48 }, yaw: N,
    note: 'the north court, both sampling tents and the gate beyond' },

  { name: 'gate--inside', at: { x: 0, z: -60 }, yaw: N,
    note: 'screening at the gate: beacons, doffing table, placards on the fence' },
  { name: 'gate--outside', at: { x: 0, z: -82 }, yaw: S,
    note: 'from outside the fence, the way the city sees it' },

  { name: 'service--waste', at: { x: -46, z: -34 }, yaw: W,
    note: 'the clinical waste line and its placards' },
  { name: 'field--station', at: { x: -6, z: -172 }, yaw: N,
    note: 'the long hike north, with the ambulance parked at the field station' },
];

export default VIEWS;
