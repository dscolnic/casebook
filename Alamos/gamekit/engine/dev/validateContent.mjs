// validateContent.mjs — check a theme's content agrees with itself.
//
//   node engine/dev/validateContent.mjs <theme>
//
// Content is generated from a design document, so the failures are always the
// same shape: a mission points at a group that was renamed, a lesson index that
// does not exist, or a character who is never spawned. That last one shipped in
// the hospital build — spawnNPCs(26) against a 26-person roster meant any
// character beyond the 26th had nobody for the player to talk to.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/validateContent.mjs <theme|path-to-theme-dir>');
  process.exit(2);
}
// Two of the three games predate themes/ and still live in their own package
// directories, so a bare name means themes/<name> and anything with a slash in
// it is taken as the path to a theme directory — otherwise the older games
// cannot be validated at all.
const themeDir = resolveTheme(themeName);

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);
const note = (m) => notes.push(m);

async function load(rel){
  try{
    return await import(pathToFileURL(resolve(themeDir, rel)).href);
  }catch(e){
    fail(`cannot load ${rel}: ${e.message}`);
    return null;
  }
}

const theme = await load('theme.js');
if(!theme){ report(); process.exit(1); }
// engine/core/theme.js normalises on the way into the game. This tool loads the
// manifest directly — no Vite alias, no engine — so it has to do the same, or
// it checks content the game never sees.
const { normalizeContent } = await import('../content/normalize.js');

const T = theme.default ?? theme;
const content = T.content ?? {};
const GROUPS = content.GROUPS ?? [];
const MISSIONS = content.MISSIONS ?? [];
const CURRICULUM = content.CURRICULUM ?? {};
const ROSTER = content.ROSTER ?? [];

// ---- manifest basics
for(const k of ['id', 'title', 'site', 'content', 'people']){
  if(!T[k]) fail(`theme.js is missing "${k}" (see THEME_CONTRACT.md)`);
}
if(T.site && !['interior', 'outdoor'].includes(T.site.kind)){
  fail(`site.kind is "${T.site.kind}" — expected "interior" or "outdoor"`);
}

// ---- normalisation: what the engine repairs on the way in
const normalised = normalizeContent(content);
for(const p of normalised.problems ?? []) fail(p);
// The normaliser makes hundreds of small changes on a generated theme. They
// are worth seeing when you are debugging content, and noise otherwise.
if(process.argv.includes('--verbose')){
  for(const c of normalised.changes ?? []) note(`normalised — ${c}`);
} else if((normalised.changes ?? []).length){
  note(`${normalised.changes.length} content items normalised on load (run with --verbose to list them)`);
}

// ---- groups
const groupIds = new Set();
for(const g of GROUPS){
  if(!g.id) fail('a group has no id');
  if(groupIds.has(g.id)) fail(`duplicate group id "${g.id}"`);
  groupIds.add(g.id);
  if(!g.milestones?.length) fail(`group "${g.id}" has no milestones`);
}
if(!GROUPS.length) fail('no groups defined');

// ---- every group needs somewhere to happen
const planRooms = T.site?.plan?.rooms ?? [];
const roomGroups = new Set(planRooms.filter(r => r.group).map(r => r.group));
if(T.site?.kind === 'interior'){
  for(const id of groupIds){
    if(!roomGroups.has(id)) fail(`group "${id}" has no room in plan.js — the player cannot reach it`);
  }
  for(const g of roomGroups){
    if(!groupIds.has(g)) fail(`plan.js room references unknown group "${g}"`);
  }
}
// The outdoor equivalent: a mission stop resolves through stopMeshes, which is
// built from the buildings that carry a `group`. A group with no building is
// exactly as unreachable as a group with no room, and used to go unchecked.
const siteBuildings = T.site?.buildings ?? [];
const buildingGroups = new Set(siteBuildings.filter(b => b.group).map(b => b.group));
if(T.site?.kind === 'outdoor'){
  if(!siteBuildings.length){
    fail('site.kind is "outdoor" but site.buildings is empty — there is nowhere to walk to');
  }
  for(const id of groupIds){
    if(!buildingGroups.has(id)) fail(`group "${id}" has no building in site.js — the player cannot reach it`);
  }
  for(const g of buildingGroups){
    if(!groupIds.has(g)) fail(`site.js building references unknown group "${g}"`);
  }
  if(!T.site?.spawn && !T.start) fail('outdoor site has no spawn point');
  // A prop over the spawn welds the player in place while everything still
  // renders — the symptom is "renders great, W does nothing". Buildings are the
  // one thing placed before the audit can run in the browser, so check them here.
  const spawn = T.start ?? T.site?.spawn;
  if(spawn){
    for(const b of siteBuildings){
      const clearX = Math.abs(spawn.x - b.x) - b.w / 2;
      const clearZ = Math.abs(spawn.z - b.z) - b.d / 2;
      if(clearX < 3 && clearZ < 3){
        fail(`building "${b.id}" sits on or beside the spawn point (${spawn.x}, ${spawn.z}) — ` +
             `the player would render fine and be unable to move`);
      }
    }
  }
}

