// boardAnswer.mjs — does the estimate board grade the question it asks?
//
//   node engine/dev/boardAnswer.mjs <theme> [<theme> …]
//   node engine/dev/boardAnswer.mjs --all
//   node engine/dev/boardAnswer.mjs --selftest
//
// Deep Watch's day-5 stop asks "About how much gauge pressure is the sea
// applying at 90 metres?". Its relationship is p = ρgh. Its prompt states a
// density of 1025 kg/m³, g = 9.81 m/s² and a depth of 90 m. And the panel it
// puts in front of the player is a *bilge-flooding board*: five tiles reading
// 8 cm of rise a minute, 11 gallons per centimetre, a 55 gpm drain pump, 90 m
// of depth and a 31 cm starting level, combined as {0} × {1} + {2}, graded
// against a target of 143 with `units: gallons per minute`. Then the solution
// says "1025 × 9.81 × 90 ≈ 9.05 × 10⁵ Pa".
//
// So the player is asked for a pressure, places three tiles, is marked correct
// on 143 gallons a minute, and reads a verdict computing 0.91 MPa. The same
// stop is in the AP edition, because the board was carried across. CLAUDE.md
// records this exact case as fixed; it was not, and every gate passed it.
//
// WHY NOTHING ELSE SEES IT
//
// `validateContent` checks that target === formula(values[correct]) — which is
// true here, because the tiles and the template are a valid flooding sum. The
// question, the relationship and the solution are internally consistent with
// each other too. Both halves are coherent; they are about different things.
// Neither `apply-conversions`' labels-length guard nor the formula check can
// see across the gap, because there is no inconsistency *within* either half.
//
// THE RULE, AND WHY IT IS TWO CONDITIONS
//
// Fire when BOTH hold:
//
//   1. the solution shows arithmetic (two numerals joined by an operator) and
//      none of its operands is a value the panel actually grades — that is,
//      none of `values[correct]`; and
//   2. the number the panel grades against, `target`, is stated nowhere in the
//      solution.
//
// Condition 1 alone flags ten boards across 307 and eight are benign: a
// solution is free to show a *later* stage of the working ("the gap is 4.4 m
// closing at 0.73 m/s"), or to state only the result, or to spell its operands
// out in words. Condition 2 is what separates those from a board belonging to
// another question: a solution working downstream still names the answer, and
// one written for a different question does not. Together they flag two boards
// across 307 and both are the real defect. That is the whole recall this rule
// is meant to have — a board whose halves disagree *and* whose answer is not
// its panel's answer cannot be a style choice.
//
// Scaled comparisons are allowed on both conditions, because a solution may
// work in MPa where a tile is in Pa. The target comparison uses 5%, which is
// wide enough for "about 1.6 × 10¹⁸" against a target of 1.588 × 10¹⁸ and far
// too narrow for 143 against 905,000.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const SUP = { '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-' };

