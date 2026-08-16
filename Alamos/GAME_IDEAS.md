# Games that do not exist yet

Where new-game ideas live, with enough reasoning attached that a future session
can pick one up without re-deriving why it mattered. Nothing here is committed
to.

The other two idea documents are about different things, and this one exists
because neither covered new subjects:

- **`gamekit/IDEAS.md`** — how to make the *existing* games better as teaching:
  retrieval practice, confidence rating, evidence that costs clock.
- **`gamekit/NEW_GAME.md`** — how to actually build one, in order, once chosen.
- **`GAMES.md`** — the ten that exist. **`STORIES.md`** — what happens in them.

**How an idea earns a place here.** A course a real student takes, a place that
does not look like the eight already built, and a decision the campaign can turn
on that is genuinely arguable from both sides. An idea missing any of the three
is in "not yet" at the bottom, with the reason.

## The subject gaps, as of the twelfth game

Covered: analytical chemistry · nuclear physics · astronomy and mechanics ·
biology and epidemiology · mechanics, circuits and thermal · waves and acoustics
· power systems and AC · anatomy (grade 2) · seismology and structural
engineering · modern quantum · statistics and study design · climate measurement
and proxies.

Still open, roughly in order of how many students sit the course: control
systems, organic and process chemistry, and materials. Four of the gaps this
list opened with have been built since it was written — statistics as The Trial,
climate measurement as Ice Core, calculus as Headwater, and genetics as
Wellmere.

Calculus was worth a note while it was open, and the note is still the reason
Headwater is written the way it is. Bring Them Home lists integration among its
areas and Blackout differentiates a frequency trace, so the *set* touched it; no
game taught the method, and the method is the course a million students a year
sit.

---

## Ready to build

Worked out to the level a scaffold needs: the course, the place, the argument
with its named days, the areas, the equation list and the arc.

### ~~Aftershock~~ — built, August 2026

Kestrel Bay, the ninth game. See `GAMES.md` for what it is and `STORIES.md` for
what happens in it. Two things it proved that the next one can lean on: a
terrain feature can carry a whole course (the fault scarp is the site effect
lesson, drawn on the ground), and the damage in a props layer can be the
instrument rather than the decoration.

Left unfinished when it shipped: 2 of its 10 equations are computed by a
question and 6 only mentioned, and 24 of its 30 concepts are covered. Both are
question-writing rather than building.

### ~~Quantum~~ — built, the tenth game

Ridgeway Quantum Laboratory. See `GAMES.md` for what it is. Everything below is
the plan it was built from, kept because it is the worked example of what this
section is for — and because two things in it are still open: no `audience` is
declared in the manifest though the plan called for grade 13–14, and it is the
only game so far to author any of the four operated formats.

**Course:** the modern-physics or introductory-quantum course a physics or
electrical-engineering student takes in second year, taught through the hardware
rather than through the postulates. Grade 13–14 — the highest audience in the
set, and the first subject none of the nine existing games touches at all.

The reason to build it this way: superposition and entanglement are hard to
build a *decision* around, and the standard course spends a term on formalism
before anything is at stake. But "is this qubit dead, or is the readout lying"
is a decision an engineer makes before lunch, and it needs exactly the same
physics. Every question has to be about an instrument, a number or a choice.
**If a question can be settled only by an interpretation of quantum mechanics,
it does not go in.** That single rule is what keeps this from becoming vibes
about spooky action, which is the way this subject usually fails.

**The place.** A dilution-refrigerator laboratory, which looks like nothing in
this repo and very little anywhere else. The geography is a *temperature
gradient* and the player walks down it: a loading bay at room temperature, a
service bay where the fridge hangs open with its gold-plated stages exposed like
a chandelier, the microwave rack wall — coax, circulators, attenuators, more
cable than anybody expects — an optical table behind an interlocked curtain, a
magnetically shielded room with a mu-metal door that has to be closed behind
you, and a control room where nobody touches anything warm. Signage everywhere
about what may not be brought in.

Visually distinct in three ways: it is *interior and industrial at once*, its
palette is metal and cable rather than architecture, and its one emissive
element is instrument light. It would want `interiorFloor`, not a town.

**The story.** A national laboratory runs a 60-qubit processor. A competing
group publishes an advantage claim your director wants answered within the
quarter, and the fortnight is spent deciding whether it reproduces. Midway, the
group finds that its *own* best benchmark was partly a calibration artefact —
the readout discriminator had been retrained on data that included the state it
was supposed to be distinguishing. Nothing was faked; a good result got a
little help from a procedure nobody had questioned.

**The argument, both sides right on a named day.** Priya Raghavan says a result
held back is a result somebody else gets credit for, and the funding round
closes in March. Anders Holm will not put his name to anything he has not seen
on a second device. She is right on day 5, when a fortnight of caution costs the
group a collaboration that would have settled the question in a week. He is
right on day 11, when the second device disagrees and the artefact surfaces.

