// conceptOrder.mjs — no concept is claimed before the concepts it is built out of.
//
//   node engine/dev/conceptOrder.mjs <theme> [--verbose]
//   node engine/dev/conceptOrder.mjs --all
//   node engine/dev/conceptOrder.mjs --selftest
//
// `equationOrder` asks this question about the eleven equations a course lists.
// This asks it about the thirty-two concepts the CARD names, which is the thing a
// player actually meets: Blackout's day 1 asked what a falling frequency trend is
// evidence of and the card said *inertia, governor response and droop control*,
// whose base — frequency as the balance of supply and demand — was claimed by no
// stop until day 12, and whose base in turn was claimed by no stop at all. Twelve
// of its 28 inversions rested on material the campaign itself teaches later, and
// every check in the repo passed: equationOrder is authored on equations, and the
// dependency it needed did not exist on concepts.
//
// THE RULE. For every stop that claims concept c on day d, each of c's `needs` is
// either claimed by some stop on a day EARLIER than d, or named in that stop's own
// `takesAsRead`.
//
// Earlier, and not the same day, because `openStopIndices()` opens a day's stops in
// any order. A prerequisite standing beside its dependent is one that half the
// players meet second, and a rule that accepted it would call a coin toss an order.
//
// THE HATCH is what makes the rule satisfiable, and it is not a loophole. Day 1 can
// otherwise only ever claim a concept with no prerequisites, and a course that
// follows AP Physics 1 is entitled to open on frequency without first teaching what
// a volt is. What it is not entitled to do is assume it silently — so `takesAsRead`
// names the concept, `import-book` refuses a name that is not a prerequisite of what
// the stop claims, and the declaration is printed to the player as an `assumes` line.
// Both halves are counted here: the failures, and the exceptions, because a campaign
// with sixty exceptions has not passed anything.
//
// TWO REPORTS, neither of them a gate. The rank correlation between the day a
// concept is taught and where it sits on the syllabus, and the count of declarations.
// The correlation is deliberately not gated: Blackout's story is a chronology — the
// trip causes the aftermath, the island precedes the black start — and searching
// every mission permutation that respects it, the best correlation available is 0.48
// against 0.26 today, while the prerequisite failures clear completely without moving
// a single mission. A gate on the correlation would have sent the work at the story.
//
// DEBT, not an advisory flag. `engine/dev/concept-debt.json` records the inversions
// that exist, with the same two properties as `curriculum-debt.json`: a row not on
// the list fails immediately, and a row on the list that has since been fixed ALSO
// fails, naming the line to delete. It only shrinks.
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { SYLLABUS } from '../../tools/syllabus.js';
import { pagesFor } from './curriculumDelivery.mjs';

const DEBT_FILE = 'engine/dev/concept-debt.json';

/**
 * One row per (claim, prerequisite) pair that arrives out of order, and one entry
 * per declaration that excused a pair.
 *
 * Pure, and taking its concepts and its stops as arguments, so the selftest can put
 * a two-stop campaign through the same code the games go through. A checker with a
 * second implementation for its fixtures is a checker that can pass while the real
 * path is broken.
 */
