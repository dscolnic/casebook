# The interaction catalogue — 19 unique designs across six games

> **Status, August 2026 — all nineteen are built.** `engine/core/instruments.js`
> renders them, `tools/import-book.mjs` validates them and refuses the trap each
> one carries, and `books/instruments.yml` is the worked example: the Meridian
> Verification Office, seven days, one stop per format.
>
> ```sh
> npm run traps                     # break every trap; the importer must refuse all 35
> npm run drive instruments         # open every panel in Chrome, answer it right and wrong
> THEME=instruments npm run dev     # then /engine/dev/instruments.html
> npm run lessons                   # then /engine/dev/lessons.html — two authored stops of
>                                   # every format, from two games, answerable
> ```
>
> The last one is the one to open to *judge* a format rather than test it: the
> panel inside the card the player actually meets, with that game's person asking,
> graded by the engine's own grading, and the verdict it gives when you are wrong.
> It is also the only place all 35 can be compared side by side, since most of them
> are authored in one game each.
>
> `npm run drive` is the one that matters. These formats are interactive, so a
> panel can render perfectly, print its question, expose its commit button, and
> never reach the grade because one selector is wrong — and nothing in
> `npm run check` can see it. It found exactly that on the first run: TRACE gave
> its resource container the same class as its resource buttons, so a click
> bubbled to a handler that read `dataset.res` off a div and graded every right
> answer wrong. It also found an ALLOCATE stop whose required answer was covered
> by its own protected items, so every plan passed. Neither was visible in the
> book, and both are now checks.
>
> Tier 2 followed and cost less, because the tooling existed first. What it did
> turn up was older: `tools/yaml-lite.mjs` silently dropped a comma-split
> fragment with no colon in it, so `{ landmark: the second door, hinged inward }`
> parsed as "the second door" and nothing downstream could tell. Quantum,
> Blackout and Aftershock had **36 lines** shipping truncated — choice labels and
> mechanisms cut off mid-sentence, in three games that pass every check. The
> parser now refuses it, and all three books are repaired.

Six FPS-native interaction documents now exist, one per game:

| Document | Game | Interactions specified |
| --- | --- | --- |
| `INTERACTION_IDEAS.md` | Quantum | 14 |
| `CONTAMCITY_INTERACTION_IDEAS.md` | The Contaminated City | 30 |
| `BRING_THEM_HOME_INTERACTION_IDEAS.md` | Bring Them Home | 15 |
| `PLANETARY_DEFENSE_INTERACTION_IDEAS.md` | Planetary Defense | 15 |
| `DEEP_WATCH_INTERACTION_IDEAS.md` | Deep Watch | 15 |
| `AFTERSHOCK_INTERACTION_IDEAS.md` | Aftershock | 15 |

**104 authored interactions. They are 19 distinct designs.**

That ratio is the finding. Six documents written for six unrelated subjects —
orbit determination, submarine casualty control, analytical chemistry,
earthquake engineering, spacecraft power, superconducting qubits — converge on
nineteen moves. Each of those moves is a *format*: build it once in
`engine/core/questionUI.js`, author it from a book, and every game gets it.

Quantum's document already produced four of them — `SWEEP`, `HOLDOUT`, `TALLY`,
`PROBE` — which is the precedent this file extends.

---

# What the engine renders today

Twelve formats, all validated on import in `tools/import-book.mjs`.

