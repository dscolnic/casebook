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
4. **The primer**: the terms, formulas and assumptions the day's questions are
   entitled to expect. It is *derived* in `normalize.js` from the day's own
   lessons — glossary hits, each estimate's `relationship`, each stop's
   `assumes` — so it cannot drift when a stop moves. Write `primer:` on the
   mission only to beat the derived version. Never the takeaway: that is what
   the day teaches.

   **A formula on the card says what its variables are.** `V = nRT/P` is five
   letters, and a card that prints only that has told the player nothing it
   could not have left out; the line reads `V = nRT/P, with V the volume, n the
   moles of gas, R the gas constant, T the absolute temperature and P the
   pressure`. Fix it in the estimate's `relationship` rather than on the card:
   the same string renders inside the question as the governing relationship, so
   one edit reaches both places the player meets it. Five lines across three
   games were bare symbols and the other sixty-eight already named their
   quantities in words, which is the standard — `Impulse = force × time` needs
   nothing added. Mind the 34-word cap on a primer line while you do it; on Deep
   Watch's Doppler line it is what decides whether the solved form and the
   variable list both fit.
5. **The map**, last, because it is what the route is chosen from.

   **The course equations carry their own variable list.** That paragraph is
   about a formula written into a primer line. The other place equations appear
   is the `EQUATIONS` table in `tools/syllabus.js`, printed on the plan card and
   on a chip beside the question, and every entry there carries three fields
   besides its keywords: `e` the equation, `c` a short label, `v` the symbols as
   `[symbol, what it is with its unit]` pairs, and `s` one sentence saying what
   the relation asserts. `syllabusEquations.mjs` fails on an entry missing `v` or
   `s`, because the version of this that shipped printed
   `df/dt = (P_gen − P_load) / 2H` beside the phrase "frequency as the running
   balance of supply and demand" and defined nothing: a reader who does not
   already know what H is cannot use the line, and one who does did not need it.
   Keep `c` a label and put the explaining in `s`.

   **Vocabulary first, equations last, variables inline.** The card puts the
   terms and the prose above the equations, because a formula is the densest
   thing on it and reads better once its words have been defined a few lines up.
   The symbols run together on one flowing line rather than stacking as a
   two-column list — four variables stacked cost four lines and pushed the
   vocabulary off the card.

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

**Brief the player; do not perform at them.** `engine/dev/checkVoice.mjs` gates
three devices, and it exists because all eight games had them. Run it with
`--demo` to see the paragraph it was written for.

| Device | What it looks like | Instead |
| --- | --- | --- |
| WITHHELD | the noun replaced by a riddle: "one number that has to stay inside half a hertz of fifty" | name the quantity — it is the frequency |
| PERFORMED | an abstraction given a will: "the load answers to nobody", "nothing aboard waits for you" | say who does what: demand rises and falls with what people are doing |
| CHIASMUS / UNWATCHED | a phrase folded back for rhythm, or the nobody-is-watching flourish: "when it goes wrong it goes wrong in seconds", "whether anyone is watching or not" | state the fact once |

There is a fourth pattern it counts rather than fails: **a card that ends on a
maxim instead of on today**. A short closing sentence with no number, no name
and no "you" in it is usually a slogan — "Margin is the number that matters",
"A boat that cannot hear is a boat that is only being heard". It is only a note
because the same shape is how a young-reader edition teaches, so any theme at
`audience.grade` 6 or below is exempt: "The loudest patient is not always the
one in the most trouble" is Hospital Heroes writing correctly. Above that grade,
read the list and ask of each one whether it carries a fact about the shift or
just sounds well.

**Every bio needs an authored question, and it must not quote the bio.**
`engine/dev/checkPassages.mjs` gates two things: a roster entry with a bio and
no `quiz` array, and a keyed answer that repeats six or more consecutive words
of the passage.

The first matters because `personQuiz.js` has a *fallback* — with no authored
question it lifts a sentence out of the bio and takes the distractors from other
people's. That is a matching exercise: the player scans for the sentence that
appeared a moment ago and learns nothing. Thirty-one bios across the nine games
were in that state, which is what "there is no learning happening here" meant
when a player walked up to an assessment engineer in Kestrel Bay.

