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
/**
 * THE BLOCKS THAT BELONG TO THE PLACE, each taken on its own.
 *
 * `interiors:` (what is in each room), `copy:` (what each place says) and
 * `warmups:` (the runs around the site) describe the ground, which is exactly
 * what a re-authored campaign inherits. `lessons:` does not: those are the
 * previous campaign's review stops, with its own cast and its own concept
 * names.
 *
 * Read as "everything from the last of them to the end of the file" — which is
 * what this was — the result depends entirely on the base book's key order.
 * Overwind's runs interiors, warmups, copy, lessons: the tail started at `copy:`
 * and so DROPPED the interiors and the warm-ups it was written to carry and
 * PICKED UP twelve review stops it was not, four of which the import then
 * refused for naming concepts that are not on the new campaign's syllabus.
 */
const blockOf = (key) => {
  const from = src.indexOf(`\n${key}:`);
  if(from < at) return '';
  const rest = src.slice(from + 1);
  const next = /\n[a-z][A-Za-z]*:/.exec(rest);
  return '\n' + (next ? rest.slice(0, next.index + 1) : rest).trimEnd() + '\n';
};
const after = ['interiors', 'warmups', 'copy'].map(blockOf).filter(Boolean).join('');

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
/**
 * A GROUP THIS EDITION ADDED IS STILL A GROUP. `declaredIds` is read off the
 * BASE book, before the loop above adds the areas this campaign uses and the
 * base does not have — so a person whose role names one of those, "WORKSHOP
 * reliability engineer", could not be placed in it and fell through to the
 * tally. Safety Factor's workshop and ship were left empty by exactly that,
 * with somebody on the roster naming one of them outright.
 */
for(const { id } of missing) if(!declaredIds.includes(id)) declaredIds.push(id);

// The roster: the bible's cast, each in the area they are most often asked in.
// Never a literal. A default area invented here is an area the theme may not
// have, and the importer's complaint then names a group nobody wrote.
const fallbackArea = declaredIds[0];

/**
 * Where somebody works, when the stops never said.
 *
 * The tally above is the honest answer and it only covers people the placement
 * line names — "asked at X by Y". Everyone else fell through to `declaredIds[0]`,
 * which is not a default so much as an assertion: it put five of Vellan's nine
 * people in the Harbour Office, including the waterworks technician, the turbine
 * mechanic, the tip lead and the agronomist. Four of the island's seven groups
 * then had nobody on the roster and their person stops were unreachable, and the
 * complaint the importer printed was about the roster rather than about this.
 *
 * The bible already says where these people work; it says it in their ROLE.
 * "Waterworks technician", "Turbine and diesel mechanic", "Reef ecologist" —
 * each names its own area in the campaign's own words, and the theme's group and
 * building names are the other half of the match. So: score the role text
 * against every area's names, take a word of four letters or more, and require a
 * single winner. Anything short is a stopword here — "the", "and", "lead",
 * "yard" and "office" are in half the names on any site.
 */
const areaWords = new Map();
for(const [name, id] of idx.byName){
  // `declaredIds` and not `idx.areas`: the head declares any area the stops use,
  // including one the manifest keeps as a landmark rather than a group, and a
  // person can be posted to it. Requiring both dropped the chapel.
  if(!declaredIds.includes(id)) continue;
  // THREE, matching the role side. At four the word "Tip" is not extracted from
  // "Tip and Sorting Yard" — so the one area on Vellan whose name is three
  // letters long could not be matched by the very person who runs it, and the
  // role side was lowered without lowering this one. Both halves or neither.
  const words = String(name).toLowerCase().match(/[a-z]{3,}/g) ?? [];
  if(!areaWords.has(id)) areaWords.set(id, new Set());
  for(const w of words) areaWords.get(id).add(w);
}
/**
 * Words that name half the buildings on any site, and the small change of
 * English. Three letters is the floor because a real area is called the Tip.
 */
