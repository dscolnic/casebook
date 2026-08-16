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

const BOOK = 'books/instruments.yml';
const SRC = readFileSync(BOOK, 'utf8');

// [format, what is broken, [[find, replace], …], the words the refusal must say]
const BREAKS = [
  ['TRACE', 'only one channel shares the target', [
    ["- { id: ratioB, label: Harbour site ratio, reading: '2.1', depends: [vault] }",
     "- { id: ratioB, label: Harbour site ratio, reading: '2.1', depends: [] }"],
    ["- { id: driftC, label: Fortnight drift estimate, reading: '4 mm', depends: [vault] }",
     "- { id: driftC, label: Fortnight drift estimate, reading: '4 mm', depends: [] }"],
  ], 'fewer than two channels'],
  ['TRACE', 'no independent channel left',
    [['independent: [gauge, counts]', 'independent: []']], 'no independent channel'],
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
    [['min: 0, max: 12, step: 0.05', 'min: 0, max: 2, step: 0.05']], 'every threshold'],
  ['TRIGGER', 'a stage needs more lead than any update has',
    [['leadHours: 336', 'leadHours: 900']], 'no update in the stream'],
  ['PROPAGATE', 'the dominant term is not the widest contribution',
    [['{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.08, exponent: 3 }',
      '{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.5, exponent: 3 }']],
    'the widest contribution'],
  ['PROPAGATE', 'ranking by exponent alone gets it right', [
    ['{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.08, exponent: 3 }',
     '{ id: radius, label: Radius, value: 90, unit: m, sigmaFrac: 0.5, exponent: 3 }'],
    ['dominant: density', 'dominant: radius'],
  ], 'largest exponent is also the dominant one'],
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
  ['DERIVE', 'a rules list nobody is ever shown',
    [["          startNote: given",
      "          startNote: given\n          rules: [chain, power, substitution, evaluation]"]],
    'askRule'],
];

const dir = mkdtempSync(join(tmpdir(), 'gamekit-traps-'));
let ok = 0, bad = 0;

BREAKS.forEach(([fmt, what, subs, expect], i) => {
  let s = SRC;
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
    out = execFileSync('node', ['tools/import-book.mjs', f, 'instruments'],
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

console.log(`\n${ok}/${ok + bad} traps fire.`);
process.exit(bad ? 1 : 0);
