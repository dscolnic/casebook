**FIRST PERSON LEARNING**

**RED SAND: FULL TANK**

AP Chemistry Campaign Implementation Bible

**15 missions \| 60 graded stops \| Mars \| Implementation-ready**

**REVISION 10.1 - BUILDABLE PANELS, MISSION-CARD PRIMERS, AND CUMULATIVE RETRIEVAL**

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

- Placement follows stop kind: decision formats at a person, calculation
  formats at a room/bench/board, operated formats at the fixture being
  controlled.

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

Mars is already making the fuel that will take you home. At Arcadia
Rise, thin carbon-dioxide air and buried water are turned into methane
and oxygen for the ascent vehicle. Fifteen work shifts remain before the
launch window closes; miss it, and the crew stays on Mars without the
supplies planned for another season. Commander Laila Abiola gives you
the plant key and says, "Find what is stopping the fuel. Get us home."

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
| Flight-Ready Methane | 82%   | Usable methane that currently counts toward launch. It may reach 100 before certification and still fall later. |
| Ascent Oxygen        | 88%   | Stored oxygen available for ascent. It becomes permanently locked at 100 after Mission 13 verification.         |
| Power Reserve        | 72%   | Electrical margin above protected habitat loads. Tests, cooling, purification, and electrolysis can lower it.   |
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

| **ID** | **Place**         | **Story/chemistry function**                            | **Signature fixture**                    |
|--------|-------------------|---------------------------------------------------------|------------------------------------------|
| GIBBS  | Plant Control     | Ledgers, power allocation, command decisions            | ledger, loadboard, sample-tray           |
| INTAKE | Atmosphere Intake | CO2 feed, compression, gas composition                  | compressors                              |
| HSTORE | Hydrogen Store    | H2 mass, pressure, delivery line                        | store-scales                             |
| KINET  | Catalyst Bay      | Rate, mechanism, catalyst health                        | bed, charge-bench, bed-log               |
| SOIL   | Water Plant       | Ice extraction, brine, solution treatment               | hopper, columns, brinetank, water-report |
| CUT    | Ice Cut           | First distant site; raw water source and field evidence | excavation face and rover sampler        |
| EQUIL  | Reactor Hall      | Sabatier equilibrium, heat, conversion                  | skid, analyser, bed-head, equil-stub     |
| PHASE  | Cold End          | Drying, separation, condensation, contamination         | coldline, fridge, phase-radiator         |
| ELEC   | Electrolysis Hall | H2/O2 production and Faraday calculations               | stack, volt-sheet, cell-diagram          |
| ASSAY  | Assay Lab         | Independent standards, UV/Vis, launch specification     | spec-bench                               |
| ARRAY  | Array Shed        | Solar production and available current                  | array controller                         |
| BATT   | Battery Bank      | Stored energy, protected habitat reserve                | cell-stacks                              |
| TANKS  | Tank Farm         | Pressure, mass, gas composition, final loading          | farm-gauges, umbilical                   |
| PAD    | Pad Office        | Launch authority and final commitment                   | certification console                    |

### Location escalation

| **Missions** | **Places per mission** | **Travel rule**                                                  |
|--------------|------------------------|------------------------------------------------------------------|
| 1-4          | 1                      | Local investigation; no distant travel                           |
| 5-10         | 2                      | Evidence at the first place creates the need to visit the second |
| 11-15        | 3                      | The player crosses connected subsystems and synthesizes evidence |

The Ice Cut is locked until Mission 5. The ascent vehicle remains
scenery until Mission 14 and becomes interactable only after the Mission
15 final commitment.

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

### Rosalind Achebe - analytical and electrochemistry lead

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

**Particles, moles, and molar mass** — Introduce/practice: M1. Retrieve/combine: M2, M6. Transfer/payoff: M13, M15.

**Balancing and stoichiometry** — Introduce/practice: M1-M2. Retrieve/combine: M6, M12. Transfer/payoff: M13, M15.

**Gas laws and partial pressure** — Introduce/practice: M3. Retrieve/combine: M6, M11. Transfer/payoff: M14-M15.

**Lewis structures, VSEPR, polarity, and IMF** — Introduce/practice: M4. Retrieve/combine: M5. Transfer/payoff: M14-M15.

**Solutions, molarity, and spectroscopy** — Introduce/practice: M5. Retrieve/combine: M9, M12. Transfer/payoff: M14-M15.

**Energy, calorimetry, and phase change** — Introduce/practice: M7. Retrieve/combine: M9-M10. Transfer/payoff: M11, M15.

**Kinetics and rate law** — Introduce/practice: M8. Retrieve/combine: M9-M10. Transfer/payoff: M11, M15.

**Catalysts and mechanisms** — Introduce/practice: M9. Retrieve/combine: M10. Transfer/payoff: M11, M15.

**Equilibrium, Q, K, and ICE** — Introduce/practice: M11. Retrieve/combine: M12, M14. Transfer/payoff: M15.

**Acids, bases, and solution treatment** — Introduce/practice: M12. Retrieve/combine: M14. Transfer/payoff: M15.

**Redox and electrolysis** — Introduce/practice: M13. Retrieve/combine: M14. Transfer/payoff: M15.

**Evidence independence and uncertainty** — Introduce/practice: M5-M6. Retrieve/combine: M10. Transfer/payoff: M14-M15.

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
the next mission's problem. Correct result is the grading truth.
Wrong-path feedback is implementation content and may be shortened only
if the format cannot display it. State/output identifies narrative flags
and visible world changes.


## Revision 10.1 implementation delta

This revision closes the implementation debt found after Missions 1-2 were built. Every stop now includes a player-facing reason, a two-sentence 30-45-word setup, a keystone tag, a canonical answer text, and—where the player operates, samples, allocates, traces, diagnoses, or tests—a complete interaction payload. Every mission card now also authors its own `Worth knowing first` block: glossary terms with aliases and full definitions, primer concepts, and fully explained equations first needed that day. Briefing bodies and outcomes are written as one visible promise-and-answer chain. Failure and later-travel notes remain authoring logic and are not printed as duplicate briefing-card fields.

**Source-of-truth order:** the repository importer and schema win first; the current canonical format documentation wins second; this book supplies the complete content and intended logic. If a field name has changed, map the named data without deleting the interaction or replacing it with a generic option list.

## Player-facing glossary dependency

Define a term before a briefing, bubble, setup, or question assumes it. Definitions must not depend on another undefined term. The complete entries now live on the first mission card that needs them and include every spelling, plural, and abbreviation used by the campaign. The implementation should lift those authored entries rather than expand shorthand definitions itself.

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

# Mission 1 - The Shortfall

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 15 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE SHORTFALL

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the carbon ledger.

**Card body:** The ascent vehicle still lacks the methane fuel needed to carry the crew home. The crew suspects a leak, but closing the wrong valves could waste a shift and reduce production. At Plant Control, classify samples, convert tank mass into moles, and account for the carbon entering and leaving the plant. By the end of the mission, decide whether a large methane leak can explain the shortage.

**Objective:** Use the production records to decide whether a large
methane leak can explain the fuel shortage.

### Worth knowing first - exact player copy

#### Glossary terms

**Particle**  
**Also called:** particle, particles  
**Definition:** A particle is one counted piece of matter. In this mission, a particle may be an atom, a molecule, or an ion.

**Electric charge**  
**Also called:** electric charge, electrical charge, charge, charged, positive charge, negative charge  
**Definition:** Electric charge is a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.

**Electron**  
**Also called:** electron, electrons, e-  
**Definition:** An electron is a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.

**Chemical bond**  
**Also called:** chemical bond, chemical bonds, bond, bonds, bonded  
**Definition:** A chemical bond is a strong connection that holds atoms together inside a molecule. Breaking or making bonds changes how atoms are grouped but does not create or destroy the atoms.

**Chemical reaction**  
**Also called:** chemical reaction, chemical reactions, reaction, reactions  
**Definition:** A chemical reaction rearranges atoms by breaking or making chemical bonds. The kinds and counts of atoms remain the same before and after the change.

**Atom**  
**Also called:** atom, atoms  
**Definition:** An atom is the smallest ordinary piece of one kind of matter that keeps that identity. Counting atoms lets the plant check whether matter has disappeared.

**Molecule**  
**Also called:** molecule, molecules  
**Definition:** A molecule is two or more atoms joined by chemical bonds. Methane and carbon dioxide are molecules, so one molecule contains several atoms.

**Ion**  
**Also called:** ion, ions  
**Definition:** An ion is an atom or group of atoms with an electrical charge. It is not the same thing as a neutral atom or molecule.

**Mole**  
**Also called:** mole, moles, kilomole, kilomoles, mol, kmol  
**Definition:** A mole is a fixed count of particles, the same count for every substance. One mole contains 6.022 x 10^23 particles; one kilomole contains one thousand moles.

**Molar mass**  
**Also called:** molar mass, molecular weight, grams per mole, g/mol  
**Definition:** Molar mass is the mass of one mole of a substance. It connects a mass on a scale to the number of particles in the plant.

#### Primer concepts

- Matter can change form during a reaction, but atoms are not created or destroyed.
- A mass shortage is not automatically a leak; first ask whether the unit conversion and atom count close.
- Chemical formulas show how many atoms of each element are present in one particle.

#### Equations first needed today

**Equation:** moles = grams / molar mass; particles = moles x 6.022 x 10^23  
**What it is for:** turning a mass on a scale into a count of particles  
**Symbols:** grams is the measured mass; molar mass is the grams in one mole; 6.022 x 10^23 is Avogadro's number, the particles in one mole.  
**Why this campaign needs it:** The tank scale reports mass, but the reactor and atom ledger must count particles before the crew can decide whether fuel is missing.  
**Also called:** grams to moles, mole conversion, Avogadro conversion, mass-to-particles  
**Concept:** particles, moles, and molar mass

**Equation:** unaccounted amount = amount entering - amount accounted for  
**What it is for:** closing a material ledger  
**Symbols:** amount entering is the measured input; amount accounted for is the total in products, recycle, samples, and measured losses.  
**Why this campaign needs it:** The crew should hunt a leak only if the carbon entering the plant cannot be found in known streams.  
**Also called:** material balance, atom balance, carbon ledger, conservation ledger  
**Concept:** conservation of atoms

**Crew on this mission - mission log:** Commander Laila Abiola — mission commander; Ingrid Sundqvist — production and catalyst lead.



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

**Beat 1 - Arrival \| Plant Control \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

World state: The four-bar HUD opens at METHANE 82%, OXYGEN 88%, POWER
72%, and INTEGRITY 70%. Two technicians reach for different valve
controls; Abiola steps between them and locks both panels. Dialogue
bubbles - Abiola: "Those valves stay open until we know whether matter
is actually missing. We have fifteen shifts to make the fuel that gets
us home. Start with the ledger."

**Unlocks:** Stop 1 at the sample tray.

**Beat 2 - After Stop 1 \| sample tray \| automatic correct-answer
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The four sample labels separate into ATOM, MOLECULE,
and ION columns. **Dialogue bubbles -** Abiola: "Good. If the software
calls every object the same kind of particle, the count can be correct
and the conclusion can still be wrong."

**Unlocks:** Stop 2 at the conversion board; Stop 3 unlocks immediately
after Stop 2.

**Beat 3 - After Stops 2 and 3 \| conversion board \| automatic
transition**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The scale reading, moles, and molecule count connect
with a continuous illuminated unit path. **Panel/HUD text:** MASS -\>
MOLES -\> MOLECULES. **Dialogue bubbles -** Abiola: "Now the tank scale
and the reactor model are speaking the same language. Open the carbon
ledger."

**Unlocks:** Stop 4 at the carbon ledger.

**Beat 4 - After Stop 4 \| carbon ledger \| automatic discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The carbon streams close to within 0.2%. The red leak
warning changes to amber, but the methane shortfall remains red.
**Panel/HUD text:** CARBON ACCOUNTED FOR: 99.8% / METHANE TARGET: NOT
MET. **Dialogue bubbles -** Abiola: "We are still short of methane. We
may not be short of carbon."

**Unlocks:** The Mission 1 outcome beat.

**Beat 5 - Mission outcome and hook \| Plant Control \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Sundqvist's static portrait appears in the radio-bubble
HUD while the Atmosphere Intake waypoint pulses on the map. **Dialogue
bubbles -** Sundqvist: "Then the Martian air may never be reaching the
reactor in the first place." Abiola: "Do not increase compressor power.
The Propellant Lead will test that claim first." **Panel/HUD text:**
NEXT DESTINATION - ATMOSPHERE INTAKE.

**Unlocks:** Mission 2 briefing and the Atmosphere Intake waypoint.

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

**Format/placement:** CHOICE, asked at Commander Abiola beside
sample-tray (decision/person).

**Metadata:** Concept: particles; Keystone: particles, moles, and molar mass; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Stop reason - exact player copy:** The ledger cannot be trusted until every sample type is identified.

**Question card story setup - exact player copy:** Before the plant can compare its records, classify the four sample symbols so the ledger counts atoms, molecules, and ions correctly. This gives every later calculation a trustworthy starting point.

**Question card story-science connection - exact player copy:** Correct
labels prevent the plant from counting unlike particles as though they
were interchangeable.

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

**Format/placement:** BALLPARK, at the Plant Control conversion board
(calculation/room).

**Metadata:** Concept: grams-moles-particles; Keystone: particles, moles, and molar mass; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Stop reason - exact player copy:** The tank scale and reactor model must use the same amount units.

**Question card story setup - exact player copy:** With the samples labeled correctly, convert the reported methane shortage from tank mass into the molecule count used by the reactor model. The result lets the two records be compared without guessing.

**Question card story-science connection - exact player copy:** The crew
cannot compare a tank scale with molecular production until both are
expressed through moles.

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

**Format/placement:** SEQUENCE, at the conversion board
(calculation/room).

**Metadata:** Concept: dimensional analysis; Keystone: particles, moles, and molar mass; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** A deleted conversion could create the shortage the crew thinks it sees.

**Question card story setup - exact player copy:** Because a deleted formula could create a false shortage, rebuild the full mass-to-molecules conversion before trusting yesterday's estimate. A complete unit path will expose whether the estimate is artificial before repairs begin.

**Question card story-science connection - exact player copy:** A broken
unit chain could create a false shortfall and send technicians after a
leak that does not exist.

**Question card prompt - exact player copy:** Put the methane conversion
workflow in order.

**Cards:** Read tank mass in kg / Convert kg to g / Divide by CH4 molar
mass / Multiply by Avogadro's number / Report molecules with units.

**Correct order:** As listed.

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

**Format/placement:** BALANCE, at ledger (calculation/room).

**Metadata:** Concept: atom conservation; Keystone: balancing and stoichiometry; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** The first repair decision depends on whether carbon is actually missing.

**Question card story setup - exact player copy:** Use the corrected counts to total every carbon stream and decide whether enough carbon is actually missing to support a large methane leak. The closed balance will determine whether leak work should continue.

**Question card story-science connection - exact player copy:** If
carbon is still inside the process, the supposedly missing methane may
never have leaked.

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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Atom, molecule, and ion describe different kinds of particles.

- moles = grams / molar mass; particles = moles x 6.022 x 10^23.

- Follow units through every conversion.

- Balanced equations and process ledgers conserve atoms.

- **Mission takeaway:** A nearly closed carbon ledger weakens a large methane-leak explanation; it does not identify the real cause.

# Mission 2 - The Feedstock Problem

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE FEEDSTOCK PROBLEM

**Go now:** Go to the Atmosphere Intake and meet Ingrid Sundqvist, the production and catalyst lead, at the compressor log desk.

**Card body:** The carbon ledger makes a large leak unlikely, but the plant still cannot make enough methane. The Sabatier reactor combines carbon dioxide from Martian air with hydrogen recovered from water. At the Atmosphere Intake, calculate how much methane each supply can support and identify which one runs out first. By the end of the mission, decide whether to push the intake harder or investigate hydrogen delivery.

**Objective:** Determine which ingredient runs out first and whether the
carbon-dioxide intake needs repair.

### Worth knowing first - exact player copy

#### Glossary terms

**Sabatier reaction**  
**Also called:** Sabatier reaction, Sabatier process, methane reactor reaction  
**Definition:** The Sabatier reaction combines carbon dioxide and hydrogen to make methane and water. It is the reaction Arcadia Rise uses to make the crew's fuel.

**Reactant**  
**Also called:** reactant, reactants, feed, feeds, ingredient  
**Definition:** A reactant is a starting substance used by a chemical reaction. Carbon dioxide and hydrogen are the two reactants in the plant's methane reactor.

**Product**  
**Also called:** product, products, output  
**Definition:** A product is a substance made by a chemical reaction. Methane and water are the products of the Sabatier reaction.

**Coefficient**  
**Also called:** coefficient, coefficients, reaction coefficient, stoichiometric coefficient  
**Definition:** A coefficient is the number written before a chemical formula in a balanced equation. Coefficients compare particle counts and mole amounts, not masses.

**Limiting reactant**  
**Also called:** limiting reactant, limiting reagent, limiting feed, bottleneck  
**Definition:** The limiting reactant is the starting substance that runs out first. It sets the greatest amount of product the reactor can make.

**Excess reactant**  
**Also called:** excess reactant, excess reagent, leftover feed  
**Definition:** An excess reactant is a starting substance left after the limiting reactant runs out. Its presence does not mean the reaction can continue.

**Theoretical yield**  
**Also called:** theoretical yield, maximum yield, possible output  
**Definition:** The theoretical yield is the greatest product amount allowed by the measured reactants and balanced equation. It is a ceiling, not a promise that the plant reaches it.

#### Primer concepts

- Balance an equation before using its coefficients.
- Compare every reactant by the amount of the same product it could make; the smaller product amount identifies the limiting reactant.
- A correct calculation may rule out the easiest explanation without revealing the real fault.

#### Equations first needed today

**Equation:** CO2 + 4 H2 -> CH4 + 2 H2O  
**What it is for:** relating the plant's carbon dioxide and hydrogen feeds to methane and water production  
**Symbols:** CO2 is carbon dioxide; H2 is hydrogen; CH4 is methane; H2O is water; the numbers are mole ratios.  
**Why this campaign needs it:** The crew must learn whether Martian carbon dioxide or recycled hydrogen sets the amount of methane available for the flight home.  
**Also called:** balanced Sabatier equation, methane-production equation, Sabatier stoichiometry  
**Concept:** balancing and stoichiometry

**Equation:** product moles = known moles x (product coefficient / known coefficient)  
**What it is for:** calculating how much product one reactant can support  
**Symbols:** known moles is the measured reactant amount; each coefficient comes from the balanced equation.  
**Why this campaign needs it:** Converting both feeds into possible methane reveals which supply truly stops production first.  
**Also called:** mole ratio, coefficient ratio, stoichiometric conversion  
**Concept:** limiting reactant and theoretical yield

**Crew on this mission - mission log:** Ingrid Sundqvist — production and catalyst lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Atmosphere Intake \| automatic when the player
enters after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Ice coats the intake housing while the compressor
shakes the platform. Sundqvist points to the full-shift capture log.
**Dialogue bubbles -** Sundqvist: "This machine pulls carbon dioxide
from the Martian air. If it cannot collect enough, the reactor cannot
make the methane that takes us home. Before I push it harder, tell me
whether the air supply is actually the problem."

**Unlocks:** Stop 5 at the compressor log desk.

**Beat 2 - After Stop 5 \| compressor log desk \| automatic transition**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The conversion cards lock into one unit-cancelling
chain. **Panel/HUD text:** CO2 MASS -\> CO2 MOLES -\> CH4 MOLES -\> CH4
MASS. **Dialogue bubbles -** Sundqvist: "Use the captured amount. Tell
me what this intake could make before I touch the compressor."

**Unlocks:** Stop 6 at the intake control panel.

**Beat 3 - After Stop 6 \| intake control panel \| automatic reversal**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The proposed compressor-overdrive control becomes
unavailable. **Panel/HUD text:** THEORETICAL CH4: 2405 kg / REQUIRED
CH4: 2000 kg / CO2 SUPPLY: SUFFICIENT. **Dialogue bubbles -** Sundqvist:
"Then the intake is not starving us. We have enough carbon dioxide to
meet the launch target." Abiola, over radio: "That is not good news. If
the air is not holding us back, something else is."

**Unlocks:** Stop 7 at the dual-feed display.

**Beat 4 - After Stop 7 and before Stop 8 \| dual-feed display \|
automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A second feed display opens and highlights the hydrogen
line. **Panel/HUD text:** HYDROGEN IS LIMITING METHANE PRODUCTION.
**Dialogue bubbles -** Sundqvist: "The Martian air was never the
bottleneck. We are not getting enough hydrogen." Abiola: "You may use
one diagnostic pulse, but the reactor must retain enough hydrogen to
restart safely. Divide what remains."

**Unlocks:** Stop 8 at the hydrogen-allocation manifold.

