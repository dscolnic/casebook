// import-book.mjs — build a theme from one authored book file.
//
//   node tools/import-book.mjs <book.yml> <theme> [--dry] [--verify]
//
// The two docx importers exist because two games arrived as Word documents, and
// each needed its own parser for its own document shape. That road ends badly:
// a third book shape is a third parser, and everything the parser has to
// *infer* becomes a defect later. The hospital's 63 mis-typed lessons and
// Project Y's nine unreachable diagnosis packs both came out of inference.
//
// This reads a book that was written to be read. Everything the game needs is
// stated, including the things a design document cannot carry — the areas of
// study, the cast, the estimate specs, what is inside each room — and anything
// missing or contradictory is an error here, in the file the author is holding,
// rather than a panel that says "not yet implemented" six months on.
//
// See tools/BOOK_TEMPLATE.md for the format, with a worked example of each
// question format.
//
// Format 2 added what the three older games needed before they could be books at
// all: lessons no mission stop points at (the review variants a callback day
// reaches), a stop whose plan-card `call` differs from the question's own
// instruction, and the three shared blocks — `packs`, `specialRequests`,
// `estimatesByTitle`. `tools/export-book.mjs` writes one of these out of a game
// and `engine/dev/bookParity.mjs` proves the pair still agree.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parseYaml } from './yaml-lite.mjs';
import { themeDir } from '../engine/dev/registry.mjs';
import { pathToFileURL } from 'node:url';
import { claimedWords, claimsPhrase, conceptMatches, conceptZones, demandsEquation, deriveWork,
  EQUATIONS, keywordHit, pickKeyConcept, SYLLABUS } from './syllabus.js';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');

const [bookPath, themeName, ...flags] = process.argv.slice(2);
if(!bookPath || !themeName){
  console.error('usage: node tools/import-book.mjs <book.yml> <theme> [--dry] [--verify] [--out <dir>]');
  process.exit(2);
}
const dry = flags.includes('--dry');
// `--out` is what makes the parity check possible: import into a scratch
// directory and compare, without touching the theme that is being checked.
const outFlag = flags.indexOf('--out');
const outOverride = outFlag >= 0 ? flags[outFlag + 1] : null;

// One list, in the engine. This was a second copy for as long as there were
// eight formats, and the ninth is what found it: the book was refused for a
// format the renderer already had.
import { FORMATS, SUSPENDED_FORMATS } from '../engine/content/normalize.js';
const canonical = (t) => String(t ?? '').toUpperCase().replace(/[\s_-]+/g, '');

const problems = [];
const warnings = [];
const fail = (m) => problems.push(m);
const warn = (m) => warnings.push(m);

// ------------------------------------------------------------------- read
const raw = readFileSync(resolve(process.cwd(), bookPath), 'utf8');
const book = bookPath.endsWith('.json') ? JSON.parse(raw) : parseYaml(raw);

/**
 * The theme's own place, loaded once.
 *
 * Every other check in this file reads the book and nothing else, which is the
 * right instinct and is not enough for TRIAL: its trap is that the authored gate
 * order might be the nearest-neighbour walk from the spawn, and that is a fact
 * about the ground rather than about the book. A route whose correct order is
 * also the fastest line is a route that grades geometry, and it looks perfect on
 * the page.
 *
 * Loaded here rather than inside the format branch because `gameFor` is
 * synchronous. Missing or unloadable is not a failure by itself — a theme with
 * no TRIAL never needs it — and the TRIAL branch says so plainly when it does.
 */
let SITE = null;
try{
  const sitePath = resolve(themeDir(themeName), 'site.js');
  if(existsSync(sitePath)){
    const mod = await import(pathToFileURL(sitePath).href);
    SITE = mod.site ?? mod.default ?? null;
  }
}catch(e){ SITE = null; }

const T = book.theme ?? {};
const groups = book.groups ?? [];
const roster = book.roster ?? [];
const leaders = book.leaders ?? [];
const missions = book.missions ?? [];

if(!groups.length) fail('no groups: the areas of study are a design decision and have to be stated');
if(!missions.length) fail('no missions');

// ------------------------------------------------------------- the groups
const groupIds = new Set();
const GROUPS = groups.map((g, i) => {
  if(!g.id) fail(`group ${i + 1} has no id`);
  if(groupIds.has(g.id)) fail(`duplicate group id "${g.id}"`);
  groupIds.add(g.id);
  const milestones = (g.milestones ?? []).map((m, k) => (
    typeof m === 'string'
      ? { name: m, cost: 12 + k * 4, work: 9 + k * 3, brief: m }
      : { name: m.name, cost: m.cost ?? 12 + k * 4, work: m.work ?? 9 + k * 3, brief: m.brief ?? m.name }
  ));
  if(milestones.length !== 4){
    fail(`group "${g.id}" has ${milestones.length} milestones; the readiness track is built around 4`);
  }
  return {
    id: g.id, code: g.code ?? g.id, name: g.name ?? g.id,
    color: g.color ?? '#5b6068', difficulty: g.difficulty ?? 3,
    type: canonical(g.format ?? g.type ?? 'protocol').toLowerCase(),
    desc: g.desc ?? '', defaultLeader: g.defaultLeader ?? leaders[0]?.id ?? roster[0]?.id ?? '',
    budget: g.budget ?? 70, milestones,
    issuePool: g.issues ?? ['A result and a record disagree.', 'A step was skipped.'],
  };
});

// -------------------------------------------------------------- the cast
const ROSTER = roster.map((p) => {
  if(!p.id || !p.name) fail(`a roster entry is missing an id or a name`);
  if(!p.division) fail(`roster "${p.id ?? p.name}" has no division — every person stop in that area would be unreachable`);
  else if(!groupIds.has(p.division)) fail(`roster "${p.id}" is in unknown group "${p.division}"`);
  const bio = String(p.bio ?? '').trim();
  if(bio.length < 40){
    warn(`roster "${p.id}": bio is ${bio.length} characters — under about forty, the passage question degrades to a role question`);
  }
  const quiz = (p.quiz ?? []).filter((q, i) => {
    const ok = q?.q && q?.a && Array.isArray(q.wrong) && q.wrong.filter(w => w && w !== q.a).length >= 3;
    if(!ok) fail(`roster "${p.id}" quiz item ${i + 1} needs q, a and three distinct wrong answers`);
    return ok;
  });
  return {
    id: p.id, name: p.name, role: p.role ?? '', division: p.division,
    color: p.color ?? GROUPS.find(g => g.id === p.division)?.color ?? '#5b6068',
    bio: bio.split(/\n{2,}/).map(s => `<p>${s.replace(/\n/g, ' ').trim()}</p>`).join(''),
    ...(quiz.length ? { quiz } : {}),
  };
});
for(const g of GROUPS){
  if(!ROSTER.some(p => p.division === g.id)){
    fail(`group "${g.id}" has nobody on the roster — its person stops are unreachable`);
  }
}
const LEADERS = leaders.length ? leaders : GROUPS.map(g => {
  const p = ROSTER.find(x => x.id === g.defaultLeader) ?? ROSTER.find(x => x.division === g.id);
  return { id: p?.id ?? g.id, name: p?.name ?? g.name, role: p?.role ?? '',
           science: 4, management: 4, trait: '' };
});

// ------------------------------------------------- the lessons and missions
// A lesson lives at the stop that uses it. The docx books keep a separate
// curriculum and have the missions index into it, which is one more thing that
// can drift; here the index is derived, so it cannot.
const CURRICULUM = Object.fromEntries(GROUPS.map(g => [g.id, []]));
const BALLPARK_CALCS = {};
const MISSIONS = [];

/**
 * Add one lesson to its group and return where it landed.
 *
 * Shared by a mission's stops and by the book's `lessons:` block, which is how a
 * review variant reaches the game: normalize.js finds "<title> — Review" by
 * title when a callback day wants it, so an unattached lesson is content, not a
 * spare part. The day number is the position in the group, so the mission stops
 * are laid down first and the unattached ones follow — mission indices cannot
 * move when a review variant is added or removed.
 */
/**
 * Which of the course's essential equations this question deals with.
 *
 * Stamped here, at import, for the same reason `core` is: the list lives in
 * `tools/syllabus.js`, which is authoring data, and the runtime should read a
 * lesson rather than reach back into the tools directory for a syllabus.
 *
 * `computed` is the distinction the whole equation audit turns on — a question
 * that gets a number out of an equation has taught it, and one that only says the
 * words has not. The plan card and the question card both need to know which,
 * because a mention deserves the equation printed where the player can see it far
 * more than a computation does.
 */
function equationsFor(s, game, assumes){
  const list = EQUATIONS[themeName] ?? [];
  if(!list.length) return [];
  const lbl = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
  const flat = (parts) => ' ' + parts.filter(Boolean).map(String).join('  ')
    .toLowerCase().replace(/\s+/g, ' ') + ' ';
  // The arithmetic on its own: what the player fills in and what the answer is
  // worked out from.
  const formula = flat([game.relationship, game.template, game.solution,
    // A TALLY assembles its combination out of counts the player took. That is the
    // equation being performed, not mentioned, and it was being read as prose:
    // converting day 9's estimate to a TALLY quietly demoted CHSH to decoration.
    game.tally?.formula, game.tally?.formulaLabel,
    ...(game.tally?.settings ?? []).map(x => x.label),
    // And a DERIVE is arithmetic all the way down — the lines the player chose and
    // the rule each one is licensed by. `deriveWork` takes the correct branch only.
    ...deriveWork(game),
    ...(game.givens ?? [])]);
  const text = flat([s.title, s.scene, s.story, s.takeaway, game.question, game.task, game.why,
    game.headline, game.setup, game.prompt, game.explanation, game.answer,
    ...(game.cards ?? []).map(lbl), ...(game.choices ?? []).map(lbl),
    ...(game.scenarios ?? []).map(lbl), ...(game.proposals ?? []).map(lbl),
    ...(game.rebuttals ?? []).map(lbl), ...(game.givens ?? []).map(lbl),
    ...(game.readings ?? []).flatMap(r => [r?.label, r?.name, r?.note, r?.purpose]),
    ...assumes]);
  // The shared matcher, not a copy of it. This file had its own, and the two drifted
  // the moment `keywordHit` learned that `3 : 1` and `3:1` are the same ratio: the
  // delivery gate saw a computed equation while the importer stamped it as merely
  // mentioned, so one converted stop was both teaching the monohybrid ratio and
  // reported as asking a derived equation before its base. One rule, one function.
  const hit = keywordHit;
  // What this card puts in front of the player. An equation the options and the
  // verdict work numbers with is not decoration on an early day — it is the tool
  // the question is asked with, and dropping it is how Blackout's day 1 came to
  // print the turns ratio while asking for P = IV and P = I²R. `demandsEquation`
  // is the test, and `engine/dev/equationSupply.mjs` fails the theme when nothing
  // supplies one.
  const shown = flat([game.answerText, game.answer, game.why, game.explanation, game.solution,
    ...(game.rebuttals ?? []).map(lbl), ...(game.choices ?? []).map(lbl)]);
  const out = [];
  for(const eq of list){
    const computed = eq.k.some(k => hit(formula, k));
    if(!computed && !eq.k.some(k => hit(text, k))) continue;
    const demanded = !computed && demandsEquation(eq, shown);
    // v and s ride along because the card has to define the symbols where it
    // shows the equation. A formula whose letters are never named teaches
    // nobody anything they did not already know.
    out.push({ e: eq.e, c: eq.c, ...(eq.v ? { v: eq.v } : {}), ...(eq.s ? { s: eq.s } : {}),
      ...(computed ? { computed: true } : {}), ...(demanded ? { demanded: true } : {}) });
  }
  return out;
}

/**
 * A key that documents the stop rather than feeding it.
 *
 * `dataProvenance` says which of a stop's numbers were invented for the game and
 * which came from a source — real information, and worth keeping in a public
 * health game whose safety framing depends on nobody mistaking a classroom value
 * for a measurement. It is authored on nine Outbreak stops, inside the format's
 * own data block, and it has never reached a screen: the importer maps the keys
 * each format needs and this was not one of them, so it was dropped on the way in
 * and `fieldCoverage` could not see it — that tool reads the content against the
 * renderers, and a key the importer drops is not in the content to be uncovered.
 *
 * Refused rather than rendered, because it is a note to the next author and not a
 * sentence for the player, and refused rather than ignored, because a silently
 * dropped key is how it went nine stops without anybody noticing. `yaml-lite`
 * skips comments and the books already carry 122 of them, so the note keeps every
 * word it had one line higher up.
 */
