// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The place is the
// engine's own interior world (`engine/world/interiorSite.js`) driven from
// plan.js, which is the cheap and checked way to bring a building.
import { plan } from './plan.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { INTERIORS } from './interiors.js';
import { decorate, fitOutRoom, fitOutSpine } from './props.js';

export default {
  // Plain senior high rather than AP. Nine stops in one sitting for somebody who
  // has not been taught the course first, so the prose and the arithmetic sit two
  // grades below the fortnight-long games and every card teaches its method before
  // it asks anything. Still above grade 8, which keeps the driven instruments
  // legal — they are the reason this is worth playing rather than reading.
  audience: { grade: 9 },

  dayNoun: 'Level',

  id: 'qd_tectonics',
  title: 'Plate Tectonics',
  subtitle: 'Geoscientist · Global Survey Section',

  site: { kind: 'interior', name: 'The Global Survey Section', plan },

  // The corridor at the porter's end, facing down the building into the map hall.
  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 6 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Look at a map of the Atlantic. The land on one side matches the land on the other. The same '
    + 'fossils. The same belts of rock. The same deep scratches, cut by one sheet of ice. For forty '
    + 'years that has been enough to make people curious. It has not been enough to make them act. '
    + 'Nobody can name a force big enough to move a whole continent. Then the ships came back. There is '
    + 'a second wall in this building, locked until this morning. Behind it are rock ages from the sea '
    + 'floor. There are magnetic traces, towed in long straight lines. There are forty years of quakes '
    + 'from under the ocean. You are the geoscientist here, so every file is read by you before it is '
    + 'argued about. The head of the section wants one story that covers all of it by Wednesday. That '
    + 'is three days away.',
  ],

  ending: [
    'The week closed with seven files and one framework: rigid plates, made at the '
    + 'ridges where they separate, taken back into the mantle at the trenches where '
    + 'they converge, sliding past each other in between. The Atlantic floor came out '
    + 'at about three centimetres a year, the magnetic bands matched the land timeline '
    + 'and matched it again mirrored across the ridge, and the earthquakes under one '
    + 'margin drew a sheet descending at a little over twenty-five degrees.',
    'What it cost: ten years of ships for the age file alone, a field season spent on '
    + 'one fossil when three other surveys were asking for it, and an Indian bearing '
    + 'set that had to be recomputed from magnetic north after the pole had already '
    + 'been reported once. What is unfinished, and it is the largest thing in the '
    + 'report: nothing here says what drives the motion. The framework does not depend '
    + 'on the answer, which is exactly why it will still be standing when somebody '
    + 'finds it.',
    'And the reading was yours. You would not fit the continents at their beaches. You '
    + 'spent the field season on the animal that could not have swum rather than the one '
    + 'that could. You caught a whole survey measured against the wrong north, and you '
    + 'reported an area instead of a point because scratches in old rock will not carry '
    + 'a point. Three candidate frameworks came down this week and you can name the file '
    + 'that killed each one.',
  ],

  history: [
    'Alfred Wegener proposed continental drift in 1912 and was largely rejected for forty '
    + 'years, because he had no mechanism. Marie Tharp mapped the floor of the Atlantic at '
    + 'Lamont from 1952 and found the rift running down the middle of the ridge. Harry Hess '
    + 'proposed sea-floor spreading in 1962. Fred Vine and Drummond Matthews showed in 1963 '
    + 'that the magnetic stripes either side of a ridge are symmetric, which is what turned '
    + 'the idea into a measurement. Hugo Benioff had mapped the deep earthquake zones under '
    + 'trenches; Maurice Ewing directed Lamont.',
    'What this game compresses: fifty years and several institutions into one section and '
    + 'one sitting. The palaeontologist is invented.',
    'What it does not soften: Tharp\'s first map was called girl talk by a colleague and her '
    + 'name was left off the papers her work made possible. Wegener died on the Greenland ice '
    + 'in 1930, thirty years before he was shown to be right.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 190,
    // A government building in winter. The distance down the corridor is its own.
    fog: { colour: 0x9a9880, near: 30, far: 110 },
    exposure: 0.96,
    playerRadius: 0.38,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
