// bible-beats.mjs — each mission's beat script, refreshed from its bible.
//
//   node tools/bible-beats.mjs <theme> [--dry]
//   node tools/bible-beats.mjs --all [--dry]
//
// WHY THIS EXISTS. The beats are written once by `v10extract.mjs` and then built
// on — `bible-build` writes the boards beside them, `fix-speakers` points their
// bubbles at roster ids — so re-extracting to pick up a corrected beat would
// throw both away. This rewrites the `beats:` block in place, in exactly the
// shape the extractor emits, and nothing else in the fragment is touched.
//
// WHAT IT WAS WRITTEN FOR. A beat used to run to the end of the mission when it
// was the last one, so it swallowed the sections after the beat script — and one
// of those is the story block's own prose `**Beat script:**` summary, which
// quotes dialogue. Changeover's mission 1 came out with three speeches on its
// final beat instead of one, two of them belonging to earlier moments, so
// answering the last question of the day produced four bubbles from one person
// at once. `bibleRead` now ends a beat at the next heading; this puts the
// corrected script into the books.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));
const q = (s) => JSON.stringify(String(s ?? '').replace(/\s+/g, ' ').trim());

const args = process.argv.slice(2);
const RUN = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const dry = args.includes('--dry');
const themes = args.includes('--all')
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(RUN && !themes.length){
  console.error('usage: node tools/bible-beats.mjs <theme>|--all [--dry]');
  process.exit(2);
}

let bad = 0;
for(const theme of (RUN ? themes : [])){
  const path = BIBLES[theme];
  if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); bad++; continue; }
  const bible = readBible(resolve(gamekit, path));
  const dir = resolve(gamekit, `books/parts/${theme}`);
  if(!existsSync(dir)){ console.error(`${theme}: no fragments`); bad++; continue; }

  let touched = 0, dropped = 0;
  for(const part of readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
    .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))){
    const n = +part.match(/\d+/)[0];
    const bm = bible.missions.find(m => m.n === n);
    if(!bm?.beats?.length) continue;
    const file = resolve(dir, part);
    const lines = readFileSync(file, 'utf8').split('\n');
    const at = lines.findIndex(l => /^  beats:$/.test(l));
    if(at < 0) continue;
    // To the next key at the mission's own indent — `stops:` in every book.
    let end = at + 1;
    while(end < lines.length && !/^  [a-z][A-Za-z]*:/.test(lines[end])) end++;
    // Comment lines immediately before that key belong to it, not to the beats.
    while(end > at + 1 && /^\s*#/.test(lines[end - 1])) end--;

    const before = lines.slice(at, end).filter(l => /^\s+say:/.test(l)).length;
    const rows = ['  beats:'];
    // The extractor's own id rule: a repeated heading is numbered from the
    // second, so an id that was already unique does not move.
    const seen = new Map();
    for(const b of bm.beats){
      const base = (b.name || `beat-${b.n}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const k = (seen.get(base) ?? 0) + 1;
      seen.set(base, k);
      rows.push(`  - id: ${k === 1 ? base : `${base}-${k}`}`);
      rows.push(`    # ${b.name} | ${b.where} | ${b.trigger}`);
      // `on:` is the implementation's, not the bible's, so it is carried across
      // from the fragment rather than re-derived — this tool has no business
      // deciding which stop a beat waits on.
      const old = lines.slice(at, end);
      const idAt = old.findIndex(l => l.trim() === `- id: ${k === 1 ? base : `${base}-${k}`}`);
      const onLine = idAt >= 0 ? old.slice(idAt).find(l => /^    on:/.test(l)) : null;
      if(onLine) rows.push(onLine);
      if(b.world) rows.push(`    world: ${q(b.world)}`);
      if(b.panel) rows.push(`    panel: ${q(b.panel)}`);
      if(b.unlocks) rows.push(`    # unlocks: ${b.unlocks}`);
      if(b.bubbles.length){
        rows.push('    bubbles:');
        for(const x of b.bubbles){
          const who = (bible.cast.find(c => c.name === x.who)?.id)
            ?? x.who.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          rows.push(`    - who: ${who}   # ${x.who}`);
          if(x.radio) rows.push('      radio: true');
          rows.push(`      say: ${q(x.say)}`);
        }
      }
    }
    rows.push('');
    const after = rows.filter(l => /^\s+say:/.test(l)).length;
    if(after !== before){ touched++; dropped += before - after; }
    lines.splice(at, end - at, ...rows);
    if(!dry) writeFileSync(file, lines.join('\n'));
  }
  console.log(`${theme.padEnd(22)} ${touched} mission(s) changed`
    + (dropped ? ` · ${dropped} stray bubble(s) removed` : ''));
}
process.exitCode = bad ? 1 : 0;
