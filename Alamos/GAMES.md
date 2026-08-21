# The games, and how to pick any of them up cold

> New game? Start at [`README.md`](README.md), which names the two documents
> to read first — `gamekit/STORY_SPEC.md` then `gamekit/NEW_GAME.md`.

Nineteen playable games, one engine. Everything below is current as of the last
commit on `deep-watch-integration`. `CLAUDE.md` is the working manual — house
rules, the day model, editions and copy conventions. This file is the inventory.
**`GAME_IDEAS.md` is the games that do not exist yet** — the subject gaps and
the candidates worked up against them. **`STORIES.md` is what actually happens in each game** — the fifteen-day arc, so a
day can be checked against the story it belongs to. **`gamekit/STORY_SPEC.md` is
what a new game needs** before it is a game: the argument, the cast, the
timeline, the four beats of a day card, and how each is checked.

```sh
cd gamekit
npm run check                       # all seventeen themes: content, reachability, styles, world parity
THEME=<name> npm run dev            # every game: all of them live in gamekit/themes now
npm run shots <theme>               # a picture of every room, and a contact sheet
npm run traps                       # break every instrument trap; all 35 must fire
npm run drive <theme>               # open every live panel in Chrome, answer it right and wrong
```

| Game | Theme / dir | Subject and audience | The place, and why it looks unlike the others |
| --- | --- | --- | --- |
| **The Contaminated City** | `gamekit/themes/contamcity` | College chemistry. Chief Scientific Officer of a river city after a freight-yard fire | Riverton: a wide, bright, spread-out river city. Grid streets, boxy buildings, drivable trucks |
| **Deep Watch** | `gamekit/themes/deepwatch` | Reasoning under pressure; sonar, flooding, air, navigation | A submarine, and its **own world** (`themes/deepwatch/world.js`) — one line of ten compartments, hatches, no sky. Came from a separate engine |
| **Outbreak: Riverton** | `gamekit/themes/outbreak_riverton` | College biology — clinical, cell, molecular, immunology, epidemiology, One Health | A hospital campus in week three of an emergency: courtyards rather than streets, triage marquees, container labs, floodlight masts, a decon tunnel *on* the main route, a fence with one gate. One long hike north to the field station |
| **Bring Them Home** | `gamekit/themes/bring_them_home` | College physics — motion, circuits, thermal, waves, rotation, integration | Mission Control, its **own world** (`themes/bring_them_home/world.js`): one room, four tiers stepping down to a wall of plot boards. The teams are *rows*, not rooms. No doors — `stopNoun: 'a place'` |
| **Planetary Defense** | `gamekit/themes/planetary_defense` | Astronomy — discovery, astrometry, characterisation, radar, impact physics | A mountain ridge: one road, domes with open shutters, a 30 m radar dish, red service lamps, sites kilometres apart with an aircraft to reach them. Written as a nocturnal game and currently **overridden to daylight** — `look.dayWindow: [8, 20]`, with the night sky, fog and light rig still tuned for `[19, 31]` and one line away from coming back. Interiors use the `observatory` style |
| **Blackout** | `gamekit/themes/blackout` | Senior-high / first-year electrical engineering — AC power, transmission, protection, load | Calder Switching Station: a flat graded river plain, a switchyard of gantries and transformers, and two circuits of lattice towers walking off the map. Nothing else in the set has a skyline of steel |
| **Aftershock** | `gamekit/themes/aftershock` | Seismology and structural engineering. Building Safety Coordinator, Kestrel Bay, three days after | **Two** places on one map, and the same earthquake treated them differently: Upper Town on a granite bench, mostly standing; the Flats on hydraulic fill, liquefied, with sand fans and a block sitting over at eight degrees. Between them the Kestrel Fault broke the surface, and the player walks a 1.8 m scarp with a road and a fence offset across it. The site effect lesson is drawn on the ground |
| **Quantum** | `gamekit/themes/quantum` | Modern quantum through the hardware. Group Lead, Ridgeway Quantum Laboratory | An interior spine that is a **temperature gradient**, walked: deliveries and offices at the warm south end, then fabrication, the fridge hanging open with its stages exposed, the microwave rack wall, and a magnetically shielded room at the cold end. Interior and industrial at once — metal and cable rather than architecture |
| **The Trial** | `gamekit/themes/the_trial` | AP Statistics — experimental design and inference — carried through a running clinical trial. Methodology & Operations Lead, CLARION-3 | One long floor, and the walk down it is distance from the patient: screening and infusion at the south end, then monitoring, the central lab, adjudication, and the data floor with the enrolment wall at the north. The corridor is a gradient in evidence, the way Quantum's is a gradient in temperature |
| **Ice Core** | `gamekit/themes/icecore` | Earth and environmental science, with the measurement half of a palaeoclimate course. Season Science Lead, Vestri Dome | A deep-drilling camp on a high polar plateau: six modules on legs beside a groomed route, flag lines on both sides of it, a trench dug into the snow with a tower over it, and a stake array two kilometres out. The flattest, emptiest horizon in the set — the skyline ranks are seven metres high at six hundred metres out, and there is nothing else on it |
| **Headwater** | `gamekit/themes/headwater` | Calculus, through a reservoir that has to be drawn down before it rains. Includes DERIVE, the twentieth instrument: build a result line by line, each line naming the rule it used | A five-storey tower in a gorge beside the dam. The whole east side is one floor-to-soffit glazed screen onto the spillway, and the hallways and stairs have **no ceiling at all** — you look up the shaft to the sky, open-air-mall fashion. Only the offices and labs are roofed |
| **Wellmere** | `gamekit/themes/seedbank` | AP Biology, the half a hospital campus cannot reach: heredity, population genetics, selection, plant energetics. Season Lead, Wellmere, Saltmere Point | **The layout is the syllabus, and the quantity is isolation distance.** A breeding station on a headland, laid out in concentric rings by how far pollen travels: the crossing block alone at the centre, an empty buffer, the increase ring, another buffer, the trial ring in arcs, and the compound out on the neck. Sea on three bearings — the sea *is* the isolation — and one causeway south to a gate, which is also the only bearing contamination can arrive on. The plots curve, which nothing else in the set does |
| **Red Sand** | `gamekit/themes/redsand` | AP Chemistry, the back half of the course The Contaminated City leaves alone: kinetics, equilibrium, electrochemistry, entropy and free energy, phase behaviour, colligative properties. Propellant Lead, Arcadia Rise | A propellant plant on Mars, and the only place in the set on another planet. Nine modules buried to the eaves in regolith along one graded track, an ascent vehicle standing on a pad four hundred metres past the last of them with a propellant gauge up its side that fills as the campaign does, six hundred solar panels with the swept third legible from the road, and a butterscotch sky the engine had to be taught to draw. **The geography is the process**: walking the site from the spawn to the pad walks one carbon atom through the whole plant, in order |
| **Yellow Bay** | `gamekit/themes/yellowbay` | AP Chemistry, the structure half neither chemistry game teaches: atomic structure and photoelectron spectroscopy, Coulombic attraction and ionisation energy, periodic trends, Lewis structures and VSEPR, bond enthalpy, the four kinds of solid, doping and semiconductors, surface chemistry. Process Integration Lead, Ardley Fab 7 | Ardley Fab 7, and the third theme in the set to bring its own world: **two parallel gowned wings joined at the far end by a glazed crossing whose floor is glass over the subfab**, so carrying a lot between them means walking over the pumps, the abatement and six hundred metres of gas line. The litho end is lit amber because the coating in there answers to blue and shorter. **The route is the syllabus** — down the process wing, across the glass, back up the analysis wing |
| **Safety Factor** | `gamekit/themes/midway` | AP Physics 1, all eight units, taught through derivations: kinematics, dynamics, circular motion, energy, momentum, simple harmonic motion, torque and rotation, fluids. Ride Engineer, Corbin Park | A closed lakeside amusement park three weeks before it tries to reopen, and **the rides are the areas**: the drop tower is kinematics, the coaster is energy, the wheel is torque, the flume is fluids. The skyline is machines rather than buildings — a 26 m lift hill and a vertical loop swept along a spline, a 28 m Ferris wheel, a 45 m drop tower, a pirate ship — with boarded stalls, two car parks, a ticket line and billboards between them |
| **Sightline** | `gamekit/themes/sightline` | AP Psychology, all five units, taught as the method of a conviction review: sensation and perception, memory, development and learning, social psychology, and the health unit reached through procedure rather than diagnosis. Review Analyst, Hallam Conviction Integrity Unit | A 1960s telephone exchange with the switch floor taken out: one hall 54 m long, rooms down both sides. **The hall is the sightline** — the Ferrier Street corner is rebuilt across the south end at 1:1, shopfront, doorway, kerb and a dark lamp column, and the identification distances are let into the corridor floor running away from it. Two of the marks are the case: the 22 m the file asserted for seven years, and the 34 m the ground gives. Walking north is walking away from the doorway |
| **Ground Truth** | `gamekit/themes/groundtruth` | AP Physics C: Electricity & Magnetism, all five units, taught as derivations — Gauss, the potential integral, capacitance, stored energy, Ampère, flux and Faraday, self-inductance, the RC transient and a Marx bank. Measurements Lead, Station 12 | A rocket-triggered lightning research station on a coastal salt flat. A 60 m instrumented mast alone on the skyline with three shunts down its conductor, a launch rail out to the north, an impulse hall, a grounding grid open in a trench, and an outstation trailer 200 m away that the campaign is about. The sky is weather rather than climate: `atmosphere.tint` and `atmosphere.haze`, added for Mars, used here for an anvil |
| **Project Y** | `gamekit/themes/projecty` | Los Alamos 1943–45, five divisions | Outdoor mesa, timber and gabled, pre-computer — chalkboards and typed sheets, no screens anywhere. The last game to lose its own entry point: `project-y-fps/` is a tombstone now |
| **Hospital Heroes** | `gamekit/themes/hospital` | ~grade 3–4. Junior doctor, children's hospital | Interior ward: a spine with rooms off it, and the floor `engine/world/interiorSite.js` was generalised out of. `audience: { grade: 2 }`, so its whole interface comes up 1.18× larger |

