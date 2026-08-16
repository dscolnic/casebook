# Bring Them Home — Senior-Level FPS-Native Interaction Guide

## Purpose

This guide accompanies `bring-them-home-senior-surgical-pass.jsonl` and the machine-readable `bring-them-home-senior-interactions.jsonl` manifest. The interaction manifest is authoritative about which existing lesson screen is **replaced**, which interaction is built, and what short reasoning question follows it.

The goal is not to add a minigame after every lesson. When a physical or visual interaction teaches the concept better than the existing question, **replace that question/activity**. Keep concise reasoning screens where the intellectual work is interpretation rather than manipulation.

## Design rules for Claude

1. Treat every `replaces` field in the interaction manifest literally. Do not show the replaced legacy question before or after the interaction unless the manifest explicitly reuses it.
2. Difficulty comes from physics and judgment, not twitch skill. A student should fail because the model or decision was wrong, not because a cursor missed a target.
3. Evidence should appear before explanation. Let the player see the shared reference, thermal bridge, antenna pattern, resonance peak, or uncertainty cloud before a character names the principle.
4. Wrong actions should produce physically meaningful consequences. An over-range connector heats; a late braking pulse overshoots; a leaky scrubber still sounds healthy while CO2 rises.
5. Protect character voice. Carter challenges shared assumptions; Reyes asks what moved independently; Shah audits energy over time; Brooks asks what quantity actually moved; Ito demands a loss mechanism large enough for the observed decibels; Mensah and Okoye care about frequency and measured response.
6. Use real-looking spacecraft instruments and numbers in the environment rather than turning every action into floating quiz UI.
7. Where an interaction contains the core decision, the follow-up question must ask for the next layer of reasoning, not make the player repeat the action they just completed.
8. Do not make the correct hardware glow or color the correct trajectory green before the student has reasoned it out.
9. Prefer one memorable interaction per mission. M12 is the deliberate exception because diagnosis, calculation and mitigation form one continuous resonance experiment.
10. Later dialogue should remember important earlier choices when practical, especially the Carter–Whitaker disagreement and the common-mode pattern that returns in M14.

## Highest-priority builds

- **M04 — Fly the Manual Attitude Turn**: Turn the spacecraft 90 degrees with bounded thruster pulses and arrive at the target attitude with near-zero angular rate.
- **M05 — Close the 62-Hour Power Ledger**: Build a feasible duty-cycle schedule that fits the remaining amp-hour allocation while preserving protected survival and entry functions.
- **M06 — Qualify the Emergency Battery**: Design a connection that adds usable energy without creating an equalization surge, overloaded connector, or single-point fire hazard.
- **M08 — Build the CO₂ Adapter**: Connect a square sorbent canister to a round flow path so cabin air is forced through the sorbent with acceptable pressure drop.
- **M09 — Find Earth in the Beam**: Account for the observed link loss, estimate beam width, then recover signal by recentering the antenna and adjusting receiver settings.
- **M11 — Fit the Entry Cloud Inside the Corridor**: Judge entry readiness using a distribution of possible trajectories rather than one nominal angle.
- **M12 — Sweep Through Resonance**: Demonstrate that the 3,200 rpm pump is driving a structural mode near 53 Hz, then move operation away and verify the fix.
- **M14 — Catch the Shared Clock**: Determine whether the spacecraft moved or several apparently independent ground solutions inherited the same timing error.

## Mission-by-mission interaction specification

### M01 — Trace the Shared Failure
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m01.s1 hypothesis-choice screen

**Player goal:** Determine whether the pressure warning is a real leak or a measurement-system failure.

**Player actions:**
- Open the three digital pressure channels and trace each to its sensor, shared reference circuit, and telemetry path.
- Compare the digital channels with the independent mechanical gauge and acoustic leak monitor.
- Probe the shared reference voltage and mark which measurements depend on it.
- Commit to one fault hypothesis only after the dependency map is complete.

**Success:** Player identifies the shared reference-voltage failure and can point to the independent evidence that rules against a real cabin leak.

**Scientifically meaningful failure feedback:** Do not make wrong hypotheses explode. Let them fail because they predict an observation the panel does not show; Carter asks, “What else should have moved if that were true?”

**Follow-up question:** Which observation did the most work in ruling out a real cabin leak?  
**Answer:** The independent mechanical pressure gauge stayed steady while the digital channels moved together.

**Character:** Carter  
**Implementation note:** The interaction replaces the old multiple-choice diagnosis. Do not show the old question before the dependency tracing.

