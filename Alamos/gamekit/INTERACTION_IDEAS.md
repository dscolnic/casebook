> **Status, August 2026.** Four formats now carry these ideas — `SWEEP`,
> `HOLDOUT`, `TALLY` and `PROBE` — and all four are live in Quantum. See
> `NEW_GAME.md` §"Adding a question format" for the rules each has cost.
>
> **`SWEEP`** — one control, a response built only where the player looks. Six
> instances in Quantum (M02 spectroscopy, M03 T1-against-T2, M05 discriminator
> boundary, M06 defect band, M07 averaging knee, M08 randomised-benchmarking
> decay) and one in Blackout. It is the substrate for nine of the fourteen ideas
> below.
>
> **`HOLDOUT`** (idea 2, M11) — fit a line on calibration shots, freeze it, and
> score it on shots it has never seen. The calibration curve carries a narrow
> spike that beats the honest plateau, so chasing the sample costs the player
> their answer. The importer refuses a holdout whose best-fitting line also
> passes on held-out data: no trap, no lesson.
>
> **`TALLY`** (idea 5, M09) — batches of shots into bins, a correlation per
> setting pair, and a combination that means nothing until there are shots behind
> it. The counts are drawn from the authored probabilities with the campaign's own
> seed, so the statistic scatters like a statistic and the decision the player
> makes is when it has settled. Graded on the number they actually got.
>
> **`PROBE`** (idea 4, M01) — sited readings. The stations start blank and the
> player reads as few or as many as they like, then names the stage where the
> pattern breaks. No station's own readings name the cause; the importer refuses a
> book that puts "unclamped" or "bypassed" in one, because then nobody reads the
> temperatures. The verdict plots each stage against what it held last cooldown,
> so unchanged is 1.0 and the load is visibly where the chain leaves it.
>
> **The stations are sited.** Six posts down the clear side of the Cryogenics room,
> in the order the chain runs, each with a blank face until somebody stands in
> front of it and presses E — the face fills in and its lamp goes from grey to
> blue. The panel at the case stand reads from the same store, so a station read at
> the post is already read when the case is opened, and the panel's own Read
> buttons say "At the station" instead. A theme whose entry point never builds the
> posts still gets the panel version, which is what keeps a PROBE answerable in
> every game rather than only in this one.
>
> Where the posts go comes from the room, not from this module: `stationLane` on
> what `buildInteriorBuilding` returns is a clear line on the opposite hand from
> the case stand. The first version guessed a wall and put six posts through the
> shelving, which is the room builder's knowledge and not something a caller should
> be inventing.
>
> Four of the remaining ideas are existing formats with new chrome and should
> not be built as minigames: M15's evidence wall is CASEBOOK, M05's replication
> package is PROTOCOL, M14's correction package and M12's audit are TRIAGE.

# Ridgeway Quantum Laboratory — FPS-Native Learning Interaction Ideas

## Purpose

This document is deliberately separate from `quantum-surgical-pass.jsonl`. None of the interactions below have been implemented in that JSONL. The surgical pass only changes story, scientific wording, questions, answers, distractors, explanations, and numerical reasoning while preserving the existing JSONL structure.

The goal of this next layer is to make the player **learn by operating the laboratory**, not merely walk through a 3D world to reach a quiz screen. The best interaction is one in which the physical action itself contains the scientific reasoning: change a control, observe a response, decide what the response means, and then act on it.

## Design rules for Claude

1. **Do not turn every question into a minigame.** Keep some concise reasoning screens. The FPS interactions should be reserved for concepts that become clearer when manipulated or observed.
2. **The action must teach the concept.** Do not replace a multiple-choice question with “walk across the room and press four buttons.” The player should manipulate the actual variable that matters scientifically.
3. **Let the instrument give feedback before the explanation does.** Whenever possible, the player should see the pattern first and infer the principle second.
4. **Avoid dexterity as the source of difficulty.** This is not a twitch FPS. Difficulty should come from choosing what to measure, what to change, and how to interpret the result.
5. **Preserve the story stakes.** Every physical interaction should feel like work the Ridgeway group genuinely needs done that day, not a detached training simulator.
6. **Use wrong actions as instruction.** A wrong setting should produce a scientifically sensible consequence: more noise, a missed resonance, a biased classifier, a bad fit, or an inconclusive result.
7. **Do not require prior knowledge the game has not supplied.** The player can be asked to infer, calculate, compare, or diagnose from information already present in the mission.
8. **Prefer one memorable instrument interaction per mission.** Two is appropriate for a few especially strong missions, but three physical minigames every mission will slow the story and become repetitive.
9. **Keep the existing characters involved.** The expert should react to what the player actually did rather than delivering a generic success line.
10. **Record meaningful player choices.** Where feasible, let later dialogue remember whether the player diagnosed efficiently, over-measured, or made a risky assumption.

