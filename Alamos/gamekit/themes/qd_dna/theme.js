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
  //
  // Still above grade 8, which is what keeps the driven instruments legal:
  // `questionLoad`'s judgement budget would allow about two of them in a
  // nine-stop campaign, and they are the reason this is worth playing rather
  // than reading.
  audience: { grade: 9 },

  // Three levels, in the sense the source design book means: establish what the
  // accepted tools already forbid, meet the crucial evidence, make the claim.
  // Not three working days.
  dayNoun: 'Level',

  id: 'qd_dna',
  title: 'The Double Helix',
  subtitle: 'Research Student · Structural Biology Unit',

  site: { kind: 'interior', name: 'The Structural Biology Unit', plan },

  // The corridor outside the chemistry bench, facing down the building. The day's
  // budget is measured from here rather than from wherever the player is standing.
  start: { x: 0, z: 2, yaw: 0 },

  // Four rooms off one corridor, so "a room" is true of all four — unlike the
  // supernova floor, where two of the areas are a console on an open floor.
  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // A small unit in a narrow corridor. More than about eight and the corridor
    // stops being a way through.
    extras: 6,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Every living thing carries instructions for building a copy of itself, and nobody in '
    + 'the world knows what those instructions are made of. Four benches in this building '
    + 'have each measured something true about the same substance, and not one of the four '
    + 'can say what shape it is. Get the shape right and you may be able to see how the '
    + 'copying works — get it wrong and three plausible structures go on standing. You are '
    + 'the research student, which means the walk between those benches is yours and so is '
    + 'the argument at the end of it. John Randall, who runs the unit, will not let a '
    + 'candidate off the evidence wall unless somebody names the clue it breaks, and on '
    + 'Friday one of them gets defended in print.',
  ],

  ending: [
    'The week closed with seven clues on the wall and one candidate under them: two chains, '
    + 'the backbones outside where the water is, complementary rungs of a two-ring base with '
    + 'a one-ring base, and the two strands running opposite ways. Three candidates came down, '
    + 'each named by the measurement that excluded it.',
    'What it cost: eleven hours of camera time for one plate, three days of bench time spent '
    + 'on a titration that only had to answer one question, and a composition sheet run twice '
    + 'when once would have looked sufficient. What is unfinished: nothing here says how the '
    + 'molecule is copied, or read, or how any of it is controlled. The structure suggests a '
    + 'mechanism. Suggesting is not showing.',
    'And you are the reason the argument held. You wrote down what chemistry forbade before '
    + 'the photograph existed, so nobody could bend it afterwards. You took two lengths off a '
    + 'plate and stopped there rather than letting the plate say more than it knew. And when '
    + 'the near miss came round — the one that reproduces every number on the composition '
    + 'sheet — you found the rung it could not close. That is the whole of what a structure '
    + 'being right means, and it was your week.',
  ],

  history: [
    'Rosalind Franklin and Raymond Gosling took the X-ray diffraction photographs of DNA at '
    + 'King\'s College London in 1951–52, including the image known as Photo 51. Erwin '
    + 'Chargaff had established at Columbia that adenine matches thymine and guanine matches '
    + 'cytosine. Francis Crick and James Watson built the double helix at Cambridge and '
    + 'published it in 1953. John Randall directed the King\'s unit; Maurice Wilkins led its '
    + 'X-ray work and shared the 1962 Nobel Prize with Crick and Watson.',
    'What this game compresses: two institutions and two years into one unit and one '
    + 'sitting. The analytical chemist is invented.',
    'What it does not soften: Franklin\'s data reached Cambridge without her knowledge or '
    + 'consent, and the 1953 paper acknowledged it only in a sentence. She died in 1958, four '
    + 'years before the prize, which is not awarded posthumously.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 170,
    // The corridor's own distance, in the building's own colour. Not blue: this
    // place is distemper and linoleum under tungsten.
    fog: { colour: 0xb9b09c, near: 30, far: 105 },
    exposure: 0.98,
    // A 1.4 m doorway in a 1.7 m half-width corridor. 0.38 passes it without the
    // player catching on the frames.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
