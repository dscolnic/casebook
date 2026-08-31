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
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
// tools/import-book.mjs writes all of these. BALLPARK_CALCS and JARGON must be
// imported or the estimates render un-answerable and no term is clickable.
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { FIXTURES } from './fixtures.js';
import { MINOR_INTERIORS } from './minors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // What one mission is called here. The engine's model is a working day;
  // this campaign is not one, so the label is not either.
  dayNoun: 'Phase',

  // The sites are hundreds of metres apart and nobody walks between them. The
  // day's budget is measured at the speed the player actually travels — see
  // engine/core/day.js. Not the helicopter's cruise of 34: the first three
  // phases are driven, at 16, and a budget written for the aircraft leaves a
  // phase that has to be driven with no time to think in.
  travelSpeed: 16,

  // The survey crew stands at base camp, not on Cerro Alto. Their instrument is
  // up there and their shift handover is not, and a person stop is a conversation
  // — the only thing a drive to the summit added to it was the drive. Read by
  // engine/world/outdoorTown.js when it places the crowd.
  peopleHome: { DISC: 'OPS' },

  // The first phase the survey helicopter flies. Before it, the machine is on
  // the pad and says so, and the range is crossed in the site truck — the
  // aircraft is not the player's to sign out on the first night of a campaign.
  // Read by src/main.js, which refuses the interaction and rewrites the prompt.
  aircraftFromDay: 4,


  id: 'planetary_defense',
  title: 'Planetary Defense',
  subtitle: 'Campaign Director · International NEO Response',

  // The plan card's stake is a date stamp and two sentences: the one thing
  // true this morning, and the one thing the player does about it. The long
  // form named the day's expert by name and job before saying what the
  // player does, and was read fifteen times over a campaign that already
  // meets its cast on the calls. `engine/dev/checkStory.mjs` reads this and
  // swaps the 90-word floor for a 30–70 word ceiling with no floor, and drops
  // the plan card's delivery line. See gamekit/BRIEFING_PASS.md.
  stakeStyle: 'brief',

  // The place. `site.kind` picks the world module in vite.config.js:
  //   'outdoor'   engine/world/outdoorTown.js — buildings on terrain
  //   'interior'  engine/world/interiorSite.js — a spine with rooms off it
  // A theme whose place already exists may declare its own instead, with
  // `world: 'themes/<name>/world.js'` inside site.js. Deep Watch does.
  site,

  // Where the player starts the day, and which way they face. The day's budget
  // is measured from here, not from wherever the player is standing.
  start: site.spawn,

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

  // What is inside each room the player walks into, from book.yml, plus one
  // place that is not an area: Valle Seco Emergency Office, promoted from a
  // standing facade by the placement pass. Rooms are built by
  // engine/world/interiorBuilding.js on first entry.
  interiors: { ...INTERIORS, ...MINOR_INTERIORS },
  // The objects the questions are asked at, built on entry from the open call.
  // engine/world/interiorFixtures.js; catalogue in ./fixtures.js.
  fixtures: FIXTURES,
  // How those rooms are built: 'lab' (vinyl, screens), 'timber' (board walls,
  // chalkboards, no screens anywhere) or 'steel' (painted plate, deck matting).
  // Dark surfaces and red service lighting: an observatory control room is lit
  // to preserve night vision, and it looks like nowhere else in this set.
  interiorStyle: 'observatory',

  // The title card: ONE paragraph. What the player is, where they are, and what
  // happens if the work is not done — the situation, and nothing else. The
  // rules of a day (order, clock, the price of a wrong call) used to be a
  // second paragraph here and in every game, and it was the part nobody read:
  // four sentences of mechanics standing between the player and the game, all
  // of it discoverable in the first minute of play or from the plan card.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // One finding a phase, in the order the sky gave them up. The orbit solution
  // is written third and is the thing every later page is read against.
  delivery: {
    name: 'The Defense Review',
    // The HUD meter's label, above the bar that replaced "Mission 4 of 15". Two
    // or three words naming the goal rather than the progress — the bar says
    // how far along; the label says what is filling it.
    meter: 'Findings filed',
    what: 'The dossier the international committee votes on: how big it is, where it is going, '
      + 'whether it can be moved, and what risk is left if it is.',
    where: 'OPS',
    pieces: [
      'The discovery confirmation',
      'The astrometric positions',
      'The first orbit solution',
      'The uncertainty corridor',
      'The size estimate',
      'The composition finding',
      'The rotation and shape model',
      'The radar range and Doppler',
      'The impact energy estimate',
      'The entry and airburst model',
      'The survey completeness figure',
      'The deflection feasibility',
      'The intercept design',
      'The evacuation decision',
      'The residual risk statement',
    ],
  },
  opening: [
    'A telescope found a new asteroid last night, moving fast against the stars. Some early orbit '
    + 'guesses say it could hit Earth in eleven days. Nobody knows yet if the guesses are right, or '
    + 'how big the asteroid is. You are the campaign director, which means it is your job to find out '
    + 'and report to the public. The international committee will vote on your Defense Review, and '
    + 'the public is waiting to hear it. It has to say how big the object is, where it is going, and '
    + 'whether it can be pushed off course. Even a clean miss will not close this file for years.',
  ],

  // How it ends. Printed on the last page of the book and shown when the campaign
  // closes — the campaign used to end by putting "Campaign complete" in the HUD and
  // nothing else, after fifteen phases of work.
  ending: [
    'The object passed eleven days ago — the second time, the encounter everyone had been quietly '
    + 'dreading since the keyhole turned up — two Earth radii out and falling further behind every '
    + 'hour. Most of that clearance was bought five years earlier, by an impactor that hit while the '
    + 'object was still the better part of a decade from anywhere near Earth. The radar window that '
    + 'opened last week is what finally proved the push had worked. Nobody evacuated Valle Seco. The '
    + 'school there reopened on the Monday.',
    'The survey that found it is still running tonight, and the file stays open — this one is '
    + 'settled, and the next one has not been found yet.',
    'None of that quiet was luck. You separated what the radar could prove from what the '
    + 'model merely preferred, you caught a keyhole nobody had gone looking for, and you kept the '
    + 'size uncertainty in front of everybody who wanted one clean number. Getting the call wrong '
    + 'in either direction — the first pass, or the second — would have cost a town. Valle Seco '
    + 'slept through both. That was your doing.',
  ],
  look: {
    // DAYLIGHT OVERRIDE. The campaign is written for night — 19:00 through to
    // 07:00 — and `atmosphere.nightSky`, the fog colour and the light rig were
    // all tuned around that. This window runs a working day instead so the
    // ridge, the domes and the dish are visible. Put [19, 31] back to restore
    // the nocturnal game.
    dayWindow: [8, 20],
    fov: 66,
    near: 0.1,
    // Must clear the sky dome, which this site scales to 950, and the farthest
    // horizon rank at 820. At 900 the dome fell outside the frustum and was not
    // drawn at all: the page background showed through as a flat grey sky, with
    // the ranks and the stars still rendered in front of it. It reads as a
    // lighting problem and is a clipped object. `buildSky` now warns.
    far: 6000,
    // Thin cold air. At night this was nearly black, because at night the fog
    // is the sky; in daylight it has to be the haze instead or the far ranks
    // sit in a dark band under a bright sky.
    // Thin, dry, high air, and a two-and-a-half-kilometre site: the next summit
    // is 950 m away and it is the thing you navigate by, so the haze has to
    // start beyond it and still give the far ranks some depth. These are the
    // theme's own distances again — until the sun rig was fixed it overwrote
    // them every frame with 210/660, and both domes stood in solid white.
    fog: { colour: 0xa8bcd0, near: 550, far: 2600 },
    // Below 1.0 outdoors, or a mid albedo under a bright sky IBL blows out.
    // A night scene has no sun to blow out, but it must not be lifted either:
    // `nightLift: 0` keeps the engine from raising exposure after dark, which
    // is what a daytime game wants at dusk and what turns this sky grey.
    // Under ACES with a bright sky IBL a mid albedo renders near-white, so an
    // outdoor daytime scene wants this below 1.0. `nightLift` is what stops the
    // engine raising exposure after dark and does nothing inside a day window.
    exposure: 0.88,
    nightLift: 0,
    // How wide the player is, for collision. 0.45 suits a street; a place with
    // metre-wide doorways needs 0.3 or the player gets stuck in them.
    playerRadius: 0.45,
    // Six real lights is the ceiling. buildSunRig makes three of them.
    // Daylight: the sun rig carries the scene and ambient drops back, or the
    // shadows fill in and the ridge goes flat. Still three real lights from
    // buildSunRig, against a ceiling of six; every lamp on the mountain stays
    // emissive and simply stops mattering while the sun is up.
    lighting: { ambient: 0.22, sun: 2.2, hemi: 0.75, shadowExtent: 140 },
  },

  // Theme hooks. `decorate` is called by the outdoor world, the two fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate,
  fitOutRoom,
  fitOutSpine,
};
