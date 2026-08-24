// theme.js — the manifest. This is the only file the engine reads directly.
//
// A Quick Discovery: three levels, nine stops, one sitting. The first of them
// outdoors — the place is `engine/world/outdoorTown.js` driven from site.js, and
// the rooms behind the hut doors are built lazily in the interior district four
// kilometres away from the `interiors` block.
import { site } from './site.js';
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

  id: 'qd_eclipse',
  title: 'The Bending of Starlight',
  subtitle: 'Expedition Astronomer · Eclipse Camp',

  site,
  start: site.spawn,

  // Four huts and a tent on a plain, so "a hut" is nearly true and "a room" is
  // not. The camera field is not a room at all.
  stopNoun: 'a place',

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY, WARMUPS },

  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 8 },

  interiors: INTERIORS,
  interiorStyle: 'timber',

  // ONE paragraph. The mystery first, then what it would mean, then the job.
  opening: [
    'Two theories disagree about starlight by a factor of two, and one of them says '
    + 'space itself is bent. Nobody has ever been able to tell them apart, because the '
    + 'only place a ray passes close enough to the Sun to be measurably deflected is '
    + 'the one place the Sun is far too bright to photograph. For about five minutes '
    + 'next month the Moon fixes that. You are the expedition astronomer, which means '
    + 'the focus, the plates and the arithmetic are yours, and so is the sentence at '
    + 'the end. Arthur Eddington, the chief observer, has one mount, two lenses and no '
    + 'second attempt, and the shift you are looking for is about a third of the width '
    + 'of a hair on the finished glass.',
  ],

  ending: [
    'The camp closed with two plate sets, one of them soft, and a combined shift near one '
    + 'and seven tenths of an arcsecond. The arrows pointed outward from the Sun and the '
    + 'stars nearest the edge showed the longest ones. The band on the result separates the '
    + 'two predictions and sits on the larger of them, which is the one that says gravity '
    + 'bends space rather than merely pulling on light.',
    'What it cost: two days of the plate hut spent on the plate scale rather than on '
    + 'anything that felt more urgent, a whole set given a quarter of the weight it looked '
    + 'like it deserved, and a cable that says less than the camp believes. What is '
    + 'unfinished, and it is nearly everything: this is one difficult measurement on one '
    + 'plain. Radio observations, radar timing, lensing and pulsar timing are what actually '
    + 'settled light bending, and every one of them is decades away.',
    'And the sentence is yours. You worked out how small the angle was before anybody '
    + 'ordered a lens for it. You spent the plate-hut days on the widest error rather than '
    + 'the one with the biggest exponent. You gave the soft set the weight its own error bar '
    + 'earned it and not a word more, and you found out how wide the band would have to be '
    + 'before the whole expedition stopped deciding anything. Favoured, and better tests to '
    + 'come. A hundred years later that is still the right sentence.',
  ],

  history: [
    'Two British expeditions observed the total solar eclipse of 29 May 1919 to test '
    + 'whether the Sun bends starlight. Arthur Eddington and Edwin Cottingham went to '
    + 'Príncipe, off West Africa; Andrew Crommelin and Charles Davidson went to Sobral in '
    + 'Brazil. Frank Watson Dyson, the Astronomer Royal, organised both from Greenwich and '
    + 'announced the result with Eddington that November.',
    'What this game compresses: two expeditions on two continents into one camp, and six '
    + 'months between the plates and the announcement into a single sitting. The computer and '
    + 'the expedition secretary are invented.',
    'What it does not soften: the Sobral astrographic plates were poor and one set was set '
    + 'aside, which was argued about for decades. The result was right, and it was not as '
    + 'clean as the headlines of 1919 made it sound.',
  ],

  look: {
    fov: 66,
    near: 0.08,
    // Outdoors, and the sky dome is at 900, so the far plane has to clear it from
    // the far end of the site rather than from the spawn. House rule 18.
    far: 1600,
    fog: { colour: 0xc0b394, near: 90, far: 620 },
    // Bright tropical sun on dust. Under ACES this wants to be held down.
    exposure: 0.88,
    playerRadius: 0.45,
    lighting: { ambient: 0.55, hemi: 0.65 },
  },

  decorate,
  fitOutRoom,
  fitOutSpine,
};