| Format | The player | Proven in |
| --- | --- | --- |
| `CHOICE` | One question, four candidates, a rebuttal per wrong one | every game |
| `TRIAGE` | Sorts items into named buckets | Quantum 6, Hospital 15 |
| `CASEBOOK` | Weighs proposals against a body of evidence | Hospital 26, Quantum 6 |
| `PROTOCOL` | Matches situations to responses, drawn as lines | every game |
| `SEQUENCE` | Puts steps in order on a numbered rail | Project Y 41 |
| `BALLPARK` | Estimates a magnitude against a live log scale | Project Y 38 |
| `SCIENCETANK` | Argues a position before a panel | Project Y 19 |
| `DIAGNOSIS` | Reads an instrument panel, picks among candidates | Hospital 35 |
| `SWEEP` | Turns one control; the response is plotted only where they look | Quantum 6, Blackout 1 |
| `HOLDOUT` | Fits on one set, freezes, is scored on data it never saw | Quantum 1 |
| `TALLY` | Accumulates shots into bins, decides when there is enough | Quantum 1 |
| `PROBE` | Takes readings station by station, names where the pattern breaks | Quantum 1 |
| `TRIGGER` | Writes each stage's threshold on a blank board, then the updates arrive | Meridian 1 |
| `VALUE` | Spends a budget on evidence, graded on what would change the decision | Meridian 1 |
| `CLOUD` | Narrows or shifts a distribution against a corridor | Meridian 1 |
| `ALLOCATE` | Spends a finite pool, watching which questions the plan can answer | Meridian 1 |
| `TRACE` | Opens each channel's dependencies, keeps what stands, names the source | Meridian 1 |
| `ATTEST` | Verifies claims on a budget and holds the ones evidence does not back | Meridian 1 |
| `CONTROL` | Changes one variable, measures, reverses it, names the cause | Meridian 1 |
| `TRIANGULATE` | Switches constraints in, corrects a systematic, clicks the region | Meridian 1 |
| `DEGENERACY` | Slides two controls along a locus until other physics collapses it | Meridian 1 |
| `CHAIN` | Builds a transfer path in order and names the governing link | Meridian 1 |
| `BALANCE` | Reads streams, decides which to count, closes the ledger | Meridian 1 |
| `VERIFY` | Locks a prediction, intervenes, and has to spend to find out | Meridian 1 |
| `PROPAGATE` | Reads a live error budget and buys the measurement that moves it | Meridian 1 |
| `STRESS` | Moves an assumption through its range and watches candidates go dark | Meridian 1 |
| `DELEGATE` | Takes one condition, hands over the rest with an owner and a threshold | Meridian 1 |
| `FLY` | Commits a pulse-and-brake plan, then watches it run out | Meridian 1 |
| `RESIDUAL` | Compares residual fields and refuses the lowest RMS | Meridian 1 |
| `INJECT` | Runs a known population through the pipeline and funds by warning time | Meridian 1 |
| `ROUTE` | Learns a route lit, rebuilds it dark, and recovers after a blocked door | Meridian 1 |
| `BELT` | Sorts a binary category against a line that speeds up | Meridian 1 |
| `TRIAL` | Drives the theme's own world through gates, graded on the order | Meridian 1 |
| `HOLD` | Holds one quantity inside a closing band while loads push it out | Meridian 1 |
| `SPOT` | Takes what the standing instruction wants, and it is replaced mid-run | Meridian 1 |
| `STACK` | Answers a rail while a well fills; a wrong answer packs a row | **suspended** |
| `LOB` | Sets angle and charge against a mark, with the launch speed withheld | Meridian 1 |
| `GREET` | Gets round a list of people before the hour is out | Meridian 1 |
| `FOLLOW` | Stays inside a band behind somebody who will not wait | Meridian 1 |
| `HUNT` | Finds enough of the same thing, and decides what to leave | Meridian 1 |
| `CANVASS` | Asks a yes-or-no question until the sample can answer it | Meridian 1 |
| `EVADE` | Holds a clear radius for a stretch of time, using the ground | Meridian 1 |
| `TAG` | Closes on somebody walking away, which a straight line cannot do | Meridian 1 |

**`STACK` is suspended.** It was reported broken in play, so `SUSPENDED_FORMATS` in
`engine/content/normalize.js` now refuses it: `import-book.mjs` fails a book that authors
one and `validateContent` fails a theme that ships one. The panel, the METHOD line and the
four traps all stay where they are, and `books/instruments.yml` keeps its stop commented
out rather than deleted — the fix is meant to arrive, and rewriting the bank to lift a
suspension is the wrong price. `npm run traps` skips its four and says so. Deleting the
line in `SUSPENDED_FORMATS` lifts it; nothing else has to change.

`BELT`, `TRIAL`, `HOLD`, `SPOT`, `STACK`, `LOB`, `GREET`, `FOLLOW`, `HUNT`, `CANVASS`,
`EVADE` and `TAG` are the odd ones out and belong to a
different argument: they did not come from the six documents, and the move they render is
the **player's** rather than the scientist's. It carries one bit of subject matter — a binary category — at a
speed that leaves no room to reason it out, and it exists because a game a child
replays is worth as much as a format a specification asked for. `ARCADE.md` is
that argument, along with the six others planned on the same footing, and the
reason all of them are entries in this registry rather than a second one.

