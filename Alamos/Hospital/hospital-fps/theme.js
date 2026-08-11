// theme.js — Hospital Heroes as a gamekit theme.
//
// The game's content files are unchanged; this is the adapter that presents
// them in the shape gamekit's engine reads, so the engine's copies of
// gameState, simulation, questionUI, dashboard and the rest can be shared
// rather than forked. See ../../gamekit/THEME_CONTRACT.md.
//
// The *world* is still this game's own src/world.js, reached through the
// `@world` alias. Moving the place onto engine/world needs an interior builder
// that satisfies the world contract, and that does not exist yet — so this
// migration is logic first, world later.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './src/curriculum.js';
import { BALLPARK_BY_TITLE } from './src/ballpark-specs.js';
import { ROOMS, CORRIDOR } from './src/plan.js';
import { MISSION_DEFS } from './src/missions.js';
import { GROUP_DEFS } from './src/divisions.js';
import { HISTORIC_CHARACTERS } from './src/historicCharacters.js';
import { LEADERS } from './src/leaders.js';


export default {
  // Who this edition is for. `engine/core/typography.js` scales the root font
  // size from it, so the whole interface comes up larger for a nine-year-old
  // than for an undergraduate reading the same layout. It is a property of the
  // edition, not a setting the player should have to find.
  audience: { grade: 2 },

  id: 'hospital',
  title: 'Hospital Heroes',
  subtitle: 'Junior Doctor · Children’s Hospital',

  // The floor, as data. src/world.js builds it directly from the same plan.js,
  // so this is a declaration of what is already true rather than a second
  // opinion about it — and it lets the checks see that every group has a room.
  site: {
    kind: 'interior',
    plan: { rooms: ROOMS, corridor: CORRIDOR },
    spawn: { x: 0, z: 14, yaw: 0 },
  },
  start: { x: 0, z: 14, yaw: 0 },
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

  // src/npcs.js builds and dresses its own people, so there is no OUTFITS table
  // for the engine to read.
  people: { crowd: 'bespoke', spawn: HISTORIC_CHARACTERS.length, extras: 22 },
};
