// fixtures.js — the objects the questions are about, for Ground Truth.
//
// GENERATED from the campaign bible by tools/build-fixtures.mjs. Every id, place,
// kind and caption is the bible's; `wall` and `along` are this file's, because
// they are about the room rather than the object. Look at them with
// `npm run shots` before believing the arrangement — see gamekit/INTERIORS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'
//   along:  -1 … 1 along that wall. 0 is the middle.
export const FIXTURES = {
  SHOT: [
    { id: 'launch-board', name: 'The shot sequence', build: 'board', wall: 'back', along: 0,
      caption: "The shot sequence, crew-clear lamps, and the red hold bar Ortiz reaches for before anyone else." },
    { id: 'radar-desk', name: 'Live storm returns', build: 'bench', wall: 'left', along: 0,
      caption: "Live storm returns, field traces, and three clocks that have never quite agreed." },
    { id: 'record-desk', name: 'The bound report', build: 'bench', wall: 'right', along: 0,
      caption: "The bound report, the current ledger, and every signature still missing from the final page." },
    { id: 'reference-panel', name: 'Mill references A through D', build: 'board', wall: 'back', along: -0.45,
      caption: "Mill references A through D, their common feed, and a hand-marked route into the control rack." },
  ],
  FIELD: [
    { id: 'mill-array', name: 'Four field mills facing the storm', build: 'vessel', wall: 'back', along: 0,
      caption: "Four field mills facing the storm, with the reference unit set apart only by a strip of yellow paint." },
    { id: 'mill-bench', name: 'Calibration plates', build: 'bench', wall: 'left', along: 0,
      caption: "Calibration plates, wet-weather logs, and Ravi's pencil calculations under a clear cover." },
    { id: 'storm-profile-board', name: 'The cloud base', build: 'board', wall: 'right', along: 0,
      caption: "The cloud base, charge layers, and every altitude estimate the present storm will permit." },
  ],
  MAST: [
    { id: 'mast-desk', name: 'Mast drawings', build: 'bench', wall: 'back', along: 0,
      caption: "Mast drawings, tip geometry, and a copper model scarred by old test arcs." },
    { id: 'cabinet', name: 'The shielding cabinet', build: 'vessel', wall: 'left', along: 0,
      caption: "The shielding cabinet, its bonded door, and the remote cable entering through the lower gland." },
    { id: 'shunt-rack', name: 'Three current shunts', build: 'rack', wall: 'right', along: 0,
      caption: "Three current shunts, one spare, and the labels that decide which path enters the ledger." },
    { id: 'strike-ledger', name: 'Every measured branch of the last strike', build: 'board', wall: 'back', along: -0.45,
      caption: "Every measured branch of the last strike, with one unexplained current left in red." },
  ],
  BANK: [
    { id: 'hall-board', name: 'The Marx topology', build: 'board', wall: 'back', along: 0,
      caption: "The Marx topology, stage voltages, and Strand's running account of where the energy can go." },
    { id: 'bank-stages', name: 'The charged stages behind the safety rail', build: 'vessel', wall: 'left', along: 0,
      caption: "The charged stages behind the safety rail, each capacitor numbered in order." },
    { id: 'gap-row', name: 'Adjustable spark gaps in a steel row', build: 'rack', wall: 'right', along: 0,
      caption: "Adjustable spark gaps in a steel row, with Stage 7's timing marks darker than the rest." },
    { id: 'earthing-stick-rack', name: 'Discharge sticks', build: 'rack', wall: 'back', along: -0.45,
      caption: "Discharge sticks, lockout tags, and an empty hook that means the bank is not safe to touch." },
  ],
  EARTH: [
    { id: 'loop-bench', name: 'A scale plan of the buried loop', build: 'bench', wall: 'back', along: 0,
      caption: "A scale plan of the buried loop, cable lengths, and the archived storm trace clipped beside it." },
    { id: 'earth-cert', name: 'The April resistance certificate', build: 'board', wall: 'left', along: 0,
      caption: "The April resistance certificate, its test current, and the dry-weather conditions in small print." },
    { id: 'conduit-bond', name: 'The bonded conduit crossing the trench', build: 'vessel', wall: 'right', along: 0,
      caption: "The bonded conduit crossing the trench, warm at the coupling and bright where the clamp was moved." },
    { id: 'bond-rail', name: 'Earth straps and test links arranged by branch', build: 'rack', wall: 'back', along: -0.45,
      caption: "Earth straps and test links arranged by branch, with space to isolate one path at a time." },
  ],
  SCREEN: [
    { id: 'record-budget', name: 'Channel bandwidths', build: 'board', wall: 'back', along: 0,
      caption: "Channel bandwidths, rise-time limits, and the recorder budget Noor refuses to round away." },
    { id: 'recorder-rack', name: 'recorder rack', build: 'rack', wall: 'left', along: 0,
      caption: "Fast and slow recorders sharing a trigger shelf, each with its last calibration seal." },
    { id: 'shield-bench', name: 'Feedthroughs', build: 'bench', wall: 'right', along: 0,
      caption: "Feedthroughs, terminators, and a screened test loop laid out for comparison." },
    // Declared here because two lessons already point at it. The placement pass
    // sited day 1 ("Ideal shield, real door") and day 6 ("Which failure
    // mechanism fits the survivors too?") at `sheet-cage` and never wrote the
    // fixture, so both stops named an object this room does not have — which
    // `npm run check` fails on and which renders as a question asked at nothing.
    // The room itself is the shielded volume; this is the small one on the
    // bench, with the door and the probe you can watch the reading fall on.
    { id: 'sheet-cage', name: 'The test cage and its door seam', build: 'vessel', wall: 'back', along: -0.45,
      caption: "A bench-sized cage of the same bonded sheet, its fingerstocked door, and the probe left inside reading tens of volts a metre against four thousand outside." },
  ],
  COUPLE: [
    { id: 'trailer-cards', name: 'Cards A through F', build: 'rack', wall: 'back', along: 0,
      caption: "Cards A through F, their damage photographs, and Card E still tagged for a second look." },
    { id: 'cable-bay', name: 'The incoming trunk', build: 'vessel', wall: 'left', along: 0,
      caption: "The incoming trunk, rack-local loop, and conduit route exposed behind the open side panel." },
    { id: 'probe-rack', name: 'Insulated probes at each card position', build: 'rack', wall: 'right', along: 0,
      caption: "Insulated probes at each card position, with expected and observed readings clipped to every lead." },
    { id: 'repair-board', name: 'The final repair scope', build: 'board', wall: 'back', along: -0.45,
      caption: "The final repair scope, cost lines, and the blank certification box for Station 12." },
  ],
};