const NOISE = new Set(['office', 'yard', 'station', 'room', 'hall', 'house', 'base',
  'control', 'centre', 'center', 'floor', 'bay', 'shed', 'store', 'lead', 'team',
  'the', 'and', 'for', 'its', 'all', 'new', 'old', 'one', 'two', 'per', 'off',
  'out', 'set', 'top', 'end', 'use', 'day', 'lab', 'run', 'own']);
function areaFromRole(role){
  const said = new Set((String(role ?? '').toLowerCase().match(/[a-z]{3,}/g) ?? []));
  /**
   * A ROLE MAY NAME ITS GROUP OUTRIGHT, and when it does that is the answer.
   *
   * The word match reads a person's role against each area's NAME, which works
   * while the two share English — "waterworks technician" belongs in the
   * Waterworks. It cannot see "NOTES counter operations lead", because the Note
   * Room's name is "Note Room" and "notes" is not "note"; and where the words do
   * reach two areas at once — "price statistics lead" is both the Price Room and
   * the Statistics Floor — the tie rule correctly refuses to guess and the
   * fallback puts the person somewhere else entirely.
   *
   * A declared group id written in the role is neither of those. It is the
   * author saying which group, in the id the book itself uses, and it is checked
   * against `declaredIds` so a word that merely looks like an id cannot claim
   * one. Read as a PREFIX first, because that is where it is written and because
   * the rest of a role is ordinary English that may collide with another id:
   * "NOTES counter operations lead" carries both `NOTES` and `COUNTER`, and only
   * the position tells them apart. An id elsewhere still counts when it is the
   * only one; two of them anywhere but the front is an author who has not
   * decided, and falls through to the words below rather than taking one.
   */
  const lead = (String(role ?? '').trim().match(/^[A-Za-z_][A-Za-z0-9_]*/) ?? [''])[0].toLowerCase();
  const first = declaredIds.find(id => String(id).toLowerCase() === lead);
  if(first) return first;
  const named = declaredIds.filter(id => said.has(String(id).toLowerCase()));
  if(named.length === 1) return named[0];
  const hits = [];
  for(const [id, words] of areaWords){
    let n = 0;
    for(const w of words) if(!NOISE.has(w) && said.has(w)) n++;
    if(n) hits.push({ id, n });
  }
  hits.sort((a, b) => b.n - a.n);
  // A single winner, or nothing. Two areas tied on one word each is exactly the
  // case this must not resolve, because it would be `declaredIds[0]` again with
  // more steps.
  if(!hits.length || (hits[1] && hits[1].n === hits[0].n)) return null;
  return hits[0].id;
}

/**
 * THE ROLE WINS, AND THE TALLY IS THE FALLBACK. This was the other way round.
 *
 * The tally counts where somebody is ASKED, and the comment above defends that
 * as a fact rather than a guess. It is a fact — about the wrong question. A
 * person may be asked anywhere: the whole placement pass exists because a
 * question belongs where the equipment is, not where its owner sits, and Red
 * Sand deliberately asks the Catalyst Bay's chemist a question at the intake.
 * Run on Vellan, the tally put the WATERWORKS TECHNICIAN in the chapel, the
 * harbour lead in the chapel, and the agronomist on the reef — because that is
 * where the council meets and where the samples are read. Four of the island's
 * seven groups were left with nobody, and every person stop in them was
 * unreachable.
 *
 * `division` is not "where were you asked". It is where this person works: it
 * decides where they stand in the world, and which group's person stops they
 * can answer. The bible states it outright in the role — "Waterworks
 * technician", "Turbine and diesel mechanic", "Reef ecologist" — so that is read
 * first, and the tally is what settles anybody whose role names no area.
 */
