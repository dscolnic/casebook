# The canonical interaction blocks — what the build can take, and what it cannot

**All eight bibles. One round. This is about §7 boards only** — no story, no
cards, no questions. Everything else in the September and October rounds landed
and is in the game.

## What happened when we tried to take them

The `Complete format-specific interaction block - canonical source` blocks are a
real improvement on the inline payloads they replace: they parse, they are typed,
and they are the same shape in all eight bibles. So we ran the board builder
across the eight for the first time.

```
                    boards read     boards importable
carrying              60 of 60            23
changeover            60 of 60            28
groundtruth           60 of 60            23
headwater             60 of 60            25
midway                59 of 60            25
planetary             55 of 60            18
red sand              44 of 60            21
the trial             57 of 60            22
```

**Every mission in every campaign was refused**, so none of the new boards could
be taken and the games are still running the previous round's. The blocks are
not wrong; most of them are *incomplete* in the same few ways, and one field
missing on one option is enough for the importer to refuse the stop rather than
ship a panel that cannot be answered.

**VALUE is the exception and it is now in the game** — see the last section for
what made it work, because it is the pattern we would like for the rest.

---

## What each format is missing, most common first

Counts are stops across all eight campaigns.

### DIAGNOSIS — 217
- **93 readings have no `status`.** Nothing separates an alarming reading from a
  quiet one, and the quiet ones are what rule the wrong causes out. Each reading
  needs `status: normal | high | low | alarm`.
- 28 readings have no `label`.
- 25 boards author no rebuttals: a player who rules the wrong thing out is told
  they are wrong and never told which reading contradicted them.

### STRESS — 191
- **47 candidates carry no numeric `scores`** — the panel ranks candidates by
  criterion and there is nothing to rank.
- Assumptions are missing `label`, `min`, `max`, `nominal` — the slider has no
  name and no range.

### TRIGGER — 183
- Anchors need a numeric `at` and a `means` saying what a reading there would
  mean; the scale needs a `label`, so a row is not a bare number.
- Several boards are a ladder of two stages where a trigger board is **one
  rule**: a second action reaches nothing.

### CONTROL — 145
- **22 trials have no `observable`** (and no unit), so the panel calls the thing
  being measured "Reading".
- 16 boards author a `restore` step. The engine has no field for it — tell us
  whether the restore is part of the trial and we will add one, or drop it.
- Needed on every trial: numeric `baseline`, numeric `response`, a `noiseBand`
  (without it a repeat reads identically and repeating teaches nothing).

### SWEEP — 77
- 11 boards never decide `mode`: peak or boundary.
- The axis needs a label, a `min` and a `max`.

### ALLOCATE — 63
- 11 boards offer fewer than three answers; 11 mark nothing `required`, so every
  plan passes; 8 have no numeric `pool`.

### VERIFY — 52
- 13 have no numeric `truth`.
- 13 carry the generated stub as `quantity.label` and `quantity.unit` rather than
  the name of a quantity and a unit.

### CLOUD — 44
- 8 boards have no `bounds`, `centre`, `spread`, `pass` or `actions`. A cloud
  with nothing that narrows it cannot be answered.
- 3 are a settings-and-readings table rather than a scatter; those may be the
  wrong format for the stop rather than a missing field.

### DERIVE — 37
- **Every one of the 37 is the same defect: the keyed line is longer than its
  distractor.** A player who always picks the longer line scores well above
  chance without reading either. Make the two lines the same length, or make the
  distractor the longer one.

### CHAIN — 31 · RESIDUAL — 30 · CHOICE — 27 · PROPAGATE — 27
- Chain links need a `reading` (22) and `transfers` (5).
- 12 residual boards are **the handback template, unchanged**: the same two fits,
  the same RMS pair and the same five residuals in every campaign.
- 12 CHOICE boards have fewer than three options and 12 have no `answer`.
- Propagate inputs need `value`, `sigma` and `sensitivity`.

### DEGENERACY 26 · TRACE 26 · PROTOCOL 20 · CASEBOOK 15 · SCIENCETANK 6 · SEQUENCE 6 · HOLDOUT 4 · BALLPARK 3 · LOB 3
- Degeneracy: no `observable`, no first `locus`, no `second` locus.
- Trace: fewer than two channels depend on the target, and nothing is marked
  independent.
- Protocol: one situation where a matching board needs at least two, and no
  `mapping`.
- Casebook: clues absent from `mapping` — a card the player can never place.
- Sciencetank: fewer than three proposals.
- Sequence: a rail of two cards, and an `order` of a different length from the
  card list.
- Holdout: no `pass` mark.
- Ballpark: `formula` written in tile names (`floor(log(a)/log(b))+1`) rather
  than the engine's slot letters, so the readout evaluates to NaN.
- Lob: no `tolerance.range`, no `charge.max`.

---

## VALUE, which now works, and why

Stop 13 of Planetary Defense is the model. Its block writes:

```json
{ "value": {
  "budget": { "value": 100, "unit": "observing credits" },
  "requirements": [
    { "id": "r1", "text": "measure motion over a longer time interval" },
    { "id": "r2", "text": "constrain distance and motion along the line of sight" },
    { "id": "r3", "text": "constrain size" } ],
  "selection_rule": "Cover every required outcome at the lowest total cost within the budget…",
  "options": [ { "id": "late_optical", "label": "12-frame recovery near dawn",
                 "cost": 30, "covers": ["r1"],
                 "information": "Observes the object later, extending the time interval…" }, … ],
  "accepted_plans": [["late_optical", "radar_range", "thermal_size"]],
  "example_total": 90, "example_reserve": 10 } }
```

Nothing is missing from it, every field is player copy or arithmetic, and the
answer is stated as a plan rather than left to be inferred. We built the whole
path for it this week: the panel now prints the three outcomes under the
selection rule and ticks each one as a package covering it is bought, each
package says what it covers in your words, and the plan is graded on covering
everything for no more than the cheapest accepted plan.

**Please finish the other formats to that standard.** The test for each block is
the one that made VALUE work:

1. Could a player answer the stop from what the block contains, with no other
   knowledge?
2. Is every field either something they read or something the panel computes?
3. Is the correct answer stated in the block, and does it satisfy the block's
   own rules?

## Two smaller notes

- **`example_total` is worth keeping.** It let us check the accepted plan against
  its own arithmetic for free, and it caught nothing this round — which is the
  point.
- **The five stops we could not read at all** (Planetary M14 S55/S56 and three
  in Red Sand) have an inline map fragment inside the JSON — `{ id: fragment,
  label: Separated fragment with clock…}` — where a quoted string was meant.