// Superscript exponents are the three most common in the corpus and none of
// them is in the U+2070 block; `symbolSignature` has paid for that once.
const norm = (s) => String(s ?? '')
  .replace(/,/g, '')
  .replace(/[−–—]/g, '-')
  .replace(/10\^?([⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)/g, (m, d) => '10^' + [...d].map(c => SUP[c] ?? c).join(''));

/** Every number in a string, with `n × 10^k` read as one value rather than two. */
export function numbersIn(s){
  const t = norm(s), out = [], spans = [];
  for(const m of t.matchAll(/(-?\d+\.?\d*)\s*(?:×|x|\*)\s*10\^(-?\d+)/g)){
    out.push(parseFloat(m[1]) * 10 ** parseInt(m[2], 10));
    spans.push([m.index, m.index + m[0].length]);
  }
  for(const m of t.matchAll(/-?\d+\.?\d*(?:[eE][-+]?\d+)?/g)){
    if(spans.some(([a, b]) => m.index >= a && m.index < b)) continue;
    const v = parseFloat(m[0]);
    if(Number.isFinite(v)) out.push(v);
  }
  return out;
}

const NUM = '-?\\d+\\.?\\d*(?:[eE][-+]?\\d+)?(?:\\s*(?:×|x|\\*)\\s*10\\^-?\\d+)?';
const PAIR = new RegExp('(' + NUM + ')\\s*(?:×|x|\\*|÷|/|\\+|-)\\s*(' + NUM + ')', 'g');

/** The values a solution is visibly working *with*, not the ones it reports. */
export function operandsIn(s){
  const t = norm(s), out = [];
  for(const m of t.matchAll(PAIR)) out.push(...numbersIn(m[1]), ...numbersIn(m[2]));
  return out;
}

// A solution may work in a different prefix from the tiles it uses.
const SCALES = [1, 1e3, 1e-3, 1e6, 1e-6, 1e9, 1e-9, 1e4, 1e-4, 60, 1 / 60, 3600, 100, 0.01, 2, 0.5];
const near = (a, b) => SCALES.some(s => Math.abs(a - b * s) <= Math.max(Math.abs(b * s) * 3e-3, 1e-15));

/**
 * Returns null when the board is fine or not measurable, else what disagrees.
 * Exported so the selftest drives the rule itself rather than a copy of it.
 */
export function checkBoard(calc){
  const { values, correct, solution, target } = calc ?? {};
  if(!Array.isArray(values) || !Array.isArray(correct)) return null;
  if(typeof solution !== 'string') return null;
  const ops = operandsIn(solution);
  if(ops.length < 2) return null;                 // no visible arithmetic to judge
  const graded = correct.map(i => values[i]).filter(v => typeof v === 'number');
  if(!graded.length) return null;
  if(graded.some(x => ops.some(y => near(y, x)))) return null;
  if(typeof target === 'number'){
    const tol = Math.max(Math.abs(target) * 0.05, 1e-15);
    const stated = numbersIn(solution).some(y =>
      Math.abs(y - target) <= tol
      || Math.abs(y * 1e3 - target) <= tol
      || Math.abs(y / 1e3 - target) <= tol);
    if(stated) return null;                       // a later stage of the same working
  }
  return { graded, ops, target, units: calc.units ?? '', question: calc.question ?? '' };
}

async function contentOf(themeName){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return content;
}

async function runTheme(name){
  const content = await contentOf(name);
  const calcs = content.BALLPARK_CALCS ?? {};
  const bad = [];
  let seen = 0;
  for(const [key, calc] of Object.entries(calcs)){
    const r = checkBoard(calc);
    seen++;
    if(r) bad.push({ key, ...r });
  }
  if(bad.length){
    console.log(`\n✗ theme "${name}": ${bad.length} board(s) grade a different question from the one they ask`);
    for(const b of bad){
      console.log(`  ✗ [${b.key}] ${b.question}`);
      console.log(`      the panel grades [${b.graded.join(', ')}] to a target of ${b.target}${b.units ? ` ${b.units}` : ''}`);
      console.log(`      the solution works with [${b.ops.join(', ')}] and never states that target`);
    }
    console.log('  Either the tiles belong to another stop or the question does. Read both and');
    console.log('  fix the half that is in the wrong place; the arithmetic on each side is fine.');
    return 1;
  }
  console.log(`✓ ${name}: every estimate board grades the question it asks (${seen} board(s))`);
  return 0;
}

// --- selftest ------------------------------------------------------------
// Four cases, and two of them would let the rule invert silently. The
// downstream-working case is the one that eight benign boards depend on; the
// spelled-out case is why condition 1 requires visible arithmetic.
function selftest(){
  const cases = [
    { name: 'the real defect: a pressure question graded on a flooding board',
      calc: { values: [8, 11, 55, 90, 31], correct: [0, 1, 2], target: 143,
        units: 'gallons per minute', question: 'Estimate the gauge pressure at the fitting.',
        solution: '1025 × 9.81 × 90 ≈ 9.05 × 10^5 Pa = 0.91 MPa, about 9 atmospheres gauge.' },
      expect: 'fail' },
    { name: 'a solution showing a later stage of its own working still names the answer',
      calc: { values: [6.8, 2.4, 0.42, 0.31], correct: [0, 1, 2, 3], target: 6,
        units: 's', question: 'Estimate the time the truss and the rostrum edge are level.',
        solution: 'The gap is 4.4 m closing at 0.73 m/s, so t = 4.4 ÷ 0.73 = 6.0 s.' },
      expect: 'pass' },
    { name: 'a solution that spells its operands out has no arithmetic to judge',
      calc: { values: [-54, 30], correct: [0, 1], target: -1.8, units: '°C',
        question: 'What is the average temperature across the thirty years?',
        solution: 'Minus fifty-four divided by thirty is minus 1.8 degrees.' },
      expect: 'pass' },
    { name: 'an ordinary board whose solution shows the tiles it grades',
      calc: { values: [1150, 4.2, 3, 20, 1280], correct: [2, 0, 1], target: 16663500,
        units: 'W', question: 'Estimate the loss in all three phases.',
        solution: 'P_loss = 3 × 1150² × 4.2 ≈ 1.67 × 10⁷ W ≈ 17 MW.' },
      expect: 'pass' },
    { name: 'prefix mismatch between solution and tiles is not a defect',
      calc: { values: [905, 1.6], correct: [0, 1], target: 1448,
        units: 'kJ', question: 'Estimate the work done against sea pressure.',
        solution: '0.905 MPa × 1.6 m³ ≈ 1.45 MJ.' },
      expect: 'pass' },
    { name: 'no target stated and no shared operand, but nothing to compare',
      calc: { values: [4], correct: [0], target: 4, units: 'm',
        question: 'Read the depth.', solution: 'Four metres.' },
      expect: 'pass' },
  ];
  let failed = 0;
  for(const c of cases){
    const got = checkBoard(c.calc) ? 'fail' : 'pass';
    const ok = got === c.expect;
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  if(failed){
    console.log(`\n✗ boardAnswer selftest: ${failed} case(s) wrong`);
    return 1;
  }
  console.log(`\n✓ boardAnswer selftest: ${cases.length} case(s), and the rule needs both halves to disagree`);
  return 0;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) process.exit(selftest());
const names = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? themeNames() : args.filter(a => !a.startsWith('--'));
let failed = 0;
for(const n of names) failed += await runTheme(n);
if(failed){
  console.log(`\n✗ boardAnswer: ${failed} theme(s) with a board that grades another question.`);
  process.exit(1);
}
console.log(`\n✓ boardAnswer: ${names.length} theme(s), every board grades what it asks.`);