const guessed = [], thin = [];
const rosterYaml = 'roster:\n' + bible.cast.map(p => {
  // THE BIBLE'S OWN WORD FIRST. Changeover states `Division: NOTES` under five
  // of its eight people, which is the author saying where somebody works rather
  // than this file reading it out of their job title. Checked against the
  // declared groups, so a division naming a group the book does not have falls
  // through to the reading below instead of writing a group nobody built.
  // A PERSON MAY OWN MORE THAN ONE AREA. Wildtype's geneticist writes
  // `**Area ownership:** SEED, GENE.` — one person, two rooms — and compared
  // whole that matched no group at all, so she was posted to whichever area the
  // BASE game happened to have and both of hers were reported as having nobody
  // on the roster. Each named area is tried; the first the book declares is
  // where she stands, which is what `division` means.
  const said = String(p.division ?? '').trim().toUpperCase();
  const stated = declaredIds.find(id => String(id).toUpperCase() === said)
    ?? said.split(/[,/;]|\band\b/).map(x => x.trim()).filter(Boolean)
      .map(x => declaredIds.find(id => String(id).toUpperCase() === x)).find(Boolean);
  const fromRole = stated ?? areaFromRole(p.role);
  const counted = areaId(areaOf.get(p.id)?.area ?? '');
  const div = fromRole ?? counted ?? fallbackArea;
  if(!fromRole && !counted) guessed.push(p.name);

  /**
   * THE BIO IS THE BIBLE'S, and used not to be. This wrote a stub whose own
   * last sentence said it was one — "the one thing on this page a reader should
   * replace with the bible's own words" — and nobody ever did, so eight
   * campaigns shipped a cast of placeholder sentences.
   *
   * Every bible writes the same four things about each person: what they want,
   * the blind spot they start with and the arc off it, a line they keep saying,
   * and their pronouns. They are taken as written, in that order, and joined
   * into paragraphs. Nothing is composed here beyond the sentence that names
   * the job, because the job is a heading in the bible rather than a sentence.
   */
  const bits = [];
  bits.push(`${p.name} is ${String(p.role).replace(/^[A-Z][A-Z0-9_]+\s+/, '')}.`);
  const end = (x) => `${x.trim()}${/[.?!]$/.test(x.trim()) ? '' : '.'}`;
  if(p.wants) bits.push(end(`Wants ${p.wants.charAt(0).toLowerCase()}${p.wants.slice(1)}`));
  if(p.arc) bits.push(end(p.arc));
  // A habit is usually a quoted question, so the full stop is only added when
  // the line does not already end in its own punctuation: `Says, "What came
  // over the rail?".` is a sentence with two ends.
  if(p.habit){
    const said = p.habit.trim();
    bits.push(`Says, ${said}${/[.?!]["'\u201d\u2019]?$/.test(said) ? '' : '.'}`);
  }
  const bio = bits.join(' ');
  if(!p.wants && !p.arc) thin.push(p.name);

  return `- id: ${p.id}\n  name: ${JSON.stringify(p.name)}\n  role: ${JSON.stringify(p.role)}\n`
    + `  division: ${div}\n`
    + (p.pronouns ? `  pronouns: ${JSON.stringify(p.pronouns)}\n` : '')
    + `  bio: |\n    ${bio}\n`;
}).join('');
// A person the bible says nothing about beyond their job. Named rather than
// papered over: the bio is then one sentence, which is visibly thinner than
// the rest of the cast on the same screen.
if(thin.length){
  console.error(`  ${thin.length} of ${bible.cast.length} on the roster have no \`Wants\` or arc in the`
    + ` bible, so their bio is the job title alone: ${thin.join(', ')}`);
}
// Say who could not be placed. Silence here is what let five people pile into
// one building for as long as nobody counted them.
if(guessed.length){
  console.error(`  ${guessed.length} of ${bible.cast.length} on the roster could not be placed from a`
    + ` stop or from their own role, and are in "${fallbackArea}" because something had to be`
    + ` chosen: ${guessed.join(', ')}`);
}
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
