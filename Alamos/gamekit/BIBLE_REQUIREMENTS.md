# What a campaign bible must contain to be buildable

Every item here was paid for once, on Red Sand, by a stop that would not import or
a gate that refused. Hand this to whoever writes the next campaign bible and the
implementation is lifting rather than inventing.

**The rule this document exists to protect:** the implementation maps the bible's
copy to places, fixtures, formats and gameplay. It does not write player-facing
prose. Every field below with *exact player copy* beside it has to come from the
bible, or the stop is held back.

Companions: `books/<theme>.ARCHITECTURE.md` for the concept spine,
`tools/BOOK_TEMPLATE.md` for the book format.

**The author-facing version of this document is the house style sheet:**
https://claude.ai/code/artifact/ecd36e50-4624-4a90-8752-c050b7cfae9f — the one
canonical shape, the numbers, and the per-format board minimums, written for
whoever is writing the bible. This file is the other half: what happens to each
field once it reaches the game. Keep the two in step.

**Run the linter before anything else.** `npm run bible-lint <bible.md>` measures a
bible against most of this document and takes seconds. Every rule in it was found
the expensive way — write the YAML, import it, run `npm run check`, discover one
rule, fix, repeat — and every one of them was visible in the `.md` the whole time.

```sh
npm run bible-lint books/mars.md                    # the report
npm run bible-extract books/mars.md --all --out books/parts/mars
node tools/assemble-book.mjs books/parts/mars/_book.yml > books/mars.yml
```

`tools/bibleRead.mjs` is the one reader both tools share; `tools/v10extract.mjs`
lifts the copy, the beats, the primer, the glossary and the equations into book
YAML and leaves a `TODO` at each of the three things a bible does not decide —
which area a stop teaches for, which fixture it is asked at, and who asks it.
`tools/assemble-book.mjs` joins per-mission fragments so several people can write
different missions at once, and refuses a book with a `TODO` left in it.
`engine/dev/bibleParity.mjs`, inside `npm run check`, then holds every
player-facing line in the book to being the bible's, verbatim.

---

## 1. Per stop

The `Stop` template in `Campaign_Design_and_Implementation_Master_Brief_v2` §23
covers these. All of them are required:

| field | notes |
| --- | --- |
| **Format/placement** | the canonical format token, and what it is asked at — a person, a room, or a named fixture |
| **Metadata** | concept; keystone; prerequisites; learning role; difficulty; story role |
| **Stop reason** — *exact player copy* | one short line, why *now*. No source for this before v10; every stop was recorded debt |
| **Story setup** — *exact player copy* | **exactly two short sentences.** No word count — see §5 |
| **Story–science connection** — *exact player copy* | one sentence, how the result changes the decision. Not a definition |
| **Prompt** — *exact player copy* | the task itself |
| **Data / readings / options** | with units |
| **Format-specific interaction block** | see §2. This is what blocked 36 of 60 stops on the first attempt |
| **Correct result** | plus tolerance, if numerical |
| **Answer text** | one sentence saying what a right answer was. Required by every operated format — the verdict has no option list to fall back on |
| **Why / mechanism** | the teaching, which arrives *after* the answer |
| **Wrong-path feedback** | one rebuttal per wrong option, naming the mechanism |
| **State/output** | flags set, things unlocked |

**Not needed.** These were engine fields with no bible counterpart and have been
removed: a card `guide`, a card `takeaway`, `Failure means:`, `Later travel:`, and
a beat `presentation:` list. Do not write them.

---

## 2. Interaction payloads, by format

A format name plus prose is not a playable interaction. `CHOICE`, `BALLPARK` and
`SEQUENCE` work from the shared fields; **every other format needs its own board
described.** The importer refuses the stop otherwise, and the right response is to
hold the stop back, not to substitute an option list.

### The trap: the bible's board and the engine's board can be different shapes

