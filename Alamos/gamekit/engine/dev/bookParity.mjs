// bookParity.mjs — does the book still regenerate the game?
//
//   node engine/dev/bookParity.mjs <theme>
//   node engine/dev/bookParity.mjs <theme> --verbose
//
// A format is only a single source of truth while that is true of every game. It
// stopped being true twice: four games were generated from `books/*.yml` and
// three were not, and content was edited in the generated files because that was
// the only way to reach the three that had no book.
//
// So this imports the book into a scratch directory and compares what comes out,
// export by export, against the content the theme actually ships. A hand edit to
// a generated file fails here the same day it is made, and a game with no book
// fails until it has one.
import { mkdtempSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { themeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '../..');

const themeName = process.argv[2];
const verbose = process.argv.includes('--verbose');
if(!themeName){
  console.error('usage: node engine/dev/bookParity.mjs <theme> [--verbose]');
  process.exit(2);
}

// The books that exist were named for the game, not for the theme id, so
// `bring_them_home` is `books/bring-them-home.yml`. Both spellings resolve.
// `deepwatch` is `deep-watch.yml`, so the match ignores the separators
// altogether rather than guessing which one an author used.
const flat = (s) => s.replace(/[-_\s]/g, '').toLowerCase();
const bookName = (existsSync(resolve(gamekit, 'books'))
  ? readdirSync(resolve(gamekit, 'books')).filter(f => f.endsWith('.yml'))
  : []).find(f => flat(f.replace(/\.yml$/, '')) === flat(themeName));
if(!bookName){
  console.log(`\n✗ theme "${themeName}" has no book: nothing in books/ matches "${themeName}"`);
  console.log(`  (node tools/export-book.mjs ${themeName} writes one out of the game it already has)`);
  process.exit(1);
}
const bookPath = resolve(gamekit, 'books', bookName);

const scratch = mkdtempSync(join(tmpdir(), `bookparity-${themeName}-`));
try{
  const run = spawnSync(process.execPath,
    [resolve(gamekit, 'tools/import-book.mjs'), bookPath, themeName, '--out', scratch],
    { cwd: gamekit, encoding: 'utf8' });
  if(run.status !== 0){
    console.log(`\n✗ theme "${themeName}": the book does not import\n${(run.stderr || run.stdout || '').trim()}`);
    process.exit(1);
  }

  const shipped = resolve(themeDir(themeName), 'content');
  const problems = [];

  const load = async (dir, file) => {
    const path = resolve(dir, file);
    if(!existsSync(path)) return null;
    // A fresh query string per run: the scratch directory is new every time, but
    // the shipped file is not, and a cached module would compare stale content.
    return await import(pathToFileURL(path).href + `?t=${Date.now()}`);
  };

  /** First path at which two values differ, or null. */
  function firstDiff(a, b, path = ''){
    if(a === b) return null;
    if(typeof a !== typeof b || a === null || b === null || typeof a !== 'object'){
      return { path, book: a, shipped: b };
    }
    if(Array.isArray(a) !== Array.isArray(b)) return { path, book: `array:${Array.isArray(a)}`, shipped: `array:${Array.isArray(b)}` };
    if(Array.isArray(a)){
      if(a.length !== b.length) return { path, book: `${a.length} items`, shipped: `${b.length} items` };
      for(let i = 0; i < a.length; i++){
        const d = firstDiff(a[i], b[i], `${path}[${i}]`);
        if(d) return d;
      }
      return null;
    }
    const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
    for(const k of keys){
      const d = firstDiff(a[k], b[k], path ? `${path}.${k}` : k);
      if(d) return d;
    }
    return null;
  }

  const files = [...new Set([...readdirSync(scratch), ...(existsSync(shipped) ? readdirSync(shipped) : [])])]
    .filter(f => f.endsWith('.js')).sort();
  if(!files.length) problems.push('the import wrote nothing and the theme ships nothing');

  for(const file of files){
    const fromBook = await load(scratch, file);
    const fromTheme = await load(shipped, file);
    if(!fromBook){ problems.push(`${file}: the theme ships it and the book does not produce it`); continue; }
    if(!fromTheme){ problems.push(`${file}: the book produces it and the theme does not ship it`); continue; }
    for(const name of Object.keys(fromBook)){
      if(!(name in fromTheme)){ problems.push(`${file}: the book produces ${name} and the theme does not export it`); continue; }
      const d = firstDiff(fromBook[name], fromTheme[name], name);
      if(d){
        const show = (v) => JSON.stringify(v)?.slice(0, verbose ? 400 : 120) ?? String(v);
        problems.push(`${file}: ${d.path} differs\n      book:    ${show(d.book)}\n      shipped: ${show(d.shipped)}`);
      }
    }
  }

  if(problems.length){
    console.log(`\n✗ theme "${themeName}": ${problems.length} difference(s) between books/${bookName} and the content it ships`);
    for(const p of (verbose ? problems : problems.slice(0, 8))) console.log('  ✗ ' + p);
    if(!verbose && problems.length > 8) console.log(`  … ${problems.length - 8} more (--verbose)`);
    console.log(`  (re-import to adopt the book, or export the game to update the book)`);
    process.exit(1);
  }
  console.log(`\n✓ theme "${themeName}": books/${bookName} regenerates every content file it ships`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
