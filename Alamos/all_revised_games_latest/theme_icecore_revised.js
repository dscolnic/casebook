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

  id: 'icecore',
  title: 'Ice Core',
  subtitle: 'Season Science Lead · Vestri Dome',

  // Each mission is one day of the season before the aircraft comes in. The plan card prints this in front of the mission number.
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
  // ---------------------------------------------------------- the delivery
  //
  // What the fifteen-day season produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One finding a day, in the order the evidence changes the case: surface clock,
  // common measurement scale, separate ice and gas clocks, then the signed limits.
  delivery: {
    name: 'The Vestri Record',
    what: 'The record other groups will build on: what Vestri measured, which clocks and calibrations '
      + 'turn those measurements into climate history, and where the evidence stops.',
    where: 'DATA',
    pieces: [
      'The accumulation rate',
      'The recovery and custody log',
      'The counted-record limit',
      'The shared-instrument calibration',
      'The isotope-temperature calibration',
      'The first gas–ice age estimate',
      'The dust interpretation',
      'The volcanic ice-age tie point',
      'The deep-model limit',
      'The shared-dependency map',
      'The clock-alignment test',
      'The final drilling plan',
      'The cold-chain exception',
      'The robust comparison statement',
      'The signed Vestri Record',
    ],
  },
  opening: [
    'Vestri Dome and Skarv Camp drilled ice four hundred kilometres apart to recover the same stretch '
    + 'of climate history. Their records do not agree. If the difference is real, the region changed '
    + 'differently from place to place. If it comes from a measuring scale or a bad clock, publishing it '
    + 'as climate would put the mistake into every record matched to these cores later. You are the season '
    + 'science lead at Vestri. The Skarv samples leave on Thursday, and the final Vestri Record is signed '
    + 'in fifteen days. Two kilometres of core are already out of the ground. Your job is to find how much '
    + 'of the disagreement belongs to the ice, how much belongs to the methods, and what you can defend when '
    + 'the aircraft takes the shared samples away.',
  ],

  // The last thing anybody reads. Says what happened, what it cost and what is
  // unfinished, and takes all three from the fifteen days the player worked.
  ending: [
    'At 08:17 on Monday the Vestri Record went out. The first mismatch with Skarv had been about nine '
    + 'tenths of a per mil. Four tenths belonged to the two laboratories’ reporting scales. Much of what '
    + 'remained came from pairing an atmospheric gas event to ice on two different gas–ice clocks. The '
    + 'best alignment left only a small residual, but the final correction was not known tightly enough to '
    + 'turn that best value into a claim that the two sites were identical. The signed sentence said what '
    + 'survived the whole range: chronology explained part of the apparent disagreement, and the remainder '
    + 'was unresolved.',
    'The hole closed the season near 2,470 metres. Annual layers could be counted only through the section '
    + 'where the signals stayed resolvable; below that, the age scale remained a flow model constrained by '
    + 'volcanic and radiocarbon evidence. The generator failure did not magically destroy four gas sections. '
    + 'It broke their validated cold-chain record, so they were quarantined and the gas–ice correction stayed '
    + 'wider than planned. That uncertainty is printed in the record instead of disappearing into it.',
    'The aircraft lifted with the Skarv material on board and the two groups still had a scientific question '
    + 'between them. They did not have a false answer. You measured the common scale while you still could, '
    + 'kept the gas and ice clocks separate, checked modelled ages against markers the model did not create, '
    + 'and signed the qualified sentence when a cleaner headline was available. The Vestri Record can now be '
    + 'used by somebody who knows exactly where it is strong and exactly where it can still move.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 900,
    // Ice fog and blowing snow: a pale, close horizon with nothing behind it.
    fog: { colour: 0xd6dee6, near: 190, far: 620 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // Snow is the brightest ground in the set and blows out first.
    exposure: 0.80,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // A low sun and a bright surface: more bounce than anywhere else here.
    lighting: { ambient: 0.10, sun: 2.6, hemi: 0.42, shadowExtent: 140 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
