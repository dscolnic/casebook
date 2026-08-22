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
//   5. A size on the board each of those stops puts up. The budget in 4 counts
//      instruments; this measures one. Sweeping the nine editions against the
//      games they were derived from found 37 of 38 boards identical in size to
//      their AP parents — the prose came down four grades and the bookkeeping
//      did not move at all. See BOARD below.
//
// WHAT IT CANNOT SEE. Whether the science is familiar, whether a day depends on
// the day before it, whether a number means anything to a child. Those still
// need a person, and — the expensive lesson — a person of the right age.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { themeDir, themeNames, editionBase } from './registry.mjs';

// Same two properties as concept-debt and the rest: a row not on the list fails
// immediately, and a row on the list that has since been fixed also fails,
// naming the line to delete. It only shrinks.
const HERE = dirname(fileURLToPath(import.meta.url));
const DEBT_FILE = 'questionload-debt.json';
const debt = (() => {
  try{
    const j = JSON.parse(readFileSync(resolve(HERE, DEBT_FILE), 'utf8'));
    delete j._;
    return j;
  }catch{ return {}; }
})();

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
  chainPath: 5,         // links a CHAIN makes the player put in exact order
  chainBank: 6,         // cards on its board at once — the path plus its decoys
  exactWidth: 4,        // things on a board graded as an exact subset — each list
  pickWidth: 6,         // things on a board you compare and choose one of
  matchWidth: 3,        // rows on a board graded as one exact permutation
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

/**
 * HOW BIG THE BOARD IS, which is the load a reading score and a format budget
 * both miss.
 *
 * `DEMANDING_FORMATS` above rations *how many* instruments a junior campaign
 * carries. It says nothing about how large any one of them is, and the answer
 * turned out to be: exactly as large as its AP parent. Sweeping the nine
 * grade-6 editions against the games they were derived from, **37 of 38
 * instrument boards are identical in size** — same channels, same claims, same
 * options. `tools/derive-edition.mjs` rewrites the prose and copies the board,
 * and nothing looked at the board, so nine editions came down four reading
 * grades with an eleventh-grade amount of bookkeeping still on the screen.
 *
 * Bring Them Home's grade-6 TRACE is the worked example: five channels, four
 * sources, name one source AND tick exactly two of the five — 128 combinations,
 * graded all-or-nothing, byte-identical to the twelfth-grade version.
 *
 * TWO WIDTHS, because two kinds of board ask different things.
 *
 *   `exact: true`  — the panel accepts one subset out of 2^n and gives no
 *      feedback until commit, so every item's status has to be held at once.
 *      Same argument as `optionWords`, which exists because four options have
 *      to be held in mind together. Four items — and four in the second list
 *      too, where the format has one, because naming the shared source is the
 *      same kind of choice as picking an option.
 *   `exact: false` — you compare the items and pick one, or the panel tells you
 *      live where you stand (ALLOCATE's answers list goes dark as the pool runs
 *      out). That is a comparison, and a comparison narrows as you work, so it
 *      carries a wider board.
 *
 * CHAIN is absent on purpose: it has `chainPath` and `chainBank` above, which
 * measure a permutation rather than a subset. So are FLY, VERIFY, TRIGGER and
 * SWEEP — a slider is one decision however far it travels.
 */
/** n! — the arrangements a match board admits, and it accepts exactly one. */
const arrangements = (n) => (n > 0 ? Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1) : 0);

const matchBoard = (q) => {
  const n = (q.scenarios ?? q.cards ?? []).length;
  return { exact: true, width: LIMITS.matchWidth, permutation: true,
    items: n, itemsAre: 'rows to join', space: arrangements(n),
    graded: ['join every row to the right one, with none of them right on their own'] };
};

