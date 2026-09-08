// casebook.mjs — the bible's evidence table into the importer's matching board.
//
// CASEBOOK is the one board the engine grades by POSITION. `questionUI.js`
// reads it as three parallel things:
//
//   scenarios  the clue rows, as strings
//   choices    the interpretations, as strings
//   mapping    for row i, the INDEX into `choices` that row belongs to
//
// Whiteout writes the same three facts by id, which is the readable way to
// author a matching table and cannot be read by index:
//
//   scenarios: [{id: c17_after_patch, label: "C17 after patch", reading: "id C17; limit 90"}, …]
//   choices:   [{id: patch_landed_c17, label: "C17 received the patch"}, …]
//   mapping:   {c17_after_patch: patch_landed_c17, …}
//
// Left alone, the generic reader flattened both lists into one `choices` of
// eight labels — every clue offered as an interpretation of itself — and the
// importer refused the board for a mapping that covered no clue. So this is a
// shape conversion and nothing else: no row is added, no pairing is decided
// here, and a board already written as three lists passes through untouched.
//
// THE ROW IS THE LABEL AND ITS READING. A clue is "C17 after patch" and what it
// reads is "id C17; limit 90", and the panel prints one string per row — so the
// two are joined with an em dash, which is what the eight converted campaigns
// already write by hand ("Pipe discharge"). Neither half is invented and neither
// is dropped: a row printed without its reading is a row the player cannot use.
//
//   node tools/bibleConvert/casebook.mjs
import { pathToFileURL } from 'node:url';
import { str, pick, list } from './_shared.mjs';

export const FORMAT = 'CASEBOOK';

/** A row or an option as the panel prints it. */
const textOf = (x) => {
  if(x && typeof x === 'object'){
    const label = str(pick(x, 'label', 'text', 'name'));
    const reading = str(pick(x, 'reading', 'evidence', 'value'));
    return reading && reading !== label ? `${label} — ${reading}` : label;
  }
  return str(x);
};
const idOf = (x, i) => (x && typeof x === 'object'
  ? str(pick(x, 'id', 'label', 'text', 'name')) : str(x)) || `row ${i + 1}`;

export const convertCanonical = (board) => {
  const b = board ?? {};
  const owes = [];
  const rows = list(pick(b, 'scenarios', 'cards', 'clues'));
  const opts = list(pick(b, 'choices', 'interpretations', 'conclusions'));
  const raw = pick(b, 'mapping') ?? {};

  const scenarios = rows.map(textOf);
  const choices = opts.map(textOf);
  const optAt = new Map(opts.map((o, i) => [idOf(o, i), i]));
  // A label is as good a handle as an id, because half the bibles key the
  // mapping by the words the player reads.
  opts.forEach((o, i) => { const t = textOf(o); if(t && !optAt.has(t)) optAt.set(t, i); });

  // The mapping is already a list of indexes, or it is keyed by clue.
  let mapping;
  if(Array.isArray(raw) && raw.every(v => Number.isInteger(+v))){
    mapping = raw.map(v => +v);
  } else {
    mapping = rows.map((r, i) => {
      const key = idOf(r, i);
      const to = raw && typeof raw === 'object' ? str(raw[key]) : '';
      if(!to){ owes.push(`clue \`${key}\` is not in \`mapping\` — a clue with no interpretation is`
        + ' a card the player can never place'); return -1; }
      const at = optAt.has(to) ? optAt.get(to) : -1;
      if(at < 0) owes.push(`clue \`${key}\` maps to \`${to}\`, which is not one of the choices`);
      return at;
    });
  }

  if(rows.length < 3) owes.push(`${rows.length} clue row(s) — a casebook needs at least three`);
  if(opts.length < rows.length){
    owes.push(`${opts.length} interpretation(s) for ${rows.length} clue(s) — two clues share an`
      + ' answer, so one of the rows decides nothing');
  }
  if(scenarios.some(t => !t)) owes.push('a clue row prints as an empty string');
  if(choices.some(t => !t)) owes.push('an interpretation prints as an empty string');

  const cols = list(pick(b, 'columns'));
  // `key: null` — a casebook has no wrapper. Its three lists sit on the stop,
  // which is where the importer and `questionUI.js` both read them.
  return { key: null, value: null, owes, extra: {
    scenarios, choices, mapping,
    ...(cols.length === 2 ? { columns: cols.map(str) } : {}),
  } };
};