export function orderRows(concepts, stops) {
  const byTitle = new Map(concepts.map((c, i) => [c.c, i + 1]));
  const firstDay = new Map();          // concept number -> earliest day it is claimed
  for (const s of stops) {
    const n = s.concept?.n;
    if (!n) continue;
    if (!firstDay.has(n) || s.day < firstDay.get(n)) firstDay.set(n, s.day);
  }
  const rows = [], excused = [];
  for (const s of stops) {
    const n = s.concept?.n;
    if (!n) continue;
    const mine = concepts[n - 1];
    const declared = new Set((s.takesAsRead ?? []).map(x => x.c));
    for (const need of mine?.needs ?? []) {
      const p = byTitle.get(need);
      if (!p) continue;                                     // a `needs` naming nothing: syllabus's own problem
      const pd = firstDay.get(p);
      if (pd !== undefined && pd < s.day) continue;         // met, on an earlier day
      if (declared.has(need)) { excused.push({ stop: s.n, day: s.day, c: n, p, cname: mine.c, pname: need }); continue; }
      rows.push({
        stop: s.n, day: s.day, title: s.title ?? '', c: n, cname: mine.c, p, pname: need,
        // `pday` is the day the prerequisite IS claimed, or null when nothing claims it.
        // It was absent for a while and three analysis scripts read it anyway: a field
        // that does not exist reads as `undefined`, so every row classified as "claimed
        // nowhere" and the split between "teach it earlier" and "write a question" came
        // out 100% wrong in the confident direction. The gate's own output was right the
        // whole time — only `why` carried the fact, as prose.
        pday: pd === undefined ? null : pd,
        why: pd === undefined ? 'claimed by no stop' : (pd === s.day ? 'the same day' : `not until day ${pd}`),
      });
    }
  }
  return { rows, excused };
}

/** `<claim title> ← <prerequisite title>`: what a debt line looks like. */
export const debtKey = (r) => `${r.cname} ← ${r.pname}`;

function spearman(a, b) {
  const n = a.length;
  if (n < 3) return null;
  const rank = (v) => {
    const s = v.map((x, i) => [x, i]).sort((p, q) => p[0] - q[0]);
    const r = Array(n);
    let i = 0;
    while (i < n) {
      let j = i;
      while (j + 1 < n && s[j + 1][0] === s[i][0]) j++;
      const avg = (i + j) / 2 + 1;
      for (let k = i; k <= j; k++) r[s[k][1]] = avg;
      i = j + 1;
    }
    return r;
  };
  const ra = rank(a), rb = rank(b);
  const mean = (x) => x.reduce((t, v) => t + v, 0) / n;
  const ma = mean(ra), mb = mean(rb);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - mb); da += (ra[i] - ma) ** 2; db += (rb[i] - mb) ** 2; }
  return da && db ? num / Math.sqrt(da * db) : null;
}

/** A theme's stops, in campaign order, with what each card claims and declares. */
const gradeOf = new Map();
async function stopsOf(themeName) {
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  gradeOf.set(themeName, Number(theme?.audience?.grade ?? 0) || null);
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return pagesFor(content).map((p, i) => {
    const l = content.CURRICULUM[p.group][p.lesson];
    return {
      n: i + 1, day: p.day, group: p.group, title: l.title ?? '',
      concept: l.concept ?? null, takesAsRead: l.takesAsRead ?? [],
    };
  });
}

// ------------------------------------------------------------------- selftest
//
// Four cases, and each of them is a bug this file could have. Two would otherwise
// pass silently in the direction that reports all-clear, which is the direction that
// matters: a gate that cannot fail is worse than no gate, because it is believed.
function selftest() {
  const concepts = [
    { c: 'What a volt is' },
    { c: 'Ohm', needs: ['What a volt is'] },
  ];
  const stop = (n, day, cn, takesAsRead = []) => ({
    n, day, title: `stop ${n}`,
    concept: { n: cn, c: concepts[cn - 1].c },
    takesAsRead: takesAsRead.map(c => ({ c })),
  });
  const cases = [
    ['a prerequisite claimed a day earlier passes',
      [stop(1, 1, 1), stop(2, 2, 2)], 0, 0],
    ['a prerequisite claimed the SAME day fails — the engine opens a day in any order',
      [stop(1, 3, 1), stop(2, 3, 2)], 1, 0],
    ['a prerequisite declared in takesAsRead passes, and the exception is counted',
      [stop(2, 1, 2, ['What a volt is'])], 0, 1],
    ['a prerequisite claimed by nothing, and not declared, fails',
      [stop(2, 1, 2)], 1, 0],
  ];
  let bad = 0;
  for (const [name, stops, wantRows, wantExcused] of cases) {
    const { rows, excused } = orderRows(concepts, stops);
    const ok = rows.length === wantRows && excused.length === wantExcused;
    console.log(`  ${ok ? '✓' : '✗'} selftest: ${name}`);
    if (!ok) {
      console.log(`      wanted ${wantRows} failure(s) and ${wantExcused} exception(s);`
        + ` got ${rows.length} and ${excused.length}`);
      bad++;
    }
  }
  // And the case that keeps the debt file honest, which is the half that rots: a
  // recorded row that has been fixed has to fail, or the file becomes a licence.
  const fixed = orderRows(concepts, [stop(1, 1, 1), stop(2, 2, 2)]);
  const stale = ['Ohm ← What a volt is'];
  const paid = stale.filter(k => !fixed.rows.some(r => debtKey(r) === k));
  const ok = paid.length === 1;
  console.log(`  ${ok ? '✓' : '✗'} selftest: a recorded inversion that has since been fixed is reported, not forgiven`);
  if (!ok) bad++;
  console.log(bad ? `\n✗ ${bad} selftest case(s) failed.` : '\n✓ all selftest cases pass.');
  return bad ? 1 : 0;
}

