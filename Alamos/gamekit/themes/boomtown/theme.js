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
import { INTERIORS } from './interiors.js';
import metrics from './metrics.js';
import { FIXTURES } from './fixtures.js';
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { decorate } from './props.js';
import { dressRoom } from './story.js';
import { OPENING, ENDING } from './cards.js';


export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  // 1943 to 1945. Fifteen of these are programme stages, not days.
  dayNoun: 'Stage',
  audience: { grade: 12 },

  id: 'boomtown',
  title: 'Boomtown',
  subtitle: 'State Economic Advice Team · Mesa Town · six weeks to the freight agreement',

  // The place, as data, and now actually built from it: `src/world.js` is a thin
  // adapter over engine/world/outdoorTown.js, which reads this. The Los Alamos
  // objects the engine has no opinion about — the Tech Area wire, the water tank,
  // the duckboards, the forest — are in props.js beside this file.
  site,
  decorate,
  // The fifteen world-state lines, on the offices' fixtures. See story.js.
  dressRoom,
  start: site.spawn,
  // How it ends.
  //
  // Not a happy ending, because this one cannot honestly have one — and not a silent
  // one either, which is what "Campaign complete" in the HUD amounted to after fifteen
  // stages. The technical work closes, the people go home, the physics stops being
  // secret, and the argument the scientists themselves started is handed on.
  // The bible's own ending card, verbatim — see cards.js.
  ending: ENDING,

  // NO WARM-UP RUNS. A run before mission 1 is a tutorial wedged between the
  // opening card and the first thing the campaign says, and the later ones cost
  // a morning each on a campaign whose bible never asked for them. A campaign
  // that wants them authors them and sets this true. See engine/core/warmups.js.
  warmupRuns: false,

  // ------------------------------------------------- THE FOUR BARS
  //
  // Generated from §2 of the campaign bible by tools/bible-metrics.mjs: the
  // four bars with their starting values and lock missions, the recovery
  // formula, the bank cap, and each mission's target time, story event and
  // automatic change. Wiring it is what puts them on the screen — the file is
  // written either way, and a theme that does not import it scores nothing.
  metrics,
  // The bars are the score, so there is no funding round and no day countdown
  // beside them: two clocks on one screen is two clocks to choose between.
  economy: false,
  // The bible unlocks each stop from the one before ("Unlocks: Stop 3"), and
  // its beat script is keyed to the stop number that closed. See STOPS_IN_ORDER
  // in engine/core/constants.js.
  stopOrder: 'sequential',

  content: {
    CURRICULUM, BALLPARK_CALCS, JARGON,
    MISSIONS: MISSION_DEFS,
    WARMUPS,
    GROUPS: GROUP_DEFS,
    ROSTER: HISTORIC_CHARACTERS,
    LEADERS, AVATARS,
    // Expanded into the lessons that reference them by engine/content/normalize.js.
    COPY: {},
  },

  // The crowd is the engine's now. `src/npcs.js` was 890 lines of this game's
  // own people, built and dressed here rather than by `engine/people/crowd.js` —
  // which is where the "people stand aside" fix and every crowd bug fix since
  // had to be written twice.
  // `pace`: a boom town walks quicker than the Hill strolled.
  people: { OUTFITS, roleToOutfit, spawn: HISTORIC_CHARACTERS.length, extras: 26, pace: 1.3 },

  // The title card: ONE paragraph of situation. What the player is, where
  // they are, and what it costs if the work is not done — no mechanics, no
  // controls, no scope line. This game had none at all and opened on a blank.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One link a stage, in the order the work happened to establish them. A
  // chain is only as good as its weakest link, which is why each piece carries
  // how well it is known rather than what it concluded.
  delivery: {
    name: 'The Town and Freight Agreement',
    what:
      'A public plan that the council, firms and housing co-op read to check each '
      + 'promise, its cost and who pays.',
    where: 'T',
    pieces: [
      'The meal trade',
      'The lunch price finding',
      'The room price test',
      'The cook hiring rule',
      'The rent access count',
      'The housing fee account',
      'The supplier shift plan',
      'The fair entry rule',
      'The wage clause',
      'The freight access finding',
      'The pact risk forecast',
      'The water cost rule',
      'The filter cost account',
      'The access retrofit choice',
      'The signed town agreement',
    ],
  },
  // The bible's own opening sequence, verbatim — see themes/boomtown/cards.js.
  opening: OPENING,

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

  // The objects a question is asked AT, declared by the campaign bible.

  fixtures: FIXTURES,
  // Board walls, plank floor, open rafters and one bulb on a flex. The Hill's
  // buildings went up in weeks out of whatever the Army could ship.
  interiorStyle: 'timber',
};
