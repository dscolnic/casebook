# Deep Watch — FPS-Native Senior-Level Interaction Guide

## Purpose

This guide accompanies `deep-watch-senior-surgical-pass.jsonl` and `deep-watch-senior-interactions.jsonl`. The interaction manifest is authoritative about which scenes are meant to become interactive replacements. **Do not build the interaction and then also present the old lesson as a duplicate quiz.** When `replaces` names a scene activity, the interaction is the primary lesson and the follow-up question should ask for interpretation, evidence, or a decision one level beyond the physical action.

## Design rules

- Protect character voice. Ferro thinks in sources and trends; Rask in bearings and testable acoustic hypotheses; Sowande in uncertainty and independence; Haruki in dependency chains and rates; Lindqvist in atmosphere balance; Whitfield in ownership and thresholds; Vance in time and accepted uncertainty.
- Use one memorable interaction per mission. Do not turn every scene into a minigame.
- The player action must carry the engineering reasoning. Walking to a glowing console is not an interaction; changing depth to test a propagation hypothesis is.
- Wrong actions should have technically meaningful consequences, not generic red-X feedback.
- Difficulty should come from diagnosis, tradeoffs, evidence and rate reasoning, not twitch reflexes.
- Never mark the correct valve, machine, route or trace with a special glow. Let the measurements identify it.
- When two data sources agree, expose their dependency tree so the player can see whether the agreement is independent.
- For quantitative interactions, place givens on instruments, deck plans, logs and gauges rather than repeating them all on a detached worksheet.
- Keep operational details fictional and scenario-specific; the learning target is systems reasoning and physics, not memorizing a real submarine procedure.
- The final mission should remember the vocabulary and mental models learned earlier: trend, margin, source, dependency, deadline, independent measurement, reversible control.

## Highest-priority conversions

If only eight are implemented first, prioritize:

1. **M05 — Find the Hole Before the Pump Loses.** Best combination of physical investigation and rate calculation.
2. **M08 — Four Casualties, One Watch Team.** Makes prioritization and delegation genuinely playable.
3. **M11 — Where Did the Heat Stop Moving?** Strong systems/energy-chain diagnosis.
4. **M12 — Every Quiet Switch Starts a Clock.** Excellent representation of engineering tradeoffs across departments.
5. **M15 — Deep Watch.** The capstone real-time command synthesis.
6. **M03 — Two Displays Are Still One Source.** Makes common-mode error spatial and memorable.
7. **M02 — Make the Layer Explain Itself.** Turns propagation from a fact into a testable model.
8. **M13 — A Signature Is Not the Check.** Strong evidence/checklist lesson with story payoff.

---

## M01 — Find the Route When the Lights Go

**Scene:** `m01.s3`  
**Mode:** `interactive_then_question`  
**Replaces:** m01.s3 question-only route-memory activity

**Why this should be interactive:** Turn compartment sequence and recoverable navigation into spatial memory rather than a multiple-choice memory rule.

### Player does
- Walk the route once with normal lighting while identifying compartment boundaries, escape routes and distinctive transitions.
- Return with labels and waypoint markers removed and lighting degraded.
- Recover after one scripted interruption or blocked path by identifying the current compartment and rejoining the learned sequence.

### What the world should show
- Ordered compartment layout
- Two alternative hatches in selected spaces
- One blocked route or interruption
- Distinctive physical landmarks that are not glowing answer markers

### Success condition
Player reaches machinery control and can state which compartment sequence let them recover after the interruption.

### Scientifically meaningful failure feedback
- A pure pace-count strategy is disrupted by a forced detour.
- A turn-count strategy fails when one hatch is blocked.
- Trying to rely on stencil numbers fails when lighting is degraded.

### Follow-up reasoning
**Prompt:** Why was the compartment sequence more robust than a count of paces or turns?  
**Target answer:** Because the player can identify where they are after an interruption and rejoin the sequence instead of carrying an error through the rest of the route.

### Character use
Ferro should be terse and practical. He does not narrate the correct route; he asks where the player is now and how they know.

---

## M02 — Make the Layer Explain Itself

