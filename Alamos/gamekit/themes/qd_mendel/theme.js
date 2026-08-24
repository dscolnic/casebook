// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. Outdoors, because the
// experiment is a garden — two hundred and fifty beds and a season between a
// question and its answer. The place is `engine/world/outdoorTown.js` driven from
// site.js, and the rooms behind the doors are built lazily from the `interiors`
// block.
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

  id: 'qd_mendel',
  title: 'The Laws of Inheritance',
  subtitle: 'Experimental Assistant · The Abbey Garden',

  site,
  start: site.spawn,

  // A glasshouse, a shelter at the head of the beds, a counting room and a seed
  // store. "A room" is not true of the trial plots.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 7 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Cross a yellow-seeded pea with a green-seeded one and every seed comes out yellow, as '
    + 'though the green had been rubbed out. Sow those and a quarter of the next generation '
    + 'is green again. Something is being carried through a plant that does not show it, and '
    + 'nobody can say what that something is or how many of them there are. If the counts '
    + 'follow a rule, inheritance is arithmetic and can be predicted. If they wander, it is '
    + 'a blending nobody will ever get a grip on. You are the experimental assistant, which '
    + 'means the crossing, the tally and the seed lines all come through you. Gregor Mendel, '
    + 'who lays out the trials, has one season and two hundred and fifty beds, and he will '
    + 'not sow a single one until the trait is settled.',
  ],

  ending: [
    'The season closed with a trait anybody could sort, a first generation that was uniformly '
    + 'yellow, four hundred seeds that came out three hundred and one to ninety-nine, a pollen '
    + 'count that came back half and half, and a yellow plant of unknown ancestry that turned '
    + 'out to be carrying a green copy all along.',
    'What it cost: a whole season spent on the one trait that could be sorted rather than on '
    + 'the four that were more interesting, several afternoons counting seed nobody needed to '
    + 'count in order to say how far a handful can wander, and sixty flowers opened with '
    + 'forceps before they could open themselves. What is unfinished: nothing here shows a '
    + 'factor. What has been established is a shape in the counts, and the step from a shape '
    + 'to a physical thing being passed on is an argument somebody still has to win.',
    'And you are the reason the numbers mean anything. You chose the trait that produces a '
    + 'count instead of an opinion, before a bed was sown. You wrote the expected three '
    + 'hundred on the board before the tray was opened, so the three hundred and one was a '
    + 'test rather than a coincidence. And you counted more seed instead of moving where you '
    + 'were aiming. That is the whole of what makes a ratio evidence, and it was your season.',
  ],

  history: [
    'Gregor Mendel ran his pea experiments in the garden of the Augustinian abbey at Brno '
    + 'between about 1856 and 1863, and read the results to the Natural Science Society there '
    + 'in 1865. Abbot Cyrill Napp funded and protected the work; František Klácel had run the '
    + 'abbey garden before him and taught him. Carl Nägeli, the Munich botanist Mendel '
    + 'corresponded with, urged him to repeat the work in hawkweed — a plant whose reproduction '
    + 'made the ratios impossible to find, and which occupied years.',
    'What this game compresses: seven seasons and about twenty-eight thousand plants into one '
    + 'garden and one sitting. The garden assistant and the seed clerk are invented, and so are '
    + 'the exact tallies, though the three-hundred-and-one to ninety-nine is close to a real one.',
    'What it does not soften: the work was published and almost entirely ignored for thirty-five '
    + 'years. Mendel died in 1884 without knowing it would matter, and the results were '
    + 'rediscovered independently in 1900 by three people working on other problems. Nägeli, who '
    + 'read the paper and had the results explained to him directly, appears never to have '
    + 'understood what he was being told.',
  ],

  look: {
    fov: 66,
    near: 0.1,
    // Outdoors, and `look.far` has to clear the sky dome from the far end of the
    // site rather than from the spawn: 880 of atmosphere scale plus 135 metres of
    // player limit. At an interior's 160 the dome is clipped and the sky renders
    // black in daylight, with no error anywhere.
    far: 1100,
    fog: { colour: 0xb6bda4, near: 80, far: 520 },
    // A clear continental summer, so brighter and cleaner than the smoky river
    // town this set's other outdoor game is set in.
    exposure: 0.95,
    playerRadius: 0.42,
    lighting: { ambient: 0.46, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
