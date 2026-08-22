// deriveRules.mjs — does the rule half of a DERIVE reach the screen, and can it be answered?
//
//   node engine/dev/deriveRules.mjs <theme> [<theme> …]
//   node engine/dev/deriveRules.mjs --all
//   node engine/dev/deriveRules.mjs --selftest
//
// A DERIVE stop can ask two things per step: which expression the line above
// gives you, and which rule licenses it. The second half is off by default and
// opted into with `askRule: true`, and `instruments.js` asks for it only on
// `d.askRule === true && (d.rules ?? []).length > 0`.
//
// THE DEFECT THIS WAS WRITTEN FOR
//
// `tools/import-book.mjs` validated `askRule` at length — it refused a list of
// fewer than three rules, refused a `rules` list without the flag, refused a
// candidate claiming a rule not in the list, and refused a step with no rule on
// any candidate — and then **never emitted the flag**. The object it returned
// carried `start`, `goal`, `startNote`, `rules`, `steps`, `hint` and `caption`,
// and no `askRule`. So Slack Water, Overwind and Dark Fibre each authored
// `askRule: true` on twelve stops, Ground Truth on eleven, the books passed
// every refusal, and the rule half of all 177 steps was inert in the shipped
// game. The `rules` list travelled into the content and printed nowhere.
//
// Nothing could see it. `bookParity` regenerates the content and compares, and
// the content is byte-identical either way, so the flag being dropped is
// invisible to it — the same blind spot `export-book.mjs` had with
// `takesAsRead`. `fieldCoverage` reads the renderers for `ch.x` and `lesson.x`
// and this is `ch.derive.askRule`, a level down. And the importer's own checks
// all passed, because they were checking the book rather than the output.
//
// THE RULES HERE
//
// 1. A derive chain whose content carries a `rules` list must carry
//    `askRule: true` beside it, or the list reaches no screen. This is the
//    defect above, stated as an invariant on the content rather than on the
//    importer, so a hand-edited or legacy content file cannot reintroduce it.
// 2. Where the rule IS asked, every step's keyed candidate must carry a rule,
//    and that rule must be one of the chain's `rules` — otherwise no button on
//    the panel matches it and the step cannot be answered correctly. The
//    importer refuses both today; this asserts them on what shipped.
//
// WHAT THIS DELIBERATELY DOES NOT FAIL
//
// A step where every candidate carries the same rule. It looks like "a click
// with one possible value" and it is not: the buttons offered are the chain's
// whole `rules` list — "the full list for the course rather than the two that
// are plausible here", as the panel's own docstring puts it — so the player
// still has to know which of five rules licenses the step. What such a step
// loses is the *coupling*: the rule answer no longer depends on which branch
// was taken. That is worth seeing, so it is counted and printed, and it is not
// a failure. Forty-four of 177 steps are like that (Overwind 21, Slack Water
// 15, Ground Truth 6, Dark Fibre 2), and the cause is a vocabulary of rules
// that describe typing rather than licences — `substitution of the stated
// values` appears 35 times in Overwind and `rearrangement` 73 times in Ground
// Truth. Dark Fibre is the control: same flag, same format, 2 of 47.
//
// The first version of this file failed those 44 outright, on the strength of a
// sentence in CLAUDE.md, without reading the renderer. It would have demanded
// 44 steps of authoring to fix a question that is answerable — and it would
// have reported all four campaigns as broken while the actual defect, that
// none of the 177 was being asked at all, sat underneath it. Read the panel
// before believing a count.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

/**
 * Returns { problems, asked, thin } for one lesson. Exported so the selftest
 * drives this function rather than a copy of its reasoning.
 */
export function checkDerive(lesson){
  const d = lesson?.game?.derive ?? lesson?.derive;
  const out = { problems: [], asked: 0, thin: 0 };
  if(!d || !Array.isArray(d.steps) || !d.steps.length) return out;
  const rules = Array.isArray(d.rules) ? d.rules.map(String) : [];
  const title = lesson?.title ?? '?';

  // 1. A list with no flag reaches no screen.
  if(rules.length && d.askRule !== true){
    out.problems.push(`"${title}" lists ${rules.length} rules and does not set askRule, `
      + 'so the rule half of every step is inert and the list prints nowhere');
    return out;
  }
  if(d.askRule === true && !rules.length){
    out.problems.push(`"${title}" sets askRule with no rules to choose from`);
    return out;
  }
  if(d.askRule !== true) return out;               // not asking: nothing more to assert

  // 2. Every step must be answerable: the keyed rule has to be on a button.
  const offered = new Set(rules);
  d.steps.forEach((s, i) => {
    out.asked++;
    const cands = Array.isArray(s?.candidates) ? s.candidates : [];
    const key = cands[+s?.answer];
    const r = key?.rule;
    if(typeof r !== 'string' || !r.trim()){
      out.problems.push(`"${title}" step ${i + 1} asks for a rule and its keyed candidate has none, `
        + 'so the step is graded against an empty string and can never be right');
      return;
    }
    if(!offered.has(String(r))){
      out.problems.push(`"${title}" step ${i + 1} is keyed to the rule "${r}", which is not in the `
        + "chain's rules list, so no button on the panel carries it");
      return;
    }
    const distinct = new Set(cands.map(c => c?.rule).filter(x => typeof x === 'string' && x.trim()));
    if(distinct.size < 2) out.thin++;
  });
  return out;
}

