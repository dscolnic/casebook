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
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // AP Precalculus is a grade 10-11 course, so the type comes up a little larger
  // than the senior games and the reading gate is a grade tighter.
  audience: { grade: 11 },

  id: 'ghostlight',
  title: 'Ghost Light',
  subtitle: 'Production Manager · The Ellery Variety Theatre',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  site,

  // There is no door between the player and three of the six calls: the pit, the
  // production desk and the board are positions in the house, and the other three
  // are offices off the ring. "A room" is wrong for half of them and "a desk" for
  // the other half, so the plan card says: a place.
  stopNoun: 'a place',

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

  // No `interiors`. That block builds a room to walk *into*, in a district four
  // kilometres away, which is what a game with doors needs. The whole of this game
  // happens in one building the player is already standing in: the calls in the
  // house are desks on the rake and the calls in the offices are desks in the
  // offices. What the book wrote under `interiors` reads out on those desks' own
  // boards instead — see world.js.
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  interiorStyle: 'timber',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  opening: [
    'The Ellery is a theatre shut for eleven years, and it opens in a fortnight. The council '
    + 'will not let an audience in without a safety licence, and the inspection is on opening '
    + 'night. You are the production manager, so the lighting rig, the seats an audience can '
    + 'see from, and every number in that licence file are signed by you. Marguerite Sallow, '
    + 'the producer, has sold nine hundred seats on a plan drawn before anybody measured the '
    + 'building. Kwame Osei, the head flyman, works the ropes above the stage and says that '
    + 'plan hangs four tonnes on a grid nobody has tested. Forty-one people are on the payroll '
    + 'for a run that only exists if the doors open.',
  ],

  // How it ends. What came of the fortnight, what it cost, what is unfinished —
  // and then the paragraph that is easy to leave out, which is what the *player*
  // did. `checkStory` fails a closing paragraph not addressed to them.
  ending: [
    'The Ellery opened on the fourteenth, ninety minutes late, to eight hundred and sixty-one '
    + 'of nine hundred seats. The grid carries three and a half tonnes on a load plot that is '
    + 'on a wall rather than in somebody\u2019s head. The front six rows lost two seats each to '
    + 'a sightline nobody had drawn, and got them back when the mark moved. The licence was '
    + 'signed on the strength of a walked clearance of 148 seconds, seven better than the file '
    + 'had estimated and thirteen better than the first walk.',
    'What is unfinished is the roof. The rain that came through it on the ninth is still coming '
    + 'through it, and the run pays for a scaffold in March if the houses hold.',
    'You measured the room before anybody argued about it, so the load plot, the beam angles '
    + 'and the seat map are numbers rather than opinions. You are the reason the flying sequence '
    + 'has a margin in it, and the reason twelve seats that could not see were found in a '
    + 'rehearsal instead of by an audience. Forty-one people worked a run that opened because '
    + 'the arithmetic was finished in time.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    // The dome over the yard is 160 m, so the far plane has to clear it from the
    // far end of the site or the sky renders black in the one place it is visible.
    far: 260,
    // A dark house. The fog is the building's own darkness at the far wall.
    fog: { colour: 0x1a1418, near: 30, far: 120 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    // Four real lights: ambient, hemisphere, one key off the grid, one over the
    // yard. Everything else bright in this building is emissive.
    lighting: { ambient: 0.4, hemi: 0.45, key: 0.95, yard: 0.45 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
