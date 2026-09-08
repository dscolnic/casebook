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
  audience: { grade: 12 },

  id: 'redsand_oneshot',
  title: 'Red Sand: Full Tank',
  subtitle: 'Propellant Lead · Arcadia Rise',

  // A mission is one selected Martian day. The first ten are consecutive while
  // the plant failure is diagnosed; the last five are later critical checkpoints
  // through sol 475. `dayNoun` reaches the plan card, continuity line, turn-in
  // button and campaign log. A sol is thirty-nine minutes longer than an Earth
  // day, so sol-scale arithmetic uses about 88,800 seconds.
  dayNoun: 'Sol',
  // The plan card's opening blurb is two sentences: the one thing that is true
  // this morning, and the one thing the player does about it. The long form —
  // ninety to a hundred and fifty words of who is arguing with whom and what it
  // costs — was read fifteen times over a campaign and is where the player
  // stopped reading. The cast, the argument and the consequences did not go
  // away; they moved to the calls' own reasons, to the people, and to the day
  // debrief. `engine/dev/checkStory.mjs` reads this and swaps the 90-word floor
  // for a 30–70 word band. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',
  // What a non-person stop is called here. Nothing on this station is a room:
  // they are modules, buried to the eaves, and a player told to go to a room
  // looks for a building with windows.
  stopNoun: 'module',

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
  // The six areas' rooms, generated from the book, plus seven places that are not
  // areas: five that stood closed until the placement pass, the pad office, and
  // the ice cut. A minor room has no case and no board — see ./minors.js.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // The objects the questions are asked at, built on entry from the open call.
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
  // THE DELIVERY IS THE FUEL, NOT A DOCUMENT ABOUT IT. This was `The Propellant
  // Handover` for most of the game's life — fifteen findings, written up, handed
  // to the next crew — and it was the wrong thing to be building. Nothing in a
  // campaign about filling a rocket should make a stack of paperwork the object
  // of the fortnight, and the ending card had already worked that out for itself:
  // it closes on "The rocket lifts full. You are the one who filled it." The
  // delivery was the only surface still counting pages.
  //
  // Two things fall out of the change and both are gains. The opening card no
  // longer has to explain what a propellant handover is, because a full tank
  // explains itself. And the board moves out of Plant Control and into the Cold
  // End, where the liquid actually goes into the tanks — the piece a sol earns is
  // now read standing next to the thing it went into.
  //
  // One entry on each critical sol, in the order the plant forced them, and each
  // one is a reason there is more in the tank than there would otherwise have been.
  delivery: {
    name: 'A Full Tank',
    meter: 'Fuel needed',
    what: 'Methane and oxygen in the ascent vehicle tanks, at the flight specification, '
      + 'in time for the window — enough for six people to leave Mars and reach Earth.',
    where: 'PAD',
    pieces: [
      'The carbon ledger closed and counted',
      'The feed cleared and the real limit named',
      'The wrong gas found behind a normal gauge',
      'A false clue taken off the board',
      'Three agreeing meters unmasked',
      'The leak hunt stopped and the plant re-aimed',
      'The heat traced before anybody was blamed',
      'The override proved instead of assumed',
      'The poisoned inlet found inside the bed',
      'The safe set point kept instead of restored',
      'One plan that is both quick and full',
      'The water loop closed across the whole plant',
      'The power spent where it protects the fill',
      'A full tank stopped and measured',
      'The batch reprocessed and the launch signed',
    ],
  },
  // Four beats and nothing else: the situation, the job as authority, what the
  // fortnight has to end with, and what it costs in people. The first version ran
  // to 126 words and spent six sentences specifying the handover — the tonnage of
  // methane and oxygen, what the plant has made so far, four clauses on what the
  // document says and one on how often an entry goes in it. Every fact true, and
  // all of it arriving before the reader has any reason to want it. The numbers
  // the player needs are on the sol they matter.
  //
  // A draft in between spent a sentence glossing the delivery — "You also leave a
  // propellant handover: what this plant can really do, and what it cannot" —
  // because a proper noun with no explanation is not information, and the first
  // reader's question was what a propellant handover is. That sentence is gone
  // along with the document it explained. **A delivery that needs a gloss on the
  // opening card is usually the wrong delivery**: a full tank needs none, and the
  // card is 68 words instead of 126 because of it.
  opening: [
    'Mars is already making your ride home. At Arcadia Rise, thin air and buried ice become methane fuel '
    + 'and oxygen. You are the new Propellant Lead, and over fifteen key sols you fill A Full Tank: enough '
    + 'methane and oxygen for six people to fly home. Right now the tanks are 18 percent behind. If they '
    + 'stay short, the rocket stays on Mars and the crew waits twenty-six months.',
  ],

  // The last thing anybody reads. What happened, what it cost, what is left
  // over, and all three taken from the fifteen sols the player worked.
  ending: [
    'The vehicle lifted at dawn with methane at 98.1 percent, carbon dioxide at 1.8 and water at 0.08 — '
    + 'every limit written down before the samples arrived, and every one of them passed. There was never a '
    + 'big methane leak. Diluted hydrogen reached the reactor, so most of the missing methane was never made, '
    + 'and unreacted carbon dioxide and purge nitrogen held the tank pressure up while the fraction fell. '
    + 'The engineer everybody suspected had lowered the reactor temperature because the cooling loop was '
    + 'already failing and the bed inlet was running hot.',
    'What it cost: eleven sols of production, one catalyst charge with no replacement on the planet, a '
    + 'quarantined batch put back through the drier, and a shift with no spare power at all. What is '
    + 'unfinished: the plant standard that biased three displays has been swapped and never re-qualified '
    + 'against a second sealed standard; the drier interval is a guess taken from one breakthrough; and '
    + 'nobody has measured what the deeper cut does to a catalyst.',
    'Six people fly home because of you. You stopped a leak hunt that had no leak in it, you cleared an '
    + 'engineer whose worst-looking act was the safest thing anybody did that fortnight, and you stopped a '
    + 'countdown on a tank that was full and not ready. You did not fill a tank. You taught this station '
    + 'what full means.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly down a straight street
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away entirely and the sky renders
    // black, in broad daylight, with no error anywhere. The dome here is 900.
    far: 1000,
    // Dust, at every distance. The colour is overridden every frame from
    // `atmosphere.haze`, so it matches the sky rather than sitting in front of
    // it; what this sets is how far the plain is legible for.
    fog: { colour: 0xc08154, near: 170, far: 700 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // Lower than the Earth games: this ground is bright and the sky tint puts
    // warmth into every surface under it.
    exposure: 0.82,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // Mars gets 43% of Earth's sunlight, and the dust scatters a great
    // deal of what arrives — so a weaker sun and a stronger hemisphere fill
    // than anywhere else in the set, which is also what fills the shadows the
    // way a dusty sky really does.
    lighting: { ambient: 0.10, sun: 2.4, hemi: 0.34, shadowExtent: 130 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