v10 specified ALLOCATE as a **continuous split of a pool** — 80 kmol divided
56/8/16/0 across four items with min, max and step. The engine's ALLOCATE is a
**subset chosen under a budget**: each item has one cost, and you pick which to
fund. Both are valid; they are not the same object, and converting between them is
implementation work.

So: **specify the board's logic, the numbers and the correct answer. Do not assume
the field names transfer.** A bible that says "pool 80, items with these minima,
these questions, this pass rule" converts cleanly. A bible that hands over YAML
with the engine's own key names and the wrong model does not.

### Minimums the engine enforces

Counts below are floors, not suggestions — under them the format stops being a
decision. Everything named here is refused by `tools/import-book.mjs` when it is
missing, so a stop that omits one of these is held back whole.

**The derivation formats — the largest gap across all eight campaigns.**

- **DERIVE** — a `start` (the line the derivation begins from) and a `goal` stated
  **as a form** — *"dQ/dt in terms of dH/dt"* — never as the answer. Then **≥2
  steps**, and per step: an `ask` saying what that line is doing; **≥3 candidate
  lines**; the index of the right one; a `why` on **every** wrong candidate saying
  what it gets wrong; and **≥1 wrong candidate marked `survives`** — a branch that
  is wrong but not obviously wrong, or the step is passed by elimination rather
  than by differentiating. Two more traps: the keyed line must **not** be the
  longest thing on the panel (the answer would be findable by shape alone), and
  naming the rule is opt-in — set `askRule: true` **and** list **≥3 rules**, or
  list none at all. Two rules answer the second half of every step by elimination.
  *A list of correct lines with one whole-derivation decoy is not a DERIVE board.*
  Across Headwater, The Trial, Changeover, Ground Truth, Midway and Planetary
  Defense this one omission holds back **over 70 stops**, on campaigns whose
  derivations are the course.

**Formats with no entry here before, and every one of them appears in a bible.**

- **TALLY** — **≥2 setting pairs**, each with a label and a `pSame` between 0 and 1;
  a numeric `target` and a **positive** `tolerance`; `answerText`. The settings'
  own arithmetic must land on the keyed target, and a `budget` in whole batches is
  required — without one the shots are free and the answer is to keep clicking.
- **CLOUD** — `bounds` with max above min; a numeric `centre` and a **positive**
  `spread`; `pass`, the fraction that has to finish inside, between 0 and 1; **≥2
  actions**, each with `effect: shift|narrow` and a numeric `amount`, **at least
  one of them narrowing**. The trap is arithmetic: applying every shift and no
  narrow must leave the player **short** of `pass`, and applying everything must
  clear it. A cloud that can be answered by re-centring teaches that moving the dot
  works.
- **PROPAGATE** — **≥3 inputs**, each with a label, a value, a **positive
  `sigmaFrac`** and an `exponent`; **≥2 candidate measurements to buy**, each
  naming an input id and carrying a positive `cost`; a `costUnit`; a positive
  `budget`. The keyed `dominant` must be the input that actually dominates **and
  must not be the one with the largest exponent** — ranking by exponent getting it
  wrong is the whole point of the format.
- **TRIANGULATE** — **≥3 stations**, each with `x`, `y`, a numeric `distance` and
  its `observation`; a numeric truth position in the same plane; a positive
  tolerance. Bearings without coordinates cannot be drawn.
- **INJECT** — a population with a numeric `n`; **≥3 configurations**, each with a
  label, `detections` **and** a separate numeric `metric`; a named `best`; a
  `blindSpot` saying what never comes back in any configuration. **The
  configuration with the most detections must not be the best on the metric** — if
  they rank the same, the trap the format exists for does not exist.
- **BELT** — `left` and `right` bins with distinct names; **≥24 items**, **≥8 per
  bin**, no bin over 65% of the belt; every item name **three words or fewer**; no
  item in both bins and none twice; a pass mark above half, ≥1 life and fewer lives
  than items.
