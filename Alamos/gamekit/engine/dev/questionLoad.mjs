// questionLoad.mjs — how much a question demands, which a reading score cannot see.
//
//   node engine/dev/questionLoad.mjs <theme>      # silent above grade 8
//   node engine/dev/questionLoad.mjs --all
//
// WHY THIS EXISTS. Nine middle-school editions shipped with every passage at
// Flesch–Kincaid 4 to 6, and a sixth grader found them much too hard. Both
// facts were true at once, because the reading score is words-per-sentence and
// syllables-per-word and nothing else. It cannot see that "which explanation is
// consistent with all four readings" is a harder question than "how far did it
// move", however plainly each is written. So the prose was rewritten and the
// demand was left exactly where the senior-high course had put it.
//
// That is the same failure the readability note in CLAUDE.md records, one level
// up: a measurement that produces a plausible answer is not thereby a working
// measurement. This file is the missing measurement. It is deliberately crude,
// because a crude gate that fires is worth more than a subtle one that does not.
//
// WHAT IT ASSERTS, for any theme whose audience is grade 8 or below:
//
//   1. Arithmetic a middle grader can carry. At most two operations, every
//      number in the answer under four digits, nothing smaller than a tenth.
//   2. Options short enough to hold four of them in mind. Twelve words.
//   3. At most two named people in a stop, and four across a day.
//   4. A budget on judgement stops. Asking what evidence licenses a conclusion
//      is genuinely eleventh-grade work; a campaign may carry a few, and when
//      most of the campaign is that, the game is a senior-high game in plain
//      words.
//
// WHAT IT CANNOT SEE. Whether the science is familiar, whether a day depends on
// the day before it, whether a number means anything to a child. Those still
// need a person, and — the expensive lesson — a person of the right age.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir, themeNames, editionBase } from './registry.mjs';

const args = process.argv.slice(2);
const wanted = args.includes('--all') || !args[0] ? themeNames() : [args[0]];
const verbose = args.includes('--verbose');
const selftest = args.includes('--selftest');
// The sweep looks at every game, senior ones included, and fails nothing. The
// numeric limits below are for children; what carries across every audience is
// whether a stop asks one question or several stapled together.
const sweep = args.includes('--sweep');

// The limits. Every one is a number rather than a principle, because a limit
// written as a sentence is a limit nobody can fail.
const LIMITS = {
  grade: 8,             // above this the theme is a senior-high game and exempt
  estimateOps: 2,       // + − × ÷ in the formula the panel runs
  estimateDigits: 9999, // biggest number a player has to key in or read
  estimateFloor: 0.1,   // smallest; below this it is a decimal drill, not science
  optionWords: 12,      // choices, ordering cards, matching rows
  peoplePerStop: 2,
  peoplePerDay: 4,
  demandingShare: 0.2, // of all stops in the campaign
  demandingPerDay: 1,
  demandingFirstDay: 3, // nothing that asks for judgement before this day
  equationsPerStop: 1,  // a stop teaches one relationship, not a chain of them
};

// How many distinct equations a stop's `relationship` line declares. Written as
// a rule after a sixth grader read "Degrees lost = energy lost / energy for one
// degree. Energy lost = watts x seconds." and said there was too much going on:
// two equations, one of them a unit conversion, and a panel with three slots to
// fill from a prompt that had already done half the work in prose. Every gate
// here passed it, because every gate here was counting something else.
const equationsIn = (relationship) => String(relationship ?? '')
  .split(/(?<=[.;])\s+/)
  .filter(part => /[=≈]/.test(part) || /\b(?:=|is|equals)\s/.test(part) && /[×x*/÷]/.test(part))
  .length;

