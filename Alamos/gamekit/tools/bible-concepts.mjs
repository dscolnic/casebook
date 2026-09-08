// bible-concepts.mjs — put the bible's syllabus NUMBER on every stop.
//
//   node tools/bible-concepts.mjs <theme> [--dry]
//   node tools/bible-concepts.mjs --all [--dry]
//
// WHY THIS EXISTS. A stop names its concept in the bible's own words —
// `system boundary`, `L'Hopital` — and the game needs the course's own numbered
// entry instead, because `conceptOrder` grades WHEN each idea is first taught
// and can only do that against one fixed list. The third handback put a number
// on all 480 of them: `Concept: 1 — system boundary`.
//
// And not one of them reached the book. The only path from a bible to a
// fragment is `v10extract`, which rewrites the whole campaign and leaves `TODO`
// where the group, the fixture and the person go — those are resolved by later
// steps in a pipeline that is not safe to re-run mid-flight. So the numbers sat
// in the bible, correct and unreachable, and 496 complaints stayed on the board.
//
// This is the same shape as `bible-build.mjs`: find each stop in the fragment
// it already has, and edit ONE line of it in place. Nothing else is touched, so
// it cannot disturb the prose `bibleParity` holds the book to.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { readBible } from './bibleRead.mjs';
import { themeNames } from '../engine/dev/registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const all = args.includes('--all');
const wanted = all
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(!wanted.length){
  console.error('usage: node tools/bible-concepts.mjs <theme> [--dry]   |   --all [--dry]');
  process.exit(2);
}

/** `# --- Stop 12: …` — the marker the extractor writes above every stop. */
const STOP = /^\s*#\s*---\s*Stop\s+(\d+)\s*:/i;

let totalWrote = 0, totalMissing = 0, totalSame = 0;
for(const theme of wanted){
  const biblePath = BIBLES[theme];
  if(!biblePath){ console.error(`${theme}: no bible registered`); continue; }
  const bible = readBible(resolve(gamekit, biblePath));
  // The bible numbers its stops across the whole campaign, and so does the
  // fragment's marker, so one flat map is the whole lookup.
  const byNumber = new Map();
  for(const m of bible.missions) for(const st of m.stops) byNumber.set(st.n, st);

  const dir = resolve(gamekit, `books/parts/${theme}`);
  let wrote = 0, missing = 0, same = 0;
  for(const file of readdirSync(dir).filter(f => /^m\d+\.yml$/.test(f)).sort()){
    const path = resolve(dir, file);
    const lines = readFileSync(path, 'utf8').split('\n');
    let touched = false;
    let stopN = null;
    for(let i = 0; i < lines.length; i++){
      const head = lines[i].match(STOP);
      if(head){ stopN = +head[1]; continue; }
      if(stopN === null) continue;
      const m = lines[i].match(/^(\s*)concept:\s*(.*)$/);
      if(!m) continue;
      const bs = byNumber.get(stopN);
      const n = bs?.conceptNumber;
      if(!n){ missing++; stopN = null; continue; }
      // The number REPLACES the phrase, and the phrase is kept beside it as a
      // comment. The importer accepts a number or the spine's exact title; the
      // bible's own words are neither, and losing them from view would make the
      // fragment unreadable to whoever authored it.
      const words = String(bs.concept ?? '').replace(/\s+/g, ' ').trim();
      const next = `${m[1]}concept: ${n}${words ? `   # ${words}` : ''}`;
      if(lines[i] === next) same++;
      else { lines[i] = next; wrote++; touched = true; }
      stopN = null;
    }
    if(touched && !dry) writeFileSync(path, lines.join('\n'));
  }
  totalWrote += wrote; totalMissing += missing; totalSame += same;
  console.log(`${theme.padEnd(22)} ${String(wrote).padStart(3)} numbered`
    + `${same ? `  ${same} already` : ''}`
    + `${missing ? `  ${missing} with no number in the bible` : ''}`);
}
console.log(`\n${totalWrote} stop(s) numbered${totalSame ? `, ${totalSame} already were` : ''}`
  + `${totalMissing ? `, ${totalMissing} have no number in their bible` : ''}`
  + `${dry ? '  (dry run — nothing written)' : ''}`);
