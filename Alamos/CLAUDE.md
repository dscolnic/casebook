# Alamos — mission-based learning games

Twenty-five first-person, mission-driven educational games on three.js, plus the shared
engine they run on.

**The philosophy is one line: hard concepts, explained at a sixth-grade reading
level.** The syllabus stays where it is — AP Physics C stays AP Physics C — and the
prose comes down to meet the reader. `engine/dev/plainCards.mjs` measures the two
cards nobody can avoid (the opening card and every day's stake) against grade 6.5
whatever `audience.grade` says, and ratchets: a campaign may not gain a card over
the bar. What the number cannot see is obliqueness — *"hold too little and the
first cold evening finds out"* scores grade 3 and still made a reader stop — so
every card is read after it passes. `alamos-accessibility` is the pass for
questions; `alamos-copy` is the bar for cards. Each is the same loop in a different setting: missions × stops,
walk to a place, answer a science question, hand off. No combat, no weapons.

**This file is the core; ten skills under `.claude/skills/` carry the detail** and
load on demand — see *Where the rest of this file went* below. The **Tripwires**
section is the part that must stay here: rules that gate work before you know which
skill you are in.

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
| `gamekit/ACCESSIBILITY_PASS.md` | The sixth-grader pass — a card's reading level down with the course's judgement intact. Worked on `redsand KINET-1`, 7.9 → 4.2. |
| `gamekit/QUESTION_BRIEF.md` | The card shape every stop is rewritten to. |
| `gamekit/FORMATS.md` | The instrument catalogue. |
| `gamekit/ARCADE.md` | The fun-first formats, and why FLOW as specified should not be one. |
| `gamekit/MIDDLE_SCHOOL_EDITIONS.md` | The junior-edition plan. |
| `gamekit/FOURTH_GAME.md` | The plan the Project Y flip came from. |

## The thirty-five campaigns

`GAMES.md` is the full inventory; the `alamos-games` skill carries the place, the
silhouette and the fit-out lessons for each. Run any of them with
`THEME=<id> npm run dev` from `gamekit/`; the directory is `gamekit/themes/<id>/`.

| id | Game | Course |
| --- | --- | --- |
| `contamcity` | The Contaminated City | college chemistry |
| `deepwatch` | Deep Watch | naval acoustics (a submarine, its own world) |
| `outbreak_riverton` | Outbreak: Riverton | epidemiology |
| `bring_them_home` | Bring Them Home | spaceflight ops (Mission Control, its own world) |
| `planetary_defense` | Planetary Defense | orbital dynamics (nocturnal) |
| `blackout` | Blackout | senior-high electrical engineering |
| `aftershock` | Aftershock | earthquake engineering |
| `quantum` | Quantum | quantum computing (best board diversity in the repo) |
| `the_trial` | The Trial | AP Statistics |
| `icecore` | Ice Core | paleoclimate |
| `headwater` | Headwater | Calculus |
| `seedbank` | Wellmere | AP Biology, heredity half |
| `midway` | Safety Factor | AP Physics 1, in derivations |
| `redsand` | Red Sand | AP Chemistry, back half |
| `yellowbay` | Yellow Bay | AP Chemistry, structure half (own world, two wings) |
| `sightline` | Sightline | AP Psychology |
| `groundtruth` | Ground Truth | AP Physics C E&M, ten derivations |
| `carrying` | Carrying Capacity | AP Environmental Science |
| `ghostlight` | Ghost Light | AP Precalculus (own world) |
| `changeover` | Changeover | AP Macroeconomics (a tower — four plates, one footprint) |
| `slackwater` | Slack Water | AP Calculus BC, parametric/polar/series half |
| `overwind` | Overwind | AP Physics C: Mechanics, in derivations |
| `darkfibre` | Dark Fibre | AP Physics 2, optics and modern |
| `projecty` | Project Y | Los Alamos 1943–45, outdoor mesa |
| `hospital` | Hospital Heroes | ~grades 3–4, interior |
| `qd_accel` | The Accelerating Universe | astronomy and cosmology |
| `qd_dna` | The Double Helix | biology |
| `qd_nucleus` | The Atomic Nucleus | physics |
| `qd_tectonics` | Plate Tectonics | earth science |
| `qd_higgs` | The Higgs Boson | particle physics |
| `qd_eclipse` | The Bending of Starlight | physics (outdoors) |
| `qd_exo` | The First Exoplanet | astronomy |
| `qd_ligo` | Gravitational Waves | physics |
| `qd_cmb` | The Cosmic Microwave Background | cosmology (outdoors) |
| `qd_hubble` | The Expanding Universe | astronomy |

The last ten are the **Quick Discoveries** — nine stops in one sitting on a 3 × 3
spine, `dayNoun: 'Level'`, all at `audience: { grade: 9 }`, no second-day model and no
warm-up runs.
Twelve junior (`_ms`) and three same-grade AP editions exist beside these; an
edition is a registered theme, not a build flag. Twenty-five games plus ten Quick
Discoveries; `themes.json` maps every id to its directory.

## Tripwires — read these before you know you need them

Each is a live defect this repo paid for. The paid-for detail is in the skill named
beside it; these lines stay here because they gate work you may not yet know you
are in.

- **A measurement that produces a plausible answer is not thereby a working
  measurement.** When you add a metric, **write the case where two inputs that
  should score the same actually do — before trusting anything it says**, and
  confirm it by putting the bug back and watching that case, and only that case,
  fail. Paid for at least twenty times → `alamos-measurement`.
- **Screenshot before believing anything visual.** Exports present, meshes created,
  no errors and a clean build have all coexisted with an inside-out roof, a sign
  behind a canopy, a motionless crowd, a chain band above the top of the frame, and
  a game's title object hidden behind its own hut. A background browser tab gets no
  `requestAnimationFrame`, so nothing animates and synthetic keys appear dead →
  `alamos-world`, `npm run shots`.
- **Do not fork the engine again.** `main.js` is shared and there are no forks
  left; three copies meant every fix three times → below.
- **A count is not a finding until the renderer is read**, and **grep for the field
  the contract names, not the field you expect.** Both cost withdrawn findings on
  whole-repo sweeps → `alamos-measurement`.
- **When a book key stops reaching the game, look at the importer before the
  renderer.** A field the importer drops is invisible to `fieldCoverage`, because
  nothing is in the content to be uncovered → `alamos-measurement`.
- **Two copies of one rule drift the first time either is corrected.** Importers,
  checkers and the engine import the shared function; a checker with its own copy
  of a number is a second description of the rule → `alamos-measurement`.
- **A save belongs to the theme that wrote it**, and a room gets its own slot.
  Group ids are identical between editions, so the guard would wave a ten-day
  campaign into a fifteen-day slot → `alamos-shipping`.
- **`kit.js` placers take `(x, z, y)` — ground last.** One call written `(x, y, z)`
  put six display boards sixteen metres in the air → `alamos-world`.
- **Keep the spawn point and the route clear**, and never *place* anybody or any
  vehicle without asking whether the spot is free. A prop over the spawn welds the
  player in place: renders perfectly, W does nothing → `alamos-world`.
- **A hard equation early is fine; a derived one before its base is not.** Only a
  question that *computes* settles it → `alamos-curriculum`, `equationOrder.mjs`.
- **Work is not shipped until the games are rebuilt and main has them.** This
  branch (`deep-watch-integration`) is the workshop; **`main` is the app and has
  no `Alamos/` in it at all**, and Replit only ever pulls main. Pushing the
  workshop branch changes nothing a player can see. The bridge is
  `npm run sync-casebook`, which builds every theme and writes the output into
  the casebook checkout at `/Users/scolnic/code/casebook`, which is the same
  repo on main — then that has to be committed and pushed too. Do not merge the
  two branches: it would drag the whole workshop into the branch a live Reserved
  VM serves → `alamos-shipping`.
- **A campaign builds one named thing, and `delivery.where` has to be an area
  with somewhere to stand.** A room behind a door, or a room of its own on the
  plan — name an area with neither and the board every day's piece goes onto is
  built where nobody can walk into it, silently. Mission Control's first choice
  was a console on the control-room floor, is on the site plan, and built the
  board nowhere with every gate green → `alamos-copy`, `npm run check`.
- **A room's floor is not always y = 0.** Mission Control and the theatre stand
  their rooms on a raised tier, and anything placed at zero there is under the
  floor: the delivery case stood a metre and a half below the boards' own floor
  while the board on the wall above it looked perfect → `alamos-world`.
- **The scene is the situation; the verdict is the teaching.** Scene 30–45 words of
  situation only, `why` 70–90 of mechanism, a rebuttal per wrong option. The single
  most expensive content mistake in the repo → `alamos-copy`.
- **Reading score cannot see demand.** Prose at grade 4 with an AP course's
  judgement in it is the failure this repo records three times; `questionLoad`'s
  four numbers are the gate at grade 8 and below → `alamos-curriculum`.
- **Hard concepts explained for sixth graders — and no gate enforces it.** Every
  question is written to that line: reading level down, demand untouched. **Never
  delete the official term to get there — name it and gloss it on the spot**, then
  let the plain words carry the card (*"its rate — how fast the gas reacts"*). A
  student who never meets the word cannot read their own textbook. And a card is
  not readable because its score fell: a stem whose grammar no option answers
  scores beautifully. Before writing or simplifying any question read
  `alamos-accessibility` — the seven things to find first, and the Flesch-Kincaid
  step that is currently the whole gate, because `questionLoad` passes grade-12
  prose in a game declaring grade 12 → `alamos-accessibility`.
- **A panel that enforces the player's decision has removed it**, and a panel that
  grades against a number prints the *goal*, never the *target* →
  `alamos-formats`.
- **Compare a challenge format through `kindOf()`, never as a raw string.** The
  books spell them `Sequence`, `SEQUENCE`, `Science Tank` → `alamos-formats`.
- **A refusal nothing exercises is a comment**, and **a wall of false failures is
  how a gate stops being read** — worse than the drift it was written to catch →
  `alamos-measurement`, `npm run traps`.
- **Nothing in `npm run check` asserts anything about input or the wire.** A and D
  strafed backwards for years; the co-op protocol has no checker at all →
  `alamos-world`, `alamos-shipping`.

## Where the rest of this file went

The detail is in skills under `.claude/skills/`. Each loads on demand; only the
description above is in context until then. Invoke with the `Skill` tool.

| Skill | What it holds |
| --- | --- |
| `alamos-games` | the 35 campaigns in full — place, silhouette, worlds, interiorKit, murals, the Quick Discovery rules |
| `alamos-measurement` | the twenty-odd defects that passed every assertion, and the selftest discipline. **Read before writing any checker** |
| `alamos-checks` | every gate behind `npm run check`, plus traps / drive / laps / shots / lessons / pieceDensity / cardLoad / readerProbe |
| `alamos-curriculum` | curriculumDelivery, formatMix's cap, the four questionLoad numbers, dayCalls, conceptOrder/equationOrder, the card's shape |
| `alamos-formats` | the 35 answer formats, the four panel rules, DERIVE/askRule, every instrument's trap |
| `alamos-copy` | the opening card's four beats, introRule, endings, the day debrief, editions and audience, the discovery games' real people |
| `alamos-accessibility` | the sixth-grader pass: the seven defects to find in a card before touching it, the rewrite rules, the word and Flesch-Kincaid evidence. **Read before writing or simplifying any question** |
| `alamos-warmups` | the seven world-graded runs and their schedule, the two-tier ground rule, two vehicle kinds per site |
| `alamos-day` | the plan card, budgetForRoute, the countdown and PANEL_PACE, penalties, the economy, shapeMissions |
| `alamos-world` | the house rules, the touch input path, the map and markers, screenshot discipline |
| `alamos-shipping` | dist/ and the gallery, sync-casebook, tools/games.js, cloudSave and ratings, the `?room=` co-op protocol |

Two cross-references the split does not break: the **numbered house rules** cited
across every skill (*house rule 1, 8, 14, 16, 21*) are the list in `alamos-world`,
still under their original numbers; and *"this file's own table"* means the
defect table in `alamos-measurement`.

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
