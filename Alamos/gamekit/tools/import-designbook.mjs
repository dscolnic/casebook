// import-designbook.mjs — turn a curriculum design book into theme content.
//
//   node tools/import-designbook.mjs <book.docx> <theme> [--map map.json] [--dry]
//
// The design books share a regular structure, and this reads exactly that
// structure rather than guessing:
//
//   <table>    Shift | Science focus | Selected games | Major rooms   (the map)
//   Heading1   <shift title>
//   Heading1   <activity title>
//   Normal     <cast> • <location>
//   table      SCENE<situation>
//   Heading2   What you are learning        -> objective
//   Heading2   Your task                    -> KidCallout prompt
//   table      A<option>B<option>C<option>D<option>
//   Heading1   <activity title> — Answer Page
//   Heading2   Correct answer               -> the answer text
//   Heading2   Why it is correct            -> explanation
//   Heading2   Why the tempting answers fail-> one bullet per distractor
//   Heading2   One-sentence takeaway        -> REMEMBER<takeaway>
//   Normal     SHIFT n • CASE m • FORMAT    -> authoritative shift/case/format
//
// Anything it cannot place is written to import-report.json rather than being
// silently dropped or invented.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { loadDocx, findTableByHeader, splitCallout } from './docx.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const [bookPath, themeName, ...rest] = process.argv.slice(2);
if(!bookPath || !themeName){
  console.error('usage: node tools/import-designbook.mjs <book.docx> <theme> [--map map.json] [--dry]');
  process.exit(2);
}
const dry = rest.includes('--dry');
const mapArg = rest.includes('--map') ? rest[rest.indexOf('--map') + 1] : null;
const outDir = resolve(here, '../themes', themeName, 'content');

const blocks = loadDocx(resolve(bookPath));
const report = { unmapped: [], warnings: [], counts: {} };
const warn = (m) => report.warnings.push(m);

// ---------------------------------------------------------------- the map
const mapTable = findTableByHeader(blocks, ['shift']);
if(!mapTable){
  console.error('could not find the curriculum map table (a table whose first column is "Shift").');
  process.exit(1);
}
const header = mapTable.rows[0].map(h => h.toLowerCase());
const col = (name) => header.findIndex(h => h.includes(name));
const cFocus = col('focus'), cGames = col('game'), cRooms = col('room');
const shifts = mapTable.rows.slice(1).map((r, i) => {
  const rawTitle = r[0] || '';
  const t = /^\s*(\d+)\s*[.)]\s*(.+)$/.exec(rawTitle);
  return {
    number: t ? +t[1] : i + 1,
    title: (t ? t[2] : rawTitle).trim(),
    focus: cFocus >= 0 ? r[cFocus] : '',
    formats: cGames >= 0 ? r[cGames].split(/[,/]/).map(s => s.trim()).filter(Boolean) : [],
    rooms: cRooms >= 0 ? r[cRooms].split(/[,/]/).map(s => s.trim()).filter(Boolean) : [],
    activities: [],
  };
});
report.counts.shifts = shifts.length;

// ------------------------------------------------------------- the activities
const H1 = (b) => b.type === 'p' && b.style === 'Heading1';
const H2 = (b) => b.type === 'p' && b.style === 'Heading2';
const MARKER = /SHIFT\s+(\d+)\s*[•·]\s*(?:PATIENT\s+)?CASE\s+(\d+)(?:\s*[•·]\s*([A-Z][A-Z /&-]+))?/i;

/** Text of the paragraphs following a Heading2, up to the next heading. */
function afterHeading(from, label, { bullets = false } = {}){
  // Start past `from`: it is the section's own Heading1, and breaking on the
  // first H1 seen would abort before scanning anything.
  for(let i = from + 1; i < Math.min(from + 60, blocks.length); i++){
    const b = blocks[i];
    if(H1(b)) break;
    if(H2(b) && b.text.toLowerCase().startsWith(label.toLowerCase())){
      const out = [];
      for(let j = i + 1; j < blocks.length; j++){
        const n = blocks[j];
        if(H1(n) || H2(n)) break;
        if(n.type === 'table'){
          const { body } = splitCallout(n.text);
          if(body) out.push(body);
          continue;
        }
        if(!n.text) continue;
        if(bullets && n.style !== 'ListBullet' && out.length) break;
        out.push(n.text);
      }
      return bullets ? out : out.join(' ');
    }
  }
  return bullets ? [] : '';
}

