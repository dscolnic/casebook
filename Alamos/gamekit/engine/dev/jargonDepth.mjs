// jargonDepth.mjs — how much vocabulary a word is built out of, and whether the
// game introduced those parts first.
//
//   node engine/dev/jargonDepth.mjs <theme> [--all] [--limit N] [--check]
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
// Three rules, all of them enforced by `--check`:
//
//   1. NO LOAD-BEARING GAP. A part that two or more defined terms rest on has to
//      be defined itself. One term leaning on one undefined word is an author's
//      shorthand; three terms leaning on the same one is a concept the game
//      forgot to teach — "ion", holding up anion, cation and ligand in a
//      chemistry game that never said what an ion is.
//   2. PARTS BEFORE WHOLES. A term whose NAME is built from another term may not
//      arrive first. "Polyatomic anion" is unreadable without anion; a
//      definition that leans on a later term is the same fault one step softer —
//      it only bites a player who opens the glossary — and is failed too, now
//      that every game is clean of both.
//   3. THE CARD HAS TO CARRY IT. The plan card prints the FIRST SENTENCE of a
//      glossary entry, not the whole thing, and a phrase used in a question is
//      only as introduced as that sentence makes it. "Polyatomic anion" resolves
//      to Anion and passed every rule above while the word "polyatomic" was
//      explained in Anion's second sentence — the one nobody reads before the
//      day. So: every technical word inside a phrase the questions use must be
//      ordinary, claimed by the syllabus, a defined term in its own right, or
//      said in the first sentence of the entry it belongs to.
//   4. THE CARD INTRODUCES ITS OWN WORDS FIRST. "Cation — a positively charged
//      ion" gives the player one word they have and one they do not, unless Ion
//      was printed first. Every defined term named in a card line must have had
//      a card line of its own, earlier on that card or on an earlier day. The
//      primer deriver honours this by pulling a term's prerequisites in ahead of
//      it and dropping any term whose prerequisites will not fit the two lines a
//      card gets; this rule is what stops an authored primer from doing worse.
//   5. A DEPTH CEILING THAT RISES. Day one may introduce a term built on one
//      other term and no more: ceiling 2, then one more every two days, to a
//      cap of 6, which a fifteen-day campaign reaches on day eleven. A stack six
//      concepts deep is a fair thing to ask in the last week of a campaign and an
//      unfair one on the first morning.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const args = process.argv.slice(2);
const checkMode = args.includes('--check');
const limit = Number(args[args.indexOf('--limit') + 1]) || 25;
const wanted = args.includes('--all') ? themeNames() : [args[0]].filter(Boolean);
if(!wanted.length){
  console.error('usage: node engine/dev/jargonDepth.mjs <theme> [--all] [--limit N]');
  process.exit(2);
}

