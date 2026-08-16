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
import { claimedWords, claimsPhrase, deriveWork, EQUATIONS } from './syllabus.js';

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
 *     day it is first computed. It stays from that day onward, where it is
 *     context for something the player has now done.
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
        dropped++;
        return false;
      });
      // Computed first, then whatever order the book put them in.
      kept.sort((a, b) => (b.computed ? 1 : 0) - (a.computed ? 1 : 0));
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
      ...(p.hint ? { hint: String(p.hint) } : {}),
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
      need(conds.length >= 2, 'a trigger board needs at least two stages');
      need(numeric(sc.min) && numeric(sc.max) && +sc.max > +sc.min,
        'trigger scale needs min and max, with max above min');
      need(stream.length >= 3, 'a trigger needs at least three updates — one update is not a stream');
      need(stream.every(x => numeric(x.value) && numeric(x.hoursLeft) && String(x.at ?? '').trim()),
        'every trigger update needs `at`, a numeric `value` and a numeric `hoursLeft`');
      need(conds.every(c => numeric(c.leadHours) && +c.leadHours > 0 && String(c.label ?? '').trim()),
        'every trigger stage needs a label and a positive `leadHours`');
      // Falling time. An update stream whose hours left goes up is a stream where
      // waiting buys lead time, which inverts the whole lesson.
      need(stream.every((x, i) => i === 0 || +x.hoursLeft <= +stream[i - 1].hoursLeft),
        'the trigger stream must run forwards — `hoursLeft` never increases');
      const top = Math.max(...stream.map(x => +x.value));
      // Both outcomes have to be reachable, or the board is decoration. A rule set
      // above the highest update can never fire; one at the floor always does.
      need(+sc.max > top,
        `the trigger scale tops out at ${sc.max} and the stream reaches ${top} — every threshold`
        + ' fires, so no rule can be written badly');
      conds.forEach(c => {
        const inTime = stream.some(x => +x.hoursLeft >= +c.leadHours);
        need(inTime, `"${c.label}" needs ${c.leadHours} h of lead and no update in the stream`
          + ' arrives with that much left — the stage cannot be got right');
      });
      return { ...base, trigger: {
        scale: { label: sc.label ?? '', unit: sc.unit ?? '', min: +sc.min, max: +sc.max,
          step: numeric(sc.step) ? +sc.step : (+sc.max - +sc.min) / 100 },
        conditions: conds.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          leadHours: +c.leadHours, ...(c.owner ? { owner: String(c.owner) } : {}),
          ...(c.action ? { action: String(c.action) } : {}) })),
        stream: stream.map(x => ({ at: String(x.at), update: String(x.update ?? ''),
          value: +x.value, hoursLeft: +x.hoursLeft })),
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
      return { ...base, cloud: {
        bounds: { min: +bo.min, max: +bo.max, unit: bo.unit ?? '', label: bo.label ?? '' },
        centre: +b.centre, spread: +b.spread, pass: +b.pass,
        seed: numeric(b.seed) ? +b.seed : 1,
        costUnit: b.costUnit ?? 'h',
        actions: acts.map(a => ({ id: String(a.id ?? a.label), label: String(a.label),
          effect: a.effect, amount: +a.amount, ...(numeric(a.cost) ? { cost: +a.cost } : {}) })),
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
      return { ...base, trace: {
        channels: chans.map(c => ({ id: String(c.id ?? c.label), label: String(c.label),
          reading: String(c.reading), depends: (c.depends ?? []).map(String) })),
        resources: res.map(r => ({ id: String(r.id ?? r.label), label: String(r.label) })),
        independent: indep, target: String(b.target),
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
      return { ...base, chain: {
        links: links.map(l => ({ id: String(l.id ?? l.label), label: String(l.label),
          transfers: String(l.transfers) })),
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
      need(rules.length >= 3,
        'a derivation needs at least three named rules to choose from — offering only the two that'
        + ' are plausible here answers the second half of every step');
      steps.forEach((st, i) => {
        const cands = st.candidates ?? [];
        const n = `step ${i + 1}`;
        need(String(st.ask ?? '').trim(), `${n} needs an \`ask\` — what this line is doing`);
        need(cands.length >= 3, `${n} needs at least three candidates`);
        need(cands.every(c => String(c.text ?? '').trim() && String(c.rule ?? '').trim()),
          `every candidate in ${n} needs \`text\` and the \`rule\` it claims`);
        need(cands.every(c => rules.includes(String(c.rule))),
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
      return { ...base, propagate: {
        output: { label: String(b.output?.label ?? 'Output'), unit: b.output?.unit ?? '' },
        inputs: ins.map(x => ({ id: String(x.id ?? x.label), label: String(x.label),
          value: +x.value, unit: x.unit ?? '', sigmaFrac: +x.sigmaFrac, exponent: +x.exponent })),
        improvable: imp.map(m => ({ id: String(m.id), label: String(m.label),
          cost: numeric(m.cost) ? +m.cost : 0,
          newSigmaFrac: m.newSigmaFrac == null ? null : +m.newSigmaFrac })),
        dominant: String(b.dominant), costUnit: b.costUnit ?? '',
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
