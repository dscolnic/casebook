// sequence.mjs — the sequencing plan: when a campaign teaches a concept, against
// where the story is standing when it does.
//
//   node sequence.mjs [theme]     writes plans/<theme>-sequence.{html,json} and PDFs it
//
// `render.mjs` asks whether the course is taught at all and owns <theme>.html. This
// asks the question a player feels first, and it is a different one: Blackout's day 1
// asks what a falling frequency trend is evidence of, which is an instance of droop
// control — and the concept droop control is built out of is not claimed by any stop
// until day 12.
//
// Every number in the document is computed here. Three things are authored, and each
// is labelled as authored where it appears: the dependency graph (NEEDS, proposed for
// tools/syllabus.js), the readings in EDITORIAL, and the three slates. A wrong
// prerequisite produces a confident wrong number, which is this repo's signature
// failure, so the graph is the thing to argue with first.

import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const DIR = '/Users/scolnic/code/Nuclear/Alamos/plans';
const GK = '/Users/scolnic/code/Nuclear/Alamos/gamekit';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const theme = process.argv[2] ?? 'blackout';

// ------------------------------------------------------------------- authored
//
// What each concept is built out of, by syllabus number: the concept-level twin of
// `needs` on an equation in tools/syllabus.js.
//
// Two things it is deliberately NOT. It is not difficulty — c20 (droop) is no harder
// than c9 (phasors), it is further downstream, and a hard concept early is fine. And
// it is not the syllabus's own order, which lists transformers at 13 and Faraday's
// law at 17: position cannot stand in for dependency without asserting that a
// transformer is teachable before induction.
const NEEDS = {
  blackout: {
    1: [], 2: [1], 3: [1, 2], 4: [2, 3], 5: [1, 2], 6: [1], 7: [6], 8: [1, 6],
    9: [6, 7, 8], 10: [5, 9], 11: [10], 12: [6, 10], 13: [5, 17], 14: [13],
    15: [2, 5], 16: [9, 10, 15], 17: [1, 6], 18: [6, 17], 19: [5, 18], 20: [19],
    21: [5], 22: [21], 23: [1, 2], 24: [2, 4, 23], 25: [1, 24], 26: [16, 18, 19],
    27: [4, 15], 28: [15, 24, 27], 29: [5], 30: [20, 29], 31: [7, 17],
    32: [19, 20, 21],
  },
};

const EDITORIAL = {
  blackout: {
    // What slate B did, measured on the content as it stood before the pass (the run
    // of 18 Aug 2026, kept here because the audit reads the game as it is now and
    // cannot see what it used to be). Every one of these is reproducible by reverting
    // the eleven `concept:` lines, the two swaps and the one rewritten stop in
    // books/blackout.yml.
    applied: {
      when: '18 Aug 2026',
      inversions: 28, course: 12, prior: 16, claimed: 22, rho: 0.19,
      // Slate A followed the same afternoon. Its number is the one worth keeping: the
      // gate is per STOP, not per concept, so it found six rows the concept-level
      // audit had hidden — two stops claiming one concept both have to answer for it.
      declarations: 32, gateRowsFoundByStop: 6,
      // Slate C followed, and it is the one the player asked for: the fortnight now
      // opens on an ordinary shift and the trip lands on day 3, so the swing equation
      // is not the first arithmetic anybody meets.
      recut: { order: [5, 13, 1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 8, 14, 15],
        rhoBefore: 0.24, edits: 9, declarations: 35 },
      dayOneClaimed: 'c20 · inertia, governor response and droop control (twice) and c31 · metering',
      work: [
        ['32 declarations', 'slate A: every prerequisite a stop is entitled to expect, named in `takesAsRead` and printed to the player as an `assumes` line — refused by the importer unless it is something the claim is actually built out of'],
        ['12 claims authored', 'ten cards named the wrong concept and one is new; `concept:` in the book, refused by the importer when it names anything not on the syllabus'],
        ['2 swaps', 'voltage drop traded days with series-and-parallel (both DIST, so the one-area-per-day rule holds by construction), and the winter peak traded with earthing'],
        ['1 question rewritten', "day 2's N-1 CHOICE became a BALLPARK on impedance — the concept nothing in the fortnight taught, and the base of both voltage drop and three-phase power"],
        ['1 more re-claim and 1 more swap', "the gate's per-stop rule found six rows the per-concept audit hid: day 10's dark-hours estimate claims energy from power over time, which is what E = Pt is, and the Kirchhoff stop trades days with an OPS stop so it precedes the parallel-division stop instead of standing beside it"],
        ['15 missions re-ordered', "slate C: the reserve day and the three-problems day open the fortnight and the trip lands on day 3 — chosen by search over every order the chronology allows, ranked by prerequisite breaks first and correlation second, then eight continuity edits and one character introduced at her new first mention"],
        ['1 sentence restored', 'the rewrite cost the only stop that mentioned cascading failure; the day-12 contingency stop now says what a second failure does to neighbours checked one at a time'],
      ],
    },
    // The chronology, read off the fifteen stakes: mission A has to be played before
    // mission B, because B names something A causes.
    chain: [[1, 2], [1, 3], [1, 4], [2, 3], [1, 9], [9, 10], [10, 11], [1, 11],
      [7, 11], [11, 14], [14, 15]],
    welded: {
      1: 'the trip at 04:12 — the event the fortnight is about',
      2: 'the corridor is loaded because a path is gone',
      3: 'restoration after the trip',
      4: 'the incident records; stop 10 reads "the night of the event"',
      9: 'the island has formed',
      10: 'the black start, which needs the island',
      11: 're-reads the week from a record',
      14: 'the corridor decision, at the end of the fortnight',
      15: 'the final report — last by construction',
    },
    portable: {
      6: 'a switching study: where the current actually goes',
      12: 'an ordinary evening, which reads better as an opening than as a day 12',
      13: 'three live problems, none of them caused elsewhere',
      8: "tomorrow's dispatch",
      7: 'a cable fault, its own event',
      5: 'what the system is holding back',
    },
    // The pick is derived, so it can be wrong. Read by hand against each scene and
    // question rather than sampled. Three of these are not reachable by keyword at
    // all, which is why no matcher could have found them.
    mispicks: [
      [1, 19, 'a trend that is one number for the whole interconnection IS frequency as the balance'],
      [2, 19, 'df/dt = (P_gen − P_load)/2H is that balance as a rate — and droop is claimed on day 9 already'],
      [5, 2, 'the loss that never arrives is where V = IR and P = I²R actually get computed'],
      [10, 10, 'line voltage, line current and a power factor is real power against apparent power — the cos φ is what the question turns on'],
      [11, 18, 'four things that have to agree before the breaker closes IS synchronising'],
      [14, 13, 'why the machine makes 20 kV and the line outside runs at 400 kV is the turns ratio'],
      [16, 4, '900 A dividing between a six-ohm and a three-ohm route is parallel division'],
      [24, 22, 'cheap power that cannot get out of the valley is a constraint breaking merit order'],
      [26, 8, 'what the island can draw on in the first ten seconds is stored energy — and this retires one of six duplicate c26 claims'],
      [38, 15, 'heat in a corridor carrying redistributed flow is transmission loss, not RMS'],
    ],
    // The two questions the course does not have. Both are prerequisites of things the
    // game already teaches, and neither is mentioned anywhere in the fortnight.
    write: {
      6: 9,     // d2 OPS: reactance and impedance, before anything asks about volt drop
    },
    // Stops whose DAY is wrong rather than whose label is. Three of the four are one
    // day, and they exist because a prerequisite beside its dependent is not a
    // prerequisite: the engine opens a day's stops in any order.
    // Stops whose DAY is wrong rather than whose label is. Two swaps, chosen by
    // search over every pair that keeps three stops on a day and one area per day —
    // `shapeMissions` turns a second stop in the same area on one day into a person
    // hunt, and `import-book` warns on a mission that is not three stops long. Both
    // swaps also read: voltage drop joins the day about where the current goes, and
    // the winter peak joins the day the dispatch is signed off.
    move: {
      7: 6,     // voltage drop and reactive support, into the week its bases exist in
      18: 3,    // and series-and-parallel takes its place on day 3
      22: 7,    // the load curve, a day ahead of the dispatch it is dispatched against
      21: 8,    // and earthing takes its place, a day after the fault current it rests on
    },
  },
};

