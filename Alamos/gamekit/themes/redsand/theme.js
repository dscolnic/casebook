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
import { MISSIONS } from './content/missions.js';
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

  id: 'redsand',
  title: 'Red Sand',
  subtitle: 'Propellant Lead · Arcadia Rise',

  // A mission is one Martian day. `dayNoun` reaches the plan card, the
  // continuity line, the turn-in button and the campaign log, and a sol is
  // thirty-nine minutes longer than a day — which is why the boil-off and the
  // electrolysis arithmetic in this game are all done over 88,800 seconds.
  dayNoun: 'Sol',
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

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY },

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
  interiorStyle: 'steel',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  opening: [
    'Everyone here goes home on a rocket, and the rocket can only leave when '
    + 'Mars and Earth line up. That happens once every twenty-six months. The '
    + 'next one is sixteen months off. The rocket is already standing on the pad, '
    + 'four hundred metres from your door. It has to lift off full, and nothing '
    + 'is being flown out from Earth to fill it. The 6.6 tonnes of methane and 23 '
    + 'of oxygen have to be made here, out of the Martian air and the ground '
    + 'under it. So far the plant has made 3.9. You are the propellant lead at '
    + 'Arcadia Rise, so every kilogram loaded into that rocket is signed for by '
    + 'you. The plant has run under its rated output every sol since spring. This '
    + 'morning Ingrid Sundqvist wants the reactor forty degrees hotter, and Tomás '
    + 'Herrera says a hotter reactor hands back less methane on every pass. Six '
    + 'people fly home on whatever those two can be got to agree to make.',
  ],

  // The last thing anybody reads. What happened, what it cost, what is left
  // over, and all three taken from the fifteen sols the player worked.
  ending: [
    'The fill finished on sol 475, eleven sols before the window opened, with six point six tonnes '
    + 'of methane and twenty-three of oxygen aboard and every batch signed against the assay it came '
    + 'with. What had been holding the plant down was never the set point both sides spent a '
    + 'fortnight arguing about: the polishing column filled around sol 261 and passed chloride to the '
    + 'reactor for thirty-eight sols, and the catalyst died from the inlet end while the temperature '
    + 'profiles were being read as heat damage. The last spare charge went in on sol 300 and held '
    + '71% conversion to the end.',
    'What it cost: eleven sols of production, one catalyst charge with no replacement on the planet, '
    + 'and about four hundred kilograms of oxygen out of the vent while a radiator stood under a '
    + 'fortnight of storm dust. What is unfinished: the lead-and-lag columns are plumbed and the '
    + 'interval between changes is a guess taken from one breakthrough; the conductivity alarm was '
    + 'wired to a panel four sols before the rotation ended and has never sounded; and nobody has '
    + 'measured what this ground does to a catalyst at the deeper cut, which is the ice the next crew '
    + 'will be working.',
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
