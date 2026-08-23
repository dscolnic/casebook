// sync-casebook.mjs — build every game and hand the output to the casebook app.
//
//   npm run sync-casebook                    # build all, copy into ../../../casebook/games
//   npm run sync-casebook -- --no-build      # copy what is already in dist/
//   npm run sync-casebook -- --only headwater,icecore
//   npm run sync-casebook -- --out /path/to/casebook
//
// WHY PREBUILT OUTPUT RATHER THAN SOURCE. The theme is chosen at build time —
// `THEME=x vite build` writes `dist/x/` — so serving fifteen games means fifteen
// builds. Running those on the app host would put ten minutes of vite in front
// of every deploy, for output that only changes when a game changes. The games
// are built here, committed to casebook, and served as static files by Express.
//
// WHAT THIS DOES NOT WRITE. `games/index.html` is the app's own shelf, written
// and styled in the casebook repo. This writes `games/games.json` beside it and
// the shelf reads that, so adding a game is a sync rather than an HTML edit.
//
// THE ONE THING THAT WILL BITE. Builds must use `--base ./`. A build without it
// asks for `/assets/…` at the server root, which is casebook's root, and every
// game comes up blank — with a 200 and no error anywhere, because the app is
// happy to serve its own index.html for a path that does not exist.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { GAMES, cards } from './games.js';
import { splitSentences } from './sentences.js';
import { SYLLABUS } from './syllabus.js';
// One description of what is read back off a theme; see tools/themeFacts.js.
import { themeDirOf, gradeOf, roleOf, dayNounOf, sizeOf } from './themeFacts.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const DIST = resolve(root, 'dist');

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const valueOf = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const only = (valueOf('--only') ?? '').split(',').map(s => s.trim()).filter(Boolean);
const noBuild = has('--no-build');
// Sixteen games at senior-high level and fourteen middle-school editions of
// them is thirty builds. `--level middle` rebuilds one set on its own.
const onlyLevel = valueOf('--level');

// Default: the casebook checkout beside this one. `code/Nuclear/Alamos/gamekit`
// up three is `code/`, and casebook sits there.
const OUT = resolve(valueOf('--out') ?? process.env.CASEBOOK_DIR ?? resolve(root, '../../../casebook'));
const GAMES_DIR = resolve(OUT, 'games');

if (!existsSync(OUT)) {
  console.error(`no casebook checkout at ${OUT}\n  pass --out /path/to/casebook, or set CASEBOOK_DIR`);
  process.exit(1);
}

/**
 * The drama, in the game's own words.
 *
 * Not authored here. Every theme already opens on one paragraph of situation —
 * what has happened, whose job it is, and what it costs in people — and that
 * paragraph has been through the reading-level gate and the four-beat sweep.
 * A separate hook written for the shelf would be a second description of the
 * same game, and the second one goes stale.
 *
 * `opening` is a JS array of concatenated string literals in the manifest, so
 * this joins the pieces, unescapes, and takes whole sentences up to a budget —
 * cutting mid-sentence reads as a truncation bug rather than as a summary.
 */
