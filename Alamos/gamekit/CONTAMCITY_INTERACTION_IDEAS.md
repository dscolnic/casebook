# Riverton Contamination Response — FPS-Native Learning Interaction Ideas

## Purpose

This document is deliberately separate from `contamcity-surgical-pass.jsonl`. None of the interactions below have been implemented in that JSONL. The surgical pass changes only existing story, scientific wording, questions, answers, distractors, explanations, glossary material, and numerical reasoning while preserving the existing JSONL structure.

The next layer should make the player **learn by working the incident**, not merely walk through a 3D city to reach a question screen. The best interaction is one where the physical action itself contains the chemistry: collect the right evidence, change a variable, watch the response, decide what the response means, and then make an operational choice.

The characters should remain part of the interaction. Varga should react like Varga, Nakamura like Nakamura, Ferreira like Ferreira. Do not replace their personalities with generic tutorial voice.

## Design rules for Claude

1. **Do not convert every question into a minigame.** Keep concise reasoning screens where the concept is fundamentally conceptual. Use the 3D interactions where manipulating or observing something teaches the science better.
2. **The physical action must carry the scientific reasoning.** “Walk to three glowing consoles” is not an FPS-native learning interaction. Choosing a sampling depth, moving a calibration point, opening or closing a flow path, or changing a dose can be.
3. **Let evidence appear before the explanation.** The player should see the chromatogram, plume shift, titration curve, or temperature trend and make an inference before a character states the principle.
4. **Difficulty should come from judgment, not dexterity.** This should not become a twitch game. Missing a button by 0.3 seconds should never be what makes chemistry hard.
5. **Wrong actions should produce scientifically sensible consequences.** Sample only the water and the sediment reservoir remains invisible. Extrapolate the calibration and the reported concentration becomes biased. Dose base too aggressively and the pH overshoots.
6. **Keep the stakes attached to the work.** The action should be something Riverton genuinely needs that day: choosing an evacuation corridor, releasing a crew into a tunnel, reopening water, or preventing a runaway.
7. **Do not hide the answer in UI decoration.** No red cable that is obviously “the bad cable,” no green sampling point that is obviously “the right point,” no glowing correct valve.
8. **Prefer one memorable physical interaction per mission.** A few missions can support two linked interactions, but making all three scenes into separate minigames will slow the story.
9. **Use the characters as feedback, not answer dispensers.** Ferreira can challenge a water-only plan after the player proposes it; she should not tell the player “sample sediment” before they choose.
10. **Let later scenes remember consequential choices when practical.** If the player over-evacuates, under-samples, extrapolates a calibration, or catches a failure efficiently, later dialogue can acknowledge it without changing the core learning path.
11. **Show real instruments and field objects whenever possible.** Sorbent tubes, sample bottles, pumps, calibration standards, thermal cameras, corrosion coupons, flow meters and treatment vessels make the world feel like work rather than a quiz set.
12. **Use numbers in the environment.** Put readings on instrument panels, labels, maps and notebooks instead of always presenting all givens in a detached question card.

---

# Highest-priority conversions

If only eight FPS-native interactions are built first, I would build these.

## 1. M05 — Work the calibration curve and rescue the over-range sample

**Why this is probably the best conversion:** It is visual, quantitative, and directly teaches the difference between “the instrument gave a number” and “the method supports that number.”

**Interaction:** At Whitfield/Nakamura’s workstation, the player sees the calibration standards plotted as they are run. The river sample lands above the highest standard.

Give the player three actions:
- extrapolate the line,
- dilute the sample and rerun it,
- raise the detector range without recalibrating.

If the player extrapolates, the instrument should still happily display a concentration. Nothing should explode. Nakamura should ask one question: “Which standard demonstrated that part of the line?”

The player then chooses a dilution, reruns the sample, and watches it land inside the calibrated interval.

**Learning behavior:** The player experiences that an instrument can return a precise-looking invalid answer.

**Excellent follow-on:** Let the blank, spike recovery and replicate precision sit beside the curve so the player learns that different QC checks answer different failure modes.