---

# Highest-priority conversions

If only eight interactions are built initially, I would build these first, in this order.

## 1. M04 S2 — Move the discriminator line between two readout clouds

**Why this is the best conversion:** The concept is inherently visual, the control is intuitive, and the player can discover the trade-off rather than being told it.

**Interaction:** Put the player at Nakamura's analysis workstation. Two overlapping readout clouds are plotted in real time. The player drags the discriminator boundary left and right. Counters update for false-ground and false-excited assignments, plus total fidelity.

**Learning behavior:** Moving the line helps one class and hurts the other. The player eventually sees that no placement eliminates the errors caused by overlap.

**Best ending:** Nakamura asks, “Can you get to 99.5% by moving the line?” The player tries and cannot. Only then does the game introduce the idea that better separation or lower noise is required.

**Do not:** Put a glowing marker at the optimum before the player experiments.

---

## 2. M11 S1 — Train on one set, test on another

**Why:** This is the narrative payoff of the entire game and should be experienced, not merely read.

**Interaction:** Castellan opens Ridgeway's discriminator notebook. The player has two trays/data tabs: CALIBRATION and HELD-OUT. First, the existing Ridgeway procedure automatically fits and scores on CALIBRATION, producing the flattering number. Then the player locks the fit and applies it to HELD-OUT data. The fidelity drops.

**Optional second step:** Shuffle the held-out shots into the training set and let the reported score rise again. The player sees the bias appear in front of them.

**Learning behavior:** “Training score” versus “generalization performance” becomes a physical event in the story.

**Best character reaction:** Castellan does not say the answer first. She says something like, “Freeze the line. Now give it data it has never seen.”

---

## 3. M02 S1 + S2 — Find the resonance, then calibrate the pulse

**Why:** This is the most natural “I am operating a quantum computer” sequence in the game.

### Part A: spectroscopy

At the microwave-control rack, the player sweeps frequency from 4.2 to 6.4 GHz. A live response trace grows as the sweep advances. The strong 4.61 GHz resonance and weaker 4.55 GHz feature appear naturally.

The player marks the likely qubit resonance but is not asked to identify the weak feature yet.

### Part B: Rabi calibration

The player locks the carrier to 4.61 GHz and changes pulse duration. The measured excited-state population oscillates. They place a marker on the first maximum and save it as the π pulse.

**Learning behavior:** Frequency answers “where do I drive?” Pulse duration answers “how long do I drive?” Those two ideas become impossible to confuse after the player has controlled both knobs.

---

## 4. M01 S2 — Trace the heat leak down the refrigerator

**Why:** This turns the opening mission into a real diagnosis rather than a question about a diagnosis.

**Interaction:** The dilution refrigerator is open in service mode. The player walks from the 50 K stage down through 4 K, still, cold plate, and mixing chamber. Each stage has a readable current temperature, comparison value from the previous cooldown, and heat-load indicator.

Several lines descend through the fridge. The new signal cable is physically visible. At each stage the player can inspect whether the cable is clamped/heat-sunk.

**Key discovery:** Upper stages look normal. The lower stages are warm. One cable bypasses or poorly contacts a thermal anchor.

**Learning behavior:** The player infers the location of the load from the *pattern* before discovering the bad clamp.

**Important:** Do not make this a scavenger hunt where the answer is simply a red cable. The temperature pattern should narrow the diagnosis first.

---

## 5. M09 S1 — Actually acquire the four Bell correlations

**Why:** CHSH feels arbitrary if presented only as four supplied numbers. It becomes much more meaningful if the player creates those numbers.