The second is the same failure written by hand, and twenty-five authored answers
had it. Ask about the **why**: the bio says how somebody works and the question
should be answerable only by somebody who understood it — "Why does Sørensen
refuse an unlabelled core?" rather than anything whose answer is a phrase from
the paragraph above it.

Mind `answerShape` while you write them. Thirty-one new questions written in one
sitting put the correct answer as the longest option three times out of four,
because the true option is the one carrying the reason. Give a wrong option a
real reason instead, or move the qualification out of the key.

The tell that this has gone wrong is that the card reads like a trailer. The
player has taken a job, and the opening card is the first hour of it: it should
say what the place is, what their job is, and what is currently true.

**A ninth format: `SWEEP`, for physics that is a curve.** Most of what these
courses teach has the same shape — a resonance, a decay, a calibration, a
trade-off — and it is learned by moving one control and watching an instrument
answer. The book authors an axis, the response as sampled points, the feature to
find and a tolerance; the renderer plots only the positions the player has
actually visited, so the trace is something they built rather than something the
game drew.

```yaml
format: SWEEP
question: Sweep the drive and mark the frequency this qubit actually responds at.
sweep:
  axis: { label: Drive frequency, unit: GHz, min: 4.20, max: 6.40, step: 0.01 }
  readout: { label: Excited population, unit: '' }
  baseline: 0.02
  response:                      # sampled, not a formula — see below
    - { at: 4.55, value: 0.16 }
    - { at: 4.61, value: 0.94 }
  target: 4.61
  tolerance: 0.02
  start: 4.20                    # where the handle begins
  commit: Mark the qubit transition
```

Four decisions worth knowing before authoring one:

- **The response is sampled, not computed.** The printed book has to show the
  same curve and cannot run the game, so a formula would give paper and screen
  two different questions.
- **Nothing marks the target.** A glowing optimum turns the format into a
  button, which is the first thing `INTERACTION_IDEAS.md` warns against.
- **`start` may not sit within `tolerance` of `target`**, or the question is
  answered by not moving — the one way this format breaks by default rather than
  by being wrong. Both the importer and `validateContent` refuse it.
- **The feature has to be visible.** `validateContent` fails a response whose
  value at the target is within a tenth of the full range of the baseline:
  there is nothing to find, and the player is guessing.

Wrong answers teach here for free, which is the point: off resonance is a flat
trace, and a full Rabi period returns the population to where it started.

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

**And the whole game gets one more probe, because a per-question rule cannot see
a habit.** `engine/dev/answerShape.mjs` counts how often the keyed answer is the
longest option, in the mission questions and in the roster's passage quizzes,
and tests that count against chance — a binomial tail, so six quizzes are not
judged by the standard that damns sixty. LEAK already refuses a single set whose
key is 1.9× its distractors; this catches the far commoner version, where every
key is 1.2× longer and forty in a row are the longest thing on the card. When it
was written, seven of the eight games failed it, the worst at 94 per cent
against 25 by chance.

The cause is structural rather than careless: the correct option is the one that
has to be *true*, so it collects the qualifying clause, the unit and the
"because", while a wrong option only has to be wrong, which takes four words. So
the fix is not padding the distractors into waffle. Move the qualification into
the question stem, and make each wrong option wrong for a stated reason —
"Instrument transformers saturate during a fault and stop reporting altogether"
rather than "Telemetry stops working". The rewrite usually improves the
distractors, which is the tell that the rule is pointing at something real.

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

### The equations the course cannot leave out

`EQUATIONS` in `tools/syllabus.js` names them — four to ten per game, the test
being whether a student could pass the unit without being able to write the thing
down. It is a separate export from `SYLLABUS` on purpose: `claimedWords` walks
every string in a `SYLLABUS` entry into the allowlist that `jargonSweep`
prioritises by and that `import-book` stamps `core` from, so putting equations
inside would claim "constant", "logarithm" and forty more words and reorder every
plan card in the game.

Coverage is three-way, and the middle one is the finding:

```sh
node engine/dev/syllabusEquations.mjs <theme> [--all]
```

* **computed** — the question's own `relationship`, template, worked solution or
  givens match. A number came out of it, so it was taught.
* **mentioned** — only the prose matches. That is not teaching.
* **absent** — no question at all.

