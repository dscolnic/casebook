// jargonDepth.mjs — how much vocabulary a word is built out of, and whether the
// game introduced those parts first.
//
//   node engine/dev/jargonDepth.mjs <theme> [--all] [--limit N]
//
// `jargonSweep` asks whether a word belongs in the game at all. `checkJargon`
// asks whether it was introduced before it was needed. Neither can see the thing
// that makes "polyatomic anion" hard on day one: it is not one word, it is three
// concepts stacked — an ion, the fact that a group of atoms can carry one charge
// together, and the sign of that charge — and Riverton defines exactly one of
// them, in a glossary entry the player has to go and find.
//
// ## The measure
//
// A term's PARTS are the technical words inside its name and inside its own
// definition. A part is technical when it is not ordinary English; the length
// floor is three, not five, because "ion", "pH" and "mole" are short and are
// precisely the words everything else is built on.
//
//   depth 1   every part is ordinary English — the term stands on its own
//   depth 2   it is built on one defined term
//   depth n   ... which is built on another, n deep
//
// A part with no glossary entry anywhere is a GAP: the player is expected to
// already hold it, and nothing in the game ever says so. A gap does not stop the
// count, it is reported separately, because it is the more serious finding — a
// chain three deep whose links are all defined is a course, and a chain two deep
// with a missing link is a bluff.
//
// ## The rule this exists to enforce
//
// A term may be introduced only after the terms it is built from. Concretely:
// for every term the questions use, each of its defined parts must first appear
// on an earlier day. What that catches is not a hard word — the sweep finds
// those — but a hard word arriving in the wrong order, which is the failure that
// makes a player feel stupid rather than taught.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const args = process.argv.slice(2);
const limit = Number(args[args.indexOf('--limit') + 1]) || 25;
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/jargonDepth.mjs <theme> [--all] [--limit N]');
  process.exit(2);
}

const { ordinary, norm, stems } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/common-words.mjs')).href);
const { claimedWords, claimsWord } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/syllabus.js')).href)
  .catch(() => ({ claimedWords: () => new Set(), claimsWord: () => false }));
