// matchDeal.mjs — the two matching formats deal their right column.
//
//   node engine/dev/matchDeal.mjs             assert it, on the shipped source
//   node engine/dev/matchDeal.mjs --selftest  and the assertion can fail
//
// WHY THIS EXISTS
//
// CASEBOOK renders four clues on the left and four explanations on the right and
// asks the player to join them. For as long as the format has existed it built
// the right column straight from `ch.choices`:
//
//     activeProtocol = { order: (ch.choices||[]).map((_,j)=>j), ... }
//     right: ch.choices || []
//
// while PROTOCOL, which is the same board with different nouns, dealt its right
// column from a seed all along.
//
// THE FIRST VERSION OF THIS HEADER OVERSTATED IT, and the correction is the more
// useful half. It said every one of the 44 authored CASEBOOKs keys 1→A, 2→B,
// 3→C, 4→D — true — and concluded the format was answerable by joining row to
// row without reading either column — false. `normalize.js` `deidentifyMapping`
// re-lays a matching question's options at load whenever the mapping is exactly
// the identity, and it has done since the seven-game sweep that found the same
// tell in the ordering formats. The 44-of-44 census was taken on the content as
// the books write it, which is not the content anybody plays: after
// normalisation, none of the 18 stops that actually render as CASEBOOK has an
// identity mapping. The defect was measured one stage upstream of the player.
//
// What is left is real and small. An undealt column is fixed per stop, so a
// player who answers wrong and retries meets the identical board, where PROTOCOL
// re-deals on a seed carrying the retry flag. And two formats sharing one board
// while behaving differently is how the next difference between them goes
// unnoticed for as long as this one did.
//
// The protections are at two stages and neither replaces the other: normalize
// fixes the CONTENT so the key is not the printed order, and the deal fixes the
// PRESENTATION so the printed order is not fixed at all. This file asserts the
// second. `deidentifyMapping` asserts nothing about itself, which is worth an
// hour some time.
//
// WHAT IS ASSERTED
//
// That each format's right column is built from a seeded deal rather than from
// the authored array, and that the seed reaches the renderer. Both are read out
// of questionUI.js's own source, which is what `fieldCoverage.briefPrefersScene`
// does and for the same reason: the thing that was wrong is the shape of an
// expression, and a set of names cannot see a shape.
//
// The selftest puts the bug back — the exact expression the file used to
// carry — and requires this to fail on it. A check for a defect that has already
// been fixed is worth precisely what its ability to fail is worth.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const here = dirname(new URL(import.meta.url).pathname);
const SELFTEST = process.argv.includes('--selftest');

/** The body of `function NAME(...)`, brace-matched. */
function carve(src, name){
  const at = src.indexOf(`function ${name}(`);
  if(at < 0) return null;
  const open = src.indexOf('{', at);
  if(open < 0) return null;
  let depth = 0;
  for(let i = open; i < src.length; i++){
    const c = src[i];
    if(c === '{') depth++;
    else if(c === '}' && --depth === 0) return src.slice(open, i + 1);
  }
  return null;
}

/**
 * One format's board, as three claims about the source.
 *
 *  dealt   — the display order comes from shuffleSeeded, not from an identity map
 *  mapped  — the right column is drawn through that order, not from ch.choices
 *  seeded  — the dispatcher hands the panel the seed it needs to deal with
 *
 * All three are needed and none implies another: a shuffle computed and then not
 * used draws the authored order anyway, and a deal on a constant seed is the same
 * board every time, which a player meets twice on a retry.
 */
function audit(src, { panel, board, seedFrom }){
  const p = carve(src, panel), b = carve(src, board);
  const problems = [];
  if(!p) problems.push(`${panel} not found — the carver or the renderer has moved`);
  if(!b) problems.push(`${board} not found — the carver or the renderer has moved`);
  if(p && !/order:\s*shuffleSeeded\(/.test(p)){
    problems.push(`${panel} does not deal its right column: no \`order: shuffleSeeded(\``);
  }
  // No separate "is it the identity map" test. The first version had one, and its
  // character class swallowed `shuffleSeeded((ch.choices||[]).map(...)` — so the
  // fixed source failed its own check while the broken source failed it too, for
  // the same reason, and both looked like the check working. A test that fires on
  // the right answer and the wrong answer alike is measuring nothing. Absence of
  // the deal is the whole claim, and the assertion above is all of it.
  if(b && !/right:\s*display\.map\(/.test(b)){
    problems.push(`${board} draws \`right\` from something other than \`display.map(...)\``);
  }
  // The seed has to arrive from the dispatcher; a panel that deals on a default
  // 0 deals the same hand to every stop in the game.
  const call = new RegExp(`${panel}\\(ch,\\s*seed\\)`);
  if(seedFrom && !call.test(src)){
    problems.push(`${panel} is not called with the stop's seed`);
  }
  return problems;
}

const BOARDS = [
  { panel: 'protocolHTML', board: 'protocolBoardHTML', seedFrom: false },
  { panel: 'casebookHTML', board: 'casebookBoardHTML', seedFrom: true },
];

// PROTOCOL deals in the dispatcher rather than in its own panel, so its `order`
// is assigned before protocolHTML runs and the carve of the panel cannot see it.
// The claim is the same; where it is written is not.
function auditProtocol(src){
  const problems = [];
  if(!/activeProtocol\s*=\s*\{\s*order:\s*shuffleSeeded\(ch\.choices/.test(src)){
    problems.push('the PROTOCOL branch of challengeBodyHTML does not deal ch.choices');
  }
  const b = carve(src, 'protocolBoardHTML');
  if(!b) problems.push('protocolBoardHTML not found');
  else if(!/right:\s*display\.map\(/.test(b)){
    problems.push('protocolBoardHTML draws `right` from something other than `display.map(...)`');
  }
  return problems;
}

function run(src){
  return [...auditProtocol(src), ...audit(src, BOARDS[1])];
}

const path = resolve(here, '../core/questionUI.js');
const src = readFileSync(path, 'utf8');

if(SELFTEST){
  // The file as it stood before the fix, in the two places that mattered.
  const broken = src
    .replace(/order:\s*shuffleSeeded\(\(ch\.choices\|\|\[\]\)\.map\(\(_,\s*j\)\s*=>\s*j\),\s*seed\)/,
      'order:(ch.choices||[]).map((_,j)=>j)')
    .replace(/right:\s*display\.map\(real=>\(ch\.choices\|\|\[\]\)\[real\]\)/,
      'right: ch.choices||[]');
  if(broken === src){
    console.error('✗ selftest could not reconstruct the old code — the expressions it patches have moved.');
    console.error('  Fix the patterns above before trusting this file: a selftest that cannot break the');
    console.error('  subject silently stops testing it.');
    process.exit(1);
  }
  const found = run(broken);
  if(!found.length){
    console.error('✗ selftest: the pre-fix source passes. This check asserts nothing.');
    process.exit(1);
  }
  const clean = run(src);
  if(clean.length){
    console.error('✗ selftest: the shipped source fails its own check:');
    clean.forEach(p => console.error('    ' + p));
    process.exit(1);
  }
  console.log(`✓ matchDeal selftest: the shipped source passes, and the pre-fix source fails on ${found.length} count(s)`);
  found.forEach(p => console.log('    · ' + p));
  process.exit(0);
}

const problems = run(src);
if(problems.length){
  console.error('✗ a matching board draws its right column in the order the book wrote it,');
  console.error('  which makes every board with an identity mapping answerable by row:');
  problems.forEach(p => console.error('    · ' + p));
  process.exit(1);
}
console.log('✓ both matching formats deal their right column from a seeded shuffle');
