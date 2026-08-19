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

import theme from './theme.js';

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

/**
 * How fast the day runs while a panel is open — **stopped**, in every game.
 *
 * It was a quarter for most of this engine's life, on the argument that thinking
 * is not free. That argument was about the wrong thing. The clock exists to make
 * the *route* a decision — which calls to take, in what order, how far to walk,
 * whether to talk to anybody on the way. None of that is happening while a
 * question panel is up. What the quarter rate actually charged was reading the
 * evidence, which is the part the games are about, and it charged it hardest to
 * the player who most needed to re-read the scene.
 *
 * BELT is what made it obvious: a format with its own rising pressure, running
 * against a day that also ran down, charged the player twice for the one stop
 * meant to be enjoyable. The same objection turns out to hold for a Diagnosis
 * panel with six readings, for a junior edition where the reader is eleven, and
 * for anybody who alt-tabs mid-question.
 *
 * So the day runs while you walk, drive, fly, read a bio or stand still, and
 * stops while a panel is open. **Nothing else changed** — the budget is still
 * computed from the route, a day still ends, and running out still restarts it.
 * Time is spent getting places, not spent reading.
 *
 * Put 0.25 back here and every panel is charged again, including BELT's, whose
 * `pausesClock` flag survives precisely so that reversing this decision does not
 * silently un-fix the format it was made for.
 */
export const PANEL_PACE = 0;

/** Player walking speed, m/s — `player.js` moves at 4.2 and sprints at 8.5. */
const WALK_SPEED = 4.2;

/**
 * How fast the player actually gets between stops, in metres a second.
 *
 * A theme whose sites are kilometres apart does not walk between them, and
 * budgeting its day at walking pace produced a nineteen-hour shift. Planetary
 * Defense flies; `theme.travelSpeed` is the cruise it flies at. Everything else
 * walks and is unchanged.
 */
const TRAVEL_SPEED = Number.isFinite(theme?.travelSpeed) ? theme.travelSpeed : WALK_SPEED;

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
/**
 * Interiors are built in a district four kilometres along +x (see
 * `interiorBuilding.js`). A position out there is not a place in the town, and
 * budgeting a route to it produces a forty-hour day.
 */
const IN_TOWN = (p) => p && Number.isFinite(p.x) && Number.isFinite(p.z) && Math.abs(p.x) < 3000;

export function budgetForRoute(spawn, positions){
  const pts = (positions ?? []).filter(IN_TOWN);
  if(!IN_TOWN(spawn)) spawn = { x: 0, z: 0 };
  const stops = Math.max(1, pts.length);
  let metres = 0;
  let at = { x: spawn.x, z: spawn.z };
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
  const travelSeconds = metres / TRAVEL_SPEED;
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
 *
 * A theme may set its own window with `look.dayWindow: [from, to]`. An
 * observatory works nights: `[19, 31]` runs 19:00 through to 07:00 the next
 * morning, so the campaign is played under stars and the sun never rises. The
 * hour is returned unwrapped and the callers take it modulo 24, because a
 * window that crosses midnight has to stay monotonic to interpolate across.
 */
export const DAY_STARTS = 7;
export const DAY_ENDS = 19;
export function dayWindow(){
  const w = theme?.look?.dayWindow;
  if(Array.isArray(w) && w.length === 2 && Number.isFinite(w[0]) && Number.isFinite(w[1])){
    return [w[0], w[1]];
  }
  return [DAY_STARTS, DAY_ENDS];
}
export function hourOfDay(state){
  const [from, to] = dayWindow();
  return from + dayProgress(state) * (to - from);
}
