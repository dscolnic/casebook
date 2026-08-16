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
import { ordinary, norm, TECHY } from '../../tools/common-words.mjs';
import { fleschKincaid } from '../../tools/readability.js';

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
/** Comparable text: case, punctuation and curly quotes all stop mattering. */
const plain = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

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
    // A rebuttal written "B. <the option> — <why it does not hold>" names the
    // option it argues against. When the options are rewritten and the
    // rebuttals are not, the verdict explains away answers that are not on the
    // screen — the hospital shipped 74 lessons like that, telling a player who
    // chose "the heart beats faster to help the body cool down" why "the bones
    // need to become heavier during exercise" is wrong.
    const rebuttals = Array.isArray(g.rebuttals) ? g.rebuttals : [];
    if(rebuttals.length){
      const flat = (g.choices || []).map(c => plain(c?.label ?? c)).filter(Boolean);
      if(flat.length >= 2){
        for(const r of rebuttals){
          const m = /^\s*[A-D][.)]\s*(.+?)\s+—/.exec(String(r));
          if(!m) continue;                       // bare-reason style, nothing to match
          const claim = plain(m[1]);
          if(!flat.some(l => l.includes(claim) || claim.includes(l))){
            fail(`${at}: a rebuttal argues against "${m[1].slice(0, 48)}…", which is not one of the options`);
          }
        }
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
    // Every label a question renders has to be TEXT. A YAML list item containing a
    // colon and a space — "Reliability is not independence: a shared component
    // fails for both" — parses as a MAPPING, and the game prints "[object Object]"
    // in the middle of a verdict without erroring. Three of those shipped from one
    // afternoon of editing, and none of the other checks could see them.
    for(const field of ['rebuttals', 'cards', 'scenarios', 'givens']){
      (g[field] ?? []).forEach((v, i) => {
        if(typeof v !== 'string'){
          fail(`${at}: ${field}[${i}] is not text — it renders as [object Object]`
             + ` (an unquoted YAML list item with ": " in it becomes a map)`);
        }
      });
    }
    (g.choices ?? []).forEach((v, i) => {
      if(typeof v !== 'string' && typeof v?.label !== 'string'){
        fail(`${at}: choices[${i}] has no label text — it renders as [object Object]`);
      }
    });
    if(kind === 'SWEEP'){
      const w = l.game?.sweep;
      const a = w?.axis ?? {};
      if(!w) fail(`${at}: SWEEP with no sweep block — it renders un-answerable`);
      else {
        if(!(a.max > a.min)) fail(`${at}: sweep axis needs max above min`);
        if(!((w.response ?? []).length >= 4)) fail(`${at}: sweep needs at least four response points`);
        if(!(w.tolerance > 0)) fail(`${at}: sweep needs a positive tolerance`);
        if(!(w.target >= a.min && w.target <= a.max)) fail(`${at}: sweep target is outside its axis`);
        // Answerable by not moving, which is the one way this format breaks by
        // default rather than by being wrong.
        if(Math.abs((w.start ?? a.min) - w.target) <= w.tolerance){
          fail(`${at}: the sweep starts on its own answer`);
        }
        // A feature nobody can see is a guess. The response at the target has to
        // stand out from the baseline by more than a tenth of the full range.
        const vals = (w.response ?? []).map(p => p.value);
        const range = Math.max(...vals) - Math.min(...vals);
        const atTarget = (w.response ?? []).reduce((best, p) =>
          Math.abs(p.at - w.target) < Math.abs(best.at - w.target) ? p : best, w.response[0]);
        if(range > 0 && Math.abs(atTarget.value - (w.baseline ?? 0)) < range * 0.1){
          fail(`${at}: the sweep's response at the target barely differs from its baseline — there is nothing to find`);
        }
      }
    }
    if(kind === 'HOLDOUT'){
      const h = l.game?.holdout;
      if(!h) fail(`${at}: HOLDOUT with no holdout block — it renders un-answerable`);
      else {
        const a = h.axis ?? {};
        if(!(a.max > a.min)) fail(`${at}: holdout axis needs max above min`);
        if(!((h.fit ?? []).length >= 5)) fail(`${at}: holdout needs at least five calibration points`);
        if(!((h.test ?? []).length >= 5)) fail(`${at}: holdout needs at least five held-out points`);
        if(!Number.isFinite(h.pass)) fail(`${at}: holdout needs a numeric pass score`);
        else {
          // The trap has to exist. If the best line on the fitting set also clears
          // `pass` on the held-out set, the stop teaches that overfitting is free.
          const bestFit = (h.fit ?? []).reduce((x, y) => (y.value > x.value ? y : x), h.fit[0]);
          const near = (h.test ?? []).reduce((x, y) =>
            Math.abs(y.at - bestFit.at) < Math.abs(x.at - bestFit.at) ? y : x, h.test[0]);
          if(near.value >= h.pass){
            fail(`${at}: the holdout's best calibration line also passes on held-out data — no trap`);
          }
          if(!(h.test ?? []).some(p => p.value >= h.pass)){
            fail(`${at}: no position reaches the holdout pass score — it cannot be answered right`);
          }
        }
      }
    }
    if(kind === 'PROBE'){
      const p = l.game?.probe;
      if(!p) fail(`${at}: PROBE with no probe block — it renders un-answerable`);
      else {
        const s = p.stations ?? [];
        if(s.length < 4) fail(`${at}: probe needs at least four stations`);
        if(!s.every(x => x.reading && x.expected)){
          fail(`${at}: every probe station needs a reading and an expected value`);
        }
        if(!s.some(x => String(x.id ?? x.label) === String(p.target))){
          fail(`${at}: probe target "${p.target}" is not one of its stations`);
        }
      }
    }
    if(kind === 'TALLY'){
      const t = l.game?.tally;
      if(!t) fail(`${at}: TALLY with no tally block — it renders un-answerable`);
      else {
        const s = t.settings ?? [];
        if(s.length < 2) fail(`${at}: tally needs at least two setting pairs`);
        if(!s.every(x => Number.isFinite(x.pSame))) fail(`${at}: every tally setting needs pSame`);
        if(!(t.tolerance > 0)) fail(`${at}: tally needs a positive tolerance`);
        else {
          // The settings have to produce the number the stop is keyed to, or the
          // player collects shots forever and is marked wrong for the physics.
          const truth = s.reduce((acc, x) => acc + (x.sign === -1 ? -1 : 1) * (2 * x.pSame - 1), 0);
          if(Math.abs(truth - t.target) > t.tolerance){
            fail(`${at}: tally settings produce ${truth.toFixed(3)}, outside the keyed ${t.target} ±${t.tolerance}`);
          }
        }
      }
    }
    // ---- the twelve from FORMATS.md.
    //
    // The importer checks all of this at import time. It is re-asserted here
    // because content can be hand-edited afterwards and because three of the
    // games predate the book format — and because the failure mode of every one
    // of these is silent: a board on which every move passes renders perfectly,
    // grades perfectly, and teaches the opposite of what it was written for.
    const INST = { TRIGGER: 'trigger', VALUE: 'value', CLOUD: 'cloud', ALLOCATE: 'allocate',
      TRACE: 'trace', ATTEST: 'attest', CONTROL: 'control', TRIANGULATE: 'triangulate',
      DEGENERACY: 'degeneracy', CHAIN: 'chain', BALANCE: 'balance', VERIFY: 'verify',
      PROPAGATE: 'propagate', STRESS: 'stress', DELEGATE: 'delegate', FLY: 'fly',
      RESIDUAL: 'residual', INJECT: 'inject', ROUTE: 'route' };
    if(INST[kind]){
      const b = l.game?.[INST[kind]];
      if(!b) fail(`${at}: ${kind} with no \`${INST[kind]}\` block — it renders un-answerable`);
      else if(!String(l.game?.answer ?? '').trim()){
        fail(`${at}: ${kind} with no answer text — the verdict cannot say what was right`);
      } else {
        const num = (v) => Number.isFinite(+v);
        if(kind === 'TRIGGER'){
          const top = Math.max(...(b.stream ?? []).map(x => +x.value));
          if(!((b.conditions ?? []).length >= 2)) fail(`${at}: a trigger needs at least two stages`);
          if(!(+b.scale?.max > top)) fail(`${at}: every trigger threshold fires — the scale has to`
            + ` reach above the stream's highest value (${top})`);
          for(const c of b.conditions ?? []){
            if(!(b.stream ?? []).some(x => +x.hoursLeft >= +c.leadHours)){
              fail(`${at}: trigger stage "${c.label}" needs ${c.leadHours} h of lead and no update`
                + ' arrives with that much left');
            }
          }
        }
        if(kind === 'VALUE'){
          const total = (b.options ?? []).reduce((n, o) => n + +o.cost, 0);
          if(!(total > +b.budget?.amount)) fail(`${at}: the whole value board is affordable`);
          if(!(b.options ?? []).some(o => o.decisive)) fail(`${at}: no value option is decisive`);
          if(new Set((b.options ?? []).map(o => o.axis)).size < 2){
            fail(`${at}: every value option asks about the same axis`);
          }
        }
        if(kind === 'CLOUD'){
          if(!(b.actions ?? []).some(a => a.effect === 'narrow')){
            fail(`${at}: a cloud with no narrowing action cannot be answered`);
          }
          if(!(+b.pass > 0 && +b.pass < 1)) fail(`${at}: a cloud pass is a fraction between 0 and 1`);
        }
        if(kind === 'ALLOCATE'){
          const total = (b.items ?? []).reduce((n, i) => n + +i.cost, 0);
          if(!(total > +b.pool?.amount)) fail(`${at}: the whole allocation board is affordable —`
            + ' nothing is being traded away');
          if(!(b.answers ?? []).some(q => q.required)) fail(`${at}: no allocation answer is required`);
          if(!(b.answers ?? []).some(q => !q.required)) fail(`${at}: every allocation answer is`
            + ' required — there is nothing the plan may forgo');
          const prot = new Set((b.items ?? []).filter(i => i.protected).map(i => String(i.id)));
          for(const q of (b.answers ?? []).filter(x => x.required)){
            if((q.requires ?? []).every(r => prot.has(String(r)))){
              fail(`${at}: the required answer "${q.question}" is covered by the protected items`
                + ' alone — every plan passes');
            }
          }
        }
        if(kind === 'TRACE'){
          const sharing = (b.channels ?? []).filter(c =>
            (c.depends ?? []).map(String).includes(String(b.target)));
          if(sharing.length < 2) fail(`${at}: fewer than two trace channels share the target —`
            + ' there is no common mode');
          if(!((b.independent ?? []).length >= 1)) fail(`${at}: a trace with no independent channel`
            + ' cannot be answered');
        }
        if(kind === 'ATTEST'){
          const wanted = (b.claims ?? []).filter(c => c.critical && !c.backed);
          if((b.claims ?? []).length < 4) fail(`${at}: an attest board needs at least four claims`);
          if(!wanted.length) fail(`${at}: every critical claim is backed — closing blind passes`);
          if(wanted.length > +b.checks) fail(`${at}: ${wanted.length} claims must be held and only`
            + ` ${b.checks} verifications are allowed`);
          if(!(+b.checks < (b.claims ?? []).length)) fail(`${at}: the attest budget covers the whole`
            + ' list — there is no decision about where to look');
        }
        if(kind === 'CONTROL'){
          if(!(Math.abs(+b.response) > (+b.noise || 0) * 3)){
            fail(`${at}: the control response is not clear of its own noise`);
          }
          if(!(b.variables ?? []).some(v => String(v.id) === String(b.truth))){
            fail(`${at}: the control truth is not one of its variables`);
          }
        }
        if(kind === 'TRIANGULATE'){
          for(const x of b.stations ?? []){
            const real = Math.hypot(+x.x - +b.truth.x, +x.y - +b.truth.y);
            if(Math.abs(real - +x.distance) > +b.tolerance){
              fail(`${at}: station "${x.label}" ring misses the answer by`
                + ` ${Math.abs(real - +x.distance).toFixed(2)}`);
            }
          }
          if(b.systematic && !(Math.abs(+b.systematic.delta) > +b.tolerance)){
            fail(`${at}: the systematic is smaller than the tolerance — correcting it changes nothing`);
          }
        }
        if(kind === 'DEGENERACY'){
          const far = (b.locus ?? []).filter(p => Math.abs(+p.a - +b.truth.a) > +b.tolerance.a
            || Math.abs(+p.b - +b.truth.b) > +b.tolerance.b);
          if(far.length < 3) fail(`${at}: the first locus barely leaves the answer tolerance — the`
            + ' measurement is not degenerate');
          if(!((b.second?.locus ?? []).length >= 3)) fail(`${at}: a degeneracy needs a second locus`);
        }
        if(kind === 'CHAIN'){
          if(String(b.governing) === String(b.distractor)){
            fail(`${at}: the chain's distractor is its governing link`);
          }
          if(String(b.governing) === String((b.order ?? [])[0])){
            fail(`${at}: the chain is governed by its own first link`);
          }
          if(!(b.order ?? []).map(String).includes(String(b.governing))){
            fail(`${at}: the chain's governing link is not in its path`);
          }
        }
        if(kind === 'BALANCE'){
          // A stream marked `countable: false` is a different quantity — a
          // purity among mass flows — and is deliberately outside the ledger.
          const flow = (b.streams ?? []).filter(x => x.countable !== false);
          const all = flow.reduce((n, x) => n + +x.value, 0);
          const obvious = flow.filter(x => !x.hidden).reduce((n, x) => n + +x.value, 0);
          if(Math.abs(all - +b.total.amount) > +b.tolerance){
            fail(`${at}: the balance does not close even when everything is counted`);
          }
          if(!(Math.abs(obvious - +b.total.amount) > +b.tolerance)){
            fail(`${at}: leaving the hidden term out of the balance still passes`);
          }
        }
        if(kind === 'VERIFY'){
          const p = b.prediction ?? {};
          if(!num(b.truth) || +b.truth < +p.min || +b.truth > +p.max){
            fail(`${at}: the verify truth is outside the range the player can predict`);
          } else if(!(+p.min / +b.truth < +b.passRatio[0] || +p.max / +b.truth > +b.passRatio[1])){
            fail(`${at}: every prediction in the verify range passes`);
          }
        }
        if(kind === 'PROPAGATE'){
          const share = (x) => Math.abs(+x.exponent) * +x.sigmaFrac;
          const worst = (b.inputs ?? []).reduce((a, x) => (share(x) > share(a) ? x : a),
            (b.inputs ?? [])[0]);
          if(String(worst?.id) !== String(b.dominant)){
            fail(`${at}: the propagate dominant term is not the widest contribution`);
          }
          const bigExp = (b.inputs ?? []).reduce((a, x) =>
            (Math.abs(+x.exponent) > Math.abs(+a.exponent) ? x : a), (b.inputs ?? [])[0]);
          if(String(bigExp?.id) === String(b.dominant)){
            fail(`${at}: ranking by exponent alone answers the propagate — no lesson in it`);
          }
        }
        if(kind === 'STRESS'){
          const a = b.assumption ?? {};
          const survivors = (b.candidates ?? []).map(c => String(c.id))
            .filter(id => +((b.feasible ?? {})[id] ?? -Infinity) <= +a.min);
          if(!(survivors.length === 1 && survivors[0] === String(b.robust))){
            fail(`${at}: ${survivors.length} candidate(s) survive the whole stress range —`
              + ' exactly one must, and it must be the robust one');
          }
          const at2 = (id) => +(((b.scores ?? {})[id] ?? {})[b.optimiseOn] ?? NaN);
          const ids = (b.candidates ?? []).map(c => String(c.id));
          const best = ids.reduce((x, y) => (at2(y) < at2(x) ? y : x), ids[0]);
          if(best === String(b.robust)){
            fail(`${at}: the robust candidate also wins on ${b.optimiseOn} at the nominal`);
          }
        }
        if(kind === 'DELEGATE'){
          const urgent = (b.problems ?? []).filter(p => p.trend === 'rising' && p.irreversible);
          if(urgent.length !== 1) fail(`${at}: ${urgent.length} problems are rising toward`
            + ' something irreversible — exactly one is what makes an order');
          const mine = (b.problems ?? []).filter(p => p.delegable === false);
          if(mine.length !== 1) fail(`${at}: ${mine.length} problems need the player's own`
            + ' judgement — exactly one is what command keeps');
          else if(String(mine[0].id) !== String(b.first)){
            fail(`${at}: what command keeps is not the problem marked \`delegable: false\``);
          }
          if(!(b.problems ?? []).some(p => p.trend !== 'rising' && p.loud)){
            fail(`${at}: no delegate problem is loud and stable — the alarm and the priority`
              + ' are then the same thing');
          }
        }
        if(kind === 'FLY'){
          const end = +b.target + (+b.accel * +b.pulse.min * +b.pulse.min) / 2;
          if(!(end - +b.target > +b.tolerance)){
            fail(`${at}: braking at the fly target itself lands inside the tolerance, so waiting`
              + ' until it arrives is a correct answer');
          }
        }
        if(kind === 'RESIDUAL'){
          const best = (b.fits ?? []).reduce((a, f) => (+f.rms < +a.rms ? f : a), (b.fits ?? [])[0]);
          if(String(best?.id) === String(b.accept)){
            fail(`${at}: the lowest-RMS fit is the one to accept — nobody has to look at the field`);
          }
        }
        if(kind === 'INJECT'){
          const byCount = (b.configs ?? []).reduce((a, c) =>
            (+c.detections > +a.detections ? c : a), (b.configs ?? [])[0]);
          if(String(byCount?.id) === String(b.best)){
            fail(`${at}: the inject configuration with the most detections is also the best on`
              + ` ${b.metric?.label} — counting detections answers it`);
          }
        }
        if(kind === 'ROUTE'){
          const marks = (b.stops ?? []).map(x => String(x.landmark).toLowerCase().trim());
          if(new Set(marks).size !== marks.length){
            fail(`${at}: two route compartments share a landmark`);
          }
          if(!((b.order ?? []).indexOf(String(b.resumeAt)) > +b.interruptAfter)){
            fail(`${at}: the route resumes where the player had already been`);
          }
        }
      }
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
        // questionUI renders `relationship` above the tiles, under "Governing
        // relationship". Every book theme emitted it empty — 34 estimates that
        // showed a bank of numbers and an equation skeleton with no statement of
        // what law to apply, and the scene is not allowed to carry it either.
        if(!String(g.relationship ?? '').trim()){
          fail(`${at}: estimate has no relationship, so the panel shows tiles and no law to apply them with`);
        }
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
// The formula is `tools/readability.js` now — engine/dev/missionCards.mjs
// measures the same prose, and two copies of it is how two answers to the same
// question start being reported.


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


// ---- the opening card
//
// THE ONE PIECE OF PROSE NOTHING WAS COUNTING. The reading-level gate above
// covers scenes and verdicts; `checkVoice` reads the opening but only for the
// slogan it ends on. So the first paragraph a player ever sees — the only one
// they read before the game has taught them a single word — had no gate at all,
// and it shows: Red Sand opened on "the transfer window opens on sol 486" and
// "the ascent vehicle standing on the pad", with all three terms undefined and a
// 42-word sentence carrying them; Ice Core opened at Flesch–Kincaid 17.5 with a
// 66-word sentence.
//
// Three things are checked, and the middle one is the one that actually bites.
//
//   · **Reading level**, on the same rule as a scene.
//   · **Sentence length.** A card is read cold, standing still, before anything
//     is at stake. Every one of the worst cards failed here first: a 40-word
//     sentence with two semicolons is not hard vocabulary, it is a pile-up, and
//     it is the thing that makes a good situation unreadable.
//   · **Hard words that the glossary does not define.** A term the glossary
//     carries will at least be explained on day one. A term nowhere in the game
//     is a word the player is expected to already own — which is exactly the
//     assumption an opening card is not entitled to make. Hardness is
//     `jargonSweep`'s own test, not a new one, so the two cannot drift.
//
// What this deliberately does NOT catch, because no cheap rule does: a domain
// term built out of ordinary words. "Transfer window" and "ascent vehicle" are
// two everyday words each and neither is a candidate under any word-level test,
// yet they were the first two things Red Sand's card asked a player to already
// know. That class is caught by reading the card, and the sentence-length gate
// is what makes somebody read it.
{
  const opening = (T.opening ?? []).join(' ').trim();
  if(opening){
    const target = Number(T.audience?.grade);
    const fk = fleschKincaid(opening);
    if(Number.isFinite(target) && fk != null){
      if(fk > target + 2) fail(`the opening card reads at grade ${fk.toFixed(1)}, and the theme is written for grade ${target}`);
      else if(fk > target) note(`the opening card reads at grade ${fk.toFixed(1)}, above the declared ${target}`);
    }
    // Sentence length. Split on terminators; an em-dash or a semicolon does not
    // end a sentence and is exactly how these got long in the first place.
    const sentences = opening.split(/(?<=[.!?])\s+/).filter(s => s.trim());
    const longest = sentences.reduce((a, b) =>
      b.split(/\s+/).length > a.split(/\s+/).length ? b : a, '');
    const longestWords = longest.split(/\s+/).filter(Boolean).length;
    if(longestWords > 40){
      fail(`the opening card has a ${longestWords}-word sentence — "${longest.slice(0, 60)}…"`);
    }else if(longestWords > 32){
      note(`the opening card's longest sentence is ${longestWords} words`);
    }
    const mean = opening.split(/\s+/).filter(Boolean).length / Math.max(1, sentences.length);
    if(mean > 28) note(`the opening card averages ${mean.toFixed(0)} words a sentence`);

    // Hard words with nowhere to look them up. Names are skipped: a card is
    // entitled to introduce a person or a place, and does.
    const defined = new Set();
    for(const j of content.JARGON ?? []){
      for(const w of [j.term, j.name, ...(j.aliases ?? [])]){
        if(w) String(w).split(/\s+/).forEach(part => defined.add(norm(part)));
      }
    }
    for(const p of ROSTER) String(p?.name ?? '').split(/\s+/).forEach(w => defined.add(norm(w)));
    for(const b of T.site?.buildings ?? []) String(b?.name ?? '').split(/\s+/).forEach(w => defined.add(norm(w)));
    // jargonSweep's rule, imported in spirit rather than copied loosely: five
    // letters or more, not an ordinary word, and then either long or technical.
    const hard = (raw) => {
      const w = norm(raw);
      if(w.length < 5 || ordinary(w)) return false;
      if(/^[A-Z]{2,5}$/.test(raw)) return true;
      if(/\d/.test(w)) return true;
      return w.length >= 10 || TECHY.test(w);
    };
    const seen = new Set(), unglossed = [];
    for(const raw of opening.split(/[^A-Za-z’'-]+/)){
      if(!raw) continue;
      if(/^[A-Z]/.test(raw)) continue;          // a name, or the start of a sentence
      const w = norm(raw);
      // A hyphenated number is not a technical term. "twenty-three",
      // "quarter-million" and "eighty-year-old" are long enough to trip the
      // length clause and are ordinary English.
      if(raw.includes('-') && raw.split('-').every(part => part.length < 8)) continue;
      if(seen.has(w) || defined.has(w) || !hard(raw)) continue;
      seen.add(w);
      unglossed.push(raw);
    }
    if(unglossed.length >= 4){
      fail(`the opening card uses ${unglossed.length} term(s) the game never defines: ${unglossed.join(', ')}`);
    }else if(unglossed.length){
      note(`the opening card uses ${unglossed.length} undefined term(s): ${unglossed.join(', ')}`);
    }
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
