# Planetary Defense — Senior-Level FPS-Native Interaction Guide

## Purpose

This guide accompanies:

- `planetary-defense-senior-surgical-pass.jsonl`
- `planetary-defense-senior-interactions.jsonl`

The surgical JSONL preserves the original content schema and fixes science, continuity, pedagogy, question difficulty, and character voice. The interaction manifest is the machine-readable source of truth for which conventional lessons should be replaced by first-person learning activities.

The goal is **not** to add fifteen minigames on top of the existing course. When an interaction is listed as replacing a scene, the physical work becomes the lesson and the follow-up question should move to the next level of reasoning.

## Core design rules

1. **One object, one evolving evidence chain.** The same asteroid should remain physically and numerically consistent across discovery, orbit fitting, characterization, consequence modeling, deflection, and final review.
2. **Interactions replace duplicate questions.** If the player has already demonstrated a concept by operating an instrument or making a measurement, do not immediately ask the old question that merely restates the action.
3. **Evidence appears before explanation.** Let the player see the bad residual field, window-function alias, thermal degeneracy, or shifting orbit ensemble before a character explains it.
4. **Difficulty comes from scientific judgment, not dexterity.** Pointing, selecting, scheduling, plotting, and tuning should expose reasoning. Reaction-time penalties should not determine whether a student understands orbit determination.
5. **Wrong actions should remain scientifically plausible.** A precise nominal orbit can still be wrong; a single spectral class can still be over-interpreted; an impactor can still hit while the campaign fails to measure the deflection.
6. **Protect character voice.** Nguyen distrusts single-instrument discoveries. Rossi wants the distribution. Adebayo asks which assumption carries the number. Fischer treats radar time as scarce. Banerjee insists on ranges. Garcia thinks in warning time. Ellery thinks in triggers.
7. **Put numbers into the world.** Echo delay belongs on the radar console, not only in a detached question card. Orbit uncertainty belongs on the sky map. Survey selection belongs in the injected-object recovery display.
8. **Do not make the correct control glow.** The player should infer what to do from the evidence.
9. **Use a follow-up question only when it asks something new.** Good follow-ups ask why the action was informative, what assumption still remains, or what the city/mission should do next.
10. **Keep the distinction between measured and inferred properties visible.** Diameter can be constrained by thermal/radar data; density may still be inferred; strength may remain far less constrained.

---

# Highest-priority interaction replacements

If only eight are built first, build these.

## 1. M03 — Collapse the Dangerous Dimension

The player manipulates a live orbit-family visualization and tests candidate follow-up observations.

Why it is high value:
- It makes covariance and information gain visual.
- It explains why another extremely precise image can be less valuable than a strategically timed one.
- It turns “orbit uncertainty” from a vocabulary term into geometry the player can see.

The key feedback is that same-night observations squeeze the cloud a little while radar, parallax, and a longer time baseline squeeze different directions.

## 2. M04 — Watch Probability Move

Populate the uncertainty region with weighted virtual asteroids and propagate them to the eight-year return.

The player should be able to watch impact probability rise or fall after adding a measurement even when the nominal miss moves in the opposite direction.

This is one of the strongest scientific-reasoning lessons in the game because it attacks the misconception that a changing probability means the scientists changed their story.

## 3. M05 — Break the Brightness Degeneracy

Give the player diameter and albedo controls. Many combinations fit the reflected brightness.

Then add thermal data.

The correct educational moment is not “thermal infrared is the answer.” It is watching a large two-dimensional family of solutions collapse when a measurement based on different physics arrives.

## 4. M07 — Find the Asteroid's Clock

Show the single-site periodogram with both the 4.8-hour sampling alias and the coherent 3.5-hour brightness repetition.

Let the player add stations at other longitudes and watch the alias weaken.

Then fold the light curve and discover why a 3.5-hour repetition can imply a candidate rotation near seven hours.

This interaction repairs one of the original content's largest internal inconsistencies while teaching a very real data-analysis problem.

## 5. M08 — Spend Four Hours of Echoes

Use an actual radar control station:
- transmit,
- measure delay,
- inspect Doppler centroid,
- inspect Doppler width,
- form a delay-Doppler image,
- combine range with angular width,
- schedule views through rotation.

The player learns that “radar” is not one measurement.

## 6. M11 — Find What the Survey Cannot See

This should be an injected-population completeness simulator.

