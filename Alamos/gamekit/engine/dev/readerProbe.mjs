// readerProbe.mjs — hand every answerable stop to a weaker model, twice, and see
// which cards it cannot follow.
//
//   node engine/dev/readerProbe.mjs --harvest            all ten Quick Discoveries
//   node engine/dev/readerProbe.mjs --harvest qd_nucleus one of them
//   node engine/dev/readerProbe.mjs --report
//   node engine/dev/readerProbe.mjs --selftest
//
// WHY A WEAKER MODEL, AND WHY TWICE.
//
// A strong model answers ninety stops correctly and teaches you nothing about the
// writing. A weak one gets things wrong — and **a weak model getting a question
// wrong is not evidence the question is bad**, which is this repo's most expensive
// rule arriving in a new place. It fails two ways that look identical in a score:
// it does not know the physics (the question is working), or the card is
// ambiguous, under-specified or misleading (the question needs fixing). A tally
// cannot separate those, and a tally is what an obvious version of this would
// produce.
//
// So every stop is answered under two conditions:
//
//   card  — everything the player sees before they answer: scene, guide, the
//           Background door, the equations, what the stop takes as read.
//   bare  — the question and the options. Nothing else.
//
// The pair is what carries the finding:
//
//   card ✗ · bare ✗   the card is missing something the question needs
//   card ✗ · bare ✓   THE CARD MADE IT WORSE — rarest and sharpest
//   card ✓ · bare ✓   answerable from general knowledge; the science is decoration
//   card ✓ · bare ✗   working as intended
//
// The third row is `probeQuestions`' rule with a reader instead of a keyword
// heuristic, and it finds phrasings no word list can: a distractor that is
// implausible on general grounds, an option whose units give it away.
//
// WHAT IS NOT MEASURED, out loud rather than silently. 37 of the 90 stops are
// live instruments — SWEEP, PROBE, CONTROL, HOLDOUT, ALLOCATE and the rest — whose
// answer is a thing you do to a panel over several moves, not a choice among
// options. Serialising those into text would be inventing a question the game
// does not ask. They are listed as out of scope in the report; the 53 covered are
// every stop with an unambiguous answer key.
//
// THE BLINDING IS THE WHOLE VALIDITY OF THIS. A prompt that leaks `answer`, `why`,
// the rebuttals, the BALLPARK solution or the takeaway produces a clean sweep and
// a conclusion that every card is fine. `--selftest` asserts it against the real
// harvest, because a blinding rule checked only on a fixture is a blinding rule
// checked on the one text that was written to pass it.
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeDir, themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..', '..');
const OUT = resolve(gamekit, 'reader-probe');
/**
 * Where the answer key is written, and it is deliberately not `OUT`.
 *
 * The readers are told to open one prompt file. A key sitting in the directory
 * next to it is a key one `ls` away, and a run whose bare condition scores
 * suspiciously well is a run you then cannot interpret. `GAMEKIT_PROBE_KEY`
 * points it somewhere else — a scratchpad outside the repo — and the default is
 * kept only so the tool works with no environment set.
 */
const KEY_PATH = process.env.GAMEKIT_PROBE_KEY || resolve(OUT, 'key.json');

/** The ten short-session games this was written for. */
const QUICK = () => themeNames().filter(n => /^qd_/.test(n));

/** Formats whose answer is a choice among things printed on the card. */
const COVERED = new Set(['CHOICE', 'DIAGNOSIS', 'SEQUENCE', 'PROTOCOL', 'BALLPARK']);

const LETTERS = 'ABCDEFGHIJKL'.split('');

