# Theme contract

> The engine-facing half of phase 4 of `NEW_GAME.md`, which is the whole build in
> order. Everything here is a rule the world code enforces or punishes.

One engine, many games. The engine owns the loop, the player, interaction,
state, saving, the question UI and the people; a **theme** owns the place and
the content. Building Los Alamos and then the hospital cost most of its time in
two places — re-deriving a world from scratch, and re-discovering the same
handful of graphics mistakes. This file exists so neither happens a third time.

```
gamekit/
  engine/
    core/     loop, player, interactions, state, save, time, simulation,
              dashboard, questionUI          — never edit per theme
    people/   rig + crowd                     — outfits and roster come from the theme
    world/    interiorSite, outdoorSite, kit, materials
    dev/      audit, validateContent, smokeCampaign, themeResolver
  themes/
    <name>/
      theme.js      the manifest (below)
      site.js       the place, as data (outdoor) — or plan.js (interior)
      outfits.js    what people wear
      props.js      the 10-15 objects unique to this theme
      content/      groups, missions, curriculum, roster, copy, ballpark-specs
  src/main.js   the entry point: wires one theme to the engine, runs the loop
  index.html    the DOM the HUD and question modal write into
  vite.config.js  resolves @theme and @world from THEME=<name>
```

## What a theme must export

`themes/<name>/theme.js` is the single entry point the engine reads. Every key
below is read by the engine; nothing else in the file is.

```js
export default {
  id: 'hospital',                        // also the save slot: gamekit_<id>_v1
  title: 'Hospital Heroes',
  subtitle: 'Junior Doctor · Children’s Hospital',

  // The place, and which world builds it.
  //   { kind: 'outdoor', … }   engine/world/outdoorTown.js
  //   { kind: 'interior', plan }  engine/world/interiorFloor.js
  //   site.js may also declare `world: 'themes/<name>/world.js'` and build its own
  site,
  start: site.spawn,                     // where the player starts, and the yaw

  // Content. validateContent checks these agree with each other.
  content: { GROUPS, MISSIONS, CURRICULUM, BALLPARK_CALCS, JARGON,
             ROSTER, LEADERS, AVATARS, COPY },

  // People. spawn must be >= ROSTER.length or anyone past the limit never
  // appears, and a mission stop naming them is unreachable.
  people: { OUTFITS, roleToOutfit, spawn: ROSTER.length, extras: 22 },

  // What is inside each room the player walks into, keyed by group id, and how
  // those rooms are built: 'lab' | 'timber' | 'steel'. Written by the book.
  interiors: INTERIORS,
  interiorStyle: 'lab',

  // The title card, in the theme's own words. ONE paragraph, 70–180 words, and
  // required — `checkStory` fails a manifest without one, because two games
  // shipped an empty title screen. NEW_GAME.md § 5 has the four beats it holds.
  opening: ['…'],

  look: {
    fov: 66, near: 0.1, far: 900,        // far must clear the sky dome outdoors
    fog: { colour: 0xb9c4c8, near: 150, far: 460 },   // or { colour, density }
    exposure: 0.86,                      // below 1.0 outdoors
    playerRadius: 0.45,                  // 0.3 where the doorways are a metre
    lighting: { ambient: 0.08, sun: 3.0, hemi: 0.22, shadowExtent: 110 },
  },

  // Optional hooks. `decorate` is called by the outdoor world, the fit-out
  // hooks by the interior one; the unused ones are ignored.
  decorate, fitOutRoom, fitOutSpine,
};
```

The campaign is as long as `MISSIONS`. It used to be fixed at 15 — which is what
all four shipped games happen to have — so a theme with any other number counted
toward a day that did not exist and could never reach `won`.

## What the world module must provide

The engine only ever touches these. Any world — interior, outdoor, or something
new — satisfies this and nothing else:

