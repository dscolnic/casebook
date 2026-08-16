// theme.js — Hospital Heroes as a gamekit theme.
//
// The game's content files are unchanged; this is the adapter that presents
// them in the shape gamekit's engine reads, so the engine's copies of
// gameState, simulation, questionUI, dashboard and the rest can be shared
// rather than forked. See ../../gamekit/THEME_CONTRACT.md.
//
// The world is `engine/world/interiorFloor.js` now. It was this game's own
// src/world.js — 1,070 lines — until the interior builder it needed existed;
// `interiorSite.js` was generalised out of exactly this floor, so the flip was
// a rename of the plan's keys rather than a rebuild.
// The content is one book — gamekit/books/hospital.yml — imported to
// ./content/ by tools/import-book.mjs, and engine/dev/bookParity.mjs fails if
// these files stop matching it. src/*.js are one-line doors onto the same data,
// kept because this game's own modules import them.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { BALLPARK_BY_TITLE } from './content/shared.js';
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { fitOutRoom, fitOutSpine } from './props.js';
import { MISSIONS as MISSION_DEFS } from './content/missions.js';
import { GROUPS as GROUP_DEFS } from './content/groups.js';
import { ROSTER as HISTORIC_CHARACTERS, LEADERS } from './content/roster.js';


export default {
  // Who this edition is for. `engine/core/typography.js` scales the root font
  // size from it, so the whole interface comes up larger for a nine-year-old
  // than for an undergraduate reading the same layout. It is a property of the
  // edition, not a setting the player should have to find.
  // The game already calls these shifts in its own copy; the plan card was
  // the one place still saying Day.
  dayNoun: 'Shift',
  audience: { grade: 2 },

  id: 'hospital',
  title: 'Hospital Heroes',
  subtitle: 'Junior Doctor · Children’s Hospital',

  // The floor, as data, and now built from it by the shared interior world.
  site: { kind: 'interior', name: 'Riverton Children’s Hospital', plan },
  start: { x: 0, z: 14, yaw: 0 },
  // How it ends. Shown when the campaign closes and printed as the book's last page.
  // Fifteen shifts used to finish with the words "Campaign complete" in the corner of
  // the screen, which is no ending for a nine-year-old.
  ending: [
    'All six children were seen, and every one of them went home. Ava is breathing easily. Ben is '
    + 'walking on his ankle. The boy with the fever is asleep, with his mum in the chair next to him.',
    'Nurse Alex Lee says you can read the clues now, and the team wants you back tomorrow.',
  ],

  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    // Applied across each lesson and its reviews by engine/content/normalize.js.
    BALLPARK_BY_TITLE,
    MISSIONS: MISSION_DEFS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS,
    AVATARS: {},
    COPY: {},
    // This game has no between-mission funding vignettes.
    SPECIAL_REQUESTS: {},
  },

  people: { OUTFITS, roleToOutfit, spawn: HISTORIC_CHARACTERS.length, extras: 22 },

  // Board walls and a suspended ceiling: a modern ward, brightly lit.
  interiorStyle: 'lab',
  fitOutRoom,
  fitOutSpine,

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the corridor is 54 m: the fog has to sit past the far end or
    // the north wall is a wall of colour rather than a long view.
    far: 220,
    fog: { colour: 0xeceade, near: 30, far: 130 },
    exposure: 1.0,
    // A nine-year-old's game: the doorways are 1.25 m and getting stuck in one
    // is the fastest way to lose a player who is eight.
    playerRadius: 0.34,
    lighting: { ambient: 0.62, hemi: 0.66 },
  },
};