**Seven of them are graded against the place rather than against a board.** `TRIAL`
was the first and `GREET`, `FOLLOW`, `HUNT`, `CANVASS`, `EVADE` and `TAG` followed: the panel
is a briefing, pressing the button suspends it, and the player is handed back to the
site with the run going on around them. They share one lifecycle in
`engine/world/worldFormats.js` — teleport to the spawn, hang something in the scene,
run a clock, watch a distance, tear it all down — and one trap written five ways: *a
run whose goal is reached by standing still, or by walking to whatever is nearest, is a
run that asks nothing*. Their traps are the only ones besides `TRIAL`'s that read a
theme's own `site.js`, and `engine/dev/worldFormats.mjs --selftest` measures the half a
browser driver cannot reach, because it plays all six through a stub world. `ARCADE.md`
§17 is the whole of it.

The line they must not cross is instrument rule 3, *difficulty is judgment, never
dexterity*. Five of the six do not cross it because **speed is the pressure and
accuracy is the grade**: `ctx.commit(ok)` is called on the fraction sorted
correctly, never on the score, so a slow player who sorts twenty items right
passes.

**`SPOT` is the exception, and it is an argued one rather than a slip.** Its
subject is the cost of a withdrawn instruction, and that cost is measured in
seconds; a version with no clock is a sorting exercise everybody gets right. What
it refuses to grade is reaction *speed* — items sit on the board for the better
part of two seconds and nothing needs a three-pixel target. What it weights is
the few seconds either side of a change, so a uniformly slow, uniformly attentive
player passes and a quick one still working to the old instruction does not. For
Sightline that is the AP Psychology syllabus rather than flavour. Any further
format that wants the clock has to make that case in as much detail.

Twelve of these were the read-and-answer engine as it stood; **nineteen are the
designs below, and all of them are now built.** `books/instruments.yml` — the
Meridian Verification Office — is the only book that authors them so far. The
eight shipped games are still read-and-answer almost end to end, which is now a
content job rather than an engine one.

---

# The nineteen designs

Ranked by **reach** — how many authored interactions each unlocks, and across
how many games. Reach is the whole argument for building one: a design with
eight instances in five games pays for its renderer five times over.

Games: **Q** Quantum · **CC** Contaminated City · **BTH** Bring Them Home ·
**PD** Planetary Defense · **DW** Deep Watch · **AS** Aftershock

## Tier 1 — twelve designs, four or more instances each

### 1. `TRIGGER` — write the rule before the number moves
**8 instances · 5 games.** The single highest-reach design in the corpus.

The player commits decision rules *before* the data arrives, then the data
arrives and they are held to their own rules. Attacks the most durable
misconception in every one of these subjects: that a decision made after seeing
the number is the same decision.

- PD M14 — thresholds for public response, written before the probability updates; Ellery's whole character
- CC M14 — the release decision rule chosen before the 9 ± 2 result is revealed
- BTH M13 — an abort trigger written before the burn is committed
- DW M08, M12, M15 — every delegation carries a first action and a report threshold; every quiet-running trade carries a restoration deadline
- AS M09 — cordon segments released on a measurable condition, never on a date
- AS M15 — owner, deadline and evidence of closure, because recording the item had already failed

**One rule to a board, and the importer refuses a second.** It shipped as two and
three stages, because the interaction documents describe response boards with
staged actions and that is what a real one looks like. What that produced was a
scheduling exercise sitting on top of the idea: three lead times, three windows,
two axes and a hidden stream, all at once. A player with a doctorate in
astrophysics could not follow it, and every fix that made the card clearer also
made it longer. The idea itself — decide now at what reading you would act, far
enough ahead that the action can still happen — is entire in one rule. A stop
that wants a second action wants a second stop. All fourteen boards were rewritten
to the single stage that carried the most of the lesson, and `import-book`,
`validateContent` and `smokeCampaign` all fail anything else.

**Trap the importer must refuse:** a rule set where every rule fires the same
way on the scripted stream. If the data never crosses a threshold the player
wrote, they were never held to anything.

**What the panel prints before release, and why.** A player reported the board
as unplayable rather than hard, and they were right: three sliders on a bare
scale, with no way to tell whether 0.35 or 1.2 was even the right order of
magnitude. Committing before the data is the format; committing with nothing to
commit *against* is a guess. So the panel now prints the schedule — every update
with its `at` and its `hoursLeft`, the readings blanked — which is not the answer
(the values are) and which turns "pick a number" into "decide which update this
stage should fire on". Each row carries the deadline that follows from its own
lead time ("in time only up to Tuesday 20:00"), lead times are given in days once
they pass two of them, and the goal block says the stages are graded together.
All of it is derived from data the board already had.