// WHICH FORMATS ARE THEMSELVES THE HARD PART. Most of the instruments were
// designed to teach a habit of mind rather than a fact, and FORMATS.md says so
// in their own one-line descriptions: TRACE is "agreement is not independence",
// ATTEST is "the record is not the condition", VALUE is "what would this
// measurement change". Those are epistemology. A sixth grader can be walked
// through one; a campaign made of them is a senior-high campaign whatever the
// sentences score. So they are budgeted, not banned.
//
// The concrete formats — how much, in what order, which one matches, what is
// this — are unbudgeted, because they ask the question a middle-school course
// actually asks: what happened, and why.
const DEMANDING_FORMATS = new Set([
  'TRACE', 'ATTEST', 'VALUE', 'DEGENERACY', 'STRESS', 'PROPAGATE', 'RESIDUAL',
  'INJECT', 'TRIANGULATE', 'DELEGATE', 'HOLDOUT', 'CASEBOOK', 'DIAGNOSIS',
  'FLY', 'DERIVE',
]);
// ROUTE came out of that set on the same argument as CONTROL and VERIFY. What it
// asks for is spatial memory — walk it once, then walk it again with the labels
// gone and one door shut — and remembering a place as a place rather than as a
// count of turns is a thing young players are good at, not a thing to ration.
// CONTROL and VERIFY are deliberately not in that set. Change one thing and
// reverse it, and predict-act-measure, are the fair test and the hypothesis —
// which is the method a middle-school science course is actually about. They
// are the two instruments a young player should meet *more* often, not fewer.

// And the same demand can arrive inside a plain CHOICE. The split is by stem,
// which is coarse and catches the cases that matter: a stop matching nothing
// here counts as concrete, so the gate under-reports rather than over-fires.
const JUDGEMENT = [
  /\bwhich explanation\b/i, /\bfits (all|every|the .*,)\b/i,
  /\bwhat can (you|we|anybody) (say|conclude)\b/i,
  /\bwhat does (it|this|that) (support|establish|prove|show about)\b/i,
  /\bwhich (evidence|claim|claims|records?)\b/i,
  // "Which measurement decides whether it floats" is concrete — it asks what a
  // quantity is. What is budgeted is "which measurement is worth buying", so the
  // stem needs the evaluative verb after it, not just the noun.
  /\bwhich (measurement|result|results|test) (is|are|would|should|do you|does the)\b/i,
  /\bworth (buying|checking|the)\b/i, /\bmost needs\b/i, /\bstill needs\b/i,
  /\bwhat has to be (true|worked out|checked)\b/i, /\bwhich .* (survives?|stands?|inherits?)\b/i,
  /\bhow should\b/i, /\bwhat should the .* (commit|require|say|report)\b/i,
  /\bdeserves?\b/i, /\bwhat do you (keep|require)\b/i, /\bhonest (statement|status)\b/i,
  /\bwhat is the strongest\b/i, /\bwhich .* would (change|tell)\b/i,
  /\bwhat does the .* do first\b/i, /\bsafest immediate\b/i, /\bhave to get right\b/i,
];
const isJudgement = (s) => JUDGEMENT.some(re => re.test(String(s ?? '')));

/** Canonical challenge kind — the books write "Science Tank", "SEQUENCE". */
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');

const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;

/**
 * Every gate, over one campaign's content. Split out from the theme loop so
 * `--selftest` can run it on fixtures: a checker nobody has watched fail is the
 * thing that produced this whole mess.
 * @returns {{problems: string[], notes: string[], demanding: string[], stops: number}}
 */
