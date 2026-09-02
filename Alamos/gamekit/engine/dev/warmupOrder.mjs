// warmupOrder.mjs — the seven warm-ups are scheduled, and every one has a reason.
//
//   node engine/dev/warmupOrder.mjs <theme> [--all] [--selftest] [--verbose]
//
// Two rules, and they fail for different reasons.
//
//   1. THE SCHEDULE IS THE ENGINE'S. `warmups.js` decides it, so this check does
//      not assert the order against a table — it asserts the *properties* the
//      order has to have, because a table here would be a second description of
//      the rule and this repo has paid for those.
//   2. EVERY SCHEDULED RUN HAS A STORY. A warm-up with no authored reason runs
//      with the engine's fallback words, which say nothing about the campaign —
//      worried about spies, looking for the missing crates, getting round the
//      shift before the first shot. That is the difference between a warm-up and
//      a tutorial, and the day model has a rule against tutorials.
//
// The second rule is the one that will fail for a while, because it is content.
// `warmup-debt.json` records the campaigns that have not been written yet, with
// the same two properties as every other debt file here: a gap not on the list
// fails immediately, and a gap on the list that has been filled fails too,
// naming the line to delete. It only shrinks.
import { readFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { themeDir as resolveTheme, themeNames } from './registry.mjs';
import { warmupPlan, warmupDue, WARMUP_TAIL, WARMUP_OPENERS, WARMUP_MIN_DAYS, WARMUP_SLOT_DAYS } from '../core/warmups.js';
import { tiersFor, unlockDay } from '../core/orientation.js';
import { introduces, names, nameOf } from './introRule.mjs';
import { warmupSentenceCount, WARMUP_SENTENCE_CAP } from './dayCard.mjs';

const DEBT_FILE = 'engine/dev/warmup-debt.json';
// The card-length debt, kept apart from the unwritten-story debt above because
// they are different gaps: that one is a run with no story, this one is a story
// too long for where it is read.
const CARD_DEBT_FILE = 'engine/dev/warmupcard-debt.json';

/**
 * Everything a theme needs to be judged: how many days it runs, whether its
 * ground has a far tier, and what its book authored.
 */
async function readTheme(themeName){
  const theme = (await import(pathToFileURL(resolve(resolveTheme(themeName), 'theme.js')).href)).default;
  const { normalizeContent } = await import('../content/normalize.js');
  const content = theme.content ?? {};
  normalizeContent(content, theme.site ?? null, theme.fixtures ?? {});
  const site = theme.site ?? null;
  const tiers = site ? tiersFor(site) : { hasFar: false };
  return {
    days: (content.MISSIONS ?? []).length,
    hasFar: !!tiers.hasFar,
    unlockDay: site ? unlockDay(site) : 4,
    authored: content.WARMUPS ?? {},
    cast: (content.ROSTER ?? []).map(p => ({
      name: String(p.name ?? ''), role: String(p.role ?? '') })),
  };
}

/** The properties the schedule has to have, whatever order it comes out in. */
export function judgeSchedule({ days, hasFar, unlockDay }){
  const plan = warmupPlan({ days, hasFar, unlockDay });
  const problems = [];
  // A campaign under WARMUP_MIN_DAYS days is one sitting and opens on its first
  // card rather than on a run. Everything below asserts properties of a schedule
  // that has openers in it, so it would report a campaign with no warm-ups as a
  // campaign missing all of them — the check has to know the same rule the
  // engine does, and asks it of the engine rather than restating the number.
  if(!plan.length){
    if(days >= WARMUP_MIN_DAYS)
      problems.push(`a ${days}-day campaign schedules no warm-ups at all`);
    return { plan, problems };
  }
  if(days < WARMUP_MIN_DAYS){
    problems.push(`a ${days}-day campaign is one sitting and must open on its first card,`
      + ` not on ${plan.length} warm-up run(s)`);
    return { plan, problems };
  }
  // The "day 4" slot is really the unlock day — 4 for every site but one, and
  // wherever `unlockDay` actually falls for a far-tier site, because the far lap
  // has to land on the same day as the vehicles it hands out. A one-tier site
  // has no unlock day to defer to, so its second slot stays fixed at 4.
  const allowedDays = hasFar ? [1, unlockDay, 8, 13] : WARMUP_SLOT_DAYS;
  const badDay = plan.find(p => !allowedDays.includes(p.day));
  if(badDay) problems.push(`a warm-up is scheduled on day ${badDay.day}, which is not one of ${allowedDays.join('/')}`);
  const d1 = plan.find(p => p.day === 1);
  if(!d1) problems.push('day 1 must open on a warm-up');
  else if(!WARMUP_OPENERS.includes(d1.format))
    problems.push(`day 1 is ${d1.format} — it must be TRIAL or GREET`);
  else if((hasFar && d1.format !== 'TRIAL') || (!hasFar && d1.format !== 'GREET'))
    problems.push(`day 1 is ${d1.format} on a ${hasFar ? 'two' : 'one'}-tier site — `
      + `it must be ${hasFar ? 'TRIAL' : 'GREET'}`);
  const fars = plan.filter(p => p.far);
  if(hasFar && fars.length !== 1) problems.push('a site with far ground needs exactly one far lap');
  if(!hasFar && fars.length) problems.push('a site with one tier of ground must not schedule a far lap');
  if(hasFar && fars.length === 1 && fars[0].day !== unlockDay)
    problems.push(`the far lap is on day ${fars[0].day} and the vehicles come out on day ${unlockDay}`);
  const slots = plan.map(p => p.slot);
  if(new Set(slots).size !== slots.length) problems.push('two warm-ups share a save slot, so one can mark the other done');
  const tail = plan.filter(p => WARMUP_TAIL.includes(p.format)).map(p => p.format);
  // Day 4 spends a tail format only when there is no far lap to spend it on
  // instead; days 8 and 13 always do, when the campaign reaches them.
  const room = (hasFar ? 0 : 1) + (days >= 8 ? 1 : 0) + (days >= 13 ? 1 : 0);
  const want = WARMUP_TAIL.slice(0, Math.min(WARMUP_TAIL.length, room));
  if(tail.join(',') !== want.join(','))
    problems.push(`the tail is ${tail.join(', ') || '(none)'} and this campaign has room for ${want.join(', ') || '(none)'}`);
  return { plan, problems };
}

/**
 * Names a warm-up card uses without introducing them.
 *
 * A run's card is read before the day's plan, and the two openers are read on the
 * first and second morning of the campaign — so "Farrow wants you known to both"
 * is a sentence about a stranger, and the player has nowhere to look them up. A
 * name is introduced if the card puts a job beside it: "Farrow, the operations
 * manager, wants…", a role phrase in front of it, or a verb that states the job.
 * A full name is not an introduction — `introRule.mjs` is the rule, and the same
 * one `checkNames.mjs` asks of the rest of the campaign.
 *
 * Matched on the surname, because that is how these cards refer to people, and
 * only against the campaign's own roster — a place called Whitlock Street is not
 * a person. A roster entry with no `role` cannot be introduced from the data, and
 * is reported as that rather than as a missing sentence.
 */
export function unintroduced(authored, cast){
  const out = [];
  for(const [slot, w] of Object.entries(authored ?? {})){
    // The card is one thing to read, so a name in the title may be introduced by
    // the why underneath it.
    const card = `${w?.title ?? ''}. ${w?.why ?? ''}`;
    for(const person of cast ?? []){
      const n = nameOf(person);
      if(!n || !names(card, person)) continue;
      if(!introduces(card, person)) out.push({ slot, name: n.surname, role: person.role });
    }
  }
  return out;
}

/**
 * Warm-up cards that run past one sentence.
 *
 * A warm-up card is not read the way the other cards are. The player is standing
 * in the world with a run about to start, the card is over the top of it, and the
 * only thing that has to survive is why this run is happening today — so the cap
 * is one sentence, against four for a day card and five for the opening. All
 * three are counted by `dayCard.mjs`, so a card cannot pass one cap and fail
 * another on nothing but punctuation.
 *
 * The floor is the importer's and stays where it is: a `why` under twelve words
 * is a tutorial with a heading. One sentence of twelve or more words is the shape
 * this asks for, and it is a narrower target than it sounds — which is why the
 * 276 cards that predate the cap are recorded rather than failed.
 */
export function overlongCards(authored){
  const out = [];
  for(const [slot, w] of Object.entries(authored ?? {})){
    const n = warmupSentenceCount(w);
    if(n > WARMUP_SENTENCE_CAP) out.push({ slot, sentences: n });
  }
  return out;
}

/** Which scheduled runs this campaign has not given a reason. */
export function unwritten(plan, authored){
  return plan.filter(p => {
    const w = authored[p.slot] ?? authored[p.format.toLowerCase()] ?? {};
    return !String(w.why ?? '').trim() || !String(w.title ?? '').trim();
  }).map(p => p.slot);
}

const RAN_DIRECTLY = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if(RAN_DIRECTLY){
  const args = process.argv.slice(2);
  if(args.includes('--selftest')) await selftest();
  else {
    const debt = existsSync(DEBT_FILE) ? JSON.parse(readFileSync(DEBT_FILE, 'utf8')) : {};
    const cardDebt = existsSync(CARD_DEBT_FILE)
      ? JSON.parse(readFileSync(CARD_DEBT_FILE, 'utf8')) : { _comment: '', themes: {} };
    const wanted = args.includes('--all') || !args.find(a => !a.startsWith('--'))
      ? themeNames() : [args.find(a => !a.startsWith('--'))];
    const verbose = args.includes('--verbose');
    let failures = 0, written = 0;
    for(const themeName of wanted){
      let info;
      try { info = await readTheme(themeName); }
      catch(err){ console.log(`✗ ${themeName}: cannot load theme — ${err.message}`); failures++; continue; }
      if(!info.days) continue;
      const { plan, problems } = judgeSchedule(info);
      for(const p of problems){ console.log(`✗ ${themeName}: ${p}`); failures++; }
      // A campaign with no runs has no stories to owe. What it can have is
      // stories for runs nobody will ever be offered, which is the same defect
      // as a `trial-far` on one tier of ground and reads exactly as clean.
      if(!plan.length && Object.keys(info.authored).length){
        console.log(`✗ ${themeName}: a ${info.days}-${info.days === 1 ? 'day' : 'day'} campaign is one sitting`
          + ` and is offered no warm-ups, but the book authors`
          + ` ${Object.keys(info.authored).sort().join(', ')} — delete the \`warmups\` block`);
        failures++;
      }
      const gaps = unwritten(plan, info.authored);
      const listed = new Set(debt[themeName] ?? []);
      for(const slot of gaps){
        if(listed.has(slot)) continue;
        console.log(`✗ ${themeName}: the ${slot} warm-up is scheduled for day`
          + ` ${plan.find(p => p.slot === slot).day} and has no story — give it a title and a why`
          + ` in the book's \`warmups\` block`);
        failures++;
      }
      for(const slot of listed){
        if(gaps.includes(slot)) continue;
        console.log(`✗ ${themeName}: ${DEBT_FILE} lists "${slot}", which is written now — delete the line`);
        failures++;
      }
      const longCards = overlongCards(info.authored);
      const cardListed = new Set(cardDebt.themes?.[themeName] ?? []);
      for(const { slot, sentences } of longCards){
        if(cardListed.has(slot)) continue;
        console.log(`✗ ${themeName}: the ${slot} warm-up card runs ${sentences} sentences —`
          + ` ${WARMUP_SENTENCE_CAP} is the limit on a card read with a run about to start`);
        failures++;
      }
      for(const slot of cardListed){
        if(longCards.some(c => c.slot === slot)) continue;
        console.log(`✗ ${themeName}: ${CARD_DEBT_FILE} lists "${slot}" as an over-long card,`
          + ' and it is one sentence now — delete the line');
        failures++;
      }
      for(const miss of unintroduced(info.authored, info.cast)){
        console.log(`✗ ${themeName}: the ${miss.slot} warm-up names ${miss.name} and never says who`
          + ` they are — ${miss.role ? `"${miss.name}, the ${miss.role.split(',')[0].toLowerCase()},"`
            : 'and the roster gives them no role to introduce them with'}`);
        failures++;
      }
      if(!gaps.length) written++;
      if(verbose) console.log(`  · ${themeName}: ${plan.map(p => `d${p.day} ${p.format}`).join('  ')}`
        + `${gaps.length ? `  [unwritten: ${gaps.join(', ')}]` : ''}`);
    }
    if(failures) console.log(`\n${failures} problem(s).`);
    else console.log(`\n✓ ${wanted.length} theme(s): the warm-ups are scheduled, and ${written} have a story for every one.`);
    process.exit(failures ? 1 : 0);
  }
}

async function selftest(){
  const cases = [];
  const check = (name, ok, detail = '') => cases.push({ name, ok, detail });

  const two = warmupPlan({ days: 15, hasFar: true, unlockDay: 4 });
  const one = warmupPlan({ days: 15, hasFar: false });

  check('a two-tier campaign opens on TRIAL, alone, on day 1',
    two[0].format === 'TRIAL' && two[0].day === 1, two.map(p => `d${p.day}:${p.format}`).join(' '));
  check('a one-tier campaign opens on GREET, alone, on day 1',
    one[0].format === 'GREET' && one[0].day === 1, one.map(p => `d${p.day}:${p.format}`).join(' '));
  check('day 2 is never a slot, on either kind of site',
    !two.some(p => p.day === 2) && !one.some(p => p.day === 2));
  check('every scheduled day is one of 1/4/8/13',
    [...two, ...one].every(p => WARMUP_SLOT_DAYS.includes(p.day)),
    [...two, ...one].map(p => p.day).join(','));
  check('the far lap is on the unlock day, and only where there is far ground',
    two.filter(p => p.far).length === 1 && two.find(p => p.far).day === 4
      && one.filter(p => p.far).length === 0);
  check('the two laps have different save slots',
    new Set(two.filter(p => p.format === 'TRIAL').map(p => p.slot)).size === 2,
    two.filter(p => p.format === 'TRIAL').map(p => p.slot).join(','));
  check('a far site spends only days 8 and 13 on the tail, since day 4 is the far lap',
    two.filter(p => WARMUP_TAIL.includes(p.format)).map(p => `d${p.day}:${p.format}`).join(' ')
      === 'd8:FOLLOW d13:HUNT',
    two.map(p => `d${p.day}:${p.format}`).join(' '));
  check('a one-tier site spends day 4 on the tail too, since there is no far lap to take it',
    one.filter(p => WARMUP_TAIL.includes(p.format)).map(p => `d${p.day}:${p.format}`).join(' ')
      === 'd4:FOLLOW d8:HUNT d13:CANVASS',
    one.map(p => `d${p.day}:${p.format}`).join(' '));
  check('at most four runs are ever scheduled, whatever the site',
    two.length <= 4 && one.length <= 4, `two: ${two.length}  one: ${one.length}`);

  // A short campaign takes as many of the four slots as it has room for rather
  // than overflowing past its own last day — the junior editions are ten days.
  const short = warmupPlan({ days: 5, hasFar: false });
  check('a five-day campaign gets day 1 and day 4 only — 8 and 13 do not fit',
    short.length === 2 && short[0].day === 1 && short[1].day === 4,
    short.map(p => `d${p.day}`).join(','));
  check('and the schedule check accepts that rather than demanding four',
    judgeSchedule({ days: 5, hasFar: false }).problems.length === 0,
    judgeSchedule({ days: 5, hasFar: false }).problems.join(' | '));

  // One sitting: the Quick Discoveries are three levels, and the schedule above
  // would open two of those three on a run. The three cases are the ones that
  // would otherwise pass for the wrong reason — the plan is empty, the check
  // accepts an empty plan ONLY below the threshold, and a campaign at the
  // threshold is untouched, without which "return [] always" would pass too.
  const sitting = warmupPlan({ days: 3, hasFar: false });
  check('a three-level campaign schedules no warm-ups',
    sitting.length === 0, sitting.map(p => `d${p.day}:${p.format}`).join(' '));
  check('…and the schedule check accepts that rather than reporting all seven missing',
    judgeSchedule({ days: 3, hasFar: false }).problems.length === 0,
    judgeSchedule({ days: 3, hasFar: false }).problems.join(' | '));
  check('…while a campaign one day over the line still gets its openers',
    warmupPlan({ days: WARMUP_MIN_DAYS, hasFar: false }).length > 0
      && judgeSchedule({ days: WARMUP_MIN_DAYS, hasFar: false }).problems.length === 0,
    warmupPlan({ days: WARMUP_MIN_DAYS, hasFar: false }).map(p => `d${p.day}:${p.format}`).join(' '));
  check('and no run is due on a level of a one-sitting campaign',
    warmupDue(1, {}, {}, { days: 3, hasFar: false }) === null
      && warmupDue(2, {}, {}, { days: 3, hasFar: false }) === null);

  // warmupDue: the save record, and the story
  check('a done slot is not offered again',
    warmupDue(1, { 'trial-near': true }, {}, { days: 15, hasFar: true }) === null);
  const due = warmupDue(1, {}, {}, { days: 15, hasFar: true });
  check('an unauthored run still has words to show', !!due.title && !!due.why && due.authored === false);
  const authored = warmupDue(1, {}, { 'trial-near': { title: 'Walk the perimeter', why: 'Spies.' } },
    { days: 15, hasFar: true });
  check('an authored run uses the campaign\'s own words',
    authored.title === 'Walk the perimeter' && authored.authored === true);
  check('a run authored under its bare format name is found too',
    warmupDue(1, {}, { trial: { title: 'Walk the perimeter', why: 'Spies.' } },
      { days: 15, hasFar: true }).title === 'Walk the perimeter');

  // The story rule, which is what the theme-level check reports
  // The introduction rule, and the two ways it would otherwise pass wrongly: a
  // name with a job beside it must be accepted, and a bare surname must not.
  {
    const cast = [{ name: 'Ada Farrow', role: 'Operations Manager, Calder' }];
    const bare = { greet: { title: 'Get round the shift',
      why: 'Farrow wants you known to both crews before anything goes wrong on the night shift.' } };
    const said = { greet: { title: 'Get round the shift',
      why: 'Farrow, the operations manager, wants you known to both crews before anything goes wrong.' } };
    const full = { greet: { title: 'Get round the shift',
      why: 'Ada Farrow wants you known to both crews before anything goes wrong on the night shift.' } };
    check('a warm-up that names somebody and does not say who they are is a problem',
      unintroduced(bare, cast).length === 1, JSON.stringify(unintroduced(bare, cast)));
    check('…and one that puts their job beside the name is not',
      unintroduced(said, cast).length === 0, JSON.stringify(unintroduced(said, cast)));
    check('a full name is NOT an introduction — the job is what the rule is about',
      unintroduced(full, cast).length === 1, JSON.stringify(unintroduced(full, cast)));
    const verbed = { greet: { title: 'Get round the shift',
      why: 'Farrow runs the metering hut and wants you known to both crews before the handover.' } };
    check('…nor is a sentence that simply says what they do',
      unintroduced(verbed, cast).length === 0, JSON.stringify(unintroduced(verbed, cast)));
    // The case that passed for the wrong reason: an honorific read as a first
    // name, so "Dr. Patel has the notes" counted as a full-name introduction.
    const titled = [{ name: 'Dr. Maya Patel', role: 'ED Director' }];
    check('an honorific plus a surname is not an introduction',
      unintroduced({ greet: { title: 'x',
        why: 'Dr. Patel has the notes and the meeting she is going into lasts a whole hour.' } },
        titled).length === 1);
    check('…and the same card with her job on it is',
      unintroduced({ greet: { title: 'x',
        why: 'Dr. Patel runs the emergency department and has the notes you need before the meeting.' } },
        titled).length === 0);

    check('a name that is not on the roster is not a person',
      unintroduced({ greet: { title: 'x', why: 'Walk down Whitlock Street before the shift starts today.' } },
        cast).length === 0);
  }

  check('unwritten() names exactly the runs with no story',
    unwritten(two, { greet: { title: 'a', why: 'b' } }).join(',')
      === two.filter(p => p.slot !== 'greet').map(p => p.slot).join(','));

  const bad = cases.filter(c => !c.ok);
  for(const c of cases) console.log(`${c.ok ? '✓' : '✗'} selftest: ${c.name}${c.ok ? '' : ` — got: ${c.detail}`}`);
  console.log(bad.length ? `\n${bad.length} selftest case(s) failed.` : '\n✓ all selftest cases pass.');
  process.exit(bad.length ? 1 : 0);
}
