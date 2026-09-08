# What to hand back — round 13

Round 12 landed almost completely. Four campaigns lint clean; the rest are down to
six findings between them. What follows is one big item and one small one, plus a
new measurement the build now runs on every check.

```
                       blocking
midway_v2                   0     clean
headwater_v2                0     clean
planetary_defense_v2        0     clean
redsand_v5                  0     clean
carrying_v2                 1     a Symbols line
changeover_v2               1     a Symbols line
groundtruth_v2              1     a Symbols line
the_trial_v2                2     two Symbols lines
```

Also fixed since round 12, recorded so it is not re-sent: the CHOICE stops that
"had no options" and the operated formats that "had no payload" were **our
linter's fault, not yours** — it could not read options authored as
`- {id: …, label: …, correct: true}`, could not see a block written below the §7
line, picked up a figure's JSON fence instead of the board, and took the first of
two interaction blocks. All of those now read correctly. Sorry for the four rounds
of chasing them.

---

## 1. The four stop labels have four different jobs, and two are being written as one

**This is the whole of what is left to write, and it is on nearly every stop in
every campaign.**

Every stop carries four player-facing lines. They are four different jobs, and no
two of them should be able to be swapped:

| label | its one job | test it against |
| --- | --- | --- |
| **Stop reason** | **why this task, now** | Would it change if the player arrived on a different day, or after a different result? If not, it is not a reason. |
| **Question card story setup** | **the situation** — what is in front of the player, with the numbers | Could somebody start work from this alone? It carries the givens. |
| **Question card story-science connection** | **what the answer settles** | Does it name *this* quantity and the decision it feeds? If it would fit any question of the same format, it is not a connection. |
| **Question card prompt** | **the task** | Does it say what to submit, in what form and unit — and nothing about how to get there? |

On the card the player sees the situation first, then the reason and the
connection joined into one short paragraph, then the task. So the reason and the
connection sit side by side: if either restates the situation, the repeat is
visible in the same breath.

What is happening instead is that **two of the four are written per FORMAT rather
than per stop**:

```
Stop reason        sentence 1 — about this stop      sentence 2 — about the format
Story setup        about this stop
Story-science      about the format
  connection
Prompt             about this stop
```

Measured across all 480 stops:

| | stops | distinct sentences covering them |
| --- | --- | --- |
| Story-science connection repeated within its own campaign | **470** | 27 |
| Reason's closing sentence repeated within its own campaign | **472** | 27 |
| Reason opens with the setup's own first sentence, word for word | **314** | — |

The most-used sentences, and how many stops each appears on:

```
×85  "Work through the calculation line by line now, before its result is used to
      set an operating decision."                              every DERIVE stop
×85  "Writing each transformation exposes sign, unit, and dependency mistakes
      before the final value guides an operational decision."  every DERIVE stop
×44  "Calculate the requested estimate now so the team can compare it with the
      limit that controls the next action."                    every BALLPARK stop
×43  "Using the stated inputs and units puts the estimate on a scale the team can
      compare with the operating limit."                       every BALLPARK stop
×38  "The next action depends on selecting the conclusion that fits all of those
      facts."                                                  every CHOICE stop
```

A player meets the same sentence 85 times in a fortnight. It is the same defect we
removed from the engine two rounds ago — the panel used to print a generic
paragraph per format and that is now deleted — except this time it is authored.

**By campaign:**

```
                   reason repeats setup   connection repeated (distinct)
carrying_v2              59 of 60              53 (24 sentences)
headwater_v2             48                    44 (24)
groundtruth_v2           46                    53 (19)
midway_v2                46                    48 (24)
the_trial_v2             41                    54 (19)
planetary_defense_v2     39                    54 (24)
changeover_v2            31                    55 (17)
redsand_v5                4                    53 (23)
```

**Red Sand is the model for the first column** — 4 of 60 rather than 31–59 —
because its reason and its setup are about different things:

```
reason : Before the plant can compare its records, classify the four sample symbols
         so the ledger counts atoms, molecules, and ions correctly.
scene  : This gives every later calculation a trustworthy starting point. Compare
         every option with the complete displayed evidence before choosing…
```

No campaign is yet a model for the second column.

**What each line should carry:**

- **Stop reason** — why this task, now. One sentence, about the state of the
  campaign at this moment. Drop the format sentence entirely: the panel already
  tells the player how the instrument works.
- **Story-science connection** — what *this* answer settles. Name the quantity and
  the decision it feeds: *"A z of 2 says this hospital is two of its own standard
  deviations slow, which is what lets the board compare it with a site whose
  baseline is different."* Not what derivations do in general.