**And that was still not enough, which is the more useful finding.** All of the
above is text beside three sliders, and a player with a doctorate in astrophysics
could not follow the board. The reason is structural rather than editorial: the
player sets a number on the **value** axis and is graded on where that number
lands on the **time** axis — which update crosses it first, and whether that
update still leaves the action its lead time. A mapping between two axes is a
plot, and no paragraph is a substitute for one. Three rounds of clearer prose had
each made the same card longer and no easier.

So the panel is a plot now. Time along the bottom with every update's position on
it, the scale up the side, and one horizontal line per stage at the number that
stage is set to — solid while that line would still be in time, dashed from the
point its own lead time has run out. The sliders stay: they are the input, they
are keyboard-reachable, and `instrumentDrive` drives them. Release draws tonight's
readings on the same axes, with a mark where each rule fired and a dropped line to
the hour it fired at. Nothing animates and nothing runs a frame loop — the SVG is
rebuilt on each slider input — because a panel with its own clock is what put the
driver in the business of counting frames once already.

`rehearsal` is the other half, and it is what makes the first number choosable:
`{ note, stream: [{ value, hoursLeft }] }`, a **past** campaign of the same
quantity, drawn behind the axes in dashed grey. A bare scale from 0 to 2.4 says
nothing about what 1.2 would mean or how fast the quantity moves; a trace from
last February says both, without saying anything about tonight. The importer
refuses a rehearsal that is this campaign's own readings — that is the answer,
drawn in grey, before the player has touched a slider — and one whose points fall
outside the campaign's own time span, since the plot's x axis is drawn from the
live stream.

The one authored addition is `scale.anchors` — two to four `{ at, means }` pairs
saying what a reading on this scale would *do*. A rate scale is not meaningful on
its own: "1.2 m a day" is a number until somebody says the crest is three days
away at it, and then the lead times are arithmetic instead of atmosphere. Optional,
because a probability scale needs no such thing; refused rather than trimmed when
an anchor falls outside its own scale, since it is a sentence the player is asked
to reason from.

### 2. `VALUE` — what would this measurement change?
**8 instances · 4 games.** Scarcity, orthogonality and irreversibility in one.

Every option costs something — money, radar time, a destroyed aliquot, a yard
slot, four days. The player picks by what would *change the decision*, not by
what sounds most rigorous. Some purchases are irreversible and the inventory
visibly decreases.

- CC M04 — the ambiguous peak: retention time, mass spectrum, infrared, blank
- CC M01 — the evidence kit, where an aliquot committed to a destructive analysis is gone
- PD M03 — which follow-up observation squeezes the orbit cloud, and in which direction
- PD M08 — Fischer treating radar time as scarce: what unique dimension does an echo buy
- PD M11 — which survey upgrade buys warning time rather than detections
- DW M14 — one yard slot; the refit that removes a causal path, not the best specification number
- AS M06 — the plant room against a four-day coring programme; Halvorsen forcing the value-of-information calculation
- AS M11 — test the failure mode you intend to rely on, not the most destructive one

**Trap:** a budget that buys the whole board, an option that dominates, or a
set of options all on one evidence axis. Any of the three and the choice is free.

### 3. `CLOUD` — a distribution against a boundary
**8 instances · 5 games.**

Not a number with error bars printed on a card: a visible spread against a
limit. Moving the nominal drags the cloud with it; only information narrows it.

**The mean and the uncertainty are reported by placing them.** Three bars over
the scatter — the middle, and ±1σ either side — dragged on the plot or driven from
the two sliders under it, and the panel counts what falls where as they move:
points below the middle, points above it, points between the σ bars. A pair
placed right halves the cloud and holds about 68% of it, which is what one sigma
means; the panel prints no true centre and no true spread, and the bell drawn on
the plot is the player's own report rather than the truth. An action redraws the
cloud, so the report goes stale and both bars have to be placed again — the strip
under the plot says which is outstanding rather than greying the button silently.
Graded on the report against the cloud on screen, and on the reported band's share
inside the corridor. `report: { centreTol, spreadTol }` is the placement slack,
0.3 of the finishing spread when it is left out, and never printed.

