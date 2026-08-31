// normalize.js — make a theme's content mean the same thing whichever book it
// came from.
//
// Content is generated from design documents by importers that have to map
// every activity onto a format the engine knows. They guess, and they spell
// things differently, and the guesses used to be repaired by hand inside each
// game's theme.js — two files carrying near-identical repair code, which is how
// a repair reaches one game and not the next.
//
// This runs once, in engine/core/theme.js, before any core module reads the
// content. After it, every game's content obeys the same rules:
//
//   · `game.type` is one of the canonical tokens below
//   · a lesson that referenced a diagnosis pack carries the panel itself
//   · a format with no data for its format has been retyped to what it is
//   · every estimate lesson has an entry in BALLPARK_CALCS
//   · every roster entry has a division, or the theme said which one
//
// It reports rather than throws. A theme with a genuine hole should fail its
// conformance check with a sentence a person can act on, not a stack trace at
// the first question panel.

// The near/far split is geometry, and it lives beside the two orientation laps
// that teach it. This file only needs to know which day a far area starts being
// called on.
import { tiersFor, unlockDay } from '../core/orientation.js';

/** The formats the question UI can render. Everything maps onto one of these. */
export const FORMATS = new Set([
  'PROTOCOL', 'SEQUENCE', 'BALLPARK', 'SCIENCETANK',
  'DIAGNOSIS', 'TRIAGE', 'CASEBOOK', 'CHOICE',
  // A continuous control with a response curve: the player moves one knob and
  // the instrument answers, which is the shape of most of the physics in these
  // courses — a resonance, a decay, a calibration, a trade-off.
  'SWEEP',
  // Fit a rule on one set of data, freeze it, and apply it to data it has never
  // seen. The drop between the two numbers is the lesson, and it has to be an
  // event the player causes rather than a sentence they read.
  'HOLDOUT',
  // A statistic assembled out of ordinary repeated measurements: the player runs
  // batches of shots, watches the bins fill, and decides when there is enough
  // data to report the number.
  'TALLY',
  // Readings taken one at a time along a physical chain, so the player finds the
  // fault from where the pattern breaks rather than from a table handed to them
  // with the answer already in it.
  'PROBE',
  // ---- the twelve from FORMATS.md, rendered by engine/core/instruments.js.
  // Six interaction documents, one per game, produced 104 authored interactions
  // that turned out to be nineteen designs; these are the twelve carrying four
  // instances or more. Each is a move a scientist makes that no format above can
  // express.
  'TRIGGER',      // write the rule before the number moves, then be held to it
  'VALUE',        // what would this measurement change? scarcity and orthogonality
  'CLOUD',        // a distribution against a boundary — narrowing is not shifting
  'ALLOCATE',     // a finite pool across claims, scalar or rate × time
  'TRACE',        // which channels share a reference; agreement is not independence
  'ATTEST',       // the record is not the condition
  'CONTROL',      // change one thing, hold the rest, confirm by reversal
  'TRIANGULATE',  // several constraints make a region, and a systematic moves it
  'DEGENERACY',   // a family of solutions fits one observable until other physics arrives
  'CHAIN',        // trace a transfer path and name the governing link
  'BALANCE',      // close the ledger; the removal term does not announce itself
  'VERIFY',       // predict, act, measure — and failing to measure is its own failure
  // ---- Tier 2: two or three authored instances each, and ROUTE with one.
  'PROPAGATE',    // the error budget — which input width dominates the output's
  'STRESS',       // candidates against an assumption's range; the nominal optimum fails
  'DELEGATE',     // a finite team, evolving problems, owner + first action + threshold
  'FLY',          // bounded commands on undamped dynamics — the brake has to lead
  'RESIDUAL',     // structure in what a fit leaves over, against a lower RMS that hides it
  'INJECT',       // push a known population through your own pipeline and count what returns
  'ROUTE',        // a sequence that can be rejoined after an interruption
  // ---- The thirteenth, written for a calculus course.
  'DERIVE',       // build the derivation a line at a time, and name what licenses each
  // ---- Tier 3: the ones that are fun first. Same registry and same contract;
  // what differs is that the move is the player's rather than the scientist's,
  // and one bit of subject matter is carried at speed. See ARCADE.md.
  'BELT',         // a binary category, sorted before it reaches the end of the line
  'TRIAL',        // the route itself, graded on the order rather than the clock
  'HOLD',         // one number under load, held inside a band that closes
  'SPOT',         // an instruction that is replaced without announcement
  'STACK',        // falling blocks with a question rail; a wrong answer costs a row
  'LOB',          // angle, charge and wind, with the launch speed withheld
  // ---- Tier 3, the world-graded five. Same contract again; what they have in
  // common is that the board is the place — see worldFormats.js and ARCADE.md.
  'GREET',        // get round a list of people before the hour is out
  'FOLLOW',       // stay inside a band behind somebody who will not wait
  'HUNT',         // find enough of the same thing, and know when to stop looking
  'CANVASS',      // ask a yes-or-no question until the sample can answer it
  'EVADE',        // hold a clear distance for a stretch of time, using the ground
  'TAG',          // and the same test the other way round: close it, using the ground
]);

/**
 * What KIND of place a format belongs in.
 *
 * Three answers, and the rule they encode is one line: **a question about a thing
 * should be asked in front of that thing.**
 *
 *   · `decision`    — weighing options, defending a call, being talked round.
 *                     Belongs to a PERSON. There is somebody whose job this is.
 *   · `calculation` — working a number, ordering steps, closing a ledger.
 *                     Belongs to a ROOM: a desk, a bench, a board.
 *   · `operated`    — the player drives a control and it answers back.
 *                     Belongs to a FIXTURE — the equipment itself.
 *
 * THIS IS NOT `isInstrument`, and the difference has already cost a wrong guess.
 * `instruments.js` exports `isInstrument(kind)`, which asks *"does instruments.js
 * render this?"* — a fact about a renderer. It answers true for DERIVE and BALANCE,
 * which are a derivation and a ledger and belong at a desk, and for VALUE and
 * ATTEST, which are judgements and belong to a person. Placement and rendering are
 * different questions about the same word, so they get different functions, and
 * this one lives here beside `FORMATS` because that is where the list of formats
 * is. A second copy of either set would drift the first time a format is added.
 *
 * The default is `operated`. A format nobody has classified is far likelier to be
 * one of the thirty-odd live instruments than a fourth kind of conversation, and
 * the failure mode of the wrong default is a stop at a fixture instead of a
 * person — visible, and much cheaper than a control panel driven at a colleague.
 */
export const DECISION_FORMATS = new Set([
  'CHOICE', 'SCIENCETANK', 'CASEBOOK', 'TRIAGE',
  // Judgements with an instrument's panel around them: what a measurement would
  // be worth, whether a record proves a condition, who takes which job, which
  // candidate survives an assumption's range. Every one of them is somebody's
  // call, and the panel is how the call is put rather than a thing to drive.
  'VALUE', 'ATTEST', 'DELEGATE', 'STRESS',
]);

export const CALCULATION_FORMATS = new Set([
  'BALLPARK', 'PROTOCOL', 'SEQUENCE', 'BALANCE', 'DERIVE',
  'PROPAGATE', 'TRIANGULATE', 'DEGENERACY',
  // Reading a panel of numbers and naming what fits all of them. Inference from
  // data at a board, not a control anybody drives and not a call put to a person.
  'DIAGNOSIS',
]);

