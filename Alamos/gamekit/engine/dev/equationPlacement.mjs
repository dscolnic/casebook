// equationPlacement.mjs — an equation appears where it is used, and nowhere else.
//
//   node engine/dev/equationPlacement.mjs <theme>
//   node engine/dev/equationPlacement.mjs --all
//   node engine/dev/equationPlacement.mjs --selftest
//   node engine/dev/equationPlacement.mjs --write-debt     to bank the unused list
//
// THE RULE, in the product owner's words: an equation is shown on a day card only
// if a question that day uses it, and in the background of that question. It
// should not be anywhere else.
//
// WHY THIS NEEDS A GATE. `equationsFor` in `tools/import-book.mjs` attaches an
// equation to any stop whose prose MENTIONS it, and its own header admits that is
// "right for a stop that uses it and wrong everywhere else". Two softer rules used
// to contain it — drop it before the day it is first computed, cap at two per
// card — and what shipped anyway was 894 chips of 1,530 on cards that compute
// nothing: Faraday's law over a funding decision in Red Sand, residence time over
// a resin-breakthrough question, the boil-off formula over "why is the tank filled
// to 95 per cent". `cardLoad.mjs` named this failure in its own header and nothing
// enforced it.
//
// The accessibility pass is what settled it. That pass writes glosses which
// deliberately cross-reference earlier cards — "Faraday's law makes that exact",
// "the overpotential you met in the hall" — and every one of those is a prose
// mention, so better teaching produced more decoration. A rule that punishes the
// thing you want is a rule to replace, not to tune.
//
// WHAT IS ENFORCED
//
//   1. HARD. No card carries an equation it does not use. `computed` means the
//      stop works the numbers; `demanded` means its options or verdict do
//      (`demandsEquation` is the shared test). Anything else on a card is
//      decoration and fails.
//   2. HARD. No day card carries an equation that none of that day's own stops
//      uses. The day card is assembled by `primeEquations` at load, not at
//      import, so this normalises the content the way the engine does rather
//      than reading the file and hoping.
//   3. RATCHETED. Equations on a course's syllabus that NO question anywhere
//      computes or demands. Those now appear nowhere in the game at all, which is
//      correct — a decorative chip taught nobody — but it means the syllabus
//      promises something the campaign never teaches. 43 across the catalogue
//      today, recorded in equation-placement-debt.json. The list may shrink and
//      may not grow: a new equation added to a syllabus needs a question that
//      uses it.
//
// WHAT IT DOES NOT CHECK. Whether the equation shown is the RIGHT one for the
// panel's arithmetic — `validateContent.mjs` already owns that, and it caught two
// mis-stamps the moment rule 1 stopped hiding them behind a crowd of chips
// (aftershock MAT-5, contamcity TREAT-9: the notation in the syllabus differs from
// the notation in the panel, so the matcher stamped the wrong equation).
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { themeNames, themeDir } from './registry.mjs';

const here = dirname(new URL(import.meta.url).pathname);
const DEBT_FILE = resolve(here, 'equation-placement-debt.json');

/** Does this card use the equation, as opposed to merely naming it? */
export const uses = (eq) => !!(eq?.computed || eq?.demanded);

/**
 * The three findings for one campaign.
 *
 * `content` must already be normalised — `primeEquations` builds the day cards at
 * load, so a gate that reads the generated `missions.js` straight off disk sees no
 * day equations at all and passes every campaign by measuring an empty set. That
 * is the `discoveryHistory` mistake, recorded in this repo's own check list.
 */
export function findings(content){
  const curriculum = content?.CURRICULUM ?? {};
  const missions = content?.MISSIONS ?? [];
  const onCards = [], onDays = [], usedAnywhere = new Set(), allEq = new Set();

  for(const [area, lessons] of Object.entries(curriculum)){
    (lessons ?? []).forEach((l, i) => {
      for(const eq of l?.equations ?? []){
        if(!eq?.e) continue;
        allEq.add(eq.e);
        if(uses(eq)) usedAnywhere.add(eq.e);
        else onCards.push({ id: `${area}-${i + 1}`, title: l?.title ?? '', type: l?.game?.type ?? '', e: eq.e });
      }
    });
  }

  missions.forEach((m, mi) => {
    const dayUses = new Set();
    for(const st of m?.stops ?? []){
      const l = curriculum[st?.group]?.[st?.lesson];
      for(const eq of l?.equations ?? []) if(uses(eq)) dayUses.add(eq.e);
    }
    for(const eq of m?.equations ?? []){
      if(eq?.e && !dayUses.has(eq.e)) onDays.push({ day: mi + 1, title: m?.title ?? '', e: eq.e });
    }
  });

  const unused = [...allEq].filter(e => !usedAnywhere.has(e)).sort();
  return { onCards, onDays, unused };
}

