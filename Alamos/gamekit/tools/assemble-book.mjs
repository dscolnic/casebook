// assemble-book.mjs — join a book's head with its per-mission fragments.
//
//   node tools/assemble-book.mjs books/parts/<theme>/_book.yml > books/<theme>.yml
//
// WHY A BOOK COMES IN PIECES. A fifteen-mission book is sixteen hundred lines,
// and the only way to build three campaigns at once is for several people to
// write different missions at the same time. They cannot do that in one file:
// every one of them would be editing the same `missions:` list, and the merge is
// the whole of the work again. So a mission is a file, `tools/v10extract.mjs
// --all` writes one per mission, and this puts them back together in order.
//
// WHAT STAYS IN THE HEAD, and it is the important half. Everything that is
// campaign-wide rather than per mission — the theme block, the areas, the roster,
// the glossary, `beatRooms`, the interiors and the place copy — lives in the head
// and is written ONCE, by one person, before anybody splits the missions up. Two
// authors each adding a glossary entry for the same term is a definition given
// twice; two authors each deciding which area a stop belongs to is a curriculum
// nobody planned. Fragments carry missions and nothing else.
//
// The head is an ordinary book file with one marker line in it:
//
//   missions:
//   # <<< MISSIONS >>>
//
// Everything above and below the marker is copied through untouched.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, resolve, basename } from 'node:path';

const MARK = /^\s*#\s*<<<\s*MISSIONS\s*>>>\s*$/;

const args = process.argv.slice(2);
const headFile = args.find(a => !a.startsWith('--'));
const strict = !args.includes('--allow-todo');
if(!headFile){
  console.error('usage: node tools/assemble-book.mjs <head.yml> [--allow-todo] > books/<theme>.yml');
  process.exit(2);
}
if(!existsSync(headFile)){ console.error(`no such head: ${headFile}`); process.exit(2); }

const dir = dirname(resolve(headFile));
const head = readFileSync(headFile, 'utf8').split('\n');
const at = head.findIndex(l => MARK.test(l));
if(at < 0){
  console.error(`${headFile} has no "# <<< MISSIONS >>>" marker — see the note at the top of this file`);
  process.exit(2);
}

// Numeric order, from the filename. `m02.yml` sorts before `m10.yml`, which a
// plain string sort does not, and a campaign whose missions arrive in the wrong
// order is a campaign whose every `after:` is wrong.
const parts = readdirSync(dir)
  .filter(f => /^m\d+\.ya?ml$/i.test(f))
  .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
if(!parts.length){ console.error(`no m<N>.yml fragments beside ${headFile}`); process.exit(2); }

const bodies = [];
const todos = [];
for(const f of parts){
  const text = readFileSync(resolve(dir, f), 'utf8');
  // A TODO left in a fragment is a mapping nobody did — a stop with no area, a
  // beat with no trigger, a payload still in the bible's own field names. The
  // importer would refuse most of them and silently accept the rest, so they are
  // caught here, where the message can name the file and the line.
  text.split('\n').forEach((l, i) => {
    if(/\bTODO\b/.test(l) && !/^\s*#/.test(l)) todos.push(`${f}:${i + 1}  ${l.trim()}`);
  });
  bodies.push(text.replace(/\n+$/, ''));
}

if(todos.length && strict){
  console.error(`${todos.length} unfinished mapping(s) — the book is not assembled:\n`);
  for(const t of todos.slice(0, 40)) console.error('  ' + t);
  if(todos.length > 40) console.error(`  … ${todos.length - 40} more`);
  console.error('\nEach is a decision the bible does not make: which area a stop teaches for,');
  console.error('which fixture it is asked at, who asks it, or a payload still in the');
  console.error('bible\'s field names. Pass --allow-todo to assemble anyway and let the');
  console.error('importer refuse it instead.');
  process.exit(1);
}

const out = [
  ...head.slice(0, at),
  `# ${parts.length} mission fragment(s), assembled by tools/assemble-book.mjs from`,
  `# ${basename(dir)}/ — edit the fragments, not this file.`,
  ...bodies,
  ...head.slice(at + 1),
];
process.stdout.write(out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.error(`assembled ${parts.length} mission(s): ${parts.join(' ')}`
  + (todos.length ? `  (${todos.length} TODO left, allowed)` : ''));
