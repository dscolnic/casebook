# gamekit

One engine, seven games. **Building a game — new, or bringing a design
document? `NEW_GAME.md` is the whole path in order.**
**Touching world code? Read `THEME_CONTRACT.md` first.**

```sh
npm install
THEME=contamcity npm run dev
```

`THEME` picks the theme; `vite.config.js` turns it into the `@theme` and
`@world` aliases the engine imports through. The other two games run from their
own directory and imports this
engine across the package boundary.

## Layout

```
engine/core     loop, player, interactions, state, save, simulation, dashboard,
                questionUI, figures, map, personQuiz, terminology
engine/people   rig (bodies, faces, gait) + crowd (placement, walking, plates)
engine/world    outdoorSite (ground/sky/planting), outdoorTown (assembles a site),
                interiorSite (a whole indoor floor), interiorBuilding (one room
                an outdoor town can be entered into), kit (generic + period
                building vocabulary), materials,
                screens (canvas faces for the machines in a room)
engine/dev      audit, validateContent, smokeCampaign, themeResolver
themes/<name>/  theme.js, site.js or plan.js, outfits.js, props.js, content/
src/main.js     the entry point — NOT shared, see below
index.html      the DOM the HUD, question modal and verdict card write into
```

## How a theme reaches the engine

`engine/core/*` imports its content under fixed names — `./curriculum.js`,
`./divisions.js`, `./missions.js`, `./leaders.js`, `./historicCharacters.js`,
`./world.js`. Each is a thin re-export that reads `@theme`, an alias for
`themes/<name>/`; `@world` is picked from the theme's `site.kind`. So the engine
never names a theme and a theme never edits the engine.

The two older games do the same from their own directories: each has a
`theme.js` adapter presenting its existing content in the shape the engine
reads, and `src/*.js` logic files that are one-line re-exports of
`../../gamekit/engine/core/*`. Their `vite.config.js` needs
`resolve.dedupe: ['three']` and `server.fs.allow: ['..']`, or three.js loads
twice and dev cannot serve the engine.

**`main.js` is per game.** It is the wiring, not the engine: a feature added
there reaches one game only. This has already shipped a bug.

## Import content from a design document

Two book shapes, one importer each. Run both with `--dry`; the one that reports
missions and activities is the right one.

```sh
# MISSION n / Activity n.m / SELECTED FORMAT
node tools/import-missionbook.mjs book.docx <theme> --dry
node tools/import-missionbook.mjs book.docx <theme> --map tools/<theme>-map.json

# SHIFT n • CASE m • FORMAT, with separate answer pages
node tools/import-designbook.mjs book.docx <theme> --map tools/my-shift-map.json
```

Which mission belongs to which area of study is a design decision, so the map is
supplied explicitly; the mission-book importer refuses to write without one.
`tools/docx.mjs` is the dependency-free reader (shells out to `unzip`).

Hand-written alongside the generated content: `content/groups.js` (the areas),
`content/roster.js` (the cast — books name functions, not people),
`content/ballpark-specs.js` (numeric specs; prose relationships carry no
arithmetic), and optionally `content/diagnosis-packs.js`.

## Checks

```sh
node engine/dev/validateContent.mjs <theme>   # content agrees with itself
node engine/dev/smokeCampaign.mjs  <theme>    # every stop is reachable, headless
```

Both exit non-zero, so either can gate a build, and they catch different things.
`smokeCampaign` plays all 15 missions through the real engine — it exists
because a theme once had entirely valid content and two thirds of its campaign
unreachable. In the browser, `reportAudit()` from `engine/dev/audit.js` before
judging how a scene looks.

**None of them catch a wrong-looking scene.** Screenshot it. See CLAUDE.md.

## Provenance

Extracted from two working games — Project Y (Los Alamos, outdoor, now `themes/projecty`) and
Hospital Heroes (interior, now `themes/hospital`). Both now run on this engine's logic; both
still own their worlds. Files named `_ref_*.js` are the originals, kept while
the world generalisation is finished.
