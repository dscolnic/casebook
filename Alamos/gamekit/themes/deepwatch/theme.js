// theme.js — Deep Watch as a gamekit theme.
//
// The fourth game. It arrived as its own build — a persistent submarine, five
// simulation systems and a mission runtime of timed stages — and what came
// across is the boat and the teaching. The simulation stayed behind: a flooding
// rate that keeps rising while you read a gauge has nowhere to live in a loop
// that is walk somewhere, work the evidence, hand off. See site.js.
//
// Content is generated from the book:
//   node tools/import-book.mjs books/deep-watch.yml deepwatch --verify
import { site } from './site.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS } from './content/missions.js';
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { INTERIORS } from './interiors.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // What one mission is called here. The engine's model is a working day;
  // this campaign is not one, so the label is not either.
  dayNoun: 'Watch',


  id: 'deepwatch',
  title: 'Deep Watch',
  subtitle: 'Reasoning Under Pressure Beneath the Surface',

  site,
  start: site.spawn,

  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON, ROSTER, LEADERS, AVATARS, COPY },

  people: {
    OUTFITS,
    roleToOutfit,
    spawn: ROSTER.length,
    // A boat is crowded, and the passage is 4.5 m wide: more than a handful of
    // extras and the player cannot get past them.
    extras: 8,
  },

  interiors: INTERIORS,
  // Painted steel and deck matting, not laboratory vinyl.
  interiorStyle: 'steel',

  opening: [
    'You have the watch on a submarine at ninety metres, and the boat has been submerged long '
    + 'enough that nobody aboard has seen daylight. You cannot look outside: what you know about the '
    + 'water around you comes from sonar, and what you know about the boat comes from gauges other '
    + 'people read out to you. Problems carry on while you think about them. A contact you have not '
    + 'identified keeps closing, water already aboard keeps rising, and an uncorrected plot drifts '
    + 'further from the boat\'s real position every minute.',
  ],

  // How it ends. Shown when the campaign closes and printed as the book's last page.
  ending: [
    'The boat surfaced at dawn on the twenty-third day, into weather nobody had seen for three '
    + 'weeks. The fractured wrist is in a cast and signed fit for the transit. The contact was '
    + 'resolved, the plot was fixed, and the machine that had been left since Tuesday was opened '
    + 'up and found in time.',
    'Nothing was lost on this patrol that could not be repaired. The whole crew went up the ladder '
    + 'into daylight, which is the only measure of a watch that matters.',
  ],
  look: {
    fov: 68,
    near: 0.05,
    far: 200,
    // Exponential, not linear: inside a hull the far end of the passage should
    // fade rather than end.
    fog: { colour: 0x04080a, density: 0.012 },
    exposure: 1.0,
    // A hatch is a 1.1 m opening. At the engine's default 0.45 the player is
    // 0.9 m across and the gap that is left is twelve centimetres, which reads
    // in play as "sometimes I cannot get through the door".
    playerRadius: 0.3,
    lighting: { ambient: 0.55, hemi: 0.6 },
  },
};
