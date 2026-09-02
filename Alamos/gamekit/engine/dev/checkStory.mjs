// checkStory.mjs — does this game tell a story, and does its day card brief?
//
//   node engine/dev/checkStory.mjs <theme>
//
// Every rule here was bought by a defect that shipped, in prose that read
// perfectly well and passed every other check in this directory:
//
//   * A day card that leaked the answer to a stop the player was about to
//     make. Riverton's "Identify the Unknowns" told you the peak was probably
//     lab contamination, which is the correct answer to that day's Diagnosis.
//   * Fifteen "days" for a five-day lunar return, and an asteroid campaign
//     whose cards said "eleven days before closest approach" and "the
//     encounter is eight years out" three cards apart.
//   * Seventy-four written cast members across five games, named on two cards.
//   * Cards that never said what the player was going to be asked to do.
//
// None of that is catchable by reading one card. All of it is catchable by
// reading fifteen against each other, which is what this does.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { themeDir as resolveTheme } from './registry.mjs';
import { hasTurn, turnSelftest } from './turnRule.mjs';
import { dayBlurb, blurbSentenceCount, sentencesOf, openingSentenceCount,
  OPENING_SENTENCE_CAP } from './dayCard.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

// A time marker: a clock, a calendar, or an elapsed-time phrase. Deliberately
// broad — the rule is that a reader can tell *when*, not that they are told in
// any particular format.
//
// TWO DEFECTS PAID FOR, both found by reading a campaign this gate had passed.
//
// 1. `may` was in the month list, case-insensitively, so the modal verb matched
//    it. Red Sand's sol 8 — "the bed may be at its ceiling" — counted as a card
//    that says when it is happening, and the reported 7 of 15 was really 6. A
//    gate that passes a card for containing the word "may" is a gate reporting a
//    number nobody can act on. `May`, `March` and `August` are months only when
//    capitalised, so they are matched case-sensitively and separately; every
//    other month is unambiguous in English and stays in the insensitive set.
//
// 2. The day-noun list was literal — `day|shift|stage|phase|watch` — so a
//    campaign that counts in sols or levels could not say when it was happening
//    in its own calendar. "On sol 292" tells a reader exactly when. The noun now
//    comes from `manifest.dayNoun`, which is the campaign's own answer, rather
//    than from a list here that has to be extended every time a game picks a new
//    word for a day.
const TIME_INSENSITIVE = new RegExp([
  '\\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|twentieth|twenty-\\w+)\\b',
  '\\b(day|days|hour|hours|week|weeks|month|months|year|years|watch|shift|stage|phase|minute|minutes)\\b',
  '\\b(january|february|april|june|july|september|october|november|december)\\b',
  '\\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\\b',
  '\\b(this morning|tonight|overnight|last night|since|ago|before|after|by sunrise|at dawn)\\b',
  '\\b(19|20)\\d\\d\\b',
].join('|'), 'i');
// Capitalised only. "the bed may be at its ceiling" is not a date; "in May" is.
const TIME_MONTHS_CASED = /\b(May|March|August)\b/;

/**
 * Whether a card says when it is happening.
 *
 * `dayNoun` is the campaign's own word for a day — sol, shift, stage, level —
 * and a card counting in it is a card a reader can place. Pass it in rather than
 * listing the nouns here.
 */
