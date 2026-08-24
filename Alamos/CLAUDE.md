# Alamos — mission-based learning games

Twenty-five first-person, mission-driven educational games on three.js, plus the shared
engine they run on. Each is the same loop in a different setting: missions × stops,
walk to a place, answer a science question, hand off. No combat, no weapons.

## Which document to read

| Document | What it is |
| --- | --- |
| `README.md` | Landing page. Names the two documents to read first, and the order. |
| `GAMES.md` | The inventory — all nineteen games, what each teaches, where its content and place live, what is unfinished. Read first if picking this up cold. |
| `gamekit/NEW_GAME.md` | How to build one, in order: decide the course, scaffold, write the book, build the place, meet the writing bar, meet the question bar, check and print. Carries the bar each step clears and the checker that enforces it. |
| `GAME_IDEAS.md` | What to build next — subject gaps across the nineteen, candidates worked against them. |
| `gamekit/STORY_SPEC.md` | The story contract: what a campaign needs beyond correct content, and the checker for it. |
| `gamekit/THEME_CONTRACT.md` | **Read before touching world code.** Short; every rule in it cost hours. |
| `gamekit/INTERIORS.md` | **Read before working inside a place.** The check-and-look loop, which builder each game's rooms come from (three are furnished outside the shared fit-out), and the mistake made four times. |
| `gamekit/SEQUENCING_PASS.md` | How to fix *when* a shipping game teaches each idea — leave every question where it is, put the concepts in a followable order. Price of admission is `t` on a syllabus concept: 64 of 724 today, so it is 26,000 words of curriculum prose, not an engine project. |
| `gamekit/REWRITE_PASS.md` | How to re-author a shipping game: a parallel edition at the same grade, sandboxed, with the delivery snapshot as invariant and a teardown costing one `rm -rf` and three reverted lines. Trigger is equations the course never computes, never format mix. |
| `gamekit/RETARGET_PASS.md` | How to point one game's world at a **different course** — same place, same cast, same grade, a new syllabus. The three high-school editions of university games came from it, and the test is whether the place can host a whole AP syllabus rather than whether the course is hard. |
| `gamekit/DIVERSITY_PASS.md` | The format-cap pass. |
| `gamekit/QUESTION_BRIEF.md` | The card shape every stop is rewritten to. |
| `gamekit/FORMATS.md` | The instrument catalogue. |
| `gamekit/ARCADE.md` | The fun-first formats, and why FLOW as specified should not be one. |
| `gamekit/MIDDLE_SCHOOL_EDITIONS.md` | The junior-edition plan. |
| `gamekit/FOURTH_GAME.md` | The plan the Project Y flip came from. |

## The twenty-five games, and the ten Quick Discoveries

`GAMES.md` is the full inventory. This is the place, and the command.

| Game | Where | The place, and why it looks unlike the others | Run it |
| --- | --- | --- | --- |
| The Contaminated City | `gamekit/themes/contamcity/` | Riverton: a wide, bright river city. College chemistry | `THEME=contamcity npm run dev` |
| Deep Watch | `gamekit/themes/deepwatch/` | A submarine — its own world, one line of compartments | `THEME=deepwatch npm run dev` |
| Outbreak: Riverton | `gamekit/themes/outbreak_riverton/` | A hospital campus in week three: courtyards, triage marquees, container labs, a decon tunnel on the main route, a fence with one gate | `THEME=outbreak_riverton npm run dev` |
| Bring Them Home | `gamekit/themes/bring_them_home/` | Mission Control — its own world. One room, four tiers stepping down to a wall of plot boards; the teams are rows, not rooms | `THEME=bring_them_home npm run dev` |
| Planetary Defense | `gamekit/themes/planetary_defense/` | A mountain ridge, played entirely at night: one dark road, domes, a radar dish, red service lamps | `THEME=planetary_defense npm run dev` |
| Blackout | `gamekit/themes/blackout/` | Calder Switching Station: a flat river plain, a switchyard, lattice towers walking off the map. Senior-high electrical engineering | `THEME=blackout npm run dev` |
| Aftershock | `gamekit/themes/aftershock/` | Kestrel Bay three days after: granite bench above, liquefied fill below, and a 1.8 m fault scarp walked between them | `THEME=aftershock npm run dev` |
| Quantum | `gamekit/themes/quantum/` | An interior spine that is a temperature gradient, walked warm end to cold | `THEME=quantum npm run dev` |
| The Trial | `gamekit/themes/the_trial/` | One long floor of a coordinating centre; the walk down it is distance from the patient. AP Statistics | `THEME=the_trial npm run dev` |
| Ice Core | `gamekit/themes/icecore/` | A deep-drilling camp on a polar plateau: modules on legs, flag lines, a trench under a tower | `THEME=icecore npm run dev` |
| Headwater | `gamekit/themes/headwater/` | A five-storey tower in a gorge beside a dam: one glazed wall onto the spillway, no ceiling over the hallways. Calculus | `THEME=headwater npm run dev` |
| Wellmere | `gamekit/themes/seedbank/` | A breeding station on a headland, in concentric rings by isolation distance; sea on three sides, one causeway. AP Biology, heredity half | `THEME=seedbank npm run dev` |
| Safety Factor | `gamekit/themes/midway/` | Corbin Park: a shut amusement park, and the rides are the syllabus — tower, coaster, carousel, wheel, bumper floor, ship, flume. AP Physics 1, in derivations | `THEME=midway npm run dev` |
| Red Sand | `gamekit/themes/redsand/` | A propellant plant on Mars: modules buried in regolith along one track, an ascent vehicle whose gauge fills as the campaign does, a butterscotch sky. AP Chemistry, back half | `THEME=redsand npm run dev` |
| Yellow Bay | `gamekit/themes/yellowbay/` | Ardley Fab 7 — its own world: two parallel gowned wings joined by a glass crossing over the subfab, the litho end lit amber. AP Chemistry, the structure half | `THEME=yellowbay npm run dev` |
| Sightline | `gamekit/themes/sightline/` | The Hallam Exchange: one hall with the Ferrier Street corner rebuilt across the end, identification distance painted on the floor. AP Psychology | `THEME=sightline npm run dev` |
| Ground Truth | `gamekit/themes/groundtruth/` | Station 12, Sablon Flats: a salt flat, a 60 m instrumented mast, a storm season. AP Physics C E&M, ten derivations | `THEME=groundtruth npm run dev` |
| Carrying Capacity | `gamekit/themes/carrying/` | Vellan Island: a low maritime island, ninety-one people, the sea on the horizon from the road. AP Environmental Science | `THEME=carrying npm run dev` |
| Ghost Light | `gamekit/themes/ghostlight/` | The Ellery — its own world: nine hundred seats on a four-tier rake, a walkable stage under a fly tower, and six offices round the scene-dock yard behind the house. AP Precalculus | `THEME=ghostlight npm run dev` |
| Changeover | `gamekit/themes/changeover/` | Kesteven House, floors 45–48: four floor plates on one footprint, glass on four sides, a lift you choose a floor in, and the city the numbers are about out of every window. AP Macroeconomics | `THEME=changeover npm run dev` |
| Slack Water | `gamekit/themes/slackwater/` | Sarn Barrage: an estuary neck with six sluice gates, mud at low water, a training wall 300 m out. AP Calculus BC, the parametric, polar and series half | `THEME=slackwater npm run dev` |
| Overwind | `gamekit/themes/overwind/` | Kerrow No. 3: a 32 m headframe over a 1,240 m shaft, alone on a moor. AP Physics C: Mechanics, in derivations | `THEME=overwind npm run dev` |
| Dark Fibre | `gamekit/themes/darkfibre/` | Pellow Head: a low landing station in the dunes, a manhole above the tide line, a radiography bay 300 m out. AP Physics 2, optics and modern | `THEME=darkfibre npm run dev` |
| Project Y | `gamekit/themes/projecty/` | Los Alamos 1943–45, outdoor mesa | `THEME=projecty npm run dev` |
| Hospital Heroes | `gamekit/themes/hospital/` | Children's hospital, interior, ~grades 3–4 | `THEME=hospital npm run dev` |
| Too Faint | `gamekit/themes/qd_accel/` | **A Quick Discovery, not a fortnight**: Cerro Vela Survey Operations, an analysis floor facing a wall of plot boards. Astronomy and cosmology | `THEME=qd_accel npm run dev` |
| The Only Shape That Fits | `gamekit/themes/qd_dna/` | A 1950s structural biology unit: chemistry and the model room down one side of a corridor, X-ray and an evidence wall down the other. Biology | `THEME=qd_dna npm run dev` |
| The Impossible Bounce | `gamekit/themes/qd_nucleus/` | A 1910 physics laboratory: the apparatus down one side, the counting and the argument down the other, a gold leaf in a vacuum between them. Physics | `THEME=qd_nucleus npm run dev` |
| One Moving System | `gamekit/themes/qd_tectonics/` | A postwar survey section: the land evidence one side, ten years of ships the other, and thirty feet of continents on pins. Earth science | `THEME=qd_tectonics npm run dev` |
| Is the Bump Real | `gamekit/themes/qd_higgs/` | A collider analysis floor: a theory wall, a dark event-display room, ten metres of histogram. Particle physics | `THEME=qd_higgs npm run dev` |
| Twice the Old Number | `gamekit/themes/qd_eclipse/` | **Outdoors**: an eclipse camp on a red dust plain — two coelostats out on the flat, a light-tight plate hut, one wire to the coast. Physics | `THEME=qd_eclipse npm run dev` |
| Something Is Pulling | `gamekit/themes/qd_exo/` | A planet search floor: a spectrograph one side, a month of light curve on the wall of the other. Astronomy | `THEME=qd_exo npm run dev` |
| The Chirp | `gamekit/themes/qd_ligo/` | An interferometer corner station: a beam splitter with two metre-wide tubes leaving through the wall at right angles. Physics | `THEME=qd_ligo npm run dev` |
| The Noise That Would Not Go | `gamekit/themes/qd_cmb/` | **Outdoors**: a hilltop radio site — a twenty-foot horn inside a ring of ground shielding, a receiver hut under it. Cosmology | `THEME=qd_cmb npm run dev` |
| No Middle To It | `gamekit/themes/qd_hubble/` | A 1920s mountain observatory: years of glass in drawers one side, a spectrograph on its own pier the other, one plot at the end. Astronomy | `THEME=qd_hubble npm run dev` |

**A Quick Discovery is nine stops in one sitting, and needs no second day model.**
`great_discoveries_first10_expanded.docx` specifies ten discoveries on a 3 × 3
spine — establish the tool, meet the anomaly, make the claim — as a ten-to-twenty
minute session. A level is a day, a micro-game is a stop, `dayNoun: 'Level'`, and
every gate in the repo reads it unchanged: all ten are green on all of them at
three days and nine calls. What it did need was one honest number on the shelf —
both front doors printed "days" for the fifteen themes that call a day something
else, and `sizeOf` counted the WARMUPS array's seven titles as seven more days, so
**every card overstated its own campaign by the number of warm-ups** (Blackout's
fifteen read as twenty-two). `tools/themeFacts.js` is the one description of what
is read back off a theme now, because `gallery.mjs` and `sync-casebook.mjs` had
their own copy of all five readers and the copies had drifted into being wrong in
the same way.

**A reskin of another game's place is a copy, not an edition** — the course, the
cast, the areas and the length all differ, and `edition-of:` would put
`editionParity` in front of every one of those differences. What that costs is
that nothing checks the reskin, and three things came across from Bring Them Home
that only a screenshot found: forty-five metres of corridor still carrying **a
Saturn V in elevation**, the three plot boards rendering **one identical progress
readout each**, and the middle board's title bar **inside the soffit** because a
5.8 m board on a 2.4 m base does not fit under a 7.2 m ceiling. Grep the donor's
nouns, and photograph every view the theme declares — five of `qd_accel`'s
fifteen had never been rendered, and they were the five carrying everything the
reskin was supposed to have changed. **Nothing else in the set is a reskin**: the
other nine bring their own place, which is why none of those three defects can
recur in them.

**The set is written for grade 9, and the reason is the one thing checking cannot
find.** The first two were authored at the parent games' grade 11 and a player
said the questions were too hard — which is `questionLoad`'s lesson arriving from
the other end of the range. Reading score cannot see that a nine-stop session
somebody comes to cold is not a fortnight in a course they are taking. So all ten
sit at `audience: { grade: 9 }`, still above 8 so the driven instruments stay
legal, and every stop carries a rule that no gate asks for: **the `guide` says in
plain words what the move is, and the first `background` paragraph works the same
move on different numbers.** Different numbers deliberately — a worked example on
the question's own numbers is the answer with a label on it, and `probeQuestions`
fails it, correctly. The opening cards were rewritten the same way and to the same
brief: the mystery first, then what it would mean if it held, then the job. That
brief came from the person playing it, not from a check, and it is the one part of
this work no gate in the repo would have asked for.

**Format diversity is per campaign here, and it is the specification rather than a
preference.** The source book asks for nine *different* interactions per
discovery, so a campaign of nine multiple choices is exactly the thing it is
written against. Every one of the ten carries seven or eight distinct answer
formats in nine stops and at least one instrument the player drives. Two
consequences worth knowing. The instruments are chosen from what the stop is
already about, which is how DEGENERACY ended up on the radial-velocity stop
(one observable, mass and tilt) and on the chirp (one sweep rate, two masses) —
those are the same defect in the physics, and the format is a description of it.
And **TRIANGULATE now has its first authored instance in a game**: three
continents' ice-scratch bearings crossing on one old pole, in `qd_tectonics`. It
was the last format in the catalogue that existed only in `books/instruments.yml`
besides the four arcade ones and the suspended STACK. Counting before claiming
mattered here — the first draft of this paragraph said six formats had got their
first instance from this set, and five of the six (ALLOCATE, ATTEST, DEGENERACY,
PROBE, TRACE) were already authored in between four and twenty-eight shipping
books. One `grep -l` settled it.

**Two of the ten are outdoors and the subject decided which.** An eclipse
expedition is a camp on a plain with a clear horizon and half of what makes it
hard is that it is a camp; a twenty-foot horn on a hill above a road is the whole
reason the first explanation offered was pigeons. Neither survives being moved
into a corridor. Both cost about a third of what an interior costs, because an
outdoor place is `site.js` — buildings as data with `roof` and `siding` — plus a
`decorate` hook, where an interior is a plan and a fit-out. Three things bit in
those two and all three were invisible until a screenshot: **`ctx.MATERIALS` is a
map of factory functions**, so spreading it over a theme's own palette replaces
materials with functions and three.js renders default white (a row of telegraph
poles, bare white); **the outdoor world's `colliders` are `THREE.Box3`**, not the
interior world's plain-number shape, and pushing the wrong one throws on the first
ray `reachable.mjs` fires; and **a collider on a building's own door walls the stop
off** — the coelostat was placed at the camera hut's entrance and `reachable`
correctly reported the stop as unreachable behind its own instrument.

Two more that only a picture from outside would have found. **`profile: 'hill'`
puts its mound at the origin**, so a site described as a hilltop and built with
seven metres of relief is a green slope the camera looks into at eye height, with
two roof ridges poking over the crest and nothing else visible anywhere; a
hilltop reads from the horizon ranks and the fog, and nothing in that campaign
happens on a gradient. And **the object a game is named after was behind its own
building** — the horn antenna was placed north of the antenna hut, which is
correct for a real site and means that from anywhere on the track the hut is
exactly in front of it. Both of those pass every check in the repo.

**The interior fit-out boilerplate is now four functions in `interiorKit`, and
that was the second-largest thing this work found.** Every interior theme needs
the same forty lines: where a corridor's spine wall is actually solid, the
per-room `wallOk` that knows about doorways and missing cross-walls, and the mural
slicing with its mirror. Nine copies of that is house rule 1 in a new directory,
and the copies would have drifted the first time either half was corrected —
which is exactly what had already happened to the sliced mural's mirror, wrong on
the one wall nobody had put a legible drawing on. `spineSolidSpans`,
`spineWallOk`, `roomWallOk` and `paintAlongWall` are that code, once.

**The chain band sits at the same height in all seven, and that is not a detail.**
It is at y = 2.20 with a 0.62 m height whatever the ceiling is, because what sets
it is where the player's eye is rather than where the slab is. Set relative to
`tileH` — which is the honest-looking thing to do, and which the first cut of
four of these did — it lands above the top of a 66-degree frame at walking
distance from the wall, so the drawing is in the scene, correctly positioned,
facing the right way, and cannot be seen while walking down the corridor. Only a
screenshot says so, and only a screenshot taken along the corridor rather than at
a room door.

**And `paintMural` gained `chain`, which is `lightpath` with its stations as
data.** `lightpath` is one supernova survey's signal flow drawn by hand, forty
metres of one specific argument; every discovery has a chain like it and none of
them has the same chain. `chain` takes `text.stations` — a title, a subtitle and
one of thirteen schematic glyphs each — draws the rail, numbers the stations by
index, and alternates the labels above and below so a run of nine does not
collapse into one line of type. Numbered by index rather than by hand, because a
chain numbered by hand goes wrong the first time a station is inserted.

**Two shared painters gained a face for it, and both were missing rather than
wrong.** `interiorKit`'s `paintMural` had `rocket` and no way to draw a chain of
measurements, so `lightpath` is the corridor drawing: the event, the sky, the
telescope, the instruments, the frames, the light curve, the standardisation, the
diagram. And `screens.js` had `vitals`, `panel` and `film` — a machine reporting
its own state — and nothing for a wall a team *faces*, so a board reading
`LEVEL 1 / 3` was a progress bar where the plot should be. `plot` takes curves and
points in 0..1 of its own box, prints how much of the sample is up, and **says why
it is empty in the middle of the space where the data would be** — a note in the
corner of a blank board reads as a board that is broken rather than one that is
waiting, and this game's diagram is deliberately blank on level 1 because the
campaign's own rule is that the cosmology stays sealed until the ruler is agreed.

**A sliced mural's boards have to be numbered against the mirror, and both walls
that use one were wrong.** `paintMural`'s `t0`/`t1` carve one drawing across a run
of boards, and a face on a wall whose normal is −z is rotated a half turn — so its
texture's u axis runs *against* +x. Handing board i the slice `[i/n, (i+1)/n]` puts
the start of its slice at the board's high-x edge: every board is right on its own
and the run jumps two slices at every joint. Reversed, the joints close and the run
reads left to right for somebody facing the wall, because looking +z the viewer's
right hand is −x. It survived years in Bring Them Home because the drawing on that
wall is a launch vehicle, which has no legible order — the interstage sat to the
right of the second stage and nobody reads a Saturn V for stacking order. It was
found the moment a drawing with **numbered stations** went on the same wall.

**A game's silhouette comes from its world module.** Two themes on the same world look
alike however the palette differs, which is why five either bring their own world
(`themes/<name>/world.js`) or carry a props layer heavy enough to change the shape of the
space. **Yellow Bay is the cheap version of bringing one**: its world module calls the
engine's own `buildInterior` once per wing, into a group it then slides sideways, and builds
only the glazed crossing between them itself — so rooms, doors, signage, case stands and the
fit-out hooks are all still the shared code. Two things that has to be got right, both of
which look fine when they are wrong: everything the *engine* reads back is plain numbers in
world space (colliders, soft colliders, stop positions, case stands) and has to be moved by
hand alongside the group, and `plan.openEnds` has to be forwarded to each wing or the builder
walls off the way through and the corridor simply appears to end. `engine/dev/scenes.mjs` and
`pieceDensity` know about `plan.wings` for the same reason — one build of a two-wing plan is
every room in the building stacked on itself, which renders, measures, and describes nowhere. Worlds: `engine/world/outdoorTown.js`, `engine/world/interiorFloor.js`, a theme's
own. Nocturnal games set `look.dayWindow` and `atmosphere.nightSky`. A theme bringing its
own world declares `world: 'themes/<name>/world.js'` in site.js and vite.config.js points
`@world` at it.

**Changeover is a tower, and the four floors are stacked on one footprint.**
`engine/world/interiorLevels.js` (Headwater, The Trial) is several floors joined by stairs and
stepped **along** the spine as well as up, because `groundHeight(x, z)` takes no floor argument
and collision is tested in x and z with the player's y ignored — so it is a section through a
hillside and nothing in it is above anything else. `engine/world/interiorTower.js` is the tower:
four plates at the same (x, z), one **active** at a time. `groundHeight` answers for the active
floor, so it stays single valued; `colliders`, `softColliders` and `interactables` are the shared
set plus the active floor's, spliced **in place**; and everything is still drawn, so the floors
below are through the glass with their lights on. The lift is the only way between them
(`engine/core/lift.js`), which is what makes *which floor, in what order* the route decision a
corridor game gets from distance — and the panel is the directory as well as the control, because
four floors are the same rectangle and the map can only draw the one you are standing on.

