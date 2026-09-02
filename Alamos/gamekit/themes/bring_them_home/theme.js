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
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // Mission Control runs eight-hour shifts with a different flight director on
  // each. Fifteen of them is five days, which is what a lunar return takes —
  // and what this game's own copy already assumed.
  dayNoun: 'Shift',

  // The plan card's opening blurb is a date stamp and two sentences: the one
  // thing that is true this shift, and the one thing the player does about it.
  // This campaign's fifteen stakes are already written that way — 36 to 48 words
  // apiece — and the manifest line was the half nobody added, so `checkStory`
  // measured them against the 90-word floor written for a card that has to carry
  // a fortnight of context. The long form is not merely unnecessary here, it is
  // unreachable: the floor needs ~90 words, the blurb cap allows four sentences,
  // and 22 words a sentence puts the card a full grade over `plainCards`' 6.5
  // whatever its vocabulary. The cast, the argument and the consequences live on
  // the calls' own `reason` lines, on the people and in the debrief. See
  // gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  id: 'bring_them_home',
  title: 'Bring Them Home',
  subtitle: 'Flight Director · Lunar Return Mission',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  site,

  // There are no rooms to walk into here and no doors to find: the whole game
  // is one floor, and a call is a console on it. The plan card asks the theme
  // what to call a non-person stop.
  // Two of the six areas work at a console on the floor; the other four have a
  // room in the wings. "A console" was right when every call was in this room and
  // is wrong now, and "a room" was wrong then and is right for four of the six —
  // so: a place.
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
    // Background people, and indoors this number is half what it was. A control
    // room with eighteen unnamed extras in it reads as a crowd to push through
    // rather than as a room with people working in it — and every one of them
    // is somebody the player has to check is not the person they are looking
    // for. Outdoors the same number disperses across a town; here it does not.
    extras: 9,
  },

  // No `interiors`. That block builds a room to walk *into*, in a district four
  // kilometres away, which is what an outdoor game needs when a door opens. The
  // whole of this game happens on one floor: the consoles are the workplace and
  // the player is already standing in it. What the book wrote under `interiors`
  // now reads out on the console screens instead — see world.js.
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  // Painted steel, grey consoles and deck matting, not laboratory vinyl.
  interiorStyle: 'steel',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  // ---------------------------------------------------------- the delivery
  //
  // What the five-day return produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One procedure a shift, in the order the failure happened to force them.
  // Nobody writes a return checklist in the order it is read.
  delivery: {
    name: 'The Return Checklist',
    what: 'The pages read up to the spacecraft a line at a time: one procedure a shift, every '
      + 'one of them checked on the ground before three people bet their lives on it.',
    // The Guidance Computer Room, which is one of the four WING ROOMS. It has to be
    // one of those: the consoles on the control-room floor are not rooms and this
    // world module hangs the board on a wing room's end wall. INTEG was the first
    // choice and built nothing anywhere — the area is a console, and `delivery.mjs`
    // could not see that, because the site's plan lists it as a room.
    where: 'NAV',
    pieces: [
      'The failure timeline',
      'The tracking solution',
      'The trajectory correction plan',
      'The attitude control procedure',
      'The power budget',
      'The battery isolation procedure',
      'The thermal survival plan',
      'The scrubber adapter procedure',
      'The communications link plan',
      'The manual alignment procedure',
      'The entry corridor numbers',
      'The vibration limit',
      'The chosen return path',
      'The last correction, weighted',
      'The entry checklist, signed',
    ],
  },
  // The closing line is where the cost goes. It used to read "make each call
  // before air, power, or fuel runs out" — true, and a specification: no number,
  // no clock and nobody in it, so the reader is left to supply the consequence.
  opening: [
    'An explosion has crippled a ship coming home from the Moon. Three people are five days from '
    + 'Earth. Power is low, the cabin is cold, and the ship is drifting off its safe path. You are '
    + 'the flight director, which means every call the room makes is signed by you. Build the Return '
    + 'Checklist: one procedure a shift, and three people get home only if each one holds.'
  ],

  // How it ends. Shown when the campaign closes and printed as the book's last page.
  ending: [
    'The capsule vanishes into the radio blackout. Four minutes pass. Then the speaker cracks, and '
    + 'Hale reads the altitude. Small chutes open. Three main chutes fill above the Pacific. At 12:07, '
    + 'the capsule hits the water upright. All three crew members reach the recovery deck.',
    'The return worked because you kept asking what had changed: the ship or the reading. A shared '
    + 'power source did not become a false cabin leak. A shared clock did not become a needless burn. '
    + 'You turned each risk into a margin the next call could use.',
    'The last line under your name reads: GO for entry. Some doubt remained, but each known risk fit '
    + 'inside a checked limit. Three people are home tonight because you made the hard calls before '
    + 'the last safe choice closed.',
  ],
  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    far: 220,
    // A dim room. The fog is the room's own darkness at the far wall.
    fog: { colour: 0x0d1116, near: 26, far: 88 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    // Three real lights, and every bright surface in the room is emissive.
    lighting: { ambient: 0.42, hemi: 0.5, key: 0.85 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
