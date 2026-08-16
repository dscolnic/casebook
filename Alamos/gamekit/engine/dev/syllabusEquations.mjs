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
import { deriveWork, EQUATIONS, equationCoverage } from '../../tools/syllabus.js';

const unnamed = [];
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
        formula: ' ' + [ch.relationship, ch.template, ch.solution,
          // A DERIVE has neither a relationship nor a solution, and is arithmetic
          // from top to bottom. Same rule as the importer's, from the same helper.
          ...deriveWork(ch), ...(ch.givens ?? [])]
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
    if(r.v?.length) console.log(`      ${r.v.map(([sym]) => sym).join(' · ')}`);
    console.log(`      ${where}`);
  }

  // ---- when each one arrives, against when it is first needed
  //
  // The importer stops an equation being introduced before the day something
  // computes it — day 1 of Quantum used to display four equations and use one, and
  // the three spare ones were the heaviest in the course. This prints the result so
  // the rule is visible, and so that a change which quietly demotes an equation to
  // decoration shows up: converting day 9's estimate to a TALLY did exactly that to
  // the CHSH combination, and nothing said so.
  {
    const dayOf = new Map();
    // First arrival, not last. A lesson taught on day 5 and called back on day 13
    // belongs to day 5, and taking the later one made three equations across the
    // games look as though they were introduced before they were used.
    (MISSIONS ?? []).forEach((m, mi) => (m.stops ?? []).forEach(st => {
      const key = `${st.group}:${st.lesson}`;
      if(!dayOf.has(key) || mi + 1 < dayOf.get(key)) dayOf.set(key, mi + 1);
    }));
    const seen = new Map();
    for(const [group, lessons] of Object.entries(CURRICULUM ?? {})){
      lessons.forEach((l, li) => {
        const day = dayOf.get(`${group}:${li}`);
        if(!day) return;
        for(const eq of (l.equations ?? [])){
          const rec = seen.get(eq.e) ?? { first: Infinity, firstComputed: null, days: new Set() };
          rec.first = Math.min(rec.first, day);
          if(eq.computed) rec.firstComputed = Math.min(rec.firstComputed ?? day, day);
          rec.days.add(day);
          seen.set(eq.e, rec);
        }
      });
    }
    const load = [...(MISSIONS ?? []).keys()].map(i => {
      const day = i + 1;
      return [...seen.values()].filter(r => r.days.has(day)).length;
    });
    console.log(`
    equations shown per day: ${load.join(' ')}`);
    const early = [...seen.entries()].filter(([, r]) =>
      r.firstComputed !== null && r.first < r.firstComputed);
    if(early.length){
      console.log(`    ✗ ${early.length} shown before anything computes them:`);
      for(const [e, r] of early){
        console.log(`      · ${e} — shown day ${r.first}, first computed day ${r.firstComputed}`);
      }
    } else {
      console.log('    ✓ none is shown before the day something computes it');
    }
  }

  // An equation whose letters are never named is a decoration. The card that
  // shows it has to say what each symbol is and what the relation asserts, so
  // the list is not allowed to carry one without them.
  for(const r of rows){
    if(!r.v?.length) unnamed.push(`${themeName}: ${r.e} names no variables`);
    if(!r.s) unnamed.push(`${themeName}: ${r.e} has no sentence saying what it asserts`);
  }
}
if(wanted.length > 1) console.log(`\n${missingTotal} equation(s) absent across ${wanted.length} themes.`);
if(unnamed.length){
  console.log(`\n✗ ${unnamed.length} equation(s) printed without their variables defined:`);
  unnamed.forEach(u => console.log('  · ' + u));
  process.exit(1);
}
