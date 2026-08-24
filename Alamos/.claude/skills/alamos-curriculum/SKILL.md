---
name: alamos-curriculum
description: The curriculum gates: curriculumDelivery (every syllabus equation must be computed), formatMix's one-third cap and the DIVERSITY_PASS, the four questionLoad numbers for grade 8 and below, dayCalls (four calls a day, no card twice), conceptOrder/equationOrder sequencing and takesAsRead, and the card's shape — scene, guide, background, Key concept, pickKeyConcept, authored takeaways. Read before authoring, converting, re-daying, or re-sequencing stops.
---

## Diversity is not the measurement; delivery is

The obvious gate does not survive contact with the numbers. The catalogue is 63% four formats
and 28% CHOICE alone, so the response that suggests itself is a variety gate. That gate was
written down, then the mix was crossed against `syllabusEquations`:

| | CHOICE share | mix rank | equations a question **computes** |
| --- | --- | --- | --- |
| Ground Truth | 51% | second-worst | 11/11 |
| Sightline | 47% | third-worst | 7/7 |
| Quantum | 20% | **best in the repo** | 5/10 |
| Outbreak: Riverton | 16% | fourth-best | 3/7 |

Format variety does not predict whether the course is taught, and the variety gate would have
sent the work at the four games needing it least. Across the seventeen senior campaigns effective
format count scores **ρ −0.07** against whether syllabus equations are computed and CHOICE share
−0.01, where **share of stops carrying arithmetic scores +0.69**.

So **`engine/dev/curriculumDelivery.mjs` is the gate and format mix is the diagnosis** you run
when it fails. One rule that is not a matter of taste: *an equation the syllabus lists must be
computed by some question*, where computed means a number came out of it — the `relationship`, the
template, the worked solution, or a DERIVE's own lines. This is house rule 21 as a check. CHOICE
has none of those fields so it cannot compute by construction, and a CHOICE-heavy game whose
equations are all computed passes, correctly.

`engine/dev/curriculum-debt.json` records today's gaps: **97 → 88**, nine of which were the
measurement and not the content (`instrumentWork`, `symbolSignature`). Every flip was inspected by
hand before the baseline moved and three proposed flips were rejected. **A debt file that shrinks
because the detector got looser is worse than one that never shrinks.**

It also reports, and never fails, the 30-concept syllabus by the **tier of move** its stops demand
— SELECT (the answer is on screen and you pick it), CONSTRUCT (you build it out of parts), OPERATE
(you drive an instrument). A mechanism concept reached only at SELECT is the diversification work
list. A report because select-tier is often right — Sightline is AP Psychology and "identify the
bias" *is* a discrimination — and because uncovered concepts are expected: twenty-five of thirty
is a syllabus map, thirty of thirty is a flattering one.

**The conversion invariant makes a diversification pass safe.** `--snapshot` before, `--against`
after: a changed takeaway, a dropped `assumes`, a concept the campaign no longer touches or an
equation it no longer computes all fail. A changed **format** is reported and allowed. *The
objective is fixed, the format is the variable.* Without it a sweep rewrites the syllabus while
every other check stays green, because every other check reads the content as it now is.

## No format holds more than a third of a campaign

**`gamekit/DIVERSITY_PASS.md` is the pass.** At a 45-stop campaign no answer format may hold more
than **15** stops, 10 at a 30-stop junior edition, 18 at Hospital's 55. `engine/dev/formatMix.mjs`
is the gate, with `format-debt.json` recording campaigns still over — **75 stops across 10
campaigns** when it started.

**The cap is the gate and nothing else is**, because a conversion has to pay for itself in
teaching: an equation the syllabus lists and no question computes, or a mechanism concept the
player only ever picks off a list. The format is chosen from what the stop is already about. A stop
that cannot support one honestly stays as it is and a different stop moves instead.

