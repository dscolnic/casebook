// numeralWords.mjs — a digit where the word "one" belongs
//
//   node engine/dev/numeralWords.mjs <theme> [<theme> …]
//   node engine/dev/numeralWords.mjs --all
//   node engine/dev/numeralWords.mjs --selftest
//
// A numeral-normalisation pass over the books replaced spelled-out numbers with
// digits, and it could not tell a count from a pronoun. What it left behind, in
// 27 of 42 books:
//
//   "She is the 1 who keeps saying that the buildings are not the story"
//   "The earlier 1 is 98°F. The later 1 is 101°F"
//   "the radius is not the 1 on the 1974 drawing"
//   "the expression still looks like the 1 in every textbook"
//   "1 governs the interim in 20 days"
//   "Kaur has two charges on the bench: the spent 1 from sol 288 and a fresh 1 still in its"
//   "the ratio of 1 agreed water"
//
// And in ten stop TITLES, which are read on the plan card, on the map and above
// the question: "6 Patients, 1 First Room — Review 2", "Follow 1 Breath",
// "3 Jobs, 3 Organs" — all in Hospital Heroes, whose reader is seven, and all
// only in the review variants while the base titles were intact.
//
// The same pass swallowed across a sentence end elsewhere: "Ice between 51200
// metres holds bubbles" was "between 500 and 1,200 metres" before it ran. That
// case is not detectable by rule — the result is a valid shorter number — and it
// is why this one is worth gating: the pronoun cases *are* detectable, and they
// are the same pass's other half.
//
// WHY THE LIST IS CLOSED, AND SHORT
//
// A bare "1" before a noun is usually correct: "1 cup", "1 minute", "1 mole",
// "1 barn", "1 eV", "1 radian", "1 megaton" are all house style and all fine.
// So is a numeral before a numbered thing — "Day 1 had 96 events", "point 1 is
// the pond surface", "Machines 1 and 2", "Group 1 reactivity", "type 1
// diabetes" — and so is mathematics: "the numerator goes to 1 and the
// denominator to 0", "e^(−t/T) goes to 1 at t = 0", "the rate falls as 1 over
// elapsed time", "1 divided by the recession constant", "raising it by 1 gives
// 0". A gate that fired on those would be a wall.
//
// So this fires only on words that can follow the PRONOUN "one" and nothing
// else — verbs, relative pronouns and a handful of nouns that cannot be
// counted here. Sixty words of the corpus's vocabulary were read to pick them.
// Two guards keep it honest: a numbered label before the digit is skipped, and
// so is a digit after the digit ("1 in 600", "1 of 3" — odds and fractions are
// written in numerals).
//
// Ninety-five occurrences across twenty books were fixed by this rule, and
// eleven more by hand, including the ten titles. Everything the rule declines
// to touch was read and left alone.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

// Only what can follow the pronoun. Nothing here is ever a unit or a label.
const PRONOUN_ONLY = ('who coming working sitting stays bottoming nobody everybody anybody alone '
  + 'disturbed splits takes would governs concerns expires duplicated says spent clean still '
  + 'from has is number substitution measurement case of that this with for on agreed').split(' ');

// "1" is an identifier, not a count, when a numbered thing comes before it.
const LABEL = /(?:day|days|week|weeks|machine|machines|point|points|step|steps|group|groups|table|figure|unit|units|phase|tier|arm|site|chip|cell|class|type|level|stage|sol|line|lines|column|row|band|qubit|f)\s*$/i;

const RE = new RegExp('(?<![0-9.:/\\-−])\\b1 (' + PRONOUN_ONLY.join('|') + ')\\b', 'g');

/**
 * A title is a special case. It is short, it is read on the plan card, on the
 * map and above the question, and across all 42 books there is no title where a
 * bare "1" is a count — the ones that legitimately open on a digit use larger
 * numbers ("400 children on Monday", "100 collisions an hour", "9 metres to take
 * back 29"). So in a title, any bare 1 followed by a word is the pronoun.
 * Hospital's ten damaged titles were "6 Patients, 1 First Room — Review 2" and
 * "Follow 1 Breath", and neither is reachable by the pronoun list.
 */
export function numeralInTitle(title){
  const s = String(title ?? '');
  const out = [];
  for(const m of s.matchAll(/(?<![0-9.:/\-−])\b1 (?=[A-Za-z])/g)){
    if(LABEL.test(s.slice(0, m.index))) continue;
    // "1 of 14" is a fraction, and a fraction keeps its digits.
    if(/^(?:of|in|out of)\s+\d/.test(s.slice(m.index + 2))) continue;
    out.push({ hit: s.slice(m.index, m.index + 14), at: m.index, context: s });
  }
  return out;
}

/** Every place in one string where a digit stands in for the word "one". */
export function numeralPronouns(text){
  const s = String(text ?? '');
  const out = [];
  for(const m of s.matchAll(RE)){
    if(LABEL.test(s.slice(0, m.index))) continue;
    const after = s.slice(m.index + m[0].length).trimStart();
    // Odds and fractions keep their digits: "1 in 600", "1 of 3".
    if(/^[0-9]/.test(after) && ['of', 'for', 'with', 'on', 'that', 'this'].includes(m[1])) continue;
    out.push({ hit: m[0], at: m.index, context: s.slice(Math.max(0, m.index - 40), m.index + 44) });
  }
  return out;
}

const FIELDS = ['title', 'scene', 'story', 'takeaway', 'guide', 'place'];
const GAME_FIELDS = ['question', 'task', 'answer', 'why', 'headline', 'setup', 'prompt', 'explanation'];