**Interaction:** The player has four setting pairs. For each pair, they run a batch of shots and watch counts accumulate in 00, 01, 10, 11 bins. The interface then computes or asks the player to compute `E = P(same) - P(different)`.

After all four settings are complete, the player inserts the measured E values into the CHSH combination and obtains S ≈ 2.78.

**Learning behavior:** The player understands that a Bell statistic is built out of ordinary repeated measurements rather than being a magical “quantumness meter.”

**Follow-on:** M09 S3 then becomes more powerful because the player has just done an on-chip version and can see exactly which physical conditions it did not enforce.

---

## 6. M08 S1 — Build the randomized-benchmarking decay

**Why:** Randomized benchmarking is abstract in prose but visually simple when the decay is built shot by shot.

**Interaction:** Give the player sequence-length buttons for 2, 8, 32 and 128 gates. They run several random sequences at each length. Survival points appear on a graph. The player fits or selects the decay trend.

Then add a simulated constant readout offset and show that the graph moves vertically while the decay rate barely changes. This should happen interactively, not as a lecture.

**Learning behavior:** The distinction between a fixed SPAM contribution and an error that accumulates with sequence length becomes visually obvious.

---

## 7. M06 S1/S2 — Map a two-level defect in frequency

**Why:** This builds directly on the weak feature introduced in M02 and creates a satisfying “we saw this before” payoff.

**Interaction:** The player tunes the qubit through a frequency range and records T1 at several points. A narrow dip appears around the defect. The player places a “do not operate here” band on the frequency map.

A second tab shows chips/coupons by fabrication date. The player notices that the same feature class appears only in the suspicious processing window.

**Learning behavior:** The player links spectroscopy, energy relaxation, tunability, and fabrication provenance in one causal chain.

---

## 8. M07 S1 — Watch averaging hit the 1/√N law and then stop helping

**Why:** This makes a simple calculation feel like experimental science.

**Interaction:** Barros's magnetometer streams noisy field readings. The player chooses how long to average. A live uncertainty bar shrinks approximately as 1/√N. The 4 pT target is crossed quickly.

Then, if the player keeps averaging, introduce a small slow drift so the uncertainty stops improving according to the ideal curve.

**Learning behavior:** The player sees both the power and the limitation of averaging. The phrase “independent measurements” suddenly matters.

---

# Mission-by-mission interaction ideas

## M01 — The warm refrigerator

### Best interaction: stage-by-stage heat diagnosis
Use the fridge itself as described above. Let the player inspect the temperature history and thermal anchoring of each cable.

### Secondary interaction: thermal-population calculator without making it a calculator screen
At Okafor's board, let the player drag temperature from 11 mK to 42 mK while a plot of equilibrium excited-state probability changes logarithmically. Mark 11 and 42 only after the player has explored the curve.

**Reason to keep secondary:** Excellent conceptual visualization, but the cable diagnosis is more FPS-native.

---

## M02 — Finding and driving a qubit

### Best interaction: frequency sweep and Rabi scan
Combine S1 and S2 into a continuous lab sequence. Sweep, find, lock, scan pulse duration, save π pulse.

### Failure feedback
- Lock onto 4.55 GHz: poor/odd response; Lindqvist says the weaker line has not yet been identified.
- Drive at 5.02 GHz because it was the design value: nearly flat response.
- Choose a full Rabi period instead of half: the population returns close to ground.

This teaches through consequence without punishing the player heavily.

---

## M03 — T1 versus T2

### Best interaction: run the two pulse sequences and fit two decays
The player chooses the delay time for a T1 experiment and sees excited population decay. Then they run a Ramsey-style phase-coherence measurement and see contrast disappear much faster.

On the analysis terminal, overlay the relaxation-limited `2T1` ceiling with measured T2. Do not immediately label the gap “dephasing.” Ask the player what process is missing.

### Optional physical clue hunt
Let the player switch the suspect flux/bias source between normal supply and a quieter test source. T2 improves while T1 remains nearly unchanged. This is an excellent causal demonstration if the story is allowed to become slightly more experimentally active.

---

## M04 — Readout

### Best interaction: discriminator boundary
Highest priority in the whole game.

