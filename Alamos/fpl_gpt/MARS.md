**FIRST PERSON LEARNING**

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

You are the fuel plant lead, which means you must make clean fuel for the crew to leave Mars. At Arcadia Rise, you will use chemistry to make the call. Fifteen work shifts remain before launch. The plant turns air and ice into fuel. If it cannot finish safely, the crew misses its ride home.

**Delivery:** Show all four opening sentences together on one
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

### Commander Laila Abiola - mission authority

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

### Ingrid Sundqvist - production and catalyst lead

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

### Dr. Tomás Herrera - reactor and safety engineer

**First entrance:** Hydrogen Store, quietly asking for the raw sensor
timestamps while others argue about a leak.

**Wants:** Keep the Sabatier loop inside a tested thermal envelope.

**Blind spot:** Withholds incomplete safety evidence because he fears
command will overreact; that secrecy makes him look guilty.

**Gameplay use:** Equilibrium, calorimetry, mechanisms, controlled
experiments, and the human mystery.

**Arc:** Apparent saboteur in Missions 7-9; vindicated by the player's
holdout and stress tests in Mission 10; openly collaborates thereafter.

### Mei-Ling Cho - water and cryogenics engineer

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

### Rosalind Achebe - PHASE analytical and electrochemistry lead

**First entrance:** Water Plant, carrying a sealed standard instead of
trusting the wall meter.

**Wants:** Make every important number traceable to a physical standard.

**Blind spot:** Can slow decisions by asking for perfect evidence when
sufficient evidence would do.

**Gameplay use:** Molarity, Beer-Lambert law, acid/base tests, redox,
Faraday's law, assays, thresholds.

**Arc:** Her insistence on an independent sample causes Twist 3 and
saves the launch from a false-ready state.

### Yusuf Demir - power and life-support officer

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

### Minor voices

Use no more than one minor voice in a scene: a rover operator at the Ice
Cut, a maintenance technician in Catalyst Bay, a pad controller, and a
habitat medic. They provide observations or consequences, not new
subplots. Never introduce a named person only to ask one school
question.

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

**Question card story setup - exact player copy:** The tank report lists a methane shortfall of 1.60 × 10^3 kg. Use 1000 g/kg, methane molar mass 16.04 g/mol, and Avogadro's constant 6.022 × 10^23 molecules/mol to compare mass with particle count.

**Question card story-science connection - exact player copy:** The molecule total puts the methane inventory on the same counting basis as the production record.

**Question card prompt - exact player copy:** Estimate the number of
methane molecules represented by the shortfall.

**Authored tiles/data:** 1.60 x 10^3 kg; 1000 g/kg; 16.04 g/mol CH4;
6.022 x 10^23 molecules/mol.

**Formula:** (1.60 x 10^3 kg)(1000 g/kg)/(16.04 g/mol)(6.022 x 10^23
molecules/mol).

**Correct result:** 6.01 x 10^28 CH4 molecules; target 6.0 x 10^28,
tolerance ±6%.

**Answer text:** The shortfall represents about 6.01 x 10^28 methane molecules.

**Why:** Kilograms must become grams before dividing by grams per mole.
The result is about 9.98 x 10^4 mol, and each mole represents Avogadro's
number of molecules. Multiplying mass directly by Avogadro's number
skips molar mass and gives meaningless units.

**Wrong-path feedback:** If near 6 x 10^25, the kilogram-to-gram factor
was missed. If near 9.98 x 10^4, the player stopped at moles. If the
player multiplies by 16.04, remind them that molar mass divides grams
into mole-sized groups.

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

**Secondary briefing card - exact player copy:** You completed The Shortfall. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Electric charge:** a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- **Electron:** a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- **Chemical bond:** a strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- **Chemical reaction:** rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- **Molecule:** two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- **Molar mass:** the mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Shortfall, before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Electric charge?

**Options - exact player copy:**

- A. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- B. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- D. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Electric charge; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electron, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C: This describes Chemical bond, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Chemical reaction, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Shortfall: before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Electron?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Electron; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electric charge, not Electron. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Chemical bond, not Electron. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D: This describes Chemical reaction, not Electron. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Shortfall using new evidence: before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Chemical bond?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- C. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Chemical bond; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electric charge, not Chemical bond. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Electron, not Chemical bond. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Chemical reaction, not Chemical bond. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. a strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Shortfall: before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Chemical reaction?

**Options - exact player copy:**

- A. Rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- B. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Chemical reaction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.
- B: This describes Electric charge, not Chemical reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Electron, not Chemical reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Chemical bond, not Chemical reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Shortfall decision, the team knows this: before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Molecule?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. Two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- C. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Molecule; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electric charge, not Molecule. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.
- C: This describes Electron, not Molecule. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Chemical bond, not Molecule. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Shortfall to this follow-up: before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Molar mass?

**Options - exact player copy:**

- A. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- B. A particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.
- C. The mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.
- D. A strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Molar mass; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electric charge, not Molar mass. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Electron, not Molar mass. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.
- D: This describes Chemical bond, not Molar mass. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** The intake captured 6.60 × 10^6 g of carbon dioxide. Its molar mass is 44.01 g/mol; the reaction produces one mole of methane per mole of carbon dioxide, and methane has molar mass 16.04 g/mol.

**Question card story-science connection - exact player copy:** The feed-based ceiling determines whether additional compressor power could increase this shift's useful production.

**Question card prompt - exact player copy:** Estimate the theoretical
methane from the captured CO2.

**Formula/data:** (6.60 x 10^6 g CO2)/(44.01 g/mol) x (1 mol CH4/1 mol
CO2) x (16.04 g/mol CH4).

**Correct result:** 2405 kg CH4 (2.41 x 10^3 kg to three significant
figures); tolerance +/-3%.

**Answer text:** The captured CO2 could make 2405 kg CH4.

**Why:** (6.60 x 10^6 g / 44.01 g mol^-1)(16.04 g mol^-1) = 2.405 x 10^6
g = 2405 kg CH4. Rounded to three significant figures this is 2.41 x
10^3 kg. CO2 is sufficient for the 2000 kg requirement.

**Wrong-path feedback:** 6600 kg treats a 1:1 mole ratio as a 1:1 mass
ratio. About 150 is kilomoles, not kilograms of methane.

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

**Question card story setup - exact player copy:** Hydrogen runs out first, so divide the limited release among production, diagnosis, and restart reserve before redirecting the investigation.

**Question card story-science connection - exact player copy:** The allocation determines whether the crew can investigate the supply problem without disabling the reactor or exhausting reserve.

**Question card prompt - exact player copy:** With hydrogen identified as the limiting reactant, allocate the 80 kmol across methane production, tracer testing, restart reserve, and purge protection while satisfying both required checks.

**Complete format-specific interaction block:**

```yaml
allocate:
  pool: {label: "Hydrogen release", value: 80, unit: "kmol H2"}
  items:
    - {id: production, label: "Interim methane production", cost_per_unit: 1, min: 0, max: 56, step: 4, unit: "kmol H2"}
    - {id: tracer, label: "Diagnostic tracer pulse", cost_per_unit: 1, min: 0, max: 16, step: 4, unit: "kmol H2"}
    - {id: restart, label: "Reactor restart reserve", cost_per_unit: 1, min: 0, max: 24, step: 4, unit: "kmol H2"}
    - {id: purge, label: "Purge-line protection", cost_per_unit: 1, min: 0, max: 8, step: 4, unit: "kmol H2"}
  questions:
    - {id: locate_loss, label: "Where does hydrogen stop being usable?", required: true, needs: {tracer: 8}}
    - {id: restart_safe, label: "Can the reactor restart safely?", required: true, needs: {restart: 16}}
    - {id: make_fuel, label: "Can this shift still make some methane?", required: false, needs: {production: 40}}
    - {id: protect_line, label: "Can the diagnostic line be purged safely?", required: false, needs: {purge: 4}}
  correct: {production: 56, tracer: 8, restart: 16, purge: 0}
  pass_rule: "tracer >= 8 and restart >= 16 and total <= 80"
```

**Pool/items:** 80 kmol H2. Production pass: selectable 0-60 kmol.
Tracer/line-volume test: minimum 8 kmol. Restart reserve: player-chosen minimum 16 kmol.

**Correct result:** Any allocation with tracer ≥8, reserve ≥16, total
≤80; recommended 56 production / 8 tracer / 16 reserve.

**Answer text:** Choose at least 8 kmol for the tracer and 16 kmol for restart; 56/8/16 is the recommended split.

