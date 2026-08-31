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

  id: 'seedbank',
  title: 'Wellmere',
  subtitle: 'Season Lead · Wellmere Seed Bank',

  // The plan card's stake is a date stamp and two sentences, not a briefing.
  // See gamekit/BRIEFING_PASS.md: the long form answered "what has been
  // happening" as well as "what do I do", and the first half is three weeks of
  // context read fifteen times. Setting this moves `checkStory`'s word band —
  // no floor, a ceiling of 70 — and takes the delivery line off the card, which
  // was the third block of prose standing between the player and the objectives.
  stakeStyle: 'brief',

  // Each mission is one working day of the three weeks before sowing starts. The plan card prints this in front of the mission number.
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
  // The generated rooms, plus the five hand-written ones for the places that are
  // not areas — the three glasshouses, the records office and the threshing
  // floor. `enter:` in site.js is what gives each of them a door.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // Where each question is asked inside its room, and the four that are asked in
  // a place that is not their own area. engine/world/interiorFixtures.js builds
  // them from the open call; catalogue in ./fixtures.js.
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
  // One commitment a day, in the order the season forced them. The crossing
  // block is chosen on the second-to-last day out of everything established
  // before it.
  delivery: {
    // THIS WAS "THE WELLMERE SEASON RECORD", and it was a document about the
    // stakes rather than the stakes. The tell was on the opening card, which had
    // to spend thirty words saying what a season record is — see the briefing
    // pass: *a delivery that has to be glossed on the opening card is usually the
    // wrong delivery*. Wellmere is about what is sown. The ending card had known
    // that for the life of the game: "What is in the ground this year is what you
    // put there." So the fortnight now builds the ground, the board moved to the
    // Crossing Hall at the centre of every isolation ring, and the fifteen pieces
    // are the reasons there is more in the ground than there would have been.
    name: 'The Season in the Ground',
    // The HUD meter's label, above the bar that replaced "Mission 4 of 15". Two
    // or three words naming the GOAL, not the progress: the bar says how far
    // along, the label says what is filling.
    meter: 'Season sown',
    what: 'Everything Wellmere commits to soil in three weeks: the trial drilled, the overdue '
      + 'accessions regrown, the screening nursery inoculated, and eight crosses bagged in the '
      + 'block at the centre. What is in the ground is what the next decade works from.',
    // The Crossing Hall, at radius zero, because that is where the season ends up
    // and it is the one place on the Point every isolation ring is measured from.
    // It was the vault, which is where a record would have been kept.
    where: 'CROSS',
    pieces: [
      'Sixty accessions pulled for grow-out',
      "The warm bay's four hundred, read",
      'A duplicate slot handed back',
      'The west ground allotted',
      'The short lines kept anyway',
      'Forty regrowing plots chosen',
      'The rust screen aimed',
      'Twenty plots carried into next year',
      'Thirty accessions off the screening list',
      "Fenn's four landraces drilled",
      "The quiet week's backlog cleared",
      'One clean source of the second gene',
      'The drill sent out in the right order',
      'Eight crosses bagged in the block',
      'Fifteen years of regrowing, scheduled',
    ],
  },
  opening: [
    'A wheat disease is two hundred kilometres east, and the wind that would carry it here '
    + 'comes in over the causeway. The breeding programme has one gene that stands up to it, '
    + 'and one is not enough. You are Season Lead at Wellmere, which means what goes into the '
    + 'ground in the next three weeks goes in because you said so. Three weeks is the whole of '
    + 'it. Anything not sown by then waits a year, and the forty-one thousand samples in the '
    + 'vault do not wait well. By the end of the third week the season is in the ground, and '
    + 'nothing else goes in until next March.',
  ],

  // How it ends. Shown when the campaign closes, and the last thing the player
  // reads: what came of the fortnight, what it cost, and what they did.
  ending: [
    'The crossing block went in on the Friday and the trial was sown inside the three weeks. '
    + 'WM-712 went to the merchant with its weakness written on the label, and the eight '
    + 'crosses in the block are the programme\'s work until 2033. The drifted accessions are on '
    + 'a list with 15 years of regrowing in it, and Fenn\'s marked plants are dry, bagged and '
    + 'back in the collection they came out of.',
    'What it cost: ground that three people wanted and one of them got, a season in which the '
    + 'oldest accessions were regrown at the rate the glasshouses allow rather than the rate '
    + 'they are dying at, and one resistance gene still carrying the whole programme. What is '
    + 'unfinished: the second source is one clean line and needs four more seasons, the '
    + 'passport records still disagree with the markers on 60 accessions, and the isolation '
    + 'rings are spaced on a pollen distance measured before the causeway hedge came out.',
    'And you settled all of it. You laid the trial out by how far pollen really travels, you '
    + 'grew out the accessions that were about to slip below the line, and you released a wheat '
    + 'with its weakness written on the label rather than hidden in a file. What is in the '
    + 'ground this year is what you put there. That is a season done properly.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.12,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    // The site runs 300 m north to south, so the far side of the sky dome
    // sits at scale + 250. At 900 it is clipped away from the trial ground and
    // the sky renders black above the shelterbelt in broad daylight.
    far: 1500,
    // Pushed well out. At near 220 the far rim was hazed to nothing from the
    // middle of the site, which on a headland loses the one thing the place is
    // — you could not see that the ground ended. Maritime haze belongs in the
    // last third of the view, not the middle of it.
    fog: { colour: 0x9fb0b6, near: 340, far: 1250 },
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