**Six areas:**

- **Cryogenics & Vacuum** — the stages, the thermal budget, why 10 mK and not 1 K
- **Fabrication & Materials** — junctions, two-level-system defects, what a bad wafer looks like months later
- **Control & Readout** — pulses, calibration, the microwave chain, discriminators
- **Error & Verification** — noise, benchmarking, what an advantage claim actually claims
- **Quantum Sensing** — magnetometry, clocks, gravimetry: the applications that already work today
- **Networks & Security** — QKD over fibre, entanglement distribution, why a repeater is hard

**The cast, in the shape the other books use.** Raghavan (group lead, wants it
published); Holm (verification, will not sign what he cannot reproduce); a
cryogenic engineer who thinks of the fridge as a plumbing problem and is right;
a fabrication lead who can date a defect to a process change; a control engineer
who calibrates twelve times a day and is the one who finds the artefact; a
sensing physicist whose magnetometer is the only thing in the building already
being used by somebody else; a networks postdoc running fibre to a site forty
kilometres away; a metrologist who owns the clock everything is timed against.

**The equations it can genuinely compute** — the test before building:

| | |
| --- | --- |
| `E = hf` against `kT` | why the fridge has to reach 10 mK for a 5 GHz qubit |
| `f_Rabi = Ω/2π`, `t_π = 1/(2f_Rabi)` | drive strength to pulse length |
| `P(t) = e^(−t/T₁)` | relaxation as a decay you fit |
| `1/T₂ = 1/(2T₁) + 1/T_φ` | why dephasing is the harder number |
| `F_total ≈ F^n` | gate fidelity compounding over circuit depth |
| `Δf = 1/(2πT)` | Ramsey fringe spacing, and sensing time as resolution |
| `δB ∝ 1/√N` | the shot-noise limit, and what squeezing buys against it |
| `S = E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′) ≤ 2` | Bell, as an inequality with a measured number on the left |
| `p_threshold` arithmetic | how many physical qubits one logical qubit costs |
| `R = 1 − 2h(e)` | QKD key rate after error correction and privacy amplification |

Ten equations, every one of which a Ballpark can land on, and not one of which
needs an interpretation of the wavefunction.

**The fifteen-day arc**, following STORY_SPEC §10:

1. Why 10 mK — thermal energy against photon energy, on a fridge that is warm
2. A qubit that will not drive — resonance, Rabi, and finding the frequency
3. T₁ and T₂, and which of them the fridge can fix
4. The readout chain: what a discriminator actually decides
5. **Raghavan is right** — a collaboration offer with a deadline on it
6. Fabrication: a defect dated to a process change nine months ago
7. Sensing, and the thing already in use: a magnetometer somebody else depends on
8. Benchmarking — what randomised benchmarking measures and what it does not
9. Entanglement as a measured number: running the Bell test properly
10. The advantage claim, read as a claim rather than a headline
11. **The reversal, from evidence** — the second device disagrees, and the
    discriminator turns out to have been trained on the state it was meant to
    distinguish
12. A quiet day: the fridge is cold, everything works, nothing is fixed
13. Three at once — a fibre link down, a clock drifting, a review deadline
14. **The last reversible moment** — the retraction goes out today or not at all
15. What is known and how well, and which of the fortnight's habits survives

**Why the formats fit.** Diagnosis is exceptional here and would carry the game:
"T₂ far below T₁, fridge at temperature, drive line warm" is an instrument panel
and four candidates, which is precisely the shape. Sequence gets calibration
order, which is physically forced — you cannot measure a gate before you have
found the resonance. Science Tank gets "which measurement do we buy" against a
real budget of fridge time, which is the scarcest thing in any such lab.

**The risks, stated before anybody starts.** It is the hardest subject here to
keep concrete; the audience is the narrowest; and the place, being an interior,
is the kind the hospital flip has not finished making easy. Against that: the
subject is genuinely absent from the set, the applications are current rather
than historical, and the story's central failure — a good result that got a
little help from a procedure nobody questioned — is the most honest thing about
science any of these games would teach.

### ~~The Trial~~ — built, the eleventh game

CLARION-3, at a coordinating centre. See `GAMES.md`. The plan it was built from
follows, unchanged.

### The Trial — the sketch this was built from

**Course:** AP Statistics with a pharmacology unit. Grade 12–13. Worth saying
plainly: AP Statistics is one of the largest STEM courses in the country and not
one of the eight games touches it. On curriculum gap alone this is the biggest
hole in the set.

The player is the trial's **methodology and operations lead** at the coordinating
centre: the person who assembles what the monitoring board will read. Not a
prescriber, not a diagnostician — which keeps the safety framing the other games
hold, and is also what the job actually is.

