// bible-copy.mjs — the campaign's opening card, verbatim from its bible.
//
//   node tools/bible-copy.mjs <theme> [--dry]
//   node tools/bible-copy.mjs --all [--dry]
//
// THE CARD IS THE BIBLE'S AND IS NOT REWRITTEN HERE. Every bible carries an
// "Opening sequence" section, most of them headed "exact player copy", and that
// paragraph is what the player reads on the first screen. Seven of the eight
// campaigns had a card written in this repo instead — the same facts, said
// again, shorter — and the two drifted: Changeover's card never mentioned the
// Rate Book or the Board Chair who hands it over, and its ending still named a
// cashier from the shipped edition's cast.
//
// WHAT IS TOUCHED AND WHAT IS NOT. Only the words. The paragraph is taken as
// written, with two mechanical repairs and no third: a leading blockquote `> `
// is a markdown marker rather than something the player should read, and a
// paragraph hard-wrapped across lines in the source is one paragraph on screen.
// Nothing is shortened, resequenced or simplified.
//
// THE READING BAR WILL REPORT THESE, and that is expected rather than a bug to
// route around. `engine/dev/plainCards.mjs` measures the opening card against
// grade 6.5 and ratchets; the bibles are written between grade 7 and grade 10.
// The cards these replace were written down to that bar in this repo, which is
// exactly the rewriting this tool exists to stop. Record the new numbers in
// `engine/dev/plaincards-debt.json` if they are to stand.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

/**
 * The opening card, out of a bible.
 *
 * The first paragraph after the heading that is neither a `**Label:**` line —
 * the delivery note and the quality check are instructions to whoever builds
 * the card, not the card — nor a table, nor a rule.
 */
/**
 * The ending card, out of a bible.
 *
 * Written as `**Happy ending card - exact player copy:** …` inside every
 * mission's metric screen. It used to be the SAME sentence at all fifteen — the
 * campaign's ending, repeated — and this refused when they disagreed, because a
 * campaign with two endings has to say which.
 *
 * THE BIBLES NOW WRITE FIFTEEN DIFFERENT ONES, one per mission ("§11 Mission
 * endings"), and the fifteenth is the campaign's: every one of the eight ends
 * *"Exceptional work. You brought the campaign to a decisive conclusion: …"*
 * where the earlier fourteen name that mission's own decision. So the last one
 * is the ending and the refusal would now fire on every bible in the set.
 *
 * Refusing was also not free. This tool rewrites cards.js whole, so a refusal
 * dropped `export const ENDING` while every manifest still imported it —
 * "does not provide an export named 'ENDING'", all eight games, on the first
 * import. That is what `kept` in `emit` is for.
 */
export function readEnding(text){
  const said = [...text.matchAll(/\*\*[A-Za-z ]*ending card[^:]*:\*\*\s*([^\n*]+)/g)]
    .map(m => m[1].replace(/\s+/g, ' ').trim()).filter(Boolean);
  if(!said.length) return { said: '', owes: ['no "ending card - exact player copy" line'] };
  // The last mission's, which is the one that closes the campaign. Identical
  // fifteen still give the same answer they always did.
  return { said: said[said.length - 1], owes: [] };
}

export function readOpening(text){
  // TWO NAMES FOR ONE CARD. Eight bibles head it `### Opening sequence`;
  // Whiteout heads it `## Opening card — exact player copy`, which is the same
  // section and is what `bibleRead.mjs` already accepts. Read as one name only,
  // the campaign that has an opening card came through with none.
  const at = /^#{1,4} (?:[A-Z]+\d*\.\s*)?Opening (?:sequence|card)[^\n]*$/m.exec(text);
  if(!at) return { said: '', owes: ['no "Opening sequence" or "Opening card" heading — nothing to take'] };
  const after = text.slice(at.index + at[0].length);
  for(const raw of after.split(/\n\s*\n/)){
    const p = raw.trim();
    if(!p || p.startsWith('**') || p.startsWith('#') || p.startsWith('|') || p === '---') continue;
    const said = p.replace(/^>\s?/gm, '').replace(/\s+/g, ' ').trim();
    if(said.split(/\s+/).length < 25){
      return { said: '', owes: [`the first paragraph under the heading is ${said.split(/\s+/).length}`
        + ` word(s) — "${said.slice(0, 60)}" — which is a note rather than the card`] };
    }
    return { said, owes: [] };
  }
  return { said: '', owes: ['the "Opening sequence" heading is followed by no prose'] };
}

const j = (v) => JSON.stringify(v);

function wrap(said){
  // Wrapped for reading, joined back to one paragraph. The card is one string.
  const words = said.split(' ');
  const lines = [];
  let line = '';
  for(const w of words){
    if((line + ' ' + w).length > 88){ lines.push(line); line = w; }
    else line = line ? `${line} ${w}` : w;
  }
  if(line) lines.push(line);
  return lines.map((l, i) => `  ${j(i === lines.length - 1 ? l : `${l} `)}`).join('\n    + ');
}

/**
 * The file, with the ending it is given.
 *
 * `kept` is the ENDING block already in cards.js, carried forward verbatim when
 * the bible writes no ending card. WITHOUT IT THIS TOOL BREAKS THE GAME: the
 * manifest imports `{ OPENING, ENDING }`, and a rewrite that drops the export
 * is "does not provide an export named 'ENDING'" on the first import — which is
 * every one of the eight, the moment the bibles stopped carrying an ending
 * card. The comment two lines below claimed the campaign "keeps the one it
 * has"; it kept the import and deleted what the import was for.
 */
