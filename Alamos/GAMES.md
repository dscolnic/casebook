# The games, and how to pick any of them up cold

Eight playable games, one engine. Everything below is current as of the last
commit on `deep-watch-integration`. `CLAUDE.md` is the working manual — house
rules, the day model, editions and copy conventions. This file is the inventory.
**`STORIES.md` is what actually happens in each game** — the fifteen-day arc, so a
day can be checked against the story it belongs to. **`gamekit/STORY_SPEC.md` is
what a new game needs** before it is a game: the argument, the cast, the
timeline, the four beats of a day card, and how each is checked.

```sh
cd gamekit
npm run check                       # all eight: content, reachability, styles, world parity
THEME=<name> npm run dev            # the six that live in gamekit/themes
```

| Game | Theme / dir | Subject and audience | The place, and why it looks unlike the others |
| --- | --- | --- | --- |
| **The Contaminated City** | `gamekit/themes/contamcity` | College chemistry. Chief Scientific Officer of a river city after a freight-yard fire | Riverton: a wide, bright, spread-out river city. Grid streets, boxy buildings, drivable trucks |
| **Deep Watch** | `gamekit/themes/deepwatch` | Reasoning under pressure; sonar, flooding, air, navigation | A submarine, and its **own world** (`themes/deepwatch/world.js`) — one line of ten compartments, hatches, no sky. Came from a separate engine |
| **Outbreak: Riverton** | `gamekit/themes/outbreak_riverton` | College biology — clinical, cell, molecular, immunology, epidemiology, One Health | A hospital campus in week three of an emergency: courtyards rather than streets, triage marquees, container labs, floodlight masts, a decon tunnel *on* the main route, a fence with one gate. One long hike north to the field station |
| **Bring Them Home** | `gamekit/themes/bring_them_home` | College physics — motion, circuits, thermal, waves, rotation, integration | Mission Control, its **own world** (`themes/bring_them_home/world.js`): one room, four tiers stepping down to a wall of plot boards. The teams are *rows*, not rooms. No doors — `stopNoun: 'a console'` |
| **Planetary Defense** | `gamekit/themes/planetary_defense` | Astronomy — discovery, astrometry, characterisation, radar, impact physics | A mountain ridge played **entirely at night** (`look.dayWindow: [19, 31]`): one dark road, domes with open shutters, a 30 m radar dish, red service lamps. Interiors use the `observatory` style |
| **Blackout** | `gamekit/themes/blackout` | Senior-high / first-year electrical engineering — AC power, transmission, protection, load | Calder Switching Station: a flat graded river plain, a switchyard of gantries and transformers, and two circuits of lattice towers walking off the map. Nothing else in the set has a skyline of steel |
| **Project Y** | `project-y-fps/` | Los Alamos 1943–45, five divisions | Outdoor mesa, timber and gabled, pre-computer — chalkboards and typed sheets, no screens anywhere. `src/world.js` is a 120-line adapter over `outdoorTown` |
| **Hospital Heroes** | `Hospital/hospital-fps/` | ~grade 3–4. Junior doctor, children's hospital | Interior ward: a spine with rooms off it. `audience: { grade: 4 }`, so its whole interface comes up 1.18× larger |

## What they all share

One loop, in `gamekit/engine/`: fifteen missions, each **one working day** with a
countdown budgeted from the actual route; three authored stops plus a callback
from day 3; take them in any order; a wrong call costs $5 to retry or $10 to
leave; run out of either and the day restarts. Question formats: PROTOCOL,
SEQUENCE, BALLPARK, SCIENCETANK, DIAGNOSIS, TRIAGE, CASEBOOK, CHOICE.

Three worlds satisfy the world contract — `engine/world/outdoorTown.js`,
`engine/world/interiorFloor.js`, and a theme's own. **A game's silhouette comes
from its world module**: two themes on the same world look alike whatever the
palette does, which is why the distinctive three either brought their own world
or carry a props layer heavy enough to change the shape of the space.

## Where a game's content lives

Every game is **one book file** plus the place. Books are in `gamekit/books/`:
`deep-watch.yml`, `outbreak-riverton.yml`, `bring-them-home.yml`,
`planetary-defense.yml`, `blackout.yml`. Re-import after editing:

```sh
node tools/import-book.mjs books/<name>.yml <theme> --verify
```

The book carries the areas, the cast and their bios, every mission and stop, the
estimate specs, the glossary, what is inside each room, and what each place
says. It does **not** carry the place (`site.js` / `plan.js`) or the props —
those are code. `tools/BOOK_TEMPLATE.md` is the format.

The two older games predate this and keep generated `curriculum.js` /
`missions.js` under `src/`; edit those directly.

## Starting a ninth

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
  Alamos one both live in `questionUI.js`.
- **Project Y bios have no authored `quiz` arrays**; it falls back to the
  generated sentence-lift question.
- **Engine vocabulary** still says `divisions`, `budget`, `Director funds`.
- Only the opening view of each new game has been walked and screenshotted. The
  far ends — Outbreak's field-station hike, the radar dish up close, Mission
  Control's glass gallery — are built but unseen.

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
