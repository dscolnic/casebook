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

  id: 'qd_ligo',
  title: 'Gravitational Waves',
  subtitle: 'Detector Scientist · Interferometer Site',

  site: { kind: 'interior', name: 'The Interferometer Station', plan },

  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 6 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'At four in the morning something swept through both instruments in a fifth of a '
    + 'second, climbing in pitch, and then stopped. If it is a lorry or a cracked weld '
    + 'then somebody is about to waste a fortnight. If it is not, two black holes a billion '
    + 'light years away have just spiralled into each other. Space itself arrived here and '
    + 'changed the length of a four-kilometre arm by a thousandth of the width of a proton. '
    + 'Nobody has ever measured that. You are the detector scientist '
    + 'on shift, which means the noise, the templates and the mass ledger all come '
    + 'through you. Gabriela González, who reviews candidates, will not call the other '
    + 'site until you can say what the shape is.',
  ],

  ending: [
    'The week closed with a candidate that survived everything: a rising sweep from about '
    + 'thirty-five hertz to two hundred and fifty in a fifth of a second, matched by a '
    + 'template that left no structure behind, seen at both sites within the ten '
    + 'milliseconds light needs to cross between them, with several hundred auxiliary '
    + 'channels quiet at each. Thirty-six and twenty-nine solar masses in, about sixty-two '
    + 'out, and three solar masses gone as waves.',
    'What it cost: a night of the whole site working on something that might have been a '
    + 'lorry, and four hours of calibration to turn a brightness into a strain before any '
    + 'number could be quoted. What is unfinished: the spins are barely constrained, the '
    + 'distance only roughly, and one event constrains rival theories of gravity rather '
    + 'than eliminating them. And the masses on the board are early-reported teaching '
    + 'values. The precision fits came afterwards and moved them.',
    'And the claim is yours. You would not take the template with the best score, because '
    + 'its leftovers were structured across the whole first half of the event. You named the '
    + 'radiation as the step that governs rather than the rising note that everybody looks '
    + 'at. You worked out the ten-millisecond window before anybody shifted the traces '
    + 'against each other. And you wrote consistent with rather than proves, on a night when '
    + 'the building would have signed anything. That is a first detection done properly.',
  ],

  history: [
    'LIGO recorded GW150914 on 14 September 2015 and announced it on 11 February 2016: two '
    + 'black holes of about 36 and 29 solar masses merging a billion light years away, seen '
    + 'as a strain of one part in 10^21. Rainer Weiss designed the interferometer in 1972; '
    + 'Kip Thorne and Ronald Drever founded the project with him; Barry Barish built the '
    + 'collaboration that made it work; Gabriela González was spokesperson for the Scientific '
    + 'Collaboration when the signal arrived. Weiss, Barish and Thorne shared the 2017 Nobel '
    + 'Prize; Drever died in 2017.',
    'What this game compresses: about a thousand people and forty years into six people and '
    + 'one sitting. The noise, parameter-estimation and calibration roles are invented.',
    'What it does not soften: the collaboration had run blind injections for years — fake '
    + 'signals inserted to test the analysis — so the first question anybody asked about the '
    + 'real one was whether somebody had put it there.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 190,
    fog: { colour: 0x7a8188, near: 32, far: 112 },
    exposure: 0.97,
    playerRadius: 0.38,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
