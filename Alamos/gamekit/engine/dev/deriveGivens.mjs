// deriveGivens.mjs — does a derivation substitute numbers the player was given?
//
//   node engine/dev/deriveGivens.mjs <theme> | --all | --selftest
//
// THE DEFECT. Ground Truth mission 1 stop 2 asks the player to derive the net
// vertical field. Its card says "use the displayed values"; its first two lines
// are `E_y=E_1y+E_2y` and `E_y=(-3.0)+(-1.5) kV/m`. Nothing anywhere before that
// second line says what E_1y or E_2y is — not the card, not the derivation's own
// `start` or `goal`, not the stop before it, whose readings are ±4.1 to ±4.3. So
// −3.0 and −1.5 arrive inside the options of the step that substitutes them, and
// the player cannot derive that line. They can only notice which option keeps
// both signs negative.
//
// WHAT IS MEASURED, and it is deliberately one line per stop.
//
// A derivation's numbers enter at ONE step — the substitution. Every keyed line
// after it is a result and its numbers SHOULD be new, because working them out is
// the exercise. So this looks at the first keyed line that carries a number and
// asks whether those numbers appear anywhere the player has already read: the
// mission card, the stop's own reason, setup and prompt, the derivation's start,
// goal and givens, and every earlier stop in the mission.
//
// WHAT IT DELIBERATELY DOES NOT DO. It does not check the later lines (they are
// results), it does not check the distractors (a wrong line may introduce a wrong
// number — that is what makes it wrong), and it compares absolute values so a
// sign convention stated in words rather than digits is not reported.
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { themeNames } from './registry.mjs';
import { parseYaml } from '../../tools/yaml-lite.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');

/**
 * The numbers in a string, as the player would read them.
 *
 * SUBSCRIPTS AND EXPONENTS ARE NOT VALUES. `E_1y`, `E_2y` and `x^2` carry digits
 * that name a thing rather than measure one, and counting them made every
 * derivation look like it introduced numbers. So a digit run only counts when it
 * is not glued to a letter, an underscore or a caret.
 */
const NUMBER = /(?<![\p{L}\p{N}_^.])(\d+(?:\.\d+)?)(.?)/gu;

/**
 * Is this digit run a VALUE, or is it part of the algebra?
 *
 * Three things wear digits without measuring anything, and all three showed up
 * the first time this was run against the repo:
 *
 *   ε0, μ0, E_1y     a subscript naming a thing. The ASCII `\w` lookbehind let
 *                    Greek through, so `E=σ/ε0` was reported as substituting 0.
 *   2πr, 12C, ½CV²   a coefficient. A small integer glued to a symbol is algebra.
 *   ∫0^Q, x - 1      a limit or an identity.
 *
 * A unit is letters too — `3.0 kV/m`, `1.20µF` — so "followed by a letter" alone
 * would throw away real measurements. The coefficient rule is therefore narrow: a
 * SMALL WHOLE number, hard against a letter. 1.20µF survives it; 12C does not.
 */
/**
 * An exponent in scientific notation is notation, not a value.
 *
 * `4.427×10^-8 F`, `3.60e8 V`, `1.0998×10^3` — the 8 and the 3 are where the
 * decimal point goes. Read as values they are numbers the card never mentions,
 * and they were a fifth of the first run's findings.
 */
const NOTATION = /(?:[eE]|\s*[×x*]\s*10\s*\^?)\s*[-−+]?\d+/g;

export function numbersIn(text){
  const out = new Set();
  for(const m of String(text ?? '').replace(NOTATION, 'e·').matchAll(NUMBER)){
    const v = Math.abs(parseFloat(m[1]));
    if(v === 0 || v === 1) continue;                       // a limit or an identity
    const glued = /\p{L}/u.test(m[2] ?? '');
    if(glued && Number.isInteger(v) && v <= 12) continue;   // a coefficient
    out.add(v);
  }
  return out;
}

