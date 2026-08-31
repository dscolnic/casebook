// plainCards.mjs — the tagline, as a measurement.
//
//   node engine/dev/plainCards.mjs <theme>
//   node engine/dev/plainCards.mjs --all
//   node engine/dev/plainCards.mjs --selftest
//   node engine/dev/plainCards.mjs --write-debt      after a pass, to bank it
//
// **Hard concepts, explained at a sixth-grade reading level.** That is the whole
// product, and until now nothing in `npm run check` asked whether a card met it.
// `questionLoad`'s four numbers gate at grade 8 and below only, so a campaign
// declaring `audience: { grade: 12 }` — twenty-eight of them do — passed every
// gate in the repo with grade-11 prose on the card a player reads every morning.
// `alamos-accessibility` says so in as many words and asks for this file.
//
// WHAT IT MEASURES. The two narrative cards the player cannot avoid: the opening
// card, read once before anything else, and each day's stake, read before every
// day. Not the questions — `questionLoad` and the accessibility pass own those,
// and a stop's options legitimately carry the course's own nouns.
//
// WHAT IT CANNOT SEE, and this is the important half. Flesch-Kincaid counts
// syllables and sentence length. It cannot see that "Hold too little and the
// first cold evening finds out" is oblique — that sentence is nine words of one
// and two syllables and scores grade 3. Every card on this list has to be read
// by somebody after it passes. What the number does catch is the pile-up: the
// 30-word sentence with two subordinate clauses, which is most of what makes
// these cards hard.
//
// THE BAR IS FIXED, NOT `audience.grade`. A grade-12 campaign teaching AP
// Physics gets the same 6.5 as the junior edition, because the tagline is not
// "at the reading level the campaign declares". The demand stays where the
// syllabus put it; only the sentences come down.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir } from './registry.mjs';
import { fleschKincaid } from '../../tools/readability.js';

const here = dirname(new URL(import.meta.url).pathname);
const DEBT_FILE = resolve(here, 'plaincards-debt.json');

// The bar and the sentence cap live in plainBar.mjs, because plainQuestions.mjs
// measures the other half of the same campaign against the same two numbers and
// a second copy of either would drift. Re-exported so existing importers of this
// file keep working.
export { BAR, LONGEST } from './plainBar.mjs';
import { BAR, LONGEST } from './plainBar.mjs';

const args = process.argv.slice(2);
const wantAll = args.includes('--all');
const selftest = args.includes('--selftest');
const writeDebt = args.includes('--write-debt');
const wanted = args.filter(a => !a.startsWith('--'));

const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean);
const sentences = (s) => String(s ?? '').split(/(?<=[.!?])\s+/).filter(x => x.trim());

/**
 * Every card, scored.
 *
 * Pure: takes the manifest and its content, returns rows. `fleschKincaid` returns
 * null under 25 words — that is the function declining, not a pass, so a card too
 * short to score is reported as unscored rather than as clean.
 */
export function scoreCards(theme, content){
  const rows = [];
  const push = (what, text) => {
    const w = words(text);
    if(!w.length) return;
    const longest = Math.max(0, ...sentences(text).map(s => words(s).length));
    rows.push({ what, words: w.length, grade: fleschKincaid(text), longest });
  };
  push('opening card', (theme?.opening ?? []).join(' '));
  const day = theme?.dayNoun ?? 'Day';
  (content?.MISSIONS ?? []).forEach((m, i) => push(`${day} ${i + 1}`, m.stake));
  return rows;
}

/** What a theme owes: how many cards are over the bar, and the worst of them. */
export function tally(rows){
  const scored = rows.filter(r => r.grade != null);
  const over = scored.filter(r => r.grade > BAR);
  const long = rows.filter(r => r.longest > LONGEST);
  const worst = scored.reduce((a, r) => Math.max(a, r.grade), 0);
  const mean = scored.length ? scored.reduce((a, r) => a + r.grade, 0) / scored.length : 0;
  return { cards: rows.length, scored: scored.length, over: over.length, long: long.length,
           worst: Math.round(worst * 10) / 10, mean: Math.round(mean * 10) / 10,
           overRows: over, longRows: long };
}

function readDebt(){
  if(!existsSync(DEBT_FILE)) return {};
  try{ return JSON.parse(readFileSync(DEBT_FILE, 'utf8')).themes ?? {}; }
  catch{ return {}; }
}

async function load(name){
  const dir = themeDir(name);
  const tf = resolve(dir, 'theme.js');
  if(!existsSync(tf)) return null;
  const mod = await import(pathToFileURL(tf).href);
  const theme = mod.theme ?? mod.default;
  if(!theme) return null;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  return { theme, content };
}

const subject = (theme) => !(theme?.id === 'instruments' || theme?.id === '_template')
  && (theme?.content?.MISSIONS ?? []).length >= 3;

