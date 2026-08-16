# AFTERSHOCK — Senior High School FPS-Native Interaction Guide

## Purpose

This guide accompanies `aftershock-senior-surgical-pass.jsonl` and `aftershock-senior-interactions.jsonl`. The surgical-pass file improves the existing senior-level story, science, questions, distractors and explanations while preserving the original JSONL structure. The interaction manifest is deliberately explicit about which lesson each activity replaces.

The central design rule is **do not add a minigame and then ask the old question again**. When the player has physically demonstrated the core concept, the follow-up should ask for interpretation, transfer or an operational decision.

Character voice is protected. Okonkwo should still sound like Okonkwo, Halvorsen should remain a serious counterweight rather than a reckless administrator, Navarro should keep pulling attention back to the ground, Ferreira should demand a number with a method attached, Tanaka should distinguish rates from promises, and Cardoso should treat finding an instrument problem as scientific success.

## Design rules for Claude

1. Prefer one memorable interactive investigation per mission. Do not turn all three scenes into separate minigames.
2. Replace the weaker question activity when the physical action already contains the science.
3. Difficulty should come from evidence, engineering judgment and model limits, not dexterity.
4. Wrong actions should produce scientifically sensible consequences or missing evidence, not arbitrary game penalties.
5. Put numbers on instruments, plans, survey screens and notebooks whenever possible instead of detaching every calculation into a quiz card.
6. Let the player inspect evidence before a character explains it. Characters challenge reasoning; they do not announce the answer.
7. Preserve uncertainty. A measured PGA below a nominal design input is not an automatic all-clear; a CPT ratio is not a liquefaction safety factor; a green placard is not a warranty.
8. Let later scenes reuse earlier evidence. The school, hospital and Ferry Street blind spots should visibly pay off in M15.
9. Use the interaction manifest as the implementation source of truth for `lessonMode`, `replaces`, success conditions and follow-up prompts.
10. Keep the first-person world meaningful: walking to a location is not itself the interaction. The player must measure, compare, allocate, trace, test or decide.

## Highest-priority builds

If only eight interactions are implemented first, build these in roughly this order:

1. **M12 — The Wrong Zero:** paired reference-station comparison + dependency graph. This is the strongest “how science corrects itself” interaction in the game.
2. **M05 — Trace the Gym’s Force:** first-person lateral load-path tracing through a real building.
3. **M02 — Draw the Source:** arrival picking and source triangulation on the map.
4. **M14 — Prove the Ground Changed:** CPT before/after profile and measurable acceptance target.
5. **M06 — Open the Last Door:** physically close the hospital’s one unresolved critical item.
6. **M07 — Fit the Falling Rate:** fit an aftershock decay and then expose uncertainty with simulations.
7. **M09 — Every Metre Needs a Reason:** redraw a cordon segment by segment using hazards and release conditions.
8. **M15 — Nothing Quietly Expires:** build the permanent unresolved-items close-out system that would have prevented three failures.

## Mission-by-mission interaction specifications


### M01 — Two Stations, One Earthquake

**Scene:** `m01.s1`  
**Mode:** `interactive_then_question`  
**Type:** `seismogram_site_response`  
**Replaces:** The original m01.s1 multiple-choice comparison as the primary learning activity.

**Player experience**

- Stand at Cardoso’s workstation and overlay the Upper Town and Bay Road acceleration records.
- Toggle peak amplitude, duration and a simple frequency-spectrum view rather than relying on one peak number.
- Verify that the two sensors overlap correctly in time and are not clipped.
- Place each record onto the ground-profile map: competent bench versus deep fill.
- Select the explanation that survives the instrument, distance and waveform checks.

**Success condition:** Player identifies a real site-response difference and can point to both stronger motion and changed duration/frequency content as evidence, without claiming that soft soil amplifies every frequency equally.

**Scientifically useful failure feedback**

- If the player blames instrument failure without checking clipping/cross-sensor evidence, Cardoso asks: “What does a failed sensor do that this trace actually does?”
- If the player uses the 1.1 km separation as the main cause, Navarro makes them compare it with the much larger source distance.

**Follow-up:** Which parts of the record make a site effect more convincing than a source-distance explanation?

