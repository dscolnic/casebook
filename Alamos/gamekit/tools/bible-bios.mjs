// bible-bios.mjs — each person's bio passage, from the bible onto the head.
//
//   node tools/bible-bios.mjs <bible.md> <theme> [--dry]
//
// WHY THIS EXISTS. The roster lives in a book's HEAD (`books/parts/<t>/_book.yml`),
// which for the eight older campaigns is hand-maintained: `build-head.mjs` would
// rewrite the areas, the groups and the estimate specs with it, and on these
// eight that is a rebuild rather than an edit. So every copy layer writes one
// field in place — `bible-prose` the mission cards, `bible-terms` the glossary —
// and this is the roster's.
//
// The September round gave every character a `**Bio passage - exact player
// copy:**`: two or three sentences of what they want and what they cannot see,
// in the bible's words. What the heads carried until now was the first
// generation's template — "Wants a defensible vote in fifteen days. Initially
// treats complete ledgers as sufficient." — which reads as a character sheet
// rather than as a person. This replaces the `bio:` block and nothing else.
//
// NOT the reflection question beside it. `engine/core/personQuiz.js` takes an
// authored `quiz` as `{ q, a, wrong: [three] }`, and the bible writes a question,
// an answer and a line of feedback with no distractors — so an authored quiz
// cannot be built from it without inventing the wrong answers, which is content.
// Until the bible writes three, the engine's generated question stands.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const [file, theme] = args.filter(a => !a.startsWith('--'));
if(!file || !theme){
  console.error('usage: node tools/bible-bios.mjs <bible.md> <theme> [--dry]');
  process.exit(2);
}

/** Every `### Name` section's bio passage, by display name. */
function biosIn(md){
  const lines = md.split('\n');
  const out = new Map();
  let name = null;
  for(const l of lines){
    const h = /^###\s+([A-Z][^\n]*?)\s*$/.exec(l);
    // A heading whose words only ever describe part of a document is not a
    // person — the same rule the roster reader learned from "Optional worked
    // examples — exact player copy".
    if(h && !/(card|copy|question|contract|reference|glossary|primer|delivery|scene|profile|summary|rule|check)/i.test(h[1])){
      name = h[1].replace(/\s*[-—]\s.*$/, '').trim();
      continue;
    }
    const b = /^\*\*Bio passage\s*[-—]\s*exact player copy:?\*\*\s*(.+)$/i.exec(l);
    if(b && name && !out.has(name)) out.set(name, b[1].trim());
  }
  return out;
}

const bios = biosIn(readFileSync(file, 'utf8'));
const headPath = resolve('books/parts', theme, '_book.yml');
const head = readFileSync(headPath, 'utf8').split('\n');

const at = head.findIndex(l => /^roster:\s*$/.test(l));
if(at < 0){ console.error(`${headPath} has no top-level "roster:" line`); process.exit(2); }

const out = [];
let wrote = 0, kept = 0, unmatched = [...bios.keys()];
for(let i = 0; i < head.length; i++){
  out.push(head[i]);
  if(i <= at) continue;
  const nm = /^  name:\s*"?([^"]+?)"?\s*$/.exec(head[i]);
  if(!nm) continue;
  // A TITLE IS NOT PART OF A NAME. The bibles write "Dr. Lena Ortiz" and
  // "Commander Laila Abiola" in their character headings; some heads carry the
  // title and some do not, and matching on the full string left one person a
  // campaign with the first generation's template bio. Compared without it, and
  // then by surname, which is the id these rosters use anyway.
  const bare = (v) => String(v).replace(/^(Dr|Mr|Mrs|Ms|Prof|Professor|Commander|Captain|Sgt|Lt)\.?\s+/i, '').trim();
  const want = nm[1].trim();
  const said = bios.get(want) ?? bios.get(bare(want))
    ?? [...bios.entries()].find(([k]) => bare(k) === bare(want))?.[1]
    ?? [...bios.entries()].find(([k]) => bare(k).split(/\s+/).pop() === bare(want).split(/\s+/).pop())?.[1];
  if(!said){ kept++; continue; }
  unmatched = unmatched.filter(n => n !== want && n.replace(/^(Dr|Commander|Prof|Professor|Captain)\.?\s+/i, '') !== want);
  // Find this person's `bio: |` block and replace its body.
  let j = i + 1;
  while(j < head.length && !/^  bio:\s*\|/.test(head[j]) && !/^- id:/.test(head[j])) { out.push(head[j]); j++; }
  if(!/^  bio:\s*\|/.test(head[j] ?? '')){ kept++; i = j - 1; continue; }
  out.push(head[j]);                                   // the `bio: |` line
  let k = j + 1;
  while(k < head.length && /^    /.test(head[k])) k++;  // the old block
  // Wrapped at the width the rest of the head is written to.
  const words = said.split(/\s+/);
  let line = '   ';
  for(const w of words){
    if((line + ' ' + w).length > 96){ out.push(line); line = '   '; }
    line += ' ' + w;
  }
  if(line.trim()) out.push(line);
  wrote++;
  i = k - 1;
}

if(!dry) writeFileSync(headPath, out.join('\n'));
console.log(`${theme.padEnd(22)} ${wrote} bio(s) from the bible`
  + (kept ? ` · ${kept} the bible writes none for` : '')
  + (unmatched.length ? ` · not on the roster: ${unmatched.join(', ')}` : '')
  + (dry ? '   (dry run — nothing written)' : ''));