**Three games were built for the three largest uncovered AP courses**, in August
2026. Each place was chosen to solve a specific problem the course has in a
first-person game:

| Game | Where | The place, and why it is that place | Run it |
| --- | --- | --- | --- |
| **Carrying Capacity** | `gamekit/themes/carrying` | Vellan Island: ninety-one people, one borehole, one cable, one tip. AP Environmental Science, all nine units. **On an island every budget closes** — the water is what fell on it, the fish are what the boats did not take, the waste stays. A mainland site lets a student assume an elsewhere for every quantity | `THEME=carrying npm run dev` |
| **Ghost Light** | `gamekit/themes/ghostlight` | The Ellery Variety Theatre, dark eleven years, opening in a fortnight. AP Precalculus, all four units. **Every family of function is a piece of equipment**: the board is polar and matrices, the pit is sinusoids and logarithms, the box office is a rational function with a real asymptote, the fly floor is vectors | `THEME=ghostlight npm run dev` |
| **Changeover** | `gamekit/themes/changeover` | Halvern Central Station, commandeered for a currency changeover. AP Macroeconomics, all six units. **Macro is national, aggregated and invisible**; a changeover makes every quantity local for a fortnight — the money supply is a mass on a parcels scale, the multiplier is a column in a ledger, the rate is set forty metres from the queue it lands on | `THEME=changeover npm run dev` |

