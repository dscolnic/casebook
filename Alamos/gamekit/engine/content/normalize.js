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

/** The formats the question UI can render. Everything maps onto one of these. */
export const FORMATS = new Set([
  'PROTOCOL', 'SEQUENCE', 'BALLPARK', 'SCIENCETANK',
  'DIAGNOSIS', 'TRIAGE', 'CASEBOOK', 'CHOICE',
]);

/** 'Science Tank' | 'sciencetank' | 'SCIENCE_TANK' -> 'SCIENCETANK'. */
export function canonicalType(type){
  return String(type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
}

const baseTitle = (t) => String(t ?? '').replace(/ — Review \d+$/, '');

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
export function normalizeContent(content = {}){
  const changes = [];
  const problems = [];
  const curriculum = content.CURRICULUM ?? {};
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

  // ---- last: the shape of the days themselves
  shapeMissions(content.MISSIONS ?? [], curriculum, changes);
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
  const seen = new Set();
  let printed = 0;
  for(const m of missions){
    const lessons = (m.stops ?? []).map(s => curriculum[s.group]?.[s.lesson]).filter(Boolean);
    const rows = [];
    for(const l of lessons){
      for(const eq of l.equations ?? []){
        if(!eq?.e || seen.has(eq.e)) continue;
        seen.add(eq.e);
        rows.push({ e: eq.e, c: eq.c ?? '', ...(eq.computed ? { computed: true } : {}) });
      }
    }
    if(rows.length){ m.equations = rows; printed += rows.length; }
  }
  if(printed) changes.push(`${printed} course equation(s) placed on the day card that first needs them`);
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
 * A callback prefers a `— Review` variant of the lesson where the theme has one
 * (the hospital has 105 of them, none of which were reachable), and otherwise
 * re-asks the lesson itself, which is what spacing means.
 *
 * Deep Watch needs almost none of the first rule — it was authored interleaved
 * — and Project Y needs none of it. Both still get the callbacks.
 */
export function shapeMissions(missions = [], curriculum = {}, changes = []){
  if(!Array.isArray(missions) || !missions.length) return missions;
  /** Lessons already taught, oldest first: [group, lessonIndex, title]. */
  const taught = [];
  const calledBack = new Set();

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
    const seen = new Set();
    for(const stop of mission.stops){
      if(seen.has(stop.group)){
        if(stop.person !== true){
          stop.person = true;
          changes.push(`day ${day + 1}: second call on ${stop.group} becomes a person stop`);
        }
      } else {
        seen.add(stop.group);
        stop.person = false;
      }
    }
    if(!mission.stops.some(s => s.person)){
      // The middle of the day, so it is neither the opening nor the close.
      const at = Math.min(1, mission.stops.length - 1);
      mission.stops[at].person = true;
      changes.push(`day ${day + 1}: call ${at + 1} becomes the day's person stop`);
    }

    // ---- the callback, from the third day on
    if(day >= 2){
      // Oldest first, and something not already revisited if there is one —
      // but with six areas and three in the day, the early days can run out of
      // fresh material, and a second retrieval of the same lesson is worth more
      // than no retrieval at all.
      const candidate = taught.find(t => !calledBack.has(`${t.group}:${t.lesson}`) && !seen.has(t.group))
                     ?? taught.find(t => !seen.has(t.group));
      if(candidate){
        calledBack.add(`${candidate.group}:${candidate.lesson}`);
        const lessons = curriculum[candidate.group] ?? [];
        const base = lessons[candidate.lesson];
        // A review variant if the theme wrote one, the lesson itself otherwise.
        const reviewAt = lessons.findIndex(l =>
          typeof l?.title === 'string' && base?.title
          && l.title.startsWith(base.title) && /review/i.test(l.title));
        const lessonIdx = reviewAt >= 0 ? reviewAt : candidate.lesson;
        mission.stops.push({
          group: candidate.group,
          lesson: lessonIdx,
          task: `Second look — ${base?.title ?? 'earlier work'}`,
          title: base?.title ?? '',
          // A callback is a room: it is the day's other building, and the point
          // of it is partly that the player goes somewhere else.
          person: false,
          callback: true,
        });
        changes.push(`day ${day + 1}: callback to ${candidate.group} lesson ${lessonIdx}`);
      }
    }

    for(const stop of mission.stops){
      if(!stop.callback) taught.push({ group: stop.group, lesson: stop.lesson });
    }
  });
  return missions;
}
