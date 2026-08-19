// curriculumDelivery.mjs — does the campaign TEACH its syllabus, or only mention it?
//
//   node engine/dev/curriculumDelivery.mjs <theme> [--all] [--verbose]
//   node engine/dev/curriculumDelivery.mjs <theme> --snapshot <file>
//   node engine/dev/curriculumDelivery.mjs <theme> --against  <file>
//   node engine/dev/curriculumDelivery.mjs --selftest
//
// ## Why this exists, and why it is not a diversity check
//
// The catalogue is 63% four formats, and CHOICE alone is 28% of every stop in
// the repo. The obvious response is a variety gate — no format over a quarter of
// a campaign, so many distinct formats, so many instruments. That gate was
// written down, and then the numbers were crossed against
// `syllabusEquations.mjs`, and it did not survive:
//
//   Ground Truth   CHOICE 51%   the second-worst mix in the repo   11/11 equations computed
//   Sightline      CHOICE 47%   third-worst                         7/7  computed
//   Quantum        CHOICE 20%   the BEST mix in the repo            5/10 computed
//   Outbreak       CHOICE 16%   fourth-best                         3/7  computed
//
// Format variety does not predict whether the course is taught. A variety gate
// would have sent the work at the four games that need it least. It is the same
// failure this repo has now paid for three times — Flesch–Kincaid ranking house
// style rather than reading difficulty, nine junior editions passing sixteen
// checks with twelfth-grade demand, an instrument budget that counted the
// instruments and measured none of them. A number that is plausible, cheap and
// adjacent to the thing.
//
// So the gate is curriculum delivery, and the format mix is the DIAGNOSIS you
// run when delivery fails. `formatMix` may report; it must never fail a game.
// A campaign whose objectives genuinely all demand discrimination is entitled to
// be all CHOICE, and this file has to be able to say so.
//
// ## What it gates on
//
// One thing, and it is the one that is not a matter of taste:
//
//   **An equation the syllabus lists must be COMPUTED by some question.**
//
// Computed means a number came out of it — the estimate's own `relationship`,
// the template the player fills, the worked solution, or a DERIVE's own lines.
// Mentioned means the words appeared in the prose. House rule 21 already says
// it: a base taught only through CHOICE — which has no relationship, no template
// and no worked solution — is a base the course never teaches. CHOICE cannot
// compute, by construction, so a CHOICE-heavy game whose equations are all
// computed is fine, and a CHOICE-heavy game with equations "mentioned only" is
// failing curriculum with the mix as its mechanism.
//
// Fourteen of eighteen games fail that rule today, which is too many to gate on
// from a standing start. The answer is NOT an `--advisory` flag: a gate in front
// of unfinished work acquires a permanent flag and stops being read (see
// `fieldCoverage`'s own header). It is a **debt file** —
// `engine/dev/curriculum-debt.json` lists the gaps that exist now. A gap not on
// that list fails immediately, so nothing new drifts in; a gap on the list that
// has since been fixed ALSO fails, with the line to delete, so the file cannot
// quietly become a permanent excuse. The list only shrinks.
//
// ## What it reports and does not gate
//
// The 30-concept syllabus is reported by the *tier* of move its stops demand:
//
//   SELECT     the answer is on screen and you pick it        CHOICE, TRIAGE, CASEBOOK …
//   CONSTRUCT  you build the answer out of parts              SEQUENCE, BALLPARK, CHAIN, DERIVE …
//   OPERATE    you drive an instrument and read what it does  SWEEP, PROBE, CONTROL, VERIFY …
//
// A concept delivered only at SELECT is the diversification work list. It is a
// report, never a failure, because select-tier can be exactly right — Sightline
// is AP Psychology and "identify the bias" is a discrimination. And gaps in
// concept coverage are expected: `syllabus.js` says it plainly, twenty-five of
// thirty is a syllabus map and thirty of thirty would be a flattering one.
//
// ## The conversion invariant  (--snapshot / --against)
//
// The rule a diversification pass is held to: **the objective is fixed, the
// format is the variable.** Snapshot a theme, convert stops, diff. A changed
// takeaway, a dropped `assumes`, a concept the campaign no longer covers or an
// equation it no longer computes all fail. A changed FORMAT is reported and
// allowed — that is the whole point of the pass.
//
// Without this a diversity sweep quietly rewrites the syllabus while every other
// check stays green, because every other check reads the content as it now is.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { deriveWork, instrumentWork, symbolSignature, EQUATIONS, equationCoverage, conceptCoverage } from '../../tools/syllabus.js';

