// bible-prose.mjs — refresh a fragment's player-facing lines from its bible.
//
//   node tools/bible-prose.mjs <theme> [--dry]
//   node tools/bible-prose.mjs --all [--dry]
//
// WHY THIS EXISTS RATHER THAN A RE-EXTRACT. A fragment is written once by
// `v10extract.mjs` and then built on: `bible-build.mjs` writes the boards,
// `bible-concepts.mjs` the syllabus numbers, `fix-speakers.mjs` the beat
// speakers. Re-extracting to pick up a rewritten sentence would throw all three
// away and they are not cheap. So the two lines the bible marks EXACT PLAYER
// COPY — the story setup and the prompt — are refreshed in place, and nothing
// else is touched.
//
// WHAT IT CAUGHT. Headwater's sweep stop asked the player to find the time of
// maximum slope and printed `S(t)=18+12 arctan(t-4)` in its own scene, so the
// answer, 4, was on the card. A later round rewrote that scene to name the
// forecast without its formula — and the fragment kept the old sentence,
// because nothing had ever copied a corrected sentence forward. Seven other
// scenes across four campaigns had drifted the same way without failing a gate.
//
// ONLY WHERE THE BIBLE HAS ONE, and only these two fields. `answerText` and
// `why` are rewritten by the converters and read from the board; `title` is what
// this pass matches on. A stop the bible no longer carries is left exactly as it
// is and reported, because a fragment losing a stop is a much larger event than
// a sentence changing.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { readBible } from './bibleRead.mjs';

const gamekit = resolve(dirname(new URL(import.meta.url).pathname), '..');
const BIBLES = JSON.parse(readFileSync(resolve(gamekit, 'books/parts/bibles.json'), 'utf8'));

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const themes = args.includes('--all')
  ? Object.keys(BIBLES).filter(k => !k.startsWith('_'))
  : args.filter(a => !a.startsWith('--'));
if(!themes.length){
  console.error('usage: node tools/bible-prose.mjs <theme>|--all [--dry]');
  process.exit(2);
}

const STOP = /^\s*#\s*---\s*Stop\s+(\d+):/;
const q = (s) => JSON.stringify(String(s ?? ''));

/** Where a key's block ends: its own line plus every line indented deeper. */
function blockEnd(lines, at, indent){
  let j = at + 1;
  while(j < lines.length && (!lines[j].trim() || lines[j].length - lines[j].trimStart().length > indent)) j++;
  while(j > at + 1 && !lines[j - 1].trim()) j--;
  return j;
}

