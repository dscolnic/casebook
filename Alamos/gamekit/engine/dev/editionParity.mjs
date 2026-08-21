// editionParity.mjs — an edition changed the course, and nothing else.
//
//   node engine/dev/editionParity.mjs <theme>      # silent for a theme that is not an edition
//   node engine/dev/editionParity.mjs --all
//
// A middle-school edition is the same game taught to a different audience: the
// same ridge, the same twelve people, the same argument between Rossi and
// Ellery, and a course a sixth grader can actually learn. Everything about that
// sentence is enforceable except the last clause, and this enforces it.
//
// WHY IT HAS TO BE A CHECK. Every pressure on an edition pushes the same way.
// A day is hard to rewrite at grade 6, so drop the group. A person's bio is
// long, so cut the person. A stop is easier to set somewhere else, so move it.
// Each of those is one reasonable decision, and four of them in a row leave two
// games that share a name and nothing else — at which point the edition is a
// fork, and the whole argument for editions (one place, built once, checked
// once, screenshotted once) is gone.
//
// So: the areas, the cast, the places and the manifest's own description of the
// world are compared against the base theme, and the game fails for a
// difference. What is deliberately NOT compared is every sentence, every
// question, every format and the number of days — that is the edition.
//
// What it cannot check: whether both sides of the campaign argument still win a
// day (STORY_SPEC.md §1). Days are dropped here, and the day somebody was right
// on is exactly the kind of thing that gets dropped. It is printed as a note
// with the base game's argument beside it, and it is on a person to read.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { themeDir, themeNames, editionBase } from './registry.mjs';
import { SYLLABUS } from '../../tools/syllabus.js';

const args = process.argv.slice(2);
const wanted = args.includes('--all') || !args[0] ? themeNames() : [args[0]];

// The only files an edition's own directory may hold. Everything else about the
// place — props, interiors, outfits, the world, the viewpoints — belongs to the
// base theme and is imported across by the manifest.
const ALLOWED = new Set(['theme.js', 'site.js', 'plan.js', 'world.js', 'content']);
const SHIM = /^\s*export \* from '\.\.\/[\w-]+\/[\w.-]+';\s*$/m;

let failed = 0;

