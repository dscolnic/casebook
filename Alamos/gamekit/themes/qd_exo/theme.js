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
  // it asks anything. Still above grade 8, which keeps the driven instruments legal.
  audience: { grade: 9 },

  dayNoun: 'Level',

  id: 'qd_exo',
  title: 'Something Is Pulling',
  subtitle: 'Observer · Planet Search Programme',

  site: { kind: 'interior', name: 'The Planet Search Floor', plan },

  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 6 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'The star on the screen looks like every other star. It is also being pulled '
    + 'about by something, and nobody knows what. Twenty nights of spectra show its '
    + 'whole forest of lines sliding one way and then the other, by a few parts in '
    + 'ten million, over and over. If the thing pulling is another star, this is a '
    + 'dull binary and the programme has wasted a season. If it is small enough, it '
    + 'is a planet round somebody else\'s sun, and nobody has ever measured one. You '
    + 'are the observer on the search, which means the spectra, the light curve and '
    + 'the arithmetic all come through you. Michel Mayor, the spectrograph lead, wants '
    + 'a class on the sheet by Thursday, and the name you write goes on the discovery '
    + 'paper.',
  ],

  ending: [
    'The programme closed with a planet nobody has ever seen: four and two tenths of a '
    + 'day round a Sun-like star, about half of Jupiter\'s mass once the tilt was fixed, a '
    + 'radius a little larger than Jupiter\'s, and a density a bit over a quarter of '
    + 'Jupiter\'s. A hot Jupiter, from a wobble and a dip.',
    'What it cost: three nights of telescope time spent measuring where light sat in an '
    + 'image rather than on more of the photometry everybody wanted, and a whole level '
    + 'spent ruling out things that were not planets. What is unfinished: nothing here says '
    + 'what the atmosphere is made of, whether the orbit is circular, or how a planet that '
    + 'size arrived that close to its star. The next measurement is the star\'s light shining '
    + 'through the planet\'s air during a transit, and that is somebody else\'s programme.',
    'And the sheet holds because of you. You would not call a minimum mass a mass. You '
    + 'predicted the fifth dip before anybody reduced the frames, in data that could have '
    + 'contradicted you. You spent the telescope nights on the one check whose answer could '
    + 'have killed the candidate rather than on the three that would have flattered it. And '
    + 'you wrote hot Jupiter with four measurements behind it instead of a label with none. '
    + 'That is a planet found properly.',
  ],

  history: [
    'Michel Mayor and Didier Queloz found 51 Pegasi b with the ELODIE spectrograph at '
    + 'Haute-Provence, announcing it in October 1995: a planet about half the mass of '
    + 'Jupiter, four days from its star, where no theory of planet formation put one. '
    + 'Geoffrey Marcy and Paul Butler confirmed it within a week. Mayor and Queloz shared the '
    + '2019 Nobel Prize. David Charbonneau and Gregory Henry independently observed the first '
    + 'transiting planet, HD 209458 b, in 1999 — the measurement that turned a wobble into a '
    + 'radius.',
    'What this game compresses: two techniques and four years into one programme and one '
    + 'sitting. The validation, characterisation and scheduling roles are invented.',
    'What it does not soften: the same radial-velocity signal had been seen before and set '
    + 'aside as stellar activity, and the first claimed exoplanet detections of the 1960s and '
    + '1980s were wrong.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 175,
    fog: { colour: 0x8a8176, near: 30, far: 105 },
    exposure: 0.97,
    playerRadius: 0.38,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
