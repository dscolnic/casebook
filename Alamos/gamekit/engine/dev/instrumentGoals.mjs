// instrumentGoals.mjs — the panel says what counts as done, before it is done.
//
//   node engine/dev/instrumentGoals.mjs <theme>
//   node engine/dev/instrumentGoals.mjs --selftest
//
// FLY graded a plan against four numbers — arrive at 90 ± 3 degrees, be turning
// no faster than 1 deg/s when you get there, spend no more than 16 s of
// thruster — and printed none of them until after the one run it allowed. A
// player set two sliders they had no criterion for, watched a trace go
// somewhere, and could not run it again. Every check in the repo was green,
// because every check reads the book and the book was fine: the goal existed in
// the data and reached no screen.
//
// So this reads the RENDERER, the way fieldCoverage does. For the formats whose
// success criterion is something to PLAN AGAINST, it renders the panel with the
// stop's own data and asserts the numbers are in the text the player sees.
//
// WHAT IS DELIBERATELY NOT CHECKED. Grading slack on a value the player reports
// — a BALLPARK tolerance, a VERIFY band, a HOLDOUT pass mark — is not a goal in
// this sense. Knowing it changes nothing about how you get there, and printing
// it invites aiming at the edge of it. Nor is the answer itself: rule 2 in
// instruments.js says a panel never prints its target, and BALANCE's total is
// exactly that. A criterion is the shape of the box; the answer is what goes in
// it.
//
// It is a node-only check — `html(ch)` is a pure string function — so it runs
// inside `npm run check` next to everything else. What it cannot see is whether
// the panel can be operated more than once; that is `npm run drive`, which
// needs a browser and asserts FLY's second run separately.

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';
import { INSTRUMENTS } from '../core/instruments.js';

const args = process.argv.slice(2);
const selftest = args.includes('--selftest');
const themeName = args.find(a => !a.startsWith('--'));

/**
 * What each format has to have said before the player touches a control.
 *
 * Numbers are matched numerically rather than as strings, because a panel is
 * free to print 1 as "1.0" and the check is about whether the criterion
 * reached the player, not about how it was rounded. Phrases are matched
 * lower-cased and whole.
 */
const GOALS = {
  FLY: (g) => ({
    numbers: [+g.fly.target, +g.fly.tolerance, +g.fly.rateTolerance, +g.fly.budget],
    phrases: [],
    what: 'the target, its tolerance, the residual rate and the pulse budget',
  }),
  CLOUD: (g) => ({
    numbers: [+(+g.cloud.pass * 100).toFixed(1), 68.3],
    phrases: ['place the middle bar where the mean is'],
    what: 'the fraction that has to finish inside the limits, and what one sigma has to hold',
  }),
  TRIANGULATE: (g) => ({
    numbers: [+g.triangulate.tolerance],
    phrases: ['three stations'],
    what: 'the position tolerance and the three-station rule',
  }),
  CONTROL: () => ({
    numbers: [],
    phrases: ['exactly one thing changed', 'put it back'],
    what: 'the isolate-and-reverse the commit button is gated on',
  }),
};

const text = (html) => String(html ?? '')
  .replace(/<[^>]*>/g, ' ')
  .replace(/&[a-z]+;/g, ' ')
  .replace(/\s+/g, ' ')
  .toLowerCase();
const numbersIn = (s) => (s.match(/-?\d+(?:[.,]\d+)?/g) ?? [])
  .map(x => parseFloat(x.replace(/,/g, '')));
/** Present if some number on the panel is this one, to a hair. */
const carries = (nums, v) => nums.some(n => Math.abs(n - v) <= Math.max(1e-6, Math.abs(v) * 1e-6));

/** Every criterion in `want` that the rendered panel failed to say. */
function missing(html, want){
  const t = text(html);
  const nums = numbersIn(t);
  return [
    ...want.numbers.filter(v => !carries(nums, v)).map(v => String(v)),
    ...want.phrases.filter(p => !t.includes(p.toLowerCase())).map(p => `"${p}"`),
  ];
}

/**
 * Two renders that must not score the same.
 *
 * The rule this file exists for cuts both ways: a measurement that produces a
 * plausible answer is not thereby a working measurement. So the selftest takes
 * a real FLY panel, which has to pass, and the same panel with its goal block
 * cut out, which has to fail — and fail on the three numbers that live nowhere
 * else on it. If a future edit moves the criterion somewhere the stripper
 * cannot reach, this goes red rather than reporting all-clear for ever.
 */
function runSelftest(){
  const g = { question: 'How hard do you start the turn?', fly: {
    target: 90, tolerance: 3, rateTolerance: 1, budget: 16, accel: 2,
    pulse: { min: 4, max: 8, step: 2, unit: 's' },
    brake: { min: 35, max: 90, step: 1, unit: 'deg' },
    state: { label: 'Attitude', unit: 'deg', init: 0 }, rate: { label: 'Rate', unit: 'deg/s' },
  } };
  const want = GOALS.FLY(g);
  const full = INSTRUMENTS.FLY.html(g);
  const stripped = full.replace(/<div class="instGoal">[\s\S]*?<\/div>\s*<\/div>/, '');
  const bad = [];
  const gapsFull = missing(full, want);
  if(gapsFull.length) bad.push(`a complete FLY panel is reported as missing ${gapsFull.join(', ')}`);
  const gapsStripped = missing(stripped, want);
  // 3, 1 and 16 appear nowhere else on the panel; 90 is also on the plot's own
  // target caption, so it is not part of what the strip has to lose.
  for(const v of ['3', '1', '16']){
    if(!gapsStripped.includes(v)) bad.push(`a FLY panel with no goal block still passes on ${v}`);
  }
  if(bad.length){
    bad.forEach(b => console.error(`  ✗ ${b}`));
    console.error('instrumentGoals selftest FAILED');
    process.exit(1);
  }
  console.log('instrumentGoals selftest: a panel that states its criterion is'
    + ' distinguishable from one that does not');
}

if(selftest){
  runSelftest();
  process.exit(0);
}

if(!themeName){
  console.error('usage: node engine/dev/instrumentGoals.mjs <theme> | --selftest');
  process.exit(2);
}

const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content);

const kindOf = (g) => String(g?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
let checked = 0;
const fails = [];

for(const [group, lessons] of Object.entries(content.CURRICULUM ?? {})){
  (lessons ?? []).forEach((l, i) => {
    const g = l.game;
    const kind = kindOf(g);
    const spec = GOALS[kind];
    if(!spec || !INSTRUMENTS[kind]) return;
    checked++;
    let html = '';
    try{ html = INSTRUMENTS[kind].html(g); }
    catch(e){ fails.push(`${group}[${i}] ${kind} — the panel would not render: ${e.message}`); return; }
    const gaps = missing(html, spec(g));
    if(gaps.length){
      fails.push(`${group}[${i}] ${kind} "${l.title ?? ''}" — the panel never says ${gaps.join(', ')}`
        + `\n      it is graded on ${spec(g).what}`);
    }
  });
}

if(fails.length){
  console.error(`${themeName}: ${fails.length} instrument panel(s) grade against a criterion`
    + ' the player cannot see');
  fails.forEach(f => console.error(`  ✗ ${f}`));
  process.exit(1);
}
console.log(`${themeName.padEnd(20)} ${checked} plan-against instrument(s), every criterion on screen`);
