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
// The matcher is names from the THEME'S OWN roster — a surname, or a given name
// that belongs to exactly one person on it. It was surnames only, on the
// argument that "Ines" appears in two rosters and "Marta" in three; that is
// true and it is about two campaigns, and this is measured inside one. Boomtown
// writes every scene with the short name its §4 declares — "Nico shows you the
// record: the diner has a full queue…" — and read for surnames its sixty scenes
// named nobody at all, which is the opposite of what they do. A given name that
// two of this campaign's own people share is still ambiguous and is still not
// matched.
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEBT = resolve(HERE, 'scenecast-debt.json');
const FLOOR = 0.10;

/**
 * The names worth matching: every capitalised part of a roster name.
 *
 * SURNAMES ALONE ARE NOT HOW EVERY CAMPAIGN WRITES ITS PEOPLE. Boomtown's §4
 * gives each person an "Allowed short name" and its sixty scenes use it —
 * "Nico shows you the record: the diner has a full queue…" — so measured on
 * surnames the campaign read as naming nobody in any scene, which is the exact
 * opposite of what it does. A scene that says Nico names Nico Bell as surely as
 * one that says Bell.
 *
 * A rank or a courtesy title is not a name, and neither is a one-letter
 * initial: "Dr." and "Chief Petty Officer" are prefixes here.
 */
export function surnamesOf(roster){
  const TITLE = /^(dr|mr|mrs|ms|miss|prof|professor|sir|dame|capt|captain|lt|sgt|chief|petty|officer|the|of|van|von|de|del|la|le)$/i;
  const word = (w) => String(w ?? '').replace(/\.$/, '');
  const usable = (w) => word(w).length > 2 && /^[A-Z]/.test(w) && !TITLE.test(word(w));
  const out = new Set();
  const given = new Map();          // a given name -> how many people carry it
  for(const p of roster ?? []){
    const parts = String(p?.name ?? '').split(/\s+/).filter(usable);
    const last = parts.at(-1);
    if(last) out.add(word(last));
    for(const w of parts.slice(0, -1)){
      given.set(word(w), (given.get(word(w)) ?? 0) + 1);
    }
  }
  // A given name only two of this campaign's own people share names neither.
  for(const [name, n] of given) if(n === 1) out.add(name);
  return [...out];
}

export function sceneRate(lessons, surnames){
  let named = 0, total = 0;
  for(const l of lessons ?? []){
    const scene = String(l?.scene ?? '').trim();
    if(!scene) continue;
    total++;
    // On a word boundary: "Penn" must not match "Pennine", and a short given
    // name is exactly where that would start to happen.
    if(surnames.some(s => new RegExp(`\\b${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(scene))) named++;
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
    { name: 'a surname is the last word, past a rank or a courtesy title',
      got: () => sn.filter(x => ['Calloway', 'Ferro', 'Kovač', 'Reyes'].includes(x)).sort().join(','),
      expect: 'Calloway,Ferro,Kovač,Reyes' },
    { name: '…and a given name only one of them carries is a name too',
      got: () => ['Camila', 'Dario', 'Ines'].filter(x => sn.includes(x)).sort().join(','),
      expect: 'Camila,Dario,Ines' },
    { name: 'a rank or a courtesy title is neither',
      got: () => sn.filter(x => /^(Dr|Chief|Petty|Officer)$/.test(x)).length, expect: 0 },
    { name: 'a scene naming somebody counts',
      got: () => sceneRate([{ scene: 'Calloway has the landings book open at two pages.' }], sn).named,
      expect: 1 },
    { name: 'an institutional scene names nobody',
      got: () => sceneRate([{ scene: 'The Theoretical Division needs a reaction rate.' }], sn).named,
      expect: 0 },
    { name: 'a given name this roster makes unambiguous is matched',
      got: () => sceneRate([{ scene: 'Ines wants the number before nine.' }], sn).named,
      expect: 1 },
    { name: '…but one two of its own people share is not',
      got: () => sceneRate([{ scene: 'Ines wants the number before nine.' }],
        surnamesOf([{ name: 'Ines Calloway' }, { name: 'Ines Ferro' }])).named,
      expect: 0 },
    { name: 'a name inside a longer word is not a name',
      got: () => sceneRate([{ scene: 'The Calloways Ridge survey is late.' }], sn).named,
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