Let the player run the same synthetic NEO population through:
- current survey,
- deeper survey,
- faster cadence,
- expanded low-solar-elongation access,
- space-based infrared coverage.

The warning-time distribution is more important than total detections.

## 7. M12 — Measure the Nudge

The kinetic impactor should feel like an experiment:
- predict direct momentum transfer,
- include uncertain ejecta enhancement,
- establish the pre-impact orbit,
- impact,
- measure the post-impact orbit,
- compare prediction and outcome.

Do not let “spacecraft hit asteroid” equal “mission succeeded.”

## 8. M14 — Act Before Certainty

Build the public-response thresholds before the next orbit update appears.

Then update probability through the scripted sequence and force the player to obey the prewritten rules.

This makes reversibility, consequence, lead time, and trust part of the mechanics rather than a lecture.

---

# Mission-by-mission interaction guide

## M01 — The Discovery Image
**Primary interaction:** image blink + detector/sky-coordinate diagnosis.

The player blinks three exposures, toggles detector coordinates, checks source morphology, and loads an independent recovery image.

**Replaces:** the original object-versus-artifact multiple-choice question.

**Do not:** turn this into “click the moving dot.” The scientific point is that a real candidate survives multiple coordinate systems and instruments.

## M02 — Confirm the Motion
**Primary interaction:** astrometric residual diagnostics.

Normalize timestamps, map residual vectors over the focal plane, compare reference stars with the asteroid, then refit after correcting the suspect camera.

**Replaces:** the original diagnosis plus most of the ordering screen.

**Character:** Delacroix should care more about structured residuals than about the lowest RMS.

## M03 — An Orbit from Sparse Data
**Primary interaction:** orbit-family information-gain planner.

The player sees a cloud of allowed trajectories and previews how each candidate observation changes it.

**Replaces:** the matching exercise and conventional scheduling question.

**Best consequence:** waiting for radar without extending the arc makes the radar pointing uncertainty visibly worse.

## M04 — The Uncertainty Corridor
**Primary interaction:** weighted virtual-asteroid propagation.

Add observations, recompute the impact branch, and schedule follow-up where the live hypotheses diverge most.

**Replaces:** most of the conventional risk/probability questioning.

**Do not:** make the virtual asteroids equally weighted unless the sampling model explicitly says they are.

## M05 — How Large Is It?
**Primary interaction:** optical/thermal inversion.

Many diameter–albedo pairs fit the same brightness. Thermal data cut across the family.

**Replaces:** the standalone albedo algebra and “what measurement?” question.

**Secondary:** radar later provides an independent projected-size/shape check.

## M06 — What Is It Made Of?
**Primary interaction:** telluric calibration workstation.

Overlay standard star and asteroid spectra, vary airmass, compare space-based data, correct the atmosphere, then compare several surface models.

**Replaces:** the original spectral-artifact multiple choice.

**Follow-up should ask:** why a surface class is not an exact bulk density or strength.

## M07 — The Spinning Target
**Primary interaction:** periodogram + window-function analysis.

Combine longitudes, remove the 4.8-hour alias, identify the coherent 3.5-hour repetition, and test a seven-hour full rotation.

**Replaces:** both the diagnosis and simple factor-of-two calculation.

**Do not:** force a final principal-axis solution if the later data still permit tumbling.

## M08 — Radar Contact
**Primary interaction:** delay-Doppler console.

Use delay for range, Doppler centroid for range-rate information, Doppler width for rotation, and repeated delay-Doppler views for shape/spin modeling.

**Replaces:** the radar-observable matching screen and standalone angular-size calculation.

**Physical continuity:** the optical/radar effective diameter should land near 180 m.

## M09 — Impact Energy
**Primary interaction:** uncertainty-aware consequence builder.

Construct mass from radius and density, convert the 12 km/s far-field approach to about 16.4 km/s entry speed in the simplified boundary calculation, then propagate uncertainty into kinetic energy.

**Replaces:** the two detached calculations.

**Key lesson:** prioritize measurements by contribution to the propagated uncertainty, not exponent alone.

## M10 — Through the Atmosphere
**Primary interaction:** entry ensemble simulator.

Vary strength, density, and entry angle. Watch dynamic pressure, fragmentation, deceleration, and energy deposition change with altitude.

Compare the simulated signatures with optical, infrasound, seismic, and ground evidence.

**Replaces:** the single-outcome diagnosis and “pick one model” question.