/** Everything the player has read by the time this stop's derivation starts. */
export function readSoFar(mission, stopIndex){
  const parts = [mission?.card, mission?.stake, mission?.objective, mission?.takeaway,
    ...(mission?.primer ?? []),
    ...(mission?.terms ?? []).flatMap(t => [t?.name, t?.def]),
    ...(mission?.equations ?? []).flatMap(e => [e?.e, e?.c, e?.s,
      ...(Array.isArray(e?.v) ? e.v.flat() : [])])];
  const stops = mission?.stops ?? [];
  for(let i = 0; i <= stopIndex && i < stops.length; i++){
    const s = stops[i];
    parts.push(s?.reason, s?.scene, s?.motivation, s?.question, s?.task, s?.play);
    // The stop's OWN board counts as read: a figure, a reading panel or an
    // authored payload is on the card in front of the player.
    parts.push(JSON.stringify(s?.figure ?? ''), JSON.stringify(s?.readings ?? ''));
    if(i < stopIndex) parts.push(s?.answerText, s?.why, s?.answer);
    // The derivation's own framing, for this stop only.
    if(i === stopIndex){
      parts.push(s?.derive?.start, s?.derive?.goal, ...(s?.derive?.givens ?? []));
    }
  }
  return parts.filter(Boolean).join(' \n ');
}

/** The first keyed line that carries a number — the substitution step. */
export function substitutionStep(derive){
  const steps = derive?.steps ?? [];
  for(let i = 0; i < steps.length; i++){
    const st = steps[i];
    const key = (st.candidates ?? [])[+st.answer];
    const nums = numbersIn(key?.text);
    if(nums.size) return { i, text: String(key?.text ?? ''), nums };
  }
  return null;
}

/** One stop's finding, or null. */
export function judgeStop(mission, stopIndex){
  const stop = (mission?.stops ?? [])[stopIndex];
  if(!stop?.derive) return null;
  const sub = substitutionStep(stop.derive);
  if(!sub) return null;
  const known = numbersIn(readSoFar(mission, stopIndex));
  /**
   * A NUMBER WORKED OUT ON THE LINE IS NOT A NUMBER YOU WERE GIVEN.
   *
   * The substitution line often solves as well as substitutes — `deviation=84-70=14 h`,
   * `0 = 1.50 - 0.50t, so t = 3.00 s`, `E(A+B)=10+8=18`. The 14, the 3.00 and the
   * 18 are results of the numbers beside them, and reporting those made two
   * thirds of every derivation in the repo look broken, which is how a gate stops
   * being read. So anything reachable by one +, −, × or ÷ on two other numbers on
   * the same line is dropped before the comparison.
   */
  /**
   * TWO THINGS THIS HAS TO GET RIGHT, and the selftest failed on both first time.
   * An operand may not be used twice — `1.5 + 1.5 = 3` would otherwise excuse the
   * 3 in `(-3.0)+(-1.5)`. And the operands have to come BEFORE the result on the
   * line: in `deviation=84-70=14` all three are mutually reachable (84 = 70+14),
   * so without an ordering every number excuses every other and the whole line
   * goes quiet.
   */
  const seq = [...String(sub.text).replace(NOTATION, 'e·').matchAll(NUMBER)]
    .map(m => Math.abs(parseFloat(m[1])));
  const derived = new Set();
  seq.forEach((n, at) => {
    const before = seq.slice(0, at);
    // `p` and `1 − p` are one quantity written twice, and the 1 is dropped as an
    // identity before any of this — so the complement has to be looked for
    // directly or every proportion in The Trial reads as two ungiven numbers.
    if(before.some(a => Math.abs((1 - a) - n) < 0.0005)) derived.add(n);
    if(before.some(a => Math.abs(Math.sqrt(Math.abs(a)) - n) < 0.0005)) derived.add(n);
    for(let i = 0; i < before.length; i++){
      for(let j = 0; j < before.length; j++){
        if(i === j) continue;
        const a = before[i], b = before[j];
        const near = (x) => Math.abs(x - n) < Math.max(0.005, Math.abs(n) * 0.002);
        // A root and a complement are how these lines are actually written:
        // `SE=sqrt[0.15(0.85)/200]` and the 0.85 that is 1 − 0.15.
        if(near(a + b) || near(Math.abs(a - b)) || near(a * b) || (b !== 0 && near(a / b))
           || near(Math.sqrt(Math.abs(a * b))) || near(Math.sqrt(Math.abs(a / (b || 1))))){
          derived.add(n);
        }
      }
    }
  });
  const all = [...sub.nums];
  const missing = all.filter(n => !known.has(n) && !derived.has(n));
  if(!missing.length) return null;
  /**
   * TWO DIFFERENT FAULTS, and they want different fixes.
   *
   * If the line carrying the ungiven numbers is the LAST step, the derivation ran
   * symbolically to the end and then produced a value out of nowhere — there was
   * never a substitution line to check. `ΔV = +3.60e8 V` after three lines of
   * algebra is not a step a player can verify; it is an answer appearing.
   *
   * If it is an earlier step, the substitution is there and its inputs are not on
   * the card. That is Ground Truth M1 S2 — `E_y=(-3.0)+(-1.5)` with nothing
   * anywhere saying what the two layers read.
   */
  const last = (stop.derive.steps ?? []).length - 1;
  return { title: stop.title ?? stop.question ?? '', step: sub.i + 1,
    kind: sub.i === last ? 'no-substitution' : 'ungiven-inputs',
    line: sub.text, missing };
}

