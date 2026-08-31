// phraseSweep.mjs — the words are all fine; the phrase is the problem.
//
//   node engine/dev/phraseSweep.mjs <theme> [--all] [--limit N] [--min N]
//
// "Analytical reserve" survived every check this repo has. `jargonSweep` reads
// one word at a time and found "analytical" on the syllabus and "reserve" in the
// ordinary-English list. `jargonDepth` reads the glossary, and the phrase is not
// in it. `checkJargon` asks whether hard words were introduced, and neither word
// is hard. So a phrase nobody can read passed as two words everybody can, and it
// was the player who noticed.
//
// ## What a suspect phrase looks like
//
// A term of art the author reused, made of a technical word and an ordinary one:
//
//   analytical reserve · matrix effect · neutron economy · dead time · lot record
//
// Each reads like a defined term. None of them is one. The test is:
//
//   * the phrase occurs more than once — an author's term of art, not a sentence
//   * one word is technical: the syllabus claims it, or the glossary defines it
//   * the rest are ordinary English, so the reader cannot decompose it either
//   * it is not itself a glossary entry, and not a phrase the syllabus names
//
// What that leaves is a list to decide about, one phrase at a time: define it,
// rewrite it, or agree it is plain. "Laboratory budget" is innocent. "Analytical
// reserve" was eight hundred pounds of laboratory budget.
//
// A report, like `jargonSweep`. There is no honest gate here — the difference
// between a term of art and an ordinary pair of words is a judgement, and a
// checker that failed a build over one would be wrong most of the time.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const args = process.argv.slice(2);
const limit = Number(args[args.indexOf('--limit') + 1]) || 30;
const minUses = Number(args[args.indexOf('--min') + 1]) || 2;
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/phraseSweep.mjs <theme> [--all] [--limit N] [--min N]');
  process.exit(2);
}

const { ordinary, norm } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/common-words.mjs')).href);
const { claimedWords, claimsWord, claimsPhrase, SYLLABUS } =
  await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/syllabus.js')).href)
    .catch(() => ({ claimedWords: () => new Set(), claimsWord: () => false, claimsPhrase: () => false, SYLLABUS: {} }));