async function contentOf(name){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(name), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return { content, theme };
}

async function runTheme(name){
  const { content, theme } = await contentOf(name);
  const bad = [];
  const look = (where, text) => {
    for(const h of numeralPronouns(text)) bad.push({ where, ...h });
  };
  for(const [g, lessons] of Object.entries(content.CURRICULUM ?? {})){
    (lessons ?? []).forEach((l, i) => {
      for(const f of FIELDS) look(`${g}[${i}] ${f}`, l?.[f]);
      for(const h of numeralInTitle(l?.title)) bad.push({ where: `${g}[${i}] title`, ...h });
      for(const b of l?.background ?? []) look(`${g}[${i}] background`, b);
      for(const a of l?.assumes ?? []) look(`${g}[${i}] assumes`, a);
      const ch = l?.game ?? {};
      for(const f of GAME_FIELDS) look(`${g}[${i}] game.${f}`, ch[f]);
      for(const c of ch.choices ?? []) look(`${g}[${i}] choice`, c);
      for(const r of ch.rebuttals ?? []) look(`${g}[${i}] rebuttal`, r);
    });
  }
  (content.MISSIONS ?? []).forEach((m, i) => {
    look(`mission ${i + 1} stake`, m?.stake);
    look(`mission ${i + 1} briefing`, m?.briefing);
    look(`mission ${i + 1} title`, m?.title);
    for(const h of numeralInTitle(m?.title)) bad.push({ where: `mission ${i + 1} title`, ...h });
    look(`mission ${i + 1} takeaway`, m?.takeaway);
  });
  for(const [k, v] of Object.entries(content.COPY ?? {})) look(`COPY ${k}`, v);
  for(const p of theme.opening ?? []) look('opening card', p);
  for(const p of theme.ending ?? []) look('ending card', p);

  if(bad.length){
    console.log(`\n✗ theme "${name}": ${bad.length} digit(s) standing in for the word "one"`);
    for(const b of bad.slice(0, 12)){
      console.log(`  ✗ ${b.where}: [${b.hit}]  …${b.context.replace(/\s+/g, ' ')}…`);
    }
    if(bad.length > 12) console.log(`  … ${bad.length - 12} more`);
    console.log('  These are the pronoun "one", not a count. A title is the worst place for it:');
    console.log('  it is read on the plan card, on the map and above the question.');
    return 1;
  }
  console.log(`✓ ${name}: no digit stands in for the word "one"`);
  return 0;
}

// --- selftest ------------------------------------------------------------
// The cases that must PASS are the whole reason the list is closed. Get any of
// them wrong and this fires on ordinary house style in every book.
function selftest(){
  const cases = [
    { name: 'the pronoun, as a relative clause', text: 'She is the 1 who keeps saying so.', expect: 1 },
    { name: 'the pronoun, twice in one sentence', text: 'The earlier 1 is 98°F. The later 1 is 101°F.', expect: 2 },
    { name: 'the pronoun before a preposition', text: 'the radius is not the 1 on the 1974 drawing', expect: 1 },
    { name: 'a numbered label is not a count', text: 'Day 1 had 96 events above magnitude 3.', expect: 0 },
    { name: 'a numbered label, plural', text: 'Machines 1 and 2 available. Combined 34 m³/s.', expect: 0 },
    { name: 'odds keep their digits', text: 'Roughly 1 of 600 allowed solutions impact instead.', expect: 0 },
    { name: 'a unit is not the pronoun', text: 'The youngest pupil drinks about 1 litre a day.', expect: 0 },
    { name: 'mathematics: a term going to 1', text: 'e^(−t/T) goes to 1 at t = 0, so the numerator is 1 − 1.', expect: 0 },
    { name: 'mathematics: 1 over something', text: 'the rate falls roughly as 1 over elapsed time', expect: 0 },
    { name: 'a decimal is not a bare 1', text: 'Row A sits 1.1 metres behind the rail.', expect: 0 },
    { name: 'a ratio is not a bare 1', text: '300 expected against 306 observed is a 3 : 1 fit.', expect: 0 },
  ];
  const titleCases = [
    { name: 'a title with a bare 1 in it', text: '6 Patients, 1 First Room — Review 2', expect: 1 },
    { name: 'a title that opens on a real count', text: '400 children on Monday', expect: 0 },
    { name: 'a title with a larger number mid-line', text: '9 metres to take back 29', expect: 0 },
    { name: 'a title with a numbered label', text: 'Station 12 is six people and a storm season', expect: 0 },
  ];
  let failed = 0;
  for(const c of cases){
    const got = numeralPronouns(c.text).length;
    const ok = got === c.expect;
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  for(const c of titleCases){
    const got = numeralInTitle(c.text).length;
    const ok = got === c.expect;
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  if(failed){
    console.log(`\n✗ numeralWords selftest: ${failed} case(s) wrong`);
    return 1;
  }
  console.log(`\n✓ numeralWords selftest: ${cases.length + titleCases.length} case(s), and a count, a unit, a label and a ratio all keep their digits`);
  return 0;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) process.exit(selftest());
const names = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? themeNames() : args.filter(a => !a.startsWith('--'));
let failed = 0;
for(const n of names) failed += await runTheme(n);
if(failed){
  console.log(`\n✗ numeralWords: ${failed} theme(s) with a digit where the word "one" belongs.`);
  process.exit(1);
}
console.log(`\n✓ numeralWords: ${names.length} theme(s), every "one" is a word where it should be.`);