---

## 2. M09 — Run the titration and control the neutralisation dose

**Why:** The distinction between pH and total acid demand becomes obvious when the player actually sees a buffer region.

**Interaction:** The player operates a burette or dosing pump on a representative intake sample. Each small addition of base updates the live pH trace.

Early additions barely move the pH. Then the curve turns sharply.

Do not label “buffer region” or “equivalence point” until the player has seen the shape.

After the bench run, move to the treatment-control panel. The player sets a staged full-scale dosing plan with:
- target starting dose,
- mixing interval,
- hold points,
- stop/overshoot trigger.

**Wrong-action feedback:** A one-shot aggressive dose overshoots in the pilot loop and Novák immediately points to the pipe-chemistry consequence.

**Learning behavior:** pH is a state measurement; titration measures demand; live treatment is a control problem.

---

## 3. M04 — Resolve an ambiguous chromatographic peak with a second measurement

**Why:** Identification is one of the strongest themes in the whole game and it should feel like analytical detective work.

**Interaction:** At Okonjo’s bench, show the chromatogram with the ambiguous peak. The player can click the peak and compare:
- retention-time candidates,
- mass spectrum,
- infrared spectrum or other orthogonal evidence,
- blank/reference data.

The player should be able to choose “report candidate A now,” “redevelop the separation,” or “run the orthogonal method.”

When the second method is run, the ambiguity should collapse because it asks a different physical question.

**Learning behavior:** One method narrows; independent evidence confirms.

**Do not:** Make the correct candidate glow once the spectrum is opened. The player should compare features.

---

## 4. M11 — Trace and break the corrosion circuit in the street excavation

**Why:** Corrosion is naturally spatial and physical.

**Interaction:** Put the player in the open pipeline excavation with Novák. The joint contains two metals, an electrolyte path and an electrical connection.

The player uses a handheld meter to identify:
- electrical continuity,
- potential difference,
- the likely anodic side,
- the cathodic side.

Then they physically choose a control: install an insulating break, patch the wall, change a coating, or propose water-chemistry correction.

**Best feedback:** If the player only patches the leak, Novák says some version of: “You repaired the hole. Show me what you repaired about the circuit.”

**Learning behavior:** Corrosion stops being “rust happens” and becomes an electrochemical system with a breakable path.

---

## 5. M12 — Follow 100 kg through the treatment plant

**Why:** Mass balance is ideal for a first-person plant interaction.

**Interaction:** A 100 kg test batch enters the pilot plant. The player walks the treatment line and reads or samples each outlet:
- treated water,
- sludge,
- off-gas,
- unresolved/byproduct stream.

As each stream is measured, a mass-balance board fills in.

The key moment is that the water looks dramatically cleaner long before the mass balance closes.

**Wrong-action feedback:** If the player reports “94% destroyed” from the water outlet alone, Delgado asks them to stand in front of the sludge hopper and say where the 71 kg went.

**Learning behavior:** removal from one phase is not destruction.

---

## 6. M02 — Redraw the plume corridor when the weather changes

**Why:** It makes the difference between gas-law scale and atmospheric transport tangible.

**Interaction:** At the mobile weather station, the player first computes/accepts the gas-law scale. Then they work on the city map.

The map has:
- wind direction,
- wind speed,
- terrain,
- stability/mixing indicator,
- neighborhoods and roads.

The wind turns. The player must redraw or rotate the operational corridor and decide whether a neighborhood should evacuate, shelter, or remain outside the immediate corridor.

**Important:** The gas-law calculation should not directly draw the hazard footprint. That separation is the lesson.

**Character use:** Varga should get irritated if the player quotes the equilibrium gas volume as though it were a plume radius.

---

## 7. M03 — Build the river sampling plan by physically allocating sample bottles

**Why:** Sampling design is hard to teach with a multiple-choice list because every option sounds useful. A finite inventory makes the trade-off real.