**Why the catalogue looked like that, measured rather than guessed.** The books authored it —
`grep format: books/seedbank.yml` gives 29 CHOICE of 45, and nothing was retyped by the engine. The
first nine books average **33%** CHOICE among board stops and the last six average **59%**, because
the early ones had a source document carrying exercise shapes (the seven FPS interaction guides in
`books/copy/`, and the two docx design books) while the late ones were written straight from a
one-paragraph idea. Two controls settle it: Outbreak had no interaction guide and has the best mix
in the repo, because it came from a design book; and Quantum had no source document either but its
book header states its own rule — *every question is about an instrument, a number or a choice* —
and it has the best board diversity in the catalogue. **Writing the distribution down before
writing 45 stops is the whole mechanism**, and `tools/BOOK_TEMPLATE.md` never asked for one.

**The pass is done: 76 conversions across ten campaigns, every campaign inside the cap.** What it
bought besides the histogram: **five campaigns now compute every equation on their syllabus** where
four did not (Aftershock 2/10 → 10/10, The Trial 6/11 → 11/11, Wellmere 3/6 → 6/6, Red Sand 8/9 →
9/9, junior Wellmere 1/4 → 4/4), **26 rows left `curriculum-debt.json`**, and select-only mechanism
concepts went 7 → 1 in Wellmere, 3 → 0 in The Trial, 5 → 0 in Ground Truth, 7 → 2 in Sightline.
Ground Truth's OPERATE tier went 2 → 13 stops, Sightline's 4 → 14.

**The junior editions needed four rules the senior games never hit**, each a `questionLoad` gate
doing its job. The **judgement budget is per campaign and per day** — TRACE, ATTEST, VALUE, STRESS,
DEGENERACY, DIAGNOSIS and HOLDOUT are all format-demanding, so a pass reaching for instruments
reaches into that budget; junior Wellmere went to 30% against 20% and three conversions were
re-authored as CHAIN, VERIFY and BALLPARK (CONTROL, VERIFY, CHAIN and the boards are free).
**Nothing under 0.1 in the arithmetic** — the fix is a different unit, per cent of gravity instead
of g. **Four items is the board limit and it counts the label.** And **grade 2 is a different
language**: all eight Hospital conversions failed the reading gate first time, one at grade 8, and
what passes is one clause per sentence with no subordination.

**A conversion can create an ordering defect, so run `equationOrder` after every one.** Red Sand's
day-3 assay stop became a BALLPARK computing the reaction quotient, which paid the cap and the last
equation gap together — and immediately failed, because Q against K is built on ΔG = ΔH − TΔS and
nothing computed that until day 5. The fix was a second conversion putting the base on day 2, not a
new debt row. **A stop that starts computing something starts owing its prerequisites.**

## The four `questionLoad` numbers, and who they apply to

Any theme at grade 8 or below. A limit written as a sentence is a limit nobody can fail, so:

- **at most two operations** in an estimate, with nothing over 9,999 or under 0.1
- **twelve words** in an option, since four have to be held in mind at once
- **two named people** in a stop, four across a day
- **a budget on judgement stops** — 20% of the campaign, one a day, none before day 3, because a
  player who has answered nothing has no ground to judge from and the first stop of day 1 decides
  whether there is a day 2
- **four items in any list graded as an exact subset** with no feedback until commit (TRACE
  channels, TRACE sources, ATTEST claims, VALUE options), and **six** where you compare the list and
  pick one or the panel narrows live

Most instruments *are* the demand — TRACE is "agreement is not independence", ATTEST is "the record
is not the condition" — so they are budgeted rather than banned. **CONTROL and VERIFY are
deliberately not budgeted**: the fair test and predict-act-measure are what a middle-school science
course is about, and a young player should meet them more often, not less.

## No day asks more than four questions, and no card is served twice

**`engine/dev/dayCalls.mjs` is the gate**, inside `npm run check`, with
`engine/dev/daycalls-debt.json` beside it. Two rules about the shape of a day rather than the
content of a stop:

1. **No day carries more than `MAX_CALLS` calls.** Three authored stops plus a callback is what the
   loop is built around and what `budgetForRoute` gives hours to. `budgetForRoute` gives travel a
   little under half the day whatever the stop count, so a fifth call is answered against the same
   hours as the fourth — the day reads as long rather than full. `MAX_CALLS` is exported from
   `normalize.js` and the gate imports it, because a checker with its own copy of the number is a
   second description of the rule.
