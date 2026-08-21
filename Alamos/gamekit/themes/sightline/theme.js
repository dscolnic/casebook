// theme.js — the manifest. This is the only file the engine reads directly.
//
// Sightline: AP Psychology, taught as the method of a conviction review. The
// place is themes/sightline/plan.js — one hall of a converted telephone
// exchange, with the Ferrier Street corner rebuilt across the south end of it
// and the distance marks let into the floor running away from it.
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  id: 'sightline',
  title: 'Sightline',
  subtitle: 'Review Analyst · Conviction Integrity Unit',

  // AP Psychology, all five units. Grade 12: the type scales from this, and
  // validateContent fails a passage two grades over it.
  audience: { grade: 12 },

  // Fifteen working days to the review board, and a mission really is one of
  // them.
  dayNoun: 'Day',

  site: { kind: 'interior', name: 'The Hallam Exchange', plan },

  // At the north end of the hall, facing down it — so the first thing
  // anybody sees is the shopfront fifty metres away, with the two case marks
  // between here and it.
  start: { x: 0, z: 39, yaw: 0 },

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    spawn: ROSTER.length,
    extras: 14,
  },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // The title card: ONE paragraph of situation.
  opening: [
    'On a November night in 2019 a stranger watched a robbery from across Ferrier Street. Her '
    + 'account put Elias Ward in prison, and he has served seven years of fourteen on no other '
    + 'evidence. You are the review analyst at the Conviction Integrity Unit, and the report '
    + 'going to the board in fifteen days is yours. The unit has rebuilt that corner, lit as '
    + 'the street was. Your work is what could have been seen from it. Ines Baptiste, the unit '
    + 'director, wants it filed this month. Ren Okada, the memory scientist, says the one '
    + 'account nobody has touched is what such a report would use up. Ward is thirty-four; if '
    + 'the board says no, nobody looks again until 2033.',
  ],

  // The last thing anybody reads. What happened, what it cost, what is left.
  ending: [
    'The board accepted the referral. It took the surveyed distance as read, accepted the '
    + 'functional size of the array and the dating of the certainty statement, and declined to '
    + 'draw any conclusion about what happened on Ferrier Street — which is what the report had '
    + 'asked it to do. State v. Ward went back to the appeal court eleven months later on the '
    + 'ground that the identification could not support the conviction standing alone. It was '
    + 'quashed. Ward left Hallam Correctional after eight years and one month, and the court '
    + 'said in terms that it was not finding him innocent.',
    'What it cost: Alma Cardoza learned from a newspaper that the identification she gave in good '
    + 'faith had been taken apart, and the unit had decided not to interview her, so nobody from '
    + 'it had told her anything. Karen Loomis is named in the judgment for a procedure that was '
    + 'policy when she ran it. What is unfinished: the same policy ran in Hallam until 2021, and '
    + 'nobody has counted the arrays. The unit asked for the funding to and was given half of it, '
    + 'which is enough for the ones where somebody is still inside.',
    'And that took somebody willing to be unpopular. You measured the distance instead of '
    + 'arguing about it, you dated every claim in the file, and you showed the array to people '
    + 'who were never there rather than asking a witness to be sure again. A man walked out '
    + 'after eight years. Your report is the reason.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // The hall is 54 m end to end and the fog has to sit well beyond it, or the
    // shopfront is a grey wall from the north end — which is the one view this
    // building exists for.
    far: 220,
    fog: { colour: 0xdcdad0, near: 75, far: 260 },
    exposure: 0.95,
    playerRadius: 0.38,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
