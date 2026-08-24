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

  // Three levels in the sense the source design book means: build the bank,
  // watch it fail on a day when nothing about it changed, and decide which
  // problem it actually has. Not three working days.
  //
  // The player manipulates a toy balance sheet and then states a conditional
  // insight, which is the source book's rule for an economics game.
  dayNoun: 'Level',

  id: 'qd_bankrun',
  title: 'Bank Runs',
  subtitle: 'Junior Clerk · Marrable House',

  // `site.kind` is still 'interior' — but plan.js declares a world of its own,
  // because four floors stacked on one footprint is
  // `engine/world/interiorTower.js` and not something the one-floor builder can
  // do. See the note at the top of plan.js about the literal.
  site: { kind: 'interior', name: 'Marrable House', plan },

  // The corridor of the counter floor, outside the lift, facing down the plate.
  // The level's budget is measured from here rather than from wherever the
  // player is standing — and in a tower it has a lift ride in it, which is what
  // `world.floorRise()` prices into every world-graded format.
  start: { x: 0, z: 6.5, yaw: 0 },

  // Four rooms on four different floors, so a stop is somewhere you take the
  // lift to rather than somewhere down the corridor.
  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // A bank on a busy day, spread over four floors, so a few more than the
    // corridor games — but only ever a quarter of them on the floor the player
    // is standing on, which `crowd.js` handles through `ctx.activeLevel`.
    extras: 8,
  },

  // What is in each room the player walks into: the case stand's caption and the
  // one live screen. The rooms themselves are the world here rather than a
  // separate interior district, because this whole game is one building.
  interiors: INTERIORS,
  interiorStyle: 'timber',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'There is a queue on the pavement below the window. Nothing about this bank has changed since '
    + 'yesterday. The loans are good. The borrowers are paying. The book covers the deposits. But there '
    + 'are ten units of cash in the building, and thirty-two have been asked for by noon. Can a sound '
    + 'bank be closed by the order that people arrive in? If it can, the thing that fails is the '
    + 'arrangement rather than the bank. Being careful does not stop it. You are the junior clerk. The '
    + 'counter, the loan book, the reserve and the crisis desk all come through you. The lift is the '
    + 'only way between them. Four thousand people hold the deposits, and the queue has turned into '
    + 'Cathcart Row.',
  ],

  ending: [
    'The day closed with ten units of owners\' stake read off a sheet, a mismatch that turned '
    + 'out to be the business rather than a mistake, a bank sound in value and unable to pay by '
    + 'noon, a forced sale that raised fourteen and cost six, a queue nobody in it was wrong to '
    + 'join, a guarantee that took tomorrow\'s withdrawals down to an ordinary Wednesday, and '
    + 'four banks of which one was not like the others.',
    'What it cost: six units of the owners\' stake, gone in an afternoon to raise cash that '
    + 'the loans would have returned in full if anybody could have waited. And a fifth of the '
    + 'facility held back for a bank that had not been asked yet, which is money not lent to '
    + 'somebody who wanted it today. What is unfinished: the classification was made from '
    + 'valuations a month old under an afternoon of time pressure, and nothing about that gets '
    + 'better with practice. Being wrong closes a sound bank in one direction and lends into a '
    + 'hole in the other.',
    'And you are the reason the desk decided anything. You read both sides of the sheet before '
    + 'anybody argued about the pavement. You reported what the sale raised rather than what '
    + 'the book was worth, which is the six units nobody would otherwise have seen going. And '
    + 'when the wire had four banks on it you said which one was a different problem, out loud, '
    + 'with the queue still visible from the window. That is what diagnosing before rescuing '
    + 'means, and it was your day.',
  ],

  history: [
    'The American banking panics of 1930 to 1933 closed thousands of banks, many of them '
    + 'solvent, and ended in a national bank holiday in March 1933. William Woodin was '
    + 'Treasury Secretary through it. Carter Glass and Henry Steagall carried the Banking Act '
    + 'of 1933, which created federal deposit insurance over Glass\'s own objections. Marriner '
    + 'Eccles had run banks through runs in Utah without losing one and became chairman of the '
    + 'Federal Reserve the following year. Walter Bagehot had set out the lender-of-last-resort '
    + 'doctrine — lend freely, against good security, at a penalty rate — in 1873, and it was '
    + 'not followed.',
    'What this game compresses: several years and a whole banking system into one building and '
    + 'one afternoon. The chief cashier, the loan book manager and the head of the reserve are '
    + 'invented, and so are the four banks on the wire and every figure on the sheet.',
    'What it does not soften: Glass was right that a guarantee weakens the reason to be '
    + 'careful, and he lost the argument because the alternative that week was worse. The '
    + 'formal model of why a run is rational came fifty years later, from Douglas Diamond and '
    + 'Philip Dybvig in 1983, and it has two outcomes rather than one — the same bank can be '
    + 'fine or ruined depending only on what depositors expect of each other.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Indoors, and the longest sight line is out of a window at a city two
    // kilometres away. An interior's 170 would clip the sky dome and the far
    // ranks and leave a black band across the bottom of every window, which
    // reads as a rendering fault and is a camera setting.
    far: 3200,
    // The corridor's own distance, in the building's own colour: panelling and
    // cream distemper under pendant fittings. Short, because a floor plate is
    // twenty-four metres and the fog's job here is the street rather than the
    // corridor.
    fog: { colour: 0xb0a68c, near: 22, far: 80 },
    exposure: 0.96,
    // A 1.4 m doorway in a 2.3 m half-width corridor.
    playerRadius: 0.38,
    // Six real lights is the ceiling. Two here; every bright surface is emissive.
    lighting: { ambient: 0.48, hemi: 0.52 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
