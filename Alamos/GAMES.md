# The games, and how to pick any of them up cold

> New game? Start at [`README.md`](README.md), which names the two documents
> to read first — `gamekit/STORY_SPEC.md` then `gamekit/NEW_GAME.md`.

Nineteen playable games plus the first of the shorter **Quick Discoveries**, one
engine. Everything below is current as of the last
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
| **Ghost Light** | `gamekit/themes/ghostlight` | The Ellery Variety Theatre, dark eleven years, opening in a fortnight — its own world: nine hundred seats on a four-tier rake, a fly tower over a walkable stage, and six offices round the scene-dock yard behind the house. AP Precalculus, all four units. **Every family of function is a piece of equipment**: the board is polar and matrices, the pit is sinusoids and logarithms, the box office is a rational function with a real asymptote, the fly floor is vectors | `THEME=ghostlight npm run dev` |
| **Changeover** | `gamekit/themes/changeover` | The top four floors of Kesteven House, Halvern, commandeered for a currency changeover. AP Macroeconomics, all six units. **Macro is national, aggregated and invisible**; a changeover makes every quantity local for a fortnight — the money supply is a mass on a platform scale, the multiplier is a column in a ledger — and a hundred and eighty metres up it makes them *visible*: the queue is on the plaza below the window, Vend Street is two thirds of the basket, the port is the current account. Four floor plates on one footprint, joined by a lift you choose a floor in | `THEME=changeover npm run dev` |

All three compute every equation on their own syllabus: 17/17, 16/16 and 16/16.

**Three more close gaps *inside* courses the set already claimed**, in August
2026. Each is a half-course the existing games could not reach:

| Game | Where | The gap it closes | Run it |
| --- | --- | --- | --- |
| **Slack Water** | `gamekit/themes/slackwater` | Sarn Barrage: six sluice gates across the neck of an estuary, mudflats at low water, a training wall running out into the channel and a station three hundred metres along it. **AP Calculus BC, the half Headwater stops before**: parametric, polar and vector-valued functions, series and convergence, and the integration techniques the second term adds. The place was chosen because a tide *is* a truncated series — the argument of the campaign is whether a prediction with a stated bound may be acted on | `THEME=slackwater npm run dev` |
| **Overwind** | `gamekit/themes/overwind` | Kerrow No. 3: a 32 m headframe over a 1,240 m shaft, alone on a moor, the winding rope crossing the yard at head height. **AP Physics C: Mechanics, taught as derivations** — the twin paper Ground Truth's E&M game left open. A mine hoist is the one machine where rotation, a rope that weighs more than its load, an oscillation with a period of its own and gravitation measured at depth are all the same object | `THEME=overwind npm run dev` |
| **Dark Fibre** | `gamekit/themes/darkfibre` | Pellow Head: a low concrete landing station in the dunes where a submarine cable comes ashore, and a radiography bay three hundred metres out because a gamma source is separated by distance rather than by lead. **AP Physics 2's optics and modern half**, which `deepwatch_hs` could only retrofit onto a submarine at four concepts and three. Every question in a landing station is *what is the light doing in the glass* | `THEME=darkfibre npm run dev` |

All three lean on DERIVE far harder than anything before them: **twelve of
thirty-six stops each, one a day**, against Ground Truth's ten of forty-five, and
all three run `askRule: true`. All three compute every equation on their own
syllabus — 12/12, 13/13 and 12/12 — and all three are two-tier sites, so the far
lap and the vehicles come out on day 4.

What is unfinished in the three, as shipped: **the concept takeaways are written
for the twelve concepts each DERIVE spine claims and not for the other twenty**,
so those cards show the Background door and no Key concept door; none of the
three has an interiors props layer of its own, so their rooms are the shared
fit-out; and the places are photographed only in part. What the screenshots
already bought is the argument for taking them: a wall station standing in the
estuary up to the crew's shoulders, because a water rectangle spans the whole
width of a map and the shoreline is therefore the same line everywhere; three
roads rendering as sheet ice, because `pathTexture`'s base is a light grey and the
decal's material has no `envMapIntensity` cap; a change house parked between the
spawn and the headframe, which is house rule 8 about the view rather than the
route; and a hundred shadow-casting lattice members that put the first frame
minutes away on a machine with no GPU. All four passed every check in the repo.
What is still unphotographed: Kerrow No. 3's drum and gravity station, and Pellow
Head's dune crest and radiography bay.

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

## A shorter shape: the Quick Discoveries

`great_discoveries_first10_expanded.docx` specifies ten discoveries on one
spine — **three levels, three micro-games each** — as a ten-to-twenty minute
"you are in the discovery" session rather than a fortnight of shifts. That
maps onto this engine without a second day model: a level is a day, a
micro-game is a stop, and the campaign is nine stops in one sitting.
`dayNoun: 'Level'` is the only thing the engine needs told.

**All ten are built.** Each is nine stops, three levels, every equation on its own
syllabus computed by a question, and every one green on all twenty-six checks.

