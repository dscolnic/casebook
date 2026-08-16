# Alamos — mission-based learning games

Eight first-person, mission-driven educational games on three.js, plus the
shared engine they run on. Each is the same loop in a different setting:
15 missions × 3 stops, walk to a place, answer a science question, hand off.
No combat, no weapons.

**`gamekit/NEW_GAME.md` is how to build one of these** — the whole path in
order: decide the course, scaffold, write the book, build the place, meet the
writing bar, meet the question bar, check and print. It carries the bar each step
has to clear and the checker that enforces it. Read it before starting a ninth
game, and add to it when the next rule turns up.

**`GAME_IDEAS.md` is what to build next** — the subject gaps across the eight,
and the candidate games worked up against them, each with its course, its place
and the argument it turns on.

**`README.md` is the landing page** — start there for a new game: it names the
two documents to read first and the order the work goes in.

**`GAMES.md` is the inventory** — all eight games, what each one is, where its
content and its place live, and what is still unfinished. Read it first if you
are picking this up cold. **`gamekit/STORY_SPEC.md` is the story contract** —
what a campaign needs beyond correct content, and the checker that enforces it.

**Read `gamekit/THEME_CONTRACT.md` before touching world code.** It is short and
every rule in it cost hours to learn.

**Read `gamekit/INTERIORS.md` before working on the inside of a place.** It has
the check-and-look loop, which builder each game's rooms come from — three of
them are furnished outside the shared fit-out entirely — and the one mistake that
has now been made four times.

## The fifteen games

`GAMES.md` is the full inventory with what each one teaches. This table is the
short version — the place, and the command that runs it.

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
| Headwater | `gamekit/themes/headwater/` | A five-storey tower in a gorge beside a dam: one glazed wall onto the spillway, and no ceiling over the hallways. Calculus | `THEME=headwater npm run dev` |
| Wellmere | `gamekit/themes/seedbank/` | A breeding station on a headland, laid out in concentric rings by isolation distance; sea on three sides, one causeway. AP Biology, the heredity half | `THEME=seedbank npm run dev` |
| Red Sand | `gamekit/themes/redsand/` | A propellant plant on Mars: modules buried in regolith along one track, an ascent vehicle on a pad with a gauge that fills as the campaign does, and a butterscotch sky. AP Chemistry, the back half | `THEME=redsand npm run dev` |
| Project Y | `gamekit/themes/projecty/` | Los Alamos 1943–45, outdoor mesa | `THEME=projecty npm run dev` |
| Hospital Heroes | `gamekit/themes/hospital/` | Children's hospital, interior, ~grades 3–4 | `THEME=hospital npm run dev` |

**A game's silhouette comes from its world module.** Two themes on the same
world look like each other however the palette differs, which is why three of
the five here either bring their own world (`themes/<name>/world.js`) or carry a
props layer heavy enough to change the shape of the space. Worlds:
`engine/world/outdoorTown.js`, `engine/world/interiorFloor.js`, and a theme's
own. Nocturnal games set `look.dayWindow` and `atmosphere.nightSky`.

**Deep Watch is the first game built the way the rest are supposed to be built.**
It came from `deep_watch/`, which was its own engine — a persistent boat, five
simulation systems, a stage-based mission runtime. The boat came across as
`themes/deepwatch/boat/` behind an adapter; the simulation did not, because a
flooding rate that rises while you read a gauge has nowhere to live in a loop
that is walk, answer, hand off. Everything else is one book file,
`books/deep-watch.yml`, and `themes/deepwatch/site.js` reads the boat's own
`LAYOUT` so there is still one description of the compartments.

A theme may bring its own world: declare `world: 'themes/<name>/world.js'` in
site.js and vite.config.js points `@world` at it.

**All three share one engine** (`gamekit/engine/core`). Their `src/*.js` logic
files are re-export shims. `gamekit/` also holds the world layer, the tools and
the content importers.

## Content is normalised on the way in

`engine/content/normalize.js` runs once, in `engine/core/theme.js`, before any
core module reads a lesson. It canonicalises `game.type` (books write
`Sequence`, `SEQUENCE` and `Science Tank`), expands diagnosis packs into the
lessons that name them, retypes a format that has no data for its format,
registers estimate specs across a lesson and its reviews, and reports a group
with nobody on the roster. **Themes ship data; they do not ship repair code.**

## The one thing that will trip you up

**`main.js` is shared now, and there are no forks left.** The wiring every game
needs identically lives in `engine/core/app.js` — `createInteriors`,
`makeActivate`, `exposeDebug` — and every theme runs off `gamekit/src/main.js`.

It was three entry points for most of this repo's life, and the cost is worth
remembering: the passage quiz shipped working in one of them and invisible in
the other two, the crowd's stand-aside fix had to be written three times, and a
TDZ bug that put a red banner over Project Y every frame existed only because
that game had its own copy of a loop the others had already fixed. Project Y
went first (833 lines of `main.js`, its own `index.html` and stylesheet, an
890-line `npcs.js`), then Hospital Heroes (900, 1,070-line world, 951-line
`npcs.js`). Both directories are tombstone READMEs now.

Shared (edit once): `gameState, simulation, questionUI, dashboard, save,
constants, time, utils, terminology, interactions, player, personQuiz, map,
figures`, and everything under `engine/world` and `engine/people`.

