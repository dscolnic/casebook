// conceptVisible.mjs — is the concept on the card the player answers from, and
// does the course's own vocabulary reach every question?
//
//   node engine/dev/conceptVisible.mjs <theme>
//   node engine/dev/conceptVisible.mjs --all
//   node engine/dev/conceptVisible.mjs --selftest
//
// ## Why this exists
//
// A stop carries a `concept:` and the importer stamps a key concept on it, and
// both of those are metadata. `conceptOrder` asserts the concepts arrive in a
// followable order and `curriculumDelivery` asserts every equation is computed
// somewhere — but nothing asserted that the concept is *visible to the player at
// the moment they answer*. A card can be assigned "Le Châtelier: pressure,
// temperature and taking a product away", teach it perfectly in its background
// paragraphs, and ask a question in which neither the idea nor any of its words
// appears. The player answers correctly, the gates are green, and what they
// practised was reading comprehension.
//
// So three findings, and the first two are about one card while the third is
// about the campaign:
//
//   UNNAMED   the stop's own concept is not named in the question or in any of
//             the options — only in the scene, the guide, the background or the
//             verdict, which are the parts a player can skip or which arrive
//             after the answer is in.
//
//   BURIED    the same, and the card is carrying a load of the campaign's own
//             glossary terms while it happens. This is the "too technical and we
//             lose the concept" case: the card is not thin, it is dense in the
//             wrong vocabulary. A card with no concept and no jargon is merely
//             UNNAMED; a card with no concept and five glossary terms is a card
//             whose detail has crowded out its subject.
//
//   UNREACHED a syllabus concept that no question in the campaign names, in the
//             ask or in an option. `curriculumDelivery` asks this of equations.
//             Nothing asked it of concepts, and a concept the questions never
//             say out loud is a concept the course did not teach in the only
//             place the player is paying attention.
//
// ## What it does NOT do
//
// It does not read the scene, the guide, the background or the verdict. That is
// the whole point: those four are where a concept hides. `conceptZones` in
// tools/syllabus.js already splits a stop into exactly these zones and the two
// this reads are `ask` and `option` — the same split `conceptMatches` scores, so
// there is one description of what "the question" and "an option" mean.
//
// It also does not define "technical" for itself. The campaign's own glossary is
// the list of words this course treats as hard, and it is matched with
// `keywordHit`, the same matcher the concepts use. A second definition of either
// is how two gates start disagreeing about the same card.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { SYLLABUS, conceptZones, keywordHit } from '../../tools/syllabus.js';

const DEBT_FILE = 'engine/dev/conceptvisible-debt.json';

/**
 * How many of the campaign's own glossary terms have to be on a card before an
 * unnamed concept counts as buried rather than merely absent.
 *
 * Four, and the number is measured rather than chosen. Across the 2,184 question
 * cards on the 62 shipped themes the distribution is: 0 terms on 1,015 cards,
 * 1 on 580, 2 on 314, 3 on 150, 4 on 69, and a tail of 56 above that — median 1,
 * p75 2, p90 3, p95 4, max 8. So four is the 95th percentile: the point at which
 * a card is unusually dense in its own course's vocabulary. Below it, an unnamed
 * concept is a thin card and UNNAMED says so; at or above it, the subject has
 * been crowded out by detail, which is a different edit.
 */
export const BURIED_TERM_LOAD = 4;

/** The syllabus concepts for a theme, under either spelling of its name. */
export function conceptsFor(themeName) {
  const s = SYLLABUS[themeName] ?? SYLLABUS[String(themeName).replace(/_/g, '-')];
  return s?.concepts ?? [];
}

/**
 * The two zones a player answers from, as one string each.
 *
 * `conceptZones` is the shared split, so a change to what counts as an option —
 * a new instrument's labels, say — reaches this gate without being restated here.
 */
export function askAndOptions(lesson) {
  const z = conceptZones(lesson, lesson?.game ?? {}, lesson?.assumes ?? []);
  return { ask: String(z.ask ?? ''), option: String(z.option ?? '') };
}

