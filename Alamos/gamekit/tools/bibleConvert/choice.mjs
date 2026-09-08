// choice.mjs — the bible's CHOICE block into the stop keys the book reads.
//
// 8 stops, across three campaigns, and every one of them is a stop the author
// MOVED. All eight were CLOUD — a scatter you narrow with actions until enough
// of it finishes inside a corridor — and none of the eight bibles ever wrote the
// bounds, the spread or the actions a scatter is made of. Rather than invent
// them, round 3 answered with a plain multiple choice: read the pattern the
// question already prints, and say what it supports.
//
// See `_shared.mjs` for the contract every converter in this directory keeps.
//
// WHY THIS FILE EXISTS AT ALL, since CHOICE is not an instrument. It was not
// obvious that it should. `normalize.js` retypes a plain multiple-choice
// activity, the importer's `choiceLike` reads `choices` and `answer` as ordinary
// stop keys, and there is no board under one key for a converter to rename. The
// case for carrying the canonical block through unchanged — which is what every
// format did before `convertCanonical` existed, and is still right for most — is
// a good one.
//
// It is wrong here, and the block itself says why:
//
//   choice:
//     evidence: "`cloud:{bins:[…],correct:declining,shape:top_heavy}`"
//     choices:
//       - {id: supported,     label: "The resident population is top-heavy and declining"}
//       - {id: settings_only, label: "Treat the settings table as the conclusion …"}
//       - {id: overclaim,     label: "Claim a cause or trend stronger than … support."}
//     answer: supported
//     rebuttals:
//       settings_only: "Settings are inputs; the measured cloud or pattern is the evidence."
//       overclaim:     "The observations support the bounded conclusion, not the stronger claim."
//
// Carried through, that writes a stop key called `choice` — which nothing in the
// importer, `normalize.js` or the engine has ever read — and leaves the stop
// declaring `format: CLOUD` over the half-built scatter it was moved away from.
// The book still asks the player to narrow a cloud with no actions in it. Three
// things are one field name away and one of them is the format itself:
//
//   `choices: [{id, label}]` → the stop's `choices`, the labels the panel prints
//                              and grades by.
//   `answer: supported`      → the stop's `answer`, which has to be the LABEL:
//                              `choiceLike` grades by comparing label text, so an
//                              id there is an answer that matches no option.
//   `rebuttals: {id: text}`  → the stop's `rebuttals`, which the engine renders as
//                              a flat list in wrong-option order (see
//                              `reasoningHTML` in questionUI.js). The map is
//                              keyed and the list is not; the order is the
//                              board's own.
//   `format: CLOUD`          → `format: CHOICE`, which is what the bible's own
//                              block header says and what `bs.buildFormat`
//                              already selects this converter by.
//
// WHAT IS DROPPED, documented rather than owed: `evidence`, which is the old
// CLOUD payload quoted back in backticks. It is the board that could not be
// built, not evidence a reader can use, and the numbers in it are in the stop's
// question already ("Plot age bins 0-14=28, 15-44=62, …").
//
// WHAT ALL EIGHT OWE, and it is the same line eight times. The two wrong options
// are the template's, identical in Carrying Capacity, Eleven Days and The Trial —
// "Treat the settings table as the conclusion without reading the pattern" and
// "Claim a cause or trend stronger than the displayed readings support" — with
// two rebuttals to match. They are answers about how to read a chart in general,
// not about this chart, so the keyed option is the only one that names anything
// in the question and the key is identifiable by shape without reading it. The
// rebuttals are there, one per wrong option, which is what this repo requires;
// what is missing is that they are about this stop.
import { str, list, pick } from './_shared.mjs';

export const FORMAT = 'CHOICE';

// The template's own distractors, named rather than inferred — the tell is not
// "this option is vague", it is "this option is the one the template came with".
const STOCK_OPTION = /^(treat the settings table as the conclusion|claim a cause or trend stronger)/i;

