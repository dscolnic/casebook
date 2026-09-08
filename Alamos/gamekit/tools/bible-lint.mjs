// bible-lint.mjs — measure a campaign bible against BIBLE_REQUIREMENTS.md,
// before a line of YAML exists.
//
//   node tools/bible-lint.mjs <bible.md>
//   node tools/bible-lint.mjs <bible.md> --mission 3
//   node tools/bible-lint.mjs <bible.md> --quiet     only failures
//
// WHY THIS EXISTS. Red Sand v10.2 was built the other way round: write the YAML,
// import it, run `npm run check`, discover one rule, fix, repeat. Every loop is a
// build, and the rules found that way — a glossary three concepts deep on day
// two, a PROBE one station short of what the importer takes, three terms used
// and never defined — were all visible in the .md the whole time. Finding them
// here costs seconds and the author can fix them at the source, which is the only
// place they can be fixed properly: the implementation is not allowed to write
// player-facing prose.
//
// WHAT IT DOES NOT DO. It does not judge whether a question is good, whether a
// setup is oblique, or whether the mystery works. Those need a reader — see the
// `alamos-copy` and `alamos-accessibility` skills. This measures the things that
// have a number attached, and CLAUDE.md is explicit that a reading score cannot
// see demand.
import { readBible, clean } from './bibleRead.mjs';
import { fleschKincaid } from './readability.js';
import { norm } from './common-words.mjs';

const args = process.argv.slice(2);
const selftest = args.includes('--selftest');
const file = args.find(a => !a.startsWith('--'));
if(!file && !selftest){
  console.error('usage: node tools/bible-lint.mjs <bible.md> [--mission N] [--quiet] [--selftest]');
  process.exit(2);
}
const only = args.includes('--mission') ? +args[args.indexOf('--mission') + 1] : null;

// --------------------------------------------------------------------- selftest
//
// CLAUDE.md's most expensive rule, applied to this file: a measurement that
// produces a plausible answer is not thereby a working measurement, so the case
// where two inputs that should score the same actually do is written down — and
// each rule is confirmed by putting its defect back and watching that case, and
// only that case, fail.
//
// This file has already been wrong twice in exactly the way that rule predicts.
// Its first glossary check reported eighty-nine blocking findings, nearly all of
// them ordinary English; its first field reader truncated an option list at
// `**(correct)**` and reported eight CHOICE stops with no options at all. Both
// looked like a bible full of defects and were a linter full of them.
//
//   node tools/bible-lint.mjs --selftest
const CLEAN = "### Opening sequence - no movie required, maximum five sentences\n\nThe plant is behind. You are the new lead. Find out why. Fix it before the window shuts.\n\n# Mission 1 - The Test\n\n**Header:** 15 SHIFTS LEFT\n\n**Card title:** THE TEST\n\n**Go now:** Go to Plant Control and meet Ada Vance, the shift lead, at the ledger.\n\n**Card body:** The plant is short of fuel and nobody knows where it went. The crew blames a leak, but sealing valves at random would waste a shift. At Plant Control, sort the samples and add up the carbon. By the end of the mission, decide whether a leak explains the shortage.\n\n**Objective:** Decide whether a leak explains the shortage.\n\n### Worth knowing first - exact player copy\n\n#### Glossary terms\n\nAtom: the smallest piece of one kind of matter that keeps that identity. Counting atoms shows whether matter has gone.\n\n#### Primer concepts\n\n- Atoms are not made or destroyed by a reaction.\n\n#### Equations first needed today\n\n**Equation:** moles = grams / molar mass\n**What it is for:** turning a mass into a count\n**Symbols:** grams is the measured mass; molar mass is the grams in one mole.\n**Why this campaign needs it:** The scale reports mass and the model counts particles.\n\n**Beat 1 - On arrival at Plant Control \\| automatic when the player enters**\n\n**World state:** The wall board lights up. **Dialogue bubbles -** Vance: \"Start with the ledger.\"\n\n**Unlocks:** Stop 1.\n\n## Stop 1 - Sorting the tray\n\n**Format/placement:** CHOICE, asked at Ada Vance beside the tray.\n\n**Metadata:** Concept: particles; Keystone: particles; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.\n\n**Call - exact player copy:** Talk to Ada Vance, at the sample tray in Plant Control.\n\n**Stop reason - exact player copy:** The ledger cannot be read until the samples are sorted.\n\n**Question card story setup - exact player copy:** Before the plant can compare its records, sort the four sample symbols so the ledger counts them correctly. This gives every one of the later calculations a trustworthy place to start from.\n\n**Question card story-science connection - exact player copy:** Correct labels stop the plant counting unlike things as the same.\n\n**Question card prompt - exact player copy:** Which sorting is correct?\n\n**Choices:**\n\n1.  Ar is an atom and CH4 is a molecule. **(correct)**\n\n2.  Both are molecules.\n\n3.  Both are atoms.\n\n4.  Neither is either.\n\n**Correct result:** Choice 1.\n\n**Answer text:** Ar is an atom and CH4 is a molecule.\n\n**Why:** Ar is one neutral atom. CH4 is bonded atoms with no charge.\n\n**Wrong-path feedback:** (2) A formula can name an atom. (3) CH4 has more than one atom. (4) Both are particles.\n\n**State/output:** Unlock the ledger.\n\n## Mission outcome\n\nMission decision: A leak does not explain the gap. The count finds the carbon. Work on the valves stops. The next test looks at the air.\n\n### Post-mission metric screen - exact player copy\n\n**Timer line template:** TIME {elapsed} / TARGET 06:00\n\n**Story event:** A shift is spent on the ledger.\n\n**Automatic bar change:** Methane -2 | Power -2\n\n## Quick concept review\n\n- Atoms are counted, not weighed.\n\n- **Mission takeaway:** A closed ledger weakens the leak story.\n\n# 9. Back matter\n";