export function saysWhen(text, dayNoun){
  const t = String(text ?? '');
  if(TIME_INSENSITIVE.test(t) || TIME_MONTHS_CASED.test(t)) return true;
  const noun = String(dayNoun ?? '').trim().toLowerCase();
  if(!noun) return false;
  const e = noun.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${e}s?([^a-z0-9]|$)`, 'i').test(t);
}

const argv = process.argv.slice(2);
const themeName = argv.find(a => !a.startsWith('--'));
const writeDebt = argv.includes('--write-debt');
if(argv.includes('--selftest')){ turnSelftest(); timeSelftest(); process.exit(0); }
if(!themeName){
  console.error('usage: node engine/dev/checkStory.mjs <theme|path-to-theme-dir> [--write-debt] [--selftest]');
  process.exit(2);
}
const themeDir = resolveTheme(themeName);

const problems = [];
const notes = [];
const fail = (m) => problems.push(m);
const note = (m) => notes.push(m);

const load = async (rel) => {
  try{ return await import(pathToFileURL(resolve(themeDir, rel)).href); }
  catch{ return null; }
};

// The two content layouts: themes/<name>/content/, and the two older games that
// keep theirs in src/ beside the entry point.
const missionsMod = (await load('content/missions.js')) ?? (await load('src/missions.js')) ?? (await load('missions.js'));
const rosterMod = (await load('content/roster.js')) ?? (await load('src/historicCharacters.js')) ?? (await load('historicCharacters.js'));
const currMod = (await load('content/curriculum.js')) ?? (await load('src/curriculum.js')) ?? (await load('curriculum.js'));
const themeMod = (await load('theme.js')) ?? (await load('src/theme.js'));

const MISSIONS = missionsMod?.MISSIONS ?? missionsMod?.MISSION_DEFS ?? [];
const ROSTER = rosterMod?.ROSTER ?? rosterMod?.HISTORIC_CHARACTERS
  ?? Object.values(rosterMod ?? {}).find(Array.isArray) ?? [];
const CURRICULUM = currMod?.CURRICULUM ?? {};
const manifest = themeMod?.default ?? {};
const grade = Number(manifest?.audience?.grade);

if(!MISSIONS.length){
  console.error(`✗ ${themeName}: no missions found under ${themeDir}`);
  process.exit(1);
}

// Check the day the player gets, not the day the book wrote. `normalize.js` runs
// at load in every game: it reshapes the stops, adds the callback from day 3, and
// derives each mission's primer from its own lessons. Reading the raw file meant
// this checker had never seen a callback stop or a primer at all.
// Without DIAGNOSIS_PACKS a lesson that references one by `pack:` never expands,
// so every instrument panel in the game — its readings, its candidates, its
// answer — was invisible here. Project Y's stage 4 read as six terms of
// vocabulary to this checker and nine to the player, and the leak check in
// section 6 was scanning a diagnosis whose answer it could not see.
const { normalizeContent } = await import('../content/normalize.js');
normalizeContent({
  CURRICULUM, MISSIONS, ROSTER,
  JARGON: currMod?.JARGON ?? [], BALLPARK_CALCS: currMod?.BALLPARK_CALCS ?? {},
  GROUPS: manifest?.content?.GROUPS ?? [],
  DIAGNOSIS_PACKS: currMod?.DIAGNOSIS_PACKS ?? manifest?.content?.DIAGNOSIS_PACKS ?? {},
}, manifest?.site ?? null, manifest?.fixtures ?? {});

// ——— helpers ————————————————————————————————————————————————————————
const plain = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean);
// One copy of the split, shared with the day-card gate. It had its own regex here
// for a while, which is the two-descriptions-of-one-rule defect: the opening card's
// cap and the day blurb's cap have to count the same sentences or a card can pass
// one and fail the other on nothing but punctuation.
const sentences = (s) => sentencesOf(s);

const SYL = (w) => {
  w = String(w).toLowerCase().replace(/[^a-z]/g, '');
  if(!w) return 0;
  if(w.length <= 3) return 1;
  w = w.replace(/(?:es|ed|e)$/, '');
  return (w.match(/[aeiouy]{1,2}/g) || ['x']).length;
};
const fk = (text) => {
  const w = words(text);
  if(w.length < 25) return null;
  const s = (text.match(/[.!?]+/g) || []).length || 1;
  return 0.39 * (w.length / s) + 11.8 * (w.reduce((n, x) => n + SYL(x), 0) / w.length) - 15.59;
};

// What the player will be asked to do today, in the second person.
const TASK = /\b(today|this (shift|watch|stage|phase|day))\b[^.]{0,80}\byou\b/i;

// The brief card style, opted into by the theme. Read once, used by the stake rule
// and by the opening-card rule below — a second `manifest.stakeStyle === 'brief'`
// in the other scope is a second description of the same decision.
const briefStyle = manifest.stakeStyle === 'brief';

const surnames = ROSTER.map(p => String(p.name ?? '').trim().split(/\s+/).pop()).filter(w => w && w.length > 2);

/** Every answer string a day's stops can be spoiled by. */
function answersFor(mission){
  const out = [];
  for(const stop of mission.stops ?? []){
    const lesson = CURRICULUM[stop.group]?.[stop.lesson];
    const g = lesson?.game;
    if(!g) continue;
    for(const v of [g.correctChoice, g.answer, g.solution]) if(typeof v === 'string') out.push(v);
    if(Array.isArray(g.candidates)) for(const c of g.candidates) if(c?.correct && c.label) out.push(c.label);
  }
  return out.filter(a => words(a).length >= 4);
}

// A campaign this short is one sitting, same reasoning as `WARMUP_MIN_DAYS` in
// `engine/core/warmups.js`: nine stops in one sitting has no "tomorrow" for a
// segue to reach toward, so coverage is reported rather than gated below it.
const SEGUE_MIN_DAYS = 4;
// The one phrase this whole rule exists to make unnecessary. Matches loosely
// on purpose — "And then, the next day" or "and, then," both read as the same
// list-of-events defect this is checking for.
const AND_THEN = /\band\b[,\s]*\bthen\b/i;

// ——— rule 11's own gate: the closing card must push, not park ————————
//
// A segue that reads fine in isolation can still be a science recap with a
// "But" bolted on, or the next day's stake said in different words. Four
// checks, each mechanical rather than a literary judgement, because the
// judgement itself stays in `STORY_SPEC.md` rule 10 for a human to read:
//
//   TURN        the card turns — a complication or a forced consequence —
//               in whatever words say it (`hasTurn`, in `turnRule.mjs`). Not
//               the literal word "But" or "Therefore": the idea.
//   CONSEQUENCE something concrete is now at risk — a number, a clock, a
//               named person — not just an abstract "this changes everything"
//   NOT AN ECHO the next mission's stake does not already say the same thing
//   NOT THE TAKEAWAY the segue is not the day's own principle restated
//
// This is new, and most of the campaign catalogue has not had a drama pass
// yet — the debt file below is exactly `curriculum-debt.json`'s shape: a
// gap not listed fails now, a listed gap that has since been fixed fails too
// (with the line to delete named), so the list can only shrink.
const CONSEQUENCE = new RegExp('\\d|\\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve'
  + '|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|dozen'
  + '|percent|per cent)\\b', 'i');
// A first-plus-last-name pair — "Elias Webb" — for a recurring figure who is
// deliberately NOT on the checked roster (see the three-pass brief's mandate
// on this: keeping such a figure off the roster avoids ever colliding with
// `checkNames`'s first-mention rule). A roster surname alone already counts,
// below; this catches everyone else with a human stake in the sentence.
const PROPER_NAME = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/;
const SEGUE_DEBT_FILE = resolve(HERE, 'segue-drama-debt.json');
const readSegueDebt = () => existsSync(SEGUE_DEBT_FILE)
  ? JSON.parse(readFileSync(SEGUE_DEBT_FILE, 'utf8')) : { _comment: '', themes: {} };
const segueDebt = readSegueDebt();
const debtList = new Set(segueDebt.themes?.[themeName] ?? []);
const segueDramaGaps = [];

/** The longest run of `n` words shared verbatim between two texts, or null. */
function sharedRun(a, b, n){
  const strip = (t) => String(t ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const wa = strip(a).split(' '), wb = strip(b).split(' ');
  if(wa.length < n || wb.length < n) return null;
  const runs = new Set();
  for(let k = 0; k + n <= wb.length; k++) runs.add(wb.slice(k, k + n).join(' '));
  for(let k = 0; k + n <= wa.length; k++){
    const r = wa.slice(k, k + n).join(' ');
    if(runs.has(r)) return r;
  }
  return null;
}

// ——— the debt ledgers ————————————————————————————————————————————————
//
// Declared here rather than beside the rules they serve, because the task-clause
// gate below is in this first pass and the other four are in the second, and one
// reader shared between them is one description of the ratchet.
const readListDebt = (file) => existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { _comment: '', themes: {} };
const TASK_DEBT_FILE = resolve(HERE, 'taskclause-debt.json');
const taskDebt = readListDebt(TASK_DEBT_FILE);
const taskDebtList = new Set(taskDebt.themes?.[themeName] ?? []);
const taskGaps = [];

// ——— the checks ————————————————————————————————————————————————————
let named = 0, dated = 0, tasked = 0, briefCards = 0, segued = 0;
const lengths = [], grades = [];

MISSIONS.forEach((m, i) => {
  const where = `${manifest.dayNoun ?? 'Day'} ${i + 1} (${m.title})`;
  const stake = String(m.stake ?? '').trim();

  // 1. There is a card at all. Falling back to `objective` means the player
  //    reads a sentence written for a curriculum designer.
  if(!stake){ fail(`${where}: no stake — the plan card will fall back to the objective`); return; }

  // 2. Length. Too short and it cannot brief; over ~200 nobody reads it. The
  //    floor follows the audience: the hospital says the same four things to a
  //    seven-year-old in ninety words that Riverton needs a hundred and fifty
  //    for, and padding it would be the opposite of the point.
  //
  //    And there is a ceiling for a young audience, which is the half that was
  //    missing. The middle-school editions inherited their openings from the
  //    senior games almost word for word — a mean of 107 words, up to nine
  //    sentences, read before *every* day — and a sixth grader has stopped
  //    reading well before the end of that. The four beats fit in seventy words
  //    when the sentences are short.
  //
  //    And a third style, opted into by the theme: `stakeStyle: 'brief'`. The
  //    long card answers "what has been happening" as well as "what do I do",
  //    and the first half is a fortnight of context read fifteen times. A brief
  //    stake says the one thing that is true this morning and the one thing the
  //    player does about it, in about two sentences — the cast, the argument and
  //    the consequences moving out to the calls, the people and the debrief,
  //    which is where the player meets them anyway.
  //
  //    A brief stake has NO floor. The floor was written against a card that had
  //    to carry a fortnight of context, and the whole claim of the brief style is
  //    that it does not: the shortest true version of "here is what happened and
  //    here is what you do" is the target, and a number that says "not shorter
  //    than this" is an instruction to pad. The ceiling stays, because the failure
  //    the brief style is fixing is length.
  const junior = Number.isFinite(grade) && grade <= 8;
  const brief = briefStyle;
  const floor = brief ? 0 : Number.isFinite(grade) && grade <= 4 ? 70 : junior ? 60 : 90;
  const ceiling = brief ? 70 : junior ? 85 : 200;
  const n = words(stake).length;
  lengths.push(n);
  if(n < floor) fail(`${where}: stake is ${n} words — too short to say what happened, what you decide, and why`);
  else if(n > ceiling && (junior || brief)) fail(`${where}: stake is ${n} words — over ${ceiling} is more than a ${brief ? 'brief stake carries; it is two sentences, not a briefing' : 'this audience reads before every day'}`);
  else if(n > ceiling) note(`${where}: stake is ${n} words`);
  // A pile-up is unreadable however plain its words, and the opening card rule
  // learned that already. Same number, applied to the card read every morning.
  const longest = Math.max(0, ...String(stake).split(/(?<=[.!?])\s+/).map(s => words(s).length));
  if(junior && longest > 24) fail(`${where}: a sentence in the stake runs to ${longest} words — 24 is the limit at grade ${grade}`);

  // 3. Somebody is in it. A card with no people in it is a problem statement.
  const who = surnames.filter(s => stake.includes(s));
  if(who.length) named++;
  briefCards += brief ? 1 : 0;

  // 4. A reader can tell when this is happening, from the first two sentences.
  const opening = sentences(stake).slice(0, 2).join(' ');
  if(saysWhen(opening, manifest.dayNoun)) dated++;

  // 5. It says what the player will be asked to do.
  //
  // Ratcheted like the other four card gates. A campaign re-authored in the
  // imperative — "Derive the speed in glass yourself" — says what the player
  // decides in words this regex cannot see, and the regex is the rule's
  // spelling rather than the rule. So a day listed in the ledger is a recorded
  // gap; a day not listed fails now if it regresses; and a listed day that has
  // since been written the long way fails too, naming the line to delete.
  if(TASK.test(stake)){
    tasked++;
    if(taskDebtList.has(where)){
      fail(`${where}: ${TASK_DEBT_FILE.split('/').pop()} lists this stake as owing the task clause, `
         + 'and it now has one — delete the line');
    }
  } else {
    if(taskDebtList.has(where)) note(`${where}: no "Today you …" clause (recorded debt)`);
    else fail(`${where}: never says what the player decides — no "Today you …" clause`);
    taskGaps.push(where);
  }

  // 5b. See rule 11: the debrief segue, checked wherever one is authored.
  // Coverage across the campaign is reported below, not gated here — a short
  // campaign is not asked for one at all, and a long one earns the note
  // rather than the fail so the file can be picked up gradually.
  const segue = String(m.segue ?? '').trim();
  if(segue){
    segued++;
    if(AND_THEN.test(segue)){
      fail(`${where}: the segue reads "…${segue.match(AND_THEN)[0]}…" — an And Then is the one `
         + `connective this rule bans; make it a But (a complication) or a Therefore (a forced `
         + `consequence) — in any wording, the literal words are not required`);
    }
    if(words(segue).length < 6){
      fail(`${where}: the segue is ${words(segue).length} word(s) — too short to say what happened and what it forces next`);
    }

    // The drama gate: does the closing card actually push the story, per
    // STORY_SPEC rule 10/11 and the three-pass brief's mandate 5. Debt-gated —
    // see the constants above.
    const next = MISSIONS[i + 1];
    const dramaProblems = [];
    if(!hasTurn(segue)){
      dramaProblems.push('does not turn — it carries no complication and no forced consequence, '
        + 'which is the But-or-Therefore rule 11 is named for (any wording will do: "yet", '
        + '"however", clause-initial "so" or "now", "that leaves" — the idea, not the word)');
    }
    if(!CONSEQUENCE.test(segue) && !surnames.some(s => segue.includes(s)) && !PROPER_NAME.test(segue)){
      dramaProblems.push('names no number, clock or person — nothing concrete is at risk in it');
    }
    if(next){
      const echo = sharedRun(segue, String(next.stake ?? ''), 6);
      if(echo) dramaProblems.push(`shares "…${echo}…" with the next stake verbatim — it previews `
        + 'the next card instead of bridging to it');
    }
    const takeawayEcho = sharedRun(segue, String(m.takeaway ?? ''), 6);
    if(takeawayEcho) dramaProblems.push(`shares "…${takeawayEcho}…" with this day's own takeaway — `
      + 'the segue is drama, the takeaway is the principle, and they are not the same job');

    if(dramaProblems.length){
      if(debtList.has(where)){
        note(`${where}: segue owes its drama gate (recorded debt) — ${dramaProblems.join('; ')}`);
      } else {
        fail(`${where}: the segue ${dramaProblems.join('; ')}`);
      }
      segueDramaGaps.push(where);
    } else if(debtList.has(where)){
      fail(`${where}: ${SEGUE_DEBT_FILE.split('/').pop()} lists this segue as owing the drama gate, `
         + 'and it now passes — delete the line');
    }
  }

  // 6. It does not answer the day's own questions. This is the one that
  //    silently ruins a stop: the player reads the answer on the plan card and
  //    then "gets it right".
  const hay = plain(stake);
  for(const answer of answersFor(m)){
    const key = plain(answer);
    if(key.length >= 20 && hay.includes(key)){
      fail(`${where}: the card contains this day's answer verbatim — "${answer.slice(0, 60)}…"`);
    }
  }

  // 7. The primer. Derived by normalize.js from the day's own lessons unless the
  //    book writes one, so an empty primer means a day whose stops declare no
  //    prior knowledge, no formula and no glossary term — worth knowing about.
  //    It is read before the questions, so the leak rule applies to it too.
  const primer = (m.primer ?? []).filter(x => typeof x === 'string' && x.trim());
  if(!primer.length) note(`${where}: no primer — nothing on the card says what the day's questions assume`);
  // The four-line rule was written when the card held two terms and two lines of
  // prose, and it counted both together. The card now carries every term the
  // day's questions hand the player a definition button for, so the cap applies
  // to the prose — the formula and the assumed-knowledge sentences — which is
  // what nobody reads a fifth of. A long term list is not a card that broke the
  // rule; it is a day that introduces that many words, which is worth saying out
  // loud without failing the campaign over it.
  const termLines = (m.primerTerms ?? []).length;
  const prose = primer.length - termLines;
  if(prose > 4) fail(`${where}: primer carries ${prose} lines of prose — four is the most anybody reads before a map`);
  if(termLines > 6) note(`${where}: the card introduces ${termLines} terms — the day's questions are written in that much new vocabulary`);
  for(const line of primer){
    if(words(line).length > 34) fail(`${where}: a primer line runs to ${words(line).length} words — it is reference, not prose`);
    const hay2 = plain(line);
    for(const answer of answersFor(m)){
      const key = plain(answer);
      if(key.length >= 20 && hay2.includes(key)){
        fail(`${where}: the primer contains this day's answer verbatim — "${answer.slice(0, 60)}…"`);
      }
    }
  }

  // 8. Reading level, against the audience the theme declares.
  const g = fk(stake);
  if(g != null){
    grades.push(g);
    if(Number.isFinite(grade) && g > grade + 2){
      fail(`${where}: stake reads at grade ${g.toFixed(1)}, and the theme is written for grade ${grade}`);
    }
  }
});

