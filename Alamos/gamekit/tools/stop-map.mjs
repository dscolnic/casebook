// stop-map.mjs — resolve each stop's `at:` fixture against a theme's real world.
//
//   node tools/stop-map.mjs <bible.md> <theme>              report
//   node tools/stop-map.mjs <bible.md> <theme> --patch <dir>  fill the fragments in
//
// PHASE 0, THE MECHANICAL HALF. A bible says where a stop is asked — "at the
// compressor log desk", "asked by Herrera at the store scales", "at `ledger`" —
// and the book needs the fixture id the world actually registers. Sixty of those
// by hand is sixty chances to write `conv-board` where the fixture is `unit-board`,
// and the failure is silent: `sitedAt` returns null, the stop is asked at home,
// and the player is sent to the wrong room.
//
// WHAT IT DOES NOT DECIDE. `group:` — which curriculum area a stop teaches for —
// is not a place and cannot be read off one. Red Sand asks a KINET question at a
// fixture in the Atmosphere Intake because that is where the compressors are.
// The group comes from the stop's own concept, and this only proposes it.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readBible } from './bibleRead.mjs';
import { placeIndex, placeFor as sharedPlaceFor } from './placeMatch.mjs';

const args = process.argv.slice(2);
const file = args.find(a => /\.md$/i.test(a));
const theme = args.find(a => !a.startsWith('--') && !/\.md$/i.test(a));
const patchDir = args.includes('--patch') ? args[args.indexOf('--patch') + 1] : null;
if(!file || !theme){
  console.error('usage: node tools/stop-map.mjs <bible.md> <theme> [--patch <fragments dir>]');
  process.exit(2);
}

const bible = readBible(file);
const T = (await import(pathToFileURL(resolve(`themes/${theme}/theme.js`)).href)).default;
const fixtures = [];
for(const [place, list] of Object.entries(T.fixtures ?? {}))
  for(const f of list) fixtures.push({ id: f.id, place, name: f.name ?? '', caption: f.caption ?? '' });
const groups = (T.content?.GROUPS ?? []).map(g => g.id);
// ROSTER, not HISTORIC_CHARACTERS. The engine's `simulation.js` derives the
// second from the first; a theme's own content carries `ROSTER`, and reading the
// derived name off the manifest returned an empty list — so every person stop
// came back UNKNOWN while the cast was sitting right there.
// THE BIBLE'S CAST FIRST. An edition inherits the base game's roster, and these
// bibles bring their own people — Changeover's stops are asked by Lina Saye and
// Idris Pell, neither of whom the shipped game has ever heard of. Matching
// against the inherited roster left 64 person stops unresolvable. The bible's
// character bible is the roster this campaign is being built with; the theme's
// is what it is replacing.
const roster = [
  ...bible.cast.map(p => ({ id: p.id, name: p.name, division: null })),
  ...(T.content?.ROSTER ?? T.content?.HISTORIC_CHARACTERS ?? [])
    .map(p => ({ id: p.id, name: p.name, division: p.division })),
];

const words = (s) => String(s ?? '').toLowerCase().match(/[a-z]{3,}/g) ?? [];
const STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'asked', 'operated', 'decision', 'person',
  'room', 'fixture', 'calculation', 'board', 'desk', 'bench', 'station', 'panel', 'at', 'in', 'by']);

/**
 * Which fixture a placement line is naming.
 *
 * Three ways, strongest first: the id written outright (in backticks or bare),
 * then a fixture whose own name shares distinctive words with the line, then
 * nothing. `board`, `desk` and `bench` are deliberately not distinctive — a
 * campaign has a dozen of each and matching on them picks the first one.
 */
function fixtureFor(line){
  const l = String(line ?? '');
  const lower = l.toLowerCase();
  const byId = fixtures.filter(f => new RegExp(`\\b${f.id.replace(/[-]/g, '[- ]?')}\\b`, 'i').test(lower));
  if(byId.length === 1) return { fx: byId[0], how: 'named' };
  if(byId.length > 1) return { fx: byId[0], how: 'named (ambiguous)', also: byId.slice(1).map(f => f.id) };
  const cue = words(lower).filter(w => !STOP_WORDS.has(w));
  let best = null, bestScore = 0;
  for(const f of fixtures){
    const own = new Set([...words(f.id.replace(/-/g, ' ')), ...words(f.name)].filter(w => !STOP_WORDS.has(w)));
    const score = cue.filter(w => own.has(w)).length;
    if(score > bestScore){ bestScore = score; best = f; }
  }
  return bestScore >= 1 ? { fx: best, how: bestScore > 1 ? 'by name' : 'by one word' } : null;
}