/** 'decision' | 'calculation' | 'operated', from a raw or canonical type. */
export function stopKind(type){
  const k = canonicalType(type);
  if(DECISION_FORMATS.has(k)) return 'decision';
  if(CALCULATION_FORMATS.has(k)) return 'calculation';
  return 'operated';
}

/**
 * Formats that exist and may not be authored, with the reason.
 *
 * A suspended format keeps its entry in `FORMATS`, its panel in
 * `instruments.js` and its traps — because the fix is meant to arrive, and
 * deleting a format is how the work of rebuilding it starts. What is refused is
 * a *book* authoring one: `import-book.mjs` fails the stop, and the loop below
 * reports any that reached a theme's content, so a game cannot ship one through
 * a stale generated file either.
 *
 * Lift a suspension by deleting the line. Nothing else has to change.
 */
export const SUSPENDED_FORMATS = {
  STACK: 'reported broken in play — suspended until it is fixed and re-driven',
};

/** 'Science Tank' | 'sciencetank' | 'SCIENCE_TANK' -> 'SCIENCETANK'. */
export function canonicalType(type){
  return String(type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
}

/**
 * The most calls a single day may carry, callback included.
 *
 * A day is three authored stops and, from the third day on, a callback — so four
 * is the shape the loop is built around and the clock is budgeted for. Five is a
 * day the player reads as long rather than full: `budgetForRoute` gives travel a
 * little under half the day whatever the stop count, so the fifth call is
 * answered against the same hours as the fourth.
 *
 * It is exported because `engine/dev/dayCalls.mjs` gates on it, and a checker
 * with its own copy of the number is a second description of the rule.
 */
export const MAX_CALLS = 4;

/**
 * The review suffix, in one place.
 *
 * The number is optional: the hospital's 105 variants are numbered
 * (`After the Head Bump — Review 3`) and Red Sand's eight and Sightline's nine
 * are not (`Rate is not yield — Review`). Requiring the digit made the unnumbered
 * ones invisible to the callback picker — two campaigns' review stops were then
 * reachable through no day at all, and the concepts they claim were claimed by
 * nothing.
 */
const REVIEW_SUFFIX = / — Review(?: \d+)?$/;
const baseTitle = (t) => String(t ?? '').replace(REVIEW_SUFFIX, '');
const isReviewTitle = (t) => REVIEW_SUFFIX.test(String(t ?? ''));

/**
 * Normalise in place. Returns `{ changes, problems }` — changes for the log,
 * problems for the conformance check.
 *
 * `content` is the theme's own content block. The optional pieces it may carry:
 *
 *   DIAGNOSIS_PACKS    id -> authored panel, for lessons that reference `pack`
 *   BALLPARK_BY_TITLE  lesson title -> number-tile spec, applied to its reviews
 *   DIVISION_BY_PERSON person id -> group id, for a roster that omits it
 */
export function normalizeContent(content = {}, site = null, fixtures = {}){
  const changes = [];
  const problems = [];
  const curriculum = content.CURRICULUM ?? {};
  // The near/far tiers, measured once from the site and stamped on the content.
  // A caller with no site — a selftest fixture, a tool that hand-builds a
  // campaign — gets one tier, and says so by passing `null` where the site goes.
  // A caller that loaded a theme passes `theme.site`, and that is not optional:
  // without it there are no tiers, `nearFirst` below returns early, and the
  // caller is reading a day order the game does not run. Seven themes shape
  // differently — Aftershock on nine of its fifteen days — and every dev check
  // read the wrong one until `siteNormalize.mjs` was written to fail them.
  if(site && !content.TIERS){
    content.TIERS = tiersFor(site);
    content.UNLOCK_DAY = unlockDay(site);
  }
  // Applied after the lessons are canonical, at the bottom of this function.
  const calcs = content.BALLPARK_CALCS ?? {};
  const packs = content.DIAGNOSIS_PACKS ?? {};
  const specs = content.BALLPARK_BY_TITLE ?? {};

  for(const [group, lessons] of Object.entries(curriculum)){
    if(!Array.isArray(lessons)) continue;
    for(const lesson of lessons){
      const ch = lesson?.game;
      if(!ch) continue;
      const at = `${group} "${lesson.title ?? '?'}"`;

      // ---- 1. one spelling per format
      const kind = canonicalType(ch.type);
      if(ch.type !== kind) changes.push(`${at}: type "${ch.type}" -> ${kind}`);
      ch.type = kind;

      // ---- 2. a pack reference becomes the panel it names
      if(ch.pack){
        const pack = packs[ch.pack];
        if(!pack){
          problems.push(`${at}: references diagnosis pack "${ch.pack}", which the theme does not supply`);
        } else {
          applyPack(ch, pack);
          changes.push(`${at}: expanded pack ${ch.pack}`);
        }
      }

      // ---- 3. a format with no data for its format is not that format
      if(ch.type === 'DIAGNOSIS' && !(ch.readings || []).length && !ch.figure){
        ch.type = 'CHOICE';
        changes.push(`${at}: DIAGNOSIS with no panel -> CHOICE`);
      }
      if(ch.type === 'CASEBOOK'){
        const rows = ch.scenarios || ch.cards;
        const hasMapping = rows?.length && ch.mapping?.length === rows.length;
        const hasRealProposals = ch.proposals?.length > 1
          && ch.proposals.every(p => Number.isFinite(+p.target));
        if(!hasMapping && !hasRealProposals){
          ch.type = 'CHOICE';
          // The placeholders an importer leaves behind — "Other pattern",
          // "Third pattern" — would otherwise be rendered as a funding round.
          delete ch.proposals;
          delete ch.recommended;
          changes.push(`${at}: CASEBOOK with no mapping and no real proposals -> CHOICE`);
        }
      }

      // ---- 4. every estimate has a spec, across its review lessons too
      if(ch.type === 'BALLPARK'){
        const key = `${group}-${lesson.day}`;
        if(!calcs[key]){
          const spec = specs[baseTitle(lesson.title)];
          if(spec){ calcs[key] = spec; changes.push(`${at}: registered estimate spec at ${key}`); }
          else problems.push(`${at}: BALLPARK with no entry in BALLPARK_CALCS and no spec for its title`);
        }
      }

      // ---- 5. an ordering question whose answer is the order it is written in
      if(ch.type === 'SEQUENCE' && Array.isArray(ch.cards) && Array.isArray(ch.order)
         && ch.cards.length >= 3 && ch.order.every((v, i) => v === i)){
        deidentify(ch, `${group}:${lesson.title ?? ''}`);
        changes.push(`${at}: SEQUENCE keyed A→B→C→D, cards re-laid so the answer is not the printed order`);
      }

      // ---- 6. a matching question whose answer is 1→A, 2→B, 3→C, 4→D
      // The same tell as the ordering questions above, in the other format that
      // carries a keyed permutation: all 73 matching items in the seven games were
      // authored with the options listed in the order the scenarios need them, so the
      // printed page — and any UI that does not shuffle — hands the answer over.
      if(Array.isArray(ch.mapping) && Array.isArray(ch.choices)
         && ch.mapping.length >= 3 && ch.mapping.every((v, i) => v === i)){
        deidentifyMapping(ch, `${group}:${lesson.title ?? ''}`);
        changes.push(`${at}: matching keyed 1→A, options re-laid so the answer is not the printed order`);
      }

      if(!FORMATS.has(ch.type)){
        problems.push(`${at}: format "${ch.type}" has no renderer`);
      } else if(SUSPENDED_FORMATS[ch.type]){
        problems.push(`${at}: format "${ch.type}" is suspended — ${SUSPENDED_FORMATS[ch.type]}`);
      }
    }
  }

  // ---- 5. a person stop needs somebody in that group
  const roster = content.ROSTER ?? [];
  const byPerson = content.DIVISION_BY_PERSON ?? {};
  for(const person of roster){
    if(!person.division && byPerson[person.id]){
      person.division = byPerson[person.id];
      changes.push(`roster "${person.id}": division ${person.division} from the theme's map`);
    }
  }
  const covered = new Set(roster.map(p => p.division).filter(Boolean));
  for(const g of content.GROUPS ?? []){
    if(!covered.has(g.id)){
      problems.push(`group "${g.id}" has nobody on the roster — every person stop there is unreachable`);
    }
  }

  // ---- a briefed stop tells its panel to stop lecturing
  //
  // A stop carrying `guide` has one paragraph whose job is the instruction, so the
  // panel's format-level "what you are doing" block is the same thing said again in
  // more words. The four panels in questionUI.js can read the active lesson and
  // suppress it themselves; the 24 in instruments.js are handed nothing but `ch`,
  // deliberately — they take no engine state at all — so the flag has to travel on
  // the challenge. Derived here rather than authored, because a book that had to
  // remember to write both would eventually write one.
  for(const lessons of Object.values(curriculum)){
    for(const lesson of (lessons ?? [])){
      if(!lesson?.game) continue;
      if(String(lesson.guide ?? '').trim() && !lesson.game.briefed){
        lesson.game.briefed = true;
        changes.push(`${lesson.title ?? 'a stop'}: has a guide, so its panel drops the`
          + ' format-level "what you are doing" block');
      }
    }
  }

  // ---- last: the shape of the days themselves
  shapeMissions(content.MISSIONS ?? [], curriculum, changes, content.TIERS, content.UNLOCK_DAY, fixtures);
  primeMissions(content.MISSIONS ?? [], curriculum, content.JARGON ?? [], changes);
  // After shaping, because shaping is what decides which day a lesson lands on:
  // an equation's first day is not knowable until the callbacks exist.
  primeEquations(content.MISSIONS ?? [], curriculum, changes);

  return { changes, problems };
}

/**
 * The words and relationships the day's questions assume, for the plan card.
 *
 * A day card said what had happened and who was arguing about it, and then the
 * first question used "state vector", or wanted an impulse divided by a mass,
 * as though the player had met either. The material to say so was already in the
 * content and nothing read it: `assumes` on every lesson is the prior knowledge
 * its author claimed, `relationship` on an estimate is the formula in words, and
 * the glossary defines the vocabulary.
 *
 * So the primer is derived rather than written — 105 hand-written ones across
 * seven games would drift from the questions the first time a stop moved. A book
 * that wants to say it better writes `primer:` on the mission and that wins.
 *
 * Deliberately not the takeaway: a takeaway is what the day teaches, and this is
 * read before the day. `checkStory` fails a primer holding a day's answer.
 */
export function primeMissions(missions = [], curriculum = {}, jargon = [], changes = []){
  const sentence = (s) => {
    const t = String(s ?? '').trim().replace(/\s+/g, ' ');
    if(!t) return '';
    return (t[0].toUpperCase() + t.slice(1)) + (/[.!?]$/.test(t) ? '' : '.');
  };
  // Three texts per stop, because they earn a term its place differently.
  //
  // `clickable` is the one that decides whether a term is on the card at all: it
  // is the same text `questionUI.termsRow` searches to draw the chips under a
  // question, field for field. A term the player can click on in the question is
  // a term the game has decided that question is written in, so it belongs on
  // the card they read before the day — the card was quietly a shorter list than
  // the chips, and the difference was vocabulary the player met for the first
  // time inside the question it was needed for.
  //
  // `asked` and `taught` no longer gate anything; they rank. `asked` is what the
  // player has to reason over before the verdict exists — the task, the question
  // and every option, card, scenario, given and proposal in front of them.
  // `taught` is the reasoning that arrives afterwards, and a term the day leans
  // on in both places goes on the card ahead of one it only names.
  const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
  const textsFor = (lessons) => lessons.map((l) => {
    const ch = l.game ?? {};
    const parts = [l.title, l.progress, l.takeaway, ch.title, ch.setup, ch.play, ch.task,
      ch.question, ch.headline];
    for(const k of ['cards', 'scenarios', 'choices', 'givens']){
      if(Array.isArray(ch[k])) parts.push(...ch[k].map(v => (typeof v === 'string' ? v
        : `${v?.label ?? ''} ${v?.mechanism ?? ''}`)));
    }
    if(Array.isArray(ch.readings)) for(const r of ch.readings) parts.push(r?.zone, r?.label, r?.value, r?.note);
    if(Array.isArray(ch.proposals)) for(const p of ch.proposals) parts.push(p?.text);
    return {
      clickable: ' ' + parts.filter(Boolean).join('  ').toLowerCase() + ' ',
      asked: [ch.task ?? ch.play, ch.question, ch.headline,
        ...(ch.choices ?? []).map(label), ...(ch.cards ?? []).map(label),
        ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []).map(label),
        ...(ch.proposals ?? []).map(label)].filter(Boolean).join('  ').toLowerCase(),
      taught: [ch.why, ...(l.assumes ?? []), ...(ch.rebuttals ?? []).map(label)]
        .filter(Boolean).join('  ').toLowerCase(),
    };
  });
  const lessonsOf = (m) => (m.stops ?? []).map(s => curriculum[s.group]?.[s.lesson]).filter(Boolean);
  const dayTexts = missions.map(m => textsFor(lessonsOf(m)));

  // Matched at a word start, never with `includes`. A substring test puts Ion on
  // the card because the day said "solution" — Riverton's glossary carries the
  // bare alias "ion", and that is the word it hides inside most often.
  //
  // A suffix is allowed, because the questions inflect: "hydrodynamic tests",
  // "detonators", "isotopes" are the term. Aliases of three characters or fewer
  // have to match a whole word instead, which is what stops "ion" and "pH" from
  // matching half the campaign. Same rule as `make-book.mjs`, deliberately — the
  // print book and the plan card have to agree about what a day says.
  const hit = (text, alias) => {
    const w = String(alias).toLowerCase().trim();
    if(w.length < 2) return false;
    const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^a-z0-9])${e}${w.length <= 3 ? '([^a-z0-9]|$)' : ''}`).test(text);
  };
  const aliasesOf = (t) => [t?.name, ...(t?.aliases ?? [])].filter(Boolean).map(String);

  // How much of the campaign comes back to a term, measured once: the number of
  // days whose reasoning uses it. A word the whole game keeps returning to is a
  // spine of the course; a word two days mention is a supporting term, whatever
  // order the glossary happens to list them in.
  const reach = new Map();
  for(const t of jargon){
    const names = aliasesOf(t);
    reach.set(t, dayTexts.filter(day => day.some(s => names.some(n => hit(s.taught, n)))).length);
  }

  // Skip the entries that define nothing. The docx importers wrote 73 of
  // contamcity's definitions as "a course concept used in Mission 3", which is a
  // note to the author, not something to hand a player.
  const HOLLOW = /course concept used in|should be defined|in the game, the term/i;

  // What the card prints of an entry, and what that sentence itself leans on. A
  // line reading "Cation — a positively charged ion" hands the player one word
  // they have and one they do not, unless Ion came first. So a term's
  // prerequisites are the defined terms named in the sentence the card will
  // print, and they go on the card before it — on this day or an earlier one.
  const printed = (t) => {
    const full = String(t?.def ?? '').replace(/\s+/g, ' ').trim();
    return (full.match(/^[^.!?]*[.!?]/)?.[0] ?? full).trim();
  };
  const singleWord = new Map();
  for(const t of jargon){
    if(!t?.def || HOLLOW.test(t.def)) continue;
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
      const w = String(n).trim().toLowerCase();
      if(!/\s/.test(w) && !singleWord.has(w)) singleWord.set(w, t);
    }
  }
  const prereqsOf = (t) => {
    const own = new Set([t?.name, ...(t?.aliases ?? [])].filter(Boolean).map(n => String(n).toLowerCase()));
    const out = [];
    for(const w of printed(t).toLowerCase().match(/[a-z][a-z0-9'’-]*/g) ?? []){
      const dep = singleWord.get(w);
      if(dep && dep !== t && !own.has(w) && !out.includes(dep)) out.push(dep);
    }
    return out;
  };
  // The chain a term needs, deepest first, skipping anything already on a card.
  // Anything with an entry counts, syllabus or not: if the game thought a word
  // was worth defining, the card owes the player that definition before it uses
  // the word to define something else. The only escape is a cycle — nucleus is
  // defined by its protons and proton by its nucleus — where the seen-guard
  // breaks the loop rather than blocking both.
  const chainFor = (t, introduced, seen = new Set()) => {
    if(seen.has(t)) return [];
    seen.add(t);
    const out = [];
    for(const p of prereqsOf(t)){
      if(introduced.has(p) || seen.has(p)) continue;
      for(const x of chainFor(p, introduced, seen)) if(!out.includes(x)) out.push(x);
      if(!out.includes(p)) out.push(p);
    }
    return out;
  };

  const introduced = new Set();
  let derived = 0;
  for(const [mi, m] of missions.entries()){
    if(Array.isArray(m.primer) && m.primer.some(x => typeof x === 'string' && x.trim())) continue;
    const lessons = lessonsOf(m);
    if(!lessons.length) continue;
    const stopTexts = dayTexts[mi];

    // A term earns a line by being one of the terms the day's questions are
    // written in — the same test that decides whether the player gets a chip to
    // click on. Ties break on what the course is about, then how much of the
    // campaign returns to it, then how hard this day leans on it, then where it
    // first appears.
    //
    // The old test was narrower than the chips in two ways and both cost the
    // player the same thing. It read only the ask — so a term named in the
    // question's title, its setup, or an instrument reading was invisible — and
    // it then dropped anything asked once and reasoned with nowhere as set
    // dressing. A term the game hands the player a definition button for is not
    // set dressing; it is a word that question needs, and the card is where a
    // word that question needs is supposed to arrive.
    const matched = [];
    for(const t of jargon){
      if(!t?.def || HOLLOW.test(t.def)) continue;
      const names = aliasesOf(t);
      const clickable = stopTexts.filter(s => names.some(n => hit(s.clickable, n))).length;
      if(!clickable) continue;
      const asked = stopTexts.filter(s => names.some(n => hit(s.asked, n))).length;
      const taught = stopTexts.filter(s => names.some(n => hit(s.taught, n))).length;
      const at = Math.min(...stopTexts.flatMap((s, i) => names.map(n => {
        const j = s.clickable.indexOf(n.toLowerCase());
        return j < 0 ? Infinity : i * 10000 + j;
      })));
      matched.push({ t, core: t.core ? 1 : 0, reach: reach.get(t) ?? 0, asked, taught, at });
    }
    // Order: what the course is about, then what the campaign keeps returning to,
    // then how hard this day leans on it, then where it first appears. Tie
    // strength inside one day was the only test before, and it cut Spectrum — a
    // syllabus concept four days reason with — from Riverton's first card to make
    // room for Aliquot, on nothing better than which word came first in the text.
    matched.sort((a, b) => b.core - a.core || b.reach - a.reach
      || b.asked - a.asked || b.taught - a.taught || a.at - b.at);
    // Every one of them, prerequisites first, and each introduced once.
    //
    // The card used to take the best two and let the rest go. That was the right
    // answer to the wrong question: it read as a budget on how much vocabulary a
    // player will absorb before a day, when what it actually rationed was how
    // much of the day's own vocabulary they were told about at all. The terms it
    // dropped did not stop existing — they arrived inside a question instead,
    // with a chip to click and no warning, which is the failure the card exists
    // to prevent. So the list is now as long as the day's questions make it.
    //
    // A term is introduced once: re-printing one the player already has is a line
    // spent on nothing, and the sort order decides which day gets to be the one
    // that introduces it. Prerequisites still go in ahead of the term that leans
    // on them, on this day or an earlier one — "Cation — a positively charged
    // ion" hands the player one word they have and one they do not unless Ion
    // came first, and `jargonDepth --check` rule 4 fails a card that does it.
    //
    // A day that comes out with a dozen lines is telling the truth about itself:
    // it is a day that introduces a dozen words. That is a content finding — the
    // card is not the place to hide it.
    const chosen = [];
    for(const { t } of matched){
      if(introduced.has(t) || chosen.includes(t)) continue;
      for(const p of chainFor(t, introduced)) if(!chosen.includes(p)) chosen.push(p);
      chosen.push(t);
    }
    for(const t of chosen) introduced.add(t);
    const terms = chosen.map((t) => {
      // One sentence. A glossary definition can run to forty words, and the plan
      // card is reference — checkStory fails a primer line over thirty-four.
      const def = printed(t);
      return `${t.name} — ${def[0].toLowerCase() + def.slice(1)}`;
    });
    // the formulas, verbatim: an estimate's `relationship` is already one line
    const formulas = [...new Set(lessons.map(l => String(l.game?.relationship ?? '').trim()).filter(Boolean))];
    // and what the questions expect the player to bring with them, less any line
    // the formula above already says — "force applied over a time is an impulse"
    // under "Impulse = force × time" is one line of primer twice
    const said = new Set(formulas.join(' ').toLowerCase().match(/[a-z]{3,}/g) ?? []);
    const assumes = [...new Set(lessons.flatMap(l => l.assumes ?? []).map(sentence).filter(Boolean))]
      .filter(a => (a.toLowerCase().match(/[a-z]{4,}/g) ?? []).some(w => !said.has(w)
        && !['that', 'this', 'with', 'from', 'when', 'what', 'over', 'into', 'they', 'their'].includes(w)));

    // Terms first: they are what the questions are written in. The prose after
    // them — a formula, a sentence of assumed knowledge — is what the four-line
    // rule was really about, so that is what stays capped, and it keeps the whole
    // old budget on a day with no vocabulary of its own to introduce.
    const prose = [...formulas.slice(0, 2), ...assumes].slice(0, Math.max(2, 4 - terms.length));
    const primer = [...terms, ...prose];
    if(!primer.length) continue;
    m.primer = primer;
    // The same terms, structured, for the two surfaces that print them: the plan
    // card renders a definition list rather than a dozen bullets, and `checkStory`
    // needs to know which lines are definitions before it counts prose.
    m.primerTerms = chosen.map(t => ({ name: t.name, def: printed(t) }));
    derived++;
  }
  if(derived) changes.push(`${derived} mission primer(s) derived from the day's glossary terms, relationships and assumptions`);
}

