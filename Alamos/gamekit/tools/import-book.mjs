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
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parseYaml } from './yaml-lite.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');

const [bookPath, themeName, ...flags] = process.argv.slice(2);
if(!bookPath || !themeName){
  console.error('usage: node tools/import-book.mjs <book.yml> <theme> [--dry] [--verify]');
  process.exit(2);
}
const dry = flags.includes('--dry');

const FORMATS = new Set(['PROTOCOL','SEQUENCE','BALLPARK','SCIENCETANK','DIAGNOSIS','TRIAGE','CASEBOOK','CHOICE']);
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

missions.forEach((m, mi) => {
  const label = `mission ${mi + 1} ("${m.title ?? '?'}")`;
  const stops = m.stops ?? [];
  if(stops.length !== 3) warn(`${label} has ${stops.length} stops; the loop is built around 3`);

  const outStops = stops.map((s, si) => {
    const at = `${label} stop ${si + 1}`;
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
    lessons.push({ day, title: s.title ?? s.task ?? `${s.group} ${day}`, scene, takeaway,
                   place: s.place ?? '', story: scene, game });
    CURRICULUM[s.group] = lessons;
    return { group: s.group, lesson: day - 1, task: s.task ?? s.title ?? '', ...(s.why ? { why: s.why } : {}) };
  });

  MISSIONS.push({
    title: m.title ?? `Mission ${mi + 1}`,
    objective: m.objective ?? '',
    briefing: m.briefing ?? '',
    stake: m.stake ?? '',
    takeaway: m.takeaway ?? '',
    stops: outStops,
  });
});

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
    answer: s.answer ?? '', why: s.why ?? '',
    ...(s.rebuttals ? { rebuttals: s.rebuttals } : {}),
  };
  const need = (cond, msg) => { if(!cond) fail(`${at}: ${msg}`); };

  if(format === 'PROTOCOL'){
    const n = (s.scenarios ?? []).length;
    need(n >= 2, 'protocol needs at least two situations');
    need((s.choices ?? []).length === n, 'protocol needs one choice per situation');
    need((s.mapping ?? []).length === n, 'protocol mapping does not cover every situation');
    need(new Set(s.mapping ?? []).size === n, 'protocol mapping is not a permutation');
    return { ...base, scenarios: s.scenarios, choices: s.choices, mapping: s.mapping };
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
    need(!!e, 'ballpark needs an `estimate` block — prose carries no arithmetic');
    if(e){
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
    return { ...base, givens: e?.givens ?? [], relationship: e?.relationship ?? '', calcKey: `${group}-${day}` };
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
      choices: s.choices, ...(s.figure ? { figure: s.figure } : {}),
      ...(answers.length > 1 ? { correctChoices: answers } : { correctChoice: answers[0] }),
    };
  }
  if(format === 'CASEBOOK' && (s.scenarios || s.cards)){
    const rows = s.scenarios ?? s.cards;
    need((s.mapping ?? []).length === rows.length, 'casebook mapping does not cover every clue');
    return { ...base, scenarios: rows, choices: s.choices, mapping: s.mapping };
  }
  // CHOICE, TRIAGE, and a casebook that is really a question
  const labels = (s.choices ?? []).map(c => (typeof c === 'string' ? c : c.label));
  need(labels.length >= 3, `${format.toLowerCase()} needs at least three options`);
  need(labels.includes(s.answer), 'the answer is not one of the options — grading compares labels');
  return { ...base, choices: s.choices, correctChoice: s.answer };
}

// --------------------------------------------------------------- glossary
const JARGON = (book.glossary ?? []).map(t => ({
  name: t.name, aliases: t.aliases ?? [String(t.name).toLowerCase()], def: t.def ?? t.definition ?? '',
}));

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
const outDir = resolve(gamekit, 'themes', themeName, 'content');
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
  if(book.copy){
    writeFileSync(resolve(outDir, 'copy.js'), banner('copy.js — what each place says') + js('COPY', book.copy));
  }
  if(book.interiors){
    writeFileSync(resolve(gamekit, 'themes', themeName, 'interiors.js'),
      banner('interiors.js — what is inside each room') + js('INTERIORS', book.interiors));
  }
  console.log(`\nwrote themes/${themeName}/content/`);
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
