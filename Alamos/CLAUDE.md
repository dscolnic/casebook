# Alamos — mission-based learning games

This directory holds a family of first-person, mission-driven educational games
built on three.js, plus the shared engine they are moving onto. Each game is the
same loop in a different setting: 15 sessions × 3 stops, walk to a place, answer
a science question, hand off at the end. No combat, no weapons.

**Read `gamekit/THEME_CONTRACT.md` before touching any world code.** It is short,
and it documents graphics rules that each cost hours to re-learn — twice.

## What is here

| Path | State |
| --- | --- |
| `gamekit/` | **The shared engine, and it now runs.** New games go here. |
| `gamekit/themes/contamcity/` | The Contaminated City — college chemistry, outdoor. The worked example. |
| `project-y-fps/` | Los Alamos, 1943–45. Outdoor. Working, shipped. Own forked copy of the core. |
| `Hospital/hospital-fps/` | Hospital Heroes, junior doctor. Interior. Working. Own forked copy. |
| `shared/engine/` | **Stale.** Nothing imports it; predates both rewrites. See `shared/STALE.md`. |
| `*.html`, `*.docx`, `*.pdf` at top level | Design documents and older single-file prototypes. |

The two shipped games were deliberately **not** migrated onto `gamekit` — they
work, and breaking them to refactor would be a bad trade. Migrate newest-first
when convenient.

## Starting a new game

The runbook is `gamekit/NEW_GAME.md`, and it is worth reading in full — the
first new theme on this engine took a day, and most of that is now either
automated or written down.

```sh
cd gamekit
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # look first
```

Two importers exist because the design books come in two shapes. **Run both with
`--dry` and use whichever one reports missions and activities**:

| Book shape | Tool |
| --- | --- |
| `MISSION n` + `Activity n.m:` + `SELECTED FORMAT` | `tools/import-missionbook.mjs` |
| `SHIFT n • CASE m • FORMAT` + answer pages | `tools/import-designbook.mjs` |

Neither guesses. A third shape needs a third parser — copy
`tools/parse-missionbook.mjs`, which is the cleaner of the two.

Run it, then:

```sh
node engine/dev/validateContent.mjs <theme>    # content agrees with itself
node engine/dev/smokeCampaign.mjs  <theme>     # the engine can reach every stop
THEME=<theme> npm run dev
```

Both checks exit non-zero, so they can gate a build. Run **both** — they catch
different things, and the bug that made two thirds of the first campaign
unreachable passed `validateContent` cleanly.

## House rules learned the hard way

1. **Do not fork the engine again.** Two forks already mean a fix has to be made
   twice. New settings are themes under `gamekit/themes/`.
2. **Budget real lights.** A light per fixture is unaffordable — 28 point lights
   took a floor from 118 fps to 20. Ambient + hemisphere + emissive panels + IBL
   and about four point lights looks the same and costs nothing.
3. **Never put text on a `DoubleSide` material.** It renders mirrored, and arrows
   point the wrong way, to anyone approaching from behind.
4. **One source of truth for ground height.** If the visible surface is graded or
   flattened, the height *function* must be too, or everything standing on it
   sinks. This shipped twice.
5. **Never dim gameplay elements with opacity.** Transparent walls read as a bug,
   not a hint. Darken the colour.
6. **Keep the spawn point clear, and park equipment parallel to walls.** A prop
   over the spawn point stops the player moving at all while everything still
   renders — the symptom is "renders great, W does nothing".
7. **Run the tools before judging by eye.** `engine/dev/validateContent.mjs` and
   `engine/dev/smokeCampaign.mjs` for content and reachability,
   `engine/dev/audit.js` in the browser for the scene. All three exist because
   eyeballing missed real bugs.
8. **Outdoor palettes blow out.** Under ACES with a bright sky IBL, a mid albedo
   renders near-white: the first pass at Riverton looked like a salt flat.
   Surfaces want `envMapIntensity` around 0.35–0.5 and an exposure below 1.0,
   *and* a darker, more saturated albedo than looks right written down.
9. **Grep the engine for the previous game's nouns before assuming it is
   generic.** `simulation.js` held one game's cast list, `constants.js` held one
   game's save key, `player.js` held one game's field of view, floor height and
   world bounds. Each looked like engine code and was content.

## Question content

A lesson needs its **scene** (the clues), a **takeaway** distinct from the
**why** (or the intro gives the answer away), and `choices` that contain
`correctChoice` verbatim (grading is `indexOf`). The pre-question panel must show
the scene and where you are, never the takeaway. Every one of these has been
wrong in a shipped build; `validateContent.mjs` now asserts all of them.

## Measuring performance, and testing in a browser

Frame timing from a **background browser tab is meaningless** — Chrome throttles
`requestAnimationFrame` there, and a tight render loop stalls the pipeline.
Check `document.visibilityState === 'visible'` before quoting a number, or the
result will be off by 5×.

The same throttling makes automated in-page testing misleading in two ways that
each cost time:

- With no `requestAnimationFrame`, the game loop never runs, so **the scene
  renders dark and nothing updates**. Drive `updateTimeOfDay()` and
  `renderer.render()` by hand before screenshotting, or conclude the lighting is
  broken when it is not.
- The loop is also what raycasts, so `getCurrentTarget()` stays null and
  **synthetic key presses appear to do nothing**.
- A dynamic `import()` from the console may resolve to a **second copy** of the
  module graph with its own game state. Compare `getState() === window.gamekit.getState()`
  before trusting what a console-driven test tells you.

Prefer `engine/dev/smokeCampaign.mjs` for anything about game logic. It runs the
real modules headlessly, in one graph, with no DOM.

## Content and safety

Audience varies by book — Hospital Heroes is roughly grades 3–4, The Contaminated
City is college chemistry. The design documents carry explicit safety framing:
the player never prescribes, diagnoses for real, or handles hazardous material
outside a fictional frame. Keep that framing in any generated copy. Avoid gore
and frightening imagery; stakes come from time, teamwork and consequence.
