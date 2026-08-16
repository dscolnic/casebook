# Interaction manifests, and the nineteen book blocks

Two different things live here, and confusing them wastes a day.

**`TEMPLATE.jsonl` is the design manifest** — one row per design in
`../../FORMATS.md`, saying which scene an interaction replaces, what the player
does, what the failure feedback is, and which character says it. It is the
machine-readable form of the six interaction documents, and four of those
documents name a file exactly like it as their authority over `replaces`. It is
prose about mechanics. Nothing reads it at runtime.

**The book blocks below are what the engine actually loads.** All nineteen
designs are built: `engine/core/instruments.js` renders them and
`tools/import-book.mjs` validates them. `books/instruments.yml` is the worked
example — the Meridian Verification Office, seven days, one stop per format,
with a comment on each stop naming the checks it has to clear.

**One parser rule, learned expensively.** An unquoted comma inside an inline
`{ … }` value used to split it and silently drop everything after the comma, so
`{ landmark: the second door, hinged inward }` arrived as "the second door".
Three shipped books had 36 lines like it. `tools/yaml-lite.mjs` now refuses a
fragment with no colon in it — quote any inline value containing a comma.

**Read `books/instruments.yml` before writing one of these.** This file is the
field list; that file is the sentence.

---

# The nineteen, as a book writes them

Every stop takes the ordinary lesson fields — `group`, `task`, `title`, `place`,
`scene`, `assumes`, `takeaway`, `format`, `question`, `why` — plus the block
below, plus **`answerText`**. All nineteen require `answerText`: they are graded on
an action rather than on a labelled option, so without it the verdict tells the
player they were wrong and never tells them what right was.

The **trap** on each is the importer check that makes a bad choice cost
something. `npm run traps` breaks all thirty-five of them and asserts the
importer refuses each. A format whose bad choice costs nothing renders
perfectly, grades perfectly, and teaches the opposite of what it was written
for — which is why these are checks and not advice.

## `trigger:` — write the rule before the number moves

```yaml
scale:      { label, unit, min, max, step }
conditions: [{ id, label, leadHours, owner, action }]     # >= 2
stream:     [{ at, update, value, hoursLeft }]            # >= 3, hoursLeft never rises
hint, release, commit
```
Graded on: every stage fires at an update that still has its own `leadHours` in
hand. **Traps:** `scale.max` must exceed the stream's highest value, or every
threshold fires and no rule can be written badly; and each stage needs some
update arriving with its lead time left, or it cannot be got right.

## `value:` — what would this measurement change?

```yaml
budget:  { amount, unit }
decision: <the thing being decided>
options: [{ id, label, cost, axis, decisive, irreversible, reveals }]   # >= 4
```
Graded on: every `decisive` option bought, inside budget. **Traps:** the board
must cost more than the budget; at least one option decisive and all of them
together affordable; at least two distinct `axis` values, because buying more of
the same axis is the mistake.

## `cloud:` — a distribution against a boundary

```yaml
bounds:  { min, max, unit, label }
centre, spread, pass          # pass is a fraction, 0–1
actions: [{ id, label, effect: shift|narrow, amount, cost }]   # >= 2, >= 1 narrow
seed, costUnit, hint, commit
```
`shift` moves the centre toward the corridor's middle by `amount`; `narrow`
multiplies the spread by it. **Traps:** applying every shift and no narrow must
fall short of `pass` — otherwise re-centring works and the lesson inverts; and
applying everything must clear it.

## `allocate:` — a finite pool across competing claims

```yaml
pool:    { amount, unit, mode: scalar|integrated }
items:   [{ id, label, cost | (rate + hours), protected, note }]   # >= 4
answers: [{ question, requires: [item ids], required }]            # >= 3
```
`integrated` computes cost as `rate × hours`, which is the whole of "you saved
watts, I asked you to save watt-hours". **Traps:** the board must cost more than
the pool; the protected items must fit; at least one answer `required` and at
least one not; and no required answer may be covered by the protected items
alone, or the plan passes before the player chooses anything.

## `trace:` — does agreement mean independence?