**The place: one long floor, and the walk down it is distance from the
patient.** The sketch this replaces was a coordinating centre of offices, and it
was the weakest part of the idea — Mission Control's problem again. The fix is
Quantum's: give the corridor a *gradient* and let the player walk down it.
Quantum's is temperature. This one is evidence. The south end is where the trial
is a person in a chair; the north end is where it is a number on a boundary;
everything in between is the machinery that turns one into the other, in order.

South to north, off one spine (`interiorFloor`, so `plan.js` plus a props layer):

| | The room | What is in it, and what it is for |
| --- | --- | --- |
| 1 | Screening & Consent | Two chairs, a table, consent binders, an eligibility checklist on the wall. Where a person becomes a participant |
| 2 | Infusion Bay | Six chairs, drip stands, cuffs, a wall clock, a bin of identical spent bags. The only room where the trial has a face |
| 3 | Monitors' Room | Couriered source documents in banker's boxes, a verification table, a standing queue of query forms |
| 4 | Central Lab & Sample Store | A −80 freezer, racks of aliquots, a centrifuge, chain-of-custody sheets on a clipboard |
| 5 | Adjudication Room | Two reading screens back to back, images with the arm stripped out, a whiteboard of case numbers and nothing else |
| 6 | Data Management Floor | The open middle: desks, the query board, and the enrolment wall — one card per site, filling as the trial recruits |
| 7 | Kit Warehouse & Cold Room | Aisles of numbered boxes that differ in nothing but their number, a label printer, a quarantine cage, a temperature chart taped to the cold-room door |
| 8 | The firewall link | A short glazed corridor, badge readers at both ends, blinded and unblinded signage. Through the window: the randomisation rack, its monitors deliberately facing away |
| 9 | Randomisation Office | The server, the sealed code-break envelopes nobody has opened in four years, and the log with two entries in it |
| 10 | Unblinded Statistics | One desk, one locked screen, printouts face down. The smallest room on the floor |
| 11 | Monitoring Board Room | A table for nine and a closed-session sign. The only place in the building where the two arms appear on the same page |
| 12 | Regulatory & Registry | Filing, the registry entry printed and pinned, submission dates on a wall calendar |

**What stops this being a corridor of offices** is the same answer Aftershock
found — the props layer is the instrument, not the decoration. Two features carry
the silhouette: the warehouse, which is tall racking, aisles and a cold-room door
with frost on it, and is nothing any of the ten built places contains; and the
glazed firewall link, which is the only place in the set where the player can see
a room they are not cleared to read. Hold it to the engine-built case rooms'
density, 0.91–1.52 pieces per 10 m² — a theme that lays out its own rooms has to
furnish them itself, and the first one to try came out at a fifth of that.

**The blind is a physical object, and that is why the warehouse is in the
game.** A row of boxes identical but for a number is what allocation concealment
*is*; a student who has walked that aisle has a picture to hang the word on.

**No locked doors, and the firewall does not need one.** House rule: every room
is walkable whenever you like, and what changes with the mission is whether a
case is open there. The unblinded wing honours it — you can walk in; what you
never see is which arm, because that is what the screens do not show. The board
room is open on the days the board sits, which is the engine's existing model and
needs nothing new.

**Manifest, decided now so the scaffold is right:** `audience: { grade: 12 }`,
`dayNoun: 'Day'` (this is the one game where a mission really is a working day),
default `stopNoun`, `world: interiorFloor`, `look.far` well past the spine, and a
`shots.js`, because a hand-planned floor has no other automatic check on where
anything is.

**The story:** a phase III trial of an infused drug against standard care, 2,400
participants across 31 sites, and the campaign is the three weeks up to the
second interim analysis. Everything bends toward one question — **do you stop it
early?** Stop for benefit and you may be reading noise, and you will never have
the long-term safety data. Carry on and you knowingly keep giving people the
worse arm for another year. There is a real stopping boundary underneath it, and
the drama is entirely in the evidence.

**The reversal is a measurement, not an event.** Midway, somebody runs a blinding
index — investigators are asked to guess which arm each participant was on, and
they are right far more often than chance, because the drug has a visible effect.
The assessors were never blind. The subjective primary endpoint's advantage
shrinks when it is restricted to events the adjudication committee scored from
images alone; the hard endpoint survives, smaller. Nothing was faked. A real
effect got help from a procedure nobody had questioned.

**The argument, both sides right on a named day.** Dr. Yemi Balogun, the trial
chair, treats every month of delay as people receiving the arm that will turn out
to be worse. Dr. Miriam Feldman, the trial statistician, holds that the boundary
exists so the room cannot fool itself, and that early stops overstate effects.
Balogun is right on **day 3**, when a safety pattern held for the next scheduled
meeting would have cost two more participants. Feldman is right on **day 13**,
when the subgroup that crosses its boundary turns out to be one of fourteen
looked at, and stopping there would have published a benefit that is not there.

**Six areas, each with a home on the floor:**

