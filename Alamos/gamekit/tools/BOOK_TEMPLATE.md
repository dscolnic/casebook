# The book format

> Phase 3 of `../NEW_GAME.md`, which is the whole build in order — read that for
> what the writing has to clear once the format is right.

> Before writing the missions, read **`gamekit/STORY_SPEC.md`** — what a
> campaign needs beyond correct content (one argument with two sides, a cast in
> every card, a stated timeline, and the four beats of a day card), and the
> `checkStory.mjs` that enforces it.

One file describes a game. `tools/import-book.mjs` reads it, checks it, and
writes the theme's content. Anything it cannot check is stated in the file
rather than guessed at — that is the whole point of the format.

```sh
node tools/import-book.mjs my-game.yml <theme> --dry      # parse and report, write nothing
node tools/import-book.mjs my-game.yml <theme> --verify   # write, then run every check
```

Hand this file to whoever writes the book, including a model. The rules that
matter are few, and every one of them exists because breaking it shipped a bug:

- **Every format is spelled from the list.** `PROTOCOL SEQUENCE BALLPARK
  SCIENCETANK DIAGNOSIS TRIAGE CASEBOOK CHOICE`. A question with options and one
  right answer is `CHOICE` — do not dress it up as a diagnosis. Sixty-three
  lessons in one game were typed as the nearest format the importer knew, and
  every one of them rendered a panel with nothing in it.
- **Every roster entry has a `division`.** Without it, that area's person stops
  are unreachable and nothing says so until a player walks the whole town.
- **A `BALLPARK` stop carries an `estimate` block.** Prose carries no
  arithmetic; without it the panel opens with "not yet converted". Its tiles must
  say what they are worth and its slots must match its answer — see the four
  rules under BALLPARK below, all four enforced at import.
- **`takeaway` never repeats `why`.** The takeaway is shown before the question.
- **The `scene` is the situation, not the teaching.** Thirty to forty-five words
  of where the player is and what is being asked of them. It must not contain
  the answer, and it must not contain the mechanism either: put the physics in
  the scene and the player reads it, answers, and learns nothing from being
  right. All seven games shipped that way and all seven were rewritten.
- **`why` is where the teaching goes.** Seventy to ninety words, shown only in
  the verdict, explaining the mechanism rather than restating the answer. Add a
  `rebuttals` entry per wrong option saying why *that* one fails — one per
  option, not a general remark.
- **`assumes` is a list of what the stop expects the player already knows.**
  One or two short clauses. It is how "could a student answer this?" gets a
  checkable answer.
- **A TALLY needs a `budget`.** Shots are free otherwise, the clock is stopped
  behind a panel, and the commit button unlocks only once every pair is past
  `minShots` — so the panel makes the judgment and the player clicks until it lets
  them submit. A player reported exactly that. Author a finite pot of batches:

  ```yaml
  batch: 100          # shots per batch
  minShots: 100       # the floor, which must NOT be enough on its own
  budget: 24          # batches for the whole stop, across all pairs
  ```

  The importer refuses two things now. A floor whose scatter is already inside the
  tolerance (`tolerance` must be no wider than 1.5σ at `minShots`, where
  σ = √(Σ 4p(1−p)/n) ), because then the minimum *is* the answer; and a budget too
  small for an even split to pass comfortably (`tolerance` at least 1.5σ at full
  spend), because then a well-played stop still fails on luck. `npm run traps`
  breaks both.
