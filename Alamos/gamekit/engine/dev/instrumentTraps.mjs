// instrumentTraps.mjs — break each of the twelve traps and confirm the importer
// refuses it.
//
//   node engine/dev/instrumentTraps.mjs
//
// Every one of the twelve formats in `engine/core/instruments.js` has a trap:
// the condition that makes a bad choice cost something. A cloud where
// re-centring reaches the pass mark, an allocation board that is affordable
// whole, a chain whose distractor is the governing link — each of those renders
// perfectly, grades perfectly, and teaches the opposite of what it was written
// for. The importer refuses all of them, and the only way to know a refusal
// works is to make it fire.
//
// The mutations are string substitutions on `books/instruments.yml`, which is
// the worked example of all twelve. Textual on purpose: the repo's own
// `yaml-lite` parses and does not emit, and re-serialising a book through a
// general dumper would be testing the dumper.
//
// Run it after touching the checks in tools/import-book.mjs. Not part of
// `npm run check`, which validates the books that exist rather than books
// deliberately made wrong.

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { SUSPENDED_FORMATS } from '../content/normalize.js';

const BOOK = 'books/instruments.yml';
const SRC = readFileSync(BOOK, 'utf8');

// The estimate traps are the exception to "one book": `instruments.yml` is the
// worked example of the instrument formats and carries no BALLPARK, so the two
// tile traps run against Deep Watch, which does. A trap may name its own book
// and theme as a fifth element.
const OTHER = { book: 'books/deep-watch.yml', theme: 'deepwatch' };
// And HOLDOUT lives in one book only — Quantum's day 10, the whole point of which
// is that the honest number is lower than the flattering one.
const QUANTUM = { book: 'books/quantum.yml', theme: 'quantum' };