/**
 * The course's essential equations, on the card of the day that first needs one.
 *
 * `import-book` stamps each lesson with the equations it computes or mentions,
 * from the authored list in `tools/syllabus.js`. This rolls that up to the day:
 * every equation a day's questions touch, printed on the plan card, and each one
 * printed once — on the first day that touches it, which is the day before it is
 * needed, because the card is read before the questions are opened.
 *
 * A day that only *mentions* an equation gets it too, and that is the case this
 * exists for. A question that computes one hands the player the relationship in
 * the estimate panel; a question that merely reasons around it never shows it at
 * all, and the player is expected to know the algebra without ever having seen it.
 */
export function primeEquations(missions = [], curriculum = {}, changes = []){
  let printed = 0;
  for(const m of missions){
    const lessons = (m.stops ?? []).map(s => curriculum[s.group]?.[s.lesson]).filter(Boolean);
    const rows = [];
    // DEDUPED WITHIN THE DAY, NOT ACROSS THE CAMPAIGN.
    //
    // This used to carry one `seen` set for the whole fortnight, so an equation
    // was printed on the plan of the first day that touched it and on no later
    // one. A player working the same equation again on day 12 got a plan card
    // that did not mention it, because day 8 had.
    //
    // The rule is now the plain one: a day card shows the equations that day's
    // own questions use. Twice in a fortnight means twice on a plan card.
    const seen = new Set();
    for(const l of lessons){
      for(const eq of l.equations ?? []){
        // An equation reaches a plan card only if a question that day actually
        // works numbers with it. A mention is not a use — see the note in
        // `tools/import-book.mjs`, which no longer stamps mention-only chips at
        // all, so this is belt as well as braces.
        if(!eq?.e || !(eq.computed || eq.demanded)) continue;
        // `card: false` is the third and later equation on a stop that computes
        // several. It stays in the data for the checks and off the cards.
        if(eq.card === false || seen.has(eq.e)) continue;
        seen.add(eq.e);
        // v and s come through with it: the card that prints an equation is the
        // card that has to name its symbols, and dropping them here is what left
        // every plan card showing a formula whose letters were never defined.
        rows.push({ e: eq.e, c: eq.c ?? '', ...(eq.v?.length ? { v: eq.v } : {}),
          ...(eq.s ? { s: eq.s } : {}), ...(eq.computed ? { computed: true } : {}) });
      }
    }
    if(rows.length){ m.equations = rows; printed += rows.length; }
  }
  if(printed) changes.push(`${printed} course equation(s) placed on the day card of a question that uses them`);
}

