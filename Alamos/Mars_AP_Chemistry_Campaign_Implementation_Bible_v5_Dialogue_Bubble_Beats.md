# RED SAND: FULL TANK

## AP Chemistry Campaign Implementation Bible

**Project:** First Person Learning  
**World:** Arcadia Rise propellant plant, Mars  
**Player role:** Newly assigned Propellant Lead  
**Campaign size:** 15 missions, 60 graded stops, 1 final launch commitment  
**Audience:** AP Chemistry students  
**Primary implementation target:** `books/redsand.yml` plus existing Red Sand theme assets  
**Status:** Content-complete implementation specification

> The design test: if the chemistry is removed, the mystery cannot be solved. If the story is removed, the student still completes a cumulative AP Chemistry review in which early ideas become tools for later decisions.

## 1. One-page implementation brief

The Arcadia Rise plant must fill a methane-and-oxygen ascent vehicle before a fixed launch window. Production is behind. The crew's first explanation is a methane leak; the evidence eventually proves there is no major leak, only too little hydrogen reaching the Sabatier reactor. A reactor engineer then appears to have caused the shortfall by lowering a temperature set point, but a withheld thermal record proves the change prevented a runaway. When production finally catches up, an independent assay shows that one methane batch is full by mass and pressure but outside the campaign's fictional flight specification. The player must combine stoichiometry, gases, molecular structure, solutions, spectroscopy, thermochemistry, kinetics, equilibrium, acids and bases, redox, and electrochemistry to choose a safe recovery plan and authorize launch.

Implementation is deliberately linear at the story level. A wrong answer teaches, retries, and then permits progress; it does not create a dead campaign branch. Player decisions change dialogue, trust, and optional acknowledgements, but the evidence sequence remains stable so every student reaches the three scientific reversals.

### Non-negotiable engine rules

- Import with `node tools/import-book.mjs books/redsand.yml redsand --verify`.
- Every lesson carries exactly one canonical `format` from `engine/content/normalize.js`.
- Do not use suspended `STACK`.
- Placement follows stop kind: decision formats at a person, calculation formats at a room/bench/board, operated formats at the fixture being controlled.
- A scene is 30-45 words of situation only. Put teaching in `guide`, `background`, `why`, and wrong-answer feedback.
- For `CHOICE`, include four choices, the correct label verbatim in `answer`, and one rebuttal for each wrong choice.
- Keep the campaign opener to five sentences and each mission briefing to four sentences.
- Grade by the authored answer logic, never by prose similarity.
- Preserve one typed challenge per lesson and end-to-end gradeability.
- Use `takesAsRead` when a later stop relies on a previously established concept.
- All launch specifications and operating limits in this book are fictional game values, not real flight guidance.

## 2. Campaign promise, clock, and player experience

### Opening sequence - no movie required, maximum five sentences

Mars is already making the fuel that will take you home. At Arcadia Rise, thin carbon-dioxide air and buried water are turned into methane and oxygen for the ascent vehicle. Fifteen work shifts remain before the launch window closes; miss it, and the crew stays on Mars without the supplies planned for another season. Commander Laila Abiola gives you the plant key and says, "Find what is stopping the fuel. Get us home." A warning changes from amber to red: **METHANE SHORTFALL - 18.0%**.

**Delivery:** Show the five sentences above as a click-through text sequence over the normal Plant Control view. Keep the player in the playable scene. The final sentence changes the existing methane warning from amber to red and activates the Mission 1 briefing icon.

### Concrete stakes

The ascent vehicle must be certified at dawn after Mission 15. Missing the window strands the surface crew until the next launch opportunity and exhausts habitat reserves planned for the handover. A rushed launch with contaminated propellant risks an engine shutdown during ascent. The player is never asked to care about an arbitrary score; the visible consequences are time, heat, water, electrical power, propellant quality, and crew trust.

### Three major reversals

1. **Twist 1 - The leak that was not:** Carbon has not vanished. Hydrogen delivery is deficient, so the reactor never made the reported methane.
2. **Twist 2 - The saboteur who was not:** Tomás Herrera changed the reactor temperature, but he did it to stop a developing thermal runaway.
3. **Twist 3 - Full is not ready:** The tanks reach target mass and pressure, but Batch C contains too much carbon dioxide and water for the game's flight specification.

### Global progression variables

Use these as visible or hidden state. They need not create story forks.

| Variable | Start | Typical use |
| --- | ---: | --- |
| `shifts_remaining` | 15 | Decrement after each mission; visible clock |
| `methane_readiness` | 82% | Apparent inventory progress; reaches 100% before Twist 3 |
| `oxygen_readiness` | 88% | Coupled electrolysis output and power trade-off |
| `hydrogen_reserve` | 62 units | Spent in tests/production; restored by loop repair |
| `water_reserve` | 74 units | Reveals recycle-loop problem |
| `power_margin` | 18 units | Becomes the binding resource in Missions 12-15 |
| `reactor_safety_margin` | 42 units | Falls under aggressive conditions; restored by validated operating point |
| `batch_c_quality` | unknown | Revealed as off-spec in Mission 14 |
| `crew_trust` | neutral | Dialogue flavor for evidence-based choices |
| `herrera_trust` | guarded | Falls during suspicion, rises after the holdout test |
| `evidence_flags` | none | Records clue discovery and powers the casebook recaps |

## 3. World and location plan

The site is a process diagram made walkable: Martian atmosphere and ice enter at the north/west, water becomes hydrogen and oxygen, hydrogen crosses to the reactor and catalyst, product gas moves through the cold end, and liquid propellant reaches the tank farm and ascent vehicle. Travel is never filler; each move follows the molecule or the evidence.

| ID | Place | Story/chemistry function | Signature fixture |
| --- | --- | --- | --- |
| `GIBBS` | Plant Control | Ledgers, power allocation, command decisions | `ledger`, `loadboard`, `sample-tray` |
| `INTAKE` | Atmosphere Intake | CO2 feed, compression, gas composition | `compressors` |
| `HSTORE` | Hydrogen Store | H2 mass, pressure, delivery line | `store-scales` |
| `KINET` | Catalyst Bay | Rate, mechanism, catalyst health | `bed`, `charge-bench`, `bed-log` |
| `SOIL` | Water Plant | Ice extraction, brine, solution treatment | `hopper`, `columns`, `brinetank`, `water-report` |
| `CUT` | Ice Cut | First distant site; raw water source and field evidence | excavation face and rover sampler |
| `EQUIL` | Reactor Hall | Sabatier equilibrium, heat, conversion | `skid`, `analyser`, `bed-head`, `equil-stub` |
| `PHASE` | Cold End | Drying, separation, condensation, contamination | `coldline`, `fridge`, `phase-radiator` |
| `ELEC` | Electrolysis Hall | H2/O2 production and Faraday calculations | `stack`, `volt-sheet`, `cell-diagram` |
| `ASSAY` | Assay Lab | Independent standards, UV/Vis, launch specification | `spec-bench` |
| `ARRAY` | Array Shed | Solar production and available current | array controller |
| `BATT` | Battery Bank | Stored energy, protected habitat reserve | `cell-stacks` |
| `TANKS` | Tank Farm | Pressure, mass, gas composition, final loading | `farm-gauges`, `umbilical` |
| `PAD` | Pad Office | Launch authority and final commitment | certification console |

### Location escalation

| Missions | Places per mission | Travel rule |
| --- | ---: | --- |
| 1-4 | 1 | Local investigation; no distant travel |
| 5-10 | 2 | Evidence at the first place creates the need to visit the second |
| 11-15 | 3 | The player crosses connected subsystems and synthesizes evidence |

The Ice Cut is locked until Mission 5. The ascent vehicle remains scenery until Mission 14 and becomes interactable only after the Mission 15 final commitment.

## 4. Character bible

### Commander Laila Abiola - mission authority

**First entrance:** Plant Control, already cancelling a nonessential rover trip while the red shortfall warning sounds.  
**Wants:** A defensible launch decision before the window.  
**Blind spot:** Treats converging dashboard numbers as independent evidence.  
**Gameplay use:** Delivers stakes, receives high-level diagnoses, and forces commitments. CHOICE, CASEBOOK, VALUE, SCIENCETANK, and final DIAGNOSIS can be asked at her.  
**Arc:** Begins by demanding production; ends by demanding proof of composition. She changes because the player shows that "green" channels can share one bad dependency.

### Ingrid Sundqvist - production and catalyst lead

**First entrance:** Atmosphere Intake, scraping frost from a compressor sight glass herself.  
**Wants:** Recover lost kilograms every remaining shift.  
**Blind spot:** Rate is the first explanation she reaches for, even when yield or quality is binding.  
**Gameplay use:** Teaches stoichiometric throughput, rate law, catalyst behavior, and operational urgency. She pushes aggressive options that are scientifically tempting, never foolish.  
**Arc:** Accuses Herrera because his override cut output; later becomes the person who helps validate his safer high-pressure/lower-temperature plan.

### Dr. Tomás Herrera - reactor and safety engineer

**First entrance:** Hydrogen Store, quietly asking for the raw sensor timestamps while others argue about a leak.  
**Wants:** Keep the Sabatier loop inside a tested thermal envelope.  
**Blind spot:** Withholds incomplete safety evidence because he fears command will overreact; that secrecy makes him look guilty.  
**Gameplay use:** Equilibrium, calorimetry, mechanisms, controlled experiments, and the human mystery.  
**Arc:** Apparent saboteur in Missions 7-9; vindicated by the player's holdout and stress tests in Mission 10; openly collaborates thereafter.

### Mei-Ling Cho - water and cryogenics engineer

**First entrance:** Catalyst Bay, refusing to accept a residue sample with a broken chain of custody.  
**Wants:** Keep water and carbon dioxide out of equipment that becomes dangerously cold.  
**Blind spot:** Trusts physical separation models more than messy maintenance history.  
**Gameplay use:** Molecular geometry, polarity, intermolecular forces, phase behavior, brines, and the water recycle loop.  
**Arc:** Starts as the skeptic who disproves the false leak path; later accepts that her cold-end analyzer and the control-room estimate share the same calibration source.

### Rosalind Achebe - analytical and electrochemistry lead

**First entrance:** Water Plant, carrying a sealed standard instead of trusting the wall meter.  
**Wants:** Make every important number traceable to a physical standard.  
**Blind spot:** Can slow decisions by asking for perfect evidence when sufficient evidence would do.  
**Gameplay use:** Molarity, Beer-Lambert law, acid/base tests, redox, Faraday's law, assays, thresholds.  
**Arc:** Her insistence on an independent sample causes Twist 3 and saves the launch from a false-ready state.

### Yusuf Demir - power and life-support officer

**First entrance:** Reactor Hall, opening the habitat reserve breaker log while everyone else discusses reactor output.  
**Wants:** Protect the crew's heat, air, and water while supplying the plant.  
**Blind spot:** Frames every choice as scarcity, sometimes underestimating how recycling can change the budget.  
**Gameplay use:** Energy ledgers, electrolysis allocation, coupled systems, and irreversible trade-offs.  
**Arc:** Moves from opposing extra production power to designing the timed power diversion that makes the final recovery possible.

### Minor voices

Use no more than one minor voice in a scene: a rover operator at the Ice Cut, a maintenance technician in Catalyst Bay, a pad controller, and a habitat medic. They provide observations or consequences, not new subplots. Never introduce a named person only to ask one school question.

## 5. Character direction and dialogue rules

- Introduce competence before biography. Show each character doing a job under pressure.
- Give every major character a repeatable verbal habit: Abiola asks "What can we defend?"; Sundqvist asks "How many kilograms by dawn?"; Herrera asks "What changed first?"; Cho asks "What can physically travel there?"; Achebe asks "Against which standard?"; Demir asks "What stops if we do that?"
- Characters may be wrong about explanations, never about facts within their specialty without an explicit reason.
- Wrong answers should produce a character response that names the mechanism, not ridicule the player.
- After evidence changes a relationship, change future greetings and optional dialogue.
- Do not let a character deliver more than about 90 spoken words without player movement, inspection, or response.

### Non-cinematic beat presentation contract

- Keep the player in the normal playable view; story delivery never depends on a forced viewpoint change.
- Use nearby_character_bubble for a person in the current location and radio_bubble for a person speaking from elsewhere.
- Advance mission-critical bubbles with a Continue control. Never let essential dialogue disappear on a timer.
- Use no more than two short bubbles in an ordinary beat. Mission 15 may use three one-line specialist acknowledgements.
- Place scientific results on equipment_panel_update and keep them visible until the next stop begins.
- Use system_banner only for a single conclusion, warning, or destination. Put details on the equipment panel or in the mission log.
- Activate a waypoint only after the briefing or dialogue explicitly names the destination.
- Copy completed dialogue, panel conclusions, and destinations into the mission log so the player can review them.
- Sound, lighting, particles, and object movement are optional reinforcement. They never carry information the player must know.
- No voice acting, lip sync, custom character animation, or pre-rendered video is required.

## 6. Chemistry spine and recurring concepts

| Keystone concept | Introduce/practice | Retrieve/combine | Transfer/payoff |
| --- | --- | --- | --- |
| particles, moles, molar mass | M1 | M2, M6 | M13, M15 |
| balancing and stoichiometry | M1-M2 | M6, M12 | M13, M15 |
| gas laws and partial pressure | M3 | M6, M11 | M14-M15 |
| Lewis/VSEPR/polarity/IMF | M4 | M5 | M14-M15 |
| solutions, molarity, spectroscopy | M5 | M9, M12 | M14-M15 |
| energy, calorimetry, phase change | M7 | M9-M10 | M11, M15 |
| kinetics and rate law | M8 | M9-M10 | M11, M15 |
| catalysts and mechanisms | M9 | M10 | M11, M15 |
| equilibrium, Q, K, ICE | M11 | M12, M14 | M15 |
| acids/bases and solution treatment | M12 | M14 | M15 |
| redox and electrolysis | M13 | M14 | M15 |
| evidence independence and uncertainty | M5-M6 | M10 | M14-M15 |

Difficulty moves from L1 recognition and L2 procedures in Missions 1-4, through L3 application and L4 synthesis in Missions 5-10, to L4/L5 constrained decisions in Missions 11-15. Later difficulty comes from choosing and combining models, not uglier arithmetic.

## 7. Clue ledger

| Planted | Objective observation | Initial interpretation | True meaning | Concept needed | Payoff |
| --- | --- | --- | --- | --- | --- |
| M1 | Carbon in nearly equals carbon accounted for | meter noise | no large methane leak | atom/mass balance | M6 |
| M3 | Tank pressure looks normal; methane fraction is low | bad pressure gauge | other gases preserve pressure | PV=nRT, Dalton | M6/M14 |
| M4 | polar residue sits near a nonpolar-gas path | leak residue | residue came from maintenance, not the gas stream | polarity/IMF | M6 |
| M5 | three meters share one calibration stream | reassuring agreement | false corroboration | evidence dependency | M6/M14 |
| M7 | Herrera lowered the temperature set point | sabotage | response to rising heat release | calorimetry/energy balance | M10 |
| M9 | bed temperature rises first near the inlet | poisoned catalyst or bad control | developing hot spot | mechanism/rate/heat | M10 |
| M10 | production model fails only on withheld hot runs | inconvenient outliers | aggressive setting crosses safety limit | holdout/residual/stress | Twist 2 |
| M12 | whole-plant H closes only when recycle water is included | hydrogen disappears | return loop starves electrolysis | coupled stoichiometry | M13 |
| M14 | dashboard quality channels share a standard | strong agreement | common calibration bias | trace/holdout | Twist 3 |

## 8. Mission content contract

Every mission below supplies: story event, route, character beat, concepts in plain language, four exact stops, an outcome scene, and a quick review. `Correct result` is the grading truth. `Wrong-path feedback` is implementation content and may be shortened only if the format cannot display it. `State/output` identifies narrative flags and visible world changes.

# Mission 1 - The Shortfall

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 15 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE SHORTFALL
**Go now:** Go to Plant Control and meet Commander Abiola at the carbon ledger.
**Card body:** The ascent vehicle needs methane and oxygen to carry everyone home. The methane tanks are 18% behind schedule, and the crew thinks fuel is leaking. Before technicians close valves at random, determine whether matter is actually missing. If the plant chases the wrong failure, it will spend one of the fifteen remaining shifts fixing nothing.
**Objective:** Use the production records to decide whether a large methane leak is possible.
**Failure means:** The crew loses time it may need to make enough propellant to leave Mars.
**Later travel:** None. All four stops remain in Plant Control.

## Designer intent - not shown to player

The player arrives in Plant Control during a loud but orderly response. Abiola stops two technicians from sealing random valves: no intervention until the basic ledger is understood. The mission establishes the player as the person who translates chemistry into action. The first correct answers do not solve the shortfall; they make the leak story less comfortable.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Plant Control | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The red METHANE SHORTFALL - 18.0% warning flashes across the control wall. Two technicians reach for different valve controls; Abiola steps between them and locks both panels. Dialogue bubbles - Abiola: "Those valves stay open until we know whether matter is actually missing. We have fifteen shifts to make the fuel that gets us home. Start with the ledger."

**Unlocks:** Stop 1 at the sample tray.

**Beat 2 - After Stop 1 | sample tray | automatic correct-answer response**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The four sample labels separate into ATOM, MOLECULE, and ION columns. Dialogue bubbles - Abiola: "Good. If the software calls every object the same kind of particle, the count can be correct and the conclusion can still be wrong."

**Unlocks:** Stop 2 at the conversion board; Stop 3 unlocks immediately after Stop 2.

**Beat 3 - After Stops 2 and 3 | conversion board | automatic transition**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The scale reading, moles, and molecule count connect with a continuous illuminated unit path. Panel/HUD text: MASS -> MOLES -> MOLECULES. Dialogue bubbles - Abiola: "Now the tank scale and the reactor model are speaking the same language. Open the carbon ledger."

**Unlocks:** Stop 4 at the carbon ledger.

**Beat 4 - After Stop 4 | carbon ledger | automatic discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The carbon streams close to within 0.2%. The red leak warning changes to amber, but the methane shortfall remains red. Panel/HUD text: CARBON ACCOUNTED FOR: 99.8% / METHANE TARGET: NOT MET. Dialogue bubbles - Abiola: "We are still short of methane. We may not be short of carbon."

**Unlocks:** The Mission 1 outcome beat.

**Beat 5 - Mission outcome and hook | Plant Control | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Sundqvist's static portrait appears in the radio-bubble HUD while the Atmosphere Intake waypoint pulses on the map. Dialogue bubbles - Sundqvist: "Then the Martian air may never be reaching the reactor in the first place." Abiola: "Do not increase compressor power. The Propellant Lead will test that claim first." Panel/HUD text: NEXT DESTINATION - ATMOSPHERE INTAKE.

**Unlocks:** Mission 2 briefing and the Atmosphere Intake waypoint.

## Location plan

**One location:** Plant Control (`GIBBS`). All four stops occur around the sample tray, conversion board, and carbon ledger. No distant travel.

## Characters and dramatic beat

Abiola introduces the stakes by cancelling work, not by narrating her biography. Sundqvist appears only on radio, asking for permission to raise reactor throughput. When the carbon ledger nearly closes, Abiola does not declare "no leak"; she pins the sheet under a magnet labeled **DO NOT EXPLAIN YET**.

## Key concepts, explained here

Matter is described at several levels. An atom is one neutral element unit; a molecule is bonded atoms with no net charge; an ion has a net charge. Chemists convert a measured mass to moles using molar mass, then convert moles to particles with Avogadro's number, `6.022 x 10^23 mol^-1`. A balanced equation is an atom ledger: coefficients may change the number of molecules, but atoms are not created or destroyed.

## Stop 1 - Labels on the sample tray

**Format/placement:** `CHOICE`, asked at Commander Abiola beside `sample-tray` (decision/person).  
**Metadata:** particles; INTRODUCE; L1; obstacle.  
**Question card story setup - exact player copy:** Abiola sets four sample cards beside the production log. Before the ledger opens, prove that the control software is not treating atoms, molecules, and ions as the same thing.  
**Question card story-science connection - exact player copy:** Correct labels prevent the plant from counting unlike particles as though they were interchangeable.  
**Question card prompt - exact player copy:** Which classification is completely correct?  
**Choices:**

1. `Ar is an atom; CH4 and CO2 are molecules; H+ is an ion.` **(correct)**
2. `All four are molecules because each symbol describes matter.`
3. `Ar and H+ are atoms; CH4 and CO2 are ions.`
4. `CO2 is an atom because it is one chemical formula.`

**Correct result:** Choice 1.  
**Why:** Ar is a single neutral atom. CH4 and CO2 contain bonded atoms and are neutral molecules. H+ has a positive charge, so it is an ion. "Particle" is the umbrella word; it does not erase these distinctions.  
**Wrong-path feedback:** (2) A formula can name an atom, molecule, or ion; the word formula does not decide. (3) H+ is charged, while CH4 and CO2 have no net charge. (4) One written formula can contain several atoms.  
**State/output:** Set `evidence_flags.particle_labels = true`; unlock the conversion board.

## Stop 2 - How much methane is missing?

