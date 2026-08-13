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

**`GAMES.md` is the inventory** — all eight games, what each one is, where its
content and its place live, and what is still unfinished. Read it first if you
are picking this up cold. **`gamekit/STORY_SPEC.md` is the story contract** —
what a campaign needs beyond correct content, and the checker that enforces it.

**Read `gamekit/THEME_CONTRACT.md` before touching world code.** It is short and
every rule in it cost hours to learn.

## The eight games

| Game | Where | The place, and why it looks unlike the others | Run it |
| --- | --- | --- | --- |
| The Contaminated City | `gamekit/themes/contamcity/` | Riverton: a wide, bright river city. College chemistry | `THEME=contamcity npm run dev` |
| Deep Watch | `gamekit/themes/deepwatch/` | A submarine — its own world, one line of compartments | `THEME=deepwatch npm run dev` |
| Outbreak: Riverton | `gamekit/themes/outbreak_riverton/` | A hospital campus in week three: courtyards, triage marquees, container labs, a decon tunnel on the main route, a fence with one gate | `THEME=outbreak_riverton npm run dev` |
| Bring Them Home | `gamekit/themes/bring_them_home/` | Mission Control — its own world. One room, four tiers stepping down to a wall of plot boards; the teams are rows, not rooms | `THEME=bring_them_home npm run dev` |
| Planetary Defense | `gamekit/themes/planetary_defense/` | A mountain ridge, played entirely at night: one dark road, domes, a radar dish, red service lamps | `THEME=planetary_defense npm run dev` |
| Blackout | `gamekit/themes/blackout/` | Calder Switching Station: a flat river plain, a switchyard, lattice towers walking off the map. Senior-high electrical engineering | `THEME=blackout npm run dev` |
| Project Y | `project-y-fps/` | Los Alamos 1943–45, outdoor | `cd project-y-fps && npx vite` |
| Hospital Heroes | `Hospital/hospital-fps/` | Children's hospital, interior, ~grades 3–4 | `cd Hospital/hospital-fps && npx vite` |

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

**`main.js` is NOT shared.** The wiring every game needs identically now lives
in `engine/core/app.js` — `createInteriors`, `makeActivate`, `exposeDebug` —
but the entry points are still three files. Each game has its own entry point, and it is the
only file the migration deliberately left forked. A feature added to
`gamekit/src/main.js` reaches exactly one game. This has already caused a bug —
the passage quiz shipped working in one game and invisible in the other two.

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
node engine/dev/personStops.mjs    <theme>    # every mission person opens their question
node engine/dev/checkStyles.mjs               # no game stylesheet re-declares the engine's
node engine/dev/worldParity.mjs               # every group has somewhere to happen in the data
```

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
- **A wrong call costs money and only money**: $5 to answer again, $10 to move
  on without it. If neither is affordable the day restarts — the only hard
  consequence in the game, and always escapable, because each morning pays a
  stipend and clears `state.passages` so the town is worth talking to again.
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
  **CHOICE exists because importers guess.** An activity that is a plain
  multiple-choice question gets typed as the nearest format the importer knows,
  which is how the hospital ended up with 36 "diagnoses" that had no instrument
  panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js`
  retypes them; the book's own `rebuttals` now appear in the verdict.
- **People stand aside.** Walking into somebody displaces them — straight back
  where there is room, sideways where there is not. A four-metre passage with
  two people in it is otherwise a blocked passage the player cannot ask to
  move. In `crowd.js` and in both forked `npcs.js`.
- **Every room is walkable whenever you like, in all three games.** What
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
18. **`look.far` has to clear the sky dome outdoors.** At an interior's 160 the
   dome is clipped away and the sky renders black in broad daylight, with no
   error anywhere and the horizon ranks gone. 900 is the working value.
19. **Grep for the previous game's nouns before assuming a module is generic.**
   `simulation.js` held one game's cast, `constants.js` one game's save key,
   `player.js` one game's field of view and floor height.

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
  both forked `npcs.js`.
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

- **One world is still hand-built: the hospital's.** Project Y came across —
  `src/world.js` is a 120-line adapter over `engine/world/outdoorTown.js`, which
  builds the mesa from `site.js`, and `worldParity` now says "world is generated
  from the site data" where it used to say "hand-built". The hospital's still
  builds its place directly; flipping it to `interiorSite` is the last fork. The
  modules it needs exist: `engine/world/interiorBuilding.js` (one room to walk
  into) and `engine/world/interiorFloor.js` (a whole floor, satisfying the world
  contract over `interiorSite.js`'s builder — `site.kind: 'interior'` pointed
  straight at the builder until a scaffolded theme failed on import).
- **How the Project Y flip was done, because the hospital's will want the same
  shape.** An *adapter*, not a rewrite: `main.js` is deliberately forked and calls
  the old names, so `src/world.js` keeps every one of them and maps them onto the
  engine's contract — one-argument `initWorld`, argument-less
  `updateWorldFromState`, `getBuildingPosition` onto `getStopPosition`,
  `updateDayNight` onto `updateTimeOfDay`. The flip touched the world and left the
  game alone. What made it safe was checking the terrain *before* porting it: the
  engine's `mesa` profile was compared against the heightfield `env.js` computed by
  hand over 841 points, mean difference 0.06 m, and the only half-metre cases were
  building pads where the old surface noise dipped a bench that should read level.
  Do that comparison first; if it fails, the flip is a terrain port and a much
  bigger job.
- **Project Y is not fully declarative yet.** The pine forest, the ground scatter
  and the lamp positions are code in `project-y-fps/props.js` rather than site
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
- **`Hospital/hospital-fps/src/questions.js` is dead Project Y trivia**
  (radioactivity questions). Nothing imports it.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`,
  `budget`, `Director funds`).
