// apply-copy.mjs — put an edited copy sheet back into the book.
//
//   node tools/apply-copy.mjs <theme> books/copy/<theme>-copy.edited.jsonl [--dry]
//
// The sheet that went out carries an id and a string. The manifest kept here
// carries the id and the *original* string. So putting the edit back is an exact
// string replacement in `books/<theme>.yml`, guarded three ways:
//
//   · the original must appear in the book exactly once, or the row is refused
//   · the replacement must be a single line of prose, or the row is refused —
//     a multi-line value would break a YAML block scalar's indentation
//   · a replacement containing ": " or starting with a character YAML treats as
//     structure is refused, because that is the trap that has cost this repo
//     more importer failures than anything else
//
// `answer:` is not in the sheet. Where an edited string was one of a question's
// `choices` and the book's `answer` matched it, the answer is rewritten to match
// — grading is by label, and a choice edited without its answer is a question
// nobody can get right.
//
// Nothing here decides whether an edit is good. Run `npm run check <theme>`
// afterwards: the thirteen checks are what say whether the prose still clears
// the bar it cleared before.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { bookNameFor } from './books.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');

const [theme, sheetArg] = process.argv.slice(2);
const dry = process.argv.includes('--dry');
if(!theme || !sheetArg){
  console.error('usage: node tools/apply-copy.mjs <theme> <edited.jsonl> [--dry]');
  process.exit(2);
}
// One resolver, in tools/books.mjs: a book is found by matching the
// separator-free spelling of the theme name, so an edition's book needs no
// entry anywhere.
const bookName = bookNameFor(theme) ?? theme;
const bookPath = resolve(root, 'books', `${bookName}.yml`);
const manifestPath = resolve(root, 'books', 'copy', `${bookName}-copy.manifest.json`);
for(const p of [bookPath, manifestPath, resolve(process.cwd(), sheetArg)]){
  if(!existsSync(p)){ console.error(`missing: ${p}`); process.exit(2); }
}


const escRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Find a value in the book, however it happens to be wrapped.
 *
 * Long prose is stored as a folded block scalar — `why: >` and a paragraph
 * broken over indented lines — so the one-line value the sheet carries never
 * appears verbatim. Matching on a whitespace-insensitive pattern finds it, and
 * the span that comes back is what gets replaced.
 *
 * `indent` is the leading whitespace of the *continuation* lines, which is what
 * a replacement has to be re-wrapped to. `folded` says whether this value was
 * spread over more than one line, because a single-line value must stay on one
 * line and a folded one must stay folded.
 */
function locate(text, original){
  const words = original.split(/\s+/).filter(Boolean);
  if(!words.length) return null;
  const re = new RegExp(words.map(escRe).join('\\s+'), 'g');
  // A hit that sits on an `answer:` line is the copy of a choice, not the choice
  // itself. Counting it made every correct answer look ambiguous and refused it;
  // the resync step below is what keeps the pair in step afterwards.
  const onAnswerLine = (index) => {
    const lineStart = text.lastIndexOf('\n', index) + 1;
    return /^\s*answer: /.test(text.slice(lineStart, index + 1));
  };
  const hits = [...text.matchAll(re)].filter(h => !onAnswerLine(h.index));
  if(!hits.length) return null;
  const m = hits[0];
  const span = m[0];
  const folded = /\n/.test(span);
  // The indent of the second line of the span, or of the line the span sits on.
  let indent = '';
  if(folded){
    const second = span.split('\n')[1] ?? '';
    indent = (second.match(/^\s*/) ?? [''])[0];
  }else{
    const lineStart = text.lastIndexOf('\n', m.index) + 1;
    indent = (text.slice(lineStart).match(/^\s*/) ?? [''])[0] + '  ';
  }
  return { start: m.index, end: m.index + span.length, count: hits.length, folded, indent };
}

/**
 * Put a replacement back in the shape the book expects.
 *
 * A folded value is re-wrapped to the indentation it had. A value that contains
 * ": " would be read as a key, so it comes back double-quoted rather than
 * refused — which is what the importer's own parser accepts, and is how the one
 * quoted label in Quantum's book is already written.
 */
function render(next, found){
  const needsQuote = /: /.test(next) && !/^["']/.test(next);
  const value = needsQuote ? `"${next.replace(/"/g, '\\"')}"` : next;
  if(!found.folded) return value;
  const width = 96;
  const out = [];
  let line = '';
  for(const w of value.split(' ')){
    if(line && (line + ' ' + w).length + found.indent.length > width){ out.push(line); line = w; }
    else line = line ? line + ' ' + w : w;
  }
  if(line) out.push(line);
  return out.join('\n' + found.indent);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const originals = new Map(manifest.rows.map(r => [r.id, r]));
let book = readFileSync(bookPath, 'utf8');

const edits = readFileSync(resolve(process.cwd(), sheetArg), 'utf8')
  .split('\n').map(l => l.trim()).filter(Boolean)
  .map((l, i) => { try{ return JSON.parse(l); }catch{ return { __bad: i + 1 }; } });

const applied = [], refused = [], unchanged = [];
for(const e of edits){
  if(e.__bad){ refused.push(`line ${e.__bad}: not valid JSON`); continue; }
  const row = originals.get(e.id);
  if(!row){ refused.push(`${e.id}: not a known id`); continue; }
  const next = String(e.text ?? '').trim();
  if(!next){ refused.push(`${e.id}: empty replacement`); continue; }
  if(next === row.original){ unchanged.push(e.id); continue; }
  if(row.readOnly){ refused.push(`${e.id}: read-only — this value is not unique in the book`); continue; }
  if(/\n/.test(next)){ refused.push(`${e.id}: replacement has a line break in it`); continue; }
  if(/^[-?:,\[\]{}#&*!|>%@`]/.test(next)){
    refused.push(`${e.id}: starts with a character YAML treats as structure`);
    continue;
  }
  const found = locate(book, row.original);
  if(!found){ refused.push(`${e.id}: original no longer in the book — re-export before applying`); continue; }
  if(found.count !== 1){ refused.push(`${e.id}: original appears ${found.count} times, not once`); continue; }
  book = book.slice(0, found.start) + render(next, found) + book.slice(found.end);
  applied.push({ id: e.id, from: row.original, to: next });
}

// Keep `answer:` byte-identical to the choice it names.
let resynced = 0;
for(const a of applied){
  if(!/\.choices\.\d+$/.test(a.id)) continue;
  const words = a.from.split(/\s+/).filter(Boolean).map(escRe).join('\\s+');
  const re = new RegExp(`(^\\s*answer: )${words}\\s*$`, 'm');
  if(re.test(book)){
    const quoted = /: /.test(a.to) ? `"${a.to.replace(/"/g, '\\"')}"` : a.to;
    book = book.replace(re, `$1${quoted}`); resynced++;
  }
}

console.log(`\n${applied.length} applied · ${unchanged.length} unchanged · ${refused.length} refused`
  + (resynced ? ` · ${resynced} answer line(s) re-synced` : ''));
for(const r of refused.slice(0, 20)) console.log(`  ✗ ${r}`);
if(refused.length > 20) console.log(`  ✗ … and ${refused.length - 20} more`);

if(dry){ console.log('\n--dry: nothing written'); process.exit(refused.length ? 1 : 0); }
writeFileSync(bookPath, book);
console.log(`\nwrote books/${bookName}.yml`);
console.log(`next: node tools/import-book.mjs books/${bookName}.yml ${theme} && npm run check ${theme}`);
