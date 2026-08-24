// derive-edition.mjs — start a middle-school edition of a game that exists.
//
//   node tools/derive-edition.mjs <base>                       # print the day sheet and stop
//   node tools/derive-edition.mjs <base> --days 1,2,4,6,…      # derive it
//   node tools/derive-edition.mjs <base> --days … --dry        # write nothing
//
// An edition is the same place, the same cast and the same story, teaching a
// different course. This writes the *scaffold* of one: a ten-day book carrying
// the senior-high prose verbatim, a manifest that declares grade 6, and a theme
// directory that owns nothing but its content. Everything structural is green
// from the first run — the campaign is reachable, the questions grade, the
// places exist — and the prose is then rewritten by an editorial pass against
// books/GRADE6_BRIEF.md.
//
// WHAT IT DELIBERATELY DOES NOT DO. It does not simplify a word. A tool that
// shortened sentences would produce something that passes the reading gate and
// teaches the same senior-high course badly, which is worse than an honest red
// check. The count of over-grade passages it prints at the end is the work
// list, not a defect in the scaffold. See MIDDLE_SCHOOL_EDITIONS.md §3.
//
// WHY THE BOOK IS SLICED RATHER THAN RE-EMITTED. `emitYaml` round-trips a book
// faithfully and reformats every line of it, which turns "keep ten of these
// fifteen days" into a six-thousand-line diff nobody can review — the same
// reason tools/apply-conversions.mjs edits spans in place. Every byte of a kept
// day is the byte the author wrote, comments included.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { parseYaml } from './yaml-lite.mjs';
import { fleschKincaid } from './readability.js';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');

const [base, ...flags] = process.argv.slice(2);
const valueOf = (f) => { const i = flags.indexOf(f); return i >= 0 ? flags[i + 1] : null; };
const dry = flags.includes('--dry');
const force = flags.includes('--force');
const GRADE = Number(valueOf('--grade') ?? 6);
const SUFFIX = valueOf('--suffix') ?? 'ms';

if(!base || base.startsWith('-')){
  console.error('usage: node tools/derive-edition.mjs <base-theme> [--days 1,2,…] [--dry] [--force]');
  process.exit(2);
}

const edition = `${base}_${SUFFIX}`;

// ------------------------------------------------------------------ the book
// The books are named for the game rather than for the theme id, so
// `bring_them_home` is `bring-them-home.yml`. Matching on the separator-free
// spelling is what bookParity.mjs does, and doing it the same way here is what
// makes `books/<name>-ms.yml` findable by that check without changing it.
const flat = (s) => s.replace(/[-_\s]/g, '').toLowerCase();
const bookDir = resolve(gamekit, 'books');
const bookName = readdirSync(bookDir).filter(f => f.endsWith('.yml'))
  .find(f => flat(f.replace(/\.yml$/, '')) === flat(base));
if(!bookName){
  console.error(`no book in books/ matches "${base}" — an edition is derived from a book, not from generated content`);
  process.exit(1);
}
const raw = readFileSync(resolve(bookDir, bookName), 'utf8');
const book = parseYaml(raw);
const missions = book.missions ?? [];
if(!missions.length){
  console.error(`${bookName} has no missions`);
  process.exit(1);
}

// --------------------------------------------------------------- the slicing
//
// Two levels of structure are located in the raw text and nothing else is
// touched: the top-level sections (`theme:`, `groups:`, `missions:`, …) and,
// inside the missions section, one block per mission.
//
// Comments belong to whatever follows them. A `# ----- sol 291` banner above a
// mission is that mission's, and dropping the day has to drop its heading too
// or the book grows a run of captions with no days under them.
const lines = raw.split('\n');
const isTopKey = (l) => /^[A-Za-z_][\w-]*:/.test(l);
const isMissionStart = (l) => /^ {2}- /.test(l);