### M02 — Rebuild the State Vector
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m02.s2 card-ordering activity

**Player goal:** Build one trajectory estimate from range, bearing, Doppler and mismatched time standards, then test it against a withheld observation.

**Player actions:**
- Convert all observations onto one time standard.
- Drag range, bearing and Doppler measurements onto a shared timeline.
- Fit a candidate state and inspect residuals rather than only the fitted orbit.
- Propagate the state to the next pass and reveal the withheld tracking point.

**Success:** The fitted state predicts the withheld observation within its stated uncertainty and the player notices any structured residual before accepting it.

**Scientifically meaningful failure feedback:** A fit made before clock conversion should look impressively smooth but miss the withheld observation. Reyes says, “Pretty is not predictive.”

**Follow-up question:** Why is the withheld tracking point more valuable than making the existing fit look tighter?  
**Answer:** It tests whether the state predicts new data instead of merely reproducing the data used to build it.

**Character:** Reyes  
**Implementation note:** Replace the sequence cards with the workbench. Keep the conceptual measurement-matching in m02.s1.

### M03 — Burn Now or Burn Later
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m03.s1 sequence activity; m03.s2 standalone impulse calculation screen

**Player goal:** Use a measured thrust and burn time to create a small delta-v, then see how burn timing changes the later entry miss.

**Player actions:**
- Calculate or construct the 4 m/s delta-v from 6,000 N, 20 s and 30,000 kg.
- Apply the same delta-v at several candidate times on the coast.
- Propagate each case to entry and compare miss distance and remaining correction authority.
- Choose whether the current tracking uncertainty is small enough to justify committing now.

**Success:** Player sees that early delta-v accumulates position change for longer, but also refuses to burn if the state uncertainty is comparable to the correction being commanded.

**Scientifically meaningful failure feedback:** A late-burn choice should require a visibly larger delta-v for the same entry correction. A premature burn on a deliberately noisy state should move the vehicle confidently toward the wrong solution.

**Follow-up question:** Why can “burn earlier” and “measure first” both be correct engineering instincts?  
**Answer:** Earlier burns are more efficient, but only if the state estimate is accurate enough that the commanded correction reduces total error.

**Character:** Whitaker and Carter  
**Implementation note:** This interaction should preserve the disagreement rather than declare one character generally right.

### M04 — Fly the Manual Attitude Turn
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m04.s2 card-ordering activity

**Player goal:** Turn the spacecraft 90 degrees with bounded thruster pulses and arrive at the target attitude with near-zero angular rate.

**Player actions:**
- Read attitude and estimated angular rate from the window reticle and sparse cues.
- Choose a thruster pair and pulse duration to start the turn.
- Coast without thrust while monitoring the target approach.
- Apply the opposite torque early enough to brake.
- Repeat with a different moment of inertia or one failed thruster quad.

**Success:** Player reaches the target attitude within tolerance and with low residual angular rate while minimizing propellant use.

**Scientifically meaningful failure feedback:** Waiting until the target angle to brake should produce overshoot, not a generic red X. Mensah says, “You stopped accelerating at ninety. You did not stop rotating.”

**Follow-up question:** Why must the braking pulse begin before the target attitude arrives?  
**Answer:** With essentially no rotational damping, angular velocity persists until an opposing torque removes it.

**Character:** Mensah  
**Implementation note:** This is one of the best FPS-native replacements in the course. The torque calculation in m04.s3 can remain as a short follow-up.

### M05 — Close the 62-Hour Power Ledger
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m05.s3 single-choice load-shedding question

**Player goal:** Build a feasible duty-cycle schedule that fits the remaining amp-hour allocation while preserving protected survival and entry functions.

**Player actions:**
- See each load as current draw multiplied by time, not simply an on/off label.
- Schedule guidance and high-rate communications only around required windows.
- Choose lower-rate communications between windows.
- Set minimum thermal-control duty cycles and watch local battery temperature affect usable capacity.
- Keep a protected reserve for entry and one missed assumption.

**Success:** Integrated amp-hours stay below the allocation, protected loads remain satisfied, and the schedule retains reserve through entry.

**Scientifically meaningful failure feedback:** A plan that looks good instantaneously but exceeds total amp-hours should fail late on the timeline. Shah says, “You saved watts. I asked you to save watt-hours.”

**Follow-up question:** Why is “turn off the biggest load” not a complete power strategy?  
**Answer:** Mission functions are needed at different times; the relevant quantity is integrated energy use plus the consequences of switching each load off.

**Character:** Shah and Brooks  
**Implementation note:** This replaces the old one-load answer entirely.