All three compute every equation on their own syllabus: 17/17, 16/16 and 16/16.

**Three of these ship a high-school edition on the same world**, because their
setting is a workplace and a workplace runs on the professional layer of its
subject — see `gamekit/RETARGET_PASS.md`. Same place, same cast, same grade, a
different course:

| Edition | Course | Where the base game sits |
| --- | --- | --- |
| `deepwatch_hs` | AP Physics 2, all seven units | naval and acoustics engineering |
| `contamcity_hs` | AP Chemistry, the aqueous half — and the only game in the set that teaches acids, buffers and titration | first-year analytical chemistry |
| `the_trial_hs` | AP Statistics, all nine units | clinical epidemiology and biostatistics |

All three compute every equation on their own syllabus. Four of the seven
university games were considered and rejected; the reasons are in that file.

A seventeenth theme, `instruments`, is registered and checked but is not a game:
four missions authoring one stop of each instrument format, so a panel can be
opened without playing to the day that holds it.

Every game is 15 missions and 57–62 stops, except the harness. Roster sizes run
from 11 (Wellmere) to 37 (Hospital Heroes).

Sightline is the first of them to compute **every** equation on its own syllabus
list — seven of seven, none merely mentioned — and the first to author six
instrument formats (ATTEST, PROBE, TRACE, CLOUD, CONTROL, INJECT) rather than
nought, one or two. Neither is a coincidence: psychological method is
measurement of people, and half the instrument catalogue was already that.

Ground Truth is the derivation game. Ten of its forty-five stops are DERIVE
panels, one a day, and they carry the syllabus rather than decorating it: eleven
equations, all eleven computed. It is also the only game with `askRule: true`,
because in E&M the choice of law is the physics — a step whose key uses
superposition while a distractor applies Gauss to a surface with no symmetry is
the commonest way that exam is lost.

## What they all share

One loop, in `gamekit/engine/`: fifteen missions, each **one working day** with a
countdown budgeted from the actual route; three authored stops plus a callback
from day 3; take them in any order. A wrong call is a penalty box: the stop
shuts for an hour of game time and reopens by itself, or $10 buys another
attempt now. Run out of the day and it restarts.

Question formats, in three sets. The ones the player **reads**: PROTOCOL,
SEQUENCE, BALLPARK, SCIENCETANK, DIAGNOSIS, TRIAGE, CASEBOOK, CHOICE. The ones
they **operate**: SWEEP, HOLDOUT, TALLY, PROBE — one control and a trace the
player builds by looking. And twelve more in `engine/core/instruments.js`, which
came out of counting what six games' worth of interaction documents actually ask
for: TRIGGER, VALUE, CLOUD, ALLOCATE, TRACE, ATTEST, CONTROL, TRIANGULATE,
DEGENERACY, CHAIN, BALANCE, VERIFY. `gamekit/FORMATS.md` is that catalogue.

