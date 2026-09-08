# What the eight bibles owe now

The first handback asked for §7 — the numbers and lines a board is physically made
of, for the 257 stops that could not be built. All eight answered, in place, and
the build now has a converter for every format. **75 of those 257 boards came
through and are shipping.** This is what is left, in the order it is worth doing.

The per-campaign lists in `prompts_payloads/` were regenerated after the
converters landed, so they are exactly true as of now: **183 stops still held
back**, each named, with the sentence the build refused it with. Those files are
the work. This page is only the four things that are true across all eight.

---

## 1. Half of §7 is one template, repeated. That is the big one.

**125 of the 257 §7 boards share a single set of numbers with every other board
of their format.** Not similar — identical, across campaigns that have nothing to
do with each other.

- All **8** CLOUD boards are the same board, in an ocean-chemistry stop, an
  asteroid-approach stop and a statistical-power stop.
- All **9** TRACE boards are the same, across five campaigns.
- All **22** STRESS boards are the same "uncertainty index 0–4" with the same
  92/84/76 scores; all **20** TRIGGER boards the same "decision index" on 0–100
  with the same readings 48/63/76/82.
- All **4** PROBE boards read "station A" to "station D" with the break always at
  C. RESIDUAL, BALANCE, HOLDOUT, ALLOCATE, DIAGNOSIS, PROPAGATE, CONTROL, CHAIN
  and SWEEP are the same story.

Here is why it cannot be shipped. Carrying Capacity, Mission 10, has a stop whose
question is printed to the player as:

> Fit pH 8.15, 8.05, 7.95 and cover 70, 55, 35 across littoral, pelagic and
> benthic observations; submit acidification as the mechanism.

Its §7 CLOUD board is `bounds: -1 to 1, unit "decision units", centre 1.4,
spread 1.0`. Nothing about pH, nothing about the reef — and a centre of 1.4 is
outside its own bounds of ±1, so the board is not merely generic, it is
impossible. A player would read a question about reef chemistry and be handed a
dial labelled "decision units".

**The stop's own board already exists and is right.** The same stop carries, on
its payload line, `zones: littoral, pelagic, benthic · pH: 8.15, 8.05, 7.95 ·
calcifier cover: 70, 55, 35 · correct: ocean_acidification`. §7 did not complete
that board. It replaced it with a template.

**What to author:** for each of the 125, a board whose quantities are the stop's
own. The axis is the thing the question measures, in the units the question
prints. The candidates are the ones the question names. If the stop's payload
line already carries the real board — and for most of these it does — say so and
we will convert from that instead; that is a smaller job than re-authoring.

**What not to do:** do not send back one board per format again. The check for
this is one line: if two stops in two different campaigns have the same numbers,
at least one of them is wrong.

---

## 2. DERIVE: 310 wrong lines are unmarked, and 46 give the answer away

DERIVE is the opposite case — **86 boards, 85 distinct sets of working.** It is
real, per-stop, and it converts. Two things are missing.

**310 × `survives: true`.** Each step offers two lines and the player picks one.
`survives` is the assertion that the wrong line is wrong *in a way a reader has
to think about* — that it does not die at a glance. Without it a step is a coin
flip the player never has to read. The build refuses to write this flag itself,
deliberately: it is a judgement about a line somebody has to have read, and a
tool writing it would turn a check that is telling the truth into one that agrees
with itself. So it needs an author, step by step. Where a wrong line *is*
obviously wrong, do not mark it — rewrite it.

**46 keyed lines are longer than their distractor.** The correct line is
identifiable by its shape without reading either. Lengthen the distractor; do not
shorten the answer.

---

## 3. A concept number on every stop — 496 of them, and unchanged

Still the largest single count, and still item 3 of the first handback. Every stop
names its concept in the bible's own words. The game needs the course's own
numbered entry beside it, because the sequencing checks grade *when* each idea is
first taught and can only do that against one fixed list.

`prompts_concepts/<campaign>_CONCEPTS.md` prints the course's numbered spine once,
then every stop with its current tag and the three entries it comes closest to,
**ranked and never chosen**. Where the ranking is right, take it. Your words stay;
this only adds the number beside them.

---

## 4. Two small ones

**15 groups still have nobody on the roster**, so their person stops are
unreachable. This was 28; the build now reads a person's own role to work out
where they work, which placed thirteen of them — "Waterworks technician" belongs
in the Waterworks. The remaining 15 are groups no one's role names. Either give
one of the existing cast that area, or add somebody.

**12 beat bubbles speak as a role** — `Mission lead:`, `Arrival bubble:` — on a
mission whose card names nobody to meet. Where the card names someone the build
reads the speaker off it, which is why this is twelve and not eighty-nine. Those
twelve need a name on the card or on the bubble.

---

## How to check your own work before sending it back

Two questions settle almost everything:

1. **Does this board's axis name a quantity this stop's question actually
   mentions, in the units it prints?** If the axis says "decision units",
   "controlled setting" or "display A", it is the template.
2. **Would two different campaigns get the same numbers?** If yes, it is the
   template.

And one rule that decides a lot of the smaller refusals: **a panel prints the
goal, never the target.** A board that states its own answer — a trigger anchor
captioned "the committed rule fires", an estimate whose two tiles are twice the
target and two, an allocation that lists the winning basket — has taken the
decision away from the player. Those come back as refusals rather than as content.