**Why:** No allocation creates hydrogen. The scientific choice is
whether a small diagnostic spend is worth the production it displaces.
Eight kilomoles gives the meter a resolvable pulse; sixteen preserves a
restart. The remaining 56 kmol supports only 14 kmol CH4, a visible cost
that makes the evidence meaningful.

**Wrong-path feedback:** Underfunded tracer yields no interpretable
test. Underfunded reserve violates the safe-restart constraint.
Over-allocation must be blocked with a message naming the missing
amount.

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

**Secondary briefing card - exact player copy:** You completed The Feedstock Problem. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Sabatier reaction:** combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- **Excess reactant:** a starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- **Theoretical yield:** the greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Feedstock Problem, to test whether the air intake causes the shortage, first arrange the Sabatier conversion from captured carbon-dioxide mass to possible methane mass. Which calculation or chemical interpretation correctly applies Sabatier reaction?

**Options - exact player copy:**

- A. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- B. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- C. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- D. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Sabatier reaction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Excess reactant, not Sabatier reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- C: This describes Theoretical yield, not Sabatier reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Reactant, not Sabatier reaction. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Feedstock Problem: because the carbon-dioxide supply could meet the target, compare carbon dioxide and hydrogen to find which ingredient stops methane production first. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Excess reactant?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- B. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
- C. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Excess reactant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sabatier reaction, not Excess reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Theoretical yield, not Excess reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D: This describes Reactant, not Excess reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Feedstock Problem using new evidence: use that conversion to calculate the most methane the captured carbon dioxide could make before Sundqvist increases compressor power. Which calculation or chemical interpretation correctly applies Theoretical yield?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- B. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- C. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Theoretical yield; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sabatier reaction, not Theoretical yield. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Excess reactant, not Theoretical yield. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Reactant, not Theoretical yield. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Feedstock Problem: because the carbon-dioxide supply could meet the target, compare carbon dioxide and hydrogen to find which ingredient stops methane production first. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Reactant?

**Options - exact player copy:**

- A. A starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- B. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- C. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Reactant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.
- B: This describes Sabatier reaction, not Reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Excess reactant, not Reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Theoretical yield, not Reactant. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Feedstock Problem decision, the team knows this: to test whether the air intake causes the shortage, first arrange the Sabatier conversion from captured carbon-dioxide mass to possible methane mass. Which calculation or chemical interpretation correctly applies Product?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- B. A substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.
- C. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Product; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sabatier reaction, not Product. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.
- C: This describes Excess reactant, not Product. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Theoretical yield, not Product. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Feedstock Problem to this follow-up: to test whether the air intake causes the shortage, first arrange the Sabatier conversion from captured carbon-dioxide mass to possible methane mass. Which calculation or chemical interpretation correctly applies Coefficient?

**Options - exact player copy:**

- A. Combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.
- B. A starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.
- C. The number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.
- D. The greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Coefficient; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sabatier reaction, not Coefficient. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Excess reactant, not Coefficient. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.
- D: This describes Theoretical yield, not Coefficient. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** The sealed branch has pressure P = 24.6 atm, volume V = 400 L, and temperature T = 300 K. The ideal gas relationship is n = PV/(RT), where n is total gas amount and R = 0.082 L atm mol^-1 K^-1.

**Question card story-science connection - exact player copy:** The gas quantity sets the inventory against which the independent composition measurement will be interpreted.

**Question card prompt - exact player copy:** Submit the total amount of gas in moles.

**Formula:** n = PV/RT = (24.6 atm)(400 L)/\[(0.082)(300 K)\].

**Correct result:** 400 mol total gas; target 400, tolerance ±2%.

**Answer text:** The branch contains 400 mol of total gas.

**Why:** The ideal gas law counts total particles through their
pressure-volume-temperature behavior. It does not distinguish H2 from
N2. The normal-looking value can coexist with the wrong composition.

**Wrong-path feedback:** Celsius cannot replace kelvin. Multiplying by R
instead of dividing breaks units. A result near 20 or 500 is a copied
reading, not a mole calculation.

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

**Secondary briefing card - exact player copy:** You completed Pressure Does Not Lie. Or Does It?. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Absolute temperature:** measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- **Mixture:** contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- **Composition:** states which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- **Mole fraction:** the part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Pressure Does Not Lie. Or Does It?, before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Absolute temperature?

**Options - exact player copy:**

