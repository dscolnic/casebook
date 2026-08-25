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
    // The recycle tie-in, capped, until the loop argument is settled on sol 9.
    { id: 'equil-stub', name: 'The capped recycle tie-in', build: 'vessel', wall: 'back', along: 0.75,
      until: 10, caption: 'Flanged and blanked. Nobody has agreed what it should feed.' },
  ],
  PHASE: [
    { id: 'coldline', name: 'The cold line', build: 'vessel', wall: 'left', along: -0.45,
      caption: 'Ten degrees to 115 kelvin, in one run of pipe.' },
    { id: 'tankfarm', name: 'The tank farm gauges', build: 'board', wall: 'back', along: 0.4,
      caption: 'Every tank on the plain, and what each one is losing.' },
    { id: 'fridge', name: 'The refrigerator', build: 'rack', wall: 'right', along: -0.3,
      caption: 'Compressor, condenser, and the radiator it hands heat to.' },
    // Scaffolding, up since the blockage. Down once the cold end is rebuilt on sol 5.
    // On the cold line's own wall, beside it — not on the back wall, which is where
    // this room's shelving is and where the first placement buried it.
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
    { id: 'elec-frame', name: 'The empty stack frame', build: 'rack', wall: 'right', along: 0.75,
      until: 9, caption: 'Bolted down, wired to nothing. Nobody has said what the current is doing yet.' },
  ],
  GIBBS: [
    { id: 'ledger', name: 'The energy ledger desk', build: 'bench', wall: 'left', along: -0.4,
      caption: 'What the plant collected, against what it spent.' },
    { id: 'loadboard', name: 'The load board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Every load on the plain, and the order they come off.' },
    // The unpacked crates of instruments, until the books are closed on sol 11.
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
