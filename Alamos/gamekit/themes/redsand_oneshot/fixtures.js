// fixtures.js — the objects the questions are about, for Red Sand: Full Tank.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls actually are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/redsand_oneshot.yml. A lesson
// that points at nothing is answered at the case stand.
//
// The six AREAS come first, then the eight places that are not areas. A stop
// whose `at:` resolves under any key but its own group is SITED there — the
// question still belongs to its area, and the player is sent to where the object
// stands. `sitedAt` in engine/world/siting.js resolves it and `callLabel` prints
// "Go to the Hydrogen Store". Fourteen places, which is the process diagram in
// section 3 of the campaign bible made walkable.
export const FIXTURES = {
  // ---- Plant Control: ledgers, allocation, command decisions.
  GIBBS: [
    { id: 'ledger', name: 'The carbon ledger', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Carbon in, carbon accounted for, and a magnet labelled Do not explain yet.' },
    { id: 'loadboard', name: 'The load board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every load on the plain, and the order they come off.' },
    { id: 'sample-tray', name: 'The sample tray', build: 'bench', wall: 'left', along: 0.2,
      caption: "Yesterday's samples, and four sealed cards beside them." },
    { id: 'conv-board', name: 'The conversion board', build: 'board', wall: 'back', along: -0.5,
      caption: 'Molar masses, Avogadro’s number, and a shortfall still written in kilograms.' },
    { id: 'unit-board', name: "The technician's spreadsheet", build: 'bench', wall: 'right', along: -0.2,
      caption: 'Molecules reported straight off a scale reading, with the formula cells erased.' },
    { id: 'review-board', name: 'The plant review board', build: 'board', wall: 'right', along: 0.45,
      caption: 'Every panel in the plant, printed side by side for the first time.' },
    { id: 'rate-table', name: 'The initial-rate table', build: 'bench', wall: 'back', along: 0.75,
      caption: 'Three trials, two concentrations and one rate apiece.' },
    { id: 'plan-board', name: 'The operating-point board', build: 'board', wall: 'left', along: 0.6,
      caption: 'Two plans on one plot, and the same rate index under both.' },
  ],

  // ---- Reactor Hall: the Sabatier loop, its heat and its balance.
  EQUIL: [
    { id: 'skid', name: 'The reactor loop skid', build: 'vessel', wall: 'left', along: -0.5,
      caption: 'The loop, the recycle line, and the valve that sets the pass.' },
    { id: 'analyser', name: 'The gas analyser', build: 'board', wall: 'back', along: -0.4,
      caption: 'What comes out of the bed, read continuously and modelled two ways.' },
    { id: 'residual-field', name: "The analyser's residual field", build: 'board', wall: 'back', along: 0.2,
      caption: 'Observed minus predicted, one dot per interval, laid out on the plant plan.' },
    { id: 'bed-head', name: 'The bed and its thermowell', build: 'vessel', wall: 'left', along: 0.3,
      caption: 'The tray of catalyst, and the line that reads how hot it is running.' },
    { id: 'heat-bench', name: 'The calorimetry bench', build: 'bench', wall: 'right', along: 0.35,
      caption: 'Coolant mass, specific heat, and a temperature rise across one interval.' },
    { id: 'heat-model-board', name: 'The heat-model board', build: 'board', wall: 'right', along: -0.6,
      caption: 'A water slug that arrives late, on cards, with the phase change loose.' },
    { id: 'ice-board', name: 'The ICE board', build: 'board', wall: 'back', along: 0.75,
      caption: 'Initial, change, equilibrium, and one row still blank.' },
  ],

  // ---- Cold End: drying, condensing, and what sticks where.
  PHASE: [
    { id: 'coldline', name: 'The cold line', build: 'vessel', wall: 'left', along: -0.45,
      caption: '283 K to 115 K, in one run of pipe.' },
    { id: 'coldline-tap', name: 'The condensate tap', build: 'vessel', wall: 'left', along: 0.5,
      caption: 'Where product water is taken out of the gas, and the valve that decides how much.' },
    { id: 'fridge', name: 'The refrigerator', build: 'rack', wall: 'right', along: -0.3,
      caption: 'Compressor, condenser, and the radiator it hands heat to.' },
    { id: 'phase-radiator', name: 'The radiator loop panel', build: 'board', wall: 'right', along: 0.6,
      caption: 'Heat in, heat out, and a bank that has been losing capacity for nine sols.' },
  ],

  // ---- Catalyst Bay: rate, the bed, and what stops it working.
  KINET: [
    { id: 'bed', name: 'The Sabatier bed', build: 'vessel', wall: 'left', along: -0.4,
      caption: 'A lagged vessel with sample ports down its side, inlet to outlet.' },
    { id: 'charge-bench', name: 'The catalyst bench', build: 'bench', wall: 'back', along: 0.45,
      caption: 'Two charges: one spent, one still in its can.' },
    { id: 'bed-log', name: 'The bed log', build: 'board', wall: 'back', along: -0.5,
      caption: 'Flow, temperature and contact time, printed every sol.' },
    { id: 'model-rail', name: 'The molecular model rail', build: 'rack', wall: 'right', along: 0.3,
      caption: 'Four structures on a rail, and a chain of inferences nobody has written down.' },
    { id: 'model-desk', name: 'The property-card desk', build: 'bench', wall: 'right', along: -0.55,
      caption: 'Shape, polarity and dominant force, on four blank cards.' },
    { id: 'cartridge', name: 'The separation cartridge', build: 'vessel', wall: 'left', along: 0.55,
      caption: 'A nonpolar coating, a temperature jacket, and three substances to push through it.' },
  ],

  // ---- Water Plant: ice, brine, ions and what comes out of them.
  SOIL: [
    { id: 'hopper', name: 'The regolith hopper', build: 'rack', wall: 'left', along: -0.45,
      caption: 'One charge at a time, heated until it gives up its water.' },
    { id: 'columns', name: 'The polishing columns', build: 'vessel', wall: 'right', along: 0.3,
      caption: 'Ion-exchange resin, a particle filter, and a fixed number of sites.' },
    { id: 'brinetank', name: 'The brine holding tank', build: 'vessel', wall: 'back', along: -0.35,
      caption: 'A dosing head, a pH probe, and two hundred millilitres of argument.' },
    { id: 'water-report', name: 'The water report desk', build: 'bench', wall: 'back', along: 0.4,
      caption: 'Two bottles, one alarm label, and a chloride figure nobody has checked.' },
    { id: 'spectro', name: 'The spectrophotometer', build: 'bench', wall: 'right', along: -0.6,
      caption: 'Four hundred to seven hundred nanometres, and a sealed standard beside it.' },
    { id: 'assay-desk', name: 'The assay desk', build: 'bench', wall: 'left', along: 0.5,
      caption: 'A quarter-litre recycle sample and a balance reading in milligrams.' },
  ],

  // ---- Electrolysis Hall: charge in, hydrogen and oxygen out.
  ELEC: [
    { id: 'stack', name: 'The water stack', build: 'rack', wall: 'left', along: -0.35,
      caption: 'Cells in series. Hydrogen one side, oxygen the other, and a power controller under it.' },
    { id: 'stack-sheet', name: "The stack's charge sheet", build: 'board', wall: 'back', along: 0.2,
      caption: 'Amps, hours, current efficiency, and what the separator actually caught.' },
    { id: 'volt-sheet', name: "The stack's voltage marks", build: 'board', wall: 'left', along: 0.4,
      caption: 'Three numbers on one sheet, and the gap between them.' },
    { id: 'cell-diagram', name: 'The cell diagram', build: 'board', wall: 'right', along: 0.4,
      caption: 'One cell drawn out in section, with its four parts marked and unlabelled.' },
  ],

  // ---- SITED CALLS: fixtures in places that are not areas.
  INTAKE: [
    { id: 'compressors', name: 'The intake compressors', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Six millibars in, twelve bar out. Everything the plant makes starts here.' },
    { id: 'stoich-board', name: 'The stoichiometry board', build: 'board', wall: 'back', along: -0.3,
      caption: 'Five cards, and a warning that the coefficients on the wall compare particles.' },
    { id: 'log-desk', name: 'The compressor log desk', build: 'bench', wall: 'right', along: 0.3,
      caption: "A whole shift's capture, in kilograms, against a schedule written in kilograms." },
  ],
  HSTORE: [
    { id: 'store-scales', name: 'The hydrogen scales', build: 'board', wall: 'back', along: 0,
      caption: 'What the stacks actually delivered, weighed rather than inferred.' },
    { id: 'sample-ports', name: 'The three sampling ports', build: 'vessel', wall: 'left', along: -0.3,
      caption: 'Headspace, regulator outlet and reactor branch, with a portable analyser on a lead.' },
    { id: 'jacket-heater', name: 'The jacket heater and logger', build: 'rack', wall: 'right', along: 0.2,
      caption: 'Thirty kelvin of warming, on a sealed sample of fixed volume.' },
  ],
  TANKS: [
    { id: 'farm-gauges', name: 'The tank farm gauges', build: 'board', wall: 'back', along: 0,
      caption: 'Three cryogenic tanks, and every channel that claims one is ready.' },
    { id: 'umbilical', name: 'The transfer umbilical', build: 'vessel', wall: 'left', along: -0.3,
      caption: 'The line the batch goes across on. It only runs one way.' },
  ],
  ASSAY: [
    { id: 'spec-bench', name: 'The specification bench', build: 'bench', wall: 'back', along: 0,
      caption: 'Four assay lines against four flight limits, and one sealed standard in a drawer.' },
    { id: 'assay-review', name: 'The assay review board', build: 'board', wall: 'left', along: -0.3,
      caption: 'Pressure, mass, composition and drier pressure drop, all on one wall.' },
  ],
  ARRAY: [
    { id: 'array-controller', name: 'The array controller', build: 'board', wall: 'back', along: 0,
      caption: 'Optical depth read straight off the sky, and the current it leaves you.' },
  ],
  BATT: [
    { id: 'cell-stacks', name: 'The battery stacks', build: 'rack', wall: 'left', along: -0.2,
      caption: 'What the array leaves behind, and the floor nobody is allowed to go under.' },
  ],
  CUT: [
    { id: 'rover-sampler', name: 'The rover sampler', build: 'bench', wall: 'left', along: -0.2,
      caption: 'A sealed field blank and a source vial, taken where the ice is actually dug.' },
    { id: 'process-map', name: 'The process map', build: 'board', wall: 'back', along: 0.2,
      caption: 'The whole plant on one sheet, with the return line drawn in pencil.' },
  ],
  PAD: [
    // RIGHT WALL, not the back one. The delivery board is built on PAD's back wall
    // and fills it: a board declared there renders behind the thing the whole
    // fortnight is counted on, which is the sign-behind-a-canopy tripwire.
    { id: 'cert-console', name: 'The certification console', build: 'board', wall: 'right', along: 0.2,
      caption: 'Four flight limits, and the switch that says the vehicle may fly.' },
    { id: 'pad-table', name: 'The pad conference table', build: 'bench', wall: 'left', along: -0.3,
      caption: 'Where the last plan is argued, thirty metres from the vehicle.' },
  ],
};
