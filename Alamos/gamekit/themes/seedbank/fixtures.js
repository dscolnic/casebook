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
// A lesson points at one with `at: <id>` in books/seedbank.yml. A lesson that
// points at nothing is answered at the case stand, exactly as before.
//
// ## The three findings this catalogue turned up
//
// **The drying room is the vault's, not the hall's.** Day 3's HOLD — six per
// cent while the lorries arrive — is a VAULT stop whose scene is a drying room,
// and Wellmere has a Drying & Processing Hall standing four hundred metres away
// that belongs to a different area. Both are real: a gene bank dries seed to
// five or six per cent in its own room beside the vault, and a farm dries grain
// in a hall. Pointing the question at an object is what asked which one it meant.
//
// **The four hundred F2 plants are in the warm bay.** Day 2's stake says so and
// the stop was asked in the Crossing Hall, which is where the cross was *made*.
// It is sited at `GH1` now, and the glasshouse the campaign has always talked
// about is a door you go through.
//
// **The rogueing crew's instruction is chalked at the end of a row.** Day 13's
// SPOT says that in its own scene. It is sited at `GH3`, the screening bay,
// which is where the rust nursery is and where a row has an end.
export const FIXTURES = {
  // ---- VAULT · Conservation & Viability, the Seed Vault
  VAULT: [
    { id: 'germ-bench', name: 'The germination bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Two lots of one accession, side by side. One was kept properly.' },
    { id: 'dry-room', name: 'The drying room', build: 'vessel', wall: 'back', along: -0.45,
      caption: 'Where seed comes down to six per cent before the door to the cold rooms opens.' },
    { id: 'viability-log', name: 'The viability record', build: 'board', wall: 'right', along: 0.3,
      caption: 'Eleven years of germination tests on one accession, and the line it is falling towards.' },
    // `until:` — THE PLACE STARTS UNFINISHED, and what clears it is the player's
    // own work. This week's intake stands on the pallets it came off the field
    // on, because nothing goes through the vault door wet — and day 3 is where
    // the drying room is held at six per cent while the lorries arrive. It is
    // gone on day 4.
    { id: 'intake-pallets', name: "This week's intake, still on pallets", build: 'bench', wall: 'right', along: -0.75,
      until: 4, caption: 'Wet off the field. Nothing on this pallet may go through the door yet.' },
  ],

  // ---- CROSS · Heredity & Crossing, the Crossing Hall
  CROSS: [
    { id: 'crossing-board', name: 'The crossing board', build: 'board', wall: 'back', along: 0.35,
      caption: 'Eight slots for the next two years, and every name anybody has proposed for them.' },
    { id: 'bagging-bench', name: 'The emasculation bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Forceps, glassine bags and a tag block. A cross is made here or it is not made.' },
    // `from:` — the eight bagged crosses come back off the block after day 14.
    { id: 'block-bags', name: 'The season’s crosses, bagged', build: 'rack', wall: 'right', along: 0.6,
      from: 15, caption: 'Eight tags, eight bags, and four years before any of them is a line.' },
  ],

  // ---- POP · Population Genetics, the Genetic Resources Office
  POP: [
    { id: 'genotype-board', name: 'The genotype board', build: 'board', wall: 'back', along: -0.35,
      caption: 'A hundred plants at one locus, written up as counts rather than as plants.' },
    { id: 'regen-log', name: 'The regeneration log', build: 'bench', wall: 'left', along: -0.45,
      caption: 'Who grew what out, in what year, and how many plants gave the seed.' },
    { id: 'pedigree-wall', name: 'The pedigree wall', build: 'board', wall: 'right', along: 0.3,
      caption: 'Six elite parents across three metres of paper, and the grandparent four of them share.' },
    { id: 'tag-bench', name: 'The tagging bench', build: 'bench', wall: 'back', along: 0.55,
      caption: 'Flagging tape, paper bags and plot tags, ready for a field somebody is about to spray.' },
    // `from:` — the ending card has said since the game shipped that the drifted
    // accessions are on a list with fifteen years of regrowing in it. Day 9 is
    // where the drift is found; day 10 is where the list gets written.
    { id: 'regrow-list', name: 'The regrowing list', build: 'board', wall: 'left', along: 0.75,
      from: 11, caption: 'Thirty accessions, and the fifteen years of glasshouse it would take to put them right.' },
  ],

  // ---- TRIAL · Field Trials & Selection, the Field Laboratory
  TRIAL: [
    { id: 'plot-table', name: 'The plot plan table', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Two hundred and forty plots on one sheet, and the wet corner drawn in.' },
    { id: 'scoring-bench', name: 'The scoring bench', build: 'bench', wall: 'back', along: -0.35,
      caption: 'Plot means, replicate by replicate, before anybody averages them.' },
    { id: 'morning-board', name: 'The morning board', build: 'board', wall: 'right', along: 0.35,
      caption: 'What the drill, the crew and the merchant are each waiting on today.' },
    // `until:` — the spring trial is not drilled until day 11.
    { id: 'seed-lots', name: 'The trial seed, still in its lots', build: 'rack', wall: 'right', along: -0.8,
      until: 11, caption: 'Two hundred and forty numbered bags. None of it is in the ground yet.' },
  ],

  // ---- LAB · Markers & Gene Expression, the Molecular Laboratory
  LAB: [
    { id: 'marker-bench', name: 'The marker bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'A hundred plants scored twice — once by the marker, once by the disease.' },
    // `from:` — the second-gene screen is set up after the day 7 warning.
    { id: 'screen-plates', name: 'The second-gene screen', build: 'rack', wall: 'back', along: 0.4,
      from: 8, caption: 'Fifty accessions, ninety-six wells at a time, looking for a lock the new race has not seen.' },
  ],

  // ---- DRY · Agronomy & Plant Energetics, the Drying & Processing Hall
  DRY: [
    { id: 'weighbridge', name: 'The weighbridge slips', build: 'board', wall: 'back', along: -0.4,
      caption: 'Eleven tonnes off one field, and a trainee who thinks it came out of the soil.' },
    { id: 'rain-record', name: 'The rainfall and yield record', build: 'board', wall: 'left', along: 0.55,
      caption: 'Eleven summers plotted against eleven harvests, and a straight-ish line through them.' },
    { id: 'straw-bench', name: 'The straw and grain bench', build: 'bench', wall: 'left', along: -0.45,
      caption: 'Two sheaves of the same cross. One is fifteen centimetres shorter and nobody asked for it.' },
    { id: 'paired-bench', name: 'The paired-plot bench', build: 'bench', wall: 'right', along: 0.3,
      caption: 'Same line with the gene and without it, grown clean, weighed against each other.' },
    { id: 'season-books', name: 'The season notebooks', build: 'rack', wall: 'right', along: -0.7,
      caption: 'Twelve years of canopy, flowering and weather, and nobody has ever asked for the series.' },
  ],

  // ---- SITED CALLS: fixtures in places that are not areas.
  //
  // A stop whose `at:` resolves under one of these keys is asked THERE. The
  // question still belongs to its own area — day 2's is still a Heredity &
  // Crossing question about a segregating generation — and the player is sent to
  // the warm bay to answer it, because that is where the four hundred plants
  // are. `sitedAt` in interiorFixtures.js resolves it, `callLabel` prints "Go to
  // Glasshouse 1", and the case opens against the area as it always did.
  //
  // This is what stops the five opened buildings being five rooms nobody has a
  // reason to walk into, which is the same defect as an objective line naming the
  // area's job instead of saying why you are going there.
  GH1: [
    { id: 'f2-benches', name: 'The second-generation benches', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Four hundred plants from one cross, and this is the generation where they come apart.' },
  ],
  GH3: [
    { id: 'row-slate', name: 'The standing instruction', build: 'board', wall: 'back', along: 0,
      caption: 'Chalked at the end of the row, rewritten when the season turns, announced to nobody.' },
  ],
  RECORDS: [
    { id: 'passport-run', name: 'The passport run', build: 'rack', wall: 'left', along: -0.2,
      caption: 'Where every accession says it came from, in the hand of whoever collected it.' },
    { id: 'evidence-board', name: 'The evidence board', build: 'board', wall: 'back', along: 0.3,
      caption: 'Four channels pinned up side by side, and one grow-out standing behind three of them.' },
  ],
  THRESH: [
    { id: 'bag-line', name: 'The bagging line', build: 'bench', wall: 'left', along: -0.2,
      caption: 'Two hours of heads to clear, and only the cover tells you who the father was.' },
  ],
};

export default FIXTURES;