// [format, what is broken, [[find, replace], …], the words the refusal must say,
//  optional { book, theme }]
const BREAKS = [
  ['TRACE', 'only one channel shares the target', [
    ["reading: '2.1 amplitude ratio, dimensionless', depends: [vault] }",
     "reading: '2.1 amplitude ratio, dimensionless', depends: [] }"],
    ["reading: '4 mm of horizontal drift', depends: [vault] }",
     "reading: '4 mm of horizontal drift', depends: [] }"],
  ], 'fewer than two channels'],
  ['TRACE', 'no independent channel left',
    [['independent: [gauge, counts]', 'independent: []']], 'no independent channel'],
  // The three that came out of Aftershock's wrong zero, where a `correction`
  // block was authored, dropped by the importer, rendered nowhere, and then
  // reasoned from in the answer text: "a threefold ratio becomes roughly 4.8"
  // off an amplification of 1.6 that appeared on no screen.
  ['TRACE', 'the correction is written in the numeric keys nothing renders', [
    ["            what: Site response of the old vault, the competent-rock reference",
     "            referenceAmplification: 1.6"],
  ], 'which nothing renders'],
  ['TRACE', 'the correction has no corrected value to put in the verdict', [
    ["            corrected: 'The Halden ratio of 3.0 becomes about 4.8 and the Harbour ratio of 2.1 about 3.4, both relative to competent rock; the drift estimate moves with them.'",
     ""],
  ], 'a trace correction needs `corrected`'],
  ['TRACE', 'the correction corrects nothing', [
    ["            now: '1.6x in the working band, measured against a rock station alongside'",
     "            now: '1.0x - assumed to be founded on competent rock'"],
  ], 'corrects nothing'],
  ['TRACE', 'a channel reading is a bare number',
    [["reading: '61 events'", "reading: '61'"]], 'bare number'],
  ['BALANCE', 'the obvious streams already sum to the total',
    [['value: 320, display:', 'value: 410, display:']], 'inside the tolerance'],
  ['ATTEST', 'every critical claim is backed', [
    ["critical: true, evidence: 'obstructed", "critical: true, backed: true, evidence: 'obstructed"],
    ["critical: true, evidence: 'the log says", "critical: true, backed: true, evidence: 'the log says"],
  ], 'every critical claim is already backed'],
  ['ATTEST', 'the budget covers the whole list',
    [['checks: 3', 'checks: 9']], 'no decision about where to look'],
  ['VALUE', 'the whole board is affordable',
    [['amount: 4, unit: h', 'amount: 99, unit: h']], 'whole board is affordable'],
  ['VALUE', 'every option on one axis', [
    ['axis: conditions where the crew will actually be', 'axis: surface concentration'],
    ['axis: history of the site', 'axis: surface concentration'],
  ], 'same axis'],
  ['VALUE', 'nothing is decisive',
    [["decisive: true, reveals: 'Oxygen", "reveals: 'Oxygen"]], 'no value option is marked'],
  ['CONTROL', 'the response is inside the noise',
    [['noise: 1.5', 'noise: 9']], 'not clear of the noise'],
  ['DEGENERACY', 'the first locus never leaves the answer', [[
    '            - { a: 100, b: 0.45 }\n            - { a: 140, b: 0.23 }\n'
    + '            - { a: 180, b: 0.14 }\n            - { a: 260, b: 0.067 }\n'
    + '            - { a: 360, b: 0.035 }\n            - { a: 460, b: 0.021 }',
    '            - { a: 175, b: 0.13 }\n            - { a: 178, b: 0.135 }\n'
    + '            - { a: 180, b: 0.14 }\n            - { a: 182, b: 0.145 }\n'
    + '            - { a: 185, b: 0.15 }\n            - { a: 188, b: 0.155 }',
  ]], 'not degenerate'],
  ['CHAIN', 'the distractor is the governing link',
    [['distractor: panel', 'distractor: anchor']], 'distractor is its governing link'],
  ['CHAIN', 'the first link governs',
    [['governing: anchor', 'governing: diaphragm']], 'first link'],
  // A link's observed state is the only thing that makes "which one governs"
  // answerable, and eleven of fifteen books authored it under a name the
  // importer dropped on the floor — `evidence`, `capacity` + `unit`, or a
  // chain-level map keyed by link id. `reading` is the one that renders, and
  // these three assert the others are refused rather than quietly lost.
  ['CHAIN', "a link's reading is authored as `evidence`",
    [["reading: 'no tested capacity on this joint' }",
      "evidence: 'no tested capacity on this joint' }"]],
    'authors `evidence`'],
  ['CHAIN', "a link's reading is authored as a `capacity` and a `unit`",
    [["reading: '900 kN, the largest here by far' }",
      "capacity: 900, unit: kN }"]],
    'authors `capacity`'],
  ['CHAIN', 'the readings are a chain-level map keyed by link id',
    [['          governing: anchor',
      '          evidence: { anchor: no tested capacity }\n          governing: anchor']],
    'chain-level `evidence` map'],
  ['CHAIN', 'a link carries an empty reading',
    [["reading: 'no movement at the base' }", "reading: '' }"]],
    'empty `reading`'],
  ['ALLOCATE', 'the whole board is affordable',
    [['amount: 20, unit: slots', 'amount: 99, unit: slots']], 'whole board is affordable'],
  ['ALLOCATE', 'every answer is required', [
    ['requires: [solids, downstream] }', 'requires: [solids, downstream], required: true }'],
    ['requires: [cores] }', 'requires: [cores], required: true }'],
    ['requires: [second] }', 'requires: [second], required: true }'],
  ], 'nothing the plan is allowed to forgo'],
  ['ALLOCATE', 'the required answer is covered by the protected items',
    [['- { id: qc, label: Blanks and replicates, cost: 3, note:',
      '- { id: qc, label: Blanks and replicates, cost: 3, protected: true, note:']],
    'already protected'],
  ['TRIANGULATE', 'the systematic is smaller than the tolerance',
    [['delta: 14', 'delta: 1']], 'correcting it changes nothing'],
  ['TRIANGULATE', 'a ring misses the answer',
    [['distance: 33.9', 'distance: 12']], 'misses the answer'],
  ['CLOUD', 'recentring alone passes', [['pass: 0.97', 'pass: 0.5']], 're-centring alone'],
  ['CLOUD', 'the placement tolerance is wider than the cloud',
    [['          pass: 0.97', '          pass: 0.97\n          report: { centreTol: 9 }']],
    'read off the scatter'],
  ['CLOUD', 'a report tolerance that is not a number',
    [['          pass: 0.97', '          pass: 0.97\n          report: { spreadTol: none }']],
    'positive number'],
  ['CLOUD', 'no narrowing action', [[
    '            - { id: pass1, label: One more tracking pass, effect: narrow, amount: 0.62, cost: 4 }\n'
    + '            - { id: pass2, label: A second tracking pass, effect: narrow, amount: 0.72, cost: 4 }',
    '            - { id: pass1, label: One more tracking pass, effect: shift, amount: 0.1, cost: 4 }',
  ]], 'no narrowing action'],
  ['VERIFY', 'every prediction passes',
    [['passRatio: [0.6, 1.6]', 'passRatio: [0.05, 20]']], 'every prediction in the range passes'],
  ['VERIFY', 'the truth is outside the range',
    [['truth: 14.5', 'truth: 90']], 'outside the range'],
  ['TRIGGER', 'the scale cannot hold a bad rule',
    [['            max: 12\n', '            max: 2\n']], 'every threshold'],
  ['TRIGGER', 'a stage needs more lead than any update has',
    [['leadHours: 336', 'leadHours: 900']], 'no update in the stream'],
  // The three below are the format's own decoration bug, made to fire. Graded on
  // lead time alone, every board in the repo was satisfied by the slider's opening
  // position — the end of the scale fires on update 0, which has more hours left
  // than any later reading, so touching nothing scored full marks on all fifteen
  // authored stops. A window is what makes the board a decision, and these assert
  // that the importer will not accept one that gives the decision away.
  ['TRIGGER', 'the opening slider position is a right answer',
    [['window: { min: 0.3, max: 0.5 }', 'window: { min: 0.01, max: 0.5 }']],
    'opening position of a slider'],
  ['TRIGGER', 'a stage carries no window at all',
    [[", window: { min: 0.3, max: 0.5 } }", ' }']], 'window'],
  // Against ContamCity rather than instruments.yml, because the asteroid stream
  // spikes to 2.5 % and collapses to 0.011 — its lowest reading really is its last
  // one, so `falling` is a legal reading of that board. The pH board rises the
  // whole way, and calling it falling makes every threshold above the opening
  // reading unreachable.
  // The anchors are the ground the number is chosen against — a rate scale means
  // nothing until somebody says what a reading on it does. Both refusals are here
  // because an anchor is prose beside a slider, and prose that has drifted off the
  // scale is worse than no anchor: it is a sentence the player reasons from and
  // cannot reach.
  // A scale with no name. Seven of the fourteen shipped that way, so every slider
  // on them read "fires at or above 1.30" with nothing on the panel saying what
  // 1.30 was — the scene knew, and the scene is not where the player is standing
  // when they have to choose.
  // One rule to a board. Two was how every one of the fourteen shipped, and it made
  // a scheduling exercise out of a single idea — three lead times and two hidden
  // axes at once. A second action is a second decision and gets its own stop.
  ['TRIGGER', 'a board carrying more than one rule',
    [['            - { id: evac,', "            - { id: extra, label: A second action, leadHours: 6, window: { min: 0.3, max: 0.5 } }\n            - { id: evac,"]],
    'one rule'],
  ['TRIGGER', 'a scale with no name on it',
    [['            label: Impact probability\n', '']], 'needs a `label`'],
  // The limit under one of its five other names. Each of these was a live key in a
  // shipped book, dropped in silence, so the board never printed the line it was
  // written for.
  ['TRIGGER', 'the limit authored as a ceiling',
    [['          consequenceLimit: 7.5', '          ceiling: 7.5']],
    'consequenceLimit', { book: 'books/contamcity.yml', theme: 'contamcity' }],
  // And the answer itself, in a field nothing reads.
  ['TRIGGER', 'a stage that authors its own threshold',
    [['label: Begin staged evacuation, leadHours: 336',
      'label: Begin staged evacuation, target: 0.4, leadHours: 336']],
    'that is the answer'],
  // The rehearsal is a PAST campaign drawn behind the axes. A rehearsal that is
  // tonight's readings is the answer, drawn in grey, before the player has touched
  // a slider; one that leaves the plot's own time span is drawn off the picture.
  ['TRIGGER', 'the rehearsal is tonight\'s own readings',
    [['              - { value: 0.02, hoursLeft: 528 }', '              - { value: 0.04, hoursLeft: 528 }'],
     ['              - { value: 0.09, hoursLeft: 432 }', '              - { value: 0.32, hoursLeft: 432 }'],
     ['              - { value: 0.4, hoursLeft: 312 }', '              - { value: 2.5, hoursLeft: 312 }'],
     ['              - { value: 0.12, hoursLeft: 240 }\n', ''],
     ['              - { value: 0.05, hoursLeft: 168 }', '              - { value: 0.011, hoursLeft: 168 }']],
    'hands the player the answer'],
  ['TRIGGER', 'a rehearsal point outside the campaign it is drawn against',
    [['              - { value: 0.02, hoursLeft: 528 }', '              - { value: 0.02, hoursLeft: 900 }']],
    'inside the campaign'],
  ['TRIGGER', 'an anchor sits outside its own scale',
    [['- { at: 2.5, means:', '- { at: 25, means:']], 'inside the scale'],
  ['TRIGGER', 'one anchor, which is a caption',
    [["              - { at: 0.04, means: 'one chance in two and a half thousand — the routine end of the risk list' }\n", '']],
    'at least two'],
  ['TRIGGER', 'a rising board declared falling',
    [['          consequenceLimit: 7.5', '          consequenceLimit: 7.5\n          direction: falling']],
    'declared falling', { book: 'books/contamcity.yml', theme: 'contamcity' }],
  ['PROPAGATE', 'the dominant term is not the widest contribution',
    [['{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.08, exponent: 3 }',
      '{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.5, exponent: 3 }']],
    'the widest contribution'],
  ['PROPAGATE', 'ranking by exponent alone gets it right', [
    ['{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.08, exponent: 3 }',
     '{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.5, exponent: 3 }'],
    ['dominant: density', 'dominant: radius'],
  ], 'largest exponent is also the dominant one'],
  // The ledger, which for a while did not exist: costs printed on every button,
  // "one of these is affordable" over them, and no budget in the engine, the
  // importer or any book.
  ['PROPAGATE', 'no ledger at all, so the printed costs constrain nothing',
    [['          costUnit: h\n          budget: 2', '          costUnit: h']],
    'positive `budget`'],
  ['PROPAGATE', 'the budget cannot afford the dominant term',
    [['          costUnit: h\n          budget: 2', '          costUnit: h\n          budget: 1']],
    'cannot be answered right'],
  ['PROPAGATE', 'the budget covers the dominant term and a decoy together',
    [['          costUnit: h\n          budget: 2', '          costUnit: h\n          budget: 3']],
    'buying everything is the winning play'],
  ['PROPAGATE', 'only one candidate is inside the budget, so affordability names the answer',
    [['{ id: radius, label: One more radar pass, cost: 1, newSigmaFrac: 0.03 }',
      '{ id: radius, label: One more radar pass, cost: 9, newSigmaFrac: 0.03 }']],
    'affordability names the'],
  ['STRESS', 'nothing survives the pessimistic end',
    [['            hybrid: 54', '            hybrid: 90']],
    'no candidate survives'],
  ['STRESS', 'two candidates survive the whole range',
    [['            direct: 62', '            direct: 50']],
    'candidates survive the whole range'],
  ['STRESS', 'the robust candidate also wins at the nominal',
    [['            hybrid: { hours: 71, cost: 160, residual: 9 }',
      '            hybrid: { hours: 50, cost: 160, residual: 9 }']],
    'also wins on hours at the nominal'],
  // `instruments.js` renders the table as scores[candidate][criterion.key], so a
  // criterion keyed to a field no candidate scores prints an em dash down its whole
  // column. Bring Them Home shipped three of them at once — the entire table was
  // dashes and the panel put no numbers in front of the player.
  ['STRESS', 'a criterion keyed to a score field nothing has',
    [['            - { key: residual, label: Left behind, unit: kg }',
      '            - { key: leftBehind, label: Left behind, unit: kg }']],
    'which no candidate has a score for'],
  ['DELEGATE', 'two problems are rising toward something irreversible',
    [['              consequence: contained, and cleanup cost rises with volume',
      '              consequence: contained, and cleanup cost rises with volume\n              irreversible: true']],
    'rising toward something irreversible'],
  ['DELEGATE', 'nothing is loud and stable',
    [['              loud: true\n', '']],
    '` and stable'],
  ['FLY', 'braking at the target lands inside the tolerance',
    [['          accel: 0.42', '          accel: 0.05']],
    'inside the tolerance'],
  ['RESIDUAL', 'the lowest-RMS fit is the one to accept',
    [['          accept: levelled', '          accept: tilt']],
    'the fit with the lowest RMS is also the one to accept'],
  ['INJECT', 'the most detections is also the best on the metric',
    [['detections: 1400, metric: 31', 'detections: 4000, metric: 31']],
    'most detections is also the best'],
  ['ROUTE', 'two compartments share a landmark',
    [["landmark: 'the second door, hinged inward'", 'landmark: the brass rail along the shelving']],
    'share a landmark'],
  ['ROUTE', 'the detour drops the player where they had already been',
    [['          resumeAt: transfer', '          resumeAt: map']],
    'already placed'],
  // DERIVE's trap is `survives`: a step whose wrong branches all die at once is
  // passable by elimination, which is not differentiating.
  ['DERIVE', 'every wrong branch dies immediately',
    [['                  survives: true\n', '']],
    'no wrong candidate marked'],
  ['DERIVE', 'a distractor with no reason attached',
    [['                  why: >-\n                    The power rule drops the exponent by one. Left at 3/2 it is the original\n                    power, so this line is not the derivative of anything.\n', '']],
    'no `why`'],
  ['DERIVE', 'the keyed line is the longest thing on the panel',
    [["                - text: 'dQ/dt = C\u00b7L\u00b7(3/2)\u00b7H^(1/2)\u00b7dH/dt'",
      "                - text: 'dQ/dt = C\u00b7L\u00b7(3/2)\u00b7H^(1/2)\u00b7dH/dt, on the head as it stands now'"]],
    'identifiable by its'],
  // Naming the rule is off by default, so this trap has to switch it on before
  // it can break it. That is the point of the opt-in: the orphan-rule refusal
  // only means anything where the player is actually shown a list to pick from.
  ['DERIVE', 'a candidate claims a rule the player is never offered',
    [["          startNote: given",
      "          startNote: given\n          askRule: true\n          rules: [chain, power, substitution, evaluation]"],
     ['                  rule: chain\n                  why: >-\n                    The 3/2 that comes down',
      '                  rule: lhopital\n                  why: >-\n                    The 3/2 that comes down']],
    'not in `rules`'],
  // A BALLPARK's trap is that the tile says what it is worth. The player clicks
  // a label and the panel adds a value, so a panel whose labels and values have
  // drifted apart renders perfectly, grades consistently, and cannot be answered
  // by reading it. Seven games shipped one.
  ['BALLPARK', 'a tile label that is not its value',
    [['            - 1.025 tonnes/m³  (seawater density)', '            - 1025 kg/m³  (seawater density)']],
    'and is worth', OTHER],
  ['BALLPARK', 'more slots than correct tiles',
    [['          correct: [0, 1]\n          target: 1.64', '          correct: [0]\n          target: 1.64']],
    'the panel can never be completed', OTHER],
  // HOLDOUT's pass mark is grading slack on a number the player reports, so it may
  // not be printed — a player who can read 94.5 freezes at the edge of it instead
  // of reasoning about which part of the curve survives a fresh batch. Everything
  // the player reads first is checked: the two paragraphs, the background behind
  // the button, the panel's hint and its goal list.
  //
  // Anchored on the KEY, not on a sentence. Three separate edits to this stop's
  // prose left this trap quiet rather than red — it kept matching a sentence that
  // had been rewritten — and a trap that goes quiet when the content moves is
  // worse than no trap. `guide: >-` is structure: if it ever disappears the trap
  // says the book no longer contains it, which is the loud failure.
  ['HOLDOUT', 'the pass mark printed on the card',
    // The number has to be the stop's own `pass`, or the guard has nothing to
    // find and the import succeeds. It is 94.8; if the book's pass mark moves,
    // this trap goes red rather than quiet, which is the behaviour to keep.
    [['        guide: >-\n',
      '        guide: >-\n          Anything at 94.8 or over passes.\n']],
    'pass mark', QUANTUM],
  // TALLY's trap is that the panel must not make the player's decision for it. A
  // player reported this stop as having no challenge — click until the commit button
  // unlocks, then submit — and they were right: the enforced minimum already put the
  // statistic inside its own tolerance about 95% of the time. Both halves of the fix
  // are exercised here.
  ['TALLY', 'a floor that is already a certain pass',
    [['          minShots: 100', '          minShots: 400']],
    'already inside its own tolerance', QUANTUM],
  ['TALLY', 'a budget too small to reach a fair reading',
    [['          budget: 24', '          budget: 8']],
    'even at full spend', QUANTUM],
  ['DERIVE', 'a rules list nobody is ever shown',
    [["          startNote: given",
      "          startNote: given\n          rules: [chain, power, substitution, evaluation]"]],
    'askRule'],
  // ---- BELT, the first of the formats that are fun first.
  //
  // Its two traps are both about a bank that can be sorted without consulting
  // the category. That is the only way a belt ships broken: it renders, it
  // grades, it is even enjoyable, and it teaches spelling or teaches nothing.
  // The loaded word has to be one the bank does not already use, or the mutation
  // trips the duplicate-name guard first and the trap passes for the wrong
  // reason — which is what "noise" did here, because the right bin ships a
  // "Reading noise" and a "Thermal noise" collides with nothing else on it.
  ['BELT', 'one word sends four fifths of the items it appears in to the same bin', [
    ['- { name: Thermal drift, bin: left }', '- { name: Thermal wobble, bin: left }'],
    ['- { name: Parallax habit, bin: left }', '- { name: Parallax wobble, bin: left }'],
    ['- { name: Stale calibration, bin: left }', '- { name: Stale wobble, bin: left }'],
    ['- { name: Cable resistance, bin: left }', '- { name: Cable wobble, bin: left }'],
    ['- { name: Buoyancy ignored, bin: left }', '- { name: Buoyancy wobble, bin: left }'],
  ], 'winnable by spelling'],
  ['BELT', 'four fifths of the bank is one bin', [
    ['- { name: Reading noise, bin: right }', '- { name: Reading noise, bin: left }'],
    ['- { name: Draught on balance, bin: right }', '- { name: Draught on balance, bin: left }'],
    ['- { name: Vibration from traffic, bin: right }', '- { name: Vibration from traffic, bin: left }'],
    ['- { name: Last digit flicker, bin: right }', '- { name: Last digit flicker, bin: left }'],
    ['- { name: Operator timing, bin: right }', '- { name: Operator timing, bin: left }'],
    ['- { name: Mains ripple, bin: right }', '- { name: Mains ripple, bin: left }'],
  ], 'always chooses that side'],
  ['BELT', 'the same item is in both bins',
    [['- { name: Static charge, bin: right }', '- { name: Zero offset, bin: right }']],
    'in both bins'],
  ['BELT', 'a run longer than the bank it is drawn from',
    [['          need: 20', '          need: 40']], 'needs a bank at least that big'],
  // ---- TRIAL. Its first trap is the only check in the repo that reads the
  // theme's `site.js` to grade the content, and it has to: an order that is
  // also the nearest-neighbour walk from the spawn is perfect on the page and
  // free on the ground.
  //
  // A gate named by building sits in FRONT of its door, not at the building's
  // centre — see `posOf` in import-book.mjs, and the screenshot that put the
  // first version of these rings under the floor. So the gates are Gatehouse
  // (-70, 42.5), Field Station (-48, 21), Sample Room (48, 21), Records Office
  // (-40, -17.5), Response Desk (42, -17.5), against a spawn at (0, 36).
  // Nearest-neighbour from there is station, gatehouse, records, desk,
  // sampleroom — so asking for exactly that is asking for nothing.
  ['TRIAL', 'the order is the nearest-neighbour route from the spawn',
    [['          order: [gatehouse, station, sampleroom, records, desk]',
      '          order: [station, gatehouse, records, desk, sampleroom]']],
    'nearest-neighbour route'],
  // Anchored on the gate the book actually authors. The first version of this
  // patched `at: G2` with the FIELD STATION's note, a pairing no book ever had —
  // Meridian's G1 is the station and G2 the sample room — so it skipped rather
  // than fired for as long as the arcade stops went unauthored.
  ['TRIAL', 'two gates close enough to be taken in one pass',
    [['              at: G1\n              note: where the reading is taken',
      '              x: -40\n              z: -22\n              note: where the reading is taken']],
    'two gates taken in one pass'],
  ['TRIAL', 'a gate outside the world the player can walk in',
    [['              at: GATE\n              note: where the day\'s paperwork is issued',
      '              x: -260\n              z: 40\n              note: where the day\'s paperwork is issued']],
    'outside the theme'],
  ['TRIAL', 'a gate label that numbers itself',
    [['              label: Field Station', '              label: Second Station']],
    'numbers itself'],
  // ---- LOB. Both traps are about a mark that asks nothing: one any angle
  // reaches, and one nothing reaches at all.
  ['LOB', 'a mark that any angle reaches at full charge',
    [['- { label: Gauge post, distance: 108, radius: 3 }',
      '- { label: Gauge post, distance: 108, radius: 60 }']],
    'aiming is decoration'],
  ['LOB', 'a mark beyond anything the controls can do',
    [['- { label: Far ladder, distance: 152, radius: 2.5 }',
      '- { label: Far ladder, distance: 400, radius: 2.5 }']],
    'nothing the controls can do'],
  ['LOB', 'marks that do not work outward',
    [['- { label: Near bollard, distance: 55, radius: 3.5 }',
      '- { label: Near bollard, distance: 130, radius: 3.5 }']],
    'ordered by distance'],
  // ---- STACK. Both traps are `answerShape.mjs` arriving in a format that file
  // cannot see: a rail answerable by position, and a rail answerable by length.
  ['STACK', 'the keyed answer sits at the same position throughout', [
    ['              correct: 1\n', '              correct: 0\n'],
    ['              correct: 2\n', '              correct: 0\n'],
    ['              correct: 3\n', '              correct: 0\n'],
  ], 'answerable without reading it'],
  ['STACK', 'a question that repeats an option',
    [['                - A stale calibration', '                - A zero offset']],
    'repeats an option'],
  ['STACK', 'a run longer than the bank it is drawn from',
    [['          need: 8', '          need: 20']], 'needs a bank at least that big'],
  ['STACK', 'an option nobody can read while a piece is falling',
    [['                - Random scatter',
      '                - Random scatter that comes and goes between one reading and the next']],
    'eight is the limit'],
  // ---- SPOT. Its trap is the sharpest of the fun-first set, because the
  // defect it catches is the format measuring the opposite of its own subject:
  // if the instruction changes and the same items are still wanted, the player
  // is rewarded for not noticing.
  ['SPOT', 'the instruction changes and the same items are still wanted',
    [['            - say: Anything overdue\n              want: [overdue]',
      '            - say: Anything not yet checked\n              want: [uncalibrated]']],
    'changing changes nothing'],
  // Every tag on the board, so the rule really does take all eight. The earlier
  // version wanted three tags and took six, which left the anemometer wanted by
  // all three rules — so a different guard fired and this trap never tested its
  // own rule.
  ['SPOT', 'an instruction that wants the whole board',
    [['              want: [overdue]',
      '              want: [overdue, harbour, signed, uncalibrated, vault]']],
    'wants everything or nothing'],
  ['SPOT', 'an item every instruction wants', [
    ['              tags: [signed]', '              tags: [signed, uncalibrated, overdue, harbour]'],
  ], 'never wrong whatever the board says'],
  ['SPOT', 'a run with fewer than two changes in it',
    [['          switchEvery: 12', '          switchEvery: 30']], 'fewer than two of them'],
  ['SPOT', 'a rule wanting a tag no item carries',
    [['              want: [harbour]', '              want: [provisional]']],
    'no item on the board carries it'],
  // ---- HOLD. Both traps are the same defect from opposite sides: a run in
  // which nothing the player does matters. The first passes itself; the second
  // cannot be passed at all.
  // All three shrunk, not just the first: the trap is about the WHOLE board
  // being tame, and cutting one step only lets the other two dominate.
  ['HOLD', 'a do-nothing run passes', [
    ['at: 4, amount: -0.03 }', 'at: 4, amount: -0.002 }'],
    ['at: 20, amount: 0.05 }', 'at: 20, amount: 0.003 }'],
    ['at: 38, amount: -0.045 }', 'at: 38, amount: -0.0025 }'],
  ], 'never touches the control'],
  ['HOLD', 'the control cannot out-push the disturbances',
    [['          authority: 0.05', '          authority: 0.01']],
    'cannot be brought back'],
  ['HOLD', 'a band that gets wider rather than narrower',
    [['          narrowTo: 0.2', '          narrowTo: 0.9']], 'no wider'],
  ['HOLD', 'a disturbance that arrives after the run has ended',
    [['at: 38, amount: -0.045', 'at: 80, amount: -0.045']], 'after the run has ended'],
  ['TRIAL', 'an order that does not use every gate',
    [['          order: [gatehouse, station, sampleroom, records, desk]',
      '          order: [gatehouse, station, sampleroom, records]']],
    'every gate exactly once'],

  // ---- the world-graded five. Every one of these is the same sentence in a
  // different currency: a run whose goal is reached by standing still, or by
  // walking to whatever is nearest, is a run that asks nothing. They are the
  // only traps besides TRIAL's that read the theme's own site.js, and they have
  // to — the defect is invisible in the book and obvious on the ground.
  ['GREET', 'a target that is the whole list',
    [['          target: 10', '          target: 14']], 'nothing to choose between'],
  ['GREET', 'an hour long enough that the route does not matter',
    [['          minutes: 60\n          hint: They walk about',
      '          minutes: 240\n          hint: They walk about']],
    'the clock is not a constraint'],
  ['GREET', 'a round nobody could finish in the time',
    [['          minutes: 60\n          hint: They walk about',
      '          minutes: 25\n          hint: They walk about']],
    'cannot be done in the time'],

  ['FOLLOW', 'a guide faster than the player',
    [['          speed: 2.6', '          speed: 4.6']], 'cannot be followed'],
  ['FOLLOW', 'a band wide enough to hold by standing still',
    [['band: { near: 3, far: 14 }', 'band: { near: 3, far: 200 }']],
    'does not move stays inside it'],
  ['FOLLOW', 'a walk the guide cannot finish in the time allowed',
    [['          seconds: 60\n          pass:', '          seconds: 30\n          pass:']],
    'would never arrive'],

  ['HUNT', 'a target the nearest few already satisfy',
    [['          target: 6\n          minutes: 75', '          target: 3\n          minutes: 75']],
    'the clock is not a constraint'],
  ['HUNT', 'two items collected in one pass',
    [['            - { x: -46, z: 28 }', '            - { x: -20, z: 8 }']],
    'two items collected in one pass'],
  ['HUNT', 'an item outside the world the player can walk in',
    [['            - { x: 70, z: 40 }', '            - { x: 170, z: 40 }']], 'playerLimit'],

  ['CANVASS', 'an answer the population does not give',
    [['          answer: false', '          answer: true']], 'says the opposite'],
  ['CANVASS', 'a split too close to call from the population itself',
    [['            - { id: hand5, says: false }', '            - { id: hand5, says: true }'],
     ['            - { id: hand6, says: false }', '            - { id: hand6, says: true }']],
    'too close to call'],
  ['CANVASS', 'the five nearest already give the right answer',
    [['            - { id: lead1, says: true }', '            - { id: lead1, says: false }'],
     ['            - { id: helper1, says: true }', '            - { id: helper1, says: false }'],
     ['            - { id: hand2, says: true }', '            - { id: hand2, says: false }'],
     ['            - { id: lead2, says: true }', '            - { id: lead2, says: false }'],
     ['            - { id: hand5, says: false }', '            - { id: hand5, says: true }'],
     ['            - { id: hand6, says: false }', '            - { id: hand6, says: true }'],
     ['            - { id: hand7, says: false }', '            - { id: hand7, says: true }'],
     ['            - { id: hand8, says: false }', '            - { id: hand8, says: true }']],
    'without walking anywhere'],
  ['CANVASS', 'a skew so strong that everybody in an area answers identically',
    [['          minutes: 60\n          yes:', '          skew: 0.98\n          minutes: 60\n          yes:']],
    'is not a lean'],

  ['EVADE', 'a pursuer nobody can get away from',
    [['          speed: 3.4', '          speed: 4.4']], 'nobody can get away'],
  ['EVADE', 'a pursuer so slow that standing still passes the drill',
    [['          speed: 3.4', '          speed: 2.1']], 'never moves passes it'],
  ['EVADE', 'a radius tight enough to be measured in reaction time',
    [['          distance: 9', '          distance: 4']], 'at least 6 m'],

  ['TAG', 'a chase a straight line already wins',
    [['          speed: 2.8\n          hint: He walks away', '          speed: 1.9\n          hint: He walks away']],
    'the chase is then a formality'],
  ['TAG', 'a quarry nobody can catch',
    [['          speed: 2.8\n          hint: He walks away', '          speed: 4.3\n          hint: He walks away']],
    'can never be caught'],
  ['TAG', 'a run too short for any line to catch them',
    [['          seconds: 30\n          speed: 2.8', '          seconds: 15\n          speed: 3.4']],
    'cannot be caught at all'],

  // The warm-up block is not an instrument, and it is trapped here for the same
  // reason everything else is: its four refusals were written, recorded on
  // `problems`, and never read, because the validation sat below the line that
  // reports them. All four imported clean for as long as they existed. A
  // refusal nothing exercises is a comment.
  ['warmups', 'a slot name that is not one of the seven runs',
    [['\n  greet:\n', '\n  greetings:\n']], 'is not one of the seven runs'],
  ['warmups', 'a reason too short to be a reason',
    [['      Every calibration in this office traces back to a reference block, and two of them are not',
      '      Find them.\n#']], 'a run with no reason attached is a tutorial'],
  ['warmups', 'a hunt story naming a count the run cannot place',
    [['    title: Four reference blocks, and the store lists two',
      '    title: Nine reference blocks, and the store lists two']],
    'the story names a count the player cannot reach'],
];

