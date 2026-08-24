// plainQuestions.mjs — the tagline, on the cards that carry the course.
//
//   node engine/dev/plainQuestions.mjs <theme>
//   node engine/dev/plainQuestions.mjs --all
//   node engine/dev/plainQuestions.mjs --selftest
//   node engine/dev/plainQuestions.mjs --write-debt     after a pass, to bank it
//
// `plainCards.mjs` gates the two narrative cards a player cannot avoid — the
// opening card and each day's stake — and says in its own header that it does
// not read the questions. This is that other half: the scene, the guide, the
// background, the verdict and the options on every stop. 2,331 of them.
//
// THE BAR AND THE SENTENCE CAP ARE IMPORTED, NOT RESTATED. `plainCards` owns
// both numbers. Two copies of one rule drift the first time either is corrected,
// and this file is the second description of the same rule — so it takes the
// constants rather than writing 6.5 and 28 down again.
//
// WHY THE SENTENCE CAP MATTERS MORE THAN THE GRADE HERE. Red Sand was taken
// through the accessibility pass card by card. Six of its first seventeen cards
// came out of that pass HARDER to read than they went in, and the cause was
// uniform: teacher voice written as long sentences. Splitting sentences alone —
// no term deleted, no gloss removed, no mechanism cut — moved the book from 7.39
// to 5.84. So the count of over-long sentences is the number to watch during a
// pass; the grade follows it.
//
// WHAT IT CANNOT SEE. Flesch-Kincaid counts syllables and sentence length. It
// cannot see a gloss. Keeping the official term and explaining it on the spot —
// which is the rule the pass is written to — costs syllables and is CORRECT, so
// a technical card sits near 1.6 syllables a word and cannot go lower without
// deleting the vocabulary. That is why `syl/w` is reported beside the grade: it
// is the number that tells you whether a fall came from shorter sentences or
// from a thinner course.
//
// THE HARD HALF. Three cards ship today with no `guide` at all and one with no
// verdict, and every gate in this repo passes them:
//
//   aftershock HAZ-5, seedbank CROSS-1, seedbank TRIAL-1   no guide
//   yellowbay WAFER-7                                      no game.why
//
// A card with no guide is a stop with no teaching before the question; a card
// with no verdict teaches nothing after it. Neither is debt to be banked, so
// those four are a hard failure with no debt entry — unlike the reading load,
// which is ratcheted. Two of the three missing guides were created the same way:
// a prose line beginning `word:` becomes a YAML key, and an indent slip merges a
// field into its neighbour. Both are invisible to every content gate, because
// what is left still reads as valid content.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir } from './registry.mjs';
import { fleschKincaid } from '../../tools/readability.js';
import { BAR, LONGEST } from './plainBar.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const DEBT_FILE = resolve(here, 'plainquestions-debt.json');

/** Syllables in a word, the same crude vowel-run count readability.js uses. */
function syllables(word){
  const m = word.toLowerCase().replace(/[^a-z]/g, '').match(/[aeiouy]+/g);
  return m ? Math.max(1, m.length) : 1;
}

/**
 * Split into sentences the way a reader does: on a full stop, a question mark or
 * an exclamation. NOT on a colon or a semicolon — those join independent clauses
 * and the words after them are still the same breath, which is exactly where the
 * pile-up hides. Fragments under three words are dropped so a card that ends
 * "Correct." does not read as a sentence of one.
 */
export function sentences(text){
  return String(text || '')
    .split(/[.!?]+(?=\s|$)/)
    .map(s => s.trim())
    .filter(s => s.split(/\s+/).filter(Boolean).length > 2);
}

/**
 * The blocks of a stop's card, each kept separate.
 *
 * WHY THIS IS A LIST AND NOT A STRING. The first version joined everything —
 * including all four options — with a space and split the result on full stops.
 * An option that does not end in punctuation therefore ran into the next one, and
 * four short options became one 50-word "sentence" the cap then flagged. 392
 * cards across 50 themes have unpunctuated options, so the report was inventing
 * pile-ups on most of the catalogue.
 *
 * It was caught the expensive way: a Phase 1 agent believed the number, added
 * terminal periods to every option on a theme to clear it, and reported that as
 * a finding to propagate. **A measurement that produces a plausible answer is
 * not thereby a working measurement** — and one that drives content edits to
 * satisfy its own artifact is worse than no measurement.
 *
 * Whether an option ought to end in a full stop is a real editorial question and
 * a separate one. It is not decided here.
 */
