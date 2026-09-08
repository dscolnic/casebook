// fixtures.js — the objects the questions are about, for Headwater.
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
  STORE: [
    { id: 'storage-board', name: 'A blue storage curve', build: 'board', wall: 'back', along: 0,
      caption: "A blue storage curve, three pencilled flood marks, and today's operating line." },
    { id: 'level-desk', name: 'The live reservoir level', build: 'bench', wall: 'left', along: 0,
      caption: "The live reservoir level, sensor-offset slips, and a brass ruler worn smooth at 206 metres." },
    { id: 'release-ledger', name: 'Bound hourly release sheets', build: 'rack', wall: 'right', along: 0,
      caption: "Bound hourly release sheets, their wet corners held down with old gate keys." },
    { id: 'survey-rack', name: 'Rolled sonar transects tagged by date', build: 'rack', wall: 'back', along: -0.45,
      caption: "Rolled sonar transects tagged by date, crew, and the gaps nobody signed." },
    { id: 'control-bench', name: 'Two linked control dials', build: 'bench', wall: 'left', along: -0.45,
      caption: "Two linked control dials, one level display, and no label claiming which dial did the work." },
  ],
  INFLOW: [
    { id: 'trace-bench', name: 'trace bench', build: 'bench', wall: 'back', along: 0,
      caption: "Rain and inflow traces laid beneath a straightedge, with the crest still beyond the paper." },
    { id: 'gauge-wall', name: 'Every basin gauge at once: river-blue lines', build: 'board', wall: 'left', along: 0,
      caption: "Every basin gauge at once: river-blue lines, one red alarm mark, and one silent channel." },
    { id: 'high-ground-gauge', name: 'The ridge instrument in its dented housing', build: 'vessel', wall: 'right', along: 0,
      caption: "The ridge instrument in its dented housing, still beaded with rain." },
    { id: 'forecast-drawer', name: 'Sealed forecast runs', build: 'rack', wall: 'back', along: -0.45,
      caption: "Sealed forecast runs, each stamped with the data cutoff used to make it." },
    { id: 'water-ledger', name: 'Inflow', build: 'board', wall: 'left', along: -0.45,
      caption: "Inflow, release, evaporation, and storage change written in four columns that must close." },
    { id: 'staging-console', name: 'Three release stages', build: 'bench', wall: 'right', along: -0.45,
      caption: "Three release stages, a locked commit key, and the downstream response returning live." },
  ],
  GATES: [
    { id: 'discharge-board', name: 'Gate opening', build: 'board', wall: 'back', along: 0,
      caption: "Gate opening, head, and discharge curves overlaid in grease pencil." },
    { id: 'hoist-stand', name: 'The gate hoist', build: 'vessel', wall: 'left', along: 0,
      caption: "The gate hoist, its travel scale, and a handwheel polished by emergency drills." },
    { id: 'trigger-board', name: 'trigger board', build: 'board', wall: 'right', along: 0,
      caption: "The signed opening limits and the alarm thresholds they drive." },
    { id: 'maintenance-rack', name: 'Calibration bars', build: 'rack', wall: 'back', along: -0.45,
      caption: "Calibration bars, linkage gauges, and the last mechanic's correction sheet." },
  ],
  SAFE: [
    { id: 'arrival-map', name: 'arrival map', build: 'board', wall: 'back', along: 0,
      caption: "The river reach unrolled beneath settlement pins and pencilled arrival times." },
    { id: 'warning-list', name: 'Call sheets ordered by consequence', build: 'rack', wall: 'left', along: 0,
      caption: "Call sheets ordered by consequence, with acknowledgement boxes still empty." },
    { id: 'settlement-circuits', name: 'Four settlement circuits', build: 'board', wall: 'right', along: 0,
      caption: "Four settlement circuits, their siren status, and the road each warning must beat." },
    { id: 'radio-desk', name: 'Two radios', build: 'bench', wall: 'back', along: -0.45,
      caption: "Two radios, the approved warning script, and a clock set to river time." },
  ],
  STRUCT: [
    { id: 'uplift-wall', name: 'Piezometer pressure along the wall', build: 'board', wall: 'back', along: 0,
      caption: "Piezometer pressure along the wall, one quiet sensor, and yesterday's chalk envelope." },
    { id: 'weir-bench', name: 'The seepage weir', build: 'bench', wall: 'left', along: 0,
      caption: "The seepage weir, measured head marks, and a notebook swollen by spray." },
    { id: 'transect-rack', name: 'transect rack', build: 'rack', wall: 'right', along: 0,
      caption: "Independent pressure transects filed apart so one bad line cannot tutor the next." },
    { id: 'drain-console', name: 'Cooling and drain controls sharing one panel', build: 'vessel', wall: 'back', along: -0.45,
      caption: "Cooling and drain controls sharing one panel, with both settings visible at once." },
  ],
  POWER: [
    { id: 'machine-board', name: 'Turbine demand', build: 'board', wall: 'back', along: 0,
      caption: "Turbine demand, head, efficiency, and reserve traced across the shift." },
    { id: 'dispatch-console', name: 'dispatch console', build: 'bench', wall: 'left', along: 0,
      caption: "The release allocation sliders beside the price strip and the reserve floor." },
    { id: 'runner-crate', name: 'A spare runner shell', build: 'rack', wall: 'right', along: 0,
      caption: "A spare runner shell, section drawings, and dimensions stencilled on the timber." },
    { id: 'work-meter', name: 'The service hoist meter with load', build: 'vessel', wall: 'back', along: -0.45,
      caption: "The service hoist meter with load, height, and accumulated work on separate dials." },
    // Two calls — day 5's rising head and day 12's halving — were asked AT this
    // and it was declared nowhere, so `placement.mjs` had them being asked at a
    // thing the powerhouse does not contain. The penstock gauge is where a
    // machine floor actually reads its head: at the top of the pipe, before the
    // water reaches the runner.
    { id: 'penstock-gauge', name: 'The head gauge at the top of the penstock', build: 'vessel',
      wall: 'right', along: -0.45,
      caption: "Head at the machine, logged every hour, beside the pressure the pipe was rated to." },
  ],
  FOREARCH: [
    { id: 'frozen-models', name: 'Forecast versions frozen at issuance', build: 'rack', wall: 'back', along: 0,
      caption: "Forecast versions frozen at issuance, never overwritten by what happened later." },
    { id: 'holdout-drawer', name: 'holdout drawer', build: 'rack', wall: 'left', along: 0,
      caption: "Unopened crest observations under a paper seal bearing Imani's initials." },
    { id: 'residual-plot', name: 'Residuals pinned by forecast run', build: 'board', wall: 'right', along: 0,
      caption: "Residuals pinned by forecast run, including the pattern the summary score hides." },
  ],
};
