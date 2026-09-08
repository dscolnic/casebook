# What the eight bibles owe now — third pass

The last handback asked for two things. Both were done, and done well:

- **The derivations are finished.** 310 wrong lines were unmarked; 12 remain. That
  was the largest authoring job and it needed a person to read every line.
- **The templates are gone.** 125 of the 257 boards had been one board per format,
  repeated across unrelated campaigns. Replacing them with a pointer at each
  stop's own authored interaction block was the better of the two options offered,
  and it worked: **239 of 480 stops now build a real panel**, up from 86, and the
  number of stops that would render an empty panel is down from 11 to **3**.

Every format the pointers name now has a reader on this side. So what is left is
not plumbing. It is boards that build but do not *decide* anything, and it is one
list that has never been done.

`prompts_payloads/<campaign>_PAYLOADS.md` was regenerated after all of that and is
exactly true today: **134 stops still held back**, each named, with the sentence
the build refused it with. Those files are the work. This page is only what is
true across all eight.

---

## 1. A board that decides nothing — about 130 stops, and the biggest item

These stops build. A player can walk up to them. They just cannot be got wrong,
which means they teach nothing. Four shapes, all measured:

| what the build says | stops |
| --- | ---: |
| a trigger stage has a window of `undefined–undefined`, so no reading can fall inside it | 20 |
| every trigger stage needs a label and a positive lead time | 20 |
| a trigger is graded on lead time alone, so the opening slider position is already correct | 20 |
| an allocation requires no items — it is always answered | 19 |
| a stress board's candidates all survive the whole range, so the slider decides nothing and the board is a multiple choice | 18 |
| an allocation is required and everything it needs is already protected — the plan answers it before the player chooses | 18 |
| a stress nominal sits outside its own range | 18 |

**What to author.** For a TRIGGER: one rule, on one quantity, with a band of
readings it may fire on (`window: {min, max}`) and a lead time in hours that at
least one update in the stream actually satisfies. For a STRESS: an assumption
with `min`, `max`, `nominal` and `step`, where the nominal is inside the range,
and candidates where **at least one fails somewhere in the range** — if every
candidate survives everywhere, the slider is decoration. For an ALLOCATE: a
`requires` list per question, and at least one question the plan may forgo — a
board where everything is required and everything is already protected has made
the decision for the player.

## 2. Three formats whose boards are a different instrument from the one they name

Not a missing field — a mismatch between the content and the format. Each needs a
decision, then either re-authoring or a change of format.

- **HOLDOUT, 8 of 8.** The format draws two scored curves over a threshold axis
  and asks which generalises. Every board is a *freeze-and-reveal*: one
  prediction, one acceptance window, one measurement uncovered after committing.
  There is no axis, no pass score and no five-point curve anywhere. Building a
  curve out of an acceptance window would grade a player against a shape nobody
  wrote, so nothing is built.
- **BALANCE, 11 of 11.** The format is a ledger with a **hidden** stream — the
  point is noticing the row that is not on the board. Not one board marks any
  stream hidden; every row announces itself, and where the arithmetic can be
  checked the visible rows already close. That is a subtraction, not a decision.
  (`count: false` is well authored everywhere — the boards understand "not part
  of the ledger" and not "unrecorded".)
- **CLOUD, 6 of 7.** The format is a scatter with bounds, a centre and a spread
  that actions narrow. Six boards are settings-and-readings tables instead.

## 3. RESIDUAL: the trap is inverted on four of five

The format exists to teach that the better-scoring fit is the wrong one, because
of the pattern in its residuals. Four of the five measurable boards make the
**lowest-error fit the answer** — including one on a stop titled *Refuse the
lowest RMS*. Only Planetary Defense's Stop 7 is right (accept B at 0.21, reject
the patterned A at 0.18).

Two things would finish this format: mark the patterned fit `structured` (the
boards say the pattern is there, but in prose — `pattern_to_reject: monotonic
curvature` — and picking a fit id out of a sentence is inference, not a rename),
and give each residual a coordinate. Ten of ten author an ordered run of values;
the panel draws a field, and `x: i, y: 0` for five sticks is inventing data.

## 4. Five boards print their own answer

The pointer's own rule is *state the goal, never the target or keyed answer*.
These break it, and they are named in the payload files: a trigger anchored
exactly on the threshold the player must commit and labelled "ACCEPT MINIMUM"
(Red Sand 97.0 %, Ground Truth 5.0 kV/m, Safety Factor 8.0 m/s, Carrying Capacity
1.0 m, The Trial 0.025). An anchor *near* the threshold is fine. An anchor *on*
it, captioned as the decision, is the answer printed before the slider is touched.

Also worth a look: **three stops are graded on a figure their own answer text
never states** — a sweep on an asymptote of 36.850 mm/h, a probe on the constant
0.4, an error budget on a width of 4600 km.

## 5. Fourteen payloads are prose, not boards

`readPayload` returns nothing for these, so no converter runs. They are
instructions to whoever was going to finish the board — Ground Truth M8 S32 reads
`readings ≥3 plus quiet shell`, naming no zone, label or value. All four
DIAGNOSIS boards are in this group; the reader is ready for the shape the moment
one is written.

## 6. A concept number on every stop — 496, and never yet done

The largest single count in the build, unchanged through three passes. Every stop
names its concept in the bible's own words; the game needs the course's own
numbered entry beside it, because the sequencing checks grade *when* each idea is
first taught and can only do that against one fixed list.

`prompts_concepts/<campaign>_CONCEPTS.md` prints the numbered spine once, then
every stop with its current tag and the three entries it comes closest to,
**ranked and never chosen**. I tested whether this could be done mechanically on
this side: it cannot. Taking the top-ranked suggestion is wrong often enough to
matter — Carrying's salt-front stop, tagged `aquifer profile`, ranks *agricultural
irrigation* first because both mention salt, when the answer is the aquifer entry.
A stricter rule that demands a rare shared word settles only 177 of 480. The rest
is a judgement about what the stop teaches.

## 7. Two small ones

**15 groups have nobody on the roster**, so their person stops are unreachable.
This was 28; the build now reads a person's own role to place them — "Waterworks
technician" belongs in the Waterworks — which fixed thirteen. The remaining 15 are
groups no one's role names.

**12 beat bubbles speak as a role** (`Mission lead:`, `Arrival bubble:`) on a
mission whose card names nobody to meet. Where the card names someone the build
reads the speaker off it, which is why this is twelve and not eighty-nine.

---

## How to check your own work before sending it back

Three questions settle nearly everything on this page:

1. **Can this board be got wrong?** If every candidate survives, if nothing is
   required, if the window is unset, or if the answer is the opening position,
   then the panel is scenery. This is the single biggest item.
2. **Does the axis name a quantity this stop's question mentions, in the units it
   prints?** "decision units", "controlled setting" and "display A" are the old
   template talking.
3. **Does the board print its own answer?** An anchor on the threshold, a tile
   that is twice the target, a listed winning basket — all of these remove the
   decision.

One note on how this is read on the build side: a board that is missing a field is
reported field by field, so **the raw problem count went up when the boards
landed** — 813 to 1,204 — while the number of stops that would render an empty
panel went from 11 to 3. Do not read the total as the score. The list in
`prompts_payloads/` is the score.