Five things that had to learn what a floor is, and nothing else did: the three exported arrays
above; `crowd.js` (`ctx.activeLevel`, so nobody two floors down is walked into or talked to
through a slab); `map.js` (`planRooms`, or four plans are drawn in one rectangle); and
`engine/dev/scenes.mjs`, which is where the first real defect showed up — it built the flattened
`plan.rooms` once, which is `plan.wings`' documented failure with the floors stacked, and it
reported eight notices floating on a wall the lift builds and the harness did not. **The arrays
are not the module's private property**: `crowd.js` and the interiors manager push into them too,
so a floor change removes its own entries by identity rather than clearing the array — the first
version cleared it, which deletes the cast.

**A distance in (x, z) is not a distance in a stacked building, and that is what
broke the runs.** All seven world-graded formats and TRIAL measured `hypot(dx, dz)`
and ignored height — right for a slope, a stair and a vehicle, and wrong here:
Changeover's six areas are six (x, z) inside one 26 m corridor, repeated four
times. So walking one floor's corridor took **all six TRIAL gates at once**, GREET
counted somebody three floors down as greeted, HUNT's six items were all within one
corridor, and EVADE could not be lost. The fix is one number the world either
declares or does not: `world.floorRise()` — undefined in every other game, and every
term it enters vanishes at zero. With it, `flat()` in `worldFormats.js` adds 80 m per
floor between two points (the walk a lift ride is worth), TRIAL's reach test requires
the same floor, and `trialLimit` prices the ride into the countdown — without which
the lap is 90 m of route and three rides in ninety seconds. Floors are compared as
**floors**, `Math.round(y / rise)`, not as a height within a tolerance: the two
heights being compared are a slab and a player's eye 1.6 m above one, and a tolerance
has to be threaded between 1.6 and 2.8. Two things also had to start carrying a
height at all — an area's `entry` (`entryFor` in `main.js`, thence `gatesFor`) and a
HUNT crate, which had none, so every crate read as being on whichever floor the
player was on.

Three of the six selftest cases written for this **passed for the wrong reason
first**, which is the house rule arriving on schedule: the GREET cases used a target
of two, so greeting somebody through a slab left the run going and `out === null`
either way; and the HUNT case wrote `points:` where the spec is `at:`, so nothing was
built and "the item above was not collected" passed because there was no item. All
six are verified by putting each bug back and watching exactly those cases fail.

**Two things only a screenshot from outside would have found.** Nothing between the floors:
the curtain wall is ten per cent opaque, so with only the shaft below clad, the top of the
building was four trays of furniture stacked in mid-air with daylight between them — every floor
needs its slab edge and its spandrel. And **from inside a room the city has to reach two
kilometres**: a 3 m window seen from six metres back lets the eye down about eleven degrees,
which from a hundred and eighty metres up first meets the ground *nine hundred metres out*, so a
city that stops at 760 m is invisible from every room in the building. Both looked merely hazy
from inside.

**Deep Watch is the first game built the way the rest are supposed to be.** It came from
`deep_watch/`, its own engine — a persistent boat, five simulation systems, a stage-based
mission runtime. The boat came across as `themes/deepwatch/boat/` behind an adapter; the
simulation did not, because a flooding rate that rises while you read a gauge has nowhere
to live in a loop that is walk, answer, hand off. Everything else is one book file,
`books/deep-watch.yml`, and `themes/deepwatch/site.js` reads the boat's own `LAYOUT` so
there is one description of the compartments.

**Three games lean on DERIVE harder than anything before them**, and they were
built to close gaps *inside* courses the set already claimed rather than to add a
subject. Slack Water is Calculus BC's back forty per cent, which Headwater stops
exactly before; Overwind is the Physics C paper Ground Truth's E&M game left
open; Dark Fibre is the optics-and-modern half `deepwatch_hs` could only retrofit
onto a submarine at four concepts and three. **Twelve of thirty-six stops each,
one a day, all with `askRule: true`** — against Ground Truth's ten of forty-five —
and all three compute every equation on their own syllabus. All three are
two-tier sites by geometry rather than by a flag: the far area is over 270 m out
and everything else is inside 110, so `orientation.js` opens the far lap and the
vehicles on day 4 without anything being authored.

**All games share one engine** (`gamekit/engine/core`). Their `src/*.js` logic files are
re-export shims. `gamekit/` also holds the world layer, the tools and the content importers.

## Content is normalised on the way in

`engine/content/normalize.js` runs once, in `engine/core/theme.js`, before any core module
reads a lesson. It canonicalises `game.type` (books write `Sequence`, `SEQUENCE`, `Science
Tank`), expands diagnosis packs into the lessons naming them, retypes a format with no data
for its format, registers estimate specs across a lesson and its reviews, and reports a
group with nobody on the roster. **Themes ship data; they do not ship repair code.**

## The one thing that will trip you up

**`main.js` is shared, and there are no forks left.** The wiring every game needs identically
lives in `engine/core/app.js` — `createInteriors`, `makeActivate`, `exposeDebug` — and every
theme runs off `gamekit/src/main.js`.

It was three entry points for most of this repo's life. The cost: the passage quiz shipped
working in one and invisible in the other two, the crowd's stand-aside fix was written three
times, and a TDZ bug putting a red banner over Project Y every frame existed only because
that game had its own copy of a loop the others had fixed. Project Y went first (833 lines of
`main.js`, its own `index.html` and stylesheet, an 890-line `npcs.js`), then Hospital Heroes
(900, 1,070-line world, 951-line `npcs.js`). Both directories are tombstone READMEs now.

Shared (edit once): `gameState, simulation, questionUI, dashboard, save, constants, time,
utils, terminology, interactions, player, personQuiz, map, figures`, and everything under
`engine/world` and `engine/people`.

Per game: `main.js`, `index.html`, `world.js`, props, plan/site, and all content —
`curriculum, missions, divisions, leaders, historicCharacters`.

## Starting a new game

**`gamekit/NEW_GAME.md` is the whole thing**, in order, with the writing bar and question bar
that took seven games to learn. Short version:

```sh
cd gamekit
npm run new-theme <name>                 # a town   — or `-- --interior` for a floor
npm run check <name> && THEME=<name> npm run dev          # green and walkable already
node tools/import-book.mjs books/<name>.yml <name> --verify   # then write the real game
```

The scaffold imports a starter book, so what comes out is a **complete playable game** — four
areas, four days, a worked example of every question format — green before you touch it. A
theme served from `gamekit/` needs no entry point of its own. The campaign is as long as the
book; 15 missions is what the shipped games have, not a requirement.

**Every game is a book file.** `tools/BOOK_TEMPLATE.md` is the format, with a worked example
of every question format; the importer checks it instead of guessing, and refuses to write a
book that would produce an unplayable game. `books/` holds all of them,
`tools/export-book.mjs` writes one out of a game, and `engine/dev/bookParity.mjs` — inside
`npm run check` — fails if a book stops regenerating the content its game ships. The three
games predating the format were converted that way; their `src/*.js` content files are
one-line doors onto the generated `content/`. The docx importers stay only for the two Word
documents they were written for:

```sh
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m books
node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m books
```

Run both with `--dry`; the one reporting missions is right. A docx has to be *inferred* from,
and every inference cost a defect — 63 lessons typed as the nearest format the importer knew,
nine packs referenced and never imported. Only the place — `site.js` or `plan.js` — and the
props stay outside the book.

## The games ship to an app that has accounts

`gamekit/dist` behind a static server is how these are played locally. The other way is the
**casebook** app (`~/code/casebook`, Replit, Express + Clerk + Postgres), where `/` is the game
shelf and every page is behind a sign-in.

```sh
cd gamekit
npm run sync-casebook                      # build all 15, copy them into casebook/games/
npm run sync-casebook -- --only headwater  # one of them
npm run sync-casebook -- --no-build        # copy what dist/ already has
```

Built output is **committed to casebook deliberately.** The theme is chosen at build time, so
serving nineteen games means nineteen builds, and running those on the app host would put ten
minutes of vite in front of a deploy for output that only changes when a game does.

**`tools/games.js` is the catalogue** — one row per game, read by both front doors
(`tools/gallery.mjs` writes `dist/index.html`, `tools/sync-casebook.mjs` writes `games.json`
for the app's shelf). It was inline in gallery.mjs and was two games stale within a week of
Wellmere and Red Sand shipping, which is what extracting it is for.

**`engine/core/cloudSave.js` is the account, and it is inert without one.** It reads the
campaign at boot, debounces the write (the engine autosaves every tick and treats saving as
free), clears the server copy on restart, and posts a row when a campaign finishes. The first
failed call turns the module off for the session, so a 404 from a static server and a 401 from
a signed-out session both mean "carry on with localStorage". Two things it must keep doing:
the read happens in `index.html` **before** `src/main.js` is imported, because the entry point
reads the save during module evaluation; and the local timestamp is re-stamped from the
server's own `savedAt` after a write, because two browsers on one account do not agree what
time it is and a fast clock would silently stop that device pulling the account's campaign.

**The rating on the ending card goes down the same pipe.** A finished campaign offers five stars
(`showEnding` in `engine/core/app.js`, `readRating`/`postRating` in `cloudSave.js`), one row per
account per game in `game_ratings`, and the shelf averages them under every card. Three things it
has to keep doing: the block is drawn **hidden** and shown only once `readRating()` answers, because
whether there is an account cannot be known synchronously and a static host would otherwise get five
dead stars — a control that answers nothing teaches the player not to press the next one; a rating
already given is **shown back**, since a second campaign re-rates rather than voting twice; and a
POST that fails says so, because a star that lights up on a request that never landed is a lie the
player cannot see. On the shelf the same distinction is `ratingsLive` — no endpoint means no rating
line at all, not thirty cards reading "Not rated yet".

## Several people can play one campaign

`?room=CODE` turns a game into a co-op session: one campaign, one countdown, everybody in the
same place able to see each other. Without that parameter every line is inert, which is why
nothing had to be switched off for the other games — `engine/core/room.js` returns an empty
answer to every question when `constants.js` `ROOM` is null. Made and joined at `/room.html`;
the rooms live in `casebook/server/rooms.js`.

- **The server is a relay, a clock and a lock table — not a second copy of the game.** Putting
  the rules on the server would mean the engine's decisions living in two repos. Clients
  compute the campaign; the server stores the last blob anybody sent.
- **So the campaign is last-write-wins, and the claim makes that safe.** A stop can only be
  opened by whoever the server grants it to, so the one mutation two people can make at the
  same instant is serialised. Not airtight — two people spending money in the same second can
  lose a debit — and that is an accepted limit.
- **The clock is the exception: `dayLeft` is the server's.** Not for authority, but because *a
  background tab gets no `requestAnimationFrame`*, so a client-owned countdown stops the moment
  somebody alt-tabs. `tickDay` reads the room's number; the pace is applied server-side, because
  only the server knows whether anybody has a panel open.
- **The budget is still computed on a client**, because it needs the map and the server has no
  world to measure a route through. `startDay` computes it and hands it over.
- **Position carries a SPACE, not just coordinates.** Interiors are built four kilometres along
  +x, so a teammate through a door is at a coordinate meaning something else entirely; without
  the space id they render as a figure far out across the terrain.
- **A remote player is `buildBody` plus `stepGait`.** Their look is derived from a hash of their
  id **by hand**, not through `pickLook`, which pulls from the world's shared seeded generator:
  drawing from it when somebody joins would move every subsequent draw.
- **Nothing new draws through walls.** The cone over somebody the day wants is still the only
  exception. A teammate behind a bulkhead is found on the co-op panel, which gives a bearing and
  a distance.
- **A room gets its own save slot** — `gamekit_<theme>_room_<CODE>_v1`. Pointing a shared
  campaign at the theme's own slot would overwrite the player's solo game, which is house rule 14
  through a different door.
- **The room's campaign is hydrated in `index.html`, after the cloud save and before
  `src/main.js`** — same ordering constraint as `cloudSave.hydrate`, and second because the shared
  campaign has to win. `connect()` is bounded by a timeout: a socket that opens and never says
  `welcome` must not leave somebody looking at a title card for ever.

Testing it is awkward: **two browser tabs cannot both be tested at once**, because the hidden one
gets no animation frame and its loop stops sending. The partner has to be a plain WebSocket
client. There is no checker for any of this — `npm run check` asserts nothing about the wire, the
same gap that let A and D strafe backwards for years.

## The most expensive rule in this repo

**A measurement that produces a plausible answer is not thereby a working measurement.**
Every check here asserts that content is wrong in some way; a check that asserts nothing
about *itself* reports confident numbers that are partly an artifact of its own formula.
So when a metric is added, **write the case where two inputs that should score the same
actually do — before trusting anything it says**, and confirm it by putting the bug back
and watching that case, and only that case, fail.

It has been paid for at least fifteen times. Each row is a live defect that passed every
assertion available:

| Where it bit | The lie | The fix |
| --- | --- | --- |
| Flesch–Kincaid vs house style | F–K is words-per-sentence and syllables-per-word only, so `11.4` (one word, one syllable, plus a full stop the sentence counter counts) scores differently from "eleven point four". The first published ranking was partly a ranking of house style: Red Sand (all numbers spelled out) came second, Aftershock (the opposite) ninth | `tools/readability.js` normalises both to one dotless token; `engine/dev/readabilityParity.mjs` asserts the same sentence scores identically written both ways. Books stay free to spell numbers as they like |
| The sentence boundary | `normaliseNumerals` swallowed across sentence ends: "…the second one. Three features…" became "…the second 0 features…", so one card read 38 words-per-sentence where the text has 18. Surfaced because a guide measured over the 28-word cap while containing no sentence longer than 22 — the prose was right and the ruler was wrong | The swallower stops at terminal punctuation; `readabilityParity` carries the pair both ways **and asserts the sentence count directly**, because parity alone cannot see a boundary both forms lose identically |
| Nine junior editions | Every passage at F–K 4–6, all sixteen checks green, and the first sixth grader found it much too hard. Reading score cannot see that "which explanation is consistent with all four readings" demands more than "how far did it move". The prose came down two grades; the *demand* stayed where an AP course had put it | `engine/dev/questionLoad.mjs`, at grade 8 and below — see its four numbers below |
| The instrument budget | It counted instruments and measured none. A grade-6 TRACE with fine prose (scene 7.4, verdict 6.3) carried the **twelfth-grade board**, unchanged: five channels, four sources, all-or-nothing. **37 of 38 junior instrument boards were identical in size to their AP parents** — `derive-edition` rewrites the words and copies the block | Two more `questionLoad` numbers: four items in an exactly-graded list, six where you compare and pick one. Eight stops across six editions failed; all eight fixed by dropping the second distractor, not the argument |
| A term built of ordinary words | `checkJargon`'s lexicon is morphemes, so "cabin pressure" and "power bus" — six ordinary words, four syllables — were invisible to every test. Day 1 of Bring Them Home used five such terms before explaining any | `PHRASES` in `checkJargon.mjs`, matched whole, applied at grade 8 and below |
| Once is not teaching | A glossary chip explains a word to somebody who thinks to open it; a scene to somebody reading the scene; a verdict to somebody who has just been wrong. Three readers, often the same child on three days | A junior edition explains every term in at least two places, in different words |
| The shift opening | Read before every day, inherited from the senior games almost verbatim: mean 107 words, up to nine sentences, one of them 33 words | `checkStory` caps a junior stake at 85 words and any sentence at 24. The four beats fit in seventy |
| `fieldCoverage`'s own carver | Every instrument panel opens with `ask(ch, fallback)` reading `ch.question \|\| ch.task`, but `ask` is `const ask = (ch, f) => …` and the carver knew only `function name(){}` and `const NAME = {}`. Nine instruments were reported mute. The `missing` guard could not catch it — that checks only entry points, and a shared helper going missing is exactly the hole it does not cover | Three selftest cases name `ask` directly |
| `readsIn` matched a literal dot | `lesson?.concept` was not a read, and eight fields in `questionUI.js`/`instruments.js` are reached only that way — `guide`, `rules`, `assumes`, `equations` among them. A measurement must not tell `lesson.guide` from `lesson?.guide`, because the player cannot | Three selftest cases |
| `scene` checked, `story` rendered | All five gates read `scene ?? story`; `storyBriefText` alone read `lesson.story \|\| …`. 122 stops write both and mean different things, so on every one the reading-level rule, the 40-word rule and the GIVEAWAY probe graded a string the player never saw. ContamCity's grade-6 edition checked 26 scenes at 5.8 and displayed stories at 12.5 | One character. A set of read field *names* cannot see a fallback chain's **order**, and the order was the whole defect, so `briefPrefersScene()` reads the chain itself |
| `symbolSignature` | Wellmere authors `Ne = 4NmNf ÷ (Nm + Nf)`; the keyword list asked for "contributing plants". Eighteen equations had a stop whose arithmetic states them and whose keywords miss | A stop that *writes the equation* computes it whatever the keywords say. A measurement must not tell `Nₑ ≈ 4NmNf / (Nm + Nf)` from `Ne = 4NmNf ÷ (Nm + Nf)` |
| `instrumentWork`'s first version | Harvested captions and was worse than the bug: a caption is both the name of a quantity and the name of the topic, so a STRESS row "Temperature rise that doubles reaction rate" cleared `rate = k[A]ⁿ` on a board computing no order. Three of the eight gaps it cleared were wrong | What survives is the two things that cannot be a topic word: an authored `formula`, and the board's own numbers — a value with at most a short unit, because `"98 % germination"` leads with a digit and is a sentence |
| `row.pday` | Three analysis scripts read the day a prerequisite is claimed, and `conceptOrder` never emitted the field. Every row classified as "claimed by nothing" and the summary said all 326 needed a question written. Plausible, confident, wrong. Only the gate's `why` string carried the truth, as prose | `pday` exists. With it fixed, 208 of 269 rows are prerequisites taught later, 27 want a claim, 34 are never mentioned |
| `checkNames` on an initial | Split "the laboratory director, J. Robert Oppenheimer" at the `J.` and reported an introduction that was right there | An initial is not a full stop |
| `cardLoad` on landing | Reported 0 stops over target the moment fold-by-default landed — it modelled the three lines the four questionUI panels print and never looked at the 24 in instruments.js, so every instrument stop was counted three blocks light. True figure: 244 | It renders those panels now, and the target is per tier |
| Two copies of one rule | `export-book.mjs` wrote each `takesAsRead` out as the player-facing `assumes` line, so a recovered book silently lost the field four checkers read — and `bookParity` could not see it, because the generated content is byte-identical either way. And `import-book.mjs` kept its **own** keyword matcher: when `keywordHit` learned `3 : 1` and `3:1` are one ratio, the gate saw a computed equation while the importer stamped it as mentioned | The importer imports the shared function. Two copies of one rule drift the first time either is corrected |
| The concept picker | "Two of 41 wrong" was the picker grading its own homework. Read by hand against the scenes, **nine** of Blackout's 41 were wrong, and three were unreachable by keyword at all — the stop whose subject is synchronising says only that four quantities have to agree | `concept:` is authorable, taking the number or the exact title, with `pickKeyConcept` as fallback |
| `ordinary()` | Fixing it so "moved" is as ordinary as "move" (a length floor was rejecting the stripped stem) reclassified "sided", which cost Headwater's `Limit` its `core: true` — it had been core only because "one-sided" looked technical | **A vocabulary list is load-bearing in four tools; change it and re-import every book before believing `bookParity`** |
| `baseTitle` required a digit | Hospital's 105 review variants are `— Review 3`; Red Sand's 8 and Sightline's 9 are bare `— Review`. Two campaigns' review stops were reachable through no day at all, and the concepts they claim were claimed by nothing | One `REVIEW_SUFFIX` regex, digit optional, used by both the stripper and the test. Cleared three `concept-debt.json` rows |
| `diffSnapshots` keyed `group:index` | The lesson index is a *position*: `import-book.mjs` writes each group's CURRICULUM in the order its stops appear, so exchanging two stops of one area, or moving one to another day, renumbers every lesson after it. Six of eight reported losses were two DIST stops trading places, and the two "lost" equations are computed by the other half of the swap; later, moving one stop reported an `assumes` line lost that was still in the book | **Fixed.** `pairStops` pairs by identity before anything is compared — `title` (unique across all 1,267 stops in all 29 campaigns) with `takeaway` as the fallback, so a deliberately retitled stop is still recognised as itself. A pair whose key moved is reported as a renumber, two that swapped as one exchange, and only a stop matched by neither is a loss. Six selftest cases, each verified by putting the key-keyed comparison back. **A wall of false failures is how a gate stops being read** — worse than the drift it was written to catch, because the first real loss it found afterwards had been sitting among them |
| A slate row naming a stop by number | Stop numbers move. Two swaps renumbered four stops and three rows in `plans/plansData.mjs` went on pointing at the number while meaning the question — one at a stop rewritten into something else | Every row carries the title it was written against; `render.mjs` throws on a mismatch |
| `askRule: true`, validated four ways and never emitted | `import-book.mjs` refused a rules list under three, refused a list without the flag, refused a candidate claiming a rule not in the list, and refused a step with no rule — then returned a derive object carrying `start`, `goal`, `startNote`, `rules`, `steps`, `hint` and `caption`, and **no `askRule`**. So Slack Water, Overwind and Dark Fibre authored it on twelve stops each and Ground Truth on eleven, and the rule half of all **177 steps was inert in the shipped game**. `bookParity` cannot see a dropped flag — the content is byte-identical either way, which is `export-book`'s `takesAsRead` blind spot — and `fieldCoverage` reads `ch.x`, one level above `ch.derive.askRule` | The importer emits the flag. `engine/dev/deriveRules.mjs` asserts it on the content: a `rules` list without `askRule` reaches no screen |
| An estimate board grading a different question | Deep Watch's day 5 asks "about how much gauge pressure is the sea applying at 90 metres?", states p = ρgh, gives a density and a g — and puts a **bilge-flooding board** in front of the player: 8 cm of rise a minute, 11 gallons a centimetre, a 55 gpm pump, graded to a target of 143 with `units: gallons per minute`. Then the solution computes 9.05 × 10⁵ Pa. Carried into the AP edition too. `validateContent`'s formula check passes, because target *does* equal formula(values[correct]) — the tiles and the question are each internally consistent and about different things | `engine/dev/boardAnswer.mjs`. Fires only when the solution's operands are none of the graded tiles **and** the target is stated nowhere in the solution: 2 of 307 boards, both real. Condition 1 alone flags ten and eight are benign, because a solution may show a later stage of its own working |
| The scaffold's own words, shipping | `carrying` closed fifteen days on the template's instructions to the author — "Say how it came out, in the same voice…", "you held the corridor, you brought them up" — including a reference to Blackout's fiction. And `checkStory` **passed it for the worst possible reason**: the rule is "the last paragraph is addressed to the player and says what they did", and the placeholder *quotes an example of exactly that*. A measurement whose subject is a description of itself | No shipped card may share ten words with `themes/_template/theme.js`, read as text from its two card blocks — not the module (the scaffold's generated content does not import) and not the whole file (joining every quoted string moves the sentence boundaries) |
| A digit where the pronoun belongs | The numeral pass could not tell a count from a pronoun, so 27 books shipped "She is the 1 who keeps saying so", "The earlier 1 is 98°F", "the radius is not the 1 on the 1974 drawing", "1 governs the interim in 20 days" — and **ten of Hospital's review-variant titles** read "6 Patients, 1 First Room", "Follow 1 Breath", while the base titles were intact. 106 occurrences fixed | `engine/dev/numeralWords.mjs`, on a **closed list of words that can only follow the pronoun**. "1 cup", "1 mole", "1 barn", "Day 1 had 96 events", "1 of 600 allowed solutions", "goes to 1 at t = 0", "a 3 : 1 fit" all keep their digits. In a *title*, any bare "1 " fires, because no title in the corpus counts with it |
| The youngest audience was the one the gate could not fail | `questionLoad`'s four numbers apply at grade 8 and below, and it decided whether to fail on `!!editionBase(name)` — is this a derived edition. Run across all 42 themes, **Hospital Heroes was the only theme it reported at all and the only one it could not fail**: 110 findings, advisory for ever, at grade 2. The twelve junior editions were swept and pass, so the numbers existed because of a lesson learned on the editions and the one grade-2 campaign was exempt from them | The test is the reader's age, not the file's provenance, with `questionload-debt.json` beside it. 51 of the 110 are one decision: a four-card SEQUENCE graded as one exact permutation with no feedback is a 1-in-24 guess for a seven-year-old |
| A panel field keyed to nothing | Bring Them Home's STRESS listed three criteria keyed `life_support`, `entry_margin` and `propellant_margin` against scores keyed `returnHours`, `entryMarginDeg` and `propellantMarginKg`. `instruments.js` renders the table as `scores[candidate][criterion.key]`, so **every cell in every column was an em dash** and the panel put no numbers in front of the player at all | An importer refusal, and a trap: a criterion whose key no candidate scores for |
| `equationCoverage` on a prose equation | A junior syllabus writes its equations as words — "part = whole × share", "spare = what can be made − what is being used" — so `symbolSignature` finds nothing structural and the whole test rests on a five-word keyword list. `blackout_ms` recorded four gaps of which one was false: "part = whole × share" **is** computed, twice, by boards whose relationship reads *"Lost = what it carries × the share lost"*, which the list (`per cent`, `percentage`, `share of`) cannot see. **A debt file recording gaps that are not there is worse than none**: the work list is wrong and the real gaps hide among the false ones | The keyword lists carry `the share`. One row cleared, verified by hand, and a before/after diff across all 42 themes confirmed nothing else moved. The general fix — an equation's own content words as keywords — was written, measured at zero effect, and reverted |