- A. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- B. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- D. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Absolute temperature; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Mixture, not Absolute temperature. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C: This describes Composition, not Absolute temperature. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Mole fraction, not Absolute temperature. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to Pressure Does Not Lie. Or Does It?: warm the suspect branch and compare prediction with measurement to decide whether a simple leak or a contaminated mixture explains the alarm. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which calculation or chemical interpretation correctly applies Mixture?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Mixture; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute temperature, not Mixture. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Composition, not Mixture. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D: This describes Mole fraction, not Mixture. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Pressure Does Not Lie. Or Does It? using new evidence: before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity. The next action depends on selecting the conclusion that fits all of those facts. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Gas",
  "yLabel": "Mole fraction",
  "caption": "Composition of a suspect Mars gas sample.",
  "bars": [
    {
      "name": "Gas 1",
      "value": 0.72
    },
    {
      "name": "Gas 2",
      "value": 0.18
    },
    {
      "name": "Gas 3",
      "value": 0.1
    }
  ]
}
```


**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- C. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Absolute temperature, not Composition. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Mixture, not Composition. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Mole fraction, not Composition. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. states which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Pressure Does Not Lie. Or Does It?: before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Mole fraction?

**Options - exact player copy:**

- A. The part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.
- B. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Mole fraction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. the part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.
- B: This describes Absolute temperature, not Mole fraction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Mixture, not Mole fraction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Composition, not Mole fraction. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Pressure Does Not Lie. Or Does It? decision, the team knows this: before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Pressure?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. Force spread over an area, caused here by gas particles striking the tank walls. Total pressure can stay high even when the wrong gas is inside.
- C. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Pressure; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute temperature, not Pressure. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. force spread over an area, caused here by gas particles striking the tank walls. Total pressure can stay high even when the wrong gas is inside.
- C: This describes Mixture, not Pressure. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Composition, not Pressure. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from Pressure Does Not Lie. Or Does It? to this follow-up: now use pressure, volume, and temperature to calculate the total gas amount, knowing that a correct total still cannot prove the gas is hydrogen. Which calculation or chemical interpretation correctly applies Volume?

**Options - exact player copy:**

- A. Measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.
- B. Contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.
- C. The amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.
- D. States which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Volume; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute temperature, not Volume. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Mixture, not Volume. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.
- D: This describes Composition, not Volume. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Secondary briefing card - exact player copy:** You completed What Can Travel Where?. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

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

**Prompt - exact player copy:** In a follow-up to What Can Travel Where?, to test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Lewis structure?

**Options - exact player copy:**

- A. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- B. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- C. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- D. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Lewis structure; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Molecular geometry, not Lewis structure. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- C: This describes Valence-shell electron-pair repulsion (VSEPR) model, not Lewis structure. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes London dispersion force, not Lewis structure. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to What Can Travel Where?: to test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Molecular geometry?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
- C. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Molecular geometry; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Lewis structure, not Molecular geometry. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Valence-shell electron-pair repulsion (VSEPR) model, not Molecular geometry. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D: This describes London dispersion force, not Molecular geometry. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks What Can Travel Where? using new evidence: apply that chain to methane, carbon dioxide, water, and ammonia to identify which substances behave alike and could travel together. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which option correctly carries out the required Valence-shell electron-pair repulsion (VSEPR) model reasoning?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- C. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Valence-shell electron-pair repulsion (VSEPR) model; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Lewis structure, not Valence-shell electron-pair repulsion (VSEPR) model. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Molecular geometry, not Valence-shell electron-pair repulsion (VSEPR) model. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes London dispersion force, not Valence-shell electron-pair repulsion (VSEPR) model. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.
### Review question 4

**Prompt - exact player copy:** An unseen case extends What Can Travel Where?: to test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies London dispersion force?

**Options - exact player copy:**

- A. An attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- B. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- C. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for London dispersion force; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. an attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.
- B: This describes Lewis structure, not London dispersion force. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Molecular geometry, not London dispersion force. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Valence-shell electron-pair repulsion (VSEPR) model, not London dispersion force. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another What Can Travel Where? decision, the team knows this: to test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Hydrogen bonding?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. A strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.
- C. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Hydrogen bonding; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Lewis structure, not Hydrogen bonding. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.
- C: This describes Molecular geometry, not Hydrogen bonding. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Valence-shell electron-pair repulsion (VSEPR) model, not Hydrogen bonding. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from What Can Travel Where? to this follow-up: to test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Boiling?

**Options - exact player copy:**

- A. A drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.
- B. The three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.
- C. A change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.
- D. Predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Boiling; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Lewis structure, not Boiling. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Molecular geometry, not Boiling. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.
- D: This describes Valence-shell electron-pair repulsion (VSEPR) model, not Boiling. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** The recycle-water assay represents 0.365 g of hydrogen chloride in 0.2500 L of solution. Its molar mass is 36.46 g/mol, and this training model treats the acid as fully dissociated.

**Question card story-science connection - exact player copy:** Molarity supplies a comparable process measurement for checking the water alarm with an independent instrument.

**Question card prompt - exact player copy:** Estimate the HCl molarity
if the model treats it as fully dissociated.

**Formula:** (0.365 g / 36.46 g mol^-1) / 0.2500 L.

**Correct result:** 0.0400 M; tolerance ±3%.

**Answer text:** The sample concentration is 0.0400 M HCl.

**Why:** Convert grams to moles, milliliters to liters, then divide
moles by solution volume. The calculation describes the modeled acid
concentration; later pH reasoning can use strong-acid dissociation.

**Wrong-path feedback:** 0.000040 usually keeps milliliters as liters;
1.46 divides mass by volume without molar mass.

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

**Secondary briefing card - exact player copy:** You completed The Water Account. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Absorbance:** measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- **Beer-Lambert relationship:** says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- **Wavelength:** the distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- **Calibration standard:** a sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- **Error:** the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- **Instrument saturation:** occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- **Independent evidence:** reaches a conclusion without relying on the same upstream measurement or standard. Two displays are not independent if one is calculated from the other.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Water Account, before treating the alarm as water loss, compare sample volume and concentration to determine which container actually holds more chloride. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Absorbance?

**Options - exact player copy:**

- A. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- B. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- D. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Absorbance; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Beer-Lambert relationship, not Absorbance. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C: This describes Wavelength, not Absorbance. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Calibration standard, not Absorbance. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Water Account: choose the wavelength where the colored complex responds most strongly so an independent sample can confirm or reject the alarm. Which calculation or chemical interpretation correctly applies Beer-Lambert relationship?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Beer-Lambert relationship; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absorbance, not Beer-Lambert relationship. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Wavelength, not Beer-Lambert relationship. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- D: This describes Calibration standard, not Beer-Lambert relationship. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Water Account using new evidence: choose the wavelength where the colored complex responds most strongly so an independent sample can confirm or reject the alarm. Which calculation or chemical interpretation correctly applies Wavelength?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- C. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Wavelength; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absorbance, not Wavelength. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Beer-Lambert relationship, not Wavelength. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Calibration standard, not Wavelength. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Water Account: the field sample is normal while three displays still agree, so trace their calibrations to decide whether the agreement comes from independent evidence or shared error. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which calculation or chemical interpretation correctly applies Calibration standard?

**Options - exact player copy:**

- A. A sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- B. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Calibration standard; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.
- B: This describes Absorbance, not Calibration standard. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Beer-Lambert relationship, not Calibration standard. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Wavelength, not Calibration standard. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Water Account decision, the team knows this: the field sample is normal while three displays still agree, so trace their calibrations to decide whether the agreement comes from independent evidence or shared error. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which statistical conclusion or procedure correctly uses Error?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Error; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absorbance, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C: This describes Beer-Lambert relationship, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Wavelength, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Water Account to this follow-up: before treating the alarm as water loss, compare sample volume and concentration to determine which container actually holds more chloride. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Instrument saturation?

**Options - exact player copy:**

- A. Measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.
- B. Says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.
- C. Occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- D. The distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Instrument saturation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absorbance, not Instrument saturation. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Beer-Lambert relationship, not Instrument saturation. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.
- D: This describes Wavelength, not Instrument saturation. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** Take that prediction to the Tank Farm and close the carbon, hydrogen, and oxygen ledgers to test whether the methane was never produced.

**Question card story-science connection - exact player copy:** The three element balances distinguish lost matter from matter retained in another chemical form or an insufficient feed.

**Question card prompt - exact player copy:** Close separate C, H, and O
ledgers and state what the amounts imply.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Normalized reactor interval", reactions: {co2_mol: 100, h2_mol: 320}}
  streams:
    - {id: input_co2, label: "CO2 in", atoms: {C: 100, O: 200}, count: true}
    - {id: input_h2, label: "H2 in", atoms: {H: 640}, count: true}
    - {id: output_ch4, label: "CH4 out", molecules_mol: 80, atoms: {C: 80, H: 320}, count: true}
    - {id: output_h2o, label: "H2O out", molecules_mol: 160, atoms: {H: 320, O: 160}, count: true}
    - {id: output_co2, label: "CO2 unreacted", molecules_mol: 20, atoms: {C: 20, O: 40}, count: true}
    - {id: purge_n2, label: "N2 dilution gas", molecules_mol: 20, atoms: {N: 40}, count: false}
  closure: {C: [100,100], H: [640,640], O: [200,200], tolerance: 0}
  correct_action: "Count atoms in every input and output; identify H2 as limiting."
```

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 23 - Close C, H, and O at the Tank Farm"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Close separate C, H, and O ledgers and state what the amounts imply."
  payload: "```yaml balance: target: {label: \"Normalized reactor interval\", reactions: {co2_mol: 100, h2_mol: 320}} streams: - {id: input_co2, label: \"CO2 in\", atoms: {C: 100, O: 200}, count: true} - {id: input_h2, label: \"H2 in\", atoms: {H: 640}, count: true} - {id: output_ch4, label: \"CH4 out\", molecules_mol: 80, atoms: {C: 80, H: 320}, count: true} - {id: output_h2o, label: \"H2O out\", molecules_mol: 160, atoms: {H: 320, O: 160}, count: true} - {id: output_co2, label: \"CO2 unreacted\", molecules_mol: 20, atoms: {C: 20, O: 40}, count: true} - {id: purge_n2, label: \"N2 dilution gas\", molecules_mol: 20, atoms: {N: 40}, count: false} closure: {C: [100,100], H: [640,640], O: [200,200], tolerance: 0} correct_action: \"Count atoms in every input and output; identify H2 as limiting.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "maximum methane from the hydrogen supply"
  unit: "mol CH4"
  inputs:
    - {label: "Hydrogen feed", value: 320, unit: "mol H2"}
    - {label: "Hydrogen coefficient", value: 4, unit: "mol H2 per mol CH4"}
    - {label: "Carbon-dioxide feed", value: 100, unit: "mol CO2", contextOnly: true}
  operation: "divide hydrogen feed by the 4:1 stoichiometric coefficient"
  formula: "n_CH4=320/4"
  start: 0
  correctResult: 80
  tolerance: 1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Inputs: C 100, H 640, O 200 mol atoms. Outputs: C
80+20=100; H 80x4 +160x2=640; O 20x2 +160=200. H2 is limiting because
only 320 mol is supplied, supporting 80 mol CH4.

**Answer text:** All C, H, and O atoms close; 320 mol H2 limits production to 80 mol CH4.

**Why:** The ledger explains low methane without lost matter. Carbon not
converted remains CO2. Hydrogen appears in methane and water exactly as
the equation requires.

**Wrong-path feedback:** Count atoms, not molecules; water contains two
H and one O; remaining CO2 belongs in output inventory.

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

**Secondary briefing card - exact player copy:** You completed The Leak That Was Not. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Sensitivity test:** changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- **Corroboration:** support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Leak That Was Not, vary the intake calibration through its allowed uncertainty to see whether the hydrogen-delivery diagnosis survives measurement error. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which statistical conclusion or procedure correctly uses Sensitivity test?

**Options - exact player copy:**

- A. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- B. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- C. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- D. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Sensitivity test; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Corroboration, not Sensitivity test. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- C: This describes Diagnosis, not Sensitivity test. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Uncertainty, not Sensitivity test. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Leak That Was Not: place every clue on one board and choose the cause that explains sufficient carbon dioxide, diluted hydrogen, false residue, and shared water error together. Which calculation or chemical interpretation correctly applies Corroboration?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
- C. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Corroboration; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sensitivity test, not Corroboration. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Diagnosis, not Corroboration. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D: This describes Uncertainty, not Corroboration. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Leak That Was Not using new evidence: place every clue on one board and choose the cause that explains sufficient carbon dioxide, diluted hydrogen, false residue, and shared water error together. Which calculation or chemical interpretation correctly applies Diagnosis?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- C. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Diagnosis; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sensitivity test, not Diagnosis. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Corroboration, not Diagnosis. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Uncertainty, not Diagnosis. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Leak That Was Not: vary the intake calibration through its allowed uncertainty to see whether the hydrogen-delivery diagnosis survives measurement error. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which calculation or chemical interpretation correctly applies Uncertainty?

