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
import { readFileSync } from 'node:fs';
import { themeDir as resolveTheme } from './registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

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
  //
  //    And there is a ceiling for a young audience, which is the half that was
  //    missing. The middle-school editions inherited their openings from the
  //    senior games almost word for word — a mean of 107 words, up to nine
  //    sentences, read before *every* day — and a sixth grader has stopped
  //    reading well before the end of that. The four beats fit in seventy words
  //    when the sentences are short.
  const junior = Number.isFinite(grade) && grade <= 8;
  const floor = Number.isFinite(grade) && grade <= 4 ? 70 : junior ? 60 : 90;
  const ceiling = junior ? 85 : 200;
  const n = words(stake).length;
  lengths.push(n);
  if(n < floor) fail(`${where}: stake is ${n} words — too short to say what happened, what you decide, and why`);
  else if(n > ceiling && junior) fail(`${where}: stake is ${n} words — over ${ceiling} is more than this audience reads before every day`);
  else if(n > ceiling) note(`${where}: stake is ${n} words`);
  // A pile-up is unreadable however plain its words, and the opening card rule
  // learned that already. Same number, applied to the card read every morning.
  const longest = Math.max(0, ...String(stake).split(/(?<=[.!?])\s+/).map(s => words(s).length));
  if(junior && longest > 24) fail(`${where}: a sentence in the stake runs to ${longest} words — 24 is the limit at grade ${grade}`);

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
    // Beat three is "the clock or the argument, WITH SOMEBODY FROM THE ROSTER IN IT",
    // and this was a note for as long as seventeen of forty-two campaigns ignored it —
    // including The Trial and Ice Core, whose openings are among the best-written in the
    // set and whose arguments are between two people neither of whom was on the card. A
    // note nobody has to clear is a note nobody clears. All seventeen carry a name now,
    // so this fails.
    if(!surnames.some(s => card.includes(s))){
      fail('the opening names nobody from the roster — the third beat is the clock or the '
         + 'argument with somebody in it, and an argument with no people in it reads as a '
         + 'property of the place rather than as something anybody has to settle');
    }
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
