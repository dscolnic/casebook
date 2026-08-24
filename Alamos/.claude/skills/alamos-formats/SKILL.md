---
name: alamos-formats
description: The answer-format catalogue and the panel contract: the four rules a live instrument obeys (a panel that enforces the decision has removed it; print the goal never the target; simulate twice; a greyed button must say what is missing), DERIVE/askRule, the 35 formats, every instrument's importer trap, and readerProbe's followability pairs. Read before authoring an instrument stop, adding a format, or touching questionUI.js / instruments.js.
---

## Panels: the four rules a live instrument obeys

1. **A panel that enforces the player's decision has removed it.** TALLY's subject is *when is there
   enough data to report* — and a player said "I just keep clicking until it lets me submit, there is
   no challenge." They were right: the commit button unlocked at `minShots`, and at Quantum's numbers
   that floor already put the statistic inside its own tolerance about 95% of the time
   (σ = √(Σ4p(1−p)/n) is 0.072 at 400 shots a pair against a tolerance of 0.14). Lowering the floor
   does not fix it either, because shots are free and the clock is stopped behind a panel, so the
   correct play becomes clicking forty times — tedium, not judgment. **`tally.budget` is the fix**: a
   finite pot of batches for the whole stop, spent across the pairs, with Run dying when it is gone and
   commit allowed the moment the pot is empty whatever state the pairs are in (a player who dumps the
   budget on one row must not be locked in). All four correlations enter with equal weight, so an even
   split buys a better statistic than the same pot poured into the noisiest row — the strategy is real
   and it is in the background rather than the guide. Quantum's is 24 batches of 100 with a floor of 1:
   reporting at the floor is a coin toss, full even spend is 2.4σ. Two trapped importer refusals: a
   floor whose scatter is already inside the tolerance, and a budget too small for an even split to
   pass.
2. **A panel that grades against a number has to print that number, and the distinction that makes
   that safe is `instruments.js` rule 2.** The panel never prints the *target*, because the target is
   the **answer**; a **goal** is the constraint the answer is written against, and they are not the
   same object. Print "at least 95% inside the corridor"; never print BALANCE's total, which *is* the
   answer. And grading slack on a value the player reports — a BALLPARK tolerance, a VERIFY band, a
   HOLDOUT pass mark, CLOUD's `report` tolerances — stays unprinted: knowing it changes nothing about
   how you get there and invites aiming at the edge of it. `engine/dev/instrumentGoals.mjs` is the
   check, with a selftest, and it fired on four panels the first time it ran. Bring Them Home's FLY
   graded a plan against four criteria — arrive at 90 ± 3 degrees, turning under 1 deg/s, no more than
   16 s of thruster — and printed none of them until after the *single* run it allowed, with the target
   line parked off-canvas. Every check was green, because every check reads the book and the book had
   all four numbers.
3. **A panel that simulates has to let you simulate twice.**
4. **A greyed-out button is only fair when the panel says what is missing.** CONTROL's commit was
   gated on having isolated *the culprit* and reversed it — so the button lighting up announced which
   machine was the answer, rule 1 broken by the enabling rule of a button. The gate is now about the
   variable the player has **named**: isolate it, put it back, then commit, with a strip under the rows
   saying what is outstanding.

**TALLY's subject is convergence, and for most of this engine's life the only picture of it arrived in
the verdict** — after the decision it was evidence for. A column of counts cannot show a number
settling. The panel draws the statistic against shots taken with the same `lineChart` the verdict uses,
redrawn as each batch lands, plus a per-pair ±1σ column and a combined spread: the trace answers *when*
it has converged and the column answers *which row is still moving it*, which is the whole of how a
finite budget should be split. The bound is drawn and the target and tolerance are not.

**CLOUD printed the two numbers it was supposed to be teaching.** Its subject is that a spread is a
spread rather than a number with a decoration on it — and its readouts said `nominal 6.90` and
`spread (1σ) 0.90`, with a bell drawn with its peak on the answer. A player read the centre and width
off the panel, bought actions until the "inside the limits" percentage cleared the pass mark, and never
had to find either number in the scatter. The cloud was scenery. Now **the mean and the uncertainty are
reported by placing them**: three bars over the points — the middle, and ±1σ either side — dragged on
the plot or driven from two sliders, with live counts of how many points fall below the middle, above
it, and between the σ bars. Placed right, a pair halves the cloud and holds about 68% of it, which is
what one sigma *means* and what no version of this panel had asked anybody to notice. Four things keep
it honest: dragging the middle bar carries both σ bars with it and dragging either σ bar moves the
other the same distance the other way, so the controls are the format's own moral; the drawn bell is
the player's *report*, never the truth; the samples are standardised to the authored mean and spread,
so the report is graded against the cloud on the screen and a seed cannot decide a right answer; and an
action makes the report stale, so both bars have to be placed again and the strip says which is
outstanding rather than greying the button and saying nothing. `report: { centreTol, spreadTol }` is the
placement slack — 0.3 of the finishing spread by default, so a narrowed cloud has to be located better.
Two trapped refusals: a tolerance wider than half the finishing spread, and one that is not positive.