export const convertCanonical = (board, stop) => {
  const b = board ?? {};
  const owes = [];

  const rows = list(pick(b, 'choices', 'options'));
  const options = rows.map((c, i) => {
    if(c && typeof c === 'object'){
      return { id: str(pick(c, 'id')), label: str(pick(c, 'label', 'text')), at: i,
        // The later rounds mark the key and write the rebuttal ON the option
        // rather than in two lists beside it. Same two facts, carried here.
        keyed: pick(c, 'correct') === true,
        said: str(pick(c, 'feedback', 'rebuttal', 'why')) };
    }
    return { id: '', label: str(c), at: i, keyed: false, said: '' };
  });
  options.forEach((o) => {
    if(!o.label) owes.push(`option ${o.at + 1} has no \`label\` — the words the player picks between`);
  });
  const labels = options.map(o => o.label).filter(Boolean);
  if(labels.length < 3) owes.push(`${labels.length} labelled option(s), and a choice needs at least three`);
  if(new Set(labels).size !== labels.length){
    owes.push('two options carry the same label, and grading compares labels — the panel cannot tell'
      + ' them apart');
  }

  // The key. It is written as an id and graded as a label.
  //
  // AND IT MAY BE MARKED RATHER THAN NAMED. `correctOption: complement` names an
  // option id; `correct: true` on the option itself says the same thing without
  // naming anything. Both are read, and a board that does both and disagrees
  // with itself is told so rather than silently graded on one of them.
  const said = str(pick(b, 'answer', 'correct', 'correctChoice', 'correctOption', 'correct_option'));
  const marked = options.filter(o => o.keyed);
  if(marked.length > 1){
    owes.push(`${marked.length} options are marked \`correct: true\` — a choice has one answer, and`
      + ' grading takes the first, so the others would be wrong answers that read as right');
  }
  const answer = said || (marked.length === 1 ? (marked[0].id || marked[0].label) : '');
  const keyed = options.find(o => o.id && o.id === answer) ?? options.find(o => o.label === answer);
  if(said && marked.length === 1 && keyed && marked[0] !== keyed){
    owes.push(`the board names \`${said}\` as its answer and marks \`${marked[0].id || marked[0].label}\``
      + ' with `correct: true` — two different options, and only one of them can be graded');
  }
  if(!answer) owes.push('no `answer` — nothing on the board says which option is right');
  else if(!keyed){
    owes.push(`the answer \`${answer}\` is neither an option id nor an option label, so nothing on`
      + ' the board is keyed');
  }
  else if(!keyed.label) owes.push(`the keyed option \`${answer}\` has no label to grade against`);

  // The rebuttals, keyed by id in the block and rendered as a flat list in
  // wrong-option order. Order is the board's, not this file's.
  const map = pick(b, 'rebuttals', 'rebuttal') ?? {};
  const wrong = options.filter(o => o !== keyed);
  const rebuttals = [];
  if(Array.isArray(map)){
    // Already a list. Taken as written; a book may have been hand-fixed.
    map.map(str).filter(Boolean).forEach(r => rebuttals.push(r));
    if(rebuttals.length !== wrong.length){
      owes.push(`${rebuttals.length} rebuttal(s) for ${wrong.length} wrong option(s) — this repo`
        + ' wants one per wrong option, saying why THAT one fails');
    }
  } else if(map && typeof map === 'object'){
    for(const o of wrong){
      const r = str(o.id ? map[o.id] : '') || str(map[o.label]) || o.said;
      if(!r){
        owes.push(`the wrong option \`${o.id || o.label || `option ${o.at + 1}`}\` has no rebuttal —`
          + ' a wrong answer that is only told it is wrong learns nothing');
        continue;
      }
      rebuttals.push(r);
    }
  } else if(wrong.every(o => o.said)){
    // Written on the options themselves — see the note by `keyed` above. Taken
    // in board order, which is the order the panel prints them in.
    for(const o of wrong) rebuttals.push(o.said);
  } else if(wrong.length){
    const mute = wrong.filter(o => !o.said);
    owes.push(mute.length === wrong.length
      ? `no \`rebuttals\` — this repo wants one per wrong option, and there are ${wrong.length}`
      : `${mute.length} of ${wrong.length} wrong option(s) carry no \`feedback\` — `
        + `\`${mute.map(o => o.id || o.label).join('`, `')}\` — and a wrong answer that is only`
        + ' told it is wrong learns nothing');
  }

  const stock = wrong.filter(o => STOCK_OPTION.test(o.label));
  if(stock.length){
    owes.push(`${stock.length} wrong option(s) are the template's — "${stock[0].label}" is the same`
      + ' sentence in every campaign that carries this block, so it is an answer about reading a'
      + ' chart rather than about this one, and the keyed option is the only one naming anything in'
      + ' the question');
  }

  // `format` is written because the block's own header says CHOICE and the stop
  // still says CLOUD over a scatter that was never finished. It is the bible's
  // word, in the field the importer reads it from.
  return {
    key: 'choices',
    value: labels,
    owes,
    extra: {
      format: 'CHOICE',
      ...(keyed?.label ? { answer: keyed.label } : {}),
      ...(rebuttals.length ? { rebuttals } : {}),
      // THE SOURCE THE QUESTION IS ABOUT. Whiteout is the first campaign that
      // shows the player code and asks what it evaluates to, and its Mission 1
      // Stop 1 says "Read the three displayed lines" over a board that carried
      // none: the block's `code:` was dropped here, so the first question in
      // the campaign could not be answered from what was on screen. Carried
      // verbatim, newlines and indentation included — this is the one field on
      // a card where whitespace is content.
      ...(str(pick(b, 'code')) ? { code: String(pick(b, 'code')) } : {}),
    },
  };
};

