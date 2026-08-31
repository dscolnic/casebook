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
import { MINOR_INTERIORS } from './minors.js';
import { FIXTURES } from './fixtures.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels.
  // grade 4 scales 1.18x, 7 scales 1.10x, 13 and up not at all.
  audience: { grade: 12 },

  id: 'darkfibre',
  title: 'Dark Fibre',
  subtitle: 'Optical Measurements Lead · Pellow Head Island · twelve days to guide one repair attempt',

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
    name: 'The Repair Order',
    what: 'The two answers the ship needs before it leaves: what failed, and where along the seabed route it is.',
    where: 'TEST',
    pieces: [
      'The station launch cleared',
      'The trace delay as an optical distance',
      'A clean break ruled out',
      'The damaged route\'s remaining margin',
      'The receiver\'s photon count',
      'The receiver calibrated on its diode',
      'The replacement housing proved inspectable',
      'The two-wavelength fault test prepared',
      'The replacement housing cleared to sail',
      'The corrected seabed position',
      'The repeater diagnosis',
      'The signed repair order',
    ],
  },
  // The opening establishes the place, the human consequence, the one repair window,
  // and the player's physics mission before any specialist cable language appears. That index used to
  // be five of fourteen sentences here ("It says … It says … It says …") and it
  // is day 1's stake's job: the player is about to write the first line of it.
  opening: [
    'Pellow Head is a small island. Nearly every phone call and internet connection to the mainland runs through one fibre-optic cable on the ocean floor. '
    + 'Nineteen days ago it lost most of its signal, leaving the island on one backup line. If that fails, emergency calls, hospital links and normal communication with the mainland go down. '
    + 'A repair ship arrives in twelve days, just before bad weather closes the sea for weeks. It gets one safe day to pull up one part of the cable. '
    + 'You are the optical measurements lead. Use the physics of light to answer two questions: what failed, and where is it? '
    + 'Send the ship to the wrong thing or place, and Pellow Head may stay on its last link until the sea reopens. '
    + 'Twelve days of measurements go onto one page — the Repair Order — and the ship digs where it says.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, why the diagnosis worked, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'At dawn the captain takes the order you signed: recover repeater 6 at 82.9 kilometres along the route. The ship reaches the site inside the weather window, lifts the housing, and finds the aging pump you diagnosed. '
    + 'The replacement housing is ready, the repair is made, and the main fibre link comes back before the sea closes.',
    'The ship succeeded because the physics answered both halves of the problem. A clean break should have sent back a strong reflection and did not. A bend or crush should have hurt the longer test wavelength more and did not. '
    + 'Switching to the spare pump returned 3.6 of the missing 4.1 decibels. And correcting the pulse speed, the extra fibre inside the cable and the slack on the seabed moved the target from 84.6 to 82.9 kilometres.',
    'You did not use equations because the ship needed equations. You used them to decide which measurements to trust, which explanations to reject, what object to recover and where to find it. '
    + 'Pellow Head gets its main connection back because the repair ship went to the right place for the right reason. That was your call.',
  ],

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
  fitOutRoom,
  fitOutSpine,
};
