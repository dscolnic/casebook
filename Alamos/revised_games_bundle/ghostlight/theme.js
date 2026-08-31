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

  // Each mission is one working day of the fortnight before opening night. The plan card prints this in front of the mission number.
  dayNoun: 'Day',

  // The opening blurb used to spend its length on who said what backstage —
  // the crew, the argument and the stakes moved to the calls' own reasons
  // instead, which is where the player actually meets the cast.
  // `engine/dev/checkStory.mjs` reads this and drops the 90-word floor
  // entirely, with a 70-word ceiling in its place. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

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
  //
  // AND THEREFORE NO `fixtures`, WHICH IS NOT AN OVERSIGHT. `interiorFixtures.js`
  // builds a fixture on entry to a room from `theme.interiors`, and `sitedAt`
  // resolves a minor place out of `site.buildings[].enter` — an outdoor concept.
  // This game has neither, and `tiersFor` finds no far tier in a building 94 m
  // end to end (it wants 2.0x the next place in, and at least 120 m). So
  // `placement.mjs`'s "declares no fixtures" notes are a statement about the
  // machinery, not a gap in the content, and pointing `at:` keys at a
  // `fixtures.js` here would label a call at a place and build the object
  // nowhere. What the placement pass buys instead is in `world.js` under "what
  // the building has today": the stalls have no seats until day 9, the rig goes
  // out over days 3/5/8/13, and the scene dock's door is shut and its plate dark
  // until the lorry comes through it.
  interiorStyle: 'timber',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One number a day, in the order the building gave them up. The walked
  // clearance comes last and is the one the licence is signed on.
  delivery: {
    name: 'The Ellery Licence File',
    what: 'What the inspector reads on opening night: every number the licence rests on, '
      + 'measured in this building rather than inherited from a plan drawn before anybody '
      + 'looked.',
    where: 'FRONT',
    pieces: [
      'The eleven-year rate',
      'The two kinds of list',
      'The lantern angle',
      'The wave\'s four numbers',
      'The fader\'s arithmetic',
      'The level and the period',
      'The room\'s decay',
      'The level at the performer',
      'The grid load plot',
      'The seat map, to print',
      'The colour matrix',
      'The two-rate meeting',
      'The rig\'s coordinates',
      'The last rehearsal\'s list',
      'The opening recommendation, signed',
    ],
  },
  // FIVE SENTENCES, four beats, in this order: the threat, your job as
  // authority, the clock, who pays. What used to be here was the same threat
  // followed by six sentences of index — "It says what the grid can carry. It
  // says what the room does to sound and light. It says how long the house takes
  // to empty" — and a per-day line about one number a day, which the plan cards
  // demonstrate on their own. The load-bearing fact in all of that is that the
  // file is measured in this building rather than copied off the 1911 and 1958
  // drawings, and it is now the last two sentences of day 1's stake, where the
  // player is about to write the first piece of it.
  //
  // And the reading grade is the whole difficulty of the cut, not an afterthought:
  // fifteen short sentences scored 3.1, and five sentences holding the same 90
  // words score 7.4 on sentence length alone. Every word here is chosen for
  // syllables — "dark eleven years", "the first night", "a crowd can see from" —
  // which brings it back to 5.8, under the banked worst of 6.0. Do not lengthen a
  // word in this paragraph without re-running plainCards.
  opening: [
    'The Ellery has been dark eleven years; the only light left on stage is the ghost light. '
    + 'Nine hundred seats are on sale for a reopening in two weeks, but the rig, sightlines and exit '
    + 'plan still rest on drawings and settings older than most of the crew. You are the production '
    + 'manager, and your name goes on the licence file. In fifteen days you must prove what this '
    + 'building can actually do. If the numbers do not hold, the audience does not come in and '
    + 'forty-one people lose the run.',
  ],

  // How it ends. What came of the fortnight, what it cost, what is unfinished —
  // and then the paragraph that is easy to leave out, which is what the *player*
  // did. `checkStory` fails a closing paragraph not addressed to them.
  ending: [
    'The Ellery opened on the fourteenth to eight hundred and sixty-one people. Twelve sold seats '
    + 'that could not see the original mark kept their view after the mark moved 1.2 metres downstage. '
    + 'The flying file no longer claims the grid carries an invented extra mass: it lists the vertical '
    + 'and lateral forces at the points where they act, and the reviewed configuration is the one that '
    + 'flies. The first exit walk failed at 161 seconds; after the scenery rack was cleared from the '
    + 'stage-left pass, two repeat walks came in at 146 and 148. Pell signed the opening on those '
    + 'conditions, not on the old 138-second estimate.',
    'What is unfinished is the roof, and the full-room band balance still needs a clean measurement. '
    + 'The rain that came through on the ninth is still a maintenance problem, and the acoustic decay '
    + 'number says what the room changed without pretending it is a fader setting.',
    'You measured the room before anybody argued about it. The seat map is tied to a real mark, the '
    + 'rig plot states its reference, the load file keeps vectors separate, and a failed exit model is '
    + 'still in the record beside the walks that replaced it. Hettie Prosser watched from row A seat 12, '
    + 'forty-one people worked the run, and when the house lights came up the ghost light was no longer '
    + 'the only reason the Ellery was bright. Your signature meant exactly what the evidence could bear.',
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