- **`guide` and `background` are the two-paragraph card, and they are optional.**
  A stop with a live instrument had grown to six blocks competing for the eye —
  the scene, `assumes`, `takeaway`, a row of syllabus equation chips, a row of
  glossary chips, and then the panel's own "what you are doing", hint and "what
  counts as done". A player who reached Quantum's HOLDOUT could not tell which of
  them was the instruction. Where that happens, write two paragraphs instead:

  ```yaml
  scene: >-                  # paragraph 1: what has happened, and any word the
    …                        # question needs. Not the answer.
  guide: >-                  # paragraph 2. On a live panel: what the player does
    …                        # and what the numbers mean. On a board or a CHOICE:
                             # what the options disagree about, the test that
                             # separates them, and what the distinction costs.
                             # Under 130 words either way, and never mechanics —
                             # every board format already prints its own
                             # instruction line a few pixels below.
  rules: >-                  # optional, behind its own "Rules" button. How the
    …                        # panel is SCORED. SCIENCETANK is what it was written
                             # for: its spending rule is the grading, not the
                             # reading, and it used to occupy the guide's place
                             # while the stop's `evidence` sat collapsed inside
                             # the panel. A stop with `rules` also makes the tank
                             # panel drop its own "Evidence available" disclosure,
                             # so put the evidence in `guide`. Under 130 words.
  background:                # behind one button, as prose, in any order
    - >-
      …
  ```

  On a SCIENCETANK the evidence has to carry a fact bearing on **every** proposal —
  a cost, a lead time, a measurement already taken, a reason it is on the list at
  all. Evidence that only describes the proposals worth funding is a hint rather
  than evidence: it turns "spread a hundred points" into "find the two paragraphs
  that exist".

  `background` takes the course material out of the way without deleting it: the
  button holds those paragraphs, then each syllabus equation **spelled out in a
  sentence** with its symbols named, then the glossary definitions, then `assumes`
  and `takeaway`. Chips are only useful to somebody who already knows what they
  say, which is not the reader who needs them.

  Two consequences. A stop with a `guide` **suppresses the panel's own three
  lines** — the guide is the instruction, and printing it twice more is what the
  player complained about — so authoring `sweep.hint`, `holdout.goals` and the
  rest beside a guide is refused rather than ignored. And the answer must not be
  in either paragraph: a HOLDOUT's pass mark is checked against both, and against
  the background, the same way a SWEEP's target is.
- **The `Key concept` door is not authored here, and there is no key to write.**
  The card carries a second door beside `Background` naming one syllabus concept
  and saying what the idea is for. Which concept is derived at import — scored on
  where in the stop the concept's keywords landed and on how rare it is across the
  campaign — and the two sentences it opens onto are `t` on that concept in
  `tools/syllabus.js`, written once for the course rather than once per stop. A
  concept with no `t` yet stamps nothing and the card renders as it always did, so
  a book needs no change either to gain the door or to go without it. What a book
  CAN do about it is write the stop clearly: a concept named in the title or in
  the ask beats one that only turns up in a distractor's label, which is exactly
  the pick the scoring makes.
- **Match the reading level to `audience.grade`.** `validateContent` notes a
  passage above it and fails one two grades over. When the vocabulary cannot be
  simplified, shorten the sentences — that is the other term in the formula.

Three stops per mission and every stop's lesson lives at the stop — there is no
separate curriculum to index into and therefore nothing to drift. **The campaign
is as long as the book**: fifteen missions is what the four shipped games have,
not a requirement, and the HUD and the win condition follow whatever you write.

## What the engine does to your missions

`engine/content/normalize.js` reshapes every book at load, for every theme, so a
re-import cannot lose it. Write with this in mind rather than around it:

- **A day that visits the same area twice** has the repeat turned into a person
  stop — the player finds somebody from that area instead of entering the room
  again. Write each day into three different areas and this never fires.
- **Each day gets exactly one person stop** anyway, unless a repeat forced a
  second. Marking a stop `person: true` yourself is honoured.
- **From the third day on, a fourth call is appended**: a callback to an area
  taught earlier, oldest first, preferring a lesson whose title ends `— Review`
  if the theme wrote one. You do not author it. A book whose every day visits
  every area gets no callbacks — there is nothing left to call back to, so give
  the campaign more areas than a day has stops.
- **A format with no data for its format is retyped**, and an estimate spec is
  registered across a lesson and its review variants.

## Two optional fields worth using

- `motivation:` — one line on why this stop matters now, shown before the
  question. The panel composes a serviceable one from the day if you leave it
  out.
- `figure:` — every format renders one, not just DIAGNOSIS. See
  `engine/core/figures.js` for the shapes (`line`, `peaks`, `bars`, gauges).

---

## Skeleton

