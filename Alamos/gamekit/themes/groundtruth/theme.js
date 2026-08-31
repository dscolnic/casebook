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

  id: 'groundtruth',
  title: 'Ground Truth',
  subtitle: 'Measurements Lead · Station 12, where lightning is made on purpose',

  // A mission is one working day of a six-week storm season.
  dayNoun: 'Day',
  // The plan card's opening blurb is brief: the one thing that is true this
  // morning, and the one thing the player does about it. The cast, the
  // argument and the consequences move out to the calls' own reasons, to the
  // people, and to the day debrief. `engine/dev/checkStory.mjs` reads this and
  // swaps the word floor for a 0–70 word ceiling, and bans a roster name from
  // the stake, the briefing and the segue. See gamekit/THREE_PASS_BRIEF.md.
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
    extras: 10,
  },

  // What is inside each room the player walks into, from book.yml. Rooms are
  // built by engine/world/interiorBuilding.js on first entry, in a district
  // four kilometres from the town. Plus the two places that are NOT areas — the
  // screened room and the rocket store, which stood as facades until the
  // placement pass. A minor room has no case, no beacon and no board; see
  // ./minors.js.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },

  // The objects the questions are asked at, built from the room's own bounds by
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
  // One number a day, in the order the sky allowed. A number whose derivation
  // is not beside it is what this report exists to stop leaving the site.
  delivery: {
    name: 'The Station 12 Season Report',
    what: 'The proof the review and the crew both need: what last August\'s strike actually did, '
      + 'which measurements can be trusted, and the operating rule that gets six people inside in time.',
    where: 'SHOT',
    pieces: [
      'The crew-clear criterion',
      'The effective layer charge',
      'The cloud-ground potential',
      'The tip-field assessment',
      'The cloud-ground capacitance',
      'The stored-energy derivation',
      'The shared-reference finding',
      'The field and loop hazard',
      'The trench-coupling prediction',
      'The bonding-lead prediction',
      'The current-path finding',
      'The prediction, then measurement',
      'The bandwidth finding',
      'The last-shot coupling test',
      'The final report, signed',
    ],
  },
  // FIVE SENTENCES, four beats, in this order: the threat, the job as authority,
  // the clock, who pays. See gamekit/THREE_PASS_BRIEF.md mandate 6.
  //
  // What came out, and where it went. The old card spent its last sentence on the
  // handover's own cadence — "one number goes in a day, with the working" — which
  // is a description of the report rather than of the crisis, and it is now the
  // last two lines of day 1's stake, where the player is about to write the first
  // piece of it. The mechanism sentence ("trailing an earthed wire … past waiting
  // instruments") and the April earthing irony went too: day 1 already carries
  // both, and the trailer that "touched nothing it struck" says the interesting
  // half of the mystery in five words instead of twenty.
  //
  // The grade is the constraint here and not an afterthought: this card IS the
  // banked worst in plaincards-debt.json at 6.3, so the cut had to hold to the
  // tenth. Five sentences over 70 words is ~15 words a sentence against the old
  // 16, which by itself buys nothing — the lever was syllables. 6.3 → 6.0.
  opening: [
    'Station 12 makes lightning on purpose: a rocket carries a thin wire into a storm, and the '
    + 'crew measures the strike from safety. Last August one strike destroyed every circuit board '
    + 'in a trailer 200 metres away even though the lightning never touched it. You are the '
    + 'measurements lead, and what leaves the site is the Station 12 Season Report. In fifteen '
    + 'working days, find how the strike reached that trailer and '
    + 'write the rule that gets all six crew members inside before the sky becomes dangerous. '
    + 'Until you can defend both, Station 12 cannot safely keep firing.',
  ],

  // The last thing anybody reads.
  ending: [
    'Next season, the first fast cell comes across the flat sooner than the old rule would have '
    + 'allowed for. The new call goes out early. All six crew members are behind the shelter door '
    + 'before the field enters the danger band, and the launch stays on hold until the sky clears.',
    'The review funds the second mast. The trailer failure is recorded as inductive coupling through '
    + 'the long trench loop, supported by a calculation and a hall test that landed within nine per '
    + 'cent of the prediction. About eleven kiloamps left the down-conductor on an unplanned path. '
    + 'The old 25-ohm certificate is relabelled as a low-frequency resistance measurement. The '
    + 'predicted voltage on the six-metre bonding lead stays in the report too — clearly marked as '
    + 'a prediction that still needs a fast direct measurement.',
    'You did not make every uncertainty disappear. You separated measurements from models, tested '
    + 'the explanation that mattered, and changed the operating rule when the weather showed the '
    + 'old one was not safe enough. Station 12 stays open because the crew now knows both what the '
    + 'lightning can do and when to get out of its way. You signed the report that made that possible.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 900,
    // Storm haze rather than clear air: the fog colour matches
    // atmosphere.haze.day, or the far ranks sit against a sky of another
    // colour and a seam appears along the horizon.
    fog: { colour: 0x646b76, near: 120, far: 480 },
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