**Options - exact player copy:**

- A. The range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- B. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- C. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Uncertainty; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. the range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.
- B: This describes Sensitivity test, not Uncertainty. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Corroboration, not Uncertainty. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Diagnosis, not Uncertainty. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Leak That Was Not decision, the team knows this: place every clue on one board and choose the cause that explains sufficient carbon dioxide, diluted hydrogen, false residue, and shared water error together. Which statistical conclusion or procedure correctly uses Error?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. The difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Error; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sensitivity test, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.
- C: This describes Corroboration, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Diagnosis, not Error. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Leak That Was Not to this follow-up: take that prediction to the Tank Farm and close the carbon, hydrogen, and oxygen ledgers to test whether the methane was never produced. Which calculation or chemical interpretation correctly applies Atom balance?

**Options - exact player copy:**

- A. Changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.
- B. Support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.
- C. Counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.
- D. The proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Atom balance; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Sensitivity test, not Atom balance. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Corroboration, not Atom balance. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.
- D: This describes Diagnosis, not Atom balance. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** A 1000 kg coolant charge warmed by 3.0 K; its specific heat capacity is 3.8 kJ/(kg K). In q = mcΔT, q is transferred heat, m is coolant mass, c is specific heat capacity, and ΔT is its temperature rise.

**Question card story-science connection - exact player copy:** The coolant energy transfer supplies a measured removal term for the reactor's energy balance.

**Question card prompt - exact player copy:** Submit the heat removed by the coolant in kilojoules.

**Prompt/formula:** q = mc Delta T.

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 11400.0
  tolerance: 570.0
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 22800.0}, {label: "displayed divisor", value: 2}]
  formula: "q=displayed numerator/displayed divisor"
  correctResultText: "11,400 kJ or 11.4 MJ; tolerance ±2%."
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "heat gained by the coolant"
  unit: "kJ"
  inputs:
    - {label: "Coolant mass", value: 1000, unit: "kg"}
    - {label: "Specific heat capacity", value: 3.8, unit: "kJ/(kg K)"}
    - {label: "Temperature change", value: 3.0, unit: "K"}
  operation: "multiply mass by specific heat capacity by temperature change"
  formula: "q=(1000)(3.8)(3.0)"
  correctResult: 11400
  tolerance: 228
  answerText: "The coolant gained 11,400 kJ, or 11.4 MJ, so the reactor system lost approximately that amount of heat."
```

**Correct result:** 11,400 kJ or 11.4 MJ; tolerance ±2%.

**Answer text:** The coolant removed 11.4 MJ of heat.

**Why:** Multiply mass, energy per kilogram per kelvin, and temperature
change. The positive number describes heat gained by coolant; the
reactor system loses approximately that heat. Always name the system
when assigning signs.

**Wrong-path feedback:** Using final temperature instead of temperature
change overstates the load. A value of 11,400 J misses the kJ unit.

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

**Secondary briefing card - exact player copy:** You completed Heat. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Endothermic:** process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- **Enthalpy change:** records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- **Energy ledger:** counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Heat, to decide whether lowering the temperature was reckless or protective, first establish whether the Sabatier reaction releases heat as methane production rises. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Endothermic?

**Options - exact player copy:**

- A. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- B. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.
- D. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Endothermic; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Enthalpy change, not Endothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C: This describes Energy ledger, not Endothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Heat, not Endothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to Heat: use the corrected timeline to close the radiator energy ledger and determine whether cooling loss preceded Herrera's temperature change. Close the ledger now so the next decision uses every real input and output exactly once. Which calculation or chemical interpretation correctly applies Enthalpy change?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Enthalpy change; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Endothermic, not Enthalpy change. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Energy ledger, not Enthalpy change. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D: This describes Heat, not Enthalpy change. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Heat using new evidence: use the corrected timeline to close the radiator energy ledger and determine whether cooling loss preceded Herrera's temperature change. Close the ledger now so the next decision uses every real input and output exactly once. Which calculation or chemical interpretation correctly applies Energy ledger?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- C. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Energy ledger; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Endothermic, not Energy ledger. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Enthalpy change, not Energy ledger. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Heat, not Energy ledger. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Heat: account for the delay caused by warming and melting so the thermal timeline does not mistake a late signal for the first failure. Which calculation or chemical interpretation correctly applies Heat?

**Options - exact player copy:**

- A. Energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- B. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Heat; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.
- B: This describes Endothermic, not Heat. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Enthalpy change, not Heat. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Energy ledger, not Heat. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Heat decision, the team knows this: to decide whether lowering the temperature was reckless or protective, first establish whether the Sabatier reaction releases heat as methane production rises. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Exothermic?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.
- C. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Exothermic; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Endothermic, not Exothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.
- C: This describes Enthalpy change, not Exothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Energy ledger, not Exothermic. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from Heat to this follow-up: account for the delay caused by warming and melting so the thermal timeline does not mistake a late signal for the first failure. Which calculation or chemical interpretation correctly applies Specific heat capacity?

**Options - exact player copy:**

- A. Process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.
- B. Records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.
- C. The heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.
- D. Counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Specific heat capacity; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Endothermic, not Specific heat capacity. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Enthalpy change, not Specific heat capacity. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.
- D: This describes Energy ledger, not Specific heat capacity. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** Trial 1 records rate = 1.20 × 10^-3 M/s, [CO2] = 0.10 M, and [H2] = 0.20 M. The established rate law is rate = k[CO2][H2]^2, where k is the rate constant.

**Question card story-science connection - exact player copy:** The rate constant makes the later temperature test comparable with the measured initial-rate trials.

**Question card prompt - exact player copy:** Use Trial 1 and rate =
k\[CO2\]\[H2\]^2 to find k.

**Formula:** k = 1.20e-3 / \[(0.10)(0.20)^2\].

**Correct result:** 0.300 M^-2 s^-1; tolerance +/-2%.

**Answer text:** The rate constant is 0.300 M^-2 s^-1.

**Why:** The concentration product is 0.0040 M^3, so k = (1.20e-3
M/s)/(0.0040 M^3) = 0.300 M^-2 s^-1. Substituting another trial should
reproduce the same k at the same temperature.

**Wrong-path feedback:** A unit of s^-1 belongs to a first-order law,
not this one.

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

**Secondary briefing card - exact player copy:** You completed The Override. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Controlled experiment:** changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- **Noise band:** the small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Override, to measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Controlled experiment?

**Options - exact player copy:**

- A. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- B. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- C. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- D. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Controlled experiment; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Noise band, not Controlled experiment. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- C: This describes Reaction rate, not Controlled experiment. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Rate law, not Controlled experiment. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Override: to measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Noise band?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
- C. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Noise band; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Controlled experiment, not Noise band. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Reaction rate, not Noise band. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D: This describes Rate law, not Noise band. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Override using new evidence: to measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Reaction rate?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- C. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Reaction rate; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Controlled experiment, not Reaction rate. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Noise band, not Reaction rate. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Rate law, not Reaction rate. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Override: to measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Rate law?

**Options - exact player copy:**

- A. Describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- B. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- C. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Rate law; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.
- B: This describes Controlled experiment, not Rate law. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Noise band, not Rate law. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Reaction rate, not Rate law. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Override decision, the team knows this: to measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Reaction order?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. The exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.
- C. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Reaction order; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Controlled experiment, not Reaction order. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.
- C: This describes Noise band, not Reaction order. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Reaction rate, not Reaction order. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Override to this follow-up: calculate the rate constant from one trial so the controlled temperature test has a quantitative baseline. Which calculation or chemical interpretation correctly applies Rate constant?

**Options - exact player copy:**

- A. Changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.
- B. The small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.
- C. The proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.
- D. Measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Rate constant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Controlled experiment, not Rate constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Noise band, not Rate constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.
- D: This describes Reaction rate, not Rate constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Secondary briefing card - exact player copy:** You completed The Catalyst Bed. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Activation energy:** the minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- **Reaction mechanism:** a sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- **Rate-determining step:** the slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- **Active site:** a location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- **Spatial profile:** shows how a reading changes from one location to another. It can reveal a local hot spot or inlet-first failure hidden by an average.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Catalyst Bed, sample the inlet, inlet shoulder, middle, and outlet to determine whether the loss is uniform or concentrated beside a hidden hot spot. Sample the locations in order now so the crew can identify where the system first departs from normal. Which calculation or chemical interpretation correctly applies Activation energy?

**Options - exact player copy:**

- A. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- B. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- D. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Activation energy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Reaction mechanism, not Activation energy. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C: This describes Rate-determining step, not Activation energy. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Active site, not Activation energy. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Catalyst Bed: build the surface mechanism to show how blocking nickel sites could slow the reaction where a contaminant first enters. Which calculation or chemical interpretation correctly applies Reaction mechanism?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
- C. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Reaction mechanism; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Activation energy, not Reaction mechanism. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Rate-determining step, not Reaction mechanism. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D: This describes Active site, not Reaction mechanism. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Catalyst Bed using new evidence: sample the inlet, inlet shoulder, middle, and outlet to determine whether the loss is uniform or concentrated beside a hidden hot spot. Sample the locations in order now so the crew can identify where the system first departs from normal. Which calculation or chemical interpretation correctly applies Rate-determining step?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- C. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Rate-determining step; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Activation energy, not Rate-determining step. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Reaction mechanism, not Rate-determining step. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Active site, not Rate-determining step. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Catalyst Bed: build the surface mechanism to show how blocking nickel sites could slow the reaction where a contaminant first enters. Which calculation or chemical interpretation correctly applies Active site?

**Options - exact player copy:**

- A. A location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- B. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- C. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Active site; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.
- B: This describes Activation energy, not Active site. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Reaction mechanism, not Active site. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Rate-determining step, not Active site. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Catalyst Bed decision, the team knows this: before replacing the bed, determine exactly what a fresh catalyst can change and what it cannot fix about equilibrium or heat. The next action depends on selecting the conclusion that fits all of those facts. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Distance along catalyst bed (m)",
  "yLabel": "Temperature (K)",
  "caption": "Temperature rises sharply near the catalyst-bed inlet.",
  "series": [
    {
      "name": "Measured profile",
      "points": [
        [
          0,
          520
        ],
        [
          1,
          535
        ],
        [
          2,
          590
        ],
        [
          3,
          625
        ],
        [
          4,
          600
        ],
        [
          5,
          570
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. Shows how a reading changes from one location to another. It can reveal a local hot spot or inlet-first failure hidden by an average.
- C. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Activation energy, not Spatial profile. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. shows how a reading changes from one location to another. It can reveal a local hot spot or inlet-first failure hidden by an average.
- C: This describes Reaction mechanism, not Spatial profile. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Rate-determining step, not Spatial profile. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Catalyst Bed to this follow-up: before replacing the bed, determine exactly what a fresh catalyst can change and what it cannot fix about equilibrium or heat. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Catalyst?

**Options - exact player copy:**

- A. The minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.
- B. A sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.
- C. Speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.
- D. The slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Catalyst; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Activation energy, not Catalyst. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Reaction mechanism, not Catalyst. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.
- D: This describes Rate-determining step, not Catalyst. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Secondary briefing card - exact player copy:** You completed The Saboteur. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Holdout data:** measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- **Systematic pattern:** an error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- **Causal order:** states which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Saboteur, freeze the accusation built from the visible runs, then test it on the hidden hot interval to see whether it predicts unseen evidence. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (h)",
  "yLabel": "Water level (m)",
  "caption": "A fitted model is compared with later holdout measurements.",
  "series": [
    {
      "name": "Model",
      "points": [
        [
          0,
          10
        ],
        [
          1,
          12
        ],
        [
          2,
          15
        ],
        [
          3,
          19
        ],
        [
          4,
          24
        ]
      ]
    },
    {
      "name": "Holdout",
      "points": [
        [
          3,
          20
        ],
        [
          4,
          27
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- B. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- C. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
- D. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Systematic pattern, not Holdout data. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- C: This describes Causal order, not Holdout data. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Model, not Holdout data. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Saboteur: freeze the accusation built from the visible runs, then test it on the hidden hot interval to see whether it predicts unseen evidence. Which calculation or chemical interpretation correctly applies Systematic pattern?

**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
- C. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Systematic pattern; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Holdout data, not Systematic pattern. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Causal order, not Systematic pattern. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. an error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D: This describes Model, not Systematic pattern. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Saboteur using new evidence: reconstruct the chain from radiator loss through override and production fall to determine whether Herrera created or interrupted the danger. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which calculation or chemical interpretation correctly applies Causal order?

**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- C. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Causal order; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Holdout data, not Causal order. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Systematic pattern, not Causal order. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Model, not Causal order. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. states which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Saboteur: freeze the accusation built from the visible runs, then test it on the hidden hot interval to see whether it predicts unseen evidence. Which calculation or chemical interpretation correctly applies Model?

**Options - exact player copy:**

- A. A simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.
- B. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- C. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Model; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.
- B: This describes Holdout data, not Model. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Systematic pattern, not Model. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Causal order, not Model. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Saboteur decision, the team knows this: freeze the accusation built from the visible runs, then test it on the hidden hot interval to see whether it predicts unseen evidence. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Ordered observation",
  "yLabel": "Residual",
  "caption": "Residuals reveal whether error is random or structured.",
  "series": [
    {
      "name": "Residual",
      "points": [
        [
          0,
          1.5
        ],
        [
          1,
          -1.2
        ],
        [
          2,
          1.0
        ],
        [
          3,
          -0.8
        ],
        [
          4,
          0.6
        ],
        [
          5,
          -0.4
        ],
        [
          6,
          0.2
        ]
      ]
    }
  ],
  "limit": {
    "at": 0,
    "label": "Zero residual"
  }
}
```