**Format/placement:** `BALLPARK`, at the Plant Control conversion board (calculation/room).  
**Metadata:** grams-moles-particles; INTRODUCE; L2; obstacle.  
**Question card story setup - exact player copy:** The wall shows a 1.60 x 10^3 kg methane shortfall. Convert that missing mass into the molecule count used by the reactor model.  
**Question card story-science connection - exact player copy:** The crew cannot compare a tank scale with molecular production until both are expressed through moles.  
**Question card prompt - exact player copy:** Estimate the number of methane molecules represented by the shortfall.  
**Authored tiles/data:** `1.60 x 10^3 kg`; `1000 g/kg`; `16.04 g/mol CH4`; `6.022 x 10^23 molecules/mol`.  
**Formula:** `(1.60 x 10^3 kg)(1000 g/kg)/(16.04 g/mol)(6.022 x 10^23 molecules/mol)`.  
**Correct result:** `6.01 x 10^28 CH4 molecules`; target `6.0 x 10^28`, tolerance ±6%.  
**Why:** Kilograms must become grams before dividing by grams per mole. The result is about `9.98 x 10^4 mol`, and each mole represents Avogadro's number of molecules. Multiplying mass directly by Avogadro's number skips molar mass and gives meaningless units.  
**Wrong-path feedback:** If near `6 x 10^25`, the kilogram-to-gram factor was missed. If near `9.98 x 10^4`, the player stopped at moles. If the player multiplies by 16.04, remind them that molar mass divides grams into mole-sized groups.  
**State/output:** Update the wall display from kilograms to both kilograms and kilomoles; no inventory change.

## Stop 3 - Rebuild the conversion

**Format/placement:** `SEQUENCE`, at the conversion board (calculation/room).  
**Metadata:** dimensional analysis; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** A rollback erased the formulas behind yesterday’s methane estimate. Rebuild the conversion path from tank mass to molecules.  
**Question card story-science connection - exact player copy:** A broken unit chain could create a false shortfall and send technicians after a leak that does not exist.  
**Question card prompt - exact player copy:** Put the methane conversion workflow in order.  
**Cards:** `Read tank mass in kg` / `Convert kg to g` / `Divide by CH4 molar mass` / `Multiply by Avogadro's number` / `Report molecules with units`.  
**Correct order:** As listed.  
**Why:** Dimensional analysis is a path whose units cancel. Kilograms cannot cancel grams per mole until kilograms become grams. Dividing by molar mass leaves moles; multiplying by molecules per mole leaves molecules. The unit trail is also an error detector.  
**Wrong-path feedback:** Highlight the first adjacent pair whose units cannot cancel. Do not reveal the full order until a second failed commit.  
**State/output:** Set `evidence_flags.conversion_rebuilt = true`; carbon ledger becomes interactable.

## Stop 4 - Close the first carbon ledger

**Format/placement:** `BALANCE`, at `ledger` (calculation/room).  
**Metadata:** atom conservation; INTRODUCE; L2; clue.  
**Question card story setup - exact player copy:** The ledger has 100.0 kmol of incoming carbon and three measured destinations. Count only real carbon streams and find what remains unassigned.  
**Question card story-science connection - exact player copy:** If carbon is still inside the process, the supposedly missing methane may never have leaked.  
**Question card prompt - exact player copy:** Count the legitimate carbon streams and close the ledger.  
**Balance block:** total `100.0 kmol C`; visible streams `81.6`, `17.9`, `0.3`; hidden closure `0.2 kmol C`; tolerance `0.1 kmol`.  
**Correct result:** `99.8 kmol C` is directly accounted for and only `0.2 kmol C` (0.2%) is unassigned.  
**Why:** One mole of CO2 and one mole of CH4 each contain one mole of carbon atoms. Add carbon streams as carbon, not total molecular mass. A 0.2% residual can be measurement uncertainty; it cannot explain an 18% methane schedule shortfall. This does not yet prove there is no leak, but it makes a large carbon leak a poor explanation.  
**Wrong-path feedback:** Do not count water; it contains no carbon. Do not multiply CH4 by four; the subscript four counts hydrogen atoms. Do not treat the 18% schedule gap as a carbon stream.  
**State/output:** Set `evidence_flags.carbon_nearly_closed = true`; add Casebook card `CARBON CLOSES`; increase `crew_trust` by one.

## Mission outcome

Abiola silences the leak siren but leaves the warning amber. "We are still missing methane," she says. "We may not be missing carbon." Sundqvist replies that plenty of carbon dioxide is probably never reaching the reactor. The next mission is causally triggered: inspect the feedstock rather than hunt an unproven leak.

## Quick concept review

- Atom, molecule, and ion describe different kinds of particles.
- `moles = grams / molar mass`; `particles = moles x 6.022 x 10^23`.
- Follow units through every conversion.
- Balanced equations and process ledgers conserve atoms.
- A nearly closed carbon ledger weakens a large methane-leak explanation; it does not identify the real cause.

# Mission 2 - The Feedstock Problem

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 14 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE FEEDSTOCK PROBLEM
**Go now:** Go to the Atmosphere Intake and meet Erik Sundqvist at the compressor log desk.
**Card body:** Carbon dioxide from the Martian air may be starving the reactor. Test that explanation before the compressors are pushed beyond their safe limit. Calculate how much methane the captured carbon dioxide could make and determine which reactant actually runs out first. Every wrong repair uses power and time needed for the trip home.
**Objective:** Determine whether carbon dioxide or hydrogen limits methane production.
**Failure means:** The plant wastes a shift and energy while the fuel deficit remains.
**Later travel:** None. All four stops remain at the Atmosphere Intake.

## Designer intent - not shown to player

At the Atmosphere Intake, Sundqvist shows the player frost, vibration, and a full shift's capture log. The player converts feed into theoretical methane, discovers that CO2 could support the target, and identifies hydrogen as the limiting reactant. The mission ends with a real resource allocation: use scarce hydrogen to make propellant, diagnose the shortfall, or protect restart reserve.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Atmosphere Intake | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Ice coats the intake housing while the compressor shakes the platform. Sundqvist points to the full-shift capture log. Dialogue bubbles - Sundqvist: "This machine pulls carbon dioxide from the Martian air. If it cannot collect enough, the reactor cannot make the methane that takes us home. Before I push it harder, tell me whether the air supply is actually the problem."

**Unlocks:** Stop 5 at the compressor log desk.

**Beat 2 - After Stop 5 | compressor log desk | automatic transition**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The conversion cards lock into one unit-cancelling chain. Panel/HUD text: CO2 MASS -> CO2 MOLES -> CH4 MOLES -> CH4 MASS. Dialogue bubbles - Sundqvist: "Use the captured amount. Tell me what this intake could make before I touch the compressor."

**Unlocks:** Stop 6 at the intake control panel.

**Beat 3 - After Stop 6 | intake control panel | automatic reversal**

**Presentation:** `nearby_character_bubble + radio_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The proposed compressor-overdrive control becomes unavailable. Panel/HUD text: THEORETICAL CH4: 2405 kg / REQUIRED CH4: 2000 kg / CO2 SUPPLY: SUFFICIENT. Dialogue bubbles - Sundqvist: "Then the intake is not starving us. We have enough carbon dioxide to meet the launch target." Abiola, over radio: "That is not good news. If the air is not holding us back, something else is."

**Unlocks:** Stop 7 at the dual-feed display.

**Beat 4 - After Stop 7 and before Stop 8 | dual-feed display | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A second feed display opens and highlights the hydrogen line. Panel/HUD text: HYDROGEN IS LIMITING METHANE PRODUCTION. Dialogue bubbles - Sundqvist: "The Martian air was never the bottleneck. We are not getting enough hydrogen." Abiola: "You may use one diagnostic pulse, but the reactor must retain enough hydrogen to restart safely. Divide what remains."

**Unlocks:** Stop 8 at the hydrogen-allocation manifold.

**Beat 5 - Mission outcome and hook | Atmosphere Intake | automatic after Stop 8**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The player allocation appears as three illuminated pipes: PRODUCTION, DIAGNOSTIC, and RESTART RESERVE. A blue diagnostic pulse leaves the intake display and travels toward the Hydrogen Store. Dialogue bubbles - Sundqvist: "The intake stays at normal power. Your test gets one pulse. Restart reserve remains protected." Abiola: "Follow that pulse. Find where the hydrogen stops being usable." Panel/HUD text: NEXT DESTINATION - HYDROGEN STORE.

**Unlocks:** Mission 3 briefing and the Hydrogen Store waypoint.

## Location plan

**One location:** Atmosphere Intake (`INTAKE`), using `compressors` and a portable stoichiometry board. It is local and visible from Plant Control.

## Characters and dramatic beat

Sundqvist is introduced through action: she clears ice from the sight glass while making her case. She accepts the arithmetic when it rules out her preferred explanation, but immediately asks the practical question: "Then where is my hydrogen?"

## Key concepts, explained here

The balanced Sabatier reaction is `CO2 + 4 H2 -> CH4 + 2 H2O`. Coefficients are mole ratios, not mass ratios. A limiting reactant is the feed that can make the smaller amount of product; excess reactant remains. Theoretical yield comes from the limiting reactant, while percent yield compares actual product with that theoretical maximum.

## Stop 5 - The production workflow

**Format/placement:** `SEQUENCE`, at the intake calculation board.  
**Metadata:** stoichiometric workflow; INTRODUCE; L2; obstacle.  
**Question card story setup - exact player copy:** The intake reports kilograms of carbon dioxide, while the launch schedule is written in kilograms of methane. Put the stoichiometric conversion in the only order whose units cancel.  
**Question card story-science connection - exact player copy:** This tells the crew whether Martian air can supply enough carbon for the ride home.  
**Question card prompt - exact player copy:** Order the workflow for converting captured CO2 mass into theoretical CH4 mass.  
**Cards:** `Balance the equation` / `Convert CO2 mass to moles` / `Use the CO2:CH4 mole ratio` / `Convert CH4 moles to mass` / `Compare with the production target`.  
**Correct order:** As listed.  
**Why:** Stoichiometric coefficients connect moles. Molar mass is the bridge between a scale and that ratio. In this reaction the CO2:CH4 mole ratio is 1:1, but their masses are not equal because `44.01 g CO2` and `16.04 g CH4` are one mole each.  
**Wrong-path feedback:** If the player applies a coefficient to kilograms, show unit mismatch. If they compare before converting product to mass, point out that the schedule is a mass target.  
**State/output:** Unlock theoretical-yield panel.

## Stop 6 - Could today's air make enough methane?

**Format/placement:** `BALLPARK`, at the compressor log desk.  
**Metadata:** theoretical yield; PRACTICE; L2; reversal.  
**Question card story setup - exact player copy:** The compressors captured 6.60 x 10^3 kg of carbon dioxide. Calculate the methane that amount could make before Sundqvist overdrives the intake.  
**Question card story-science connection - exact player copy:** If the theoretical yield already exceeds the target, pushing the compressors wastes power and risks damage.  
**Question card prompt - exact player copy:** Estimate the theoretical methane from the captured CO2.  
**Formula/data:** `(6.60 x 10^6 g CO2)/(44.01 g/mol) x (1 mol CH4/1 mol CO2) x (16.04 g/mol CH4)`.  
**Correct result:** `2405 kg CH4` (`2.41 x 10^3 kg` to three significant figures); tolerance ±3%.  
**Why:** `(6.60 x 10^6 g / 44.01 g mol^-1)(16.04 g mol^-1) = 2.405 x 10^6 g = 2405 kg CH4`. Rounded to three significant figures this is `2.41 x 10^3 kg`. CO2 is sufficient for the 2000 kg requirement.  
**Wrong-path feedback:** `6600 kg` treats a 1:1 mole ratio as a 1:1 mass ratio. About `150` is kilomoles, not kilograms of methane.  
**State/output:** Set `evidence_flags.co2_sufficient = true`; Sundqvist turns off the proposed compressor overdrive.

## Stop 7 - Which feed runs out first?

**Format/placement:** `CHOICE`, asked by Sundqvist at the compressor platform.  
**Metadata:** limiting reactant; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** The reactor has 150 kmol carbon dioxide and 520 kmol hydrogen. Determine which feed reaches its stoichiometric limit first.  
**Question card story-science connection - exact player copy:** The limiting reactant identifies which supply actually caps the methane available for launch.  
**Question card prompt - exact player copy:** Which reactant limits methane production, and how much CH4 can it support?  
**Choices:**

1. `H2 limits; 520/4 = 130 kmol CH4.` **(correct)**
2. `CO2 limits; 150 kmol CO2 makes 150 kmol CH4.`
3. `H2 limits; 520 kmol H2 makes 520 kmol CH4.`
4. `Neither limits because both feeds are present.`

**Correct result:** Choice 1.  
**Why:** Test each reactant through the balanced equation. CO2 could make 150 kmol CH4. H2 must be divided by four and can make only 130 kmol. The smaller product amount wins, so H2 is limiting and 20 kmol CO2 can remain.  
**Wrong-path feedback:** (2) It ignores the smaller H2-supported yield. (3) It ignores the coefficient four. (4) A reaction can have both feeds present and still be limited by one.  
**State/output:** Set `evidence_flags.h2_limiting = true`; radio Herrera requesting raw H2 delivery data.

## Stop 8 - Spend the hydrogen you have

**Format/placement:** `ALLOCATE`, operated at the intake bypass manifold (`compressors` fixture).  
**Metadata:** limiting reactant under constraints; COMBINE; L3; decision.  
**Question card story setup - exact player copy:** Only 80 kmol hydrogen can be released before the next electrolyzer run. Divide it among production, a diagnostic pulse, and protected restart reserve.  
**Question card story-science connection - exact player copy:** Testing the line costs real fuel, but without the test the crew may spend another shift repairing the wrong system.  
**Question card prompt - exact player copy:** Allocate the 80 kmol while preserving restart and collecting enough diagnostic signal.  
**Pool/items:** 80 kmol H2. Production pass: selectable 0-60 kmol. Tracer/line-volume test: minimum 8 kmol. Restart reserve: protected minimum 16 kmol.  
**Correct result:** Any allocation with tracer ≥8, reserve ≥16, total ≤80; recommended `56 production / 8 tracer / 16 reserve`.  
**Why:** No allocation creates hydrogen. The scientific choice is whether a small diagnostic spend is worth the production it displaces. Eight kilomoles gives the meter a resolvable pulse; sixteen preserves a restart. The remaining 56 kmol supports only 14 kmol CH4, a visible cost that makes the evidence meaningful.  
**Wrong-path feedback:** Underfunded tracer yields no interpretable test. Underfunded reserve violates the safe-restart constraint. Over-allocation must be blocked with a message naming the missing amount.  
**State/output:** Set `diagnostic_h2_reserved = true`; `hydrogen_reserve - 8`; unlock Hydrogen Store route for Mission 3.

## Mission outcome

The compressor is not the villain. Sundqvist looks at the 1:4 coefficient on the reactor wall and says, "The air is giving us enough carbon. The plant is failing on the side we brought from water." The player has earned permission to open the Hydrogen Store telemetry. Correct science has removed an easy fix and narrowed the mystery.

## Quick concept review

- Equation coefficients are mole ratios, not mass ratios.
- Convert mass to moles before using coefficients, then convert back if needed.
- The limiting reactant is the one that predicts less product.
- Excess reactant can remain even when production stops.
- Scarce diagnostic material creates a real trade-off between learning and output.

# Mission 3 - Pressure Does Not Lie. Or Does It?

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 13 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** PRESSURE DOES NOT TELL THE WHOLE TRUTH
**Go now:** Go to the Hydrogen Store and meet Tomas Herrera beside the main pressure gauge.
**Card body:** The Hydrogen Store pressure gauge looks normal, but the reactor is receiving too little usable hydrogen. A full-pressure line can still contain the wrong gas. Measure the amount and composition before the crew clears the storage system. If the wrong mixture reaches the reactor, the plant cannot recover its methane schedule.
**Objective:** Locate where the hydrogen composition fails.
**Failure means:** A false all-clear leaves the reactor starved of the gas needed to make fuel.
**Later travel:** None. All four stops remain in the Hydrogen Store.

## Designer intent - not shown to player

The player uses kinetic molecular theory, the ideal gas law, and partial pressure to separate total gas from gas identity. A probe reveals normal total pressure but too little hydrogen in one branch. A controlled temperature prediction fails the simple-leak model and establishes the second major clue for Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Hydrogen Store | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A large gauge holds near its green mark while the reactor-delivery bar flashes LOW. Dialogue bubbles - Herrera: "The gauge measures everything pushing on the tank wall. It does not know which gas is doing the pushing. Before anyone clears this system, prove how much of that pressure belongs to hydrogen."

**Unlocks:** Stop 9 at the tank calculation rail; Stop 10 unlocks immediately after Stop 9.

**Beat 2 - After Stops 9 and 10 | tank calculation rail | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: On the equipment panel, hydrogen particle icons move faster than nitrogen particle icons at equal temperature; the total-mole estimate appears beside the pressure gauge. Dialogue bubbles - Herrera: "The total amount is plausible. That still does not make it usable hydrogen. Sample the line from the tank to the reactor."

**Unlocks:** Stop 11 at the three sampling ports.

**Beat 3 - After Stop 11 | three sampling ports | automatic discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The tank and regulator remain hydrogen-rich, but the reactor branch turns yellow as nitrogen mole fraction rises. Panel/HUD text: TOTAL PRESSURE: NORMAL / H2 PARTIAL PRESSURE: LOW / N2 DETECTED AFTER PURGE TIE-IN. Dialogue bubbles - Herrera: "There. The gauge did not lie. We asked it the wrong question."

**Unlocks:** Stop 12 at the heated test branch.

**Beat 4 - After Stop 12 | heated test branch | automatic contradiction**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Measured pressure follows the warming prediction, but the composition panel shows new nitrogen that a simple leak cannot create. Dialogue bubbles - Herrera: "A leak can remove gas. It cannot add nitrogen to a sealed branch. The simple-leak model fails."

**Unlocks:** The Mission 3 outcome beat.

**Beat 5 - Mission outcome and hook | Hydrogen Store | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The purge tie-in is tagged for investigation. Sundqvist sends an image of blue residue beside a methane valve. Dialogue bubbles - Sundqvist: "Maintenance found this on the methane side. If the systems crossed, the residue may show where." Herrera: "Only if that substance could travel the path you claim." Panel/HUD text: NEXT DESTINATION - CATALYST BAY.

**Unlocks:** Mission 4 briefing and the Catalyst Bay waypoint.

## Location plan

**One location:** Hydrogen Store (`HSTORE`), using `store-scales`, branch ports, and the tank jacket heater. No travel to the distant plant edge.

## Characters and dramatic beat

Herrera is introduced by asking for timestamps and composition, not by explaining himself. He is precise and slightly secretive. Sundqvist arrives late, sees a normal gauge, and calls the line healthy; the player's data forces both experts to pause.

## Key concepts, explained here

At the same absolute temperature, different gases have the same average kinetic energy, but lighter molecules move faster on average. The ideal gas law `PV = nRT` gives total gas moles and cannot identify the gas. Dalton's law says total pressure is the sum of partial pressures, and a component's partial pressure equals its mole fraction times total pressure. A tank can therefore hold normal pressure with too little of the desired gas if another gas replaces it.

## Stop 9 - Same temperature, different speed

**Format/placement:** `CHOICE`, asked by Herrera at the store scales.  
**Metadata:** kinetic molecular theory; INTRODUCE; L1; character.  
**Question card story setup - exact player copy:** The purge log lists hydrogen and nitrogen at the same 300 K. Decide what equal temperature says about molecular energy and speed.  
**Question card story-science connection - exact player copy:** The answer explains why light hydrogen can escape or spread differently without having a different average kinetic energy.  
**Question card prompt - exact player copy:** Which statement is correct?  
**Choices:**

1. `They have the same average kinetic energy, but H2 has the greater average speed.` **(correct)**
2. `H2 has less kinetic energy and the same average speed as N2.`
3. `H2 has more kinetic energy because it moves faster.`
4. `N2 has more kinetic energy because each molecule is heavier.`

**Correct result:** Choice 1.  
**Why:** Average kinetic energy depends only on absolute temperature. Since `KE = 1/2 mv^2`, a lighter particle must have a greater characteristic speed to share the same average kinetic energy as a heavier one.  
**Wrong-path feedback:** Speed and kinetic energy are related but not interchangeable; mass matters. Equal temperature, not equal mass or speed, sets equal average kinetic energy.  
**State/output:** Herrera reveals the branch could be contaminated by nitrogen purge gas.

## Stop 10 - How many total moles are in the branch?

**Format/placement:** `BALLPARK`, at the Hydrogen Store calculation desk.  
**Metadata:** ideal gas law; INTRODUCE; L2; clue.  
**Question card story setup - exact player copy:** A sealed branch is 500 L at 20.0 atm and 300 K. Use the gas law to determine how many total moles press on the gauge.  
**Question card story-science connection - exact player copy:** A normal total mole count cannot prove those moles are usable hydrogen.  
**Question card prompt - exact player copy:** Estimate total gas moles using `R = 0.08206 L atm mol^-1 K^-1`.  
**Formula:** `n = PV/RT = (20.0 atm)(500 L)/[(0.08206)(300 K)]`.  
**Correct result:** `406 mol total gas`; target 406, tolerance ±2%.  
**Why:** The ideal gas law counts total particles through their pressure-volume-temperature behavior. It does not distinguish H2 from N2. The normal-looking value can coexist with the wrong composition.  
**Wrong-path feedback:** Celsius cannot replace kelvin. Multiplying by R instead of dividing breaks units. A result near 20 or 500 is a copied reading, not a mole calculation.  
**State/output:** Set `evidence_flags.total_moles_normal = true`.

## Stop 11 - Sample the branches

**Format/placement:** `PROBE`, at the three gas sampling ports (operated/fixture).  
**Metadata:** Dalton's law and composition; APPLY; L3; clue.  
**Question card story setup - exact player copy:** Sample the tank headspace, regulator outlet, and reactor branch. Total pressure changes little, but gas identity may not.  
**Question card story-science connection - exact player copy:** Partial pressure, not the gauge alone, determines how much hydrogen the reactor can actually use.  
**Question card prompt - exact player copy:** Probe all ports and name where the pattern breaks.  
**Stations/readings:** Tank headspace: `20.0 atm`, `96% H2`. Regulator outlet: `19.7 atm`, `95% H2`. Reactor branch: `19.5 atm`, `68% H2`, `31% N2`, `1% other`.  
**Correct result:** The reactor branch is abnormal; at 19.5 atm its H2 partial pressure is only `0.68 x 19.5 = 13.3 atm`.  
**Why:** Total pressure is the sum of component pressures. The branch gauge stays high because nitrogen contributes pressure. The desired H2 partial pressure has fallen even though the needle barely moves. Sampling every station localizes the change between regulator outlet and reactor branch.  
**Wrong-path feedback:** Selecting the largest total-pressure drop misses composition. Committing before all three readings should explicitly say one station remains unmeasured.  
**State/output:** Set `evidence_flags.branch_mixture_wrong = true`; visually highlight purge tie-in between ports 2 and 3.

## Stop 12 - Test the simple-leak prediction

**Format/placement:** `VERIFY`, at the jacket heater and pressure logger (operated/fixture).  
**Metadata:** combined gas law/model testing; COMBINE; L3; reversal.  
**Question card story setup - exact player copy:** Warm the sealed branch from 300 K to 330 K after committing the pressure prediction. Then compare both pressure and composition with the simple-leak model.  
**Question card story-science connection - exact player copy:** A model that predicts pressure but cannot explain new nitrogen is not an explanation the crew should act on.  
**Question card prompt - exact player copy:** Predict, act, and measure. For a sealed fixed-volume sample starting at 19.5 atm and 300 K, what pressure should a simple no-reaction model give at 330 K?  
**Prediction:** `P2 = P1(T2/T1) = 21.45 atm`; acceptable 21.2-21.7 atm.  
**Measured update:** Total pressure `21.4 atm` (prediction passes), but composition remains `68% H2 / 31% N2`, incompatible with a pure-H2 leak from a previously pure line.  
**Correct result:** The gas-law pressure response is normal, but the simple leak explanation fails on composition; the branch contains a substituted mixture.  
**Why:** Warming a sealed gas tests whether the total particle count behaves normally. It does, so the gauge and volume are credible. Composition is a separate measurement. A leak can lower particle count, but it does not by itself explain nitrogen appearing downstream of a 95% H2 regulator outlet.  
**Wrong-path feedback:** Measuring without a prediction should not count. Calling the leak model confirmed from pressure alone ignores the second observable.  
**State/output:** Set `evidence_flags.simple_leak_fails = true`; Casebook adds `NORMAL PRESSURE, WRONG GAS`.

## Mission outcome

The pressure gauge is telling the truth about total gas and misleading everyone about usable hydrogen. Herrera points to the purge tie-in and says it should not be open. Sundqvist answers that maintenance reported a methane-side residue near a valve, so perhaps the leak crosses systems. The next mission asks what substances can physically travel where.

## Quick concept review

- Equal temperature means equal average kinetic energy, not equal molecular speed.
- `PV = nRT` counts total gas moles but does not identify them.
- Total pressure can look normal while a component's partial pressure is low.
- `Pi = Xi Ptotal` connects mole fraction and partial pressure.
- A model must survive every relevant measurement, not only the one it predicts correctly.

# Mission 4 - What Can Travel Where?

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 12 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** WHAT CAN TRAVEL WHERE?
**Go now:** Go to Catalyst Bay and meet Mina Cho beside the covered blue residue.
**Card body:** A blue residue beside a methane valve seems to prove where fuel is escaping. Cho says the substance may not be able to travel through that gas line at all. Use molecular structure and physical behavior to test the proposed path. If the clue is false, every hour spent following it moves the crew closer to being stranded.
**Objective:** Determine whether the residue could have followed the suspected leak path.
**Failure means:** The crew spends another shift searching for a leak in the wrong place.
**Later travel:** None. All four stops remain in Catalyst Bay.

## Designer intent - not shown to player

In Catalyst Bay, a maintenance residue seems to connect the hydrogen purge problem to the supposed methane leak. The player identifies candidate structures and operates a temperature separation test. The residue is a polar glycol-water service fluid; it could not have ridden through the dry, nonpolar methane stream and deposited at the valve under the recorded conditions. This becomes the third contradiction before Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Catalyst Bay | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The player approaches a blue stain sealed beneath a clear cover beside a dry-gas valve. Cho places a residue vial next to four molecular models. Dialogue bubbles - Cho: "A stain is evidence that a substance reached this spot. It is not proof of how it arrived. We test the path before we name a leak."

**Unlocks:** Stop 13 at the molecular-model bench; Stop 14 unlocks immediately after Stop 13.

**Beat 2 - After Stops 13 and 14 | molecular-model bench | automatic transition**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The valid methane structure rotates into a tetrahedron, and the bond-dipole arrows cancel. Panel/HUD text: STRUCTURE -> GEOMETRY -> BOND DIPOLES -> MOLECULAR POLARITY. Dialogue bubbles - Cho: "Now compare methane with the residue. Shape and polarity decide whether they travel together."

**Unlocks:** Stop 15 at the property-card rack.

**Beat 3 - After Stop 15 | property-card rack | automatic response**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Methane enters the NONPOLAR / WEAK DISPERSION lane; water and glycol enter the POLAR / STRONG ATTRACTION lane. Dialogue bubbles - Cho: "The proposed path asks polar liquid to behave like dry methane gas. Run the cartridge and make it prove that claim."

**Unlocks:** Stop 16 at the separation cartridge.

**Beat 4 - After Stop 16 | separation cartridge | automatic reversal**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Methane passes through while water and glycol remain or condense far upstream. The path diagram stamps IMPOSSIBLE UNDER RECORDED CONDITIONS. Dialogue bubbles - Cho: "The blue fluid is real. The methane-leak story attached to it is not."

**Unlocks:** The Mission 4 outcome beat.

**Beat 5 - Mission outcome and hook | Catalyst Bay | automatic**

**Presentation:** `nearby_character_bubble + radio_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Cho seals the vial as MAINTENANCE FLUID - UNRELATED PATH. Abiola calls as a water-balance alarm opens on the wall. Dialogue bubbles - Abiola: "Carbon is accounted for. The residue cannot follow the proposed route. Now the water numbers are failing too. We widen the investigation." Panel/HUD text: LOCAL INVESTIGATION COMPLETE / NEXT DESTINATION - WATER PLANT.

