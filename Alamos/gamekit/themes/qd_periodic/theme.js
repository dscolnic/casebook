// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The place is the
// engine's own interior world (`engine/world/interiorSite.js`) driven from
// plan.js, which is the cheap and checked way to bring a building — `placement`
// can fire rays at it, `pieceDensity` can count it, and every fixture goes up
// through `interiorKit`. What makes it this building rather than a generic
// corridor is plan.js's room list and props.js's wall text.
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
  // and the arithmetic sit two grades below where the fortnight-long games do —
  // and every card teaches its method before it asks anything.
  audience: { grade: 9 },

  // Three levels in the sense the source design book means: sort the elements,
  // leave the gaps, and test the table against something nobody had. Not three
  // working days.
  dayNoun: 'Level',

  id: 'qd_periodic',
  title: 'Periodic Table',
  subtitle: 'Assistant · The Chemistry Institute',

  site: { kind: 'interior', name: 'The Chemistry Institute', plan },

  // The corridor outside the specimen store, facing down the building. The level's
  // budget is measured from here rather than from wherever the player is standing.
  start: { x: 0, z: 2, yaw: 0 },

  // Four rooms off one corridor, so "a room" is true of all four.
  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // A small institute in a narrow corridor. More than about eight and the
    // corridor stops being a way through.
    extras: 6,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Sixty-three elements sit in numbered drawers, and the numbers record when each one '
    + 'arrived. Nobody can say why lithium, sodium and potassium behave alike when their '
    + 'weights are nothing like each other. If the elements can be laid out so that '
    + 'behaviour keeps coming round, then something underneath is doing it, and the '
    + 'arrangement could say what belongs in a place nobody has filled. If they cannot, '
    + 'chemistry stays a list to be memorised. You are the assistant, which means the '
    + 'drawers, the long table and the bench all come through you. Dmitri Mendeleev, the '
    + 'professor here, will not push a card into a hole to make the table look finished. '
    + 'The proceedings go to press on Friday, and what goes in them is either a set of '
    + 'figures for elements nobody has or nothing at all.',
  ],

  ending: [
    'The week closed with a family defined by what its members do, a property that came round '
    + 'every eighth place along the run, a pair of cards placed by their chemistry with the '
    + 'mismatch left visible, three holes carrying figures rather than nothing, a metal that '
    + 'arrived by post five years later and matched all three, and an ordering nobody in the '
    + 'building could have weighed.',
    'What it cost: a week of the institute\'s only press slot spent on predictions about '
    + 'elements that did not exist, a public argument with a visiting professor who had '
    + 'reached the same arrangement and would not print figures, and three grams of the world '
    + 'supply of a new metal spent on measuring it three ways. What is unfinished: nothing '
    + 'here explains why the pattern exists. An arrangement that works and an account of why '
    + 'it works are two different things, and the second is fifty years away.',
    'And you are the reason it counts as a test. You built the families out of behaviour '
    + 'rather than out of the order the drawers happened to be in. You left the holes empty '
    + 'and put numbers in them, which is the uncomfortable move and the only one that could '
    + 'have failed. And when the sample came you said how far out the prediction was instead '
    + 'of calling it close. That is what makes an arrangement a claim about the world, and it '
    + 'was your week.',
  ],

  history: [
    'Dmitri Mendeleev published his periodic arrangement in 1869, ordered by atomic weight and '
    + 'chemical behaviour, with gaps left for undiscovered elements and predicted properties '
    + 'printed for three of them. Julius Lothar Meyer reached a closely related arrangement '
    + 'independently and published his atomic-volume curve in 1870. Paul-Émile Lecoq de '
    + 'Boisbaudran discovered gallium spectroscopically in 1875 without setting out to find a '
    + 'predicted element, and its measured properties were close to Mendeleev\'s figures for '
    + 'the gap below aluminium. Henry Moseley established in 1913 that the elements are '
    + 'ordered by nuclear charge rather than by atomic weight, which resolved the tellurium '
    + 'and iodine anomaly.',
    'What this game compresses: four decades, three countries and two separate lines of work '
    + 'into one institute and one sitting. The specimen curator and the analytical assistant '
    + 'are invented, and Moseley\'s instrument is wheeled into a lecture hall it reached '
    + 'forty-four years later.',
    'What it does not soften: several people were arranging the elements at the same time and '
    + 'the credit is not one person\'s. Mendeleev also predicted elements that do not exist, '
    + 'placed some cards wrongly, and rejected the discovery of the noble gases for years '
    + 'because they fitted nowhere. Moseley was killed at Gallipoli in 1915, aged twenty-seven.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 180,
    // The corridor's own distance, in the building's own colour: dark green
    // distemper over parquet, lit by tall windows. Warmer and greener than the
    // pneumatic laboratory and a good deal darker than the modern floor.
    fog: { colour: 0xa9ad94, near: 28, far: 100 },
    exposure: 0.95,
    // A 1.4 m doorway in a 1.9 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.46, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
