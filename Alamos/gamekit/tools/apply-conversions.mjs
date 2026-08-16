// apply-conversions.mjs — write a returned conversion sheet back into the book.
//
//   node tools/apply-conversions.mjs <theme> <returned.jsonl> [--dry] [--no-text]
//                                     [--skip=id,id]
//
// The sheet says a stop should stop being a PROTOCOL and start being an
// ALLOCATE. Doing that means three edits to one stop in `books/<theme>.yml`:
// change `format:`, delete whatever the old format carried (`choices`,
// `mapping`, `cards`, `order`, `pack`, `estimate` — dead weight the importer
// would otherwise still validate), and insert the new format's block.
//
// HOW IT WRITES. Not by re-emitting the book: `emitYaml` round-trips a whole
// game faithfully but reformats every line of it, which turns a six-stop change
// into a six-thousand-line diff nobody can review. Instead each stop's exact
// line span is located in the raw text and only that span is replaced. Every
// other byte of the book is untouched.
//
// WHAT IT WILL NOT DO. It refuses a row whose trap fails. A trap is the
// arithmetic that makes a bad choice cost something — a ledger that closes
// without its hidden term, a board affordable whole — and a stop that fails one
// renders perfectly, grades perfectly, and teaches the opposite of what it was
// written for. `tools/conversion-normalise.mjs` will rename a near-miss onto the
// real schema; it will not invent a number, and neither will this.
//
// TEXT. The sheet is editable throughout, so a returned row usually carries
// reworded prose whether or not it changes format. All of it is applied, in the
// same pass as the conversions — that is the point of one sheet. Two round trips
// over the same stops meant the second could quietly undo the first, because a
// conversion rewrites the task and the question anyway.
//
// `--no-text` applies only the format changes, for when a sheet's prose is not
// wanted. `--dry` shows what would happen and writes nothing.
//
// Afterwards, always: `node tools/import-book.mjs books/<book>.yml <theme>
// --verify`, then `npm run drive <theme>`. This tool makes a book; those say
// whether it is a game.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { parseYaml } from './yaml-lite.mjs';
import { emitYaml } from './yaml-emit.mjs';
import { normalise, trap, missingFields, BLOCK, targetFormat, known, screenGap } from './conversion-normalise.mjs';
import { bookNameFor } from './books.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '..');

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const dry = process.argv.includes('--dry');
const noText = process.argv.includes('--no-text');
const [theme, sheetArg] = args;
// Leave named rows out. What this is for: a sheet where four rows are complete
// and two are short of a field, so the four should not have to wait.
const skipArg = (process.argv.find(a => a.startsWith('--skip=')) ?? '').slice(7);
const SKIP = new Set(skipArg.split(',').map(s2 => s2.trim()).filter(Boolean));
if(!theme || !sheetArg){
  console.error('usage: node tools/apply-conversions.mjs <theme> <returned.jsonl> [--dry] [--with-text]');
  process.exit(2);
}
// One resolver, in tools/books.mjs: a book is found by matching the
// separator-free spelling of the theme name, so an edition's book needs no
// entry anywhere.
const bookName = bookNameFor(theme) ?? theme;
const bookPath = resolve(root, 'books', `${bookName}.yml`);
const sheetPath = resolve(process.cwd(), sheetArg);
for(const p of [bookPath, sheetPath]){
  if(!existsSync(p)){ console.error(`missing: ${p}`); process.exit(2); }
}

const raw = readFileSync(bookPath, 'utf8');
const lines = raw.split('\n');
const book = parseYaml(raw);
const rows = readFileSync(sheetPath, 'utf8').split('\n').filter(l => l.trim()).map(l => JSON.parse(l));

/**
 * Where every stop begins and ends in the raw text.
 *
 * The book is written by hand and by `export-book.mjs`, so indentation is
 * consistent but not guaranteed; what is reliable is the nesting. A stop is a
 * list item under a `stops:` key that is itself under a `missions:` list item.
 * Walking the raw lines and tracking those two levels finds the span without
 * assuming a column.
 */