export function cardUnits(lesson){
  const g = lesson?.game ?? {};
  return [lesson?.scene, lesson?.guide, g.question ?? g.task, g.why, lesson?.takeaway,
    ...(lesson?.background ?? []), ...(g.choices ?? []).map(String)]
    .filter(Boolean).map(t => String(t).trim());
}

/** The same blocks as one string, for a whole-card readability score. */
export function cardText(lesson){
  return cardUnits(lesson).join(' ');
}

/**
 * The four numbers for one card.
 *
 * `units` is the card's blocks kept apart, so no two of them can be read as one
 * sentence. Pass a bare string and it is treated as a single block, which is
 * what the selftest and any ad-hoc use want.
 */
export function score(text, units){
  const blocks = units ?? [String(text ?? '')];
  const sents = blocks.flatMap(b => sentences(b));
  const words = blocks.join(' ').trim().split(/\s+/).filter(Boolean);
  if(!sents.length || !words.length) return null;
  const long = sents.filter(s => s.split(/\s+/).filter(Boolean).length > LONGEST);
  return {
    grade: fleschKincaid(blocks.join(' ')) ?? 0,
    wps: words.length / sents.length,
    spw: words.reduce((n, w) => n + syllables(w), 0) / words.length,
    words: words.length,
    long: long.length,
    longest: Math.max(...sents.map(s => s.split(/\s+/).filter(Boolean).length)),
    worstSentence: long.sort((a, b) => b.split(/\s+/).length - a.split(/\s+/).length)[0] ?? null,
  };
}

/** Every card in a theme's curriculum, scored, plus the cards missing a field. */
export function scoreTheme(curriculum){
  const rows = [], missing = [];
  for(const [area, lessons] of Object.entries(curriculum ?? {})){
    (lessons ?? []).forEach((l, i) => {
      const id = `${area}-${i + 1}`;
      const g = l?.game ?? {};
      // The hard half. A stop with no teaching before the question, or none
      // after it, is not a reading-load problem.
      if(!l?.scene) missing.push(`${id} has no scene`);
      if(!l?.guide) missing.push(`${id} has no guide`);
      if(!g.why) missing.push(`${id} has no verdict (game.why)`);
      const s = score(null, cardUnits(l));
      if(s) rows.push({ id, title: l?.title ?? '', ...s });
    });
  }
  return { rows, missing };
}

export function tally(rows){
  if(!rows.length) return { n: 0, grade: 0, wps: 0, spw: 0, long: 0, over: 0, worst: 0 };
  const mean = k => rows.reduce((n, r) => n + r[k], 0) / rows.length;
  return {
    n: rows.length,
    grade: mean('grade'), wps: mean('wps'), spw: mean('spw'),
    long: rows.reduce((n, r) => n + r.long, 0),
    over: rows.filter(r => r.grade > BAR).length,
    worst: Math.max(...rows.map(r => r.grade)),
  };
}

async function loadCurriculum(theme){
  const f = resolve(themeDir(theme), 'content/curriculum.js');
  if(!existsSync(f)) return null;
  try { return (await import(pathToFileURL(f).href)).CURRICULUM ?? null; }
  catch { return null; }
}

const readDebt = () => existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : { bar: BAR, longest: LONGEST, themes: {} };