**Target reasoning:** The large amplitude contrast together with longer, frequency-dependent shaking at two nearby stations points to different site response rather than the small separation between stations.

**Character note:** Cardoso owns instrument validity; Navarro owns the ground mechanism. Do not let either character give the conclusion before the player inspects the traces.

### M02 — Draw the Source

**Scene:** `m02.s1`  
**Mode:** `interactive_then_question`  
**Type:** `seismic_triangulation_map`  
**Replaces:** The detached S–P distance estimate as the whole m02.s1 lesson. Keep the short calculation inside the interaction.

**Player experience**

- Pick the P and S arrivals on three station traces.
- Convert each S–P interval to an approximate source distance using the provided crustal rule of thumb.
- Draw a radius around each station on the town/regional map.
- Watch the three circles produce an overlap region rather than a perfect pixel point.
- Toggle one known clock-drift correction and observe how one circle moves.

**Success condition:** Player locates the source from multiple station constraints and understands that one station gives distance, multiple stations give location, and timing errors move the geometry.

**Scientifically useful failure feedback**

- A single circle leaves an entire ring of possible sources.
- Using magnitude as a radius makes Cardoso say: “That number says how big. I asked where.”

**Follow-up:** Why does correcting a station clock move the epicentre even when the waveform shape is unchanged?

**Target reasoning:** The location calculation depends on arrival times; a clock bias changes the inferred travel-time difference and therefore the distance circle.

**Character note:** Let Cardoso be pleased by finding her own clock problem. Preserve her “I found it” personality rather than making the scene punitive.

### M03 — Six Minutes Outside

**Scene:** `m03.s1`  
**Mode:** `interactive_then_question`  
**Type:** `rapid_building_assessment`  
**Replaces:** The m03.s1 classification screen as the primary lesson.

**Player experience**

- Approach a damaged building with a rapid-assessment form and a six-minute operational clock.
- Inspect visible lean, exterior cracking, falling hazards, egress and accessible structural elements.
- Attempt to inspect a locked rear wing and a concealed connection, and explicitly mark them “not observed” rather than guessing.
- Issue the rapid placard and attach an unresolved-items list to it.

**Success condition:** Player makes a defensible rapid occupancy decision while explicitly recording critical areas the inspection could not cover.

**Scientifically useful failure feedback**

- If the player marks concealed or locked areas “clear,” Whitcombe says: “Fast is allowed. Inventing what was behind a locked door is not.”
- If the player refuses to placard anything until a full evaluation is complete, Halvorsen shows the growing inspection queue.

**Follow-up:** What does the green placard establish, and what does the unresolved-items list prevent people from assuming?

**Target reasoning:** It establishes that no restriction was found in the rapid inspection’s actual scope; the list prevents inaccessible or concealed areas from being silently treated as inspected.

**Character note:** Whitcombe should be fast and self-aware, not careless. This interaction is where his second-list habit becomes tangible.

### M04 — What Eight Degrees Changes

**Scene:** `m04.s2`  
**Mode:** `interactive_then_question`  
**Type:** `p_delta_load_line`  
**Replaces:** The original m04.s2 multiple-choice question about why lean matters.

**Player experience**

- Use the survey laser to confirm the building’s rigid-body lean and column geometry.
- Select a representative gravity load and watch its vertical line of action shift relative to the column axis as lean increases.
- Read the resulting eccentricity and qualitative bending/P–Δ demand.
- Compare a stable monitored lean with a hypothetical continued ground movement case.

**Success condition:** Player identifies eccentric gravity load and P–Δ/bending as the structural consequence of lean, while distinguishing that from evidence of ongoing movement.

**Scientifically useful failure feedback**

- Choosing “it looks unsafe” produces no structural quantity on the calculation board.
- Assuming the lean must keep increasing triggers the monitoring plot showing three days of stable geometry.

**Follow-up:** Why can an undamaged frame still become unacceptable after the foundation rotates?

**Target reasoning:** The geometry changes the load path: gravity acts with eccentricity, adding bending and P–Δ demand even if the frame material itself did not crack during the initial settlement.

**Character note:** Okonkwo should insist on a load-path reason; Halvorsen can keep the public-confidence pressure alive without being made foolish.

### M05 — Trace the Gym’s Force

