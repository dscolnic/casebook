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
  id: 'quantum',
  title: 'Quantum',
  subtitle: 'Group Lead · Ridgeway Quantum Laboratory',

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
  interiorStyle: 'lab',

  // The title card. Two or three paragraphs: what the player is, what is at
  // stake, and how a day works. Nothing here is generated.
  opening: [
    'Ridgeway runs a quantum processor: twelve qubits, held a hundredth of a '
    + 'degree above absolute zero by a refrigerator the size of a wardrobe. '
    + 'Everyone calls it the fridge. You lead the group. A laboratory in Delft '
    + 'has published a result your funder has already asked about. Your own best '
    + 'number was measured on one machine, by one group, in one week. The review '
    + 'board sits in a fortnight. This morning the fridge came down to forty-two '
    + 'thousandths of a degree instead of eleven. It sounds like a small miss. It '
    + 'is the difference between a quantum processor and a warm chip. Priya '
    + 'Raghavan needs to know which you have, and she needs it before the board '
    + 'does.',
  ],

  ending: [
    'The correction went out at twenty past four, naming the mechanism as well as the number, and two '
    + 'other groups wrote within the month to say they had found the same thing in their own tune-up. '
    + 'Delft ran the circuit again on a held-out analysis and the two devices agree now, at a figure '
    + 'lower than the one Ridgeway first reported and higher than the one that frightened everybody in '
    + 'the middle of the fortnight.',
    'What it cost: a headline number reduced by a third, a review spent explaining a mistake, and four '
    + 'days of fridge time nobody got back. What is unfinished: the oxidation change is still '
    + 'uncontrolled, the defect map covers three chips out of fourteen, the gate error is above the '
    + 'threshold where error correction starts to help, and the habit that would have caught all of it '
    + '— evaluate every fitted analysis on data it has never seen — is a line in a report until the '
    + 'next person makes it a rule.',
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
