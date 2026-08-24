// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. Outdoors, because the
// first evidence in this subject is a shape on the ground — a pump, the houses
// that drew from it, and the houses fifty yards off that did not. The place is
// `engine/world/outdoorTown.js` driven from site.js, and the rooms behind the
// doors are built lazily from the `interiors` block.
import { site } from './site.js';
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

  id: 'qd_germ',
  title: 'Germ Theory of Disease',
  subtitle: 'Investigator · Marlow Fields',

  site,
  start: site.spawn,

  // A court, an office, a ward and a hut on ninety metres of lane. "A room" is
  // not true of the court.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 8 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Sixty-six people in one court are dead or dying. The houses fifty yards away are almost '
    + 'untouched. Everybody has an answer. Some blame the smell. Some blame the weather. Some blame the '
    + 'poor themselves. Others think the illness passes from one person to the next. If one thing is '
    + 'reaching these people by a route somebody can name, then blocking that route would stop it. That '
    + 'would change how doctors work everywhere. If it is the bad air, nothing done in this court will '
    + 'help. You are the investigator here. The street map, the ward counts and the lab all report to '
    + 'you. The vestry votes on Friday about the pump handle. Forty households draw their water from '
    + 'that one pump.',
  ],

  ending: [
    'The week closed with a thirty per cent attack rate on one water supply and almost '
    + 'nothing on another in the same court, one organism grown pure and given to matched '
    + 'animals, the same organism recovered from three of four that fell ill, and a fortnight '
    + 'in which one basin at one door brought a ward wing down to the rate of the wing beside it.',
    'What it cost: four days of a clerk\'s week spent counting people who did not fall ill, '
    + 'a day in the court that could have been twenty more cases and was not, and a fortnight '
    + 'of a ward run as a comparison while the physician was told he was wasting it. What is '
    + 'unfinished: nothing here says what is in the water. Nobody has grown the thing the '
    + 'court is dying of, and the handle came off on a pattern rather than on a culture.',
    'And you are the reason the argument held. You asked for the denominator before the '
    + 'count, so the map became a rate somebody could dispute honestly. You spent the day on '
    + 'the eleven households that could have destroyed the case instead of the twenty that '
    + 'could only have flattered it. And at the end you said out loud which proposal the '
    + 'week\'s evidence did not reach. That is what a theory being strong actually looks '
    + 'like, and it was your week.',
  ],

  history: [
    'John Snow mapped the 1854 cholera outbreak around the Broad Street pump in Soho and '
    + 'argued for waterborne transmission years before the organism was known; Henry '
    + 'Whitehead, a local curate who began convinced Snow was wrong, did the door-to-door '
    + 'work that made the map hold. Ignaz Semmelweis showed in Vienna in the 1840s that '
    + 'hand disinfection cut deaths on one obstetric ward, without being able to say what it '
    + 'removed. Robert Koch established the laboratory chain — pure culture, controlled '
    + 'exposure, re-isolation — for anthrax and tuberculosis in the 1870s and 1880s, work '
    + 'that ran alongside Louis Pasteur\'s in France.',
    'What this game compresses: three countries and forty years into one district and one '
    + 'sitting. The registrar\'s clerk and the ward sister are invented, and so are the exact '
    + 'counts on the map and in the hut.',
    'What it does not soften: Semmelweis was disbelieved, dismissed and died in an asylum in '
    + '1865, and the measure he had shown to work was abandoned after he left. Snow died in '
    + '1858 with the water argument still officially rejected. And the criteria Koch is '
    + 'remembered for fail for viruses, for organisms that will not grow on a plate, and for '
    + 'carriers who never fall ill.',
  ],

  look: {
    fov: 66,
    near: 0.1,
    // Outdoors, and `look.far` has to clear the sky dome from the far end of the
    // site rather than from the spawn: 880 of atmosphere scale plus 140 metres of
    // player limit. At an interior's 160 the dome is clipped and the sky renders
    // black in daylight, with no error anywhere.
    far: 1100,
    fog: { colour: 0xa8a692, near: 60, far: 460 },
    // Coal smoke over a river town. Lower than the radio site's, because this
    // place is meant to look like the air is part of the argument.
    exposure: 0.92,
    playerRadius: 0.42,
    lighting: { ambient: 0.42, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
