// dayCalls.mjs — how many calls a day makes, and whether any of them is a
// question the player has already answered.
//
//   node engine/dev/dayCalls.mjs <theme>
//   node engine/dev/dayCalls.mjs --selftest
//
// Two rules, both about the shape of a day rather than the content of a stop:
//
//   1. **No day carries more than `MAX_CALLS` calls.** Three authored stops plus
//      a callback is what the loop is built around and what `budgetForRoute`
//      gives hours to; a fifth call is answered against the same clock as the
//      fourth, so the day reads as long rather than full.
//   2. **No lesson is served twice in a campaign.** A callback that re-asks its
//      own lesson is the same card twice — same scene, same `why`, same four
//      options, same key, with `Second look —` printed on the day plan and
//      nowhere on the card the player answers. Recognition is not retrieval.
//
// **Why nothing caught either of these for years.** Every checker that reads a
// campaign in order deliberately dedupes on `group:lesson` — `formatMix` so a
// callback does not spend a format cap twice, `syllabusEquations` so it does not
// re-date an equation, `probeQuestions` so a question is not probed twice,
// `validateContent` by filtering `s.callback` out before counting. Each of those
// is right about its own question, and between them they made the *second*
// serving invisible to the whole apparatus: 295 of 318 callbacks across the
// catalogue were byte-identical re-serves and no gate could see one. This is the
// file that reads the campaign as a player walks it, duplicates and all.
//
// `validateContent` notes a day that authors more than three stops and has never
// failed one, which is why 68 days authored four and 72 days ran to five calls.
// A note nobody has to clear is a note nobody clears.
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { themeNames, themeDir } from './registry.mjs';
import { MAX_CALLS } from '../content/normalize.js';

const DEBT = resolve(new URL('.', import.meta.url).pathname, 'daycalls-debt.json');

/**
 * Every problem with a campaign's day shapes.
 *
 * Takes normalised content — the callback is added by `shapeMissions` at load,
 * so a checker that reads the book instead of the theme sees a campaign no
 * player is served.
 */
export function dayCallRows(content){
  const rows = [];
  const missions = content.MISSIONS ?? [];
  const cur = content.CURRICULUM ?? {};
  const titleOf = (s) => String((cur[s.group] ?? [])[s.lesson]?.title ?? '?');

  missions.forEach((m, i) => {
    const stops = m.stops ?? [];
    if(stops.length > MAX_CALLS){
      rows.push({
        kind: 'over', day: i + 1, calls: stops.length, title: m.title ?? '',
        why: `day ${i + 1} carries ${stops.length} calls, over the ${MAX_CALLS} a day is budgeted for: `
           + stops.map(s => `"${titleOf(s)}"${s.callback ? ' (callback)' : ''}`).join(', '),
      });
    }
  });

  // A lesson served twice, wherever the second serving comes from. Keyed on
  // group:lesson rather than on title, because two lessons may share a title
  // and a re-serve is the same content whatever it is called.
  const at = new Map();
  missions.forEach((m, i) => {
    for(const s of (m.stops ?? [])){
      const k = `${s.group}:${s.lesson}`;
      if(!at.has(k)) at.set(k, []);
      at.get(k).push(i + 1);
    }
  });
  for(const [k, days] of at){
    if(days.length < 2) continue;
    const [group, lesson] = [k.slice(0, k.lastIndexOf(':')), Number(k.slice(k.lastIndexOf(':') + 1))];
    rows.push({
      kind: 'twice', day: days[1], calls: days.length,
      title: String((cur[group] ?? [])[lesson]?.title ?? '?'),
      why: `"${String((cur[group] ?? [])[lesson]?.title ?? '?')}" is served ${days.length} times, `
         + `on day${days.length > 2 ? 's' : ''} ${days.join(', ')} — the same card, so the second `
         + `answer comes from memory of the option rather than from the science`,
    });
  }
  return rows;
}

/**
 * One stable line per row.
 *
 * Not a slice of the `why`, which moves the moment a stop is retitled and reads
 * as a stale row plus a fresh one — the mistake `plansData.mjs` made by naming a
 * stop by its number. An overfull day is keyed by the day, which does not
 * renumber; a duplicate is keyed by the card being served twice.
 */
export const rowKey = (theme, r) => r.kind === 'over'
  ? `${theme} · over · day ${r.day} carries ${r.calls} calls`
  : `${theme} · twice · "${r.title}" served ${r.calls} times`;

