// build-head.mjs — the campaign-wide half of a book, for an edition.
//
//   node tools/build-head.mjs <bible.md> <theme> <base book.yml>
//
// A book is a head and fifteen missions. The missions come out of the bible by
// `tools/v10extract.mjs`; the head is everything that is campaign-wide rather
// than per mission — the theme block, the areas, the roster, the glossary, the
// rooms a beat may fire in, the interiors and the place copy — and it is written
// ONCE, before anybody splits the missions up. Two people each adding a glossary
// entry for one term is that term defined twice.
//
// What comes from where:
//   · the base book   the theme block, groups, roster, beatRooms, interiors, copy
//   · the bible       the glossary, in full, from every mission's Worth-knowing-first
//
// The roster deliberately stays the base game's for now: an edition inherits the
// place and the cast it is built on, and the bible's own cast is a separate
// decision — see `readBible().cast`, which is what resolves the person stops.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';
import { placeIndex, placeFor } from './placeMatch.mjs';

const [file, theme, base] = process.argv.slice(2);
if(!file || !theme || !base){
  console.error('usage: node tools/build-head.mjs <bible.md> <theme> <base book.yml>');
  process.exit(2);
}

const themeManifest = (await import(pathToFileURL(resolve(`themes/${theme}/theme.js`)).href)).default;
const src = readFileSync(base, 'utf8');
const at = src.indexOf('\nmissions:');
if(at < 0){ console.error(`${base} has no missions: section`); process.exit(2); }

// Everything before `missions:`, and everything after the last mission — the
// interiors and the place copy, which sit at the end of every book in this repo.
const before = src.slice(0, at);
const tailAt = Math.max(src.lastIndexOf('\ninteriors:'), src.lastIndexOf('\ncopy:'));
const after = tailAt > at ? src.slice(tailAt) : '';

// The glossary, whole, out of the bible.
const gloss = execFileSync(process.execPath,
  [resolve(dirname(new URL(import.meta.url).pathname), 'v10extract.mjs'), file, '--head'],
  { encoding: 'utf8' }).split('# ------------------------------------------- for tools/syllabus.js EQUATIONS')[0].trimEnd();

// The base's own glossary goes; the bible's replaces it.
const head = before.replace(/\nglossary:[\s\S]*?(?=\n[a-z][A-Za-z]*:)/, '\n' + gloss + '\n');