**SCIENCETANK had it backwards twice, and `rules` is the fix.** A tank stop's second paragraph was the
*scoring* rule — commit eighty of the hundred, thirty-five on one proposal — while the `evidence` the
allocation is argued from sat behind a collapsed disclosure inside the panel. So the player met the
arithmetic before a single fact. `rules` is an authorable field rendered as its own **Rules** button,
the evidence moves up into `guide`, and the panel drops its own "Evidence available" disclosure when a
stop carries `rules`. The editorial half matters as much: **evidence that only describes the proposals
worth funding is a hint, not evidence.** Fourteen of the 31 tank stops had no evidence at all.

**SWEEP, HOLDOUT, TALLY and PROBE printed no `METHOD` line and no goal line**, because both come from
`instruments.js` and those four predate that registry and live in `questionUI.js` — the four most
instrument-like panels in the engine were the four that never said what kind of move they were. Three
also hardcoded their hint, so a book could not explain its own panel. Quantum's day-10 HOLDOUT asked
you to choose a threshold on one batch, freeze it, and report what it scores on a batch it never saw;
its two tabs said "Calibration shots" and "Shots it has never seen", and *nothing said what either was*,
what a shot is, or why a broad plateau should be trusted where a tall narrow spike should not. All of it
was in `why`, which arrives after the answer. Fixed for all four, not for the one stop: `METHOD` gained
their four lines, `methodBlock` and `goalBlock` are exported from `instruments.js` so the markup and
classes stay single, and `hint` + `goals` are authorable on all four. HOLDOUT also takes
`fitNote`/`testNote` — what each batch *is*, per stop, since a batch is shots in one game and patients in
another — and its idle tab says "no number until you freeze" rather than sitting blank. The pass mark
stays unprinted, and `npm run traps` fires when a book puts it in the hint.

**Then those two new blocks broke the panel, in the way this repo has paid for twice.**
`.modalBody .modalActions` is `position:sticky; bottom:0`, so 150 px of explanation pushed the slider,
the axis labels and both readouts *under* the pinned action row: a plot, a gap, and a button. And
`scrollIntoView({ block: 'nearest' })` — the remedy SWEEP already carried — **does not fix it**, because
an element one pixel inside the scroll container is "in view" by that definition and entirely hidden by
the bar over it; the browser scrolled six pixels and stopped. `showControls()` subtracts the bar's own
height, and all four panels call it. **The DOM had every element, the checks were green, and only a
picture showed the controls were gone.**

## A card is followable or it is not, and one reading cannot tell you which

`engine/dev/readerProbe.mjs` hands every answerable stop to Haiku twice — once
with everything the player sees before answering, once with the question and the
options alone — and reports the pair. 53 of the 90 Quick Discovery stops; the
other 37 are live instruments whose answer is a sequence of moves on a panel, and
serialising those into text would invent a question the game does not ask.

**The pair is the point, and three of its four cells are findings.** Wrong both
ways is a card missing something the question needs. Right without the card and
wrong with it is a card that actively misled. Right both ways is answerable
without the science. Only right-with, wrong-without is the question working.

**But the first version of this reported a clean sweep and it was wrong.** Two
harness bugs came out of the readers rather than the score: DIAGNOSIS candidates
are `{label, mechanism}` objects, so four stops were served **"[object Object]"**
as their options — and the tally recorded two of them *correct*, because the
reader guessed and said so only in the field asking what was unclear. The other
was a BALLPARK template reusing one slot (`{0} × {0}`) under an instruction
saying "choose 1 tiles". **A reader's complaint is data the score cannot carry**,
which is why the prompt asks for the exact phrase it could not follow.