const dramaOf = (id, budget = 330) => {
  const f = resolve(themeDirOf(id), 'theme.js');
  if (!existsSync(f)) return '';
  const src = readFileSync(f, 'utf8');
  const block = /opening:\s*\[([\s\S]*?)\n\s*\],/.exec(src);
  if (!block) return '';
  // Every quoted run in the block, in order: that is the paragraph, whatever
  // the author's line breaks and `+` joins happen to look like.
  const parts = [...block[1].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map(m => m[1]);
  const text = parts.join('').replace(/\\'/g, "'").replace(/\s+/g, ' ').trim();
  if (!text) return '';

  // Where a sentence ends is `tools/sentences.js`, not this file. It used to be
  // this file, guarding decimals only, and the missing case put "Kerrow No. You
  // are the winding engineer's assistant" on the shelf under Overwind.
  const sentences = splitSentences(text);
  if (sentences.length <= 2) return text;

  // The first two beats of the card, and only those.
  //
  // An opening has four beats in a fixed order (CLAUDE.md, editions and copy):
  // what has happened, the player's job stated as authority, the clock, and last
  // what it costs in people. Taking sentences one to three caught the first beat
  // and then whatever quantities the clock needed — Headwater came out as
  // ninety-two million cubic metres, 88% and nine days of rain, every number
  // true and no drama in any of them.
  //
  // Reaching for the closing beat instead was worse, and it is worth writing
  // down why: the last sentence of a paragraph is written to be read *after* the
  // rest of it, so it is full of back-reference. Lifted out on its own it became
  // "Neither can you", "whatever those two can be got to agree to make", "needs
  // to know which you have", "The river can rise in two". Every one of them
  // grammatical, and every one of them pointing at a sentence that is no longer
  // there.
  //
  // These two beats cannot do that. The opening sentence has nothing before it
  // to refer back to, and "You are the X, which means Y" carries its own
  // antecedent. Two sentences that always parse beat three that sometimes do.
  const first = sentences[0];
  const authority = sentences.find((x, i) => i > 0 && /\bYou (are|lead|direct|have|run)\b/.test(x))
                 ?? sentences[1];
  const out = [first];
  if (authority && authority !== first && (first.length + authority.length) <= budget) {
    out.push(authority);
  }
  return out.join(' ');
};

/**
 * What the course actually covers, out of the syllabus the game is measured
 * against. A spread rather than the first few: the list is in teaching order,
 * so the top of it is all foundations and reads the same for every game in a
 * subject. Sampling across it shows the range instead.
 */
const conceptsOf = (id, n = 5) => {
  const all = (SYLLABUS[id]?.concepts ?? []).map(c => c.c).filter(Boolean);
  if (all.length <= n) return all;
  const step = (all.length - 1) / (n - 1);
  return Array.from({ length: n }, (_, i) => all[Math.round(i * step)]);
};

function buildTheme(id) {
  process.stdout.write(`  building ${id} … `);
  try {
    execFileSync('npx', ['vite', 'build', '--base', './'],
      { cwd: root, env: { ...process.env, THEME: id }, stdio: 'pipe' });
    console.log('ok');
    return true;
  } catch (e) {
    console.log('FAILED');
    console.log(String(e.stdout ?? '').split('\n').slice(-6).join('\n'));
    return false;
  }
}

/** A card image, downscaled. sips is macOS-only, so a plain copy is the fallback. */
function copyHero(g) {
  if (!g.hero) return null;
  // Editions are played in the base game's place, so there is one set of
  // screenshots and both cards point at the same file.
  const src = resolve(root, 'shots', g.shotsFrom, g.hero);
  if (!existsSync(src)) return null;
  const shots = resolve(GAMES_DIR, 'shots');
  mkdirSync(shots, { recursive: true });
  const jpg = resolve(shots, `${g.shotsFrom}.jpg`);
  try {
    execFileSync('sips', ['-Z', '1200', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78',
      src, '--out', jpg], { stdio: 'pipe' });
    return `shots/${g.shotsFrom}.jpg`;
  } catch {
    cpSync(src, resolve(shots, `${g.shotsFrom}.png`));
    return `shots/${g.shotsFrom}.png`;
  }
}

// ------------------------------------------------------------------- main

const ALL = cards();
let wanted = ALL;
if (only.length) wanted = wanted.filter(g => only.includes(g.id) || only.includes(g.build) || only.includes(g.pair));
if (onlyLevel) wanted = wanted.filter(g => g.level === onlyLevel);

if (!noBuild) {
  console.log(`building ${wanted.length} game(s) into dist/ …`);
  let ok = 0;
  for (const g of wanted) if (buildTheme(g.build)) ok++;
  console.log(`${ok}/${wanted.length} built`);
}

mkdirSync(GAMES_DIR, { recursive: true });

const shipped = [];
const missing = [];
for (const g of wanted) {
  const from = resolve(DIST, g.build);
  if (!existsSync(resolve(from, 'index.html'))) { missing.push(g.build); continue; }
  const to = resolve(GAMES_DIR, g.build);
  // Replace rather than merge: vite hashes its asset filenames, so a merge
  // leaves every previous build's chunks behind and the folder grows forever.
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  shipped.push(g.build);
}

// The catalogue the shelf reads. Written for every game in GAMES, not only the
// ones synced this run, with `built` saying which ones are actually on disk —
// a card that 404s is worse than a card that says it is not built yet.
//
// `level`, `pair` and `grades` are what the shelf's level control reads. `pair`
// is the same game at another level: two rows carrying one `pair` are one game
// taught twice, and a history that lists them as two unrelated games is wrong
// about what the player played.
const catalogue = ALL.map(g => ({
  ...g,
  hero: copyHero(g),
  role: roleOf(g.build),
  // What the game calls a day, so the shelf can print "3 levels" rather than
  // "3 days" for a campaign that has none.
  dayNoun: dayNounOf(g.build),
  grade: gradeOf(g.build),
  drama: dramaOf(g.build),
  concepts: conceptsOf(g.build),
  size: sizeOf(g.build),
  built: existsSync(resolve(GAMES_DIR, g.build, 'index.html')),
}));
writeFileSync(resolve(GAMES_DIR, 'games.json'), JSON.stringify({ games: catalogue }, null, 2));

console.log(`\nsynced ${shipped.length} game(s) into ${GAMES_DIR}`);
if (missing.length) console.log(`not built, so not copied: ${missing.join(', ')}`);
const unbuilt = catalogue.filter(g => !g.built).map(g => g.build);
if (unbuilt.length) console.log(`catalogue rows with no build on disk: ${unbuilt.join(', ')}`);
console.log(`\nnext: cd ${OUT} && git add games && git commit`);