function spans(){
  const out = [];
  let inMissions = false, missionIx = -1, stopsIndent = -1, cur = null;
  const indentOf = (l) => l.length - l.replace(/^ +/, '').length;
  lines.forEach((line, i) => {
    if(/^missions:\s*$/.test(line)){ inMissions = true; return; }
    if(!inMissions) return;
    // A top-level key ends the missions block.
    if(/^\S/.test(line) && !/^\s*-/.test(line)){
      if(cur){ cur.end = i; out.push(cur); cur = null; }
      inMissions = false; return;
    }
    const ind = indentOf(line);
    if(/^\s*-\s/.test(line) && ind === 2){            // a mission
      if(cur){ cur.end = i; out.push(cur); cur = null; }
      missionIx++; stopsIndent = -1; return;
    }
    if(/^\s*stops:\s*$/.test(line)){ stopsIndent = ind; return; }
    if(stopsIndent >= 0 && /^\s*-\s/.test(line) && ind === stopsIndent + 2){
      if(cur){ cur.end = i; out.push(cur); }
      cur = { mission: missionIx, stop: (out.filter(s => s.mission === missionIx).length),
        start: i, indent: ind };
      return;
    }
    // A line at or left of the stops key closes the current stop.
    if(cur && line.trim() && ind <= stopsIndent){ cur.end = i; out.push(cur); cur = null; }
  });
  if(cur){ cur.end = lines.length; out.push(cur); }
  return out;
}

const SPANS = new Map();
for(const s of spans()) SPANS.set(`${s.mission}:${s.stop}`, s);

// Sanity: the spans have to agree with what the parser found, or the splice
// would land in the wrong stop. This has never been optional.
let mismatch = 0;
(book.missions ?? []).forEach((m, mi) => {
  (m.stops ?? []).forEach((s, si) => {
    const sp = SPANS.get(`${mi}:${si}`);
    if(!sp){ mismatch++; return; }
    const text = lines.slice(sp.start, sp.end).join('\n');
    if(s.title && !text.includes(String(s.title).split('\n')[0].slice(0, 24))) mismatch++;
  });
});
if(mismatch){
  console.error(`the stop spans do not line up with the parsed book (${mismatch} mismatch(es)).`);
  console.error('refusing to splice — this would edit the wrong stop.');
  process.exit(1);
}

/** The keys a format's old data lived in, which must not survive the change. */
const OLD_DATA = ['choices', 'mapping', 'scenarios', 'cards', 'order', 'proposals',
  'recommended', 'evidence', 'readings', 'headline', 'pack', 'estimate', 'answer',
  'rebuttals', 'columns', 'correct', 'figure', ...Object.values(BLOCK)];

/** The order a hand-written stop puts its keys in, so the diff reads like the book. */
const ORDER = ['group', 'task', 'title', 'place', 'scene', 'assumes', 'takeaway',
  'format', 'question'];
const TAIL = ['answerText', 'why'];

function stopYaml(stop, indent){
  const doc = {};
  for(const k of ORDER) if(stop[k] !== undefined) doc[k] = stop[k];
  const blockKey = BLOCK[stop.format];
  if(blockKey && stop[blockKey] !== undefined) doc[blockKey] = stop[blockKey];
  for(const k of TAIL) if(stop[k] !== undefined) doc[k] = stop[k];
  for(const [k, v] of Object.entries(stop)){
    if(doc[k] === undefined && v !== undefined && k !== blockKey) doc[k] = v;
  }
  // Emitted at column zero, then shifted whole. Block-scalar indentation is
  // relative to its own key, so a uniform shift preserves it.
  const body = emitYaml(doc).replace(/\n$/, '').split('\n');
  const pad = ' '.repeat(indent);
  return body.map((l, i) => (i === 0 ? `${pad}- ${l}` : (l ? `${pad}  ${l}` : l)));
}

const base = Object.fromEntries((book.missions ?? []).flatMap((m, mi) =>
  (m.stops ?? []).map((s, si) => [`${theme}.m${String(mi + 1).padStart(2, '0')}.s${si + 1}`,
    { mission: mi, stop: si, s }])));

/**
 * How much two sentences are about the same thing, on their content words.
 *
 * Only ever used to decide *which* rewritten option an old answer became, so it
 * needs to separate a paraphrase from three other options rather than to be a
 * good similarity measure in general.
 */
