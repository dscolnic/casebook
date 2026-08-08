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
import { MISSION_DEFS } from './src/missions.js';
import { GROUP_DEFS } from './src/divisions.js';
import { HISTORIC_CHARACTERS } from './src/historicCharacters.js';
import { LEADERS } from './src/leaders.js';

export default {
  id: 'hospital',
  title: 'Hospital Heroes',
  subtitle: 'Junior Doctor · Children’s Hospital',
  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    MISSIONS: MISSION_DEFS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS,
    AVATARS: {},
    COPY: {},
    // This game has no between-mission funding vignettes.
    SPECIAL_REQUESTS: {},
  },
};
