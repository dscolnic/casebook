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

  // Each mission is one working day of the fortnight before the mark stops being money. The plan card prints this in front of the mission number.
  dayNoun: 'Day',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  // The place. `site.kind` is still 'interior' — but `plan.js` declares a world
  // of its own, and `vite.config.js` prefers that: the four floors are stacked on
  // one footprint, which is `engine/world/interiorTower.js` and not something
  // `interiorFloor` or `interiorLevels` can build. The reason why is written at
  // the top of both of those files.
  site: { kind: 'interior', name: 'Kesteven House', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  // The lift lobby on floor 45, facing down the corridor. Every day starts and is
  // budgeted from here, and it is where the car puts the player down.
  start: { x: 0, z: 6.0, yaw: 0 },

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // Background people. A narrow place needs far fewer: on the submarine more
    // than eight and the player cannot get down the passage.
    // Four floors to populate rather than one corridor: `getExtraSpots` returns
    // seven or so places per floor and the extras are dealt round them in order,
    // so eighteen left the top two floors empty.
    extras: 30,
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
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One figure a day, in the order the fortnight forced them. The rate itself
  // is set last, out of everything gathered before it, and is the one page
  // nobody can revise afterwards.
  delivery: {
    name: 'The Halvern Rate Book',
    what: 'What the board publishes on the fifteenth: the rate the reserves can actually hold, '
      + 'and every figure behind it with the period it counts printed beside it.',
    where: 'RATE',
    pieces: [
      'The counted statistics, dated',
      'The output aggregate',
      'The index and its rate',
      'The basket, fixed and revised',
      'The reserve multiplier',
      'The spending rounds',
      'The reserve clock',
      'The real rate\'s owner',
      'The money supply count',
      'The output gap',
      'The policy lag',
      'The defensible rate',
      'The exporters\' side',
      'The first week\'s cover',
      'The rate, with conditions',
    ],
  },
  opening: [
    'In fourteen days the shops and banks of Halvern stop taking the mark. The mark is the money the '
    + 'country has always used. Nobody has agreed what the new money is worth. Nine hundred thousand '
    + 'people are paid in marks. You are the chief economist to the currency board. The rate is signed '
    + 'by you, and so is every figure published beside it. In fifteen days you hand over the Halvern '
    + 'rate book. It gives the rate the reserves can really hold. It says what prices have truly been '
    + 'doing. It says how much of the old money is still out there. One figure goes in each day, with '
    + 'the period it counts printed beside it. A rate nobody can hold is worse than a rate nobody '
    + 'likes.',
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
    // Not 0.08. The near plane is the dominant term in depth precision and this
    // game's far plane is a city away; 0.15 is still far closer than the 0.38 m
    // the player's own radius keeps them from any wall.
    near: 0.15,
    // Far enough to clear the sky dome from the far end of the plate — rule 18.
    // The dome is 1,200 m and the city inside it reaches 1,600, so a 160 m camera
    // (which is what a corridor needs) clips the sky away and renders black above
    // the horizon in broad daylight, with no error anywhere. It is no larger than
    // that, because the near/far ratio is what the depth buffer has to resolve a
    // sign against its own backing board with — see the renderer in
    // engine/world/interiorTower.js.
    far: 1800,
    // And the fog starts past the far end of the corridor, because it is here
    // for the twelve kilometres of city and not for the twenty-six metres of
    // building. The colour is the sky's own horizon band: a mismatch puts a seam
    // along the skyline, which is rule 20b through a different door.
    fog: { colour: 0xc2c8c6, near: 320, far: 3200 },
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
