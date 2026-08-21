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
                     'checkPassages.mjs',
                     // The half before checkPassages: whether there is a passage at
                     // all. Three campaigns shipped with six of twelve people written
                     // as one abstract sentence naming their syllabus topic, and every
                     // other gate passed — the authored question was fine, a short
                     // sentence reads easily, and the person exists.
                     'passageDepth.mjs',
                     'equationOrder.mjs', 'bookParity.mjs', 'placement.mjs', 'reachable.mjs',
                     // equationOrder's rule, one field over: no concept is claimed
                     // before the concepts it is built out of. Silent for a course
                     // whose concepts carry no `needs`. A prerequisite may be met on
                     // an earlier day or declared in `takesAsRead`, and never on the
                     // same day — the engine opens a day's stops in any order.
                     'conceptOrder.mjs',
                     // Does the player have the equation the card's own arithmetic
                     // uses? Blackout's day 1 worked "current falls by 20×, loss by
                     // 400×" over four options with P = IV printed nowhere and
                     // computed three days later, and every other check was green.
                     'equationSupply.mjs',
                     'formatMix.mjs',
                     // How many calls a day makes, and whether any of them is a
                     // card the player has already answered. Every other checker
                     // that reads a campaign in order dedupes on `group:lesson`
                     // — rightly, for its own question — which is what made 295
                     // byte-identical callbacks invisible to all of them.
                     'dayCalls.mjs',
                     // What a day closes on. The card is composed by the engine
                     // from the day's own results, so no content gate reads a
                     // word of it — and a compliment on a day where nothing
                     // held is worse than no compliment at all.
                     'dayDebrief.mjs',
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
                     // And the ninth, whose whole rule is what counts as having
                     // been given an equation: an earlier day that computes it,
                     // this stop's own working, or the card printing it — and a
                     // `takesAsRead` declaration deliberately not.
                     'equationSupply.mjs --selftest',
                     'formatMix.mjs --selftest',
                     'warmupOrder.mjs --selftest',
                     // And the ninth. Two ways it can lie: keying a serving on the
                     // *base* title reads a review variant as a duplicate of its
                     // own parent and bans the callback outright, and reporting
                     // only three-or-more servings passes every ordinary duplicate.
                     'dayCalls.mjs --selftest',
                     // And the tenth. Its two silent inversions: a byline read as
                     // the front of the next sentence failed all thirteen junior
                     // editions on nine-word prose, and a junior line quoting a
                     // question title passes every content gate because the title
                     // is correct where it was authored.
                     'dayDebrief.mjs --selftest',
                     // And the eleventh, whose silent inversion is an abbreviation: every
                     // unprotected `Dr.` turns a one-sentence stub into a two-sentence
                     // passage, and all eighteen bios it was written for name a doctor.
                     'passageDepth.mjs --selftest',
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