**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. The measured value minus the model's predicted value. A repeated pattern in residuals can reveal a missing cause even when average error is small.
- C. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Holdout data, not Residual. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the measured value minus the model's predicted value. A repeated pattern in residuals can reveal a missing cause even when average error is small.
- C: This describes Systematic pattern, not Residual. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Causal order, not Residual. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Saboteur to this follow-up: move the sensor bias across its allowed range to decide whether the old setting remains safe when the temperature reading is slightly wrong. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which calculation or chemical interpretation correctly applies Sensor bias?

**Options - exact player copy:**

- A. Measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.
- B. An error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.
- C. A measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.
- D. States which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Sensor bias; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Holdout data, not Sensor bias. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Systematic pattern, not Sensor bias. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.
- D: This describes Causal order, not Sensor bias. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** Use the measured changes in an ICE table to calculate the current equilibrium and the methane-yield ceiling at the safe temperature.

**Question card story-science connection - exact player copy:** The concentration table establishes the methane ceiling and remaining reactants for the proposed operating condition.

**Question card prompt - exact player copy:** Complete changes and
equilibrium concentrations, then calculate Kc for this training
condition.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "ICE table for 1.00 L vessel", reaction: "CO2 + 4H2 <=> CH4 + 2H2O"}
  streams:
    - {id: co2, label: "CO2", initial_M: 1.50, change_M: -0.50, equilibrium_M: 1.00}
    - {id: h2, label: "H2", initial_M: 3.00, change_M: -2.00, equilibrium_M: 1.00}
    - {id: ch4, label: "CH4", initial_M: 0.00, change_M: 0.50, equilibrium_M: 0.50}
    - {id: h2o, label: "H2O", initial_M: 0.00, change_M: 1.00, equilibrium_M: 1.00}
    - {id: catalyst, label: "Solid nickel catalyst", count: false, reason: "not part of the ICE concentration row or Kc expression"}
  closure: {Kc: 0.50, tolerance: 0.01}
  correct_action: "Use one extent x with coefficients -1, -4, +1, +2, then calculate Kc."
