// minors.js — the three landmark-only spaces the bible names, and the words
// their cards carry.
//
// §3 "Landmark-only spaces and visible scene objects": walkable, ungraded, never
// a required tour or a travel cost. This building is a plan, so they are not
// rooms of their own — a new room would move every collider, waypoint and map
// square on that floor — but corners of rooms and corridor that already exist:
//
//   visitor-alcove     Screening & Consent (SCREEN), the reception, by its
//                      north wall — a bench, a travel bag, a visitor badge.
//   courier-bay        Goods In (GOODS), the shelves on its north wall.
//   board-antechamber  the level-2 corridor wall north of the Monitoring Board
//                      Room's door — seven coat hooks and two lamps.
//
// `story.js` builds them and prints these lines, which are the bible's Before /
// Visible-change cells verbatim. NOT merged into `theme.interiors`: in a plan
// game that map is the set of areas with a district room, and a key here would
// make `interiors.enter()` try to build one. `import-book.mjs` never writes this
// file.
export const LANDMARKS = {
  'visitor-alcove': {
    place: 'Visitor Alcove',
    room: 'SCREEN',
    before: 'A travel bag rests beside a hospital visitor badge.',
    after1: 'After Stop 16, Dr. Samira Holt arrives from the fast site;',
    after2: 'after Stop 20, her blank rural route map has a signed audit plan.',
  },
  'courier-bay': {
    place: 'Courier Bay',
    room: 'GOODS',
    before: 'Sealed hospital cases wait on separate shelves.',
    after: 'After Stop 32, the exposed-kit shelf carries QUARANTINED; its boxes stay there until their own release checks pass.',
  },
  'board-antechamber': {
    place: 'Board Antechamber',
    room: 'spine, level 2',
    before: 'Seven empty coat hooks face a shut meeting door.',
    after1: 'After Stop 56, coats arrive and the lamps come on;',
    after2: 'after Stop 60, the door opens onto the meeting.',
  },
};

export default LANDMARKS;