| # | Game | Where | Subject, and the shape of the three levels | Run it |
| --- | --- | --- | --- | --- |
| 01 | **The Only Shape That Fits** | `themes/qd_dna` | Biology. What chemistry forbids before any photograph exists; what a diffraction pattern will and will not settle; the model no clue rules out | `THEME=qd_dna npm run dev` |
| 02 | **Too Faint** | `themes/qd_accel` | Astronomy. What a Type Ia is worth as a ruler; fainter than a universe of matter allows; say only what the data will carry | `THEME=qd_accel npm run dev` |
| 03 | **The Impossible Bounce** | `themes/qd_nucleus` | Physics. Commit to what the accepted atom permits; count the band it forbids; explain the dull majority and the ten exceptions at once | `THEME=qd_nucleus npm run dev` |
| 04 | **One Moving System** | `themes/qd_tectonics` | Earth science. What the continents alone will carry; the mechanism ten years of ships supplied; one framework over seven files | `THEME=qd_tectonics npm run dev` |
| 05 | **Is the Bump Real** | `themes/qd_higgs` | Particle physics. What would count as evidence and where to look; detector layers to a mass distribution; significance, and the claim July 2012 could carry | `THEME=qd_higgs npm run dev` |
| 06 | **Twice the Old Number** | `themes/qd_eclipse` | Physics. Two predictions a factor of two apart; registration, direction and which error dominates; what the band separates and what may be said | `THEME=qd_eclipse npm run dev` |
| 07 | **Something Is Pulling** | `themes/qd_exo` | Astronomy. An orbit inferred from motion nobody can see; a size, and the impostors that fake one; mass, radius, tilt and what may be called what | `THEME=qd_exo npm run dev` |
| 08 | **The Chirp** | `themes/qd_ligo` | Physics. What the instrument listens for and everything else it hears; a shape, a cause and a second site; masses, missing mass, and what a match supports | `THEME=qd_ligo npm run dev` |
| 09 | **The Noise That Would Not Go** | `themes/qd_cmb` | Cosmology. An engineering problem that will not go away; a shape, a temperature, and what is not yet known; a framework, a cooling law and one explanation | `THEME=qd_cmb npm run dev` |
| 10 | **No Middle To It** | `themes/qd_hubble` | Astronomy. A ladder and everything that makes it lie; a shift, a pattern and which axis limits everything; a slope, a time, and where the middle is | `THEME=qd_hubble npm run dev` |

**They are written for grade 9, not AP, and every card teaches its method before
it asks anything.** That is the one thing about the set that came from playing it
rather than from checking it: the first two were authored at the parent games'
grade 11, and the questions were too hard for a nine-stop session somebody arrives
at cold. Two grades down, and a rule — every stop's `guide` says in plain words
what the move is, and the first `background` paragraph works the same move on
*different numbers*. Different numbers deliberately: a worked example on the
question's own numbers is the answer with a label on it, and `probeQuestions`
would fail it and should. All ten opening cards were rewritten the same way, mystery
first: what is unexplained, what it would mean if it held, and then the job.

**Two of them are outdoors, and the subject decided which.** An eclipse expedition
is a camp pitched on a plain with a clear horizon and half of what makes it hard is
that it is a camp; a twenty-foot horn antenna on a hill above a road is the whole
reason the first explanation offered was pigeons. Neither survives being moved into
a corridor, so both are `outdoorTown` from a site.js. The other seven new ones are
`interiorSite` from a plan.js, which is the cheap and checked way to bring a
building — `placement` can fire rays at it and every fixture goes up through
`interiorKit`.

**Format diversity is per campaign and it is the point.** The source book specifies
nine *different* interactions per discovery, so a campaign of nine multiple choices
is exactly what it is written against. Every one of the ten carries seven or eight
distinct answer formats in nine stops, no format over the cap, and at least one
instrument the player drives. Across the set that is twenty formats: CHOICE,
BALLPARK, PROTOCOL, SEQUENCE, VALUE, ALLOCATE, DIAGNOSIS, ATTEST, TRACE, CHAIN,
BALANCE, CONTROL, VERIFY, PROPAGATE, DEGENERACY, TRIANGULATE, RESIDUAL, SWEEP,
PROBE and HOLDOUT — and TRIANGULATE's instance in `qd_tectonics`, three
continents' ice-scratch bearings crossing on one ancient pole, is the first that
format has had in a game rather than in the instrument harness.

The place is `themes/bring_them_home`'s, **copied rather than imported** — this
is not an edition, because the course, the cast, the areas and the length all
differ, and `edition-of:` would put `editionParity` in front of every one of
those changes. What was reskinned is the palette, the boards, the console groups
and everything printed on a wall; the geometry is untouched, so the copied props
and world still line up with the copied site. Cerro Vela Survey Operations: an
analysis floor stepped down to a wall of plot boards, a ring corridor behind it,
two rooms off that, and forty-five metres of the north leg carrying **the
measurement chain as one drawing** — the event, the sky, the telescope, the
instruments, the frames, the light curve, the standardisation, the diagram, so
walking the hallway walks one photon from a supernova to a point on the plot.

Three things the reskin got wrong and only a screenshot said so, all fixed:
the north leg was still carrying the donor's **launch vehicle in elevation**,
which is the largest piece of wall art in the building and about the wrong
subject entirely; the three plot boards — LIGHT CURVES, HUBBLE DIAGRAM,
RESIDUALS — were rendering **one identical progress readout each** (`instrumentScreen`
had no plot face until this game needed one, and now the diagram is sealed on
level 1, carries the sample against gravity alone on level 2, and puts both
histories up on level 3); and the middle board was 5.8 m tall on a 2.4 m base
under a 7.2 m ceiling, so **a metre of it was inside the soffit and the metre
holding its title**. Nothing else in the set is a reskin: the other nine bring their
own place, which is why none of those three defects could recur in them.

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
