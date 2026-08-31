// sceneCast.mjs — is anybody in the room where the question is asked?
//
//   node engine/dev/sceneCast.mjs <theme> [<theme> …]
//   node engine/dev/sceneCast.mjs --all
//   node engine/dev/sceneCast.mjs --selftest
//
// A stop's `scene` is thirty to forty-five words of situation, and on most of
// this catalogue it opens with somebody doing something: "Ines Calloway has the
// landings book open at two pages", "Palmer has fitted a smooth curve through
// the last twelve hours of fixes", "Kovač taped the crown of the loop
// yesterday". Four campaigns do not. Measured across all forty-two:
//
//   Yellow Bay                45 of 45   100%
//   Sightline, Headwater      45 of 48    94%
//   Dark Fibre                34 of 36    94%
//   Overwind                  33 of 36    92%
//   … median across 42 books              ~70%
//   Deep Watch                16 of 48    33%
//   Outbreak: Riverton        12 of 48    25%
//   Bring Them Home            0 of 48     0%
//   The Contaminated City      0 of 48     0%
//   Planetary Defense          0 of 48     0%
//   Project Y                  1 of 52     2%
//
// The four at the bottom are the four with a docx or first-generation origin,
// and all four name somebody in EVERY day stake — 15 of 15 — so the cast exists
// and is properly introduced. What is missing is people in the room where the
// work happens. Project Y's scenes read "The Theoretical Division needs a
// reaction rate", "Chemistry and Metallurgy is being asked what it can and
// cannot deliver". Nothing is wrong with either sentence; there is just nobody
// in it, forty-eight times running.
//
// WHY THIS REPORTS RATHER THAN FAILS, AND WHERE THE LINE IS
//
// There is no correct share. A scene can be about an instrument reading, and
// Deep Watch at 33% is a submarine where a compartment is often the subject. So
// this prints the rate for every theme and fails only below a floor of 10%,
// which no defensible campaign reaches: at one scene in ten the cast has
// stopped appearing in the questions at all. Four campaigns are under it and
// they are recorded in `scenecast-debt.json` — 229 scenes of editorial work
// across four books and their editions, which is real writing rather than a
// mechanical fix, so it goes on the debt list instead of turning the suite red.
//
// The matcher is surnames from the theme's own roster, which is what
// `checkStory` uses for the opening card. First names alone are not enough:
// "Ines" appears in two rosters and "Marta" in three.
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEBT = resolve(HERE, 'scenecast-debt.json');
const FLOOR = 0.10;

/** Surnames worth matching: the last capitalised word of each roster name. */
export function surnamesOf(roster){
  const out = new Set();
  for(const p of roster ?? []){
    const parts = String(p?.name ?? '').split(/\s+/).filter(Boolean);
    const last = parts.at(-1);
    // A rank or a courtesy title is not a surname, and a one-word name is all
    // there is. "Dr." and "Chief Petty Officer" are prefixes here.
    if(last && last.length > 2 && /^[A-Z]/.test(last) && !/^[A-Z]\.$/.test(last)) out.add(last);
  }
  return [...out];
}

export function sceneRate(lessons, surnames){
  let named = 0, total = 0;
  for(const l of lessons ?? []){
    const scene = String(l?.scene ?? '').trim();
    if(!scene) continue;
    total++;
    if(surnames.some(s => scene.includes(s))) named++;
  }
  return { named, total, rate: total ? named / total : 1 };
}

function loadDebt(){
  try{
    const j = JSON.parse(readFileSync(DEBT, 'utf8'));
    delete j._;
    return j;
  }catch{ return {}; }
}

async function runTheme(name, debt){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(name), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const surnames = surnamesOf(content.ROSTER ?? content.roster ?? []);
  const lessons = Object.values(content.CURRICULUM ?? {}).flat();
  const { named, total, rate } = sceneRate(lessons, surnames);
  const pct = Math.round(100 * rate);
  const recorded = Object.prototype.hasOwnProperty.call(debt, name);
  if(!total){ console.log(`· ${name}: no scenes to measure`); return 0; }
  if(rate >= FLOOR){
    console.log(`${recorded ? '✗' : '·'} ${name}: ${named} of ${total} scene(s) name somebody (${pct}%)`);
    if(recorded){
      console.log(`  ✗ above the floor now — delete "${name}" from ${DEBT.split('/').pop()}`);
      return 1;
    }
    return 0;
  }
  console.log(`${recorded ? '·' : '✗'} ${name}: only ${named} of ${total} scene(s) name somebody (${pct}%) —`
    + ' the cast is introduced in the stakes and then absent from every question');
  if(!recorded){
    console.log(`  ✗ not recorded in ${DEBT.split('/').pop()}`);
    return 1;
  }
  return 0;
}

// --- selftest ------------------------------------------------------------
// The case that has to PASS is a scene whose subject is an instrument. A gate
// that demanded a name in every scene would be a gate about style.
function selftest(){
  const roster = [{ name: 'Ines Calloway' }, { name: 'Dr. Camila Reyes' },
                  { name: 'Chief Petty Officer Dario Ferro' }, { name: 'Kovač' }];
  const sn = surnamesOf(roster);
  const cases = [
    { name: 'surnames are the last word, past a rank or a courtesy title',
      got: () => sn.sort().join(','), expect: 'Calloway,Ferro,Kovač,Reyes' },
    { name: 'a scene naming somebody counts',
      got: () => sceneRate([{ scene: 'Calloway has the landings book open at two pages.' }], sn).named,
      expect: 1 },
    { name: 'an institutional scene names nobody',
      got: () => sceneRate([{ scene: 'The Theoretical Division needs a reaction rate.' }], sn).named,
      expect: 0 },
    { name: 'a first name alone is not matched — two rosters share "Ines"',
      got: () => sceneRate([{ scene: 'Ines wants the number before nine.' }], sn).named,
      expect: 0 },
    { name: 'a rank in the scene still matches on the surname',
      got: () => sceneRate([{ scene: 'Chief Ferro says the water is winning below.' }], sn).named,
      expect: 1 },
    { name: 'an empty scene is not counted either way',
      got: () => sceneRate([{ scene: '' }, { scene: 'Kovač taped the crown.' }], sn).total,
      expect: 1 },
  ];
  let failed = 0;
  for(const c of cases){
    const got = c.got();
    const ok = String(got) === String(c.expect);
    if(!ok) failed++;
    console.log(`  ${ok ? '✓' : '✗'} ${c.name} — expected ${c.expect}, got ${got}`);
  }
  if(failed){
    console.log(`\n✗ sceneCast selftest: ${failed} case(s) wrong`);
    return 1;
  }
  console.log(`\n✓ sceneCast selftest: ${cases.length} case(s), and a scene about an instrument is not a defect`);
  return 0;
}

const args = process.argv.slice(2);
if(args.includes('--selftest')) process.exit(selftest());
const names = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? themeNames() : args.filter(a => !a.startsWith('--'));
const debt = loadDebt();
let failed = 0;
for(const n of names) failed += await runTheme(n, debt);
if(failed){
  console.log(`\n✗ sceneCast: ${failed} theme(s) whose scene-cast rate is unrecorded.`);
  process.exit(1);
}
console.log(`\n✓ sceneCast: ${names.length} theme(s) measured; every one below the floor is recorded.`);