**Interaction:** Give the player a crate of exactly twenty laboratory sample slots. At the dock/map they allocate them among:
- upstream water,
- intake water,
- downstream water,
- suspended solids,
- sediment cores,
- repeats/QC,
- different times.

The interface should not tell them the optimum. It should show what questions their plan can and cannot answer.

**Best consequence:** A water-heavy plan comes back reassuring while Ferreira opens an unsampled sediment core from a later scripted check and asks whether the city actually tested the phase its own model predicted.

**Learning behavior:** Sampling is experimental design under a budget.

---

## 8. M07/M08 — Watch a vessel cross from stored heat into positive feedback

**Why:** Thermal runaway should be seen as a changing balance, not memorized as a definition.

**Interaction:** Use one continuous vessel console across the two missions.

In M07, the player watches temperature, heat flow and off-gas over time and distinguishes a cooling comparison bay from a self-heating bay.

In M08, they change operating temperature or concentration in a safe pilot simulation and watch heat generation rise relative to cooling capacity.

The key display should show two rates:
- heat generated,
- heat removed.

Runaway begins when the first persistently outruns the second.

**Learning behavior:** The player sees why temperature alone is not the diagnosis and why scale-up requires rate data.

---

# Mission-by-mission interaction ideas

## M01 — The Unknown Containers

### Best interaction: evidence-preserving sample workflow

At the freight yard, give the player a limited evidence kit and a damaged container.

Possible actions:
- photograph markings,
- scan/record surviving label fragments,
- collect headspace with a sorbent tube,
- take a small aliquot,
- commit aliquot to a destructive analysis.

The sample inventory visibly decreases as material is consumed.

The challenge is not to click the four actions in a memorized order. The player should understand what each action risks destroying or contaminating.

### Secondary interaction: build the provisional identity package

At Okonjo’s lab, the player places pieces of evidence into **supports**, **contradicts**, and **does not establish** areas for each candidate identity.

A shipping manifest should narrow the list without counting as chemical confirmation.

---

## M02 — The Vapor Cloud

### Best interaction: live weather map and corridor

Use the conversion described above.

### Secondary interaction: dense-gas low-point check

Let the player deploy portable monitors at street level, a trench, a basement entrance and an elevated point.

The observed pattern should depend on the scenario’s cloud density and weather. This teaches that “heavier than air” is a clue, not a universal trajectory rule.

---

## M03 — What Dissolved in the River?

### Best interaction: allocate the twenty-sample budget

Use the sampling-crate system described above.

### Secondary interaction: phase jars

At Ferreira’s bench, let the player see one river sample separated into water, suspended material and extracted sediment. An oily/nonpolar surrogate should visibly partition differently from a polar soluble surrogate.

This should be observational rather than a drag-and-drop vocabulary exercise.

---

## M04 — Identify the Unknowns

### Best interaction: chromatogram + orthogonal spectrum

Highest-value analytical interaction after M05.

### Secondary interaction: periodic-table hazard cabinet

Do not make this a periodic-table multiple-choice screen. Put sealed demo cards/containers for elemental sodium and caesium beside a periodic-table panel. The player inspects group position, electron-shell sketch and stored handling guidance before assigning the conservative water-exclusion plan.

Keep this as a short interaction; the analytical peak problem is the main event.

---

## M05 — The Concentration Problem

### Best interaction: calibration curve + dilution

Highest-priority conversion.

### Secondary interaction: place the thirty samples on the river map

Reuse the M03 sampling framework but now the constraint is different: the player must balance coverage with QC and decision relevance near the intake.

The same map behaving differently under a different scientific question is educational in itself.

---

## M06 — A Reaction Underground

### Best interaction: build the reaction bound before entry

At the tunnel command post, the player receives measured amounts of A and B and the candidate balanced reaction. They use a field board to determine the limiting reactant and maximum gas/heat scale.

Then place that bound next to Oyelaran’s ventilation/oxygen information.

The important part is that the calculation becomes an **entry decision**, not an isolated stoichiometry worksheet.

### Secondary interaction: gas monitor pole