const SIM_STOP = new Set(('a an the of to in on at for with and or but is are was were be been it'
  + ' its this that these those as by from into out up down over under not no nor so than then when'
  + ' while which who what where why how each every any all both few more most other some such only'
  + ' own same too very can will just do does did have has had if because about after before during'
  + ' through against between within without you your we our they their he she his her them us me my'
  + ' also must may might should would could shall').split(' '));
function textSim(a, b){
  const bag = (x) => new Set((String(x ?? '').toLowerCase().match(/[a-z][a-z'-]*/g) ?? [])
    .filter(w => w.length > 3 && !SIM_STOP.has(w)).map(w => w.replace(/(ings?|ed|es|s|ly)$/, '')));
  const A = bag(a), B = bag(b);
  if(!A.size || !B.size) return 0;
  let n = 0; for(const w of A) if(B.has(w)) n++;
  return n / Math.sqrt(A.size * B.size);
}

const edits = [];
let applied = 0, refused = 0, textOnly = 0, unchanged = 0;

console.log(`\napply-conversions: ${theme}  <-  ${sheetArg}${dry ? '   (dry run)' : ''}\n`);

for(const row of rows){
  const at = base[row.id];
  if(!at){ console.log(`  ? ${row.id} — not a stop in this book`); continue; }
  if(SKIP.has(row.id)){ console.log(`  – ${row.id.padEnd(22)} skipped`); continue; }
  const stop = JSON.parse(JSON.stringify(at.s));
  const from = String(stop.format ?? '').toUpperCase().replace(/[\s_-]+/g, '');
  // A returned sheet does not always key the new format `format`; one came back
  // with `from`/`to`, and reading only `format` meant every block on it was
  // dropped and the row written as a prose edit, with nothing said.
  const { fmt: to, via } = targetFormat(row);
  if(via) console.log(`  ~ ${row.id.padEnd(22)} format read from \`${via}\`, not \`format\``);
  const converting = to && to !== from;
  // Only a *change* to an unbuildable format is a problem. A row that reports
  // its format unchanged — SWEEP -> SWEEP — is a row keeping one of the four
  // player-operated instruments, which are authored by hand and have no block
  // here; refusing those refused a row that was asking for nothing.
  if(converting && !known(to)){
    refused++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}: not a format this can build from a sheet`);
    continue;
  }

  // Prose the sheet may have changed. The first group lives on the stop; the
  // second is its question's own text, which arrives under `text` so the sheet
  // can carry it without carrying the numbers beside it.
  const textFields = ['title', 'task', 'scene', 'question', 'takeaway', 'why', 'assumes',
    'answerText'];
  const flat = (v) => (Array.isArray(v) ? v.map(x => String(x)) : String(v ?? ''))
    .toString().replace(/\s+/g, ' ').trim();
  const changedText = textFields.filter(f =>
    row[f] !== undefined && (Array.isArray(row[f]) ? row[f].length : String(row[f]).trim())
    && flat(row[f]) !== flat(stop[f]));
  // Question text, applied element by element so a shortened list cannot
  // silently drop an option the answer still points at.
  const applyQuestionText = (target) => {
    const t = row.text ?? {};
    const notes = [];
    const putList = (key, dest, set) => {
      if(!Array.isArray(t[key]) || !Array.isArray(target[dest])) return;
      if(t[key].length !== target[dest].length){
        notes.push(`${key}: ${t[key].length} back against ${target[dest].length} in the book — skipped`);
        return;
      }
      let changed = 0;
      t[key].forEach((v, i) => { if(set(i, v)) changed++; });
      if(changed) notes.push(`${key}×${changed}`);
    };
    const same = (a, b) => String(a ?? '').replace(/\s+/g, ' ').trim()
                        === String(b ?? '').replace(/\s+/g, ' ').trim();
    // What the options said before anything was replaced, and which of them the
    // answer pointed at. Both are needed after the fact: replacing by index
    // moves the key with the *position*, and a sheet that reorders the options
    // while rewording them then keys the question to whatever happens to land
    // in that slot. That shipped once — a blackout stop where the keyed answer
    // became "no listed element is likely to fail", refuted by its own first
    // rebuttal — and nothing downstream can see it, because the book is still
    // internally valid.
    const labelAt = (c) => (typeof c === 'string' ? c : c?.label);
    const wereLabels = (target.choices ?? []).map(labelAt);
    const wereAnswer = target.answer;
    putList('choices', 'choices', (i, v) => {
      const c = target.choices[i];
      // `answer` is graded by label, so a reworded choice takes the answer with
      // it or the question becomes unanswerable.
      const was = typeof c === 'string' ? c : c?.label;
      if(same(was, v)) return false;
      if(typeof c === 'string') target.choices[i] = v; else c.label = v;
      if(target.answer === was) target.answer = v;
      if(Array.isArray(target.answer)){
        target.answer = target.answer.map(a => (a === was ? v : a));
      }
      return true;
    });
    // Re-key by meaning rather than by slot. The old answer's own words decide
    // which of the new options it became; where that is not the slot the index
    // sync chose, the sheet reordered and the key is moved back, loudly.
    if(typeof wereAnswer === 'string' && Array.isArray(target.choices)
       && wereLabels.length === target.choices.length){
      const k = wereLabels.indexOf(wereAnswer);
      const now = target.choices.map(labelAt);
      if(k >= 0 && !now.includes(wereAnswer)){
        const scores = now.map(c => textSim(wereAnswer, c));
        const landed = scores.indexOf(Math.max(...scores));
        if(landed >= 0 && landed !== k && scores[landed] - scores[k] > 0.15){
          target.answer = now[landed];
          notes.push(`answer re-keyed to option ${landed + 1} — the options were reordered`);
        }
      }
    }
    putList('choiceMechanisms', 'choices', (i, v) => {
      const c = target.choices[i];
      if(!(c && typeof c === 'object') || !String(v).trim() || same(c.mechanism, v)) return false;
      c.mechanism = v; return true;
    });
    putList('rebuttals', 'rebuttals', (i, v) => {
      if(same(target.rebuttals[i], v)) return false;
      target.rebuttals[i] = v; return true;
    });
    putList('cards', 'cards', (i, v) => {
      const c = target.cards[i];
      if(same(typeof c === 'string' ? c : c?.label, v)) return false;
      if(typeof c === 'string') target.cards[i] = v; else c.label = v;
      return true;
    });
    putList('scenarios', 'scenarios', (i, v) => {
      const c = target.scenarios[i];
      if(same(typeof c === 'string' ? c : c?.label, v)) return false;
      if(typeof c === 'string') target.scenarios[i] = v; else c.label = v;
      return true;
    });
    putList('columns', 'columns', (i, v) => {
      if(same(target.columns[i], v)) return false;
      target.columns[i] = v; return true;
    });
    putList('proposals', 'proposals', (i, v) => {
      if(same(target.proposals[i]?.text, v)) return false;
      target.proposals[i].text = v; return true;
    });
    for(const k of ['evidence', 'headline', 'setup', 'call']){
      if(String(t[k] ?? '').trim() && !same(target[k], t[k])){ target[k] = t[k]; notes.push(k); }
    }
    if(t.estimate && target.estimate){
      let est = 0;
      for(const k of ['prompt', 'question', 'relationship', 'explanation', 'solution']){
        if(String(t.estimate[k] ?? '').trim() && !same(target.estimate[k], t.estimate[k])){
          target.estimate[k] = t.estimate[k]; est++;
        }
      }
      for(const k of ['givens', 'labels']){
        if(Array.isArray(t.estimate[k]) && Array.isArray(target.estimate[k])
           && t.estimate[k].length === target.estimate[k].length
           && t.estimate[k].some((v, i) => !same(v, target.estimate[k][i]))){
          target.estimate[k] = t.estimate[k]; est++;
        }
      }
      if(est) notes.push(`estimate×${est}`);
    }
    return notes;
  };

  if(!converting){
    const qNotes = noText ? [] : applyQuestionText(stop);
    if((changedText.length || qNotes.length) && !noText){
      textOnly++;
      for(const f of changedText) stop[f] = row[f];
      edits.push({ at, stop, label: `${row.id} text` });
      console.log(`  · ${row.id.padEnd(22)} text: ${[...changedText, ...qNotes].join(', ')}`);
    } else unchanged++;
    continue;
  }

  const key = BLOCK[to];
  const SCREENS = new Set(['CHOICE', 'TRIAGE', 'CASEBOOK', 'PROTOCOL', 'SEQUENCE',
    'BALLPARK', 'SCIENCETANK', 'DIAGNOSIS']);
  if(!key && !SCREENS.has(to)){
    console.log(`  ✗ ${row.id.padEnd(22)} -> ${to}: not a format this engine has`); refused++; continue;
  }
  // A retype between reading formats: no block, and the old format's leftovers
  // still have to go, or the importer validates data the new format never uses.
  if(!key){
    // A retype still has to arrive at a screen that can be built. Retyping a
    // PROTOCOL to a BALLPARK with no estimate reads as the cheapest possible
    // change and produces a stop with a question and no arithmetic behind it,
    // which the importer then refuses — taking the whole file's revert with it.
    const gap = screenGap(to, row, { text: stop });
    if(gap.length){
      refused++;
      console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}: retype needs ${gap.join(' + ')}`);
      continue;
    }
    for(const k of OLD_DATA) if(!['choices', 'rebuttals', 'cards', 'scenarios', 'mapping',
      'proposals', 'recommended', 'estimate', 'answer', 'columns', 'readings', 'pack',
      'headline', 'figure'].includes(k)) delete stop[k];
    stop.format = to;
    for(const f of textFields) if(String(row[f] ?? '').trim() || Array.isArray(row[f])) stop[f] = row[f];
    // A retype that brings its own data has to have it *installed*, not merged.
    // `applyQuestionText` updates a list element by element and deliberately
    // refuses to create one, so a CHOICE retyped to BALLPARK with a complete
    // estimate on the sheet arrived as a BALLPARK with no estimate at all —
    // green in the checker, refused by the importer, and the whole file
    // reverted for it.
    const NEW_BLOCK = { BALLPARK: ['estimate'], SEQUENCE: ['cards'],
      SCIENCETANK: ['proposals', 'evidence'], PROTOCOL: ['scenarios', 'columns'],
      CHOICE: [], TRIAGE: [], CASEBOOK: [], DIAGNOSIS: [] };
    for(const f of NEW_BLOCK[to] ?? []){
      const v = (row.text ?? {})[f];
      const empty = stop[f] === undefined
        || (Array.isArray(stop[f]) && !stop[f].length);
      if(empty && v !== undefined && (!Array.isArray(v) || v.length)) stop[f] = v;
    }
    if(!noText) applyQuestionText(stop);
    applied++;
    console.log(`  ✓ ${row.id.padEnd(22)} ${from} -> ${to.padEnd(10)} retype`);
    edits.push({ at, stop, label: `${row.id} ${from} -> ${to}` });
    continue;
  }
  const data = row.data ?? row[key];
  if(!data){ console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}: no data block`); refused++; continue; }

  let block, did = [], dropped = [], bad;
  try{
    ({ block, did, dropped } = normalise(to, data, row));
    bad = [...trap(to, block), ...missingFields(to, block).map(g => `missing ${g}`)];
  }catch(err){
    refused++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}`);
    console.log(`      the block is a shape this cannot read: ${err.message}`);
    continue;
  }
  if(bad.length){
    refused++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}`);
    for(const b of bad) console.log(`      TRAP: ${b}`);
    continue;
  }
  if(!String(row.answerText ?? '').trim()){
    refused++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${from} -> ${to}`);
    console.log('      TRAP: no answerText — the verdict could not say what was right');
    continue;
  }

  for(const k of OLD_DATA) delete stop[k];
  stop.format = to;
  stop[key] = block;
  stop.answerText = row.answerText;
  // Text always comes with a conversion: the task and question describe an
  // action that did not exist before, and leaving the old ones is how a stop
  // ends up asking a question its panel cannot answer.
  for(const f of textFields) if(String(row[f] ?? '').trim() || Array.isArray(row[f])) stop[f] = row[f];

  applied++;
  console.log(`  ✓ ${row.id.padEnd(22)} ${from} -> ${to.padEnd(10)} ${row.confidence ?? '?'}`);
  for(const d of did) console.log(`      normalised: ${d}`);
  for(const d of dropped) console.log(`      dropped: ${d}`);
  edits.push({ at, stop, label: `${row.id} ${from} -> ${to}` });
}

