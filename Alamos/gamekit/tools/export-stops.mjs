// export-stops.mjs — one line per stop, carrying everything a stop says and
// everything needed to decide what it should become. One sheet, one pass.
//
//   node tools/export-stops.mjs <theme>
//   node tools/export-stops.mjs all
//
// Writes:
//
//   books/convert/<theme>-stops.jsonl   the inventory — hand this over
//   books/convert/<theme>-stops.manifest.json   keep it; it maps ids back to the book
//
// WHY NOT `<theme>-copy.jsonl`. That sheet is the copy-editing channel: one row
// per editable *sentence*, with the structure deliberately stripped out so an
// editor cannot reflow a block scalar or desync an `answer` from its `choices`.
// It is exactly the wrong shape for this question, because it does not say what
// format any stop currently is, what data that format carries, or which stops
// sit on the same day. Somebody reading it cannot tell a PROTOCOL from a CHOICE,
// and "which of these should become an instrument" is unanswerable without that.
//
// So this is the other view of the same book: one row per stop, carrying the
// format, every editable sentence the stop owns, and the whole of whatever
// question data it already has.
//
// EDITABLE, NOT READ-ONLY. It used to carry the text for context only, on the
// theory that this exercise was about format and the copy channel was about
// prose. In practice that forced two round trips over the same stops — one to
// rewrite the words, one to change the format — and the second could undo the
// first, because a conversion rewrites the task and the question anyway. Every
// field below marked editable can be changed in place and comes back through
// `apply-conversions.mjs` in the same pass as the format change.
//
// What is deliberately NOT here, because editing it breaks the game rather than
// improving it: ids, group codes, the `answer` (it is re-synced from its
// choice), `mapping`, `order`, `correct`, and every number in an estimate. A
// referenced diagnosis `panel` is included in full and is read-only — it is the
// evidence a conversion has to be built from, and it belongs to the pack rather
// than to this stop.
//
// The companion brief is books/interactions/CONVERSION_BRIEF.md, which is the
// nineteen formats, what each one teaches, the book block each needs and the
// trap each has to clear. Hand both over together; neither is any use alone.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parseYaml } from './yaml-lite.mjs';
import { deriveWork, SYLLABUS, EQUATIONS } from './syllabus.js';
import { bookNameFor, themesWithBooks } from './books.mjs';
import { editionBase } from '../engine/dev/registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');

// Every registered theme that has a book, read from the registry rather than
// listed here. A hardcoded list silently omits any game added since it was
// written — `the_trial` was registered, had a 45-stop book, and simply never
// appeared in `export-stops all`, with nothing to say it had been skipped. The
// book name itself is resolved in tools/books.mjs, which matches on the
// separator-free spelling rather than on a map somebody has to remember.
const ALL = (() => {
  const reg = JSON.parse(readFileSync(resolve(here, '..', 'themes.json'), 'utf8')).themes ?? {};
  return themesWithBooks(reg);
})();


/**
 * Does this text address that syllabus phrase — the rule syllabus.js itself uses.
 *
 * A plain `includes` was wrong twice over: a short key like `t` matched inside
 * every other word, and a key ending in `!` — the file's own sentinel for "this
 * one has to match exactly" — was searched for with the exclamation mark still
 * on it, so `power!` never matched the word *power* anywhere and every equation
 * keyed that way was reported as mentioned-only in a stop that computes it.
 */