- **HOLD** — a `quantity` to hold and a named `control` to hold it with; a numeric
  `hold` and a positive `band`; a run of **20–120 seconds**; a positive
  `authority` (how far the control can push, and it must cover the worst
  disturbance); **≥1 disturbance**, each with a label, a time inside the run and a
  non-zero signed size. A hold with no disturbances is a needle that stays put.
- **LOB** — **2–5 marks** in increasing distance, each with a label, a positive
  distance and a positive radius; **2–6 shots** per mark; a positive `maxSpeed` and
  `gravity`. Every mark must be reachable and none hittable by three casual angles.
- **ROUTE** — **≥5 compartments**, each with a label and a `landmark` (what is still
  there when the lights are out); an order using each once; `interruptAfter`
  between 1 and one less than the count; a `resumeAt` that falls **after** the
  interruption.
- **DELEGATE** — **≥3 problems**, each with a label, a trend, a rate and a
  consequence; **≥2 people** to hand work to; **≥2 first actions** to choose
  between; the keyed `first`.

**The four that were one grouped line, written out.**

- **STRESS** — **≥3 candidates** and **≥2 criteria**, each criterion with a `key`
  naming the score field it reads; **a numeric score for every candidate on every
  criterion**; one assumption with `min`, `max`, `step` and a `nominal` inside its
  own range; a `feasible` threshold per candidate; `optimiseOn` — the criterion the
  nominal makes look best. **Exactly one candidate may survive the whole range, and
  it must not be the one that wins at `optimiseOn`.** Booleans at a few bias values
  are not scores.
- **RESIDUAL** — **≥2 candidate fits**, each with a label, a numeric `rms` and **≥5
  residuals**, every residual carrying a numeric `x`, `y` and `value`. The fit to
  `accept` must **not** be the lowest-RMS one, the lowest-RMS one must be marked
  `structured`, and the accepted one must not be. The format exists because the
  best number is the wrong answer; a board where the smallest RMS is already right
  teaches nothing.
- **VERIFY** — a prediction range with `min`, `max` and `step` (the player **dials**
  a number, they do not read one off); a numeric `truth` — what the measurement
  will find — inside that range; a pass band as a **ratio** of the truth, with at
  least one end of the dial outside it; a `measurement` with a label, because it is
  the thing the player can skip. **A truth of zero cannot be graded as a ratio**,
  and a stop predicting two or three quantities is two or three stops.
- **BALANCE** — **≥3 streams** with labels and numeric values, of which **≥3 are
  countable**; a numeric `total`; a positive `tolerance`; **≥1 `hidden` stream**.
  Everything countable must close on the total, and the visible streams alone must
  **not** — the hidden term is the finding. A stream's note may not give it away,
  and a ledger closing on three visible rows is a subtraction, not a board.

**The three that read a line, written out.**

- **PROBE** — **≥4 stations** (a pattern needs somewhere to break), each with a
  label, a `reading` **and** an `expected` — this run and the specification; unique
  ids; a `target` naming the station where the pattern breaks; `answerText`. No
  station's note may state the cause the stop exists to find.
- **SWEEP** — an `axis` with min and max; **≥4 authored response points** per
  series, each with a numeric `at` and `value`; a numeric `target` **on** that axis
  and a **positive** `tolerance`; the starting position must be outside the
  tolerance; `answerText` that does not print the keyed number. A boundary sweep
  needs **≥2 series** — the costs it trades between. Booleans are not responses, and
  "the whole axis" is not a target.
- **HOLDOUT** — an `axis` with min and max; **two curves of ≥5 points each** — the
  calibration one and the held-out one — every point with a numeric `at` and
  `value`; a numeric `pass`. **The held-out score at the best calibration position
  must fail `pass`**, and some position must reach it. `answerText` gives the honest
  number and why it is lower, without printing the pass mark. A single acceptance
  window with one revealed measurement is not a holdout.

