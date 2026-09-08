// fixtures.js — the objects the questions are about, one per area's worth of work.
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
// A lesson points at one with `at: <id>` in books/redsand.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before.
export const FIXTURES = {
  KINET: [
    { id: 'bed', name: 'The Sabatier bed', build: 'vessel', wall: 'left', along: -0.4,
      caption: 'A lagged vessel with a thermowell line down its side.' },
    { id: 'charge-bench', name: 'The catalyst bench', build: 'bench', wall: 'back', along: 0.45,
      caption: 'Two charges: one spent, one still in its can.' },
    // Gone once the spare charge is commissioned on sol 10 — the crate it came in.
    // Sol 295 is worked from this bay: the cold end's procedure is sent up to be
    // checked rather than read at the pipe.
    // Sol 297 and sol 299: what the analyser and the water trace say about this bed,
    // brought to the bay where the bed is.
    { id: 'co-trace', name: 'The carbon monoxide trace', build: 'board', wall: 'back', along: -0.3,
      caption: 'Nine sols of it, climbing every time the bed is turned up.' },
    { id: 'water-trace', name: 'The conductivity trace', build: 'bench', wall: 'left', along: 0.5,
      caption: 'Every sol since the plant started, printed and never read.' },
    { id: 'coldend-card', name: 'The cold end procedure', build: 'board', wall: 'right', along: 0.3,
      caption: 'Four stages on cards, sent up while the line is rebuilt.' },
    { id: 'kinet-crate', name: 'The spare charge, crated', build: 'bench', wall: 'right', along: -0.7,
      until: 11, caption: 'Still strapped. There is no second one on this planet.' },
  ],
  EQUIL: [
    { id: 'skid', name: 'The reactor loop skid', build: 'vessel', wall: 'left', along: -0.5,
      caption: 'The loop, the recycle line, and the valve that sets the pass.' },
    { id: 'analyser', name: 'The gas analyser', build: 'board', wall: 'back', along: -0.4,
      caption: 'What comes out of the bed, read continuously.' },
    { id: 'assay', name: 'The assay bench', build: 'bench', wall: 'right', along: 0.35,
      caption: 'Where a batch is measured before anybody signs for it.' },
    // The bed stands in this hall: it IS the reactor, and the loop is plumbed round
    // it. Sol 291 asks about its temperature here rather than sending the player to
    // Catalyst Bay, which is where the spare charges and the bench live.
    { id: 'bed-head', name: 'The bed and its thermowell', build: 'vessel', wall: 'left', along: 0.3,
      caption: 'The tray of catalyst, and the line that reads how hot it is running.' },
    // Where the product gas leaves the hall for the cold line. The pipe itself is
    // Cold End's fixture; this is the flange it starts at.
    { id: 'coldline-tap', name: 'The cold line take-off', build: 'vessel', wall: 'right', along: -0.9,
      caption: 'Where the gas leaves this hall, and the last valve before it does.' },
    // The recycle tie-in, capped, until the loop argument is settled on sol 9.
    // Sol 294 is worked from this room: the stack's charge sheet and the water
    // analysis both come up to the hall.
    { id: 'stack-sheet', name: "The stack's charge sheet", build: 'board', wall: 'back', along: 0.2,
      caption: 'Amps, hours, and what the separator actually caught.' },
    { id: 'water-report', name: 'The water analysis', build: 'bench', wall: 'right', along: 0.9,
      caption: 'What came up with the feed, and how much of each.' },
    // Sol 296: the stack's three voltage marks come up to the hall rather than the
    // day crossing to the Electrolysis Hall for one question.
    { id: 'volt-sheet', name: "The stack's voltage marks", build: 'board', wall: 'left', along: 0.0,
      caption: 'Three numbers on one sheet, and the gap between them.' },
    { id: 'equil-stub', name: 'The capped recycle tie-in', build: 'vessel', wall: 'back', along: 0.75,
      until: 10, caption: 'Flanged and blanked. Nobody has agreed what it should feed.' },
  ],
  PHASE: [
    { id: 'coldline', name: 'The cold line', build: 'vessel', wall: 'left', along: -0.45,
      caption: '283 K to 115 K, in one run of pipe.' },
    { id: 'tankfarm', name: 'The tank farm gauges', build: 'board', wall: 'back', along: 0.4,
      caption: 'Every tank on the plain, and what each one is losing.' },
    { id: 'fridge', name: 'The refrigerator', build: 'rack', wall: 'right', along: -0.3,
      caption: 'Compressor, condenser, and the radiator it hands heat to.' },
    // Scaffolding, up since the blockage. Down once the cold end is rebuilt on sol 5.
    // On the cold line's own wall, beside it — not on the back wall, which is where
    // this room's shelving is and where the first placement buried it.
    // Sol 293 is worked from this room: the hot run's assay and the water plant's
    // running order are both carried down here rather than walked to.
    { id: 'assay-print', name: "The hot run's assay", build: 'bench', wall: 'back', along: 0.1,
      caption: 'Walked down from the hall, still warm off the printer.' },
    { id: 'water-order', name: 'The water plant order', build: 'board', wall: 'right', along: -0.6,
      caption: 'Four step cards, sent over to be put back in order.' },
    { id: 'phase-scaffold', name: 'Scaffolding on the cold line', build: 'rack', wall: 'left', along: 0.55,
      until: 6, caption: 'Up since the line closed. The stages are being put back in order.' },
    // The second radiator bank, added after the storm shows the first is not enough.
    { id: 'phase-radiator', name: 'The second radiator bank', build: 'board', wall: 'right', along: 0.8,
      from: 14, caption: 'Plumbed after the storm. The heat path had one weak link and this is it.' },
  ],
  ELEC: [
    { id: 'stack', name: 'The water stack', build: 'rack', wall: 'left', along: -0.35,
      caption: 'Cells in series. Hydrogen one side, oxygen the other.' },
    { id: 'arraypanel', name: 'The array feed panel', build: 'board', wall: 'back', along: 0.35,
      caption: 'What the field is delivering, cell by cell.' },
    // An empty frame waiting for the second stack, until the ledger closes on sol 8.
    // Sol 300: the tank's own gauges are repeated here, so the day that spends the
    // last spare parts does not also cross the plain.
    { id: 'tank-gauge', name: 'The tank pressure repeat', build: 'board', wall: 'right', along: 0.2,
      caption: 'Pressure and mass for every tank, repeated on this wall.' },
    { id: 'elec-frame', name: 'The empty stack frame', build: 'rack', wall: 'right', along: 0.75,
      until: 9, caption: 'Bolted down, wired to nothing. Nobody has said what the current is doing yet.' },
  ],
  GIBBS: [
    { id: 'ledger', name: 'The energy ledger desk', build: 'bench', wall: 'left', along: -0.4,
      caption: 'What the plant collected, against what it spent.' },
    { id: 'loadboard', name: 'The load board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every load on the plain, and the order they come off.' },
    // The unpacked crates of instruments, until the books are closed on sol 11.
    // Sol 292 is worked entirely from this room: the bed, the stack and the hopper
    // all report in rather than being walked to. Each report is an object on the
    // desk or the wall, so the call still has something to stand at.
    { id: 'bed-log', name: 'The bed log', build: 'board', wall: 'back', along: -0.5,
      caption: 'Flow, temperature and contact time, printed every sol.' },
    { id: 'cell-diagram', name: 'The cell diagram', build: 'board', wall: 'right', along: 0.4,
      caption: 'One cell drawn out in section, with its four parts marked.' },
    { id: 'sample-tray', name: 'The sample tray', build: 'bench', wall: 'left', along: 0.2,
      caption: "This morning's ground, bagged and labelled, waiting on a decision." },
    { id: 'gibbs-crates', name: 'Instrument crates, unpacked', build: 'bench', wall: 'right', along: -0.75,
      until: 12, caption: 'Nobody has had a quiet sol to fit them.' },
  ],
  SOIL: [
    { id: 'hopper', name: 'The regolith hopper', build: 'rack', wall: 'left', along: -0.45,
      caption: 'One charge at a time, heated until it gives up its water.' },
    { id: 'columns', name: 'The polishing columns', build: 'vessel', wall: 'right', along: 0.3,
      caption: 'Ion-exchange resin, and a fixed number of sites in it.' },
    { id: 'brinetank', name: 'The brine holding tank', build: 'vessel', wall: 'back', along: -0.35,
      caption: 'Liquid at minus forty, which says what is dissolved in it.' },

    // `from:` — BUILT DURING THE CAMPAIGN, not called. These two are not there on
    // sol 1 and are there afterwards, whatever the day's question is. Both have
    // been canon since the game shipped: the ending card has always said the
    // lead-and-lag columns are plumbed and the alarm was wired four sols before
    // the rotation ended, and the Water Plant showed neither. Sol 10 is where the
    // last set of spare parts is spent and sol 15 is the handover, so the world
    // catches up with the story the player is already being told.
    { id: 'lag-column', name: 'The lag polishing column', build: 'vessel', wall: 'right', along: 0.85,
      from: 11, caption: 'Plumbed out of the last spare parts. The lead column can fill now without stopping the plant.' },
    { id: 'alarm-panel', name: 'The conductivity alarm', build: 'board', wall: 'back', along: 0.55,
      from: 12, caption: 'Wired to the outlet trace. It has never sounded.' },
  ],
  // ---- SITED CALLS: fixtures in places that are not areas.
  //
  // A stop whose `at:` resolves under one of these keys is asked THERE. The
  // question still belongs to its own area — it is still Cold End's question
  // about boil-off — and the player is sent to the tank farm to answer it,
  // because that is where the tanks are. `sitedAt` in interiorFixtures.js
  // resolves it, `callLabel` prints "Go to the Tank Farm", and the case opens
  // against the area as it always did.
  //
  // This is what stops the seven opened buildings being seven rooms nobody has a
  // reason to walk into, which is the same defect as an objective line naming the
  // area's job instead of saying why you are going there.
  TANKS: [
    { id: 'farm-gauges', name: 'The tank farm gauges', build: 'board', wall: 'back', along: 0,
      caption: 'Three cryogenic tanks, and what each one is losing tonight.' },
    { id: 'umbilical', name: 'The transfer umbilical', build: 'vessel', wall: 'left', along: -0.3,
      caption: 'The line the batch goes across on. It only runs one way.' },
  ],
  INTAKE: [
    { id: 'compressors', name: 'The intake compressors', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Six millibars in, twelve bar out. Everything the plant makes starts here.' },
  ],
  HSTORE: [
    { id: 'store-scales', name: 'The hydrogen scales', build: 'board', wall: 'back', along: 0,
      caption: 'What the stacks actually delivered, weighed rather than inferred.' },
  ],
  SHOP: [
    { id: 'reduction-furnace', name: 'The reduction furnace', build: 'vessel', wall: 'left', along: -0.2,
      caption: 'Where nickel oxide is turned into a catalyst. It is not one until it comes out.' },
  ],
  BATT: [
    { id: 'cell-stacks', name: 'The battery stacks', build: 'rack', wall: 'left', along: -0.2,
      caption: 'What the array leaves behind, and what the plant runs on after dark.' },
  ],
  ASSAY: [
    { id: 'spec-bench', name: 'The specification bench', build: 'bench', wall: 'back', along: 0,
      caption: 'Four assay lines against four flight limits. Three pass.' },
  ],
  ARRAY: [
    { id: 'sun-sensor', name: 'The sun sensor bench', build: 'bench', wall: 'left', along: -0.2,
      caption: 'Optical depth, read straight off the sky.' },
  ],
};
