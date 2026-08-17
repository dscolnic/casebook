// fieldCoverage.mjs — does the player ever see what the book wrote?
//
//   node engine/dev/fieldCoverage.mjs <theme>
//   node engine/dev/fieldCoverage.mjs --all
//   node engine/dev/fieldCoverage.mjs --selftest
//
// Every other check in this directory asks whether the content is wrong. This
// one asks whether it is *there* — whether a field an author filled in reaches
// the screen at all, or is accepted by the importer, stored in the generated
// content, counted by the checks, and then read by nobody.
//
// It exists because of ContamCity's evidence-ordering stop. The order is graded
// on what each step costs rather than on time, the author wrote that down —
// `setup: Order the non-destructive evidence workflow.`, `task: Arrange the four
// cards from the earliest prerequisite or cause to the latest result.` — and the
// SEQUENCE panel renders neither, so what the player actually read was the
// engine's hardcoded "Put the 4 steps in order, earliest first." The axis was in
// the book, in the field `tools/BOOK_TEMPLATE.md` names for it, and on no screen.
//
// The general shape: a field nothing renders is not a no-op, it is a place for
// instructions to go and die, and it stays green for ever because every check in
// this repo reads the *data* rather than the panel.
//
// HOW IT DECIDES
//
// Statically, over `engine/core/questionUI.js` and `engine/core/instruments.js`.
// Each format has an entry renderer; the checker takes that function's body, the
// bodies of every local function it calls (transitively), the shared prefix and
// verdict path that every format goes through, and collects every `ch.x` and
// `lesson.x` read inside them. A field on a stop of that format which appears in
// none of them is not shown and not graded on.
//
// Two things it deliberately does not count as being shown:
//
//   SINKS      `allChallengeText` flattens most of a stop into one string to
//              match glossary terms against. It reads `ch.setup`, which is the
//              only reason a naive grep says setup is used — the *value* never
//              reaches the player, only the question of which words are in it.
//
//   DEV        nothing under engine/dev counts. A field read only by a checker
//              is a field the game does not have.
//
// The gate is narrower than the report. Only one finding fails the build: a stop
// whose instruction text — what the author wrote to tell the player what they
// are being asked for — is read by nothing on the path. Everything else prints
// as an advisory list, because a field can be legitimately inert on one format
// while carrying a whole panel on another.
//
// The selftest is the point of the file rather than ceremony, per the house rule
// that a measurement producing a plausible answer is not thereby a working
// measurement. It asserts the two cases whose answer is known by hand: `cards`
// on a SEQUENCE is SHOWN, and `setup` on a SEQUENCE is SUNK — because if the
// sink list stops working, `setup` reads as covered and this file reports that
// everything is fine, which is exactly the state it was written to end.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const core = (f) => readFileSync(resolve(here, '../core', f), 'utf8');

/** Canonical challenge kind. The books write "Sequence", "SEQUENCE", "Science Tank". */
const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');

