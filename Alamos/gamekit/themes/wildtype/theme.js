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
import metrics from './metrics.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { MINOR_INTERIORS } from './minors.js';
import { dressRoom } from './story.js';
import { FIXTURES } from './fixtures.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';
import { OPENING, ENDING } from './cards.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels.
  // grade 4 scales 1.18x, 7 scales 1.10x, 13 and up not at all.
  audience: { grade: 12 },

  id: 'wildtype',
  title: 'Wildtype',
  subtitle: 'Junior Biologist · Pellow Head Island · fifteen days to the ship',

  // Each mission is one working day in the countdown to the ship's single safe repair window.
  dayNoun: 'Day',
  // The plan card's opening blurb is a brief stake: the one thing true this
  // morning and the one thing the player does about it, not a fortnight of
  // context. `engine/dev/checkStory.mjs` drops the word floor to zero and the
  // ceiling to 70 words for a theme carrying this flag. See BRIEFING_PASS.md.
  stakeStyle: 'brief',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside site.js. Deep Watch does.
  site,

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: site.spawn,

  // NO WARM-UP RUNS. A run before mission 1 is a tutorial wedged between the
  // opening card and the first thing the campaign says, and the later ones cost
  // a morning each on a campaign whose bible never asked for them. A campaign
  // that wants them authors them and sets this true. See engine/core/warmups.js.
  warmupRuns: false,

  // ------------------------------------------------- THE FOUR BARS
  //
  // Generated from §2 of the campaign bible by tools/bible-metrics.mjs: the
  // four bars with their starting values and lock missions, the recovery
  // formula, the bank cap, and each mission's target time, story event and
  // automatic change. Wiring it is what puts them on the screen — the file is
  // written either way, and a theme that does not import it scores nothing.
  metrics,
  // The bars are the score, so there is no funding round and no day countdown
  // beside them: two clocks on one screen is two clocks to choose between.
  economy: false,
  // The bible unlocks each stop from the one before ("Unlocks: Stop 3"), and
  // its beat script is keyed to the stop number that closed. See STOPS_IN_ORDER
  // in engine/core/constants.js.
  stopOrder: 'sequential',

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
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // The objects the questions are asked AT, built into the rooms by
  // engine/world/interiorFixtures.js; catalogue in ./fixtures.js. The GEN and
  // STORE keys are the two non-area places, and a lesson pointing at a fixture
  // under one of them is asked there rather than in its own area.
  fixtures: FIXTURES,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'lab',

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
  // One decision-ready piece of evidence a day. Twelve days,
  // so twelve pieces: the correction from fibre length to route position is
  // made late and the final piece is the repair order itself.
  delivery: {
    name: 'The Contained Pilot',
    what:
      'A fifteen-piece plan that Ada Penn and the mainland field crew read before '
      + 'a small, watched test of island plants and their tested partners.',
    where: 'PLAN',
    pieces: [
      'The feed correction',
      'The matched rinse',
      'The ventilated lids',
      'The small lamp trial',
      'The flower schedule',
      'The held tissue line',
      'The family test',
      'The enzyme lead',
      'The ancestry labels',
      'The insect history',
      'The varied seed stock',
      'The tested partners',
      'The prepared plots',
      'The night correction',
      'The signed stop rule',
    ],
  },
  // The opening establishes the place, the human consequence, the one repair window,
  // and the player's physics mission before any specialist cable language appears. That index used to
  // be five of fourteen sentences here ("It says … It says … It says …") and it
  // is day 1's stake's job: the player is about to write the first line of it.
  // The bible's own opening sequence, verbatim — see themes/wildtype/cards.js.
  opening: OPENING,

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, why the diagnosis worked, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  // The bible's own ending card, verbatim — see cards.js.
  ending: ENDING,

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    // atmosphere.scale is 1100 and the bay is 307 m out, so this has to reach past
    // both or the dome clips and the sky renders black in daylight.
    far: 1600,
    // Coastal haze. The colour matches atmosphere.haze.day, or the far ranks sit
    // against a sky of another colour and a seam appears along the horizon.
    fog: { colour: 0xa8b2b6, near: 160, far: 540 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    exposure: 0.95,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    lighting: { ambient: 0.08, sun: 3.0, hemi: 0.22, shadowExtent: 110 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  // The nine alive-world states and fifteen prop states, on their fixtures. See story.js.
  dressRoom,
  fitOutRoom,
  fitOutSpine,
};
