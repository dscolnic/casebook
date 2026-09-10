**FIRST PERSON LEARNING**

**Editorial revision:** Character profiles, evidence-driven scenes and biography checks; 2026-09-09. All prior copy and opening-quote fixes retained.

**Player-copy editing rule:** Raise a blocking `REPETITION_FLAG` for unresolved duplicated meaning within a displayed passage, including paraphrases, repeated formulas/definitions and concatenated setup/source copy. Review candidate matches semantically and document any separate-surface exception. Apply REP-001–REP-005 in Giant Gate v2.8.  Within each displayed passage, state each fact, equation, variable definition, and instruction once. Integrate new givens into the existing wording; do not append a paraphrase of the setup. A source panel may repeat essential inputs so it stands alone, but render it as its own surface rather than concatenating it with the question setup. Go Deeper questions must still supply their own context and data without referring to earlier cases.

**RED SAND: FULL TANK**

AP Chemistry Campaign Implementation Bible

**15 missions \| 60 graded stops \| Mars \| Implementation-ready**

**REVISION - HANDBACK 1: SCENES, PERSISTENT WORLD, AND WALKABLE ENDINGS**

## AP Chemistry Campaign Implementation Bible

**Project:** First Person Learning

**World:** Arcadia Rise propellant plant, Mars

**Player role:** Newly assigned Propellant Lead

**Campaign size:** 15 missions, 60 graded stops, 1 final launch
commitment

**Audience:** AP Chemistry students

**Primary implementation target:** books/redsand.yml plus existing Red
Sand theme assets

**Status:** Buildable implementation specification; all 60 stops carry player copy, grading truth, answer text, and complete interaction data

> *The design test: if the chemistry is removed, the mystery cannot be
> solved. If the story is removed, the student still completes a
> cumulative AP Chemistry review in which early ideas become tools for
> later decisions.*

## 1. One-page implementation brief

The Arcadia Rise plant must fill a methane-and-oxygen ascent vehicle
before a fixed launch window. Production is behind. The crew's first
explanation is a methane leak; the evidence eventually proves there is
no major leak, only too little hydrogen reaching the Sabatier reactor. A
reactor engineer then appears to have caused the shortfall by lowering a
temperature set point, but a withheld thermal record proves the change
prevented a runaway. When production finally catches up, an independent
assay shows that one methane batch is full by mass and pressure but
outside the campaign's fictional flight specification. The player must
combine stoichiometry, gases, molecular structure, solutions,
spectroscopy, thermochemistry, kinetics, equilibrium, acids and bases,
redox, and electrochemistry to choose a safe recovery plan and authorize
launch.

Implementation is deliberately linear at the story level. A wrong answer
teaches, retries, and then permits progress; it does not create a dead
campaign branch. Player decisions change dialogue, trust, and optional
acknowledgements, but the evidence sequence remains stable so every
student reaches the three scientific reversals.

### Non-negotiable engine rules

- Import with node tools/import-book.mjs books/redsand.yml redsand
  --verify.

- Every lesson carries exactly one canonical format from
  engine/content/normalize.js.

- Do not use suspended STACK.

- Placement follows stop kind: decision formats at one named person, calculation
  formats at a room/bench/board, operated formats at the fixture being
  controlled. Every placement names exactly one declared fixture id in backticks.

- Every stop carries `Area:` in Metadata. Area is the area of study that owns
  the lesson, not necessarily the physical place where the player stands.

- Every stop carries `Call - exact player copy:`. Person calls name the one
  person the player walks up to and the fixture beside them; fixture calls name
  the destination fixture and place.

- Every beat fires from exactly one authored trigger: `On arrival at <PLACE>`,
  `After Stop N` / `After Stops N and M`, or `At mission end`. A fictional
  travel beat is authored as the arrival or stop-close event that actually
  fires it.

- Every beat authors a one-sentence world change, panel/HUD text, dialogue, and
  unlocks; add a waypoint field whenever the beat names a new destination.

- `Correct result` is grading truth. `Answer text` is player-facing verdict
  copy and must not repeat the correct-result string.

- Every question setup is exactly two short sentences totaling 30-45 words. Put teaching in the story-science connection, answerText, why, and wrong-answer feedback; question-card guide/background/takeaway fields are forbidden.

- For CHOICE, include four choices, the correct label verbatim in
  answer, and one rebuttal for each wrong choice.

- Keep the campaign opener to five sentences. Each mission briefing body is four sentences and 30-70 words; sentence four begins “By the end of the mission”.

- Grade by the authored answer logic, never by prose similarity.

- Preserve one typed challenge per lesson and end-to-end gradeability.

- Use takesAsRead when a later stop relies on a previously established
  concept.

- All launch specifications and operating limits in this book are
  fictional game values, not real flight guidance.

## 2. Campaign promise, clock, and player experience

### Opening sequence - no movie required, maximum five sentences

You are the fuel plant lead, which means you must make clean fuel for the crew to leave Mars. At Arcadia Rise, you will use chemistry to make the call. Fifteen work shifts remain before launch. The plant turns air and ice into fuel; if it cannot finish safely, the crew misses its ride home. Commander Laila Abiola gives you the plant key and says, “Tell me what you need to get this crew off the planet.”

**Opening-card requirement:** The character quote is the final player-visible text on this card; place no explanatory sentence after it. Keep it brief and natural: it should add the speaker’s concern or commitment rather than summarize the preceding setup. Show the whole opening together with one Continue action.


**Delivery:** Show all five opening sentences together on one
full-screen text card over the normal Plant Control view. The player
dismisses the card once with Continue; the sentences do not advance
individually. When the card clears, reveal the four-bar HUD at its
starting values and activate the Mission 1 briefing icon. Do not state
the 18% shortfall separately; the 82% Flight-Ready Methane bar
communicates it.

### Concrete stakes

The ascent vehicle must be certified at dawn after Mission 15. Missing
the window strands the surface crew until the next launch opportunity
and exhausts habitat reserves planned for the handover. A rushed launch
with contaminated propellant risks an engine shutdown during ascent. The
player is never asked to care about an arbitrary score; the visible
consequences are time, heat, water, electrical power, propellant
quality, and crew trust.

### Three major reversals

1.  **Twist 1 - The leak that was not:** Carbon has not vanished.
    Hydrogen delivery is deficient, so the reactor never made the
    reported methane.

2.  **Twist 2 - The saboteur who was not:** Tomás Herrera changed the
    reactor temperature, but he did it to stop a developing thermal
    runaway.

3.  **Twist 3 - Full is not ready:** The tanks reach target mass and
    pressure, but Batch C contains too much carbon dioxide and water for
    the game's flight specification.

### Four campaign metrics and recovery economy

These are the only four player-facing campaign bars. Every bar runs from
0% to 100%. The opening HUD reveals the starting values; the prose
opener does not separately announce the methane shortfall.

| Metric               | Start | What the bar means                                                                                              |
|----------------------|-------|-----------------------------------------------------------------------------------------------------------------|
| Flight-Ready Methane | 80%   | Usable methane that currently counts toward launch. It may reach 100 before certification and still fall later. |
| Ascent Oxygen        | 90%   | Stored oxygen available for ascent. It becomes permanently locked at 100 after Mission 13 verification.         |
| Power Reserve        | 70%   | Electrical margin above protected habitat loads. Tests, cooling, purification, and electrolysis can lower it.   |
| Plant Integrity      | 70%   | Thermal and mechanical safety margin for the reactor and supporting plant. It can lock at 100 after Mission 10. |

### Timer and Recovery Points

Each mission has a visible timer and target. It begins when the arrival
beat closes and the first stop becomes active. It runs during questions
and player-controlled movement. It pauses during required bubbles,
loading, app backgrounding, accessibility menus, and system
interruptions.

RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions). The time
modifier is +1 at or before target, 0 through 125% of target, and -2
beyond 125%. A committed wrong answer costs one point; exploratory
actions before Commit do not.

One RP raises one unlocked bar by one percentage point. The player may
bank up to 30 RP. A replay grants only the improvement over the prior
award.

State keys: flight_ready_methane; ascent_oxygen; power_reserve;
plant_integrity.

### Resolution order, locks, and failure

After the outcome beat, apply the named story-event deltas, check for a
0% bar, award RP, open allocation, show the concept review, and then
issue the next briefing. If any bar reaches 0%, show MISSION FAILED -
\[METRIC\] COLLAPSED and restore the mission-start snapshot.

A bar at 100% can still fall unless it has a lock icon. Plant Integrity
may lock at 100% after Mission 10; Ascent Oxygen may lock at 100% after
Mission 13. Methane reaches 100% in Mission 12 without locking and falls
after the Mission 14 assay. Power may also reach 100% and fall. Methane
and Power lock only at final victory.

Mission 13 crisis floor: if Power Reserve is below 40% before
electrolysis startup, the startup collapses the bus and sets Power
Reserve to 0%. Final hold: Mission 15 launches only at 100 / 100 / 100 /
100; otherwise show NO-GO - RECOVERY INCOMPLETE.

Hidden evidence flags and character-trust variables may still control
dialogue, but they are not campaign metrics and cannot cause game over.

## 3. World and location plan
The site is a process diagram made walkable: Martian atmosphere and ice
enter at the north/west, water becomes hydrogen and oxygen, hydrogen
crosses to the reactor and catalyst, product gas moves through the cold
end, and liquid propellant reaches the tank farm and ascent vehicle.
Travel is never filler; each move follows the molecule or the evidence.

### Areas of study

The campaign has six areas of study. An area of study owns the lesson's subject matter; it is not necessarily the place where the player stands. The six areas are **Plant Control**, **Reactor Hall**, **Catalyst Bay**, **Cold End**, **Water Plant**, and **Electrolysis Hall**. Every stop names exactly one of these in `Area:` even when the stop is asked at a non-area room such as the Atmosphere Intake, Ice Cut, Tank Farm, Assay Lab, Array Shed, Battery Bank, or Pad Office.

| **ID** | **Place** | **Area of study?** | **Story/chemistry function** |
|---|---|---|---|
| GIBBS | Plant Control | yes | Ledgers, foundational counting, evidence synthesis, and command decisions |
| INTAKE | Atmosphere Intake | no | CO2 feed, compression, and gas sampling |
| HSTORE | Hydrogen Store | no | H2 mass, pressure, composition, and delivery |
| KINET | Catalyst Bay | yes | Kinetics, catalyst behavior, mechanisms, and spatial catalyst diagnosis |
| SOIL | Water Plant | yes | Solutions, spectroscopy, treatment, and acid-base chemistry |
| CUT | Ice Cut | no | Raw water source and independent field evidence |
| EQUIL | Reactor Hall | yes | Stoichiometry, gases, thermochemistry, and equilibrium |
| PHASE | Cold End | yes | Molecular structure, intermolecular forces, phase behavior, and separation |
| ELEC | Electrolysis Hall | yes | Coupled systems, redox, electrochemistry, and power-to-product reasoning |
| ASSAY | Assay Lab | no | Independent standards, assays, and launch-quality evidence |
| ARRAY | Array Shed | no | Solar generation and available electrical current |
| BATT | Battery Bank | no | Stored energy and protected reserve |
| TANKS | Tank Farm | no | Pressure, mass, composition, and loading |
| PAD | Pad Office | no | Launch authority and final commitment |

### Fixture declarations

Every fixture named by a stop is declared here. New fixtures are intentional design requirements, not substitutions for whatever object already exists in the room. `Kind` is one of `vessel`, `rack`, `bench`, or `board`; `What it is` is the player-facing caption the build should use.

| Place | Fixture | Kind | What it is |
|---|---|---|---|
| Plant Control | `chronology-wall` | board | A five-event chronology rail for locking the physical order of the reactor incident. |
| Plant Control | `conversion-board` | board | Tank mass on the left, particle count on the right, and a blank unit path between them. |
| Plant Control | `evidence-board` | board | Raw carbon, gas, water, pressure, and calibration evidence arranged without dashboard summaries. |
| Plant Control | `final-recovery-board` | board | The final recovery plans with time, power, amount, thermal, and composition consequences. |
| Plant Control | `ledger` | bench | Carbon entering, carbon accounted for, and a magnet marked DO NOT EXPLAIN YET. |
| Plant Control | `loadboard` | board | The four campaign loads and their current margins, shown together for allocation decisions. |
| Plant Control | `operating-point-board` | board | Temperature and pressure controls overlaid with rate, equilibrium-yield, and thermal constraints. |
| Plant Control | `rate-board` | board | Initial-rate trials and a blank rate-law line for comparing concentration changes. |
| Plant Control | `sample-tray` | bench | Four sealed sample cards waiting to be classified before the ledger can be trusted. |
| Plant Control | `verification-panel` | board | Independent access, controller, and temperature records shown side by side for action verification. |
| Atmosphere Intake | `compressor-log-desk` | bench | The hand-checked compressor log with captured carbon dioxide and the current methane target. |
| Atmosphere Intake | `compressors` | vessel | The intake compressor platform with the live capture log and overdrive control. |
| Atmosphere Intake | `intake-bypass-manifold` | vessel | The hydrogen-release manifold dividing a finite supply among production, diagnosis, and restart reserve. |
| Atmosphere Intake | `intake-calculation-board` | board | A mass-to-methane conversion path beside the full-shift carbon-dioxide capture record. |
| Hydrogen Store | `gas-sampling-ports` | rack | Four sampling ports from tank to reactor branch, each with room for an observed and expected composition. |
| Hydrogen Store | `hydrogen-calculation-desk` | bench | Pressure, volume, temperature, and gas-constant values laid out for the total-mole calculation. |
| Hydrogen Store | `jacket-heater-logger` | vessel | A sealed branch with a jacket heater, temperature control, pressure logger, and composition tap. |
| Hydrogen Store | `store-scales` | bench | Storage mass and pressure readings beside the line that feeds the reactor. |
| Catalyst Bay | `bed` | vessel | The catalyst bed housing, with inlet and outlet access and a visible flow direction. |
| Catalyst Bay | `bed-log` | board | The catalyst-bed mechanism rail and operating log, including free sites and surface intermediates. |
| Catalyst Bay | `bed-ports` | rack | Four axial catalyst-bed ports from inlet to outlet for temperature, conversion, halide, and activity readings. |
| Catalyst Bay | `charge-bench` | bench | Molecular and catalyst charge models arranged for structure and catalyst questions. |
| Catalyst Bay | `model-rail-desk` | bench | Property cards for matching molecular shape, polarity, and dominant intermolecular force. |
| Catalyst Bay | `molecular-model-rail` | rack | Three-dimensional molecular models that can be ordered from Lewis structure through polarity. |
| Catalyst Bay | `separation-cartridge` | vessel | A temperature-controlled cartridge that shows which substances pass, remain, or condense. |
| Water Plant | `brinetank` | vessel | The recycle-water tank with measured acid, base-addition control, and pH probe. |
| Water Plant | `columns` | vessel | The treatment columns for particles, dissolved ions, and other water-cleanup steps. |
| Water Plant | `hopper` | vessel | The raw-water hopper receiving ice and brine before treatment. |
| Water Plant | `spectrophotometer` | vessel | A wavelength-controlled spectrophotometer with a sealed standard and an unknown-sample slot. |
| Water Plant | `water-assay-desk` | bench | Mass, molar mass, and sample volume values for putting the recycle sample on a molar scale. |
| Water Plant | `water-report` | board | The recycle-water report separating concentration from total amount. |
| Ice Cut | `excavation-face` | vessel | The exposed ice-and-regolith face where the plant's raw water source is collected. |
| Ice Cut | `process-map` | board | A site-wide material map linking ice, water treatment, electrolysis, the reactor, and water return. |
| Ice Cut | `rover-sampler` | rack | The rover field sampler holding an independent source vial, blank, and calibration standard. |
| Reactor Hall | `analyser` | board | The reactor analyser used to freeze models, reveal holdout runs, and compare predicted behavior. |
| Reactor Hall | `bed-head` | vessel | The reactor-bed head where inlet conditions and thermal gradients are first visible. |
| Reactor Hall | `equil-stub` | board | The equilibrium board with Q on one side, K on the other, and the gap between them. |
| Reactor Hall | `heat-model-board` | board | A heating-and-phase-change rail used to reconstruct when thermal signals should arrive. |
| Reactor Hall | `ice-board` | board | An ICE table for the Sabatier gases with linked stoichiometric changes and an equilibrium row. |
| Reactor Hall | `reactor-calculation-bench` | bench | Coolant mass, heat capacity, and temperature-rise data laid out for the heat-removal calculation. |
| Reactor Hall | `reactor-console` | board | The reactor console with the operating point, sensor-bias control, and thermal safety limit. |
| Reactor Hall | `residual-field` | board | A residual field comparing observed and predicted inlet temperatures across normal and low-radiator runs. |
| Reactor Hall | `skid` | vessel | The Sabatier reactor skid with temperature, pressure, feed, and coolant controls. |
| Cold End | `coldline` | vessel | The cold product line where water removal and phase behavior affect methane recovery. |
| Cold End | `coldline-tap` | vessel | A controlled cold-line tap for removing product water and restoring the original condition. |
| Cold End | `fridge` | vessel | The refrigeration stage that keeps separated product inside the required temperature range. |
| Cold End | `phase-radiator` | vessel | The radiator-side heat ledger showing coolant removal, storage, carried heat, and accumulation. |
| Electrolysis Hall | `cell-diagram` | board | A cell diagram showing the cathode, anode, electron path, ion path, and gas outlets. |
| Electrolysis Hall | `stack` | vessel | The electrolyzer stack that splits treated water into hydrogen and oxygen. |
| Electrolysis Hall | `stack-accounting-panel` | board | The whole-plant hydrogen ledger beside the electrolyzer stack and recycle-water input. |
| Electrolysis Hall | `stack-power-controller` | board | The dust-limited recovery power controller with protected loads and the electrolysis allocation. |
| Electrolysis Hall | `stack-sheet` | board | The timed current, efficiency, Faraday constant, and hydrogen-yield calculation sheet. |
| Electrolysis Hall | `volt-sheet` | board | The stack voltage and current sheet used to connect electrical input with chemical output. |
| Assay Lab | `assay-review-board` | board | The Batch C review board combining amount, pressure, contaminant, dryer, and calibration evidence. |
| Assay Lab | `spec-bench` | bench | The independent specification bench with sealed standards and composition assays. |
| Array Shed | `array-controller` | board | The live solar-array controller showing dust-limited generation and available electrical power. |
| Battery Bank | `cell-stacks` | rack | The battery cell stacks with the protected reserve floor and a diagram of the external circuit. |
| Tank Farm | `casebook-board` | board | A casebook board for matching earlier clues to the meanings supported by later evidence. |
| Tank Farm | `farm-gauges` | board | Tank pressure, mass, composition, and loading status shown at the farm gauges. |
| Tank Farm | `tank-calculation-station` | bench | The final plan-comparison station for certified methane, processing loss, pressure, and thermal limits. |
| Tank Farm | `umbilical` | vessel | The loading umbilical carrying conditioned propellant toward the ascent vehicle. |
| Pad Office | `certification-console` | board | The launch certification console with fixed acceptance rules and the final GO / NO-GO panel. |
| Pad Office | `recovery-allocation-board` | board | A 100-point recovery allocation board beside Commander Abiola's final decision position. |

### Location escalation

| **Missions** | **Places per mission** | **Travel rule**                                                  |
|--------------|------------------------|------------------------------------------------------------------|
| 1-4          | 1                      | Local investigation; no distant travel                           |
| 5-10         | 2                      | Evidence at the first place creates the need to visit the second |
| 11-15        | 3                      | The player crosses connected subsystems and synthesizes evidence |

The Ice Cut is locked until Mission 5. The ascent vehicle remains
scenery until Mission 14 and becomes interactable only after the Mission
15 final commitment.


### Landmark-only spaces and visible scene objects

These spaces are walkable and ungraded. They never add a required tour, question, or travel cost. Their access follows existing mission access; final routes open only after the completion gate below. Each object remains inspectable after its trigger.

| Space ID | Place | Before | Visible change |
|---|---|---|---|
| `habitat-mess` | Habitat Mess | Family photos stand behind mugs strapped to the table. | After Stop 24, a repaired-feed notice replaces the leak watch; after Stop 56, packed bags wait under HOLD. |
| `suit-locker` | Suit Locker | Empty boots line up under crew names. | After Stop 52, suit checks fill the tags; on final GO the crew takes the suits to the pad. |
| `pad-walk` | Pad Walk | A dark ascent vehicle stands beyond a locked crew gate. | Tank amount follows the existing methane and oxygen bars; after Stop 56 the board reads HOLD, and final GO opens the gate and lights the vehicle. |

### Persistent prop and scene contract

The crew-gate latch, countdown, and ascent-vehicle lights are scene components of `certification-console`. They share its GO/HOLD state; no separate success flag can bypass it.

Each mission below declares one Physical aftermath with a home in the existing fixture table. Its dated prop occupies its own place on that fixture; later pages never erase earlier evidence. All scene actions fire once from the accepted stop, persist through revisits, and restore from the mission-start snapshot on failure. Replaying a completed stop never repeats an action or grants resources. Labels always include text, not color alone. New observations remain hidden until the relevant measurement; accepted-answer labels appear only after acceptance. No prop change substitutes for the existing grading, timing, or evidence checks.

NO-GO is a supported hold scene whenever any existing amount, assay, thermal, power, or integrity condition is missing or fails. The crew gate stays closed and the countdown reads HOLD with an exact reason: FUEL ASSAY NOT PASSED; OXYGEN INCOMPLETE; POWER RESERVE INCOMPLETE; PLANT INTEGRITY INCOMPLETE; or RECOVERY INCOMPLETE, shown for every failing condition. Hold card: “The crew leaves its bags by the door. The pad stays dark, and the board says HOLD with the failed check beneath it. No one boards on a fuel gauge alone.” It is not launch victory; existing recovery remains available. FULL at M13 is an amount milestone, not certification. No amount bar is filled by scene animation. Final GO additionally requires all four existing bars at 100.

## 4. Character bible

### Profile and scene delivery contract

The compact material below is a designer reference. The individual Character ID entries are the authoritative full profiles; reference rows and headings are not additional people. Render only the explicitly labeled bio fields in the optional roster. Wants, blind spots and future arc descriptions are designer-only. Keep the existing names, role aliases and division assignments; the explicit profiles add ownership and scene bindings without changing any person-stop owner.

Each character has an entrance/evidence encounter, a required evidence-triggered turn and a later demonstrated change, embedded at the relevant mission stops below. These scenes are part of the story route, not prerequisites added by the roster. Opening handovers and established entrances play once. When an existing beat already supplies the same action or sentence at that trigger, render that action or sentence once and use this exact reaction as its character component; retain all distinct travel, science and outcome content. Sequence multiple scenes by their order in the chapter. Do not concatenate setup/source panels or duplicate the accepted answer in dialogue.

All physical actions use the existing fixture and its records. A radio speaker can direct the player’s visible record handling; no new carried item, prop, fixture, resource or measurement is implied. Preserve original lock and release conditions, including partial clearance and no-go endings. The roster can be skipped in full with no effect on progress. The three greeting variants are state-selected optional conversations, not an automatic speech queue.

### Compact designer reference

**Commander Laila Abiola - mission authority**

First entrance: Plant Control, already cancelling a nonessential rover
trip as the four mission bars appear.

**Wants:** A defensible launch decision before the window.

**Blind spot:** Treats converging dashboard numbers as independent
evidence.

**Gameplay use:** Delivers stakes, receives high-level diagnoses, and
forces commitments. CHOICE, CASEBOOK, VALUE, SCIENCETANK, and final
DIAGNOSIS can be asked at her.

**Arc:** Begins by demanding production; ends by demanding proof of
composition. She changes because the player shows that "green" channels
can share one bad dependency.

**Ingrid Sundqvist - production and catalyst lead**

**First entrance:** Atmosphere Intake, scraping frost from a compressor
sight glass herself.

**Wants:** Recover lost kilograms every remaining shift.

**Blind spot:** Rate is the first explanation she reaches for, even when
yield or quality is binding.

**Gameplay use:** Teaches stoichiometric throughput, rate law, catalyst
behavior, and operational urgency. She pushes aggressive options that
are scientifically tempting, never foolish.

**Arc:** Accuses Herrera because his override cut output; later becomes
the person who helps validate his safer high-pressure/lower-temperature
plan.

**Dr. Tomás Herrera - reactor and safety engineer**

**First entrance:** Hydrogen Store, quietly asking for the raw sensor
timestamps while others argue about a leak.

**Wants:** Keep the Sabatier loop inside a tested thermal envelope.

**Blind spot:** Withholds incomplete safety evidence because he fears
command will overreact; that secrecy makes him look guilty.

**Gameplay use:** Equilibrium, calorimetry, mechanisms, controlled
experiments, and the human mystery.

**Arc:** Apparent saboteur in Missions 7-9; vindicated by the player's
holdout and stress tests in Mission 10; openly collaborates thereafter.

**Mei-Ling Cho - water and cryogenics engineer**

**First entrance:** Catalyst Bay, refusing to accept a residue sample
with a broken chain of custody.

**Wants:** Keep water and carbon dioxide out of equipment that becomes
dangerously cold.

**Blind spot:** Trusts physical separation models more than messy
maintenance history.

**Gameplay use:** Molecular geometry, polarity, intermolecular forces,
phase behavior, brines, and the water recycle loop.

**Arc:** Starts as the skeptic who disproves the false leak path; later
accepts that her cold-end analyzer and the control-room estimate share
the same calibration source.

**Rosalind Achebe - PHASE analytical and electrochemistry lead**

**First entrance:** Water Plant, carrying a sealed standard instead of
trusting the wall meter.

**Wants:** Make every important number traceable to a physical standard.

**Blind spot:** Can slow decisions by asking for perfect evidence when
sufficient evidence would do.

**Gameplay use:** Molarity, Beer-Lambert law, acid/base tests, redox,
Faraday's law, assays, thresholds.

**Arc:** Her insistence on an independent sample causes Twist 3 and
saves the launch from a false-ready state.

**Yusuf Demir - power and life-support officer**

**First entrance:** Reactor Hall, opening the habitat reserve breaker
log while everyone else discusses reactor output.

**Wants:** Protect the crew's heat, air, and water while supplying the
plant.

**Blind spot:** Frames every choice as scarcity, sometimes
underestimating how recycling can change the budget.

**Gameplay use:** Energy ledgers, electrolysis allocation, coupled
systems, and irreversible trade-offs.

**Arc:** Moves from opposing extra production power to designing the
timed power diversion that makes the final recovery possible.

**Minor voices**

Use no more than one minor voice in a scene: a rover operator at the Ice
Cut, a maintenance technician in Catalyst Bay, a pad controller, and a
habitat medic. They provide observations or consequences, not new
subplots. Never introduce a named person only to ask one school
question.

### Relationship evidence map

| People | Planted commitment | Evidence-driven turn | Later changed practice |
|---|---|---|---|
| Ingrid Sundqvist / Dr. Tomás Herrera | `mars-ingrid-entrance`: “I need an explanation for lost output that the production crew can test.” | Stop 40, `mars-ingrid-turn` | Stop 44, `mars-ingrid-payoff` |
| Commander Laila Abiola / Rosalind Achebe | `mars-abiola-entrance`: “Tell me which measurement could stop a launch even if the tank looks full.” | Stop 53, `mars-abiola-turn` | Stop 60, `mars-abiola-payoff` |
| Yusuf Demir / Mei-Ling Cho | `mars-yusuf-entrance`: “Show me what the recycle loop can return before I promise more habitat power.” | Stop 48, `mars-yusuf-turn` | Stop 52, `mars-yusuf-payoff` |

### Commander Laila Abiola

- **Character ID:** `person-commander-laila-abiola`
- **Display name:** Commander Laila Abiola
- **Role:** mission commander
- **Pronouns:** she/her
- **Allowed short name:** Abiola
- **Area ownership:** Plant Control; Tank Farm; Pad Office. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Cancels a nonessential rover trip and hands the player the plant key at arrival. The existing opening card supplies this entrance; the mission encounter below continues it without replaying the handover. Binding: `mars-abiola-entrance`, On arrival at Plant Control during Mission 1, when Stop 1 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `sample-tray`.
- **Wants and personal stake:** She must bring the crew home while protecting the resources they need if launch is delayed.
- **Blind spot:** Several green dashboard channels can feel like independent confirmation.
- **Scientific domain:** launch authority and independent readiness evidence.
- **Decision function:** Supplies the launch authority and independent readiness evidence constraint to the existing decisions at Stops 53 and 60; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What supports the launch decision?”
- **Relationship pressure:** Rosalind Achebe: She must bring the crew home while protecting the resources they need if launch is delayed.
- **Arc, with source evidence:** After Stop 53 (Trace every green light), `mars-abiola-turn` makes the accepted evidence personally consequential. After Stop 60 (Commander's recommendation), `mars-abiola-payoff` shows the resulting change in practice: Applies the accepted final recommendation to the existing boarding state, retaining either the launch authorization or the failed checks.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Rosalind Achebe; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of launch authority and independent readiness evidence, the commitment above, and the witnessed correction in `mars-abiola-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** She must bring the crew home while protecting the resources they need if launch is delayed. Several green dashboard channels can feel like independent confirmation.

**Bio reflection question - exact player copy:** Why must Abiola ask for more than a full tank?

**Bio reveal answer - exact player copy:** She is responsible for a usable, safe propellant supply and for the crew’s launch decision, not just a production total.

**Bio feedback - exact player copy:** Quantity, composition and launch acceptance are distinct claims.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Abiola after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 60 accepted | “This is the decision supported by the samples; the color of the dashboard does not overrule it.” |
| 20 | Stop 53 accepted; Stop 60 not accepted | “I asked for a full tank; I also owe this crew proof of what is in it.” |
| 10 | Introduced; Stop 53 not accepted; fallback | “What supports the launch decision?” |

### Ingrid Sundqvist

- **Character ID:** `person-ingrid-sundqvist`
- **Display name:** Ingrid Sundqvist
- **Role:** production and catalyst lead
- **Pronouns:** she/her
- **Allowed short name:** Ingrid
- **Area ownership:** Atmosphere Intake; Plant Control. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Scrapes frost from the compressor sight glass before discussing production targets. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `mars-ingrid-entrance`, On arrival at Atmosphere Intake during Mission 2, when Stop 5 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `intake-calculation-board`.
- **Wants and personal stake:** Each lost shift reduces the fuel available to the crew; Herrera’s output-cutting override looks like work she cannot recover.
- **Blind spot:** Higher rate is her first remedy even when yield or quality is the binding limit.
- **Scientific domain:** throughput, rates and catalyst performance.
- **Decision function:** Supplies the throughput, rates and catalyst performance constraint to the existing decisions at Stops 40 and 44; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What limits the next kilogram?”
- **Relationship pressure:** Dr. Tomás Herrera: Each lost shift reduces the fuel available to the crew; Herrera’s output-cutting override looks like work she cannot recover.
- **Arc, with source evidence:** After Stop 40 (What did Herrera know, and when?), `mars-ingrid-turn` makes the accepted evidence personally consequential. After Stop 44 (Two plans look equally fast), `mars-ingrid-payoff` shows the resulting change in practice: Signs the tested operating-point record supporting the safer recovery plan.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Dr. Tomás Herrera; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of throughput, rates and catalyst performance, the commitment above, and the witnessed correction in `mars-ingrid-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** Ingrid is responsible for recovering lost production before the launch window closes. Higher rate is her first remedy, even when yield or quality may be the actual limit.

**Bio reflection question - exact player copy:** Why does Ingrid feel strong pressure to recover every lost shift?

**Bio reveal answer - exact player copy:** Lost production leaves less fuel and less time before the launch window, making an immediate rate increase tempting.

**Bio feedback - exact player copy:** Explain the time pressure without treating an output loss as proof of wrongdoing.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Ingrid after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 44 accepted | “Use this operating point; we can recover output without bringing back the condition you stopped.” |
| 20 | Stop 40 accepted; Stop 44 not accepted | “I saw the lost output and blamed you before I had the whole temperature record.” |
| 10 | Introduced; Stop 40 not accepted; fallback | “What limits the next kilogram?” |

### Dr. Tomás Herrera

- **Character ID:** `person-dr-tomas-herrera`
- **Display name:** Dr. Tomás Herrera
- **Role:** reactor and safety engineer
- **Pronouns:** he/him
- **Allowed short name:** Herrera
- **Area ownership:** Hydrogen Store; Plant Control. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Requests the raw sensor timestamps at Hydrogen Store while the leak argument continues. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `mars-herrera-entrance`, On arrival at Hydrogen Store during Mission 3, when Stop 9 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `store-scales`.
- **Wants and personal stake:** He made the override and held back incomplete thermal evidence because he feared command would react before he could explain it.
- **Blind spot:** Withholding uncertain evidence seems protective even though it damages trust and delays review.
- **Scientific domain:** thermal limits, equilibrium and causal tests.
- **Decision function:** Supplies the thermal limits, equilibrium and causal tests constraint to the existing decisions at Stops 40 and 44; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What happened before the temperature moved?”
- **Relationship pressure:** The player relies on Herrera for thermal limits, equilibrium and causal tests; their shared working assumption is challenged in `mars-herrera-turn`.
- **Arc, with source evidence:** After Stop 40 (What did Herrera know, and when?), `mars-herrera-turn` makes the accepted evidence personally consequential. After Stop 44 (Two plans look equally fast), `mars-herrera-payoff` shows the resulting change in practice: Shares the tested operating envelope with production rather than retaining a private safety account.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of thermal limits, equilibrium and causal tests, the commitment above, and the witnessed correction in `mars-herrera-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** Herrera is responsible for keeping the reactor inside a tested thermal envelope. He worries that others will act on an incomplete record before he can explain its limits.

**Bio reflection question - exact player copy:** Why should Herrera share the limits of an incomplete record with the crew?

**Bio reveal answer - exact player copy:** The crew needs to evaluate the same uncertainty and risks together, rather than act on different accounts.

**Bio feedback - exact player copy:** Shared uncertainty can be examined; undisclosed uncertainty cannot be evaluated by the team.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Herrera after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 44 accepted | “You have the same record I do; we change the plan together when the evidence changes.” |
| 20 | Stop 40 accepted; Stop 44 not accepted | “The override had a reason; keeping the record from you made that reason harder to test.” |
| 10 | Introduced; Stop 40 not accepted; fallback | “What happened before the temperature moved?” |

### Mei-Ling Cho

- **Character ID:** `person-mei-ling-cho`
- **Display name:** Mei-Ling Cho
- **Role:** water and cryogenics engineer
- **Pronouns:** she/her
- **Allowed short name:** Cho
- **Area ownership:** Catalyst Bay; Tank Farm; Assay Lab. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Refuses a residue sample whose chain of custody is broken. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `mars-cho-entrance`, On arrival at Catalyst Bay during Mission 4, when Stop 13 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `charge-bench`.
- **Wants and personal stake:** She is responsible for equipment that can be damaged by contaminants at low temperatures and wants sample custody taken seriously.
- **Blind spot:** An ideal separation model can overshadow maintenance history and shared calibration.
- **Scientific domain:** separation, phase behavior and cold-end contamination.
- **Decision function:** Supplies the separation, phase behavior and cold-end contamination constraint to the existing decisions at Stops 53 and 55; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What can reach the cold end?”
- **Relationship pressure:** The player relies on Cho for separation, phase behavior and cold-end contamination; their shared working assumption is challenged in `mars-cho-turn`.
- **Arc, with source evidence:** After Stop 53 (Trace every green light), `mars-cho-turn` makes the accepted evidence personally consequential. After Stop 55 (What is actually wrong?), `mars-cho-payoff` shows the resulting change in practice: Keeps the independent contamination diagnosis with the treatment record.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of separation, phase behavior and cold-end contamination, the commitment above, and the witnessed correction in `mars-cho-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** She is responsible for equipment that can be damaged by contaminants at low temperatures and wants sample custody taken seriously. An ideal separation model can overshadow maintenance history and shared calibration.

**Bio reflection question - exact player copy:** Why does Cho reject a sample with broken custody?

**Bio reveal answer - exact player copy:** The sample must reliably represent the material under investigation before it can support a contamination decision.

**Bio feedback - exact player copy:** Sample provenance affects whether a chemical conclusion applies to the equipment.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Cho after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 55 accepted | “Choose the treatment for the sample we tested, not the composition we expected.” |
| 20 | Stop 53 accepted; Stop 55 not accepted | “I checked the separation model; I should also have checked what both estimates inherited.” |
| 10 | Introduced; Stop 53 not accepted; fallback | “What can reach the cold end?” |

### Rosalind Achebe

- **Character ID:** `person-rosalind-achebe`
- **Display name:** Rosalind Achebe
- **Role:** analytical and electrochemistry lead
- **Pronouns:** she/her
- **Allowed short name:** Achebe
- **Area ownership:** Water Plant; Assay Lab; Pad Office. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Carries a sealed standard to the water meter before accepting its reading. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `mars-achebe-entrance`, On arrival at Water Plant during Mission 5, when Stop 17 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `water-report`.
- **Wants and personal stake:** Every extra assay uses scarce time, but a false-ready batch could waste the entire recovery effort.
- **Blind spot:** The wish for perfect evidence can make it difficult to name a sufficient stopping rule.
- **Scientific domain:** standards, assays and sufficient evidence.
- **Decision function:** Supplies the standards, assays and sufficient evidence constraint to the existing decisions at Stops 54 and 56; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “Which standard stands behind the number?”
- **Relationship pressure:** The player relies on Achebe for standards, assays and sufficient evidence; their shared working assumption is challenged in `mars-achebe-turn`.
- **Arc, with source evidence:** After Stop 54 (Test certification on the newest sample), `mars-achebe-turn` makes the accepted evidence personally consequential. After Stop 56 (Write the rule before the final samples), `mars-achebe-payoff` shows the resulting change in practice: Retains the precommitted acceptance rule before the final samples are opened.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of standards, assays and sufficient evidence, the commitment above, and the witnessed correction in `mars-achebe-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** Every extra assay uses scarce time, but a false-ready batch could waste the entire recovery effort. The wish for perfect evidence can make it difficult to name a sufficient stopping rule.

**Bio reflection question - exact player copy:** What must Achebe balance when deciding whether to request another assay?

**Bio reveal answer - exact player copy:** She needs evidence capable of changing the decision while respecting the limited time available to obtain it.

**Bio feedback - exact player copy:** Ask whether the proposed assay could alter the action, not simply add another number.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Achebe after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 56 accepted | “These are the checks we agreed were enough; apply them without moving the line.” |
| 20 | Stop 54 accepted; Stop 56 not accepted | “This sample changes the decision; another copy of the old number would not have helped.” |
| 10 | Introduced; Stop 54 not accepted; fallback | “Which standard stands behind the number?” |

### Yusuf Demir

- **Character ID:** `person-yusuf-demir`
- **Display name:** Yusuf Demir
- **Role:** power and life-support officer
- **Pronouns:** he/him
- **Allowed short name:** Yusuf
- **Area ownership:** Reactor Hall; Electrolysis Hall. Existing division assignments in the reference summary also remain in force; presence elsewhere is explicitly by radio.
- **First entrance:** Opens the habitat reserve-breaker log while the others discuss reactor output. The established entrance is retained; the scene below stages the first evidence encounter in this arc. Binding: `mars-yusuf-entrance`, On arrival at Reactor Hall during Mission 7, when Stop 25 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry, at `skid`.
- **Wants and personal stake:** He must explain any plant power diversion to the crew relying on heat, air and water.
- **Blind spot:** He can see every additional production demand as a fixed loss before accounting for recovery and recycling.
- **Scientific domain:** energy allocation and coupled resource budgets.
- **Decision function:** Supplies the energy allocation and coupled resource budgets constraint to the existing decisions at Stops 48 and 52; the player still submits the answer and the existing authority still controls authorization.
- **Verbal habit:** “What loses power when this gains it?”
- **Relationship pressure:** Mei-Ling Cho: He must explain any plant power diversion to the crew relying on heat, air and water.
- **Arc, with source evidence:** After Stop 48 (Close hydrogen over the whole plant), `mars-yusuf-turn` makes the accepted evidence personally consequential. After Stop 52 (Allocate the recovery power), `mars-yusuf-payoff` shows the resulting change in practice: Records the accepted timed power allocation with the habitat reserve protected.
- **Cost of changing:** The character must revise or qualify the commitment described under personal stake in front of the player and Mei-Ling Cho; the old interpretation remains reviewable rather than silently overwritten.
- **Gameplay necessity:** Removing this character removes the accountable owner of energy allocation and coupled resource budgets, the commitment above, and the witnessed correction in `mars-yusuf-turn`. Reassigning their questions alone would not preserve those scenes or constraints.

**Bio passage - exact player copy:** He must explain any plant power diversion to the crew relying on heat, air and water. He can see every additional production demand as a fixed loss before accounting for recovery and recycling.

**Bio reflection question - exact player copy:** Why does Yusuf ask what loses power when the plant gains it?

**Bio reveal answer - exact player copy:** He is responsible for life-support services drawing on the same finite supply.

**Bio feedback - exact player copy:** The habitat is part of the same allocation problem as the fuel plant.

**Bio check behavior:** On explicit opening of this character’s optional roster page after their first encounter, show only the bio passage and reflection question. Reveal answer and feedback only when the player selects Show answer; allow reconsideration and reopening. This is an unscored reading reflection, with no automatic correctness judgment, stop number, RP, timer cost, mission prerequisite, mastery credit, story flag or unlock. No answer or future arc is required to continue. Designer profile fields and future dialogue are not player-visible biography text.

**Conditional greeting binding:** On explicit Talk to Yusuf after the character has been introduced, use the highest satisfied row only. Later states override earlier ones. A state changes only from the existing accepted-stop record, never from reading the bio. Lines may be reopened on explicit request; do not autoplay a greeting already spoken as a scene line at that encounter. No new travel or required conversation is created. Presence is local only at the character’s existing location; otherwise use the established radio connection. Log spoken text; pause the timer while it is open.

| Priority | Condition | Exact greeting |
|---:|---|---|
| 30 | Stop 52 accepted | “I can support this diversion with its timing and reserve limits attached.” |
| 20 | Stop 48 accepted; Stop 52 not accepted | “Recovery changes what we must supply; I was treating every extra kilogram as a new draw.” |
| 10 | Introduced; Stop 48 not accepted; fallback | “What loses power when this gains it?” |


## 5. Character direction and dialogue rules

- Introduce competence before biography. Show each character doing a job
  under pressure.

- Give every major character a repeatable verbal habit: Abiola asks
  "What can we defend?"; Sundqvist asks "How many kilograms by dawn?";
  Herrera asks "What changed first?"; Cho asks "What can physically
  travel there?"; Achebe asks "Against which standard?"; Demir asks
  "What stops if we do that?"

- Characters may be wrong about explanations, never about facts within
  their specialty without an explicit reason.

- Wrong answers should produce a character response that names the
  mechanism, not ridicule the player.

- After evidence changes a relationship, change future greetings and
  optional dialogue.

- Do not let a character deliver more than about 90 spoken words without
  player movement, inspection, or response.

### Non-cinematic beat presentation contract

- Keep the player in the normal playable view; story delivery never
  depends on a forced viewpoint change.

- Use nearby_character_bubble for a person in the current location and
  radio_bubble for a person speaking from elsewhere.

- Advance mission-critical bubbles with a Continue control. Never let
  essential dialogue disappear on a timer.

- Use no more than two short bubbles in an ordinary beat. Mission 15 may
  use three one-line specialist acknowledgements.

- Place scientific results on equipment_panel_update and keep them
  visible until the next stop begins.

- Use system_banner only for a single conclusion, warning, or
  destination. Put details on the equipment panel or in the mission log.

- Activate a waypoint only after the briefing or dialogue explicitly
  names the destination.

- Copy completed dialogue, panel conclusions, and destinations into the
  mission log so the player can review them.

- Sound, lighting, particles, and object movement are optional
  reinforcement. They never carry information the player must know.

- No voice acting, lip sync, custom character animation, or pre-rendered
  video is required.

## 6. Chemistry spine and recurring concepts

**Particles, moles, and molar mass** - Introduce/practice: M1. Retrieve/combine: M2, M6. Transfer/payoff: M13, M15.

**Balancing and stoichiometry** - Introduce/practice: M1-M2. Retrieve/combine: M6, M12. Transfer/payoff: M13, M15.

**Gas laws and partial pressure** - Introduce/practice: M3. Retrieve/combine: M6, M11. Transfer/payoff: M14-M15.

**Lewis structures, VSEPR, polarity, and IMF** - Introduce/practice: M4. Retrieve/combine: M5. Transfer/payoff: M14-M15.

**Solutions, molarity, and spectroscopy** - Introduce/practice: M5. Retrieve/combine: M9, M12. Transfer/payoff: M14-M15.

**Energy, calorimetry, and phase change** - Introduce/practice: M7. Retrieve/combine: M9-M10. Transfer/payoff: M11, M15.

**Kinetics and rate law** - Introduce/practice: M8. Retrieve/combine: M9-M10. Transfer/payoff: M11, M15.

**Catalysts and mechanisms** - Introduce/practice: M9. Retrieve/combine: M10. Transfer/payoff: M11, M15.

**Equilibrium, Q, K, and ICE** - Introduce/practice: M11. Retrieve/combine: M12, M14. Transfer/payoff: M15.

**Acids, bases, and solution treatment** - Introduce/practice: M12. Retrieve/combine: M14. Transfer/payoff: M15.

**Redox and electrolysis** - Introduce/practice: M13. Retrieve/combine: M14. Transfer/payoff: M15.

**Evidence independence and uncertainty** - Introduce/practice: M5-M6. Retrieve/combine: M10. Transfer/payoff: M14-M15.

Difficulty moves from L1 recognition and L2 procedures in Missions 1-4,
through L3 application and L4 synthesis in Missions 5-10, to L4/L5
constrained decisions in Missions 11-15. Later difficulty comes from
choosing and combining models, not uglier arithmetic.

## 7. Clue ledger

### M1 → M6: Carbon ledger

**Objective observation:** Carbon in nearly equals carbon accounted for.  
**Initial interpretation:** Meter noise.  
**True meaning:** There is no large methane leak.  
**Concept needed:** Atom and material balance.

### M3 → M6/M14: Pressure and composition

**Objective observation:** Tank pressure looks normal while methane fraction is low.  
**Initial interpretation:** Bad pressure gauge.  
**True meaning:** Other gases preserve total pressure.  
**Concept needed:** Ideal gas law and Dalton's law.

### M4 → M6: Residue path

**Objective observation:** Polar residue sits near a nonpolar-gas path.  
**Initial interpretation:** Leak residue.  
**True meaning:** The residue came from maintenance, not the gas stream.  
**Concept needed:** Polarity and intermolecular forces.

### M5 → M6/M14: Shared standard

**Objective observation:** Three meters share one calibration stream.  
**Initial interpretation:** Reassuring agreement.  
**True meaning:** The agreement is false corroboration.  
**Concept needed:** Evidence dependency.

### M7 → M10: Temperature override

**Objective observation:** Herrera lowered the temperature set point.  
**Initial interpretation:** Sabotage.  
**True meaning:** It was a response to rising heat release.  
**Concept needed:** Calorimetry and energy balance.

### M9 → M10: Inlet temperature

**Objective observation:** Bed temperature rises first near the inlet.  
**Initial interpretation:** Poisoned catalyst or bad control.  
**True meaning:** A hot spot is developing.  
**Concept needed:** Mechanism, rate, and heat.

### M10 → Twist 2: Hidden hot runs

**Objective observation:** The production model fails only on withheld hot runs.  
**Initial interpretation:** Inconvenient outliers.  
**True meaning:** The aggressive setting crosses the safety limit.  
**Concept needed:** Holdout testing, residuals, and stress testing.

### M12 → M13: Whole-plant hydrogen

**Objective observation:** The whole-plant hydrogen balance closes only when recycle water is included.  
**Initial interpretation:** Hydrogen disappears.  
**True meaning:** The return loop starves electrolysis.  
**Concept needed:** Coupled stoichiometry.

### M14 → Twist 3: Quality channels

**Objective observation:** Dashboard quality channels share a standard.  
**Initial interpretation:** Strong agreement.  
**True meaning:** The channels share one calibration bias.  
**Concept needed:** Trace and holdout reasoning.


## 7.1 Persistent world-state ledger

| Mission | Accepted trigger | Home fixture | State that persists | Next visible problem |
|---|---|---|---|---|
| 1 | `accepted_stop_4` | `ledger` | Commander Laila Abiola clips the CARBON ACCOUNTED FOR: 99.8% sheet into the carbon ledger. | At `compressor-log-desk`, frost rims the compressor glass beside the next shift's fuel target. |
| 2 | `accepted_stop_8` | `compressor-log-desk` | Ingrid Sundqvist pins the CO2 CAPACITY: 2405 KG METHANE card above the intake log. | At `gas-sampling-ports`, the pressure needle holds steady while a sample vial changes its label. |
| 3 | `accepted_stop_12` | `gas-sampling-ports` | Dr. Tomás Herrera hangs a NITROGEN AFTER REGULATOR tag on the reactor-branch port. | At `separation-cartridge`, a blue swab rests beside a clear dry-line cartridge. |
| 4 | `accepted_stop_16` | `separation-cartridge` | Mei-Ling Cho sets the retained blue residue in a LOCAL MAINTENANCE tray. | At `water-report`, a sealed field vial stands apart from three matching screen printouts. |
| 5 | `accepted_stop_20` | `water-report` | Rosalind Achebe clips the SHARED BAD STANDARD finding beside the normal field result. | At `evidence-board`, gas labels, water totals, and carbon slips cover the bare evidence board. |
| 6 | `accepted_stop_24` | `evidence-board` | Commander Laila Abiola pins the HYDROGEN-LINE REPAIR order across the linked raw records. | At `phase-radiator`, a heat strip ends above its limit beside a folded override sheet. |
| 7 | `accepted_stop_28` | `phase-radiator` | Dr. Tomás Herrera clips the 2.7 MJ RETAINED heat ledger to the radiator board. | At `verification-panel`, herrera's name appears on a sheet no one has put back in its folder. |
| 8 | `accepted_stop_32` | `verification-panel` | Ingrid Sundqvist pins the RATE DROP VERIFIED / MOTIVE UNRESOLVED strip beside the signature. | At `bed`, an inlet sample lies beside a much cleaner outlet sample. |
| 9 | `accepted_stop_36` | `bed` | Mei-Ling Cho places the damaged inlet cartridge in the HALIDE DAMAGE tray. | At `analyser`, the sealed old run waits beneath Ingrid's blame model. |
| 10 | `accepted_stop_40` | `analyser` | Commander Laila Abiola pins the OVERRIDE PREVENTED RUNAWAY finding beside the revealed run. | At `operating-point-board`, two trials rise at the same early speed and end at different yields. |
| 11 | `accepted_stop_44` | `operating-point-board` | Ingrid Sundqvist pins the LOWER TEMPERATURE / HIGHER PRESSURE / WATER REMOVAL plan to the board. | At `stack-accounting-panel`, an 80 kmol gap sits in the water-return column. |
| 12 | `accepted_stop_48` | `stack-accounting-panel` | Yusuf Demir clips the WATER RETURN: 80 KMOL RECOVERED entry into the stack ledger. | At `loadboard`, the habitat breaker tags sit beside a climbing tank gauge. |
| 13 | `accepted_stop_52` | `loadboard` | Yusuf Demir pins the protected-load schedule beneath the full amount readings. | At `assay-review-board`, a fresh vial stands beneath a gauge that still says FULL. |
| 14 | `accepted_stop_56` | `assay-review-board` | Rosalind Achebe hangs a BATCH C: HOLD tag over the loading release. | At `certification-console`, the crew's bags wait behind the dark pad door. |
| 15 | `accepted_stop_60` | `certification-console` | Commander Laila Abiola turns the final launch decision key. | At `certification-console`, the signed operating conditions remain beside the final status. |

## 8. Mission content contract

Every mission below supplies: story event, route, character beat,
concepts in plain language, four exact stops, an outcome scene, and a
quick review. Each briefing must make sense before the player begins the
lesson: connect to the previous outcome, explain the present problem
without unintroduced jargon, name what the player will do, and end with
the decision or result the mission must produce. Each question-card
story setup must identify the next necessary step toward that decision
and, after Stop 1, connect to what the player has just established. The
first sentence of the mission outcome must answer the decision promised
by the briefing; the remaining sentences show the consequence and create
the next mission's problem. Correct result is the grading truth; Answer text is the verdict sentence
and must not repeat that grading string. Every stop also names its owning
Area, declared placement fixture, and exact player-facing Call. Person stops
name one canonical character only. Wrong-path feedback is implementation
content and gives one authored rebuttal per wrong CHOICE option; it may be
shortened only if the format cannot display it. State/output identifies
narrative flags and visible world changes. Every beat names an engine-real
trigger - arrival, stop close, or mission end - and separately authors world
state, panel/HUD text, dialogue, waypoint when needed, and unlocks.


## Revision 10.3 blocking-format fixes

This revision repairs validator-blocking interaction authoring discovered in v10.2. PROBE stops now use canonical station-by-station observed/expected/load records with a target and minimum-readings gate. CHOICE stops use explicit candidate lists rather than slash-delimited prose, and every wrong CHOICE option has its own rebuttal. No chemistry, story outcome, mission order, or correct answer changes.

## Revision 10.5 build-ownership delta

This revision removes the last places where implementation had to invent campaign design. Section 3 now marks the six areas of study and declares every existing or newly required fixture with place, id, kind, and player-facing caption. All 60 stops name an `Area`, a declared fixture id in `Format/placement`, and `Call - exact player copy`; every person stop belongs to one named character. All 76 beats now use only arrival, stop-close, or mission-end triggers and carry separate world-state, HUD, dialogue, waypoint when applicable, and unlock fields. `Correct result` remains grading truth while `Answer text` is distinct verdict copy, and every CHOICE retains one rebuttal per wrong option.

## Revision 10.4 house-style delta

This pass preserves the story, science, cast, mission structure, and all 60 stop identities while normalizing stop fields to the buildable house style. Both PROBE stops now carry at least four stations with observed and expected values, all CHOICE stops carry option-specific rebuttals, generic result/teaching/feedback labels are normalized, and every stop has explicit Correct result, Answer text, Why, Wrong-path feedback, and State/output fields.

## Revision 10.2 presentation cleanup

Glossary entries are now compact one-line definitions in the form `Term: definition`; separate `Also called` and `Definition` lines are removed. Equation blocks no longer include `Also called` or `Concept` lines; they retain the equation, purpose, symbols, and campaign-specific reason.

## Revision 10.1 implementation delta

This revision closes the implementation debt found after Missions 1-2 were built. Every stop now includes a player-facing reason, a two-sentence 30-45-word setup, a keystone tag, a canonical answer text, and - where the player operates, samples, allocates, traces, diagnoses, or tests - a complete interaction payload. Every mission card now also authors its own `Worth knowing first` block: compact one-line glossary terms with plain-language definitions, primer concepts, and fully explained equations first needed that day. Briefing bodies and outcomes are written as one visible promise-and-answer chain. Failure and later-travel notes remain authoring logic and are not printed as duplicate briefing-card fields.

**Source-of-truth order:** the repository importer and schema win first; the current canonical format documentation wins second; this book supplies the complete content and intended logic. If a field name has changed, map the named data without deleting the interaction or replacing it with a generic option list.

## Player-facing glossary dependency

Define a term before a briefing, bubble, setup, or question assumes it. Definitions must not depend on another undefined term. The complete entries now live on the first mission card that needs them as compact one-line definitions. The implementation should lift those authored entries directly rather than expanding them into alias or definition subfields.

## Keystone retrieval compliance ledger

**Particles, moles, and molar mass:** Introduce M1; delayed retrieve M6/Stop 23; combine or transfer M13/Stop 51 and M15/Stop 60.

**Balancing and stoichiometry:** Introduce M1-M2; delayed retrieve M6/Stop 23; combine or transfer M12/Stop 48 and M15/Stop 58.

**Limiting reactant:** Introduce M2; delayed retrieve M6/Stop 23; combine or transfer M12/Stop 48 and M15/Stop 60.

**Gas behavior and partial pressure:** Introduce M3; delayed retrieve M14/Stop 53; combine or transfer M15/Stop 58.

**Structure, polarity, and intermolecular forces:** Introduce M4; delayed retrieve M14/Stop 55; combine or transfer M15/Stop 60.

**Solutions, concentration, and treatment:** Introduce M5; delayed retrieve M12/Stop 46; combine or transfer M14/Stop 55 and M15/Stop 59.

**Evidence independence:** Introduce M5; delayed retrieve M10/Stop 37; combine or transfer M14/Stops 53-56 and M15/Stops 57-60.

**Energy and calorimetry:** Introduce M7; delayed retrieve M9/Stop 35; combine or transfer M10/Stops 39-40 and M15/Stops 59-60.

**Kinetics and rate law:** Introduce M8; delayed retrieve M11/Stop 44; combine or transfer M15/Stops 59-60.

**Catalysts and mechanisms:** Introduce M9; delayed retrieve M11/Stop 44; combine or transfer M15/Stops 59-60.

**Equilibrium:** Introduce M11; delayed retrieve M14/Stop 55; combine or transfer M15/Stops 58-60.

**Acid-base treatment:** Introduce M12; delayed retrieve M15/Stop 59; combine or transfer M15/Stop 60.

**Redox and electrochemistry:** Introduce M13; delayed retrieve M15/Stop 58; combine or transfer M15/Stops 59-60.


## 8.1 Final playable scene and ending card

**Completion gate:** accepted_stop_60 AND every existing final scientific/evidence requirement AND the existing final metric target. Acceptance arms the scene; if metric allocation is still required, play it once that allocation passes. A wrong answer, missing proof, or failed check never starts the success animation.

**One visible change:** The pad crew gate opens and the ascent vehicle lights come on.

**The next sixty seconds:** 0–15 seconds: the board changes from HOLD to GO / FUEL VERIFIED and the crew gate opens. 15–40 seconds: the player walks with the crew to the vehicle; the amount gauge reads FULL beside the assay seals. 40–60 seconds: the player enters the cabin and sees the countdown begin. An optional Continue advances to the launch view and ending card, without another test or timed input.

**Ending card - exact player copy:** From the cabin window, the pad lights shrink below. The full fuel gauge sits beside two passed assay seals. The crew is strapped in, the safe plant is behind them, and Arcadia Rise falls away into the red plain.

**Delivery:** Keep player control and normal world view. No new graded stop follows the final accepted decision. The ending card appears after the player reaches the payoff view, or through an accessible View ending control that skips movement without skipping any scientific gate. Optional review and worked examples remain available through the completed mission menu.


### Standalone Go Deeper question contract

Each optional review question must work when copied out on its own. Supply its setting, givens, units, definitions, and any required figure within that question. Do not mention a mission title, a prior case, a teammate rechecking earlier work, a completed plan, or unseen cards, observations, or results. Do not assume that another review question was read. Choices, hints, and feedback obey the same rule. Use brief conceptual questions or complete applied problems; figures must match the question rather than merely share its course.

# Mission 1 - The Shortfall

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 1 - 15 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE SHORTFALL

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the carbon ledger.

**Card body:** 15 work shifts remain before launch. The fuel gauge glows above a tray of unused valve spanners. Today you decide whether a methane leak explains the missing fuel.

**Objective:** Use the production records to decide whether a large
methane leak can explain the fuel shortage.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 1: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m01_we01
    title: Mass and amount
    problem: A sample contains 18 g of water. Use molar mass M=18 g/mol. Find amount n.
    rule: n=m/M.
    steps:
    - 'Set up the relationship: n=m/M.'
    - n=18/18=1 mol.
    answer: The sample contains 1 mol of water molecules.
    common_mistake: Grams measure mass; moles measure amount.
  - id: mars_m01_we02
    title: Count molecules
    problem: A sample contains 0.5 mol of nitrogen molecules. Use Avogadro constant N_A=6×10²³ molecules/mol for this example.
    rule: N=nN_A.
    steps:
    - 'Set up the relationship: N=nN_A.'
    - N=0.5(6×10²³)=3×10²³ molecules.
    answer: There are approximately 3×10²³ molecules.
    common_mistake: Each nitrogen molecule contains two atoms; the molecule count is not the atom count.
  - id: mars_m01_we03
    title: Count atoms in a formula
    problem: How many moles of oxygen atoms are in 2 mol of CO₂ molecules?
    rule: Each CO₂ molecule has two oxygen atoms.
    steps:
    - 'Set up the relationship: Each CO₂ molecule has two oxygen atoms.'
    - n_oxygen_atoms=2(2)=4 mol.
    answer: The sample contains 4 mol of oxygen atoms.
    common_mistake: The subscript applies to oxygen, not to every atom in the molecule.
  - id: mars_m01_we04
    title: Count electrons in an ion
    problem: A magnesium nucleus has 12 protons. How many electrons does Mg²⁺ have?
    rule: Positive charge means fewer electrons than protons.
    steps:
    - neutral electron count=12.
    - ion electron count=12-2=10.
    answer: Mg²⁺ has 10 electrons and 12 protons.
    common_mistake: Forming this ion changes electrons, not the number of protons.
  - id: mars_m01_we05
    title: Balance a reaction
    problem: Balance H₂ + O₂ → H₂O without changing chemical formulas.
    rule: Coefficients conserve each element; subscripts identify substances.
    steps:
    - Place 2 before H₂O so the product has two oxygen atoms.
    - 'Place 2 before H₂ to supply four hydrogen atoms: 2H₂ + O₂ → 2H₂O.'
    answer: Both sides contain four hydrogen atoms and two oxygen atoms.
    common_mistake: Changing H₂O to H₂O₂ would change the product.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Particle: one counted piece of matter. In this mission, a particle may be an atom, a molecule, or an ion.

Atom: the smallest ordinary piece of one kind of matter that keeps that identity. Counting atoms lets the plant check whether matter has disappeared.

Ion: an atom or group of atoms with an electrical charge. It is not the same thing as a neutral atom or molecule.

Mole: a fixed count of particles, the same count for every substance. One mole contains 6.022 x 10^23 particles; one kilomole contains one thousand moles.

#### Primer concepts

- Matter can change form during a reaction, but atoms are not created or destroyed.
- A mass shortage is not automatically a leak; first ask whether the unit conversion and atom count close.
- Chemical formulas show how many atoms of each element are present in one particle.

#### Equations first needed today

**Equation:** moles = grams / molar mass; particles = moles x 6.022 x 10^23  
**What it is for:** turning a mass on a scale into a count of particles  
**Symbols:** grams is the measured mass; molar mass is the grams in one mole; 6.022 x 10^23 is Avogadro's number, the particles in one mole.  
**Why this campaign needs it:** The tank scale reports mass, but the reactor and atom ledger must count particles before the crew can decide whether fuel is missing.  

**Equation:** unaccounted amount = amount entering - amount accounted for  
**What it is for:** closing a material ledger  
**Symbols:** amount entering is the measured input; amount accounted for is the total in products, recycle, samples, and measured losses.  
**Why this campaign needs it:** The crew should hunt a leak only if the carbon entering the plant cannot be found in known streams.  

**Crew on this mission - mission log:** Commander Laila Abiola - mission commander; Ingrid Sundqvist - production and catalyst lead.



## Main story happening - designer summary

The player arrives in Plant Control during a loud but orderly response.
Abiola stops two technicians from sealing random valves: no intervention
until the basic ledger is understood. The mission establishes the player
as the person who translates chemistry into action. The first correct
answers do not solve the shortfall; they make the leak story less
comfortable.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Plant Control \| automatic**

**Trigger:** mission_1_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The fuel gauge glows above a tray of unused valve spanners.

**Panel/HUD text:** MISSION 1 - THE SHORTFALL

**Dialogue bubbles -** Abiola: "Those valves stay open until we know whether matter is actually missing. We have fifteen shifts to make the fuel that gets us home. Start with the ledger."

**Unlocks:** Stop 1 at the sample tray.
**Beat 2 - After Stop 1 \| sample tray \| automatic correct-answer response**

**Trigger:** accepted_stop_1.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `sample-tray`, the dated accepted-result slip for Stop 1 reads: "Choice 1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 2: HOW MUCH METHANE IS MISSING?

**Dialogue bubbles -** Abiola: "Nice work. If the software calls every object the same kind of particle, the count can be correct and the conclusion can still be wrong."

**Unlocks:** Stop 2 at the conversion board; Stop 3 unlocks immediately after Stop 2.
**Beat 3 - After Stops 2 and 3 \| conversion board \| automatic transition**

**Trigger:** accepted_stop_2.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `conversion-board`, the dated accepted-result slip for Stop 2 reads: "6.01 x 10^28 CH4 molecules; target 6.0 x 10^28, tolerance ±6%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MASS -\> MOLES -\> MOLECULES.

**Dialogue bubbles -** Abiola: "Good thinking. Now the tank scale and the reactor model are speaking the same language. Open the carbon ledger."

**Unlocks:** Stop 4 at the carbon ledger.
**Beat 4 - After Stop 4 \| carbon ledger \| automatic discovery**

**Trigger:** accepted_stop_3.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `conversion-board`, the dated accepted-result slip for Stop 3 reads: "As listed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** CARBON ACCOUNTED FOR: 99.8% / METHANE TARGET: NOT MET.

**Dialogue bubbles -** Abiola: "Exactly right. We are still short of methane. We may not be short of carbon."

**Unlocks:** The Mission 1 outcome beat.
**Beat 5 - At mission end \| Plant Control \| automatic outcome and hook**

**Trigger:** accepted_stop_4.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `ledger`, Commander Laila Abiola clips the CARBON ACCOUNTED FOR: 99.8% sheet into the carbon ledger. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - ATMOSPHERE INTAKE.

**Dialogue bubbles -** Commander Laila Abiola: "Put the spanners down. Follow what entered the plant. But Ingrid's next shift still lacks methane; the intake must prove it supplies enough carbon before another valve is blamed."

**Waypoint:** Atmosphere Intake

**Unlocks:** Mission 2 briefing and the Atmosphere Intake waypoint.
### Physical aftermath — mars-m01

**Home:** `ledger`. **Before:** The dated mission-1 evidence holder at this fixture has no accepted record. The fuel gauge glows above a tray of unused valve spanners.
**After — exact action:** Commander Laila Abiola clips the CARBON ACCOUNTED FOR: 99.8% sheet into the carbon ledger.
**Trigger:** accepted_stop_4. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `compressor-log-desk`, frost rims the compressor glass beside the next shift's fuel target.
**Segue - exact player copy:** But Ingrid's next shift still lacks methane; the intake must prove it supplies enough carbon before another valve is blamed.

## Location plan

**One location:** Plant Control (GIBBS). All four stops occur around the
sample tray, conversion board, and carbon ledger. No distant travel.

## Characters and dramatic beat

Abiola introduces the stakes by cancelling work, not by narrating her
biography. Sundqvist appears only on radio, asking for permission to
raise reactor throughput. When the carbon ledger nearly closes, Abiola
does not declare "no leak"; she pins the sheet under a magnet labeled
**DO NOT EXPLAIN YET**.

## Key concepts, explained here

Matter is described at several levels. An atom is one neutral element
unit; a molecule is bonded atoms with no net charge; an ion has a net
charge. Chemists convert a measured mass to moles using molar mass, then
convert moles to particles with Avogadro's number, 6.022 x 10^23 mol^-1.
A balanced equation is an atom ledger: coefficients may change the
number of molecules, but atoms are not created or destroyed.

### Character scene: mars-abiola-entrance

**Trigger:** On arrival at Plant Control during Mission 1, when Stop 1 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `sample-tray` in Plant Control. Commander Laila Abiola, mission commander, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the material from the opening handover available beside the current evidence.
**Exact dialogue:**
- Commander Laila Abiola, mission commander: “Tell me which measurement could stop a launch even if the tank looks full.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-abiola-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 1 - Labels on the sample tray

**Format/placement:** CHOICE, asked at Commander Laila Abiola beside `sample-tray`.

**Metadata:** Concept: 1 - particles; Keystone: particles, moles, and molar mass; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the sample tray in Plant Control.

**Stop reason - exact player copy:** The shortage investigation cannot compare samples until their chemical labels are interpreted consistently.

**Question card story setup - exact player copy:** Before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly.

**Question card story-science connection - exact player copy:** Distinguishing atoms, molecules, and ions prevents the first inventory from counting different kinds of particles as equivalent.

**Question card prompt - exact player copy:** Which classification is
completely correct?

**Choices:**

1.  Ar is an atom; CH4 and CO2 are molecules; H+ is an ion.
    **(correct)**

2.  All four are molecules because each symbol describes matter.

3.  Ar and H+ are atoms; CH4 and CO2 are ions.

4.  CO2 is an atom because it is one chemical formula.

**Correct result:** Choice 1.

**Answer text:** Ar is an atom; CH4 and CO2 are molecules; H+ is an ion.

**Why:** Ar is a single neutral atom. CH4 and CO2 contain bonded atoms
and are neutral molecules. H+ has a positive charge, so it is an ion.
"Particle" is the umbrella word; it does not erase these distinctions.

**Wrong-path feedback:** (2) A formula can name an atom, molecule, or
ion; the word formula does not decide. (3) H+ is charged, while CH4 and
CO2 have no net charge. (4) One written formula can contain several
atoms.

**State/output:** Set evidence_flags.particle_labels = true; unlock the
conversion board.

## Stop 2 - How much methane is missing?

**Format/placement:** BALLPARK, at `conversion-board`.

**Metadata:** Concept: 1 - grams-moles-particles; Keystone: particles, moles, and molar mass; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the conversion board, in Plant Control.

**Stop reason - exact player copy:** The sample labels are checked, but the methane mass record still needs comparison with a particle count.

**Question card story setup - exact player copy:** The fuel shortfall must be expressed as molecules before the reaction ledger can use it.

**Question card prompt - exact player copy:** Convert a 1,600 kg methane shortfall to molecules using molar mass 16.04 g/mol and Avogadro’s constant 6.022×10²³ mol⁻¹. Fill mass in kilograms, molar mass and Avogadro’s constant; the equation converts kg to g.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "How much methane is missing?",
    "labels": [
      "1600",
      "16.04",
      "6.022e+23",
      "1000"
    ],
    "values": [
      1600,
      16.04,
      6.022e+23,
      1000
    ],
    "slots": 3,
    "template": "{a} × 1000 / {b} × {c} = ? molecules",
    "formula": "a*1000/b*c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 6.006e+28,
    "tolerance": 3.6036e+27,
    "units": "molecules",
    "correctResult": 6.006e+28
  },
  "answerText": "1,600×1,000/16.04×6.022×10²³≈6.006×10²⁸ methane molecules. The kilogram-to-gram conversion precedes the mole conversion.",
  "wrongFeedback": [
    "Skipping kilograms to grams makes the count a thousand times too small."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** 1,600×1,000/16.04×6.022×10²³≈6.006×10²⁸ methane molecules. The kilogram-to-gram conversion precedes the mole conversion.

**Wrong-path feedback:** Skipping kilograms to grams makes the count a thousand times too small.

**State/output:** Update the wall display from kilograms to both
kilograms and kilomoles; no inventory change.

## Stop 3 - Rebuild the conversion

**Format/placement:** SEQUENCE, at `conversion-board`.

**Metadata:** Concept: 1 - dimensional analysis; Keystone: particles, moles, and molar mass; Area: Plant Control; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the conversion board, in Plant Control.

**Stop reason - exact player copy:** A deleted spreadsheet formula could have created the apparent shortage before any material was lost.

**Question card story setup - exact player copy:** Because a deleted formula could create a false shortage, rebuild the full mass-to-molecules conversion before trusting yesterday's estimate. A complete unit path will expose whether the estimate is artificial before repairs begin.

**Question card story-science connection - exact player copy:** The complete mass-to-molecule conversion determines whether the earlier methane estimate has a valid unit path.

**Question card prompt - exact player copy:** Put the methane conversion
workflow in order.

**Cards:** Read tank mass in kg / Convert kg to g / Divide by CH4 molar
mass / Multiply by Avogadro's number / Report molecules with units.

**Correct result:** As listed.

**Answer text:** Use mass, convert to grams, divide by molar mass, multiply by Avogadro's number, and report particles.

**Why:** Dimensional analysis is a path whose units cancel. Kilograms
cannot cancel grams per mole until kilograms become grams. Dividing by
molar mass leaves moles; multiplying by molecules per mole leaves
molecules. The unit trail is also an error detector.

**Wrong-path feedback:** Highlight the first adjacent pair whose units
cannot cancel. Do not reveal the full order until a second failed
commit.

**State/output:** Set evidence_flags.conversion_rebuilt = true; carbon
ledger becomes interactable.

## Stop 4 - Close the first carbon ledger

**Format/placement:** BALANCE, at `ledger`.

**Metadata:** Concept: 2 - atom conservation; Keystone: balancing and stoichiometry; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the carbon ledger, in Plant Control.

**Stop reason - exact player copy:** The conversion is checked and the carbon inputs must now be reconciled with the outputs.

**Question card story setup - exact player copy:** The ledger records 100.0 kmol of carbon entering the interval, with 81.6 kmol in methane, 17.9 kmol in recycled carbon dioxide, and 0.3 kmol in samples and measured vents. A separate row lists 160.0 kmol of water coproduct.

**Question card story-science connection - exact player copy:** The unassigned carbon fraction tests whether a large methane leak is compatible with the material balance.

**Question card prompt - exact player copy:** Count the legitimate
carbon streams and close the ledger.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Carbon entering interval", value: 100.0, unit: "kmol C"}
  streams:
    - {id: methane_product, label: "Carbon in methane product", value: 81.6, unit: "kmol C", count: true}
    - {id: recycle_co2, label: "Carbon in recycle CO2", value: 17.9, unit: "kmol C", count: true}
    - {id: sample_and_vents, label: "Carbon in samples and measured vents", value: 0.3, unit: "kmol C", count: true}
    - {id: water, label: "Water coproduct", value: 160.0, unit: "kmol H2O", count: false}
  closure: {value: 99.8, unit: "kmol C", residual: 0.2, tolerance: 0.1}
  correct_action: "Count the three carbon-bearing streams; exclude water and the schedule gap."
```

**Balance block:** total 100.0 kmol C; visible streams 81.6, 17.9, 0.3;
hidden closure 0.2 kmol C; tolerance 0.1 kmol.

**Correct result:** 99.8 kmol C is directly accounted for and only 0.2
kmol C (0.2%) is unassigned.

**Answer text:** The ledger accounts for 99.8 kmol C and leaves only 0.2 kmol C unassigned.

**Why:** One mole of CO2 and one mole of CH4 each contain one mole of
carbon atoms. Add carbon streams as carbon, not total molecular mass. A
0.2% residual can be measurement uncertainty; it cannot explain an 18%
methane schedule shortfall. This does not yet prove there is no leak,
but it makes a large carbon leak a poor explanation.

**Wrong-path feedback:** Do not count water; it contains no carbon. Do
not multiply CH4 by four; the subscript four counts hydrogen atoms. Do
not treat the 18% schedule gap as a carbon stream.

**State/output:** Set evidence_flags.carbon_nearly_closed = true; add
Casebook card CARBON CLOSES; increase crew_trust by one.

## Mission outcome

Mission decision: A large methane leak cannot explain the fuel gap. The new count finds 99.8% of the carbon. Work on random valves stops. The plant still needs fuel. The next test asks if the air intake brings in enough carbon dioxide.

**Segue - exact player copy:** But Ingrid's next shift still lacks methane; the intake must prove it supplies enough carbon before another valve is blamed.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Commander Laila Abiola clips the CARBON ACCOUNTED FOR: 99.8% sheet into the carbon ledger. But Ingrid's next shift still lacks methane; the intake must prove it supplies enough carbon before another valve is blamed.

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 06:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** A shift is spent rebuilding the ledger, but random
valve closures are prevented.

**Automatic bar change:** Methane -2 \| Oxygen 0 \| Power -2 \|
Integrity +4

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +6. Result: METHANE 84% \| OXYGEN 88%
\| POWER 76% \| INTEGRITY 74%. Recovery Bank: 2 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Electric charge:** a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- **Electron:** a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- **Chemical bond:** a strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- **Chemical reaction:** rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- **Molecule:** two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- **Molar mass:** the mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.

### Review question 1


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- B. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- D. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electron. It does not answer the question about electric charge.
- B: Correct. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C: This describes chemical bond. It does not answer the question about electric charge.
- D: This describes chemical reaction. It does not answer the question about electric charge.

### Review question 2


**Prompt - exact player copy:** Which statement best explains electron?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electron. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about electron.
- B: This describes chemical bond. It does not answer the question about electron.
- C: Correct. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D: This describes chemical reaction. It does not answer the question about electron.

### Review question 3


**Prompt - exact player copy:** Which statement best explains chemical bond?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- C. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for chemical bond. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about chemical bond.
- B: This describes electron. It does not answer the question about chemical bond.
- C: This describes chemical reaction. It does not answer the question about chemical bond.
- D: Correct. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

### Review question 4


**Prompt - exact player copy:** Which statement best explains chemical reaction?

**Options - exact player copy:**

- A. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- B. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for chemical reaction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- B: This describes electric charge. It does not answer the question about chemical reaction.
- C: This describes electron. It does not answer the question about chemical reaction.
- D: This describes chemical bond. It does not answer the question about chemical reaction.

### Review question 5


**Prompt - exact player copy:** Which statement best explains molecule?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. Two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for molecule. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about molecule.
- B: Correct. Two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- C: This describes electron. It does not answer the question about molecule.
- D: This describes chemical bond. It does not answer the question about molecule.

### Review question 6


**Prompt - exact player copy:** Which statement best explains molar mass?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- C. The mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for molar mass. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about molar mass.
- B: This describes electron. It does not answer the question about molar mass.
- C: Correct. The mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.
- D: This describes chemical bond. It does not answer the question about molar mass.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Atom, molecule, and ion describe different kinds of particles.

- moles = grams / molar mass; particles = moles x 6.022 x 10^23.

- Follow units through every conversion.

- Balanced equations and process ledgers conserve atoms.

- **Mission takeaway:** A nearly closed carbon ledger weakens a large methane-leak explanation; it does not identify the real cause.

# Mission 2 - The Feedstock Problem

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 2 - 14 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE FEEDSTOCK PROBLEM

**Go now:** Go to the Atmosphere Intake and meet Ingrid Sundqvist, the production and catalyst lead, at the compressor log desk.

**Card body:** 14 work shifts remain before launch. Frost rims the compressor glass beside the next shift's fuel target. Today you decide whether to push the air intake or test the hydrogen line.

**Objective:** Determine which ingredient runs out first and whether the
carbon-dioxide intake needs repair.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 2: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m02_we01
    title: Use a mole ratio
    problem: For N₂+3H₂→2NH₃, 3 mol H₂ reacts with excess N₂. Find NH₃ produced.
    rule: 'Use the balanced coefficient ratio: n_NH3=n_H2(2/3).'
    steps:
    - 'Set up the relationship: Use the balanced coefficient ratio: n_NH3=n_H2(2/3).'
    - n_NH3=3(2/3)=2 mol.
    answer: The theoretical product amount is 2 mol NH₃.
    common_mistake: Reaction coefficients relate moles, not directly grams.
  - id: mars_m02_we02
    title: Find the limiting reactant
    problem: For 2H₂+O₂→2H₂O, mix 6 mol H₂ and 2 mol O₂.
    rule: Compare available amount divided by its reactant coefficient.
    steps:
    - hydrogen reaction units=6/2=3; oxygen reaction units=2/1=2.
    - Oxygen permits fewer reaction units; water produced=2(2)=4 mol.
    answer: O₂ limits the reaction; 2 mol H₂ remains.
    common_mistake: The reactant with fewer moles is not always limiting; coefficients matter.
  - id: mars_m02_we03
    title: Calculate percent yield
    problem: A reaction could produce 20 g of product but yields 16 g.
    rule: percent yield=actual yield/theoretical yield×100%.
    steps:
    - 'Set up the relationship: percent yield=actual yield/theoretical yield×100%.'
    - percent yield=16/20×100%=80%.
    answer: The percent yield is 80%.
    common_mistake: Reversing the ratio gives an inappropriate value above 100% here.
  - id: mars_m02_we04
    title: Convert product moles to mass
    problem: A reaction produces 2 mol CO₂. Use M_CO2=44 g/mol. Find product mass.
    rule: m=nM.
    steps:
    - 'Set up the relationship: m=nM.'
    - m=2(44)=88 g.
    answer: The product mass is 88 g.
    common_mistake: Multiplying by molar mass converts moles to grams.
  - id: mars_m02_we05
    title: Balance a reaction
    problem: Balance H₂ + O₂ → H₂O without changing chemical formulas.
    rule: Coefficients conserve each element; subscripts identify substances.
    steps:
    - Place 2 before H₂O so the product has two oxygen atoms.
    - 'Place 2 before H₂ to supply four hydrogen atoms: 2H₂ + O₂ → 2H₂O.'
    answer: Both sides contain four hydrogen atoms and two oxygen atoms.
    common_mistake: Changing H₂O to H₂O₂ would change the product.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Reactant: a starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

Product: a substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.

Coefficient: the number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.

Limiting reactant: the starting substance that runs out first. It sets the greatest amount of product the reactor can make.

#### Primer concepts

- Balance an equation before using its coefficients.
- Compare every reactant by the amount of the same product it could make; the smaller product amount identifies the limiting reactant.
- A correct calculation may rule out the easiest explanation without revealing the real fault.

#### Equations first needed today

**Equation:** CO2 + 4 H2 -> CH4 + 2 H2O  
**What it is for:** relating the plant's carbon dioxide and hydrogen feeds to methane and water production  
**Symbols:** CO2 is carbon dioxide; H2 is hydrogen; CH4 is methane; H2O is water; the numbers are mole ratios.  
**Why this campaign needs it:** The crew must learn whether Martian carbon dioxide or recycled hydrogen sets the amount of methane available for the flight home.  

**Equation:** product moles = known moles x (product coefficient / known coefficient)  
**What it is for:** calculating how much product one reactant can support  
**Symbols:** known moles is the measured reactant amount; each coefficient comes from the balanced equation.  
**Why this campaign needs it:** Converting both feeds into possible methane reveals which supply truly stops production first.  

**Crew on this mission - mission log:** Ingrid Sundqvist - production and catalyst lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

At the Atmosphere Intake, Sundqvist shows the player frost, vibration,
and a full shift's capture log. The player converts feed into
theoretical methane, discovers that CO2 could support the target, and
identifies hydrogen as the limiting reactant. The mission ends with a
real resource allocation: use scarce hydrogen to make propellant,
diagnose the shortfall, or protect restart reserve.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Atmosphere Intake \| automatic**

**Trigger:** mission_2_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** Frost rims the compressor glass beside the next shift's fuel target.

**Panel/HUD text:** MISSION 2 - THE FEEDSTOCK PROBLEM

**Dialogue bubbles -** Sundqvist: "This machine pulls carbon dioxide from the Martian air. If it cannot collect enough, the reactor cannot make the methane that takes us home. Before I push it harder, tell me whether the air supply is actually the problem."

**Unlocks:** Stop 5 at the compressor log desk.
**Beat 2 - After Stop 5 \| compressor log desk \| automatic transition**

**Trigger:** accepted_stop_5.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `intake-calculation-board`, the dated accepted-result slip for Stop 5 reads: "As listed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** CO2 MASS -\> CO2 MOLES -\> CH4 MOLES -\> CH4 MASS.

**Dialogue bubbles -** Sundqvist: "Nice work. Use the captured amount. Tell me what this intake could make before I touch the compressor."

**Unlocks:** Stop 6 at the intake control panel.
**Beat 3 - After Stop 6 \| intake control panel \| automatic reversal**

**Trigger:** accepted_stop_6.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `compressor-log-desk`, the dated accepted-result slip for Stop 6 reads: "2405 kg CH4 (2.41 x 10^3 kg to three significant figures); tolerance +/-3%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** THEORETICAL CH4: 2405 kg / REQUIRED CH4: 2000 kg / CO2 SUPPLY: SUFFICIENT.

**Dialogue bubbles -** Sundqvist: "Good thinking. Then the intake is not starving us. We have enough carbon dioxide to meet the launch target." Abiola, over radio: "That is not good news. If the air is not holding us back, something else is."

**Unlocks:** Stop 7 at the dual-feed display.
**Beat 4 - After Stop 7 \| dual-feed display \| automatic**

**Trigger:** accepted_stop_7.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `compressors`, the dated accepted-result slip for Stop 7 reads: "Choice 1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** HYDROGEN IS LIMITING METHANE PRODUCTION.

**Dialogue bubbles -** Sundqvist: "Exactly right. The Martian air was never the bottleneck. We are not getting enough hydrogen." Abiola: "You may use one diagnostic pulse, but the reactor must retain enough hydrogen to restart safely. Divide what remains."

**Unlocks:** Stop 8 at the hydrogen-allocation manifold.
**Beat 5 - At mission end \| Atmosphere Intake \| automatic outcome and hook**

**Trigger:** accepted_stop_8.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `compressor-log-desk`, Ingrid Sundqvist pins the CO2 CAPACITY: 2405 KG METHANE card above the intake log. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - HYDROGEN STORE.

**Dialogue bubbles -** Ingrid Sundqvist: "The air did its job. Something else ran out first. Therefore Herrera must trace hydrogen through the store; Ingrid cannot make fuel from surplus carbon alone."

**Waypoint:** Hydrogen Store

**Unlocks:** Mission 3 briefing and the Hydrogen Store waypoint.
### Physical aftermath — mars-m02

**Home:** `compressor-log-desk`. **Before:** The dated mission-2 evidence holder at this fixture has no accepted record. Frost rims the compressor glass beside the next shift's fuel target.
**After — exact action:** Ingrid Sundqvist pins the CO2 CAPACITY: 2405 KG METHANE card above the intake log.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `gas-sampling-ports`, the pressure needle holds steady while a sample vial changes its label.
**Segue - exact player copy:** Therefore Herrera must trace hydrogen through the store; Ingrid cannot make fuel from surplus carbon alone.

## Location plan

**One location:** Atmosphere Intake (INTAKE), using compressors and a
portable stoichiometry board. It is local and visible from Plant
Control.

## Characters and dramatic beat

Sundqvist is introduced through action: she clears ice from the sight
glass while making her case. She accepts the arithmetic when it rules
out her preferred explanation, but immediately asks the practical
question: "Then where is my hydrogen?"

## Key concepts, explained here

The balanced Sabatier reaction is CO2 + 4 H2 -\> CH4 + 2 H2O.
Coefficients are mole ratios, not mass ratios. A limiting reactant is
the feed that can make the smaller amount of product; excess reactant
remains. Theoretical yield comes from the limiting reactant, while
percent yield compares actual product with that theoretical maximum.

### Character scene: mars-ingrid-entrance

**Trigger:** On arrival at Atmosphere Intake during Mission 2, when Stop 5 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `intake-calculation-board` in Atmosphere Intake. Ingrid Sundqvist, production and catalyst lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Scrapes frost from the compressor sight glass before discussing production targets.
**Exact dialogue:**
- Ingrid Sundqvist, production and catalyst lead: “I need an explanation for lost output that the production crew can test.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-ingrid-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 5 - The production workflow

**Format/placement:** SEQUENCE, at `intake-calculation-board`.

**Metadata:** Concept: 2 - stoichiometric workflow; Keystone: balancing and stoichiometry; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the intake calculation board, in Atmosphere Intake.

**Stop reason - exact player copy:** The carbon ledger is nearly closed, shifting attention to how captured feed becomes product.

**Question card story setup - exact player copy:** To test whether the air intake causes the shortage, first arrange the Sabatier conversion from captured carbon-dioxide mass to possible methane mass.

**Question card story-science connection - exact player copy:** The production chain connects the air-capture record to the methane yield the reactor could actually deliver.

**Question card prompt - exact player copy:** Order the workflow for
converting captured CO2 mass into theoretical CH4 mass.

**Cards:** Balance the equation / Convert CO2 mass to moles / Use the
CO2:CH4 mole ratio / Convert CH4 moles to mass / Compare with the
production target.

**Correct result:** As listed.

**Answer text:** Balance, convert CO2 mass to moles, apply the mole ratio, and convert methane moles to mass.

**Why:** Stoichiometric coefficients connect moles. Molar mass is the
bridge between a scale and that ratio. In this reaction the CO2:CH4 mole
ratio is 1:1, but their masses are not equal because 44.01 g CO2 and
16.04 g CH4 are one mole each.

**Wrong-path feedback:** If the player applies a coefficient to
kilograms, show unit mismatch. If they compare before converting product
to mass, point out that the schedule is a mass target.

**State/output:** Unlock theoretical-yield panel.

## Stop 6 - Could today's air make enough methane?

**Format/placement:** BALLPARK, at `compressor-log-desk`.

**Metadata:** Concept: 3 - theoretical yield; Keystone: balancing and stoichiometry; Area: Reactor Hall; Learning role: PRACTICE; Difficulty: L2; Story role: reversal.

**Call - exact player copy:** Go to the compressor log desk, in Atmosphere Intake.

**Stop reason - exact player copy:** The production steps are identified and today's captured feed needs a methane-yield estimate.

**Question card story setup - exact player copy:** The carbon-dioxide shipment sets one ceiling on methane production. Its mass cannot be copied straight onto the fuel ledger.

**Question card prompt - exact player copy:** The reaction yields one mole CH₄ per mole CO₂. Convert 6.60×10⁶ g CO₂ to kg CH₄ using molar masses 44.01 and 16.04 g/mol. Fill feed mass and the two molar masses in that order.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Could today's air make enough methane?",
    "labels": [
      "6600000",
      "44.01",
      "16.04",
      "1000"
    ],
    "values": [
      6600000.0,
      44.01,
      16.04,
      1000
    ],
    "slots": 3,
    "template": "{a} / {b} × {c} / 1000 = ? kg CH₄",
    "formula": "a/b*c/1000",
    "correct": [
      0,
      1,
      2
    ],
    "target": 2405.36,
    "tolerance": 72.16,
    "units": "kg CH₄",
    "correctResult": 2405.36
  },
  "answerText": "The carbon-limited yield is about 2,405 kg methane. The one-to-one relationship is in moles, not grams.",
  "wrongFeedback": [
    "Use CO₂ molar mass to find input moles, then CH₄ molar mass to find product mass."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The carbon-limited yield is about 2,405 kg methane. The one-to-one relationship is in moles, not grams.

**Wrong-path feedback:** Use CO₂ molar mass to find input moles, then CH₄ molar mass to find product mass.

**State/output:** Set evidence_flags.co2_sufficient = true; Sundqvist
turns off the proposed compressor overdrive.

## Stop 7 - Which feed runs out first?

**Format/placement:** CHOICE, asked at Ingrid Sundqvist beside `compressors`.

**Metadata:** Concept: 3 - limiting reactant; Keystone: limiting reactant; Area: Reactor Hall; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Talk to Ingrid Sundqvist, at the compressor platform in Atmosphere Intake.

**Stop reason - exact player copy:** The air-based yield is known, but another reactant may run out before that ceiling is reached.

**Question card story setup - exact player copy:** Because the carbon-dioxide supply could meet the target, compare carbon dioxide and hydrogen to find which ingredient stops methane production first.

**Question card story-science connection - exact player copy:** Identifying the limiting feed directs the repair effort toward the supply that actually constrains methane output.

**Question card prompt - exact player copy:** Which reactant limits
methane production, and how much CH4 can it support?

**Choices:**

1.  H2 limits; 520/4 = 130 kmol CH4. **(correct)**

2.  CO2 limits; 150 kmol CO2 makes 150 kmol CH4.

3.  H2 limits; 520 kmol H2 makes 520 kmol CH4.

4.  Neither limits because both feeds are present.

**Correct result:** Choice 1.

**Answer text:** Hydrogen is limiting and supports 130 kmol CH4.

**Why:** Test each reactant through the balanced equation. CO2 could
make 150 kmol CH4. H2 must be divided by four and can make only 130
kmol. The smaller product amount wins, so H2 is limiting and 20 kmol CO2
can remain.

**Wrong-path feedback:** (2) It ignores the smaller H2-supported yield.
(3) It ignores the coefficient four. (4) A reaction can have both feeds
present and still be limited by one.

**State/output:** Set evidence_flags.h2_limiting = true; radio Herrera
requesting raw H2 delivery data.

## Stop 8 - Spend the hydrogen you have

**Format/placement:** ALLOCATE, operated at `intake-bypass-manifold`.

**Metadata:** Concept: 3 - limiting reactant under constraints; Keystone: limiting reactant; Area: Reactor Hall; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Call - exact player copy:** Go to the intake bypass manifold, in Atmosphere Intake.

**Stop reason - exact player copy:** Hydrogen is limited and must cover production, a diagnostic tracer, and protected reserve.

**Question card story setup - exact player copy:** The hydrogen release must support a diagnostic pulse without losing restart capacity. The crew can choose how much of the remaining gas to use for production.

**Decision evidence - exact player copy:** The base tracer procedure includes its required line preparation. The purge item is additional capacity, not permission to omit a required safety step; it is optional in this allocation. No methane-production minimum is required for this diagnostic decision.

**Question card prompt - exact player copy:** Allocate no more than 80 kmol H₂ in 4-kmol steps. Reserve at least 8 for the tracer and 16 for restart; production may receive 0–56 and the optional purge upgrade 0–8. Submit any feasible allocation; unassigned gas remains in store.

**Complete format-specific interaction block - canonical source:**

```json
{
  "allocate": {
    "pool": {
      "value": 80,
      "unit": "kmol H₂"
    },
    "items": [
      {
        "id": "production",
        "label": "Interim methane production",
        "min": 0,
        "max": 56,
        "step": 4
      },
      {
        "id": "tracer",
        "label": "Diagnostic tracer pulse",
        "min": 8,
        "max": 16,
        "step": 4
      },
      {
        "id": "restart",
        "label": "Restart reserve",
        "min": 16,
        "max": 24,
        "step": 4
      },
      {
        "id": "purge",
        "label": "Optional purge-capacity upgrade",
        "min": 0,
        "max": 8,
        "step": 4
      }
    ],
    "public_rule": "All bounds and 4-kmol steps hold; total<=80. Accept every feasible allocation.",
    "example_allocation": {
      "production": 56,
      "tracer": 8,
      "restart": 16,
      "purge": 0
    }
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** Any allocation satisfying the visible bounds and total is valid; 56/8/16/0 is one example.

**Answer text:** The tracer minimum provides a resolvable pulse and the restart minimum preserves recovery. In the example, 56 kmol H₂ supports 14 kmol CH₄ at four H₂ per CH₄; other feasible distributions are allowed.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Set diagnostic_h2_reserved = true; hydrogen_reserve -
8; unlock Hydrogen Store route for Mission 3.

## Mission outcome

Mission decision: Do not push the air intake. Test the hydrogen line instead. The captured carbon dioxide could make 2405 kg of methane, more than this shift needs. Hydrogen runs out first. A test pulse now moves toward the Hydrogen Store.

**Segue - exact player copy:** Therefore Herrera must trace hydrogen through the store; Ingrid cannot make fuel from surplus carbon alone.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ingrid Sundqvist pins the CO2 CAPACITY: 2405 KG METHANE card above the intake log. Therefore Herrera must trace hydrogen through the store; Ingrid cannot make fuel from surplus carbon alone.

**Header:** MISSION 2 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 06:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The compressor stays at normal power and hydrogen, not
carbon dioxide, is identified as the bottleneck.

**Automatic bar change:** Methane 0 \| Oxygen 0 \| Power +3 \| Integrity
+2

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +6. Result: METHANE 88% \| OXYGEN 88%
\| POWER 85% \| INTEGRITY 76%. Recovery Bank: 4 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Sabatier reaction:** combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- **Excess reactant:** a starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- **Theoretical yield:** the greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

### Review question 1


**Prompt - exact player copy:** Which statement best explains sabatier reaction?

**Options - exact player copy:**

- A. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- B. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- C. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- D. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for sabatier reaction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes excess reactant. It does not answer the question about sabatier reaction.
- B: This describes theoretical yield. It does not answer the question about sabatier reaction.
- C: This describes reactant. It does not answer the question about sabatier reaction.
- D: Correct. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.

### Review question 2


**Prompt - exact player copy:** Which statement best explains excess reactant?

**Options - exact player copy:**

- A. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- B. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.
- C. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- D. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for excess reactant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- B: This describes sabatier reaction. It does not answer the question about excess reactant.
- C: This describes theoretical yield. It does not answer the question about excess reactant.
- D: This describes reactant. It does not answer the question about excess reactant.

### Review question 3


**Prompt - exact player copy:** Which statement best explains theoretical yield?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.
- B. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- C. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for theoretical yield. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sabatier reaction. It does not answer the question about theoretical yield.
- B: Correct. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- C: This describes excess reactant. It does not answer the question about theoretical yield.
- D: This describes reactant. It does not answer the question about theoretical yield.

### Review question 4


**Prompt - exact player copy:** Which statement best explains reactant?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.
- B. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- C. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for reactant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sabatier reaction. It does not answer the question about reactant.
- B: This describes excess reactant. It does not answer the question about reactant.
- C: Correct. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- D: This describes theoretical yield. It does not answer the question about reactant.

### Review question 5


**Prompt - exact player copy:** Which statement best explains product?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.
- B. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- C. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- D. A substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for product. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sabatier reaction. It does not answer the question about product.
- B: This describes excess reactant. It does not answer the question about product.
- C: This describes theoretical yield. It does not answer the question about product.
- D: Correct. A substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.

### Review question 6


**Prompt - exact player copy:** Which statement best explains coefficient?

**Options - exact player copy:**

- A. The number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.
- B. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction a fuel plant uses to make the operator's fuel.
- C. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for coefficient. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.
- B: This describes sabatier reaction. It does not answer the question about coefficient.
- C: This describes excess reactant. It does not answer the question about coefficient.
- D: This describes theoretical yield. It does not answer the question about coefficient.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Equation coefficients are mole ratios, not mass ratios.

- Convert mass to moles before using coefficients, then convert back if
  needed.

- The limiting reactant is the one that predicts less product.

- Excess reactant can remain even when production stops.

- **Mission takeaway:** Scarce diagnostic material creates a real trade-off between learning and output.

# Mission 3 - Pressure Does Not Lie. Or Does It?

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 3 - 13 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** PRESSURE DOES NOT TELL THE WHOLE TRUTH

**Go now:** Go to the Hydrogen Store and meet Dr. Tomás Herrera, the reactor and safety engineer, beside the storage gauge.

**Card body:** Thirteen shifts remain before launch. The pressure holds, but the gas sample has changed. Today you decide if the hydrogen line leaks or holds a second gas.

**Objective:** Find where usable hydrogen is lost even though the main
pressure gauge looks normal.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 3: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m03_we01
    title: Find ideal-gas volume
    problem: An ideal gas has n=1 mol, T=300 K and P=3 atm. Use rounded R=0.08 L atm/(mol K).
    rule: PV=nRT.
    steps:
    - 'Set up the relationship: PV=nRT.'
    - V=nRT/P=1(0.08)(300)/3=8 L.
    answer: The volume is 8 L with the supplied rounded constant.
    common_mistake: Use absolute temperature in kelvins.
  - id: mars_m03_we02
    title: Warm a fixed-volume gas
    problem: A sealed ideal-gas sample has pressure 20 atm at 300 K. Find its pressure at 330 K if no reaction occurs.
    rule: At fixed amount and volume, P₂/P₁=T₂/T₁.
    steps:
    - 'Set up the relationship: At fixed amount and volume, P₂/P₁=T₂/T₁.'
    - P₂=20(330/300)=22 atm.
    answer: The predicted pressure is 22 atm.
    common_mistake: Adding 30 to the pressure confuses temperature change with pressure change.
  - id: mars_m03_we03
    title: Find a partial pressure
    problem: An ideal-gas mixture is 25% helium by mole and has total pressure 8 atm.
    rule: P_He=x_He P_total.
    steps:
    - 'Set up the relationship: P_He=x_He P_total.'
    - P_He=0.25(8)=2 atm.
    answer: Helium contributes 2 atm.
    common_mistake: Use mole fraction, not mass fraction.
  - id: mars_m03_we04
    title: Compare energy and speed
    problem: Helium and neon gases have the same temperature. Neon atoms have about five times the mass. Compare average translational kinetic energy and typical speed.
    rule: Mean translational kinetic energy depends on absolute temperature; root-mean-square speed is proportional to 1/√m.
    steps:
    - The two gases have equal mean translational kinetic energy.
    - speed_He/speed_Ne=√5, so helium atoms move faster on this measure.
    answer: Equal temperature means equal mean kinetic energy, not equal speed.
    common_mistake: Heavier particles need a lower speed to have the same kinetic energy.
  - id: mars_m03_we05
    title: Add partial pressures
    problem: An ideal mixture has partial pressures 2 atm, 3 atm and 1 atm. Find total pressure.
    rule: P_total=ΣP_i.
    steps:
    - 'Set up the relationship: P_total=ΣP_i.'
    - P_total=2+3+1=6 atm.
    answer: The total pressure is 6 atm.
    common_mistake: Do not average the partial pressures.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Pressure: force spread over an area, caused here by gas particles striking the tank walls. Total pressure can stay high even when the wrong gas is inside.

Volume: the amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.

Kinetic energy: energy an object has because it moves. At the same temperature, different gases have the same average kinetic energy even though lighter particles move faster.

Partial pressure: one gas's share of the total pressure. It measures how much that gas contributes even when the gauge shows only the total.

#### Primer concepts

- A gauge measures total pressure, not chemical identity.
- At fixed volume, warming a sealed gas raises its pressure in proportion to absolute temperature.
- A model must predict a new measurement before the measurement is made.

#### Equations first needed today

**Equation:** pressure times volume, `P V = nRT`  
**What it is for:** finding the total amount of gas from pressure, volume, and temperature  
**Symbols:** P is pressure; V is volume; n is moles of gas; R is the gas constant; T is absolute temperature in kelvin.  
**Why this campaign needs it:** The storage gauge can reveal the total gas amount but cannot prove how much of that gas is usable hydrogen.  

**Equation:** component pressure = mole fraction x total pressure  
**What it is for:** finding one gas's pressure inside a mixture  
**Symbols:** component pressure is the partial pressure; mole fraction is that gas's share; total pressure is the gauge reading.  
**Why this campaign needs it:** Hydrogen can fall below the reactor's need while nitrogen keeps the total-pressure gauge looking normal.  

**Equation:** P2 = P1 x (T2 / T1), for fixed gas amount and volume  
**What it is for:** predicting how a sealed gas responds to warming  
**Symbols:** P1 and P2 are the starting and final pressures; T1 and T2 are the starting and final temperatures in kelvin.  
**Why this campaign needs it:** A committed warming prediction tests the pressure model while the composition reading tests the simple-leak story.  

**Crew on this mission - mission log:** Dr. Tomás Herrera - reactor and safety engineer; Ingrid Sundqvist - production and catalyst lead.



## Main story happening - designer summary

The player uses kinetic molecular theory, the ideal gas law, and partial
pressure to separate total gas from gas identity. A probe reveals normal
total pressure but too little hydrogen in one branch. A controlled
temperature prediction fails the simple-leak model and establishes the
second major clue for Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Hydrogen Store \| automatic**

**Trigger:** mission_3_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The pressure needle holds steady while a sample vial changes its label.

**Panel/HUD text:** MISSION 3 - PRESSURE DOES NOT LIE. OR DOES IT?

**Dialogue bubbles -** Herrera: "The gauge measures everything pushing on the tank wall. It does not know which gas is doing the pushing. Before anyone clears this system, prove how much of that pressure belongs to hydrogen."

**Unlocks:** Stop 9 at the tank calculation rail; Stop 10 unlocks immediately after Stop 9.
**Beat 2 - After Stops 9 and 10 \| tank calculation rail \| automatic response**

**Trigger:** accepted_stop_9.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `store-scales`, the dated accepted-result slip for Stop 9 reads: "Choice 1.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 11: SAMPLE THE BRANCHES

**Dialogue bubbles -** Herrera: "Nice work. The total amount is plausible. That still does not make it usable hydrogen. Sample the line from the tank to the reactor."

**Unlocks:** Stop 11 at the four sampling ports.
**Beat 3 - After Stop 11 \| four sampling ports \| automatic discovery**

**Trigger:** accepted_stop_10.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `hydrogen-calculation-desk`, the dated accepted-result slip for Stop 10 reads: "400 mol total gas; target 400, tolerance ±2%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** TOTAL PRESSURE: NORMAL / H2 PARTIAL PRESSURE: LOW / N2 DETECTED AFTER PURGE TIE-IN.

**Dialogue bubbles -** Herrera: "Good thinking. There. The gauge did not lie. We asked it the wrong question."

**Unlocks:** Stop 12 at the heated test branch.
**Beat 4 - After Stop 12 \| heated test branch \| automatic contradiction**

**Trigger:** accepted_stop_11.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `gas-sampling-ports`, the dated accepted-result slip for Stop 11 reads: "The reactor branch is abnormal; at 19.5 atm its H2 partial pressure is only 0.68 x 19.5 = 13.3 atm.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Herrera: "Exactly right. A leak can remove gas. It cannot add nitrogen to a sealed branch. The simple-leak model fails."

**Unlocks:** The Mission 3 outcome beat.
**Beat 5 - At mission end \| Hydrogen Store \| automatic outcome and hook**

**Trigger:** accepted_stop_12.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `gas-sampling-ports`, Dr. Tomás Herrera hangs a NITROGEN AFTER REGULATOR tag on the reactor-branch port. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - CATALYST BAY.

**Dialogue bubbles -** Dr. Tomás Herrera: "Pressure counts every gas in the tube. But Cho finds blue stain beside a methane valve; its route must be tested before it becomes a second leak story."

**Waypoint:** Catalyst Bay

**Unlocks:** Mission 4 briefing and the Catalyst Bay waypoint.
### Physical aftermath — mars-m03

**Home:** `gas-sampling-ports`. **Before:** The dated mission-3 evidence holder at this fixture has no accepted record. The pressure needle holds steady while a sample vial changes its label.
**After — exact action:** Dr. Tomás Herrera hangs a NITROGEN AFTER REGULATOR tag on the reactor-branch port.
**Trigger:** accepted_stop_12. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `separation-cartridge`, a blue swab rests beside a clear dry-line cartridge.
**Segue - exact player copy:** But Cho finds blue stain beside a methane valve; its route must be tested before it becomes a second leak story.

## Location plan

**One location:** Hydrogen Store (HSTORE), using store-scales, branch
ports, and the tank jacket heater. No travel to the distant plant edge.

## Characters and dramatic beat

Herrera is introduced by asking for timestamps and composition, not by
explaining himself. He is precise and slightly secretive. Sundqvist
arrives late, sees a normal gauge, and calls the line healthy; the
player's data forces both experts to pause.

## Key concepts, explained here

At the same absolute temperature, different gases have the same average
kinetic energy, but lighter molecules move faster on average. The ideal
gas law PV = nRT gives total gas moles and cannot identify the gas.
Dalton's law says total pressure is the sum of partial pressures, and a
component's partial pressure equals its mole fraction times total
pressure. A tank can therefore hold normal pressure with too little of
the desired gas if another gas replaces it.

### Character scene: mars-herrera-entrance

**Trigger:** On arrival at Hydrogen Store during Mission 3, when Stop 9 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `store-scales` in Hydrogen Store. Dr. Tomás Herrera, reactor and safety engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Requests the raw sensor timestamps at Hydrogen Store while the leak argument continues.
**Exact dialogue:**
- Dr. Tomás Herrera, reactor and safety engineer: “I am responsible for that reactor’s thermal limit; give me the raw record before we decide what happened.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-herrera-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 9 - Same temperature, different speed

**Format/placement:** CHOICE, asked at Dr. Tomás Herrera beside `store-scales`.

**Metadata:** Concept: 4 - kinetic molecular theory; Keystone: gas behavior and partial pressure; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Call - exact player copy:** Talk to Dr. Tomás Herrera, at the store scales in Hydrogen Store.

**Stop reason - exact player copy:** A normal pressure reading is being used to dismiss a possible gas-composition problem.

**Question card story setup - exact player copy:** Before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity.

**Question card story-science connection - exact player copy:** The speed and kinetic-energy distinction explains why hydrogen transport can differ even when gases share a temperature.

**Question card prompt - exact player copy:** Which statement is
correct?

**Choices:**

1.  They have the same average kinetic energy, but H2 has the greater
    average speed. **(correct)**

2.  H2 has less kinetic energy and the same average speed as N2.

3.  H2 has more kinetic energy because it moves faster.

4.  N2 has more kinetic energy because each molecule is heavier.

**Correct result:** Choice 1.

**Answer text:** At one temperature, gases share average kinetic energy, while lighter hydrogen molecules move faster.

**Why:** Average kinetic energy depends only on absolute temperature.
Since KE = 1/2 mv^2, a lighter particle must have a greater
characteristic speed to share the same average kinetic energy as a
heavier one.

**Wrong-path feedback:** (2) Equal temperature gives the same average kinetic energy, not less kinetic energy for H2; lighter H2 must move faster than N2. (3) Faster motion does not mean greater average kinetic energy when the moving particle has less mass. (4) Greater molecular mass does not give N2 greater average kinetic energy at the same temperature.

**State/output:** Herrera reveals the branch could be contaminated by
nitrogen purge gas.

## Stop 10 - How many total moles are in the branch?

**Format/placement:** BALLPARK, at `hydrogen-calculation-desk`.

**Metadata:** Concept: 4 - ideal gas law; Keystone: gas behavior and partial pressure; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the hydrogen calculation desk, in Hydrogen Store.

**Stop reason - exact player copy:** The pressure reading cannot establish composition, so the branch first needs a total-mole baseline.

**Question card story setup - exact player copy:** The gas vessel’s gauge readings are ready. The crew needs a mole count to compare this store with the reaction demand.

**Question card prompt - exact player copy:** Use PV=nRT with P=24.6 atm, V=400 L, R=0.082 L·atm/(mol·K), and T=300 K. Fill P,V,R,T.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "How many total moles are in the branch?",
    "labels": [
      "24.6",
      "400",
      "0.082",
      "300",
      "273"
    ],
    "values": [
      24.6,
      400,
      0.082,
      300,
      273
    ],
    "slots": 4,
    "template": "{a} × {b} / ({c} × {d}) = ? mol",
    "formula": "a*b/(c*d)",
    "correct": [
      0,
      1,
      2,
      3
    ],
    "target": 400,
    "tolerance": 8,
    "units": "mol",
    "correctResult": 400
  },
  "answerText": "n=24.6×400/(0.082×300)=400 mol. The gas constant matches litres, atmospheres and kelvin.",
  "wrongFeedback": [
    "Use the given absolute temperature; 273 K is not the vessel temperature."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** n=24.6×400/(0.082×300)=400 mol. The gas constant matches litres, atmospheres and kelvin.

**Wrong-path feedback:** Use the given absolute temperature; 273 K is not the vessel temperature.

**State/output:** Set evidence_flags.total_moles_normal = true.

## Stop 11 - Sample the branches

**Format/placement:** PROBE, operated at `gas-sampling-ports`.

**Metadata:** Concept: 4 - Dalton's law and composition; Keystone: gas behavior and partial pressure; Area: Reactor Hall; Learning role: APPLY; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the gas sampling ports, in Hydrogen Store.

**Stop reason - exact player copy:** The total inventory is established and samples from successive ports can locate the abnormal branch.

**Question card story setup - exact player copy:** Four sampling ports show gas pressure and composition along the hydrogen supply route. The readings include each port's hydrogen fraction, so equal gauge pressures need not mean equal usable hydrogen.

**Question card story-science connection - exact player copy:** The composition and partial-pressure profile identifies where usable hydrogen first falls below the expected mixture.

**Question card prompt - exact player copy:** Probe all four ports and name
where the pattern breaks.

**Complete format-specific interaction block:**

```yaml
probe:
  chainLabel: "Sampling port"
  stations:
    - id: tank
      label: "Tank headspace"
      reading: "20.0 atm; 96% H2; 3% N2; 1% other"
      expected: "Hydrogen-rich storage gas near the tank baseline: about 95-96% H2 and no large N2 fraction"
      load: "Matches the storage baseline"
    - id: regulator
      label: "Regulator outlet"
      reading: "19.7 atm; 95% H2; 4% N2; 1% other"
      expected: "Composition should remain close to the tank headspace through a healthy regulator"
      load: "Still within the expected hydrogen-rich pattern"
    - id: transfer_line
      label: "Transfer line upstream of purge tie-in"
      reading: "19.6 atm; 95% H2; 4% N2; 1% other"
      expected: "Hydrogen composition should still match the regulator before the purge connection"
      load: "Still normal immediately before the purge tie-in"
    - id: reactor_branch
      label: "Reactor branch"
      reading: "19.5 atm; 68% H2; 31% N2; 1% other; H2 partial pressure 13.3 atm"
      expected: "Hydrogen should remain near the regulator composition; a simple pressure drop should not create a 31% N2 fraction"
      load: "First major composition break; nitrogen replaces hydrogen while total pressure stays nearly normal"
  target: reactor_branch
  minReadings: 4
  commit: "Name the first abnormal port"
```

**Stations/readings:** Tank headspace: 20.0 atm, 96% H2. Regulator
outlet: 19.7 atm, 95% H2. Transfer line upstream of the purge tie-in:
19.6 atm, 95% H2. Reactor branch: 19.5 atm, 68% H2, 31% N2, 1% other.

**Correct result:** The reactor branch is abnormal; at 19.5 atm its H2
partial pressure is only 0.68 x 19.5 = 13.3 atm.

**Answer text:** The reactor branch first fails; hydrogen partial pressure there is about 13.3 atm.

**Why:** Total pressure is the sum of component pressures. The branch
gauge stays high because nitrogen contributes pressure. The desired H2
partial pressure has fallen even though the needle barely moves.
Sampling every station localizes the change between regulator outlet and
reactor branch.

**Wrong-path feedback:** Selecting the largest total-pressure drop
misses composition. Committing before all four readings should
explicitly say one station remains unmeasured.

**State/output:** Set evidence_flags.branch_mixture_wrong = true;
visually highlight purge tie-in between ports 2 and 3.

## Stop 12 - Test the simple-leak prediction

**Format/placement:** VERIFY, operated at `jacket-heater-logger`.

**Metadata:** Concept: 4 - combined gas law/model testing; Keystone: gas behavior and partial pressure; Area: Reactor Hall; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the jacket heater and pressure logger, in Hydrogen Store.

**Stop reason - exact player copy:** The abnormal composition needs comparison with the response predicted by a simple leak model.

**Question card story setup - exact player copy:** A sealed, fixed-volume branch sample starts at P1 = 21 atm and T1 = 300 K and is warmed to T2 = 330 K. For unchanged gas amount with no reaction, P2/P1 = T2/T1; composition is measured separately.

**Question card story-science connection - exact player copy:** The pressure-temperature test shows whether a normal pressure response is enough to explain away the mixture evidence.

**Question card prompt - exact player copy:** Predict the final pressure in atm, then compare the measured pressure and composition with the no-reaction model.

**Complete format-specific interaction block:**

```yaml
verify:
  prediction:
    prompt: "Predict pressure at 330 K for a sealed fixed-volume sample starting at 21 atm and 300 K."
    formula: "P2 = P1(T2/T1)"
    correct: 23.1
    unit: atm
    tolerance: 0.2
  action: {id: warm_branch, label: "Warm sealed branch", from_K: 300, to_K: 330}
  measurement:
    pressure_atm: 23.1
    composition: {h2_percent: 68, n2_percent: 31, other_percent: 1}
  required_sequence: [commit_prediction, warm_branch, measure_pressure, measure_composition]
  truth: "Pressure model passes; pure-hydrogen leak model fails on unchanged nitrogen-rich composition."
```

**Prediction:** P2 = P1(T2/T1) = 21 × (330/300) = 23.1 atm; acceptable 22.9-23.3 atm.

**Measured update:** Total pressure 23.1 atm (prediction passes), but
composition remains 68% H2 / 31% N2, incompatible with a pure-H2 leak
from a previously pure line.

**Correct result:** The gas-law pressure response is normal, but the
simple leak explanation fails on composition; the branch contains a
substituted mixture.

**Answer text:** Pressure follows the gas-law prediction, but nitrogen in the mixture defeats the simple-leak explanation.

**Why:** Warming a sealed gas tests whether the total particle count
behaves normally. It does, so the gauge and volume are credible.
Composition is a separate measurement. A leak can lower particle count,
but it does not by itself explain nitrogen appearing downstream of a 95%
H2 regulator outlet.

**Wrong-path feedback:** Measuring without a prediction should not
count. Calling the leak model confirmed from pressure alone ignores the
second observable.

**State/output:** Set evidence_flags.simple_leak_fails = true; Casebook
adds NORMAL PRESSURE, WRONG GAS.

## Mission outcome

Mission decision: Another gas mixes into the line before the reactor. The plant is not just losing hydrogen. Nitrogen keeps total pressure high as the share from hydrogen falls. The change starts after the regulator. The blue stain near a methane valve is the next clue to test.

**Segue - exact player copy:** But Cho finds blue stain beside a methane valve; its route must be tested before it becomes a second leak story.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Dr. Tomás Herrera hangs a NITROGEN AFTER REGULATOR tag on the reactor-branch port. But Cho finds blue stain beside a methane valve; its route must be tested before it becomes a second leak story.

**Header:** MISSION 3 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 06:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The diagnostic pulse consumes power, but the
contaminated hydrogen branch is isolated.

**Automatic bar change:** Methane -2 \| Oxygen 0 \| Power -3 \|
Integrity +5

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +6. Result: METHANE 90% \| OXYGEN 88%
\| POWER 88% \| INTEGRITY 81%. Recovery Bank: 6 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Absolute temperature:** measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- **Mixture:** contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- **Composition:** states which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- **Mole fraction:** the part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

### Review question 1


**Prompt - exact player copy:** Which statement best explains absolute temperature?

**Options - exact player copy:**

- A. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- B. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- D. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for absolute temperature. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes mixture. It does not answer the question about absolute temperature.
- B: Correct. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C: This describes composition. It does not answer the question about absolute temperature.
- D: This describes mole fraction. It does not answer the question about absolute temperature.

### Review question 2


**Prompt - exact player copy:** Which statement best explains mixture?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for mixture. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absolute temperature. It does not answer the question about mixture.
- B: This describes composition. It does not answer the question about mixture.
- C: Correct. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D: This describes mole fraction. It does not answer the question about mixture.

### Review question 3


**Prompt - exact player copy:** The gas mixture contains only the three species shown. What percentage of its molecules are nitrogen?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Mole fraction",
  "caption": "Composition of a three-gas mixture",
  "bars": [
    {
      "name": "Hydrogen",
      "value": 0.72
    },
    {
      "name": "Nitrogen",
      "value": 0.18
    },
    {
      "name": "Carbon dioxide",
      "value": 0.1
    }
  ]
}
```

**Options - exact player copy:**

- A. 72%.
- B. 10%.
- C. 28%.
- D. 18%.

**Correct answer:** D

**Hint - exact player copy:** Convert the nitrogen mole fraction to a percentage.

**Option feedback - exact player copy:**

- A: 72% is the hydrogen fraction.
- B: 10% is the carbon-dioxide fraction.
- C: 28% combines nitrogen and carbon dioxide.
- D: Correct. 18%.

### Review question 4


**Prompt - exact player copy:** Which statement best explains mole fraction?

**Options - exact player copy:**

- A. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.
- B. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for mole fraction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.
- B: This describes absolute temperature. It does not answer the question about mole fraction.
- C: This describes mixture. It does not answer the question about mole fraction.
- D: This describes composition. It does not answer the question about mole fraction.

### Review question 5


**Prompt - exact player copy:** Which statement best explains pressure?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. Force spread over an area, caused in a gas by particles striking the container walls. Total pressure can stay high even when the wrong gas is inside.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for pressure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absolute temperature. It does not answer the question about pressure.
- B: Correct. Force spread over an area, caused in a gas by particles striking the container walls. Total pressure can stay high even when the wrong gas is inside.
- C: This describes mixture. It does not answer the question about pressure.
- D: This describes composition. It does not answer the question about pressure.

### Review question 6


**Prompt - exact player copy:** Which statement best explains volume?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- C. The amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for volume. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absolute temperature. It does not answer the question about volume.
- B: This describes mixture. It does not answer the question about volume.
- C: Correct. The amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.
- D: This describes composition. It does not answer the question about volume.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Equal temperature means equal average kinetic energy, not equal
  molecular speed.

- PV = nRT counts total gas moles but does not identify them.

- Total pressure can look normal while a component's partial pressure is
  low.

- Pi = Xi Ptotal connects mole fraction and partial pressure.

- **Mission takeaway:** A model must survive every relevant measurement, not only the one it predicts correctly.

# Mission 4 - What Can Travel Where?

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 4 - 12 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** WHAT CAN TRAVEL WHERE?

**Go now:** Go to Catalyst Bay and meet Mei-Ling Cho, the water and cryogenics engineer, beside the covered blue stain.

**Card body:** 12 work shifts remain before launch. A blue swab rests beside a clear dry-line cartridge. Today you decide whether the blue stain could travel down the methane line.

**Objective:** Determine whether the blue residue could have traveled
through the suspected methane-leak path.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 4: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m04_we01
    title: Count valence electrons
    problem: How many valence electrons appear in the Lewis structure of NH₃? Nitrogen contributes five and hydrogen one each.
    rule: Total valence electrons are summed over atoms, with charge adjustments if needed.
    steps:
    - electron total=5+3(1)=8.
    - Three single bonds use six electrons; two remain as one lone pair on nitrogen.
    answer: NH₃ has three N-H bonds and one nitrogen lone pair.
    common_mistake: Counting bonds alone misses nonbonding electrons.
  - id: mars_m04_we02
    title: Distinguish electron and molecular geometry
    problem: A central atom has three bonding pairs and one lone pair. Determine molecular shape.
    rule: Four electron domains arrange approximately tetrahedrally; molecular shape describes atom positions.
    steps:
    - electron-domain count=3+1=4.
    - One domain is a lone pair, leaving three bonded atoms in a trigonal-pyramidal arrangement.
    answer: The molecular shape is trigonal pyramidal.
    common_mistake: Tetrahedral describes the electron-domain geometry in this case.
  - id: mars_m04_we03
    title: Combine bond dipoles
    problem: CO₂ is linear with two identical polar C=O bonds. Is the molecule polar?
    rule: Molecular polarity depends on the vector sum of bond dipoles.
    steps:
    - The equal bond dipoles point in opposite directions.
    - net dipole=0 because the two contributions cancel.
    answer: CO₂ is nonpolar despite its polar bonds.
    common_mistake: Polar bonds do not guarantee a polar molecule.
  - id: mars_m04_we04
    title: Identify hydrogen bonding
    problem: Compare pure CH₄ and pure H₂O. Which can form hydrogen bonds between its molecules?
    rule: Hydrogen bonding requires suitable donors, commonly H bonded to N, O or F, and an acceptor lone pair.
    steps:
    - Water supplies O-H donors and oxygen lone-pair acceptors.
    - Methane has C-H bonds and does not supply the corresponding donor arrangement.
    answer: Water forms hydrogen bonds; methane primarily has dispersion attractions.
    common_mistake: Hydrogen in a formula alone does not establish hydrogen bonding.
  - id: mars_m04_we05
    title: Distinguish boiling from bond breaking
    problem: When liquid water boils without reacting, which attractions are mainly overcome?
    rule: A phase change rearranges molecules without changing their chemical identities.
    steps:
    - Water molecules separate farther from one another.
    - Intermolecular attractions are overcome while O-H covalent bonds remain in the molecules.
    answer: Boiling mainly overcomes intermolecular attractions.
    common_mistake: Breaking O-H bonds would be a chemical change, not ordinary boiling.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Valence electron: an electron in an atom's outer occupied region. These electrons are the ones most directly involved in chemical bonds.

Lone pair: a pair of valence electrons not shared in a bond. Lone pairs still repel other electron groups and can change molecular shape.

Polarity: an uneven distribution of electrical charge. A molecule is polar when its bond effects do not cancel across its shape.

Intermolecular force: an attraction between separate particles. Stronger attractions usually make a substance harder to separate into a gas.

#### Primer concepts

- Use this chain: Lewis structure -> geometry -> bond effects -> molecular polarity -> intermolecular behavior.
- Similar colors do not prove two residues are the same substance.
- A proposed travel path must agree with the substance's phase and attractions at every temperature along the path.

#### Equations first needed today

No new numerical equation is introduced. These lessons use structural models and observed separator behavior rather than arithmetic.

**Crew on this mission - mission log:** Mei-Ling Cho - water and cryogenics engineer; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

In Catalyst Bay, a maintenance residue seems to connect the hydrogen
purge problem to the supposed methane leak. The player identifies
candidate structures and operates a temperature separation test. The
residue is a polar glycol-water service fluid; it could not have ridden
through the dry, nonpolar methane stream and deposited at the valve
under the recorded conditions. This becomes the third contradiction
before Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Catalyst Bay \| automatic**

**Trigger:** mission_4_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** A blue swab rests beside a clear dry-line cartridge.

**Panel/HUD text:** MISSION 4 - WHAT CAN TRAVEL WHERE?

**Dialogue bubbles -** Cho: "A stain is evidence that a substance reached this spot. It is not proof of how it arrived. We test the path before we name a leak."

**Unlocks:** Stop 13 at the molecular-model bench; Stop 14 unlocks immediately after Stop 13.
**Beat 2 - After Stops 13 and 14 \| molecular-model bench \| automatic transition**

**Trigger:** accepted_stop_13.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `charge-bench`, the dated accepted-result slip for Stop 13 reads: "Four single bonds, no carbon lone pairs.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STRUCTURE -\> GEOMETRY -\> BOND DIPOLES -\> MOLECULAR POLARITY.

**Dialogue bubbles -** Cho: "Nice work. Now compare methane with the residue. Shape and polarity decide whether they travel together."

**Unlocks:** Stop 15 at the property-card rack.
**Beat 3 - After Stop 15 \| property-card rack \| automatic response**

**Trigger:** accepted_stop_14.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `molecular-model-rail`, the dated accepted-result slip for Stop 14 reads: "As listed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 16: CAN THE BLUE RESIDUE RIDE THE GAS STREAM?

**Dialogue bubbles -** Cho: "Good thinking. The proposed path asks polar liquid to behave like dry methane gas. Run the cartridge and make it prove that claim."

**Unlocks:** Stop 16 at the separation cartridge.
**Beat 4 - After Stop 16 \| separation cartridge \| automatic reversal**

**Trigger:** accepted_stop_15.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `model-rail-desk`, the dated accepted-result slip for Stop 15 reads: "Mapping as listed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Cho: "Exactly right. The blue fluid is real. The methane-leak story attached to it is not."

**Unlocks:** The Mission 4 outcome beat.
**Beat 5 - At mission end \| Catalyst Bay \| automatic outcome and hook**

**Trigger:** accepted_stop_16.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `separation-cartridge`, Mei-Ling Cho sets the retained blue residue in a LOCAL MAINTENANCE tray. The dated prop remains here on later visits.

**Panel/HUD text:** LOCAL INVESTIGATION COMPLETE / NEXT DESTINATION - WATER PLANT.

**Dialogue bubbles -** Mei-Ling Cho: "It could not have made that journey dry. But Achebe's water alarm now points at the Ice Cut; three matching displays must face one fresh sample."

**Waypoint:** Water Plant

**Unlocks:** Mission 5 briefing and the Water Plant waypoint.
### Physical aftermath — mars-m04

**Home:** `separation-cartridge`. **Before:** The dated mission-4 evidence holder at this fixture has no accepted record. A blue swab rests beside a clear dry-line cartridge.
**After — exact action:** Mei-Ling Cho sets the retained blue residue in a LOCAL MAINTENANCE tray.
**Trigger:** accepted_stop_16. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `water-report`, a sealed field vial stands apart from three matching screen printouts.
**Segue - exact player copy:** But Achebe's water alarm now points at the Ice Cut; three matching displays must face one fresh sample.

## Location plan

**One location:** Catalyst Bay (KINET), using charge-bench, a molecular
model rail, and a portable separation cartridge. Although Cold End would
also fit the science, keeping Mission 4 in one local place obeys the
early-world rule.

## Characters and dramatic beat

Cho enters carrying a sealed blank and asks, "What can physically travel
there?" She challenges Sundqvist's story without accusing her of
carelessness. A maintenance technician admits that the same blue fluid
was used during a valve service two shifts earlier.

## Key concepts, explained here

A Lewis structure accounts for valence electrons and bonding. VSEPR uses
electron domains to predict three-dimensional shape. Bond polarity comes
from unequal electron sharing; molecular polarity also depends on
whether bond dipoles cancel. Intermolecular forces connect microscopic
structure to boiling point, solubility, and separation. "Like dissolves
like" is useful only after the molecule's polarity is established.

### Character scene: mars-cho-entrance

**Trigger:** On arrival at Catalyst Bay during Mission 4, when Stop 13 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `charge-bench` in Catalyst Bay. Mei-Ling Cho, water and cryogenics engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Refuses a residue sample whose chain of custody is broken.
**Exact dialogue:**
- Mei-Ling Cho, water and cryogenics engineer: “I have to protect the cold equipment from what reaches it; a sample without a trustworthy history cannot settle that.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-cho-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 13 - Choose the methane structure

**Format/placement:** CHOICE, asked at Mei-Ling Cho beside `charge-bench`.

**Metadata:** Concept: 5 - Lewis structures; Keystone: structure, polarity, and intermolecular forces; Area: Cold End; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Mei-Ling Cho, at the charge bench in Catalyst Bay.

**Stop reason - exact player copy:** The residue investigation needs a methane structure before comparing molecular behavior.

**Question card story setup - exact player copy:** To test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape.

**Question card story-science connection - exact player copy:** The bonding model establishes methane's geometry for judging how it interacts with the suspect residue.

**Question card prompt - exact player copy:** Which Lewis structure for
CH4 is valid?

**Choices:**

1. Central C with four C-H single bonds and no lone pairs on C **(correct)**

2. Central C with three C-H bonds and one lone pair.

3. H=C(H)-H with a double bond to hydrogen.

4. C4- surrounded by four H+ ions.

**Correct result:** Four single bonds, no carbon lone pairs.

**Answer text:** Valid methane has four C-H single bonds, no carbon lone pairs, and a tetrahedral shape.

**Why:** Carbon supplies four valence electrons and reaches an octet
through four shared pairs. Hydrogen forms one bond and never a double
bond. Formal charges are zero in the standard structure.

**Wrong-path feedback:** (2) Three C-H bonds plus a lone pair gives the wrong neutral electron arrangement for methane. (3) Hydrogen cannot form a double bond because it can hold only two electrons. (4) Methane is a neutral covalent molecule, not C4- surrounded by four H+ ions.

**State/output:** Add the correct 3D methane model to the rail.

## Stop 14 - From electrons to polarity

**Format/placement:** SEQUENCE, at `molecular-model-rail`.

**Metadata:** Concept: 5 - structure-property chain; Keystone: structure, polarity, and intermolecular forces; Area: Cold End; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the molecular model rail, in Catalyst Bay.

**Stop reason - exact player copy:** The methane structure is selected, but bond polarity alone does not determine molecular polarity.

**Question card story setup - exact player copy:** Use electron arrangement to connect Lewis structure, molecular shape, and polarity so the proposed leak path can be judged.

**Question card story-science connection - exact player copy:** The geometry-to-polarity chain explains how individual bond effects combine in the complete molecule.

**Question card prompt - exact player copy:** Order the reasoning chain
used to predict molecular polarity.

**Cards:** Draw a valid Lewis structure / Count electron domains and
predict geometry / Identify bond dipoles from electronegativity / Test
whether dipoles cancel in 3D / Classify the molecule as polar or
nonpolar.

**Correct result:** As listed.

**Answer text:** Lewis structure leads to geometry, bond dipoles, molecular polarity, and then intermolecular behavior.

**Why:** A polar bond does not guarantee a polar molecule. Geometry
determines whether individual dipoles reinforce or cancel. Methane's
tetrahedral C-H bond arrangement is symmetric enough that the small bond
dipoles cancel.

**Wrong-path feedback:** If polarity comes before geometry, show two
molecules with similar bonds but different shapes. If the player begins
with IMF, explain that IMF classification depends on the molecular
polarity already established.

**State/output:** Unlock molecule matching.

## Stop 15 - Match shape, polarity, and dominant force

**Format/placement:** PROTOCOL, at `model-rail-desk`.

**Metadata:** Concept: 5 - VSEPR and IMF; Keystone: structure, polarity, and intermolecular forces; Area: Cold End; Learning role: COMBINE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the model rail desk, in Catalyst Bay.

**Stop reason - exact player copy:** The polarity model is ready to be applied to the separator's different substances.

**Question card story setup - exact player copy:** Apply that chain to methane, carbon dioxide, water, and ammonia to identify which substances behave alike and could travel together.

**Question card story-science connection - exact player copy:** Matching shapes and attractions predicts which materials the separator should retain or carry with the gas.

**Question card prompt - exact player copy:** Match each molecule to its
shape/polarity/dominant intermolecular force.

**Complete format-specific interaction block:**

```yaml
scenarios:
  - {id: ch4, label: "CH4"}
  - {id: co2, label: "CO2"}
  - {id: h2o, label: "H2O"}
  - {id: nh3, label: "NH3"}
choices:
  - {id: tetra_nonpolar_ldf, label: "tetrahedral / nonpolar / London dispersion"}
  - {id: linear_nonpolar_ldf, label: "linear / nonpolar overall / London dispersion"}
  - {id: bent_polar_hbond, label: "bent / polar / hydrogen bonding"}
  - {id: pyramid_polar_hbond, label: "trigonal pyramidal / polar / hydrogen bonding"}
mapping: {ch4: tetra_nonpolar_ldf, co2: linear_nonpolar_ldf, h2o: bent_polar_hbond, nh3: pyramid_polar_hbond}
```

**Scenarios:** CH4 / CO2 / H2O / NH3.

**Choices/mapping:** tetrahedral, nonpolar, London dispersion / linear,
nonpolar overall, London dispersion / bent, polar, hydrogen bonding /
trigonal pyramidal, polar, hydrogen bonding; mapping \[0,1,2,3\].

**Correct result:** Mapping as listed.

**Answer text:** Match CH4 and CO2 to nonpolar/London behavior, and H2O and NH3 to polar/hydrogen-bonding behavior.

**Why:** Symmetric CH4 and CO2 cancel bond dipoles and rely on London
dispersion between molecules. Bent water and pyramidal ammonia remain
polar, and their H-O or H-N bonds allow hydrogen bonding. London forces
still exist in all substances; "dominant" names the most consequential
one present.

**Wrong-path feedback:** CO2 has polar bonds but a nonpolar linear
molecule. Water is not linear because two lone-pair domains bend its O-H
bonds.

**State/output:** Create reference curves for the sweep.

## Stop 16 - Can the blue residue ride the gas stream?

**Format/placement:** SWEEP, operated at `separation-cartridge`.

**Metadata:** Concept: 5 - IMF/property behavior; Keystone: structure, polarity, and intermolecular forces; Area: Cold End; Learning role: APPLY; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the separation cartridge, in Catalyst Bay.

**Stop reason - exact player copy:** The attraction predictions are ready, leaving the blue stain's proposed journey to test.

**Question card story setup - exact player copy:** Run the separation cartridge to determine whether the blue residue could have traveled through the dry methane line.

**Question card story-science connection - exact player copy:** The travel curve determines whether this residue could plausibly accompany methane and deposit only at the suspect valve.

**Question card prompt - exact player copy:** Sweep the temperature,
mark where each substance leaves or sticks, and decide whether the
residue could follow the proposed path.

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: temperature, label: "Cartridge temperature", min: 180, max: 330, step: 25, unit: K}
  series:
    - {id: methane, label: "Methane", readings: [[180,0.92],[205,0.95],[230,0.97],[255,0.98],[280,0.99],[305,0.99],[330,0.99]]}
    - {id: water, label: "Water", readings: [[180,0.02],[205,0.03],[230,0.05],[255,0.08],[280,0.20],[305,0.64],[330,0.86]]}
    - {id: glycol, label: "Blue glycol tracer", readings: [[180,0.00],[205,0.00],[230,0.00],[255,0.01],[280,0.01],[305,0.02],[330,0.04]]}
  response_label: "fraction leaving cartridge"
  required_regions: [low, middle, high]
  correct: "Residue cannot follow methane; water and glycol are retained or condensed upstream."
```

**Response model:** Methane passes the cartridge across the test range;
water strongly retains/condenses below about 300 K; glycol tracer
remains strongly retained throughout.

**§7 authored-board source - SWEEP:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 16 - Can the blue residue ride the gas stream?"
  format: "SWEEP"
  source: "Handback 3 canonical interaction block"
  question: "Sweep the temperature, mark where each substance leaves or sticks, and decide whether the residue could follow the proposed path."
  payload: "```yaml sweep: control: {id: temperature, label: \"Cartridge temperature\", min: 180, max: 330, step: 25, unit: K} series: - {id: methane, label: \"Methane\", readings: [[180,0.92],[205,0.95],[230,0.97],[255,0.98],[280,0.99],[305,0.99],[330,0.99]]} - {id: water, label: \"Water\", readings: [[180,0.02],[205,0.03],[230,0.05],[255,0.08],[280,0.20],[305,0.64],[330,0.86]]} - {id: glycol, label: \"Blue glycol tracer\", readings: [[180,0.00],[205,0.00],[230,0.00],[255,0.01],[280,0.01],[305,0.02],[330,0.04]]} response_label: \"fraction leaving cartridge\" required_regions: [low, middle, high] correct: \"Residue cannot follow methane; water and glycol are retained or condensed upstream.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - SWEEP:**

```yaml
sweep:
  axis: {label: "cartridge temperature", min: 180, max: 330, step: 25, unit: K}
  response: {label: "fraction leaving cartridge", unit: fraction}
  series:
    methane: [[180,0.92],[205,0.95],[230,0.97],[255,0.98],[280,0.99],[305,0.99],[330,0.99]]
    water: [[180,0.02],[205,0.03],[230,0.05],[255,0.08],[280,0.20],[305,0.64],[330,0.86]]
    blueGlycolTracer: [[180,0.00],[205,0.00],[230,0.00],[255,0.01],[280,0.01],[305,0.02],[330,0.04]]
  start: 180
  target: 305
  tolerance: 25
  requiredRegions: [low, middle, high]
  correctResult: "The glycol-water residue cannot plausibly travel with methane to the suspect valve."
```

**Correct result:** The glycol-water residue cannot plausibly travel
with the methane stream and deposit only at the suspect valve.

**Answer text:** The glycol-water residue would remain or condense upstream, so it could not follow methane to that valve.

**Why:** Strong polarity and hydrogen bonding make the service fluid
behave very differently from nonpolar methane. Under the recorded cool,
dry line conditions it would be retained or condensed upstream. The
residue is consistent with local maintenance fluid, not a transported
methane-leak marker.

**Wrong-path feedback:** Choosing the closest curve by color is not
evidence. Committing before sampling low, middle, and high temperatures
should say the separation behavior is under-observed.

**State/output:** Set evidence_flags.residue_local = true; technician
admits service spill; Casebook adds RESIDUE DID NOT TRAVEL.

## Mission outcome

Mission decision: The blue stain did not move through the dry methane line. Water and glycol would stay or turn to liquid far upstream. Methane would pass. The stain came from local repair work, not a leak. A new water alarm now needs a test.

**Segue - exact player copy:** But Achebe's water alarm now points at the Ice Cut; three matching displays must face one fresh sample.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mei-Ling Cho sets the retained blue residue in a LOCAL MAINTENANCE tray. But Achebe's water alarm now points at the Ice Cut; three matching displays must face one fresh sample.

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 07:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The false residue trail is cleared, preventing an
unnecessary methane-system shutdown.

**Automatic bar change:** Methane -2 \| Oxygen 0 \| Power +2 \|
Integrity +5

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +6. Result: METHANE 92% \| OXYGEN 88%
\| POWER 96% \| INTEGRITY 86%. Recovery Bank: 8 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Lewis structure:** a drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- **Molecular geometry:** the three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- **Valence-shell electron-pair repulsion (VSEPR) model:** predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- **London dispersion force:** an attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- **Hydrogen bonding:** a strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.
- **Boiling:** a change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.
- **Boiling point:** the temperature at which bubbles of vapor can form throughout a liquid. Stronger attractions between particles usually raise it.
- **Condensation:** the change from gas to liquid. A substance that condenses upstream cannot travel through the line as a gas.

### Review question 1


**Prompt - exact player copy:** Which statement best explains lewis structure?

**Options - exact player copy:**

- A. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- B. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- C. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- D. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for lewis structure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes molecular geometry. It does not answer the question about lewis structure.
- B: This describes valence-shell electron-pair repulsion (VSEPR) model. It does not answer the question about lewis structure.
- C: This describes london dispersion force. It does not answer the question about lewis structure.
- D: Correct. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.

### Review question 2


**Prompt - exact player copy:** Which statement best explains molecular geometry?

**Options - exact player copy:**

- A. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- B. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- C. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- D. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for molecular geometry. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- B: This describes lewis structure. It does not answer the question about molecular geometry.
- C: This describes valence-shell electron-pair repulsion (VSEPR) model. It does not answer the question about molecular geometry.
- D: This describes london dispersion force. It does not answer the question about molecular geometry.

### Review question 3


**Prompt - exact player copy:** Which statement best explains valence-shell electron-pair repulsion (VSEPR) model?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- C. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for valence-shell electron-pair repulsion (vsepr) model. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes lewis structure. It does not answer the question about valence-shell electron-pair repulsion (vsepr) model.
- B: Correct. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- C: This describes molecular geometry. It does not answer the question about valence-shell electron-pair repulsion (vsepr) model.
- D: This describes london dispersion force. It does not answer the question about valence-shell electron-pair repulsion (vsepr) model.

### Review question 4


**Prompt - exact player copy:** Which statement best explains london dispersion force?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- C. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for london dispersion force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes lewis structure. It does not answer the question about london dispersion force.
- B: This describes molecular geometry. It does not answer the question about london dispersion force.
- C: Correct. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- D: This describes valence-shell electron-pair repulsion (VSEPR) model. It does not answer the question about london dispersion force.

### Review question 5


**Prompt - exact player copy:** Which statement best explains hydrogen bonding?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- C. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- D. A strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for hydrogen bonding. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes lewis structure. It does not answer the question about hydrogen bonding.
- B: This describes molecular geometry. It does not answer the question about hydrogen bonding.
- C: This describes valence-shell electron-pair repulsion (VSEPR) model. It does not answer the question about hydrogen bonding.
- D: Correct. A strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.

### Review question 6


**Prompt - exact player copy:** Which statement best explains boiling?

**Options - exact player copy:**

- A. A change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.
- B. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- C. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for boiling. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.
- B: This describes lewis structure. It does not answer the question about boiling.
- C: This describes molecular geometry. It does not answer the question about boiling.
- D: This describes valence-shell electron-pair repulsion (VSEPR) model. It does not answer the question about boiling.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Lewis structures account for valence electrons and valid bonds.

- VSEPR turns electron domains into three-dimensional geometry.

- Molecular polarity depends on both bond dipoles and whether they
  cancel.

- Stronger intermolecular attractions change boiling, solubility, and
  separation.

- **Mission takeaway:** A substance's physical properties can rule out a proposed evidence path.

# Mission 5 - The Water Account

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 5 - 11 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE WATER ACCOUNT

**Go now:** Go to the Water Plant and meet Rosalind Achebe, the analytical and electrochemistry lead, beside the recycle-water meter.

**Card body:** 11 work shifts remain before launch. A sealed field vial stands apart from three matching screen printouts. Today you decide whether the water source is bad or the standard is wrong.

**Objective:** Decide whether the water shortage is real and whether the
meters provide independent evidence.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 5: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m05_we01
    title: Calculate molarity
    problem: Dissolve 0.2 mol solute to make 0.5 L of solution.
    rule: c=n/V, using solution volume in liters.
    steps:
    - 'Set up the relationship: c=n/V, using solution volume in liters.'
    - c=0.2/0.5=0.4 mol/L.
    answer: The concentration is 0.4 M, where M means mol/L.
    common_mistake: Use final solution volume, not an assumed volume of solvent.
  - id: mars_m05_we02
    title: Dilute a solution
    problem: Dilute 100 mL of 2 M stock solution to 500 mL total. Find final concentration.
    rule: c₁V₁=c₂V₂ when solute amount is conserved.
    steps:
    - 'Set up the relationship: c₁V₁=c₂V₂ when solute amount is conserved.'
    - c₂=2(100/500)=0.4 M.
    answer: The final concentration is 0.4 M.
    common_mistake: Final volume is 500 mL, not 600 mL.
  - id: mars_m05_we03
    title: Separate amount from concentration
    problem: Two solutions both have concentration 0.5 mol/L. Their volumes are 1 L and 2 L. Compare solute amounts.
    rule: n=cV.
    steps:
    - 'Set up the relationship: n=cV.'
    - n₁=0.5(1)=0.5 mol; n₂=0.5(2)=1 mol.
    answer: The larger solution contains twice the solute amount.
    common_mistake: Equal concentration does not mean equal total amount.
  - id: mars_m05_we04
    title: Use a calibration line
    problem: A sensor obeys A=2c+0.1, with dimensionless reading A and concentration c in mmol/L. A sample gives A=0.5.
    rule: Subtract the intercept before dividing by the slope.
    steps:
    - 'Set up the relationship: Subtract the intercept before dividing by the slope.'
    - c=(0.5-0.1)/2=0.2 mmol/L.
    answer: The concentration is 0.2 mmol/L.
    common_mistake: Dividing 0.5 directly by 2 ignores the baseline reading.
  - id: mars_m05_we05
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Solution: a uniform mixture in which one or more substances are spread through another. A small sample can be concentrated without containing a large total amount.

Solute: the substance dissolved in a solution. Its total amount depends on both concentration and solution volume.

Concentration: the amount of solute in a chosen volume of solution. It does not by itself state the total amount in the container.

Molarity: the number of moles of solute in one liter of solution. It lets the plant compare samples of different sizes on the same scale.

#### Primer concepts

- Total solute amount equals concentration multiplied by volume, so concentration alone cannot rank containers by total material.
- Choose a measurement setting that is sensitive to the difference being tested and remains inside the instrument's useful range.
- Trace every alarming display back to its source before treating agreement as confirmation.

#### Equations first needed today

**Equation:** M = moles of solute / liters of solution  
**What it is for:** comparing dissolved amounts in samples of different volume  
**Symbols:** M is molarity in moles per liter; moles of solute is the dissolved amount; liters is the total solution volume.  
**Why this campaign needs it:** The water plant must distinguish a small concentrated sample from a large container holding more total contamination.  

**Crew on this mission - mission log:** Rosalind Achebe - analytical and electrochemistry lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

The player distinguishes amount from concentration, calculates molarity,
chooses a sensitive wavelength, and traces measurement dependencies. The
trip begins at the Water Plant, where an anomalous chloride signal
suggests dirty source ice. That observation triggers the first distant
trip to the Ice Cut for a field blank. The field result is clean; the
apparent agreement among plant meters is revealed as common calibration
bias.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Water Plant \| automatic**

**Trigger:** mission_5_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** A sealed field vial stands apart from three matching screen printouts.

**Panel/HUD text:** MISSION 5 - THE WATER ACCOUNT

**Dialogue bubbles -** Achebe: "If the Ice Cut suddenly turned dirty, we may have to stop both water and launch-gas production. We verify the measurement before we shut down the source."

**Unlocks:** Stop 17 at the wet-chemistry bench; Stop 18 unlocks immediately after Stop 17.
**Beat 2 - After Stops 17 and 18 \| wet-chemistry bench \| automatic response**

**Trigger:** accepted_stop_17.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `water-report`, the dated accepted-result slip for Stop 17 reads: "Bottle B.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 19: CHOOSE THE MEASUREMENT WAVELENGTH

**Dialogue bubbles -** Achebe: "Nice work. A larger concentration is not automatically a larger amount. Now we have a number the process can use."

**Unlocks:** Stop 19 at the spectrometer.
**Beat 3 - After Stop 19 \| spectrometer \| automatic travel trigger**

**Trigger:** accepted_stop_18.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `water-assay-desk`, the dated accepted-result slip for Stop 18 reads: "0.0400 M; tolerance ±3%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** DISTANT VERIFICATION AUTHORIZED - ICE CUT.

**Dialogue bubbles -** Achebe: "Good thinking. The instrument sees a signal. We still need a sample that does not share this room, this meter, or this standard."

**Waypoint:** Ice Cut

**Unlocks:** The Ice Cut waypoint and Stop 20 after the player reaches the field sampler.
**Beat 4 - After Stop 20 \| Ice Cut \| automatic discovery**

**Trigger:** accepted_stop_19.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `spectrophotometer`, the dated accepted-result slip for Stop 19 reads: "Select about 510 nm.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** THREE READOUTS / ONE CALIBRATION SOURCE.

**Dialogue bubbles -** Achebe: "Exactly right. The displays agree because they inherited the same error. Agreement is not independence."

**Unlocks:** The Mission 5 outcome beat.
**Beat 5 - At mission end \| Ice Cut \| automatic outcome and hook**

**Trigger:** accepted_stop_20.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `water-report`, Rosalind Achebe clips the SHARED BAD STANDARD finding beside the normal field result. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - PLANT CONTROL REVIEW.

**Dialogue bubbles -** Rosalind Achebe: "One vial. Its own standard. That is why we brought it. Therefore Abiola must join the raw clues before the next repair; the dashboard has lost its three-vote majority."

**Waypoint:** Plant Control

**Unlocks:** Mission 6 briefing and the Plant Control waypoint.
### Physical aftermath — mars-m05

**Home:** `water-report`. **Before:** The dated mission-5 evidence holder at this fixture has no accepted record. A sealed field vial stands apart from three matching screen printouts.
**After — exact action:** Rosalind Achebe clips the SHARED BAD STANDARD finding beside the normal field result.
**Trigger:** accepted_stop_20. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `evidence-board`, gas labels, water totals, and carbon slips cover the bare evidence board.
**Segue - exact player copy:** Therefore Abiola must join the raw clues before the next repair; the dashboard has lost its three-vote majority.

## Location plan

**Two locations:** Water Plant (SOIL) for Stops 17-19, then Ice Cut
(CUT) for Stop 20. The Ice Cut is not opened for sightseeing: the high
chloride reading creates the need for a source sample and blank.

## Characters and dramatic beat

Achebe enters carrying a sealed chloride standard and refuses to
calibrate from yesterday's plant water. Cho wants the recycle loop
cleared quickly. At the Ice Cut, a rover operator shows that the source
sample and field blank are both normal; Achebe's caution becomes
plot-moving rather than merely cautious.

## Key concepts, explained here

Concentration is amount per volume, not total amount. Molarity is M =
mol/L. Beer-Lambert law, A = epsilon b c, makes absorbance proportional
to concentration at a chosen wavelength and path length; the peak
wavelength provides the greatest sensitivity. Multiple readouts are not
independent evidence if they inherit the same standard or sensor.

### Character scene: mars-achebe-entrance

**Trigger:** On arrival at Water Plant during Mission 5, when Stop 17 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `water-report` in Water Plant. Rosalind Achebe, analytical and electrochemistry lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Carries a sealed standard to the water meter before accepting its reading.
**Exact dialogue:**
- Rosalind Achebe, analytical and electrochemistry lead: “We have time for useful assays, not endless ones; tell me which decision this sample must support.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-achebe-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 17 - Concentrated is not necessarily more

**Format/placement:** CHOICE, asked at Rosalind Achebe beside `water-report`.

**Metadata:** Concept: 6 - concentration versus amount; Keystone: concentration is not amount; Area: Water Plant; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Call - exact player copy:** Talk to Rosalind Achebe, at the water report board in Water Plant.

**Stop reason - exact player copy:** The water investigation presents bottles of different volumes and concentrations.

**Question card story setup - exact player copy:** Before treating the alarm as water loss, compare sample volume and concentration to determine which container actually holds more chloride.

**Question card story-science connection - exact player copy:** Comparing total solute prevents a concentrated small sample from being mistaken for the larger contaminant inventory.

**Question card prompt - exact player copy:** Which bottle contains more
moles of chloride?

**Choices:**

1. Bottle B: 1.5 mol versus Bottle A's 1.0 mol **(correct)**

2. Bottle A because 2.0 M is larger.

3. They contain the same amount because both contain chloride.

4. Cannot know without molar mass.

**Correct result:** Bottle B.

**Answer text:** Bottle B contains more total chloride even though its concentration is lower.

**Why:** Amount equals concentration times volume. A contains (2.0
mol/L)(0.50 L)=1.0 mol; B contains (0.30)(5.0)=1.5 mol. Molar mass is
needed for mass, not for moles when molarity and volume are already
given.

**Wrong-path feedback:** (2) The larger molarity in Bottle A does not overcome its much smaller volume; concentration alone is not total amount. (3) Two bottles containing the same solute need not contain the same number of moles. (4) Molarity times volume already gives moles, so molar mass is not needed for this comparison.

**State/output:** Clear misleading alarm label; unlock report
calculation.

## Stop 18 - Put the water sample on a molar scale

**Format/placement:** BALLPARK, at `water-assay-desk`.

**Metadata:** Concept: 6 - molarity; Keystone: concentration is not amount; Area: Water Plant; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the water assay desk, in Water Plant.

**Stop reason - exact player copy:** The concentration-inventory distinction is settled and the recycle-water sample needs a molar concentration.

**Question card story setup - exact player copy:** The acid sample is ready for the concentration check. The volume label must be converted before the result can guide dosing.

**Question card prompt - exact player copy:** Dissolve 0.365 g HCl to make 250.0 mL solution. With molar mass 36.46 g/mol, fill mass, molar mass and volume in litres in M=(mass/molar mass)/volume.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Put the water sample on a molar scale",
    "labels": [
      "0.365",
      "36.46",
      "0.25",
      "250"
    ],
    "values": [
      0.365,
      36.46,
      0.25,
      250
    ],
    "slots": 3,
    "template": "{a} / {b} / {c} = ? mol/L",
    "formula": "a/b/c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 0.040044,
    "tolerance": 0.0012,
    "units": "mol/L",
    "correctResult": 0.040044
  },
  "answerText": "The solution contains about 0.01001 mol HCl in 0.2500 L, giving 0.04004 M.",
  "wrongFeedback": [
    "Using millilitres directly makes molarity a thousand times too small."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The solution contains about 0.01001 mol HCl in 0.2500 L, giving 0.04004 M.

**Wrong-path feedback:** Using millilitres directly makes molarity a thousand times too small.

**State/output:** Set recycle_acid_model = 0.0400.

## Stop 19 - Choose the measurement wavelength

**Format/placement:** SWEEP, operated at `spectrophotometer`.

**Metadata:** Concept: 6 - Beer-Lambert/spectroscopy; Keystone: solutions and spectroscopy; Area: Water Plant; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the spectrophotometer, in Water Plant.

**Stop reason - exact player copy:** The sample concentration is ready, but the optical instrument needs a suitable measurement wavelength.

**Question card story setup - exact player copy:** Choose the wavelength where the colored complex responds most strongly so an independent sample can confirm or reject the alarm.

**Question card story-science connection - exact player copy:** The selected absorption region provides sensitivity without saturating the detector used for the water check.

**Question card prompt - exact player copy:** Sweep wavelength and
select the operating wavelength with the greatest useful sensitivity.

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: wavelength, label: "Wavelength", min: 400, max: 650, step: 10, unit: nm}
  response_label: absorbance
  standard_curve: [[400,0.08],[440,0.19],[470,0.48],[490,0.70],[510,0.82],[530,0.68],[560,0.40],[620,0.13],[650,0.06]]
  saturation_limit: 1.20
  required_action: "Run sealed standard before unknown."
  correct_setting: {value: 510, unit: nm, tolerance: 10}
  correct_reason: "Maximum useful unsaturated sensitivity."
```

**Response:** Peak absorbance at 510 nm; low signal below 440 and above
620; detector saturation only above 1.20 A. The standard reads 0.82 A at
510 nm.

**Correct result:** Select about 510 nm.

**Answer text:** Use about 510 nm, where the standard has its strongest unsaturated response.

**Why:** Beer-Lambert response changes most strongly with concentration
where the absorbing species has high absorbance, provided the detector
is not saturated. Measuring at a weak wavelength compresses differences
and hides a small calibration error.

**Wrong-path feedback:** Choosing the lowest absorbance maximizes
headroom but sacrifices sensitivity. Choosing a wavelength without
running the standard leaves the instrument unqualified.

**State/output:** Unknown reports normal chloride when read against the
sealed standard, contradicting the wall meter.

## Stop 20 - Trace the agreement

**Format/placement:** TRACE, operated at `rover-sampler`.

**Metadata:** Concept: 6 - evidence dependency; Keystone: evidence must be independent; Area: Plant Control; Learning role: INTRODUCE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the rover sampler, in Ice Cut.

**Stop reason - exact player copy:** Several alarm channels agree, and their calibration sources must be traced before counting them as separate evidence.

**Question card story setup - exact player copy:** The dependency map will show how many separate measurements really exist.

**Question card story-science connection - exact player copy:** The dependency map establishes whether the alarm has independent confirmation or repeats one shared standard.

**Question card prompt - exact player copy:** Open every dependency and
identify whether the three alarming channels are independent.

**Complete format-specific interaction block:**

```yaml
trace:
  shared_resources:
    - {id: standard_c, label: "Plant Standard C"}
    - {id: standard_a, label: "Sealed Standard A"}
  target: standard_c
  channels:
    - {id: wall_chloride, label: "Wall chloride meter", reading: "HIGH", depends_on: [standard_c]}
    - {id: recycle_estimator, label: "Recycle estimator", reading: "LOW RETURN", depends_on: [wall_chloride, standard_c]}
    - {id: control_correction, label: "Control-room water correction", reading: "ALARM", depends_on: [recycle_estimator, wall_chloride, standard_c]}
    - {id: portable_spec, label: "Portable spectrophotometer", reading: "NORMAL", depends_on: [standard_a]}
    - {id: field_sample, label: "Ice Cut field sample", reading: "NORMAL", depends_on: [independent_volume, standard_a]}
  truth: {dependent_channels: [wall_chloride, recycle_estimator, control_correction], independent_channels: [portable_spec, field_sample]}
  correct: "Three alarms are one dependent evidence path; the portable field path is independent."
```

**Dependencies:** Wall chloride meter -\> Plant Standard C. Recycle
estimator -\> wall meter -\> Plant Standard C. Control-room water
correction -\> recycle estimator -\> wall meter -\> Plant Standard C.
Portable spectrophotometer -\> sealed Standard A. Field sample -\>
independent volume and sealed Standard A.

**Correct result:** The three alarming channels are not independent; all
inherit Plant Standard C. The portable/field path is independent and
does not reproduce the alarm.

**Answer text:** The three alarming channels share Standard C; the portable field path is independent.

**Why:** Agreement strengthens a conclusion only when evidence can fail
separately. Here one biased standard propagates through three displays.
The distant trip matters because a new sample and independent standard
break the dependency chain.

**Wrong-path feedback:** Counting displays is not counting evidence. A
derived estimator cannot independently confirm its own input.

**State/output:** Set evidence_flags.shared_calibration = true; unlock
calibration-stream replacement; update water_reserve upward by 4
apparent units but leave real deficit unresolved.

## Mission outcome

Mission decision: The water alarm comes from one bad standard. It does not prove the Ice Cut is dirty. Three displays share the same error, while the field sample is normal. The water source stays open. The raw gas, water, and carbon clues now go on one board.

**Segue - exact player copy:** Therefore Abiola must join the raw clues before the next repair; the dashboard has lost its three-vote majority.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rosalind Achebe clips the SHARED BAD STANDARD finding beside the normal field result. Therefore Abiola must join the raw clues before the next repair; the dashboard has lost its three-vote majority.

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 08:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The rover sample and recalibration consume
water-processing time and electrical power, but expose the shared bad
standard.

**Automatic bar change:** Methane -2 \| Oxygen -2 \| Power -6 \|
Integrity +3

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +5. Result: METHANE 94% \| OXYGEN 86%
\| POWER 95% \| INTEGRITY 89%. Recovery Bank: 11 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Absorbance:** measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- **Beer-Lambert relationship:** says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- **Wavelength:** the distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- **Calibration standard:** a sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- **Error:** the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- **Instrument saturation:** occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- **Independent evidence:** reaches a conclusion without relying on the same upstream measurement or standard. Two displays are not independent if one is calculated from the other.

### Review question 1


**Prompt - exact player copy:** Which statement best explains absorbance?

**Options - exact player copy:**

- A. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- B. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- D. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for absorbance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes beer-Lambert relationship. It does not answer the question about absorbance.
- B: Correct. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C: This describes wavelength. It does not answer the question about absorbance.
- D: This describes calibration standard. It does not answer the question about absorbance.

### Review question 2


**Prompt - exact player copy:** Which statement best explains beer-Lambert relationship?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for beer-lambert relationship. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absorbance. It does not answer the question about beer-lambert relationship.
- B: This describes wavelength. It does not answer the question about beer-lambert relationship.
- C: Correct. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- D: This describes calibration standard. It does not answer the question about beer-lambert relationship.

### Review question 3


**Prompt - exact player copy:** Which statement best explains wavelength?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- C. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for wavelength. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absorbance. It does not answer the question about wavelength.
- B: This describes beer-Lambert relationship. It does not answer the question about wavelength.
- C: This describes calibration standard. It does not answer the question about wavelength.
- D: Correct. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

### Review question 4


**Prompt - exact player copy:** Which statement best explains calibration standard?

**Options - exact player copy:**

- A. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- B. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for calibration standard. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- B: This describes absorbance. It does not answer the question about calibration standard.
- C: This describes beer-Lambert relationship. It does not answer the question about calibration standard.
- D: This describes wavelength. It does not answer the question about calibration standard.

### Review question 5


**Prompt - exact player copy:** Which statement best explains error?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for error. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absorbance. It does not answer the question about error.
- B: Correct. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C: This describes beer-Lambert relationship. It does not answer the question about error.
- D: This describes wavelength. It does not answer the question about error.

### Review question 6


**Prompt - exact player copy:** Which statement best explains instrument saturation?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. Says absorbance rises predictably with concentration and with the distance light travels through a sample. A measurement uses the relationship to choose a sensitive, unsaturated measurement setting.
- C. Occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for instrument saturation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absorbance. It does not answer the question about instrument saturation.
- B: This describes beer-Lambert relationship. It does not answer the question about instrument saturation.
- C: Correct. Occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- D: This describes wavelength. It does not answer the question about instrument saturation.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Concentration is amount per volume; total amount also depends on
  volume.

- M = mol/L; convert units before dividing.

- Beer-Lambert law makes absorbance proportional to concentration in its
  useful range.

- Measure near the absorbance maximum for sensitivity without
  saturating.

- **Mission takeaway:** Several readouts are one piece of evidence if they share the same dependency.

# Mission 6 - The Leak That Was Not

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 6 - 10 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE LEAK THAT WAS NOT

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the evidence board.

**Card body:** 10 work shifts remain before launch. Gas labels, water totals, and carbon slips cover the bare evidence board. Today you decide which fault explains the fuel shortfall.

**Objective:** Choose one cause that fits every clue and prove it with
complete atom balances.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 6: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m06_we01
    title: Balance a reaction
    problem: Balance H₂ + O₂ → H₂O without changing chemical formulas.
    rule: Coefficients conserve each element; subscripts identify substances.
    steps:
    - Place 2 before H₂O so the product has two oxygen atoms.
    - 'Place 2 before H₂ to supply four hydrogen atoms: 2H₂ + O₂ → 2H₂O.'
    answer: Both sides contain four hydrogen atoms and two oxygen atoms.
    common_mistake: Changing H₂O to H₂O₂ would change the product.
  - id: mars_m06_we02
    title: Find the limiting reactant
    problem: For 2H₂+O₂→2H₂O, mix 6 mol H₂ and 2 mol O₂.
    rule: Compare available amount divided by its reactant coefficient.
    steps:
    - hydrogen reaction units=6/2=3; oxygen reaction units=2/1=2.
    - Oxygen permits fewer reaction units; water produced=2(2)=4 mol.
    answer: O₂ limits the reaction; 2 mol H₂ remains.
    common_mistake: The reactant with fewer moles is not always limiting; coefficients matter.
  - id: mars_m06_we03
    title: Find a partial pressure
    problem: An ideal-gas mixture is 25% helium by mole and has total pressure 8 atm.
    rule: P_He=x_He P_total.
    steps:
    - 'Set up the relationship: P_He=x_He P_total.'
    - P_He=0.25(8)=2 atm.
    answer: Helium contributes 2 atm.
    common_mistake: Use mole fraction, not mass fraction.
  - id: mars_m06_we04
    title: Compare relative errors
    problem: Two length measurements each have uncertainty ±1 cm. One length is 10 cm and the other 50 cm. Compare relative uncertainty.
    rule: Relative uncertainty = absolute uncertainty / measured magnitude.
    steps:
    - first relative uncertainty = 1/10 = 0.10 = 10%.
    - second relative uncertainty = 1/50 = 0.02 = 2%. The same absolute uncertainty is a smaller fraction of the longer length.
    answer: The 50 cm measurement has smaller relative uncertainty.
    common_mistake: Equal absolute errors do not imply equal percentage errors.
  - id: mars_m06_we05
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Diagnosis: the proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

Uncertainty: the range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

Error: the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.

Atom balance: counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.

#### Primer concepts

- Use the fewest causes that explain all observations without contradicting any quiet reading.
- Test the decision against allowed measurement error before committing repair time.
- Reinterpret each earlier clue only after the new explanation predicts what that clue should show.

#### Equations first needed today

No new equation is introduced. The mission combines the material-balance, stoichiometry, partial-pressure, and concentration relationships already placed in the mission log.

**Crew on this mission - mission log:** Commander Laila Abiola - mission commander; Ingrid Sundqvist - production and catalyst lead; Dr. Tomás Herrera - reactor and safety engineer.



## Main story happening - designer summary

Plant Control provides the candidate explanations; the Tank Farm
provides an independent mass and composition check. The player diagnoses
hydrogen delivery deficiency, tests that conclusion against calibration
uncertainty, closes a full C/H/O ledger, and matches old clues to their
real meanings. The major leak response ends. The mystery shifts from
"Where did methane go?" to "Why did hydrogen delivery fall?"

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Plant Control \| automatic**

**Trigger:** mission_6_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** Gas labels, water totals, and carbon slips cover the bare evidence board.

**Panel/HUD text:** MISSION 6 - THE LEAK THAT WAS NOT

**Dialogue bubbles -** Abiola: "No votes. No favorite alarm. Choose the one mechanism that explains what changed and what stayed quiet."

**Unlocks:** Stop 21 at the evidence board; Stop 22 unlocks immediately after Stop 21.
**Beat 2 - After Stops 21 and 22 \| evidence board \| automatic diagnosis**

**Trigger:** accepted_stop_21.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `evidence-board`, the dated accepted-result slip for Stop 21 reads: "C.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RESULT RECORDED

**Dialogue bubbles -** Abiola: "Nice work. The conclusion survives the allowed measurement error. Now make it predict what an independent tank sample should show."

**Unlocks:** The prediction-lock travel beat.
**Beat 3 - After Stop 22 \| evidence board \| automatic travel authorization**

**Trigger:** accepted_stop_22.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `evidence-board`, the dated accepted-result slip for Stop 22 reads: "Hydrogen delivery deficiency remains viable. Even the largest plausible carbon residual is far below the 18% schedule shortfall required by a large methane leak.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** PREDICTION LOCKED - VERIFY AT TANK FARM.

**Dialogue bubbles -** Herrera: "Good thinking. If that prediction is right, the fuel was mostly never made. We should find carbon in recycle, not outside the plant."

**Waypoint:** Tank Farm

**Unlocks:** The Tank Farm waypoint and Stop 23; Stop 24 unlocks immediately after Stop 23.
**Beat 4 - After Stops 23 and 24 \| Tank Farm \| automatic Twist 1**

**Trigger:** accepted_stop_23.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `farm-gauges`, the dated accepted-result slip for Stop 23 reads: "Inputs: C 100, H 640, O 200 mol atoms. Outputs: C 80+20=100; H 80x4 +160x2=640; O 20x2 +160=200. H2 is limiting because only 320 mol is supplied, supporting 80 mol CH4.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NO MAJOR METHANE LEAK / LOW H2 PARTIAL PRESSURE REDUCED PRODUCTION.

**Dialogue bubbles -** Abiola: "Exactly right. There is no major methane leak. We spent four shifts looking for fuel that was mostly never produced."

**Unlocks:** The Mission 6 outcome beat.
**Beat 5 - At mission end \| Tank Farm \| automatic outcome and hook**

**Trigger:** accepted_stop_24.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `evidence-board`, Commander Laila Abiola pins the HYDROGEN-LINE REPAIR order across the linked raw records. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT ROUTE - SABATIER REACTOR -\> COLD END.

**Dialogue bubbles -** Commander Laila Abiola: "Most of the fuel did not escape. We never made it. But Ingrid finds Herrera's signed temperature change; repaired feed does not explain why the reactor was turned down."

**Waypoint:** Sabatier Reactor

**Unlocks:** Mission 7 briefing and the Sabatier Reactor waypoint.
### Physical aftermath — mars-m06

**Home:** `evidence-board`. **Before:** The dated mission-6 evidence holder at this fixture has no accepted record. Gas labels, water totals, and carbon slips cover the bare evidence board.
**After — exact action:** Commander Laila Abiola pins the HYDROGEN-LINE REPAIR order across the linked raw records.
**Trigger:** accepted_stop_24. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `phase-radiator`, a heat strip ends above its limit beside a folded override sheet.
**Segue - exact player copy:** But Ingrid finds Herrera's signed temperature change; repaired feed does not explain why the reactor was turned down.

## Location plan

**Two locations:** Plant Control (GIBBS) for Stops 21-22, then Tank Farm
(TANKS) for Stops 23-24. The diagnosis predicts what the tank samples
should show, causing the move.

## Characters and dramatic beat

All six major characters appear, but only Abiola, Sundqvist, and Herrera
speak during the diagnosis. Sundqvist concedes the carbon evidence.
Herrera does not celebrate; he notices that the bad branch mixture began
shortly after a thermal-control change.

## Key concepts, explained here

A strong diagnosis explains all observations with one mechanism and is
contradicted by none. Uncertainty analysis asks whether reasonable
measurement error could change the conclusion. An atom ledger must count
C, H, and O across all relevant input, product, recycle, and inventory
streams. Evidence synthesis is not a vote among alarms.

## Stop 21 - One cause that fits every panel

**Format/placement:** DIAGNOSIS, at `evidence-board`.

**Metadata:** Concept: 7 - multi-evidence diagnosis; Keystone: evidence must be independent; Area: Plant Control; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the evidence board, in Plant Control.

**Stop reason - exact player copy:** The shared calibration source is exposed and the full panel needs a single consistent explanation.

**Question card story setup - exact player copy:** Quiet readings must rule out the tempting explanations as well.

**Question card story-science connection - exact player copy:** The diagnosis must explain the alarming channels without contradicting the independent and quiet measurements.

**Question card prompt - exact player copy:** Which single cause fits every reading, including the quiet ones?

**Complete format-specific interaction block:**

```yaml
headline: "ONE CAUSE MUST FIT THE ALARMS AND THE QUIET READINGS"
readings:
  - {zone: carbon_ledger, label: "Carbon residual", value: "0.2%", state: quiet}
  - {zone: intake, label: "Theoretical methane from CO2", value: "2405 kg", state: quiet}
  - {zone: hydrogen_branch, label: "Hydrogen / nitrogen", value: "68% / 31%", state: alarm}
  - {zone: water, label: "Water coproduct", value: "below Sabatier prediction", state: alarm}
  - {zone: tank, label: "Total pressure", value: "normal", state: quiet}
  - {zone: residue, label: "Blue fluid", value: "local maintenance fluid", state: quiet}
choices:
  - {id: methane_leak, label: "Large methane leak downstream", mechanism: "Would create a large missing-carbon residual."}
  - {id: low_co2, label: "Insufficient atmospheric CO2", mechanism: "Contradicted by theoretical intake capacity."}
  - {id: low_h2, label: "Hydrogen delivery deficiency before reactor", mechanism: "Explains dilution, low methane and water, closed carbon, and normal total pressure."}
  - {id: dead_sensor, label: "Completely dead methane sensor", mechanism: "Cannot explain hydrogen composition or low water."}
answer: low_h2
```

**Headline/readings:** Carbon in/out closes within 0.2%; intake CO2
supports target; H2 branch is only 68% H2 with N2 present; water
coproduct is below Sabatier prediction; tank methane fraction is below
the production estimate; pressure gauge is normal; residue is local
maintenance fluid.

**Choices:**

1. Large methane leak downstream.

2. Insufficient atmospheric CO2.

3. Hydrogen delivery deficiency before the reactor. **(correct)**

4. Completely dead methane sensor.

**Correct result:** C.

**Answer text:** Hydrogen delivery deficiency before the reactor is the only cause that fits every reading.

**Why:** Nitrogen dilution and reduced H2 partial pressure make H2
limiting, so less CH4 and less coproduct water form. Carbon remains
mostly as unreacted/recycled CO2, closing the ledger. Other gases can
maintain pressure.

**Wrong-path feedback:** A large methane leak predicts a much larger missing-carbon residual. Insufficient CO2 contradicts the measured intake capacity. A dead methane sensor cannot explain the low coproduct water or the abnormal H2/N2 composition.

**State/output:** Set twist_1_diagnosed = true; change mission objective
from find_leak to restore_h2_delivery.

## Stop 22 - Does calibration uncertainty rescue the leak theory?

**Format/placement:** STRESS, asked at Commander Laila Abiola beside `evidence-board`.

**Metadata:** Concept: 7 - uncertainty/robustness; Keystone: evidence must be independent; Area: Plant Control; Learning role: APPLY; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the evidence board in Plant Control.

**Stop reason - exact player copy:** The leak theory is weakened, but the conclusion still needs testing against calibration uncertainty.

**Question card story setup - exact player copy:** The carbon-intake calibration can be varied over the displayed uncertainty range. The panel compares each resulting carbon residual with the methane schedule shortfall and the separate hydrogen-delivery evidence.

**Question card story-science connection - exact player copy:** The largest supported carbon residual determines whether a leak could account for the production shortfall.

**Question card prompt - exact player copy:** Stress the carbon-intake
calibration across its allowed range. Which diagnosis remains viable
throughout?

**Complete format-specific interaction block:**

```yaml
stress:
  assumption: {id: carbon_flow_bias, label: "Carbon-intake calibration bias", min: -2.0, max: 2.0, step: 0.5, unit: percent}
  candidates:
    - {id: methane_leak, label: "Large methane leak", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]}
    - {id: low_co2, label: "Insufficient CO2", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]}
    - {id: low_h2, label: "Hydrogen delivery deficiency", viability: [[-2,true],[-1,true],[0,true],[1,true],[2,true]]}
    - {id: dead_sensor, label: "Dead methane sensor", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]}
  boundary: "A leak must explain an 18% schedule gap; allowed bias never creates that residual."
  correct: low_h2
```

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 22 - Does calibration uncertainty rescue the leak theory?"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Stress the carbon-intake calibration across its allowed range. Which diagnosis remains viable throughout?"
  payload: "```yaml stress: assumption: {id: carbon_flow_bias, label: \"Carbon-intake calibration bias\", min: -2.0, max: 2.0, step: 0.5, unit: percent} candidates: - {id: methane_leak, label: \"Large methane leak\", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]} - {id: low_co2, label: \"Insufficient CO2\", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]} - {id: low_h2, label: \"Hydrogen delivery deficiency\", viability: [[-2,true],[-1,true],[0,true],[1,true],[2,true]]} - {id: dead_sensor, label: \"Dead methane sensor\", viability: [[-2,false],[-1,false],[0,false],[1,false],[2,false]]} boundary: \"A leak must explain an 18% schedule gap; allowed bias never creates that residual.\" correct: low_h2 ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "pressure-gauge calibration error", min: -0.5, max: 0.5, nominal: 0.0, step: 0.1, unit: "atm"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.0, max: 0.0}
      failsAt: 0.5
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.0, max: 0.5}
      failsAt: -0.5
    - id: robust_plan
      label: "Hydrogen delivery deficiency remains viable. Even"
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: -0.5, max: 0.5}
  robust: robust_plan
  question: "Stress the carbon-intake"
```

**Correct result:** Hydrogen delivery deficiency remains viable. Even
the largest plausible carbon residual is far below the 18% schedule
shortfall required by a large methane leak.

**Answer text:** The hydrogen-delivery diagnosis survives the full allowed calibration range.

**Why:** Robust conclusions survive reasonable error. The exact residual
moves, but not enough to cross the decision boundary. Uncertainty should
weaken claims in proportion to its size, not erase all evidence.

**Wrong-path feedback:** Choosing the leak because "any uncertainty
means anything is possible" confuses uncertainty with ignorance.

**State/output:** Set evidence_flags.h2_diagnosis_robust = true;
authorize independent Tank Farm sampling.

## Stop 23 - Close C, H, and O at the Tank Farm

**Format/placement:** BALLPARK, at `farm-gauges`.

**Metadata:** Concept: 2 - full atom ledger; Keystone: particles, moles, balancing, and stoichiometry; Area: Reactor Hall; Learning role: RETRIEVE; Difficulty: L4; Story role: payoff.

**Call - exact player copy:** Go to the farm gauges, in Tank Farm.

**Stop reason - exact player copy:** The carbon result points away from a large leak, so hydrogen and oxygen need closing too.

**Question card story setup - exact player copy:** The reactor feed contains both reactants, but only one will run out first. The methane promise has to respect that limit.

**Question card prompt - exact player copy:** CO₂+4H₂→CH₄+2H₂O. Feed is 100 mol CO₂ and 320 mol H₂. Identify the limiting reactant, then fill its mole amount and the H₂:CH₄ coefficient in the methane calculation.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Close C, H, and O at the Tank Farm",
    "labels": [
      "320",
      "4",
      "100",
      "2"
    ],
    "values": [
      320,
      4,
      100,
      2
    ],
    "slots": 2,
    "template": "{a} / {b} = ? mol CH₄",
    "formula": "a/b",
    "correct": [
      0,
      1
    ],
    "target": 80,
    "tolerance": 0.01,
    "units": "mol CH₄",
    "correctResult": 80
  },
  "answerText": "H₂ is limiting: 320/4=80 mol CH₄, with 160 mol H₂O produced and 20 mol CO₂ left. Carbon, hydrogen and oxygen balance.",
  "wrongFeedback": [
    "The 100 mol CO₂ could produce 100 mol CH₄ only with 400 mol H₂."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** H₂ is limiting: 320/4=80 mol CH₄, with 160 mol H₂O produced and 20 mol CO₂ left. Carbon, hydrogen and oxygen balance.

**Wrong-path feedback:** The 100 mol CO₂ could produce 100 mol CH₄ only with 400 mol H₂.

**State/output:** Tank composition display changes from "missing mass"
to "unconverted CO2 / N2 dilution."

## Stop 24 - Rebuild the case

**Format/placement:** CASEBOOK, asked at Commander Laila Abiola beside `casebook-board`.

**Metadata:** Concept: 7 - clue reinterpretation; Keystone: evidence must be independent; Area: Plant Control; Learning role: COMBINE; Difficulty: L4; Story role: payoff.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the casebook board in Tank Farm.

**Stop reason - exact player copy:** The material balances and sensor checks are complete, allowing the early accusations to be reassessed.

**Question card story setup - exact player copy:** Match each old clue to its true meaning so the crew can decide whether to end the leak hunt and repair hydrogen delivery.

**Question card story-science connection - exact player copy:** The case mapping preserves valid observations while replacing explanations that conflict with the chemical evidence.

**Question card prompt - exact player copy:** Match each earlier clue to the meaning supported by later evidence.

**Complete format-specific interaction block:**

```yaml
scenarios:
  - {id: carbon, label: "Carbon ledger nearly closed", reading: "99.8% accounted"}
  - {id: pressure, label: "Pressure stayed nearly normal", reading: "19.5 atm"}
  - {id: residue, label: "Blue residue at valve", reading: "polar service fluid"}
  - {id: water, label: "Low coproduct water", reading: "below reaction prediction"}
  - {id: meters, label: "Three agreeing meters", reading: "one shared Standard C"}
choices:
  - {id: unreacted_co2, label: "Carbon remained in the process as unreacted CO2"}
  - {id: mixed_pressure, label: "Other gases maintained total pressure"}
  - {id: local_fluid, label: "Local maintenance fluid, not transported leak residue"}
  - {id: low_reaction, label: "Too little H2 reacted"}
  - {id: common_mode, label: "Shared calibration, not independent confirmation"}
mapping: {carbon: unreacted_co2, pressure: mixed_pressure, residue: local_fluid, water: low_reaction, meters: common_mode}
```

**Scenarios:** Carbon ledger nearly closed / Pressure stayed nearly
normal / Blue residue at valve / Low coproduct water / Three agreeing
meters.

**Choices:** Carbon remained in process, mostly as unreacted CO2 / Other
gases maintained total pressure / Local maintenance fluid, not
transported leak residue / Too little H2 reacted / Shared calibration,
not independent confirmation; mapping \[0,1,2,3,4\].

**Correct result:** Complete mapping.

**Answer text:** Each old clue maps to hydrogen-side underproduction or shared measurement error, not a large methane leak.

**Why:** Each observation was real. The error was the story attached to
it. Together they support a hydrogen-side production failure, not
methane disappearing after formation.

**Wrong-path feedback:** If a clue is matched to its old meaning, show
the specific later measurement that contradicted it.

**State/output:** twist_1_complete = true; shut down leak-search work
orders; crew_trust + 2.

## Mission outcome

Mission decision: End the methane-leak search. Repair the hydrogen line. One fault explains the carbon count, added nitrogen, low water, normal pressure, and false stain clue. Most of the missing fuel was never made. A signed heat-setting change now raises a new question.

**Segue - exact player copy:** But Ingrid finds Herrera's signed temperature change; repaired feed does not explain why the reactor was turned down.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Commander Laila Abiola pins the HYDROGEN-LINE REPAIR order across the linked raw records. But Ingrid finds Herrera's signed temperature change; repaired feed does not explain why the reactor was turned down.

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 08:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The leak hunt ends and idle equipment is released, but
another production shift has passed.

**Automatic bar change:** Methane -4 \| Oxygen 0 \| Power +5 \|
Integrity +3

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4. Result: METHANE 94% \| OXYGEN 86% \| POWER
100% \| INTEGRITY 92%. Recovery Bank: 19 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Sensitivity test:** changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- **Corroboration:** support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.

### Review question 1


**Prompt - exact player copy:** Which statement best explains sensitivity test?

**Options - exact player copy:**

- A. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- B. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- C. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- D. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for sensitivity test. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes corroboration. It does not answer the question about sensitivity test.
- B: This describes diagnosis. It does not answer the question about sensitivity test.
- C: This describes uncertainty. It does not answer the question about sensitivity test.
- D: Correct. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.

### Review question 2


**Prompt - exact player copy:** Which statement best explains corroboration?

**Options - exact player copy:**

- A. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- B. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- C. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- D. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for corroboration. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- B: This describes sensitivity test. It does not answer the question about corroboration.
- C: This describes diagnosis. It does not answer the question about corroboration.
- D: This describes uncertainty. It does not answer the question about corroboration.

### Review question 3


**Prompt - exact player copy:** Which statement best explains diagnosis?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- C. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for diagnosis. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sensitivity test. It does not answer the question about diagnosis.
- B: Correct. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- C: This describes corroboration. It does not answer the question about diagnosis.
- D: This describes uncertainty. It does not answer the question about diagnosis.

### Review question 4


**Prompt - exact player copy:** Which statement best explains uncertainty?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- C. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for uncertainty. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sensitivity test. It does not answer the question about uncertainty.
- B: This describes corroboration. It does not answer the question about uncertainty.
- C: Correct. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- D: This describes diagnosis. It does not answer the question about uncertainty.

### Review question 5


**Prompt - exact player copy:** Which statement best explains error?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- C. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- D. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for error. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes sensitivity test. It does not answer the question about error.
- B: This describes corroboration. It does not answer the question about error.
- C: This describes diagnosis. It does not answer the question about error.
- D: Correct. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.

### Review question 6


**Prompt - exact player copy:** Which statement best explains atom balance?

**Options - exact player copy:**

- A. Counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.
- B. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- C. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for atom balance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.
- B: This describes sensitivity test. It does not answer the question about atom balance.
- C: This describes corroboration. It does not answer the question about atom balance.
- D: This describes diagnosis. It does not answer the question about atom balance.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- The best diagnosis explains quiet readings and alarms together.

- Sensitivity analysis asks whether reasonable error can cross the
  decision boundary.

- Atom ledgers can explain where matter went even when product is low.

- Other gases can preserve total pressure while desired partial pressure
  falls.

- **Mission takeaway:** A scientific twist is fair when old clues remain true but acquire a better meaning.

# Mission 7 - Heat

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 7 - 9 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** HEAT

**Go now:** Go to the Sabatier Reactor and meet Dr. Tomás Herrera, the reactor and safety engineer, at the coolant panel.

**Card body:** 9 work shifts remain before launch. A heat strip ends above its limit beside a folded override sheet. Today you decide whether the cooling loss came before the setting change.

**Objective:** Reconstruct the heat flow and determine why the reactor
temperature was lowered.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 7: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m07_we01
    title: Calculate sensible heat
    problem: Warm 100 g of a material by 10 °C. Its specific heat is 4 J/(g °C).
    rule: q=mcΔT.
    steps:
    - 'Set up the relationship: q=mcΔT.'
    - q=100(4)(10)=4000 J=4 kJ.
    answer: The material absorbs 4 kJ.
    common_mistake: Use temperature change, not final temperature.
  - id: mars_m07_we02
    title: Scale reaction enthalpy
    problem: A reaction releases 40 kJ per mole of reactant consumed. Find system enthalpy change for 2 mol.
    rule: ΔH=n ΔH_molar; heat release has a negative system sign.
    steps:
    - 'Set up the relationship: ΔH=n ΔH_molar; heat release has a negative system sign.'
    - ΔH=2(-40)=-80 kJ.
    answer: The reacting system has ΔH=-80 kJ.
    common_mistake: Released energy is positive in magnitude but negative as system enthalpy change.
  - id: mars_m07_we03
    title: Heat during melting
    problem: A 20 g solid melts at its melting point. Latent heat of fusion is 100 J/g. Find heat absorbed.
    rule: q=mL_f during the phase change.
    steps:
    - 'Set up the relationship: q=mL_f during the phase change.'
    - q=20(100)=2000 J.
    answer: The solid absorbs 2 kJ without a temperature rise during ideal melting.
    common_mistake: Using mcΔT alone misses latent heat.
  - id: mars_m07_we04
    title: Combine reaction enthalpies
    problem: Reaction A→B has ΔH=+20 kJ/mol and B→C has ΔH=-50 kJ/mol. Find ΔH for A→C.
    rule: Add enthalpies for reactions that sum to the target reaction.
    steps:
    - 'Set up the relationship: Add enthalpies for reactions that sum to the target reaction.'
    - ΔH_total=20-50=-30 kJ/mol.
    answer: A→C has ΔH=-30 kJ/mol.
    common_mistake: Reversing a reaction would also reverse its enthalpy sign.
  - id: mars_m07_we05
    title: Warm a fixed-volume gas
    problem: A sealed ideal-gas sample has pressure 20 atm at 300 K. Find its pressure at 330 K if no reaction occurs.
    rule: At fixed amount and volume, P₂/P₁=T₂/T₁.
    steps:
    - 'Set up the relationship: At fixed amount and volume, P₂/P₁=T₂/T₁.'
    - P₂=20(330/300)=22 atm.
    answer: The predicted pressure is 22 atm.
    common_mistake: Adding 30 to the pressure confuses temperature change with pressure change.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Heat: energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

Exothermic: process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.

Specific heat capacity: the heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.

Phase change: moves matter between solid, liquid, and gas without changing its chemical identity. During the change, energy can move while temperature stays constant.

#### Primer concepts

- The sign of reaction enthalpy tells whether higher production adds to or reduces the cooling burden.
- A delayed temperature signal can result from melting or another phase change, not from a delayed event.
- Event order should follow physical energy flows rather than the order in which gauges respond.

#### Equations first needed today

**Equation:** q = mcΔT  
**What it is for:** calculating heat from a measured temperature change  
**Symbols:** q is heat; m is mass; c is specific heat capacity; ΔT is final temperature minus initial temperature.  
**Why this campaign needs it:** The coolant temperature rise reveals how much reactor heat was actually removed before the temperature override.  

**Equation:** `E_stored=E_generated-E_removed-E_carried`  
**What it is for:** closing a thermal ledger  
**Symbols:** `E_stored` energy retained in equipment or gas; `E_generated` reaction energy released; `E_removed` energy removed by cooling; `E_carried` energy carried out with matter. All four use the same energy unit.  
**Why this campaign needs it:** A positive remainder can create an inlet hot spot even when the average reactor temperature looks safe.  

**Crew on this mission - mission log:** Dr. Tomás Herrera - reactor and safety engineer; Mei-Ling Cho - water and cryogenics engineer; Ingrid Sundqvist - production and catalyst lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

The investigation moves from Reactor Hall to Cold End because a
heat-rejection change connects both systems. The player identifies
exothermic behavior, calculates a coolant load, orders a
heating/phase-change path, and closes an energy ledger. The final ledger
shows that someone deliberately reduced the set point as heat rejection
weakened.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Reactor Hall \| automatic**

**Trigger:** mission_7_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** A heat strip ends above its limit beside a folded override sheet.

**Panel/HUD text:** MISSION 7 - HEAT

**Dialogue bubbles -** Abiola: "The old setting might recover fuel quickly. If it also recreates a dangerous condition, it could destroy our only reactor. Establish where the heat goes before anyone restores it."

**Unlocks:** Stop 25 at the reactor coolant panel; Stop 26 unlocks immediately after Stop 25.
**Beat 2 - After Stops 25 and 26 \| reactor coolant panel \| automatic response**

**Trigger:** accepted_stop_25.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `skid`, the dated accepted-result slip for Stop 25 reads: "First choice.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RESULT RECORDED

**Dialogue bubbles -** Herrera: "Nice work. More methane means more heat to remove. The question is whether the cooling system still had that capacity."

**Unlocks:** The radiator-side travel beat.
**Beat 3 - After Stop 26 \| reactor coolant panel \| automatic travel authorization**

**Trigger:** accepted_stop_26.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `reactor-calculation-bench`, the dated accepted-result slip for Stop 26 reads: "11,400 kJ or 11.4 MJ; tolerance ±2%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MOVE TO COLD END.

**Dialogue bubbles -** Cho: "Good thinking. The phase change delays the signal. To learn what failed first, we need the radiator-side ledger."

**Waypoint:** Cold End

**Unlocks:** The Cold End waypoint and Stop 27; Stop 28 unlocks immediately after Stop 27.
**Beat 4 - After Stops 27 and 28 \| Cold End \| automatic discovery**

**Trigger:** accepted_stop_27.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `heat-model-board`, the dated accepted-result slip for Stop 27 reads: "As listed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RADIATOR PERFORMANCE FELL FIRST / REACTOR SET POINT FELL SECOND.

**Dialogue bubbles -** Herrera: "Exactly right. I lowered the temperature after heat rejection weakened."

**Unlocks:** The Mission 7 outcome beat.
**Beat 5 - At mission end \| Cold End \| automatic outcome and hook**

**Trigger:** accepted_stop_28.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `phase-radiator`, Dr. Tomás Herrera clips the 2.7 MJ RETAINED heat ledger to the radiator board. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - PLANT CONTROL RATE BOARD.

**Dialogue bubbles -** Dr. Tomás Herrera: "I should have shown you this before I touched the setting. But Ingrid can still show the rate fell after the override; Herrera must let her test the change itself."

**Waypoint:** Plant Control

**Unlocks:** Mission 8 briefing and the Plant Control waypoint.
### Physical aftermath — mars-m07

**Home:** `phase-radiator`. **Before:** The dated mission-7 evidence holder at this fixture has no accepted record. A heat strip ends above its limit beside a folded override sheet.
**After — exact action:** Dr. Tomás Herrera clips the 2.7 MJ RETAINED heat ledger to the radiator board.
**Trigger:** accepted_stop_28. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `verification-panel`, herrera's name appears on a sheet no one has put back in its folder.
**Segue - exact player copy:** But Ingrid can still show the rate fell after the override; Herrera must let her test the change itself.

## Location plan

**Two locations:** Reactor Hall (EQUIL) for Stops 25-27, then Cold End
(PHASE) for Stop 28. Rising coolant return temperature at the reactor
triggers inspection of the shared radiator loop.

## Characters and dramatic beat

Sundqvist openly accuses Herrera of trading production for caution.
Herrera confirms that he changed the set point but will not explain
until the raw thermal log is recovered. Cho discovers radiator
performance fell before the override, complicating the accusation.

## Key concepts, explained here

An exothermic process releases heat to the surroundings; an endothermic
process absorbs it. q = mc Delta T connects mass, specific heat, and
temperature change. On a heating curve, sloped segments change
temperature and flat segments use energy for a phase change. An energy
ledger counts heat generated, removed, stored, and unaccounted.

### Character scene: mars-yusuf-entrance

**Trigger:** On arrival at Reactor Hall during Mission 7, when Stop 25 is the next active stop; if the player is already here, fire once on that stop’s existing activation instead of requiring re-entry.
**Location and presence:** `skid` in Reactor Hall. Yusuf Demir, power and life-support officer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Continue the existing arrival beat before the question opens. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Opens the habitat reserve-breaker log while the others discuss reactor output.
**Exact dialogue:**
- Yusuf Demir, power and life-support officer: “Show me what the recycle loop can return before I promise more habitat power.”

**World-state effect:** No result is added or revealed; the encounter introduces the record or equipment already available for this stop.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-yusuf-entrance` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

## Stop 25 - Which way does the heat flow?

**Format/placement:** CHOICE, asked at Ingrid Sundqvist beside `skid`.

**Metadata:** Concept: 8 - exothermic/endothermic; Keystone: energy and calorimetry; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Call - exact player copy:** Talk to Ingrid Sundqvist, at the reactor skid in Reactor Hall.

**Stop reason - exact player copy:** Recovery work is shifting to the reactor, where the direction of heat transfer matters for restart.

**Question card story setup - exact player copy:** That sign determines whether more production adds or removes reactor heat.

**Question card story-science connection - exact player copy:** The heat sign establishes whether increased methane production adds to the cooling burden.

**Question card prompt - exact player copy:** What does the negative
enthalpy mean?

**Choices:**

1. The reaction is exothermic; 165 kJ must leave per mole CH4 formed **(correct)**

2. It is endothermic and needs 165 kJ added.

3. The catalyst consumes 165 kJ.

4. The sign describes reaction speed.

**Correct result:** First choice.

**Answer text:** The negative enthalpy means the Sabatier reaction is exothermic and releases heat.

**Why:** Negative Delta H means products have lower enthalpy than
reactants and the difference appears as heat released. A catalyst
changes activation energy, not Delta H. Enthalpy says nothing directly
about speed.

**Wrong-path feedback:** (2) Negative ΔH means heat is released, not absorbed; the surroundings must remove that heat. (3) A catalyst changes activation energy and reaction speed but is not an energy sink and does not consume the reaction enthalpy. (4) The sign of ΔH describes energy change, not reaction rate; kinetics is a separate question.

**State/output:** Enable coolant-load calculation.

## Stop 26 - Size the coolant load

**Format/placement:** BALLPARK, at `reactor-calculation-bench`.

**Metadata:** Concept: 8 - calorimetry; Keystone: energy and calorimetry; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the reactor calculation bench, in Reactor Hall.

**Stop reason - exact player copy:** The heat-flow direction is established and the coolant's removal capacity needs quantifying.

**Question card story setup - exact player copy:** The coolant log shows a temperature rise. The crew needs the heat absorbed to close the reactor’s energy account.

**Question card prompt - exact player copy:** For 1,000 kg coolant with specific heat 3.8 kJ/(kg·K) and temperature rise 3 K, fill m,c,ΔT in Q=mcΔT.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Size the coolant load",
    "labels": [
      "1000",
      "3.8",
      "3",
      "273"
    ],
    "values": [
      1000,
      3.8,
      3,
      273
    ],
    "slots": 3,
    "template": "{a} × {b} × {c} = ? kJ",
    "formula": "a*b*c",
    "correct": [
      0,
      1,
      2
    ],
    "target": 11400,
    "tolerance": 228,
    "units": "kJ",
    "correctResult": 11400
  },
  "answerText": "The coolant absorbs 11,400 kJ. A temperature difference of 3 K is used directly; no absolute-temperature offset is added.",
  "wrongFeedback": [
    "Heat capacity multiplies the temperature change, not the absolute temperature."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The coolant absorbs 11,400 kJ. A temperature difference of 3 K is used directly; no absolute-temperature offset is added.

**Wrong-path feedback:** Heat capacity multiplies the temperature change, not the absolute temperature.

**State/output:** Add coolant_removed = 11.4 MJ to the ledger.

## Stop 27 - Follow energy through temperature and phase

**Format/placement:** SEQUENCE, at `heat-model-board`.

**Metadata:** Concept: 8 - heating curves; Keystone: energy and calorimetry; Area: Reactor Hall; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the heat-model board, in Reactor Hall.

**Stop reason - exact player copy:** The cooling record mixes temperature changes with phase changes and delayed sensor responses.

**Question card story setup - exact player copy:** The cooling record includes sensible heating, a phase change, and the response delay of the temperature sensor. The event cards show those physical steps alongside their recorded times.

**Question card story-science connection - exact player copy:** The energy sequence resolves the timing needed to identify which thermal change preceded the incident.

**Question card prompt - exact player copy:** Order the energy steps.

**Cards:** Warm solid ice to its melting point / Melt ice at constant
temperature using q = n Delta Hfus / Warm liquid water to final
temperature.

**Correct result:** As listed.

**Answer text:** Warm solid, melt at constant temperature, then warm liquid before comparing the delayed signal.

**Why:** Temperature rises within one phase, but during melting the
added energy breaks intermolecular organization while temperature stays
constant. Treating the plateau as mc Delta T invents a temperature
change that does not occur.

**Wrong-path feedback:** If melting is placed before the solid reaches its melting point, the phase-change step starts too early. If the melting plateau is treated as another temperature rise, the sequence ignores energy absorbed at constant temperature.

**State/output:** Model predicts a delayed warm return pulse reaching
Cold End.

## Stop 28 - Close the reactor-radiator energy ledger

**Format/placement:** BALANCE, at `phase-radiator`.

**Metadata:** Concept: 8 - energy conservation; Keystone: energy and calorimetry; Area: Reactor Hall; Learning role: COMBINE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the phase radiator, in Cold End.

**Stop reason - exact player copy:** The coolant transfer and timing are established, leaving the reactor's full energy balance to close.

**Question card story setup - exact player copy:** Use the corrected timeline to close the radiator energy ledger and determine whether cooling loss preceded Herrera's temperature change.

**Question card story-science connection - exact player copy:** The unexplained energy load indicates how much heating must accumulate outside the listed removal paths.

**Question card prompt - exact player copy:** Find the unremoved energy
and identify the operational consequence.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Heat released by reactor", value: 16.5, unit: MJ}
  streams:
    - {id: coolant, label: "Removed by coolant", value: 11.4, unit: MJ, count: true}
    - {id: bed_storage, label: "Stored in metal bed", value: 1.6, unit: MJ, count: true}
    - {id: product_gas, label: "Carried by product gas", value: 0.8, unit: MJ, count: true}
    - {id: dashboard_power, label: "Electrical drive power", value: 0.9, unit: MJ, count: false}
  closure: {accounted: 13.8, residual: 2.7, unit: MJ, tolerance: 0.05}
  correct_action: "Assign 2.7 MJ to accumulated hot-spot/structure load."
```

**Correct result:** 2.7 MJ remains unaccounted in the simplified removal
paths and accumulates as a hot-spot/structure load.

**Answer text:** The ledger leaves 2.7 MJ accumulating as a hot-spot or structure load.

**Why:** Energy generated must be removed, carried away, stored, or
accumulated elsewhere. 16.5 - 11.4 - 1.6 - 0.8 = 2.7 MJ. The radiator
degradation appears before Herrera's override; lowering the set point
reduced heat generation after removal capacity fell.

**Wrong-path feedback:** Do not count released heat and coolant gain on
the same side; do not interpret missing energy as destroyed.

**State/output:** Set evidence_flags.radiator_first = true and
evidence_flags.setpoint_changed = true; display Herrera's signed
override timestamp.

## Mission outcome

Mission decision: The cooling system grew weak before the reactor setting fell. The heat count leaves 2.7 MJ in the plant. That heat can form a hot spot. The lower setting then cut heat and fuel output. The next test asks if that change caused the fast drop in production.

**Segue - exact player copy:** But Ingrid can still show the rate fell after the override; Herrera must let her test the change itself.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Dr. Tomás Herrera clips the 2.7 MJ RETAINED heat ledger to the radiator board. But Ingrid can still show the rate fell after the override; Herrera must let her test the change itself.

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 08:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** Dust-obstructed radiators force heavy cooling loads and
expose the reactor to a thermal excursion.

**Automatic bar change:** Methane -3 \| Oxygen 0 \| Power -8 \|
Integrity -22

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +3; Power +6; Integrity +6. Result: METHANE 94%
\| OXYGEN 86% \| POWER 98% \| INTEGRITY 76%. Recovery Bank: 16 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Endothermic:** process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- **Enthalpy change:** records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- **Energy ledger:** counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

### Review question 1


**Prompt - exact player copy:** Which statement best explains endothermic?

**Options - exact player copy:**

- A. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- B. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.
- D. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for endothermic. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes enthalpy change. It does not answer the question about endothermic.
- B: Correct. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C: This describes energy ledger. It does not answer the question about endothermic.
- D: This describes heat. It does not answer the question about endothermic.

### Review question 2


**Prompt - exact player copy:** Which statement best explains enthalpy change?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for enthalpy change. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes endothermic. It does not answer the question about enthalpy change.
- B: This describes energy ledger. It does not answer the question about enthalpy change.
- C: Correct. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D: This describes heat. It does not answer the question about enthalpy change.

### Review question 3


**Prompt - exact player copy:** Which statement best explains energy ledger?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- C. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for energy ledger. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes endothermic. It does not answer the question about energy ledger.
- B: This describes enthalpy change. It does not answer the question about energy ledger.
- C: This describes heat. It does not answer the question about energy ledger.
- D: Correct. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

### Review question 4


**Prompt - exact player copy:** Which statement best explains heat?

**Options - exact player copy:**

- A. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- B. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for heat. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- B: This describes endothermic. It does not answer the question about heat.
- C: This describes enthalpy change. It does not answer the question about heat.
- D: This describes energy ledger. It does not answer the question about heat.

### Review question 5


**Prompt - exact player copy:** Which statement best explains exothermic?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for exothermic. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes endothermic. It does not answer the question about exothermic.
- B: Correct. Process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.
- C: This describes enthalpy change. It does not answer the question about exothermic.
- D: This describes energy ledger. It does not answer the question about exothermic.

### Review question 6


**Prompt - exact player copy:** Which statement best explains specific heat capacity?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- C. The heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for specific heat capacity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes endothermic. It does not answer the question about specific heat capacity.
- B: This describes enthalpy change. It does not answer the question about specific heat capacity.
- C: Correct. The heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.
- D: This describes energy ledger. It does not answer the question about specific heat capacity.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Negative Delta H means the reaction releases heat.

- q = mc Delta T; signs depend on the named system.

- Phase-change energy can enter while temperature stays constant.

- Energy ledgers include removal, transport, storage, and accumulation.

- **Mission takeaway:** Timing matters: radiator loss before the override changes the story of motive.

# Mission 8 - The Override

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 8 - 8 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE OVERRIDE

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the initial-rate board.

**Card body:** 8 work shifts remain before launch. Herrera's name appears on a sheet no one has put back in its folder. Today you decide what the signed setting change actually caused.

**Objective:** Measure the effect of the temperature change and verify
who made the override.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 8: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m08_we01
    title: Infer a rate order
    problem: Doubling [A] while holding all else fixed makes the initial reaction rate four times as large. Find the order in A.
    rule: If rate=k[A]^m, the rate ratio is 2^m.
    steps:
    - 2^m=4.
    - m=2 because 2²=4.
    answer: The reaction is second order in A over the tested conditions.
    common_mistake: Reaction coefficients do not generally determine measured rate orders.
  - id: mars_m08_we02
    title: Find a rate constant
    problem: For rate=k[A]², rate=0.08 mol/(L s) when [A]=0.2 mol/L. Find k.
    rule: k=rate/[A]².
    steps:
    - 'Set up the relationship: k=rate/[A]².'
    - k=0.08/(0.2)²=0.08/0.04=2 L/(mol s).
    answer: The rate constant is 2 L/(mol s).
    common_mistake: Square the concentration, and retain the resulting units.
  - id: mars_m08_we03
    title: Change two concentrations
    problem: A reaction has rate=k[A][B]². Double [A] and halve [B]. Find the rate factor.
    rule: rate_new/rate_old=(A_new/A_old)(B_new/B_old)².
    steps:
    - 'Set up the relationship: rate_new/rate_old=(A_new/A_old)(B_new/B_old)².'
    - rate factor=2(1/2)²=1/2.
    answer: The new rate is half the original rate.
    common_mistake: Halving B changes its squared contribution by one quarter.
  - id: mars_m08_we04
    title: Use a reversible intervention
    problem: A lamp draws 2 A at setting A, 3 A at setting B, and 2 A after returning to A. Supply voltage and the lamp are unchanged. What does this support?
    rule: Change one proposed cause, hold other relevant factors fixed, then restore the original condition.
    steps:
    - A → B changes the current by 3-2 = 1 A.
    - B → A restores 2 A. The response reverses with the setting under the stated controls.
    answer: The result supports a setting effect under these test conditions.
    common_mistake: One intervention does not prove the effect is identical under every other condition.
  - id: mars_m08_we05
    title: Explain surface area
    problem: Equal masses of the same solid react with the same excess solution. One is powdered and one is a single piece. Why may powder react faster?
    rule: For a surface reaction, more exposed surface can provide more reaction sites.
    steps:
    - Powder exposes more surface per unit mass.
    - More sites can contact the solution at once, increasing the observed rate under comparable conditions.
    answer: Powder can react faster without changing the theoretical product amount.
    common_mistake: A rate increase does not create extra reactant.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Reaction rate: measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

Rate law: describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

Reaction order: the exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.

Rate constant: the proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.

#### Primer concepts

- Compare trials that change one concentration at a time.
- Rate describes speed, not the final amount present after the reaction settles.
- A signed action record proves who changed a control; a reversible experiment proves the control's immediate physical effect.

#### Equations first needed today

**Chemical formulas:** `CO2` is carbon dioxide and `H2` is hydrogen.

**Equation:** rate = k[CO2]^m[H2]^n  
**What it is for:** predicting how carbon-dioxide and hydrogen concentrations change methane-production speed  
**Symbols:** `rate` methane formation per unit time; `k` rate constant; `[CO2]` carbon-dioxide concentration; `[H2]` hydrogen concentration; `m` and `n` experimentally measured reaction orders.  
**Why this campaign needs it:** The crew must quantify how hydrogen dilution and the temperature setting changed production before judging the override.  

**Equation:** k = rate / ([CO2]^m[H2]^n)  
**What it is for:** finding the rate constant from one measured trial  
**Symbols:** `k` rate constant; `rate` measured methane formation per unit time; `[CO2]` carbon-dioxide concentration; `[H2]` hydrogen concentration; `m` and `n` reaction orders.  
**Why this campaign needs it:** A correct baseline lets the controlled temperature reversal be compared to the response predicted at the starting condition.  

**Crew on this mission - mission log:** Commander Laila Abiola - mission commander; Ingrid Sundqvist - production and catalyst lead; Dr. Tomás Herrera - reactor and safety engineer.



## Main story happening - designer summary

Plant Control supplies historical initial-rate data. Reactor Hall allows
a reversible controlled test. The player confirms that temperature
affects rate while concentration is held fixed, and authenticates the
override against independent records. The apparent case against Herrera
becomes stronger immediately before it will be overturned.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Plant Control \| automatic**

**Trigger:** mission_8_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** Herrera's name appears on a sheet no one has put back in its folder.

**Panel/HUD text:** MISSION 8 - THE OVERRIDE

**Dialogue bubbles -** Abiola: "We know the temperature changed and production later fell. Determine exactly how the reaction responds, then reproduce the effect while every other condition is held fixed."

**Unlocks:** Stop 29 at the rate board; Stop 30 unlocks immediately after Stop 29.
**Beat 2 - After Stops 29 and 30 \| rate board \| automatic response**

**Trigger:** accepted_stop_29.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `rate-board`, the dated accepted-result slip for Stop 29 reads: "First order in CO2 and second order in H2.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** CONTROLLED REVERSAL AUTHORIZED.

**Dialogue bubbles -** Sundqvist: "Nice work. Hydrogen dilution hurts twice in the rate law. Now isolate temperature at the reactor."

**Waypoint:** Sabatier Reactor

**Unlocks:** The Sabatier Reactor waypoint and Stop 31.
**Beat 3 - After Stop 31 \| Sabatier Reactor \| automatic causal result**

**Trigger:** accepted_stop_30.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `rate-board`, the dated accepted-result slip for Stop 30 reads: "0.300 M^-2 s^-1; tolerance +/-2%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** TEMPERATURE CHANGE CAUSES RATE CHANGE / RESPONSE REVERSIBLE.

**Dialogue bubbles -** Abiola: "Good thinking. The override caused the immediate slowdown. That proves the effect, not the motive."

**Unlocks:** Stop 32 at the verification panel.
**Beat 4 - After Stop 32 \| verification panel \| automatic character beat**

**Trigger:** accepted_stop_31.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `skid`, the dated accepted-result slip for Stop 31 reads: "Lower temperature alone, observe rate fall, restore temperature, observe rate return.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Abiola: "Exactly right. Herrera made the change. The hardware changed when the signed log says it did." Herrera: "Then inspect the bed before you decide whether I should have left it hot."

**Unlocks:** The Mission 8 outcome beat.
**Beat 5 - At mission end \| Reactor Hall \| automatic outcome and hook**

**Trigger:** accepted_stop_32.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `verification-panel`, Ingrid Sundqvist pins the RATE DROP VERIFIED / MOTIVE UNRESOLVED strip beside the signature. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT DESTINATION - CATALYST BAY.

**Dialogue bubbles -** Ingrid Sundqvist: "I can prove it slowed us. That is not the same as proving why. But Cho's bed sample carries halide; the damaged catalyst must be mapped before the old setting can return."

**Waypoint:** Catalyst Bay

**Unlocks:** Mission 9 briefing and the Catalyst Bay waypoint.
### Physical aftermath — mars-m08

**Home:** `verification-panel`. **Before:** The dated mission-8 evidence holder at this fixture has no accepted record. Herrera's name appears on a sheet no one has put back in its folder.
**After — exact action:** Ingrid Sundqvist pins the RATE DROP VERIFIED / MOTIVE UNRESOLVED strip beside the signature.
**Trigger:** accepted_stop_32. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `bed`, an inlet sample lies beside a much cleaner outlet sample.
**Segue - exact player copy:** But Cho's bed sample carries halide; the damaged catalyst must be mapped before the old setting can return.

## Location plan

**Two locations:** Plant Control (GIBBS) for Stops 29-30 and 32; Reactor
Hall (EQUIL) for Stop 31. The rate model predicts a reversible test,
sending the player to the reactor, then the test sends them back to
authenticate who changed the setting.

## Characters and dramatic beat

Abiola removes Herrera's control access pending review. Herrera
cooperates without defending his motive. Sundqvist helps the player
design the fair rate comparison, showing that her pressure for output
does not make her anti-science.

## Key concepts, explained here

A rate law is determined from experiments: rate = k\[A\]^m\[B\]^n.
Coefficients do not generally supply reaction orders. Compare trials
where one concentration changes and the other is held constant. The rate
constant k depends on temperature. A controlled experiment changes one
factor, holds others fixed, and reverses the change to separate
causation from drift. A record proves an action only when identity and
timing are independently verified.

## Stop 29 - Read the initial-rate table

**Format/placement:** CHOICE, asked at Ingrid Sundqvist beside `rate-board`.

**Metadata:** Concept: 9 - experimental rate laws; Keystone: kinetics and rate law; Area: Catalyst Bay; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Talk to Ingrid Sundqvist, at the rate board in Plant Control.

**Stop reason - exact player copy:** The thermal review is complete and the rate data can now test the effect of diluted hydrogen.

**Question card story setup - exact player copy:** The exponents will predict why hydrogen dilution damages output so strongly.

**Question card story-science connection - exact player copy:** The reaction orders show how strongly output responds to each feed concentration.

**Question card prompt - exact player copy:** Which rate law fits?

**Choices:**

1. rate = k\[CO2\]\[H2\]^2 **(correct)**

2. rate = k\[CO2\]^2\[H2\]

3. rate = k\[CO2\]\[H2\]

4. rate = k\[CO2\]^2\[H2\]^4

**Correct result:** First order in CO2 and second order in H2.

**Answer text:** The rate law is rate = k[CO2][H2]^2.

**Why:** Doubling CO2 at fixed H2 doubles rate, so exponent 1. Doubling
H2 at fixed CO2 quadruples rate, so exponent 2. Overall order is 3.

**Wrong-path feedback:** (2) Doubling CO2 at fixed H2 doubles the rate, so CO2 is first order rather than second order. (3) Doubling H2 at fixed CO2 quadruples the rate, so H2 is second order rather than first order. (4) Copying balanced-equation coefficients into a rate law overpredicts both concentration effects; reaction orders come from the trials.

**State/output:** Rate-law card added to case file.

## Stop 30 - Calculate k

**Format/placement:** BALLPARK, at `rate-board`.

**Metadata:** Concept: 9 - rate constant/units; Keystone: kinetics and rate law; Area: Catalyst Bay; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the rate board, in Plant Control.

**Stop reason - exact player copy:** The reaction orders are identified and the temperature intervention needs a quantitative rate baseline.

**Question card story setup - exact player copy:** The rate measurements have fixed the reaction orders. The operator now needs the constant that makes the model predict this run.

**Question card prompt - exact player copy:** The rate law is rate=k[A][B]². Measured rate is 1.20×10⁻³ M/s at [A]=0.10 M and [B]=0.20 M. Fill rate,[A],[B] in k=rate/([A][B]²).

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Calculate k",
    "labels": [
      "0.0012",
      "0.1",
      "0.2",
      "2"
    ],
    "values": [
      0.0012,
      0.1,
      0.2,
      2
    ],
    "slots": 3,
    "template": "{a} / ({b} × {c} × {c}) = ? M⁻²·s⁻¹",
    "formula": "a/(b*c*c)",
    "correct": [
      0,
      1,
      2
    ],
    "target": 0.3,
    "tolerance": 0.006,
    "units": "M⁻²·s⁻¹",
    "correctResult": 0.3
  },
  "answerText": "k=0.00120/(0.10×0.20²)=0.300 M⁻²·s⁻¹. The squared concentration is essential to both the value and the units.",
  "wrongFeedback": [
    "Treating the second-order factor as first order gives the wrong constant."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** k=0.00120/(0.10×0.20²)=0.300 M⁻²·s⁻¹. The squared concentration is essential to both the value and the units.

**Wrong-path feedback:** Treating the second-order factor as first order gives the wrong constant.

**State/output:** Predicts the rate drop expected from reduced
temperature for Stop 31.

## Stop 31 - Establish causation by reversal

**Format/placement:** CONTROL, operated at `skid`.

**Metadata:** Concept: 9 - temperature and rate; Keystone: kinetics and rate law; Area: Catalyst Bay; Learning role: APPLY; Difficulty: L3; Story role: character.

**Call - exact player copy:** Go to the reactor skid, in Reactor Hall.

**Stop reason - exact player copy:** The rate baseline is fixed and the suspected temperature effect is ready for a controlled intervention.

**Question card story setup - exact player copy:** Hold feed, pressure, and flow fixed and reverse only temperature to prove whether Herrera's change caused the slowdown.

**Question card story-science connection - exact player copy:** A reversible rate response isolates temperature as a cause rather than relying on coincident changes.

**Question card prompt - exact player copy:** Which controlled change
demonstrates that the override caused the immediate rate loss, and does
the response reverse?

**Complete format-specific interaction block:**

```yaml
control:
  variables:
    - {id: temperature_K, label: "Reactor temperature", baseline: 560, test: 540, unit: K}
    - {id: co2_M, label: "CO2 concentration", baseline: 0.10, test: 0.10, unit: M}
    - {id: h2_M, label: "H2 concentration", baseline: 0.20, test: 0.20, unit: M}
    - {id: pressure_bar, label: "Pressure", baseline: 10, test: 10, unit: bar}
    - {id: flow_index, label: "Flow", baseline: 100, test: 100, unit: index}
  candidates: [temperature_K, h2_M, pressure_bar]
  response: {label: "Rate index", baseline: 100, after_change: 72, after_restore: 100, noise_band: 2}
  required_sequence: [change_temperature_only, measure, restore_temperature, measure_again]
  correct: temperature_K
```

**Correct result:** Lower temperature alone, observe rate fall, restore
temperature, observe rate return.

**Answer text:** Lower only temperature, observe the rate fall, then restore temperature and observe the rate return.

**Why:** Reversal makes drift less plausible. The result proves the
lower set point reduced reaction rate. It does not prove whether
lowering it was unnecessary, because the short test does not recreate
the developing thermal condition.

**Wrong-path feedback:** Changing flow or concentration confounds the
intended causal question. A one-way change without restoration cannot
separate intervention from drift.

**State/output:** Set evidence_flags.override_caused_rate_drop = true.

## Stop 32 - Verify who changed it

**Format/placement:** ATTEST, asked at Commander Laila Abiola beside `verification-panel`.

**Metadata:** Concept: 9 - verification/chain of custody; Keystone: evidence must be independent; Area: Plant Control; Learning role: APPLY; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the verification panel in Plant Control.

**Stop reason - exact player copy:** The intervention's physical effect is established, but who changed the setting still needs independent records.

**Question card story setup - exact player copy:** With the effect established, compare independent access and instrument records to determine who made the change and when.

**Question card story-science connection - exact player copy:** The audit distinguishes evidence of an action and its timing from unsupported claims about motive.

**Question card prompt - exact player copy:** Choose the three checks that verify who changed the setting and when.

**Complete format-specific interaction block:**

```yaml
attest:
  limit: 3
  claims:
    - {id: presence, label: "Herrera was in Reactor Hall", backing: "Badge log", backed: true, critical: false}
    - {id: command, label: "Herrera's authenticated account changed the set point", backing: "Signed controller audit", backed: true, critical: true}
    - {id: physical_change, label: "Temperature changed at the same time", backing: "Independent temperature historian", backed: true, critical: true}
    - {id: written_note, label: "The handwritten note was written before the change", backing: "No verified timestamp", backed: false, critical: false}
    - {id: sabotage_motive, label: "The change was intended as sabotage", backing: "No direct evidence", backed: false, critical: true}
  recommended_checks: [command, physical_change, presence]
  correct: "Action and time verified; sabotage motive remains unbacked."
```

**Claims/evidence options:** Badge log (places Herrera at Reactor Hall);
controller audit with cryptographic user ID and timestamp; handwritten
maintenance note; independent temperature historian; colleague's memory.
Budget permits three checks.

**Correct result:** Controller audit + independent temperature historian
establish the change and time; badge log supports presence. The note and
memory alone are insufficient.

**Answer text:** Use the controller audit, independent temperature history, and badge log; motive remains unverified.

**Why:** A record of access is not a record of the physical condition,
and a physical trace without identity does not name the actor.
Independent identity and condition records together verify the claim.

**Wrong-path feedback:** Spending only on repeated access evidence
proves presence several times but not the temperature change.

**State/output:** herrera_access_suspended = true; case file reads
ACTION VERIFIED / MOTIVE OPEN.

## Mission outcome

Mission decision: The signed change caused the fast rate drop. Its purpose is still not known. One test lowers and restores the rate while all other controls stay fixed. Separate records prove who made the change and when. The catalyst bed must be mapped before the old setting can return.

**Segue - exact player copy:** But Cho's bed sample carries halide; the damaged catalyst must be mapped before the old setting can return.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ingrid Sundqvist pins the RATE DROP VERIFIED / MOTIVE UNRESOLVED strip beside the signature. But Cho's bed sample carries halide; the damaged catalyst must be mapped before the old setting can return.

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 08:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The controlled temperature reversal costs production
and power but restores part of the safety margin.

**Automatic bar change:** Methane -3 \| Oxygen 0 \| Power -4 \|
Integrity +8

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +3; Power +6; Integrity +6. Result: METHANE 94%
\| OXYGEN 86% \| POWER 100% \| INTEGRITY 90%. Recovery Bank: 13 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Controlled experiment:** changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- **Noise band:** the small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.

### Review question 1


**Prompt - exact player copy:** Which statement best explains controlled experiment?

**Options - exact player copy:**

- A. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- B. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- C. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- D. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for controlled experiment. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes noise band. It does not answer the question about controlled experiment.
- B: This describes reaction rate. It does not answer the question about controlled experiment.
- C: This describes rate law. It does not answer the question about controlled experiment.
- D: Correct. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.

### Review question 2


**Prompt - exact player copy:** Which statement best explains noise band?

**Options - exact player copy:**

- A. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- B. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- C. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- D. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for noise band. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- B: This describes controlled experiment. It does not answer the question about noise band.
- C: This describes reaction rate. It does not answer the question about noise band.
- D: This describes rate law. It does not answer the question about noise band.

### Review question 3


**Prompt - exact player copy:** Which statement best explains reaction rate?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- C. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for reaction rate. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes controlled experiment. It does not answer the question about reaction rate.
- B: Correct. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- C: This describes noise band. It does not answer the question about reaction rate.
- D: This describes rate law. It does not answer the question about reaction rate.

### Review question 4


**Prompt - exact player copy:** Which statement best explains rate law?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- C. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for rate law. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes controlled experiment. It does not answer the question about rate law.
- B: This describes noise band. It does not answer the question about rate law.
- C: Correct. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- D: This describes reaction rate. It does not answer the question about rate law.

### Review question 5


**Prompt - exact player copy:** Which statement best explains reaction order?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- C. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- D. The exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for reaction order. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes controlled experiment. It does not answer the question about reaction order.
- B: This describes noise band. It does not answer the question about reaction order.
- C: This describes reaction rate. It does not answer the question about reaction order.
- D: Correct. The exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.

### Review question 6


**Prompt - exact player copy:** Which statement best explains rate constant?

**Options - exact player copy:**

- A. The proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.
- B. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- C. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for rate constant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.
- B: This describes controlled experiment. It does not answer the question about rate constant.
- C: This describes noise band. It does not answer the question about rate constant.
- D: This describes reaction rate. It does not answer the question about rate constant.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Reaction orders come from controlled rate data, not usually
  coefficients.

- Doubling-response patterns reveal exponents in a rate law.

- Units of k depend on overall order.

- Control one variable and reverse it to establish a causal response.

- **Mission takeaway:** Verification may require separate evidence for identity, timing, and physical condition.

# Mission 9 - The Catalyst Bed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 9 - 7 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE CATALYST BED

**Go now:** Go to Catalyst Bay and meet Dr. Tomás Herrera, the reactor and safety engineer, at the bed-sampling rail.

**Card body:** 7 work shifts remain before launch. An inlet sample lies beside a much cleaner outlet sample. Today you decide which part of the catalyst bed needs replacement.

**Objective:** Locate the catalyst-bed failure and distinguish damage,
reactant shortage, and overheating.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 9: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m09_we01
    title: Explain a catalyst
    problem: A catalyst lowers activation barriers without changing reactant and product energies. What changes at a fixed temperature?
    rule: A catalyst offers a faster pathway but does not change the equilibrium constant.
    steps:
    - Forward and reverse reactions can proceed faster.
    - The equilibrium composition stays the same, though it is reached sooner.
    answer: The catalyst changes kinetics, not the equilibrium constant.
    common_mistake: A faster forward reaction alone does not imply a new equilibrium yield.
  - id: mars_m09_we02
    title: Identify an intermediate
    problem: A mechanism has A+B→X and X+C→D+B. Identify intermediate and catalyst.
    rule: An intermediate is formed then consumed; a catalyst is consumed then regenerated.
    steps:
    - X is produced in the first step and consumed in the second.
    - B is consumed in the first step and regenerated in the second; net reaction A+C→D.
    answer: X is an intermediate and B is a catalyst.
    common_mistake: Both cancel from the net equation, but their roles differ.
  - id: mars_m09_we03
    title: Explain surface area
    problem: Equal masses of the same solid react with the same excess solution. One is powdered and one is a single piece. Why may powder react faster?
    rule: For a surface reaction, more exposed surface can provide more reaction sites.
    steps:
    - Powder exposes more surface per unit mass.
    - More sites can contact the solution at once, increasing the observed rate under comparable conditions.
    answer: Powder can react faster without changing the theoretical product amount.
    common_mistake: A rate increase does not create extra reactant.
  - id: mars_m09_we04
    title: Interpret a blocked catalyst
    problem: An added substance binds strongly to catalyst surface sites. The rate drops while temperature and reactant concentrations stay fixed.
    rule: Blocked active sites can reduce catalytic activity.
    steps:
    - Fewer sites remain available for the intended reaction.
    - This supports a site-blocking explanation; controlled comparisons can test it.
    answer: The observation is consistent with catalyst poisoning.
    common_mistake: A slower reaction does not by itself establish a changed equilibrium constant.
  - id: mars_m09_we05
    title: Infer a rate order
    problem: Doubling [A] while holding all else fixed makes the initial reaction rate four times as large. Find the order in A.
    rule: If rate=k[A]^m, the rate ratio is 2^m.
    steps:
    - 2^m=4.
    - m=2 because 2²=4.
    answer: The reaction is second order in A over the tested conditions.
    common_mistake: Reaction coefficients do not generally determine measured rate orders.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Catalyst: speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.

Equilibrium: the steady state reached when forward and reverse chemical changes occur at equal rates. A catalyst reaches that state faster but does not change the final mixture at a fixed temperature.

Intermediate: made in one mechanism step and consumed in a later step. It does not appear in the final balanced equation.

Catalyst poisoning: occurs when another substance blocks or changes active sites. A poison entering at one end can create a spatial failure rather than a uniform loss.

#### Primer concepts

- A catalyst changes how fast equilibrium is reached, not where equilibrium ends.
- A mechanism must reproduce the balanced reaction after intermediates and the catalyst cancel.
- Sample from inlet to outlet before calling a catalyst bed uniformly damaged.

#### Equations first needed today

No new numerical equation is introduced. The mission retrieves the rate-law idea and tests it with a mechanism, a spatial profile, and an independent surface assay.

**Crew on this mission - mission log:** Dr. Tomás Herrera - reactor and safety engineer; Ingrid Sundqvist - production and catalyst lead; Rosalind Achebe - analytical and electrochemistry lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

Catalyst Bay provides the physical bed and log; Assay Lab tests a
withdrawn sample. The player distinguishes catalyst effects from
equilibrium, builds a mechanism, probes the temperature/conversion
pattern, and diagnoses the most immediate bed problem. The diagnosis
explains lost activity yet leaves a deeper thermal question for the
holdout test.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Catalyst Bay \| automatic**

**Trigger:** mission_9_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** An inlet sample lies beside a much cleaner outlet sample.

**Panel/HUD text:** MISSION 9 - THE CATALYST BED

**Dialogue bubbles -** Herrera: "A green average does not clear a hot inlet. Determine what a catalyst can change, then find where this bed stops behaving normally."

**Unlocks:** Stop 33 at the mechanism console; Stop 34 unlocks immediately after Stop 33.
**Beat 2 - After Stops 33 and 34 \| mechanism console \| automatic response**

**Trigger:** accepted_stop_33.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `charge-bench`, the dated accepted-result slip for Stop 33 reads: "First choice.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 35: SAMPLE THE BED FROM INLET TO OUTLET

**Dialogue bubbles -** Herrera: "Nice work. A fresh catalyst can restore a path, not change the final balance or the heat of reaction. Now probe the real bed."

**Unlocks:** Stop 35 at the bed sampling rail.
**Beat 3 - After Stop 35 \| bed sampling rail \| automatic spatial discovery**

**Trigger:** accepted_stop_34.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `bed-log`, the dated accepted-result slip for Stop 34 reads: "Order as listed; Ni surface sites are catalyst, surface species are intermediates, slow conversion is rate-determining.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** FAILURE IS NOT UNIFORM / INLET-FIRST DAMAGE.

**Dialogue bubbles -** Sundqvist: "Good thinking. That looks like catalyst poison. Send a sample to Achebe."

**Waypoint:** Assay Lab

**Unlocks:** The Assay Lab waypoint and Stop 36.
**Beat 4 - After Stop 36 \| Assay Lab \| automatic diagnosis**

**Trigger:** accepted_stop_35.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `bed-ports`, the dated accepted-result slip for Stop 35 reads: "Inlet end: high temperature and halide exposure with depressed local activity; pattern is nonuniform.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Achebe: "Exactly right. The catalyst is damaged. The assay does not explain why the inlet reached 612 kelvin before the override."

**Unlocks:** The Mission 9 outcome beat.
**Beat 5 - At mission end \| Assay Lab \| automatic outcome and hook**

**Trigger:** accepted_stop_36.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `bed`, Mei-Ling Cho places the damaged inlet cartridge in the HALIDE DAMAGE tray. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT TEST - HOLDOUT THERMAL RUN.

**Dialogue bubbles -** Mei-Ling Cho: "Replace what failed. Do not ask the new bed to survive an unsafe setting. But Herrera's old 612 K record is hotter than this damage explains; the hidden run must decide if his override saved the plant."

**Waypoint:** Sabatier Reactor

**Unlocks:** Mission 10 briefing and the Sabatier Reactor waypoint.
### Physical aftermath — mars-m09

**Home:** `bed`. **Before:** The dated mission-9 evidence holder at this fixture has no accepted record. An inlet sample lies beside a much cleaner outlet sample.
**After — exact action:** Mei-Ling Cho places the damaged inlet cartridge in the HALIDE DAMAGE tray.
**Trigger:** accepted_stop_36. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `analyser`, the sealed old run waits beneath Ingrid's blame model.
**Segue - exact player copy:** But Herrera's old 612 K record is hotter than this damage explains; the hidden run must decide if his override saved the plant.

## Location plan

**Two locations:** Catalyst Bay (KINET) for Stops 33-35, then Assay Lab
(ASSAY) for Stop 36. The nonuniform probe result causes a sample to be
withdrawn and sent for assay.

## Characters and dramatic beat

Sundqvist and Herrera work side by side despite mutual suspicion. Achebe
refuses to call the catalyst poisoned until the sample itself is tested.
Herrera's concern shifts from defending himself to protecting the team
from a premature restart.

## Key concepts, explained here

A catalyst supplies a lower-activation-energy pathway, increasing rate
in both directions. It does not change reaction enthalpy, equilibrium
constant, or equilibrium composition. A mechanism is a sequence of
elementary steps; an intermediate is made then consumed, and a catalyst
is consumed then regenerated. The slow step often controls the observed
rate. Poisoning blocks active sites and can create a spatial pattern
where contaminant arrives first.

## Stop 33 - What a catalyst can and cannot change

**Format/placement:** CHOICE, asked at Ingrid Sundqvist beside `charge-bench`.

**Metadata:** Concept: 10 - catalysis; Keystone: catalysts and mechanisms; Area: Catalyst Bay; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Ingrid Sundqvist, at the charge bench in Catalyst Bay.

**Stop reason - exact player copy:** A catalyst repair is proposed, and its limits need separating from heat and equilibrium problems.

**Question card story setup - exact player copy:** Before replacing the bed, determine exactly what a fresh catalyst can change and what it cannot fix about equilibrium or heat.

**Question card story-science connection - exact player copy:** The catalyst's role determines whether the repair changes reaction speed without promising a different equilibrium yield.

**Question card prompt - exact player copy:** A fresh catalyst replaces
the old one at the same temperature, pressure, and feed. What changes?

**Choices:**

1. The reaction reaches the same equilibrium composition faster because activation energy is lower **(correct)**

2. K increases and more methane exists at equilibrium.

3. Delta H becomes more negative.

4. Only the forward reaction speeds up.

**Correct result:** First choice.

**Answer text:** A fresh catalyst lowers activation energy and reaches the same equilibrium faster without changing K or reaction enthalpy.

**Why:** Catalysts speed both forward and reverse pathways and leave
thermodynamic state functions and K unchanged.

**Wrong-path feedback:** (2) A catalyst changes how quickly equilibrium is reached but does not change K or the final equilibrium composition. (3) Reaction enthalpy depends on the initial and final states, so replacing the catalyst does not make Delta H more negative. (4) A catalyst lowers the barrier for both forward and reverse reactions, not only the forward reaction.

**State/output:** Qualify catalyst concept before mechanism rail.

## Stop 34 - Build the surface mechanism

**Format/placement:** SEQUENCE, at `bed-log`.

**Metadata:** Concept: 10 - mechanisms/intermediates/RDS; Keystone: catalysts and mechanisms; Area: Catalyst Bay; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the bed-log mechanism rail, in Catalyst Bay.

**Stop reason - exact player copy:** The catalyst's role is defined, but the surface reaction needs an explicit mechanism.

**Question card story setup - exact player copy:** The ordered steps identify the catalyst, intermediate, and slow controlling step.

**Question card story-science connection - exact player copy:** The ordered surface steps identify regenerated sites, intermediates, and the step controlling the reaction rate.

**Question card prompt - exact player copy:** Order the simplified
mechanism and identify the catalyst and intermediate.

**Correct result:** Order as listed; Ni surface sites are catalyst,
surface species are intermediates, slow conversion is rate-determining.

**Answer text:** Adsorb reactants, form surface intermediates in the slow step, desorb products, and regenerate free nickel sites.

**Why:** The catalyst participates but reappears; the intermediate
appears in one step and is consumed later, so neither appears in the net
equation. Blocking free sites reduces the number of productive events.

**Wrong-path feedback:** Desorption cannot precede product formation;
calling methane an intermediate confuses final product with transient
species.

**State/output:** Unlock axial probe.

## Stop 35 - Sample the bed from inlet to outlet

**Format/placement:** PROBE, operated at `bed-ports`.

**Metadata:** Concept: 10 - spatial diagnosis; Keystone: energy, kinetics, and catalysts; Area: Catalyst Bay; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the bed sampling ports, in Catalyst Bay.

**Stop reason - exact player copy:** The mechanism is established and samples along the bed can locate the activity loss.

**Question card story setup - exact player copy:** The sampling panel follows the catalyst bed from inlet to outlet. Each station displays temperature, contaminant exposure, and local catalytic activity for comparison.

**Question card story-science connection - exact player copy:** The temperature and contaminant profile distinguishes localized inlet damage from a uniform catalyst decline.

**Question card prompt - exact player copy:** Probe every station and
name where the pattern first breaks.

**Complete format-specific interaction block:**

```yaml
probe:
  chainLabel: "Catalyst-bed station"
  stations:
    - id: inlet
      label: "Inlet / 0 m"
      reading: "612 K; cumulative conversion 18%; halide high; local activity low"
      expected: "Clean inlet should remain below 590 K with low halide and normal local activity"
      load: "First break: temperature exceeds the clean limit while halide is high and activity is depressed"
    - id: inlet_shoulder
      label: "Inlet shoulder / 1 m"
      reading: "600 K; cumulative conversion 32%; halide medium-high; local activity low-medium"
      expected: "A clean bed should remain below 590 K here, with low halide and conversion rising smoothly from the inlet"
      load: "Confirms that the inlet-side disturbance persists downstream of the first break"
    - id: middle
      label: "Middle"
      reading: "585 K; cumulative conversion 48%; halide medium; local activity medium"
      expected: "Temperature below 590 K with conversion rising smoothly and little halide contamination"
      load: "Partly degraded downstream of the inlet-first failure"
    - id: outlet
      label: "Outlet"
      reading: "563 K; cumulative conversion 55%; halide low; local activity near normal"
      expected: "Clean bed should finish near 70% cumulative conversion while remaining below 590 K"
      load: "Temperature is acceptable, but total conversion remains below the clean-bed reference"
  target: inlet
  minReadings: 4
  commit: "Name the first station where the bed departs from the clean pattern"
```

**Correct result:** Inlet end: high temperature and halide exposure with
depressed local activity; pattern is nonuniform.

**Answer text:** The first break is at the inlet, where heat and halide are high but activity is depressed.

**Why:** Feed contaminant reaches the inlet first, so poisoning can
start there. The inlet hot spot also matters: exothermic reaction and
poorer heat removal can make the front hotter than the average. An
average outlet reading hides it.

**Wrong-path feedback:** Naming the outlet because total conversion is
low ignores where the abnormal profile begins.

**State/output:** Set evidence_flags.inlet_hotspot = true; withdraw
inlet sample.

## Stop 36 - Diagnose the immediate bed failure

**Format/placement:** DIAGNOSIS, at `spec-bench`.

**Metadata:** Concept: 10 - catalyst poisoning vs operating limits; Keystone: catalysts and mechanisms; Area: Catalyst Bay; Learning role: APPLY; Difficulty: L4; Story role: apparent resolution.

**Call - exact player copy:** Go to the specification bench, in Assay Lab.

**Stop reason - exact player copy:** The bed profile is measured and the crew must decide what failure requires repair before restart.

**Question card story setup - exact player copy:** The verdict decides whether replacement is necessary before any restart test.

**Question card story-science connection - exact player copy:** The diagnosis connects the activity loss to the contaminant pattern and determines whether catalyst replacement is necessary.

**Question card prompt - exact player copy:** Which diagnosis fits the spatial pattern and the independent surface assay?

**Complete format-specific interaction block:**

```yaml
headline: "WHERE DOES THE CATALYST BED FAIL FIRST?"
readings:
  - {zone: surface_assay, label: "Halide on nickel", value: "high at inlet", state: alarm}
  - {zone: surface_area, label: "Fresh-reference surface area", value: "normal", state: quiet}
  - {zone: gas_feed, label: "Hydrogen composition", value: "restored for test", state: quiet}
  - {zone: pressure, label: "Loop pressure", value: "normal", state: quiet}
  - {zone: activity, label: "Catalyst activity", value: "inlet depressed", state: alarm}
choices:
  - {id: halide, label: "Halide poisoning concentrated at inlet", mechanism: "Matches surface assay and inlet-first loss."}
  - {id: sintering, label: "Uniform thermal sintering", mechanism: "Would depress activity throughout bed."}
  - {id: low_h2, label: "Insufficient hydrogen during test", mechanism: "Contradicted by controlled feed."}
  - {id: low_pressure, label: "Equilibrium pressure too low", mechanism: "Contradicted by normal controlled pressure."}
answer: halide
```

**Readings:** inlet sample has halide on Ni surface; fresh-sample
surface area normal; loop pressure normal; H2 composition restored for
test; inlet activity depressed; downstream activity less depressed;
strong temperature gradient.

**Choices:** Halide poisoning concentrated at the inlet **(correct
immediate diagnosis)** / Uniform thermal sintering / Insufficient H2
during this controlled test / Equilibrium pressure too low.

**Correct result:** Diagnosis `halide`: halide poisoning concentrated at the inlet.

**Answer text:** Halide poisoning concentrated at the inlet is the immediate catalyst failure.

**Why:** The surface assay and inlet-first loss fit poisoning. Uniform
sintering would reduce activity throughout; current H2 and pressure are
controlled normal. The hot gradient is real but is not explained away - it
becomes the safety question for Mission 10.

**Wrong-path feedback:** (2) Uniform sintering would depress activity throughout the bed, not mainly at the inlet. (3) Low H2 is ruled out because the test feed restores hydrogen composition. (4) Low pressure is ruled out because loop pressure is normal during the controlled test.

**State/output:** Mark catalyst_inlet_poisoned = true; apparent story
verdict: old settings plus poisoned inlet caused collapse.

## Mission outcome

Mission decision: Halide damaged the catalyst most at the inlet. The surface test finds blocked nickel sites. Part of the bed must be replaced. Yet that damage does not explain the old 612 K hot spot. One hidden heat record will test whether the old setting was safe.

**Segue - exact player copy:** But Herrera's old 612 K record is hotter than this damage explains; the hidden run must decide if his override saved the plant.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mei-Ling Cho places the damaged inlet cartridge in the HALIDE DAMAGE tray. But Herrera's old 612 K record is hotter than this damage explains; the hidden run must decide if his override saved the plant.

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 08:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** Catalyst inlet damage cuts methane output; sampling and
assay consume power while the damaged bed lowers integrity.

**Automatic bar change:** Methane -10 \| Oxygen 0 \| Power -4 \|
Integrity -8

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +4; Integrity +4. Result: METHANE 88%
\| OXYGEN 86% \| POWER 100% \| INTEGRITY 86%. Recovery Bank: 13 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Activation energy:** the minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- **Reaction mechanism:** a sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- **Rate-determining step:** the slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- **Active site:** a location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- **Spatial profile:** shows how a reading changes from one location to another. It can reveal a local hot spot or inlet-first failure hidden by an average.

### Review question 1


**Prompt - exact player copy:** Which statement best explains activation energy?

**Options - exact player copy:**

- A. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- B. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- D. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for activation energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes reaction mechanism. It does not answer the question about activation energy.
- B: Correct. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C: This describes rate-determining step. It does not answer the question about activation energy.
- D: This describes active site. It does not answer the question about activation energy.

### Review question 2


**Prompt - exact player copy:** Which statement best explains reaction mechanism?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- C. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for reaction mechanism. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes activation energy. It does not answer the question about reaction mechanism.
- B: This describes rate-determining step. It does not answer the question about reaction mechanism.
- C: Correct. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D: This describes active site. It does not answer the question about reaction mechanism.

### Review question 3


**Prompt - exact player copy:** Which statement best explains rate-determining step?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- C. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for rate-determining step. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes activation energy. It does not answer the question about rate-determining step.
- B: This describes reaction mechanism. It does not answer the question about rate-determining step.
- C: This describes active site. It does not answer the question about rate-determining step.
- D: Correct. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

### Review question 4


**Prompt - exact player copy:** Which statement best explains active site?

**Options - exact player copy:**

- A. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- B. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for active site. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- B: This describes activation energy. It does not answer the question about active site.
- C: This describes reaction mechanism. It does not answer the question about active site.
- D: This describes rate-determining step. It does not answer the question about active site.

### Review question 5


**Prompt - exact player copy:** The activity measurements use the same procedure at each position. Where is activity lowest?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Relative catalyst activity",
  "caption": "Activity measured at three bed positions under the same test conditions",
  "bars": [
    {
      "name": "Inlet",
      "value": 0.2
    },
    {
      "name": "Middle",
      "value": 0.6
    },
    {
      "name": "Outlet",
      "value": 0.9
    }
  ]
}
```

**Options - exact player copy:**

- A. At the outlet.
- B. At the inlet.
- C. At all positions equally.
- D. The average identifies no spatial difference.

**Correct answer:** B

**Hint - exact player copy:** Compare the heights for the individual positions.

**Option feedback - exact player copy:**

- A: The outlet has the highest plotted activity.
- B: Correct. At the inlet.
- C: The three values differ.
- D: An average would hide the differences shown by position.

### Review question 6


**Prompt - exact player copy:** Which statement best explains catalyst?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- C. Speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for catalyst. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes activation energy. It does not answer the question about catalyst.
- B: This describes reaction mechanism. It does not answer the question about catalyst.
- C: Correct. Speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.
- D: This describes rate-determining step. It does not answer the question about catalyst.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Catalysts lower activation energy and speed approach to equilibrium.

- Catalysts do not change K, Delta H, or the equilibrium composition.

- Intermediates are formed then consumed; catalysts are regenerated.

- Spatial patterns distinguish inlet-first poisoning from uniform
  deactivation.

- **Mission takeaway:** A correct immediate diagnosis can still leave a deeper causal or safety problem.

# Mission 10 - The Saboteur

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 10 - 6 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE SABOTEUR

**Go now:** Go to the Sabatier Reactor and meet Commander Laila Abiola, the mission commander, at the sealed model display.

**Card body:** 6 work shifts remain before launch. The sealed old run waits beneath Ingrid's blame model. Today you decide whether the old setting was safe.

**Objective:** Test the accusation against unseen evidence and
reconstruct Herrera's reason for the override.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 10: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m10_we01
    title: A measurement minus a prediction
    problem: A thermometer model predicts 20 °C; an independent thermometer reads 22 °C. Find the residual.
    rule: Residual = observed value - predicted value.
    steps:
    - residual = 22 °C - 20 °C. Keep observed first.
    - residual = +2 °C. The positive sign means the observation is above the prediction.
    answer: The model underpredicts this reading by 2 °C.
    common_mistake: Reversing the subtraction reverses the meaning of the sign.
  - id: mars_m10_we02
    title: Correct a known offset
    problem: A balance reads 52 g for a certified 50 g mass and 32 g for a second object. Assume a constant additive offset. Find the corrected second mass.
    rule: Offset = reading - reference; corrected value = reading - offset.
    steps:
    - offset = 52 - 50 = +2 g. The balance reads high.
    - corrected mass = 32 - 2 = 30 g. Subtract the same offset.
    answer: The corrected mass is 30 g.
    common_mistake: An additive offset is not a percentage error.
  - id: mars_m10_we03
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
  - id: mars_m10_we04
    title: Test a frozen prediction
    problem: Before seeing a new measurement, a model predicts 12 units with an allowed error of 1 unit. The new measurement is 15 units. Does it pass this test?
    rule: Absolute prediction error = |observed - predicted|.
    steps:
    - absolute error = |15-12| = 3 units. The prediction remains fixed.
    - comparison = 3 > 1. The error exceeds the prewritten tolerance.
    answer: The model fails this held-out test.
    common_mistake: Refitting to 15 before scoring would no longer test the original prediction.
  - id: mars_m10_we05
    title: Separate a fitted product
    problem: A rectangle has area 24 cm². Can area alone determine its length and width?
    rule: Area = length × width. One equation may leave more than one unknown pair.
    steps:
    - 24 = 6×4 and 24 = 8×3. Both pairs have the correct area.
    - If width is independently measured as 4 cm, length = 24/4 = 6 cm.
    answer: Area alone is insufficient; the additional width measurement selects 6 cm by 4 cm.
    common_mistake: One matching output does not identify both input parameters.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Model: a simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

Residual: the measured value minus the model's predicted value. A repeated pattern in residuals can reveal a missing cause even when average error is small.

Sensor bias: a measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.

Safety margin: the distance between the operating condition and a dangerous boundary. A plan fails if allowed uncertainty can erase that distance.

#### Primer concepts

- Freeze a model before revealing holdout data.
- Inspect where residuals occur, not only their overall size.
- A suspicious action can cause production loss and still prevent a larger danger.

#### Equations first needed today

No new required equation is introduced. The player reads residuals and uncertainty ranges supplied by the instruments, then judges prediction, pattern, and safety margin.

**Crew on this mission - mission log:** Commander Laila Abiola - mission commander; Dr. Tomás Herrera - reactor and safety engineer; Rosalind Achebe - analytical and electrochemistry lead; Ingrid Sundqvist - production and catalyst lead.



## Main story happening - designer summary

Reactor Hall hosts the model tests; Plant Control hosts the human
reconstruction. HOLDOUT prevents the narrative from changing answers
arbitrarily: the accusation fits training data and fails unseen data.
RESIDUAL reveals a structured miss at the safety boundary; STRESS shows
that even modest sensor error makes the old setting unsafe. CASEBOOK
reconstructs Herrera's knowledge and motive.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Reactor Hall \| automatic**

**Trigger:** mission_10_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The sealed old run waits beneath Ingrid's blame model.

**Panel/HUD text:** MISSION 10 - THE SABOTEUR

**Dialogue bubbles -** Abiola: "The accusation fits the records everyone saw. It must also predict the record nobody used to build it."

**Unlocks:** Stop 37 at the holdout-model display; Stop 38 unlocks immediately after Stop 37.
**Beat 2 - After Stops 37 and 38 \| model display \| automatic reversal**

**Trigger:** accepted_stop_37.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `analyser`, the dated accepted-result slip for Stop 37 reads: "Freeze and choose model B after holdout; model A fails unseen safety behavior.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MODEL MISSES DANGER AT THE SAFETY BOUNDARY.

**Dialogue bubbles -** Achebe: "Nice work. Its average error looked small because safe runs outnumbered dangerous ones. The failure is patterned exactly where it matters."

**Unlocks:** Stop 39 at the uncertainty panel.
**Beat 3 - After Stop 39 \| uncertainty control \| automatic safety decision**

**Trigger:** accepted_stop_38.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `residual-field`, the dated accepted-result slip for Stop 38 reads: "Model B.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 40: WHAT DID HERRERA KNOW, AND WHEN?

**Dialogue bubbles -** Abiola: "Good thinking. The old point is not safe across the sensor's allowed error. It will not be restored."

**Waypoint:** Plant Control

**Unlocks:** The Plant Control waypoint and Stop 40.
**Beat 4 - After Stop 40 \| Plant Control chronology wall \| automatic Twist 2**

**Trigger:** accepted_stop_39.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `reactor-console`, the dated accepted-result slip for Stop 39 reads: "No. If the sensor reads 2% low, actual peak is about 624 K, already above limit; at -5% actual is about 644 K. The lower point remains below limit across the range.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** OVERRIDE WAS A SAFETY RESPONSE.

**Dialogue bubbles -** Herrera: "Exactly right. I cut production because the inlet was running away." Abiola: "You prevented a reactor failure. You also withheld an incomplete warning. Both facts stand."

**Unlocks:** The Mission 10 outcome beat.
**Beat 5 - At mission end \| Plant Control \| automatic outcome and hook**

**Trigger:** accepted_stop_40.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `analyser`, Commander Laila Abiola pins the OVERRIDE PREVENTED RUNAWAY finding beside the revealed run. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT ROUTE - REACTOR -\> COLD END -\> PLANT CONTROL.

**Dialogue bubbles -** Commander Laila Abiola: "You were right to lower it. You were wrong to leave us guessing. Therefore Ingrid and Herrera must build a safer yield plan together; the launch clock has not stopped for their argument."

**Waypoint:** Sabatier Reactor

**Unlocks:** Mission 11 briefing and the Sabatier Reactor waypoint.
### Physical aftermath — mars-m10

**Home:** `analyser`. **Before:** The dated mission-10 evidence holder at this fixture has no accepted record. The sealed old run waits beneath Ingrid's blame model.
**After — exact action:** Commander Laila Abiola pins the OVERRIDE PREVENTED RUNAWAY finding beside the revealed run.
**Trigger:** accepted_stop_40. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `operating-point-board`, two trials rise at the same early speed and end at different yields.
**Segue - exact player copy:** Therefore Ingrid and Herrera must build a safer yield plan together; the launch clock has not stopped for their argument.

## Location plan

**Two locations:** Reactor Hall (EQUIL) for Stops 37-39, then Plant
Control (GIBBS) for Stop 40. Model failure creates the need to compare
records and testimony at command.

## Characters and dramatic beat

Herrera remains excluded from controls and cannot manipulate the test.
Sundqvist watches the unseen record fail her preferred model and is the
first to say, "Do not restore it." Abiola restores Herrera's access only
after the player reconstructs his decision.

## Key concepts, explained here

A model can overfit observations used to build it. A holdout dataset
tests prediction on unseen evidence. Residuals are observed minus
predicted values; a small average error can hide a dangerous patterned
miss. Stress testing moves assumptions through reasonable ranges to see
whether a decision survives. Causal timing and mechanism turn an action
into an understood motive.

## Stop 37 - Freeze the accusation and reveal the holdout

**Format/placement:** HOLDOUT, operated at `analyser`.

**Metadata:** Concept: 11 - model validation; Keystone: evidence must be independent; Area: Plant Control; Learning role: RETRIEVE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the reactor analyser, in Reactor Hall.

**Stop reason - exact player copy:** The accusation rests on visible runs and must be committed before the missing interval is opened.

**Question card story setup - exact player copy:** The hidden interval contains the cooling failure that the visible runs omitted.

**Question card story-science connection - exact player copy:** Holdout performance tests whether the model can explain unseen safety behavior rather than only familiar production records.

**Question card prompt - exact player copy:** Freeze the fit, reveal the holdout intervals, and choose the model that predicts them.

**Complete format-specific interaction block:**

```yaml
holdout:
  fit_set:
    label: "Eight visible normal intervals"
    models:
      - {id: model_a, label: "Set-point-only accusation model", fit_error: 2.1}
      - {id: model_b, label: "Cooling-loss plus inlet-hot-spot model", fit_error: 2.8}
  freeze_required: true
  holdout_set:
    - {id: h1, radiator_capacity_percent: 100, outlet_K: 566, inlet_K: 584, purge_open: false}
    - {id: h2, radiator_capacity_percent: 72, outlet_K: 569, inlet_K: 618, purge_open: true}
    - {id: h3, radiator_capacity_percent: 70, outlet_K: 568, inlet_K: 621, purge_open: true}
  predictions: {model_a: "safe/high output for h2-h3", model_b: "hot-spot intervention for h2-h3"}
  correct: model_b
  anti_cheat: "Refitting after reveal is disabled."
```

**Fit data:** eight normal intervals where outlet-average temperature
predicts methane rate well. Candidate model A says lower set point alone
explains lost production; model B includes inlet hot-spot risk when heat
rejection falls.

**Holdout:** three intervals hidden during fitting. At interval 2,
radiator capacity falls; inlet reaches 618 K while outlet average stays
569 K; purge interlock opens; model A predicts safe operation and high
output, model B predicts intervention.

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 37 - Freeze the accusation and reveal the holdout"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Freeze the fit, reveal the holdout intervals, and choose the model that predicts them."
  payload: "```yaml holdout: fit_set: label: \"Eight visible normal intervals\" models: - {id: model_a, label: \"Set-point-only accusation model\", fit_error: 2.1} - {id: model_b, label: \"Cooling-loss plus inlet-hot-spot model\", fit_error: 2.8} freeze_required: true holdout_set: - {id: h1, radiator_capacity_percent: 100, outlet_K: 566, inlet_K: 584, purge_open: false} - {id: h2, radiator_capacity_percent: 72, outlet_K: 569, inlet_K: 618, purge_open: true} - {id: h3, radiator_capacity_percent: 70, outlet_K: 568, inlet_K: 621, purge_open: true} predictions: {model_a: \"safe/high output for h2-h3\", model_b: \"hot-spot intervention for h2-h3\"} correct: model_b anti_cheat: \"Refitting after reveal is disabled.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed outlet-temperature prediction error", min: 0, max: 12, step: 3, unit: "K"}
  fit: [{at: 0, value: 0.57}, {at: 3, value: 0.98}, {at: 6, value: 0.84}, {at: 9, value: 0.87}, {at: 12, value: 0.83}]
  test: [{at: 0, value: 0.34}, {at: 3, value: 0.45}, {at: 6, value: 0.76}, {at: 9, value: 0.86}, {at: 12, value: 0.84}]
  passScore: 0.80
  overfitAt: 3
  correctAt: 9
  models:
    - {id: A, label: "Set-point-only accusation model", fitError: 2.1}
    - {id: B, label: "Cooling-loss plus inlet-hot-spot model", fitError: 2.8}
  heldOutOutlets: [566, 569, 568]
  correctChoice: B
  correctConclusion: "Model B survives the unseen degraded-cooling intervals; model A does not."
```

**Correct result:** Freeze and choose model B after holdout; model A
fails unseen safety behavior.

**Answer text:** Model B survives the frozen holdout; Model A misses the unseen hot-spot intervention.

**Why:** A beautiful fit to visible data is not enough. The withheld
interval contains the regime that matters: degraded cooling and a
spatial gradient. Herrera's override is predicted by the safety model.

**Wrong-path feedback:** Refitting after seeing the holdout must be
blocked; the point is honest prediction.

**State/output:** Set evidence_flags.accusation_model_failed = true.

## Stop 38 - Refuse the lowest average error

**Format/placement:** RESIDUAL, at `residual-field`.

**Metadata:** Concept: 11 - residual structure; Keystone: evidence must be independent; Area: Plant Control; Learning role: PRACTICE; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the residual field, in Reactor Hall.

**Stop reason - exact player copy:** The holdout exposes a model difference that average error alone could conceal.

**Question card story setup - exact player copy:** Inspect where each model misses because errors nearest the heat limit matter more than good average agreement.

**Question card story-science connection - exact player copy:** The full residual pattern identifies which model captures the safety-relevant behavior instead of merely minimizing a summary score.

**Question card prompt - exact player copy:** Choose the model whose
residual field is defensible for safety.

**Complete format-specific interaction block:**

```yaml
residual:
  models:
    - {id: model_a, label: "Set-point-only", rms_K: 2.1, residuals_normal_K: [-2,1,0,2,-1], residuals_low_radiator_K: [12,15,14]}
    - {id: model_b, label: "Cooling plus spatial hot spot", rms_K: 2.8, residuals_normal_K: [-4,2,-1,3,0], residuals_low_radiator_K: [3,-2,4]}
  consequence_region: {label: "Low radiator capacity", safety_limit_K: 620}
  correct: model_b
  rule: "Reject structured underprediction in the consequence region even when global RMS is smaller."
```

**Correct result:** Model B.

**Answer text:** Choose Model B because its residuals are unpatterned near the safety boundary.

**Why:** Model A's lower overall RMS is purchased by systematic
underprediction exactly where a safety limit matters. Residual structure
means missing physics, not random noise. Model B is slightly less
precise overall and far more valid in the dangerous regime.

**Wrong-path feedback:** Choosing Model A only because its global RMS is smaller ignores its repeated 12-15 K miss during low-radiator intervals. A safety model fails when its errors are structured in the consequence region.

**State/output:** Highlight spatial heat-removal term missing from model
A.

## Stop 39 - Stress the hidden temperature error

**Format/placement:** STRESS, asked at Ingrid Sundqvist beside `reactor-console`.

**Metadata:** Concept: 11 - uncertainty and safety margin; Keystone: energy and uncertainty; Area: Reactor Hall; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Ingrid Sundqvist, at the reactor console in Reactor Hall.

**Stop reason - exact player copy:** The model comparison favors a lower setting, but the old restoration plan still needs a sensor-error test.

**Question card story setup - exact player copy:** Move the sensor bias across its allowed range to decide whether the old setting remains safe when the temperature reading is slightly wrong.

**Question card story-science connection - exact player copy:** The possible actual temperature determines whether the restoration plan can cross the thermal limit within supported error bounds.

**Question card prompt - exact player copy:** Does the decision to
restore the old point survive allowed sensor error?

**Complete format-specific interaction block:**

```yaml
stress:
  assumption: {id: thermocouple_bias, label: "Inlet thermocouple bias", min: -5, max: 5, step: 1, unit: percent}
  candidates:
    - {id: old_point, label: "Restore old point", observed_peak_K: 612, actual_at_minus2_K: 624, actual_at_minus5_K: 644}
    - {id: lower_point, label: "Keep lower point", observed_peak_K: 575, actual_at_minus5_K: 605}
  consequence_limit: {label: "Maximum inlet temperature", value: 620, unit: K}
  correct: lower_point
  boundary_logic: "A candidate fails if any allowed bias places actual peak above 620 K."
```

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 39 - Stress the hidden temperature error"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Does the decision to restore the old point survive allowed sensor error?"
  payload: "```yaml stress: assumption: {id: thermocouple_bias, label: \"Inlet thermocouple bias\", min: -5, max: 5, step: 1, unit: percent} candidates: - {id: old_point, label: \"Restore old point\", observed_peak_K: 612, actual_at_minus2_K: 624, actual_at_minus5_K: 644} - {id: lower_point, label: \"Keep lower point\", observed_peak_K: 575, actual_at_minus5_K: 605} consequence_limit: {label: \"Maximum inlet temperature\", value: 620, unit: K} correct: lower_point boundary_logic: \"A candidate fails if any allowed bias places actual peak above 620 K.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "hidden temperature error", min: -10, max: 10, nominal: 0.0, step: 2, unit: "K"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.0, max: 0.0}
      failsAt: 10
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.0, max: 10}
      failsAt: -10
    - id: robust_plan
      label: "No. If the sensor reads 2% low, actual peak is about"
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: -10, max: 10}
  robust: robust_plan
  question: "Does the decision to"
```

**Correct result:** No. If the sensor reads 2% low, actual peak is about
624 K, already above limit; at -5% actual is about 644 K. The lower
point remains below limit across the range.

**Answer text:** Do not restore the old point; allowed negative sensor bias pushes the true peak over the limit.

**Why:** A setting is not safe because its central estimate lies eight
kelvin below a limit. The uncertainty range crosses the consequence
boundary. Robust operation needs margin.

**Wrong-path feedback:** Keeping the old point because 612 K is below 620 K uses only the central reading. The allowed negative sensor bias pushes the true temperature above the limit, so the plan fails the full uncertainty range.

**State/output:** Sundqvist withdraws restoration request;
reactor_safety_margin + 20 for lower point.

## Stop 40 - What did Herrera know, and when?

**Format/placement:** CASEBOOK, asked at Commander Laila Abiola beside `chronology-wall`.

**Metadata:** Concept: 11 - evidence synthesis; Keystone: energy and causal evidence; Area: Plant Control; Learning role: TRANSFER; Difficulty: L4; Story role: payoff.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the chronology wall in Plant Control.

**Stop reason - exact player copy:** The thermal evidence is complete and Herrera's override can now be placed in its actual sequence.

**Question card story setup - exact player copy:** Reconstruct the chain from radiator loss through override and production fall to determine whether Herrera created or interrupted the danger.

**Question card story-science connection - exact player copy:** The timeline distinguishes an intervention that caused the danger from one that interrupted it.

**Question card prompt - exact player copy:** Match each event to its causal role, then decide what the override actually did.

**Complete format-specific interaction block:**

```yaml
scenarios:
  - {id: radiator_loss, label: "Radiator capacity fell", reading: "first change"}
  - {id: inlet_rise, label: "Inlet rose while outlet average stayed normal", reading: "hidden spatial warning"}
  - {id: override, label: "Set point lowered", reading: "signed action"}
  - {id: purge, label: "Purge interlock opened", reading: "protective system response"}
  - {id: production, label: "Methane production fell", reading: "later cost"}
choices:
  - {id: cause, label: "Shrinking heat removal"}
  - {id: hidden_hotspot, label: "Evidence of the hidden hot spot"}
  - {id: intervention, label: "Deliberate safety intervention"}
  - {id: protection, label: "Protective consequence"}
  - {id: cost, label: "Cost of the intervention"}
mapping: {radiator_loss: cause, inlet_rise: hidden_hotspot, override: intervention, purge: protection, production: cost}
```

**Scenarios:** Radiator capacity fell / inlet thermocouple rose while
average stayed normal / Herrera lowered set point / purge interlock
opened / production fell.

**Choices/mapping:** cause of shrinking heat removal / hidden hot spot
evidence / deliberate safety intervention / protective consequence /
cost of the intervention; mapping \[0,1,2,3,4\].

**Correct result:** Full mapping.

**Answer text:** Cooling weakened first, a hidden inlet hot spot formed, and the override interrupted the danger at the cost of production.

**Why:** Herrera did the suspicious action. The evidence changes its
meaning: the override followed a degrading safety condition and
prevented the predicted consequence. Production collapse is real and is
evidence that the response worked.

**Wrong-path feedback:** If the override is treated as the first cause, the timeline contradicts the radiator-loss and inlet-rise records. If production loss is treated as the danger itself, it reverses cause and cost: production fell after the protective intervention.

**State/output:** twist_2_complete = true; restore Herrera's access;
herrera_trust + 3, crew_trust + 1.

### Character scene: mars-ingrid-turn

**Trigger:** After Stop 40 is accepted.
**Location and presence:** `chronology-wall` in Plant Control. Ingrid Sundqvist, production and catalyst lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Places the revealed thermal chronology beside her accusation about the override.
**Exact dialogue:**
- Ingrid Sundqvist, production and catalyst lead: “I saw the lost output and blamed you before I had the whole temperature record.”
- Dr. Tomás Herrera, reactor and safety engineer (radio): “I should have shared the whole record when I asked you to accept the lost output.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-ingrid-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

### Character scene: mars-herrera-turn

**Trigger:** After Stop 40 is accepted.
**Location and presence:** `chronology-wall` in Plant Control. Dr. Tomás Herrera, reactor and safety engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Leaves the full chronology available beside the override record.
**Exact dialogue:**
- Dr. Tomás Herrera, reactor and safety engineer: “The override had a reason; keeping the record from you made that reason harder to test.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-herrera-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: The override stopped a heat runaway. The hidden run breaks the blame model. Its errors miss the same danger each time, and sensor error can push the old point past the limit. The old setting will not return. The plant needs a slower, safer way to make fuel.

**Segue - exact player copy:** Therefore Ingrid and Herrera must build a safer yield plan together; the launch clock has not stopped for their argument.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Commander Laila Abiola pins the OVERRIDE PREVENTED RUNAWAY finding beside the revealed run. Therefore Ingrid and Herrera must build a safer yield plan together; the launch clock has not stopped for their argument.

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 09:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The holdout record validates the protective override
and establishes a defensible thermal boundary.

**Automatic bar change:** Methane -2 \| Oxygen 0 \| Power -2 \|
Integrity +10

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +4; Power +2; Integrity +4. Result: METHANE 90%
\| OXYGEN 86% \| POWER 100% \| INTEGRITY 100%. Recovery Bank: 15 RP.

**Lock result:** If Plant Integrity is now 100%, add VALIDATED and a
closed-padlock icon; this bar can no longer fall.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Holdout data:** measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- **Systematic pattern:** an error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- **Causal order:** states which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

### Review question 1


**Prompt - exact player copy:** The predictions were frozen before the plotted test observations were revealed. Why is this comparison useful?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Input",
  "yLabel": "Response (units)",
  "caption": "Predictions fixed before test observations were revealed",
  "series": [
    {
      "name": "Frozen prediction",
      "points": [
        [
          0,
          2
        ],
        [
          1,
          4
        ],
        [
          2,
          6
        ]
      ]
    },
    {
      "name": "Held-out observation",
      "points": [
        [
          0,
          2.1
        ],
        [
          1,
          3.9
        ],
        [
          2,
          6.2
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. It proves the model is exact for all possible inputs.
- B. It makes the test observations part of the training data retroactively.
- C. It removes all uncertainty from the observations.
- D. It tests prediction on data that did not set the model.

**Correct answer:** D

**Hint - exact player copy:** Ask whether the model could have been tuned to these test values.

**Option feedback - exact player copy:**

- A: Agreement at these inputs cannot establish universal correctness.
- B: The prediction was fixed without using these observations.
- C: Withholding data does not eliminate measurement uncertainty.
- D: Correct. It tests prediction on data that did not set the model.

### Review question 2


**Prompt - exact player copy:** Which statement best explains systematic pattern?

**Options - exact player copy:**

- A. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- B. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- C. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
- D. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for systematic pattern. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- B: This describes holdout data. It does not answer the question about systematic pattern.
- C: This describes causal order. It does not answer the question about systematic pattern.
- D: This describes model. It does not answer the question about systematic pattern.

### Review question 3


**Prompt - exact player copy:** Which statement best explains causal order?

**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
- C. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal order. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes holdout data. It does not answer the question about causal order.
- B: Correct. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
- C: This describes systematic pattern. It does not answer the question about causal order.
- D: This describes model. It does not answer the question about causal order.

### Review question 4


**Prompt - exact player copy:** Which statement best explains model?

**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- C. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for model. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes holdout data. It does not answer the question about model.
- B: This describes systematic pattern. It does not answer the question about model.
- C: Correct. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.
- D: This describes causal order. It does not answer the question about model.

### Review question 5


**Prompt - exact player copy:** A model has the residuals shown. Residual means observed value minus predicted value. Which conclusion best fits the pattern?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Input value",
  "yLabel": "Observed minus predicted (units)",
  "caption": "Residuals from a fitted model",
  "series": [
    {
      "name": "Residual",
      "points": [
        [
          0,
          0
        ],
        [
          1,
          2
        ],
        [
          2,
          4
        ],
        [
          3,
          6
        ],
        [
          4,
          8
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. The model increasingly overpredicts.
- B. The errors have no relation to the input.
- C. The model fits every observation exactly.
- D. The model increasingly underpredicts as the input grows.

**Correct answer:** D

**Hint - exact player copy:** Use the sign of observed minus predicted and check for a pattern.

**Option feedback - exact player copy:**

- A: Positive residuals mean observations exceed predictions, not the reverse.
- B: Residuals rise systematically with the input.
- C: An exact fit would have zero residual at every point.
- D: Correct. The model increasingly underpredicts as the input grows.

### Review question 6


**Prompt - exact player copy:** Which statement best explains sensor bias?

**Options - exact player copy:**

- A. A measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.
- B. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- C. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for sensor bias. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.
- B: This describes holdout data. It does not answer the question about sensor bias.
- C: This describes systematic pattern. It does not answer the question about sensor bias.
- D: This describes causal order. It does not answer the question about sensor bias.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Holdout data tests whether a model predicts evidence it did not fit.

- Residual patterns can reveal missing mechanisms even when average
  error is low.

- Stress testing asks whether uncertainty crosses a decision boundary.

- Safety requires margin, not merely a best estimate below the limit.

- **Mission takeaway:** A fair character reversal keeps the action true and changes its scientifically supported meaning.

# Mission 11 - Fast Is Not the Same as More

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 11 - 5 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** FAST IS NOT THE SAME AS MORE

**Go now:** Go to the Sabatier Reactor and meet Dr. Tomás Herrera, the reactor and safety engineer, at the equilibrium board.

**Card body:** 5 work shifts remain before launch. Two trials rise at the same early speed and end at different yields. Today you decide which safe setting makes more methane in the end.

**Objective:** Choose reactor conditions that satisfy production speed,
final methane yield, and thermal safety.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 11: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m11_we01
    title: Compute an equilibrium constant
    problem: For A⇌B, equilibrium concentrations are [A]=0.2 M and [B]=0.6 M. Find the concentration quotient used for K.
    rule: K=[B]/[A] for this 1:1 idealized reaction, using standard-state normalized concentrations.
    steps:
    - 'Set up the relationship: K=[B]/[A] for this 1:1 idealized reaction, using standard-state normalized concentrations.'
    - K=0.6/0.2=3.
    answer: The equilibrium constant is 3.
    common_mistake: Use equilibrium concentrations, not initial concentrations.
  - id: mars_m11_we02
    title: Predict net reaction direction
    problem: For A⇌B, K=4. A mixture has [A]=0.5 M and [B]=1 M. Compare Q with K.
    rule: Q=[B]/[A]; Q<K favors net forward reaction.
    steps:
    - 'Set up the relationship: Q=[B]/[A]; Q<K favors net forward reaction.'
    - Q=1/0.5=2<4.
    answer: The mixture undergoes net forward reaction toward B.
    common_mistake: A large product concentration alone does not determine the direction.
  - id: mars_m11_we03
    title: Solve a simple equilibrium
    problem: Initially [A]=1 M and [B]=0 for A⇌B in a fixed volume. At equilibrium K=1.
    rule: 'Let x M convert: [A]=1-x and [B]=x.'
    steps:
    - 'Set up the relationship: Let x M convert: [A]=1-x and [B]=x.'
    - x/(1-x)=1; x=1-x; x=0.5 M.
    answer: Both equilibrium concentrations are 0.5 M.
    common_mistake: Equal equilibrium concentrations follow from K=1 here, not from a universal rule.
  - id: mars_m11_we04
    title: Compress an equilibrium mixture
    problem: For N₂O₄(g)⇌2NO₂(g), the volume is reduced at constant temperature. Which net direction is favored initially?
    rule: Compression favors the side with fewer gas particles for this equilibrium.
    steps:
    - The left side has one gas molecule per reaction unit; the right has two.
    - Net reverse reaction reduces the increased pressure relative to no reaction.
    answer: The mixture shifts toward N₂O₄; K stays unchanged at fixed temperature.
    common_mistake: Compression changes composition, not K when temperature is fixed.
  - id: mars_m11_we05
    title: Explain a catalyst
    problem: A catalyst lowers activation barriers without changing reactant and product energies. What changes at a fixed temperature?
    rule: A catalyst offers a faster pathway but does not change the equilibrium constant.
    steps:
    - Forward and reverse reactions can proceed faster.
    - The equilibrium composition stays the same, though it is reached sooner.
    answer: The catalyst changes kinetics, not the equilibrium constant.
    common_mistake: A faster forward reaction alone does not imply a new equilibrium yield.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Equilibrium constant: compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

Reaction quotient: uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.

Initial-change-equilibrium (ICE) table: organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.

Equilibrium yield: the product amount or fraction present after forward and reverse rates become equal. It is different from how quickly that state is reached.

#### Primer concepts

- Kinetics determines speed; equilibrium determines final composition.
- For an exothermic reaction, raising temperature can speed the approach while reducing the equilibrium methane yield.
- Removing a product or raising pressure can favor methane production without returning to the dangerous temperature.

#### Equations first needed today

**Chemical formulas and abbreviation:** `CH4` is methane; `H2O` is water; `CO2` is carbon dioxide; `H2` is hydrogen; and `Kc` is the concentration equilibrium constant.

**Equation:** Kc = [CH4][H2O]^2 / ([CO2][H2]^4)  
**What it is for:** comparing equilibrium products with reactants for the Sabatier reaction  
**Symbols:** brackets are equilibrium molar concentrations; each exponent is the coefficient from the balanced equation.  
**Why this campaign needs it:** The safer reactor setting must still reach enough final methane, not merely produce methane quickly at the start.  

**Equation:** concentration at equilibrium = initial concentration + coefficient-linked change  
**What it is for:** completing an ICE table with one reaction extent  
**Symbols:** initial concentration is the starting value; change is negative for consumed reactants and positive for formed products; coefficients set relative sizes.  
**Why this campaign needs it:** The plant needs a numerical methane ceiling at the safe temperature before committing pressure and water-removal power.  

**Crew on this mission - mission log:** Dr. Tomás Herrera - reactor and safety engineer; Mei-Ling Cho - water and cryogenics engineer; Ingrid Sundqvist - production and catalyst lead; Yusuf Demir - power and life-support officer; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

This is the first three-location mission and the campaign's conceptual
hinge. Reactor Hall introduces K, Q, and ICE reasoning; Cold End
demonstrates product removal; Plant Control compares complete operating
plans. The player learns that kinetics determines how quickly the system
moves while equilibrium determines the composition it approaches.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Reactor Hall \| automatic**

**Trigger:** mission_11_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** Two trials rise at the same early speed and end at different yields.

**Panel/HUD text:** MISSION 11 - FAST IS NOT THE SAME AS MORE

**Dialogue bubbles -** Herrera: "Temperature changes how quickly we move. Equilibrium determines where the reaction can finish. We need a plan that satisfies both."

**Unlocks:** Stop 41 at the equilibrium board; Stop 42 unlocks immediately after Stop 41.
**Beat 2 - After Stops 41 and 42 \| equilibrium board \| automatic response**

**Trigger:** accepted_stop_41.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `equil-stub`, the dated accepted-result slip for Stop 41 reads: "First choice.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 43: PUSH THE BALANCE ON PURPOSE

**Dialogue bubbles -** Herrera: "Nice work. Raising temperature may speed this exothermic reaction while lowering its equilibrium methane yield. Look for a different lever."

**Waypoint:** Cold End

**Unlocks:** The Cold End waypoint and Stop 43.
**Beat 3 - After Stop 43 \| Cold End \| automatic experiment**

**Trigger:** accepted_stop_42.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `ice-board`, the dated accepted-result slip for Stop 42 reads: "Change -0.50 CO2, -2.00 H2, +0.50 CH4, +1.00 H2O; equilibrium 1.00, 1.00, 0.50, 1.00 M. Kc=(0.50)(1.00)^2/\[(1.00)(1.00)^4\] = 0.50.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** PRODUCT REMOVAL INCREASES CH4 YIELD WITHOUT RAISING TEMPERATURE.

**Dialogue bubbles -** Cho: "Good thinking. The separator can pull the reaction forward and return that water to the plant."

**Waypoint:** Plant Control

**Unlocks:** The Plant Control waypoint and Stop 44.
**Beat 4 - After Stop 44 \| Plant Control \| automatic integrated decision**

**Trigger:** accepted_stop_43.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `coldline-tap`, the dated accepted-result slip for Stop 43 reads: "Remove product water (preferred) or compress within limit; demonstration expects water removal and reversal.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** VALIDATED PLAN - LOWER TEMPERATURE / HIGHER PRESSURE / PRODUCT WATER REMOVAL.

**Dialogue bubbles -** Abiola: "Exactly right. One plan. One set of limits. Reactor, separator, and control room sign together."

**Unlocks:** The Mission 11 outcome beat.
**Beat 5 - At mission end \| Plant Control \| automatic outcome and hook**

**Trigger:** accepted_stop_44.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `operating-point-board`, Ingrid Sundqvist pins the LOWER TEMPERATURE / HIGHER PRESSURE / WATER REMOVAL plan to the board. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT ROUTE - ICE CUT -\> WATER PLANT -\> ELECTROLYSIS HALL.

**Dialogue bubbles -** Ingrid Sundqvist: "We were racing the first minute. We need the last kilogram. But Demir's water return is short; better yield means little if the next shift cannot make hydrogen."

**Waypoint:** Ice Cut

**Unlocks:** Mission 12 briefing and the Ice Cut waypoint.
### Physical aftermath — mars-m11

**Home:** `operating-point-board`. **Before:** The dated mission-11 evidence holder at this fixture has no accepted record. Two trials rise at the same early speed and end at different yields.
**After — exact action:** Ingrid Sundqvist pins the LOWER TEMPERATURE / HIGHER PRESSURE / WATER REMOVAL plan to the board.
**Trigger:** accepted_stop_44. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `stack-accounting-panel`, an 80 kmol gap sits in the water-return column.
**Segue - exact player copy:** But Demir's water return is short; better yield means little if the next shift cannot make hydrogen.

## Location plan

**Three locations:** Reactor Hall (EQUIL) for Stops 41-42; Cold End
(PHASE) for Stop 43; Plant Control (GIBBS) for Stop 44. The ICE result
suggests product removal, causing the Cold End visit; the perturbation
data creates two degenerate plans that require command comparison.

## Characters and dramatic beat

Herrera explains the ceiling; Sundqvist explains the clock; Cho turns
water removal into an operating lever. Their former argument becomes a
division of expertise. Abiola requires one plan, not three isolated
recommendations.

## Key concepts, explained here

For CO2(g) + 4H2(g) \<=\> CH4(g) + 2H2O(g), Kc = \[CH4\]\[H2O\]^2 /
(\[CO2\]\[H2\]^4); pure solids and liquids would be omitted. An ICE
table tracks initial amounts, stoichiometric changes, and equilibrium
amounts. Q has the same form as K using current conditions: Q\<K moves
forward, Q\>K moves backward. Pressure favors the side with fewer gas
moles; removing product pulls forward; for this exothermic reaction,
higher temperature lowers equilibrium methane yield even while it raises
rate.

## Stop 41 - Build the equilibrium expression

**Format/placement:** CHOICE, asked at Dr. Tomás Herrera beside `equil-stub`.

**Metadata:** Concept: 12 - equilibrium expressions; Keystone: equilibrium and reaction quotient; Area: Reactor Hall; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Talk to Dr. Tomás Herrera, at the equilibrium board in Reactor Hall.

**Stop reason - exact player copy:** A safer recovery plan is being developed and needs the reactor's equilibrium relationship.

**Question card story setup - exact player copy:** To replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases.

**Question card story-science connection - exact player copy:** The equilibrium expression defines how reactant and product concentrations constrain the achievable methane mixture.

**Question card prompt - exact player copy:** Which Kc expression
matches the gas-phase Sabatier equation?

**Choices:**

1. \[CH4\]\[H2O\]^2 / (\[CO2\]\[H2\]^4) **(correct)**

2. \[CH4\]\[H2O\] / (\[CO2\]\[H2\])

3. \[CO2\]\[H2\]^4 / (\[CH4\]\[H2O\]^2)

4. \[CH4\]^1\[H2O\]^2 - \[CO2\]^1\[H2\]^4

**Correct result:** First choice.

**Answer text:** Kc = [CH4][H2O]^2 / ([CO2][H2]^4).

**Why:** Coefficients become exponents; products are over reactants;
equilibrium expressions multiply activities rather than subtracting
concentrations.

**Wrong-path feedback:** (2) The balanced coefficients become exponents, so H2O must be squared and H2 raised to the fourth power. (3) Products belong in the numerator and reactants in the denominator for the reaction as written. (4) An equilibrium expression multiplies concentration terms; it does not subtract the reactant product from the product product.

**State/output:** Unlock ICE board.

## Stop 42 - Complete the ICE table

**Format/placement:** BALLPARK, at `ice-board`.

**Metadata:** Concept: 12 - ICE stoichiometry; Keystone: equilibrium and stoichiometry; Area: Reactor Hall; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the ICE board, in Reactor Hall.

**Stop reason - exact player copy:** The equilibrium relationship is selected and the safe-temperature mixture needs calculating.

**Question card story setup - exact player copy:** The equilibrium sample is ready. The crew checks the constant against the balanced reaction before predicting a shift.

**Question card prompt - exact player copy:** For CO₂+4H₂⇌CH₄+2H₂O, equilibrium concentrations are [CH₄]=0.5 M and [H₂O]=[CO₂]=[H₂]=1 M. Fill these four concentrations in Kc=[CH₄][H₂O]²/([CO₂][H₂]⁴).

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Complete the ICE table",
    "labels": [
      "0.5",
      "1",
      "1",
      "1",
      "4"
    ],
    "values": [
      0.5,
      1,
      1,
      1,
      4
    ],
    "slots": 4,
    "template": "{a} × {b} × {b} / ({c} × {d} × {d} × {d} × {d}) = ? Kc (concentration convention)",
    "formula": "a*b*b/(c*d*d*d*d)",
    "correct": [
      0,
      1,
      2,
      3
    ],
    "target": 0.5,
    "tolerance": 0.01,
    "units": "Kc (concentration convention)",
    "correctResult": 0.5
  },
  "answerText": "Kc=0.5. Starting from [CO₂]=1.5 M, [H₂]=3 M and no products, an extent of 0.5 M gives these equilibrium concentrations. Stoichiometric coefficients become powers.",
  "wrongFeedback": [
    "The coefficient 4 is an exponent, not the hydrogen concentration."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** Kc=0.5. Starting from [CO₂]=1.5 M, [H₂]=3 M and no products, an extent of 0.5 M gives these equilibrium concentrations. Stoichiometric coefficients become powers.

**Wrong-path feedback:** The coefficient 4 is an exponent, not the hydrogen concentration.

**State/output:** Model predicts that lowering product-water activity
can drive more conversion.

## Stop 43 - Push the balance on purpose

**Format/placement:** CONTROL, operated at `coldline-tap`.

**Metadata:** Concept: 12 - Le Châtelier/Q vs K; Keystone: equilibrium and reaction quotient; Area: Reactor Hall; Learning role: COMBINE; Difficulty: L3; Story role: experiment.

**Call - exact player copy:** Go to the cold-line tap, in Cold End.

**Stop reason - exact player copy:** The safe-temperature yield is known and product removal is ready for a reversible test.

**Question card story setup - exact player copy:** Reversal will show whether the yield gain truly follows product removal.

**Question card story-science connection - exact player copy:** The response to water removal tests whether shifting equilibrium can improve methane yield without raising temperature.

**Question card prompt - exact player copy:** Use a controlled change to
increase methane yield without raising temperature, then reverse it.

**Complete format-specific interaction block:**

```yaml
control:
  variables:
    - {id: water_removal, label: "Remove product water", baseline: 0, test: 1, unit: state}
    - {id: inert_n2, label: "Add inert N2 at fixed volume", baseline: 0, test: 1, unit: state}
    - {id: pressure_bar, label: "Compress mixture", baseline: 8, test: 12, unit: bar}
  candidates: [water_removal, inert_n2, pressure_bar]
  response: {label: "Methane conversion", baseline: 60, water_removal: 68, inert_n2: 60, pressure_bar: 65, after_restore: 60, unit: percent, noise_band: 1}
  fixed: {temperature_K: 550, feed_composition: unchanged}
  required_sequence: [change_water_removal_only, measure, restore, measure_again]
  correct: water_removal
```

**Correct result:** Remove product water (preferred) or compress within
limit; demonstration expects water removal and reversal.

**Answer text:** Remove product water at fixed temperature, measure the higher conversion, then restore the baseline.

**Why:** Removing a product lowers Q below K, so the reaction moves
forward until Q=K again. The equilibrium constant at fixed temperature
does not change. An inert gas at fixed volume raises total pressure but
not component partial pressures.

**Wrong-path feedback:** Adding inert N2 at fixed volume raises total pressure but does not change the reacting gases' partial pressures, so it does not shift this equilibrium. Failing to restore the baseline leaves the controlled change unverified.

**State/output:** Cho approves enhanced condensate removal;
water_recycle_available = true.

## Stop 44 - Two plans look equally fast

**Format/placement:** DEGENERACY, at `operating-point-board`.

**Metadata:** Concept: 12 - kinetics vs equilibrium; Keystone: gas pressure, kinetics, equilibrium, and energy; Area: Reactor Hall; Learning role: RETRIEVE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the operating-point board, in Plant Control.

**Stop reason - exact player copy:** Two plans appear equally fast, but neither can be approved on reaction rate alone.

**Question card story setup - exact player copy:** Combine rate, equilibrium, pressure, and heat limits to choose between two plans that initially appear equally fast.

**Question card story-science connection - exact player copy:** The combined rate, equilibrium, and thermal checks identify which operating pair also preserves yield and safety margin.

**Question card prompt - exact player copy:** Add the physical
constraints that separate the equal-rate plans.

**Complete format-specific interaction block:**

```yaml
degeneracy:
  controls:
    - {id: temperature_K, label: "Temperature", min: 545, max: 575, step: 5}
    - {id: pressure_bar, label: "Pressure", min: 8, max: 13, step: 1}
  tolerance: 2
  first_locus:
    label: "Equal immediate rate index"
    points: [[575,8],[570,9],[565,10],[558,11],[550,12]]
  second_locus:
    label: "Equilibrium methane fraction >=70% and inlet peak <600 K"
    physics: "Exothermic equilibrium, gas-mole compression, and thermal margin"
    points: [[550,12],[550,13],[545,13]]
  truth_pair: {temperature_K: 550, pressure_bar: 12}
  correct: "Choose the lower-temperature, higher-pressure point and keep product-water removal."
```

**Correct result:** Plan B survives: lower temperature improves
exothermic equilibrium and thermal margin; higher pressure favors three
product gas moles over five reactant gas moles. Plan A violates
equilibrium fraction and approaches heat limit.

**Answer text:** Use 550 K and 12 bar with water removal; it alone meets rate, equilibrium-yield, and heat limits.

**Why:** Equal immediate rates do not imply equal final composition or
safety. The extra physics collapses the degeneracy.

**Wrong-path feedback:** Choosing the hotter equal-rate plan uses speed as the only criterion and ignores its poorer exothermic equilibrium yield and smaller thermal margin. The extra constraints are what separate the plans.

**State/output:** Set validated_operating_point = {T:550K,P:12bar};
visible plan board turns amber, not green, pending loop and power
checks.

### Character scene: mars-ingrid-payoff

**Trigger:** After Stop 44 is accepted.
**Location and presence:** `operating-point-board` in Plant Control. Ingrid Sundqvist, production and catalyst lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Signs the tested operating-point record supporting the safer recovery plan.
**Exact dialogue:**
- Ingrid Sundqvist, production and catalyst lead: “Use this operating point; we can recover output without bringing back the condition you stopped.”
- Dr. Tomás Herrera, reactor and safety engineer (radio): “We will keep the operating envelope available to the whole crew.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-ingrid-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

### Character scene: mars-herrera-payoff

**Trigger:** After Stop 44 is accepted.
**Location and presence:** `operating-point-board` in Plant Control. Dr. Tomás Herrera, reactor and safety engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Shares the tested operating envelope with production rather than retaining a private safety account.
**Exact dialogue:**
- Dr. Tomás Herrera, reactor and safety engineer: “You have the same record I do; we change the plan together when the evidence changes.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-herrera-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Use lower heat, higher pressure, and water removal. This plan keeps a safe heat margin and raises the final methane share. Two plans with the same early speed did not make the same final amount. The next test asks if the water and hydrogen loop can feed this plan.

**Segue - exact player copy:** But Demir's water return is short; better yield means little if the next shift cannot make hydrogen.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ingrid Sundqvist pins the LOWER TEMPERATURE / HIGHER PRESSURE / WATER REMOVAL plan to the board. But Demir's water return is short; better yield means little if the next shift cannot make hydrogen.

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 09:30

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The validated operating point improves methane yield,
while added compression and cooling draw power.

**Automatic bar change:** Methane +4 \| Oxygen 0 \| Power -6 \|
Integrity 0

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Power +6. Result: METHANE 94% \| OXYGEN 86% \| POWER
100% \| INTEGRITY 100%. Recovery Bank: 21 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Dynamic equilibrium:** a state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- **Le Chatelier's principle:** predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- **Degeneracy:** occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

### Review question 1


**Prompt - exact player copy:** Which statement best explains dynamic equilibrium?

**Options - exact player copy:**

- A. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- B. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.
- D. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for dynamic equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes le Chatelier's principle. It does not answer the question about dynamic equilibrium.
- B: Correct. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C: This describes degeneracy. It does not answer the question about dynamic equilibrium.
- D: This describes equilibrium constant. It does not answer the question about dynamic equilibrium.

### Review question 2


**Prompt - exact player copy:** Which statement best explains le Chatelier's principle?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for le chatelier's principle. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes dynamic equilibrium. It does not answer the question about le chatelier's principle.
- B: This describes degeneracy. It does not answer the question about le chatelier's principle.
- C: Correct. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D: This describes equilibrium constant. It does not answer the question about le chatelier's principle.

### Review question 3


**Prompt - exact player copy:** Which statement best explains degeneracy?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- C. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for degeneracy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes dynamic equilibrium. It does not answer the question about degeneracy.
- B: This describes le Chatelier's principle. It does not answer the question about degeneracy.
- C: This describes equilibrium constant. It does not answer the question about degeneracy.
- D: Correct. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

### Review question 4


**Prompt - exact player copy:** Which statement best explains equilibrium constant?

**Options - exact player copy:**

- A. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- B. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for equilibrium constant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- B: This describes dynamic equilibrium. It does not answer the question about equilibrium constant.
- C: This describes le Chatelier's principle. It does not answer the question about equilibrium constant.
- D: This describes degeneracy. It does not answer the question about equilibrium constant.

### Review question 5


**Prompt - exact player copy:** Which statement best explains reaction quotient?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for reaction quotient. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes dynamic equilibrium. It does not answer the question about reaction quotient.
- B: Correct. Uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.
- C: This describes le Chatelier's principle. It does not answer the question about reaction quotient.
- D: This describes degeneracy. It does not answer the question about reaction quotient.

### Review question 6


**Prompt - exact player copy:** Which statement best explains initial-change-equilibrium (ICE) table?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- C. Organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for initial-change-equilibrium (ice) table. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes dynamic equilibrium. It does not answer the question about initial-change-equilibrium (ice) table.
- B: This describes le Chatelier's principle. It does not answer the question about initial-change-equilibrium (ice) table.
- C: Correct. Organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.
- D: This describes degeneracy. It does not answer the question about initial-change-equilibrium (ice) table.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- K describes an equilibrium ratio at a particular temperature.

- ICE changes follow stoichiometric coefficients.

- Q\<K drives forward; Q\>K drives backward.

- Pressure, temperature, and product removal affect equilibrium in
  different ways.

- **Mission takeaway:** Kinetics sets speed; equilibrium sets the composition approached.

# Mission 12 - The Loop

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 12 - 4 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** THE LOOP

**Go now:** Go to the Ice Cut and meet Mei-Ling Cho, the water and cryogenics engineer, beside the raw-brine sampler.

**Card body:** 4 work shifts remain before launch. An 80 kmol gap sits in the water-return column. Today you decide where the missing hydrogen budget went.

**Objective:** Find the failed recycling step and restore the
whole-plant hydrogen balance.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 12: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m12_we01
    title: Calculate pH
    problem: An ideal dilute solution has [H₃O⁺]=10⁻³ mol/L. Find pH.
    rule: pH=-log₁₀([H₃O⁺]/1 mol/L).
    steps:
    - 'Set up the relationship: pH=-log₁₀([H₃O⁺]/1 mol/L).'
    - pH=-log₁₀(10⁻³)=3.
    answer: The pH is 3.
    common_mistake: The negative sign makes this pH positive.
  - id: mars_m12_we02
    title: Find neutralization volume
    problem: Neutralize 20 mL of 0.1 M HCl with 0.2 M NaOH. Assume complete 1:1 reaction.
    rule: c_acid V_acid=c_base V_base at equivalence.
    steps:
    - 'Set up the relationship: c_acid V_acid=c_base V_base at equivalence.'
    - V_base=0.1(20)/0.2=10 mL.
    answer: The equivalence volume is 10 mL.
    common_mistake: The volumes need not match when concentrations differ.
  - id: mars_m12_we03
    title: Find excess strong acid
    problem: Mix 20 mL of 0.1 M HCl with 10 mL of 0.1 M NaOH. Assume additive volumes. Find excess H⁺ concentration.
    rule: Subtract reacting moles, then divide excess amount by total solution volume.
    steps:
    - 'Set up the relationship: Subtract reacting moles, then divide excess amount by total solution volume.'
    - n_excess=0.002-0.001=0.001 mol; [H⁺]=0.001/0.030=1/30 M.
    answer: The excess acid concentration is approximately 0.033 M.
    common_mistake: Divide by the full 30 mL, not just the acid volume.
  - id: mars_m12_we04
    title: Balance a reaction
    problem: Balance H₂ + O₂ → H₂O without changing chemical formulas.
    rule: Coefficients conserve each element; subscripts identify substances.
    steps:
    - Place 2 before H₂O so the product has two oxygen atoms.
    - 'Place 2 before H₂ to supply four hydrogen atoms: 2H₂ + O₂ → 2H₂O.'
    answer: Both sides contain four hydrogen atoms and two oxygen atoms.
    common_mistake: Changing H₂O to H₂O₂ would change the product.
  - id: mars_m12_we05
    title: Calculate molarity
    problem: Dissolve 0.2 mol solute to make 0.5 L of solution.
    rule: c=n/V, using solution volume in liters.
    steps:
    - 'Set up the relationship: c=n/V, using solution volume in liters.'
    - c=0.2/0.5=0.4 mol/L.
    answer: The concentration is 0.4 M, where M means mol/L.
    common_mistake: Use final solution volume, not an assumed volume of solvent.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Electrolysis: uses electrical energy to drive a chemical change that would not proceed on its own. Here it splits treated water into hydrogen and oxygen.

Acid: increases hydrogen-ion concentration when placed in water. Excess acid must be measured and neutralized before water enters the electrolyzer.

Base: accepts hydrogen ions or increases hydroxide-ion concentration in water. The treatment system uses a measured base amount to neutralize excess acid.

pH: a logarithmic measure related to hydrogen-ion concentration. A smaller pH means a larger hydrogen-ion concentration.

#### Primer concepts

- Follow material through the whole loop instead of balancing each room in isolation.
- Treatment order matters: remove solids, remove unwanted dissolved ions, then neutralize measured excess acid.
- Predict a treatment result before measuring it; agreement verifies both the calculation and the controller.

#### Equations first needed today

**Equation:** moles of dissolved substance = molarity x volume in liters  
**What it is for:** turning a solution concentration and volume into a reacting amount  
**Symbols:** molarity is moles per liter; volume is the solution volume in liters.  
**Why this campaign needs it:** The treatment controller must add enough base to remove the measured acid without wasting purification capacity.  

**Equation:** pH = -log10[H+]  
**What it is for:** predicting acidity after neutralization  
**Symbols:** [H+] is the hydrogen-ion concentration in moles per liter; log10 is the base-ten logarithm.  
**Why this campaign needs it:** The predicted pH gives the electrolyzer a testable acceptance value before treated water is released.  

**Equation:** `N_end=N_start+N_made+N_returned-N_used-N_sent`  
**What it is for:** closing a whole-plant material balance  
**Symbols:** `N_end` ending amount; `N_start` starting amount; `N_made` amount produced; `N_returned` amount recovered; `N_used` amount consumed; `N_sent` amount transferred away. All terms use the same substance, unit, and time interval.  
**Why this campaign needs it:** Missing return water becomes a calculable next-shift hydrogen deficit only when the entire plant is counted together.  

**Crew on this mission - mission log:** Mei-Ling Cho - water and cryogenics engineer; Rosalind Achebe - analytical and electrochemistry lead; Yusuf Demir - power and life-support officer.



## Main story happening - designer summary

At the Ice Cut, raw brine chemistry establishes what enters. At the
Water Plant, the player chooses treatment and verifies an acid/base
prediction. At Electrolysis Hall, a whole-plant hydrogen balance reveals
that recycle-water loss, not mysterious H2 disappearance, causes the
persistent shortage. Twist 1 remains true but becomes deeper.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Ice Cut \| automatic**

**Trigger:** mission_12_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** An 80 kmol gap sits in the water-return column.

**Panel/HUD text:** MISSION 12 - THE LOOP

**Dialogue bubbles -** Cho: "Ice becomes water, water becomes hydrogen, hydrogen becomes methane, and the reactor makes water again. Follow every transfer until the loop closes."

**Unlocks:** Stop 45 at the Ice Cut loop board.
**Beat 2 - After Stop 45 \| Ice Cut chain board \| automatic response**

**Trigger:** accepted_stop_45.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `process-map`, the dated accepted-result slip for Stop 45 reads: "Correct order; electrolysis is the driven link.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MOVE TO WATER PLANT.

**Dialogue bubbles -** Demir: "Nice work. The water can cycle. The energy cannot. First make sure the water reaching electrolysis is fit to use."

**Waypoint:** Water Plant

**Unlocks:** The Water Plant waypoint and Stop 46; Stop 47 unlocks immediately after Stop 46.
**Beat 3 - After Stops 46 and 47 \| Water Plant \| automatic treatment verification**

**Trigger:** accepted_stop_46.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `columns`, the dated accepted-result slip for Stop 46 reads: "Map suspended regolith to the particle filter, dissolved ions to ion exchange, excess acid to measured base neutralization, and useful dissolved CO2 to retention.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 48: CLOSE HYDROGEN OVER THE WHOLE PLANT

**Dialogue bubbles -** Achebe: "Good thinking. The treated stream now meets the electrolyzer limit. Release it and compare the amount that arrives with the amount the reactor returned."

**Waypoint:** Electrolysis Hall

**Unlocks:** The Electrolysis Hall waypoint and Stop 48.
**Beat 4 - After Stop 48 \| Electrolysis Hall \| automatic deeper reveal**

**Trigger:** accepted_stop_47.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `brinetank`, the dated accepted-result slip for Stop 47 reads: "initial H+ 0.00100 mol; OH- 0.000900 mol; excess H+ 0.000100 mol; total volume 0.1900 L; \[H+\]=5.26e-4 M; pH=3.28. Measured pH 3.30.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** HYDROGEN DID NOT DISAPPEAR / RECYCLE WATER FAILED TO RETURN ON TIME.

**Dialogue bubbles -** Cho: "Exactly right. Our separator sent too much water away from the return path. The next shift began without the feed it was counting on."

**Unlocks:** The Mission 12 outcome beat.
**Beat 5 - At mission end \| Electrolysis Hall \| automatic outcome and hook**

**Trigger:** accepted_stop_48.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `stack-accounting-panel`, Yusuf Demir clips the WATER RETURN: 80 KMOL RECOVERED entry into the stack ledger. The dated prop remains here on later visits.

**Panel/HUD text:** NEXT ROUTE - SOLAR ARRAY -\> BATTERY GALLERY -\> ELECTROLYSIS HALL.

**Dialogue bubbles -** Yusuf Demir: "The water came back. Now we have to pay to split it. But Abiola's final production shift shares power with heat and air; Demir must protect those loads before startup."

**Waypoint:** Solar Array

**Unlocks:** Mission 13 briefing and the Solar Array waypoint.
### Physical aftermath — mars-m12

**Home:** `stack-accounting-panel`. **Before:** The dated mission-12 evidence holder at this fixture has no accepted record. An 80 kmol gap sits in the water-return column.
**After — exact action:** Yusuf Demir clips the WATER RETURN: 80 KMOL RECOVERED entry into the stack ledger.
**Trigger:** accepted_stop_48. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `loadboard`, the habitat breaker tags sit beside a climbing tank gauge.
**Segue - exact player copy:** But Abiola's final production shift shares power with heat and air; Demir must protect those loads before startup.

## Location plan

**Three locations:** Ice Cut (CUT) for Stop 45, Water Plant (SOIL) for
Stops 46-47, Electrolysis Hall (ELEC) for Stop 48. The molecule's path
is the route.

## Characters and dramatic beat

Cho and Achebe disagree over whether to prioritize dryness or ion
removal. Demir reframes the argument: both failures ultimately appear as
electrical and hydrogen cost. Herrera publicly admits that his
reactor-only ledger missed the recycle connection.

## Key concepts, explained here

Coupled reactions can share intermediates; adding equations cancels
species that are produced then consumed. Brine contains ions whose
behavior depends on solubility and acid/base chemistry. Strong acids
dissociate essentially completely in this course model; pH=-log\[H+\].
Neutralization consumes H+ and OH- stoichiometrically. A whole-system
material balance includes stored inventory and recycle streams, not only
fresh feed and final product.

## Stop 45 - Build the water-hydrogen-carbon loop

**Format/placement:** CHAIN, operated at `process-map`.

**Metadata:** Concept: 13 - coupled stoichiometry; Keystone: balancing and coupled systems; Area: Electrolysis Hall; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the process map, in Ice Cut.

**Stop reason - exact player copy:** The recovery condition is selected and the complete water-hydrogen loop needs checking for its energy input.

**Question card story setup - exact player copy:** Trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished.

**Question card story-science connection - exact player copy:** The loop identifies electrolysis as a driven step, preventing recycled water from being mistaken for free hydrogen production.

**Question card prompt - exact player copy:** Build the closed material
path and name the link that requires external energy.

**Complete format-specific interaction block:**

```yaml
chain:
  transfers:
    - {id: mine, label: "Ice and brine to Water Plant", carries: "H2O plus dissolved material"}
    - {id: clean, label: "Treatment to clean-water tank", carries: "purified H2O"}
    - {id: split, label: "Electrolysis", carries: "2H2O -> 2H2 + O2; electrical energy enters"}
    - {id: react, label: "Sabatier reactor", carries: "CO2 + 4H2 -> CH4 + 2H2O"}
    - {id: return, label: "Condenser return", carries: "product H2O to recycle tank"}
  order: [mine, clean, split, react, return]
  decoys:
    - {id: ice_to_methane, label: "Ice directly becomes methane"}
    - {id: oxygen_to_hydrogen, label: "Oxygen line feeds hydrogen store"}
  governing_relationship: "Atoms are conserved; electrolysis is the link that requires external energy."
  correct: [mine, clean, split, react, return]
```

**Correct result:** Correct order; electrolysis is the driven link.

**Answer text:** Build ice/brine to clean water to electrolysis to Sabatier water return; electrolysis is the powered link.

**Why:** Sabatier returns water, but electrolysis must spend electrical
energy to split it. Recycle reduces fresh-water demand; it does not make
the cycle energy-free.

**Wrong-path feedback:** A direct ice-to-methane path skips water treatment and electrolysis, while an oxygen-to-hydrogen path violates the authored reactions. If electrolysis is not identified as the powered link, the material loop is mistaken for an energy-free cycle.

**State/output:** Illuminate the site route; add loop_map_complete.

## Stop 46 - Match contaminants to treatment

**Format/placement:** PROTOCOL, at `columns`.

**Metadata:** Concept: 6 - solutions/solubility; Keystone: solutions and acid-base treatment; Area: Water Plant; Learning role: RETRIEVE; Difficulty: L3; Story role: experiment.

**Call - exact player copy:** Go to the treatment columns, in Water Plant.

**Stop reason - exact player copy:** The loop depends on water treatment that removes harmful contaminants without wasting useful feed.

**Question card story setup - exact player copy:** At the Water Plant, match each contaminant to a treatment so the return stream reaches electrolysis without wasting limited cleaning capacity.

**Question card story-science connection - exact player copy:** The treatment mapping protects electrolysis while retaining substances that remain useful to the reactor.

**Question card prompt - exact player copy:** Match each water contaminant to the treatment that addresses it.

**Complete format-specific interaction block:**

```yaml
scenarios:
  - {id: regolith, label: "Suspended regolith fines"}
  - {id: ions, label: "Dissolved chloride and perchlorate ions"}
  - {id: acid, label: "Acidic recycle water with excess H+"}
  - {id: co2, label: "Dissolved CO2 intended for reactor feed"}
choices:
  - {id: filter, label: "Particle filter"}
  - {id: exchange, label: "Ion-exchange column"}
  - {id: neutralize, label: "Measured base neutralization"}
  - {id: retain, label: "Do not spend polishing capacity solely on it"}
mapping: {regolith: filter, ions: exchange, acid: neutralize, co2: retain}
```

**Scenarios:** suspended regolith fines / dissolved chloride and
perchlorate ions / acidic recycle water with excess H+ / dissolved CO2
intended for reactor feed.

**Choices:** particle filter / ion-exchange column / measured base
neutralization / do not spend polishing capacity solely on it; mapping
\[0,1,2,3\].

**Correct result:** Map suspended regolith to the particle filter, dissolved ions to ion exchange, excess acid to measured base neutralization, and useful dissolved CO2 to retention.

**Answer text:** Filter solids, exchange dissolved ions, neutralize excess acid, and do not waste polishing capacity on useful CO2 feed.

**Why:** Physical filters catch particles, not dissolved ions. Ion
exchange targets charged solutes. Acid/base treatment is stoichiometric.
Removing every measurable species is not automatically useful; treatment
follows downstream consequence.

**Wrong-path feedback:** Distinguish suspension from solution; dissolved
ions pass a simple particle filter.

**State/output:** Prepare neutralization test.

## Stop 47 - Predict, treat, measure

**Format/placement:** VERIFY, operated at `brinetank`.

**Metadata:** Concept: 13 - strong acid/base stoichiometry and pH; Keystone: solutions and acid-base treatment; Area: Water Plant; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the brine tank, in Water Plant.

**Stop reason - exact player copy:** The treatment method is selected and must demonstrate the required water acidity numerically.

**Question card story setup - exact player copy:** The treatment vessel contains 0.1000 L of 0.0100 M strong acid, and the planned addition is 0.0900 L of 0.0100 M strong base. Assume complete neutralization and additive volumes; pH = -log10([H+]), with [H+] in mol/L.

**Question card story-science connection - exact player copy:** Predicted and measured pH determine whether the treated sample meets the electrolyzer's stated operating condition.

**Question card prompt - exact player copy:** Predict final pH, command
addition, then measure.

**Complete format-specific interaction block:**

```yaml
verify:
  prediction:
    data: {hcl_volume_mL: 100.0, hcl_M: 0.0100, naoh_volume_mL: 90.0, naoh_M: 0.0100, total_volume_mL: 190.0}
    calculation: "0.00100 mol H+ - 0.000900 mol OH- = 0.000100 mol H+; [H+] = 5.26e-4 M"
    correct_pH: 3.28
    tolerance: 0.05
  action: {id: add_naoh, label: "Add 90.0 mL of 0.0100 M NaOH"}
  measurement: {pH: 3.30, resolution: 0.02}
  required_sequence: [commit_prediction, add_naoh, measure_pH]
  truth: "Prediction and measurement agree within instrument resolution."
```

**Correct result:** initial H+ 0.00100 mol; OH- 0.000900 mol;
excess H+ 0.000100 mol; total volume 0.1900 L; \[H+\]=5.26e-4 M;
pH=3.28. Measured pH 3.30.

**Answer text:** After neutralization, predict pH 3.28 and accept the measured pH 3.30.

**Why:** Neutralization is a mole subtraction before a concentration or
logarithm calculation. Equal molarities do not neutralize if volumes
differ. The measurement agrees within instrument resolution.

**Wrong-path feedback:** Averaging pH values is invalid; pH is
logarithmic. Failing to measure after prediction does not complete
VERIFY.

**State/output:** Treatment controller is calibrated; recycled water
accepted.

## Stop 48 - Close hydrogen over the whole plant

**Format/placement:** BALANCE, at `stack-accounting-panel`.

**Metadata:** Concept: 13 - whole-system inventory; Keystone: balancing and coupled systems; Area: Electrolysis Hall; Learning role: TRANSFER; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the stack accounting panel, in Electrolysis Hall.

**Stop reason - exact player copy:** The water treatment passes, but the next shift's hydrogen shortage still needs a whole-plant explanation.

**Question card story setup - exact player copy:** With clean water flowing, total hydrogen across the entire plant to identify the missing return and close the recycling loop.

**Question card story-science connection - exact player copy:** The hydrogen ledger separates a present unmeasured leak from lost future production caused by missing return water.

**Question card prompt - exact player copy:** Reconcile produced
hydrogen and inventory, then identify why next-shift production falls.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Whole-plant hydrogen ledger", unit: "kmol H2"}
  streams:
    - {id: electrolysis, label: "Electrolysis production", value: 400, side: available, count: true}
    - {id: store_draw, label: "Draw from storage", value: 20, side: available, count: true}
    - {id: reactor_use, label: "Reactor consumption", value: 360, side: use, count: true}
    - {id: vents, label: "Measured vents", value: 4, side: use, count: true}
    - {id: line_fill, label: "Increase in line inventory", value: 6, side: use, count: true}
    - {id: oxygen_coproduct, label: "Electrolysis oxygen coproduct", value: 200, unit: "kmol O2", side: other, count: false}
  closure: {available: 420, uses: 370, reserve: 50, tolerance: 0}
  next_shift: {planned_h2: 480, actual_h2: 400, missing_return_water: 80, water_to_h2_ratio: "1:1 molar"}
  correct_action: "Close the current ledger, then identify an 80 kmol next-shift H2 deficit from missing return water."
```

**Correct result:** Current H2 ledger: available 400 + 20 withdrawn =
420; uses 360 + 4 + 6 = 370, leaving 50 kmol in reserve. No large
unmeasured H2 loss exists. The scheduled next run is short because 80
kmol H2O failed to return; the 1:1 H2O:H2 electrolysis ratio makes that
an 80 kmol H2 production deficit.

**Answer text:** The current ledger closes with 50 kmol H2; missing 80 kmol return water causes an 80 kmol next-shift H2 deficit.

**Why:** The "missing hydrogen" is a timing and boundary error. Each
room closes locally while the return stream fails between shifts. Expand
the system boundary and include storage/recycle.

**Wrong-path feedback:** Treating the 80 kmol next-shift deficit as a current unmeasured H2 leak ignores the current ledger, which closes with 50 kmol in reserve. Counting oxygen or another non-hydrogen coproduct in the H2 ledger also crosses the system boundary incorrectly.

**State/output:** Set twist_1_deepened = true; water_recycle_restored =
true; raise projected H2 output.

### Character scene: mars-yusuf-turn

**Trigger:** After Stop 48 is accepted.
**Location and presence:** `stack-accounting-panel` in Electrolysis Hall. Yusuf Demir, power and life-support officer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Places the closed plant hydrogen balance beside the habitat reserve record.
**Exact dialogue:**
- Yusuf Demir, power and life-support officer: “Recovery changes what we must supply; I was treating every extra kilogram as a new draw.”
- Mei-Ling Cho, water and cryogenics engineer (radio): “Then count the recovered stream once, with its measured composition.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-yusuf-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: The next shift is short because 80 kmol of water did not return to the power cell. The full-plant hydrogen count now closes. Water treatment fixes the return line. The plant can make both gases again. It still needs enough power for every key load.

**Segue - exact player copy:** But Abiola's final production shift shares power with heat and air; Demir must protect those loads before startup.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Yusuf Demir clips the WATER RETURN: 80 KMOL RECOVERED entry into the stack ledger. But Abiola's final production shift shares power with heat and air; Demir must protect those loads before startup.

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** Repairing the recycle loop restores hydrogen feed and
oxygen production, but restarting water treatment draws power.

**Automatic bar change:** Methane +6 \| Oxygen +5 \| Power -8 \|
Integrity 0

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Power +8. Result: METHANE 100% \| OXYGEN 91% \| POWER
100% \| INTEGRITY 100%. Recovery Bank: 25 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Coupled system:** contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- **Recycle loop:** returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- **Neutralization:** the reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- **Logarithm:** reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- **Inventory:** the amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.

### Review question 1


**Prompt - exact player copy:** Which statement best explains coupled system?

**Options - exact player copy:**

- A. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- B. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- C. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- D. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for coupled system. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes recycle loop. It does not answer the question about coupled system.
- B: This describes neutralization. It does not answer the question about coupled system.
- C: This describes logarithm. It does not answer the question about coupled system.
- D: Correct. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.

### Review question 2


**Prompt - exact player copy:** Which statement best explains recycle loop?

**Options - exact player copy:**

- A. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- B. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- C. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- D. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for recycle loop. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- B: This describes coupled system. It does not answer the question about recycle loop.
- C: This describes neutralization. It does not answer the question about recycle loop.
- D: This describes logarithm. It does not answer the question about recycle loop.

### Review question 3


**Prompt - exact player copy:** Which statement best explains neutralization?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- C. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- D. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for neutralization. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes coupled system. It does not answer the question about neutralization.
- B: Correct. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- C: This describes recycle loop. It does not answer the question about neutralization.
- D: This describes logarithm. It does not answer the question about neutralization.

### Review question 4


**Prompt - exact player copy:** Which statement best explains logarithm?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- C. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for logarithm. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes coupled system. It does not answer the question about logarithm.
- B: This describes recycle loop. It does not answer the question about logarithm.
- C: Correct. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- D: This describes neutralization. It does not answer the question about logarithm.

### Review question 5


**Prompt - exact player copy:** Which statement best explains inventory?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- C. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- D. The amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for inventory. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes coupled system. It does not answer the question about inventory.
- B: This describes recycle loop. It does not answer the question about inventory.
- C: This describes neutralization. It does not answer the question about inventory.
- D: Correct. The amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electrolysis?

**Options - exact player copy:**

- A. Uses electrical energy to drive a chemical change that would not proceed on its own. Splitting water into hydrogen and oxygen is one example.
- B. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- C. Returns useful material to an earlier process instead of discarding it. For example, water can be returned to an electrolyzer to recover hydrogen and oxygen.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electrolysis. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Uses electrical energy to drive a chemical change that would not proceed on its own. Splitting water into hydrogen and oxygen is one example.
- B: This describes coupled system. It does not answer the question about electrolysis.
- C: This describes recycle loop. It does not answer the question about electrolysis.
- D: This describes neutralization. It does not answer the question about electrolysis.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Coupled equations share and cancel intermediates.

- Recycle reduces fresh material demand but not necessarily energy
  demand.

- Filters remove particles; ion exchange removes selected dissolved
  ions.

- Neutralization requires moles first, then concentration, then pH.

- **Mission takeaway:** System boundaries and storage timing can create apparent missing material.

# Mission 13 - Power

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 13 - 3 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** POWER

**Go now:** Go to the Solar Array and meet Yusuf Demir, the power and life-support officer, at the live power board.

**Card body:** 3 work shifts remain before launch. The habitat breaker tags sit beside a climbing tank gauge. Today you decide how much power the fuel cells may use.

**Objective:** Turn the available electricity into launch gases while
protecting every critical system.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 13: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m13_we01
    title: Identify oxidation and reduction
    problem: In Zn+Cu²⁺→Zn²⁺+Cu, identify electron transfer.
    rule: Oxidation loses electrons; reduction gains electrons.
    steps:
    - Zn→Zn²⁺+2e⁻ is oxidation.
    - Cu²⁺+2e⁻→Cu is reduction.
    answer: Zinc is oxidized and copper ions are reduced.
    common_mistake: Positive ions can be reduced by gaining electrons.
  - id: mars_m13_we02
    title: Find charge passed
    problem: A current of 2 A flows for 50 s. Find electric charge.
    rule: Q=It; 1 A=1 C/s.
    steps:
    - 'Set up the relationship: Q=It; 1 A=1 C/s.'
    - Q=2(50)=100 C.
    answer: The transferred charge is 100 C.
    common_mistake: Current is charge per time, not total charge.
  - id: mars_m13_we03
    title: Convert charge to electron amount
    problem: An electrolysis passes 10000 C. Use rounded Faraday constant F=100000 C/mol. Find electron amount.
    rule: n_e=Q/F.
    steps:
    - 'Set up the relationship: n_e=Q/F.'
    - n_e=10000/100000=0.1 mol.
    answer: The electron amount is 0.1 mol with the supplied rounded constant.
    common_mistake: Dividing by the Avogadro constant does not convert coulombs directly to moles.
  - id: mars_m13_we04
    title: Use electrons per deposited ion
    problem: Copper deposition follows Cu²⁺+2e⁻→Cu. An electrolysis supplies 0.1 mol electrons with 100% current efficiency. Use M_Cu=64 g/mol.
    rule: n_Cu=n_e/2; m_Cu=n_Cu M_Cu.
    steps:
    - 'Set up the relationship: n_Cu=n_e/2; m_Cu=n_Cu M_Cu.'
    - n_Cu=0.1/2=0.05 mol; m_Cu=0.05(64)=3.2 g.
    answer: The deposited copper mass is 3.2 g.
    common_mistake: Two moles of electrons deposit one mole of copper.
  - id: mars_m13_we05
    title: Find the limiting reactant
    problem: For 2H₂+O₂→2H₂O, mix 6 mol H₂ and 2 mol O₂.
    rule: Compare available amount divided by its reactant coefficient.
    steps:
    - hydrogen reaction units=6/2=3; oxygen reaction units=2/1=2.
    - Oxygen permits fewer reaction units; water produced=2(2)=4 mol.
    answer: O₂ limits the reaction; 2 mol H₂ remains.
    common_mistake: The reactant with fewer moles is not always limiting; coefficients matter.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Electron: a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.

Electrode: a solid part where electrons enter or leave a chemical system. The water cell has a cathode and an anode.

Cathode: the electrode where reduction occurs. The powered cell sends electrons to this electrode.

Anode: the electrode where oxidation occurs. Electrons leave this electrode through the outside circuit.

#### Primer concepts

- Reduction occurs at the cathode and oxidation occurs at the anode in both driven and spontaneous cells.
- Electrons travel through the outside circuit; ions move through the liquid to keep charge balanced. Faraday's law of electrolysis states that chemical change is proportional to the electric charge passed through the cell.
- Producing more gas is not a valid plan if cooling, purification, refrigeration, or habitat power falls below its required minimum.

#### Equations first needed today

**Equation:** Q = It  
**What it is for:** finding the total electric charge delivered during a timed run  
**Symbols:** Q is charge in coulombs; I is current in amperes; t is time in seconds.  
**Why this campaign needs it:** The dust-limited array gives the crew current and time, but the recovery plan needs a predicted amount of hydrogen and oxygen.  

**Equation:** Faraday's law calculation, moles of electrons = Q / F  
**What it is for:** converting electric charge into chemical amount  
**Symbols:** Q is charge in coulombs; F is 96,485 coulombs per mole of electrons.  
**Why this campaign needs it:** Electron amount is the bridge between the power board and the number of gas molecules the plant can make.  

**Equation:** actual product = theoretical product x current efficiency  
**What it is for:** correcting ideal gas production for practical electrical losses  
**Symbols:** actual product is the usable amount made; theoretical product follows electron stoichiometry; current efficiency is written as a decimal fraction.  
**Why this campaign needs it:** The launch plan must budget for the cell the crew actually has rather than a perfect 100-percent cell.  

**Crew on this mission - mission log:** Yusuf Demir - power and life-support officer; Rosalind Achebe - analytical and electrochemistry lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

The player begins at Array Shed to learn the available electrical
supply, moves to Battery Bank to protect the habitat floor, and operates
Electrolysis Hall to connect charge with gas production. The final
allocation funds enough electrolysis for the recovery while preserving
thermal control, purification, and habitat reserve.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Array Shed \| automatic**

**Trigger:** mission_13_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The habitat breaker tags sit beside a climbing tank gauge.

**Panel/HUD text:** MISSION 13 - POWER

**Dialogue bubbles -** Demir: "Every kilowatt now has a consequence. Electrolysis makes launch gases, but cooling protects the reactor, refrigeration protects the product, and the habitat keeps us alive. Count before you allocate."

**Unlocks:** Stop 49 at the live power meter; Stop 50 unlocks immediately after Stop 49.
**Beat 2 - After Stops 49 and 50 \| array power-routing display \| automatic response**

**Trigger:** accepted_stop_49.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `array-controller`, the dated accepted-result slip for Stop 49 reads: "First choice.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MOVE TO BATTERY GALLERY.

**Dialogue bubbles -** Demir: "Nice work. Now the electrical path and the chemical products agree. Check the battery floor before promising current we cannot sustain."

**Waypoint:** BATTERY GALLERY

**Unlocks:** The Battery Gallery travel beat.
**Beat 3 - On arrival at Battery Bank \| automatic constraint reveal**

**Trigger:** accepted_stop_50.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `cell-stacks`, the dated accepted-result slip for Stop 50 reads: "Cyclic order as listed, with note that the processes occur continuously rather than one molecule at a time.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** AVAILABLE FOR RECOVERY OPERATIONS - UPDATED.

**Dialogue bubbles -** Abiola: "Good thinking. These loads are not bargaining chips. Whatever remains can recover propellant."

**Waypoint:** Battery Bank -> Electrolysis Hall

**Unlocks:** The Battery Gallery waypoint, followed by the Electrolysis Hall waypoint and Stops 51-52.
**Beat 4 - After Stops 51 and 52 \| Electrolysis Hall \| automatic decision**

**Trigger:** accepted_stop_51.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `stack-sheet`, the dated accepted-result slip for Stop 51 reads: "2.77 kg; tolerance ±3%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Demir: "Exactly right. The plan does not maximize one machine. It keeps the entire route to launch alive."

**Unlocks:** The Mission 13 outcome beat.
**Beat 5 - At mission end \| Electrolysis Hall \| automatic outcome and hook**

**Trigger:** accepted_stop_52.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `loadboard`, Yusuf Demir pins the protected-load schedule beneath the full amount readings. The dated prop remains here on later visits.

**Panel/HUD text:** LAUNCH HOLD - INDEPENDENT ASSAY DISAGREES.

**Dialogue bubbles -** Yusuf Demir: "Both amounts are full. Leave room for the test to say no. But Achebe carries a fresh Batch C vial toward the lab; full tanks have not yet earned the word ready."

**Waypoint:** Tank Farm

**Unlocks:** Mission 14 briefing and the Tank Farm waypoint.
### Physical aftermath — mars-m13

**Home:** `loadboard`. **Before:** The dated mission-13 evidence holder at this fixture has no accepted record. The habitat breaker tags sit beside a climbing tank gauge.
**After — exact action:** Yusuf Demir pins the protected-load schedule beneath the full amount readings.
**Trigger:** accepted_stop_52. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `assay-review-board`, a fresh vial stands beneath a gauge that still says FULL.
**Segue - exact player copy:** But Achebe carries a fresh Batch C vial toward the lab; full tanks have not yet earned the word ready.

## Location plan

**Three locations:** Array Shed (ARRAY) for Stop 49, Battery Bank (BATT)
for Stop 50, Electrolysis Hall (ELEC) for Stops 51-52. The supply
measurement determines what can be drawn from storage; protected storage
then sets the electrolysis allocation.

## Characters and dramatic beat

Demir makes the habitat constraint concrete by putting the medic's night
heat load on the board. Achebe shows the exact theoretical product from
charge and the practical efficiency loss. Sundqvist accepts a slower
production interval to keep purification powered.

## Key concepts, explained here

Oxidation loses electrons; reduction gains them. In water electrolysis,
reduction at the cathode produces H2 and oxidation at the anode produces
O2. Charge is Q=It; moles of electrons equal It/F, with F=96485 C/mol
e-. Two electrons produce one H2 molecule. Electrical energy is finite
and real cells have less than 100% current efficiency.

## Stop 49 - Name oxidation and reduction

**Format/placement:** CHOICE, asked at Yusuf Demir beside `array-controller`.

**Metadata:** Concept: 14 - redox; Keystone: redox and electrochemistry; Area: Electrolysis Hall; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Yusuf Demir, at the array controller in Array Shed.

**Stop reason - exact player copy:** Electrolysis is next, and the gas lines must be assigned to the correct electrode reactions.

**Question card story setup - exact player copy:** Before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions.

**Question card story-science connection - exact player copy:** Identifying oxidation and reduction prevents hydrogen and oxygen products from being routed to the wrong outlets.

**Question card prompt - exact player copy:** In alkaline electrolysis,
which statement is correct?

**Choices:**

1. Water is reduced at the cathode to form H2; hydroxide is oxidized at the anode to form O2 **(correct)**

2. H2 forms by oxidation at the anode.

3. Both gases form by reduction.

4. Electron coefficients change the tabulated potential when equations are multiplied.

**Correct result:** First choice.

**Answer text:** Water is reduced at the cathode to H2, while hydroxide is oxidized at the anode to O2.

**Why:** Reduction gains electrons at the cathode; oxidation loses them
at the anode. Scaling a half-reaction does not scale an electrode
potential.

**Wrong-path feedback:** (2) Hydrogen forms at the cathode by reduction; oxidation occurs at the anode. (3) The two electrodes perform opposite redox processes: reduction at the cathode and oxidation at the anode. (4) Multiplying a half-reaction changes stoichiometric electron count, not the tabulated electrode potential.

**State/output:** Enable cell-direction schematic.

## Stop 50 - Assemble electron and ion flow

**Format/placement:** SEQUENCE, at `cell-stacks`.

**Metadata:** Concept: 14 - half-reactions and circuit; Keystone: redox and electrochemistry; Area: Electrolysis Hall; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the cell-stacks diagram, in Battery Bank.

**Stop reason - exact player copy:** The electrode products are identified, leaving the complete charge path to assemble.

**Question card story setup - exact player copy:** The assembled path will expose any impossible break in charge balance.

**Question card story-science connection - exact player copy:** The electron and ion routes establish whether the proposed cell maintains continuous charge balance.

**Question card prompt - exact player copy:** Put the circuit and ion-transfer events in a defensible operating order.

**Cards:** External supply pushes electrons to cathode / cathode
reduction forms H2 / ions carry charge through electrolyte / anode
oxidation forms O2 and releases electrons / electrons return through
external supply.

**Correct result:** Cyclic order as listed, with note that the processes
occur continuously rather than one molecule at a time.

**Answer text:** The supply drives cathode electrons, ions close charge through electrolyte, and anode electrons return through the outer circuit.

**Why:** Electrons travel through the external circuit; ions close
charge balance through electrolyte. Mixing those paths makes impossible
diagrams.

**Wrong-path feedback:** Electrons belong in the external circuit, not through the electrolyte; ions carry charge through the liquid. Placing gas formation before the corresponding electrode reaction breaks the electrochemical path.

**State/output:** Battery reserve floor fixed at 160 kWh.

## Stop 51 - Turn current into hydrogen

**Format/placement:** BALLPARK, at `stack-sheet`.

**Metadata:** Concept: 14 - Faraday's law; Keystone: redox and electrochemistry; Area: Electrolysis Hall; Learning role: INTRODUCE; Difficulty: L2; Story role: calculation.

**Call - exact player copy:** Go to the stack sheet, in Electrolysis Hall.

**Stop reason - exact player copy:** The electrolysis circuit is defined and the remaining operating time needs translating into hydrogen yield.

**Question card story setup - exact player copy:** The electrolyzer has a full shift to replenish hydrogen. The fuel ledger must include the measured efficiency.

**Question card prompt - exact player copy:** Run at 10,000 A for 8 h=28,800 s. Use F=96,485 C/mol e⁻, two electrons per H₂ molecule, efficiency 0.92 and molar mass 2.016 g/mol. Fill current,time,efficiency,molar mass; calculate hydrogen in kg.

**Complete format-specific interaction block — canonical BALLPARK:**

```json
{
  "estimate": {
    "quantity": "Turn current into hydrogen",
    "labels": [
      "10000",
      "28800",
      "0.92",
      "2.016",
      "8"
    ],
    "values": [
      10000,
      28800,
      0.92,
      2.016,
      8
    ],
    "slots": 4,
    "template": "{a} × {b} / (2 × 96485) × {c} × {d} / 1000 = ? kg H₂",
    "formula": "a*b/(2*96485)*c*d/1000",
    "correct": [
      0,
      1,
      2,
      3
    ],
    "target": 2.77,
    "tolerance": 0.0831,
    "units": "kg H₂",
    "correctResult": 2.77
  },
  "answerText": "The charge yields about 2.768 kg H₂ after the 92% efficiency factor, rounded to 2.77 kg.",
  "wrongFeedback": [
    "Convert hours to seconds, divide by two electrons per molecule, and apply efficiency once."
  ]
}
```

**Rendering and grading contract:** Render every numeric label as a selectable tile. The printed equation supplies the slot roles; do not replace number labels with quantity names. `correct` contains zero-based tile indices for slots a onward. Accept numerically equivalent selections, including equal-valued tiles. Evaluate the formula on submission; tolerance is absolute in the stated output units. Negative and zero results require a signed linear display. The board has one submission; supporting comparisons appear in the result explanation.

**Correct result:** The charge yields about 2.768 kg H₂ after the 92% efficiency factor, rounded to 2.77 kg.

**Wrong-path feedback:** Convert hours to seconds, divide by two electrons per molecule, and apply efficiency once.

**State/output:** Converts requested recovery hydrogen into required
stack-hours.

## Stop 52 - Allocate the recovery power

**Format/placement:** ALLOCATE, operated at `stack-power-controller`.

**Metadata:** Concept: 14 - electrochemistry under constraints; Keystone: redox and electrochemistry; Area: Electrolysis Hall; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the stack power controller, in Electrolysis Hall.

**Stop reason - exact player copy:** The hydrogen yield is estimated and its power must fit alongside habitat, treatment, and cooling demands.

**Question card story setup - exact player copy:** The dust front limits this shift’s energy. Recovery must keep the crew safe and preserve both the new product and the propellant already in storage.

**Decision evidence - exact player copy:** Required outcomes: supply the protected habitat load; maintain reactor thermal control; purify recovered gas; replace recovery hydrogen; keep stored product refrigerated.

**Question card prompt - exact player copy:** You have 600 kWh. Cover every required outcome and allocate the whole budget. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "allocate": {
    "budget": {
      "value": 600,
      "unit": "kWh"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "supply the protected habitat load"
      },
      {
        "id": "r2",
        "text": "maintain reactor thermal control"
      },
      {
        "id": "r3",
        "text": "purify recovered gas"
      },
      {
        "id": "r4",
        "text": "replace recovery hydrogen"
      },
      {
        "id": "r5",
        "text": "keep stored product refrigerated"
      }
    ],
    "selection_rule": "Cover every required outcome and allocate the whole budget.",
    "options": [
      {
        "id": "habitat",
        "label": "Habitat load",
        "cost": 180.0,
        "information": "Supplies the protected crew environment.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "cooling",
        "label": "Reactor thermal control",
        "cost": 120.0,
        "information": "Maintains the validated reactor heat limit.",
        "covers": [
          "r2"
        ]
      },
      {
        "id": "purification",
        "label": "Product purification",
        "cost": 80.0,
        "information": "Removes contaminants from recovered gas.",
        "covers": [
          "r3"
        ]
      },
      {
        "id": "electrolysis",
        "label": "Recovery electrolysis",
        "cost": 160.0,
        "information": "Produces the hydrogen needed by recovery.",
        "covers": [
          "r4"
        ]
      },
      {
        "id": "refrigeration",
        "label": "Tank refrigeration",
        "cost": 60.0,
        "information": "Preserves stored propellant in specification.",
        "covers": [
          "r5"
        ]
      },
      {
        "id": "fast_charge",
        "label": "Battery fast charge",
        "cost": 60.0,
        "information": "Adds discretionary battery charge but performs none of the required process duties.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "habitat",
        "cooling",
        "purification",
        "electrolysis",
        "refrigeration"
      ]
    ],
    "example_total": 600.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** habitat, cooling, purification, electrolysis, refrigeration = 600 kWh; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** power_plan_recovery = true; methane and oxygen
projections reach target at start of Mission 14.

### Character scene: mars-yusuf-payoff

**Trigger:** After Stop 52 is accepted.
**Location and presence:** `stack-power-controller` in Electrolysis Hall. Yusuf Demir, power and life-support officer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Records the accepted timed power allocation with the habitat reserve protected.
**Exact dialogue:**
- Yusuf Demir, power and life-support officer: “I can support this diversion with its timing and reserve limits attached.”
- Mei-Ling Cho, water and cryogenics engineer (radio): “I will keep the recovery schedule aligned with that power window.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-yusuf-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Run the power cell only while the habitat, cooling, cleanup, and cold tanks stay safe. The plan turns the available charge into hydrogen and finishes the oxygen goal. Both amount bars now read full. The launch clock starts. A new vial now tests what full really means.

**Segue - exact player copy:** But Achebe carries a fresh Batch C vial toward the lab; full tanks have not yet earned the word ready.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Yusuf Demir pins the protected-load schedule beneath the full amount readings. But Achebe carries a fresh Batch C vial toward the lab; full tanks have not yet earned the word ready.

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** Electrolysis fills the oxygen requirement and supplies
hydrogen, but it creates the campaign's largest electrical load.

**Automatic bar change:** Methane 0 \| Oxygen +10 \| Power -12 \|
Integrity 0

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Power +10. Result: METHANE 100% \| OXYGEN 100% \| POWER
98% \| INTEGRITY 100%. Recovery Bank: 27 RP.

**Lock result:** If Ascent Oxygen is now 100%, add VERIFIED and a
closed-padlock icon; this bar can no longer fall.

**Conditional failure check:** If Power Reserve was below 40% before
this event, set it to 0% and show MISSION FAILED - ELECTROLYSIS STARTUP
COLLAPSED THE POWER BUS.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Electrical circuit:** a connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- **Oxidation:** the loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- **Reduction:** the gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
- **Electric current:** the rate at which electric charge moves. One ampere is one coulomb of charge per second.
- **Coulomb:** a unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.
- **Electric charge:** a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- **Faraday constant:** the charge carried by one mole of electrons, about 96,485 coulombs per mole. It converts electrical charge into a chemical amount.
- **Current efficiency:** the fraction of electrical charge that makes the intended product. A value below 100 percent means some charge follows unwanted processes.
- **Protected load:** an electrical use that must remain powered for safety or mission function. Funding it reduces the energy available for optional work.

### Review question 1


**Prompt - exact player copy:** Which statement best explains electrical circuit?

**Options - exact player copy:**

- A. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- B. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
- D. The rate at which electric charge moves. One ampere is one coulomb of charge per second.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for electrical circuit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes oxidation. It does not answer the question about electrical circuit.
- B: Correct. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C: This describes reduction. It does not answer the question about electrical circuit.
- D: This describes electric current. It does not answer the question about electrical circuit.

### Review question 2


**Prompt - exact player copy:** Which statement best explains oxidation?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The rate at which electric charge moves. One ampere is one coulomb of charge per second.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for oxidation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electrical circuit. It does not answer the question about oxidation.
- B: This describes reduction. It does not answer the question about oxidation.
- C: Correct. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D: This describes electric current. It does not answer the question about oxidation.

### Review question 3


**Prompt - exact player copy:** Which statement best explains reduction?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- C. The rate at which electric charge moves. One ampere is one coulomb of charge per second.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for reduction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electrical circuit. It does not answer the question about reduction.
- B: This describes oxidation. It does not answer the question about reduction.
- C: This describes electric current. It does not answer the question about reduction.
- D: Correct. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

### Review question 4


**Prompt - exact player copy:** Which statement best explains electric current?

**Options - exact player copy:**

- A. The rate at which electric charge moves. One ampere is one coulomb of charge per second.
- B. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric current. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The rate at which electric charge moves. One ampere is one coulomb of charge per second.
- B: This describes electrical circuit. It does not answer the question about electric current.
- C: This describes oxidation. It does not answer the question about electric current.
- D: This describes reduction. It does not answer the question about electric current.

### Review question 5


**Prompt - exact player copy:** Which statement best explains coulomb?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. A unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for coulomb. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electrical circuit. It does not answer the question about coulomb.
- B: Correct. A unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.
- C: This describes oxidation. It does not answer the question about coulomb.
- D: This describes reduction. It does not answer the question about coulomb.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- C. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electrical circuit. It does not answer the question about electric charge.
- B: This describes oxidation. It does not answer the question about electric charge.
- C: Correct. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- D: This describes reduction. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Oxidation loses electrons; reduction gains them.

- Electrolysis uses external energy to force a nonspontaneous reaction.

- Q=It and mol e-=Q/F connect current to chemical amount.

- Account for electron stoichiometry and current efficiency.

- **Mission takeaway:** A power allocation is scientific when every funded load protects a named consequence.

# Mission 14 - FULL

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 14 - 2 WORK SHIFTS REMAIN BEFORE LAUNCH.

**Card title:** FULL

**Go now:** Go to the Tank Farm and meet Rosalind Achebe, the analytical and electrochemistry lead, beside the newest sample vial.

**Card body:** 2 work shifts remain before launch. A fresh vial stands beneath a gauge that still says FULL. Today you decide whether full Batch C is fit for flight.

**Objective:** Determine whether the full tanks meet the campaign's
fictional flight-quality limits.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 14: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m14_we01
    title: Calculate mass purity
    problem: A 20 g sample contains 18 g of the desired substance.
    rule: mass purity=desired mass/total mass×100%.
    steps:
    - 'Set up the relationship: mass purity=desired mass/total mass×100%.'
    - mass purity=18/20×100%=90%.
    answer: The sample is 90% pure by mass.
    common_mistake: Do not divide by the impurity mass.
  - id: mars_m14_we02
    title: Find a partial pressure
    problem: An ideal-gas mixture is 25% helium by mole and has total pressure 8 atm.
    rule: P_He=x_He P_total.
    steps:
    - 'Set up the relationship: P_He=x_He P_total.'
    - P_He=0.25(8)=2 atm.
    answer: Helium contributes 2 atm.
    common_mistake: Use mole fraction, not mass fraction.
  - id: mars_m14_we03
    title: Apply simultaneous conditions
    problem: A sample must have purity ≥95% and temperature ≤30 °C. It has purity 97% and temperature 32 °C. Does it pass?
    rule: When both conditions are required, both must be true.
    steps:
    - purity test = 97 ≥ 95, true.
    - temperature test = 32 ≤ 30, false. A passing purity cannot cancel a failed temperature.
    answer: The sample fails the combined specification.
    common_mistake: Averaging a pass and a fail is not a logical AND.
  - id: mars_m14_we04
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
  - id: mars_m14_we05
    title: Use a calibration line
    problem: A sensor obeys A=2c+0.1, with dimensionless reading A and concentration c in mmol/L. A sample gives A=0.5.
    rule: Subtract the intercept before dividing by the slope.
    steps:
    - 'Set up the relationship: Subtract the intercept before dividing by the slope.'
    - c=(0.5-0.1)/2=0.2 mmol/L.
    answer: The concentration is 0.2 mmol/L.
    common_mistake: Dividing 0.5 directly by 2 ignores the baseline reading.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Specification: a measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.

Purity: the fraction of a sample made of the desired substance. High total mass does not guarantee high purity.

Certification: a documented decision that measured material meets every required specification. It must rely on evidence capable of testing the claimed property.

Dependency: an earlier measurement, standard, or calculation another reading relies on. Two green displays sharing one dependency do not give two independent confirmations.

#### Primer concepts

- Amount, pressure, and composition are different claims and require evidence that can measure each one.
- Certification should use a frozen model and a new independent sample.
- Set the methane-purity trigger before the blind sample; keep carbon-dioxide, water, and pressure limits fixed as companion specifications.

#### Equations first needed today

No new numerical equation is introduced. The mission retrieves mole fraction, partial pressure, separation behavior, and independent-evidence reasoning to judge fixed flight specifications.

**Crew on this mission - mission log:** Rosalind Achebe - analytical and electrochemistry lead; Commander Laila Abiola - mission commander.



## Main story happening - designer summary

Tank Farm displays apparent readiness, Assay Lab breaks the shared
dependency, and Pad Office forces precommitted limits. This is Twist 3:
enough propellant exists by mass and pressure, but not all of it is safe
to fly. The player's earlier lessons about partial pressure,
intermolecular forces, spectroscopy, and evidence independence all
return.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Tank Farm \| automatic**

**Trigger:** mission_14_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** A fresh vial stands beneath a gauge that still says FULL.

**Panel/HUD text:** MISSION 14 - FULL

**Dialogue bubbles -** Achebe: "Mass and pressure say the tank is full. My independent vial says part of that mass is carbon dioxide and water. A full tank can still be the wrong propellant."

**Unlocks:** Stop 53 at the Tank Farm dependency view.
**Beat 2 - After Stop 53 \| Tank Farm dependency view \| automatic discovery**

**Trigger:** accepted_stop_53.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `farm-gauges`, the dated accepted-result slip for Stop 53 reads: "Pressure is independently real, but mass and quality are partly model-derived; two green quality channels share Standard C. The vial is the only independent composition check.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** RESULT RECORDED

**Dialogue bubbles -** Achebe: "Nice work. Four displays do not make four measurements when three inherit the same calibration."

**Waypoint:** Assay Lab

**Unlocks:** The Assay Lab waypoint and Stops 54-55.
**Beat 3 - After Stops 54 and 55 \| Assay Lab \| automatic Twist 3**

**Trigger:** accepted_stop_54.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `spec-bench`, the dated accepted-result slip for Stop 54 reads: "Model fails; quarantine Batch C.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** AMOUNT AT TARGET / COMPOSITION OUT OF SPECIFICATION.

**Dialogue bubbles -** Abiola: "Good thinking. We made enough material. We did not make enough flight-ready methane."

**Waypoint:** Ascent Pad office

**Unlocks:** The Ascent Pad office waypoint and Stop 56.
**Beat 4 - After Stop 56 \| Pad Office \| automatic crisis result**

**Trigger:** accepted_stop_55.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `assay-review-board`, the dated accepted-result slip for Stop 55 reads: "Purification breakthrough hidden by shared Standard C bias is the only diagnosis that fits the full panel.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** MISSION DECISION READY

**Dialogue bubbles -** Achebe: "Exactly right. The deadline did not move the line. Batch C fails the rule we wrote before seeing it." Abiola: "Countdown remains stopped."

**Unlocks:** The Mission 14 outcome beat.
**Beat 5 - At mission end \| Pad Office \| automatic outcome and hook**

**Trigger:** accepted_stop_56.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `assay-review-board`, Rosalind Achebe hangs a BATCH C: HOLD tag over the loading release. The dated prop remains here on later visits.

**Panel/HUD text:** FINAL MISSION - GO / NO-GO.

**Dialogue bubbles -** Rosalind Achebe: "The gauge tells the truth about mass. It cannot tell us what that mass is. Therefore Abiola has one shift to clean the fuel and replace the loss; the old hot setting remains forbidden."

**Waypoint:** Plant Control

**Unlocks:** Mission 15 briefing and the Plant Control waypoint.
### Physical aftermath — mars-m14

**Home:** `assay-review-board`. **Before:** The dated mission-14 evidence holder at this fixture has no accepted record. A fresh vial stands beneath a gauge that still says FULL.
**After — exact action:** Rosalind Achebe hangs a BATCH C: HOLD tag over the loading release.
**Trigger:** accepted_stop_56. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `certification-console`, the crew's bags wait behind the dark pad door.
**Segue - exact player copy:** Therefore Abiola has one shift to clean the fuel and replace the loss; the old hot setting remains forbidden.

## Location plan

**Three locations:** Tank Farm (TANKS) for Stop 53, Assay Lab (ASSAY)
for Stops 54-55, Pad Office (PAD) for Stop 56. A trace from the tank
dashboard leads to the lab standard; the lab diagnosis triggers the
launch-threshold decision.

## Characters and dramatic beat

Achebe earns her defining moment by saying "Stop" after apparent
victory. Abiola initially resists because three channels are green; she
changes her definition of ready when the dependency trace opens.
Sundqvist asks for time to reprocess instead of arguing that mass is
enough.

## Key concepts, explained here

Total pressure and total mass do not establish composition. Carbon
dioxide and water have different molecular interactions and phase
behavior from methane, affecting cold lines and combustion feed.
Calibration models must be tested on independent recent samples.
Specifications are multi-variable thresholds chosen before results;
otherwise teams can move the goalposts after seeing inconvenient data.

### Fictional game specification

- Methane mole fraction \>= 97.0%

- Carbon dioxide mole fraction \<= 2.0%

- Water mole fraction \<= 0.10%

- Tank pressure 18.0-20.0 bar at certification temperature

- Any independent-sample failure requires quarantine and reprocessing

## Stop 53 - Trace every green light

**Format/placement:** TRACE, operated at `farm-gauges`.

**Metadata:** Concept: 6 - evidence independence; Keystone: gas pressure and evidence independence; Area: Plant Control; Learning role: RETRIEVE; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the farm gauges, in Tank Farm.

**Stop reason - exact player copy:** The recovery hardware is ready, but the green readiness indicators may share hidden assumptions.

**Question card story setup - exact player copy:** The tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent.

**Question card story-science connection - exact player copy:** The dependency audit establishes which mass and quality claims have genuinely independent measurement support.

**Question card prompt - exact player copy:** Open dependencies and
identify which readiness claims are independently supported.

**Complete format-specific interaction block:**

```yaml
trace:
  shared_resources:
    - {id: standard_c, label: "Cold-end Standard C"}
    - {id: standard_a, label: "Assay Lab Standard A"}
  target: standard_c
  channels:
    - {id: pressure, label: "Tank pressure", reading: "19.1 bar / PASS", depends_on: [pressure_transducer]}
    - {id: mass, label: "Estimated methane mass", reading: "FULL", depends_on: [pressure, molar_mass_model]}
    - {id: online_quality, label: "Online composition", reading: "97.4% CH4 / PASS", depends_on: [cold_end_analyzer, standard_c]}
    - {id: control_quality, label: "Control-room quality", reading: "PASS", depends_on: [online_quality, standard_c]}
    - {id: ready_light, label: "LOAD READY", reading: "GREEN", depends_on: [mass, control_quality]}
    - {id: vial, label: "Independent Batch C vial", reading: "pending", depends_on: [standard_a]}
  truth: {dependent_channels: [online_quality, control_quality, ready_light], independent_channels: [pressure, vial]}
  correct: "Pressure is independently real; mass and quality are derived; the vial is the independent composition check."
```

**Correct result:** Pressure is independently real, but mass and quality
are partly model-derived; two green quality channels share Standard C.
The vial is the only independent composition check.

**Answer text:** Pressure is independent, but mass and quality are derived; the vial is the only independent composition check.

**Why:** A full gauge can be true while methane purity is false. Derived
numbers are useful, not independent.

**Wrong-path feedback:** Treating online quality, control-room quality, and the READY light as independent confirmations counts the same Standard C dependency more than once. Estimated methane mass is also derived from pressure and a model rather than a separate composition measurement.

**State/output:** Turn load-ready light amber; set
evidence_flags.quality_not_independent = true.

### Character scene: mars-abiola-turn

**Trigger:** After Stop 53 is accepted.
**Location and presence:** `farm-gauges` in Tank Farm. Commander Laila Abiola, mission commander, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the shared dependencies visible beside the green readiness channels.
**Exact dialogue:**
- Commander Laila Abiola, mission commander: “I asked for a full tank; I also owe this crew proof of what is in it.”
- Rosalind Achebe, analytical and electrochemistry lead (radio): “An independent sample has to earn the claim that those channels only repeat.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-abiola-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.

### Character scene: mars-cho-turn

**Trigger:** After Stop 53 is accepted.
**Location and presence:** `farm-gauges` in Tank Farm. Mei-Ling Cho, water and cryogenics engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Marks the common calibration behind the cold-end and control-room estimates.
**Exact dialogue:**
- Mei-Ling Cho, water and cryogenics engineer: “I checked the separation model; I should also have checked what both estimates inherited.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-cho-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 54 - Test certification on the newest sample

**Format/placement:** HOLDOUT, operated at `spec-bench`.

**Metadata:** Concept: 11 - model generalization; Keystone: evidence must be independent; Area: Plant Control; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the specification bench, in Assay Lab.

**Stop reason - exact player copy:** The certification model is frozen and the newest batch is ready for an unseen test.

**Question card story setup - exact player copy:** Because several green signals share one standard, freeze the historical calibration and test it on the unseen Batch C vial.

**Question card story-science connection - exact player copy:** The independent batch result determines whether the model supports certification or requires quarantine.

**Question card prompt - exact player copy:** Freeze the historical
certification model and score the unseen Batch C vial.

**Complete format-specific interaction block:**

```yaml
holdout:
  fit_set:
    label: "Six historical clean standards"
    methane_percent_range: [97,100]
    maximum_residual_percent: 0.3
    model_prediction_for_batch_c_percent: 97.4
  freeze_required: true
  holdout_set:
    - {id: batch_c, measured_ch4_percent: 91.6, measured_co2_percent: 8.0, measured_h2o_percent: 0.40}
  pass_limits: {ch4_min_percent: 97.0, co2_max_percent: 2.0, h2o_max_percent: 0.10}
  correct: "Model fails the unseen contaminated sample; quarantine Batch C."
  anti_cheat: "Calibration cannot be refit after Batch C is revealed."
```

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 54 - Test certification on the newest sample"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Freeze the historical certification model and score the unseen Batch C vial."
  payload: "```yaml holdout: fit_set: label: \"Six historical clean standards\" methane_percent_range: [97,100] maximum_residual_percent: 0.3 model_prediction_for_batch_c_percent: 97.4 freeze_required: true holdout_set: - {id: batch_c, measured_ch4_percent: 91.6, measured_co2_percent: 8.0, measured_h2o_percent: 0.40} pass_limits: {ch4_min_percent: 97.0, co2_max_percent: 2.0, h2o_max_percent: 0.10} correct: \"Model fails the unseen contaminated sample; quarantine Batch C.\" anti_cheat: \"Calibration cannot be refit after Batch C is revealed.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed methane-certification prediction error", min: 0, max: 8, step: 2, unit: "percentage points CH4"}
  fit: [{at: 0, value: 0.56}, {at: 2, value: 0.98}, {at: 4, value: 0.84}, {at: 6, value: 0.87}, {at: 8, value: 0.83}]
  test: [{at: 0, value: 0.31}, {at: 2, value: 0.43}, {at: 4, value: 0.74}, {at: 6, value: 0.86}, {at: 8, value: 0.84}]
  passScore: 0.80
  overfitAt: 2
  correctAt: 6
  fittedPrediction: {methane: 97.4, unit: "% CH4"}
  heldOutMeasurement: {methane: 91.6, carbonDioxide: 8.0, water: 0.40, unit: "%"}
  correctConclusion: "The historical model fails Batch C; quarantine the batch."
```

**Correct result:** Model fails; quarantine Batch C.

**Answer text:** The frozen model fails Batch C, so quarantine the batch.

**Why:** Passing historical clean samples does not validate
extrapolation into a contaminated regime. The newest independent sample
is exactly what certification must predict.

**Wrong-path feedback:** Refitting the calibration to make Batch C pass
destroys the independence of the test.

**State/output:** batch_c_quality = off_spec; launch countdown pauses.

### Character scene: mars-achebe-turn

**Trigger:** After Stop 54 is accepted.
**Location and presence:** `spec-bench` in Assay Lab. Rosalind Achebe, analytical and electrochemistry lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the newest independent sample result beside the prior certification claim.
**Exact dialogue:**
- Rosalind Achebe, analytical and electrochemistry lead: “This sample changes the decision; another copy of the old number would not have helped.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-achebe-turn` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 55 - What is actually wrong?

**Format/placement:** DIAGNOSIS, at `assay-review-board`.

**Metadata:** Concept: 15 - integrated composition diagnosis; Keystone: structure, solutions, separation, gases, and equilibrium; Area: Cold End; Learning role: RETRIEVE; Difficulty: L5; Story role: twist.

**Call - exact player copy:** Go to the assay review board, in Assay Lab.

**Stop reason - exact player copy:** The new batch fails the model check and the full panel must identify why.

**Question card story setup - exact player copy:** Combine the failed vial with the other readings to decide whether the problem is amount, contamination, or a broken sensor.

**Question card story-science connection - exact player copy:** The diagnosis separates having sufficient gross material from having methane clean enough to certify for flight.

**Question card prompt - exact player copy:** Which explanation fits the amount, pressure, composition, dryer, and calibration readings?

**Complete format-specific interaction block:**

```yaml
headline: "FULL BY MASS IS NOT FLIGHT-READY BY COMPOSITION"
readings:
  - {zone: tank, label: "Pressure", value: "19.1 bar", state: quiet}
  - {zone: tank, label: "Total loaded mass", value: "target reached", state: quiet}
  - {zone: assay, label: "Methane", value: "91.6%", state: alarm}
  - {zone: assay, label: "Carbon dioxide", value: "8.0%", state: alarm}
  - {zone: assay, label: "Water", value: "0.40%", state: alarm}
  - {zone: cold_end, label: "Drier differential pressure", value: "high", state: alarm}
choices:
  - {id: low_amount, label: "Insufficient total propellant", mechanism: "Contradicted by loaded mass and pressure."}
  - {id: leak, label: "Tank leak", mechanism: "Contradicted by stable mass and pressure."}
  - {id: breakthrough, label: "Purification breakthrough hidden by shared calibration", mechanism: "Explains high CO2/H2O, drier load, and false quality pass."}
  - {id: slow_rate, label: "Reactor rate still too low", mechanism: "Cannot create contaminants after collection."}
answer: breakthrough
```

**Readings:** pressure 19.1 bar (normal); total loaded mass at target;
methane 91.6% (low); CO2 8.0% (high); water 0.40% (high); cold-end drier
differential pressure high; production history recovered; no tank mass
loss.

**Choices:**

1. Insufficient total propellant.

2. Tank leak.

3. Off-spec Batch C caused by purification breakthrough and shared calibration bias. **(correct)**

4. Reactor rate still too low.

**Correct result:** Purification breakthrough hidden by shared Standard C bias is the only diagnosis that fits the full panel.

**Answer text:** Batch C is off specification because purification broke through and Standard C hid the contamination.

**Why:** Contaminants add mass and pressure, so quantity signals
pass. Drier/purification breakthrough sends CO2/water into product;
biased Standard C hides it.

**Wrong-path feedback:** Insufficient total propellant is ruled out by target mass and normal pressure. A tank leak is ruled out by stable mass and pressure. A slow reactor rate cannot create the measured CO2 and water contamination after collection.

**State/output:** twist_3_complete = true; quarantine line appears
around one tank.

### Character scene: mars-cho-payoff

**Trigger:** After Stop 55 is accepted.
**Location and presence:** `assay-review-board` in Assay Lab. Mei-Ling Cho, water and cryogenics engineer, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Keeps the independent contamination diagnosis with the treatment record.
**Exact dialogue:**
- Mei-Ling Cho, water and cryogenics engineer: “Choose the treatment for the sample we tested, not the composition we expected.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-cho-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Stop 56 - Write the rule before the final samples

**Format/placement:** TRIGGER, operated at `certification-console`.

**Metadata:** Concept: 15 - precommitted thresholds; Keystone: evidence must be independent; Area: Plant Control; Learning role: APPLY; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the certification console, in Pad Office.

**Stop reason - exact player copy:** The failure is diagnosed and final acceptance limits must be written before the blind samples arrive.

**Question card story setup - exact player copy:** Commit the acceptance and abort limits before the blind samples appear so the decision cannot move after the result is known.

**Question card story-science connection - exact player copy:** The precommitted purity, moisture, and pressure rules ensure an independent failure cannot be averaged into a pass.

**Decision evidence - exact player copy:** Release specification: independent CH₄≥97.0%, CO₂≤2.0%, H₂O≤0.10%, and pressure 18.0–20.0 bar inclusive. Any failed independent composition test keeps the batch quarantined; averaging it with a passing dependent reading is not allowed.

**Question card prompt - exact player copy:** Commit the independent methane-purity trigger before two blind samples appear; use the fixed carbon-dioxide, water, and pressure limits as companion rules.

**Complete format-specific interaction block:**

```yaml
trigger:
  rule:
    id: methane_acceptance
    label: "Independent methane purity needed for acceptance"
    scale: {min: 90.0, max: 100.0, unit: percent_CH4}
    anchors:
      - {value: 90.0, label: "QUARANTINE"}
      - {value: 95.0, label: "HOLD"}
      - {value: 96.5, label: "NEAR ACCEPTANCE RANGE"}
      - {value: 100.0, label: "PURE END"}
    objective: "Accept a batch only when an independent sample meets methane purity and all fixed companion specifications."
    direction: higher_is_safer
    consequence_limit: 97.0
  fixed_companion_limits: {co2_max_percent: 2.0, h2o_max_percent: 0.10, pressure_bar: [18.0,20.0]}
  blind_updates:
    - {id: tank_a, ch4: 98.4, co2: 1.5, h2o: 0.06, pressure_bar: 19.0, result: pass}
    - {id: batch_c, ch4: 91.8, co2: 7.8, h2o: 0.38, pressure_bar: 19.2, result: quarantine}
  correct: "Commit 97.0% before reveal; any independent failure triggers quarantine rather than averaging."
```

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 56 - Write the rule before the final samples"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Commit the independent methane-purity trigger before two blind samples appear; use the fixed carbon-dioxide, water, and pressure limits as companion rules."
  payload: "```yaml trigger: rule: id: methane_acceptance label: \"Independent methane purity needed for acceptance\" scale: {min: 90.0, max: 100.0, unit: percent_CH4} anchors: - {value: 90.0, label: \"QUARANTINE\"} - {value: 95.0, label: \"HOLD\"} - {value: 96.5, label: \"NEAR ACCEPTANCE RANGE\"} - {value: 100.0, label: \"PURE END\"} objective: \"Accept a batch only when an independent sample meets methane purity and all fixed companion specifications.\" direction: higher_is_safer consequence_limit: 97.0 fixed_companion_limits: {co2_max_percent: 2.0, h2o_max_percent: 0.10, pressure_bar: [18.0,20.0]} blind_updates: - {id: tank_a, ch4: 98.4, co2: 1.5, h2o: 0.06, pressure_bar: 19.0, result: pass} - {id: batch_c, ch4: 91.8, co2: 7.8, h2o: 0.38, pressure_bar: 19.2, result: quarantine} correct: \"Commit 97.0% before reveal; any independent failure triggers quarantine rather than averaging.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "certified sample purity", min: 90, max: 100, step: 0.1, unit: "%"}
  start: 92
  anchors:
    - {at: 92, means: "routine baseline, not the decision threshold"}
    - {at: 96.5, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 95, hoursLeft: 48}
    - {at: "T-24 h", value: 96.5, hoursLeft: 24}
    - {at: "T-12 h", value: 97.2, hoursLeft: 12}
    - {at: "T-6 h", value: 98.1, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 90, max: 96.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 97, max: 100}, leadHours: 12}
  question: "Commit the independent methane-purity trigger before two blind samples appear; use the fixed carbon-dioxide, water, and pressure limits as companion rules."
```

**Correct result:** Commit CH4 at least 97.0% before reveal; CO2 at most 2.0%; H2O at
most 0.10%; pressure 18.0-20.0 bar at stated T; any independent failure
-\> quarantine/reprocess, not average with passing online value.

**Blind updates:** Tank A 98.4/1.5/0.06/19.0 passes; Batch C tank
91.8/7.8/0.38/19.2 fails composition despite pressure.

**Answer text:** Set methane acceptance at 97.0% before the blind samples; any independent failure triggers quarantine under the fixed companion limits.

**Why:** Thresholds express consequences before results create pressure
to excuse them. Averaging an independent failing sample with a biased
online channel has no scientific basis.

**Wrong-path feedback:** A trigger must name the action and allow enough
lead time; pressure alone cannot certify composition.

**State/output:** launch_status = NO_GO_PENDING_RECOVERY; unlock final
plan board.

### Character scene: mars-achebe-payoff

**Trigger:** After Stop 56 is accepted.
**Location and presence:** `certification-console` in Pad Office. Rosalind Achebe, analytical and electrochemistry lead, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Retains the precommitted acceptance rule before the final samples are opened.
**Exact dialogue:**
- Rosalind Achebe, analytical and electrochemistry lead: “These are the checks we agreed were enough; apply them without moving the line.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-achebe-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome

Mission decision: Stop the launch clock and hold Batch C. Its mass and pressure pass, but the new test finds too little methane and too much carbon dioxide and water. The batch fails the rule set before the test. One shift remains to make clean fuel without bringing back the heat risk.

**Segue - exact player copy:** Therefore Abiola has one shift to clean the fuel and replace the loss; the old hot setting remains forbidden.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Rosalind Achebe hangs a BATCH C: HOLD tag over the loading release. Therefore Abiola has one shift to clean the fuel and replace the loss; the old hot setting remains forbidden.

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** The independent assay decertifies Batch C: the tank is
full, but much less of its methane is flight-ready.

**Automatic bar change:** Methane -22 \| Oxygen 0 \| Power -6 \|
Integrity 0

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +8; Power +8. Result: METHANE 86% \| OXYGEN 100%
\| POWER 100% \| INTEGRITY 100%. Recovery Bank: 23 RP.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Contaminant:** an unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- **Threshold:** a value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- **Trigger rule:** states the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.
- **False-ready state:** occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

### Review question 1


**Prompt - exact player copy:** Which statement best explains contaminant?

**Options - exact player copy:**

- A. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- B. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.
- C. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- D. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for contaminant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes threshold. It does not answer the question about contaminant.
- B: This describes trigger rule. It does not answer the question about contaminant.
- C: This describes false-ready state. It does not answer the question about contaminant.
- D: Correct. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.

### Review question 2


**Prompt - exact player copy:** A rule is fixed in advance: stop at the first check with a reading of at least 5 units. At which plotted time should the stop occur?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (min)",
  "yLabel": "Reading (units)",
  "caption": "Readings at four successive checks",
  "series": [
    {
      "name": "Reading",
      "points": [
        [
          0,
          2
        ],
        [
          1,
          3
        ],
        [
          2,
          5
        ],
        [
          3,
          6
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 2 minutes.
- B. 1 minute.
- C. 3 minutes.
- D. No stop is needed because the average is below 5.

**Correct answer:** A

**Hint - exact player copy:** At least includes equality.

**Option feedback - exact player copy:**

- A: Correct. 2 minutes.
- B: The reading is only 3 units at 1 minute.
- C: Waiting until 3 minutes misses the first qualifying check.
- D: The rule applies to each reading, not the average.

### Review question 3


**Prompt - exact player copy:** Which statement best explains trigger rule?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.
- C. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for trigger rule. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes contaminant. It does not answer the question about trigger rule.
- B: Correct. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.
- C: This describes threshold. It does not answer the question about trigger rule.
- D: This describes false-ready state. It does not answer the question about trigger rule.

### Review question 4


**Prompt - exact player copy:** Which statement best explains false-ready state?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- C. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- D. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for false-ready state. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes contaminant. It does not answer the question about false-ready state.
- B: This describes threshold. It does not answer the question about false-ready state.
- C: Correct. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- D: This describes trigger rule. It does not answer the question about false-ready state.

### Review question 5


**Prompt - exact player copy:** Which statement best explains specification?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- C. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.
- D. A measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for specification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes contaminant. It does not answer the question about specification.
- B: This describes threshold. It does not answer the question about specification.
- C: This describes trigger rule. It does not answer the question about specification.
- D: Correct. A measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.

### Review question 6


**Prompt - exact player copy:** Which statement best explains purity?

**Options - exact player copy:**

- A. The fraction of a sample made of the desired substance. High total mass does not guarantee high purity.
- B. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- C. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D. States the measurement condition that causes an action. One clear rule prevents the operator from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for purity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The fraction of a sample made of the desired substance. High total mass does not guarantee high purity.
- B: This describes contaminant. It does not answer the question about purity.
- C: This describes threshold. It does not answer the question about purity.
- D: This describes trigger rule. It does not answer the question about purity.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Pressure and mass do not uniquely determine composition.

- Shared calibration can make several channels fail together.

- Holdout samples test the claim a certification model must make.

- A specification is a set of predeclared limits tied to consequences.

- **Mission takeaway:** "Enough" and "safe to use" are separate scientific claims.

# Mission 15 - GO / NO-GO

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 15 - 1 WORK SHIFT REMAINS BEFORE LAUNCH.

**Card title:** GO / NO-GO

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the final recovery board.

**Card body:** 1 work shift remains before launch. The crew's bags wait behind the dark pad door. Today you decide whether the crew can launch.

**Objective:** Authorize launch only if all four campaign metrics and
every chemistry threshold pass.

<!-- BEGIN OPTIONAL WORKED EXAMPLES -->
### Worked examples - optional mission-card panel

**Build behavior:** Place the “Worked examples” button below the mission opening, without adding to its body. Open a separate panel with five selectable examples, numbered 1 to 5. Show the selected problem, rule, worked steps, answer, and common mistake together; render any figure beside its problem. This is reference material, not an interaction to grade: no answer input, points, metric changes, or unlock requirement. Pause any active countdown while this panel is open. “Back to mission” restores the same mission card and progress. Keep examples hidden until the player opens the panel.

**Exact panel content:** All strings below are player-facing; IDs and flags are implementation fields.

```yaml
worked_examples:
  button_label: Worked examples
  panel_title: 'Mission 15: worked examples'
  optional: true
  graded: false
  examples:
  - id: mars_m15_we01
    title: Mass and amount
    problem: A sample contains 18 g of water. Use molar mass M=18 g/mol. Find amount n.
    rule: n=m/M.
    steps:
    - 'Set up the relationship: n=m/M.'
    - n=18/18=1 mol.
    answer: The sample contains 1 mol of water molecules.
    common_mistake: Grams measure mass; moles measure amount.
  - id: mars_m15_we02
    title: Calculate percent yield
    problem: A reaction could produce 20 g of product but yields 16 g.
    rule: percent yield=actual yield/theoretical yield×100%.
    steps:
    - 'Set up the relationship: percent yield=actual yield/theoretical yield×100%.'
    - percent yield=16/20×100%=80%.
    answer: The percent yield is 80%.
    common_mistake: Reversing the ratio gives an inappropriate value above 100% here.
  - id: mars_m15_we03
    title: Calculate sensible heat
    problem: Warm 100 g of a material by 10 °C. Its specific heat is 4 J/(g °C).
    rule: q=mcΔT.
    steps:
    - 'Set up the relationship: q=mcΔT.'
    - q=100(4)(10)=4000 J=4 kJ.
    answer: The material absorbs 4 kJ.
    common_mistake: Use temperature change, not final temperature.
  - id: mars_m15_we04
    title: Use electrons per deposited ion
    problem: Copper deposition follows Cu²⁺+2e⁻→Cu. An electrolysis supplies 0.1 mol electrons with 100% current efficiency. Use M_Cu=64 g/mol.
    rule: n_Cu=n_e/2; m_Cu=n_Cu M_Cu.
    steps:
    - 'Set up the relationship: n_Cu=n_e/2; m_Cu=n_Cu M_Cu.'
    - n_Cu=0.1/2=0.05 mol; m_Cu=0.05(64)=3.2 g.
    answer: The deposited copper mass is 3.2 g.
    common_mistake: Two moles of electrons deposit one mole of copper.
  - id: mars_m15_we05
    title: Calculate mass purity
    problem: A 20 g sample contains 18 g of the desired substance.
    rule: mass purity=desired mass/total mass×100%.
    steps:
    - 'Set up the relationship: mass purity=desired mass/total mass×100%.'
    - mass purity=18/20×100%=90%.
    answer: The sample is 90% pure by mass.
    common_mistake: Do not divide by the impurity mass.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Certified methane: methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.

Verification: checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.

Assay: a measured test that determines what substances a sample contains and how much of each is present. An independent assay can certify composition when dashboard estimates cannot.

Recovery chain: the full sequence of actions needed to change the failed condition and prove the change worked. Funding only one link cannot complete recovery.

#### Primer concepts

- Count certified methane rather than gross tank mass when comparing recovery plans.
- Fund reprocessing, replacement production, validated reactor operation, safety, and independent verification as one connected chain.
- The final recommendation introduces no new chemistry; it must satisfy every earlier amount, composition, thermal, power, and evidence constraint.

#### Equations first needed today

No new equation is introduced. Use the balanced reaction, gas laws, material and energy ledgers, rate law, equilibrium expression, acid-base calculation, and Faraday calculation already recorded in the mission log.

**Crew on this mission - mission log:** Commander Laila Abiola - mission commander; Ingrid Sundqvist - production and catalyst lead; Dr. Tomás Herrera - reactor and safety engineer; Mei-Ling Cho - water and cryogenics engineer; Rosalind Achebe - analytical and electrochemistry lead; Yusuf Demir - power and life-support officer.



## Main story happening - designer summary

Plant Control frames the decision, Tank Farm supplies the one additional
measurement, and Pad Office receives the final authorization. The player
values evidence, resolves two apparently viable plans with a physical
constraint, allocates 100 decision points, and makes one integrated
diagnosis/recommendation. The campaign then becomes pure story payoff.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the
Go now waypoint. After the player arrives, every beat below is delivered
through dialogue bubbles, radio bubbles, equipment displays, persistent
world changes, or waypoint notices. No beat requires a pre-rendered
sequence, forced viewpoint change, voice acting, or bespoke character
animation.*

**Beat 1 - On arrival at Plant Control \| automatic**

**Trigger:** mission_15_arrival.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The crew's bags wait behind the dark pad door.

**Panel/HUD text:** MISSION 15 - GO / NO-GO

**Dialogue bubbles -** Abiola: "This is not a race to make one number green. Choose the evidence and the recovery chain that can put this crew on a safe ascent before the window closes."

**Unlocks:** Stop 57 at the final decision board.
**Beat 2 - After Stop 57 \| decision board to Tank Farm \| automatic evidence choice**

**Trigger:** accepted_stop_57.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `final-recovery-board`, the dated accepted-result slip for Stop 57 reads: "Independent Batch C contaminant assay.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** FINAL SAMPLE AUTHORIZED - BATCH C INDEPENDENT ASSAY.

**Dialogue bubbles -** Achebe: "Nice work. Pressure and mass already pass. Composition is the uncertainty that can still change GO or NO-GO."

**Waypoint:** Tank Farm

**Unlocks:** The Tank Farm waypoint and Stop 58.
**Beat 3 - After Stop 58 \| Tank Farm \| automatic plan elimination**

**Trigger:** accepted_stop_58.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `tank-calculation-station`, the dated accepted-result slip for Stop 58 reads: "D. Plan B meets gross mass but not usable certified methane; it cannot erase contaminants. Plan D reprocesses Batch C while validated production replaces small losses.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** ONLY REPROCESS-BATCH-C PLAN SATISFIES AMOUNT + COMPOSITION + HARDWARE LIMITS.

**Dialogue bubbles -** Sundqvist: "Good thinking. The faster plan fills the gauge. It does not fill the specification."

**Unlocks:** Stop 59 at the integrated control board.
**Beat 4 - After Stop 59 \| integrated control board \| automatic resource commitment**

**Trigger:** accepted_stop_59.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `recovery-allocation-board`, the dated accepted-result slip for Stop 59 reads: "35 reprocessing, 25 independent verification, 15 electrolysis, 10 validated reactor, and 15 safety/habitat; total 100. Accept variants with at least 60 points across reprocessing + verification and no points to cosmetic recalibration, provided safety gets at least 10.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** NEXT TASK - STOP 60: COMMANDER'S RECOMMENDATION

**Dialogue bubbles -** Demir: "Exactly right. Habitat, cooling, and reserve remain protected." Cho: "Reprocessing and water return are powered." Herrera: "The reactor stays inside the validated envelope."

**Waypoint:** Ascent Pad

**Unlocks:** The Ascent Pad waypoint and Stop 60.
**Beat 5 - After Stop 60 \| Pad Office \| automatic final result**

**Trigger:** accepted_stop_60.

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** At `certification-console`, Commander Laila Abiola turns the final launch decision key. The final scene follows the completion gate below.

**Panel/HUD text:** FINAL GO / NO-GO - ALL BINDING CONDITIONS PASS

**Dialogue bubbles -** Commander Laila Abiola: "You brought us to the pad with fuel we can trust. Therefore Demir keeps the protected loads on through boarding; GO must hold through the last check."

**Unlocks:** The epilogue beat; all graded interaction is complete.
**Beat 6 - At mission end \| Ascent Pad \| automatic epilogue**

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

**World state:** The display reads READY - AMOUNT VERIFIED - COMPOSITION VERIFIED - SAFETY MARGIN VERIFIED while each specialist remains beside the relevant instrument and the existing ascent-vehicle object, pad lights, engine sound, and red-dust effects deliver the launch without changing the player's viewpoint.

**Panel/HUD text:** CAMPAIGN COMPLETE.

**Dialogue bubbles -** Abiola: "You did not fill a tank. You taught this station what full means."

**Unlocks:** Campaign complete and free movement at the Ascent Pad.
### Physical aftermath — mars-m15

**Home:** `certification-console`. **Before:** The dated mission-15 evidence holder at this fixture has no accepted record. The crew's bags wait behind the dark pad door.
**After — exact action:** Commander Laila Abiola turns the final launch decision key.
**Trigger:** accepted_stop_60; final scene requires the completion gate in section 8.1. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `certification-console`, the signed operating conditions remain beside the final status.
**Segue - exact player copy:** Therefore Demir keeps the protected loads on through boarding; GO must hold through the last check.

## Location plan

**Three locations:** Plant Control (GIBBS) for Stop 57, Tank Farm
(TANKS) for Stop 58, Pad Office (PAD) for Stops 59-60. The chosen
high-value measurement is taken at the tanks; its result removes one
plan and sends the crew to the launch console.

## Characters and dramatic beat

All six major characters present one constraint, not six speeches.
Sundqvist owns schedule, Herrera safety/equilibrium, Cho
purification/cryogenics, Achebe independent certification, Demir
power/habitat, Abiola the final authority. The player is the only person
whose role spans all constraints.

## Key concepts, explained here

No new major concept is taught. The player retrieves stoichiometry,
partial pressure, molecular properties, separation, calorimetry,
kinetics, equilibrium, acid/base treatment, electrolysis, uncertainty,
and evidence independence. The intellectual verb is decision: choose
what measurement could change action, use constraints to distinguish
plans, fund the causal chain, and state a complete go/no-go rule.

### Candidate recovery plans

- **A - Heat to 575 K:** faster initial production; fails thermal margin
  and worsens exothermic equilibrium yield.

- **B - Hold 550 K and raise to 12 bar:** safer and improves
  equilibrium; still cannot make contaminated Batch C acceptable without
  reprocessing.

- **C - Divert power only to electrolysis:** restores H2 but starves
  purification/refrigeration if used alone.

- **D - Reprocess Batch C while running the validated 550 K/12 bar point
  and timed electrolysis:** costs time and the full power budget but
  addresses amount, purity, and safety together.

## Stop 57 - Buy one measurement that could change the decision

**Format/placement:** VALUE, asked at Commander Laila Abiola beside `final-recovery-board`.

**Metadata:** Concept: 15 - value of information; Keystone: evidence must be independent; Area: Plant Control; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the final recovery board in Plant Control.

**Stop reason - exact player copy:** The final decision still hinges on composition, not on another confirmation of pressure or mass.

**Question card story setup - exact player copy:** Batch C remains quarantined while pressure and mass are already measured precisely. The unresolved question is whether its composition meets the launch specifications.

**Decision evidence - exact player copy:** Required outcomes: obtain an independent measurement of Batch C contaminants.

**Question card prompt - exact player copy:** You have 10 test points. Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve. Select whole packages, then submit the plan; the board shows its total and remaining reserve for you to check.

**Complete format-specific interaction block - canonical source:**

```json
{
  "value": {
    "budget": {
      "value": 10,
      "unit": "test points"
    },
    "requirements": [
      {
        "id": "r1",
        "text": "obtain an independent measurement of Batch C contaminants"
      }
    ],
    "selection_rule": "Cover every required outcome at the lowest total cost within the budget; keep all unused capacity in reserve.",
    "options": [
      {
        "id": "pressure",
        "label": "Repeat total-pressure reading",
        "cost": 6.0,
        "information": "Improves an already precise amount-related measurement, not the gas mixture.",
        "covers": []
      },
      {
        "id": "mass",
        "label": "Duplicate tank mass",
        "cost": 7.0,
        "information": "Rechecks total amount without separating contaminants.",
        "covers": []
      },
      {
        "id": "assay",
        "label": "Independent Batch C contaminant assay",
        "cost": 10.0,
        "information": "Measures contaminants using a separately calibrated sample test.",
        "covers": [
          "r1"
        ]
      },
      {
        "id": "catalyst_temp",
        "label": "Repeat average catalyst temperature",
        "cost": 5.0,
        "information": "Measures reactor temperature rather than tank composition.",
        "covers": []
      },
      {
        "id": "valve",
        "label": "Visual valve inspection",
        "cost": 4.0,
        "information": "Checks visible hardware without measuring gas purity.",
        "covers": []
      }
    ],
    "accepted_plans": [
      [
        "assay"
      ]
    ],
    "example_total": 10.0,
    "example_reserve": 0.0
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** assay = 10 test points; reserve 0

**Answer text:** Each funded package supplies a required outcome; an affordable package that leaves one unresolved is insufficient.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Dispatch sealed sample to Tank Farm portable analyzer;
diagnostic_budget = 0.

## Stop 58 - Collapse the last degeneracy

**Format/placement:** DEGENERACY, at `tank-calculation-station`.

**Metadata:** Concept: 15 - integrated constraints; Keystone: stoichiometry, electrochemistry, gases, and equilibrium; Area: Plant Control; Learning role: RETRIEVE; Difficulty: L5; Story role: obstacle.

**Call - exact player copy:** Go to the tank calculation station, in Tank Farm.

**Stop reason - exact player copy:** The assay narrows the recovery options, leaving usable methane and processing losses to reconcile.

**Question card story setup - exact player copy:** Use the independent assay and hardware limits to eliminate the plan that reaches gross mass but not certified methane.

**Question card story-science connection - exact player copy:** The surviving plan must replace lost production while removing contaminants rather than counting uncertified mass as fuel.

**Question card prompt - exact player copy:** Apply composition and
hardware constraints. Which plan survives?

**Complete format-specific interaction block:**

```yaml
degeneracy:
  controls:
    - {id: reprocessing_hours, label: "Batch C reprocessing time", min: 0, max: 8, step: 2}
    - {id: electrolysis_kWh, label: "Energy sent to electrolysis", min: 0, max: 160, step: 40}
  tolerance: 1.0
  first_locus:
    label: "Projected gross tank mass at deadline"
    points: [[0,160],[2,120],[4,80],[6,40],[8,0]]
  second_locus:
    label: "Certified methane plus replaced processing hydrogen"
    physics: "Independent composition assay, stoichiometric usable-methane accounting, and Faraday-limited H2 replacement"
    points: [[4,160],[6,120],[8,80]]
  truth_pair: {reprocessing_hours: 6, electrolysis_kWh: 120}
  hardware_limits: {pressure_max_bar: 12, inlet_peak_max_K: 600}
  correct: "Plan D: reprocess Batch C and power enough electrolysis to replace processing losses."
```

**§7 authored-board source - DEGENERACY:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 58 - Collapse the last degeneracy"
  format: "DEGENERACY"
  source: "Handback 5 canonical interaction block"
  question: "Apply composition and hardware constraints. Which plan survives?"
  payload: "```yaml degeneracy: controls: - {id: reprocessing_hours, label: \"Batch C reprocessing time\", min: 0, max: 8, step: 2} - {id: electrolysis_kWh, label: \"Energy sent to electrolysis\", min: 0, max: 160, step: 40} tolerance: 1.0 first_locus: label: \"Projected gross tank mass at deadline\" points: [[0,160],[2,120],[4,80],[6,40],[8,0]] second_locus: label: \"Certified methane plus replaced processing hydrogen\" physics: \"Independent composition assay, stoichiometric usable-methane accounting, and Faraday-limited H2 replacement\" points: [[4,160],[6,120],[8,80]] truth_pair: {reprocessing_hours: 6, electrolysis_kWh: 120} hardware_limits: {pressure_max_bar: 12, inlet_peak_max_K: 600} correct: \"Plan D: reprocess Batch C and power enough electrolysis to replace processing losses.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DEGENERACY:**

**Handback 5 canonical interaction block - DEGENERACY:**

```yaml
degeneracy:
  controlA: {id: reprocessing_hours, label: "Batch C reprocessing time", min: 0, max: 8, step: 2, tolerance: 1, unit: "h"}
  controlB: {id: electrolysis_kWh, label: "Energy sent to electrolysis", min: 0, max: 160, step: 40, tolerance: 20, unit: "kWh"}
  firstLocus: [{x: 0, y: 120}, {x: 2, y: 120}, {x: 4, y: 120}, {x: 6, y: 120}, {x: 8, y: 120}]
  secondLocus: [{x: 4, y: 160}, {x: 6, y: 120}, {x: 8, y: 80}]
  secondMeasurement: {label: "Certified methane plus Faraday-limited replacement hydrogen"}
  truth: {x: 6, y: 120}
  tolerance: 1.0
  correctResult: "D. Plan B meets gross mass but not usable certified"
```

**Correct result:** D. Plan B meets gross mass but not usable certified
methane; it cannot erase contaminants. Plan D reprocesses Batch C while
validated production replaces small losses.

**Answer text:** Plan D survives because it reprocesses Batch C and powers enough electrolysis to replace the hydrogen lost during processing.

**Why:** Two plans looked equal only because the objective counted all
mass as fuel. Changing to the scientifically correct objective - certified
methane - collapses the match.

**Wrong-path feedback:** Choosing Plan B counts contaminated Batch C mass as certified methane and therefore solves the wrong objective. A surviving Plan D setting must also provide enough electrolysis to replace processing hydrogen without breaking the pressure or thermal limits.

**State/output:** Remove A/B/C as standalone plans; unlock strategic
allocation.

## Stop 59 - Spend 100 decision points

**Format/placement:** SCIENCETANK, asked at Commander Laila Abiola beside `recovery-allocation-board`.

**Metadata:** Concept: 15 - resource strategy; Keystone: kinetics, catalysts, acid-base treatment, energy, electrochemistry, and evidence; Area: Plant Control; Learning role: RETRIEVE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Commander Laila Abiola, at the recovery allocation board in Pad Office.

**Stop reason - exact player copy:** The recovery route is selected and the last decision budget must fund all of its essential parts.

**Question card story setup - exact player copy:** The recovery route now needs a complete execution budget. Laila will accept different distributions if they preserve every production, purity and safety condition.

**Question card prompt - exact player copy:** Allocate exactly 100 points. Minimums: reprocessing 25, electrolysis 15, validated operation 10, independent assay 15 and safety 10. Reprocessing plus assay must total at least 60. Assign zero to unvalidated heating and cosmetic recalibration. Submit the allocation; the board checks the total and each requirement.

**Complete format-specific interaction block - canonical source:**

```json
{
  "sciencetank": {
    "pool": {
      "value": 100,
      "unit": "points"
    },
    "items": [
      {
        "id": "reprocess",
        "label": "Batch C reprocessing",
        "min": 25,
        "max": 100,
        "step": 1,
        "information": "Reduces measured contaminants."
      },
      {
        "id": "electrolysis",
        "label": "Timed electrolysis",
        "min": 15,
        "max": 100,
        "step": 1,
        "information": "Replaces recovery hydrogen."
      },
      {
        "id": "validated_reactor",
        "label": "Validated reactor operation",
        "min": 10,
        "max": 100,
        "step": 1,
        "information": "Maintains 550 K and 12 bar."
      },
      {
        "id": "independent_assay",
        "label": "Independent final assay",
        "min": 15,
        "max": 100,
        "step": 1,
        "information": "Checks release specifications."
      },
      {
        "id": "safety",
        "label": "Habitat and safety",
        "min": 10,
        "max": 100,
        "step": 1,
        "information": "Protects crew and operating margin."
      },
      {
        "id": "extra_heat",
        "label": "Unvalidated extra heating",
        "min": 0,
        "max": 0,
        "step": 1,
        "information": "Exceeds the validated point."
      },
      {
        "id": "cosmetic",
        "label": "Cosmetic recalibration",
        "min": 0,
        "max": 0,
        "step": 1,
        "information": "Changes the display only."
      }
    ],
    "public_rule": "Minimums: reprocessing 25, electrolysis 15, validated operation 10, independent assay 15 and safety 10. Reprocessing plus assay must total at least 60. Assign zero to unvalidated heating and cosmetic recalibration.",
    "accepted_example": {
      "reprocess": 35,
      "electrolysis": 15,
      "validated_reactor": 10,
      "independent_assay": 25,
      "safety": 15,
      "extra_heat": 0,
      "cosmetic": 0
    },
    "grading": "Accept every allocation satisfying the public rule; the example is not exclusive."
  }
}
```

**Evidence delivery and grading:** The setup, decision evidence, public rules, costs and option descriptions are visible on this card before selection. Render option descriptions beside their controls, once; never replace them with internal axis IDs or a generic earlier-case sentence. Answer keys, accepted examples and feedback stay hidden until submission. Reveal withheld measurements only after the stated commitment. Use the public feasibility/selection rule; an example allocation is not an exclusive key. The displayed person must match this stop’s placement and Call.

**Correct result:** One valid example: {"reprocess": 35, "electrolysis": 15, "validated_reactor": 10, "independent_assay": 25, "safety": 15, "extra_heat": 0, "cosmetic": 0}. Other allocations satisfying the public rule are also correct.

**Answer text:** The accepted plan funds every required capability within the stated limits; extra points may be distributed only as the public rule allows.

**Wrong-path feedback:** Identify the unmet public condition or the specific measurement that the selected option cannot provide; keep the original evidence available for retry.

**State/output:** Execute the plan through persistent equipment and
world-state updates; Batch C returns to Tank Farm.

## Stop 60 - Commander's recommendation

**Format/placement:** DIAGNOSIS, at `certification-console`.

**Metadata:** Concept: 15 - whole-campaign synthesis; Keystone: whole-campaign transfer; Area: Plant Control; Learning role: TRANSFER; Difficulty: L5; Story role: final commitment.

**Call - exact player copy:** Go to the certification console, in Pad Office.

**Stop reason - exact player copy:** The final independent results are available and the commander needs a complete launch recommendation.

**Question card story setup - exact player copy:** Read the final independent results and all four metrics, then give Abiola GO only if every promised chemistry and safety limit passes. A GO is valid only if no earlier lesson or constraint is ignored.

**Question card story-science connection - exact player copy:** The recommendation determines whether the certified fuel and protected operating conditions justify GO without waiving an earlier constraint.

**Question card prompt - exact player copy:** "Commander needs your
recommendation. What do we do?"

**Complete format-specific interaction block:**

```yaml
headline: "FINAL GO / NO-GO - EVERY BINDING CONDITION"
readings:
  - {zone: composition, label: "Independent methane / CO2 / H2O", value: "98.1% / 1.8% / 0.08%", state: quiet}
  - {zone: tank, label: "Pressure", value: "19.0 bar", state: quiet}
  - {zone: reactor, label: "Operating point / inlet peak", value: "550 K, 12 bar / 584 K", state: quiet}
  - {zone: hydrogen, label: "Restart reserve", value: "16 kmol H2", state: quiet}
  - {zone: oxygen, label: "Ascent oxygen", value: "100% / VERIFIED", state: quiet}
  - {zone: power, label: "Habitat reserve", value: "protected", state: quiet}
  - {zone: evidence, label: "Independent assay agreement", value: "within 0.2%", state: quiet}
  - {zone: prior_batch, label: "Unprocessed Batch C", value: "91.8% CH4 / failed composition", state: alarm}
  - {zone: prior_reactor, label: "Old 575 K operating point", value: "allowed sensor error crosses thermal limit", state: alarm}
choices:
  - {id: ignore_assay, label: "Launch and ignore assay because mass is full", mechanism: "Repeats the false-ready error."}
  - {id: restore_hot, label: "Return to 575 K for more production", mechanism: "Reopens the thermal and equilibrium failure."}
  - {id: perfect_purity, label: "Reprocess until contaminants are zero", mechanism: "Unneeded perfection misses the window."}
  - {id: complete_plan, label: "Accept the passing batch, hold the validated point, protect power, and authorize launch", mechanism: "All amount, composition, pressure, thermal, power, and independence limits pass."}
answer: complete_plan
```

**Choices:**

1. Launch immediately and ignore the assay because mass is full.

2. Return to 575 K to add maximum production margin.

3. Reprocess again until contaminants are zero.

4. Accept the reprocessed batch, keep the validated 550 K/12 bar point through loading, preserve protected power, and authorize launch because every precommitted threshold now passes. **(correct)**

**Correct result:** Choose the complete plan: accept the independently passing batch, hold 550 K and 12 bar, protect power and reserve, and authorize GO.

**Answer text:** Choose the complete recovery plan and authorize GO only because every precommitted amount, composition, pressure, thermal, power, and verification limit passes.

**Why:** D meets amount, composition, pressure, thermal,
hydrogen, oxygen, and habitat constraints with independent verification.
Zero contamination is not required; the specification defines acceptable
limits.

**Wrong-path feedback:** A repeats Twist 3; B repeats Twist 2; C
confuses perfect purity with specified safe purity and misses the
window.

**State/output:** Set final_recommendation_correct = true; stop the
Mission 15 timer and open the final metric screen. Set launch_authorized
= true only after all four bars read 100%.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** From the cabin window, the pad lights shrink below. The full fuel gauge sits beside two passed assay seals. The crew is strapped in, the safe plant is behind them, and Arcadia Rise falls away into the red plain.

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS
{incorrect_submissions}

**Story event:** Reprocessing recovers usable methane, while final
conditioning and pad operations consume reserve power.

**Automatic bar change:** Methane +8 \| Oxygen 0 \| Power -4 \|
Integrity 0

**Recovery Point line template:** RECOVERY POINTS = 11 +
{time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4;
maximum 12)

**Allocation prompt:** Spend Recovery Points to raise the four bars, or
save them in the Recovery Bank. One point raises one unlocked bar by 1%.

**Canonical QA example:** 0 incorrect, finished within target, 12 RP
awarded. Spend: Methane +6; Power +4. Result: METHANE 100% \| OXYGEN
100% \| POWER 100% \| INTEGRITY 100%. Recovery Bank: 25 RP.

**Launch gate:** When all four bars read 100%, lock all four and reveal
AUTHORIZE LAUNCH. Otherwise show NO-GO - RECOVERY INCOMPLETE.

### Character scene: mars-abiola-payoff

**Trigger:** After Stop 60 is accepted.
**Location and presence:** `certification-console` in Pad Office. Commander Laila Abiola, mission commander, speaks by radio unless already placed locally by the existing beat; do not teleport or duplicate the character. Any second speaker is explicitly remote.
**Presentation:** Normal playable view; existing fixture evidence plus radio/nearby bubbles. Run after accepted-result feedback and before the existing departure or mission-outcome beat. This is authored scene content, not another graded interaction.
**Exact action / accessible description:** Applies the accepted final recommendation to the existing boarding state, retaining either the launch authorization or the failed checks.
**Exact dialogue:**
- Commander Laila Abiola, mission commander: “This is the decision supported by the samples; the color of the dashboard does not overrule it.”
- Rosalind Achebe, analytical and electrochemistry lead (radio): “The samples and acceptance rule stay together for the launch record.”

**World-state effect:** Preserve the existing accepted result and attach this reaction to its mission-log entry. The physical record remains at this fixture with the accepted scope; no new measurement, repair, signature authority or clearance is created by dialogue.
**Controls, persistence and retry:** Pause the timer during bubbles; one Continue per bubble restores control. At most two bubbles in this scene. Fire once per relevant accepted-state transition, not on wrong submissions; mission retry restores its snapshot and replay status. Retain accepted record and completed lines in the log. Use `mars-abiola-payoff` only as a story-presentation key, never as a stop or fixture ID. No RP, metric, mastery or travel-unlock effect. At Stop 60 this is part of the existing pre-ending reaction; do not delay the ending with optional roster material.


## Mission outcome and epilogue - no further quiz

Mission decision: Whether the crew can launch. Apply the existing final evidence and metric gates before the world payoff below.

From the cabin window, the pad lights shrink below. The full fuel gauge sits beside two passed assay seals. The crew is strapped in, the safe plant is behind them, and Arcadia Rise falls away into the red plain.
## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Value of information:** the usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- **Binding constraint:** a requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- **Tradeoff:** occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.
- **Go/no-go decision:** GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- Buy the measurement that can change the launch decision, not the one that is easiest to repeat.

### Review question 1


**Prompt - exact player copy:** Which statement best explains value of information?

**Options - exact player copy:**

- A. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- B. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.
- D. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for value of information. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes binding constraint. It does not answer the question about value of information.
- B: Correct. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C: This describes tradeoff. It does not answer the question about value of information.
- D: This describes go and no-go decision. It does not answer the question about value of information.

### Review question 2


**Prompt - exact player copy:** Which statement best explains binding constraint?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for binding constraint. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes value of information. It does not answer the question about binding constraint.
- B: This describes tradeoff. It does not answer the question about binding constraint.
- C: Correct. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D: This describes go and no-go decision. It does not answer the question about binding constraint.

### Review question 3


**Prompt - exact player copy:** Which statement best explains tradeoff?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- C. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- D. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for tradeoff. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes value of information. It does not answer the question about tradeoff.
- B: This describes binding constraint. It does not answer the question about tradeoff.
- C: This describes go and no-go decision. It does not answer the question about tradeoff.
- D: Correct. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.

### Review question 4


**Prompt - exact player copy:** Which statement best explains go and no-go decision?

**Options - exact player copy:**

- A. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- B. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for go and no-go decision. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- B: This describes value of information. It does not answer the question about go and no-go decision.
- C: This describes binding constraint. It does not answer the question about go and no-go decision.
- D: This describes tradeoff. It does not answer the question about go and no-go decision.

### Review question 5


**Prompt - exact player copy:** Which statement best explains certified methane?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. Methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for certified methane. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes value of information. It does not answer the question about certified methane.
- B: Correct. Methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.
- C: This describes binding constraint. It does not answer the question about certified methane.
- D: This describes tradeoff. It does not answer the question about certified methane.

### Review question 6


**Prompt - exact player copy:** Which statement best explains verification?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- C. Checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.
- D. Occurs when improving one goal uses time, material, or power needed by another. A decision must weigh the gains against their costs.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for verification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes value of information. It does not answer the question about verification.
- B: This describes binding constraint. It does not answer the question about verification.
- C: Correct. Checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.
- D: This describes tradeoff. It does not answer the question about verification.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Measure the uncertainty that can change the decision, not the number
  easiest to repeat.

- Add physical constraints when two plans fit the same limited evidence.

- Rate, equilibrium yield, composition, energy, and safety are separate
  constraints.

- A good plan funds the full causal chain and independent verification.

- **Mission takeaway:** GO means every precommitted requirement passes - not that one reassuring gauge is green.

# 9. Mission-at-a-glance production map

### Mission 1

**Main event:** Shortfall framed; carbon nearly closes.  
**Locations:** Plant Control.  
**Core chemistry:** particles, moles, atom balance.  
**Ending change:** major leak becomes doubtful.

### Mission 2

**Main event:** CO2 cleared; H2 limiting.  
**Locations:** Atmosphere Intake.  
**Core chemistry:** stoichiometry, limiting reactant.  
**Ending change:** investigate H2 side.

### Mission 3

**Main event:** Normal pressure, wrong gas.  
**Locations:** Hydrogen Store.  
**Core chemistry:** KMT, PV=nRT, Dalton.  
**Ending change:** purge mixture localized.

### Mission 4

**Main event:** Residue path disproved.  
**Locations:** Catalyst Bay.  
**Core chemistry:** Lewis, VSEPR, polarity, IMF.  
**Ending change:** second false leak clue falls.

### Mission 5

**Main event:** Shared calibration revealed.  
**Locations:** Water Plant; Ice Cut.  
**Core chemistry:** molarity, spectroscopy, dependency.  
**Ending change:** dashboard trust breaks.

### Mission 6

**Main event:** Twist 1.  
**Locations:** Plant Control; Tank Farm.  
**Core chemistry:** diagnosis, uncertainty, C/H/O balance.  
**Ending change:** no major methane leak.

### Mission 7

**Main event:** Override follows cooling loss.  
**Locations:** Reactor Hall; Cold End.  
**Core chemistry:** calorimetry, phase and energy ledger.  
**Ending change:** human suspect emerges.

### Mission 8

**Main event:** Action verified.  
**Locations:** Plant Control; Reactor Hall.  
**Core chemistry:** rate law, k, causal control.  
**Ending change:** Herrera suspended.

### Mission 9

**Main event:** Inlet catalyst damage found.  
**Locations:** Catalyst Bay; Assay Lab.  
**Core chemistry:** catalyst, mechanism, spatial pattern.  
**Ending change:** apparent case closes.

### Mission 10

**Main event:** Twist 2.  
**Locations:** Reactor Hall; Plant Control.  
**Core chemistry:** holdout, residual, stress.  
**Ending change:** override prevented runaway.

### Mission 11

**Main event:** Safe operating point chosen.  
**Locations:** Reactor Hall; Cold End; Control.  
**Core chemistry:** K, Q, ICE, Le Châtelier.  
**Ending change:** rate and yield plan aligned.

### Mission 12

**Main event:** Recycle-loop failure closes.  
**Locations:** Ice Cut; Water Plant; Electrolysis.  
**Core chemistry:** coupling, acids and bases, balance.  
**Ending change:** H2 shortage explained deeply.

### Mission 13

**Main event:** Finite power committed.  
**Locations:** Array; Battery; Electrolysis.  
**Core chemistry:** redox, Faraday, allocation.  
**Ending change:** apparent production victory.

### Mission 14

**Main event:** Twist 3.  
**Locations:** Tank Farm; Assay Lab; Pad.  
**Core chemistry:** composition, certification, triggers.  
**Ending change:** FULL becomes NO-GO.

### Mission 15

**Main event:** Integrated recovery and launch.  
**Locations:** Control; Tanks; Pad.  
**Core chemistry:** cumulative transfer.  
**Ending change:** launch authorized.

# 10. Stop manifest

**Stops 1-4 - CHOICE, BALLPARK, SEQUENCE, BALANCE:** recognize and establish foundations.

**Stops 5-8 - SEQUENCE, BALLPARK, CHOICE, ALLOCATE:** perform stoichiometry and make the first trade-off.

**Stops 9-12 - CHOICE, BALLPARK, PROBE, VERIFY:** separate amount, pressure, and composition.

**Stops 13-16 - CHOICE, SEQUENCE, PROTOCOL, SWEEP:** connect structure to observable behavior.

**Stops 17-20 - CHOICE, BALLPARK, SWEEP, TRACE:** measure solutions and expose dependency.

**Stops 21-24 - DIAGNOSIS, STRESS, BALANCE, CASEBOOK:** synthesize Twist 1.

**Stops 25-28 - CHOICE, BALLPARK, SEQUENCE, BALANCE:** build the heat model and human clue.

**Stops 29-32 - CHOICE, BALLPARK, CONTROL, ATTEST:** establish rate causation and action identity.

**Stops 33-36 - CHOICE, SEQUENCE, PROBE, DIAGNOSIS:** diagnose the catalyst-bed pattern.

**Stops 37-40 - HOLDOUT, RESIDUAL, STRESS, CASEBOOK:** validate the model and synthesize Twist 2.

**Stops 41-44 - CHOICE, BALANCE, CONTROL, DEGENERACY:** distinguish kinetics and equilibrium.

**Stops 45-48 - CHAIN, PROTOCOL, VERIFY, BALANCE:** integrate the material-recycle loop.

**Stops 49-52 - CHOICE, SEQUENCE, BALLPARK, ALLOCATE:** connect charge to product and power choice.

**Stops 53-56 - TRACE, HOLDOUT, DIAGNOSIS, TRIGGER:** reveal and govern Twist 3.

**Stops 57-60 - VALUE, DEGENERACY, SCIENCETANK, DIAGNOSIS:** value evidence and commit the final plan.

No format exceeds one third of scheduled stops. The campaign uses only
canonical formats and does not attempt to showcase every available
interaction.

# 11. Narrative implementation notes

## Environmental state changes

- M1: shortfall warning turns red to amber after carbon closure.

- M2: compressor overdrive proposal physically disappears from work
  board.

- M3: purge tie-in pipe illuminates after probe.

- M4: blue residue gains a maintenance tag instead of vanishing.

- M5: Ice Cut gate opens; shared standard cable is visible in TRACE
  overlay.

- M6: leak-search barricades and sealant kits are removed from Tank
  Farm.

- M7: radiator carries dust/frost state and reactor heat shimmer
  increases.

- M8: Herrera's console badge turns locked.

- M9: inlet catalyst section appears darkened; sample vial travels to
  Assay.

- M10: Herrera's badge unlocks; old set point receives a red safety
  boundary.

- M11: water-removal line illuminates stage by stage and validated
  operating point is posted.

- M12: the site process path lights from Ice Cut to Electrolysis to
  Reactor.

- M13: dust reduces array brightness; funded circuits illuminate
  according to allocation.

- M14: ascent countdown begins, stops, and Batch C receives a quarantine
  ring.

- M15: quarantine clears only after reprocessing; the vehicle becomes
  interactable after Stop 60.

## Dialogue state

Wrong answers should not branch plot, but optional greetings should
react to evidence. After Twist 1, Sundqvist addresses the player as
Propellant Lead rather than "new lead." During Missions 8-9, Herrera's
greetings are clipped but never hostile. After Twist 2, Sundqvist owns
her mistaken accusation without becoming passive. After Twist 3, Abiola
asks for "amount and specification" every time she uses the word ready.

## Mission endings

Each mission ending needs 45-90 seconds of non-quiz play: equipment
changes, a walk, an argument delivered in bubbles, a radio call, a
sample transfer, or a persistent world-state payoff. The outcome text
above is the required content, not necessarily a single speech. End
screens show WHAT CHANGED and CHEMISTRY YOU CAN NOW USE, then return
control in the world.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every numerical answer from authored values; tolerate only
  rounding, not alternative chemistry.

- Temperatures used in gas laws are kelvin.

- Stoichiometric coefficients are applied to moles.

- Rate-law orders are inferred from data, not copied from the balanced
  equation.

- Catalyst feedback never claims a change to K or Delta H.

- Equilibrium expression exponents match the balanced equation.

- Acid/base answer subtracts moles before taking pH.

- Faraday calculation converts hours to seconds and uses two electrons
  per H2.

- Fictional propellant thresholds are labeled as campaign
  specifications.

## Format checks

- CHOICE: four distinct labels, answer copied verbatim, three rebuttals.

- BALLPARK: every tile has units; target and tolerance accept the stated
  result.

- SEQUENCE: only one defensible order, or axis/ends explicitly define
  nonchronological order.

- PROTOCOL/CASEBOOK: mapping is a complete permutation.

- DIAGNOSIS: at least three reading zones and at least one quiet reading
  that rules out an option.

- Operated formats sit at fixtures; decision formats sit at a person;
  calculations sit at room furniture.

- VERIFY: prediction is committed before action, and measurement is
  mandatory.

- CONTROL: restoration is required before completion.

- PROBE: all stations must be sampled before commit.

- HOLDOUT: fitting freezes before hidden data appears.

- TRACE: derived channels visibly disclose upstream dependencies.

- TRIGGER: thresholds are committed before blind updates.

- Disabled commit buttons name the missing action.

## Metric-economy checks

- Exactly four player-facing bars exist, each bounded from 0% to 100%.

- Every mission timer uses its authored target and pauses only in the
  named non-player-controlled states.

- RP equals clamp(4, 12, 11 + time_modifier - incorrect_submissions).

- Every negative delta names the story event that caused it.

- Plant Integrity can lock after Mission 10; Oxygen can lock after
  Mission 13.

- Methane reaches 100% in Mission 12 without locking and falls when
  Batch C is decertified in Mission 14.

- A no-investment Power path triggers the Mission 13 crisis floor and
  reaches 0%.

- The canonical QA path ends at 100 / 100 / 100 / 100 with 25 RP banked.

- Stop 60 cannot set launch_authorized before the final metric
  settlement.

## Story checks

- Mission 1 opener is at most five sentences; every briefing is at most
  four.

- Missions 1-4 use exactly one meaningful location; 5-10 use two; 11-15
  use three.

- No distant Ice Cut use before Mission 5.

- Every location move is triggered by evidence or a required operation.

- Twist 1 pays off carbon, pressure/composition, residue, water, and
  calibration clues.

- Twist 2 pays off set point, radiator timing, inlet hot spot, holdout,
  and stress clues.

- Twist 3 pays off shared calibration, composition, separation, and
  threshold ideas.

- Mission 15 introduces no major chemistry and contains no post-launch
  quiz.

## Tone and accessibility checks

- A player can state the immediate problem in plain language at every
  stop.

- Narrative sentences use concrete nouns before technical labels.

- Units appear in visible data and spoken explanations.

- Color is never the only carrier of alarm/pass state; use labels and
  icons.

- The player can reopen the mission review and casebook at any time.

- Incorrect feedback says what mechanism failed and how to retry.

# 13. Suggested YAML assembly order for Claude Code

1.  Preserve the existing theme, area IDs, fixture IDs, and roster asset
    IDs where possible.

2.  Reduce the speaking cast to the six major roles in this book; retain
    extra existing NPCs as ambient/minor staff only.

3.  Replace or reorder the current mission list into 15 missions and 60
    lessons.

4.  Implement base-eight formats first and verify answer/rebuttal
    parity.

5.  Implement operated instrument blocks in mission order so
    dependencies unlock naturally.

6.  Add takesAsRead, evidence flags, dialogue conditions, and
    environmental state changes.

7.  Import with node tools/import-book.mjs books/redsand.yml redsand
    --verify.

8.  Run trap, lesson, and drive suites used by the repository; fix
    schema failures rather than weakening authored intent.

9.  Play the complete campaign once wrong-first and once right-first.

10. Confirm the launch epilogue begins immediately after Stop 60 and no
    question UI remains.

## Recommended content object shape

Use the repository's exact schema; this is a semantic checklist, not a replacement schema:

```yaml
- group: EQUIL
  task: player-facing action
  title: short dramatic title
  at: exact-declared-fixture-id
  area: one-of-the-six-authored-areas-of-study
  call: exact player-facing plan-card call
  reason: exact player-facing reason this task is needed now
  concept: narrow AP concept label
  keystone: broader recurring concept
  learningRole: INTRODUCE | PRACTICE | RETRIEVE | COMBINE | TRANSFER
  takesAsRead: [earlier concept labels]
  scene: exactly two short sentences, 30-45 words total
  storyScienceConnection: one clear sentence
  format: CANONICAL_FORMAT
  question: exact player prompt
  # complete canonical format-specific interaction block here
  answerText: exact result shown after grading
  why: 70-90 words explaining the mechanism
  wrongPathFeedback: actionable correction and retry
```

Do not author question-card `guide`, `background`, or `takeaway` fields. They were removed from the current card and importer contracts.

# 14. Final handoff checklist

- [ ] all 60 stops carry one of the six authored `Area:` values

- [ ] every stop placement names exactly one fixture id declared in Section 3

- [ ] every stop carries `Call - exact player copy`; person stops name exactly one canonical character

- [ ] every beat begins with an arrival, stop-close, or mission-end trigger and carries world state, HUD text, dialogue, unlocks, and waypoint when it names a destination

- [ ] no `Answer text` string repeats its `Correct result`; every CHOICE has one numbered rebuttal for each wrong option

- [ ] 15 missions and 60 scheduled stops

- [ ] one typed challenge per lesson

- [ ] 1/2/3 location escalation preserved

- [ ] six major characters retain distinct wants and blind spots

- [ ] all three twists have multiple earlier clues

- [ ] every mission has an outcome scene and quick review

- [ ] later encounters retrieve and combine rather than merely repeat

- [ ] final recommendation checks amount, quality, pressure, thermal
  margin, power, and independent verification

- [ ] all numerical values, thresholds, and mappings pass importer and
  play tests

- [ ] post-Stop-60 metric settlement reaches 100 / 100 / 100 / 100
  before launch

- [ ] post-Stop-60 launch sequence contains no educational gate

**Canonical ending line:** "You did not fill a tank. You taught this
station what full means."


## Revision 10.5 build gates

- Confirm the world plan identifies exactly six areas of study: Plant Control, Reactor Hall, Catalyst Bay, Cold End, Water Plant, and Electrolysis Hall.
- Confirm every fixture used by any `Format/placement` appears in the fixture declaration table with place, id, kind, and player-facing caption; new fixtures are valid and must be built rather than silently repointed.
- Confirm all 60 Metadata lines carry exactly one `Area:` value and all 60 stops carry `Call - exact player copy:`.
- Confirm each person stop names one canonical character and one declared fixture; no stop is owned by "the crew" or another group.
- Confirm all beat headings start with `On arrival at`, `After Stop` / `After Stops`, or `At mission end`; no `Travel trigger`, `Epilogue`, `Before and after`, or other non-engine trigger remains.
- Confirm every beat separately authors World state, Panel/HUD text, Dialogue bubbles, Unlocks, and Waypoint whenever a new destination is named.
- Confirm `Answer text` and `Correct result` differ on every stop, and every CHOICE carries numbered rebuttals for all three wrong options.

## Revision 10.1 build gates

- Import all 60 stops with zero missing interaction-data errors. Never replace a live-panel format with CHOICE merely to make import pass.
- Confirm every PROBE station carries an observed `reading`, an `expected` comparison, and a `load` interpretation; PROBE also names `target`, `minReadings`, and the commit action.
- Confirm every CHOICE authors four distinct choices as a real list, never as slash-delimited prose; each of the three wrong options has its own rebuttal.
- Confirm all 37 non-plain stops carry complete named interaction blocks. This includes Stop 4, which was already buildable, plus the 36 interactions that were blocking completion after Missions 1-2. Confirm all 60 stops carry answer text.
- Confirm each briefing body is four sentences and 30-70 words, with sentence four beginning “By the end of the mission”.
- Confirm every mission plan card includes a `Worth knowing first` block in this order: compact one-line glossary entries, primer concepts, then equations first needed that day. Each equation must include its job, every symbol, and a campaign-specific reason; do not add `Also called` or `Concept` lines.
- Confirm each question setup is exactly two short sentences totaling 30-45 words and each stop has a separate visible reason.
- Confirm each system-owned outcome begins “Mission decision:” and contains no named character; place character reactions in the preceding dialogue beat.
- Confirm the first mention of every major character in each mission includes the canonical role from the character bible.
- Confirm every player-facing technical term resolves through the glossary without depending on an undefined word.
- Confirm each keystone recurs in at least three separated missions, includes a delayed RETRIEVE after an intervening mission, and contributes to a later COMBINE or TRANSFER task.
- Recalculate every numerical truth, including Stop 6 = 2405 kg CH4, Stop 7 = 130 kmol CH4, and Stop 30 = 0.300 M^-2 s^-1, before setting tolerance bands.
- Confirm Stop 8 describes the restart reserve as a player-chosen constraint and names limiting-reactant reasoning in the operated prompt.
- Play once wrong-first and once right-first. The last graded interaction is Stop 60; authorization and ascent are story payoff with no later quiz.


## Build reachability corrections

## Build reachability correction

- `PHASE` roster owner: Mei-Ling Cho.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.

# Decision-card evidence contract

Every decision card must expose the exact evidence and public rule that distinguish its accepted answers from plausible alternatives. Render the local Data/readings/options, Decision evidence, public constraints and option effects before selection; keep them available while the player chooses. Use plain-language descriptions, not internal axis names. Show one speaker header from the stop’s placement and Call, and one coherent setup and prompt. Never substitute a discovery-stage explanation into a later allocation, release or certification task.

Resource tasks distinguish a budget from the goal. Display the required outcomes, each option’s contribution, costs, reserve rules and any priority or tie-breaker. Accept every plan satisfying the published rule. A recommended split is not an exclusive key unless the visible constraints uniquely determine it. Policies are identified as policies; the player must not derive an institutional preference from a scientific formula.

For staged tests, show hypotheses, model inputs and acceptance rules before commitment, but keep held-out results hidden until the specified test or reveal. No grade may depend on guessing a future result. A signed claim requires a readable source excerpt or an explicit inspection, not a hidden backed flag. Copied records retain their shared-source identity.

No importer fallback may borrow another stop’s data, speaker, threshold or generic mission text. Missing required local evidence is an import error. Before release, inspect the rendered card, prove the accepted response from visible information alone, try a plausible wrong answer, and test a different valid answer where the rule admits one. This document revision is source work; rendered-game verification still requires the actual implementation.