**Scene:** `m02.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m02.s2 multiple-choice explanation of the faint unresolved trace

**Why this should be interactive:** Teach propagation as a testable hypothesis by letting the player change depth and observe what the acoustic path does.

### Player does
- Inspect the broadband trace, narrowband panel and temperature-depth profile.
- Choose a controlled depth change across the layer while holding other plant changes fixed.
- Compare trace level and spectral detail before and after the depth change.
- Classify the result as supporting propagation, own-ship noise, display artefact or still unresolved.

### What the world should show
- Persistent faint bearing
- No stable machinery line at initial depth
- Temperature-depth profile with a strong layer
- Own-ship machinery state held constant during the test

### Success condition
Player uses the depth-change result to update the hypothesis without claiming more than the evidence supports.

### Scientifically meaningful failure feedback
- Changing several machines at once destroys the diagnostic value of any acoustic change.
- Increasing gain changes display sensitivity but does not test the propagation geometry.
- Calling the contact gone produces a Rask challenge: “What changed in the water path?”

### Follow-up reasoning
**Prompt:** What made the depth change stronger evidence than simply turning up gain?  
**Target answer:** It changed the propagation geometry and therefore produced a different prediction for a real external contact than for a fixed artefact or unchanged own-ship source.

### Character use
Rask should demand a test, not a guess. Dunne reports what changed on the display without interpreting it for the player.

---

## M03 — Two Displays Are Still One Source

**Scene:** `m03.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m03.s2 answer-choice lesson about the agreeing plot and disagreeing sounding

**Why this should be interactive:** Make common-mode navigation error visible by tracing data dependencies and then using an independent bottom measurement to constrain the position.

### Player does
- Open the source tree behind the chart overlay and electronic repeat and discover both depend on the same inertial solution.
- Compare the plotted chart depth with the measured sounding.
- Slow the boat to reduce the rate at which clearance risk grows.
- Take additional soundings along a short controlled leg and compare the pattern with chart contours to constrain where the boat could be.

### What the world should show
- Two agreeing navigation displays with one shared source
- Independent depth sounder
- Charted bottom contours
- Position uncertainty envelope that grows with time

### Success condition
Player marks the original plot as suspect and uses independent bottom evidence to reduce, not magically erase, the uncertainty envelope.

### Scientifically meaningful failure feedback
- Averaging the two navigation displays changes precision but not the shared bias.
- Declaring the sounder correct from one point leaves chart error and sounder error untested.
- Maintaining speed makes the clearance timer visibly shrink while the team argues.

### Follow-up reasoning
**Prompt:** Why did two agreeing navigation displays count as one measurement for this failure?  
**Target answer:** Because both inherited the same inertial source and therefore could be wrong together; the sounding used a different physical measurement chain.

### Character use
Sowande should keep asking “Independent of what?” Petrov should handle the arithmetic and contour comparison without becoming generic tutorial voice.

---

## M04 — Keep the Whole Circle in the Water

**Scene:** `m04.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m04.s2 standalone margin calculation as the primary lesson

**Why this should be interactive:** Turn navigation uncertainty into a spatial constraint the player can see and manipulate.

### Player does
- Place the two-mile-wide position uncertainty circle around the plotted boat position.
- Drag candidate routes through the four-mile channel.
- Add any required stand-off from the bank and see whether the entire uncertainty envelope remains inside usable water.
- Compare the route margin with the timing cost of waiting for another fix.

### What the world should show
- Four-mile channel width
- Two-mile-diameter position uncertainty
- Bank-side hazard
- Transit timing constraint

### Success condition
Player selects or creates a route whose full uncertainty envelope fits inside the stated usable-water boundary and can explain the remaining margin.

### Scientifically meaningful failure feedback
- A centreline that looks safe but lets the circle cross the bank is rejected visually.
- Treating the two-mile uncertainty as a radius makes the corridor unnecessarily impossible.
- Ignoring the waiting-time consequence moves the transit into the stated first-light exposure window.

### Follow-up reasoning
**Prompt:** Why is route planning done on the uncertainty envelope rather than the plotted centre point?  
**Target answer:** Because the boat may be anywhere inside the envelope; safety requires the plausible positions, not just the best estimate, to remain inside the usable corridor.

### Character use
Vance and Whitfield should disagree about costs, not about arithmetic. Neither should be declared right before the player works the trade.

---

## M05 — Find the Hole Before the Pump Loses

**Scene:** `m05.s1+m05.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m05.s1 source-identification multiple choice, m05.s2 detached flooding-rate estimate

**Why this should be interactive:** Combine source identification and rate accounting into one physical flooding investigation.

### Player does
- Sample the bilge and compare conductivity with outside seawater and fresh-water references.
- Check fresh-water tank level and sonar-cooling flow/return pressure.
- Mark bilge level, wait one simulated minute, and read the second level.
- Use flooded plan area and pump discharge to calculate total leak inflow.
- Isolate the source at the appropriate boundary and watch the level trend reverse.