**Beat 5 - Mission outcome and hook \| Atmosphere Intake \| automatic
after Stop 8**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The player allocation appears as three illuminated
pipes: PRODUCTION, DIAGNOSTIC, and RESTART RESERVE. A blue diagnostic
pulse leaves the intake display and travels toward the Hydrogen Store.
**Dialogue bubbles -** Sundqvist: "The intake stays at normal power.
Your test gets one pulse. Restart reserve remains protected." Abiola:
"Follow that pulse. Find where the hydrogen stops being usable."
**Panel/HUD text:** NEXT DESTINATION - HYDROGEN STORE.

**Unlocks:** Mission 3 briefing and the Hydrogen Store waypoint.

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

**Format/placement:** SEQUENCE, at the intake calculation board.

**Metadata:** Concept: stoichiometric workflow; Keystone: balancing and stoichiometry; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Stop reason - exact player copy:** The intake claim needs one valid mass-to-methane calculation path.

**Question card story setup - exact player copy:** To test whether the air intake causes the shortage, first arrange the Sabatier conversion from captured carbon-dioxide mass to possible methane mass. This chain will turn the capture log into a testable production claim.

**Question card story-science connection - exact player copy:** This
tells the crew whether Martian air can supply enough carbon for the ride
home.

**Question card prompt - exact player copy:** Order the workflow for
converting captured CO2 mass into theoretical CH4 mass.

**Cards:** Balance the equation / Convert CO2 mass to moles / Use the
CO2:CH4 mole ratio / Convert CH4 moles to mass / Compare with the
production target.

**Correct order:** As listed.

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

**Format/placement:** BALLPARK, at the compressor log desk.

**Metadata:** Concept: theoretical yield; Keystone: balancing and stoichiometry; Learning role: PRACTICE; Difficulty: L2; Story role: reversal.

**Stop reason - exact player copy:** Compressor power should not increase until its possible methane output is known.

**Question card story setup - exact player copy:** Use that conversion to calculate the most methane the captured carbon dioxide could make before Sundqvist increases compressor power. The answer decides whether extra compressor power could help this shift.

**Question card story-science connection - exact player copy:** If the
theoretical yield already exceeds the target, pushing the compressors
wastes power and risks damage.

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

**Format/placement:** CHOICE, asked by Sundqvist at the compressor
platform.

**Metadata:** Concept: limiting reactant; Keystone: limiting reactant; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** The plant must identify the reactant that actually stops production.

**Question card story setup - exact player copy:** Because the carbon-dioxide supply could meet the target, compare carbon dioxide and hydrogen to find which ingredient stops methane production first. That comparison will move the search to the supply that fails first.

**Question card story-science connection - exact player copy:** The
limiting reactant identifies which supply actually caps the methane
available for launch.

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

**Format/placement:** ALLOCATE, operated at the intake bypass manifold
(compressors fixture).

**Metadata:** Concept: limiting reactant under constraints; Keystone: limiting reactant; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Stop reason - exact player copy:** The diagnostic test must preserve enough hydrogen for a safe restart.

**Question card story setup - exact player copy:** Hydrogen runs out first, so divide the limited release among production, diagnosis, and restart reserve before redirecting the investigation. The chosen split must buy useful evidence without disabling the reactor.

**Question card story-science connection - exact player copy:** Testing
the line costs real fuel, but without the test the crew may spend
another shift repairing the wrong system.

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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Equation coefficients are mole ratios, not mass ratios.

- Convert mass to moles before using coefficients, then convert back if
  needed.

- The limiting reactant is the one that predicts less product.

- Excess reactant can remain even when production stops.

- **Mission takeaway:** Scarce diagnostic material creates a real trade-off between learning and output.

# Mission 3 - Pressure Does Not Lie. Or Does It?

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 13 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** PRESSURE DOES NOT TELL THE WHOLE TRUTH

**Go now:** Go to the Hydrogen Store and meet Dr. Tomás Herrera, the reactor and safety engineer, beside the storage gauge.

**Card body:** Hydrogen is now the leading suspect, but its storage gauge still shows nearly normal pressure. Total pressure can stay high when another gas replaces part of the hydrogen. At the Hydrogen Store, calculate total gas, sample each branch, and test the mixture while warming it. By the end of the mission, decide whether hydrogen leaked away or was replaced before reaching the reactor.

**Objective:** Find where usable hydrogen is lost even though the main
pressure gauge looks normal.

### Worth knowing first - exact player copy

#### Glossary terms

**Pressure**  
**Also called:** pressure, total pressure, gas pressure, atm, bar  
**Definition:** Pressure is force spread over an area, caused here by gas particles striking the tank walls. Total pressure can stay high even when the wrong gas is inside.

**Volume**  
**Also called:** volume, tank volume, L, liters  
**Definition:** Volume is the amount of space occupied by the gas. A sealed tank gives the gas a fixed space unless the hardware changes.

**Absolute temperature**  
**Also called:** absolute temperature, temperature in kelvin, kelvin, K  
**Definition:** Absolute temperature measures thermal motion from the lowest possible temperature. Gas-law calculations use kelvin rather than degrees Celsius.

**Kinetic energy**  
**Also called:** kinetic energy, motion energy, average kinetic energy  
**Definition:** Kinetic energy is energy an object has because it moves. At the same temperature, different gases have the same average kinetic energy even though lighter particles move faster.

**Mixture**  
**Also called:** mixture, gas mixture, mixed gas  
**Definition:** A mixture contains more than one substance without joining them into a new substance. Each gas in a mixture contributes part of the total pressure.

**Composition**  
**Also called:** composition, gas composition, mixture composition  
**Definition:** Composition states which substances are present and how much of each one the mixture contains. It can change even while total pressure stays the same.

**Partial pressure**  
**Also called:** partial pressure, component pressure  
**Definition:** Partial pressure is one gas's share of the total pressure. It measures how much that gas contributes even when the gauge shows only the total.

**Mole fraction**  
**Also called:** mole fraction, gas fraction, composition fraction, x  
**Definition:** Mole fraction is the part of all gas particles belonging to one gas. A value of 0.68 means 68 out of every 100 gas particles are that gas.

#### Primer concepts

- A gauge measures total pressure, not chemical identity.
- At fixed volume, warming a sealed gas raises its pressure in proportion to absolute temperature.
- A model must predict a new measurement before the measurement is made.

#### Equations first needed today

**Equation:** PV = nRT  
**What it is for:** finding the total amount of gas from pressure, volume, and temperature  
**Symbols:** P is pressure; V is volume; n is moles of gas; R is the gas constant; T is absolute temperature in kelvin.  
**Why this campaign needs it:** The storage gauge can reveal the total gas amount but cannot prove how much of that gas is usable hydrogen.  
**Also called:** ideal gas law, gas equation, P V equals n R T  
**Concept:** gas behavior

**Equation:** component pressure = mole fraction x total pressure  
**What it is for:** finding one gas's pressure inside a mixture  
**Symbols:** component pressure is the partial pressure; mole fraction is that gas's share; total pressure is the gauge reading.  
**Why this campaign needs it:** Hydrogen can fall below the reactor's need while nitrogen keeps the total-pressure gauge looking normal.  
**Also called:** Dalton's law calculation, partial-pressure equation, Pi equals Xi Ptotal  
**Concept:** partial pressure

**Equation:** P2 = P1 x (T2 / T1), for fixed gas amount and volume  
**What it is for:** predicting how a sealed gas responds to warming  
**Symbols:** P1 and P2 are the starting and final pressures; T1 and T2 are the starting and final temperatures in kelvin.  
**Why this campaign needs it:** A committed warming prediction tests the pressure model while the composition reading tests the simple-leak story.  
**Also called:** pressure-temperature law, Gay-Lussac relation, sealed-gas warming  
**Concept:** gas-law verification

**Crew on this mission - mission log:** Dr. Tomás Herrera — reactor and safety engineer; Ingrid Sundqvist — production and catalyst lead.



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

**Beat 1 - Arrival \| Hydrogen Store \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A large gauge holds near its green mark while the
reactor-delivery bar flashes LOW. **Dialogue bubbles -** Herrera: "The
gauge measures everything pushing on the tank wall. It does not know
which gas is doing the pushing. Before anyone clears this system, prove
how much of that pressure belongs to hydrogen."

**Unlocks:** Stop 9 at the tank calculation rail; Stop 10 unlocks
immediately after Stop 9.

**Beat 2 - After Stops 9 and 10 \| tank calculation rail \| automatic
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** On the equipment panel, hydrogen particle icons move
faster than nitrogen particle icons at equal temperature; the total-mole
estimate appears beside the pressure gauge. **Dialogue bubbles -**
Herrera: "The total amount is plausible. That still does not make it
usable hydrogen. Sample the line from the tank to the reactor."

**Unlocks:** Stop 11 at the three sampling ports.

**Beat 3 - After Stop 11 \| three sampling ports \| automatic
discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The tank and regulator remain hydrogen-rich, but the
reactor branch turns yellow as nitrogen mole fraction rises. **Panel/HUD
text:** TOTAL PRESSURE: NORMAL / H2 PARTIAL PRESSURE: LOW / N2 DETECTED
AFTER PURGE TIE-IN. **Dialogue bubbles -** Herrera: "There. The gauge
did not lie. We asked it the wrong question."

**Unlocks:** Stop 12 at the heated test branch.

**Beat 4 - After Stop 12 \| heated test branch \| automatic
contradiction**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Measured pressure follows the warming prediction, but
the composition panel shows new nitrogen that a simple leak cannot
create. **Dialogue bubbles -** Herrera: "A leak can remove gas. It
cannot add nitrogen to a sealed branch. The simple-leak model fails."

**Unlocks:** The Mission 3 outcome beat.

**Beat 5 - Mission outcome and hook \| Hydrogen Store \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The purge tie-in is tagged for investigation. Sundqvist
sends an image of blue residue beside a methane valve. **Dialogue
bubbles -** Sundqvist: "Maintenance found this on the methane side. If
the systems crossed, the residue may show where." Herrera: "Only if that
substance could travel the path you claim." **Panel/HUD text:** NEXT
DESTINATION - CATALYST BAY.

**Unlocks:** Mission 4 briefing and the Catalyst Bay waypoint.

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

**Format/placement:** CHOICE, asked by Herrera at the store scales.

**Metadata:** Concept: kinetic molecular theory; Keystone: gas behavior and partial pressure; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Stop reason - exact player copy:** A pressure gauge cannot identify which gas is pressing on it.

**Question card story setup - exact player copy:** Before trusting the full-pressure gauge, determine what equal temperature reveals about hydrogen and nitrogen and what it cannot reveal about gas identity. The distinction keeps a normal needle from clearing the wrong gas.

**Question card story-science connection - exact player copy:** The
answer explains why light hydrogen can escape or spread differently
without having a different average kinetic energy.

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

**Wrong-path feedback:** Speed and kinetic energy are related but not
interchangeable; mass matters. Equal temperature, not equal mass or
speed, sets equal average kinetic energy.

**State/output:** Herrera reveals the branch could be contaminated by
nitrogen purge gas.

## Stop 10 - How many total moles are in the branch?

**Format/placement:** BALLPARK, at the Hydrogen Store calculation desk.

**Metadata:** Concept: ideal gas law; Keystone: gas behavior and partial pressure; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** The total gas amount must be separated from the usable hydrogen amount.

**Question card story setup - exact player copy:** Now use pressure, volume, and temperature to calculate the total gas amount, knowing that a correct total still cannot prove the gas is hydrogen. This total becomes the baseline for the branch-composition test.

**Question card story-science connection - exact player copy:** A normal
total mole count cannot prove those moles are usable hydrogen.

**Question card prompt - exact player copy:** Estimate total gas moles
using R = 0.08206 L atm mol^-1 K^-1.

**Formula:** n = PV/RT = (20.0 atm)(500 L)/\[(0.08206)(300 K)\].

**Correct result:** 406 mol total gas; target 406, tolerance ±2%.

**Answer text:** The branch contains about 406 mol of total gas.

**Why:** The ideal gas law counts total particles through their
pressure-volume-temperature behavior. It does not distinguish H2 from
N2. The normal-looking value can coexist with the wrong composition.

**Wrong-path feedback:** Celsius cannot replace kelvin. Multiplying by R
instead of dividing breaks units. A result near 20 or 500 is a copied
reading, not a mole calculation.

**State/output:** Set evidence_flags.total_moles_normal = true.

## Stop 11 - Sample the branches

**Format/placement:** PROBE, at the three gas sampling ports
(operated/fixture).

**Metadata:** Concept: Dalton's law and composition; Keystone: gas behavior and partial pressure; Learning role: APPLY; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** Only branch-by-branch samples can locate where hydrogen composition changes.

**Question card story setup - exact player copy:** Because the total gas amount looks normal, sample each point from storage to reactor to find where hydrogen is replaced by another gas. The first abnormal port will identify the section that needs repair.

**Question card story-science connection - exact player copy:** Partial
pressure, not the gauge alone, determines how much hydrogen the reactor
can actually use.

**Question card prompt - exact player copy:** Probe all ports and name
where the pattern breaks.

**Complete format-specific interaction block:**

```yaml
probe:
  points:
    - {id: tank, label: "Tank headspace", pressure_atm: 20.0, h2_percent: 96, n2_percent: 3, other_percent: 1}
    - {id: regulator, label: "Regulator outlet", pressure_atm: 19.7, h2_percent: 95, n2_percent: 4, other_percent: 1}
    - {id: reactor_branch, label: "Reactor branch", pressure_atm: 19.5, h2_percent: 68, n2_percent: 31, other_percent: 1}
  required_samples: [tank, regulator, reactor_branch]
  truth: {first_abnormal_point: reactor_branch, h2_partial_pressure_atm: 13.3}
  commit_gate: "All three ports sampled."
```

**Stations/readings:** Tank headspace: 20.0 atm, 96% H2. Regulator
outlet: 19.7 atm, 95% H2. Reactor branch: 19.5 atm, 68% H2, 31% N2, 1%
other.

**Correct result:** The reactor branch is abnormal; at 19.5 atm its H2
partial pressure is only 0.68 x 19.5 = 13.3 atm.

**Answer text:** The reactor branch first fails; hydrogen partial pressure there is about 13.3 atm.

**Why:** Total pressure is the sum of component pressures. The branch
gauge stays high because nitrogen contributes pressure. The desired H2
partial pressure has fallen even though the needle barely moves.
Sampling every station localizes the change between regulator outlet and
reactor branch.

**Wrong-path feedback:** Selecting the largest total-pressure drop
misses composition. Committing before all three readings should
explicitly say one station remains unmeasured.

**State/output:** Set evidence_flags.branch_mixture_wrong = true;
visually highlight purge tie-in between ports 2 and 3.

## Stop 12 - Test the simple-leak prediction

**Format/placement:** VERIFY, at the jacket heater and pressure logger
(operated/fixture).

**Metadata:** Concept: combined gas law/model testing; Keystone: gas behavior and partial pressure; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Stop reason - exact player copy:** The leak model must predict a new measurement before the crew acts on it.

**Question card story setup - exact player copy:** Warm the suspect branch and compare prediction with measurement to decide whether a simple leak or a contaminated mixture explains the alarm. Pressure and composition together will decide which explanation survives.

**Question card story-science connection - exact player copy:** A model
that predicts pressure but cannot explain new nitrogen is not an
explanation the crew should act on.

**Question card prompt - exact player copy:** Predict, act, and measure.
For a sealed fixed-volume sample starting at 19.5 atm and 300 K, what
pressure should a simple no-reaction model give at 330 K?

**Complete format-specific interaction block:**

```yaml
verify:
  prediction:
    prompt: "Predict pressure at 330 K for a sealed fixed-volume sample starting at 19.5 atm and 300 K."
    formula: "P2 = P1(T2/T1)"
    correct: 21.45
    unit: atm
    tolerance: 0.25
  action: {id: warm_branch, label: "Warm sealed branch", from_K: 300, to_K: 330}
  measurement:
    pressure_atm: 21.4
    composition: {h2_percent: 68, n2_percent: 31, other_percent: 1}
  required_sequence: [commit_prediction, warm_branch, measure_pressure, measure_composition]
  truth: "Pressure model passes; pure-hydrogen leak model fails on unchanged nitrogen-rich composition."
```

**Prediction:** P2 = P1(T2/T1) = 21.45 atm; acceptable 21.2-21.7 atm.

**Measured update:** Total pressure 21.4 atm (prediction passes), but
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

### Post-mission metric screen - exact player copy

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

**Header:** 12 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** WHAT CAN TRAVEL WHERE?

**Go now:** Go to Catalyst Bay and meet Mei-Ling Cho, the water and cryogenics engineer, beside the covered blue stain.

**Card body:** A blue stain near a methane valve looks like proof of a leak, but nobody has tested whether that fluid could travel through the gas line. At Catalyst Bay, use molecular shape, polarity, and attractions between molecules to predict how each substance moves. Then operate the separation cartridge across its temperature range. By the end of the mission, decide whether the stain identifies the missing methane's path.

**Objective:** Determine whether the blue residue could have traveled
through the suspected methane-leak path.

### Worth knowing first - exact player copy

#### Glossary terms

**Valence electron**  
**Also called:** valence electron, valence electrons, outer electron  
**Definition:** A valence electron is an electron in an atom's outer occupied region. These electrons are the ones most directly involved in chemical bonds.

**Lewis structure**  
**Also called:** Lewis structure, Lewis diagram, electron-dot structure  
**Definition:** A Lewis structure is a drawing that shows atoms, bonds, and unshared valence electrons. It is the starting map for predicting a molecule's shape.

**Lone pair**  
**Also called:** lone pair, lone pairs, nonbonding pair  
**Definition:** A lone pair is a pair of valence electrons not shared in a bond. Lone pairs still repel other electron groups and can change molecular shape.

**Molecular geometry**  
**Also called:** molecular geometry, molecular shape, VSEPR shape, geometry  
**Definition:** Molecular geometry is the three-dimensional arrangement of atoms in a molecule. The shape determines whether bond effects reinforce or cancel.

**VSEPR model**  
**Also called:** VSEPR, VSEPR model, electron-group repulsion model  
**Definition:** The VSEPR model predicts molecular shape by placing groups of valence electrons as far apart as possible. Lone pairs and bonds both count as electron groups.

**Polarity**  
**Also called:** polarity, polar, nonpolar, molecular polarity  
**Definition:** Polarity is an uneven distribution of electrical charge. A molecule is polar when its bond effects do not cancel across its shape.

**Intermolecular force**  
**Also called:** intermolecular force, intermolecular forces, IMF, particle attraction  
**Definition:** An intermolecular force is an attraction between separate particles. Stronger attractions usually make a substance harder to separate into a gas.

**London dispersion force**  
**Also called:** London dispersion force, dispersion force, LDF  
**Definition:** A London dispersion force is an attraction caused by brief shifts in electron location. Every atom and molecule has it, and particles with more electrons usually have a stronger one.

**Hydrogen bonding**  
**Also called:** hydrogen bonding, hydrogen bond  
**Definition:** Hydrogen bonding is a strong attraction involving hydrogen bonded to nitrogen, oxygen, or fluorine and a nearby particle. It is an attraction between particles, not a new bond inside one molecule.

**Boiling**  
**Also called:** boiling, boil, vaporization throughout a liquid  
**Definition:** Boiling is a change in which bubbles of gas form throughout a liquid. It begins when gas pushing outward from the liquid can match the outside pressure.

**Boiling point**  
**Also called:** boiling point, boiling temperature  
**Definition:** Boiling point is the temperature at which bubbles of vapor can form throughout a liquid. Stronger attractions between particles usually raise it.

**Condensation**  
**Also called:** condensation, condense, condensed  
**Definition:** Condensation is the change from gas to liquid. A substance that condenses upstream cannot travel through the line as a gas.

#### Primer concepts

- Use this chain: Lewis structure -> geometry -> bond effects -> molecular polarity -> intermolecular behavior.
- Similar colors do not prove two residues are the same substance.
- A proposed travel path must agree with the substance's phase and attractions at every temperature along the path.

#### Equations first needed today

No new numerical equation is introduced. These lessons use structural models and observed separator behavior rather than arithmetic.

**Crew on this mission - mission log:** Mei-Ling Cho — water and cryogenics engineer; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Catalyst Bay \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The player approaches a blue stain sealed beneath a
clear cover beside a dry-gas valve. Cho places a residue vial next to
four molecular models. **Dialogue bubbles -** Cho: "A stain is evidence
that a substance reached this spot. It is not proof of how it arrived.
We test the path before we name a leak."

**Unlocks:** Stop 13 at the molecular-model bench; Stop 14 unlocks
immediately after Stop 13.

**Beat 2 - After Stops 13 and 14 \| molecular-model bench \| automatic
transition**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The valid methane structure rotates into a tetrahedron,
and the bond-dipole arrows cancel. **Panel/HUD text:** STRUCTURE -\>
GEOMETRY -\> BOND DIPOLES -\> MOLECULAR POLARITY. **Dialogue bubbles -**
Cho: "Now compare methane with the residue. Shape and polarity decide
whether they travel together."

