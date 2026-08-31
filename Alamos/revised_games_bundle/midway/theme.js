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
import { FIXTURES } from './fixtures.js';
import { MINOR_INTERIORS } from './minors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels.
  // grade 4 scales 1.18x, 7 scales 1.10x, 13 and up not at all.
  audience: { grade: 11 },

  // The plan card's opening blurb is a date stamp and two or three sentences: the one
  // thing that is true this morning, and the one thing the player does about it. The
  // long form — a name, a job title, an argument between two crew and what it costs —
  // was read fifteen times over a campaign and buried the one line that changes every
  // day under a paragraph that did not. The cast, the argument and the stakes did not
  // go away; they moved to the calls' own `reason:` lines, to the people themselves,
  // and to the day debrief. `engine/dev/checkStory.mjs` reads this and drops the
  // 90-word floor for a 70-word ceiling-only band. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

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
  // The seven ride rooms are generated from the book; the three non-ride rooms —
  // the workshop, the plant room and the boarded stalls — are hand-written and
  // merged over them. `import-book.mjs` never touches minors.js.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // Which object in each room a question is asked AT, built by
  // engine/world/interiorFixtures.js; catalogue in ./fixtures.js.
  fixtures: FIXTURES,
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
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One ride's working a day, in the order the park forced them. Eleven
  // notebooks of settings with no working anywhere is what this replaces, so
  // every entry carries its derivation rather than its number.
  delivery: {
    name: 'The Corbin Park Certificate',
    what: 'The one document the county signs before seven rides open: every limit with the '
      + 'working behind it, and everything the signature does not cover written down too.',
    where: 'TOWER',
    pieces: [
      'The first ride\'s working, written',
      'The brake energy figure',
      'The friction loss per lap',
      'The swing speed limit',
      'The seat and ram loads',
      'The bumper collision limits',
      'The pendulum period, from g',
      'The cracked arm assessment',
      'The regraded loop\'s speed',
      'The re-checked drop margin',
      'The flume\'s closed books',
      'The hot-Saturday limit',
      'The ranked crew order',
      'The signature\'s scope',
      'The conditions written down',
    ],
  },
  // Five sentences on four beats: the threat, the job as authority, the clock,
  // and who pays — in that order. What used to sit between the clock and the
  // cost was three sentences reciting what the certificate has to carry ("It
  // has to … It has to … It has to …"), which is an index of a document in
  // front of a reader who has not seen the document. That fact is load-bearing
  // and it moved: it is in day 1's stake now, where the player is about to
  // write the first line of it. The per-day "one ride's working a day" beat is
  // gone entirely — the plan card says which piece today is, every day.
  opening: [
    'The county has shut every ride at Corbin Park because nobody can prove the old settings are safe. '
    + 'Eleven notebooks contain the numbers, but almost none of the physics behind them. You are the ride '
    + 'engineer, and in fifteen days you decide which of seven rides can reopen. Sign a bad limit and riders '
    + 'take the risk; refuse everything and the park may lose the season. Your job is simple to say and hard '
    + 'to do: rebuild the proof before your name goes on the certificate.',
  ],

  // The last thing anybody reads: what happened, what it cost and what is left over.
  ending: [
    'Vey set the county seal on six rides. The tower passed its witnessed drop at 5.9 g against the '
    + '6.0 g test criterion. The carousel, bumper floor and flume opened on limits with their working '
    + 'attached. The ship opened only after its drive was retimed to the measured 6.15-second operating '
    + 'cycle. The coaster opened with a daily station-speed condition tied back to paired crown-speed tests, '
    + 'because the loop standing in the park is not the loop on the 1974 drawing.',
    'The Ferris wheel did not open. You had an estimated load in the number-nine joint and a measured '
    + 'crack-like indication, but no defensible allowable capacity for the damaged joint. Marsh asked what '
    + 'one more season would really change. You left the seventh signature line blank. The winter fracture '
    + 'assessment and a full coaster geometry survey were funded before the meeting ended.',
    'Six rides opened because the numbers could be defended. One stayed shut because they could not. '
    + 'That was the point of the certificate: not to make every ride pass, but to make every signature mean '
    + 'exactly what the evidence says it means.',
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
