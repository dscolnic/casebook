// cardLoad.mjs — how much a player has to read before they can act, per stop.
//
//   node engine/dev/cardLoad.mjs <theme>      one game, worst first
//   node engine/dev/cardLoad.mjs --all        every registered game, a summary
//   node engine/dev/cardLoad.mjs --all --list top offenders across all of them
//   node engine/dev/cardLoad.mjs --selftest   the measurement knows a heavy card
//                                             from a light one
//
// WHY THIS EXISTS
//
// Quantum's day-10 HOLDOUT was unplayable for a reason no existing check could
// see: every block on it was defensible and the sum was unreadable. The card
// carried the scene, "takes as read", "what this is about", a row of syllabus
// equation chips (two of which had nothing to do with the question), a row of
// glossary chips, and then the panel added "what you are doing", a hint and "what
// counts as done", one of which restated the question. Nine blocks. Nothing was
// wrong; there was just no way to tell which part was the instruction.
//
// `questionLoad.mjs` measures how hard the QUESTION is. This measures how much
// there is to READ around it, which is a different failure: a stop can ask a fair
// question of a player who has already given up on the card.
//
// WHAT IT COUNTS
//
//   blocks   distinct labelled things above the controls. The target shape is 3 —
//            two paragraphs and one button — see QUESTION_BRIEF.md.
//   words    everything rendered before the first control, including the panel's
//            own method/hint/goal lines, which most stops still inherit.
//   chips    equation + glossary buttons on the face of the card.
//   grade    Flesch–Kincaid of the reading, against the theme's audience.
//
// It is ADVISORY. It reports a shape to aim at, and a card can be over the target
// and still be the right card — a DIAGNOSIS with six readings is meant to be read.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir, editionBase } from './registry.mjs';
import { readingStats } from '../../tools/readability.js';
import { METHOD, INSTRUMENTS } from '../core/instruments.js';

const here = dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2);
const ALL = args.includes('--all');
const LIST = args.includes('--list');
const SELFTEST = args.includes('--selftest');
const theme = args.find(a => !a.startsWith('--'));

const kindOf = (ch) => String(ch?.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
/** The four formats whose panels print a method line, a hint and a goal list. */
const LIVE = new Set(['SWEEP', 'HOLDOUT', 'TALLY', 'PROBE']);
const words = (t) => String(t ?? '').trim().split(/\s+/).filter(Boolean).length;

/**
 * What one stop puts in front of the player before they can touch anything.
 *
 * The engine's own renderers are the authority on which of these appear — see
 * askCardHTML and the four panels in questionUI.js — so this mirrors that order
 * and nothing else. A stop that has been converted (it carries `guide`) folds the
 * assumptions, the principle, the equations and the glossary behind one button and
 * suppresses the panel's three lines, which is why it scores 3.
 */
function load(lesson, jargon){
  const ch = lesson.game ?? {};
  const fmt = kindOf(ch);
  const converted = !!String(lesson.guide ?? '').trim();
  const blocks = [];
  const add = (name, text) => blocks.push({ name, words: words(text) });

  // Mirrors askCardHTML exactly, including fold-by-default: the assumptions, the
  // equation chips and the glossary are behind the button on every stop, and the
  // principle is on the face of a card that has no guide to say it better.
  const eqs = (lesson.equations ?? []).filter(x => x?.e && x.card !== false);
  const terms = jargonHits(lesson, ch, jargon);
  const takeaway = String(lesson.takeaway ?? '').trim();
  const folds = (lesson.background ?? []).length > 0 || (lesson.assumes ?? []).length > 0
    || eqs.length > 0 || terms > 0 || (converted && !!takeaway);

  add('scene', lesson.scene ?? lesson.story ?? '');
  if(converted) add('guide', lesson.guide);
  else if(takeaway) add('what this is about', takeaway);
  if(folds) add('background (behind a button)', '');
  add('the question', ch.question || ch.task || '');
  // The panel's own lines. For SWEEP, HOLDOUT, TALLY and PROBE these are modelled,
  // because their renderers live in questionUI.js and cannot be imported outside a
  // theme. For the 24 in instruments.js the panel is RENDERED and its blocks
  // counted, which is the only honest way to do it: the first version of this file
  // modelled the four and ignored the rest, so every instrument stop was reported
  // three blocks lighter than it draws — the measurement missing exactly the thing
  // the sweep is trying to find.
  if(LIVE.has(fmt) && !converted){
    add('what you are doing', METHOD[fmt] ?? '');
    add('the panel hint', ch[fmt.toLowerCase()]?.hint ?? '(the engine\'s own wording)');
    if((ch[fmt.toLowerCase()]?.goals ?? []).length) add('what counts as done', '');
  } else if(INSTRUMENTS[fmt]){
    let html = '';
    try{ html = String(INSTRUMENTS[fmt].html(ch) ?? ''); }catch{ html = ''; }
    const text = (cls) => {
      const m = html.match(new RegExp(`class="${cls}"[^>]*>([\\s\\S]*?)</div>`));
      return m ? m[1].replace(/<[^>]+>/g, ' ') : '';
    };
    if(html.includes('class="instMethod"')) add('what you are doing', text('instMethod'));
    if(html.includes('class="sweepHint"')) add('the panel hint', text('sweepHint'));
    if(html.includes('class="instGoal"')) add('what counts as done', text('instGoal'));
  }
  // Chips on the FACE of the card. Zero everywhere now; kept as a column so that a
  // regression which puts them back is visible rather than merely different.
  return { fmt, converted, blocks, chips: 0, folded: eqs.length + terms,
           words: blocks.reduce((n, b) => n + b.words, 0) };
}

/** Glossary chips the card would show. Same rule as questionUI's jargonMatches. */
function jargonHits(lesson, ch, jargon){
  const text = [lesson.title, lesson.takeaway, ch.title, ch.setup, ch.play, ch.task, ch.question,
    ...(['cards', 'scenarios', 'choices', 'givens'].flatMap(k =>
      Array.isArray(ch[k]) ? ch[k].map(v => (typeof v === 'string' ? v : `${v.label ?? ''} ${v.mechanism ?? ''}`)) : []))]
    .filter(Boolean).join(' ').toLowerCase();
  const hay = ` ${text} `;
  let n = 0;
  for(const item of (jargon ?? [])){
    const hit = [item.name, ...(item.aliases ?? [])].filter(Boolean).some(a => {
      const w = String(a).toLowerCase().trim();
      if(w.length < 2) return false;
      const e = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`(^|[^a-z0-9])${e}${w.length <= 3 ? '([^a-z0-9]|$)' : ''}`).test(hay);
    });
    if(hit && ++n >= 8) break;
  }
  return n;
}