The build now **de-duplicates the verbatim repeat** — a sentence already in the
setup is not printed again below it — so the 314 are no longer visible to a
player. The 470 boilerplate connections are still visible and cannot be fixed
anywhere but in the bible.

---

## 2. A derivation may not substitute a number nobody was given

**New measurement, now part of every build** — `engine/dev/deriveGivens.mjs`,
ratcheted so a campaign may not gain one.

A derivation's numbers enter at one step: the substitution. Every line after it is
a result, and working those out is the exercise. So the first keyed line carrying a
number is checked against everything the player has read by then — the mission
card, its terms and equations, the stop's own reason, setup and prompt, the
derivation's `start`, `goal` and `givens`, and every earlier stop including its
answer.

**78 of 158 derivations fail it**, in two distinct ways:

```
                     substitutes an     reaches a number without
                     ungiven number     ever substituting one
overwind                   12                    0
darkfibre                   8                    0
the_trial_v2                8                    0
groundtruth_v2              8                    4
headwater_v2                8                    1
slackwater                  7                    0
midway (shipped)            4                    4
changeover_v2               4                    1
midway_v2                   2                    1
planetary_defense_v2        1                    0
```

**The reported example**, Ground Truth M1 S2:

```
prompt  "Start with E_y=E_1y+E_2y … submit the signed field in kV/m."
step 1   E_y = E_1y + E_2y
step 2   E_y = (-3.0) + (-1.5) kV/m      ← -3.0 and -1.5 appear here for the first time
step 3   E_y = -4.5 kV/m
```

Nothing anywhere says what the two layers read. The stop before it normalises four
channels at ±4.1 to ±4.3, so those are not the values either. The player cannot
derive line 2; they can only notice which option keeps both signs negative.

**The second kind** is a derivation that runs symbolically to the last line and
then produces a value: `ΔV = +3.60e8 V` after three lines of algebra, with no
substitution step anywhere. There is nothing for the player to check.

**Two fixes, either is enough per stop:**

1. **Give the derivation its `givens`** — `givens: ["E_1y = -3.0 kV/m (upper layer)",
   "E_2y = -1.5 kV/m (lower layer)"]`. They print as line 0 of the rail, so the
   numbers are on screen before the step that substitutes them.
2. **Have the previous stop produce them.** Ground Truth M1 S2's own reason says
   *"the model contains an upper positive layer and a lower negative layer"* — if
   stop 1 normalised those two layers rather than four unrelated channels, the two
   stops would be one chain instead of two.

Shipped Ground Truth passes 10 of 10, so the hand-written derivations already do
this; the generated ones do not.

---

## 3. The one blocking rule left: five Symbols lines

Five equation blocks in four bibles have a Symbols line that names no symbol. The
build reads four shapes and any is fine:

```
`x` position, `t` time, `v` velocity     b slope; a intercept; r correlation
x is the observed value; SD is its spread    depth in metres, area in square metres
```

What is written instead:

- **The Trial M8** — `p0 null rate; other symbols as above.` and **M9** —
  `q-hat=1-p-hat; subscripts mark arms.` A cross-reference is not a gloss; the day
  card is often the only place a reader meets these letters.
- **Ground Truth M2** — `E field, dA outward area element, q_enc enclosed charge, ε₀=8.85e-12…`
  reads correctly until the constant, where `ε₀=8.85e-12` runs the symbol into its
  value and the parser can no longer separate them. `ε₀ permittivity of free space
  (8.85e-12 F/m)` would read.
- **Changeover M2** — `nominal GDP current-price output; real GDP base-price output.`
  Two-word symbols; needs the symbol separable from the gloss.
- **Carrying M7** — `water loss, input volume, and metered output volume are
  measured quantities.` Names the quantities without glossing any.

---

## 4. Unchanged from round 12

- **Carrying's placement** — 19 calculations sited on person stops. A calculation
  wants a bench or an instrument, not somebody's shoulder.
- **Warm-up runs with no story** — Headwater, The Trial and Ground Truth, days 4,
  8 and 13. Each needs a title and a `why` in the `warmups` block.
- **The Trial's opening card** ends on a 36-word sentence, over the pile-up limit.
- **Figures** — 92 are authored and every well-formed one now draws. `bars` takes
  `bars: [{name, value}]`, not `series`/`points`; `line` and `peaks` take the
  series form. The questions that most want one are those describing a shape in
  words.
