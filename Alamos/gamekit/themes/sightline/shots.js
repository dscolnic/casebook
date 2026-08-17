// shots.js — the views worth photographing in the Hallam Exchange.
//
// The derived views (one per room, from plan.js) are 46 of them, and rendering a
// 54 m hall with two open bays in it under SwiftShader forty-six times is slower
// than it is useful. These are the views that say what the building is, and the
// first four are the whole idea of the game: the hall seen down its own length,
// with the two case marks in it.
//
// Yaw is in degrees here: 0 looks along −z (down the hall toward the corner),
// 180 looks back up it, 90 looks west, 270 east.
export const shots = [
  { name: 'hall-from-the-north', at: { x: 0, z: 39 }, yaw: 0,
    note: 'the spawn: the whole hall, with the shopfront at the far end of it' },
  { name: 'hall-the-two-marks', at: { x: 0, z: 30 }, yaw: 0,
    note: 'both case marks in one frame — 34 m in blue, 22 m in red beyond it' },
  { name: 'on-the-34-metre-mark', at: { x: 0, z: 24.7 }, yaw: 0,
    note: 'standing where the survey puts the witness, looking at the doorway' },
  { name: 'on-the-22-metre-mark', at: { x: 0, z: 12.5 }, yaw: 0,
    note: 'standing where the file put her for seven years' },
  { name: 'the-corner', at: { x: 0, z: 4 }, yaw: 0,
    note: 'the reconstruction at ten metres: fascia, window, doorway, kerb' },
  { name: 'the-doorway', at: { x: -0.9, z: -3.5 }, yaw: 0,
    note: 'the doorway itself, from inside the bay' },
  { name: 'the-column', at: { x: 2.2, z: -1.5 }, yaw: 0,
    note: 'column 4471, standing where the survey puts it and dark' },
  { name: 'the-bay-from-the-kerb', at: { x: -5.5, z: 1 }, yaw: 0,
    note: 'the west bay: survey bench, tripod, lamp channels' },
  { name: 'hall-looking-back', at: { x: 0, z: -5 }, yaw: 180,
    note: 'from the corner, back up the hall the way the review works' },
  { name: 'identification-suite', at: { x: 3.7, z: 8.5 }, yaw: 270,
    note: 'the rig room, from the corridor wall' },
  { name: 'the-rig', at: { x: 6.6, z: 12 }, yaw: 0,
    note: 'six standing positions and the bench they are viewed from' },
  { name: 'observation-room', at: { x: 6.6, z: 16.5 }, yaw: 0,
    note: 'the one-way glass, from the dark side of it' },
  { name: 'deliberation-room', at: { x: 3.7, z: 22.5 }, yaw: 270,
    note: 'twelve chairs, a table and a camera on a pole' },
  { name: 'data-room', at: { x: 9.5, z: 31 }, yaw: 90,
    note: 'norms, transcripts and the four questions on the wall' },
  { name: 'records-store', at: { x: 6.6, z: 41 }, yaw: 0,
    note: 'three hundred and eighteen boxes in the order they arrived' },
  { name: 'interview-suite-a', at: { x: -3.7, z: 8 }, yaw: 90,
    note: 'a table, two chairs and a recorder with a visible clock' },
  { name: 'dark-adaptation-booth', at: { x: -6.6, z: 22.5 }, yaw: 0,
    note: 'the light trap, and the bench behind it' },
  { name: 'physiology-bay', at: { x: -3.7, z: 28.5 }, yaw: 90,
    note: 'custody records on one screen and the booth through the door' },
];

export default shots;