async function contentOf(themeName){
  const theme = (await import(pathToFileURL(resolve(themeDir(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  return content;
}

const readDebt = () => existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : { themes: {} };

// ---------------------------------------------------------------- selftest
function selftest(){
  const cases = [];
  const eq = (e, f = {}) => ({ e, c: 'a caption', ...f });
  const T = (lessonEqs, dayEqs, stop = { group: 'A', lesson: 0 }) => ({
    CURRICULUM: { A: [{ title: 't', game: { type: 'CHOICE' }, equations: lessonEqs }] },
    MISSIONS: [{ title: 'day one', stops: [stop], equations: dayEqs }],
  });

  // 1. A card that USES its equation is clean, whether it computes it or its
  //    options do. Both flags are a use; only a bare mention is not.
  for(const flag of ['computed', 'demanded']){
    const f = findings(T([eq('a = b', { [flag]: true })], [eq('a = b', { [flag]: true })]));
    cases.push([`an equation the card ${flag === 'computed' ? 'computes' : 'is worked from'} is clean`,
      f.onCards.length === 0 && f.onDays.length === 0 && f.unused.length === 0]);
  }

  // 2. THE DEFECT. A mention-only chip on a card fails, and the SAME equation on
  //    the day card fails with it — because nothing that day uses it. This is
  //    Red Sand's ELEC-5 exactly: Faraday's law over a funding decision.
  const bad = findings(T([eq('m = (I t / nF) × M')], [eq('m = (I t / nF) × M')]));
  cases.push(['a mention-only chip on a card is caught', bad.onCards.length === 1]);
  cases.push(['and the same equation on the day card is caught', bad.onDays.length === 1]);

  // 3. A day card may not carry an equation NO stop that day uses, even when some
  //    other day computes it. The old code deduped across the whole campaign with
  //    one `seen` set, so this case was structurally unreachable and untested.
  const strayDay = findings(T([eq('a = b', { computed: true })], [eq('z = y', { computed: true })]));
  cases.push(['a day card equation no stop that day uses is caught', strayDay.onDays.length === 1
    && strayDay.onDays[0].e === 'z = y']);

  // 4. THE EQUALITY CASE. Two campaigns whose equations differ only in which flag
  //    marks the use must score the same. A first version tested `eq.computed`
  //    alone and reported every `demanded` chip in the catalogue as decoration —
  //    286 false findings, which is how a gate stops being read.
  const a = findings(T([eq('a = b', { computed: true })], []));
  const b = findings(T([eq('a = b', { demanded: true })], []));
  cases.push(['computed and demanded score identically',
    a.onCards.length === b.onCards.length && a.unused.length === b.unused.length]);

  // 5. An equation on the syllabus that no question uses is reported as unused
  //    rather than as a card defect — it is a curriculum gap, not decoration.
  const orphan = findings(T([eq('Kₛₚ = [Aᵃ][Bᵇ]')], []));
  cases.push(['an equation nothing uses is reported unused', orphan.unused.length === 1]);
  cases.push(['and is not double-counted as a clean card', orphan.onCards.length === 1]);

  let bad2 = 0;
  for(const [name, ok] of cases){
    console.log(`  ${ok ? '✓' : '✗'} ${name}`);
    if(!ok) bad2++;
  }
  console.log(bad2 ? `equationPlacement --selftest: ${bad2} case(s) failed.`
    : `equationPlacement --selftest: ${cases.length} cases, the gate knows a use from a mention.`);
  return bad2 ? 1 : 0;
}

// ---------------------------------------------------------------- run
const isEntry = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(isEntry){
  const argv = process.argv.slice(2);
  if(argv.includes('--selftest')) process.exit(selftest());

  const writeDebt = argv.includes('--write-debt');
  const named = argv.filter(a => !a.startsWith('--'));
  const wanted = named.length ? named : themeNames();
  const debt = readDebt();
  let failed = 0;

  for(const theme of wanted){
    let content;
    try { content = await contentOf(theme); } catch { continue; }
    const { onCards, onDays, unused } = findings(content);

    if(writeDebt){
      if(unused.length) debt.themes[theme] = unused; else delete debt.themes[theme];
      continue;
    }

    const problems = [];
    for(const r of onCards)
      problems.push(`${r.id} (${r.type}) "${r.title}" carries "${r.e}" and does not use it`);
    for(const r of onDays)
      problems.push(`day ${r.day} "${r.title}" shows "${r.e}" and no stop that day uses it`);

    const banked = debt.themes?.[theme] ?? [];
    const grew = unused.filter(e => !banked.includes(e));
    const fixed = banked.filter(e => !unused.includes(e));
    for(const e of grew)
      problems.push(`"${e}" is on the syllabus and no question computes or is worked from it — `
        + `it now appears nowhere in the game. Give it a question, or take it off the syllabus.`);
    for(const e of fixed)
      problems.push(`"${e}" is banked as unused and now IS used — delete that line from `
        + `equation-placement-debt.json so the file cannot become a standing excuse.`);

    if(problems.length){
      console.log(`✗ ${theme}`);
      for(const p of problems) console.log(`    ✗ ${p}`);
      failed++;
    } else {
      console.log(`✓ ${theme.padEnd(22)} every equation sits on a card that uses it`
        + (unused.length ? `; ${unused.length} recorded as taught nowhere` : ''));
    }
  }

  if(writeDebt){
    debt._ = 'Equations on a course syllabus that NO question computes or is worked from. They appear '
      + 'nowhere in the game, which is correct — a decorative chip taught nobody — but the syllabus is '
      + 'promising something the campaign never teaches. engine/dev/equationPlacement.mjs fails a theme '
      + 'that GAINS one, and also fails a line that has since been fixed, naming it for deletion, so the '
      + 'file only shrinks. Give the equation a question that uses it, or take it off the syllabus in '
      + 'tools/syllabus.js.';
    writeFileSync(DEBT_FILE, JSON.stringify(debt, null, 2) + '\n');
    const n = Object.values(debt.themes ?? {}).reduce((a, v) => a + v.length, 0);
    console.log(`banked ${n} unused equation(s) across ${Object.keys(debt.themes ?? {}).length} theme(s)`);
    process.exit(0);
  }
  console.log(failed ? `\nequationPlacement: ${failed} theme(s) failed.`
    : `\nequationPlacement: ${wanted.length} theme(s) checked.`);
  process.exit(failed ? 1 : 0);
}
