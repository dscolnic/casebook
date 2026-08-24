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

  // Three levels in the sense the source design book means: trace the spiral,
  // sum the rounds, and size a response that names its own conditions. Not three
  // working days.
  //
  // The player drives a toy model and then states a conditional insight, which
  // is the source book's rule for an economics game: manipulate the thing, then
  // say what has to be true for the conclusion to hold.
  dayNoun: 'Level',

  id: 'qd_keynes',
  title: 'Keynes and the Great Depression',
  subtitle: 'Junior Economist · Economic Advisory Building',

  site: { kind: 'interior', name: 'The Economic Advisory Building', plan },

  // The corridor outside the flow room, facing down the building. The level's
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
    // A small department in a wide corridor, and the flow room is open to it, so
    // a few more people can stand about without the corridor stopping being a
    // way through.
    extras: 7,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'A fifth of the country is out of work, and it is staying that way. Factories stand still. People '
    + 'want jobs. Yet prices have barely moved. That is the wrong way round. When there is too much of '
    + 'something, it is meant to get cheaper until it sells. So why has that not happened here? Maybe '
    + 'an economy can settle in a bad place and stay there. If it can, then something is holding it '
    + 'there, and something could shift it. If it mends itself, this whole building is wasting paper. '
    + 'You are the junior economist here. The board, the returns and the sums all come through you. '
    + 'John Maynard Keynes, the economic adviser, wants a fall traced arrow by arrow before anybody '
    + 'argues about prices. The report goes out on Friday. Two million people are out of work while it '
    + 'is being written.',
  ],

  ending: [
    'The week closed with a fall of a hundred that had become fifty-six by its second round, '
    + 'a capacity figure of sixty-one per cent that decides which way any demand comes out, a '
    + 'set of rounds whose rule was named rather than guessed, a multiplier of four in the '
    + 'closed model and two point two once tax and imports were priced in, an injection of '
    + 'seventy-three units, and a course that still holds at the end of the range nobody '
    + 'measured.',
    'What it cost: two days of a clerk\'s week spent making returns comparable rather than '
    + 'producing any new number, and a tidy multiplier of four abandoned in favour of a '
    + 'smaller one that is harder to argue for. What is unfinished: nothing here measured how '
    + 'long a measure takes to arrive. Deciding, legislating and spending is eighteen months '
    + 'in anybody\'s experience and none of it is on the returns, so the timing on the file is '
    + 'a guess sitting beside three measurements.',
    'And you are the reason the recommendation can be defended. You worked the second round '
    + 'before anybody argued about prices, so the spiral was a mechanism rather than a mood. '
    + 'You sized the injection against the honest multiplier instead of the tidy one, which is '
    + 'the difference between seventy-three units and forty. And you held the sentence that '
    + 'said "always". That is what a conditional claim is for, and it was your week.',
  ],

  history: [
    'John Maynard Keynes published The General Theory of Employment, Interest and Money in '
    + '1936, after years of argument during the slump about whether an economy could settle '
    + 'with large-scale unemployment. Richard Kahn had set out the multiplier in 1931, which '
    + 'gave the argument its arithmetic. Joan Robinson was part of the Cambridge group that '
    + 'worked through the book in draft and went on to extend and criticise it for decades. '
    + 'Colin Clark did much of the early work on measuring national income, without which none '
    + 'of the quantities in this game could have been put on a returns sheet at all.',
    'What this game compresses: about six years of argument across several institutions into '
    + 'one building and one sitting. The statistical clerk and the desk secretary are invented, '
    + 'and so are the exact figures, though the shape of them is right for the period.',
    'What it does not soften: the argument was not settled then and is not settled now. '
    + 'Estimates of the multiplier differ widely and depend on the state of the economy, on '
    + 'monetary policy and on what the money is spent on. The lags are real and are the part '
    + 'least amenable to analysis. And the version of this that circulates as a slogan — that '
    + 'public spending always raises output — is one Keynes did not hold and Robinson spent '
    + 'years objecting to.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 180,
    // The corridor's own distance, in the building's own colour: dark green
    // paint to shoulder height, buff above it, brown linoleum under pendant
    // fittings. A government building of the period, and darker than a modern one.
    fog: { colour: 0xb6ad93, near: 30, far: 106 },
    exposure: 0.95,
    // A 1.4 m doorway in a 2.0 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.46, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
