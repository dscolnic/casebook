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

  // Three levels in the sense the source design book means: find the pattern,
  // point the machinery, and read back what actually happened. Not three working
  // days.
  dayNoun: 'Level',

  id: 'qd_crispr',
  title: "CRISPR Gene Editing",
  subtitle: 'Molecular Biologist · Genome Editing Institute',

  site: { kind: 'interior', name: 'The Genome Editing Institute', plan },

  // The corridor outside the genome room, facing down the building. The level's
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
    'Forty bacterial genomes carry the same odd structure. A short sequence is repeated '
    + 'over and over, with something different filed between every pair of copies. One of '
    + 'those filed pieces matches a virus that kills this species, exactly, over thirty '
    + 'bases. If the bacteria keep a written record of what has attacked them, something in '
    + 'the cell must be reading it. And a machine that is told what to find by a copy can '
    + 'be told to find anything. If the match is a coincidence, four benches are about to '
    + 'waste a month. You are the molecular biologist, which means the genomes, the design '
    + 'desk and the sequencing queue all come through you. Jennifer Doudna, who works on the '
    + 'structural biochemistry of the machinery, will not sign an order until the chance has '
    + 'been priced. There is '
    + 'one run on Friday, nineteen sites worth worrying about, and depth for four.',
  ],

  ending: [
    'The week closed with an alternation described rather than explained, a thirty-base match '
    + 'that chance cannot produce, a defence put in the order it has to run in, a site chosen '
    + 'for two reasons instead of one, breaks that fall three bases from the motif every time, '
    + 'and a run that came back at eighty-two per cent with one unintended deletion in it.',
    'What it cost: three of the four sequencing slots spent on places that could have come '
    + 'back either way, and fifteen candidate sites that were never read at all. What is '
    + 'unfinished: nothing here says what happens to the fifteen, nothing measures cells as '
    + 'opposed to molecules, and nothing in the run says whether this line is fit for the '
    + 'experiment somebody wants to do with it next.',
    'And you are the reason the report is honest. You priced the coincidence before anybody '
    + 'wrote the word memory down. You spent the run on the two sites whose answers were '
    + 'genuinely open rather than on three that could only have come back clean. And when the '
    + 'draft said the edit was completely specific, you held it against a measurement in the '
    + 'same run that said otherwise. That is the whole of what verifying an edit means, and it '
    + 'was your week.',
  ],

  history: [
    'Francisco Mojica identified the repeat-and-spacer arrays in archaea and bacteria through '
    + 'the 1990s and reported in 2005 that the spacers match viral sequence. Rodolphe '
    + 'Barrangou and colleagues at Danisco showed in 2007 that challenging a culture with a '
    + 'phage adds a matching spacer and confers resistance. Emmanuelle Charpentier identified '
    + 'the second RNA the system needs, and with Jennifer Doudna showed in 2012 that the '
    + 'guide and the nuclease could be programmed against a chosen sequence. Feng Zhang and '
    + 'George Church published editing in human cells in early 2013, and Virginijus Šikšnys '
    + 'reached the programmable-nuclease result independently and in parallel. Doudna and '
    + 'Charpentier shared the 2020 Nobel Prize in Chemistry.',
    'What this game compresses: three decades, several countries and at least a dozen groups '
    + 'into one floor and one sitting. The sequencing lead is invented, and so are the read '
    + 'counts and the candidate-site list.',
    'What it does not soften: the credit for this work has been argued over in public and in '
    + 'court for more than a decade, and the patent dispute between two institutions ran '
    + 'longer than the science took. Šikšnys submitted comparable results months before the '
    + '2012 paper and was rejected by two journals before publishing. And the first heritable '
    + 'human genome editing, announced in 2018, was done without adequate consent or oversight '
    + 'and was condemned by nearly everybody named above.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 180,
    // The corridor's own distance, in the building's own colour. Cool and grey:
    // this place is epoxy and painted block under fluorescent tubes, which is
    // the opposite end of the set from the distemper-and-linoleum games.
    fog: { colour: 0xb4bcc0, near: 34, far: 120 },
    exposure: 1.0,
    // A 1.4 m doorway in a 1.9 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
