# What to hand back — round 12

Round 11 landed. All eight campaigns import, play end to end, and pass every
placement, person-stop and reachability gate. Two of them now lint completely
clean.

What is left is 56 findings across six bibles, and **44 of them are two problems**.

```
                       blocking   what they are
midway_v2                   0     clean
headwater_v2                0     clean
changeover_v2               2     symbol lines
redsand_v5                  3     symbol lines
groundtruth_v2              6     symbol lines
the_trial_v2                7     2 CHOICE stops, 3 symbol lines
planetary_defense_v2       15     7 CHOICE stops, 3 operated formats
carrying_v2                23     16 symbol lines, 3 CHOICE stops
```

---

## 1. Fixed, and worth knowing it worked

Recorded so this is not sent back a third time.

| | round 10 | now |
| --- | --- | --- |
| `, under the same displayed conditions` | 117 | **0** |
| One-sentence story setups | 321 | **1** |
| Missions naming no story event | 18 | **0** |
| SEQUENCE prompts reciting their own cards | 2 | **0** |
| Wrong-shaped figures | 4 | **0** |
| Changeover M15's change naming no bar | 1 | **0** |

**The derivations are the headline.** A player who never reads a line and always
picks the shorter one now scores at or near the coin:

| campaign | round 10 | now |
| --- | --- | --- |
| Midway | 99% | **54%** |
| Ground Truth | 91% | **56%** |
| The Trial | 88% | **51%** |
| Headwater | 80% | **50%** |
| Changeover | 61% | **54%** |
| Planetary Defense | 100% | 75% *(only 4 steps — too few to read much into)* |

Midway went from the worst in the set to level: 35 of its 40 two-candidate steps
are now the same length either side. That is the fix working exactly as asked —
the distractor written out at the same detail as the keyed line, rather than the
answer trimmed to match.

---

## 2. Planetary Defense: ten stops that cannot be built as written

**The largest remaining item, and it is only in this bible.**

Five CHOICE stops declare the format and list nothing to choose between:

```
M2 stop 6      M2 stop 8      M3 stop 10      M8 stop 31      M13 stop 51
```

Four options each, exactly one marked `(correct)`, and a rebuttal against each
wrong one.

Two more have options but no wrong-path feedback — **M1 stop 1** and **M3 stop 9**.
One rebuttal per wrong option; the rebuttal is the only teaching a wrong answer
carries.

Three operated formats declare a format and supply no board:

```
M4 stop 13   VALUE          M4 stop 16   SCIENCETANK        M5 stop 18   SWEEP
```

An operated format needs its interaction payload written out — the numbers and
lines the panel is physically made of. Six of the original nine were written this
round, so the shape is established; these three were missed.

---

## 3. The Symbols line, in four bibles

**30 equation blocks.** The line exists in every case — this is not a missing
field — but it names no symbol that can be read off it.

The build now reads four shapes, and any of them is fine:

```
`x` position, `t` time, `v` velocity        ← backticked, the clearest
b slope; a intercept; r correlation          ← symbol then gloss, no marks
x is the observed value; SD is its spread    ← sentence form
depth in metres, area in square metres       ← quantity and unit
```

What is being written instead, by campaign:

**Carrying Capacity — 16, and it is one mechanical fault.** The Symbols line is a
word-dump of the equation line, articles and verbs included, while the real
glosses sit inside the `**Equation:**` field:

```
**Equation:** `N_t=N_0λ^t`, for unrestricted discrete growth; N is population,
              λ multiplier, t time; needed to expose impossible constant-growth claims.
**Symbols:**  N_t, N_0, λ, t, for, unrestricted, discrete, growth, N, is, population,
              multiplier, time, needed, to, expose, impossible, constant, claims are the
              named quantities and constants shown in the equation; their units are
              stated with the mission data.
```

"for", "is", "to", "impossible" are not symbols. The glosses this needs are
already written one line above — `N population, λ multiplier, t time` — they are
in the wrong field. Fixing the generator that produced this line fixes all 16 and
would leave the equation field able to be just the equation.

**Ground Truth — 6.** Two say only `standard` (M6 U=½CV², M14 S=(1/μ₀)E×B) and one
says only ``include `ρ` `` (M7). Three list the letters with no glosses at all:
`B, dl, μ, I, ε, d, Φ_E, dt are the named quantities and constants…` (M11, M13).
A letter with no gloss is the thing the card exists to supply.

**Red Sand — 3.** Sentences about the quantities rather than a symbol list:
*"generated energy comes from reaction; removed energy leaves through cooling"*
(M7), *"every symbol has the same meaning as in the rate law"* (M8, M12). A
cross-reference is not a gloss; the day card is often the only place a reader
meets these letters.

**Changeover — 2.** `nominal GDP current-price output; real GDP base-price output`
(M2) and `current and base costs use the same quantities` (M3). The first is close
— it needs the symbol separable from the gloss.

**Why this matters more than it looks.** These lines are now printed on the mission
card, under the equation, as a bold symbol and its meaning. It is the only place
in the game where the letters of an equation are defined.

---

## 4. Three CHOICE stops elsewhere

Same rule as §2, outside Planetary Defense:

- **Carrying** — M5 stop 18, M10 stop 39, M14 stop 53
- **The Trial** — M4 stop 15, M14 stop 55

Four options, one `(correct)`, a rebuttal per wrong one.

---

## 5. Small, and unchanged from last round

- **Carrying's placement** — 19 calculations sited on person stops. A calculation
  wants a bench or an instrument, not somebody's shoulder: *"day 11: 'Calculate
  capacity factor' is a calculation on a person stop"*. The other seven campaigns
  are green.
- **Warm-up runs with no story** — Headwater and The Trial, days 4, 8 and 13
  (follow, hunt, canvass). Each needs a title and a `why` in the `warmups` block.
- **The Trial's opening card** ends on a 36-word sentence, over the pile-up limit.
  It is the "Director Mara Voss hands you… and says …" line, which the game now
  draws as a portrait and a quote rather than as a fourth paragraph — so it reads
  better than it measures, but it is still one sentence doing two jobs.
- **Carrying M7 stop 25** is the last three-sentence setup in the set.

---

## 6. Still on offer, still unused

**Figures on stops and on Go deeper questions.** 92 `**Figure - exact player
copy:**` blocks are authored across the eight and every one that is well formed
now draws. Kinds and shapes:

```
line / peaks   {"kind":"line","xLabel":…,"yLabel":…,"series":[{"name":…,"points":[[x,y],…]}]}
bars           {"kind":"bars","xLabel":…,"yLabel":…,"bars":[{"name":"Improved","value":68}]}
scale          an estimate against a true value      timeline   an ordering
gauge          a banded dial                          match      two columns joined
```

`bars` takes `bars: [{name, value}]` — **not** `series`/`points`; that mix-up was
the four wrong figures last round and all four are fixed. Two rules the renderer
enforces: one y-axis ever, and status colours are never a data series.

The questions that most want one are the ones describing a shape in words — a
bowed curve, a shifted line, a right-skewed distribution.