async function measure(name){
  const dir = themeDir(name);
  const T = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = T.content ?? {};
  normalizeContent(content);
  const grade = T.audience?.grade ?? 12;
  const jargon = content.JARGON ?? [];
  const rows = [];
  for(const [group, lessons] of Object.entries(content.CURRICULUM ?? {})){
    (lessons ?? []).forEach((lesson, i) => {
      if(!lesson.game) return;
      const l = load(lesson, jargon);
      const reading = [lesson.scene ?? lesson.story, lesson.guide].filter(Boolean).join(' ');
      rows.push({ theme: name, group, i, day: lesson.day, title: lesson.title ?? '',
                  ...l, grade, fk: readingStats(reading).fk });
    });
  }
  return { name, grade, edition: editionBase(name), rows };
}

// ------------------------------------------------------------------- selftest
//
// The rule this repo learned the expensive way: a measurement that produces a
// plausible answer is not thereby a working measurement. So the file proves it can
// tell the two shapes apart, on the two cards that actually exist.
if(SELFTEST){
  const heavy = {
    scene: 'x '.repeat(90), takeaway: 'y '.repeat(20), assumes: ['a '.repeat(15)],
    equations: [{ e: 'F = ma', c: 'force' }, { e: 'v = at', c: 'speed' }],
    game: { type: 'HOLDOUT', question: 'q '.repeat(30), holdout: { hint: 'h '.repeat(40) } },
  };
  const light = {
    scene: 'x '.repeat(75), guide: 'g '.repeat(70), background: ['b', 'b'],
    equations: [{ e: 'F = ma', c: 'force' }, { e: 'v = at', c: 'speed' }],
    assumes: ['a '.repeat(15)], takeaway: 'y '.repeat(20),
    game: { type: 'HOLDOUT', question: 'short question', holdout: { hint: 'h '.repeat(40) } },
  };
  const bare = { scene: 'x '.repeat(40), game: { type: 'CHOICE', question: 'pick one' } };
  const a = load(heavy, []), b = load(light, []), c = load(bare, []);
  const cases = [];
  const say = (ok, m) => { cases.push(ok); console.log(`  ${ok ? '✓' : '✗'} ${m}`); };
  say(a.blocks.length > b.blocks.length,
    `an unbriefed card counts more blocks than a briefed one (${a.blocks.length} vs ${b.blocks.length})`);
  say(a.words > b.words, `and more words before the controls (${a.words} vs ${b.words})`);
  say(b.blocks.length === 4, 'a briefed card is scene + guide + button + question');
  // Six, not seven: the fixture authors a panel hint and no goal list, so there is
  // no "what counts as done" line to count. Getting this wrong the first time is
  // why the case names the blocks instead of just asserting a number.
  say(a.blocks.length === 6, 'an unbriefed live panel is scene + principle + button'
    + ' + question + what-you-are-doing + hint');
  say(a.chips === 0 && b.chips === 0, 'no chips on the face of either: they are folded by default');
  say(a.folded === 2 && b.folded === 2, 'and they are counted as folded instead');
  say(!b.blocks.some(x => x.name === 'the panel hint'), 'a guide replaces the panel\'s three lines');
  say(a.blocks.some(x => x.name === 'the panel hint'), 'and without one they are still counted');
  say(c.blocks.length === 2 && !c.blocks.some(x => x.name.startsWith('background')),
    'a card with nothing to fold shows no button');
  const bad = cases.filter(x => !x).length;
  console.log(bad ? `\n✗ cardLoad selftest: ${bad} case(s) failed`
                  : `\n✓ cardLoad selftest: ${cases.length} cases`);
  process.exit(bad ? 1 : 0);
}

