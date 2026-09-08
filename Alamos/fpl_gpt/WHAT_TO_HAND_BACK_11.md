# What to hand back — round 11

All eight campaigns import and play end to end. Everything below is content the
bibles own; none of it can be fixed in the repo without inventing content, which
is the one thing the build is not allowed to do.

Ordered by how much it costs a player.

---

## 1. The derivations can be answered without reading them

**Every campaign with DERIVE stops. This is the most serious item in the list.**

A two-candidate step is a coin flip unless the wrong line is wrong in a way that
survives a glance. In these bibles the wrong line is marked instead — twice over.

### 1a. `, under the same displayed conditions`

That phrase appears **117 times across six bibles, and not once on a correct
line.**

| bible | occurrences | on the keyed line |
| --- | --- | --- |
| Headwater | 35 | 0 |
| Midway (Safety Factor) | 26 | 0 |
| The Trial | 21 | 0 |
| Ground Truth | 20 | 0 |
| Changeover | 11 | 0 |
| Planetary Defense | 4 | 0 |

A player needs two steps to learn "the one with the long trailing phrase is the
wrong one", and from then on the format tests nothing. Example, Midway:

```
ask : select the next licensed transformation
  KEY   v = v0 + at
  dist  v=v0+at², under the same displayed conditions
```

**Fix:** delete the phrase everywhere. If a condition genuinely applies to a
line, it applies to *both* lines of that step and belongs on both, or on neither.

### 1b. The keyed line is reliably the shorter one

Independently of the phrase, the correct line is written tersely and the wrong
one is written out. Measured over every two-candidate step:

| campaign | steps | keyed shorter | a player who always picks the shorter line scores |
| --- | --- | --- | --- |
| Planetary Defense | 4 | 4 | **100%** |
| Midway | 40 | 39 | **99%** |
| Ground Truth | 69 | 57 | **91%** |
| The Trial | 58 | 44 | **88%** |
| Headwater | 53 | 34 | **80%** |
| Changeover | 71 | 16 | 61% |

50% is a coin. The importer now prints this number on every run, so it can be
watched as it comes down.

**Fix:** write each distractor at the same level of detail as the keyed line —
same notation, same number of terms, same amount of working shown. Do not shorten
the correct line to compensate; that swaps the tell round rather than removing
it. Changeover at 61% is close to the target and shows it is achievable.

### 1c. Two steps where the keyed line is the *longer* one

Headwater M1 stop 1 step 2, and M1 stop 2 step 1. These are the reverse of 1b and
are worth fixing in the same pass:

```
M1 stop 1 "Cancel the false zero", step 2
  KEY   L = lim_(t->6) (t+6), for t!=6                       30 chars
  dist  L = lim_(t->6) (t-6)                                 20

M1 stop 2 "Rationalize the float transform", step 1
  KEY   L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}   65
  dist  L = lim_(h->0) {h[sqrt(16+h)-4]/h^2}                                36
```

The conjugate step is inherently the longer line, so the fix is to write the
"multiply by h over itself" branch out in full rather than pre-simplified. On the
first one, `, for t!=6` is true of the wrong branch too and should be on both.

---

## 2. The story setup has been cut to one sentence

**321 stops across seven bibles.** The rule the bibles state for themselves in §5
is *"a reason, two-sentence story setup, story-science connection…"*, and the
sentence that survived the cut is the instruction rather than the situation.

| bible | stops with a one-sentence setup |
| --- | --- |
| Carrying Capacity | 60 of 60 |
| Ground Truth | 48 |
| Headwater | 48 |
| Midway | 46 |
| The Trial | 44 |
| Planetary Defense | 40 |
| Changeover | 31 |
| **Red Sand** | **4** |

Red Sand is the model — it kept the two-sentence form. From Headwater, the two
shapes side by side:

```
GOOD  The water-level logger predicts height above datum with H(t)=(t^2-36)/(t-6),
      where t is time in minutes and H(t) is measured in centimetres. The formula
      has no value at t=6, so find L=lim_(t->6)H(t), the height the prediction
      approaches near minute 6, for comparison with the recorded spike.

BAD   Diagnose the discontinuity and decide whether redefining that single value
      makes the local forecast continuous.
```

The first sentence is what is happening and what the numbers are; the second is
what to do about it. What came back is only the second, so the card tells the
player to act without telling them what they are looking at.

---

## 3. CHOICE stops with no options

The stop declares CHOICE and lists nothing to choose between, so it cannot be
built as written and is imported as whatever the payload supports.

- **Planetary Defense** — M2 stop 6, M2 stop 8, and others; also **M1 stop 1 and
  M3 stop 9 have no wrong-path feedback** (one rebuttal per wrong option).
