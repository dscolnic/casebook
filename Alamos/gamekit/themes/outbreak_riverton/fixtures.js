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
// A lesson points at one with `at: <id>` in books/outbreak-riverton.yml. A
// lesson that points at nothing is answered at the case stand, exactly as
// before.
//
// POP (Epidemiology Operations) carries far more of the campaign than the
// other five areas — roughly half of its 48 stops — so it gets four fixtures
// where the others get two or three; the ratio follows the book, not a rule.
export const FIXTURES = {
  CLIN: [
    { id: 'pathology-bench', name: 'The pathology bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Four results off the same specimens, none of them naming the agent yet.' },
    { id: 'triage-board', name: 'The triage marquee board', build: 'board', wall: 'back', along: -0.3,
      caption: 'The rule for who gets seen first, rewritten as the afternoon changes.' },
    { id: 'icu-monitor', name: 'The ICU bedside monitor', build: 'rack', wall: 'right', along: 0.3,
      caption: 'Every reading that has to hold at once — gas exchange, carriage, delivery.' },
  ],
  CELL: [
    { id: 'culture-wing-bench', name: 'The cell culture bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Patient material, healthy tissue and a negative control, side by side.' },
    { id: 'binding-rig', name: 'The receptor-binding rig', build: 'vessel', wall: 'back', along: 0,
      caption: 'Counts how many labelled particles actually get inside the cell.' },
    { id: 'growth-board', name: 'The growth-curve board', build: 'board', wall: 'right', along: 0.35,
      caption: 'Five hundred cells and a doubling time — what the bench needs by morning.' },
  ],
  MOL: [
    { id: 'sequencer', name: 'The sequencing bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Reads that do not match anything the centre has logged before.' },
    { id: 'amp-rig', name: 'The amplification rig', build: 'vessel', wall: 'back', along: 0.1,
      caption: 'Copies whatever DNA is in the tube, about a billion times over.' },
    { id: 'pcr-panel', name: 'The PCR diagnostics panel', build: 'board', wall: 'right', along: 0.35,
      caption: 'Patient results, two controls, and a second method, all on one screen.' },
  ],
  IMM: [
    { id: 'timeline-bench', name: 'The immunology timeline bench', build: 'bench', wall: 'left', along: -0.4,
      caption: 'The normal immune response, mapped out before anyone points to what broke.' },
    { id: 'signal-table', name: 'The surveillance signal table', build: 'board', wall: 'back', along: 0,
      caption: 'Four data streams, each one seeing a different slice of the city.' },
    { id: 'pressure-panel', name: 'The isolation-room pressure panel', build: 'board', wall: 'right', along: 0.35,
      caption: 'The extract fan against a door that keeps getting propped open.' },
  ],
  POP: [
    { id: 'ops-board', name: 'The outbreak status board', build: 'board', wall: 'back', along: -0.5,
      caption: 'Every case curve the response has, and the baseline each one is read against.' },
    { id: 'stats-desk', name: 'The biostatistics desk', build: 'bench', wall: 'left', along: -0.4,
      caption: 'Event counts, validation tables — nothing here is a rate until it is worked.' },
    { id: 'campaign-board', name: 'The field campaign planning board', build: 'board', wall: 'right', along: -0.3,
      caption: 'Candidate species, comparison sites, and twenty sampling slots to spend.' },
    { id: 'portfolio-desk', name: 'The intervention portfolio desk', build: 'bench', wall: 'right', along: 0.4,
      caption: 'Six possible layers, funding for three, and one shared failure mode to avoid.' },
  ],
  FIELD: [
    { id: 'sample-cabinet', name: 'The specimen sorting cabinet', build: 'bench', wall: 'left', along: -0.3,
      caption: 'Clean side, dirty side — sorted before the courier leaves.' },
    { id: 'reservoir-board', name: 'The reservoir evidence board', build: 'board', wall: 'back', along: 0.2,
      caption: 'Four animal patterns pinned up, and a trapper waiting with more to check.' },
  ],
  // ---- SITED CALLS: a fixture in a place that is not an area.
  //
  // A stop whose `at:` resolves under this key is asked THERE. The question
  // still belongs to POP — it is still an epidemiology question about the
  // city's response — and the player is sent to City Command to answer it,
  // because that is where the policy is actually set. See PLACEMENT_PASS.md.
  CMD: [
    { id: 'policy-board', name: 'The city command policy board', build: 'board', wall: 'back', along: 0,
      caption: "Today's occupancy, and a worst-case trace from the capacity model." },
  ],
};
