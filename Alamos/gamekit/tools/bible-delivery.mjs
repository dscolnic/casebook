// bible-delivery.mjs — the one thing a campaign builds, from the bible.
//
//   node tools/bible-delivery.mjs <theme>            report
//   node tools/bible-delivery.mjs <theme> --write    rewrite themes/<theme>/theme.js
//
// Every course adventure in this repo builds ONE NAMED THING, a piece a mission:
// the opening card names it, each mission hands over that day's piece, and a
// board in one room shows all of them at once. It is the spine the cards hang
// off, and it is the one part of a campaign that lived in `theme.js` by hand.
//
// That was survivable while a campaign brought its own theme. It is not
// survivable for a campaign built on ANOTHER game's place, because the delivery
// comes across with the place: Whiteout's Operations Module said THE VESTRI
// RECORD and listed an ice core's findings, Wildtype's planning room said THE
// REPAIR ORDER and listed a submarine cable's, and Boomtown's advice office
// offered a mass-defect calculation. Four campaigns, four boards describing
// somebody else's work, and no gate could see it: the block was well formed and
// the checks only ask whether the count matches the missions.
//
// So the bibles were asked for it, and all four now write:
//
//   ## 1.1 Named delivery — authoritative build data
//   ```yaml
//   delivery:
//     name: "The Contained Pilot"
//     what: "A fifteen-piece plan that …"
//     pieces: ["The feed correction", …]
//   ```
//
// `where` stays the theme's: which room the board hangs in is a fact about the
// place, and the place is not what the bible is describing here.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parseYaml } from './yaml-lite.mjs';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const theme = args.find(a => !a.startsWith('--'));
const write = args.includes('--write');
if(!theme){
  console.error('usage: node tools/bible-delivery.mjs <theme> [--write]');
  process.exit(2);
}

const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));
const path = BIBLES[theme];
if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); process.exit(2); }
const src = readFileSync(resolve(gamekit, path), 'utf8');

/**
 * The fenced block whose first key is `delivery`.
 *
 * Found by the key rather than by the heading, because the heading is a
 * sentence and the key is the contract. A bible that writes it twice — a draft
 * and a final — is read as its last, which is the one a later revision edits.
 */
const blocks = [...src.matchAll(/```[a-z]*\s*\n(delivery:[\s\S]*?)\n```/g)].map(m => m[1]);
if(!blocks.length){
  console.log(`${theme.padEnd(14)} the bible writes no \`delivery:\` block`);
  process.exit(1);
}
let doc = null;
try { doc = parseYaml(blocks[blocks.length - 1]); }
catch(e){ console.error(`${theme}: its delivery block does not parse — ${e.message}`); process.exit(1); }
const d = doc?.delivery ?? {};
const pieces = (Array.isArray(d.pieces) ? d.pieces : []).map(x => String(x).trim()).filter(Boolean);
const name = String(d.name ?? '').trim();
const what = String(d.what ?? '').replace(/\s+/g, ' ').trim();

const problems = [];
if(!name) problems.push('no `name`');
if(!what) problems.push('no `what` — the sentence the opening card and the board carry');
if(!pieces.length) problems.push('no `pieces`');

// The count has to match the missions, or the last day hands over nothing.
const manifest = resolve(gamekit, `themes/${theme}/theme.js`);
const T = (await import(`file://${manifest}`)).default;
const days = (T.content?.MISSIONS ?? []).length;
if(pieces.length && days && pieces.length !== days){
  problems.push(`${pieces.length} piece(s) for ${days} mission(s) — piece n is mission n, so the`
    + ' two counts are the same or the last day hands over nothing');
}

console.log(`${theme.padEnd(14)} ${JSON.stringify(name)} · ${pieces.length} piece(s)`
  + (T.delivery?.where ? ` · board in ${T.delivery.where}` : ''));
for(const p of problems) console.log(`  ✗ ${p}`);
if(problems.length) process.exitCode = 1;
if(!write){ console.log('  (dry run — pass --write)'); process.exit(process.exitCode ?? 0); }
if(problems.length){ console.log('  nothing written'); process.exit(1); }

// ---- the replacement, in the manifest's own shape
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
// Wrapped at 78 so a long `what` reads in the file rather than running off it.
const wrap = (s, indent) => {
  const words = String(s).split(' ');
  const lines = [];
  let line = '';
  for(const w of words){
    if((line + ' ' + w).length > 74){ lines.push(line); line = w; }
    else line = line ? `${line} ${w}` : w;
  }
  if(line) lines.push(line);
  return lines.map((l, i) => `${indent}${i ? '+ ' : ''}${q(l + (i < lines.length - 1 ? ' ' : ''))}`)
    .join('\n');
};

const body = [
  '  delivery: {',
  `    name: ${q(name)},`,
  `    what:\n${wrap(what, '      ')},`,
  ...(T.delivery?.where ? [`    where: ${q(T.delivery.where)},`] : []),
  '    pieces: [',
  ...pieces.map(p => `      ${q(p)},`),
  '    ],',
  '  },',
].join('\n');

let js = readFileSync(manifest, 'utf8');
const at = js.indexOf('\n  delivery: {');
if(at < 0){ console.error(`${theme}: theme.js has no \`delivery: {\` to replace`); process.exit(1); }
// To the line that closes it at the same indent.
const end = js.indexOf('\n  },', at);
if(end < 0){ console.error(`${theme}: the delivery block is not closed at its own indent`); process.exit(1); }
js = js.slice(0, at + 1) + body + '\n' + js.slice(end + '\n  },'.length + 1);
writeFileSync(manifest, js);
console.log(`  written to themes/${theme}/theme.js`);
