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
import { pathToFileURL } from 'node:url';

const here = dirname(new URL(import.meta.url).pathname);
const root = resolve(here, '../..');
const themeName = process.argv[2] || 'contamcity';

// engine/core imports its content through the `@theme` alias, which Vite
// supplies in the browser. Node gets the same alias from a resolve hook, so the
// modules under test are the real ones rather than a headless copy of them.
register('./themeResolver.mjs', pathToFileURL(here + '/'), {
  data: { themeDir: resolve(root, 'themes', themeName) },
});

const problems = [];
const fail = (m) => problems.push(m);

{
  const gameState = await import('../core/gameState.js');
  const sim = await import('../core/simulation.js');
  const { CURRICULUM, BALLPARK_CALCS } = await import('../core/curriculum.js');
  const { MISSION_DEFS } = await import('../core/missions.js');
  const { GROUP_DEFS } = await import('../core/divisions.js');

  const assign = Object.fromEntries(GROUP_DEFS.map(g => [g.id, g.defaultLeader]));
  gameState.createFresh(assign);

  let stopsPlayed = 0, personStops = 0;
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
      const ok =
        (ch.type === 'Protocol' && ch.scenarios?.length && ch.mapping?.length === ch.scenarios.length) ||
        (ch.type === 'Sequence' && ch.cards?.length && ch.order?.length === ch.cards.length) ||
        (ch.type === 'Science Tank' && ch.proposals?.length && Object.keys(ch.recommended ?? {}).length) ||
        (ch.type === 'Ballpark' && !!BALLPARK_CALCS[`${group}-${lesson.day}`]) ||
        (ch.type === 'DIAGNOSIS' && ch.choices?.length >= 4 && !!ch.figure &&
          ch.choices.map(c => (typeof c === 'string' ? c : c.label)).includes(ch.correctChoice));
      if(!ok) fail(`mission ${mission} stop ${idx + 1} ("${lesson.title}"): ${ch.type} is not gradeable`);

      gameState.markMissionStopComplete(idx, true);
      stopsPlayed++;
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
      `final status "${finalState.status}", readiness ${Math.round(sim.readiness(finalState))}%`);
  }
}

process.exit(problems.length ? 1 : 0);