**Scene:** `m05.s1`  
**Mode:** `interactive_then_question`  
**Type:** `structural_load_path_trace`  
**Replaces:** The m05.s1 matching/classification activity.

**Player experience**

- Walk from the gym roof diaphragm to the end resisting elements with a “load-path tracer.”
- At each interface, identify what physically transfers lateral force: roof deck/diaphragm, collector or frame, panel tie/anchor, resisting wall/frame, foundation.
- Compare with the classroom block’s shorter redundant wall paths.
- Flag the small roof-to-panel anchors as a critical connection to test, without assuming the panel itself is automatically adequate.

**Success condition:** Player completes a continuous lateral load path and identifies the connection whose failure would leave a heavy panel unsupported out of plane.

**Scientifically useful failure feedback**

- If the player jumps directly from roof to ground, Okonkwo asks them to point to the missing physical connection.
- If the player chooses “the largest component must be the weak one,” Ferreira asks for a capacity measurement.

**Follow-up:** Why can a small anchor control the safety of a very large wall panel?

**Target reasoning:** A load path is limited by its weakest required transfer; if the connection cannot pass the wall/roof inertia into the resisting system, the panel’s own material strength cannot rescue the broken path.

**Character note:** This is a good Okonkwo/Ferreira handoff: Okonkwo traces force; Ferreira refuses to accept an untested capacity claim.

### M06 — Open the Last Door

**Scene:** `m06.s1`  
**Mode:** `interactive_then_question`  
**Type:** `critical_unresolved_item_inspection`  
**Replaces:** The m06.s1 “which part is unresolved?” matching screen.

**Player experience**

- Open the roof plant room with Ives and inspect the two water tanks, supports, anchors and flexible connections.
- Use a checklist to distinguish actual observed restraint from design drawing assumptions.
- Record whether the tanks shifted, whether anchors yielded, and whether pipe connections can tolerate movement.
- Close the unresolved item only if the observed condition supports it; otherwise keep a targeted restriction.

**Success condition:** Player turns a general yellow placard into a specific resolved or unresolved component decision based on direct inspection.

**Scientifically useful failure feedback**

- Trying to clear the plant room from the basement PGA alone prompts Okonkwo: “That number never opened this door.”
- Ordering unrelated shear-wall cores before looking at the tanks makes Halvorsen show the four-day delay clock.

**Follow-up:** Why was opening the plant room more valuable than a four-day shear-wall coring programme at this point?

**Target reasoning:** The plant room was the specific unresolved life-safety item holding the decision; coring an already-cleared frame answered a lower-value question unlikely to change the placard.

**Character note:** Do not make Halvorsen “the reckless one.” His role is to force the value-of-information calculation.

### M07 — Fit the Falling Rate

**Scene:** `m07.s1`  
**Mode:** `interactive_then_question`  
**Type:** `aftershock_decay_forecast`  
**Replaces:** The m07.s1 stand-alone day-eight estimate as the entire lesson.

**Player experience**

- Plot daily magnitude-3+ counts on a time axis.
- Fit or drag an Omori-style decay curve through the sequence.
- Double elapsed time from day four to day eight and read the central predicted rate.
- Turn on an uncertainty band and run several simulated eight-day sequences that scatter around the same curve.
- Use the upper part of the forecast range to size an inspection staffing decision.

**Success condition:** Player gets a central day-eight estimate near 13 but treats it as an expected rate with uncertainty rather than a scheduled count or end date.

**Scientifically useful failure feedback**

- If the player draws the line to zero on a chosen date, Tanaka asks where the date entered the equation.
- If the player treats thirteen as a guaranteed count, simulated sequences immediately show plausible higher and lower days.

**Follow-up:** What does the curve tell an emergency manager that “aftershocks end next Friday” does not?

**Target reasoning:** It provides an expected rate and uncertainty that can size staffing and restrictions without pretending to predict the exact time of the next event or an end date.

**Character note:** Tanaka should be careful in public and blunt at the curve: “A rate is not an appointment.”

### M08 — Break the Sample, Not the Claim

**Scene:** `m08.s1`  
**Mode:** `interactive_then_question`  
**Type:** `concrete_core_testing`  
**Replaces:** The m08.s1 multiple-choice interpretation as the primary activity.

**Player experience**

