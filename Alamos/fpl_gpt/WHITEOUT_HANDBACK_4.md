# Whiteout — round 4

v2.10 cleared everything round 3 asked for except the M14 instrument boards, and
the count fell hard once the build stopped misreading three of your shapes.

```
                                   round 3    on arrival    now
findings blocking the import          37          21          9
stops involved                        11           9          5
```

**Nine findings on five stops, and that is the whole list.** Twelve of the
twenty-one were ours and are fixed below; no change is wanted for those. The
nine that remain are all one field or one decision each.

---

## 0. Twelve that were ours, not yours — no action

Every one was the build reading a field under a name you never used. Recorded so
you do not "fix" boards that are already right.

| Board | What we were doing wrong |
| --- | --- |
| CASEBOOK ×3 | Your `mapping` is keyed `{clue_id: choice_id}`; the panel grades by **position**, so it needs indexes into `choices`. We had no converter at all, so the clue rows and the interpretations were flattened into one list of eight options — every clue offered as an interpretation of itself — and the board was then refused for a mapping that covered no clue. Keep writing it keyed; it is the readable way and it converts now. |
| TRACE ×3 | You write `resources:` outright and `depends: [ar2]` per channel, which is the game's own shape. The converter was rebuilding the resource list from `dependency` / `resource` / `upstream` — three names you never use — which emptied every `depends` array and reduced four labelled resources to one. Hence "fewer than two channels depend on the trace target" about boards that put two on it explicitly. |
| RESIDUAL ×3 | Three renames: `error` is the panel's `rms`; `points: [{x, residual}]` is its `residuals`; and a one-dimensional strip has no `y`, which we were treating as required and so threw all eight points away. We also now read `structured: false` on exactly one fit as naming the fit to accept, so `accept:` is not needed when you have said it the other way round. |
| STRESS ×2 | Candidates written with `name:` and no `id:` were being **dropped**, so M14 s2 arrived with an empty candidate list. The id is now the name slugged. `robust: "Backward removal"` is matched against the labels as well as the ids. |
| BALLPARK ×1 | You write the tile bank as two parallel lists (`labels:` / `values:`), which is the importer's own shape; the converter only read `tiles: [{label, value}]` and so saw no bank. `slots: ["…"]` is now read as a count of 1, and `template: "about {checks} checks"` is numbered to `"about {0} checks"`. |

Each of those now carries a selftest case that fails if the misreading is put
back, so none of them can return quietly.

---

## 1. M4 stop 3 — ATTEST has nothing to hold against

```
✗ no critical claim is backed — holding every critical claim passes without reading anything
```

The board as written:

```yaml
claims:
  - {id: c1, label: "input may be empty",                    backed: true,  critical: false}
  - {id: c2, label: "returned list preserves input order",   backed: true,  critical: false}
  - {id: c3, label: "method never changes the input list",   backed: false, critical: true}
  - {id: c4, label: "method always returns exactly three values", backed: false, critical: true}
```

`critical` and `backed` line up exactly, so **"hold everything critical" is a
winning rule that requires reading nothing.** The format only teaches when the
two lists cross: one claim that matters *and* is already evidenced, so a player
spending a check on it has wasted it.

The smallest change is to make one of c1/c2 critical:

```yaml
  - {id: c2, label: "returned list preserves input order",
     evidence: "comment plus two order tests", backed: true, critical: true}
```

Then `checks: 2` buys exactly the two unbacked critical claims out of three
critical ones, and the decision is where to look rather than what to tick.

## 2. M10 stop 1 — the BALLPARK bank cannot be assembled

```
✗ estimate `correct` names a value index that does not exist
```

and four more the converter owes but does not block on:

```
· tile 2 has no numeric `value` — it reads "2^10 = 1024", an expression rather than a number
· the `formula` is written in tile names, not the engine's slot letters, so the readout is NaN
· no `units`
· no `correctResult` — the worked answer shown after the verdict
```

The panel is a **number bank and a printed row with blanks in it**. The player
drags tiles into the blanks; the engine evaluates `formula` over the slot
letters and compares the result with `target ± tolerance`. So every tile is a
bare number, `correct` names which tiles fill the blanks by index, and the
formula is written over `a`, `b`, … not over the tile names.

Written as the panel reads it:

```yaml
estimate:
  labels:  ["table size", "records eliminated per check"]
  values:  [1024, 2]
  slots:   2
  template: "log{1}({0}) ≈ {checks} checks"   # or "about {0} halvings of {1}"
  formula: "log(a) / log(b)"                   # over the slot letters, in order
  correct: [0, 1]                              # indexes into `values`
  target: 10
  tolerance: 1
  units: "checks"
  correctResult: "log2(1024) = 10, so at most ten midpoint checks."
```

`correct: 10` is the answer, and the answer already has a field: `target`.

## 3. M12 stop 1 — VALUE buys six of the same thing

```
✗ every value option needs a label, an `axis` and a numeric cost
✗ every value option asks about the same axis — buying more of the same is the trap
```

This is the same note as M4 stop 1 in round 3, which you fixed there. The six
rescue-message items carry `label` and `cost` and no `axis`, and without it the
board cannot distinguish "spend on a second operational reading" from "spend on
a different **kind** of evidence" — which is the whole decision this stop is
about, because the PII item and the debug dump are not expensive versions of the
same thing, they are different categories of cost.

Your own stop text already names the axes:

```yaml
options:
  - {id: runway,  label: "runway surface state",        axis: "landing surface",  cost: 2, required: true}
  - {id: weather, label: "crosswind and visibility",    axis: "flight conditions", cost: 2, required: true}
  - {id: power,   label: "station power endurance",     axis: "station endurance", cost: 2, required: true}
  - {id: medical, label: "medical passenger count",     axis: "casualty load",     cost: 2, required: true}
  - {id: pii,     label: "names and birthdates of all 28 people", axis: "personal data", cost: 5}
  - {id: debug,   label: "full controller debug dump",  axis: "diagnostics",       cost: 6}
```

Worth adding at the same time (advisory, not blocking): **all six options have
no `reveals`.** Buying one changes nothing on the card, so the panel is a
shopping list rather than an investigation. One line each — what the crew
actually learns — makes the ten seconds feel spent.

## 4. M14 stop 1 — HOLDOUT is a different instrument from the one you wrote

```
✗ holdout needs axis.min and axis.max, with max greater than min
✗ holdout needs at least five authored points in `fit`
✗ the HOLDOUT board could not be read
```

**This one is a decision, not a field.** It is the only place in the bible where
the format name means two different things.

What you wrote is a **comparison**: two rollback implementations, five fit cases
and five held-out cases each, pass rule 5/5. What the engine's HOLDOUT renders
is a **tuning**: one axis the player slides a line along, two score curves over
that same axis — the set the line was chosen on, and a sealed set — and the trap
is that the position scoring best on the first scores worse on the second. The
player freezes the line, the sealed curve opens, and they report the honest
number. There is no knob in your board and your two curves live on different x
ranges (1–5 and 6–10), so there is nothing for the line to move along.

Two ways out, and we would take the second.

**(a) Keep HOLDOUT, give it a knob.** The axis has to be something about the
rollback that can be *tuned*, with a spike where over-fitting lives:

```yaml
holdout:
  axis: {label: "records scanned back before deciding", unit: "records", min: 1, max: 12, step: 1}
  unit: "%"
  fitLabel: "development cases"
  testLabel: "held-out adjacent-run cases"
  fit:  [{at: 1, value: 82}, {at: 4, value: 96}, {at: 6, value: 99}, {at: 8, value: 97}, {at: 12, value: 95}]
  test: [{at: 1, value: 80}, {at: 4, value: 93}, {at: 6, value: 71}, {at: 8, value: 94}, {at: 12, value: 93}]
  pass: 90          # never printed on the card — it is grading slack
```

The spike at 6 is the point: best on the cases that chose it, worst on the ones
that did not.

**(b) Keep your content, change the format to VERIFY.** Your own stop text is
already a verify: *"Freeze both implementations, reveal test outcomes, and judge
them against the numeric rule requiring five of five exact held-out
restorations."* Commit a number before looking, then pay to look:

```yaml
verify:
  prediction_prompt: "Commit how many of the five held-out cases forward rollback restores exactly."
  predictionRange: {min: 0, max: 5, step: 1, unit: "cases"}
  truth: 0
  measurement: {label: "run the held-out suite against forward rollback", cost: 1}
  correct_action: "Reject forward rollback; backward rollback passes 5 of 5."
```

