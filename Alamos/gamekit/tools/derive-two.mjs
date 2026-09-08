// derive-two.mjs — cut every derivation step down to two candidates.
//
//   node tools/derive-two.mjs [book.yml ...] [--dry]
//
// A DERIVE step used to offer three or four lines and, on some books, a list of
// rules to name as well. It offers two lines now and nothing else, so a step is
// one decision. This does the migration on the books, which is where the content
// lives; the generated `themes/*/content` follows from re-importing.
//
// Which two: the first two, because the shipped derivations are being
// re-authored and choosing the better distractor now would be work thrown away.
// The one exception is arithmetic rather than judgement — the keyed line sits at
// index 2 or 3 on 105 of the 248 steps, so "the first two" would leave those
// steps with no right answer in them. There the pair is the first line and the
// keyed one.
//
// What the resulting pair does not satisfy — a distractor not marked `survives`,
// or one short enough that the keyed line reads by shape — is written to
// `tools/derive-two-debt.json` rather than papered over. Marking `survives` on a
// line nobody checked would assert an authoring judgement that was never made,
// and lengthening a distractor is writing algebra into a shipped derivation.
// Both belong to the author; the importer reads the debt file so the rules stay
// hard for everything written from here on.
//
// Line-based on purpose. These books carry comments and folded scalars that a
// parse-and-rewrite round trip flattens, and a migration that reformats every
// derivation makes its own diff unreadable.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const files = args.filter(a => !a.startsWith('--'));
const books = files.length ? files
  : readdirSync('books').filter(f => f.endsWith('.yml')).map(f => `books/${f}`);

const indentOf = (l) => l.length - l.trimStart().length;

let stepsCut = 0, stepsSeen = 0, rulesDropped = 0, askDropped = 0, hintsFixed = 0;
const debt = { survives: 0, shape: 0 };
const debtRows = [];
// STRESS and DIAGNOSIS write `candidates:` too, and a migration that trims those
// silently removes two thirds of a robustness grid. So the file is walked with
// the derive block's own extent tracked, and nothing outside it is touched.
const notes = [];