- Verify each core’s building/column label and reject an unlabeled specimen.
- Measure diameter, cap the sample and run a compression test to failure.
- Plot the four strengths against the 25 MPa specified value.
- Separate the material-strength conclusion from the damaged-member-capacity conclusion on the lab board.

**Success condition:** Player concludes that the sampled concrete is broadly near/above the design target but that the cracked columns’ residual capacity remains unresolved.

**Scientifically useful failure feedback**

- An unlabeled core cannot be assigned to the building; Sørensen refuses it before the press runs.
- If the player declares the columns safe from the average strength alone, Ferreira asks for reinforcement, confinement and damage-state information.

**Follow-up:** Why can strong concrete coexist with a structurally damaged column?

**Target reasoning:** Core strength describes the material sample; column capacity also depends on reinforcement, geometry, confinement, bond and the cracking/damage state.

**Character note:** Sørensen protects provenance; Ferreira protects the distinction between material property and structural capacity.

### M09 — Every Metre Needs a Reason

**Scene:** `m09.s1`  
**Mode:** `interactive_then_question`  
**Type:** `hazard_cordon_release_map`  
**Replaces:** The m09.s1 matching screen and provides the setup for m09.s3.

**Player experience**

- Walk the cordon boundary on a map/first-person route.
- Attach a named hazard and responsible owner to each segment: parapet, gas main, vehicle access, or no recorded basis.
- For every segment, set a measurable release condition rather than a date.
- Remove or redraw segments whose original hazard has been resolved while preserving those with active evidence.

**Success condition:** Player produces a smaller cordon in which every retained segment has a current hazard, owner and release condition.

**Scientifically useful failure feedback**

- A segment with “because it was there yesterday” flashes as an unowned decision, not an automatic removal.
- Removing the gas-main segment before utility sign-off produces a direct dependency warning.

**Follow-up:** Why is “review again Friday” weaker than “lift when the parapet is tied and inspected”?

**Target reasoning:** A date does not tell whether the hazard changed; a condition ties the restriction to the evidence that justified it and makes responsibility explicit.

**Character note:** Delacroix should push for end conditions, not simply for fewer cordons. Halvorsen can attack stale restrictions while Okonkwo protects active hazards.

### M10 — Down There With a Scale

**Scene:** `m10.s2`  
**Mode:** `interactive_then_question`  
**Type:** `crack_pattern_investigation`  
**Replaces:** The m10.s2 one-click crack diagnosis.

**Player experience**

- Use the photograph to locate the correct basement row.
- Measure crack width and height on several columns and mark the pattern on a plan.
- Check for diagonal cracking, spalling, rust staining, slab movement and joint displacement.
- Compare the repeated height with pour drawings or construction records.
- Choose the leading hypothesis and specify the verification that would falsify it.

**Success condition:** Player identifies a construction joint as the leading explanation while explicitly checking whether earthquake movement damaged that joint.

**Scientifically useful failure feedback**

- Calling the crack “earthquake shear” without geometry evidence prompts comparison with the diagonal shear pattern from M08.
- Calling it harmless merely because it is a construction joint triggers a check of displacement/spalling across the joint.

**Follow-up:** Why is “construction joint” a hypothesis to verify rather than an automatic all-clear?

**Target reasoning:** Earthquake demand can exploit a pre-existing joint; the repeated geometry explains where the plane came from, but condition across the joint determines whether it was damaged.

**Character note:** Adeyemi cares about what the office can say publicly; Okonkwo cares about what has actually been established.

### M11 — Test the Thing You Need to Design

**Scene:** `m11.s2`  
**Mode:** `interactive_then_question`  
**Type:** `masonry_anchor_pullout_test`  
**Replaces:** The m11.s2 test-selection multiple choice.

**Player experience**

- Inspect the old masonry and choose representative mortar/brick zones for trial anchors.
- Install trial anchors at the intended embedment without large destructive sampling.
- Run pull-out tests and record load-displacement behaviour, not just the peak number.
- Use the measured distribution to decide whether the proposed parapet tie detail is viable or requires a different anchorage strategy.

**Success condition:** Player selects and performs a test that measures the actual anchor/substrate failure mode relevant to the retrofit.

**Scientifically useful failure feedback**

