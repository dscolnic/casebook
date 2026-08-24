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
    hero: 'tower-from-outside.png',
    // Macroeconomics is national, aggregated and invisible. A changeover makes
    // every quantity in it local and physical for a fortnight.
    level: 'high', grades: '11–12' },

  { id: 'slackwater', title: 'Slack Water',
    course: 'AP Calculus BC · parametric, polar, vector and series', field: 'Maths & Stats', accent: '#4f7fa8',
    place: 'Sarn Barrage: six sluice gates across the neck of an estuary, mud at low water and a training wall running out into the channel.',
    hero: 'shore--east-to-the-wall.png',
    // Headwater is the AB half. This is the half that starts where AB stops:
    // series and convergence, parametric and polar, and a tide that is a sum.
    level: 'high', grades: '11–12' },

  { id: 'overwind', title: 'Overwind',
    course: 'AP Physics C: Mechanics · in derivations', field: 'Physics', accent: '#c2703f',
    place: 'Kerrow No. 3: a thirty-two metre headframe over a 1,240 m shaft, alone on a moor, with the winding rope crossing the yard at head height.',
    hero: 'yard--headframe.png',
    // Ground Truth proved a Physics C paper can be carried by derivations. This
    // is the other paper, and a mine hoist is where rotation, variable mass and
    // gravitation are all one machine.
    level: 'high', grades: '11–12' },

  { id: 'darkfibre', title: 'Dark Fibre',
    course: 'AP Physics 2 · optics and modern physics', field: 'Physics', accent: '#3f8f7a',
    place: 'Pellow Head: a low concrete landing station in the dunes, a manhole above the tide line, and a radiography bay three hundred metres out.',
    hero: 'compound--from-the-road.png',
    // The half deepwatch_hs could only retrofit onto a submarine: refraction and
    // interference, then photons, energy levels, photodetection and decay.
    level: 'high', grades: '11–12' },

  // ---------------------------------------------------------------- quick
  //
  // A Quick Discovery, and the first of them: three levels and nine stops in one
  // sitting rather than fifteen working days. It is one row here like everything
  // else — the shelf already prints the length off the theme's own missions file,
  // so a card reading "3 levels · 9 stops" beside one reading "15 days · 45 stops"
  // says what it is without a second kind of row to maintain.
  { id: 'qd_accel', kind: 'quick', title: 'The Accelerating Universe',
    course: 'Astronomy · how the accelerating expansion was measured',
    field: 'Earth & Space', accent: '#7a4fa3',
    place: 'Cerro Vela Survey Operations: an analysis floor stepped down to a wall of plot boards, and the measurement chain drawn along forty-five metres of corridor behind it.',
    hero: 'floor--boards.png',
    level: 'high', grades: '11–12' },

  // The second Quick Discovery. Same 3 x 3 shape, a different subject, and its
  // place is the engine's own interior world rather than a copy of anybody's —
  // which is the cheap way to bring a building and the only way `placement` can
  // fire rays at it.
  { id: 'qd_dna', kind: 'quick', title: 'The Double Helix',
    course: 'Biology · how the structure of DNA was forced by the evidence',
    field: 'Biology', accent: '#3f7f6a',
    place: 'A 1950s structural biology unit: one corridor, a chemistry bench and a model room down one side, an X-ray room and an evidence wall down the other.',
    hero: 'evidence-room--doorway.png',
    level: 'high', grades: '11–12' },

  // The third Quick Discovery, and the first written for the plainer register the
  // whole set moved to: grade 9 rather than AP, and every card teaches its method
  // before it asks anything.
  { id: 'qd_nucleus', kind: 'quick', title: 'The Atomic Nucleus',
    course: 'Physics · how the atomic nucleus was inferred from a scattering experiment',
    field: 'Physics', accent: '#b5502f',
    place: 'A 1910 university physics laboratory: the apparatus down one side of a corridor, the counting and the argument down the other, and a gold leaf in a vacuum between them.',
    hero: 'scattering-chamber--doorway.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_tectonics', kind: 'quick', title: 'Plate Tectonics',
    course: 'Earth science · how continental clues and ocean data became plate tectonics',
    field: 'Earth & Space', accent: '#2f4a55',
    place: 'A postwar government survey section: the land evidence down one side of a corridor, ten years of ships down the other, and thirty feet of continents on pins.',
    hero: 'map-room--doorway.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_higgs', kind: 'quick', title: 'The Higgs Boson',
    course: 'Particle physics · how a new boson was found in a background of ordinary events',
    field: 'Physics', accent: '#1f4a63',
    place: 'A collider analysis floor: the theory wall and the combination room down one side, a dark event-display room and ten metres of histogram down the other.',
    hero: 'histogram-room--doorway.png',
    level: 'high', grades: '9–12' },

  // The first Quick Discovery outdoors, and the reason is the subject: an eclipse
  // expedition is a camp on a plain with a clear horizon, and half of what makes
  // it hard is that it is a camp.
  { id: 'qd_eclipse', kind: 'quick', title: 'The Bending of Starlight',
    course: 'Physics · how the 1919 eclipse tested light bending near the Sun',
    field: 'Physics', accent: '#c98a2b',
    place: 'An eclipse camp on a red dust plain: two coelostats and their lenses out on the flat, a light-tight plate hut back along the track, and one wire to the coast.',
    hero: 'camera-field--from-the-track.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_exo', kind: 'quick', title: 'The First Exoplanet',
    course: 'Astronomy · how a planet nobody can see is detected and then described',
    field: 'Earth & Space', accent: '#274a4f',
    place: 'A planet search floor: a spectrograph on one side of the corridor, a month of light curve on the wall of the other, and a room at the end with no instrument in it.',
    hero: 'survey-photometry--doorway.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_ligo', kind: 'quick', title: 'Gravitational Waves',
    course: 'Physics · how a passing gravitational wave was measured and read',
    field: 'Physics', accent: '#1c3f52',
    place: 'An interferometer corner station: the beam splitter and two metre-wide tubes leaving through the wall at right angles, three suspension stacks, and a control room at four in the morning.',
    hero: 'optics-lab--doorway.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_cmb', kind: 'quick', title: 'The Cosmic Microwave Background',
    course: 'Cosmology · how an unwanted signal turned out to be the early universe',
    field: 'Earth & Space', accent: '#7a4fa3',
    place: 'A hilltop radio site: a twenty-foot horn on a concrete pier inside a ring of ground shielding, a receiver hut under it, and a much newer building up the ridge.',
    hero: 'horn--three-quarter.png',
    level: 'high', grades: '9–12' },

  { id: 'qd_hubble', kind: 'quick', title: 'The Expanding Universe',
    course: 'Astronomy · how a relation between distance and recession became an expanding universe',
    field: 'Earth & Space', accent: '#2e3d48',
    place: 'A 1920s mountain observatory: years of glass in numbered drawers on one side of the corridor, a spectrograph on its own pier on the other, and one plot at the end of it.',
    hero: 'diagram-room--doorway.png',
    level: 'high', grades: '9–12' },

  // --------------------------------------------- the second ten Quick Discoveries
  //
  // Same 3 x 3 shape as the first ten and the same grade-9 register. What is
  // different is the subjects: these are the non-physics discoveries — medicine,
  // biology, chemistry, psychology and economics — and each one reuses a place
  // the repo already builds, reskinned to its own period.

  { id: 'qd_penicillin', kind: 'quick', title: 'Penicillin',
    course: 'Microbiology · how an inhibition zone on one plate became a medicine',
    field: 'Biology', accent: '#4d7a3f',
    place: 'An interwar hospital inoculation department: the culture room and the broth room down one side of a corridor, the assay rack and the trial wall down the other.',
    hero: 'culture-room--doorway.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_germ', kind: 'quick', title: 'Germ Theory of Disease',
    course: 'Medicine and public health · how disease was shown to be caused by organisms',
    field: 'Biology', accent: '#3f6f8a',
    place: 'A Victorian court and the fever hospital behind it: one standpipe with forty households round it, and a ward and a laboratory hut ninety metres up the lane.',
    hero: 'pump--from-the-lane.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_mendel', kind: 'quick', title: 'The Laws of Inheritance',
    course: 'Genetics · how counting offspring revealed hidden units of inheritance',
    field: 'Biology', accent: '#4d7a3f',
    place: 'A monastery garden: two blocks of trial beds either side of the walk, a glasshouse where every flower is opened by hand, and a counting room with nothing growing in it.',
    hero: 'beds--from-the-walk.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_crispr', kind: 'quick', title: "CRISPR Gene Editing",
    course: 'Molecular biology · how a bacterial defence system became a way of editing genomes',
    field: 'Biology', accent: '#1f4f6b',
    place: 'A modern genome-editing institute: the genome room and the design desk down one side of a corridor, the editing bay and the sequencing queue down the other.',
    hero: 'corridor--from-the-entrance.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_oxygen', kind: 'quick', title: 'Oxygen and Combustion',
    course: 'Chemistry · how weighing what burned replaced a theory of what was lost',
    field: 'Chemistry', accent: '#7a5a2b',
    place: 'A 1770s pneumatic laboratory: a balance room and a furnace down one side of a corridor, a trough of gas jars and an accounting desk down the other. No electric light and no ceiling tiles.',
    hero: 'corridor--from-the-lodge.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_periodic', kind: 'quick', title: 'Periodic Table',
    course: 'Chemistry · how the elements were arranged so that the gaps meant something',
    field: 'Chemistry', accent: '#5a3b2a',
    place: 'An 1869 chemistry institute: a wall of numbered specimen drawers and a long card table down one side of a corridor, an analysis bench and a lecture hall down the other.',
    hero: 'card-desk--doorway.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_stroop', kind: 'quick', title: 'Stroop Effect',
    course: 'Cognitive psychology · how a reaction-time difference exposed an automatic process',
    field: 'Psychology', accent: '#5a4a7a',
    place: 'A 1935 reaction-time laboratory: a three-sided testing booth and a tabulation room down one side of a corridor, a chronoscope bench and a wall of eight hundred times down the other.',
    hero: 'testing-booth--doorway.png',
    level: 'high', grades: '9-12' },

  { id: 'qd_memory', kind: 'quick', title: 'False Memories',
    course: 'Cognitive psychology · how memory was shown to reconstruct rather than replay',
    field: 'Psychology', accent: '#7a4fa3',
    place: 'A memory and testimony unit: a study room and an event bay open to the corridor at the near end, two identical interview suites down one side and a data room down the other.',
    hero: 'bays--study-room.png',
    level: 'high', grades: '9-12' },

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
      kind: g.kind ?? 'course',
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
        // An edition of a Quick Discovery is still a Quick Discovery: the shape
        // of the session is the game's, not the reading level's.
        kind: g.kind ?? 'course',
      });
    }
  }
  return out;
}