// ——— day-card shape: brief, and names live on the calls ————————————————
//
// The complaint this exists for: the opening blurb (stake + any distinct
// briefing) had grown past what a player reads before every stop, and it and
// the closing card were carrying "who said what" cast business that belongs
// on the calls — a stake or a segue is the event and its turn, not a roll
// call. Ratcheted the same way as the drama gate above: a mission not listed
// in the debt file fails now if it violates; one listed there that has since
// been fixed fails too, naming the line to delete.
const STAKE_LENGTH_DEBT_FILE = resolve(HERE, 'stakelength-debt.json');
const OPENING_LENGTH_DEBT_FILE = resolve(HERE, 'openinglength-debt.json');
const NAMEFREE_DEBT_FILE = resolve(HERE, 'namefree-debt.json');
const REASON_DEBT_FILE = resolve(HERE, 'reasoncoverage-debt.json');
const SEGUE_GRADE_DEBT_FILE = resolve(HERE, 'seguegrade-debt.json');
const stakeLengthDebt = readListDebt(STAKE_LENGTH_DEBT_FILE);
const openingLengthDebt = readListDebt(OPENING_LENGTH_DEBT_FILE);
const nameFreeDebt = readListDebt(NAMEFREE_DEBT_FILE);
const reasonDebt = readListDebt(REASON_DEBT_FILE);
const segueGradeDebt = readListDebt(SEGUE_GRADE_DEBT_FILE);
const stakeLengthDebtList = new Set(stakeLengthDebt.themes?.[themeName] ?? []);
const openingLengthDebtList = new Set(openingLengthDebt.themes?.[themeName] ?? []);
const nameFreeDebtList = new Set(nameFreeDebt.themes?.[themeName] ?? []);
const reasonDebtList = new Set(reasonDebt.themes?.[themeName] ?? []);
const segueGradeDebtList = new Set(segueGradeDebt.themes?.[themeName] ?? []);
const stakeLengthGaps = [];
const openingLengthGaps = [];
const nameFreeGaps = [];
const reasonGaps = [];
const segueGradeGaps = [];
// A flat grade-6.5 ceiling, not the campaign's own `audience.grade` — the
// closing card is a motivating beat between missions, not the taught content,
// so it is held to the same "hard concepts explained for sixth graders" bar
// as everything else this repo authors for a reader rather than a curriculum.
// Flesch-Kincaid alone would pass "watched in silence by the crew who set
// them by feel for forty-one years" — short words, one clause — so this is a
// necessary-but-not-sufficient gate: it catches long/heavy prose, not passive
// or abstract phrasing, which stays a human judgement call.
const SEGUE_GRADE_CEILING = 6.5;