// ---- the cast, and the areas it works in
//
// AN EDITION INHERITS THE BASE GAME'S PEOPLE AND THE BIBLE BRINGS ITS OWN.
// Headwater's stops are asked by Mara Vale and Imani Okoro; the shipped game's
// roster has never heard of either, so 102 of its 400 import problems were the
// same sentence about a person who is not on the roster. The bible's character
// bible IS this campaign's cast — see `readBible().cast` — so it replaces the
// inherited one.
//
// A person's `division` is the area they are most often asked in, counted from
// the stops themselves. That is a fact about the campaign rather than a guess:
// somebody who answers nine questions in the Gate House works in the Gate House.
const bible = readBible(file);
const areaOf = new Map();
const placeIdx = null;
const tally = new Map();
for(const m of bible.missions) for(const st of m.stops){
  const who = (st.placement ?? '').match(/asked (?:at|by) ([A-Z][\p{L}'.\- ]+?)(?:\s+(?:beside|at|in|with)\b|[,.]|$)/u);
  if(!who || !st.area) continue;
  const person = bible.cast.find(c => who[1].includes(c.name) || c.name.includes(who[1].trim()));
  if(!person) continue;
  const key = `${person.id}|${st.area}`;
  tally.set(key, (tally.get(key) ?? 0) + 1);
}
for(const [key, n] of tally){
  const [id, area] = key.split('|');
  const best = areaOf.get(id);
  if(!best || n > best.n) areaOf.set(id, { area, n });
}

// The groups the head already declares, and the ids the areas resolve to.
// The base books indent their group items and this pattern did not, so the list
// came back EMPTY: every area was then "missing" and re-declared beside the one
// already there, and the roster's fallback fell through to a literal that seven
// themes do not have. Both halves were the same two characters of whitespace.
const declaredIds = [...head.matchAll(/^\s*- id: (\w+)\s*$/gm)].map(m => m[1]);
if(!declaredIds.length){
  console.error(`${base} declares no groups this parser can see — refusing to guess a division`
    + ' for the roster. Fix the pattern above rather than letting it fall through.');
  process.exit(2);
}
const idx = placeIndex(themeManifest);
const areaId = (a) => placeFor(a, idx);

const usedAreas = [...new Set(bible.missions.flatMap(m => m.stops).map(s => s.area).filter(Boolean))];
const missing = usedAreas
  .map(a => ({ a, id: areaId(a) }))
  .filter(x => x.id && !declaredIds.includes(x.id));

// The base book's own indentation, because a `- id:` at column zero in front of
// a list indented by two is not another item in that list — it is a list holding
// that list, and every group under it stops being a group. Seven ids that were
// plainly in the file came back as "unknown group".
const groupIndent = (head.match(/^groups:\n(\s*)- id: /m) ?? [, ''])[1];
const ind = (text) => text.split('\n').map(l => l ? groupIndent + l : l).join('\n');

let groupsAdded = '';
for(const { a, id } of missing){
  // A room being promoted to an area of study. The name is the bible's, the
  // description is the bible's own line for the place where it has one, and the
  // milestones are deliberately generic — they are a progress label, not copy.
  groupsAdded += ind(`- id: ${id}\n  code: ${id}\n  name: ${a}\n  color: '#6b7f8a'\n`
    + `  desc: ${JSON.stringify(`Where the campaign's ${a.toLowerCase()} work is done.`)}\n`
    + `  milestones: [Open the room, Read what it holds, Settle the question, Hand it on]\n`);
}

let head2 = head;
if(groupsAdded){
  head2 = head2.replace(/^groups:\n/m, `groups:\n${groupsAdded}`);
}

// The roster: the bible's cast, each in the area they are most often asked in.
// Never a literal. A default area invented here is an area the theme may not
// have, and the importer's complaint then names a group nobody wrote.
const fallbackArea = declaredIds[0];
const rosterYaml = 'roster:\n' + bible.cast.map(p => {
  const div = areaId(areaOf.get(p.id)?.area ?? '') ?? fallbackArea;
  return `- id: ${p.id}\n  name: ${JSON.stringify(p.name)}\n  role: ${JSON.stringify(p.role)}\n`
    + `  division: ${div}\n  bio: |\n    ${p.name} is ${p.role}. `
    + `The campaign bible carries the full character note; this line is the stub the importer needs `
    + `and is the one thing on this page a reader should replace with the bible's own words.\n`;
}).join('');
head2 = head2.replace(/^roster:\n[\s\S]*?(?=\n[a-z][A-Za-z]*:)/m, rosterYaml.trimEnd() + '\n');

// `beatRooms:` — the minor rooms a beat may fire in. An arrival beat in the
// Atmosphere Intake is where most of these missions actually happen, and the
// Intake is a room rather than an area of study, so the importer refuses it
// unless the head says so. The list is read off the fragments the extractor
// already wrote: every room a beat enters that is not a declared group.
const fragDir = resolve(`books/parts/${theme}`);
const rooms = new Set();
if(existsSync(fragDir)){
  for(const f of readdirSync(fragDir).filter(x => /^m\d+\.ya?ml$/i.test(x))){
    for(const m of readFileSync(resolve(fragDir, f), 'utf8')
      .matchAll(/^\s*on: \{[^}]*\bat: ([A-Z][A-Z0-9_]*)/gm)) rooms.add(m[1]);
  }
}
const groupsNow = new Set([...head2.matchAll(/^\s*- id: (\w+)\s*$/gm)].map(m => m[1]));
const extraRooms = [...rooms].filter(r => !groupsNow.has(r)).sort();
if(extraRooms.length){
  head2 = /^beatRooms:/m.test(head2)
    ? head2.replace(/^beatRooms:.*$/m, `beatRooms: [${extraRooms.join(', ')}]`)
    : head2.trimEnd() + `\n\nbeatRooms: [${extraRooms.join(', ')}]\n`;
}

const out = `${head2.trimEnd()}\n\nmissions:\n# <<< MISSIONS >>>\n${after}`;
const dest = resolve(`books/parts/${theme}/_book.yml`);
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, out);
console.log(`${theme}: head written — ${(gloss.match(/^- name:/gm) ?? []).length} glossary terms from the bible, `
  + `everything else from ${base}`);