### Secondary interaction: readout-chain noise budget
Let the player temporarily toggle/bypass individual amplifier stages in a safe simulation view. Show signal amplitude and noise referred back to the chip. Moving the first low-noise amplifier later in the chain should visibly hurt SNR much more than changing the final room-temperature gain.

**Do not** make the player memorize amplifier order by dragging cards if the 3D rack can show the actual signal path.

---

## M05 — Delft replication offer

This mission is more about scientific judgment than hardware, so it should remain less physical than M02/M04.

### Best interaction: build the replication package at a workstation
The player has folders/items representing:
- logical circuit and protocol,
- device-specific pulse calibration,
- Ridgeway fitted discriminator,
- raw-data format/metadata specification,
- Ridgeway expected result,
- uncertainty/analysis notes.

They drag items into **SEND NOW**, **REQUEST BACK**, or **HOLD UNTIL DELFT FREEZES ANALYSIS**.

This is still a classification task, but it belongs naturally to the world and makes the independence logic tangible.

### Optional story beat
After the player sends the package, Sadiq can point at the network rack and use that moment to introduce the distinction between copying classical instructions and cloning an unknown quantum state.

---

## M06 — Defect with a date

### Best interaction: frequency map + fabrication archive
Run T1 while tuning through the defect; then physically pull wafer coupons from dated drawers or inspect their tags on a fabrication wall.

The important reasoning is not “find the glowing bad coupon.” The player should notice that the affected devices cluster in the six-week process window.

---

## M07 — Quantum sensing

### Best interaction: live averaging
Stream magnetometer data and let the player control integration time.

### Secondary interaction: calibration against reference
Whitfield/Barros inserts a known reference source. The player measures it, computes or accepts a calibration factor, then re-measures the unknown. A second run can introduce scale drift: the raw readings remain precise but shift until the reference comparison exposes it.

This would teach precision versus accuracy better than a definition ever will.

---

## M08 — Benchmarking and depth

### Best interaction: build the RB decay
Run multiple sequence lengths and fit the decay.

### Secondary interaction: depth stress test
Let the player choose circuit depths of 10, 50, 100, 200, 400. A toy-model success projection falls exponentially. Then label it explicitly **independent-error model**, reinforcing the surgical-pass wording.

The interaction should make the player *feel* why 98.8% per operation is not automatically impressive at depth 400.

---

## M09 — Bell test

### Best interaction: acquire all four correlations
Run counts at four setting pairs and build S.

### Secondary interaction: locality visualizer
After the on-chip result, show the two qubits on a space-time diagram. Let the player move detectors farther apart or shorten measurement time until the light cones no longer overlap. This is somewhat abstract but could be exceptionally educational if presented clearly.

Do not require the player to manipulate relativity equations; the visual should explain why a millimetre-scale chip does not close the locality loophole.

---

## M10 — Computational advantage claim

### Best interaction: validate the estimator where truth is known
At twelve qubits, the player runs a circuit, obtains Ridgeway samples, and then presses **EXACT CLASSICAL SOLUTION**. Overlay the estimator's answer with the exact distribution/fidelity.

Then increase simulated noise and watch where the estimator becomes biased.

**Learning behavior:** Small systems are not “less interesting versions” of large systems; they are calibration territory because the truth is independently knowable.

### Avoid
Do not make the player wait for fake classical-computation progress bars. The educational point is model validation, not simulated runtime.

---

## M11 — Delft discrepancy

### Best interaction: held-out evaluation
Highest narrative priority along with M04.

### Secondary interaction: dependency tracing
On Castellan's pipeline wall, each result is connected by arrows to the steps that produced it. The player follows/marks which outputs pass through the discriminator. Circuit outcomes and Bell correlations light up as downstream; T1/T2 decay fits and RB show a different dependency path.

This is much better than asking “which result is affected?” in isolation because it teaches provenance as a system.

---

## M12 — A day when nothing is wrong

### Best interaction: audit one assumption physically
The player walks the lab with Mensah's audit list:
- base temperature — live sensor,
- qubit frequencies — today's measurement,
- amplifier noise temperature — recent certificate,
- input-line attenuation — old label from before two rebuilds.