async function contentOf(themeName){
  const theme = (await import(pathToFileURL(resolve(themeDir(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return content;
}

// --------------------------------------------------------------------- debt
//
// Same two properties as `concept-debt.json` and `equation-debt.json`: a row not
// on the list fails immediately, so nothing new drifts in, and a row on the list
// that has since been fixed also fails, naming the line to delete, so the file
// cannot become a standing excuse. It only shrinks. `_` is the header and is not
// data — counting those as debt is how a total reads high for an afternoon.
function loadDebt(){
  try{
    const j = JSON.parse(readFileSync(DEBT, 'utf8'));
    delete j._;
    return j;
  }catch{ return {}; }
}

async function run(){
  const args = process.argv.slice(2);
  if(args.includes('--selftest')) return selftest();
  const only = args.filter(a => !a.startsWith('--'));
  const names = only.length ? only : themeNames();
  const debt = loadDebt();
  const live = new Set();
  let failed = 0;

  for(const name of names){
    let content;
    try{ content = await contentOf(name); }
    catch(e){ console.log(`${name}: could not load — ${e.message}`); failed++; continue; }
    const rows = dayCallRows(content);
    const known = new Set(debt[name] ?? []);
    const fresh = [];
    for(const r of rows){
      const key = rowKey(name, r);
      live.add(key);
      if(known.has(key)) continue;
      fresh.push(r);
    }
    if(fresh.length){
      failed++;
      console.log(`\n${name}: ${fresh.length} day-shape problem${fresh.length > 1 ? 's' : ''}`);
      for(const r of fresh) console.log(`  ${r.why}`);
    }
  }

  // Rows recorded as debt that no longer happen: the file has to shrink.
  const stale = [];
  for(const [name, keys] of Object.entries(debt))
    for(const k of keys) if(!live.has(k)) stale.push([name, k]);
  if(stale.length && !only.length){
    failed++;
    console.log(stale.length > 1
      ? `\n${stale.length} debt rows no longer happen — delete them from ${DEBT}:`
      : `\n1 debt row no longer happens — delete it from ${DEBT}:`);
    for(const [name, k] of stale) console.log(`  ${name}: ${k}`);
  }

  if(!failed) console.log(`dayCalls: ${names.length} theme${names.length > 1 ? 's' : ''} — no day over ${MAX_CALLS} calls, no lesson served twice`);
  process.exit(failed ? 1 : 0);
}

// ----------------------------------------------------------------- selftest
//
// The cases that would otherwise invert silently, each verified by putting the
// bug back and watching that case and only that case fail:
//
//   * keying a serving on the lesson's *base* title — stripping `— Review 1` the
//     way `baseTitle` does — makes a review variant read as a duplicate of its
//     own parent, which bans the callback outright rather than gating it (case 5)
//   * reporting only three-or-more servings passes every ordinary duplicate,
//     which is 295 of the 318 (case 4)
//   * a cap written as a literal drifts from the engine's own `MAX_CALLS` (case 2)
//
// The one a selftest cannot reach: reading the *book* rather than the normalised
// theme sees no callback at all and reports all-clear on a campaign serving
// thirteen duplicates. `contentOf` calls `normalizeContent`, and that is the only
// thing keeping it honest.
function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => {
    cases.push([name, ok, detail]);
  };

  const lesson = (title) => ({ title, scene: 'x', choices: ['a'], correctChoice: 'a' });
  const base = {
    CURRICULUM: {
      A: [lesson('One'), lesson('One — Review 1')],
      B: [lesson('Two')],
      E: [lesson('Five')],
    },
    MISSIONS: [
      { title: 'd1', stops: [{ group: 'A', lesson: 0 }, { group: 'B', lesson: 0 }] },
    ],
  };

  // 1. a clean campaign reports nothing
  check('a day of two distinct calls is clean', dayCallRows(base).length === 0);

  // 2. five calls in a day is caught
  const over = structuredClone(base);
  over.MISSIONS[0].stops = Array.from({ length: 5 }, (_, i) => ({ group: 'A', lesson: i % 2 }));
  check('five calls in one day is reported',
    dayCallRows(over).some(r => r.kind === 'over'));

  // 3. four is not
  const four = structuredClone(base);
  four.CURRICULUM.C = [lesson('Three')]; four.CURRICULUM.D = [lesson('Four')];
  four.MISSIONS[0].stops = [{ group: 'A', lesson: 0 }, { group: 'B', lesson: 0 },
                            { group: 'C', lesson: 0 }, { group: 'D', lesson: 0 }];
  check(`${MAX_CALLS} calls in one day is allowed`,
    dayCallRows(four).every(r => r.kind !== 'over'));

  // 4. the same lesson twice, on different days, is caught — and this is the
  //    case a title-keyed check inverts on, because the second serving's task
  //    line reads "Second look — One" rather than "One".
  const twice = structuredClone(base);
  twice.MISSIONS.push({ title: 'd2', stops: [
    { group: 'E', lesson: 0 },
    { group: 'A', lesson: 0, callback: true, task: 'Second look — One' },
  ] });
  const twiceRows = dayCallRows(twice);
  check('the same lesson on two days is reported',
    twiceRows.some(r => r.kind === 'twice' && /served 2 times/.test(r.why)),
    twiceRows.map(r => r.why).join(' / '));

  // 5. a *review variant* on the second day is a different lesson and is clean —
  //    the case that keeps rule 2 from banning the callback outright.
  const review = structuredClone(base);
  review.MISSIONS.push({ title: 'd2', stops: [
    { group: 'E', lesson: 0 },
    { group: 'A', lesson: 1, callback: true, task: 'Second look — One' },
  ] });
  check('a review variant as the callback is clean',
    dayCallRows(review).length === 0,
    dayCallRows(review).map(r => r.why).join(' / '));

  // 6. three servings are counted as three, not as one duplicate — the shape
  //    that let one lesson be asked on days 3, 4 and its own day.
  const thrice = structuredClone(twice);
  thrice.MISSIONS.push({ title: 'd3', stops: [{ group: 'A', lesson: 0, callback: true }] });
  check('three servings are reported as three',
    dayCallRows(thrice).some(r => r.kind === 'twice' && /served 3 times/.test(r.why)));

  let bad = 0;
  for(const [name, ok, detail] of cases){
    console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name}${ok || !detail ? '' : `  [${detail}]`}`);
    if(!ok) bad++;
  }
  console.log(`\n${cases.length - bad}/${cases.length} cases pass`);
  process.exit(bad ? 1 : 0);
}

// Importable: `plans/` and the sequencing tools read `dayCallRows` rather than
// keeping a second copy of the rule.
const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY) run();