**And two lessons from getting the measurement wrong while reviewing all 42 campaigns.**

- **A count is not a finding until the renderer is read.** `deriveRules.mjs`'s first
  version failed 44 derivation steps whose candidates all carry one rule, on the strength
  of a sentence in this file — and the panel offers the chain's **whole** `rules` list, not
  the candidates', so every one of those steps is answerable. What such a step actually
  loses is the *coupling* between the two halves, which is worth printing and is not a
  defect. Worse: those 44 false failures would have sat on top of the real defect, which
  was that none of the 177 rule questions was being asked at all.
- **Grep for the field the contract names, not the field you expect.** Four campaign
  reviews reported a SCIENCETANK with "no evidence", from a grep for an `evidence:` key.
  There is no such book key — `rules` is the authorable scoring rule and **the evidence
  moves up into `guide`**, which is where all twenty tank stops carry it. Four findings
  withdrawn.

Related traps of the same family:

- **A trap that fires is not thereby a trap that works.** Two were firing on the wrong
  refusal — a BELT mutation tripping the duplicate-name guard and a SPOT one tripping the
  wanted-by-every-instruction guard, each before reaching the rule it was written for.
- **All four `warmups:` refusals sat below the line that reports them**, inside the emit block
  which runs *after* `if(problems.length)`, so a slot name that is not one of the seven imported
  clean and always had. **A refusal nothing exercises is a comment.**
- **A limit the format's own minimum cannot satisfy is a ban on the format.** The importer floors
  a TRACE at four channels and an ATTEST at four claims, so a junior board sits *at* the limit;
  a first attempt also capped `sources × 2^channels` at 32, which no legal TRACE can reach. That
  number is reported, not enforced. Likewise **conjunctive grading is reported, never failed** —
  TRACE marks "name the source" and "keep the right channels" together, but CHAIN and ROUTE are
  two-part by construction and failing it would ban them.
- **Ask what a player who understood nothing would score, before believing any pass mark.**
  Three formats shipped a first version too generous the same way. SPOT's was sharpest: scoring
  every item, a run that went on applying the *withdrawn* instruction scored 86% and passed,
  because most of what arrives is wanted by neither instruction and correctly ignored. Only
  **discriminating** items are scored now — wanted by the instruction in force, by the one it
  replaced, or taken by the player — and the same run scores 55%.
- **A frame count is not a clock, and a `requestAnimationFrame` promise is not guaranteed to
  settle.** The driver budgeted a 45-second run at 4200 frames assuming 60 fps; headless Chrome
  ran at 123 and reported a working format as broken. And a page behind twenty mounted panels
  stops being given frames at all, so a bare await never resolves and the driver hangs at 0% CPU
  with nothing printed. Waits are bounded by wall time and raced against a timer; a format
  running on authored seconds is driven on a **rescaled copy** (HOLD's physics is rate × time,
  so every time ÷ 15 and every rate × 15 traces the same curve). Any future format on its own
  clock needs the same.
- **A `needs` graph can be non-terminating rather than wrong.** Five of sixteen courses came out
  with a cycle — intermolecular forces ⇄ phase changes, rate constants ⇄ activation energy,
  reliability ⇄ validity, α/β ⇄ sample size, decibels ⇄ signal-to-noise — each a pair where the
  physics runs one way and the prose reads both. A cycle overflows the depth calculation instead
  of reporting anything, so **check for cycles the moment a graph is authored**. Three more were
  self-references, which the applier now refuses.
- **`- >-` inside a sequence had never worked.** `tools/yaml-lite.mjs` handled a block scalar
  after a key and not after a dash, so four paragraphs arrived as the literal `">-"` with the
  prose skipped as a deeper block. Quantum's book was the only one that had ever used the form.
- **Quote any inline `{ … }` value containing a comma.** `yaml-lite` split a flow map on every
  top-level comma and silently skipped any fragment without a colon, so `{ landmark: the second
  door, hinged inward }` arrived as "the second door". Quantum, Blackout and Aftershock shipped
  36 such lines through every check. The parser refuses a colon-less fragment; a braced value
  with no colons anywhere is still a string, which is what `{0} ÷ {1}` needs.
- Both yaml bugs are the same class: **what reaches the game is a valid shorter string, so
  nothing downstream can tell.**

## When a book key stops reaching the game, look at the importer before the renderer

`fieldCoverage` compares shipped content against the renderers, so a field the *importer* drops
is invisible to it — nothing is in the content to be uncovered. Two cases, both of which had
never rendered:

- **CHAIN's per-link `reading`** — the observed state of that link, and the only thing making
  "which one governs" answerable rather than a guess. Authored in eleven of fifteen books under
  three names (`reading`; `capacity` + `unit`; `evidence`, once as a chain-level map keyed by link
  id with a key naming no link at all), and mapped by none. Meanwhile three games printed hints
  saying "inspect the link readings" with no numbers on the screen. The fix is one name —
  `reading` — with the other three **refused** rather than aliased, because an alias is how a
  field ends up under four names next time.
- **TRACE's correction.** A player was told "a threefold Flats-to-vault ratio becomes roughly 4.8
  relative to competent rock" against a board printing neither the 1.6 nor the 4.8, whose two
  dependent channels read `3.0 (expected value published in the fortnight report)` — a provenance
  note with no statement of what 3.0 counts. The book had authored it as
  `originalRatio`/`referenceAmplification`/`correctedRockRatio`; none were mapped. `correction` is
  now `what`/`was`/`now`/`effect`/`corrected`, **all strings**, printed as a given above the
  channels with `corrected` held for the verdict. Strings because a numeric
  `referenceAmplification: 1.6` rendered by the engine is how `3.0` got onto a board meaning
  nothing: **a correction is a factor in one game and a clock offset in another, and the unit is
  the author's to state.**

Two dead keys came out with it: `tolerance` on a TRACE (nothing about a trace is graded
numerically) and a channel's own `independent:` flag, a second description of the `independent`
list the grade actually reads, dropped on the floor in six books. All refusals are trapped in
`npm run traps`: the old numeric keys by name, a correction whose `was` equals its `now`, and a
channel `reading` that is a bare number. **A `need()` that refuses an unknown key is cheap; a key
silently dropped is a sentence nobody will ever read.**

## What `fieldCoverage` reports, and what is left over

It reads the *renderers* rather than the content: carves `questionUI.js` and `instruments.js` into
named blocks, follows each format's panel through the functions it calls, and collects every `ch.x`
and `lesson.x` on that path. A sentence appearing on none of them reaches no screen. **Advisory**,
because neither finding is clean and a gate in front of unfinished content work acquires a
permanent `--advisory` flag.

- **Three formats print a hardcoded instruction over the author's own**, at 164 stops: SEQUENCE
  (98 of 176), PROTOCOL (47 of 126), SCIENCETANK (19 of 32). SEQUENCE says "Put the 4 steps in
  order, earliest first" whatever the book wrote, and about one ordering item in nine is graded on
  cost, risk or reversibility rather than time — ContamCity's evidence workflow, whose four cards
  are photograph, headspace, non-destructive spectrum, destructive method, three of which consume
  nothing. **`axis` and `ends` are the fix** — the instruction line and the two rail captions,
  authored per stop — and eleven stops across eight games carry them. PROTOCOL and SCIENCETANK are
  the same fix and have not had it.
- **122 `story` values, 8,589 words, are displayed nowhere.** Still in the books, still exported.
  Fold what each adds into its scene or delete it; a stop should not carry two situations. The
  drifted stories run 42–96 words against the scene's 27–38, and ContamCity's ordering stop opened
  on "a destructive method gives the best identification and gives it once" — which is the answer
  to the question beneath it.

The selftest is load-bearing and earned that on its first run by failing an assertion its own
author had written backwards. Two cases would otherwise invert silently: if the sink list stops
being applied, `setup` reads as covered and the file reports all-clear; if `showChallengeForStop`
is followed, every format inherits every other format's reads and it reports all-clear again. Both
were live bugs during the hour it was written.

## Three defects the estimate panel could hide

All found by a player, all now in `validateContent`, each a class rather than a stop.

- **A stop that declares two equations.** "Degrees lost = energy lost ÷ energy for one degree.
  Energy lost = watts × seconds", three slots, a unit conversion already done in the prose. One
  relationship per stop at grade 8 and below, and `questionLoad --sweep` lists multi-step estimates
  in *every* game because the same smell is worth seeing at any level.
- **A tile whose label is not its value.** The player clicks the label and the panel adds the value,
  and nothing compared them. `apply-conversions` refuses to guess at a `labels` list whose length
  changed, so a re-targeted estimate keeps the old tiles: Outbreak's grade-6 panel read 90, 99, 10,
  9,801 over values 10000, 0.01, 0.9, 0.99, and Deep Watch's asked about pressure at ninety metres
  while grading gallons per minute. Ten stops across seven games. Both readings are internally
  consistent, which is why the formula check passed them.
- **An equation chip that is not the stop's equation.** The syllabus attaches an equation by
  keyword, and a bare key like "how long" put `time = distance ÷ speed` on a thermal card whose
  panel divided joules; `activity` did it to Project Y's critical-path stop, `megawatt` to
  Blackout's demand forecast. The check compares the chip against the relationship, the template and
  the worked solution — in words where the equation is in words, and by symbol where it is
  `df/dt = (P_gen − P_load) / 2H`, because those two currencies share no vocabulary. Six games were
  wrong; three because the equation the stop computes was not in the syllabus at all.

Its `--selftest` runs inside `npm run check` on two whole fixture campaigns whose answer is known.
Not ceremony: it failed on its first run and found two real holes, one a gate that only fired on
BALLPARK and so could not see senior-high arithmetic left on a retyped stop.

## The fourth one: the card's arithmetic against the equations the card gives

A player on Blackout's day 1 said the stop required equations that were not given, and it did. "For the
same real power, what happens when voltage steps from 20 kV to 400 kV?" — four options pairing a current
change with a loss change, so answering it is `P = IV` (current falls 20×) and `P = I²R` (loss falls
400×). The campaign computes neither until day 4, and the one equation printed on the card was the turns
ratio, which the question never uses because it hands you both voltages.

**The cause was a rule doing its job, in the one case where it should not.** The importer drops an
equation chip from any day before the day something computes it — Quantum's day 1 showed four formulas
and used one — and `normalize.js` applies the same rule again at load on the shaped day. Right for a stop
that merely *mentions* an equation; wrong for one whose own options and verdict work numbers with it,
where the chip is not decoration but the tool the question is asked with. `demandsEquation` in
`tools/syllabus.js` is the test — the equation's symbols written in what the card shows, or its keywords
beside arithmetic — the importer stamps `demanded: true`, and both drop passes keep a demanded chip. A
flag rather than a second copy of the rule, because the engine does not import the syllabus.

**Then the cap hid what the exception had saved.** The chip row is two per card and `card: false` past
that, and the Background door inherited the same filter — so on six stops the demanded equation reached
*no screen at all*, which is `fieldCoverage`'s defect in the one field a question is worked from.
Midway's day 3 derives a loop speed with `safety factor = capacity ÷ demand` hidden; Headwater's day 2
integrates a drain law that was not on the card. The row keeps its cap; the door now spells out every
equation the stop computes with or is worked from.

**`engine/dev/equationSupply.mjs` is the gate**, inside `npm run check`, and its rule is what counts as
having been given an equation: a question on an **earlier** day computes it (strictly earlier — a day
opens its stops in any order), or this stop computes it, or the card prints it. **A `takesAsRead`
declaration is deliberately not a supply**, which is the whole point: Blackout's stop declared
"electrical power and energy over time — taken as read" and that declaration is exactly what let a day-1
CHOICE rest on two uncomputed relations with every other check green. `equationOrder` cannot see it
because a CHOICE computes nothing and is invisible to that gate at both ends; `syllabusEquations` asserts
no chip is shown early, which says nothing about an equation nothing computes; `conceptOrder` is
satisfied by the declaration.

**The measurement was wrong twice before it was right, both times by being plausible.** A first pass
counted "a question mentions an equation the campaign computes later" and reported 35 across 14 games —
but most of those print the equation on the card, so the player has it: Deep Watch's Snell's law and
`d = ½vt` are chipped on the stops that use them. Then the corrected version passed Blackout — the stop
this all came from — because it read only the verdict, and that stop's arithmetic is in its four
**options**, with the `why` merely repeating it. Reading the options is what made it fire. The honest
count was **14 gaps across 9 themes**, all equations computed later rather than never, and they are all
supplied now: the debt file exists and is empty.

## Diversity is not the measurement; delivery is

The obvious gate does not survive contact with the numbers. The catalogue is 63% four formats
and 28% CHOICE alone, so the response that suggests itself is a variety gate. That gate was
written down, then the mix was crossed against `syllabusEquations`:

| | CHOICE share | mix rank | equations a question **computes** |
| --- | --- | --- | --- |
| Ground Truth | 51% | second-worst | 11/11 |
| Sightline | 47% | third-worst | 7/7 |
| Quantum | 20% | **best in the repo** | 5/10 |
| Outbreak: Riverton | 16% | fourth-best | 3/7 |

Format variety does not predict whether the course is taught, and the variety gate would have
sent the work at the four games needing it least. Across the seventeen senior campaigns effective
format count scores **ρ −0.07** against whether syllabus equations are computed and CHOICE share
−0.01, where **share of stops carrying arithmetic scores +0.69**.

So **`engine/dev/curriculumDelivery.mjs` is the gate and format mix is the diagnosis** you run
when it fails. One rule that is not a matter of taste: *an equation the syllabus lists must be
computed by some question*, where computed means a number came out of it — the `relationship`, the
template, the worked solution, or a DERIVE's own lines. This is house rule 21 as a check. CHOICE
has none of those fields so it cannot compute by construction, and a CHOICE-heavy game whose
equations are all computed passes, correctly.

`engine/dev/curriculum-debt.json` records today's gaps: **97 → 88**, nine of which were the
measurement and not the content (`instrumentWork`, `symbolSignature`). Every flip was inspected by
hand before the baseline moved and three proposed flips were rejected. **A debt file that shrinks
because the detector got looser is worse than one that never shrinks.**

It also reports, and never fails, the 30-concept syllabus by the **tier of move** its stops demand
— SELECT (the answer is on screen and you pick it), CONSTRUCT (you build it out of parts), OPERATE
(you drive an instrument). A mechanism concept reached only at SELECT is the diversification work
list. A report because select-tier is often right — Sightline is AP Psychology and "identify the
bias" *is* a discrimination — and because uncovered concepts are expected: twenty-five of thirty
is a syllabus map, thirty of thirty is a flattering one.

**The conversion invariant makes a diversification pass safe.** `--snapshot` before, `--against`
after: a changed takeaway, a dropped `assumes`, a concept the campaign no longer touches or an
equation it no longer computes all fail. A changed **format** is reported and allowed. *The
objective is fixed, the format is the variable.* Without it a sweep rewrites the syllabus while
every other check stays green, because every other check reads the content as it now is.

## No format holds more than a third of a campaign

**`gamekit/DIVERSITY_PASS.md` is the pass.** At a 45-stop campaign no answer format may hold more
than **15** stops, 10 at a 30-stop junior edition, 18 at Hospital's 55. `engine/dev/formatMix.mjs`
is the gate, with `format-debt.json` recording campaigns still over — **75 stops across 10
campaigns** when it started.

**The cap is the gate and nothing else is**, because a conversion has to pay for itself in
teaching: an equation the syllabus lists and no question computes, or a mechanism concept the
player only ever picks off a list. The format is chosen from what the stop is already about. A stop
that cannot support one honestly stays as it is and a different stop moves instead.

