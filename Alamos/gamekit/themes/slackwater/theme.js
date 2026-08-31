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

  id: 'slackwater',
  title: 'Slack Water',
  subtitle: 'Flood Prediction Lead · Sarn Barrage, twelve days to the storm tide',

  // Each mission is one working day before the springs arrive. The plan card prints this in front of the mission number.
  dayNoun: 'Day',
  // The plan card's opening blurb is a date stamp and two sentences: the one
  // thing true this morning, and what the player does about it. The long form
  // introduced two people by name and job title before saying what the day's
  // work was, and it read the same on the fourteenth morning as the first. The
  // cast, the argument and the stakes moved to the calls' own reasons and to
  // the people themselves. `engine/dev/checkStory.mjs` reads this and swaps the
  // 90-word floor for a 30-70 word band. See gamekit/BRIEFING_PASS.md.
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
    extras: 12,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town.
  // Merged, not replaced: `interiors.js` is generated from the book and
  // `minors.js` is hand-written — the four places that are not areas. See
  // ./minors.js and gamekit/PLACEMENT_PASS.md.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // The objects the questions are asked at, built on entry from the open call.
  // engine/world/interiorFixtures.js; catalogue in ./fixtures.js.
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
  // One term a day, in the order the estuary gave them up. Twelve days, so
  // twelve pieces: the shallow-water term is found late and moves every level
  // worked before it.
  delivery: {
    name: 'The Flood Gate Plan',
    meter: 'Plan signed',
    what: 'The operating order for the six flood gates: when dangerous water is expected, how '
      + 'wrong the tide calculation can be, and what the crew must still watch in real time.',
    where: 'PRED',
    pieces: [
      'What creates the spring tide',
      'What the real water is doing',
      'How far the water really travels',
      'How wrong the tide forecast can be',
      'How the ebb and flood currents differ',
      'How the wall amplifies returning waves',
      'How quickly the basin fills',
      'What the endless tails add up to',
      'The missing shallow-water tide',
      'What the error bounds do not cover',
      'The last assumptions checked',
      'The gate order, signed',
    ],
  },
  // Four beats, one sentence each, in this order: the threat, your job stated
  // as authority, the clock, and who pays. The long version had thirteen
  // sentences and six of them were the contents page of the handover — "It
  // gives the level predicted for each tide. It gives how wrong that level
  // might be." — with the only line that was actually the drama stranded at the
  // bottom behind the index. What the programme contains is now day 1's stake,
  // where the player is about to write the first piece of it, and the per-day
  // "one figure is settled a day" line is gone: the day cards demonstrate it.
  opening: [
    'Sarn Barrage is a flood barrier across a tidal river where it meets the sea. '
    + 'Its six gates protect low-lying grazing land used by ninety local farmers. '
    + 'In twelve days the biggest tide of the year arrives, and a coastal storm may push even more water in. '
    + 'Close the gates too late and seawater floods the marsh. Close them too early and river water backs up behind them. '
    + 'Idris Calloway, the chief tidal analyst, says the tide can be calculated in advance. '
    + 'Renate Oyelaran, the barrage master, says storms add water the tide equations cannot see. '
    + 'You are the flood prediction lead, and you must use calculus to decide what the water will do, how wrong the model can be, and exactly what the gate crew should act on.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'Before dawn, the eastern-gate crew is already in place because the corrected tide model has identified the dangerous window. '
    + 'The storm pushes the water above the astronomical tide alone, just as Oyelaran warned it could. The crew follows the rule you signed: use the prediction to prepare, then close on measured water with the gauge delay allowed for. '
    + 'The eastern gate comes down about forty minutes later than the old programme would have ordered it, and the low marsh stays dry by about a foot.',
    'The result did not come from choosing the model or the gauge. You rebuilt the model first. '
    + 'The twenty-nine omitted tidal constituents are bounded, the missing shallow-water overtide is now included, the basin filling time is solved instead of guessed, and the wall reflections are no longer mistaken for one arriving wave. '
    + 'Then you kept the storm surge separate, because no error bound on repeating tides can turn weather into a tidal constituent.',
    'The next safety plan now calls for a fast water-level sensor beside the slow stilling well, fresh levelling of the two uncertain tide stations, and a direct survey of the wall reflections. '
    + 'Those are the measurements that would make the next storm less of an argument and more of a measurement.',
    'You did not prove Calloway wrong or Oyelaran right. You used calculus to show where each of them was right. '
    + 'The prediction gave the warning; the measured water gave the final trigger. The farmers returned their livestock to a dry marsh the next morning. That was your call.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    // atmosphere.scale is 1200 and the far area is 224 m out, so this has to
    // reach past both or the dome clips and the sky renders black in daylight.
    far: 1600,
    // Estuary haze. The colour matches atmosphere.haze.day, or the far shore
    // sits against a sky of another colour and a seam appears along the horizon.
    fog: { colour: 0x9aa6ab, near: 140, far: 520 },
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
