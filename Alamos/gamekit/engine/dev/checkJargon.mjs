// checkJargon.mjs — is the player expected to know a word nobody taught them,
// and does the day's primer help?
//
//   node engine/dev/checkJargon.mjs <theme>
//   node engine/dev/checkJargon.mjs <theme> --verbose
//   node engine/dev/checkJargon.mjs <theme> --advisory     report, exit 0
//
// The reading-level check in checkStory measures sentence length and syllables,
// which is why a stop can pass it and still be unanswerable: "the formula
// contains a metal cation and a polyatomic anion" is a short sentence made of
// two words the game never introduces. Flesch-Kincaid cannot see that, and no
// amount of shortening the sentence fixes it.
//
// So this asks a different question, in campaign order: at the moment the player
// reads this, has this word been introduced? Introduced means one of —
//
//   * the glossary defines it, so the term chip under the question explains it
//   * the day's primer names it (the plan card, read minutes earlier)
//   * `assumes:` on the lesson declares it as prior knowledge
//   * the text defines it in place — "an aliquot (a measured portion)"
//   * an earlier day's verdict explained it, which is what teaching is
//
// Anything else is a word the player is expected to already have, and the report
// says which day first used it. The second half of the report is the primer:
// how many of the day's own hard words it covers, because a primer that names
// nothing the questions use is decoration.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';

const themeName = process.argv[2];
const verbose = process.argv.includes('--verbose');
const advisory = process.argv.includes('--advisory');
if(!themeName){
  console.error('usage: node engine/dev/checkJargon.mjs <theme> [--verbose] [--advisory]');
  process.exit(2);
}
const dir = resolveTheme(themeName);
const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
const { normalizeContent } = await import('../content/normalize.js');
const content = theme.content ?? {};
normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});

const CURRICULUM = content.CURRICULUM ?? {};
const MISSIONS = content.MISSIONS ?? [];
const JARGON = content.JARGON ?? [];
const grade = Number(theme?.audience?.grade);

// ——— what counts as a hard word ————————————————————————————————————
//
// No word list ships with this repo and no dependency may be added, and the first
// version of this test — technical-looking suffixes plus length — reported 120
// findings for The Contaminated City of which most were "identity",
// "interpretation" and "prediction". A checker with a hundred false positives is
// a checker nobody runs.
//
// So the test is a domain lexicon instead: the morphemes that only appear in the
// subjects these games teach, matched long enough to be unambiguous, plus a list
// of short terms that have to be matched whole. "cation" is six letters and sits
// inside "identification", which is why the short ones are exact.
//
// It under-reports on purpose. Every finding is a word a reader either knows from
// the subject or does not know at all.
const TERMS = new Set(`
anion cation aliquot analyte analytes mole moles molar molarity ligand titrant titre titer eluent effluent
isotope isotopes nuclide nuclides neutron neutrons proton protons torque impulse parallax ephemeris
albedo aphelion perihelion apogee perigee quadrupole monopole dipole tamper reflector betatron
triage pathogen antigen antibody antibodies codon codons allele alleles reagent reagents
bilge fathom fathoms sonar transducer bearing-rate scrubber tonnage stoichiometry enthalpy entropy
buffer buffered speciation sorption desorption partitioning volatility polarity solute solvent solutes
prevalence incidence seroprevalence reservoir vector zoonotic autoclave centrifuge supernatant
ppb ppm ppt mg/l µg/l mol/l kpa mev kev gev bq mbq sv msv
`.trim().split(/\s+/).map(w => w.toLowerCase()));

const MORPHEMES = [
  'chromatogra', 'chromatograph', 'spectromet', 'spectrosco', 'spectrum', 'stoichiom', 'precipitat',
  'solubil', 'volatilis', 'volatiliz', 'calibrat', 'oxidis', 'oxidiz', 'equilibri', 'catalys', 'catalyz',
  'hydroxid', 'carbonat', 'sulphat', 'sulfat', 'nitrat', 'chlorid', 'enthalp', 'kinetic', 'diffusi',
  'osmosis', 'saturat', 'astromet', 'doppler', 'fissio', 'isotherm', 'serolog', 'epidemi', 'genomi',
  'ribosom', 'perfusi', 'titrat', 'neutralis', 'neutraliz', 'absorbanc', 'transmittanc', 'chelat',
  'adsorb', 'aerosol', 'colorimet', 'gravimet', 'voltammet', 'potentiomet', 'polarimet', 'radiograph',
  'attenuat', 'moderat‑neutron', 'criticalit', 'implosi', 'hydrodynam', 'ephemer', 'perturbat',
  'quadratur', 'transponder', 'interferomet', 'lithotrip', 'auscultat', 'saturation',
];

