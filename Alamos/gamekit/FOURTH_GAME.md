# Making a fourth game cheap

`NEW_GAME.md` is the runbook for building one today. This was the list of things
to change first so that building one costs less than the last three did.

**Status: phases 1 and 2 are done, and phase 3 is done except the worlds.**
What that means in practice:

```sh
cd gamekit
npm run new-theme <name>     # scaffolds, registers, and prints what a book cannot supply
npm run check                # every theme, every check — all three games pass
```

Done: content normalisation moved into `engine/content/normalize.js`; the theme
contract is enforced and all three manifests satisfy it; one harness
(`npm run check`) with a `themes.json` registry; the stylesheet forks deleted
(107 duplicated rules each) with a check that they cannot come back; the
interior manager, the E-key dispatch and the debug handle extracted to
`engine/core/app.js`; the importer emits canonical formats, errors on an
unresolved pack, and takes `--verify`; `worldParity` keeps the site data honest.

Not done: the world forks. Both games declare their site as data now, but
`src/world.js` still builds the place by hand in each. That is the last item.

The migration shared the logic and left the wiring. `gameState`, `simulation`,
`questionUI`, `personQuiz` and `figures` are single copies; `main.js`,
`world.js`, `styles.css`, `index.html` and every content file are per game — and
those are the files features actually land in.

## What that cost, measured

Each of these shipped. All of them were invisible: the code ran, the build
passed, and one game quietly did the wrong thing.

| What broke | Cause | Blast radius |
| --- | --- | --- |
| Passage quiz worked in one game, invisible in two | `main.js` forked | 2 games |
| Figures and readings drawn with no styling at all | `styles.css` fork stops before the instrument rules | 2 games |
| `SEQUENCE` matched no renderer — "not yet implemented" | raw comparison against `'Sequence'` | 72 lessons |
| Nine authored diagnosis panels never reached the game | `diagnosis.js` imported by nothing | 9 lessons |
| Person stops with nobody to find | 1 of 26 roster entries had a `division` | 3 areas |
| One game's save loaded into the other two | legacy save key read by every theme | 2 games |
| Clock went NaN, sun angle followed, world went black | `advanceTime(walkCost(d))` in one fork | 1 game |
| Two checkers could not run on two of the games | harness assumed `themes/<name>` | 2 games |

## The work, in the order worth doing it

**Phase 1 — before a fourth game starts.**

1. **Normalise content in the engine, not in each theme.** Two `theme.js` files
   now carry repair code doing the same job (pack expansion; retyping formats
   the importer guessed at; registering estimate specs by title). Move it to
   `engine/content/normalize.js`, run once at load: canonicalise `game.type`,
   expand `pack` ids and fail loudly on an unresolved one, retype a format that
   has no data for its format, register specs across review lessons, backfill or
   refuse a roster with no `division`.
2. **Make the theme contract enforceable.** Two manifests have no `site` and no
   `people`, so the validator checks half of them. Write the schema down, add
   `engine/dev/conformance.mjs`, and unify how a theme declares an interior —
   right now one game uses a theme-level `interiors` map and another a bespoke
   `instruments.js`.
3. **One harness for every game.** A registry mapping theme name → directory,
   and one `npm run check` running validate + smoke + conformance over all of
   them, in CI.

**Phase 2 — while the fourth game is in flight.**

4. **Unfork `main.js`.** Extract `engine/core/app.js` with
   `bootGame({ theme, world, hooks })` owning init, the frame loop, the HUD
   tick, input, the `activate()` dispatch table, interiors, the minimap and the
   debug handle. A game's `main.js` becomes imports plus the hooks it really
   overrides. Migrate the engine-native game first, the hospital last.
   Doing this with a new game in flight is the honest test of the boundary.
5. **Unfork `styles.css`.** Both forks now `@import` the engine sheet (a
   `<link>` cannot — the path leaves Vite's root and 404s). Finish it: delete
   the forked bodies, keep only real overrides, and fail a check when a
   per-game sheet redefines an engine class.

**Phase 3 — after it ships.**

6. **Kill the world forks.** `project-y-fps/site.js` holds all 19 buildings as
   data and nothing imports it; the hospital has a `plan.js` beside a hand-built
   world. Roads, boardwalks, poles, fences, vehicles and the central board have
   no home in the data yet.
7. **An importer that refuses to guess.** Emit canonical types, emit a plain
   question format when that is what the activity is, error on an unresolved
   pack id, and add `--verify` that runs the checks and exits non-zero.
8. **The authoring kit.** A scaffold command, a complete `_template`, and a
   checklist of what a book cannot supply — including the two silent ones: a
   roster entry with no `division` makes a person stop unreachable, and a bio
   under ~40 characters degrades its passage question to a role question.

## Definition of done for game four

- No file outside `themes/<name>/` was edited to build it.
- `npm run check <name>` passes: content consistent, conformance clean, every
  stop reachable and gradeable headless.
- Its rooms have been walked into and screenshotted. None of the checks above
  can see a wrong-looking scene.

## Tests worth encoding now

- Every challenge type resolves to a renderer, compared canonically.
- Every group a person stop can land on has a roster member in it.
- Every estimate lesson has a spec; every pack reference resolves.
- Every diagnosis has a figure or readings across three zones.
- No building within three metres of the spawn point.
- The save key comes from the manifest; a save with foreign group ids is refused.
- No per-game stylesheet redefines an engine class.