export function analyse({ CURRICULUM = {}, MISSIONS = [], ROSTER = [], BALLPARK_CALCS = {} }) {
  const CALCS = BALLPARK_CALCS;
  // Surnames, because that is how a stop refers to somebody it has already met.
  const surnames = ROSTER.map(p => String(p.name).split(/\s+/).pop()).filter(w => w.length > 2);

  const problems = [];
  const notes = [];
  const lessonOf = (stop) => (CURRICULUM[stop.group] ?? [])[stop.lesson] ?? null;

  // ------------------------------------------------------------ per stop
  let stops = 0;
  const demanding = [];
  const demandingAt = new Set();   // "group:lesson" of every budgeted stop
  for (const [gid, list] of Object.entries(CURRICULUM)) {
    for (const [i, l] of list.entries()) {
      const at = `${gid}[${i}] "${l.title}"`;
      const q = l.game ?? {};
      stops++;

      // 1. the arithmetic.
      //
      // The spec is on the lesson in a book, and in BALLPARK_CALCS once the book
      // is imported, keyed by `calcKey`. Reading only the first meant this gate
      // silently checked nothing on every shipped theme — it passed a stop
      // asking 1,000 x 10,800 / 12,000,000, which breaks both numeric limits at
      // once. Same class of hole the selftest found the first time it ran.
      const e = q.estimate ?? (q.calcKey ? CALCS[q.calcKey] : null);
      if (e && String(q.type).toUpperCase() === 'BALLPARK') {
        const ops = (String(e.formula ?? '').match(/[+\-*/]/g) ?? []).length;
        if (ops > LIMITS.estimateOps) {
          problems.push(`${at}: the estimate takes ${ops} operations — ${LIMITS.estimateOps} is the limit at this level (${e.formula})`);
        }
        for (const idx of e.correct ?? []) {
          const v = Math.abs(Number(e.values?.[idx]));
          if (!Number.isFinite(v) || v === 0) continue;
          if (v > LIMITS.estimateDigits) {
            problems.push(`${at}: the answer uses ${e.values[idx]} — over ${LIMITS.estimateDigits}, which is a number a child copies rather than understands`);
          }
          if (v < LIMITS.estimateFloor) {
            problems.push(`${at}: the answer uses ${e.values[idx]} — under ${LIMITS.estimateFloor}, which turns the stop into a decimal drill`);
          }
        }
        const eqs = equationsIn(e.relationship ?? q.relationship);
        if (eqs > LIMITS.equationsPerStop) {
          problems.push(`${at}: the stop declares ${eqs} equations — "${String(e.relationship ?? q.relationship).trim()}" — one stop teaches one relationship`);
        }
        if (Math.abs(Number(e.target)) > 100000) {
          problems.push(`${at}: the answer is ${e.target} — too large to mean anything at this level`);
        }
      }

      // 2. the options
      for (const [key, list2] of [['choice', q.choices], ['row', q.scenarios], ['card', q.cards]]) {
        for (const [k, c] of (list2 ?? []).entries()) {
          const label = typeof c === 'string' ? c : c?.label;
          const n = words(label);
          if (n > LIMITS.optionWords) {
            problems.push(`${at}: ${key} ${k + 1} is ${n} words — four of these have to be held in mind at once (limit ${LIMITS.optionWords})`);
          }
        }
      }

      // 3. the cast
      const text = `${l.scene ?? ''} ${q.question ?? ''} ${q.task ?? ''}`;
      const named = [...new Set(surnames.filter(s => new RegExp(`\\b${s}\\b`).test(text)))];
      if (named.length > LIMITS.peoplePerStop) {
        problems.push(`${at}: names ${named.length} people (${named.join(', ')}) — ${LIMITS.peoplePerStop} is the limit before a stop is also a memory test`);
      }

      // 4. what kind of question it is
      const ask = q.question || q.task || '';
      const why = DEMANDING_FORMATS.has(kindOf(q)) ? kindOf(q)
        : isJudgement(ask) ? 'asks what the evidence licenses'
          : null;
      if (why) {
        demanding.push(`${at} [${why}] ${ask}`);
        demandingAt.add(`${gid}:${i}`);
      }
    }
  }

  // ------------------------------------------------------------- per day
  for (const [d, m] of MISSIONS.entries()) {
    const text = (m.stops ?? []).map(s => {
      const l = lessonOf(s);
      return `${l?.scene ?? ''} ${l?.game?.question ?? ''} ${s.task ?? ''}`;
    }).join(' ');
    const named = [...new Set(surnames.filter(s => new RegExp(`\\b${s}\\b`).test(text)))];
    if (named.length > LIMITS.peoplePerDay) {
      problems.push(`day ${d + 1} "${m.title}": ${named.length} people named across its stops (${named.join(', ')}) — ${LIMITS.peoplePerDay} is the limit`);
    }

    // A demanding stop is worth having. Two in one day is a day a child
    // finishes with nothing they can tell you they learned.
    const hard = (m.stops ?? [])
      .filter(s => demandingAt.has(`${s.group}:${s.lesson}`))
      .map(s => CURRICULUM[s.group]?.[s.lesson]?.title ?? `${s.group}[${s.lesson}]`);
    if (hard.length > LIMITS.demandingPerDay) {
      problems.push(`day ${d + 1} "${m.title}": ${hard.length} stops that ask for judgement rather than an answer (${hard.join('; ')}) — ${LIMITS.demandingPerDay} a day is the limit`);
    }
    // And not in the first days at all. A player who has answered nothing yet
    // has no ground to judge from, and the first stop of day 1 is the one that
    // decides whether there is a day 2.
    if (hard.length && d + 1 < LIMITS.demandingFirstDay) {
      problems.push(`day ${d + 1} "${m.title}": asks for judgement (${hard.join('; ')}) before the player has answered anything — nothing demanding before day ${LIMITS.demandingFirstDay}`);
    }
  }

  // ------------------------------------------------------ the campaign shape
  const share = stops ? demanding.length / stops : 0;
  if (share > LIMITS.demandingShare) {
    problems.push(`${demanding.length} of ${stops} stops ask what the evidence licenses rather than what happened ` +
      `(${(share * 100).toFixed(0)}%, limit ${(LIMITS.demandingShare * 100).toFixed(0)}%) — that is a senior-high campaign written in short sentences`);
  } else {
    notes.push(`${demanding.length} of ${stops} demanding stops (${(share * 100).toFixed(0)}%)`);
  }

  return { problems, notes, demanding, stops };
}