- Crushing a brick gives a material property but not the pull-out capacity of the proposed anchor in this wall.
- A rebound number without anchor testing leaves Ferreira asking: “What load can I put on the tie?”

**Follow-up:** Why is the most direct test not necessarily the most destructive test?

**Target reasoning:** A representative trial anchor loads the actual connection mechanism in the existing wall and can answer the design question with limited local damage.

**Character note:** Ferreira should be practical and unromantic: test the failure mode you intend to rely on.

### M12 — The Wrong Zero

**Scene:** `m12.s1`  
**Mode:** `interactive_then_question`  
**Type:** `reference_station_dependency_audit`  
**Replaces:** The m12.s1 multiple-choice ratio lesson and should feed directly into m12.s2 dependency sorting.

**Player experience**

- Overlay five days of paired recordings from the old vault and temporary competent-rock station.
- Compare spectral amplitudes in the period band used for the Flats site ratio.
- Measure the vault/rock factor near 1.6.
- Recompute the Flats/rock ratio from the prior Flats/vault value near 3 to about 4.8.
- Open a dependency graph and highlight every conclusion that actually used that denominator.

**Success condition:** Player corrects the affected site-response ratio while leaving direct building observations and independent instruments intact.

**Scientifically useful failure feedback**

- Multiplying every earthquake quantity by 1.6 causes the dependency graph to reject unrelated magnitudes and direct building measurements.
- Discarding the Flats sensor data prompts Cardoso: “The numerator was measured correctly. The label on the denominator was wrong.”

**Follow-up:** Why is tracing dependencies more important than simply declaring the entire fortnight “wrong”?

**Target reasoning:** The reference error biases only conclusions that used it; unrelated observations and independent instruments retain their evidential value.

**Character note:** Cardoso should own the mistake and the correction. This is a scientific-integrity victory, not a humiliation scene.

### M13 — First Ten Minutes

**Scene:** `m13.s1`  
**Mode:** `interactive_then_question`  
**Type:** `multi_incident_resource_allocation`  
**Replaces:** The original single-answer “which problem first?” question.

**Player experience**

- Receive the aftershock, burst-main and school-deadline alerts simultaneously.
- Assign the utility isolation call immediately.
- Allocate four engineers between rapid checks of high-risk occupied/shored buildings and other tasks.
- Send the already-established gym decision through the communication channel without consuming a field team.
- Advance ten simulated minutes and observe which risks grow or stabilize.

**Success condition:** Player stops the active water hazard immediately while still covering high-consequence aftershock checks in parallel.

**Scientifically useful failure feedback**

- Putting all engineers on the ended aftershock analysis lets the water table continue rising.
- Putting all engineers on the school deadline leaves both an active leak and vulnerable occupied buildings unattended.

**Follow-up:** Why is this not a simple “pick one of three” priority problem?

**Target reasoning:** Some actions are cheap and parallelizable. Good incident command stops the hazard that is still worsening while reserving resources for consequences with immediate life-safety importance.

**Character note:** Halvorsen should demand an assignment board, not an abstract ranking. Okonkwo should protect the high-consequence re-checks.

### M14 — Prove the Ground Changed

**Scene:** `m14.s2`  
**Mode:** `interactive_then_question`  
**Type:** `cpt_ground_improvement_qc`  
**Replaces:** The m14.s2 arithmetic-only “improvement factor” lesson.

**Player experience**

- Run/inspect CPT profiles before and after the trial ground-improvement panel.
- Compare qc with depth rather than only one headline value.
- Calculate the headline increase from 4 to 11 MPa as 2.75×.
- Apply a specified corrected-qc acceptance line over the target depth interval.
- Reject the claim that 2.75× qc automatically means 2.75× liquefaction resistance.

**Success condition:** Player uses CPT as a measurable construction-acceptance metric while keeping the liquefaction evaluation as a separate engineering calculation.

**Scientifically useful failure feedback**

- Converting 2.75× qc directly into a 2.75 safety factor triggers Navarro: “Same ratio, different quantity.”
- Passing the trial from one shallow point fails when the deeper profile misses the acceptance zone.

**Follow-up:** Why is a measurable qc target stronger than the phrase “improve the ground,” but weaker than a complete liquefaction-safety claim?

