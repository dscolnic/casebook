// metricsPlan.mjs — a metrics campaign has a plan for every mission it ships.
//
//   node engine/dev/metricsPlan.mjs redsand_v5
//   node engine/dev/metricsPlan.mjs --all
//   node engine/dev/metricsPlan.mjs --selftest
//
// THE DEFECT THIS EXISTS FOR. A campaign that declares `theme.metrics` scores
// each mission on a stopwatch against a target and pays Recovery Points from it,
// and all of that comes from `theme.metrics.missions[n]`. A mission with no
// entry there opens no award screen at all: the shift ends, the outcome beat
// plays, and the player is handed the next briefing with nothing scored and no
// points. Nothing throws. Nothing is logged. It is exactly the failure mode this
// repo keeps paying for — a silent nothing where a screen should be — and it
// will happen the first time somebody writes mission 9's questions and forgets
// its four numbers.
//
// Deliberately not a warning. A campaign either scores its missions or it does
// not declare `metrics`; there is no reading in which nine of fifteen missions
// pay out and the rest quietly do not.
import { pathToFileURL } from 'node:url';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

/**
 * Judge one campaign. Pure — takes the manifest's two halves, returns findings —
 * so the selftest can hand it three missions instead of a theme.
 *
 * @param metrics   `theme.metrics`, or null in a campaign that has none
 * @param missions  `theme.content.MISSIONS`
 */
export function judge({ metrics = null, missions = [] } = {}){
  const fail = [], note = [];
  const bars = metrics?.bars ?? [];
  if(!bars.length) return { fail, note, scored: 0, missions: missions.length };

  const plans = metrics.missions ?? [];
  let scored = 0;
  missions.forEach((m, i) => {
    const n = i + 1;
    const plan = plans[i];
    const title = m?.title ? `"${m.title}"` : '';
    if(!plan){
      fail.push(`mission ${n} ${title} has no metrics plan — it ends without a target,`
        + ' without deltas and without an award screen');
      return;
    }
    scored++;
    if(!(plan.target > 0)){
      fail.push(`mission ${n} ${title} has no target time, so the clock cannot score it`);
    }
    // THE DELTAS MAY BE ALL ZERO and that is a legitimate mission. What they may
    // not be is a key nothing matches: a delta on `power_resrve` moves nothing
    // and reads on screen as a mission that did nothing.
    for(const key of Object.keys(plan.deltas ?? {})){
      if(!bars.some(b => b.key === key)){
        fail.push(`mission ${n} ${title} moves "${key}", which is not one of this`
          + ` campaign's bars (${bars.map(b => b.key).join(', ')})`);
      }
    }
    // A LOSS HAS TO BE NAMED. The bible's own rule — "the event that caused every
    // loss is named on screen" — and a bar that fell for an unreadable reason is
    // one the player cannot do anything about next time.
    const moves = Object.values(plan.deltas ?? {}).some(v => Number(v) !== 0);
    if(moves && !String(plan.event ?? '').trim()){
      fail.push(`mission ${n} ${title} moves a bar and names no event — the award`
        + ' screen would show four numbers with no cause');
    }
    if(!Array.isArray(plan.review) || !plan.review.length){
      note.push(`mission ${n} ${title} has no concept review, so the shift closes`
        + ' on the award and goes straight to the next briefing');
    }
  });
  return { fail, note, scored, missions: missions.length };
}

// --------------------------------------------------------------- selftest
if(process.argv.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };
  const bars = [{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }];
  const two = [{ title: 'One' }, { title: 'Two' }];
  const good = { target: 300, event: 'a thing happened', deltas: { a: -2 }, review: ['x'] };

  check('a campaign with no metrics is not judged at all',
        judge({ metrics: null, missions: two }).fail.length === 0,
        'the sixty campaigns on the day model may not be asked for a plan');

  check('every mission planned passes',
        judge({ metrics: { bars, missions: [good, good] }, missions: two }).fail.length === 0);

  const missing = judge({ metrics: { bars, missions: [good] }, missions: two });
  check('a mission with no plan fails', missing.fail.length === 1
        && /mission 2 .*has no metrics plan/.test(missing.fail[0]),
        'today it ends with nothing scored and nothing said');
  check('…and the ones that are planned are still counted', missing.scored === 1);

  check('a plan with no target fails', judge({ metrics: { bars,
          missions: [{ ...good, target: 0 }, good] }, missions: two })
        .fail.some(f => /no target time/.test(f)));

  check('a delta on a bar that does not exist fails', judge({ metrics: { bars,
          missions: [{ ...good, deltas: { nope: -2 } }, good] }, missions: two })
        .fail.some(f => /not one of this campaign's bars/.test(f)),
        'it moves nothing and reads as a mission that did nothing');

  check('a mission that moves a bar with no event fails', judge({ metrics: { bars,
          missions: [{ ...good, event: '' }, good] }, missions: two })
        .fail.some(f => /names no event/.test(f)));
  check('…but an all-zero mission needs no event', judge({ metrics: { bars,
          missions: [{ target: 300, deltas: { a: 0 }, review: ['x'] }, good] }, missions: two })
        .fail.length === 0,
        'a shift that changes nothing is a legitimate shift');

  const noReview = judge({ metrics: { bars,
    missions: [{ ...good, review: [] }, good] }, missions: two });
  check('a missing concept review is a note, not a failure',
        noReview.fail.length === 0 && noReview.note.length === 1,
        'the review is the bible’s and worth having; it is not what breaks the shift');

  if(fails.length){
    console.log(`\nmetricsPlan --selftest: ${fails.length} case(s) failed.`);
    for(const f of fails) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`\nmetricsPlan --selftest: ${ran} cases, and no mission scores in silence.`);
  process.exit(0);
}

// ------------------------------------------------------------------- run
const args = process.argv.slice(2);
const themes = args.includes('--all') ? themeNames() : args.filter(a => !a.startsWith('--'));
if(!themes.length){
  console.error('usage: node engine/dev/metricsPlan.mjs <theme> … | --all | --selftest');
  process.exit(2);
}
let bad = 0, judged = 0;
for(const name of themes){
  const dir = resolveTheme(name);
  const theme = (await import(pathToFileURL(`${dir}/theme.js`).href)).default;
  const out = judge({ metrics: theme.metrics ?? null,
                      missions: theme.content?.MISSIONS ?? [] });
  if(!(theme.metrics?.bars ?? []).length) continue;
  judged++;
  if(out.fail.length){
    console.log(`✗ ${name}: ${out.fail.length} mission(s) unscored or misdeclared`);
    out.fail.forEach(f => console.log('  · ' + f));
    bad += out.fail.length;
  } else {
    console.log(`✓ ${name.padEnd(20)} ${out.scored}/${out.missions} mission(s) scored`);
  }
  out.note.forEach(n => console.log('  · ' + n));
}
// SILENT WHEN INERT. `npm run check` runs this once per theme, and sixty of them
// declare no metrics — so saying so printed "no theme here runs on metrics" 54
// times in one run. A gate that fills the report with lines about campaigns it
// has nothing to say about is a gate whose real findings scroll past.
if(judged && !bad) console.log(`metricsPlan: ${judged} theme(s), every mission scored.`);
if(bad) process.exitCode = 1;