**Why the catalogue looked like that, measured rather than guessed.** The books authored it —
`grep format: books/seedbank.yml` gives 29 CHOICE of 45, and nothing was retyped by the engine. The
first nine books average **33%** CHOICE among board stops and the last six average **59%**, because
the early ones had a source document carrying exercise shapes (the seven FPS interaction guides in
`books/copy/`, and the two docx design books) while the late ones were written straight from a
one-paragraph idea. Two controls settle it: Outbreak had no interaction guide and has the best mix
in the repo, because it came from a design book; and Quantum had no source document either but its
book header states its own rule — *every question is about an instrument, a number or a choice* —
and it has the best board diversity in the catalogue. **Writing the distribution down before
writing 45 stops is the whole mechanism**, and `tools/BOOK_TEMPLATE.md` never asked for one.

**The pass is done: 76 conversions across ten campaigns, every campaign inside the cap.** What it
bought besides the histogram: **five campaigns now compute every equation on their syllabus** where
four did not (Aftershock 2/10 → 10/10, The Trial 6/11 → 11/11, Wellmere 3/6 → 6/6, Red Sand 8/9 →
9/9, junior Wellmere 1/4 → 4/4), **26 rows left `curriculum-debt.json`**, and select-only mechanism
concepts went 7 → 1 in Wellmere, 3 → 0 in The Trial, 5 → 0 in Ground Truth, 7 → 2 in Sightline.
Ground Truth's OPERATE tier went 2 → 13 stops, Sightline's 4 → 14.

**The junior editions needed four rules the senior games never hit**, each a `questionLoad` gate
doing its job. The **judgement budget is per campaign and per day** — TRACE, ATTEST, VALUE, STRESS,
DEGENERACY, DIAGNOSIS and HOLDOUT are all format-demanding, so a pass reaching for instruments
reaches into that budget; junior Wellmere went to 30% against 20% and three conversions were
re-authored as CHAIN, VERIFY and BALLPARK (CONTROL, VERIFY, CHAIN and the boards are free).
**Nothing under 0.1 in the arithmetic** — the fix is a different unit, per cent of gravity instead
of g. **Four items is the board limit and it counts the label.** And **grade 2 is a different
language**: all eight Hospital conversions failed the reading gate first time, one at grade 8, and
what passes is one clause per sentence with no subordination.

**A conversion can create an ordering defect, so run `equationOrder` after every one.** Red Sand's
day-3 assay stop became a BALLPARK computing the reaction quotient, which paid the cap and the last
equation gap together — and immediately failed, because Q against K is built on ΔG = ΔH − TΔS and
nothing computed that until day 5. The fix was a second conversion putting the base on day 2, not a
new debt row. **A stop that starts computing something starts owing its prerequisites.**

## The four `questionLoad` numbers, and who they apply to

Any theme at grade 8 or below. A limit written as a sentence is a limit nobody can fail, so:

- **at most two operations** in an estimate, with nothing over 9,999 or under 0.1
- **twelve words** in an option, since four have to be held in mind at once
- **two named people** in a stop, four across a day
- **a budget on judgement stops** — 20% of the campaign, one a day, none before day 3, because a
  player who has answered nothing has no ground to judge from and the first stop of day 1 decides
  whether there is a day 2
- **four items in any list graded as an exact subset** with no feedback until commit (TRACE
  channels, TRACE sources, ATTEST claims, VALUE options), and **six** where you compare the list and
  pick one or the panel narrows live

Most instruments *are* the demand — TRACE is "agreement is not independence", ATTEST is "the record
is not the condition" — so they are budgeted rather than banned. **CONTROL and VERIFY are
deliberately not budgeted**: the fair test and predict-act-measure are what a middle-school science
course is about, and a young player should meet them more often, not less.

## No day asks more than four questions, and no card is served twice

**`engine/dev/dayCalls.mjs` is the gate**, inside `npm run check`, with
`engine/dev/daycalls-debt.json` beside it. Two rules about the shape of a day rather than the
content of a stop:

1. **No day carries more than `MAX_CALLS` calls.** Three authored stops plus a callback is what the
   loop is built around and what `budgetForRoute` gives hours to. `budgetForRoute` gives travel a
   little under half the day whatever the stop count, so a fifth call is answered against the same
   hours as the fourth — the day reads as long rather than full. `MAX_CALLS` is exported from
   `normalize.js` and the gate imports it, because a checker with its own copy of the number is a
   second description of the rule.
2. **No lesson is served twice in a campaign.** A callback that re-asks its own lesson is the same
   card twice — same scene, same `why`, same four options, same key, with `Second look —` printed on
   the day plan and nowhere on the card the player answers. Recognition is not retrieval.

**Why nothing caught either for years.** Every checker that reads a campaign in order deliberately
dedupes on `group:lesson` — `formatMix` so a callback does not spend a format cap twice,
`syllabusEquations` so it does not re-date an equation, `probeQuestions` so a question is not probed
twice, `validateContent` by filtering `s.callback` out before counting. Each is right about its own
question, and between them they made the *second* serving invisible to the whole apparatus: **295 of
318 callbacks were byte-identical re-serves and no gate could see one.** And `validateContent` notes
a day authoring more than three stops and has never failed one, which is how 68 days authored four
and **72 days ran to five calls**. A note nobody has to clear is a note nobody clears.

**Both halves are paid and the debt file holds no rows.** The duplicate half went 295 → 0 because
`shapeMissions` no longer adds a callback it would have to re-serve a card to fill; the over-4 half
went 72 → 0 by re-daying five books. What that cost is worth recording:

- **`instruments` split its arcade and world-format days** (9 days → 11) rather than dropping a
  format nothing else authors. Its day 8 was the five arcade formats and day 9 the six world-graded
  ones; deleting there would make BELT, HOLD, SPOT or LOB unreachable, since `lessonGallery`
  harvests from the bank.
- **Project Y moved its acceptance-criteria stop** onto the uncertainty-budget day, where a
  conservative lower bound on a measurement belongs. **Prefer a move to a delete and a re-claim to a
  move**: it costs no scene and no story.
- **The two grade-6 editions sent eight stops to the days their subject belongs to.** Moving
  `planetary_defense_ms`'s risk cloud off day 2 put it after the concept it rests on and cleared a
  `concept-debt` row. Moving Wellmere's bagging stop to day 1 made `jargonDepth` fire, because that
  card defines *Pollen* with *Chromosome*, unseen until day 4 — the junior two-places rule catching a
  move rather than a rewrite.
- **One stop was deleted and then put back, and that is the useful part.** Two of
  `planetary_defense_ms` day 2's CHOICE stops read alike in their scenes — both are *more observation
  separates two candidate paths* — so one was cut as redundant. It claimed *Repeated measurements and
  their average*, the only claim on the base of a day-4 concept. **The scenes were similar and the
  concepts were not**: this file's own rule about a plausible measurement, arriving in the editorial
  half. Read the concepts before calling two stops the same question.

**The callback now requires a review variant, and the variant decides the candidate.** It used to
prefer a `— Review` variant and otherwise re-ask the lesson itself, on the argument that re-asking
*is* what spacing means. It is not, when the second serving is byte-identical. So the candidate is
the oldest taught lesson that **has an unserved variant**, and where nothing does, the day simply has
no callback. Picking by age alone reached 10 of the hospital's 105 variants; it reaches 13 now, and
Red Sand's and Sightline's variants are authored as stops already, so they correctly need none.
Three bugs the gate found in that change: `/review/i` matched a lesson whose *own* title contains
"review" (Sightline's "What the review is looking for now" was its own review variant, served on two
consecutive days); `calledBack` keyed the base lesson rather than the one served, so one card went out
on three days with every key looking distinct; and `served` has to be seeded from **every** day's
authored stops, not the days walked so far, because a variant a later day authors directly is the same
card and the callback is the one of the two that can move.

Its selftest carries six cases, each verified by putting the bug back: keying a serving on the *base*
title makes a review variant read as a duplicate of its parent and bans the callback outright;
reporting only three-or-more servings passes every ordinary duplicate; a cap written as a literal
drifts from `MAX_CALLS`. The one a selftest cannot reach is reading the *book* rather than the
normalised theme, which sees no callback at all and reports all-clear on a campaign serving thirteen
duplicates — `contentOf` calls `normalizeContent`, and that is the only thing keeping it honest.

## A day closes on something somebody said

Fifteen missions used to end on one sentence — *Every call made. The team writes it up
overnight.* — identical on day 1 and day 15, identical after three right answers and after
three wrong ones. The only acknowledgement anywhere in a campaign was the two-word kicker on
the verdict (`The call holds`), the `Correct` headline, and, once, the authored `ending`. **A
game whose youngest audience is in the third grade closed fifteen working days without ever
telling the player they had done well.**

`engine/core/debrief.js` composes the closing card and `engine/dev/dayDebrief.mjs` is the
gate. Four rules, and the last two were found by the gate rather than written into it:

- **The praise is earned or it is not given.** The tier is read off `missionResults`, `hints`
  and `retries` — `clean` (all held, unaided), `worked` (all held, a hint or a second attempt),
  `mixed`, `rough` — so a day on which nothing held cannot be told it went well. A card that
  congratulates every day is a card nobody reads by day 3, and a child praised for a wrong
  answer has been taught that the praise is noise. `clean` and `worked` are separate for the
  same reason: a day carried by three hints is not the day nobody had to check.
- **A named person says it, and the name arrives with the job attached.** Somebody from the
  area the player actually worked in, picked from `(week, area)` through the pure hash in
  `utils.js` — never the world's seeded generator, which hands out looks and would move every
  later draw. The cite takes the authored role **verbatim**: bending it into a sentence ("the
  shift supervisor") means lowercasing it, and every rule that gets that right gets `NASA
  Flight Director` wrong.
- **The crowd is not the staff, and the first version could not tell.** Hospital Heroes has 38
  people on its roster and 30 of them are the children being treated, so the first card that
  ran said *"Nobody had to fix your work today"* over the byline `Lena, Patient`. Nothing in
  the data says "staff"; what it does say is that **one role is held by a crowd and the rest by
  one person each**. A role more than a quarter of the roster shares is the crowd, and the
  area's own leader is kept whatever their role is called.
- **Three registers, not two.** Senior, junior (grade 8 and below) and **primary** (grade 3 and
  below), because the junior lines measured at grade 3–5 on Hospital — "nobody had to fix your
  work" is three clauses' worth of syllables in nine words. Junior and primary interpolate no
  question title: a title is written at the parent course's level and one of them in a short
  sentence undoes the whole register, which is this file's nine-times-paid-for failure arriving
  through a slot fill. The rule lives in `fillSlots`, exported and asserted directly, because
  no junior line uses `{title}` today — read through the banks the case passes for the wrong
  reason and goes on passing after the guard is deleted.
- **The carry line is senior only.** The mission's `takeaway` is the one sentence on the card
  written for another surface, and 41 of the 143 junior takeaways carry a 19-to-23-word
  sentence, usually joined on a semicolon. Taking it only when it measures short enough needs a
  syllable count inside `engine/core`, and the engine deliberately imports nothing from
  `tools/` — a second copy of `SYL` drifts from the first the day either is corrected. So the
  junior and primary cards end on the compliment, which for a seven-year-old is the better last
  line anyway. The other refusal is not hypothetical: Hospital's fifteen mission takeaways all
  read "Shift complete", and *"Carry this into shift 4: Shift complete"* is worse than ending
  on what somebody just said.

**Nothing is authored, deliberately.** The alternative was a `praise:` key on every mission —
435 lines of writing across 29 campaigns, and a new book key `import-book.mjs` would have to
map or silently drop. What makes a generated line specific is that every slot in it is a fact
about the day just played.

**And the gate lied first, in the way this file records fifteen times.** It stripped the markup
and measured the card as one string — but a `<cite>` carries no full stop, so *"That is a good
watch."* plus *"Machinist's Mate Ruth Hallam, Auxiliary Division, Pumps & Patches"* plus the
next paragraph read as one 25-word sentence, and **all thirteen junior editions failed on prose
whose longest real sentence is nine words**. It measures the lede, each spoken line and the
carry line separately now. A byline is not a sentence, and a person's rank is not something a
reading level may ask to be simplified.

Thirteen selftest cases, each verified by putting the bug back. Two would otherwise invert
silently: the byline one above, and a junior line quoting a question title — invisible to every
content gate, because the title is correct where it was authored.

## Checks — one command, several tools

```sh
cd gamekit
npm run check              # every registered theme, every check
npm run check hospital     # one of them
```

`themes.json` maps a theme name to its directory, so a bare name works even for the games living in
their own package directories. Behind `check`:

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself + the contract
node engine/dev/smokeCampaign.mjs  <theme>    # the engine can reach and grade every stop
node engine/dev/probeQuestions.mjs <theme>    # no question answerable without the science
node engine/dev/answerShape.mjs    <theme>    # the longest option is not the answer key
node engine/dev/checkVoice.mjs    <theme>    # cards brief the player, they do not perform
node engine/dev/placeStory.mjs    <theme>    # the landscape matches the story told on it
node engine/dev/boardAnswer.mjs    <theme>    # the estimate board grades the question the stop asks
node engine/dev/boardAnswer.mjs --selftest    # and a solution showing a later stage of its own working is not a defect
node engine/dev/deriveRules.mjs    <theme>    # the rule half of a DERIVE reaches the screen and can be answered
node engine/dev/deriveRules.mjs --selftest    # and a step whose candidates share a rule is counted, not failed
node engine/dev/numeralWords.mjs   <theme>    # no digit stands in for the word "one"
node engine/dev/numeralWords.mjs --selftest   # and a unit, a count, an ordinal label and a ratio keep their digits
node engine/dev/sceneCast.mjs      <theme>    # somebody is in the room where the question is asked
node engine/dev/sceneCast.mjs --selftest      # and a first name alone is not a match — "Ines" is in two rosters
node engine/dev/checkPassages.mjs <theme>    # talking to somebody teaches something
node engine/dev/passageDepth.mjs   <theme>    # and there is a passage there to teach it
node engine/dev/passageDepth.mjs --selftest   # and an abbreviation is not a full stop
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/equationOrder.mjs  <theme>    # nothing is asked before the equation it is built out of
node engine/dev/conceptOrder.mjs   <theme>    # and nothing is claimed before the concept it is built out of
node engine/dev/conceptOrder.mjs --selftest   # and it can tell an earlier day from the same day
node engine/dev/dayCalls.mjs       <theme>    # no day over four calls, and no card served twice
node engine/dev/dayCalls.mjs --selftest       # and it can tell a review variant from a duplicate
node engine/dev/dayDebrief.mjs     <theme>    # the day closes on something earned, and somebody says it
node engine/dev/dayDebrief.mjs --selftest     # and it can tell a byline from a sentence
node engine/dev/placement.mjs      <theme>    # everything hung is on a wall, not in it or over a doorway
node engine/dev/vehicleKinds.mjs   <theme>    # an outdoor site can be got about in two different ways
node engine/dev/vehicleKinds.mjs --selftest   # and three trucks under three names are one kind, not three
node engine/dev/discoveryHistory.mjs <theme>  # a game that re-enacts real work credits it, and the player is not a real person
node engine/dev/discoveryHistory.mjs --selftest # and it reads the nesting the claims are actually under
node engine/dev/questionLoad.mjs   <theme>    # the questions are as small as the sentences (grade 8 and below)
node engine/dev/questionLoad.mjs --sweep      # every game: estimates that smush two equations together
node engine/dev/questionLoad.mjs --selftest   # and that gate can tell a hard campaign from an easy one
node engine/dev/worldFormats.mjs --selftest    # the six world-graded formats measure the place correctly
node engine/dev/fieldCoverage.mjs  <theme>    # the sentences the book wrote that no panel prints
node engine/dev/fieldCoverage.mjs --selftest  # and it knows which end of an alias the engine reads
node engine/dev/instrumentGoals.mjs <theme>   # the panel says what counts as done before it is done
node engine/dev/instrumentGoals.mjs --selftest # and it can tell a panel that says so from one that does not
node engine/dev/curriculumDelivery.mjs <theme> # every equation on the syllabus is computed, not just mentioned
node engine/dev/curriculumDelivery.mjs --selftest # and it can tell computing one from talking about it
node engine/dev/curriculumDelivery.mjs <theme> --snapshot before.json   # the conversion invariant:
node engine/dev/curriculumDelivery.mjs <theme> --against  before.json   # objective fixed, format variable
node engine/dev/checkStyles.mjs               # no game stylesheet re-declares the engine's
node engine/dev/readabilityParity.mjs         # the reading grade cannot tell 11.4 from "eleven point four"
node engine/dev/worldParity.mjs               # every group has somewhere to happen in the data
```

Reports that are not part of `check`, because they answer "is this good enough" rather than "is this
broken":

```sh
npm run traps                                 # break every instrument trap; all 72 must fire
npm run drive <theme>                         # drive every live panel in Chrome, right and wrong
npm run laps <theme>                          # take every warm-up run in the real game, morning by morning
node engine/dev/pieceDensity.mjs --all        # how furnished every room is, thinnest first
node engine/dev/syllabusEquations.mjs quantum # which equations a question computes, and when
npm run shots <theme>                         # a picture of every room, and a contact sheet
npm run lessons                               # harvest two real stops of every format, then
                                              # /engine/dev/lessons.html — answer them yourself
node engine/dev/cardLoad.mjs --all            # how much a player reads before they can act
node engine/dev/cardLoad.mjs <theme>          # the sweep's work list, heaviest card first
node engine/dev/cardLoad.mjs --selftest       # and it can tell a heavy card from a light one
node engine/dev/readerProbe.mjs --harvest     # hand every answerable stop to a weaker model, with the card and without
node engine/dev/readerProbe.mjs --report      # and see which cards it cannot follow
node engine/dev/readerProbe.mjs --selftest    # and the prompts carry no verdict, no rebuttal, no worked solution
```

`smokeCampaign` exists because a theme once had entirely valid content and two thirds of its
campaign unreachable; `validateContent` cannot see that.

`placement` is the one that fires rays. Four rounds of play-testing went on the same defect — boards
floating in doorways, boards hung *inside* the wall so only the dark edge shows, a mural running past
the end of the wall — and every check passed each time, because they asked whether a *point* had a
wall behind it and a notice board is a metre wide. This asks through the whole face of a fitting,
from both sides. Anything on a wall goes up through `markWallMounted` in `interiorKit`, and anything
the walls are made of through `markStructure`, because guessing which meshes are walls from their
proportions is how a checker starts lying. It cannot see a hand-built world, and it cannot see a
fitting that never said it was one. Wall furniture is placed *proud* of the line a caller passes,
never on it: a wall is raised centred on that line, so a 0.18 m wall on x = 2.1 shows its face at
2.01 and anything hung at 2.07 is inside the plaster. `furnishRoom` takes `wallThickness` and does
that arithmetic once.

`drive` answers what a checker cannot judge about an *interactive* panel. The instruments can render,
print their question, expose a commit button and never reach the grade because one selector is wrong.
On its first run it found a TRACE whose resource container shared a class with its resource buttons —
a click bubbled to a handler reading `dataset.res` off a div, the selection silently became NaN, and
every right answer graded wrong.

`shots` runs vite, renders the game in headless Chrome through SwiftShader, drives the game's own
`teleport` to each viewpoint, and writes `shots/<theme>/index.html`: every room on one page, about
two minutes for fifty views. Views come from `--at x,y,z --yaw deg`, else `themes/<theme>/shots.js`,
else the theme's `plan.js`, else a turn on the spot at the spawn. A hand-built world should have a
`shots.js`; `themes/bring_them_home/shots.js` is the worked example, and that game has no other
automatic check on where anything is.

`lessons` answers "what does one of these actually feel like to answer", across all 35 formats.
`engine/dev/lessonGallery.mjs` reads every registered game, picks the best authored instance of each
format — the richest card, from a real game rather than from Meridian, senior rather than junior —
and writes `lessons.json`; `lessons.html` mounts one at a time, answerable and graded, with a tally.
**Every format is shown twice, the second card from a different campaign**, because one card cannot
separate the renderer from the book: a SEQUENCE ordered by time and one ordered by cost are the same
panel asking different questions. The pair must come from different *families*, not merely different
theme ids — a grade-6 edition is the senior book with shorter sentences, so ROUTE's pair was
deepwatch and deepwatch_ms until `editionBase` was folded into the choice. Where no other book
authors the format the second card comes from `instruments`; where there is no second stop at all
(TALLY) the page says so rather than inventing one — TRIANGULATE has a second stop now, in `qd_tectonics`. Six formats are authored nowhere:
BELT, TRIAL, HOLD, SPOT, STACK, LOB. **Nothing on that page renders or grades anything** —
`questionUI.mountStandalone` is one hook, so the card, panel, shuffle, grading, verdict figure and
reasoning are the engine's own code, and a panel broken there is broken in the game. The tempting
version is a harness with its own copy of eight renderers, which would pass while the game was
broken. What it lacks is the campaign half: no clock, no money, so no hint and no priced way out.
Three things it found on its first run: the verdict's CSS lived in `index.html` rather than the engine
sheet, the estimate's numeric spec was looked up from a key written out in five places (stamped once
on the active challenge now), and `themes/instruments` had been titled "Template" since scaffolding.