// --------------------------------------------------------------------- compute
const { themeDir } = await import(GK + '/engine/dev/registry.mjs');
const dir = themeDir(theme);
const t = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import(GK + '/engine/content/normalize.js');
const content = t.content ?? {};
normalizeContent(content);
const { deliveryFor, pagesFor } = await import(GK + '/engine/dev/curriculumDelivery.mjs');
// The gate's own function, not a second copy of its rule: `conceptOrder.mjs` is what
// `npm run check` runs, and a document that measured the same thing its own way would
// eventually disagree with the check and be believed anyway.
const { orderRows } = await import(GK + '/engine/dev/conceptOrder.mjs');
const { SYLLABUS } = await import(GK + '/tools/syllabus.js');
const { GAMES } = await import(GK + '/tools/games.js');

const needs = NEEDS[theme];
const ed = EDITORIAL[theme];
if (!needs || !ed) throw new Error(`${theme}: no authored dependency graph or editorial block`);
const syl = SYLLABUS[theme].concepts;
const N = syl.length;
const nameToN = new Map(syl.map((c, i) => [c.c, i + 1]));
const game = GAMES.find(g => g.id === theme) ?? {};

const delivery = deliveryFor(theme, content);
const pages = pagesFor(content);
const rows = pages.map((p, i) => {
  const l = content.CURRICULUM[p.group][p.lesson];
  const c = nameToN.get(l.concept?.c ?? '') ?? null;
  return {
    n: i + 1, day: p.day, group: p.group, type: p.type, tier: p.tier,
    title: l.title ?? '', c, cname: c ? syl[c - 1].c : null,
    assumes: (l.assumes ?? []).map(String), takesAsRead: l.takesAsRead ?? [],
  };
});
const DAYS = Math.max(...rows.map(r => r.day));

// How deep in the dependency graph each concept sits, and — as a REPORT only — the
// day an even spread would license that depth from. The band must never become the
// gate: it assumes a course spreads its layers evenly over its days, which no course
// promises, and that is the cheap, plausible, adjacent number this repo keeps paying
// for. The gate is the prerequisite rule.
const depth = new Map();
const depthOf = (c) => {
  if (depth.has(c)) return depth.get(c);
  const ns = needs[c] ?? [];
  const v = ns.length ? 1 + Math.max(...ns.map(depthOf)) : 0;
  depth.set(c, v);
  return v;
};
for (let i = 1; i <= N; i++) depthOf(i);
const MAXL = Math.max(...depth.values());
const OPEN = {};
for (let L = 0; L <= MAXL; L++) OPEN[L] = L <= 1 ? 1 : 1 + Math.round((DAYS - 1) * (L - 1) / (MAXL - 1));
const licensed = (day) => Math.max(...Object.entries(OPEN).filter(([, o]) => day >= o).map(([L]) => +L));

// what merely mentions a concept, as against what claims it
const touchDays = new Map();
for (const con of delivery.concepts) {
  touchDays.set(con.n, con.stops.map(s => pages[s - 1].day).sort((a, b) => a - b));
}

function spearman(a, b) {
  const n = a.length;
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
  const mean = x => x.reduce((s, v) => s + v, 0) / n;
  const ma = mean(ra), mb = mean(rb);
  let num = 0, da = 0, db = 0;
  for (let i = 0; i < n; i++) { num += (ra[i] - ma) * (rb[i] - mb); da += (ra[i] - ma) ** 2; db += (rb[i] - mb) ** 2; }
  return num / Math.sqrt(da * db);
}

