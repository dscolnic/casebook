// smokeCampaign.mjs — play the whole campaign without a browser.
//
//   node engine/dev/smokeCampaign.mjs <theme>
//
// validateContent.mjs checks that the content agrees with itself. This checks
// something different and, it turns out, more valuable: that the *engine* can
// actually reach every stop of every mission with this content in it.
//
// It exists because the first real playthrough of a new theme hit a bug no
// content check could have found. missionStopIndex() returned the first stop
// whose group matched, which is correct only when a mission's stops are spread
// across areas. This book keeps all three stops of a mission in one area, so
// stops 2 and 3 resolved back to stop 1 and reported "mission locked" — two
// thirds of the campaign unreachable, with every content file valid.
//
// Nothing here touches three.js or the DOM, so it runs in CI.
import { register } from 'node:module';
import { resolve, dirname } from 'node:path';
import { themeDir as resolveTheme } from './registry.mjs';
import { pathToFileURL } from 'node:url';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '../..');
const themeName = process.argv[2] || 'contamcity';
// A bare name means themes/<name>; anything with a slash is the path to a theme
// directory, which is how the two games that still live in their own package
// directories get played through this harness at all.
const themeDir = resolveTheme(themeName);

// engine/core imports its content through the `@theme` alias, which Vite
// supplies in the browser. Node gets the same alias from a resolve hook, so the
// modules under test are the real ones rather than a headless copy of them.
register('./themeResolver.mjs', pathToFileURL(here + '/'), {
  data: { themeDir },
});

const problems = [];
const fail = (m) => problems.push(m);

/**
 * A diagnosis is playable when the panel can be read at a glance — a figure, or
 * readings spanning three or more zones — and when every answer it names is on
 * the candidate list. `correctChoices` is the L4 form, where no single cause
 * fits and the answer is a pair.
 */
function diagnosisAnswerable(ch){
  const labels = (ch.choices || []).map(c => (typeof c === 'string' ? c : c.label));
  const want = Array.isArray(ch.correctChoices) ? ch.correctChoices
    : (ch.correctChoice ? [ch.correctChoice] : []);
  const zones = new Set((ch.readings || []).map(r => r.zone).filter(Boolean));
  return (!!ch.figure || zones.size >= 3)
    && want.length > 0 && want.every(w => labels.includes(w));
}