if(!edits.length){
  console.log(`\nnothing to write. ${refused} refused, ${textOnly} text-only, ${unchanged} unchanged.`);
  process.exit(refused ? 1 : 0);
}

// Splice from the bottom up, so earlier spans keep their line numbers.
const out = [...lines];
const ordered = [...edits].sort((a, b) =>
  SPANS.get(`${b.at.mission}:${b.at.stop}`).start - SPANS.get(`${a.at.mission}:${a.at.stop}`).start);
for(const e of ordered){
  const sp = SPANS.get(`${e.at.mission}:${e.at.stop}`);
  out.splice(sp.start, sp.end - sp.start, ...stopYaml(e.stop, sp.indent));
}
const next = out.join('\n');

// The book has to still parse, and the stop we replaced has to still be the stop
// we meant. Cheaper to find out here than in the importer's stack trace.
let reparsed;
try{ reparsed = parseYaml(next); }
catch(err){ console.error(`\nthe rewritten book does not parse: ${err.message}`); process.exit(1); }
const before = (book.missions ?? []).map(m => (m.stops ?? []).length).join(',');
const after = (reparsed.missions ?? []).map(m => (m.stops ?? []).length).join(',');
if(before !== after){
  console.error(`\nstop counts changed: ${before} -> ${after}. Refusing to write.`);
  process.exit(1);
}
for(const e of edits){
  const got = reparsed.missions[e.at.mission].stops[e.at.stop];
  if(String(got.format).toUpperCase() !== String(e.stop.format).toUpperCase()){
    console.error(`\n${e.label}: re-read as ${got.format}. Refusing to write.`);
    process.exit(1);
  }
}