- **Randomisation & Blinding** — rooms 7–9: concealment, the kit, what the code-break log is for
- **Endpoints & Measurement** — rooms 4–5: hard against subjective, adjudication, measurement error
- **Safety Monitoring** — room 11: adverse events, expedited reporting, the board's independence
- **Statistical Analysis** — room 10: power, boundaries, multiplicity, what a p-value does not say
- **Site Operations** — rooms 1–3: enrolment, protocol deviations, source-data verification
- **Regulatory & Reporting** — rooms 6 and 12: prespecification, the registry, how a result is stated

**The cast.** Balogun (chair, clinical, wants the answer used); Feldman (trial
statistician, guards the boundary); Prof. Helena Vogt (independent board chair,
the only person who can recommend stopping); Dr. Alina Petrescu (the unblinded
statistician, who has known the answer for a year and has told nobody); Farida
Diouf (trial pharmacist, whose blind is boxes and a cold chain); Tobias Renner
(data management, whose queries are the difference between missing and lost);
Dr. Kwame Ansah (adjudication chair, who scores events without knowing arms and
insists on it); Lucia Marchetti (monitor, who drives to sites and reads charts
against forms); Nkechi Umeh (regulatory, who knows what must be reported and
when); Dr. Nuno Iriarte (the fastest-enrolling site PI, and fast for a reason);
Maggie Doyle (participant representative on the steering committee, who asks what
the number means for a person and is the reason day 15 lands).

**The equations it can genuinely compute** — the test before building:

| | |
| --- | --- |
| `n ≈ 16σ²/δ²` per arm | the sample-size rule of thumb at 80% power, and what halving δ costs |
| `d ≈ 4(z_α/2 + z_β)² / (ln HR)²` | an event-driven trial: why it ends at a count of events, not a count of people |
| `ARR = p_c − p_t`, `NNT = 1/ARR` | the same result stated so it can be acted on |
| `RR = p_t/p_c` against `ARR` | why relative risk is what a press release prints |
| `SE = √(p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂)`, `CI = δ ± 1.96·SE` | the interval, and what its width is made of |
| `z_k = z_c √(K/k)` | the O'Brien–Fleming boundary: why an early look needs a much smaller p |
| `α_family = 1 − (1−α)^m`, Bonferroni `α/m` | fourteen subgroups, and what one of them crossing 0.05 is worth |
| information fraction `= events observed / events planned` | how far through a trial actually is, which is never how far through the calendar is |
| fragility index | how many outcomes have to flip to lose significance — integer arithmetic, and the most sobering number in the course |
| `expected shift = (1 − r)(μ − x)` | regression to the mean, and why the sickest-at-entry improve on any arm |

Ten, every one landable by a Ballpark, and not one of them needing a stats
package to evaluate.

**The fifteen-day arc**, following STORY_SPEC §10:

1. The trial as it stands: 2,400 randomised, the second interim in three weeks. What concealment buys that blinding does not
2. The endpoint, and who measures it — a hard event against a rated scale
3. **Balogun is right** — a safety pattern at two sites, reported today rather than at the next meeting. The player also signs an eligibility amendment to hold the enrolment schedule
4. The unplanned look: what it costs to peek, and where the alpha goes
5. Site operations — enrolment is behind, and the fastest site is fast for a reason its screening log shows
6. **Day 3 comes back**: the widened eligibility is enrolling lower-risk people, the event rate is falling, and the information fraction with it
7. Missing data — dropouts are not random, and intention-to-treat against per-protocol
8. A cold-chain excursion in one site's kit. Which participants are affected, and does finding out break the blind?
9. **The reversal, from evidence** — the blinding index. The assessors were not blind, and the subjective endpoint knew it
10. What survives: the adjudicated hard endpoint, re-read. Smaller, and real
11. **The quiet day** — enrolment on track, queries closed, the board pack assembled and the database locked. Nothing goes wrong, three days out
12. The interim, and it is three things at once: one subgroup over its boundary, a competing trial published this morning, and a regulator asking for a safety update
13. **Feldman is right** — the subgroup is one of fourteen. Ranking what the board is told, and what it is told first
14. **The last reversible moment** — the recommendation goes out today: stop for benefit, stop for futility, or continue. Conditional power against what stopping costs
15. Disposition — what is claimed and how strongly, absolute against relative, what goes in the registry, and what Doyle asks about the number

**Why the formats fit, and why this is the game to author on the instruments.**
The eight shipped games use none of the twelve in `engine/core/instruments.js`;
this course wants at least six of them, and they are not decoration here:

- **TRIGGER** — write the rule before the number moves. That is a stopping boundary, exactly
- **TALLY** — accumulate until there is enough to report. That is an interim analysis, exactly
- **HOLDOUT** — fit on one set, score on data never seen. That is subgroup fishing, and the spike that beats the honest answer is the subgroup on day 12
- **ATTEST** — the record is not the condition. That is source-data verification: the form says one thing, the chart says another
- **CLOUD** — a distribution against a limit, where narrowing is not shifting. That is a confidence interval, and it is the single most-failed idea in the course
- **BALANCE** — close the ledger and find the hidden term. That is a CONSORT flow: screened, randomised, withdrawn, analysed, and the number that does not add up
- **VERIFY** — predict, act, measure. That is prespecification, which is the whole virtue being taught

