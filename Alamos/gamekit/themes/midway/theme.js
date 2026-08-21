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
  audience: { grade: 11 },

  id: 'midway',
  title: 'Safety Factor',
  subtitle: 'Ride Engineer · Corbin Park',

  // A mission is one working day of a three-week shutdown. `dayNoun` reaches the
  // plan card, the continuity line and the turn-in button.
  dayNoun: 'Day',
  // What a non-person stop is called. Every area here is a ride, and the
  // building the question happens in is its station or its plant room.
  stopNoun: 'ride',

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
  opening: [
    'Corbin Park is an amusement park, and in October the county took away its certificate to '
    + 'open. The season starts in three weeks. Seven rides have to earn it back: a coaster, a '
    + 'wheel, a drop tower, a pirate ship, a carousel, a bumper floor and a log flume. The '
    + 'signature on all seven is yours. You are the ride engineer, hired in February, and what '
    + 'you inherited is eleven notebooks of settings and timings, forty-one years of them, with '
    + 'not one line of working anywhere. Delia Marsh, who owns the park, says eleven million '
    + 'people have ridden on those numbers unhurt. Marcus Vey, who inspects for the county, '
    + 'calls that a record of having got away with it.',
  ],

  // The last thing anybody reads: what happened, what it cost and what is left over.
  ending: [
    'Six of the seven opened. The tower went first, on a witnessed drop that logged 5.4 g against '
    + 'the 6.0 the certificate allows; the carousel and the swings opened on Brennan\'s own '
    + 'settings, which the derivations confirmed to within a degree; the ship opened after its '
    + 'drive was retimed from 5.60 seconds to the 5.90 the pendulum actually keeps, which Sam Idowu '
    + 'had been describing from the floor for two seasons. The coaster opened with a condition on '
    + 'it — a minimum station return speed, read with a wheel every morning before the first train '
    + '— because its loop was regraded in 1998 and the crown demands 8.5 metres a second rather '
    + 'than the 7.4 the 1974 drawing implies.',
    'What it cost: the wheel stayed shut. The load in arm nine\'s bolt group is computed at 52.7 '
    + 'kilonewtons and whether a 41-millimetre indication can carry it is a fracture assessment '
    + 'nobody on site could do in three weeks, so twenty-four gondolas stood still through the '
    + 'whole season and Marsh borrowed against next year to cover it. What is unfinished: the '
    + 'coaster\'s margin is 1.20 and falling about a tenth of a metre a second each season, so the '
    + 'morning rule buys time rather than settling anything; the flume\'s pump runs at 53.7 '
    + 'kilowatts against a 55-kilowatt plate; and the 1974 drawings are still the only ones the '
    + 'park has, now known to be wrong about at least one dimension by 1.8 metres.',
    'Six rides opened on your derivations. You computed what the notebooks only remembered, '
    + 'you retimed a drive from what the pendulum actually does, and you kept the wheel shut '
    + 'when keeping it shut cost the park a season. A summer of people rode safely and none of '
    + 'them will ever know your name. You will.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 950,   // the sky dome here is 850, and the rides are read at 400 m
    // Lake air in early spring: hazy at distance, and the far shore is the one
    // thing on the north skyline.
    fog: { colour: 0xbcc6c4, near: 230, far: 640 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    exposure: 0.78,
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
