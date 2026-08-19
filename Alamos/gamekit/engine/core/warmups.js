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
//   before day 1 and day 2   TRIAL and GREET, in either order
//   before the unlock day    TRIAL again, and ONLY where there is far ground
//   after that               FOLLOW, HUNT, CANVASS, EVADE, TAG, one a day, in
//                            order, SPREAD across every day that is left rather
//                            than crowded into the days right after the openers
//
// **Either order is decided rather than left open.** A two-tier site opens on
// TRIAL, because the thing a player cannot read on that first plan card is the
// ground. A one-tier site opens on GREET, because its ground is one building and
// what a player cannot read is who everybody is. Both slots are always filled;
// which one leads is the only thing the geometry decides.
//
// **The five that follow are spread, not stacked.** The first version handed them
// out on the next five free mornings, so a fifteen-day campaign did all seven of
// its runs inside the first week and the back half of the game had none. That is
// the blocked-practice mistake `shapeMissions` already fixes for lessons, in the
// one part of the day the player meets before anything else. They are laid out
// evenly over the days that are left instead — first one as early as it can be,
// last one on the final day — so a run turns up about every third morning right
// through the campaign.
//
// **The second TRIAL is the far lap and nothing else.** On a one-tier site there
// is no far ground to learn, so there is no second lap and the five that follow
// simply start a day earlier. Nothing is authored to make that happen — the same
// argument as `tiersFor`: move a building and the schedule follows it.
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

/** The five that follow the two openers, in the order they are handed out. */
export const WARMUP_TAIL = ['FOLLOW', 'HUNT', 'CANVASS', 'EVADE', 'TAG'];

/** Both openers. Which one leads is decided by the ground — see the header. */
export const WARMUP_OPENERS = ['TRIAL', 'GREET'];

/**
 * The whole schedule for one campaign, as `[{ day, slot, format }]`.
 *
 * `slot` is the save key. It is the format plus its occurrence, so the two TRIAL
 * runs are `trial-near` and `trial-far` and cannot mark each other done — which
 * is the bug the old two-key scheme would have grown the moment a third lap
 * existed.
 */
export function warmupPlan({ days = 15, hasFar = false, unlockDay = 4 } = {}) {
  const plan = [];
  const [first, second] = hasFar ? WARMUP_OPENERS : [WARMUP_OPENERS[1], WARMUP_OPENERS[0]];
  const slotFor = (fmt, i) => (fmt === 'TRIAL' ? (i === 0 ? 'trial-near' : 'trial-far') : fmt.toLowerCase());
  plan.push({ day: 1, slot: slotFor(first, 0), format: first });
  plan.push({ day: 2, slot: slotFor(second, 0), format: second });
  const taken = new Set([1, 2]);
  if (hasFar && unlockDay >= 3 && unlockDay <= days) {
    plan.push({ day: unlockDay, slot: 'trial-far', format: 'TRIAL', far: true });
    taken.add(unlockDay);
  }
  // Every morning still free, and the five laid evenly over it. `round` rather
  // than floor so the last run lands on the last day: a campaign whose final
  // week opens with nothing is exactly what this replaced.
  const free = [];
  for (let d = 3; d <= days; d += 1) if (!taken.has(d)) free.push(d);
  const n = Math.min(WARMUP_TAIL.length, free.length);
  for (let i = 0; i < n; i += 1) {
    const format = WARMUP_TAIL[i];
    const day = n === 1 ? free[0] : free[Math.round((i * (free.length - 1)) / (n - 1))];
    plan.push({ day, slot: format.toLowerCase(), format });
    taken.add(day);
  }
  // Sorted by day: the far lap is appended before the tail is laid out, and a
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
    why: 'A lap of the places you will be working in. Every one is lit, take them in any order.',
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
