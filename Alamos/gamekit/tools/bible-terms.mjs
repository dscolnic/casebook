// bible-terms.mjs — each mission's own glossary, onto that mission.
//
//   node tools/bible-terms.mjs <theme> [--dry]
//   node tools/bible-terms.mjs --all [--dry]
//
// EVERY BIBLE WRITES THE VOCABULARY DAY BY DAY, under "Worth knowing first" —
// Changeover's mission 1 lists Scarcity, Opportunity cost, Equilibrium and the
// production possibilities curve. The extractor pools all fifteen lists into one
// campaign glossary and the mission loses which four were its own; the plan card
// then re-picks the day's terms by looking for their names in that day's
// question text, and printed one of Changeover's four, because the other three
// are the ideas the questions are ABOUT rather than words they happen to use.
//
// So the list is carried instead of re-derived. `terms:` on a mission is the
// bible's own set for that day, in the bible's order, with the bible's
// definitions — and the plan card prints all of them.
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
  console.error('usage: node tools/bible-terms.mjs <theme>|--all [--dry]');
  process.exit(2);
}

let bad = 0;
for(const theme of (RUN ? themes : [])){
  const path = BIBLES[theme];
  if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); bad++; continue; }
  const bible = readBible(resolve(gamekit, path));
  const dir = resolve(gamekit, `books/parts/${theme}`);
  if(!existsSync(dir)){ console.error(`${theme}: no fragments`); bad++; continue; }

  let wrote = 0, empty = 0, wroteEqs = 0;
  for(const part of readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
    .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]))){
    const n = +part.match(/\d+/)[0];
    const bm = bible.missions.find(m => m.n === n);
    if(!bm) continue;
    const terms = (bm.glossary ?? []).filter(g => g?.term && g?.def);
    const eqs = (bm.equations ?? []).filter(x => x?.e);
    if(!terms.length && !eqs.length){ empty++; continue; }
    const file = resolve(dir, part);
    const lines = readFileSync(file, 'utf8').split('\n');

    // On the mission, beside `primer:`, which is the other half of the same
    // card. Replaced rather than appended, so running this twice is running it
    // once — the bible is the only source and it is read afresh each time.
    /**
     * Two blocks, written the same way: the day's own words, and the day's own
     * equations.
     *
     * THE EQUATIONS WERE IN EVERY BIBLE AND ON NO CARD. Each mission writes an
     * `#### Equations first needed today` section — 144 of them across the eight
     * — and `engine/core/app.js` has drawn `mission.equations` on the plan card
     * for as long as that card has existed. Nothing joined the two: the engine
     * filled that key from `tools/syllabus.js`, which has no entry for any of
     * these courses, so every plan card in every v2 campaign showed no equation
     * at all while the bible had it written out with its symbols named.
     */
    const put = (key, rows) => {
      const at = lines.findIndex(l => new RegExp(`^  ${key}:$`).test(l));
      if(at >= 0){
        let end = at + 1;
        while(end < lines.length && /^  [-\s]/.test(lines[end]) && !/^  [a-z]+:/.test(lines[end])) end++;
        lines.splice(at, end - at, ...rows);
        return true;
      }
      // Before `primer:` where there is one, else before the stops.
      let where = lines.findIndex(l => /^  primer:$/.test(l));
      if(where < 0) where = lines.findIndex(l => /^  stops:$/.test(l));
      if(where < 0) return false;
      lines.splice(where, 0, ...rows);
      return true;
    };

    if(terms.length){
      const rows = ['  terms:'];
      for(const t of terms) rows.push(`  - {name: ${q(t.term)}, def: ${q(t.def)}}`);
      if(!put('terms', rows)){
        console.error(`${theme} m${n}: no \`primer:\` or \`stops:\` to place \`terms:\` before`); bad++; continue;
      }
    }
    if(eqs.length){
      // One JSON flow value per equation: `v` is a list of pairs and writing it
      // key by key here would be a second description of what the card reads.
      const rows = ['  equations:'];
      for(const x of eqs){
        rows.push(`  - ${JSON.stringify({ e: x.e, c: x.c ?? '',
          ...(x.v?.length ? { v: x.v } : {}), ...(x.s ? { s: x.s } : {}) })}`);
      }
      if(!put('equations', rows)){
        console.error(`${theme} m${n}: nowhere to place \`equations:\``); bad++; continue;
      }
      wroteEqs += eqs.length;
    }
    if(!dry) writeFileSync(file, lines.join('\n'));
    wrote++;
  }
  console.log(`${theme.padEnd(22)} ${wrote} mission(s) given their own glossary`
    + (wroteEqs ? ` · ${wroteEqs} equation(s)` : '')
    + (empty ? ` · ${empty} the bible writes none for` : ''));
}
process.exitCode = bad ? 1 : 0;
