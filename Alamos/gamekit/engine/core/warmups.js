// warmups.js — the seven world-graded runs, and which one opens which day.
//
// TRIAL came first and was scheduled by geometry alone: a lap of the near ground
// before day 1, a lap of the far ground on the day the vehicles come out. Six
// more arrived — GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG — and they are not
// about the ground. They are about the people on it, which means the schedule
// stops being a property of the site and becomes a property of the campaign.
//
// ## The rule, in one place
//
//   before day 1    the single opener — TRIAL where there is far ground to
//                   learn, GREET where there is not
//   before day 4    the far lap, ONLY where there is far ground; otherwise the
//                   first of the tail formats below
//   before day 8    the next unused tail format
//   before day 13   the next unused tail format
//   everywhere else nothing — in particular, never before day 2
//
// A warm-up runs before missions 1, 4, 8 and 13 and nowhere else, as many of
// those four as the campaign is long enough to reach. This replaced an earlier
// schedule that opened day 2 on a second opener and spread the five tail formats
// over every remaining morning — a fortnight's campaign used to run all seven,
// now it runs at most four. Two openers on the first two mornings read as a
// tutorial stacked on a tutorial before the story had said a word; a single
// opener, told as one sentence of pure orientation rather than plot, is the
// whole job the first morning has to do (see the book's `warmups:` `why` for
// slot 1, which is deliberately NOT required to carry a story the way the later
// three are).
//
// **Which opener leads is decided by the ground, not left open.** A two-tier
// site opens on TRIAL, because the thing a player cannot read on that first plan
// card is the ground. A one-tier site opens on GREET, because its ground is one
// building and what a player cannot read is who everybody is. The other opener
// is not scheduled at all now — there is no second morning to give it.
//
// **The far lap is still the far lap and nothing else.** On a one-tier site
// there is no far ground to learn, so day 4 takes the first tail format instead,
// and the two remaining tail formats land on days 8 and 13. Nothing is authored
// to make that happen — the same argument as `tiersFor`: move a building and the
// schedule follows it.
//
// ## What is engine and what is authored
//
// The schedule is here, once. The *reason* is in the book: a warm-up with no
// story attached is a tutorial, and a tutorial is the thing the day model has a
// rule against. So each campaign authors a title and a why per format — worried
// about spies, looking for the missing crates, getting round the shift before
// the first shot — and the engine supplies the run.
//
// The runs' own numbers default from the campaign's own data (the areas for a
// lap, the roster for a round) so a book that authors only the story still gets
// a working warm-up. A book may override any of them.

// ## A campaign short enough to finish in one sitting has none
//
// The schedule above is written for a fortnight of mornings: two openers, a far
// lap where there is far ground, and five more laid out so a run turns up about
// every third day. A Quick Discovery is three levels and nine stops in one
// sitting, and handing it the same schedule opens two of its three cards on a
// run the player did not come for — the openers alone would be two thirds of
// the campaign, before a single stop. So a campaign under `WARMUP_MIN_DAYS`
// days schedules nothing.
//
// Derived rather than authored, for the same reason the tiers are: a `quick:
// true` on twenty-one themes is a second description of a shape the missions
// file already states. Move a campaign to four days and it gets its runs back.

/** Fewer days than this and the campaign is one sitting: no warm-ups at all. */
export const WARMUP_MIN_DAYS = 4;

/**
 * The most places or people either opener puts in front of a player.
 *
 * Both openers size themselves off the campaign's own data — the lap takes the
 * tier's areas, the round takes the roster — and on the bigger sites that came
 * out at ten gates and fourteen names before a single lesson. Two runs that long
 * are the tutorial the day model has a rule against, whatever their cards say.
 * Five is a lap you can hold in your head and a round you can finish, and the
 * campaign's own data still decides *which* five: cut the list, not the site.
 */
export const WARMUP_MAX_STOPS = 5;

/** The formats available to fill day 4 (when there is no far lap), 8 and 13. */
export const WARMUP_TAIL = ['FOLLOW', 'HUNT', 'CANVASS', 'EVADE', 'TAG'];

/** Both openers. Which one leads day 1 is decided by the ground — see the header. */
export const WARMUP_OPENERS = ['TRIAL', 'GREET'];

/** The only days a warm-up may ever be scheduled on. */
export const WARMUP_SLOT_DAYS = [1, 4, 8, 13];