```yaml
channels:    [{ id, label, reading, depends: [resource ids] }]   # >= 4
resources:   [{ id, label }]
independent: [channel ids]
target:      <resource id>
```
Graded on: the named resource **and** the kept set matching `independent`
exactly — the right source with the whole fortnight thrown away is its own
mistake. **Traps:** at least two channels sharing the target; at least one
independent; and no channel may name its own dependency in its label or reading.

## `attest:` — the record is not the condition

```yaml
checks: <how many verifications the clock allows>
claims: [{ id, label, signedBy, evidence, critical, backed }]    # >= 5
```
A claim cannot be held without being verified first. **Traps:** `checks` fewer
than the claims, or there is no decision about where to look; at least one
critical claim unbacked, and no more of them than `checks`; and at least one
critical claim that *is* backed, or holding everything critical passes.

## `control:` — change one thing, hold the rest, reverse it

```yaml
observable: { label, unit }
variables:  [{ id, label }]          # >= 3
held:       [what is held constant]
truth, baseline, response, noise
run, commit
```
Changing several at once is allowed and reports *ambiguous*. The commit is
refused until the suspect has been taken out and put back. **Trap:** `response`
must clear `noise` by more than 3×, or a trial is a coin toss.

## `triangulate:` — several constraints, one region

```yaml
stations:   [{ id, label, x, y, distance, observation }]   # >= 3
truth:      { x, y }
tolerance, unit
systematic: { id, label, appliesTo, delta }
```
Graded on: a marker within `tolerance`, three constraints switched in, and the
systematic corrected. **Traps:** each station's `distance` must put its ring
through the truth within tolerance, or the region does not contain the answer;
and `systematic.delta` must exceed the tolerance, or correcting it changes
nothing.

## `degeneracy:` — many solutions, one observable

```yaml
controls:   [{ id, label, min, max, step, unit }]   # exactly 2
observable: { label }
locus:      [{ a, b }]                              # >= 5
second:     { label, apply, locus: [{ a, b }] }     # >= 3
truth:      { a, b }
tolerance:  { a, b }
still:      [what is still inferred afterwards]
```
The second locus is not drawn until it is applied. **Traps:** at least three
locus points outside the answer tolerance, or the measurement was never
degenerate; and both loci must pass through the truth, or the crossing is not
the answer.

## `chain:` — trace the path, name the governing link

```yaml
links:      [{ id, label, transfers }]   # >= 4
order:      [link ids]                   # a permutation of them
governing:  <link id>
distractor: <link id — the large obvious member somebody names instead>
```
**Traps:** `distractor` must differ from `governing`, and `governing` may not be
first in the order — "the first thing in the list" is answerable without reading.

## `balance:` — close the ledger, find the hidden term

```yaml
total:   { amount, unit, label }
streams: [{ id, label, value, display, note, hidden, countable, unitNote }]
tolerance
```
Reading is free; counting is the claim. `countable: false` marks a row that is a
**different quantity** — a purity among mass flows, a rate among totals. It is
offered exactly like the others, cannot be counted once read, and is excluded
from the ledger arithmetic. It came out of a returned conversion sheet and is the
hardest row on a balance board. **Traps:** the countable streams must sum to the
total (at least three of them), **and** the non-hidden ones must not — otherwise
leaving the hidden term out still passes.

## `verify:` — predict, act, measure, compare

```yaml
prediction:   { label, unit, min, max, step }
truth
passRatio:    [lo, hi]        # brackets 1: [0.6, 1.6] is "within about half again"
intervention: { label, note, outcome }
measurement:  { label, note, cost, costUnit }
unmeasuredMoral
```
The intervention always succeeds and the commit is enabled before the
measurement, on purpose: reporting without measuring is a thing the player can
do and it is graded as its own failure. **Traps:** `truth` inside the prediction
range, and some prediction in that range must fall outside `passRatio`.

## `propagate:` — the error budget

