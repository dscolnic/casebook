// theme.js — Project Y as a gamekit theme.
//
// The adapter that presents this game's existing content in the shape gamekit's
// engine reads, so the engine's copies of gameState, simulation, questionUI,
// dashboard and the rest are shared rather than forked. See
// ../gamekit/THEME_CONTRACT.md.
//
// The world stays this game's own src/world.js, reached through `@world`: the
// mesa, the roads, the pond and the historic town are bespoke, and moving them
// onto engine/world is a separate job. Logic first, world later.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './src/curriculum.js';
import { MISSION_DEFS } from './src/missions.js';
import { GROUP_DEFS } from './src/divisions.js';
import { HISTORIC_CHARACTERS } from './src/historicCharacters.js';
import { LEADERS, AVATARS } from './src/leaders.js';
import { SPECIAL_REQUESTS } from './src/specialRequests.js';

export default {
  id: 'projecty',
  title: 'Project Y',
  subtitle: 'Los Alamos · 1943–45',
  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    MISSIONS: MISSION_DEFS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS, AVATARS,
    COPY: {},
    SPECIAL_REQUESTS,
  },
};
