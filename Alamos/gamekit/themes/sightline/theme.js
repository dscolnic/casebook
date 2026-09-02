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
  // ---------------------------------------------------------- the delivery
  //
  // What the fifteen-day review produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One finding a day, in the order the file gave them up. The surveyed
  // distance is measured halfway through and moves everything written before
  // it.
  delivery: {
    name: 'The Ward Referral',
    what: 'The report the board acts on: what the file claimed, what can still be measured '
      + 'seven years later, and what one identification can and cannot support alone.',
    where: 'MEASURE',
    pieces: [
      'The file\'s unsupported claims',
      'The twenty-two-metre visual bound',
      'The reconstruction\'s chance bound',
      'The working-lamp model, premise open',
      'The first-interview pathways',
      'The post-event photograph finding',
      'The shared-source finding',
      'The array\'s functional size',
      'The surveyed thirty-four metres',
      'The blind-administration finding',
      'The streetlamp outage and confidence timeline',
      'The nineteenth-hour statement, weighted',
      'What one identification can carry',
      'The evidence not worth consuming',
      'The signed referral',
    ],
  },
  opening: [
    'In 2019 Alma Cardoza watched a robbery across Ferrier Street. Weeks later she picked Elias Ward '
    + 'out of six photos. Her choice is the only thing that put him in that shop, and he has served '
    + 'seven years of fourteen. You are the review analyst, and in fifteen days you hand the board the '
    + 'Ward Referral. The board does not ask who was in the doorway; if it says no, nobody looks at '
    + 'this case until 2033.'
  ],
  // The last thing anybody reads. What happened, what it cost, what is left.
  ending: [
    'The board chair signs the referral before the room empties. The board accepts the thirty-four-metre '
    + 'survey, the utility record showing column 4471 was out, the mock-witness evidence that the array '
    + 'pointed toward Ward, and the dating of Cardoza\'s confidence. It does not decide who stood in the '
    + 'doorway. Eleven months later the appeal court sets the conviction aside because the identification '
    + 'cannot carry the conviction standing alone. Ward leaves Hallam Correctional after eight years and one '
    + 'month, and the court says explicitly that it is not finding him innocent.',
    'What it cost: Alma Cardoza learns from a newspaper that the identification she gave in good faith has '
    + 'been dissected without another interview, because the unit chose not to create a new 2026 account and '
    + 'mistake it for the lost 2019 memory state. Karen Loomis is named in the judgment for a procedure that '
    + 'was policy when she ran it. What is unfinished: Hallam used the same policy until 2021, nobody has '
    + 'counted all of those arrays, and the unit receives enough funding to review only the cases in which '
    + 'somebody is still incarcerated.',
    'You did not prove Ward innocent and you did not need to. You measured the sightline instead of arguing '
    + 'about eyesight, separated a correct lighting calculation from a false premise, traced later details to '
    + 'later sources, and refused to turn a psychological tendency into a certainty about one witness. Then '
    + 'you signed only what the evidence could carry. A man walked out after eight years because the review '
    + 'finally asked the right question.',
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