const DEBT_FILE = 'engine/dev/curriculum-debt.json';

// ---------------------------------------------------------------- the tiers
//
// What the panel makes the player DO, which is not the same as how hard it is.
// The line that matters is SELECT versus everything else: in a SELECT format the
// correct answer is on the screen before the player has thought, and the move is
// to recognise it. Everything above that has the player produce something the
// screen did not already contain.
//
// SEQUENCE and PROTOCOL sit in CONSTRUCT rather than SELECT deliberately, and it
// is the one placement worth arguing about: their parts are all given. They are
// here because the ANSWER is not — an order and a set of pairings are built, and
// there is no line on the panel that is the answer until the player has made it.
const TIER = {
  SELECT: ['CHOICE', 'TRIAGE', 'CASEBOOK', 'SCIENCETANK', 'DIAGNOSIS'],
  CONSTRUCT: ['SEQUENCE', 'PROTOCOL', 'BALLPARK', 'DERIVE', 'CHAIN', 'BALANCE', 'ROUTE',
    'ALLOCATE', 'VALUE', 'ATTEST', 'TRACE', 'TRIGGER', 'DELEGATE', 'PROPAGATE',
    'STRESS', 'DEGENERACY', 'CLOUD', 'RESIDUAL', 'INJECT'],
  OPERATE: ['SWEEP', 'PROBE', 'TALLY', 'HOLDOUT', 'CONTROL', 'VERIFY', 'TRIANGULATE',
    'FLY', 'HOLD', 'TRIAL', 'BELT', 'SPOT', 'LOB', 'STACK'],
};
const TIER_OF = {};
for (const [tier, formats] of Object.entries(TIER)) for (const f of formats) TIER_OF[f] = tier;
const RANK = { SELECT: 0, CONSTRUCT: 1, OPERATE: 2 };

const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * One entry per question, each lesson once, in campaign order.
 *
 * Deliberately the same dedupe and the same two haystacks as
 * `syllabusEquations.mjs` — `formula` is only the arithmetic, `text` is
 * everything the question says. Two files disagreeing about what "computed"
 * means would be worse than either being wrong.
 */