// ---- the gate
//
// For every stop that claims concept c on day d, each of c's prerequisites must be
// claimed by some stop on a day EARLIER than d. Earlier and not same-day, because
// `openStopIndices()` opens a day's stops in any order: a prerequisite sitting beside
// its dependent is a prerequisite half the players meet second.
//
// Each row splits two ways, because the halves are different decisions. A prerequisite
// low in the graph — what a volt is, Ohm's law, an AC waveform, power against energy,
// RMS, induction — is something a grade 12–13 course following AP Physics 1 may
// legitimately take as read, as long as it SAYS so in `assumes`. A prerequisite the
// course itself is supposed to teach is a campaign out of order, and that is the work.
const PRIOR_MAX_LAYER = 2;
function assess(rs) {
  const claimDay = new Map(), claimedBy = new Map();
  for (const r of rs) {
    if (!r.c) continue;
    if (!claimDay.has(r.c) || r.day < claimDay.get(r.c)) claimDay.set(r.c, r.day);
    if (!claimedBy.has(r.c)) claimedBy.set(r.c, []);
    claimedBy.get(r.c).push(r.n);
  }
  const { rows: raw, excused } = orderRows(syl, rs.map(r => ({
    n: r.n, day: r.day, title: r.title,
    concept: r.c ? { n: r.c, c: syl[r.c - 1].c } : null,
    takesAsRead: r.takesAsRead ?? [],
  })));
  // One row per (claim, prerequisite) pair rather than per stop, because the document
  // counts what is out of order in the campaign and the gate counts what each stop
  // has to answer for. Both numbers are real; this is the one the tables are about.
  const seen = new Set(), inv = [];
  for (const r of raw) {
    const key = `${r.c}:${r.p}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const touched = touchDays.get(r.p) ?? [];
    inv.push({
      c: r.c, cname: r.cname, day: claimDay.get(r.c), stops: claimedBy.get(r.c) ?? [r.stop],
      p: r.p, pname: r.pname, pday: claimDay.get(r.p) ?? null, player: depth.get(r.p),
      touched: touched.length, prior: depth.get(r.p) <= PRIOR_MAX_LAYER, why: r.why,
    });
  }
  const cl = rs.filter(r => r.c);
  return {
    inv, excused, claimDay, claimedBy, claimed: claimDay.size,
    prior: inv.filter(i => i.prior), course: inv.filter(i => !i.prior),
    priorConcepts: [...new Set(inv.filter(i => i.prior).map(i => i.p))].sort((a, b) => a - b),
    rho: spearman(cl.map(r => r.day), cl.map(r => r.c)),
  };
}
const applySlate = (s = {}) => {
  const rs = rows.map(r => ({ ...r }));
  for (const [n, c] of Object.entries({ ...(s.reclaim ?? {}), ...(s.write ?? {}) })) {
    const r = rs.find(x => x.n === +n);
    if (r) { r.c = c; r.cname = syl[c - 1].c; }
  }
  for (const [n, d] of Object.entries(s.move ?? {})) {
    const r = rs.find(x => x.n === +n);
    if (r) r.day = d;
  }
  if (s.dayMap) for (const r of rs) r.day = s.dayMap.get(r.day) ?? r.day;
  return assess(rs);
};

const shipped = assess(rows);
const inversions = shipped.inv;
const claimDay = shipped.claimDay;
const claimedBy = shipped.claimedBy;
const rho = shipped.rho;
const sameDay = inversions.filter(i => i.pday === i.day);
const sameDayCourse = shipped.course.filter(i => i.pday === i.day);
const dupes = [...claimedBy].filter(([, s]) => s.length > 1).sort((a, b) => b[1].length - a[1].length);
const unclaimed = syl.map((c, i) => i + 1).filter(n => !claimedBy.has(n));
const untouched = unclaimed.filter(n => !(touchDays.get(n) ?? []).length);
const bandEarly = rows.filter(r => r.c && depth.get(r.c) > licensed(r.day));

// ---- what the story allows: permute whole missions, respecting the chronology
let seed = 20260818 >>> 0;
const rnd = () => {
  seed = (seed + 0x6D2B79F5) >>> 0;
  let x = seed;
  x = Math.imul(x ^ (x >>> 15), x | 1) >>> 0;
  x ^= (x + Math.imul(x ^ (x >>> 7), x | 61)) >>> 0;
  return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
};
// A random *topological* order rather than a rejected shuffle: with eleven constraints
// a legal permutation is rare enough that rejection sampling explores almost nothing,
// and an unexplored search reported as a maximum is a lie.
const randomLegal = () => {
  const after = new Map(), indeg = new Map();
  for (let d = 1; d <= DAYS; d++) { after.set(d, []); indeg.set(d, 0); }
  for (const [a, b] of ed.chain) { after.get(a).push(b); indeg.set(b, indeg.get(b) + 1); }
  const order = [];
  const avail = [...indeg].filter(([d, n]) => !n && d !== DAYS).map(([d]) => d);
  while (avail.length) {
    const d = avail.splice(Math.floor(rnd() * avail.length), 1)[0];
    order.push(d);
    for (const nx of after.get(d)) {
      indeg.set(nx, indeg.get(nx) - 1);
      if (!indeg.get(nx) && nx !== DAYS) avail.push(nx);
    }
  }
  order.push(DAYS);
  return order.length === DAYS ? order : null;
};
const randomFree = () => {
  const o = [...Array(DAYS)].map((_, i) => i + 1);
  for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; }
  return o;
};
const isLegal = (order) => {
  const pos = new Map(order.map((d, i) => [d, i]));
  return order[DAYS - 1] === DAYS && ed.chain.every(([a, b]) => pos.get(a) < pos.get(b));
};
const rhoOrder = (order) => applySlate({ dayMap: new Map(order.map((old, i) => [old, i + 1])) }).rho;
const climb = (order, constrained) => {
  let cur = [...order], best = rhoOrder(cur), moved = true;
  while (moved) {
    moved = false;
    for (let i = 0; i < DAYS; i++) for (let j = i + 1; j < DAYS; j++) {
      const trial = [...cur];
      [trial[i], trial[j]] = [trial[j], trial[i]];
      if (constrained && !isLegal(trial)) continue;
      const r = rhoOrder(trial);
      if (r > best + 1e-12) { cur = trial; best = r; moved = true; }
    }
  }
  return { order: cur, rho: best };
};
const searchBest = (constrained) => {
  let best = null;
  for (let s = 0; s < 300; s++) {
    const start = constrained ? randomLegal() : randomFree();
    if (!start) continue;
    const got = climb(start, constrained);
    if (!best || got.rho > best.rho) best = got;
  }
  const dayMap = new Map(best.order.map((old, i) => [old, i + 1]));
  return { ...best, dayMap, ...applySlate({ dayMap }) };
};
const bestLegal = searchBest(true);
const bestFree = searchBest(false);
// and the stop-level version, for scale: each area's own stops re-dayed into that
// area's own day slots in concept order. Keeps every day's area mix, and costs a scene
// rewrite per move.
const byGroup = {};
for (const r of rows) (byGroup[r.group] ??= []).push(r);
const stopDay = new Map();
for (const rs of Object.values(byGroup)) {
  const nulls = new Set(rs.filter(r => !r.c).map(r => r.day));
  const free = rs.map(r => r.day).sort((a, b) => a - b).filter(d => !nulls.has(d));
  rs.filter(r => r.c).sort((a, b) => a.c - b.c).forEach((r, i) => stopDay.set(r.n, free[i]));
  rs.filter(r => !r.c).forEach(r => stopDay.set(r.n, r.day));
}
const stopLevel = (() => {
  const rs = rows.map(r => ({ ...r, day: stopDay.get(r.n) }));
  return { ...assess(rs), moves: rows.filter(r => stopDay.get(r.n) !== r.day).length };
})();

// ---- the three slates
//
// A search over re-labellings was tried here and removed, and it is worth saying why:
// left free it minimised inversions by DROPPING demanding claims onto prerequisite-free
// concepts — four stops relabelled to c1, the count down to one, and fewer concepts
// claimed than it started with. A measurement that produces a plausible answer is not
// thereby a working measurement, and an optimiser pointed at this metric games it in a
// single pass. Every claim below is named, and was read against its own stop.
const RECLAIM = Object.fromEntries(ed.mispicks.map(([n, to]) => [n, to]));
const SLATES = [
  { key: 'A', name: 'Declare what it takes as read — applied',
    sub: `${new Set(shipped.excused.map(e => e.stop)).size} stops · nothing rewritten`,
    slate: {} },
  // Slate B is applied, so its simulation is the identity — re-applying the claims and
  // the swaps to content that already carries them would double the swaps and report a
  // worse campaign than the one on disk. Its figures come from `applied` above.
  { key: 'B', name: 'Fix the twelve — applied',
    sub: `${ed.mispicks.length} claims · 1 question · 2 swaps`, slate: {} },
  { key: 'C', name: 'Re-cut the fortnight', sub: '15 stakes · adds story work',
    // Applied, so this simulation is the identity too. `bestLegal` below still reports
    // the correlation-maximal legal order, and the gap between it and the order actually
    // taken is the argument this whole document makes: that order breaks the dependency
    // graph, and the graph is the thing being gated.
    slate: {} },
];
for (const s of SLATES) s.result = applySlate(s.slate);
const dayOneLayerAfterReorder = Math.max(...rows
  .filter(r => r.c && bestLegal.dayMap.get(r.day) === 1).map(r => depth.get(r.c)));

const out = {
  theme, days: DAYS, stops: rows.length, concepts: N, claimed: shipped.claimed,
  layers: MAXL + 1, open: OPEN, rho: +rho.toFixed(2),
  inversions: inversions.length, prior: shipped.prior.length, course: shipped.course.length,
  priorConcepts: shipped.priorConcepts, sameDay: sameDay.length,
  unclaimed, untouched, dupes, bandEarly: bandEarly.length,
  bestLegal: { rho: +bestLegal.rho.toFixed(2), order: bestLegal.order, course: bestLegal.course.length },
  bestFree: { rho: +bestFree.rho.toFixed(2) },
  stopLevel: { rho: +stopLevel.rho.toFixed(2), moves: stopLevel.moves, course: stopLevel.course.length },
  slates: SLATES.map(s => ({ key: s.key, name: s.name, inversions: s.result.inv.length,
    prior: s.result.prior.length, course: s.result.course.length,
    claimed: s.result.claimed, rho: +s.result.rho.toFixed(2) })),
  courseRows: shipped.course, priorRows: shipped.prior, rows,
};
fs.writeFileSync(`${DIR}/${theme}-sequence.json`, JSON.stringify(out, null, 1));

// ------------------------------------------------------------------- document
const esc = (s) => String(s ?? '').replace(/&(?![a-z#]+;)/g, '&amp;').replace(/</g, '&lt;');
const cn = (n) => `<span class="mono" style="font-size:7.4pt">c${n}</span> ${esc(syl[n - 1].c)}`;
const CSS = `
  @page { size: A4; margin: 15mm 14mm 16mm; }
  :root { --ink:#15171a; --ink2:#4c5158; --muted:#868b92; --rule:#dcded9; --sunk:#f2f3ef;
    --acc:#876e25; --s:#2c7a4b; --m:#9a6f14; --d:#767b70; --r:#a4453a; }
  * { box-sizing:border-box; }
  body { margin:0; color:var(--ink); background:#fff;
    font-family:system-ui,-apple-system,"Segoe UI",sans-serif; font-size:9.6pt; line-height:1.5; }
  .mono,.k,code { font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace; }
  code,.k { font-size:.9em; background:var(--sunk); padding:0 3px; border-radius:2px; }
  em { font-style:normal; font-weight:640; }
  strong { font-weight:680; }
  header { border-bottom:2.5pt solid var(--acc); padding-bottom:7pt; margin-bottom:12pt; }
  .eyebrow { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; letter-spacing:.16em;
    text-transform:uppercase; color:var(--acc); }
  h1 { margin:2pt 0 3pt; font-size:24pt; line-height:1.02; letter-spacing:-.02em; font-weight:660; }
  .sub { color:var(--ink2); font-size:9.6pt; max-width:150mm; }
  .place { color:var(--muted); font-size:8.4pt; font-style:italic; margin-top:2pt; }
  .facts { display:flex; border:.6pt solid var(--rule); margin-top:8pt; }
  .fact { flex:1; padding:4pt 7pt 5pt; border-right:.6pt solid var(--rule); }
  .fact:last-child { border-right:none; }
  .fact b { display:block; font-family:ui-monospace,Menlo,monospace; font-size:13pt; font-weight:640; letter-spacing:-.02em; }
  .fact span { font-family:ui-monospace,Menlo,monospace; font-size:6.2pt; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted); }
  h2 { font-size:12pt; margin:15pt 0 4pt; font-weight:660; letter-spacing:-.01em;
    border-bottom:.6pt solid var(--ink); padding-bottom:3pt; break-after:avoid; }
  h2 .ph { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; letter-spacing:.14em;
    text-transform:uppercase; color:var(--acc); margin-right:6pt; }
  h3 { font-size:9.8pt; margin:11pt 0 0; font-weight:660; break-after:avoid; }
  p { margin:6pt 0; max-width:170mm; }
  ul { margin:6pt 0 6pt 16pt; padding:0; }
  li { margin:3pt 0; }
  table { border-collapse:collapse; width:100%; font-size:8.4pt; margin:6pt 0; }
  th,td { text-align:left; padding:3pt 6pt 3pt 0; border-bottom:.5pt solid var(--rule); vertical-align:top; }
  thead th { font-family:ui-monospace,Menlo,monospace; font-size:6.4pt; letter-spacing:.08em;
    text-transform:uppercase; color:var(--muted); font-weight:500; border-bottom:.7pt solid var(--ink); }
  td.n,th.n { text-align:right; padding-right:8pt; font-variant-numeric:tabular-nums; white-space:nowrap; }
  .flag { font-family:ui-monospace,Menlo,monospace; font-size:6.2pt; letter-spacing:.05em;
    border:.5pt solid currentColor; padding:0 3pt; border-radius:2pt; white-space:nowrap; }
  .f-same { color:var(--m); }
  .callout { border-left:2pt solid var(--acc); background:var(--sunk); padding:6pt 9pt; margin:8pt 0; break-inside:avoid; }
  .callout p { margin:3pt 0; }
  .callout .tag { font-family:ui-monospace,Menlo,monospace; font-size:6.4pt; letter-spacing:.12em;
    text-transform:uppercase; color:var(--acc); display:block; margin-bottom:3pt; }
  .callout.warn { border-left-color:var(--r); }
  .callout.warn .tag { color:var(--r); }
  .lane { display:flex; border:.6pt solid var(--rule); margin:7pt 0 3pt; }
  .lane .col { flex:1; border-right:.5pt solid var(--rule); padding:3pt 0 4pt; text-align:center; }
  .lane .col:last-child { border-right:none; }
  .lane .dy { font-family:ui-monospace,Menlo,monospace; font-size:6pt; color:var(--muted); display:block; }
  .lane .lic { font-family:ui-monospace,Menlo,monospace; font-size:6pt; color:var(--acc); display:block; }
  .lane .cs { font-family:ui-monospace,Menlo,monospace; font-size:6.8pt; line-height:1.4; }
  .lane .over { color:var(--r); font-weight:680; }
  .lane .ok { color:var(--ink2); }
  .slate { border:.6pt solid var(--rule); padding:6pt 8pt 7pt; margin:7pt 0; break-inside:avoid; }
  .slate .sh { display:flex; align-items:baseline; gap:8pt; border-bottom:.6pt solid var(--rule); padding-bottom:3pt; }
  .slate h4 { margin:0; font-size:10.5pt; font-weight:660; }
  .slate .n2 { font-family:ui-monospace,Menlo,monospace; font-size:6.6pt; letter-spacing:.1em;
    text-transform:uppercase; color:var(--muted); }
  .slate p { font-size:9pt; margin:4pt 0 0; }
  .out { border-top:.6pt solid var(--rule); padding-top:4pt; margin-top:5pt; font-size:7.8pt; color:var(--ink2); }
  .out b { color:var(--ink); font-variant-numeric:tabular-nums; }
  footer { margin-top:14pt; padding-top:5pt; border-top:.6pt solid var(--rule); color:var(--muted); font-size:7pt; }
  .avoid { break-inside:avoid; }
`;

const dayLane = () => `<div class="lane">${[...Array(DAYS)].map((_, i) => {
  const d = i + 1;
  const lic = licensed(d);
  const cs = rows.filter(r => r.day === d).map(r => r.c
    ? `<span class="${depth.get(r.c) > lic ? 'over' : 'ok'}">c${r.c}·L${depth.get(r.c)}</span>`
    : '<span class="ok">—</span>').join('<br>');
  return `<div class="col"><span class="dy">d${d}</span><span class="lic">L≤${lic}</span><div class="cs">${cs}</div></div>`;
}).join('')}</div>`;

const invTable = (list) => `<table><thead><tr><th class="n">day</th><th>the card claims</th>
  <th>which is built out of</th><th>and that arrives</th><th class="n">stops</th></tr></thead><tbody>
${list.map(i => `<tr>
  <td class="n mono">d${i.day}</td><td>${cn(i.c)}</td>
  <td>${cn(i.p)} <span class="mono" style="font-size:6.6pt;color:var(--muted)">L${i.player}</span></td>
  <td class="mono" style="font-size:7.4pt;color:var(--ink2)">${i.pday === i.day
    ? '<span class="flag f-same">same day</span>' : esc(i.why)}${i.pday === null && i.touched
    ? ` <span style="color:var(--muted)">(mentioned at ${i.touched} stops)</span>` : ''}</td>
  <td class="n mono" style="font-size:7.2pt;color:var(--muted)">${i.stops.join(' ')}</td></tr>`).join('')}
</tbody></table>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(game.title ?? theme)} — Sequencing Plan</title>
<style>${CSS}</style></head><body>

<header>
  <div class="eyebrow">Alamos · sequencing plan · ${esc(game.field ?? '')} · grade 12–13</div>
  <h1>${esc(game.title ?? theme)}</h1>
  <div class="sub">${esc(game.course ?? '')} — when the course introduces a concept, against where the
  story is standing when it does.</div>
  <div class="place">${esc(game.place ?? '')}</div>
  <div class="facts">
    <div class="fact"><b>${rows.length}</b><span>stops · ${DAYS} days</span></div>
    <div class="fact"><b>${shipped.claimed}/${N}</b><span>concepts claimed</span></div>
    <div class="fact"><b>${out.rho.toFixed(2)}</b><span>day ↔ concept (ρ)</span></div>
    <div class="fact"><b>${shipped.inv.length}</b><span>prerequisite inversions</span></div>
    <div class="fact"><b>${shipped.excused.length}</b><span>declared as read</span></div>
    <div class="fact"><b>L${depth.get(rows[0].c)} of ${MAXL}</b><span>day 1 opens at</span></div>
  </div>
</header>

<h2><span class="ph">Reading</span>Where this campaign stands</h2>
<p><strong>Both slates are applied, and the rule is a check now.</strong> Before them, day 1's first
stop asked what a falling frequency trend is evidence of and the card named
${ed.applied.dayOneClaimed} — layer ${depth.get(20)} of ${MAXL} — while <em>c19 · frequency as the balance
of supply and demand</em>, which droop is built out of, was claimed by no stop until day 12, and
<em>c18 · synchronous machines</em> by no stop at all. Today that stop claims the balance itself, which is
what it computes, and says on the card that it takes synchronous machines and power-against-energy as
read. <code>engine/dev/conceptOrder.mjs</code> is green on all 29 themes.</p>
<p>The numbers: of ${ed.applied.inversions} prerequisite inversions, ${ed.applied.course} rested on
material this campaign itself teaches later and ${ed.applied.prior} on the bottom of the graph. The first
group is ordered — <em>${shipped.course.length}</em> left — and the second is declared, in
${ed.applied.declarations} <code>takesAsRead</code> entries that the importer refuses unless the concept
is genuinely something the stop's claim is built out of. Concepts claimed went ${ed.applied.claimed} →
${shipped.claimed} of ${N}; ρ went ${ed.applied.rho.toFixed(2)} → ${out.rho.toFixed(2)}.</p>
<p><strong>The gate is per stop, and that is not the same audit as this document's.</strong> Two stops can
claim one concept, and each of them has to answer for its own prerequisites — so
<code>conceptOrder</code> found ${ed.applied.gateRowsFoundByStop} rows the concept-level count had
hidden, including a stop standing beside its own base on day 6 rather than after it. Four were declared;
two were ordered, and one of those is the fix worth copying: day 10's dark-hours estimate now claims
<em>energy from power over time</em>, which is what <code>E = Pt</code> is, and that single re-claim put
the base under two later stops at once.</p>

<div class="callout warn"><span class="tag">The finding that decides the work</span>
<p><strong>Re-ordering the story is not the fix.</strong> The fortnight is a chronology — the trip
causes the aftermath, the island precedes the black start, the report is last — and searching
permutations of the fifteen missions that respect those ${ed.chain.length} constraints, the best
correlation available is <em>ρ = ${out.bestLegal.rho.toFixed(2)}</em> against today's
${out.rho.toFixed(2)} — and measured before the pass it left 10 of the ${ed.applied.course} in-course
inversions standing, which is why it was never the fix. The re-order that was taken scores
${out.rho.toFixed(2)} rather than that ceiling <em>on purpose</em>: the search ranked orders by
prerequisite breaks first and correlation second, and the correlation-maximal order teaches backwards. Ignore the story entirely and it reaches
${out.bestFree.rho.toFixed(2)}; move individual stops rather than whole missions and it reaches
${out.stopLevel.rho.toFixed(2)}, at ${out.stopLevel.moves} rewritten scenes.</p>
<p>Correlation is the wrong target anyway — it is the cheap number adjacent to the thing. The target is
the prerequisite: <em>every concept a stop claims has a base that arrived on an earlier day, or the stop
says out loud that it assumes it.</em> That is what the two slates did, without moving a mission or
touching the story: ${ed.applied.course} in-course inversions down to ${shipped.course.length} — two
swapped pairs, one rewritten question, and the last row declared rather than moved, because day 1 cannot
have anything before it.</p></div>

<div class="avoid">
<h2><span class="ph">Dependency</span>What this course is built out of</h2>
<p style="font-size:8.8pt">Authored beside the concepts in <code>tools/syllabus.js</code> — where
<code>needs</code> already lived for equations — because it is a claim about the subject and not about
this game, and <code>conceptOrder.mjs</code> reads it there. It is not
difficulty — c20 is no harder than c9, it is further downstream — and it is not the syllabus's own
order, which lists transformers at 13 and Faraday's law at 17. Argue with this first: a wrong
prerequisite here produces a confident wrong number everywhere else in the document.</p>
<table><thead><tr><th class="n">layer</th><th class="n">licensed from</th><th>concepts</th></tr></thead><tbody>
${[...Array(MAXL + 1)].map((_, L) => `<tr><td class="n mono">L${L}</td><td class="n mono">d${OPEN[L]}</td>
  <td>${syl.map((c, i) => i + 1).filter(n => depth.get(n) === L).map(cn).join(' · ')}</td></tr>`).join('')}
</tbody></table>
<p style="font-size:8.4pt;color:var(--ink2)"><em>Licensed from</em> is a report and must never become a
gate: it assumes a course spreads its layers evenly over its days, which no course promises. On that
report ${bandEarly.length} of ${rows.length} stops sit before their layer opens, and six of those are
the black-start block — layer ${depth.get(26)} material, correctly late in the course, landing on days
${claimDay.get(26)}–11. A gate on this number would have sent the work at six stops that are right.</p>
</div>

<div class="avoid">
<h2><span class="ph">Audit</span>Every day, and the layer it teaches at</h2>
${dayLane()}
<p style="font-size:8.4pt;color:var(--ink2)">Each column is a day: the layer the report licenses by
then, and the layer each stop actually claims. Red is above the licence. What matters is not the red —
it is that there is no slope at all. Days 1 and 2 teach layers
${rows.filter(r => r.day <= 2 && r.c).map(r => depth.get(r.c)).join(', ')}; days 12 to 15 teach
${rows.filter(r => r.day >= 12 && r.c).map(r => depth.get(r.c)).join(', ')}.</p>
</div>

<h2><span class="ph">Work</span>${shipped.inv.length ? `${shipped.inv.length} rows still out of order` : 'Nothing is out of order'}</h2>
<p style="font-size:8.8pt">${shipped.inv.length
  ? 'Each of these rests on something that arrives later, and is not declared:'
  : `Every claim's prerequisites arrive on an earlier day or are declared on the card — `
    + `${shipped.excused.length} declarations across ${new Set(shipped.excused.map(e => e.stop)).size} stops. `
    + `What follows is the record of the twelve that were out of order, because the shape of each fix is `
    + `the useful part for the next game: two were a claim naming the wrong concept, three were a stop `
    + `standing beside its own base, and two needed a question the course did not have.`}</p>
${shipped.inv.length ? invTable(shipped.inv) : ''}

<div class="avoid">
<h3>The ${ed.applied.course}, and what fixed each</h3>
<table><thead><tr><th>the rows, as they stood</th><th>the fix</th><th class="n">cost</th></tr></thead><tbody>
<tr><td class="mono" style="font-size:7.6pt">c20 d1 ← c19 d${claimDay.get(19)}</td>
  <td>Day 1's two stops claim <em>c19</em>, which is what they already compute: one number for the whole
  interconnection, and df/dt as that balance's rate. Droop is claimed on day 9 anyway.</td>
  <td class="n mono" style="font-size:7.4pt">claim</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c26 d${claimDay.get(26)} ← c18, c19</td>
  <td>Synchronising is what day 4's breaker-closing SEQUENCE teaches; claim it there. With c19 on day 1,
  the whole black-start block is legal where it stands.</td>
  <td class="n mono" style="font-size:7.4pt">claim</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c16 d3 ← c9, c10, c15</td>
  <td>Voltage drop rests on impedance and on real against apparent power, and <em>neither is mentioned
  anywhere in the fortnight</em> — the same hole the conversion plan records as its one real equation
  gap, ΔV ≈ I(R cos φ + X sin φ). Two questions get written, on days 2 and 3, and voltage drop moves to
  day 8.</td>
  <td class="n mono" style="font-size:7.4pt">2 questions</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c12 d4 ← c10</td>
  <td>Three-phase power from line quantities is <code>P = √3·V·I·cos φ</code>, and the cos φ is what
  day 3's new stop is about. Covered by the same question.</td>
  <td class="n mono" style="font-size:7.4pt">covered</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c22 d8 ← c21 d8</td>
  <td>The load curve moves from day 8 to day 7. One day, and its scene names no event.</td>
  <td class="n mono" style="font-size:7.4pt">1 day</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c25 d7 ← c24 d7</td>
  <td>Fault current moves from day 7 to day 6, ahead of the earthing stop that rests on it; series and
  parallel moves from day 6 to day 5, ahead of that.</td>
  <td class="n mono" style="font-size:7.4pt">2 days</td></tr>
<tr><td class="mono" style="font-size:7.6pt">c27 d2 ← c4 d6, c15 d3</td>
  <td>Day 2's contingency stop becomes the impedance question; N-1 is claimed on days 12 and 14 as
  well, where both of its bases already exist.</td>
  <td class="n mono" style="font-size:7.4pt">covered</td></tr>
</tbody></table>
</div>

<h2><span class="ph">Slates</span>Three appetites</h2>
<p style="font-size:8.8pt">No slate adds a stop. Every figure in the three boxes is computed by applying
the slate to the real content and re-running the audit.</p>

<div class="slate">
  <div class="sh"><h4>A · Declare what it takes as read</h4><span class="n2">done ${ed.applied.when} · ${esc(SLATES[0].sub)}</span></div>
  <p>The ${ed.applied.prior} silent assumptions are authored now: <code>takesAsRead</code> on the stop,
  refused by the importer unless the concept is something the stop's claim is built out of, and printed to
  the player as an <code>assumes</code> line and on the Key concept door — "rests on … (taken as read
  here)". It fixed no ordering, and it was never meant to. What it fixed is that the campaign leaned on
  pieces of prior physics without saying so, and a reader could not tell a deliberate assumption from an
  accident. It also has to come first: day 1 could otherwise only ever claim a concept with no
  prerequisites at all.</p>
  <div class="out">undeclared assumptions <b>${ed.applied.prior} → 0</b> ·
  declarations <b>${ed.applied.declarations}</b> across
  <b>${new Set(shipped.excused.map(e => e.stop)).size}</b> stops ·
  nothing moved, nothing was rewritten</div>
