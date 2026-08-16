// missionCards.mjs — how hard the fifteen mission cards are to read.
//
//   node engine/dev/missionCards.mjs <theme>
//   node engine/dev/missionCards.mjs --all
//   node engine/dev/missionCards.mjs --all --csv
//
// WHAT IT MEASURES AND WHY THAT FIELD. A mission opens on a card, and the card
// is `mission.stake` — `engine/core/app.js` renders `m.stake || m.objective`
// into `.planStake` when the day's plan goes up. That is the paragraph a player
// reads before they have walked anywhere, once per mission, fifteen times a
// campaign. `validateContent` already gates scenes, verdicts and the game's own
// title card against the grade a theme declares; this is the prose it does not
// count, which is why it is worth counting.
//
// The number is Flesch–Kincaid, out of `tools/readability.js` — the same
// implementation the content gate uses, so the two agree by construction.
//
// HOW TO READ THE OUTPUT, AND HOW NOT TO. Flesch–Kincaid knows two things: how
// long the sentences are and how many syllables the words have. It does not
// know whether a word is hard. "Spontaneous fission" is three syllables a piece
// and unavoidable in a game about fission, and no rewrite makes it shorter — so
// a physics game reading two grades above its audience is not automatically
// wrong, and a game reading below it is not automatically clear. The lever the
// number responds to honestly is sentence length, which is why the longest
// sentence in each card is reported beside it. A card at grade 15 is usually
// four ordinary sentences and one of sixty words.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readingStats } from '../../tools/readability.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const wantCsv = has('--csv');
const only = args.filter(a => !a.startsWith('--'));

const registry = () => {
  try{
    return JSON.parse(readFileSync(resolve(root, 'themes.json'), 'utf8')).themes ?? {};
  }catch{ return {}; }
};

const themeDirOf = (id) => {
  const own = resolve(root, 'themes', id);
  if(existsSync(own)) return own;
  const reg = registry();
  return reg[id] ? resolve(root, reg[id]) : own;
};

/** The declared audience, straight out of the manifest — the target to judge against. */
const gradeOf = (dir) => {
  const f = resolve(dir, 'theme.js');
  if(!existsSync(f)) return null;
  const m = /audience:\s*\{[^}]*grade:\s*(\d+)/.exec(readFileSync(f, 'utf8'));
  return m ? +m[1] : null;
};

/**
 * Missions, imported rather than parsed.
 *
 * content/missions.js is generated and its shape is stable, but a regex over it
 * would break on the first theme that formats differently — and two of these
 * predate the book format. An import is the same answer the engine gets.
 */
async function missionsOf(dir){
  const f = resolve(dir, 'content', 'missions.js');
  if(!existsSync(f)) return null;
  try{
    const mod = await import(pathToFileURL(f).href);
    return mod.MISSIONS ?? mod.default ?? null;
  }catch(e){
    return null;
  }
}

const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;

async function sweep(id){
  const dir = themeDirOf(id);
  const missions = await missionsOf(dir);
  if(!missions?.length) return { id, error: 'no missions.js' };
  const grade = gradeOf(dir);

  const cards = missions.map((m, i) => {
    // The same fallback app.js uses. `field` is reported because a theme with
    // no stake is measured on a one-line objective, and that is a different
    // kind of prose — worth knowing before comparing it with anything.
    const text = m.stake || m.objective || '';
    const field = m.stake ? 'stake' : (m.objective ? 'objective' : 'none');
    return { n: i + 1, title: m.title ?? `Mission ${i + 1}`, field, ...readingStats(text) };
  });

  const scored = cards.filter(c => c.fk != null);
  return {
    id, grade,
    cards,
    measured: scored.length,
    skipped: cards.length - scored.length,
    avg: scored.length ? mean(scored.map(c => c.fk)) : null,
    min: scored.length ? Math.min(...scored.map(c => c.fk)) : null,
    max: scored.length ? Math.max(...scored.map(c => c.fk)) : null,
    longest: cards.length ? Math.max(...cards.map(c => c.longestSentence)) : 0,
  };
}

// ------------------------------------------------------------------- output

const pad = (s, n) => String(s).padEnd(n);
const num = (x, n = 1) => (x == null ? '—' : x.toFixed(n));

const ids = only.length ? only : Object.keys(registry());
const results = [];
for(const id of ids) results.push(await sweep(id));

if(wantCsv){
  console.log('game,mission,title,field,words,sentences,longest_sentence,fk');
  for(const r of results){
    if(r.error) continue;
    for(const c of r.cards){
      console.log([r.id, c.n, JSON.stringify(c.title), c.field, c.words,
        c.sentences, c.longestSentence, num(c.fk, 2)].join(','));
    }
  }
} else {
  for(const r of results){
    if(r.error){ console.log(`\n${r.id}: ${r.error}`); continue; }
    const tgt = r.grade == null ? '—' : r.grade;
    console.log(`\n${r.id}  ·  ${r.cards.length} cards  ·  declared audience grade ${tgt}`);
    console.log(`  ${pad('#', 3)}${pad('FK', 7)}${pad('words', 7)}${pad('longest', 9)}title`);
    for(const c of r.cards){
      const flag = (r.grade != null && c.fk != null && c.fk > r.grade + 2) ? ' ‼'
        : (r.grade != null && c.fk != null && c.fk > r.grade) ? ' ·' : '';
      console.log(`  ${pad(c.n, 3)}${pad(num(c.fk), 7)}${pad(c.words, 7)}${pad(c.longestSentence, 9)}${c.title}${flag}`);
    }
    console.log(`  average ${num(r.avg)}   range ${num(r.min)}–${num(r.max)}`
      + `   longest sentence ${r.longest} words`
      + (r.skipped ? `   (${r.skipped} card(s) under 25 words, not scored)` : ''));
  }

  const ok = results.filter(r => !r.error && r.avg != null);
  ok.sort((a, b) => b.avg - a.avg);
  console.log(`\n${'='.repeat(64)}\nEvery game, hardest first\n`);
  console.log(`  ${pad('game', 20)}${pad('avg', 7)}${pad('range', 13)}${pad('target', 8)}over`);
  for(const r of ok){
    const over = r.grade == null ? '—'
      : `${r.cards.filter(c => c.fk != null && c.fk > r.grade).length}/${r.measured}`;
    console.log(`  ${pad(r.id, 20)}${pad(num(r.avg), 7)}`
      + `${pad(`${num(r.min)}–${num(r.max)}`, 13)}${pad(r.grade ?? '—', 8)}${over}`);
  }
  console.log(`\n  all games, all cards: mean ${num(mean(ok.flatMap(r => r.cards.filter(c => c.fk != null).map(c => c.fk))))}`);
  console.log(`\n  FK is sentence length and syllables — nothing else. A subject's own`);
  console.log(`  vocabulary cannot be simplified; sentence length always can.`);
}
