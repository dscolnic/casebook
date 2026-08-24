// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The place is
// themes/bring_them_home's, copied rather than imported — this is NOT an
// edition, because the course, the cast, the areas and the length are all
// different, and `edition-of:` would put editionParity in front of every one of
// those changes. What was reskinned is the palette, the boards, the console
// groups and everything printed on a wall; the geometry is untouched, so the
// copied props and world still line up with the copied site.
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
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

  // Three levels, in the sense the source design book means: establish the
  // tool, meet the anomaly, make the claim. Not three working days.
  dayNoun: 'Level',

  id: 'qd_accel',
  title: 'The Accelerating Universe',
  subtitle: 'Analyst · High-Redshift Supernova Team',

  site,
  start: site.spawn,

  // Two of the four areas are a console on the floor and two are a room off the
  // ring corridor, so neither "a console" nor "a room" is true of all four.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: {
    OUTFITS,
    roleToOutfit,
    // spawn must be >= ROSTER.length, or characters past the limit never appear
    // and any mission stop naming them is unreachable. Validated.
    spawn: ROSTER.length,
    // Indoors, and a small team. Enough that the floor is not empty and few
    // enough that every figure is worth checking the face of.
    extras: 7,
  },

  // No `interiors`. That block builds a room to walk into in a district four
  // kilometres away, which is what an outdoor game needs when a door opens.
  // This whole game is one building: the consoles are the workplace and the two
  // rooms are off the corridor behind it.
  interiorStyle: 'lab',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Forty-two exploding stars have come back fainter than they are allowed to be. Fainter '
    + 'means further away, and further away than a universe made of matter can put them, '
    + 'because matter pulls and a universe of matter has to be slowing down. If the '
    + 'measurement holds, something nobody has ever detected is pushing the universe apart '
    + 'faster and faster. If it does not hold, it is dust, or a calibration error, or a '
    + 'ruler somebody built wrong. You are the analyst on the team, which means the ruler is '
    + 'yours to build and yours to defend. Brian Schmidt, who runs the programme, unseals the '
    + 'sample on Wednesday, and three days later somebody has to stand up and say which of '
    + 'those it was.',
  ],

  ending: [
    'The campaign closed with forty-two standardised supernovae on one diagram and a mean '
    + 'residual about a quarter of a magnitude on the faint side, holding across the whole '
    + 'redshift range. The dust test looked for a colour signature and did not find one. '
    + 'The flat model with a repulsive term tracked the points; the matter-only universe '
    + 'missed them by most.',
    'What it cost: eleven weeks with the cosmology sealed while the calibration was argued '
    + 'over, and a paper that says less than the room believes. What is unfinished: one '
    + 'systematic checked is not all of them, and the size of the effect will move as the '
    + 'sample grows.',
    'And you built the ruler the whole thing rests on. You wrote down what gravity alone '
    + 'predicted before you were allowed to look, you went after the ordinary explanation '
    + 'before the strange one, and you stopped the sentence where the measurement stopped. '
    + 'The expansion is speeding up, and you are the reason anybody in that room could say '
    + 'so.',
  ],

  history: [
    'Two teams found the acceleration independently and announced within months of each '
    + 'other in 1998. The High-z Supernova Search Team — Brian Schmidt, Adam Riess, Alex '
    + 'Filippenko, Nicholas Suntzeff, Robert Kirshner and others — published first; the '
    + 'Supernova Cosmology Project under Saul Perlmutter published a larger sample in 1999. '
    + 'Perlmutter, Schmidt and Riess shared the 2011 Nobel Prize.',
    'What this game compresses: two competing collaborations into one team, and years of '
    + 'observing into one sitting. The publication editor and the photometry analyst are '
    + 'invented.',
    'What it does not soften: neither team wanted this answer, both spent most of their '
    + 'effort trying to kill it with dust, and what causes the acceleration is still unknown.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 220,
    // Warm rather than blue: the fog is the room's own darkness at the far wall,
    // and this room is lit by desk lamps over olive grey.
    fog: { colour: 0x14110c, near: 26, far: 88 },
    exposure: 1.0,
    playerRadius: 0.38,
    // Six real lights is the ceiling. Three here, and every bright surface in
    // the room is emissive.
    lighting: { ambient: 0.42, hemi: 0.5, key: 0.85 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