let failed = 0;

if (sweep) {
  console.log('Estimates that declare more than one relationship, or take more than two steps.');
  console.log('Every game, whatever its audience — the limits above apply to children, this does not.\n');
  const rows = [];
  for (const name of themeNames()) {
    let theme;
    try {
      theme = (await import(pathToFileURL(resolve(themeDir(name), 'theme.js')).href)).default;
    } catch { continue; }
    const content = theme.content ?? {};
    const { normalizeContent } = await import('../content/normalize.js');
    normalizeContent(content);
    const CALCS = content.BALLPARK_CALCS ?? {};
    const grade = Number(theme?.audience?.grade);
    let total = 0;
    const hits = [];
    for (const list of Object.values(content.CURRICULUM ?? {})) {
      for (const l of list) {
        const q = l.game ?? {};
        if (String(q.type).toUpperCase() !== 'BALLPARK') continue;
        const e = q.estimate ?? (q.calcKey ? CALCS[q.calcKey] : null);
        if (!e) continue;
        total++;
        const eqs = equationsIn(e.relationship ?? q.relationship);
        const ops = (String(e.formula ?? '').match(/[+\-*/]/g) ?? []).length;
        if (eqs > 1 || ops > 2) {
          hits.push(`      ${eqs > 1 ? `${eqs} equations` : `${ops} steps`}  "${l.title}" — ${String(e.relationship ?? q.relationship ?? e.formula).trim().slice(0, 96)}`);
        }
      }
    }
    rows.push({ name, grade, total, hits });
  }
  rows.sort((a, b) => b.hits.length - a.hits.length || a.name.localeCompare(b.name));
  for (const r of rows) {
    if (!r.total) continue;
    const mark = r.hits.length ? '·' : '✓';
    console.log(`${mark} ${r.name} (grade ${Number.isFinite(r.grade) ? r.grade : '?'}): ${r.hits.length} of ${r.total} estimate(s)`);
    for (const h of r.hits.slice(0, verbose ? 99 : 6)) console.log(h);
    if (!verbose && r.hits.length > 6) console.log(`      … ${r.hits.length - 6} more (--verbose)`);
  }
  process.exit(0);
}

