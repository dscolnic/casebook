// access.js — the sol a place is first needed, and whether it is open yet.
//
// A building the campaign has not needed yet stands sealed: no name on it, no
// door prompt, and the door does not open. It is named and opens on the sol the
// campaign first sends somebody, and stays open for the rest of the run.
//
// ## The rule this bends, and how far
//
// `orientation.js` says far ground is walkable from day 1 and that fencing it
// "teaches the player the world is smaller than it looks". That objection is
// about GROUND — an invisible wall in the open, with nothing to see and nothing
// to read. This is a **door**, and a door is a thing you walk up to, stand in
// front of and are told about. Nothing here stops the player crossing any part
// of the plain, walking round any building, or looking at anything. What is
// withheld is the inside of a room nobody has been sent to.
//
// That is the line: **seal doors, never ground.** A campaign that fences the
// plain has taken the world away; a campaign whose unopened doors are dark has
// given the player somewhere to arrive.
//
// ## What counts as "needed"
//
// Everything that can send a player somewhere, because a place that opens on the
// sol its question is asked but not on the sol a warm-up scatters a crate at its
// door is a locked door with an item behind it.
//
//   · a mission stop in that area
//   · a stop SITED there (see interiorFixtures.sitedAt)
//   · the delivery board's room
//   · a warm-up run that puts something at it
//
// Anything not named by any of those never opens, which is a finding rather than
// a feature — `engine/dev/placement.mjs` reports it.
import { sitedAt } from '../world/interiorFixtures.js';
import { warmupPlan } from './warmups.js';
import { tiersFor, unlockDay as siteUnlockDay } from './orientation.js';

const NEAR = 26;   // metres: a warm-up item this close to a door is "at" it

/**
 * `{ [placeId]: sol }` — the first sol each place is needed. Pure, and memoised
 * by the caller: it walks every mission and every warm-up.
 */
export function openingSols(theme){
  const out = {};
  // COURSE ADVENTURES ONLY. A Quick Discovery is nine stops in one sitting on a
  // 3 x 3 spine with no second day and nothing built over a fortnight — there is
  // no "not needed yet" for it to mean, and a sealed door in a game that lasts
  // twenty minutes is a door the player never sees open. `delivery` is the test
  // `checkDelivery` already uses for the same distinction.
  if(!theme?.delivery?.pieces?.length) return out;
  const first = (id, day) => {
    if(!id) return;
    if(out[id] == null || day < out[id]) out[id] = day;
  };
  const curriculum = theme?.content?.CURRICULUM ?? {};
  (theme?.content?.MISSIONS ?? []).forEach((m, i) => {
    for(const stop of m.stops ?? []){
      const lesson = curriculum[stop.group]?.[stop.lesson];
      const sited = sitedAt(theme, stop.group, lesson);
      first(sited ? sited.place : stop.group, i + 1);
    }
  });
  // The board is read from the sol it has anything on it, which is sol 1.
  if(theme?.delivery?.where) first(theme.delivery.where, 1);

  // A warm-up that scatters items at a place opens it, ON THE SOL IT RUNS.
  // `warmupPlan` owns the schedule and this must not re-derive it: the first
  // version fell back to sol 1 for want of a day, which opened every building the
  // HUNT touches on the first morning and made the whole feature invisible.
  const buildings = theme?.site?.buildings ?? [];
  const runs = theme?.content?.WARMUPS ?? {};
  const days = (theme?.content?.MISSIONS ?? []).length;
  let plan = [];
  try{
    const tiers = theme?.site ? tiersFor(theme.site) : { hasFar: false };
    const hasFar = !!tiers.hasFar;
    plan = warmupPlan({ days, hasFar, unlockDay: hasFar ? siteUnlockDay(theme.site) : 4 }) ?? [];
  }catch{ plan = []; }
  for(const { day, slot } of plan){
    for(const p of runs[slot]?.at ?? []){
      // THE NEAREST, not the first within reach. `find` returned whichever
      // building happened to be earlier in the site's own list, and the
      // Electrolysis Hall at 23 m took the crate that was 8 m from the Vehicle
      // Bay's door — so the bay never opened, and the run scattered an item at a
      // sealed building. A crate at a door nobody can go through is exactly the
      // failure this whole feature has to avoid.
      let near = null, best = NEAR;
      for(const b of buildings){
        if(!(b.group || b.enter)) continue;
        const gap = Math.hypot((b.x ?? 0) - (p.x ?? 0), (b.z ?? 0) - (p.z ?? 0));
        if(gap <= best){ best = gap; near = b; }
      }
      if(near) first(near.group || near.enter, day);
    }
  }

  // The far lap drives to the far ring, so the far ring opens with it. Without
  // this the ice cut is a place the campaign sends the player to on sol 4 and
  // never names, because no stop and no scattered crate is out there.
  try{
    const tiers = tiersFor(theme?.site);
    if(tiers.hasFar) for(const id of tiers.farPlaces ?? []) first(id, siteUnlockDay(theme?.site));
  }catch{ /* a site with no tiers has no far ring to open */ }
  return out;
}

/** Is this place open on this sol? Places nothing ever needs stay shut. */
export function isOpen(sols, id, week){
  const at = sols?.[id];
  return Number.isFinite(at) && (week ?? 1) >= at;
}
