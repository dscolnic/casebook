# Runbook: a new game from a new design document

## Two ways in

**Writing a new game from scratch — write a book file.** One file describes the
whole game, `tools/BOOK_TEMPLATE.md` is the format with a worked example of
every question format, and the importer checks it rather than guessing:

```sh
node tools/import-book.mjs my-game.yml <theme> --dry      # parse and report, write nothing
node tools/import-book.mjs my-game.yml <theme> --verify   # write, then run every check
```

It refuses to write a book that would produce an unplayable game: an unknown
format, a mapping that is not a permutation, a roster entry with no division, a
ballpark stop with no estimate block, an answer that is not among the options.

**Bringing an existing Word design book** — the two docx importers below. They
have to infer things the format above states, and every inference has cost us a
defect: use them for a book that already exists, not for a book you are about
to write.

## What to say

Paste this, filling in the two blanks. Nothing else is needed.

> New game from `<path/to/book.docx>`.
> Setting: `<place — e.g. a river city, an airport, a NASA centre>`, `<indoor or outdoor>`.
> Propose the mission→area mapping from the book's curriculum table and show me
> before committing.

## Why those two things

Everything else comes out of the document. These do not:

- **The setting** — the docx describes the science and the missions, never the
  place. It cannot know whether rooms open off a corridor or buildings off a
  street.
- **Indoor or outdoor** — picks the world module. Airport, lab and visitor
  centre are interior; a city, campus, zoo or field station is outdoor.

The **areas of study** used to be a third blank. In practice both books so far
have had internally coherent missions — all three of a mission's stops serve one
field — so the mapping can be proposed from the curriculum table and confirmed
in one exchange. Propose it; do not silently pick it.

## The steps

1. **Find out which shape the book is.** There are two, and each has its own
   parser. Run both with `--dry`; the right one reports missions and activities.

   ```sh
   node tools/import-missionbook.mjs <book>.docx <theme> --dry   # MISSION n / Activity n.m
   node tools/import-designbook.mjs  <book>.docx <theme> --dry   # SHIFT n • CASE m
   ```

   A book that fits neither needs a third parser. Copy
   `tools/parse-missionbook.mjs` — it is the cleaner of the two, and its header
   documents the exact structure it reads.

2. **Write the mission→area map**, e.g. `tools/contamcity-map.json`:

   ```json
   { "1": "IDENT", "2": "GASES", "3": "WATER", "…": "…" }
   ```

   `tools/contamcity-map.json` and `tools/hospital-shift-map.json` are worked
   examples. The mission-book importer **refuses to write** without one.

3. **Scaffold and import.**

   ```sh
   cp -r themes/_template themes/<theme>
   node tools/import-missionbook.mjs <book>.docx <theme> --map tools/<theme>-map.json
   ```

   Writes `content/missions.js`, `content/curriculum.js` and
   `content/import-report.json`. Read the report — it lists everything that
   could not be placed, and it flags real defects in the *book* (one activity in
   the chemistry book offers the same answer text as two different options).

4. **Hand-write the things a book cannot supply.**
   - `content/groups.js` — the areas: names, colours, milestones, issue pools.
   - `content/roster.js` — the cast. The books name *functions* (local expert,
     skeptical reviewer, operations lead, affected stakeholder), not people.
   - `content/ballpark-specs.js` — numeric specs for estimate activities. A
     prose relationship ("two moles A per mole B") carries no arithmetic, so
     these are written by hand and checked against the book's own solution line.
   - `content/diagnosis-packs.js` — *optional*. Re-authors chosen activities as
     Diagnosis: an instrument panel plus candidate explanations, where the task
     is to rule explanations out rather than pair them up. Keyed by activity id;
     the pack replaces that activity's game and the rest still comes from the
     book. Neither book defines this format, so a conversion is a design choice —
     pick activities whose science genuinely is differential reasoning from
     instruments, and leave Science Tank alone (it teaches portfolio reasoning,
     which the conversion would destroy).

     A pack needs a `figure` (`line`, `peaks` or `bars` — see
     `engine/core/figures.js`), `readings` including quiet ones, and at least
     four candidates with one benign dismissal. The validator enforces all of
     that, because a panel of nothing but alarms has nothing to rule out.

5. **Make the ids agree in three places** — `content/groups.js`, the `group:`
   fields in `site.js` (or `plan.js`), and the map from step 2. This is the most
   common mistake; the validator catches every instance.

6. **Describe the place** in `site.js` (outdoor) or `plan.js` (interior), and put
   the setting's distinctive objects in `props.js`. Generic furniture —
   buildings, benches, bins, bollards, signs, fences, tanks, pipe runs, vehicles,
   display boards — comes from `engine/world/kit.js`. Do not rewrite it.

