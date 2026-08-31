// turnRule.mjs — does a card turn? A But or a Therefore, by sense, not by spelling.
//
// The rule, in one sentence: **a closing card either complicates or forces a
// consequence, and either shape may be written any way English writes it.**
//
// It lives in its own file for the same reason `introRule.mjs` does: it is a
// rule rather than a check, it is worth testing on its own, and a second copy
// of it somewhere else would drift the first time either was corrected.
// `checkStory.mjs`'s rule 10/11 drama gate is what fails a campaign over it;
// run this file directly for the test.
//
//   node engine/dev/turnRule.mjs --selftest
//
// Rule 11 is named for two words, and this gate used to require one of them
// literally. That is a spelling test, not a story test. "Reflected light and
// heat finally pin the size down. Nobody has looked at what it is made of
// yet." is a But. "The blank ran clean. So nobody in that ward gets moved
// tonight." is a Therefore. The literal-word version failed both — and worse,
// it passed a science recap with a "But" bolted on the front, which is the
// exact defect rule 11 exists to catch.
//
// So the test is for a *turn*: a complication (the But family) or a forced
// consequence (the Therefore family), however it is worded. Two lists, because
// the short common words are the ambiguous ones:
//
//   TURN_ANYWHERE        unambiguous as a connective wherever it appears
//   TURN_CLAUSE_INITIAL  ambiguous mid-sentence — "so many samples", "the
//                        water went still" — and a turn at the head of a clause
//
// What still fails, on purpose: a segue with no turn in it anywhere. Two facts
// in sequence is the And Then this rule bans, whether or not the words "and
// then" are in it. Widening the wording does not widen the shape.
import { pathToFileURL } from 'node:url';
const TURN_ANYWHERE = new RegExp([
  // the But family — a complication
  'but', 'yet', 'however', 'though', 'although', 'instead', 'whereas', 'unless',
  'until', 'except', 'nonetheless', 'nevertheless',
  // the Therefore family — a forced consequence
  'therefore', 'thus', 'hence',
  // and the phrases that do either job without either word
  'as a result', 'which means', 'that means', 'which leaves', 'that leaves',
  'which puts', 'that puts', 'which forces', 'that forces', 'because of that',
  'no longer', 'even so', 'even then', 'on the other hand',
].map(w => `\\b${w}\\b`).join('|'), 'i');
// A clause head: the start of the text, after end punctuation, or after a comma
// or a dash.
const TURN_CLAUSE_INITIAL = /(?:^|[.!?;:]\s+|[,\u2014\u2013]\s*)(so|now|still)\b/i;

/** Does this card turn — a But or a Therefore, by sense rather than spelling? */
export const hasTurn = (text) => {
  const t = String(text ?? '');
  return TURN_ANYWHERE.test(t) || TURN_CLAUSE_INITIAL.test(t);
};

/**
 * The turn test, against the cases that would otherwise pass for the wrong
 * reason. The pairs are the point: a segue and the same segue rewritten
 * without the literal word have to score the *same*, or the gate is still a
 * spelling test wearing a longer word list.
 *
 * Put a bug back to see it work. Delete `TURN_CLAUSE_INITIAL` from `hasTurn`
 * and the "So nobody" and "Now the ward" cases fail, and only those. Drop the
 * clause-head guard (match `so|now|still` anywhere) and the two ambiguous
 * cases — "so many samples", "went still" — start passing, and only those.
 */
export function turnSelftest(){
  const cases = [];
  const turns = (name, text) => cases.push({ name, ok: hasTurn(text), text });
  const flat = (name, text) => cases.push({ name, ok: !hasTurn(text), text });

  // The But family, four ways of saying one thing.
  turns('the literal But', 'The size is pinned down. But nobody has looked at the composition.');
  turns('the same beat on "yet"', 'The size is pinned down. Nobody has looked at the composition yet.');
  turns('the same beat on "however"', 'The size is pinned down. However, the composition is unlooked at.');
  turns('the same beat on "no longer"',
    'The size is pinned down. What it is made of is no longer somebody else\'s problem.');

  // The Therefore family, four ways of saying one thing.
  turns('the literal Therefore', 'The blank ran clean. Therefore nobody in that ward moves tonight.');
  turns('the same beat on clause-initial "so"', 'The blank ran clean. So nobody in that ward moves tonight.');
  turns('the same beat on "that leaves"', 'The blank ran clean. That leaves nobody in that ward moving tonight.');
  turns('the same beat on clause-initial "now"', 'The blank ran clean. Now the ward has twelve hours.');

  // No turn at all: two facts in sequence, which is the And Then this rule
  // bans without needing the words.
  flat('two facts in sequence', 'The size came back at 340 metres. The team logged it and went home.');
  flat('a science recap', 'The assay measured 12 parts per million of chloride in the second sample.');

  // The ambiguous words doing their non-connective jobs.
  flat('"so" as a quantifier', 'There are so many samples that the bench has run out of room.');
  flat('"still" as an adjective', 'The water went still over the flats and the crew waited it out.');
  flat('"now" inside a clause', 'The crew that arrived a week ago now numbers eleven.');

  const bad = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '  ✓' : '  ✗'} ${c.name}`);
  if(bad.length){
    console.log(`\n✗ turn test: ${bad.length} of ${cases.length} case(s) wrong`);
    for(const c of bad) console.log(`  ✗ ${c.name}: "${c.text}"`);
    process.exit(1);
  }
  console.log(`\n✓ turn test: ${cases.length} cases, including the pairs that must score the same`);
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY) turnSelftest();