### What the world should show
- 31 cm to 39 cm level rise in one minute
- 4.0 m² flooded deck area
- 90 L/min pump discharge
- Outside-seawater conductivity reference
- Neighbouring system status indicators

### Success condition
Player identifies the sea-connected source, estimates about 410 L/min inflow, and isolates the pressure source rather than adding pumps indefinitely.

### Scientifically meaningful failure feedback
- Starting another pump slows the rise but leaves the source active.
- Closing an unrelated fresh-water line creates a new service loss while the bilge keeps rising.
- Using the 320 L/min accumulation as total leak rate ignores what the running pump already removed.

### Follow-up reasoning
**Prompt:** Why was the leak rate larger than the rate at which the bilge level rose?  
**Target answer:** Because the observed rise was what remained after the pump removed 90 L/min; the actual inflow was accumulation plus pump discharge.

### Character use
Hallam should think in rates; Ferro should keep asking where the pressure source is. Neither should say the arithmetic answer before the player calculates it.

---

## M06 — The Lamp Says Open. The Cable Does Not.

**Scene:** `m06.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m06.s2 card-order isolation lesson as the primary learning activity

**Why this should be interactive:** Teach the distinction between control indication and direct condition measurement through a contained simulated electrical casualty.

### Player does
- Open the affected branch on the distribution panel.
- Compare panel indication with the direct cable measurement at the casualty boundary.
- Trace the unexpected energized path to the remaining source in the simulation.
- Re-isolate and verify the work boundary de-energized before advancing the casualty sequence.
- Monitor adjacent thermal boundaries as the simulated fire is suppressed.

### What the world should show
- Open breaker indication
- Direct conductor measurement still showing voltage
- One simulated alternate/back-feed path
- Thermal readings on adjacent boundaries

### Success condition
Player refuses to treat the open indication as proof, finds the remaining simulated source and verifies the casualty boundary before proceeding.

### Scientifically meaningful failure feedback
- Proceeding on the lamp alone triggers an immediate simulated unsafe-condition stop.
- Cooling the fire before resolving the energy source produces a scripted re-ignition in the simulation.
- Monitoring only one side of the boundary hides a spreading hot spot.

### Follow-up reasoning
**Prompt:** What did the direct measurement tell you that the switchboard indication could not?  
**Target answer:** It measured the actual condition at the work boundary rather than the commanded or reported state of the control system.

### Character use
Okonkwo stays calm and asks what has actually been measured. He should not deliver a generic electrical-safety lecture.

---

## M07 — The Plant Is Fine. Berthing Is Not.

**Scene:** `m07.s1`  
**Mode:** `interactive_then_question`  
**Replaces:** m07.s1 single-screen diagnosis of sensor plus ventilation failure

**Why this should be interactive:** Let the player discover that a healthy treatment plant can coexist with a bad local atmosphere because airflow, sensing and treatment are separate systems.

### Player does
- Carry a handheld meter through control, machinery and berthing.
- Compare each local reading with installed sensors.
- Trace the ventilation duct and damper state from berthing back to the scrubber path.
- Restore the blocked path in the simulation and watch the local trend begin to recover.
- Flag the installed berthing sensor separately because it still disagrees with the handheld.

### What the world should show
- Normal plant outlet
- Normal handhelds in control and machinery
- High handheld in berthing
- Normal installed sensor in berthing
- Closed local damper

### Success condition
Player identifies two simultaneous faults: isolated airflow and a bad local sensor, without averaging the disagreeing instruments.

### Scientifically meaningful failure feedback
- Increasing scrubber power does little because the affected air is not reaching the plant.
- Replacing the handheld leaves the spatial pattern and crew symptoms unexplained.
- Averaging installed and handheld readings produces a plausible number that matches neither physical condition.

### Follow-up reasoning
**Prompt:** Why could the scrubber outlet be normal while berthing was still accumulating CO₂?  
**Target answer:** The plant could only treat air delivered through the ventilation path; the shut damper isolated berthing from that circulation.

### Character use
Lindqvist owns the air path and Navarro owns the human consequence. Navarro should not identify the engineering fault from symptoms alone.

---

## M08 — Four Casualties, One Watch Team

**Scene:** `m08.s1+m08.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m08.s1 first-priority multiple choice, m08.s2 matching-only delegation activity

**Why this should be interactive:** Make prioritization and delegation a live resource-allocation problem with trends, owners and consequences.

