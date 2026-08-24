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
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One rule a day, in the order the reservoir forced them. The resurveyed
  // storage curve comes last and moves every number written before it, which
  // is why the rules carry the survey they were written against.
  delivery: {
    name: 'The Ashfell Release Rules',
    what: 'What the next duty engineer opens the gates by: one rule or figure a day, and the '
      + 'storage curve every one of them is measured against.',
    where: 'STORE',
    pieces: [
      'The rate-limit rule',
      'The rising-fast rule',
      'The inflow accumulation',
      'The two-day cost note',
      'The last-half-metre relation',
      'The peak test',
      'The wall\'s carrying limit',
      'The just-clears release',
      'The seepage ledger rule',
      'The error carried into volume',
      'The quiet-day check',
      'The decay constant, scored',
      'The three-before-nine order',
      'The lead-time rule',
      'The resurveyed storage curve',
    ],
  },
  opening: [
    'This morning Ashfell reservoir stands at 88%. It has been the driest summer in nine years. Now '
    + 'nine days of rain are forecast from Thursday. Four villages live along the river below the dam. '
    + 'You are the duty engineer. Each morning you order how much water goes out. You order it from '
    + 'gauge readings taken hours ago. You order it from a survey of the reservoir made in 2003. In '
    + 'fifteen days you hand over the Ashfell release rules. That is what the next duty engineer opens '
    + 'the gates by. It says how much water the reservoir really holds. It says how much the wall can '
    + 'take. It says how fast the river below can be fed. One rule gets written each day, and the old '
    + 'survey has to be fixed before any of them mean a thing.',
  ],

  // How it ends. Shown when the campaign closes, and the last thing the player
  // reads: what came of the fortnight, what it cost, and what they did.
  ending: [
    'The rain stopped on the ninth day with the reservoir at 91%, and the reach below the dam '
    + 'was warned twice and flooded neither time. The resurvey moved every volume on the site '
    + 'by 11%, so the storage curve the night orders are written against is the real one now. '
    + 'Ashfell keeps its gates, its gauges and one more season of margin than it had a '
    + 'fortnight ago.',
    'What it cost: two villages packed and unpacked for a warning that turned out to be right '
    + 'to give, nine days of a crew on twelve-hour watches, and a spillway relation still '
    + 'fitted to data taken below half gate. What is unfinished: the uplift fits disagree above '
    + '90%, the 2003 survey is still what every drawing in the building shows, and the rule '
    + 'that would have caught all of it — order against the rate, not the level — is a line in '
    + 'a handover book until the next duty engineer makes it a habit.',
    'And it held because of you. You worked the rate rather than the level, you fixed the '
    + 'volumes on a survey rather than on a drawing from 2003, and you ordered gates six hours '
    + 'ahead of a river that rises in two. Four villages went to bed dry through nine days of '
    + 'rain. That was you, every morning of it.',
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