/** Every defect, as a one-line edit to the clean bible and the rule it must trip. */
const CASES = [
  ['setup collapsed to one sentence',
    (b) => b.replace('correctly. This gives', 'correctly, and this gives'),
    /setup is 1 sentence/],
  ['card body loses its promised result',
    (b) => b.replace('By the end of the mission, decide whether a leak explains the shortage.',
      'The shortage has to be explained by somebody before the window shuts on this crew.'),
    /does not open "By the end of the mission"/],
  ['outcome loses its opener',
    (b) => b.replace('Mission decision: A leak does not', 'A leak does not'),
    /does not open "Mission decision:"/],
  ['a CHOICE loses an option',
    (b) => b.replace('4.  Neither is either.\n\n', ''),
    /CHOICE has 3 options/],
  ['a CHOICE loses its key',
    (b) => b.replace(' **(correct)**', ''),
    /0 option\(s\) marked \(correct\)/],
  ['a CHOICE loses its rebuttals',
    (b) => b.replace(/\*\*Wrong-path feedback:\*\*[^\n]*\n/, ''),
    /no wrong-path feedback/],
  ['a format that is not plain arrives with no payload',
    (b) => b.replace('**Format/placement:** CHOICE,', '**Format/placement:** PROBE,'),
    /PROBE has no interaction payload/],
  ['the review loses its takeaway label',
    (b) => b.replace('**Mission takeaway:** A closed', 'A closed'),
    /does not end on a bullet labelled Mission takeaway/],
  ['a beat waits on a stop the mission does not have',
    (b) => b.replace('**Beat 1 - On arrival at Plant Control', '**Beat 2 - After Stop 4'),
    /waits on Stop 4, which is neither one of this mission/],
  ['the rebuttals repeat the mechanism',
    (b) => b.replace('**Wrong-path feedback:** (2) A formula can name an atom. (3) CH4 has more than one atom. (4) Both are particles.',
      '**Wrong-path feedback:** Ar is one neutral atom. CH4 is bonded atoms with no charge.'),
    /Why and Wrong-path feedback are the same text/],
  ['the Why is spelled Mechanism',
    (b) => b.replace('**Why:** Ar is one', '**Mechanism:** Ar is one'),
    /writes "Mechanism:"/],
];