/**
 * Whether a concept is named in a piece of text.
 *
 * A concept is named if any of its syllabus keywords is hit, or if its title's
 * own distinctive words are. The keywords are the syllabus's own answer to "what
 * does naming this look like", which is why they are preferred; the title is the
 * fallback for a concept whose keyword list is thin.
 *
 * Word boundaries come from `keywordHit`, which is the same matcher the importer
 * stamps concepts with — so "rate" does not match "accurate", and a keyword
 * written as a stem ("amplif") still matches "amplifies".
 */
export function namesConcept(text, concept) {
  const hay = String(text ?? '');
  if (!hay.trim() || !concept) return false;
  for (const k of concept.k ?? []) if (keywordHit(hay, k)) return true;
  // The title's own words, minus the connectives, so "Site effect: soft ground
  // amplifies" is named by "soft ground" as well as by its keyword list.
  for (const w of titleWords(concept.c)) if (keywordHit(hay, w)) return true;
  return false;
}

const TITLE_STOPWORDS = new Set(['and', 'the', 'a', 'an', 'of', 'to', 'in', 'on', 'is', 'it',
  'its', 'for', 'from', 'with', 'what', 'why', 'how', 'that', 'this', 'not', 'as', 'at', 'by',
  'or', 'but', 'one', 'two', 'every', 'each', 'when', 'where', 'which', 'who', 'does', 'do',
  'are', 'was', 'were', 'be', 'been', 'has', 'have', 'had', 'can', 'cannot', 'will', 'would',
  'they', 'their', 'them', 'there', 'here', 'than', 'then', 'into', 'out', 'up', 'down', 'over',
  'under', 'about', 'against', 'between', 'before', 'after', 'still', 'only', 'both', 'all',
  'something', 'anything', 'nothing', 'nobody', 'somebody', 'anybody', 'you', 'your', 'own',
  'means', 'thing', 'things', 'way', 'ways', 'part', 'parts', 'kind', 'kinds', 'set', 'sets',
  'runs', 'goes', 'gets', 'makes', 'made', 'take', 'takes', 'taken', 'put', 'puts', 'say',
  'says', 'said', 'read', 'reads', 'reading', 'looks', 'look', 'stops', 'stop', 'starts',
  'start', 'much', 'many', 'more', 'less', 'least', 'most', 'same', 'different', 'first',
  'last', 'next', 'new', 'old', 'long', 'short', 'big', 'small', 'good', 'bad', 'right',
  'wrong', 'real', 'true', 'false']);

