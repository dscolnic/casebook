// place.js — what to call the destination, in the player's words.
//
// A group is a subject: Damage Control, Water Quality, Cardiology. A place is
// somewhere you can walk: "Forward Equipment & Handling", "Water Intake
// Laboratory". In the first three games those happen to be the same name, so
// the objective line printed the group and nobody noticed. On the boat they are
// not: the subject is Damage Control, the compartment is Forward Equipment &
// Handling, and "Go to Damage Control" sent the player looking for a room that
// does not exist.
//
// So the objective names the place, and keeps the subject as context only when
// the two differ.
import theme from './theme.js';
import { def } from './simulation.js';

/** The building or compartment where a group's work happens, or null. */
export function placeForGroup(group){
  if(!group) return null;
  const site = theme.site;
  const rooms = site?.plan?.rooms ?? [];
  const buildings = site?.buildings ?? [];
  return rooms.find(r => r.group === group) || buildings.find(b => b.group === group) || null;
}

/**
 * What to print for "go here". The place name if the site has one, the group
 * name otherwise, and both when they differ — the subject still has to be
 * visible, since it is what the question will be about.
 */
export function destinationLabel(group){
  const area = def(group);
  const place = placeForGroup(group);
  const subject = area?.name || group;
  if(!place) return subject;
  // "Molecular Identification Lab — Molecular Identification", or worse,
  // "Emergency & Triage — Triage & Emergency", helps nobody. The two names say
  // the same thing when one's words are contained in the other's, in any order:
  // then the place name is the whole label.
  if(saysTheSame(place.name, subject)) return place.name;
  return `${place.name} — ${subject}`;
}

/**
 * What a call tells you to do: go somewhere, or find somebody.
 *
 * Every game printed the *subject* of the call — "Discovery & Imaging",
 * "Astrometry & Orbit", "Damage Control" — in the plan table and the objective
 * banner. A subject is not an instruction and, on a site whose rooms are named
 * after their instruments, it is not even a place: nothing on the map or on any
 * door said "Astrometry & Orbit", so the plan named three things the player then
 * could not find.
 *
 * @param person  the character for a person stop, or null for a room stop
 * @param group   the area the call is about
 */
export function callLabel(person, group){
  if(person) return `Talk to ${person.name ?? 'your colleague'}`;
  // The PLACE only. `destinationLabel` appends the subject when the two names
  // differ, which is right for a line about what a stop is and wrong for an
  // instruction: "Go to Coordination Office — Survey & Response" names two things
  // and only one of them is somewhere you can walk. The subject is on the card
  // under the call, and on the door when you get there.
  const place = placeForGroup(group);
  return `Go to ${place?.name || def(group)?.name || group}`;
}

const NOISE = new Set(['and', 'the', 'of', 'a', '&', '-', '—']);
const words = (s) => new Set(String(s).toLowerCase().split(/[^a-z0-9]+/i)
  .filter(w => w && !NOISE.has(w)));

function saysTheSame(a, b){
  const A = words(a), B = words(b);
  if(!A.size || !B.size) return false;
  const [small, big] = A.size <= B.size ? [A, B] : [B, A];
  for(const w of small) if(!big.has(w)) return false;
  return true;
}