Plus the older set: Ballpark for power and sample size, Diagnosis for "which bias
explains this pattern" with a data table as the panel, Casebook for reading a
forest plot, Triage for grading adverse events, Protocol for matching a design
flaw to its remedy.

**Curriculum:** sampling and allocation, confidence intervals, what a p-value
does *not* mean, power and sample size, multiple comparisons, intention-to-treat,
absolute against relative risk, number needed to treat, survival curves,
regression to the mean, confounding. Riverton already computes sensitivity, PPV
and NNT — this is the course those belong to.

**The risks, stated before anybody starts.** The place is still an interior, and
an interior is the kind the hospital flip has not finished making easy; the
subject has no landscape, so all of the visual interest has to be earned by props
and by one warehouse; and the drama is entirely inside evidence, which is the
hardest kind to keep from reading as a meeting. Against that: it is the largest
uncovered course in the set, every one of its ten equations is arithmetic a
student can do on paper, and the central failure — a real effect that got a
little help from a procedure nobody questioned — is the honest version of what
goes wrong in medicine, told without a villain.

### ~~Headwater~~ — built, the thirteenth game

Ashfell, in a gorge. See `GAMES.md` for what it is. The plan it was built from
follows, and two things it changed for everyone else: **DERIVE**, the twentieth
instrument — a result built one line at a time, each line naming the rule it
used, with at least one wrong line that survives the rule check and has to be
caught on meaning — and `engine/world/interiorLevels.js`, the stacked-floor world
promoted out of The Trial so a third game need not fork one. The lesson that cost
the most hours: the levels have to be offset along **z** as well as y, because
`groundHeight(x, z)` takes no level argument and collision ignores height
entirely.

### ~~Wellmere~~ — built, the fourteenth game, and the second AP Biology one

A seed bank and a breeding station, one season. See `GAMES.md`.

**Why a second biology game rather than a first something-else.** Outbreak:
Riverton is AP Biology's medical-molecular half — cells, membranes, diagnostics,
immunity, epidemiology — and it is the half a hospital campus can hold. The other
half of that course is heredity, population genetics, selection and plant
energetics, and none of it can be taught by a patient: a Punnett square wants two
parents and a season, an allele frequency wants a population you can grow out, and
"where does the mass of a tonne of grain come from" wants a field. So the setting
is the opposite of a hospital in every axis that matters — plants not patients,
seasons not shifts, populations not individuals, and a decision that is felt in
seven years rather than in an afternoon. That also closes the **genetics** gap
named at the top of this file.

**The argument, and it is genuinely two-sided.** Elena Volpe holds that a line
good enough to release should be released, because a season withheld is food
nobody eats and the delay is paid by every line queued behind it. Amara Qureshi
holds that the collection is the only copy of what nobody has needed yet, and
that every shortcut through it is taken from people who are not in the room.
**Volpe is right on day 4** — the deferral genuinely costs more than a season —
and **Qureshi is right on day 12**, when the rust arrives and the resistance gene
that would have answered it turns out to have been lost in three small grow-outs
in the 1990s. Neither of them is the villain and neither wins the whole campaign.

**The place, and the one shape nothing else has: the trial grid.** 240 plots on
a numbered lattice, five metres by six with a metre of alley, running north from
the field road to a shelterbelt — walked between, staked, and with a wet corner
in the north-east that flatters whatever is sown in it. That corner is not
decoration: three lessons turn on telling a good line from a good piece of
ground, and the evidence is visible from the alley. The other shape is the
glasshouse range, three glazed bays in a row, which reads as nothing else at any
distance. Both are built in `themes/seedbank/props.js`, instanced.

**What it taught the next game.** A checker can be satisfied the wrong way: the
answer-shape gate was cleared not by shortening the keys but by making each wrong
option wrong *for a stated reason*, which is what the gate was asking for and is
also better writing. And `tools/common-words.mjs` is load-bearing across every
game — adding farm vocabulary to it to quiet `jargonDepth` moved the `JARGON[n]`
stamping in three unrelated themes and broke their book parity. Reword the
glossary instead.

### Headwater — the sketch this was built from

**Course:** AP Calculus AB, and the first term of a university calculus sequence.
Grade 12–13. It is the largest STEM course in the country by enrolment and none
of the eleven games teaches it. Bring Them Home *uses* integration on the way to
a burn; this one is about the method itself, which is a different game and a
harder one to keep honest.

**The problem to solve before anything else: a calculus game is a worksheet
unless the derivative is something the player can see moving.** Every game here
works because a number is attached to a decision somebody has to defend.