/** Pull a run of comment and blank lines back onto the block that follows. */
function claimPreamble(from){
  let i = from;
  while(i > 0 && /^\s*(#.*)?$/.test(lines[i - 1])) i--;
  return i;
}

function blocksOf(startExclusive, endExclusive, isStart){
  const starts = [];
  for(let i = startExclusive; i < endExclusive; i++) if(isStart(lines[i])) starts.push(i);
  return starts.map((s, k) => ({
    from: claimPreamble(s),
    to: k + 1 < starts.length ? claimPreamble(starts[k + 1]) : endExclusive,
  }));
}

const keyLines = [];
for(let i = 0; i < lines.length; i++) if(isTopKey(lines[i])) keyLines.push(i);
const sections = keyLines.map((s, k) => ({
  key: lines[s].slice(0, lines[s].indexOf(':')),
  head: s,
  from: claimPreamble(s),
  to: k + 1 < keyLines.length ? claimPreamble(keyLines[k + 1]) : lines.length,
}));
const missionSection = sections.find(s => s.key === 'missions');
if(!missionSection){
  console.error(`${bookName} has no top-level "missions:" key`);
  process.exit(1);
}
const missionBlocks = blocksOf(missionSection.head + 1, missionSection.to, isMissionStart);
if(missionBlocks.length !== missions.length){
  console.error(`found ${missionBlocks.length} mission blocks in the text but ${missions.length} parsed missions — ` +
                `the slicing would drop the wrong day, so nothing is written`);
  process.exit(1);
}

// ------------------------------------------------------------- the day sheet
const groupName = Object.fromEntries((book.groups ?? []).map(g => [g.id, g.name ?? g.id]));
const cast = (book.roster ?? []).map(p => ({ id: p.id, name: p.name ?? p.id }));
const dayGroups = (m) => [...new Set((m.stops ?? []).map(s => s.group))];
const namesIn = (m) => cast.filter(p => {
  const surname = String(p.name).split(/\s+/).pop();
  const text = `${m.stake ?? ''} ${m.briefing ?? ''} ${(m.stops ?? []).map(s => s.scene ?? '').join(' ')}`;
  return surname.length > 2 && text.includes(surname);
}).map(p => String(p.name).split(/\s+/).pop());

if(!valueOf('--days')){
  console.log(`\n${base}: ${missions.length} days. Choose ten.\n`);
  console.log('  #   groups                      people named            title');
  missions.forEach((m, i) => {
    const gs = dayGroups(m).map(g => groupName[g] ?? g).join(', ');
    console.log(`  ${String(i + 1).padStart(2)}  ${gs.slice(0, 26).padEnd(26)}  ` +
                `${namesIn(m).slice(0, 3).join(' ').slice(0, 21).padEnd(21)}  ${m.title ?? ''}`);
  });
  console.log(`
Every group must keep at least one day, day 1 and day ${missions.length} are kept, and both
sides of the campaign argument keep the day they win (STORY_SPEC.md §1).

  node tools/derive-edition.mjs ${base} --days 1,2,…\n`);
  process.exit(0);
}

// ------------------------------------------------------------- the selection
const days = valueOf('--days').split(',').map(s => Number(s.trim())).filter(Number.isFinite);
const bad = days.filter(d => d < 1 || d > missions.length);
if(bad.length){ console.error(`no such day: ${bad.join(', ')}`); process.exit(1); }
if(new Set(days).size !== days.length){ console.error('a day is listed twice'); process.exit(1); }
const kept = [...days].sort((a, b) => a - b);

const problems = [];
if(!kept.includes(1)) problems.push('day 1 is not kept — the campaign opens on it');
if(!kept.includes(missions.length)) problems.push(`day ${missions.length} is not kept — the campaign closes on it`);
const coveredGroups = new Set(kept.flatMap(d => dayGroups(missions[d - 1])));
for(const g of book.groups ?? []){
  if(!coveredGroups.has(g.id)){
    problems.push(`group "${g.id}" (${groupName[g.id]}) keeps no day — that building becomes unreachable`);
  }
}
if(problems.length && !force){
  console.error('\n' + problems.map(p => '  ✗ ' + p).join('\n'));
  console.error('\nNothing written. Change the selection, or --force if you mean it.\n');
  process.exit(1);
}
problems.forEach(p => console.log('  ! ' + p));

// ------------------------------------------------------------------ the book
const slice = (from, to) => lines.slice(from, to).join('\n');

// `interiors:` is the inside of the place, and the place belongs to the base
// theme. Left in, import-book would write themes/<base>_ms/interiors.js — a
// second copy of a file the edition is forbidden to own.
const DROP_SECTIONS = new Set(['interiors']);

const patchTheme = (text) => text
  .replace(/^(\s+id:\s*)['"]?[\w-]+['"]?\s*$/m, `$1${edition}`);

const parts = [];
parts.push(`# ${edition}.yml — ${book.theme?.title ?? base}, taught at grade ${GRADE}.
#
# DERIVED from books/${bookName} by tools/derive-edition.mjs. The place, the
# cast and the story are the base game's and are not this file's to change; the
# course is. Days kept: ${kept.join(', ')} of ${missions.length}.
#
# What may be rewritten here, and what may not, is MIDDLE_SCHOOL_EDITIONS.md §1,
# and engine/dev/editionParity.mjs fails the game for crossing it. Rewrite the
# prose against books/GRADE6_BRIEF.md and re-import:
#
#   node tools/import-book.mjs books/${edition.replace(/_/g, '-')}.yml ${edition} --verify
`);
for(const s of sections){
  if(DROP_SECTIONS.has(s.key)) continue;
  if(s.key === 'missions'){
    parts.push(slice(s.from, missionSection.head + 1));
    for(const d of kept) parts.push(slice(missionBlocks[d - 1].from, missionBlocks[d - 1].to).replace(/\n+$/, ''));
    continue;
  }
  const text = slice(s.from, s.to).replace(/\n+$/, '');
  parts.push(s.key === 'theme' ? patchTheme(text) : text);
}
// CLAIMS DO NOT SURVIVE A CHANGE OF SYLLABUS.
//
// The book is sliced rather than re-emitted, so every line of a kept day comes across
// verbatim — including `concept:` and `takesAsRead:`, which name concepts on the BASE
// theme's syllabus. A junior edition has its own list, written for an eleven-year-old,
// and the overlap with the senior titles is exactly zero: Blackout's sixteen junior
// concepts share no title with its thirty-two senior ones, by design. Carried across,
// every one of those lines is a title the importer will refuse — correctly, and after
// the edition has been written to disk.
//
// So they are stripped here, and the count is printed as work rather than hidden. The
// junior edition needs its own claims against its own list, which is a smaller job
// than it sounds: sixteen concepts, and `conceptOrder` is silent until the junior
// syllabus carries `needs` of its own.
const CLAIM_KEYS = /^ {8}(concept|takesAsRead):/;
let stripped = 0;
const outBook = parts.join('\n').split('\n').filter((line, i, all) => {
  if(CLAIM_KEYS.test(line)){ stripped++; return false; }
  // a declaration's list items, which are indented under `takesAsRead:`
  if(/^ {10}- /.test(line)){
    for(let k = i - 1; k >= 0; k--){
      if(/^ {10}- /.test(all[k])) continue;
      if(/^ {8}takesAsRead:/.test(all[k])){ stripped++; return false; }
      break;
    }
  }
  return true;
}).join('\n') + '\n';
const bookOutName = `${edition.replace(/_/g, '-')}.yml`;
const bookOutPath = resolve(bookDir, bookOutName);

// --------------------------------------------------------------- the manifest
//
// Derived from the base manifest rather than from a template, so that whatever
// the base imports — a shared.js of diagnosis packs, a plan.js instead of a
// site.js — comes across without anybody having to remember it. Only three
// things change: where the place comes from, the audience, and the id.
//
// Which means the base's `delivery` comes across whole, and an edition with fewer
// days than its base carries a piece list of the wrong length until somebody
// rewrites it — one piece per mission is what `engine/dev/delivery.mjs` asserts,
// and the piece NAMES are written for the base's reader anyway.
const baseThemeJs = resolve(gamekit, 'themes', base, 'theme.js');
if(!existsSync(baseThemeJs)){
  console.error(`no themes/${base}/theme.js — an edition is derived from a theme that ships`);
  process.exit(1);
}
const manifest = readFileSync(baseThemeJs, 'utf8')
  // Everything the theme owns that is not content is the base theme's file.
  .replace(/from '\.\/(?!content\/)/g, `from '../${base}/`)
  .replace(/audience:\s*\{[^}]*\}/, `audience: { grade: ${GRADE} }`)
  .replace(/^(\s*id:\s*)'[\w-]+'/m, `$1'${edition}'`);

const header = `// theme.js — ${book.theme?.title ?? base}, at grade ${GRADE}.
//
// edition-of: ${base}
//
// GENERATED by tools/derive-edition.mjs. This is an *edition*: the place, the
// props, the interiors and the outfits are themes/${base}'s and are imported
// across, so this directory owns a manifest and its generated content and
// nothing else. engine/dev/editionParity.mjs fails the game for any other file
// in here, and for a cast or a set of areas that has drifted from the base.
//
// The marker line above is read by engine/dev/registry.mjs (placeDir) and by
// vite.config.js, which take the site kind and the world module from the base
// theme — this directory's site.js is a re-export and no regex can read it.
`;

// The place shims. Nothing imports them for the game — the manifest above
// reaches straight across — but six dev tools resolve <themeDir>/site.js or
// plan.js by path, and a theme without one reads as a theme with no place.
const shims = ['site.js', 'plan.js', 'world.js']
  .filter(f => existsSync(resolve(gamekit, 'themes', base, f)))
  .map(f => [f, `// ${f} — the place is themes/${base}/${f}. This is an edition; see theme.js.\nexport * from '../${base}/${f}';\n`]);

const themeOut = resolve(gamekit, 'themes', edition);

if(dry){
  console.log(`\n[dry] would write:
  books/${bookOutName}                 ${kept.length} days of ${missions.length}
  themes/${edition}/theme.js
${shims.map(([f]) => `  themes/${edition}/${f}`).join('\n')}
  themes/${edition}/content/           (via import-book)
  themes.json                          + ${edition}\n`);
} else if(existsSync(bookOutPath) && !flags.includes('--force')){
  // IT WILL OVERWRITE A SHIPPING EDITION WITHOUT SAYING SO, AND IT DID.
  //
  // There is a `--dry`, and the tool reads as if it were for scaffolding something new,
  // so it was run on `blackout` to check one line of its output — and it rewrote the
  // nine days it had been given over the ten that ship, book and generated content
  // both. Nothing failed: a nine-day campaign is a valid campaign, `npm run check`
  // passed on it, and the only evidence was a mission count in a file nobody was
  // reading. This is house rule 14's shape — a save belongs to the theme that wrote
  // it — one directory over.
  console.error(`\n✗ books/${bookOutName} already exists, and ${edition} ships ${
    (readFileSync(bookOutPath, 'utf8').match(/^  - title: /gm) ?? []).length} day(s).
  Deriving again would replace that edition's book and regenerate its content from
  whatever --days you passed, which is how a shipping campaign quietly loses days.
  Use --dry to see what it would write, or --force if replacing it is the intent.\n`);
  process.exit(1);
} else {
  writeFileSync(bookOutPath, outBook);
  mkdirSync(themeOut, { recursive: true });
  writeFileSync(resolve(themeOut, 'theme.js'), header + manifest.replace(/^\/\/[^\n]*\n(\/\/[^\n]*\n)*/, ''));
  for(const [f, text] of shims) writeFileSync(resolve(themeOut, f), text);

  const regPath = resolve(gamekit, 'themes.json');
  const reg = JSON.parse(readFileSync(regPath, 'utf8'));
  reg.themes[edition] = `themes/${edition}`;
  writeFileSync(regPath, JSON.stringify(reg, null, 2) + '\n');

  try{
    execFileSync(process.execPath, [resolve(here, 'import-book.mjs'), `books/${bookOutName}`, edition],
                 { stdio: 'inherit', cwd: gamekit });
  }catch{
    console.error(`\nthe derived book did not import — books/${bookOutName} is written and themes/${edition} is not playable`);
    process.exit(1);
  }
}

// ------------------------------------------------------------- the work list
//
// The scaffold carries the base game's prose, which is written for a senior-high
// reader, so the reading gate fails from the first run. That is the point of
// measuring it here: the number below is the size of the editorial pass, and it
// is the only honest thing to print about a scaffold nobody has rewritten yet.
const passages = [];
for(const d of kept){
  for(const s of missions[d - 1].stops ?? []){
    for(const [what, text] of [['scene', s.scene], ['why', s.why], ['answerText', s.answerText]]){
      if(typeof text === 'string' && text.split(/\s+/).length >= 12) passages.push({ what, text, title: s.title });
    }
  }
}
const graded = passages.map(p => ({ ...p, fk: fleschKincaid(p.text) }));
const over = graded.filter(p => p.fk > GRADE);
const hard = graded.filter(p => p.fk > GRADE + 2);
const mean = graded.length ? graded.reduce((n, p) => n + p.fk, 0) / graded.length : 0;

console.log(`
${edition}: ${kept.length} days, ${kept.reduce((n, d) => n + (missions[d - 1].stops ?? []).length, 0)} stops.

  claims stripped        ${stripped} \`concept\`/\`takesAsRead\` line(s) — they named the base
                         theme's syllabus, and this edition has its own list
  reading level now      ${mean.toFixed(1)} mean, against a target of ${GRADE}
  passages to rewrite    ${over.length} of ${graded.length} above grade ${GRADE}, ${hard.length} of them hard failures
  delivery               the base's, copied whole — ${kept.length} days now, so its piece list is
                         the wrong length until you rewrite it. \`delivery.mjs\` says so.

That is the work list, not a fault in the scaffold — the days carry the base
game's own words until an editorial pass replaces them.

  npm run check ${edition}
  npm run export-stops ${edition}     then books/GRADE6_BRIEF.md and the sheet\n`);
