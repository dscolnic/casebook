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

  id: 'blackout',
  title: 'Blackout',
  subtitle: 'System Operator · Calder Interconnection',

  // Each mission really is one working day, so the plan card's "Day N" is right.
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
    extras: 18,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town.
  interiors: INTERIORS,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'steel',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  // One paragraph of situation. No mechanics, no controls, and never a list of
  // what the player does not do.
  opening: [
    'Four million people are supplied from the Calder network, and the whole of '
    + 'it runs on one number. Mains frequency has to stay within half a hertz of '
    + 'fifty. Drift further and generators start tripping off, which takes the '
    + 'rest of the system with them. You are the system operator on nights. The '
    + 'power stations belong to companies you can instruct under contract and '
    + 'cannot order about. Demand rises and falls with whatever four million '
    + 'people happen to be doing. Holding the two together, second by second, is '
    + 'the job. A fault takes seconds. Getting a system back after one has gone '
    + 'down takes days, and the hospitals on this network hold about eight hours '
    + 'of their own generation.',
  ],

  ending: [
    'The valley was back inside three hours and the report went out on the Friday, with the '
    + 'findings ranked by the evidence under them and the cause of the trip written down as an '
    + 'open question. The corridor sensor reads true now. The second circuit is strung and '
    + 'energising next autumn, which means eighteen more months of the corridor you have been '
    + 'holding all fortnight, at the strength you now know it has.',
    'What it cost: seven hundred and fifty megawatt-hours never delivered, a fifth of an island '
    + 'shed to hold its frequency, and ninety hours of a conductor quietly losing strength that '
    + 'nobody had added up. What is unfinished: the trip has no proven cause, the store has been '
    + 'measured once, and the practice that would have caught all of it — check any instrument a '
    + 'decision rests on against something independent — is a paragraph in a report until somebody '
    + 'on nights makes it a habit.',
    'And you held it. A fortnight on a corridor with no margin: you checked the instruments '
    + 'the decisions rested on, you shed load when shedding it was the unpopular call, and you '
    + 'wrote down what you could not yet prove. Four million people had power through a '
    + 'fortnight that could have gone very differently. That was your fortnight.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 900,
    // Reaches past the horizon ranks, which sit at 520 and 680 in site.js. The
    // engine's default is 150/460, tuned for a river city where the far bank is
    // the horizon; copied onto this plain it put both ranks and the whole
    // switchyard approach behind a wall of flat haze, and the place lost its
    // skyline — which for a transmission site is the thing worth looking at.
    fog: { colour: 0xb9c4c8, near: 200, far: 950 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    exposure: 0.86,
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