const BOARD = {
  TRACE: (q) => { const t = q.trace ?? {}; const ch = (t.channels ?? []).length;
    const src = (t.resources ?? []).length;
    return { exact: true, items: ch, itemsAre: 'channels', sources: src, sourcesAre: 'sources',
      space: src && ch ? src * 2 ** ch : 0,
      graded: ['name the shared source', `tick exactly the ${(t.independent ?? []).length} that survive`] }; },
  ATTEST: (q) => { const n = (q.attest?.claims ?? []).length;
    return { exact: true, items: n, itemsAre: 'claims', space: n ? 2 ** n : 0,
      graded: ['hold exactly the critical claims the evidence does not back'] }; },
  VALUE: (q) => { const n = (q.value?.options ?? []).length;
    return { exact: true, items: n, itemsAre: 'options', space: n ? 2 ** n : 0,
      graded: ['buy every decisive option and nothing that is merely reassuring'] }; },
  // PROTOCOL and CASEBOOK — the match board, and the third width.
  //
  // They were the hole this table had, and it is the same hole one level in that
  // the instrument budget had: CASEBOOK is in DEMANDING_FORMATS, so it was
  // *counted* against the judgement budget and never *measured*, and PROTOCOL was
  // in neither list. 118 stops across the catalogue join four rows or more, 32 of
  // them in the nine grade-6 editions.
  //
  // A permutation is not a subset and it needs its own number. Four rows admit 4!
  // = 24 arrangements against the 2^4 = 16 subsets that are already the limit for
  // a TRACE, and `bindCasebook` grades `picked.every((v, i) => v === mapping[i])`
  // — one accepted arrangement, no partial credit, no feedback until commit. So
  // three rows, which is six arrangements and comfortably inside a TRACE's
  // sixteen.
  //
  // Three is a limit and not a ban, which is the test the composite count failed:
  // the importer floors a PROTOCOL at two situations and a CASEBOOK at none, so
  // every junior board can satisfy this by dropping one row. Above grade 8 it
  // does not apply at all, and 4-of-4 stays what an AP stop asks for.
  //
  // A CASEBOOK carrying `proposals` is a SCIENCETANK on a different panel — it is
  // graded on a share, not on an arrangement — so it is not this board at all.
  PROTOCOL: (q) => matchBoard(q),
  CASEBOOK: (q) => (q.proposals ? { exact: false, items: 0 } : matchBoard(q)),
  // SEQUENCE is the same number wearing a different panel, and leaving it out
  // would have made this whole rule an escape hatch.
  //
  // `bindOrder` grades `chosen.every((v, i) => v === ch.order[i])` — the identical
  // all-or-nothing test `bindCasebook` uses, over the identical n! arrangements. So
  // a ladder-shaped PROTOCOL converted to a four-card SEQUENCE, which is the right
  // MECHANIC for an ordered answer, moves 24 arrangements from a format this table
  // measures to one it did not, turns the gate green, and makes nothing easier. A
  // limit that can be satisfied by renaming the format is not a limit.
  //
  // Three is the importer's own floor for the format (`need(n >= 3, 'sequence needs
  // at least three cards')`), so the limit sits exactly ON the minimum rather than
  // under it — an ordering is still allowed below grade 9, at the smallest size the
  // format admits. Below that it would be a ban, which is the test the composite
  // count failed.
  SEQUENCE: (q) => ({ exact: true, width: LIMITS.matchWidth, permutation: true,
    items: (q.cards ?? []).length, itemsAre: 'cards to order',
    space: arrangements((q.cards ?? []).length),
    graded: ['put every card in the one accepted order, with none of them right on their own'] }),
  ALLOCATE: (q) => ({ exact: false, items: (q.allocate?.items ?? []).length, itemsAre: 'items' }),
  TRIANGULATE: (q) => ({ exact: false, items: (q.triangulate?.stations ?? []).length, itemsAre: 'stations' }),
  RESIDUAL: (q) => ({ exact: false, items: (q.residual?.fits ?? []).length, itemsAre: 'candidate fits' }),
  INJECT: (q) => ({ exact: false, items: (q.inject?.configs ?? []).length, itemsAre: 'configurations' }),
  STRESS: (q) => ({ exact: false, items: (q.stress?.candidates ?? []).length, itemsAre: 'candidates' }),
  PROPAGATE: (q) => ({ exact: false, items: (q.propagate?.terms ?? []).length, itemsAre: 'terms' }),
  DELEGATE: (q) => ({ exact: false, items: (q.delegate?.problems ?? []).length, itemsAre: 'problems' }),
  CONTROL: (q) => ({ exact: false, items: (q.control?.variables ?? []).length, itemsAre: 'variables' }),
  DEGENERACY: (q) => ({ exact: false, items: (q.degeneracy?.controls ?? []).length, itemsAre: 'controls' }),
};

const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;

/**
 * Every gate, over one campaign's content. Split out from the theme loop so
 * `--selftest` can run it on fixtures: a checker nobody has watched fail is the
 * thing that produced this whole mess.
 * @returns {{problems: string[], notes: string[], advice: string[], demanding: string[], stops: number}}
 */
