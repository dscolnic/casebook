// v7extract.mjs — pull one mission's authored copy out of the v7 bible.
//
//   node tools/v7extract.mjs <bible.md> 2
//
// WHY THIS EXISTS. The master brief §12.3 is blunt: "Recalculate every numerical
// answer. Never allow a keyed value, tolerance, explanation, and worked formula
// to disagree." Fourteen missions is fifty-six stops of keyed values, tolerances,
// choice lists and rebuttals, and retyping them by hand into YAML is precisely
// how a keyed answer comes to disagree with the worked formula that justifies it.
//
// So the text is lifted, not retyped. What is NOT lifted is the three things the
// brief adds and the bible does not have — the card body's promised-result
// sentence, the `Mission decision:` outcome opener, and the chaining phrase on
// stops 2 to 4. Those are written by hand, per mission, against what this prints.
import { readFileSync } from 'node:fs';

const [file, want] = process.argv.slice(2);
if(!file || !want){
  console.error('usage: node tools/v7extract.mjs <bible.md> <mission number>');
  process.exit(2);
}
const lines = readFileSync(file, 'utf8').split('\n');

/** The slice of the document belonging to one mission. */
const start = lines.findIndex(l => new RegExp(`^# Mission ${want} `).test(l));
if(start < 0){ console.error(`no Mission ${want} in ${file}`); process.exit(1); }
let end = lines.findIndex((l, i) => i > start && /^# Mission \d+ /.test(l));
if(end < 0) end = lines.length;
const body = lines.slice(start, end);

/** `**Label:** value` on one line, trailing markdown hard-break removed. */
const field = (label, from = body) => {
  const re = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.*)$`);
  for(const l of from){
    const m = l.match(re);
    if(m) return m[1].replace(/\s+$/, '').replace(/\\$/, '').trim();
  }
  return null;
};
const clean = (s) => (s ?? '').replace(/`/g, '').trim();

console.log(`=== MISSION ${want}: ${body[0].replace(/^# Mission \d+ - /, '')}`);
console.log('\n--- briefing card (bible)');
for(const k of ['Header', 'Card title', 'Go now', 'Card body', 'Objective']){
  const v = field(k);
  if(v) console.log(`${k}: ${clean(v)}`);
}
console.log('  NOTE: the card body needs its fourth sentence rewritten to §11.1 —');
console.log('        a promised result opening "By the end of the mission".');

// ---- the beats
const beatAt = body.findIndex(l => /^\*\*Beat 1/.test(l));
const locAt = body.findIndex(l => /^## Location plan/.test(l));
if(beatAt >= 0){
  console.log('\n--- beats (bible)');
  for(const l of body.slice(beatAt, locAt < 0 ? beatAt + 90 : locAt)){
    if(/^\*\*Beat \d/.test(l)) console.log('\n' + l.replace(/\*\*/g, ''));
    else if(/^World state:|^\*\*Presentation/.test(l)) console.log('  ' + l.replace(/\*\*/g, ''));
    else if(/^\*\*Unlocks/.test(l)) console.log('  ' + l.replace(/\*\*/g, ''));
  }
}

// ---- the four stops
console.log('\n--- stops');
const stopHeads = body.map((l, i) => [l, i]).filter(([l]) => /^## Stop \d+ - /.test(l));
stopHeads.forEach(([head, i], k) => {
  const next = k + 1 < stopHeads.length ? stopHeads[k + 1][1] : body.length;
  const chunk = body.slice(i, next);
  console.log('\n' + head.replace(/^## /, ''));
  const KEYS = ['Format/placement', 'Metadata',
    'Question card story setup - exact player copy',
    'Question card story-science connection - exact player copy',
    'Question card prompt - exact player copy',
    'Choices', 'Cards', 'Authored tiles/data', 'Formula/data', 'Formula',
    'Balance block', 'Correct result', 'Correct order', 'Why',
    'Wrong-path feedback', 'State/output'];
  for(const key of KEYS){
    const v = field(key, chunk);
    if(v !== null) console.log(`  ${key}: ${clean(v)}`);
  }
  // CHOICE lists are a numbered block, not one line.
  const chStart = chunk.findIndex(l => /^\*\*Choices:\*\*/.test(l));
  if(chStart >= 0){
    const opts = [];
    for(const l of chunk.slice(chStart + 1)){
      const m = l.match(/^\d+\.\s*`?(.+?)`?\s*(\*\*\(correct\)\*\*)?\s*$/);
      if(m) opts.push({ text: m[1].replace(/`/g, '').trim(), correct: !!m[2] });
      else if(opts.length && l.trim() === '') continue;
      else if(opts.length) break;
    }
    if(opts.length){
      console.log('  CHOICES:');
      opts.forEach((o, n) => console.log(`    ${n + 1}. ${o.text}${o.correct ? '   <= CORRECT' : ''}`));
    }
  }
  if(k > 0) console.log('  NOTE: §13.2 — this setup must name what the previous stop established.');
});

// ---- outcome and the metric screen
const outAt = body.findIndex(l => /^## Mission outcome/.test(l));
if(outAt >= 0){
  const revAt = body.findIndex(l => /^## Quick concept review/.test(l));
  console.log('\n--- outcome (bible)');
  console.log(body.slice(outAt + 1, revAt < 0 ? outAt + 8 : revAt)
    .filter(l => l.trim() && !/^#/.test(l) && !/^\*\*/.test(l)).join('\n'));
  console.log('  NOTE: §13.4 — must be rewritten to OPEN with "Mission decision: …".');
  for(const k of ['Timer line template', 'Story event', 'Automatic bar change']){
    const v = field(k);
    if(v) console.log(`  ${k}: ${clean(v)}`);
  }
  if(revAt >= 0){
    console.log('\n--- quick concept review (bible)');
    for(const l of body.slice(revAt + 1)) if(/^- /.test(l)) console.log('  ' + clean(l));
  }
}