**Unlocks:** Stop 15 at the property-card rack.

**Beat 3 - After Stop 15 \| property-card rack \| automatic response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Methane enters the NONPOLAR / WEAK DISPERSION lane;
water and glycol enter the POLAR / STRONG ATTRACTION lane. **Dialogue
bubbles -** Cho: "The proposed path asks polar liquid to behave like dry
methane gas. Run the cartridge and make it prove that claim."

**Unlocks:** Stop 16 at the separation cartridge.

**Beat 4 - After Stop 16 \| separation cartridge \| automatic reversal**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Methane passes through while water and glycol remain or
condense far upstream. The path diagram stamps IMPOSSIBLE UNDER RECORDED
CONDITIONS. **Dialogue bubbles -** Cho: "The blue fluid is real. The
methane-leak story attached to it is not."

**Unlocks:** The Mission 4 outcome beat.

**Beat 5 - Mission outcome and hook \| Catalyst Bay \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Cho seals the vial as MAINTENANCE FLUID - UNRELATED
PATH. Abiola calls as a water-balance alarm opens on the wall.
**Dialogue bubbles -** Abiola: "Carbon is accounted for. The residue
cannot follow the proposed route. Now the water numbers are failing too.
We widen the investigation." **Panel/HUD text:** LOCAL INVESTIGATION
COMPLETE / NEXT DESTINATION - WATER PLANT.

**Unlocks:** Mission 5 briefing and the Water Plant waypoint.

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

**Format/placement:** CHOICE, asked by Cho at charge-bench.

**Metadata:** Concept: Lewis structures; Keystone: structure, polarity, and intermolecular forces; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Stop reason - exact player copy:** The stain's proposed route depends first on methane's actual structure.

**Question card story setup - exact player copy:** To test whether the residue could share methane's path, first choose the valid Lewis structure that determines methane's shape. The correct model supplies the geometry used in the travel test.

**Question card story-science connection - exact player copy:** The
correct electron structure is the first step toward predicting whether
methane and the residue can behave alike.

**Question card prompt - exact player copy:** Which Lewis structure for
CH4 is valid?

**Choices:** Central C with four C-H single bonds and no lone pairs on C
**(correct)** / Central C with three C-H bonds and one lone pair /
H=C(H)-H with a double bond to hydrogen / C4- surrounded by four H+
ions.

**Correct result:** Four single bonds, no carbon lone pairs.

**Answer text:** Valid methane has four C-H single bonds, no carbon lone pairs, and a tetrahedral shape.

**Why:** Carbon supplies four valence electrons and reaches an octet
through four shared pairs. Hydrogen forms one bond and never a double
bond. Formal charges are zero in the standard structure.

**Wrong-path feedback:** A lone pair plus three bonds gives carbon an
incorrect electron/formal-charge picture; hydrogen cannot exceed a duet;
ionic fragments do not describe methane.

**State/output:** Add the correct 3D methane model to the rail.

## Stop 14 - From electrons to polarity

**Format/placement:** SEQUENCE, at the molecular model rail.

**Metadata:** Concept: structure-property chain; Keystone: structure, polarity, and intermolecular forces; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** The crew needs the full structure-to-polarity chain before comparing substances.

**Question card story setup - exact player copy:** Use electron arrangement to connect Lewis structure, molecular shape, and polarity so the proposed leak path can be judged. This ordered chain prevents one polar bond from deciding the whole molecule.

**Question card story-science connection - exact player copy:** Geometry
determines whether bond dipoles cancel, so it can rule out a story based
only on chemical labels.

**Question card prompt - exact player copy:** Order the reasoning chain
used to predict molecular polarity.

**Cards:** Draw a valid Lewis structure / Count electron domains and
predict geometry / Identify bond dipoles from electronegativity / Test
whether dipoles cancel in 3D / Classify the molecule as polar or
nonpolar.

**Correct order:** As listed.

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

**Format/placement:** PROTOCOL, at the model rail desk.

**Metadata:** Concept: VSEPR and IMF; Keystone: structure, polarity, and intermolecular forces; Learning role: COMBINE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** Each candidate substance must be matched to behavior the separator can test.

**Question card story setup - exact player copy:** Apply that chain to methane, carbon dioxide, water, and ammonia to identify which substances behave alike and could travel together. The mapping turns invisible molecular attractions into usable separator predictions.

**Question card story-science connection - exact player copy:** These
properties predict which substances travel with methane and which stick
or condense upstream.

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

**Format/placement:** SWEEP, operated at the separation cartridge
fixture.

**Metadata:** Concept: IMF/property behavior; Keystone: structure, polarity, and intermolecular forces; Learning role: APPLY; Difficulty: L3; Story role: reversal.

**Stop reason - exact player copy:** The leak clue survives only if the real cartridge permits that travel path.

**Question card story setup - exact player copy:** Run the separation cartridge to determine whether the blue residue could have traveled through the dry methane line. The measured curve will either preserve or destroy the stain's entire story.

**Question card story-science connection - exact player copy:** If the
blue fluid cannot survive the recorded path, it cannot identify the
methane leak everyone is chasing.

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

### Post-mission metric screen - exact player copy

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

**Header:** 11 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE WATER ACCOUNT

**Go now:** Go to the Water Plant and meet Rosalind Achebe, the analytical and electrochemistry lead, beside the recycle-water meter.

**Card body:** The stain did not travel through the methane line, and a new alarm says the recycled water is contaminated. Shutting the distant ice source would also stop hydrogen and oxygen production. At the Water Plant, measure concentration with a sealed standard, then visit the Ice Cut for an independent sample. By the end of the mission, decide whether the water alarm is real or shared instrument error.

**Objective:** Decide whether the water shortage is real and whether the
meters provide independent evidence.

### Worth knowing first - exact player copy

#### Glossary terms

**Solution**  
**Also called:** solution, solutions, dissolved sample  
**Definition:** A solution is a uniform mixture in which one or more substances are spread through another. A small sample can be concentrated without containing a large total amount.

**Solute**  
**Also called:** solute, solutes, dissolved substance  
**Definition:** A solute is the substance dissolved in a solution. Its total amount depends on both concentration and solution volume.

**Concentration**  
**Also called:** concentration, concentrated, dilute  
**Definition:** Concentration is the amount of solute in a chosen volume of solution. It does not by itself state the total amount in the container.

**Molarity**  
**Also called:** molarity, molar concentration, M, moles per liter  
**Definition:** Molarity is the number of moles of solute in one liter of solution. It lets the plant compare samples of different sizes on the same scale.

**Absorbance**  
**Also called:** absorbance, optical absorbance, A  
**Definition:** Absorbance measures how much light a sample removes from a beam. A useful wavelength gives a strong response without saturating the instrument.

**Beer-Lambert relationship**  
**Also called:** Beer-Lambert relationship, Beer-Lambert law, absorbance relationship  
**Definition:** The Beer-Lambert relationship says absorbance rises predictably with concentration and with the distance light travels through a sample. This mission uses the relationship to choose a sensitive, unsaturated measurement setting.

**Wavelength**  
**Also called:** wavelength, wavelengths, nm, nanometer  
**Definition:** Wavelength is the distance from one repeating part of a wave to the next. Different substances absorb different wavelengths of light.

**Calibration standard**  
**Also called:** calibration standard, standard, reference sample, Standard C  
**Definition:** A calibration standard is a sample with a trusted value used to set an instrument's scale. If several instruments share one bad standard, their agreement is not independent evidence.

**Error**  
**Also called:** error, measurement error, calibration error, instrument error  
**Definition:** Error is the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.

**Instrument saturation**  
**Also called:** instrument saturation, saturation, saturated reading  
**Definition:** Instrument saturation occurs when a signal is too large for the instrument's useful range. Once saturated, a larger signal may no longer produce a meaningfully larger reading.

**Independent evidence**  
**Also called:** independent evidence, independent measurement, independent path  
**Definition:** Independent evidence reaches a conclusion without relying on the same upstream measurement or standard. Two displays are not independent if one is calculated from the other.

#### Primer concepts

- Total solute amount equals concentration multiplied by volume, so concentration alone cannot rank containers by total material.
- Choose a measurement setting that is sensitive to the difference being tested and remains inside the instrument's useful range.
- Trace every alarming display back to its source before treating agreement as confirmation.

#### Equations first needed today

**Equation:** M = moles of solute / liters of solution  
**What it is for:** comparing dissolved amounts in samples of different volume  
**Symbols:** M is molarity in moles per liter; moles of solute is the dissolved amount; liters is the total solution volume.  
**Why this campaign needs it:** The water plant must distinguish a small concentrated sample from a large container holding more total contamination.  
**Also called:** molarity equation, concentration equation, moles per liter  
**Concept:** solutions and concentration

**Crew on this mission - mission log:** Rosalind Achebe — analytical and electrochemistry lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Water Plant \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A recycle-water display flashes CHLORIDE HIGH while a
second panel reports WATER RETURN LOW. Achebe sets a sealed reference
standard beside the wall meter. **Dialogue bubbles -** Achebe: "If the
Ice Cut suddenly turned dirty, we may have to stop both water and
launch-gas production. We verify the measurement before we shut down the
source."

**Unlocks:** Stop 17 at the wet-chemistry bench; Stop 18 unlocks
immediately after Stop 17.

**Beat 2 - After Stops 17 and 18 \| wet-chemistry bench \| automatic
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The interface replaces the label MORE CHLORIDE with two
separate labels: CONCENTRATION and TOTAL MOLES. The recycle sample
molarity populates the treatment model. **Dialogue bubbles -** Achebe:
"A larger concentration is not automatically a larger amount. Now we
have a number the process can use."

**Unlocks:** Stop 19 at the spectrometer.

**Beat 3 - After Stop 19 \| spectrometer \| automatic travel trigger**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The selected wavelength locks and the plant sample
reads high against Standard C. Achebe places a clean field vial in a
rover case. **Dialogue bubbles -** Achebe: "The instrument sees a
signal. We still need a sample that does not share this room, this
meter, or this standard." **Panel/HUD text:** DISTANT VERIFICATION
AUTHORIZED - ICE CUT.

**Unlocks:** The Ice Cut waypoint and Stop 20 after the player reaches
the field sampler.

**Beat 4 - At Ice Cut and after Stop 20 \| automatic discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The raw brine and field blank test normal. A dependency
map then draws three alarming plant readouts back to the same Standard
C. **Panel/HUD text:** THREE READOUTS / ONE CALIBRATION SOURCE.
**Dialogue bubbles -** Achebe: "The displays agree because they
inherited the same error. Agreement is not independence."

**Unlocks:** The Mission 5 outcome beat.

**Beat 5 - Mission outcome and hook \| Ice Cut radio link \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The Ice Cut shutdown order disappears, while three
dashboard channels receive a SHARED CALIBRATION warning. **Dialogue
bubbles -** Abiola: "We will not close a working water source. Return
with the raw measurements. Leak, feed, gas mixture, water, and
calibration go on one board." **Panel/HUD text:** NEXT DESTINATION -
PLANT CONTROL REVIEW.

**Unlocks:** Mission 6 briefing and the Plant Control waypoint.

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

**Format/placement:** CHOICE, asked by Achebe at water-report.

**Metadata:** Concept: concentration versus amount; Keystone: concentration is not amount; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Stop reason - exact player copy:** The water alarm confuses concentration with the total amount present.

**Question card story setup - exact player copy:** Before treating the alarm as water loss, compare sample volume and concentration to determine which container actually holds more chloride. This prevents a small concentrated sample from outweighing a larger inventory.

**Question card story-science connection - exact player copy:** The
water investigation depends on total contaminant, not on whichever
concentration number looks larger.

**Question card prompt - exact player copy:** Which bottle contains more
moles of chloride?

**Choices:** Bottle B: 1.5 mol versus Bottle A's 1.0 mol **(correct)** /
Bottle A because 2.0 M is larger / They contain the same amount because
both contain chloride / Cannot know without molar mass.

**Correct result:** Bottle B.

**Answer text:** Bottle B contains more total chloride even though its concentration is lower.

**Why:** Amount equals concentration times volume. A contains (2.0
mol/L)(0.50 L)=1.0 mol; B contains (0.30)(5.0)=1.5 mol. Molar mass is
needed for mass, not for moles when molarity and volume are already
given.

**Wrong-path feedback:** Concentration compares equal volumes; it does
not by itself give total amount.

**State/output:** Clear misleading alarm label; unlock report
calculation.

## Stop 18 - Put the water sample on a molar scale

**Format/placement:** BALLPARK, at the Water Plant assay desk.

**Metadata:** Concept: molarity; Keystone: concentration is not amount; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** Treatment decisions require a molarity, not a color or bottle size.

**Question card story setup - exact player copy:** Use that distinction to calculate molarity, giving the recycle-water alarm a concentration the plant can compare. The calculated value becomes the process number checked next by the independent field instrument.

**Question card story-science connection - exact player copy:** The
treatment system needs moles per liter before it can predict acidity or
choose a neutralization dose.

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

**Format/placement:** SWEEP, operated at the Water Plant
spectrophotometer.

**Metadata:** Concept: Beer-Lambert/spectroscopy; Keystone: solutions and spectroscopy; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** The independent sample needs a wavelength that can reveal small differences.

**Question card story setup - exact player copy:** Choose the wavelength where the colored complex responds most strongly so an independent sample can confirm or reject the alarm. The selected peak must remain sensitive without saturating the detector.

**Question card story-science connection - exact player copy:** A
sensitive wavelength can reveal whether the wall meter’s alarming
chloride result is real.

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

**Format/placement:** TRACE, operated at the Ice Cut rover sampler after
field results return.

**Metadata:** Concept: evidence dependency; Keystone: evidence must be independent; Learning role: INTRODUCE; Difficulty: L4; Story role: reveal.

**Stop reason - exact player copy:** The distant result matters only if its evidence path is truly independent.

**Question card story setup - exact player copy:** The field sample is normal while three displays still agree, so trace their calibrations to decide whether the agreement comes from independent evidence or shared error. The dependency map will show how many separate measurements really exist.

**Question card story-science connection - exact player copy:** Three
green or red displays count as one piece of evidence if the same
drifting standard controls all three.

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

### Post-mission metric screen - exact player copy

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

**Header:** 10 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE LEAK THAT WAS NOT

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the evidence board.

**Card body:** Carbon is accounted for, the intake can meet demand, the hydrogen branch contains nitrogen, and three water alarms share one standard. These clues need one explanation that fits the quiet readings. Review the evidence in Plant Control, test the diagnosis against uncertainty, then verify its atom balance at the Tank Farm. By the end of the mission, decide whether to end the methane-leak search and repair hydrogen delivery.

**Objective:** Choose one cause that fits every clue and prove it with
complete atom balances.

### Worth knowing first - exact player copy

#### Glossary terms

**Diagnosis**  
**Also called:** diagnosis, cause, explanation, fault diagnosis  
**Definition:** A diagnosis is the proposed cause that explains the full pattern of observations. A strong diagnosis must explain quiet readings as well as alarms.

**Uncertainty**  
**Also called:** uncertainty, allowed range, measurement range  
**Definition:** Uncertainty is the range of values that could reasonably match a measurement. A conclusion is stronger when it survives every value in that allowed range.

**Error**  
**Also called:** error, measurement error, calibration error  
**Definition:** Error is the difference between a measured value and the value a perfect measurement would give. It does not necessarily mean a person made a careless mistake.

**Sensitivity test**  
**Also called:** sensitivity test, stress test, assumption test  
**Definition:** A sensitivity test changes an uncertain input across its allowed range and checks whether the decision changes. It reveals whether a conclusion rests on a fragile number.

**Atom balance**  
**Also called:** atom balance, material balance, element ledger, conservation ledger  
**Definition:** An atom balance counts each element entering, leaving, and remaining in a system. Every atom must appear somewhere even when the desired product was never made.

**Corroboration**  
**Also called:** corroboration, confirmation, supporting evidence  
**Definition:** Corroboration is support from an evidence path that does not repeat the same source. Shared calibration errors can make several displays agree without true corroboration.

#### Primer concepts

- Use the fewest causes that explain all observations without contradicting any quiet reading.
- Test the decision against allowed measurement error before committing repair time.
- Reinterpret each earlier clue only after the new explanation predicts what that clue should show.

#### Equations first needed today

No new equation is introduced. The mission combines the material-balance, stoichiometry, partial-pressure, and concentration relationships already placed in the mission log.

**Crew on this mission - mission log:** Commander Laila Abiola — mission commander; Ingrid Sundqvist — production and catalyst lead; Dr. Tomás Herrera — reactor and safety engineer.



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

**Beat 1 - Arrival \| Plant Control \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Abiola removes the dashboard summary and replaces it
with raw carbon flow, gas composition, water production, pressure, and
residue evidence. **Dialogue bubbles -** Abiola: "No votes. No favorite
alarm. Choose the one mechanism that explains what changed and what
stayed quiet."

**Unlocks:** Stop 21 at the evidence board; Stop 22 unlocks immediately
after Stop 21.

**Beat 2 - After Stops 21 and 22 \| evidence board \| automatic
diagnosis**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** HYDROGEN DELIVERY DEFICIENCY remains highlighted while
the other explanations fail one or more observations, even as the intake
calibration slider moves. **Dialogue bubbles -** Abiola: "The conclusion
survives the allowed measurement error. Now make it predict what an
independent tank sample should show."

**Unlocks:** The prediction-lock travel beat.

**Beat 3 - Travel trigger \| Plant Control to Tank Farm \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The evidence board predicts low methane fraction,
nitrogen present, and no large missing-carbon term. **Panel/HUD text:**
PREDICTION LOCKED - VERIFY AT TANK FARM. **Dialogue bubbles -** Herrera:
"If that prediction is right, the fuel was mostly never made. We should
find carbon in recycle, not outside the plant."

**Unlocks:** The Tank Farm waypoint and Stop 23; Stop 24 unlocks
immediately after Stop 23.

**Beat 4 - After Stops 23 and 24 \| Tank Farm \| automatic Twist 1**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The carbon, hydrogen, and oxygen ledgers close. Earlier
clues flip to their supported meanings one by one. **Panel/HUD text:**
NO MAJOR METHANE LEAK / LOW H2 PARTIAL PRESSURE REDUCED PRODUCTION.
**Dialogue bubbles -** Abiola: "There is no major methane leak. We spent
four shifts looking for fuel that was mostly never produced."

**Unlocks:** The Mission 6 outcome beat.

**Beat 5 - Mission outcome and hook \| Tank Farm \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Relief is interrupted when Herrera opens the first
hydrogen-delivery drop and a signed temperature override appears
immediately before it. **Dialogue bubbles -** Herrera: "Those are my
credentials." Sundqvist: "Then your change may have caused the
collapse." Abiola: "We follow the heat before we accuse the engineer."
**Panel/HUD text:** NEXT ROUTE - SABATIER REACTOR -\> COLD END.

**Unlocks:** Mission 7 briefing and the Sabatier Reactor waypoint.

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

**Format/placement:** DIAGNOSIS, at the Plant Control review board
(calculation/room).

**Metadata:** Concept: multi-evidence diagnosis; Keystone: evidence must be independent; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Stop reason - exact player copy:** The plant cannot redirect work until one cause fits every observation.

**Question card story setup - exact player copy:** Place every clue on one board and choose the cause that explains sufficient carbon dioxide, diluted hydrogen, false residue, and shared water error together. Quiet readings must rule out the tempting explanations as well.

**Question card story-science connection - exact player copy:** Only a
mechanism that explains both the alarms and the quiet readings should
redirect the plant.

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

**Choices:** A Large methane leak downstream; B Insufficient atmospheric
CO2; C Hydrogen delivery deficiency before the reactor; D Completely
dead methane sensor.

**Correct result:** C.

**Answer text:** Hydrogen delivery deficiency before the reactor is the only cause that fits every reading.

**Mechanism:** Nitrogen dilution and reduced H2 partial pressure make H2
limiting, so less CH4 and less coproduct water form. Carbon remains
mostly as unreacted/recycled CO2, closing the ledger. Other gases can
maintain pressure.

**Why alternatives fail:** A predicts a much larger missing-carbon
residual. B contradicts theoretical feed capacity. D cannot explain low
water or abnormal H2 composition.

**State/output:** Set twist_1_diagnosed = true; change mission objective
from find_leak to restore_h2_delivery.

## Stop 22 - Does calibration uncertainty rescue the leak theory?

**Format/placement:** STRESS, asked at Abiola (decision/person).

**Metadata:** Concept: uncertainty/robustness; Keystone: evidence must be independent; Learning role: APPLY; Difficulty: L4; Story role: decision.

**Stop reason - exact player copy:** The crew should abandon the leak hunt only if the diagnosis survives uncertainty.

**Question card story setup - exact player copy:** Vary the intake calibration through its allowed uncertainty to see whether the hydrogen-delivery diagnosis survives measurement error. A robust answer can justify ending four wasted shifts of fruitless leak work.