/** The words in a concept title that carry the concept, longest first. */
export function titleWords(title) {
  return String(title ?? '')
    .split(/[^A-Za-z0-9’'-]+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 5 && !TITLE_STOPWORDS.has(w.toLowerCase()))
    .sort((a, b) => b.length - a.length);
}

/** Which of the campaign's glossary terms appear on the card. */
export function termsOnCard(text, jargon) {
  const hay = String(text ?? '');
  const out = new Set();
  for (const entry of jargon ?? []) {
    const term = typeof entry === 'string' ? entry : (entry?.term ?? entry?.word ?? entry?.name);
    if (!term || String(term).trim().length < 3) continue;
    if (keywordHit(hay, String(term))) out.add(String(term).toLowerCase());
  }
  return [...out];
}

/**
 * One stop, judged. Returns null when the stop has no resolvable concept — that
 * is `conceptOrder`'s finding, not this one, and reporting it twice would make
 * both gates noisier without adding a fact.
 */
export function judgeLesson(lesson, concepts, jargon) {
  // The importer stamps `concept` as the resolved syllabus entry — `{ n, c, of,
  // rests }` — while a book and this file's own selftest write it as the title
  // string. Read both, because reading only the one shape is how a checker
  // reports zero findings and looks like a pass.
  const c = lesson?.concept;
  const name = String((c && typeof c === 'object' ? c.c : c) ?? '').trim();
  if (!name) return null;
  const concept = concepts.find((c) => c.c === name);
  if (!concept) return null;
  const { ask, option } = askAndOptions(lesson);
  const inAsk = namesConcept(ask, concept);
  const inOption = namesConcept(option, concept);
  const terms = termsOnCard(`${ask} ${option}`, jargon);
  return {
    title: String(lesson?.title ?? ''),
    concept: name,
    named: inAsk || inOption,
    where: inAsk ? 'ask' : inOption ? 'option' : null,
    terms,
    buried: !(inAsk || inOption) && terms.length >= BURIED_TERM_LOAD,
  };
}

/**
 * Which syllabus concepts no question in the campaign names.
 *
 * Deliberately measured over every lesson's ask and options rather than over the
 * lessons assigned that concept: a concept named out loud by a card assigned to
 * a neighbouring concept has still reached the player, and this gate is about
 * whether the words arrive at all.
 */
export function coverage(lessons, concepts, meta = true) {
  const said = new Set();
  for (const l of lessons) {
    const { ask, option } = askAndOptions(l);
    const hay = `${ask} ${option}`;
    for (const c of concepts) if (namesConcept(hay, c)) said.add(c.c);
  }
  return concepts
    .filter((c) => !said.has(c.c))
    .filter((c) => (meta ? true : !c.m))
    .map((c) => ({ concept: c.c, meta: !!c.m }));
}

/** Every lesson in a theme, flattened out of CURRICULUM, plus the glossary. */
export async function readTheme(themeName) {
  const dir = resolveTheme(themeName);
  const theme = (await import(pathToFileURL(resolve(dir, 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = { ...theme.content };
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const lessons = Object.values(content.CURRICULUM ?? {}).flat();
  return { lessons, jargon: content.JARGON ?? [], grade: theme?.audience?.grade };
}

// --------------------------------------------------------------------- report
const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (RAN_DIRECTLY) {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) selftest();
  else {
    const writeDebt = args.includes('--write-debt');
    const verbose = args.includes('--verbose');
    const debt = existsSync(DEBT_FILE)
      ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : { _comment: '', themes: {} };
    const wanted = args.includes('--all') || !args.find((a) => !a.startsWith('--'))
      ? themeNames() : [args.find((a) => !a.startsWith('--'))];

    let failures = 0;
    const banked = {};
    for (const themeName of wanted) {
      const concepts = conceptsFor(themeName);
      if (!concepts.length) continue;
      let info;
      try { info = await readTheme(themeName); }
      catch (err) { console.log(`✗ ${themeName}: cannot load theme — ${err.message}`); failures++; continue; }

      const rows = info.lessons.map((l) => judgeLesson(l, concepts, info.jargon)).filter(Boolean);
      const unnamed = rows.filter((r) => !r.named && !r.buried);
      const buried = rows.filter((r) => r.buried);
      const unreached = coverage(info.lessons, concepts);
      const listed = new Set(debt.themes?.[themeName] ?? []);
      const key = (kind, id) => `${kind}:${id}`;
      const gaps = [
        ...unnamed.map((r) => key('unnamed', r.title)),
        ...buried.map((r) => key('buried', r.title)),
        ...unreached.map((u) => key('unreached', u.concept)),
      ];
      banked[themeName] = gaps;

      const say = (line, k) => {
        if (listed.has(k)) { if (verbose) console.log(`  · ${line} (recorded debt)`); return; }
        console.log(`  ✗ ${line}`);
        failures++;
      };

      const total = rows.length;
      const namedCount = rows.filter((r) => r.named).length;
      console.log(`\n=== ${themeName} — ${namedCount} of ${total} question cards name their own `
        + `concept · ${unreached.length} of ${concepts.length} concepts reach no question`);

      for (const r of buried) {
        say(`BURIED "${r.title}" — asks about "${r.concept}" and names it nowhere in the question `
          + `or the options, while carrying ${r.terms.length} glossary term(s): `
          + `${r.terms.slice(0, 6).join(', ')}`, key('buried', r.title));
      }
      for (const r of unnamed) {
        say(`UNNAMED "${r.title}" — asks about "${r.concept}" and names it nowhere in the question `
          + 'or the options', key('unnamed', r.title));
      }
      for (const u of unreached) {
        say(`UNREACHED "${u.concept}"${u.meta ? ' (a skill, not a topic)' : ''} — no question in `
          + 'the campaign names it, in the ask or in an option', key('unreached', u.concept));
      }
      for (const k of listed) {
        if (gaps.includes(k)) continue;
        console.log(`  ✗ ${DEBT_FILE} lists ${k} for ${themeName}, which passes now — delete the line`);
        failures++;
      }
    }

    if (writeDebt) {
      debt._comment = debt._comment || 'Question cards that never name their own curriculum concept '
        + '(UNNAMED), cards that do that while dense in the campaign\'s own glossary (BURIED), and '
        + 'syllabus concepts no question names at all (UNREACHED). engine/dev/conceptVisible.mjs. '
        + 'Only the question and its options are read — never the scene, guide, background or '
        + 'verdict, because those are the four places a concept hides. A gap not listed here fails '
        + 'now; one listed here that passes fails too, naming the line to delete.';
      debt.themes = { ...(debt.themes ?? {}) };
      for (const [t, gaps] of Object.entries(banked)) {
        if (gaps.length) debt.themes[t] = gaps; else delete debt.themes[t];
      }
      writeFileSync(DEBT_FILE, `${JSON.stringify(debt, null, 2)}\n`);
      console.log(`\nwrote ${DEBT_FILE}`);
      process.exit(0);
    }

    console.log(failures ? `\n${failures} problem(s).`
      : `\n✓ ${wanted.length} theme(s): every question names the concept it teaches, and every `
        + 'concept reaches a question.');
    process.exit(failures ? 1 : 0);
  }
}

// ------------------------------------------------------------------ selftest
/**
 * The pairs are the point.
 *
 * A gate like this is easy to write so that it reports something plausible and
 * measures the wrong thing — the failure this repo has paid for twenty times. So
 * the cases below are mostly equalities: two cards that should score the same
 * have to score the same, whatever spelling or zone they use.
 *
 * PUT THE BUG BACK to see it work. Drop the word boundary from `keywordHit` (in
 * tools/syllabus.js, match the bare keyword anywhere) and the substring case
 * fails and only it. Read `scene` as well as `ask`/`option` in `askAndOptions`
 * and the "the scene does not count" case fails and only it. Lower
 * `BURIED_TERM_LOAD` to 1 and the "thin is not buried" case fails and only it.
 */
export function selftest() {
  const cases = [];
  const is = (name, got, want) => cases.push({ name, ok: got === want, saw: `${got}, wanted ${want}` });
  const eq = (name, a, b) => cases.push({ name, ok: a === b, saw: `${a} vs ${b}` });

  const RATE = { c: 'Rate constants, and how steeply they climb with temperature',
    k: ['rate constant', 'arrhenius', 'rate law'] };
  const SITE = { c: 'Site effect: soft ground amplifies',
    k: ['site effect', 'amplif', 'soft soil'] };
  const JARGON = ['activation energy', 'catalyst', 'equilibrium', 'exothermic', 'overpotential',
    'stoichiometry'];

  const card = (game, extra = {}) => ({ concept: RATE.c, title: 't', game, ...extra });

  // 1. THE ZONE PAIR. Naming the concept in the question and naming it in an
  //    option are both naming it, because the player reads both before answering.
  const inAsk = judgeLesson(card({ question: 'Which rate constant rises faster?',
    choices: ['the colder bed', 'the hotter bed', 'neither'] }), [RATE], JARGON);
  const inOpt = judgeLesson(card({ question: 'Which bed gets there first?',
    choices: ['the one whose rate constant is larger', 'the colder bed', 'neither'] }), [RATE], JARGON);
  eq('named in the question and named in an option both count',
    inAsk.named, inOpt.named);
  is('and it is named', inAsk.named, true);

  // 2. THE ZONES THAT DO NOT COUNT. The same sentence in the scene, the guide,
  //    the background or the verdict is not the player being asked about it.
  const onlyScene = judgeLesson(card(
    { question: 'Which bed gets there first?', choices: ['the colder', 'the hotter', 'neither'],
      why: 'The rate constant climbs with temperature.' },
    { scene: 'Kaur has the rate constant plotted against temperature.',
      guide: 'Ask what the rate constant does.',
      background: ['The rate constant is the whole of this.'] }), [RATE], JARGON);
  is('the scene, guide, background and verdict do not count', onlyScene.named, false);

  // 2b. THE OPTION-TEXT PAIR. A proposal is `{ label: 'A', text: '…' }`, and the
  //     zone splitter used to take the label alone — so a nineteen-stop campaign's
  //     whole option zone was the string "A B C". A concept named in an option the
  //     player reads must score the same however that option is shaped.
  const plainOpt = judgeLesson(card({ question: 'Which bed gets there first?',
    choices: ['the one whose rate constant is larger', 'the colder bed', 'neither'] }),
    [RATE], JARGON);
  const shapedOpt = judgeLesson(card({ question: 'Which bed gets there first?',
    proposals: [{ label: 'A', text: 'the one whose rate constant is larger' },
      { label: 'B', text: 'the colder bed' }, { label: 'C', text: 'neither' }] }),
    [RATE], JARGON);
  eq('a string option and a {label,text} option score the same',
    plainOpt.named, shapedOpt.named);
  is('and both are named', shapedOpt.named, true);

  // 2c. A REBUTTAL IS NOT AN OPTION. It prints after the answer is in, so a card
  //     cannot be credited with naming its concept through one.
  const onlyRebuttal = judgeLesson(card({ question: 'Which bed gets there first?',
    choices: ['the colder', 'the hotter', 'neither'],
    rebuttals: ['The rate constant climbs steeply with temperature.'] }), [RATE], JARGON);
  is('a concept named only in a rebuttal is not named', onlyRebuttal.named, false);

  // 3. THE SUBSTRING TRAP. "rate" is inside "accurate", and a gate that greps
  //    without boundaries reports a card as naming a concept it never mentions.
  const RATE_ONLY = { c: 'Rate', k: ['rate'] };
  const substring = judgeLesson({ concept: RATE_ONLY.c, title: 't',
    game: { question: 'Which reading is more accurate here?',
      choices: ['the first', 'the second', 'neither'] } }, [RATE_ONLY], JARGON);
  is('a keyword inside a longer word is not a mention', substring.named, false);

  // 3b. THE HYPHEN PAIR. This one was a published finding before it was found to
  //     be false: the syllabus writes `freezing point depression`, a card wrote
  //     `freezing-point depression` in its ask, and the gate reported the concept
  //     as reaching no question in the whole campaign. A hyphen is not a different
  //     word, and the player cannot see the difference at all.
  const COLL = { c: 'Colligative properties', k: ['freezing point depression', 'colligative'] };
  const spaced = judgeLesson({ concept: COLL.c, title: 't',
    game: { question: 'Use freezing point depression to decide whether the pond freezes.',
      choices: ['a', 'b', 'c'] } }, [COLL], JARGON);
  const hyphened = judgeLesson({ concept: COLL.c, title: 't',
    game: { question: 'Use freezing-point depression to decide whether the pond freezes.',
      choices: ['a', 'b', 'c'] } }, [COLL], JARGON);
  eq('a hyphen and a space in a keyword score the same', spaced.named, hyphened.named);
  is('and both are named', hyphened.named, true);
  is('coverage agrees, so a hyphen cannot invent an UNREACHED concept',
    coverage([{ concept: COLL.c,
      game: { question: 'Use freezing-point depression here.', choices: ['a', 'b', 'c'] } }],
      [COLL]).length, 0);

  // 4. THE STEM KEYWORD. A syllabus keyword written as a stem matches the word
  //    it is a stem of, and the two spellings score the same.
  const amp1 = judgeLesson({ concept: SITE.c, title: 't',
    game: { question: 'Where does the fill amplify the shaking?', choices: ['a', 'b', 'c'] } },
    [SITE], JARGON);
  const amp2 = judgeLesson({ concept: SITE.c, title: 't',
    game: { question: 'Where does the site effect show up?', choices: ['a', 'b', 'c'] } },
    [SITE], JARGON);
  eq('a stem keyword and a literal keyword score the same', amp1.named, amp2.named);
  is('and both are named', amp1.named, true);

  // 5. THIN IS NOT BURIED. A card that names nothing and carries no course
  //    vocabulary is a thin card, which is a different edit from a card whose
  //    subject has been crowded out.
  const thin = judgeLesson(card({ question: 'Which bed gets there first?',
    choices: ['the colder', 'the hotter', 'neither'] }), [RATE], JARGON);
  is('an unnamed card with no glossary terms is unnamed, not buried', thin.buried, false);
  is('and it is reported as unnamed', thin.named, false);

  const dense = judgeLesson(card({
    question: 'With the catalyst in and the equilibrium held, which exothermic step sets the '
      + 'stoichiometry?',
    choices: ['the first', 'the second', 'neither'] }), [RATE], JARGON);
  is('an unnamed card dense in glossary terms is buried', dense.buried, true);
  cases.push({ name: 'and the load it reports is the terms actually on the card',
    ok: dense.terms.length >= BURIED_TERM_LOAD, saw: dense.terms.join(', ') });

  // 6. NAMING BEATS DENSITY. A dense card that does name its concept is neither
  //    finding — density is only a problem when the subject has gone missing.
  const denseNamed = judgeLesson(card({
    question: 'With the catalyst in and the equilibrium held, which rate constant is larger?',
    choices: ['the first', 'the second', 'neither'] }), [RATE], JARGON);
  is('a dense card that names its concept is not a finding', denseNamed.buried, false);
  is('and it is named', denseNamed.named, true);

  // 7. COVERAGE READS THE WHOLE CAMPAIGN, not the assignment. A concept named by
  //    a card assigned to a different concept has still reached the player.
  const lessons = [
    { concept: RATE.c, game: { question: 'Which rate constant is larger?', choices: ['a', 'b', 'c'] } },
    { concept: RATE.c, game: { question: 'Where does the fill amplify it?', choices: ['a', 'b', 'c'] } },
  ];
  is('coverage counts a concept named by any card, not only its own',
    coverage(lessons, [RATE, SITE]).length, 0);
  is('and reports one that no card names',
    coverage([lessons[0]], [RATE, SITE]).map((u) => u.concept).join(''), SITE.c);

  // 8. A stop with no resolvable concept is somebody else's finding.
  is('a stop with no concept is skipped rather than reported',
    judgeLesson({ title: 't', game: { question: 'q' } }, [RATE], JARGON), null);
  is('and so is a concept that is not on this syllabus',
    judgeLesson({ concept: 'Not on the syllabus', title: 't', game: { question: 'q' } },
      [RATE], JARGON), null);

  for (const c of cases) console.log(`  ${c.ok ? '✓' : '✗'} ${c.name}`);
  const bad = cases.filter((c) => !c.ok);
  if (bad.length) {
    console.log(`\n✗ conceptVisible: ${bad.length} of ${cases.length} case(s) wrong`);
    for (const c of bad) console.log(`  ✗ ${c.name}: ${c.saw}`);
    process.exit(1);
  }
  console.log(`conceptVisible --selftest: ${cases.length} cases, and the pairs score the same.`);
}