// ---------------------------------------------------------------- selftest
//
// The rule from `alamos-measurement`: write the case where two inputs that
// should score the same actually do, and the case where a real defect fails.
// Then put the bug back and watch that case, and only that case, fail.
function selftest(){
  const cases = [];
  const card = o => ({ scene: o.scene ?? '', guide: o.guide ?? '', title: 't',
    background: o.background ?? [], takeaway: o.takeaway ?? '',
    game: { why: o.why ?? '', question: o.question ?? '', choices: o.choices ?? [] } });

  // 1. THE EQUALITY CASE. The same prose scores the same wherever on the card it
  //    sits. A version that joined `background` paragraphs with '' rather than ' '
  //    welded the last word of one to the first of the next, invented a
  //    seventeen-syllable word, and scored a three-paragraph card a grade harder
  //    than the identical text in a scene.
  const prose = 'Heat does two jobs. The rate goes up. The yield goes down. That is the trade.';
  const a = score(cardText(card({ scene: prose })));
  const b = score(cardText(card({ background: prose.split(' ').length ? [prose] : [] })));
  cases.push(['the same prose scores the same in a scene and in a background paragraph',
    Math.abs(a.grade - b.grade) < 0.01 && a.words === b.words]);

  // 2. A colon does NOT end a sentence. This is the one that matters during a
  //    pass: splitting on ':' as well as '.' shortens every segment, so a 38-word
  //    sentence with a colon in it reads as two of 19 and the cap never fires.
  //    That undercount is why Red Sand was reported at zero over-long sentences
  //    when the strict rule found three.
  const colon = 'Electrons that did something else still crossed and still counted as charge: a side '
    + 'reaction at the electrode, a shuttle current carrying charge to no purpose, and hydrogen '
    + 'recombining inside the cell before it ever reaches the separator anywhere at all.';
  cases.push(['a colon does not end a sentence, so the pile-up is still one sentence',
    sentences(colon).length === 1 && score(colon).long === 1]);

  // 3. THE CAP FIRES ON LENGTH, NOT ON GRADE. Long words in short sentences are
  //    a vocabulary cost and legitimate; long sentences of short words are the
  //    defect. The measurement has to tell those apart or the pass deletes terms
  //    to buy a number.
  const jargon = 'Overpotential is thermodynamically unavoidable. Electrolysis requires it. Stoichiometry does not.';
  const rambling = 'It is the case that when you look at the thing that is there you will find that it '
    + 'is the same as the one that was there before it was moved to the place where it is now.';
  const j = score(jargon), r = score(rambling);
  cases.push(['long words in short sentences trip no sentence cap', j.long === 0]);
  cases.push(['long sentences of short words do trip it', r.long === 1]);
  cases.push(['and syllables-per-word separates the two', j.spw > r.spw + 0.5]);

  // 4. THE PHANTOM PILE-UP. Four short options that do not end in punctuation are
  //    four short blocks, not one long sentence. This is the case that was live in
  //    the first version and cost an agent a theme's worth of content edits.
  const opts = ['A rate — the cordon lifts when aftershocks fall below one a day',
    'A condition — each stretch lifts when its recorded hazard is resolved',
    'A date — the cordon lifts on Friday',
    'No commitment until every building inside the cordon has been assessed'];
  const asBlocks = score(null, opts);
  const asBlob = score(opts.join(' '));
  cases.push(['four unpunctuated options are four blocks, not one pile-up', asBlocks.long === 0]);
  cases.push(['and joining them by hand is the bug, which still reads as one', asBlob.long === 1]);
  cases.push(['a card scores its options as blocks', score(null, cardUnits(card({
    scene: prose, guide: prose, why: prose, choices: opts }))).long === 0]);

  // 5. THE HARD HALF. A card with no guide is reported as missing, and is NOT
  //    reported merely as a heavy card — the two failures are different and the
  //    reading load of a card whose guide is absent is misleadingly good.
  const withGuide = scoreTheme({ A: [card({ scene: prose, guide: prose, why: prose })] });
  const without = scoreTheme({ A: [card({ scene: prose, guide: '', why: prose })] });
  cases.push(['a card with a guide reports nothing missing', withGuide.missing.length === 0]);
  cases.push(['a card with no guide is reported missing', without.missing.length === 1
    && /no guide/.test(without.missing[0])]);
  cases.push(['and deleting the guide does not raise the grade instead',
    without.rows.length === 1]);

  let bad = 0;
  for(const [name, ok] of cases){
    console.log(`  ${ok ? '✓' : '✗'} ${name}`);
    if(!ok) bad++;
  }
  console.log(bad ? `plainQuestions --selftest: ${bad} case(s) failed.`
    : `plainQuestions --selftest: ${cases.length} cases, the measurement knows a plain card from a heavy one.`);
  return bad ? 1 : 0;
}