**Unlocks:** Mission 5 briefing and the Water Plant waypoint.

## Location plan

**One location:** Catalyst Bay (`KINET`), using `charge-bench`, a molecular model rail, and a portable separation cartridge. Although Cold End would also fit the science, keeping Mission 4 in one local place obeys the early-world rule.

## Characters and dramatic beat

Cho enters carrying a sealed blank and asks, "What can physically travel there?" She challenges Sundqvist's story without accusing her of carelessness. A maintenance technician admits that the same blue fluid was used during a valve service two shifts earlier.

## Key concepts, explained here

A Lewis structure accounts for valence electrons and bonding. VSEPR uses electron domains to predict three-dimensional shape. Bond polarity comes from unequal electron sharing; molecular polarity also depends on whether bond dipoles cancel. Intermolecular forces connect microscopic structure to boiling point, solubility, and separation. "Like dissolves like" is useful only after the molecule's polarity is established.

## Stop 13 - Choose the methane structure

**Format/placement:** `CHOICE`, asked by Cho at `charge-bench`.  
**Metadata:** Lewis structures; INTRODUCE; L1; obstacle.  
**Question card story setup - exact player copy:** Cho projects four possible Lewis structures for methane beside the residue sample. Choose the one that gives every atom a valid electron count.  
**Question card story-science connection - exact player copy:** The correct electron structure is the first step toward predicting whether methane and the residue can behave alike.  
**Question card prompt - exact player copy:** Which Lewis structure for CH4 is valid?  
**Choices:** `Central C with four C-H single bonds and no lone pairs on C` **(correct)** / `Central C with three C-H bonds and one lone pair` / `H=C(H)-H with a double bond to hydrogen` / `C4- surrounded by four H+ ions`.  
**Correct result:** Four single bonds, no carbon lone pairs.  
**Why:** Carbon supplies four valence electrons and reaches an octet through four shared pairs. Hydrogen forms one bond and never a double bond. Formal charges are zero in the standard structure.  
**Wrong-path feedback:** A lone pair plus three bonds gives carbon an incorrect electron/formal-charge picture; hydrogen cannot exceed a duet; ionic fragments do not describe methane.  
**State/output:** Add the correct 3D methane model to the rail.

## Stop 14 - From electrons to polarity

**Format/placement:** `SEQUENCE`, at the molecular model rail.  
**Metadata:** structure-property chain; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** The crew jumped from a blue stain to a leak path. Put every reasoning step between electrons and molecular polarity back in order.  
**Question card story-science connection - exact player copy:** Geometry determines whether bond dipoles cancel, so it can rule out a story based only on chemical labels.  
**Question card prompt - exact player copy:** Order the reasoning chain used to predict molecular polarity.  
**Cards:** `Draw a valid Lewis structure` / `Count electron domains and predict geometry` / `Identify bond dipoles from electronegativity` / `Test whether dipoles cancel in 3D` / `Classify the molecule as polar or nonpolar`.  
**Correct order:** As listed.  
**Why:** A polar bond does not guarantee a polar molecule. Geometry determines whether individual dipoles reinforce or cancel. Methane's tetrahedral C-H bond arrangement is symmetric enough that the small bond dipoles cancel.  
**Wrong-path feedback:** If polarity comes before geometry, show two molecules with similar bonds but different shapes. If the player begins with IMF, explain that IMF classification depends on the molecular polarity already established.  
**State/output:** Unlock molecule matching.

## Stop 15 - Match shape, polarity, and dominant force

**Format/placement:** `PROTOCOL`, at the model rail desk.  
**Metadata:** VSEPR and IMF; COMBINE; L2; clue.  
**Question card story setup - exact player copy:** Build property cards for methane, carbon dioxide, water, and ammonia by matching shape, polarity, and dominant intermolecular force.  
**Question card story-science connection - exact player copy:** These properties predict which substances travel with methane and which stick or condense upstream.  
**Question card prompt - exact player copy:** Match each molecule to its shape/polarity/dominant intermolecular force.  
**Scenarios:** `CH4` / `CO2` / `H2O` / `NH3`.  
**Choices/mapping:** `tetrahedral, nonpolar, London dispersion` / `linear, nonpolar overall, London dispersion` / `bent, polar, hydrogen bonding` / `trigonal pyramidal, polar, hydrogen bonding`; mapping `[0,1,2,3]`.  
**Correct result:** Mapping as listed.  
**Why:** Symmetric CH4 and CO2 cancel bond dipoles and rely on London dispersion between molecules. Bent water and pyramidal ammonia remain polar, and their H-O or H-N bonds allow hydrogen bonding. London forces still exist in all substances; "dominant" names the most consequential one present.  
**Wrong-path feedback:** CO2 has polar bonds but a nonpolar linear molecule. Water is not linear because two lone-pair domains bend its O-H bonds.  
**State/output:** Create reference curves for the sweep.

## Stop 16 - Can the blue residue ride the gas stream?

**Format/placement:** `SWEEP`, operated at the separation cartridge fixture.  
**Metadata:** IMF/property behavior; APPLY; L3; reversal.  
**Question card story setup - exact player copy:** Sweep the separation cartridge from 220 K to 330 K and watch methane, water, and the glycol tracer respond.  
**Question card story-science connection - exact player copy:** If the blue fluid cannot survive the recorded path, it cannot identify the methane leak everyone is chasing.  
**Question card prompt - exact player copy:** Sweep the temperature, mark where each substance leaves or sticks, and decide whether the residue could follow the proposed path.  
**Response model:** Methane passes the cartridge across the test range; water strongly retains/condenses below about 300 K; glycol tracer remains strongly retained throughout.  
**Correct result:** The glycol-water residue cannot plausibly travel with the methane stream and deposit only at the suspect valve.  
**Why:** Strong polarity and hydrogen bonding make the service fluid behave very differently from nonpolar methane. Under the recorded cool, dry line conditions it would be retained or condensed upstream. The residue is consistent with local maintenance fluid, not a transported methane-leak marker.  
**Wrong-path feedback:** Choosing the closest curve by color is not evidence. Committing before sampling low, middle, and high temperatures should say the separation behavior is under-observed.  
**State/output:** Set `evidence_flags.residue_local = true`; technician admits service spill; Casebook adds `RESIDUE DID NOT TRAVEL`.

## Mission outcome

Cho seals the residue as a maintenance artifact. The crew has now lost its second easy explanation: neither missing carbon nor the blue stain supports a large methane leak. Abiola calls from Plant Control: the water-production numbers also fail to reconcile. The investigation must widen after four tightly local missions.

## Quick concept review

- Lewis structures account for valence electrons and valid bonds.
- VSEPR turns electron domains into three-dimensional geometry.
- Molecular polarity depends on both bond dipoles and whether they cancel.
- Stronger intermolecular attractions change boiling, solubility, and separation.
- A substance's physical properties can rule out a proposed evidence path.

# Mission 5 - The Water Account

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 11 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE WATER ACCOUNT
**Go now:** Go to the Water Plant and meet Nia Achebe beside the recycle-water alarm.
**Card body:** Water from the reactor should return to electrolysis, where it becomes the hydrogen and oxygen needed for launch. Plant records say the loop is losing water and the distant Ice Cut may be producing dirty feed. Test the water and trace the instruments before the crew shuts down the source. A false water alarm could stop both fuel and oxygen production.
**Objective:** Decide whether the water deficit is real and whether the alarming measurements are independent.
**Failure means:** The plant shuts down a working source and loses both launch gases.
**Later travel:** The Ice Cut waypoint unlocks after Stop 19, when an independent field sample is required.

## Designer intent - not shown to player

The player distinguishes amount from concentration, calculates molarity, chooses a sensitive wavelength, and traces measurement dependencies. The trip begins at the Water Plant, where an anomalous chloride signal suggests dirty source ice. That observation triggers the first distant trip to the Ice Cut for a field blank. The field result is clean; the apparent agreement among plant meters is revealed as common calibration bias.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Water Plant | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A recycle-water display flashes CHLORIDE HIGH while a second panel reports WATER RETURN LOW. Achebe sets a sealed reference standard beside the wall meter. Dialogue bubbles - Achebe: "If the Ice Cut suddenly turned dirty, we may have to stop both water and launch-gas production. We verify the measurement before we shut down the source."

**Unlocks:** Stop 17 at the wet-chemistry bench; Stop 18 unlocks immediately after Stop 17.

**Beat 2 - After Stops 17 and 18 | wet-chemistry bench | automatic response**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The interface replaces the label MORE CHLORIDE with two separate labels: CONCENTRATION and TOTAL MOLES. The recycle sample molarity populates the treatment model. Dialogue bubbles - Achebe: "A larger concentration is not automatically a larger amount. Now we have a number the process can use."

**Unlocks:** Stop 19 at the spectrometer.

**Beat 3 - After Stop 19 | spectrometer | automatic travel trigger**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The selected wavelength locks and the plant sample reads high against Standard C. Achebe places a clean field vial in a rover case. Dialogue bubbles - Achebe: "The instrument sees a signal. We still need a sample that does not share this room, this meter, or this standard." Panel/HUD text: DISTANT VERIFICATION AUTHORIZED - ICE CUT.

**Unlocks:** The Ice Cut waypoint and Stop 20 after the player reaches the field sampler.

**Beat 4 - At Ice Cut and after Stop 20 | automatic discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The raw brine and field blank test normal. A dependency map then draws three alarming plant readouts back to the same Standard C. Panel/HUD text: THREE READOUTS / ONE CALIBRATION SOURCE. Dialogue bubbles - Achebe: "The displays agree because they inherited the same error. Agreement is not independence."

**Unlocks:** The Mission 5 outcome beat.

**Beat 5 - Mission outcome and hook | Ice Cut radio link | automatic**

**Presentation:** `nearby_character_bubble + radio_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The Ice Cut shutdown order disappears, while three dashboard channels receive a SHARED CALIBRATION warning. Dialogue bubbles - Abiola: "We will not close a working water source. Return with the raw measurements. Leak, feed, gas mixture, water, and calibration go on one board." Panel/HUD text: NEXT DESTINATION - PLANT CONTROL REVIEW.

**Unlocks:** Mission 6 briefing and the Plant Control waypoint.

## Location plan

**Two locations:** Water Plant (`SOIL`) for Stops 17-19, then Ice Cut (`CUT`) for Stop 20. The Ice Cut is not opened for sightseeing: the high chloride reading creates the need for a source sample and blank.

## Characters and dramatic beat

Achebe enters carrying a sealed chloride standard and refuses to calibrate from yesterday's plant water. Cho wants the recycle loop cleared quickly. At the Ice Cut, a rover operator shows that the source sample and field blank are both normal; Achebe's caution becomes plot-moving rather than merely cautious.

## Key concepts, explained here

Concentration is amount per volume, not total amount. Molarity is `M = mol/L`. Beer-Lambert law, `A = epsilon b c`, makes absorbance proportional to concentration at a chosen wavelength and path length; the peak wavelength provides the greatest sensitivity. Multiple readouts are not independent evidence if they inherit the same standard or sensor.

## Stop 17 - Concentrated is not necessarily more

**Format/placement:** `CHOICE`, asked by Achebe at `water-report`.  
**Metadata:** concentration versus amount; INTRODUCE; L1; character.  
**Question card story setup - exact player copy:** Compare a small concentrated chloride bottle with a large dilute one. Determine which actually contains more chloride.  
**Question card story-science connection - exact player copy:** The water investigation depends on total contaminant, not on whichever concentration number looks larger.  
**Question card prompt - exact player copy:** Which bottle contains more moles of chloride?  
**Choices:** `Bottle B: 1.5 mol versus Bottle A's 1.0 mol` **(correct)** / `Bottle A because 2.0 M is larger` / `They contain the same amount because both contain chloride` / `Cannot know without molar mass`.  
**Correct result:** Bottle B.  
**Why:** Amount equals concentration times volume. A contains `(2.0 mol/L)(0.50 L)=1.0 mol`; B contains `(0.30)(5.0)=1.5 mol`. Molar mass is needed for mass, not for moles when molarity and volume are already given.  
**Wrong-path feedback:** Concentration compares equal volumes; it does not by itself give total amount.  
**State/output:** Clear misleading alarm label; unlock report calculation.

## Stop 18 - Put the water sample on a molar scale

**Format/placement:** `BALLPARK`, at the Water Plant assay desk.  
**Metadata:** molarity; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** Convert 0.365 g hydrochloric acid in 250.0 mL of recycle water into molarity.  
**Question card story-science connection - exact player copy:** The treatment system needs moles per liter before it can predict acidity or choose a neutralization dose.  
**Question card prompt - exact player copy:** Estimate the HCl molarity if the model treats it as fully dissociated.  
**Formula:** `(0.365 g / 36.46 g mol^-1) / 0.2500 L`.  
**Correct result:** `0.0400 M`; tolerance ±3%.  
**Why:** Convert grams to moles, milliliters to liters, then divide moles by solution volume. The calculation describes the modeled acid concentration; later pH reasoning can use strong-acid dissociation.  
**Wrong-path feedback:** `0.000040` usually keeps milliliters as liters; `1.46` divides mass by volume without molar mass.  
**State/output:** Set `recycle_acid_model = 0.0400`.

## Stop 19 - Choose the measurement wavelength

**Format/placement:** `SWEEP`, operated at the Water Plant spectrophotometer.  
**Metadata:** Beer-Lambert/spectroscopy; INTRODUCE; L3; clue.  
**Question card story setup - exact player copy:** Scan the colored chloride complex from 400 to 700 nm using the sealed standard. Choose the operating wavelength.  
**Question card story-science connection - exact player copy:** A sensitive wavelength can reveal whether the wall meter’s alarming chloride result is real.  
**Question card prompt - exact player copy:** Sweep wavelength and select the operating wavelength with the greatest useful sensitivity.  
**Response:** Peak absorbance at `510 nm`; low signal below 440 and above 620; detector saturation only above `1.20 A`. The standard reads `0.82 A` at 510 nm.  
**Correct result:** Select about `510 nm`.  
**Why:** Beer-Lambert response changes most strongly with concentration where the absorbing species has high absorbance, provided the detector is not saturated. Measuring at a weak wavelength compresses differences and hides a small calibration error.  
**Wrong-path feedback:** Choosing the lowest absorbance maximizes headroom but sacrifices sensitivity. Choosing a wavelength without running the standard leaves the instrument unqualified.  
**State/output:** Unknown reports normal chloride when read against the sealed standard, contradicting the wall meter.

## Stop 20 - Trace the agreement

**Format/placement:** `TRACE`, operated at the Ice Cut rover sampler after field results return.  
**Metadata:** evidence dependency; INTRODUCE; L4; reveal.  
**Question card story setup - exact player copy:** The Ice Cut sample and field blank are normal, but three plant displays still agree on an alarm. Open every channel’s dependencies.  
**Question card story-science connection - exact player copy:** Three green or red displays count as one piece of evidence if the same drifting standard controls all three.  
**Question card prompt - exact player copy:** Open every dependency and identify whether the three alarming channels are independent.  
**Dependencies:** Wall chloride meter -> Plant Standard C. Recycle estimator -> wall meter -> Plant Standard C. Control-room water correction -> recycle estimator -> wall meter -> Plant Standard C. Portable spectrophotometer -> sealed Standard A. Field sample -> independent volume and sealed Standard A.  
**Correct result:** The three alarming channels are not independent; all inherit Plant Standard C. The portable/field path is independent and does not reproduce the alarm.  
**Why:** Agreement strengthens a conclusion only when evidence can fail separately. Here one biased standard propagates through three displays. The distant trip matters because a new sample and independent standard break the dependency chain.  
**Wrong-path feedback:** Counting displays is not counting evidence. A derived estimator cannot independently confirm its own input.  
**State/output:** Set `evidence_flags.shared_calibration = true`; unlock calibration-stream replacement; update `water_reserve` upward by 4 apparent units but leave real deficit unresolved.

## Mission outcome