- **Carrying** — M5 stop 18, M10 stop 39, M14 stop 53.
- **The Trial** — M4 stop 15, M14 stop 55.

Four options, exactly one marked `(correct)`, and a rebuttal against each wrong
one.

---

## 3b. Two SEQUENCE prompts recite their own answer

**The Trial: "Describe Before Judging" (M1 S2) and "Sign the Statistical
Argument".** Both list all four cards, in the order they have to be dragged into:

```
prompt : "The histogram is unimodal and right-skewed with two high values.
          Order four cards: shape in context; unusual values; center in context;
          spread in context."
cards  : ["shape in context", "unusual values", "center in context", "spread in context"]
order  : [0, 1, 2, 3]
```

The panel shuffles the cards on screen, so they arrive scrambled — and the prompt
above them gives the sequence semicolon by semicolon. Nothing about skew, outliers
or which summary statistic survives them is needed to answer it.

The other 19 SEQUENCE stops across all eight campaigns name none of their own
cards, so this is two stops rather than a habit. The prompt should give the
evidence and the task and stop there:

> The recovery-days histogram is unimodal and right-skewed, with two unusually
> long recoveries. Put the four description steps in the order that keeps the
> summary honest.

Two more things about that same stop, both worth a pass wherever they recur:

- **SOCS is never said to the player.** It is in the metadata (`Concept: 31 —
  SOCS and graph uses`), in the state output (`SOCS CHECK appears`) and in the
  wrong-path feedback — but the card never expands it. The mnemonic that makes
  the four cards memorable is the one thing withheld. Name the term and gloss it
  on the card.
- **The wrong-path feedback is an authoring note, not player copy**: *"List
  values without comparisons; require SOCS in patient context"* is an instruction
  about what the distractor should do, and a player who gets it wrong reads it.

---

## 4. Operated formats with no interaction payload

An operated format needs its board written out — the numbers and lines the panel
is physically made of. These declare the format and supply nothing:

- **Planetary Defense** — M1 stop 3 (CASEBOOK), M1 stop 4 (ATTEST), M5 stop 20
  (VERIFY), M6 stop 22 (DEGENERACY), M6 stop 23 (SWEEP), M6 stop 24 (DIAGNOSIS).

Planetary Defense is the worst-served bible in the set on this and on §3; it is
the one to look at first.

---

## 5. Six missions each in three campaigns name no story event

`Carrying`, `Headwater` and `The Trial`: six missions each write a
*"Happy ending card"* but no **Story event** line, so the metric screen has no
sentence naming what caused the bar changes. The build currently stands the
congratulation card in its place, with the authoring label stripped.

The other five bibles write both. A story event is what happened in the world —
*"The recession warning reaches the plaza before a response is ready"* — not how
well the player did.

---

## 6. Smaller, still worth a pass

- **Changeover M15's automatic change** is `Validated remaining bars top to 100`,
  which names no bar the campaign has, so the final mission moves nothing.
- **Headwater's warm-up runs** on days 4, 8 and 13 (follow, hunt, canvass) have no
  title and no `why` in the `warmups` block.
- **Carrying's placement** — 19 calculations are sited on person stops. A
  calculation wants a bench or an instrument, not somebody's shoulder: *"day 11:
  'Calculate capacity factor' is a calculation on a person stop"*. The other seven
  campaigns are green on this.
- **Headwater M1 stop 2's matching step** has a keyed line longer than its
  distractor (same class as §1c).
- **Every campaign's Go deeper block is authored and landing** (15 missions × 6
  questions each, all eight) — no action, recorded so it is not re-sent.

---

## 7. Something the engine can now use, if the bibles want it

Go deeper questions accept a **figure**, drawn between the prompt and the options,
using the same spec the campaign stops already take. A question about a shape — a
bowed curve, a shifted line, a distribution — can show the shape instead of
describing it. Nothing is drawn unless a bible authors one, and none does yet.

Authored as a fenced JSON block inside the review question:

````
**Figure - exact player copy:**

```json
{"kind":"line","xLabel":"Exchange service","yLabel":"Bank support",
 "caption":"A bowed production possibilities curve.",
 "series":[{"name":"PPC","points":[[0,100],[20,97],[40,90],[60,76],[80,52],[100,0]]}]}
```
````

Kinds: `line` (add `limit: {at, label}` for a threshold), `bars`, `peaks`,
`scale`, `timeline`, `gauge`. Two rules the renderer enforces: one y-axis ever,
and status colours are never used as a data series.

The prompt that prompted this, from Changeover's review: *"A production
possibilities curve for exchange service and bank support is bowed outward. What
does its changing slope show?"* — that question should carry the curve.