`pieceDensity` builds each place headless — `engine/dev/headless.mjs` stubs the canvas and renderer,
since three.js touches no GPU until something renders — and counts placed pieces per room against
floor area. It is how "the rooms feel empty" became a number: Quantum's rooms hold a median of 3
pieces where the engine's case rooms hold 9–15.

In the browser console, before judging how anything looks:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

## Sequencing: nothing is claimed before what it rests on

`engine/dev/conceptOrder.mjs` is `equationOrder`'s rule one field over: *every concept a stop claims
has a base claimed on an earlier day, or the stop says in `assumes` that it takes it as read.*
Earlier and **not the same day**, because `openStopIndices()` opens a day's stops in any order, so a
prerequisite beside its dependent is one half the players meet second. `needs` on each concept lives
in `tools/syllabus.js` beside the equation `needs`. A course whose concepts carry no dependency is
not checked at all.

**Per stop, not per concept, and the difference was six real rows.** Two stops can claim one concept
and each answers for its own prerequisites; a concept-level count collapses those and hid a stop
standing *beside* its own base. `plans/blackout-sequence.html` reads `orderRows` out of the gate now
rather than keeping its own copy of the rule.

`takesAsRead:` is the hatch. The importer refuses two things about it: a title not on the syllabus,
and — the one that keeps it honest — **a concept the stop's own claim is not built out of**, because
without that the field is a place to park anything and a declaration left behind by a re-claimed stop
would go on excusing a prerequisite the stop no longer has. **A stale exemption is indistinguishable
from a considered one.** Each declaration is printed to the player as an `assumes` line, so the
sentence they read and the fact the checker reads are the same authored line.

**All sixteen senior campaigns are sequenced.** 494 concepts across 18 themes carry a `needs`, up
from 62, and every registered theme now carries a graph — **637 of 724 concepts**. Most residue was
bottom-of-graph and became declarations (Outbreak 29, Red Sand 33, Ice Core 23), which is a senior
course leaning on a first course, said out loud.

**The junior editions needed a different policy.** "Taken as read" needs an earlier course to
take it as read from: an AP course may open on frequency without teaching what a volt is, and a
grade-6 edition has nothing in front of it, so a prerequisite it declares is one it has quietly
decided not to teach. Junior rows go in the debt file instead, and `conceptOrder` **reports** any
declaration at grade 8 or below. Thirty-four declarations were stripped from two editions when the
policy was corrected.