### Player does
- Inspect live trends for flooding, bus state, position uncertainty and the injured crewman.
- Assign the first available team and choose one immediate command action such as slowing the boat.
- Delegate the remaining jobs by naming an owner, first action and report threshold.
- Advance simulated time and watch unattended or poorly assigned problems evolve.
- Revise assignments when one threshold is crossed.

### What the world should show
- Flooding trend before and after source isolation
- Lost bus status
- Growing navigation uncertainty toward a bank
- Stable injury
- Finite team roster

### Success condition
Player bounds the uncontained flooding first, slows to create navigation time, and assigns every remaining problem with a measurable return condition.

### Scientifically meaningful failure feedback
- Sending everyone to the loudest problem leaves another trend unowned and it worsens.
- “Watch it” assignments produce no action until a scripted threshold is already exceeded.
- Holding eight knots visibly consumes the navigation time budget while teams are occupied elsewhere.

### Follow-up reasoning
**Prompt:** What made a good delegation different from simply naming who was responsible?  
**Target answer:** It included a first action and a threshold or return condition, so the team could act independently and command knew when the problem needed attention again.

### Character use
Whitfield should challenge vague assignments. Vance should price time and motion. Neither should pre-rank the casualty for the player.

---

## M09 — Make the Noise Follow One Machine

**Scene:** `m09.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m09.s2 card-order causal-diagnosis lesson

**Why this should be interactive:** Teach controlled experimentation by correlating sonar features with one machinery state at a time.

### Player does
- Ask sonar for the new tone frequency and how it changes with machinery rate.
- Review the plant-event log for what changed when the noise appeared.
- Change one candidate machine state at a time while holding others fixed.
- Have sonar report tone amplitude/frequency after each change.
- Restore the suspect machine and confirm that the feature returns.

### What the world should show
- Broadband rise on all bearings
- New machinery-order tone
- Plant start/change log
- Four candidate machines

### Success condition
Player isolates one reproducible machine-to-tone relationship and confirms it by reversal.

### Scientifically meaningful failure feedback
- Securing several machines at once makes the display quieter but leaves causation unresolved.
- Choosing the newest machine without a reversal test leaves a coincidence unchallenged.
- Treating the small frequency offset as target Doppler conflicts with the source being on the same boat as the hydrophones.

### Follow-up reasoning
**Prompt:** Why did restoring the suspect machine and hearing the line return matter?  
**Target answer:** The reversal made the relationship reproducible and separated a causal machine state from a coincidental change in the acoustic picture.

### Character use
Rask owns the acoustic evidence; Haruki owns the controlled variables. Let them be mildly adversarial until the reversal settles it.

---

## M10 — The Gauge Is a Symptom Too

**Scene:** `m10.s1`  
**Mode:** `interactive_then_question`  
**Replaces:** m10.s1 multiple-choice cause diagnosis

**Why this should be interactive:** Force the player to reconcile depth trend, trim, planes, speed and local evidence rather than blame the instrument that disagrees.

### Player does
- Compare forward and aft depth indications with boat attitude.
- Inspect trim and plane commands while holding speed constant.
- Send/perform a forward bilge check and add that independent observation to the diagnostic board.
- Choose the hypothesis that explains all measurements.
- Apply a reversible control to arrest the trend while the source is investigated.

### What the world should show
- Slow depth increase
- Rise-plane command
- Heavy-forward trim
- Forward/aft depth difference consistent with pitch
- Wet forward bilge

### Success condition
Player identifies added forward weight as the unifying cause and treats the gauge disagreement as geometry to explain, not automatic sensor failure.

### Scientifically meaningful failure feedback
- Replacing a depth sensor leaves the trim and wet-bilge evidence untouched.
- Changing planes alone arrests part of the motion but the heavy trim continues to demand control effort.
- Emergency buoyancy action succeeds physically but is flagged as a high-cost response if margin did not require it.

### Follow-up reasoning
**Prompt:** Why could two correct depth gauges disagree on a pitched boat?  
**Target answer:** They are physically separated and therefore can sit at different hydrostatic depths when the hull is not level.

### Character use
Ferro follows physical evidence forward; Vance asks what control buys time without making the diagnosis for the player.

---

## M11 — Where Did the Heat Stop Moving?

**Scene:** `m11.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m11.s2 temperature-only link diagnosis

**Why this should be interactive:** Teach heat-transfer diagnosis using both flow and temperature rather than reading one hot gauge as the answer.