/** Which person a placement line names, if it names one. */
function personFor(line){
  const lower = String(line ?? '').toLowerCase();
  if(!/asked (at|by)/.test(lower)) return null;
  for(const p of roster){
    const last = p.name.split(/\s+/).pop().toLowerCase();
    if(lower.includes(last) || lower.includes(p.name.toLowerCase())) return p;
  }
  return { id: null, name: null };
}

const rows = [];
for(const m of bible.missions) for(const s of m.stops){
  const hit = fixtureFor(s.placement);
  const who = personFor(s.placement);
  // A PERSON STOP GETS NO OBJECT. `syncFixtures` in engine/core/app.js skips
  // one outright — it is answered by finding the person, and standing a board
  // there puts up a card saying nothing is here. So a stop asked at somebody
  // with no fixture named is resolved, not unresolved.
  const personOnly = !!who && !hit && /decision\/person|asked (at|by)/i.test(s.placement ?? '');
  rows.push({ m: m.n, n: s.n, format: s.format, placement: s.placement ?? '',
    personOnly,
    at: hit?.fx.id ?? null, place: hit?.fx.place ?? null,
    how: hit?.how ?? (personOnly ? 'person stop, no fixture' : null),
    also: hit?.also ?? null,
    person: who && who.id ? who.id : (who ? 'UNKNOWN' : null),
    concept: s.concept ?? null });
}

const named = rows.filter(r => r.how === 'named').length;
const guessed = rows.filter(r => r.how && r.how !== 'named').length;
const none = rows.filter(r => !r.at && !r.personOnly);

// ---- what the bible declares that the world has not got yet
//
// A BIBLE NAMING A NEW OBJECT IS THE POINT, NOT A PROBLEM. It is the design
// source: a stop answered at a fit-board should get a fit-board built, rather
// than be repointed at whatever the room happens to contain. All the theme has
// to supply is `along` — where on the wall — because that is the one field about
// the room rather than about the object.
const have = new Set(fixtures.map(f => f.id));
const toBuild = (bible.fixtures ?? []).filter(f => !have.has(f.id));
if(args.includes('--new-fixtures')){
  if(!toBuild.length){ console.log(`themes/${theme}/fixtures.js already has every fixture the bible declares.`); process.exit(0); }
  console.log(`// ${toBuild.length} fixture(s) the bible declares that themes/${theme}/fixtures.js has not got.`);
  console.log('// Paste each under its place. `along` is -1 … 1 along the wall and is yours to choose;');
  console.log('// everything else is the bible\'s. See gamekit/INTERIORS.md before placing them.');
  const byPlace = new Map();
  for(const f of toBuild){
    const k = f.place || '(place not stated)';
    if(!byPlace.has(k)) byPlace.set(k, []);
    byPlace.get(k).push(f);
  }
  for(const [place, list] of byPlace){
    console.log(`\n  // ---- ${place}`);
    for(const f of list)
      console.log(`  { id: '${f.id}', name: '${(f.caption || f.id).split(/[.,]/)[0].trim().replace(/'/g, "\\'")}', `
        + `build: '${KIND(f.build)}', wall: 'back', along: 0,\n    caption: ${JSON.stringify(f.caption || '')} },`);
  }
  process.exit(0);
}
function KIND(k){ return ['vessel', 'rack', 'bench', 'board'].includes(String(k).toLowerCase()) ? String(k).toLowerCase() : 'board'; }

