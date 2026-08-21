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
//
// ## Editions
//
// A game can be taught at more than one level in the same place, to the same
// cast — see MIDDLE_SCHOOL_EDITIONS.md. An edition is NOT a second row here:
// its title, field, accent, place and hero are the base game's by definition,
// and a copied row is a row that goes stale. It is three fields on the game it
// belongs to:
//
//   editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
//                course: 'Astronomy · Earth & space science' }]
//
// `cards()` flattens that into what a front door actually draws: one entry per
// playable build, carrying `build` (the dist directory and the theme id),
// `pair` (the same game at another level, so a shelf can group them) and
// `shotsFrom` (the base id, because the place is the same and there is one set
// of screenshots of it).

export const GAMES = [
  { id: 'contamcity', title: 'The Contaminated City',
    course: 'AP Chemistry → college analytical', field: 'Chemistry', accent: '#4ea3d8',
    place: 'A wide river city, three days after a freight-yard fire.',
    hero: 'rack-day.png',
    // first-year analytical chemistry — separations, calibration, detection limits.
    level: 'university', grades: 'Undergraduate',
    editions: [
      { suffix: 'hs', level: 'high', grades: '11–12',
        course: 'AP Chemistry · aqueous equilibria and titration' },
     { suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Matter, mixtures and clean water · physical science' }] },

  { id: 'redsand', title: 'Red Sand',
    course: 'AP Chemistry · the back half', field: 'Chemistry', accent: '#c2704a',
    place: 'A propellant plant on Mars: modules buried in regolith along one track, under a butterscotch sky.',
    hero: 'array-along-the-rows.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Matter and change · physical science' }] },

  { id: 'yellowbay', title: 'Yellow Bay',
    course: 'AP Chemistry · the structure half', field: 'Chemistry', accent: '#c9a227',
    place: 'A wafer fab mid yield crash: two gowned wings joined by a glass crossing over the subfab, and the litho end lit amber.',
    hero: 'link--the-whole-crossing.png' },

  { id: 'headwater', title: 'Headwater',
    course: 'AP Calculus AB', field: 'Maths & Stats', accent: '#3f92c9',
    place: 'Ashfell Dam from the inside — galleries, a gate chamber, and a hundred metres of air off the crest.',
    // The spawn spin this used to point at was a photograph of an unlit pane of
    // glass. themes/headwater/shots.js exists now; this is the operations
    // gallery, which is the one view that says what the building is.
    hero: 'gallery-2-up.png' },

  { id: 'the_trial', title: 'The Trial',
    course: 'AP Statistics → clinical epidemiology', field: 'Maths & Stats', accent: '#cf7fae',
    place: 'One long floor, where walking north is distance from the patient.',
    hero: 'infusion-bay--end.png',
    // introductory clinical epidemiology and biostatistics.
    level: 'university', grades: 'Undergraduate',
    editions: [
      { suffix: 'hs', level: 'high', grades: '11–12',
        course: 'AP Statistics · all nine units' },
     { suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Fair tests, averages and evidence · science practices' }] },

  { id: 'sightline', title: 'Sightline',
    course: 'AP Psychology · all five units', field: 'Psychology', accent: '#2f6f9f',
    place: 'A hall with a street corner built across one end, and the identification distance painted on the floor.',
    hero: 'reconstruction-bay--end.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'How memory and eyesight work · science practices' }] },

  { id: 'quantum', title: 'Quantum',
    course: 'Modern quantum · 2nd-year physics & EE', field: 'Physics', accent: '#7f8fe0',
    place: 'A laboratory spine that is a temperature gradient, walked end to end.',
    hero: 'corridor-018-north.png',
    // second-year physics / electrical engineering.
    level: 'university', grades: 'Undergraduate' },

  { id: 'bring_them_home', title: 'Bring Them Home',
    course: 'AP Physics 1 → Physics C mechanics', field: 'Physics', accent: '#c2603f',
    place: 'Mission Control: four tiers stepping down to a wall of plot boards. The teams are rows, not rooms.',
    hero: 'control--boards.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Motion, energy and staying alive · physical science' }] },

  { id: 'deepwatch', title: 'Deep Watch',
    course: 'Waves & sound → sonar engineering', field: 'Physics', accent: '#3f8f86',
    place: 'A submarine — one line of ten compartments, hatches between them, and no sky at all.',
    hero: 'spawn-1.png',
    // naval / acoustics engineering — the sonar equation as a budget.
    level: 'university', grades: 'Undergraduate',
    editions: [
      { suffix: 'hs', level: 'high', grades: '11–12',
        course: 'AP Physics 2 · all seven units' },
     { suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Sound, floating and sinking · physical science' }] },

  { id: 'projecty', title: 'Project Y',
    course: 'AP Physics 2 · nuclear', field: 'Physics', accent: '#d8a24e',
    place: 'A mesa laboratory in 1943. Chalkboards and typed sheets, and no screens anywhere.',
    hero: 'spawn-7.png' },

  { id: 'groundtruth', title: 'Ground Truth',
    course: 'AP Physics C · E&M, derived', field: 'Physics', accent: '#7f8894',
    place: 'A lightning research station on a salt flat: a sixty-metre mast, a launch rail, and a storm coming in.',
    hero: 'the-mast.png' },

  { id: 'blackout', title: 'Blackout',
    course: 'AP Physics 2 → power systems', field: 'Engineering', accent: '#d9b23c',
    place: 'Calder Switching Station, and two circuits of lattice towers walking off the edge of the map.',
    hero: 'spawn-7.png',
    // power-systems engineering — per-unit, faults, dispatch, restoration.
    level: 'university', grades: 'Undergraduate',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Circuits, energy and the grid · physical science' }] },

  { id: 'aftershock', title: 'Aftershock',
    course: 'Seismology → civil engineering', field: 'Engineering', accent: '#b6553f',
    place: 'Kestrel Bay three days after, where the fault broke the surface and you can walk the scarp.',
    hero: 'spawn-1.png',
    // civil engineering — soil mechanics and structural dynamics.
    level: 'university', grades: 'Undergraduate',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Earthquakes and building safety · Earth science' }] },

  { id: 'planetary_defense', title: 'Planetary Defense',
    course: 'Astronomy · AP Physics 1 mechanics', field: 'Earth & Space', accent: '#8f6fd0',
    place: 'A mountain ridge: one road, domes with open shutters, a thirty-metre dish and red service lamps.',
    hero: 'spawn-6.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Astronomy · Earth & space science' }] },

  { id: 'midway', title: 'Safety Factor',
    course: 'AP Physics 1 · all eight units', field: 'Physics', accent: '#c9963f',
    place: 'Seven rides at Corbin Park, and an inspector who will not take a number nobody can derive.',
    hero: 'the-road-in.png' },

  { id: 'icecore', title: 'Ice Core',
    course: 'Earth science → palaeoclimate', field: 'Earth & Space', accent: '#6fc7d8',
    place: 'A deep-drilling camp on a polar plateau, with the flattest, emptiest horizon in the set.',
    hero: 'core-line.png',
    // upper-division palaeoclimate — proxy calibration and attribution.
    level: 'university', grades: 'Undergraduate',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Layers, records and climate · Earth science' }] },

  { id: 'outbreak_riverton', title: 'Outbreak: Riverton',
    course: 'AP Biology · public health', field: 'Biology', accent: '#5fae63',
    place: 'A hospital campus in week three: triage marquees, container labs, and a fence with one gate.',
    hero: 'spawn-7.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Germs, spread and public health · life science' }] },

  { id: 'seedbank', title: 'Wellmere',
    course: 'AP Biology · heredity', field: 'Biology', accent: '#7fae8a',
    place: 'A breeding station on a headland, ringed by isolation distance. Sea on three sides and one causeway in.',
    hero: 'b-causeway.png',
    editions: [{ suffix: 'ms', level: 'middle', grades: '6–8',
                 course: 'Traits, inheritance and breeding · life science' }] },

  { id: 'carrying', title: 'Carrying Capacity',
    course: 'AP Environmental Science · all nine units', field: 'Earth & Space', accent: '#4e9b7a',
    place: 'Vellan Island: ninety-one people, one borehole, one cable and a hole with eleven years left in it.',
    hero: 'the-point-and-the-sea.png',
    // The place was chosen because on an island every budget closes: the water is
    // what fell on it, the fish are what the boats did not take, and the waste stays.
    level: 'high', grades: '11–12' },

  { id: 'ghostlight', title: 'Ghost Light',
    course: 'AP Precalculus · all four units', field: 'Maths & Stats', accent: '#b0763c',
    place: 'The Ellery Variety Theatre, dark eleven years and opening in a fortnight: nine hundred seats on a rake, a fly tower over the stage, and the offices round the dock yard behind it.',
    hero: 'stage--the-house.png',
    // Every family of function in the course is a piece of equipment here — the
    // board is polar, the pit is sinusoids and logs, the box office is rational.
    level: 'high', grades: '10–12' },

  { id: 'changeover', title: 'Changeover',
    course: 'AP Macroeconomics · all six units', field: 'Economics', accent: '#7f6fa8',
    place: 'Halvern Central Station, commandeered for a currency changeover: a queue in the ticket hall and a furnace on platform one.',
    hero: 'exchange-counter--end.png',
    // Macroeconomics is national, aggregated and invisible. A changeover makes
    // every quantity in it local and physical for a fortnight.
    level: 'high', grades: '11–12' },

  { id: 'slackwater', title: 'Slack Water',
    course: 'AP Calculus BC · parametric, polar, vector and series', field: 'Mathematics', accent: '#4f7fa8',
    place: 'Sarn Barrage: six sluice gates across the neck of an estuary, mud at low water and a training wall running out into the channel.',
    hero: 'sluice-control--desk.png',
    // Headwater is the AB half. This is the half that starts where AB stops:
    // series and convergence, parametric and polar, and a tide that is a sum.
    level: 'high', grades: '11–12' },

  { id: 'overwind', title: 'Overwind',
    course: 'AP Physics C: Mechanics · in derivations', field: 'Physics', accent: '#c2703f',
    place: 'Kerrow No. 3: a thirty-two metre headframe over a 1,240 m shaft, alone on a moor, with the winding rope crossing the yard at head height.',
    hero: 'winder-house--drum.png',
    // Ground Truth proved a Physics C paper can be carried by derivations. This
    // is the other paper, and a mine hoist is where rotation, variable mass and
    // gravitation are all one machine.
    level: 'high', grades: '11–12' },

  { id: 'darkfibre', title: 'Dark Fibre',
    course: 'AP Physics 2 · optics and modern physics', field: 'Physics', accent: '#3f8f7a',
    place: 'Pellow Head: a low concrete landing station in the dunes, a manhole above the tide line, and a radiography bay three hundred metres out.',
    hero: 'test-room--reflectometer.png',
    // The half deepwatch_hs could only retrofit onto a submarine: refraction and
    // interference, then photons, energy levels, photodetection and decay.
    level: 'high', grades: '11–12' },

  { id: 'hospital', title: 'Hospital Heroes',
    course: 'Anatomy & physiology', field: 'Biology', accent: '#e0868f',
    place: "A children's hospital ward — a spine with rooms off it, and everything a size larger.",
    hero: 'emergency-triage--doorway.png',
    level: 'elementary', grades: '3–4' },
];

// ---------------------------------------------------------------- editions
//
// One entry per playable build. A game with no `editions` is one card, exactly
// as it always was; a game with two is two cards that know about each other.
//
// The default level is `high`, because that is the largest set and stating it on
// every row would be noise around the rows that differ. A row states its own
// `level` in two directions: down to `elementary` (Hospital Heroes), and up to
// `university` for the seven whose syllabus no high-school course contains —
// read the note on each of those rows for what it is instead. The test is
// containment, not difficulty: AP Physics C and AP Calculus AB are college
// courses by content and stay at `high`, because high schools teach them.
export function cards(){
  const out = [];
  for(const g of GAMES){
    const { editions = [], ...base } = g;
    out.push({
      ...base,
      build: g.id, pair: g.id, shotsFrom: g.id,
      level: g.level ?? 'high',
      grades: g.grades ?? '9–12',
    });
    for(const e of editions){
      out.push({
        ...base,
        build: `${g.id}_${e.suffix}`, pair: g.id, shotsFrom: g.id,
        id: `${g.id}_${e.suffix}`,
        // The place and the cast are the base game's — that is what an edition
        // is — so only the course line and the level are the edition's own.
        course: e.course ?? g.course,
        level: e.level, grades: e.grades,
      });
    }
  }
  return out;
}

/** The levels that actually have cards, coarsest first. */
export const LEVELS = [
  { id: 'elementary', label: 'Elementary' },
  { id: 'middle', label: 'Middle School' },
  { id: 'high', label: 'High School' },
  { id: 'university', label: 'University' },
];

export default GAMES;
