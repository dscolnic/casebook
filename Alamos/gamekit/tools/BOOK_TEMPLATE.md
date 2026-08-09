# The book format

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
  arithmetic; without it the panel opens with "not yet converted".
- **`takeaway` never repeats `why`.** The takeaway is shown before the question.
- **The `scene` is what the player reasons from**, and it is shown before the
  question, so it must not contain the answer.

Three stops per mission, fifteen missions, and every stop's lesson lives at the
stop. There is no separate curriculum to index into and therefore nothing to
drift.

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
          Several unlabelled containers were damaged in the fire. The team has
          the manifests, one chromatogram and a blank run in the same sequence.
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

## What is still not in the book

The place itself — `site.js` (outdoor) or `plan.js` (interior) — and the props.
Those are geometry, and they are written as code beside the content. Everything
else a game needs is above.

After importing, run `npm run check <theme>`, then walk into the rooms and
screenshot them. No check in this repo can see a wrong-looking scene.