The Ice Cut is not producing suddenly dirty ice. A single drifting standard made three channels agree on the same wrong correction. The crew gains confidence in the player's method but loses confidence in the dashboard. Back at the plant, Abiola orders a full evidence synthesis: leak, feed, gas mixture, water, and shared calibration must be explained together.

## Quick concept review

- Concentration is amount per volume; total amount also depends on volume.
- `M = mol/L`; convert units before dividing.
- Beer-Lambert law makes absorbance proportional to concentration in its useful range.
- Measure near the absorbance maximum for sensitivity without saturating.
- Several readouts are one piece of evidence if they share the same dependency.

# Mission 6 - The Leak That Was Not

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 10 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE LEAK THAT WAS NOT
**Go now:** Go to Plant Control and meet Commander Abiola at the full evidence board.
**Card body:** Abiola needs one explanation that fits every clue before she redirects the whole plant. A major methane leak, weak carbon-dioxide intake, bad hydrogen delivery, and a dead methane sensor cannot all be true. Use the raw readings and close the atom ledger. The next repair must restore the chemistry that can get the crew home.
**Objective:** Diagnose the shortfall and prove the diagnosis with matter balances.
**Failure means:** The plant commits its remaining time to the wrong repair.
**Later travel:** The Tank Farm waypoint unlocks after Stop 22, when the diagnosis produces a testable prediction.

## Designer intent - not shown to player

Plant Control provides the candidate explanations; the Tank Farm provides an independent mass and composition check. The player diagnoses hydrogen delivery deficiency, tests that conclusion against calibration uncertainty, closes a full C/H/O ledger, and matches old clues to their real meanings. The major leak response ends. The mystery shifts from "Where did methane go?" to "Why did hydrogen delivery fall?"

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Plant Control | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Abiola removes the dashboard summary and replaces it with raw carbon flow, gas composition, water production, pressure, and residue evidence. Dialogue bubbles - Abiola: "No votes. No favorite alarm. Choose the one mechanism that explains what changed and what stayed quiet."

**Unlocks:** Stop 21 at the evidence board; Stop 22 unlocks immediately after Stop 21.

**Beat 2 - After Stops 21 and 22 | evidence board | automatic diagnosis**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: HYDROGEN DELIVERY DEFICIENCY remains highlighted while the other explanations fail one or more observations, even as the intake calibration slider moves. Dialogue bubbles - Abiola: "The conclusion survives the allowed measurement error. Now make it predict what an independent tank sample should show."

**Unlocks:** The prediction-lock travel beat.

**Beat 3 - Travel trigger | Plant Control to Tank Farm | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The evidence board predicts low methane fraction, nitrogen present, and no large missing-carbon term. Panel/HUD text: PREDICTION LOCKED - VERIFY AT TANK FARM. Dialogue bubbles - Herrera: "If that prediction is right, the fuel was mostly never made. We should find carbon in recycle, not outside the plant."

**Unlocks:** The Tank Farm waypoint and Stop 23; Stop 24 unlocks immediately after Stop 23.

**Beat 4 - After Stops 23 and 24 | Tank Farm | automatic Twist 1**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The carbon, hydrogen, and oxygen ledgers close. Earlier clues flip to their supported meanings one by one. Panel/HUD text: NO MAJOR METHANE LEAK / LOW H2 PARTIAL PRESSURE REDUCED PRODUCTION. Dialogue bubbles - Abiola: "There is no major methane leak. We spent four shifts looking for fuel that was mostly never produced."

**Unlocks:** The Mission 6 outcome beat.

**Beat 5 - Mission outcome and hook | Tank Farm | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Relief is interrupted when Herrera opens the first hydrogen-delivery drop and a signed temperature override appears immediately before it. Dialogue bubbles - Herrera: "Those are my credentials." Sundqvist: "Then your change may have caused the collapse." Abiola: "We follow the heat before we accuse the engineer." Panel/HUD text: NEXT ROUTE - SABATIER REACTOR -> COLD END.

**Unlocks:** Mission 7 briefing and the Sabatier Reactor waypoint.

## Location plan

**Two locations:** Plant Control (`GIBBS`) for Stops 21-22, then Tank Farm (`TANKS`) for Stops 23-24. The diagnosis predicts what the tank samples should show, causing the move.

## Characters and dramatic beat

All six major characters appear, but only Abiola, Sundqvist, and Herrera speak during the diagnosis. Sundqvist concedes the carbon evidence. Herrera does not celebrate; he notices that the bad branch mixture began shortly after a thermal-control change.

## Key concepts, explained here

A strong diagnosis explains all observations with one mechanism and is contradicted by none. Uncertainty analysis asks whether reasonable measurement error could change the conclusion. An atom ledger must count C, H, and O across all relevant input, product, recycle, and inventory streams. Evidence synthesis is not a vote among alarms.

## Stop 21 - One cause that fits every panel

**Format/placement:** `DIAGNOSIS`, at the Plant Control review board (calculation/room).  
**Metadata:** multi-evidence diagnosis; COMBINE; L4; reveal.  
**Question card story setup - exact player copy:** Abiola places every major reading on one board and asks for one cause that fits them all.  
**Question card story-science connection - exact player copy:** Only a mechanism that explains both the alarms and the quiet readings should redirect the plant.  
**Headline/readings:** Carbon in/out closes within 0.2%; intake CO2 supports target; H2 branch is only 68% H2 with N2 present; water coproduct is below Sabatier prediction; tank methane fraction is below the production estimate; pressure gauge is normal; residue is local maintenance fluid.  
**Choices:** A `Large methane leak downstream`; B `Insufficient atmospheric CO2`; C `Hydrogen delivery deficiency before the reactor`; D `Completely dead methane sensor`.  
**Correct result:** C.  
**Mechanism:** Nitrogen dilution and reduced H2 partial pressure make H2 limiting, so less CH4 and less coproduct water form. Carbon remains mostly as unreacted/recycled CO2, closing the ledger. Other gases can maintain pressure.  
**Why alternatives fail:** A predicts a much larger missing-carbon residual. B contradicts theoretical feed capacity. D cannot explain low water or abnormal H2 composition.  
**State/output:** Set `twist_1_diagnosed = true`; change mission objective from `find_leak` to `restore_h2_delivery`.

## Stop 22 - Does calibration uncertainty rescue the leak theory?

**Format/placement:** `STRESS`, asked at Abiola (decision/person).  
**Metadata:** uncertainty/robustness; APPLY; L4; decision.  
**Question card story setup - exact player copy:** Move carbon-intake calibration across its full allowed error range and watch the candidate diagnoses.  
**Question card story-science connection - exact player copy:** The crew should abandon the leak search only if that conclusion survives realistic measurement uncertainty.  
**Question card prompt - exact player copy:** Stress the carbon-intake calibration across its allowed range. Which diagnosis remains viable throughout?  
**Correct result:** Hydrogen delivery deficiency remains viable. Even the largest plausible carbon residual is far below the 18% schedule shortfall required by a large methane leak.  
**Why:** Robust conclusions survive reasonable error. The exact residual moves, but not enough to cross the decision boundary. Uncertainty should weaken claims in proportion to its size, not erase all evidence.  
**Wrong-path feedback:** Choosing the leak because "any uncertainty means anything is possible" confuses uncertainty with ignorance.  
**State/output:** Set `evidence_flags.h2_diagnosis_robust = true`; authorize independent Tank Farm sampling.

## Stop 23 - Close C, H, and O at the Tank Farm

**Format/placement:** `BALANCE`, at `farm-gauges` (calculation/room).  
**Metadata:** full atom ledger; TRANSFER; L4; payoff.  
**Question card story setup - exact player copy:** At the Tank Farm, close separate carbon, hydrogen, and oxygen ledgers for the normalized reactor interval.  
**Question card story-science connection - exact player copy:** If every atom is accounted for, low methane can be explained without matter disappearing.  
**Scene/data:** For a normalized interval the reactor receives `100 mol CO2` and `320 mol H2`. It forms `80 mol CH4` and `160 mol H2O`, leaving `20 mol CO2`; no H2 remains in the idealized ledger. Count atoms on both sides.  
**Question card prompt - exact player copy:** Close separate C, H, and O ledgers and state what the amounts imply.  
**Correct result:** Inputs: C 100, H 640, O 200 mol atoms. Outputs: C `80+20=100`; H `80x4 +160x2=640`; O `20x2 +160=200`. H2 is limiting because only 320 mol is supplied, supporting 80 mol CH4.  
**Why:** The ledger explains low methane without lost matter. Carbon not converted remains CO2. Hydrogen appears in methane and water exactly as the equation requires.  
**Wrong-path feedback:** Count atoms, not molecules; water contains two H and one O; remaining CO2 belongs in output inventory.  
**State/output:** Tank composition display changes from "missing mass" to "unconverted CO2 / N2 dilution."

## Stop 24 - Rebuild the case

**Format/placement:** `CASEBOOK`, asked by Abiola at the Tank Farm walkway (decision/person).  
**Metadata:** clue reinterpretation; RETRIEVE; L4; payoff.  
**Question card story setup - exact player copy:** Match each earlier clue to what it actually meant after the new measurements.  
**Question card story-science connection - exact player copy:** Reconstructing the old evidence proves the leak reversal came from chemistry, not from a sudden story reveal.  
**Scenarios:** `Carbon ledger nearly closed` / `Pressure stayed nearly normal` / `Blue residue at valve` / `Low coproduct water` / `Three agreeing meters`.  
**Choices:** `Carbon remained in process, mostly as unreacted CO2` / `Other gases maintained total pressure` / `Local maintenance fluid, not transported leak residue` / `Too little H2 reacted` / `Shared calibration, not independent confirmation`; mapping `[0,1,2,3,4]`.  
**Correct result:** Complete mapping.  
**Why:** Each observation was real. The error was the story attached to it. Together they support a hydrogen-side production failure, not methane disappearing after formation.  
**Wrong-path feedback:** If a clue is matched to its old meaning, show the specific later measurement that contradicted it.  
**State/output:** `twist_1_complete = true`; shut down leak-search work orders; `crew_trust + 2`.

## Mission outcome

Abiola says the sentence the crew has resisted: "There is no major methane leak." The supposed missing methane was largely never produced because diluted hydrogen reached the reactor. Tank pressure stayed respectable because nitrogen and unreacted carbon dioxide occupied the space. As relief spreads, Herrera notices the first delivery drop follows a manual thermal override signed with his own credentials.

## Quick concept review

- The best diagnosis explains quiet readings and alarms together.
- Sensitivity analysis asks whether reasonable error can cross the decision boundary.
- Atom ledgers can explain where matter went even when product is low.
- Other gases can preserve total pressure while desired partial pressure falls.
- A scientific twist is fair when old clues remain true but acquire a better meaning.

# Mission 7 - Heat

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 9 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** HEAT
**Go now:** Go to the Sabatier Reactor and meet Tomas Herrera at the coolant panel.
**Card body:** Hydrogen delivery fell after Herrera lowered the reactor temperature. Restoring the old setting could recover methane quickly—or recreate the condition that made him change it. Follow the heat from the reactor to the radiator and find which event happened first. The crew cannot get home with a reactor that is either too slow or too dangerous to run.
**Objective:** Reconstruct the reactor energy balance and the order of the thermal events.
**Failure means:** The crew either misses the launch window or damages its only fuel reactor.
**Later travel:** The Cold End waypoint unlocks after Stop 26, when the heat calculation points to the radiator system.

## Designer intent - not shown to player

The investigation moves from Reactor Hall to Cold End because a heat-rejection change connects both systems. The player identifies exothermic behavior, calculates a coolant load, orders a heating/phase-change path, and closes an energy ledger. The final ledger shows that someone deliberately reduced the set point as heat rejection weakened.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Sabatier Reactor | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The reactor rate is low, the old temperature setting is marked RESTORE, and the cooling-demand trace rises with methane output. Dialogue bubbles - Abiola: "The old setting might recover fuel quickly. If it also recreates a dangerous condition, it could destroy our only reactor. Establish where the heat goes before anyone restores it."

**Unlocks:** Stop 25 at the reactor coolant panel; Stop 26 unlocks immediately after Stop 25.

**Beat 2 - After Stops 25 and 26 | reactor coolant panel | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The reaction receives an EXOTHERMIC label and the calculated coolant load appears beneath it. Dialogue bubbles - Herrera: "More methane means more heat to remove. The question is whether the cooling system still had that capacity."

**Unlocks:** The radiator-side travel beat.

**Beat 3 - Travel trigger | Reactor to Cold End | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A process diagram highlights warming, melting, and further-warming stages in sequence, then posts the delayed temperature-pulse arrival. Its predicted arrival does not match the radiator log. Dialogue bubbles - Cho: "The phase change delays the signal. To learn what failed first, we need the radiator-side ledger." Panel/HUD text: MOVE TO COLD END.

**Unlocks:** The Cold End waypoint and Stop 27; Stop 28 unlocks immediately after Stop 27.

**Beat 4 - After Stops 27 and 28 | Cold End | automatic discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Dust-obstructed radiator panels appear beside a positive UNREMOVED HEAT term. The timeline places cooling loss before the manual override. Panel/HUD text: RADIATOR PERFORMANCE FELL FIRST / REACTOR SET POINT FELL SECOND. Dialogue bubbles - Herrera: "I lowered the temperature after heat rejection weakened."

**Unlocks:** The Mission 7 outcome beat.

**Beat 5 - Mission outcome and hook | Cold End | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Sundqvist places CAUSED PRODUCTION LOSS beneath the override while Herrera places PREVENTED HIGHER TEMPERATURE beside it. Dialogue bubbles - Sundqvist: "A cautious change can still be the reason we missed production." Herrera: "Then test both claims." Abiola: "We will. Controlled data, not timing alone." Panel/HUD text: NEXT DESTINATION - PLANT CONTROL RATE BOARD.

**Unlocks:** Mission 8 briefing and the Plant Control waypoint.

## Location plan

**Two locations:** Reactor Hall (`EQUIL`) for Stops 25-27, then Cold End (`PHASE`) for Stop 28. Rising coolant return temperature at the reactor triggers inspection of the shared radiator loop.

## Characters and dramatic beat

Sundqvist openly accuses Herrera of trading production for caution. Herrera confirms that he changed the set point but will not explain until the raw thermal log is recovered. Cho discovers radiator performance fell before the override, complicating the accusation.

## Key concepts, explained here

An exothermic process releases heat to the surroundings; an endothermic process absorbs it. `q = mc Delta T` connects mass, specific heat, and temperature change. On a heating curve, sloped segments change temperature and flat segments use energy for a phase change. An energy ledger counts heat generated, removed, stored, and unaccounted.

## Stop 25 - Which way does the heat flow?

**Format/placement:** `CHOICE`, asked by Sundqvist at `skid`.  
**Metadata:** exothermic/endothermic; INTRODUCE; L1; character.  
**Question card story setup - exact player copy:** Read the sign of the Sabatier enthalpy while coolant demand rises with methane output.  
**Question card story-science connection - exact player copy:** The crew must know whether more production adds heat before anyone restores the old setting.  
**Question card prompt - exact player copy:** What does the negative enthalpy mean?  
**Choices:** `The reaction is exothermic; 165 kJ must leave per mole CH4 formed` **(correct)** / `It is endothermic and needs 165 kJ added` / `The catalyst consumes 165 kJ` / `The sign describes reaction speed`.  
**Correct result:** First choice.  
**Why:** Negative Delta H means products have lower enthalpy than reactants and the difference appears as heat released. A catalyst changes activation energy, not Delta H. Enthalpy says nothing directly about speed.  
**State/output:** Enable coolant-load calculation.

## Stop 26 - Size the coolant load

**Format/placement:** `BALLPARK`, at Reactor Hall calculation bench.  
**Metadata:** calorimetry; INTRODUCE; L2; obstacle.  
**Question card story setup - exact player copy:** Use the coolant mass, heat capacity, and temperature rise to calculate the heat removed.  
**Question card story-science connection - exact player copy:** This number determines whether the cooling loop could carry away the reactor’s released energy.  
**Prompt/formula:** `q = mc Delta T`.  
**Correct result:** `11,400 kJ` or `11.4 MJ`; tolerance ±2%.  
**Why:** Multiply mass, energy per kilogram per kelvin, and temperature change. The positive number describes heat gained by coolant; the reactor system loses approximately that heat. Always name the system when assigning signs.  
**Wrong-path feedback:** Using final temperature instead of temperature change overstates the load. A value of 11,400 J misses the kJ unit.  
**State/output:** Add `coolant_removed = 11.4 MJ` to the ledger.

## Stop 27 - Follow energy through temperature and phase

**Format/placement:** `SEQUENCE`, at the reactor heat-model board.  
**Metadata:** heating curves; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** A water slug begins as cold ice and ends as warm liquid. Order the warming, melting, and warming steps.  
**Question card story-science connection - exact player copy:** Phase-change energy delays the thermal signal and helps establish which event occurred first.  
**Question card prompt - exact player copy:** Order the energy steps.  
**Cards:** `Warm solid ice to its melting point` / `Melt ice at constant temperature using q = n Delta Hfus` / `Warm liquid water to final temperature`.  
**Correct order:** As listed.  
**Why:** Temperature rises within one phase, but during melting the added energy breaks intermolecular organization while temperature stays constant. Treating the plateau as `mc Delta T` invents a temperature change that does not occur.  
**State/output:** Model predicts a delayed warm return pulse reaching Cold End.

## Stop 28 - Close the reactor-radiator energy ledger

**Format/placement:** `BALANCE`, at `phase-radiator` (calculation/room at Cold End).  
**Metadata:** energy conservation; COMBINE; L3; reveal.  
**Question card story setup - exact player copy:** At the dusty radiator, place every measured energy stream into the reactor ledger and find the unremoved remainder.  
**Question card story-science connection - exact player copy:** Unremoved heat can form the inlet hot spot that made Herrera lower the set point.  
**Scene/data:** During one interval the reactor releases `16.5 MJ`; coolant removes `11.4 MJ`; the metal bed stores `1.6 MJ`; product gas carries `0.8 MJ`. A hidden term closes the ledger.  
**Question card prompt - exact player copy:** Find the unremoved energy and identify the operational consequence.  
**Correct result:** `2.7 MJ` remains unaccounted in the simplified removal paths and accumulates as a hot-spot/structure load.  
**Why:** Energy generated must be removed, carried away, stored, or accumulated elsewhere. `16.5 - 11.4 - 1.6 - 0.8 = 2.7 MJ`. The radiator degradation appears before Herrera's override; lowering the set point reduced heat generation after removal capacity fell.  
**Wrong-path feedback:** Do not count released heat and coolant gain on the same side; do not interpret missing energy as destroyed.  
**State/output:** Set `evidence_flags.radiator_first = true` and `evidence_flags.setpoint_changed = true`; display Herrera's signed override timestamp.

## Mission outcome

The override is real: Herrera lowered the reactor temperature. But the energy ledger also proves the cooling system weakened first. Sundqvist says a cautious engineer may still have caused the production collapse. Herrera answers, "Then test whether the change caused only the collapse, or prevented something worse." The mission converts suspicion into a testable causal question.

## Quick concept review

- Negative Delta H means the reaction releases heat.
- `q = mc Delta T`; signs depend on the named system.
- Phase-change energy can enter while temperature stays constant.
- Energy ledgers include removal, transport, storage, and accumulation.
- Timing matters: radiator loss before the override changes the story of motive.

# Mission 8 - The Override

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 8 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE OVERRIDE
**Go now:** Go to Plant Control and meet Commander Abiola at the initial-rate board.
**Card body:** Herrera admits changing the set point, and the reactor slowed afterward. Prove exactly what the change did and verify who made it. Do not confuse evidence of an action with evidence of a motive. Abiola must decide whether to return control to him before the next production run.
**Objective:** Establish the rate effect, the causal link, and the verified log trail.
**Failure means:** A mistaken judgment puts the reactor or the launch schedule in the wrong hands.
**Later travel:** The Sabatier Reactor waypoint unlocks after Stop 30 for the controlled temperature reversal.

## Designer intent - not shown to player

Plant Control supplies historical initial-rate data. Reactor Hall allows a reversible controlled test. The player confirms that temperature affects rate while concentration is held fixed, and authenticates the override against independent records. The apparent case against Herrera becomes stronger immediately before it will be overturned.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Plant Control | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Three initial-rate trials appear beside Herrera's signed override. Dialogue bubbles - Abiola: "We know the temperature changed and production later fell. Determine exactly how the reaction responds, then reproduce the effect while every other condition is held fixed."

**Unlocks:** Stop 29 at the rate board; Stop 30 unlocks immediately after Stop 29.

**Beat 2 - After Stops 29 and 30 | rate board | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The rate law locks as rate = k[CO2][H2]^2 and k displays as 0.300 M^-2 s^-1. Dialogue bubbles - Sundqvist: "Hydrogen dilution hurts twice in the rate law. Now isolate temperature at the reactor." Panel/HUD text: CONTROLLED REVERSAL AUTHORIZED.

**Unlocks:** The Sabatier Reactor waypoint and Stop 31.

**Beat 3 - After Stop 31 | Sabatier Reactor | automatic causal result**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Lower temperature reduces rate; restoring temperature restores the immediate rate response while feed, pressure, and flow remain fixed. Panel/HUD text: TEMPERATURE CHANGE CAUSES RATE CHANGE / RESPONSE REVERSIBLE. Dialogue bubbles - Abiola: "The override caused the immediate slowdown. That proves the effect, not the motive."

**Unlocks:** Stop 32 at the verification panel.

**Beat 4 - After Stop 32 | verification panel | automatic character beat**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Badge record, controller log, and independent temperature sensor align; the handwritten note remains unverified. Dialogue bubbles - Abiola: "Herrera made the change. The hardware changed when the signed log says it did." Herrera: "Then inspect the bed before you decide whether I should have left it hot."

**Unlocks:** The Mission 8 outcome beat.