for(const name of wanted){
  const base = editionBase(name);
  if(!base) continue;                       // not an edition: nothing to say

  const problems = [];
  const notes = [];
  const fail = (m) => problems.push(m);
  const note = (m) => notes.push(m);

  const dir = themeDir(name);
  const baseDir = themeDir(base);

  // ------------------------------------------------------------ the directory
  for(const f of readdirSync(dir)){
    if(f.startsWith('.')) continue;
    if(!ALLOWED.has(f)){
      fail(`themes/${name}/${f} — an edition owns a manifest and its content. ` +
           `Anything else here is a fork of the place`);
      continue;
    }
    if(f === 'content' || f === 'theme.js') continue;
    const src = readFileSync(resolve(dir, f), 'utf8');
    if(!SHIM.test(src)){
      fail(`themes/${name}/${f} is not a re-export of themes/${base}/${f} — ` +
           `two copies of a place drift, and only one of them gets the next fix`);
    }
  }
  const contentPath = resolve(dir, 'content');
  try{ statSync(contentPath); }catch{ fail(`themes/${name}/content is missing — import the book`); }

  // ------------------------------------------------------------- the manifest
  const load = async (d) => (await import(pathToFileURL(resolve(d, 'theme.js')).href + `?t=${Date.now()}`)).default;
  let mine, theirs;
  try{
    mine = await load(dir);
    theirs = await load(baseDir);
  }catch(err){
    console.log(`\n✗ ${name}: neither manifest could be loaded — ${err.message}`);
    failed++;
    continue;
  }

  if(mine.id === theirs.id){
    fail(`both editions declare id "${mine.id}" — the save slot is ` +
         `gamekit_<id>_v1, so they would share a campaign`);
  }
  // A *rewrite* is the one honest same-grade edition: the same course, the same
  // reader, the questions re-authored from scratch so the two can be compared.
  // It has to be declared in the manifest and it has to say why, because the
  // failure this rule exists to catch — an edition nobody rewrote for anybody —
  // looks identical from here and would otherwise be waved through by anyone
  // who found the flag before reading the rule.
  //
  //   // same-grade-rewrite: a second authoring of the same course, for comparison
  //
  // Everything else on this page still applies: the place, the cast and the
  // areas are the base game's, and only the course may move.
  //
  // A *retarget* is the second honest same-grade edition, and it is not the one
  // above: the same place and the same reader, aimed at a DIFFERENT course. The
  // seven university games came from workplaces, and a workplace runs on the
  // professional layer of its subject — so the AP course a place could carry is
  // usually a subset of what the campaign teaches, plus two units it does not.
  // Declaring that as a `same-grade-rewrite` would make the marker lie in the
  // file whose whole job is to stop an unexplained copy, hence its own line:
  //
  //   // same-grade-retarget: AP Physics 2, where deepwatch is naval acoustics
  //
  // The two markers are mutually exclusive, and a retarget has to actually
  // retarget — the syllabus `course` is compared, because an edition claiming a
  // new course while sharing the old one's syllabus is the copy this rule is
  // for, wearing the exemption.
  const manifestText = readFileSync(resolve(dir, 'theme.js'), 'utf8');
  const rewriteWhy = /^\/\/\s*same-grade-rewrite:\s*(.+?)\s*$/m.exec(manifestText)?.[1];
  const retargetWhy = /^\/\/\s*same-grade-retarget:\s*(.+?)\s*$/m.exec(manifestText)?.[1];
  const sameGrade = Number(mine.audience?.grade) === Number(theirs.audience?.grade);
  if(rewriteWhy && retargetWhy){
    fail('declares both "same-grade-rewrite" and "same-grade-retarget" — it is ' +
         'one or the other: the same course authored twice, or a different course');
  }
  if(retargetWhy){
    const mineCourse = SYLLABUS[name]?.course ?? null;
    const baseCourse = SYLLABUS[base]?.course ?? null;
    if(!mineCourse){
      fail(`declares "same-grade-retarget" and has no syllabus block of its own in ` +
           `tools/syllabus.js — the new course is the whole of what this edition is`);
    }else if(mineCourse === baseCourse){
      fail(`declares "same-grade-retarget" and shares ${base}'s syllabus course line — ` +
           `an edition claiming a new course while teaching the old one is the copy ` +
           `this rule exists to catch`);
    }
  }
  if(sameGrade){
    if(!rewriteWhy && !retargetWhy){
      fail(`both editions declare grade ${mine.audience?.grade}: an edition that ` +
           `is not written for a different reader is a second copy of the game`);
    }else{
      note(`same grade as ${base}, declared: ${rewriteWhy ?? retargetWhy}`);
    }
  }else{
    for(const [flag, why] of [['same-grade-rewrite', rewriteWhy], ['same-grade-retarget', retargetWhy]]){
      if(why){
        fail(`declares "${flag}" and is written for a different reader ` +
             `(grade ${mine.audience?.grade} against ${theirs.audience?.grade}) — ` +
             `delete the line, it claims something that is not true of this edition`);
      }
    }
  }
  for(const k of ['title', 'dayNoun', 'stopNoun']){
    if((mine[k] ?? null) !== (theirs[k] ?? null)){
      fail(`${k}: "${mine[k]}" here, "${theirs[k]}" in ${base} — the player is standing in the same world`);
    }
  }

  // The place, as the engine sees it. JSON drops the functions, which is what is
  // wanted: `decorate` is compared by having come from the same module, not by
  // its source.
  const json = (v) => JSON.stringify(v ?? null);
  if(json(mine.site) !== json(theirs.site)){
    fail(`site data differs from ${base} — the place is the base theme's, imported, not copied`);
  }
  if(json(mine.start) !== json(theirs.start)){
    fail(`the spawn differs from ${base}`);
  }
  if(mine.content?.INTERIORS !== theirs.content?.INTERIORS &&
     json(mine.content?.INTERIORS) !== json(theirs.content?.INTERIORS)){
    note(`interiors differ from ${base}`);
  }

  // -------------------------------------------------------------- the areas
  const byId = (list) => Object.fromEntries((list ?? []).map(g => [g.id, g]));
  const mineG = byId(mine.content?.GROUPS), theirsG = byId(theirs.content?.GROUPS);
  for(const id of Object.keys(theirsG)){
    if(!mineG[id]){
      fail(`group "${id}" (${theirsG[id].name}) is gone — a group is a building, ` +
           `and a building with nothing in it is a room the player walks into for nothing. ` +
           `Retarget it to something teachable at this level instead`);
    }
  }
  for(const id of Object.keys(mineG)){
    if(!theirsG[id]){ fail(`group "${id}" does not exist in ${base} — an edition adds no areas`); continue; }
    for(const k of ['code', 'name', 'color', 'defaultLeader']){
      if(mineG[id][k] !== theirsG[id][k]){
        fail(`group "${id}".${k}: "${mineG[id][k]}" here, "${theirsG[id][k]}" in ${base}`);
      }
    }
  }

  // --------------------------------------------------------------- the cast
  const mineR = byId(mine.content?.ROSTER), theirsR = byId(theirs.content?.ROSTER);
  for(const id of Object.keys(theirsR)){
    if(!mineR[id]) fail(`${theirsR[id].name} (${id}) is not on this roster — the cast is the base game's`);
  }
  for(const id of Object.keys(mineR)){
    if(!theirsR[id]){ fail(`"${id}" is on this roster and not on ${base}'s — an edition casts nobody new`); continue; }
    for(const k of ['name', 'role', 'division', 'color']){
      if(mineR[id][k] !== theirsR[id][k]){
        fail(`${id}.${k}: "${mineR[id][k]}" here, "${theirsR[id][k]}" in ${base} — ` +
             `bios and their questions are rewritten, the person is not`);
      }
    }
  }
  const leaderIds = (m) => (m.content?.LEADERS ?? []).map(l => l.id ?? l).sort().join(',');
  if(leaderIds(mine) !== leaderIds(theirs)) fail(`the leaders differ from ${base}`);

  // -------------------------------------------------------------- the places
  //
  // A stop names where it happens, and the world was built for the base game's
  // names. A place invented here is a beacon over nothing.
  const placesOf = (m) => new Set((m.content?.MISSIONS ?? [])
    .flatMap(x => (x.stops ?? []).map(s => s.place)).filter(Boolean));
  const theirPlaces = placesOf(theirs);
  const siteNames = new Set([
    ...((theirs.site?.buildings ?? []).flatMap(b => [b.name, b.label, b.id])),
    ...((theirs.site?.rooms ?? []).flatMap(r => [r.name, r.label, r.id])),
  ].filter(Boolean));
  for(const p of placesOf(mine)){
    if(!theirPlaces.has(p) && !siteNames.has(p)){
      fail(`a stop happens at "${p}", which is nowhere in ${base} — the world was built for the base game's places`);
    }
  }

  // ---------------------------------------------------------------- the story
  const days = (m) => (m.content?.MISSIONS ?? []).length;
  note(`${days(mine)} days here, ${days(theirs)} in ${base}`);
  note(`the campaign argument is not checkable from here — read STORY_SPEC.md §1 ` +
       `and confirm both sides still win a day`);

  if(problems.length){
    console.log(`\n✗ ${name} is an edition of ${base}, and ${problems.length} thing(s) other than the course have moved:`);
    problems.forEach(p => console.log('  ✗ ' + p));
    failed++;
  } else {
    console.log(`\n✓ ${name}: same place, same cast, same areas as ${base} — only the course differs`);
  }
  notes.forEach(n => console.log('  · ' + n));
}

process.exit(failed ? 1 : 0);
