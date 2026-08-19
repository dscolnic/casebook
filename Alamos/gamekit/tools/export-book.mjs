// export-book.mjs — write a game's book out of the game.
//
//   node tools/export-book.mjs <theme> [out.yml]      default: books/<theme>.yml
//   node tools/export-book.mjs <theme> --stdout
//
// Four of the seven games are generated from `books/<name>.yml` and three are
// not: Project Y predates the engine, and The Contaminated City and Hospital
// Heroes were generated from Word documents the day before the book format
// existed. That split cost real time — a content sweep across all seven meant
// editing YAML for four games and writing bespoke JSON surgery for the other
// three, and the docx importers' inferences are still visible in the data.
//
// This reads a theme's content the way the engine does and writes the book that
// would produce it. With `import-book.mjs` and `engine/dev/bookParity.mjs` it
// closes the loop: every game comes from a book, and a check proves the book
// still regenerates the game it came from.
//
// Deliberately dropped, because nothing in the engine or the tools reads them —
// they are Word-document scaffolding that came along for the ride:
// lesson `progress`, `notes`, `whyFormat`, `game.scene`, mission `route` and
// mission `concepts`.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { emitYaml } from './yaml-emit.mjs';
import { themeDir } from '../engine/dev/registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');

const [themeName, ...rest] = process.argv.slice(2);
if(!themeName){
  console.error('usage: node tools/export-book.mjs <theme> [out.yml|--stdout]');
  process.exit(2);
}
const toStdout = rest.includes('--stdout');
const outPath = rest.find(a => !a.startsWith('--')) ?? `books/${themeName}.yml`;

const dir = themeDir(themeName);
const manifest = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const C = manifest.content ?? {};

const CURRICULUM = C.CURRICULUM ?? {};
const MISSIONS = C.MISSIONS ?? [];
const BALLPARK_CALCS = C.BALLPARK_CALCS ?? {};

const drop = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) =>
  v !== undefined && v !== '' && !(Array.isArray(v) && !v.length) &&
  !(v && typeof v === 'object' && !Array.isArray(v) && !Object.keys(v).length)));

// ------------------------------------------------------------------ groups
const groups = (C.GROUPS ?? []).map(g => drop({
  id: g.id, code: g.code, name: g.name, color: g.color, difficulty: g.difficulty,
  type: g.type, desc: g.desc, defaultLeader: g.defaultLeader, budget: g.budget,
  milestones: (g.milestones ?? []).map(m => drop({ name: m.name, cost: m.cost, work: m.work, brief: m.brief })),
  issues: g.issuePool ?? [],
}));

// -------------------------------------------------------------------- cast
// The importer wraps a bio's paragraphs in <p>; this unwraps them back to the
// blank-line-separated prose a person types, so the pair round-trips.
const unwrapBio = (html) => String(html ?? '')
  .split(/<\/p>\s*<p>/).map(s => s.replace(/<\/?p>/g, '').trim()).filter(Boolean).join('\n\n');

const roster = (C.ROSTER ?? []).map(p => drop({
  id: p.id, name: p.name, role: p.role, division: p.division, color: p.color,
  bio: unwrapBio(p.bio),
  quiz: (p.quiz ?? []).map(q => drop({ q: q.q, a: q.a, wrong: q.wrong })),
}));