/** Split "A…B…C…D…" run-together option cells into an ordered list. */
function parseOptions(table){
  if(!table) return [];
  // Usual shape: one row per option, letter in its own cell.
  const byRow = table.rows
    .map(r => {
      if(r.length >= 2 && /^[A-D][.)]?$/.test(r[0].trim())) {
        return { letter: r[0].trim()[0], text: r.slice(1).join(' ').trim() };
      }
      const m = r.length === 1 ? /^([A-D])[.)]\s*(.+)$/.exec(r[0].trim()) : null;
      return m ? { letter: m[1], text: m[2].trim() } : null;
    })
    .filter(o => o && o.text);
  if(byRow.length >= 2) return byRow;
  // Fallback: everything in one blob, split where a letter begins an option.
  const parts = table.text.split(/(?=[A-D](?=[A-Z][a-z]))/).filter(Boolean);
  return parts.map(p => ({ letter: p[0], text: p.slice(1).trim() })).filter(o => o.text);
}

/**
 * SEQUENCE activities have no A-D options: the steps are a run of single-cell
 * tables after the prompt, already in the right order. Callout boxes (SCENE,
 * REAL-LIFE RULE, REMEMBER) sit in tables too, so they are excluded by label.
 */
function parseSequence(slice){
  const promptIdx = slice.findIndex(b => b.style === 'KidCallout');
  if(promptIdx < 0) return [];
  const steps = [];
  for(let i = promptIdx + 1; i < slice.length; i++){
    const b = slice[i];
    if(b.type === 'p' && (b.style === 'Heading1' || b.style === 'Heading2')) break;
    if(b.type !== 'table') continue;
    if(b.rows.length !== 1 || b.rows[0].length !== 1) continue;
    const { label, body } = splitCallout(b.text);
    if(label && /SCENE|RULE|REMEMBER|SITUATION/i.test(label)) continue;
    steps.push(body || b.text);
  }
  return steps;
}

const activities = [];
for(let i = 0; i < blocks.length; i++){
  if(!H1(blocks[i])) continue;
  const title = blocks[i].text;
  if(/—\s*Answer Page$/i.test(title)) continue;          // handled with its question
  if(/^Close the Shift/i.test(title)) continue;
  if(shifts.some(s => s.title === title)) continue;      // a shift heading, not an activity

  // Everything up to the next Heading1 is this activity.
  let end = blocks.length;
  for(let j = i + 1; j < blocks.length; j++) if(H1(blocks[j])){ end = j; break; }
  const slice = blocks.slice(i, end);
  const tables = slice.filter(b => b.type === 'table');

  const scene = tables.map(t => splitCallout(t.text))
    .find(c => c.label && /SCENE|SITUATION/i.test(c.label))?.body || '';
  const prompt = slice.find(b => b.style === 'KidCallout')?.text || '';
  const castLine = slice.find(b => b.type === 'p' && b.style === 'Normal' && /[•·]/.test(b.text))?.text || '';
  const optionTable = tables.find(t => parseOptions(t).length >= 3);
  const options = parseOptions(optionTable);
  const steps = options.length ? [] : parseSequence(slice);

  // The answer page is the next Heading1 with the same title.
  let ansStart = -1;
  for(let j = end; j < Math.min(end + 4, blocks.length); j++){
    if(H1(blocks[j]) && blocks[j].text.replace(/\s*—\s*Answer Page$/i, '') === title){ ansStart = j; break; }
  }
  // The marker line is authoritative for shift / case / format. Front matter has
  // none, so establish it before warning about anything.
  const preMarker = [...slice, ...(ansStart >= 0 ? blocks.slice(ansStart, ansStart + 40) : [])]
    .map(b => MARKER.exec(b.text || '')).find(Boolean);
  if(!preMarker){ report.unmapped.push({ title, reason: 'no SHIFT n / CASE m marker (front matter?)' }); continue; }

  let answer = '', why = '', rebuttals = [], takeaway = '', notes = [], teacher = '';
  if(ansStart >= 0){
    answer = afterHeading(ansStart, 'Correct answer');
    why = afterHeading(ansStart, 'Why it is correct');
    rebuttals = afterHeading(ansStart, 'Why the tempting answers fail', { bullets: true });
    takeaway = afterHeading(ansStart, 'One-sentence takeaway');
    notes = afterHeading(ansStart, 'Implementation notes', { bullets: true });
    teacher = afterHeading(ansStart, 'Teacher');
  } else {
    warn(`no answer page found for activity "${title}"`);
  }

  const marker = preMarker;
  const shiftNo = marker ? +marker[1] : null;
  const caseNo = marker ? +marker[2] : null;
  const format = marker && marker[3] ? marker[3].trim().toLowerCase() : null;

  if(!options.length && !steps.length) warn(`activity "${title}" has neither options nor ordered steps`);
  if(!answer && !steps.length) warn(`activity "${title}" has no correct answer`);

  const correctIndex = options.findIndex(o =>
    answer && o.text.toLowerCase().slice(0, 40) === answer.toLowerCase().slice(0, 40));

  activities.push({
    shift: shiftNo, case: caseNo, format, title,
    cast: castLine, scene, objective: afterHeading(i, 'What you are learning'),
    prompt,
    options: options.map(o => o.text),
    steps,                                  // ordered steps for sequence formats
    correctIndex: correctIndex >= 0 ? correctIndex : null,
    correctText: answer,
    why, rebuttals, takeaway, notes, teacher,
  });
}
report.counts.activities = activities.length;
for(const a of activities){
  const s = shifts.find(s => s.number === a.shift);
  if(s) s.activities.push(a); else warn(`activity "${a.title}" references shift ${a.shift}, not in the map`);
}
for(const s of shifts){
  s.activities.sort((x, y) => (x.case ?? 0) - (y.case ?? 0));
  if(s.activities.length !== 3){
    warn(`shift ${s.number} ("${s.title}") parsed ${s.activities.length} activities, expected 3`);
  }
  for(const a of s.activities){
    if(a.correctIndex === null && a.options.length){
      warn(`shift ${s.number} "${a.title}": could not match the correct answer to an option — set correctIndex by hand`);
    }
  }
}