2. **No lesson is served twice in a campaign.** A callback that re-asks its own lesson is the same
   card twice — same scene, same `why`, same four options, same key, with `Second look —` printed on
   the day plan and nowhere on the card the player answers. Recognition is not retrieval.

**Why nothing caught either for years.** Every checker that reads a campaign in order deliberately
dedupes on `group:lesson` — `formatMix` so a callback does not spend a format cap twice,
`syllabusEquations` so it does not re-date an equation, `probeQuestions` so a question is not probed
twice, `validateContent` by filtering `s.callback` out before counting. Each is right about its own
question, and between them they made the *second* serving invisible to the whole apparatus: **295 of
318 callbacks were byte-identical re-serves and no gate could see one.** And `validateContent` notes
a day authoring more than three stops and has never failed one, which is how 68 days authored four
and **72 days ran to five calls**. A note nobody has to clear is a note nobody clears.

**Both halves are paid and the debt file holds no rows.** The duplicate half went 295 → 0 because
`shapeMissions` no longer adds a callback it would have to re-serve a card to fill; the over-4 half
went 72 → 0 by re-daying five books. What that cost is worth recording:

- **`instruments` split its arcade and world-format days** (9 days → 11) rather than dropping a
  format nothing else authors. Its day 8 was the five arcade formats and day 9 the six world-graded
  ones; deleting there would make BELT, HOLD, SPOT or LOB unreachable, since `lessonGallery`
  harvests from the bank.
- **Project Y moved its acceptance-criteria stop** onto the uncertainty-budget day, where a
  conservative lower bound on a measurement belongs. **Prefer a move to a delete and a re-claim to a
  move**: it costs no scene and no story.
- **The two grade-6 editions sent eight stops to the days their subject belongs to.** Moving
  `planetary_defense_ms`'s risk cloud off day 2 put it after the concept it rests on and cleared a
  `concept-debt` row. Moving Wellmere's bagging stop to day 1 made `jargonDepth` fire, because that
  card defines *Pollen* with *Chromosome*, unseen until day 4 — the junior two-places rule catching a
  move rather than a rewrite.
- **One stop was deleted and then put back, and that is the useful part.** Two of
  `planetary_defense_ms` day 2's CHOICE stops read alike in their scenes — both are *more observation
  separates two candidate paths* — so one was cut as redundant. It claimed *Repeated measurements and
  their average*, the only claim on the base of a day-4 concept. **The scenes were similar and the
  concepts were not**: this file's own rule about a plausible measurement, arriving in the editorial
  half. Read the concepts before calling two stops the same question.

**The callback now requires a review variant, and the variant decides the candidate.** It used to
prefer a `— Review` variant and otherwise re-ask the lesson itself, on the argument that re-asking
*is* what spacing means. It is not, when the second serving is byte-identical. So the candidate is
the oldest taught lesson that **has an unserved variant**, and where nothing does, the day simply has
no callback. Picking by age alone reached 10 of the hospital's 105 variants; it reaches 13 now, and
Red Sand's and Sightline's variants are authored as stops already, so they correctly need none.
Three bugs the gate found in that change: `/review/i` matched a lesson whose *own* title contains
"review" (Sightline's "What the review is looking for now" was its own review variant, served on two
consecutive days); `calledBack` keyed the base lesson rather than the one served, so one card went out
on three days with every key looking distinct; and `served` has to be seeded from **every** day's
authored stops, not the days walked so far, because a variant a later day authors directly is the same
card and the callback is the one of the two that can move.

Its selftest carries six cases, each verified by putting the bug back: keying a serving on the *base*
title makes a review variant read as a duplicate of its parent and bans the callback outright;
reporting only three-or-more servings passes every ordinary duplicate; a cap written as a literal
drifts from `MAX_CALLS`. The one a selftest cannot reach is reading the *book* rather than the
normalised theme, which sees no callback at all and reports all-clear on a campaign serving thirteen
duplicates — `contentOf` calls `normalizeContent`, and that is the only thing keeping it honest.

