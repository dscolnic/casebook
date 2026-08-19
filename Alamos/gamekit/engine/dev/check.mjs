// check.mjs — run every check against every game.
//
//   node engine/dev/check.mjs            all registered themes
//   node engine/dev/check.mjs hospital   one of them
//
// validateContent asks whether the content agrees with itself and with the
// theme contract. smokeCampaign asks whether the engine can actually reach and
// grade every stop. They catch different things, which is why both run, and why
// this exists rather than a line in a README nobody runs.
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { themeNames } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const wanted = process.argv[2] ? [process.argv[2]] : themeNames();
if(!wanted.length){
  console.error('no themes registered in themes.json, and none named on the command line');
  process.exit(2);
}

let failed = 0;
for(const theme of wanted){
  for(const tool of ['validateContent.mjs', 'smokeCampaign.mjs', 'probeQuestions.mjs', 'personStops.mjs',
                     'checkStory.mjs', 'checkNames.mjs', 'checkJargon.mjs', 'jargonDepth.mjs', 'answerShape.mjs', 'checkVoice.mjs', 'placeStory.mjs',
                     'checkPassages.mjs', 'equationOrder.mjs', 'bookParity.mjs', 'placement.mjs', 'reachable.mjs',
                     // equationOrder's rule, one field over: no concept is claimed
                     // before the concepts it is built out of. Silent for a course
                     // whose concepts carry no `needs`. A prerequisite may be met on
                     // an earlier day or declared in `takesAsRead`, and never on the
                     // same day — the engine opens a day's stops in any order.
                     'conceptOrder.mjs',
                     'formatMix.mjs',
                     // The seven world-graded runs: scheduled by the engine, and each one
                     // given a reason by the campaign that takes it.
                     'warmupOrder.mjs',
                     // Silent for a theme that is not an edition of another one.
                     'editionParity.mjs',
                     // Silent above grade 8; advisory for a game written to its
                     // own audience rather than derived from a harder one.
                     'questionLoad.mjs',
                     // Silent for a theme with no plan-against instrument in it.
                     // FLY graded four numbers it printed none of until after
                     // the single run it allowed.
                     'instrumentGoals.mjs',
                     // Advisory for now: it reports the sentences the book wrote
                     // that the panel never prints, and neither of its two
                     // findings is clean yet. See the note at the foot of the file.
                     'fieldCoverage.mjs',
                     // Does the campaign teach its syllabus, or only mention it?
                     // Gated against engine/dev/curriculum-debt.json, so the 97
                     // gaps that exist today are recorded and nothing new drifts
                     // in. NOT a format-variety gate — the header says why that
                     // measurement does not survive contact with the numbers.
                     'curriculumDelivery.mjs']){
    const res = spawnSync(process.execPath, [resolve(here, tool), theme, ...(tool === 'jargonDepth.mjs' ? ['--check'] : [])],
      { stdio: 'inherit', cwd: resolve(here, '../..') });
    if(res.status !== 0) failed++;
  }
}
// One cross-cutting check, not per theme: no game stylesheet re-declares the
// engine's.
if(!process.argv[2]){
  for(const tool of ['checkStyles.mjs', 'worldParity.mjs', 'readabilityParity.mjs',
                     // Two measurements that assert something about themselves,
                     // because the reading grade did not and nine editions
                     // shipped too hard with every number green.
                     'questionLoad.mjs --selftest',
                     // The third. It reads the renderers rather than the
                     // content, so a renamed panel function would make it report
                     // all-clear rather than error, and it says so out loud.
                     'fieldCoverage.mjs --selftest',
                     // And the fourth, for the same reason: it reads panels, so
                     // it has to prove it can tell one that states its criterion
                     // from one that does not.
                     'instrumentGoals.mjs --selftest',
                     // And the fifth. It has to show that it can tell a stop
                     // that computes an equation from one that talks about it,
                     // and that its conversion invariant fires on a lost
                     // objective and stays quiet on a changed format.
                     'curriculumDelivery.mjs --selftest',
                     // And the seventh. Its whole rule is an ordering, so it has to
                     // show it can tell a prerequisite met a day earlier from one met
                     // the same day, and that a declared exception is counted rather
                     // than waved through.
                     'conceptOrder.mjs --selftest',
                     'formatMix.mjs --selftest',
                     'warmupOrder.mjs --selftest',
                     // And the sixth, which is about a board rather than a word:
                     // CASEBOOK drew its explanations in a fixed order where
                     // PROTOCOL deals its own, so a retry met the identical board.
                     // Nothing else here can see an ordering — it is not a field,
                     // a grade or a word.
                     'matchDeal.mjs --selftest',
                     'matchDeal.mjs',
                     // And the eighth, which is about a place rather than a board.
                     // `npm run drive` plays the five world-graded formats through a
                     // stub world that hands back whatever the play asked for, so it
                     // cannot see whether walking up to somebody counts as a greeting
                     // or whether EVADE's clock stops while you are caught.
                     'worldFormats.mjs --selftest']){
    const [file, ...flags] = tool.split(' ');
    const res = spawnSync(process.execPath, [resolve(here, file), ...flags],
      { stdio: 'inherit', cwd: resolve(here, '../..') });
    if(res.status !== 0) failed++;
  }
}

console.log(failed ? `\n${failed} check(s) failed.` : `\nAll checks passed for ${wanted.length} theme(s).`);
process.exit(failed ? 1 : 0);