- BTH M11 — the 5.3°–7.7° corridor; "you moved the dot, the cloud came with it"
- BTH M03 — burn now or measure first, when the correction is the size of the uncertainty
- CC M14 — nine plus or minus two against a limit of ten
- PD M03, M04 — the orbit family, and weighted virtual asteroids where impact probability rises while the nominal miss moves the other way
- PD M13 — terminal-approach Monte Carlo
- DW M04 — the two-mile uncertainty circle through a four-mile channel; the envelope, not the centre point, has to fit
- AS M07 — the Omori fit with a band, and simulated sequences that scatter around it

**Trap:** a book where recentring the nominal passes. Structurally the same
check `HOLDOUT` already makes. And a placement tolerance wider than half the
spread the player finishes with, which passes a bar put anywhere near the cloud.

### 4. `ALLOCATE` — a finite pool across competing claims
**8 instances · 4 games.**

Two variants, one format: a **scalar** pool (twenty sample bottles, a budget)
and an **integrated** pool where each choice costs rate × time and the schedule
is the answer. The integrated variant's second half is that every switch
*starts a clock somewhere else*.

- CC M03, M05 — twenty laboratory slots, then thirty under a different question
- CC M13 — analyte channels, where adding compounds costs run time
- CC M15, PD M15 — the post-emergency budget, the legacy capability fund
- BTH M05 — the 62-hour power ledger; "you saved watts, I asked you to save watt-hours"
- BTH M07 — a limited quantity of insulation onto selected surfaces
- DW M12 — the quiet lineup, where every secured machine buys decibels and starts a deadline on atmosphere, cooling or array geometry

**Trap:** a pool large enough to buy everything, a dominated item, or a single
feasible plan. The point is that several plans are feasible and they answer
different questions.

### 5. `TRACE` — does agreement mean independence?
**7 instances · 5 games.**

Several channels agree. The player opens the dependency view, finds which share
a reference — a voltage, a clock, an inertial solution, a denominator — and
which genuinely does not. No existing format can render this: `DIAGNOSIS` shows
readings, `PROBE` shows a chain, neither shows what a reading *depends on*.

- BTH M01 — three digital pressure channels on one shared reference voltage
- BTH M14 — several ground stations inheriting one timing model; the apparent trajectory shift collapses on reprocessing
- DW M03 — chart overlay and electronic repeat, both on the same inertial solution; the sounder is a different physical chain
- AS M12 — the wrong zero. The best instance in the corpus: measure the 1.6 factor, recompute the ratio, then open the dependency graph and correct *only* what used that denominator
- CC M15 — Haddad challenging a claim whose independent evidence shares one failure mode
- CC M14 — which distribution points have genuinely independent confirmation
- PD M01 — a real candidate survives a change of coordinate system and instrument

**Trap:** no genuinely independent channel (the answer is unreachable), or fewer
than two sharing (there is no common mode). And no channel may name its own
dependency in its label — `PROBE`'s cause rule, for the same reason.

### 6. `ATTEST` — the record is not the condition
**6 instances · 3 games.**

A claim is signed, indicated, drawn or noted. The player has to find the ones
whose backing evidence is absent, stale, or contradicted by a direct
measurement — and mark what was *not* established rather than guessing.

- DW M06 — the lamp says open and the cable is still energized
- DW M13 — rig-for-dive as an evidence audit, with one signature from a person who was ashore
- AS M03 — six minutes, a locked rear wing, and "not observed" instead of "clear"
- AS M06 — observed restraint against what the drawing assumed
- AS M08 — an unlabelled core that Sørensen refuses before the press runs
- AS M15 — the whole capstone: the organisation recorded uncertainty and never assigned ownership

**Trap:** a board where the unbacked claims are visibly different from the
backed ones. And rechecking everything must cost — AS M13's interface
"rewards risk-based focus", which only works if indiscriminate verification
runs out the clock.

### 7. `CONTROL` — change one thing, hold the rest, confirm by reversal
**5 instances · 3 games.**

The controlled experiment as a playable object. The player picks one variable,
holds the others, watches whether the feature tracks it, and — the part every
document insists on — restores the variable to confirm the feature returns.

- DW M09 — four candidate machines, one machinery-order tone; securing several at once makes the display quieter and resolves nothing
- DW M02 — change depth across the layer while holding the plant fixed; gain changes sensitivity, not propagation geometry
- PD M06 — vary airmass against a standard star and watch which features are the atmosphere
- PD M07 — add stations at other longitudes and watch the 4.8-hour alias weaken while the real 3.5-hour repetition does not
- PD M01 — blink the exposures, toggle detector against sky coordinates