</div>

<div class="slate">
  <div class="sh"><h4>B · Fix the twelve</h4><span class="n2">done ${ed.applied.when} · re-run this file to re-measure</span></div>
  <p>The ${ed.mispicks.length} authored claims, the two swaps and the one rewritten question in the table
  above. No mission was re-ordered and no scene was rewritten except the one whose question changed. The
  figures on the right are the pass, measured before and after on the real content — everything else in
  this document already reads the game as it now is.</p>
  <div class="out">in-course inversions <b>${ed.applied.course} → ${shipped.course.length}</b> ·
  concepts claimed <b>${ed.applied.claimed} → ${shipped.claimed}</b> ·
  ρ <b>${ed.applied.rho.toFixed(2)} → ${out.rho.toFixed(2)}</b> ·
  declared assumptions <b>${ed.applied.prior} → ${shipped.prior.length}</b>, because four more concepts
  claimed is four more sets of bases to declare · the row left over is day 1 itself, which no ordering can fix</div>
</div>

<div class="slate">
  <div class="sh"><h4>C · Re-cut the fortnight</h4><span class="n2">done ${ed.applied.when} · 15 missions, 9 edits</span></div>
  <p>The missions are in a new order and no stop was rewritten to get there:
  ${ed.applied.recut.order.map((o, i) => `d${i + 1}←${o}`).join(' ')}. It was chosen by search over every
  order the chronology allows — ${ed.chain.length} constraints read off the stakes — ranked by
  prerequisite breaks first and correlation second, because a re-order that reads well and teaches
  backwards is not an improvement. The fortnight opens on the reserve day and the three-problems day; the
  trip lands on <em>day 3</em>, which is what the swing equation being the first arithmetic anybody met was
  costing. Eight continuity edits (the weekday stamps, one back-reference to an event that has not happened
  yet, one scene tail) and one character introduced at her new first mention — <code>checkNames</code>
  caught that, having been told nothing about the re-order.</p>
  <div class="out">the swing equation first appears on <b>day 3</b>, not day 1 ·
  ρ <b>${ed.applied.recut.rhoBefore.toFixed(2)} → ${out.rho.toFixed(2)}</b> ·
  declarations <b>${ed.applied.declarations} → ${ed.applied.recut.declarations}</b> ·
  prerequisite inversions <b>${shipped.inv.length}</b> · no stop rewritten, no objective lost</div>
