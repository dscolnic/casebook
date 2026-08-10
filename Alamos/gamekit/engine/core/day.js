// day.js — a mission is a day, and a day is a countdown.
//
// The old model was a campaign clock: 480 hours, charged in lumps when the
// player walked somewhere (`walkCost`) or opened a question (`visitBuildingCost`).
// Two things were wrong with it. The player could not see what any decision was
// going to cost until after they had made it, and standing still was free — so
// the optimal play was to think for as long as you liked and then walk in a
// straight line, which is the opposite of the pressure the games are about.
//
// Now each mission is one working day with its own budget, running down in real
// time whether the player is walking, driving, reading a bio or sitting in a
// question panel. Nothing is charged; time is simply spent.
//
// ## The budget comes from the map
//
// A day whose three stops are at opposite corners of town needs more hours than
// a day that never leaves one building — so the budget is computed from the
// actual route, not authored. `budgetForRoute` walks the day's stops nearest-
// neighbour from the spawn, converts the distance to walking seconds, and then
// says that travel should be a little under half the day. The rest is what the
// player has to think, answer, get it wrong, and talk to people with.
//
// This means a theme gets a sensible day without writing a number, and a theme
// that moves a building gets a day that adjusts itself.

/**
 * Game minutes per real second — one, so the countdown ticks once a second and
 * reads as a clock rather than a blur. At 2.5 the minutes field moved two and a
 * half times a second, which looked like stuttering however smoothly it was
 * driven.
 *
 * Everything else here is expressed in game minutes, so changing this changes
 * how long a day *feels* without changing the shape of the budget: the travel
 * term is derived from walking seconds and multiplied back through this, so the
 * real time allowed for walking is the same whatever the rate.
 */
export const MINUTES_PER_SECOND = 1;

/** Player walking speed, m/s — `player.js` moves at 4.2 and sprints at 8.5. */
const WALK_SPEED = 4.2;

/** How much of a day travel should take, at a walk. The rest is the game. */
const TRAVEL_SHARE = 0.42;

/** Minutes allowed per stop for reading the panel and answering it. */
const MINUTES_PER_STOP = 45;

/** Nobody gets less than this, however tightly packed the stops are. */
const MIN_DAY_MINUTES = 180;

/**
 * The day's budget, in game minutes, for a route through these positions.
 *
 * @param spawn      {x, z} where the player starts the day
 * @param positions  [{x, z}] one per stop, in mission order; nulls are skipped
 */
export function budgetForRoute(spawn, positions){
  const pts = (positions ?? []).filter(p => p && Number.isFinite(p.x) && Number.isFinite(p.z));
  const stops = Math.max(1, pts.length);
  let metres = 0;
  let at = spawn && Number.isFinite(spawn.x) ? { x: spawn.x, z: spawn.z } : { x: 0, z: 0 };
  // Nearest-neighbour, because the player is free to choose their own order and
  // will mostly choose a sensible one. Budgeting for the worst order would make
  // every day generous; budgeting for the best would punish a reasonable one.
  const left = pts.slice();
  while(left.length){
    let best = 0, bestD = Infinity;
    for(let i = 0; i < left.length; i++){
      const d = Math.hypot(left[i].x - at.x, left[i].z - at.z);
      if(d < bestD){ bestD = d; best = i; }
    }
    metres += bestD;
    at = left[best];
    left.splice(best, 1);
  }
  const travelSeconds = metres / WALK_SPEED;
  const travelMinutes = travelSeconds * MINUTES_PER_SECOND;
  const minutes = travelMinutes / TRAVEL_SHARE + MINUTES_PER_STOP * stops;
  // Round to a quarter hour so the HUD reads like a shift and not a stopwatch.
  return Math.max(MIN_DAY_MINUTES, Math.round(minutes / 15) * 15);
}

/** "6h 45m" / "48m" — the countdown, in the player's units. */
export function formatCountdown(minutes){
  const m = Math.max(0, Math.round(minutes));
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`;
}

/** How far through the day, 0..1 — for a bar, and for the sun. */
export function dayProgress(state){
  if(!state?.dayBudget) return 0;
  return Math.min(1, Math.max(0, 1 - (state.dayLeft ?? 0) / state.dayBudget));
}

/**
 * The hour of the day to show and to light the world by.
 *
 * A day starts at 07:00 and the budget is stretched across to 19:00, so the sun
 * moves with the countdown rather than with a separate clock. The two used to
 * be able to disagree, and a player watching the light has to be watching the
 * same thing the HUD is counting.
 */
export const DAY_STARTS = 7;
export const DAY_ENDS = 19;
export function hourOfDay(state){
  return DAY_STARTS + dayProgress(state) * (DAY_ENDS - DAY_STARTS);
}
