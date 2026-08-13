# How to build one of these games

Seven games are on this engine. The eighth costs one command, one book file, the
place it happens in — and the writing, which is where all the time actually
goes. This file is the order to do it in and the bar each step has to clear.
Every rule here is one somebody broke first.

**Read this first; read the four references when the step needs them.**

| Reference | What it owns |
| --- | --- |
| `tools/BOOK_TEMPLATE.md` | the book format, with a worked example of every question format |
| `STORY_SPEC.md` | the campaign as a story: one argument with two sides, a cast, a timeline |
| `THEME_CONTRACT.md` | what a theme exports, what a world module must provide, the graphics rules |
| `../CLAUDE.md` | the inventory of the seven games and the house rules across all of them |

## The build, in order

| # | Phase | Command | What proves it |
| --- | --- | --- | --- |
| 1 | Decide the course | — | you can name the areas, the arc and the audience |
| 2 | Scaffold | `npm run new-theme <name>` | `npm run check <name>` is green before you write anything |
| 3 | Write the book | `node tools/import-book.mjs books/<name>.yml <name> --verify` | importer writes it and the checks stay green |
| 4 | Build the place | edit `site.js` / `plan.js` / `props.js` | `worldParity`, then a screenshot |
| 5 | Meet the writing bar | — | `checkStory`, `checkNames` |
| 6 | Meet the question bar | — | `probeQuestions` (four probes) |
| 7 | Check, look, print | `npm run check <name>`, `node tools/make-book.mjs <name>` | green, walkable, and a book you can read |

## 1. Decide the course before you decide the game

The game is a delivery mechanism for a syllabus. Write these down first:

- **The subject and the audience.** `audience: { grade }` in the manifest is a
  gate, not a label: `engine/core/typography.js` scales the type from it and
  `validateContent` fails a passage two grades over it. Hospital Heroes is 2,
  the college games are 12–14.
- **Six areas of study.** They become the groups — the columns of the whole
  game. No design document contains them; they are a design decision and
  everything else hangs off them. Six is what the shipped games use; four works.
- **Fifteen days, as an arc.** A campaign is one argument with two sides, and
  both sides have to be right on some day — see STORY_SPEC.md § 1. Missions do
  not have to number 15; the HUD and the win condition follow the book.
- **Thirty concepts the course must cover.** Add them to `tools/syllabus.js`.
  The printed book then reports which of your questions teach each one, and which
  concepts nothing teaches. The gaps are the useful output — write it before the
  questions and the book tells you what to write next.

## 2. Scaffold, and confirm the baseline

```sh
cd gamekit
npm run new-theme <name>                 # a town
npm run new-theme <name> -- --interior   # a floor: a spine with rooms off it
```

That copies `themes/_template`, imports its starter book, and registers the
theme in `themes.json`. What comes out is a **complete, playable, green game**:
four areas, four days, one worked example of every question format, a walkable
place, a cast with bios. Confirm it before changing anything —

```sh
npm run check <name>
THEME=<name> npm run dev
```

— because from here on, when a check goes red, the thing you just wrote is what
broke it. That baseline is the whole point of scaffolding.

## 3. Write the book

A game is one YAML file. `tools/BOOK_TEMPLATE.md` is the format;
`themes/<name>/book.yml` is the copy the scaffold left you.

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
estimate specs, the glossary, what is inside each room, and what each place says.

**Write the book, not the content files.** `themes/<name>/content/*.js` is
generated; a hand edit there is lost on the next import — and now fails a check
the same day, because `engine/dev/bookParity.mjs` re-imports every book into a
scratch directory and compares it against the content the game ships. All seven
games are books. The two that arrived as Word documents and the one that predates
the engine were converted with `tools/export-book.mjs`, which is the inverse of
the importer:

```sh
node tools/export-book.mjs <name>                      # content -> book
node engine/dev/bookParity.mjs <name>                  # do they still agree?
```

### What a day is, before you write fifteen of them