if(selftest){
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = mkdtempSync(join(tmpdir(), 'bible-lint-'));
  // A FRESH CHILD PER CASE. The rules run at module scope and push into one
  // findings array, so measuring two bibles in one process measures their sum.
  const { execFileSync } = await import('node:child_process');
  const here = new URL(import.meta.url).pathname;
  const lint = (text) => {
    const f = join(dir, `b-${Math.random().toString(36).slice(2)}.md`);
    writeFileSync(f, text);
    try{ return execFileSync(process.execPath, [here, f], { encoding: 'utf8' }); }
    catch(e){ return String(e.stdout ?? '') + String(e.stderr ?? ''); }
  };

  let bad = 0;
  const base = lint(CLEAN);
  if(!/0 blocking, 0 worth a look/.test(base)){
    console.log('✗ the clean bible is not silent — every case below is measured against noise');
    console.log(base.split('\n').filter(Boolean).map(l => '    ' + l).join('\n'));
    bad++;
  } else console.log('  ✓ a clean bible produces no findings at all');

  for(const [name, mutate, expect] of CASES){
    const text = mutate(CLEAN);
    if(text === CLEAN){ console.log(`  ✗ ${name}: the mutation changed nothing`); bad++; continue; }
    const out = lint(text);
    if(!expect.test(out)){
      console.log(`  ✗ ${name}: the defect was put back and nothing caught it`);
      console.log(out.split('\n').filter(Boolean).map(l => '        ' + l).join('\n'));
      bad++;
      continue;
    }
    // AND ONLY THAT CASE. A rule that fires on everything is not a rule, and a
    // mutation that trips four findings has broken the fixture rather than
    // exercised one check.
    const fires = out.split('\n').filter(l => /^\s+✗/.test(l)).length;
    if(fires > 2){
      console.log(`  ✗ ${name}: caught it, and ${fires - 1} other things with it`);
      bad++;
      continue;
    }
    console.log(`  ✓ ${name}`);
  }
  console.log(bad ? `\n${bad} selftest case(s) failed.` : `\nbible-lint --selftest: ${CASES.length + 1} cases, every rule fires on its own defect and on nothing else.`);
  process.exit(bad ? 1 : 0);
}

const quiet = args.includes('--quiet');
const summary = args.includes('--summary');

// Canonical formats, and the ones that are not available. Kept beside
// engine/content/normalize.js rather than inside it, because this tool has to run
// against a bible for a theme that does not exist yet.
const PLAIN = new Set(['CHOICE', 'BALLPARK', 'SEQUENCE']);
const SUSPENDED = new Set(['STACK']);

const findings = [];
const fail = (where, what) => findings.push({ level: 'fail', where, what });
const warn = (where, what) => findings.push({ level: 'warn', where, what });