**And the real defect was found by a person, after the sweep said all clear.**
The CMB day-1 ordering stop — five checks on a receiver — asked what a normal
person is supposed to do with it. The card gave **two ordering rules that
disagree at one pair**. Its axis and guide led with interpretability (*"each one
is only interpretable once the ones before it are clear"*, *"this is not a
preference"*, *"work outward from the thing everything else is measured
against"*), and worked outward that rule puts the horn before the sky repeat. The
key is the other way round, and the only thing justifying it is cost — the horn
needs a ladder — which appears in a background bullet arguing the horn should not
be *first*, and in the `why`, which arrives after the answer. **A player
following the stated rule gets it wrong.** Eclipse day 2 is the same class: the
only card carrying a date says *"months early"* and is not the first step.

**Why the probe had not flagged it, and this is the lesson.** It had — on the
first run, in the wrong-both-ways bucket. A rerun after the harness fixes got it
right and the rerun is what got reported. **A stop that flips between runs is the
finding**, and one sample per condition cannot tell a question that was worked
from one that was guessed. The harness now takes repeat runs and reports how many
**distinct** answers a stop produced, plus, for orderings, how many adjacent
swaps from the key — because exact match alone scores a one-pair slip and a random
permutation identically, and for a five-card SEQUENCE that difference is the whole
signal. Asked four times, the CMB stop was right twice and gave two answers
differing in exactly the pair the two rules disagree about.

Both cards were rewritten to name the governing rule and say which wins where the
two collide, rather than reordering the cards — the authored order is the better
practice and the defect was that the card would not admit which principle it was
using. **33 stops asked more than once, 2 gave more than one answer, and both were
SEQUENCE.** After the rewrite each is 4/4 with one answer, and the CMB stop now
fails the bare condition, which is the cell a working question belongs in.

Two things the repeat count got wrong before it was right, both in the direction
of confident noise: rounding counted as disagreement (`AB 2.72` and `AB 2.73` put
two boards in the no-followable-answer bucket that were right every time), so only
the graded part of an answer is compared; and the leak check exempts `answer` when
it is one of the options, because `validateContent` requires `choices` to contain
`correctChoice` verbatim and 14 stops repeat it in `answerText` — an exact-match
rule failed all 14 on its first run. The exemption is against the bare label, and
a planted verdict is a selftest case, because a leak checker that never fires
reports every prompt clean.

**One structural thing the probe cannot fix.** `questionLoad` already bans a
SEQUENCE graded as one exact permutation with no feedback — 51 of Hospital's 110
findings are that decision. It applies at **grade 8 and below**, and every Quick
Discovery is `audience.grade: 9`. Five cards is one in a hundred and twenty. The
ten short games sit one grade above the gate written for exactly this, which is
the grade-2 exemption in this file's own table arriving from the other end.

**What the bare column does not mean.** The reader is a language model, so its
prior is undergraduate physics rather than a ninth grader's, and 46 of 53 stops
came back right with no card at all. That is not a defect list and the report
prints so above the table. What it is good for is narrower: an option set that
falls to elimination on general grounds. Read the reader's own `because` — if it
cites only the option text and never the science, that is the finding.

## What a mission stop looks like

- Three stops per mission plus a callback from day 3; **the day's person stop** is found by walking to a
  named person instead of entering a building.
- **Each stop opens with why it matters now** — which call of how many, whether the earlier ones held, and
  the clock. Composed in `stopDramaHTML()`, so it needs nothing authored; a theme that writes `stop.why`
  overrides it.
- Answer formats: Protocol, Sequence, Ballpark, Science Tank, Diagnosis (instrument panel + candidates,
  draws a figure), TRIAGE, CASEBOOK, and CHOICE — one question, four candidates, and the rebuttals for the
  wrong ones. **CHOICE exists because importers guess.** An activity that is plain multiple-choice gets typed
  as the nearest format the importer knows, which is how the hospital ended up with 36 "diagnoses" with no
  instrument panel and 27 "casebooks" whose proposals read "Other pattern". `theme.js` retypes them; the
  book's own `rebuttals` appear in the verdict.
- **Nineteen more are instruments in `engine/core/instruments.js`**, from counting: six FPS-native
  interaction documents, one per game, specify 104 interactions between them, which turn out to be nineteen
  distinct designs. `gamekit/FORMATS.md` is that catalogue. The twelve carrying four or more instances each:
  **TRIGGER** (write the rule before the number moves), **VALUE** (what would this measurement change),
  **CLOUD** (a distribution against a limit, where narrowing is not shifting), **ALLOCATE** (a finite pool,
  scalar or rate × time), **TRACE** (which channels share a reference; agreement is not independence),
  **ATTEST** (the record is not the condition), **CONTROL** (change one thing, reverse it), **TRIANGULATE**
  (constraints make a region, a systematic moves it), **DEGENERACY** (a family of solutions until other
  physics arrives), **CHAIN** (name the governing transfer), **BALANCE** (close the ledger, find the hidden
  term) and **VERIFY** (predict, act, measure — failing to measure is its own failure). Seven thinner ones:
  **PROPAGATE** (which input width dominates the output's), **STRESS** (candidates against an assumption's
  range), **DELEGATE** (a finite team and what command takes itself), **FLY** (bounded commands on undamped
  dynamics, so the brake has to lead), **RESIDUAL** (structure in what a fit leaves over), **INJECT** (push a
  known population through your own pipeline) and **ROUTE** (a sequence that can be rejoined after an
  interruption). `books/instruments.yml` authors one stop of each across seven days. **Red Sand is the first
  shipped game to author one**: its sol 12 is an ALLOCATE — 430 kWh on a dust-storm sol against seven loads
  that want more than that between them.
- **DERIVE did not come from the documents.** Written for a calculus course, it grades the line the previous
  one actually gives you, and its trap is that one wrong branch per step must stay algebraically valid or the
  step is passable by elimination. It once graded a second half — name the rule that licenses each step — and
  that is **off by default** behind `askRule: true`. The argument for it was that the right line for the
  wrong reason is how somebody passes calculus without learning it; the argument against is what counting
  found, that in five of Midway's 29 steps and ten of Headwater's 33 every candidate carried the *same* rule,
  so the second half was a click with one possible value. A `rules` list without `askRule` is refused rather
  than quietly ignored. **DERIVE is banned below grade 9** — its subject is algebraic manipulation, and a
  softened version is spot-the-malformed-line.
- **Four are instruments the player operates**, not questions they read. **SWEEP** is one control and a
  response plotted only where the player looks — a resonance, a decay, a trade-off. **HOLDOUT** fits a rule
  on one set of data, freezes it, and scores it on data it has never seen; the fitting curve carries a spike
  that beats the honest answer, so overfitting costs the player the stop. **TALLY** accumulates shots into
  bins and builds a statistic, and grades when there is enough data to report. **PROBE** hands over no
  readings at all: the player takes them one station at a time along a physical chain and names where the
  pattern breaks. All four are in Quantum; `engine/dev/instruments.html` draws every one in a theme on a
  single page, the only sane way to look at them — reaching one in the game means playing to the right day
  with time left.
- **Seven formats are graded against the place rather than a board.** TRIAL was first and the exception;
  **GREET** (get round a list of people before the hour is out), **FOLLOW** (stay inside a band behind
  somebody who will not wait), **HUNT** (find enough of the same thing, all drawn on the map), **CANVASS**
  (ask a yes-or-no question until the sample can answer it), **EVADE** (hold a clear radius for a stretch)
  and **TAG** (the same test the other way round — close on somebody walking away, which a straight line
  cannot do, because two people walking the same way close at the *difference* of their paces) followed. The
  panel is a briefing; pressing the button **suspends** it and hands the player back to the site with the run
  going on around them. All share one lifecycle in `engine/world/worldFormats.js` — teleport to the spawn,
  hang something in the scene, run a clock, watch a distance, tear it down however it ends — because five
  copies of that is house rule 1 in a new directory. **Four borrow a person the crowd already owns**
  (`npc.scripted`, honoured by `crowd.js`) rather than building a figure, which would draw a look from the
  world's seeded generator and move every later draw. **Their trap is one sentence in five currencies**: *a
  run whose goal is reached by standing still, or by walking to whatever is nearest, asks nothing* — so all
  read the theme's `site.js` and settle it in closed form. Eighteen cases in `npm run traps`. And the
  measurement that matters is the one a browser cannot make: `npm run drive` plays them through a **stub
  world** that hands back whatever the play asked for, so it is blind to whether walking up to somebody
  counts as a greeting. `engine/dev/worldFormats.mjs --selftest` is that half, in Node, inside `npm run
  check` — and its first FOLLOW case passed while measuring the wrong thing, which is why the case that
  survives is walking at the guide's shoulder.
- **Five more formats are fun first, in the same registry on purpose.** **BELT** (a binary category sorted
  against a line that speeds up), **TRIAL** (the theme's own world, driven through gates, graded on the order
  rather than the clock), **HOLD** (one quantity held inside a closing band while scripted loads push it
  out), **SPOT** (a standing instruction replaced mid-run without announcement), **STACK** (the
  `spectrum_stack.html` port, a question rail over a filling well where a wrong answer packs a row) and
  **LOB** (angle and charge against a mark, with launch speed deliberately withheld so it cannot be
  computed). The move rendered is the *player's* rather than the scientist's, and it exists because a stop a
  child replays is worth as much as one a specification asked for. They are entries in `INSTRUMENTS`, not a
  second system, because `questionUI`, `fieldCoverage`, `instrumentGoals`, `instrumentTraps`,
  `instruments.html` and `instrumentDrive` would each have to learn a special case — and six tools learning
  one is how the engine got forked the first time.
  **The line they must not cross is rule 3, difficulty is judgment never dexterity**: speed is the pressure
  and accuracy is the grade, so `ctx.commit(ok)` fires on the fraction sorted right and never on the score.
  **SPOT is the argued exception** — the cost of a withdrawn instruction is measured in seconds and a version
  with no clock measures nothing, so it weights the seconds either side of a change while refusing to grade
  reaction speed; for Sightline that is the AP Psychology syllabus rather than flavour.
  **STACK is suspended** — reported broken in play, and `SUSPENDED_FORMATS` in `normalize.js` says so. A
  suspended format keeps its panel, METHOD line and traps; what is refused is *authoring* one, at both ends —
  `import-book.mjs` fails the stop and `validateContent` fails a theme shipping one through a stale generated
  file. `books/instruments.yml` keeps its STACK stop commented rather than deleted, because deleting it would
  mean rewriting the bank to lift the suspension, and `npm run traps` skips its four cases *out loud* rather
  than passing them vacuously — a blanket refusal would otherwise satisfy every "the importer refuses this"
  assertion for the wrong reason. Lifting it is deleting one line.
  Two pieces of engine came with them, both general: `playSurface.js`, a canvas that repaints every frame and
  pauses itself when the tab backgrounds (`figures.js` draws a picture once, the wrong shape for anything
  that moves), and `ctx.onClose(fn)`, the first teardown hook a panel has ever had, because `bind()` returns
  nothing and a frame loop nobody cancels draws into a detached canvas for the rest of the session. TRIAL
  needed three more, all optional and absent in every harness: `ctx.world`, `ctx.suspend()` and
  `ctx.resume(html)`. `engine/world/trial.js` owns the gates and knows nothing about the right order;
  `instruments.js` still imports no three.js, which keeps it loadable in Node and on a page with no scene.
- **A gate is not a building's centre, and a screenshot is the only thing that said so.** TRIAL gates
  resolved by building id were placed at `x, z` — the middle of the building — so every ring rendered under
  the floor with its beacon inside the roof, and a solid collider stood between the player and all of them.
  The importer's geometry check passed, the driver passed, the run completed and the order came back correct,
  **because every harness teleports**. Gates stand off the door by `d / 2 + 10` on `kit.js`'s own `facing`
  convention.
- **A step in the load is a step in the rate.** HOLD's whole subject, and why its trap can be settled in
  closed form: integrate the authored disturbances with the control untouched and compare the *fraction* of
  the run inside the band against the pass mark. The first version asked only "does the needle ever leave",
  which a board a player passes by doing nothing satisfies.
- **Every instrument carries a trap, and the trap is an importer check.** A cloud whose pass mark a re-target
  reaches, an allocation board affordable whole, a chain whose distractor governs, a verify whose every
  prediction is accepted — all render perfectly, grade perfectly, and teach the opposite of what they were
  written for. `npm run traps` breaks all 35 and asserts the importer refuses each.
- **People stand aside** (`engine/people/crowd.js`). Walking into somebody displaces them — straight back where there is room, sideways
  where there is not. A four-metre passage with two people in it is otherwise a blocked passage the player
  cannot ask to move.
- **Every room is walkable whenever you like.** What changes with the mission is whether a case is open
  there. A room with nothing open shows a short card and charges nothing — it is not a locked door.
- **The outdoor games have interiors.** A door opens a real room built by
  `engine/world/interiorBuilding.js` from the theme's `interiors` block: bench, live instrument screen, case
  plate, case stand, way out. Rooms are built lazily in an *interior district* at x ≈ 4000 and entering
  teleports you there — not inside the exterior shells, which are solid boxes on graded terrain. The caller
  swaps the player's ground function and bounds (`setGround` / `setBounds`) on the way in and back on the way
  out.
- **Questions are instrument-first.** Any lesson can carry a `figure` (`engine/core/figures.js`) and every
  format renders one: Ballpark runs a live readout and settles onto a log scale against the true value,
  Sequence is a numbered rail, Protocol draws its matches as lines that redraw as you choose.
- **Right or wrong, the verdict is a card on its own overlay**, not appended below the question. It carries
  the figure that shows *how* wrong.
- **The map shows the person you have to find**, where they are standing now and which way they are facing;
  you carry a facing arrow too. Person stops used to be findable only by walking the town reading nameplates.
- Talking to anyone who is not this mission's person opens their passage and one question about it, worth $1
  once. The passage closes before the question; reading it again is offered and forfeits the dollar. The
  question is authored where the roster carries a `quiz` array, and generated by lifting a sentence where it
  does not.
