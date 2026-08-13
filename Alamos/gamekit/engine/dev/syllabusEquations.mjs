// syllabusEquations.mjs — the equations the course has to teach, and which
// questions address them.
//
//   node engine/dev/syllabusEquations.mjs <theme> [--all]
//
// The concept map on page 3 of the printed book asks whether a question touches a
// topic. This asks the harder question: does any question actually USE the
// equation? A question COMPUTES it when the estimate's own `relationship`,
// template or worked solution matches — a number came out of it. A question
// MENTIONS it when only the prose does. A course cannot be said to have taught an
// equation nothing computes, so the two are never merged.
//
// The list is authored in tools/syllabus.js (`EQUATIONS`), next to the concept
// claim it sits beside.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { EQUATIONS, equationCoverage } from '../../tools/syllabus.js';

const args = process.argv.slice(2);
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/syllabusEquations.mjs <theme> [--all]');
  process.exit(2);
}

const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
let missingTotal = 0;

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];

  // One entry per question, each lesson once, in campaign order — the same
  // dedupe `make-book` does, keyed on group:lesson, so a callback or a review
  // variant does not get a second number. Without it these numbers drift past the
  // end of the book: Riverton's 58th stop is its 45th question.
  const pages = [];
  const seen = new Set();
  for(const m of MISSIONS){
    for(const s of m.stops ?? []){
      const l = CURRICULUM[s.group]?.[s.lesson];
      if(!l?.game) continue;
      const key = `${s.group}:${s.lesson}`;
      if(seen.has(key)) continue;
      seen.add(key);
      const ch = l.game ?? {};
      pages.push({
        group: s.group,
        title: l.title ?? '',
        // Only the arithmetic: the relationship as authored, the template the
        // player fills, and the worked solution.
        formula: ' ' + [ch.relationship, ch.template, ch.solution, ...(ch.givens ?? [])]
          .filter(Boolean).join('  ').toLowerCase() + ' ',
        text: ' ' + [l.title, l.scene, l.takeaway, ch.question, ch.task, ch.why, ch.headline,
          ch.setup, ch.prompt, ch.explanation, ch.answer,
          ...(ch.cards ?? []).map(label), ...(ch.choices ?? []).map(label),
          ...(ch.scenarios ?? []).map(label), ...(ch.proposals ?? []).map(label),
          ...(ch.rebuttals ?? []).map(label), ...(ch.givens ?? []).map(label),
          ...(ch.readings ?? []).flatMap(r => [r?.label, r?.name, r?.note, r?.purpose]),
          ...(l.assumes ?? [])].filter(Boolean).join('  ').toLowerCase() + ' ',
      });
    }
  }

  const rows = equationCoverage(themeName, pages);
  if(!rows.length){ console.log(`\n${themeName}: no equation list authored`); continue; }
  const computed = rows.filter(r => r.computes.length).length;
  const mentioned = rows.filter(r => !r.computes.length && r.mentions.length).length;
  const missing = rows.filter(r => !r.computes.length && !r.mentions.length);
  missingTotal += missing.length;

  console.log(`\n=== ${themeName} — ${rows.length} equations the course has to teach`);
  console.log(`    ${computed} computed by a question, ${mentioned} only mentioned, ${missing.length} absent\n`);
  for(const r of rows){
    const mark = r.computes.length ? '✓' : r.mentions.length ? '~' : '✗';
    const where = r.computes.length ? `computed in question${r.computes.length === 1 ? '' : 's'} ${r.computes.join(', ')}`
      : r.mentions.length ? `mentioned only, question${r.mentions.length === 1 ? '' : 's'} ${r.mentions.slice(0, 8).join(', ')}${r.mentions.length > 8 ? '…' : ''}`
      : 'NO QUESTION';
    console.log(`  ${mark} ${r.e}`);
    console.log(`      ${r.c}`);
    console.log(`      ${where}`);
  }
}
if(wanted.length > 1) console.log(`\n${missingTotal} equation(s) absent across ${wanted.length} themes.`);