**Question card story-science connection - exact player copy:** The crew
should abandon the leak search only if that conclusion survives
realistic measurement uncertainty.

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

**Format/placement:** BALANCE, at farm-gauges (calculation/room).

**Metadata:** Concept: full atom ledger; Keystone: particles, moles, balancing, and stoichiometry; Learning role: RETRIEVE; Difficulty: L4; Story role: payoff.

**Stop reason - exact player copy:** Independent atom ledgers can test whether methane was never produced.

**Question card story setup - exact player copy:** Take that prediction to the Tank Farm and close the carbon, hydrogen, and oxygen ledgers to test whether the methane was never produced. The totals will show whether matter vanished or changed chemical form.

**Question card story-science connection - exact player copy:** If every
atom is accounted for, low methane can be explained without matter
disappearing.

**Scene/data:** For a normalized interval the reactor receives 100 mol
CO2 and 320 mol H2. It forms 80 mol CH4 and 160 mol H2O, leaving 20 mol
CO2; no H2 remains in the idealized ledger. Count atoms on both sides.

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
  closure: {C: [100,100], H: [640,640], O: [200,200], tolerance: 0}
  correct_action: "Count atoms in every input and output; identify H2 as limiting."
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

**Format/placement:** CASEBOOK, asked by Abiola at the Tank Farm walkway
(decision/person).

**Metadata:** Concept: clue reinterpretation; Keystone: evidence must be independent; Learning role: COMBINE; Difficulty: L4; Story role: payoff.

**Stop reason - exact player copy:** The reversal is defensible only when every old clue gains a supported meaning.

**Question card story setup - exact player copy:** Match each old clue to its true meaning so the crew can decide whether to end the leak hunt and repair hydrogen delivery. The completed casebook will turn the diagnosis into an earned reveal.

**Question card story-science connection - exact player copy:**
Reconstructing the old evidence proves the leak reversal came from
chemistry, not from a sudden story reveal.

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

### Post-mission metric screen - exact player copy

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

**Header:** 9 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** HEAT

**Go now:** Go to the Sabatier Reactor and meet Dr. Tomás Herrera, the reactor and safety engineer, at the coolant panel.

**Card body:** The leak search is over: too little usable hydrogen reached the reactor, so much of the missing methane was never made. A signed temperature change occurred just before production fell, but restoring the old setting could overheat the plant. At the Reactor and Cold End, calculate heat flow and rebuild the event order. By the end of the mission, decide whether cooling failed before or after the temperature change.

**Objective:** Reconstruct the heat flow and determine why the reactor
temperature was lowered.

### Worth knowing first - exact player copy

#### Glossary terms

**Heat**  
**Also called:** heat, thermal energy transfer, q  
**Definition:** Heat is energy transferred because two regions have different temperatures. It moves from a hotter region toward a colder one.

**Exothermic**  
**Also called:** exothermic, heat-releasing  
**Definition:** An exothermic process releases heat to its surroundings. Increasing an exothermic reaction's production also increases the heat the plant must remove.

**Endothermic**  
**Also called:** endothermic, heat-absorbing  
**Definition:** An endothermic process absorbs heat from its surroundings. Its heat sign is opposite that of an exothermic process.

**Enthalpy change**  
**Also called:** enthalpy change, reaction enthalpy, delta H, ΔH  
**Definition:** Enthalpy change records heat released or absorbed by a process at constant pressure. A negative value means the process releases heat.

**Specific heat capacity**  
**Also called:** specific heat capacity, specific heat, c  
**Definition:** Specific heat capacity is the heat needed to raise one unit of mass by one degree. It connects a measured temperature change to an amount of heat.

**Phase change**  
**Also called:** phase change, melting, freezing, boiling, condensation  
**Definition:** A phase change moves matter between solid, liquid, and gas without changing its chemical identity. During the change, energy can move while temperature stays constant.

**Energy ledger**  
**Also called:** energy ledger, heat balance, thermal balance  
**Definition:** An energy ledger counts energy generated, removed, carried away, and stored. An unaccounted positive amount can appear as a dangerous hot spot.

#### Primer concepts

- The sign of reaction enthalpy tells whether higher production adds to or reduces the cooling burden.
- A delayed temperature signal can result from melting or another phase change, not from a delayed event.
- Event order should follow physical energy flows rather than the order in which gauges respond.

#### Equations first needed today

**Equation:** q = mcΔT  
**What it is for:** calculating heat from a measured temperature change  
**Symbols:** q is heat; m is mass; c is specific heat capacity; ΔT is final temperature minus initial temperature.  
**Why this campaign needs it:** The coolant temperature rise reveals how much reactor heat was actually removed before the temperature override.  
**Also called:** calorimetry equation, heat-capacity equation, m c delta T  
**Concept:** energy and calorimetry

**Equation:** stored energy = energy generated - energy removed - energy carried away  
**What it is for:** closing a thermal ledger  
**Symbols:** generated energy comes from reaction; removed energy leaves through cooling; carried energy leaves with matter; stored energy remains in equipment or gas.  
**Why this campaign needs it:** A positive remainder can create an inlet hot spot even when the average reactor temperature looks safe.  
**Also called:** energy balance, heat ledger, thermal closure  
**Concept:** conservation of energy

**Crew on this mission - mission log:** Dr. Tomás Herrera — reactor and safety engineer; Mei-Ling Cho — water and cryogenics engineer; Ingrid Sundqvist — production and catalyst lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Sabatier Reactor \| automatic when the player
enters after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The reactor rate is low, the old temperature setting is
marked RESTORE, and the cooling-demand trace rises with methane output.
**Dialogue bubbles -** Abiola: "The old setting might recover fuel
quickly. If it also recreates a dangerous condition, it could destroy
our only reactor. Establish where the heat goes before anyone restores
it."

**Unlocks:** Stop 25 at the reactor coolant panel; Stop 26 unlocks
immediately after Stop 25.

**Beat 2 - After Stops 25 and 26 \| reactor coolant panel \| automatic
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The reaction receives an EXOTHERMIC label and the
calculated coolant load appears beneath it. **Dialogue bubbles -**
Herrera: "More methane means more heat to remove. The question is
whether the cooling system still had that capacity."

**Unlocks:** The radiator-side travel beat.

**Beat 3 - Travel trigger \| Reactor to Cold End \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A process diagram highlights warming, melting, and
further-warming stages in sequence, then posts the delayed
temperature-pulse arrival. Its predicted arrival does not match the
radiator log. **Dialogue bubbles -** Cho: "The phase change delays the
signal. To learn what failed first, we need the radiator-side ledger."
**Panel/HUD text:** MOVE TO COLD END.

**Unlocks:** The Cold End waypoint and Stop 27; Stop 28 unlocks
immediately after Stop 27.

**Beat 4 - After Stops 27 and 28 \| Cold End \| automatic discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Dust-obstructed radiator panels appear beside a
positive UNREMOVED HEAT term. The timeline places cooling loss before
the manual override. **Panel/HUD text:** RADIATOR PERFORMANCE FELL FIRST
/ REACTOR SET POINT FELL SECOND. **Dialogue bubbles -** Herrera: "I
lowered the temperature after heat rejection weakened."

**Unlocks:** The Mission 7 outcome beat.

**Beat 5 - Mission outcome and hook \| Cold End \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Sundqvist places CAUSED PRODUCTION LOSS beneath the
override while Herrera places PREVENTED HIGHER TEMPERATURE beside it.
**Dialogue bubbles -** Sundqvist: "A cautious change can still be the
reason we missed production." Herrera: "Then test both claims." Abiola:
"We will. Controlled data, not timing alone." **Panel/HUD text:** NEXT
DESTINATION - PLANT CONTROL RATE BOARD.

**Unlocks:** Mission 8 briefing and the Plant Control waypoint.

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

**Format/placement:** CHOICE, asked by Sundqvist at skid.

**Metadata:** Concept: exothermic/endothermic; Keystone: energy and calorimetry; Learning role: INTRODUCE; Difficulty: L1; Story role: character.

**Stop reason - exact player copy:** Restoring the old setting is unsafe until the reaction's heat direction is clear.

**Question card story setup - exact player copy:** To decide whether lowering the temperature was reckless or protective, first establish whether the Sabatier reaction releases heat as methane production rises. That sign determines whether more production adds or removes reactor heat.

**Question card story-science connection - exact player copy:** The crew
must know whether more production adds heat before anyone restores the
old setting.

**Question card prompt - exact player copy:** What does the negative
enthalpy mean?

**Choices:** The reaction is exothermic; 165 kJ must leave per mole CH4
formed **(correct)** / It is endothermic and needs 165 kJ added / The
catalyst consumes 165 kJ / The sign describes reaction speed.

**Correct result:** First choice.

**Answer text:** The negative enthalpy means the Sabatier reaction is exothermic and releases heat.

**Why:** Negative Delta H means products have lower enthalpy than
reactants and the difference appears as heat released. A catalyst
changes activation energy, not Delta H. Enthalpy says nothing directly
about speed.

**State/output:** Enable coolant-load calculation.

## Stop 26 - Size the coolant load

**Format/placement:** BALLPARK, at Reactor Hall calculation bench.

**Metadata:** Concept: calorimetry; Keystone: energy and calorimetry; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Stop reason - exact player copy:** The coolant's measured heat removal sets the scale of the missing load.

**Question card story setup - exact player copy:** Calculate how much heat the coolant removed and compare it with the load the reactor produced before the override. The result supplies the known removal term for the full energy ledger.

**Question card story-science connection - exact player copy:** This
number determines whether the cooling loop could carry away the
reactor’s released energy.

**Question card prompt - exact player copy:** How much heat did the coolant remove during this interval?

**Prompt/formula:** q = mc Delta T.

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

**Format/placement:** SEQUENCE, at the reactor heat-model board.

**Metadata:** Concept: heating curves; Keystone: energy and calorimetry; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** Phase changes delay signals and can reverse the apparent event order.

**Question card story setup - exact player copy:** Account for the delay caused by warming and melting so the thermal timeline does not mistake a late signal for the first failure. The corrected delay will show which change actually happened first.

**Question card story-science connection - exact player copy:**
Phase-change energy delays the thermal signal and helps establish which
event occurred first.

**Question card prompt - exact player copy:** Order the energy steps.

**Cards:** Warm solid ice to its melting point / Melt ice at constant
temperature using q = n Delta Hfus / Warm liquid water to final
temperature.

**Correct order:** As listed.

**Answer text:** Warm solid, melt at constant temperature, then warm liquid before comparing the delayed signal.

**Why:** Temperature rises within one phase, but during melting the
added energy breaks intermolecular organization while temperature stays
constant. Treating the plateau as mc Delta T invents a temperature
change that does not occur.

**State/output:** Model predicts a delayed warm return pulse reaching
Cold End.

## Stop 28 - Close the reactor-radiator energy ledger

**Format/placement:** BALANCE, at phase-radiator (calculation/room at
Cold End).

**Metadata:** Concept: energy conservation; Keystone: energy and calorimetry; Learning role: COMBINE; Difficulty: L3; Story role: reveal.

**Stop reason - exact player copy:** The energy balance decides whether cooling loss came before the override.

**Question card story setup - exact player copy:** Use the corrected timeline to close the radiator energy ledger and determine whether cooling loss preceded Herrera's temperature change. Any leftover energy must appear as storage, transfer, or dangerous heating.

**Question card story-science connection - exact player copy:**
Unremoved heat can form the inlet hot spot that made Herrera lower the
set point.

**Scene/data:** During one interval the reactor releases 16.5 MJ;
coolant removes 11.4 MJ; the metal bed stores 1.6 MJ; product gas
carries 0.8 MJ. A hidden term closes the ledger.

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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Negative Delta H means the reaction releases heat.

- q = mc Delta T; signs depend on the named system.

- Phase-change energy can enter while temperature stays constant.

- Energy ledgers include removal, transport, storage, and accumulation.

- **Mission takeaway:** Timing matters: radiator loss before the override changes the story of motive.

# Mission 8 - The Override

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 8 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE OVERRIDE

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the initial-rate board.

**Card body:** The cooling system weakened before the temperature was lowered, yet the lower setting clearly reduced methane production. The crew must separate what the change caused from why it was made. In Plant Control and Reactor Hall, derive the rate law, calculate its constant, and reverse one controlled temperature change. By the end of the mission, decide who changed the setting and whether that action caused the immediate slowdown.

**Objective:** Measure the effect of the temperature change and verify
who made the override.

### Worth knowing first - exact player copy

#### Glossary terms

**Reaction rate**  
**Also called:** reaction rate, rate, production rate, initial rate  
**Definition:** Reaction rate measures how quickly reactants are consumed or products are formed. An initial rate is measured before the concentrations have changed much.

**Rate law**  
**Also called:** rate law, rate equation  
**Definition:** A rate law describes how measured reaction rate depends on reactant concentrations. Its exponents must come from experiment, not from the balanced equation.

**Reaction order**  
**Also called:** reaction order, order, exponent  
**Definition:** Reaction order is the exponent showing how strongly rate responds to one concentration. Doubling a first-order reactant doubles rate; doubling a second-order reactant multiplies rate by four.

**Rate constant**  
**Also called:** rate constant, k  
**Definition:** The rate constant is the proportional number in a rate law at a particular temperature. Its units depend on the total reaction order.

**Controlled experiment**  
**Also called:** controlled experiment, control test, one-variable test  
**Definition:** A controlled experiment changes one candidate cause while holding other important conditions fixed. Reversing the change helps separate causation from drift.

**Noise band**  
**Also called:** noise band, measurement noise, expected scatter  
**Definition:** A noise band is the small variation expected when the real condition has not changed. A response must clearly exceed this band before it counts as evidence of cause.

#### Primer concepts

- Compare trials that change one concentration at a time.
- Rate describes speed, not the final amount present after the reaction settles.
- A signed action record proves who changed a control; a reversible experiment proves the control's immediate physical effect.

#### Equations first needed today

**Equation:** rate = k[CO2]^m[H2]^n  
**What it is for:** predicting how carbon-dioxide and hydrogen concentrations change methane-production speed  
**Symbols:** rate is methane formation per time; k is the rate constant; brackets mean concentration; m and n are experimentally measured reaction orders.  
**Why this campaign needs it:** The crew must quantify how hydrogen dilution and the temperature setting changed production before judging the override.  
**Also called:** kinetic rate law, initial-rate equation, rate equals k concentration powers  
**Concept:** kinetics and rate law

**Equation:** k = rate / ([CO2]^m[H2]^n)  
**What it is for:** finding the rate constant from one measured trial  
**Symbols:** every symbol has the same meaning as in the rate law and must use consistent concentration and time units.  
**Why this campaign needs it:** A correct baseline lets the controlled temperature reversal be compared to the response predicted at the starting condition.  
**Also called:** solve for k, kinetic constant calculation  
**Concept:** kinetics and rate law

**Crew on this mission - mission log:** Commander Laila Abiola — mission commander; Ingrid Sundqvist — production and catalyst lead; Dr. Tomás Herrera — reactor and safety engineer.



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

**Beat 1 - Arrival \| Plant Control \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Three initial-rate trials appear beside Herrera's
signed override. **Dialogue bubbles -** Abiola: "We know the temperature
changed and production later fell. Determine exactly how the reaction
responds, then reproduce the effect while every other condition is held
fixed."

**Unlocks:** Stop 29 at the rate board; Stop 30 unlocks immediately
after Stop 29.

**Beat 2 - After Stops 29 and 30 \| rate board \| automatic response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The rate law locks as rate = k\[CO2\]\[H2\]^2 and k
displays as 0.300 M^-2 s^-1. **Dialogue bubbles -** Sundqvist: "Hydrogen
dilution hurts twice in the rate law. Now isolate temperature at the
reactor." **Panel/HUD text:** CONTROLLED REVERSAL AUTHORIZED.

**Unlocks:** The Sabatier Reactor waypoint and Stop 31.

**Beat 3 - After Stop 31 \| Sabatier Reactor \| automatic causal
result**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Lower temperature reduces rate; restoring temperature
restores the immediate rate response while feed, pressure, and flow
remain fixed. **Panel/HUD text:** TEMPERATURE CHANGE CAUSES RATE CHANGE
/ RESPONSE REVERSIBLE. **Dialogue bubbles -** Abiola: "The override
caused the immediate slowdown. That proves the effect, not the motive."

**Unlocks:** Stop 32 at the verification panel.

**Beat 4 - After Stop 32 \| verification panel \| automatic character
beat**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Badge record, controller log, and independent
temperature sensor align; the handwritten note remains unverified.
**Dialogue bubbles -** Abiola: "Herrera made the change. The hardware
changed when the signed log says it did." Herrera: "Then inspect the bed
before you decide whether I should have left it hot."

**Unlocks:** The Mission 8 outcome beat.

**Beat 5 - Mission outcome and hook \| reactor overlook \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A single average-temperature number splits into INLET,
MIDDLE, and OUTLET blanks. **Dialogue bubbles -** Herrera: "A catalyst
bed does not have one temperature. An average can hide the point that
destroys it." Sundqvist: "Then we probe from front to back before
restart." **Panel/HUD text:** NEXT DESTINATION - CATALYST BAY.

**Unlocks:** Mission 9 briefing and the Catalyst Bay waypoint.

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

**Format/placement:** CHOICE, asked by Sundqvist at ledger.

**Metadata:** Concept: experimental rate laws; Keystone: kinetics and rate law; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Stop reason - exact player copy:** The rate response must come from experiment, not equation coefficients.

**Question card story setup - exact player copy:** To measure the override's effect, use initial-rate trials to determine how methane production responds to carbon-dioxide and hydrogen concentration. The exponents will predict why hydrogen dilution damages output so strongly.

**Question card story-science connection - exact player copy:** The rate
law predicts how strongly hydrogen dilution could cut methane
production.

**Data:** Trial 1 \[CO2\]=0.10 M, \[H2\]=0.20 M, rate 1.20e-3 M/s; Trial
2 \[CO2\]=0.20, \[H2\]=0.20, rate 2.40e-3; Trial 3 \[CO2\]=0.10,
\[H2\]=0.40, rate 4.80e-3.

**Question card prompt - exact player copy:** Which rate law fits?

**Choices:** rate = k\[CO2\]\[H2\]^2 **(correct)** / k\[CO2\]^2\[H2\] /
k\[CO2\]\[H2\] / k\[CO2\]^2\[H2\]^4.

**Correct result:** First order in CO2 and second order in H2.

**Answer text:** The rate law is rate = k[CO2][H2]^2.

**Why:** Doubling CO2 at fixed H2 doubles rate, so exponent 1. Doubling
H2 at fixed CO2 quadruples rate, so exponent 2. Overall order is 3.

**Wrong-path feedback:** Do not copy balanced-equation coefficients;
isolate one changing concentration at a time.

**State/output:** Rate-law card added to case file.

## Stop 30 - Calculate k

**Format/placement:** BALLPARK, at Plant Control calculation board.

**Metadata:** Concept: rate constant/units; Keystone: kinetics and rate law; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** The controlled trial needs a numerical baseline for the rate constant.

**Question card story setup - exact player copy:** Calculate the rate constant from one trial so the controlled temperature test has a quantitative baseline. That numerical baseline makes the later temperature reversal a useful quantitative test of cause.

**Question card story-science connection - exact player copy:** A valid
rate constant lets the crew predict the rate change instead of arguing
from the timing alone.

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

**Format/placement:** CONTROL, operated at skid.

**Metadata:** Concept: temperature and rate; Keystone: kinetics and rate law; Learning role: APPLY; Difficulty: L3; Story role: character.

**Stop reason - exact player copy:** A reversible one-variable test can prove the immediate causal effect.

**Question card story setup - exact player copy:** Hold feed, pressure, and flow fixed and reverse only temperature to prove whether Herrera's change caused the slowdown. Restoring the response afterward will clearly separate deliberate intervention from ordinary drift.

**Question card story-science connection - exact player copy:** The
reversal proves the lower set point caused the immediate slowdown, while
leaving the safety motive open.

**Control truth:** temperature. Baseline rate index 100; at 540 K
response 72; restore 560 K response 100 with noise ±2. Other variable
changes are invalid because they change reactant availability or
residence conditions.

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

**Format/placement:** ATTEST, asked at Abiola with a limited evidence
budget (decision/person).

**Metadata:** Concept: verification/chain of custody; Keystone: evidence must be independent; Learning role: APPLY; Difficulty: L3; Story role: reveal.

**Stop reason - exact player copy:** The crew needs separate proof of identity, timing, and physical change.

**Question card story setup - exact player copy:** With the effect established, compare independent access and instrument records to determine who made the change and when. The evidence budget must verify the action without pretending to prove motive.

**Question card story-science connection - exact player copy:** The crew
must distinguish proof that Herrera acted from assumptions about why he
acted.

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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Reaction orders come from controlled rate data, not usually
  coefficients.

