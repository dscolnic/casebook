// rewrite-cards.mjs — replace a campaign's narrative cards from a JSON file.
//
//   node tools/rewrite-cards.mjs cards.json
//   node tools/rewrite-cards.mjs cards.json --dry
//
// cards.json:
//   {
//     "blackout": {
//       "opening": "one paragraph, or [\"para\"]",
//       "stakes": { "1": "day 1 stake", "7": "day 7 stake" }
//     }
//   }
//
// WHY A TOOL RATHER THAN AN EDIT. The two cards this touches live in two
// different places, and getting that wrong silently loses the work:
//
//   · the **opening card** is `opening:` in `themes/<theme>/theme.js`. The
//     importer has never written it, so it is edited in the manifest and stays.
//   · a **day stake** is `stake:` in `books/<theme>.yml`, and the copy in
//     `themes/<theme>/content/missions.js` is GENERATED. Editing the generated
//     file works until the next import and then vanishes, and `bookParity` fails
//     the game in between.
//
// So this writes the book for stakes and the manifest for the opening, and then
// tells you to re-import. It does not import for you: an import is loud, and a
// pass that rewrites fifteen cards wants to see the parse errors from one.
//
// It keeps each file's own shape — a `>-` folded block stays folded, a quoted
// scalar stays quoted, and the manifest's `'…' + '…'` continuation style is
// rebuilt at the same width — because the diff of a card pass should be the words
// that changed and nothing else.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
const gamekit = resolve(here, '..');

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const specPath = args.find(a => !a.startsWith('--'));
if(!specPath){
  console.error('usage: node tools/rewrite-cards.mjs <cards.json> [--dry]');
  process.exit(2);
}

/** books/<theme>.yml, with the dashed spelling the books use for editions. */
function bookPath(theme){
  const dashed = resolve(gamekit, 'books', theme.replace(/_/g, '-') + '.yml');
  if(existsSync(dashed)) return dashed;
  const under = resolve(gamekit, 'books', theme + '.yml');
  if(existsSync(under)) return under;
  return null;
}

/** Wrap at 96 columns the way the books and manifests already do. */
function wrap(text, width = 96, indent = ''){
  const out = [];
  let line = '';
  for(const word of String(text).split(/\s+/).filter(Boolean)){
    const next = line ? `${line} ${word}` : word;
    if(next.length + indent.length > width && line){ out.push(indent + line); line = word; }
    else line = next;
  }
  if(line) out.push(indent + line);
  return out;
}

/** Every `  - title:` mission block under `missions:`, as [start, end). */
function missionSpans(text){
  const at = text.indexOf('\nmissions:');
  if(at < 0) throw new Error('no `missions:` block in the book');
  const starts = [...text.slice(at).matchAll(/\n  - title:/g)].map(m => m.index + at);
  return starts.map((s, i) => [s, starts[i + 1] ?? text.length]);
}

/** Swap one mission's stake, keeping the YAML shape the book used. */
function replaceStake(block, next){
  const folded = block.match(/\n(    )stake: (>-|\|-|\||>)\n((?:\1  .*\n|\n)+)/);
  if(folded){
    const indent = folded[1] + '  ';
    return block.slice(0, folded.index)
      + `\n${folded[1]}stake: ${folded[2]}\n${wrap(next, 96, indent).join('\n')}\n`
      + block.slice(folded.index + folded[0].length);
  }
  const dq = block.match(/\n(    )stake: "((?:[^"\\]|\\.)*)"\n/);
  if(dq){
    const esc = next.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return block.slice(0, dq.index) + `\n${dq[1]}stake: "${esc}"\n`
      + block.slice(dq.index + dq[0].length);
  }
  const sq = block.match(/\n(    )stake: '((?:[^']|'')*)'\n/);
  if(sq){
    return block.slice(0, sq.index) + `\n${sq[1]}stake: '${next.replace(/'/g, "''")}'\n`
      + block.slice(sq.index + sq[0].length);
  }
  throw new Error('no `stake:` in a mission block — is this the right book?');
}

/** The manifest's `opening: [ '…' + '…' ]`, rebuilt. */
function openingBlock(paras){
  // A trailing space on every line but the last, because JS concatenation does
  // not add one. Without it the card reads "…continuation style canbe seen…" and
  // the first live test of this tool produced exactly that.
  const esc = (l) => l.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const one = (text) => {
    const lines = wrap(text, 96, '');
    return lines
      .map((line, i) => (i < lines.length - 1 ? line + ' ' : line))
      .map((line, i) => (i === 0 ? `    '${esc(line)}'` : `    + '${esc(line)}'`))
      .join('\n');
  };
  return '  opening: [\n' + paras.map(p => one(p)).join(',\n') + ',\n  ],';
}

const spec = JSON.parse(readFileSync(specPath, 'utf8'));
let wrote = 0;
for(const [theme, work] of Object.entries(spec)){
  // ---- the opening card, in the manifest
  if(work.opening){
    const paras = Array.isArray(work.opening) ? work.opening : [work.opening];
    const tf = resolve(gamekit, 'themes', theme, 'theme.js');
    const s = readFileSync(tf, 'utf8');
    const i = s.indexOf('\n  opening:');
    if(i < 0) throw new Error(`${theme}: no \`opening:\` in the manifest`);
    const j = s.indexOf('\n  ],', i) + '\n  ],'.length;
    const next = s.slice(0, i) + '\n' + openingBlock(paras) + s.slice(j);
    if(!dry) writeFileSync(tf, next);
    console.log(`${theme}: opening card ${dry ? 'would be' : ''} rewritten (${paras.length} paragraph(s))`);
    wrote++;
  }
  // ---- the day stakes, in the book
  const stakes = work.stakes ?? {};
  const days = Object.keys(stakes);
  if(days.length){
    const bp = bookPath(theme);
    if(!bp) throw new Error(`${theme}: no book in books/ — a stake cannot be edited anywhere else`);
    let s = readFileSync(bp, 'utf8');
    const spans = missionSpans(s);
    // Backwards, so the offsets of the earlier blocks stay valid.
    for(const day of days.map(Number).sort((a, b) => b - a)){
      const span = spans[day - 1];
      if(!span) throw new Error(`${theme}: no day ${day} — the book has ${spans.length} missions`);
      const [a, b] = span;
      s = s.slice(0, a) + replaceStake(s.slice(a, b), stakes[String(day)]) + s.slice(b);
    }
    if(!dry) writeFileSync(bp, s);
    console.log(`${theme}: ${days.length} stake(s) ${dry ? 'would be' : ''} rewritten in ${bp.split('/').pop()}`);
    wrote++;
    if(!dry) console.log(`  now: node tools/import-book.mjs ${bp.replace(gamekit + '/', '')} ${theme} --verify`);
  }
}
if(!wrote) console.log('nothing to do — the spec named no `opening` and no `stakes`');