The first rule written here was **"no question whose answer is a symbolic
expression with nothing at stake"**, and it failed in the way a rule can only
fail once it is obeyed: the book satisfied it by dropping the symbols. Twenty-six
of forty-five stops became prose judgement about a dam — *what should Baptiste
tell the committee this evening* — and the course disappeared. Optimisation,
linear approximation and the second derivative were absent entirely; one stop in
forty-five carried a derivation.

**The rule it is replaced by, and the one the book is now written against:**
the subject is calculus and the dam is where it is being done. Every stop names
the move it teaches, and the move has to be consequential in at least one of four
senses — **numerical** (the working ends in a number somebody acts on),
**directional** (getting it wrong flips a sign, a units factor or an order of
magnitude), **structural** (the move decides what kind of answer exists at all —
no rate here, a family rather than a value, an endpoint rather than a critical
point) or **procedural** (the move is a discipline that survives the setting:
holding data out, converting limits with the variable, measuring what you
predicted). A symbolic answer is welcome; a symbolic answer with none of the four
is not. That is adaptable where the first rule was not, and it is what keeps the
game from being either a differentiation drill or a hydrology quiz.

The course is declared in `gamekit/tools/syllabus.js` under `headwater` — 28
concepts and 15 equations — so `syllabusEquations` and the concept sweep can say
what is covered instead of nobody being able to.

**The place: a dam, from the inside.** Ashfell Dam is a concrete arch across a
gorge, and the player works *within* the structure — inspection galleries running
through the wall on a grade, a spiral stair down through six levels, the gate
chamber over the spillway, the intake tower, the powerhouse at the toe, and one
walk out along the crest with the reservoir on one side and a hundred metres of
air on the other. It looks like nothing else in the set: the corridors are curved
and inclined, the light is bulkhead lamps and daylight at the portals, and the
one view is the same view from six different heights.

It also solves the multi-floor problem the way The Trial did, which is now known
work: levels offset along the gallery as well as vertically, so `groundHeight`
stays single-valued and every checker keeps working. A dam has that shape
naturally — galleries at different levels are at different depths *into* the
wall, because the wall is a wedge.

**Why a reservoir is the right instrument for calculus.** Everything the course
teaches is physically present and separately measurable:

| Idea | What it is here |
| --- | --- |
| Derivative as a rate | inflow, in cubic metres a second, arriving from a catchment nobody controls |
| Accumulation | reservoir volume: the integral of inflow minus outflow, which is *the state of the dam* |
| The fundamental theorem | the level today is last week's level plus the area under the net-flow curve, and the gauge on the wall is the check |
| Related rates | `dh/dt = (I − O)/A(h)` — the same net flow raises the level fast when the reservoir is low and slowly when it is full, because the surface area is not constant |
| Optimisation | the spill schedule: release too early and the town loses water it cannot get back, too late and the flood peak arrives on a full reservoir |
| Non-linearity | the spillway is `Q = C·L·H^{3/2}`, so the last half metre of gate opening does far more than the first |
| Linear approximation, and its error | the operators' rule of thumb, and the day it stops being safe |
| Numerical integration | the hydrograph comes as gauge readings every fifteen minutes, not as a formula |
| Second derivative | the inflow's rate of rise is what says whether the peak has passed |

**The story.** Nine days of rain forecast in the catchment, a reservoir already at
88 per cent because the summer was dry, and one decision made every morning: how
much to release today. Everything in the fortnight is that decision, taken with
worse information than anybody wants.

**The reversal is a measurement, in the STORY_SPEC sense.** Midway, a survey boat
runs the reservoir with an echo sounder and finds the stage–storage curve is
wrong: two decades of silt mean the volume at any given level is about eleven per
cent less than the table says. Nothing was faked and nobody was careless — the
curve was surveyed in 2003 and never resurveyed. But every accumulation the room
has computed for a fortnight used `A(h)` from that curve, which means every one
of them was wrong in the same direction, and the reservoir has less headroom than
the control desk believes. That is a calculus reversal: the integrand was wrong,
so the integral was wrong, and the error is not in anybody's arithmetic.

**The argument, both sides right on a named day.** Ines Marchetti-style pairing:
the operations manager, who is answerable for a town's water supply and a
contract to generate, wants the reservoir held high — water released in March
cannot be recovered, and a dry summer is a real harm with a real cost. The flood
engineer wants headroom bought early, because headroom is only cheap before it
rains. She is right on **day 4**, when a release deferred by two days has to be
made at four times the rate into a river that has people beside it. He is right
on **day 12**, when a forecast that justified a large pre-release does not arrive
and the reservoir is left short going into summer.

**Six areas:** Catchment & Inflow · Storage & Level · Spillway & Gates ·
Structure & Seepage · Power & Demand · Downstream & Public Safety.

**The new format this needs, and it is the reason to build the game: DERIVE.**

The request behind this entry is derivations, and none of the twenty-four
existing formats can carry one. SEQUENCE comes closest and is wrong: ordering
supplied steps is usually guessable from the wording, which is what the ORDER
probe exists to catch, and a derivation's difficulty is never in the order.