export function pagesFor(content) {
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const pages = [];
  const seen = new Set();
  MISSIONS.forEach((m, mi) => {
    for (const s of m.stops ?? []) {
      const l = CURRICULUM[s.group]?.[s.lesson];
      if (!l?.game) continue;
      const key = `${s.group}:${s.lesson}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const ch = l.game ?? {};
      const type = String(ch.type ?? '').toUpperCase();
      pages.push({
        key, group: s.group, lesson: s.lesson, day: mi + 1,
        title: l.title ?? '', type, tier: TIER_OF[type] ?? 'SELECT',
        takeaway: l.takeaway ?? '', assumes: (l.assumes ?? []).map(String),
        formula: ' ' + [ch.relationship, ch.template, ch.solution,
          ...deriveWork(ch), ...instrumentWork(ch), ...(ch.givens ?? [])]
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
  });
  return pages;
}

/** Everything both modes need, from one theme's already-normalised content. */
export function deliveryFor(themeName, content) {
  const pages = pagesFor(content);
  const equations = equationCoverage(themeName, pages);
  const concepts = conceptCoverage(themeName, pages);
  for (const con of concepts) {
    con.tier = con.stops.length
      ? con.stops.map(n => pages[n - 1].tier).sort((a, b) => RANK[b] - RANK[a])[0]
      : null;
  }
  return { pages, equations, concepts };
}

async function loadTheme(themeName) {
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return content;
}

// ------------------------------------------------------------------ snapshot
//
// The curriculum claim of every stop, and nothing about how it is asked except
// the format — which is recorded so the diff can SAY what changed, never so it
// can object to it.
function snapshotOf(themeName, d) {
  const computedBy = new Map();   // stop index -> equations it computes
  for (const eq of d.equations) for (const n of eq.computes) {
    if (!computedBy.has(n)) computedBy.set(n, []);
    computedBy.get(n).push(eq.e);
  }
  const stops = {};
  d.pages.forEach((p, i) => {
    stops[p.key] = {
      day: p.day, format: p.type, title: p.title,
      takeaway: p.takeaway, assumes: p.assumes,
      computes: (computedBy.get(i + 1) ?? []).sort(),
    };
  });
  return {
    theme: themeName,
    computed: d.equations.filter(e => e.computes.length).map(e => e.e).sort(),
    concepts: d.concepts.filter(c => c.stops.length).map(c => c.n).sort((a, b) => a - b),
    stops,
  };
}

/**
 * What a conversion pass is allowed to have done.
 *
 * Failures are losses of curriculum, in the four forms a stop can lose it. A
 * reworded takeaway counts as a loss on purpose: the escape hatch is to
 * re-snapshot, which is a deliberate visible act, and a fuzzy comparison here
 * would let a pass drift the syllabus one sentence at a time.
 */
export function diffSnapshots(before, after) {
  const bad = [], noted = [];
  const lostEq = before.computed.filter(e => !after.computed.includes(e));
  for (const e of lostEq) bad.push(`no question computes "${e}" any more`);
  const gainedEq = after.computed.filter(e => !before.computed.includes(e));
  for (const e of gainedEq) noted.push(`newly computed: "${e}"`);

  const lostCon = before.concepts.filter(n => !after.concepts.includes(n));
  for (const n of lostCon) bad.push(`syllabus concept ${n} is no longer touched by any stop`);

  for (const [key, b] of Object.entries(before.stops)) {
    const a = after.stops[key];
    if (!a) { bad.push(`${key} ("${b.title}") is gone from the campaign`); continue; }
    if (norm(a.takeaway) !== norm(b.takeaway)) {
      bad.push(`${key} takeaway changed\n        was: ${b.takeaway}\n        now: ${a.takeaway}`);
    }
    for (const as of b.assumes) {
      if (!a.assumes.some(x => norm(x) === norm(as))) bad.push(`${key} no longer assumes "${as}"`);
    }
    for (const e of b.computes) {
      if (!a.computes.includes(e)) bad.push(`${key} no longer computes "${e}"`);
    }
    if (a.format !== b.format) noted.push(`${key}: ${b.format} → ${a.format}`);
  }
  for (const key of Object.keys(after.stops)) {
    if (!before.stops[key]) noted.push(`${key} is new`);
  }
  return { bad, noted };
}

// -------------------------------------------------------------------- report
function report(themeName, d, debt, { verbose, quiet }) {
  const problems = [];
  const eqs = d.equations;
  // The selftest calls this eight times over one-stop fixtures, and eight
  // campaign reports interleaved with the assertions makes the assertions
  // unreadable — which is how a selftest stops being looked at.
  const console = quiet ? { log() {} } : globalThis.console;
  console.log(`\n=== ${themeName} — ${d.pages.length} stops, ${eqs.length} equations, ${d.concepts.length} concepts`);

  if (eqs.length) {
    const computed = eqs.filter(e => e.computes.length);
    const owed = eqs.filter(e => !e.computes.length);
    const allowed = new Set(debt[themeName] ?? []);
    console.log(`  equations computed by a question: ${computed.length}/${eqs.length}`
      + `  (${Math.round(100 * computed.length / eqs.length)}%)`);
    for (const e of owed) {
      const how = e.mentions.length ? `mentioned only, at stop(s) ${e.mentions.slice(0, 6).join(', ')}` : 'no question at all';
      if (allowed.has(e.e)) console.log(`  · known gap: ${e.e} — ${how}`);
      else problems.push(`nothing computes "${e.e}" (${e.c}) — ${how}`);
    }
    // A debt entry that has been paid stays in the file for ever unless
    // something says so. This is that something.
    for (const e of allowed) {
      const row = eqs.find(x => x.e === e);
      if (!row) problems.push(`${DEBT_FILE} lists "${e}" for ${themeName}, which is not on its syllabus — delete the line`);
      else if (row.computes.length) problems.push(`"${e}" is computed now (stop ${row.computes[0]}) — delete it from ${DEBT_FILE}`);
    }
  } else {
    console.log('  no equation list authored for this theme');
  }

  if (d.concepts.length) {
    const touched = d.concepts.filter(c => c.stops.length);
    const byTier = t => touched.filter(c => c.tier === t).length;
    console.log(`  concepts touched: ${touched.length}/${d.concepts.length}`
      + `  — select-only ${byTier('SELECT')}, construct ${byTier('CONSTRUCT')}, operate ${byTier('OPERATE')}`);
    const selectOnly = touched.filter(c => c.tier === 'SELECT' && !c.m);
    if (selectOnly.length) {
      console.log(`  · ${selectOnly.length} mechanism concept(s) the player only ever picks from a list:`);
      for (const c of (verbose ? selectOnly : selectOnly.slice(0, 8))) {
        console.log(`      ${c.n}. ${c.c}  (stops ${c.stops.slice(0, 6).join(', ')})`);
      }
      if (!verbose && selectOnly.length > 8) console.log(`      … ${selectOnly.length - 8} more (--verbose)`);
    }
  }

  const tiers = { SELECT: 0, CONSTRUCT: 0, OPERATE: 0 };
  for (const p of d.pages) tiers[p.tier]++;
  console.log(`  stops by move: select ${tiers.SELECT} · construct ${tiers.CONSTRUCT} · operate ${tiers.OPERATE}`);
  return problems;
}

// ---------------------------------------------------------------------- main
//
// Guarded, because `deliveryFor` and `diffSnapshots` are the reusable half and a
// file that runs its CLI on import cannot be imported.
const RAN_DIRECTLY = process.argv[1]
  && pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

const args = RAN_DIRECTLY ? process.argv.slice(2) : [];
const flag = (name) => { const i = args.indexOf(name); return i < 0 ? null : args[i + 1]; };
const verbose = args.includes('--verbose');
const snapshotTo = flag('--snapshot');
const againstFile = flag('--against');

if (!RAN_DIRECTLY) {
  // imported for `deliveryFor` / `diffSnapshots` — do nothing
} else if (args.includes('--selftest')) {
  await selftest();
} else {
  const named = args.filter(a => !a.startsWith('--') && a !== snapshotTo && a !== againstFile);
  const wanted = args.includes('--all') ? themeNames() : named;
  if (!wanted.length) {
    console.error('usage: node engine/dev/curriculumDelivery.mjs <theme> [--all] [--verbose]');
    console.error('       node engine/dev/curriculumDelivery.mjs <theme> --snapshot <file>');
    console.error('       node engine/dev/curriculumDelivery.mjs <theme> --against <file>');
    process.exit(2);
  }
  const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : {};

  if (snapshotTo || againstFile) {
    if (wanted.length !== 1) {
      console.error('--snapshot and --against take exactly one theme');
      process.exit(2);
    }
    const themeName = wanted[0];
    const d = deliveryFor(themeName, await loadTheme(themeName));
    const snap = snapshotOf(themeName, d);
    if (snapshotTo) {
      writeFileSync(snapshotTo, JSON.stringify(snap, null, 1));
      console.log(`snapshot: ${themeName} — ${Object.keys(snap.stops).length} stops, `
        + `${snap.computed.length} equation(s) computed, ${snap.concepts.length} concept(s) touched`);
      console.log(`  written to ${snapshotTo}`);
      process.exit(0);
    }
    const before = JSON.parse(readFileSync(againstFile, 'utf8'));
    if (before.theme !== themeName) {
      console.error(`✗ that snapshot is of "${before.theme}", not "${themeName}"`);
      process.exit(2);
    }
    const { bad, noted } = diffSnapshots(before, snap);
    console.log(`\n=== ${themeName} against ${againstFile}`);
    if (noted.length) {
      console.log(`  ${noted.length} change(s) the invariant allows:`);
      noted.forEach(n => console.log(`    · ${n}`));
    }
    if (!bad.length) {
      console.log('\n✓ the curriculum claim is unchanged — every takeaway, assumption,');
      console.log('  computed equation and touched concept survived the conversion.');
      process.exit(0);
    }
    console.log(`\n✗ ${bad.length} curriculum loss(es):`);
    bad.forEach(b => console.log(`    ✗ ${b}`));
    console.log('\n  The objective is fixed and the format is the variable. Put the objective');
    console.log('  back, or re-snapshot deliberately if the syllabus itself has changed.');
    process.exit(1);
  }

  const problems = [];
  for (const themeName of wanted) {
    problems.push(...report(themeName, deliveryFor(themeName, await loadTheme(themeName)), debt, { verbose })
      .map(p => `${themeName}: ${p}`));
  }
  if (problems.length) {
    console.log(`\n✗ ${problems.length} problem(s):`);
    problems.forEach(p => console.log('  ✗ ' + p));
    console.log(`\n  An equation nothing computes is an equation the course did not teach.`);
    console.log(`  Give it a stop that gets a number out of it, or record the gap in ${DEBT_FILE}.`);
    process.exit(1);
  }
  console.log(`\n✓ ${wanted.length} theme(s): every equation on the syllabus is computed somewhere`
    + ` (or is a recorded gap), and no recorded gap has been quietly paid off.`);
}

// ------------------------------------------------------------------ selftest
//
// A checker nobody has watched fail is a checker that passes. Each case below is
// a whole small campaign whose answer is known by construction, and two of them
// exist because they are the ways this file could report all-clear while being
// broken: if `formula` stopped being the strict haystack every CHOICE would
// count as computing, and if the tier table lost its SELECT list every concept
// would look constructed.
async function selftest() {
  const fails = [];
  const check = (name, cond, detail) => {
    if (cond) console.log(`✓ selftest: ${name}`);
    else { console.log(`✗ selftest: ${name}${detail ? ' — ' + detail : ''}`); fails.push(name); }
  };

  // A real syllabus, so the keyword lists are the shipped ones rather than a
  // convenient set written to pass. Wellmere's monohybrid ratio is the case the
  // whole exercise turns on.
  const THEME = 'seedbank';
  const eqList = EQUATIONS[THEME] ?? [];
  check('the fixture theme has an authored equation list', eqList.length > 0);

  const stop = (group, lesson) => ({ group, lesson });
  const campaign = (lessons) => ({
    CURRICULUM: { CROSS: lessons },
    MISSIONS: lessons.map((_, i) => ({ title: `day ${i + 1}`, stops: [stop('CROSS', i)] })),
  });

  // The prose below has to use the syllabus's OWN keywords ("3:1", not "3 : 1"),
  // because the fixture is testing the shipped matcher and not a private one. The
  // first draft of this selftest wrote the ratio the way a person types it and
  // reported that a working check was broken.
  /** The stop as Wellmere ships it: the ratio is discussed and never computed. */
  const teaching = 'A 3:1 split in a whole generation is the signature of one gene with a dominant allele.';
  const asChoice = {
    title: 'Counting a generation', takeaway: 'A whole-generation count is evidence about one gene.',
    assumes: ['a cross produces offspring in ratios'],
    game: {
      type: 'CHOICE',
      question: 'What do 306 resistant and 94 susceptible plants tell you?',
      why: teaching,
      // Deliberately bland distractors. An earlier draft used "Two genes", which
      // matched a second syllabus concept off the option list alone — so the
      // conversion "lost" a concept the question had never taught, and the
      // invariant fired correctly on a fixture that was wrong.
      choices: ['One gene is involved and the resistant allele is dominant',
        'Nothing can be concluded', 'The result was an accident', 'It cannot be repeated'],
    },
  };
  /** The same objective, asked so that a number comes out of it. */
  const asBallpark = {
    ...asChoice,
    game: {
      type: 'BALLPARK',
      question: 'What ratio did the generation come out at?',
      why: teaching,
      relationship: 'A monohybrid cross gives a 3:1 ratio of dominant to recessive.',
      template: '{0} / {1}',
      estimate: { formula: '{0} / {1}', values: [306, 94], correct: [0, 1], target: 3, units: '' },
    },
  };

  const dChoice = deliveryFor(THEME, campaign([asChoice]));
  const dBall = deliveryFor(THEME, campaign([asBallpark]));
  const computes = (d, e) => (d.equations.find(x => x.e === e)?.computes ?? []).length > 0;
  const mentions = (d, e) => (d.equations.find(x => x.e === e)?.mentions ?? []).length > 0;

  check('a CHOICE stop about a ratio MENTIONS it and does not compute it',
    mentions(dChoice, '3 : 1') && !computes(dChoice, '3 : 1'),
    'the strict `formula` haystack is what separates the two — if it went, every CHOICE would count as teaching');
  check('the same objective as a BALLPARK computes it',
    computes(dBall, '3 : 1'),
    'a relationship and a template are what "computed" means');

  // ---- the notation the book happens to use must not decide the answer
  //
  // Same rule readabilityParity asserts one level down: a measurement that can
  // tell 11.4 from "eleven point four" is measuring house style. Here the two
  // spellings are "Nₑ ≈ 4NmNf / (Nm + Nf)" and "Ne = 4NmNf ÷ (Nm + Nf)", and an
  // equation computed in plain sight was reported as a gap because the keyword
  // list asked for prose neither of them contains.
  // …and the same rule for a ratio's spacing, which cost a real conversion. The
  // syllabus keyword is `3:1`; a BALLPARK whose relationship says "the 3 : 1
  // monohybrid ratio" was reported as merely mentioning it, so a stop that computed
  // the ratio in as many words still read as an unpaid gap. Put the un-spaced regex
  // back in `defaultHit` and this case fails alone.
  const dSpaced = deliveryFor(THEME, campaign([{
    ...asBallpark,
    game: { ...asBallpark.game,
      relationship: 'Expected resistant = plants × 3 ÷ 4, which is the 3 : 1 monohybrid ratio.' },
  }]));
  check('a ratio written "3 : 1" computes the equation spelled "3:1"',
    computes(dSpaced, '3 : 1'),
    'defaultHit has to allow spaces around a keyword’s colon');

  check('a subscript, a ÷ and an ≈ do not change an equation’s signature',
    symbolSignature('Nₑ ≈ 4NmNf / (Nm + Nf)') === symbolSignature('Ne = 4NmNf ÷ (Nm + Nf)'),
    `${symbolSignature('Nₑ ≈ 4NmNf / (Nm + Nf)')} vs ${symbolSignature('Ne = 4NmNf ÷ (Nm + Nf)')}`);

  const withRel = (rel) => campaign([{
    ...asChoice, takeaway: 'A grow-out is a sample.',
    game: { type: 'BALLPARK', question: 'How many parents effectively?', relationship: rel,
      template: '{0} / {1}', estimate: { formula: '{0} / {1}', values: [18, 102], correct: [0, 1], target: 61, units: '' } },
  }]);
  const NE = 'Nₑ ≈ 4NmNf / (Nm + Nf)';
  const writes = deliveryFor(THEME, withRel('Ne = 4NmNf ÷ (Nm + Nf), where Nm and Nf are the contributing pollen parents.'));
  check('a relationship that writes the equation counts as computing it, whatever the keywords say',
    (writes.equations.find(e => e.e === NE)?.computes ?? []).length > 0,
    'this is the defect that made 8 of 97 recorded gaps phantom');
  const elsewhere = deliveryFor(THEME, withRel('Response R = h² × S, the breeder’s equation.'));
  check('…and a relationship writing a DIFFERENT equation does not',
    (elsewhere.equations.find(e => e.e === NE)?.computes ?? []).length === 0,
    'the signature must not be so loose that any arithmetic counts as any equation');

  // ---- an instrument's own board, and the over-credit it invites
  const board = (blk) => campaign([{
    ...asChoice, game: { type: 'TALLY', question: 'What does the run say?', tally: blk },
  }]);
  const named = board({ formula: 'S = E(a,b) − E(a,b′)', formulaLabel: 'CHSH statistic', batch: 100 });
  check('a board that states its own formula computes it',
    JSON.stringify(instrumentWork(named.CURRICULUM.CROSS[0].game)).includes('CHSH'),
    'the general form of deriveWork — an instrument keeps its numbers in its own block');
  const captioned = board({ settings: [{ label: '98 % germination', value: 98 }], batch: 100 });
  const surface = instrumentWork(captioned.CURRICULUM.CROSS[0].game).join(' ');
  check('a caption that merely names the topic does not',
    !/germination/i.test(surface),
    'the first version harvested captions and cleared three gaps it should not have');

  // ---- tiers
  check('CHOICE is a SELECT move and BALLPARK is not',
    dChoice.pages[0].tier === 'SELECT' && dBall.pages[0].tier === 'CONSTRUCT');
  const dSweep = deliveryFor(THEME, campaign([{ ...asChoice, game: { ...asChoice.game, type: 'SWEEP' } }]));
  check('SWEEP is an OPERATE move', dSweep.pages[0].tier === 'OPERATE');
  const conOf = (d) => d.concepts.find(c => c.stops.length);
  check('a concept reached only through CHOICE is reported select-only',
    conOf(dChoice)?.tier === 'SELECT', 'this is the diversification work list, and it must not fire on constructed stops');
  check('the same concept through a constructed stop is not',
    conOf(dBall)?.tier !== 'SELECT');

  // ---- the invariant
  const snapBefore = snapshotOf(THEME, dChoice);
  const snapConverted = snapshotOf(THEME, dBall);
  const okPass = diffSnapshots(snapBefore, snapConverted);
  check('converting CHOICE → BALLPARK with the objective intact passes the invariant',
    okPass.bad.length === 0, okPass.bad.join(' | '));
  check('…and the format change is reported rather than ignored',
    okPass.noted.some(n => n.includes('CHOICE → BALLPARK')));

  const reworded = deliveryFor(THEME, campaign([{ ...asBallpark, takeaway: 'Ratios are interesting.' }]));
  const badTakeaway = diffSnapshots(snapBefore, snapshotOf(THEME, reworded));
  check('a conversion that rewrites the takeaway fails the invariant',
    badTakeaway.bad.some(b => b.includes('takeaway changed')));

  const dropped = deliveryFor(THEME, campaign([{ ...asBallpark, assumes: [] }]));
  check('a conversion that drops an `assumes` line fails the invariant',
    diffSnapshots(snapBefore, snapshotOf(THEME, dropped)).bad.some(b => b.includes('no longer assumes')));

  const backwards = diffSnapshots(snapConverted, snapBefore);
  check('converting the other way — losing the computation — fails the invariant',
    backwards.bad.some(b => b.includes('no longer computes') || b.includes('any more')),
    'this is the case the whole exercise is guarding against');

  // ---- the debt gate, both directions
  const debtEmpty = report(THEME, dChoice, {}, { verbose: false, quiet: true });
  check('an uncomputed equation with no debt entry is a problem',
    debtEmpty.some(p => p.includes('3 : 1')));
  const debtListed = report(THEME, dChoice, { [THEME]: ['3 : 1'] }, { verbose: false, quiet: true });
  check('…and is silent once it is recorded as a known gap',
    !debtListed.some(p => p.includes('nothing computes "3 : 1"')));
  const debtStale = report(THEME, dBall, { [THEME]: ['3 : 1'] }, { verbose: false, quiet: true });
  check('a recorded gap that has since been fixed is a problem too',
    debtStale.some(p => p.includes('delete it from')),
    'a debt list that never shrinks is a list nobody reads');
  const debtBogus = report(THEME, dBall, { [THEME]: ['E = mc²'] }, { verbose: false, quiet: true });
  check('a debt entry naming no equation on the syllabus is a problem',
    debtBogus.some(p => p.includes('not on its syllabus')));

  console.log(fails.length ? `\n✗ ${fails.length} selftest case(s) failed.` : '\n✓ all selftest cases pass.');
  process.exit(fails.length ? 1 : 0);
}
