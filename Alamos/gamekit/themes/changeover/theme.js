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
  // AP Macroeconomics is usually grade 11-12.
  audience: { grade: 12 },

  id: 'changeover',
  title: 'Changeover',
  subtitle: 'Chief Economist · Halvern Currency Board',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  site: { kind: 'interior', name: 'Replace with the name of this place', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: { x: 0, z: 12, yaw: 0 },

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
  interiorStyle: 'timber',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  opening: [
    'Halvern is a country of nine hundred thousand people, and in fourteen days its shops and '
    + 'banks stop taking the mark, the money it has always used. Nobody has agreed what the new '
    + 'one is worth. You are the chief economist to the currency board, so the rate and its '
    + 'published figures are yours to sign. The board sits on the top four floors of Kesteven '
    + 'House, and the queue for the counter is on the plaza a hundred and eighty metres below. '
    + 'Ada Verhoeven, the board chair, wants the rate fixed on Friday so contracts can be '
    + 'written. Emil Radic, the board\'s statistician, has three weeks of price data and says '
    + 'that cannot tell anybody what prices are doing.',
  ],

  // How it ends: what came of the fortnight, what it cost, what is unfinished —
  // and then the paragraph that is easy to leave out, which is the player's own.
  ending: [
    'The new mark went out on the fifteenth at 4.15 to the old, which is not the rate the board '
    + 'wanted and is the rate the reserves could hold. Prices rose eleven per cent in the first '
    + 'month and then stopped, which is what a changeover does when the money supply is capped '
    + 'and does not when it is not. The index Radic certified is published monthly with its '
    + 'basket printed beside it, so the next argument about inflation starts from a number '
    + 'somebody can check.',
    'What is unfinished is the banks. Reserve requirements went from two per cent to eight in a '
    + 'fortnight, and three of the eleven regional banks cannot meet them without selling assets '
    + 'nobody wants to buy. That is next quarter, and it is somebody\u2019s problem.',
    'You put a defensible index in front of the board before the rate was argued, so the rate was '
    + 'set against measured prices rather than against the fear in the room. You found the money '
    + 'the multiplier would have created and said so while there was time to cap it. Nine hundred '
    + 'thousand people were paid in a currency that held its value through the changeover because '
    + 'the arithmetic was done first.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    far: 160,
    fog: { colour: 0xdfe4e6, near: 26, far: 96 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    lighting: { ambient: 0.55, hemi: 0.6 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