// ------------------------------------------------------------------ selftest
//
// Three cases. The first is the one this repo insists on: two inputs that should
// score the same actually do. The other two are the ways the tally can lie.
function runSelftest(){
  const cases = [];
  const T = (opening, stakes) => [{ opening: [opening], dayNoun: 'Day' },
    { MISSIONS: stakes.map(s => ({ stake: s })) }];

  // 1. THE EQUALITY CASE. The same prose in the opening card and in a day card
  //    has to come out with the same grade, or every comparison this file prints
  //    is between two different measurements. It was worth writing: an early
  //    version joined the opening's paragraphs with '' instead of ' ', so a
  //    two-paragraph card had a word glued to a full stop and scored differently
  //    from the identical text in a stake.
  const same = 'The reservoir is at 88 per cent. Nine days of rain are forecast. '
    + 'You order how much water goes out each morning. Four villages live below the dam.';
  const [t1, c1] = T(same, [same]);
  const r1 = scoreCards(t1, c1);
  cases.push(['the same prose scores the same in an opening card and a day card',
    r1.length === 2 && r1[0].grade === r1[1].grade]);

  // 2. A card too short to score is not a card that passed. `fleschKincaid`
  //    declines under 25 words, and counting that as clean would let a
  //    fifteen-word stake through a gate about readability.
  const [t2, c2] = T('Short.', ['Also short.']);
  const t2r = tally(scoreCards(t2, c2));
  cases.push(['a card too short to score is counted as unscored, not as clean',
    t2r.scored === 0 && t2r.over === 0 && t2r.cards === 2]);

  // 3. The long-sentence rule earns its place on the card whose AVERAGE is fine.
  //    Flesch-Kincaid punishes sentence length hard — a 36-word sentence of
  //    one-syllable words scores 11.6 on its own, which is worth knowing and is
  //    not what this case is about. The failure it catches is one pile-up hiding
  //    inside nine short sentences, where the mean comes out under the bar and the
  //    card still stops a reader dead in the middle.
  const short = 'The pump is off. The tank is low. The crew is waiting. Nobody has the key. '
    + 'The log is open. The light is on. The kettle is cold. The door is shut. ';
  const oneLong = 'The man at the desk has the one file that says what the pump did when the '
    + 'power went out on Tuesday and nobody else in the building has read a word of it yet.';
  const [t3, c3] = T(short + oneLong, [short + oneLong]);
  const t3r = tally(scoreCards(t3, c3));
  cases.push(['one pile-up inside a card of short sentences is caught by length, not by grade',
    t3r.long === 2 && t3r.over === 0]);

  let bad = 0;
  for(const [what, ok] of cases){
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
    if(!ok) bad++;
  }
  console.log(bad ? `\nplainCards selftest: ${bad} case(s) failed.`
                  : '\nplainCards selftest: all cases pass.');
  return bad;
}

// --------------------------------------------------------------------- run
let failed = 0;
if(selftest){
  failed = runSelftest();
} else {
  const debt = readDebt();
  const names = wantAll || writeDebt || !wanted.length ? themeNames() : wanted;
  const banked = {};
  let measured = 0, clean = 0;
  for(const name of names){
    const loaded = await load(name).catch(() => null);
    if(!loaded || !subject(loaded.theme)) continue;
    measured++;
    const rows = scoreCards(loaded.theme, loaded.content);
    const t = tally(rows);
    banked[name] = { over: t.over, long: t.long, worst: t.worst };
    const owed = debt[name] ?? { over: 0, long: 0, worst: BAR };
    const head = `${name.padEnd(22)} mean ${t.mean.toFixed(1)}  worst ${t.worst.toFixed(1)}`
      + `  ${t.over}/${t.scored} over grade ${BAR}`
      + (t.long ? `  ${t.long} pile-up(s)` : '');
    // The debt is a ratchet: a theme may not gain a card over the bar, and its
    // worst card may not get worse. Bringing one down is always allowed, and
    // `--write-debt` banks it so the next regression is caught against the new
    // number rather than the old one.
    const problems = [];
    if(t.over > owed.over) problems.push(`${t.over - owed.over} more card(s) over grade ${BAR} than the debt file records`);
    if(t.worst > owed.worst + 0.05) problems.push(`the worst card is now ${t.worst.toFixed(1)}, was ${Number(owed.worst).toFixed(1)}`);
    if(t.long > owed.long) problems.push(`${t.long - owed.long} more sentence pile-up(s) over ${LONGEST} words`);
    if(problems.length){
      console.log(`✗ ${head}`);
      for(const p of problems) console.log(`    ${p}`);
      for(const r of t.overRows.slice(0, 3)) console.log(`    · ${r.what}: grade ${r.grade.toFixed(1)}, ${r.words} words`);
      for(const r of t.longRows.slice(0, 3)) console.log(`    · ${r.what}: a ${r.longest}-word sentence`);
      failed += problems.length;
    } else {
      if(!t.over && !t.long) clean++;
      console.log(`${t.over || t.long ? '·' : '✓'} ${head}`);
    }
  }
  if(writeDebt){
    writeFileSync(DEBT_FILE, JSON.stringify({
      _comment: 'What each campaign still owes the tagline: cards over grade '
        + BAR + ', sentence pile-ups over ' + LONGEST + ' words, and its worst card. '
        + 'engine/dev/plainCards.mjs FAILS a theme that gains one or gets worse. '
        + 'Rewrite cards down and re-bank with --write-debt; the numbers only fall.',
      bar: BAR, longest: LONGEST, themes: banked,
    }, null, 2) + '\n');
    console.log(`\nbanked ${Object.keys(banked).length} theme(s) in ${DEBT_FILE.split('/').pop()}`);
  } else if(measured){
    console.log(failed
      ? `\n${failed} regression(s) against the tagline.`
      : `\n${clean} of ${measured} campaign(s) read at grade ${BAR} or better on every card; the rest are held at their recorded numbers.`);
  }
}
process.exit(failed ? 1 : 0);
