// siting.js — where a lesson is asked, when that is not its own area.
//
// Extracted from interiorFixtures.js so that the engine and `placement.mjs` read
// the SAME rule. They did not: both carried their own copy of "a stop may be
// sited under a minor place", and when the engine's copy was widened to allow a
// day's questions to share one hall, the checker went on failing them as "the
// stop is in the wrong area" — a gate failing the feature it exists to permit.
// CLAUDE.md names this: two copies of one rule drift the first time either is
// corrected.
//
// No three.js here on purpose. A dev checker has to be able to import it.

/**
 * Where a lesson is asked, when that is not its own area.
 *
 * A lesson whose `at:` resolves under some OTHER place's fixtures is *sited*
 * there: the question still belongs to its area and is still about that area's
 * subject, and the player is sent to the tank farm to answer it because that is
 * where the tanks are.
 *
 * The search was once restricted to MINOR places, the enterable side buildings.
 * That ruled out the case that matters most: a day whose questions are about
 * objects that genuinely stand in ONE hall. Red Sand's sol 291 is the worked
 * case — the bed, the loop and the cold line take-off are one gas path behind
 * one door, and routing the player between three buildings to ask about them was
 * three walks for no reading.
 *
 * A lesson pointing at a fixture in its OWN area returns null: the ordinary
 * case, meaning "asked at home".
 *
 * Returns `{ place, fixture }`, or null.
 */
export function sitedAt(theme, groupId, lesson){
  const at = lesson?.at;
  if(!at) return null;
  if((theme?.fixtures?.[groupId] ?? []).some(f => f.id === at)) return null;
  for(const [key, list] of Object.entries(theme?.fixtures ?? {})){
    if(key === groupId) continue;
    const fixture = (list ?? []).find(f => f.id === at);
    if(fixture) return { place: key, fixture };
  }
  return null;
}

/**
 * The same rule, for a STOP rather than a lesson.
 *
 * A stop may carry its own `at:`, which wins over the lesson's. That matters for
 * a call no book wrote: `shapeMissions` adds a callback whose lesson is shared
 * with the day that first taught it, so the lesson's `at:` belongs to that other
 * day and cannot be changed without moving the original too. The stop is the
 * only place a per-day siting can live.
 *
 * `placement.mjs` already read `lesson?.at ?? stop.at`; nothing else did, so a
 * stop-level `at` resolved nowhere and the checker was describing a rule the
 * engine had not implemented.
 */
export function siteForStop(theme, stop, lesson){
  return sitedAt(theme, stop?.group, { at: stop?.at ?? lesson?.at });
}