Seven equations across the seven games are absent, including the effective
reproduction number in an outbreak game and molarity in an analytical chemistry
one. More telling is the ratio: Deep Watch computes three of ten while mentioning
six, Riverton four of ten. The sonar equation, Snell's law, echo ranging,
Archimedes, pH, Beer–Lambert and rate laws are all discussed and none of them is
ever calculated. Page three of the printed book carries the same audit.

**Expect a second pass over `k` after the book is written.** The keyword lists are
authored before the questions, so they encode one phrasing of each idea, and the
book then says it a different way. Writing Blackout hit this four times: the
questions computed the swing relation, the volt drop, the energy and the reactive
support, and all four reported as absent or mention-only because the book said
"rate of frequency change", "volt drop" and "megawatt-hour" where the list said
"rate of change of frequency", "voltage drop" and "kilowatt-hour". Coverage that
looks like missing content is often missing *vocabulary agreement*. Broaden the
list when the book's wording is just as good — and change the *question* when the
list is naming something the question genuinely never says, which is the case
worth catching: Blackout's stored-energy question never used the words inductance
or capacitance, and a question about stored energy in a power system that never
says either is under-teaching the concept, not mislabelled.

**The player meets them before the question does.** `import-book` stamps each
lesson with the equations it touches — the same way it stamps `core`, because the
list is authoring data and the runtime should read a lesson rather than reach back
into `tools/` for a syllabus — and `primeEquations` in `normalize.js` rolls that up
to the day, printing each equation once, on the first day that needs it, above the
vocabulary on the plan card and on the printed mission sheet. Every question that
deals with one also carries it as a button beside the term chips. A day that only
*mentions* an equation gets it too, and that is the case this exists for: a
question that computes one already shows its relationship in the estimate panel,
while a question that only reasons around one never showed the algebra at all.

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

A checker is only as good as the content it is handed. `checkStory` was never
passed `DIAGNOSIS_PACKS`, so a lesson referencing a pack by `pack:` never expanded
and every instrument panel in all seven games was invisible to it — readings,
candidates, answer. Project Y's stage 4 read as six terms of vocabulary there and
nine to the player, and the rule that fails a card containing the day's answer was
scanning diagnoses whose answer it could not see. If you add a checker that
normalises content by hand, give it everything the game gets.

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

# The vocabulary rules, and what a person still has to decide

The jargon sweep in this section used to be a to-do list. It has been done, for
all seven games, and what replaced it is a set of rules the checks now hold. Read
this before writing or rewriting any question.

## The rule that holds

**A term belongs in a question only if the game's own syllabus claims it, or the
day that uses it teaches it.** `tools/syllabus.js` is the authority — thirty
concepts per game with their phrase lists — and `tools/common-words.mjs` is the
other half: the ordinary English a morphology test keeps mistaking for jargon,
plus the stemming both tools share. One list, one matcher, two consumers, so they
cannot drift into disagreeing about the same word.

## Five gates, in `jargonDepth.mjs --check`, inside `npm run check`

1. **No load-bearing gap.** A word two or more defined terms rest on must itself
   be defined. Riverton defined anion, cation and ligand in terms of "ion" and
   never said what an ion was.
2. **Parts before wholes.** A term whose *name* is built from another term may
   not arrive first — "polyatomic anion" is unreadable without anion.
3. **A definition may not lean on a term the player meets later.**
4. **The plan card introduces its own words first.** "Cation — a positively
   charged ion" needs Ion to have had a card line already, on that card or an
   earlier day. The primer deriver satisfies this by construction; the gate stops
   an authored primer from doing worse.
5. **A depth ceiling that rises.** Day one may introduce a term built on one
   other term: ceiling 2, then one more every two days, capped at 6. A stack six
   concepts deep is fair in the last week and unfair on the first morning.

Plus the sixth, which is about what the player actually sees: **every technical
word inside a phrase the questions use must be ordinary, on the syllabus, a
defined term in its own right, or said in the FIRST SENTENCE of its entry** —
because the plan card prints one sentence, and "polyatomic" was explained in the
second.

## Two reports, deliberately not gates

```sh
node engine/dev/jargonSweep.mjs <theme> [--unanchored]   # words: is this term earned?
node engine/dev/phraseSweep.mjs <theme>                  # phrases whose words are all fine
```

