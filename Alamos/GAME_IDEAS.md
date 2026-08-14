# Games that do not exist yet

Where new-game ideas live, with enough reasoning attached that a future session
can pick one up without re-deriving why it mattered. Nothing here is committed
to.

The other two idea documents are about different things, and this one exists
because neither covered new subjects:

- **`gamekit/IDEAS.md`** — how to make the *existing* games better as teaching:
  retrieval practice, confidence rating, evidence that costs clock.
- **`gamekit/NEW_GAME.md`** — how to actually build one, in order, once chosen.
- **`GAMES.md`** — the eight that exist. **`STORIES.md`** — what happens in them.

**How an idea earns a place here.** A course a real student takes, a place that
does not look like the eight already built, and a decision the campaign can turn
on that is genuinely arguable from both sides. An idea missing any of the three
is in "not yet" at the bottom, with the reason.

## The subject gaps, as of the ninth game

Covered: analytical chemistry · nuclear physics · astronomy and mechanics ·
biology and epidemiology · mechanics, circuits and thermal · waves and acoustics
· power systems and AC · anatomy (grade 2) · seismology and structural
engineering.

Still open, roughly in order of how many students sit the course:
**statistics**, environmental science, control systems, organic and process
chemistry, materials, genetics, climate, and **modern quantum** — which is the
first entry here aimed above second-year undergraduate, and the first whose
subject the other eight do not touch at all.

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

### Quantum — modern quantum, and the machines built out of it

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

### The Trial — biostatistics and clinical evidence

**Course:** AP Statistics with a pharmacology unit. Grade 12–13. Worth saying
plainly: AP Statistics is one of the largest STEM courses in the country and not
one of the eight games touches it. On curriculum gap alone this is the biggest
hole in the set.

**The place:** a coordinating centre — a data-safety monitoring board room, a
randomisation office, a central lab, a pharmacy holding the blinded kit, and one
real hospital site you drive to. This is the weakest place of the three and the
known risk: it is Mission Control's problem again, and Mission Control solved it
with tiers and a wall of plot boards rather than with rooms.

**The story:** a phase III trial, bending toward one question — **do you stop it
early?** Stop for benefit and you may be reading noise; carry on and you
knowingly keep giving people the worse arm. There is a real stopping rule
underneath it, and the drama is entirely in the evidence.

**Six areas:** Randomisation & Blinding · Endpoints & Measurement · Safety
Monitoring · Statistical Analysis · Site Operations · Regulatory.

**Why the formats fit better here than anywhere:** Ballpark for power and sample
size, Diagnosis for "which bias explains this pattern" with a data table as the
instrument panel, Casebook for reading a forest plot, Triage for grading adverse
events, Protocol for matching a design flaw to its remedy.

**Curriculum:** sampling and allocation, confidence intervals, what a p-value
does *not* mean, power and sample size, multiple comparisons, intention-to-treat,
absolute against relative risk, number needed to treat, survival curves,
regression to the mean, confounding. Riverton already computes sensitivity, PPV
and NNT — this is the course those belong to.

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

### Ice Core — climate measurement and proxy evidence

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