function phraseHit(hay, phrase){
  const w = String(phrase).replace(/!$/, '').trim();
  const exact = String(phrase).endsWith('!') || w.length <= 3;
  const e = w.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${e}${exact ? '([^a-z0-9]|$)' : ''}`, 'i').test(hay);
}

/**
 * The audience grade out of a theme's own manifest.
 *
 * Read as text rather than imported: a theme.js pulls in world modules, three.js
 * and its own props, none of which a sheet exporter has any business loading —
 * and two of the games live outside this package entirely. One authored line is
 * all that is wanted, and a regex over it is honest about that.
 */
function themeGrade(theme){
  const reg = JSON.parse(readFileSync(resolve(root, 'themes.json'), 'utf8')).themes ?? {};
  const dir = reg[theme];
  if(!dir) return null;
  for(const f of ['theme.js', 'src/theme.js', 'content/theme.js']){
    const p = resolve(root, dir, f);
    if(!existsSync(p)) continue;
    const m = readFileSync(p, 'utf8').match(/audience\s*:\s*\{[^}]*\bgrade\s*:\s*(\d+)/);
    if(m) return +m[1];
  }
  return null;
}

/** The formats that are instruments the player operates, not screens they read. */
const INSTRUMENT = new Set(['SWEEP', 'HOLDOUT', 'TALLY', 'PROBE', 'TRIGGER', 'VALUE',
  'CLOUD', 'ALLOCATE', 'TRACE', 'ATTEST', 'CONTROL', 'TRIANGULATE', 'DEGENERACY',
  'CHAIN', 'BALANCE', 'VERIFY', 'PROPAGATE', 'STRESS', 'DELEGATE', 'FLY',
  'RESIDUAL', 'INJECT', 'ROUTE']);

const canonical = (t) => String(t ?? '').toUpperCase().replace(/[\s_-]+/g, '');
const words = (s) => String(s ?? '').trim().split(/\s+/).filter(Boolean).length;
const oneLine = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

/**
 * What question data a stop already carries, as a shape rather than a dump.
 *
 * The whole point of the sheet is a decision about format, and for that the
 * *shape* is what matters — four choices and a mapping, six readings across
 * three zones — not the text of every option. Dumping the options as well made
 * the sheet four times the size and no more useful.
 */
/**
 * A referenced diagnosis pack, expanded.
 *
 * A stop that says `pack: p6` used to export as `{"pack":"p6"}` and nothing
 * else, which is the worst possible row on the sheet: a DIAGNOSIS with a pack is
 * exactly the kind of stop worth converting, and the panel behind it holds the
 * only real numbers anybody has. The first conversion round hit this — three
 * DIAGNOSIS stops came back marked "synthetic classroom values" because the
 * reader had a pack name and no readings, while the book held "138 counts/min
 * against about 98 last week" the whole time.
 */
function packOf(book, id){
  const p = (book.packs ?? {})[id];
  if(!p) return null;
  const rd = p.readings ?? {};
  const rows = Array.isArray(rd) ? rd : Object.values(rd);
  return {
    id, title: oneLine(p.title), hook: oneLine(p.hook), riddle: oneLine(p.riddle),
    zones: p.zones ?? {},
    readings: rows.map(r => ({ name: oneLine(r.name), zone: r.zone,
      observed: oneLine(r.observed), reference: oneLine(r.reference),
      purpose: oneLine(r.purpose) })),
    answer: Array.isArray(p.answer) ? p.answer.map(oneLine) : oneLine(p.answer),
  };
}

function shapeOf(s){
  const out = {};
  const n = (k, v) => { if(Array.isArray(v) && v.length) out[k] = v.length; };
  n('choices', s.choices);
  n('scenarios', s.scenarios);
  n('cards', s.cards);
  n('mapping', s.mapping);
  n('order', s.order);
  n('proposals', s.proposals);
  n('readings', s.readings);
  n('rebuttals', s.rebuttals);
  if(s.pack) out.pack = String(s.pack);
  if(s.figure) out.figure = String(s.figure.kind ?? s.figure.type ?? 'yes');
  if(s.estimate) out.estimate = 'yes';
  if(Array.isArray(s.readings)){
    const z = new Set(s.readings.map(r => r.zone).filter(Boolean));
    if(z.size) out.zones = z.size;
  }
  return out;
}

function exportTheme(theme){
  const bookName = bookNameFor(theme) ?? theme;
  const book = parseYaml(readFileSync(resolve(root, 'books', `${bookName}.yml`), 'utf8'));
  const groups = Object.fromEntries((book.groups ?? []).map(g => [g.id, g.name ?? g.id]));
  const rows = [];

  (book.missions ?? []).forEach((m, mi) => {
    (m.stops ?? []).forEach((s, si) => {
      const fmt = canonical(s.format);
      const pack = s.pack ? packOf(book, s.pack) : null;
      // Every string in the stop's own question that a player reads. Kept as
      // text, in the order it renders, so it can be edited in place.
      const labelOf = (c) => (typeof c === 'string' ? c : c?.label);
      const text = {};
      if((s.choices ?? []).length) text.choices = s.choices.map(labelOf).map(oneLine);
      if((s.choices ?? []).some(c => c && typeof c === 'object' && c.mechanism)){
        text.choiceMechanisms = s.choices.map(c => oneLine(c?.mechanism ?? ''));
      }
      if((s.rebuttals ?? []).length) text.rebuttals = s.rebuttals.map(oneLine);
      if((s.cards ?? []).length) text.cards = s.cards.map(labelOf).map(oneLine);
      if((s.scenarios ?? []).length) text.scenarios = s.scenarios.map(labelOf).map(oneLine);
      if((s.columns ?? []).length) text.columns = s.columns.map(oneLine);
      if((s.proposals ?? []).length) text.proposals = s.proposals.map(p => oneLine(p?.text));
      if(s.evidence) text.evidence = oneLine(s.evidence);
      if(s.headline) text.headline = oneLine(s.headline);
      if(s.setup) text.setup = oneLine(s.setup);
      if(s.call) text.call = oneLine(s.call);
      if(s.estimate){
        const e = s.estimate;
        text.estimate = {
          ...(e.prompt ? { prompt: oneLine(e.prompt) } : {}),
          ...(e.question ? { question: oneLine(e.question) } : {}),
          ...(e.relationship ? { relationship: oneLine(e.relationship) } : {}),
          ...(e.explanation ? { explanation: oneLine(e.explanation) } : {}),
          ...(e.solution ? { solution: oneLine(e.solution) } : {}),
          ...((e.givens ?? []).length ? { givens: e.givens.map(String) } : {}),
          // The tiles a player clicks. Text, and the only estimate field here
          // that is safe to reword — every number stays where it is.
          ...((e.labels ?? []).length ? { labels: e.labels.map(String) } : {}),
        };
      }
      // Which of the course's essential equations this stop's own words touch,
      // and whether a number actually comes out of one. A stop that mentions an
      // equation and never computes it is a stop the course has not taught it in.
      const eqs = (EQUATIONS[theme] ?? []).filter(eq => {
        const hay = [s.title, s.scene, s.question, s.task, s.why, s.takeaway,
          s.estimate?.relationship, s.estimate?.template, s.estimate?.solution]
          .filter(Boolean).join(' ');
        return (eq.k ?? []).some(k => phraseHit(hay, k));
      }).map(eq => {
        // The same bundle the importer calls arithmetic: an estimate's own lines,
        // and a DERIVE's steps, which are arithmetic from top to bottom and carried
        // none of it before — twelve of Headwater's stops read as computing nothing.
        const worked = [s.estimate?.relationship, s.estimate?.template, s.estimate?.solution,
          ...(s.estimate?.givens ?? []), ...deriveWork(s)]
          .filter(Boolean).join(' ');
        const computed = (eq.k ?? []).some(k => phraseHit(worked, k));
        return { e: eq.e, about: eq.c, uses: computed ? 'computed' : 'mentioned only' };
      });
      rows.push({
        id: `${theme}.m${String(mi + 1).padStart(2, '0')}.s${si + 1}`,
        day: mi + 1,
        // Which day this is and what the day is for. A conversion decision is
        // partly a decision about the day: three instruments in a row is a
        // worse day than two and a reasoning screen, and nobody can see that
        // from a stop on its own.
        dayTitle: oneLine(m.title),
        group: s.group,
        area: groups[s.group] ?? s.group,
        format: fmt,
        isInstrument: INSTRUMENT.has(fmt),
        title: oneLine(s.title),
        task: oneLine(s.task),
        // The teaching text, read-only. What the stop is *about* is the whole
        // basis for deciding what it should become.
        scene: oneLine(s.scene),
        sceneWords: words(s.scene),
        question: oneLine(s.question),
        takeaway: oneLine(s.takeaway),
        why: oneLine(s.why),
        whyWords: words(s.why),
        assumes: (s.assumes ?? []).map(oneLine),
        answerText: oneLine(s.answerText),
        // The stop's own question data, as text. Editable in place.
        ...(Object.keys(text).length ? { text } : {}),
        ...(eqs.length ? { equations: eqs } : {}),
        shape: shapeOf(s),
        // The panel itself, where the stop only referenced one. These are the
        // real observed-against-expected numbers, and they are what an
        // instrument's response, noise and tolerance have to be built from.
        ...(pack ? { panel: pack } : {}),
      });
    });
  });

  const outDir = resolve(root, 'books', 'convert');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, `${theme}-stops.jsonl`),
    rows.map(r => JSON.stringify(r)).join('\n') + '\n');
  const syl = SYLLABUS[theme] ?? {};
  writeFileSync(resolve(outDir, `${theme}-stops.manifest.json`), JSON.stringify({
    theme, book: `books/${bookName}.yml`,
    // The course this game claims to teach, and the equations a senior-high
    // version of it has to actually compute. Both are authored in
    // tools/syllabus.js and are the claim the content is measured against.
    course: syl.course ?? null,
    curriculum: (syl.concepts ?? []).map(c => c.c),
    // `needs` rides along because the sheet is where an equation gets moved from
    // mentioned to computed, and moving one in front of what it is derived from is
    // the failure `equationOrder.mjs` exists to catch.
    equations: (EQUATIONS[theme] ?? []).map(e => ({ e: e.e, about: e.c, symbols: e.v ?? '',
      ...(e.needs?.length ? { needs: e.needs } : {}) })),
    // The reading level the game is written for, which the brief asks every
    // rewritten passage to stay inside. No book declares it — `audience` lives
    // in the theme's own manifest — so reading only the book left this null for
    // all eleven games and sent the sheets out with no level to write to.
    audienceGrade: book.theme?.audience?.grade ?? book.audience?.grade ?? themeGrade(theme),
    subject: oneLine(book.theme?.subtitle),
    groups: book.groups?.map(g => ({ id: g.id, name: g.name, desc: oneLine(g.desc) })) ?? [],
    stops: rows.map(r => ({ id: r.id, day: r.day, group: r.group, format: r.format,
      title: r.title })),
  }, null, 1));

  const inst = rows.filter(r => r.isInstrument).length;
  const byFormat = {};
  for(const r of rows) byFormat[r.format] = (byFormat[r.format] ?? 0) + 1;
  console.log(`${theme.padEnd(20)} ${String(rows.length).padStart(3)} stops, `
    + `${String(inst).padStart(2)} already instruments  `
    + Object.entries(byFormat).sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k}:${v}`).join(' '));
  return rows.length;
}

