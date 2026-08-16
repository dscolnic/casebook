// check-conversions.mjs — take a returned conversion sheet and say which rows
// would survive the importer, without writing anything.
//
//   node tools/check-conversions.mjs <theme> <returned.jsonl>
//
// The read-only half of `apply-conversions.mjs`, sharing its normaliser so the
// two cannot disagree about what a row means. Run this on a sheet the moment it
// comes back; run apply when it is green.
//
// The sheet comes from somewhere with no access to the engine, so it is written
// from a prose description of each format. What that produces is not wrong data
// — it is data under slightly different names, with the arithmetic underneath
// usually right. `conversion-normalise.mjs` absorbs the names. The trap is the
// arithmetic, and nothing can rename it into correctness.
import { readFileSync } from 'node:fs';
import { normalise, trap, missingFields, BLOCK, targetFormat, known, screenGap } from './conversion-normalise.mjs';

const [theme, sheet] = process.argv.slice(2);
if(!theme || !sheet){
  console.error('usage: node tools/check-conversions.mjs <theme> <returned.jsonl>');
  process.exit(2);
}

const rows = readFileSync(sheet, 'utf8').split('\n').filter(l => l.trim()).map(l => JSON.parse(l));
const base = Object.fromEntries(
  readFileSync(`books/convert/${theme}-stops.jsonl`, 'utf8').split('\n').filter(l => l.trim())
    .map(l => JSON.parse(l)).map(r => [r.id, r]));

const notes = [];
const note = (id, m) => notes.push(`    ~ ${m}`);

let ready = 0, blocked = 0;
console.log(`\nchecking ${sheet} against ${theme}\n`);
for(const row of rows){
  const was = base[row.id];
  if(!was){ console.log(`  ? ${row.id} — not a stop in this game`); continue; }
  const { fmt, via } = targetFormat(row);
  if(!fmt || was.format === fmt) continue;                     // untouched
  if(via) note(row.id, `${row.id}: format read from \`${via}\`, not \`format\``);
  // A name nothing can build. Saying so is the point — an unrecognised format
  // used to fall through to "retype, no block needed" and be reported green.
  if(!known(fmt)){
    blocked++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${was.format} -> ${fmt}: not one of the nineteen formats`
      + ' or the eight screens');
    continue;
  }
  const key = BLOCK[fmt];
  // A retype to one of the eight reading-and-answering screens is a legitimate
  // verdict and needs no block — a DIAGNOSIS with no panel really is a CHOICE.
  // Its content travels in the sheet's own `text`, which the applier writes.
  if(!key){
    const gap = screenGap(fmt, row, was);
    if(gap.length){
      blocked++;
      console.log(`  ✗ ${row.id.padEnd(22)} ${was.format} -> ${fmt.padEnd(10)}`
        + ` retype, but ${fmt} needs ${gap.join(' + ')} and the row has none`);
      continue;
    }
    ready++;
    console.log(`  ✓ ${row.id.padEnd(22)} ${was.format} -> ${fmt.padEnd(10)} retype, no block needed`);
    continue;
  }
  const raw = row.data ?? row[key];
  if(!raw){
    blocked++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${was.format} -> ${fmt}: no data block`);
    continue;
  }
  let block, did = [], dropped = [], bad;
  try{
    ({ block, did, dropped } = normalise(fmt, raw, row));
    for(const d of dropped) note(row.id, d);
    bad = [...trap(fmt, block), ...missingFields(fmt, block).map(g => `missing ${g}`)];
  }catch(err){
    blocked++;
    console.log(`  ✗ ${row.id.padEnd(22)} ${was.format} -> ${fmt}`);
    console.log(`      the block is a shape this cannot read: ${err.message}`);
    continue;
  }
  const ok = bad.length === 0;
  ok ? ready++ : blocked++;
  console.log(`  ${ok ? '✓' : '✗'} ${row.id.padEnd(22)} ${was.format} -> ${fmt.padEnd(10)}`
    + ` ${row.confidence ?? '?'}`);
  for(const d of did) console.log(`      normalised: ${d}`);
  for(const b of bad) console.log(`      TRAP: ${b}`);
  if(!String(row.answerText ?? '').trim()) console.log('      TRAP: no answerText');
}
for(const n of notes) console.log(n);
console.log(`\n${ready} ready to apply, ${blocked} blocked.`);