if(!patchDir){
  const w = Math.max(...rows.map(r => (r.at ?? '?').length));
  for(const r of rows){
    const flag = !r.at && !r.personOnly ? '✗' : (r.how === 'named' || r.personOnly) ? ' ' : '·';
    console.log(`  ${flag} M${String(r.m).padStart(2)} S${String(r.n).padStart(2)}  `
      + `${(r.at ?? '—').padEnd(w)}  ${(r.place ?? '').padEnd(7)} `
      + `${(r.person ?? '').padEnd(10)} ${r.how ?? 'no fixture found'}`
      + (r.also ? `  (also ${r.also.join(', ')})` : ''));
  }
  // A NAME THE WORLD HAS NOT GOT is a different problem from a vague one, and
  // the fix is in the theme rather than the book: either the fixture is added to
  // fixtures.js or the bible is pointed at one that exists.
  const known = new Set(fixtures.map(f => f.id));
  const wanted = new Set();
  // EVERY row with no fixture, person stop or not. A stop asked at somebody may
  // still name the object they are standing at — "asked by Herrera at
  // equil-stub" — and dropping that because the person branch caught the stop
  // loses the one piece of information the theme has to answer for.
  for(const r of rows.filter(x => !x.at))
    for(const w of (r.placement.match(/\b[a-z]+-[a-z-]+\b/g) ?? [])) if(!known.has(w)) wanted.add(w);
  console.log(`\n${rows.length} stop(s): ${named} name a fixture outright, ${guessed} matched by name, `
    + `${rows.filter(r => r.personOnly).length} are person stops with no fixture, ${none.length} unresolved.`);
  if(wanted.size) console.log(`Named but not in themes/${theme}/fixtures.js: ${[...wanted].join(', ')}`);
  console.log(`Places used: ${[...new Set(rows.map(r => r.place).filter(Boolean))].join(' ')}`);
  console.log(`Curriculum areas available for \`group:\`: ${groups.join(' ')}`);
  if(none.length) console.log(`\nUnresolved:\n${none.map(r => `  S${r.n}  ${r.placement.slice(0, 78)}`).join('\n')}`);
  process.exit(0);
}

/**
 * Which place a beat's heading names.
 *
 * The bible writes an arrival beat as `**Beat 1 - Arrival \| Plant Control \|
 * automatic…**`, and the book needs the place id — GIBBS. The site knows both:
 * every building carries an id and the name printed on it.
 */
const placeIdx = placeIndex(T);
const placeFor = (where) => sharedPlaceFor(where, placeIdx);

// ---- patch the fragments
let filled = 0, left = 0, rooms = 0, dropped = 0;
for(const f of readdirSync(patchDir).filter(x => /^m\d+\.ya?ml$/i.test(x))){
  const p = resolve(patchDir, f);
  const lines = readFileSync(p, 'utf8').split('\n');
  let stop = null;
  for(let i = 0; i < lines.length; i++){
    const head = lines[i].match(/^  # --- Stop (\d+):/);
    if(head){ stop = rows.find(r => r.n === +head[1]); continue; }
    if(!stop) continue;
    if(/^    at: TODO/.test(lines[i])){
      if(stop.at){ lines[i] = `    at: ${stop.at}`; filled++; }
      // A PERSON STOP NEEDS NO `at:` AT ALL, so the line goes rather than
      // staying as a TODO nobody can close: there is no fixture to name.
      else if(stop.personOnly){ lines[i] = null; dropped++; }
      else left++;
    }
    if(/^    person: TODO/.test(lines[i]) && stop.person && stop.person !== 'UNKNOWN'){
      lines[i] = `    person: ${stop.person}`;
    }
  }
  // Arrival beats, whose room the extractor already wrote out as the comment
  // directly above the trigger it could not fill in.
  for(let i = 1; i < lines.length; i++){
    if(!/^    on: \{ enter: true, at: TODO \}/.test(lines[i])) continue;
    // THE `on:` LINE'S OWN COMMENT FIRST. The extractor already worked out which
    // room the heading names — including the newer `On arrival at <PLACE>` form,
    // where the room is inside the first segment — and wrote it there. Reading
    // the heading's second segment instead handed "automatic" to the place
    // matcher for six campaigns and left 335 arrival beats unplaced.
    let where = (lines[i].match(/#\s*(.+?)\s*$/) ?? [])[1]
      ?? (lines[i - 1].match(/^    # [^|]*\|([^|]*)\|/) ?? [])[1];
    // "Plant Control to Tank Farm" is a journey, and the beat fires at the end
    // of it. Take the destination.
    if(where && / to /i.test(where)) where = where.split(/ to /i).pop();
    const id = placeFor(where);
    if(id){ lines[i] = `    on: { enter: true, at: ${id} }`; rooms++; }
  }
  writeFileSync(p, lines.filter(l => l !== null).join('\n'));
}
console.log(`patched ${patchDir}: ${filled} fixture(s) filled in, ${rooms} arrival room(s), `
  + `${dropped} person stop(s) needed none, ${left} still TODO.`);
console.log('`group:` is left alone everywhere — see the note at the top of this file.');