### M06 — Qualify the Emergency Battery
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m06.s1 topology matching; m06.s3 qualification multiple choice

**Player goal:** Design a connection that adds usable energy without creating an equalization surge, overloaded connector, or single-point fire hazard.

**Player actions:**
- Measure open-circuit voltage and estimate state of charge for both modules.
- Select series or parallel topology and predict what happens to voltage and current sharing.
- Choose connector/current-limit hardware and a fuse/isolation strategy.
- Run a simulated load test while watching branch current, connector temperature and bus voltage.

**Success:** Player rejects the undersized 8 A connector for a 14 A branch, limits or reroutes current, adds protection, and demonstrates acceptable sharing and temperature.

**Scientifically meaningful failure feedback:** If connected directly, show a current surge and rising connector temperature before any smoke. Ferreira says, “That temperature is the warning. Smoke is the autopsy.”

**Follow-up question:** Why was measuring state of charge necessary but not sufficient?  
**Answer:** Voltage matching affects equalization current, but the original connector was still under-rated for the expected continuous branch current.

**Character:** Ferreira and Shah  
**Implementation note:** Use real-looking meters and a circuit diagram; do not turn this into wire-color matching.

### M07 — Spend the Thermal Margin
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m07.s2 vocabulary-style matching; m07.s3 single-choice thermal action

**Player goal:** Use measured temperature patterns to identify dominant heat paths and allocate passive insulation and limited powered circulation where they matter most.

**Player actions:**
- Walk the cabin with a thermal camera and inspect crew-zone, battery, window and structural-bridge temperatures.
- Toggle short fan cycles to distinguish air-mixing problems from total heat loss.
- Place a limited amount of insulation on selected surfaces or enclosures.
- Advance the thermal forecast several hours and inspect condensation and battery-temperature consequences.

**Success:** The player reduces the dominant passive heat losses, protects the cold-critical battery location and uses circulation as an intermittent gradient-control tool rather than the main heater.

**Scientifically meaningful failure feedback:** Insulating a warm interior panel while leaving the metal thermal bridge exposed should barely change the forecast. Brooks asks, “Which path did you actually interrupt?”

**Follow-up question:** Why can the coldest local battery temperature matter more than the cabin-average temperature?  
**Answer:** Battery capability depends on the battery’s own temperature, and a local cold spot can fail before the average cabin becomes equally cold.

**Character:** Brooks and Shah  
**Implementation note:** The player should learn from the temperature field, not from glowing correct insulation locations.

### M08 — Build the CO₂ Adapter
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m08.s3 multiple-choice scrubber-design question

**Player goal:** Connect a square sorbent canister to a round flow path so cabin air is forced through the sorbent with acceptable pressure drop.

**Player actions:**
- Inspect the available hose, tape, cloth and rigid cover.
- Build the adapter around the canister and fan inlet.
- Use smoke/flow visualization or pressure taps to reveal bypass leakage.
- Seal leaks and run the system while watching pressure drop, airflow and cabin CO2 trend.

**Success:** Most airflow passes through the sorbent, pressure drop stays within fan capability, and the CO2 trend turns downward.

**Scientifically meaningful failure feedback:** A leaky adapter should still sound like a working fan while CO2 keeps rising. Novak says, “The motor is working. The air is cheating.”

**Follow-up question:** What measurement proves the repair worked better than fan current does?  
**Answer:** The transported quantity: airflow through the sorbent and the resulting decline in cabin CO2.

**Character:** Novak and Brooks  
**Implementation note:** This is the strongest life-support interaction and should directly replace the old answer screen.

### M09 — Find Earth in the Beam
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m09.s1 hypothesis screen; m09.s2 standalone wavelength calculation

**Player goal:** Account for the observed link loss, estimate beam width, then recover signal by recentering the antenna and adjusting receiver settings.

**Player actions:**
- Inspect transmitter power, range change, ground-station agreement and attitude history.
- Compute wavelength and approximate beam width from carrier frequency and aperture.
- Move spacecraft pointing relative to Earth and watch received power follow the antenna pattern.
- Trade data rate and receiver bandwidth after the geometric loss is corrected.

**Success:** Player identifies mispointing as the only effect large enough, recenters the antenna, and recovers a stable low-bandwidth link without inventing transmitter power.

**Scientifically meaningful failure feedback:** Changing receiver settings before fixing pointing should improve signal-to-noise modestly but leave the large link loss. Ito says, “Useful. Now find the other ten decibels.”