**And the rest, unchanged.**

- **ALLOCATE** — positive pool; ≥4 items with costs and unique ids; ≥3 questions
  the plan may answer, each requiring at least one item; ≥1 required and ≥1 not
  required; every item together must cost **more** than the pool, or nothing is
  traded away; the required plus protected items must cost **less** than the pool,
  or it cannot be answered. An item may be `protected` or `required`, never both.
- **VALUE** — positive budget; ≥4 costed options on genuinely different axes (write
  the `axis` on each); ≥1 required; total cost above the budget. Give every option
  a `reveals` line — what buying it tells you.
- **ATTEST** — ≥4 claims with backing status; a numeric verification limit
  **strictly below** the claim count; ≥1 critical claim unbacked and ≥1 critical
  claim backed; not all already backed. **Every claim needs an `evidence` line —
  what a verification would actually turn up.** This is the cheapest gap in the
  whole set: one sentence per claim, and it holds back seventeen stops.
- **TRACE** — ≥4 labelled channels, **each with a `reading`** — a quantity with
  units, what that channel currently says; a named shared upstream resource; ≥2
  channels depending on the target; ≥1 genuinely independent channel. Ids and
  dependencies alone render an empty board.
- **CONTROL** — ≥3 candidates with unique ids; numeric baseline; a `response` that
  is the **signed change** in the reading, not the reading after it; a stated noise
  band the keyed response **clears by 3×**. One suspect variable, not an
  interaction between two.
- **DEGENERACY** — exactly two controls, each with min, max, step and a positive
  tolerance; ≥5 points on the first locus, ≥3 on a second; the second measurement
  labelled with the physics it uses; a numeric truth pair **both loci pass
  through**. State the tolerance on each **control**, not on the observable.
- **CHAIN** — ≥4 transfers with labels, carried quantity and unique ids; an order
  naming ≥4 of them once each; ≤2 decoys, and a decoy still needs a `carries` line
  to be a link at all; a **`governing` link id** — one of the transfers, not a
  relationship or an equation — and a `distractor`. Each link needs a `reading`.
- **TRIGGER** — **one rule only**, on **one named quantity**; a numeric scale with
  min and max; ≤4 anchors, **each saying what a reading there means** rather than
  being a bare number; an objective, a direction and a consequence limit **on the
  same quantity as the scale**; a positive `leadHours` and a firing `window`; and a
  **stream of ≥3 updates**, each with a timestamp, a numeric value and the hours
  still left. A ladder of four stages, or nine conditions on nine quantities, is a
  condition table and not a trigger board.
- **BALLPARK** — an `estimate` block: labels and values that agree number for
  number, `slots` equal to the length of `correct`, **one** relationship, **one**
  target, a tolerance **as an absolute band in the answer's own units** (not a
  fraction) and units. Distractor tiles are plausible *quantities*, not wrong
  answers. Every quantity the worked calculation divides or multiplies by must be
  a tile — constants included. Three targets on one board is three stops.
- **SEQUENCE** — the cards, and **one** order using every card exactly once. Write
  the axis if the order is not chronological. Two parallel orders sharing a
  terminal card is two boards.
- **DIAGNOSIS** — headline, readings **listed** with their zones and statuses (not
  described by count), **≥4 candidates**, one keyed diagnosis matching a candidate
  label exactly.
- **PROTOCOL** — scenarios and responses both **named and enumerated**, and a keyed
  mapping covering every scenario. A promise of rows that are never listed builds
  a partial board.
- **CASEBOOK** — evidence rows with labels and readings, keyed interpretation.
- **SCIENCETANK** — proposals, evidence, constraints, recommended allocation.

---

## 3. Per mission

