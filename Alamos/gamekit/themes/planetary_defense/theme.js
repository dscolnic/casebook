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
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // What one mission is called here. The engine's model is a working day;
  // this campaign is not one, so the label is not either.
  dayNoun: 'Phase',


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

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  opening: [
    'A survey telescope flagged a faint moving point near the ecliptic four hours ago, and every orbit '
    + 'that fits it is still on the table — including the ones that end here. Nobody can yet say whether '
    + 'it is a hundred metres across or six hundred, which is the difference between losing a city and '
    + 'losing a country. You direct the campaign: the telescopes that chase it, the radar window that '
    + 'opens once in eleven years, and the spacecraft that would have to launch years before anyone is '
    + 'certain, because after the window closes nothing can be done at all.',
  ],

  look: {
    // DAYLIGHT OVERRIDE. The campaign is written for night — 19:00 through to
    // 07:00 — and `atmosphere.nightSky`, the fog colour and the light rig were
    // all tuned around that. This window runs a working day instead so the
    // ridge, the domes and the dish are visible. Put [19, 31] back to restore
    // the nocturnal game.
    dayWindow: [8, 20],
    fov: 66,
    near: 0.1,
    // Must clear the sky dome, which this site scales to 950, and the farthest
    // horizon rank at 820. At 900 the dome fell outside the frustum and was not
    // drawn at all: the page background showed through as a flat grey sky, with
    // the ranks and the stars still rendered in front of it. It reads as a
    // lighting problem and is a clipped object. `buildSky` now warns.
    far: 1400,
    // Thin cold air. At night this was nearly black, because at night the fog
    // is the sky; in daylight it has to be the haze instead or the far ranks
    // sit in a dark band under a bright sky.
    fog: { colour: 0xa8bcd0, near: 220, far: 900 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // A night scene has no sun to blow out, but it must not be lifted either:
    // `nightLift: 0` keeps the engine from raising exposure after dark, which
    // is what a daytime game wants at dusk and what turns this sky grey.
    // Under ACES with a bright sky IBL a mid albedo renders near-white, so an
    // outdoor daytime scene wants this below 1.0. `nightLift` is what stops the
    // engine raising exposure after dark and does nothing inside a day window.
    exposure: 0.88,
    nightLift: 0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // Daylight: the sun rig carries the scene and ambient drops back, or the
    // shadows fill in and the ridge goes flat. Still three real lights from
    // buildSunRig, against a ceiling of six; every lamp on the mountain stays
    // emissive and simply stops mattering while the sun is up.
    lighting: { ambient: 0.22, sun: 2.2, hemi: 0.75, shadowExtent: 140 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
