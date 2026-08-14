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
import { claimedWords, claimsPhrase, EQUATIONS } from './syllabus.js';

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
import { FORMATS } from '../engine/content/normalize.js';
const canonical = (t) => String(t ?? '').toUpperCase().replace(/[\s_-]+/g, '');

const problems = [];
const warnings = [];
const fail = (m) => problems.push(m);
const warn = (m) => warnings.push(m);

// ------------------------------------------------------------------- read
const raw = readFileSync(resolve(process.cwd(), bookPath), 'utf8');
const book = bookPath.endsWith('.json') ? JSON.parse(raw) : parseYaml(raw);

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
  const formula = flat([game.relationship, game.template, game.solution, ...(game.givens ?? [])]);
  const text = flat([s.title, s.scene, s.story, s.takeaway, game.question, game.task, game.why,
    game.headline, game.setup, game.prompt, game.explanation, game.answer,
    ...(game.cards ?? []).map(lbl), ...(game.choices ?? []).map(lbl),
    ...(game.scenarios ?? []).map(lbl), ...(game.proposals ?? []).map(lbl),
    ...(game.rebuttals ?? []).map(lbl), ...(game.givens ?? []).map(lbl),
    ...(game.readings ?? []).flatMap(r => [r?.label, r?.name, r?.note, r?.purpose]),
    ...assumes]);
  const hit = (hay, phrase) => {
    const exact = phrase.endsWith('!') || phrase.replace(/!$/, '').trim().length <= 3;
    const w = phrase.replace(/!$/, '').toLowerCase().trim();
    const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${e}${exact ? '([^a-z0-9]|$)' : ''}`, 'i').test(hay);
  };
  const out = [];
  for(const eq of list){
    const computed = eq.k.some(k => hit(formula, k));
    if(!computed && !eq.k.some(k => hit(text, k))) continue;
    // v and s ride along because the card has to define the symbols where it
    // shows the equation. A formula whose letters are never named teaches
    // nobody anything they did not already know.
    out.push({ e: eq.e, c: eq.c, ...(eq.v ? { v: eq.v } : {}), ...(eq.s ? { s: eq.s } : {}),
      ...(computed ? { computed: true } : {}) });
  }
  return out;
}

function addLesson(s, at){
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
  lessons.push({
    day, title: s.title ?? s.task ?? `${s.group} ${day}`, scene, takeaway,
    place: s.place ?? '',
    // `story` is the longer form of the situation where a book carries one, and
    // the scene otherwise. The engine reads it before the scene.
    story: String(s.story ?? scene).trim(),
    game,
    ...(assumes.length ? { assumes } : {}),
    ...(() => {
      const eqs = equationsFor(s, game, assumes);
      return eqs.length ? { equations: eqs } : {};
    })(),
  });
  CURRICULUM[s.group] = lessons;
  return { day, game, scene };
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

/** One stop's question, checked against what its format actually needs. */
function gameFor(s, at, group, day){
  const format = canonical(s.format);
  if(!FORMATS.has(format)){
    fail(`${at}: format "${s.format}" has no renderer (one of ${[...FORMATS].join(', ')})`);
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
  };
  const need = (cond, msg) => { if(!cond) fail(`${at}: ${msg}`); };

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
    } };
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
    return { ...base, cards: s.cards, order: s.order };
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
      BALLPARK_CALCS[`${group}-${day}`] = {
        prompt: e.prompt ?? '', question: e.question ?? s.question ?? '',
        labels: e.labels, values: e.values, slots: e.slots ?? (e.correct ?? []).length,
        template: e.template, formula: e.formula, correct: e.correct,
        target: +e.target, tolerance: +(e.tolerance ?? 0), units: e.units ?? '',
        solution: e.solution ?? '', explanation: e.explanation ?? s.why ?? '',
      };
    }
    return {
      ...base, givens: e?.givens ?? [], relationship: e?.relationship ?? '',
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
  writeFileSync(resolve(outDir, 'missions.js'),
    banner('missions.js — the campaign') + js('MISSIONS', MISSIONS));
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