const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');
// Sentences, so a phrase is never read across a full stop: "the sample. Blank
// controls" is not a phrase, it is two.
const clauses = (s) => String(s ?? '').split(/[.!?;:()\[\]"“”]|--|—/).map(x => x.trim()).filter(Boolean);
const wordsOf = (s) => String(s ?? '').toLowerCase().match(/[a-z][a-z0-9'’-]*/g) ?? [];

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const JARGON = content.JARGON ?? [];
  const claimed = claimedWords(themeName);

  // Everything the glossary already names, as whole phrases and as single words.
  const glossaryPhrases = new Set();
  const glossaryWords = new Set();
  for(const t of JARGON){
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
      glossaryPhrases.add(wordsOf(n).join(' '));
      if(wordsOf(n).length === 1) glossaryWords.add(norm(wordsOf(n)[0]));
    }
  }
  // And everything the syllabus names, so "detection limit" and "mass number"
  // are not reported as inventions. Keys are matched by containment, because a
  // key is written as it is said — "straight line on a", "phase angle" — and the
  // phrase in the text is a window onto part of it.
  const syllabusKeys = [];
  const syllabusPhrases = new Set();
  for(const con of SYLLABUS[themeName]?.concepts ?? []){
    for(const k of con.k ?? []){ syllabusPhrases.add(wordsOf(k).join(' ')); syllabusKeys.push(wordsOf(k).join(' ')); }
    for(const w of wordsOf(con.c)) if(w.length >= 4) syllabusPhrases.add(w);
  }
  // Containment, but only against keys that are themselves phrases. A one-word
  // key must not swallow everything built on it: "analytical" is on Riverton's
  // syllabus, and "analytical reserve" is the phrase this tool exists for.
  const namedBySyllabus = (phrase) => syllabusPhrases.has(phrase)
    || syllabusKeys.filter(k => k.includes(' ')).some(k => k.includes(phrase) || phrase.includes(k));

  const technical = (w) => !ordinary(w) && (claimsWord(themeName, w, claimed) || glossaryWords.has(norm(w)));

  // What makes "analytical reserve" a coined term and "dissolved metal" a
  // description is which end the technical word sits at. "Dissolved metal" is a
  // metal, described. "Analytical reserve" is not a reserve of anything the
  // reader can picture — the head noun is an abstract container the author has
  // borrowed, and the phrase means something the two words do not.
  const HEADS = new Set(`
budget reserve margin envelope economy effect package picture space window chain load path route
corridor footprint bandwidth headroom overhead ceiling floor pool stack ladder curve profile
signature regime posture case story frame lens angle channel pipeline stream flow bucket basket
band gap depth breadth horizon boundary threshold trail record book line
`.trim().split(/\s+/));

  // Every two- and three-word run inside a clause, with where it was used.
  const seen = new Map();   // phrase -> { days:Set, where:[], n }
  MISSIONS.forEach((m, mi) => {
    for(const stop of m.stops ?? []){
      const l = CURRICULUM[stop.group]?.[stop.lesson];
      if(!l) continue;
      const ch = l.game ?? {};
      const text = [l.title, l.scene, ch.task ?? ch.play, ch.question, ch.headline, ch.why,
        ...(l.assumes ?? []), ...(ch.rebuttals ?? []).map(label), ...(ch.choices ?? []).map(label),
        ...(ch.cards ?? []).map(label), ...(ch.scenarios ?? []).map(label),
        ...(ch.givens ?? []).map(label), ...(ch.proposals ?? []).map(label)].filter(Boolean).join('. ');
      for(const clause of clauses(text)){
        const ws = wordsOf(clause);
        for(let i = 0; i < ws.length; i++){
          for(const len of [2, 3]){
            if(i + len > ws.length) continue;
            const parts = ws.slice(i, i + len);
            // "one detector channel" is "detector channel" with a number in
            // front of it, and reporting both says the same thing twice.
            if(['one', 'two', 'three', 'each', 'every', 'any', 'some', 'this', 'that', 'these', 'those',
              'first', 'second', 'third', 'next', 'last', 'same', 'own', 'new', 'old'].includes(parts[0])) continue;
            const phrase = parts.join(' ');
            if(glossaryPhrases.has(phrase) || namedBySyllabus(phrase)) continue;
            // An abstract head, borrowed, with something technical in front of it.
            const head = parts[parts.length - 1];
            if(!HEADS.has(head)) continue;
            const front = parts.slice(0, -1);
            // The modifier has to be a real technical word — one the syllabus
            // claims or the glossary defines. Anything merely unfamiliar puts
            // "straight line" and "blank space" in a report about jargon.
            const tech = front.filter(technical);
            if(!tech.length) continue;
            // "of", "the", "and" between words make a sentence, not a term
            // "rash might spread" is a sentence with a verb in it, not a term.
            if(parts.some(w => ['might', 'could', 'should', 'would', 'will', 'can', 'may', 'must'].includes(w))) continue;
            if(parts.some(w => ['of', 'the', 'a', 'an', 'and', 'or', 'is', 'are', 'to', 'in', 'on', 'for', 'with',
              'that', 'this', 'it', 'its', 'be', 'was', 'were', 'has', 'have', 'not', 'but', 'by', 'at', 'as',
              'from', 'than', 'then', 'so', 'if', 'can', 'will', 'would', 'they', 'them', 'their'].includes(w))) continue;
            if(!seen.has(phrase)) seen.set(phrase, { days: new Set(), where: [], n: 0, tech: tech[0] });
            const rec = seen.get(phrase);
            rec.n++;
            rec.days.add(mi + 1);
            if(rec.where.length < 3) rec.where.push(`d${mi + 1} ${stop.group} "${l.title}"`);
          }
        }
      }
    }
  });

  // A three-word phrase whose inner two-word phrase is already reported says the
  // same thing twice; keep the longer one only when it is used as often.
  const rows = [...seen.entries()].map(([phrase, r]) => ({ phrase, ...r }))
    .filter(r => r.n >= minUses)
    .filter(r => {
      const parts = r.phrase.split(' ');
      if(parts.length < 3) return true;
      const inner = [parts.slice(0, 2).join(' '), parts.slice(1).join(' ')];
      return !inner.some(p => (seen.get(p)?.n ?? 0) > r.n);
    })
    .sort((a, b) => b.n - a.n || b.days.size - a.days.size || a.phrase.localeCompare(b.phrase));

  console.log(`\n#### ${themeName}: ${rows.length} phrase(s) that read like defined terms and are not`);
  for(const r of rows.slice(0, limit)){
    const onSyllabus = claimsWord(themeName, r.tech, claimed);
    console.log(`    ${r.phrase}  ·  ${r.n} use(s) across ${r.days.size} day(s)  · built on "${r.tech}"${onSyllabus ? ', which is on the syllabus' : ''}`);
    console.log(`        ${r.where.join('  |  ')}`);
  }
  if(rows.length > limit) console.log(`    … ${rows.length - limit} more (--limit ${rows.length})`);
}