- Doubling-response patterns reveal exponents in a rate law.

- Units of k depend on overall order.

- Control one variable and reverse it to establish a causal response.

- **Mission takeaway:** Verification may require separate evidence for identity, timing, and physical condition.

# Mission 9 - The Catalyst Bed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 7 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE CATALYST BED

**Go now:** Go to Catalyst Bay and meet Dr. Tomás Herrera, the reactor and safety engineer, at the bed-sampling rail.

**Card body:** The override caused the slowdown, but the reason for it is still unknown. The catalyst bed now shows weak conversion and may hide a dangerous inlet hot spot behind a normal average. At Catalyst Bay, identify what catalysts change, build the surface mechanism, probe the bed, and assay a sample. By the end of the mission, decide whether the bed is poisoned, starved, or overheating in one region.

**Objective:** Locate the catalyst-bed failure and distinguish damage,
reactant shortage, and overheating.

### Worth knowing first - exact player copy

#### Glossary terms

**Catalyst**  
**Also called:** catalyst, catalytic material, nickel catalyst  
**Definition:** A catalyst speeds a reaction by providing a different path with a lower activation barrier. It is regenerated and does not change reaction enthalpy or the final equilibrium composition.

**Equilibrium**  
**Also called:** equilibrium, chemical equilibrium, final equilibrium composition  
**Definition:** Equilibrium is the steady state reached when forward and reverse chemical changes occur at equal rates. A catalyst reaches that state faster but does not change the final mixture at a fixed temperature.

**Activation energy**  
**Also called:** activation energy, activation barrier, Ea  
**Definition:** Activation energy is the minimum energy needed for particles to follow a reaction path. Lowering this barrier lets more collisions produce reaction.

**Reaction mechanism**  
**Also called:** reaction mechanism, mechanism, reaction path  
**Definition:** A reaction mechanism is a sequence of smaller steps that together produce the overall reaction. It can reveal intermediates, a catalyst, and the slow controlling step.

**Intermediate**  
**Also called:** intermediate, reaction intermediate, surface intermediate  
**Definition:** An intermediate is made in one mechanism step and consumed in a later step. It does not appear in the final balanced equation.

**Rate-determining step**  
**Also called:** rate-determining step, slow step, controlling step  
**Definition:** The rate-determining step is the slow mechanism step that most strongly limits the overall rate. Blocking that step can reduce production even when other steps remain possible.

**Active site**  
**Also called:** active site, active sites, nickel site, surface site  
**Definition:** An active site is a location on a catalyst surface where reactants can attach and react. The number of available sites affects how much catalyst activity remains.

**Catalyst poisoning**  
**Also called:** catalyst poisoning, poisoned catalyst, surface contamination  
**Definition:** Catalyst poisoning occurs when another substance blocks or changes active sites. A poison entering at one end can create a spatial failure rather than a uniform loss.

**Spatial profile**  
**Also called:** spatial profile, inlet-to-outlet profile, bed map  
**Definition:** A spatial profile shows how a reading changes from one location to another. It can reveal a local hot spot or inlet-first failure hidden by an average.

#### Primer concepts

- A catalyst changes how fast equilibrium is reached, not where equilibrium ends.
- A mechanism must reproduce the balanced reaction after intermediates and the catalyst cancel.
- Sample from inlet to outlet before calling a catalyst bed uniformly damaged.

#### Equations first needed today

No new numerical equation is introduced. The mission retrieves the rate-law idea and tests it with a mechanism, a spatial profile, and an independent surface assay.

**Crew on this mission - mission log:** Dr. Tomás Herrera — reactor and safety engineer; Ingrid Sundqvist — production and catalyst lead; Rosalind Achebe — analytical and electrochemistry lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Catalyst Bay \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The average reactor temperature glows green while
unsampled inlet and outlet ports pulse gray. **Dialogue bubbles -**
Herrera: "A green average does not clear a hot inlet. Determine what a
catalyst can change, then find where this bed stops behaving normally."

**Unlocks:** Stop 33 at the mechanism console; Stop 34 unlocks
immediately after Stop 33.

**Beat 2 - After Stops 33 and 34 \| mechanism console \| automatic
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The catalyst is shown being consumed and regenerated
through the mechanism; equilibrium and enthalpy indicators remain
unchanged. **Dialogue bubbles -** Herrera: "A fresh catalyst can restore
a path, not change the final balance or the heat of reaction. Now probe
the real bed."

**Unlocks:** Stop 35 at the bed sampling rail.

**Beat 3 - After Stop 35 \| bed sampling rail \| automatic spatial
discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Inlet temperature and halide signal spike while
conversion falls first at the front of the bed. **Panel/HUD text:**
FAILURE IS NOT UNIFORM / INLET-FIRST DAMAGE. **Dialogue bubbles -**
Sundqvist: "That looks like catalyst poison. Send a sample to Achebe."

**Unlocks:** The Assay Lab waypoint and Stop 36.

**Beat 4 - After Stop 36 \| Assay Lab \| automatic diagnosis**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The independent surface assay confirms halide
contamination. A separate historic inlet reading of 612 K appears beside
the result. **Dialogue bubbles -** Achebe: "The catalyst is damaged. The
assay does not explain why the inlet reached 612 kelvin before the
override."

**Unlocks:** The Mission 9 outcome beat.

**Beat 5 - Mission outcome and hook \| Assay Lab \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Sundqvist marks REPLACE CATALYST; Herrera marks EXPLAIN
HIDDEN HOT SPOT. Abiola starts a final model review timer. **Dialogue
bubbles -** Sundqvist: "We found the failure. Restore the old point
after replacement." Herrera: "Only if your model predicts the run you
never showed." Abiola: "Freeze the model. Reveal the hidden data."
**Panel/HUD text:** NEXT TEST - HOLDOUT THERMAL RUN.

**Unlocks:** Mission 10 briefing and the Sabatier Reactor waypoint.

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

**Format/placement:** CHOICE, asked by Sundqvist at charge-bench.

**Metadata:** Concept: catalysis; Keystone: catalysts and mechanisms; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Stop reason - exact player copy:** Replacing catalyst helps only if the crew knows what catalyst can change.

**Question card story setup - exact player copy:** Before replacing the bed, determine exactly what a fresh catalyst can change and what it cannot fix about equilibrium or heat. The answer separates a speed repair from an equilibrium or heat solution.

**Question card story-science connection - exact player copy:** The
answer determines whether a new bed can restore speed or move the
equilibrium ceiling.

**Question card prompt - exact player copy:** A fresh catalyst replaces
the old one at the same temperature, pressure, and feed. What changes?

**Choices:** The reaction reaches the same equilibrium composition
faster because activation energy is lower **(correct)** / K increases
and more methane exists at equilibrium / Delta H becomes more negative /
Only the forward reaction speeds up.

**Answer text:** A fresh catalyst lowers activation energy and reaches the same equilibrium faster without changing K or reaction enthalpy.

**Why:** Catalysts speed both forward and reverse pathways and leave
thermodynamic state functions and K unchanged.

**Wrong-path feedback:** More activity is not a new equilibrium; Delta H
depends on initial/final states.

**State/output:** Qualify catalyst concept before mechanism rail.

## Stop 34 - Build the surface mechanism

**Format/placement:** SEQUENCE, at bed-log mechanism rail.

**Metadata:** Concept: mechanisms/intermediates/RDS; Keystone: catalysts and mechanisms; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** The surface mechanism predicts how inlet contamination removes active sites.

**Question card story setup - exact player copy:** Build the surface mechanism to show how blocking nickel sites could slow the reaction where a contaminant first enters. The ordered steps identify the catalyst, intermediate, and slow controlling step.

**Question card story-science connection - exact player copy:** The
mechanism explains how contamination at the inlet can remove productive
reaction sites.

**Cards:** CO2 and H2 adsorb on free Ni sites / surface intermediates
form in the slow conversion step / CH4 and H2O desorb / free Ni sites
are regenerated.

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

**Format/placement:** PROBE, at bed ports (operated/fixture).

**Metadata:** Concept: spatial diagnosis; Keystone: energy, kinetics, and catalysts; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** An average temperature cannot show where the catalyst bed first fails.

**Question card story setup - exact player copy:** Sample the inlet, middle, and outlet to determine whether the loss is uniform or concentrated beside a hidden hot spot. The first broken station will distinguish local damage from a uniform loss.

**Question card story-science connection - exact player copy:** Where
the pattern first breaks separates inlet poisoning from a uniform
reactor failure.

**Stations:** inlet 0 m: 612 K, conversion 18%, halide signal high;
middle: 585 K, cumulative conversion 48%, halide medium; outlet: 563 K,
cumulative conversion 55%, halide low. Expected clean pattern peaks
below 590 K with conversion rising smoothly to 70%.

**Question card prompt - exact player copy:** Probe every station and
name where the pattern first breaks.

**Complete format-specific interaction block:**

```yaml
probe:
  points:
    - {id: inlet, label: "Inlet / 0 m", temperature_K: 612, cumulative_conversion_percent: 18, halide: high, local_activity: low}
    - {id: middle, label: "Middle", temperature_K: 585, cumulative_conversion_percent: 48, halide: medium, local_activity: medium}
    - {id: outlet, label: "Outlet", temperature_K: 563, cumulative_conversion_percent: 55, halide: low, local_activity: near_normal}
  reference: {peak_temperature_max_K: 590, expected_outlet_conversion_percent: 70, profile: "smooth rise"}
  required_samples: [inlet, middle, outlet]
  truth: {first_abnormal_point: inlet, pattern: "nonuniform inlet-first poisoning plus hot spot"}
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

**Format/placement:** DIAGNOSIS, at spec-bench in Assay Lab
(calculation/room).

**Metadata:** Concept: catalyst poisoning vs operating limits; Keystone: catalysts and mechanisms; Learning role: APPLY; Difficulty: L4; Story role: apparent resolution.

**Stop reason - exact player copy:** The independent assay must distinguish poisoning from other plausible failures.

**Question card story setup - exact player copy:** Combine that pattern with the independent surface assay to identify the immediate failure and decide whether catalyst replacement is necessary. The verdict decides whether replacement is necessary before any restart test.

**Question card story-science connection - exact player copy:** The crew
needs to know whether replacing catalyst is necessary before testing the
dangerous old setting.

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

**Answer text:** Halide poisoning concentrated at the inlet is the immediate catalyst failure.

**Why:** The surface assay and inlet-first loss fit poisoning. Uniform
sintering would reduce activity throughout; current H2 and pressure are
controlled normal. The hot gradient is real but is not explained away—it
becomes the safety question for Mission 10.

**State/output:** Mark catalyst_inlet_poisoned = true; apparent story
verdict: old settings plus poisoned inlet caused collapse.

## Mission outcome

Mission decision: Halide damaged the catalyst most at the inlet. The surface test finds blocked nickel sites. Part of the bed must be replaced. Yet that damage does not explain the old 612 K hot spot. One hidden heat record will test whether the old setting was safe.

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Catalysts lower activation energy and speed approach to equilibrium.

- Catalysts do not change K, Delta H, or the equilibrium composition.

- Intermediates are formed then consumed; catalysts are regenerated.

- Spatial patterns distinguish inlet-first poisoning from uniform
  deactivation.

- **Mission takeaway:** A correct immediate diagnosis can still leave a deeper causal or safety problem.

# Mission 10 - The Saboteur

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 6 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE SABOTEUR

**Go now:** Go to the Sabatier Reactor and meet Commander Laila Abiola, the mission commander, at the sealed model display.

**Card body:** The inlet catalyst is poisoned, and the old operating point still looks like the fastest way to recover production. One unseen thermal run may show why that apparent solution is unsafe. At Reactor Hall, freeze the accusation model, test it on hidden data, inspect residuals, and stress the temperature error. By the end of the mission, decide whether the override created the danger or interrupted it.

**Objective:** Test the accusation against unseen evidence and
reconstruct Herrera's reason for the override.

### Worth knowing first - exact player copy

#### Glossary terms

**Model**  
**Also called:** model, explanation model, prediction model  
**Definition:** A model is a simplified explanation that makes testable predictions. A model is useful only where its predictions survive evidence it did not use for fitting.

**Holdout data**  
**Also called:** holdout data, hidden data, unseen run, withheld interval  
**Definition:** Holdout data are measurements kept hidden while a model is chosen. Revealing them tests whether the model predicts rather than memorizes known observations.

**Residual**  
**Also called:** residual, residuals, prediction error  
**Definition:** A residual is the measured value minus the model's predicted value. A repeated pattern in residuals can reveal a missing cause even when average error is small.

**Systematic pattern**  
**Also called:** systematic pattern, structured error, repeated bias  
**Definition:** A systematic pattern is an error that repeats with condition, place, or time. It is more dangerous than random scatter when it occurs near a safety limit.

**Sensor bias**  
**Also called:** sensor bias, calibration bias, temperature bias  
**Definition:** Sensor bias is a measurement error that tends to shift readings in one direction. Stressing the allowed bias shows whether a safety decision is robust.

**Safety margin**  
**Also called:** safety margin, thermal margin, margin to limit  
**Definition:** Safety margin is the distance between the operating condition and a dangerous boundary. A plan fails if allowed uncertainty can erase that distance.

**Causal order**  
**Also called:** causal order, event order, cause-and-effect chain  
**Definition:** Causal order states which physical event occurred first and which changes followed. Timing alone does not prove cause, but a cause cannot occur after its effect.

#### Primer concepts

- Freeze a model before revealing holdout data.
- Inspect where residuals occur, not only their overall size.
- A suspicious action can cause production loss and still prevent a larger danger.

#### Equations first needed today

No new required equation is introduced. The player reads residuals and uncertainty ranges supplied by the instruments, then judges prediction, pattern, and safety margin.

**Crew on this mission - mission log:** Commander Laila Abiola — mission commander; Dr. Tomás Herrera — reactor and safety engineer; Rosalind Achebe — analytical and electrochemistry lead; Ingrid Sundqvist — production and catalyst lead.



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

**Beat 1 - Arrival \| Sabatier Reactor \| automatic when the player
enters after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A case board reads HERRERA OVERRIDE -\> PRODUCTION
COLLAPSE. One dataset remains sealed beneath NOT USED IN FIT. **Dialogue
bubbles -** Abiola: "The accusation fits the records everyone saw. It
must also predict the record nobody used to build it."

**Unlocks:** Stop 37 at the holdout-model display; Stop 38 unlocks
immediately after Stop 37.

**Beat 2 - After Stops 37 and 38 \| model display \| automatic
reversal**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The accusation model fails on the hidden run, with
residual arrows pointing the same direction during the hottest inlet
periods. **Panel/HUD text:** MODEL MISSES DANGER AT THE SAFETY BOUNDARY.
**Dialogue bubbles -** Achebe: "Its average error looked small because
safe runs outnumbered dangerous ones. The failure is patterned exactly
where it matters."

**Unlocks:** Stop 39 at the uncertainty panel.

**Beat 3 - After Stop 39 \| uncertainty control \| automatic safety
decision**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** A +/-5% sensor-bias slider pushes the old operating
point across the red heat limit while the lower-temperature point
retains margin. **Dialogue bubbles -** Abiola: "The old point is not
safe across the sensor's allowed error. It will not be restored."

**Unlocks:** The Plant Control waypoint and Stop 40.

**Beat 4 - After Stop 40 \| Plant Control chronology wall \| automatic
Twist 2**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The player locks the order RADIATOR LOSS -\> INLET HOT
SPOT -\> OVERRIDE -\> PURGE -\> PRODUCTION FALL. **Panel/HUD text:**
OVERRIDE WAS A SAFETY RESPONSE. **Dialogue bubbles -** Herrera: "I cut
production because the inlet was running away." Abiola: "You prevented a
reactor failure. You also withheld an incomplete warning. Both facts
stand."

**Unlocks:** The Mission 10 outcome beat.

**Beat 5 - Mission outcome and hook \| Plant Control \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** SABOTAGE is removed from Herrera's profile; SAFETY
INTERVENTION and FAILED COMMUNICATION replace it. The production clock
continues counting down. **Dialogue bubbles -** Sundqvist: "The safe
setting will not make methane fast enough." Herrera, opening the
equilibrium display: "Faster is not the same as more." **Panel/HUD
text:** NEXT ROUTE - REACTOR -\> COLD END -\> PLANT CONTROL.

**Unlocks:** Mission 11 briefing and the Sabatier Reactor waypoint.

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

**Format/placement:** HOLDOUT, operated at analyser.

**Metadata:** Concept: model validation; Keystone: evidence must be independent; Learning role: RETRIEVE; Difficulty: L4; Story role: reversal.

**Stop reason - exact player copy:** The accusation must predict data that were not used to build it.

**Question card story setup - exact player copy:** Freeze the accusation built from the visible runs, then test it on the hidden hot interval to see whether it predicts unseen evidence. The hidden interval contains the cooling failure that the visible runs omitted.

**Question card story-science connection - exact player copy:** If the
accusation cannot predict unseen danger, it cannot justify restarting
the reactor.

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

**Format/placement:** RESIDUAL, operated at the analyzer residual field.

**Metadata:** Concept: residual structure; Keystone: evidence must be independent; Learning role: PRACTICE; Difficulty: L4; Story role: clue.

**Stop reason - exact player copy:** Average error can hide a dangerous, repeated miss near the safety limit.

**Question card story setup - exact player copy:** Inspect where each model misses because errors nearest the heat limit matter more than good average agreement. The full error pattern, not just the RMS, decides which model is safe.

**Question card story-science connection - exact player copy:** A small
average error is unsafe if the model always misses in the same dangerous
direction.

**Models:** A RMS error 2.1 but residuals jump to +12,+15,+14 K during
low radiator capacity; B RMS 2.8 with residuals scattered -4 to +4 K and
no pattern.

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

**State/output:** Highlight spatial heat-removal term missing from model
A.

## Stop 39 - Stress the hidden temperature error

**Format/placement:** STRESS, asked by Sundqvist at the reactor console
(decision/person).

**Metadata:** Concept: uncertainty and safety margin; Keystone: energy and uncertainty; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Stop reason - exact player copy:** The old operating point must remain safe across allowed sensor error.

**Question card story setup - exact player copy:** Move the sensor bias across its allowed range to decide whether the old setting remains safe when the temperature reading is slightly wrong. Crossing the limit anywhere in the range defeats the restoration plan.

**Question card story-science connection - exact player copy:** The old
setting is defensible only if it stays safe across the sensor’s allowed
error.

**Assumption slider:** inlet thermocouple bias from -5% to +5%; old
operating point safety limit 620 K; observed peak 612 K; validated lower
point observed peak 575 K.

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

**Correct result:** No. If the sensor reads 2% low, actual peak is about
624 K, already above limit; at -5% actual is about 644 K. The lower
point remains below limit across the range.

**Answer text:** Do not restore the old point; allowed negative sensor bias pushes the true peak over the limit.

**Why:** A setting is not safe because its central estimate lies eight
kelvin below a limit. The uncertainty range crosses the consequence
boundary. Robust operation needs margin.

**State/output:** Sundqvist withdraws restoration request;
reactor_safety_margin + 20 for lower point.

## Stop 40 - What did Herrera know, and when?

**Format/placement:** CASEBOOK, asked by Abiola in Plant Control
(decision/person).

**Metadata:** Concept: evidence synthesis; Keystone: energy and causal evidence; Learning role: TRANSFER; Difficulty: L4; Story role: payoff.

**Stop reason - exact player copy:** The mission needs the causal order that separates sabotage from protection.

**Question card story setup - exact player copy:** Reconstruct the chain from radiator loss through override and production fall to determine whether Herrera created or interrupted the danger. The completed timeline will show whether the override caused or interrupted danger.

**Question card story-science connection - exact player copy:** The same
action looks like sabotage or protection depending on the scientifically
established causal order.

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

**State/output:** twist_2_complete = true; restore Herrera's access;
herrera_trust + 3, crew_trust + 1.

## Mission outcome

Mission decision: The override stopped a heat runaway. The hidden run breaks the blame model. Its errors miss the same danger each time, and sensor error can push the old point past the limit. The old setting will not return. The plant needs a slower, safer way to make fuel.

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Holdout data tests whether a model predicts evidence it did not fit.

- Residual patterns can reveal missing mechanisms even when average
  error is low.

- Stress testing asks whether uncertainty crosses a decision boundary.

- Safety requires margin, not merely a best estimate below the limit.

- **Mission takeaway:** A fair character reversal keeps the action true and changes its scientifically supported meaning.

# Mission 11 - Fast Is Not the Same as More

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 5 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** FAST IS NOT THE SAME AS MORE

**Go now:** Go to the Sabatier Reactor and meet Dr. Tomás Herrera, the reactor and safety engineer, at the equilibrium board.

**Card body:** The hidden run proves that lowering the temperature prevented a thermal runaway. The safe setting is slower, but reaction speed does not determine the final methane amount. At the Reactor, Cold End, and Plant Control, use equilibrium, product removal, pressure, and heat limits to compare operating plans. By the end of the mission, choose a plan that can recover methane without crossing the thermal limit.

**Objective:** Choose reactor conditions that satisfy production speed,
final methane yield, and thermal safety.

### Worth knowing first - exact player copy

#### Glossary terms

**Dynamic equilibrium**  
**Also called:** equilibrium, dynamic equilibrium, chemical equilibrium  
**Definition:** Dynamic equilibrium is a state where forward and reverse reactions continue at equal rates. The amounts remain steady even though particles still react.

**Equilibrium constant**  
**Also called:** equilibrium constant, K, Kc  
**Definition:** The equilibrium constant compares product and reactant concentrations at equilibrium for one temperature. Its value changes when temperature changes.

**Reaction quotient**  
**Also called:** reaction quotient, Q, Qc  
**Definition:** The reaction quotient uses the same concentration form as the equilibrium constant but can be calculated before equilibrium. Comparing Q with K predicts the direction of net change.

**ICE table**  
**Also called:** ICE table, initial-change-equilibrium table, equilibrium table  
**Definition:** An ICE table organizes initial concentrations, their linked changes, and equilibrium concentrations. One reaction extent controls every change through the balanced coefficients.

**Le Chatelier's principle**  
**Also called:** Le Chatelier's principle, equilibrium shift, stress response  
**Definition:** Le Chatelier's principle predicts how an equilibrium system responds to a changed condition. The response reduces part of the imposed change but does not restore every original value.

**Equilibrium yield**  
**Also called:** equilibrium yield, final methane fraction, equilibrium composition  
**Definition:** Equilibrium yield is the product amount or fraction present after forward and reverse rates become equal. It is different from how quickly that state is reached.

**Degeneracy**  
**Also called:** degeneracy, equal-fit plans, indistinguishable solutions  
**Definition:** Degeneracy occurs when two different explanations or plans match the same current evidence. A new physical constraint or measurement is needed to separate them.

#### Primer concepts

- Kinetics determines speed; equilibrium determines final composition.
- For an exothermic reaction, raising temperature can speed the approach while reducing the equilibrium methane yield.
- Removing a product or raising pressure can favor methane production without returning to the dangerous temperature.

#### Equations first needed today

**Equation:** Kc = [CH4][H2O]^2 / ([CO2][H2]^4)  
**What it is for:** comparing equilibrium products with reactants for the Sabatier reaction  
**Symbols:** brackets are equilibrium molar concentrations; each exponent is the coefficient from the balanced equation.  
**Why this campaign needs it:** The safer reactor setting must still reach enough final methane, not merely produce methane quickly at the start.  
**Also called:** equilibrium expression, Sabatier Kc, equilibrium constant expression  
**Concept:** equilibrium

**Equation:** concentration at equilibrium = initial concentration + coefficient-linked change  
**What it is for:** completing an ICE table with one reaction extent  
**Symbols:** initial concentration is the starting value; change is negative for consumed reactants and positive for formed products; coefficients set relative sizes.  
**Why this campaign needs it:** The plant needs a numerical methane ceiling at the safe temperature before committing pressure and water-removal power.  
**Also called:** ICE relationship, equilibrium change row, reaction extent  
**Concept:** equilibrium and stoichiometry

**Crew on this mission - mission log:** Dr. Tomás Herrera — reactor and safety engineer; Mei-Ling Cho — water and cryogenics engineer; Ingrid Sundqvist — production and catalyst lead; Yusuf Demir — power and life-support officer; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Sabatier Reactor \| automatic when the player
enters after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The safe operating point sits below the thermal limit
but behind the methane schedule. **Dialogue bubbles -** Herrera:
"Temperature changes how quickly we move. Equilibrium determines where
the reaction can finish. We need a plan that satisfies both."

**Unlocks:** Stop 41 at the equilibrium board; Stop 42 unlocks
immediately after Stop 41.

**Beat 2 - After Stops 41 and 42 \| equilibrium board \| automatic
response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The equilibrium expression and completed ICE table
reveal the methane-yield ceiling at the current condition. **Dialogue
bubbles -** Herrera: "Raising temperature may speed this exothermic
reaction while lowering its equilibrium methane yield. Look for a
different lever."

**Unlocks:** The Cold End waypoint and Stop 43.

**Beat 3 - Travel and after Stop 43 \| Cold End \| automatic
experiment**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Cho removes product water at fixed temperature; methane
conversion rises, then returns when the baseline is restored.
**Panel/HUD text:** PRODUCT REMOVAL INCREASES CH4 YIELD WITHOUT RAISING
TEMPERATURE. **Dialogue bubbles -** Cho: "The separator can pull the
reaction forward and return that water to the plant."

**Unlocks:** The Plant Control waypoint and Stop 44.

**Beat 4 - After Stop 44 \| Plant Control \| automatic integrated
decision**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Two equal-rate plans appear. Thermal margin and
equilibrium yield eliminate the hotter plan. **Panel/HUD text:**
VALIDATED PLAN - LOWER TEMPERATURE / HIGHER PRESSURE / PRODUCT WATER
REMOVAL. **Dialogue bubbles -** Abiola: "One plan. One set of limits.
Reactor, separator, and control room sign together."

**Unlocks:** The Mission 11 outcome beat.

**Beat 5 - Mission outcome and hook \| Plant Control \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Herrera and Sundqvist sign the same operating card.
Demir overlays the power required for compression, cooling, and
separation. **Dialogue bubbles -** Demir: "This plan can make the fuel.
It also spends power in three places, and its hydrogen still comes from
recycled water." Abiola: "Then we stop treating the plant like separate
rooms." **Panel/HUD text:** NEXT ROUTE - ICE CUT -\> WATER PLANT -\>
ELECTROLYSIS HALL.

**Unlocks:** Mission 12 briefing and the Ice Cut waypoint.

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

**Format/placement:** CHOICE, asked by Herrera at equil-stub.

**Metadata:** Concept: equilibrium expressions; Keystone: equilibrium and reaction quotient; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Stop reason - exact player copy:** A safer operating plan needs the correct expression for final composition.

**Question card story setup - exact player copy:** To replace the unsafe setting, first write the equilibrium expression that describes the final balance among the four Sabatier gases. This expression defines the balance the recovery plan must satisfy.

**Question card story-science connection - exact player copy:** The
expression defines the methane-water balance the safer operating plan
must reach.

**Question card prompt - exact player copy:** Which Kc expression
matches the gas-phase Sabatier equation?

**Choices:** \[CH4\]\[H2O\]^2 / (\[CO2\]\[H2\]^4) **(correct)** /
\[CH4\]\[H2O\] / \[CO2\]\[H2\] / \[CO2\]\[H2\]^4 / \[CH4\]\[H2O\]^2 /
\[CH4\]^1\[H2O\]^2 - \[CO2\]^1\[H2\]^4.

**Answer text:** Kc = [CH4][H2O]^2 / ([CO2][H2]^4).

**Why:** Coefficients become exponents; products are over reactants;
equilibrium expressions multiply activities rather than subtracting
concentrations.

**Wrong-path feedback:** The written equation supplies powers, not
rate-law orders; here it is valid because this is K, not a kinetic rate
law.

**State/output:** Unlock ICE board.

## Stop 42 - Complete the ICE table

**Format/placement:** BALANCE, at the Reactor Hall ICE board
(calculation/room).

**Metadata:** Concept: ICE stoichiometry; Keystone: equilibrium and stoichiometry; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** The equilibrium ceiling must be calculated before another control is changed.

**Question card story setup - exact player copy:** Use the measured changes in an ICE table to calculate the current equilibrium and the methane-yield ceiling at the safe temperature. The result sets the methane ceiling at the safe temperature.

**Question card story-science connection - exact player copy:** The
equilibrium ceiling tells the crew how much methane is possible after
the reaction has enough time.

**Data:** In a 1.00 L model vessel, initial \[CO2\]=1.00 M, \[H2\]=4.00
M, products zero. Measured equilibrium \[CH4\]=0.60 M.

**Question card prompt - exact player copy:** Complete changes and
equilibrium concentrations, then calculate Kc for this training
condition.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "ICE table for 1.00 L vessel", reaction: "CO2 + 4H2 <=> CH4 + 2H2O"}
  streams:
    - {id: co2, label: "CO2", initial_M: 1.00, change_M: -0.60, equilibrium_M: 0.40}
    - {id: h2, label: "H2", initial_M: 4.00, change_M: -2.40, equilibrium_M: 1.60}
    - {id: ch4, label: "CH4", initial_M: 0.00, change_M: 0.60, equilibrium_M: 0.60}
    - {id: h2o, label: "H2O", initial_M: 0.00, change_M: 1.20, equilibrium_M: 1.20}
  closure: {Kc: 0.3296, tolerance: 0.01}
  correct_action: "Use one extent x with coefficients -1, -4, +1, +2, then calculate Kc."
```