**Beat 5 - Mission outcome and hook | reactor overlook | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A single average-temperature number splits into INLET, MIDDLE, and OUTLET blanks. Dialogue bubbles - Herrera: "A catalyst bed does not have one temperature. An average can hide the point that destroys it." Sundqvist: "Then we probe from front to back before restart." Panel/HUD text: NEXT DESTINATION - CATALYST BAY.

**Unlocks:** Mission 9 briefing and the Catalyst Bay waypoint.

## Location plan

**Two locations:** Plant Control (`GIBBS`) for Stops 29-30 and 32; Reactor Hall (`EQUIL`) for Stop 31. The rate model predicts a reversible test, sending the player to the reactor, then the test sends them back to authenticate who changed the setting.

## Characters and dramatic beat

Abiola removes Herrera's control access pending review. Herrera cooperates without defending his motive. Sundqvist helps the player design the fair rate comparison, showing that her pressure for output does not make her anti-science.

## Key concepts, explained here

A rate law is determined from experiments: `rate = k[A]^m[B]^n`. Coefficients do not generally supply reaction orders. Compare trials where one concentration changes and the other is held constant. The rate constant `k` depends on temperature. A controlled experiment changes one factor, holds others fixed, and reverses the change to separate causation from drift. A record proves an action only when identity and timing are independently verified.

## Stop 29 - Read the initial-rate table

**Format/placement:** `CHOICE`, asked by Sundqvist at `ledger`.  
**Metadata:** experimental rate laws; INTRODUCE; L2; obstacle.  
**Question card story setup - exact player copy:** Use three initial-rate trials to determine how rate depends on carbon dioxide and hydrogen concentration.  
**Question card story-science connection - exact player copy:** The rate law predicts how strongly hydrogen dilution could cut methane production.  
**Data:** Trial 1 `[CO2]=0.10 M`, `[H2]=0.20 M`, rate `1.20e-3 M/s`; Trial 2 `[CO2]=0.20`, `[H2]=0.20`, rate `2.40e-3`; Trial 3 `[CO2]=0.10`, `[H2]=0.40`, rate `4.80e-3`.  
**Question card prompt - exact player copy:** Which rate law fits?  
**Choices:** `rate = k[CO2][H2]^2` **(correct)** / `k[CO2]^2[H2]` / `k[CO2][H2]` / `k[CO2]^2[H2]^4`.  
**Correct result:** First order in CO2 and second order in H2.  
**Why:** Doubling CO2 at fixed H2 doubles rate, so exponent 1. Doubling H2 at fixed CO2 quadruples rate, so exponent 2. Overall order is 3.  
**Wrong-path feedback:** Do not copy balanced-equation coefficients; isolate one changing concentration at a time.  
**State/output:** Rate-law card added to case file.

## Stop 30 - Calculate k

**Format/placement:** `BALLPARK`, at Plant Control calculation board.  
**Metadata:** rate constant/units; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** Substitute one trial into the rate law and calculate the rate constant with units.  
**Question card story-science connection - exact player copy:** A valid rate constant lets the crew predict the rate change instead of arguing from the timing alone.  
**Question card prompt - exact player copy:** Use Trial 1 and `rate = k[CO2][H2]^2` to find `k`.  
**Formula:** `k = 1.20e-3 / [(0.10)(0.20)^2]`.  
**Correct result:** `0.300 M^-2 s^-1`; tolerance ±2%.  
**Why:** The concentration product is `0.0040 M^3`, so `k = (1.20e-3 M/s)/(0.0040 M^3) = 0.300 M^-2 s^-1`. Substituting another trial should reproduce the same k at the same temperature.  
**Wrong-path feedback:** A unit of `s^-1` belongs to a first-order law, not this one.  
**State/output:** Predicts the rate drop expected from reduced temperature for Stop 31.

## Stop 31 - Establish causation by reversal

**Format/placement:** `CONTROL`, operated at `skid`.  
**Metadata:** temperature and rate; APPLY; L3; character.  
**Question card story setup - exact player copy:** Hold feed, pressure, and flow fixed; change temperature; then restore it and repeat the rate measurement.  
**Question card story-science connection - exact player copy:** The reversal proves the lower set point caused the immediate slowdown, while leaving the safety motive open.  
**Control truth:** temperature. Baseline rate index `100`; at 540 K response `72`; restore 560 K response `100` with noise ±2. Other variable changes are invalid because they change reactant availability or residence conditions.  
**Question card prompt - exact player copy:** Which controlled change demonstrates that the override caused the immediate rate loss, and does the response reverse?  
**Correct result:** Lower temperature alone, observe rate fall, restore temperature, observe rate return.  
**Why:** Reversal makes drift less plausible. The result proves the lower set point reduced reaction rate. It does not prove whether lowering it was unnecessary, because the short test does not recreate the developing thermal condition.  
**Wrong-path feedback:** Changing flow or concentration confounds the intended causal question. A one-way change without restoration cannot separate intervention from drift.  
**State/output:** Set `evidence_flags.override_caused_rate_drop = true`.

## Stop 32 - Verify who changed it

**Format/placement:** `ATTEST`, asked at Abiola with a limited evidence budget (decision/person).  
**Metadata:** verification/chain of custody; APPLY; L3; reveal.  
**Question card story setup - exact player copy:** Spend three checks to verify identity, timing, and the physical temperature change.  
**Question card story-science connection - exact player copy:** The crew must distinguish proof that Herrera acted from assumptions about why he acted.  
**Claims/evidence options:** Badge log (places Herrera at Reactor Hall); controller audit with cryptographic user ID and timestamp; handwritten maintenance note; independent temperature historian; colleague's memory. Budget permits three checks.  
**Correct result:** Controller audit + independent temperature historian establish the change and time; badge log supports presence. The note and memory alone are insufficient.  
**Why:** A record of access is not a record of the physical condition, and a physical trace without identity does not name the actor. Independent identity and condition records together verify the claim.  
**Wrong-path feedback:** Spending only on repeated access evidence proves presence several times but not the temperature change.  
**State/output:** `herrera_access_suspended = true`; case file reads `ACTION VERIFIED / MOTIVE OPEN`.

## Mission outcome

The player proves Herrera changed the temperature and that the change cut rate. Abiola asks whether the old setting should be restored. Herrera says only that a catalyst-bed temperature is not one number; the inlet and outlet can disagree. Sundqvist proposes probing the bed before restart. The story reaches its strongest apparent accusation with the motive still unresolved.

## Quick concept review

- Reaction orders come from controlled rate data, not usually coefficients.
- Doubling-response patterns reveal exponents in a rate law.
- Units of k depend on overall order.
- Control one variable and reverse it to establish a causal response.
- Verification may require separate evidence for identity, timing, and physical condition.

# Mission 9 - The Catalyst Bed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 7 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE CATALYST BED
**Go now:** Go to Catalyst Bay and meet Tomas Herrera at the bed-sampling rail.
**Card body:** Before the old settings are restored, the catalyst bed must be checked from inlet to outlet. A poisoned bed can waste hydrogen; a hidden hot spot can destroy the reactor. Determine whether the failure is uniform and test the damaged catalyst itself. The last reliable production path home depends on this bed.
**Objective:** Diagnose the spatial catalyst failure and confirm it with an independent assay.
**Failure means:** The crew restarts a damaged reactor or replaces the wrong component.
**Later travel:** The Assay Lab waypoint unlocks after Stop 35, when a catalyst sample must be tested independently.

## Designer intent - not shown to player

Catalyst Bay provides the physical bed and log; Assay Lab tests a withdrawn sample. The player distinguishes catalyst effects from equilibrium, builds a mechanism, probes the temperature/conversion pattern, and diagnoses the most immediate bed problem. The diagnosis explains lost activity yet leaves a deeper thermal question for the holdout test.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Catalyst Bay | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The average reactor temperature glows green while unsampled inlet and outlet ports pulse gray. Dialogue bubbles - Herrera: "A green average does not clear a hot inlet. Determine what a catalyst can change, then find where this bed stops behaving normally."

**Unlocks:** Stop 33 at the mechanism console; Stop 34 unlocks immediately after Stop 33.

**Beat 2 - After Stops 33 and 34 | mechanism console | automatic response**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The catalyst is shown being consumed and regenerated through the mechanism; equilibrium and enthalpy indicators remain unchanged. Dialogue bubbles - Herrera: "A fresh catalyst can restore a path, not change the final balance or the heat of reaction. Now probe the real bed."

**Unlocks:** Stop 35 at the bed sampling rail.

**Beat 3 - After Stop 35 | bed sampling rail | automatic spatial discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Inlet temperature and halide signal spike while conversion falls first at the front of the bed. Panel/HUD text: FAILURE IS NOT UNIFORM / INLET-FIRST DAMAGE. Dialogue bubbles - Sundqvist: "That looks like catalyst poison. Send a sample to Achebe."

**Unlocks:** The Assay Lab waypoint and Stop 36.

**Beat 4 - After Stop 36 | Assay Lab | automatic diagnosis**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The independent surface assay confirms halide contamination. A separate historic inlet reading of 612 K appears beside the result. Dialogue bubbles - Achebe: "The catalyst is damaged. The assay does not explain why the inlet reached 612 kelvin before the override."

**Unlocks:** The Mission 9 outcome beat.

**Beat 5 - Mission outcome and hook | Assay Lab | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Sundqvist marks REPLACE CATALYST; Herrera marks EXPLAIN HIDDEN HOT SPOT. Abiola starts a final model review timer. Dialogue bubbles - Sundqvist: "We found the failure. Restore the old point after replacement." Herrera: "Only if your model predicts the run you never showed." Abiola: "Freeze the model. Reveal the hidden data." Panel/HUD text: NEXT TEST - HOLDOUT THERMAL RUN.

**Unlocks:** Mission 10 briefing and the Sabatier Reactor waypoint.

## Location plan

**Two locations:** Catalyst Bay (`KINET`) for Stops 33-35, then Assay Lab (`ASSAY`) for Stop 36. The nonuniform probe result causes a sample to be withdrawn and sent for assay.

## Characters and dramatic beat

Sundqvist and Herrera work side by side despite mutual suspicion. Achebe refuses to call the catalyst poisoned until the sample itself is tested. Herrera's concern shifts from defending himself to protecting the team from a premature restart.

## Key concepts, explained here

A catalyst supplies a lower-activation-energy pathway, increasing rate in both directions. It does not change reaction enthalpy, equilibrium constant, or equilibrium composition. A mechanism is a sequence of elementary steps; an intermediate is made then consumed, and a catalyst is consumed then regenerated. The slow step often controls the observed rate. Poisoning blocks active sites and can create a spatial pattern where contaminant arrives first.

## Stop 33 - What a catalyst can and cannot change

**Format/placement:** `CHOICE`, asked by Sundqvist at `charge-bench`.  
**Metadata:** catalysis; INTRODUCE; L1; obstacle.  
**Question card story setup - exact player copy:** A fresh catalyst can replace the damaged one without changing temperature or pressure. Identify what that replacement can change.  
**Question card story-science connection - exact player copy:** The answer determines whether a new bed can restore speed or move the equilibrium ceiling.  
**Question card prompt - exact player copy:** A fresh catalyst replaces the old one at the same temperature, pressure, and feed. What changes?  
**Choices:** `The reaction reaches the same equilibrium composition faster because activation energy is lower` **(correct)** / `K increases and more methane exists at equilibrium` / `Delta H becomes more negative` / `Only the forward reaction speeds up`.  
**Why:** Catalysts speed both forward and reverse pathways and leave thermodynamic state functions and K unchanged.  
**Wrong-path feedback:** More activity is not a new equilibrium; Delta H depends on initial/final states.  
**State/output:** Qualify catalyst concept before mechanism rail.

## Stop 34 - Build the surface mechanism

**Format/placement:** `SEQUENCE`, at `bed-log` mechanism rail.  
**Metadata:** mechanisms/intermediates/RDS; PRACTICE; L3; clue.  
**Question card story setup - exact player copy:** Assemble the simplified nickel-surface mechanism and identify the catalyst, intermediate, and slow step.  
**Question card story-science connection - exact player copy:** The mechanism explains how contamination at the inlet can remove productive reaction sites.  
**Cards:** `CO2 and H2 adsorb on free Ni sites` / `surface intermediates form in the slow conversion step` / `CH4 and H2O desorb` / `free Ni sites are regenerated`.  
**Question card prompt - exact player copy:** Order the simplified mechanism and identify the catalyst and intermediate.  
**Correct result:** Order as listed; Ni surface sites are catalyst, surface species are intermediates, slow conversion is rate-determining.  
**Why:** The catalyst participates but reappears; the intermediate appears in one step and is consumed later, so neither appears in the net equation. Blocking free sites reduces the number of productive events.  
**Wrong-path feedback:** Desorption cannot precede product formation; calling methane an intermediate confuses final product with transient species.  
**State/output:** Unlock axial probe.

## Stop 35 - Sample the bed from inlet to outlet

**Format/placement:** `PROBE`, at bed ports (operated/fixture).  
**Metadata:** spatial diagnosis; COMBINE; L3; clue.  
**Question card story setup - exact player copy:** Probe temperature, conversion, and halide signal from the inlet to the outlet of the bed.  
**Question card story-science connection - exact player copy:** Where the pattern first breaks separates inlet poisoning from a uniform reactor failure.  
**Stations:** inlet 0 m: `612 K`, conversion 18%, halide signal high; middle: `585 K`, cumulative conversion 48%, halide medium; outlet: `563 K`, cumulative conversion 55%, halide low. Expected clean pattern peaks below `590 K` with conversion rising smoothly to 70%.  
**Question card prompt - exact player copy:** Probe every station and name where the pattern first breaks.  
**Correct result:** Inlet end: high temperature and halide exposure with depressed local activity; pattern is nonuniform.  
**Why:** Feed contaminant reaches the inlet first, so poisoning can start there. The inlet hot spot also matters: exothermic reaction and poorer heat removal can make the front hotter than the average. An average outlet reading hides it.  
**Wrong-path feedback:** Naming the outlet because total conversion is low ignores where the abnormal profile begins.  
**State/output:** Set `evidence_flags.inlet_hotspot = true`; withdraw inlet sample.

## Stop 36 - Diagnose the immediate bed failure

**Format/placement:** `DIAGNOSIS`, at `spec-bench` in Assay Lab (calculation/room).  
**Metadata:** catalyst poisoning vs operating limits; APPLY; L4; apparent resolution.  
**Question card story setup - exact player copy:** Combine the bed profile with the independent surface assay and select the immediate failure that fits every reading.  
**Question card story-science connection - exact player copy:** The crew needs to know whether replacing catalyst is necessary before testing the dangerous old setting.  
**Readings:** inlet sample has halide on Ni surface; fresh-sample surface area normal; loop pressure normal; H2 composition restored for test; inlet activity depressed; downstream activity less depressed; strong temperature gradient.  
**Choices:** `Halide poisoning concentrated at the inlet` **(correct immediate diagnosis)** / `Uniform thermal sintering` / `Insufficient H2 during this controlled test` / `Equilibrium pressure too low`.  
**Why:** The surface assay and inlet-first loss fit poisoning. Uniform sintering would reduce activity throughout; current H2 and pressure are controlled normal. The hot gradient is real but is not explained away—it becomes the safety question for Mission 10.  
**State/output:** Mark `catalyst_inlet_poisoned = true`; apparent story verdict: old settings plus poisoned inlet caused collapse.

## Mission outcome

The sample proves real catalyst damage. To Sundqvist, the case is closed: Herrera lowered temperature when the correct fix was to replace contaminated catalyst. Herrera asks why the inlet reached 612 K before the override and why the average historian never showed it. Abiola grants one final model test before ordering the old operating point restored.

## Quick concept review

- Catalysts lower activation energy and speed approach to equilibrium.
- Catalysts do not change K, Delta H, or the equilibrium composition.
- Intermediates are formed then consumed; catalysts are regenerated.
- Spatial patterns distinguish inlet-first poisoning from uniform deactivation.
- A correct immediate diagnosis can still leave a deeper causal or safety problem.

# Mission 10 - The Saboteur

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 6 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE SABOTEUR
**Go now:** Go to the Sabatier Reactor and meet Commander Abiola at the holdout-model display.
**Card body:** Visible records make Herrera look responsible for the production collapse. One thermal dataset was not shown when that model was built. Freeze the accusation, test it on the hidden run, and determine whether the old setting stays safe under sensor error. A wrong verdict could order the crew to restart the condition that nearly destroyed the plant.
**Objective:** Test the accusation against unseen data and reconstruct Herrera’s motive.
**Failure means:** The crew restores an unsafe operating point and may lose the reactor.
**Later travel:** Plant Control unlocks after Stop 39 for the final reconstruction of Herrera's actions and motive.

## Designer intent - not shown to player

Reactor Hall hosts the model tests; Plant Control hosts the human reconstruction. HOLDOUT prevents the narrative from changing answers arbitrarily: the accusation fits training data and fails unseen data. RESIDUAL reveals a structured miss at the safety boundary; STRESS shows that even modest sensor error makes the old setting unsafe. CASEBOOK reconstructs Herrera's knowledge and motive.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Sabatier Reactor | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A case board reads HERRERA OVERRIDE -> PRODUCTION COLLAPSE. One dataset remains sealed beneath NOT USED IN FIT. Dialogue bubbles - Abiola: "The accusation fits the records everyone saw. It must also predict the record nobody used to build it."

**Unlocks:** Stop 37 at the holdout-model display; Stop 38 unlocks immediately after Stop 37.

**Beat 2 - After Stops 37 and 38 | model display | automatic reversal**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The accusation model fails on the hidden run, with residual arrows pointing the same direction during the hottest inlet periods. Panel/HUD text: MODEL MISSES DANGER AT THE SAFETY BOUNDARY. Dialogue bubbles - Achebe: "Its average error looked small because safe runs outnumbered dangerous ones. The failure is patterned exactly where it matters."

**Unlocks:** Stop 39 at the uncertainty panel.

**Beat 3 - After Stop 39 | uncertainty control | automatic safety decision**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: A +/-5% sensor-bias slider pushes the old operating point across the red heat limit while the lower-temperature point retains margin. Dialogue bubbles - Abiola: "The old point is not safe across the sensor's allowed error. It will not be restored."

**Unlocks:** The Plant Control waypoint and Stop 40.

**Beat 4 - After Stop 40 | Plant Control chronology wall | automatic Twist 2**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The player locks the order RADIATOR LOSS -> INLET HOT SPOT -> OVERRIDE -> PURGE -> PRODUCTION FALL. Panel/HUD text: OVERRIDE WAS A SAFETY RESPONSE. Dialogue bubbles - Herrera: "I cut production because the inlet was running away." Abiola: "You prevented a reactor failure. You also withheld an incomplete warning. Both facts stand."

**Unlocks:** The Mission 10 outcome beat.

**Beat 5 - Mission outcome and hook | Plant Control | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: SABOTAGE is removed from Herrera's profile; SAFETY INTERVENTION and FAILED COMMUNICATION replace it. The production clock continues counting down. Dialogue bubbles - Sundqvist: "The safe setting will not make methane fast enough." Herrera, opening the equilibrium display: "Faster is not the same as more." Panel/HUD text: NEXT ROUTE - REACTOR -> COLD END -> PLANT CONTROL.

**Unlocks:** Mission 11 briefing and the Sabatier Reactor waypoint.

## Location plan

**Two locations:** Reactor Hall (`EQUIL`) for Stops 37-39, then Plant Control (`GIBBS`) for Stop 40. Model failure creates the need to compare records and testimony at command.

## Characters and dramatic beat

Herrera remains excluded from controls and cannot manipulate the test. Sundqvist watches the unseen record fail her preferred model and is the first to say, "Do not restore it." Abiola restores Herrera's access only after the player reconstructs his decision.

## Key concepts, explained here

A model can overfit observations used to build it. A holdout dataset tests prediction on unseen evidence. Residuals are observed minus predicted values; a small average error can hide a dangerous patterned miss. Stress testing moves assumptions through reasonable ranges to see whether a decision survives. Causal timing and mechanism turn an action into an understood motive.

## Stop 37 - Freeze the accusation and reveal the holdout

**Format/placement:** `HOLDOUT`, operated at `analyser`.  
**Metadata:** model validation; INTRODUCE; L4; reversal.  
**Question card story setup - exact player copy:** Fit the production-collapse explanations to visible runs, freeze the model, and reveal the hidden thermal interval.  
**Question card story-science connection - exact player copy:** If the accusation cannot predict unseen danger, it cannot justify restarting the reactor.  
**Fit data:** eight normal intervals where outlet-average temperature predicts methane rate well. Candidate model A says lower set point alone explains lost production; model B includes inlet hot-spot risk when heat rejection falls.  
**Holdout:** three intervals hidden during fitting. At interval 2, radiator capacity falls; inlet reaches `618 K` while outlet average stays `569 K`; purge interlock opens; model A predicts safe operation and high output, model B predicts intervention.  
**Correct result:** Freeze and choose model B after holdout; model A fails unseen safety behavior.  
**Why:** A beautiful fit to visible data is not enough. The withheld interval contains the regime that matters: degraded cooling and a spatial gradient. Herrera's override is predicted by the safety model.  
**Wrong-path feedback:** Refitting after seeing the holdout must be blocked; the point is honest prediction.  
**State/output:** Set `evidence_flags.accusation_model_failed = true`.

## Stop 38 - Refuse the lowest average error