/** Sentences, counted the way a reader would: a terminator followed by a capital. */
const sentences = (s) => clean(s).split(/(?<=[.!?])\s+(?=[A-Z"“(])/).filter(x => x.trim());

const bible = readBible(file);

/**
 * Every story-science connection in the campaign, by text.
 *
 * Built once and up front, because the rule is about the CAMPAIGN — one sentence
 * on forty stops — and a per-stop check cannot see that.
 */
const CONNECTIONS = new Map();
for(const m of bible.missions){
  for(const s of m.stops ?? []){
    if(!s.connect) continue;
    const k = clean(s.connect);
    CONNECTIONS.set(k, [...(CONNECTIONS.get(k) ?? []), `${m.n}.${s.n}`]);
  }
}
const missions = only ? bible.missions.filter(m => m.n === only) : bible.missions;

// ------------------------------------------------------------------ opening
if(!only){
  if(!bible.opener) fail('opening', 'no opening sequence found');
  else if(sentences(bible.opener).length > 5)
    fail('opening', `the opening card is ${sentences(bible.opener).length} sentences; the limit is five`);
}

// -------------------------------------------------- the fixtures the stops need
//
// A BIBLE MAY NAME AN OBJECT THE WORLD HAS NOT GOT. That is the point of it
// being the design source: a stop that needs a fit-board gets one built. What it
// may not do is name one and leave the implementation to guess what it is — so
// every fixture a placement names has to appear in the campaign's own fixture
// table, with the place it stands in, what kind of object it is, and the caption
// a player reads on it. Whether the theme already has it is a different
// question, asked by `tools/stop-map.mjs` against the actual world.
const declared = new Map(bible.fixtures.map(f => [f.id, f]));
// The places section 3 declares, which is the only thing `Area:` may name.
const placeNames = new Set(bible.fixtures.map(f => norm(f.place)).filter(Boolean));
const KINDS = new Set(['vessel', 'rack', 'bench', 'board']);
if(!only){
  for(const f of bible.fixtures){
    if(!KINDS.has(f.build))
      fail(`fixture \`${f.id}\``, `kind is "${f.build || 'missing'}" — it has to be one of vessel, rack, bench, board`);
    if(!f.place) fail(`fixture \`${f.id}\``, 'no place — which room does it stand in?');
    if(!f.caption) fail(`fixture \`${f.id}\``, 'no description — the caption is player-facing and has to be written here');
  }
  // A FIXTURE IS AN OBJECT IN A ROOM, NOT A ROW PER STOP.
  //
  // Five of the eight bibles satisfied "declare every fixture" by minting one
  // per stop, named after the stop — `s01-name-the-data`, `s02-describe-before-
  // judging` — each captioned "presents the evidence and controls for this
  // stop". Sixty objects in a room, each touched once, is not a place; it is the
  // stop list with furniture drawn round it. The point of asking a question AT
  // something is that the thing is already there and several questions can be
  // about it: Red Sand's carbon ledger is where four different stops are
  // answered across the campaign.
  const stopShaped = bible.fixtures.filter(f => /^s\d+[-_]/i.test(f.id));
  if(stopShaped.length)
    fail('fixtures', `${stopShaped.length} of ${bible.fixtures.length} are named after a stop rather than an object`
      + ` (${stopShaped.slice(0, 3).map(f => f.id).join(', ')}…) — a fixture is a thing standing in a room,`
      + ' and more than one stop should be able to be asked at it');
  const used = new Map();
  for(const m of bible.missions) for(const s of m.stops)
    for(const t of (s.placement ?? '').toLowerCase().match(/[a-z][a-z0-9-]{3,}/g) ?? [])
      if(declared.has(t)) used.set(t, (used.get(t) ?? 0) + 1);
  const shared = [...used.values()].filter(n => n > 1).length;
  if(bible.fixtures.length > 20 && !shared && !stopShaped.length)
    warn('fixtures', 'no fixture is used by more than one stop — a place the campaign returns to'
      + ' is what makes it a place rather than a set of backdrops');
}

// ------------------------------------------------------------------ per mission
for(const m of missions){
  const M = `M${m.n}`;
  // ---- the briefing card
  const body = m.card.body ?? '';
  if(!body) fail(M, 'no card body');
  else {
    const ss = sentences(body);
    if(ss.length !== 4) warn(`${M} card`, `body is ${ss.length} sentences; the shape is four`);
    if(!/^By the end of the mission/i.test(ss[ss.length - 1] ?? ''))
      fail(`${M} card`, 'the last sentence does not open "By the end of the mission"');
  }
  if(!m.card.goNow) fail(`${M} card`, 'no Go now line');
  else if(!/,/.test(m.card.goNow))
    warn(`${M} card`, 'the Go now line names nobody with their job — "meet X, their job, at Y"');
  if(!m.card.header) warn(`${M} card`, 'no header');
  if(!m.card.objective) fail(`${M} card`, 'no objective');

  // ---- the outcome
  if(!m.outcome) fail(M, 'no mission outcome');
  else {
    if(!/^Mission decision:/.test(m.outcome))
      fail(`${M} outcome`, 'does not open "Mission decision:"');
    const g = fleschKincaid(m.outcome);
    if(g != null && g > 6.5)
      fail(`${M} outcome (grade ${g.toFixed(1)})`, 'reads above the closing-card reading ceiling (section 3) — shorter, plainer sentences');
  }

  // ---- the review
  if(!m.review.length) fail(M, 'no quick concept review');
  else if(!/^\*\*Mission takeaway/i.test(m.review[m.review.length - 1]))
    fail(`${M} review`, 'the review does not end on a bullet labelled Mission takeaway:');

  // ---- Worth knowing first
  if(!m.equations.length && m.n === 1) warn(M, 'no equations first needed today');
  for(const e of m.equations){
    for(const [k, label] of [['e', 'its equation'], ['c', 'its What-it-is-for line'],
      ['s', 'its Why-this-campaign-needs-it line']])
      if(!e[k]) fail(`${M} equation ${(e.e ?? '?').slice(0, 40)}`, `the equation block is missing ${label}`);
    // TWO DEFECTS, NOT ONE. A block with no Symbols line at all cannot name its
    // letters; a block whose Symbols line is prose — "standard", or a sentence
    // about what the energy does — has one and still names none. The first is a
    // hole in the bible and the second is a line to rewrite, and reporting both
    // as "missing its Symbols line" said the wrong thing about sixty equations
    // that had written one.
    const where = `${M} equation ${(e.e ?? '?').slice(0, 40)}`;
    if(!e.vSaid && !e.v?.length){
      fail(where, 'the equation block is missing its Symbols line, which has to name every letter');
    } else if(!e.v?.length){
      fail(where, `its Symbols line names no symbol — "${String(e.vSaid).slice(0, 60)}". `
        + 'The shapes that read are `x` position, `t` time / x is the position / depth in metres');
    }
  }
  for(const g of m.glossary){
    if(!/[.!?]$/.test(g.def)) warn(`${M} glossary "${g.term}"`, 'the definition is not a full sentence');
  }

  // ---- the beats
  const stopNums = m.stops.map(s => s.n);
  if(!m.beats.some(b => /arrival/i.test(b.name))) warn(M, 'no arrival beat');
  for(const b of m.beats){
    // TWO NUMBERINGS, AND BOTH ARE LEGAL. Mars numbers a beat's stops across the
    // campaign — mission 5 waits on Stops 17 to 20 — while Eleven Days numbers
    // them within the mission and waits on Stops 1 to 4. Reading only the first
    // reported eighteen beats in Eleven Days as waiting on stops that do not
    // exist, in a bible where every one of them is fine. A number is out of
    // range only when it is neither.
    const after = [...(b.trigger + ' ' + b.name).matchAll(/Stops?\s+(\d+)(?:\s*(?:and|-|–|to)\s*(\d+))?/gi)]
      .flatMap(x => [x[1], x[2]]).filter(Boolean).map(Number);
    for(const n of after){
      const global = stopNums.includes(n);
      const local = n >= 1 && n <= stopNums.length;
      if(!global && !local)
        fail(`${M} beat ${b.n}`, `waits on Stop ${n}, which is neither one of this mission's stops (${stopNums.join(', ')}) nor one of its four calls`);
    }
    const fires = after.length || /arrival|on arrival|mission end|outcome/i.test(`${b.name} ${b.trigger}`);
    if(!fires) fail(`${M} beat ${b.n}`, `says nothing about what fires it — "${(b.name || '?').slice(0, 40)}"`
      + ' — a beat fires on arrival at a named place, after a stop, or at mission end');
    if(!b.world && !b.panel) warn(`${M} beat ${b.n}`, 'no world change and no panel line — nothing happens');
    if(!b.bubbles.length && !/outcome/i.test(b.name)) warn(`${M} beat ${b.n}`, 'nobody speaks');
  }

  // ---- the stops
  for(const s of m.stops){
    const S = `${M} stop ${s.n}`;
    for(const [k, label] of [['placement', 'Format/placement'], ['meta', 'Metadata'],
      ['reason', 'Stop reason'], ['setup', 'story setup'], ['connect', 'story-science connection'],
      ['prompt', 'prompt'], ['answerText', 'Answer text'], ['why', 'Why']])
      if(!s[k]) fail(S, `no ${label}`);

    for(const alt of s.aliases ?? [])
      warn(S, `writes "${alt}:" where the rest of the bible writes "Why:" / "Wrong-path feedback:"`
        + ' — same content, one more shape for the extractor to know about');

    // The six things the build had to invent, now asked for. See
    // tools/BIBLE_ADDENDUM_PROMPT.md for what each one is and why.
    // AN AREA IS A PLACE. The engine buckets a campaign's curriculum by place —
    // Plant Control, the Coaster Station — so `Area:` has to name one of the
    // places section 3 declares. Two of the eight bibles read "area of study" as
    // a SUBJECT instead (Motion and Measurement, Work and Energy) and named nine
    // of them against a park with seven rides, which resolves to nothing: 229 of
    // 480 stops came back with no area at all. Both readings were fair on the
    // wording; this is the one the engine can use.
    if(!s.area) fail(S, 'Metadata names no Area — which of section 3\'s places owns this lesson, as distinct from where it is asked');
    else if(placeNames.size && !placeNames.has(norm(s.area)))
      fail(S, `Area is "${s.area}", which is not one of the places section 3 declares`
        + ` — an area is a place the campaign teaches in, not a subject heading`);
    if(!s.call) fail(S, 'no Call line — the sentence the plan card prints for this stop, "Go to X, in Y"');

    // The object this stop is asked at, declared or not.
    if(s.format && !/decision\/person|asked (at|by) [A-Z]/.test(s.placement ?? '')){
      // BACKTICKS ARE GONE BY NOW. `clean` strips them so the prose reads as a
      // player would see it, so a rule that demanded them could never match —
      // it reported the template's own worked stop as naming no fixture. Match
      // the id itself against what the campaign declared.
      const tokens = (s.placement ?? '').toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) ?? [];
      const named = tokens.find(t => declared.has(t));
      const hyphenated = tokens.filter(t => t.includes('-'));
      if(!named && hyphenated.length)
        fail(S, `names \`${hyphenated[0]}\`, which the campaign's fixture table does not declare`
          + ' — a new object is fine, but it has to be declared so it can be built');
      else if(!named)
        warn(S, 'the placement names no declared fixture — say which object the stop is asked at');
    }

    if(!s.format) fail(S, 'the placement line names no canonical format');
    else if(SUSPENDED.has(s.format)) fail(S, `${s.format} is suspended and cannot be built`);

    // NO WORD COUNT. There was a 30-45 word floor and ceiling on the setup and a
    // 30-70 on the card body, and they are gone by decision: a rule that fails a
    // setup for being one word short is measuring the wrong thing, and it fired
    // on eighty-five stops across the eight bibles while saying nothing about
    // whether any of them read well. The sentence count stays — it is a
    // readability rule, not a length one. One sentence carrying a whole setup
    // measures grade 14-18 however many words it has.
    if(s.setup){
      const ss = sentences(s.setup).length;
      if(ss !== 2) fail(S, `setup is ${ss} sentence(s); the rule is exactly two`);
    }

    // THE THREE VERDICT FIELDS DO THREE JOBS, and copying one into another
    // collapses two of them. Measured across the eight: the mechanism is pasted
    // into the rebuttals on 15 stops, so every wrong option is answered with the
    // reason the right one is right — which tells a student who picked (3)
    // nothing about (3). And the grading truth is pasted into the verdict
    // sentence on 217 stops, so the card prints "Choice 1." or "12 cm, exact"
    // where it should say what a right answer was. Mars does neither on 59 of its
    // 60 stops, so this is a gap rather than a constraint.
    const same = (a, b) => a && b
      && a.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
      === b.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    if(same(s.why, s.wrong))
      fail(S, 'Why and Wrong-path feedback are the same text — the rebuttals have to name what each wrong option got wrong');
    if(same(s.answerText, s.result))
      warn(S, 'Answer text repeats Correct result — the grading truth is a value, the answer text is the sentence the verdict card prints');

    /**
     * THE FOUR LINES HAVE FOUR JOBS — see BIBLE_AUTHORING_PROMPT.md.
     *
     * Warnings rather than refusals, because both fire on nearly every stop in
     * every bible today and a wall of red is a gate nobody reads. They are here so
     * the number can be watched down.
     *
     *   · the reason repeating the setup's own first sentence: 314 of 480
     *   · the connection written once per FORMAT and pasted onto every stop of
     *     that format: 470 of 480, 27 sentences doing the whole set's work
     */
    const first = (t) => sentences(t)[0] ?? '';
    if(s.reason && s.setup && same(first(s.reason), first(s.setup))){
      warn(S, 'the stop reason opens with the setup\'s own first sentence — the reason is'
        + ' why this task NOW, and the setup is the situation; the card prints them together'
        + ' and drops the repeat');
    }
    if(s.connect && CONNECTIONS.get(clean(s.connect))?.length > 1){
      const n = CONNECTIONS.get(clean(s.connect)).length;
      warn(S, `the story-science connection is on ${n} stops of this campaign — it says what`
        + ' this FORMAT does, not what THIS answer settles');
    }

    if(s.format === 'CHOICE'){
      const c = s.choices ?? [];
      if(c.length !== 4) fail(S, `CHOICE has ${c.length} options; the rule is four`
        + (c.inlineDelimiter
          ? ' — the options are on one slash-separated line and at least one of them contains a slash,'
            + ' so the list cannot be read. Number them instead.'
          : ''));
      const keyed = c.filter(x => x.correct).length;
      if(keyed !== 1) fail(S, `CHOICE has ${keyed} option(s) marked (correct); the rule is exactly one`);
      if(!s.wrong) fail(S, 'CHOICE with no wrong-path feedback — one rebuttal per wrong option');
    }

    // Every format that is not one of the three plain ones is a board, and a
    // board without its numbers cannot be built. This is the line that blocked
    // 36 of Red Sand's 60 stops on the first attempt.
    if(s.format && !PLAIN.has(s.format) && !s.payload)
      fail(S, `${s.format} has no interaction payload — an operated format needs its board written out`);

    if(s.payload) payloadRules(S, s);
  }
}

/**
 * The per-format minimums, against the bible's own payload.
 *
 * Read out of the fenced block as text rather than parsed as YAML: the block is
 * the bible's field names, not the engine's, and the point here is to count the
 * things the engine will need — not to pretend the schemas already match. The
 * conversion stays implementation work; this only says whether there is enough
 * in the block to convert.
 */
function payloadRules(S, s){
  const p = s.payload;
  const count = (re) => (p.match(re) ?? []).length;
  // COUNT ENTRIES, NOT LINES. A fenced board writes one `- {id: …}` per line; an
  // inline one writes `control:{candidates:[{id:"nitrogen",…},{id:"phosphorus",…}]}`
  // on a single line, and a line-anchored counter returned zero for every one of
  // them — reporting boards as one candidate short when they have four. Both
  // shapes name their entries with an id, so that is what gets counted, with the
  // line form kept as the fallback for a board that numbers nothing.
  const items = Math.max(
    count(/\bid\s*[:=]/g),
    count(/^\s*-\s*\{/gm),
    count(/^\s*-\s+\w/gm));
  switch(s.format){
    case 'PROBE': {
      const pts = Math.max(count(/\bid\s*[:=]/g), count(/^\s*-\s*\{\s*id:/gm));
      if(pts < 4) fail(S, `PROBE has ${pts} station(s); the importer needs at least four — a pattern needs somewhere to break`);
      if(!/expected|nominal|should read|last run/i.test(p))
        fail(S, 'PROBE gives readings but no expected value per station — the fault is where the two separate');
      break;
    }
    case 'ALLOCATE': {
      if(items < 4) fail(S, `ALLOCATE has ${items} item(s); the minimum is four`);
      if(count(/required:/g) < 1) fail(S, 'ALLOCATE has no required question');
      if(!/questions:/.test(p)) fail(S, 'ALLOCATE has no questions the plan may answer');
      break;
    }
    case 'VALUE':
      if(items < 4) fail(S, `VALUE has ${items} option(s); the minimum is four`);
      if(!/budget/i.test(p)) fail(S, 'VALUE has no budget');
      break;
    case 'TRACE':
      if(items < 4) fail(S, `TRACE has ${items} channel(s); the minimum is four`);
      if(!/shared|upstream|standard/i.test(p)) fail(S, 'TRACE names no shared upstream source');
      break;
    case 'ATTEST':
      if(items < 4) fail(S, `ATTEST has ${items} claim(s); the minimum is four`);
      break;
    case 'CONTROL':
      if(items < 3) fail(S, `CONTROL has ${items} candidate(s); the minimum is three`);
      break;
    case 'CHAIN':
      if(items < 4) fail(S, `CHAIN has ${items} transfer(s); the minimum is four`);
      break;
    case 'VERIFY':
      if(!/prediction/i.test(p)) fail(S, 'VERIFY has no prediction to lock before the measurement');
      if(!/measurement|measure/i.test(p)) fail(S, 'VERIFY has no measurement');
      break;
    case 'BALANCE':
      if(items < 3) fail(S, `BALANCE has ${items} stream(s); a ledger needs something to leave out`);
      if(!/count:\s*false|countable:\s*false/.test(p))
        warn(S, 'BALANCE has no uncountable stream — nothing to wrongly count');
      break;
    default: break;
  }
}

// ------------------------------------------------- the glossary, campaign-wide
//
// COUNTED AND DESCRIBED HERE, MEASURED SOMEWHERE ELSE.
//
// The first version of this file re-implemented `engine/dev/jargonDepth.mjs`'s
// two rules — how deep a term is stacked, and which words a definition leans on
// that nothing defines. It did not work. The gap list came back dominated by
// ordinary English ("helps", "lets", "hot", "earlier", "missing"), and the depth
// numbers were nonsense: it scored Reactant at 21 where the engine's own gate,
// against the built theme, scores it at 3. Two facts follow, and CLAUDE.md names
// both of them. Two copies of one rule drift the moment either is corrected —
// and a wall of false failures is how a gate stops being read, which is worse
// than the drift it was written to catch.
//
// So the depth and gap rules are NOT here. They run in `npm run check`, against
// the imported theme, where the glossary is real content and the matcher is the
// one the rest of the repo uses. What this reports instead is the shape of the
// block: how many terms each mission introduces, and definitions that are not
// written as sentences — which is the one thing about the glossary that is
// visible in the .md and invisible to the engine.
if(!only){
  const seen = new Set();
  for(const m of bible.missions) for(const g of m.glossary){
    const k = norm(g.term);
    if(seen.has(k)) warn(`glossary "${g.term}"`, `defined again on mission ${m.n}; it is already defined earlier`);
    seen.add(k);
  }
  if(!seen.size) fail('glossary', 'no "Worth knowing first" glossary terms anywhere in the bible');
}

// ------------------------------------------------------------------- report
//
// GROUPED, BECAUSE A LIST IS NOT A REPORT. One of these bibles has fifty-one
// setups a word under the floor. Printed one per line that is fifty-one lines
// saying one thing, and the two findings that matter are somewhere in the middle
// of them. `--summary` rolls each rule up to a count and the first few places it
// fires, which is the form somebody can actually work through.
const fails = findings.filter(f => f.level === 'fail');
const warns = findings.filter(f => f.level === 'warn');
const show = quiet ? fails : findings;

if(summary){
  const kind = (f) => f.what.replace(/\b\d+(\.\d+)?\b/g, 'N').replace(/"[^"]*"/g, '"…"');
  const groups = new Map();
  for(const f of show){
    const k = `${f.level}|${kind(f)}`;
    if(!groups.has(k)) groups.set(k, { level: f.level, what: kind(f), where: [] });
    groups.get(k).where.push(f.where);
  }
  const rows = [...groups.values()].sort((a, b) =>
    (a.level === b.level ? 0 : a.level === 'fail' ? -1 : 1) || b.where.length - a.where.length);
  for(const r of rows){
    const n = String(r.where.length).padStart(3);
    console.log(`  ${r.level === 'fail' ? '✗' : '·'} ${n} ×  ${r.what}`);
    console.log(`          ${r.where.slice(0, 6).join(', ')}${r.where.length > 6 ? `, … +${r.where.length - 6}` : ''}`);
  }
} else {
  const width = Math.max(0, ...show.map(f => f.where.length));
  for(const f of show)
    console.log(`  ${f.level === 'fail' ? '✗' : '·'} ${f.where.padEnd(width)}  ${f.what}`);
}
console.log(`\n${bible.missions.length} mission(s), ${bible.missions.reduce((n, m) => n + m.stops.length, 0)} stop(s) read`
  + ` — ${fails.length} blocking, ${warns.length} worth a look.`);
process.exit(fails.length ? 1 : 0);
