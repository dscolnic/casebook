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

  // The plan card's opening blurb is a date stamp and two sentences: the one
  // thing that is true this morning, and the one thing the player does about
  // it. The cast, the argument and the stakes live on the calls' own
  // `reason:` lines and in the day debrief instead of on the plan card.
  // `engine/dev/checkStory.mjs` reads this and swaps the 90-word floor for a
  // 30-70 word ceiling-only band. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  id: 'carrying',
  title: 'Carrying Capacity',
  subtitle: 'Island Resources Officer · Vellan Island, fifteen days to the ferry vote',

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
  // The generated area rooms, plus the three hand-written minor rooms — the
  // school, the berth and the council hall — which are keyed by `enter:` in
  // site.js rather than by an area. See themes/carrying/minors.js.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },

  // What each question is asked AT. Declared by name and wall, never by
  // coordinate — the engine computes the position from the room's own bounds.
  // Three of the keys are minor places, which is how a question gets sited
  // outside its own area. See themes/carrying/fixtures.js.
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
  // What the fifteen-day investigation produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One piece of the second-ferry decision each day: first establish the island's
  // limits, then find the hidden losses, then turn the science into enforceable conditions.
  delivery: {
    name: 'The Second-Ferry Plan',
    what: 'What the council votes on: whether to add the second summer sailing and the water, fishery, '
      + 'waste, power and biosecurity conditions that must come with it.',
    where: 'COMMON',
    pieces: [
      'What the island actually depends on',
      'The groundwater recharge estimate',
      'The ecological limits',
      'The aquifer warning',
      'The fishery ceiling',
      'The enforcement plan',
      'The hidden losses',
      'The school-water finding',
      'The waste and land-use controls',
      'The reef evidence',
      'The energy and emissions ledger',
      'The leak and turbine case',
      'The biosecurity rule',
      'The population outlook',
      'The conditional ferry recommendation',
    ],
  },
  // Five sentences: what Vellan is, why the school and community are under pressure,
  // what the proposed ferry could help and harm, the fifteen-day clock, and the player's
  // environmental-science mission. The technical vocabulary comes after the mental picture.
  opening: [
    'Vellan is a small island with 91 residents and one ferry to the mainland each day. '
    + 'Its school has only 19 children left; if the roll falls to 12, it closes, and families are already leaving. '
    + 'The council wants a second daily summer ferry to make the island easier to live on, but the island\'s only freshwater well is getting saltier, fish catches are down, the dump is filling, and the power system struggles in July. '
    + 'In 15 days the council votes. '
    + 'You are the island resources officer, and you must use environmental science to answer one question: can Vellan add the ferry without using up the water, food, land and energy that let people live here?',
  ],

  // How it ends. The last thing anybody reads, and the counterpart of `opening`:
  // what came of the campaign, what it cost and what is unfinished, and then —
  // this is the paragraph that is easy to leave out — what the *player* did.
  // `checkStory` fails a campaign whose closing paragraph is not addressed to
  // them, because a fortnight of work should not finish on a report.
  ending: [
    'The council approves a one-year trial of the second daily summer ferry by five votes to four — but not under the old rules. '
    + 'Before the first extra sailing, the leaking water main must be repaired. First-year pumping is capped near 281,000 cubic metres, the ferry takes water through its own meter, and water level and July chloride are checked every month. '
    + 'If either warning worsens, the pumping limit comes down.',
    'The same motion keeps west-ground landings from rising above last season\'s 168 tonnes while buyer receipts are cross-checked and the next stock assessment can lower the limit, puts an inspection table at the berth for soil, plants and pallets, orders the turbine gearbox, and diverts compostables from the tip only while the salt trigger is met. '
    + 'The extra ferry is therefore not a blank cheque for growth. It is a trial with limits attached to the systems that can actually fail.',
    'Several things remain uncertain. The 294,000-cubic-metre recharge figure is still an estimate, the reef record shows a decline without proving one cause, and one year of population loss cannot forecast the next decade. '
    + 'Two pupils leave for mainland secondary school in August, so the school starts the next term with seventeen. The ferry may make Vellan easier for families to stay on, but the vote does not pretend transport alone can reverse the age structure.',
    'You did not choose between saving the island\'s community and saving its environment. You found that the new ferry would use less than one thousand cubic metres of water a year while an old leak was wasting about fifty-one thousand, and you found which other limits were real, which were estimates, and which rules needed enforcement. '
    + 'Vellan gets a chance to stay connected without pretending its limits disappeared. That was your recommendation.',
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
