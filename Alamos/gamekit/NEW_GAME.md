# Runbook: a new game

Four games are on this engine. The fifth costs one command plus one book file
and the place it happens in; everything else is shared. This is the order to do
it in, and what each step actually costs.

## Start here

```sh
cd gamekit
npm run new-theme <name>                 # a town
npm run new-theme <name> -- --interior   # a floor: a spine with rooms off it
```

That copies `themes/_template`, imports its starter book, and registers the
theme. What comes out is a **complete, playable, green game**: four areas, four
days, one worked example of every question format, a walkable place, a cast with
bios. Confirm it before you change anything —

```sh
npm run check <name>          # validate + smoke + styles + world parity
THEME=<name> npm run dev
```

— because from here on, when a check goes red, the thing you just wrote is what
broke it. That baseline is the whole point of scaffolding.

## Then write the book

A game is one YAML file. `tools/BOOK_TEMPLATE.md` is the format with a worked
example of every question format, and `themes/<name>/book.yml` is the copy the
scaffold left you.

```sh
cp themes/<name>/book.yml books/<name>.yml
# write it
node tools/import-book.mjs books/<name>.yml <name> --dry      # parse and report
node tools/import-book.mjs books/<name>.yml <name> --verify   # write, then check
```

The importer refuses to write a game that would be unplayable: an unknown
format, a mapping that is not a permutation, a roster entry with no `division`,
a ballpark stop with no estimate block, an answer that is not among the options.

The book carries the areas, the cast and their bios, every mission and stop, the
estimate specs, the glossary, what is inside each room, and what each place
says. **Missions do not have to number 15** — the campaign is as long as the
book, and the HUD and the win condition follow it.

## What the book cannot supply

These are the hours. Nothing else is.

| File | What it is |
| --- | --- |
| `site.js` or `plan.js` | the place, as data. Every group needs a building or a room, or that call is unreachable — `worldParity` is what catches it |
| `props.js` | the ten or so objects that make this place recognisable. Everything generic is in `engine/world/kit.js`; do not rewrite it |
| `outfits.js` | what people wear |
| `theme.js` | title, subtitle, the opening paragraphs, the look, `interiorStyle` |

## Bringing an existing Word design book

Two games arrived as `.docx` and each needed its own parser. Use these for a
book that already exists, not for one you are about to write — everything a
parser has to *infer* has cost a defect (63 lessons typed as the nearest format
the importer knew; nine diagnosis packs referenced and never imported).

```sh
node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m
node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m
```

Run both with `--dry`; the one that reports missions is right. Re-run it with
`--map tools/<theme>-map.json --verify`, where the map is mission → area:
`{ "1": "IDENT", "2": "GASES", … }`. `tools/contamcity-map.json` and
`tools/hospital-shift-map.json` are worked examples.

One structural trap that bit four times before it was understood: **callout
boxes run their label straight into their body inside a single table cell** —
`"What is at stakeA wrong identity can cause…"`. Parse them with a regex that
strips the known label, never by taking the next block.

## Describing the place

The scaffold leaves a small worked example of whichever kind you asked for.

- **Outdoor** — `site.js`: terrain, atmosphere, paths, buildings, furniture,
  horizon, spawn. `engine/world/outdoorTown.js` builds it.
- **Interior** — `plan.js`: a spine with rooms down both sides, which covers an
  airport concourse, a lab corridor, a ward and a visitor centre alike.
  `engine/world/interiorFloor.js` builds it.
- **Neither** — a theme whose place already exists brings its own world:
  declare `world: 'themes/<name>/world.js'` in `site.js` and satisfy
  THEME_CONTRACT.md § "What the world module must provide". Deep Watch does
  this, because rebuilding its submarine as generated rooms would have thrown
  away the thing worth converting. `themes/deepwatch/world.js` is the worked
  example of the adapter.

