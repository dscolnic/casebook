// numerals.mjs — the house style for quantities, applied to a book.
//
//   node tools/numerals.mjs books/redsand.yml            # report, change nothing
//   node tools/numerals.mjs books/redsand.yml --write
//   node tools/numerals.mjs books/*.yml --write
//
// THE RULE. Digits for everything, except integers zero to ten, which stay
// words. "3.9 tonnes", "195 sols", "320 degrees" — but "one of the tanks",
// "three days", "the one that matters".
//
// WHY THAT CUT. These are science courses and the cards carry the quantities
// the missions turn on; a number you are meant to compute with reads better as
// a numeral. Below eleven the numbers are usually counts rather than
// measurements, and a card that opens "3 people" instead of "three people"
// reads like a spreadsheet. It also makes the rule safe to automate, which a
// rule about *all* numbers is not: "one" is a pronoun as often as it is a
// count, and every case it could damage is on the words side of the line.
//
// WHAT IT WILL NOT TOUCH, and each of these cost something to learn:
//
//   · ordinals — "the first pass", "the second sol". They are not quantities.
//   · anything inside a `choices:` or `correctChoice:` line. Grading compares
//     labels as strings, so rewriting one and not the other makes a question
//     ungradeable, and rewriting both is a silent change to a keyed answer.
//     Those get reported for a human instead.
//   · a run that is already digits. Idempotent by construction.
//   · "one" through "ten" standing alone, which is the rule.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const UNIT = { zero:0, one:1, two:2, three:3, four:4, five:5, six:6, seven:7,
  eight:8, nine:9, ten:10, eleven:11, twelve:12, thirteen:13, fourteen:14,
  fifteen:15, sixteen:16, seventeen:17, eighteen:18, nineteen:19 };
const TENS = { twenty:20, thirty:30, forty:40, fifty:50, sixty:60, seventy:70,
  eighty:80, ninety:90 };
const SCALE = { hundred:100, thousand:1000, million:1000000, billion:1000000000 };

const isWordNum = (w) => {
  const b = w.toLowerCase();
  return b in UNIT || b in TENS || b in SCALE;
};

/** "a hundred and ninety-five" -> 195. Returns null if it does not parse. */
function valueOf(tokens){
  let total = 0, current = 0, seen = false;
  for(const raw of tokens){
    const t = raw.toLowerCase();
    if(t === 'and' || t === 'a') continue;
    if(t in UNIT){ current += UNIT[t]; seen = true; continue; }
    if(t in TENS){ current += TENS[t]; seen = true; continue; }
    if(t in SCALE){
      const s = SCALE[t];
      if(s === 100) current = (current || 1) * 100;
      else { total += (current || 1) * s; current = 0; }
      seen = true;
      continue;
    }
    return null;
  }
  return seen ? total + current : null;
}

/**
 * Prose, restyled — a whole block at a time, never a line at a time.
 *
 * TWO THINGS THIS HAS TO GET RIGHT, and the first version got both wrong.
 *
 * A quantity can straddle a line wrap. "a hundred and\n      six days long" is
 * 106, and a line-at-a-time pass reads it as "a hundred and" — which it dutifully
 * converts to "100 and", turning 106 into 100 without touching a digit anybody
 * would notice. That is why this takes the whole block and why every line break
 * inside a run is put back afterwards.
 *
 * And a sentence has to be internally consistent. The rule keeps integers zero
 * to ten as words, which on its own produces "nine days of rain, and ten of the
 * 12 villages" — correct by the letter and unreadable. So the decision is made
 * per sentence: if anything in it needs digits, everything in it gets digits.
 */
