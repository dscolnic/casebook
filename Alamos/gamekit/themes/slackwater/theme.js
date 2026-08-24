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

  id: 'slackwater',
  title: 'Slack Water',
  subtitle: 'Tidal Prediction Lead · Sarn Barrage, twelve days before the springs',

  // Each mission is one working day before the springs arrive. The plan card prints this in front of the mission number.
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
    extras: 12,
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
    name: 'The Sarn Gate Programme',
    what: 'What the six gates come down on when the springs arrive: a predicted level, a bound '
      + 'on how wrong it may be, and a sentence saying what neither of them covers.',
    where: 'PRED',
    pieces: [
      'The board against the gauge',
      'The path\'s speed and heading',
      'The length and the displacement',
      'The bound on the tail',
      'The current rose\'s area',
      'The returning chain\'s total',
      'The impoundment solution',
      'The unmeasured tail, bounded',
      'The residual\'s shape',
      'The bound\'s real scope',
      'The rearranged integrals',
      'The gate programme, signed',
    ],
  },
  opening: [
    'In twelve working days the biggest tides of the year reach Sarn Barrage. A storm surge will sit '
    + 'half a metre on top of them. Six gates hold four hundred hectares of water back off the marsh. '
    + 'The gates move to a timetable. That timetable is written from predicted levels, not from '
    + 'measured ones. You are the tidal prediction lead. No level goes on the timetable unless you can '
    + 'show how it was worked out. In twelve days you hand over the Sarn gate programme. It gives the '
    + 'level predicted for each tide. It gives how wrong that level might be. It says what the '
    + 'prediction does not cover at all. One figure is settled a day. Ninety graziers move stock off '
    + 'the marsh on one number you signed.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'The eastern gate came down on the gauge, forty minutes later than the board '
    + 'would have had it, and the marsh stayed dry by about a foot. The springs ran '
    + 'to 11.6 m against a predicted 11.4, and the surge accounted for the '
    + 'difference almost exactly. The prediction the licence review will read now '
    + 'carries three things it did not carry a fortnight ago: the shallow-water '
    + 'term that the eight-constituent fit had been leaving in the residuals since '
    + 'commissioning, a bound of 0.19 m on the constituents nobody adds in, and a '
    + 'sentence saying that neither of those covers weather.',
    'What it cost: one generation window, four hours of turbine time on the biggest '
    + 'ebb of the year, and an afternoon of the contractor being told no. What is '
    + 'unfinished: the returned fraction at the wall is still worked out of gauge '
    + 'records rather than measured off the wall, so the armour on the last forty '
    + 'metres is sized for a first arrival rather than for a total; two of the six '
    + 'stations feeding the shallow-water fit have not been levelled since the '
    + 'barrage was built; and the stilling well still needs forty minutes, which '
    + 'is the whole reason any of this had to be argued.',
    'You took the prediction apart into the terms it is made of and put a ceiling '
    + 'on the ones nobody adds in. You found the term the residuals had been '
    + 'carrying for nine years, and you showed the expansion that produces it is '
    + 'still legitimate at the largest range of the year. And on the last '
    + 'afternoon you said out loud what neither bound covered, which is why the '
    + 'gate closed on a gauge reading and four hundred hectares of marsh had stock '
    + 'on it the next morning. Two signatures that had been in tension for nine '
    + 'years went on the same sheet. You wrote the paragraph that let them.',
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
