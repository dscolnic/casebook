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

  id: 'qd_higgs',
  title: 'The Higgs Boson',
  subtitle: 'Physicist · Collider Analysis Group',

  site: { kind: 'interior', name: 'The Collider Analysis Floor', plan },

  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 6 },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'One slot on the chart on this wall is still empty. If something is sitting in it, '
    + 'then the reason anything in the universe has mass has just become measurable. The '
    + 'trouble is what that something does. It falls apart the instant it is made, and '
    + 'all it leaves behind is a few extra ordinary-looking events at one particular '
    + 'mass, buried in billions of collisions that look the same. You are the physicist '
    + 'on the search, which means the channels, the reconstruction and the background '
    + 'model all come through you. Fabiola Gianotti, the physicist who combines the channels '
    + 'and writes what the group says out loud, has a hall booked for Thursday morning. '
    + 'Whatever sentence goes up on that screen will be quoted for twenty years.',
  ],

  ending: [
    'The week closed with an excess at about 125 GeV in two channels at once: four sigma '
    + 'in the diphoton distribution, a little over three in the four-lepton channel, and '
    + 'five sigma combined. The background had been fitted on the sidebands with four '
    + 'free parameters and frozen before the window was opened, and it held.',
    'What it cost: eleven analyst-months that could not stretch to the coupling '
    + 'measurements, so how strongly this thing talks to bottom quarks and top quarks is '
    + 'still unknown. What is unfinished, and it is most of the identification: the spin, '
    + 'the parity and every coupling. Consistent with the hypothesis means nothing measured '
    + 'so far disagrees. It does not mean the question is closed, and the years after this '
    + 'week are what closed it.',
    'And the sentence held because of you. You would not let the field be described as the '
    + 'source of all mass, with a proton diagram sitting right there. You froze a stiff '
    + 'background that scored worse on the sidebands, rather than the flexible one that '
    + 'would have eaten the bump. And when the number came out at five sigma you held the '
    + 'two claims it could not support, including the one the press office had already '
    + 'written. A new boson, consistent with the hypothesis, properties still to be '
    + 'measured. That is your sentence, and it is still accurate.',
  ],

  history: [
    'ATLAS and CMS announced a new boson near 125 GeV on 4 July 2012, each at five standard '
    + 'deviations. Fabiola Gianotti spoke for ATLAS and Joe Incandela for CMS; Eilam Gross '
    + 'was an ATLAS Higgs convener; John Ellis is a CERN theorist. The field itself was '
    + 'proposed in 1964 by Peter Higgs and, independently, by François Englert and Robert '
    + 'Brout, and by Gerald Guralnik, Carl Hagen and Tom Kibble. Higgs and Englert shared the '
    + '2013 Nobel Prize; Brout had died in 2011.',
    'What this game compresses: two collaborations of about three thousand people each into '
    + 'one group of six, and years of running into one sitting. The reconstruction lead and '
    + 'the detector physicist are invented, because no single person held either job.',
    'What it does not soften: five sigma is a statement about background and about nothing '
    + 'else, and the press-office sentence the game asks you to hold was printed, in various '
    + 'forms, all over the world that week.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 180,
    fog: { colour: 0x7d858c, near: 30, far: 105 },
    exposure: 0.97,
    playerRadius: 0.38,
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