Per game (edit three times): `main.js`, `index.html`, `world.js`, props, plan/site,
and all content — `curriculum, missions, divisions, leaders, historicCharacters`.

## Starting a new game

**`gamekit/NEW_GAME.md` is the whole thing**, in the order to do it in, with the
writing bar and the question bar that took seven games to learn. Short version:

```sh
cd gamekit
npm run new-theme <name>                 # a town   — or `-- --interior` for a floor
npm run check <name> && THEME=<name> npm run dev          # green and walkable already
node tools/import-book.mjs books/<name>.yml <name> --verify   # then write the real game
```

The scaffold imports a starter book, so what comes out is a **complete playable
game** — four areas, four days, a worked example of every question format — and
the baseline is green before you touch it. A theme served from `gamekit/` needs
no entry point of its own: `gamekit/src/main.js` names nothing game-specific.
The campaign is as long as the book; 15 missions is what the shipped games have,
not a requirement.

**Every game is a book file.** `tools/BOOK_TEMPLATE.md` is the format, with a
worked example of every question format; the importer checks it instead of
guessing, and refuses to write a book that would produce an unplayable game.
`books/` holds all seven, `tools/export-book.mjs` writes one out of a game, and
`engine/dev/bookParity.mjs` — inside `npm run check` — fails if a book stops
regenerating the content its game ships. The three games that predate the format
were converted that way; their `src/*.js` content files are now one-line doors
onto the generated `content/`. The docx importers stay only for the two Word
documents they were written for:

```sh
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m books
node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m books
```

Run both with `--dry`; the one that reports missions is the right one. A docx
has to be *inferred* from, and every inference has cost a defect — 63 lessons
typed as the nearest format the importer knew, nine packs referenced and never
imported. Only the place — `site.js` or `plan.js` — and the props stay outside
the book.

## The games ship to an app that has accounts

`gamekit/dist` behind a static server is how these are played locally. The other
way they are played is the **casebook** app (`~/code/casebook`, Replit, Express +
Clerk + Postgres), where `/` is the game shelf and every page is behind a
sign-in.

```sh
cd gamekit
npm run sync-casebook                      # build all 15, copy them into casebook/games/
npm run sync-casebook -- --only headwater  # one of them
npm run sync-casebook -- --no-build        # copy what dist/ already has
```

Built output is **committed to casebook deliberately.** The theme is chosen at
build time, so serving fifteen games means fifteen builds, and running those on
the app host would put ten minutes of vite in front of a deploy for output that
only changes when a game does.