for (const name of selftest ? [] : wanted) {
  let theme;
  try {
    theme = (await import(pathToFileURL(resolve(themeDir(name), 'theme.js')).href)).default;
  } catch { continue; }
  const grade = Number(theme?.audience?.grade);
  if (!Number.isFinite(grade) || grade > LIMITS.grade) continue;   // senior-high: not this checker's business

  // Same normalisation the engine runs at boot, so this measures the campaign
  // the player meets rather than the one the book wrote — shapeMissions moves
  // stops around, and a day's cast is a property of the shaped day.
  const content = theme.content ?? {};
  const { normalizeContent } = await import('../content/normalize.js');
  normalizeContent(content);

  const { problems, notes, demanding } = analyse(content);

  // An edition is held to this; a game written for its audience from scratch is
  // only advised. The gate was built after nine editions had shipped, and
  // failing a game nobody has complained about — Hospital Heroes is grade 2 and
  // was playtested at it — would be the checker making a content decision that
  // belongs to a person. Every finding still prints.
  const isEdition = !!editionBase(name);

  if (problems.length) {
    console.log(`\n${isEdition ? '✗' : '·'} ${name} (grade ${grade}): ${problems.length} thing(s) ask more than the audience${isEdition ? '' : ' (advisory — not an edition)'}`);
    const show = verbose ? problems : problems.slice(0, 12);
    show.forEach(p => console.log('  ✗ ' + p));
    if (problems.length > show.length) console.log(`  … ${problems.length - show.length} more (--verbose)`);
    if (demanding.length && verbose) {
      console.log('\n  stops that ask for judgement:');
      demanding.forEach(j => console.log('    · ' + j));
    }
    if (isEdition) failed++;
  } else {
    console.log(`\n✓ ${name} (grade ${grade}): the questions are as small as the sentences${notes.length ? ' — ' + notes.join(', ') : ''}`);
  }
}