The engine reshapes what you write, at load, in
`engine/content/normalize.js`, for every theme — so a re-import cannot lose it.

- A mission is **one working day** with a countdown. The budget comes from the
  route through the day's stops, so a spread-out day gets more hours and moving a
  building changes it. Nothing is charged; time runs in real time, at a quarter
  rate while a panel is open.
- **Nobody walks into the same area twice in a day.** A repeat becomes a person
  stop. Write each day into three different areas and this never fires.
- **Each day has exactly one person stop**, unless a repeat forces a second.
- **From day 3 every day carries a callback** to an area taught earlier, oldest
  first — the spaced retrieval blocked practice does not give you. It prefers a
  `— Review` variant of the lesson where one exists. A book with only three
  areas gets no callbacks: everything is visited every day, so there is nothing
  to call back to.
- A wrong call costs money and only money: $5 to answer again, $10 to move on.
  Each morning pays a stipend, so nobody is ever trapped.

## 4. Build the place

The scaffold leaves a worked example of whichever kind you asked for.

- **Outdoor** — `site.js`: terrain, atmosphere, paths, buildings, furniture,
  horizon, spawn. `engine/world/outdoorTown.js` (or `outdoorSite.js`) builds it.
- **Interior** — `plan.js`: a spine with rooms down both sides, which covers an
  airport concourse, a lab corridor, a ward and a visitor centre alike.
  `engine/world/interiorFloor.js` builds it.
- **Neither** — a theme whose place already exists brings its own world: declare
  `world: 'themes/<name>/world.js'` in `site.js` and satisfy THEME_CONTRACT.md
  § "What the world module must provide". Deep Watch and Bring Them Home do this.

**A game's silhouette comes from its world module.** Two themes on the same
world look like each other however the palette differs. If the place is the
point, either bring a world or carry a props layer heavy enough to change the
shape of the space.

Three visual traps that produce no error at all: `look.far` must reach past the
horizon ranks and the sky dome (an interior's 160 clips the dome and the sky
renders **black in daylight**), `exposure` belongs below 1.0, and an outdoor
albedo has to be written darker than looks right. Budget six real lights and do
the rest with emissive materials. `kit.js` placers take `(x, z, y)` — ground
last. THEME_CONTRACT.md has the full list, and every line of it cost hours.

**Interiors should not be the same room seven times.** `interiorBuilding.js`
picks a layout from the place's name and seed — control room, bay, office,
workshop, archive — mirrors it, and moves the case stand accordingly. A theme
that adds rooms should give them names that mean something, because the name is
what selects the layout.

## 5. The writing bar

`checkStory.mjs` and `checkNames.mjs` enforce most of this. The parts they
cannot see are the parts to read out loud.

**The day card** — what the player reads before the countdown starts, in this
order, composed by `createDay()` in `engine/core/app.js`:

1. **What yesterday left behind**, one line, written by the engine from the
   stored results. Nothing to author.
2. **The stake**: 95–115 words (70–85 for a primary audience). It says what has
   happened, who is arguing about what, what you decide today — "Today you …" /
   "This shift you …", which is a checked clause — and what it costs to be
   wrong. A time marker belongs in the first two sentences. Somebody from the
   roster belongs in it. **It must not answer the day's own questions**, and it
   must not teach: that was the single most expensive content mistake in this
   repo, a hundred and fifty words of mechanism read minutes before the question
   it gives away.
3. **The calls**: "Go to the Guidance Computer Room", "Talk to Dr. Evelyn
   Carter". The instruction and nothing else — not the question, not a column
   saying whether it is a person or a place.
4. **The primer**, two to four lines: the terms, formulas and assumptions the
   day's questions are entitled to expect. It is *derived* in `normalize.js`
   from the day's own lessons — glossary hits, each estimate's `relationship`,
   each stop's `assumes` — so it cannot drift when a stop moves. Write
   `primer:` on the mission only to beat the derived version. Never the
   takeaway: that is what the day teaches.