// ---------------------------------------------------------------- run
//
// Guarded, because this file exports its measurement and other checkers import
// it. plainCards.mjs runs unguarded, which is how the first `plainQuestions
// --selftest` ran plainCards' selftest instead of its own — and then importing
// `score` from HERE ran a full 62-theme sweep. The same bug twice in one hour is
// the argument for the guard rather than for remembering.
const isEntry = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isEntry ? process.argv.slice(2) : ['--noop'];
if(isEntry){
if(argv.includes('--selftest')) process.exit(selftest());

const writeDebt = argv.includes('--write-debt');
const wanted = argv.includes('--all') || writeDebt || !argv.filter(a => !a.startsWith('--')).length
  ? themeNames() : argv.filter(a => !a.startsWith('--'));
const debt = readDebt();
let failed = 0, banked = 0;

for(const theme of wanted){
  const C = await loadCurriculum(theme);
  if(!C) continue;
  const { rows, missing } = scoreTheme(C);
  if(!rows.length) continue;
  const t = tally(rows);
  const was = debt.themes?.[theme];

  if(writeDebt){
    debt.themes[theme] = { over: t.over, long: t.long, worst: +t.worst.toFixed(1) };
    banked++;
    continue;
  }

  const head = `${theme.padEnd(22)} ${t.n} card(s)  grade ${t.grade.toFixed(2)}  w/s ${t.wps.toFixed(1)}  `
    + `syl/w ${t.spw.toFixed(2)}  over ${BAR}: ${t.over}  over-${LONGEST} sentences: ${t.long}  worst ${t.worst.toFixed(1)}`;

  // The hard half never becomes debt.
  if(missing.length){
    console.log(`✗ ${head}`);
    for(const m of missing) console.log(`    ✗ ${m}`);
    failed++;
    continue;
  }

  if(!was){
    console.log(`· ${head}   (not yet banked — run --write-debt to record it)`);
    continue;
  }
  // The ratchet: a theme may not gain a card over the bar, gain a sentence
  // pile-up, or make its worst card worse.
  const regressions = [];
  if(t.over > was.over) regressions.push(`cards over ${BAR}: ${was.over} → ${t.over}`);
  if(t.long > was.long) regressions.push(`over-${LONGEST} sentences: ${was.long} → ${t.long}`);
  if(+t.worst.toFixed(1) > was.worst) regressions.push(`worst card: ${was.worst} → ${t.worst.toFixed(1)}`);
  if(regressions.length){
    console.log(`✗ ${head}`);
    for(const r of regressions) console.log(`    ✗ ${r}`);
    const worstRows = rows.filter(r => r.grade > BAR).sort((a, b) => b.grade - a.grade).slice(0, 3);
    for(const r of worstRows) console.log(`      ${r.id} ${r.grade.toFixed(1)}  ${r.title}`);
    failed++;
  } else {
    const gain = (was.over - t.over) || (was.long - t.long);
    console.log(`✓ ${head}${gain > 0 ? '   (improved — re-bank with --write-debt)' : ''}`);
  }
}

if(writeDebt){
  debt.bar = BAR; debt.longest = LONGEST;
  debt._comment = 'What each campaign still owes the tagline on its QUESTION cards: cards over grade '
    + BAR + ', sentence pile-ups over ' + LONGEST + ' words, and its worst card. '
    + 'engine/dev/plainQuestions.mjs FAILS a theme that gains one or gets worse. A card with no scene, '
    + 'no guide or no verdict is a hard failure and is never banked. Rewrite cards down with the '
    + 'accessibility pass and re-bank with --write-debt; the numbers only fall.';
  writeFileSync(DEBT_FILE, JSON.stringify(debt, null, 2) + '\n');
  console.log(`banked ${banked} theme(s) → ${DEBT_FILE.split('/').pop()}`);
  process.exit(0);
}
console.log(failed ? `\nplainQuestions: ${failed} theme(s) failed.` : `\nplainQuestions: ${wanted.length} theme(s) checked.`);
process.exit(failed ? 1 : 0);
}