| field | notes |
| --- | --- |
| **Header** | deadline or campaign status |
| **Card title** | short |
| **Go now** — *exact player copy* | *"Go to [PLACE] and meet [CHARACTER], [their job], at [FIXTURE]."* **Carry the job here** — see §6 |
| **Card body** — *exact player copy* | four sentences, in order: what the last mission left and what is still wrong; the new idea in plain words before its technical name; what the player will do; a promised result opening *"By the end of the mission"*. **30–70 words** |
| **Objective** | one plain-language action or result |
| **Beat script** | per beat: the trigger, the world change, the panel/HUD line, the bubbles, the waypoint. See §4 |
| **Mission outcome** — *exact player copy* | must **open** with `Mission decision: [direct answer to the card's promised result]`, then the decisive evidence, what the crew does, and the next problem. **Grade 6.5 or below** |
| **Post-mission metric screen** | target time, story event, the four bar changes |
| **Quick concept review** | bullets, the last one labelled `**Mission takeaway:**` — that is the line the debrief carries into the next shift |

### The mission's four setups must chain

Each setup after Stop 1 names what the previous stop established — *"With the
samples labelled correctly…"*, *"Because a deleted formula could create a false
shortage…"*, *"Use the corrected counts to…"*. Four independent situations that
share a topic is the failure mode; the player should never have to work out why
the game changed subject.

---

## 4. Beats

One beat per world change. Per beat the bible gives:

- **when it fires** — on arrival at a named place, after a stop or stops, or at
  mission end;
- **the world change**, as one sentence — this is a *stage direction*, and the
  implementation performs it on a board rather than printing it;
- **the panel / HUD line** — this doubles as the board's row, so a beat with a
  panel line gets its world change for free;
- **the bubbles** — who speaks and what they say, marked if it is a radio call;
- **the waypoint**, if the beat names the next destination.

**Arrival beats may name any room with a door,** not only a curriculum area — the
Atmosphere Intake, the Hydrogen Store, the Ice Cut. Say which room.

**Do not write the world change twice.** If a beat has a panel line and a board,
the board shows it; a text box repeating it is the same thing said twice.

---

## 5. Length and reading limits, with numbers

Run the project's checks; do not judge by feel.

| copy | limit |
| --- | --- |
| campaign opening card | max five sentences |
| briefing card body | four sentences |
| question-card story setup | exactly two sentences |
| mission closing card | **grade 6.5 or below** |
| dialogue bubble | short enough to scan while walking |
| every technical term | defined before use, in a glossary with no undefined words in it |

**There is no word count on any of these, by decision.** A setup written as
one long sentence measures **grade 14–18** whatever its length, and fails
the campaign's own reading gate. Two short sentences satisfy both the word count
and the harder rule — a fifth-grade reader must follow the immediate situation
even when the reasoning is AP-level.

---

## 6. Names, and the glossary

- **Every character's job appears beside their name at the first mention in each
  mission.** The briefing card's Go-now line is the natural place and is read
  first. A bare surname in a stop setup fails.
- **Every name on a card is on the roster.** Check first names against the
  character section: Red Sand's mission 2 said "Erik Sundqvist" while its own
  character bible said Ingrid.
- **Do not name a character on the closing card.** Names belong on a call's
  reason.
- **The glossary must be recursively complete.** Red Sand defined `intermolecular
  force` and `phase change` using the word *boiling*, and never defined boiling.
  A definition that leans on an undefined word fails.

---

## 7. The four metrics and the economy

- Exactly four bars, 0–100, each with a start value and a plain sentence of what
  it means.
- Per mission: a target time, a named story event, and the four bar changes.
  **Every negative change names its event** — a bar that fell for an unreadable
  reason is one the player cannot answer.
- Which bars may lock, and after which mission.
- `RP = clamp(min, max, base + time_modifier − incorrect_submissions)`, and the
  bank cap.

### Check the campaign is winnable before writing fifteen missions

Sum the authored deltas per bar, add the starts, and see what Recovery Points are
needed to reach 100 on all four against what is earnable. On Red Sand:

