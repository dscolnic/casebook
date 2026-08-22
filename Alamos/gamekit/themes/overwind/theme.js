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

  id: 'overwind',
  title: 'Overwind',
  subtitle: "Winding Engineer's Assistant · Kerrow No. 3, twelve days before the licence",

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
    'Kerrow No. 3 is a mine, and everyone who works in it goes down twelve hundred and forty '
    + 'metres of shaft in a cage on a steel rope. A proposal to cut twelve seconds off every '
    + 'trip goes to the inspector who renews the winder\'s certificate in twelve working days. '
    + 'You are the winding engineer\'s assistant, so every number in it has to be one you can '
    + 'show the working for. Delia Marchetti, the winding engineer, has the arithmetic for the '
    + 'motor and the rope, and all of it assumes steady speed. Samuel Otieno, the chief rope '
    + 'examiner, says twelve hundred metres of steel bounces at a rhythm of its own. Forty-one '
    + 'men a shift ride whatever gets signed.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'The licence was granted on a cycle seven seconds shorter, with two limits '
    + 'in it that nobody would have written down a fortnight earlier: a cap on '
    + 'the speed at which the brake may be applied, and a prohibition on '
    + 'emergency stops on the descending wind except in an emergency. Marchetti '
    + 'was right about the machine — the motor reaches 81 per cent of its torque '
    + 'rating and 86 per cent of its power rating and the faster cycle uses the '
    + 'margin it has. Otieno was right about the rope. The March stop is in the '
    + 'file now with an explanation attached: a cage on 110 kilonewtons a metre '
    + 'travels its own speed divided by 5.25 after the drum has stopped, which '
    + 'was a metre and six tenths, and no pad ever made would have changed it.',
    'What it cost: five of the twelve seconds, a set of pads, and the maker\'s '
    + 'man going home with a set he had driven three hours to fit. What is '
    + 'unfinished: the rope\'s stiffness is still the maker\'s modulus rather '
    + 'than a measurement of this rope; there is a cage position recorder at the '
    + 'inset and none at the bank, which is the end where the same effect would '
    + 'be an overwind; and Craig\'s friction figure is still measured cold on a '
    + 'bench because nothing here can measure it hot.',
    'You differentiated a curve somebody had submitted as a shape, and took the '
    + 'drum\'s inertia off the drum instead of out of an eighteen-year-old file. '
    + 'You found the tension at the end of the rope where it is worst, and then '
    + 'you found the thing the inquiry could not: that a brake stops the drum and '
    + 'the cage is on a spring. A driver who had been cleared without being '
    + 'believed for eight months has an explanation with her name nowhere near '
    + 'the cause of it. That was your fortnight.',
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
