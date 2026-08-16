// games.js — the catalogue. One row per game, and the only description of the
// set that anything outside the games themselves is allowed to read.
//
// WHY IT IS ITS OWN FILE. There are two front doors now — `tools/gallery.mjs`
// writes the local `dist/index.html`, and `tools/sync-casebook.mjs` writes the
// shelf the casebook app serves — and the first thing that happens when a
// catalogue is copied is that one copy stops being updated. This one was
// already two games stale (Wellmere and Red Sand shipped and neither had a
// card) before it was extracted.
//
// `course` is the short form a card prints, `field` is the filter chip, and
// `hero` is a file under `shots/<id>/` — chosen by looking at them, since most
// themes have several and most of those are of a wall. A game with no shot gets
// a drawn placeholder rather than a broken image.

export const GAMES = [
  { id: 'contamcity', title: 'The Contaminated City',
    course: 'AP Chemistry → college analytical', field: 'Chemistry', accent: '#4ea3d8',
    place: 'A wide river city, three days after a freight-yard fire.',
    hero: 'rack-day.png' },

  { id: 'redsand', title: 'Red Sand',
    course: 'AP Chemistry · the back half', field: 'Chemistry', accent: '#c2704a',
    place: 'A propellant plant on Mars: modules buried in regolith along one track, under a butterscotch sky.',
    hero: 'array-along-the-rows.png' },

  { id: 'headwater', title: 'Headwater',
    course: 'AP Calculus AB', field: 'Maths & Stats', accent: '#3f92c9',
    place: 'Ashfell Dam from the inside — galleries, a gate chamber, and a hundred metres of air off the crest.',
    // The spawn spin this used to point at was a photograph of an unlit pane of
    // glass. themes/headwater/shots.js exists now; this is the operations
    // gallery, which is the one view that says what the building is.
    hero: 'gallery-2-up.png' },

  { id: 'the_trial', title: 'The Trial',
    course: 'AP Statistics · trial design', field: 'Maths & Stats', accent: '#cf7fae',
    place: 'One long floor, where walking north is distance from the patient.',
    hero: 'infusion-bay--end.png' },

  { id: 'quantum', title: 'Quantum',
    course: 'Modern quantum · 2nd-year physics', field: 'Physics', accent: '#7f8fe0',
    place: 'A laboratory spine that is a temperature gradient, walked end to end.',
    hero: 'corridor-018-north.png' },

  { id: 'bring_them_home', title: 'Bring Them Home',
    course: 'AP Physics 1 → Physics C mechanics', field: 'Physics', accent: '#c2603f',
    place: 'Mission Control: four tiers stepping down to a wall of plot boards. The teams are rows, not rooms.',
    hero: 'control--boards.png' },

  { id: 'deepwatch', title: 'Deep Watch',
    course: 'Waves & sound · systems engineering', field: 'Physics', accent: '#3f8f86',
    place: 'A submarine — one line of ten compartments, hatches between them, and no sky at all.',
    hero: 'spawn-1.png' },

  { id: 'projecty', title: 'Project Y',
    course: 'AP Physics 2 · nuclear', field: 'Physics', accent: '#d8a24e',
    place: 'A mesa laboratory in 1943. Chalkboards and typed sheets, and no screens anywhere.',
    hero: 'spawn-7.png' },

  { id: 'blackout', title: 'Blackout',
    course: 'AP Physics 2 · circuits & induction', field: 'Engineering', accent: '#d9b23c',
    place: 'Calder Switching Station, and two circuits of lattice towers walking off the edge of the map.',
    hero: 'spawn-7.png' },

  { id: 'aftershock', title: 'Aftershock',
    course: 'Earth science · statics & materials', field: 'Engineering', accent: '#b6553f',
    place: 'Kestrel Bay three days after, where the fault broke the surface and you can walk the scarp.',
    hero: 'spawn-1.png' },

  { id: 'planetary_defense', title: 'Planetary Defense',
    course: 'Astronomy · AP Physics 1 mechanics', field: 'Earth & Space', accent: '#8f6fd0',
    place: 'A mountain ridge: one road, domes with open shutters, a thirty-metre dish and red service lamps.',
    hero: 'spawn-6.png' },

  { id: 'icecore', title: 'Ice Core',
    course: 'Earth & environmental science', field: 'Earth & Space', accent: '#6fc7d8',
    place: 'A deep-drilling camp on a polar plateau, with the flattest, emptiest horizon in the set.',
    hero: 'core-line.png' },

  { id: 'outbreak_riverton', title: 'Outbreak: Riverton',
    course: 'AP Biology · public health', field: 'Biology', accent: '#5fae63',
    place: 'A hospital campus in week three: triage marquees, container labs, and a fence with one gate.',
    hero: 'spawn-7.png' },

  { id: 'seedbank', title: 'Wellmere',
    course: 'AP Biology · heredity', field: 'Biology', accent: '#7fae8a',
    place: 'A breeding station on a headland, ringed by isolation distance. Sea on three sides and one causeway in.',
    hero: 'b-causeway.png' },

  { id: 'hospital', title: 'Hospital Heroes',
    course: 'Anatomy & physiology', field: 'Biology', accent: '#e0868f',
    place: "A children's hospital ward — a spine with rooms off it, and everything a size larger.",
    hero: 'emergency-triage--doorway.png' },
];

export default GAMES;