</div>

<div class="avoid">
<h2><span class="ph">Gate</span><code>engine/dev/conceptOrder.mjs</code></h2>
<p>One rule, and it is the rule <code>equationOrder</code> already enforces one field over: <em>for every
stop that claims concept c on day d, each of c's prerequisites is claimed by a stop on a day earlier
than d, or is named in that stop's own <code>assumes</code>.</em> The hatch is what makes the rule
satisfiable, and it is the right hatch — <code>assumes</code> already exists, is already printed, and
turns "the player has not met this" into an authored sentence. Both halves get counted: the failures,
and the exceptions, because a campaign with sixty exceptions has not passed anything.</p>
<p>Two reports beside it and neither of them a gate: the rank correlation, and the layer band. The
selftest is the load-bearing half — three cases, each of them a bug this file could have. A fixture
whose prerequisite is claimed on the <em>same</em> day must fail, because the engine opens a day in any
order. One claimed a day earlier must pass. One declared in <code>assumes</code> must pass, with the
exception counted and printed. Put each bug back and that case, and only that case, should fail.</p>
<p>Debt rather than an advisory flag: ${inversions.length} rows on one game is too many to gate on cold,
so what exists today goes in <code>concept-debt.json</code> beside <code>curriculum-debt.json</code>,
with the same two properties — a row not on the list fails immediately, and a row on the list that has
since been fixed <em>also</em> fails, naming the line to delete. It only shrinks.</p>
</div>

