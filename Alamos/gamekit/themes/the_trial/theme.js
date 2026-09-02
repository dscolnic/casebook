// theme.js — the manifest. This is the only file the engine reads directly.
//
// Start a game with the scaffold, not by copying this by hand:
//
//   npm run new-theme <name>              outdoor
//   npm run new-theme <name> -- --interior   a floor, not a town
//
// It copies this directory, imports book.yml over it and registers the theme,
// so `npm run check <name>` is green and `THEME=<name> npm run dev` is walkable
// before you have written a word. Then replace book.yml with the real book.
//
// Every key below is read by the engine. Nothing else in here is.
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  id: 'the_trial',
  title: 'The Trial',
  subtitle: 'Methodology & Operations Lead · CLARION-3',

  // AP Statistics with a pharmacology unit — the largest course none of the ten
  // other games touches. Grade 12: the type scales from this, and validateContent
  // fails a passage two grades over it.
  audience: { grade: 12 },

  // A mission really is one working day here, which is the one game in the set
  // where the default label is the true one.
  dayNoun: 'Day',

  // The brief plan card. What the day cards were carrying was a fortnight of
  // context read fifteen times — eleven to fifteen sentences, the whole cast
  // named on the plan card, and the argument between the trial chair and the
  // trial statistician restated every morning. `stakeStyle: 'brief'` is the
  // opt-in that says the card carries the one thing true this morning and the
  // one thing the player does about it; the cast now arrives on each call's
  // own `reason`, where the player is standing in front of them.
  stakeStyle: 'brief',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  site: { kind: 'interior', name: 'The Fenwick Coordinating Centre', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  // On the working floor, outside data management, facing up the corridor. The
  // clinic is a flight down behind you and the firewall a flight up ahead — the
  // day starts in the middle of the building on purpose.
  start: { x: 0, z: 33, yaw: 0 },

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // Background people. A narrow place needs far fewer: on the submarine more
    // than eight and the player cannot get down the passage.
    extras: 18,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town.
  interiors: INTERIORS,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'lab',

  // The title card: ONE paragraph of situation. No mechanics, no controls, no
  // scope note — every game had those and every game lost them.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One section a day, in the order the trial forced them. The pre-specified
  // claims are written first because every later section is read against them.
  delivery: {
    name: 'The Monitoring Board Pack',
    what: 'What the independent monitoring board reads before it decides whether CLARION-3 goes '
      + 'on: one section a day, and every claim in it made before the data arrived.',
    where: 'REG',
    pieces: [
      'The pre-specified claims',
      'The measurement procedures',
      'The two-site safety signal',
      'The unplanned look, accounted',
      'The fast site\'s audit',
      'The amendment\'s cost in events',
      'The missing-data rule',
      'The cold-room exposure note',
      'The blinding survey result',
      'The bias-adjusted estimate',
      'The locked file',
      'The three separated problems',
      'The multiplicity correction',
      'The stop-or-continue trade-off',
      'The signed board pack',
    ],
  },
  opening: [
    'CLARION-3 tests a new drug against the usual care. 2,400 people at 31 hospitals have joined it. '
    + 'Nobody running the trial may know which arm is ahead. You are the methods and operations lead, '
    + 'and in fifteen days you build The Monitoring Board Pack. A board of outsiders reads it in three '
    + 'weeks and decides whether more people are asked to join.'
  ],

  // The last thing anybody reads. Says what happened, what it cost and what is
  // unfinished, and takes all three from the fifteen days the player worked.
  ending: [
    'At three twenty-seven Vogt closes the pack you signed. The board recommends continuing to the '
    + 'planned event target, keeping the investigator-rated symptom score out of the headline efficacy '
    + 'claim and putting the four liver cases under formal safety follow-up. Eleven months later '
    + 'CLARION-3 locks on 383 adjudicated events. The final absolute risk reduction is 3.6 percentage '
    + 'points — about twenty-eight people treated for one event avoided — with a confidence interval '
    + 'that excludes zero but is wider than the team had hoped.',
    'What it cost: eleven more months of randomisation under genuine uncertainty; in hindsight, about '
    + 'half of those newly enrolled received the less effective arm. The subjective symptom result '
    + 'remains difficult to interpret because the blind leaked. The over-seventies signal is not '
    + 'replicated in two later studies. What is unfinished: long-term effects past two years, the '
    + 'meaning of four liver cases, and how a future trial hides an early visible treatment effect '
    + 'without letting that knowledge reach the outcome measurement.',
    'The board could make its decision because the pack did not pretend those questions were settled. '
    + 'You separated the endpoint that survived the blinding failure from the one that did not, kept '
    + 'the subgroup inside the family of fourteen that produced it, and labelled a forecast as an '
    + 'assumption instead of a measurement. The decision was the board\'s. The evidence it decided '
    + 'from was yours.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    // The spine is 74 m end to end and the fog has to sit beyond it, or the
    // far end of the corridor is a grey wall rather than a long view.
    far: 220,
    fog: { colour: 0xdfe4e6, near: 34, far: 130 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    lighting: { ambient: 0.55, hemi: 0.6 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