7. **Validate until quiet. Both of them.**

   ```sh
   node engine/dev/validateContent.mjs <theme>   # content agrees with itself
   node engine/dev/smokeCampaign.mjs  <theme>    # every stop is actually reachable
   ```

   They catch different classes of bug. The first new theme on this engine had
   perfectly valid content and two thirds of its campaign unreachable, because
   the engine resolved a mission's second stop back to its first. Only
   `smokeCampaign` sees that.

8. **Boot it, then audit before judging.**

   ```sh
   THEME=<theme> npm run dev
   ```

   In the browser console:

   ```js
   const { reportAudit } = await import('/engine/dev/audit.js');
   reportAudit(gamekit.scene, gamekit.renderer, {
     spawn: gamekit.theme.start,
     colliders: gamekit.world.colliders,
     groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
   });
   ```

   Fix what it prints. On the chemistry build it found six display boards
   floating sixteen metres in the air, from one transposed argument.

## How a theme is wired to the engine

Worth knowing before debugging an import error.

`engine/core/*` imports its content under fixed names — `./curriculum.js`,
`./divisions.js`, `./missions.js`, `./leaders.js`, `./historicCharacters.js`,
`./world.js`. Those files are thin re-exports that all read `@theme`, a Vite
alias pointing at `themes/<name>/`, set from `THEME=<name>`. `@world` is chosen
from the theme's `site.kind`. So:

- the engine never names a theme, and a theme never edits the engine;
- adding a genuinely new *kind* of place means one new line in `vite.config.js`;
- headless tools get the same aliases from `engine/dev/themeResolver.mjs`.

## What the importer gets from a mission-shaped book

All 15 missions and 45 activities, with the format taken from each activity's
own `SELECTED FORMAT` line rather than inferred: Protocol (situations →
interpretations), Sequence (four ordered cards), Science Tank (allocate 100
credits) and Ballpark (estimate with units). Plus scene text, the play
instruction, the complete solution, why it works, per-option rebuttals, the
teaching takeaway, implementation notes, and the glossary as clickable terms.

One structural trap, which bit four times before it was understood: **callout
boxes run their label straight into their body inside a single table cell** —
`"What is at stakeA wrong identity can cause…"`. Parse them with a regex that
strips the known label, never by taking the next block.

## Expect on a new theme

Much less than the first one did. `engine/world/kit.js` (generic props),
`engine/world/outdoorTown.js` (an outdoor site that satisfies the world
contract) and `engine/people/crowd.js` (the cast, nameplates and the person
stops) all exist now and are theme-agnostic.

What is still likely:

- `engine/world/interiorBuilding.js` does not exist yet. An interior theme needs
  it written against the same contract `outdoorTown.js` satisfies —
  `interiorSite.js` has the parts but not the exports.
- Every third mission stop is a **person stop**: the player must find a named
  person from that area rather than enter the building. A theme with no roster
  entry for an area makes a third of its campaign unreachable. `smokeCampaign`
  checks this.

---

# Runbook: changing something in all three games

Most changes now land once, in `gamekit/engine/`, and all three games get them.
The exceptions are the files the migration deliberately left per-game.

## Shared — edit once

`engine/core/*` (gameState, simulation, questionUI, dashboard, save, constants,
time, utils, terminology, interactions, player, personQuiz, map, figures),
`engine/world/*`, `engine/people/*`.

After editing, build all three. They import the engine across a package
boundary, so a mistake shows up as a build failure in the other two rather than
in the one you were working on:

```sh
cd gamekit && THEME=contamcity npx vite build
cd ../project-y-fps && npx vite build
cd ../Hospital/hospital-fps && npx vite build
```

## Per game — edit three times, or it ships in one

| File | Why it is not shared |
| --- | --- |
| `src/main.js` | the wiring: which key does what, which panel opens |
| `index.html` | each game's own DOM and styling |
| `world.js`, props, `plan.js`/`site.js` | the place |
| `curriculum, missions, divisions, leaders, historicCharacters` | the content |

**A feature added to one `main.js` reaches one game.** The passage quiz shipped
working in the chemistry game and invisible in the other two because of exactly
this. If a change adds an interaction, a panel or a key binding, grep all three
`main.js` files before calling it done.

## Adding a question format

1. Renderer and binder in `engine/core/questionUI.js`, dispatched on `ch.type`.
2. Teach `validateContent.mjs` and `smokeCampaign.mjs` what "gradeable" means
   for it, or a broken one passes both checks.
3. If it draws anything, use `engine/core/figures.js` — three SVG primitives
   (line, peaks, bars) that take data, never geometry.
4. Shuffle the choices at render. Authored packs put the correct answer first;
   a player who notices stops reading.

## Adding a person-facing feature

The roster shape is `{ id, name, role, division, color, bio }`. `division` ties
someone to an area and is what makes them a valid person stop.
`engine/core/personQuiz.js` is the worked example of generating content from
bios rather than authoring per person — it scales to all three casts and cannot
drift out of sync with the text.