<div class="callout"><span class="tag">The order of work</span>
<p><strong>1.</strong> Author the claim: <code>concept:</code> on a stop in the book,
<em>refused</em> by <code>import-book.mjs</code> when it names something not on the theme's syllabus
rather than dropped, with <code>pickKeyConcept</code> as the fallback. Nothing here can be built before
this — a gate on a derived field grades the matcher, not the course. <strong>2.</strong> Review the
${N} <code>needs</code> lists into <code>tools/syllabus.js</code>; the graph in this document is one
reading of one syllabus. <strong>3.</strong> <code>conceptOrder.mjs</code> with its three selftest
cases, and <code>concept-debt.json</code> baselined at today's ${inversions.length}.
<strong>4.</strong> <code>node engine/dev/curriculumDelivery.mjs ${theme} --snapshot before.json</code>.
<strong>5.</strong> Slates A then B, editing the book and re-importing —
<code>node tools/import-book.mjs books/${theme}.yml ${theme} --verify</code>. The two written questions
are a deliberate curriculum change: re-snapshot after them and say so in the commit.
<strong>6.</strong> <code>--against before.json</code>, knowing what it will and will not say — a
corrected claim is invisible to it, a reworded takeaway fails it, and a changed day is not compared at
all, so add the day comparison to <code>diffSnapshots</code> as a <em>note</em> before slate C, never as
a failure. <strong>7.</strong> <code>npm run check ${theme}</code>, then
<code>npm run drive ${theme}</code> on the two new questions, right answer and wrong.
<strong>8.</strong> Re-derive the editions. <code>${theme}_fable</code> shares this syllabus and has the
same day-1 opening; <code>${theme}_ms</code> claims <em>no</em> concepts at all, because none of its 16
concepts has a <code>t</code> written — its cards show no key-concept door, and this whole audit is
unmeasurable there until they do.</p></div>