- required **154**, earnable **180** — **26 points of headroom** across fifteen
  missions, about 1.7 dropped points per mission. Tight, and worth deciding
  deliberately.
- one bar (Power) absorbed **83 of the 154** — more than half the campaign's
  earnings.
- Ascent Oxygen overshot to **101**, so a point of authored gain was clamped away
  and that bar was never in play.
- worst: a crisis floor collapsed the bus below 40% Power at mission 13, and the
  authored deltas alone brought Power to **exactly 39%** — a one-point knife-edge
  that ends the campaign, with nothing on screen warning of it.

Any of those four is cheap to fix while the delta table is a table, and expensive
after fifteen missions of copy are written around it.

---

## 8. The concept spine

- Name a small set of **keystones** — Red Sand's sixty stops carried sixty
  distinct concept labels, so nothing recurred by name even where the same idea
  was being used for the fourth time, and the question "does this keystone recur?"
  could not be asked at all.
- Each keystone should recur **three to five times in different roles**, with real
  gaps between: `INTRODUCE`, `PRACTICE`, `RETRIEVE`, `COMBINE`, `TRANSFER`.
- **`RETRIEVE` is the one that gets forgotten.** Red Sand had three in sixty
  stops, none on a chemistry keystone: gases were the whole of mission 3 and never
  asked for again, thermochemistry the whole of mission 7, electrochemistry three
  stops in mission 13 and never returned. That is *Unit 3, then Unit 4, then Unit
  5* — the shape the brief exists to prevent.
- Build the concept-encounter matrix **before** writing questions.
  `tools/keystones.mjs` will generate it from a stop list.

---

## 8a. The mission card's "Worth knowing first" block

This block is on every mission's plan card, above the calls, and the engine
assembles it. The heading is the engine's; **everything in it should be the
bible's and currently is not.** Two of the three parts are repo-authored prose
today, which means a campaign's vocabulary and formulas are written by whoever
implements it rather than by whoever designed the course.

The block holds, in this order: the day's **glossary terms**, then any **primer
bullets**, then the **equations** the day is the first to need. Vocabulary before
formulas, deliberately — a formula is the densest thing on the card and assumes
the most, so it reads better once the words in it have been defined a few lines
above.

### Glossary terms — full sentences, not parentheticals

A bible's own required-terms list is usually a gloss in brackets:

> `**mole** (a counting unit equal to 6.022 x 10^23 particles)`

That is too short for this block, which is why the implementation ended up
expanding every one. What the card wants:

```
Term: Mole
Also called: mole, moles, kilomole, kilomoles, kmol
Definition: A fixed count of particles, the same count whatever the substance
  is. One mole is Avogadro's number of them, which is how a mass on a scale
  becomes a number the reaction can be asked about.
```

- **Also called** is every spelling and plural the campaign's prose uses,
  including the abbreviations. The engine finds a term in a card by these, so a
  term whose alias list misses `kmol` is never shown on a card that says kmol.
- **Definition** is one or two sentences of prose. The second sentence is usually
  the useful one: what the term *lets you do*, not only what it is.
- **Every word in a definition must itself be defined or ordinary.** This is the
  rule that costs the most. Red Sand defined `intermolecular force` and
  `phase change` using *boiling*, defined *boiling* nowhere, and the gate refused
  the theme. Adding a mission activates more terms and exposes more dependencies,
  so **close the glossary once for the whole campaign** rather than a word at a
  time. Four terms had to be written on the implementation side to unblock two
  missions: `kinetic energy`, `electron`, `mixture` and `error`.
- **A two-word term must define both halves in its first sentence.** An entry
  named "Measurement error" whose first sentence never says *error* fails, because
  the gate reads an entry's own name for undefined words. Name it `Error` and
  alias `measurement error`.
- Terms the day's equations merely *mention* are still kept. An equation naming a
  word and a term defining it are different jobs.