**Follow-up question:** Why did two ground stations seeing the same fade matter?  
**Answer:** It made a local receiver fault unlikely and pointed toward a spacecraft-side cause shared by both stations.

**Character:** Ito and Haldane  
**Implementation note:** Use a real beam-response curve rather than making the correct attitude glow.

### M10 — Align by Eye
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m10.s1 matching activity

**Player goal:** Separate eye-reticle parallax, focus, true sky geometry and spacecraft rotation before committing a manual burn attitude.

**Player actions:**
- Move the virtual eye laterally and observe the reticle shift relative to the target.
- Adjust focus and see sharpness change without line-of-sight direction changing.
- Take repeated star/target sightings from the same eye position.
- Estimate scatter and choose an alignment only after the repeatability is bounded.

**Success:** Player removes observer-induced parallax, distinguishes it from spacecraft motion, and produces a repeatable alignment with stated angular uncertainty.

**Scientifically meaningful failure feedback:** A single sighting can look perfect and still move when the eye shifts. Reyes says, “That was your head moving, not the Moon.”

**Follow-up question:** Why are several repeatable sightings more useful than one apparently perfect alignment?  
**Answer:** They reveal the scatter and observer-dependent bias, allowing the room to bound the angular uncertainty.

**Character:** Reyes  
**Implementation note:** Keep difficulty in interpretation and repeatability, not mouse precision.

### M11 — Fit the Entry Cloud Inside the Corridor
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m11.s3 single-choice corridor question

**Player goal:** Judge entry readiness using a distribution of possible trajectories rather than one nominal angle.

**Player actions:**
- View the 5.3°–7.7° corridor and a cloud of entry-angle samples generated from current state uncertainty.
- Add a new tracking observation and watch the cloud narrow rather than merely shift.
- Toggle atmospheric and centre-of-mass assumptions to see survivability boundaries change separately from navigation uncertainty.
- Choose whether another correction or another observation reduces total risk more.

**Success:** Player distinguishes changing the nominal trajectory from reducing uncertainty and recognizes the shallow-side margin as the tighter side in the current solution.

**Scientifically meaningful failure feedback:** Moving the target marker to the corridor center without changing uncertainty should leave some simulated trajectories outside. Lindqvist says, “You moved the dot. The cloud came with it.”

**Follow-up question:** What did the new tracking pass buy that simply recentering the nominal angle did not?  
**Answer:** It narrowed the range of plausible actual trajectories.

**Character:** Lindqvist and Reyes  
**Implementation note:** This should visually teach uncertainty; avoid presenting only ± numbers on a card.

### M12 — Sweep Through Resonance
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m12.s1 diagnosis multiple choice; m12.s2 standalone natural-frequency calculation; m12.s3 single-choice mitigation

**Player goal:** Demonstrate that the 3,200 rpm pump is driving a structural mode near 53 Hz, then move operation away and verify the fix.

**Player actions:**
- Sweep pump speed slowly through the allowed range while watching two accelerometers and a frequency spectrum.
- Convert rpm to forcing frequency and calculate the simple model natural frequency from mass and stiffness.
- Compare the measured response peak with the calculated 53.4 Hz natural frequency.
- Command a new operating band away from resonance and resweep to verify amplitude remains controlled.

**Success:** The player finds a sharp response near 3,200 rpm/53.3 Hz, connects it to the 53.4 Hz model prediction, shifts the pump operating point and verifies the mitigation.

**Scientifically meaningful failure feedback:** Adding more sensor displays without changing pump speed should improve diagnosis but leave the panel shaking. Okoye says, “Excellent measurement. Still vibrating.”

**Follow-up question:** Why is the speed change stronger evidence for resonance than the large vibration amplitude alone?  
**Answer:** The response changes reversibly when forcing frequency moves toward or away from the natural frequency, which is the causal signature resonance predicts.

**Character:** Okoye and Mensah  
**Implementation note:** This is probably the single best science interaction in the game because calculation, observation and intervention all close the loop.

### M13 — Choose the Route That Survives Being Wrong
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m13.s2 static trajectory-choice question; m13.s3 card-ordering commitment activity

**Player goal:** Choose a return path by testing each candidate against uncertain consumables, propulsion, heating and future tracking opportunities.

**Player actions:**
- Compare the four candidate trajectories on time, delta-v, heating and tracking coverage.
- Move the consumable-endurance assumption through its uncertainty range and watch routes become infeasible.
- Reserve propulsion for at least one later correction rather than spending to the nominal optimum.
- Write an abort or reconsideration trigger before committing the burn.

