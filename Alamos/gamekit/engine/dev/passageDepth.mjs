// passageDepth.mjs — is the passage a person, or a job title with a name on it?
//
//   node engine/dev/passageDepth.mjs <theme>
//   node engine/dev/passageDepth.mjs               # every registered theme
//   node engine/dev/passageDepth.mjs --selftest
//
// Talking to somebody is one of the two things a player does with their evening,
// and `checkPassages.mjs` already asks whether the *question* about a passage is
// worth answering. This asks the half before it: whether there is a passage.
//
// THE DEFECT IT WAS WRITTEN FOR. Three campaigns shipped with exactly half their
// cast written and half not. Planetary Defense, Bring Them Home and Outbreak
// Riverton each had six of twelve people carrying one abstract sentence —
//
//     Uses independent tracking and dynamics to decide whether an apparent
//     trajectory change is physical or a measurement artifact.
//
// — which is the syllabus topic with a name attached: no place, no history,
// nothing that could only be true of this person. The other six were two
// paragraphs each. Nothing could see it: `checkPassages` passed, because the
// authored question was fine; the reading-level gates passed, because a short
// sentence is easy to read; `personStops` passed, because the person exists.
//
// WHY THE RULE IS A SENTENCE COUNT AND NOT ONLY A LENGTH. Both halves are
// load-bearing and each alone waves the defect through:
//
//   * length alone — the stub above is 20 words, but the same content padded to
//     60 in one breath is the same stub. A single sentence cannot say what
//     somebody does *and* what they refuse to do, which is the shape every
//     written bio in this repo has.
//   * sentences alone — "Runs the drill. Two years aboard." is two sentences and
//     tells a player nothing they cannot read off the roster.
//
// So a passage has to clear both, and the numbers are deliberately low: this
// gate is the floor, not the bar. `MIN_WORDS` is 25 because the shortest bios
// that read as real people in this repo — Blackout's assistant operator, Ice
// Core's core-line technician — sit at 32 to 36, and the stubs at 12 to 20.
//
// WHAT IS REPORTED AND NEVER FAILED. A roster whose median passage is short is a
// thin cast rather than a broken one, and Blackout, Ice Core, Yellow Bay and the
// instrument bank are all deliberately terse. Reporting it puts the number in
// front of somebody without turning a house style into a rule.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir, themeNames } from './registry.mjs';
// Where a sentence ends. Markup is stripped by the caller: `judge` hands this
// `plain(bio)`, because a `<p>` is not a word either.
import { sentenceCount } from '../../tools/sentences.js';

const DEBT = resolve(new URL('.', import.meta.url).pathname, 'passage-debt.json');

// A passage under this is a label. See the header for why both terms are here.
export const MIN_WORDS = 25;
export const MIN_SENTENCES = 2;
// Below this the roster is reported as terse — never failed.
const THIN_MEDIAN = 60;

/** Bios are HTML. Everything below measures the text a player actually reads. */
export const plain = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const wordCount = (bio) => {
  const t = plain(bio);
  return t ? t.split(' ').length : 0;
};

// Where a sentence ends is `tools/sentences.js`. It used to be here, and the
// copy in `tools/sync-casebook.mjs` guarded decimals only — so the shelf printed
// "Kerrow No. You are the winding engineer's assistant" under Overwind, an
// abbreviation this file had never met either. One splitter, four guards.
export { sentenceCount };

/**
 * What is wrong with one person's passage, or null.
 *
 * One row per person rather than per rule, because a stub fails both terms and
 * two lines about one bio reads as two problems.
 */
export function judge(person){
  const name = person?.name ?? person?.id ?? '?';
  const bio = plain(person?.bio);
  if(!bio) return { who: name, key: `${person?.id ?? name}:nobio`, why: `${name}: no passage at all — talking to them teaches nothing` };
  const w = wordCount(bio), s = sentenceCount(bio);
  if(w < MIN_WORDS || s < MIN_SENTENCES){
    return {
      who: name,
      key: `${person?.id ?? name}:thin`,
      why: `${name}: ${w} word${w === 1 ? '' : 's'} in ${s} sentence${s === 1 ? '' : 's'}`
         + ` — a passage is at least ${MIN_WORDS} words and ${MIN_SENTENCES} sentences`
         + ` ("${bio.slice(0, 60)}${bio.length > 60 ? '…' : ''}")`,
    };
  }
  return null;
}

const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  if(!s.length) return 0;
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};

/** Every failing row for one roster, plus the numbers that are only reported. */
export function readRoster(people){
  const rows = [];
  for(const p of people) { const r = judge(p); if(r) rows.push(r); }
  const w = people.map(p => wordCount(p?.bio));
  return {
    rows,
    n: people.length,
    median: median(w),
    terse: people.filter(p => { const x = wordCount(p?.bio); return x >= MIN_WORDS && x < 45; }).length,
    oneQuestion: people.filter(p => (p?.quiz?.length ?? 0) === 1).length,
  };
}