```yaml
theme:
  id: riverbend
  title: The Riverbend Response
  subtitle: Field Scientist · Riverbend

# The areas of study. A design decision — no design document contains them.
groups:
  - id: IDENT
    code: IDENT
    name: Molecular Identification
    color: '#7a4fa3'
    desc: What an instrument can measure, and what it cannot.
    defaultLeader: okonjo
    milestones: [Build the notebook, Connect the evidence, Verify across samples, Ready to hand off]
  # …five more

# The cast. Books name functions ("the reviewer"); people are yours to invent.
roster:
  - id: okonjo
    name: Adaeze Okonjo
    role: Analytical Chemistry Lead
    division: IDENT               # REQUIRED. No division, no person stop.
    bio: |
      Runs the Molecular Identification Lab, which is two instruments and a
      rule. The rule is that a name is a claim, and a claim needs evidence that
      could have come out differently.

      The chromatograph separates a mixture in time; the mass spectrometer
      weighs the fragments. Every compound leaves a pattern as specific as a
      fingerprint.

      Her limit is the library: a match is a comparison against patterns
      somebody else recorded, and two compounds from one family can look alike.
    quiz:                         # optional; one authored question is worth ten generated ones
      - q: Why will Okonjo not confirm an identification on the mass spectrum alone?
        a: A library match is a comparison, and related compounds can fragment almost identically
        wrong:
          - The instrument cannot detect below one part per million
          - Mass spectra change with the weather at the sampling site
          - Any result needs a second run the following day

glossary:
  - name: Retention time
    aliases: [retention time]
    def: How long a compound takes to travel the length of the column.

missions:
  - title: Read the formula, not the rumour
    objective: Establish what was released before anybody acts on a guess.
    briefing: A freight yard burned overnight and nobody can say what came off it.
    stake: A wrong identity can cause an incompatible firefighting decision.
    takeaway: Identity is an evidence package, not a guess from colour or odour.
    stops:
      - group: IDENT
        task: From damaged container to provisional identity
        title: Read the formula, not the rumour
        place: Molecular Identification Lab
        scene: >
          Several unlabelled containers were damaged in the fire. Firefighters
          are choosing a suppression agent from whatever identity the lab gives
          them, and some of the wrong answers react with water.
        assumes:
          - a chemical formula lists which elements are present and in what ratio
        takeaway: A name is a claim, and a claim needs evidence that could have come out differently.
        format: PROTOCOL
        # …the format's own fields, below
```

---

## The formats, each with what it must carry

### PROTOCOL — match each situation to its response

```yaml
        format: PROTOCOL
        task: Match each observation to the correct interpretation.
        scenarios:
          - The formula contains a metal cation and a polyatomic anion.
          - Two substances share the same elements but different ratios.
          - An ion has more electrons than protons.
          - A label gives a common name with no composition.
        choices:
          - Likely an ionic compound.
          - They are distinct compounds, not interchangeable names.
          - It is negatively charged.
          - The record is insufficient for hazard prediction.
        mapping: [0, 1, 2, 3]     # scenario i -> choices[mapping[i]]; must be a permutation
        why: Composition, ratio and charge constrain identity; a common name may hide it.
```

### SEQUENCE — put the steps in the order they have to happen

```yaml
        format: SEQUENCE
        task: Order the non-destructive evidence workflow.
        cards:
          - Secure and inventory containers without opening them.
          - Reconcile markings, manifests and chain-of-custody records.
          - Use validated remote or small-sample analytical methods.
          - Integrate records and measurements into a ranked identity list.
        order: [0, 1, 2, 3]       # earliest first; must use every card exactly once
        why: Physical control and records preserve safety and provenance before interpretation.
```

**Write `axis` whenever the order is not chronological.** The panel's default
instruction is "put the N steps in order, earliest first", and the rail is
captioned Earliest → Latest. That is a claim about what the answer is graded on,
and about one ordering item in nine is graded on something else — cost, risk,
reversibility, how much information each move buys. Those cards then sit under an
instruction that sends the player hunting for a chronology that does not exist,
and the real axis is in `takeaway` and `why`, which arrive after the answer.
`axis` replaces the instruction and `ends` the two captions:

```yaml
        axis: Order the four by what each one costs you, cheapest first. This is not a clock — every step is available right now, and the question is which ones you can still take afterwards.
        ends: [Costs nothing, Cannot be undone]
```

Both are optional, and `ends` takes exactly two captions or the importer refuses
it — a rail labelled at one end reads as a bug.

### BALLPARK — an estimate the player assembles from quantities

```yaml
        format: BALLPARK
        question: Estimate the gas volume at ambient conditions.
        estimate:
          prompt: A colourless plume is leaving the yard. Command wants a scale before it draws a corridor.
          question: Estimate the gas volume at ambient conditions.
          labels:
            - 2.0e4 mol  (n, amount released)
            - 8.31 J/mol/K  (R)
            - 300 K  (T, ambient)
            - 1.0e5 Pa  (P, ambient)
            - 22.4 L/mol  (molar volume at STP)   # a distractor: a plausible wrong quantity
          values: [20000, 8.31, 300, 100000, 22.4]
          slots: 4
          template: '{0} × {1} × {2} ÷ {3}'
          formula: a*b*c/d
          correct: [0, 1, 2, 3]
          target: 498.6
          tolerance: 60
          units: m³
          solution: V = nRT/P ≈ 500 m³.
          explanation: The ideal gas law fixes the volume at equilibrium — a scale, not a hazard footprint.
```

