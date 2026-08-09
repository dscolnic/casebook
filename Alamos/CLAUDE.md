# Alamos — mission-based learning games

Three first-person, mission-driven educational games on three.js, plus the
shared engine they now run on. Each is the same loop in a different setting:
15 missions × 3 stops, walk to a place, answer a science question, hand off.
No combat, no weapons.

**Read `gamekit/THEME_CONTRACT.md` before touching world code.** It is short and
every rule in it cost hours to learn.

## The three games

| Game | Where | Setting | Run it |
| --- | --- | --- | --- |
| The Contaminated City | `gamekit/themes/contamcity/` | Riverton, college chemistry, outdoor | `cd gamekit && THEME=contamcity npm run dev` |
| Project Y | `project-y-fps/` | Los Alamos 1943–45, outdoor | `cd project-y-fps && npx vite` |
| Hospital Heroes | `Hospital/hospital-fps/` | Children's hospital, interior, ~grades 3–4 | `cd Hospital/hospital-fps && npx vite` |

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

Full runbook: `gamekit/NEW_GAME.md`. Short version:

```sh
cd gamekit
npm run new-theme <name>                                   # scaffold + register + what a book cannot supply
node tools/import-book.mjs my-game.yml <name> --verify     # write the content, then run every check
```

**A new game should be written as a book file**, not a Word document.
`tools/BOOK_TEMPLATE.md` is the format, with a worked example of every question
format; the importer checks it instead of guessing, and refuses to write a book
that would produce an unplayable game. The docx importers stay for the two books
that already exist:

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

## What a mission stop looks like now

- Three stops per mission; **every third is a person stop** — find a named
  person from that area instead of entering the building.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis
  (instrument panel + candidates, draws a figure), TRIAGE, CASEBOOK, and CHOICE
  — one question, four candidates, and the rebuttals for the wrong ones.
  **CHOICE exists because importers guess.** An activity that is a plain
  multiple-choice question gets typed as the nearest format the importer knows,
  which is how the hospital ended up with 36 "diagnoses" that had no instrument
  panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js`
  retypes them; the book's own `rebuttals` now appear in the verdict.
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
9. **Compare a challenge format through `kindOf()`, never as a raw string.**
   The books spell them "Sequence", "SEQUENCE" and "Science Tank". Comparing
   raw strings left 72 of the hospital's lessons matching no branch and
   rendering "challenge type SEQUENCE is not yet implemented" in a game that
   had shipped. Both dev checkers canonicalise the same way.
10. **`walkCost()` charges the time itself.** It returns advanceTime's verdict,
   not a number of hours, so `advanceTime(walkCost(d))` adds `undefined` to the
   clock. NaN reached the sun angle before it reached the HUD, so the symptom
   was the whole world going black. `advanceTime` now refuses non-finite hours.
11. **A save belongs to the theme that wrote it.** `loadState` used to fall back
   to the hospital's legacy key for *every* theme, so playing the hospital and
   then opening either other game loaded a hospital campaign into it — group ids
   that theme has never heard of, and the first question panel died on
   `gs.issue` of undefined. `tryLoadSaved` now rejects a save whose group ids do
   not match the theme.
12. **The two older games fork `styles.css`.** Their forks stop before the
   instrument-panel rules, so anything the shared question UI draws had no
   styling there at all. Both now `@import` the engine sheet at the top of their
   fork — a `<link>` cannot do it, the path leaves Vite's root and 404s.
13. **Grep for the previous game's nouns before assuming a module is generic.**
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

- **Worlds are still forked.** Logic is shared; `world.js`, props and plan are
  not. `project-y-fps/site.js` holds all 19 buildings as data but **nothing
  imports it** — `@world` still points at `src/world.js`. Before flipping it:
  each filler building wants a side-by-side against the original, the roads,
  boardwalks, poles, fences, vehicles and central board have no home in the data
  yet, and hospital needs `engine/world/interiorBuilding.js` written from
  nothing.
- **The worlds are still hand-built in two games.** Both now declare a `site`
  in their manifest and `worldParity` checks it against the groups, but
  `project-y-fps/src/world.js` and the hospital's still build the place
  directly. Flipping them to `outdoorTown` / `interiorSite` is the last fork,
  and the roads, boardwalks, poles, fences, vehicles and central board have no
  home in the data yet.
- See `gamekit/FOURTH_GAME.md` for the plan this came from and what is left.
- **Project Y bios have no authored questions yet.** Hospital and The
  Contaminated City now carry three-paragraph teaching bios plus a `quiz` array
  per person, and `personQuiz.js` prefers those; Project Y still falls through
  to the generated sentence-lift question. Same shape, just unwritten.
- **`Hospital/hospital-fps/src/questions.js` is dead Project Y trivia**
  (radioactivity questions). Nothing imports it.
- `questionUI.js` question renderers should become pluggable per theme.
- `engine/core/*` still uses Los Alamos vocabulary in places (`divisions`,
  `budget`, `Director funds`).
