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

  id: 'aftershock',
  title: 'Aftershock',
  subtitle: 'Building Safety Coordinator · Kestrel Bay',

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
  interiorStyle: 'lab',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  opening: [
    'A magnitude 6.8 earthquake hit Kestrel Bay three days ago and the town is still standing, '
    + 'unevenly. You are the building safety coordinator, which means you decide which buildings '
    + 'people are allowed back into: green to enter, yellow for restricted use, red for nobody. '
    + 'Four hundred households are sleeping in halls waiting on those decisions, the hospital has '
    + 'a yellow placard on its front door, and the aftershocks have not finished. Upper Town sits '
    + 'on granite and lost its chimneys. The Flats sit on eighty-year-old fill and lost their '
    + 'streets.',
  ],

  ending: [
    'The last cordon came down in the ninth week, street by street, each one when the hazard '
    + 'written against it had been dealt with rather than on a date anybody promised. The hospital '
    + 'never closed. Bay Road School lost its gymnasium for a term and kept its classrooms. Every '
    + 'parapet on the Parade is tied back now, which was done while the scaffolding was still up '
    + 'and cost a third of what it would have a year later.',
    'What it cost: two weeks of a town living in halls, a six-storey block that will be taken down '
    + 'in the spring, and a recovery plan whose ground-improvement clause four hundred households '
    + 'have to find the money for. What is unfinished: the vault on the bench is still the '
    + 'reference station and still on weathered granite, the corrected amplification is a '
    + 'projection from nine boreholes, and the practice that would have caught all of it — writing '
    + 'down what an inspection could not see, and acting on that list — is a paragraph in a report '
    + 'until the next coordinator makes it a habit.',
  ],

  look: {
    // Late afternoon into dusk. Three days in, the Flats still have no supply,
    // so the town is lit by generators, floodlights and headlights — and a
    // nocturnal window is the one thing that makes this place look like nowhere
    // else in the set. The sun sits low across the bay for the whole shift.
    dayWindow: [15, 21],
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 900,
    // Dust. It reaches past the range front so the horizon ranks read, and it is
    // warmer and dirtier than the other games' haze — three days of pulverised
    // masonry has not settled yet.
    // Near was 120 and the middle distance read clean, which fought the smoke
    // columns and the drifting dust in props.js — a town on fire down the
    // street and crisp air between here and it. 90 puts the haze on the next
    // block, and the horizon ranks still come through at 900.
    fog: { colour: 0xc4bcae, near: 90, far: 900 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    exposure: 0.88,
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