```

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 42 - Complete the ICE table"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Complete changes and equilibrium concentrations, then calculate Kc for this training condition."
  payload: "```yaml balance: target: {label: \"ICE table for 1.00 L vessel\", reaction: \"CO2 + 4H2 <=> CH4 + 2H2O\"} streams: - {id: co2, label: \"CO2\", initial_M: 1.50, change_M: -0.50, equilibrium_M: 1.00} - {id: h2, label: \"H2\", initial_M: 3.00, change_M: -2.00, equilibrium_M: 1.00} - {id: ch4, label: \"CH4\", initial_M: 0.00, change_M: 0.50, equilibrium_M: 0.50} - {id: h2o, label: \"H2O\", initial_M: 0.00, change_M: 1.00, equilibrium_M: 1.00} - {id: catalyst, label: \"Solid nickel catalyst\", count: false, reason: \"not part of the ICE concentration row or Kc expression\"} closure: {Kc: 0.50, tolerance: 0.01} correct_action: \"Use one extent x with coefficients -1, -4, +1, +2, then calculate Kc.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "equilibrium constant Kc"
  unit: "dimensionless"
  inputs:
    - {label: "Equilibrium CO2", value: 1.00, unit: "M"}
    - {label: "Equilibrium H2", value: 1.00, unit: "M"}
    - {label: "Equilibrium CH4", value: 0.50, unit: "M"}
    - {label: "Equilibrium H2O", value: 1.00, unit: "M"}
  operation: "[CH4][H2O]^2 / ([CO2][H2]^4)"
  formula: "Kc=(0.50)(1.00)^2/[(1.00)(1.00)^4]"
  start: 0
  correctResult: 0.50
  tolerance: 0.01
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Change -0.50 CO2, -2.00 H2, +0.50 CH4, +1.00 H2O;
equilibrium 1.00, 1.00, 0.50, 1.00 M.
Kc=(0.50)(1.00)^2/\[(1.00)(1.00)^4\] = 0.50.

**Answer text:** The equilibrium row is 1.00, 1.00, 0.50, and 1.00 M, giving Kc = 0.50.

**Why:** Every change is tied to one reaction extent x and multiplied by
coefficients. Hydrogen changes by -4x; water by +2x. The balanced row is
the guardrail against treating each concentration independently.

**Wrong-path feedback:** If H2 falls by only 0.50, point to coefficient four.
If water becomes only 0.50, point to coefficient two.

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

**Secondary briefing card - exact player copy:** You completed Fast Is Not the Same as More. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Dynamic equilibrium:** a state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- **Le Chatelier's principle:** predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- **Degeneracy:** occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Fast Is Not the Same as More, to replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Dynamic equilibrium?

**Options - exact player copy:**

- A. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- B. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.
- D. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Dynamic equilibrium; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Le Chatelier's principle, not Dynamic equilibrium. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C: This describes Degeneracy, not Dynamic equilibrium. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Equilibrium constant, not Dynamic equilibrium. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to Fast Is Not the Same as More: to replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Le Chatelier's principle?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Le Chatelier's principle; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dynamic equilibrium, not Le Chatelier's principle. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Degeneracy, not Le Chatelier's principle. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D: This describes Equilibrium constant, not Le Chatelier's principle. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Fast Is Not the Same as More using new evidence: to replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Degeneracy?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- C. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Degeneracy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dynamic equilibrium, not Degeneracy. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Le Chatelier's principle, not Degeneracy. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Equilibrium constant, not Degeneracy. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Fast Is Not the Same as More: to replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Equilibrium constant?

**Options - exact player copy:**

- A. Compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- B. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Equilibrium constant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.
- B: This describes Dynamic equilibrium, not Equilibrium constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Le Chatelier's principle, not Equilibrium constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Degeneracy, not Equilibrium constant. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Fast Is Not the Same as More decision, the team knows this: to replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Reaction quotient?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.
- C. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Reaction quotient; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dynamic equilibrium, not Reaction quotient. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.
- C: This describes Le Chatelier's principle, not Reaction quotient. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Degeneracy, not Reaction quotient. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from Fast Is Not the Same as More to this follow-up: use the measured changes in an ICE table to calculate the current equilibrium and the methane-yield ceiling at the safe temperature. Which calculation or chemical interpretation correctly applies Initial-change-equilibrium (ICE) table?

**Options - exact player copy:**

- A. A state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.
- B. Predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.
- C. Organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.
- D. Occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Initial-change-equilibrium (ICE) table; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dynamic equilibrium, not Initial-change-equilibrium (ICE) table. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Le Chatelier's principle, not Initial-change-equilibrium (ICE) table. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.
- D: This describes Degeneracy, not Initial-change-equilibrium (ICE) table. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Secondary briefing card - exact player copy:** You completed The Loop. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Coupled system:** contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- **Recycle loop:** returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- **Neutralization:** the reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- **Logarithm:** reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- **Inventory:** the amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Loop, trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which calculation or chemical interpretation correctly applies Coupled system?

**Options - exact player copy:**

- A. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- B. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- C. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- D. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Coupled system; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Recycle loop, not Coupled system. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- C: This describes Neutralization, not Coupled system. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Logarithm, not Coupled system. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to The Loop: trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which calculation or chemical interpretation correctly applies Recycle loop?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
- C. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- D. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Recycle loop; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Coupled system, not Recycle loop. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Neutralization, not Recycle loop. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- D: This describes Logarithm, not Recycle loop. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Loop using new evidence: trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which calculation or chemical interpretation correctly applies Neutralization?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- C. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Neutralization; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Coupled system, not Neutralization. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Recycle loop, not Neutralization. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Logarithm, not Neutralization. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Loop: trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which calculation or chemical interpretation correctly applies Logarithm?

**Options - exact player copy:**

- A. Reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- B. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- C. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Logarithm; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.
- B: This describes Coupled system, not Logarithm. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Recycle loop, not Logarithm. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Neutralization, not Logarithm. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Loop decision, the team knows this: with clean water flowing, total hydrogen across the entire plant to identify the missing return and close the recycling loop. Close the ledger now so the next decision uses every real input and output exactly once. Which calculation or chemical interpretation correctly applies Inventory?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. The amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.
- C. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Inventory; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Coupled system, not Inventory. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.
- C: This describes Recycle loop, not Inventory. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Neutralization, not Inventory. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from The Loop to this follow-up: trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which calculation or chemical interpretation correctly applies Electrolysis?

**Options - exact player copy:**

- A. Contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.
- B. Returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.
- C. Uses electrical energy to drive a chemical change that would not proceed on its own. Here it splits treated water into hydrogen and oxygen.
- D. The reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Electrolysis; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Coupled system, not Electrolysis. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Recycle loop, not Electrolysis. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. uses electrical energy to drive a chemical change that would not proceed on its own. Here it splits treated water into hydrogen and oxygen.
- D: This describes Neutralization, not Electrolysis. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** Convert the available current and time into hydrogen yield so the allocation uses actual gas production rather than electrical power alone.

**Question card story-science connection - exact player copy:** The current-based yield determines how much hydrogen the scheduled run can actually add to recovery.

**Question card prompt - exact player copy:** Estimate collected
hydrogen mass.

**Calculation:** Q=10,000 x 28,800 = 2.88e8 C; mol e- =2985; theoretical
mol H2 1492.5; actual 1373 mol; mass 2.77 kg H2.

**Correct result:** 2.77 kg; tolerance ±3%.

**Answer text:** The run produces about 2.77 kg H2 after the 92% current efficiency is applied.

**Why:** Time must be seconds because an ampere is coulomb per second.
Divide electron moles by two, then apply current efficiency and molar
mass.

**Wrong-path feedback:** Eight hours used directly undercounts by 3600;
forgetting two electrons doubles hydrogen; forgetting efficiency gives
the theoretical 3.01 kg.

**State/output:** Converts requested recovery hydrogen into required
stack-hours.

## Stop 52 - Allocate the recovery power

**Format/placement:** ALLOCATE, operated at `stack-power-controller`.

**Metadata:** Concept: 14 - electrochemistry under constraints; Keystone: redox and electrochemistry; Area: Electrolysis Hall; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the stack power controller, in Electrolysis Hall.

**Stop reason - exact player copy:** The hydrogen yield is estimated and its power must fit alongside habitat, treatment, and cooling demands.

**Question card story setup - exact player copy:** The committed plan must make gas without recreating earlier failures.

**Question card story-science connection - exact player copy:** The allocation determines whether recovery can proceed without sacrificing the systems that prevent a repeat failure.

**Question card prompt - exact player copy:** Build a plan that keeps
crew safe, prevents another hot spot, purifies Batch C precursor gas,
and produces recovery hydrogen.

**Complete format-specific interaction block:**

```yaml
allocate:
  pool: {label: "Dust-limited electrical energy", value: 600, unit: kWh}
  items:
    - {id: habitat, label: "Protected habitat load", cost: 180}
    - {id: cooling, label: "Reactor thermal control", cost: 120}
    - {id: purification, label: "Product purification", cost: 80}
    - {id: electrolysis, label: "Recovery electrolysis", cost: 160}
    - {id: refrigeration, label: "Tank refrigeration", cost: 60}
    - {id: fast_charge, label: "Optional battery fast charge", cost: 60}
  questions:
    - {id: crew_safe, label: "Does the habitat remain safe?", required: true, needs: [habitat]}
    - {id: heat_safe, label: "Does the reactor remain below the validated heat limit?", required: true, needs: [cooling]}
    - {id: fuel_clean, label: "Will recovered product stay within specification?", required: true, needs: [purification, refrigeration]}
    - {id: replace_h2, label: "Will electrolysis replace required hydrogen?", required: true, needs: [electrolysis]}
    - {id: fast_charge_ready, label: "Can optional battery fast charging run now?", required: false, needs: [fast_charge]}
  correct: [habitat, cooling, purification, electrolysis, refrigeration]
  pass_rule: "All required questions answered and total cost <=600 kWh."
```

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 52 - Allocate the recovery power"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "Build a plan that keeps crew safe, prevents another hot spot, purifies Batch C precursor gas, and produces recovery hydrogen."
  payload: "```yaml allocate: pool: {label: \"Dust-limited electrical energy\", value: 600, unit: kWh} items: - {id: habitat, label: \"Protected habitat load\", cost: 180} - {id: cooling, label: \"Reactor thermal control\", cost: 120} - {id: purification, label: \"Product purification\", cost: 80} - {id: electrolysis, label: \"Recovery electrolysis\", cost: 160} - {id: refrigeration, label: \"Tank refrigeration\", cost: 60} - {id: fast_charge, label: \"Optional battery fast charge\", cost: 60} questions: - {id: crew_safe, label: \"Does the habitat remain safe?\", required: true, needs: [habitat]} - {id: heat_safe, label: \"Does the reactor remain below the validated heat limit?\", required: true, needs: [cooling]} - {id: fuel_clean, label: \"Will recovered product stay within specification?\", required: true, needs: [purification, refrigeration]} - {id: replace_h2, label: \"Will electrolysis replace required hydrogen?\", required: true, needs: [electrolysis]} correct: [habitat, cooling, purification, electrolysis, refrigeration] pass_rule: \"All required questions answered and total cost <=600 kWh.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 4 canonical interaction block - ALLOCATE:**

```yaml
allocate:
  pool: {label: "Dust-limited electrical energy", value: 600, unit: "kWh"}
  items:
    - {id: habitat, label: "Protected habitat load", cost: 180}
    - {id: cooling, label: "Reactor thermal control", cost: 120}
    - {id: purification, label: "Product purification", cost: 80}
    - {id: electrolysis, label: "Recovery electrolysis", cost: 160}
    - {id: refrigeration, label: "Tank refrigeration", cost: 60}
    - {id: fast_charge, label: "Optional battery fast charge", cost: 60}
  questions:
    - {id: crew_safe, requires: [habitat], required: true}
    - {id: heat_safe, requires: [cooling], required: true}
    - {id: fuel_clean, requires: [purification, refrigeration], required: true}
    - {id: replace_h2, requires: [electrolysis], required: true}
    - {id: fast_charge_ready, requires: [fast_charge], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  correct: [habitat, cooling, purification, electrolysis, refrigeration]
  decision_can_fail: true
  question: "Build a plan that keeps"
```

**Correct result:** Fund habitat 180 + thermal 120 + purification 80 +
electrolysis 160 + refrigeration 60 = 600; omit fast-charge reserve.

**Answer text:** Fund habitat 180, cooling 120, purification 80, electrolysis 160, and refrigeration 60 kWh; omit fast charging.

**Why:** Every funded item answers a known constraint. The reserve is
valuable but can be restored after the dust front; losing refrigeration
wastes existing propellant, and losing purification creates off-spec
product. The full pool requires accepting no discretionary margin this
shift.

**Wrong-path feedback:** If purification is cut, show that production
may increase while quality degrades. If thermal control is cut, invoke
the Mission 10 boundary. If habitat is cut, block commitment.

**State/output:** power_plan_recovery = true; methane and oxygen
projections reach target at start of Mission 14.

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

**Secondary briefing card - exact player copy:** You completed Power. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

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

**Prompt - exact player copy:** In a follow-up to Power, assemble the electron and ion paths to confirm that the powered cell can split water without shorting or mixing products. Which calculation or chemical interpretation correctly applies Electrical circuit?

**Options - exact player copy:**

- A. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- B. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
- D. The rate at which electric charge moves. One ampere is one coulomb of charge per second.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Electrical circuit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Oxidation, not Electrical circuit. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C: This describes Reduction, not Electrical circuit. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Electric current, not Electrical circuit. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to Power: before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Oxidation?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The rate at which electric charge moves. One ampere is one coulomb of charge per second.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Oxidation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electrical circuit, not Oxidation. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Reduction, not Oxidation. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D: This describes Electric current, not Oxidation. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Power using new evidence: before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Reduction?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- C. The rate at which electric charge moves. One ampere is one coulomb of charge per second.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Reduction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electrical circuit, not Reduction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Oxidation, not Reduction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Electric current, not Reduction. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. the gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Power: convert the available current and time into hydrogen yield so the allocation uses actual gas production rather than electrical power alone. Which calculation or chemical interpretation correctly applies Electric current?

**Options - exact player copy:**

- A. The rate at which electric charge moves. One ampere is one coulomb of charge per second.
- B. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Electric current; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. the rate at which electric charge moves. One ampere is one coulomb of charge per second.
- B: This describes Electrical circuit, not Electric current. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Oxidation, not Electric current. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Reduction, not Electric current. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another Power decision, the team knows this: before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Coulomb?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. A unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.
- C. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Coulomb; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electrical circuit, not Coulomb. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.
- C: This describes Oxidation, not Coulomb. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Reduction, not Coulomb. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from Power to this follow-up: before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions. The next action depends on selecting the conclusion that fits all of those facts. Which calculation or chemical interpretation correctly applies Electric charge?

**Options - exact player copy:**

- A. A connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.
- B. The loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.
- C. A property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- D. The gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Electric charge; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Electrical circuit, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Oxidation, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.
- D: This describes Reduction, not Electric charge. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

## Stop 56 - Write the rule before the final samples

**Format/placement:** TRIGGER, operated at `certification-console`.

**Metadata:** Concept: 15 - precommitted thresholds; Keystone: evidence must be independent; Area: Plant Control; Learning role: APPLY; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the certification console, in Pad Office.

**Stop reason - exact player copy:** The failure is diagnosed and final acceptance limits must be written before the blind samples arrive.

**Question card story setup - exact player copy:** Commit the acceptance and abort limits before the blind samples appear so the decision cannot move after the result is known.

**Question card story-science connection - exact player copy:** The precommitted purity, moisture, and pressure rules ensure an independent failure cannot be averaged into a pass.

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

**Secondary briefing card - exact player copy:** You completed FULL. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Contaminant:** an unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- **Threshold:** a value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- **Trigger rule:** states the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.
- **False-ready state:** occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

### Review question 1

**Prompt - exact player copy:** In a follow-up to FULL, the tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which calculation or chemical interpretation correctly applies Contaminant?

**Options - exact player copy:**

- A. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- B. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- C. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.
- D. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Contaminant; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold, not Contaminant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. an unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- C: This describes Trigger rule, not Contaminant. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes False-ready state, not Contaminant. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to FULL: the tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Ordered measurement",
  "yLabel": "Decision quantity",
  "caption": "Measurements approach and then cross the action threshold.",
  "series": [
    {
      "name": "Measured",
      "points": [
        [
          1,
          42
        ],
        [
          2,
          48
        ],
        [
          3,
          55
        ],
        [
          4,
          63
        ],
        [
          5,
          71
        ]
      ]
    }
  ],
  "limit": {
    "at": 60,
    "label": "Action threshold"
  }
}
```


**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.
- C. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Contaminant, not Threshold. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Trigger rule, not Threshold. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D: This describes False-ready state, not Threshold. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks FULL using new evidence: commit the acceptance and abort limits before the blind samples appear so the decision cannot move after the result is known. Write the action threshold now, before new evidence or operational pressure can move it. Which calculation or chemical interpretation correctly applies Trigger rule?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- C. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- D. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Trigger rule; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Contaminant, not Trigger rule. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Threshold, not Trigger rule. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes False-ready state, not Trigger rule. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. states the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.
### Review question 4

**Prompt - exact player copy:** An unseen case extends FULL: the tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which calculation or chemical interpretation correctly applies False-ready state?

**Options - exact player copy:**

- A. Occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- B. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- C. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for False-ready state; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.
- B: This describes Contaminant, not False-ready state. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Threshold, not False-ready state. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Trigger rule, not False-ready state. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another FULL decision, the team knows this: the tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which calculation or chemical interpretation correctly applies Specification?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. A measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.
- C. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- D. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Specification; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Contaminant, not Specification. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. a measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.
- C: This describes Threshold, not Specification. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Trigger rule, not Specification. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from FULL to this follow-up: the tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which calculation or chemical interpretation correctly applies Purity?

**Options - exact player copy:**

- A. An unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.
- B. A value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.
- C. The fraction of a sample made of the desired substance. High total mass does not guarantee high purity.
- D. States the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Purity; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Contaminant, not Purity. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Threshold, not Purity. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. the fraction of a sample made of the desired substance. High total mass does not guarantee high purity.
- D: This describes Trigger rule, not Purity. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Question card story setup - exact player copy:** With Batch C quarantined and one shift left, spend the final test on the measurement that could actually change GO or NO-GO.

**Question card story-science connection - exact player copy:** The selected assay supplies the independent contaminant evidence that can change the batch's certification status.

**Question card prompt - exact player copy:** Which measurement has the
greatest chance to change the launch decision?

**Complete format-specific interaction block:**

```yaml
value:
  budget: {value: 10, unit: test_points}
  options:
    - {id: pressure, label: "Repeat total-pressure reading", cost: 6, axis: amount, required: false}
    - {id: mass, label: "Duplicate tank mass", cost: 7, axis: amount, required: false}
    - {id: assay, label: "Independent Batch C contaminant assay", cost: 10, axis: composition, required: true}
    - {id: catalyst_temp, label: "Repeat average catalyst temperature", cost: 5, axis: thermal, required: false}
    - {id: valve, label: "Visual valve inspection", cost: 4, axis: hardware, required: false}
  total_option_cost: 32
  correct: [assay]
  decision_changed: "Confirms whether quarantine and reprocessing remain required."