/**
 * WHAT EACH CAMPAIGN ALREADY OWES.
 *
 * 78 of 158 derivations is too many to fix in one pass and far too many to fail
 * a build over — a gate that is red everywhere is a gate nobody reads. So it
 * ratchets: a campaign may not GAIN one. Fix derivations, re-bank with
 * `--write-debt`, and the numbers only fall.
 */
const DEBT_FILE = resolve(here, 'derivegivens-debt.json');
const DEBT = (() => {
  try { return JSON.parse(readFileSync(DEBT_FILE, 'utf8')).themes ?? {}; } catch { return {}; }
})();

// ------------------------------------------------------------------ the run
const args = process.argv.slice(2);

if(args.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };
  const derive = (lines) => ({ steps: lines.map(([a, b]) => ({
    answer: 0, candidates: [{ text: a }, { text: b }] })) });

  // THE PAIR THAT HAS TO SCORE DIFFERENTLY, and nothing else about them differs.
  const given = { stops: [{ scene: 'The upper layer reads -3.0 kV/m and the lower -1.5 kV/m.',
    derive: derive([['E_y=E_1y+E_2y', 'E_y=|E_1|+|E_2|'],
                    ['E_y=(-3.0)+(-1.5) kV/m', 'E_y=3.0-1.5 kV/m'],
                    ['E_y=-4.5 kV/m', 'E_y=+4.5 kV/m']]) }] };
  const notGiven = { stops: [{ scene: 'The model contains an upper layer and a lower layer.',
    derive: given.stops[0].derive }] };
  check('a derivation whose numbers are on the card passes', judgeStop(given, 0) === null);
  const bad = judgeStop(notGiven, 0);
  check('…and the same derivation without them is reported', !!bad,
        'this is the pair the measurement exists to tell apart');
  check('…naming the step that substitutes', bad?.step === 2, `step ${bad?.step}`);
  check('…and both numbers', String(bad?.missing) === '3,1.5', String(bad?.missing));

  // A LINE THAT SUBSTITUTES AND SOLVES AT ONCE. The result on the right of it is
  // arithmetic on the numbers to its left, and must not be reported as an
  // ungiven value — this is what took the first run of this measurement from a
  // finding to a wall.
  const solves = { stops: [{ scene: 'Recovery was 84 h against a mean of 70 h.',
    derive: derive([['deviation=84-70=14 h', 'deviation=84+70']]) }] };
  check('a result computed on the substitution line is not a finding',
        judgeStop(solves, 0) === null, JSON.stringify(judgeStop(solves, 0)?.missing));
  const solvesUnknown = { stops: [{ scene: 'The team compared two hospitals.',
    derive: derive([['deviation=84-70=14 h', 'x']]) }] };
  check('…but the numbers it was computed FROM still are',
        String(judgeStop(solvesUnknown, 0)?.missing) === '84,70',
        String(judgeStop(solvesUnknown, 0)?.missing));

  // The result of the derivation is NOT a finding: working it out is the point.
  const resultOnly = { stops: [{ scene: 'Layers read -3.0 and -1.5 kV/m.',
    derive: derive([['E_y=(-3.0)+(-1.5) kV/m', 'x'], ['E_y=-4.5 kV/m', 'y']]) }] };
  check('the answer is allowed to be a new number', judgeStop(resultOnly, 0) === null,
        'every line after the substitution is a result and must be');

  // Subscripts are not values.
  check('E_1y and E_2y introduce no numbers', numbersIn('E_y=E_1y+E_2y').size === 0);
  check('nor does an exponent', numbersIn('x^2 + y^2').size === 0);
  check('but a measurement does', [...numbersIn('4.2 kV/m')][0] === 4.2);
  check('a Greek subscript is not a value', numbersIn('E=σ/ε0').size === 0,
        [...numbersIn('E=σ/ε0')].join(','));
  check('nor is a coefficient', numbersIn('B=μ0I/(2πr)').size === 0,
        [...numbersIn('B=μ0I/(2πr)')].join(','));
  check('…but a measurement with a unit glued on survives',
        [...numbersIn('C=1.20µF')][0] === 1.2, [...numbersIn('C=1.20µF')].join(','));
  check('an integration limit is not a value', numbersIn('U=∫0^Q(q/C)dq').size === 0,
        [...numbersIn('U=∫0^Q(q/C)dq')].join(','));

  // An earlier stop's answer counts as read.
  const earlier = { stops: [
    { question: 'Normalise the channels.', answerText: 'They read -3.0 and -1.5 kV/m.' },
    { derive: derive([['E_y=(-3.0)+(-1.5) kV/m', 'x'], ['E_y=-4.5 kV/m', 'y']]) }] };
  check('a number the previous stop produced is known', judgeStop(earlier, 1) === null);

  console.log(fails.length
    ? `\nderiveGivens --selftest: ${fails.length} case(s) failed.\n  ${fails.join('\n  ')}`
    : `\nderiveGivens --selftest: ${ran} cases, a substituted number is told apart from a derived one.`);
  process.exit(fails.length ? 1 : 0);
}