// -------------------------------------------------- shift -> group assignment
// This mapping is a design decision, not something to infer from prose. Supply
// it with --map; without one, shifts are spread round-robin and flagged.
let shiftToGroup = null;
if(mapArg){
  shiftToGroup = JSON.parse(readFileSync(resolve(mapArg), 'utf8'));
} else {
  warn('no --map given: shifts were assigned to groups round-robin. ' +
       'Write a map file ({"1":"G1", …}) and re-run before authoring.');
}
const groupIds = shiftToGroup
  ? [...new Set(Object.values(shiftToGroup))]
  : ['G1', 'G2', 'G3', 'G4', 'G5', 'G6'];
const groupOf = (n) => shiftToGroup ? (shiftToGroup[String(n)] ?? groupIds[0])
                                    : groupIds[(n - 1) % groupIds.length];

// Lessons accumulate per group, in shift order, so a stop's lesson index is
// its position within that group's list.
const curriculum = {};
for(const g of groupIds) curriculum[g] = [];
const missions = [];
for(const s of shifts){
  const g = groupOf(s.number);
  const stops = s.activities.map((a) => {
    const lessonIndex = curriculum[g].length;
    curriculum[g].push({
      title: a.title,
      // Prefer the marker's format; fall back to the activity's actual shape,
      // since not every marker line carries one.
      format: a.format || (a.steps.length ? 'sequence' : 'diagnosis'),
      cast: a.cast,
      scene: a.scene,
      objective: a.objective,
      prompt: a.prompt,
      options: a.options,
      steps: a.steps,
      correctIndex: a.correctIndex,
      why: a.why,
      rebuttals: a.rebuttals,
      takeaway: a.takeaway,
      notes: a.notes,
      teacher: a.teacher,
    });
    return { group: g, lesson: lessonIndex, task: a.title };
  });
  missions.push({
    title: s.title,
    objective: s.focus,
    briefing: s.focus,
    takeaway: 'Session complete',
    rooms: s.rooms,
    formats: s.formats,
    stops,
  });
}

// ------------------------------------------------------------------- emit
const banner = (what) => `// ${what}\n` +
  `// GENERATED by tools/import-designbook.mjs from ${bookPath.split('/').pop()}\n` +
  `// Re-running overwrites this file. Hand edits belong in a separate override.\n`;
const js = (name, value) => `${banner(name)}export const ${name} = ${JSON.stringify(value, null, 2)};\n`;

if(dry){
  console.log(`[dry] ${shifts.length} shifts, ${activities.length} activities`);
  console.log(`[dry] lessons per group:`, Object.fromEntries(
    Object.entries(curriculum).map(([k, v]) => [k, v.length])));
  const sample = curriculum[groupIds[0]][0];
  if(sample) console.log(`[dry] first lesson:\n`, JSON.stringify(sample, null, 2).slice(0, 900));
} else {
  if(!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'missions.js'), js('MISSIONS', missions));
  writeFileSync(resolve(outDir, 'curriculum.js'), js('CURRICULUM', curriculum));
  writeFileSync(resolve(outDir, 'import-report.json'), JSON.stringify(report, null, 2));
  console.log(`wrote ${outDir}/missions.js, curriculum.js, import-report.json`);
}

console.log(`\n${shifts.length} shifts, ${activities.length} activities, ` +
  `${Object.values(curriculum).reduce((n, v) => n + v.length, 0)} lessons`);
if(report.unmapped.length) console.log(`${report.unmapped.length} unmapped section(s) — see import-report.json`);
if(report.warnings.length){
  console.log(`\n${report.warnings.length} warning(s):`);
  report.warnings.slice(0, 20).forEach(w => console.log('  · ' + w));
  if(report.warnings.length > 20) console.log(`  … ${report.warnings.length - 20} more in import-report.json`);
}