```

**Correct result:** Independent Batch C contaminant assay.

**Answer text:** Buy the independent Batch C contaminant assay.

**Why:** Pressure and mass are already precise and are not the disputed
claim. Average temperature cannot certify tank contents. A second
independent assay determines whether quarantine/reprocessing remains
necessary and directly controls GO/NO-GO.

**Wrong-path feedback:** More precision on a nonbinding quantity has low
decision value. Evidence is valuable for the action it can change.

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

**Question card story setup - exact player copy:** Fund reprocessing, electrolysis, validated reactor operation, verification, and safety so the surviving recovery plan can be executed.

**Question card story-science connection - exact player copy:** The allocation ensures reprocessing, verification, production, and protected safety capacity are funded together.

**Question card prompt - exact player copy:** Spend 100 points on the proposals that execute and verify the surviving plan.

**Complete format-specific interaction block:**

```yaml
proposals:
  - {id: reprocess, label: "Batch C reprocessing", min: 25, evidence: "Only action that lowers measured contaminants."}
  - {id: electrolysis, label: "Timed electrolysis", min: 15, evidence: "Faraday-limited run replaces hydrogen lost during processing."}
  - {id: validated_reactor, label: "Validated 550 K / 12 bar operation", min: 10, evidence: "Meets rate, equilibrium-yield, and thermal limits."}
  - {id: independent_assay, label: "Independent final verification", min: 15, evidence: "Directly controls launch authorization."}
  - {id: safety, label: "Habitat and safety margin", min: 10, evidence: "Protects the non-negotiable reserve."}
  - {id: extra_heat, label: "Production above validated point", min: 0, evidence: "Adds thermal risk and is not required."}
  - {id: cosmetic, label: "Cosmetic dashboard recalibration", min: 0, evidence: "Changes display, not composition or readiness."}