let changed = 0, missing = 0, seen = 0;
for(const theme of themes){
  const biblePath = BIBLES[theme];
  if(!biblePath){ console.error(`${theme}: not in books/parts/bibles.json`); process.exitCode = 2; continue; }
  const bible = readBible(resolve(gamekit, biblePath));
  const dir = resolve(gamekit, 'books/parts', theme);
  if(!existsSync(dir)){ console.error(`${theme}: no fragments at books/parts/${theme}`); process.exitCode = 2; continue; }

  let here = 0;
  const parts = readdirSync(dir).filter(f => /^m\d+\.ya?ml$/i.test(f))
    .sort((a, b) => (+a.match(/\d+/)[0]) - (+b.match(/\d+/)[0]));
  for(const part of parts){
    const mission = +part.match(/\d+/)[0];
    const bm = bible.missions.find(m => m.n === mission);
    if(!bm) continue;
    const file = resolve(dir, part);
    const lines = readFileSync(file, 'utf8').split('\n');
    /**
     * THE MISSION'S OWN CARD, before its stops.
     *
     * `v10extract.mjs` is the only thing that has ever written these, so a
     * briefing card rewritten in the bible reached nothing — the same staleness
     * that left `reason` showing a sentence from the first extraction on all 480
     * stops. They are player-facing: the plan card prints the header, the title,
     * the stake and the objective, the debrief prints the takeaway, and the card
     * that closes a day prints the segue.
     *
     * `card:` is a nested block, so its keys are matched at four spaces and the
     * mission's own at two. Nothing else in the head is touched.
     */
    const mtake = (bm.review ?? []).find(r => /^\*\*Mission takeaway/i.test(r))
      ?? (bm.review ?? [])[(bm.review ?? []).length - 1];
    const head = [
      ['  ', 'title', bm.title],
      ['    ', 'header', bm.card?.header],
      ['    ', 'title', bm.card?.title],
      ['    ', 'goNow', bm.card?.goNow],
      ['    ', 'body', bm.card?.body],
      ['    ', 'objective', bm.card?.objective],
      ['  ', 'objective', bm.card?.objective],
      ['  ', 'stake', bm.card?.body],
      ['  ', 'takeaway', mtake && String(mtake).replace(/^\*\*Mission takeaway:?\*\*\s*/i, '')],
      ['  ', 'segue', bm.outcome],
    ];
    const stopAt = lines.findIndex(l => STOP.test(l));
    for(const [pad, key, said] of head){
      if(!String(said ?? '').trim()) continue;
      const at = lines.findIndex((l, i) => (stopAt < 0 || i < stopAt) && l.startsWith(`${pad}${key}:`));
      if(at < 0) continue;
      const end = blockEnd(lines, at, pad.length);
      const line = `${pad}${key}: ${q(said)}`;
      if(end - at === 1 && lines[at] === line) continue;
      lines.splice(at, end - at, line);
      changed++; here++;
    }

    const heads = lines.map((l, i) => [l, i]).filter(([l]) => STOP.test(l))
      .map(([l, i]) => [+l.match(STOP)[1], i]);
    // Back to front, so an edit never moves a stop this loop has not reached.
    for(let k = heads.length - 1; k >= 0; k--){
      const [n, from] = heads[k];
      const to = k + 1 < heads.length ? heads[k + 1][1] : lines.length;
      const bs = bm.stops.find(s => s.n === n);
      seen++;
      if(!bs){ missing++; console.error(`${theme} M${mission} S${n}: no such stop in the bible`); continue; }
      const body = lines.slice(from, to);
      const dashAt = body.findIndex(l => /^\s*-\s+\S/.test(l));
      if(dashAt < 0) continue;
      const indent = body[dashAt].indexOf('-') + 2;
      const pad = ' '.repeat(indent);
      /**
       * `reason` TOO, and it had never been refreshed at all.
       *
       * It is written once by `v10extract.mjs` and then left, so every one of the
       * 480 stops in the set was still showing its FIRST-ROUND reason while the
       * bible's `**Stop reason - exact player copy:**` had been rewritten
       * underneath it. Ground Truth M1 S2 read "Ortiz needs the field from two
       * charged layers, not either layer alone" — a sentence that appears nowhere
       * in the bible any more — where the bible now says "The normalized channels
       * establish that downward is negative, but the model contains an upper
       * positive layer and a lower negative layer."
       *
       * It is player-facing: `questionUI.js` prints it under the question setup,
       * joined to the story-science connection. This pass exists for exactly that
       * — the lines the bible marks EXACT PLAYER COPY — and it was missing one.
       */
      /**
       * EVERY PLAYER-FACING LINE ON THE STOP, not two of them.
       *
       * `v10extract.mjs` writes the fragment once and this pass refreshes it, so
       * any field this list does not name keeps its FIRST-ROUND text for ever
       * while the bible is rewritten underneath it. Measured across the eight:
       * `motivation` was stale on 480 stops of 480, `answerText` on 43, `why` on
       * 4, `title` on 2. The one that was reported was `reason` — Ground Truth's
       * "Ortiz needs the field from two charged layers", a sentence that had not
       * been in the bible for rounds.
       *
       * The rule for this list is now simple: if a player reads it and the bible
       * marks it exact player copy, it is refreshed here. Everything else on a
       * stop — the board, the beats, the concept number — belongs to a tool of
       * its own and is not touched.
       */
      for(const [key, said] of [['title', bs.title], ['reason', bs.reason],
                                ['scene', bs.setup], ['motivation', bs.connect],
                                ['question', bs.prompt], ['answerText', bs.answerText],
                                ['why', bs.why]]){
        if(!String(said ?? '').trim()) continue;
        const at = body.findIndex(l => l.startsWith(`${pad}${key}:`));
        if(at < 0) continue;
        const end = blockEnd(body, at, indent);
        const line = `${pad}${key}: ${q(said)}`;
        if(end - at === 1 && body[at] === line) continue;
        body.splice(at, end - at, line);
        changed++; here++;
      }

      /**
       * THE STOP'S OWN CHART, which is player-facing and belongs to this pass.
       *
       * The bibles began authoring `**Figure - exact player copy:**` on stops as
       * well as on the Go deeper questions, and only the review half was being
       * read — so The Trial's "counts of improved and not-improved patients" had
       * a bar chart written out in the bible and nothing on the card.
       *
       * Written as one JSON flow value, the same way `bible-deeper` writes a
       * review question's, and ADDED where the fragment has no `figure:` yet:
       * every other key this tool touches already exists, and this one is new.
       * A stop the bible draws nothing for is left alone rather than having its
       * figure removed — a chart may also have been authored in the book by hand.
       */
      if(bs.figure){
        const flow = `${pad}figure: ${JSON.stringify(bs.figure)}`;
        const at = body.findIndex(l => l.startsWith(`${pad}figure:`));
        if(at >= 0){
          const end = blockEnd(body, at, indent);
          if(!(end - at === 1 && body[at] === flow)){
            body.splice(at, end - at, flow);
            changed++; here++;
          }
        } else {
          // After `question:`, which every stop has, so the chart sits beside the
          // thing it illustrates rather than at the end of the block.
          const qAt = body.findIndex(l => l.startsWith(`${pad}question:`));
          const put = qAt >= 0 ? blockEnd(body, qAt, indent) : body.length;
          body.splice(put, 0, flow);
          changed++; here++;
        }
      }
      lines.splice(from, to - from, ...body);
    }
    if(!dry) writeFileSync(file, lines.join('\n'));
  }
  console.log(`${theme.padEnd(22)} ${here} line(s) refreshed from the bible`);
}
console.log(`\n${changed} line(s) across ${seen} stop(s)`
  + (missing ? ` · ${missing} stop(s) the bible no longer carries` : '')
  + (dry ? ' — nothing written' : ''));