**Correct result:** Change -0.60 CO2, -2.40 H2, +0.60 CH4, +1.20 H2O;
equilibrium 0.40, 1.60, 0.60, 1.20 M.
Kc=(0.60)(1.20)^2/\[(0.40)(1.60)^4\] = 0.329 (about 0.33).

**Answer text:** The equilibrium row is 0.40, 1.60, 0.60, and 1.20 M, giving Kc about 0.33.

**Why:** Every change is tied to one reaction extent x and multiplied by
coefficients. Hydrogen changes by -4x; water by +2x. The balanced row is
the guardrail against treating each concentration independently.

**Wrong-path feedback:** If H2 falls by 0.60, point to coefficient four.
If water becomes 0.60, point to coefficient two.

**State/output:** Model predicts that lowering product-water activity
can drive more conversion.

## Stop 43 - Push the balance on purpose

**Format/placement:** CONTROL, operated at coldline-tap in Cold End.

**Metadata:** Concept: Le Châtelier/Q vs K; Keystone: equilibrium and reaction quotient; Learning role: COMBINE; Difficulty: L3; Story role: experiment.

**Stop reason - exact player copy:** Product removal offers a yield test without raising dangerous temperature.

**Question card story setup - exact player copy:** Because the temperature cannot simply be raised, remove product water at fixed temperature to test whether separation can increase methane yield safely. Reversal will show whether the yield gain truly follows product removal.

**Question card story-science connection - exact player copy:** Product
removal can raise methane yield without recreating the dangerous high
temperature.

**Baseline:** conversion 60%. Variables: condense/remove water, add
inert N2 at fixed volume, reduce volume/increase pressure. Player
changes one, samples, restores.

**Truth:** Removing water raises conversion to 68% and restoration
returns toward 60%; compression raises to 65%; inert gas at fixed volume
changes no reacting partial pressure and gives ~60%.

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

**State/output:** Cho approves enhanced condensate removal;
water_recycle_available = true.

## Stop 44 - Two plans look equally fast

**Format/placement:** DEGENERACY, at Plant Control operating-point board
(calculation/room).

**Metadata:** Concept: kinetics vs equilibrium; Keystone: gas pressure, kinetics, equilibrium, and energy; Learning role: RETRIEVE; Difficulty: L4; Story role: decision.

**Stop reason - exact player copy:** Equal rates must be separated by gas, equilibrium, and thermal constraints.

**Question card story setup - exact player copy:** Combine rate, equilibrium, pressure, and heat limits to choose between two plans that initially appear equally fast. Only the plan that survives all three kinds of physics can be approved.

**Question card story-science connection - exact player copy:** Equal
speed is not enough; the plan must also make sufficient methane and
remain safe.

**Candidate locus:** Plan A 575 K, 8 bar; Plan B 550 K, 12 bar. Both
produce the same immediate rate index after catalyst replacement.
Control sliders move along equal-rate combinations. Additional
constraint: equilibrium methane fraction must exceed 70% and inlet peak
must remain below 600 K.

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

**State/output:** Set validated_operating_point = {T:550K,P:12bar};
visible plan board turns amber, not green, pending loop and power
checks.

## Mission outcome

Mission decision: Use lower heat, higher pressure, and water removal. This plan keeps a safe heat margin and raises the final methane share. Two plans with the same early speed did not make the same final amount. The next test asks if the water and hydrogen loop can feed this plan.

### Post-mission metric screen - exact player copy

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

## Quick concept review

- K describes an equilibrium ratio at a particular temperature.

- ICE changes follow stoichiometric coefficients.

- Q\<K drives forward; Q\>K drives backward.

- Pressure, temperature, and product removal affect equilibrium in
  different ways.

- **Mission takeaway:** Kinetics sets speed; equilibrium sets the composition approached.

# Mission 12 - The Loop

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 4 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** THE LOOP

**Go now:** Go to the Ice Cut and meet Mei-Ling Cho, the water and cryogenics engineer, beside the raw-brine sampler.

**Card body:** The safer reactor plan works only if recycled water returns to electrolysis, where electricity splits it into hydrogen and oxygen. Current records suggest that this loop is not closing. Follow water from the Ice Cut through treatment and electrolysis, then balance hydrogen across the whole plant. By the end of the mission, decide where the return loop fails and how much hydrogen that failure removes from the next shift.

**Objective:** Find the failed recycling step and restore the
whole-plant hydrogen balance.

### Worth knowing first - exact player copy

#### Glossary terms

**Coupled system**  
**Also called:** coupled system, linked system, process loop  
**Definition:** A coupled system contains parts whose outputs become other parts' inputs. A fault can appear far from the place where its missing material was first noticed.

**Recycle loop**  
**Also called:** recycle loop, water loop, return loop  
**Definition:** A recycle loop returns useful material to an earlier process instead of discarding it. The plant returns water so it can recover hydrogen and oxygen.

**Electrolysis**  
**Also called:** electrolysis, water splitting, powered water cell  
**Definition:** Electrolysis uses electrical energy to drive a chemical change that would not proceed on its own. Here it splits treated water into hydrogen and oxygen.

**Acid**  
**Also called:** acid, acidic, H+ source  
**Definition:** An acid increases hydrogen-ion concentration when placed in water. Excess acid must be measured and neutralized before water enters the electrolyzer.

**Base**  
**Also called:** base, basic, alkaline, OH- source  
**Definition:** A base accepts hydrogen ions or increases hydroxide-ion concentration in water. The treatment system uses a measured base amount to neutralize excess acid.

**Neutralization**  
**Also called:** neutralization, neutralize, acid-base treatment  
**Definition:** Neutralization is the reaction of acid and base amounts. Equal reactive amounts remove each other; any excess determines the final acidity.

**pH**  
**Also called:** pH, acidity reading  
**Definition:** pH is a logarithmic measure related to hydrogen-ion concentration. A smaller pH means a larger hydrogen-ion concentration.

**Logarithm**  
**Also called:** logarithm, logarithmic, log, log10  
**Definition:** A logarithm reports the power needed to produce a number from a chosen base. For pH, a change of one unit means a tenfold change in hydrogen-ion concentration.

**Inventory**  
**Also called:** inventory, material inventory, stored amount  
**Definition:** Inventory is the amount of material stored in a system at a chosen time. A whole-plant inventory includes material moving between rooms as well as material in tanks.

#### Primer concepts

- Follow material through the whole loop instead of balancing each room in isolation.
- Treatment order matters: remove solids, remove unwanted dissolved ions, then neutralize measured excess acid.
- Predict a treatment result before measuring it; agreement verifies both the calculation and the controller.

#### Equations first needed today

**Equation:** moles of dissolved substance = molarity x volume in liters  
**What it is for:** turning a solution concentration and volume into a reacting amount  
**Symbols:** molarity is moles per liter; volume is the solution volume in liters.  
**Why this campaign needs it:** The treatment controller must add enough base to remove the measured acid without wasting purification capacity.  
**Also called:** solution amount, M times V, concentration-volume calculation  
**Concept:** solutions and acid-base treatment

**Equation:** pH = -log10[H+]  
**What it is for:** predicting acidity after neutralization  
**Symbols:** [H+] is the hydrogen-ion concentration in moles per liter; log10 is the base-ten logarithm.  
**Why this campaign needs it:** The predicted pH gives the electrolyzer a testable acceptance value before treated water is released.  
**Also called:** pH equation, negative log hydrogen ion  
**Concept:** acid-base chemistry

**Equation:** ending inventory = starting inventory + amount made + amount returned - amount used - amount sent away  
**What it is for:** closing a whole-plant material balance  
**Symbols:** every amount uses the same substance and units over the same time interval.  
**Why this campaign needs it:** Missing return water becomes a calculable next-shift hydrogen deficit only when the entire plant is counted together.  
**Also called:** inventory balance, recycle balance, whole-plant ledger  
**Concept:** coupled systems and conservation

**Crew on this mission - mission log:** Mei-Ling Cho — water and cryogenics engineer; Rosalind Achebe — analytical and electrochemistry lead; Yusuf Demir — power and life-support officer.



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

**Beat 1 - Arrival \| Ice Cut \| automatic when the player enters after
accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The player stands beside the raw-brine intake while a
whole-plant map leaves the recycle return line dark. **Dialogue bubbles
-** Cho: "Ice becomes water, water becomes hydrogen, hydrogen becomes
methane, and the reactor makes water again. Follow every transfer until
the loop closes."

**Unlocks:** Stop 45 at the Ice Cut loop board.

**Beat 2 - After Stop 45 \| Ice Cut chain board \| automatic response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The material chain locks, and ELECTROLYSIS receives an
EXTERNAL ENERGY marker. **Dialogue bubbles -** Demir: "The water can
cycle. The energy cannot. First make sure the water reaching
electrolysis is fit to use." **Panel/HUD text:** MOVE TO WATER PLANT.

**Unlocks:** The Water Plant waypoint and Stop 46; Stop 47 unlocks
immediately after Stop 46.

**Beat 3 - After Stops 46 and 47 \| Water Plant \| automatic treatment
verification**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The selected treatments remove particles and harmful
dissolved ions; the commanded neutralization dose lands inside the
predicted pH band. **Dialogue bubbles -** Achebe: "The treated stream
now meets the electrolyzer limit. Release it and compare the amount that
arrives with the amount the reactor returned."

**Unlocks:** The Electrolysis Hall waypoint and Stop 48.

**Beat 4 - After Stop 48 \| Electrolysis Hall \| automatic deeper
reveal**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The whole-plant ledger exposes water held or lost
before the next shift, making the following hydrogen run short.
**Panel/HUD text:** HYDROGEN DID NOT DISAPPEAR / RECYCLE WATER FAILED TO
RETURN ON TIME. **Dialogue bubbles -** Cho: "Our separator sent too much
water away from the return path. The next shift began without the feed
it was counting on."

**Unlocks:** The Mission 12 outcome beat.

**Beat 5 - Mission outcome and hook \| Electrolysis Hall \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Cho reroutes recovered product water into the verified
treatment-return line. Hydrogen and oxygen projections rise, then a
dust-front warning drops available solar power. **Dialogue bubbles -**
Cho: "The loop can close now." Demir: "If we can afford to run it. The
dust front just cut the power budget." **Panel/HUD text:** NEXT ROUTE -
SOLAR ARRAY -\> BATTERY GALLERY -\> ELECTROLYSIS HALL.

**Unlocks:** Mission 13 briefing and the Solar Array waypoint.

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

**Format/placement:** CHAIN, operated at the Ice Cut process-map
fixture.

**Metadata:** Concept: coupled stoichiometry; Keystone: balancing and coupled systems; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Stop reason - exact player copy:** The hydrogen shortage cannot be solved without tracing the entire water loop.

**Question card story setup - exact player copy:** Trace water from Martian ice through cleanup, electrolysis, the reactor, and return to locate every link that must close before hydrogen can be replenished. The completed chain will reveal the step that consumes outside energy.

**Question card story-science connection - exact player copy:** The
chain reveals which link must spend power and where water should return
to keep launch production alive.

**Links:** Ice/brine -\> purified H2O / 2H2O -\> 2H2 + O2 (electrolysis,
energy input) / CO2 + 4H2 -\> CH4 + 2H2O (Sabatier) / product H2O -\>
condenser/recycle tank. Distractors: direct ice-to-methane arrow,
oxygen-to-hydrogen arrow.

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

**State/output:** Illuminate the site route; add loop_map_complete.

## Stop 46 - Match contaminants to treatment

**Format/placement:** PROTOCOL, at columns in Water Plant.

**Metadata:** Concept: solutions/solubility; Keystone: solutions and acid-base treatment; Learning role: RETRIEVE; Difficulty: L3; Story role: experiment.

**Stop reason - exact player copy:** Returned water must be treated without wasting limited purification capacity.

**Question card story setup - exact player copy:** At the Water Plant, match each contaminant to a treatment so the return stream reaches electrolysis without wasting limited cleaning capacity. Each match must protect electrolysis while leaving useful reactor feed alone.

**Question card story-science connection - exact player copy:** The
wrong treatment can leave ions that damage electrolysis or spend the
column on material the reactor already wants.

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

**Answer text:** Filter solids, exchange dissolved ions, neutralize excess acid, and do not waste polishing capacity on useful CO2 feed.