// ----------------------------------------------------------------------- main
//
// Guarded the way `curriculumDelivery` guards its own: `orderRows` is exported so
// that anything else measuring this rule uses the same implementation rather than a
// second one, and importing it must not sweep 28 themes as a side effect.
const RAN_DIRECTLY = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;
const args = RAN_DIRECTLY ? process.argv.slice(2) : ['--imported'];
if(!RAN_DIRECTLY){
  // nothing to do: the file is a library in this case
} else {
if (args.includes('--selftest')) process.exit(selftest());

const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : {};

// --sweep: one line per theme, so progress across twenty-seven unsequenced courses is
// visible. `t` on a concept is the price of admission — a concept without one stamps
// nothing and is invisible to this file — so the readiness column is the rollout's
// progress bar and the row order is the work list.
if(args.includes('--sweep')){
  const out = [];
  for(const name of themeNames()){
    const cs = (SYLLABUS[name] ?? SYLLABUS[String(name).replace(/_/g, '-')])?.concepts ?? [];
    if(!cs.length) continue;
    let stops = [];
    try { stops = await stopsOf(name); } catch { continue; }
    if(!stops.length) continue;
    const withT = cs.filter(c => c.t).length;
    const graphed = cs.filter(c => c.needs?.length).length;
    const claimed = stops.filter(s => s.concept?.n).length;
    const { rows, excused } = graphed ? orderRows(cs, stops) : { rows: [], excused: [] };
    const known = new Set(debt[name] ?? []);
    out.push({ name, cs: cs.length, withT, graphed, claimed, stops: stops.length,
      rows: rows.filter(r => !known.has(debtKey(r))).length, debt: known.size, excused: excused.length });
  }
  // Unsequenced first: those are the ones the pass has not reached.
  out.sort((a, b) => (a.graphed ? 1 : 0) - (b.graphed ? 1 : 0) || b.cs - a.cs);
  console.log('theme                concepts   t  needs   claims  out-of-order  debt  declared');
  for(const r of out){
    console.log(`${r.name.padEnd(20)} ${String(r.cs).padStart(8)} ${String(r.withT).padStart(3)}`
      + ` ${String(r.graphed).padStart(6)}   ${`${r.claimed}/${r.stops}`.padStart(6)}`
      + ` ${(r.graphed ? String(r.rows) : '—').padStart(13)} ${String(r.debt).padStart(5)}`
      + ` ${(r.graphed ? String(r.excused) : '—').padStart(9)}`);
  }
  const tot = out.reduce((a, r) => ({ c: a.c + r.cs, t: a.t + r.withT, g: a.g + r.graphed }), { c: 0, t: 0, g: 0 });
  const ready = out.filter(r => r.graphed).length;
  console.log(`\n${out.length} themes · ${tot.c} concepts · ${tot.t} with a takeaway written`
    + ` · ${tot.g} with a dependency · ${ready} theme(s) sequenced, ${out.length - ready} to go`);
  console.log('SEQUENCING_PASS.md is the order to take them in.');
  process.exit(0);
}

const verbose = args.includes('--verbose');
const wanted = args.includes('--all') || !args.find(a => !a.startsWith('--'))
  ? themeNames() : [args.find(a => !a.startsWith('--'))];
let failures = 0;

for (const themeName of wanted) {
  const concepts = (SYLLABUS[themeName] ?? SYLLABUS[String(themeName).replace(/_/g, '-')])?.concepts ?? [];
  // Silent for a course whose concepts carry no dependency: this asks about an
  // authored claim about the subject, and inventing one from the syllabus's own
  // order would assert that a transformer is teachable before induction.
  if (!concepts.some(c => c.needs?.length)) continue;

  let stops;
  try { stops = await stopsOf(themeName); } catch (err) {
    console.log(`${themeName}: cannot load theme — ${err.message}`);
    failures++;
    continue;
  }
  const { rows, excused } = orderRows(concepts, stops);
  const allowed = new Set(debt[themeName] ?? []);
  const fresh = rows.filter(r => !allowed.has(debtKey(r)));
  const known = rows.filter(r => allowed.has(debtKey(r)));
  const claimed = stops.filter(s => s.concept?.n);
  const rho = spearman(claimed.map(s => s.day), claimed.map(s => s.concept.n));

  console.log(`\n=== ${themeName} — ${claimed.length} of ${stops.length} stops name a concept,`
    + ` ${concepts.length} on the syllabus`);
  console.log(`  prerequisites met on an earlier day, or declared: ${rows.length ? 'no' : 'yes'}`
    + `  · ${excused.length} declared as prior knowledge`
    + (rho === null ? '' : `  · day ↔ syllabus position ρ = ${rho.toFixed(2)} (reported, never gated)`));
  // A DECLARATION MEANS SOMETHING DIFFERENT AT GRADE 6.
  //
  // "Taken as read" is a fair claim for a course that follows another course: AP
  // Physics 2 may open on frequency without first teaching what a volt is, and
  // Blackout declares thirty-five such prerequisites. A junior edition has no course
  // in front of it. Its whole premise is that an eleven-year-old is met where they
  // are, so a prerequisite it declares is one it has quietly decided not to teach —
  // which is the middle-school failure this repo has already paid for twice, arriving
  // through a third door. Reported, not failed: the call is the author's, and the
  // number is the thing they need to see. The rows belong in the debt file instead,
  // where they read as work rather than as a decision.
  const grade = gradeOf.get(themeName);
  if (grade && grade <= 8 && excused.length) {
    console.log(`  · ${excused.length} declaration(s) on a grade-${grade} edition —`
      + ' a junior game has no earlier course to take anything as read from.'
      + ' Prefer teaching it, or record the row as debt.');
  }
  if (verbose && excused.length) {
    for (const e of excused) console.log(`  · stop ${e.stop} (d${e.day}) takes "${e.pname}" as read`);
  }
  for (const r of known) console.log(`  · known inversion: ${debtKey(r)} — stop ${r.stop}, day ${r.day}`);
  for (const r of fresh) {
    console.log(`  ✗ stop ${r.stop} (day ${r.day}) claims "${r.cname}", which is built out of`
      + ` "${r.pname}" — ${r.why}`);
    console.log(`      either claim it earlier, or declare it: \`takesAsRead: ${r.pname}\``);
  }
  // A debt entry that has been paid stays in the file for ever unless something says
  // so. This is that something.
  for (const key of allowed) {
    if (!rows.some(r => debtKey(r) === key)) {
      console.log(`  ✗ ${DEBT_FILE} lists "${key}" for ${themeName}, which is in order now`
        + ' — delete the line');
      failures++;
    }
  }
  if (fresh.length) failures += fresh.length;
  else if (!rows.length) console.log(`  ✓ every claim's prerequisites arrive before it, or are declared`);
}

if (failures) {
  console.log(`\n✗ ${failures} concept-ordering problem(s).`);
  process.exit(1);
}
console.log(`\n✓ ${wanted.length} theme(s): no concept is claimed before what it is built out of.`);
}