const dir = mkdtempSync(join(tmpdir(), 'gamekit-traps-'));
let ok = 0, bad = 0, skipped = 0;

BREAKS.forEach(([fmt, what, subs, expect, from], i) => {
  // A suspended format's stop has been taken out of the book, so its
  // substitutions have nothing to find — and the importer would refuse the
  // mutated book for being suspended rather than for the trap, which is a green
  // tick that asserts nothing. Skip it out loud instead.
  if(SUSPENDED_FORMATS[fmt]){
    skipped++;
    console.log(`  – ${fmt.padEnd(12)} ${what}`);
    console.log(`      skipped: ${fmt} is suspended — ${SUSPENDED_FORMATS[fmt]}`);
    return;
  }
  const bookPath = from?.book ?? BOOK;
  const theme = from?.theme ?? 'instruments';
  let s = from ? readFileSync(bookPath, 'utf8') : SRC;
  for(const [find, replace] of subs){
    if(!s.includes(find)){
      bad++;
      console.log(`  ! ${fmt.padEnd(12)} ${what}`);
      console.log(`      the book no longer contains: ${find.slice(0, 64)}`);
      s = null;
      break;
    }
    s = s.replaceAll(find, replace);
  }
  if(s === null) return;
  const f = join(dir, `${fmt}-${i}.yml`);
  writeFileSync(f, s);
  let out = '';
  try{
    out = execFileSync('node', ['tools/import-book.mjs', f, theme, '--dry'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) + '\nIMPORT SUCCEEDED';
  }catch(e){ out = (e.stdout ?? '') + (e.stderr ?? ''); }
  if(out.toLowerCase().includes(expect.toLowerCase())){
    ok++;
    console.log(`  ✓ ${fmt.padEnd(12)} ${what}`);
  } else {
    bad++;
    console.log(`  ✗ ${fmt.padEnd(12)} ${what}`);
    console.log(`      expected a refusal mentioning "${expect}"`);
    const line = out.split('\n').find(l => l.includes('✗')) ?? out.trim().split('\n').pop();
    console.log(`      got: ${String(line).trim().slice(0, 130)}`);
  }
});

console.log(`\n${ok}/${ok + bad} traps fire.`
  + (skipped ? `  (${skipped} skipped — suspended formats)` : ''));
process.exit(bad ? 1 : 0);
