// import-missionbook.mjs — turn a mission-shaped design book into theme content.
//
//   node tools/import-missionbook.mjs <book.docx> <theme> [--map map.json] [--dry]
//
// Companion to import-designbook.mjs, which reads the SHIFT/CASE hospital shape.
// This one reads the MISSION/Activity shape described in parse-missionbook.mjs,
// and — unlike the older importer — emits content in the shape the engine
// actually consumes, so no hand conversion sits between the two.
//
// What it writes into themes/<theme>/content/:
//   curriculum.js   CURRICULUM, BALLPARK_CALCS, JARGON
//   missions.js     MISSIONS
//   import-report.json
//
// The mission -> group map is a design decision and is never guessed. Without
// --map the run stops rather than producing content that looks authored.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseMissionBook } from './parse-missionbook.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const [bookPath, themeName, ...rest] = process.argv.slice(2);
if(!bookPath || !themeName){
  console.error('usage: node tools/import-missionbook.mjs <book.docx> <theme> [--map map.json] [--dry]');
  process.exit(2);
}
const dry = rest.includes('--dry');
const mapArg = rest.includes('--map') ? rest[rest.indexOf('--map') + 1] : null;
const themeDir = resolve(here, '../themes', themeName);
const outDir = resolve(themeDir, 'content');

const { missions, activities, glossary, report } = parseMissionBook(resolve(bookPath));
const warn = (m) => report.warnings.push(m);

// ------------------------------------------------------- mission -> group map
if(!mapArg && !dry){
  console.error('refusing to write without --map: which area of study each mission belongs to is a\n' +
                'design decision, not something to infer from the book. See NEW_GAME.md.');
  process.exit(1);
}
const missionToGroup = mapArg ? JSON.parse(readFileSync(resolve(mapArg), 'utf8')) : {};
const groupIds = mapArg ? [...new Set(Object.values(missionToGroup))] : ['G1'];
for(const m of missions){
  if(mapArg && !missionToGroup[String(m.number)]){
    warn(`mission ${m.number} ("${m.title}") has no entry in the map file`);
  }
}
const groupOf = (n) => missionToGroup[String(n)] ?? groupIds[0];

// ------------------------------------------------------------ ballpark specs
// Hand-authored, because a prose relationship carries no arithmetic. Optional:
// a theme without the file simply gets every Ballpark reported as unconverted.
let ballparkSpecs = {};
const specPath = resolve(outDir, 'ballpark-specs.js');
if(existsSync(specPath)){
  ({ BALLPARK_SPECS: ballparkSpecs } = await import(pathToFileURL(specPath).href));
}

// -------------------------------------------------------------- the content
/**
 * The paragraph the player reasons from. The book splits the situation across
 * three places — the mission's problem, the stop's beat, and the activity's own
 * scene line — and each alone is too thin to reason from, so the lesson carries
 * all three. THEME_CONTRACT.md § Content integrity requires this to be real
 * text and requires the takeaway to stay out of it.
 */
function sceneFor(mission, activity, stop){
  const parts = [mission.problem];
  if(stop) parts.push(`At the ${stop.place}, you ${stop.beat.replace(/\.$/, '')}.`);
  if(activity.scene) parts.push(activity.scene);
  return parts.filter(Boolean).join(' ');
}

/** The engine's challenge object, in the shape questionUI.js dispatches on. */
function gameFor(activity, group, day){
  const base = {
    type: activity.format,
    title: activity.title,
    setup: activity.scene,
    play: activity.play,
    task: activity.play,
    answer: activity.solution,
    why: activity.why || activity.interpretation,
    rebuttals: activity.rebuttals,
  };
  if(activity.format === 'Protocol'){
    return { ...base, scenarios: activity.scenarios, choices: activity.choices, mapping: activity.mapping };
  }
  if(activity.format === 'Sequence'){
    return { ...base, cards: activity.cards, order: activity.order };
  }
  if(activity.format === 'Science Tank'){
    return { ...base, proposals: activity.proposals, recommended: activity.recommended, research: '' };
  }
  if(activity.format === 'Ballpark'){
    const spec = ballparkSpecs[activity.id];
    if(!spec){
      report.unmapped.push({ id: activity.id, title: activity.title,
        reason: 'Ballpark has no entry in content/ballpark-specs.js — it would render un-answerable' });
    }
    return { ...base, givens: activity.ballpark?.givens ?? [], relationship: activity.ballpark?.relationship ?? '',
             question: activity.ballpark?.question ?? '', calcKey: `${group}-${day}` };
  }
  return base;
}

const CURRICULUM = {};
for(const g of groupIds) CURRICULUM[g] = [];
const BALLPARK_CALCS = {};
const MISSIONS = [];

