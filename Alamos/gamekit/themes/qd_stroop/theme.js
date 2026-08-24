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

  // Three levels in the sense the source design book means: establish the
  // baseline, create the conflict, and say what the slowdown does and does not
  // show. Not three working days.
  //
  // The player is a participant before they are an analyst, which is the source
  // book's rule for a psychology game: experience the effect, then be handed the
  // job of explaining it.
  dayNoun: 'Level',

  id: 'qd_stroop',
  title: 'Stroop Effect',
  subtitle: 'Research Assistant · Reaction-Time Laboratory',

  site: { kind: 'interior', name: 'The Reaction-Time Laboratory', plan },

  // The corridor outside the testing booth, facing down the building. The level's
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
    // A small department in a narrow corridor, and a quiet one — somebody is
    // always being timed. More than about eight and the corridor stops being a
    // way through.
    extras: 5,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Print the word GREEN in red ink, ask somebody to say the colour of the ink, and they '
    + 'stumble. They know the answer. They can see it. Something arrives first and will not '
    + 'be set aside, and no amount of trying harder makes it go away. If a process this '
    + 'well drilled runs whether or not anybody wants it, then a great deal of what people '
    + 'call attention is a race between answers rather than a choice between them. If the '
    + 'stumble is nothing but a fiddly card, four blocks and a week of tabulation are wasted. '
    + 'You are the research assistant, which means the booth, the instrument and the sheets '
    + 'all come through you. John Ridley Stroop, the research student running this, will not '
    + 'let a raw time out of the building. Forty-two people are booked this week and each '
    + 'session produces two numbers.',
  ],

  ending: [
    'The week closed with two plain baselines, a figure written down before the hard block '
    + 'was run, a difference of three hundred and twenty milliseconds, a participant who '
    + 'bought speed with nineteen mistakes, a cost that fell by a third under practice and '
    + 'stayed, and a wall of eight hundred times that four accounts of the effect all fit '
    + 'equally well.',
    'What it cost: two blocks of a session spent on plain cards that surprised nobody, a week '
    + 'of daily practice runs to establish that the effect shrinks rather than vanishes, and a '
    + 'whole study spent on the one suggestion whose result could have gone either way. What '
    + 'is unfinished: nothing here says why it happens. Four accounts are on the wall and the '
    + 'times cannot separate them, and separating them is a different programme of work.',
    'And you are the reason the numbers mean anything. You ran the plain blocks first, so the '
    + 'difference was a difference rather than a time. You wrote the prediction down before '
    + 'the deck was loaded, so the result could have surprised you. And when the wall was read '
    + 'out you said what it did not show, with four explanations pinned up beside it. That is '
    + 'what a measurement being solid actually amounts to, and it was your week.',
  ],

  history: [
    'John Ridley Stroop published the colour-word interference experiment in 1935 as part of '
    + 'his doctoral work at George Peabody College in Nashville. The two halves it rests on '
    + 'were older: James McKeen Cattell had shown in 1886 that people read words faster than '
    + 'they name colours, and several researchers had noticed interference between the two '
    + 'before Stroop put them into direct conflict and measured the difference. The paper is '
    + 'among the most reproduced results in psychology.',
    'What this game compresses: fifty years and two continents into one laboratory and one '
    + 'sitting, with Cattell present as a visitor. The testing coordinator, the chronoscope '
    + 'operator, the tabulator and the booth assistant are invented, and so are the exact '
    + 'medians, though they are close to the published ones.',
    'What it does not soften: the effect is robust and its explanation is not settled. Its '
    + 'size depends on language, on how the response is made, on practice and on the person, '
    + 'and several accounts predict the same slowdown. Stroop himself published almost nothing '
    + 'further in psychology and left the field for religious teaching; the paper that carries '
    + 'his name was nearly the whole of his research career.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 175,
    // The corridor's own distance, in the building's own colour: buff distemper
    // over brown linoleum under green glass shades. Warmer and dimmer than the
    // modern floors in this set and cooler than the Georgian one.
    fog: { colour: 0xb7ad91, near: 28, far: 100 },
    exposure: 0.95,
    // A 1.4 m doorway in an 1.85 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.46, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
