// build-fixtures.mjs — write a theme's fixtures.js from the bible's own table.
//
//   node tools/build-fixtures.mjs <bible.md> <theme> [--write]
//
// A bible declares the objects its stops are asked at — id, the place it stands
// in, what kind of thing it is, and the caption a player reads on it. Four of
// the five fields a fixture needs. The fifth is `along`, where on the wall it
// sits, which is about the room rather than the object and so is the theme's.
//
// WHY `along` IS SPREAD RATHER THAN CENTRED. Every fixture at 0 stacks them on
// top of each other in the middle of the back wall, which renders as one object
// and reads as a bug. They are dealt along the three walls in turn, which is a
// starting arrangement to look at with `npm run shots` and move, not a final
// one — see gamekit/INTERIORS.md, whose whole subject is that a room has to be
// looked at rather than reasoned about.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';

const args = process.argv.slice(2);
const [file, theme] = args.filter(a => !a.startsWith('--'));
const write = args.includes('--write');
if(!file || !theme){ console.error('usage: node tools/build-fixtures.mjs <bible.md> <theme> [--write]'); process.exit(2); }

const T = (await import(pathToFileURL(resolve(`themes/${theme}/theme.js`)).href)).default;
const bible = readBible(file);

// Bible place name -> the theme's own id for it, by the same significant-word
// match `tools/stop-groups.mjs` uses, so the two cannot disagree about which
// room is which.
const FILLER = new Set(['the', 'and', 'of', 'room', 'office', 'desk', 'board', 'bay',
  'house', 'yard', 'station', 'area', 'control', 'centre', 'center']);
// Stemmed, for the same reason tools/stop-groups.mjs is: one room, two spellings.
// Strip the plural `s` and nothing else. Stripping `es` turned `gates` into
// `gat` while `gate` stayed `gate`, so a room literally named Gate House did
// not match the Gates area — the stemmer created the mismatch it was added to
// remove. `ss` is left alone so `press` does not become `pres`.
const stemOf = (w) => w.replace(/ies$/, 'y').replace(/([^s])s$/, '$1');
const sig = (x) => new Set((String(x).toLowerCase().match(/[a-z]{3,}/g) ?? [])
  .filter(w => !FILLER.has(w)).map(stemOf));
const known = new Map();
for(const g of T.content?.GROUPS ?? []) known.set(g.id, `${g.id} ${g.name ?? ''}`);
for(const b of T.site?.buildings ?? []) if(!known.has(b.id)) known.set(b.id, `${b.id} ${b.name ?? ''}`);

const NEW = [];
// "the Monitors' Room" and "Monitors' Room" are one room. A leading article and
// the punctuation around a possessive are not part of a place's identity, and
// leaving them in produced two ids for one place and `THEADJUD` for another.
const tidy = (x) => String(x ?? '').toLowerCase()
  .replace(/^the\s+/, '').replace(/[^a-z0-9 &]/g, '').replace(/\s+/g, ' ').trim();

function idFor(place){
  const k = tidy(place);
  if(!k) return null;
  for(const [id, label] of known) if(tidy(label).includes(k) || k.includes(id.toLowerCase())) return id;
  const want = sig(k);
  let best = null, score = 0;
  for(const [id, label] of known){
    const n = [...sig(label)].filter(w => want.has(w)).length;
    if(n > score){ score = n; best = id; }
  }
  if(best) return best;
  // A place the theme has not got. The campaign is allowed to add one; it is
  // reported so it is a decision somebody made rather than a silent new key.
  // The id is built from the significant words, so "Kit Warehouse & Cold Room"
  // is KITWARE rather than THEKITWA.
  // "the Kit Warehouse" and "the Kit Warehouse & Cold Room" are one room named
  // twice. One tidied name starting with the other is the same place.
  const seen = NEW.find(x => {
    const t = tidy(x.name);
    return t === k || t.startsWith(k + ' ') || k.startsWith(t + ' ');
  });
  if(seen) return seen.id;
  const words = [...sig(k)];
  let made = (words.length > 1
    ? words.map(w => w.slice(0, 4)).join('').toUpperCase()
    : (words[0] ?? k).toUpperCase()).replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'NEW';
  while(NEW.some(x => x.id === made) || known.has(made)) made = made.slice(0, 7) + '2';
  NEW.push({ id: made, name: place });
  return made;
}