**Trap:** a variable set where changing everything at once still reaches the
answer. And the reversal has to be graded — without it, coincidence passes.

### 8. `TRIANGULATE` — several constraints, one region
**5 instances · 4 games.**

One measurement gives a locus; several give a region; a systematic error
translates the whole region without making any individual measurement look
wrong. Distinct from `CLOUD`: `CLOUD` attacks "the nominal is the answer",
`TRIANGULATE` attacks "one measurement locates it" and "precision is accuracy".

- AS M02 — pick P and S arrivals on three stations, draw three circles, get an overlap region and not a pixel; then toggle the clock-drift correction and watch one circle move
- BTH M02 — range, bearing and Doppler onto one timeline, then a withheld observation
- DW M03 — soundings along a short leg against charted contours to constrain where the boat could be
- DW M04 — the position envelope placed on the channel
- PD M03 — the orbit family squeezed from different directions by radar, parallax and arc length

**Trap:** three constraints that intersect at a point. If the region has no
area, the player learns that measurement is exact.

### 9. `DEGENERACY` — many solutions, one observable
**5 instances · 3 games.**

Two controls, one measurement, and a whole locus of combinations that fit it
equally. Then a measurement based on *different physics* arrives and the family
collapses. The lesson is never "use the second instrument" — it is watching a
two-dimensional family become a point.

- PD M05 — diameter and albedo against reflected brightness, until thermal infrared cuts across
- PD M10 — strength, density and entry angle against one observed signature
- DW M11 — a 2 °C rise means nothing without flow; high flow and poor transfer produce the same small difference
- CC M09 — pH is a state measurement and total acid demand is a different quantity; the titration is what separates them
- CC M05 — the same brightness-style ambiguity in a calibration curve

**Trap:** a second measurement that only confirms the first. It has to be
orthogonal in the data, not just in the story.

### 10. `CHAIN` — trace the path, name the governing link
**4 instances · 4 games.**

A physical transfer path — force, heat, current, air — where the weakest
*required* transfer governs, however strong everything around it is. Pure
topology: unlike `PROBE`, there are no readings to average.

- AS M05 — roof diaphragm to collector to anchor to wall to foundation; the small anchor controls the large panel
- DW M11 — bearing to oil to fresh water to seawater, and the weak final leg
- CC M11 — two metals, an electrolyte path and an electrical connection; "you repaired the hole, show me what you repaired about the circuit"
- BTH M07 — the metal thermal bridge left exposed while a warm interior panel gets the insulation

**Trap:** a link that is the obvious weak one by size or prominence. Both
documents name this failure independently — "the largest component must be the
weak one" is the distractor, not the answer.

Every link takes a **`reading`** — its observed state, printed on the rail once
the link is placed. It is not decoration: it is the only evidence the player has
for naming the governing link, so a chain without readings is a chain answered
by guessing. `capacity`/`unit`/`evidence` are refused by the importer; they are
the three names this field was authored under while none of them rendered.
The bank prints each card's name **and** what it transfers, and a placed link can
be taken back off the rail one at a time.

### 11. `BALANCE` — close the ledger, find the hidden term
**4 instances · 3 games.**

A quantity enters, and the player accounts for where all of it went. One
removal term is running the whole time and is not in the obvious reading.

- DW M05 — the bilge rose 320 L/min while the pump removed 90; the leak was 410
- DW M11 — heat carried away is flow × capacity × rise, not rise alone
- CC M12 — 100 kg through the plant; the water looks dramatically cleaner long before the mass balance closes, and Delgado asks where the 71 kg went
- BTH M05 — integrated amp-hours against instantaneous watts

**Trap:** a ledger that closes on the obvious streams. The hidden term is the
format.

### 12. `VERIFY` — predict, act, measure, compare
**4 instances · 4 games.**

The player states a quantitative prediction, intervenes, and then has to *make
the measurement that tests it*. Failing to measure is a distinct failure from
predicting wrong — which is exactly PD M12's stated rule.