// ——— terms built out of ordinary words ————————————————————————————
//
// The lexicon above is morphemes, so it cannot see a domain term whose parts are
// all words a child knows. "Cabin pressure" and "power bus" are the two that a
// sixth grader stopped on, and both are invisible to every test in this file:
// six ordinary words, four syllables, and a meaning she had no way to get.
// CLAUDE.md already predicted this one — "what no cheap rule catches is a domain
// term built from ordinary words, which is exactly what 'transfer window' is" —
// and the answer is the same as it was for TERMS: a list, matched whole, that
// grows the next time a game teaches one.
const PHRASES = [
  // spaceflight
  'cabin pressure', 'power bus', 'guidance computer', 'tracking pass', 'state vector',
  'flight surgeon', 'ground station', 'heat shield', 'entry corridor', 'attitude control',
  'correction burn', 'star camera', 'leak monitor', 'dial gauge', 'transfer window',
  // power and electricity
  'load bank', 'switching station', 'transmission line', 'power factor', 'demand curve',
  'state of charge', 'amp hour', 'amp-hour',
  // water, air and ground
  'storm surge', 'water table', 'fault scarp', 'ice equivalent', 'core sample',
  'settling tank', 'holding time', 'detection limit', 'background level',
  // life and health
  'case definition', 'contact tracing', 'attack rate', 'control group', 'growth medium',
  'isolation distance', 'seed lot',
  // instruments generally
  'shared reference', 'common cause', 'sampling rate', 'error bar', 'confidence interval',
];
// One canonical spelling per phrase, so "amp-hour", "amp hour" and "amp-hours"
// are one term rather than three that each look under-explained. The plural
// lives in the regex rather than in the key: stripping a trailing s from the key
// turned "tracking pass" into "tracking pas", which matched nothing anywhere.
const flatPhrase = (p) => String(p).toLowerCase().replace(/[-–—]/g, ' ').replace(/\s+/g, ' ').trim();
const phraseRe = (p) => new RegExp('\\b' + flatPhrase(p).replace(/ /g, '[\\s-]+') + '(?:es|s)?\\b', 'i');
// Only for a young audience. "Cabin pressure" is vocabulary an AP course is
// entitled to use without stopping, and running this list over the senior games
// would report every one of them for words their readers have.
const juniorAudience = Number.isFinite(Number(theme?.audience?.grade)) && Number(theme.audience.grade) <= 8;
const phrasesIn = (text) => {
  if(!juniorAudience) return [];
  const t = String(text ?? '');
  return [...new Set(PHRASES.filter(p => phraseRe(p).test(t)).map(flatPhrase))];
};