const names = ALL ? themeNames() : [theme];
if(!names[0]){
  console.error('usage: node engine/dev/cardLoad.mjs <theme> | --all [--list] | --selftest');
  process.exit(2);
}

const all = [];
for(const n of names){
  const m = await measure(n);
  all.push(m);
}

// scene, guide, button, question — and for a stop with real controls, the panel's
// own hint and its "what counts as done" on top of those. Those two are short and
// stop-specific, and the goal is the constraint the answer is written against, so a
// briefed instrument lands at 6 rather than 4. One number for both tiers would
// either excuse the fragmentation or ban two blocks worth keeping.
const hasPanel = (row) => !!INSTRUMENTS[row.fmt] || LIVE.has(row.fmt);
const targetFor = (row) => (hasPanel(row) ? 6 : 4);
// Words, on the same argument. A briefed instrument keeps its own hint and its
// "what counts as done", so the honest budget there is the card plus those two —
// about 240 — where a CHOICE has 170. One number for both made the guides look like
// a regression the moment they were written, which is a metric arguing with the
// brief it was built to serve.
const wordsFor = (row) => (hasPanel(row) ? 240 : 170)

if(ALL){
  console.log('game                   stops  done   blocks  words  over target  live panels');
  for(const m of all){
    const n = m.rows.length || 1;
    const done = m.rows.filter(r => r.converted).length;
    const over = m.rows.filter(r => r.words > wordsFor(r) || r.blocks.length > targetFor(r)).length;
    const live = m.rows.filter(r => LIVE.has(r.fmt)).length;
    const med = (xs) => xs.sort((a, b) => a - b)[Math.floor(xs.length / 2)] ?? 0;
    console.log(m.name.padEnd(22), String(n).padStart(5), String(done).padStart(5),
      String(med(m.rows.map(r => r.blocks.length))).padStart(8),
      String(med(m.rows.map(r => r.words))).padStart(6),
      `${String(over).padStart(6)} (${Math.round(100 * over / n)}%)`.padStart(13),
      String(live).padStart(12));
  }
  const rows = all.flatMap(m => m.rows);
  console.log(`\n${rows.length} stops · ${rows.filter(r => r.converted).length} converted`
    + ` · ${rows.filter(r => r.words > wordsFor(r)).length} over their word budget`
    + ` · ${rows.filter(r => r.blocks.length > targetFor(r)).length} over their block target`
    + ` (4 for a card, 6 with an instrument)`);
  if(LIST){
    console.log('\nheaviest cards in the repo:');
    for(const r of rows.sort((a, b) => b.words - a.words).slice(0, 25)){
      console.log(`  ${String(r.words).padStart(4)}w ${String(r.blocks.length).padStart(2)}b`
        + ` ${r.theme.padEnd(20)} ${r.group}/${r.day} ${r.fmt.padEnd(12)} ${r.title.slice(0, 40)}`);
    }
  }
} else {
  const m = all[0];
  console.log(`${m.name} · audience grade ${m.grade}`
    + ` · target 4 blocks and 170 words, or 6 and 240 with an instrument\n`);
  for(const r of m.rows.sort((a, b) => b.words - a.words)){
    const flag = r.blocks.length <= targetFor(r) && r.words <= wordsFor(r) ? '·' : '!';
    console.log(`${flag} ${String(r.words).padStart(4)}w ${String(r.blocks.length).padStart(2)}b`
      + ` ${String(r.chips).padStart(2)}chips  ${r.group}/${String(r.day).padStart(2)}`
      + ` ${r.fmt.padEnd(12)} ${(r.fk ?? 0).toFixed(1).padStart(4)}FK  ${r.title.slice(0, 44)}`);
  }
  const worst = m.rows[0];
  console.log(`\nheaviest: ${worst.group}/${worst.day} at ${worst.words} words in`
    + ` ${worst.blocks.length} blocks — ${worst.blocks.map(b => `${b.name} ${b.words}w`).join(', ')}`);
}