/**
 * The whole schedule for one campaign, as `[{ day, slot, format }]`.
 *
 * Exactly one run before each of days 1, 4, 8 and 13 that the campaign is long
 * enough to reach — never day 2, never anywhere else. `slot` is the save key: the
 * two TRIAL runs are `trial-near` and `trial-far` and cannot mark each other
 * done, which is the bug the old two-key scheme would have grown the moment a
 * third lap existed.
 */
export function warmupPlan({ days = 15, hasFar = false, unlockDay = 4 } = {}) {
  // One sitting, no runs. See WARMUP_MIN_DAYS above.
  if (days < WARMUP_MIN_DAYS) return [];
  const plan = [];
  const tail = [...WARMUP_TAIL];

  // Day 1: the single opener. No second opener — there is no day 2 slot at all.
  plan.push(hasFar
    ? { day: 1, slot: 'trial-near', format: 'TRIAL' }
    : { day: 1, slot: 'greet', format: 'GREET' });

  // Day 4: the far lap where the unlock day actually falls there, else the
  // first tail format. A far site whose unlock day is not 4 keeps its lap on
  // the real unlock day (the vehicles have to come out with it) rather than on
  // a slot number that would strand the player without transport.
  const farDay = hasFar && unlockDay >= 2 && unlockDay <= days ? unlockDay : null;
  if (farDay != null) {
    plan.push({ day: farDay, slot: 'trial-far', format: 'TRIAL', far: true });
  } else if (4 <= days) {
    const format = tail.shift();
    if (format) plan.push({ day: 4, slot: format.toLowerCase(), format });
  }

  // Days 8 and 13: whatever tail formats are still unused, in order. Skipped if
  // an unusual unlock day already landed the far lap here — two runs cannot
  // share a day.
  for (const day of [8, 13]) {
    if (day > days || day === farDay) continue;
    const format = tail.shift();
    if (!format) break;
    plan.push({ day, slot: format.toLowerCase(), format });
  }

  // Sorted by day: the far lap may land off day 4 on an unusual site, and a
  // consumer that prints the schedule should not have to re-sort it.
  return plan.sort((a, b) => a.day - b.day);
}

/**
 * The warm-up owed before this day, or null.
 *
 * `done` is the campaign's own record, keyed by slot. `authored` is the book's
 * `warmups` block: `{ greet: { title, why, ... } }`. A scheduled warm-up with no
 * authored story still runs — with the engine's own words — because a missing
 * paragraph should not remove a run a player is expecting. `warmupOrder.mjs`
 * fails the theme instead, which is where a content gap belongs.
 */
export function warmupDue(day, done = {}, authored = {}, opts = {}) {
  const plan = warmupPlan(opts);
  const slot = plan.find(p => p.day === day);
  if (!slot || done[slot.slot]) return null;
  const key = slot.format.toLowerCase();
  const wrote = authored[slot.slot] ?? authored[key] ?? {};
  return {
    ...slot,
    ...wrote,
    title: wrote.title || DEFAULT_WORDS[slot.slot]?.title || DEFAULT_WORDS[key]?.title || 'Before the day starts',
    why: wrote.why || DEFAULT_WORDS[slot.slot]?.why || DEFAULT_WORDS[key]?.why || '',
    authored: !!wrote.title,
  };
}

/**
 * The engine's fallback words. Deliberately generic: they exist so that a run is
 * never offered with an empty card, and they are what `warmupOrder.mjs` reports
 * as unauthored. A campaign that ships these has a scheduled run and no reason
 * for it, which is the defect the check is looking for.
 */
export const DEFAULT_WORDS = {
  'trial-near': {
    title: 'Walk the site before you start',
    why: 'A lap of the places you will be working in, in any order.',
  },
  'trial-far': {
    title: 'The far end of the site opens today',
    why: 'The rest of the site is a long way out, and the keys come out with it. Learn the route.',
  },
  greet: { title: 'Get round the shift', why: 'Put a name to as many of them as you can before the work starts.' },
  follow: { title: 'Stay with them', why: 'Somebody is going to show you the route once.' },
  hunt: { title: 'Find them all', why: 'Several of the same thing are out there and the list is short.' },
  canvass: { title: 'Ask around', why: 'One question, asked until the answers mean something.' },
  evade: { title: 'Keep your distance', why: 'Somebody is following you and you would rather they did not.' },
  tag: { title: 'Catch them up', why: 'Somebody is leaving and you need a word first.' },
};