for(const mission of missions){
  const group = groupOf(mission.number);
  const stops = mission.activities.map((activity, i) => {
    const day = CURRICULUM[group].length + 1;      // unique within the group; keys BALLPARK_CALCS
    const stop = mission.stops.find(s => s.index === i + 1);
    const scene = sceneFor(mission, activity, stop);

    if(activity.format === 'Ballpark' && ballparkSpecs[activity.id]){
      BALLPARK_CALCS[`${group}-${day}`] = ballparkSpecs[activity.id];
    }
    CURRICULUM[group].push({
      day,
      title: activity.title,
      place: stop ? stop.place : (mission.route[i] || ''),
      // `progress` is the learning objective the meter reads: what the player
      // will be able to do once the mission's evidence chain is complete. The
      // book's per-activity "why this format" line is boilerplate across all 45
      // activities, so the mission outcome is used instead.
      progress: mission.outcome,
      whyFormat: activity.whyFormat,
      takeaway: activity.takeaway,
      story: scene,
      scene,
      notes: activity.notes,
      game: gameFor(activity, group, day),
    });
    return { group, lesson: day - 1, task: activity.title };
  });

  MISSIONS.push({
    title: mission.title,
    objective: mission.outcome,
    briefing: [mission.problem, mission.stake].filter(Boolean).join(' '),
    takeaway: mission.outcome,
    route: mission.route,
    concepts: mission.concepts,
    stops,
  });
}

// --------------------------------------------------------------- the glossary
// The engine highlights a term wherever its alias appears in the question text,
// so the alias list is the term itself plus its lower-case form.
// The field is `def`: that is what questionUI.js reads when a term chip is
// clicked, and calling it `definition` here silently rendered "undefined".
const JARGON = glossary.map(g => ({
  name: g.name,
  aliases: [...new Set([g.name.toLowerCase(), g.name.toLowerCase().replace(/-/g, ' ')])],
  def: g.definition,
}));

// --------------------------------------------------------- integrity checks
// The three invariants from THEME_CONTRACT.md § Content integrity, asserted
// here so a regenerated book cannot quietly reintroduce the hospital bug.
for(const [group, lessons] of Object.entries(CURRICULUM)){
  for(const l of lessons){
    const at = `${group} day ${l.day} ("${l.title}")`;
    if(!l.scene || l.scene.length < 40) warn(`${at}: scene is missing or too thin to reason from`);
    if(!l.takeaway) warn(`${at}: no takeaway`);
    if(l.takeaway && l.game.why && l.takeaway.trim() === l.game.why.trim()){
      warn(`${at}: takeaway repeats the "why" — the intro would give the answer away`);
    }
    const g = l.game;
    if(g.type === 'Protocol'){
      if(g.mapping?.length !== g.scenarios?.length) warn(`${at}: protocol mapping does not cover every situation`);
      if(new Set(g.mapping).size !== g.mapping?.length) warn(`${at}: protocol mapping is not a permutation`);
    }
    if(g.type === 'Sequence' && new Set(g.order).size !== g.cards?.length){
      warn(`${at}: sequence order does not use every card exactly once`);
    }
    if(g.type === 'Science Tank'){
      const total = Object.values(g.recommended || {}).reduce((a, b) => a + b, 0);
      if(total < 60) warn(`${at}: recommended allocation totals ${total}; the engine requires at least 80 of 100 to be spent`);
      for(const k of Object.keys(g.recommended || {})){
        if(!g.proposals?.some(p => p.label === k)) warn(`${at}: recommends proposal "${k}", which is not offered`);
      }
    }
  }
}

// ------------------------------------------------------------------- emit
const banner = (what) =>
  `// ${what}\n` +
  `// GENERATED by tools/import-missionbook.mjs from ${bookPath.split('/').pop()}\n` +
  `// Re-running overwrites this file. Hand edits belong in a separate override —\n` +
  `// the Ballpark numbers live in content/ballpark-specs.js for exactly that reason.\n`;
const js = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;

const lessonCount = Object.values(CURRICULUM).reduce((n, v) => n + v.length, 0);

if(dry){
  console.log(`[dry] ${missions.length} missions, ${activities.length} activities, ${lessonCount} lessons`);
  console.log('[dry] lessons per group:', Object.fromEntries(
    Object.entries(CURRICULUM).map(([k, v]) => [k, v.length])));
  console.log('[dry] formats:', activities.reduce((a, x) => (a[x.format] = (a[x.format] || 0) + 1, a), {}));
  console.log('[dry] ballpark specs supplied:', Object.keys(BALLPARK_CALCS).length, 'of',
    activities.filter(a => a.format === 'Ballpark').length);
  console.log('[dry] glossary terms:', JARGON.length);
} else {
  if(!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'curriculum.js'),
    banner('curriculum.js — lessons per area of study, plus the estimate specs and glossary') +
    js('CURRICULUM', CURRICULUM) + '\n' + js('BALLPARK_CALCS', BALLPARK_CALCS) + '\n' + js('JARGON', JARGON));
  writeFileSync(resolve(outDir, 'missions.js'),
    banner('missions.js — 15 missions, 3 stops each') + js('MISSIONS', MISSIONS));
  writeFileSync(resolve(outDir, 'import-report.json'), JSON.stringify(report, null, 2));
  console.log(`wrote ${outDir}/curriculum.js, missions.js, import-report.json`);
}

console.log(`\n${missions.length} missions, ${activities.length} activities, ${lessonCount} lessons`);
if(report.unmapped.length){
  console.log(`\n${report.unmapped.length} unmapped section(s):`);
  report.unmapped.forEach(u => console.log(`  · ${u.id ?? ''} ${u.title ?? ''} — ${u.reason}`));
}
if(report.warnings.length){
  console.log(`\n${report.warnings.length} warning(s):`);
  report.warnings.slice(0, 25).forEach(w => console.log('  · ' + w));
  if(report.warnings.length > 25) console.log(`  … ${report.warnings.length - 25} more in import-report.json`);
}
