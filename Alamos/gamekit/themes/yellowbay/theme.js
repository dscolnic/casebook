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
  subtitle: 'Process Integration Lead · Ardley Fab 7',

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
  opening: [
    'Ardley Fab 7 prints silicon chips, layer by layer, on wafers the size of a dinner plate. '
    + 'Since March four wafers in ten have come out unsellable. In fifteen days the plant runs '
    + 'a proving batch. The customer that buys sixty per cent of everything Ardley makes '
    + 'accepts or refuses a whole contract on it. You are the process integration lead, so the '
    + 'signature on that batch is yours. Hana Ferreira, who runs surface analysis, says the '
    + 'silicon arriving at the door is not what its certificate claims. Ruben Ostrowski, who '
    + 'runs the machines that lay each layer down, says the material is fine and a recipe has '
    + 'drifted. One customer is large enough to close the plant.',
  ],

  ending: [
    'The qualification lot went in at ten on the Friday and came out at ninety-one per cent, which '
    + 'is two points above the number the customer had written into the contract and four above what '
    + 'Fab 7 was managing before March. Two substrate lots went back to the supplier, who added a '
    + 'type field to the certificate the following quarter for every customer they have. The furnace '
    + 'controller was replaced again, and a second thermocouple now reports beside it on a separate '
    + 'logger.',
    'What it cost: eleven weeks of wafers written off before anybody measured the right thing, a '
    + 'supplier relationship that will be cooler for a year, and four days of spectrometer time that '
    + 'went on wafers already scrapped. What is unfinished: the carbon layer under the nitride has a '
    + 'source nobody has found, the queue-time rule is a piece of paper rather than an interlock, and '
    + 'the copper is still being bought against a specification that has been met at a tenth of its '
    + 'stated value twice.',
    'And the reason there was a lot to run at all is that you would not let one explanation stand for '
    + 'two faults. You opened the four measurements that agreed and found what they had all been '
    + 'compared against; you took the furnace seriously after the substrate had already been proved '
    + 'wrong; and you predicted what the corrected recipe would produce before you ran it, which is '
    + 'the only reason anybody can say it worked. Nine hundred people came back on the Monday. That '
    + 'was your fortnight.',
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