## Sequencing: nothing is claimed before what it rests on

`engine/dev/conceptOrder.mjs` is `equationOrder`'s rule one field over: *every concept a stop claims
has a base claimed on an earlier day, or the stop says in `assumes` that it takes it as read.*
Earlier and **not the same day**, because `openStopIndices()` opens a day's stops in any order, so a
prerequisite beside its dependent is one half the players meet second. `needs` on each concept lives
in `tools/syllabus.js` beside the equation `needs`. A course whose concepts carry no dependency is
not checked at all.

**Per stop, not per concept, and the difference was six real rows.** Two stops can claim one concept
and each answers for its own prerequisites; a concept-level count collapses those and hid a stop
standing *beside* its own base. `plans/blackout-sequence.html` reads `orderRows` out of the gate now
rather than keeping its own copy of the rule.

`takesAsRead:` is the hatch. The importer refuses two things about it: a title not on the syllabus,
and — the one that keeps it honest — **a concept the stop's own claim is not built out of**, because
without that the field is a place to park anything and a declaration left behind by a re-claimed stop
would go on excusing a prerequisite the stop no longer has. **A stale exemption is indistinguishable
from a considered one.** Each declaration is printed to the player as an `assumes` line, so the
sentence they read and the fact the checker reads are the same authored line.

**All sixteen senior campaigns are sequenced.** 494 concepts across 18 themes carry a `needs`, up
from 62, and every registered theme now carries a graph — **637 of 724 concepts**. Most residue was
bottom-of-graph and became declarations (Outbreak 29, Red Sand 33, Ice Core 23), which is a senior
course leaning on a first course, said out loud.

**The junior editions needed a different policy.** "Taken as read" needs an earlier course to
take it as read from: an AP course may open on frequency without teaching what a volt is, and a
grade-6 edition has nothing in front of it, so a prerequisite it declares is one it has quietly
decided not to teach. Junior rows go in the debt file instead, and `conceptOrder` **reports** any
declaration at grade 8 or below. Thirty-four declarations were stripped from two editions when the
policy was corrected.