const hardWord = (w) => {
  const word = w.toLowerCase().replace(/[’']s$/, '');
  if(TERMS.has(word)) return true;
  if(/^[A-Z]{2,5}$/.test(w) && !/^(THE|AND|FOR|NOT|ONE|TWO|YOU|ALL)$/.test(w)) return true;   // an acronym
  // Units are notation rather than vocabulary — "cm/s" needs the relationship
  // line, not a glossary entry — so they are not findings.
  if(word.includes('/')) return false;
  return MORPHEMES.some(m => word.includes(m));
};

const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
// CO₂ is written with a subscript, so the tokenizer saw "CO" and the glossary's
// "CO2" never matched it. Subscripts fold to digits before anything else looks.
const words = (s) => String(s ?? '').replace(/[₀-₉]/g, c => SUBS[c] ?? c)
  .match(/[A-Za-z][A-Za-z0-9'’\/-]*/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
// Plurals only, and only the safe ones: the first version turned "substance" into
// "substanc" and "candidate" into "candidat", so half the report was misspelt.
const flat = (w) => {
  // An acronym keeps its S. Stripping it turned RMS into "rm", which matched no
  // glossary entry and was reported as an undefined term that appears nowhere.
  if(/^[A-Z]{2,5}$/.test(String(w))) return String(w).toLowerCase();
  const word = String(w).toLowerCase().replace(/[’']s$/, '');
  if(/(ss|us|is)$/.test(word)) return word;
  if(/(?:ses|xes|zes|ches|shes)$/.test(word)) return word.slice(0, -2);
  if(/ies$/.test(word)) return word.slice(0, -3) + 'y';
  if(/[^s]s$/.test(word)) return word.slice(0, -1);
  return word;
};

/**
 * Every stem the glossary knows.
 *
 * Compared by stem rather than by whole word, because the text inflects and
 * hyphenates freely — "mis-calibrated" is the "Calibration" entry, and requiring
 * an exact alias for every form is how a glossary of 114 entries still fails a
 * word it defines.
 */
const glossary = new Set();
const stem = (w) => flat(String(w).toLowerCase().replace(/-/g, '')).slice(0, 6);
const GLUE = new Set(['the', 'a', 'an', 'of', 'and', 'or', 'in', 'on', 'to', 'by', 'per']);
/** The multi-word entries, flattened the same way phrasesIn flattens the text. */
const glossaryPhrases = new Set();
for(const t of JARGON){
  for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
    if(/\s|-/.test(String(n))) glossaryPhrases.add(flatPhrase(n));
    // Short entries count: the acronyms are the shortest words in the glossary
    // and a length floor of four excluded every one of them — QC, DC, RNA, MeV.
    for(const w of words(n)) if(!GLUE.has(w.toLowerCase())) glossary.add(stem(w));
  }
}
/** Does the glossary know this word, in any of its forms? */
const known = (raw) => {
  const bare = String(raw).toLowerCase().replace(/-/g, '');
  if(glossary.has(stem(bare))) return true;
  // a hyphenated compound counts as known when either half does
  return String(raw).split(/[-\/]/).some(part => part.length >= 4 && glossary.has(stem(part)));
};

/** Does this text define the word on the spot? */
function definedInPlace(word, text){
  // Spaces in a term match a hyphen too, so the prose is free to write
  // "amp-hour" where the glossary writes "amp hour" without looking undefined.
  // By stem, and tolerant of the plural and the hyphen: prose says "calibration
  // is the check against known samples" where the word the questions use is
  // "calibrated", and requiring the exact inflection called that undefined.
  // Escape first, then add the wildcard — escaping afterwards turns the stem's
  // own `[a-z]*` into a literal, which is how this arrived reporting that a word
  // defined two words earlier was defined nowhere.
  const safe = String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '[\\s-]+');
  const w = word.length > 6 && !/\s/.test(word) ? safe.slice(0, 6) + '[a-z]*' : safe + '(?:es|s)?';
  return new RegExp(`\\b${w}\\b\\s*(?::|—|–|-|\\(|,\\s*(?:which|that|the)\\b|\\s+is\\s+|\\s+are\\s+|\\s+means\\b)`, 'i').test(text)
      || new RegExp(`\\b(?:called|known as|that is|meaning)\\s+(?:a |an |the )?${w}\\b`, 'i').test(text);
}

// ——— walk the campaign in order ————————————————————————————————————
const taught = new Set();      // words a verdict has explained, or a glossary defines
for(const w of glossary) taught.add(w);   // stems, so `taught` and `known` agree

// ——— how many times each term is explained —————————————————————————
//
// Once is not teaching, for a young reader. A glossary chip explains a word to
// somebody who thinks to open it; a definition in the scene explains it to
// somebody reading the scene; a verdict explains it to somebody who has just
// been wrong about it. Those are three different readers and they are often the
// same child on three different days. So for a junior edition this file counts
// explanations rather than asking whether there is one, and every place that
// explains a term in its own words counts once.
const explained = new Map();   // term -> Set of "where"
const explainedBy = (term, where) => {
  if(!explained.has(term)) explained.set(term, new Set());
  explained.get(term).add(where);
};
function countExplanations(term, text, where){
  if(definedInPlace(term, text)) explainedBy(term, where);
}

const firstUse = new Map();    // word -> { day, where, kind }
const perDay = [];

MISSIONS.forEach((m, mi) => {
  const dayNo = mi + 1;
  const primerText = (m.primer ?? []).join(' ');
  const primerWords = new Set(words(primerText).map(flat));
  const dayHard = new Map();   // word -> where it was used
  const explainedLater = [];

  for(const stop of m.stops ?? []){
    const l = CURRICULUM[stop.group]?.[stop.lesson];
    if(!l) continue;
    const ch = l.game ?? {};
    // Everything the player reads BEFORE answering. The verdict is excluded on
    // purpose: it is allowed to introduce a word, and does so for the next day.
    const asked = [l.scene, ch.task ?? ch.play, ch.question, ch.headline,
      ...(ch.choices ?? []).map(label), ...(ch.cards ?? []).map(label),
      ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []).map(label),
      ...(ch.readings ?? []).map(r => `${r?.label ?? ''} ${r?.zone ?? ''}`),
      ...(ch.proposals ?? []).map(label), ch.relationship,
    ].filter(Boolean).join('  ');
    const assumed = new Set(words((l.assumes ?? []).join(' ')).map(flat));

    for(const raw of words(asked)){
      if(!hardWord(raw)) continue;
      const w = flat(raw);
      // Every hard word the day uses, and how it is covered — the primer number
      // is only honest if the words the primer DOES name are counted too, which
      // the first version excluded by filtering them out here.
      // Primer before glossary: both count as introduced, but the number worth
      // reporting is whether the plan card named it, and a glossary-first test
      // reported 0% coverage for a card that named three of them.
      const how = primerWords.has(w) ? 'primer'
        : known(raw) ? 'glossary'
        : assumed.has(w) ? 'assumes'
        : taught.has(w) ? 'taught earlier'
        : definedInPlace(raw, asked) ? 'defined in place'
        : 'unexplained';
      if(!dayHard.has(w)) dayHard.set(w, { how, where: `${stop.group} "${l.title}"` });
      if(how === 'unexplained' && !firstUse.has(w)) firstUse.set(w, { day: dayNo, where: `${stop.group} "${l.title}"` });
      countExplanations(w, asked, `day ${dayNo} ${l.title}`);
    }
    // The same walk again for terms made of ordinary words, which the word
    // tokenizer above cannot see because every part of them is a word.
    for(const p of phrasesIn(asked)){
      const how = phrasesIn(primerText).includes(p) ? 'primer'
        : glossaryPhrases.has(p) ? 'glossary'
        : phrasesIn((l.assumes ?? []).join(' ')).includes(p) ? 'assumes'
        : taught.has(p) ? 'taught earlier'
        : definedInPlace(p, asked) ? 'defined in place'
        : 'unexplained';
      if(!dayHard.has(p)) dayHard.set(p, { how, where: `${stop.group} "${l.title}"` });
      if(how === 'unexplained' && !firstUse.has(p)) firstUse.set(p, { day: dayNo, where: `${stop.group} "${l.title}"` });
      countExplanations(p, asked, `day ${dayNo} ${l.title}`);
    }
    // A verdict may teach a word for later days.
    const verdict = [ch.why, l.takeaway, ch.answerText, ...(ch.rebuttals ?? []).map(label)].join(' ');
    for(const raw of words(verdict)){
      if(hardWord(raw)) explainedLater.push(flat(raw));
    }
    for(const raw of new Set(words(verdict).filter(hardWord).map(flat))){
      countExplanations(raw, verdict, `verdict of "${l.title}"`);
    }
    for(const p of phrasesIn(verdict)){
      explainedLater.push(p);
      countExplanations(p, verdict, `verdict of "${l.title}"`);
    }
  }

  // How much of today's hard vocabulary does the primer name?
  const hardHere = [...dayHard.keys()];
  const covered = hardHere.filter(w => dayHard.get(w).how === 'primer');
  const unexplained = hardHere.filter(w => dayHard.get(w).how === 'unexplained');
  const decorative = (m.primer ?? []).filter(line => {
    const ws = new Set(words(line).map(flat));
    // A line earns its place by naming something today's questions use — a hard
    // word, or a quantity from a relationship.
    return ![...ws].some(w => hardHere.includes(w) || taught.has(w));
  });
  perDay.push({ day: dayNo, title: m.title, hard: hardHere, dayHard, covered, unexplained, decorative,
                primerLines: (m.primer ?? []).length });
  for(const w of explainedLater) taught.add(w);
});

// ——— report ————————————————————————————————————————————————————————
const totalHard = [...firstUse.keys()];
const problems = [];
const notes = [];

// 1. Words the game never introduces anywhere. The glossary is the cheapest fix
//    and the one the UI already has a place for.
const neverTaught = totalHard.filter(w => !known(w));
// A glossary entry that defines nothing is worse than none: the term chip opens
// and says "a course concept used in Mission 8". 68 of contamcity's 114 came out
// of the docx importer that way, and the primer skips them for the same reason.
const hollow = JARGON.filter(t => /course concept used in|should be defined|in the game, the term/i.test(t?.def ?? ''));
if(hollow.length) notes.push(`${hollow.length} of ${JARGON.length} glossary entries define nothing`
  + ` — e.g. ${hollow.slice(0, 3).map(t => t.name).join(', ')}`);
const perDayAvg = MISSIONS.length ? totalHard.length / MISSIONS.length : 0;

// 2. A day whose primer names none of the words it leaves unexplained is not
//    helping: the fix is one line on the plan card, which is where the player is
//    already looking.
const blindDays = perDay.filter(d => d.unexplained.length >= 2 && !d.covered.length);
const thinDays = perDay.filter(d => d.unexplained.length >= 2 && d.covered.length
                                    && d.covered.length < d.hard.length / 3);

// 1b. And for a young audience, once is not enough. A term the game uses has to
//     be said again somewhere else, in different words — the glossary entry, the
//     scene that first uses it, and the verdict that corrects a wrong answer are
//     three different moments, and a child needs more than one of them.
const junior = Number.isFinite(grade) && grade <= 8;
const usedTerms = [...new Set([...perDay.flatMap(d => [...d.dayHard.keys()])])];
const onceOnly = !junior ? [] : usedTerms.filter((t) => {
  const places = explained.get(t)?.size ?? 0;
  const inGlossary = t.includes(' ') ? glossaryPhrases.has(t) : known(t);
  return places + (inGlossary ? 1 : 0) < 2;
});
// An edition is held to this. A game written for its own audience from scratch
// is advised, for the same reason questionLoad advises rather than fails there:
// the rule arrived after those games shipped, and applying it retroactively is a
// content decision for a person.
const { editionBase } = await import('./registry.mjs');
const isEdition = !!editionBase(themeName);
if(onceOnly.length && isEdition) problems.push(
  `${onceOnly.length} term(s) are explained once or not at all, for an audience of grade ${grade}`
  + ` — say it again somewhere else, in different words`);
else if(onceOnly.length) notes.push(
  `${onceOnly.length} term(s) are explained once or not at all, for grade ${grade} (advisory — not an edition)`);

if(neverTaught.length) problems.push(
  `${neverTaught.length} hard word(s) are used and never introduced — no glossary entry, no primer, no definition in place`);
if(blindDays.length) problems.push(
  `${blindDays.length} day(s) leave two or more terms unexplained and the primer names none of them`);
if(thinDays.length) notes.push(
  `${thinDays.length} day(s) whose primer covers under a third of the day's hard words`);
for(const d of perDay) if(d.decorative.length) notes.push(
  `day ${d.day}: ${d.decorative.length} of ${d.primerLines} primer line(s) name nothing the day's questions use`);

const show = (list, n) => (verbose ? list : list.slice(0, n));
console.log(`\n${themeName}: ${totalHard.length} hard word(s) used before they are introduced`
  + ` (${perDayAvg.toFixed(1)} per day, audience grade ${Number.isFinite(grade) ? grade : '?'})`);
if(neverTaught.length){
  console.log(`  never introduced anywhere (${neverTaught.length}):`);
  for(const w of show(neverTaught.sort((a, b) => firstUse.get(a).day - firstUse.get(b).day), 12)){
    const u = firstUse.get(w);
    console.log(`    · ${w} — first used on day ${u.day}, ${u.where}`);
  }
  if(!verbose && neverTaught.length > 12) console.log(`    … ${neverTaught.length - 12} more (--verbose)`);
}
if(onceOnly.length){
  console.log(`  explained once or not at all, and this edition is for grade ${grade} (${onceOnly.length}):`);
  for(const t of show(onceOnly, 14)){
    const places = [...(explained.get(t) ?? [])];
    const inGlossary = t.includes(' ') ? glossaryPhrases.has(t) : known(t);
    console.log(`    · ${t} — ${places.length ? places.join('; ') : 'nowhere'}${inGlossary ? ' + the glossary' : ''}`);
  }
  if(!verbose && onceOnly.length > 14) console.log(`    … ${onceOnly.length - 14} more (--verbose)`);
}
console.log(`  primer coverage of each day's hard words:`);
for(const d of perDay){
  const pct = d.hard.length ? Math.round(100 * d.covered.length / d.hard.length) : 100;
  const flag = d.unexplained.length >= 2 && !d.covered.length ? '  ✗' : '';
  if(verbose || flag || pct < 34){
    console.log(`    day ${String(d.day).padStart(2)}: primer names ${d.covered.length} of ${d.hard.length} hard word(s)`
      + `, ${d.unexplained.length} unexplained${flag}`
      + (d.unexplained.length ? ` — ${d.unexplained.slice(0, verbose ? 99 : 4).join(', ')}` : ''));
  }
}

if(notes.length){
  console.log(`\n${notes.length} note(s):`);
  for(const n of show(notes, 6)) console.log('  · ' + n);
  if(!verbose && notes.length > 6) console.log(`  … ${notes.length - 6} more (--verbose)`);
}
if(problems.length){
  console.log(`\n✗ theme "${themeName}" jargon: ${problems.length} problem(s)`);
  for(const p of problems) console.log('  ✗ ' + p);
  console.log(`  (add a glossary entry, name it in the mission's primer, or define it in the text)`);
} else {
  console.log(`\n✓ theme "${themeName}": every hard word is introduced before it is needed`);
}
process.exit(problems.length && !advisory ? 1 : 0);