### Equations — four parts each, not just the formula

The formula alone is not enough. Each of the course's essential equations needs:

```
Equation: moles = grams ÷ molar mass,  particles = moles × 6.022 × 10²³
What it is for: turning a weight on a scale into a count of molecules
Symbols:
  grams          the measured mass of the substance
  molar mass     the grams in one mole of it
  6.022 × 10²³   Avogadro's number, the particles in one mole
Why this campaign needs it: A scale weighs grams and a reactor model counts
  molecules, so every production figure in this plant is one of these two steps
  or both of them in a row.
Also called: molar mass · avogadro · grams to moles · moles = grams
```

- **What it is for** is a phrase, not a sentence, and it says the *job* rather
  than restating the algebra. "turning a weight on a scale into a count of
  molecules", not "converts mass to moles".
- **Symbols** is every symbol in the formula with a plain-language meaning. Write
  the units where they matter — *"the absolute temperature, in kelvin"*.
- **Why this campaign needs it** is one sentence tying the equation to *this
  plant, this launch window*. It is the line that stops the block reading like a
  formula sheet. Compare Red Sand's ΔG entry: *"Direction is a competition
  between heat and disorder with the temperature setting the odds, so a reaction
  that gives out heat and makes fewer molecules is spontaneous up to a
  temperature and not above it."*
- **Also called** is the phrases the campaign's prose uses for it. The engine
  attaches an equation to a stop whose prose mentions it, so these are how it is
  found.

### Two rules about equations that are easy to trip over

- **An equation must be COMPUTED by some question, not merely mentioned.** A
  question that gets a number out of it has taught it; one that says the words
  has not. An equation on the syllabus that no question computes is a recorded
  gap, and the gate will name it.
- **Say which concept each equation belongs under.** The engine shows an equation
  on the day that first *needs* it, which it works out from the concepts the
  day's stops carry.

### And the primer bullets

Optional, and usually unnecessary. A day may carry a few plain facts that are
neither a term nor an equation — the ground its questions stand on. Two things to
know: a bullet that is 70% the equation's own words is dropped automatically, so
do not restate a formula in prose; and a bullet listed as an assumption gets its
own **"Taken as given"** heading, which is where a fact the questions rest on
rather than teach belongs.

---

## 9. What is a hard failure and what is recordable debt

Some gates ratchet: a shortfall can be recorded in a debt file so it cannot get
worse, and paid off later. Knowing which is which tells you what must be right
before shipping.

**Hard — the stop or theme will not build:**
missing interaction payload · a keyed answer outside its own tolerance · a
`SEQUENCE` order not using every card once · a concept not on the syllabus · a
name on a card who is not on the roster · a glossary term defined with an
undefined word · a beat firing in a room the book does not declare · a mission
with no metrics plan in a metrics campaign.

**Recordable debt — ships, tracked, cannot worsen:**
a closing card above grade 6.5 · a card body with no "Today you…" clause · an
outcome that does not turn (the But-or-Therefore rule) · a character named on a
closing card · a stop with no reason · question-card reading grade above the bar.

A ratchet also works in the other direction: **paying off a debt without deleting
its line is itself a failure.** When a rewrite makes a card pass, the gate says
so and the line has to go — otherwise it silently licenses a future regression.

---

## 9a. Four more, found while building Red Sand missions 1–2 from v10

**The answer text must state the same quantity as the keyed answer.** v10's
stop 7 asked which reactant limits production and how much methane it supports.
Its keyed choice said *"H2 limits; 520/4 = 130 kmol CH4"* and its mechanism said
H2 *"can make only 130 kmol"* with *"20 kmol CO2"* left over — but its answer text
said *"supports 20 kmol CH4"*. The leftover reactant had been swapped for the
product. Nothing catches this automatically: a number-matching scan over all 60
stops produced nine findings, eight of them formula subscripts, and **missed this
one**, because 20 does appear in the mechanism. It has to be read.