**Why:** Physical filters catch particles, not dissolved ions. Ion
exchange targets charged solutes. Acid/base treatment is stoichiometric.
Removing every measurable species is not automatically useful; treatment
follows downstream consequence.

**Wrong-path feedback:** Distinguish suspension from solution; dissolved
ions pass a simple particle filter.

**State/output:** Prepare neutralization test.

## Stop 47 - Predict, treat, measure

**Format/placement:** VERIFY, operated at brinetank.

**Metadata:** Concept: strong acid/base stoichiometry and pH; Keystone: solutions and acid-base treatment; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Stop reason - exact player copy:** The electrolyzer needs measured proof that neutralization reached its target.

**Question card story setup - exact player copy:** Predict and verify the treated water's pH to prove that it meets the electrolyzer's operating limit. A numerical prediction followed by an independent measurement will fully qualify the treatment controller.

**Question card story-science connection - exact player copy:** Correct
neutralization lets recycled water return without damaging the
electrolyzer.

**Data:** 100.0 mL of 0.0100 M HCl receives 90.0 mL of 0.0100 M NaOH;
assume additive volumes.

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

**Correct calculation:** initial H+ 0.00100 mol; OH- 0.000900 mol;
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

**Format/placement:** BALANCE, at stack accounting panel in Electrolysis
Hall.

**Metadata:** Concept: whole-system inventory; Keystone: balancing and coupled systems; Learning role: TRANSFER; Difficulty: L4; Story role: reveal.

**Stop reason - exact player copy:** A whole-plant balance can expose a deficit hidden between separate rooms.

**Question card story setup - exact player copy:** With clean water flowing, total hydrogen across the entire plant to identify the missing return and close the recycling loop. The result will convert missing return water into next-shift hydrogen loss.

**Question card story-science connection - exact player copy:** The
whole-plant boundary can reveal a recycle failure that looks like
disappearing hydrogen inside one room.

**Data:** Electrolysis makes 400 kmol H2; store inventory falls by 20;
reactor consumes 360; measured vents are 4; line inventory rises by 6.
The next-shift schedule assumed 480 kmol H2 from electrolysis, which
requires 480 kmol H2O; only 400 kmol H2O reached the stack.

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

**State/output:** Set twist_1_deepened = true; water_recycle_restored =
true; raise projected H2 output.

## Mission outcome

Mission decision: The next shift is short because 80 kmol of water did not return to the power cell. The full-plant hydrogen count now closes. Water treatment fixes the return line. The plant can make both gases again. It still needs enough power for every key load.

### Post-mission metric screen - exact player copy

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

**Header:** 3 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** POWER

**Go now:** Go to the Solar Array and meet Yusuf Demir, the power and life-support officer, at the live power board.

**Card body:** The recycle loop can restore hydrogen, but electrolysis, cooling, purification, refrigeration, and the habitat all need the same limited power. A dust front has reduced the solar array's output. At the Array, Battery Bank, and Electrolysis Hall, trace electron flow and turn available current into gas production. By the end of the mission, allocate power so the crew, reactor, and propellant all remain safe.

**Objective:** Turn the available electricity into launch gases while
protecting every critical system.

### Worth knowing first - exact player copy

#### Glossary terms

**Electron**  
**Also called:** electron, electrons, e-  
**Definition:** An electron is a particle with negative electric charge found in atoms. Electron arrangement helps determine how atoms join and whether a particle has a net charge.

**Electrode**  
**Also called:** electrode, electrodes  
**Definition:** An electrode is a solid part where electrons enter or leave a chemical system. The water cell has a cathode and an anode.

**Electrical circuit**  
**Also called:** electrical circuit, electric circuit, circuit, outside circuit, external circuit  
**Definition:** An electrical circuit is a connected path through which electric charge can move. The outer wires carry electrons while the liquid path carries ions.

**Oxidation**  
**Also called:** oxidation, oxidized, electron loss  
**Definition:** Oxidation is the loss of electrons by a substance. In the water cell, oxidation occurs at the anode and helps form oxygen gas.

**Reduction**  
**Also called:** reduction, reduced, electron gain  
**Definition:** Reduction is the gain of electrons by a substance. In the water cell, reduction occurs at the cathode and forms hydrogen gas.

**Cathode**  
**Also called:** cathode, reduction electrode  
**Definition:** The cathode is the electrode where reduction occurs. The powered cell sends electrons to this electrode.

**Anode**  
**Also called:** anode, oxidation electrode  
**Definition:** The anode is the electrode where oxidation occurs. Electrons leave this electrode through the outside circuit.

**Electric current**  
**Also called:** electric current, current, amperes, amps, A  
**Definition:** Electric current is the rate at which electric charge moves. One ampere is one coulomb of charge per second.

**Coulomb**  
**Also called:** coulomb, coulombs, C  
**Definition:** A coulomb is a unit used to count electric charge. Current multiplied by time in seconds gives charge in coulombs.

**Electric charge**  
**Also called:** electric charge, charge, Q, coulomb, coulombs, C  
**Definition:** Electric charge is a property that can be positive or negative and makes particles attract or repel. An object with equal positive and negative charge is neutral.

**Faraday constant**  
**Also called:** Faraday constant, Faraday's constant, F  
**Definition:** The Faraday constant is the charge carried by one mole of electrons, about 96,485 coulombs per mole. It converts electrical charge into a chemical amount.

**Current efficiency**  
**Also called:** current efficiency, Faradaic efficiency, efficiency  
**Definition:** Current efficiency is the fraction of electrical charge that makes the intended product. A value below 100 percent means some charge follows unwanted processes.

**Protected load**  
**Also called:** protected load, required load, non-negotiable load  
**Definition:** A protected load is an electrical use that must remain powered for safety or mission function. Funding it reduces the energy available for optional work.

#### Primer concepts

- Reduction occurs at the cathode and oxidation occurs at the anode in both driven and spontaneous cells.
- Electrons travel through the outside circuit; ions move through the liquid to keep charge balanced.
- Producing more gas is not a valid plan if cooling, purification, refrigeration, or habitat power falls below its required minimum.

#### Equations first needed today

**Equation:** Q = It  
**What it is for:** finding the total electric charge delivered during a timed run  
**Symbols:** Q is charge in coulombs; I is current in amperes; t is time in seconds.  
**Why this campaign needs it:** The dust-limited array gives the crew current and time, but the recovery plan needs a predicted amount of hydrogen and oxygen.  
**Also called:** charge equation, current-time relation, I times t  
**Concept:** redox and electrochemistry

**Equation:** moles of electrons = Q / F  
**What it is for:** converting electric charge into chemical amount  
**Symbols:** Q is charge in coulombs; F is 96,485 coulombs per mole of electrons.  
**Why this campaign needs it:** Electron amount is the bridge between the power board and the number of gas molecules the plant can make.  
**Also called:** Faraday calculation, charge-to-moles, electrolysis stoichiometry  
**Concept:** redox and electrochemistry

**Equation:** actual product = theoretical product x current efficiency  
**What it is for:** correcting ideal gas production for practical electrical losses  
**Symbols:** actual product is the usable amount made; theoretical product follows electron stoichiometry; current efficiency is written as a decimal fraction.  
**Why this campaign needs it:** The launch plan must budget for the cell the crew actually has rather than a perfect 100-percent cell.  
**Also called:** efficiency correction, Faradaic yield, practical electrolysis output  
**Concept:** electrochemical yield

**Crew on this mission - mission log:** Yusuf Demir — power and life-support officer; Rosalind Achebe — analytical and electrochemistry lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Solar Array \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Red dust moves across the panels and the
available-power bar falls in real time. **Dialogue bubbles -** Demir:
"Every kilowatt now has a consequence. Electrolysis makes launch gases,
but cooling protects the reactor, refrigeration protects the product,
and the habitat keeps us alive. Count before you allocate."

**Unlocks:** Stop 49 at the live power meter; Stop 50 unlocks
immediately after Stop 49.

**Beat 2 - After Stops 49 and 50 \| array power-routing display \|
automatic response**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Electron flow and ion motion complete the electrolyzer
circuit; hydrogen and oxygen outlets illuminate on opposite sides.
**Dialogue bubbles -** Demir: "Now the electrical path and the chemical
products agree. Check the battery floor before promising current we
cannot sustain." **Panel/HUD text:** MOVE TO BATTERY GALLERY.

**Unlocks:** The Battery Gallery travel beat.

**Beat 3 - Battery Gallery \| automatic constraint reveal**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** HABITAT MINIMUM, COOLING MINIMUM, and EMERGENCY RESERVE
lock as protected loads. **Dialogue bubbles -** Abiola: "These loads are
not bargaining chips. Whatever remains can recover propellant."
**Panel/HUD text:** AVAILABLE FOR RECOVERY OPERATIONS - UPDATED.

**Unlocks:** The Battery Gallery waypoint, followed by the Electrolysis
Hall waypoint and Stops 51-52.

**Beat 4 - After Stops 51 and 52 \| Electrolysis Hall \| automatic
decision**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The calculated hydrogen amount populates the production
forecast. The accepted allocation powers electrolysis, cooling,
purification, refrigeration, habitat, and reserve without crossing any
minimum. **Dialogue bubbles -** Demir: "The plan does not maximize one
machine. It keeps the entire route to launch alive."

**Unlocks:** The Mission 13 outcome beat.

**Beat 5 - Mission outcome and hook \| Electrolysis Hall \| automatic
apparent victory**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Electrolyzer stacks start. Hydrogen and oxygen climb;
the reactor holds its validated operating point. At dawn, both main
indicators switch to FULL and the ascent checklist begins. Achebe waits
beside the final console with a sealed vial and an active speech icon.
**Dialogue bubbles -** Achebe: "Stop the countdown. Batch C does not
match the green quality channel." **Panel/HUD text:** LAUNCH HOLD -
INDEPENDENT ASSAY DISAGREES.

**Unlocks:** Mission 14 briefing and the Tank Farm waypoint.

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

**Format/placement:** CHOICE, asked by Demir at Array Shed controller.

**Metadata:** Concept: redox; Keystone: redox and electrochemistry; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Stop reason - exact player copy:** Gas routing depends on knowing which electrode makes hydrogen and oxygen.

**Question card story setup - exact player copy:** Before committing limited electricity, identify oxidation and reduction in the electrolyzer so the predicted gases match the electrode reactions. The correct half-reactions keep the product lines from being routed backward.

**Question card story-science connection - exact player copy:** Electron
direction tells the crew where hydrogen and oxygen form and prevents the
gases from being routed backward.

**Question card prompt - exact player copy:** In alkaline electrolysis,
which statement is correct?

**Choices:** Water is reduced at the cathode to form H2; hydroxide is
oxidized at the anode to form O2 **(correct)** / H2 forms by oxidation
at the anode / Both gases form by reduction / Electron coefficients
change the tabulated potential when equations are multiplied.

**Answer text:** Water is reduced at the cathode to H2, while hydroxide is oxidized at the anode to O2.

**Why:** Reduction gains electrons at the cathode; oxidation loses them
at the anode. Scaling a half-reaction does not scale an electrode
potential.

**State/output:** Enable cell-direction schematic.

## Stop 50 - Assemble electron and ion flow

**Format/placement:** SEQUENCE, at Battery Bank cell-stacks diagram
desk.

**Metadata:** Concept: half-reactions and circuit; Keystone: redox and electrochemistry; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Stop reason - exact player copy:** Both the electron circuit and ion path must close before startup.

**Question card story setup - exact player copy:** Assemble the electron and ion paths to confirm that the powered cell can split water without shorting or mixing products. The assembled path will expose any impossible break in charge balance.

**Question card story-science connection - exact player copy:** Both
paths must close before electrical power can become launch gases.

**Question card prompt - exact player copy:** Put the circuit and ion-transfer events in a defensible operating order.

**Cards:** External supply pushes electrons to cathode / cathode
reduction forms H2 / ions carry charge through electrolyte / anode
oxidation forms O2 and releases electrons / electrons return through
external supply.

**Correct order:** Cyclic order as listed, with note that the processes
occur continuously rather than one molecule at a time.

**Answer text:** The supply drives cathode electrons, ions close charge through electrolyte, and anode electrons return through the outer circuit.

**Why:** Electrons travel through the external circuit; ions close
charge balance through electrolyte. Mixing those paths makes impossible
diagrams.

**State/output:** Battery reserve floor fixed at 160 kWh.

## Stop 51 - Turn current into hydrogen

**Format/placement:** BALLPARK, at stack-sheet.

**Metadata:** Concept: Faraday's law; Keystone: redox and electrochemistry; Learning role: INTRODUCE; Difficulty: L2; Story role: calculation.

**Stop reason - exact player copy:** Power allocation needs predicted hydrogen, not amperes alone.

**Question card story setup - exact player copy:** Convert the available current and time into hydrogen yield so the allocation uses actual gas production rather than electrical power alone. The result converts the remaining operating time into a real gas yield.

**Question card story-science connection - exact player copy:** This
calculation tells the crew exactly how much ascent propellant the
remaining power can buy.

**Data:** current 10,000 A for 8.00 h; current efficiency 92.0%; 2 e-
per H2; molar mass H2 2.016 g/mol.

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

**Format/placement:** ALLOCATE, operated at stack power controller.

**Metadata:** Concept: electrochemistry under constraints; Keystone: redox and electrochemistry; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Stop reason - exact player copy:** The dust-limited power pool must protect every binding system constraint.

**Question card story setup - exact player copy:** Use that yield and the protected minimums to divide dust-limited power among electrolysis and the systems that keep the crew and propellant safe. The committed plan must make gas without recreating earlier failures.

**Question card story-science connection - exact player copy:** Making
more gas does not get the crew home if the same plan overheats the
reactor, spoils the batch, or shuts down life support.

**Pool:** 600 kWh. Protected habitat 180; reactor thermal control
minimum 120; purification minimum 80; electrolysis recovery run 160;
tank refrigeration 60; optional fast-charge reserve 60.

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
  correct: [habitat, cooling, purification, electrolysis, refrigeration]
  pass_rule: "All required questions answered and total cost <=600 kWh."
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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Oxidation loses electrons; reduction gains them.

- Electrolysis uses external energy to force a nonspontaneous reaction.

- Q=It and mol e-=Q/F connect current to chemical amount.

- Account for electron stoichiometry and current efficiency.

- **Mission takeaway:** A power allocation is scientific when every funded load protects a named consequence.

# Mission 14 - FULL

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 2 SHIFTS UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** FULL

**Go now:** Go to the Tank Farm and meet Rosalind Achebe, the analytical and electrochemistry lead, beside the newest sample vial.

**Card body:** The methane and oxygen displays read full, so launch control starts the countdown. An independent sample may show that one full tank contains the wrong mixture. At the Tank Farm, Assay Lab, and Pad Office, trace each green signal, test the vial, diagnose the mixture, and set the acceptance rule. By the end of the mission, decide whether the propellant is ready to fly or must be quarantined.

**Objective:** Determine whether the full tanks meet the campaign's
fictional flight-quality limits.

### Worth knowing first - exact player copy

#### Glossary terms

**Specification**  
**Also called:** specification, specifications, flight specification, acceptance limit  
**Definition:** A specification is a measurable requirement a material must pass before use. A full tank can fail if its composition lies outside even one required limit.

**Purity**  
**Also called:** purity, methane purity, composition quality  
**Definition:** Purity is the fraction of a sample made of the desired substance. High total mass does not guarantee high purity.

**Contaminant**  
**Also called:** contaminant, contaminants, contamination, impurity  
**Definition:** A contaminant is an unwanted substance in a material or sample. Carbon dioxide and water become contaminants when their amounts exceed the flight limits.

**Certification**  
**Also called:** certification, certified, quality approval  
**Definition:** Certification is a documented decision that measured material meets every required specification. It must rely on evidence capable of testing the claimed property.

**Dependency**  
**Also called:** dependency, shared dependency, upstream source  
**Definition:** A dependency is an earlier measurement, standard, or calculation another reading relies on. Two green displays sharing one dependency do not give two independent confirmations.

**Threshold**  
**Also called:** threshold, limit, cutoff, acceptance line  
**Definition:** A threshold is a value chosen to separate acceptable from unacceptable results. It should be committed before a blind result is revealed.

**Trigger rule**  
**Also called:** trigger rule, trigger, quarantine rule, abort rule  
**Definition:** A trigger rule states the measurement condition that causes an action. One clear rule prevents the crew from moving the acceptance line after seeing an inconvenient sample.

**False-ready state**  
**Also called:** false-ready state, false green, false pass  
**Definition:** A false-ready state occurs when a display claims success without evidence for the property that matters. Full mass and normal pressure can still hide unsafe composition.

#### Primer concepts

- Amount, pressure, and composition are different claims and require evidence that can measure each one.
- Certification should use a frozen model and a new independent sample.
- Set the methane-purity trigger before the blind sample; keep carbon-dioxide, water, and pressure limits fixed as companion specifications.

#### Equations first needed today

No new numerical equation is introduced. The mission retrieves mole fraction, partial pressure, separation behavior, and independent-evidence reasoning to judge fixed flight specifications.

**Crew on this mission - mission log:** Rosalind Achebe — analytical and electrochemistry lead; Commander Laila Abiola — mission commander.



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

**Beat 1 - Arrival \| Tank Farm \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Giant METHANE FULL and OXYGEN FULL indicators dominate
the tank wall while Batch C is outlined in amber. **Dialogue bubbles -**
Achebe: "Mass and pressure say the tank is full. My independent vial
says part of that mass is carbon dioxide and water. A full tank can
still be the wrong propellant."

**Unlocks:** Stop 53 at the Tank Farm dependency view.

**Beat 2 - After Stop 53 \| Tank Farm dependency view \| automatic
discovery**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Estimated mass, online composition, control-room
quality, and READY trace back to shared Standard C; the independent vial
remains separate. The READY light changes from green to amber.
**Dialogue bubbles -** Achebe: "Four displays do not make four
measurements when three inherit the same calibration."

**Unlocks:** The Assay Lab waypoint and Stops 54-55.

**Beat 3 - After Stops 54 and 55 \| Assay Lab \| automatic Twist 3**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The frozen certification model fails on unseen Batch C.
Composition appears as 91.6% methane, 8.0% carbon dioxide, and 0.40%
water. **Panel/HUD text:** AMOUNT AT TARGET / COMPOSITION OUT OF
SPECIFICATION. **Dialogue bubbles -** Abiola: "We made enough material.
We did not make enough flight-ready methane."

**Unlocks:** The Ascent Pad office waypoint and Stop 56.

**Beat 4 - Before and after Stop 56 \| Ascent Pad office \| automatic
crisis test**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The player commits methane, carbon-dioxide, water,
pressure, and abort limits before two blind resamples are revealed. Both
confirm Batch C fails composition. **Dialogue bubbles -** Achebe: "The
deadline did not move the line. Batch C fails the rule we wrote before
seeing it." Abiola: "Countdown remains stopped."

**Unlocks:** The Mission 14 outcome beat.

**Beat 5 - Mission outcome and hook \| Ascent Pad office \| automatic**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Abiola deletes FULL from the readiness display and
replaces it with AMOUNT and SPECIFICATION. AMOUNT turns green;
SPECIFICATION stays red. Four recovery plans appear with one shift
remaining. **Dialogue bubbles -** Abiola: "One shift. Enough total
propellant. Not enough certified methane. Bring me the plan that gets us
home without asking the rocket to trust a lie." **Panel/HUD text:**
FINAL MISSION - GO / NO-GO.

**Unlocks:** Mission 15 briefing and the Plant Control waypoint.

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

**Format/placement:** TRACE, operated at farm-gauges.

**Metadata:** Concept: evidence independence; Keystone: gas pressure and evidence independence; Learning role: RETRIEVE; Difficulty: L4; Story role: clue.

**Stop reason - exact player copy:** A green dashboard is not proof when its channels share dependencies.

**Question card story setup - exact player copy:** The tanks read full, so trace pressure, mass, composition, and the READY light to see whether the green signals are truly independent. Opening every dependency will reveal whether readiness has independent support.

**Question card story-science connection - exact player copy:** A tank
can look ready when several green numbers inherit the same wrong
calibration.

**Channels:** pressure -\> pressure transducer (independent); estimated
methane mass -\> pressure + average molar-mass model; online composition
-\> cold-end analyzer -\> Standard C; control-room quality -\> online
composition -\> Standard C; load-ready light -\> estimated mass +
control-room quality. Independent vial -\> Assay Lab Standard A.

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

**State/output:** Turn load-ready light amber; set
evidence_flags.quality_not_independent = true.

## Stop 54 - Test certification on the newest sample

**Format/placement:** HOLDOUT, operated at spec-bench.

**Metadata:** Concept: model generalization; Keystone: evidence must be independent; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Stop reason - exact player copy:** The certification model must pass the newest independent sample unchanged.

**Question card story setup - exact player copy:** Because several green signals share one standard, freeze the historical calibration and test it on the unseen Batch C vial. The frozen model must predict Batch C without moving the standard afterward.