export function analyse({ CURRICULUM = {}, MISSIONS = [], ROSTER = [], BALLPARK_CALCS = {} }) {
  const CALCS = BALLPARK_CALCS;
  // Surnames, because that is how a stop refers to somebody it has already met.
  const surnames = ROSTER.map(p => String(p.name).split(/\s+/).pop()).filter(w => w.length > 2);

  const problems = [];
  const notes = [];
  // Things worth a person's eye that are not a limit anybody set. They print
  // whether or not the campaign passes, because a campaign that passes is
  // exactly where an unmeasured cost hides.
  const advice = [];
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

      // 2b. the chain board.
      //
      // A CHAIN is graded on an exact permutation, so its load is the length of
      // the path and not the reading level of any card on it — six links is 720
      // orders where five is 120, and the panel accepts one. Written after a
      // sixth grader stopped on a five-link one; that stop's real defects were
      // in the panel (the bank printed a link's name and not what it carried,
      // and nothing came back off the rail once placed), but nothing measured
      // the size of the board either, so both editions running six-link paths
      // were invisible. `links` is the bank and may hold up to two decoys the
      // path does not use, which are cards to weigh even though they are never
      // placed — so the two are counted separately.
      if (kindOf(q) === 'CHAIN') {
        const c = q.chain ?? {};
        const path = (c.order ?? []).length;
        const bankN = (c.links ?? []).length;
        if (path > LIMITS.chainPath) {
          problems.push(`${at}: the chain is ${path} links long and graded on the exact order — ${LIMITS.chainPath} is the limit at this level`);
        }
        if (bankN > LIMITS.chainBank) {
          problems.push(`${at}: the chain board holds ${bankN} cards (${path} in the path, ${bankN - path} decoy(s)) — ${LIMITS.chainBank} is the limit at this level`);
        }
        // A card reads as its name and what it carries, together, because that
        // is what the bank prints and what the ordering decision is made from.
        for (const [k, link] of (c.links ?? []).entries()) {
          const n = words(`${link?.label ?? ''} ${link?.transfers ?? ''}`);
          if (n > LIMITS.optionWords) {
            problems.push(`${at}: chain card ${k + 1} ("${link?.label ?? ''}") reads ${n} words with what it transfers — the whole board has to be held in mind at once (limit ${LIMITS.optionWords})`);
          }
        }
      }

      // 2c. the instrument board — see BOARD above for why two widths.
      const board = BOARD[kindOf(q)]?.(q);
      if (board && board.items) {
        const width = board.width ?? (board.exact ? LIMITS.exactWidth : LIMITS.pickWidth);
        const kind = kindOf(q);
        if (board.items > width) {
          const how = board.permutation
            ? ', graded as one exact permutation with no feedback until commit'
            : board.exact ? ', graded as an exact subset with no feedback until commit' : '';
          problems.push(`${at}: the ${kind} board carries ${board.items} ${board.itemsAre}`
            + `${how} — ${width} is the limit at this level`);
        }
        if (board.sources && board.sources > LIMITS.exactWidth) {
          problems.push(`${at}: the ${kind} board offers ${board.sources} ${board.sourcesAre}`
            + ` to choose between — ${LIMITS.exactWidth} is the limit at this level`);
        }
        // The combination count is REPORTED, not limited.
        //
        // It was a limit for one revision, at 32, and that was wrong twice over.
        // A composite of two lists is a number nobody authored and cannot aim
        // at; and the importer floors a TRACE at four channels, so 2^4 subsets
        // times any real source list is already 48 or more. A limit the
        // format's own minimum cannot satisfy is not a limit, it is a ban on
        // the format below grade 9 — which is the opposite of the finding.
        // Both widths are capped above; this line is what those two mean
        // together, for a person reading the report.
        if (board.space) {
          advice.push(`${at}: the ${kind} board admits ${board.space} combinations`
            + ` (${board.items} ${board.itemsAre}`
            + `${board.sources ? ` × ${board.sources} ${board.sourcesAre}` : ''})`
            + ` and the panel takes one`);
        }
        // Conjunctive grading is reported rather than limited, because CHAIN and
        // ROUTE are two-part by construction and banning it would ban them. What
        // it costs is partial credit: a child who names the shared source and
        // keeps one channel too many is marked exactly like one who understood
        // nothing, and the verdict cannot tell them apart either.
        if ((board.graded ?? []).length > 1) {
          advice.push(`${at}: ${kind} is graded on ${board.graded.length} things at once`
            + ` (${board.graded.join('; ')}) — right on one and wrong on the other scores as wrong`);
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

  return { problems, notes, advice, demanding, stops };
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

  const { problems, notes, advice, demanding } = analyse(content);

  // Held to it at grade 8 and below, whether or not the game is a derived edition.
  //
  // This used to be `!!editionBase(name)`, and the consequence nobody measured is
  // that across all 42 themes **Hospital Heroes was the only theme this gate
  // reported at all, and it was the one theme it could not fail** — 110 findings,
  // advisory for ever, on the youngest audience in the catalogue. The twelve
  // junior editions were all swept and pass. So the four numbers in this file
  // exist because of a lesson learned on the editions, and the one grade-2
  // campaign in the repo was exempt from them.
  //
  // The argument for the old rule was that failing a game nobody has complained
  // about is the checker making a content decision. That is what the debt file is
  // for: the rows go in, nothing new drifts in, and a row that is fixed has to be
  // deleted. Fifty-one of Hospital's 110 are one decision — a four-card SEQUENCE
  // graded as one exact permutation with no feedback is a 1-in-24 guess for a
  // seven-year-old — and it is a decision for a person, recorded rather than
  // forced.
  const isEdition = Number.isFinite(grade) ? grade <= 8 : !!editionBase(name);

  if (problems.length) {
    console.log(`\n${isEdition ? '✗' : '·'} ${name} (grade ${grade}): ${problems.length} thing(s) ask more than the audience${isEdition ? '' : ' (advisory — not an edition)'}`);
    const show = verbose ? problems : problems.slice(0, 12);
    show.forEach(p => console.log('  ✗ ' + p));
    if (problems.length > show.length) console.log(`  … ${problems.length - show.length} more (--verbose)`);
    if (demanding.length && verbose) {
      console.log('\n  stops that ask for judgement:');
      demanding.forEach(j => console.log('    · ' + j));
    }
    if (isEdition){
      const known = new Set(debt[name] ?? []);
      const fresh = problems.filter(p => !known.has(p));
      const stale = [...known].filter(k => !problems.includes(k));
      if(fresh.length){
        console.log(`  ${fresh.length} not recorded in ${DEBT_FILE}:`);
        fresh.slice(0, 8).forEach(p => console.log('    ' + p));
        failed++;
      }
      for(const k of stale) console.log(`  ✗ fixed since it was recorded — delete from ${DEBT_FILE}: ${k}`);
      if(stale.length) failed++;
    }
  } else {
    console.log(`\n✓ ${name} (grade ${grade}): the questions are as small as the sentences${notes.length ? ' — ' + notes.join(', ') : ''}`);
  }
  advice.forEach(a => console.log('  · ' + a));
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

  /**
   * A CHAIN the size the shipped editions ship: five links, every card short.
   * It is in the good fixture on purpose — the limit is five, and a gate that
   * fires at the limit is a gate that would have banned every chain in the repo.
   */
  const chainOk = {
    title: 'Follow the air',
    scene: 'Reyes shows you the meter.',
    game: {
      type: 'CHAIN',
      question: 'Where does the air path become the problem?',
      chain: {
        links: [
          { id: 'a', label: 'Cabin intake', transfers: 'cabin air into the loop' },
          { id: 'b', label: 'Fan', transfers: 'pressure rise to the moving air' },
          { id: 'c', label: 'Filter', transfers: 'air through the barrier' },
          { id: 'd', label: 'Sorbent bed', transfers: 'carbon dioxide out of the air' },
          { id: 'e', label: 'Return duct', transfers: 'treated air back to the cabin' },
        ],
        order: ['a', 'b', 'c', 'd', 'e'], governing: 'c', distractor: 'b',
      },
    },
  };
  /** One link longer, one decoy over, and one card that is a sentence. */
  const chainBig = {
    title: 'Follow all of the air',
    scene: 'Reyes shows you the meter.',
    game: {
      type: 'CHAIN',
      question: 'Where does the air path become the problem?',
      chain: {
        links: [
          ...chainOk.game.chain.links,
          { id: 'f', label: 'Cross-tie duct', transfers: 'air to the other loop' },
          { id: 'g', label: 'The layer is buried and begins to compact', transfers: 'load from everything above it, squeezing the pore space smaller' },
        ],
        order: ['a', 'b', 'c', 'd', 'e', 'f'], governing: 'c', distractor: 'b',
      },
    },
  };

  /**
   * A TRACE the size a sixth grader can hold: three channels, three sources,
   * one of them independent. It is in a passing fixture on purpose — the whole
   * point of the board gate is that TRACE is *allowed* at this level, and a
   * gate that fires on every instance would read as "no instruments below
   * grade 9", which is not the finding.
   */
  const traceOk = {
    title: 'One clock, or really off course',
    scene: 'Reyes shows you the two readings.',
    game: {
      type: 'TRACE',
      question: 'Which measurement stands on its own?',
      trace: {
        channels: [
          { id: 'a', label: 'Range', reading: 'ahead', depends: ['path', 'clock'] },
          { id: 'b', label: 'Doppler', reading: 'ahead', depends: ['path', 'clock'] },
          { id: 'c', label: 'Star camera', reading: 'as predicted', depends: ['path', 'stars'] },
        ],
        resources: [{ id: 'path', label: 'Where it is' }, { id: 'clock', label: 'The ground clock' },
          { id: 'stars', label: 'The stars' }],
        target: 'clock', independent: ['c'],
      },
    },
  };
  /** The same stop as every edition ships it: the AP board, word for word. */
  const traceBig = {
    ...traceOk,
    title: 'Really off course, or one bad clock?',
    game: {
      ...traceOk.game,
      trace: {
        ...traceOk.game.trace,
        channels: [
          ...traceOk.game.trace.channels,
          { id: 'd', label: 'Re-timed data', reading: 'ahead', depends: ['path', 'clock'] },
          { id: 'e', label: 'Onboard sensors', reading: 'no push', depends: ['onboard'] },
        ],
        resources: [...traceOk.game.trace.resources, { id: 'onboard', label: 'Its own sensors' },
          { id: 'sun', label: 'The sun sensor' }],
        independent: ['c', 'e'],
      },
    },
  };
  const filler = (n) => ({ ...good, title: `How much air ${n}` });
  // Three days, because a demanding stop is illegal before day 3 whatever its
  // size, and the board gate has to be tested without that one firing too.
  const threeDays = (last) => ({
    CURRICULUM: { ELEC: [filler(1), filler(2), filler(3), filler(4), last] },
    MISSIONS: [
      { title: 'Day one', stops: [stop('ELEC', 0), stop('ELEC', 1)] },
      { title: 'Day two', stops: [stop('ELEC', 2), stop('ELEC', 3)] },
      { title: 'Day three', stops: [stop('ELEC', 4)] },
    ],
    ROSTER: [person('Reyes')],
  });

  const cases = [
    {
      name: 'a campaign built for the audience',
      content: {
        CURRICULUM: { ELEC: [good, chainOk, { ...good, title: 'How much air' }] },
        MISSIONS: [{ title: 'Day one', stops: [stop('ELEC', 0), stop('ELEC', 1), stop('ELEC', 2)] }],
        ROSTER: [person('Reyes')],
      },
      expect: [],
    },
    {
      name: 'a senior-high campaign in short sentences',
      content: {
        CURRICULUM: { INTEG: [bad, { ...bad, title: 'Which claims deserve the checks' }, hardMath, smushed, chainBig] },
        MISSIONS: [{ title: 'Day one', stops: [stop('INTEG', 0), stop('INTEG', 1), stop('INTEG', 2), stop('INTEG', 3), stop('INTEG', 4)] }],
        ROSTER: ['Reyes', 'Okonkwo', 'Vance', 'Lindqvist', 'Sato'].map(person),
      },
      // Every gate has to fire, and the message has to name which one.
      expect: [/operations/, /over 9999/, /under 0.1/, /too large/, /is \d+ words/, /declares 2 equations/,
        /names 4 people/, /people named across its stops/, /2 stops that ask for judgement/,
        /of \d+ stops ask what the evidence licenses/, /before the player has answered anything/,
        /chain is 6 links long/, /board holds 7 cards/, /chain card 7 .* reads \d+ words/],
    },
    // The board gate, both ways, on the one format the sweep found worst. If
    // these two ever score the same, the gate has stopped measuring the board
    // and is measuring the format — which is the mistake it was written to end.
    { name: 'an instrument board the size of its audience', content: threeDays(traceOk), expect: [] },
    {
      name: 'the same instrument at its AP parent\'s size',
      content: threeDays(traceBig),
      expect: [/TRACE board carries 5 channels/, /offers 5 sources/],
    },
  ];

  let bad_ = 0;
  for (const c of cases) {
    const { problems } = analyse(c.content);
    const missed = c.expect.filter(re => !problems.some(p => re.test(p)));
    const spurious = c.expect.length ? [] : problems;
    // Findings the case did not name. On a fixture that expects nothing they
    // are failures; on one that expects a list they are printed, because a new
    // gate quietly adding findings to an existing fixture is how a checker
    // starts measuring something nobody asked it to.
    if (c.expect.length && verbose) {
      problems.filter(p => !c.expect.some(re => re.test(p)))
        .forEach(p => console.log(`    (also, unnamed by the case) ${p}`));
    }
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