`engine/dev/concept-debt.json` is the record; its `_` key is header, not data, and counting those
lines is how the total read 194 for an afternoon. **A file whose length is the metric needs to say
which lines are not data.** Working it down went 236 → 206: thirty rows were foundations no card
claimed, restored to the stop that teaches them (Midway's net force and SHM, Aftershock's stress and
strain, Quantum's T1, Groundtruth's charged-sheet field, the junior editions' matter and averaging).
Two batches made the number *worse* and were reverted — **a claim that clears three rows can raise
four, so re-measure after every batch.**

**The residue is ordering, not labelling, and the re-order half is far smaller than the search
says.** ContamCity and Hospital were re-ordered (22 → 16, 15 → 9), Headwater swapped four stops, and
then the pairwise swap search was run on the six themes with the largest offers: **twelve of sixteen
proposals were story-wrong**, and the way to see it is the day's own stake rather than the row count.
Aftershock offered four and lost all four — "What eight degrees does" *is* Marina Court, which is day
4, and a stop whose scene names the day's event cannot move. Junior Blackout offered three and lost
all three. **A game whose days are an event calendar (Aftershock, Red Sand) or a topic list (Midway,
Ground Truth) is not re-orderable at all**, so its rows are paid by declaring `takesAsRead` or writing
the missing question — which makes the residue mostly writing work, not permutation work.

**Midway is what the pass was for.** AP Physics 1 in derivations across an amusement park, where the
day is set by which ride you are standing at. Writing its equation graph (it had *none* of twelve)
turned up the bigger thing: **`ΣF = ma` is shown on a card from day 1 and computed by no question in
the game**, while centripetal force, the energy books, torque, the pendulum and fluid pressure are all
computed from it. Seven equation-order inversions out of one missing stop. Its rows are not order at
all — *work as a force times a distance* and *free-body thinking* are mentioned at no stop in a game
whose torque, power, friction-as-negative-work, PE and KE all rest on them. Two written stops, not a
permutation. Headwater has the calculus twin: chain rule claimed on day 2, power rule not until day 5.

**Two engine gaps the rollout exposed.** A claim no longer waits on its takeaway — the importer used
to skip a concept with no `t`, so 26 of 28 courses claimed nothing and this gate had nothing to read.
Claims are recorded now and the door still appears only when `t` is written, which separates *the
course is in a teachable order* from the 26,000 words of curriculum prose. And **`equationOrder` had
no debt file**, so authoring a truthful graph on a shipping game turned green into red in the same
commit; the realistic outcome of that is a graph somebody has quietly made wrong.
`engine/dev/equation-debt.json` exists now, same two properties as the others.

**And `derive-edition` overwrote a shipping edition without saying so.** Run on `blackout` to check
one line of output, it rewrote the nine days it was handed over the ten `blackout_ms` ships — book and
generated content — and nothing failed, because a nine-day campaign is a valid campaign. The only
evidence was a mission count in a file nobody was reading, which is house rule 14's shape one
directory over. It refuses now unless `--force`, and prints how many days the edition currently ships.
It also strips `concept:`/`takesAsRead:` on the way across, because a junior concept list shares no
title with its parent's — carried over, every one is a title the importer refuses, *after* the edition
has been written.

## The card: what a stop puts in front of a player

A stop may carry **two paragraphs and a door**. `scene` says what has happened and defines any word
the question needs. `guide` says what the player does and what the numbers mean. `background` is a
list of paragraphs behind one button: the background prose, then **each syllabus equation spelled out
in a sentence** with its symbols named, then the glossary definitions, then `assumes` and `takeaway`.
A chip reading `n_phys ≈ d²` is useful only to somebody who already knows what it says. A stop with a
`guide` suppresses the panel's own three lines, and authoring a panel hint beside one is refused
rather than dropped.

**That shape came from getting the fix wrong first.** Adding the method line and goal line to four
panels left the card carrying *six* blocks before the player touched anything: scene, "takes as read",
"what this is about", a row of syllabus equation chips — two of which, `F_total ≈ F^n` and
`n_phys ≈ d² per logical qubit`, have nothing to do with the question — a row of glossary chips, then
the panel's three lines, one restating the question. **Every block was defensible on its own and the
sum was unreadable. Explaining a format is not the same as adding a block that explains it.**
Quantum's HOLDOUT is the worked example: scene at F–K 6.8, guide at 4.0, background 4.4–6.3, and the
coin-flip explanation of why a 4,000-shot percentage wobbles is *more* physics than the card had
before — it is just not in the way.

**`Key concept` is a second door beside `Background`**, the two in one row (`.askDoors`; a closed door
is a pill and an open one takes the width, because a `<details>` body squeezed into a flex column is a
paragraph two words wide). The Background label lost its tail on the way — two pills of five words
each read as a paragraph of controls rather than two things to press.

**The card was printing a claim nobody had earned.** It said `Concept 19 of 32 on this course`, which
a player on day 1 reads as the nineteenth thing they are being taught. The syllabus list is grouped by
topic, not ordered by dependency — it puts transformers at 13 and Faraday's law at 17 — so its index
cannot mean "how far in this is". The count is fine and the ordinal is not. It reads `One of 32
concepts on this course` now, followed by what the idea **rests on**, with anything taken as read
marked as such. Found by playing the game, after every check was green.

**Which concept a stop is about has to be picked, and the pick is the whole of the work.**
`conceptCoverage` answers "which stops touch this concept"; the card asks the opposite question and it
is not that lookup inverted. The matcher is keywords over the whole question, so across 838 senior
stops the median matches **three** concepts, the worst thirteen, and 19 match none. `pickKeyConcept`
scores on two things a bare keyword hit cannot see — **where it landed** (title 5, ask and takeaway 4,
scene and why 2, an option label 1, and an option-only match can never win) and **how rare it is
across the campaign**, since a concept twenty stops mention is the course's background hum and one
that three mention is what those three are for. Rarity needs the whole campaign, so it is a post-pass
in `import-book.mjs` and the engine reads a stamped `lesson.concept` rather than reaching into
`tools/`.

**A mechanism bonus was tried and removed, and it is the one term that made the pick worse.** On
Blackout it handed three method stops to a mechanism that was not their subject — the TRACE on what
order the records claim and the CHOICE on the sensor that was confident and wrong both went to a
transmission concept over `Metering, instrument transformers and measurement error`, which is what
those two questions are about. Half this catalogue's instruments have method as their subject, so a
standing thumb against method concepts is a thumb against the formats. Two rarity curves moved
nothing, so the scoring is the simplest thing that works. The honest name for the field is *the
concept this stop is most likely about*.

**The takeaway is authored, and fixed per concept rather than per stop.** `t` on each syllabus
concept, two sentences and 30–45 words: what the idea says, then what it lets you decide. Every stop
scoring to `Protection: relays, breakers and coordination` opens onto the same two sentences, which is
the difference between this door and everything else on the card — `takeaway` is the principle *this*
question is an instance of, written once for one stop. **A concept with no `t` stamps nothing and
shows no door**, which is why adding this changed the generated content of exactly one game: an empty
door is worse than none, and it teaches a player not to press the next one. 32 of 692 concepts across
27 courses are written; the other 660 are the work list.

**And it is a leak the existing probe could not see.** A per-stop takeaway giving the answer away
costs one question; a *concept* takeaway that does costs every stop the picker sends there, and nobody
rewriting the stop would think to look at the syllabus. `probeQuestions` now runs the takeaway's LEAK
test against `concept.t` as well — shared-content-word fraction at a higher threshold, since 40 words
collect more of anything by chance, plus a verbatim-run test insensitive to length.

**`gamekit/QUESTION_BRIEF.md` is the sweep brief** — the card shape, the six mechanics a guide has to
answer, the line between a caution and the answer, and §5, the rule that authored numbers have to be
*possible*. `cardLoad` is its measurement: 1,334 stops, median card 75 words in 5–6 blocks, **so the
defect is fragmentation, not length**. The target is per tier — 4 blocks for a card, 6 for a stop with
an instrument, which keeps its own hint and its "what counts as done" — because one number either
excuses the fragmentation or bans two blocks worth keeping. A briefed stop drops only the format's
generic lecture, through `game.briefed`, stamped in `normalize.js` and read by `method()`.

**The second paragraph of a card is for the question, not the controls.** 836 of the 1,045 board and
CHOICE stops carried a mechanics paragraph — "choose one of the 4 and press Check; the options are
dealt in a fresh order each time" — in six distinct texts. Every word was already on screen: each
board format prints its own `compactInstruction` a few pixels below, so the one place a player looks
for help with the *question* explained a control they could see. All 1,045 rewritten to
`QUESTION_BRIEF.md` §7a: what the options disagree about, the test that separates them, what the
distinction costs. No mechanics, never the answer, and **never a restatement of the scene** — which
needs measuring rather than trusting, because thirty-three guides quoted a run of their own scene back
at the player and every one read well in isolation.

Sweep progress: **262 of 1,333 briefed, and tier 1 is finished** — all 19 live panels and all 244
instrument stops, across every game and every junior edition. Left: tier 2, the 728 board stops (of
which BALLPARK's 206 always need a guide), and tier 3, the 343 CHOICE stops, which need only the fold
they already have.

**The sweep broke its own reading rule.** The first 84 guides carried 42 sentences over the 28-word
cap, every one a compound joined by an em dash, a semicolon or ", so" — fluent to write and over the
bar. Cut at the joint and re-measured, which is the only reason it was found: the prose read well
enough that nothing but `cardLoad`'s own column objected. And `tools/brief-stop.mjs` now refuses to
write a book whose bytes changed since it read them, because it clobbers a concurrent session
otherwise — Meridian's stop count moved twice mid-sweep and the only visible symptom was a total
dropping by one.

## Panels: the four rules a live instrument obeys

1. **A panel that enforces the player's decision has removed it.** TALLY's subject is *when is there
   enough data to report* — and a player said "I just keep clicking until it lets me submit, there is
   no challenge." They were right: the commit button unlocked at `minShots`, and at Quantum's numbers
   that floor already put the statistic inside its own tolerance about 95% of the time
   (σ = √(Σ4p(1−p)/n) is 0.072 at 400 shots a pair against a tolerance of 0.14). Lowering the floor
   does not fix it either, because shots are free and the clock is stopped behind a panel, so the
   correct play becomes clicking forty times — tedium, not judgment. **`tally.budget` is the fix**: a
   finite pot of batches for the whole stop, spent across the pairs, with Run dying when it is gone and
   commit allowed the moment the pot is empty whatever state the pairs are in (a player who dumps the
   budget on one row must not be locked in). All four correlations enter with equal weight, so an even
   split buys a better statistic than the same pot poured into the noisiest row — the strategy is real
   and it is in the background rather than the guide. Quantum's is 24 batches of 100 with a floor of 1:
   reporting at the floor is a coin toss, full even spend is 2.4σ. Two trapped importer refusals: a
   floor whose scatter is already inside the tolerance, and a budget too small for an even split to
   pass.
2. **A panel that grades against a number has to print that number, and the distinction that makes
   that safe is `instruments.js` rule 2.** The panel never prints the *target*, because the target is
   the **answer**; a **goal** is the constraint the answer is written against, and they are not the
   same object. Print "at least 95% inside the corridor"; never print BALANCE's total, which *is* the
   answer. And grading slack on a value the player reports — a BALLPARK tolerance, a VERIFY band, a
   HOLDOUT pass mark, CLOUD's `report` tolerances — stays unprinted: knowing it changes nothing about
   how you get there and invites aiming at the edge of it. `engine/dev/instrumentGoals.mjs` is the
   check, with a selftest, and it fired on four panels the first time it ran. Bring Them Home's FLY
   graded a plan against four criteria — arrive at 90 ± 3 degrees, turning under 1 deg/s, no more than
   16 s of thruster — and printed none of them until after the *single* run it allowed, with the target
   line parked off-canvas. Every check was green, because every check reads the book and the book had
   all four numbers.
3. **A panel that simulates has to let you simulate twice.**
4. **A greyed-out button is only fair when the panel says what is missing.** CONTROL's commit was
   gated on having isolated *the culprit* and reversed it — so the button lighting up announced which
   machine was the answer, rule 1 broken by the enabling rule of a button. The gate is now about the
   variable the player has **named**: isolate it, put it back, then commit, with a strip under the rows
   saying what is outstanding.

**TALLY's subject is convergence, and for most of this engine's life the only picture of it arrived in
the verdict** — after the decision it was evidence for. A column of counts cannot show a number
settling. The panel draws the statistic against shots taken with the same `lineChart` the verdict uses,
redrawn as each batch lands, plus a per-pair ±1σ column and a combined spread: the trace answers *when*
it has converged and the column answers *which row is still moving it*, which is the whole of how a
finite budget should be split. The bound is drawn and the target and tolerance are not.

**CLOUD printed the two numbers it was supposed to be teaching.** Its subject is that a spread is a
spread rather than a number with a decoration on it — and its readouts said `nominal 6.90` and
`spread (1σ) 0.90`, with a bell drawn with its peak on the answer. A player read the centre and width
off the panel, bought actions until the "inside the limits" percentage cleared the pass mark, and never
had to find either number in the scatter. The cloud was scenery. Now **the mean and the uncertainty are
reported by placing them**: three bars over the points — the middle, and ±1σ either side — dragged on
the plot or driven from two sliders, with live counts of how many points fall below the middle, above
it, and between the σ bars. Placed right, a pair halves the cloud and holds about 68% of it, which is
what one sigma *means* and what no version of this panel had asked anybody to notice. Four things keep
it honest: dragging the middle bar carries both σ bars with it and dragging either σ bar moves the
other the same distance the other way, so the controls are the format's own moral; the drawn bell is
the player's *report*, never the truth; the samples are standardised to the authored mean and spread,
so the report is graded against the cloud on the screen and a seed cannot decide a right answer; and an
action makes the report stale, so both bars have to be placed again and the strip says which is
outstanding rather than greying the button and saying nothing. `report: { centreTol, spreadTol }` is the
placement slack — 0.3 of the finishing spread by default, so a narrowed cloud has to be located better.
Two trapped refusals: a tolerance wider than half the finishing spread, and one that is not positive.

**SCIENCETANK had it backwards twice, and `rules` is the fix.** A tank stop's second paragraph was the
*scoring* rule — commit eighty of the hundred, thirty-five on one proposal — while the `evidence` the
allocation is argued from sat behind a collapsed disclosure inside the panel. So the player met the
arithmetic before a single fact. `rules` is an authorable field rendered as its own **Rules** button,
the evidence moves up into `guide`, and the panel drops its own "Evidence available" disclosure when a
stop carries `rules`. The editorial half matters as much: **evidence that only describes the proposals
worth funding is a hint, not evidence.** Fourteen of the 31 tank stops had no evidence at all.

**SWEEP, HOLDOUT, TALLY and PROBE printed no `METHOD` line and no goal line**, because both come from
`instruments.js` and those four predate that registry and live in `questionUI.js` — the four most
instrument-like panels in the engine were the four that never said what kind of move they were. Three
also hardcoded their hint, so a book could not explain its own panel. Quantum's day-10 HOLDOUT asked
you to choose a threshold on one batch, freeze it, and report what it scores on a batch it never saw;
its two tabs said "Calibration shots" and "Shots it has never seen", and *nothing said what either was*,
what a shot is, or why a broad plateau should be trusted where a tall narrow spike should not. All of it
was in `why`, which arrives after the answer. Fixed for all four, not for the one stop: `METHOD` gained
their four lines, `methodBlock` and `goalBlock` are exported from `instruments.js` so the markup and
classes stay single, and `hint` + `goals` are authorable on all four. HOLDOUT also takes
`fitNote`/`testNote` — what each batch *is*, per stop, since a batch is shots in one game and patients in
another — and its idle tab says "no number until you freeze" rather than sitting blank. The pass mark
stays unprinted, and `npm run traps` fires when a book puts it in the hint.

**Then those two new blocks broke the panel, in the way this repo has paid for twice.**
`.modalBody .modalActions` is `position:sticky; bottom:0`, so 150 px of explanation pushed the slider,
the axis labels and both readouts *under* the pinned action row: a plot, a gap, and a button. And
`scrollIntoView({ block: 'nearest' })` — the remedy SWEEP already carried — **does not fix it**, because
an element one pixel inside the scroll container is "in view" by that definition and entirely hidden by
the bar over it; the browser scrolled six pixels and stopped. `showControls()` subtracts the bar's own
height, and all four panels call it. **The DOM had every element, the checks were green, and only a
picture showed the controls were gone.**

## A card is followable or it is not, and one reading cannot tell you which

`engine/dev/readerProbe.mjs` hands every answerable stop to Haiku twice — once
with everything the player sees before answering, once with the question and the
options alone — and reports the pair. 53 of the 90 Quick Discovery stops; the
other 37 are live instruments whose answer is a sequence of moves on a panel, and
serialising those into text would invent a question the game does not ask.

**The pair is the point, and three of its four cells are findings.** Wrong both
ways is a card missing something the question needs. Right without the card and
wrong with it is a card that actively misled. Right both ways is answerable
without the science. Only right-with, wrong-without is the question working.

**But the first version of this reported a clean sweep and it was wrong.** Two
harness bugs came out of the readers rather than the score: DIAGNOSIS candidates
are `{label, mechanism}` objects, so four stops were served **"[object Object]"**
as their options — and the tally recorded two of them *correct*, because the
reader guessed and said so only in the field asking what was unclear. The other
was a BALLPARK template reusing one slot (`{0} × {0}`) under an instruction
saying "choose 1 tiles". **A reader's complaint is data the score cannot carry**,
which is why the prompt asks for the exact phrase it could not follow.

**And the real defect was found by a person, after the sweep said all clear.**
The CMB day-1 ordering stop — five checks on a receiver — asked what a normal
person is supposed to do with it. The card gave **two ordering rules that
disagree at one pair**. Its axis and guide led with interpretability (*"each one
is only interpretable once the ones before it are clear"*, *"this is not a
preference"*, *"work outward from the thing everything else is measured
against"*), and worked outward that rule puts the horn before the sky repeat. The
key is the other way round, and the only thing justifying it is cost — the horn
needs a ladder — which appears in a background bullet arguing the horn should not
be *first*, and in the `why`, which arrives after the answer. **A player
following the stated rule gets it wrong.** Eclipse day 2 is the same class: the
only card carrying a date says *"months early"* and is not the first step.

**Why the probe had not flagged it, and this is the lesson.** It had — on the
first run, in the wrong-both-ways bucket. A rerun after the harness fixes got it
right and the rerun is what got reported. **A stop that flips between runs is the
finding**, and one sample per condition cannot tell a question that was worked
from one that was guessed. The harness now takes repeat runs and reports how many
**distinct** answers a stop produced, plus, for orderings, how many adjacent
swaps from the key — because exact match alone scores a one-pair slip and a random
permutation identically, and for a five-card SEQUENCE that difference is the whole
signal. Asked four times, the CMB stop was right twice and gave two answers
differing in exactly the pair the two rules disagree about.

Both cards were rewritten to name the governing rule and say which wins where the
two collide, rather than reordering the cards — the authored order is the better
practice and the defect was that the card would not admit which principle it was
using. **33 stops asked more than once, 2 gave more than one answer, and both were
SEQUENCE.** After the rewrite each is 4/4 with one answer, and the CMB stop now
fails the bare condition, which is the cell a working question belongs in.

Two things the repeat count got wrong before it was right, both in the direction
of confident noise: rounding counted as disagreement (`AB 2.72` and `AB 2.73` put
two boards in the no-followable-answer bucket that were right every time), so only
the graded part of an answer is compared; and the leak check exempts `answer` when
it is one of the options, because `validateContent` requires `choices` to contain
`correctChoice` verbatim and 14 stops repeat it in `answerText` — an exact-match
rule failed all 14 on its first run. The exemption is against the bare label, and
a planted verdict is a selftest case, because a leak checker that never fires
reports every prompt clean.

**One structural thing the probe cannot fix.** `questionLoad` already bans a
SEQUENCE graded as one exact permutation with no feedback — 51 of Hospital's 110
findings are that decision. It applies at **grade 8 and below**, and every Quick
Discovery is `audience.grade: 9`. Five cards is one in a hundred and twenty. The
ten short games sit one grade above the gate written for exactly this, which is
the grade-2 exemption in this file's own table arriving from the other end.

**What the bare column does not mean.** The reader is a language model, so its
prior is undergraduate physics rather than a ninth grader's, and 46 of 53 stops
came back right with no card at all. That is not a defect list and the report
prints so above the table. What it is good for is narrower: an option set that
falls to elimination on general grounds. Read the reader's own `because` — if it
cites only the option text and never the science, that is the finding.

## The discovery games name the real people, and the player is never one of them

**The player is an unnamed role in all ten, and that is the rule.** Every Quick
Discovery opens *"You are the analyst on the team"*, *"the expedition
astronomer"*, *"the radio astronomer on the site"* — a job, never a name. It has
to stay that way now the rest of the cast is real: the ending tells the player
*you made those calls*, and attributing those to somebody who existed is a claim
about what that person did rather than a dramatisation of what they did.

**Everybody else is real where one identifiable person held that role.** 39 of the
60 roster slots across the ten games are now the people who did the work —
Rutherford, Geiger and Marsden; Eddington, Cottingham, Crommelin and Davidson;
Leavitt, Slipher, Hubble and Humason; Franklin, Gosling, Crick, Randall and
Chargaff; Tharp, Hess, Matthews, Benioff and Ewing; Penzias, Wilson, Dicke,
Wilkinson and Roll; Schmidt, Riess, Filippenko and Suntzeff; Mayor, Queloz and
Charbonneau; Ellis, Gross, Gianotti and Incandela; Weiss and González. The other
21 stay invented, and **the reason is not squeamishness**: a Higgs reconstruction
lead or a LIGO parameter-estimation lead was a job held by dozens, and picking one
name for it invents a fact rather than reporting one.

**What it replaced was worse than either.** Three rosters were *pastiche* —
`Ernest Rutherfield`, `Hedda Geiger` (real surname, invented first name),
`Tomas Marsden`, `Marta Leavett`, `Anton Slipworth`. Not real, so nobody was
credited; close enough that a reader who knew the history saw three mangled names
and one who did not learnt three that were almost right and would go on to
mis-cite them. `qd_nucleus` was the sharpest case: a fake Rutherford standing in a
scene that *is* the Geiger–Marsden experiment, on a blackboard already citing
*Thomson, 1904* and *Bragg, 1906* by their real names.

**`theme.history` is the closing note, and it is a different voice from the
ending.** The ending is the last beat of the fiction and is addressed to the
player — `checkStory` enforces that. This steps out: the real people, the real
date and institution, what the game compressed, and one paragraph of *what it does
not soften* — Franklin's data reaching Cambridge without her consent, Tharp's name
off the papers, Hubble's distances a factor of seven small, the blind injections
LIGO had been running for years. It lives in `theme.js` beside `ending` (the
importer has never touched either) and renders as its own block under the ending
card, above the rating.

**`real: true` on a roster entry is the one book key this needed, and it exists
for what it forbids.** `engine/dev/discoveryHistory.mjs` is the gate, in `npm run
check`:

- every Quick Discovery declares a `history` note of at least 60 words;
- every roster person flagged `real` is named in that note, so a rename cannot
  drift the cast and the credit apart;
- the opening casts the player as a role and never as a real person;
- **no ATTEST claim the game marks unsupported is `signedBy` a real person.**
  ATTEST's whole subject is that the record is not the condition, so the board is
  built out of claims that do not hold. An invented colleague signing one is
  drama; a real scientist signing one is a sentence the game invented and put in
  a living person's mouth. The books already did this by hand — every unsupported
  claim is signed by `press office`, `a review draft`, `a summer student`, `a
  theory group` — and the flag is what keeps it true after a rename. Declared and
  not inferred, because nothing can tell `Ernest Marsden` from `Ernest
  Rutherfield` by looking.

**And the gate passed that fourth rule for the wrong reason on its first run.**
The carver read `lesson.attest.claims`; the format payload hangs off
`lesson.game.attest`. So it found **zero ATTEST boards in every campaign**, ticked
all ten games, and passed a deliberately injected Gianotti signature — the same
one-level-too-high read that once reported nine mute instruments in
`fieldCoverage`. Two selftest cases were added from the shipped nesting, and the
row now prints the board count, so a carver going blind shows up in the ordinary
output rather than only under an injection. All three rules are verified by
putting each bug back and watching only that rule fire.

**A consequence to keep in view.** The invented rosters were deliberately diverse;
the real 1911 Manchester, 1919 eclipse and 1953 King's casts are not, and eleven
slots changed gender in the rewrite. Tharp, Franklin, Leavitt, Gianotti and
González are real and stay; most slots had no such option. The supporting slots
were kept invented partly to hold some of it, and the notes say plainly what each
of those women was denied at the time.

## Every outdoor site can be got about two ways

**Seven of the eight two-tier campaigns promised a vehicle that did not exist.**
`orientation.js` opens the far tier on the unlock day and `src/main.js` signs the
vehicles out on the same morning, and the warm-up card the player reads before
anything else that day says so out loud — *"they are far enough out that transport
is signed out to reach them. Drive the route once before somebody is waiting at
the other end."* Outbreak, Aftershock, Wellmere, Carrying Capacity, Slack Water,
Overwind and Dark Fibre shipped with **no driveable vehicle in the world at all**,
the far ground 190–320 m out and nothing to take. Only Planetary Defense had any.
Every content gate was green, because the book was right: this is the HUNT-count
defect in a different currency, and only a person walking out of the plan card and
looking would ever have seen it.

**The second half is about the place rather than the promise.** A site whose only
transport is a truck asks nothing about how to get about — there is one answer and
it is always the same answer, which is the argument the countdown rests on with the
route taken out of it. So **two kinds, chosen from what the site is already about**:
Slack Water's van has the barrage road and its quad crosses the mud to the training
wall; Corbin Park's flatbed carries and its cart fits down a three-metre midway a
flatbed is three-point-turned on; Red Sand's rover is a habitat that costs the power
budget sol 12 is an ALLOCATE about, and its buggy is a frame you ride in the suit you
are already wearing. **Period, not just function** — Project Y gets bicycles because
the Hill ran on them, the 1919 eclipse camp gets a spoked-wheel motor lorry, and the
1964 antenna site gets a Bell service van and a staff car.

`engine/dev/vehicleKinds.mjs` is the gate, inside `npm run check`. **18 outdoor
sites, all at two kinds, no debt file** — the gap was closed in the same pass the
gate was written, so there is nothing to record.

- **It builds the world and reads `ctx.interactables`, never the source.** Three
  trucks in three colours are three `driveable(` calls and **one** kind: Red Sand
  parks "pressurised rover", "plant rover" and "excavation rover", Ice Core three
  tractors under three names, and a grep would have called both sites varied.
  `kind` is a field on the call, and **an unstated kind is one bucket rather than a
  guess off the label** — two vehicles that decline to say what they are must not
  count as two because they are spelled differently. Both are selftest cases, and
  the third is that the rule still separates a van from a quad, without which the
  first two pass by the counter being broken in the safe direction.
- **A vehicle parked inside a collider is one you get into and cannot move** —
  house rule 16 reached from the other side, and the symptom is identical: you press
  W and nothing happens. `kit.clearSpot` walks a deterministic spiral (never the
  world's seeded generator, which hands out faces) and the spawn is always in its
  avoid list. The gate reports anything inside 10 m of the spawn as well, and both
  assertions were verified by putting the bug back — a same-kind pair fails exactly
  that theme, and a vehicle placed on the spawn fires exactly that line.
- **Interiors are skipped on what the site says it is, not which file builds it.**
  Five interiors bring their own world module, so testing `world:` would have
  excluded an *outdoor* theme that did the same. An outdoor theme with its own world
  module and no vehicles found is a **failure**, not a pass: "this cannot see your
  motor pool" and "you have no motor pool" are the same output, and passing on the
  ambiguity is how a gate reports all-clear on the one theme it cannot read.

**What the pass added to the kit**, because eight themes were about to write it
each: `bicycle` + `BICYCLE_DRIVE`, `quadBike` + `QUAD_DRIVE`, `utilityCart` +
`CART_DRIVE`, `VEHICLE_DRIVE` for `kit.vehicle`, `bicycleRack`, and `clearSpot`.
Five are theme-local because only one place has one — Ice Core's skidoo, Red Sand's
open buggy, the eclipse camp's 1919 lorry, the CMB site's staff car.

**And the screenshots found three things no number would have.** Ice Core's three
skidoos were `kit.scooter` calls — **kick scooters, on a polar plateau, under a
comment calling them skidoos**, and none of them takeable; the comment had been
right about what the camp needs since the day it was written. The new bicycle drew
its spokes as a thin steel *disc*, which renders as a solid grey wheel: a moped, and
from ten metres the wheel is the only thing telling you which of the two is parked
there — eight boxes cost eight meshes and read correctly. And the basket floated a
hand's width clear of the bike in two directions at once. **The bicycle passed its
own headless test all three times**, because that test asks whether the hubs are on
the ground.

## Two tiers of ground, and the two laps that teach them

**A site with a far half opens it on day 4, with the keys.** `engine/core/orientation.js` measures every
area from the spawn, and a **far tier exists only when the split is real**: the nearest far area must be
at least twice the distance of the furthest near one *and* at least 120 m out. Both terms are
load-bearing — the ratio alone called Calder two-tier, where the "far" metering hut is 48 m from the gate
and visible from it; the distance alone would split a uniformly spread site. Nothing is authored: move a
building and the split follows, and a `tier: 'far'` in site.js is a second description of the map.

Eight themes have a far tier: Outbreak, Planetary Defense, Aftershock, Wellmere and their four grade-6
editions. **Every other theme is untouched with no flag to set** — there is no far ground on a submarine
and no vehicle to unlock in Mission Control.

- **Before day 1, a lap of the near ground; on day 4, a lap of the far ground.** Both are TRIAL, the one
  format graded against the world. The gates are the areas' own entry points — the same positions the
  budget walks and the map draws — so a lap needs no authoring.
- **The lap grades nothing and can be skipped.** TRIAL-the-format grades order because order is its
  subject; there is no science in "which of these six sheds is which", and on day 1 the player has been
  taught nothing to order it by. A second-campaign player made to sit through a tutorial is a player who
  stops on day 1. Skipping marks it done; so does abandoning half way.
- **The far ground is walkable from the first morning — it is just not *called*.** Locking it would be
  house rule 8 with a schedule attached.
- **The vehicles come out on the same day.** `AIRCRAFT_FROM_DAY` existed for one theme's helicopter;
  scooters and cars were never gated. Both are `VEHICLES_FROM_DAY` now, driven by the tier rule. Signing
  them out earlier would let a player drive to ground with nothing open on it. **Seven of the eight
  two-tier sites had no vehicle to sign out** — see the section above.
- **`shapeMissions` trades far calls out of the opening days rather than moving them.** Every two-tier
  campaign teaches in its far half on day 1 — Wellmere had seven of its first ten calls out past the
  glasshouses. A far call on day 2 swaps with a near call from a later day: both days keep their stop
  count, every lesson is still taught, the books are untouched, and only the order two lessons are met in
  changes. Wellmere 7 far calls in days 1–3 → 4, Aftershock 6 → 1, Planetary Defense 3 → 2, Outbreak was
  already 0.
- **It reasons about equations not at all, deliberately.** A second dependency solver in `normalize.js`
  would be a second description of a rule `equationOrder` owns. So the swap is conservative — it prefers
  the *latest* partner, pushing lessons later rather than earlier, because a course is written so later
  work depends on earlier — and `equationOrder` is the guard. It passes on all four.
- **What cannot be traded is reported, not dropped.** Wellmere's spawn sits beside the vault and the lab
  and everything else is out in the rings, so only two areas are near: a day can hold at most two near
  calls before the third becomes a person hunt. That is a limit of the place, it is printed as a change,
  and **a silent exception is how a rule stops meaning anything.**
- **The tiers are stamped on the content, not passed at each call site.** `theme.js` normalises once with
  the site; every checker that re-normalises reads the same `content.TIERS`.

## Seven runs open the campaign, and each needs a reason

**`engine/core/warmups.js` is the schedule and the only copy of it.** The seven world-graded formats —
TRIAL, GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG — run *before* a day's plan card, and which runs when is
a property of the campaign rather than the ground:

    before day 1 and day 2   TRIAL and GREET, in either order
    before the unlock day    TRIAL again, and only where there is far ground
    after that               FOLLOW, HUNT, CANVASS, EVADE, TAG, one a day, in
                             order, spread evenly over every morning that is
                             left — first as early as it can be, last on the
                             final day of the campaign

**Spread, not stacked.** Handing the five out on the next five free mornings put all seven inside the
first week of a fifteen-day campaign and left the back half opening on nothing — blocked practice in the
one part of the day a player meets before anything else, the mistake `shapeMissions` already fixes for
lessons. Blackout now runs on days 1, 2, 3, 6, 9, 12, 15. Three selftest cases hold it: the last run lands
on the last day, no two land on consecutive days, at least two fall in the second half.

**Either order is decided rather than left open.** A two-tier site opens on TRIAL, because what a player
cannot read on that first plan card is the ground; a one-tier site opens on GREET, because its ground is
one building and what they cannot read is who everybody is. **The save key is the slot, not the format** —
`trial-near` and `trial-far` are separate keys because the old two-key scheme would let one lap mark the
other done the moment a third existed.

**The schedule is engine logic; the reason is authored.** `warmups:` in the book gives each slot a title
and a `why` — worried about spies, six earths and a log that says five, catch Whitlock before she drives
off. A run with no reason is a tutorial, and the day model has a rule against those. The importer refuses a
slot name that is not one of the seven, a `why` under twelve words, and a `trial-far` on a one-tier site.
Everything the run needs defaults from the campaign's own data.

**`engine/dev/warmupOrder.mjs` checks both halves, and only one can be in debt** — the authoring, in `warmup-debt.json`. It asserts the
*properties* the schedule has to have rather than comparing against a table, because a table would be a
second description of the rule. Fifteen selftest cases, including the two that would otherwise invert
silently — the two laps sharing a save slot, and a five-day campaign asked for five tail runs it has no
room for. **The debt is paid: 204 slots across 28 campaigns → nothing.** All 29 campaigns author all seven
(eight where there is far ground), so an unwritten slot fails immediately. What the writing turned up is
that the reason is campaign-specific in a way the schedule is not: HUNT is six earths at Calder, eleven
bagged heads at Wellmere, fourteen ventilators at Riverton, nine spare tapes in Mission Control. That is
the argument for authoring it at all — the generic `DEFAULT_WORDS` render a run that works and a run
nobody is doing for a reason. **The junior editions do not inherit the senior's warm-ups**, and
`derive-edition` does not carry the block across: a `why` written for an AP reader is the
demand-stays-put failure this file records three times over.

**`npm run laps <theme>` drives them in the real game, and found three things no check could.**
`warmupOrder` asserts the schedule and `worldFormats` asserts the formats against a fake world; neither can
see `runLap` in `src/main.js`, which is the wiring between them. `engine/dev/lapDrive.mjs` boots the actual
game in headless Chrome, opens the plan on every morning, reads the card, takes the run, checks a HUD
appeared and gives it up with Esc.

- **EVADE was handed a `quarry` where the format reads `pursuer`.** So `npcById` found nobody, the run
  started and finished on its first frame, and the lap was marked done — from the plan card
  indistinguishable from a format that does not exist. One word. Both EVADE and TAG now **refuse to start**
  with nobody in them, because a run that ends immediately and a run that never mounted look the same. The
  TAG selftest case needs its **own rig**: `begin` also refuses while a run is already going, so on the
  shared rig it passed for that reason instead of its own.
- **The story named a count the run cannot place.** HUNT puts one item at each area entry, so "Eleven
  bagged heads" on a six-area site is a card that lies about its own run; **twenty of twenty-nine campaigns
  were wrong**, and only the HUD ever put the two numbers side by side. All twenty rewritten, the count is
  an importer refusal, and `item: { name, plural }` is authorable so the HUD reads "0 of 6 earths".

**Ten things a person found by playing the runs, none of which a check could see.** One lesson: a warm-up is
read and walked, and everything wrong with it was wrong in a way only that tells you.

- A finished run said "That is the round" and a summary; it says *Congrats! You are now ready to start the
  day* and nothing else, because the tally is already on the HUD. And the card offering a run no longer
  carries "nothing here is graded, the clock does not start until you take the plan" — two sentences of
  mechanics on the one card whose job is the reason for the run.
- **TRIAL's gates carried a name board four metres up.** A panel with no post under it reads as a hoarding
  on the roof of the building it names. Gone; putting the name on the beacon instead only printed it under
  the building's own sign, so the gate says "here" and the HUD and map carry the names.
- **The clock ran up.** A stopwatch with no number to beat is a readout, so TRIAL counts **down**, from the
  route the gates actually make: nearest-neighbour from the spawn at walking pace with half again on top,
  capped at fifteen minutes, driven pace on the far lap. Nothing authored. A run that ends on the clock is
  short of gates, and `instruments.js` refuses to commit a partial order as a route.
- **The near lap was handed the whole site.** At Planetary Defense — base camp inside 200 m, outstations
  1.6 km down the ridge — the first morning's countdown came out at **eighty-one minutes**. The near lap is
  `TIERS.near` and the far lap `TIERS.far`, which is what makes the second lap worth taking.
- **A windowed map drew nothing for the gates it had cut off.** `mapRadius` is 170 m at Planetary Defense,
  so the far lap's four gates were simply absent — a lap of ground the map denied existed. A running
  format's pins now get the edge arrows buildings and wanted people already had, first in the queue.
- **The day's own markers stayed up during a run** — the waypoint post, the cones over the next person (the
  one thing allowed to draw through walls) and the "Still open" banner, all pointing at work with nothing to
  do with the run. `showDayMarkers(false)` for the length of it, in one call because there are three of them
  in three files and a fourth would be forgotten. Both run HUDs also moved out of the stat bar.
- **GREET labelled people with a four-letter area code** — `OPS`, `TRI`, `SONAR`: what the save file needs,
  not what a person would say about themselves. The subtitle over somebody's head is their `role`. Two
  roster entries had a department where the job should be (*Metering & Standards*, *Load Forecasting*) and
  read as nonsense the moment anything printed them in a sentence.
- **The cards promised everybody.** GREET's target is about 70% of the roster and eighteen books said "put a
  name to everybody", so the run ends with the job apparently half done. All ask for as many as you can get
  round.
- **A card named a stranger.** "Farrow wants you known to both" is read on the first morning, when nobody is
  anybody yet. Every name a warm-up uses is introduced on that card, with the job beside it, and
  `warmupOrder` fails a campaign that does not — four accepted shapes (apposition, full name, role-then-name,
  or a verb stating the job). Two selftest cases exist because the first version passed for the wrong reason:
  `Dr.` read as a first name, so "Dr. Patel has the notes" counted as a full-name introduction while saying
  nothing about what she does.
- **TAG and EVADE inherited whatever gap the crowd had wandered into.** On Blackout's day 15 the quarry stood
  two metres from the spawn, so the run was won on its first frame — the same "already over" failure as the
  wrong spec key, arriving through geometry. Both set the gap up: a quarry too close is stood back to twelve
  metres, a pursuer who starts clear is brought inside the ring, and a person already at a fair distance is
  left alone, because teleporting somebody the player can see is worse than the problem.

**`export-book.mjs` was lossy in a way that only shows when you need it.** It knew the six formats predating
the instrument registry, so a book recovered from a game came back with **every instrument board deleted** —
and no `guide`, no `background`, no `warmups`, which is the whole of the card sweep and the whole of the run
stories. Found the worst way: `git checkout` on a book with a day's uncommitted work in it. ContamCity was
recovered and is parity-clean, at the cost of the book's comments and line wrapping. The exporter writes each
format's own block by name — `g[format]`, so a twenty-first instrument exports the day it is authored — plus
`guide`, `background`, `rules`, `hint`, `goals`, `concept` and `warmups`. **A recovery path nobody has
exercised is not a recovery path**, and the way to exercise this one is export → import → `bookParity`.

## A mission is a day, and a day is a countdown

The campaign clock is gone. It charged time in lumps — `walkCost` on arrival, `visitBuildingCost` on
opening a question, a penalty for a wrong answer — so the player could not see what a decision cost until
after making it, and standing still was free. The optimal play was to think as long as you liked and then
walk in a straight line.

- **The day opens with a plan.** `createDay()` in `engine/core/app.js` puts up the calls, what each is,
  whether it is a room or a person, and how far away, with the map underneath. The countdown does not move
  until the player accepts. The note is "Take them in whatever order." Nothing else.
- **The budget comes from the map, not from an author.** `day.js` `budgetForRoute()` walks the day's stops
  nearest-neighbour from the spawn, converts distance to walking time, and says travel should be a little
  under half the day. Spread-out days get more hours; a day that never leaves one building gets the floor of
  five. Move a building and the budget follows.
- **Time runs in real time, one game minute a second** while walking, driving or flying, and **stops dead
  while a panel is open** (`PANEL_PACE`, 0 in every game). It was a quarter rate for most of this engine's
  life, on the argument that thinking is not free, and that argument was about the wrong thing: **the clock
  exists to make the route a decision** — which calls to take, in what order, how far to walk, who to talk
  to on the way — and none of that happens while a question is up. What the quarter rate charged was reading
  the evidence, hardest of all on the player who most needed to re-read the scene. **`tickDay` read
  `pace > 0 ? pace : 1`**, so the one value meaning "stop" was the one value that ran at full speed — every
  caller would have looked correct while the day drained four times faster behind a panel than while
  walking. Zero is a rate now; only negative and non-finite fall back. A format may also declare
  `pausesClock: true`, which BELT does; redundant today and kept deliberately, so restoring the global rate
  cannot silently un-fix the format the decision was made for. In a room the clock is the server's, so the
  client says so through `setPanel(open, frozen)` — additive, ignored by a casebook that has not deployed the
  other half.
- **The stops are open in any order.** `openStopIndices()` is the truth; `nextMissionStopIndex` survives only
  as "the first still open". Every open room's case beacon is lit at once and the map outlines all of them.
- **A wrong call is a penalty box.** The stop closes for an hour of the day's own countdown and reopens
  itself — free — or $10 has it back immediately. There is always a free way forward, so the only dead end is
  a wrong call with less than an hour left and nothing in the reserve; then the day restarts, which is still
  escapable because a restart clears `state.passages` and every person in town is worth $3 again — **which is
  now the only source of money in the game.** `DAILY_STIPEND` and `WEEKLY_APPROPRIATION` are both 0, so after
  the opening $20 nothing is issued for turning up or for finishing a day; the reserve is earned by talking to
  people or it is not earned. Both log lines are written to say nothing at zero rather than announcing a $0
  allowance, and the stipend's once-per-mission stamp is still set either way, so turning it back on cannot
  pay twice for a day already opened. The box is
  `state.penalties[visitKey]`, stored as the `dayLeft` the hour expires at — the day only counts down, so it
  needs no wall clock and survives a save. A wrong call charges only a 3-hour minimum, then offers four
  priced ways out: answer again ($5 / 12 h) or move on ($10 / 24 h). Money options disable when the reserve
  is short; time options never do, so nobody is ever trapped.
- **Running out of time restarts the day too.** Same card, same rule.
- **The last call does not end the day.** Whatever is left on the clock is the player's: conversations pay $3
  each, once per person per day.

Two traps, both already paid for: the entry points start their frame loop during module evaluation, so
`const day` (like `const driving`) must be declared *above* that call or every frame throws `Cannot access
'day' before initialization`; and `state.timeHours` is now derived from the countdown for the sun angle only
— nothing should add to it.

## The shape of a teaching day

`engine/content/normalize.js` `shapeMissions()` reshapes whatever the books wrote, at load, for every theme
— so a re-import cannot lose it.

- **Nobody walks into the same room twice in a day.** The design books write a day as one unit on one topic
  and an area is a building, so Riverton and the hospital sent the player to the same building three times,
  on 15 days out of 15. The unit is kept: the first call on an area is at its room, any repeat that day is a
  person stop.
- **Each day has exactly one person stop**, unless a repeat forces a second. The old rule — every third stop
  campaign-wide — knew nothing about the day it landed in, and stacked with the rule above made 34 of
  Riverton's 58 calls a person hunt.
- **From day 3, every day carries a callback**: one extra call revisiting an area taught earlier, oldest
  first, **and only where there is a `— Review` variant to serve** (see the day-calls gate above). Blocked
  practice is how the books are written and how people forget; this is the spaced retrieval that fixes it,
  and it is why a day has a second building to walk to.
- A stop's `person` and `callback` flags are authored data; `isPersonStopForIdx` honours the flag and falls
  back to the campaign-wide rule for anything unshaped.

## What a mission stop looks like

- Three stops per mission plus a callback from day 3; **the day's person stop** is found by walking to a
  named person instead of entering a building.
- **Each stop opens with why it matters now** — which call of how many, whether the earlier ones held, and
  the clock. Composed in `stopDramaHTML()`, so it needs nothing authored; a theme that writes `stop.why`
  overrides it.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis (instrument panel + candidates,
  draws a figure), TRIAGE, CASEBOOK, and CHOICE — one question, four candidates, and the rebuttals for the
  wrong ones. **CHOICE exists because importers guess.** An activity that is plain multiple-choice gets typed
  as the nearest format the importer knows, which is how the hospital ended up with 36 "diagnoses" with no
  instrument panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js` retypes them; the
  book's own `rebuttals` appear in the verdict.
- **Nineteen more are instruments in `engine/core/instruments.js`**, from counting: six FPS-native
  interaction documents, one per game, specify 104 interactions between them, which turn out to be nineteen
  distinct designs. `gamekit/FORMATS.md` is that catalogue. The twelve carrying four or more instances each:
  **TRIGGER** (write the rule before the number moves), **VALUE** (what would this measurement change),
  **CLOUD** (a distribution against a limit, where narrowing is not shifting), **ALLOCATE** (a finite pool,
  scalar or rate × time), **TRACE** (which channels share a reference; agreement is not independence),
  **ATTEST** (the record is not the condition), **CONTROL** (change one thing, reverse it), **TRIANGULATE**
  (constraints make a region, a systematic moves it), **DEGENERACY** (a family of solutions until other
  physics arrives), **CHAIN** (name the governing transfer), **BALANCE** (close the ledger, find the hidden
  term) and **VERIFY** (predict, act, measure — failing to measure is its own failure). Seven thinner ones:
  **PROPAGATE** (which input width dominates the output's), **STRESS** (candidates against an assumption's
  range), **DELEGATE** (a finite team and what command takes itself), **FLY** (bounded commands on undamped
  dynamics, so the brake has to lead), **RESIDUAL** (structure in what a fit leaves over), **INJECT** (push a
  known population through your own pipeline) and **ROUTE** (a sequence that can be rejoined after an
  interruption). `books/instruments.yml` authors one stop of each across seven days. **Red Sand is the first
  shipped game to author one**: its sol 12 is an ALLOCATE — 430 kWh on a dust-storm sol against seven loads
  that want more than that between them.
- **DERIVE did not come from the documents.** Written for a calculus course, it grades the line the previous
  one actually gives you, and its trap is that one wrong branch per step must stay algebraically valid or the
  step is passable by elimination. It once graded a second half — name the rule that licenses each step — and
  that is **off by default** behind `askRule: true`. The argument for it was that the right line for the
  wrong reason is how somebody passes calculus without learning it; the argument against is what counting
  found, that in five of Midway's 29 steps and ten of Headwater's 33 every candidate carried the *same* rule,
  so the second half was a click with one possible value. A `rules` list without `askRule` is refused rather
  than quietly ignored. **DERIVE is banned below grade 9** — its subject is algebraic manipulation, and a
  softened version is spot-the-malformed-line.
- **Four are instruments the player operates**, not questions they read. **SWEEP** is one control and a
  response plotted only where the player looks — a resonance, a decay, a trade-off. **HOLDOUT** fits a rule
  on one set of data, freezes it, and scores it on data it has never seen; the fitting curve carries a spike
  that beats the honest answer, so overfitting costs the player the stop. **TALLY** accumulates shots into
  bins and builds a statistic, and grades when there is enough data to report. **PROBE** hands over no
  readings at all: the player takes them one station at a time along a physical chain and names where the
  pattern breaks. All four are in Quantum; `engine/dev/instruments.html` draws every one in a theme on a
  single page, the only sane way to look at them — reaching one in the game means playing to the right day
  with time left.
- **Seven formats are graded against the place rather than a board.** TRIAL was first and the exception;
  **GREET** (get round a list of people before the hour is out), **FOLLOW** (stay inside a band behind
  somebody who will not wait), **HUNT** (find enough of the same thing, all drawn on the map), **CANVASS**
  (ask a yes-or-no question until the sample can answer it), **EVADE** (hold a clear radius for a stretch)
  and **TAG** (the same test the other way round — close on somebody walking away, which a straight line
  cannot do, because two people walking the same way close at the *difference* of their paces) followed. The
  panel is a briefing; pressing the button **suspends** it and hands the player back to the site with the run
  going on around them. All share one lifecycle in `engine/world/worldFormats.js` — teleport to the spawn,
  hang something in the scene, run a clock, watch a distance, tear it down however it ends — because five
  copies of that is house rule 1 in a new directory. **Four borrow a person the crowd already owns**
  (`npc.scripted`, honoured by `crowd.js`) rather than building a figure, which would draw a look from the
  world's seeded generator and move every later draw. **Their trap is one sentence in five currencies**: *a
  run whose goal is reached by standing still, or by walking to whatever is nearest, asks nothing* — so all
  read the theme's `site.js` and settle it in closed form. Eighteen cases in `npm run traps`. And the
  measurement that matters is the one a browser cannot make: `npm run drive` plays them through a **stub
  world** that hands back whatever the play asked for, so it is blind to whether walking up to somebody
  counts as a greeting. `engine/dev/worldFormats.mjs --selftest` is that half, in Node, inside `npm run
  check` — and its first FOLLOW case passed while measuring the wrong thing, which is why the case that
  survives is walking at the guide's shoulder.
- **Five more formats are fun first, in the same registry on purpose.** **BELT** (a binary category sorted
  against a line that speeds up), **TRIAL** (the theme's own world, driven through gates, graded on the order
  rather than the clock), **HOLD** (one quantity held inside a closing band while scripted loads push it
  out), **SPOT** (a standing instruction replaced mid-run without announcement), **STACK** (the
  `spectrum_stack.html` port, a question rail over a filling well where a wrong answer packs a row) and
  **LOB** (angle and charge against a mark, with launch speed deliberately withheld so it cannot be
  computed). The move rendered is the *player's* rather than the scientist's, and it exists because a stop a
  child replays is worth as much as one a specification asked for. They are entries in `INSTRUMENTS`, not a
  second system, because `questionUI`, `fieldCoverage`, `instrumentGoals`, `instrumentTraps`,
  `instruments.html` and `instrumentDrive` would each have to learn a special case — and six tools learning
  one is how the engine got forked the first time.
  **The line they must not cross is rule 3, difficulty is judgment never dexterity**: speed is the pressure
  and accuracy is the grade, so `ctx.commit(ok)` fires on the fraction sorted right and never on the score.
  **SPOT is the argued exception** — the cost of a withdrawn instruction is measured in seconds and a version
  with no clock measures nothing, so it weights the seconds either side of a change while refusing to grade
  reaction speed; for Sightline that is the AP Psychology syllabus rather than flavour.
  **STACK is suspended** — reported broken in play, and `SUSPENDED_FORMATS` in `normalize.js` says so. A
  suspended format keeps its panel, METHOD line and traps; what is refused is *authoring* one, at both ends —
  `import-book.mjs` fails the stop and `validateContent` fails a theme shipping one through a stale generated
  file. `books/instruments.yml` keeps its STACK stop commented rather than deleted, because deleting it would
  mean rewriting the bank to lift the suspension, and `npm run traps` skips its four cases *out loud* rather
  than passing them vacuously — a blanket refusal would otherwise satisfy every "the importer refuses this"
  assertion for the wrong reason. Lifting it is deleting one line.
  Two pieces of engine came with them, both general: `playSurface.js`, a canvas that repaints every frame and
  pauses itself when the tab backgrounds (`figures.js` draws a picture once, the wrong shape for anything
  that moves), and `ctx.onClose(fn)`, the first teardown hook a panel has ever had, because `bind()` returns
  nothing and a frame loop nobody cancels draws into a detached canvas for the rest of the session. TRIAL
  needed three more, all optional and absent in every harness: `ctx.world`, `ctx.suspend()` and
  `ctx.resume(html)`. `engine/world/trial.js` owns the gates and knows nothing about the right order;
  `instruments.js` still imports no three.js, which keeps it loadable in Node and on a page with no scene.
- **A gate is not a building's centre, and a screenshot is the only thing that said so.** TRIAL gates
  resolved by building id were placed at `x, z` — the middle of the building — so every ring rendered under
  the floor with its beacon inside the roof, and a solid collider stood between the player and all of them.
  The importer's geometry check passed, the driver passed, the run completed and the order came back correct,
  **because every harness teleports**. Gates stand off the door by `d / 2 + 10` on `kit.js`'s own `facing`
  convention.
- **A step in the load is a step in the rate.** HOLD's whole subject, and why its trap can be settled in
  closed form: integrate the authored disturbances with the control untouched and compare the *fraction* of
  the run inside the band against the pass mark. The first version asked only "does the needle ever leave",
  which a board a player passes by doing nothing satisfies.
- **Every instrument carries a trap, and the trap is an importer check.** A cloud whose pass mark a re-target
  reaches, an allocation board affordable whole, a chain whose distractor governs, a verify whose every
  prediction is accepted — all render perfectly, grade perfectly, and teach the opposite of what they were
  written for. `npm run traps` breaks all 35 and asserts the importer refuses each.
- **People stand aside** (`engine/people/crowd.js`). Walking into somebody displaces them — straight back where there is room, sideways
  where there is not. A four-metre passage with two people in it is otherwise a blocked passage the player
  cannot ask to move.
- **Every room is walkable whenever you like.** What changes with the mission is whether a case is open
  there. A room with nothing open shows a short card and charges nothing — it is not a locked door.
- **The outdoor games have interiors.** A door opens a real room built by
  `engine/world/interiorBuilding.js` from the theme's `interiors` block: bench, live instrument screen, case
  plate, case stand, way out. Rooms are built lazily in an *interior district* at x ≈ 4000 and entering
  teleports you there — not inside the exterior shells, which are solid boxes on graded terrain. The caller
  swaps the player's ground function and bounds (`setGround` / `setBounds`) on the way in and back on the way
  out.
- **Questions are instrument-first.** Any lesson can carry a `figure` (`engine/core/figures.js`) and every
  format renders one: Ballpark runs a live readout and settles onto a log scale against the true value,
  Sequence is a numbered rail, Protocol draws its matches as lines that redraw as you choose.
- **Right or wrong, the verdict is a card on its own overlay**, not appended below the question. It carries
  the figure that shows *how* wrong.
- **The map shows the person you have to find**, where they are standing now and which way they are facing;
  you carry a facing arrow too. Person stops used to be findable only by walking the town reading nameplates.
- Talking to anyone who is not this mission's person opens their passage and one question about it, worth $1
  once. The passage closes before the question; reading it again is offered and forfeits the dollar. The
  question is authored where the roster carries a `quiz` array, and generated by lifting a sentence where it
  does not.

## The games are played with thumbs too

`engine/core/touch.js` is the second input path, because the casebook app is opened on tablets. Touch fires
no `keydown`, so WASD is inert; iPadOS Safari has no Pointer Lock API, so `controls.lock()` never resolves —
and that is the half that matters, because **`isLocked` gates both `updatePlayer` and the interaction
raycast**. Without it the world renders perfectly and the player is welded to the spawn, which is house rule
8 through a different door. `initPlayer` builds the layer and sets `isLocked` by hand: there is no pointer to
capture, so there is nothing to be locked out of.

- **It writes the same `moveState` the keys write**, which is why it drives a scooter and flies a helicopter
  without knowing either exists — `driving.js` and `flying.js` read the player's key state through an
  `input()` callback. The stick is analogue, so a half-pushed thumb walks at half speed where a key only ever
  says 1.
- **Everything else is a synthetic `KeyboardEvent` on `window`** — use, map, summary, the collective.
  `main.js` stays the single description of what each control does; a touch button calling `activate()` itself
  would be a second copy of that decision.
- **Look is done here, not through PointerLockControls**, whose `onMouseMove` returns early unless *its*
  `isLocked` is true and that flag belongs to the browser. The rotation maths is lifted verbatim so a drag and
  a mouse move produce the same turn.
- **Turned on by `(pointer: coarse) and (hover: none)`, not by `maxTouchPoints`** — a touchscreen laptop
  answers yes to the second and has a mouse. `?touch=1` / `?touch=0` force it either way, the only way to
  iterate at a desk.
- **Anything absolutely positioned from a `Touch`'s `clientX/clientY` must be a child of `#touchLayer`.** It
  is the only element whose origin is the top left of the window; the move zone is anchored bottom-left, and
  the floating stick parented there drew several hundred pixels below the fold — invisible, and
  indistinguishable from the stick not working.
- **A panel opening has to zero the stick.** The panels cover the layer at a higher stacking level so they
  already swallow taps, but a thumb still resting on the stick keeps walking behind an open question card
  while the day's clock runs.

`gamekit.moveState` and `gamekit.updatePlayer` are on the dev handle so an input path can be stepped by hand
in a throttled tab. Importing `player.js` from the console does **not** work: it resolves to a second copy of
the module with its own uninitialised `camera`.

**`engine/device.js` is where the device question is answered**, not `touch.js`, because two layers need the
same answer and nothing under `engine/world` has ever imported from `engine/core`. `world/materials.js`
`tuneRendererForDevice()` is the other caller: pixel ratio 1.5 instead of 2 and `PCFShadowMap` instead of
`PCFSoftShadowMap` on a coarse pointer. A tablet reports a device pixel ratio of 2, which on an iPad is the
fragment count of a 4K monitor for a fraction of the GPU; 1.5 is 47% fewer fragments and invisible at that
density. **Five modules create a renderer** — the three engine worlds and the two themes bringing their own —
and all five wrote the same four lines, which is why the numbers moved into one function. **A mobile budget
applied in three places out of five is worse than none.** What that does *not* fix is the draw call count,
which is the real cost: Red Sand issues about 1,500 a frame from 1,973 meshes with 5 instanced, 1,601 of them
shadow casters. That is content work — instancing, and not every bolt needing to cast.

**`vh` is wrong on iOS wherever a panel is sized against the window.** It is the height with the browser
toolbars *hidden*, so `.modal{max-height:85vh}` let a long question panel run its bottom under the chrome —
and `.modalActions` is sticky to the bottom of that box, so the answer button went under with it. Every such
rule carries a `dvh` line after the `vh` one. Same bug as `#canvas` being `100vh`, and it will happen again
the next time something is sized in viewport units.

## House rules learned the hard way

1. **Do not fork the engine again.** Three copies meant every fix three times.
2. **Budget real lights.** 28 point lights took a floor from 118 fps to 20. Ambient + hemisphere +
   emissive panels + IBL. Ceiling of 6 real lights.
3. **Never put text on a `DoubleSide` material.** It renders mirrored from behind.
4. **One source of truth for ground height.** Shipped broken twice.
5. **Never dim gameplay elements with opacity.** Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo renders near-white.
   `envMapIntensity` 0.35–0.5, exposure below 1.0, and an albedo darker than looks right.
7. **`kit.js` placers take `(x, z, y)` — ground last.** One call written `(x, y, z)` put six display
   boards sixteen metres in the air.
8. **Keep the spawn point and the route clear.** A prop over the spawn welds the player in place:
   renders perfectly, W does nothing.
9. **A crowd checks its destination, not its path — fix both.** `blocked` was consulted when a walker
   *chose* somewhere to go and never while it walked there, so on open ground people rarely crossed a
   building and in a submarine they walked through every bulkhead. The same predicate now takes a pad,
   since the margin that keeps somebody from being *placed* against a wall is wider than their
   shoulders. A fanned-out crowd position needs the same check: a person placed inside the furniture
   stands there all game, because every direction out is blocked and no target is reachable.
10. **The player's width is a theme decision.** 0.45 suits a street. A hatch is a 1.1 m opening, which
    leaves a twelve-centimetre slot — "sometimes I cannot get through the door". `look.playerRadius`.
11. **`scene.environmentIntensity` does not exist before three r163.** Setting it is silent and the
    environment applies at full strength — a submarine rendered with every bulkhead lifted to pale
    sage. `dampEnvironment(scene, level)` in `engine/world/materials.js` is the answer, per material.
12. **Compare a challenge format through `kindOf()`, never as a raw string.** The books spell them
    "Sequence", "SEQUENCE" and "Science Tank". Comparing raw strings left 72 of the hospital's lessons
    matching no branch and rendering "challenge type SEQUENCE is not yet implemented" in a shipped
    game. Both dev checkers canonicalise the same way.
13. **`walkCost()` charges the time itself.** It returns advanceTime's verdict, not a number of hours,
    so `advanceTime(walkCost(d))` adds `undefined` to the clock. NaN reached the sun angle before it
    reached the HUD, so the symptom was the whole world going black. `advanceTime` now refuses
    non-finite hours.
14. **A save belongs to the theme that wrote it.** `loadState` used to fall back to the hospital's
    legacy key for *every* theme, so playing the hospital and then opening either other game loaded a
    hospital campaign into it — group ids that theme has never heard of, and the first question panel
    died on `gs.issue` of undefined. `tryLoadSaved` rejects a save whose group ids do not match.
14b. **A control nobody complains about can still be backwards.** `rightDir` is `dir × up`, which *is*
    the camera's own right, and `updatePlayer` scaled it by `-right` — so A strafed right and D
    strafed left in all fifteen games, for as long as the engine has existed. Nobody reported it
    because a mouse corrects the heading faster than the error registers, and these are walk-to-a-place
    games where strafing is rarely load-bearing. A thumbstick has no such cover, which is how it
    surfaced. **Nothing in `check` asserts anything about input, and this is what that costs**: the fix
    is one character and it was available for years.
15. **The two older games fork `styles.css`.** Their forks stop before the instrument-panel rules, so
    anything the shared question UI draws had no styling there. Both now `@import` the engine sheet at
    the top of their fork — a `<link>` cannot do it, the path leaves Vite's root and 404s.
16. **Nobody may be *placed* without asking whether the spot is free.** A person dropped inside a
    collider is there permanently: every walker refuses to step into a blocked point, and from inside
    one every neighbouring point is blocked too. Three of the hospital's four spawn paths had no check.
    `settle()` rings outward to the nearest clear spot, and each walker rescues anybody already inside
    something.
17. **The physical sky has a radiance floor.** With the sun below the horizon and both scattering terms
    at zero it still renders ~0.03 linear, which tone mapping lifts to flat grey. No uniform reaches
    it. A nocturnal theme sets `atmosphere.nightSky` and the dome is hidden below deep night. Related:
    `nightTurbidity` / `nightRayleigh` and `look.nightLift` exist because the defaults are tuned for a
    *daytime* game's dusk.
18. **`look.far` has to clear the sky dome outdoors — from the far end of the site, not the spawn.** At
    an interior's 160 the dome is clipped away and the sky renders black in broad daylight, with no
    error anywhere. 900 works on a compact site; the clearance is `atmosphere.scale + how far the
    player can get from the origin`, so Wellmere's 300 m of headland needs 1500 against a dome of 700.
    The symptom is a black band above the horizon at one end of the map only, which reads as a
    rendering bug and is a camera setting.
19. **Ground and crop have to be a value apart, and the ground is the one to move.** Wellmere's first
    field put mid-green plots on mid-green turf and 1,300 of them read as one flat smear from twenty
    metres. Lightening the crop turns it pastel under ACES; darkening and browning the *ground* — two
    stops below what looks right on the canvas — separates them and makes the alleys read as alleys.
20. **Grep for the previous game's nouns before assuming a module is generic.** `simulation.js` held
    one game's cast, `constants.js` one game's save key, `player.js` one game's field of view and floor
    height.
20b. **The sky model is Earth's, and it can be tinted rather than argued with.** `buildSky` runs
    three.js's Preetham sky, which solves for Rayleigh scattering off nitrogen and oxygen. No
    combination of its four uniforms reaches the butterscotch of a dusty carbon-dioxide atmosphere —
    turbidity and mie only make it hazier, rayleigh only moves it between blue and white. Red Sand
    added two optional keys: `atmosphere.tint` multiplies the dome's output *and* the dome that bakes
    the IBL, so the ground is lit by the sky the player sees, and `atmosphere.haze: { day, night }`
    replaces the hard-coded blue-grey the far ranks and fog are taken toward. Both inert unless set.
    Set one without the other and a seam appears along the skyline.
21. **A hard equation early is fine; a derived one before its base is not.** The test is dependency,
    not difficulty — Blackout opens on the swing equation and that is the right first question. What
    was wrong in eight of fifteen games was impulse on day 3 with `F = ma` computed nowhere, the chain
    rule on day 2 with the power rule not until day 7, apparent power on day 3 with `P = IV` on day 10.
    `needs` in `tools/syllabus.js` names what each equation is derived from, by `e` string rather than
    position, and `equationOrder.mjs` fails the game for an inversion. Only a question that *computes*
    settles it, so a base taught only through `CHOICE` — which has no relationship, template or worked
    solution — is a base the course never teaches. Corollary: a `DERIVE`'s own lines are arithmetic, and
    reading only `relationship` said Headwater computed the power rule on day 7 when the player had been
    applying it on day 1.

## Screenshot before believing anything visual

The most expensive lesson in the repo. In one session: a gable roof was inside out in the *shipped* game
and in the port of it; a building sign sat behind a canopy slab; half the crowd never moved; a walk
cycle's feet travelled twice as far as the body. **Every one passed every assertion available** — exports
present, meshes created, no errors, builds clean.

- A "before" screenshot is a baseline, not a correctness check. The roof was already wrong in the
  reference shot and I matched it faithfully.
- **A background browser tab gets no `requestAnimationFrame`.** The scene renders dark, nothing animates,
  `getCurrentTarget()` stays null, and synthetic key presses appear to do nothing. Check
  `document.visibilityState` before concluding anything is broken. `window.gamekit` exposes
  `updateCrowd`, `updateInteractions`, `getCurrentTarget` and `activate` so a throttled tab can be
  stepped by hand.
- A dynamic `import()` from the console may resolve to a **second copy** of the module graph with its own
  state. Compare `getState() === window.gamekit.getState()` before trusting a console test.

## Editions, audience and copy

- **A theme declares who it is for.** `audience: { grade }` in the manifest; `engine/core/typography.js`
  scales the root font size from it — 1.18× primary, 1.10× middle, 1.04× high school, 1× undergraduate.
  `audience.textScale` overrides. Applied from `theme.js`, once, for every game. The same game can
  therefore ship at several reading levels: a new edition is a manifest line plus a differently-written
  book.
- **A game can also be retargeted rather than re-levelled.** `RETARGET_PASS.md`:
  same place, same cast, same grade, a **different course**. Seven games teach
  above high school because their setting is a workplace, and a workplace runs on
  the professional layer of its subject — so three of them now ship an AP edition
  built on the same world. `deepwatch_hs` is AP Physics 2 where the base is naval
  acoustics, `contamcity_hs` is the aqueous half of AP Chemistry where the base is
  first-year analytical, `the_trial_hs` is AP Statistics where the base is clinical
  epidemiology. **The marker is its own line** — `same-grade-retarget:` rather than
  `same-grade-rewrite:`, mutually exclusive with it, and refused unless the edition
  has a syllabus block whose `course` differs from the base's. Four of the seven
  were rejected and the reasons are in that file: an AP Physics 2 Blackout is five
  units of nothing, a polar camp cannot host APES, Aftershock's honest AP is the
  course Safety Factor already is, and no AP course contains Quantum.
- **An edition is a registered theme, not a build flag** — `MIDDLE_SCHOOL_EDITIONS.md` is the plan, and
  fourteen of sixteen games are getting a grade-6 one. **Twelve exist.** The nine of the first pass were
  swept for `questionLoad` after the fact; `sightline_ms`, `redsand_ms` and `the_trial_ms` were written
  against it from the first stop, which is cheaper and produces a different edition — see that file's §9. `themes/<base>_ms/` holds a manifest, a one-line
  `site.js` re-export and its generated content, and **nothing else**: place, props, interiors and
  outfits are the base theme's. `tools/derive-edition.mjs` writes one; `engine/dev/editionParity.mjs`
  fails the game if cast, areas, places or manifest have drifted. It is a separate theme id rather than
  an `EDITION=` alias because of the save key `gamekit_${theme.id}_v1`, and the group ids are
  deliberately identical between editions, so house rule 14's guard would wave a ten-day campaign into a
  fifteen-day slot.
- **Measure the reading level, do not judge it.** The hospital's opening card was written at F–K 7.7 for
  an audience whose lessons sit at 2.7. Hospital ≈ 2.6; the college games run 10–14. `audience.grade` is
  a gate: `validateContent` notes any passage above it and fails one two grades over. The vocabulary of a
  subject cannot always be simplified — "spontaneous fission" is the word — so the lever is sentence
  length, the other term in the formula.
- **The opening card is ONE paragraph of situation.** No mechanics (order, clock, prices), no scope
  disclaimer, no controls note. And never tell the player what they *do not* do: "you do not touch the
  vehicle", "you do not prescribe" both read as apologies for the game.
- **It was the one piece of prose nothing was counting.** The reading-level gate covered scenes and
  verdicts; `checkVoice` read the opening only for the slogan it ends on. So the first paragraph a player
  ever sees — the only one read before the game has taught them a word — had no gate, and ten of fifteen
  cards failed the moment one existed. Red Sand opened on "the transfer window opens on sol 486" and "the
  ascent vehicle standing on the pad", three undefined terms in a 45-word sentence; Ice Core opened at
  F–K 17.5 with a 55-word sentence. `validateContent` now checks the card's reading level against
  `audience.grade`, fails a sentence over 40 words, and lists hard words the glossary never defines.
  **The sentence length is the one that bites** — the bad cards were not hard vocabulary, they were
  pile-ups. What no cheap rule catches is a domain term built from ordinary words, which is exactly what
  "transfer window" is: for that, read the card.
- **Inside that paragraph there are four beats, in this order**: what has happened or is about to, and to
  whom; the player's job stated as authority — "You are the …, which means …"; the clock or the argument,
  with somebody from the roster in it; and last, what it costs, in people. **The failure they were swept
  for is the inventory opening**: Red Sand began "nine modules buried to the eaves, eighteen hundred
  square metres of solar panel, an ascent vehicle four hundred metres past the last of them" — every fact
  true, no situation, nobody in it, and a specification for a closing line. It now opens on the transfer
  window that does not move and ends on six people going home on what two named engineers can agree to
  make. **A card ending on a number is usually a card that has not said what the number does to
  anybody.** And two games shipped with no opening at all — Project Y and Hospital Heroes rendered an
  empty title card for as long as they existed, because `opening` is optional and nothing checked.
- **The verdict says `Correct` / `Incorrect` first.** "Evidence accepted" is the response's language, one
  inference away from what the player asked.
- **A name arrives with the job attached, every time it is the first time.** `checkNames` used to accept a
  full name as an introduction, so "Dolores Reyes says the steadying matters more than the fall" passed
  while telling a player nothing about why hers is the opinion in the sentence — and it read the stakes,
  briefings and scenes only, so a name whose first appearance was on the **opening card or a warm-up
  card** was judged on its second mention. Both halves fixed: `engine/dev/introRule.mjs` is the rule,
  shared with `warmupOrder` because two copies of one rule drift, and every surface the campaign shows is
  read in the order a player reads it. 259 first mentions across 29 campaigns said nothing about the job;
  all do now. Four things the rule deliberately does and does not accept: a **rank** is a job
  (`Captain Vasquez`) and a **courtesy title** is not (`Dr. Patel has the notes`); a job noun loose in the
  sentence belongs to whoever it belongs to ("Reyes tells the substation technician to wait" introduces
  nobody), so the job has to be *attached* — apposition, a role phrase in front, a rank, a job verb, or a
  clause off the name using the campaign's own words; a **warm-up card is judged whole**, because the job
  is usually in the `why` under the title; and **an initial is not a full stop**.
- **The last paragraph of an ending is about the player.** Twenty-five campaigns shipped an `ending` that
  said what came of the fortnight and what it cost and never once said who had done it, so a player who
  had just held a corridor for fourteen days closed the game on a paragraph about a report. Every campaign
  now closes on the two or three calls that were theirs and what those calls bought — *you checked the
  instruments the decisions rested on; four million people had power; that was your fortnight.*
  `checkStory` fails a closing paragraph not addressed to the player, and four campaigns that had **no
  `ending` at all** have one. The scaffold carries the shape, so a ninth game cannot ship without it.
- **The scene is the situation. The verdict is the teaching.** This is the opposite of how all seven games
  shipped, and the single most expensive content mistake in the repo. A scene of 90–100 words carrying the
  mechanism means the player reads the answer, answers, and learns nothing from being right — Project Y
  explained the four rotational rules and then asked the player to match them, against a verdict of nine
  words. Every game was rewritten: scene **30–45 words** of situation only, `why` **70–90 words** of
  mechanism (Hospital ~50, for a second-grade reader), and a rebuttal per wrong option saying why *that*
  one fails. Teaching-to-scene went from 0.22–0.52 to 2.7–3.4.
- **A stop declares what it assumes.** `assumes:` on the lesson — the prior knowledge the question is
  entitled to expect. It exists because the honest version of "could a student answer this?" is "with what
  already in their head?", and writing it down is what stops a question quietly requiring a degree.
- **`theme.stopNoun`** — what a non-person stop is called. Mission Control has no rooms and no doors, and
  "a room" sent players hunting for one.

## Finding things and people

- **Anybody the day still wants has a cone over their head**, several at once, drawn with
  `depthTest: false` so it shows through walls. The only thing allowed to draw over everything.
- **Any open call is marked** — case beacon in a room, and in Mission Control a beacon over the console.
- **The map is drawn at the size it will be seen at.** `renderMap({ maxW, maxH })` fits the box and turns
  the plan sideways when that shows it larger; it used to be 720 px wide regardless and then scaled down
  by CSS, which made a long site's labels two pixels high. Interior rooms are drawn on their own side of
  the corridor — drawing every room full-width put opposite rooms on top of each other — and a name that
  will not fit inside its room goes outside with a leader line rather than being truncated.
- **A site spread over kilometres draws a window, not the whole place.** `site.mapRadius` (Planetary
  Defense: 170 m) centres the map on the player and reduces everything outside it to an arrow on the edge
  it lies beyond, with the distance — because the range is 1.6 km wide and base camp is seven buildings
  inside 200 m, so the whole-site map drew the only part anybody walks around as one unreadable blob. The
  window is half a radius in the short direction and opened out to the panel's aspect in the long one, and
  clamped inside the site so it never shows ground beyond the edge of the world. Arrow labels carry their
  distance after a `·`, so they are placed with `whole: true` — the label placer's shortening rule cut at
  exactly that separator and threw the distance away.
- **`maxW` for the map sheet is 760, because the card is `min(820px, 100%)`.** The caller asked for 1100
  for years and it never showed, because the aspect of a whole site capped the width first; the first map
  that could fill it ran its right-hand edge and every label under the edge of the card.

## Content and safety

Audience varies: Hospital Heroes is ~grades 3–4, The Contaminated City is college chemistry. The design
books carry explicit safety framing — the player never prescribes, diagnoses for real, or handles
hazardous material outside a fictional frame. Keep it. No gore; stakes come from time, teamwork and
consequence.

Content invariants, all asserted by `validateContent`: every lesson has a real `scene`; `takeaway` never
equals `why`; `choices` contains `correctChoice` verbatim (grading is by label); the pre-question panel
shows the scene and where you are, never the takeaway.

## Known unfinished work

- **Both world flips are done.** Project Y builds the mesa from `site.js` through
  `engine/world/outdoorTown.js`, and the hospital builds its ward from `plan.js` through
  `engine/world/interiorFloor.js` — `worldParity` says "generated from the site data" for both. The
  hospital's was the easy one and nobody expected that: `interiorSite.js` had been generalised out of that
  exact floor, so the flip renamed the plan's keys (`CORRIDOR.halfWidth` → `metrics.corridorHalfWidth`,
  `ROOMS` → `rooms`) and deleted 1,070 lines of world builder, 766 of fit-out and 236 of interior
  lighting. What replaced them is `themes/hospital/props.js` on top of `interiorKit`, 300 lines, with
  every fix the fork missed.
- **How the Project Y flip was done, because the next one will want the same shape.** Two steps, a year
  apart, and the order is the lesson. First an *adapter*, not a rewrite: `src/world.js` kept the old names
  and mapped them onto the engine's contract — one-argument `initWorld`, argument-less
  `updateWorldFromState`, `getBuildingPosition` onto `getStopPosition`, `updateDayNight` onto
  `updateTimeOfDay` — so the flip touched the world and left the game alone. Then the entry point went,
  and with it the adapter. Dropped on the way across, deliberately: the weekly funding economy and the
  special-request vignettes, which existed only in that entry point and which the day model had already
  replaced. **What made it safe was checking the terrain *before* porting it**: the engine's `mesa` profile
  was compared against the heightfield `env.js` computed by hand over 841 points, mean difference 0.06 m,
  and the only half-metre cases were building pads where the old surface noise dipped a bench that should
  read level. Do that comparison first; if it fails, the flip is a terrain port and a much bigger job.
- **Project Y is not fully declarative yet.** The pine forest, ground scatter and lamp positions are code
  in `themes/projecty/props.js` rather than site data. `src/env.js` is down from 640 lines to 244: the sky,
  terrain, roads and ridges it built are deleted, and what is left is `plantTrees`, the seeded random and
  `terrainHeight`, a door onto the engine's `groundHeight`. **`ROADS`, `onRoad` and `MESA_PLAYER_LIMIT`
  look dead from outside and are not** — `plantTrees` reads all three to decide where a tree may stand,
  which is why the roads are declared twice, once as `site.paths` for the engine to grade and once here as
  the rectangles the forest keeps out of.
- **Every roster is written and every person is quizzed** — both of the rows that used to sit here are
  paid. Project Y's 26 bios all carry a `quiz` now, and the half-written casts are written: Outbreak
  Riverton, Planetary Defense **and** Bring Them Home each had six of twelve people carrying one abstract
  sentence naming their syllabus topic — *"Uses independent tracking and dynamics to decide whether an
  apparent trajectory change is physical or a measurement artifact"* — beside six written at two
  paragraphs. All eighteen were written at the parent level and **again at grade 6 in the edition's own
  book**, because `editionParity` compares the cast and deliberately not the bios: a passage written for
  an AP reader handed to a sixth grader is the demand-stays-put failure this file records three times.
  What is left is depth rather than coverage: 501 questions across 464 people, and **427 of those people
  carry exactly one**, so a passage met again on a later day is answered from memory. Only Deep Watch,
  Hospital and ContamCity write a second for anybody.
- **The far-tier laps are not yet play-tested.** The logic is verified across all 28 themes and every game
  builds, but nobody has watched a lap run — the one thing this repo says you may not conclude from a green
  check. `THEME=seedbank npm run dev`, and watch the gates actually stand where the doors are.
- **660 of 692 concept takeaways are unwritten** — see the sequencing pass.
- **Tier 2 and 3 of the card sweep** — 728 board stops and 343 CHOICE stops.
- **The 122 dead `story` values**, 8,589 words, displayed nowhere.
- **Four formats are authored nowhere**: TRIAL, STACK, and — outside the games that already carry
  them — nothing else in the arcade set is unreached. BELT, HOLD and SPOT are in twenty-eight books
  each; LOB is in Midway; TRIANGULATE picked up its first game instance in `qd_tectonics`. STACK is
  suspended and TRIAL is a warm-up format the campaigns reach through `warmups:` rather than as a stop.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`, `budget`, `Director funds`).
