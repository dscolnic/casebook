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

  // Three levels in the sense the source design book means: meet the effect,
  // find out what a question adds, and advise the people who do the asking. Not
  // three working days.
  //
  // The player experiences the effect before it is named, which is the source
  // book's rule for a psychology game — the first level is a word list and a
  // recognition test, and the explanation arrives afterwards.
  dayNoun: 'Level',

  id: 'qd_memory',
  title: 'False Memories',
  subtitle: 'Research Assistant · Memory and Testimony Unit',

  site: { kind: 'interior', name: 'The Memory and Testimony Unit', plan },

  // Between the two open bays at the near end, facing down the building. The
  // level's budget is measured from here rather than from wherever the player is
  // standing.
  start: { x: 0, z: -6, yaw: 0 },

  // Two of the four are bays open to the corridor rather than rooms with doors,
  // which is deliberate — a study room somebody is led into is a room they can
  // prepare for.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // A small unit, and a quiet one — participants are not supposed to meet each
    // other. More than about eight and the corridor stops being a way through.
    extras: 5,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Read someone a list of fifteen words. Every word on it points at a sixteenth word. Leave that '
    + 'one out. More than half the room will tell you they heard it. They are not guessing. They are '
    + 'not lying. It felt just like the words that were really said. So a memory can be built out of '
    + 'meaning alone. If that is true, then every account of anything is partly built rather than '
    + 'played back. What you ask a witness would matter as much as what they saw. Or it may be a trick '
    + 'that only works on word lists. Then nothing here reaches past the lab. You are the research '
    + 'assistant here. The lists, the interviews and the transcripts all come through you. Two hundred '
    + 'people are booked in this week. One clause of one question will be different between them. On '
    + 'Friday, nine officers arrive wanting to know what to change.',
  ],

  ending: [
    'The week closed with a word claimed by fifty-four people in a hundred that nobody read '
    + 'out, a feeling of recognition that arrived with no record of where it came from, a yield '
    + 'sign that one clause of one question put into twenty-nine more accounts per hundred a '
    + 'week later, confidence that ran highest exactly where the report was wrong, and an interview '
    + 'method that supplies less than it collects.',
    'What it cost: a hundred people asked a question with something untrue in it, all of them '
    + 'told afterwards, and a whole study spent on the one change to the interview whose '
    + 'result could have come out either way. What is unfinished: nothing here says which '
    + 'account in a pile is the contaminated one. Everything established is about a hundred '
    + 'people against another hundred, and the distance between that and a single witness is '
    + 'the whole of what makes this difficult outside a laboratory.',
    'And you are the reason the advice is worth having. You counted the lures against a rate '
    + 'that was forecast before anybody arrived, so the finding was a mechanism rather than a '
    + 'surprise. You wrote the figure down before the recall interviews, so the result could '
    + 'have been nothing. And when the team asked what to change, you bought the one proposal '
    + 'that acts on what the interview puts in rather than on how hard the witness is trying. '
    + 'That is what it means to say memory is reconstructed, and it was your week.',
  ],

  history: [
    'Elizabeth Loftus established through the 1970s that information supplied after an event '
    + 'changes what people later report of it, including in studies where the wording of a '
    + 'single question introduced a detail that was never present. Henry Roediger and Kathleen '
    + 'McDermott published in 1995 the word-list procedure that reliably produces false '
    + 'recognition of an unpresented associate, building on a much older observation by James '
    + 'Deese. Marcia Johnson and colleagues developed the source-monitoring framework, which '
    + 'describes the failure as content held with its origin misattributed rather than as a '
    + 'memory invented from nothing.',
    'What this game compresses: three separate lines of work and about twenty-five years into '
    + 'one unit and one sitting. The data manager and the interview trainer are invented, and '
    + 'so are the exact counts, though the rates are close to published ones.',
    'What it does not soften: this work has been used in court, and being used in court is what '
    + 'has made it contested. Loftus has testified in a great many cases and has been attacked '
    + 'for it from several directions, including by people who say the research has been used '
    + 'to discredit accounts that were true. The findings are about groups, and the distance '
    + 'between a group difference and a judgement about one person is not a technicality.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 165,
    // The corridor's own distance, in the building's own colour: grey-blue walls
    // over blue carpet tile under fluorescent tubes. Deliberately the blandest
    // palette in this set, because the subject is that nothing about the room
    // should be memorable.
    fog: { colour: 0xa8aeb4, near: 26, far: 92 },
    exposure: 1.0,
    // A 1.4 m doorway in a 1.8 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.52, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
