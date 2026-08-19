// formatMix.mjs — no answer format holds more than a third of a campaign.
//
//   node engine/dev/formatMix.mjs <theme> [--all] [--selftest] [--verbose]
//
// The rule is a design decision, written down in DIVERSITY_PASS.md: at a 45-stop
// campaign no format may hold more than 15 stops, at a 30-stop junior edition 10.
// Measured on scheduled stops, deduped by `group:lesson`, because that is what a
// player meets — a lesson two days reach is one experience of its format.
//
// What this file deliberately does NOT gate on. Effective format count and CHOICE
// share are the two obvious numbers and both are worthless as targets: across the
// seventeen senior campaigns the effective count scores ρ −0.07 against whether the
// syllabus equations are computed, where the share of stops carrying arithmetic
// scores +0.69. A gate on a number nobody should optimise is a gate that gets an
// `--advisory` flag and stops being read. So the cap is the gate, and the mix is the
// diagnosis you run when it fails — same relationship as `curriculumDelivery` and
// format mix, one level down.
//
// `format-debt.json` is the ratchet, with the same two properties as the other debt
// files plus one more that they do not need:
//   · a campaign over the cap and not on the list fails immediately
//   · a row on the list whose campaign is now inside the cap fails, naming the line
//     to delete, so the file cannot become a standing excuse
//   · a row whose count has MOVED in either direction fails, naming the new number.
//     A count that has improved and not been recorded reads exactly like a count
//     nobody has touched, and this pass converts stops a handful at a time.
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { pagesFor } from './curriculumDelivery.mjs';

const DEBT_FILE = 'engine/dev/format-debt.json';

/** The cap for a campaign of n scheduled stops: a third, never below 1. */
export function capFor(n){ return Math.max(1, Math.round(n / 3)); }

/**
 * Every format over the cap, worst first. Exported so a report can read the rule
 * rather than keeping a second copy of it — the mistake `plans/blackout-sequence.html`
 * made with the ordering rule and had to be corrected.
 */
export function overCap(pages){
  const mix = new Map();
  for(const p of pages) mix.set(p.type, (mix.get(p.type) ?? 0) + 1);
  const cap = capFor(pages.length);
  return {
    cap, stops: pages.length,
    mix: [...mix].sort((a, b) => b[1] - a[1]),
    over: [...mix].filter(([, c]) => c > cap).sort((a, b) => b[1] - a[1])
      .map(([f, c]) => ({ format: f, count: c, over: c - cap })),
  };
}

/** The debt row for one over-cap format, and the only place its spelling lives. */
export const debtKey = (format, count) => `${format} ${count}`;

async function pagesForTheme(themeName){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content);
  return pagesFor(content);
}

/**
 * One campaign against the rule and against the debt file. Pure, so the selftest can
 * hand it a fixture instead of a theme — the thing this repo's checkers keep getting
 * wrong is that the gate and the thing that proves the gate works read different code.
 */
export function judge(themeName, pages, recorded){
  const { cap, stops, over, mix } = overCap(pages);
  const listed = new Set(recorded ?? []);
  const problems = [];
  const seen = new Set();
  for(const o of over){
    const key = debtKey(o.format, o.count);
    seen.add(key);
    if(listed.has(key)) continue;
    const stale = [...listed].find(k => k.startsWith(o.format + ' '));
    // A moved row consumes the old spelling, or the same format would be reported
    // twice — once as a wrong count and again as a row nobody deleted.
    if(stale) seen.add(stale);
    if(stale) problems.push({ kind: 'moved', text: `${o.format} is ${o.count} of ${stops} (cap ${cap}) — ${DEBT_FILE} says "${stale}", update it to "${key}"` });
    else problems.push({ kind: 'fresh', text: `${o.format} holds ${o.count} of ${stops} stops (cap ${cap}) — ${o.over} over` });
  }
  for(const k of listed){
    if(seen.has(k)) continue;
    const format = k.slice(0, k.lastIndexOf(' '));
    const now = mix.find(([f]) => f === format);
    problems.push({ kind: 'paid', text: `${DEBT_FILE} lists "${k}", and ${format} is ${now ? now[1] : 0} of ${stops} now — inside the cap, so delete the line` });
  }
  return { cap, stops, mix, over, problems };
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY){
  const args = process.argv.slice(2);
  if(args.includes('--selftest')) await selftest();
  else {
    const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : {};
    const wanted = args.includes('--all') || !args.find(a => !a.startsWith('--')) ? themeNames() : [args.find(a => !a.startsWith('--'))];
    const verbose = args.includes('--verbose');
    let failures = 0, capped = 0;
    for(const themeName of wanted){
      let pages;
      try { pages = await pagesForTheme(themeName); }
      catch(err){ console.log(`✗ ${themeName}: cannot load theme — ${err.message}`); failures++; continue; }
      if(!pages.length) continue;
      const { cap, stops, mix, over, problems } = judge(themeName, pages, debt[themeName]);
      if(!over.length) capped++;
      for(const p of problems){ console.log(`✗ ${themeName}: ${p.text}`); failures++; }
      if(verbose || (over.length && !problems.length))
        console.log(`  · ${themeName}: ${stops} stops, cap ${cap} — ${mix.slice(0, 5).map(([f, c]) => `${f} ${c}`).join('  ')}${over.length ? `  [known: ${over.map(o => `${o.format} ${o.over} over`).join(', ')}]` : ''}`);
    }
    if(failures) console.log(`\n${failures} problem(s).`);
    else console.log(`\n✓ ${wanted.length} theme(s): ${capped} inside the cap, ${wanted.length - capped} over it and recorded.`);
    process.exit(failures ? 1 : 0);
  }
}