- PD M12 — "do not let spacecraft hit asteroid equal mission succeeded"; the campaign fails if the deflection is never measured
- AS M14 — CPT before and after against an acceptance line over the whole depth interval, and 2.75× qc is not 2.75× resistance
- DW M11 — restore the second pump and verify flow, temperature and bearing respond as predicted
- CC M11, M12 — the corrosion control and the treatment train, both graded on the measured outcome

**Trap:** a prediction the world satisfies automatically. And the verification
measurement must be skippable, or its absence teaches nothing.

## Tier 2 — seven designs, two or three instances. Built, and thin on reach.

### 13. `PROPAGATE` — the error budget
**4 instances · 3 games.** Which input term dominates the output uncertainty,
and therefore which measurement is worth improving. Ranking by exponent alone
is the trap.
PD M09 (mass, density, velocity into kinetic energy) · PD M13 (each error source
assigned to the subsystem that can reduce it) · BTH M14 (navigation error against
burn execution uncertainty) · CC M14.
**Trap:** the largest exponent is also the dominant term, which makes the
shortcut this format exists to break give the right answer. And the ledger:
`budget`, in the stop's own `costUnit`, must afford measuring the dominant term,
must *not* afford it together with the cheapest decoy — or buying everything wins
— and must leave at least two candidates inside it, or affordability names the
answer before the arithmetic does.
**The costs were decoration for four instances.** Every button printed a price,
the panel said "one of these is affordable", and no budget existed in the engine,
the importer or any book: cost entered neither the disabled state nor the grade.
The buttons also never named the input row they improve — the label is the work
("layer-count the replicate core"), not the term — so the pairing was discoverable
only by spending, which is the one move that cannot be taken back. Each button now
leads with its row's name and lights that row on hover.

### 14. `STRESS` — the choice that survives being wrong
**3 instances · 3 games.** Candidates across a table, one assumption moved
through its range, and the nominal optimum fails somewhere in it.
BTH M13 ("you optimized the estimate, I asked you to survive the error bar") ·
CC M08 · CC M02.
**Trap:** a candidate that wins everywhere. Then it has collapsed to `CHOICE`.

### 15. `DELEGATE` — a finite team against evolving problems
**3 instances · 2 games.** `ALLOCATE` with a clock and consequences: unattended
trends worsen while the player is elsewhere, and an assignment is not valid
without an owner, a first action and a return threshold. Pairs with `TRIGGER`.
DW M08 · DW M15 · AS M13 (where the real lesson is that some actions are cheap
and parallelisable, so it is not a pick-one problem at all).

### 16. `FLY` — bounded commands on undamped dynamics
**3 instances · 2 games.** The state keeps moving after the input stops, so the
input has to lead. Build it as *commit a plan, watch it run* — both documents
are explicit that difficulty must not come from dexterity.
BTH M04 ("you stopped accelerating at ninety, you did not stop rotating") ·
CC M09 (staged dosing with hold points and an overshoot trigger) · BTH M03.
**Trap:** a target reachable with one command at full magnitude.
**Fly it as often as you like.** The panel shipped disabling its Run button and
both sliders after a single click, against its own docstring, so the player
found out where the target was and then could not aim at it. One run teaches
that you overshot; the second teaches *how far the brake has to lead*, which is
the entire format. Earlier attempts stay on the plot as ghosts, because the
lesson is the difference between them, and only committing freezes the plan.

### 17. `RESIDUAL` — structure in what is left over
**2 instances · 2 games.** A low RMS with a pattern in it is worse than one
isolated large residual. Delacroix's entire character.
PD M02 (residual vectors mapped over the focal plane, then refit after
correcting the suspect camera) · BTH M02 (inspect residuals, not only the
fitted orbit; "pretty is not predictive").

### 18. `INJECT` — measure your own blind spot
**2 instances · 2 games.** Push a synthetic population through your own
pipeline and count what comes back. The only design that measures the
*measurement* rather than the world.
PD M11 (recovery against magnitude, solar elongation, cadence and linking, with
warning-time distribution as the output, not detections) · CC M14 (locations
with detection limits above the release criterion).

### 19. `ROUTE` — spatial sequence that survives interruption
**1 instance · 1 game.** DW M01: walk the compartments lit, return degraded,
recover after a blocked hatch. Pace-counting and turn-counting both fail;
compartment sequence does not.

This file previously said not to build it, on the grounds that one instance in
one game does not pay for a renderer and that the lesson is spatial. Built
anyway, and the half that made it worth having is the one the panel can carry:
after the blocked door the player has to say *which compartment they are
standing in* from its landmark, which is precisely what a pace count cannot
answer. The world half — actually walking it with the lights down — is still a
world feature and still unbuilt. **Its reach is genuinely one game.** Do not
author it anywhere the interruption is not the point.

