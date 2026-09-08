# Whiteout — first read

`WHITEOUT_AP_Computer_Science_A_Campaign_Implementation_Bible_v2.7.md`, read
against the build that runs the other eight campaigns.

**It is in good shape.** 15 missions, 60 stops, a complete roster, six areas with
declared fixtures, and a dramatic spine that actually pays off — the Mission 8
alternating-skip signature resurfacing in the Mission 14 holdout test is the best
piece of long-range plotting in the set. What follows is 16 blocking findings, of
which **12 are one thing**.

---

## 0. Twelve differences that were ours, not yours

Read strictly, the first pass found **zero stops**. None of that was a defect in
your bible — it writes a slightly different dialect from the eight, and the reader
was matching the eight's punctuation literally. All twelve are fixed on our side
and no change is wanted from you:

| what the bible writes | what the reader expected |
| --- | --- |
| `## H1. Stop 1 — Trace the controller` | `## Stop 1 - Trace the controller` |
| `**Call — exact player copy:**` | `**Call - exact player copy:**` (em dash vs hyphen) |
| `**Question card story setup — exact player copy (38 words; 2 sentences):**` | the label with no parenthetical |
| `## I. Mission outcome`, `## K. Quick concept review` | the same headings with no letter prefix |
| `## Opening card — exact player copy` | `### Opening sequence` |
| `- **integer division:** …` as a bullet list | `integer division: …` as paragraphs |
| `### Dr. Elena Park` with `**Role:**` beneath | `### Elena Park — Station director` |
| `**Area ownership:** OPS` | `**Division:** OPS` |

Every hyphen in a label now matches any dash, a section may carry a letter prefix,
a label may carry a note before its colon, a glossary may be a bullet list, and a
roster entry may put the job in a field rather than on the heading. The other
eight bibles lint identically after those changes, and the linter's own 12-case
selftest still passes.

**Keep writing it the way you are.** The explicit form — one field per bullet,
`**Role:**`, `**Area ownership:**` — is easier to read than the eight's and it is
now the reader's problem to accept both.

---

## 1. Twelve VERIFY stops have no measurement (the whole of the blocking list, less four)

Every VERIFY writes a `readings:` table where the build wants a dialled prediction
and a numeric truth. What you have:

```yaml
verify:
  prediction_prompt: "Commit percent and the Boolean value of percent < 70.0 before RUN unlocks."
  readings:
    - {label: "delivered power",    unit: "kW",      expected: "83",   observed: "83"}
    - {label: "calculated percent", unit: "%",       expected: "83.0", observed: "83.0"}
    - {label: "percent < 70.0",     unit: "Boolean", expected: "false", observed: "false"}
  correct_action: "Keep the generator online and repair the percentage code."
```

What the panel is: the player **dials a number**, locks it so it cannot be changed,
then spends to find out what the measurement actually says. So it needs a range to
dial on and one number the measurement will return:

```yaml
verify:
  prediction_prompt: "Commit the percentage the repaired controller will compute."
  predictionRange: {min: 0, max: 100, step: 1, unit: "%"}
  truth: 83
  passRatio: [0.9, 1.1]          # optional: how close counts as a hit
  measurement:
    label: "calculated percent"
    cost: 1
  correct_action: "Keep the generator online and repair the percentage code."
  answerText: "The repaired controller computes 83.0%, so the emergency threshold
               test is false while the generator continues delivering 83 kW."
```

The `readings` you have written are not wasted — they are exactly the right
material for the **verdict**, and several of them read better as the stop's
`why`. What is missing is the one number the player commits to before looking.

Affected: **M1 s4, M2 s8, M3 s12, M5 s20, M6 s24, M7 s28, M8 s32, M9 s36, M10 s40,
M11 s44, M12 s48, M13 s52** — the fourth stop of nearly every mission.

---

## 2. One CHOICE with two correct answers

**M3 stop 11.** Four options, two marked correct:

```
index++;      ← correct
index = 0;
index += 2;
index--;      ← also correct
```

Exactly one key. If the teaching point is that two of them terminate the loop,
that is a stronger question asked as a different format — but as a CHOICE it
cannot be graded.

---

## 3. Two Symbols lines name no symbol

The build reads four shapes and any is fine:

```
`x` position, `t` time          b slope; a intercept          depth in metres
x is the observed value
```

Written instead:

- **M1** — `delivered = measured power; requested = requested power; percent = calculated percentage.`
  The `=` reads as an assignment rather than a gloss. `delivered measured power;
  requested requested power` or ``  `delivered` measured power `` both read.
- **M10** — `n = number of sorted records.` Same shape, one symbol.

These print on the mission card under the equation, as a bold symbol and its
meaning. It is the only place in the game the letters are defined.

---

## 4. One closing card reads above the ceiling

**M1's mission outcome, grade 6.7** against a ceiling of 6.5. It is close, and the
cause is one long sentence — *"The generator is healthy; Java made 83/100 equal 0
with whole-number math"* — carrying a semicolon and a compound clause. Splitting it
in two would clear it.

---

## 5. Things that are right and worth keeping

Recorded so a later pass does not "fix" them:

- **The `code:` block on a stop is new and correct.** No other campaign asks a
  player to read source, and the interaction block carrying the three lines of
  Java beside the question is the right shape for it. The engine does not render
  it yet — that is our side, and it is a small piece of work.
- **The two-sentence setups hold.** 60 of 60, which no other bible in the set
  currently manages.
- **The four stop lines do four jobs.** The reason is about the moment, the setup
  carries the numbers, the connection says what this answer settles, and the
  prompt is only the task. Nothing is repeated between them. This is the first
  bible to arrive that way rather than needing a round to get there.
- **Rebuttals are per option and per mechanism**, not one line reused.
- **No warm-up runs**, stated outright, with the reason: movement is learned inside
  Mission 1. That is a decision the build honours rather than something it has to
  infer.

---

## 6. What we are building around it

Whiteout is scaffolded on **Ice Core's place** — a deep-drilling camp on a polar
plateau — reshaped to Aster Station's six areas: OPS, CODE, POWER, HAB, VEH and
COMMS, plus the four landmark-only spaces. That work is ours and needs nothing
from you; the fixtures you declared are the ids the stops will resolve against, so
the names in §3 will be used exactly as written.

One question worth answering in the next revision: **the Runway Door "stays shut
until final rescue readiness and the canary gate are satisfied"** — should it open
visibly in Mission 15, and does the aircraft arrive on screen? The engine can
open a door on a campaign event, and an ending you can walk out of is worth more
than an ending card.