That keeps the reversal beat intact — five for five on the development cases
makes 5 the obvious commit, and the sealed set returns 0 — and it keeps the
mission's own numbers. VERIFY is unused elsewhere in Mission 14 (s2 STRESS,
s3 RESIDUAL, s4 DIAGNOSIS), so nothing repeats.

## 5. M14 stop 2 — STRESS needs a failure point per candidate, and a criterion to optimise on

```
✗ 3 candidates survive the whole range, so the slider decides nothing and the board is a CHOICE
✗ every candidate needs a numeric "survive both criteria over run lengths 1 through 4" score
```

Two things, and the board has the material for both.

**`values:` is richer than the panel can read.** You write per-candidate rows —
`[{at: 1, ok: true, inspections: 8}, {at: 2, ok: false, …}]` — and the twelve
inspection limit lives in a criterion's prose (*"Uses no more than 12
inspections at run length 4"*). Nothing machine-readable says an inspection
count of 15 is a failure, so the build cannot work out where each candidate
breaks without parsing your sentence, which it will not do. One number per
candidate says it outright:

```yaml
candidates:
  - {name: "Forward removal",  feasible: 1, scores: {correctness: 0.0, efficiency: 1.0}}
  - {name: "Hold index",       feasible: 3, scores: {correctness: 1.0, efficiency: 0.0}}
  - {name: "Backward removal", feasible: 4, scores: {correctness: 1.0, efficiency: 1.0}}
```

`feasible` is **the largest adjacent run the candidate still survives** — the
panel greys a row the moment the slider passes it. Forward removal fails at 2,
so 1; hold index reaches 15 inspections at 4, so 3; backward removal holds to
the top of the range. Keep `values:` as well if you want it; it is good material
for the verdict.

*(A note from our side: our slider currently reads the pessimistic end as the
**bottom** of the range, and yours gets worse upwards. We are adding
`assumption: {worst: max}` so a board can say which end is the hard one — that
is ours, not yours, and it does not change the shape above.)*

**`optimiseOn` has to name a criterion key.** It reads:

```yaml
optimiseOn: "survive both criteria over run lengths 1 through 4"
```

which is a description of the answer. The field names **the column everybody is
looking at when the slider is at the nominal** — the number that makes the wrong
candidate look best before anything is stressed. Here that is `efficiency`:

```yaml
optimiseOn: "efficiency"
```

with the scores stated at the nominal, where forward removal's eight inspections
look as good as anything. If the aggregate scores you have written are meant to
summarise the whole range, they give the answer away in the table — forward
removal's `correctness: 0.0` is visible before the slider moves — so nominal
values are the stronger board as well as the readable one.

---

## 6. Not blocking, worth a pass

- **Four DIAGNOSIS boards give no reading a `status`.** The format works by
  ruling explanations out with the readings that are *quiet*; with every reading
  unmarked there is nothing to rule out with. `status: alarm | watch | normal`
  per reading.
- **The same four author no rebuttals.** A player who rules the wrong thing out
  is told they were wrong and never told which reading contradicted them.
- **One DIAGNOSIS keyed option is 57 characters against a longest distractor of
  36.** The longest option must not be the key; it is answerable by shape.
- **M14 s3's RESIDUAL fits carry no `label`.** The tabs currently read "Forward
  remove" and "Backward remove", which is the id set in words by us. Your own
  stop calls them the forward and backward routines — one line each and the tab
  says what a player reads. The board also has no `hint`, and the engine's
  fallback calls every residual a reference star on a focal plane, which belongs
  to a different campaign.

---

## 7. On our side

- The place is built and the six modules are wired; all 33 declared fixtures and
  all 60 placements resolve from your own placement lines.
- 60 of 60 boards convert. Nine still owe a field, and every one of those is in
  section 1 or section 6 above.
- **The `code:` blocks still do not render.** That is ours and it is next. Worth
  confirming one thing while you are in the file: v2.7 carried Java source on
  several stops and v2.10 carries none. If that was deliberate, say so and we
  will stop building for it; if it was lost in a revision, the AP Computer
  Science stop that shows three lines and asks what `percent` holds is the best
  thing in the bible and should come back.
- **The Runway Door** is still unanswered from rounds 2 and 3: should it open
  visibly in Mission 15, with the aircraft arriving on screen? The engine can
  open a door on a campaign event, and an ending you walk out of is worth more
  than an ending card.

Nine findings, five stops. Once they clear, Whiteout imports and we can walk it.