**Target reasoning:** qc can verify that treatment changed the soil as specified; liquefaction resistance still depends on corrected CPT interpretation, stress, fines, groundwater and the design method.

**Character note:** Ferreira loves the measurable acceptance target; Navarro prevents the player from pretending that one QC number is the entire hazard model.

### M15 — Nothing Quietly Expires

**Scene:** `m15.s3`  
**Mode:** `interactive_then_question`  
**Type:** `unresolved_items_closeout_board`  
**Replaces:** The original m15.s3 permanent-practice multiple choice as the primary synthesis activity.

**Player experience**

- Open the inspection records for the school gym, hospital plant room and Ferry Street basement.
- Trace each missed area to Whitcombe’s existing “not inspected” note.
- Assign each unresolved critical item an owner, deadline and required evidence for closure.
- Attempt final occupancy clearance with one critical unresolved item still open and see the system block it.
- Compare this targeted close-out system with blanket double-engineer and magnitude-trigger rules.

**Success condition:** Player designs a permanent unresolved-items process that preserves rapid triage but prevents critical inaccessible areas from being forgotten.

**Scientifically useful failure feedback**

- Simply adding another note reproduces the exact failure: the item remains visible but unowned.
- Requiring two engineers does not open a locked room; the board shows the same unresolved item twice.

**Follow-up:** What was the actual process failure if Whitcombe had already recorded every inaccessible area?

**Target reasoning:** The organization recorded uncertainty but did not assign ownership or require close-out before the affected use received final clearance.

**Character note:** Let Whitcombe defend rapid assessment honestly. Okonkwo’s reform should fix the handoff, not blame the person who documented the limitation.

## What should stay as conventional reasoning screens

- **M01 S3 assessor prioritization:** the cognitive value is comparing consequence and decision value; it does not need a second 3D system if M01 already has the seismogram interaction.
- **M04 S3 demolition decision:** keep this as a proposal/evidence decision after the lean interaction.
- **M06 S2 value-of-information reasoning:** this is a good short decision screen after physically inspecting the plant room.
- **M08 S2 crack-pattern interpretation:** it can remain a concise visual reasoning question after the core lab.
- **M12 S2 dependency sorting:** keep the synthesis board, but populate it from the player’s corrected reference-station result.
- **M14 S3 rebuilding policy:** this should remain a policy trade-off after the player has physically verified what ground treatment accomplished.
- **M15 S1 evidence grading and S2 forecast range:** these are synthesis tasks; the M15 interaction should focus on the process reform, not replace every final-report question.

## Key content corrections embedded in the surgical pass

- Soft-soil amplification is treated as frequency-dependent site response, not “slow waves must get bigger because energy is conserved.”
- Hydraulic fill is presented as potentially liquefaction-susceptible because of density, saturation, drainage and cyclic demand; age alone is not a defence.
- The 6.6→6.8 magnitude revision is framed as a refined estimate using fuller data, and magnitude remains logarithmic.
- The Marina Court lean is tied to effective-stress/bearing loss and P–Δ demand rather than to the building “looking bad.”
- Two anchor pull tests now produce an **observed capacity-to-demand ratio (~0.82)**, not a falsely formal factor of safety.
- The hospital’s 0.31 g record is direct demand evidence but not an automatic all-clear simply because it is below a 0.35 g design input.
- Four concrete cores characterize sampled material, not the residual capacity of cracked columns.
- Post-liquefaction ground is not automatically “looser”; it may be densified in places yet still have settlement, voids and uncertain heavy-load capacity.
- The reference-station correction is explicitly frequency-band dependent; affected ratios are corrected without multiplying every earthquake quantity by 1.6.
- Raising groundwater is described through effective stress and increased susceptibility, not as liquefaction without shaking.
- CPT qc improvement is a measurable QC target, not the same numerical factor as liquefaction resistance.
- The final permanent reform requires **owner + deadline + evidence of closure** for critical inaccessible areas, because merely recording those areas had already failed.

## Implementation note

The machine-readable file `aftershock-senior-interactions.jsonl` should be treated as authoritative for whether a scene is `interactive_then_question`, what old activity it replaces, and what the player must physically do. The content JSONL intentionally retains the existing application schema; do not infer interaction mechanics from prose when the manifest specifies them explicitly.