The important gameplay is comparing **age × downstream importance**, not merely finding the oldest date.

### Optional payoff
After remeasuring attenuation, let one later amplitude figure change slightly. Nothing dramatic happens. That is the point: preventative science often ends with a better number, not an explosion.

---

## M13 — Three problems at once

### Best interaction: triage board with live consequence indicators
The three problems are visible in the world simultaneously:
- QKD link is red/offline but stable,
- review deadline clock is counting down,
- reference-clock discrepancy is causing a growing list of “measurements since last good comparison.”

The player chooses which station to visit first. If they choose the clock, one repeat comparison stops the affected-data counter from growing.

This is a good place for genuine player agency because the lesson is prioritization rather than one piece of physics.

### Secondary QKD interaction
Show RAW/SIFTED/RECONCILED/PRIVACY-AMPLIFIED states as actual data blocks in Sadiq's console. The partial interrupted data sit visibly before the “SECRET KEY” state, reinforcing that exchanged bits are not automatically usable key.

---

## M14 — Correction deadline

This is primarily a decision mission; do not force a laboratory minigame into it.

### Best interaction: construct the correction package
At Petrova's desk, the player assembles four components:
- corrected current number,
- mechanism,
- scope,
- rerun status.

The interface previews how each version would appear in the conference record. Removing the mechanism makes the correction shorter but visibly less actionable; removing scope makes it look as though every result is compromised.

### Secondary interaction: twelve-qubit projection
A register display shows 12 readout indicators. Set per-qubit fidelity to 0.941 and let the player increase register size 1 → 3 → 6 → 12 while “all correct” probability falls. Keep a large label: **PROJECTION: identical independent readout errors**.

---

## M15 — Review day

### Best interaction: evidence wall
The review room has four claims on physical panels. The player places evidence badges beside them:
- directly demonstrated,
- measured on held-out data,
- inferred from correlation,
- projected from a model.

This is conceptually similar to a sorting question but now serves a story function: the completed wall becomes Raghavan's actual review slide.

### Final payoff
When the player walks out after the review, the lab should visibly retain the practices they chose to institutionalize: a HELD-OUT data indicator on Castellan's pipeline, a version tag on figures, calibration logs on the sensing station, and the defect exclusion band in the control software. The world itself should show that the fortnight changed the laboratory.

---

# Interactions I would *not* build

These would add development time without enough educational return:

- FPS jumping, timed obstacle courses, aiming, shooting, or reaction-time tasks unrelated to the physics.
- “Find the hidden object in the room” as a substitute for diagnosis.
- Walking ten seconds to a console merely to answer the same multiple-choice question.
- Manual cable plugging where there is only one physically possible socket.
- Repeated card sorting for concepts that could be demonstrated by the actual instrument.
- Long simulated waits for cooldowns, compilation, network transmission, or data collection.
- Complex laboratory procedures that require memorizing professional technician steps that are not part of the learning objective.

# Recommended implementation order

### Phase A — Build the four signature interactions
1. M04 discriminator boundary.
2. M02 spectroscopy + Rabi calibration.
3. M11 held-out evaluation.
4. M01 refrigerator heat-leak diagnosis.

These four alone would make the project feel qualitatively different from a 3D quiz game.

### Phase B — Add experimental reasoning
5. M08 randomized-benchmarking decay.
6. M09 four Bell correlations.
7. M06 defect-frequency map.
8. M07 live averaging and calibration.

### Phase C — Add scientific-practice interactions
9. M10 small-system estimator validation.
10. M12 stale-assumption audit.
11. M13 triage board + QKD data-state display.
12. M05 replication package.
13. M14 correction package.
14. M15 evidence wall.

M03 can be inserted whenever the pulse-sequence/plot framework built for M02 and M08 is reusable.

# A useful implementation principle for Claude

Whenever converting an existing scene, preserve the same story information and learning objective, but use this sequence:

**NPC gives the problem → player operates/observes → instrument produces evidence → player makes a decision → NPC explains the consequence.**

Avoid the weaker sequence:

**NPC explains the concept → player repeats it in a quiz → instrument animates success.**

The first sequence is what will make Ridgeway feel like a real learning FPS rather than a quiz system rendered in first person.
