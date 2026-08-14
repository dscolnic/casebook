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

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');

const [theme, sheetArg] = process.argv.slice(2);
const dry = process.argv.includes('--dry');
if(!theme || !sheetArg){
  console.error('usage: node tools/apply-copy.mjs <theme> <edited.jsonl> [--dry]');
  process.exit(2);
}
const BOOKS = { deepwatch: 'deep-watch', bring_them_home: 'bring-them-home',
  outbreak_riverton: 'outbreak-riverton', planetary_defense: 'planetary-defense',
  projecty: 'project-y' };
const bookName = BOOKS[theme] ?? theme;
const bookPath = resolve(root, 'books', `${bookName}.yml`);
const manifestPath = resolve(root, 'books', 'copy', `${bookName}-copy.manifest.json`);
for(const p of [bookPath, manifestPath, resolve(process.cwd(), sheetArg)]){
  if(!existsSync(p)){ console.error(`missing: ${p}`); process.exit(2); }
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
  if(row.readOnly){ refused.push(`${e.id}: marked read-only (the original occurs more than once)`); continue; }
  if(/\n/.test(next)){ refused.push(`${e.id}: replacement has a line break in it`); continue; }
  // The YAML traps. A plain scalar cannot carry ": ", and a value starting with
  // one of these is structure rather than text.
  if(/: /.test(next) && !/^["']/.test(next)){
    refused.push(`${e.id}: contains ": " — rewrite with a dash, or the importer will read it as a key`);
    continue;
  }
  if(/^[-?:,\[\]{}#&*!|>%@`]/.test(next)){
    refused.push(`${e.id}: starts with a character YAML treats as structure`);
    continue;
  }
  const count = book.split(row.original).length - 1;
  if(count !== 1){
    refused.push(`${e.id}: original appears ${count} time(s) in the book, not once`);
    continue;
  }
  book = book.replace(row.original, next);
  applied.push({ id: e.id, from: row.original, to: next });
}

// Keep `answer:` byte-identical to the choice it names.
let resynced = 0;
for(const a of applied){
  if(!/\.choices\.\d+$/.test(a.id)) continue;
  const re = new RegExp(`(^\\s*answer: )${a.from.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*$`, 'm');
  if(re.test(book)){ book = book.replace(re, `$1${a.to}`); resynced++; }
}

console.log(`\n${applied.length} applied · ${unchanged.length} unchanged · ${refused.length} refused`
  + (resynced ? ` · ${resynced} answer line(s) re-synced` : ''));
for(const r of refused.slice(0, 20)) console.log(`  ✗ ${r}`);
if(refused.length > 20) console.log(`  ✗ … and ${refused.length - 20} more`);

if(dry){ console.log('\n--dry: nothing written'); process.exit(refused.length ? 1 : 0); }
writeFileSync(bookPath, book);
console.log(`\nwrote books/${bookName}.yml`);
console.log(`next: node tools/import-book.mjs books/${bookName}.yml ${theme} && npm run check ${theme}`);