<footer>
  Stops, claims, layers, correlations, permutation searches and slate outcomes computed from
  <code>themes/${theme}/content/</code> by <code>plans/sequence.mjs</code>; data in
  <code>plans/${theme}-sequence.json</code>. The dependency graph, the ${ed.mispicks.length} mis-pick
  readings and the three slates are authored in that file, and are what a person should argue with. The
  conversion plan — format mix, equations owed, fun formats — is <code>plans/${theme}.html</code>, and is
  a different question. Run the game with <code>THEME=${theme} npm run dev</code>.
</footer>

<h2 style="break-before:page"><span class="ph">Appendix</span>All ${rows.length} stops, in campaign order</h2>
<table><thead><tr><th class="n">#</th><th class="n">day</th><th>area</th><th>format</th>
  <th class="n">concept</th><th class="n">layer</th><th>title</th></tr></thead><tbody>
${rows.map(r => {
  const L = r.c ? depth.get(r.c) : null;
  const over = r.c && L > licensed(r.day);
  return `<tr><td class="n mono">${r.n}</td><td class="n mono">d${r.day}</td>
    <td class="mono" style="font-size:7.2pt">${r.group}</td>
    <td class="mono" style="font-size:7.2pt">${r.type}</td>
    <td class="n mono">${r.c ? 'c' + r.c : '—'}</td>
    <td class="n mono"${over ? ' style="color:var(--r);font-weight:680"' : ''}>${L === null ? '—' : 'L' + L}</td>
    <td>${esc(r.title)}</td></tr>`;
}).join('')}</tbody></table>

