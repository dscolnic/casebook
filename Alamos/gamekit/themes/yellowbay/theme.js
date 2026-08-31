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
import { plan } from './plan.js';
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
  id: 'yellowbay',
  title: 'Yellow Bay',
  subtitle: 'Semiconductor Process Engineer · Ardley Fab 7 · fifteen days to the proving batch',

  // Each mission is one working day before the proving batch runs. The plan card prints this in front of the mission number.
  dayNoun: 'Day',

  // The plan card's opening blurb is two sentences: the one thing that is true
  // this morning, and the one thing the player does about it. The cast, the
  // argument and the consequences move to the calls' own reasons, to the
  // people, and to the day debrief instead of living on the plan card.
  // `engine/dev/checkStory.mjs` reads this and drops the word ceiling to 70
  // with no floor. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  audience: { grade: 12 },

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  // Two wings and a glazed link, which the shared interior builder cannot
  // describe — plan.js declares `world: 'themes/yellowbay/world.js'` and
  // vite.config.js points `@world` there instead of at interiorFloor.js.
  site: { kind: 'interior', name: 'Ardley Fab 7', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  // The gown room end of the process wing, facing down it. Both wings run
  // +z; the link crosses at z 16 to 23.
  start: { x: -14, z: -1, yaw: 0 },

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

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One claim a day, in the order the plant gave them up. The substrate
  // certificate is questioned early and the recipe late, and which of the two
  // was wrong is the whole fortnight.
  delivery: {
    name: 'The Qualification Case',
    what: 'The evidence the customer will judge beside Friday\'s test batch: what caused the failures, '
      + 'what was changed, and why the corrected process should now work.',
    where: 'ATOM',
    pieces: [
      'What the silicon certificate proves',
      'Why Yellow Bay is safe under amber light',
      'Which measurements can see the failing surface',
      'What the chamber readings identify',
      'The first failed-wafer spectrum',
      'The hidden substrate-type error',
      'The bonding clue on verified wafers',
      'The recipe turned into predictions',
      'The cold-furnace fault',
      'The rest of the material stack cleared',
      'The surface queue-time limit',
      'The implant distribution brought under control',
      'The rate-limiting step and final process rules',
      'The corrected recipe predicted and verified',
      'The qualification release',
    ],
  },
  // Five sentences: what this factory makes, what has gone wrong, what happens if the
  // proving batch fails, the two competing explanations, and the player's chemistry mission.
  // Jargon such as qualification lot, process integration and wafer type comes after the
  // reader has a concrete picture of chips, silicon discs and a factory at risk.
  opening: [
    'Ardley Fab 7 is a factory that builds computer chips on thin, round silicon wafers. '
    + 'Since March, four wafers in ten have come off the line with too many bad chips to sell. '
    + 'In fifteen days the plant must run a test batch for the customer that buys most of its output; if the batch fails, the customer can move the work and the nine-hundred-person plant may close. '
    + 'Two senior engineers disagree about the cause. Ferreira, the surface analysis lead, says the silicon arriving at the factory is wrong. '
    + 'Ostrowski, the deposition engineering lead, says the chemistry inside the production line has drifted. '
    + 'You are the process integration lead, and you must use chemistry — atoms, electrons, bonds, gases and surfaces — to find what is failing, prove the fix, and decide whether the batch is ready to run. '
    + 'Fifteen days of evidence go into one document, the Qualification Case, and nine hundred people wait on it.',
  ],

  ending: [
    'The qualification batch comes out at ninety-one per cent good chips, two points above the customer\'s requirement and far above the sixty per cent yield that put Ardley in danger. '
    + 'The customer keeps the contract. The plant stays open.',
    'There was never one culprit. Some incoming wafers were the opposite electrical type from what the process assumed, and four apparently independent checks all inherited that mistake from the same reference wafer. '
    + 'The furnace controller had also been running the deposition step too cold, so the film contained the right elements in the wrong proportion. '
    + 'The long wait between cleaning and coating was a third risk: a bare silicon surface was quietly growing oxide again while it sat in air.',
    'The new process does not rely on those assumptions. Incoming lots get a direct polarity check, the furnace has an independent temperature reading, and the clean-to-coat wait has a hard limit. '
    + 'The unresolved carbon feature and the copper specification remain in the handover because a successful batch does not turn an unanswered question into an answer.',
    'You did not save the line by choosing Ferreira or Ostrowski. You used the chemistry to show where each explanation worked, where it failed, and what measurement could separate them. '
    + 'Then you predicted what the corrected recipe would produce before the test wafer ran, and it did. '
    + 'When you signed Friday\'s release, the customer was not being asked to trust a story. They were being shown a process that had made and passed its own predictions. That was your call.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    far: 160,
    fog: { colour: 0xe4d6ac, near: 30, far: 110 },   // the bay is lit amber; the fog has to agree
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    lighting: { ambient: 0.6, hemi: 0.55 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
