// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The place is the
// engine's own interior world (`engine/world/interiorSite.js`) driven from
// plan.js, which is the cheap and checked way to bring a building — `placement`
// can fire rays at it and every fixture goes up through `interiorKit`.
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
  // Plain senior high rather than AP. A Quick Discovery is nine stops in one
  // sitting for somebody who has not been taught the course first, so the prose
  // and the arithmetic come down two grades from where the fortnight-long games
  // sit — and the card teaches the method before it asks anything.
  //
  // Above grade 8, so `questionLoad`'s four numbers do not apply, which is what
  // keeps the three driven instruments legal. They are the reason this game is
  // worth playing rather than reading.
  audience: { grade: 9 },

  dayNoun: 'Level',

  id: 'qd_nucleus',
  title: 'The Atomic Nucleus',
  subtitle: 'Research Assistant · Scattering Laboratory',

  site: { kind: 'interior', name: 'The Scattering Laboratory', plan },

  // The corridor between the instrument bench and the dark room, facing down the
  // building. The level's budget is measured from here.
  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    spawn: ROSTER.length,
    extras: 6,
  },

  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it might mean, then the job.
  opening: [
    'Ten alpha particles in every ten thousand come back out of a sheet of gold the way '
    + 'they went in. On the accepted picture of the atom that is not unlikely. It is '
    + 'impossible. A cloud of positive charge spread through a whole atom cannot turn a '
    + 'particle that fast right round, and something in that gold is hitting far harder '
    + 'than any atom is supposed to be able to hit. Nobody knows how small it is. You are '
    + 'the research assistant here, which means the predicting, the counting and the '
    + 'arithmetic all pass through your hands. Ernest Rutherford, the professor who runs '
    + 'the laboratory, has given you until Thursday. Five people will spend the week '
    + 'counting flashes in the dark on the strength of the number you write down on '
    + 'Monday.',
  ],

  ending: [
    'The week closed with a distribution nobody had seen before: nine thousand nine '
    + 'hundred particles straight through, ninety turned a little, and about ten in every '
    + 'ten thousand turned right round. From the energy of one of those reversals the '
    + 'closest approach came out near three times ten to the minus fourteen metres — some '
    + 'five thousand times smaller than the atom it sits inside.',
    'What it cost: eleven hours at the eyepiece for one bin, a prediction signed on Monday '
    + 'that had to be abandoned by Tuesday afternoon, and two runs thrown away because the '
    + 'chamber was not pumped hard enough. What is unfinished, and it is not small: nothing '
    + 'here explains how an electron stays in orbit round that centre. On ordinary '
    + 'mechanics it would radiate and fall in within a fraction of a second. This week '
    + 'located the charge. It did not make the atom stable.',
    'And the argument is yours. You wrote down what the old atom allowed before the shutter '
    + 'went up, so nobody could quietly widen it afterwards. You counted the bin that took '
    + 'all night instead of the one that filled in a minute. And when the claim was written '
    + 'you kept it to two clauses, each with its own half of the data behind it — '
    + 'concentrated because of the ten, nearly empty because of the nine thousand nine '
    + 'hundred. That is what a discovery looks like from the inside.',
  ],

  history: [
    'Hans Geiger and Ernest Marsden fired alpha particles at gold leaf in Ernest '
    + 'Rutherford\'s laboratory at Manchester, beginning in 1909. Marsden was an undergraduate '
    + 'when Rutherford suggested he look for large-angle scattering, which nobody expected to '
    + 'find. Rutherford published the nuclear atom in 1911.',
    'What this game compresses: about two years of counting into one week, and several '
    + 'rooms of people into six. The counting room, the tally book and the argument over the '
    + 'vacuum are invented; the separation of counting from interpreting is not, and it is '
    + 'why the result was believed.',
    'What came next, and it is the part the ending admits: Niels Bohr\'s 1913 model kept the '
    + 'nucleus and fixed the orbits by fiat, and quantum mechanics replaced the orbits '
    + 'entirely in the 1920s.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 180,
    // A gaslit brick building. The distance down the corridor is its own gloom.
    fog: { colour: 0x8f8570, near: 28, far: 100 },
    exposure: 0.94,
    playerRadius: 0.38,
    lighting: { ambient: 0.46, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
