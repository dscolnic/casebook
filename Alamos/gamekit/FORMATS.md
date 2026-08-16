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
> ```
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

**Trap the importer must refuse:** a rule set where every rule fires the same
way on the scripted stream. If the data never crosses a threshold the player
wrote, they were never held to anything.

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

- BTH M11 — the 5.3°–7.7° corridor; "you moved the dot, the cloud came with it"
- BTH M03 — burn now or measure first, when the correction is the size of the uncertainty
- CC M14 — nine plus or minus two against a limit of ten
- PD M03, M04 — the orbit family, and weighted virtual asteroids where impact probability rises while the nominal miss moves the other way
- PD M13 — terminal-approach Monte Carlo
- DW M04 — the two-mile uncertainty circle through a four-mile channel; the envelope, not the centre point, has to fit
- AS M07 — the Omori fit with a band, and simulated sequences that scatter around it

**Trap:** a book where recentring the nominal passes. Structurally the same
check `HOLDOUT` already makes.

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
actually follows, from candidates that are the manipulations students really make,
**and separately names the rule that licenses it**. Both halves are scored,
because the right line for the wrong reason is the commonest way to pass calculus
without learning it, and this is the only format in the set that can see it.

Its trap is `survives`: at least one wrong candidate per step has to stay
algebraically valid for the rest of the derivation. A step whose wrong branches
are all immediately broken is a corridor with the walls painted to look like
doors — the player learns to pick whatever is not malformed, which is not
differentiating. The importer refuses a step without one, and three other
refusals go with it: a distractor with no `why` (a wrong option that teaches
nothing is not worth authoring), a keyed line longer than every distractor (the
answer identifiable by its shape), and a candidate claiming a rule that is not in
the offered list (a candidate nobody could ever score right).

`books/interactions/TEMPLATE.jsonl` carries one worked row per design, drawn
from a real interaction in the document it came from, and
`books/interactions/README.md` is the schema. When a design ships, add its
status banner to the top of every document that asked for it — the way
`INTERACTION_IDEAS.md` records `SWEEP`, `HOLDOUT`, `TALLY` and `PROBE` — and its
rules to `NEW_GAME.md` §"Adding a question format".
