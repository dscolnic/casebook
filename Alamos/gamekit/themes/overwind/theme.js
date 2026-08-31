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
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { FIXTURES } from './fixtures.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels.
  // grade 4 scales 1.18x, 7 scales 1.10x, 13 and up not at all.
  audience: { grade: 12 },

  // The plan card's opening blurb is a clock and two sentences: the one thing
  // true this morning and the one thing the player does about it. The cast,
  // the argument and the stakes live on the calls' own `reason:` lines and in
  // the day debrief instead. `engine/dev/checkStory.mjs` reads this and swaps
  // the word floor for a 70-word ceiling-only band. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  id: 'overwind',
  title: 'Overwind',
  subtitle: 'Mine Lift Safety Engineer · Kerrow Mine No. 3, twelve days to the inspection',

  // Each mission is one working day before the winder's certificate is renewed. The plan card prints this in front of the mission number.
  dayNoun: 'Day',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside site.js. Deep Watch does.
  site,

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: site.spawn,

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // Background people. A narrow place needs far fewer: on the submarine more
    // than eight and the player cannot get down the passage.
    extras: 10,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town.
  interiors: INTERIORS,
  // The objects the questions are asked AT, built into each room by
  // engine/world/interiorFixtures.js; catalogue in ./fixtures.js. Four of them
  // carry `from:`/`until:`, so the tip bench, the inquiry drawer and the winder
  // house are not the same rooms on day 12 that they were on day 1.
  fixtures: FIXTURES,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'steel',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One term a day, in the order the shaft forced them. Twelve days, so twelve
  // pieces: the rope's own period is found late and is what puts two limits
  // into the profile nobody would have written at the start.
  delivery: {
    name: 'The Safe Winding Plan',
    what: 'The operating rules the inspector will sign: how quickly the mine lift may accelerate, '
      + 'how fast it may run, when the brake may be used, and the physics behind every limit.',
    where: 'WIND',
    pieces: [
      'What the faster trip actually does',
      'The drum\'s true rotational inertia',
      'The maximum pull on the rope',
      'The motor torque required',
      'The energy in one full lift',
      'The force created by moving loads',
      'The value of gravity at depth',
      'The motor\'s peak power',
      'The rope\'s natural bounce period',
      'The March overshoot explained',
      'The brake\'s emergency-stop limit',
      'The signed safe profile',
    ],
  },
  // Five sentences: what this place is, what happened in March, why the same
  // failure could be dangerous, the inspection deadline, and the player's physics
  // mission. Technical mine vocabulary is kept out until the world is clear.
  opening: [
    'Kerrow Mine has a shaft 1,240 metres deep, where forty-one miners each shift ride in a steel cage — the mine\'s elevator — hanging from one long steel rope. '
    + 'Last March, during an emergency stop, the giant drum that moves the rope stopped on time, but the cage kept moving 1.6 metres past its landing. '
    + 'At the top of the shaft, the same extra motion could drive the cage into the steel safety structure above it. '
    + 'A safety inspector arrives in twelve days to decide whether this lift is safe to keep carrying people, just as the mine wants to make every trip faster. '
    + 'You are the engineer who must use physics to answer two questions: why did the cage keep moving, and what is the fastest way it can run safely? '
    + 'Twelve days of that work become the Safe Winding Plan, and the inspector reads nothing else.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'On inspection morning, the trial cage rises from 1,240 metres below on the profile you signed. It reaches the landing and stops where it should. '
    + 'The inspector approves a cycle seven seconds faster — not twelve — with the cage slowed to 4.5 metres a second before braking, descending emergency stops reserved for true emergencies, and the rope stiffness recalculated whenever the rope is shortened.',
    'March finally has an explanation. The brake stopped the drum on time; the 1,200 metres of stretched steel rope acted like a spring and carried the cage another 1.6 metres. '
    + 'Anand was right when she said the machine stopped and the cage did not. The pads were replaced after the incident, but they were not what caused the extra motion.',
    'The new safety record also calls for a cage-position recorder at the top landing, a direct measurement of the rope\'s stiffness, and brake-friction tests at real operating temperature. '
    + 'Those are the measurements that would have made March understandable the night it happened instead of eight months later.',
    'You did not make the mine faster by accepting more risk. You found where the real limits were: in the motor, the brake, and especially the long elastic rope between them and the people below. '
    + 'The miners get a faster trip because the physics says exactly how fast is safe. That was your call.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    // atmosphere.scale is 1100 and the gravity station is 367 m out, so this has
    // to reach past both or the dome clips and the sky renders black in daylight.
    far: 1600,
    // Moorland haze. The colour matches atmosphere.haze.day, or the far ranks
    // sit against a sky of another colour and a seam appears along the horizon.
    fog: { colour: 0x99a09c, near: 150, far: 520 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    exposure: 0.95,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // A 32 m headframe on open moor: the shadow map has to cover the yard rather
    // than the whole site, or a machine with no GPU spends its whole frame in the
    // shadow pass and the first frame arrives minutes late.
    lighting: { ambient: 0.08, sun: 3.0, hemi: 0.22, shadowExtent: 80 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