{
  const gameState = await import('../core/gameState.js');
  const sim = await import('../core/simulation.js');
  const { CURRICULUM, BALLPARK_CALCS } = await import('../core/curriculum.js');
  const { MISSION_DEFS } = await import('../core/missions.js');
  const { GROUP_DEFS } = await import('../core/divisions.js');

  const assign = Object.fromEntries(GROUP_DEFS.map(g => [g.id, g.defaultLeader]));
  gameState.createFresh(assign);

  let stopsPlayed = 0, personStops = 0, specials = 0;
  for(let mission = 1; mission <= MISSION_DEFS.length; mission++){
    const state = gameState.getState();
    if(state.week !== mission){
      fail(`expected to be on mission ${mission}, but the campaign is on ${state.week}`);
      break;
    }
    const def = MISSION_DEFS[mission - 1];
    for(let s = 0; s < def.stops.length; s++){
      const idx = sim.nextMissionStopIndex(gameState.getState());
      if(idx < 0){ fail(`mission ${mission}: no next stop at stop ${s + 1} of ${def.stops.length}`); break; }

      const group = def.stops[idx].group;
      // This is the resolution the question UI performs before it will open.
      const stop = sim.missionStopForGroup(gameState.getState(), group);
      if(!stop) { fail(`mission ${mission} stop ${idx + 1}: group "${group}" resolves to no stop`); break; }
      if(stop.index !== idx){
        fail(`mission ${mission} stop ${idx + 1}: resolves to stop ${stop.index + 1} instead — ` +
             `the UI would report "mission locked" and the stop is unreachable`);
        break;
      }

      // A person stop needs somebody from that area on the roster.
      if(sim.isPersonStopForIdx(gameState.getState(), idx)){
        personStops++;
        const pid = sim.getPersonIdForStop(gameState.getState(), idx);
        if(!pid) fail(`mission ${mission} stop ${idx + 1} is a person stop with nobody in "${group}"`);
      }

      // The lesson behind the stop has to be gradeable.
      const lessons = CURRICULUM[group] ?? [];
      const lesson = lessons[stop.lesson];
      if(!lesson){ fail(`mission ${mission} stop ${idx + 1}: no lesson ${stop.lesson} in "${group}"`); break; }
      const ch = lesson.game;
      // A lesson with no game at all is the shape a hand-written placeholder
      // has, and it used to end this run with a TypeError three frames deep —
      // which reads as a broken checker rather than as unwritten content.
      if(!ch){ fail(`mission ${mission} stop ${idx + 1}: lesson "${lesson.title ?? stop.lesson}" in "${group}" has no game`); break; }
      // Formats are compared through the same canonical form the question UI
      // uses: the books spell them "Sequence", "SEQUENCE" and "Science Tank",
      // and comparing raw strings reported a shipped game as unplayable.
      const kind = String(ch.type ?? '').toUpperCase().replace(/[\s_-]+/g, '');
      const ok =
        (kind === 'PROTOCOL' && ch.scenarios?.length && ch.mapping?.length === ch.scenarios.length) ||
        (kind === 'SEQUENCE' && ch.cards?.length && ch.order?.length === ch.cards.length) ||
        (kind === 'SCIENCETANK' && ch.proposals?.length && Object.keys(ch.recommended ?? {}).length) ||
        (kind === 'BALLPARK' && !!BALLPARK_CALCS[`${group}-${lesson.day}`]) ||
        (kind === 'SWEEP' && Number.isFinite(+ch.sweep?.target) && +ch.sweep?.tolerance > 0
          && (ch.sweep?.response ?? []).length >= 4) ||
        // Graded on the held-out score against `pass`, so those two and both
        // curves are what makes one answerable.
        (kind === 'HOLDOUT' && Number.isFinite(+ch.holdout?.pass)
          && (ch.holdout?.fit ?? []).length >= 5 && (ch.holdout?.test ?? []).length >= 5) ||
        // Graded on the statistic the authored probabilities actually produce.
        (kind === 'TALLY' && (ch.tally?.settings ?? []).length >= 2
          && ch.tally.settings.every(x => Number.isFinite(+x.pSame))
          && Number.isFinite(+ch.tally?.target) && +ch.tally?.tolerance > 0) ||
        (kind === 'DIAGNOSIS' && ch.choices?.length >= 4 && diagnosisAnswerable(ch)) ||
        (kind === 'TRIAGE' && ch.choices?.length >= 2 && ch.choices.includes(ch.correctChoice)) ||
        (kind === 'CHOICE' && ch.choices?.length >= 3 &&
          ch.choices.map(c => (typeof c === 'string' ? c : c.label)).includes(ch.correctChoice ?? ch.answer)) ||
        (kind === 'CASEBOOK' && (
          (ch.proposals?.length && ch.proposals.every(p => Number.isFinite(+p.target))) ||
          ((ch.scenarios || ch.cards)?.length && ch.mapping?.length === (ch.scenarios || ch.cards).length)));
      if(!ok) fail(`mission ${mission} stop ${idx + 1} ("${lesson.title}"): ${ch.type} is not gradeable`);

      gameState.markMissionStopComplete(idx, true);
      stopsPlayed++;
    }

    // Some missions also carry a between-mission funding meeting, and
    // missionComplete() will not return true until it has been settled. The
    // player does that by talking to the named person; here it is settled
    // directly, after checking that person is somebody the roster contains —
    // a request naming a stranger can never be completed in the real game.
    if(sim.hasSpecialRequest(gameState.getState().week)){
      const req = sim.getSpecialRequest(gameState.getState().week);
      const roster = (await import('../core/historicCharacters.js')).HISTORIC_CHARACTERS ?? [];
      if(req?.personId && !roster.some(p => p.id === req.personId)){
        fail(`mission ${mission}: the funding request names "${req.personId}", who is not on the roster — ` +
             `the mission can never be completed`);
      }
      gameState.completeSpecialRequest(gameState.getState().week);
      specials++;
    }

    if(!sim.missionComplete(gameState.getState())){
      fail(`mission ${mission} did not complete after all ${def.stops.length} stops`);
      break;
    }
    gameState.completeMission();
  }

  const finalState = gameState.getState();
  const expected = MISSION_DEFS.reduce((n, m) => n + m.stops.length, 0);
  if(stopsPlayed !== expected) fail(`played ${stopsPlayed} stops, expected ${expected}`);

  if(problems.length){
    console.error(`\n${problems.length} problem(s) in theme "${themeName}":`);
    problems.forEach(p => console.error('  ✗ ' + p));
  } else {
    console.log(`\n✓ theme "${themeName}" plays end to end: ${MISSION_DEFS.length} missions, ` +
      `${stopsPlayed} stops (${personStops} of them person stops), ` +
      `${specials} funding meetings, ` +
      `final status "${finalState.status}", readiness ${Math.round(sim.readiness(finalState))}%`);
  }
}

process.exit(problems.length ? 1 : 0);