async function rosterOf(themeName){
  const theme = (await import(pathToFileURL(resolve(themeDir(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const R = content.ROSTER ?? [];
  return Array.isArray(R) ? R : Object.values(R).filter(Array.isArray).flat();
}

// --------------------------------------------------------------------- debt
//
// Same two properties as `concept-debt.json`, `equation-debt.json` and
// `daycalls-debt.json`: a row not on the list fails immediately, so nothing new
// drifts in, and a row on the list that has since been fixed also fails, naming
// the line to delete, so the file cannot become a standing excuse. `_` is the
// header and is not data.
function loadDebt(){
  try{
    const j = JSON.parse(readFileSync(DEBT, 'utf8'));
    delete j._;
    return j;
  }catch{ return {}; }
}

async function run(){
  const args = process.argv.slice(2);
  if(args.includes('--selftest')) return selftest();
  const only = args.filter(a => !a.startsWith('--'));
  const names = only.length ? only : themeNames();
  const debt = loadDebt();
  const live = new Set();
  let failed = 0;
  const notes = [];

  for(const name of names){
    let people;
    try{ people = await rosterOf(name); }
    catch(e){ console.log(`${name}: could not load — ${e.message}`); failed++; continue; }
    const out = readRoster(people);
    const known = new Set(debt[name] ?? []);
    const fresh = [];
    for(const r of out.rows){
      const key = `${name}/${r.key}`;
      live.add(key);
      if(!known.has(key)) fresh.push(r);
    }
    if(fresh.length){
      failed++;
      console.log(`\n${name}: ${fresh.length} passage${fresh.length > 1 ? 's' : ''} that says nothing about the person`);
      for(const r of fresh) console.log(`  ✗ ${r.why}`);
    }
    if(out.median && out.median < THIN_MEDIAN){
      notes.push(`${name}: median passage ${out.median} words, ${out.terse} of ${out.n} under 45`);
    }
  }

  const stale = [];
  for(const [name, keys] of Object.entries(debt))
    for(const k of keys) if(!live.has(k)) stale.push([name, k]);
  if(stale.length && !only.length){
    failed++;
    console.log(`\n${stale.length} debt row${stale.length > 1 ? 's' : ''} no longer happen${stale.length > 1 ? '' : 's'} — delete from ${DEBT}:`);
    for(const [name, k] of stale) console.log(`  ${name}: ${k}`);
  }

  // Reported, never failed: a terse cast is a house style, not a defect.
  for(const n of notes) console.log(`  · ${n}`);
  if(!failed) console.log(`passageDepth: ${names.length} theme${names.length > 1 ? 's' : ''} — every passage is a person, not a job title`);
  process.exit(failed ? 1 : 0);
}

// ----------------------------------------------------------------- selftest
//
// The cases that would otherwise invert silently, each verified by putting the
// bug back and watching that case, and only that case, fail:
//
//   * not stripping the markup (case 1) counts `<p>` and `</p>` as words, so a
//     16-word stub in two paragraphs measures 20 and passes the floor
//   * splitting on `Dr.` (case 3) or on an initial (case 4) turns a one-sentence
//     stub into a two-sentence passage — which is exactly the shape of the
//     eighteen this gate was written for, since every one of them names a doctor
//   * dropping either term of the rule waves half the defect through: a padded
//     one-sentence bio (case 5) and a two-sentence label (case 6)
function selftest(){
  const bio = (s) => ({ id: 'x', name: 'Dr. Someone', bio: s });
  const cases = [
    ['markup is not words',
      () => wordCount('<p>one two three four five six</p>') === 6],
    ['a written passage passes',
      () => judge(bio('<p>Runs the sonar room, which is a dark space with three displays and one rule.</p>'
        + '<p>The loudest thing on the screen is almost never the thing that matters.</p>')) === null],
    ['a title is not a full stop',
      () => sentenceCount('Dr. Ortiz connects vital signs to the chain that delivers oxygen through the body.') === 1],
    ['an initial is not a full stop',
      () => sentenceCount('The laboratory director, J. Robert Oppenheimer, ran the technical board here.') === 1],
    ['a decimal is not a full stop',
      () => sentenceCount('The scarp is 1.8 m high and runs for 400 m.') === 1],
    ['a number label is not a full stop',
      () => sentenceCount('Kerrow No. 3 winds twelve hundred metres of rope onto one drum.') === 1],
    ['a sentence that really ends in No. is still two sentences',
      () => sentenceCount('Asked whether the rope could take it, he said no. The drum was re-cut.') === 2],
    ['one long sentence is still a stub',
      () => judge(bio('Uses independent tracking and dynamics together with the whole of the room\'s '
        + 'accumulated telemetry to decide whether an apparent trajectory change is physical or '
        + 'is instead a measurement artifact of the kind that has fooled this room before now.')) !== null],
    ['two short sentences are still a stub',
      () => judge(bio('Runs the drill. Two years aboard.')) !== null],
    ['no bio at all fails',
      () => judge({ id: 'y', name: 'Nobody' }) !== null],
    ['an empty bio fails',
      () => judge(bio('   ')) !== null],
    ['the roster report counts the terse ones without failing them',
      () => {
        // 33 words: over the floor, under the 45 the report counts as terse.
        // The first draft of this fixture was 24 and the gate failed it, which
        // is the case working — a floor nothing sits near tests nothing.
        const terse = bio('Second seat on nights, three years in, and the person who actually keeps '
          + 'the log. He has read every sequence-of-events report the company owns and can quote '
          + 'which of them contradict each other.');
        const out = readRoster([terse, terse, terse]);
        return out.rows.length === 0 && out.terse === 3 && out.median > 0;
      }],
    ['a failing row carries a stable key for the debt file',
      () => judge({ id: 'reyes', name: 'Dr. Camila Reyes', bio: 'Uses independent tracking.' }).key === 'reyes:thin'],
  ];
  let bad = 0;
  for(const [what, fn] of cases){
    let ok = false;
    try{ ok = !!fn(); }catch(e){ ok = false; }
    if(!ok){ bad++; console.log(`  ✗ ${what}`); }
  }
  console.log(bad ? `passageDepth --selftest: ${bad} of ${cases.length} case(s) failed`
                  : `passageDepth --selftest: ${cases.length} cases — it can tell a passage from a job title`);
  process.exit(bad ? 1 : 0);
}

run();