**`tools/games.js` is the catalogue** — one row per game, read by both front
doors (`tools/gallery.mjs` writes `dist/index.html`, `tools/sync-casebook.mjs`
writes `games.json` for the app's shelf). It was inline in gallery.mjs and was
two games stale within a week of Wellmere and Red Sand shipping, which is what
extracting it is for.

**`engine/core/cloudSave.js` is the account, and it is inert without one.** It
reads the campaign at boot, debounces the write (the engine autosaves on every
tick and treats saving as free), clears the server copy on restart, and posts a
row when a campaign finishes. The first failed call turns the whole module off
for the session, so a 404 from a static server and a 401 from a signed-out
session both mean "carry on with localStorage". Two things it must keep doing:
the read happens in `index.html` **before** `src/main.js` is imported, because
the entry point reads the save during module evaluation; and the local timestamp
is re-stamped from the server's own `savedAt` after a write, because two
browsers signed into one account do not agree what time it is and a fast clock
would silently stop that device pulling the account's campaign.

## A measurement can be wrong in a way that looks like a finding

**A number costs what a number costs, however it is spelled.** Flesch–Kincaid is
words-per-sentence and syllables-per-word and nothing else, so the way a book
writes its quantities moves the grade without changing a word of the prose:
"eleven point four" is three words and five syllables where `11.4` is one and
one, and `11.4` also contains a full stop, which the sentence counter counts.
Spelling numbers out pushes a card *up* the scale; using digits pushes it
*down*. The two conventions are wrong in opposite directions, which is worse
than either alone, because it spreads the games apart on an axis that is not
reading difficulty at all.

It was found by sweeping the fifteen mission cards, ranking the games, and
noticing that Red Sand — thirteen numbers spelled out, no digits anywhere — came
second, while Aftershock, which does the exact opposite, came ninth. The first
published table was partly a ranking of house style. `tools/readability.js`
normalises both forms to one dotless token now, and
`engine/dev/readabilityParity.mjs` (inside `npm run check`) asserts that the same
sentence scores identically written both ways.

The general rule, which is the expensive half: **a measurement that produces a
plausible answer is not thereby a working measurement.** Every check in this
repo asserts that content is wrong in some way; this one asserted nothing about
itself, so it reported confident numbers for weeks that were partly an artifact
of the formula. When a new metric is added, write the case where two inputs that
should score the same actually do — before trusting anything it says.

The books remain free to spell numbers however they like; nothing enforces a
convention, and the choice is a voice decision. What is enforced is that the
measurement cannot see the difference.

## Checks — one command, several tools

```sh
cd gamekit
npm run check              # every registered theme, every check
npm run check hospital     # one of them
```

`themes.json` maps a theme name to its directory, so a bare name works for all
three games even though two of them live in their own package directories.
Behind `check`:

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself + the contract
node engine/dev/smokeCampaign.mjs  <theme>    # the engine can reach and grade every stop
node engine/dev/probeQuestions.mjs <theme>    # no question answerable without the science
node engine/dev/answerShape.mjs    <theme>    # the longest option is not the answer key
node engine/dev/checkVoice.mjs    <theme>    # cards brief the player, they do not perform
node engine/dev/placeStory.mjs    <theme>    # the landscape matches the story told on it
node engine/dev/checkPassages.mjs <theme>    # talking to somebody teaches something
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/equationOrder.mjs  <theme>    # nothing is asked before the equation it is built out of
node engine/dev/placement.mjs      <theme>    # everything hung is on a wall, not in it or over a doorway
node engine/dev/checkStyles.mjs               # no game stylesheet re-declares the engine's
node engine/dev/readabilityParity.mjs         # the reading grade cannot tell 11.4 from "eleven point four"
node engine/dev/worldParity.mjs               # every group has somewhere to happen in the data
```

`placement` is the one that fires rays. Four rounds of play-testing were spent on
the same defect — boards floating in doorways, boards hung *inside* the wall so
only the dark edge shows, a mural running past the end of the wall — and every
check passed each time, because they asked whether a *point* had a wall behind it
and a notice board is a metre wide. This asks through the whole face of a fitting,
from both sides. Anything on a wall goes up through `markWallMounted` in
`interiorKit`, and anything the walls are made of through `markStructure`, because
guessing which meshes are walls from their proportions is how a checker starts
lying. It cannot see a hand-built world, and it cannot see a fitting that never
said it was one.

Wall furniture is placed *proud* of the line a caller passes, never on it: a wall
is raised centred on that line, so a 0.18 m wall on x = 2.1 shows its face at 2.01
and anything hung at 2.07 is inside the plaster. `furnishRoom` takes
`wallThickness` and does that arithmetic once.

Two reports that are not part of `check`, because they answer "is this good
enough" rather than "is this broken":

```sh
npm run traps                                 # break every instrument trap; all 35 must fire
npm run drive <theme>                         # drive every live panel in Chrome, right and wrong
node engine/dev/pieceDensity.mjs --all        # how furnished every room is, thinnest first
node engine/dev/syllabusEquations.mjs quantum # which equations a question computes, and when
npm run shots <theme>                         # a picture of every room, and a contact sheet
```

**Quote any inline `{ … }` value containing a comma.** `tools/yaml-lite.mjs` used
to split a flow map on every top-level comma and silently skip any fragment
without a colon, so `{ landmark: the second door, hinged inward }` arrived as
"the second door" and nothing downstream could tell — what reaches the game is a
perfectly valid shorter string. Quantum, Blackout and Aftershock shipped 36 lines
like that, choice labels and mechanisms cut off mid-sentence, through every
check. The parser now refuses a colon-less fragment; a braced value with no
colons anywhere is still a string, which is what an estimate template like
`{0} ÷ {1}` needs.

`drive` is the answer to everything a checker cannot judge about an *interactive*
panel. The instruments can render, print their question, expose a commit
button and never reach the grade because one selector is wrong, and nothing in
`check` can see it. On its first run it found a TRACE whose resource container
shared a class with its resource buttons — a click bubbled to a handler that read
`dataset.res` off a div, the selection silently became NaN, and every right
answer graded wrong.

`shots` is the answer to everything a checker cannot judge. Whether a room looks
lived in, whether a mural is clipped, whether a seal is hidden behind the gallery
— all of that has been found by a person launching the game, walking there, and
saying so, and most of it was obvious in a still. It runs vite, renders the game
in headless Chrome through SwiftShader, drives the game's own `teleport` to each
viewpoint, and writes `shots/<theme>/index.html`: every room on one page, about
two minutes for fifty views. Views come from `--at x,y,z --yaw deg` for one
specific thing, else `themes/<theme>/shots.js`, else the theme's `plan.js`, else
a turn on the spot at the spawn. A hand-built world should have a `shots.js`;
`themes/bring_them_home/shots.js` is the worked example, and that game has no
other automatic check on where anything is.

`pieceDensity` builds each place headless — `engine/dev/headless.mjs` stubs the
canvas and the renderer, since three.js touches no GPU until something renders —
and counts placed pieces per room against floor area. It is how "the rooms feel
empty" became a number: Quantum's own rooms hold a median of 3 pieces where the
engine's case rooms hold 9–15.

In the browser console, before judging how anything looks:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

`smokeCampaign` exists because a theme once had entirely valid content and two
thirds of its campaign unreachable. `validateContent` cannot see that.

## A mission is a day, and a day is a countdown

The campaign clock is gone. It charged time in lumps — `walkCost` on arrival,
`visitBuildingCost` on opening a question, a penalty for a wrong answer — which
meant the player could not see what a decision cost until after making it, and
standing still was free. The optimal play was to think as long as you liked and
then walk in a straight line.

Each mission is now one working day:

- **The day opens with a plan.** `createDay()` in `engine/core/app.js` puts up
  the calls, what each one is, whether it is a room or a person, and how far
  away it is, with the map underneath. The countdown does not move until the
  player accepts it.
- **The budget comes from the map, not from an author.** `day.js`
  `budgetForRoute()` walks the day's stops nearest-neighbour from the spawn,
  converts the distance to walking time and says travel should be a little
  under half the day. Spread-out days get more hours; a day that never leaves
  one building gets the floor of five. Move a building and the budget follows.
- **Time runs in real time, one game minute a second** while the player is
  walking or driving, and **a quarter of that while a panel is open**
  (`PANEL_PACE`). Nothing is charged. Thinking is not free — but reading the
  evidence is the part the games are about, and at full rate a Diagnosis panel
  costs more of the day than the walk to reach it.
- **The stops are open in any order.** `openStopIndices()` is the truth;
  `nextMissionStopIndex` survives only as "the first still open". Every open
  room's case beacon is lit at once and the map outlines all of them.
- **A wrong call is a penalty box.** The stop closes for an hour of the day's
  own countdown and reopens itself — free — or $10 has it back immediately.
  There is always a free way forward, so the only dead end is a wrong call with
  less than an hour left to run and nothing in the reserve; then the day
  restarts, which is still escapable because each morning pays a stipend and
  clears `state.passages` so the town is worth talking to again. The box is
  `state.penalties[visitKey]`, stored as the `dayLeft` the hour expires at —
  the day only counts down, so it needs no wall clock and survives a save.
- **Running out of time restarts the day too.** Same card, same rule.
- **The last call of the day does not end the day.** Whatever is left on the
  clock is the player's: conversations pay $3 each, once per person per day.

Two traps, both already paid for: the entry points start their frame loop
during module evaluation, so `const day` (like `const driving`) must be
declared *above* that call or every frame throws `Cannot access 'day' before
initialization`; and `state.timeHours` is now derived from the countdown for
the sun angle only — nothing should add to it.

## The shape of a teaching day

`engine/content/normalize.js` `shapeMissions()` reshapes whatever the books
wrote, at load, for every theme — so a re-import cannot lose it.

- **Nobody walks into the same room twice in a day.** The design books write a
  day as one unit on one topic and an area is a building, so Riverton and the
  hospital sent the player to the same building three times, on 15 days out of
  15. The unit is kept: the first call on an area is at its room, any repeat
  that day is a person stop.
- **Each day has exactly one person stop**, unless a repeat forces a second.
  The old rule — every third stop campaign-wide — knew nothing about the day it
  landed in, and stacked with the rule above it made 34 of Riverton's 58 calls
  a person hunt.
- **From day 3, every day carries a callback**: one extra call revisiting an
  area taught earlier, oldest first. Blocked practice is how the books are
  written and how people forget; this is the spaced retrieval that fixes it,
  and it is why a day has a second building to walk to. A callback prefers a
  `— Review` variant of the lesson where the theme has one — the hospital has
  105 of them and none were reachable before this.
- A stop's `person` and `callback` flags are authored data; `isPersonStopForIdx`
  honours the flag and falls back to the campaign-wide rule for anything
  unshaped.

## What a mission stop looks like now

- Three stops per mission plus a callback from day 3; **the day's person stop**
  is found by walking to a named person instead of entering a building.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis
  (instrument panel + candidates, draws a figure), TRIAGE, CASEBOOK, and CHOICE
  — one question, four candidates, and the rebuttals for the wrong ones.
- **Nineteen more are instruments in `engine/core/instruments.js`**, and they
  came from counting: six FPS-native interaction documents, one per game, specify
  104 interactions between them, which turn out to be nineteen distinct designs.
  `gamekit/FORMATS.md` is that catalogue, and all nineteen are built, plus a
  twentieth — **DERIVE** — which did not come from the documents at all: it was
  written for a calculus course, grades the line the previous one actually gives
  you, and its trap is that one wrong branch per step must stay algebraically
  valid or the step is passable by elimination. It once graded a second half —
  name the rule that licenses each step — and that is **off by default** now,
  behind `askRule: true`. The argument for it was that the right line for the
  wrong reason is how somebody passes calculus without learning it; the argument
  against is what counting found, that in five of Midway's 29 steps and ten of
  Headwater's 33 every candidate carried the *same* rule, so the second half of
  the answer was a click with one possible value. A `rules` list without
  `askRule` is refused by the importer rather than quietly ignored. The twelve
  carrying four or more instances each — TRIGGER (write the rule before the number moves), VALUE (what
  would this measurement change), CLOUD (a distribution against a limit, where
  narrowing is not shifting), ALLOCATE (a finite pool, scalar or rate × time),
  TRACE (which channels share a reference; agreement is not independence),
  ATTEST (the record is not the condition), CONTROL (change one thing, reverse
  it), TRIANGULATE (constraints make a region, a systematic moves it),
  DEGENERACY (a family of solutions until other physics arrives), CHAIN (name
  the governing transfer), BALANCE (close the ledger, find the hidden term) and
  VERIFY (predict, act, measure — failing to measure is its own failure). And
  seven thinner ones: PROPAGATE (which input width dominates the output's),
  STRESS (candidates against an assumption's range), DELEGATE (a finite team and
  what command takes itself), FLY (bounded commands on undamped dynamics, so the
  brake has to lead), RESIDUAL (structure in what a fit leaves over), INJECT
  (push a known population through your own pipeline) and ROUTE (a sequence that
  can be rejoined after an interruption). `books/instruments.yml` authors one
  stop of each across seven days. **Red Sand is the first shipped game to author
  one**: its sol 12 is an ALLOCATE — four hundred and thirty kilowatt-hours on a
  dust-storm sol against seven loads that want more than that between them — and
  `npm run drive redsand` drives it right and wrong. The other fourteen author
  none, which is content work rather than engine work.
- **Every instrument carries a trap, and the trap is an importer check.** A
  cloud whose pass mark a re-target reaches, an allocation board affordable
  whole, a chain whose distractor governs, a verify whose every prediction is
  accepted — all of them render perfectly, grade perfectly, and teach the
  opposite of what they were written for. `npm run traps` breaks all 35 and
  asserts the importer refuses each.
- **Four of them are instruments the player operates**, not questions they read.
  SWEEP is one control and a response plotted only where the player looks — a
  resonance, a decay, a trade-off. HOLDOUT fits a rule on one set of data, freezes
  it, and scores it on data it has never seen; the fitting curve carries a spike
  that beats the honest answer, so overfitting costs the player the stop. TALLY
  accumulates shots into bins and builds a statistic out of them, and the decision
  it grades is when there is enough data to report. PROBE hands over no readings at
  all: the player takes them one station at a time along a physical chain and names
  where the pattern breaks. All four are in Quantum;
  `engine/dev/instruments.html` draws every one in a theme on a single page, which
  is the only sane way to look at them — reaching one in the game means playing to
  the right day with time left on the clock.
  **CHOICE exists because importers guess.** An activity that is a plain
  multiple-choice question gets typed as the nearest format the importer knows,
  which is how the hospital ended up with 36 "diagnoses" that had no instrument
  panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js`
  retypes them; the book's own `rebuttals` now appear in the verdict.
- **People stand aside.** Walking into somebody displaces them — straight back
  where there is room, sideways where there is not. A four-metre passage with
  two people in it is otherwise a blocked passage the player cannot ask to
  move. In `engine/people/crowd.js`, and in the hospital's forked `npcs.js`.
- **Every room is walkable whenever you like, in every game.** What
  changes with the mission is whether a case is open there. A room with nothing
  open shows a short card and charges nothing — it is not a locked door.
- **The outdoor games have interiors now.** A door opens a real room built by
  `engine/world/interiorBuilding.js` from the theme's `interiors` block: bench,
  live instrument screen, case plate, case stand, way out. The rooms are built
  lazily in an *interior district* at x ≈ 4000 and entering teleports you
  there — not inside the exterior shells, which are solid boxes on graded
  terrain. The caller swaps the player's ground function and bounds
  (`setGround` / `setBounds`) on the way in and back on the way out.
- **Questions are instrument-first.** Any lesson can carry a `figure`
  (`engine/core/figures.js`) and every format renders one: Ballpark runs a live
  readout and settles onto a log scale against the true value, Sequence is a
  numbered rail, Protocol draws its matches as lines that redraw as you choose.
- **Right or wrong, the verdict is a card on its own overlay**, not appended
  below the question. It carries the figure that shows *how* wrong.
- A wrong call charges only a 3-hour minimum, then offers four priced ways out:
  answer again ($5 / 12 h) or move on ($10 / 24 h). Money options disable when
  the reserve is short; time options never do, so nobody is ever trapped.
- **The map shows the person you have to find**, where they are standing now
  and which way they are facing; you carry a facing arrow too. Person stops
  used to be findable only by walking the town reading nameplates.
- **Each stop opens with why it matters now** — which call of how many, whether
  the earlier ones held, and the clock. Composed in `stopDramaHTML()`, so it
  needs nothing authored; a theme that writes `stop.why` overrides it.
- Talking to anyone who is not this mission's person opens their passage and one
  question about it, worth $1 once. The passage closes before the question;
  reading it again is offered and forfeits the dollar. The question is authored
  where the roster carries a `quiz` array, and generated by lifting a sentence
  where it does not.

## House rules learned the hard way

1. **Do not fork the engine again.** Three copies meant every fix three times.
2. **Budget real lights.** 28 point lights took a floor from 118 fps to 20.
   Ambient + hemisphere + emissive panels + IBL. Ceiling of 6 real lights.
3. **Never put text on a `DoubleSide` material.** It renders mirrored from behind.
4. **One source of truth for ground height.** Shipped broken twice.
5. **Never dim gameplay elements with opacity.** Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo
   renders near-white. `envMapIntensity` 0.35–0.5, exposure below 1.0, and an
   albedo darker than looks right written down.
7. **`kit.js` placers take `(x, z, y)` — ground last.** One call written
   `(x, y, z)` put six display boards sixteen metres in the air.
8. **Keep the spawn point and the route clear.** A prop over the spawn welds the
   player in place: renders perfectly, W does nothing.
9. **A crowd checks its destination, not its path — fix both.** `blocked` was
   consulted when a walker *chose* somewhere to go and never while it walked
   there, so on open ground people rarely crossed a building and in a submarine
   they walked through every bulkhead. The same predicate now takes a pad, since
   the margin that keeps somebody from being *placed* against a wall is wider
   than their shoulders. A fanned-out crowd position needs the same check: a
   person placed inside the furniture stands there all game, because every
   direction out is blocked and no target is reachable.
10. **The player's width is a theme decision.** 0.45 suits a street. A hatch is
   a 1.1 m opening, which leaves a twelve-centimetre slot — "sometimes I cannot
   get through the door". `look.playerRadius`.
11. **`scene.environmentIntensity` does not exist before three r163.** Setting it
   is silent and the environment applies at full strength — a submarine rendered
   with every bulkhead lifted to pale sage. `dampEnvironment(scene, level)` in
   `engine/world/materials.js` is the repo's answer, and it works per material.
12. **Compare a challenge format through `kindOf()`, never as a raw string.**
   The books spell them "Sequence", "SEQUENCE" and "Science Tank". Comparing
   raw strings left 72 of the hospital's lessons matching no branch and
   rendering "challenge type SEQUENCE is not yet implemented" in a game that
   had shipped. Both dev checkers canonicalise the same way.
13. **`walkCost()` charges the time itself.** It returns advanceTime's verdict,
   not a number of hours, so `advanceTime(walkCost(d))` adds `undefined` to the
   clock. NaN reached the sun angle before it reached the HUD, so the symptom
   was the whole world going black. `advanceTime` now refuses non-finite hours.
14. **A save belongs to the theme that wrote it.** `loadState` used to fall back
   to the hospital's legacy key for *every* theme, so playing the hospital and
   then opening either other game loaded a hospital campaign into it — group ids
   that theme has never heard of, and the first question panel died on
   `gs.issue` of undefined. `tryLoadSaved` now rejects a save whose group ids do
   not match the theme.
15. **The two older games fork `styles.css`.** Their forks stop before the
   instrument-panel rules, so anything the shared question UI draws had no
   styling there at all. Both now `@import` the engine sheet at the top of their
   fork — a `<link>` cannot do it, the path leaves Vite's root and 404s.
16. **Nobody may be *placed* without asking whether the spot is free.** A person
   dropped inside a collider is there permanently: every walker refuses to step
   into a blocked point, and from inside one every neighbouring point is blocked
   too, so they cannot walk out. Three of the hospital's four spawn paths had no
   check at all. `settle()` (all three crowds) rings outward to the nearest
   clear spot, and each walker also rescues anybody already inside something.
17. **The physical sky has a radiance floor.** With the sun below the horizon and
   both scattering terms at zero it still renders ~0.03 linear, which tone
   mapping lifts to flat grey. No uniform reaches it. A nocturnal theme sets
   `atmosphere.nightSky` and the dome is hidden below deep night. Related:
   `nightTurbidity` / `nightRayleigh` and `look.nightLift` exist because the
   engine's defaults are tuned for a *daytime* game's dusk.
18. **`look.far` has to clear the sky dome outdoors — from the far end of the
   site, not from the spawn.** At an interior's 160 the dome is clipped away and
   the sky renders black in broad daylight, with no error anywhere and the
   horizon ranks gone. 900 is the working value on a compact site; the clearance
   is `atmosphere.scale + how far the player can get from the origin`, so
   Wellmere's 300 m of headland and causeway needs 1500 against a dome of 700.
   The symptom is a black band above the horizon at one end of the map only,
   which reads as a rendering bug and is a camera setting.
19. **Ground and crop have to be a value apart, and the ground is the one to
   move.** Wellmere's first field put mid-green plots on mid-green turf and
   1,300 of them read as one flat smear from twenty metres. Lightening the crop
   turns it to pastel under ACES; darkening and browning the *ground* — turned
   earth, two stops below what looks right on the canvas — separates them and
   makes the alleys read as alleys. Same rule as house rule 6, applied to a pair
   rather than a surface.
20. **Grep for the previous game's nouns before assuming a module is generic.**
   `simulation.js` held one game's cast, `constants.js` one game's save key,
   `player.js` one game's field of view and floor height.
20. **The sky model is Earth's, and it can be tinted rather than argued with.**
   `buildSky` runs three.js's Preetham sky, which solves for Rayleigh scattering
   off nitrogen and oxygen. No combination of its four uniforms reaches the
   butterscotch of a dusty carbon-dioxide atmosphere — turbidity and mie only
   make it hazier and paler, rayleigh only moves it between blue and white. Red
   Sand added two optional keys instead: `atmosphere.tint` multiplies the dome's
   output *and* the dome that bakes the IBL, so the ground is lit by the sky the
   player sees, and `atmosphere.haze: { day, night }` replaces the hard-coded
   blue-grey the far ranks and the fog are taken toward. Both are inert unless a
   theme sets them. Set one without the other and a seam appears along the
   skyline, which is what the first pass looked like.
21. **A hard equation early is fine; a derived one before its base is not.** The
   test is dependency, not difficulty — Blackout opens on the swing equation and
   that is the right first question. What was wrong in eight of the fifteen games
   was impulse on day 3 with `F = ma` computed nowhere, the chain rule on day 2
   with the power rule not until day 7, apparent power on day 3 with `P = IV` on
   day 10. `needs` in `tools/syllabus.js` names what each equation is derived
   from, by `e` string rather than by position, and `equationOrder.mjs` fails the
   game for an inversion. Only a question that *computes* settles it, so a base
   taught only through `CHOICE` — which has no relationship, template or worked
   solution — is a base the course never teaches. Corollary: a `DERIVE`'s own
   lines are arithmetic, and reading only `relationship` said Headwater computed
   the power rule on day 7 when the player had been applying it on day 1.

## Screenshot before believing anything visual

This is the most expensive lesson in the repo. In one session: a gable roof was
inside out in the *shipped* game and in the port of it; a building sign sat
behind a canopy slab; half the crowd never moved; a walk cycle's feet travelled
twice as far as the body. **Every one of them passed every assertion available** —
exports present, meshes created, no errors, builds clean.

Corollaries:

- A "before" screenshot is a baseline, not a correctness check. The roof was
  already wrong in the reference shot and I matched it faithfully.
- **A background browser tab gets no `requestAnimationFrame`.** The scene renders
  dark, nothing animates, `getCurrentTarget()` stays null, and synthetic key
  presses appear to do nothing. Check `document.visibilityState` before
  concluding anything is broken. `window.gamekit` exposes `updateCrowd`,
  `updateInteractions`, `getCurrentTarget` and `activate` so a throttled tab can
  be stepped by hand; `window.hospital` and `window.projecty` are the same
  handle for the other two (`teleport`, `getPosition`, `scene`, `THREE`, and
  each game's own extras).
- A dynamic `import()` from the console may resolve to a **second copy** of the
  module graph with its own state. Compare
  `getState() === window.gamekit.getState()` before trusting a console test.

## Editions, audience and copy

- **A theme declares who it is for.** `audience: { grade }` in the manifest;
  `engine/core/typography.js` scales the root font size from it — 1.18× at
  primary, 1.10× middle, 1.04× high school, 1× undergraduate. `audience.textScale`
  overrides. Applied from `engine/core/theme.js`, once, for every game. The same
  game can therefore ship at several reading levels: a new edition is a manifest
  line plus a differently-written book.
- **Measure the reading level, do not judge it.** The hospital's opening card was
  written at Flesch–Kincaid 7.7 for an audience whose lessons sit at 2.7.
  Hospital ≈ 2.6; the college games run 10–14.
- **The opening card is ONE paragraph of situation.** No mechanics (order,
  clock, prices), no scope disclaimer, no controls note — all of it was removed
  from every game. And never tell the player what they *do not* do: "you do not
  touch the vehicle", "you do not prescribe" both read as apologies for the game.
- **And it was the one piece of prose nothing was counting.** The reading-level
  gate covered scenes and verdicts; `checkVoice` read the opening only for the
  slogan it ends on. So the first paragraph a player ever sees — the only one
  read before the game has taught them a word — had no gate, and ten of fifteen
  cards failed the moment one existed. Red Sand opened on "the transfer window
  opens on sol 486" and "the ascent vehicle standing on the pad", three undefined
  terms in a 45-word sentence; Ice Core opened at Flesch–Kincaid 17.5 with a
  55-word sentence. `validateContent` now checks the card's reading level against
  `audience.grade`, fails a sentence over 40 words, and lists hard words the
  glossary never defines. **The sentence length is the one that bites** — the bad
  cards were not hard vocabulary, they were pile-ups, and a 40-word sentence with
  two semicolons is unreadable however plain its words. What no cheap rule
  catches is a domain term built from ordinary words, which is exactly what
  "transfer window" is: for that, read the card.
- **Inside that paragraph there are four beats, in this order.** Every card in
  the set was swept against them: what has happened or is about to, and to whom;
  the player's job stated as authority — "You are the …, which means …"; the
  clock or the argument, with somebody from the roster in it; and last, what it
  costs, in people. **The failure they were swept for is the inventory opening**:
  Red Sand began "nine modules buried to the eaves, eighteen hundred square
  metres of solar panel, an ascent vehicle four hundred metres past the last of
  them" — every fact true, no situation, nobody in it, and a specification for a
  closing line. The same paragraph now opens on the transfer window that does not
  move and ends on six people going home on what two named engineers can agree to
  make. A card ending on a number is usually a card that has not said what the
  number does to anybody. **And two games shipped with no opening at all** —
  Project Y and Hospital Heroes rendered an empty title card for as long as they
  have existed, because `opening` is optional in the manifest and nothing checks
  for it.
- **The verdict says `Correct` / `Incorrect` first.** "Evidence accepted" is the
  response's language, one inference away from what the player asked.
- **The plan card note is "Take them in whatever order."** Nothing else.
- **The scene is the situation. The verdict is the teaching.** This is the
  opposite of how all seven games shipped, and it was the single most expensive
  content mistake in the repo. A scene of 90–100 words carrying the mechanism
  means the player reads the answer, answers, and learns nothing from being
  right — Project Y explained the four rotational rules and then asked the
  player to match them, against a verdict of nine words. Every game was
  rewritten: scene **30–45 words** of situation only, `why` **70–90 words** of
  mechanism (Hospital ~50, because it is written for a second-grade reader), and
  a rebuttal per wrong option saying why *that* one fails. Measured across the
  seven, teaching-to-scene went from 0.22–0.52 to 2.7–3.4.
- **A stop declares what it assumes.** `assumes:` on the lesson — the prior
  knowledge the question is entitled to expect. It exists because the honest
  version of "could a student answer this?" is "with what already in their
  head?", and writing it down is what stops a question quietly requiring a
  degree.
- **Reading level is measured, not judged.** `audience.grade` in the manifest is
  a gate: validateContent notes any passage above it and fails one two grades
  over. The vocabulary of a subject cannot always be simplified — "spontaneous
  fission" is the word — so the lever is sentence length, which is the other
  term in the formula.
- **`theme.stopNoun`** — what a non-person stop is called. Mission Control has no
  rooms and no doors, and "a room" sent players hunting for one.

## Finding things and people

- **Anybody the day still wants has a cone over their head**, several at once,
  drawn with `depthTest: false` so it shows through walls. The only thing in
  these games allowed to draw over everything. In `engine/people/crowd.js` and
  the hospital's forked `npcs.js`.
- **Any open call is marked** — case beacon in a room, and in Mission Control a
  beacon over the console (there is no room to put one in).
- **The map is drawn at the size it will be seen at.** `renderMap({ maxW, maxH })`
  fits the box and turns the plan sideways when that shows it larger; it used to
  be 720 px wide regardless and then scaled down by CSS, which made a long site's
  labels two pixels high. Interior rooms are drawn on their own side of the
  corridor — drawing every room full-width put opposite rooms on top of each
  other — and a name that will not fit inside its room goes outside with a leader
  line rather than being truncated.

## Content and safety

Audience varies: Hospital Heroes is ~grades 3–4, The Contaminated City is
college chemistry. The design books carry explicit safety framing — the player
never prescribes, diagnoses for real, or handles hazardous material outside a
fictional frame. Keep it. No gore; stakes come from time, teamwork and
consequence.

Content invariants, all asserted by `validateContent`: every lesson has a real
`scene`; `takeaway` never equals `why`; `choices` contains `correctChoice`
verbatim (grading is by label); the pre-question panel shows the scene and where
you are, never the takeaway.

## Known unfinished work

- ~~One world is still hand-built: the hospital's.~~ **Both flips are done.**
  Project Y builds the mesa from `site.js` through `engine/world/outdoorTown.js`,
  and the hospital builds its ward from `plan.js` through
  `engine/world/interiorFloor.js` — `worldParity` says "generated from the site
  data" for both where it used to say "hand-built". The hospital's was the easy
  one in the end and nobody expected that: `interiorSite.js` had been
  generalised out of that exact floor, so the flip renamed the plan's keys
  (`CORRIDOR.halfWidth` to `metrics.corridorHalfWidth`, `ROOMS` to `rooms`) and
  deleted 1,070 lines of world builder, 766 of fit-out and 236 of interior
  lighting. What replaced them is `themes/hospital/props.js` on top of
  `interiorKit`, which is 300 lines and has had every fix the fork missed.
- **How the Project Y flip was done, because the hospital's will want the same
  shape.** It went in two steps, a year apart, and the order is the lesson. First
  an *adapter*, not a rewrite: `src/world.js` kept the old names and mapped them
  onto the engine's contract — one-argument `initWorld`, argument-less
  `updateWorldFromState`, `getBuildingPosition` onto `getStopPosition`,
  `updateDayNight` onto `updateTimeOfDay` — so the flip touched the world and left
  the game alone. Then the entry point went, and with it the adapter: with
  `gamekit/src/main.js` calling `outdoorTown` directly there was nothing left for
  it to adapt. `project-y-fps/` is a tombstone README now, and the game is
  `themes/projecty/`. Dropped on the way across, deliberately: the weekly funding
  economy and the special-request vignettes, which existed only in that entry
  point and which the day model had already replaced everywhere else. What made it safe was checking the terrain *before* porting it: the
  engine's `mesa` profile was compared against the heightfield `env.js` computed by
  hand over 841 points, mean difference 0.06 m, and the only half-metre cases were
  building pads where the old surface noise dipped a bench that should read level.
  Do that comparison first; if it fails, the flip is a terrain port and a much
  bigger job.
- **Project Y is not fully declarative yet.** The pine forest, the ground scatter
  and the lamp positions are code in `themes/projecty/props.js` rather than site
  data. `src/env.js` is down from 640 lines to 244: the sky, terrain, roads and
  ridges it used to build are deleted, and what is left is `plantTrees`, the seeded
  random and `terrainHeight`, which is a door onto the engine's `groundHeight`.
  **`ROADS`, `onRoad` and `MESA_PLAYER_LIMIT` look dead from outside and are not** —
  `plantTrees` reads all three to decide where a tree may stand, which is why the
  roads are declared twice, once as `site.paths` for the engine to grade and once
  here as the rectangles the forest keeps out of.
- See `gamekit/FOURTH_GAME.md` for the plan this came from and what is left.
- **Project Y bios have no authored questions yet.** Its 26 bios are long and
  good (164 words mean) and not one carries a `quiz` array, so every one falls
  through to the generated sentence-lift question. Hospital, The Contaminated
  City, Deep Watch and Bring Them Home all author theirs.
- **Outbreak and Planetary Defense have half a roster each.** Six of twelve
  people in each carry a real two-paragraph bio and a question; the other six
  carry one sentence restating their job title and no question at all. Bring
  Them Home had the same split and has been written; these two have not.
- ~~`Hospital/hospital-fps/src/questions.js` is dead Project Y trivia~~ — gone
  with the package it lived in.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`,
  `budget`, `Director funds`).