// ------------------------------------------------------------ the lessons
/** The book form of one lesson, with the stop fields the importer needs. */
function stopOf(group, lesson, stop){
  const g = lesson.game ?? {};
  const format = String(g.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
  const task = g.task ?? g.play ?? '';
  const out = {
    group,
    // `call` is the plan card's line — "Talk to Dr. Nguyen" — where it differs
    // from the question's own instruction. The four hand-written books use one
    // string for both; the three docx games never did.
    ...(stop && (stop.task ?? '') !== task ? { call: stop.task } : {}),
    task,
    title: lesson.title ?? '',
    place: lesson.place ?? '',
    ...(g.setup && g.setup !== (lesson.place ?? '') ? { setup: g.setup } : {}),
    ...(g.question && g.question !== task ? { question: g.question } : {}),
    // Project Y wrote the situation as `story` and left `scene` empty — the
    // engine reads story first, so they are the same field with two names. The
    // book states it once, as the scene.
    scene: (lesson.scene ?? '').trim() || (lesson.story ?? '').trim(),
    ...(lesson.story && lesson.story.trim() !== ((lesson.scene ?? '').trim() || (lesson.story ?? '').trim())
        ? { story: lesson.story } : {}),
    // `takesAsRead` is authored, and the importer ALSO renders each declaration as an
    // `assumes` line so the player reads the same sentence the checker reads. Exporting
    // only `assumes` therefore loses the field while producing byte-identical content —
    // so `bookParity` cannot see the loss, and `conceptOrder` fails on a book that was
    // recovered from a game. Write the declaration back out, and drop the line the
    // importer will re-derive from it.
    ...(lesson.takesAsRead?.length ? { takesAsRead: lesson.takesAsRead.map(r => r.c) } : {}),
    ...((() => {
      const derived = new Set((lesson.takesAsRead ?? [])
        .map(r => `${r.c.charAt(0).toLowerCase()}${r.c.slice(1)} — taken as read`));
      const kept = (lesson.assumes ?? []).filter(a => !derived.has(a));
      return kept.length ? { assumes: kept } : {};
    })()),
    takeaway: lesson.takeaway ?? '',
    ...(stop?.why ? { motivation: stop.why } : {}),
    format,
    ...(g.why ? { why: g.why } : {}),
    ...(g.rebuttals?.length ? { rebuttals: g.rebuttals } : {}),
    ...(g.columns ? { columns: g.columns } : {}),
    ...(g.figure ?? lesson.figure ? { figure: g.figure ?? lesson.figure } : {}),
  };

  if(format === 'PROTOCOL' || (format === 'CASEBOOK' && (g.scenarios || g.cards))){
    Object.assign(out, drop({ scenarios: g.scenarios ?? g.cards, choices: g.choices, mapping: g.mapping }));
  } else if(format === 'SEQUENCE'){
    Object.assign(out, drop({ cards: g.cards, order: g.order, axis: g.axis, ends: g.ends }));
  } else if(format === 'BALLPARK'){
    const spec = BALLPARK_CALCS[g.calcKey ?? ''] ?? BALLPARK_CALCS[`${group}-${lesson.day}`] ?? {};
    out.estimate = drop({
      prompt: spec.prompt, question: spec.question, labels: spec.labels, values: spec.values,
      slots: spec.slots, template: spec.template, formula: spec.formula, correct: spec.correct,
      target: spec.target, tolerance: spec.tolerance, units: spec.units,
      solution: spec.solution, explanation: spec.explanation,
      givens: g.givens, relationship: g.relationship,
    });
  } else if(format === 'SCIENCETANK'){
    Object.assign(out, drop({ proposals: g.proposals, recommended: g.recommended, evidence: g.research }));
  } else if(format === 'DIAGNOSIS'){
    Object.assign(out, drop({
      headline: g.headline, readings: g.readings, choices: g.choices,
      pack: g.pack,
      answer: g.correctChoices ?? g.correctChoice,
    }));
  } else {
    Object.assign(out, drop({ choices: g.choices, answer: g.correctChoice }));
  }
  // Every instrument keeps its board in a block named after the format —
  // `g.stress`, `g.trace`, `g.belt`, `g.chain` — and none of them were exported,
  // so a book recovered from a game came back with 244 instrument stops whose
  // panels had been deleted. It surfaced as an import crash on a STRESS with no
  // candidates, which was luck: most of the blocks would have imported as an
  // empty panel. The branches above are the six formats that predate the
  // registry; this line is the rest of it, by name rather than by list, so a
  // twenty-first instrument is exported the day it is authored.
  const block = format.toLowerCase();
  if(g[block] !== undefined) out[block] = g[block];
  // The card the sweep wrote. `guide` and `background` are lesson-level and
  // authored, and dropping them turned a briefed stop back into a bare one.
  if(lesson.guide) out.guide = lesson.guide;
  if(lesson.background?.length) out.background = lesson.background;
  if(g.rules) out.rules = g.rules;
  if(g.hint) out.hint = g.hint;
  if(g.goals) out.goals = g.goals;
  // The concept this stop is about, where the book pinned it by name rather than
  // letting `pickKeyConcept` choose: a re-derived pick can land elsewhere, and the
  // difference is a silently different card.
  if(lesson.concept?.c) out.concept = lesson.concept.c;
  // An answer string the format does not otherwise carry (the printed key).
  if(g.answer && out.answer === undefined) out.answerText = g.answer;
  return drop(out);
}

const used = new Set();
const missions = MISSIONS.map(m => {
  const stops = (m.stops ?? []).map(s => {
    const lesson = CURRICULUM[s.group]?.[s.lesson];
    if(!lesson) throw new Error(`${themeName}: mission "${m.title}" stop points at ${s.group}[${s.lesson}], which does not exist`);
    used.add(`${s.group}:${s.lesson}`);
    return stopOf(s.group, lesson, s);
  });
  return drop({
    title: m.title, objective: m.objective, briefing: m.briefing, stake: m.stake,
    ...(Array.isArray(m.primer) ? { primer: m.primer } : {}),
    takeaway: m.takeaway, stops,
  });
});

// Lessons no mission stop points at: the "— Review" variants a callback day
// reaches, and the spares. 206 of the seven games' 425 lessons are these, all of
// them in the two docx games, and a book that could not carry them would quietly
// delete two thirds of the hospital's content.
const lessons = [];
for(const [group, ls] of Object.entries(CURRICULUM)){
  (ls ?? []).forEach((lesson, i) => {
    if(used.has(`${group}:${i}`)) return;
    lessons.push(stopOf(group, lesson, null));
  });
}

// -------------------------------------------------------------------- book
const book = drop({
  theme: drop({ id: manifest.id ?? themeName, title: manifest.title ?? '', subtitle: manifest.subtitle ?? '' }),
  format: 2,
  groups,
  roster,
  leaders: (C.LEADERS ?? []).map(l => drop(l)),
  avatars: C.AVATARS ?? {},
  glossary: (C.JARGON ?? []).map(t => drop({ name: t.name, aliases: t.aliases, def: t.def })),
  missions,
  // The seven world-graded runs' own words. Recovering a book from a game and
  // getting back a campaign with no warm-up stories is the `takesAsRead` mistake
  // in a second field: this file is the documented way back from a lost book, so
  // anything the importer accepts it has to write.
  warmups: C.WARMUPS ?? {},
  lessons,
  packs: C.DIAGNOSIS_PACKS ?? {},
  specialRequests: C.SPECIAL_REQUESTS ?? {},
  estimatesByTitle: C.BALLPARK_BY_TITLE ?? {},
  copy: C.COPY ?? {},
  // Two of the games keep their room contents in src/ beside the entry point.
  interiors: (await (async () => {
    for(const rel of ['interiors.js', 'src/interiors.js']){
      try{ return (await import(pathToFileURL(resolve(dir, rel)).href)).INTERIORS ?? {}; }catch{ /* next */ }
    }
    return {};
  })()),
});

const text = emitYaml(book, {
  groups: 'The areas of study. One column of the game each; every group needs somebody on the roster.',
  roster: 'The cast. `division` is what makes a person a valid person stop.',
  glossary: 'Terms the game may explain in place.',
  missions: 'The campaign: one working day each, three stops and a callback from day 3.',
  warmups: 'Why this campaign takes each of the seven runs that open a morning.',
  lessons: 'Lessons no mission stop points at — review variants and spares. Reachable as callbacks.',
  packs: 'Diagnosis panels shared by several lessons, expanded at load by normalize.js.',
  specialRequests: 'Between-mission funding vignettes.',
  estimatesByTitle: 'Estimate specs applied by lesson title, across a lesson and its reviews.',
  copy: 'What each place says when the player reads it.',
  interiors: 'What is inside each room.',
});

if(toStdout){
  process.stdout.write(text);
} else {
  const abs = resolve(gamekit, outPath);
  if(!existsSync(dirname(abs))) mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, text);
  console.log(`${themeName} → ${outPath}: ${groups.length} groups, ${missions.length} missions, ` +
    `${missions.reduce((n, m) => n + m.stops.length, 0)} stops, ${lessons.length} unattached lessons, ` +
    `${roster.length} people, ${(book.glossary ?? []).length} terms`);
}
