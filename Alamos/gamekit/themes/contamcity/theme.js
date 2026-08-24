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
    what: 'The package the state accepts before the city drinks its own water again: every '
      + 'claim about what came off that yard, named by two independent methods.',
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
    'A freight yard beside the river burned last night. Nobody can say what came off it. The city '
    + 'takes its drinking water from that river, 900 metres downstream. That intake serves 140000 '
    + 'people, and the utility has shut it. You are the city\'s Chief Scientific Officer. You decide '
    + 'what gets measured. You decide what the city is told about it. In fifteen days the state has to '
    + 'accept one Riverton evidence package before the intake can reopen. It has to say what burned, '
    + 'where it went in the water and the air, and what has to be cleaned up first. Every claim in it '
    + 'is named twice, by two different methods. One claim is settled a day. The city is drinking its '
    + 'reserves, and they are measured in days.',
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
    'The plant came back online on day sixty-one, and the city has been drinking its own water '
    + 'since. Every claim in the package held: the compound identified by two methods, the plume '
    + 'mapped, the sediment reservoir bounded, and ten years of monitoring funded before the '
    + 'emergency budget closed.',
    'The fence came down on a Thursday. Both neighbourhoods were home by the weekend, and the '
    + 'river survey still samples the same four stations every month.',
    'And it reads that way because of you. You identified the compound with two methods '
    + 'instead of one, you bounded the sediment reservoir rather than guessing at it, and you '
    + 'signed nothing you could not show the working for. A city is drinking its own water '
    + 'again. You are the reason it can.',
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