async function contentOf(name){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(name), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return content;
}

async function runTheme(name){
  const content = await contentOf(name);
  const problems = [];
  let asked = 0, thin = 0;
  for(const lessons of Object.values(content.CURRICULUM ?? {})){
    for(const l of lessons ?? []){
      const r = checkDerive(l);
      problems.push(...r.problems);
      asked += r.asked; thin += r.thin;
    }
  }
  if(problems.length){
    console.log(`\n✗ theme "${name}": ${problems.length} DERIVE rule problem(s)`);
    for(const p of problems) console.log(`  ✗ ${p}`);
    return 1;
  }
  if(!asked){ console.log(`✓ ${name}: no DERIVE asks for a rule`); return 0; }
  const pct = Math.round(100 * thin / asked);
  console.log(`✓ ${name}: ${asked} rule question(s) asked and answerable`
    + (thin ? ` · ${thin} (${pct}%) have one rule across all candidates, so the rule answer does not depend on the branch` : ''));
  return 0;
}

// --- selftest ------------------------------------------------------------
// The two cases that would let this invert silently are the ones that must
// PASS: a chain not asking at all, and a step whose candidates share a rule.
// Failing the second is what the first version of this file did, and it would
// have hidden the real defect underneath 44 false failures.
function selftest(){
  const step = (ask, rules, answer = 0) =>
    ({ ask, answer, candidates: rules.map(r => ({ text: 't', rule: r })) });
  const cases = [
    { name: 'a rules list with no askRule reaches no screen',
      lesson: { title: 'x', game: { derive: { rules: ['p', 'q', 'r'],
        steps: [step('one', ['p', 'q'])] } } }, expect: 1 },
    { name: 'askRule with no rules to choose from',
      lesson: { title: 'x', game: { derive: { askRule: true, rules: [],
        steps: [step('one', ['p'])] } } }, expect: 1 },
    { name: 'asking, and the keyed candidate carries no rule',
      lesson: { title: 'x', game: { derive: { askRule: true, rules: ['p', 'q', 'r'],
        steps: [{ ask: 'one', answer: 0, candidates: [{ text: 't' }, { text: 'u', rule: 'p' }] }] } } },
      expect: 1 },
    { name: "asking, and the keyed rule is not on any button",
      lesson: { title: 'x', game: { derive: { askRule: true, rules: ['p', 'q', 'r'],
        steps: [step('one', ['zz', 'p'])] } } }, expect: 1 },
    { name: 'asking, answerable, and every candidate shares one rule — counted, not failed',
      lesson: { title: 'x', game: { derive: { askRule: true, rules: ['p', 'q', 'r'],
        steps: [step('one', ['p', 'p', 'p'])] } } }, expect: 0 },
    { name: 'not asking at all: a step with one rule costs nothing',
      lesson: { title: 'x', game: { derive: {
        steps: [step('one', ['p', 'p'])] } } }, expect: 0 },
    { name: 'asking, answerable, two rules on the step',
      lesson: { title: 'x', game: { derive: { askRule: true, rules: ['p', 'q', 'r'],
        steps: [step('one', ['p', 'q'])] } } }, expect: 0 },
    { name: 'not a DERIVE',
      lesson: { title: 'x', game: { type: 'CHOICE', choices: ['a', 'b'] } }, expect: 0 },
  ];
  let failed = 0;
  for(const c of cases){
    const got = checkDerive(c.lesson).problems.length;
    const ok = got === c.expect;
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  // And the count is a count: the thin case has to be reported, not swallowed.
  const thin = checkDerive({ title: 'x', game: { derive: { askRule: true, rules: ['p', 'q', 'r'],
    steps: [step('one', ['p', 'p'])] } } }).thin;
  const ok = thin === 1;
  if(!ok) failed++;
  console.log(`  ${ok ? '✓' : '✗'} a shared-rule step is still counted — expected 1, got ${thin}`);
  if(failed){
    console.log(`\n✗ deriveRules selftest: ${failed} case(s) wrong`);
    return 1;
  }
  console.log(`\n✓ deriveRules selftest: ${cases.length + 1} case(s), and a shared rule is reported rather than failed`);
  return 0;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) process.exit(selftest());
const names = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? themeNames() : args.filter(a => !a.startsWith('--'));
let failed = 0;
for(const n of names) failed += await runTheme(n);
if(failed){
  console.log(`\n✗ deriveRules: ${failed} theme(s) where the rule half is inert or unanswerable.`);
  process.exit(1);
}
console.log(`\n✓ deriveRules: ${names.length} theme(s), the rule half reaches the screen and can be answered.`);
