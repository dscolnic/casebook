// jargonSweep.mjs — the work queue for the jargon sweep, not a gate.
//
//   node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N] [--unanchored]
//
// `checkJargon` is the gate: a curated domain lexicon, high precision, every
// finding real. This is its opposite and exists for a different job. It
// over-flags on purpose — morphology, length and rarity, with no curated list —
// because the sweep needs a queue a person reads, and a curated lexicon misses
// exactly the words nobody thought of. "sorbent", "influent" and "matrix effect"
// all pass the gate today.
//
// For each candidate it prints where the term is used and whether the game's own
// syllabus (`tools/syllabus.js`) claims it, which is the decision to make:
//
//   ON THE SYLLABUS  keep it — and check the mission that teaches it comes first
//   NOT CLAIMED      rewrite the question in plain words
//
// Rarity is measured inside the game itself: a term used in one stop out of forty-
// five is a word the player meets once, which is the worst kind. A term used on
// ten days is part of the subject.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const args = process.argv.slice(2);
const limit = Number(args[args.indexOf('--limit') + 1]) || 40;
const unanchored = args.includes('--unanchored');
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/jargonSweep.mjs <theme> [--all] [--limit N] [--unanchored]');
  process.exit(2);
}

const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
// A hyphen joins two words and hides both: "lower-activation-energy" matched
// neither the common list nor the syllabus as one token, so a compound of three
// ordinary-or-claimed words sat in the queue. Split on it and judge the parts.
const words = (s) => String(s ?? '').replace(/[₀-₉]/g, c => SUBS[c] ?? c)
  .match(/[A-Za-z][A-Za-z0-9'’\/]*/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');

const { COMMON, UNITS, TECHY, FORMS, PREFIXES, stems, ordinary, norm } =
  await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/common-words.mjs')).href);

function candidate(raw){
  const w = norm(raw);
  if(w.length < 5 || ordinary(w)) return false;
  if(w.includes('/')) return false;                        // units are notation
  if(/^[A-Z]{2,5}$/.test(raw)) return true;                // an acronym
  if(/\d/.test(w)) return true;                            // CO2, NO3
  return w.length >= 10 || TECHY.test(w);
}

// The syllabus and the rule for reading it both live in tools/syllabus.js, so
// this tool and the importer that stamps `core` on a glossary term cannot drift
// into disagreeing about the same word.
const { claimedWords, claimsWord } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/syllabus.js')).href)
  .catch(() => ({ claimedWords: () => new Set(), claimsWord: () => false }));

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const claimed = claimedWords(themeName);
  // A person is not a hard word. Oppenheimer, Trinity and the Ordnance Division
  // are names — the cast, the areas of study and the places the game is set —
  // and every one of them was sitting in Project Y's rewrite pile.
  const names = new Set();
  for(const p of [...(content.ROSTER ?? []), ...(content.LEADERS ?? [])])
    for(const w of words(p?.name)) names.add(norm(w));
  for(const g of content.GROUPS ?? []) for(const w of words(g?.name)) names.add(norm(w));
  for(const m of content.MISSIONS ?? []){
    for(const stop of m.stops ?? []) for(const w of words(stop?.person ?? '')) names.add(norm(w));
  }
  const glossary = new Set();
  for(const t of content.JARGON ?? []){
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)) for(const w of words(n)) glossary.add(norm(w));
  }

  const hits = new Map();   // norm -> { raw, days:Set, stops:[] }
  // Per day: which hard words the questions ask with, and which the day's own
  // reasoning uses. A word in the first set and not the second is jargon the day
  // never earns — the player has to carry it to answer, and nothing that follows
  // explains why it was the right word.
  const byDay = [];
  MISSIONS.forEach((m, mi) => {
    const day = { title: m.title, asked: new Map(), taught: new Set() };
    byDay.push(day);
    for(const stop of m.stops ?? []){
      const l = CURRICULUM[stop.group]?.[stop.lesson];
      if(!l) continue;
      const ch = l.game ?? {};
      const asked = [l.scene, ch.task ?? ch.play, ch.question, ch.headline,
        ...(ch.choices ?? []).map(label), ...(ch.cards ?? []).map(label),
        ...(ch.scenarios ?? []).map(label), ...(ch.givens ?? []).map(label),
        ...(ch.proposals ?? []).map(label)].filter(Boolean).join('  ');
      for(const w of words([ch.why, ...(l.assumes ?? []), ...(ch.rebuttals ?? []).map(label)]
        .filter(Boolean).join('  '))) day.taught.add(norm(w));
      // "Mrs. Grant" is a patient, not a hard word. The roster covers the cast a
      // game ships; the people invented inside a question are known only by the
      // title in front of them.
      const surnames = new Set();
      for(const m of asked.matchAll(/\b(?:Mr|Mrs|Ms|Miss|Dr|Nurse|Captain|Chief|Colonel|General|Professor|Lieutenant|Commander)\.?\s+([A-Z][a-z]+)/g)) surnames.add(norm(m[1]));
      for(const raw of words(asked)){
        if(surnames.has(norm(raw))) continue;
        if(!candidate(raw)) continue;
        const key = norm(raw);
        if(names.has(key)) continue;
        if(!hits.has(key)) hits.set(key, { raw, days: new Set(), stops: [] });
        const h = hits.get(key);
        h.days.add(mi + 1);
        if(h.stops.length < 3) h.stops.push(`d${mi + 1} ${stop.group} "${l.title}"`);
        if(!day.asked.has(key)) day.asked.set(key, { raw, where: `${stop.group} "${l.title}"` });
      }
    }
  });

  const rows = [...hits.entries()].map(([key, h]) => ({
    key, raw: h.raw, days: [...h.days].sort((a, b) => a - b), stops: h.stops,
    onSyllabus: claimsWord(themeName, key, claimed),
    inGlossary: glossary.has(key),
  }));
  // Rarest first: a word used once is the one a rewrite removes most cheaply.
  rows.sort((a, b) => a.days.length - b.days.length || a.key.localeCompare(b.key));
  const rewrite = rows.filter(r => !r.onSyllabus);
  const keep = rows.filter(r => r.onSyllabus);

  console.log(`\n#### ${themeName}: ${rows.length} candidate term(s) — `
    + `${keep.length} on the syllabus, ${rewrite.length} not claimed by it`
    + ` (${rewrite.filter(r => r.inGlossary).length} of those have a glossary entry that only excuses them)`);
  console.log(`\n  REWRITE — not on the syllabus, rarest first:`);
  for(const r of rewrite.slice(0, limit)){
    console.log(`    ${r.raw}  ·  ${r.days.length} day(s)${r.inGlossary ? '  · glossary' : ''}`);
    console.log(`        ${r.stops.join('  |  ')}`);
  }
  if(rewrite.length > limit) console.log(`    … ${rewrite.length - limit} more (--limit ${rewrite.length})`);
  console.log(`\n  KEEP — on the syllabus: ${keep.map(r => r.raw).join(', ') || '(none)'}`);

  // --unanchored: the same question asked per day rather than per game. A term
  // can be on the syllabus, defined in the glossary and still arrive unearned, if
  // the day that uses it never reasons with it. Those are the words to cut or to
  // tie down first, because the day is not about them.
  if(!unanchored) continue;
  const flat = (r) => r.onSyllabus ? '  · syllabus' : (r.inGlossary ? '  · glossary' : '');
  const meta = new Map(rows.map(r => [r.key, r]));
  let loose = 0;
  console.log(`\n  UNANCHORED — asked with on the day, never reasoned with on the day:`);
  byDay.forEach((day, i) => {
    const out = [...day.asked.entries()].filter(([key]) => !day.taught.has(key));
    if(!out.length) return;
    loose += out.length;
    console.log(`    d${i + 1} "${day.title}"`);
    for(const [key, a] of out) console.log(`        ${a.raw} — ${a.where}${flat(meta.get(key) ?? {})}`);
  });
  console.log(`    ${loose} term(s) across ${byDay.length} days`);
}