DERIVE grades **the move, and the rule that licenses it**. The player builds the
derivation one line at a time. At each line they are offered three or four
candidate next expressions and must also name the rule applied. A wrong candidate
is not nonsense — it is the manipulation a student actually makes:

```yaml
        format: DERIVE
        question: >
          The gate is opening at a steady rate. Derive how fast the discharge is
          rising when the head is 2.0 m and the gate is 40 per cent open.
        start: 'Q = C·L·H^{3/2}'
        goal: 'dQ/dt in terms of dH/dt'
        steps:
          - ask: Differentiate both sides with respect to time.
            candidates:
              - { text: 'dQ/dt = (3/2)·C·L·H^{1/2}·dH/dt', rule: chain }
              - { text: 'dQ/dt = (3/2)·C·L·H^{1/2}', rule: power,
                  why: 'The right-hand side is a function of t through H, so the H-derivative has to be multiplied by dH/dt.' }
              - { text: 'dQ/dt = C·L·(3/2)·H^{3/2}·dH/dt', rule: power,
                  why: 'The exponent drops by one when the power rule is applied; it does not stay at 3/2.' }
            answer: 0
        rules: [power, product, quotient, chain, implicit]
```

Four decisions that make it a format rather than a quiz:

- **Every wrong candidate is a named mistake with a reason attached**, and the
  reason is shown in the verdict. A distractor that is merely wrong teaches
  nothing; a distractor that is the chain rule forgotten teaches the chain rule.
- **The rule has to be named as well as the line chosen.** Picking the right
  expression for the wrong reason is the commonest way to pass a calculus course
  without learning it, and this is the one format that can see it.
- **The trap, which is an importer check, because every instrument here carries
  one:** at least one wrong branch must stay *algebraically valid* for two more
  lines before it fails. A derivation whose wrong turns die instantly is a
  corridor with the walls painted to look like choices, and the player learns to
  pick whichever option is not obviously broken. The importer should refuse a
  DERIVE where every distractor is a dead end at the next step.
- **It goes in `engine/core/instruments.js`**, not as another branch in
  `questionUI.js` — that is the standing rule for anything of this kind — and it
  needs `npm run drive` support on the day it is written, because an interactive
  panel can render, print its question, expose a commit button and never reach
  the grade.

**And four formats that already exist fit this course better than they fit
anything shipped.** This would be the second game authored on the instruments:

- **BALANCE** — close the ledger and find the hidden term. That is a water
  balance: inflow, release, spill, evaporation, and the term that does not add up
- **CHAIN** — name the governing transfer. That is related rates, exactly
- **TRIGGER** — write the rule before the number moves. That is a release rule
  written at 6 a.m. and tested by what the river does at four in the afternoon
- **SWEEP** — one control, and a response plotted only where you look. Open the
  gate and watch the discharge curve bend, which is `H^{3/2}` made visible; or
  sweep the release rate and find the schedule that just clears the peak

**The fifteen-day arc**, following STORY_SPEC §10:

1. The reservoir at 88 per cent, nine days of rain forecast, and what a rate is
2. Accumulation: the level tomorrow from the net flow today
3. Related rates — the same net inflow moves the level twice as fast down here
4. **The flood engineer is right** — two days deferred becomes four times the rate
5. The spillway is not linear: the last half metre of gate does most of the work
6. The hydrograph arrives as readings, not as a formula: area under it, numerically
7. Structure: seepage and uplift rise with head, and the inspection gallery says so
8. Power against safety — the generation contract, and what a full reservoir is worth
9. **The reversal** — the echo sounder, the silt, and a stage–storage curve twenty years stale
10. Redo the fortnight's accumulations on the new curve, and find what changes
11. **The quiet day** — the rain holds off, the gates are set, nothing is wrong
12. **The operations manager is right** — the forecast fails, and the pre-release is water gone
13. Three at once: a gate that will not seat, a peak arriving early, a town to warn
14. **The last reversible moment** — the release that cannot be taken back
15. Disposition: what the dam knows about itself now, and which of the fortnight's rules survives

**The risks.** The subject is the method rather than a phenomenon, which is the
hardest kind to keep concrete — every stop has to be checked against the rule at
the top of this entry. DERIVE is a new instrument and instruments have shipped
hollow before. And a dam interior is a third interior in a set that already has
several; the answer is that it is curved, inclined and vertical where the others
are flat, and that the same view from six heights is a place doing work no other
place in the set can do.

**The alternative place, if the dam turns out to be too enclosed:** a mountain
road under construction over a pass. The derivative is the grade you can feel
underfoot, the second derivative is the vertical curve, and the integral is
cut-and-fill — the earth taken out of the hillside has to balance the earth put
into the embankment, which is an integral that a foreman checks with a
lorry count. It is a *linear* site travelled end to end rather than a place walked
around, which is a shape the set does not have either.