const words = (s) => String(s ?? '').match(/[A-Za-z][A-Za-z0-9'’\/-]*/g) ?? [];
const label = (c) => (typeof c === 'string' ? c : c?.label ?? c?.text ?? '');

// Three letters, not five. The words a chemistry glossary is built on are the
// short ones — ion, mole, pH — and a floor written for "spectrophotometer" lets
// every one of them through as though it were ordinary English.
const technical = (w) => {
  const k = norm(w);
  return k.length >= 3 && !ordinary(k) && !/^\d+$/.test(k);
};

for(const themeName of wanted){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  const CURRICULUM = content.CURRICULUM ?? {};
  const MISSIONS = content.MISSIONS ?? [];
  const JARGON = content.JARGON ?? [];

  // Every name and alias, pointing at its entry, so a part can be resolved to a
  // definition the game actually ships.
  // Only whole names. A term of one word is matched by that word; a term of two
  // is matched by the pair and never by half of it, because "fast" in a
  // definition is not a reference to Fast neutron and "half" is not Half-life —
  // and taking them for one built Project Y a dependency chain fourteen deep out
  // of ordinary adjectives.
  const byWord = new Map();
  const byPhrase = [];
  for(const t of JARGON){
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
      const parts = words(n);
      if(parts.length === 1){ if(!byWord.has(norm(parts[0]))) byWord.set(norm(parts[0]), t); }
      else byPhrase.push({ phrase: String(n).toLowerCase(), t });
    }
  }
  // A part the syllabus claims is prior knowledge the course is entitled to
  // expect — "electron" and "atomic number" are the first week of any chemistry
  // class. It is not a gap; it is the floor the game is allowed to stand on.
  const claimed = claimedWords(themeName);
  // Also a shorter word the syllabus names in a longer one: "atom" under "atomic
  // number". The matcher's own floor is five letters, which is right for a queue
  // of long words and wrong here, where the roots are the whole question.
  const assumed = (w) => claimsWord(themeName, w, claimed)
    || [...new Set([w, ...stems(w)])].some(r => r.length >= 4 && [...claimed].some(c => c.startsWith(r)));
  const HOLLOW = /course concept used in|should be defined|in the game, the term/i;
  const defined = (t) => t?.def && !HOLLOW.test(t.def);

  // The parts of a term: technical words in its name, then in its definition.
  // Its own names do not count against it — "anion" is not a part of Anion.
  const partsOf = (t) => {
    const own = new Set([t?.name, ...(t?.aliases ?? [])].filter(Boolean).flatMap(n => words(n).map(norm)));
    const inName = words(t?.name).map(norm).filter(w => technical(w) && !own.has(w));
    const inDef = defined(t) ? words(t.def).map(norm).filter(technical) : [];
    const out = new Map();
    // multiword terms, matched whole against the definition
    if(defined(t)){
      const hay = t.def.toLowerCase();
      for(const { phrase, p } of byPhrase.map(x => ({ phrase: x.phrase, p: x.t }))){
        if(p === t || own.has(norm(phrase.replace(/\s+/g, '')))) continue;
        if(defined(p) && hay.includes(phrase)) out.set(phrase, p);
      }
    }
    for(const w of [...inName, ...inDef]){
      if(own.has(w) && !inName.includes(w)) continue;
      const dep = byWord.get(w);
      if(dep === t) continue;
      if(dep && defined(dep)){ out.set(w, dep); continue; }
      if(assumed(w)) continue;                       // the course may expect it
      if(!out.has(w)) out.set(w, null);              // null = a gap
    }
    return out;
  };

  const parts = new Map(JARGON.map(t => [t, partsOf(t)]));
  const depth = new Map();
  const measure = (t, seen = new Set()) => {
    if(depth.has(t)) return depth.get(t);
    if(seen.has(t)) return 1;                       // a definition that circles back
    seen.add(t);
    const deps = [...parts.get(t).values()].filter(Boolean);
    const d = deps.length ? 1 + Math.max(...deps.map(x => measure(x, seen))) : 1;
    seen.delete(t);
    depth.set(t, d);
    return d;
  };
  for(const t of JARGON) measure(t);

  // When the game first puts a word in front of the player, day by day. Scene and
  // verdict count: this is about meeting the word, not about being asked it.
  const firstDay = new Map();
  MISSIONS.forEach((m, mi) => {
    for(const stop of m.stops ?? []){
      const l = CURRICULUM[stop.group]?.[stop.lesson];
      if(!l) continue;
      const ch = l.game ?? {};
      const text = [l.title, l.scene, ch.task ?? ch.play, ch.question, ch.headline, ch.why,
        ...(l.assumes ?? []), ...(ch.rebuttals ?? []).map(label), ...(ch.choices ?? []).map(label),
        ...(ch.cards ?? []).map(label), ...(ch.scenarios ?? []).map(label),
        ...(ch.givens ?? []).map(label), ...(ch.proposals ?? []).map(label)].filter(Boolean).join('  ');
      for(const w of words(text)){
        const k = norm(w);
        if(!firstDay.has(k)) firstDay.set(k, mi + 1);
      }
    }
  });
  const dayOf = (t) => Math.min(...[t?.name, ...(t?.aliases ?? [])].filter(Boolean)
    .flatMap(n => words(n).map(w => firstDay.get(norm(w)) ?? Infinity)));

  const used = JARGON.filter(t => Number.isFinite(dayOf(t)));
  const rows = used.map(t => ({
    t, d: depth.get(t), day: dayOf(t),
    gaps: [...parts.get(t).entries()].filter(([, dep]) => !dep).map(([w]) => w),
    deps: [...parts.get(t).entries()].filter(([, dep]) => dep).map(([w, dep]) => ({ w, dep })),
  }));

  // Out of order: a part the player has to hold first, that the game shows later.
  // Same day is allowed — a definition can arrive in the same morning — but a
  // later day is the failure this whole tool is for.
  const outOfOrder = [];
  for(const r of rows){
    for(const { dep } of r.deps){
      const dd = dayOf(dep);
      if(dd > r.day) outOfOrder.push({ r, dep, dd });
    }
  }

  // A gap ranked by how much of the glossary leans on it: "ion" holding up anion
  // and cation is a different problem from one term using one undefined word.
  const gapWeight = new Map();
  for(const r of rows) for(const g of r.gaps) gapWeight.set(g, (gapWeight.get(g) ?? 0) + 1);

  const deep = rows.filter(r => r.d >= 2).sort((a, b) => b.d - a.d || a.day - b.day);
  console.log(`\n#### ${themeName}: ${rows.length} glossary term(s) the game uses — `
    + `${deep.length} built on other terms, ${[...gapWeight.keys()].length} part(s) nothing defines`);

  console.log(`\n  DEPTH — built on other terms, deepest first:`);
  for(const r of deep.slice(0, limit)){
    const chain = r.deps.map(({ w, dep }) => `${w}→${dep.name}(${depth.get(dep)})`).join(', ');
    console.log(`    ${r.d}  ${r.t.name}  · first seen d${r.day}`);
    console.log(`        built on: ${chain || '—'}${r.gaps.length ? `  · never defined: ${r.gaps.join(', ')}` : ''}`);
  }
  if(deep.length > limit) console.log(`    … ${deep.length - limit} more (--limit ${deep.length})`);

  console.log(`\n  GAPS — a part of a defined term that nothing defines, most depended on first:`);
  const gaps = [...gapWeight.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  for(const [w, n] of gaps.slice(0, limit)){
    const owners = rows.filter(r => r.gaps.includes(w)).map(r => r.t.name).slice(0, 4);
    console.log(`    ${w}  — ${n} term(s) built on it: ${owners.join(', ')}${n > 4 ? ' …' : ''}`
      + (firstDay.has(w) ? `  · the player first reads it on d${firstDay.get(w)}` : ''));
  }
  if(gaps.length > limit) console.log(`    … ${gaps.length - limit} more`);

  console.log(`\n  OUT OF ORDER — a term arrives before the term it is built from:`);
  if(!outOfOrder.length) console.log(`    (none)`);
  for(const { r, dep, dd } of outOfOrder.sort((a, b) => a.r.day - b.r.day).slice(0, limit)){
    console.log(`    d${r.day} ${r.t.name} needs ${dep.name}, first seen d${dd}`);
  }
  if(outOfOrder.length > limit) console.log(`    … ${outOfOrder.length - limit} more`);
}
