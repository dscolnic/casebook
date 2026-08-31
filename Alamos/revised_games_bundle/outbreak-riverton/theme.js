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
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // Fifteen sessions across five months of a response: a fortnight of ward
  // isolation, a variant rising over four weeks, a trial that reports. Not
  // days.
  dayNoun: 'Stage',

  // The plan card's opening blurb is a date stamp and two sentences: the one
  // thing that is true this morning, and the one thing the player does about
  // it. The long form — a name, a job title, an argument between two leads,
  // and what it costs — was read fifteen times over a campaign and buried the
  // one line that changes every stage under a paragraph that did not. The
  // cast, the argument and the stakes did not go away; they moved to the
  // calls' own `reason:` lines, to the people themselves, and to the day
  // debrief. `engine/dev/checkStory.mjs` reads this and swaps the 90-word
  // floor for a 30–70 word ceiling-only band. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  id: 'outbreak_riverton',
  title: 'Outbreak: Riverton',
  subtitle: 'Scientific Response Director · Riverton',

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
    // than eight and the player cannot get down the passage. This one needs
    // many — an outbreak response is crowded, and eighteen people spread over a
    // campus this size read as a quiet afternoon. They stand where `site.js`
    // `crowdSpots` says: triage queues, the swab line, the decon tunnel, the
    // gate. Extras are the cheap merged rig, four meshes each.
    extras: 48,
  },

  // What is inside each room the player walks into, from book.yml, plus City
  // Health Command — the one facade promoted past the two-stop bar. See
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
  // One established fact a stage, in the order the outbreak gave them up. The
  // case definition is written first and is the thing the file is read back
  // against.
  delivery: {
    name: 'The Riverton Outbreak File',
    // The HUD meter's label, above the bar that replaced "Mission N of M". Two
    // or three words, and it names the goal rather than the progress — the bar
    // says how far along; the label says what is filling it.
    meter: 'Findings confirmed',
    what: 'The evidence file Riverton acts on: what is causing the outbreak, how it spreads, '
      + 'which patients are in danger, what can stop it, and which uncertainties still matter.',
    where: 'POP',
    pieces: [
      'The case definition',
      'The agent identification',
      'The route of entry',
      'The replication mechanism',
      'The validated test',
      'The severity explanation',
      'The immune response finding',
      'The transmission chain',
      'The reservoir and vector map',
      'The variant assessment',
      'The resistance finding',
      'The intervention design',
      'The trial read-out',
      'The containment scenarios',
      'The final briefing, signed',
    ],
  },
  opening: [
    'Three Riverton hospitals have admitted seven people with the same fast-moving illness in four days. '
    + 'Elias Webb is already on oxygen, and no one knows what is making him sick or how it is spreading. '
    + 'You are the scientific response director. Find what is causing this, how it moves, and what will '
    + 'stop it before the hospitals fill.',
  ],

  // How it ends. Shown when the campaign closes and printed as the book's last page.
  ending: [
    'At 4:07 p.m., the mayor reads the briefing you signed. Riverton acts on the transmission route the '
    + 'evidence supports, keeps the treatment under follow-up, leaves the river-animal reservoir marked '
    + 'unresolved, and protects the integrated surveillance system instead of declaring the science finished.',
    'Six weeks later, the city reaches forty-two days with no new case and ends the emergency. Elias Webb is '
    + 'home. Later field sampling settles the reservoir question using the comparison sites and repeat survey '
    + 'your briefing required.',
    'The outbreak did not end because every uncertainty disappeared. It ended because you kept separating '
    + 'measurement from inference, tested the explanations that would change a decision, and acted at the '
    + 'strength the evidence could support. Riverton could make the right calls because you made the science usable.',
  ],
  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere.
    far: 900,
    fog: { colour: 0xaebac0, near: 90, far: 300 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // A paved campus of pale tents under a bright sky blows out fast.
    exposure: 0.86,
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