Distractor tiles should be plausible *quantities*, not wrong answers. The point
is choosing what belongs in the calculation.

**Four rules the importer enforces, each of them paid for by a shipped defect:**

1. **A tile says what it is worth.** `labels[i]` and `values[i]` are the same
   number — the player clicks the label and the panel adds the value. Any
   notation is fine (`10²²`, `1/2`, `3.0e8`, "12 million", a typeset minus); what
   is refused is a label reading 1025 over a value of 1.025. This is what a
   re-target breaks: `apply-conversions` will not guess at a `labels` list whose
   length changed, so the numbers move and the words stay. Deep Watch shipped a
   panel asking for pressure at ninety metres and grading gallons per minute, and
   ten stops across seven games were like it. Every one rendered perfectly.
2. **`slots` equals the length of `correct`.** A panel that wants three tiles and
   knows two can never be completed.
3. **One relationship per stop, at grade 8 and below.** `relationship: Degrees
   lost = energy lost ÷ energy for one degree. Energy lost = watts × seconds.` is
   two equations and a unit conversion in one panel; `questionLoad` refuses it.
   Put the second step in the verdict, where it is teaching rather than work.
   `node engine/dev/questionLoad.mjs --sweep` lists the multi-step estimates in
   every game at any grade, and fails none of them — a senior course is allowed
   a chain, and it is still worth looking at.
4. **The equation on the card is the one the stop uses.** The chip comes from
   `tools/syllabus.js`, attached by keyword, so a key of `how long` put
   `time = distance ÷ speed` on a stop about a cooling cabin, and `megawatt` put
   `P = IV` on a demand forecast. `validateContent` compares the chip against the
   relationship, the template and the worked solution. If a stop computes
   something the syllabus does not list, **add the equation** rather than
   loosening a key — three of the six games caught this way were wrong because
   the equation was missing, not because the matching was.

### DIAGNOSIS — one explanation that fits the whole panel

```yaml
        format: DIAGNOSIS
        headline: A target compound is reported at 3.1 minutes — and the blank has a peak in the same place.
        task: Which explanation fits every reading, not just the loudest one?
        readings:                 # at least three distinct zones, and not all alarms
          - { zone: Sample, label: Peak at 3.1 min, value: present, status: alarm }
          - { zone: Blank,  label: Peak at 3.1 min, value: present, status: alarm }
          - { zone: Second method, label: Confirmation, value: not detected, status: normal }
          - { zone: Column, label: Pressure, value: steady, status: normal, note: rules out a leak }
        choices:
          - { label: The compound is present in the river sample, mechanism: The peak is real and the blank is coincidence. }
          - { label: The laboratory itself is the source, mechanism: Something in the sequence carries over into every run. }
          - { label: The column is degrading, mechanism: Bleed produces a peak at a fixed time. }
          - { label: Nothing to explain, mechanism: Ordinary variation, no cause needed. }
        answer: The laboratory itself is the source
        why: A peak that appears in the blank was never evidence about the river.
```

The quiet readings are the point: they are what rule explanations out. An answer
may be a pair — `answer: [A, B]` — for a panel no single cause fits.

### SCIENCETANK — spend a hundred points across proposals

```yaml
        format: SCIENCETANK
        task: Fund the evidence that would change a decision.
        proposals:
          - { label: A, text: Confirm the identity with a second method. }
          - { label: B, text: Extend the sediment survey downstream. }
          - { label: C, text: Repeat the same instrument run for precision. }
        recommended: { A: 50, B: 30 }     # must total at least 60, labels must exist
        evidence: |
          What the team already holds, for the player to weigh.
```

### CHOICE / TRIAGE — one question, one right answer

```yaml
        format: CHOICE
        question: Which item on this chart is a measurement?
        choices:
          - The patient says their side hurts.
          - They look worried.
          - Their temperature is 38.4 °C.
          - They skipped breakfast.
        answer: Their temperature is 38.4 °C.
        why: A measurement is a number found with a tool or a careful count.
        rebuttals:                # shown in the verdict, so a wrong answer learns something
          - Pain is important, but it is reported, not measured.
          - Looking worried is an observation.
          - Skipping breakfast is history.
```

Use `TRIAGE` where the question is who to see first; it renders the same way and
reads honestly in a hospital.

### CASEBOOK — match clues to explanations

