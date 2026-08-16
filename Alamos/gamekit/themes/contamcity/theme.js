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
import { MISSIONS } from './content/missions.js';
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

  content: { GROUPS, MISSIONS, CURRICULUM, ROSTER, COPY, BALLPARK_CALCS, JARGON, LEADERS, AVATARS },

  // What is inside each laboratory. The engine builds the room; this says what
  // the instrument in it reads. Omit it and the doors stay as they were.
  interiors: INTERIORS,

  // The opening screen. Lives here rather than in index.html, which is shared by
  // every theme served from gamekit/ — Deep Watch spent a session opening with a
  // paragraph about a river city.
  opening: [
    'A freight yard beside the river burned last night, and nobody can say what came off it. You '
    + 'are the city\'s Chief Scientific Officer, which means what gets measured — and what the city '
    + 'is told about it — is decided by you. Two neighbourhoods are downwind of a plume nobody has '
    + 'identified. The drinking-water intake for a hundred and forty thousand people sits nine '
    + 'hundred metres downstream of the outfall, and the utility has closed it, which means the '
    + 'city is drinking its reserves and the reserves are measured in days.',
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