// ---- missions and lesson indices
MISSIONS.forEach((m, mi) => {
  const label = `mission ${mi + 1} ("${m.title ?? '?'}")`;
  if(!m.stops?.length) return fail(`${label} has no stops`);
  // Three authored stops, plus whatever normalize.js added. Every day from the
  // third carries a callback to an area taught earlier, so counting raw stops
  // reported thirteen days a game as malformed when all of them were correct.
  const authored = m.stops.filter(s => !s.callback).length;
  if(authored !== 3) note(`${label} has ${authored} authored stops; the loop is built around 3`);
  m.stops.forEach((s, si) => {
    if(!groupIds.has(s.group)) fail(`${label} stop ${si + 1} references unknown group "${s.group}"`);
    const lessons = CURRICULUM[s.group];
    if(lessons === undefined){
      fail(`${label} stop ${si + 1}: no curriculum entry for group "${s.group}"`);
    } else if(typeof s.lesson === 'number' && Array.isArray(lessons) && s.lesson >= lessons.length){
      fail(`${label} stop ${si + 1}: lesson index ${s.lesson} but group "${s.group}" ` +
           `only has ${lessons.length} lessons`);
    }
    if(!s.task) note(`${label} stop ${si + 1} has no task label`);
  });
});
if(!MISSIONS.length) fail('no missions defined');

// ---- roster: everyone a mission needs must actually spawn
const rosterIds = new Set();
for(const p of ROSTER){
  if(!p.id) fail('a roster entry has no id');
  if(rosterIds.has(p.id)) fail(`duplicate roster id "${p.id}"`);
  rosterIds.add(p.id);
  if(!p.role) note(`roster "${p.id}" has no role, so outfit selection falls back to default`);
}
const extras = T.people?.extras ?? 0;
const spawnCount = T.people?.spawn ?? ROSTER.length;
if(spawnCount < ROSTER.length){
  fail(`people.spawn is ${spawnCount} but the roster has ${ROSTER.length}. ` +
       `Characters past the limit never appear — any mission stop naming them is unreachable.`);
}
// Any explicit person-stops must name someone on the roster.
MISSIONS.forEach((m, mi) => {
  m.stops?.forEach((s, si) => {
    if(s.personId && !rosterIds.has(s.personId)){
      fail(`mission ${mi + 1} stop ${si + 1} names person "${s.personId}", who is not on the roster`);
    }
  });
});

// ---- outfits
// A theme whose crowd is its own module has no OUTFITS table for the engine to
// read, and that is a different situation from having forgotten one. It has to
// say so: `people: { crowd: 'bespoke' }`.
const bespokeCrowd = T.people?.crowd === 'bespoke';
const OUTFITS = T.people?.OUTFITS ?? {};
if(!bespokeCrowd){
  if(!Object.keys(OUTFITS).length) fail('people.OUTFITS is empty — everyone will be default-coloured');
  for(const [k, o] of Object.entries(OUTFITS)){
    if(o.top === undefined || o.bottom === undefined) fail(`outfit "${k}" needs top and bottom colours`);
  }
} else {
  note('people.crowd is "bespoke" — the theme builds its own cast, so OUTFITS is not checked');
}

// ---- normalisation: what the engine had to repair on the way in


// ---- interiors, where a theme declares them
const INTERIORS = T.interiors ?? null;
if(INTERIORS){
  for(const [id, spec] of Object.entries(INTERIORS)){
    if(!groupIds.has(id)) fail(`interiors names unknown group "${id}"`);
    if(!spec.station) fail(`interiors["${id}"] has no station — the room would have no instrument`);
  }
  for(const id of groupIds){
    if(!INTERIORS[id]) note(`group "${id}" has no interior, so its door opens the question panel directly`);
  }
}

// ---- copy
const COPY = content.COPY ?? {};
if(T.site?.kind === 'interior'){
  for(const r of planRooms){
    // A room that carries a lesson is read through its group — that is the key
    // the book writes and the key the question panel uses. Only a room with no
    // group is read by its own id.
    if(!COPY[r.group ?? r.id]) note(`room "${r.id}" has no COPY entry, so its info panel will be a bare title`);
  }
}
if(T.site?.kind === 'outdoor'){
  for(const b of siteBuildings){
    if(!COPY[b.group ?? b.id]) note(`building "${b.id}" has no COPY entry, so its info panel will be a bare title`);
  }
}