// ---------------------------------------------------------------- selftest
//
// `node tools/bibleConvert/choice.mjs`. The case that matters is the third: an
// answer written as an id must come out as the LABEL, because grading compares
// labels — an id there passes every structural check and matches no option.
function selftest(){
  const fails = [];
  const ok = (cond, what) => { if(!cond) fails.push(what); };

  const shipped = {
    evidence: '`cloud:{bins:[{age:"0-14",count:28}],correct:declining,shape:top_heavy}`',
    choices: [
      { id: 'supported', label: 'The resident population is top-heavy and declining' },
      { id: 'settings_only', label: 'Treat the settings table as the conclusion without reading the pattern.' },
      { id: 'overclaim', label: 'Claim a cause or trend stronger than the displayed readings support.' },
    ],
    answer: 'supported',
    rebuttals: {
      settings_only: 'Settings are inputs; the measured cloud or pattern is the evidence.',
      overclaim: 'The observations support the bounded conclusion, not the stronger claim.',
    },
  };
  const a = convertCanonical(structuredClone(shipped), {});
  ok(a.key === 'choices', `the block keyed "${a.key}", not "choices"`);
  ok(Array.isArray(a.value) && a.value.length === 3, 'the options did not come through as a list');
  ok(a.value[0] === 'The resident population is top-heavy and declining', 'an option lost its label');
  ok(a.extra.answer === 'The resident population is top-heavy and declining',
    `the answer came out as "${a.extra.answer}" — an id, not the label grading compares`);
  ok(a.extra.format === 'CHOICE', 'the stop was left declaring the format it was moved away from');
  ok(a.extra.rebuttals.length === 2, `${a.extra.rebuttals.length} rebuttals for two wrong options`);
  ok(a.extra.rebuttals[0] === 'Settings are inputs; the measured cloud or pattern is the evidence.',
    'the rebuttal map was not flattened in wrong-option order');
  ok(!('evidence' in a.extra) && !('choice' in a.extra),
    'the quoted CLOUD payload reached a field nothing renders');
  // The eight shipping boards all carry the template's two distractors.
  ok(a.owes.length === 1 && /wrong option\(s\) are the template's/.test(a.owes[0]),
    `the shipping block owes ${a.owes.length}: ${a.owes.join(' / ')}`);

  // A board written about its own stop owes nothing.
  const written = structuredClone(shipped);
  written.choices[1].label = 'The 45-64 bin is the largest, so the population is growing';
  written.choices[2].label = 'The bins are counts, so no direction can be read from them at all';
  const w = convertCanonical(written, {});
  ok(w.owes.length === 0, `a block written for its stop owes ${w.owes.length}: ${w.owes.join(' / ')}`);
  ok(w.extra.rebuttals.length === 2, 'the rebuttals did not survive relabelled options');

  // THE CASE THAT MATTERS, put the other way round. An answer that is a label
  // and an answer that is the matching id must produce the SAME `answer` — and
  // an answer that is neither must produce none at all rather than the id.
  const byLabel = structuredClone(shipped);
  byLabel.answer = 'The resident population is top-heavy and declining';
  const l = convertCanonical(byLabel, {});
  ok(l.extra.answer === a.extra.answer, 'the same key written as a label and as an id scored differently');
  const nokey = structuredClone(shipped);
  nokey.answer = 'the_conclusion';
  const n = convertCanonical(nokey, {});
  ok(n.owes.some(o => /is neither an option id nor an option label/.test(o)),
    `an unkeyed answer is not owed: ${n.owes.join(' / ')}`);
  ok(!('answer' in n.extra), 'an answer nothing on the board is keyed to was written anyway');

  // One rebuttal out, and only that one.
  const short = structuredClone(shipped);
  delete short.rebuttals.overclaim;
  const s = convertCanonical(short, {});
  ok(s.owes.some(o => /`overclaim` has no rebuttal/.test(o)),
    `a missing rebuttal is not owed: ${s.owes.join(' / ')}`);
  ok(s.extra.rebuttals.length === 1, 'a rebuttal was invented for the option that had none');
  ok(s.owes.filter(o => /has no rebuttal/.test(o)).length === 1,
    `pulling one rebuttal owes ${s.owes.length} rebuttal lines`);

  // Three options is the floor, and two is not it.
  const two = structuredClone(shipped);
  two.choices.splice(2, 1);
  delete two.rebuttals.overclaim;
  const t = convertCanonical(two, {});
  ok(t.owes.some(o => /2 labelled option\(s\)/.test(o)), 'a two-option choice is not owed');
  ok(t.value.length === 2, 'an option was invented to reach the floor');

  // THE SIXTH ROUND'S SHAPE. The key is marked on the option and the rebuttal
  // is written beside it, instead of an `answer` and a `rebuttals` map. It is
  // the same board, so it has to convert to the same thing.
  const marked = { question: 'Which one?', options: [
    { id: 'a', label: 'Right one', correct: true },
    { id: 'b', label: 'Wrong one', correct: false, feedback: 'Because b.' },
    { id: 'c', label: 'Other wrong one', correct: false, feedback: 'Because c.' }] };
  let mk = convertCanonical(marked, {});
  ok(mk.owes.length === 0, `a marked board owes nothing: ${mk.owes.join(' | ')}`);
  ok(mk.extra.answer === 'Right one', `the key is graded as a label: ${mk.extra.answer}`);
  ok(JSON.stringify(mk.extra.rebuttals) === '["Because b.","Because c."]',
    JSON.stringify(mk.extra.rebuttals));

  // And named instead of marked, which must give the identical answer.
  const named = { question: 'Which one?', correctOption: 'a', options: [
    { id: 'a', label: 'Right one' },
    { id: 'b', label: 'Wrong one', feedback: 'Because b.' },
    { id: 'c', label: 'Other wrong one', feedback: 'Because c.' }] };
  ok(JSON.stringify(convertCanonical(named, {}).extra) === JSON.stringify(mk.extra),
    'naming the key and marking it describe one board');

  // The case the disagreement check exists for.
  const both = { question: 'Which one?', correctOption: 'a', options: [
    { id: 'a', label: 'Right one' },
    { id: 'b', label: 'Wrong one', correct: true, feedback: 'Because b.' },
    { id: 'c', label: 'Other wrong one', feedback: 'Because c.' }] };
  ok(convertCanonical(both, {}).owes.some(o => /only one of them can be graded/.test(o)),
    'a board that names one answer and marks another is refused');

  console.log(fails.length ? `CHOICE selftest: ${fails.length} FAILED\n  ${fails.join('\n  ')}`
    : 'CHOICE selftest: ok');
  return fails.length;
}
if(process.argv[1] && process.argv[1].endsWith('choice.mjs')) process.exit(selftest() ? 1 : 0);