// ---------------------------------------------------------------- selftest
//
// The reason this exists is the reason the checker exists. The reading gate
// reported confident numbers for weeks that were partly an artifact of the
// formula, because it asserted nothing about itself; then nine editions passed
// every check in the repo and a sixth grader could not play them. So before
// this file is allowed to say a campaign is fine, it has to demonstrate that it
// can tell the two cases apart on content whose answer is known.
//
// Each fixture is a whole campaign, because three of the four gates are
// properties of a campaign rather than of a stop.
if (selftest) {
  const person = (n) => ({ id: n.toLowerCase(), name: `Dr. ${n}`, role: 'Lead' });
  const stop = (group, lesson) => ({ group, lesson, place: 'room' });

  /** A grade-6 stop as it should be: one idea, short options, plain arithmetic. */
  const good = {
    title: 'How long the batteries last',
    scene: 'Reyes shows you the meter.',
    game: {
      type: 'BALLPARK',
      question: 'How long will the batteries last?',
      estimate: { formula: '{0} / {1}', values: [96, 12], correct: [0, 1], target: 8, units: 'hours' },
    },
  };
  /** The same stop as the editions actually shipped it. */
  const bad = {
    title: 'What the evidence supports',
    scene: 'Reyes and Okonkwo disagree, and Vance wants an answer before Lindqvist calls.',
    game: {
      type: 'TRACE',
      question: 'Which pressure evidence survives, and what moved the rest?',
      choices: [
        { label: 'Carry the measured pass forward through the gravity of the Earth and re-check every close approach after it' },
        { label: 'Short one' },
      ],
    },
  };
  /** And the arithmetic two of them shipped with, which is senior-high work. */
  const hardMath = {
    title: 'How hard it hits',
    scene: 'Sato brings the impact numbers.',
    game: {
      type: 'BALLPARK',
      question: 'How much energy does it carry?',
      estimate: {
        formula: '{0} * {1} * {2} / {3}', values: [7900000000, 12, 11.2, 0.015],
        correct: [0, 1, 2, 3], target: 1064288000000000000, units: 'J',
      },
    },
  };

  /** The stop the sixth grader stopped on, kept as a fixture. */
  const smushed = {
    title: 'How much does the cabin cool?',
    scene: 'Reyes shows you the meter.',
    game: {
      type: 'BALLPARK',
      question: 'How far does the cabin cool over three hours?',
      estimate: {
        relationship: 'Degrees lost = energy lost / energy for one degree. Energy lost = watts x seconds.',
        formula: '{0} * {1} / {2}', values: [1000, 10800, 12000000],
        correct: [0, 1, 2], target: 0.9, units: 'K',
      },
    },
  };

  const cases = [
    {
      name: 'a campaign built for the audience',
      content: {
        CURRICULUM: { ELEC: [good, { ...good, title: 'How far it cooled' }, { ...good, title: 'How much air' }] },
        MISSIONS: [{ title: 'Day one', stops: [stop('ELEC', 0), stop('ELEC', 1), stop('ELEC', 2)] }],
        ROSTER: [person('Reyes')],
      },
      expect: [],
    },
    {
      name: 'a senior-high campaign in short sentences',
      content: {
        CURRICULUM: { INTEG: [bad, { ...bad, title: 'Which claims deserve the checks' }, hardMath, smushed] },
        MISSIONS: [{ title: 'Day one', stops: [stop('INTEG', 0), stop('INTEG', 1), stop('INTEG', 2), stop('INTEG', 3)] }],
        ROSTER: ['Reyes', 'Okonkwo', 'Vance', 'Lindqvist', 'Sato'].map(person),
      },
      // Every gate has to fire, and the message has to name which one.
      expect: [/operations/, /over 9999/, /under 0.1/, /too large/, /is \d+ words/, /declares 2 equations/,
        /names 4 people/, /people named across its stops/, /2 stops that ask for judgement/,
        /of 4 stops ask what the evidence licenses/, /before the player has answered anything/],
    },
  ];

  let bad_ = 0;
  for (const c of cases) {
    const { problems } = analyse(c.content);
    const missed = c.expect.filter(re => !problems.some(p => re.test(p)));
    const spurious = c.expect.length ? [] : problems;
    if (missed.length || spurious.length) {
      bad_++;
      console.log(`✗ selftest: ${c.name}`);
      missed.forEach(re => console.log(`    the gate did not fire on ${re}`));
      spurious.forEach(p => console.log(`    fired on content that is fine: ${p}`));
    } else {
      console.log(`✓ selftest: ${c.name} — ${problems.length} finding(s), all expected`);
    }
  }
  // And the classifier both ways, since a stem list that matches everything
  // would pass the campaign fixtures above by accident.
  for (const [ask, want] of [
    ['How long will the batteries last?', false],
    ['Put the four steps in order.', false],
    ['Why does it need speed to stay in that path?', false],
    ['Which explanation fits all four checks?', true],
    ['Which evidence is worth buying before committing the burn?', true],
    ['Which claims deserve the last checks?', true],
  ]) {
    if (isJudgement(ask) !== want) {
      bad_++;
      console.log(`✗ selftest: "${ask}" classified ${isJudgement(ask) ? 'judgement' : 'concrete'}, expected ${want ? 'judgement' : 'concrete'}`);
    }
  }
  if (!bad_) console.log('✓ selftest: the gate can tell the two apart');
  process.exit(bad_ ? 1 : 0);
}

process.exit(failed ? 1 : 0);