// Only a roster surname counts here, deliberately narrower than the drama
// gate's own "First Last" pattern above — that pattern matches "Mast Base" or
// "Sluice Control" just as readily as it matches a person, which is fine when
// the gate is looking for *any* concrete anchor but not fine when the gate is
// asking "does this name a person" and expects the answer to be reliable.
const namesSomebody = (text) => {
  const t = String(text ?? '');
  return surnames.some((s) => new RegExp(`(^|[^A-Za-z])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`).test(t));
};

MISSIONS.forEach((m, i) => {
  const where = `${manifest.dayNoun ?? 'Day'} ${i + 1} (${m.title})`;

  const blurbLen = blurbSentenceCount(m);
  if(blurbLen > 4){
    if(stakeLengthDebtList.has(where)) note(`${where}: opening blurb runs ${blurbLen} sentences (recorded debt)`);
    else fail(`${where}: opening blurb (stake + briefing) runs ${blurbLen} sentences — four is the limit`);
    stakeLengthGaps.push(where);
  } else if(stakeLengthDebtList.has(where)){
    fail(`${where}: ${STAKE_LENGTH_DEBT_FILE.split('/').pop()} lists this stake as owing the length gate, `
       + 'and it now passes — delete the line');
  }

  const { stake: blurbStake, briefing: blurbBriefing } = dayBlurb(m);
  const blurbText = [blurbStake, blurbBriefing].filter(Boolean).join(' ');
  const segueText = String(m.segue ?? '').trim();
  const namedOn = [];
  if(namesSomebody(blurbText)) namedOn.push('the opening blurb');
  if(segueText && namesSomebody(segueText)) namedOn.push('the closing card');
  if(namedOn.length){
    if(nameFreeDebtList.has(where)) note(`${where}: ${namedOn.join(' and ')} name somebody (recorded debt)`);
    else fail(`${where}: ${namedOn.join(' and ')} name somebody — that belongs on the call's own reason, `
       + 'not the plan card or the debrief');
    nameFreeGaps.push(where);
  } else if(nameFreeDebtList.has(where)){
    fail(`${where}: ${NAMEFREE_DEBT_FILE.split('/').pop()} lists this day as naming somebody on the blurb `
       + 'or segue, and it now does not — delete the line');
  }

  if(segueText){
    const sg = fk(segueText);
    if(sg != null && sg > SEGUE_GRADE_CEILING){
      if(segueGradeDebtList.has(where)) note(`${where}: closing card reads at grade ${sg.toFixed(1)} (recorded debt)`);
      else fail(`${where}: closing card reads at grade ${sg.toFixed(1)} — ${SEGUE_GRADE_CEILING} is the ceiling, `
         + 'direct sentences a sixth grader reads easily, not literary ones');
      segueGradeGaps.push(where);
    } else if(segueGradeDebtList.has(where)){
      fail(`${where}: ${SEGUE_GRADE_DEBT_FILE.split('/').pop()} lists this closing card as owing the `
         + 'reading-grade gate, and it now passes — delete the line');
    }
  }

  for(const stop of m.stops ?? []){
    const lesson = CURRICULUM[stop.group]?.[stop.lesson];
    if(!lesson?.game) continue;
    const stopWhere = `${where} — "${stop.title ?? lesson.title ?? ''}"`;
    if(!String(stop.reason ?? '').trim()){
      if(reasonDebtList.has(stopWhere)) note(`${stopWhere}: no reason (recorded debt)`);
      else fail(`${stopWhere}: no reason — every call needs one line saying why it matters today, since `
         + 'names now live there instead of the plan card');
      reasonGaps.push(stopWhere);
    } else if(reasonDebtList.has(stopWhere)){
      fail(`${stopWhere}: ${REASON_DEBT_FILE.split('/').pop()} lists this stop as missing a reason, and it `
         + 'now has one — delete the line');
    }
  }
});

