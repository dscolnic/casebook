// wiring.mjs — a file a theme ships and its manifest never imports.
//
//   node engine/dev/wiring.mjs <theme>
//   node engine/dev/wiring.mjs --all
//
// The generators write a theme's furniture into files of their own —
// `metrics.js` from the bible's §2, `fixtures.js` from its §3 — and a theme.js
// that does not import one is a campaign scored on nothing, or a campaign whose
// every question is asked at the same case stand. Both look exactly like a
// campaign that has none, and both shipped: Whiteout ran for a day with four
// bars in a file nothing read, and three campaigns arrived with the same gap
// the moment they were copied from a theme that predated the mechanism.
//
// The same class of hole one step earlier: a book that carries worked examples
// whose content ships none. `import-book.mjs` filters them, so a shape it does
// not accept is dropped in silence — 135 examples across two campaigns were
// read from the bible, written into the book, assembled, and then vanished.
//
// Nothing here reads the bible. The question is only whether what the repo has
// already generated reaches the game.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeDir, themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '../..');
const args = process.argv.slice(2);
const themes = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!themes.length){
  console.error('usage: node engine/dev/wiring.mjs <theme> | --all');
  process.exit(2);
}

let bad = 0;
for(const name of themes){
  const dir = resolve(gamekit, themeDir(name));
  const manifestPath = resolve(dir, 'theme.js');
  if(!existsSync(manifestPath)) continue;
  const theme = (await import(pathToFileURL(manifestPath).href)).default;
  const problems = [];

  // ---- generated files the manifest has to import
  for(const [file, key, what] of [
    ['metrics.js', 'metrics', 'the four bars, the recovery economy and every post-mission screen'],
    ['fixtures.js', 'fixtures', 'the objects the questions are asked at'],
  ]){
    if(!existsSync(resolve(dir, file))) continue;
    const wired = key === 'metrics' ? !!theme.metrics : !!theme.fixtures;
    if(!wired){
      problems.push(`ships ${file} and the manifest has no \`${key}\` — ${what}, in a file`
        + ' nothing imports');
    }
  }

  // ---- worked examples that reach the mission card
  const book = resolve(gamekit, 'books', `${name}.yml`);
  if(existsSync(book)){
    const said = readFileSync(book, 'utf8');
    // Counted off the book's own text rather than parsed: this is a smoke
    // alarm, and `bookParity` is the parser.
    const inBook = (said.match(/^\s{2}worked:$/gm) ?? []).length;
    if(inBook){
      const missions = theme.content?.MISSIONS ?? [];
      const shipped = missions.filter(m => (m.worked?.examples ?? []).length).length;
      if(!shipped){
        problems.push(`its book writes \`worked:\` on ${inBook} mission(s) and the content ships`
          + ' none — the mission card offers no button and nothing says why');
      }
    }
  }

  if(problems.length){
    bad++;
    console.log(`✗ ${name}`);
    for(const p of problems) console.log(`    ✗ ${p}`);
  } else if(themes.length === 1){
    console.log(`✓ theme "${name}": every generated file it ships is imported`);
  }
}
if(themes.length > 1){
  console.log(bad
    ? `\nwiring: ${bad} theme(s) ship a file the game never reads.`
    : `\n✓ ${themes.length} theme(s): every generated file a theme ships is imported.`);
}
process.exitCode = bad ? 1 : 0;