`jargonSweep` over-flags on purpose and prints, per candidate, the days that use
it and whether the syllabus claims it. `--unanchored` asks the sharper question
per day: which hard words do the questions ask with that the day's own reasoning
never touches. `phraseSweep` catches what neither word-level tool can — a
technical modifier on a borrowed abstract head, used twice, named by neither the
glossary nor the syllabus. It found "analytical reserve", which was eight hundred
pounds of laboratory budget, after every other check had passed it.

Neither gates, because both need judgement. The sweep's own header says which
decision each row is asking for.

## Three things no checker can see

Every gate above matches a word. None of them can see what the word *means* in the
question that used it, and that is where the expensive content faults live.

**1. A term has to be defined in the sense its questions use it.** All five gates
passed while Project Y's cards handed the player the wrong definition four times
over. `Phase` is defined as "a physically distinct form of a material, such as a
particular crystal structure, liquid, or gas" — the metallurgical sense — and stage
4 used it to mean the aqueous layer of a separation. `Carrier` is radiochemical
carrier material, and stage 1's detector chain used it for charge carriers.
`Scattering` is "an interaction that changes a particle's direction", and every
match in a background-measurement panel was the statistical sense: "Poisson
scatter", "ordinary scatter", "Scatter does not reproduce ten times". A word can be
in the glossary, introduced in order, inside its depth ceiling, and still be
teaching the wrong thing. Read the matches, not the counts.

The related fault is a term introduced by a day that only name-checks it.
`Standard deviation` reached a card from one `givens` line whose own verdict never
said the words, and `Poisson statistics` from a reference field two days before the
stop actually titled "Poisson counting statistics". The day that teaches it should
be the day that introduces it.

**2. A term's later appearances may be callbacks replaying the same lesson.** From
day 3 every day carries a callback, so the same stop — and every word in it —
appears again on later days. A term that looks anchored on days 2, 3 and 4 may be
anchored only on day 2, with the others being that stop coming back. Cutting the
word from day 2 then orphans it rather than moving it later, which is not what the
sweep's day list appears to promise. Check whether the later day owns the lesson
before you move anything.

**3. Removing a defined term can create an ECHO.** `probeQuestions` fails a keyed
option that is answered in its own prompt's words. Replacing "pre-initiation" with
plain words in a Project Y option produced exactly that — five of the prompt's nine
content words reappeared in the answer, because the jargon had been hiding the
echo. Plain words are still the right call; re-run the probes after making them.

## The plan card is derived, and the rules are in `normalize.js`

`primeMissions()` picks the terms. A term earns a line by being one of the terms
the day's questions are *written in* — which is the same test that decides
whether the player gets a chip to click, field for field: title, takeaway, the
ask, every option, card, scenario, given, reading and proposal. A word that
appears only in a scene is set dressing and buys nothing. Matching is at a word
start with a suffix allowed, and whole-word at three characters or fewer, so
"solution" is not Ion and "detonators" is Detonator; the same rule lives in
`questionUI.jargonMatches` and `make-book.mjs`, because a chip the player can
click has to be a term the card named.

Order is syllabus first (`core`, stamped at import time), then how many days of
the campaign reason with the term, then how hard this day leans on it. Every
qualifying term is printed, prerequisites ahead of the term that leans on them,
and each term introduced once. The card used to take the best two and let the
rest go, which turned out to ration the wrong thing: the terms it dropped did not
stop existing, they arrived inside a question instead, with a definition button
and no warning. The prose after the terms — a formula, a line of assumed
knowledge — is what stays capped, and a day that comes out with nine lines is a
day that introduces nine words. `checkStory` notes a card over six rather than
failing it, because the finding is about the day, not the card.

## What a person still has to decide

* **The unanchored lists.** Run `jargonSweep <theme> --unanchored`. Terms a day
  asks with and never reasons with are the next content pass: Project Y 40,
  Outbreak 36, Planetary Defense 22, Riverton 21, Bring Them Home 9, Hospital 7,
  Deep Watch 3. Each is either a word to cut or a verdict to write.
* **`engine/core/terminology.js` is dead code.** Nothing imports it.
  `inlineTextWithTerms` would underline a term in the prose where it is used,
  which is a better answer than a strip of chips, and has never been wired up.
* **Sixty-odd glossary entries still define nothing** — "a course concept used in
  Mission 3" is the docx importers' note to the author. The book skips them; the
  game still ships them.

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