// ------------------------------------------------------------------- kinds
//
// The first split a player makes is not the reading level, it is how long they
// have: a Course Adventure is a fortnight of working days, a Quick Discovery is
// nine stops in one sitting. Levels sit *inside* that, because a middle-school
// Quick Discovery and a middle-school fortnight are not the same offer, and a
// single level control mixed them into one list of thirty.
//
// `kind` defaults to 'course' on every row, so only the Quick Discoveries say
// what they are.
export const KINDS = [
  { id: 'course', label: 'Course Adventures',
    note: 'A fortnight of working days: walk to a place, read the evidence, answer for it, hand off before the clock runs out.' },
  { id: 'quick', label: 'Quick Discoveries',
    note: 'One sitting, ten to twenty minutes: establish the tool, meet the anomaly, make the claim.' },
];

/** The levels that actually have cards, coarsest first. */
export const LEVELS = [
  { id: 'elementary', label: 'Elementary' },
  { id: 'middle', label: 'Middle School' },
  { id: 'high', label: 'High School' },
  { id: 'university', label: 'University' },
];

/**
 * `kind` defaults to 'course', and four Quick Discoveries were shipped without it.
 *
 * The shelf groups by `kind`, so `qd_exo`, `qd_ligo`, `qd_cmb` and `qd_hubble`
 * sat among the forty-four Course Adventures and the Quick Discoveries section
 * read six of ten. Nothing was broken — every game built, every card rendered,
 * the count on the shelf was simply wrong, and it is the kind of wrong only
 * somebody looking at the page finds.
 *
 * The id prefix and `kind` are two descriptions of one fact, which is why they
 * drifted. This does not derive one from the other, because a Quick Discovery
 * that is not named `qd_*` should still be possible — it asserts they agree,
 * which is the cheap half and the half that would have caught this.
 */
for(const g of GAMES){
  const looksQuick = /^qd[_-]/.test(g.id);
  const saysQuick = g.kind === 'quick';
  if(looksQuick !== saysQuick){
    throw new Error(`games.js: "${g.id}" is ${saysQuick ? '' : 'not '}marked kind: 'quick' `
      + `but its id ${looksQuick ? 'is' : 'is not'} a qd_ one — the shelf groups by kind, `
      + 'so one of the two is wrong and the card will file under the wrong heading');
  }
}

export default GAMES;