recommended: {reprocess: 35, electrolysis: 15, validated_reactor: 10, independent_assay: 25, safety: 15, extra_heat: 0, cosmetic: 0}
evidence:
  required_total: 100
  pass_rules: ["reprocess + independent_assay >= 60", "electrolysis >= 15", "validated_reactor >= 10", "safety >= 10", "cosmetic = 0", "total = 100"]
```

**Proposals:** Batch C purification/reprocessing; timed electrolysis;
validated reactor operation; independent final assay; extra raw
production above validated point; cosmetic dashboard recalibration;
habitat/safety margin.

**Correct result:** 35 reprocessing, 25 independent verification, 15 electrolysis, 10 validated reactor, and 15 safety/habitat; total 100. Accept variants with at least 60 points across reprocessing + verification and no points to cosmetic recalibration, provided safety gets at least 10.

**Evidence shown after commit:** Reprocessing is the only action that
changes contaminant concentration; electrolysis replaces processing
losses; the validated point preserves rate/yield/thermal limits;
independent assay changes launch authorization.

**Answer text:** Use 35 points for reprocessing, 25 for independent verification, 15 for electrolysis, 10 for validated reactor operation, and 15 for safety; fund no cosmetic recalibration.

**Why:** The grade rewards investments that can alter the decision or
protect a binding constraint. Spending everything on production solves
the old problem and recreates the new one.

**Wrong-path feedback:** Overfunding raw production while underfunding reprocessing or final assay cannot make off-spec methane flight-ready. Spending points on cosmetic recalibration changes a display rather than the batch, and cutting safety or electrolysis breaks a binding link in the recovery chain.

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

## Mission outcome and epilogue - no further quiz

Mission decision: Whether the crew can launch. Apply the existing final evidence and metric gates before the world payoff below.

From the cabin window, the pad lights shrink below. The full fuel gauge sits beside two passed assay seals. The crew is strapped in, the safe plant is behind them, and Arcadia Rise falls away into the red plain.
## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed GO / NO-GO. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Value of information:** the usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- **Binding constraint:** a requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- **Tradeoff:** occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.
- **Go/no-go decision:** GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- Buy the measurement that can change the launch decision, not the one that is easiest to repeat.

### Review question 1

**Prompt - exact player copy:** In a follow-up to GO / NO-GO, with Batch C quarantined and one shift left, spend the final test on the measurement that could actually change GO or NO-GO. Choose the next measurement now based on whether its result could change the decision. Which calculation or chemical interpretation correctly applies Value of information?

**Options - exact player copy:**

- A. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- B. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.
- D. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Value of information; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Binding constraint, not Value of information. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. the usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C: This describes Tradeoff, not Value of information. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Go/no-go decision, not Value of information. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 2

**Prompt - exact player copy:** the Mars return mission receives a second case related to GO / NO-GO: use the independent assay and hardware limits to eliminate the plan that reaches gross mass but not certified methane. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which calculation or chemical interpretation correctly applies Binding constraint?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Binding constraint; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Value of information, not Binding constraint. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Tradeoff, not Binding constraint. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. a requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D: This describes Go/no-go decision, not Binding constraint. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks GO / NO-GO using new evidence: with Batch C quarantined and one shift left, spend the final test on the measurement that could actually change GO or NO-GO. Choose the next measurement now based on whether its result could change the decision. Which calculation or chemical interpretation correctly applies Tradeoff?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- C. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- D. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Tradeoff; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Value of information, not Tradeoff. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Binding constraint, not Tradeoff. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Go/no-go decision, not Tradeoff. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: Correct. occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.
### Review question 4

**Prompt - exact player copy:** An unseen case extends GO / NO-GO: with Batch C quarantined and one shift left, spend the final test on the measurement that could actually change GO or NO-GO. Choose the next measurement now based on whether its result could change the decision. Which calculation or chemical interpretation correctly applies Go/no-go decision?

**Options - exact player copy:**

- A. GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- B. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Go/no-go decision; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. gO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.
- B: This describes Value of information, not Go/no-go decision. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: This describes Binding constraint, not Go/no-go decision. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Tradeoff, not Go/no-go decision. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 5

**Prompt - exact player copy:** Before another GO / NO-GO decision, the team knows this: use the independent assay and hardware limits to eliminate the plan that reaches gross mass but not certified methane. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which calculation or chemical interpretation correctly applies Certified methane?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. Methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.
- C. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- D. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Certified methane; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Value of information, not Certified methane. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: Correct. methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.
- C: This describes Binding constraint, not Certified methane. It does not account for the quantities, conditions, or evidence in this chemistry case.
- D: This describes Tradeoff, not Certified methane. It does not account for the quantities, conditions, or evidence in this chemistry case.
### Review question 6

**Prompt - exact player copy:** the Mars return mission applies the lesson from GO / NO-GO to this follow-up: fund reprocessing, electrolysis, validated reactor operation, verification, and safety so the surviving recovery plan can be executed. Spend the evidence budget now on tests that can distinguish the explanations still in play. Which calculation or chemical interpretation correctly applies Verification?

**Options - exact player copy:**

- A. The usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.
- B. A requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.
- C. Checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.
- D. Occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Verification; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Value of information, not Verification. It does not account for the quantities, conditions, or evidence in this chemistry case.
- B: This describes Binding constraint, not Verification. It does not account for the quantities, conditions, or evidence in this chemistry case.
- C: Correct. checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.
- D: This describes Tradeoff, not Verification. It does not account for the quantities, conditions, or evidence in this chemistry case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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
