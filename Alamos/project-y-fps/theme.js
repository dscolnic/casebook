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
// The content is one book — gamekit/books/project-y.yml — imported to ./content/
// by tools/import-book.mjs, and engine/dev/bookParity.mjs fails if these files
// stop matching it. src/*.js are one-line doors onto the same data, kept because
// this game's own modules import them.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { MISSIONS as MISSION_DEFS } from './content/missions.js';
import { GROUPS as GROUP_DEFS } from './content/groups.js';
import { ROSTER as HISTORIC_CHARACTERS, LEADERS, AVATARS } from './content/roster.js';
import { DIAGNOSIS_PACKS, SPECIAL_REQUESTS } from './content/shared.js';
import { INTERIORS } from './interiors.js';
import { site } from './site.js';
import { decorate } from './props.js';


export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  // 1943 to 1945. Fifteen of these are programme stages, not days.
  dayNoun: 'Stage',
  audience: { grade: 12 },

  id: 'projecty',
  title: 'Project Y',
  subtitle: 'Los Alamos · 1943–45',

  // The place, as data, and now actually built from it: `src/world.js` is a thin
  // adapter over engine/world/outdoorTown.js, which reads this. The Los Alamos
  // objects the engine has no opinion about — the Tech Area wire, the water tank,
  // the duckboards, the forest — are in props.js beside this file.
  site,
  decorate,
  start: site.spawn,
  // How it ends.
  //
  // Not a happy ending, because this one cannot honestly have one — and not a silent
  // one either, which is what "Campaign complete" in the HUD amounted to after fifteen
  // stages. The technical work closes, the people go home, the physics stops being
  // secret, and the argument the scientists themselves started is handed on.
  ending: [
    'The technical questions closed in August 1945, and every line of work could finally say what '
    + 'it knew and how well it knew it. The war ended. The mesa emptied over the following year: '
    + 'the theorists went back to universities, the metallurgists to industry, and the site to a '
    + 'laboratory that is still there.',
    'The physics did not stay secret, because physics does not. What the people here could defend, '
    + 'claim by claim, is written down — and so is what they argued about once they could argue in '
    + 'public. That record is the part you inherit.',
  ],

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