---

## Worth working up

Sketches rather than plans: the course and the place are there, the fifteen-day
arc is not.

### Fire Weather — combustion, meteorology and risk

**Course:** earth science and thermodynamics; fire behaviour is one of the few
places a student meets exponential spread, wind fields and fuel chemistry at
once. Grade 11–13.

**The place:** an incident base camp on a fairground — trailers, a weather mast,
a helibase, a burnt ridge on one horizon and an unburnt one on the other. Smoke
gives the sky a colour no other game has, and the landscape *changes over the
campaign*, which nothing in the set does yet.

**The story:** the fire runs at a town, and the campaign is a fortnight of
deciding where to commit crews and when to ask people to leave. The argument:
evacuate early and you empty a town that was never threatened, and people stop
believing the next order; evacuate late and the road out is the fire's path.

**Curriculum:** fuel moisture, the fire triangle as a rate equation, slope and
wind alignment, spotting distance, the exponential in rate of spread, relative
humidity and dew point, radiant versus convective heat, containment as a
perimeter-to-area argument. Plenty of Ballparks.

**The catch:** fire is easy to make lurid. The rule stands — the stakes are time,
teamwork and consequence, and the player never fights a fire personally.

### Control — feedback, stability and autonomy

**Course:** intro control systems and the calculus that goes with it; the first
engineering course most students meet after physics. Grade 12–13.

**The place:** a test facility — a long hall with a gantry, an anechoic bay, a
vehicle on a dynamometer, an outdoor proving ground with a marked course. The
props are instruments and moving rigs rather than architecture.

**The story:** an autonomous vehicle programme with a control loop that is not
behaving, and a deadline for a public demonstration. The argument: tune the
controller until the test passes, or hold the demonstration until the model
explains the behaviour.

**Curriculum:** feedback and gain, proportional against integral against
derivative, overshoot and settling time, phase margin and why a system with
enough delay oscillates, sensor noise against filter lag, sampling rate, the
difference between accuracy and precision in a sensor, and stability as
something you can compute rather than feel. A genuinely under-taught set of
ideas with a natural instrument panel.

### ~~Ice Core~~ — built, the twelfth game

Vestri Dome Station. See `GAMES.md` for what it is. It came out of the sketch
below almost unchanged, which is the first time that has happened, and two
things are worth carrying forward:

- **A place can be defined by what is missing from it.** The horizon ranks are
  seven metres high at six hundred metres out and there is nothing else on the
  skyline. Every other game in the set has something to look at on the horizon;
  removing it is what makes this one recognisable in a single frame.
- **`paths[].colour` now exists** because of it. The shared path texture is warm
  grit, which is right for a road and reads as a brown road across an ice sheet.
  No checker can see that, and the first screenshot could.

Left open when it shipped: 28 of 30 concepts covered — cosmogenic ¹⁰Be and
splicing a proxy record onto the instrumental one are the two nothing teaches —
and 9 of 10 equations computed. Both are question-writing rather than building.

The plan it was built from follows.

### Ice Core — the sketch this was built from

**Course:** earth and environmental science. Grade 11–13.

**The place:** a polar station — a drill tent, a cold lab where the core is cut,
a snow pit, generators, a skiway, and the flattest, brightest horizon in the set.
Visually the strongest place on the list.

**The story:** a season on the ice, and a record that disagrees with the one
another group published. The argument: publish the disagreement now, or spend
the remaining season making the two records comparable first.

**Curriculum:** proxies and what stands behind them, isotope ratios as a
thermometer, annual layer counting and where counting fails, gas age against ice
age, dating uncertainty, resolution against record length, calibration to
instrumental data, and how a trend is separated from noise. It teaches
*measurement of the past*, which nothing else here does.

---

## Not yet, and why

- **Airshed** (urban air quality) — good course, but the place and half the
  curriculum overlap The Contaminated City, and a second river-city game is what
  the horizon work was trying to get away from.
- **Pedigree** (genetics and heredity) — strong subject, no place. A genetics
  clinic is four rooms and a screen, which is the weakest kind of world here.
- **Fibre** (optics and telecoms) — the curriculum is real and the place is a
  cable landing station; parked because Deep Watch already owns "everything you
  know arrives as a signal".
- **The Batch** (process chemistry scale-up) — a real gap and a genuinely good
  argument about yield against safety, but the place is a plant, and Blackout
  has just done industrial steel.
- **A materials or bridge game** — folded into Aftershock, which teaches the same
  statics with a better decision attached.

---

## Cross-cutting ideas that are not games

Kept in `gamekit/IDEAS.md`, which is the right home for them: retrieval practice
from the review lessons that already exist, confidence rating and distractor
tracking, evidence that costs clock, and the tooling that multiplies all three.

Landscape and place ideas, once they are specific to a game, belong in that
game's `site.js` as a comment rather than here — the horizon work of August 2026
is the worked example.