5. **The map**, last, because it is what the route is chosen from.

**Every stop.** The scene is the situation, 30–45 words. The verdict `why` is
the mechanism, 70–90 words (about 50 at primary). A rebuttal per wrong option,
saying why *that* one fails. `takeaway` never equals `why`. Teaching-to-scene
ratio across the seven games is 2.7–3.4; it was 0.22–0.52 when the mechanism
sat in the scene.

**`assumes:` on every lesson** — the prior knowledge this question is entitled
to expect, one line. It is checked against the glossary and the stops before it,
it feeds the primer, and writing it down is what stops a question quietly
requiring a degree.

**The campaign ends.** `ending: [...]` in the manifest, the paragraphs that say
what happened and whether it worked. Fifteen missions used to end with
"Campaign complete" in the HUD corner.

**The arc has a shape, and the ending has to be earned.** STORY_SPEC.md § 10 is
the part no checker can see: which day carries the reversal, which day is quiet,
which day cashes a decision the player made on day 3, why a twist is evidence
rather than an event, and the three rules an ending obeys — say what happened,
name what it cost and what is unfinished, and take it from the player's own work.
Read it before writing day 2.

**Names.** Nobody is named before they are introduced with a role or a title —
"the integration lead, Evelyn Carter", then "Carter" for the rest of the
campaign. `checkNames` fails a first mention that does not.

**Copy rules that hold everywhere.** The opening card is one paragraph of
situation: no mechanics, no controls, no scope disclaimer. The verdict says
`Correct` / `Incorrect` first. Never write what the player or a measurement does
*not* do — no "you do not touch the vehicle", no "this does not constrain
distance". Say what it is for; put the contrast in the rebuttal if it earns its
place.

## 6. The question bar

Four probes, all deterministic, all in `engine/dev/probeQuestions.mjs`, all
gating. Each exists because a shipped question failed it.

| Probe | What it catches |
| --- | --- |
| LEAK | the answer is pickable from the options alone — two distractors using absolutes, a keyed answer twice the length of the others, only the right one carrying a "because" |
| GIVEAWAY | the scene already states the reasoning, or contains the keyed answer nearly verbatim |
| ORDER | an ordering item solvable from the wording: the keyed order is the printed order, both endpoints pinned by "first"/"submit", or a card pointing at another card's output |
| ECHO | a matching answer that restates its own prompt — two or more of the prompt's content words, and at least half of them, reappearing in the keyed option |

`--advisory` prints findings without failing, for when you want the list.

**A matching question names its two columns.** `columns: [left, right]` on the
stop. The shape that teaches is goal → method: what you want to measure on the
left, how you measure it — with the mechanism in it — on the right. "Line-of-sight
velocity" against "Compare the frequency that comes back with the frequency
that was sent; the fractional change equals the speed as a fraction of the speed
of light." Where the item really is an inference, say so honestly instead:
"What you observe" / "What it means", "The term" / "What it stands for".

**The printed order is never the answer.** `normalize.js` permutes the cards of
every SEQUENCE and the choices of every PROTOCOL at load, seeded on the lesson,
and rewrites `order` / `mapping` so the keyed answer is provably unchanged. 214
questions had shipped with the answer being the order they were written in.

**A multiple-choice question has to be answerable.** Enough information in the
scene and the options to reason from, and the reasoning in the answer choices
where that is what teaches. Shuffle at render — authored packs put the correct
answer first.

**An estimate carries its `relationship` on the challenge**, not inside the
estimate block, and offers distractor tiles. Both were real defects.

## 7. Check, look, print

```sh
npm run check <name>      # one game        npm run check      # all of them
```

Behind it, per theme: `validateContent` (content agrees with itself and the
contract), `smokeCampaign` (the engine can reach and grade every stop),
`probeQuestions` (the four probes), `personStops` (every mission person opens
their question), `checkStory` (the campaign is a story and the cards brief),
`checkNames`, `bookParity` (the book still regenerates the game); then once for
the repo: `checkStyles`, `worldParity`.