```yaml
output:     { label, unit }
inputs:     [{ id, label, value, unit, sigmaFrac, exponent }]      # >= 3
improvable: [{ id, label, cost, newSigmaFrac }]                    # >= 2
dominant:   <input id>
```
An `improvable` with no `newSigmaFrac` is a measurement that cannot be made this
season, which is the honest shape of the choice. **Traps:** `dominant` must be
the widest `exponent × sigmaFrac` (the importer computes it), it must *not* be
the term with the largest exponent, and it must be buyable.

## `stress:` — the choice that survives being wrong

```yaml
assumption: { label, unit, min, max, nominal, step }
criteria:   [{ key, label, unit }]                   # >= 2
candidates: [{ id, label }]                          # >= 3
scores:     { <candidate id>: { <criterion key>: value } }
feasible:   { <candidate id>: <the assumption value it needs> }
optimiseOn: <criterion key — the one the nominal makes look best>
robust:     <candidate id>
```
**Traps:** exactly one candidate may survive `assumption.min`, and it must be
`robust`; and `robust` must not also win on `optimiseOn` at the nominal, or
choosing well costs nothing.

## `delegate:` — a finite team against evolving problems

```yaml
team:         [{ id, label }]                         # >= 2, and >= problems - 1
firstActions: [{ id, label }]                         # >= 3
problems:     [{ id, label, trend, rate, consequence, irreversible, loud }]   # >= 4
first:        <problem id>
```
A handover needs an owner, a first action and a return condition; two of the
three is "watch it" and the commit refuses it. **Traps:** exactly one problem
rising *and* irreversible, and it must be `first`; and at least one problem
`loud` and not rising, or the alarm and the priority are the same thing.

## `fly:` — bounded commands on undamped dynamics

```yaml
state:  { label, unit, init }
rate:   { label, unit }
accel
pulse:  { min, max, step, unit }     # the drive pulse, applied again to brake
brake:  { min, max, step, unit }     # the state value at which braking begins
target, tolerance, rateTolerance, budget
```
Accelerate for `pulse`, coast, brake for `pulse` from `brake`. **Traps:** some
combination inside the ranges and the budget must land on target; and braking at
the target itself must overshoot by more than `tolerance`, or waiting until it
arrives is correct and the format has no lesson.

## `residual:` — structure in what is left over

```yaml
fits:   [{ id, label, rms, structured, residuals: [{ x, y, value }] }]   # >= 2, >= 5 points
accept: <fit id>
```
**Traps:** the lowest-RMS fit must not be `accept` and must be marked
`structured`; `accept` must not be.

## `inject:` — measure your own blind spot

```yaml
population: { n }
metric:     { label, unit }        # deliberately not the detection count
configs:    [{ id, label, detections, metric }]   # >= 3
best:       <config id>
blindSpot:  <what never comes back, in any configuration>
```
**Traps:** `best` must be the highest on `metric`, and it must *not* be the one
with the most `detections`.

## `route:` — a sequence that survives an interruption

```yaml
stops:          [{ id, label, landmark }]    # >= 5, landmarks all different
order:          [stop ids]                   # a permutation
interruptAfter: <how many placements before the door jams>
resumeAt:       <stop id — must be later in the order than interruptAfter>
detour
```
Graded on both halves: the order, and naming where the detour left you from its
landmark alone. **Traps:** no two landmarks alike, the detour must drop the
player ahead of where they stopped, and the labels must not all be numbered.

---

# The manifest envelope

`TEMPLATE.jsonl` carries all nineteen as design manifests. Its `data` block is
superseded by the schema on this page for every one of them; what it still adds
is the prose the schema cannot hold — which scene an interaction replaces, what
the failure feedback is, and which character delivers it.

```json
{
  "id": "m05.s1", "kind": "interaction", "design": "BALANCE",
  "replaces": "m05.s1+m05.s2", "mode": "interactive_then_question",
  "title": "...", "goal": "...", "world": [...], "actions": [...],
  "data": { ... }, "success": "...",
  "failures": [{ "action": "...", "consequence": "...", "who": "...", "line": "..." }],
  "followup": { "prompt": "...", "answer": "..." }, "cast": [...], "assumes": [...]
}
```

`replaces` is authoritative and literal: **the replaced question is never also
asked.** Every one of the six documents states that rule in its own words, and
it is the failure they all warn about.
