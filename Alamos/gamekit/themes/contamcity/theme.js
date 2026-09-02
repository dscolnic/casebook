// theme.js — the manifest. The only file the engine reads directly.
//
// The Contaminated City. College chemistry as a fifteen-mission contamination
// response in the fictional river city of Riverton, from the design book
// contaminated_city_chemistry_curriculum_design_book.docx.
//
// The content under content/ is generated:
//   node tools/import-missionbook.mjs <book>.docx contamcity --map tools/contamcity-map.json
// The two hand-written exceptions are content/groups.js (the six areas are a
// design decision) and content/ballpark-specs.js (prose relationships carry no
// arithmetic). Everything else is regenerated from the book.
import { site } from './site.js';
import { OUTFITS, roleToOutfit } from './outfits.js';
import { GROUPS } from './content/groups.js';
import { MISSIONS, WARMUPS } from './content/missions.js';
import { CURRICULUM, BALLPARK_CALCS, JARGON } from './content/curriculum.js';
import { ROSTER, LEADERS, AVATARS } from './content/roster.js';
import { COPY } from './content/copy.js';
import { decorate } from './props.js';
import { INTERIORS } from './interiors.js';

export default {
  // Who this edition is for. `engine/core/typography.js` reads it and scales the
  // root font size, so the same game can ship at several reading levels with
  // type sized for each. Undergraduate: no scaling.
  audience: { grade: 12 },

  // Fifteen working days across seven weeks of one response. They really are
  // days, so the label stays — but the cards say which day, because they are
  // not consecutive.
  dayNoun: 'Day',

  // The brief plan card — see gamekit/BRIEFING_PASS.md. A date stamp and two
  // sentences: what is true this morning, and what the player does about it.
  // The long form could not be reconciled with `plainCards`: the 90-word floor
  // `checkStory` applies to a grade-12 campaign, inside the four-sentence cap on
  // stake plus briefing, is 30 words a sentence, and no vocabulary reaches
  // grade 6.5 at that length. The cast, the argument and the consequence moved
  // out to the calls' own `reason` lines, which is where a player meets them.
  stakeStyle: 'brief',

  id: 'contamcity',
  title: 'The Contaminated City',
  subtitle: 'Chief Scientific Officer · Riverton Contamination Response',

  site,

  content: { GROUPS, MISSIONS, CURRICULUM, ROSTER, COPY, BALLPARK_CALCS, JARGON, LEADERS, AVATARS, WARMUPS },

  // What is inside each laboratory. The engine builds the room; this says what
  // the instrument in it reads. Omit it and the doors stay as they were.
  interiors: INTERIORS,

  // The opening screen. Lives here rather than in index.html, which is shared by
  // every theme served from gamekit/ — Deep Watch spent a session opening with a
  // paragraph about a river city.
  // ---------------------------------------------------------- the delivery
  //
  // What the fortnight produces, and the one room the parts of it are kept in.
  // The opening card names it, the plan card says which piece today is, the card
  // that closes a day hands that piece over, and the board in the room named by
  // `where` is where all of them can be seen at once — engine/core/delivery.js.
  //
  // The pieces are the fifteen claims in the order the response happened to
  // establish them, which is not the order they are bound in: the identity
  // list is written on day 1 and read first.
  delivery: {
    name: 'The Riverton Evidence Package',
    what: 'The package the state accepts before Riverton drinks its own water again: what left the '
      + 'yard, where each part moved or changed, and which controls must keep working after reopening.',
    where: 'IDENT',
    pieces: [
      'The provisional identity list',
      'The plume assessment',
      'The underground reaction estimate',
      'The confirmed component list',
      'The mass balance sampling plan',
      'The concentration maps',
      'The neutralisation strategy',
      'The reservoir equilibrium forecast',
      'The secondary product watch list',
      'The energy balance',
      'The corrosion cell finding',
      'The safe operating envelope',
      'The treatment train choice',
      'The release decision',
      'The claim-by-claim summary',
    ],
  },
  opening: [
    'A freight yard burned last night, 900 metres up the river from Riverton\'s water intake. '
    + 'The intake is shut and the whole city is living on stored water. You are the Chief Scientific '
    + 'Officer, so no valve opens until you say it can. In fifteen days you sign The Riverton Evidence '
    + 'Package: what escaped, where it went, and what must keep working. Get it wrong and the city '
    + 'drinks what burned.'
  ],

  people: {
    OUTFITS,
    roleToOutfit,
    // Must be >= ROSTER.length or anyone past the limit never appears, and a
    // mission stop naming them becomes unreachable. The validator checks this.
    spawn: ROSTER.length,
    extras: 26,
  },

  // How it ends. Shown when the campaign closes and printed as the book's last page.
  ending: [
    'The first Riverton valve opened on day sixty-one. The network came back in stages: the treatment '
    + 'conditions stayed inside their validated window, endpoint samples stayed below the release rule, '
    + 'and the hospital tanker was the first one stood down. By evening, taps were running across the city.',
    'The order was not an all-clear. The riverbed still holds contamination, the secondary product remains '
    + 'on the watch list, and the intake main keeps automatic chemistry and corrosion triggers. Four '
    + 'monitoring stations stayed funded after the emergency trailers left, because those open questions '
    + 'were written into the reopening instead of being edited out of it.',
    'You did not make the contamination disappear. You separated the mixed release into things that could '
    + 'be measured, caught a laboratory result that was wrong in the same way twice, followed material from '
    + 'water into sediment and through treatment, and refused to turn a passing number into a permanent promise. '
    + 'Riverton is drinking its own water again because the conditions behind that decision are still visible.',
  ],
  look: {
    // 66° rather than 72°: a wider field distorts badly down a straight street.
    fov: 66, near: 0.1, far: 900,
    // River haze. Far is generous because the horizon ranks have to stay visible.
    fog: { colour: 0xb9c4c8, near: 150, far: 460 },
    // 0.86, not 1.0: ACES plus a bright river-valley sky was flattening the
    // whole town to a single pale value.
    exposure: 0.86,
    // Passed straight to buildSunRig. Three real lights, and the contract's
    // ceiling is six — everything else that glows is an emissive panel.
    lighting: { ambient: 0.08, sun: 3.0, hemi: 0.22, shadowExtent: 110 },
  },

  start: site.spawn,

  // Called once the ground, buildings and street furniture exist.
  decorate,
};