**Format/placement:** `RESIDUAL`, operated at the analyzer residual field.  
**Metadata:** residual structure; PRACTICE; L4; clue.  
**Question card story setup - exact player copy:** Compare the residual fields of the two models, including the runs nearest the heat limit.  
**Question card story-science connection - exact player copy:** A small average error is unsafe if the model always misses in the same dangerous direction.  
**Models:** A RMS error `2.1` but residuals jump to `+12,+15,+14 K` during low radiator capacity; B RMS `2.8` with residuals scattered `-4` to `+4 K` and no pattern.  
**Question card prompt - exact player copy:** Choose the model whose residual field is defensible for safety.  
**Correct result:** Model B.  
**Why:** Model A's lower overall RMS is purchased by systematic underprediction exactly where a safety limit matters. Residual structure means missing physics, not random noise. Model B is slightly less precise overall and far more valid in the dangerous regime.  
**State/output:** Highlight spatial heat-removal term missing from model A.

## Stop 39 - Stress the hidden temperature error

**Format/placement:** `STRESS`, asked by Sundqvist at the reactor console (decision/person).  
**Metadata:** uncertainty and safety margin; COMBINE; L4; decision.  
**Question card story setup - exact player copy:** Move the inlet-sensor bias from -5% to +5% and watch both operating points cross or clear the safety line.  
**Question card story-science connection - exact player copy:** The old setting is defensible only if it stays safe across the sensor’s allowed error.  
**Assumption slider:** inlet thermocouple bias from `-5%` to `+5%`; old operating point safety limit `620 K`; observed peak `612 K`; validated lower point observed peak `575 K`.  
**Question card prompt - exact player copy:** Does the decision to restore the old point survive allowed sensor error?  
**Correct result:** No. If the sensor reads 2% low, actual peak is about `624 K`, already above limit; at -5% actual is about `644 K`. The lower point remains below limit across the range.  
**Why:** A setting is not safe because its central estimate lies eight kelvin below a limit. The uncertainty range crosses the consequence boundary. Robust operation needs margin.  
**State/output:** Sundqvist withdraws restoration request; `reactor_safety_margin + 20` for lower point.

## Stop 40 - What did Herrera know, and when?

**Format/placement:** `CASEBOOK`, asked by Abiola in Plant Control (decision/person).  
**Metadata:** evidence synthesis; TRANSFER; L4; payoff.  
**Question card story setup - exact player copy:** Reconstruct the order: radiator loss, hidden hot spot, override, purge, and production fall.  
**Question card story-science connection - exact player copy:** The same action looks like sabotage or protection depending on the scientifically established causal order.  
**Scenarios:** `Radiator capacity fell` / `inlet thermocouple rose while average stayed normal` / `Herrera lowered set point` / `purge interlock opened` / `production fell`.  
**Choices/mapping:** `cause of shrinking heat removal` / `hidden hot spot evidence` / `deliberate safety intervention` / `protective consequence` / `cost of the intervention`; mapping `[0,1,2,3,4]`.  
**Correct result:** Full mapping.  
**Why:** Herrera did the suspicious action. The evidence changes its meaning: the override followed a degrading safety condition and prevented the predicted consequence. Production collapse is real and is evidence that the response worked.  
**State/output:** `twist_2_complete = true`; restore Herrera's access; `herrera_trust + 3`, `crew_trust + 1`.

## Mission outcome

Abiola clears Herrera of sabotage and reprimands him for withholding an incomplete warning. He accepts both decisions. The crew cannot simply restore the old high-temperature setting, even though it would make methane faster. Herrera turns to the equilibrium display: "Faster is not the same as more." The next mission asks for an operating point that respects both rate and final composition.

## Quick concept review

- Holdout data tests whether a model predicts evidence it did not fit.
- Residual patterns can reveal missing mechanisms even when average error is low.
- Stress testing asks whether uncertainty crosses a decision boundary.
- Safety requires margin, not merely a best estimate below the limit.
- A fair character reversal keeps the action true and changes its scientifically supported meaning.

# Mission 11 - Fast Is Not the Same as More

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 5 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** FAST IS NOT THE SAME AS MORE
**Go now:** Go to the Sabatier Reactor and meet Tomas Herrera at the equilibrium board.
**Card body:** The safe reactor setting makes methane more slowly than the old one. The crew needs an operating point that produces enough fuel before launch without crossing the heat limit. Separate reaction speed from equilibrium yield, then use pressure and product removal to improve the result. This is the first plan that must work across several parts of the plant at once.
**Objective:** Choose an operating point that satisfies rate, yield, and thermal safety.
**Failure means:** The plant either falls short of fuel or crosses the reactor heat limit.
**Later travel:** The Cold End unlocks after Stop 42; Plant Control unlocks after Stop 43 for the operating-plan decision.

## Designer intent - not shown to player

This is the first three-location mission and the campaign's conceptual hinge. Reactor Hall introduces K, Q, and ICE reasoning; Cold End demonstrates product removal; Plant Control compares complete operating plans. The player learns that kinetics determines how quickly the system moves while equilibrium determines the composition it approaches.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Sabatier Reactor | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The safe operating point sits below the thermal limit but behind the methane schedule. Dialogue bubbles - Herrera: "Temperature changes how quickly we move. Equilibrium determines where the reaction can finish. We need a plan that satisfies both."

**Unlocks:** Stop 41 at the equilibrium board; Stop 42 unlocks immediately after Stop 41.

**Beat 2 - After Stops 41 and 42 | equilibrium board | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The equilibrium expression and completed ICE table reveal the methane-yield ceiling at the current condition. Dialogue bubbles - Herrera: "Raising temperature may speed this exothermic reaction while lowering its equilibrium methane yield. Look for a different lever."

**Unlocks:** The Cold End waypoint and Stop 43.

**Beat 3 - Travel and after Stop 43 | Cold End | automatic experiment**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Cho removes product water at fixed temperature; methane conversion rises, then returns when the baseline is restored. Panel/HUD text: PRODUCT REMOVAL INCREASES CH4 YIELD WITHOUT RAISING TEMPERATURE. Dialogue bubbles - Cho: "The separator can pull the reaction forward and return that water to the plant."

**Unlocks:** The Plant Control waypoint and Stop 44.

**Beat 4 - After Stop 44 | Plant Control | automatic integrated decision**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Two equal-rate plans appear. Thermal margin and equilibrium yield eliminate the hotter plan. Panel/HUD text: VALIDATED PLAN - LOWER TEMPERATURE / HIGHER PRESSURE / PRODUCT WATER REMOVAL. Dialogue bubbles - Abiola: "One plan. One set of limits. Reactor, separator, and control room sign together."

**Unlocks:** The Mission 11 outcome beat.

**Beat 5 - Mission outcome and hook | Plant Control | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Herrera and Sundqvist sign the same operating card. Demir overlays the power required for compression, cooling, and separation. Dialogue bubbles - Demir: "This plan can make the fuel. It also spends power in three places, and its hydrogen still comes from recycled water." Abiola: "Then we stop treating the plant like separate rooms." Panel/HUD text: NEXT ROUTE - ICE CUT -> WATER PLANT -> ELECTROLYSIS HALL.

**Unlocks:** Mission 12 briefing and the Ice Cut waypoint.

## Location plan

**Three locations:** Reactor Hall (`EQUIL`) for Stops 41-42; Cold End (`PHASE`) for Stop 43; Plant Control (`GIBBS`) for Stop 44. The ICE result suggests product removal, causing the Cold End visit; the perturbation data creates two degenerate plans that require command comparison.

## Characters and dramatic beat

Herrera explains the ceiling; Sundqvist explains the clock; Cho turns water removal into an operating lever. Their former argument becomes a division of expertise. Abiola requires one plan, not three isolated recommendations.

## Key concepts, explained here

For `CO2(g) + 4H2(g) <=> CH4(g) + 2H2O(g)`, `Kc = [CH4][H2O]^2 / ([CO2][H2]^4)`; pure solids and liquids would be omitted. An ICE table tracks initial amounts, stoichiometric changes, and equilibrium amounts. Q has the same form as K using current conditions: Q<K moves forward, Q>K moves backward. Pressure favors the side with fewer gas moles; removing product pulls forward; for this exothermic reaction, higher temperature lowers equilibrium methane yield even while it raises rate.

## Stop 41 - Build the equilibrium expression

**Format/placement:** `CHOICE`, asked by Herrera at `equil-stub`.  
**Metadata:** equilibrium expressions; INTRODUCE; L2; obstacle.  
**Question card story setup - exact player copy:** Choose the equilibrium expression for the gas-phase Sabatier reaction.  
**Question card story-science connection - exact player copy:** The expression defines the methane-water balance the safer operating plan must reach.  
**Question card prompt - exact player copy:** Which Kc expression matches the gas-phase Sabatier equation?  
**Choices:** `[CH4][H2O]^2 / ([CO2][H2]^4)` **(correct)** / `[CH4][H2O] / [CO2][H2]` / `[CO2][H2]^4 / [CH4][H2O]^2` / `[CH4]^1[H2O]^2 - [CO2]^1[H2]^4`.  
**Why:** Coefficients become exponents; products are over reactants; equilibrium expressions multiply activities rather than subtracting concentrations.  
**Wrong-path feedback:** The written equation supplies powers, not rate-law orders; here it is valid because this is K, not a kinetic rate law.  
**State/output:** Unlock ICE board.

## Stop 42 - Complete the ICE table

**Format/placement:** `BALANCE`, at the Reactor Hall ICE board (calculation/room).  
**Metadata:** ICE stoichiometry; PRACTICE; L3; clue.  
**Question card story setup - exact player copy:** Use the measured methane concentration to complete every row of the ICE table and calculate the equilibrium constant.  
**Question card story-science connection - exact player copy:** The equilibrium ceiling tells the crew how much methane is possible after the reaction has enough time.  
**Data:** In a 1.00 L model vessel, initial `[CO2]=1.00 M`, `[H2]=4.00 M`, products zero. Measured equilibrium `[CH4]=0.60 M`.  
**Question card prompt - exact player copy:** Complete changes and equilibrium concentrations, then calculate Kc for this training condition.  
**Correct result:** Change `-0.60 CO2`, `-2.40 H2`, `+0.60 CH4`, `+1.20 H2O`; equilibrium `0.40`, `1.60`, `0.60`, `1.20 M`. `Kc=(0.60)(1.20)^2/[(0.40)(1.60)^4] = 0.329` (about 0.33).  
**Why:** Every change is tied to one reaction extent x and multiplied by coefficients. Hydrogen changes by `-4x`; water by `+2x`. The balanced row is the guardrail against treating each concentration independently.  
**Wrong-path feedback:** If H2 falls by 0.60, point to coefficient four. If water becomes 0.60, point to coefficient two.  
**State/output:** Model predicts that lowering product-water activity can drive more conversion.

## Stop 43 - Push the balance on purpose

**Format/placement:** `CONTROL`, operated at `coldline-tap` in Cold End.  
**Metadata:** Le Châtelier/Q vs K; COMBINE; L3; experiment.  
**Question card story setup - exact player copy:** At the Cold End, remove product water while temperature stays fixed, measure conversion, and restore the baseline.  
**Question card story-science connection - exact player copy:** Product removal can raise methane yield without recreating the dangerous high temperature.  
**Baseline:** conversion 60%. Variables: condense/remove water, add inert N2 at fixed volume, reduce volume/increase pressure. Player changes one, samples, restores.  
**Truth:** Removing water raises conversion to 68% and restoration returns toward 60%; compression raises to 65%; inert gas at fixed volume changes no reacting partial pressure and gives ~60%.  
**Question card prompt - exact player copy:** Use a controlled change to increase methane yield without raising temperature, then reverse it.  
**Correct result:** Remove product water (preferred) or compress within limit; demonstration expects water removal and reversal.  
**Why:** Removing a product lowers Q below K, so the reaction moves forward until Q=K again. The equilibrium constant at fixed temperature does not change. An inert gas at fixed volume raises total pressure but not component partial pressures.  
**State/output:** Cho approves enhanced condensate removal; `water_recycle_available = true`.

## Stop 44 - Two plans look equally fast

**Format/placement:** `DEGENERACY`, at Plant Control operating-point board (calculation/room).  
**Metadata:** kinetics vs equilibrium; TRANSFER; L4; decision.  
**Question card story setup - exact player copy:** Two temperature-pressure plans have the same immediate rate. Add equilibrium and thermal constraints.  
**Question card story-science connection - exact player copy:** Equal speed is not enough; the plan must also make sufficient methane and remain safe.  
**Candidate locus:** Plan A `575 K, 8 bar`; Plan B `550 K, 12 bar`. Both produce the same immediate rate index after catalyst replacement. Control sliders move along equal-rate combinations. Additional constraint: equilibrium methane fraction must exceed 70% and inlet peak must remain below 600 K.  
**Question card prompt - exact player copy:** Add the physical constraints that separate the equal-rate plans.  
**Correct result:** Plan B survives: lower temperature improves exothermic equilibrium and thermal margin; higher pressure favors three product gas moles over five reactant gas moles. Plan A violates equilibrium fraction and approaches heat limit.  
**Why:** Equal immediate rates do not imply equal final composition or safety. The extra physics collapses the degeneracy.  
**State/output:** Set `validated_operating_point = {T:550K,P:12bar}`; visible plan board turns amber, not green, pending loop and power checks.

## Mission outcome

For the first time, Sundqvist and Herrera sign the same plan. It should make adequate methane without recreating the hot spot. Then Demir points to its hidden cost: higher pressure, stronger cooling, and product removal all require power, while the hydrogen supply still depends on recycled water. The campaign zooms out from one reactor to the whole plant.

## Quick concept review

- K describes an equilibrium ratio at a particular temperature.
- ICE changes follow stoichiometric coefficients.
- Q<K drives forward; Q>K drives backward.
- Pressure, temperature, and product removal affect equilibrium in different ways.
- Kinetics sets speed; equilibrium sets the composition approached.

# Mission 12 - The Loop

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 4 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** THE LOOP
**Go now:** Go to the Ice Cut and meet Mina Cho beside the raw-brine intake.
**Card body:** The reactor, water system, and electrolyzer form one loop. Water made with methane should return and become new hydrogen, but the return stream is short. Follow the material through the Ice Cut, treatment plant, and electrolyzer until the whole-plant ledger closes. Without that recycle, the plant cannot make enough hydrogen or oxygen for the ascent.
**Objective:** Find the failed recycle link and restore the whole-plant hydrogen balance.
**Failure means:** The crew runs out of the gases needed to leave Mars.
**Later travel:** The Water Plant unlocks after Stop 45; Electrolysis Hall unlocks after Stop 47.

## Designer intent - not shown to player

At the Ice Cut, raw brine chemistry establishes what enters. At the Water Plant, the player chooses treatment and verifies an acid/base prediction. At Electrolysis Hall, a whole-plant hydrogen balance reveals that recycle-water loss, not mysterious H2 disappearance, causes the persistent shortage. Twist 1 remains true but becomes deeper.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Ice Cut | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The player stands beside the raw-brine intake while a whole-plant map leaves the recycle return line dark. Dialogue bubbles - Cho: "Ice becomes water, water becomes hydrogen, hydrogen becomes methane, and the reactor makes water again. Follow every transfer until the loop closes."

**Unlocks:** Stop 45 at the Ice Cut loop board.

**Beat 2 - After Stop 45 | Ice Cut chain board | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The material chain locks, and ELECTROLYSIS receives an EXTERNAL ENERGY marker. Dialogue bubbles - Demir: "The water can cycle. The energy cannot. First make sure the water reaching electrolysis is fit to use." Panel/HUD text: MOVE TO WATER PLANT.

**Unlocks:** The Water Plant waypoint and Stop 46; Stop 47 unlocks immediately after Stop 46.

**Beat 3 - After Stops 46 and 47 | Water Plant | automatic treatment verification**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The selected treatments remove particles and harmful dissolved ions; the commanded neutralization dose lands inside the predicted pH band. Dialogue bubbles - Achebe: "The treated stream now meets the electrolyzer limit. Release it and compare the amount that arrives with the amount the reactor returned."

**Unlocks:** The Electrolysis Hall waypoint and Stop 48.

**Beat 4 - After Stop 48 | Electrolysis Hall | automatic deeper reveal**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The whole-plant ledger exposes water held or lost before the next shift, making the following hydrogen run short. Panel/HUD text: HYDROGEN DID NOT DISAPPEAR / RECYCLE WATER FAILED TO RETURN ON TIME. Dialogue bubbles - Cho: "Our separator sent too much water away from the return path. The next shift began without the feed it was counting on."

**Unlocks:** The Mission 12 outcome beat.

**Beat 5 - Mission outcome and hook | Electrolysis Hall | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Cho reroutes recovered product water into the verified treatment-return line. Hydrogen and oxygen projections rise, then a dust-front warning drops available solar power. Dialogue bubbles - Cho: "The loop can close now." Demir: "If we can afford to run it. The dust front just cut the power budget." Panel/HUD text: NEXT ROUTE - SOLAR ARRAY -> BATTERY GALLERY -> ELECTROLYSIS HALL.

**Unlocks:** Mission 13 briefing and the Solar Array waypoint.

## Location plan

**Three locations:** Ice Cut (`CUT`) for Stop 45, Water Plant (`SOIL`) for Stops 46-47, Electrolysis Hall (`ELEC`) for Stop 48. The molecule's path is the route.

## Characters and dramatic beat

Cho and Achebe disagree over whether to prioritize dryness or ion removal. Demir reframes the argument: both failures ultimately appear as electrical and hydrogen cost. Herrera publicly admits that his reactor-only ledger missed the recycle connection.

## Key concepts, explained here

Coupled reactions can share intermediates; adding equations cancels species that are produced then consumed. Brine contains ions whose behavior depends on solubility and acid/base chemistry. Strong acids dissociate essentially completely in this course model; `pH=-log[H+]`. Neutralization consumes H+ and OH- stoichiometrically. A whole-system material balance includes stored inventory and recycle streams, not only fresh feed and final product.

## Stop 45 - Build the water-hydrogen-carbon loop

**Format/placement:** `CHAIN`, operated at the Ice Cut process-map fixture.  
**Metadata:** coupled stoichiometry; INTRODUCE; L3; obstacle.  
**Question card story setup - exact player copy:** Build the material path from Martian ice to purified water, electrolysis gases, reactor products, and recycled water.  
**Question card story-science connection - exact player copy:** The chain reveals which link must spend power and where water should return to keep launch production alive.  
**Links:** `Ice/brine -> purified H2O` / `2H2O -> 2H2 + O2 (electrolysis, energy input)` / `CO2 + 4H2 -> CH4 + 2H2O (Sabatier)` / `product H2O -> condenser/recycle tank`. Distractors: direct ice-to-methane arrow, oxygen-to-hydrogen arrow.  
**Question card prompt - exact player copy:** Build the closed material path and name the link that requires external energy.  
**Correct result:** Correct order; electrolysis is the driven link.  
**Why:** Sabatier returns water, but electrolysis must spend electrical energy to split it. Recycle reduces fresh-water demand; it does not make the cycle energy-free.  
**State/output:** Illuminate the site route; add `loop_map_complete`.

## Stop 46 - Match contaminants to treatment

**Format/placement:** `PROTOCOL`, at `columns` in Water Plant.  
**Metadata:** solutions/solubility; COMBINE; L3; experiment.  
**Question card story setup - exact player copy:** Match each contaminant with the treatment that removes it without wasting limited polishing capacity.  
**Question card story-science connection - exact player copy:** The wrong treatment can leave ions that damage electrolysis or spend the column on material the reactor already wants.  
**Scenarios:** suspended regolith fines / dissolved chloride and perchlorate ions / acidic recycle water with excess H+ / dissolved CO2 intended for reactor feed.  
**Choices:** particle filter / ion-exchange column / measured base neutralization / do not spend polishing capacity solely on it; mapping `[0,1,2,3]`.  
**Why:** Physical filters catch particles, not dissolved ions. Ion exchange targets charged solutes. Acid/base treatment is stoichiometric. Removing every measurable species is not automatically useful; treatment follows downstream consequence.  
**Wrong-path feedback:** Distinguish suspension from solution; dissolved ions pass a simple particle filter.  
**State/output:** Prepare neutralization test.

## Stop 47 - Predict, treat, measure

**Format/placement:** `VERIFY`, operated at `brinetank`.  
**Metadata:** strong acid/base stoichiometry and pH; INTRODUCE; L3; clue.  
**Question card story setup - exact player copy:** Predict the pH after the measured acid-base addition, command the dose, and check the tank.  
**Question card story-science connection - exact player copy:** Correct neutralization lets recycled water return without damaging the electrolyzer.  
**Data:** `100.0 mL` of `0.0100 M HCl` receives `90.0 mL` of `0.0100 M NaOH`; assume additive volumes.  
**Question card prompt - exact player copy:** Predict final pH, command addition, then measure.  
**Correct calculation:** initial H+ `0.00100 mol`; OH- `0.000900 mol`; excess H+ `0.000100 mol`; total volume `0.1900 L`; `[H+]=5.26e-4 M`; `pH=3.28`. Measured pH `3.30`.  
**Why:** Neutralization is a mole subtraction before a concentration or logarithm calculation. Equal molarities do not neutralize if volumes differ. The measurement agrees within instrument resolution.  
**Wrong-path feedback:** Averaging pH values is invalid; pH is logarithmic. Failing to measure after prediction does not complete VERIFY.  
**State/output:** Treatment controller is calibrated; recycled water accepted.

## Stop 48 - Close hydrogen over the whole plant

**Format/placement:** `BALANCE`, at `stack` accounting panel in Electrolysis Hall.  
**Metadata:** whole-system inventory; TRANSFER; L4; reveal.  
**Question card story setup - exact player copy:** Expand the ledger across electrolysis, storage, reactor use, venting, line inventory, and the next shift’s water supply.  
**Question card story-science connection - exact player copy:** The whole-plant boundary can reveal a recycle failure that looks like disappearing hydrogen inside one room.  
**Data:** Electrolysis makes `400 kmol H2`; store inventory falls by `20`; reactor consumes `360`; measured vents are `4`; line inventory rises by `6`. The next-shift schedule assumed `480 kmol H2` from electrolysis, which requires `480 kmol H2O`; only `400 kmol H2O` reached the stack.  
**Question card prompt - exact player copy:** Reconcile produced hydrogen and inventory, then identify why next-shift production falls.  
**Correct result:** Current H2 ledger: available `400 + 20 withdrawn = 420`; uses `360 + 4 + 6 = 370`, leaving `50 kmol` in reserve. No large unmeasured H2 loss exists. The scheduled next run is short because `80 kmol H2O` failed to return; the 1:1 H2O:H2 electrolysis ratio makes that an `80 kmol H2` production deficit.  
**Why:** The "missing hydrogen" is a timing and boundary error. Each room closes locally while the return stream fails between shifts. Expand the system boundary and include storage/recycle.  
**State/output:** Set `twist_1_deepened = true`; `water_recycle_restored = true`; raise projected H2 output.