Let the player lower a remote sensor to several depths before any person enters. Readings can differ with depth. The player learns why the hatch reading alone is insufficient.

---

## M07 — The Heat Is Rising

### Best interaction: compare two thermal histories

Give the player two bays with live trend screens, not just current temperatures.

Let them:
- inspect current temperature,
- rewind the last several hours,
- compare heat-flow/off-gas,
- check calibration,
- inspect hot-spot location.

The answer should emerge from the pattern.

### Secondary interaction: set the unattended monitoring trigger

Before leaving the site, the player must set an alarm threshold based on **rate of rise** and/or absolute temperature.

A too-late trigger should be visibly risky in a forecast trace.

---

## M08 — Will the Reaction Run Away?

### Best interaction: safe-envelope pilot console

Let the player run short simulated/pilot tests at several temperatures. The measured reaction-rate points build a curve.

On the same display, show cooling capacity.

The player draws or accepts an operating region only after enough data cover the expected temperature range.

### Failure feedback

Extrapolating a room-temperature rate straight to a hot full-scale vessel should generate a visibly wrong forecast.

---

## M09 — The Water Changes pH

### Best interaction: titration + staged dosing

Highest-priority conversion.

### Secondary interaction: compare starting pH with titration demand

After the titration, put two cards/values on the physical control-room whiteboard:
- free H+ from starting pH,
- total base demand from titration.

Reyes can ask why the numbers differ rather than explain it.

---

## M10 — Equilibrium in the Reservoir

### Best interaction: change reservoir chemistry and watch phase distribution

At an equilibrium-model terminal, the player changes one variable at a time:
- pH,
- ligand level,
- ionic strength.

A paired display shows dissolved metal and solid-bound metal.

The physical world can reinforce the model with a sample rack from “today,” “storm runoff,” and “acidic inflow” conditions.

### Secondary interaction: freezing-point check

At the holding pond, give the player a hydrometer/salinity result and the salt concentration. Let them make the short freezing-point estimate, then compare it with the actual pond temperature.

This works better as a quick field calculation than a full minigame.

---

## M11 — The Corrosion Failure

### Best interaction: trace and break the electrochemical circuit

Highest-priority conversion.

### Secondary interaction: thickness gauge

Let the player use an ultrasonic thickness tool around the pipe.

The map of wall thickness should show that average uniform loss is far too slow to explain the local perforation.

This turns the corrected 0.063 mm/year calculation into a physical diagnostic: the average is not the mechanism of the failure.

---

## M12 — Remove It Without Making It Worse

### Best interaction: mass balance through the pilot plant

Highest-priority conversion.

### Secondary interaction: physically order the treatment line

Let the player route a pilot stream through available unit operations using valves or a process-flow board.

Wrong order should have real process consequences:
- filtering before precipitation removes almost nothing,
- sending solids into a polishing bed fouls it,
- applying the wrong chemistry leaves the metal soluble.

Do not make it a generic card-order puzzle if the 3D treatment plant can show the actual pipes.

---

## M13 — The Air Is Not Clear Yet

### Best interaction: move the monitoring van through a day

The fixed fence monitors show the primary compound falling. The mobile van can be placed at several downwind locations and different times.

The player should discover that the secondary signal:
- is weak at the fence,
- strengthens downwind,
- peaks in the afternoon,
- falls overnight.

Overlay sunlight/oxidant/weather only after the player has acquired some of the pattern.

**Learning behavior:** Secondary formation is inferred from coordinated time, location and chemistry.

### Secondary interaction: choose analytes for the monitor

Use an instrument-method menu where adding secondary compounds has a real cost in run time or channels. The player cannot simply select “everything.”

---

## M14 — Can the Water Be Released?

### Best interaction: build the release evidence map

Put the distribution system on a city map. The player sees which locations have:
- valid samples,
- over-flushed samples,
- detection limits above the release criterion,
- independent confirmation,
- no data.

They must identify the evidence gaps before making the release recommendation.

### Secondary interaction: uncertainty slider / decision-rule visualization