for(const file of books){
  const lines = readFileSync(file, 'utf8').split('\n');
  const out = [];
  let deriveInd = -1;
  for(let i = 0; i < lines.length; i++){
    const line = lines[i];
    if(/^\s*derive:\s*$/.test(line)) deriveInd = indentOf(line);
    else if(deriveInd >= 0 && line.trim() && indentOf(line) <= deriveInd
      && !/^\s*-\s/.test(line)) deriveInd = -1;
    const inDerive = deriveInd >= 0;

    // `askRule: true` and the whole `rules:` list, wherever they sit in a derive
    // block. Both are gone from the format; a book keeping either is refused by
    // the importer rather than silently stripped, so they go here.
    if(inDerive && /^\s*askRule:\s*true\s*$/.test(line)){ askDropped++; continue; }
    if(inDerive && (/^\s*rules:\s*$/.test(line) || /^\s*rules:\s*\[/.test(line))){
      const ind = indentOf(line);
      if(/^\s*rules:\s*\[/.test(line)){ rulesDropped++; continue; }
      let j = i + 1;
      while(j < lines.length && (!lines[j].trim() || indentOf(lines[j]) > ind)) j++;
      i = j - 1; rulesDropped++; continue;
    }

    // A hint that tells the player to name the move is now a lie on the panel.
    if(/^\s*hint:/.test(line) || (out.length && /^\s*hint: >-\s*$/.test(out[out.length - 1]))){
      // handled by the sweep below; fall through
    }

    if(!inDerive || !/^\s*candidates:\s*$/.test(line)){ out.push(line); continue; }

    // ---------------------------------------------------------------- a step
    // YAML lets a sequence sit at its key's own indent, and these books do
    // exactly that — `candidates:` and its `- text:` entries both at eight. A
    // body scan that wants a deeper indent finds nothing and reports 265 steps
    // seen and none cut, which is what it did.
    const candInd = indentOf(line);
    let j = i + 1;
    while(j < lines.length && (!lines[j].trim()
      || indentOf(lines[j]) > candInd
      || (indentOf(lines[j]) === candInd && /^\s*-\s/.test(lines[j])))) j++;
    const body = lines.slice(i + 1, j);

    // Split the body into one block per `- text:` entry. The entry indent is
    // the first item's own, not the key's: half these books put the sequence at
    // the key's indent and half put it two deeper, and assuming either one drops
    // 147 of 248 steps on the floor without a word.
    const first = body.find(l => /^\s*-\s/.test(l));
    const entryInd = first === undefined ? candInd : indentOf(first);
    const entries = [];
    for(const l of body){
      if(/^\s*-\s/.test(l) && indentOf(l) === entryInd) entries.push([l]);
      else if(entries.length) entries[entries.length - 1].push(l);
    }
    stepsSeen++;
    const alreadyTwo = entries.length <= 2;

    // The keyed index: the `answer:` already written above this `candidates:`,
    // at the step's own indent. Searched backwards because a step writes `ask`,
    // then `answer`, then its candidates.
    let keyAt = -1, key = null, askText = '';
    for(let k = out.length - 1; k >= 0 && k > out.length - 40; k--){
      const m = out[k].match(/^(\s*)answer:\s*(\d+)\s*$/);
      if(m && indentOf(out[k]) <= candInd && key === null){ keyAt = k; key = +m[2]; }
      const a = out[k].match(/^\s*-\s+ask:\s*(.*)$/);
      if(a){ askText = a[1]; break; }
    }
    // The ask is the debt file's key, so it has to be the value a YAML parser
    // sees and not the quoted source — half the first run's entries were written
    // with their quotes still on and matched nothing.
    askText = askText.trim().replace(/^['"]|['"]$/g, '').slice(0, 90);
    if(key === null || key >= entries.length){
      notes.push(`${file}: a candidates list whose \`answer\` could not be read — left alone`);
      out.push(line, ...body); i = j - 1; continue;
    }

    const textOf = (e) => (e.join('\n').match(/text:\s*(.*)/) ?? [, ''])[1].trim()
      .replace(/^['"]|['"]$/g, '');

    // The shipped derivations are being re-authored, so this takes the first two
    // candidates and makes no judgement about which distractor is the better one.
    // The one thing it will not do is take them literally: the keyed line sits at
    // index 2 or 3 on 105 of the 248 steps, and dropping it leaves a step with no
    // right answer in it. So the pair is the first two where the answer is
    // already among them, and otherwise the first line and the keyed one.
    const keep = alreadyTwo ? [0, 1] : (key < 2 ? [0, 1] : [0, key]);
    const other = keep.find(n => n !== key);
    // What the pair does NOT satisfy is recorded rather than fixed here. Marking
    // `survives` on a line nobody has checked survives would assert an authoring
    // judgement that was never made, in content this repo protects; and writing a
    // longer distractor is writing algebra into a shipped derivation. Both are
    // the author's, so both become debt the importer knows the shape of.
    const wrongBlock = entries[other].join('\n');
    if(!/^\s*survives:\s*true\s*$/m.test(wrongBlock)) debt.survives++;
    if(textOf(entries[other]).length < textOf(entries[key]).length - 6) debt.shape++;
    debtRows.push({ book: file, ask: askText,
      survives: /^\s*survives:\s*true\s*$/m.test(wrongBlock),
      shape: !(textOf(entries[other]).length < textOf(entries[key]).length - 6) });

    keep.sort((a, b) => a - b);
    out.push(line);
    if(alreadyTwo){ out.push(...body); i = j - 1; continue; }
    out[keyAt] = out[keyAt].replace(/answer:\s*\d+/, `answer: ${keep.indexOf(key)}`);
    for(const n of keep) out.push(...entries[n]);
    stepsCut++;
    i = j - 1;
  }

  // The hint sentence, swept once over the finished file.
  let text = out.join('\n');
  const before = text;
  text = text
    .replace(/ Name the move as well as the line\./g, '')
    .replace(/, and name the rule that gets you there\./g, '.')
    .replace(/ Name the rule as well as the line\./g, '')
    .replace(/Choose the line that follows, and name the rule[^\n]*/g,
      'Choose the line that follows from the one above it.');
  if(text !== before) hintsFixed++;

  if(!dry) writeFileSync(file, text);
}

if(!dry){
  writeFileSync('tools/derive-two-debt.json', JSON.stringify({
    note: 'Steps the two-candidate cut left short of the format, by `ask`. Written by'
      + ' tools/derive-two.mjs; read by tools/import-book.mjs, which downgrades exactly these'
      + ' to warnings. The list may shrink and may never grow — a step re-authored to two'
      + ' real candidates drops out of it, and a new stop is never in it.',
    asks: debtRows.filter(r => !r.survives || !r.shape).map(r => r.ask).sort(),
  }, null, 2) + '\n');
}
console.log(`${stepsCut} of ${stepsSeen} step(s) cut to two candidates`
  + ` · ${askDropped} askRule · ${rulesDropped} rules list(s) · ${hintsFixed} book hint(s) reworded`
  + (dry ? '  (dry run — nothing written)' : ''));
console.log(`  debt: ${debt.survives} step(s) whose distractor is not marked \`survives\`,`
  + ` ${debt.shape} whose keyed line now reads by shape`);
for(const n of [...new Set(notes)]) console.log(`  · ${n}`);