**Success:** Player selects a path that remains feasible in pessimistic consumables and retains meaningful propulsion and tracking margin, then defines a trigger that can be acted on before options close.

**Scientifically meaningful failure feedback:** The nominally optimal route should fail when the uncertainty slider moves. Carter says, “You optimized the estimate. I asked you to survive the error bar.”

**Follow-up question:** What makes an abort trigger useful rather than ceremonial?  
**Answer:** It is defined before commitment, tied to a measurable condition, and leaves enough time and propellant to act if the condition is crossed.

**Character:** Carter and Whitaker  
**Implementation note:** The board should show tradeoffs, not reveal a green 'best route' before the player tests assumptions.

### M14 — Catch the Shared Clock
**Mode:** `interactive_then_question`  
**Priority:** highest  
**Replaces:** m14.s1 multiple-choice fault diagnosis; m14.s3 burn-or-observe multiple choice

**Player goal:** Determine whether the spacecraft moved or several apparently independent ground solutions inherited the same timing error.

**Player actions:**
- Overlay range and Doppler residuals from multiple stations.
- Open the dependency view and discover which observations use the shared clock model.
- Compare them with star-angle data that does not use the ground clock.
- Apply a corrected timestamp to the raw observations and reprocess the state.
- Compare the remaining navigation error with burn execution uncertainty before choosing burn or observe.

**Success:** Player identifies the common timing reference, sees the apparent trajectory shift collapse after reprocessing, and declines a burn whose expected benefit is not larger than the combined uncertainty.

**Scientifically meaningful failure feedback:** A burn commanded from the biased solution should create a new real error. Carter says only, “Now the spacecraft moved.”

**Follow-up question:** Why did agreement among several ground stations fail to count as independent confirmation?  
**Answer:** Their range and Doppler solutions inherited the same timing reference, so one clock error could move all of them together.

**Character:** Carter and Whitaker  
**Implementation note:** This pays off the common-mode theme introduced in m01 and should feel like narrative closure, not a repeated quiz.

### M15 — Final Readiness Evidence Wall
**Mode:** `interactive_then_question`  
**Priority:** high  
**Replaces:** m15.s1 matching activity

**Player goal:** Disposition each final entry claim according to its evidence, uncertainty, shared dependencies and whether action is still physically possible.

**Player actions:**
- Open claims for navigation state, heat-shield configuration, battery power path, autonomous guidance and communications blackout.
- Attach the measurements and tests that support each claim.
- Flag shared dependencies that make evidence less independent than it appears.
- Mark each claim GO, GO-WITH-CONDITION or HOLD while there is still time to act.

**Success:** Player approves only claims supported across their uncertainty, holds unresolved irreversible configuration issues, and accepts known conditions only with prewritten procedures.

**Scientifically meaningful failure feedback:** A blanket GO should cause Carter to reopen the weakest unresolved claim rather than simply mark the board red. Hale hears the discussion, raising the narrative cost of hand-waving.

**Follow-up question:** Why is final readiness claim-by-claim rather than one overall confidence score?  
**Answer:** Different claims have different evidence, failure modes and remaining opportunities for correction; averaging them can hide one unacceptable unresolved risk.

**Character:** Carter and Lindqvist  
**Implementation note:** Keep m15.s2 as the final ordered execution sequence. The evidence wall should make the player feel the accumulated consequences of earlier missions.

## What should remain primarily question/reasoning based

- Short calculations that become more meaningful after an interaction, such as torque in M04 and combined uncertainty in M14, can remain concise calculation screens.
- M02 measurement-to-state matching is useful conceptual scaffolding before the state-vector workbench.
- M03 pressure/flow diagnosis is a good applied reasoning screen and does not need a separate 3D minigame.
- M15 entry ordering should remain a deliberate sequence because the intellectual point is irreversibility and blackout timing, not dexterity.

## Implementation priority by effort

### Lower effort / high value
- M05 power-budget scheduler
- M09 antenna-pointing/link-budget console
- M11 entry-corridor uncertainty cloud
- M12 resonance frequency sweep
- M14 common-clock reprocessing

### Medium effort / very high value
- M01 dependency-tracing console
- M02 state-vector workbench
- M06 battery qualification bench
- M08 CO2 adapter build/test
- M13 trajectory trade-space board
- M15 readiness evidence wall

### Higher 3D/vehicle-control effort
- M03 trajectory correction simulator
- M04 manual attitude thruster control
- M07 cabin thermal-map/insulation allocation
- M10 optical-reticle alignment