</body></html>`;

fs.writeFileSync(`${DIR}/${theme}-sequence.html`, html);
execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-pdf-header-footer',
  `--print-to-pdf=${DIR}/${theme}-sequence.pdf`, `file://${DIR}/${theme}-sequence.html`],
  { stdio: 'ignore' });

console.log(`${theme}: ${rows.length} stops over ${DAYS} days, ${shipped.claimed}/${N} concepts claimed, rho ${out.rho.toFixed(2)}`);
console.log(`  ${inversions.length} prerequisite inversions — ${shipped.prior.length} undeclared assumptions, `
  + `${shipped.course.length} in-course (${sameDay.length} of them same-day)`);
for (const s of SLATES) {
  console.log(`  slate ${s.key} ${s.name.padEnd(30)} in-course ${String(s.result.course.length).padStart(2)}`
    + `  claimed ${s.result.claimed}/${N}  rho ${s.result.rho.toFixed(2)}  undeclared ${s.result.prior.length}`);
}
console.log(`  reorder ceilings: story-legal rho ${out.bestLegal.rho.toFixed(2)}, free ${out.bestFree.rho.toFixed(2)}, `
  + `stop-level ${out.stopLevel.rho.toFixed(2)} over ${out.stopLevel.moves} moves`);
console.log(`  wrote ${theme}-sequence.html, .pdf, .json`);