Three things about the outdoor look that are easy to get wrong and produce no
error at all: `far` has to reach past the horizon ranks and the sky dome (an
interior's 160 clips the dome away and the sky renders **black in daylight**),
`exposure` belongs below 1.0, and an outdoor albedo must be written darker than
looks right — see THEME_CONTRACT.md rule 6.

## Then check, and then look

```sh
npm run check <name>
```

Behind it: `validateContent` (content agrees with itself and with the contract),
`smokeCampaign` (the engine can reach and grade every stop), `checkStyles` (no
game sheet re-declares the engine's), `worldParity` (every group has somewhere
to happen). They catch different things — the first theme on this engine had
perfectly valid content and two thirds of its campaign unreachable, and only
`smokeCampaign` could see it.

Then boot it and run the audit before judging anything visual:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

**A background tab gets no `requestAnimationFrame`.** The scene renders dark,
the sun never moves, nothing animates and every interaction looks broken whether
it is or not. Check `document.visibilityState` before concluding anything — and
`window.<theme>` exposes the running modules so a throttled tab can be stepped
by hand.

## What a day is

Worth knowing before you write missions, because the engine reshapes what you
write. All of it happens in `engine/content/normalize.js` at load, for every
theme, so a re-import cannot lose it.

- A mission is **one working day** with a countdown. The budget is computed from
  the route through the day's stops, so a spread-out day gets more hours and
  moving a building changes it. Nothing is charged; time is spent in real time,
  at a quarter rate while a panel is open.
- **Nobody walks into the same area twice in a day.** A repeat becomes a person
  stop. Write the day into three different areas and this never fires.
- **Each day has exactly one person stop**, unless a repeat forces a second.
- **From day 3 every day carries a callback** to an area taught earlier, oldest
  first — the spaced retrieval that blocked practice does not give you. It
  prefers a `— Review` variant of the lesson if the theme has one. This is why a
  book with three areas gets no callbacks: with every area visited every day
  there is nothing to call back to.

## How a theme reaches the engine

`engine/core/*` imports its content under fixed names — `./curriculum.js`,
`./divisions.js`, `./missions.js`, `./leaders.js`, `./historicCharacters.js`,
`./world.js`. Those are thin re-exports that read `@theme`, a Vite alias for
`themes/<name>/` set from `THEME=<name>`; `@world` comes from the theme's
`site.kind`, or from its own `world:` if it declares one. So the engine never
names a theme, a theme never edits the engine, and headless tools get the same
aliases from `engine/dev/themeResolver.mjs`.

A theme served from `gamekit/` needs **no entry point of its own**:
`gamekit/src/main.js` names nothing game-specific and runs both themes here
already. The three forked `main.js` files belong to the games that predate this.

---

# Runbook: changing something in every game

## Shared — edit once

`engine/core/*`, `engine/world/*`, `engine/people/*`. After editing, build all
of them; they import the engine across a package boundary, so a mistake shows up
as a build failure in a game you were not working on:

```sh
cd gamekit && THEME=contamcity npx vite build && THEME=deepwatch npx vite build
cd ../project-y-fps && npx vite build
cd ../Hospital/hospital-fps && npx vite build
```

## Per game — the surviving forks

| File | Which games | Why |
| --- | --- | --- |
| `src/main.js` | project-y, hospital (and `gamekit/src/main.js` for every theme here) | the wiring: which key does what, which panel opens |
| `index.html` | the same three | each game's own DOM |
| `world.js`, props, `plan.js`/`site.js` | project-y, hospital | the place, still hand-built in those two |
| content | all | the game |

**A feature added to one `main.js` reaches one game.** The passage quiz shipped
working in one game of three because of exactly this. If a change adds an
interaction, a panel or a key binding, grep every `main.js` before calling it
done. Two traps live in those files specifically: the frame loop starts during
module evaluation, so `const day` and `const driving` must be declared *above*
it or every frame throws `Cannot access 'day' before initialization`.

## Adding a question format

1. Renderer and binder in `engine/core/questionUI.js`, dispatched through
   `kindOf()` — never a raw string comparison. The books spell them `Sequence`,
   `SEQUENCE` and `Science Tank`, and comparing raw strings left 72 lessons
   rendering "not yet implemented" in a shipped game.
2. Teach `validateContent.mjs` and `smokeCampaign.mjs` what "gradeable" means
   for it, or a broken one passes both checks.
3. If it draws anything, use `engine/core/figures.js` — primitives that take
   data, never geometry.
4. Teach `tools/import-book.mjs` the format's fields, so a book can carry it.
5. Shuffle the choices at render. Authored packs put the correct answer first; a
   player who notices stops reading.

## Adding a person-facing feature

The roster shape is `{ id, name, role, division, color, bio, quiz? }`.
`division` ties someone to an area and is what makes them a valid person stop.
`engine/core/personQuiz.js` is the worked example of generating content from
bios rather than authoring per person — it prefers an authored `quiz` and falls
back to lifting a sentence, so it scales to every cast and cannot drift out of
sync with the text.
