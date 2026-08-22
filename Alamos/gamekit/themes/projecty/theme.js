// theme.js — Project Y as a gamekit theme.
//
// The adapter that presents this game's existing content in the shape gamekit's
// engine reads, so the engine's copies of gameState, simulation, questionUI,
// dashboard and the rest are shared rather than forked. See
// ../gamekit/THEME_CONTRACT.md.
//
// The world is `engine/world/outdoorTown.js` now, like every other outdoor game:
// `src/world.js` was a 120-line adapter over it, kept only because this game's
// own entry point called the old names. With the shared entry point there is
// nothing left for it to adapt.
// The content is one book — gamekit/books/project-y.yml — imported to ./content/
// by tools/import-book.mjs, and engine/dev/bookParity.mjs fails if these files
// stop matching it. src/*.js are one-line doors onto the same data, kept because
// this game's own modules import them.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { MISSIONS as MISSION_DEFS, WARMUPS } from './content/missions.js';
import { GROUPS as GROUP_DEFS } from './content/groups.js';
import { ROSTER as HISTORIC_CHARACTERS, LEADERS, AVATARS } from './content/roster.js';
import { DIAGNOSIS_PACKS } from './content/shared.js';
import { INTERIORS } from './interiors.js';
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
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
    'What it cost, and what nobody here could close. Two years of a fence, and most of the '
    + 'people behind it unable to tell their families what they did. Trinity was fired on one '
    + 'shot with weather closing in, and the yield it returned was inside the prediction band '
    + 'only because the band was wide. Two cities. The uncertainty budget was still open at the '
    + 'freeze on the equation of state at the pressures nobody could reach on a bench, on the '
    + 'symmetry of the last implosion at the last few per cent, and on what the fallout would do '
    + 'downwind, which the site measured for weeks afterwards and could not agree on. What went '
    + 'to Washington was a technical account of expected effects and their uncertainty, and it '
    + 'was kept separate from what anybody here thought should be done with them — which is the '
    + 'distinction this laboratory argued about most and the one it got right.',
    'The physics did not stay secret, because physics does not. What the people here could defend, '
    + 'claim by claim, is written down — and so is what they argued about once they could argue in '
    + 'public. That record is the part you inherit.',
    'What you inherit, you also earned. For two years you settled what a measurement could '
    + 'and could not say, in a place where being wrong was expensive and being certain too '
    + 'early was worse. Every claim you defended is still standing. Very few people could have '
    + 'held that line for as long as you did.',
  ],

  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    MISSIONS: MISSION_DEFS,
    WARMUPS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS, AVATARS,
    // Expanded into the lessons that reference them by engine/content/normalize.js.
    DIAGNOSIS_PACKS,
    COPY: {},
  },

  // The crowd is the engine's now. `src/npcs.js` was 890 lines of this game's
  // own people, built and dressed here rather than by `engine/people/crowd.js` —
  // which is where the "people stand aside" fix and every crowd bug fix since
  // had to be written twice.
  people: { OUTFITS, roleToOutfit, spawn: HISTORIC_CHARACTERS.length, extras: 22 },

  // The title card: ONE paragraph of situation. What the player is, where
  // they are, and what it costs if the work is not done — no mechanics, no
  // controls, no scope line. This game had none at all and opened on a blank.
  opening: [
    'It is April 1943, and the site is three weeks old: a boys\' school on a mesa in New '
    + 'Mexico with a laboratory going up around it. There is a fence, and most people arriving '
    + 'cannot tell their families where they are. You are a scientist newly assigned to Project '
    + 'Y, which has one problem to solve and a schedule set by a war. Five divisions work on it '
    + 'at once, and not one can finish without the other four. Nobody yet knows whether the '
    + 'thing on three blackboards will work at all. Oppenheimer, who directs the laboratory, '
    + 'holds a meeting every week where anyone may be asked anything, so that being wrong costs '
    + 'days instead of months.',
  ],

  look: {
    // The Hill worked a long day, and this window is its daylight rather than
    // its hours: the sun angle is the only thing it drives.
    dayWindow: [6, 19],
    fov: 66,
    near: 0.1,
    // Outdoors this has to reach past the horizon ranks and the sky dome. At an
    // interior's 160 the dome is clipped away and the sky renders **black in
    // broad daylight**, with no error anywhere — which is exactly how this game
    // rendered on its first night as a normal theme. 900 was not enough either:
    // this site scales its sky to 850, so from anywhere but the origin the far
    // side of the dome is past 900 and it is still clipped.
    far: 2600,
    // High desert air: thin, and it goes a long way. The mesa's own edge is at
    // 122 m and the ranges beyond it have to stay readable.
    fog: { colour: 0xc9c2ad, near: 90, far: 620 },
    // Under ACES with a bright sky IBL a mid albedo renders near-white, and
    // this place is pale timber and pale dust already.
    exposure: 0.92,
    playerRadius: 0.45,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  interiors: INTERIORS,
  // Board walls, plank floor, open rafters and one bulb on a flex. The Hill's
  // buildings went up in weeks out of whatever the Army could ship.
  interiorStyle: 'timber',
};
