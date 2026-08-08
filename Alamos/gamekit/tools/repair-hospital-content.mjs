// repair-hospital-content.mjs — restore the fields the first conversion dropped.
//
//   node tools/repair-hospital-content.mjs [--write]
//
// The hospital build's lessons were generated from the design book but lost the
// SCENE — the paragraph that carries the clues the player needs. The symptom is
// a question like "Who Needs You First?" that asks who to see first while
// showing no information about anyone. Worse, `takeaway` was filled with the
// answer's reasoning and is rendered *before* the question, so the intro panel
// gave away the answer while withholding the evidence.
//
// This reads the book, matches each lesson by title (ignoring "— Review n"
// suffixes, which are repeats of the same activity) and restores:
//
//   scene      the situation and its clues            (was absent entirely)
//   story      now the scene, not a copy of the objective
//   takeaway   the book's one-sentence takeaway       (was the "why")
//   why        the explanation, kept on the answer page
//   choices    full option text with its reasoning    (was truncated to names)
//   rebuttals  why each tempting answer fails         (was absent)
//
// SEQUENCE and BALLPARK lessons already carry correct `cards`/`order`, so their
// interaction data is left alone; only the narrative fields are filled in.
import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import { parseDesignBook } from './parse-designbook.mjs';

const BOOK = '/Users/scolnic/code/Nuclear/Alamos/Hospital/hospital_heroes_junior_doctor_curriculum_design_book.docx';
const TARGET = '/Users/scolnic/code/Nuclear/Alamos/Hospital/hospital-fps/src/curriculum.js';
const write = process.argv.includes('--write');

const { activities } = parseDesignBook(BOOK);
const byTitle = new Map(activities.map(a => [a.title.trim(), a]));

const { CURRICULUM } = await import(TARGET);

const baseTitle = (t) => t.replace(/\s*—\s*Review\s*\d+\s*$/i, '').trim();
const stats = { patched: 0, unmatched: [], scene: 0, takeaway: 0, choices: 0, rebuttals: 0, why: 0 };

for(const [group, lessons] of Object.entries(CURRICULUM)){
  for(const lesson of lessons){
    const a = byTitle.get(baseTitle(lesson.title));
    if(!a){ stats.unmatched.push(`${group}: ${lesson.title}`); continue; }
    stats.patched++;
    const g = lesson.game || (lesson.game = {});

    // The clues. This is the field whose absence made questions unanswerable.
    if(a.scene){
      lesson.scene = a.scene;
      g.scene = a.scene;
      lesson.story = a.scene;              // was a duplicate of the objective
      stats.scene++;
    }
    // The objective belongs in `progress`, where the UI already expects it.
    if(a.objective) lesson.progress = a.objective;

    // The book's actual takeaway, not the answer's reasoning.
    if(a.takeaway && lesson.takeaway !== a.takeaway){ lesson.takeaway = a.takeaway; stats.takeaway++; }
    // Keep the explanation where the answer page reads it from. Step-ordering
    // activities have no separate "why" in the book — the takeaway carries the
    // point — so do not duplicate it into both slots.
    if(a.why && g.why !== a.why){ g.why = a.why; stats.why++; }

    // Full option text. Grading uses choices.indexOf(correctChoice), so both
    // have to be replaced together or the correct answer becomes unfindable.
    if(a.options.length >= 2 && a.correctIndex !== null){
      const truncated = (g.choices || []).some((c, i) => a.options[i] && c.length < a.options[i].length - 8);
      if(truncated || (g.choices || []).length !== a.options.length){
        g.choices = a.options.slice();
        g.correctChoice = a.options[a.correctIndex];
        g.answer = a.options[a.correctIndex];
        stats.choices++;
      }
    }
    if(a.rebuttals.length && !(g.rebuttals || []).length){ g.rebuttals = a.rebuttals.slice(); stats.rebuttals++; }
  }
}

// ---- verify before writing
const problems = [];
for(const [group, lessons] of Object.entries(CURRICULUM)){
  for(const l of lessons){
    const g = l.game || {};
    if(!l.scene) problems.push(`${group} "${l.title}": still no scene`);
    if(l.takeaway && g.why && l.takeaway === g.why){
      problems.push(`${group} "${l.title}": takeaway duplicates the why`);
    }
    if((g.choices || []).length && g.correctChoice && !g.choices.includes(g.correctChoice)){
      problems.push(`${group} "${l.title}": correctChoice is not among choices — ungradeable`);
    }
  }
}

console.log(`matched ${stats.patched} lessons; ${stats.unmatched.length} unmatched`);
console.log(`  scene restored     ${stats.scene}`);
console.log(`  takeaway corrected ${stats.takeaway}`);
console.log(`  why set            ${stats.why}`);
console.log(`  choices restored   ${stats.choices}`);
console.log(`  rebuttals added    ${stats.rebuttals}`);
if(stats.unmatched.length){
  console.log('\nunmatched (left untouched):');
  stats.unmatched.slice(0, 10).forEach(u => console.log('  · ' + u));
}
if(problems.length){
  console.log(`\n${problems.length} remaining problem(s):`);
  problems.slice(0, 12).forEach(p => console.log('  ✗ ' + p));
}

if(!write){
  console.log('\n(dry run — pass --write to update curriculum.js)');
  process.exit(problems.length ? 1 : 0);
}

// ---- rewrite only the CURRICULUM export, leaving the other consts untouched
const src = readFileSync(TARGET, 'utf8');
const marker = 'export const CURRICULUM=';
const at = src.indexOf(marker);
if(at < 0){
  console.error('could not find "export const CURRICULUM=" in the target file');
  process.exit(1);
}
// find the end of that statement: the next top-level "export const"
const nextExport = src.indexOf('\nexport const', at + marker.length);
const tail = nextExport < 0 ? '' : src.slice(nextExport);
const head = src.slice(0, at);

if(!existsSync(TARGET + '.bak')) copyFileSync(TARGET, TARGET + '.bak');
writeFileSync(TARGET,
  head + marker + JSON.stringify(CURRICULUM) + ';' + tail);
console.log(`\nwrote ${TARGET} (backup at curriculum.js.bak)`);
