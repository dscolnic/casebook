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
import { MISSIONS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  id: 'planetary_defense',
  title: 'Planetary Defense',
  subtitle: 'Campaign Director · International NEO Response',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside site.js. Deep Watch does.
  site,

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: site.spawn,

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY },

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
  // Dark surfaces and red service lighting: an observatory control room is lit
  // to preserve night vision, and it looks like nowhere else in this set.
  interiorStyle: 'observatory',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  opening: [
    'A survey telescope flagged a faint moving point near the ecliptic, and the arc is four hours long. '
    + 'You direct the campaign that decides what that point is: whether it is a real object, where it is '
    + 'going, how big it is, what it is made of, what it would do if it arrived, and whether anything can '
    + 'be done about it. Six groups work for you and none of them can settle it alone — an orbit without a '
    + 'size is not a consequence, and a size without a reflectivity is not a size. The hardest part is not '
    + 'the arithmetic. It is that the answer changes as observations arrive, in public, while people are '
    + 'asking whether to leave their homes.',
    'Each day opens with its calls and you take them in any order. The clock runs while you cross the '
    + 'campus and at a quarter rate while you are reading a panel. A wrong call costs $5 to work again or '
    + '$10 to leave open; run out of either and you take the day again. Whatever time is left when the '
    + 'calls are made is yours — people here will tell you things if you ask them.',
  ],

  look: {
    // The campaign is played at night, 19:00 through to 07:00. `day.js` reads
    // this and the sun angle follows the countdown, so the sky darkens toward
    // midnight and greys at the end of a shift — and never rises.
    dayWindow: [19, 31],
    fov: 66,
    near: 0.1,
    // Must clear the sky dome, which this site scales to 950, and the farthest
    // horizon rank at 820. At 900 the dome fell outside the frustum and was not
    // drawn at all: the page background showed through as a flat grey sky, with
    // the ranks and the stars still rendered in front of it. It reads as a
    // lighting problem and is a clipped object. `buildSky` now warns.
    far: 1400,
    // Thin cold air. The fog colour is nearly black; at night it is the sky.
    fog: { colour: 0x121721, near: 180, far: 620 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // A night scene has no sun to blow out, but it must not be lifted either:
    // `nightLift: 0` keeps the engine from raising exposure after dark, which
    // is what a daytime game wants at dusk and what turns this sky grey.
    exposure: 1.0,
    nightLift: 0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // Starlight and a moon: a little ambient, a weak cold key, and hemisphere
    // light doing most of the work. Six real lights is the ceiling and the sun
    // rig already makes three; every lamp on the mountain is emissive.
    lighting: { ambient: 0.30, sun: 0.9, hemi: 0.55, shadowExtent: 140 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