function refuseAuthorNotes(s, at){
  const seen = [];
  const walk = (v, path) => {
    if(!v || typeof v !== 'object') return;
    if(Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
    for(const [k, val] of Object.entries(v)){
      if(k === 'dataProvenance') seen.push(path ? `${path}.${k}` : k);
      else walk(val, path ? `${path}.${k}` : k);
    }
  };
  walk(s, '');
  if(seen.length){
    fail(`${at}: \`dataProvenance\` at ${seen.join(', ')} reaches no screen — the importer`
      + ' maps the keys each format needs and this is not one of them, so it has been dropped'
      + ' on the way in since it was written. It is a note to the next author rather than a'
      + ' sentence for the player: move it one line up as a `#` comment, which the parser'
      + ' skips and which keeps every word of it.');
  }
}

/**
 * `concept:` on a stop — the syllabus concept the card names, stated by the author
 * rather than guessed.
 *
 * The pick was derived for its whole life: `pickKeyConcept` scores keyword hits by
 * where they landed and how rare they are, and its own comment calls the field "the
 * concept this stop is most likely about". On Blackout nine of the 41 stamped cards
 * name the wrong concept, and three of those nine are not reachable by keyword at
 * all — a stop whose subject is synchronising because four quantities have to agree
 * says none of the syllabus's words for it. No matcher was ever going to find them,
 * and until the book could say so there was nothing for a sequencing check to read
 * either: a gate on a derived field grades the matcher, not the course.
 *
 * Accepts the concept's number on the theme's syllabus or its exact title. Anything
 * else is REFUSED rather than dropped — a near-miss title silently falling back to
 * the picker is indistinguishable from having authored nothing, which is how CHAIN's
 * `reading` went four books without reaching a screen.
 */
function authoredConcept(value, at){
  const list = (SYLLABUS[themeName] ?? SYLLABUS[String(themeName).replace(/_/g, '-')])?.concepts;
  if(!list?.length){
    fail(`${at}: \`concept:\` needs a syllabus for "${themeName}" in tools/syllabus.js`);
    return null;
  }
  const raw = String(value ?? '').trim();
  const n = /^\d+$/.test(raw) ? +raw : list.findIndex(c => c.c === raw) + 1;
  if(!n || n < 1 || n > list.length){
    fail(`${at}: \`concept: ${raw}\` is not on the ${themeName} syllabus — give the number`
      + ` 1–${list.length}, or the concept's exact title`);
    return null;
  }
  const won = list[n - 1];
  // A concept with no authored `t` used to be refused here, on the argument that
  // asking for the door by name and getting silence is worse than not asking. That
  // was written when a claim and a door were the same thing. They are not any more:
  // the claim is what `conceptOrder` reads and the door is what the player opens, so
  // authoring a claim ahead of its two sentences is exactly how a course gets
  // sequenced before its 26,000 words of curriculum prose are written. Counted and
  // reported, not refused — the card renders as it did before.
  return { n, c: won.c, ...(won.t ? { t: won.t } : { _noDoor: true }) };
}

const asList = (v) => (Array.isArray(v) ? v : [v]).map(x => String(x ?? '').trim()).filter(Boolean);

function addLesson(s, at){
  refuseAuthorNotes(s, at);
  if(!groupIds.has(s.group)) fail(`${at}: unknown group "${s.group}"`);
  const lessons = CURRICULUM[s.group] ?? [];
  const day = lessons.length + 1;
  const game = gameFor(s, at, s.group, day);
  const scene = String(s.scene ?? '').trim();
  if(scene.length < 40) fail(`${at}: the scene is missing or too thin to reason from`);
  const takeaway = String(s.takeaway ?? '').trim();
  if(!takeaway) fail(`${at}: no takeaway`);
  if(takeaway && game.why && takeaway === String(game.why).trim()){
    fail(`${at}: the takeaway repeats the "why", so the intro gives the answer away`);
  }
  const assumes = Array.isArray(s.assumes) ? s.assumes.map(a => String(a).trim()).filter(Boolean) : [];
  // ---------------------------------------------------------- two paragraphs
  //
  // `guide` is the second paragraph on the card: what the player has to DO. It
  // exists because the card grew to six blocks — the situation, the assumptions,
  // the principle, a row of syllabus equation chips, a row of glossary chips, and
  // then the panel's own three lines — and on a live instrument a player could not
  // tell which of them was the instruction. `background` is the door for
  // everything true but not urgent, printed as prose rather than as chips.
  //
  // Both optional, and a stop with neither renders exactly as before.
  const guide = String(s.guide ?? '').trim();
  // `rules` is how the panel is SCORED, behind a door of its own. SCIENCETANK is
  // what it was written for: its guide used to be the spending rules — commit
  // eighty of the hundred, thirty-five or more on one proposal — which is the
  // grading and not the reading, and it stood in the place the evidence should
  // have had. A tank stop now carries the evidence as its guide and the rules
  // here, and the panel drops its own "Evidence available" disclosure so the same
  // prose is not printed twice.
  const rules = String(s.rules ?? '').trim();
  if(rules && rules.split(/\s+/).length > 130){
    fail(`${at}: \`rules\` is ${rules.split(/\s+/).length} words — it is the panel's scoring`
      + ' rule behind a button, not the course material');
  }
  const background = (Array.isArray(s.background) ? s.background
    : s.background ? [s.background] : []).map(b => String(b ?? '').trim());
  if(background.some(b => !b)) fail(`${at}: an empty \`background\` paragraph`);
  // A guide that runs to a screenful is the thing it was meant to replace.
  if(guide && guide.split(/\s+/).length > 130){
    fail(`${at}: \`guide\` is ${guide.split(/\s+/).length} words — it is one paragraph saying`
      + ' what to do; the course material belongs in `background`');
  }
  // The panel's own three lines are suppressed on a stop that carries a guide, so
  // a hint authored beside one would never be shown. Refused rather than dropped:
  // a silently ignored key is how CHAIN's `reading` went four books without ever
  // reaching a screen.
  for(const blk of ['sweep', 'holdout', 'tally', 'probe']){
    if(guide && s[blk] && (s[blk].hint || s[blk].goals)){
      fail(`${at}: \`${blk}.hint\`/\`${blk}.goals\` sit beside a \`guide\`, which replaces both`
        + ' on the panel — fold them into the guide, or drop the guide');
    }
  }
  lessons.push({
    day, title: s.title ?? s.task ?? `${s.group} ${day}`, scene, takeaway,
    ...(s.concept !== undefined ? { _conceptAuthored: authoredConcept(s.concept, at) } : {}),
    ...(s.takesAsRead !== undefined ? { _takesAsRead: { at, names: asList(s.takesAsRead) } } : {}),
    place: s.place ?? '',
    ...(guide ? { guide } : {}),
    ...(rules ? { rules } : {}),
    ...(background.length ? { background } : {}),
    // `story` is the longer form of the situation where a book carries one, and
    // the scene otherwise. The engine reads it before the scene.
    story: String(s.story ?? scene).trim(),
    game,
    ...(assumes.length ? { assumes } : {}),
    ...(() => {
      const eqs = equationsFor(s, game, assumes);
      return eqs.length ? { equations: eqs } : {};
    })(),
    // The candidates only. Which one wins needs the whole campaign — see the
    // key-concept pass below — and the field is deleted once it has been picked.
    _conceptHits: conceptMatches(themeName, conceptZones(s, game, assumes), s.group),
  });
  CURRICULUM[s.group] = lessons;
  return { day, game, scene };
}

// ------------------------------------------------------ the book is not doubled
//
// A scripted edit to books/quantum.yml cloned seven missions — 1,000 lines — and
// EVERY check passed: the campaign was simply 22 missions long, each stop still
// valid, and bookParity was green because the content had been re-imported from
// the doubled book. It was found by eye, three edits later.
//
// Two invariants catch it, and both hold in all 28 books today: no two missions
// share a title, and no group teaches two lessons on the same day. Neither is a
// style rule — a repeated mission title means the same day exists twice, and a
// group with two day-7 lessons cannot be laid out on a calendar.
{
  const titles = new Map();
  for(const [i, m] of missions.entries()){
    const t = String(m.title ?? '').trim();
    if(!t) continue;
    if(titles.has(t)) fail(`mission ${i + 1} repeats the title of mission ${titles.get(t) + 1}`
      + ` ("${t}") — a duplicated block, or two missions that need different names`);
    titles.set(t, i);
  }
  const slots = new Map();
  for(const [i, m] of missions.entries()){
    for(const s of m.stops ?? []){
      const key = `${s.group}-${m.day ?? i + 1}`;
      // A warning, not a failure. No book does it today, but `shapeMissions` is
      // built to handle a day that calls at one area twice — it makes the repeat a
      // person stop — so failing here would ban a shape the engine supports. The
      // duplicate-title check above is what catches a cloned block.
      if(slots.has(key)) warn(`two stops teach ${s.group} on the same day`
        + ` (missions ${slots.get(key) + 1} and ${i + 1}) — check for a duplicated mission`);
    }
    for(const s of m.stops ?? []) slots.set(`${s.group}-${m.day ?? i + 1}`, i);
  }
}

missions.forEach((m, mi) => {
  const label = `mission ${mi + 1} ("${m.title ?? '?'}")`;
  const stops = m.stops ?? [];
  if(stops.length !== 3) warn(`${label} has ${stops.length} stops; the loop is built around 3`);

  const outStops = stops.map((s, si) => {
    const at = `${label} stop ${si + 1}`;
    const { day } = addLesson(s, at);
    // `why` is the answer's reasoning and belongs in the verdict. The engine's
    // `stop.why` is something else entirely — the line shown ABOVE the question
    // saying why this stop matters now — so copying one into the other printed
    // the reasoning before the question and gave the answer away. A book that
    // wants to write that line uses `motivation`.
    //
    // `call` is the plan card's line for this stop where it differs from the
    // question's own instruction. One string served both in the hand-written
    // books; the docx games always had two.
    return {
      group: s.group, lesson: day - 1, task: s.call ?? s.task ?? s.title ?? '',
      ...(s.motivation ? { why: s.motivation } : {}),
    };
  });

  MISSIONS.push({
    title: m.title ?? `Mission ${mi + 1}`,
    objective: m.objective ?? '',
    briefing: m.briefing ?? '',
    stake: m.stake ?? '',
    // The terms and relationships the day's questions assume, printed on the
    // plan card between the calls and the map.
    ...(Array.isArray(m.primer) ? { primer: m.primer } : {}),
    takeaway: m.takeaway ?? '',
    stops: outStops,
  });
});

// Lessons no mission stop points at, laid down after every mission lesson so no
// mission index depends on them. A callback day reaches a "— Review" variant by
// title; the rest are spares a re-shaped campaign can use.
(book.lessons ?? []).forEach((s, i) => addLesson(s, `unattached lesson ${i + 1} ("${s.title ?? s.task ?? '?'}")`));

/**
 * Equations are not introduced before the day they are first needed, and no stop
 * shows more than two.
 *
 * `equationsFor` attaches an equation to any stop whose prose mentions it, which
 * is right for a stop that uses it and wrong everywhere else. The cost was
 * measured rather than guessed: Quantum's day 1 displayed four equations and used
 * one. Its third stop is a judgement call that computes nothing, and because its
 * prose mentions coherence and benchmarking it carried the two decay relations and
 * the fidelity product — the heaviest formulas in the course — on the opening day,
 * five and seven days before anything asks for them.
 *
 * Two rules, applied here because both need to see the whole campaign:
 *
 *   · an equation the stop does not compute is dropped from any day before the
 *     day it is first computed — UNLESS the stop's own arithmetic uses it. It
 *     stays from that day onward, where it is context for something the player has
 *     now done.
 *
 *     The exception is the whole of `engine/dev/equationSupply.mjs`. Dropping the
 *     chip is right for a stop that merely names an equation and wrong for one
 *     that works numbers with it: Blackout's day 1 asks what stepping 20 kV to
 *     400 kV does to current and to loss, its four options are that arithmetic,
 *     and the drop left the card showing the turns ratio — which the question
 *     never uses — with P = IV and P = I²R nowhere for another three days. A
 *     player reading "loss falls by 400×" needs the equation, not a note that it
 *     is coming. `demandsEquation` is the test, shared with the checker.
 *   · at most two per stop, computed ones first, then the ones already introduced.
 *     A card with four formulas on it is a card nobody reads.
 *
 * An equation no question ever computes — a conceptual identity like the surface
 * code's qubit count — is exempt from the first rule and subject to the second.
 */
(() => {
  const dayOfLesson = new Map();
  MISSIONS.forEach((m, mi) => (m.stops ?? []).forEach(st => {
    dayOfLesson.set(`${st.group}:${st.lesson}`, mi + 1);
  }));
  const firstComputed = new Map();
  for(const [group, lessons] of Object.entries(CURRICULUM)){
    lessons.forEach((l, li) => {
      const day = dayOfLesson.get(`${group}:${li}`);
      if(!day) return;
      for(const eq of (l.equations ?? [])){
        if(!eq.computed) continue;
        const prev = firstComputed.get(eq.e);
        if(prev === undefined || day < prev) firstComputed.set(eq.e, day);
      }
    });
  }
  let dropped = 0, capped = 0;
  for(const [group, lessons] of Object.entries(CURRICULUM)){
    lessons.forEach((l, li) => {
      if(!l.equations?.length) return;
      const day = dayOfLesson.get(`${group}:${li}`) ?? Infinity;
      const kept = l.equations.filter(eq => {
        if(eq.computed) return true;
        const first = firstComputed.get(eq.e);
        if(first === undefined) return true;      // never computed anywhere
        if(day >= first) return true;
        if(eq.demanded) return true;              // the card's own arithmetic uses it
        dropped++;
        return false;
      });
      // Computed first, then the ones this card's arithmetic uses, then the rest —
      // because the two-per-stop cap turns the third chip into `card: false`, and
      // capping away the equation the question is worked from is the defect this
      // exception was added to fix.
      const rank = (eq) => (eq.computed ? 2 : eq.demanded ? 1 : 0);
      kept.sort((a, b) => rank(b) - rank(a));
      if(kept.length > 2){ capped += kept.length - 2; }
      // Past the second one, `card: false` rather than gone. Four formulas on one
      // card is a card nobody reads, but a stop that computes three has computed
      // three, and deleting the third told `equationOrder` that Blackout's RMS
      // convention arrives eleven days after the question that already used it.
      kept.forEach((eq, i) => { if(i >= 2) eq.card = false; });
      if(kept.length) l.equations = kept; else delete l.equations;
    });
  }
  if(dropped || capped){
    console.log(`  equations: ${dropped} dropped as early, ${capped} trimmed past two per stop`);
  }
})();

/**
 * ---------------------------------------------------- the key concept, per stop
 *
 * The card names ONE syllabus concept and says what it is for. Stamped here for
 * the same reason `equations` is: the list lives in `tools/syllabus.js`, which is
 * authoring data, and the runtime reads a lesson rather than reaching back into
 * the tools directory for a syllabus.
 *
 * Two things have to be true and only this pass can see either:
 *
 *   · RARITY. A concept twenty stops mention is the course's background hum and a
 *     concept three stops mention is what those three are for, so the pick is
 *     scored against how many stops in this campaign match it. That count does
 *     not exist until every lesson is in.
 *   · A TAKEAWAY TO SHOW. The button opens onto the concept's own two sentences.
 *     A course whose syllabus has not been written yet stamps nothing, and the
 *     card renders exactly as it did before — an empty door is worse than none,
 *     and it teaches a player not to press the next one.
 *
 * `conceptMatches` already applied the zone floor, so a concept that appears only
 * in a distractor's label cannot be picked. What is left is genuinely arguable
 * rather than wrong: on Blackout the sweep puts two of 41 stops on a neighbouring
 * concept, and the honest description of this field is "the concept this stop is
 * most likely about", not "the concept this stop is about".
 */
(() => {
  const list = (SYLLABUS[themeName] ?? SYLLABUS[String(themeName).replace(/_/g, '-')])?.concepts ?? [];
  const total = list.length;
  const touched = new Map();
  for(const lessons of Object.values(CURRICULUM)){
    for(const l of lessons){
      for(const c of (l._conceptHits ?? [])) touched.set(c.n, (touched.get(c.n) ?? 0) + 1);
    }
  }
  let stamped = 0, bare = 0, none = 0, authoredCount = 0, asReadCount = 0, authoredNoDoor = 0;
  for(const lessons of Object.values(CURRICULUM)){
    for(const l of lessons){
      const hits = l._conceptHits ?? [];
      const authored = l._conceptAuthored ?? null;
      const asRead = l._takesAsRead ?? null;
      delete l._conceptHits;
      delete l._conceptAuthored;
      delete l._takesAsRead;
      const won = authored ?? pickKeyConcept(hits, touched);
      // ------------------------------------------------ what the stop takes as read
      //
      // `takesAsRead` names the syllabus concepts a stop is entitled to expect the
      // player already has. It exists because the ordering rule is otherwise
      // unsatisfiable: day 1 can only ever teach a concept with no prerequisites, and
      // a course that follows AP Physics 1 is allowed to open on frequency without
      // first teaching what a volt is. What it is not allowed to do is assume it
      // silently, which is what all 26 of Blackout's did.
      //
      // Two refusals, and the second is the one that keeps the field honest. An
      // unknown title is refused, as everywhere else. And a concept that is NOT a
      // prerequisite of what this stop claims is refused too: without that, the field
      // becomes a place to park anything, and — worse — a declaration left behind by a
      // re-claimed stop would go on excusing a prerequisite the stop no longer has.
      // A stale exemption is indistinguishable from a considered one.
      if(asRead){
        if(!won){
          fail(`${asRead.at}: \`takesAsRead\` on a stop whose concept could not be resolved`
            + ' — name the concept it claims first, with `concept:`');
        } else {
          const mine = list[won.n - 1];
          const prereqs = mine?.needs ?? [];
          const resolved = [];
          for(const name of asRead.names){
            const idx = list.findIndex(c => c.c === name);
            if(idx < 0){
              fail(`${asRead.at}: \`takesAsRead: ${name}\` is not on the ${themeName} syllabus`
                + " — give a concept's exact title");
              continue;
            }
            if(!prereqs.includes(name)){
              fail(`${asRead.at}: \`takesAsRead: ${name}\` is not something "${mine.c}" is built out of`
                + `${prereqs.length ? ` (it needs ${prereqs.map(x => `"${x}"`).join(', ')})` : ' (it needs nothing)'}`
                + ' — a declaration the claim does not need is one nothing will ever check');
              continue;
            }
            resolved.push({ n: idx + 1, c: name });
          }
          if(resolved.length){
            l.takesAsRead = resolved;
            // Visible, not merely declared. `assumes` is what the card prints under the
            // background door, so the sentence a player can read and the fact a checker
            // reads are the same authored line rather than two that can drift apart.
            l.assumes = [...(l.assumes ?? []),
              ...resolved.map(r => `${r.c.charAt(0).toLowerCase()}${r.c.slice(1)} — taken as read`)];
            asReadCount += resolved.length;
          }
        }
      }
      if(!won){ none++; continue; }
      // No authored takeaway, no door. See above.
      // A CLAIM IS RECORDED EVEN WITHOUT ITS TWO SENTENCES.
      //
      // It used to `continue` here, so a concept with no `t` stamped nothing at all —
      // and since 660 of the 724 concepts across the catalogue have no `t` yet, that
      // meant 26 of 28 courses claimed nothing and `conceptOrder` had nothing to read.
      // The player-facing rule is unchanged and is the reason for the original skip:
      // `askConceptHTML` returns nothing without `t`, so an empty door still cannot
      // appear. What is separated now is "the course is in a teachable order", which
      // is checkable today, from "the card explains the idea", which is 26,000 words
      // of curriculum prose and a different backlog.
      if(!won.t) bare++;
      // `of` rather than the course's name: the card says where the concept sits on
      // the syllabus, and repeating a sixty-character course title on every lesson
      // would put it in the generated content forty-five times over.
      // `rests` is what the concept is built out of, by title, so the card can say it.
      // The NUMBER is deliberately not printed any more — see questionUI.
      l.concept = { n: won.n, c: won.c, ...(won.t ? { t: won.t } : {}), of: total,
        ...(list[won.n - 1]?.needs?.length ? { rests: [...list[won.n - 1].needs] } : {}) };
      stamped++;
      if(authored) authoredCount++;
      if(authored && authored._noDoor) authoredNoDoor++;
    }
  }
  if(stamped || bare || none){
    console.log(`  key concept: ${stamped} stamped (${authoredCount} authored,`
      + ` ${stamped - authoredCount} picked), ${none} stop(s) match none`
      + (bare ? `, ${bare} with no takeaway written yet (claim recorded, no door)` : '')
      + (asReadCount ? `; ${asReadCount} prerequisite(s) declared as prior knowledge` : '')
      + (authoredNoDoor ? `; ${authoredNoDoor} authored claim(s) await a \`t\`` : ''));
  }
})();

/** One stop's question, checked against what its format actually needs. */
/**
 * Every number a tile label could be read as: 10²², 1/2, 3.0e8, "12 million",
 * a typeset minus. A label is written for a person and arrives in all of those,
 * so the test is "does any reading match the value", not "is it spelled the way
 * the value is". `engine/dev/validateContent.mjs` runs the same comparison over
 * content that is already imported.
 */
function labelNumbers(label){
  // Inside the function, not beside it: this file does its work during module
  // evaluation, so a `const` at file scope is in the temporal dead zone when the
  // first lesson is read. Same trap as house rule 13, one file over.
  const SUPERSCRIPT = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-', '⁺': '+' };
  // Listed rather than ranged: superscript one, two and three are Latin-1 and
  // sit outside U+2070–U+2079, which is exactly the exponents physics uses most.
  const text = String(label).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g, c => SUPERSCRIPT[c] ?? c)
    .replace(/[\u2212\u2013\u2014]/g, '-')
    .replace(/×\s*10\s*\^?/g, 'e');
  const out = [];
  const pow = text.match(/(?:^|[^\d.])10\s*\^?\s*(-?\d+)/);
  if(pow) out.push(Math.pow(10, Number(pow[1])));
  const frac = text.match(/(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if(frac) out.push(Number(frac[1]) / Number(frac[2]));
  const sci = text.match(/-?\d+(?:\.\d+)?e[+-]?\d+/i);
  if(sci) out.push(Number(sci[0]));
  const plain = text.match(/-?\d[\d,]*(?:\.\d+)?/);
  if(plain){
    const n = Number(plain[0].replace(/,/g, ''));
    const scale = /\bbillion\b/i.test(text) ? 1e9 : /\bmillion\b/i.test(text) ? 1e6
      : /\bthousand\b/i.test(text) ? 1e3 : 1;
    out.push(n, n * scale, n / 100);
  }
  return out.filter(Number.isFinite);
}

function gameFor(s, at, group, day){
  const format = canonical(s.format);
  if(!FORMATS.has(format)){
    fail(`${at}: format "${s.format}" has no renderer (one of ${[...FORMATS].join(', ')})`);
  }
  // A suspended format has a renderer and is refused anyway. The list and the
  // reason are in engine/content/normalize.js; deleting the line lifts it.
  if(SUSPENDED_FORMATS[format]){
    fail(`${at}: format "${format}" is suspended and cannot be authored — `
      + `${SUSPENDED_FORMATS[format]}. Pick another format, or lift the suspension in `
      + 'engine/content/normalize.js once it is fixed.');
  }
  const base = {
    type: format, title: s.title ?? '', setup: s.setup ?? s.place ?? '',
    play: s.task ?? s.question ?? '', task: s.task ?? s.question ?? '',
    question: s.question ?? s.task ?? '',
    // `answer` is the printed key. Most formats derive it from their own fields;
    // `answerText` is for a book that carries a worked one — a docx game's
    // "1. X → Y 2. …" line, which the printed book reproduces verbatim.
    answer: s.answerText ?? (typeof s.answer === 'string' ? s.answer : '') ?? '', why: s.why ?? '',
    ...(s.rebuttals ? { rebuttals: s.rebuttals } : {}),
    // Any format can carry an instrument. It used to be passed through for
    // DIAGNOSIS only, which is why a line chart on a sequence item was dropped
    // silently on import.
    ...(s.figure ? { figure: s.figure } : {}),
    // THE ARITHMETIC AN INSTRUMENT STOP DOES, STATED BY THE AUTHOR.
    //
    // `relationship` used to be read only out of an `estimate:` block, so it was
    // a BALLPARK field in practice. But `curriculumDelivery` decides whether the
    // course TAUGHT an equation by looking at exactly this string plus the
    // template, the worked solution, a DERIVE's lines and an instrument board's
    // own numbers — and a board's numbers are bare quantities, so a VERIFY that
    // predicts a volt drop from Ohm's law had no way to say so. The equation was
    // computed on the screen and uncomputed as far as every gate could tell.
    //
    // It was already being authored at stop level: books/redsand-ms.yml writes
    // one on a BALANCE, where it has been silently dropped since the day it was
    // written. That is this repo's own rule about a key that never reaches the
    // game, so it is carried for every format rather than aliased into the
    // estimate block for one.
    ...(s.relationship ? { relationship: String(s.relationship) } : {}),
  };
  const need = (cond, msg) => { if(!cond) fail(`${at}: ${msg}`); };

  // ------------------------------------------------------------ panel words
  //
  // The two lines every instrument panel prints before it asks anything — an
  // authored hint, and "what counts as done" — for the four formats that live in
  // questionUI.js rather than instruments.js. They were unauthorable: three of
  // the four hardcoded their hint, and none printed a goal at all, so a book
  // could not explain its own panel. A player got as far as Quantum's HOLDOUT
  // and could not tell what either of its two data sets was.
  //
  // Both optional. The engine keeps its own wording where a book says nothing,
  // and `goals` is a list because a criterion with two halves reads as two lines.
  const panelWords = (blk) => {
    const goals = blk.goals === undefined ? []
      : (Array.isArray(blk.goals) ? blk.goals : [blk.goals]).map(g => String(g ?? '').trim());
    need(goals.every(Boolean), 'a `goals` entry is empty — say what counts as done, or drop the key');
    return {
      ...(blk.hint ? { hint: String(blk.hint) } : {}),
      ...(goals.length ? { goals } : {}),
    };
  };

  if(format === 'SWEEP'){
    // A continuous control the player moves while an instrument answers. The
    // book authors the axis, the response as sampled points, and the feature to
    // find; the renderer builds the trace as the handle moves. Everything a
    // reader needs to see it on paper is here too, which is why the response is
    // authored rather than computed from a formula the printed book cannot run.
    const w = s.sweep ?? {};
    const axis = w.axis ?? {};
    need(Number.isFinite(+axis.min) && Number.isFinite(+axis.max) && +axis.max > +axis.min,
      'sweep needs axis.min and axis.max, with max greater than min');
    // One curve, or several that trade off against each other. `mode: boundary`
    // is the second kind: the control is a decision line and each series is a
    // cost that moving it makes worse. The player is meant to discover that no
    // position makes both small, which is why the format cannot simply mark an
    // optimum.
    const series = Array.isArray(w.series) && w.series.length
      ? w.series
      : [{ label: w.readout?.label ?? '', response: w.response }];
    need(series.every(x => Array.isArray(x.response) && x.response.length >= 4),
      'every sweep series needs at least four authored response points');
    need(series.every(x => x.response.every(p => Number.isFinite(+p.at) && Number.isFinite(+p.value))),
      'every sweep response point needs a numeric `at` and `value`');
    need(!w.mode || ['peak', 'boundary'].includes(w.mode),
      `sweep mode "${w.mode}" is not one of peak, boundary`);
    if(w.mode === 'boundary') need(series.length >= 2,
      'a boundary sweep needs at least two series — the costs it trades between');
    need(Number.isFinite(+w.target), 'sweep needs a numeric target');
    need(+w.target >= +axis.min && +w.target <= +axis.max, 'the sweep target is outside its own axis');
    need(Number.isFinite(+w.tolerance) && +w.tolerance > 0, 'sweep needs a positive tolerance');
    // Where the handle starts. A target sitting under the handle is answered by
    // not moving, which is the one way this format can be broken by default.
    const start = Number.isFinite(+w.start) ? +w.start : +axis.min;
    need(Math.abs(start - +w.target) > +w.tolerance,
      'the sweep starts on its own answer — move `start` away from `target`');
    // The verdict's "Correct answer" line comes from `answerText`, and a sweep
    // has no choices to fall back on: without it the player is told they were
    // wrong and never told what the reading should have been. All six of the
    // first sweeps shipped that way.
    need(String(s.answerText ?? '').trim(),
      'a sweep needs `answerText` — the reading, and what it means');
    // The target must not be printed anywhere the player reads before answering.
    // Four of the first six sweeps named it in their own scene, which turns
    // "find the feature" into "copy the number above the plot".
    const said = [s.scene, s.question, s.task, s.headline, ...(s.assumes ?? [])].join(' ');
    const shown = String(+w.target);
    need(!new RegExp(`(^|[^\\d.])${shown.replace('.', '\\.')}([^\\d]|$)`).test(said),
      `the sweep target ${shown} is printed in the scene or the question — the player can read`
      + ' the answer instead of finding it');
    return { ...base, sweep: {
      mode: w.mode ?? 'peak',
      axis: { label: axis.label ?? '', unit: axis.unit ?? '', min: +axis.min, max: +axis.max,
        step: Number.isFinite(+axis.step) ? +axis.step : (+axis.max - +axis.min) / 200 },
      readout: { label: w.readout?.label ?? '', unit: w.readout?.unit ?? '' },
      series: series.map(x => ({ label: x.label ?? '', unit: x.unit ?? '',
        response: x.response.map(p => ({ at: +p.at, value: +p.value })) })),
      // Kept for the single-curve case, which is most of them, so nothing
      // downstream has to branch to read one response.
      response: series[0].response.map(p => ({ at: +p.at, value: +p.value })),
      baseline: Number.isFinite(+w.baseline) ? +w.baseline : 0,
      target: +w.target, tolerance: +w.tolerance, start,
      commit: w.commit ?? 'Mark it',
      ...(w.floor ? { floor: String(w.floor) } : {}),
      ...panelWords(w),
    } };
  }

  if(format === 'HOLDOUT'){
    // Two score curves over one threshold axis, and a line the player freezes
    // between them. Graded on the held-out score, so the book has to make the
    // calibration curve genuinely tempting: a broad honest plateau and a narrow
    // spike off it that scores better on the fitting set and worse on the other.
    const h = s.holdout ?? {};
    const axis = h.axis ?? {};
    need(Number.isFinite(+axis.min) && Number.isFinite(+axis.max) && +axis.max > +axis.min,
      'holdout needs axis.min and axis.max, with max greater than min');
    for(const which of ['fit', 'test']){
      need(Array.isArray(h[which]) && h[which].length >= 5,
        `holdout needs at least five authored points in \`${which}\``);
      need(h[which].every(p => Number.isFinite(+p.at) && Number.isFinite(+p.value)),
        `every holdout ${which} point needs a numeric \`at\` and \`value\``);
    }
    need(Number.isFinite(+h.pass), 'holdout needs a numeric `pass` — the held-out score that counts');
    const bestFit = h.fit.reduce((a, b) => (b.value > a.value ? b : a));
    const testAtBestFit = h.test.reduce((a, b) =>
      (Math.abs(b.at - bestFit.at) < Math.abs(a.at - bestFit.at) ? b : a));
    // The whole lesson is that the best line on the fitting set is not the best
    // line on fresh data. A book where it is has built a question with no trap in
    // it, and the player learns the opposite of the intended point.
    need(testAtBestFit.value < +h.pass,
      `the holdout's best calibration score (at ${bestFit.at}) also passes on the held-out set,`
      + ' so chasing the sample costs nothing — the fitting curve needs a spike the other one lacks');
    const bestTest = h.test.reduce((a, b) => (b.value > a.value ? b : a));
    need(bestTest.value >= +h.pass, 'no position on the axis reaches the holdout `pass` score');
    need(String(s.answerText ?? '').trim(),
      'a holdout needs `answerText` — the honest number, and why it is lower');
    // The pass mark is grading slack on a number the player reports, so it stays
    // unprinted — knowing it invites freezing at the edge of it instead of
    // reasoning about which part of the curve survives a fresh batch. The panel
    // now prints an authored hint and an authored goal list, which is exactly
    // where it would leak first.
    // Everything the player reads before committing, which now includes the two
    // paragraphs and the background behind the button.
    const holdoutSays = [h.hint, ...(h.goals ?? []), h.fitNote, h.testNote,
                         s.scene, s.guide, ...(Array.isArray(s.background) ? s.background
                           : s.background ? [s.background] : []),
                         s.question, s.task].join(' ');
    const passShown = String(+h.pass);
    need(!new RegExp(`(^|[^\\d.])${passShown.replace('.', '\\.')}([^\\d]|$)`).test(holdoutSays),
      `the holdout pass mark ${passShown} is printed on the panel or the card — it is grading`
      + ' slack on a reported number, and a printed one is aimed at rather than reasoned about');
    return { ...base, holdout: {
      axis: { label: axis.label ?? '', unit: axis.unit ?? '', min: +axis.min, max: +axis.max,
        step: Number.isFinite(+axis.step) ? +axis.step : (+axis.max - +axis.min) / 200 },
      fit: h.fit.map(p => ({ at: +p.at, value: +p.value })),
      test: h.test.map(p => ({ at: +p.at, value: +p.value })),
      fitLabel: h.fitLabel ?? 'Calibration set', testLabel: h.testLabel ?? 'Held-out set',
      unit: h.unit ?? '', pass: +h.pass,
      start: Number.isFinite(+h.start) ? +h.start : +axis.min,
      freeze: h.freeze ?? 'Freeze the line', commit: h.commit ?? 'Report the honest number',
      ...(h.afterFreeze ? { afterFreeze: String(h.afterFreeze) } : {}),
      // What the panel says before the player acts. All four optional; the engine
      // falls back to its own wording where a book says nothing.
      ...panelWords(h),
      ...(h.fitNote ? { fitNote: String(h.fitNote) } : {}),
      ...(h.testNote ? { testNote: String(h.testNote) } : {}),
    } };
  }

  if(format === 'TALLY'){
    // Counts in bins, a correlation per setting pair, and a combination that only
    // means anything once there are shots behind it. The player decides when
    // there is enough data, which is the decision the format exists to teach.
    const t = s.tally ?? {};
    const settings = t.settings ?? [];
    need(settings.length >= 2, 'a tally needs at least two setting pairs');
    need(settings.every(x => String(x.label ?? '').trim()), 'every tally setting needs a label');
    need(settings.every(x => Number.isFinite(+x.pSame) && +x.pSame >= 0 && +x.pSame <= 1),
      'every tally setting needs `pSame` between 0 and 1 — the probability the outcomes agree');
    need(settings.every(x => x.sign === undefined || [1, -1].includes(+x.sign)),
      'a tally setting\'s `sign` is 1 or -1');
    need(Number.isFinite(+t.target) && Number.isFinite(+t.tolerance) && +t.tolerance > 0,
      'a tally needs a numeric `target` and a positive `tolerance`');
    // What the authored probabilities actually produce, so a book cannot key a
    // statistic the settings cannot reach.
    const truth = settings.reduce((acc, x) =>
      acc + (+x.sign === -1 ? -1 : 1) * (2 * +x.pSame - 1), 0);
    need(Math.abs(truth - +t.target) <= +t.tolerance,
      `the tally's settings produce ${truth.toFixed(3)}, which is outside the keyed target`
      + ` ${t.target} ±${t.tolerance}`);
    need(String(s.answerText ?? '').trim(), 'a tally needs `answerText`');

    // ---------------------------------------------------- is there a decision in it
    //
    // A player reported this format as having no challenge: click until the button
    // unlocks, then submit. They were right, and the arithmetic says why. Each
    // correlation is a proportion, so the combination scatters by
    //
    //   sigma(n) = sqrt( SUM 4·p(1−p) / n )        n = shots per pair
    //
    // and the panel refused to commit before `minShots`. At Quantum's authored
    // numbers that floor put the statistic inside its own tolerance about 95% of
    // the time, so the panel had already made the judgment the stop exists to ask
    // for. Two conditions, both checked here:
    //
    //   · at the floor, committing must be a real risk — tolerance no wider than
    //     1.5 sigma(minShots), or the minimum IS the answer;
    //   · at full spend, an even split must comfortably pass — tolerance at least
    //     1.5 sigma of that, or the stop is graded on luck however well it is played.
    //
    // The second needs a `budget`, which is what makes shots cost something. Without
    // one they are free and the correct play is to click until the scatter is
    // negligible, which is tedium rather than judgment — so a budget is required for
    // any new tally, and its absence is reported on the ones written before it.
    const spread = settings.reduce((acc, x) => acc + 4 * +x.pSame * (1 - +x.pSame), 0);
    const sigmaAt = (n) => Math.sqrt(spread / Math.max(1, n));
    const batchSize = Number.isFinite(+t.batch) ? +t.batch : 100;
    const floor = Number.isFinite(+t.minShots) ? +t.minShots : 400;
    const sigFloor = sigmaAt(floor);
    need(+t.tolerance <= 1.5 * sigFloor,
      `a tally that can be reported at ${floor} shots a pair is already inside its own`
      + ` tolerance: sigma there is ${sigFloor.toFixed(3)} and the tolerance is ${t.tolerance}`
      + ` (${(+t.tolerance / sigFloor).toFixed(1)} sigma). Lower \`minShots\` or tighten`
      + ' `tolerance` — as written the panel decides when there is enough data, not the player');
    if(t.budget !== undefined){
      const budget = +t.budget;
      need(Number.isInteger(budget) && budget >= settings.length,
        `a tally's \`budget\` is a whole number of batches, at least one per pair`
        + ` (${settings.length})`);
      const evenN = Math.floor(budget / settings.length) * batchSize;
      need(evenN >= floor,
        `${budget} batches of ${batchSize} split over ${settings.length} pairs gives ${evenN}`
        + ` shots each, under the \`minShots\` of ${floor} — the stop cannot be finished`);
      const sigFull = sigmaAt(evenN);
      need(+t.tolerance >= 1.5 * sigFull,
        `even at full spend the statistic scatters by ${sigFull.toFixed(3)} against a tolerance`
        + ` of ${t.tolerance} (${(+t.tolerance / sigFull).toFixed(1)} sigma), so a well-played`
        + ' stop still fails on luck. Raise `budget` or widen `tolerance`');
    } else {
      warn(`${at}: this tally has no \`budget\`, so shots are free and the answer is to keep`
        + ' clicking — see QUESTION_BRIEF.md §5');
    }
    return { ...base, tally: {
      settings: settings.map(x => ({ label: String(x.label), pSame: +x.pSame,
        sign: +x.sign === -1 ? -1 : 1 })),
      batch: Number.isFinite(+t.batch) ? +t.batch : 100,
      minShots: Number.isFinite(+t.minShots) ? +t.minShots : 400,
      target: +t.target, tolerance: +t.tolerance,
      ...(Number.isFinite(+t.bound) ? { bound: +t.bound } : {}),
      boundLabel: t.boundLabel ?? '', formula: t.formula ?? '',
      formulaLabel: t.formulaLabel ?? 'Combination', readoutLabel: t.readoutLabel ?? 'Correlation',
      commit: t.commit ?? 'Report the number',
      ...(t.readyNote ? { readyNote: String(t.readyNote) } : {}),
      ...(t.spentNote ? { spentNote: String(t.spentNote) } : {}),
      ...(t.budget !== undefined ? { budget: +t.budget } : {}),
      ...panelWords(t),
    } };
  }

  if(format === 'PROBE'){
    // A chain of stations, each with what it reads now and what it read last
    // time. The fault is where those two separate, so the book has to supply both
    // for every station and the target has to be a station that exists.
    const p = s.probe ?? {};
    const stations = p.stations ?? [];
    need(stations.length >= 4, 'a probe needs at least four stations — a pattern needs somewhere to break');
    need(stations.every(x => String(x.label ?? '').trim()), 'every probe station needs a label');
    need(stations.every(x => String(x.reading ?? '').trim() && String(x.expected ?? '').trim()),
      'every probe station needs a `reading` and an `expected` — this run and the last one');
    const ids = stations.map(x => String(x.id ?? x.label));
    need(new Set(ids).size === ids.length, 'two probe stations share an id');
    need(ids.includes(String(p.target)), `the probe target "${p.target}" is not one of its stations`);
    // A cause named in a station's own detail turns the stop into a scavenger
    // hunt: the player reads six rows, finds the one that says "unclamped", and
    // never looks at the temperatures. The cause belongs in the verdict.
    const CAUSE = /\b(unclamped|not clamped|no clamp|missing|bypass\w*|loose|unanchored|not heat[- ]sunk)\b/i;
    need(!stations.some(x => CAUSE.test(String(x.load ?? '') + ' ' + String(x.detail ?? ''))),
      'a probe station names the cause in its own readings — put it in `why`, or the pattern'
      + ' never gets read');
    need(String(s.answerText ?? '').trim(), 'a probe needs `answerText`');
    return { ...base, probe: {
      stations: stations.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
        reading: String(x.reading), expected: String(x.expected),
        ...(x.load ? { load: String(x.load) } : {}) })),
      target: String(p.target),
      chainLabel: p.chainLabel ?? 'Stage',
      minReadings: Number.isFinite(+p.minReadings) ? +p.minReadings : 2,
      commit: p.commit ?? 'Name the stage',
      ...panelWords(p),
    } };
  }

  // ==================================================================== the twelve
  //
  // `FORMATS.md` has the argument for each of these and `engine/core/instruments.js`
  // renders them. What every block below is really doing is enforcing the format's
  // trap: a design whose bad choice costs nothing has no lesson in it, and the
  // cheapest way to ship one of these broken is to author a board on which every
  // move passes. Each check here is the sentence that would otherwise be a bug
  // report six months from now.
  //
  // All twelve need `answerText`. They are graded on an action, not on a labelled
  // option, so without it the verdict tells the player they were wrong and never
  // tells them what the right answer was — which is how all six of the first
  // sweeps shipped.
  const INSTRUMENT_BLOCKS = {
    TRIGGER: 'trigger', VALUE: 'value', CLOUD: 'cloud', ALLOCATE: 'allocate',
    TRACE: 'trace', ATTEST: 'attest', CONTROL: 'control', TRIANGULATE: 'triangulate',
    DEGENERACY: 'degeneracy', CHAIN: 'chain', BALANCE: 'balance', VERIFY: 'verify',
    PROPAGATE: 'propagate', STRESS: 'stress', DELEGATE: 'delegate', FLY: 'fly',
    RESIDUAL: 'residual', INJECT: 'inject', ROUTE: 'route',
    DERIVE: 'derive',
    // Tier 3, the ones that are fun first. Same registry, same contract, same
    // checks — see ARCADE.md for why they are not a second system.
    BELT: 'belt', TRIAL: 'trial', HOLD: 'hold', SPOT: 'spot', STACK: 'stack',
    LOB: 'lob',
    // The world-graded five. Their traps read site.js, as TRIAL's does.
    GREET: 'greet', FOLLOW: 'follow', HUNT: 'hunt', CANVASS: 'canvass', EVADE: 'evade',
    TAG: 'tag',
  };
  if(INSTRUMENT_BLOCKS[format]){
    const key = INSTRUMENT_BLOCKS[format];
    need(!!s[key], `a ${format} needs a \`${key}\` block — without it the panel renders empty`);
    need(String(s.answerText ?? '').trim(),
      `a ${format} needs \`answerText\` — it is graded on what the player did, so there is no`
      + ' option list for the verdict to fall back on');
    const b = s[key] ?? {};
    const numeric = (v) => Number.isFinite(+v);

    if(format === 'TRIGGER'){
      const sc = b.scale ?? {}, conds = b.conditions ?? [], stream = b.stream ?? [];
      const dir = String(b.direction ?? 'rising').toLowerCase();
      need(dir === 'rising' || dir === 'falling',
        `trigger \`direction\` is "${b.direction}" — it is \`rising\` or \`falling\` and nothing else`);
      const falling = dir === 'falling';
      // One rule to a board.
      //
      // It shipped as two and three stages, because the interaction documents
      // describe response boards with staged actions and that is what a real one
      // looks like. What that made was a scheduling exercise sitting on top of the
      // idea: three lead times, three windows and two hidden axes at once, and a
      // player with a doctorate could not follow it. The idea itself — decide now
      // at what reading you would act, far enough ahead that the action can still
      // happen — is entire in one rule. A stop that wants a second action wants a
      // second stop.
      need(conds.length === 1, `a trigger board is one rule — this one has ${conds.length}.`
        + ' The lead time, the window and the two failure directions are all in a single'
        + ' stage; a second stage is a second decision and belongs in its own stop');
      need(numeric(sc.min) && numeric(sc.max) && +sc.max > +sc.min,
        'trigger scale needs min and max, with max above min');
      // The name of the quantity. Seven of the fourteen authored boards had none,
      // so every slider on them read "fires at or above 1.30" with nothing saying
      // what 1.30 was — the panel knew, from the scene, and the panel is where the
      // player is when they have to choose.
      need(String(sc.label ?? '').trim(),
        'a trigger scale needs a `label` — it is the name of the quantity every'
        + ' threshold is set on, and the rows print a bare number without it');
      // Anchors: what a reading on this scale would mean, in the world the stop is
      // set in. Optional, because not every scale needs one — a probability is
      // already meaningful — and refused rather than trimmed when it is malformed,
      // since a rate scale with an anchor outside its own range is a sentence the
      // player is asked to reason from and cannot reach.
      const anchors = sc.anchors ?? [];
      if(anchors.length){
        need(anchors.length >= 2, 'a trigger scale with `anchors` needs at least two — one'
          + ' anchor is a caption, and it takes two readings to say what the scale does');
        need(anchors.length <= 4, 'a trigger scale takes at most four `anchors` — past that it'
          + ' is a table the player reads instead of a scale they reason about');
        need(anchors.every(a => numeric(a.at) && +a.at >= +sc.min && +a.at <= +sc.max),
          `every trigger anchor needs a numeric \`at\` inside the scale (${sc.min}–${sc.max})`);
        need(anchors.every(a => String(a.means ?? '').trim()),
          'every trigger anchor needs a `means` saying what a reading there would mean');
      }
      need(stream.length >= 3, 'a trigger needs at least three updates — one update is not a stream');
      need(stream.every(x => numeric(x.value) && numeric(x.hoursLeft) && String(x.at ?? '').trim()),
        'every trigger update needs `at`, a numeric `value` and a numeric `hoursLeft`');
      need(conds.every(c => numeric(c.leadHours) && +c.leadHours > 0 && String(c.label ?? '').trim()),
        'every trigger stage needs a label and a positive `leadHours`');
      // Falling time. An update stream whose hours left goes up is a stream where
      // waiting buys lead time, which inverts the whole lesson.
      need(stream.every((x, i) => i === 0 || +x.hoursLeft <= +stream[i - 1].hoursLeft),
        'the trigger stream must run forwards — `hoursLeft` never increases');
      const vals = stream.map(x => +x.value);
      const top = Math.max(...vals), bottom = Math.min(...vals);
      // Which way the readings travel decides which comparison the panel makes, so
      // a board declaring one direction and moving the other is a board on which no
      // rule means what it says. Germination dropping 98 -> 84 graded on `>=` is
      // how five stops in this repo were decoration.
      //
      // The test is where the extreme sits, not first-versus-last: a probability
      // that spikes to 2.5 % and collapses back to 0.011 is a rising board — every
      // threshold above the opening reading is reachable — and comparing its ends
      // calls it falling. What matters is that the far end of the travel is not the
      // reading the board opens on.
      const far = falling ? vals.indexOf(bottom) : vals.indexOf(top);
      need(far > 0, `the stream is declared ${dir} and its ${falling ? 'lowest' : 'highest'}`
        + ` reading (${falling ? bottom : top}) is the one it opens on, so no threshold past`
        + ' the opening reading can ever fire');
      // Both outcomes have to be reachable, or the board is decoration. A rule set
      // beyond the far end of the stream can never fire.
      need(falling ? +sc.min < bottom : +sc.max > top,
        `the trigger scale ${falling ? 'bottoms out at ' + sc.min : 'tops out at ' + sc.max}`
        + ` and the stream reaches ${falling ? bottom : top} — every threshold fires,`
        + ' so no rule can be written badly');
      // The other names the limit has been authored under. Every one of these is a
      // key the importer dropped in silence, so the board never printed the line the
      // author wrote it for: blackout's `ceiling`, seedbank's `floor`, redsand's
      // `limit`, and a `failureBoundary: { value, unit }` object in two more. Refused
      // rather than aliased, for the reason CHAIN's `reading` cost a rewrite — an
      // alias is how a field ends up under five names next time.
      ['ceiling', 'floor', 'limit', 'cap', 'boundary', 'failureBoundary'].forEach(k => {
        need(b[k] == null, `trigger authors \`${k}\` — the field is \`consequenceLimit\`,`
          + ' a single number, and anything else is dropped without a word');
      });
      // And the answer, authored in a field nothing reads. `target` beside a stage is
      // the threshold that stage should fire at, which is exactly what the player is
      // being asked for; a stage says what it needs (`leadHours`) and where it may
      // fire (`window`), and nothing else.
      conds.forEach(c => need(c.target == null,
        `"${c.label}" authors \`target\` — that is the answer, and the fields a stage`
        + ' carries are `leadHours` and `window`'));
      if(b.consequenceLimit != null){
        need(numeric(b.consequenceLimit), 'trigger `consequenceLimit` must be a number');
        need(+b.consequenceLimit > bottom && +b.consequenceLimit < top,
          `the consequence limit ${b.consequenceLimit} is outside the stream's own range`
          + ` (${bottom} to ${top}), so the board can neither cross it nor stay under it`);
      }
      // The rehearsal: a past campaign of the same quantity, drawn behind the axes
      // in grey. It is the answer to "what does 1.2 on this scale even look like",
      // which a player with a doctorate could not read off a bare slider. It must
      // not BE this campaign, and it must fit the plot's own time span, because the
      // plot's x domain comes from the live stream.
      const reh = b.rehearsal ?? null;
      if(reh){
        const rs = reh.stream ?? [];
        need(rs.length >= 3, 'a trigger `rehearsal` needs at least three points — two points'
          + ' draw a straight line, which says nothing about how this quantity moves');
        need(rs.every(x => numeric(x.value) && numeric(x.hoursLeft)),
          'every trigger rehearsal point needs a numeric `value` and `hoursLeft`');
        need(rs.every((x, i) => i === 0 || +x.hoursLeft <= +rs[i - 1].hoursLeft),
          'the trigger rehearsal must run forwards — `hoursLeft` never increases');
        need(rs.every(x => +x.value >= +sc.min && +x.value <= +sc.max),
          `every trigger rehearsal value must sit inside the scale (${sc.min}–${sc.max}),`
          + ' or the trace is drawn outside its own plot');
        const first = +stream[0].hoursLeft, last = +stream[stream.length - 1].hoursLeft;
        need(rs.every(x => +x.hoursLeft <= first && +x.hoursLeft >= last),
          `every trigger rehearsal point must fall inside the campaign's own span`
          + ` (${last}–${first} h), which is what the plot's time axis is drawn from`);
        const same = rs.length === stream.length
          && rs.every((x, i) => +x.value === +stream[i].value);
        need(!same, 'the trigger rehearsal is this campaign\'s own readings — a past campaign'
          + ' that repeats tonight hands the player the answer before they set a line');
        need(String(reh.note ?? '').trim(), 'a trigger `rehearsal` needs a `note` saying which'
          + ' campaign it was — an unlabelled grey trace reads as data about tonight');
      }
      // The window is what makes the board a decision. Without it the grade is
      // lead time alone, and the end of the scale that fires on update 0 has more
      // hours left than any other reading — so doing nothing scored full marks on
      // all fifteen authored stops. It is required, never inferred.
      const fireIdx = (thr) => stream.findIndex(x => (falling ? +x.value <= thr : +x.value >= thr));
      conds.forEach(c => {
        const w = c.window ?? {};
        need(numeric(w.min) && numeric(w.max) && +w.max >= +w.min,
          `"${c.label}" needs a \`window: { min, max }\` — the band of readings it may fire on.`
          + ' Graded on lead time alone, the opening slider position is a correct answer');
        const idx = stream.map((x, i) => (+x.value >= +w.min && +x.value <= +w.max ? i : -1))
          .filter(i => i >= 0);
        need(idx.length, `"${c.label}" has a window of ${w.min}–${w.max} and no update in the`
          + ' stream falls inside it, so the stage cannot be got right');
        const inTime = idx.filter(i => +stream[i].hoursLeft >= +c.leadHours);
        need(inTime.length, `"${c.label}" needs ${c.leadHours} h of lead and every update inside`
          + ` its window of ${w.min}–${w.max} arrives with less than that — the window and the`
          + ' lead time contradict each other');
        // A threshold has to be reachable *and* land in the window. The importer
        // checks the two ends of the scale specifically, because those are the two
        // positions a player reaches without deciding anything.
        [[+sc.min, 'bottom'], [+sc.max, 'top']].forEach(([end, which]) => {
          const k = fireIdx(end);
          const ok = k >= 0 && idx.includes(k) && +stream[k].hoursLeft >= +c.leadHours;
          need(!ok, `"${c.label}" is satisfied by sliding the threshold to the ${which} of the`
            + ` scale (${end}). The opening position of a slider must never be a right answer —`
            + ' move the window, or widen the scale past the stream');
        });
      });
      conds.forEach(c => {
        const inTime = stream.some(x => +x.hoursLeft >= +c.leadHours);
        need(inTime, `"${c.label}" needs ${c.leadHours} h of lead and no update in the stream`
          + ' arrives with that much left — the stage cannot be got right');
      });
      return { ...base, trigger: {
        scale: { label: sc.label ?? '', unit: sc.unit ?? '', min: +sc.min, max: +sc.max,
          step: numeric(sc.step) ? +sc.step : (+sc.max - +sc.min) / 100,
          ...(anchors.length
            ? { anchors: anchors.map(a => ({ at: +a.at, means: String(a.means) })) } : {}) },
        direction: dir,
        conditions: conds.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          leadHours: +c.leadHours,
          window: { min: +(c.window ?? {}).min, max: +(c.window ?? {}).max },
          ...(c.owner ? { owner: String(c.owner) } : {}),
          ...(c.action ? { action: String(c.action) } : {}) })),
        stream: stream.map(x => ({ at: String(x.at), update: String(x.update ?? ''),
          value: +x.value, hoursLeft: +x.hoursLeft })),
        ...(b.consequenceLimit != null ? { consequenceLimit: +b.consequenceLimit } : {}),
        ...(reh ? { rehearsal: { note: String(reh.note),
          stream: (reh.stream ?? []).map(x => ({ value: +x.value, hoursLeft: +x.hoursLeft })) } } : {}),
        ...(b.objective ? { objective: String(b.objective) } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        release: b.release ?? 'Release the board', commit: b.commit ?? 'Stand by the board',
      } };
    }

    if(format === 'VALUE'){
      const bud = b.budget ?? {}, opts = b.options ?? [];
      need(numeric(bud.amount) && +bud.amount > 0, 'a value board needs a positive budget');
      need(opts.length >= 4, 'a value board needs at least four options');
      need(opts.every(o => String(o.label ?? '').trim() && String(o.axis ?? '').trim()
        && numeric(o.cost)), 'every value option needs a label, an `axis` and a numeric cost');
      const total = opts.reduce((n, o) => n + +o.cost, 0);
      need(total > +bud.amount,
        `the options cost ${total} and the budget is ${bud.amount} — the whole board is affordable,`
        + ' so nothing is being traded away');
      const decisive = opts.filter(o => o.decisive);
      need(decisive.length >= 1, 'no value option is marked `decisive` — nothing on the board'
        + ' would change the decision, so every answer is as good as every other');
      need(decisive.reduce((n, o) => n + +o.cost, 0) <= +bud.amount,
        'the decisive options together cost more than the budget — the stop cannot be answered right');
      need(new Set(opts.map(o => o.axis)).size >= 2,
        'every value option asks about the same axis — buying more of the same is the trap, so'
        + ' at least two axes have to be on the board');
      // Not fatal, because a board can be reasoned about from cost and axis
      // alone. But the format is "what would this measurement tell you", and an
      // option that tells you nothing when bought is half a card.
      const mute = opts.filter(o => !String(o.reveals ?? '').trim());
      if(mute.length){
        warn(`${at}: ${mute.length} of ${opts.length} value option(s) have no \`reveals\` — buying`
          + ' them changes nothing on the card');
      }
      return { ...base, value: {
        budget: { amount: +bud.amount, unit: bud.unit ?? '' },
        decision: String(b.decision ?? ''),
        options: opts.map(o => ({ id: String(o.id ?? o.label), label: String(o.label),
          cost: +o.cost, axis: String(o.axis), reveals: String(o.reveals ?? ''),
          ...(o.decisive ? { decisive: true } : {}),
          ...(o.irreversible ? { irreversible: true } : {}) })),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Commit the decision',
      } };
    }

    if(format === 'CLOUD'){
      const bo = b.bounds ?? {}, acts = b.actions ?? [];
      need(numeric(bo.min) && numeric(bo.max) && +bo.max > +bo.min,
        'a cloud needs bounds with max above min');
      need(numeric(b.centre) && numeric(b.spread) && +b.spread > 0,
        'a cloud needs a numeric centre and a positive spread');
      need(numeric(b.pass) && +b.pass > 0 && +b.pass < 1,
        'a cloud `pass` is the fraction that has to finish inside, between 0 and 1');
      need(acts.length >= 2, 'a cloud needs at least two actions');
      need(acts.every(a => ['shift', 'narrow'].includes(a.effect) && numeric(a.amount)),
        'every cloud action needs `effect: shift|narrow` and a numeric `amount`');
      need(acts.some(a => a.effect === 'narrow'),
        'a cloud with no narrowing action cannot be answered — information is the only thing'
        + ' that reduces a spread');
      // The trap, stated as arithmetic. Applying every shift and no narrow has to
      // leave the player short, or the lesson is that moving the dot works.
      const erf = (x) => { const sgn = x < 0 ? -1 : 1, ax = Math.abs(x),
        t = 1 / (1 + 0.3275911 * ax);
        return sgn * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t
          - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax)); };
      const inside = (c, sp) => ((v) => (erf((+bo.max - c) / (sp * Math.SQRT2))
        - erf((+bo.min - c) / (sp * Math.SQRT2))) / 2)();
      let shiftedC = +b.centre;
      for(const a of acts) if(a.effect === 'shift'){
        shiftedC += ((+bo.min + +bo.max) / 2 - shiftedC) * Math.min(1, Math.max(0, +a.amount));
      }
      need(inside(shiftedC, +b.spread) < +b.pass,
        `re-centring alone reaches ${(inside(shiftedC, +b.spread) * 100).toFixed(1)}% inside, which`
        + ` clears the ${( +b.pass * 100).toFixed(1)}% needed — the cloud has to come with the dot`);
      let sp = +b.spread;
      for(const a of acts) if(a.effect === 'narrow') sp *= +a.amount;
      need(inside(shiftedC, sp) >= +b.pass,
        `even with every action applied only ${(inside(shiftedC, sp) * 100).toFixed(1)}% finishes`
        + ' inside — the stop cannot be answered right');
      // The player reports the mean and the uncertainty by placing three bars, and
      // `report` is the slack on that placement. Left out it is 0.3 of the spread
      // the player is looking at, which scales as the cloud narrows. Authored, it
      // has to be tight enough that the bars still have to be read off the
      // scatter: half the narrowed spread passes a middle bar put anywhere near
      // the cloud, and passes a band that is half of one and twice the other.
      const rep = b.report;
      if(rep !== undefined){
        need(rep && typeof rep === 'object', 'a cloud `report` is a map of tolerances');
        for(const k of Object.keys(rep)){
          need(['centreTol', 'spreadTol'].includes(k),
            `a cloud \`report\` takes centreTol and spreadTol, not \`${k}\``);
        }
        for(const k of ['centreTol', 'spreadTol']){
          if(rep[k] === undefined) continue;
          need(numeric(rep[k]) && +rep[k] > 0, `a cloud \`report.${k}\` is a positive number`);
          need(+rep[k] <= 0.5 * sp,
            `a cloud \`report.${k}\` of ${rep[k]} is more than half the ${sp.toFixed(3)} spread the`
            + ' player finishes with, so the bar does not have to be read off the scatter');
        }
      }
      return { ...base, cloud: {
        bounds: { min: +bo.min, max: +bo.max, unit: bo.unit ?? '', label: bo.label ?? '' },
        centre: +b.centre, spread: +b.spread, pass: +b.pass,
        seed: numeric(b.seed) ? +b.seed : 1,
        costUnit: b.costUnit ?? 'h',
        actions: acts.map(a => ({ id: String(a.id ?? a.label), label: String(a.label),
          effect: a.effect, amount: +a.amount, ...(numeric(a.cost) ? { cost: +a.cost } : {}) })),
        ...(rep ? { report: {
          ...(numeric(rep.centreTol) ? { centreTol: +rep.centreTol } : {}),
          ...(numeric(rep.spreadTol) ? { spreadTol: +rep.spreadTol } : {}),
        } } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        commit: b.commit ?? 'Declare it ready',
      } };
    }

    if(format === 'ALLOCATE'){
      const pool = b.pool ?? {}, items = b.items ?? [], answers = b.answers ?? [];
      need(numeric(pool.amount) && +pool.amount > 0, 'an allocation needs a positive pool');
      need(['scalar', 'integrated', undefined].includes(pool.mode),
        `allocate pool mode "${pool.mode}" is not scalar or integrated`);
      need(items.length >= 4, 'an allocation needs at least four items to choose between');
      // The integrated variant is the whole of "you saved watts, I asked you to
      // save watt-hours": cost is rate × hours, computed here so the panel and the
      // printed book agree about it.
      const costed = items.map(it => {
        const cost = numeric(it.cost) ? +it.cost
          : (numeric(it.rate) && numeric(it.hours) ? +it.rate * +it.hours : NaN);
        need(Number.isFinite(cost),
          `allocation item "${it.label}" has neither a numeric \`cost\` nor a \`rate\` and \`hours\``);
        return { ...it, cost };
      });
      const total = costed.reduce((n, it) => n + it.cost, 0);
      need(total > +pool.amount,
        `every item together costs ${+total.toFixed(2)} against a pool of ${pool.amount} — the`
        + ' whole board is affordable, so nothing is being traded away');
      const prot = costed.filter(it => it.protected).reduce((n, it) => n + it.cost, 0);
      need(prot <= +pool.amount,
        `the protected items alone cost ${+prot.toFixed(2)}, more than the pool`);
      need(answers.length >= 3, 'an allocation needs at least three questions its plan may answer');
      const ids = new Set(costed.map(it => String(it.id ?? it.label)));
      answers.forEach(q => {
        need((q.requires ?? []).length >= 1, `"${q.question}" requires no items — it is always answered`);
        (q.requires ?? []).forEach(r => need(ids.has(String(r)),
          `"${q.question}" requires item "${r}", which the allocation does not offer`));
      });
      const required = answers.filter(q => q.required);
      need(required.length >= 1, 'no allocation answer is `required` — every plan passes');
      const needIds = new Set(required.flatMap(q => (q.requires ?? []).map(String)));
      const needCost = costed.filter(it => needIds.has(String(it.id ?? it.label)) || it.protected)
        .reduce((n, it) => n + it.cost, 0);
      need(needCost <= +pool.amount,
        `the required answers and the protected items cost ${+needCost.toFixed(2)} against a pool`
        + ` of ${pool.amount} — the stop cannot be answered right`);
      need(answers.some(q => !q.required),
        'every allocation answer is required — there is nothing the plan is allowed to forgo,'
        + ' which is the decision this format exists to make');
      // A required answer the protected items already cover is a required answer
      // nobody has to decide anything about: the plan passes before the player
      // touches it. Caught by driving the panel, not by reading it.
      const protIds = new Set(costed.filter(it => it.protected).map(it => String(it.id ?? it.label)));
      required.forEach(q => need(!(q.requires ?? []).every(r => protIds.has(String(r))),
        `"${q.question}" is required and everything it needs is already protected — the plan`
        + ' answers it before the player chooses anything'));
      return { ...base, allocate: {
        pool: { amount: +pool.amount, unit: pool.unit ?? '', mode: pool.mode ?? 'scalar' },
        items: costed.map(it => ({ id: String(it.id ?? it.label), label: String(it.label),
          cost: +it.cost.toFixed(4), ...(it.protected ? { protected: true } : {}),
          ...(it.note ? { note: String(it.note) } : {}) })),
        answers: answers.map(q => ({ question: String(q.question),
          requires: (q.requires ?? []).map(String), ...(q.required ? { required: true } : {}) })),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Commit the plan',
      } };
    }

    if(format === 'TRACE'){
      const chans = b.channels ?? [], res = b.resources ?? [];
      need(chans.length >= 4, 'a trace needs at least four channels');
      need(res.length >= 1, 'a trace needs at least one shared resource to name');
      need(chans.every(c => String(c.label ?? '').trim() && String(c.reading ?? '').trim()),
        'every trace channel needs a label and a reading');
      const rids = new Set(res.map(r => String(r.id ?? r.label)));
      need(rids.has(String(b.target)), `the trace target "${b.target}" is not one of its resources`);
      chans.forEach(c => (c.depends ?? []).forEach(d => need(rids.has(String(d)),
        `channel "${c.label}" depends on "${d}", which is not a resource on the board`)));
      const sharing = chans.filter(c => (c.depends ?? []).map(String).includes(String(b.target)));
      need(sharing.length >= 2,
        'fewer than two channels depend on the trace target — with only one there is no common mode,'
        + ' and the agreement the stop is about never happens');
      const cids = new Set(chans.map(c => String(c.id ?? c.label)));
      const indep = (b.independent ?? []).map(String);
      need(indep.length >= 1,
        'a trace with no independent channel cannot be answered — something has to survive the'
        + ' correction, or the right move is to throw everything away');
      indep.forEach(id => {
        need(cids.has(id), `the trace names "${id}" as independent, which is not one of its channels`);
        const c = chans.find(x => String(x.id ?? x.label) === id);
        need(!(c?.depends ?? []).map(String).includes(String(b.target)),
          `channel "${id}" is listed as independent and depends on the target`);
      });
      // The dependency belongs in the graph, not in the label. A channel that says
      // "on the shared clock" in its own name answers the stop from the first read.
      const TELL = /\bshared|common|same (clock|reference|source)|inherit/i;
      need(!chans.some(c => TELL.test(String(c.label) + ' ' + String(c.reading))),
        'a trace channel names its own dependency in its label or reading — put it in `depends`,'
        + ' or nobody opens the graph');
      // A reading is a quantity, and a bare number is not one. Aftershock's two
      // dependent conclusions read "3.0 (expected value published in the fortnight
      // report)" — a provenance note with no statement of what 3.0 counts, on a
      // board whose whole subject is what a ratio is a ratio *of*.
      chans.forEach(c => need(!/^[\d.,+\-\u00d7x\s]+$/.test(String(c.reading).trim()),
        `trace channel "${c.label}" reads "${c.reading}", which is a bare number — say what the`
        + ' quantity is and in what unit (a dimensionless ratio has to say so)'));
      // `independent` is the list, and a channel repeating it is a second
      // description of one fact: the importer read the list and dropped the flag,
      // so a channel flagged true and left off the list was silently dependent.
      need(!chans.some(c => 'independent' in (c ?? {})),
        'a trace channel carries its own `independent:` flag — that lives in the board\'s'
        + ' `independent` list, which is what the importer and the grade both read');
      // TRACE grades a named source and an exact keep-set. There is no number to be
      // near, so a `tolerance` here is a key that reaches nothing.
      need(!('tolerance' in b),
        'a trace board declares a `tolerance` — nothing about a trace is graded numerically;'
        + ' the answer is the source you name and the channels you keep');
      // The correction the board is about, printed on the panel rather than
      // reasoned from in the answer text. Strings, because the engine does no
      // arithmetic and a correction is a factor in one game and a clock offset in
      // another; a numeric `referenceAmplification` is how a board ended up
      // showing "3.0" and meaning nothing.
      let correction;
      if(b.correction != null){
        const c = b.correction;
        ['originalRatio', 'referenceAmplification', 'correctedRockRatio'].forEach(k =>
          need(!(k in c), `a trace correction names \`${k}\`, which nothing renders — write it as`
            + ' `what` / `was` / `now` / `effect` / `corrected`, in words with units'));
        ['what', 'was', 'now', 'corrected'].forEach(k => need(String(c[k] ?? '').trim(),
          `a trace correction needs \`${k}\` — what was re-measured, what it was taken to be,`
          + ' what it turned out to be, and the value that moves as a result'));
        need(String(c.was).trim() !== String(c.now).trim(),
          'a trace correction is the same before and after, so it corrects nothing and no'
          + ' dependent channel needs revising');
        correction = { what: String(c.what), was: String(c.was), now: String(c.now),
          corrected: String(c.corrected),
          ...(String(c.effect ?? '').trim() ? { effect: String(c.effect) } : {}) };
      }
      return { ...base, trace: {
        channels: chans.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          reading: String(c.reading), depends: (c.depends ?? []).map(String) })),
        resources: res.map(r => ({ id: String(r.id ?? r.label), label: String(r.label) })),
        independent: indep, target: String(b.target),
        ...(correction ? { correction } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        commit: b.commit ?? 'Correct it',
      } };
    }

    if(format === 'ATTEST'){
      const claims = b.claims ?? [];
      need(claims.length >= 4, 'an attest board needs at least four claims');
      need(claims.every(c => String(c.label ?? '').trim() && String(c.evidence ?? '').trim()),
        'every attest claim needs a label and the `evidence` a verification would turn up');
      need(numeric(b.checks) && +b.checks >= 1, 'an attest board needs a numeric `checks` budget');
      need(+b.checks < claims.length,
        `the board allows ${b.checks} verifications for ${claims.length} claims — with enough for`
        + ' the whole list there is no decision about where to look');
      const wanted = claims.filter(c => c.critical && !c.backed);
      need(wanted.length >= 1,
        'every critical claim is already backed — there is nothing to hold, so closing the list'
        + ' blind is the right answer');
      need(wanted.length <= +b.checks,
        `${wanted.length} critical claims are unbacked and only ${b.checks} verifications are`
        + ' allowed — the stop cannot be answered right');
      need(claims.some(c => c.critical && c.backed),
        'no critical claim is backed — holding every critical claim passes without reading anything');
      return { ...base, attest: {
        claims: claims.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          signedBy: String(c.signedBy ?? c.signed_by ?? '—'), evidence: String(c.evidence),
          ...(c.critical ? { critical: true } : {}), ...(c.backed ? { backed: true } : {}) })),
        checks: +b.checks,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Close the list',
      } };
    }

    if(format === 'CONTROL'){
      const vars = b.variables ?? [];
      need(vars.length >= 3, 'a controlled trial needs at least three candidates');
      const vids = vars.map(v => String(v.id ?? v.label));
      need(new Set(vids).size === vids.length, 'two control variables share an id');
      need(vids.includes(String(b.truth)), `the control truth "${b.truth}" is not one of its variables`);
      need(numeric(b.baseline) && numeric(b.response) && Math.abs(+b.response) > 0,
        'a controlled trial needs a numeric baseline and a non-zero response');
      const noise = numeric(b.noise) ? +b.noise : 0;
      need(Math.abs(+b.response) > noise * 3,
        `the response ${b.response} is not clear of the noise ±${noise} — the trial would be a`
        + ' coin toss, which is the opposite of a controlled experiment');
      // A reading that goes negative when the suspect is changed means the sign
      // of `response` is wrong for this stop — the suspect is suppressing the
      // signal rather than producing it. Project Y's discriminator did exactly
      // this and rendered −566 counts per minute.
      need(+b.baseline < 0 || +b.baseline + +b.response >= 0,
        `changing the suspect takes the reading to ${(+b.baseline + +b.response).toFixed(1)},`
        + ` below zero — \`response\` is the signed change in the reading, so a suspect that is`
        + ' suppressing the signal has a positive response, not a negative one');
      return { ...base, control: {
        observable: { label: String(b.observable?.label ?? 'Reading'),
          unit: String(b.observable?.unit ?? '') },
        variables: vars.map(v => ({ id: String(v.id ?? v.label), label: String(v.label) })),
        held: (b.held ?? []).map(String), truth: String(b.truth),
        baseline: +b.baseline, response: +b.response, noise,
        ...(b.changeVerb ? { changeVerb: String(b.changeVerb) } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        run: b.run ?? 'Run the measurement', commit: b.commit ?? 'Name it',
      } };
    }

    if(format === 'TRIANGULATE'){
      const sts = b.stations ?? [], truth = b.truth ?? {};
      need(sts.length >= 3, 'a triangulation needs at least three stations — two give a pair of points');
      need(sts.every(x => numeric(x.x) && numeric(x.y) && numeric(x.distance)
        && String(x.observation ?? '').trim()),
        'every triangulation station needs x, y, a numeric `distance` and its `observation`');
      need(numeric(truth.x) && numeric(truth.y), 'a triangulation needs a numeric truth position');
      need(numeric(b.tolerance) && +b.tolerance > 0, 'a triangulation needs a positive tolerance');
      const sysid = String((b.systematic ?? {}).appliesTo ?? '');
      sts.forEach(x => {
        const real = Math.hypot(+x.x - +truth.x, +x.y - +truth.y);
        // The rings have to actually pass through the answer, or the region the
        // player is asked to find does not contain it.
        need(Math.abs(real - +x.distance) <= +b.tolerance,
          `station "${x.label}" is ${real.toFixed(2)} from the truth and its authored distance is`
          + ` ${x.distance} — the ring misses the answer by more than the tolerance`);
      });
      if(b.systematic){
        need(sts.some(x => String(x.id ?? x.label) === sysid),
          `the systematic applies to "${sysid}", which is not one of the stations`);
        need(numeric(b.systematic.delta) && Math.abs(+b.systematic.delta) > +b.tolerance,
          `the systematic moves one ring by ${b.systematic.delta} against a tolerance of`
          + ` ${b.tolerance} — correcting it changes nothing, so the player learns that it did not`
          + ' matter');
      }
      return { ...base, triangulate: {
        stations: sts.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
          x: +x.x, y: +x.y, distance: +x.distance, observation: String(x.observation) })),
        truth: { x: +(truth.x ?? 0), y: +(truth.y ?? 0) }, tolerance: +b.tolerance, unit: b.unit ?? '',
        ...(b.systematic ? { systematic: { id: String(b.systematic.id ?? 'systematic'),
          label: String(b.systematic.label), appliesTo: sysid, delta: +b.systematic.delta } } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Report the position',
      } };
    }

    if(format === 'DEGENERACY'){
      const cs = b.controls ?? [], truth = b.truth ?? {}, tol = b.tolerance ?? {};
      need(cs.length === 2, 'a degeneracy has exactly two controls — that is what makes a locus');
      need(cs.every(c => numeric(c.min) && numeric(c.max) && +c.max > +c.min && numeric(c.step)),
        'every degeneracy control needs min, max and step, with max above min');
      need((b.locus ?? []).length >= 5,
        'a degeneracy needs at least five points on its first locus — three is a line, and the'
        + ' player has to see a family');
      need(((b.second ?? {}).locus ?? []).length >= 3,
        'a degeneracy needs a second locus of at least three points — the measurement that'
        + ' collapses it');
      need(String((b.second ?? {}).label ?? '').trim(),
        'the second measurement needs a label saying what physics it uses');
      need(numeric(truth.a) && numeric(truth.b), 'a degeneracy needs a numeric truth pair');
      need(numeric(tol.a) && +tol.a > 0 && numeric(tol.b) && +tol.b > 0,
        'a degeneracy needs a positive tolerance on each control');
      need(+truth.a >= +cs[0].min && +truth.a <= +cs[0].max
        && +truth.b >= +cs[1].min && +truth.b <= +cs[1].max,
        'the degeneracy truth is outside the range of its own controls');
      // The family has to be a family. If every point on the first locus is inside
      // the answer tolerance the measurement was never ambiguous, and the second
      // one has nothing to do.
      const far = (b.locus ?? []).filter(p =>
        Math.abs(+p.a - +truth.a) > +tol.a || Math.abs(+p.b - +truth.b) > +tol.b);
      need(far.length >= 3,
        'the first locus barely leaves the answer tolerance — the measurement is not degenerate,'
        + ' so nothing is learned when the second one arrives');
      const near = (list) => (list ?? []).some(p =>
        Math.abs(+p.a - +truth.a) <= +tol.a * 2 && Math.abs(+p.b - +truth.b) <= +tol.b * 2);
      need(near(b.locus) && near(b.second.locus),
        'the two loci do not both pass through the truth — they have to cross there, or the'
        + ' intersection is not the answer');
      return { ...base, degeneracy: {
        controls: cs.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          min: +c.min, max: +c.max, step: +c.step, unit: c.unit ?? '' })),
        observable: { label: String(b.observable?.label ?? 'Measurement') },
        locus: (b.locus ?? []).map(p => ({ a: +p.a, b: +p.b })),
        second: { label: String(b.second?.label ?? ''),
          apply: b.second?.apply ?? 'Apply the second measurement',
          locus: (b.second?.locus ?? []).map(p => ({ a: +p.a, b: +p.b })) },
        truth: { a: +(truth.a ?? 0), b: +(truth.b ?? 0) },
        tolerance: { a: +(tol.a ?? 0), b: +(tol.b ?? 0) },
        ...(b.still ? { still: b.still.map(String) } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        commit: b.commit ?? 'Report it',
      } };
    }

    if(format === 'CHAIN'){
      const links = b.links ?? [];
      need(links.length >= 4, 'a chain needs at least four transfers');
      need(links.every(l => String(l.label ?? '').trim() && String(l.transfers ?? '').trim()),
        'every chain link needs a label and what it `transfers`');
      const lids = links.map(l => String(l.id ?? l.label));
      need(new Set(lids).size === lids.length, 'two chain links share an id');
      const order = (b.order ?? []).map(String);
      need(order.length >= 4 && new Set(order).size === order.length
        && order.every(id => lids.includes(id)),
        'the chain order must name at least four links, each of them once, all from `links`');
      // The bank may hold more than the path does. A decoy that does not belong
      // in the path at all is a stronger board than one that is merely not the
      // governing member — the player has to decide it is not a transfer, rather
      // than only where it sits. Both variants are allowed.
      const spare = lids.filter(id => !order.includes(id));
      need(spare.length <= 2, `${spare.length} links are not in the path — at most two decoys`);
      need(lids.includes(String(b.governing)),
        `the chain's governing link "${b.governing}" is not one of its transfers`);
      need(lids.includes(String(b.distractor)),
        `the chain needs a \`distractor\` — the large obvious member somebody names instead`);
      need(String(b.distractor) !== String(b.governing),
        'the chain\'s distractor is its governing link — there is nothing to be wrong about');
      need(order.includes(String(b.governing)),
        `the governing link "${b.governing}" is not in the path`);
      // Whichever link governs, it must not be the one the printed order puts
      // first: "the first thing in the list" is an answer available without
      // reading anything.
      need(String(b.governing) !== order[0],
        'the chain is governed by its own first link, which is answerable from the order alone');
      // `reading` is the observed state of that link, and it is the ONLY basis a
      // player has for naming the one that governs. Six stops across three games
      // authored one per link and the importer dropped all of them here, so the
      // panel showed a name and a transfer and nothing else — while the same
      // stops' hints said "inspect the link readings", "use each reading" and
      // "the largest number on the screen is not automatically the governing
      // one". There were no numbers on the screen. It never rendered once.
      need(links.every(l => l.reading === undefined || String(l.reading).trim()),
        'a chain link has an empty `reading` — leave it out rather than authoring a blank');
      // Eleven of the fifteen books authored this field, under THREE names, and
      // every one of them was dropped here. `reading` is the one that renders;
      // the others are refused rather than aliased, because an alias is how it
      // ends up under four names next time. Red Sand's was worse than dropped —
      // a chain-level map keyed by link id, with one key (`radiator`) naming no
      // link at all, which is a typo no per-link field can make.
      for(const l of links){
        for(const [dead, why] of [['evidence', 'the same thing'],
          ['capacity', 'a number and a unit'], ['requires', 'a number and a unit'],
          ['unit', 'a number and a unit']]){
          need(l[dead] === undefined,
            `chain link "${l.id ?? l.label}" authors \`${dead}\` — write it as \`reading\`,`
            + ` which is ${why} and is the field the rail prints`);
        }
      }
      need(b.evidence === undefined,
        'the chain authors a chain-level `evidence` map — put each one on its own link as'
        + ' `reading`, so a key that names no link cannot go unnoticed');
      return { ...base, chain: {
        links: links.map(l => ({ id: String(l.id ?? l.label), label: String(l.label),
          transfers: String(l.transfers),
          ...(l.reading === undefined ? {} : { reading: String(l.reading) }) })),
        order, governing: String(b.governing), distractor: String(b.distractor),
        ...(spare.length ? { decoys: spare } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Name the governing transfer',
      } };
    }

    if(format === 'DERIVE'){
      const steps = b.steps ?? [], rules = b.rules ?? [];
      need(String(b.start ?? '').trim(), 'a derivation needs a `start` — the line it begins from');
      need(String(b.goal ?? '').trim(),
        'a derivation needs a `goal`, stated as a form — "dQ/dt in terms of dH/dt" — so the panel'
        + ' can say where it is going without printing where it ends up');
      need(steps.length >= 2, 'a derivation of one line is not a derivation');
      // Naming the rule is off by default and opted into with `askRule: true`.
      // Half-offering it is not allowed: a list of one or two rules answers the
      // second half of every step by elimination, so a book that asks for the
      // rule offers three or more.
      const asksRule = b.askRule === true;
      need(!asksRule || rules.length >= 3,
        '`askRule: true` needs at least three named rules — one or two to choose from answers the'
        + ' second half of every step by elimination');
      need(asksRule || !rules.length,
        'this derivation lists `rules` but does not set `askRule: true`, so nothing would ever show'
        + ' them. Add `askRule: true` to ask for the rule, or drop the `rules` list');
      steps.forEach((st, i) => {
        const cands = st.candidates ?? [];
        const n = `step ${i + 1}`;
        need(String(st.ask ?? '').trim(), `${n} needs an \`ask\` — what this line is doing`);
        need(cands.length >= 3, `${n} needs at least three candidates`);
        need(cands.every(c => String(c.text ?? '').trim())
          && (!asksRule || cands.every(c => String(c.rule ?? '').trim())),
          `every candidate in ${n} needs \`text\`, and the \`rule\` it claims wherever rules are asked for`);
        // Only when the player is being asked to name one. A book with the
        // naming half off may keep its per-candidate `rule` values — they cost
        // nothing, and they are what switching it back on would need.
        need(!asksRule || cands.every(c => rules.includes(String(c.rule))),
          `${n} has a candidate claiming a rule that is not in \`rules\` — the player could never`
          + ' pick it, so that candidate can never be scored right');
        const key = +st.answer;
        need(Number.isInteger(key) && key >= 0 && key < cands.length,
          `${n} needs an \`answer\` index into its own candidates`);
        const wrong = cands.filter((_, j) => j !== key);
        need(wrong.every(c => String(c.why ?? '').trim()),
          `${n} has a wrong candidate with no \`why\` — a distractor that is merely wrong teaches`
          + ' nothing, and the reason is the whole value of authoring it');
        // The trap. A step whose wrong branches are all immediately broken is a
        // corridor with the walls painted to look like doors: the player learns
        // to pick whatever is not obviously malformed, which is not calculus.
        need(wrong.some(c => c.survives),
          `${n} has no wrong candidate marked \`survives\` — every wrong branch dies at once, so`
          + ' the step can be passed by elimination rather than by differentiating');
        // And the answer must not be findable by shape. The commonest tell is
        // the keyed line being the longest thing on the panel, every time.
        const keyLen = String(cands[key].text).length;
        need(!wrong.every(c => String(c.text).length < keyLen - 6),
          `${n}'s keyed line is longer than every distractor — the answer is identifiable by its`
          + ' shape without reading any of it');
      });
      // A rule named by no correct step is a rule nobody can ever be right to
      // pick, which is fine; a correct step whose rule is missing is not.
      return { ...base, derive: {
        start: String(b.start), goal: String(b.goal),
        ...(b.startNote ? { startNote: String(b.startNote) } : {}),
        rules: rules.map(String),
        steps: steps.map(st => ({
          ask: String(st.ask),
          answer: +st.answer,
          candidates: (st.candidates ?? []).map(c => ({
            text: String(c.text), rule: String(c.rule),
            ...(c.why ? { why: String(c.why) } : {}),
            ...(c.survives ? { survives: true } : {}),
          })),
        })),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.caption ? { caption: String(b.caption) } : {}),
        commit: b.commit ?? 'Commit the derivation',
        ...(b.lastStep ? { lastStep: String(b.lastStep) } : {}),
      } };
    }

    if(format === 'BALANCE'){
      const streams = b.streams ?? [], total = b.total ?? {};
      need(streams.length >= 3, 'a balance needs at least three streams');
      need(streams.every(x => String(x.label ?? '').trim() && numeric(x.value)),
        'every balance stream needs a label and a numeric value');
      need(numeric(total.amount), 'a balance needs a numeric total');
      need(numeric(b.tolerance) && +b.tolerance > 0, 'a balance needs a positive tolerance');
      // A stream marked `countable: false` is a different quantity — a purity
      // among mass flows — and is deliberately not part of the ledger. It is
      // still shown, because recognising it is the hardest row on the board.
      const flow = streams.filter(x => x.countable !== false);
      need(flow.length >= 3, 'a balance needs at least three countable streams');
      const all = flow.reduce((n, x) => n + +x.value, 0);
      need(Math.abs(all - +total.amount) <= +b.tolerance,
        `the countable streams sum to ${+all.toFixed(2)} and the total is ${total.amount} — the`
        + ' ledger does not close even when everything is counted');
      const hidden = flow.filter(x => x.hidden);
      need(hidden.length >= 1,
        'a balance with no `hidden` stream is arithmetic — the removal term that does not announce'
        + ' itself is the format');
      // A note that says which row is not a flow hands over the hardest decision
      // on the board before the player has read anything. Same rule as PROBE's:
      // the tell goes in `unitNote`, which appears only once a row is read, or
      // it is left to the verdict.
      const TELL = /not a (material[- ]?)?flow|do not count|cannot be added|not a [a-z-]+ term/i;
      for(const x of streams){
        need(!TELL.test(String(x.note ?? '')),
          `balance stream "${x.label}" says in its own note that it is not a flow — put that in`
          + ' `unitNote`, which is shown only after the row is read, or leave it to the verdict');
      }
      // Authoring commentary in a note reaches the player verbatim.
      need(!streams.some(x => /derived from the panel|see the panel/i.test(String(x.note ?? ''))),
        'a balance note explains where the author got the number — that reaches the player as if'
        + ' it were part of the situation');
      const obvious = flow.filter(x => !x.hidden).reduce((n, x) => n + +x.value, 0);
      need(Math.abs(obvious - +total.amount) > +b.tolerance,
        `the obvious streams alone sum to ${+obvious.toFixed(2)}, inside the tolerance — leaving`
        + ' the hidden term out is not wrong, so nothing is learned by finding it');
      return { ...base, balance: {
        total: { amount: +total.amount, unit: total.unit ?? '', label: total.label ?? 'Total' },
        streams: streams.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
          value: +x.value, ...(x.display ? { display: String(x.display) } : {}),
          ...(x.note ? { note: String(x.note) } : {}), ...(x.hidden ? { hidden: true } : {}),
          ...(x.countable === false ? { countable: false } : {}),
          ...(x.unitNote ? { unitNote: String(x.unitNote) } : {}) })),
        tolerance: +b.tolerance,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Report the total',
      } };
    }

    if(format === 'VERIFY'){
      const p = b.prediction ?? {};
      need(numeric(p.min) && numeric(p.max) && +p.max > +p.min && numeric(p.step),
        'a verify needs a prediction range with min, max and step');
      need(numeric(b.truth), 'a verify needs a numeric `truth` — what the measurement will find');
      need(+b.truth >= +p.min && +b.truth <= +p.max,
        'the verify truth is outside the range the player can predict');
      const [lo, hi] = b.passRatio ?? [];
      need(numeric(lo) && numeric(hi) && +lo < 1 && +hi > 1,
        'a verify `passRatio` brackets 1 — [0.5, 2] means "within a factor of two either way"');
      need(+p.min / +b.truth < +lo || +p.max / +b.truth > +hi,
        'every prediction in the range passes — widen the range or tighten the ratio, or the'
        + ' prediction is not being tested');
      need(String(b.measurement?.label ?? '').trim(),
        'a verify needs a `measurement` with a label — it is the thing the player can skip');
      return { ...base, verify: {
        prediction: { label: String(p.label ?? ''), unit: p.unit ?? '',
          min: +p.min, max: +p.max, step: +p.step },
        truth: +b.truth, passRatio: [+lo, +hi],
        intervention: { label: String(b.intervention?.label ?? 'The intervention'),
          note: String(b.intervention?.note ?? ''),
          outcome: String(b.intervention?.outcome ?? 'Delivered. Confirmed.') },
        measurement: { label: String(b.measurement?.label ?? ''),
          note: String(b.measurement?.note ?? ''),
          ...(numeric(b.measurement?.cost) ? { cost: +b.measurement.cost } : {}),
          costUnit: b.measurement?.costUnit ?? '' },
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        ...(b.unmeasuredMoral ? { unmeasuredMoral: String(b.unmeasuredMoral) } : {}),
        lock: b.lock ?? 'Lock the prediction', run: b.run ?? 'Commit it',
        measure: b.measure ?? 'Take the measurement', commit: b.commit ?? 'Report',
      } };
    }

    if(format === 'PROPAGATE'){
      const ins = b.inputs ?? [], imp = b.improvable ?? [];
      need(ins.length >= 3, 'an error budget needs at least three inputs');
      need(ins.every(x => String(x.label ?? '').trim() && numeric(x.value)
        && numeric(x.sigmaFrac) && +x.sigmaFrac > 0 && numeric(x.exponent)),
        'every propagate input needs a label, a numeric value, a positive `sigmaFrac`'
        + ' and a numeric `exponent`');
      const ids = ins.map(x => String(x.id ?? x.label));
      need(new Set(ids).size === ids.length, 'two propagate inputs share an id');
      need(imp.length >= 2, 'a propagate needs at least two candidate measurements to buy');
      imp.forEach(m => need(ids.includes(String(m.id)),
        `the improvable "${m.id}" is not one of the inputs`));
      need(ids.includes(String(b.dominant)),
        `the propagate dominant term "${b.dominant}" is not one of its inputs`);
      // The contribution is exponent times fractional width. The whole point is
      // that ranking by exponent gets it wrong, so a book where the largest
      // exponent IS the dominant term teaches the shortcut instead of the rule.
      const share = (x) => Math.abs(+x.exponent) * +x.sigmaFrac;
      const worst = ins.reduce((a, x) => (share(x) > share(a) ? x : a));
      need(String(worst.id ?? worst.label) === String(b.dominant),
        `the widest contribution is "${worst.id ?? worst.label}" and the book names`
        + ` "${b.dominant}" — the dominant term is arithmetic, not an opinion`);
      const biggestExp = ins.reduce((a, x) => (Math.abs(+x.exponent) > Math.abs(+a.exponent) ? x : a));
      need(String(biggestExp.id ?? biggestExp.label) !== String(b.dominant),
        'the term with the largest exponent is also the dominant one, so ranking by exponent'
        + ' gets the right answer — which is the shortcut this format exists to break');
      const buyable = imp.filter(m => m.newSigmaFrac != null);
      need(buyable.length >= 1, 'every propagate candidate is unmeasurable — nothing can be bought');
      need(buyable.some(m => String(m.id) === String(b.dominant)),
        'the dominant term cannot be measured, so the stop cannot be answered right');
      // The ledger. The panel printed a cost on every button and said one of them
      // was affordable while no budget existed anywhere, so the constraint the
      // prose claimed was decoration and cost entered neither the buttons nor the
      // grade. `budget` is in the stop's own `costUnit`, so the currency is
      // declared once.
      need(String(b.costUnit ?? '').trim(),
        'a propagate needs a `costUnit` — the ledger and the buttons are priced in it');
      need(numeric(b.budget) && +b.budget > 0,
        'a propagate needs a positive `budget` in its own costUnit, or the costs on its'
        + ' buttons constrain nothing');
      const budget = +b.budget;
      need(buyable.every(m => numeric(m.cost) && +m.cost > 0),
        'every measurable propagate candidate needs a positive `cost`, or the budget'
        + ' cannot tell one from another');
      const costOf = (id) => +(buyable.find(m => String(m.id) === String(id))?.cost ?? 0);
      const domCost = costOf(b.dominant);
      need(domCost <= budget,
        `the budget is ${budget} ${b.costUnit} and measuring the dominant term "${b.dominant}"`
        + ` costs ${domCost} — the stop cannot be answered right`);
      const others = buyable.filter(m => String(m.id) !== String(b.dominant)).map(m => +m.cost);
      need(budget < domCost + Math.min(...others),
        `the budget of ${budget} ${b.costUnit} covers the dominant term and the cheapest`
        + ' other measurement together, so buying everything is the winning play and the'
        + ' stop asks nothing');
      need(buyable.filter(m => +m.cost <= budget).length >= 2,
        'only one measurable candidate is inside the budget, so affordability names the'
        + ' answer before the arithmetic does');
      return { ...base, propagate: {
        output: { label: String(b.output?.label ?? 'Output'), unit: b.output?.unit ?? '' },
        inputs: ins.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
          value: +x.value, unit: x.unit ?? '', sigmaFrac: +x.sigmaFrac, exponent: +x.exponent })),
        improvable: imp.map(m => ({ id: String(m.id), label: String(m.label),
          cost: numeric(m.cost) ? +m.cost : 0,
          newSigmaFrac: m.newSigmaFrac == null ? null : +m.newSigmaFrac })),
        dominant: String(b.dominant), costUnit: b.costUnit ?? '', budget,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Report the range',
      } };
    }

    if(format === 'STRESS'){
      const cands = b.candidates ?? [], crits = b.criteria ?? [], a = b.assumption ?? {};
      need(cands.length >= 3, 'a stress board needs at least three candidates');
      need(crits.length >= 2, 'a stress board needs at least two criteria');
      need(numeric(a.min) && numeric(a.max) && +a.max > +a.min && numeric(a.nominal)
        && numeric(a.step), 'a stress assumption needs min, max, nominal and step');
      need(+a.nominal >= +a.min && +a.nominal <= +a.max,
        'the stress nominal is outside its own range');
      const ids = cands.map(c => String(c.id));
      need(ids.includes(String(b.robust)),
        `the stress robust candidate "${b.robust}" is not one of its candidates`);
      const needs = (id) => +((b.feasible ?? {})[id] ?? -Infinity);
      const survivors = ids.filter(id => needs(id) <= +a.min);
      need(survivors.length === 1 && survivors[0] === String(b.robust),
        survivors.length === 0
          ? 'no candidate survives the pessimistic end of the range — the stop cannot be answered'
          : !survivors.includes(String(b.robust))
            ? `the robust candidate "${b.robust}" does not survive its own range; "${survivors[0]}"`
              + ' does'
            : `${survivors.length} candidates survive the whole range, so the slider decides`
              + ' nothing and the board is a CHOICE');
      // At the nominal the robust one must NOT be the obvious pick, or there was
      // never a trap. `optimiseOn` names the criterion everybody is looking at.
      need(String(b.optimiseOn ?? '').trim(),
        'a stress board needs `optimiseOn` — the criterion the nominal makes look best');
      const at = (id) => +(((b.scores ?? {})[id] ?? {})[b.optimiseOn] ?? NaN);
      need(ids.every(id => Number.isFinite(at(id))),
        `every candidate needs a numeric "${b.optimiseOn}" score`);
      const best = ids.reduce((x, y) => (at(y) < at(x) ? y : x));
      need(best !== String(b.robust),
        `the robust candidate also wins on ${b.optimiseOn} at the nominal — nothing is traded`
        + ' away by choosing well, so moving the slider teaches nothing');
      return { ...base, stress: {
        candidates: cands.map(c => ({ id: String(c.id), label: String(c.label) })),
        criteria: crits.map(c => ({ key: String(c.key), label: String(c.label),
          unit: c.unit ?? '' })),
        scores: b.scores ?? {}, feasible: b.feasible ?? {},
        assumption: { label: String(a.label ?? ''), unit: a.unit ?? '',
          min: +a.min, max: +a.max, nominal: +a.nominal, step: +a.step },
        robust: String(b.robust), optimiseOn: String(b.optimiseOn),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Commit the choice',
      } };
    }

    if(format === 'DELEGATE'){
      const probs = b.problems ?? [], team = b.team ?? [], acts = b.firstActions ?? [];
      need(probs.length >= 3, 'a delegation needs at least three problems');
      need(team.length >= 2, 'a delegation needs at least two people to hand work to');
      need(acts.length >= 2, 'a delegation needs at least two first actions to choose between');
      need(probs.every(p => String(p.label ?? '').trim() && String(p.trend ?? '').trim()
        && String(p.rate ?? '').trim() && String(p.consequence ?? '').trim()),
        'every delegate problem needs a label, a trend, a rate and a consequence');
      const ids = probs.map(p => String(p.id));
      need(new Set(ids).size === ids.length, 'two delegate problems share an id');
      need(ids.includes(String(b.first)),
        `the delegate first problem "${b.first}" is not one of its problems`);
      const firstProb = probs.find(p => String(p.id) === String(b.first));
      // What command KEEPS is not always the most urgent thing, and forcing that
      // was this format's own mistake. Deep Watch's flooding is both — command
      // slows the boat itself. Aftershock's burst main is the most urgent hazard
      // and the action is a phone call to the utility, so it is *assigned*
      // immediately while the engineers go to the consequence checks. Its own
      // design document says so in as many words: "Assign the utility isolation
      // call immediately."
      //
      // So the thing that decides what is kept is whether anybody else can do
      // it. Exactly one problem needs the player's own judgement.
      const mine = probs.filter(p => p.delegable === false);
      need(mine.length === 1,
        `${mine.length} problems are marked \`delegable: false\` — exactly one needs the player's`
        + ' own judgement, and that is the one command keeps');
      need(String(mine[0].id) === String(b.first),
        `"${b.first}" is what command keeps, so it has to be the problem marked`
        + ` \`delegable: false\` — that is "${mine[0].id}"`);
      // And exactly one problem is the clock. Whether it is kept or assigned, it
      // is the one whose handover has to be complete before anything else.
      need(probs.filter(p => p.trend === 'rising' && p.irreversible).length === 1,
        'more than one problem is rising toward something irreversible — there is no order');
      need(probs.some(p => p.trend !== 'rising' && p.loud),
        'no problem is `loud` and stable — without one the alarm and the priority are the same'
        + ' thing, which is the mistake this format exists to catch');
      // A team smaller than the handover is a different lesson and a broken stop.
      need(team.length >= probs.length - 1,
        `${probs.length - 1} problems have to be handed to ${team.length} people`);
      return { ...base, delegate: {
        team: team.map(t => ({ id: String(t.id), label: String(t.label) })),
        firstActions: acts.map(x => ({ id: String(x.id), label: String(x.label) })),
        problems: probs.map(p => ({ id: String(p.id), label: String(p.label),
          trend: String(p.trend), rate: String(p.rate), consequence: String(p.consequence),
          ...(p.irreversible ? { irreversible: true } : {}),
          ...(p.loud ? { loud: true } : {}),
          ...(p.delegable === false ? { delegable: false } : {}) })),
        first: String(b.first),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Take the watch',
      } };
    }

    if(format === 'FLY'){
      const p = b.pulse ?? {}, br = b.brake ?? {}, s = b.state ?? {};
      need(numeric(b.accel) && +b.accel > 0, 'a fly needs a positive `accel`');
      need(numeric(p.min) && numeric(p.max) && +p.max > +p.min && numeric(p.step),
        'a fly pulse needs min, max and step');
      need(numeric(br.min) && numeric(br.max) && +br.max > +br.min && numeric(br.step),
        'a fly brake angle needs min, max and step');
      need(numeric(b.target) && numeric(b.tolerance) && +b.tolerance > 0,
        'a fly needs a numeric target and a positive tolerance');
      need(numeric(b.rateTolerance) && +b.rateTolerance > 0,
        'a fly needs a positive `rateTolerance` — arriving is half of it, stopping is the other');
      need(numeric(b.budget) && +b.budget > 0, 'a fly needs a positive pulse budget');
      // Accelerate for t, coast, brake for t starting at `brake`. It ends at
      // brake + a*t*t/2, with zero rate. Somewhere in the two ranges that has to
      // land on the target, and a full-magnitude single pulse has to overshoot.
      const endFor = (t, at) => at + (+b.accel * t * t) / 2;
      let reachable = false;
      for(let t = +p.min; t <= +p.max + 1e-9; t += +p.step){
        for(let at = +br.min; at <= +br.max + 1e-9; at += +br.step){
          if(2 * t <= +b.budget && Math.abs(endFor(t, at) - +b.target) <= +b.tolerance){
            reachable = true; break;
          }
        }
        if(reachable) break;
      }
      need(reachable, 'no combination of pulse and braking angle inside the ranges and the'
        + ' budget arrives on target — the stop cannot be answered right');
      // Braking at the target itself has to overshoot, or the format's whole
      // lesson — that the brake leads — is not in the numbers.
      const atTarget = endFor(+p.min, +b.target);
      need(atTarget - +b.target > +b.tolerance,
        `braking at the target itself lands ${(atTarget - +b.target).toFixed(2)} past it, inside`
        + ' the tolerance — so waiting until the target arrives is a correct answer');
      return { ...base, fly: {
        state: { label: String(s.label ?? 'Attitude'), unit: s.unit ?? '', init: +(s.init ?? 0) },
        rate: { label: String(b.rate?.label ?? 'Rate'), unit: b.rate?.unit ?? '' },
        accel: +b.accel,
        pulse: { min: +p.min, max: +p.max, step: +p.step, unit: p.unit ?? 's' },
        brake: { min: +br.min, max: +br.max, step: +br.step, unit: br.unit ?? s.unit ?? '' },
        pulseLabel: b.pulseLabel ?? 'Pulse each way', brakeLabel: b.brakeLabel ?? 'Begin braking at',
        target: +b.target, tolerance: +b.tolerance, rateTolerance: +b.rateTolerance,
        budget: +b.budget,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        run: b.run ?? 'Run it', commit: b.commit ?? 'Report the attitude',
      } };
    }

    if(format === 'RESIDUAL'){
      const fits = b.fits ?? [];
      need(fits.length >= 2, 'a residual needs at least two candidate fits to choose between');
      need(fits.every(f => String(f.label ?? '').trim() && numeric(f.rms)
        && (f.residuals ?? []).length >= 5),
        'every residual fit needs a label, a numeric `rms` and at least five residuals');
      need(fits.every(f => (f.residuals ?? []).every(x =>
        numeric(x.x) && numeric(x.y) && numeric(x.value))),
        'every residual point needs a numeric x, y and value');
      const ids = fits.map(f => String(f.id));
      need(new Set(ids).size === ids.length, 'two residual fits share an id');
      need(ids.includes(String(b.accept)),
        `the residual to accept, "${b.accept}", is not one of the fits`);
      const best = fits.reduce((a, f) => (+f.rms < +a.rms ? f : a));
      // The trap, and the only reason the format exists: the best number has to
      // be the wrong answer.
      need(String(best.id) !== String(b.accept),
        `the fit with the lowest RMS is also the one to accept — then "take the best number" is`
        + ' correct and nobody has to look at the field');
      need(best.structured,
        'the lowest-RMS fit is not marked `structured` — the thing that makes it wrong is the'
        + ' pattern in its residuals, and the book has to say it is there');
      const acc = fits.find(f => String(f.id) === String(b.accept));
      need(!acc.structured, 'the fit to accept is marked `structured`');
      return { ...base, residual: {
        fits: fits.map(f => ({ id: String(f.id), label: String(f.label), rms: +f.rms,
          ...(f.structured ? { structured: true } : {}),
          residuals: f.residuals.map(x => ({ x: +x.x, y: +x.y, value: +x.value })) })),
        accept: String(b.accept),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Accept this fit',
      } };
    }

    if(format === 'INJECT'){
      const cfgs = b.configs ?? [], m = b.metric ?? {};
      need(numeric(b.population?.n) && +b.population.n > 0,
        'an inject needs a population with a numeric `n`');
      need(cfgs.length >= 3, 'an inject needs at least three configurations');
      need(cfgs.every(c => String(c.label ?? '').trim() && numeric(c.detections)
        && numeric(c.metric)), 'every inject configuration needs a label, `detections` and `metric`');
      need(String(m.label ?? '').trim(),
        'an inject needs a `metric` with a label — the thing that is not the detection count');
      const ids = cfgs.map(c => String(c.id));
      need(new Set(ids).size === ids.length, 'two inject configurations share an id');
      need(ids.includes(String(b.best)),
        `the inject best configuration "${b.best}" is not one of them`);
      const byMetric = cfgs.reduce((a, c) => (+c.metric > +a.metric ? c : a));
      need(String(byMetric.id) === String(b.best),
        `"${byMetric.id}" scores highest on ${m.label} and the book names "${b.best}"`);
      const byCount = cfgs.reduce((a, c) => (+c.detections > +a.detections ? c : a));
      // The whole finding: more detections is not more of what you wanted.
      need(String(byCount.id) !== String(b.best),
        'the configuration with the most detections is also the best on the metric — then'
        + ' counting detections is correct and the format has nothing to say');
      need(String(b.blindSpot ?? '').trim(),
        'an inject needs a `blindSpot` — what never comes back, in any configuration');
      return { ...base, inject: {
        population: { n: +b.population.n },
        metric: { label: String(m.label), unit: m.unit ?? '' },
        configs: cfgs.map(c => ({ id: String(c.id), label: String(c.label),
          detections: +c.detections, metric: +c.metric })),
        best: String(b.best), blindSpot: String(b.blindSpot),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Fund it',
      } };
    }

    if(format === 'ROUTE'){
      const stops = b.stops ?? [];
      need(stops.length >= 5, 'a route needs at least five compartments');
      need(stops.every(x => String(x.label ?? '').trim() && String(x.landmark ?? '').trim()),
        'every route stop needs a label and a `landmark` — the landmark is what is still there'
        + ' when the labels are not');
      const ids = stops.map(x => String(x.id ?? x.label));
      need(new Set(ids).size === ids.length, 'two route stops share an id');
      // The landmarks are the whole of the dark half. Two the same and the
      // recovery is a guess.
      const marks = stops.map(x => String(x.landmark).toLowerCase().trim());
      need(new Set(marks).size === marks.length,
        'two route stops share a landmark — after the interruption the player cannot say which'
        + ' one they are standing in');
      const order = (b.order ?? []).map(String);
      need(order.length === stops.length && new Set(order).size === order.length
        && order.every(id => ids.includes(id)),
        'the route order must use every compartment exactly once');
      need(ids.includes(String(b.resumeAt)),
        `the route resumes at "${b.resumeAt}", which is not one of its compartments`);
      need(numeric(b.interruptAfter) && +b.interruptAfter >= 1
        && +b.interruptAfter < stops.length,
        'a route needs `interruptAfter` between 1 and one less than the number of compartments');
      // Being dropped where you already were is not an interruption.
      need(order.indexOf(String(b.resumeAt)) > +b.interruptAfter,
        'the route resumes at a compartment the player had already placed — the detour has to'
        + ' put them somewhere ahead of where they stopped');
      // A label that numbers itself answers the dark half from the labels.
      const SEQ = /\b(first|second|third|fourth|fifth|one|two|three|four|five|1|2|3|4|5|a|b|c|d|e)\b/i;
      need(!stops.every(x => SEQ.test(String(x.label))),
        'every route compartment is numbered or lettered in its own label, so the order is'
        + ' readable without the landmarks');
      return { ...base, route: {
        stops: stops.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
          landmark: String(x.landmark) })),
        order, resumeAt: String(b.resumeAt), interruptAfter: +b.interruptAfter,
        ...(b.detour ? { detour: String(b.detour) } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Walk it back', commit: b.commit ?? 'Report your position',
      } };
    }

    if(format === 'BELT'){
      const items = b.items ?? [];
      const words = (s2) => String(s2 ?? '').trim().split(/\s+/).filter(Boolean);
      const upName = String(b.left?.name ?? '').trim();
      const downName = String(b.right?.name ?? '').trim();
      need(upName && downName, 'a belt needs `left` and `right`, each with a `name` — they are'
        + ' the two bins, and an unnamed bin is a bin nobody can aim at');
      need(upName.toLowerCase() !== downName.toLowerCase(),
        'both belt bins are called the same thing');
      need(items.length >= 24, `a belt needs at least 24 items and this one has ${items.length}`
        + ' — the bank is shuffled and only part of it is played, so a short bank means every'
        + ' run is the same run');
      need(items.every(x => String(x.name ?? '').trim() && ['left', 'right'].includes(String(x.bin))),
        'every belt item needs a `name` and a `bin` of exactly `left` or `right`');
      // An item name is read at speed while the tile is moving. Three words is
      // already generous on a 124 px tile, and the twelve-word option limit that
      // governs everything else is no limit at all here.
      const longest = items.map(x => String(x.name)).filter(x => words(x).length > 3);
      need(!longest.length, `belt item names are read at speed and must be three words or fewer —`
        + ` "${longest[0]}" is ${words(longest[0] ?? '').length}`);
      const byName = new Map();
      for(const x of items){
        const k = String(x.name).trim().toLowerCase();
        if(byName.has(k) && byName.get(k) !== String(x.bin)){
          need(false, `"${x.name}" is on the belt in both bins, so it cannot be sorted right`);
        }
        need(!byName.has(k), `"${x.name}" appears on the belt twice`);
        byName.set(k, String(x.bin));
      }
      const lefts = items.filter(x => String(x.bin) === 'left').length;
      const rights = items.length - lefts;
      need(lefts >= 8 && rights >= 8,
        `the belt has ${lefts} on one side and ${rights} on the other — each bin needs at least 8`);
      // THE TRAP, and the reason this format is worth checking at all. A belt
      // whose items can be sorted by SPELLING teaches spelling. If one word
      // appearing in four or more names sorts them one way more than four times
      // in five, the category is never consulted — the same argument as
      // `answerShape.mjs`, that the longest option must not be the answer key.
      const tally = new Map();
      for(const x of items){
        for(const w of new Set(words(x.name).map(t => t.toLowerCase().replace(/[^a-z]/g, '')))){
          if(w.length < 3) continue;
          const t = tally.get(w) ?? { left: 0, right: 0 };
          t[String(x.bin)]++;
          tally.set(w, t);
        }
      }
      for(const [w, t] of tally){
        const n = t.left + t.right;
        if(n < 4) continue;
        const skew = Math.max(t.left, t.right) / n;
        need(skew <= 0.8, `the word "${w}" appears in ${n} belt items and`
          + ` ${Math.round(skew * 100)}% of them go to the same bin — the belt is winnable by`
          + ' spelling rather than by the category. Give the other bin some items that use it');
      }
      // The second trap: a bank that is four fifths one bin is played by holding
      // one key, which passes and teaches nothing.
      const split = Math.max(lefts, rights) / items.length;
      need(split <= 0.65, `${Math.round(split * 100)}% of the belt goes to one bin — a player who`
        + ' always chooses that side passes without reading anything');
      const need_ = Number.isFinite(+b.need) ? +b.need : 20;
      const lives = Number.isFinite(+b.lives) ? +b.lives : 3;
      const pass = Number.isFinite(+b.pass) ? +b.pass : 0.8;
      need(need_ >= 8 && need_ <= items.length,
        `a belt run of ${need_} items needs a bank at least that big, and at least 8`);
      need(lives >= 1 && lives < need_, 'a belt needs at least one life and fewer lives than items');
      need(pass > 0.5 && pass <= 1,
        'a belt pass mark must be above half — at or below it, guessing passes');
      return { ...base, belt: {
        left: { name: upName, ...(b.left?.colour ? { colour: String(b.left.colour) } : {}) },
        right: { name: downName, ...(b.right?.colour ? { colour: String(b.right.colour) } : {}) },
        items: items.map(x => ({ name: String(x.name).trim(), bin: String(x.bin) })),
        need: need_, lives, pass,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Start the line',
      } };
    }

    if(format === 'LOB'){
      const marks = b.targets ?? [];
      const num = (v) => Number.isFinite(+v);
      const shots = num(b.shots) ? +b.shots : 3;
      const g0 = num(b.gravity) ? +b.gravity : 9.81;
      const vMax = num(b.maxSpeed) ? +b.maxSpeed : 40;
      const wind = num(b.wind) ? +b.wind : 0;
      const y0 = num(b.height) ? +b.height : 1.5;
      need(marks.length >= 2 && marks.length <= 5,
        `a lob needs between two and five marks and this one has ${marks.length}`);
      need(marks.every(m => String(m.label ?? '').trim() && num(m.distance) && +m.distance > 0
        && num(m.radius) && +m.radius > 0),
        'every lob mark needs a `label`, a positive `distance` and a positive `radius`');
      need(marks.every((m, i) => i === 0 || +m.distance > +marks[i - 1].distance),
        'the lob marks must be ordered by distance, nearest first — the run works outward');
      need(shots >= 2 && shots <= 6, 'a lob allows between two and six shots at each mark');
      need(vMax > 0 && g0 > 0, 'a lob needs a positive `maxSpeed` and `gravity`');

      // The same flight the panel flies. Duplicated deliberately rather than
      // imported: `instruments.js` is a browser module and this is Node, and a
      // shared physics file for eleven lines would be a third place to look.
      const land = (deg, power) => {
        const th = deg * Math.PI / 180;
        const v = power * vMax;
        let x = 0, y = y0, vx = v * Math.cos(th), vy = v * Math.sin(th);
        for(let n = 0; n < 4000 && y >= 0; n++){
          vx += wind * 0.01; vy -= g0 * 0.01;
          x += vx * 0.01; y += vy * 0.01;
        }
        return x;
      };

      for(const m of marks){
        // THE TRAP. A mark any angle reaches is a mark hit by firing, and the
        // format then teaches that projectiles go where you point them.
        const sample = [15, 30, 45, 60, 75];
        const easy = sample.filter(a => Math.abs(land(a, 1) - +m.distance) <= +m.radius).length;
        need(easy < 3,
          `"${m.label}" is reached at full charge by ${easy} of five sampled angles — aiming is`
          + ' decoration on this mark. Move it, or tighten its radius');
        // And the other end of the same defect: a mark nothing reaches is not
        // difficulty, it is a stop nobody can pass.
        let best = Infinity;
        for(let a = 10; a <= 80; a += 2){
          for(let p2 = 0.2; p2 <= 1.0001; p2 += 0.02){
            best = Math.min(best, Math.abs(land(a, p2) - +m.distance));
          }
        }
        need(best <= +m.radius,
          `nothing the controls can do puts a shot within ${m.radius} m of "${m.label}" at`
          + ` ${m.distance} m — the closest reachable is ${best.toFixed(1)} m off`);
      }
      return { ...base, lob: {
        targets: marks.map(m => ({ label: String(m.label), distance: +m.distance,
          radius: +m.radius })),
        shots, gravity: g0, maxSpeed: vMax, height: y0,
        ...(wind ? { wind } : {}),
        ...(b.projectile ? { projectile: String(b.projectile) } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Fire',
      } };
    }

    if(format === 'STACK'){
      const qs = b.questions ?? [];
      const words = (x) => String(x ?? '').trim().split(/\s+/).filter(Boolean).length;
      // NOT `need` — that is this file's own validator, and shadowing it here
      // turns every check below into "need is not a function".
      const runLen = Number.isFinite(+b.need) ? +b.need : 8;
      const pass = Number.isFinite(+b.pass) ? +b.pass : 0.75;
      need(qs.length >= 12,
        `a stack rail needs at least twelve questions and this one has ${qs.length} — the bank`
        + ' is shuffled and only part of it is played, so a short one is the same run twice');
      need(qs.every(q => String(q.q ?? '').trim() && Array.isArray(q.a) && q.a.length === 4),
        'every stack question needs a `q` and exactly four options in `a`');
      need(qs.every(q => Number.isInteger(+q.correct) && +q.correct >= 0 && +q.correct < 4),
        'every stack question needs a `correct` index between 0 and 3');
      // Read while a piece is falling. The twelve-word option limit that governs
      // every other format is generous here and this is tighter on purpose.
      const longQ = qs.find(q => words(q.q) > 16);
      need(!longQ, longQ ? `"${longQ.q}" is ${words(longQ.q)} words — a stack question is read`
        + ' while a piece is falling, so sixteen is the limit' : '');
      const longA = qs.flatMap(q => q.a).find(a => words(a) > 8);
      need(!longA, longA ? `the option "${longA}" is ${words(longA)} words — eight is the limit`
        + ' with four of them to read and a stack coming down' : '');
      const dupe = qs.find(q => new Set(q.a.map(x => String(x).trim().toLowerCase())).size < 4);
      need(!dupe, dupe ? `"${dupe.q}" repeats an option, so one of its wrong answers cannot be`
        + ' wrong' : '');
      need(runLen >= 4 && runLen <= qs.length,
        `a run of ${runLen} questions needs a bank at least that big, and at least four`);
      need(pass > 0.5 && pass <= 1, 'a stack pass mark must be above half');
      // THE TRAP, and it is `answerShape.mjs` arriving in a format that file
      // cannot see: a bank whose key sits at the same index is winnable by
      // position, and one whose key is reliably the longest option is winnable
      // by length. The panel shuffles every question at runtime regardless —
      // belt and braces, because a bank is authored once and read for years.
      const byIdx = [0, 1, 2, 3].map(i => qs.filter(q => +q.correct === i).length);
      const topIdx = Math.max(...byIdx) / qs.length;
      need(topIdx <= 0.4,
        `${Math.round(topIdx * 100)}% of the keyed answers sit at the same position — the rail is`
        + ' answerable without reading it');
      const longest = qs.filter(q => {
        const lens = q.a.map(a => String(a).length);
        return lens[+q.correct] === Math.max(...lens)
          && lens.filter(l => l === Math.max(...lens)).length === 1;
      }).length / qs.length;
      need(longest <= 0.6,
        `the keyed answer is the longest option on its own in ${Math.round(longest * 100)}% of`
        + ' these questions — the rail is answerable by length');
      return { ...base, stack: {
        questions: qs.map(q => ({ q: String(q.q), a: q.a.map(String), correct: +q.correct })),
        need: runLen, pass,
        ...(Number.isFinite(+b.cols) ? { cols: +b.cols } : {}),
        ...(Number.isFinite(+b.rows) ? { rows: +b.rows } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Start the run',
      } };
    }

    if(format === 'SPOT'){
      const targets = b.targets ?? [];
      const rules = b.rules ?? [];
      need(targets.length >= 6,
        `a spot board needs at least six items and this one has ${targets.length}`);
      need(targets.every(t => String(t.id ?? '').trim() && String(t.label ?? '').trim()
        && Array.isArray(t.tags) && t.tags.length),
        'every spot item needs an `id`, a `label` and at least one tag');
      need(new Set(targets.map(t => String(t.id))).size === targets.length,
        'two spot items share an id');
      const longest = targets.map(t => String(t.label)).filter(x => x.trim().split(/\s+/).length > 4);
      need(!longest.length,
        `a spot item is read while it is on the board — four words at most, and "${longest[0]}"`
        + ' is longer');
      need(rules.length >= 2,
        'a spot board needs at least two instructions — one instruction never changes');
      need(rules.every(r => String(r.say ?? '').trim() && Array.isArray(r.want) && r.want.length),
        'every spot rule needs a `say` line and a non-empty `want` list of tags');
      const known = new Set(targets.flatMap(t => t.tags.map(String)));
      for(const r of rules){
        for(const t of r.want){
          need(known.has(String(t)),
            `the rule "${r.say}" wants the tag "${t}" and no item on the board carries it`);
        }
      }
      const sel = rules.map(r => new Set(targets
        .filter(t => r.want.some(x => t.tags.map(String).includes(String(x))))
        .map(t => String(t.id))));
      // A rule that takes the whole board, or none of it, is not an instruction:
      // there is nothing to withhold and nothing to take.
      rules.forEach((r, i) => {
        need(sel[i].size > 0 && sel[i].size < targets.length,
          `the rule "${r.say}" selects ${sel[i].size} of ${targets.length} items — an`
          + ' instruction that wants everything or nothing asks the player for nothing');
      });
      // THE TRAP. Two consecutive instructions that select the same items are
      // not a change. The board looks identical, the player is rewarded for not
      // noticing, and the stop measures the opposite of its own subject.
      const same = (a, c) => a.size === c.size && [...a].every(x => c.has(x));
      for(let i = 0; i < rules.length; i++){
        const j = (i + 1) % rules.length;
        if(rules.length === 2 && j === 0 && i === 1) break;
        need(!same(sel[i], sel[j]),
          `"${rules[i].say}" and "${rules[j].say}" select the same items, so the instruction`
          + ' changing changes nothing — which is exactly the thing this format measures');
      }
      // An item every rule wants is an item that is always safe to take, and a
      // board with one in it can be played without reading the instruction.
      const always = targets.filter(t => sel.every(x => x.has(String(t.id))));
      need(!always.length,
        always.length ? `"${always[0].label}" is wanted by every instruction, so taking it is`
          + ' never wrong whatever the board says' : '');
      const duration = Number.isFinite(+b.duration) ? +b.duration : 40;
      const switchEvery = Number.isFinite(+b.switchEvery) ? +b.switchEvery : 10;
      need(duration >= 20 && duration <= 120, 'a spot run is between 20 and 120 seconds');
      need(switchEvery > 2 && duration / switchEvery >= 2,
        `at ${switchEvery} s between changes a ${duration} s run gets fewer than two of them —`
        + ' a board whose instruction changes once measures one switch and calls it a score');
      const pass = Number.isFinite(+b.pass) ? +b.pass : 0.75;
      need(pass > 0.5 && pass <= 1, 'a spot pass mark must be above half');
      return { ...base, spot: {
        targets: targets.map(t => ({ id: String(t.id), label: String(t.label),
          tags: t.tags.map(String) })),
        rules: rules.map(r => ({ say: String(r.say), want: r.want.map(String) })),
        duration, switchEvery, pass,
        ...(Number.isFinite(+b.spawnEvery) ? { spawnEvery: +b.spawnEvery } : {}),
        ...(Number.isFinite(+b.life) ? { life: +b.life } : {}),
        ...(Number.isFinite(+b.window) ? { window: +b.window } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Open the board',
      } };
    }

    if(format === 'HOLD'){
      const num = (v) => Number.isFinite(+v);
      const events = (b.disturbances ?? []).map(e => ({ ...e, at: +e.at, amount: +e.amount }));
      need(String(b.quantity ?? '').trim() && String(b.control ?? '').trim(),
        'a hold needs a `quantity` to hold and a named `control` to hold it with');
      need(num(b.hold) && num(b.band) && +b.band > 0,
        'a hold needs a numeric `hold` and a positive `band`');
      const narrowTo = num(b.narrowTo) ? +b.narrowTo : +b.band;
      need(narrowTo > 0 && narrowTo <= +b.band,
        '`narrowTo` is the band at the END of the run, so it must be positive and no wider'
        + ' than the band at the start');
      const duration = num(b.duration) ? +b.duration : 45;
      need(duration >= 20 && duration <= 120,
        `a hold runs for ${duration} s — under 20 there is no run and over 120 there is no game`);
      need(['raise', 'lower'].includes(String(b.direction ?? 'raise')),
        '`direction` is `raise` or `lower` — which way the control moves the quantity. It is'
        + ' never printed: it is the thing the stop is teaching');
      const authority = num(b.authority) ? +b.authority : 0.5;
      need(authority > 0, 'a hold needs a positive `authority` — how far the control can push');
      need(events.length >= 1, 'a hold with no disturbances is a needle that stays where it is');
      need(events.every(e => num(e.at) && num(e.amount) && +e.amount !== 0
        && String(e.label ?? '').trim()),
        'every disturbance needs a `label`, a numeric `at` and a non-zero `amount`');
      need(events.every(e => +e.at >= 0 && +e.at < duration),
        'a disturbance arrives after the run has ended');
      const pass = num(b.pass) ? +b.pass : 0.8;
      need(pass > 0.5 && pass <= 1, 'a hold pass mark must be above half');

      // THE TRAP. A disturbance is a step in the RATE — a load comes on and the
      // quantity keeps going until something answers it — so a do-nothing run is
      // the integral of those steps, in closed form. If that never leaves the
      // corridor, the corridor is decoration: the panel renders, the needle
      // wanders, and the player passes without touching the control.
      //
      // Measured as the FRACTION of the run left alone stays inside, against the
      // pass mark — not merely as "does it ever leave". A board the needle steps
      // out of for two seconds at the end is a board a player passes by doing
      // nothing at all, and the first version of this check called that fine.
      let v = 0, rate = 0, worst = 0, inside = 0;
      const sorted = events.slice().sort((a, c) => a.at - c.at);
      const bandAtT = (t) => +b.band + (narrowTo - +b.band) * Math.min(1, t / duration);
      const dt = 0.02;
      for(let t = 0, i = 0; t < duration; t += dt){
        while(i < sorted.length && sorted[i].at <= t) rate += sorted[i++].amount;
        v += rate * dt;
        worst = Math.max(worst, Math.abs(v));
        if(Math.abs(v) <= bandAtT(t)) inside += dt;
      }
      const lazy = inside / duration;
      need(lazy < pass,
        `left alone, this board stays inside the band for ${(lazy * 100).toFixed(0)}% of the run`
        + ` and ${(pass * 100).toFixed(0)}% is a pass — so a player who never touches the control`
        + ` passes. It drifts at most ${worst.toFixed(3)} from the target; make the disturbances`
        + ' bigger, the band tighter, or the run longer');
      // And the other side of the same defect: a board the control cannot answer
      // is unwinnable, which also renders perfectly and also asks nothing.
      let peak = 0, acc = 0;
      for(const e of sorted){ acc += e.amount; peak = Math.max(peak, Math.abs(acc)); }
      need(authority >= peak,
        `the disturbances reach ${peak.toFixed(2)} of rate between them and the control is worth`
        + ` ${authority.toFixed(2)} at full deflection — the needle cannot be brought back, so`
        + ' the run is lost whatever the player does');
      return { ...base, hold: {
        quantity: String(b.quantity), control: String(b.control),
        unit: String(b.unit ?? ''), hold: +b.hold, band: +b.band, narrowTo,
        duration, authority, pass, direction: String(b.direction ?? 'raise'),
        ...(num(b.noise) ? { noise: +b.noise } : {}),
        disturbances: sorted.map(e => ({ label: String(e.label), at: +e.at, amount: +e.amount })),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        commit: b.commit ?? 'Take the controls',
      } };
    }

    if(format === 'TRIAL'){
      const gates = b.gates ?? [];
      const order = (b.order ?? []).map(String);
      need(gates.length >= 4 && gates.length <= 8,
        `a trial needs between four and eight gates and this one has ${gates.length}`);
      need(gates.every(g => String(g.id ?? '').trim() && String(g.label ?? '').trim()),
        'every trial gate needs an `id` and a `label`');
      const ids = gates.map(g => String(g.id));
      need(new Set(ids).size === ids.length, 'two trial gates share an id');
      need(order.length === ids.length && new Set(order).size === order.length
        && order.every(id => ids.includes(id)),
        'the trial `order` must use every gate exactly once');
      // A label that numbers itself is the answer printed on the briefing. Same
      // check ROUTE carries, for the same reason.
      const SEQ = /\b(first|second|third|fourth|fifth|sixth|last|one|two|three|four|five|1|2|3|4|5|6)\b/i;
      need(!gates.some(g => SEQ.test(String(g.label))),
        'a trial gate label numbers itself, which prints the order on the briefing');

      // ---- everything below is about the ground rather than the book
      need(!!SITE, 'a trial is graded against the place, and this theme\'s `site.js` could not'
        + ' be read — without it there is no way to tell whether the order is also the'
        + ' shortest route');
      const buildings = SITE?.buildings ?? [];
      /**
       * Where a gate actually goes.
       *
       * **Not the building's centre**, which is the first thing this did and the
       * first thing a screenshot killed: a building's `x, z` is the middle of
       * it, a gate is 7 m across, and the ring came out under the floor with the
       * beacon inside the roof. Invisible, and — because the building is a solid
       * collider — unreachable on foot. The run only completed at all because
       * the harness teleports.
       *
       * So a gate sits in front of the door, on the same `facing` convention
       * `kit.js` uses to put the door and the standing spot there: far enough out
       * that the whole ring clears the wall. A gate given an explicit `x, z` is
       * left exactly where the author put it.
       */
      const STANDOFF = 10;
      const posOf = (g) => {
        if(Number.isFinite(+g.x) && Number.isFinite(+g.z)) return { x: +g.x, z: +g.z };
        const at = String(g.at ?? '');
        const b2 = buildings.find(x => String(x.id) === at || String(x.group ?? '') === at);
        if(!b2) return null;
        const facing = +(b2.facing ?? 0);
        const out = (+b2.d || 10) / 2 + STANDOFF;
        return { x: +b2.x + Math.sin(facing) * out, z: +b2.z + Math.cos(facing) * out };
      };
      const placed = gates.map(g => ({ id: String(g.id), label: String(g.label), p: posOf(g) }));
      const lost = placed.find(g => !g.p);
      need(!lost, lost ? `the trial gate "${lost.label}" has no place: give it \`at\` naming a`
        + ' building or a group in site.js, or an explicit `x` and `z`' : '');
      if(placed.every(g => g.p)){
        const spawn = SITE.spawn ?? { x: 0, z: 0 };
        const d = (a, b3) => Math.hypot(a.x - b3.x, a.z - b3.z);
        // Reachable at all. A gate outside the world's own fence is a gate the
        // player walks at until the invisible wall stops them.
        const limit = +(SITE.terrain?.playerLimit ?? Infinity);
        const outside = placed.find(g => Math.hypot(g.p.x, g.p.z) > limit);
        need(!outside, outside ? `the trial gate "${outside.label}" is outside the theme's own`
          + ` playerLimit of ${limit} — the player cannot reach it` : '');
        // Two gates inside one another are taken together, in an order neither
        // the player nor this file decides. The pass radius is 7 m.
        for(let i = 0; i < placed.length; i++){
          for(let j = i + 1; j < placed.length; j++){
            need(d(placed[i].p, placed[j].p) >= 20,
              `the trial gates "${placed[i].label}" and "${placed[j].label}" are`
              + ` ${d(placed[i].p, placed[j].p).toFixed(0)} m apart — a gate is 7 m across, so`
              + ' anything under 20 m is two gates taken in one pass');
          }
        }
        // THE TRAP. If the authored order is the nearest-neighbour walk from the
        // spawn, the fastest line is the correct line, the sequence is free, and
        // nothing about the science is being asked. Invisible in the book,
        // obvious on the ground, and the reason this check reads site.js at all.
        const left = placed.slice();
        const nn = [];
        let from = { x: +spawn.x, z: +spawn.z };
        while(left.length){
          let best = 0;
          for(let i = 1; i < left.length; i++){
            if(d(from, left[i].p) < d(from, left[best].p)) best = i;
          }
          from = left[best].p;
          nn.push(left.splice(best, 1)[0].id);
        }
        need(!(nn.length === order.length && nn.every((id, i) => id === order[i])),
          'the trial order is the nearest-neighbour route from the spawn, so the fastest line is'
          + ' also the correct one and the sequence costs nothing to know. Move a gate, or ask'
          + ' for an order the ground does not already give');
      }
      return { ...base, trial: {
        gates: placed.map((g, i) => ({ id: g.id, label: g.label,
          // Rounded: these are metres on open ground and a gate is 7 m across,
          // so a centimetre of floating-point tail in a generated file is noise
          // that shows up as a diff every time the book is re-imported.
          x: +(g.p?.x ?? 0).toFixed(2), z: +(g.p?.z ?? 0).toFixed(2),
          ...(gates[i].note ? { note: String(gates[i].note) } : {}),
          ...(gates[i].because ? { because: String(gates[i].because) } : {}) })),
        order,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Run it', commit: b.commit ?? 'Stand by this route',
      } };
    }

    /* ------------------------------------------------- the world-graded five
     *
     * GREET, FOLLOW, HUNT, CANVASS and EVADE are graded against the place, so
     * like TRIAL every one of their traps reads `site.js`. The shape of all five
     * is the same and worth stating once: **a run whose goal is reached by doing
     * nothing, or by walking to whatever is nearest, is a run that asks
     * nothing.** Each trap below is that sentence in the format's own arithmetic,
     * settled in closed form the way HOLD's is, because the defect is invisible
     * in the book and obvious on the ground.
     *
     * Walking pace is the player's own 4.2 m/s (`engine/core/player.js`). The
     * clock runs at one game minute per real second, so an authored `minutes` is
     * that many seconds of run. */
    const num = (v) => Number.isFinite(+v);
    const WALK = 4.2;
    const site = () => { need(!!SITE, `a ${format} is graded against the place, and this`
      + " theme's `site.js` could not be read"); return SITE ?? {}; };
    const spawnAt = () => ({ x: +(SITE?.spawn?.x ?? 0), z: +(SITE?.spawn?.z ?? 0) });
    const gap = (a, c) => Math.hypot(a.x - c.x, a.z - c.z);
    /** Where somebody on the roster stands: out in front of their area's door. */
    const personAt = (id) => {
      const p = ROSTER.find(x => String(x.id) === String(id));
      if(!p) return null;
      const b2 = (SITE?.buildings ?? []).find(x => String(x.group ?? '') === String(p.division));
      if(!b2) return null;
      const facing = +(b2.facing ?? 0);
      const out = (+b2.d || 10) / 2 + 6;
      return { x: +b2.x + Math.sin(facing) * out, z: +b2.z + Math.cos(facing) * out,
        division: p.division, name: p.name };
    };
    /** Seconds to walk the nearest-neighbour route from the spawn over `n` of these. */
    const routeSeconds = (points, n) => {
      const left = points.slice();
      let from = spawnAt();
      let metres = 0;
      for(let k = 0; k < n && left.length; k++){
        let best = 0;
        for(let i = 1; i < left.length; i++) if(gap(from, left[i]) < gap(from, left[best])) best = i;
        metres += gap(from, left[best]);
        from = left[best];
        left.splice(best, 1);
      }
      return metres / WALK;
    };
    /** The two ends of every clock in here, as one sentence. */
    const clockBand = (walkSeconds, limit, what) => {
      need(walkSeconds <= limit * 0.95,
        `${what} cannot be done in the time: the shortest route is about`
        + ` ${Math.round(walkSeconds)} s and the run allows ${limit}. A goal that`
        + ' cannot be reached is not a hard stop, it is a broken one');
      need(walkSeconds >= limit * 0.55,
        `${what} takes about ${Math.round(walkSeconds)} s of the ${limit} allowed, so the`
        + ' clock is not a constraint and no route decision is being made. Ask for more of'
        + ' them, spread them further, or shorten the run');
    };

    if(format === 'GREET'){
      const roster = b.roster ?? [];
      const target = +b.target;
      const minutes = +b.minutes;
      need(roster.length >= 4, 'a round needs at least four people on the list');
      // Nobody counts twice. The run already greets each person once — see
      // worldFormats.js — so a name written twice is a list that looks longer
      // than it is and a target that is quietly lower than it reads.
      need(new Set(roster.map(p => String(p.id))).size === roster.length,
        'the same person is on the round twice, so the target is lower than it looks');
      need(Number.isInteger(target) && target >= 3 && target <= roster.length,
        `greet ${target} of ${roster.length} — the target must be at least three and no more`
        + ' than the list');
      need(target < roster.length,
        'the target is the whole list, so there is nothing to choose between and no route'
        + ' to plan — put more people on the list than have to be reached');
      need(num(minutes) && minutes >= 10, 'a round needs `minutes`, and at least ten of them');
      site();
      const placed = roster.map(p => ({ ...p, at: personAt(p.id) }));
      const lost = placed.find(p => !p.at);
      need(!lost, lost ? `"${lost.id}" is not on this theme's roster, or their area has no`
        + ' building in site.js — the run would mark nobody' : '');
      if(placed.every(p => p.at)){
        const areas = new Set(placed.map(p => p.at.division));
        need(areas.size >= 2,
          `everybody on the list works at ${[...areas][0]}, so the round is one walk to one`
          + ' place. A round is a route, and a route needs somewhere else to be');
        // THE TRAP. The target taken from wherever is nearest, walked at the
        // player's own pace: if that fits comfortably inside the hour there is no
        // hour, and the list might as well be the four people by the gate.
        clockBand(routeSeconds(placed.map(p => p.at), target), minutes, 'the round');
      }
      return { ...base, greet: {
        roster: placed.map(p => ({ id: String(p.id), name: String(p.name ?? p.id),
          ...(p.note ? { note: String(p.note) } : {}),
          ...(p.where ? { where: String(p.where) } : {}) })),
        target, minutes,
        ...(num(b.radius) ? { radius: +b.radius } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Set off', commit: b.commit ?? 'Report the round',
      } };
    }

    if(format === 'FOLLOW'){
      const path = b.path ?? [];
      const near = +b.band?.near, far = +b.band?.far;
      const speed = +b.speed, seconds = +b.seconds, pass = +b.pass;
      need(path.length >= 3, 'a walk needs at least three legs, or it is a straight line');
      need(path.every(p => num(p.x) && num(p.z)), 'every leg of the walk needs `x` and `z`');
      need(num(near) && num(far) && near >= 2 && far >= near + 4,
        'the band needs a `near` of at least 2 m and a `far` at least 4 m beyond it — a band'
        + ' narrower than that is a dexterity test, which is instrument rule 3');
      need(num(speed) && speed >= 0.8 && speed < WALK,
        `the guide walks at ${speed} m/s and the player walks at ${WALK} — a guide at or above`
        + ' the player\'s own pace cannot be followed, and one under 0.8 is not a walk');
      need(num(pass) && pass > 0.5 && pass < 1,
        'the pass fraction has to be between a half and one — it is grading slack and is'
        + ' never printed on the panel');
      need(!!personAt(b.guide), `"${b.guide}" is not on this theme's roster, so there is`
        + ' nobody to follow');
      site();
      const limit = +(SITE.terrain?.playerLimit ?? Infinity);
      const outside = path.find(p => Math.hypot(+p.x, +p.z) > limit);
      need(!outside, outside ? `a leg of the walk at ${outside.x}, ${outside.z} is outside the`
        + ` theme's own playerLimit of ${limit}` : '');
      // Long enough to be walked, in the time allowed.
      let metres = 0, pause = 0;
      let from = personAt(b.guide) ?? spawnAt();
      for(const p of path){ metres += gap(from, { x: +p.x, z: +p.z }); pause += +p.pause || 0;
        from = { x: +p.x, z: +p.z }; }
      const walkTime = metres / speed + pause;
      need(num(seconds) && seconds >= walkTime * 1.1,
        `the walk takes about ${Math.round(walkTime)} s and the run allows ${seconds} — the`
        + ' guide would never arrive, so the stop cannot be passed');
      // THE TRAP, and it is HOLD's: what does a player who does nothing at all
      // score? If the whole route stays inside the far edge of the band from the
      // spawn, standing still is following.
      const home = personAt(b.guide) ?? spawnAt();
      const furthest = Math.max(...path.map(p => gap(home, { x: +p.x, z: +p.z })));
      need(furthest > far,
        `the walk never gets more than ${Math.round(furthest)} m from where it starts and the`
        + ` band reaches ${far} — a player who does not move stays inside it for the whole run`);
      return { ...base, follow: {
        guide: String(b.guide), speed, seconds, pass,
        band: { near, far },
        path: path.map(p => ({ x: +(+p.x).toFixed(2), z: +(+p.z).toFixed(2),
          ...(num(p.pause) ? { pause: +p.pause } : {}) })),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Set off with them', commit: b.commit ?? 'Report the walk',
      } };
    }

    if(format === 'HUNT'){
      const at = b.at ?? [];
      const target = +b.target, minutes = +b.minutes;
      need(!!String(b.item?.name ?? '').trim(), 'a search needs an `item` with a `name` — the'
        + ' player has to be told what they are looking for');
      need(at.length >= 5 && at.every(p => num(p.x) && num(p.z)),
        'a search needs at least five placed items, each with `x` and `z`');
      need(Number.isInteger(target) && target >= 3 && target < at.length,
        `find ${target} of ${at.length} — the target must be at least three and fewer than`
        + ' the number out there, or there is nothing to leave behind');
      need(num(minutes) && minutes >= 10, 'a search needs `minutes`, and at least ten of them');
      site();
      const limit = +(SITE.terrain?.playerLimit ?? Infinity);
      const out = at.find(p => Math.hypot(+p.x, +p.z) > limit);
      need(!out, out ? `an item at ${out.x}, ${out.z} is outside the theme's own playerLimit`
        + ` of ${limit} — the player cannot reach it` : '');
      for(let i = 0; i < at.length; i++){
        for(let j = i + 1; j < at.length; j++){
          const d = gap({ x: +at[i].x, z: +at[i].z }, { x: +at[j].x, z: +at[j].z });
          need(d >= 12, `two items are ${d.toFixed(0)} m apart — the pickup radius is about`
            + ' 3 m, so anything under 12 m is two items collected in one pass');
        }
      }
      // THE TRAP, GREET's in another currency: the nearest `target` of them,
      // walked from the spawn. If that fits inside the time there is no search.
      clockBand(routeSeconds(at.map(p => ({ x: +p.x, z: +p.z })), target), minutes,
        'the search');
      return { ...base, hunt: {
        item: { name: String(b.item.name),
          ...(num(b.item.colour) ? { colour: +b.item.colour } : {}) },
        target, minutes,
        at: at.map(p => ({ x: +(+p.x).toFixed(2), z: +(+p.z).toFixed(2) })),
        ...(num(b.radius) ? { radius: +b.radius } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Start looking', commit: b.commit ?? 'Hand them in',
      } };
    }

    if(format === 'CANVASS'){
      const pop = b.population ?? [];
      const minutes = +b.minutes;
      need(!!String(b.claim ?? '').trim(), 'a canvass needs a `claim` — the yes-or-no question'
        + ' the sample is being taken about');
      need(pop.length >= 8, 'a canvass needs at least eight people, or the sample is the'
        + ' population and there is nothing to judge');
      need(new Set(pop.map(p => String(p.id))).size === pop.length,
        'the same person is in the canvass twice, which weights one answer double');
      need(typeof b.answer === 'boolean', 'a canvass needs `answer: true` or `answer: false` —'
        + ' what the place actually thinks');
      need(num(minutes) && minutes >= 10, 'a canvass needs `minutes`, and at least ten of them');
      const leanYes = pop.filter(p => p.says === true).length;
      const leanNo = pop.filter(p => p.says === false).length;
      need(leanYes + leanNo === pop.length, 'every person in a canvass needs `says: true` or'
        + ' `says: false` — there is no third answer to give');
      // A person answers along their lean `skew` of the time, so what the site
      // actually says is the EXPECTED split rather than the count of leans. The
      // checks below all read that: a book whose leans are 5–9 and whose skew is
      // 0.6 is a site far closer to even than it looks on the page.
      const skew = num(b.skew) ? +b.skew : 0.75;
      need(skew > 0.5 && skew <= 0.95,
        `a skew of ${skew} is not a lean: at or under a half nobody answers along it, and over`
        + ' 0.95 everybody in an area answers identically, which is what made the first version'
        + ' of this format pointless to sample twice');
      const yes = leanYes * skew + leanNo * (1 - skew);
      const no = pop.length - yes;
      const share = Math.max(yes, no) / pop.length;
      need(share <= 0.75, `${Math.round(share * 100)}% of them say the same thing, so any three`
        + ' answers settle it and no sample has to be judged');
      need(Math.abs(yes - no) >= 2 && share >= 0.55,
        `${yes.toFixed(1)} to ${no.toFixed(1)} expected is too close to call from the population`
        + ' itself, so the stop grades a coin toss. A claim has to be true of the place before'
        + ' it can be found');
      need((yes > no) === !!b.answer,
        `the population is expected to say ${yes > no ? 'yes' : 'no'} and \`answer\` says the`
        + ' opposite — the stop would mark a correct sample wrong');
      site();
      const placed = pop.map(p => ({ ...p, at: personAt(p.id) }));
      const lost = placed.find(p => !p.at);
      need(!lost, lost ? `"${lost.id}" is not on this theme's roster, or their area has no`
        + ' building in site.js' : '');
      if(placed.every(p => p.at)){
        need(new Set(placed.map(p => p.at.division)).size >= 2,
          'everybody being asked works in one area, so there is nowhere for the sample to be'
          + ' unrepresentative of and the format has nothing to teach');
        // THE TRAP. Ask whoever is standing nearest and stop: if the five closest
        // to the spawn already agree on the true answer, the walk buys nothing
        // and a player who understood none of this is right anyway.
        const near5 = placed.slice()
          .sort((p, q) => gap(spawnAt(), p.at) - gap(spawnAt(), q.at)).slice(0, 5);
        // Expected, not counted — and as a FRACTION, because an expectation
        // cannot reach the whole-person thresholds a count could. Five people
        // all leaning the true way answer that way three times in four at the
        // default skew, which is a free correct answer; 0.7 is where that starts.
        const near5Yes = (near5.filter(p => p.says).length * skew
          + near5.filter(p => !p.says).length * (1 - skew)) / Math.max(1, near5.length);
        const towardTruth = b.answer ? near5Yes : 1 - near5Yes;
        need(!(towardTruth >= 0.7),
          'the five people nearest the spawn already give the right answer four to one, so the'
          + ' sample can be taken without walking anywhere. Move somebody, or put the pocket'
          + ' that disagrees at the near end');
      }
      return { ...base, canvass: {
        claim: String(b.claim), answer: !!b.answer, minutes, skew,
        population: placed.map(p => ({ id: String(p.id), says: !!p.says })),
        ...(b.yes ? { yes: String(b.yes) } : {}),
        ...(b.no ? { no: String(b.no) } : {}),
        ...(b.trueLabel ? { trueLabel: String(b.trueLabel) } : {}),
        ...(b.falseLabel ? { falseLabel: String(b.falseLabel) } : {}),
        ...(num(b.radius) ? { radius: +b.radius } : {}),
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Go and ask', commit: b.commit ?? 'Answer it',
      } };
    }

    if(format === 'EVADE'){
      const distance = +b.distance, seconds = +b.seconds, speed = +b.speed;
      const limit = num(b.limit) ? +b.limit : Math.max(seconds * 2, seconds + 30);
      need(num(distance) && distance >= 6,
        'the clear distance has to be at least 6 m — anything tighter is measured in'
        + ' reaction time, which is instrument rule 3');
      need(num(seconds) && seconds >= 15, 'the drill needs at least fifteen seconds to hold');
      need(num(speed) && speed >= 2 && speed < WALK,
        `the pursuer moves at ${speed} m/s against the player's ${WALK} — at or above it`
        + ' nobody can get away, and under 2 nobody has to');
      need(limit >= seconds * 1.5, `the run allows ${limit} s to accumulate ${seconds} s of`
        + ' clear time, which leaves no room to be caught at all');
      const at = personAt(b.pursuer);
      need(!!at, `"${b.pursuer}" is not on this theme's roster, so there is nobody to get`
        + ' away from');
      site();
      need((SITE.buildings ?? []).length >= 3,
        'this site has fewer than three buildings, so there is nothing to put between you and'
        + ' them and the drill is a footrace on open ground');
      if(at){
        // THE TRAP, and it is the do-nothing run again: the pursuer starts some
        // way off, so clear time accrues while they walk in. If they cannot cross
        // that gap before the drill is satisfied, standing still passes it.
        const closing = gap(spawnAt(), at) / speed;
        need(closing < seconds,
          `the pursuer starts ${Math.round(gap(spawnAt(), at))} m away and closes at ${speed}`
          + ` m/s, so ${Math.round(closing)} s of clear time is banked before they arrive and`
          + ` the drill wants ${seconds}. A player who never moves passes it`);
      }
      return { ...base, evade: {
        pursuer: String(b.pursuer), distance, seconds, speed, limit,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Start the drill', commit: b.commit ?? 'Report the drill',
      } };
    }

    if(format === 'TAG'){
      const reach = +b.reach, seconds = +b.seconds, speed = +b.speed;
      need(num(reach) && reach >= 2,
        'the catching distance has to be at least 2 m — anything tighter is a cursor test,'
        + ' which is instrument rule 3');
      need(num(seconds) && seconds >= 15, 'a chase needs at least fifteen seconds to run');
      need(num(speed) && speed >= 1.5 && speed < WALK,
        `the quarry walks at ${speed} m/s against the player's ${WALK} — at or above it they`
        + ' can never be caught, and under 1.5 they are caught by walking at them');
      const at = personAt(b.quarry);
      need(!!at, `"${b.quarry}" is not on this theme's roster, so there is nobody to catch`);
      site();
      const fence = +(SITE.terrain?.playerLimit ?? Infinity);
      need(Number.isFinite(fence),
        'this theme has no `playerLimit`, so the quarry has open ground for ever and the only'
        + ' way to catch anybody is to outlast them');
      if(at){
        // THE TRAP, and it is the same one EVADE carries from the other end.
        // Somebody walking straight away is closed on at the DIFFERENCE of two
        // walking paces. If a run is long enough for that alone to work, then
        // the fence, the buildings and the corner never mattered and the chase
        // is a formality.
        const straight = gap(spawnAt(), at) / (WALK - speed);
        need(seconds < straight,
          `walking straight at them closes ${Math.round(gap(spawnAt(), at))} m at`
          + ` ${(WALK - speed).toFixed(1)} m/s, which takes about ${Math.round(straight)} s and`
          + ` the run allows ${seconds}. The chase is then a formality — shorten the run, or`
          + ' start them further off, or let them walk faster');
        // And the other end of it: a run so short that no line catches them.
        need(seconds >= straight * 0.4,
          `the run allows ${seconds} s against a straight chase of about ${Math.round(straight)}`
          + ' — no cut corner makes up that much, so the quarry cannot be caught at all');
      }
      return { ...base, tag: {
        quarry: String(b.quarry), reach, seconds, speed,
        ...(b.hint ? { hint: String(b.hint) } : {}),
        ...(b.moral ? { moral: String(b.moral) } : {}),
        go: b.go ?? 'Go after them', commit: b.commit ?? 'Report the chase',
      } };
    }
  }

  if(format === 'PROTOCOL'){
    const n = (s.scenarios ?? []).length;
    need(n >= 2, 'protocol needs at least two situations');
    need((s.choices ?? []).length === n, 'protocol needs one choice per situation');
    need((s.mapping ?? []).length === n, 'protocol mapping does not cover every situation');
    need(new Set(s.mapping ?? []).size === n, 'protocol mapping is not a permutation');
    // `columns` is optional and names the two sides — "what we want to measure"
    // against "how we measure it" — which both the game's match board and the printed
    // book use in place of "situation" and "response".
    return { ...base, scenarios: s.scenarios, choices: s.choices, mapping: s.mapping,
             ...(s.columns ? { columns: s.columns } : {}) };
  }
  if(format === 'SEQUENCE'){
    const n = (s.cards ?? []).length;
    need(n >= 3, 'sequence needs at least three cards');
    need((s.order ?? []).length === n && new Set(s.order).size === n,
         'sequence order must use every card exactly once');
    // `axis` overrides the panel's "put the steps in order, earliest first", and
    // `ends` the two rail captions. Both are optional and both exist for the
    // same reason: an ordering item graded on cost, risk or reversibility rather
    // than on time is asking for something the default instruction does not name.
    // `ends` is refused unless it is exactly two captions, because one caption is
    // a rail labelled at one end and reads as a bug.
    if(s.ends != null) need(Array.isArray(s.ends) && s.ends.length === 2 && s.ends.every(e => String(e ?? '').trim()),
      'sequence `ends` must name both ends of the rail, as two non-empty captions');
    return { ...base, cards: s.cards, order: s.order,
             ...(s.axis ? { axis: String(s.axis) } : {}),
             ...(s.ends ? { ends: s.ends.map(String) } : {}) };
  }
  if(format === 'BALLPARK'){
    const e = s.estimate;
    // A spec can also be stated once under `estimatesByTitle` and applied by
    // title, which is how a lesson and its four review variants share one set of
    // number tiles. normalize.js attaches it at load.
    // Matched on the base title, the way normalize.js does, so one spec covers a
    // lesson and its "— Review 2" variants.
    const base9 = String(s.title ?? '').replace(/\s+—\s+Review(\s+\d+)?$/i, '').trim();
    const byTitle = (book.estimatesByTitle ?? {})[s.title] ?? (book.estimatesByTitle ?? {})[base9];
    // A block carrying only `givens` and `relationship` is the reading matter,
    // not the spec; the tiles and the target can come by title instead.
    const hasSpec = !!e && (e.target !== undefined || (e.values ?? []).length > 0);
    need(hasSpec || !!byTitle,
         'ballpark needs an `estimate` block, or an `estimatesByTitle` entry for its title — prose carries no arithmetic');
    if(hasSpec){
      need((e.labels ?? []).length === (e.values ?? []).length, 'estimate labels and values must line up');
      need(Number.isFinite(+e.target), 'estimate needs a numeric target');
      need((e.correct ?? []).every(i => i >= 0 && i < (e.values ?? []).length),
           'estimate `correct` names a value index that does not exist');
      need((e.correct ?? []).length === (e.slots ?? (e.correct ?? []).length),
           `estimate has ${(e.correct ?? []).length} correct tile(s) for ${e.slots} slot(s) — the panel can never be completed`);
      // THE TILE SAYS WHAT IT IS WORTH.
      //
      // The player clicks a label and the panel adds a value, and until a sixth
      // grader met a panel asking about pressure at ninety metres while grading
      // gallons a minute, nothing compared the two. It happens on a re-target:
      // `apply-conversions` refuses to guess at a `labels` list whose length
      // changed, so the numbers move and the words stay. Ten stops in seven
      // games shipped that way, all of them internally consistent, all of them
      // ungradeable as labelled. Refused here rather than found later, because
      // the panel renders perfectly either way.
      for(const [i, lab] of (e.labels ?? []).entries()){
        const v = Number((e.values ?? [])[i]);
        if(!Number.isFinite(v)) continue;
        const readings = labelNumbers(lab);
        if(!readings.length) continue;               // a label with no number is prose, and fine
        need(readings.some(x => Math.abs(x - v) <= Math.max(1e-9, Math.abs(v) * 1e-6)),
             `estimate tile ${i + 1} reads "${String(lab).trim()}" and is worth ${v}`);
      }
      BALLPARK_CALCS[`${group}-${day}`] = {
        prompt: e.prompt ?? '', question: e.question ?? s.question ?? '',
        labels: e.labels, values: e.values, slots: e.slots ?? (e.correct ?? []).length,
        template: e.template, formula: e.formula, correct: e.correct,
        target: +e.target, tolerance: +(e.tolerance ?? 0), units: e.units ?? '',
        solution: e.solution ?? '', explanation: e.explanation ?? s.why ?? '',
      };
    }
    return {
      // The estimate block's own `relationship` wins, and the stop-level one is the
      // fallback rather than being overwritten by it — spreading `base` first and
      // then assigning '' here is what silently blanked it.
      ...base, givens: e?.givens ?? [], relationship: e?.relationship ?? s.relationship ?? '',
      // No key when the spec arrives by title: a calcKey pointing at nothing is
      // how an estimate panel comes up empty.
      ...(hasSpec ? { calcKey: `${group}-${day}` } : {}),
    };
  }
  if(format === 'SCIENCETANK'){
    const labels = (s.proposals ?? []).map(p => p.label);
    need(labels.length >= 3, 'science tank needs at least three proposals');
    const rec = s.recommended ?? {};
    for(const k of Object.keys(rec)) need(labels.includes(k), `recommends proposal "${k}", which is not offered`);
    const total = Object.values(rec).reduce((a, b) => a + (+b || 0), 0);
    need(total >= 60, `recommended allocation totals ${total}; the engine needs at least 60 of 100 spent`);
    return { ...base, proposals: s.proposals, recommended: rec, research: s.evidence ?? '' };
  }
  if(format === 'DIAGNOSIS'){
    // A diagnosis with no panel is not a diagnosis. `normalize.js` retypes it to
    // CHOICE at load — 35 of the hospital's lessons are like this, typed by a
    // docx parser that had one guess — so the book states what the game runs and
    // the retype has nothing left to do.
    if(!s.pack && !(s.readings ?? []).length && !s.figure){
      warn(`${at}: DIAGNOSIS with no readings and no figure — imported as CHOICE, which is what it plays as`);
      return choiceLike('CHOICE', s, at, base, need);
    }
    // A pack is a panel several lessons share, expanded into each of them at
    // load by normalize.js. Project Y had nine of them referenced and never
    // imported, which is the defect that made packs a first-class book block.
    if(s.pack && !s.readings && !s.choices){
      need(!!(book.packs ?? {})[s.pack], `names pack "${s.pack}", which the book does not define`);
      return { ...base, pack: s.pack, ...(s.headline ? { headline: s.headline } : {}) };
    }
    const labels = (s.choices ?? []).map(c => (typeof c === 'string' ? c : c.label));
    need(labels.length >= 4, 'diagnosis needs at least four candidates to rule out');
    const zones = new Set((s.readings ?? []).map(r => r.zone).filter(Boolean));
    need(!!s.figure || zones.size >= 3, 'diagnosis needs a figure, or readings across three zones');
    need((s.readings ?? []).some(r => r.status !== 'alarm'),
         'every reading is an alarm — the quiet readings are what rule explanations out');
    const answers = Array.isArray(s.answer) ? s.answer : [s.answer];
    need(answers.every(a => labels.includes(a)), 'the answer names a candidate that is not on the list');
    return {
      ...base, headline: s.headline ?? '', readings: s.readings ?? [],
      choices: s.choices,
      ...(answers.length > 1 ? { correctChoices: answers } : { correctChoice: answers[0] }),
    };
  }
  if(format === 'CASEBOOK' && (s.scenarios || s.cards)){
    const rows = s.scenarios ?? s.cards;
    need((s.mapping ?? []).length === rows.length, 'casebook mapping does not cover every clue');
    return { ...base, scenarios: rows, choices: s.choices, mapping: s.mapping,
             ...(s.columns ? { columns: s.columns } : {}) };
  }
  // CHOICE, TRIAGE, and a casebook that is really a question
  return choiceLike(format, s, at, base, need);
}

/** One question, one right answer, graded by label. */
function choiceLike(format, s, at, base, need){
  const labels = (s.choices ?? []).map(c => (typeof c === 'string' ? c : c.label));
  need(labels.length >= 3, `${format.toLowerCase()} needs at least three options`);
  const answer = Array.isArray(s.answer) ? s.answer[0] : s.answer;
  need(labels.includes(answer), 'the answer is not one of the options — grading compares labels');
  return { ...base, type: base.type === 'DIAGNOSIS' ? 'CHOICE' : base.type, choices: s.choices, correctChoice: answer };
}

// --------------------------------------------------------------- glossary
// `core` is the syllabus's answer to "is this one of the course's own concepts,
// or a word this game happens to use?" — decided here, at build time, because the
// syllabus is a claim about the course and has no business inside a running game.
// The plan card reads it: a core term outranks a supporting one for the two lines
// that card has.
const claimed = claimedWords(themeName);
const JARGON = (book.glossary ?? []).map(t => {
  const aliases = t.aliases ?? [String(t.name).toLowerCase()];
  const core = [t.name, ...aliases].filter(Boolean).some(n => claimsPhrase(themeName, n, claimed));
  return { name: t.name, aliases, def: t.def ?? t.definition ?? '', ...(core ? { core: true } : {}) };
});

// ---- the warm-ups, validated here rather than beside the write
//
// This used to live inside the emit block, which is AFTER the report — so all
// four of its refusals pushed onto `problems` that nothing ever read, and a book
// naming a slot that does not exist imported clean. A refusal recorded after the
// gate is not a refusal. Everything that can fail a book has to fail it above the
// `if(problems.length)` below.
//
// `warmups:` is the story half of the seven world-graded runs. The schedule is
// the engine's (`engine/core/warmups.js`), so a book does not say when a run
// happens — it says why this campaign is doing it. Worried about spies, looking
// for the missing crates, getting round the shift before the first shot.
//
// Three refusals, and each is a defect somebody would otherwise ship:
//   · a key that is not one of the seven slots, because a typo would otherwise
//     be a warm-up that silently keeps the engine's generic words
//   · a `why` shorter than a sentence, which is a tutorial with a heading
//   · `trial-far` on a site with one tier of ground, which is a story written
//     for a run that will never be offered
// The same geometry `orientation.js` uses, read from the site the TRIAL check
// already loads. Nothing is authored: move a building and this follows it.
const { tiersFor: tiersOf } = await import(pathToFileURL(resolve(gamekit, 'engine/core/orientation.js')).href);
const FAR_TIER = SITE ? !!tiersOf(SITE).hasFar : false;
const wneed = (cond, msg) => { if(!cond) fail(`warmups: ${msg}`); };
const WARMUP_SLOTS = ['trial-near', 'trial-far', 'greet', 'follow', 'hunt', 'canvass', 'evade', 'tag'];
const WARMUPS = {};
for(const [key, w] of Object.entries(book.warmups ?? {})){
  const slot = String(key);
  wneed(WARMUP_SLOTS.includes(slot),
    `\`warmups.${slot}\` is not one of the seven runs — ${WARMUP_SLOTS.join(', ')}`);
  wneed(String(w?.title ?? '').trim(), `the ${slot} warm-up needs a \`title\``);
  const why = String(w?.why ?? '').trim();
  wneed(why.split(/\s+/).length >= 12,
    `the ${slot} warm-up's \`why\` is ${why.split(/\s+/).filter(Boolean).length} words —`
    + ' a run with no reason attached is a tutorial, and this is where the reason goes');
  // The count in the story has to be the count the run places. HUNT puts one
  // item at each area entry, so "Eleven bagged heads" on a site with six areas
  // is a card that lies about its own run — and it read perfectly, because
  // nothing but the HUD ever put the two numbers side by side. Twenty of the
  // twenty-nine campaigns were wrong when this was written.
  if(slot === 'hunt'){
    const N = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
      nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15 };
    const lead = (String(w.title).toLowerCase().match(/^\W*([a-z]+)/) ?? [])[1];
    const said = N[lead] ?? (String(w.title).match(/^\W*(\d+)/) ?? [])[1];
    const places = +w.target || (Array.isArray(w.at) ? w.at.length : GROUPS.length);
    wneed(!said || Number(said) === places,
      `the hunt warm-up's title says ${said} and the run places ${places} —`
      + ' one item per area, so the story names a count the player cannot reach');
  }
  if(slot === 'trial-far'){
    wneed(FAR_TIER, 'a `trial-far` warm-up is authored and this site has one tier of ground,'
      + ' so that run is never offered — delete it or give the site a far tier');
  }
  WARMUPS[slot] = { ...w, title: String(w.title).trim(), why };
}

// ----------------------------------------------------------------- report
if(problems.length){
  console.error(`\n${problems.length} problem(s) in ${bookPath}:`);
  problems.forEach(p => console.error('  ✗ ' + p));
}
if(warnings.length){
  console.log(`\n${warnings.length} warning(s):`);
  warnings.forEach(w => console.log('  · ' + w));
}
console.log(`\n${GROUPS.length} groups, ${MISSIONS.length} missions, ` +
  `${Object.values(CURRICULUM).reduce((n, v) => n + v.length, 0)} lessons, ` +
  `${ROSTER.length} people, ${Object.keys(BALLPARK_CALCS).length} estimate specs, ${JARGON.length} terms`);

if(problems.length){
  console.error('\nNothing written. Fix the book and run again.');
  process.exit(1);
}

// ------------------------------------------------------------------- emit
// The two games that predate `themes/` keep their content in their own package
// directory, so the output location comes from the registry rather than from a
// path built here. `--out` overrides it, which is what the parity check uses.
const outDir = outOverride
  ? resolve(process.cwd(), outOverride)
  : resolve(themeDir(themeName), 'content');
const js = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;
const banner = (what) =>
  `// ${what}\n// GENERATED by tools/import-book.mjs from ${bookPath.split('/').pop()}\n` +
  `// Hand edits are lost on the next import. Change the book.\n\n`;

if(dry){
  console.log('\n[dry] would write:');
  for(const f of ['groups.js', 'roster.js', 'curriculum.js', 'missions.js']){
    console.log(`  themes/${themeName}/content/${f}`);
  }
} else {

  if(!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'groups.js'),
    banner('groups.js — the areas of study') + js('GROUPS', GROUPS));
  writeFileSync(resolve(outDir, 'roster.js'),
    banner('roster.js — the cast, their passages and their questions') +
    js('ROSTER', ROSTER) + '\n' + js('LEADERS', LEADERS) + '\n' + js('AVATARS', book.avatars ?? {}));
  writeFileSync(resolve(outDir, 'curriculum.js'),
    banner('curriculum.js — lessons per area, the estimate specs and the glossary') +
    js('CURRICULUM', CURRICULUM) + '\n' + js('BALLPARK_CALCS', BALLPARK_CALCS) + '\n' + js('JARGON', JARGON));
  // WARMUPS rides in missions.js rather than a file of its own, because a file of
  // its own is an optional import in twenty-nine manifests — and an optional
  // import across many manifests is exactly how Project Y's nine diagnosis packs
  // went missing. It is campaign-level content, and this is the campaign's file.
  writeFileSync(resolve(outDir, 'missions.js'),
    banner('missions.js — the campaign, and why it takes each warm-up') +
    js('MISSIONS', MISSIONS) + '\n' + js('WARMUPS', WARMUPS));
  if(book.copy && Object.keys(book.copy).length){
    writeFileSync(resolve(outDir, 'copy.js'), banner('copy.js — what each place says') + js('COPY', book.copy));
  }
  // The three shared blocks, in one file so that a theme wires in one import and
  // gets all three — three optional imports across three manifests is how Project
  // Y's nine diagnosis packs went missing. Written only when the book uses them.
  const shared = { DIAGNOSIS_PACKS: book.packs ?? {}, SPECIAL_REQUESTS: book.specialRequests ?? {},
                   BALLPARK_BY_TITLE: book.estimatesByTitle ?? {} };
  if(Object.values(shared).some(v => Object.keys(v).length)){
    writeFileSync(resolve(outDir, 'shared.js'),
      banner('shared.js — content shared across lessons') +
      Object.entries(shared).map(([k, v]) => js(k, v)).join('\n'));
  }
  if(book.interiors && Object.keys(book.interiors).length){
    writeFileSync(resolve(themeDir(themeName), 'interiors.js'),
      banner('interiors.js — what is inside each room') + js('INTERIORS', book.interiors));
  }
  console.log(`\nwrote ${outDir.replace(gamekit + '/', '')}`);
}

// --verify runs the checks against what was just written, because an importer
// that reports success and leaves an unplayable theme is the failure this is
// here to prevent.
if(flags.includes('--verify') && !dry){
  const { spawnSync } = await import('node:child_process');
  const res = spawnSync(process.execPath, [resolve(gamekit, 'engine/dev/check.mjs'), themeName],
    { stdio: 'inherit', cwd: gamekit });
  if(res.status !== 0){
    console.error('\n--verify: the written theme does not pass its checks.');
    process.exit(1);
  }
}