let failures = 0;
const { ordinary, norm, stems } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/common-words.mjs')).href);
const { claimedWords, claimsWord, claimsPhrase } = await import(pathToFileURL(resolve(import.meta.dirname, '../../tools/syllabus.js')).href)
  .catch(() => ({ claimedWords: () => new Set(), claimsWord: () => false, claimsPhrase: () => false }));
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
  // Los Alamos is a place, Oppenheimer is a person, and neither is a concept a
  // definition is built on. Same rule the sweep uses, same reason.
  const properNames = new Set();
  for(const p of [...(content.ROSTER ?? []), ...(content.LEADERS ?? [])])
    for(const w of words(p?.name)) properNames.add(norm(w));
  for(const g of content.GROUPS ?? []) for(const w of words(g?.name)) properNames.add(norm(w));
  for(const w of words([theme.title, theme.subtitle, theme.name].filter(Boolean).join(' '))) properNames.add(norm(w));
  const claimed = claimedWords(themeName);
  // Also a shorter word the syllabus names in a longer one: "atom" under "atomic
  // number". The matcher's own floor is five letters, which is right for a queue
  // of long words and wrong here, where the roots are the whole question.
  const assumed = (w) => claimsWord(themeName, w, claimed)
    || [...new Set([w, ...stems(w)])].some(r => r.length >= 3 && (claimed.exact?.has(r)
      || (r.length >= 4 && [...claimed].some(c => c.startsWith(r)))));
  const HOLLOW = /course concept used in|should be defined|in the game, the term/i;
  const defined = (t) => t?.def && !HOLLOW.test(t.def);

  // The parts of a term: technical words in its name, then in its definition.
  // Its own names do not count against it — "anion" is not a part of Anion.
  const partsOf = (t) => {
    const own = new Set([t?.name, ...(t?.aliases ?? [])].filter(Boolean).flatMap(n => words(n).map(norm)));
    const inName = words(t?.name).map(norm).filter(w => technical(w) && !own.has(w));
    const inDef = defined(t) ? words(t.def).map(norm).filter(technical) : [];
    const out = new Map();
    // multiword terms, matched whole against the definition. A phrase that
    // matches consumes its own words: "polyatomic anion" resolves to Anion, and
    // reporting "polyatomic" as undefined underneath it is the same fact twice.
    const consumed = new Set();
    if(defined(t)){
      const hay = t.def.toLowerCase();
      for(const { phrase, t: p } of byPhrase){
        if(p === t || own.has(norm(phrase.replace(/\s+/g, '')))) continue;
        if(defined(p) && hay.includes(phrase) && !claimsPhrase(themeName, phrase, claimed)){
          out.set(phrase, { dep: p, fromName: false });
          for(const w of words(phrase)) consumed.add(norm(w));
        }
      }
    }
    for(const w of [...inName, ...inDef]){
      if(consumed.has(w)) continue;
      if(own.has(w) && !inName.includes(w)) continue;
      const dep = byWord.get(w);
      if(dep === t) continue;
      // A part the syllabus claims adds no depth even when the glossary also
      // defines it. Depth is meant to count the vocabulary this GAME has to
      // teach, and "proton", "isotope" and "fission" are what a nuclear unit
      // walks in with — a courtesy glossary entry for one of them should not
      // make every term above it a concept deeper.
      if(assumed(w) || properNames.has(w)) continue;
      if(dep && defined(dep)){ out.set(w, { dep, fromName: inName.includes(w) }); continue; }
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
    const deps = [...parts.get(t).values()].filter(Boolean).map(v => v.dep);
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
    deps: [...parts.get(t).entries()].filter(([, v]) => v).map(([w, v]) => ({ w, dep: v.dep, fromName: v.fromName })),
  }));

  // Out of order: a part the player has to hold first, that the game shows later.
  // Same day is allowed — a definition can arrive in the same morning — but a
  // later day is the failure this whole tool is for.
  // Two kinds, and they are not the same failure. A part of the NAME is one the
  // player has to parse to read the phrase at all — "polyatomic anion" is unread
  // able without anion. A part of the DEFINITION only bites if they open the
  // glossary. The first is a gate; the second is worth knowing.
  const outOfOrder = [];
  const lateInDef = [];
  for(const r of rows){
    for(const { dep, fromName } of r.deps){
      const dd = dayOf(dep);
      if(!Number.isFinite(dd) || dd <= r.day) continue;   // never used, or already met
      (fromName ? outOfOrder : lateInDef).push({ r, dep, dd });
    }
  }

  // A gap ranked by how much of the glossary leans on it: "ion" holding up anion
  // and cation is a different problem from one term using one undefined word.
  // What the plan card actually prints: one sentence, so that is the sentence a
  // phrase has to be explained by.
  const firstSentence = (t) => {
    const full = String(t?.def ?? '').replace(/\s+/g, ' ').trim();
    return (full.match(/^[^.!?]*[.!?]/)?.[0] ?? full).toLowerCase();
  };
  // Every technical word inside a name or alias the questions use, that the entry
  // does not say in its own first sentence and nothing else defines.
  const unexplained = [];
  for(const t of JARGON){
    if(!defined(t)) continue;
    const head = firstSentence(t);
    for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
      const ws = words(n);
      if(ws.length < 2) continue;                       // a single word is its own entry
      if(!firstDay.has(norm(String(n).replace(/\s+/g, ' ').toLowerCase().split(' ')[0]))) { /* still check */ }
      const usedInGame = String(n).toLowerCase().split(/\s+/).every(w => firstDay.has(norm(w)));
      if(!usedInGame) continue;
      const tail = String(t.def).replace(/\s+/g, ' ').trim().slice(head.length).toLowerCase();
      for(const w of ws.map(norm)){
        if(!technical(w) || assumed(w) || properNames.has(w)) continue;
        if(head.includes(w)) continue;                  // the card's own sentence says it
        const own = byWord.get(w);
        if(own && own !== t && defined(own)) continue;  // it has an entry of its own
        // The precise failure: the entry DOES explain the word, further down,
        // where the plan card has already stopped printing. A word the entry
        // never mentions at all is a different thing — usually one the first
        // sentence explains in substance, like "spontaneous" under "happens on
        // its own" — and this rule does not pretend to judge that.
        if(!tail.includes(w)) continue;
        unexplained.push({ t, phrase: String(n), w });
      }
    }
  }

  // Rule 5, and the one a player actually feels: the plan card may not define a
  // word with a word it has not given them yet. "Cation — a positively charged
  // ion" is two words on that line, one of them known and one of them not,
  // unless Ion was printed first. Cards are read in order, days are read in
  // order, so the test is in order too.
  const cardOrder = [];
  {
    const seenTerms = new Set();
    const byName = new Map(JARGON.map(t => [String(t?.name ?? '').toLowerCase(), t]));
    const single = new Map();
    for(const t of JARGON){
      if(!defined(t)) continue;
      for(const n of [t?.name, ...(t?.aliases ?? [])].filter(Boolean)){
        const w = String(n).trim().toLowerCase();
        if(!/\s/.test(w) && !single.has(w)) single.set(w, t);
      }
    }
    MISSIONS.forEach((m, mi) => {
      for(const line of m.primer ?? []){
        const [head, ...rest] = String(line).split(' — ');
        const t = byName.get(String(head).trim().toLowerCase());
        if(!t || !rest.length) continue;
        const own = new Set([t?.name, ...(t?.aliases ?? [])].filter(Boolean).map(n => String(n).toLowerCase()));
        for(const w of rest.join(' — ').toLowerCase().match(/[a-z][a-z0-9'’-]*/g) ?? []){
          const dep = single.get(w);
          if(!dep || dep === t || own.has(w)) continue;
          if(!seenTerms.has(dep)) cardOrder.push({ day: mi + 1, t, dep, w });
        }
        seenTerms.add(t);
      }
    });
  }

  // Ceiling: 2 on day one, one more every three days, capped at 6.
  const ceilingFor = (day) => Math.min(6, 2 + Math.floor((day - 1) / 2));
  const gapWeight = new Map();
  for(const r of rows) for(const g of r.gaps) gapWeight.set(g, (gapWeight.get(g) ?? 0) + 1);

  const deep = rows.filter(r => r.d >= 2).sort((a, b) => b.d - a.d || a.day - b.day);
  if(!checkMode) console.log(`\n#### ${themeName}: ${rows.length} glossary term(s) the game uses — `
    + `${deep.length} built on other terms, ${[...gapWeight.keys()].length} part(s) nothing defines`);

  if(!checkMode) console.log(`\n  DEPTH — built on other terms, deepest first:`);
  if(!checkMode) for(const r of deep.slice(0, limit)){
    const chain = r.deps.map(({ w, dep }) => `${w}→${dep.name}(${depth.get(dep)})`).join(', ');
    console.log(`    ${r.d}  ${r.t.name}  · first seen d${r.day}`);
    console.log(`        built on: ${chain || '—'}${r.gaps.length ? `  · never defined: ${r.gaps.join(', ')}` : ''}`);
  }
  if(!checkMode && deep.length > limit) console.log(`    … ${deep.length - limit} more (--limit ${deep.length})`);

  if(!checkMode) console.log(`\n  GAPS — a part of a defined term that nothing defines, most depended on first:`);
  const gaps = [...gapWeight.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if(!checkMode) for(const [w, n] of gaps.slice(0, limit)){
    const owners = rows.filter(r => r.gaps.includes(w)).map(r => r.t.name).slice(0, 4);
    console.log(`    ${w}  — ${n} term(s) built on it: ${owners.join(', ')}${n > 4 ? ' …' : ''}`
      + (firstDay.has(w) ? `  · the player first reads it on d${firstDay.get(w)}` : ''));
  }
  if(!checkMode && gaps.length > limit) console.log(`    … ${gaps.length - limit} more`);

  if(!checkMode) console.log(`\n  OUT OF ORDER — a term whose NAME is built from a term the player meets later:`);
  if(!checkMode && !outOfOrder.length) console.log(`    (none)`);
  if(!checkMode) for(const { r, dep, dd } of outOfOrder.sort((a, b) => a.r.day - b.r.day).slice(0, limit)){
    console.log(`    d${r.day} ${r.t.name} needs ${dep.name}, first seen d${dd}`);
  }
  if(!checkMode && outOfOrder.length > limit) console.log(`    … ${outOfOrder.length - limit} more`);

  const overCeiling = rows.filter(r => r.d > ceilingFor(r.day)).sort((a, b) => a.day - b.day || b.d - a.d);
  if(!checkMode){
    console.log(`\n  UNEXPLAINED IN THE PHRASE — a word inside a term the questions use that its own first sentence never says:`);
    if(!unexplained.length) console.log(`    (none)`);
    for(const u of unexplained.slice(0, limit)) console.log(`    "${u.phrase}" — nothing says what "${u.w}" means`);
    if(unexplained.length > limit) console.log(`    … ${unexplained.length - limit} more`);
  }

  if(!checkMode){
    console.log(`\n  CARD ORDER — a plan card defining a term with one it has not introduced:`);
    if(!cardOrder.length) console.log(`    (none)`);
    for(const c of cardOrder.slice(0, limit)) console.log(`    d${c.day} ${c.t.name} is defined with "${c.w}" — ${c.dep.name} has not been on a card`);
  }

  if(!checkMode) console.log(`\n  OVER THE CEILING — deeper than the day allows (day 1 allows 2, one more every two days):`);
  if(!checkMode && !overCeiling.length) console.log(`    (none)`);
  if(!checkMode) for(const r of overCeiling.slice(0, limit)){
    console.log(`    d${r.day} ${r.t.name} is ${r.d} deep, ceiling ${ceilingFor(r.day)}`);
  }
  if(!checkMode && overCeiling.length > limit) console.log(`    … ${overCeiling.length - limit} more`);

  if(!checkMode) console.log(`\n  LATE IN THE GLOSSARY — a definition leans on a term the player meets later:`);
  if(!checkMode && !lateInDef.length) console.log(`    (none)`);
  if(!checkMode) for(const { r, dep, dd } of lateInDef.sort((a, b) => a.r.day - b.r.day).slice(0, limit)){
    console.log(`    d${r.day} ${r.t.name} is defined with ${dep.name}, first seen d${dd}`);
  }
  if(!checkMode && lateInDef.length > limit) console.log(`    … ${lateInDef.length - limit} more`);

  if(checkMode){
    const loadBearing = [...gapWeight.entries()].filter(([, n]) => n >= 2);
    const problems = [
      ...loadBearing.map(([w, n]) => `"${w}" holds up ${n} defined term(s) and nothing defines it`),
      ...outOfOrder.map(({ r, dep, dd }) => `${r.t.name} (d${r.day}) is named from ${dep.name}, first seen d${dd}`),
      ...lateInDef.map(({ r, dep, dd }) => `${r.t.name} (d${r.day}) is defined with ${dep.name}, first seen d${dd}`),
      ...cardOrder.map(c => `the day ${c.day} card defines ${c.t.name} with "${c.w}", and ${c.dep.name} has not been on a card yet`),
      ...unexplained.map(u => `"${u.phrase}" uses "${u.w}", which nothing defines and ${u.t.name}'s first sentence — the line the plan card prints — does not say`),
      ...overCeiling.map(r => `${r.t.name} (d${r.day}) is ${r.d} concepts deep, and day ${r.day} allows ${ceilingFor(r.day)}`),
    ];
    if(problems.length){
      console.error(`\n✗ theme "${themeName}" jargon depth: ${problems.length} problem(s)`);
      problems.forEach(p => console.error('  ✗ ' + p));
      failures += problems.length;
    } else {
      console.log(`\n✓ theme "${themeName}": every term rests on parts the player already has, and none is deeper than its day allows`);
    }
  }
}

if(checkMode) process.exit(failures ? 1 : 0);