**An operated stop's question should still name the concept it teaches.** A card
with no options has only its question and its scene on the face, and the question
of an operated format is an instruction — *"Allocate the 80 kmol across…"* — which
names no chemistry. The concept then appears nowhere the player reads. Write the
prompt so the idea is in it: *"…which reactant limits production, and how should
the remainder be divided?"*

**Do not mark an item protected if the player has to choose to preserve it.** v10
gave the restart reserve a minimum of zero and a pass rule of `restart >= 16` —
so preserving it is the decision. Described as pre-protected, its required
question is answered before the player touches anything, and the format stops
being a choice.

**Say which of a mission's rooms each beat fires in.** Arrival beats belong to
places, and most missions happen somewhere that is not a curriculum area.

---

## 9b. Four more, found building missions 1-3 from v10.2

1. **Name who asks each person stop.** `Format/placement: CHOICE, asked at
   Commander Abiola` names her, and the book can now carry it — `person: abiola`.
   Without it the engine picks somebody off the area's roster by a rotation on the
   mission number, and Red Sand's mission 2 asked Rei Tanaka a question the bible
   gives Sundqvist, whose own beat script then replied to it.

2. **A PROBE needs four stations, each with a reading AND an expected.** Three
   points, two of them normal, is one candidate and no pattern; the importer
   refuses it outright. And the fault is where this run and the expected value
   separate, so a station with only a reading cannot be read. Two stops in v10.2
   are short — Stop 11 and Stop 35.

3. **A glossary term may rest on one other defined term on day one, and one more
   every two days.** v10.2's own `Reactant` and `Product` arrive on mission 2
   defined through *chemical reaction*, which is defined through *chemical bonds*,
   which is defined through *atoms* — three deep where the day allows two. Define
   them in words already introduced, or move them a mission later. This is
   `engine/dev/jargonDepth.mjs`, and it is not in the linter: the linter's own
   attempt at it scored `Reactant` at 21 and reported eighty-nine findings, most of
   them ordinary English.

4. **Every equation on the card has to be COMPUTED by some stop, not just named.**
   `curriculumDelivery` fails a syllabus equation no question gets a number out of,
   and "an equation nothing computes is an equation the course did not teach". In
   v10.2 the partial-pressure equation is computed only at Stop 11 — the probe that
   cannot be built — so holding that stop back takes the equation with it.

### And one thing to spell one way

v10.2 writes two fields three ways: `**Why:**` on fifty-seven stops and
`**Mechanism:**` or `**Correct mechanism:**` on three; `**Wrong-path feedback:**`
on most and `**Why alternatives fail:**` on the rest. It also writes options as a
numbered list on most stops and as one slash-separated line on eight — and on Stop
41 the options are equilibrium expressions that contain slashes, so that list
cannot be read at all. The reader handles the synonyms and the linter reports
them; one spelling each is still cheaper than any of it.

## 10. The shortest version

If the next bible does only these, the implementation will not have to invent
anything:

1. Every stop gets its **interaction payload** — the board's logic, numbers and
   correct answer, in whatever notation, with the model stated.
2. Every stop gets a **reason**, an **answer text**, and a **two-sentence setup**
   that names what the previous stop established.
3. Every mission's **outcome opens with `Mission decision:`** and its **card body
   ends with "By the end of the mission"**.
4. Every character's **job travels with their name** at first mention.
5. The **glossary defines every word its own definitions use**.
6. Do the **winnability arithmetic** on the four bars before writing the missions.
7. Name the **keystones** and make them recur, `RETRIEVE` included.
8. Write the **glossary as full sentences with alias lists**, closed so no
   definition leans on an undefined word — and give every equation a **purpose
   phrase, symbol glosses and a why-this-campaign sentence**, not just the
   formula. See §8a; both are repo-authored today.
