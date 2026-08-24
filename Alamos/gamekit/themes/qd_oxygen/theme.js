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

  // Three levels in the sense the source design book means: weigh before and
  // after, find out which part of the air is doing it, and close the ledger. Not
  // three working days.
  dayNoun: 'Level',

  id: 'qd_oxygen',
  title: 'Oxygen and Combustion',
  subtitle: 'Assistant · The Pneumatic Laboratory',

  site: { kind: 'interior', name: 'The Pneumatic Laboratory', plan },

  // The corridor outside the balance room, facing down the building. The level's
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
    // A small laboratory in a narrow corridor. More than about eight and the
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
    'Ten grams of lead were heated in the open this morning and what is left weighs twelve '
    + 'point seven. Burning is supposed to be a losing: the light goes, the smoke goes, and '
    + 'a crumbly powder is what remains. If the powder is heavier than the metal was, then '
    + 'something joined it while it burnt, and every account of fire anybody holds has to be '
    + 'rewritten. If the balance is wrong, four benches are about to waste a season. You are '
    + 'the assistant, which means the weighings, the jars and the ledger all come through '
    + 'you. Antoine Lavoisier, who runs the laboratory, will not enter a figure he cannot '
    + 'account for. The academy funds one more experiment next week, and six people here '
    + 'disagree about what it should be.',
  ],

  ending: [
    'The week closed with a product heavier by two point seven grams, a sealed apparatus that '
    + 'weighed exactly what it had before, a jar in which a dying splint came back to life, a '
    + 'fifth of the air gone and none of the rest of it able to burn, a mouse and a candle '
    + 'doing the same chemistry at different speeds, and a column with nothing left over in it.',
    'What it cost: an afternoon waiting for a sealed vessel to cool before it could be '
    + 'weighed, a whole week of the academy\'s money spent on the one experiment that could '
    + 'have destroyed the argument, and three careful proposals turned down for being certain '
    + 'to succeed. What is unfinished: nobody here has named the gas or said what it is made '
    + 'of, nothing says why the residue will not burn, and the general rule reached at the end '
    + 'is wider than anything measured in this building.',
    'And you are the reason the account holds. You put the expected figure beside the measured '
    + 'one before the run rather than after it, so the agreement was a test. You entered the '
    + 'term that was recorded in another room, which is the one nothing on this desk would have '
    + 'missed. And you spent the week on the experiment that could still have taken the whole '
    + 'thing away. That is what closing a ledger actually means, and it was your week.',
  ],

  history: [
    'Carl Wilhelm Scheele prepared oxygen in Uppsala around 1771–72 and wrote it up before '
    + 'anybody else; his book did not appear until 1777. Joseph Priestley prepared it '
    + 'independently in England in 1774 by heating the red calx of mercury, described what it '
    + 'did to a flame and to a mouse, and went on reading his results inside the older '
    + 'framework for the rest of his life. Antoine Lavoisier supplied the oxygen-based account '
    + 'of combustion and the quantitative method that made it stick, working with Marie-Anne '
    + 'Paulze Lavoisier, who recorded the experiments, drew the apparatus and translated the '
    + 'English work the laboratory depended on.',
    'What this game compresses: three countries and about fifteen years into one laboratory '
    + 'and one sitting. The balance maker and the furnace assistant are invented, and the clean '
    + 'twenty-one per cent is a teaching number rather than a figure anybody measured that '
    + 'easily.',
    'What it does not soften: no one person discovered oxygen, and saying so flattens a '
    + 'genuinely contested history. Priestley\'s house and laboratory were destroyed by a mob '
    + 'in 1791 and he left England for good. Lavoisier was guillotined in 1794. And Marie-Anne '
    + 'Paulze Lavoisier, who could not hold a position of her own, gathered and published the '
    + 'memoirs afterwards under his name.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is the fifty-metre corridor.
    far: 180,
    // The corridor's own distance, in the building's own colour: limewash and
    // stone flags by daylight, which is warmer and dimmer than anything else in
    // this set. There is no electric light in this building and it should not
    // look as though there is.
    fog: { colour: 0xc0b79f, near: 26, far: 96 },
    exposure: 0.94,
    // A 1.4 m doorway in a 2.0 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.46, hemi: 0.5 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