// ---------------------------------------------------------------- selftest
//
// The case that must fail when the conversion is put back: an id-keyed mapping
// has to come out as indexes into `choices`, and the clue rows must NOT end up
// in `choices` beside the interpretations.
function selftest(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  const whiteout = {
    scenarios: [
      { id: 'c17_after_patch', label: 'C17 after patch', reading: 'id C17; limit 90' },
      { id: 'p02_after_patch', label: 'P02 after patch', reading: 'id P02; limit 70' },
      { id: 'identity_test', label: 'Identity comparison', reading: 'C17 == P02 is false' },
      { id: 'class_test', label: 'Class comparison', reading: 'both are PowerController objects' },
    ],
    choices: [
      { id: 'patch_landed_c17', label: 'C17 received the patch' },
      { id: 'p02_unchanged', label: 'P02 did not receive the patched state' },
      { id: 'different_objects', label: 'The references identify different objects' },
      { id: 'same_class_only', label: 'Same class does not mean same object' },
    ],
    mapping: { c17_after_patch: 'patch_landed_c17', p02_after_patch: 'p02_unchanged',
               identity_test: 'different_objects', class_test: 'same_class_only' },
  };
  const a = convertCanonical(whiteout);
  ok(a.owes.length === 0, `a complete board owes ${a.owes.length}: ${a.owes.join(' / ')}`);
  ok(a.key === null, 'a casebook has no wrapper key');
  ok(a.extra.mapping.join() === '0,1,2,3', `mapping came out ${a.extra.mapping.join()}`);
  ok(a.extra.choices.length === 4, `${a.extra.choices.length} choices, not 4 — the clue rows are in`
    + ' the interpretation list');
  ok(a.extra.scenarios[0] === 'C17 after patch — id C17; limit 90',
    `the row prints as "${a.extra.scenarios[0]}" and loses its reading`);
  ok(!a.extra.choices.some(c => /limit 90/.test(c)), 'a reading reached the interpretations');

  // Out of order, which is the whole reason the mapping is keyed rather than
  // positional: row 1 must not silently become choice 1.
  const shuffled = structuredClone(whiteout);
  shuffled.mapping = { c17_after_patch: 'different_objects', p02_after_patch: 'same_class_only',
                       identity_test: 'patch_landed_c17', class_test: 'p02_unchanged' };
  ok(convertCanonical(shuffled).extra.mapping.join() === '2,3,0,1',
    'a shuffled mapping did not survive the conversion');

  // A clue with no mapping is owed, and nothing is invented for it.
  const short = structuredClone(whiteout);
  delete short.mapping.class_test;
  const c = convertCanonical(short);
  ok(c.owes.some(o => /class_test` is not in `mapping`/.test(o)),
    `an unmapped clue is not owed: ${c.owes.join(' / ')}`);
  ok(c.extra.mapping[3] === -1, 'an unmapped clue was given an interpretation anyway');

  // A mapping naming something that is not on the board.
  const wrong = structuredClone(whiteout);
  wrong.mapping.class_test = 'no_such_choice';
  ok(convertCanonical(wrong).owes.some(o => /no_such_choice/.test(o)),
    'a mapping to a missing choice is not owed');

  // Already converted: three lists and numeric indexes, untouched.
  const plain = { scenarios: ['Pipe discharge', 'Field runoff', 'Landfill leachate'],
                  choices: ['Point source', 'Nonpoint source', 'Groundwater pathway'],
                  mapping: [0, 1, 2] };
  const d = convertCanonical(plain);
  ok(d.owes.length === 0, `an already-converted board owes ${d.owes.length}: ${d.owes.join(' / ')}`);
  ok(d.extra.scenarios.join() === plain.scenarios.join(), 'a plain board was rewritten');
  ok(d.extra.mapping.join() === '0,1,2', 'a numeric mapping did not pass through');

  console.log(fails.length ? `CASEBOOK selftest: ${fails.length} failed\n  ${fails.join('\n  ')}`
    : 'CASEBOOK selftest: ok');
  process.exitCode = fails.length ? 1 : 0;
}
if(process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) selftest();
