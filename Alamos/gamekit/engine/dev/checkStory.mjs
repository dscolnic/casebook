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
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
if(!themeName){
  console.error('usage: node engine/dev/checkStory.mjs <theme|path-to-theme-dir>');
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
});

// ——— helpers ————————————————————————————————————————————————————————
const plain = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean);
const sentences = (s) => String(s ?? '').split(/(?<=[.!?])\s+/).filter(Boolean);

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

// A time marker: a clock, a calendar, or an elapsed-time phrase. Deliberately
// broad — the rule is that a reader can tell *when*, not that they are told in
// any particular format.
const TIME = new RegExp([
  '\\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|twentieth|twenty-\\w+)\\b',
  '\\b(day|days|hour|hours|week|weeks|month|months|year|years|watch|shift|stage|phase|minute|minutes)\\b',
  '\\b(january|february|march|april|may|june|july|august|september|october|november|december)\\b',
  '\\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\\b',
  '\\b(this morning|tonight|overnight|last night|since|ago|before|after|by sunrise|at dawn)\\b',
  '\\b(19|20)\\d\\d\\b',
].join('|'), 'i');

// What the player will be asked to do today, in the second person.
const TASK = /\b(today|this (shift|watch|stage|phase|day))\b[^.]{0,80}\byou\b/i;

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

// ——— the checks ————————————————————————————————————————————————————
let named = 0, dated = 0, tasked = 0;
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
  const floor = Number.isFinite(grade) && grade <= 4 ? 70 : 90;
  const n = words(stake).length;
  lengths.push(n);
  if(n < floor) fail(`${where}: stake is ${n} words — too short to say what happened, what you decide, and why`);
  else if(n > 200) note(`${where}: stake is ${n} words`);

  // 3. Somebody is in it. A card with no people in it is a problem statement.
  const who = surnames.filter(s => stake.includes(s));
  if(who.length) named++;

  // 4. A reader can tell when this is happening, from the first two sentences.
  const opening = sentences(stake).slice(0, 2).join(' ');
  if(TIME.test(opening)) dated++;

  // 5. It says what the player will be asked to do.
  if(TASK.test(stake)) tasked++;
  else fail(`${where}: never says what the player decides — no "Today you …" clause`);

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

// ——— campaign-level ————————————————————————————————————————————————
const total = MISSIONS.length;
if(named < Math.ceil(total * 0.8)){
  fail(`only ${named} of ${total} cards name anybody from the ${ROSTER.length}-person roster — `
     + `a campaign of problem statements rather than a story`);
}
if(dated < Math.ceil(total * 0.8)){
  fail(`only ${dated} of ${total} cards say when they are happening in their first two sentences`);
}
if(!manifest.dayNoun){
  note(`no dayNoun in the manifest, so the plan card says "Day N" — right only if a mission really is a day`);
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
    // Thin cards cannot carry four beats; long ones stop being read. Outbreak's
    // was 41 words and said nothing about what being late costs.
    const floor = Number.isFinite(grade) && grade <= 4 ? 55 : 70;
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
    if(!surnames.some(s => card.includes(s))){
      note('the opening names nobody from the roster — a clock can carry a card instead, and a person carries it better');
    }
  }
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
