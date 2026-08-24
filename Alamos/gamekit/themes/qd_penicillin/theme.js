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

  // Three levels in the sense the source design book means: notice the anomaly,
  // test the substance, find out what stands between it and a medicine. Not
  // three working days.
  dayNoun: 'Level',

  id: 'qd_penicillin',
  title: 'Penicillin',
  subtitle: 'Junior Researcher · Inoculation Department',

  site: { kind: 'interior', name: 'The Inoculation Department', plan },

  // The corridor outside the culture room, facing down the building. The level's
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
    // A small department in a narrow corridor. More than about eight and the
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
    'A plate that should have gone into the wash has a ring on it where nothing grew. '
    + 'The ring is centred on a colony of mould that blew in out of the air. If something '
    + 'is coming off that mould, an infection nobody can treat may have an answer in it. '
    + 'If the ring is a dry patch, four benches are about to waste a week. You are the '
    + 'junior researcher, which means the walk between those benches is yours and so is '
    + 'the argument at the end of it. Howard Florey, who heads the unit, will not let a '
    + 'claim stay on the trial room wall unless somebody can name the measurement under '
    + 'it. On Friday the wall is read out, and a week of everything this department can\n    '
    + 'make comes to three days of treatment for one adult.',
  ],

  ending: [
    'The week closed with a ring described rather than explained, a liquid that works with '
    + 'the mould filtered out of it, one change in four that the effect depends on, three '
    + 'species giving three different answers, a strength that halves the growth, a step '
    + 'that keeps under half of what it is given, and a wall with two claims taken off it.',
    'What it cost: four flasks of material spent on changes that turned out to do nothing, '
    + 'a plate of assay time that could have been a dose, and a week of the entire operation '
    + 'that came to twenty-four doses. What is unfinished: nobody here has treated a person, '
    + 'nothing is known about what the substance does over days rather than hours, and the '
    + 'thing that decides whether any of it reaches a ward is how much of it can be made.',
    'And you are the reason the argument held. You wrote down what the plate showed before '
    + 'anybody explained it, so nothing later had to be walked back. You changed one thing at '
    + 'a time and put it back, which is why the heat result is a cause and not a coincidence. '
    + 'And when the wall was read out you held the two claims that had signatures and no '
    + 'counts. That is the whole of what turning an accident into a medicine looks like, and '
    + 'it was your week.',
  ],

  history: [
    'Alexander Fleming noticed and investigated the antibacterial effect of a Penicillium '
    + 'mould at St Mary\'s Hospital in London in 1928–29 and published it in 1929. The work '
    + 'that turned it into a treatment was done at Oxford from 1938 by a group under Howard '
    + 'Florey, with Ernst Chain on the chemistry and Norman Heatley on the assay, the '
    + 'extraction and the production plant improvised out of hospital bedpans. Florey, Chain '
    + 'and Fleming shared the 1945 Nobel Prize.',
    'What this game compresses: two institutions and thirteen years into one department and '
    + 'one sitting. The culture room technician and the animal house keeper are invented, and '
    + 'so are the exact numbers on the assay rack.',
    'What it does not soften: the first patient treated in Oxford in 1941 improved and then '
    + 'died when the supply ran out, and the team had been recovering penicillin from his '
    + 'urine to keep the treatment going. Heatley\'s contribution was not recognised by the '
    + 'prize, which may be shared by at most three people.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 170,
    // The corridor's own distance, in the building's own colour. Not blue: this
    // place is distemper and linoleum under tungsten.
    fog: { colour: 0xbdb49c, near: 30, far: 105 },
    exposure: 0.98,
    // A 1.4 m doorway in a 1.75 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.5, hemi: 0.55 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