const arg = process.argv[2];
if(!arg){
  console.error('usage: node tools/export-stops.mjs <theme|all>');
  process.exit(2);
}
const themes = arg === 'all' ? ALL : [arg];
let total = 0;
for(const t of themes) total += exportTheme(t);

console.log(`\n${total} stop(s) written to books/convert/`);
console.log('\nHand over, together:');
console.log('  books/convert/<theme>-stops.jsonl          every stop, editable');
// An edition is a different job — same place, same cast, a course written for a
// different reader — and handing over the senior-high brief for one is how a
// pass comes back at the wrong reading level.
const editions = themes.filter(t => editionBase(t));
if(editions.length){
  console.log('  books/GRADE6_BRIEF.md                      the brief for a grade-6 edition');
  for(const t of editions){
    console.log(`  books/convert/${t}-addendum.md   this game's cast, syllabus and days`);
  }
  console.log(`\n  (write the addendum with: node tools/edition-addendum.mjs ${editions[0]} --write)`);
} else {
  console.log('  books/interactions/CONVERSION_BRIEF.md     the nineteen formats and their rules');
}
console.log('\nWhat should come back: the same rows, edited in place — reworded text and,');
console.log('on the stops worth converting, a new `format` and its data block. One pass.');
console.log('\n  node tools/apply-conversions.mjs <theme> <returned.jsonl> --dry');