## Mission outcome

The hydrogen was not vanishing. The plant was failing to return enough reactor water to the electrolyzer, so the following shift began short. Cho's product-removal change now does two jobs: it improves equilibrium and restores feed water. Demir warns that the recovered loop still needs electrical power the settlement does not have in unlimited supply.

## Quick concept review

- Coupled equations share and cancel intermediates.
- Recycle reduces fresh material demand but not necessarily energy demand.
- Filters remove particles; ion exchange removes selected dissolved ions.
- Neutralization requires moles first, then concentration, then pH.
- System boundaries and storage timing can create apparent missing material.

# Mission 13 - Power

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 3 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** POWER
**Go now:** Go to the Solar Array and meet Selin Demir at the live power meter.
**Card body:** The water loop can now make launch gases, but a dust front has cut solar power. Every extra hour of electrolysis takes power from reactor cooling, purification, refrigeration, or the habitat. Calculate what the current can produce and choose which loads remain on. A plan that fills the tanks but freezes the habitat or spoils the propellant does not get anyone home.
**Objective:** Convert available power into launch gases and protect every critical load.
**Failure means:** The recovery plan sacrifices life support, cooling, or propellant quality.
**Later travel:** The Battery Gallery unlocks after Stop 50; Electrolysis Hall unlocks after the protected loads are confirmed.

## Designer intent - not shown to player

The player begins at Array Shed to learn the available electrical supply, moves to Battery Bank to protect the habitat floor, and operates Electrolysis Hall to connect charge with gas production. The final allocation funds enough electrolysis for the recovery while preserving thermal control, purification, and habitat reserve.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Solar Array | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Red dust moves across the panels and the available-power bar falls in real time. Dialogue bubbles - Demir: "Every kilowatt now has a consequence. Electrolysis makes launch gases, but cooling protects the reactor, refrigeration protects the product, and the habitat keeps us alive. Count before you allocate."

**Unlocks:** Stop 49 at the live power meter; Stop 50 unlocks immediately after Stop 49.

**Beat 2 - After Stops 49 and 50 | array power-routing display | automatic response**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Electron flow and ion motion complete the electrolyzer circuit; hydrogen and oxygen outlets illuminate on opposite sides. Dialogue bubbles - Demir: "Now the electrical path and the chemical products agree. Check the battery floor before promising current we cannot sustain." Panel/HUD text: MOVE TO BATTERY GALLERY.

**Unlocks:** The Battery Gallery travel beat.

**Beat 3 - Battery Gallery | automatic constraint reveal**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: HABITAT MINIMUM, COOLING MINIMUM, and EMERGENCY RESERVE lock as protected loads. Dialogue bubbles - Abiola: "These loads are not bargaining chips. Whatever remains can recover propellant." Panel/HUD text: AVAILABLE FOR RECOVERY OPERATIONS - UPDATED.

**Unlocks:** The Battery Gallery waypoint, followed by the Electrolysis Hall waypoint and Stops 51-52.

**Beat 4 - After Stops 51 and 52 | Electrolysis Hall | automatic decision**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The calculated hydrogen amount populates the production forecast. The accepted allocation powers electrolysis, cooling, purification, refrigeration, habitat, and reserve without crossing any minimum. Dialogue bubbles - Demir: "The plan does not maximize one machine. It keeps the entire route to launch alive."

**Unlocks:** The Mission 13 outcome beat.

**Beat 5 - Mission outcome and hook | Electrolysis Hall | automatic apparent victory**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Electrolyzer stacks start. Hydrogen and oxygen climb; the reactor holds its validated operating point. At dawn, both main indicators switch to FULL and the ascent checklist begins. Achebe waits beside the final console with a sealed vial and an active speech icon. Dialogue bubbles - Achebe: "Stop the countdown. Batch C does not match the green quality channel." Panel/HUD text: LAUNCH HOLD - INDEPENDENT ASSAY DISAGREES.

**Unlocks:** Mission 14 briefing and the Tank Farm waypoint.

## Location plan

**Three locations:** Array Shed (`ARRAY`) for Stop 49, Battery Bank (`BATT`) for Stop 50, Electrolysis Hall (`ELEC`) for Stops 51-52. The supply measurement determines what can be drawn from storage; protected storage then sets the electrolysis allocation.

## Characters and dramatic beat

Demir makes the habitat constraint concrete by putting the medic's night heat load on the board. Achebe shows the exact theoretical product from charge and the practical efficiency loss. Sundqvist accepts a slower production interval to keep purification powered.

## Key concepts, explained here

Oxidation loses electrons; reduction gains them. In water electrolysis, reduction at the cathode produces H2 and oxidation at the anode produces O2. Charge is `Q=It`; moles of electrons equal `It/F`, with `F=96485 C/mol e-`. Two electrons produce one H2 molecule. Electrical energy is finite and real cells have less than 100% current efficiency.

## Stop 49 - Name oxidation and reduction

**Format/placement:** `CHOICE`, asked by Demir at Array Shed controller.  
**Metadata:** redox; INTRODUCE; L1; obstacle.  
**Question card story setup - exact player copy:** Identify oxidation and reduction at the alkaline electrolysis electrodes.  
**Question card story-science connection - exact player copy:** Electron direction tells the crew where hydrogen and oxygen form and prevents the gases from being routed backward.  
**Question card prompt - exact player copy:** In alkaline electrolysis, which statement is correct?  
**Choices:** `Water is reduced at the cathode to form H2; hydroxide is oxidized at the anode to form O2` **(correct)** / `H2 forms by oxidation at the anode` / `Both gases form by reduction` / `Electron coefficients change the tabulated potential when equations are multiplied`.  
**Why:** Reduction gains electrons at the cathode; oxidation loses them at the anode. Scaling a half-reaction does not scale an electrode potential.  
**State/output:** Enable cell-direction schematic.

## Stop 50 - Assemble electron and ion flow

**Format/placement:** `SEQUENCE`, at Battery Bank `cell-stacks` diagram desk.  
**Metadata:** half-reactions and circuit; PRACTICE; L2; clue.  
**Question card story setup - exact player copy:** Assemble the external electron path and internal ion path through the powered cell.  
**Question card story-science connection - exact player copy:** Both paths must close before electrical power can become launch gases.  
**Cards:** `External supply pushes electrons to cathode` / `cathode reduction forms H2` / `ions carry charge through electrolyte` / `anode oxidation forms O2 and releases electrons` / `electrons return through external supply`.  
**Correct order:** Cyclic order as listed, with note that the processes occur continuously rather than one molecule at a time.  
**Why:** Electrons travel through the external circuit; ions close charge balance through electrolyte. Mixing those paths makes impossible diagrams.  
**State/output:** Battery reserve floor fixed at 160 kWh.

## Stop 51 - Turn current into hydrogen

**Format/placement:** `BALLPARK`, at `stack-sheet`.  
**Metadata:** Faraday's law; INTRODUCE; L2; calculation.  
**Question card story setup - exact player copy:** Convert 10,000 A for 8.00 hours into collected hydrogen using Faraday’s constant and current efficiency.  
**Question card story-science connection - exact player copy:** This calculation tells the crew exactly how much ascent propellant the remaining power can buy.  
**Data:** current `10,000 A` for `8.00 h`; current efficiency `92.0%`; `2 e-` per H2; molar mass H2 `2.016 g/mol`.  
**Question card prompt - exact player copy:** Estimate collected hydrogen mass.  
**Calculation:** `Q=10,000 x 28,800 = 2.88e8 C`; mol e- `=2985`; theoretical mol H2 `1492.5`; actual `1373 mol`; mass `2.77 kg H2`.  
**Correct result:** `2.77 kg`; tolerance ±3%.  
**Why:** Time must be seconds because an ampere is coulomb per second. Divide electron moles by two, then apply current efficiency and molar mass.  
**Wrong-path feedback:** Eight hours used directly undercounts by 3600; forgetting two electrons doubles hydrogen; forgetting efficiency gives the theoretical 3.01 kg.  
**State/output:** Converts requested recovery hydrogen into required stack-hours.

## Stop 52 - Allocate the recovery power

**Format/placement:** `ALLOCATE`, operated at `stack` power controller.  
**Metadata:** electrochemistry under constraints; TRANSFER; L5; decision.  
**Question card story setup - exact player copy:** Allocate the dust-limited power among habitat, cooling, purification, electrolysis, refrigeration, and reserve.  
**Question card story-science connection - exact player copy:** Making more gas does not get the crew home if the same plan overheats the reactor, spoils the batch, or shuts down life support.  
**Pool:** `600 kWh`. Protected habitat `180`; reactor thermal control minimum `120`; purification minimum `80`; electrolysis recovery run `160`; tank refrigeration `60`; optional fast-charge reserve `60`.  
**Question card prompt - exact player copy:** Build a plan that keeps crew safe, prevents another hot spot, purifies Batch C precursor gas, and produces recovery hydrogen.  
**Correct result:** Fund habitat 180 + thermal 120 + purification 80 + electrolysis 160 + refrigeration 60 = 600; omit fast-charge reserve.  
**Why:** Every funded item answers a known constraint. The reserve is valuable but can be restored after the dust front; losing refrigeration wastes existing propellant, and losing purification creates off-spec product. The full pool requires accepting no discretionary margin this shift.  
**Wrong-path feedback:** If purification is cut, show that production may increase while quality degrades. If thermal control is cut, invoke the Mission 10 boundary. If habitat is cut, block commitment.  
**State/output:** `power_plan_recovery = true`; methane and oxygen projections reach target at start of Mission 14.

## Mission outcome

The stacks run. Oxygen rises with hydrogen production, and the reactor holds the validated lower-temperature/higher-pressure point. At dawn the dashboard reaches **FULL** for both propellants. Pad Control starts the launch checklist—until Achebe says the newest independent vial does not match the green quality channel.

## Quick concept review

- Oxidation loses electrons; reduction gains them.
- Electrolysis uses external energy to force a nonspontaneous reaction.
- `Q=It` and `mol e-=Q/F` connect current to chemical amount.
- Account for electron stoichiometry and current efficiency.
- A power allocation is scientific when every funded load protects a named consequence.

# Mission 14 - FULL

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 2 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** FULL
**Go now:** Go to the Tank Farm and meet Nia Achebe beside the quarantined Batch C tank.
**Card body:** The methane and oxygen indicators read FULL, and the launch checklist has started. Achebe’s independent vial says one methane batch contains too much carbon dioxide and water. Trace the green lights, test the certification model, and set the flight limits before the final samples arrive. A full tank with the wrong mixture can fail during ascent.
**Objective:** Decide whether the full tanks are actually flight-ready.
**Failure means:** The rocket launches with propellant that may fail on the way home.
**Later travel:** The Assay Lab unlocks after Stop 53; the Ascent Pad office unlocks after Stop 55.

## Designer intent - not shown to player

Tank Farm displays apparent readiness, Assay Lab breaks the shared dependency, and Pad Office forces precommitted limits. This is Twist 3: enough propellant exists by mass and pressure, but not all of it is safe to fly. The player's earlier lessons about partial pressure, intermolecular forces, spectroscopy, and evidence independence all return.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Tank Farm | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Giant METHANE FULL and OXYGEN FULL indicators dominate the tank wall while Batch C is outlined in amber. Dialogue bubbles - Achebe: "Mass and pressure say the tank is full. My independent vial says part of that mass is carbon dioxide and water. A full tank can still be the wrong propellant."

**Unlocks:** Stop 53 at the Tank Farm dependency view.

**Beat 2 - After Stop 53 | Tank Farm dependency view | automatic discovery**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Estimated mass, online composition, control-room quality, and READY trace back to shared Standard C; the independent vial remains separate. The READY light changes from green to amber. Dialogue bubbles - Achebe: "Four displays do not make four measurements when three inherit the same calibration."

**Unlocks:** The Assay Lab waypoint and Stops 54-55.

**Beat 3 - After Stops 54 and 55 | Assay Lab | automatic Twist 3**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The frozen certification model fails on unseen Batch C. Composition appears as 91.6% methane, 8.0% carbon dioxide, and 0.40% water. Panel/HUD text: AMOUNT AT TARGET / COMPOSITION OUT OF SPECIFICATION. Dialogue bubbles - Abiola: "We made enough material. We did not make enough flight-ready methane."

**Unlocks:** The Ascent Pad office waypoint and Stop 56.

**Beat 4 - Before and after Stop 56 | Ascent Pad office | automatic crisis test**

**Presentation:** `nearby_character_bubble + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The player commits methane, carbon-dioxide, water, pressure, and abort limits before two blind resamples are revealed. Both confirm Batch C fails composition. Dialogue bubbles - Achebe: "The deadline did not move the line. Batch C fails the rule we wrote before seeing it." Abiola: "Countdown remains stopped."

**Unlocks:** The Mission 14 outcome beat.

**Beat 5 - Mission outcome and hook | Ascent Pad office | automatic**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Abiola deletes FULL from the readiness display and replaces it with AMOUNT and SPECIFICATION. AMOUNT turns green; SPECIFICATION stays red. Four recovery plans appear with one shift remaining. Dialogue bubbles - Abiola: "One shift. Enough total propellant. Not enough certified methane. Bring me the plan that gets us home without asking the rocket to trust a lie." Panel/HUD text: FINAL MISSION - GO / NO-GO.

**Unlocks:** Mission 15 briefing and the Plant Control waypoint.

## Location plan

**Three locations:** Tank Farm (`TANKS`) for Stop 53, Assay Lab (`ASSAY`) for Stops 54-55, Pad Office (`PAD`) for Stop 56. A trace from the tank dashboard leads to the lab standard; the lab diagnosis triggers the launch-threshold decision.

## Characters and dramatic beat

Achebe earns her defining moment by saying "Stop" after apparent victory. Abiola initially resists because three channels are green; she changes her definition of ready when the dependency trace opens. Sundqvist asks for time to reprocess instead of arguing that mass is enough.

## Key concepts, explained here

Total pressure and total mass do not establish composition. Carbon dioxide and water have different molecular interactions and phase behavior from methane, affecting cold lines and combustion feed. Calibration models must be tested on independent recent samples. Specifications are multi-variable thresholds chosen before results; otherwise teams can move the goalposts after seeing inconvenient data.

### Fictional game specification

- Methane mole fraction `>= 97.0%`
- Carbon dioxide mole fraction `<= 2.0%`
- Water mole fraction `<= 0.10%`
- Tank pressure `18.0-20.0 bar` at certification temperature
- Any independent-sample failure requires quarantine and reprocessing

## Stop 53 - Trace every green light

**Format/placement:** `TRACE`, operated at `farm-gauges`.  
**Metadata:** evidence independence; RETRIEVE; L4; clue.  
**Question card story setup - exact player copy:** At the full Tank Farm, open the dependency chain behind pressure, mass, composition, and the READY light.  
**Question card story-science connection - exact player copy:** A tank can look ready when several green numbers inherit the same wrong calibration.  
**Channels:** pressure -> pressure transducer (independent); estimated methane mass -> pressure + average molar-mass model; online composition -> cold-end analyzer -> Standard C; control-room quality -> online composition -> Standard C; load-ready light -> estimated mass + control-room quality. Independent vial -> Assay Lab Standard A.  
**Question card prompt - exact player copy:** Open dependencies and identify which readiness claims are independently supported.  
**Correct result:** Pressure is independently real, but mass and quality are partly model-derived; two green quality channels share Standard C. The vial is the only independent composition check.  
**Why:** A full gauge can be true while methane purity is false. Derived numbers are useful, not independent.  
**State/output:** Turn load-ready light amber; set `evidence_flags.quality_not_independent = true`.

## Stop 54 - Test certification on the newest sample

**Format/placement:** `HOLDOUT`, operated at `spec-bench`.  
**Metadata:** model generalization; RETRIEVE; L4; reveal.  
**Question card story setup - exact player copy:** Freeze the historical purity calibration and test it on the unseen Batch C vial.  
**Question card story-science connection - exact player copy:** The newest independent sample is the claim the certification model must get right before ascent.  
**Fit set:** six historical standards from 97-100% methane, model residuals below 0.3%. Freeze calibration. **Holdout Batch C:** true standard comparison yields `91.6% CH4`, `8.0% CO2`, `0.40% H2O`; online model predicts `97.4% CH4` because Standard C drift compresses the contaminated range.  
**Question card prompt - exact player copy:** Freeze the historical certification model and score the unseen Batch C vial.  
**Correct result:** Model fails; quarantine Batch C.  
**Why:** Passing historical clean samples does not validate extrapolation into a contaminated regime. The newest independent sample is exactly what certification must predict.  
**Wrong-path feedback:** Refitting the calibration to make Batch C pass destroys the independence of the test.  
**State/output:** `batch_c_quality = off_spec`; launch countdown pauses.

## Stop 55 - What is actually wrong?

**Format/placement:** `DIAGNOSIS`, at Assay Lab review board.  
**Metadata:** integrated composition diagnosis; TRANSFER; L5; twist.  
**Question card story setup - exact player copy:** Read pressure, mass, composition, drier load, and production history, then name the one failure that fits them all.  
**Question card story-science connection - exact player copy:** The crew must decide whether the problem is too little propellant or the wrong propellant.  
**Readings:** pressure 19.1 bar (normal); total loaded mass at target; methane 91.6% (low); CO2 8.0% (high); water 0.40% (high); cold-end drier differential pressure high; production history recovered; no tank mass loss.  
**Choices:** `Insufficient total propellant` / `Tank leak` / `Off-spec Batch C caused by purification breakthrough and shared calibration bias` **(correct)** / `Reactor rate still too low`.  
**Mechanism:** Contaminants add mass and pressure, so quantity signals pass. Drier/purification breakthrough sends CO2/water into product; biased Standard C hides it.  
**Why alternatives fail:** Mass and pressure rule out insufficient amount and major leak; production rate does not explain measured contaminants after collection.  
**State/output:** `twist_3_complete = true`; quarantine line appears around one tank.

## Stop 56 - Write the rule before the final samples

**Format/placement:** `TRIGGER`, operated at Pad Office certification console.  
**Metadata:** precommitted thresholds; APPLY; L5; decision.  
**Question card story setup - exact player copy:** Write methane, carbon-dioxide, water, pressure, and abort limits before the blind resamples appear.  
**Question card story-science connection - exact player copy:** Precommitted thresholds stop the launch deadline from changing what the crew is willing to call safe.  
**Question card prompt - exact player copy:** Set methane, CO2, water, pressure, and abort rules before two blind resamples arrive.  
**Correct thresholds:** CH4 at least 97.0%; CO2 at most 2.0%; H2O at most 0.10%; pressure 18.0-20.0 bar at stated T; any independent failure -> quarantine/reprocess, not average with passing online value.  
**Blind updates:** Tank A `98.4/1.5/0.06/19.0` passes; Batch C tank `91.8/7.8/0.38/19.2` fails composition despite pressure.  
**Why:** Thresholds express consequences before results create pressure to excuse them. Averaging an independent failing sample with a biased online channel has no scientific basis.  
**Wrong-path feedback:** A trigger must name the action and allow enough lead time; pressure alone cannot certify composition.  
**State/output:** `launch_status = NO_GO_PENDING_RECOVERY`; unlock final plan board.

## Mission outcome

The crew has enough kilograms and not enough certified methane. That distinction stops the countdown. Abiola removes the word **FULL** from the main display and replaces it with two lines: **AMOUNT** and **SPECIFICATION**. Four recovery plans remain, and only one shift is left.

## Quick concept review

- Pressure and mass do not uniquely determine composition.
- Shared calibration can make several channels fail together.
- Holdout samples test the claim a certification model must make.
- A specification is a set of predeclared limits tied to consequences.
- "Enough" and "safe to use" are separate scientific claims.

# Mission 15 - GO / NO-GO

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 1 SHIFT UNTIL THE LAUNCH WINDOW CLOSES
**Card title:** GO / NO-GO
**Go now:** Go to Plant Control and meet Commander Abiola at the final recovery board.
**Card body:** One shift remains before the launch window closes. The crew has enough total propellant, but Batch C must be made safe without losing the power, cooling, or time needed for departure. Choose the one new measurement that can change the decision, fund the recovery, and give Abiola a final GO or NO-GO recommendation. This is the decision that determines whether the crew leaves Mars.
**Objective:** Authorize launch only if every chemistry and safety threshold passes.
**Failure means:** A bad decision either strands the crew or sends it into an unsafe ascent.
**Later travel:** The Tank Farm unlocks after Stop 57; the Ascent Pad unlocks after Stop 59 for the final recommendation.

## Designer intent - not shown to player

Plant Control frames the decision, Tank Farm supplies the one additional measurement, and Pad Office receives the final authorization. The player values evidence, resolves two apparently viable plans with a physical constraint, allocates 100 decision points, and makes one integrated diagnosis/recommendation. The campaign then becomes pure story payoff.

## Player-facing beat script - dialogue bubbles and world changes

The mission briefing appears before travel. Accepting it activates the **Go now** waypoint. After the player arrives, every beat below is delivered through dialogue bubbles, radio bubbles, equipment displays, persistent world changes, or waypoint notices. No beat requires a pre-rendered sequence, forced viewpoint change, voice acting, or bespoke character animation.

**Beat 1 - Arrival | Plant Control | automatic when the player enters after accepting the briefing**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The final board shows one shift remaining and four recovery plans. Each plan has time, power, thermal, amount, and composition consequences. Dialogue bubbles - Abiola: "This is not a race to make one number green. Choose the evidence and the recovery chain that can put this crew on a safe ascent before the window closes."

**Unlocks:** Stop 57 at the final decision board.

**Beat 2 - After Stop 57 | decision board to Tank Farm | automatic evidence choice**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change + waypoint_notification`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The selected independent contaminant measurement receives the final sampling slot; duplicate mass and pressure readings gray out. Dialogue bubbles - Achebe: "Pressure and mass already pass. Composition is the uncertainty that can still change GO or NO-GO." Panel/HUD text: FINAL SAMPLE AUTHORIZED - BATCH C INDEPENDENT ASSAY.

