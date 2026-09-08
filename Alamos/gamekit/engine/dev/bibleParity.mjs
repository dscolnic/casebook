// bibleParity.mjs — is the book's player-facing copy still the bible's?
//
//   node engine/dev/bibleParity.mjs            every book that names a bible
//   node engine/dev/bibleParity.mjs redsand_v5
//   node engine/dev/bibleParity.mjs --selftest
//
// THE GAP THIS FILLS. `bookParity` already fails a book that stops regenerating
// the content its game ships, so book↔game is guarded. Nothing guarded
// bible↔book, and that is where drift actually lives: the implementation is not
// allowed to write player-facing prose, and the only thing enforcing that was
// somebody reading both documents side by side. Building Red Sand's first three
// missions produced five drifted strings — an answer text taken from the bible's
// "Correct result" line instead of its "Answer text" line, a prompt missing the
// clause a revision had added — and every one of them was found by eye.
//
// That does not scale, and it gets worse the moment missions are written in
// parallel: N authors retyping is N times the drift, with nothing to catch it.
//
// HOW IT DECIDES. A book names its source in a `# Source: <file>` comment. Every
// player-facing string in the book must appear in that file, normalised for
// whitespace, quotes and dashes. It is a containment test rather than a
// field-by-field one on purpose: the book legitimately splits one of the bible's
// wrong-path paragraphs into a rebuttal per option, and joins its outcome
// paragraph into one segue, so the words survive while the field boundaries do
// not. What it catches is prose that was rewritten, which is the thing that is
// not allowed.
//
// WHAT IS ALLOWED, and has to be recorded. `engine/dev/bibleparity-debt.json`
// carries the strings a build wrote itself — the entries a bible owes and the
// implementation supplied to keep the build moving. Each one is a line somebody
// has to answer for, which is the point.
import { readFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { readBible } from '../../tools/bibleRead.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '../..');
const DEBT_FILE = resolve(gamekit, 'engine/dev/bibleparity-debt.json');

const args = process.argv.slice(2);
const wanted = args.find(a => !a.startsWith('--'));

/** The one normalisation both sides go through. */
const flat = (s) => String(s ?? '')
  .replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
  .replace(/[–—]/g, '-').replace(/ /g, ' ')
  .replace(/[*`\\]/g, '')
  .replace(/\s+/g, ' ')
  .toLowerCase()
  .trim();

/**
 * The player-facing strings in a book, with where each came from.
 *
 * Read out of the YAML as text rather than parsed: this file has to run before
 * the theme is imported, and the fields it wants are all `key: "…"` or `- "…"`
 * under a key it knows. A parser would be a second description of the book
 * format, which is the duplication CLAUDE.md names.
 */
function bookStrings(file){
  const lines = readFileSync(file, 'utf8').split('\n');
  const KEYS = new Set(['header', 'title', 'goNow', 'body', 'objective', 'stake', 'takeaway',
    'segue', 'reason', 'scene', 'motivation', 'question', 'answer', 'answerText', 'why', 'say']);
  const LISTS = new Set(['choices', 'rebuttals', 'primer', 'cards']);
  const out = [];
  let listKey = null, listIndent = -1;
  // ONLY UNDER `missions:`. The book's other top-level blocks are staging rather
  // than player copy — `interiors:` station rows, `copy:` place blurbs, the
  // glossary — and a scanner that swept the whole file reported an interior
  // panel headed "Plant summary" as prose the bible had not written. It had not,
  // and it was never supposed to: a wall panel's title is furniture.
  const push = (what, text, n) => {
    const t = String(text ?? '').trim().replace(/^["']|["'],?$/g, '');
    if(t.length > 12) out.push({ what, text: t, line: n + 1 });
  };
  let inMissions = false;
  for(let i = 0; i < lines.length; i++){
    const l = lines[i];
    if(/^\s*#/.test(l)) continue;
    const top = l.match(/^([A-Za-z][A-Za-z0-9_]*):\s*$/);
    if(top){ inMissions = top[1] === 'missions'; continue; }
    if(!inMissions) continue;
    const indent = l.match(/^\s*/)[0].length;
    const kv = l.match(/^\s*([A-Za-z][A-Za-z0-9_]*):\s*(.*)$/);
    if(kv){
      const [, key, val] = kv;
      if(LISTS.has(key)){ listKey = key; listIndent = indent; continue; }
      listKey = null;
      if(!KEYS.has(key)) continue;
      if(/^[>|]-?$/.test(val.trim())){
        // A folded block: everything more-indented below it.
        const buf = [];
        for(let j = i + 1; j < lines.length; j++){
          if(lines[j].trim() && lines[j].match(/^\s*/)[0].length <= indent) break;
          buf.push(lines[j].trim());
        }
        push(key, buf.join(' '), i);
      } else if(val.trim()) push(key, val, i);
      continue;
    }
    const item = l.match(/^\s*-\s+(.*)$/);
    if(item && listKey && indent >= listIndent){ push(listKey, item[1], i); continue; }
    if(l.trim() && !item) listKey = null;
  }
  return out;
}

/** The bible a book names, if it names one. */
function sourceOf(file){
  const head = readFileSync(file, 'utf8').split('\n').slice(0, 60);
  for(const l of head){
    const m = l.match(/^#\s*Source:\s*(\S+)/);
    if(!m) continue;
    for(const base of [resolve(gamekit, '..'), gamekit, resolve(gamekit, 'books')]){
      const p = resolve(base, m[1]);
      if(existsSync(p)) return p;
    }
    return { missing: m[1] };
  }
  return null;
}

const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : { _comment: '', themes: {} };
debt.themes = debt.themes ?? {};
debt._comment = debt._comment
  || 'Player-facing strings a book carries that its bible does not. Each is prose the '
   + 'implementation wrote, which it is not supposed to do — an entry the bible owes, a '
   + 'station a payload was short of, a label a format required. engine/dev/bibleParity.mjs. '
   + 'A string not listed here fails; one listed here that now matches the bible fails too, '
   + 'naming the line to delete.';

if(args.includes('--selftest')){
  const bible = 'The gauge measures everything pushing on the tank wall.';
  const ok = flat('The  gauge measures everything pushing on the tank wall.');
  const drift = flat('The gauge measures everything pressing on the tank wall.');
  let bad = 0;
  if(!flat(bible).includes(ok)){ console.log('✗ whitespace alone is treated as drift'); bad++; }
  if(flat(bible).includes(drift)){ console.log('✗ a reworded sentence is not treated as drift'); bad++; }
  // The case two inputs that should score the same actually do: curly quotes and
  // an em dash are typography, not rewriting.
  const typo = flat('The gauge — measures everything pushing on the tank wall.');
  if(flat('The gauge - measures everything pushing on the tank wall.') !== typo){
    console.log('✗ an em dash and a hyphen are not read as the same character'); bad++;
  }
  console.log(bad ? `\n${bad} selftest case(s) failed.`
    : 'bibleParity --selftest: 3 cases, typography is not drift and a rewritten word is.');
  process.exit(bad ? 1 : 0);
}

const books = readdirSync(resolve(gamekit, 'books'))
  .filter(f => /\.ya?ml$/i.test(f))
  .filter(f => !wanted || f.replace(/\.ya?ml$/i, '') === wanted);

let failed = 0, checked = 0, stale = 0;
for(const f of books){
  const file = resolve(gamekit, 'books', f);
  const theme = f.replace(/\.ya?ml$/i, '');
  const src = sourceOf(file);
  if(!src) continue;
  if(src.missing){
    console.log(`✗ ${theme}: names a source this checkout does not have — ${src.missing}`);
    failed++;
    continue;
  }
  checked++;
  const hay = flat(readFileSync(src, 'utf8'));
  const listed = new Set(debt.themes[theme] ?? []);
  const missing = [];
  const matched = new Set();
  for(const s of bookStrings(file)){
    const needle = flat(s.text);
    if(!needle || hay.includes(needle)){ if(listed.has(s.text)) matched.add(s.text); continue; }
    if(listed.has(s.text)) continue;
    missing.push(s);
  }
  const paid = [...listed].filter(x => matched.has(x));
  if(missing.length){
    failed++;
    console.log(`✗ ${theme}: ${missing.length} player-facing string(s) the bible does not contain`);
    for(const m of missing.slice(0, 12))
      console.log(`    ${String(m.line).padStart(5)}  ${m.what}: ${m.text.slice(0, 96)}`);
    if(missing.length > 12) console.log(`    … ${missing.length - 12} more`);
  } else {
    console.log(`✓ ${theme.padEnd(20)} every player-facing line is the bible's`
      + (listed.size ? `  (${listed.size} recorded deviation(s))` : ''));
  }
  if(paid.length){
    stale += paid.length;
    console.log(`  · ${theme}: ${paid.length} recorded deviation(s) now match the bible — delete them from ${DEBT_FILE.replace(gamekit + '/', '')}`);
    for(const p of paid.slice(0, 6)) console.log(`      ${p.slice(0, 90)}`);
  }
}

if(!existsSync(DEBT_FILE)) writeFileSync(DEBT_FILE, JSON.stringify(debt, null, 2) + '\n');
console.log(failed || stale
  ? `\n${failed} book(s) carry prose their bible does not.`
  : `\n${checked} book(s) checked: every player-facing line is lifted, not written.`);
process.exit(failed || stale ? 1 : 0);