async function selftest(){
  const page = (type, i) => ({ type, key: `G:${i}`, group: 'G', lesson: i, day: 1 + (i % 15), title: `stop ${i}` });
  const campaign = (counts) => Object.entries(counts).flatMap(([t, n]) => Array.from({ length: n }, (_, i) => page(t, `${t}${i}`)));
  const cases = [];
  const check = (name, ok, detail = '') => { cases.push({ name, ok, detail }); };

  // 45 stops, CHOICE 29: over a cap of 15 and nothing recorded.
  const heavy = campaign({ CHOICE: 29, BALLPARK: 8, SEQUENCE: 8 });
  let r = judge('fixture', heavy, undefined);
  check('a campaign over the cap with nothing recorded is a problem',
    r.problems.length === 1 && r.problems[0].kind === 'fresh', r.problems[0]?.text);
  check('the cap is a third of the scheduled stops', r.cap === 15 && r.stops === 45, `cap ${r.cap} of ${r.stops}`);

  // …and silent once recorded at exactly that count.
  r = judge('fixture', heavy, ['CHOICE 29']);
  check('…and is silent once recorded at that count', r.problems.length === 0, r.problems[0]?.text);

  // The property the other debt files do not need: a count that has moved.
  r = judge('fixture', campaign({ CHOICE: 25, BALLPARK: 10, SEQUENCE: 10 }), ['CHOICE 29']);
  check('a recorded count that has improved fails, naming the new number',
    r.problems.length === 1 && r.problems[0].kind === 'moved' && r.problems[0].text.includes('"CHOICE 25"'), r.problems[0]?.text);

  // A row that has been paid off must fail rather than sit there.
  r = judge('fixture', campaign({ CHOICE: 15, BALLPARK: 15, SEQUENCE: 15 }), ['CHOICE 29']);
  check('a recorded row now inside the cap fails, naming the line to delete',
    r.problems.length === 1 && r.problems[0].kind === 'paid', r.problems[0]?.text);

  // Exactly at the cap is inside it — the rule is "more than a third".
  r = judge('fixture', campaign({ CHOICE: 15, BALLPARK: 15, SEQUENCE: 15 }), undefined);
  check('a format exactly at the cap is inside it', r.problems.length === 0 && r.over.length === 0);

  // Two formats over the cap are two rows: Hospital is CHOICE 22 and SEQUENCE 22.
  r = judge('fixture', campaign({ CHOICE: 22, SEQUENCE: 22, TRIAGE: 6, BALLPARK: 5 }), undefined);
  check('two formats over the cap are two problems', r.problems.length === 2, r.problems.map(p => p.text).join(' | '));

  // A junior edition is 30 stops, so its cap is 10 rather than 15 — a cap that did not
  // scale would pass a 12-of-30 wall that is worse than the 15-of-45 it copies.
  r = judge('fixture', campaign({ CHOICE: 12, BALLPARK: 9, SEQUENCE: 9 }), undefined);
  check('the cap scales with the campaign', r.cap === 10 && r.problems.length === 1, `cap ${r.cap}`);

  // A stop reached twice is one stop: pagesFor dedupes, and a cap counting callbacks
  // twice would fail a campaign for teaching the same lesson again on purpose.
  const dupes = pagesFor({
    CURRICULUM: { G: [{ title: 'a', game: { type: 'CHOICE' } }, { title: 'b', game: { type: 'BALLPARK' } }] },
    MISSIONS: [{ stops: [{ group: 'G', lesson: 0 }, { group: 'G', lesson: 1 }] }, { stops: [{ group: 'G', lesson: 0 }] }],
  });
  check('a lesson two days reach counts once', dupes.length === 2, `${dupes.length} pages`);

  const bad = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '✓' : '✗'} selftest: ${c.name}${c.ok ? '' : ` — got: ${c.detail}`}`);
  console.log(bad.length ? `\n${bad.length} selftest case(s) failed.` : '\n✓ all selftest cases pass.');
  process.exit(bad.length ? 1 : 0);
}