export function restyle(text){
  const parts = String(text ?? '').split(/(\s+)/);
  const bare = (s) => s.replace(/[^A-Za-z-]/g, '');
  // A YAML key is not a word in a sentence. `a: Two results share a step` reads
  // as "a Two" to a naive scan, which swallowed the key and the word together
  // and emitted "2 results share a step" — deleting the answer field of a quiz
  // and leaving valid-looking YAML behind. Anything ending in a colon is
  // structure, and structure is never part of a quantity.
  const isKey = (s) => /^[A-Za-z_][\w-]*:$/.test(s);
  const startsRun = (s) => {
    if(isKey(s)) return false;
    const b = bare(s).toLowerCase();
    return !!b && b.split('-').every(p => p && isWordNum(p));
  };

  // ---- pass one: find every run, and which sentence it sits in
  const runs = [];
  const hasDigit = new Set();
  let sentence = 0;
  for(let i = 0; i < parts.length; i++){
    const tok = parts[i];
    if(!tok.trim()) continue;
    const isLeadingA = (tok === 'a' || tok === 'A') && parts[i + 2] && startsRun(parts[i + 2]);

    // A bare scale word does not start a quantity. After one pass "11 million"
    // is a digit and a scale word, and a scan that starts a run on "million"
    // reads it as 1,000,000 and writes "11 1 million". Legitimate runs start on
    // a unit or a tens word ("two hundred"), or on the article ("a million").
    const bareTok = bare(tok).toLowerCase();
    const bareScale = bareTok in SCALE && !isLeadingA;

    if((startsRun(tok) && !bareScale) || isLeadingA){
      const words = [];
      let end = i, dec = null;
      for(let j = i; j < parts.length; j += 2){
        const p = parts[j], b = bare(p).toLowerCase();
        if(b === 'a' && j === i){ end = j; continue; }
        if(startsRun(p)){ words.push(...b.split('-')); end = j; continue; }
        if(b === 'and' && parts[j + 2] && startsRun(parts[j + 2])) continue;
        if(b === 'point' && parts[j + 2] && startsRun(parts[j + 2])){
          const frac = [];
          for(let k = j + 2; k < parts.length; k += 2){
            const q = bare(parts[k]).toLowerCase();
            if(q in UNIT && UNIT[q] <= 9){ frac.push(UNIT[q]); end = k; continue; }
            break;
          }
          if(frac.length) dec = frac.join('');
          break;
        }
        break;
      }
      const value = valueOf(words);
      if(value != null){
        runs.push({ start: i, end, value, dec, sentence });
        // A sentence ending inside the run still ends the sentence.
        if(/[.!?]["')\]]?$/.test(parts[end])) sentence++;
        i = end;
        continue;
      }
    }
    // A YAML key starts new prose. Blocks are restyled whole so a quantity can
    // span a line wrap — but that also joins `objective:` to `briefing:`, and a
    // sentence that runs across the join inherits the other field's numbers.
    // "a collection that may no longer have one" became "have 1" because a
    // digit three fields away voted for its sentence.
    if(isKey(tok)){ sentence++; }

    // A numeral already in the source counts as a vote for digits in its
    // sentence. Without this the pass leaves exactly the mixture it exists to
    // remove — "records from site 12 and three comparison sites", where the 12
    // was authored as a digit and so nothing here ever looked at it.
    if(/\d/.test(tok) && !/^[A-Za-z]+\d*$/.test(tok)) hasDigit.add(sentence);

    // A full stop ends a sentence — but not the one inside 3.9, and not the one
    // after an initial or an abbreviation, which would split a sentence in two
    // and let half of it disagree with the other half.
    if(/[.!?]["')\]]?$/.test(tok) && !/\d\.\d/.test(tok) && !/^[A-Z][a-z]{0,2}\.$/.test(tok)) sentence++;
  }

  // ---- pass two: per sentence, all digits or none
  const digitise = new Set();
  for(const r of runs){
    if(r.dec != null || r.value > 10 || !Number.isInteger(r.value)) digitise.add(r.sentence);
  }
  for(const s of hasDigit) digitise.add(s);

  // ---- pass three: rewrite
  const byStart = new Map(runs.map(r => [r.start, r]));
  const out = [];
  let changed = 0;
  for(let i = 0; i < parts.length; i++){
    const run = byStart.get(i);
    if(!run || !digitise.has(run.sentence)){ out.push(parts[i]); continue; }

    const { value, dec, end } = run;
    const lead = (parts[i].match(/^[^\w-]+/) || [''])[0];
    const tail = (parts[end].match(/[^\w-]+$/) || [''])[0];
    // Big round numbers keep their scale word: 11000000 is not a restyle of
    // "eleven million rides", it is a worse sentence. Nobody counts those zeros.
    const figure = dec != null ? `${value}.${dec}`
      : (value >= 1e9 && value % 1e9 === 0) ? `${value / 1e9} billion`
      : (value >= 1e6 && value % 1e6 === 0) ? `${value / 1e6} million`
      : String(value);

    // Put back the last line break the run swallowed, so a quantity that
    // straddled a wrap does not pull the next line up onto this one.
    let brk = '';
    for(let j = i + 1; j < end; j += 2) if(parts[j]?.includes('\n')) brk = parts[j];

    out.push(lead + figure + tail);
    if(brk) out.push(brk);
    changed++;
    i = end;
    if(brk && parts[i + 1] && !parts[i + 1].includes('\n')) i += 1;
  }

  return { text: out.join(''), changed };
}

// --------------------------------------------------------------------- main

// Only when run directly. `restyle` is imported by the checker that asserts a
// book is already in house style, and a module that runs its CLI on import
// takes that checker's process down with a usage message.
const RUN_DIRECTLY = process.argv[1]
  && fileURLToPath(import.meta.url) === resolve(process.argv[1]);

const args = process.argv.slice(2);
const write = args.includes('--write');
const files = args.filter(a => !a.startsWith('--'));

if(RUN_DIRECTLY && !files.length && !args.includes('--selftest')){
  console.error('usage: node tools/numerals.mjs <book.yml…> [--write]');
  process.exit(2);
}
if(RUN_DIRECTLY && files.length) main();

function main(){

// Lines whose numbers are machinery rather than prose: a tolerance, an expected
// value, an equation template. Restyling those changes what a question grades.
//
// `choices` and `correctChoice` are deliberately NOT here, and that took a
// second pass to get right. Grading compares labels as strings, so the danger
// is rewriting one side and not the other — but the same deterministic function
// applied to both leaves them identical, and skipping them creates a worse
// problem: a stem reading "11 sols" over options reading "eleven sols".
// validateContent asserts correctChoice appears among choices verbatim, so if
// this is ever wrong it fails loudly on the next check rather than shipping.
const SKIP = /^\s*(-\s*)?(expected|value|target|tolerance|units?|e|template|figure|spec):/;

let totalChanged = 0;
for(const file of files){
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');

  // Contiguous runs of prose are restyled together, because a quantity and a
  // sentence both straddle line wraps and neither can be seen one line at a
  // time. Machinery lines break a block and pass through untouched.
  const out = [];
  let block = [];
  let changed = 0;
  const samples = [];

  const flush = () => {
    if(!block.length) return;
    const before = block.join('\n');
    const r = restyle(before);
    if(r.changed){
      changed += r.changed;
      const a = before.split('\n'), b = r.text.split('\n');
      for(let k = 0; k < a.length && samples.length < 6; k++){
        if(a[k] !== b[k]) samples.push([a[k].trim(), (b[k] ?? '').trim()]);
      }
    }
    // Line count must survive, or the file's structure does not.
    const rebuilt = r.text.split('\n');
    if(rebuilt.length !== block.length){
      console.error(`  ! ${file}: a block changed line count (${block.length} -> ${rebuilt.length}); left alone`);
      out.push(...block);
    } else {
      out.push(...rebuilt);
    }
    block = [];
  };

  // A block is one field: the line that opens it plus its continuation lines.
  //
  // It cannot be larger than that. Grading compares an answer against the
  // option labels as strings, and the sentence rule is context-sensitive — so
  // when `answerText` sat in a paragraph containing "0.65" its "two thirds"
  // became "2 thirds" while the identical label three fields away, with no
  // numeral near it, stayed words. Same source string, two outputs, and a
  // question that no longer grades. One field at a time makes the transform
  // deterministic per string: identical in, identical out.
  //
  // It also cannot be smaller. A quantity wraps across lines inside one field,
  // and a line at a time reads "a hundred and" as 100.
  // A list item is its own field too, and that is the case that took longest to
  // see. `choices:` is four options in one block; one of them said "13 weeks",
  // which digitised the whole block, so an option reading "four people" became
  // "4 people" — while the `answer:` field, isolated and with no numeral near
  // it, kept "four". Grading compares those two as strings. Identical source
  // strings must never depend on their neighbours.
  const OPENS_FIELD = /^\s*(-\s+)?[A-Za-z_][\w-]*:|^\s*-\s/;
  for(const line of lines){
    if(SKIP.test(line)){ flush(); out.push(line); continue; }
    if(OPENS_FIELD.test(line)) flush();
    block.push(line);
  }
  flush();

  totalChanged += changed;
  console.log(`${file}: ${changed} quantity(s) restyled`);
  for(const [a, b] of samples){
    console.log(`    - ${a.slice(0, 118)}`);
    console.log(`    + ${b.slice(0, 118)}`);
  }
  if(write && changed) writeFileSync(file, out.join('\n'));
}

if(!write) console.log(`\nnothing written — pass --write. ${totalChanged} change(s) waiting.`);

}

// --------------------------------------------------------------- self-test
//
//   node tools/numerals.mjs --selftest
//
// Every case here is a bug this tool shipped into sixteen books before it was
// caught, and each one was silent: the YAML stayed valid, the prose stayed
// readable, and the meaning changed. They are cheap to assert and they were
// expensive to find.
export const CASES = [
  // A quantity that straddles a line wrap. "a hundred and\n six" is 106, and a
  // line-at-a-time pass turns it into "100 and six" — a wrong number that reads
  // like a right one.
  ['The season is a hundred and\n      six days long.', 'The season is 106\n      days long.'],
  // A YAML key is structure, not prose. This deleted the answer field of a quiz.
  ['        a: Two results share a step', '        a: Two results share a step'],
  // One sentence, one convention.
  ['nine days of rain, and ten of the twelve villages are downstream.',
   '9 days of rain, and 10 of the 12 villages are downstream.'],
  // Nothing over ten: leave the whole sentence in words.
  ['three of the four tanks are full.', 'three of the four tanks are full.'],
  // A numeral already in the source votes for digits in its sentence.
  ['records from site 12 and three comparison sites.', 'records from site 12 and 3 comparison sites.'],
  // Sentences decide independently.
  ['Three tanks are full. But ninety-five sols remain.', 'Three tanks are full. But 95 sols remain.'],
  // Big round numbers keep the scale word.
  ['eleven million rides, no serious injury.', '11 million rides, no serious injury.'],
  // Decimals.
  ['three point nine tonnes', '3.9 tonnes'],
  // A leading article, capitalised at the start of a sentence.
  ['A hundred metres downstream.', '100 metres downstream.'],
  // Ordinals are not quantities.
  ['the first pass and the second sol', 'the first pass and the second sol'],
  // A YAML key starts new prose: the digits in one field must not vote for the
  // sentence in the next. "have one" is a pronoun and stays a word.
  ['    stake: The new race is 200 kilometres away.\n    objective: a collection that may no longer have one.',
   '    stake: The new race is 200 kilometres away.\n    objective: a collection that may no longer have one.'],
];

if(RUN_DIRECTLY && args.includes('--selftest')){
  let bad = 0;
  for(const [input, want] of CASES){
    const got = restyle(input).text;
    if(got !== want){
      bad++;
      console.log(`  ✗ ${JSON.stringify(input)}`);
      console.log(`      want ${JSON.stringify(want)}`);
      console.log(`      got  ${JSON.stringify(got)}`);
    }
  }
  // Running it twice must not change anything the first run produced.
  for(const [input] of CASES){
    const once = restyle(input).text, twice = restyle(once).text;
    if(once !== twice){ bad++; console.log(`  ✗ not idempotent: ${JSON.stringify(once)} -> ${JSON.stringify(twice)}`); }
  }
  console.log(bad ? `\n✗ numerals: ${bad} case(s) failed` : `✓ numerals: ${CASES.length} case(s), and idempotent`);
  process.exit(bad ? 1 : 0);
}
