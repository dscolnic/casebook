// orientation.js — near ground and far ground, and the two laps that teach them.
//
// A campaign opens on a place the player has never seen, and the first thing the
// day model does is hand them a list of calls and a countdown. `createDay`'s plan
// card names the stops and draws the map, which tells you *where* things are and
// nothing about what the ground between them is like. On a compact site that is
// fine. On a mountain ridge 1.6 km long, or a headland laid out in rings by
// isolation distance, it is a map of a place you have never walked.
//
// So a site with two tiers of ground gets two orientation laps, both TRIAL — the
// one format graded against the world rather than against a board:
//
//   before day 1            the near ground: the buildings you will work in all week
//   before the unlock day   the far ground, and the vehicles that make it reachable
//
// ## Why the tiers are computed and not authored
//
// Same argument as `budgetForRoute`: the budget comes from the map, so moving a
// building moves the budget. A `tier: 'far'` written in site.js is a second
// description of the map, and the two drift the first time somebody moves a
// dome. Here the split is measured from the spawn, and it follows the site.
//
// ## The rule, and why it has a ratio in it
//
// A largest-gap split alone will always find *a* split, including in a place that
// does not have one — Corbin Park's furthest ride is 156 m from the gate and its
// next-furthest is 126 m, and calling the flume "far ground" would be inventing a
// distinction to justify a feature. So a far tier exists only when the gap is a
// real one: the nearest far area must be at least `FAR_RATIO` times the distance
// of the furthest near area.
//
// That single number decides the whole feature per game, and it decides it
// correctly at both ends. Every interior campaign — the submarine, Mission
// Control, the coordinating-centre corridor, the dam, the hall with a street
// corner in it — has one tier of ground and therefore no second lap, with no flag
// to set and nothing to switch off. Which is the right answer for reasons that
// have nothing to do with geometry: there is no far ground on a submarine and no
// vehicle to unlock.

/** How much further the far tier has to be before it is a tier at all. */
export const FAR_RATIO = 2;

/**
 * And how far away in absolute terms, because a ratio alone is not enough.
 *
 * Calder Switching Station clears the ratio at 2.3 — its control room is 22 m
 * from the spawn and its metering hut is 48 m — and calling the metering hut "far
 * ground" would be absurd: you can see it from the gate. Below about this
 * distance the far tier is visible from the near tier, and a lap that drives you
 * to something already in shot teaches nothing. 120 m is roughly where a site
 * stops being one view.
 */
export const MIN_FAR_METRES = 120;

/** A site with fewer than this many areas cannot be split meaningfully. */
const MIN_AREAS = 4;

const dist = (a, b) => Math.hypot((a.x ?? 0) - (b.x ?? 0), (a.z ?? 0) - (b.z ?? 0));

/**
 * Split a site's areas into near and far ground, measured from the spawn.
 *
 * Returns `{ hasFar, near, far, cut, ratio, byGroup }`. `hasFar` false means the
 * place has one tier — no second lap, no unlock, and every stop open from day 1,
 * which is what every campaign does today.
 */
export function tiersFor(site) {
  const spawn = site?.start ?? site?.spawn ?? { x: 0, z: 0 };
  const byGroup = {};
  for (const b of site?.buildings ?? []) {
    if (!b.group) continue;
    // An area with more than one building is as far as its nearest door: the
    // player only has to reach one of them.
    const d = dist(b, spawn);
    if (byGroup[b.group] == null || d < byGroup[b.group]) byGroup[b.group] = d;
  }
  const entries = Object.entries(byGroup).sort((a, b) => a[1] - b[1]);
  const none = { hasFar: false, near: entries.map(([g]) => g), far: [], cut: Infinity, ratio: 1, byGroup };
  if (entries.length < MIN_AREAS) return none;

  // The largest gap between consecutive areas is the candidate split.
  let at = 0, gap = 0;
  for (let i = 1; i < entries.length; i++) {
    const g = entries[i][1] - entries[i - 1][1];
    if (g > gap) { gap = g; at = i; }
  }
  const lastNear = entries[at - 1][1];
  const firstFar = entries[at][1];
  const ratio = lastNear > 0 ? firstFar / lastNear : Infinity;
  if (ratio < FAR_RATIO || firstFar < MIN_FAR_METRES) return { ...none, ratio };

  return {
    hasFar: true,
    near: entries.slice(0, at).map(([g]) => g),
    far: entries.slice(at).map(([g]) => g),
    cut: (lastNear + firstFar) / 2,
    ratio,
    byGroup,
  };
}

/**
 * The day the far ground opens, and with it the vehicles.
 *
 * Four, because that is where the campaign already changes shape — `shapeMissions`
 * starts adding a callback on day 3, so day 4 is the first day that was already
 * going to feel different. A theme may move it; nothing else should.
 */
export const UNLOCK_DAY_DEFAULT = 4;

export function unlockDay(site) {
  const n = Number(site?.orientation?.unlockDay);
  return Number.isFinite(n) && n >= 2 ? Math.floor(n) : UNLOCK_DAY_DEFAULT;
}

/**
 * Which orientation lap, if any, runs before this day.
 *
 * `null` on every other day, and on every day of a one-tier site. The lap runs
 * *before* the plan card, so it teaches the ground the plan is about to name.
 */
export function lapFor(site, day) {
  const tiers = tiersFor(site);
  if (!tiers.hasFar) return null;
  if (day === 1) return { tier: 'near', groups: tiers.near, unlocksVehicles: false };
  if (day === unlockDay(site)) return { tier: 'far', groups: tiers.far, unlocksVehicles: true };
  return null;
}

/**
 * Is this stop callable on this day?
 *
 * The soft rule, and the distinction matters: far ground is **walkable from day
 * 1** — nothing is fenced, nothing is invisible, and a player who wants to look
 * at the radar dish on the first morning can. What it is not, before the unlock,
 * is *called*: no case is open out there and the day's route never sends you.
 *
 * Locking the ground instead would be house rule 8 with a schedule attached — a
 * player who walks somewhere and finds an invisible wall has learned that the
 * world is smaller than it looks, which is the opposite of what a lap teaches.
 */
export function callableOn(site, group, day) {
  const tiers = tiersFor(site);
  if (!tiers.hasFar) return true;
  if (!tiers.far.includes(group)) return true;
  return day >= unlockDay(site);
}

/** Are the vehicles signed out yet? */
export function vehiclesUnlocked(site, day) {
  const tiers = tiersFor(site);
  if (!tiers.hasFar) return true;      // one tier of ground: nothing to gate
  return day >= unlockDay(site);
}
