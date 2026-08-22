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
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels.
  // grade 4 scales 1.18x, 7 scales 1.10x, 13 and up not at all.
  audience: { grade: 12 },

  id: 'darkfibre',
  title: 'Dark Fibre',
  subtitle: 'Optical Measurements Lead · Pellow Head, twelve days with a cable down',

  // Each mission is one working day before the repair ship sails on the thirteenth. The plan card prints this in front of the mission number.
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
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'lab',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  opening: [
    'An undersea cable runs out from Pellow Head, and nineteen days ago the light coming back '
    + 'dropped away. Something out there is broken, and everything has gone the long way round '
    + 'since. A repair ship is on charter from the thirteenth at forty thousand a day, and it '
    + 'digs where this station says. You are the optical measurements lead, so no position goes '
    + 'on that chart unless you can show how it was worked out. Ines Sarraf, the chief '
    + 'transmission engineer, has a trace putting the fault to within a few metres. Gerald '
    + 'Okonkwo, the station chief, laid this cable with slack coiled into it, and says the '
    + 'instrument measures along the glass while the ship searches the seabed.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'The ship sailed to 82.9 kilometres along the route rather than 84.6 along '
    + 'the fibre, and it went for a repeater rather than a break. Both halves of '
    + 'that were the fortnight: the loss was equal at both wavelengths, which no '
    + 'bend or crush can be, and switching repeater 6 to its spare pump returned '
    + '3.6 of the 4.1 decibels the span had lost. The position was 1.7 kilometres '
    + 'out for three reasons that all pointed the same way — the pulse travels at '
    + 'the group index and not the core index, there is more fibre than cable, '
    + 'and there is more cable than route. The housing on the deck was '
    + 'radiographed with a source at a tenth of its original strength, on an '
    + 'exposure of a hundred and twenty-six minutes, behind a barrier at eighteen '
    + 'and a half metres.',
    'What it cost: the only spare pump in that housing, six days of charter, and '
    + 'a set of eleven-year-old joints that are still in the shore end. What is '
    + 'unfinished: the new housing went to sea with its pump current telemetered '
    + 'and its optical output not, which is the measurement whose absence cost '
    + 'three weeks; the slack is still an average over a whole route rather than '
    + 'a survey of the twenty kilometres the ship worked in; and nobody has '
    + 'measured this rope of glass — the stiffness of the argument, the index a '
    + 'pulse really travels at on this cable, is still the maker\'s figure.',
    'You derived the acceptance cone, and then the distance, and then the three '
    + 'corrections that stood between a distance and a place. You found the '
    + 'ceiling on what a pump can ever give and used it to state a decline nobody '
    + 'could measure from shore. And you were the one who put the two-wavelength '
    + 'comparison beside the trace, which is what said the fibre was never '
    + 'damaged at all. A ship went to the right kilometre for the right object. '
    + 'That was your fortnight.',
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