console.log(`\n${applied} converted, ${textOnly} reworded`
  + (noText ? ' (skipped, --no-text)' : '')
  + `, ${refused} refused, ${unchanged} unchanged.`);

if(dry){
  console.log('\n--dry: nothing written.');
  process.exit(0);
}

// The trap check is a SUBSET of what the importer enforces — it asks whether the
// pedagogy is in there, not whether every required field is. A row can satisfy
// its trap and still be missing `transfers` on a chain link or `consequence` on
// a delegate problem, and the first version of this tool wrote that book and
// left it un-importable. So the write is atomic: put it down, ask the importer,
// and take it back if the answer is no.
const asItWas = raw;
writeFileSync(bookPath, next);
let importerSaid = '';
try{
  execFileSync('node', ['tools/import-book.mjs', bookPath, theme],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], cwd: root });
}catch(err){
  importerSaid = (err.stdout ?? '') + (err.stderr ?? '');
}
if(importerSaid){
  writeFileSync(bookPath, asItWas);
  console.log(`\nthe importer refuses the result, so the book is back as it was:\n`);
  const lines = importerSaid.split('\n').filter(l => l.includes('✗'));
  for(const l of lines.slice(0, 12)) console.log('  ' + l.trim());
  // An importer that threw rather than reported has no ✗ lines at all, and the
  // first version of this printed nothing — a failure with no message, which is
  // the worst output a tool can produce.
  if(!lines.length){
    const tail = importerSaid.trim().split('\n').filter(Boolean).slice(0, 10);
    for(const l of tail) console.log('  ' + l.trim());
  }
  // Point at the rows, not the missions — the sheet is keyed by stop id.
  const guilty = new Set();
  for(const l of lines){
    const m = /mission (\d+) \("[^"]*"\) stop (\d+)/.exec(l);
    if(m) guilty.add(`${theme}.m${String(+m[1]).padStart(2, '0')}.s${m[2]}`);
  }
  if(guilty.size){
    console.log(`\n  rows to fix or drop: ${[...guilty].join(', ')}`);
  }
  console.log('\nNothing was written.');
  process.exit(1);
}

console.log(`\nwrote books/${bookName}.yml — and the importer accepts it`);
console.log(`\nnow:  node tools/import-book.mjs books/${bookName}.yml ${theme} --verify`);
console.log(`then: npm run drive ${theme}`);
