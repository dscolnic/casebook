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
import { INTERIORS } from './src/interiors.js';
import { DIAGNOSIS_PACKS } from './src/diagnosis.js';
import { site } from './site.js';


export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 11 },

  id: 'projecty',
  title: 'Project Y',
  subtitle: 'Los Alamos · 1943–45',

  // The place, as data. src/world.js still builds the mesa by hand — flipping
  // it to engine/world/outdoorTown is its own job — but declaring the site here
  // lets the checks see the buildings, the spawn and the terrain limit now,
  // which is most of what they need to catch an unreachable group.
  site,
  start: site.spawn,
  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    MISSIONS: MISSION_DEFS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS, AVATARS,
    // Expanded into the lessons that reference them by engine/content/normalize.js.
    DIAGNOSIS_PACKS,
    COPY: {},
    SPECIAL_REQUESTS,
  },

  // The crowd is this game's own (src/npcs.js builds and dresses its people),
  // so there is no OUTFITS table for the engine to read. Declared rather than
  // omitted: a missing block and a bespoke one are different situations.
  people: { crowd: 'bespoke', spawn: HISTORIC_CHARACTERS.length, extras: 22 },

  interiors: INTERIORS,
  // Board walls, plank floor, open rafters and one bulb on a flex. The Hill's
  // buildings went up in weeks out of whatever the Army could ship.
  interiorStyle: 'timber',
};