const wanted = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!wanted.length){
  console.error('usage: node engine/dev/deriveGivens.mjs <theme> | --all | --selftest');
  process.exit(2);
}

let stops = 0, bad = 0, themes = 0;
const banked = {};
for(const name of wanted){
  const book = resolve(gamekit, `books/${name}.yml`);
  if(!existsSync(book)) continue;
  let doc; try { doc = parseYaml(readFileSync(book, 'utf8')); } catch { continue; }
  const found = [];
  let here = 0;
  (doc.missions ?? []).forEach((m, mi) => {
    (m.stops ?? []).forEach((s, si) => {
      if(!s?.derive) return;
      here++;
      const f = judgeStop(m, si);
      if(f) found.push({ kind: f.kind,
        text: `M${mi + 1} stop ${si + 1} "${String(f.title).slice(0, 30)}" step ${f.step}`
          + ` ${f.kind === 'no-substitution' ? 'reaches' : 'substitutes'} ${f.missing.join(', ')}`
          + ` — ${f.line.slice(0, 44)}` });
    });
  });
  if(!here) continue;
  themes++; stops += here;
  const inputs = found.filter(f => f.kind === 'ungiven-inputs').length;
  const noSub = found.length - inputs;
  banked[name] = found.length;
  const owed = DEBT[name] ?? 0;
  const over = found.length > owed;
  if(over) bad++;
  console.log(!found.length
    ? `✓ ${name.padEnd(22)} ${here} derivation(s), every substituted number is on the card`
    : `${over ? '✗' : '·'} ${name.padEnd(22)} ${found.length} of ${here} derivation(s) — ${inputs} substitute`
      + ` an ungiven number, ${noSub} never substitute at all`
      + (over ? `  (recorded ${owed} — this campaign has gained ${found.length - owed})` : ''));
  // Only the ones over the line are listed; the banked ones are already written
  // down and printing all 78 every run is how a gate stops being read.
  if(over || args.includes('--all-findings')) for(const f of found) console.log(`    ${f.text}`);
}
if(args.includes('--write-debt')){
  const doc = { _comment: 'How many derivations in each campaign substitute a number the'
    + ' player was never given, or reach one without substituting at all.'
    + ' engine/dev/deriveGivens.mjs FAILS a campaign that gains one. Fix derivations'
    + ' — give them a `givens`, or have the previous stop produce the value — and'
    + ' re-bank with --write-debt. The numbers only fall.',
    themes: Object.fromEntries(Object.entries(banked).sort(([a], [b]) => a.localeCompare(b))) };
  writeFileSync(DEBT_FILE, JSON.stringify(doc, null, 2) + '\n');
  console.log(`\nbanked ${Object.keys(banked).length} campaign(s) into ${DEBT_FILE}`);
  process.exit(0);
}
const total = Object.values(banked).reduce((n, v) => n + v, 0);
console.log(bad
  ? `\n✗ deriveGivens: ${bad} campaign(s) gained a derivation whose numbers the player was never given.`
  : `\n✓ deriveGivens: ${stops} derivation(s) across ${themes} campaign(s); ${total} owed and none gained.`);
process.exit(bad ? 1 : 0);