// ——— campaign-level ————————————————————————————————————————————————
const total = MISSIONS.length;
// A brief stake has no room for a name and is not meant to carry one: naming
// one of thirteen people in forty words spends a quarter of the card on somebody
// the player has not met yet, and the roster is met on the calls instead. So the
// rule is suspended for a campaign that opted into the style — but only in the
// direction that matters. A brief campaign that *does* name people everywhere is
// still fine; one that names nobody anywhere and is NOT brief is the failure this
// was written for.
// AND THE CAST COUNTS WHEREVER IT IS MET, which is the fix for a contradiction
// this file carried in two rules a hundred lines apart. The rule just above fails
// each day whose plan card names somebody — "that belongs on the call's own
// reason" — while this one failed the campaign if fewer than 80% of plan cards
// named somebody. Both read the same surname list, so a non-brief campaign not
// listed in `namefree-debt.json` could satisfy neither: Project Y wrote fifteen
// stakes with a person in each, went from 18 problems to 15, and reverted to
// reach 1. 57 of 62 themes only escaped through the debt file.
//
// So a campaign that moved its cast onto the calls has met the roster, and the
// count says so. What still fails is the campaign this rule was written for — one
// where the cast appears nowhere the player reads at all.
const namedOnCalls = MISSIONS.filter(m => (m.stops ?? []).some(st => namesSomebody(st.reason)))
  .length;
const metAnywhere = Math.max(named, namedOnCalls);
if(!briefCards && metAnywhere < Math.ceil(total * 0.8)){
  fail(`only ${metAnywhere} of ${total} cards meet anybody from the ${ROSTER.length}-person roster, `
     + 'on the plan card or on one of the day\'s own calls — a campaign of problem statements '
     + 'rather than a story');
} else if(!briefCards && named < Math.ceil(total * 0.8)){
  note(`${named} of ${total} plan cards name the cast, and ${namedOnCalls} of ${total} days meet `
     + 'somebody on a call instead — which is where the name-free rule above puts them');
} else if(briefCards && named < Math.ceil(total * 0.8)){
  note(`${briefCards} of ${total} cards are brief stakes, so the roster is met on the calls `
     + `and in the debrief rather than on the plan card (${named} of ${total} name anybody)`);
}
if(dated < Math.ceil(total * 0.8)){
  fail(`only ${dated} of ${total} cards say when they are happening in their first two sentences`);
}
if(!manifest.dayNoun){
  note(`no dayNoun in the manifest, so the plan card says "Day N" — right only if a mission really is a day`);
}
if(total >= SEGUE_MIN_DAYS){
  // The last day never carries one (rule 11, same as the takeaway), so it is
  // excluded from the denominator rather than counted as a miss forever.
  const eligible = Math.max(0, total - 1);
  note(`${segued}/${eligible} day(s) carry a debrief segue (rule 11) — `
     + (segued === eligible ? 'every one that can have one does' : 'coverage, not a gate, while this rule is adopted'));
}