**Unlocks:** The Tank Farm waypoint and Stop 58.

**Beat 3 - After Stop 58 | Tank Farm | automatic plan elimination**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: Certified methane, not total tank mass, is applied to both surviving plans. The non-reprocessing plan falls below the usable-fuel requirement. Panel/HUD text: ONLY REPROCESS-BATCH-C PLAN SATISFIES AMOUNT + COMPOSITION + HARDWARE LIMITS. Dialogue bubbles - Sundqvist: "The faster plan fills the gauge. It does not fill the specification."

**Unlocks:** Stop 59 at the integrated control board.

**Beat 4 - After Stop 59 | integrated control board | automatic resource commitment**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: One hundred decision points lock across reprocessing, electrolysis, reactor production, independent verification, and safety margin. Every required causal link turns green. Dialogue bubbles - Demir: "Habitat, cooling, and reserve remain protected." Cho: "Reprocessing and water return are powered." Herrera: "The reactor stays inside the validated envelope."

**Unlocks:** The Ascent Pad waypoint and Stop 60.

**Beat 5 - Stop 60 and ending | Ascent Pad | player commitment followed by dialogue-and-world-state sequence**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The final panel shows independent composition PASS, amount PASS, pressure PASS, reactor thermal margin PASS, habitat reserve PASS, and oxygen PASS. Dialogue bubble prompt - Abiola: "Commander needs your recommendation. What do we do?" Accepted player choice - REPROCESS BATCH C; RUN ELECTROLYSIS DURING REPROCESSING; HOLD THE VALIDATED LOWER-TEMPERATURE/HIGHER-PRESSURE REACTOR POINT; LAUNCH ONLY AFTER INDEPENDENT COMPOSITION PASSES. After authorization, no further question appears. Dialogue bubbles - Abiola: "Authorize launch."

**Unlocks:** The epilogue beat; all graded interaction is complete.

**Beat 6 - Epilogue | Ascent Pad | dialogue-and-world-state sequence, no educational gate**

**Presentation:** `nearby_character_bubble + equipment_panel_update + persistent_world_change`

**Player control:** Pause local interaction while bubbles are open. Advance each bubble with Continue, then restore control. Keep mission-critical panel results visible until the next stop begins.

World state: The display reads READY - AMOUNT VERIFIED - COMPOSITION VERIFIED - SAFETY MARGIN VERIFIED. Each specialist remains beside the instrument tied to their responsibility. Use the existing ascent-vehicle object, engine sound, pad lights, and red-dust particles for launch. If vertical object motion is unavailable, fade the vehicle out above the pad after ignition. Keep the player in the normal viewpoint. Dialogue bubbles - Abiola: "You did not fill a tank. You taught this station what full means." Panel/HUD text: CAMPAIGN COMPLETE.

**Unlocks:** Campaign complete and free movement at the Ascent Pad.

## Location plan

**Three locations:** Plant Control (`GIBBS`) for Stop 57, Tank Farm (`TANKS`) for Stop 58, Pad Office (`PAD`) for Stops 59-60. The chosen high-value measurement is taken at the tanks; its result removes one plan and sends the crew to the launch console.

## Characters and dramatic beat

All six major characters present one constraint, not six speeches. Sundqvist owns schedule, Herrera safety/equilibrium, Cho purification/cryogenics, Achebe independent certification, Demir power/habitat, Abiola the final authority. The player is the only person whose role spans all constraints.

## Key concepts, explained here

No new major concept is taught. The player retrieves stoichiometry, partial pressure, molecular properties, separation, calorimetry, kinetics, equilibrium, acid/base treatment, electrolysis, uncertainty, and evidence independence. The intellectual verb is decision: choose what measurement could change action, use constraints to distinguish plans, fund the causal chain, and state a complete go/no-go rule.

### Candidate recovery plans

- **A - Heat to 575 K:** faster initial production; fails thermal margin and worsens exothermic equilibrium yield.
- **B - Hold 550 K and raise to 12 bar:** safer and improves equilibrium; still cannot make contaminated Batch C acceptable without reprocessing.
- **C - Divert power only to electrolysis:** restores H2 but starves purification/refrigeration if used alone.
- **D - Reprocess Batch C while running the validated 550 K/12 bar point and timed electrolysis:** costs time and the full power budget but addresses amount, purity, and safety together.

## Stop 57 - Buy one measurement that could change the decision

**Format/placement:** `VALUE`, asked at Abiola in Plant Control (decision/person).  
**Metadata:** value of information; TRANSFER; L5; decision.  
**Question card story setup - exact player copy:** One additional measurement can be taken before the final recovery decision. Spend it where the result could change GO or NO-GO.  
**Question card story-science connection - exact player copy:** Repeating a precise but nonbinding pressure or mass reading cannot resolve disputed composition.  
**Budget/options:** one test. `Another total-pressure reading`; `duplicate total tank mass`; `independent Batch C contaminant assay`; `another average catalyst temperature`; `visual valve inspection`.  
**Question card prompt - exact player copy:** Which measurement has the greatest chance to change the launch decision?  
**Correct result:** Independent Batch C contaminant assay.  
**Why:** Pressure and mass are already precise and are not the disputed claim. Average temperature cannot certify tank contents. A second independent assay determines whether quarantine/reprocessing remains necessary and directly controls GO/NO-GO.  
**Wrong-path feedback:** More precision on a nonbinding quantity has low decision value. Evidence is valuable for the action it can change.  
**State/output:** Dispatch sealed sample to Tank Farm portable analyzer; `diagnostic_budget = 0`.

## Stop 58 - Collapse the last degeneracy

**Format/placement:** `DEGENERACY`, at Tank Farm calculation station.  
**Metadata:** integrated constraints; TRANSFER; L5; obstacle.  
**Question card story setup - exact player copy:** Apply the independent Batch C assay and hardware limits to the two recovery plans that still look viable.  
**Question card story-science connection - exact player copy:** Counting only certified methane reveals whether a plan truly supplies usable fuel rather than reassuring mass.  
**Initial fit:** Plans B and D both meet projected methane amount by launch because B counts all Batch C mass as usable. Slider locus trades reprocessing time against added production.  
**New constraint from Stop 57:** independent assay confirms `7.9% CO2`, `0.39% H2O`; only certified methane fraction counts toward usable propellant. Mechanical pressure maximum remains 12 bar; thermal peak <600 K.  
**Question card prompt - exact player copy:** Apply composition and hardware constraints. Which plan survives?  
**Correct result:** D. Plan B meets gross mass but not usable certified methane; it cannot erase contaminants. Plan D reprocesses Batch C while validated production replaces small losses.  
**Why:** Two plans looked equal only because the objective counted all mass as fuel. Changing to the scientifically correct objective—certified methane—collapses the match.  
**State/output:** Remove A/B/C as standalone plans; unlock strategic allocation.

## Stop 59 - Spend 100 decision points

**Format/placement:** `SCIENCETANK`, asked at the assembled crew in Pad Office (decision/person).  
**Metadata:** resource strategy; TRANSFER; L5; decision.  
**Question card story setup - exact player copy:** Spend 100 decision points across reprocessing, electrolysis, reactor operation, verification, and safety.  
**Question card story-science connection - exact player copy:** The winning allocation must fund every link needed to create, clean, preserve, and prove flight-ready propellant.  
**Proposals:** Batch C purification/reprocessing; timed electrolysis; validated reactor operation; independent final assay; extra raw production above validated point; cosmetic dashboard recalibration; habitat/safety margin.  
**Recommended allocation:** 30 reprocessing, 20 electrolysis, 15 validated reactor, 20 independent verification, 15 safety/habitat; total 100. Accept variants with at least 60 points across reprocessing + verification and no points to cosmetic recalibration, provided safety gets at least 10.  
**Evidence shown after commit:** Reprocessing is the only action that changes contaminant concentration; electrolysis replaces processing losses; the validated point preserves rate/yield/thermal limits; independent assay changes launch authorization.  
**Why:** The grade rewards investments that can alter the decision or protect a binding constraint. Spending everything on production solves the old problem and recreates the new one.  
**State/output:** Crew executes montage; Batch C returns to Tank Farm.

## Stop 60 - Commander's recommendation

**Format/placement:** `DIAGNOSIS`, at the Pad Office certification console (calculation/room), with Abiola delivering the prompt.  
**Metadata:** whole-campaign synthesis; TRANSFER; L5; final commitment.  
**Question card story setup - exact player copy:** Read the final independent assays, tank pressure, reactor peak temperature, reserves, and oxygen status. Give Abiola one recommendation.  
**Question card story-science connection - exact player copy:** This is the final scientific decision: authorize launch only if the chemistry proves the crew can leave Mars safely.  
**Final readings:** reprocessed methane `98.1% CH4`, `1.8% CO2`, `0.08% H2O`; pressure `19.0 bar`; reactor `550 K, 12 bar`, inlet peak `584 K`; H2 reserve `16 kmol`; oxygen on specification; habitat reserve protected; two independent assays agree within 0.2%.  
**Question card prompt - exact player copy:** "Commander needs your recommendation. What do we do?"  
**Choices:** A `Launch immediately and ignore assay because mass is full`; B `Return to 575 K to add maximum margin`; C `Reprocess again until contaminants are zero`; D `Accept the reprocessed batch, keep the validated 550 K/12 bar point through loading, preserve protected power, and authorize launch because every precommitted threshold now passes.` **(correct)**  
**Correct mechanism:** D meets amount, composition, pressure, thermal, hydrogen, oxygen, and habitat constraints with independent verification. Zero contamination is not required; the specification defines acceptable limits.  
**Wrong-path feedback:** A repeats Twist 3; B repeats Twist 2; C confuses perfect purity with specified safe purity and misses the window.  
**State/output:** Set `launch_authorized = true`; disable all question UI; play epilogue.

## Mission outcome and epilogue - no further quiz

Abiola places her hand beside the player's on the authorization pad. The word **FULL** does not return; the display reads **READY - AMOUNT VERIFIED - COMPOSITION VERIFIED - SAFETY MARGIN VERIFIED**. Sundqvist watches the rate line, Herrera the inlet temperature, Cho the drier pressure, Achebe the independent vial, and Demir the habitat bus. The engines ignite behind the berm, the ascent vehicle rises through red dust, and every green light remains attached to a measurement the crew can explain.

After the vehicle clears the horizon, Abiola says, "You did not fill a tank. You taught this station what full means." End campaign. Do not ask a recap question after this line.

## Quick concept review

- Measure the uncertainty that can change the decision, not the number easiest to repeat.
- Add physical constraints when two plans fit the same limited evidence.
- Rate, equilibrium yield, composition, energy, and safety are separate constraints.
- A good plan funds the full causal chain and independent verification.
- GO means every precommitted requirement passes—not that one reassuring gauge is green.

# 9. Mission-at-a-glance production map

| Mission | Main story event | Locations | Core chemistry | Ending change |
| --- | --- | --- | --- | --- |
| 1 | Shortfall framed; carbon nearly closes | Plant Control | particles, moles, atom balance | major leak becomes doubtful |
| 2 | CO2 cleared; H2 limiting | Atmosphere Intake | stoichiometry, limiting reactant | investigate H2 side |
| 3 | normal pressure, wrong gas | Hydrogen Store | KMT, PV=nRT, Dalton | purge mixture localized |
| 4 | residue path disproved | Catalyst Bay | Lewis, VSEPR, polarity, IMF | second false leak clue falls |
| 5 | shared calibration revealed | Water Plant, Ice Cut | molarity, spectroscopy, dependency | dashboard trust breaks |
| 6 | Twist 1 | Plant Control, Tank Farm | diagnosis, uncertainty, C/H/O balance | no major methane leak |
| 7 | override follows cooling loss | Reactor Hall, Cold End | calorimetry, phase/energy ledger | human suspect emerges |
| 8 | action verified | Plant Control, Reactor Hall | rate law, k, causal control | Herrera suspended |
| 9 | inlet catalyst damage found | Catalyst Bay, Assay Lab | catalyst, mechanism, spatial pattern | apparent case closes |
| 10 | Twist 2 | Reactor Hall, Plant Control | holdout, residual, stress | override prevented runaway |
| 11 | safe operating point chosen | Reactor Hall, Cold End, Control | K, Q, ICE, Le Châtelier | rate/yield plan aligned |
| 12 | recycle-loop failure closes | Ice Cut, Water Plant, Electrolysis | coupling, acids/bases, balance | H2 shortage explained deeply |
| 13 | finite power committed | Array, Battery, Electrolysis | redox, Faraday, allocation | apparent production victory |
| 14 | Twist 3 | Tank Farm, Assay Lab, Pad | composition, certification, triggers | FULL becomes NO-GO |
| 15 | integrated recovery and launch | Control, Tanks, Pad | cumulative transfer | launch authorized |

# 10. Stop manifest

| Range | Formats | Learning movement |
| --- | --- | --- |
| 1-4 | CHOICE, BALLPARK, SEQUENCE, BALANCE | recognize and establish foundations |
| 5-8 | SEQUENCE, BALLPARK, CHOICE, ALLOCATE | perform stoichiometry and make first trade-off |
| 9-12 | CHOICE, BALLPARK, PROBE, VERIFY | separate amount, pressure, and composition |
| 13-16 | CHOICE, SEQUENCE, PROTOCOL, SWEEP | connect structure to observable behavior |
| 17-20 | CHOICE, BALLPARK, SWEEP, TRACE | measure solutions and expose dependency |
| 21-24 | DIAGNOSIS, STRESS, BALANCE, CASEBOOK | synthesize Twist 1 |
| 25-28 | CHOICE, BALLPARK, SEQUENCE, BALANCE | build heat model and human clue |
| 29-32 | CHOICE, BALLPARK, CONTROL, ATTEST | establish rate causation and action identity |
| 33-36 | CHOICE, SEQUENCE, PROBE, DIAGNOSIS | diagnose catalyst-bed pattern |
| 37-40 | HOLDOUT, RESIDUAL, STRESS, CASEBOOK | validate model and synthesize Twist 2 |
| 41-44 | CHOICE, BALANCE, CONTROL, DEGENERACY | distinguish kinetics and equilibrium |
| 45-48 | CHAIN, PROTOCOL, VERIFY, BALANCE | integrate the material-recycle loop |
| 49-52 | CHOICE, SEQUENCE, BALLPARK, ALLOCATE | connect charge to product and power choice |
| 53-56 | TRACE, HOLDOUT, DIAGNOSIS, TRIGGER | reveal and govern Twist 3 |
| 57-60 | VALUE, DEGENERACY, SCIENCETANK, DIAGNOSIS | value evidence and commit final plan |

No format exceeds one third of scheduled stops. The campaign uses only canonical formats and does not attempt to showcase every available interaction.

# 11. Narrative implementation notes

## Environmental state changes

- M1: shortfall warning turns red to amber after carbon closure.
- M2: compressor overdrive proposal physically disappears from work board.
- M3: purge tie-in pipe illuminates after probe.
- M4: blue residue gains a maintenance tag instead of vanishing.
- M5: Ice Cut gate opens; shared standard cable is visible in TRACE overlay.
- M6: leak-search barricades and sealant kits are removed from Tank Farm.
- M7: radiator carries dust/frost state and reactor heat shimmer increases.
- M8: Herrera's console badge turns locked.
- M9: inlet catalyst section appears darkened; sample vial travels to Assay.
- M10: Herrera's badge unlocks; old set point receives a red safety boundary.
- M11: water-removal line illuminates stage by stage and the validated operating point is posted.
- M12: the site process path lights from Ice Cut to Electrolysis to Reactor.
- M13: dust reduces array brightness; funded circuits illuminate according to allocation.
- M14: ascent countdown begins, stops, and Batch C receives a quarantine ring.
- M15: quarantine clears only after reprocessing; the vehicle becomes interactable after Stop 60.

## Dialogue state

Wrong answers should not branch plot, but optional greetings should react to evidence. After Twist 1, Sundqvist addresses the player as Propellant Lead rather than "new lead." During Missions 8-9, Herrera's greetings are clipped but never hostile. After Twist 2, Sundqvist owns her mistaken accusation without becoming passive. After Twist 3, Abiola asks for "amount and specification" every time she uses the word ready.

## Mission endings

Each mission ending needs 45-90 seconds of non-quiz play: equipment changes, a walk, an argument delivered in bubbles, a radio call, a sample transfer, or a persistent world-state payoff. The outcome text above is the required content, not necessarily a single speech. End screens show `WHAT CHANGED` and `CHEMISTRY YOU CAN NOW USE`, then return control in the world.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every numerical answer from authored values; tolerate only rounding, not alternative chemistry.
- Temperatures used in gas laws are kelvin.
- Stoichiometric coefficients are applied to moles.
- Rate-law orders are inferred from data, not copied from the balanced equation.
- Catalyst feedback never claims a change to K or Delta H.
- Equilibrium expression exponents match the balanced equation.
- Acid/base answer subtracts moles before taking pH.
- Faraday calculation converts hours to seconds and uses two electrons per H2.
- Fictional propellant thresholds are labeled as campaign specifications.

## Format checks

- `CHOICE`: four distinct labels, answer copied verbatim, three rebuttals.
- `BALLPARK`: every tile has units; target and tolerance accept the stated result.
- `SEQUENCE`: only one defensible order, or axis/ends explicitly define nonchronological order.
- `PROTOCOL`/`CASEBOOK`: mapping is a complete permutation.
- `DIAGNOSIS`: at least three reading zones and at least one quiet reading that rules out an option.
- Operated formats sit at fixtures; decision formats sit at a person; calculations sit at room furniture.
- `VERIFY`: prediction is committed before action, and measurement is mandatory.
- `CONTROL`: restoration is required before completion.
- `PROBE`: all stations must be sampled before commit.
- `HOLDOUT`: fitting freezes before hidden data appears.
- `TRACE`: derived channels visibly disclose upstream dependencies.
- `TRIGGER`: thresholds are committed before blind updates.
- Disabled commit buttons name the missing action.

## Story checks

- Mission 1 opener is at most five sentences; every briefing is at most four.
- Missions 1-4 use exactly one meaningful location; 5-10 use two; 11-15 use three.
- No distant Ice Cut use before Mission 5.
- Every location move is triggered by evidence or a required operation.
- Twist 1 pays off carbon, pressure/composition, residue, water, and calibration clues.
- Twist 2 pays off set point, radiator timing, inlet hot spot, holdout, and stress clues.
- Twist 3 pays off shared calibration, composition, separation, and threshold ideas.
- Mission 15 introduces no major chemistry and contains no post-launch quiz.

## Tone and accessibility checks

- A player can state the immediate problem in plain language at every stop.
- Narrative sentences use concrete nouns before technical labels.
- Units appear in visible data and spoken explanations.
- Color is never the only carrier of alarm/pass state; use labels and icons.
- The player can reopen the mission review and casebook at any time.
- Incorrect feedback says what mechanism failed and how to retry.

# 13. Suggested YAML assembly order for Claude Code

1. Preserve the existing `theme`, area IDs, fixture IDs, and roster asset IDs where possible.
2. Reduce the speaking cast to the six major roles in this book; retain extra existing NPCs as ambient/minor staff only.
3. Replace or reorder the current mission list into 15 missions and 60 lessons.
4. Implement base-eight formats first and verify answer/rebuttal parity.
5. Implement operated instrument blocks in mission order so dependencies unlock naturally.
6. Add `takesAsRead`, evidence flags, dialogue conditions, and environmental state changes.
7. Import with `node tools/import-book.mjs books/redsand.yml redsand --verify`.
8. Run trap, lesson, and drive suites used by the repository; fix schema failures rather than weakening authored intent.
9. Play the complete campaign once wrong-first and once right-first.
10. Confirm the launch epilogue begins immediately after Stop 60 and no question UI remains.

## Recommended content object shape

Use the repository's exact schema; this is a semantic checklist, not a replacement schema:

```yaml
- group: EQUIL
  task: player-facing action
  title: short dramatic title
  at: exact-fixture-id
  reason: why this must happen now
  concept: AP concept label
  takesAsRead: [earlier concept labels]
  scene: 30-45 words, situation only
  guide: concise operating instruction
  background: [mechanism explanation, story-relevant explanation]
  takeaway: one sentence, not identical to why
  format: CANONICAL_FORMAT
  question: exact player prompt
  # format-specific block here
  answerText: exact correct result
  why: 70-90 words explaining mechanism
```

# 14. Final handoff checklist

- [ ] 15 missions and 60 scheduled stops
- [ ] one typed challenge per lesson
- [ ] 1/2/3 location escalation preserved
- [ ] six major characters retain distinct wants and blind spots
- [ ] all three twists have multiple earlier clues
- [ ] every mission has an outcome scene and quick review
- [ ] later encounters retrieve and combine rather than merely repeat
- [ ] final recommendation checks amount, quality, pressure, thermal margin, power, and independent verification
- [ ] all numerical values, thresholds, and mappings pass importer and play tests
- [ ] post-Stop-60 launch sequence contains no educational gate

**Canonical ending line:** "You did not fill a tank. You taught this station what full means."
