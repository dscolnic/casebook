// concept-prompt.mjs — the concept-mapping question, per campaign, for the author.
//
//   node tools/concept-prompt.mjs <theme> [--out <dir>]
//
// `concept:` on a stop names a syllabus entry by number or by its exact title, and
// nothing else — a near-miss silently falling back to a keyword picker is how a
// whole campaign came to name the wrong concept on nine cards. The bibles write
// their own short tags instead (`rational limit`, `L'Hopital`), which are the
// author's words for the same thing and are not the syllabus's.
//
// So this asks rather than guesses. It prints the course's numbered spine once,
// then every stop with the tag the bible gave it and the three entries whose own
// keywords that tag comes closest to — ranked, never chosen. The author writes the
// number. What comes back is the bible's, which is the whole point.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { SYLLABUS } from './syllabus.js';

const args = process.argv.slice(2);
const theme = args.find(a => !a.startsWith('--'));
const outAt = args.indexOf('--out');
const outDir = outAt >= 0 ? args[outAt + 1] : null;
if(!theme){
  console.error('usage: node tools/concept-prompt.mjs <theme> [--out <dir>]');
  process.exit(2);
}
const syl = SYLLABUS[theme] ?? SYLLABUS[theme.replace(/_/g, '-')];
if(!syl){ console.error(`no syllabus for "${theme}"`); process.exit(2); }

// The stops, read out of the fragments rather than the assembled book, because the
// fragments are what the author's next round edits.
const dir = resolve('books/parts', theme);
const files = readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
  .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));

const stops = [];
for(const f of files){
  const m = +f.match(/\d+/)[0];
  let title = '', scene = '', n = 0;
  for(const line of readFileSync(resolve(dir, f), 'utf8').split('\n')){
    if(/^  - (group|at|person):/.test(line)){ n++; title = ''; scene = ''; }
    else if(/^    title: /.test(line) && n) title = (line.match(/"(.*)"/) ?? [, ''])[1];
    else if(/^    scene: /.test(line) && n && !scene) scene = (line.match(/"(.*)"/) ?? [, ''])[1];
    else if(/^    concept: /.test(line) && n){
      const concept = (line.match(/"(.*)"/) ?? line.match(/concept:\s*(.*)$/) ?? [, ''])[1].trim();
      stops.push({ m, n, title, scene, concept });
    }
  }
}

// Rank, never pick. A concept's own keywords are what it says it is about; the
// tag and the stop's title are what the author said this stop is about. Rare
// words count for more than common ones, which is the only reason the list is
// worth reading at all.
const words = (s) => String(s).toLowerCase().match(/[a-z']{3,}/g) ?? [];
const df = new Map();
for(const c of syl.concepts)
  for(const w of new Set([...words(c.c), ...(c.k ?? []).flatMap(words)]))
    df.set(w, (df.get(w) ?? 0) + 1);

const rank = (text) => {
  const have = new Set(words(text));
  return syl.concepts.map((c, i) => {
    let score = 0;
    for(const w of new Set([...words(c.c), ...(c.k ?? []).flatMap(words)]))
      if(have.has(w)) score += 1 / (df.get(w) ?? 1);
    return { i: i + 1, c: c.c, score };
  }).sort((a, b) => b.score - a.score).filter(x => x.score > 0).slice(0, 3);
};

const out = [];
out.push(`# ${theme}: put a syllabus number on every stop`);
out.push('');
out.push(`Every stop in this campaign names a concept in its own words. The game needs`);
out.push(`the course's own entry instead, because the sequencing checks grade *when* each`);
out.push(`idea is first taught and they can only do that against one fixed list. Your`);
out.push(`words are not being replaced — the tag stays in the bible; this adds the`);
out.push(`number beside it.`);
out.push('');
out.push(`The course is **${syl.course}**.`);
out.push('');
out.push('## The spine — the only ${n} answers there are'.replace('${n}', syl.concepts.length));
out.push('');
syl.concepts.forEach((c, i) => out.push(`${String(i + 1).padStart(2)}. ${c.c}`));
out.push('');
out.push('## The stops');
out.push('');
out.push('Each row gives the stop, the tag the bible currently uses, and the entries whose');
out.push('own keywords that tag comes closest to — **ranked, not chosen**. Where the');
out.push('ranking is right, take it; where it is wrong, the number you write wins. A stop');
out.push('may share a concept with another stop; a concept may go unused.');
out.push('');
out.push('| stop | title | the bible\'s tag | closest entries | **your number** |');
out.push('| --- | --- | --- | --- | --- |');
for(const s of stops){
  const near = rank(`${s.concept} ${s.title} ${s.scene}`);
  const shown = near.length ? near.map(x => `${x.i}`).join(' / ') : '—';
  out.push(`| M${s.m} S${s.n} | ${s.title} | \`${s.concept}\` | ${shown} | |`);
}
out.push('');
out.push('## What to hand back');
out.push('');
out.push('The same table with the last column filled, or — better — the bible itself with');
out.push('`Concept: <number> — <your tag>` on every stop, so the number lives beside the');
out.push('words it stands for and the next round does not have to ask again.');

const text = out.join('\n') + '\n';
if(outDir){
  mkdirSync(outDir, { recursive: true });
  const f = resolve(outDir, `${theme}_CONCEPTS.md`);
  writeFileSync(f, text);
  console.error(`${theme}: ${stops.length} stops, ${syl.concepts.length} concepts — ${f}`);
} else process.stdout.write(text);