// ---- lessons: the content-integrity invariants from THEME_CONTRACT.md
// (content has already been normalised above)
for(const [group, lessons] of Object.entries(CURRICULUM)){
  if(!Array.isArray(lessons)) continue;
  lessons.forEach((l, i) => {
    const at = `${group} lesson ${i + 1} ("${l.title ?? '?'}")`;
    // The pre-question panel shows `story`, falling back to `progress`, then
    // the title. One book writes `scene`, another writes `story`; the rule is
    // that *something* is there to reason from, not which key it is under.
    const scene = l.scene || l.story || l.progress || '';
    if(scene.length < 40){
      fail(`${at}: nothing for the pre-question panel to show — needs scene, story or progress`);
    }
    if(l.takeaway && l.game?.why && l.takeaway.trim() === l.game.why.trim()){
      fail(`${at}: takeaway repeats the "why", so the intro gives the answer away`);
    }
    const g = l.game;
    if(!g) return note(`${at}: no game object`);
    // A candidate may be a plain string or { label, mechanism }; grading
    // compares the label either way.
    const labelsOf = (cs) => (cs || []).map(c => (typeof c === 'string' ? c : c.label));
    if(g.choices && g.correctChoice && !labelsOf(g.choices).includes(g.correctChoice)){
      fail(`${at}: correctChoice is not among the choices — grading compares labels, so this is ungradeable`);
    }
    const kind = String(g.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
    if(kind === 'DIAGNOSIS'){
      const labels = labelsOf(g.choices);
      if(labels.length < 4) fail(`${at}: diagnosis offers ${labels.length} candidates; the format needs at least four to rule out`);
      if(new Set(labels).size !== labels.length) fail(`${at}: two candidates share a label — grading cannot tell them apart`);
      // The rule is that the panel must be readable at a glance, not that it
      // must be a chart. A figure does that; so does a reading panel that spans
      // three or more zones, which is the shape the authored packs use — they
      // dropped the schematic on purpose and label every reading with its zone.
      const zones = new Set((g.readings || []).map(r => r.zone).filter(Boolean));
      if(!g.figure && zones.size < 3){
        fail(`${at}: diagnosis has neither a figure nor readings across three zones; `
          + `the panel has to be readable at a glance`);
      }
      const want = Array.isArray(g.correctChoices) ? g.correctChoices
        : (g.correctChoice ? [g.correctChoice] : []);
      if(want.length && !want.every(w => labels.includes(w))){
        fail(`${at}: the answer names a candidate that is not on the list — grading compares labels`);
      }
      if(!(g.readings || []).some(r => r.status !== 'alarm')){
        fail(`${at}: every reading is an alarm — the quiet readings are what rule explanations out`);
      }
    }
    if(kind === 'PROTOCOL' && g.mapping && new Set(g.mapping).size !== g.mapping.length){
      fail(`${at}: protocol mapping is not a permutation`);
    }
    // House rule 12, which this file was itself breaking: these two compared
    // `g.type` against "Sequence" and "Ballpark" as the books spell them, and
    // normalizeContent has already canonicalised them to SEQUENCE and BALLPARK.
    // Neither branch had fired since normalisation moved into theme.js.
    if(kind === 'SEQUENCE' && g.order && g.cards && new Set(g.order).size !== g.cards.length){
      fail(`${at}: sequence order does not use every card exactly once`);
    }
    // ---- every choice set has to be gradeable and worth answering
    if(g.choices?.length){
      const labels = labelsOf(g.choices).map(s => String(s).trim());
      if(new Set(labels).size !== labels.length){
        fail(`${at}: two choices are the same string — a panel that grades by label cannot tell them apart`);
      }
    }
    if((kind === 'CHOICE' || kind === 'TRIAGE') && g.choices?.length){
      const want = String(g.correctChoice ?? g.answer ?? '').trim();
      if(!want) fail(`${at}: ${kind} with no answer`);
      else if(!labelsOf(g.choices).map(s => String(s).trim()).includes(want)){
        fail(`${at}: the answer is not one of the choices — grading compares labels`);
      }
    }
    // The verdict card is where a wrong answer becomes a lesson. Formats that
    // draw their own detail (the mapping, the ordered list, the worked
    // estimate) survive without one; a bare choice does not.
    if(!String(g.why ?? '').trim() && ['CHOICE', 'TRIAGE', 'DIAGNOSIS'].includes(kind)){
      note(`${at}: no "why" — the verdict card names the answer and explains nothing`);
    }
    if(kind === 'BALLPARK'){
      const spec = content.BALLPARK_CALCS?.[`${group}-${l.day}`];
      if(!spec){
        fail(`${at}: BALLPARK with no BALLPARK_CALCS["${group}-${l.day}"] — it renders un-answerable`);
      } else {
        if(spec.correct?.length !== spec.slots){
          fail(`${at}: estimate has ${spec.correct?.length} correct tiles for ${spec.slots} slots`);
        }
        // Evaluate the spec the way questionUI does: the tiles that belong,
        // in slot order, bound to a, b, c… This is what caught a template
        // referencing a slot the player could not fill, which returned NaN
        // for every submission and which no other check could see.
        const vals = (spec.correct ?? []).map(i => spec.values?.[i]);
        const names = 'abcdefgh'.slice(0, Math.max(vals.length, spec.slots ?? 0)).split('');
        let got;
        try{ got = Function(...names, `return (${spec.formula})`)(...vals); }
        catch(e){ got = NaN; }
        if(!Number.isFinite(got)){
          fail(`${at}: estimate formula "${spec.formula}" does not evaluate — the panel can never be answered`);
        } else if(Math.abs(got - spec.target) > (spec.tolerance ?? 0)){
          fail(`${at}: estimate formula gives ${got}, outside target ${spec.target} ±${spec.tolerance}`);
        }
        // Distractor tiles are the format: without one, choosing which
        // quantities belong — the actual skill — has been done for the player.
        if((spec.labels?.length ?? 0) <= (spec.correct?.length ?? 0)){
          fail(`${at}: estimate offers no distractor tiles, so every number given belongs in the answer`);
        }
        if(!spec.units) fail(`${at}: estimate has no units`);
        if(!String(spec.explanation ?? '').trim()){
          note(`${at}: estimate has no explanation, so the verdict shows a number and no reasoning`);
        }
      }
    }
  });
}


// ---- reading level
//
// "Measure the reading level, do not judge it." The hospital's opening card
// once shipped at Flesch–Kincaid 7.7 for an audience whose lessons sit at 2.7,
// and nothing caught it because nothing was counting. A theme declares who it
// is for; this checks that its prose is actually written for them.
//
// The grade the theme declares is the target. Two grades above it is a hard
// ceiling and fails; anything between is reported so it can be brought down.
const SYL = (w) => {
  w = w.toLowerCase().replace(/[^a-z]/g, '');
  if(w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return (w.match(/[aeiouy]{1,2}/g) || ['x']).length;
};
function fleschKincaid(text){
  const t = String(text ?? '').trim();
  const words = t.split(/\s+/).filter(Boolean);
  if(words.length < 25) return null;   // too short for the formula to mean anything
  const sentences = (t.match(/[.!?]+/g) || []).length || 1;
  const syllables = words.reduce((n, w) => n + SYL(w), 0);
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}


// Every scene and every verdict, against the audience the theme declares.
{
  const target = Number(T.audience?.grade);
  if(Number.isFinite(target)){
    const over = [];
    for(const m of MISSIONS){
      for(const st of m.stops ?? []){
        const l = CURRICULUM[st.group]?.[st.lesson];
        if(!l) continue;
        for(const [what, text] of [['scene', l.scene || l.story], ['verdict', l.game?.why]]){
          const fk = fleschKincaid(text);
          if(fk == null) continue;
          if(fk > target + 2) fail(`${l.title}: ${what} reads at grade ${fk.toFixed(1)}, and the theme is written for grade ${target}`);
          else if(fk > target) over.push(`${l.title} (${what} ${fk.toFixed(1)})`);
        }
      }
    }
    if(over.length) note(`${over.length} passage(s) above the declared grade ${target}: ${over.slice(0, 4).join(', ')}${over.length > 4 ? ', …' : ''}`);
  }
}

function report(){
  if(notes.length){
    console.log(`\n${notes.length} note(s):`);
    notes.forEach(n => console.log('  · ' + n));
  }
  if(problems.length){
    console.error(`\n${problems.length} problem(s) in theme "${themeName}":`);
    problems.forEach(p => console.error('  ✗ ' + p));
  } else {
    console.log(`\n✓ theme "${themeName}" content is consistent ` +
                `(${GROUPS.length} groups, ${MISSIONS.length} missions, ${ROSTER.length} people)`);
  }
}
report();
process.exit(problems.length ? 1 : 0);