// ——— the scaffold's own words ————————————————————————————————————————
//
// `carrying` shipped its ENDING as the template's instructions to the author:
// "Say how it came out, in the same voice: what held, what it cost, and what
// the next crew inherits." … "Then say what the player did … you held the
// corridor, you brought them up, you are the reason it reads that way."
// A player who finished fifteen days closed the campaign on a specification for
// the paragraph they were supposed to get, including a reference to holding a
// corridor, which is Blackout's fiction.
//
// Every other check in this file passed it, and the ending check passed it for
// the worst possible reason: the rule is "the last paragraph is addressed to the
// player and says what they did", and the placeholder *quotes an example* of
// exactly that — "you held the corridor, you brought them up". A measurement
// that produces a plausible answer, arriving through the one door where the
// thing being measured is a description of itself.
//
// So: no shipped card may share a sentence with the scaffold. The comparison is
// against `themes/_template/theme.js` itself rather than against a copy of its
// text, because two copies of one string drift the first time either is edited.
{
  // Read the scaffold's two card blocks as text, not the whole file and not the
  // module. Joining every quoted string in the file puts unrelated keys between
  // the sentences and the boundaries move; importing it depends on the scaffold's
  // generated content still being loadable, which it is not, and a try/catch
  // round that is a check that silently does nothing.
  const TMPL = resolve(HERE, '..', '..', 'themes', '_template', 'theme.js');
  let scaffold = null;
  try{
    const src = readFileSync(TMPL, 'utf8');
    const block = (key) => {
      const a = src.indexOf(`  ${key}: [`);
      if(a < 0) return '';
      const b = src.indexOf('\n  ],', a);
      return b < 0 ? '' : src.slice(a, b);
    };
    const quotes = (t) => (t.match(/'((?:[^'\\]|\\.)*)'/g) ?? [])
      .map(q => q.slice(1, -1).replace(/\\'/g, "'")).join('');
    scaffold = quotes(block('opening')) + ' ' + quotes(block('ending'));
  }catch{ scaffold = null; }
  if(scaffold === null){
    note('the scaffold at themes/_template/theme.js could not be read, so shipped cards '
       + 'were not compared against it — carrying shipped the template\'s own ending once');
  } else if(themeName !== '_template'){
    const strip = (t) => String(t ?? '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
    const sents = (t) => strip(t).split(/(?<=[.!?])\s+/);
    // The scaffold's text with punctuation stripped is one run; split the shipped
    // card the same way and look for a long shared run rather than a sentence, so
    // a placeholder edited at one comma is still caught.
    const flat = (paras) => strip((paras ?? []).map(p => String(p ?? '')).join(' '));
    const sc = strip(scaffold).split(' ');
    const RUN = 10;                    // ten words of the scaffold verbatim
    const runs = new Set();
    for(let k = 0; k + RUN <= sc.length; k++) runs.add(sc.slice(k, k + RUN).join(' '));
    for(const [where, paras] of [['opening', manifest.opening], ['ending', manifest.ending]]){
      const w = flat(paras).split(' ');
      let hit = null;
      for(let k = 0; k + RUN <= w.length && !hit; k++){
        const r = w.slice(k, k + RUN).join(' ');
        if(runs.has(r)) hit = r;
      }
      if(hit){
        fail(`the ${where} card is still the scaffold's own text — "${hit.slice(0, 64)}…" `
           + 'is the instruction to the author, not the card the player reads');
      }
    }
    void sents;
  }
}

// ——— the opening card ————————————————————————————————————————————————
//
// The first thing anybody reads, and the one card with no day behind it to make
// it concrete. Two games shipped without one at all — `opening` is optional in
// the manifest and nothing looked — and the rest were swept against four beats:
// what has happened and to whom; the job stated as authority; the clock or the
// argument; and, last, what it costs in people.
//
// The failure this exists for is the INVENTORY OPENING. Red Sand's first version
// was nine modules, eighteen hundred square metres of panel and an ascent
// vehicle four hundred metres past the last of them — every fact true, nobody in
// it, and a specification for a closing line. A reader finished it knowing the
// dimensions of the place and nothing about why anyone should care, because the
// thing at stake (six people do not leave for another twenty-six months) was
// never in the paragraph.
{
  const paras = (manifest.opening ?? []).filter(p => String(p ?? '').trim());
  const card = paras.join(' ').trim();
  const n = words(card).length;
  if(!card){
    fail('no opening card — `opening` in the manifest is what the title screen prints, '
       + 'and without it the game opens on a blank');
  } else {
    if(paras.length > 1){
      fail(`the opening is ${paras.length} paragraphs — it is one paragraph of situation, and the `
         + 'second one has always turned out to be mechanics or a disclaimer');
    }
    // FIVE SENTENCES. The day blurb is capped at four, and for most of this
    // engine's life the opening card was capped at nothing but a word count — so
    // openings drifted to nine, twelve and seventeen sentences while every gate
    // stayed green, because 180 words of short sentences is under the word note
    // and unreadable before a single day has started. One more sentence than a
    // day card, because the opening carries four beats and a day card carries
    // one. Counted with the day gate's own splitter, so the two caps cannot
    // disagree about what a sentence is.
    //
    // Ratcheted like the stake-length gate beside it: a theme not listed in the
    // debt file fails now if it runs long, and a theme listed there whose card
    // has since been cut fails too, naming the line to delete.
    const openingSentences = openingSentenceCount(paras);
    if(openingSentences > OPENING_SENTENCE_CAP){
      if(openingLengthDebtList.has('opening')){
        note(`the opening card runs ${openingSentences} sentences (recorded debt)`);
      } else {
        fail(`the opening card runs ${openingSentences} sentences — ${OPENING_SENTENCE_CAP} is `
           + 'the limit, and a day card is four');
      }
      openingLengthGaps.push('opening');
    } else if(openingLengthDebtList.has('opening')){
      fail(`${OPENING_LENGTH_DEBT_FILE.split('/').pop()} lists this opening as owing the length `
         + `gate, and it now runs ${openingSentences} sentence(s) — delete the line`);
    }
    // Thin cards cannot carry four beats; long ones stop being read. Outbreak's
    // was 41 words and said nothing about what being late costs.
    // No floor under the brief style, for the reason the stake has none: the four
    // beats are a checklist of what must be *in* the card, and they are each
    // checked directly below. A word count on top of them only ever says "say it
    // at greater length", which is the thing being removed.
    const floor = briefStyle ? 0 : Number.isFinite(grade) && grade <= 4 ? 55 : 70;
    if(n < floor) fail(`the opening is ${n} words — too short to say what has happened, what your job is, and what it costs`);
    else if(n > 180) note(`the opening is ${n} words`);

    // The job, as authority. Every one of them says it in the same breath: "You
    // are the duty engineer, which means the release ordered each morning is
    // ordered by you."
    if(!/\byou (are|have|lead|run|direct|command|own)\b/i.test(card)){
      fail('the opening never says what the player is — "You are the …, which means …" is the beat');
    }
    // Mechanics belong in the first minute of play, not in front of it.
    // `points` is not on this list as a bare word: "Marsh points out that…" is
    // ordinary prose and the first card written after this rule went in was
    // failed for it. Scoring words have to look like scoring.
    const MECHANICS = /\b(press the|click|keyboard|mouse|menu|wasd|score|points for|points scored|per cent complete|three stops|each mission|the clock runs|time limit)\b/i;
    const m = card.match(MECHANICS);
    if(m) fail(`the opening explains a mechanic ("${m[0]}") — that is the first minute of play, not the card before it`);

    // The last sentence is where the cost goes. A closing line with no number,
    // no time and nobody in it is the inventory opening's signature: it ends on
    // a specification and the reader is left to supply the consequence.
    // Written-out numbers count: these games say "four million people" and "three
    // point nine tonnes" far more often than they print a digit. `every` and
    // `both` are deliberately not on the list — "every sol since the spring" is
    // the closing line this rule was written to catch.
    const NUM = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty|thirty'
      + '|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|dozen';
    const STAKE = new RegExp('\\d|\\b(' + NUM + '|people|person|crew|patient|patients|household'
      + '|households|famil\\w+|child|children|nobody|somebody|everybody|city|town|village|villages'
      + '|home|hospital|hospitals|day|days|hour|hours|week|weeks|month|months|year|years|decade'
      + '|fortnight|window)\\b', 'i');
    const closing = sentences(card).at(-1) ?? '';
    const namesSomebody = surnames.some(s => closing.includes(s));
    if(!STAKE.test(closing) && !namesSomebody){
      fail(`the opening ends on "${closing.trim().slice(0, 72)}…" — a closing line with no number, `
         + 'no clock and nobody in it is a specification rather than a stake');
    }
    // THE ROSTER-NAME RULE IS GONE, deliberately, and this comment is what is left
    // of it. For a while this failed a card that named nobody, on the argument that
    // an argument with no people in it reads as a property of the place. What that
    // produced was cards that spent two sentences introducing two people and their
    // disagreement before saying what the fortnight was for — "Ada Verhoeven, the
    // board chair, wants the rate fixed on Friday. Emil Radic, the board's
    // statistician, has three weeks of price data" — and the introduction is a beat
    // the day cards do better, at the moment the person is standing in front of
    // you. The opening card is the mission and the delivery: what has happened,
    // what your signature is on, what has to be handed over at the end, what one
    // day of it produces, and what it costs. The cast is introduced by
    // `checkNames`/`introRule` wherever it is first named, which is now usually a
    // day-1 stake.
    //
    // What still holds, above: one paragraph, the authority clause, no mechanics,
    // no sentence over 40 words, and a closing line with a number or a clock in it.
  }
}

// ——— the ending card ——————————————————————————————————————————————
//
// The last thing anybody reads, and for most of this engine's life it was the
// words "Campaign complete" in the corner of the HUD. `ending` fixed that, and
// then the endings said what came of the fortnight and what it cost and never
// once said who had done it — a player who has just held a corridor for
// fourteen days closes the game on a paragraph about a report.
//
// So: the campaign ends, and the last paragraph is addressed to the player and
// says what they did. What this can see is the second person and a past-tense
// claim next to it; what it cannot see is whether the credit is deserved or
// merely loud, which is a reading job. Two things a paragraph like this must
// not do are already gated elsewhere — `checkVoice` catches the slogan, and no
// new fact should arrive in it.
{
  const paras = (manifest.ending ?? []).filter(p => String(p ?? '').trim());
  if(!paras.length){
    fail('no ending card — `ending` in the manifest is what the last mission earns, and '
       + 'without it a campaign finishes on a HUD label');
  } else {
    const last = String(paras.at(-1));
    const yous = (last.match(/\byou(r|rs)?\b/gi) ?? []).length;
    // A past-tense verb within reach of a "you": "you checked", "you brought
    // them up", "You did all of that". The irregulars are listed because the
    // -ed rule cannot see them and half these games close on one.
    const IRREGULAR = 'did|drove|brought|held|found|built|kept|made|took|wrote|told|showed|spent'
      + '|shed|read|ran|grew|gave|got|went|stood|won|left|put|set|said|laid|drew|bent|sent';
    const credit = new RegExp(`\\byou\\b[^.!?]{0,40}?\\b(?:\\w+ed|${IRREGULAR})\\b`, 'i').test(last)
      || /\b(because of|down to|thanks to|that was) you\b/i.test(last);
    if(yous < 2){
      fail(`the ending's last paragraph says "you" ${yous} time(s) — the campaign closes on `
         + 'what the player did, not only on what came of it');
    } else if(!credit){
      fail('the ending\'s last paragraph addresses the player but never says what they did — '
         + '"you checked the instruments the decisions rested on" is the beat');
    }
  }
}

// ——— write the segue-drama debt, instead of reporting ————————————————
if(writeDebt){
  segueDebt._comment = segueDebt._comment || 'Closing-card segues that do not yet pass the rule 10/11 '
    + 'drama gate (checkStory.mjs): no turn (neither complication nor forced consequence, in any '
    + 'wording), nothing concrete at risk, or an echo of the next '
    + 'stake or this day\'s own takeaway. A day not listed here fails immediately if it regresses; a '
    + 'day listed here that now passes fails too, naming the line to delete. Shrinks as the three-pass '
    + 'brief (THREE_PASS_BRIEF.md) reaches each campaign.';
  segueDebt.themes = segueDebt.themes ?? {};
  if(segueDramaGaps.length) segueDebt.themes[themeName] = segueDramaGaps;
  else delete segueDebt.themes[themeName];
  writeFileSync(SEGUE_DEBT_FILE, JSON.stringify(segueDebt, null, 2) + '\n');
  console.log(`wrote ${SEGUE_DEBT_FILE}: ${themeName} owes the drama gate on `
    + `${segueDramaGaps.length} of ${segued} segue(s)`);

  const writeListDebt = (file, debt, comment, gaps) => {
    debt._comment = debt._comment || comment;
    debt.themes = debt.themes ?? {};
    if(gaps.length) debt.themes[themeName] = gaps;
    else delete debt.themes[themeName];
    writeFileSync(file, JSON.stringify(debt, null, 2) + '\n');
    console.log(`wrote ${file}: ${themeName} owes ${gaps.length}`);
  };
  writeListDebt(TASK_DEBT_FILE, taskDebt,
    'Missions whose stake does not say what the player decides in the "Today you …" shape '
    + '(checkStory.mjs). A campaign written in the imperative says it in words the rule\'s regex '
    + 'cannot see. Same ratchet as the other debt files here.', taskGaps);
  writeListDebt(STAKE_LENGTH_DEBT_FILE, stakeLengthDebt,
    'Missions whose opening blurb (stake + any distinct briefing) runs past four sentences '
    + '(checkStory.mjs). A day not listed fails now if it regresses; one listed here that has '
    + 'since been fixed fails too, naming the line to delete.', stakeLengthGaps);
  writeListDebt(OPENING_LENGTH_DEBT_FILE, openingLengthDebt,
    'Themes whose opening card runs past five sentences (checkStory.mjs). The day blurb is '
    + 'capped at four and the opening at five, counted by the same splitter. A theme not listed '
    + 'fails now if it runs long; one listed here that has since been cut fails too, naming the '
    + 'line to delete.', openingLengthGaps);
  writeListDebt(NAMEFREE_DEBT_FILE, nameFreeDebt,
    'Missions whose opening blurb or closing card names somebody (checkStory.mjs) — names belong '
    + "on the call's own reason instead. Same ratchet as the other debt files here.", nameFreeGaps);
  writeListDebt(REASON_DEBT_FILE, reasonDebt,
    'Stops with no authored `reason` (checkStory.mjs) — every call needs one line saying why it '
    + 'matters today. Same ratchet as the other debt files here.', reasonGaps);
  writeListDebt(SEGUE_GRADE_DEBT_FILE, segueGradeDebt,
    `Closing cards reading above grade ${SEGUE_GRADE_CEILING} (checkStory.mjs) — a flat ceiling, not `
    + "the campaign's own audience grade, since the closing card motivates rather than teaches. Same "
    + 'ratchet as the other debt files here.', segueGradeGaps);
  process.exit(0);
}

// ——— report ————————————————————————————————————————————————————————
const mean = (a) => a.reduce((x, y) => x + y, 0) / (a.length || 1);
if(notes.length){
  console.log(`\n${notes.length} note(s):`);
  for(const n of notes) console.log('  · ' + n);
}
if(problems.length){
  console.log(`\n✗ theme "${themeName}" story: ${problems.length} problem(s)`);
  for(const p of problems) console.log('  ✗ ' + p);
  process.exit(1);
}
console.log(`\n✓ theme "${themeName}" tells a story: ${named}/${total} cards name the cast, `
  + `${dated}/${total} say when, ${tasked}/${total} say what you decide, `
  + `${Math.round(mean(lengths))} words and grade ${mean(grades).toFixed(1)} on average`);


// ——— the time-anchor selftest ——————————————————————————————————————————
/**
 * The pairs are the point again.
 *
 * This rule passed a card for containing the word "may", which is how a
 * measurement reports a number nobody can act on. So the cases below are mostly
 * pairs: the modal against the month, and one campaign's day noun against
 * another's, which have to score the same as each other and differently from the
 * words that only look like dates.
 *
 * PUT THE BUG BACK to see it work. Move `may` into `TIME_INSENSITIVE` and the
 * modal case fails and only it. Drop the `dayNoun` clause from `saysWhen` and
 * the sol/level cases fail and only they do.
 */
function timeSelftest(){
  const cases = [];
  const yes = (name, text, noun) => cases.push({ name, ok: saysWhen(text, noun) === true, text });
  const no = (name, text, noun) => cases.push({ name, ok: saysWhen(text, noun) === false, text });
  const eq = (name, a, b) => cases.push({ name, ok: a === b, text: `${a} vs ${b}` });

  // THE DEFECT. A modal verb is not a month.
  no('the modal "may" is not a date', 'The bed may be at its ceiling already.', 'Sol');
  yes('the month May is', 'The window closes in May and nothing moves it.', 'Sol');
  no('"march" as a verb is not a date', 'They march the crew back to the gate.', 'Day');
  yes('the month March is', 'Nothing was measured until March.', 'Day');

  // THE DAY-NOUN PAIR. A campaign counting in sols is as placeable as one
  // counting in days, and the rule must not prefer the word "day".
  eq('a campaign\'s own day noun counts like "day" does',
    saysWhen('On sol 292 the hot run made 11.4 kilograms.', 'Sol'),
    saysWhen('On day 292 the hot run made 11.4 kilograms.', 'Day'));
  yes('sols count for a sol campaign', 'On sol 292 the run went long.', 'Sol');
  yes('levels count for a level campaign', 'Level 3 opens with the tank already warm.', 'Level');
  yes('and the plural does too', 'Two sols of margin are gone.', 'Sol');
  no('a noun no campaign uses is not a date', 'The tank is warm and the crew is waiting.', 'Sol');

  // The ordinary anchors, which must keep working.
  yes('an elapsed phrase counts', 'Since this morning the pressure has climbed.', 'Sol');
  yes('a clock year counts', 'Nothing has been checked since 2019.', 'Day');
  yes('a weekday counts', 'The samples leave on Thursday.', 'Day');
  no('a card with no anchor at all', 'The valve is open and nobody has signed for it.', 'Day');

  for(const c of cases) console.log(`  ${c.ok ? '✓' : '✗'} ${c.name}`);
  const bad = cases.filter(c => !c.ok);
  if(bad.length){
    console.log(`\n✗ time anchors: ${bad.length} of ${cases.length} case(s) wrong`);
    for(const c of bad) console.log(`  ✗ ${c.name}: "${c.text}"`);
    process.exit(1);
  }
  console.log(`\n✓ time anchors: ${cases.length} cases, and a modal verb is not a month.`);
}