**The twelve are built and none of the ten games authors one.** Only
`books/instruments.yml` does, one stop each. The operated four are barely better
off: Quantum has six SWEEPs and one each of HOLDOUT, TALLY and PROBE, Blackout
has one SWEEP, and the other eight games have none. That is content work rather
than engine work, and it is the largest single thing left.

Three worlds satisfy the world contract — `engine/world/outdoorTown.js`,
`engine/world/interiorFloor.js`, and a theme's own. **A game's silhouette comes
from its world module**: two themes on the same world look alike whatever the
palette does, which is why the distinctive ones either brought their own world
or carry a props layer heavy enough to change the shape of the space.

## Where a game's content lives

**Every game is one book file** plus the place, and that is now true of all ten:
`gamekit/books/` holds `contamcity.yml`, `project-y.yml`, `hospital.yml`,
`deep-watch.yml`, `outbreak-riverton.yml`, `bring-them-home.yml`,
`planetary-defense.yml`, `blackout.yml`, `aftershock.yml`, `quantum.yml`, plus
`instruments.yml` for the harness. Re-import after editing:

```sh
node tools/import-book.mjs books/<name>.yml <theme> --verify
```

The book carries the areas, the cast and their bios, every mission and stop, the
estimate specs, the glossary, what is inside each room, and what each place
says. It does **not** carry the place (`site.js` / `plan.js`) or the props —
those are code. `tools/BOOK_TEMPLATE.md` is the format.

The three games that predate the format were converted with
`tools/export-book.mjs`; their `src/*.js` content files are one-line doors onto
the generated `content/`, and `bookParity` inside `npm run check` fails if any
book stops regenerating what its game ships. All eleven pass.

## Starting a sixteenth

```sh
npm run new-theme <name>                 # a town
npm run new-theme <name> -- --interior   # a floor
```

It scaffolds, imports a starter book and registers the theme, so
`npm run check <name>` is green and the game is walkable before you write
anything. Then replace `book.yml`. Full runbook: `gamekit/NEW_GAME.md`.

## What is still unfinished

- **One world fork left: the hospital's.** It builds its place by hand though it
  declares a site as data. Project Y came across — `src/world.js` is a 120-line
  adapter over `engine/world/outdoorTown.js` and `worldParity` reports its world as
  generated from site data. Its pine forest, ground scatter and lamp positions are
  still code rather than data; `src/env.js` is down from 640 lines to 244, the rest
  having been the sky, terrain, roads and ridges the engine took over.
- **Two entry points.** Project Y and the hospital keep their own `main.js`,
  `index.html` and stylesheet fork. A feature added to one reaches one game —
  this has caused real bugs; grep all three before calling a change done.
- **Question renderers are not pluggable** — a hospital TRIAGE screen and a Los
  Alamos one both live in `questionUI.js`. The twelve newer formats do not have
  this problem: they register in `engine/core/instruments.js` with
  `{ html, bind, verdict, facts, tag }` and reach the game only through the
  `ctx.commit` they are handed.
- **The instruments are nearly unauthored by the shipped games.** Red Sand
  authors one — an ALLOCATE on its dust-storm sol, which `npm run drive redsand`
  exercises — and the other fourteen games author none. The engine, the importer
  traps and the two harnesses (`npm run traps`, `npm run drive`) are done; the
  questions are not written.
- **Engine vocabulary** still says `divisions`, `budget`, `Director funds`.
- **`STORIES.md` is behind** — Aftershock and Quantum are still not in it. A day
  cannot be checked against an arc that is not written down; Red Sand is.
- **Quantum still ships the scaffold's placeholder site name** —
  `site: { kind: 'interior', name: 'Replace with the name of this place', plan }`
  in `themes/quantum/theme.js`. The place is called the Ridgeway Quantum
  Laboratory everywhere else in the game.
- Screenshot coverage is no longer a manual walk: `npm run shots <theme>` renders
  every viewpoint in headless Chrome and writes a contact sheet. What is still
  true is that the far ends of the newer places — Outbreak's field-station hike,
  the radar dish up close, Mission Control's glass gallery — have been rendered
  more often than they have been played.

## The two rules that cost the most time here

1. **Screenshot before believing anything visual.** Every graphics bug in this
   repo passed every assertion available. And a background tab gets no
   `requestAnimationFrame`: the scene renders dark, the sun never moves, and
   every interaction looks broken whether it is or not. Check
   `document.visibilityState`, and drive `updateCrowd` / `updateTimeOfDay` by
   hand from `window.<theme>` when testing a throttled tab.
2. **Measure the thing being judged.** Reading level, scene length, map scale,
   people standing in walls — each was argued about until it was counted, and
   the count was worse than anybody guessed.