**Question card story-science connection - exact player copy:** The
newest independent sample is the claim the certification model must get
right before ascent.

**Fit set:** six historical standards from 97-100% methane, model
residuals below 0.3%. Freeze calibration. **Holdout Batch C:** true
standard comparison yields 91.6% CH4, 8.0% CO2, 0.40% H2O; online model
predicts 97.4% CH4 because Standard C drift compresses the contaminated
range.

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

**Correct result:** Model fails; quarantine Batch C.

**Answer text:** The frozen model fails Batch C, so quarantine the batch.

**Why:** Passing historical clean samples does not validate
extrapolation into a contaminated regime. The newest independent sample
is exactly what certification must predict.

**Wrong-path feedback:** Refitting the calibration to make Batch C pass
destroys the independence of the test.

**State/output:** batch_c_quality = off_spec; launch countdown pauses.

## Stop 55 - What is actually wrong?

**Format/placement:** DIAGNOSIS, at Assay Lab review board.

**Metadata:** Concept: integrated composition diagnosis; Keystone: structure, solutions, separation, gases, and equilibrium; Learning role: RETRIEVE; Difficulty: L5; Story role: twist.

**Stop reason - exact player copy:** Launch control needs one cause that explains both passing and failing readings.

**Question card story setup - exact player copy:** Combine the failed vial with the other readings to decide whether the problem is amount, contamination, or a broken sensor. The full panel will distinguish enough material from material safe to fly.

**Question card story-science connection - exact player copy:** The crew
must decide whether the problem is too little propellant or the wrong
propellant.

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

**Choices:** Insufficient total propellant / Tank leak / Off-spec Batch
C caused by purification breakthrough and shared calibration bias
**(correct)** / Reactor rate still too low.

**Answer text:** Batch C is off specification because purification broke through and Standard C hid the contamination.

**Mechanism:** Contaminants add mass and pressure, so quantity signals
pass. Drier/purification breakthrough sends CO2/water into product;
biased Standard C hides it.

**Why alternatives fail:** Mass and pressure rule out insufficient
amount and major leak; production rate does not explain measured
contaminants after collection.

**State/output:** twist_3_complete = true; quarantine line appears
around one tank.

## Stop 56 - Write the rule before the final samples

**Format/placement:** TRIGGER, operated at Pad Office certification
console.

**Metadata:** Concept: precommitted thresholds; Keystone: evidence must be independent; Learning role: APPLY; Difficulty: L5; Story role: decision.

**Stop reason - exact player copy:** The acceptance line must be fixed before the blind result creates pressure.

**Question card story setup - exact player copy:** Commit the acceptance and abort limits before the blind samples appear so the decision cannot move after the result is known. The blind sample will then be judged by the same rule either way.

**Question card story-science connection - exact player copy:**
Precommitted thresholds stop the launch deadline from changing what the
crew is willing to call safe.

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
      - {value: 97.0, label: "ACCEPT MINIMUM"}
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

**Fixed companion limits and correct trigger:** Commit CH4 at least 97.0% before reveal; CO2 at most 2.0%; H2O at
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

### Post-mission metric screen - exact player copy

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

## Quick concept review

- Pressure and mass do not uniquely determine composition.

- Shared calibration can make several channels fail together.

- Holdout samples test the claim a certification model must make.

- A specification is a set of predeclared limits tied to consequences.

- **Mission takeaway:** "Enough" and "safe to use" are separate scientific claims.

# Mission 15 - GO / NO-GO

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 1 SHIFT UNTIL THE LAUNCH WINDOW CLOSES

**Card title:** GO / NO-GO

**Go now:** Go to Plant Control and meet Commander Laila Abiola, the mission commander, at the final recovery board.

**Card body:** Batch C is quarantined, and one shift remains before the ascent window closes. The crew must recover certified methane without sacrificing power, thermal safety, oxygen, or independent proof. At Plant Control, the Tank Farm, and the Pad Office, buy one decisive measurement, eliminate unsafe plans, and fund the recovery chain. By the end of the mission, give the final GO or NO-GO recommendation that determines whether the crew leaves Mars.

**Objective:** Authorize launch only if all four campaign metrics and
every chemistry threshold pass.

### Worth knowing first - exact player copy

#### Glossary terms

**Value of information**  
**Also called:** value of information, measurement value, decision value  
**Definition:** Value of information is the usefulness of a new measurement for changing a decision. A precise reading has little value if every possible result leads to the same action.

**Binding constraint**  
**Also called:** binding constraint, limiting condition, required minimum, required maximum  
**Definition:** A binding constraint is a requirement that actively limits the available plans. Ignoring one can make an attractive plan impossible or unsafe.

**Tradeoff**  
**Also called:** tradeoff, compromise, competing use  
**Definition:** A tradeoff occurs when improving one goal uses time, material, or power needed by another. The final plan must decide which gains are worth their costs.

**Certified methane**  
**Also called:** certified methane, usable methane, flight-ready methane  
**Definition:** Certified methane is methane whose amount and composition have passed the fixed flight rules through independent testing. Gross tank mass does not count as certified methane by itself.

**Verification**  
**Also called:** verification, verify, independent verification, final assay  
**Definition:** Verification checks whether a prediction or claim matches a measurement obtained through a suitable evidence path. It is different from repeating the same derived display.

**Assay**  
**Also called:** assay, assays, composition assay, contaminant assay  
**Definition:** An assay is a measured test that determines what substances a sample contains and how much of each is present. An independent assay can certify composition when dashboard estimates cannot.

**GO / NO-GO**  
**Also called:** GO, NO-GO, launch decision, final authorization  
**Definition:** GO means every binding requirement has passed and launch may proceed. NO-GO means at least one requirement has failed or lacks trustworthy evidence.

**Recovery chain**  
**Also called:** recovery chain, recovery plan, causal chain  
**Definition:** A recovery chain is the full sequence of actions needed to change the failed condition and prove the change worked. Funding only one link cannot complete recovery.

#### Primer concepts

- Buy the measurement that can change the launch decision, not the one that is easiest to repeat.
- Count certified methane rather than gross tank mass when comparing recovery plans.
- Fund reprocessing, replacement production, validated reactor operation, safety, and independent verification as one connected chain.
- The final recommendation introduces no new chemistry; it must satisfy every earlier amount, composition, thermal, power, and evidence constraint.

#### Equations first needed today

No new equation is introduced. Use the balanced reaction, gas laws, material and energy ledgers, rate law, equilibrium expression, acid-base calculation, and Faraday calculation already recorded in the mission log.

**Crew on this mission - mission log:** Commander Laila Abiola — mission commander; Ingrid Sundqvist — production and catalyst lead; Dr. Tomás Herrera — reactor and safety engineer; Mei-Ling Cho — water and cryogenics engineer; Rosalind Achebe — analytical and electrochemistry lead; Yusuf Demir — power and life-support officer.



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

**Beat 1 - Arrival \| Plant Control \| automatic when the player enters
after accepting the briefing**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The final board shows one shift remaining and four
recovery plans. Each plan has time, power, thermal, amount, and
composition consequences. **Dialogue bubbles -** Abiola: "This is not a
race to make one number green. Choose the evidence and the recovery
chain that can put this crew on a safe ascent before the window closes."

**Unlocks:** Stop 57 at the final decision board.

**Beat 2 - After Stop 57 \| decision board to Tank Farm \| automatic
evidence choice**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The selected independent contaminant measurement
receives the final sampling slot; duplicate mass and pressure readings
gray out. **Dialogue bubbles -** Achebe: "Pressure and mass already
pass. Composition is the uncertainty that can still change GO or NO-GO."
**Panel/HUD text:** FINAL SAMPLE AUTHORIZED - BATCH C INDEPENDENT ASSAY.

**Unlocks:** The Tank Farm waypoint and Stop 58.

**Beat 3 - After Stop 58 \| Tank Farm \| automatic plan elimination**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** Certified methane, not total tank mass, is applied to
both surviving plans. The non-reprocessing plan falls below the
usable-fuel requirement. **Panel/HUD text:** ONLY REPROCESS-BATCH-C PLAN
SATISFIES AMOUNT + COMPOSITION + HARDWARE LIMITS. **Dialogue bubbles -**
Sundqvist: "The faster plan fills the gauge. It does not fill the
specification."

**Unlocks:** Stop 59 at the integrated control board.

**Beat 4 - After Stop 59 \| integrated control board \| automatic
resource commitment**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** One hundred decision points lock across reprocessing,
electrolysis, reactor production, independent verification, and safety
margin. Every required causal link turns green. **Dialogue bubbles -**
Demir: "Habitat, cooling, and reserve remain protected." Cho:
"Reprocessing and water return are powered." Herrera: "The reactor stays
inside the validated envelope."

**Unlocks:** The Ascent Pad waypoint and Stop 60.

**Beat 5 - Stop 60 and ending \| Ascent Pad \| player commitment
followed by dialogue-and-world-state sequence**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

World state: The final panel shows independent composition PASS, amount
PASS, pressure PASS, reactor thermal margin PASS, habitat reserve PASS,
and oxygen PASS. Dialogue bubble prompt - Abiola: "Commander needs your
recommendation. What do we do?" Accepted player choice - REPROCESS BATCH
C; RUN ELECTROLYSIS DURING REPROCESSING; HOLD THE VALIDATED
LOWER-TEMPERATURE/HIGHER-PRESSURE REACTOR POINT; LAUNCH ONLY AFTER
INDEPENDENT COMPOSITION PASSES. After the accepted recommendation, stop
the timer and open the Mission 15 metric screen. When all four bars
reach 100%, reveal AUTHORIZE LAUNCH. No further question appears.
Dialogue bubbles - Abiola: "All four systems are ready. Authorize
launch."

**Unlocks:** The epilogue beat; all graded interaction is complete.

**Beat 6 - Epilogue \| Ascent Pad \| dialogue-and-world-state sequence,
no educational gate**


**Player control:** Pause local interaction while bubbles are open.
Advance each bubble with Continue, then restore control. Keep
mission-critical panel results visible until the next stop begins.

**World state:** The display reads READY - AMOUNT VERIFIED - COMPOSITION
VERIFIED - SAFETY MARGIN VERIFIED. Each specialist remains beside the
instrument tied to their responsibility. Use the existing ascent-vehicle
object, engine sound, pad lights, and red-dust particles for launch. If
vertical object motion is unavailable, fade the vehicle out above the
pad after ignition. Keep the player in the normal viewpoint. **Dialogue
bubbles -** Abiola: "You did not fill a tank. You taught this station
what full means." **Panel/HUD text:** CAMPAIGN COMPLETE.

**Unlocks:** Campaign complete and free movement at the Ascent Pad.

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

**Format/placement:** VALUE, asked at Abiola in Plant Control
(decision/person).

**Metadata:** Concept: value of information; Keystone: evidence must be independent; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Stop reason - exact player copy:** Only one remaining measurement can still change GO or NO-GO.

**Question card story setup - exact player copy:** With Batch C quarantined and one shift left, spend the final test on the measurement that could actually change GO or NO-GO. Repeated pressure or mass cannot settle the disputed composition.

**Question card story-science connection - exact player copy:**
Repeating a precise but nonbinding pressure or mass reading cannot
resolve disputed composition.

**Budget/options:** one test. Another total-pressure reading; duplicate
total tank mass; independent Batch C contaminant assay; another average
catalyst temperature; visual valve inspection.

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

**Format/placement:** DEGENERACY, at Tank Farm calculation station.

**Metadata:** Concept: integrated constraints; Keystone: stoichiometry, electrochemistry, gases, and equilibrium; Learning role: RETRIEVE; Difficulty: L5; Story role: obstacle.

**Stop reason - exact player copy:** The last two plans differ only after certified methane and electrolysis limits count.

**Question card story setup - exact player copy:** Use the independent assay and hardware limits to eliminate the plan that reaches gross mass but not certified methane. The surviving pair must include enough powered electrolysis to replace processing losses.

**Question card story-science connection - exact player copy:** Counting
only certified methane reveals whether a plan truly supplies usable fuel
rather than reassuring mass.

**Initial fit:** Plans B and D both meet projected methane amount by
launch because B counts all Batch C mass as usable. Slider locus trades
reprocessing time against added production.

**New constraint from Stop 57:** independent assay confirms 7.9% CO2,
0.39% H2O; only certified methane fraction counts toward usable
propellant. Mechanical pressure maximum remains 12 bar; thermal peak
\<600 K.

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

**Correct result:** D. Plan B meets gross mass but not usable certified
methane; it cannot erase contaminants. Plan D reprocesses Batch C while
validated production replaces small losses.

**Answer text:** Plan D survives because it reprocesses Batch C and powers enough electrolysis to replace the hydrogen lost during processing.

**Why:** Two plans looked equal only because the objective counted all
mass as fuel. Changing to the scientifically correct objective—certified
methane—collapses the match.

**State/output:** Remove A/B/C as standalone plans; unlock strategic
allocation.

## Stop 59 - Spend 100 decision points

**Format/placement:** SCIENCETANK, asked at the assembled crew in Pad
Office (decision/person).

**Metadata:** Concept: resource strategy; Keystone: kinetics, catalysts, acid-base treatment, energy, electrochemistry, and evidence; Learning role: RETRIEVE; Difficulty: L5; Story role: decision.

**Stop reason - exact player copy:** The recovery plan must fund every link that changes or proves readiness.

**Question card story setup - exact player copy:** Fund reprocessing, electrolysis, validated reactor operation, verification, and safety so the surviving recovery plan can be executed. A winning allocation must cover production, cleanup, reactor safety, and truly independent proof.

**Question card story-science connection - exact player copy:** The
winning allocation must fund every link needed to create, clean,
preserve, and prove flight-ready propellant.

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

**Recommended allocation:** 35 reprocessing, 25 independent verification, 15 electrolysis, 10 validated reactor, and 15 safety/habitat; total 100. Accept variants with at least 60 points across reprocessing + verification and no points to cosmetic recalibration, provided safety gets at least 10.

**Evidence shown after commit:** Reprocessing is the only action that
changes contaminant concentration; electrolysis replaces processing
losses; the validated point preserves rate/yield/thermal limits;
independent assay changes launch authorization.

**Answer text:** Use 35 points for reprocessing, 25 for independent verification, 15 for electrolysis, 10 for validated reactor operation, and 15 for safety; fund no cosmetic recalibration.

**Why:** The grade rewards investments that can alter the decision or
protect a binding constraint. Spending everything on production solves
the old problem and recreates the new one.

**State/output:** Execute the plan through persistent equipment and
world-state updates; Batch C returns to Tank Farm.

## Stop 60 - Commander's recommendation

**Format/placement:** DIAGNOSIS, at the Pad Office certification console
(calculation/room), with Abiola delivering the prompt.

**Metadata:** Concept: whole-campaign synthesis; Keystone: whole-campaign transfer; Learning role: TRANSFER; Difficulty: L5; Story role: final commitment.

**Stop reason - exact player copy:** The final decision must satisfy all four bars and every scientific limit.

**Question card story setup - exact player copy:** Read the final independent results and all four metrics, then give Abiola GO only if every promised chemistry and safety limit passes. A GO is valid only if no earlier lesson or constraint is ignored.

**Question card story-science connection - exact player copy:** This is
the final scientific decision: authorize launch only if the chemistry
proves the crew can leave Mars safely.

**Final readings:** reprocessed methane 98.1% CH4, 1.8% CO2, 0.08% H2O;
pressure 19.0 bar; reactor 550 K, 12 bar, inlet peak 584 K; H2 reserve
16 kmol; oxygen on specification; habitat reserve protected; two
independent assays agree within 0.2%.

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
choices:
  - {id: ignore_assay, label: "Launch and ignore assay because mass is full", mechanism: "Repeats the false-ready error."}
  - {id: restore_hot, label: "Return to 575 K for more production", mechanism: "Reopens the thermal and equilibrium failure."}
  - {id: perfect_purity, label: "Reprocess until contaminants are zero", mechanism: "Unneeded perfection misses the window."}
  - {id: complete_plan, label: "Accept the passing batch, hold the validated point, protect power, and authorize launch", mechanism: "All amount, composition, pressure, thermal, power, and independence limits pass."}
answer: complete_plan
```

**Choices:** A Launch immediately and ignore assay because mass is full;
B Return to 575 K to add maximum margin; C Reprocess again until
contaminants are zero; D Accept the reprocessed batch, keep the
validated 550 K/12 bar point through loading, preserve protected power,
and authorize launch because every precommitted threshold now passes.
**(correct)**

**Answer text:** Choose the complete recovery plan and authorize GO only because every precommitted amount, composition, pressure, thermal, power, and verification limit passes.

**Correct mechanism:** D meets amount, composition, pressure, thermal,
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

Mission decision: GO after Batch C is cleaned and the power cell makes up the lost hydrogen. Keep the reactor at the safe point. Launch only after two separate tests pass. All four bars and every set limit now pass. The crew leaves Mars, and no new quiz begins.


## Quick concept review

- Measure the uncertainty that can change the decision, not the number
  easiest to repeat.

- Add physical constraints when two plans fit the same limited evidence.

- Rate, equilibrium yield, composition, energy, and safety are separate
  constraints.

- A good plan funds the full causal chain and independent verification.

- **Mission takeaway:** GO means every precommitted requirement passes—not that one reassuring gauge is green.

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

**Stops 1-4 — CHOICE, BALLPARK, SEQUENCE, BALANCE:** recognize and establish foundations.

**Stops 5-8 — SEQUENCE, BALLPARK, CHOICE, ALLOCATE:** perform stoichiometry and make the first trade-off.

**Stops 9-12 — CHOICE, BALLPARK, PROBE, VERIFY:** separate amount, pressure, and composition.

**Stops 13-16 — CHOICE, SEQUENCE, PROTOCOL, SWEEP:** connect structure to observable behavior.

**Stops 17-20 — CHOICE, BALLPARK, SWEEP, TRACE:** measure solutions and expose dependency.

**Stops 21-24 — DIAGNOSIS, STRESS, BALANCE, CASEBOOK:** synthesize Twist 1.

**Stops 25-28 — CHOICE, BALLPARK, SEQUENCE, BALANCE:** build the heat model and human clue.

**Stops 29-32 — CHOICE, BALLPARK, CONTROL, ATTEST:** establish rate causation and action identity.

**Stops 33-36 — CHOICE, SEQUENCE, PROBE, DIAGNOSIS:** diagnose the catalyst-bed pattern.

**Stops 37-40 — HOLDOUT, RESIDUAL, STRESS, CASEBOOK:** validate the model and synthesize Twist 2.

**Stops 41-44 — CHOICE, BALANCE, CONTROL, DEGENERACY:** distinguish kinetics and equilibrium.

**Stops 45-48 — CHAIN, PROTOCOL, VERIFY, BALANCE:** integrate the material-recycle loop.

**Stops 49-52 — CHOICE, SEQUENCE, BALLPARK, ALLOCATE:** connect charge to product and power choice.

**Stops 53-56 — TRACE, HOLDOUT, DIAGNOSIS, TRIGGER:** reveal and govern Twist 3.

**Stops 57-60 — VALUE, DEGENERACY, SCIENCETANK, DIAGNOSIS:** value evidence and commit the final plan.

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
  at: exact-fixture-id
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


## Revision 10.1 build gates

- Import all 60 stops with zero missing interaction-data errors. Never replace a live-panel format with CHOICE merely to make import pass.
- Confirm all 37 non-plain stops carry complete named interaction blocks. This includes Stop 4, which was already buildable, plus the 36 interactions that were blocking completion after Missions 1-2. Confirm all 60 stops carry answer text.
- Confirm each briefing body is four sentences and 30-70 words, with sentence four beginning “By the end of the mission”.
- Confirm every mission plan card includes a `Worth knowing first` block in this order: full-sentence glossary entries with aliases, primer concepts, then equations first needed that day. Each equation must include its job, every symbol, a campaign-specific reason, aliases, and its concept.
- Confirm each question setup is exactly two short sentences totaling 30-45 words and each stop has a separate visible reason.
- Confirm each system-owned outcome begins “Mission decision:” and contains no named character; place character reactions in the preceding dialogue beat.
- Confirm the first mention of every major character in each mission includes the canonical role from the character bible.
- Confirm every player-facing technical term resolves through the glossary without depending on an undefined word.
- Confirm each keystone recurs in at least three separated missions, includes a delayed RETRIEVE after an intervening mission, and contributes to a later COMBINE or TRANSFER task.
- Recalculate every numerical truth, including Stop 6 = 2405 kg CH4, Stop 7 = 130 kmol CH4, and Stop 30 = 0.300 M^-2 s^-1, before setting tolerance bands.
- Confirm Stop 8 describes the restart reserve as a player-chosen constraint and names limiting-reactant reasoning in the operated prompt.
- Play once wrong-first and once right-first. The last graded interaction is Stop 60; authorization and ascent are story payoff with no later quiz.
