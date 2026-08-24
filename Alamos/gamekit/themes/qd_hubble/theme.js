// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The place is the
// engine's own interior world (`engine/world/interiorSite.js`) driven from
// plan.js, which is the cheap and checked way to bring a building.
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
  // Plain senior high rather than AP. Nine stops in one sitting for somebody who
  // has not been taught the course first, so the prose and the arithmetic sit two
  // grades below the fortnight-long games and every card teaches its method before
  // it asks anything. Still above grade 8, which keeps the driven instruments legal.
  audience: { grade: 9 },

  dayNoun: 'Level',

  id: 'qd_hubble',
  title: 'The Expanding Universe',
  subtitle: 'Observer · Mountain Observatory',

  site: { kind: 'interior', name: 'The Mountain Observatory', plan },

  start: { x: 0, z: 1, yaw: 0 },

  stopNoun: 'a room',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 6 },

  interiors: INTERIORS,
  interiorStyle: 'timber',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Every faint nebula anybody has taken a spectrum of is running away from us, and '
    + 'nobody can say why. There are years of those spectra in the room across the '
    + 'corridor and not one distance to put beside any of them, so the list has sat '
    + 'there being a list. In the plate vault there is now a way to measure how far '
    + 'away some of those nebulae are. If the two numbers turn out to be related, then '
    + 'either we are sitting at the middle of something enormous or the whole thing is '
    + 'getting bigger. You are the observer who has been given both sets, which means '
    + 'the ladder, the shifts and the plot all come through you. Edwin Hubble, who owns '
    + 'the plot, wants a line on it by Wednesday.',
  ],

  ending: [
    'The week closed with eleven nebulae on one plot: distances from the plate vault along '
    + 'the bottom, recession speeds from the spectrograph up the side, and a straight line '
    + 'through the origin at about seventy kilometres a second per megaparsec. Turned upside '
    + 'down and converted, that slope is about fourteen thousand million years — a time of the '
    + 'right size for the age of everything, out of nothing but two measurements and a unit '
    + 'conversion.',
    'What it cost: an observing season spent recalibrating the first rung of the distance '
    + 'ladder rather than on anything that felt more urgent, three stars refused, and a set of '
    + 'redshifts recomputed because three of five lines had been identified against the same '
    + 'table. What is unfinished: the slope is only as good as the ladder, the ladder is the '
    + 'worse axis by a long way, and a time worked out from today\'s speeds is not the age of '
    + 'anything if the speeds have changed. They have.',
    'And the plot holds because of you. You refused the crowded star and could say which way '
    + 'its error would have gone. You would not build a redshift on three lines that shared a '
    + 'table. You spent the season on the widest error rather than the one with the biggest '
    + 'exponent. And you wrote the last sentence as what it is — a relation that looks the '
    + 'same from every galaxy, so nothing here puts us anywhere special — with the redshifts '
    + 'credited to the decade of nights that measured them and the expanding solution to the '
    + 'paper that got there two years early.',
  ],

  history: [
    'Henrietta Leavitt found the period–luminosity relation in Cepheid variables at Harvard '
    + 'College Observatory, publishing it in 1908 and 1912; it is the rung that makes every '
    + 'distance above it possible. Vesto Slipher measured the first galaxy redshifts at '
    + 'Lowell Observatory from 1912. Edwin Hubble and Milton Humason put distance against '
    + 'velocity at Mount Wilson and published the relation in 1929.',
    'What this game compresses: three observatories and about twenty years into one '
    + 'building and one sitting. Leavitt died in 1921 and never worked alongside Hubble; '
    + 'putting them in the same corridor is the game\'s largest departure from the record.',
    'What it does not soften: Hubble\'s own distances were about a factor of seven too '
    + 'small, because there are two kinds of Cepheid and nobody knew it until 1952. The '
    + 'relation was right and the number on it was badly wrong.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    far: 180,
    // A mountain building at night, lit by desk lamps.
    fog: { colour: 0x8f8672, near: 30, far: 105 },
    exposure: 0.95,
    playerRadius: 0.38,
    lighting: { ambient: 0.48, hemi: 0.52 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