/**
 * Re-lay an ordering question's cards so the correct order is not the order they
 * are written in.
 *
 * 141 of the 142 ordering questions in the seven games were authored with
 * `order: [0, 1, 2, 3]` — the cards listed in the answer's own sequence. In the
 * game that was hidden by the bank shuffle in `questionUI.js`; anywhere else the
 * authored order shows, which is every printed book, it handed over the answer.
 *
 * This permutes the CARDS and rewrites `order` to point at their new positions, so
 * the keyed sequence — the actual answer, and what the rebuttals are indexed
 * against — is untouched. The permutation is seeded on the lesson, so a card is in
 * the same place every time the game is loaded and in the book printed from it.
 *
 * The rotation is by a stride coprime with the card count, which is a derangement
 * for any n ≥ 3: no card keeps its position, so the result is never the identity
 * and never a simple reversal either.
 */
function deidentify(ch, seedText){
  const n = ch.cards.length;
  let h = 2166136261;
  for(const c of String(seedText)){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  // Strides that share a factor with n would leave some cards in place.
  const strides = [];
  for(let s = 2; s < n; s++) if(gcd(s, n) === 1) strides.push(s);
  if(!strides.length) return;                       // n = 3 with no coprime stride
  const stride = strides[(h >>> 0) % strides.length];
  const start = (h >>> 8) % n;
  // `perm[newIndex] = oldIndex`
  const perm = Array.from({ length: n }, (_, i) => (start + i * stride) % n);
  const cards = perm.map(i => ch.cards[i]);
  const order = ch.order.map(oldIx => perm.indexOf(oldIx));
  if(order.every((v, i) => v === i)) return;        // vanishingly unlikely; leave it
  ch.cards = cards;
  ch.order = order;
}

/**
 * Re-lay a matching question's OPTIONS so the answer is not option order.
 *
 * The scenarios stay put — they are what the rebuttals are written against, one per
 * scenario, in order — and the choices move. `mapping[i]` is the option that answers
 * scenario `i`, so it is rewritten to point at the option's new position: the pairing
 * is identical and only the lettering changes.
 */
function deidentifyMapping(ch, seedText){
  const n = ch.choices.length;
  if(n !== ch.mapping.length) return;              // a partial key; leave it alone
  let h = 2166136261;
  for(const c of String(seedText)){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const strides = [];
  for(let s = 2; s < n; s++) if(gcd(s, n) === 1) strides.push(s);
  if(!strides.length) return;
  const stride = strides[(h >>> 0) % strides.length];
  const start = (h >>> 8) % n;
  const perm = Array.from({ length: n }, (_, i) => (start + i * stride) % n);
  const choices = perm.map(i => ch.choices[i]);
  const mapping = ch.mapping.map(oldIx => perm.indexOf(oldIx));
  if(mapping.every((v, i) => v === i)) return;
  ch.choices = choices;
  ch.mapping = mapping;
}

/**
 * A pack is authored richer than the panel needs: zones keyed by id, readings
 * keyed by id with an observed value and a reference, and hypotheses carrying
 * both a short label and the mechanism behind it. Map it down.
 *
 * `salient` is which readings are drawn as the loud ones. It is authored, and
 * it is deliberately not the answer — the exercise is that the loud readings do
 * not settle it.
 */
function applyPack(ch, pack){
  const salient = new Set(pack.salient ?? []);
  ch.type = 'DIAGNOSIS';
  ch.headline = pack.hook ?? ch.headline;
  ch.play = pack.riddle ?? ch.play;
  // A pack's `salient` list names the readings the puzzle turns on. That is not
  // a severity, and rendering it as one told the player the opposite of the
  // truth: "counts with the detector high voltage off: 0" is the reading that
  // clears the electronics, and it was arriving in alarm red.
  ch.readings = Object.entries(pack.readings ?? {}).map(([id, r]) => ({
    zone: pack.zones?.[r.zone] ?? r.zone,
    label: r.name,
    value: r.observed,
    status: r.status ?? (salient.has(id) ? 'key' : 'normal'),
    note: r.reference ? `Expected: ${r.reference}` : r.purpose,
  }));
  ch.choices = Object.values(pack.hypotheses ?? {})
    .map(h => ({ label: h.label, mechanism: h.choice }));
  // An L4 pack is one no single cause fits: the answer arrives as "A + B" and
  // the panel grades it as a set.
  const answers = String(ch.answer ?? '').split(' + ').map(a => a.trim()).filter(Boolean);
  if(answers.length > 1) ch.correctChoices = answers;
  else ch.correctChoice = answers[0] ?? ch.answer;
  // A pack's `reasons` say why each hypothesis that is not the answer fails,
  // keyed the same way as `hypotheses`. Nothing read them. They are exactly what
  // the verdict's rebuttal list is for, and Project Y authored nine packs' worth
  // — every one of them written, shipped, and never once shown to a player.
  if(pack.reasons && !ch.rebuttals){
    const keyed = new Set(answers);
    const rebuttals = Object.entries(pack.hypotheses ?? {})
      .filter(([, h]) => !keyed.has(h.label))
      .map(([id]) => pack.reasons[id])
      .filter(r => typeof r === 'string' && r.trim());
    if(rebuttals.length) ch.rebuttals = rebuttals;
  }
}

/**
 * The shape of a teaching day, applied to whatever the book wrote.
 *
 * Two things were wrong with the days as authored, and both are structural
 * rather than editorial, so they are fixed here rather than in four books.
 *
 * ## Nobody should walk into the same room three times
 *
 * The design books write a day as one unit on one topic — "The Unknown
 * Containers", "Breathing Room" — and an area is a building, so all three calls
 * landed in the same building. Riverton and the hospital did it on 15 days out
 * of 15. The fix keeps the unit intact: the *first* call on an area is at its
 * room, and any repeat of that area the same day is a person stop, which is
 * somebody standing somewhere else in the town. The lesson is unchanged; only
 * where you answer it moves.
 *
 * ## A unit that closes is never asked about again
 *
 * That is the bigger problem. Blocked practice — all of one topic, then all of
 * the next — is how these books are written and it is how people forget: the
 * material is never retrieved once its unit ends, until the capstone fifteen
 * days later. Spaced retrieval is the best-evidenced intervention in the
 * literature, and the content for it already exists, so from the third day on
 * every day carries one extra call that revisits an area taught earlier.
 *
 * A callback **requires** a `— Review` variant of the lesson, and where the
 * campaign has none for anything it has taught, the day simply has no callback.
 *
 * It re-asked the lesson itself for most of this engine's life, on the argument
 * that re-asking *is* what spacing means. It is not, because the second serving
 * was byte-identical — same scene, same `why`, same four options, same key, and
 * `Second look —` printed on the day plan and nowhere on the card. 295 of the
 * 318 callbacks across the catalogue were that, and the player answers from
 * memory of the option rather than from the physics. Recognition is not
 * retrieval, so the duplicate is worth less than the empty slot.
 *
 * Which makes *which lesson* is called back a different choice: the candidate is
 * picked from the taught lessons that have a review variant, oldest first, and
 * only falls back to plain age when none of them do — at which point no callback
 * is added at all. Picking by age alone left the hospital reaching 10 of its 105
 * variants.
 *
 * Deep Watch needs almost none of the first rule — it was authored interleaved
 * — and Project Y needs none of it.
 */
/**
 * Pull far-ground calls out of the opening days, by swapping rather than moving.
 *
 * A site with two tiers of ground opens the far tier on the unlock day, and the
 * rule is **soft**: the ground is walkable from the first morning, but nothing is
 * *called* out there until the day the second orientation lap and the vehicles
 * arrive. Every campaign with a far tier currently teaches in it on day 1 —
 * Wellmere has seven of its first ten calls out past the glasshouses — so
 * something has to give, and the choice is which.
 *
 * Swapping, not moving. A far call on day 2 trades places with a near call on a
 * later day, so both days keep their stop count, every lesson is still taught,
 * and the books are untouched. What changes is the order two lessons are met in.
 *
 * **Nothing here reasons about equation dependencies, deliberately.** The
 * syllabus lives in `tools/`, the engine does not import it, and a second
 * dependency solver in this file would be a second description of a rule
 * `equationOrder.mjs` already owns. So the swap is conservative — it only ever
 * trades with a day at or after `unlockDay`, which always pushes the far lesson
 * later, never earlier — and `equationOrder` is the guard. If it fails a game
 * after this, the fix is to refuse that swap, not to teach this function about
 * equations.
 *
 * **Nor does it reason about story, for the same reason** — `STORY_SPEC.md`
 * lives in prose, not in this file — so it searches for the *nearest* later day
 * with a legal partner rather than the *latest*. Both keep the far lesson from
 * being taught early, which is all this function is for; searching from the far
 * end instead reaches for whatever the campaign's last days hold, and those are
 * exactly the days rule 3 (every stake names when it is happening) and rule 10
 * (the last two days are fixed: the last reversible moment, then the
 * disposition) make the least safe content to relocate. Planetary Defense's
 * day 15 is entirely its "Disposition the final claims" finale in a near-tier
 * group, and searching from the end made that the first candidate found,
 * pulling it onto day 1.
 *
 * ## The trade it should not make: a stop already sited near
 *
 * A far-GROUP call is not always a far WALK. `PLACEMENT_PASS.md`'s sited calls
 * let a lesson's `at:` point at a fixture under a near MINOR place instead of
 * the lesson's own (far) area — Wellmere's day 1 asks about the crossing
 * block and the trial ring, both far areas, both framed as somebody's own
 * paperwork (two parents pinned above a bench, a plot map on a wall), so a
 * copy posted at the near Site Office costs no fiction and the walk is 20 m,
 * not 155 or 251. Before this, `nearFirst` had no way to know that and would
 * still trade the call away — not because the walk was long, but because it
 * only ever looked at the lesson's own area. Measured on Wellmere, that pulled
 * day 12's Molecular Laboratory lesson onto day 1 to fill the gap: a rust-
 * screen allocation call, before the season has found the rust, on the first
 * morning — the same defect the placement pass exists to catch, one level up.
 *
 * `sitedNear` is deliberately a NARROW mirror of `interiorFixtures.js`'s
 * `sitedAt`, not an import of it: that file pulls in three.js to build actual
 * geometry, which this content-only module — loaded by every dev check,
 * including ones that never touch a browser — has no reason to carry. Both
 * read the same two facts (does the lesson's `at:` resolve to a place other
 * than its own group, and is that place near) off the same data, so they
 * cannot answer the question differently; only `interiorFixtures.js` builds
 * anything from the answer.
 */
function sitedNear(stop, curriculum, fixtures, tiers){
  const at = curriculum?.[stop.group]?.[stop.lesson]?.at;
  if(!at) return false;
  const ownRoom = (fixtures?.[stop.group] ?? []).some(f => f.id === at);
  if(ownRoom) return false;             // in its own (far) room — still far
  const nearPlaces = new Set(tiers?.nearPlaces ?? tiers?.near ?? []);
  for(const [place, list] of Object.entries(fixtures ?? {})){
    if(place === stop.group) continue;
    if((list ?? []).some(f => f.id === at)) return nearPlaces.has(place);
  }
  return false;
}

function nearFirst(missions, tiers, unlockDay, changes, curriculum, fixtures){
  if(!tiers?.hasFar || !(unlockDay > 1)) return;
  const isFar = (s) => tiers.far.includes(s.group) && !sitedNear(s, curriculum, fixtures, tiers);
  const opening = missions.slice(0, unlockDay - 1);
  if(!opening.length) return;

  for(let d = 0; d < opening.length; d++){
    const day = missions[d];
    for(const stop of day.stops ?? []){
      if(!isFar(stop)) continue;
      // Nearest later day first, not latest — see the function doc above.
      let partner = null, from = -1;
      for(let e = unlockDay - 1; e <= missions.length - 1; e++){
        const cand = (missions[e].stops ?? []).find(s =>
          !isFar(s)
          // Neither day may end up calling the same area twice: that is what
          // makes a stop a person hunt three lines further down.
          && !(day.stops ?? []).some(x => x !== stop && x.group === s.group)
          && !(missions[e].stops ?? []).some(x => x !== s && x.group === stop.group));
        if(cand){ partner = cand; from = e; break; }
      }
      if(!partner){
        // Nothing legal to trade with. The far call stays, and it is reported
        // rather than dropped — a silent exception is how a rule stops meaning
        // anything.
        changes.push(`day ${d + 1}: ${stop.group} is far ground and no near call could be traded for it`);
        continue;
      }
      // EVERY AUTHORED FIELD OF THE CALL MOVES WITH IT, and `reason` is one.
      //
      // The first version swapped `group`, `lesson` and `task` and left `reason`
      // where it was, which orphans it in both directions: Wellmere's day 1
      // second call became a Molecular Laboratory question about screenhouse
      // slots while still printing "She is the reason the ground is contested,
      // and her case starts with what a cross is for" under it — a sentence
      // written for a Crossing Hall call on the same morning. Fourteen of its
      // calls read that way and every gate was green, because `reason` is text
      // nothing compares against the lesson it sits on, and because the dev
      // checks used to call `normalizeContent` with no site, so `tiers` was null
      // and this function did nothing under them. The game was the only thing
      // that saw it. Every checker passes the site now — `siteNormalize.mjs`
      // fails one that does not — so this swap is what they read as well. See gamekit/BRIEFING_PASS.md — the reason belongs to the call, not
      // to the slot the call happens to be standing in.
      const a = { group: stop.group, lesson: stop.lesson, task: stop.task, reason: stop.reason };
      stop.group = partner.group; stop.lesson = partner.lesson;
      stop.task = partner.task; stop.reason = partner.reason;
      partner.group = a.group; partner.lesson = a.lesson;
      partner.task = a.task; partner.reason = a.reason;
      changes.push(`day ${d + 1}: far call ${a.group} traded with ${stop.group} from day ${from + 1}`);
    }
  }
}

export function shapeMissions(missions = [], curriculum = {}, changes = [], tiers = null, unlockDay = 0, fixtures = {}){
  if(!Array.isArray(missions) || !missions.length) return missions;
  // Before anything else: the opening days must not call far ground. Person
  // stops and callbacks are decided below, on the days as they finally stand.
  nearFirst(missions, tiers, unlockDay, changes, curriculum, fixtures);
  /** Lessons already taught, oldest first: [group, lessonIndex, title]. */
  const taught = [];
  const calledBack = new Set();
  /**
   * Every `group:lesson` the campaign serves, so a callback never hands out a
   * card some other day already has. Seeded from *every* day's authored stops
   * rather than the days walked so far: a review variant a later day authors
   * directly is still the same card, and the callback is the one of the two that
   * can move.
   */
  const served = new Set();
  for(const m of missions)
    for(const s of (Array.isArray(m?.stops) ? m.stops : []))
      if(!s.callback) served.add(`${s.group}:${s.lesson}`);

  missions.forEach((mission, day) => {
    if(!Array.isArray(mission.stops) || !mission.stops.length) return;
    // Drop any callback a previous run added, so this is idempotent under HMR.
    mission.stops = mission.stops.filter(s => !s.callback);

    // ---- who is a person stop, decided here rather than by a campaign-wide
    // "every third one" rule that knows nothing about the day it lands in.
    //
    // A repeat of an area has to be a person, or the day sends the player into
    // the same room twice. Beyond that every day wants exactly one person stop:
    // the rosters carry three-paragraph teaching bios and a quiz each, and a
    // day with none never opens one. Leaving it to the old rule stacked the two
    // and made 34 of Riverton's 58 calls a person hunt.
    //
    // AND THE FORMAT DECIDES, not just the room. This rule used to look only at
    // whether an area repeated, which is a rule about not walking into the same
    // room twice and knows nothing about what is being asked there. Measured on
    // Red Sand it put eight of fifteen person stops on a format that is not a
    // decision, four of them live instruments — the worst of which had the player
    // holding a reactor at temperature through a wandering feed while standing in
    // a conversation with the analytical chemist. A control panel is not driven at
    // a colleague. See gamekit/PLACEMENT_PASS.md.
    const kindOfStop = (s) => stopKind(curriculum[s.group]?.[s.lesson]?.game?.type);
    // NOT `=== 'decision'`, and the difference is 51 campaigns.
    //
    // The first version of this rule required a decision, which is the ideal and
    // is not what the books were written against: it took the person stop off
    // eight of Project Y's fifteen days and left 51 of 62 themes with a day where
    // the roster is never met and no passage is read. A person stop is where the
    // cast is met and where the money comes from, and deleting a third of them to
    // enforce a preference is a worse game than the one being fixed.
    //
    // So the hard rule only, which is the one that was actually broken: an
    // OPERATED format may not be a person stop, because a control panel is not
    // driven at a colleague. A calculation at somebody's bench is a weaker match
    // and an entirely ordinary thing to do, and `placement.mjs` reports those
    // rather than failing them.
    const canBePerson = (s) => kindOfStop(s) !== 'operated';
    const seen = new Set();
    for(const stop of mission.stops){
      if(seen.has(stop.group)){
        // A repeat still may not be a second visit to the same room. Where the
        // repeat is not a decision the day is better off three calls long: the
        // callback below will find it a different area, and a fourth call that
        // sends the player back through the same door is the thing this rule
        // exists to stop.
        if(canBePerson(stop)){
          if(stop.person !== true){
            stop.person = true;
            changes.push(`day ${day + 1}: second call on ${stop.group} becomes a person stop`);
          }
        } else if(stop.person === true){
          stop.person = false;
          changes.push(`day ${day + 1}: second call on ${stop.group} is operated, so it stays a room`);
        }
      } else {
        seen.add(stop.group);
        stop.person = false;
      }
    }
    if(!mission.stops.some(s => s.person)){
      // The middle of the day, so it is neither the opening nor the close — but
      // only among the calls that may be one at all. A day of three operated
      // calls gets no person stop, and that is the right answer: the alternative
      // is the defect this whole block was rewritten for.
      const eligible = mission.stops
        .map((s, i) => [s, i])
        .filter(([s]) => canBePerson(s));
      if(eligible.length){
        const pick = eligible[Math.min(1, eligible.length - 1)];
        pick[0].person = true;
        changes.push(`day ${day + 1}: call ${pick[1] + 1} becomes the day's person stop`);
      } else {
        changes.push(`day ${day + 1}: no decision-format call, so the day has no person stop`);
      }
    }

    // ---- the callback, from the third day on
    //
    // Only where there is a review variant to serve. A callback that re-asks its
    // own lesson is the same card twice, and the day is better off three stops
    // long than carrying a question the player answers from memory. So the
    // review variant decides the candidate rather than merely dressing it: the
    // oldest taught lesson **that has one**, and no callback where nothing does.
    if(day >= 2 && mission.stops.length < MAX_CALLS){
      // The variant has to be a *different* lesson whose title is the base plus
      // the review suffix `baseTitle` strips. A loose /review/i match finds the
      // lesson itself where the title happens to contain the word — Sightline's
      // "What the review is looking for now" was its own review variant, and the
      // campaign served that card on two consecutive days.
      const reviewFor = (t) => {
        const lessons = curriculum[t.group] ?? [];
        const base = lessons[t.lesson];
        if(typeof base?.title !== 'string' || !base.title) return -1;
        return lessons.findIndex((l, i) =>
          i !== t.lesson && typeof l?.title === 'string'
          && isReviewTitle(l.title) && baseTitle(l.title) === base.title);
      };
      // Nothing is served twice, wherever the first serving came from: a variant
      // already used as a callback, and a variant some day authors directly.
      // `calledBack` keyed the *base* lesson, so one review card could be handed
      // out on three separate days while every key looked distinct.
      const free = (t) => !calledBack.has(`${t.group}:${t.lesson}`) && !seen.has(t.group);
      const unserved = (t) => { const r = reviewFor(t); return r >= 0 && !served.has(`${t.group}:${r}`); };
      // Oldest first, and something not already revisited if there is one — but
      // with six areas and three in the day the early days can run out of fresh
      // material, so a second retrieval of an area already in the day is worth
      // more than none. Both passes want a review variant; without one there is
      // nothing to serve.
      const candidate = taught.find(t => free(t) && unserved(t))
                     ?? taught.find(t => !seen.has(t.group) && unserved(t));
      if(candidate){
        calledBack.add(`${candidate.group}:${candidate.lesson}`);
        const lessons = curriculum[candidate.group] ?? [];
        const base = lessons[candidate.lesson];
        const lessonIdx = reviewFor(candidate);
        served.add(`${candidate.group}:${lessonIdx}`);
        mission.stops.push({
          group: candidate.group,
          lesson: lessonIdx,
          task: `Second look — ${base?.title ?? 'earlier work'}`,
          title: base?.title ?? '',
          // A callback is a room: it is the day's other building, and the point
          // of it is partly that the player goes somewhere else.
          person: false,
          callback: true,
          // WHY THIS ONE, for a call no book wrote. Without it the plan card
          // falls back to the area's `desc`, which is the same sentence every
          // time the day visits that area and says nothing about why it is on
          // *this* day's list — and on a campaign that authors `reason:` per
          // stop, the callback would be the one line still reading as boilerplate.
          reason: base?.title
            ? `A second look at "${base.title}", with what you have learned since`
            : 'Earlier work worth taking again with what you have learned since',
        });
        changes.push(`day ${day + 1}: callback to ${candidate.group} lesson ${lessonIdx}`);
      }
    }

    for(const stop of mission.stops){
      if(!stop.callback) taught.push({ group: stop.group, lesson: stop.lesson });
    }
  });

  // ---- an equation is not introduced before the day something computes it
  //
  // `equationsFor` in the importer attaches an equation to any stop whose prose
  // mentions it, which is right for a stop that uses it and wrong everywhere else.
  // Measured across the ten games rather than guessed: Quantum's day 1 displayed
  // four equations and used one, and the three spare ones were the heaviest
  // relations in the course — both decay laws and the fidelity product, five and
  // seven days before anything asked for them.
  //
  // The importer applies the same rule to what it writes, which is what the printed
  // book shows. This one has to exist as well, and has to run here, because the day
  // an equation actually reaches a player is a *shaped* day: a callback pulls an
  // earlier lesson into a later day, and a repeat becomes a person stop. Ordering by
  // book position got two of Quantum's equations and one of Blackout's wrong.
  //
  // A conceptual identity no question ever computes — the surface code's qubit
  // count, the standard quantum limit — is exempt from the ordering rule and
  // subject only to the cap. Two per card: four formulas on one card is a card
  // nobody reads.
  //
  // And a chip the importer stamped `demanded` is exempt too. That flag says the
  // card's own arithmetic uses the equation — the options and the verdict work
  // numbers with it — so on an early day it is the tool the question is asked
  // with rather than decoration. Blackout's day 1 is what the rule costs without
  // the exception: "current falls by 20×, so loss falls by 400×" over four
  // options, the turns ratio printed beside it, and P = IV dropped from the card
  // because nothing computes it until day 4. The decision is made once, in
  // `tools/syllabus.js` `demandsEquation`, and read here — the engine does not
  // import the syllabus, and a second copy of the rule would drift the first time
  // either was corrected. `engine/dev/equationSupply.mjs` fails a theme where the
  // arithmetic is on the card and the equation is on neither the card nor any
  // earlier day.
  const dayOfLesson = new Map();
  missions.forEach((m, mi) => (m.stops ?? []).forEach(st => {
    const key = `${st.group}:${st.lesson}`;
    const day = mi + 1;
    // First arrival wins: a callback on day 12 does not make day 12 the day.
    if(!dayOfLesson.has(key) || day < dayOfLesson.get(key)) dayOfLesson.set(key, day);
  }));
  const firstComputed = new Map();
  for(const [group, lessons] of Object.entries(curriculum ?? {})){
    (lessons ?? []).forEach((l, li) => {
      const day = dayOfLesson.get(`${group}:${li}`);
      if(!day) return;
      for(const eq of (l.equations ?? [])){
        if(!eq.computed) continue;
        const prev = firstComputed.get(eq.e);
        if(prev === undefined || day < prev) firstComputed.set(eq.e, day);
      }
    });
  }
  let dropped = 0, capped = 0;
  for(const [group, lessons] of Object.entries(curriculum ?? {})){
    (lessons ?? []).forEach((l, li) => {
      if(!l.equations?.length) return;
      const day = dayOfLesson.get(`${group}:${li}`) ?? Infinity;
      const kept = l.equations.filter(eq => {
        if(eq.computed || eq.demanded) return true;
        const first = firstComputed.get(eq.e);
        if(first === undefined || day >= first) return true;
        dropped++;
        return false;
      });
      // Computed first, then the ones this card's arithmetic uses, then the rest:
      // the cap turns the third chip into `card: false`, and capping away the
      // equation the question is worked from is the defect the exception fixes.
      const rank = (eq) => (eq.computed ? 2 : eq.demanded ? 1 : 0);
      kept.sort((a, b) => rank(b) - rank(a));
      if(kept.length > 2) capped += kept.length - 2;
      // `card: false` past the second, not dropped — the cap is about how much fits
      // on a card, and the checks downstream ask what the question actually used.
      kept.forEach((eq, i) => { eq.card = i < 2; });
      if(kept.length) l.equations = kept; else delete l.equations;
    });
  }
  if(dropped || capped){
    changes.push(`equations: ${dropped} not shown before the day they are used, ${capped} trimmed past two per card`);
  }
  return missions;
}
