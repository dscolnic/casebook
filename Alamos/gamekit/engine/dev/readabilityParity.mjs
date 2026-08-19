// readabilityParity.mjs — a number costs what a number costs, however it is spelled.
//
//   node engine/dev/readabilityParity.mjs
//
// WHY THIS CHECK EXISTS. The reading-level gate is Flesch–Kincaid, which is
// words-per-sentence and syllables-per-word and nothing else. That makes it
// blind in a way nobody noticed until a sweep of the mission cards ranked the
// games and the ranking turned out to be partly about house style:
//
//   · "eleven point four" is three words and five syllables where "11.4" is
//     one and one, so a game that spells its numbers out reads *harder* than
//     the same game that does not. Red Sand spells out thirteen and uses no
//     digits; Aftershock does the exact opposite.
//   · and "11.4" contains a full stop, which the sentence counter counts, so a
//     card with three decimals in it is scored as having three extra sentences
//     and reads *easier*. The two conventions were wrong in opposite
//     directions, which is worse than either alone: it spreads the games apart
//     on an axis that has nothing to do with how hard they are to read.
//
// `tools/readability.js` normalises both to one dotless token. This asserts it
// still does — the pairs below are the same sentence written both ways, and
// every pair must score identically. It is a two-millisecond check standing in
// front of a bug that produced a plausible, wrong, published table.
import { readingStats, normaliseNumerals } from '../../tools/readability.js';

// Each pair is [spelled, digits] and must measure the same.
const PAIRS = [
  // A sentence ENDING in a spelled number, followed by one that starts with
  // another. The number-run swallower crossed the full stop between them and
  // merged both into one token, so the two sentences were counted as one: 38
  // words per sentence where the text has 18. Found by a guide that measured
  // over the 28-word cap while containing no sentence longer than 22.
  ['The account survives into the second one. Three features of the room can be changed, one at a time, and the recording is replayed each time.',
   'The account survives into the second 1. 3 features of the room can be changed, 1 at a time, and the recording is replayed each time.'],
  ['The bed made eleven point four kilograms of methane against nine point seven the sol before, and the loop took back most of what the pass gave away.',
   'The bed made 11.4 kilograms of methane against 9.7 the sol before, and the loop took back most of what the pass gave away.'],
  ['The transfer window opens one hundred and ninety-five sols from now, and the tanks hold three point nine tonnes against the six point six they need.',
   'The transfer window opens 195 sols from now, and the tanks hold 3.9 tonnes against the 6.6 they need.'],
  ['Twenty-six months is the gap, and forty degrees is what she wants to add to a bed already running at three hundred and twenty.',
   '26 months is the gap, and 40 degrees is what she wants to add to a bed already running at 320.'],
];

let failed = 0;
const near = (a, b) => Math.abs(a - b) < 0.05;

// The parity above cannot see a boundary that both forms lose in the same way, so
// this asserts the sentence count directly on the case that found the bug.
{
  const t = 'The account survives into the second one. Three features can be changed.';
  const st = readingStats(t);
  if(st.sentences !== 2){
    console.log(`✗ a sentence ending in a spelled number lost its boundary:`
      + ` ${st.sentences} sentence(s) counted in a two-sentence line`);
    process.exitCode = 1;
  } else {
    console.log('✓ a spelled number at the end of a sentence keeps the full stop after it');
  }
}

for(const [i, [spelled, digits]] of PAIRS.entries()){
  const a = readingStats(spelled), b = readingStats(digits);
  const same = a.words === b.words && a.sentences === b.sentences
    && near(a.syllablesPerWord, b.syllablesPerWord)
    && (a.fk == null) === (b.fk == null)
    && (a.fk == null || near(a.fk, b.fk));
  if(!same){
    failed++;
    console.log(`  ✗ pair ${i + 1}: the same sentence scores differently in the two conventions`);
    console.log(`      spelled: ${a.words}w ${a.sentences}s ${a.syllablesPerWord.toFixed(3)} syl/w`
      + `${a.fk == null ? '' : ` FK ${a.fk.toFixed(2)}`}`);
    console.log(`      digits : ${b.words}w ${b.sentences}s ${b.syllablesPerWord.toFixed(3)} syl/w`
      + `${b.fk == null ? '' : ` FK ${b.fk.toFixed(2)}`}`);
  }
}

// A decimal must never end a sentence. This is the half that reads as a
// *lower* grade, so nothing about the output looks wrong when it breaks.
const dotted = normaliseNumerals('The tanks hold 3.9 tonnes and the plant makes 11.4 a sol.');
const enders = (dotted.match(/[.!?]+/g) || []).length;
if(enders !== 1){
  failed++;
  console.log(`  ✗ a decimal point is still being counted as the end of a sentence`);
  console.log(`      "${dotted}" — ${enders} sentence ending(s), expected 1`);
}

console.log(failed
  ? `\n✗ readability: ${failed} parity failure(s) — the grade depends on how numbers are spelled`
  : `✓ readability: numbers cost the same spelled out or in digits, across ${PAIRS.length} pair(s)`);
process.exit(failed ? 1 : 0);