## M11 — What Have We Failed to See?
**Primary interaction:** survey selection-function simulator.

Inject synthetic objects and measure recovery versus magnitude, solar elongation, cadence, and linking.

**Replaces:** the geometry diagnosis, most of the simplistic volume lesson, and the conventional upgrade choice.

**Key output:** warning-time distribution, not merely number of discoveries.

## M12 — Can We Move It?
**Primary interaction:** kinetic-impact deflection experiment.

Predict Δv, impact, observe ejecta, refit the orbit, and compare measured versus predicted momentum transfer.

**Replaces:** momentum calculation + matching + campaign-choice screens.

**Character:** Fischer wants the orbit change measured. Adebayo wants target-property uncertainty kept visible.

## M13 — Design the Intercept
**Primary interaction:** intercept error-budget simulator.

Assign each error source to the subsystem that can actually reduce it, then run terminal-approach Monte Carlo trials.

**Replaces:** the subsystem matching screen.

**Keep:** the Kepler-period problem can remain a concise calculation if desired.

## M14 — Evacuate or Wait?
**Primary interaction:** trigger-based response board.

Write thresholds first. Then receive changing orbit probabilities and execute the staged plan.

**Replaces:** the action/evidence matching and final advisory choice. The expected-value calculation may remain as a short embedded calculation if it is immediately interpreted.

**Do not:** make 45,000 “the number to evacuate.” It is an expectation in the simplified binary model.

## M15 — The Final Defense Review
**Primary interaction:** campaign evidence wall + legacy budget.

Connect each final claim to the evidence and assumptions that support it, classify its status, and then fund the capabilities that prevent the same late-warning failure next time.

**Replaces:** the final matching, ordering, and one-answer budget screens.

**Ending tone:** institutional memory, not victory lap.

---

# Character guidance

## Nguyen
She tests whether a signal belongs to the sky or the apparatus. Let her enjoy falsifiable checks.

## Rossi
He wants the full orbit distribution. His enemy is not uncertainty; it is a clean line that hides uncertainty.

## Adebayo
Her defining trait is resistance to assumption creep. She is comfortable with taxonomic classes and uncomfortable when those classes are silently converted into exact density or strength.

## Fischer
He treats radar time as scarce. His questions should be about what unique dimension an echo buys.

## Banerjee
He thinks in consequence ranges and propagated uncertainty. He should not reflexively choose the worst case or the central case.

## Garcia
She thinks in warning time and system capacity. Discovery is valuable because it gives every downstream capability time to work.

## Virtanen
Her pipeline philosophy is injection/recovery. She cares about what the software silently throws away.

## Delacroix
He looks for structure in residuals. A low RMS with a pattern should bother him more than one isolated large residual.

## Sorokin
She is the person who breaks the optical size–albedo tie with different physics.

## Schulz
She accepts model ensembles without sounding hesitant. The unmeasured strength is a finding, not an embarrassment.

## Ellery
She writes triggers before the number moves. Her credibility comes from making future actions conditional in advance.

---

# Implementation priority by effort

## Relatively low effort / high value
1. M01 image blink and detector-coordinate toggle
2. M02 focal-plane residual map
3. M05 diameter–albedo slider with thermal constraint
4. M07 periodogram/window-function overlay
5. M09 energy uncertainty sliders
6. M14 trigger board

## Medium effort / very high value
1. M03 orbit-family information-gain viewer
2. M04 virtual-asteroid risk corridor
3. M08 radar delay-Doppler console
4. M10 atmospheric-entry ensemble
5. M11 survey completeness simulator
6. M12 deflection measurement campaign

## Higher world / simulation effort
1. M13 terminal intercept Monte Carlo with optical navigation
2. M15 full campaign evidence wall with dependency links

---

# What should remain concise rather than become a minigame

Some existing reasoning is already effective in screen form:

- M01's apparent-motion unit conversion can remain a short calculation after the discovery interaction.
- M05's factor-of-two diameter/albedo relation can appear as an optional notebook calculation inside the larger thermal interaction.
- M10's joule-to-megaton conversion is useful as a consistency check but does not deserve its own physical minigame.
- M13's Kepler-third-law period matching is a clean calculation that can remain on a mission-planning board.
- M14's expected-value arithmetic can remain if the interaction immediately demonstrates why the expectation is not an evacuation head count.

The rule is simple: **make the visual, causal, or uncertainty-rich ideas physical; keep short calculations short.**