### Player does
- Trace the bearing-to-oil-to-freshwater-to-seawater heat path on the plant diagram.
- Read temperature before and after each exchanger.
- Read actual seawater flow and compare it with normal.
- Use the qualitative heat-flow relation flow × heat capacity × temperature rise to identify the weak final leg.
- Restore the second pump in the simulation and verify flow, temperature trend and bearing temperature respond as predicted.

### What the world should show
- Hot oil
- Hot fresh-water loop
- Seawater flow at 45% of normal
- Seawater temperature rise only 2 °C
- Second pump secured

### Success condition
Player diagnoses inadequate final heat-removal capacity from flow plus temperature evidence and verifies the diagnosis by restoration.

### Scientifically meaningful failure feedback
- Using the 2 °C temperature rise alone is rejected because both high flow and poor heat transfer can produce small temperature differences.
- Blaming the oil sensor fails because the fresh-water loop independently shows excess heat.
- Replacing the bearing without restoring heat rejection leaves the trend unchanged.

### Follow-up reasoning
**Prompt:** Why was seawater flow necessary to interpret the small outlet temperature rise?  
**Target answer:** Heat carried away depends on both mass flow and temperature change; temperature difference alone does not uniquely identify how much heat is being removed.

### Character use
Haruki should literally trace the chain with the player. He is interested in handoffs and rates, not in naming a failed component early.

---

## M12 — Every Quiet Switch Starts a Clock

**Scene:** `m12.s1`  
**Mode:** `interactive_then_question`  
**Replaces:** m12.s1 single-choice quiet-lineup question

**Why this should be interactive:** Make quiet running a constraint-management problem in which acoustic benefits create explicit system deadlines.

### Player does
- Toggle candidate machinery reductions/secure states on a lineup board.
- Watch estimated acoustic benefit change alongside atmosphere, cooling, speed and array-state consequences.
- For every accepted trade, assign an owner and restoration trigger or deadline.
- Run the four-hour transit simulation and respond if a threshold approaches.

### What the world should show
- Four-hour quiet window
- CO₂ production/removal rates
- Cooling-pump dependency on bearing heat rejection
- Speed/array consequences
- Own-noise contribution

### Success condition
Player builds a lineup whose safety and capability deadlines all exceed the transit window with explicit restoration triggers, while rejecting an unbounded cooling trade.

### Scientifically meaningful failure feedback
- Securing the cooling pump without a protected deadline causes bearing temperature to creep after the acoustic benefit is already banked.
- Securing both atmosphere trains creates an obvious deadline shorter than the transit.
- Choosing maximum quiet regardless of dependencies produces a mission-success meter and a plant-health meter moving in opposite directions.

### Follow-up reasoning
**Prompt:** Why is “can be switched back on” not enough to make a quiet-running trade reversible?  
**Target answer:** Some consequences, such as accumulated heat damage, can occur before restoration; reversibility depends on the consequence and monitoring margin, not just the switch position.

### Character use
Rask asks for quieter; Haruki prices machinery consequences; Lindqvist attaches atmosphere deadlines; Sowande prices speed and array geometry.

---

## M13 — A Signature Is Not the Check

**Scene:** `m13.s1+m13.s3`  
**Mode:** `interactive_then_question`  
**Replaces:** m13.s1 matching-only checklist lesson, m13.s3 multiple-choice inherited-isolation lesson

**Why this should be interactive:** Turn rig-for-dive into a physical evidence audit where each signed item must be backed by a present measurement or observation.

### Player does
- Walk selected hull valves, bilges, escape routes and pump test stations.
- For each checklist item, perform or inspect the evidence that proves the stated claim.
- Compare the switchboard, maintenance log and direct circuit condition on the disputed electrical item.
- Flag the impossible signature from the person who was ashore and assign the item for re-verification.
- Close the boat only after all critical claims have current evidence.

### What the world should show
- Rig-for-dive checklist
- Signed items
- One impossible signature
- Two breaker indications that conflict with the log
- Physical routes and test points

### Success condition
Player rejects signature-as-proof, re-verifies the discrepant critical items and closes the dive checklist with evidence linked to each claim.

### Scientifically meaningful failure feedback
- Accepting the signature without inspection allows a blocked route or unverified isolation to persist into the simulated dive.
- Believing the log over the measured circuit condition creates an unresolved discrepancy that prevents final closeout.
- Rechecking every item indiscriminately wastes time; the interface rewards risk-based focus on critical and inconsistent claims.

### Follow-up reasoning
**Prompt:** What is the difference between a checklist signature and the evidence the checklist is supposed to preserve?  
**Target answer:** The signature records responsibility; the evidence demonstrates that the physical condition was actually verified at the relevant time.