function emit(theme, said, ending, kept){
  const body = wrap(said);
  return `// cards.js — ${theme}'s opening card${ending || kept ? ' and its ending card' : ''}.\n//\n`
    + `// GENERATED by tools/bible-copy.mjs from the campaign bible named in\n`
    + `// books/parts/bibles.json, VERBATIM. This is the bible's own "Opening sequence"\n`
    + `// paragraph and not a retelling of it: edit the bible and run the tool again.\n`
    + `//\n`
    + `// It is above the grade-6.5 card bar, and deliberately. The card that used to be\n`
    + `// here was written down to that bar in this repo, which put the game and the\n`
    + `// bible in disagreement about what the player is told on the first screen.\n`
    + `export const OPENING = [\n${body},\n];\n`
    + (ending ? `\nexport const ENDING = [\n${wrap(ending)},\n];\n`
              : (kept ? `\n// The bible writes no ending card, so this is the one the campaign already\n`
                      + `// had, carried forward unchanged.\n${kept}\n` : ''));
}

const args = process.argv.slice(2);
const RUN = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const dry = args.includes('--dry');
const themes = args.includes('--all')
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(RUN && !themes.length){
  console.error('usage: node tools/bible-copy.mjs <theme>|--all [--dry]');
  process.exit(2);
}

let bad = 0;
for(const theme of (RUN ? themes : [])){
  const path = BIBLES[theme];
  if(!path){ console.error(`${theme}: not in books/parts/bibles.json`); bad++; continue; }
  const text = readFileSync(resolve(gamekit, path), 'utf8');
  const { said, owes } = readOpening(text);
  if(owes.length){ for(const o of owes) console.error(`${theme}: ${o}`); bad++; continue; }
  const fin = readEnding(text);
  for(const o of fin.owes) console.error(`${theme}: ${o}`);

  const tf = resolve(gamekit, `themes/${theme}/theme.js`);
  if(!existsSync(tf)){ console.error(`${theme}: no themes/${theme}/theme.js`); bad++; continue; }
  let src = readFileSync(tf, 'utf8');

  // The manifest's own `opening: [ … ],` block, replaced by the import. Matched
  // on the indent so a nested `opening:` inside another block cannot be taken
  // for it — there is none today, and that is not a thing to rely on.
  const start = src.search(/^  opening: \[/m);
  const wired = /^  opening: OPENING,$/m.test(src);
  if(start < 0 && !wired){ console.error(`${theme}: theme.js has no \`opening: [\` at the manifest's own indent`); bad++; continue; }
  const end = start >= 0 ? src.indexOf('\n  ],', start) : -1;
  if(start >= 0 && end < 0){ console.error(`${theme}: could not find the end of its \`opening\` block`); bad++; continue; }
  const before = start >= 0 ? src.slice(0, start) : src;
  const after = start >= 0 ? src.slice(end + '\n  ],'.length) : '';
  const replaced = '  // The bible\'s own opening sequence, verbatim — see themes/'
    + `${theme}/cards.js.\n  opening: OPENING,`;

  // ALREADY WIRED IS THE NORMAL CASE after the first run: the manifest says
  // `opening: OPENING,` and there is no array left to replace. Only `cards.js`
  // is rewritten then, which is the whole point — the words live there.
  if(wired){ /* nothing to splice */ }
  else if(!/from '\.\/cards\.js'/.test(src)){
    const imports = [...before.matchAll(/^import .*?from '\.\/[^']+';$/gm)];
    if(!imports.length){ console.error(`${theme}: no local import to place the cards import after`); bad++; continue; }
    const at = imports[imports.length - 1].index + imports[imports.length - 1][0].length;
    src = before.slice(0, at) + "\nimport { OPENING } from './cards.js';" + before.slice(at) + replaced + after;
  } else {
    src = before + replaced + after;
  }

  // The ending, the same way. Left alone where the bible has none: a campaign
  // whose bible writes no ending card keeps the one it has rather than losing
  // its last screen.
  if(fin.said){
    const es = src.search(/^  ending: \[/m);
    const ee = es >= 0 ? src.indexOf('\n  ],', es) : -1;
    // ALREADY WIRED, exactly as above. The opening half has said so since it was
    // written and this half did not, so every run after the first printed "no
    // `ending: [` to replace" about eight manifests that were all correct — a
    // false failure on the tool that is run most often in this pipeline.
    const finWired = /^  ending: ENDING,$/m.test(src);
    if(finWired){ /* nothing to splice */ }
    else if(ee >= 0){
      src = src.slice(0, es)
        + '  // The bible\'s own ending card, verbatim — see cards.js.\n  ending: ENDING,'
        + src.slice(ee + '\n  ],'.length);
      src = src.replace(/import \{ OPENING \} from '\.\/cards\.js';/, "import { OPENING, ENDING } from './cards.js';");
    } else console.error(`${theme}: theme.js has no \`ending: [\` to replace`);
  }

  const words = said.split(/\s+/).length;
  console.log(`${theme.padEnd(22)} opening ${words} word(s)`
    + (fin.said ? ` · ending ${fin.said.split(/\s+/).length} word(s)` : ' · no ending in the bible'));
  if(!dry){
    const cf = resolve(gamekit, `themes/${theme}/cards.js`);
    // What is there now, so an ending the bible no longer writes survives.
    const had = existsSync(cf) ? readFileSync(cf, 'utf8') : '';
    const kept = fin.said ? '' : (had.match(/export const ENDING = \[[\s\S]*?\n\];/)?.[0] ?? '');
    writeFileSync(cf, emit(theme, said, fin.said, kept));
    writeFileSync(tf, src);
  }
}
process.exitCode = bad ? 1 : 0;