They catch different things. The first theme on this engine had perfectly valid
content and two thirds of its campaign unreachable, and only `smokeCampaign`
could see it.

Then boot it and audit before judging anything visual:

```js
const { reportAudit } = await import('/engine/dev/audit.js');
reportAudit(gamekit.scene, gamekit.renderer, {
  spawn: gamekit.theme.start,
  colliders: gamekit.world.colliders,
  groundHeight: gamekit.world.groundHeight,   // outdoor: or every prop in a dip is reported
});
```

**Screenshot before believing anything visual.** A gable roof was inside out in
a shipped game; half a crowd never moved; a sign sat behind a canopy. Every one
of them passed every assertion available. And **a background tab gets no
`requestAnimationFrame`** — the scene renders dark, nothing animates, and every
interaction looks broken whether it is or not. Check
`document.visibilityState` first; `window.gamekit` exposes the running modules
so a throttled tab can be stepped by hand.

Then print it, which is the fastest way to read a campaign whole:

```sh
node tools/make-book.mjs <name>              # books/print/<name>-book.pdf
node tools/make-book.mjs <name> --no-answers # the student's copy
npm run question-book -- <name>              # every question, plain
```

The book is one question per page, a briefing page per mission with what that
mission teaches, the syllabus map from `tools/syllabus.js` with the questions
that teach each concept, the concepts nothing teaches, and the ending. Read the
syllabus pages before anything else: they are the honest report on what the game
covers.

## Before you call it done

| Claim | What proves it |
| --- | --- |
| The content is consistent and inside its reading level | `npm run check <name>` |
| Every stop is reachable and gradeable | `smokeCampaign` inside that run |
| No question is answerable without the science | `probeQuestions` inside that run |
| The campaign is a story with an ending | `checkStory`, plus `ending:` in the manifest |
| The place is walkable and looks like itself | `reportAudit` in the console, and screenshots |
| The syllabus is covered, and the gaps are known | the syllabus pages of the printed book |
| A re-import cannot lose any of it | it is all in `books/<name>.yml` |
| The book and the game have not drifted apart | `bookParity` inside `npm run check` |

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
done. One trap lives in those files specifically: the frame loop starts during
module evaluation, so `const day` and `const driving` must be declared *above*
it or every frame throws `Cannot access 'day' before initialization`.

## Adding a question format

1. Renderer and binder in `engine/core/questionUI.js`, dispatched through
   `kindOf()` — never a raw string comparison. The books spell them `Sequence`,
   `SEQUENCE` and `Science Tank`, and comparing raw strings left 72 lessons
   rendering "not yet implemented" in a shipped game.
2. Teach `validateContent.mjs` and `smokeCampaign.mjs` what "gradeable" means
   for it, or a broken one passes both checks.
3. Teach `probeQuestions.mjs` how it could be answered without the science. A
   format with no probe is a format nobody checks.
4. If it draws anything, use `engine/core/figures.js` — primitives that take
   data, never geometry. Anything with column headings reads them from
   `ch.columns`.
5. Teach `tools/import-book.mjs` the format's fields, and `tools/make-book.mjs`
   how to print it.
6. Shuffle the choices at render.

## Adding a person-facing feature

The roster shape is `{ id, name, role, division, color, bio, quiz? }`.
`division` ties someone to an area and is what makes them a valid person stop.
`engine/core/personQuiz.js` is the worked example of generating content from
bios rather than authoring per person — it prefers an authored `quiz` and falls
back to lifting a sentence, so it scales to every cast and cannot drift out of
sync with the text.

## When you find a new rule

Two places, and both of them: the rule goes in this file or `../CLAUDE.md`, and
**a checker goes in `engine/dev/`**. Every heading above that reads like a rule
has a check under it, because a rule nobody runs is a rule the next game breaks.
Prove the check by injecting the fault and watching it fail — three of the ones
here were installed wrong the first time and passed everything.
