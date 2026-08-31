// fixtures.js — the objects the questions are actually about.
//
// A fixture is a thing standing in a room that a question is asked AT. It is
// declared by name and wall and never by coordinate: `interiorFixtures.js`
// computes the position from `room.bounds`, which is the only thing that knows
// where this room's walls are. See gamekit/PLACEMENT_PASS.md.
//
//   build:  'vessel' | 'rack' | 'bench' | 'board'
//   wall:   'left' | 'right' | 'back'    (mirrored with the room, like the fit-out)
//   along:  -1 … 1, where along that wall. 0 is the middle.
//
// A lesson points at one with `at: <id>` in books/carrying.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before. Every
// fixture here is pointed at by a lesson or carries a `from:`/`until:` — a
// declared fixture nothing is asked at is a prop, and `placement.mjs` says so.
export const FIXTURES = {
  HARB: [
    { id: 'landings-book', name: 'The landings book', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Nineteen years of it, by hand, with the column the electronic one loses.' },
    { id: 'fee-desk', name: 'The landing fee desk', build: 'board', wall: 'back', along: 0.35,
      caption: 'What every tonne over the rail pays, and what the fees are spent on.' },
  ],
  WATER: [
    { id: 'rain-bench', name: 'The rain gauge bench', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Fourteen years of readings taken by hand at seven, because the automatic one under-reads in wind.' },
    { id: 'store-gauges', name: 'The store gauges', build: 'board', wall: 'back', along: -0.3,
      caption: 'The borehole meter, the tank levels, and the chloride trace under both.' },
  ],
  COMMON: [
    { id: 'soil-bench', name: 'The soil bench', build: 'bench', wall: 'left', along: -0.45,
      caption: 'Cores off the common, laid out in the order they came out of the pit.' },
    { id: 'windrow-panel', name: 'The windrow panel', build: 'board', wall: 'back', along: 0.4,
      caption: 'Salinity and temperature down the compost heap, week by week.' },
    { id: 'nitrogen-bench', name: 'The nitrogen bench', build: 'bench', wall: 'right', along: 0.3,
      caption: 'Clover, imported fertiliser, dung and compost, weighed separately.' },
    { id: 'common-map', name: 'The plan of the common', build: 'board', wall: 'back', along: -0.35,
      caption: 'Forty-one shares over sixty-two hectares, with the plant list pinned beside it.' },
  ],
  TIP: [
    { id: 'leachate-bench', name: 'The leachate bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'The collection sump\'s log, kept because the hole is up-catchment of the borehole.' },
    { id: 'weighbridge', name: 'The weighbridge readout', build: 'board', wall: 'back', along: 0.3,
      caption: 'Everything that arrives, weighed. Two hundred and four tonnes last year.' },
    { id: 'lab-bench', name: 'The sample bench', build: 'bench', wall: 'right', along: 0.35,
      caption: 'The stream below the tip, in three sets of units nobody has reconciled.' },
    // The cell that should have been capped this summer. The cap goes on when the
    // volume plan is settled, which is the ending card's own claim standing in a room.
    { id: 'open-cell-frame', name: 'The uncapped cell frame', build: 'rack', wall: 'right', along: -0.75,
      until: 10, caption: 'Waiting on this year\'s money. Until it is capped the cell vents where it likes.' },
  ],
  POWER: [
    { id: 'meter-board', name: 'The demand board', build: 'board', wall: 'back', along: 0,
      caption: 'Four years of half-hourly demand, and the July evening that sizes the plant.' },
    { id: 'fuel-bench', name: 'The fuel ledger', build: 'bench', wall: 'left', along: -0.35,
      caption: 'Every delivery note for the year, and what came out of the sets against it.' },
    { id: 'turbine-plate', name: 'The turbine plate and log', build: 'board', wall: 'right', along: 0.3,
      caption: '250 kilowatts on the plate, and the last full year it actually ran.' },
    // The gearbox, once it is bought. The pack settles it on day 12.
    { id: 'gearbox-crate', name: 'The gearbox, crated', build: 'rack', wall: 'left', along: 0.7,
      from: 13, caption: 'Eleven weeks to fit, and two years of waiting behind it.' },
  ],
  REEF: [
    { id: 'transect-bench', name: 'The transect bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Eleven springs of cover on eleven lines, the longest record on the island.' },
    { id: 'flow-tank', name: 'The flow tank', build: 'vessel', wall: 'right', along: 0.3,
      caption: 'Holds a reef fragment at a set temperature for six weeks at a time.' },
    { id: 'water-rack', name: 'The bay water rack', build: 'rack', wall: 'back', along: 0.3,
      caption: 'Temperature, dissolved oxygen and nitrate off the inner bay, month by month.' },
  ],

  // ---- SITED CALLS: fixtures in places that are not areas.
  //
  // A stop whose `at:` resolves under one of these keys is asked THERE. The
  // question still belongs to its own area — the dose question is still the
  // Waterworks' question about the network — and the player is sent to the school
  // because that is where the tap and the children are. `sitedAt` resolves it,
  // `callLabel` prints "Go to the Island School", and the case opens against the
  // area as it always did. Each of these three buildings was modelled, lit and
  // shut before this: `access.js` now names and opens them on the day something
  // is first sent to them.
  SCHOOL: [
    { id: 'school-tap', name: 'The school tap', build: 'vessel', wall: 'left', along: -0.25,
      caption: 'Sampled separately since Nkemdi asked three times. The highest reading on the network.' },
    { id: 'register-desk', name: 'The register desk', build: 'bench', wall: 'back', along: 0.2,
      caption: 'Nineteen names, ages five to eleven, and two of them leaving in August.' },
  ],
  BERTH: [
    { id: 'berth-standpipe', name: 'The berth standpipe', build: 'vessel', wall: 'left', along: -0.2,
      caption: 'Where a sailing takes on fresh water. Six cubic metres a crossing.' },
  ],
  CHAPEL: [
    { id: 'pack-table', name: 'The council table', build: 'bench', wall: 'back', along: 0,
      caption: 'Where the pack is read out at seven. Nine seats, four of them undecided.' },
  ],
};

export default FIXTURES;