| Export | Meaning |
| --- | --- |
| `initWorld(canvas, theme)` | build everything; return nothing |
| `scene`, `renderer` | the three.js objects |
| `colliders` | `Box3[]` — walls, counters, vehicles |
| `softColliders` | `{x,z,r}[]` — cylinders: carts, poles, chairs, trees |
| `interactables` | `{mesh, type, id, prompt, info?}[]` |
| `stopMeshes` | `Map<groupId, {…, pos, entry}>` — one per mission destination |
| `updateWorldFromState()` | push game state onto signage, lamps, waypoint |
| `getStopPosition(id)` | where the waypoint and travel cost aim |
| `getStopEntry(id)` | where the player stands after entering |
| `getWaypointMesh()`, `setWaypointPosition(x,z)` | the objective marker |
| `updateTimeOfDay()` | light level for the clock; may be a no-op |
| `groundHeight(x, z)` | **one** source of truth for floor height |

`groundHeight` is not optional even indoors, where it returns 0. Both existing
builds had a bug from having two answers to this question.

Four modules satisfy this: `engine/world/outdoorTown.js` (a town),
`engine/world/interiorFloor.js` (a floor), `engine/world/interiorTower.js` (four
floors stacked on one footprint, joined by a lift — Changeover) and
`themes/deepwatch/world.js` (a theme's own). `engine/world/interiorLevels.js` is
a fifth reached the same way, through a theme shim. **`interiorSite.js` does not** — it is the builder underneath
`interiorFloor`, exporting `buildInterior` and the light rig. `vite.config.js`
pointed `kind: 'interior'` straight at it for a year; nothing noticed, because
the two indoor games predate this engine. The first theme scaffolded as an
interior failed on `import`, before a frame was drawn.

## Interaction types the engine handles

`door` walk into a place · `case` start the science challenge ·
`exit` step back out · `board` open the dashboard · `info` read copy ·
`npc` talk to someone. A theme may add types by supplying handlers.

## The rules that cost real time to learn

These were each hit at least once in a shipped build. `engine/dev/audit.js`
checks all of them at runtime in dev mode.

1. **Budget the real lights.** A light per fixture is unaffordable: ~28 point
   lights took the hospital floor to 20 fps. Four point lights plus ambient,
   hemisphere, emissive panels and an IBL gives 118 fps and looks the same,
   because the light is diffuse anyway. Ceiling of 6 real lights.
   **A road lamp, a window, a warning strobe and a lit telescope shutter are all
   emissive geometry, never a light.** Project Y's road lighting was six
   `PointLight`s switching on at dusk, which put that scene at eight against this
   ceiling; the poles and bulbs are unchanged and the bulbs are emissive materials
   registered as light panels, which is how every other game here lights a night
   scene. Planetary Defense runs a whole nocturnal site — a second observatory two
   kilometres off, a town on the valley floor, headlights on the switchbacks — at
   three real lights.
2. **Never put text on a `DoubleSide` material.** It renders mirrored — and
   arrows point the wrong way — to anyone approaching from behind. Use one
   single-sided face per direction, with the content flipped for each.
3. **One source of truth for ground height.** If the visible mesh is graded or
   flattened, the height *function* must be too, or everyone standing on it
   sinks. Register pads before anything asks for a height.
   The corollary caught Project Y: its `props.js` and `npcs.js` placed objects from
   `env.terrainHeight` while the engine graded the visible terrain from
   `groundHeight`, the two agreeing to within half a metre. Two functions that
   nearly agree is still two sources of truth. `env.terrainHeight` is a door onto
   the engine's now.
4. **`site.water` needs a bed, or the water is invisible.** `buildWater` draws a
   plane at `water.level` and a bank beside it; it does not lower the ground. On a
   flat profile the terrain sat 0.76 m *above* Riverton's river and covered it
   completely — the river the site's own header calls the north edge of the city had
   never been seen, and the water was flagged `ignoreAudit` for being below the
   floor, which was the symptom being waved through. `setWaterBed()` in
   `outdoorSite.js` cuts the channel and feathers the bank, registered with the pads
   for the reason in rule 3. **Set `bed` and `shore` explicitly for anything small:**
   the defaults are tuned for a 420 m river, and the default 14 m shore feather on
   Ashley Pond — 14 m across — would dig a soft two-metre crater through the middle
   of Los Alamos, eight metres from the spawn.
5. **People need feet at y=0, jointed knees, separation and gated labels.**
   A single-capsule leg cannot sit — it sticks straight out of the chair.
   Sitting *lowers* the hips to seat height. Without separation the whole crowd
   converges into one clump. Nameplates show only when near *and* looked at.
6. **Never dim gameplay elements with opacity.** Transparent walls read as a
   bug, not a hint. Darken the colour instead.
7. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo
   renders near-white. Surfaces want `envMapIntensity` near 0.35–0.5 and an
   exposure below 1.0, *and* an albedo darker and more saturated than looks
   right written down. The first pass at a river city rendered as a salt flat.
8. **Placement helpers take `(x, z, y)` — ground last.** `kit.js` is uniform
   about this. One call written `(x, y, z)` put six display boards sixteen
   metres in the air, and only `audit.js` noticed.
9. **Keep the spawn point and the route clear.** A prop dropped over the spawn
   welds the player in place — the move is blocked, and both slide-along-axis
   fallbacks are blocked too, so the game renders perfectly and will not walk.
   Equipment parked against a wall runs *parallel* to it; rotating it 90° lays it
   across the corridor. Pass `spawn`, `colliders` and `route` to the audit.

## Question formats

`questionUI.js` renders `Protocol`, `Sequence`, `Ballpark`, `Science Tank`,
`DIAGNOSIS`, `TRIAGE`, `CASEBOOK` and `CHOICE`. Compare a format through
`kindOf()`, never as a raw string: the books spell them `Sequence`, `SEQUENCE`
and `Science Tank`, and a raw comparison left 72 lessons in a shipped game
rendering "challenge type SEQUENCE is not yet implemented".

`CHOICE` exists because importers guess. A plain multiple-choice activity gets
typed as the nearest format the importer knows, which is how one game ended up
with 36 "diagnoses" that had no instrument panel; `normalize.js` retypes them
and the book's own `rebuttals` appear in the verdict.

Any lesson may carry a `figure`, and every format renders one — Ballpark settles
a live readout onto a log scale, Sequence is a numbered rail, Protocol draws its
matches as lines that redraw as you choose. `DIAGNOSIS` hands the player an instrument panel and asks which explanation fits
*all* of it, so it carries `figure`, `readings` and candidate objects
(`{ label, mechanism }`). Figures come from `engine/core/figures.js` — three
primitives (`line`, `peaks`, `bars`) that a theme feeds with data and never
draws itself.

Two things that format gets wrong if left to taste, both now handled centrally:
colour is never the only channel (glyph + status word on every reading, direct
labels on every series, and a data table under every figure), and the candidate
order is shuffled at render — authored packs put the correct answer first, and a
player who spots that stops reading the panel.

## Content integrity

A generated lesson must carry the **scene** — the paragraph with the clues the
player reasons from. The hospital build shipped without it: `story` held the
learning objective and `takeaway` held the answer's reasoning, and the pre-question
panel rendered `takeaway`. The result asked "who needs you first?" while showing
no information about anyone *and* stating the answer.

Four invariants, now asserted by `engine/dev/validateContent.mjs` for every
theme (and by `tools/repair-hospital-content.mjs` for the hospital build):

- every lesson has a `scene` of real length
- `takeaway` never equals the `why` (that means the answer is in the intro)
- `choices.includes(correctChoice)` — grading is `choices.indexOf(correctChoice)`,
  so truncating option text to bare names makes a question ungradeable
- the pre-question panel shows the scene, the cast and where you are; never
  `takeaway` or `why`. It printed `takeaway` until the chemistry build, so the
  answer's lesson appeared above the question in both shipped games.

## Adding a theme

Full runbook in `NEW_GAME.md`. In short:

1. `npm run new-theme <name>` — or `-- --interior`. It scaffolds, imports a
   starter book and registers the theme, so what you get is a complete playable
   game before you have written anything. Do not `cp -r` the template by hand;
   the copy is only half of it.
2. `npm run check <name>` and `THEME=<name> npm run dev`, to confirm the
   baseline is green *before* you change it.
3. Write the game as one book file (`tools/BOOK_TEMPLATE.md`) and import it over
   the top with `--verify`.
4. Write the place as data — `site.js` for outdoor (buildings, paths, water,
   horizon, spawn) or `plan.js` for interior (a spine with rooms off it covers
   an airport concourse, a lab corridor and a ward alike).
5. Fix whatever `audit` reports before judging how it looks. Outdoors, pass
   `groundHeight` to it or every prop standing in a dip is reported.

## How a theme reaches the engine

`engine/core/*` imports its content under fixed names — `./curriculum.js`,
`./divisions.js`, `./missions.js`, `./leaders.js`, `./historicCharacters.js`,
`./world.js`. Each is a thin re-export that reads `@theme`, a Vite alias for
`themes/<name>/` set from `THEME=<name>`; `@world` is picked from the theme's
`site.kind`. The engine therefore never names a theme, and a theme never edits
the engine. Headless tools get the same aliases from `engine/dev/themeResolver.mjs`.

## Content that used to live in the engine

Each of these looked like engine code and was one game's content. They are
listed because the pattern will repeat: **grep for the previous game's nouns
before assuming a module is generic.**

| Was hardcoded | Now |
| --- | --- |
| `CHARACTER_DIVISION`, `PERSONS_BY_DIVISION` | derived from the theme's `ROSTER` |
| `SPECIAL_REQUESTS` (five funding vignettes) | `content.SPECIAL_REQUESTS`, optional |
| `KEY='hospitalHeroes_juniorDoctor_v1'` | `gamekit_<theme>_v1`; every theme shared one save slot |
| the mission-1 opening log line | `MISSION_DEFS[0].title` |
| `initPlayer`'s fov, near/far, floor at y=0, ±105 bounds | options from `theme.look` and `theme.site` |

## Two rules that only show up in play

- **A mission may keep all three stops in one area.** That is the normal shape
  when areas are fields of study rather than places. `missionStopIndex()`
  originally returned the *first* stop matching a group, so stops 2 and 3
  resolved back to stop 1 and reported "mission locked" — two thirds of a
  campaign unreachable, with every content file valid.
  `engine/dev/smokeCampaign.mjs` exists to catch exactly this and runs headless.
- **Every day has a person stop.** `normalize.js` picks one per day: the player
  must find a named person from that area instead of entering the room, so a
  theme needs `engine/people/crowd.js` wired and at least one roster entry per
  area — a roster entry with no `division` is invisible to this and nothing says
  so until somebody walks the whole map. It also turns a day's second visit to
  the same area into a person stop, and from day 3 appends a callback to an area
  taught earlier. A campaign whose every day visits every area gets no
  callbacks: there is nothing left to call back to.

## Migrating a world: what has to exist first

The *logic* of both shipped games now runs on this engine. Their **worlds** do
not, and the blocker is not plumbing — it is vocabulary.

`kit.building()` makes one thing: a flat-roofed panel box with a parapet, a
window band and a canopy. That is a modern industrial shed, and it is right for
a treatment plant. Los Alamos is gabled, board-and-batten sided, on a plinth,
with steps and lit windows, and `createBuilding` spends 213 lines saying so.
Pointing project-y at `outdoorTown` today would not "migrate" that town, it
would replace it with a business park.

So before either world can move, `kit.js` needs the vocabulary those buildings
are written in — roughly what project-y already has and this engine does not:

| project-y has | kit.js has |
| --- | --- |
| `addGableRoof` | flat roof + parapet only |
| `boardTexture` (board-and-batten) | flat colour |
| `stuccoTexture`, `woodTexture`, `tarPaperTexture` | none |
| `addPlinth`, `addSteps` | none |
| `registerWindow` (lit at night) | a glass band |

Do that first, as additions to `kit.js` that the chemistry game never has to
use, and *then* project-y's seven geometry builders become its `decorate` hook
and its town becomes ~150 lines of site data. Hospital additionally needs
`interiorFloor.js` to carry a whole ward — which now exists, so what is left
there is the plan data and the fit-out, not a missing module.

Verify a world migration by eye, not by assertion: fixed viewpoints screenshotted
before and after, plus `audit.js`. Every rule in this file is a graphics bug,
and none of them would fail a headless check.

## Where the world migration actually stands

- `kit.js` now has the period vocabulary: gable roofs, board-and-batten,
  stucco, wood, tar paper, plinths, steps, corner boards, framed lit windows.
  `building()` takes `roof`, `siding`, `base`, `stoop`, `corners` and
  `windows: 'band' | 'punched'`, so a period building is a data row.
- **project-y is across.** `site.js` describes all 19 buildings, Ashley Pond, the
  roads as `paths` and the status board; `src/world.js` is a 120-line adapter over
  `outdoorTown.js`, down from 1315; `worldParity` says "world is generated from the
  site data". The Los Alamos objects the engine has no opinion about — the Tech Area
  wire, the water tank, the duckboards, the jeeps, the Ponderosa forest — are in
  `themes/projecty/props.js`, still built by the code that already did them well.
- **The two things that made it safe, in order.** First, compare the heightfields
  before porting either: the engine's `mesa` profile against `env.js`'s hand-rolled
  one came out at 0.06 m mean difference over 841 points across the town, worst case
  0.5 m, and every one of those was a building pad where the old surface noise
  dipped a bench that should read level. Had that failed, the flip would have been a
  terrain port. Second, an **adapter** rather than a rewrite: `main.js` is
  deliberately forked and calls the old names, so `src/world.js` keeps all of them
  and maps them onto the contract above — one-argument `initWorld`, argument-less
  `updateWorldFromState`, `getBuildingPosition` onto `getStopPosition`,
  `updateDayNight` onto `updateTimeOfDay`. Nothing outside the world changed.
- What is still code rather than data in project-y: the pine forest, the ground
  scatter and the lamp positions. `src/env.js` went from 640 lines to 244 — the sky,
  terrain, roads and ridges it built are deleted, since a second answer to "where is
  the ground" is the one thing on this mesa that has already shipped broken. Careful
  reading the leftovers: `ROADS`, `onRoad`, `MESA_PLAYER_LIMIT`, `rimRadius` and
  `CANYON_DEPTH` have no importer and are all live, because `plantTrees` uses them.
- `engine/world/interiorBuilding.js` exists: it builds one room to walk into
  from a town, lazily, in a district at x ≈ 4000, in three styles — `lab`,
  `timber` (board walls and chalkboards, for a game set before screens) and
  `steel`. Entering swaps the player's ground function and bounds.
- `engine/world/interiorFloor.js` exists: a whole floor, satisfying the contract
  over `interiorSite.js`'s builder.

## Known work still to do

- `questionUI.js` carries the question-type renderers. Those are partly
  theme-specific (a hospital TRIAGE screen is not a Los Alamos one) and should
  become pluggable renderers registered by the theme.
- `engine/core/*` still uses the original vocabulary in places — `divisions`,
  `budget`, `Director funds`, `historicCharacters`. Renaming is mechanical but
  touches every file, so it is deliberately not done yet.
- **The hospital's world is the last fork.** It still builds its place by hand
  though it declares a site as data. `interiorFloor.js` exists, so what is left is
  the plan data, the fit-out, and the same two steps project-y went through: compare
  the floor-height functions first, then adapt rather than rewrite, because the
  hospital's `main.js` is forked for the same reason project-y's was.
- `engine/core/*` still uses one game's vocabulary in places — `divisions`,
  `budget`, `Director funds`, `historicCharacters`.