Show the result 9 ± 2 against the limit of 10 as a distribution or interval. Then let the player switch between prewritten decision rules to see how the operational recommendation changes.

The lesson should be that the rule is chosen **before** seeing the result.

---

## M15 — Reopen the City

### Best interaction: assemble the final evidence wall

Instead of one final quiz screen, give Mbeki and the player a physical/visual evidence wall with claims such as:
- identity,
- current drinking-water exposure,
- sediment reservoir,
- secondary air product,
- corrosion control,
- treatment performance.

For each claim, the player assigns:
- established,
- conditional,
- provisional/open.

Each claim expands to show the supporting measurements and shared dependencies.

Haddad can challenge any claim whose apparently independent evidence actually shares one failure mode.

### Secondary interaction: Faraday audit at the polishing cell

Let the player read the current and run time directly from the cell, calculate the theoretical maximum deposited metal, then compare it with:
- measured mass on the electrode,
- drop in water concentration.

If the three disagree beyond plausible efficiency, the player has found an accounting problem.

### Ending interaction: fund the legacy

Put a limited post-emergency budget on Stavros’s desk. The player allocates it among monitoring, infrastructure, records and other needs.

Do not make this a fake “one right budget.” The learning goal is to force the player to identify which program detects environmental remobilisation, while the dialogue makes clear that records and corrosion controls are also legitimate responsibilities funded through different lines.

---

# Character-specific interaction guidance

## Okonjo
She should almost never say “the answer is X.” Her personality is strongest when she asks what observation could have produced the same result if the proposed identity were wrong.

## Varga
Keep the irritation with false precision. If the player quotes a model to three significant figures, that is a perfect place for a character reaction.

## Ferreira
Her best role is to ask, “Which phase did you actually sample?” A water-only success should never make her generically angry; it should make her very specifically interested in the missing phase.

## Nakamura
Do not turn her into the person who always says no. She should distinguish a valid result from a result that cannot support *this* decision. Let her approve strong measurements quickly and become difficult only where the evidence deserves it.

## Osei
He should think in transfers, waste streams and operational consequences. His personality is strongest when he agrees that a treatment “worked” and then asks where the material went.

## Brandt and Moreau
Brandt should focus on bounding heat and consequences; Moreau on the rate law and how temperature changes it. Avoid making them interchangeable thermal experts.

## Novák
Keep her practical. She cares about the circuit because she is tired of fixing the same physical failure, not because she wants to deliver an electrochemistry lecture.

## Stavros
Her dramatic function is memory. Everyone else solves today; she asks what the river will do next season. Preserve that contrast in the final missions.

## Mbeki
Use him to force translation. After a technical result, have him ask for the version that can survive being repeated by the mayor or a resident without changing meaning.

---

# Implementation priority by effort

## Relatively low effort / high value
1. M05 calibration curve and dilution
2. M09 titration curve
3. M11 thickness-gauge map
4. M14 uncertainty/decision-rule visualization
5. M15 Faraday audit
6. M07 thermal trend comparison

## Medium effort / very high value
1. M03 finite sample-allocation map
2. M04 chromatogram + second-method workstation
3. M12 treatment mass-balance board
4. M13 mobile-monitoring route
5. M08 safe-envelope rate curve

## Higher 3D/world effort
1. M02 dynamic plume corridor over the city
2. M11 physical corrosion excavation and circuit tracing
3. M12 valve-routed treatment train
4. M01 evidence-preserving container sampling workflow

---

# What I would *not* convert

Some existing reasoning screens should remain screens.

- M06’s limiting-reactant calculation is short enough that turning it into a elaborate physical puzzle would add friction rather than understanding.
- M10’s equilibrium matching can stay concise if the variable-manipulation model is built elsewhere in the mission.
- M14’s verification-gap matching is cognitively useful and may work better as a board/map than as a walk-to-four-locations sequence.
- M15’s claim-by-claim disposition should feel like synthesis, not a dexterity task.

The goal is not to eliminate questions. It is to make the **most visual and causal chemistry impossible to experience as only multiple choice**.