// --------------------------------------------------------------- the shuffle
//
// Options are dealt in a fresh order in the real game, so presenting them in book
// order would measure position as well as prose — and `answerShape` already had to
// be written because the key was findable by its shape. Seeded on the stop id so a
// re-harvest asks the identical question: a run that is not reproducible cannot be
// compared against the next one after a rewrite.
function seeded(str){
  let h = 2166136261;
  for(let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h += 0x6D2B79F5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** Returns the shuffled list and, for each new position, where it came from. */
function shuffle(items, key){
  const rnd = seeded(key);
  const idx = items.map((_, i) => i);
  for(let i = idx.length - 1; i > 0; i--){
    const j = Math.floor(rnd() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return { list: idx.map(i => items[i]), from: idx };
}

// ------------------------------------------------------------- serialisation
const clean = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * What the player has read by the time the question is in front of them.
 *
 * Deliberately NOT: `why` (the verdict, which arrives after), `answer`,
 * `rebuttals` (also the verdict), `takeaway` (written for another surface), and
 * `story` — 122 of those exist across the repo and are displayed nowhere, so a
 * reader given one is being given something the player never sees.
 */
function cardText(lesson){
  const out = [];
  if(lesson.scene) out.push(`SCENE: ${clean(lesson.scene)}`);
  if(lesson.guide) out.push(`WHAT YOU ARE DOING: ${clean(lesson.guide)}`);
  const bg = Array.isArray(lesson.background) ? lesson.background : (lesson.background ? [lesson.background] : []);
  if(bg.length) out.push(`BACKGROUND:\n${bg.map(p => `  · ${clean(p)}`).join('\n')}`);
  const eq = Array.isArray(lesson.equations) ? lesson.equations : [];
  if(eq.length) out.push(`EQUATIONS GIVEN:\n${eq.map(e => `  · ${clean(e.e ?? e)}${e.name ? ` — ${clean(e.name)}` : ''}`).join('\n')}`);
  const as = Array.isArray(lesson.assumes) ? lesson.assumes : (lesson.assumes ? [lesson.assumes] : []);
  if(as.length) out.push(`TAKEN AS READ: ${as.map(clean).join('; ')}`);
  return out.join('\n\n');
}

/** The question, its options, and the key — one shape for every covered format. */
function askOf(lesson, calcs, id){
  const g = lesson.game ?? {};
  const type = String(g.type ?? '').toUpperCase();
  const q = clean(g.question || g.task || g.play);

  if(type === 'CHOICE' || type === 'DIAGNOSIS'){
    // A candidate is `{ label, mechanism }` on DIAGNOSIS and a plain string on
    // CHOICE. `clean()` on the object form gives "[object Object]" — which is
    // what four stops were served, and the reader said so in its `unclear` field
    // rather than the score showing anything. The mechanism line is rendered
    // beside the button in `questionUI.js`, so the player has it before they
    // answer and it belongs here too.
    const raw = g.choices ?? [];
    const labels = raw.map(c => clean(typeof c === 'string' ? c : c?.label));
    const choices = raw.map((c, i) => (typeof c === 'string' || !c?.mechanism)
      ? labels[i] : `${labels[i]} — ${clean(c.mechanism)}`);
    const { list, from } = shuffle(choices, id);
    const keyIdx = from.indexOf(labels.indexOf(clean(g.correctChoice)));
    const extra = [];
    if(g.headline) extra.push(`HEADLINE: ${clean(g.headline)}`);
    for(const r of g.readings ?? []){
      extra.push(`READING: ${clean(r.label ?? r.name ?? '')} = ${clean(r.value ?? r.reading ?? '')}`);
    }
    return { kind: 'one-of', question: q, extra,
      options: list.map((c, i) => `${LETTERS[i]}. ${c}`),
      // The bare labels, in the dealt order. The leak check needs these rather
      // than the composed lines: a DIAGNOSIS option is "label — mechanism", so
      // an exact-match exemption against the whole line stopped recognising the
      // correct option and reported `answer` as a leak on every one of them.
      labels: from.map(i => labels[i]),
      instruction: 'Answer with the single letter of the option you choose.',
      key: LETTERS[keyIdx] };
  }

  if(type === 'SEQUENCE'){
    const cards = (g.cards ?? []).map(clean);
    const { list, from } = shuffle(cards, id);
    // `order` is book positions in the right sequence; map each through the deal.
    const key = (g.order ?? cards.map((_, i) => i)).map(o => LETTERS[from.indexOf(o)]).join('');
    const rail = Array.isArray(g.ends) && g.ends.length === 2
      ? `The first slot is "${clean(g.ends[0])}" and the last is "${clean(g.ends[1])}".` : '';
    // `axis` is the authored instruction line and `question` is usually the same
    // sentence in fewer words, so printing both reads as a stutter. Prefer the
    // authored one and keep the short form only when it says something else.
    const axis = clean(g.axis);
    const stem = axis
      ? (axis.toLowerCase().startsWith(q.toLowerCase().slice(0, 12)) ? axis : `${q}. ${axis}`)
      : q;
    return { kind: 'ordering', question: [stem, rail].filter(Boolean).join(' '), extra: [],
      options: list.map((c, i) => `${LETTERS[i]}. ${c}`),
      instruction: `Answer with the letters in order, no spaces — for example "${LETTERS.slice(0, list.length).join('')}".`,
      key };
  }

  if(type === 'PROTOCOL'){
    const scen = (g.scenarios ?? []).map(clean);
    const choices = (g.choices ?? []).map(clean);
    const { list, from } = shuffle(choices, id);
    const key = (g.mapping ?? []).map(m => LETTERS[from.indexOf(m)]).join('');
    return { kind: 'matching', question: q,
      extra: scen.map((s, i) => `${i + 1}. ${s}`),
      options: list.map((c, i) => `${LETTERS[i]}. ${c}`),
      instruction: `Match each numbered item to one lettered option. Answer with one letter per numbered item, in order, no spaces — for example "${scen.map((_, i) => LETTERS[i]).join('')}".`,
      key };
  }

  if(type === 'BALLPARK'){
    const spec = calcs[g.calcKey];
    if(!spec) return null;
    const labels = (spec.labels ?? []).map(clean);
    const { list, from } = shuffle(labels, id);
    const key = (spec.correct ?? []).map(c => LETTERS[from.indexOf(c)]).join('');
    const extra = [];
    if(g.relationship) extra.push(`RELATIONSHIP: ${clean(g.relationship)}`);
    if(spec.template) extra.push(`THE SUM HAS THIS SHAPE: ${clean(spec.template)} — one tile per slot, in order.`);
    for(const gv of g.givens ?? []) extra.push(`GIVEN: ${clean(gv)}`);
    // The instruction is written from `correct`, not from `slots`. Those differ:
    // `{0} × {0}` has one selection and two appearances, and an instruction
    // saying "choose 1 tiles" over a two-slot shape got back "CC" and a reader
    // complaining, correctly, that the two did not agree. On the real panel the
    // player sees one empty slot and the template fills it in both places; in
    // text the slot numbers have to be named.
    const slotNums = [...new Set((spec.template ?? '').match(/\{(\d+)\}/g) ?? [])]
      .map(t => t.replace(/[{}]/g, ''));
    const nSel = (spec.correct ?? []).length;
    const named = slotNums.length ? slotNums.join(', then slot ') : '0';
    return { kind: 'tiles', question: clean(spec.question || q), extra,
      options: list.map((c, i) => `${LETTERS[i]}. ${c}`),
      instruction: `Name the tile that goes in slot ${named}`
        + ` — ${nSel} letter${nSel === 1 ? '' : 's'} in that order, no spaces`
        + `${nSel === 1 ? ' (the same tile fills every slot in the shape)' : ''}. `
        + `Then, after a space, give the number that comes out${spec.units ? `, in ${clean(spec.units)}` : ''}.`,
      key, units: spec.units ?? '', target: spec.target, tolerance: spec.tolerance };
  }
  return null;
}

// ------------------------------------------------------------------- harvest
function harvestTheme(name, mods){
  const { CURRICULUM, BALLPARK_CALCS = {} } = mods;
  const stops = [];
  const skipped = [];
  for(const [group, lessons] of Object.entries(CURRICULUM ?? {})){
    for(const [i, lesson] of (lessons ?? []).entries()){
      const type = String(lesson.game?.type ?? '').toUpperCase();
      const id = `${name}:${group}:${i}`;
      if(!COVERED.has(type)){ skipped.push({ id, type, title: lesson.title }); continue; }
      const ask = askOf(lesson, BALLPARK_CALCS, id);
      if(!ask){ skipped.push({ id, type, title: lesson.title, note: 'no answer key could be built' }); continue; }
      stops.push({ id, theme: name, group, day: lesson.day, title: clean(lesson.title),
        type, card: cardText(lesson), ask });
    }
  }
  return { stops, skipped };
}

/** The prompt a reader is handed. `withCard` is the only difference between them. */
function promptFor(stop, withCard){
  const a = stop.ask;
  const parts = [];
  if(withCard && stop.card) parts.push(stop.card);
  if(a.extra?.length) parts.push(a.extra.join('\n'));
  parts.push(`QUESTION: ${a.question}`);
  parts.push(a.options.join('\n'));
  parts.push(a.instruction);
  return parts.join('\n\n');
}

const SYSTEM = [
  'You are answering questions from a science teaching game. Answer each one as well as you can.',
  '',
  'For every question return one JSON object with exactly these fields:',
  '  "id"         the question id, copied exactly',
  '  "pick"       your answer, in the format the question asks for',
  '  "confidence" 1 to 5, where 1 is a guess and 5 is certain',
  '  "because"    one short sentence: what decided it',
  '  "unclear"    the exact phrase from the text above that you found ambiguous,',
  '               under-explained, or contradictory — copied verbatim. Empty string',
  '               if nothing was unclear. Do not paraphrase and do not invent one.',
  '',
  'Return a JSON array of those objects and nothing else. No prose before or after.',
].join('\n');

// ------------------------------------------------------------------ blinding
//
// The fields that must never reach a reader, and why each one would be fatal:
// `answer` and `why` are the verdict, `rebuttals` says why each wrong option is
// wrong, `solution`/`explanation` work the BALLPARK arithmetic, and `takeaway` is
// the principle the question is an instance of.
const FORBIDDEN = ['answer', 'why', 'rebuttals', 'solution', 'explanation', 'takeaway'];

/**
 * Every string in a lesson that must not appear in either prompt, by field.
 *
 * One field is exempt in one narrow case, and the exemption is the whole reason
 * this returns names rather than strings. `validateContent` requires that
 * `choices` contains `correctChoice` **verbatim**, because grading is by label —
 * and on 14 of these stops `answerText` is that same sentence. So the correct
 * option is legitimately in the prompt, and a rule that only asked "does the
 * prompt contain the answer string" failed all 14 on its first run. What is
 * exempt is `answer` when it is exactly one of the options offered. Nothing else
 * is exempt, and `answer` is not exempt when it is anything else.
 */
function leakStrings(lesson, calcs){
  const out = [];
  const push = (field, v) => { const s = clean(v); if(s.length > 25) out.push({ field, text: s }); };
  const g = lesson.game ?? {};
  push('answer', g.answer);
  push('why', g.why);
  push('takeaway', lesson.takeaway);
  for(const [k, r] of Object.entries(g.rebuttals ?? {})) push(`rebuttal:${k}`, r);
  const spec = calcs[g.calcKey];
  if(spec){ push('solution', spec.solution); push('explanation', spec.explanation); }
  return out;
}

/**
 * Is this forbidden string actually a leak, given what the prompt legitimately shows?
 *
 * `shown` is the bare option labels. It is not the rendered option lines: a
 * DIAGNOSIS option carries its mechanism after an em dash, so comparing against
 * the line makes the correct answer stop matching and every such stop reports a
 * leak that is the option doing its job.
 */
function isLeak({ field, text }, prompt, shown = []){
  if(!prompt.includes(text)) return false;
  // The correct option is meant to be on screen. Everything else is not.
  if(field === 'answer' && shown.some(o => clean(o) === text)) return false;
  return true;
}

// --------------------------------------------------------------------- run
const args = process.argv.slice(2);
const wantHarvest = args.includes('--harvest');
const wantReport = args.includes('--report');
const wantSelftest = args.includes('--selftest');
const named = args.filter(a => !a.startsWith('--'));

async function loadTheme(name){
  const f = resolve(themeDir(name), 'content', 'curriculum.js');
  if(!existsSync(f)) return null;
  return await import(pathToFileURL(f).href);
}

async function harvest(names){
  mkdirSync(resolve(OUT, 'prompts'), { recursive: true });
  mkdirSync(resolve(OUT, 'answers'), { recursive: true });
  const key = {};
  const skippedAll = [];
  let n = 0;
  for(const name of names){
    const mods = await loadTheme(name);
    if(!mods) continue;
    const { stops, skipped } = harvestTheme(name, mods);
    skippedAll.push(...skipped);
    for(const cond of ['card', 'bare']){
      const blocks = stops.map(s =>
        `--- ${s.id} ---\n${promptFor(s, cond === 'card')}`);
      writeFileSync(resolve(OUT, 'prompts', `${name}.${cond}.txt`),
        `${SYSTEM}\n\n${'='.repeat(70)}\n\n${blocks.join(`\n\n${'='.repeat(70)}\n\n`)}\n`);
    }
    for(const s of stops){
      key[s.id] = { theme: name, day: s.day, title: s.title, type: s.type,
        kind: s.ask.kind, key: s.ask.key,
        ...(s.ask.target !== undefined ? { target: s.ask.target, tolerance: s.ask.tolerance } : {}) };
    }
    n += stops.length;
    console.log(`${name.padEnd(14)} ${String(stops.length).padStart(2)} answerable · ${skipped.length} live instrument(s)`);
  }
  mkdirSync(dirname(KEY_PATH), { recursive: true });
  writeFileSync(KEY_PATH, JSON.stringify(key, null, 1));
  writeFileSync(resolve(OUT, 'out-of-scope.json'), JSON.stringify(skippedAll, null, 1));
  console.log(`\n${n} stop(s) × 2 conditions. ${skippedAll.length} live instruments out of scope.`);
  console.log(`prompts in ${OUT}/prompts, key in ${KEY_PATH}`);
  return n;
}

const norm = (v) => String(v ?? '').toUpperCase().replace(/[^A-Z0-9.]/g, '');

/**
 * How far an ordering is from the key, in adjacent swaps.
 *
 * Exact match alone cannot tell a reader who followed the argument and slipped
 * one pair from a reader who had no idea — and for a five-card SEQUENCE those
 * two are the whole of the signal. One swap is a disagreement about a single
 * pair, which usually means the card gave two rules and they disagree; four
 * swaps is noise.
 */
function swapsFrom(key, pick){
  const a = norm(key).split(''), b = norm(pick).split('');
  if(a.length !== b.length || new Set(a).size !== new Set(b).size) return null;
  if(a.some(ch => !b.includes(ch))) return null;
  // Bubble distance: the number of adjacent transpositions between the two.
  const target = b.map(ch => a.indexOf(ch));
  let n = 0;
  for(let i = 0; i < target.length; i++){
    for(let j = i + 1; j < target.length; j++) if(target[i] > target[j]) n++;
  }
  return n;
}

/** Did the reader get it right? One rule per kind, and none of them is fuzzy. */
function grade(entry, pick){
  const want = String(entry.key ?? '').toUpperCase();
  const got = String(pick ?? '').toUpperCase().replace(/[^A-Z0-9.\-+e ]/gi, '');
  if(entry.kind === 'tiles'){
    // "AB 3e-14" — the tiles are the graded half, which is what the panel grades.
    const letters = (got.match(/^[A-Z]+/) ?? [''])[0];
    return letters === want;
  }
  if(entry.kind === 'one-of') return got.trim().startsWith(want);
  return got.replace(/\s+/g, '') === want;
}

function report(){
  const key = JSON.parse(readFileSync(KEY_PATH, 'utf8'));
  const dir = resolve(OUT, 'answers');
  // Every answer for a stop under a condition, not the last one written. A file
  // may be `<theme>.<cond>.json` or `<theme>.<cond>.runN.json`; repeats are what
  // separate a question that was worked from one that was guessed.
  const got = { card: {}, bare: {} };
  for(const f of existsSync(dir) ? readdirSync(dir) : []){
    if(!f.endsWith('.json')) continue;
    const cond = /\.bare\b/.test(f) ? 'bare' : 'card';
    for(const a of JSON.parse(readFileSync(resolve(dir, f), 'utf8'))){
      (got[cond][a.id] ??= []).push(a);
    }
  }
  const rows = [];
  for(const [id, entry] of Object.entries(key)){
    const cs = got.card[id], bs = got.bare[id];
    if(!cs?.length || !bs?.length) continue;
    const c = cs[0], b = bs[0];
    const cardHits = cs.filter(a => grade(entry, a.pick)).length;
    // Compare only the part that is graded. A tiles answer carries a free-text
    // number after the letters, so `AB 2.72` and `AB 2.73` are the same choice
    // rounded differently — counting those as two answers put two boards in the
    // "no followable answer" bucket that are not merely followable but were
    // right every time.
    const graded = (v) => entry.kind === 'tiles'
      ? (norm(v).match(/^[A-Z]+/) ?? [''])[0] : norm(v);
    const barePicks = new Set(bs.map(a => graded(a.pick)));
    const cardPicks = new Set(cs.map(a => graded(a.pick)));
    rows.push({ id, ...entry,
      cardOK: grade(entry, c.pick), bareOK: grade(entry, b.pick),
      // How many times it was asked, how often it got there, and how many
      // DIFFERENT answers it gave. The last number is the one that matters:
      // a question with a followable answer produces one answer every time.
      runs: cs.length, cardHits, distinct: cardPicks.size,
      spread: [...cardPicks].join(' / '),
      near: entry.kind === 'ordering' || entry.kind === 'matching'
        ? swapsFrom(entry.key, c.pick) : null,
      cardConf: c.confidence, unclear: cs.map(a => a.unclear).find(Boolean) ?? '',
      because: c.because, cardPick: c.pick, barePick: b.pick,
      bareSpread: [...barePicks].join(' / ') });
  }
  if(!rows.length){
    console.log(`no answers yet — write them to ${OUT}/answers/<theme>.<card|bare>.json`);
    return 0;
  }
  const cell = (r) => (r.cardOK ? 'card ✓' : 'card ✗') + ' · ' + (r.bareOK ? 'bare ✓' : 'bare ✗');
  console.log('WHAT THE BARE COLUMN DOES AND DOES NOT MEAN. The reader is a language');
  console.log('model, so its prior is undergraduate physics — not a ninth grader\'s. A stop');
  console.log('it answers without the card is NOT thereby a stop a student could answer');
  console.log('without the card, and the "no science needed" bucket is not a defect list.');
  console.log('What it is good for is narrower and still worth having: an option set that');
  console.log('falls to elimination on general grounds — one hedged option among three');
  console.log('absolutes, a distractor that is implausible before you know any of the');
  console.log('physics, units that give it away. Read the `because` line: if it cites only');
  console.log('the option text and never the science, that is the finding.\n');

  const repeated = rows.filter(r => r.runs > 1);
  const buckets = {
    'NO FOLLOWABLE ANSWER — asked more than once, answered differently each time':
      repeated.filter(r => r.distinct > 1),
    'ONE PAIR APART — right but for a single swap, which usually means the card gave two rules that disagree at that pair':
      rows.filter(r => r.near === 1),
    'CARD MISLED IT — got it right without the card and wrong with it': rows.filter(r => !r.cardOK && r.bareOK),
    'CARD SHORT — wrong both ways; the card is missing what the question needs': rows.filter(r => !r.cardOK && !r.bareOK),
    'NO SCIENCE NEEDED — right without the card at all': rows.filter(r => r.cardOK && r.bareOK),
    'WORKING — the card is what made it answerable': rows.filter(r => r.cardOK && !r.bareOK),
  };
  for(const [head, list] of Object.entries(buckets)){
    console.log(`\n${head}  (${list.length})`);
    if(!list.length){ console.log('  —'); continue; }
    for(const r of list.sort((a, b2) => (a.cardConf ?? 0) - (b2.cardConf ?? 0))){
      console.log(`  ${r.theme}  day ${r.day}  ${r.type.padEnd(9)} ${r.title}`);
      console.log(`      ${cell(r)} · key ${r.key} · said ${r.cardPick} (bare ${r.barePick}) · confidence ${r.cardConf}`);
      if(r.runs > 1) console.log(`      asked ${r.runs}× with the card: right ${r.cardHits}/${r.runs}, `
        + `${r.distinct} distinct answer(s) — ${r.spread}`);
      if(r.near !== null && r.near > 0) console.log(`      ${r.near} adjacent swap(s) from the key`);
      if(r.because) console.log(`      because: ${r.because}`);
      if(r.unclear) console.log(`      UNCLEAR: “${r.unclear}”`);
    }
  }
  // Confusion is worth reading even where the answer came out right: a card that
  // is followed only by a reader who already knew the answer is still a bad card.
  const flagged = rows.filter(r => r.unclear && r.cardOK && !r.bareOK);
  console.log(`\nPHRASES FLAGGED ON STOPS THAT OTHERWISE WORKED  (${flagged.length})`);
  for(const r of flagged) console.log(`  ${r.theme} day ${r.day} — “${r.unclear}”`);
  console.log(`\n${rows.length} stop(s) scored. card ${rows.filter(r => r.cardOK).length}/${rows.length}`
    + ` · bare ${rows.filter(r => r.bareOK).length}/${rows.length}`);
  if(repeated.length){
    console.log(`${repeated.length} asked more than once; `
      + `${repeated.filter(r => r.distinct > 1).length} gave more than one answer.`);
  } else {
    console.log('Every stop was asked once. A single sample cannot tell a question that was '
      + 'worked from one that was guessed — re-run a condition into <theme>.<cond>.runN.json.');
  }
  return 0;
}

// ------------------------------------------------------------------ selftest
async function selftest(){
  const cases = [];
  const names = QUICK();

  // 1–2. The blinding, asserted against the REAL harvest rather than a fixture.
  //      A fixture is a text written to pass the rule it is testing.
  let leaks = 0, checked = 0;
  for(const name of names){
    const mods = await loadTheme(name);
    if(!mods) continue;
    const { CURRICULUM, BALLPARK_CALCS = {} } = mods;
    for(const [group, lessons] of Object.entries(CURRICULUM ?? {})){
      for(const [i, lesson] of (lessons ?? []).entries()){
        const id = `${name}:${group}:${i}`;
        const ask = COVERED.has(String(lesson.game?.type ?? '').toUpperCase())
          ? askOf(lesson, BALLPARK_CALCS, id) : null;
        if(!ask) continue;
        checked++;
        const stop = { id, card: cardText(lesson), ask };
        const both = promptFor(stop, true) + '\n' + promptFor(stop, false);
        for(const bad of leakStrings(lesson, BALLPARK_CALCS)){
          if(isLeak(bad, both, ask.labels ?? ask.options.map(o => o.replace(/^\w\. /, '')))){
            leaks++;
            if(leaks <= 3) console.log(`      leak in ${id}: ${bad.field} — “${bad.text.slice(0, 80)}…”`);
          }
        }
      }
    }
  }
  cases.push([`no prompt contains the verdict, the rebuttals or the worked solution (${checked} stops)`, leaks === 0]);
  cases.push(['the harvest actually found stops to check', checked > 40]);

  // 2b. AND THE DETECTOR IS ALIVE. Case 1 passing proves nothing on its own — a
  //     leak checker that never fires is a leak checker that reports every prompt
  //     clean, which is exactly the shape of finding this repo keeps paying for.
  //     A verdict planted in a scene must be caught, and the narrow `answer`
  //     exemption must not swallow it.
  {
    const planted = { title: 'T', scene: 'Something happened. THE VERDICT SENTENCE THAT MUST NOT APPEAR HERE.',
      game: { type: 'CHOICE', question: 'q', choices: ['right one', 'wrong one', 'third', 'fourth'],
        correctChoice: 'right one',
        why: 'THE VERDICT SENTENCE THAT MUST NOT APPEAR HERE.' } };
    const pid = 'planted';
    const pask = askOf(planted, {}, pid);
    const pstop = { id: pid, card: cardText(planted), ask: pask };
    const ptext = promptFor(pstop, true);
    const caught = leakStrings(planted, {}).filter(b => isLeak(b, ptext, pask.labels));
    cases.push(['a verdict planted in a scene is caught, and the answer exemption does not hide it',
      caught.length === 1 && caught[0].field === 'why']);
  }

  // 2c. A candidate given as `{label, mechanism}` must render as words. Four
  //     stops were served "[object Object]" and only the reader's own complaint
  //     surfaced it — the score showed two correct answers, because it guessed.
  {
    const d = { title: 'T', game: { type: 'DIAGNOSIS', question: 'q',
      choices: [{ label: 'the right one', mechanism: 'because of this' },
                { label: 'a wrong one', mechanism: 'not this' }],
      correctChoice: 'the right one' } };
    const da = askOf(d, {}, 'seed');
    const joined = da.options.join(' ');
    cases.push(['an object-shaped candidate renders as its label and mechanism',
      !joined.includes('[object') && joined.includes('the right one')
      && joined.includes('because of this')
      && da.options[LETTERS.indexOf(da.key)].includes('the right one')]);
  }

  // 2d. And a template that reuses one slot asks for one letter, not two.
  {
    const b = { title: 'T', game: { type: 'BALLPARK', question: 'q', calcKey: 'K' } };
    const calcs = { K: { labels: ['ratio', 'other', 'third'], slots: 1,
      template: '{0} × {0}', correct: [0] } };
    const ba = askOf(b, calcs, 'seed');
    cases.push(['a template that reuses a slot asks for one letter and says so',
      ba.key.length === 1 && /slot 0/.test(ba.instruction) && /1 letter\b/.test(ba.instruction)]);
  }

  // 3. The bare condition really is bare. Without this, both conditions could be
  //    the card condition and every stop would land in "no science needed" —
  //    a table full of confident findings about nothing.
  const mods = await loadTheme(names[0]);
  const [g0, l0] = Object.entries(mods.CURRICULUM)[0];
  const lesson = l0.find(l => COVERED.has(String(l.game?.type ?? '').toUpperCase()));
  const id = `${names[0]}:${g0}:0`;
  const stop = { id, card: cardText(lesson), ask: askOf(lesson, mods.BALLPARK_CALCS ?? {}, id) };
  const withCard = promptFor(stop, true), bare = promptFor(stop, false);
  cases.push(['the card condition carries the scene and the bare condition does not',
    stop.card.length > 60 && withCard.includes(stop.card) && !bare.includes(stop.card)]);

  // 4. The shuffle is a permutation, not a sample: an option dropped or repeated
  //    would change the question and still grade cleanly against a moved key.
  const items = ['a', 'b', 'c', 'd', 'e'];
  const sh = shuffle(items, 'seed');
  cases.push(['the deal keeps every option exactly once',
    sh.list.length === items.length && new Set(sh.list).size === items.length]);

  // 5. And the key follows the deal. This is the one that would invert silently:
  //    a key left at its book position grades a shuffled board against the wrong
  //    letter, and every reader looks wrong for a reason that is the harness.
  const ch = { game: { type: 'CHOICE', question: 'q',
    choices: ['wrong one', 'the right one', 'another wrong', 'a fourth'],
    correctChoice: 'the right one' } };
  const a = askOf(ch, {}, 'stable-seed');
  const shown = a.options[LETTERS.indexOf(a.key)];
  cases.push(['the key letter points at the option that is actually correct',
    shown.endsWith('the right one')]);

  // 6. And an ordering key is remapped too, by the same argument.
  const sq = { game: { type: 'SEQUENCE', question: 'q', cards: ['first', 'second', 'third'], order: [0, 1, 2] } };
  const sa = askOf(sq, {}, 'stable-seed');
  const inOrder = sa.key.split('').map(L => sa.options[LETTERS.indexOf(L)].replace(/^\w\. /, ''));
  cases.push(['an ordering key names the cards in their right order',
    inOrder.join(',') === 'first,second,third']);

  let bad = 0;
  for(const [what, ok] of cases){ console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`); if(!ok) bad++; }
  console.log(bad ? `\nreaderProbe selftest: ${bad} case(s) failed.` : '\nreaderProbe selftest: all cases pass.');
  return bad;
}

let failed = 0;
if(wantSelftest) failed = await selftest();
else if(wantReport) failed = report();
else if(wantHarvest) await harvest(named.length ? named : QUICK());
else {
  console.error('usage: node engine/dev/readerProbe.mjs --harvest [theme…] | --report | --selftest');
  process.exit(2);
}
process.exit(failed ? 1 : 0);