const byPlace = new Map();
for(const f of bible.fixtures){
  const id = idFor(f.place);
  if(!byPlace.has(id)) byPlace.set(id, []);
  byPlace.get(id).push(f);
}

const WALLS = ['back', 'left', 'right'];
const ALONG = [0, -0.45, 0.45, -0.2, 0.2, -0.7, 0.7];
const KIND = (k) => ['vessel', 'rack', 'bench', 'board'].includes(String(k).toLowerCase())
  ? String(k).toLowerCase() : 'board';
const esc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const nameOf = (f) => {
  const first = String(f.caption ?? '').split(/[.,;]/)[0].trim();
  return first.length >= 4 && first.length <= 46 ? first : f.id.replace(/-/g, ' ');
};

const out = [];
out.push(`// fixtures.js — the objects the questions are about, for ${T.title ?? theme}.`);
out.push('//');
out.push('// GENERATED from the campaign bible by tools/build-fixtures.mjs. Every id, place,');
out.push('// kind and caption is the bible\'s; `wall` and `along` are this file\'s, because');
out.push('// they are about the room rather than the object. Look at them with');
out.push('// `npm run shots` before believing the arrangement — see gamekit/INTERIORS.md.');
out.push('//');
out.push("//   build:  'vessel' | 'rack' | 'bench' | 'board'");
out.push("//   wall:   'left' | 'right' | 'back'");
out.push('//   along:  -1 … 1 along that wall. 0 is the middle.');
out.push('export const FIXTURES = {');
for(const [place, list] of byPlace){
  out.push(`  ${place}: [`);
  list.forEach((f, i) => {
    out.push(`    { id: '${esc(f.id)}', name: '${esc(nameOf(f))}', build: '${KIND(f.build)}', `
      + `wall: '${WALLS[i % WALLS.length]}', along: ${ALONG[Math.floor(i / WALLS.length) % ALONG.length]},`);
    out.push(`      caption: ${JSON.stringify(f.caption || '')} },`);
  });
  out.push('  ],');
}
out.push('};');
const text = out.join('\n') + '\n';

if(NEW.length){
  console.log(`${NEW.length} place(s) the theme has not got, keyed as new areas:`);
  for(const n of NEW) console.log(`  ${n.id.padEnd(9)} ${n.name}`);
}
console.log(`${bible.fixtures.length} fixture(s) across ${byPlace.size} place(s).`);
if(write){
  writeFileSync(resolve(`themes/${theme}/fixtures.js`), text);
  console.log(`written to themes/${theme}/fixtures.js`);
  // AND WIRED IN. A theme that never used the `at:` mechanism has no `fixtures`
  // key in its manifest and does not import the file at all — The Trial and
  // Changeover are both like that. Writing fixtures.js for one of those is
  // writing a file nothing reads: `sitedAt` finds nothing, every stop is asked
  // at the case stand, and the only symptom is that the map sends the player to
  // the wrong room. So the manifest is edited too, once, if it needs it.
  const mf = resolve(`themes/${theme}/theme.js`);
  let m = readFileSync(mf, 'utf8');
  if(!/\bFIXTURES\b/.test(m)){
    m = m.replace(/^(import .*from '\.\/interiors\.js';)$/m,
      "$1\nimport { FIXTURES } from './fixtures.js';");
    if(!/\bFIXTURES\b/.test(m))
      m = m.replace(/^(import .*\n)(?![\s\S]*^import )/m, "$1import { FIXTURES } from './fixtures.js';\n");
    m = m.replace(/^(\s*)interiors: INTERIORS,$/m,
      "$1interiors: INTERIORS,\n$1// The objects a question is asked AT, declared by the campaign bible.\n$1fixtures: FIXTURES,");
    if(!/fixtures: FIXTURES/.test(m))
      m = m.replace(/^(export default \{\n)/m, "$1  fixtures: FIXTURES,\n");
    writeFileSync(mf, m);
    console.log(`  and wired into themes/${theme}/theme.js, which had no fixtures key`);
  }
} else {
  console.log('(dry run — pass --write)');
}
