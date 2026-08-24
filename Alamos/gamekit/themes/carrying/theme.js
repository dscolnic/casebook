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

  id: 'carrying',
  title: 'Carrying Capacity',
  subtitle: 'Island Resources Officer · Vellan Island',

  // Each mission is one working day of the fortnight before the council votes. The plan card prints this in front of the mission number.
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
  // One condition a day, in the order the island forced them. A rate with no
  // period attached is what half of these replace.
  delivery: {
    name: 'The Vellan Conditions',
    what: 'What the council votes on: the water licence, the quota, the tip and the sailing, '
      + 'each with the rate and the limit it was actually written from.',
    where: 'COMMON',
    pieces: [
      'The stocks and flows, dated',
      'The recharge figure',
      'The food web efficiency',
      'The saline intrusion finding',
      'The sustainable catch',
      'The enforcement cost',
      'The kilowatt-hour price',
      'The concentration and load',
      'The children\'s dose limit',
      'The reef trend, uncaused',
      'The diesel efficiency',
      'The generator\'s average hour',
      'The biosecurity condition',
      'The age structure',
      'The carrying statement',
    ],
  },
  opening: [
    'Vellan is a small island, and its council votes in a fortnight. The vote is on a second ferry '
    + 'sailing every day. Under the island there are eleven months of fresh water left. You are the '
    + 'island\'s resources officer. The water licence, the fishing quota and the tip are all signed by '
    + 'you. In 15 days the council votes on the Vellan conditions you write. They say how much water '
    + 'may be pumped in a year. They say how much fish may be landed. They say what may be burnt, '
    + 'buried or brought ashore. One condition is settled each day, and each one carries the rate and '
    + 'the limit it came from. 91 people live here. 19 children are on the school register.',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'The council carried the second sailing by five votes to four, with the abstraction licence '
    + 'capped at recharge — two hundred and ninety-four thousand cubic metres a year, metered at '
    + 'the berth and read monthly rather than annually. The west ground kept its quota at last '
    + 'season\'s landing rather than the tonnage the ferry paper had asked for. Nineteen children '
    + 'are still on the register, and the school has a second sailing\'s fees behind it for the '
    + 'first time in eleven years.',
    'What it cost: the graziers accepted an inspected limit and two of them will not speak to '
    + 'the council office about it; the tip cell that should have been capped this summer waits '
    + 'for next year\'s money; and the diesel plant was sized on the July peak half hour, which '
    + 'means it runs at twenty-eight per cent of its plate for the other eleven months. What is '
    + 'unfinished: a fifth of everything the borehole lifts is still lost somewhere between it '
    + 'and the six standpipes, and nobody has dug up the island road to find out where. The tip '
    + 'is still up-catchment of the borehole, which is a decision made in 1974 and never revisited. '
    + 'The west ground is being worked at exactly the tonnage the model says it can replace, so '
    + 'one bad year is the whole margin. And eleven springs of one man counting the same reef is '
    + 'still the only baseline the island has.',
    'The licence says what the rain puts back because you went and worked out what the rain puts '
    + 'back. You capped the abstraction at recharge instead of at what the borehole could lift, you '
    + 'priced the plant off the half hour in July that actually sizes it, and you found the fifth of '
    + 'the water that never arrives. Ninety-one people have an island to live on for another eleven '
    + 'years, and the number in the licence is yours.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    // 700 m of sky dome plus 372 m of island: at 900 the dome is clipped
    // behind the player and the sky goes black to the north.
    far: 1500,
    fog: { colour: 0xc2ccd0, near: 180, far: 620 },
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
