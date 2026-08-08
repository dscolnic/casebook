# Theme contract

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

`themes/<name>/theme.js` is the single entry point the engine reads.

```js
export default {
  id: 'hospital',
  title: 'Hospital Heroes',
  subtitle: 'Junior Doctor · Children’s Hospital',

  // Which world builder to use, and its data.
  site: { kind: 'interior', plan },      // or { kind: 'outdoor', terrain }

  // Content. validateContent checks these agree with each other.
  content: { GROUPS, MISSIONS, CURRICULUM, ROSTER, COPY },

  // People.
  people: { OUTFITS, roleToOutfit, extras: 22 },

  // Look and feel.
  look: {
    fov: 66, near: 0.08, far: 160,
    fog: { colour: 0xdfe4e6, near: 26, far: 96 },
    exposure: 1.0,
    lighting: 'interiorFluorescent',      // preset name from engine/world
  },

  // Optional theme hooks, all called with (scene, ctx).
  fitOutRoom, fitOutCorridor, decorate,
};
```

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
2. **Never put text on a `DoubleSide` material.** It renders mirrored — and
   arrows point the wrong way — to anyone approaching from behind. Use one
   single-sided face per direction, with the content flipped for each.
3. **One source of truth for ground height.** If the visible mesh is graded or
   flattened, the height *function* must be too, or everyone standing on it
   sinks. Register pads before anything asks for a height.
4. **People need feet at y=0, jointed knees, separation and gated labels.**
   A single-capsule leg cannot sit — it sticks straight out of the chair.
   Sitting *lowers* the hips to seat height. Without separation the whole crowd
   converges into one clump. Nameplates show only when near *and* looked at.
5. **Never dim gameplay elements with opacity.** Transparent walls read as a
   bug, not a hint. Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo
   renders near-white. Surfaces want `envMapIntensity` near 0.35–0.5 and an
   exposure below 1.0, *and* an albedo darker and more saturated than looks
   right written down. The first pass at a river city rendered as a salt flat.
7. **Placement helpers take `(x, z, y)` — ground last.** `kit.js` is uniform
   about this. One call written `(x, y, z)` put six display boards sixteen
   metres in the air, and only `audit.js` noticed.
8. **Keep the spawn point and the route clear.** A prop dropped over the spawn
   welds the player in place — the move is blocked, and both slide-along-axis
   fallbacks are blocked too, so the game renders perfectly and will not walk.
   Equipment parked against a wall runs *parallel* to it; rotating it 90° lays it
   across the corridor. Pass `spawn`, `colliders` and `route` to the audit.

## Question formats

`questionUI.js` renders `Protocol`, `Sequence`, `Ballpark`, `Science Tank`,
`DIAGNOSIS`, `TRIAGE` and `CASEBOOK`. `DIAGNOSIS` is the only one that draws a
figure: it hands the player an instrument panel and asks which explanation fits
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

1. `cp -r themes/_template themes/<name>`
2. Write the place as data — `site.js` for outdoor (buildings, paths, water,
   horizon, spawn) or `plan.js` for interior (a spine with rooms off it covers
   an airport concourse, a lab corridor and a ward alike).
3. Run the importer on the design document, then
   `node engine/dev/validateContent.mjs <name>` and
   `node engine/dev/smokeCampaign.mjs <name>` until both are quiet. Run both:
   the first checks the content against itself, the second checks the engine can
   actually reach every stop.
4. `THEME=<name> npm run dev`
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
- **Every third stop is a person stop.** The player must find a named person
  from that area instead of entering the building, so a theme needs
  `engine/people/crowd.js` wired and at least one roster entry per area, or a
  third of the campaign has nobody to talk to.

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
`interiorBuilding.js`, which does not exist at all.

Verify a world migration by eye, not by assertion: fixed viewpoints screenshotted
before and after, plus `audit.js`. Every rule in this file is a graphics bug,
and none of them would fail a headless check.

## Known work still to do

- `engine/world/interiorBuilding.js` does not exist. `interiorSite.js` has the
  parts but not the contract exports, so an interior theme on this engine needs
  it written first — `outdoorTown.js` is the worked example of the shape.
- `questionUI.js` carries the question-type renderers. Those are partly
  theme-specific (a hospital TRIAGE screen is not a Los Alamos one) and should
  become pluggable renderers registered by the theme.
- `engine/core/*` still uses the original vocabulary in places — `divisions`,
  `budget`, `Director funds`, `historicCharacters`. Renaming is mechanical but
  touches every file, so it is deliberately not done yet.
- The crowd stands still. `rig.js` has `stepGait`; giving people routes is the
  next obvious improvement.
- The two shipped games still have their own forked copies of the core. They
  keep working; migrate them when convenient, newest first.