Same fields as `PROTOCOL`, using `scenarios` + `choices` + `mapping`. A casebook
with no mapping is a `CHOICE`; say so rather than leaving placeholders.

---

## The optional blocks

```yaml
# What is inside each room, if this game has interiors.
interiors:
  IDENT:
    caption: A name is a claim. A claim needs evidence that could have come out differently.
    standLine: Unlabelled drum from the yard. Provisional identity within the hour.
    station:
      kind: panel               # panel | vitals | film
      title: GC-MS bench
      rows:
        - { label: Retention time, value: 7.42 min, status: normal }
        - { label: Library match, value: 91 %, status: high }
        - { label: Second method, value: not yet run, status: low }

# What each place says when the player reads it.
copy:
  IDENT: <p>The identification laboratory. Two instruments and a rule.</p>
```

## Format 2: what the three older games needed

Every game is now a book. Project Y, The Contaminated City and Hospital Heroes
were generated from Word documents or hand-written JS, and `tools/export-book.mjs`
wrote their books out of the games themselves. Five blocks exist because those
three games could not be stated without them, and any book may use them.

```yaml
format: 2       # optional stamp; the importer reads a format-1 book unchanged

# Lessons no mission stop points at. A callback day reaches a "— Review"
# variant by title, so these are content, not spares: 206 of the seven games'
# 425 lessons are unattached, and all of them belong to the older three.
lessons:
  - group: RESP
    title: Count the Breaths — Review 2
    task: Count again, on a patient who is talking
    scene: >
      Noah is back for a check, and this time he can finish a sentence.
    takeaway: A rate is a count and a clock, and the clock has to be the same one.
    format: BALLPARK
    # …no estimate block: the spec comes from `estimatesByTitle` below

# Panels several lessons share, expanded into each of them at load.
packs:
  airway-panel:
    readings: [{ zone: Airway, label: Breathing rate, value: 34, status: alarm }]
    choices: [A narrowed airway, A blocked filter, Nothing is wrong]
    answer: A narrowed airway

# Between-mission funding vignettes.
specialRequests:
  kim: { ask: A second thermometer for the ward, cost: 8, why: … }

# One estimate spec applied by lesson title, across a lesson and its reviews.
# Matched on the base title, so "Count the Breaths — Review 3" uses this too.
estimatesByTitle:
  Count the Breaths:
    prompt: The nurse counts while she rests comfortably.
    labels: [5 breaths (counted), 4 (fifteen-second parts in a minute)]
    values: [5, 4]
    correct: [0, 1]
    target: 20
    units: breaths per minute
```

Three stop-level fields come from the same conversion:

| Field | What it is |
| --- | --- |
| `call` | the plan card's line for this stop — "Talk to Dr. Nguyen" — where it differs from the question's own `task` |
| `setup` | a note carried through from the source document. **Nothing renders it** — it is in the leak checks' word list and nowhere else. Four books write it and two of them mean different things by it (ContamCity an instruction, Hospital "who • where"), which is why no renderer can use it. Do not put anything a player needs here |
| `story` | **write `scene` instead.** The importer fills this from `scene` when a book omits it, and the panel prefers `scene` — so a `story` that differs is 40 to 90 words nothing displays, and every reading-level and giveaway check reads the `scene` beside it. 122 stops in four books are in that state |
| `answerText` | the printed answer key, for a format that does not derive one |

And two rules the importer now applies rather than a parser guessing:

* **A diagnosis with no readings and no figure is imported as a CHOICE**, with a
  warning. 35 of the hospital's lessons were typed DIAGNOSIS by a docx parser
  that had one guess; the engine retyped them at load and the book now says what
  the game plays.
* **`figure` is allowed on any format.** It used to be passed through for
  DIAGNOSIS only, which silently dropped a line chart on a sequence item.

## The book is the source of truth, and that is checked

`node engine/dev/bookParity.mjs <theme>` imports the book into a scratch
directory and compares every export against the content the theme ships. It runs
inside `npm run check`, so a hand edit to a generated file fails the same day it
is made. Two commands, and they are inverses:

```sh
node tools/import-book.mjs books/<theme>.yml <theme>   # book  -> content
node tools/export-book.mjs <theme>                     # content -> book
```

## What is still not in the book

The place itself — `site.js` (outdoor) or `plan.js` (interior) — and the props.
Those are geometry, and they are written as code beside the content. Everything
else a game needs is above.

After importing, run `npm run check <theme>`, then walk into the rooms and
screenshot them. No check in this repo can see a wrong-looking scene.