// ---- 1. Carve the two modules into named blocks.
//
// Three shapes, and the third one had to be added after the first version of
// this file reported nine instrument formats as printing over their author. They
// do not: every instrument panel opens with `ask(ch, fallback)`, which reads
// `ch.question || ch.task` — and `ask` is `const ask = (ch, fallback) => …`, an
// arrow function whose body is a template literal with no braces around it. The
// first two patterns matched neither, so `ask` was never carved, nothing that
// called it inherited its reads, and every instrument looked mute.
//
// That is the false negative the header of this file warned about, arriving in
// the file itself within the hour: a block the carver cannot see reads nothing,
// so everything downstream of it reports dead. The `missing` guard below only
// checked the *entry points*, which all existed — a shared helper going missing
// is invisible to it, which is why the selftest now names `ask` directly.
function carve(src){
  const out = new Map();
  const starts = [...src.matchAll(
    /^(?:export\s+)?(?:function\s+([A-Za-z_]\w*)\s*\(|const\s+([A-Za-z_]\w*)\s*=\s*(\{|\(?[^=\n]*?=>))/gm)];
  for(const m of starts){
    const name = m[1] ?? m[2];
    const arrow = m[3] && m[3] !== '{';
    let i = arrow ? m.index + m[0].length : src.indexOf('{', m.index);
    if(i < 0) continue;
    // An arrow may still have a braced body — `=> {` — in which case it is
    // brace-matched like the others. Only a bare expression body needs the
    // statement-end scan.
    if(arrow){
      while(i < src.length && /\s/.test(src[i])) i++;
      if(src[i] === '{') { /* fall through to brace matching */ }
      else {
        // Expression body: run to the `;` that closes the statement, tracking
        // every bracket and backtick so a `;` inside a template literal or an
        // argument list does not end it early.
        let d = 0, tick = false, j = i;
        for(; j < src.length; j++){
          const c = src[j];
          if(c === '\\'){ j++; continue; }
          if(c === '`'){ tick = !tick; continue; }
          if(tick) continue;
          if('([{'.includes(c)) d++;
          else if(')]}'.includes(c)) d--;
          else if(c === ';' && d === 0){ j++; break; }
        }
        out.set(name, src.slice(i, j));
        continue;
      }
    }
    let depth = 0, j = i;
    // Good enough for this source: it has no braces inside string literals at
    // the top level of a function signature, and template literals containing
    // `{` are balanced by their own `}`.
    for(; j < src.length; j++){
      const c = src[j];
      if(c === '{') depth++;
      else if(c === '}'){ depth--; if(depth === 0){ j++; break; } }
    }
    out.set(name, src.slice(i, j));
  }
  return out;
}

const BLOCKS = new Map([...carve(core('questionUI.js')), ...carve(core('instruments.js'))]);

/** Every `ch.x` / `lesson.x` / `l.x` / `ch['x']` read in one block. */
function readsIn(body){
  const found = new Set();
  for(const m of body.matchAll(/\b(?:ch|lesson|l)\.([A-Za-z_]\w*)/g)) found.add(m[1]);
  for(const m of body.matchAll(/\b(?:ch|lesson|l)\[\s*['"]([A-Za-z_]\w*)['"]\s*\]/g)) found.add(m[1]);
  return found;
}

/** Local functions this block calls, so their reads count as this one's. */
function callsIn(body){
  const found = new Set();
  for(const m of body.matchAll(/\b([A-Za-z_]\w*)\s*\(/g)) if(BLOCKS.has(m[1])) found.add(m[1]);
  return found;
}

// `allChallengeText` reads a stop's text to ask which glossary terms occur in
// it. That is not the player seeing the field, and it is the single reason a
// grep for `ch.setup` in engine/core finds anything at all.
const SINKS = new Set(['allChallengeText']);

// And two the walk must not go through at all. `showChallengeForStop` is the
// dispatch — its body calls all twelve renderers — and `openVisit` re-enters it,
// so a single edge into either gives every format every other format's reads and
// the whole check quietly reports all-clear. Excluding them from the entry list
// is not enough: `finishVisit` reaches the dispatch through `openVisit` in two
// hops, which is how this file passed its own selftest for exactly one run.
const CUTS = new Set(['showChallengeForStop', 'openVisit']);

const readCache = new Map();
/** Everything a block and its callees read, sinks excluded. */
function closure(name, seen = new Set()){
  if(SINKS.has(name) || CUTS.has(name) || seen.has(name)) return new Set();
  if(readCache.has(name)) return readCache.get(name);
  seen.add(name);
  const body = BLOCKS.get(name);
  if(!body) return new Set();
  const out = readsIn(body);
  for(const c of callsIn(body)) for(const f of closure(c, seen)) out.add(f);
  if(!seen.size) readCache.set(name, out);
  return out;
}

// ---- 2. What each format's stop actually goes through.
//
// The renderer and its binding, from the dispatch in `showChallengeForStop`.
// The binding counts because a field read only while grading is a field the
// stop genuinely uses — `order` is never printed and decides the answer.
const FORMATS = {
  SEQUENCE:    ['orderHTML', 'bindOrder', 'rerenderOrder'],
  PROTOCOL:    ['protocolHTML', 'bindProtocol', 'protocolBoardHTML'],
  BALLPARK:    ['ballparkHTML', 'bindBallpark', 'ballparkBody', 'rerenderBallpark'],
  TRIAGE:      ['triageHTML', 'bindTriage'],
  DIAGNOSIS:   ['diagnosisHTML', 'bindDiagnosis'],
  SWEEP:       ['sweepHTML', 'bindSweep', 'sweepVerdictFigure'],
  HOLDOUT:     ['holdoutHTML', 'bindHoldout', 'holdoutVerdictFigure'],
  TALLY:       ['tallyHTML', 'bindTally', 'tallyVerdictFigure'],
  PROBE:       ['probeHTML', 'bindProbe', 'probeVerdictFigure'],
  CASEBOOK:    ['casebookHTML', 'casebookBoardHTML', 'bindCasebook'],
  CHOICE:      ['choiceHTML', 'bindChoice'],
  SCIENCETANK: ['tankHTML', 'bindTank'],
};
// Everything a stop goes through whatever its format: the card above the
// question, the hint behind the assist, the verdict and the grading.
const SHARED = ['challengePrefix', 'askCard', 'askContextHTML', 'equationRow', 'figureBlock',
                'withAssist', 'visitAssistHTML', 'scientificHint', 'solutionText',
                'reasoningHTML', 'verdictFigureHTML', 'finishVisit',
                'storyBriefText', 'missionLessonForStop'];
// `showChallengeForStop` is deliberately NOT in that list even though every stop
// goes through it, because it is the dispatch: its body calls all twelve
// renderers, so following it would give every format every other format's reads
// and the whole check would report all-clear. The selftest asserts SEQUENCE does
// not see `task`, which is the case that fails the moment it goes back in.

const missing = [...Object.values(FORMATS).flat(), ...SHARED].filter(f => !BLOCKS.has(f));
if(missing.length){
  console.error(`fieldCoverage: cannot find ${missing.length} function(s) it needs to look inside`
    + ` — ${missing.join(', ')}. A renderer has been renamed or nested; fix this file before`
    + ` believing it, because a block it cannot see reads nothing and everything in it reports dead.`);
  process.exit(2);
}

const sharedReads = new Set(SHARED.flatMap(f => [...closure(f)]));
/** Fields anything on this format's path reads. Instruments carry their own block. */
function shownBy(format){
  const names = FORMATS[format] ?? (BLOCKS.has(format) ? [format] : []);
  const out = new Set(sharedReads);
  for(const n of names) for(const f of closure(n)) out.add(f);
  return out;
}

// ---- 3. Unread is not the same as unseen.
//
// The importer fills several fields from one another — `story` from `scene`,
// `play` and `task` and `question` from whichever of them the book wrote,
// `setup` from `place` — so most unread fields are carrying text that some other
// field is showing anyway, and reporting them by name would bury the real
// finding under a thousand aliases.
//
// So the test is on the TEXT, not the field. Collect the value of every field
// the stop's path reads, and a field is only a finding when its own text appears
// in none of them. An alias whose twin is rendered says nothing; an alias that
// has drifted from its twin says the author's words are unreachable — which is
// exactly the case worth catching, and the one that caught this file's own
// author mid-edit. 122 stops across four games write a `scene` and a different
// `story`, and the engine renders `story`: every reading-level gate, every
// giveaway probe and the whole 30-to-45-word scene rule are being applied to
// text those stops never show.
const nonEmpty = (v) => v != null && (typeof v === 'string' ? v.trim() !== '' : (Array.isArray(v) ? v.length > 0 : true));
/** A field's text, flattened — strings, arrays of strings, arrays of {label}. */
function textOf(v){
  if(typeof v === 'string') return v;
  if(Array.isArray(v)) return v.map(x => typeof x === 'string' ? x : (x?.label ?? x?.text ?? '')).join(' ');
  return '';
}
const squash = (s) => String(s).toLowerCase().replace(/\s+/g, ' ').trim();

// The instruction the panel prints and the situation the card prints. Both are
// gated; everything else is advisory, because a field can be legitimately inert
// on one format while carrying a whole panel on another.
// The four the importer fills from one authored sentence. They are one finding,
// not four, and the finding belongs to the FORMAT rather than the stop: a panel
// either renders what the author wrote or it renders a hardcoded line, and it
// does the same thing at every stop it draws.
// `axis` is in the list because it is the answer to this finding, not an
// exception to it: a SEQUENCE that writes one has said what it is asking for in
// a field the panel prints, and the `task` left over beside it is the same
// sentence in a field nothing reads. One of them reaching the player is enough.
const INSTRUCTION = ['task', 'question', 'play', 'setup', 'axis'];
// The situation. Authored as `scene`, rendered as `story`, which the importer
// fills from `scene` where the book writes no story — so this only bites where a
// book writes both and they say different things.
const SITUATION = ['scene', 'story'];

async function scan(themeName){
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);

  const drift = [];                // authored text that has drifted from its rendered twin
  const inert = new Map();         // format -> field -> count
  const noInstruction = new Map(); // format -> stops whose instruction is on no screen
  const seenFormat = new Map();

  for(const [group, lessons] of Object.entries(content.CURRICULUM ?? {})){
    (lessons ?? []).forEach((l, li) => {
      const ch = l?.game;
      if(!ch) return;
      const format = kindOf(ch);
      const shown = shownBy(format);
      seenFormat.set(format, (seenFormat.get(format) ?? 0) + 1);
      const at = `${group}[${li}] "${l.title ?? ''}"`;

      // Every word the player can reach at this stop, from the fields the path
      // actually reads. `place` is in here because `setup` falls back to it and
      // the card prints where you are.
      const visible = squash([...Object.entries(l), ...Object.entries(ch)]
        .filter(([k]) => k !== 'game' && (shown.has(k) || k === 'place'))
        .map(([, v]) => textOf(v)).join('  '));

      // An alias whose twin is rendered says nothing; an alias that has drifted
      // from its twin says the author's words are unreachable.
      const unreachable = (k, v) => {
        const mine = squash(textOf(v));
        return !!mine && !shown.has(k) && !visible.includes(mine);
      };

      const wrote = INSTRUCTION.filter(k => nonEmpty(ch[k]));
      if(wrote.length && wrote.every(k => unreachable(k, ch[k]))){
        if(!noInstruction.has(format)) noInstruction.set(format, []);
        noInstruction.get(format).push({ at, text: String(ch[wrote[0]]).slice(0, 76) });
      }
      for(const k of SITUATION){
        if(nonEmpty(l[k]) && unreachable(k, l[k])){
          drift.push({ at, format, field: k, text: String(l[k]).slice(0, 76) });
        }
      }
      for(const [k, v] of Object.entries({ ...l, ...ch })){
        if(k === 'game' || INSTRUCTION.includes(k) || SITUATION.includes(k)) continue;
        if(!nonEmpty(v) || !unreachable(k, v)) continue;
        if(!inert.has(format)) inert.set(format, new Map());
        const m = inert.get(format);
        m.set(k, (m.get(k) ?? 0) + 1);
      }
    });
  }
  return { drift, inert, noInstruction, seenFormat };
}

// ---- 4. The selftest, which is why anything here can be believed.
//
// Two cases with a known answer, both of them the ones that would silently
// invert. `cards` must be SHOWN: it is the SEQUENCE panel's whole content, so if
// the carver or the closure breaks, it stops being found and this file starts
// reporting a catastrophe. `setup` must be SUNK on a SEQUENCE: it is read in
// engine/core exactly once, inside `allChallengeText`, so if the sink list stops
// being applied it reads as covered and this file reports all-clear — which is
// the state it exists to end, and the failure nobody would notice.
/**
 * Does the brief above the question reach for `scene` before `story`?
 *
 * The one thing in here that reads an ORDER rather than a set. Everything else
 * this file does is membership — which fields does this path touch — and
 * membership cannot see a fallback chain's priority, which is where the defect
 * was. So this reads the first `lesson.<field>` mentioned in the one function
 * that composes the brief.
 */
function briefPrefersScene(){
  const body = BLOCKS.get('storyBriefText') ?? '';
  const first = body.match(/\blesson\.([A-Za-z_]\w*)/)?.[1];
  return first === 'scene';
}

function selftest(){
  const seq = shownBy('SEQUENCE');
  const cases = [
    ['SEQUENCE reads `cards`', seq.has('cards'), true],
    ['SEQUENCE reads `order`', seq.has('order'), true],
    ['SEQUENCE reads the new `axis`', seq.has('axis'), true],
    ['SEQUENCE does not show `setup` (it is only sunk into allChallengeText)', seq.has('setup'), false],
    ['SEQUENCE does not show `task`', seq.has('task'), false],
    ['CHOICE does show `task` (it is the panel\'s instruction line)', shownBy('CHOICE').has('task'), true],
    // The ask card must render `scene` — the 30-to-45 words of situation every
    // gate in engine/dev reads. It rendered `story` instead until this file
    // found that, and the first version of this case asserted `story` because
    // its author matched the code rather than the intent.
    ['the ask card shows `scene`', sharedReads.has('scene'), true],
    ['the ask card still falls back to `story`', sharedReads.has('story'), true],
    // Those two cannot tell the fix from the bug, which is the trap this whole
    // file is about. Both fields are in the fallback chain either way, so a set
    // of read field names is blind to their ORDER — and the order is the entire
    // defect. This case reads the chain itself.
    ['and `scene` comes first in the chain, not second', briefPrefersScene(), true],
    ['a sink alone is not coverage', closure('allChallengeText').size === 0, true],
    // The carver's third shape. `ask` is an arrow function with a template-literal
    // body, and until it was carved every one of the twenty instruments looked as
    // though it printed nothing the author wrote — nine of them were reported that
    // way. A missing shared helper is invisible to the `missing` guard, which only
    // knows the entry points, so it has to be named here.
    ['the arrow helper `ask` is carved at all', BLOCKS.has('ask'), true],
    ['so BALANCE renders the author\'s question through it', shownBy('BALANCE').has('question'), true],
    ['and so does every other instrument', ['TRACE', 'CONTROL', 'CLOUD', 'VERIFY', 'ALLOCATE']
      .every(f => shownBy(f).has('task')), true],
    // Two inputs that should score the same: an alias carrying identical text is
    // shown, an alias that has drifted is not. This is the whole rule, and it is
    // the one that turns a thousand harmless aliases into four real findings.
    ['identical alias text counts as shown', squash('A B') === squash('a  b'), true],
  ];
  let bad = 0;
  for(const [what, got, want] of cases){
    const ok = got === want;
    if(!ok) bad++;
    console.log(`  ${ok ? '✓' : '✗'} ${what}`);
  }
  if(bad){
    console.log(`\n✗ fieldCoverage selftest: ${bad} of ${cases.length} case(s) wrong — the measurement is broken, not the content`);
    process.exit(1);
  }
  console.log(`\n✓ fieldCoverage selftest: ${cases.length} case(s), including the two that would invert silently`);
}

const args = process.argv.slice(2);
if(args.includes('--selftest')){ selftest(); process.exit(0); }

const verbose = args.includes('--verbose');
const names = args.includes("--all") ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!names.length){
  console.error('usage: node engine/dev/fieldCoverage.mjs <theme> | --all | --selftest');
  process.exit(2);
}

// ---- 5. Report.
//
// The instruction finding belongs to the engine and is the same in every game,
// so it is totted up across the run and printed once at the end rather than
// eighteen times. The drift finding belongs to a book and is printed per theme.
const perFormat = new Map();   // format -> { stops, silent, sample }
const inertPairs = new Set();  // "FORMAT.field", deduplicated across themes
let driftTotal = 0;

for(const name of names){
  const { drift, inert, noInstruction, seenFormat } = await scan(name);
  for(const [f, n] of seenFormat){
    if(!perFormat.has(f)) perFormat.set(f, { stops: 0, silent: 0, sample: null });
    perFormat.get(f).stops += n;
  }
  for(const [f, hits] of noInstruction){
    const row = perFormat.get(f);
    row.silent += hits.length;
    row.sample = row.sample ?? hits[0].text;
  }
  if(drift.length){
    driftTotal += drift.length;
    console.log(`\n· theme "${name}": ${drift.length} stop(s) whose authored \`scene\` is not the \`story\` the card prints`);
    for(const d of (verbose ? drift : drift.slice(0, 3))) console.log(`    ${d.at} — "${d.text}…"`);
    if(!verbose && drift.length > 3) console.log(`    … ${drift.length - 3} more (--verbose)`);
  }
  const rows = [...inert].flatMap(([f, m]) => [...m].map(([k, n]) => ({ f, k, n }))).sort((a, b) => b.n - a.n);
  for(const r of rows) inertPairs.add(`${r.f}.${r.k}`);
  if(rows.length && verbose){
    console.log(`  theme "${name}" — other fields authored and read by nothing on the stop's path:`);
    for(const r of rows) console.log(`      ${r.f}.${r.k} × ${r.n}`);
  }
}

const silentFormats = [...perFormat].filter(([, r]) => r.silent).sort((a, b) => b[1].silent - a[1].silent);
if(silentFormats.length){
  const stops = silentFormats.reduce((n, [, r]) => n + r.silent, 0);
  console.log(`\n· ${silentFormats.length} format(s) render a hardcoded instruction over the author's own —`
    + ` ${stops} stop(s) across ${names.length} theme(s)`);
  for(const [f, r] of silentFormats){
    console.log(`    ${f.padEnd(12)} ${String(r.silent).padStart(4)} of ${r.stops} stop(s)   the book wrote "${(r.sample ?? '').slice(0, 60)}…"`);
  }
  console.log(`  SEQUENCE is the one that has been answered: \`axis\` and \`ends\` on the book's stop`
    + ` override the panel's line and its two rail captions. The rest are the same fix.`);
}
const quiet = !silentFormats.length && !driftTotal;
console.log(quiet
  ? `\n✓ ${names.length} theme(s): every authored sentence reaches a screen`
  : `\n${driftTotal} drifted scene(s), ${silentFormats.length} format(s) talking over the book`
    + `${inertPairs.size ? `, ${inertPairs.size} other inert field/format pair(s)` : ''}`);

// Advisory, deliberately, and this is the same argument probeQuestions lost and
// then won. A gate is worth having only once the thing it gates is clean, and
// neither finding is: twelve formats print their own instruction and 122 stops
// have drifted. Turning it red today would mean every game failing every check
// run until an unrelated body of content work is finished, which is how a check
// gets an --advisory flag permanently pasted in front of it. Fix the formats,
// fix the scenes, then change this line to exit 1.
process.exit(0);
