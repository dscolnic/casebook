// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. Outdoors, because the
// antenna is — the place is `engine/world/outdoorTown.js` driven from site.js, and
// the rooms behind the doors are built lazily from the `interiors` block.
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

  id: 'qd_cmb',
  title: 'The Cosmic Microwave Background',
  subtitle: 'Radio Astronomer · Hilltop Antenna',

  site,
  start: site.spawn,

  // Two huts, a horn on a mount, and a building put there decades later. "A room"
  // is not true of the antenna.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 8 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'There is a hiss coming out of the sky, and it will not go away. It is faint. It works out to '
    + 'about three degrees above absolute zero. It arrives from every direction the horn is pointed. '
    + 'The crew have already subtracted the air, the ground and the road. The hiss is still there. '
    + 'Everybody on this hill thinks the receiver is broken, because that is what a strange signal '
    + 'almost always turns out to be. But if the receiver is fine, then the whole sky is glowing at one '
    + 'temperature. Nobody here can name a thing that would do that. You are the radio astronomer on '
    + 'the site. The checks, the sky sweep and the arithmetic all come through you. Three kelvin, '
    + 'arriving from everywhere, and not one person on the hill can explain it.',
  ],

  ending: [
    'The site closed the week with a signal nobody could get rid of: about three kelvin, '
    + 'the same in every direction except along the band of our own galaxy, surviving every '
    + 'check on the receiver list. Up the ridge, forty frequencies gave a thermal curve with '
    + 'one temperature in it, near two point seven kelvin. And cooling a three-thousand-kelvin '
    + 'early universe forward by a redshift of eleven hundred predicts the same number, from '
    + 'physics that has nothing to do with antennas.',
    'What it cost: weeks spent assuming the instrument was at fault, a ladder, and a whole '
    + 'stop of the week spent refusing to let one measurement be credited with what another '
    + 'one showed. What is unfinished: the tiny differences from direction to direction. This '
    + 'background is very nearly the same everywhere and it is not exactly, and those '
    + 'departures turned out decades later to be the most informative thing about it.',
    'And the argument holds because of you. You worked the receiver list from the reference '
    + 'load outward instead of starting with the interesting part. You changed one thing at a '
    + 'time and put each one back. You found our own galaxy in the sweep and set it aside '
    + 'rather than arguing with it. And you would not let the horn be credited with a spectrum '
    + 'a satellite measured thirty years later. What is left is relic radiation from a hot '
    + 'early universe, and you can name the fact that kills every other answer.',
  ],

  history: [
    'Arno Penzias and Robert Wilson found an excess antenna temperature they could not '
    + 'remove, using the horn antenna at Holmdel, New Jersey, in 1964–65. Thirty miles away '
    + 'at Princeton, Robert Dicke, David Wilkinson and Peter Roll were building an instrument '
    + 'to look for exactly that radiation. The two groups published side by side in 1965; '
    + 'Penzias and Wilson took the 1978 Nobel Prize.',
    'What this game compresses: two institutions into one site, and about a year into one '
    + 'sitting. The foregrounds specialist is invented.',
    'What it does not soften: the pigeons were real, the droppings were cleaned out, and '
    + 'the excess stayed. And the horn measured one frequency — that the spectrum is a '
    + 'blackbody was not shown until COBE, in 1990.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Outdoors, and the sky dome is at 880, so the far plane has to clear it from
    // the far end of the site rather than from the spawn. House rule 18.
    far: 1550,
    fog: { colour: 0x9aa08c, near: 85, far: 600 },
    exposure: 0.9,
    playerRadius: 0.45,
    lighting: { ambient: 0.55, hemi: 0.62 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