### Character use
Ferro treats the checklist as compressed experience. Okonkwo becomes very quiet when paperwork and direct electrical evidence disagree.

---

## M14 — Buy the Failure You Actually Remove

**Scene:** `m14.s1`  
**Mode:** `interactive_then_question`  
**Replaces:** m14.s1 single-answer refit preference question

**Why this should be interactive:** Make capital allocation depend on recurrence, consequence, next-patrol exposure and whether a proposal truly breaks the failure mode.

### Player does
- Open the patrol casualty log and tag each event by recurrence, consequence and affected mission capability.
- Inspect each refit proposal and identify which causal failure it removes versus which metric it merely improves.
- Apply the next-patrol mission profile to weight the exposures.
- Choose the single major refit slot and defend the choice using the evidence trail.

### What the world should show
- Pump-noise event history
- Navigation common-mode event
- Measured one-scrubber margin
- Flooding source-isolation history
- One major yard slot

### Success condition
Player selects the refit that best changes the stated next-patrol decision and cites the log evidence and assumptions, rather than choosing the largest specification number.

### Scientifically meaningful failure feedback
- Choosing the larger drain pump is challenged by the history showing source isolation, not pump size, was the binding action.
- Choosing atmosphere capacity is challenged by the measured twenty-hour margin against a four-hour quiet period.
- Choosing a redundant sensor that shares dependencies is rejected until the proposal is made genuinely independent.

### Follow-up reasoning
**Prompt:** What made the best refit mission-specific rather than universally “best”?  
**Target answer:** Its value depended on which failure had recurred, what consequence it caused, what the next patrol would expose the boat to, and whether the refit removed that causal path.

### Character use
Whitfield keeps dragging everyone back to the log. Haruki, Rask, Lindqvist and Sowande should each make a credible departmental case.

---

## M15 — Deep Watch

**Scene:** `m15.s1+m15.s2`  
**Mode:** `interactive_then_question`  
**Replaces:** m15.s1 multiple-choice ranking, m15.s2 matching-only delegation activity

**Why this should be interactive:** Make the final mission synthesize trend, margin, uncertainty, delegation and reversible control in real time.

### Player does
- Monitor the contact, position uncertainty, bilge, atmosphere and bearing temperature on separate but linked stations.
- Choose the first condition to change before the constrained passage.
- Assign the four remaining problems to named teams with first actions and report thresholds.
- Advance time while handling new reports and revise priorities if trends change.
- State aloud or in the log which uncertainties are being accepted and why.

### What the world should show
- Opening faint contact
- Stable bilge
- Twenty-hour atmosphere margin
- Steady warm bearing
- Growing position uncertainty toward constrained water
- Limited watch team

### Success condition
Player changes the shrinking navigation margin first, delegates every other condition with measurable thresholds, and completes the passage setup without letting an unowned trend cross its limit.

### Scientifically meaningful failure feedback
- Choosing by alarm color rather than trend allows position uncertainty to consume the passage margin.
- Keeping multiple jobs personally causes unassigned conditions to stop generating useful reports.
- Vague delegation produces late updates that force a more expensive control action.

### Follow-up reasoning
**Prompt:** What made position uncertainty the first condition to change even though none of the navigation displays was alarming?  
**Target answer:** Its margin was shrinking continuously toward an irreversible constrained-passage decision, while the other problems were currently stable, opening or carried larger measured time margins.

### Character use
This is Vance’s lesson: command chooses which uncertainty to live with. Rask, Sowande, Ferro, Haruki and Lindqvist should report in their own departmental language rather than collapsing into a narrator.

---

## Interactions I would *not* duplicate

- Keep M04 S3’s resonance interpretation concise after the player has already seen frequency response elsewhere; the numerical blade-pass comparison is enough.
- Keep M07 S2 and M12 S2 as short quantitative follow-ups. Their value is turning a measured rate into a deadline; a separate 3D minigame would add little.
- Keep M14 S2 as a compact decibel calculation after the refit interaction. It is a useful senior-level quantitative check.
- Keep M15 S3 as a final auditory/spectral reasoning question. The capstone interaction should not swallow every concept in the mission.

## Implementation principle

The player should leave Deep Watch feeling that submarine operations are an exercise in **systems thinking under uncertainty**: measurements have dependencies, every configuration change starts a clock somewhere else, a trend is more useful than a single number, and command is the act of choosing which uncertainty can be tolerated while somebody else works the rest.