---

# What not to build

- **A spatial map-drawing format.** CC M02's plume corridor is one idea in one
  game, filed by its own document under higher world effort. `STRESS` carries
  most of its lesson.
- **Anything replacing a short calculation.** All six documents say it
  independently, and each names its own examples: BTH keeps torque and combined
  uncertainty, CC keeps the limiting reactant, PD keeps the Kepler period and
  the joule-to-megaton conversion, AS keeps the value-of-information screen, DW
  keeps the blade-pass comparison. `BALLPARK` already does this well.
- **A minigame after every lesson.** Every document states the same rule in its
  own words: when an interaction replaces a screen, the old question does not
  also get asked. BTH, PD, DW and AS all make their manifest authoritative about
  `replaces` for exactly this reason.

# What is left

**Nothing, in the engine.** All nineteen ship in `engine/core/instruments.js`,
all nineteen are driven right and wrong by `npm run drive`, and all thirty-five
importer traps fire under `npm run traps`.

What remains is not engine work at all: **the nineteen exist and almost nothing
is authored against them.** Six documents specify 104
interactions across six games; `books/instruments.yml` carries nineteen, one per
format, in a place invented to demonstrate them. Every stop in the tables above
is now a book edit rather than a renderer.

## Writing one

Read the stop in `books/instruments.yml` for the format you want — each carries a
comment naming the checks it has to clear and why each one exists — then:

```sh
node tools/import-book.mjs books/<theme>.yml <theme> --verify
npm run drive <theme>
```

The importer refuses a board on which every move passes. That is the whole
design rule of these, stated as arithmetic: a cloud whose pass mark a retarget
reaches, an allocation affordable whole, a chain whose distractor governs, a
verify whose every prediction is accepted, a derivation whose wrong branches all
die at the next line. Thirty-nine such refusals exist and `npm run traps` fires
all of them.

## The thirteenth — DERIVE, and it did not come from the six documents

Everything above was counted out of six games' interaction documents. DERIVE was
not: it was written for a calculus course, where the move a syllabus is actually
about is building a derivation, and none of the nineteen designs above can
express it. SEQUENCE is the near miss and it is the wrong shape twice — it hands
over every line and asks only for the order, which `probeQuestions`' ORDER probe
exists because it is usually guessable from the wording, and a derivation's
difficulty was never in the order.

DERIVE grades the move: at each line the player picks the expression that
actually follows, from candidates that are the manipulations students really make.

It also once asked, separately, for **the rule that licenses each line**, and
scored both halves — the argument being that the right line for the wrong reason
is the commonest way to pass calculus without learning it, and that this is the
only format in the set that can see it. That half is **off by default** now,
behind `askRule: true` on the derive block.

What changed the argument was counting. The rule only discriminates where the
candidates differ in what licenses them, and often they did not: in five of
Midway's 29 steps and ten of Headwater's 33, every candidate carried the *same*
rule, so the second half of the answer was a click with exactly one possible
value. All three games that use DERIVE now grade the line alone. Opting back in
is deliberate — a `rules` list without `askRule` is refused by the importer
rather than quietly ignored, and `askRule` with fewer than three rules is refused
too, because a list of two answers itself by elimination.

Its trap is `survives`: at least one wrong candidate per step has to stay
algebraically valid for the rest of the derivation. A step whose wrong branches
are all immediately broken is a corridor with the walls painted to look like
doors — the player learns to pick whatever is not malformed, which is not
differentiating. The importer refuses a step without one, and three other
refusals go with it: a distractor with no `why` (a wrong option that teaches
nothing is not worth authoring), a keyed line longer than every distractor (the
answer identifiable by its shape), and — where `askRule` is on — a candidate claiming a rule that is not in the
offered list (a candidate nobody could ever score right).

`books/interactions/TEMPLATE.jsonl` carries one worked row per design, drawn
from a real interaction in the document it came from, and
`books/interactions/README.md` is the schema. When a design ships, add its
status banner to the top of every document that asked for it — the way
`INTERACTION_IDEAS.md` records `SWEEP`, `HOLDOUT`, `TALLY` and `PROBE` — and its
rules to `NEW_GAME.md` §"Adding a question format".