`engine/dev/concept-debt.json` is the record; its `_` key is header, not data, and counting those
lines is how the total read 194 for an afternoon. **A file whose length is the metric needs to say
which lines are not data.** Working it down went 236 → 206: thirty rows were foundations no card
claimed, restored to the stop that teaches them (Midway's net force and SHM, Aftershock's stress and
strain, Quantum's T1, Groundtruth's charged-sheet field, the junior editions' matter and averaging).
Two batches made the number *worse* and were reverted — **a claim that clears three rows can raise
four, so re-measure after every batch.**

**The residue is ordering, not labelling, and the re-order half is far smaller than the search
says.** ContamCity and Hospital were re-ordered (22 → 16, 15 → 9), Headwater swapped four stops, and
then the pairwise swap search was run on the six themes with the largest offers: **twelve of sixteen
proposals were story-wrong**, and the way to see it is the day's own stake rather than the row count.
Aftershock offered four and lost all four — "What eight degrees does" *is* Marina Court, which is day
4, and a stop whose scene names the day's event cannot move. Junior Blackout offered three and lost
all three. **A game whose days are an event calendar (Aftershock, Red Sand) or a topic list (Midway,
Ground Truth) is not re-orderable at all**, so its rows are paid by declaring `takesAsRead` or writing
the missing question — which makes the residue mostly writing work, not permutation work.

**Midway is what the pass was for.** AP Physics 1 in derivations across an amusement park, where the
day is set by which ride you are standing at. Writing its equation graph (it had *none* of twelve)
turned up the bigger thing: **`ΣF = ma` is shown on a card from day 1 and computed by no question in
the game**, while centripetal force, the energy books, torque, the pendulum and fluid pressure are all
computed from it. Seven equation-order inversions out of one missing stop. Its rows are not order at
all — *work as a force times a distance* and *free-body thinking* are mentioned at no stop in a game
whose torque, power, friction-as-negative-work, PE and KE all rest on them. Two written stops, not a
permutation. Headwater has the calculus twin: chain rule claimed on day 2, power rule not until day 5.

**Two engine gaps the rollout exposed.** A claim no longer waits on its takeaway — the importer used
to skip a concept with no `t`, so 26 of 28 courses claimed nothing and this gate had nothing to read.
Claims are recorded now and the door still appears only when `t` is written, which separates *the
course is in a teachable order* from the 26,000 words of curriculum prose. And **`equationOrder` had
no debt file**, so authoring a truthful graph on a shipping game turned green into red in the same
commit; the realistic outcome of that is a graph somebody has quietly made wrong.
`engine/dev/equation-debt.json` exists now, same two properties as the others.

**And `derive-edition` overwrote a shipping edition without saying so.** Run on `blackout` to check
one line of output, it rewrote the nine days it was handed over the ten `blackout_ms` ships — book and
generated content — and nothing failed, because a nine-day campaign is a valid campaign. The only
evidence was a mission count in a file nobody was reading, which is house rule 14's shape one
directory over. It refuses now unless `--force`, and prints how many days the edition currently ships.
It also strips `concept:`/`takesAsRead:` on the way across, because a junior concept list shares no
title with its parent's — carried over, every one is a title the importer refuses, *after* the edition
has been written.

## The card: what a stop puts in front of a player

A stop may carry **two paragraphs and a door**. `scene` says what has happened and defines any word
the question needs. `guide` says what the player does and what the numbers mean. `background` is a
list of paragraphs behind one button: the background prose, then **each syllabus equation spelled out
in a sentence** with its symbols named, then the glossary definitions, then `assumes` and `takeaway`.
A chip reading `n_phys ≈ d²` is useful only to somebody who already knows what it says. A stop with a
`guide` suppresses the panel's own three lines, and authoring a panel hint beside one is refused
rather than dropped.

**That shape came from getting the fix wrong first.** Adding the method line and goal line to four
panels left the card carrying *six* blocks before the player touched anything: scene, "takes as read",
"what this is about", a row of syllabus equation chips — two of which, `F_total ≈ F^n` and
`n_phys ≈ d² per logical qubit`, have nothing to do with the question — a row of glossary chips, then
the panel's three lines, one restating the question. **Every block was defensible on its own and the
sum was unreadable. Explaining a format is not the same as adding a block that explains it.**
Quantum's HOLDOUT is the worked example: scene at F–K 6.8, guide at 4.0, background 4.4–6.3, and the
coin-flip explanation of why a 4,000-shot percentage wobbles is *more* physics than the card had
before — it is just not in the way.

**`Key concept` is a second door beside `Background`**, the two in one row (`.askDoors`; a closed door
is a pill and an open one takes the width, because a `<details>` body squeezed into a flex column is a
paragraph two words wide). The Background label lost its tail on the way — two pills of five words
each read as a paragraph of controls rather than two things to press.

**The card was printing a claim nobody had earned.** It said `Concept 19 of 32 on this course`, which
a player on day 1 reads as the nineteenth thing they are being taught. The syllabus list is grouped by
topic, not ordered by dependency — it puts transformers at 13 and Faraday's law at 17 — so its index
cannot mean "how far in this is". The count is fine and the ordinal is not. It reads `One of 32
concepts on this course` now, followed by what the idea **rests on**, with anything taken as read
marked as such. Found by playing the game, after every check was green.

**Which concept a stop is about has to be picked, and the pick is the whole of the work.**
`conceptCoverage` answers "which stops touch this concept"; the card asks the opposite question and it
is not that lookup inverted. The matcher is keywords over the whole question, so across 838 senior
stops the median matches **three** concepts, the worst thirteen, and 19 match none. `pickKeyConcept`
scores on two things a bare keyword hit cannot see — **where it landed** (title 5, ask and takeaway 4,
scene and why 2, an option label 1, and an option-only match can never win) and **how rare it is
across the campaign**, since a concept twenty stops mention is the course's background hum and one
that three mention is what those three are for. Rarity needs the whole campaign, so it is a post-pass
in `import-book.mjs` and the engine reads a stamped `lesson.concept` rather than reaching into
`tools/`.

**A mechanism bonus was tried and removed, and it is the one term that made the pick worse.** On
Blackout it handed three method stops to a mechanism that was not their subject — the TRACE on what
order the records claim and the CHOICE on the sensor that was confident and wrong both went to a
transmission concept over `Metering, instrument transformers and measurement error`, which is what
those two questions are about. Half this catalogue's instruments have method as their subject, so a
standing thumb against method concepts is a thumb against the formats. Two rarity curves moved
nothing, so the scoring is the simplest thing that works. The honest name for the field is *the
concept this stop is most likely about*.

**The takeaway is authored, and fixed per concept rather than per stop.** `t` on each syllabus
concept, two sentences and 30–45 words: what the idea says, then what it lets you decide. Every stop
scoring to `Protection: relays, breakers and coordination` opens onto the same two sentences, which is
the difference between this door and everything else on the card — `takeaway` is the principle *this*
question is an instance of, written once for one stop. **A concept with no `t` stamps nothing and
shows no door**, which is why adding this changed the generated content of exactly one game: an empty
door is worse than none, and it teaches a player not to press the next one. 32 of 692 concepts across
27 courses are written; the other 660 are the work list.

**And it is a leak the existing probe could not see.** A per-stop takeaway giving the answer away
costs one question; a *concept* takeaway that does costs every stop the picker sends there, and nobody
rewriting the stop would think to look at the syllabus. `probeQuestions` now runs the takeaway's LEAK
test against `concept.t` as well — shared-content-word fraction at a higher threshold, since 40 words
collect more of anything by chance, plus a verbatim-run test insensitive to length.

**`gamekit/QUESTION_BRIEF.md` is the sweep brief** — the card shape, the six mechanics a guide has to
answer, the line between a caution and the answer, and §5, the rule that authored numbers have to be
*possible*. `cardLoad` is its measurement: 1,334 stops, median card 75 words in 5–6 blocks, **so the
defect is fragmentation, not length**. The target is per tier — 4 blocks for a card, 6 for a stop with
an instrument, which keeps its own hint and its "what counts as done" — because one number either
excuses the fragmentation or bans two blocks worth keeping. A briefed stop drops only the format's
generic lecture, through `game.briefed`, stamped in `normalize.js` and read by `method()`.

**The second paragraph of a card is for the question, not the controls.** 836 of the 1,045 board and
CHOICE stops carried a mechanics paragraph — "choose one of the 4 and press Check; the options are
dealt in a fresh order each time" — in six distinct texts. Every word was already on screen: each
board format prints its own `compactInstruction` a few pixels below, so the one place a player looks
for help with the *question* explained a control they could see. All 1,045 rewritten to
`QUESTION_BRIEF.md` §7a: what the options disagree about, the test that separates them, what the
distinction costs. No mechanics, never the answer, and **never a restatement of the scene** — which
needs measuring rather than trusting, because thirty-three guides quoted a run of their own scene back
at the player and every one read well in isolation.

Sweep progress: **262 of 1,333 briefed, and tier 1 is finished** — all 19 live panels and all 244
instrument stops, across every game and every junior edition. Left: tier 2, the 728 board stops (of
which BALLPARK's 206 always need a guide), and tier 3, the 343 CHOICE stops, which need only the fold
they already have.

**The sweep broke its own reading rule.** The first 84 guides carried 42 sentences over the 28-word
cap, every one a compound joined by an em dash, a semicolon or ", so" — fluent to write and over the
bar. Cut at the joint and re-measured, which is the only reason it was found: the prose read well
enough that nothing but `cardLoad`'s own column objected. And `tools/brief-stop.mjs` now refuses to
write a book whose bytes changed since it read them, because it clobbers a concurrent session
otherwise — Meridian's stop count moved twice mid-sweep and the only visible symptom was a total
dropping by one.
