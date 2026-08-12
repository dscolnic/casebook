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

  // 7. Reading level, against the audience the theme declares.
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
