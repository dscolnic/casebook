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
  id: 'headwater',
  title: 'Headwater',
  subtitle: 'Duty Engineer · Ashfell Dam',

  // AP Calculus AB and the first term of a university sequence. Grade 12: the
  // type scales from this, and validateContent fails a passage two grades over.
  audience: { grade: 12 },

  // Nine days of rain forecast, and one release decision every morning.
  dayNoun: 'Day',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside plan.js. Deep Watch does.
  // A five-floor tower on the east abutment, glazed down one side, with the
  // spillway coming over forty metres away. See plan.js for why the levels are
  // offset along the spine as well as stacked.
  site: { kind: 'interior', name: 'Ashfell Dam', plan },

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  // On the operations floor, in the middle of the tower, with the glass — and
  // the fall — on the right.
  start: { x: 0, z: 52, yaw: 0 },

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
  interiorStyle: 'steel',
  // Wet rock and a lot of sky: an outdoor albedo has to be written darker than
  // it looks, and the exposure kept under 1.
  exposure: 0.94,

  // The title card. One paragraph of situation — no mechanics, no scope note.
  // Nothing here is generated.
  opening: [
    'Ashfell Dam holds ninety-two million cubic metres of water in a gorge, '
    + 'with four villages along the river below it. This morning the reservoir is '
    + 'at 88% after the driest summer in nine years. The forecast is nine '
    + 'days of rain starting Thursday, over every hillside that drains into it. '
    + 'You are the duty engineer, so the amount of water let out each morning is '
    + 'ordered by you. You order it out of gauge readings taken hours ago and a '
    + 'survey of the reservoir\'s shape made in 2003. The gates take six hours to '
    + 'make any difference downstream. The river can rise in two.',
  ],

  look: {
    fov: 66,            // a 72° field distorts badly in a corridor
    near: 0.08,
    // The gallery stack is 128 m end to end and the fog has to sit beyond it.
    // Has to clear the sky dome and the farthest horizon rank, or the sky is
    // clipped away and renders black in daylight.
    // Has to reach the far wall of the gorge and the backdrop behind it.
    far: 900,
    // Damp concrete, not daylight: the haze in here is cold and grey.
    // Spray hangs in a gorge. The fog is what makes the far wall recede.
    // Spray hangs in a gorge, and at night it is not white. Anything with
    // `fog: false` — the sky dome and the stars — is exempt.
    fog: { colour: 0x2b343c, near: 50, far: 420 },
    exposure: 1.0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.38,
    // Six real lights is the ceiling. A light per ceiling fixture took one
    // build from 118 fps to 20; ambient plus emissive panels looks the same.
    // The corridor has no fittings in it any more — see plan.js `ceiling` —
    // so the ambient rig is doing work the strip lights used to do.
    // Open to the night. The rooms carry their own emissive fittings; the
    // galleries are lit by what comes off the fall and by the sky, so the
    // ambient rig is deliberately low — at 0.72 the stars washed out.
    lighting: { ambient: 0.34, hemi: 0.30, key: 0.35 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
