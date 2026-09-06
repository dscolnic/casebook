**FIRST PERSON LEARNING**

**GROUND TRUTH**

AP Physics C: Electricity and Magnetism Campaign Implementation Bible

**15 missions | 60 graded stops | Station 12 | Implementation-ready**

**REVISION 10.2 - COMPACT GLOSSARY, BUILDABLE PANELS, AND ACTION-CLARITY VALIDATION**

## AP Physics C: Electricity and Magnetism Campaign Implementation Bible

**Project:** First Person Learning  
**Theme:** `groundtruth`  
**World:** Station 12, Sablon Flats  
**Player role:** Newly assigned Station Physics Lead  
**Course authority:** `groundtruth.txt` (all five E&M units and the Station 12 delivery)  
**Campaign size:** 15 missions, 60 graded stops, one signed Season Report  
**Audience:** AP Physics C: Electricity and Magnetism students  
**Primary implementation target:** `books/groundtruth.yml` plus existing Ground Truth theme assets  
**DERIVE density:** 20 of 60 stops, exactly the `round(60/3)=20` format-mix cap  
**Final product:** The Station 12 Season Report, assembled as one signed piece per mission in SHOT.

**Status:** Buildable implementation specification; all 60 stops carry player copy, grading truth, answer text, and complete interaction data. Repository import and gameplay validation remain pending because the repository was not supplied.

> Scope note: the supplied AP Physics C: Electricity and Magnetism cheat sheet is the course authority for this build. Mechanics content is excluded except where a magnetic-force result necessarily describes charged-particle motion.

---

## 1. One-page implementation brief

The supplied source gives an unusually strong world-course match: field mills, a Marx impulse bank, a sixty-metre mast, current shunts, an earthing trench, a screened room, and a remote trailer make E&M observable rather than decorative. Its fifteen report pieces already imply a sound progression from electrostatics through potential, capacitance, circuits, magnetism, induction, and transient coupling. The source does not, however, provide complete mission causality, exact questions, character arcs, metric economics, or interaction payloads. This bible supplies those missing layers while preserving every named report piece and every load-bearing place constraint.

The central mystery is the loss of the outstation after a week-five lightning shot. The first theory—an excessive ground-voltage rise—is reasonable but incomplete. The player proves that several apparently independent readings shared one reference, then finds a bonded conduit carrying strike current, and finally learns that a safe low-frequency resistance certificate did not characterize microsecond inductive coupling. Every twist reinterprets true earlier evidence.

Implementation is linear at the evidence level. A wrong answer teaches, permits retry, and then continues the same causal investigation; it never strands the player on a dead branch. Decisions change dialogue, visible report annotations, and trust, while the scientific evidence sequence remains stable so every student reaches the three E&M reversals.

### Non-negotiable engine rules

- Import with `node tools/import-book.mjs books/groundtruth.yml groundtruth --verify`.
- Give every lesson exactly one canonical format recognized by `engine/content/normalize.js`; do not use suspended STACK.
- Put decision formats at a person, calculations at a board or bench, and operated formats at the fixture being controlled.
- Keep every question setup to exactly two short sentences totaling 30–45 words. Put teaching in the story-science connection, answer text, mechanism explanation, and option-specific feedback.
- For CHOICE, author four distinct choice objects, copy the correct label verbatim into the answer, and give each wrong ID its own physical rebuttal.
- For PROBE, every station object must render its observed `reading`, its station-specific `expected` value, any `load` or limit, and an explicit comparison.
- For VERIFY, commit the numerical prediction before equipment unlocks and render **CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET**.
- For CONTROL, name the changed variable, every fixed variable, measurement timing, restoration requirement, and restored measurement.
- For DEGENERACY, render both numerical controls and require the submitted numerical pair before any qualitative plan.
- Every numerical task displays every input, constant, unit, governing equation, requested answer unit, tolerance, and submission type.
- Preserve one typed challenge per lesson and end-to-end gradeability. Grade authored answer logic, not prose similarity.
- The importer and current canonical format documentation outrank field spellings in this bible; map content to the live schema without weakening the interaction.

---

## 2. Campaign promise, clock, and player experience

### Opening sequence - exact player copy, maximum five sentences

Station 12 makes lightning on purpose so crews can learn how to survive it. One week-five shot disabled the remote outstation, and the season report must explain why before the final storm window closes in fifteen days. If the cause remains unknown, the station loses its operating certificate and future crews work without trusted warning data. Director Lena Ortiz hands you the report board and says, “A reading earns trust only when we can say what made it.” The next storm cell is already forming offshore.

Opening quality answers: Station 12; explain and safely reproduce the failure; fifteen days; certification and future warning work are lost; the player owns the evidence chain and final report.

### Concrete stakes

The station must reproduce and explain the week-five failure before the final storm window closes. A weak explanation costs the operating certificate; a poorly controlled shot can expose the crew, destroy the remaining launch hardware, or damage the only independent outstation record. The player is never asked to protect an abstract score: every loss is attached to people, evidence, finite test opportunities, or physical station hardware.

### Three major reversals

1. **Twist 1 - Agreement was not independence:** Four field mills agreed because they shared one ground reference.
2. **Twist 2 - The missing current was a real path:** A bonded conduit carried one third of the strike current despite a passing DC resistance certificate.
3. **Twist 3 - The main repair was not the whole repair:** The rerouted trunk passed, but card E retained a dangerous rack-local loop.

---

## 3. World and location plan

Station 12 is a causal diagram made walkable. The player begins where launches are authorized, moves outward to measure the storm and mast, follows current into the earth trench, and reaches the outstation only after local explanations fail.

| ID | Place | Story/physics function | Signature fixture |
|---|---|---|---|
| SHOT | Launch Control | authorization, radar, report assembly, shared reference | launch-board, radar-desk, record-desk, reference-panel |
| FIELD | Field Station | field mills, charge-layer inference, cloud geometry | mill-array, mill-bench, storm-profile-board |
| MAST | Mast Base | conductor boundary, current shunts, magnetic field | mast-desk, cabinet, shunt-rack, strike-ledger |
| BANK | Impulse Hall | Marx stages, stored energy, gap timing | hall-board, bank-stages, gap-row, earthing-stick-rack |
| EARTH | Earthing Trench | bond resistance, inductance, conduit current | loop-bench, earth-cert, conduit-bond, bond-rail |
| SCREEN | Screened Room | recorder bandwidth, residuals, independent channels | record-budget, recorder-rack, shield-bench |
| COUPLE | Remote Outstation | induced voltage, cable geometry, card-level damage | trailer-cards, cable-bay, probe-rack, repair-board |

### Areas of study and complete fixture declaration

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Launch Control | no | `launch-board` | board | The shot sequence, crew-clear lamps, and the red hold bar Ortiz reaches for before anyone else. |
| Launch Control | no | `radar-desk` | bench | Live storm returns, field traces, and three clocks that have never quite agreed. |
| Launch Control | no | `record-desk` | bench | The bound report, the current ledger, and every signature still missing from the final page. |
| Launch Control | no | `reference-panel` | board | Mill references A through D, their common feed, and a hand-marked route into the control rack. |
| Field Station | yes | `mill-array` | vessel | Four field mills facing the storm, with the reference unit set apart only by a strip of yellow paint. |
| Field Station | yes | `mill-bench` | bench | Calibration plates, wet-weather logs, and Ravi's pencil calculations under a clear cover. |
| Field Station | yes | `storm-profile-board` | board | The cloud base, charge layers, and every altitude estimate the present storm will permit. |
| Mast Base | yes | `mast-desk` | bench | Mast drawings, tip geometry, and a copper model scarred by old test arcs. |
| Mast Base | yes | `cabinet` | vessel | The shielding cabinet, its bonded door, and the remote cable entering through the lower gland. |
| Mast Base | yes | `shunt-rack` | rack | Three current shunts, one spare, and the labels that decide which path enters the ledger. |
| Mast Base | yes | `strike-ledger` | board | Every measured branch of the last strike, with one unexplained current left in red. |
| Impulse Hall | yes | `hall-board` | board | The Marx topology, stage voltages, and Strand's running account of where the energy can go. |
| Impulse Hall | yes | `bank-stages` | vessel | The charged stages behind the safety rail, each capacitor numbered in order. |
| Impulse Hall | yes | `gap-row` | rack | Adjustable spark gaps in a steel row, with Stage 7's timing marks darker than the rest. |
| Impulse Hall | yes | `earthing-stick-rack` | rack | Discharge sticks, lockout tags, and an empty hook that means the bank is not safe to touch. |
| Earthing Trench | no | `loop-bench` | bench | A scale plan of the buried loop, cable lengths, and the archived storm trace clipped beside it. |
| Earthing Trench | no | `earth-cert` | board | The April resistance certificate, its test current, and the dry-weather conditions in small print. |
| Earthing Trench | no | `conduit-bond` | vessel | The bonded conduit crossing the trench, warm at the coupling and bright where the clamp was moved. |
| Earthing Trench | no | `bond-rail` | rack | Earth straps and test links arranged by branch, with space to isolate one path at a time. |
| Screened Room | yes | `record-budget` | board | Channel bandwidths, rise-time limits, and the recorder budget Noor refuses to round away. |
| Screened Room | yes | `recorder-rack` | rack | Fast and slow recorders sharing a trigger shelf, each with its last calibration seal. |
| Screened Room | yes | `shield-bench` | bench | Feedthroughs, terminators, and a screened test loop laid out for comparison. |
| Remote Outstation | yes | `trailer-cards` | rack | Cards A through F, their damage photographs, and Card E still tagged for a second look. |
| Remote Outstation | yes | `cable-bay` | vessel | The incoming trunk, rack-local loop, and conduit route exposed behind the open side panel. |
| Remote Outstation | yes | `probe-rack` | rack | Insulated probes at each card position, with expected and observed readings clipped to every lead. |
| Remote Outstation | yes | `repair-board` | board | The final repair scope, cost lines, and the blank certification box for Station 12. |

### Location escalation

| Missions | Places per mission | Travel rule |
|---|---:|---|
| 1–4 | 1 | Local foundation; no distant travel |
| 5–10 | 2 | A result at the first fixture names the evidence required at the second |
| 11–15 | 3 | Source, path, and receiver must all be connected |

The remote outstation is not visited before Mission 8. Every waypoint is activated by evidence or a required operation; there are no greeting tours, scavenger races, or movement tasks unrelated to the physics.

---

## 4. Character bible

| Character | Role and first entrance | Wants | Blind spot | Domain and decision use | Arc and verbal habit |
|---|---|---|---|---|---|
| Dr. Lena Ortiz (she/her; Ortiz) | Station director; stops a launch while crew-clear lights disagree | A defensible final shot and signed report | Treats established procedure as independent evidence | Thresholds, uncertainty, authorization; TRIGGER, VALUE, ATTEST | Accepts that a procedure must be tested at the right timescale. “What would make us stop?” |
| Ravi Sen (he/him; Ravi) | Field scientist; opens the reference mill while rain reaches the flat | Preserve usable storm data | Trusts agreement among four mills | Electrostatics, Gauss, potential; DERIVE, SWEEP, TRACE | Learns shared agreement can share one error. “What does the field permit us to claim?” |
| Elise Strand (she/her; Strand) | Impulse engineer; keeps the earthing stick on the Marx bank | Reproduce the strike without wasting hardware | Treats bank energy as the main hazard | Capacitance, dielectrics, Marx bank, energy; DERIVE, VERIFY | Expands safety from stored energy to coupling. “Count where the energy can go.” |
| Marcus Tate (he/him; Tate) | Mast engineer; checks a hot bond rather than defending his drawings | Keep the mast and bonds serviceable | Assumes a low-resistance bond is harmless | Current paths, magnetism, force, inductance; CONTROL, DIAGNOSIS | Reports the conduit path openly and redesigns it. “Which path carried it?” |
| Noor Haddad (they/them; Noor) | Data and safety analyst; compares raw timestamps before summaries | Preserve traceable, independent evidence | Can delay action while seeking perfect certainty | Measurement independence, residuals, bandwidth, uncertainty; TRACE, STRESS, PROPAGATE | Learns to define sufficient evidence before a shot. “Independent of what?” |

All first mentions in each mission repeat the working role. Named reactions occur in world beats, never on system-owned outcome cards.

---

## 5. Character direction and dialogue rules

Ortiz speaks in thresholds and consequences; Ravi speaks in claims permitted by fields; Strand counts stored energy and hardware state; Tate asks which physical path carried current; Noor asks whether evidence is independent. No character recites a lecture that a fixture or mission card can show. Correct and incorrect attempts change their immediate reaction, not the campaign's evidence order.

Required dialogue is delivered through nearby or radio bubbles in the normal player view. While a required bubble is open, pause the timer, advance with one Continue action, write the completed line to the mission log, then restore movement. System-owned outcome cards contain no named-character speech.

### Campaign metrics and recovery economy

| Bar | Category | Start | Meaning | Rises when | Falls when | 0% consequence | Lock |
|---|---|---:|---|---|---|---|---|
| Report Certainty | primary objective | 18% | Fraction of the causal report supported by reproducible evidence | A report piece survives an independent test | A claimed channel loses independence | Report is rejected; restore mission snapshot | Locks at 100 after the signed M15 report |
| Crew Clearance | secondary requirement | 76% | Confidence that launch and shelter rules protect people | A precommitted threshold is verified | A new unbounded field/current path appears | Evacuate and restore mission snapshot | Locks at 100 after M15 dry-run and final shot |
| Shot Reserve | operational reserve | 64% | Rockets, igniters, bank capacity, and storm opportunities remaining | Supplies are conserved or a low-energy test substitutes | A named launch/test consumes stock | No final validation shot; restore snapshot | Locks at 100 when M15 report accepts remaining reserve |
| Station Integrity | system integrity | 72% | Mast, bank, records, grounding, and outstation condition | A fault is isolated or repaired | A named overload/damage event occurs | Station closes; restore snapshot | Locks at 100 after M15 post-shot inspection |

Recovery formula: `RP = clamp(4,12,11 + time_modifier - incorrect_submissions)`, where time modifier is `+1` at/before target, `0` through 125%, and `-2` beyond 125%. One RP raises one unlocked bar by one percentage point; bank cap 30. Required dialogue, loading, accessibility menus, app backgrounding, and system interruptions pause the timer. A mission starts timing only when the arrival beat closes and Stop 1 activates.

## Automatic-delta and canonical-allocation ledger

| M | Automatic change | Canonical RP allocation after a 12-RP run | QA bars after allocation (C/R/S/I) |
|---:|---|---|---|
| 1 | Clearance +2, Reserve -2 | C+4, R+4, S+0, I+4 | 22/82/62/76 |
| 2 | Certainty +3 | C+4, R+4, S+0, I+4 | 29/86/62/80 |
| 3 | Certainty +3 | C+4, R+4, S+0, I+4 | 36/90/62/84 |
| 4 | Clearance +3 | C+3, R+3, S+2, I+4 | 39/96/64/88 |
| 5 | Integrity +2, Reserve -3 | C+4, R+2, S+3, I+3 | 45/98/64/93 |
| 6 | Certainty +4, Reserve -4 | C+4, R+0, S+6, I+2 | 53/98/66/95 |
| 7 | Certainty -8, Clearance -4 | C+8, R+4 | 53/98/66/95 |
| 8 | Integrity +3 | C+4, R+2, S+3, I+3 | 57/100/69/101→100 |
| 9 | Certainty +4, Integrity -3 | C+4, S+4, I+4 | 65/100/73/100 |
| 10 | Clearance +2, Reserve -2 | C+4, S+8 | 69/100/79/100 |
| 11 | Certainty +5, Integrity -6 | C+5, S+7 | 79/100/86/94 |
| 12 | Certainty +5, Clearance +3 | C+4, S+4, I+4 | 88/100/90/98 |
| 13 | Integrity +4 | C+4, S+4, I+2, bank 2 | 92/100/94/100, bank 2 |
| 14 | Certainty +4, Reserve -5, Integrity -4 | C+4, S+6, I+2; spend bank I+2 | 100/100/95/100 |
| 15 | Reserve +5 after accepted stock count | S+0; bank all 12 | 100/100/100/100, bank 12 |

Values clamp at 100. The M8 reference path uses only the points needed to cap bars and banks the remainder if present. Even with ordinary nonperfect play, the automatic gains plus minimum RP keep victory reachable; no hidden drama decrease occurs.

---

## 6. Physics spine and recurring concepts

1. Charge, Coulomb's law, vectors, and superposition enable electric-field models.
2. Flux and symmetry enable Gauss's law for layers, conductors, and enclosures.
3. Work per charge and line integration connect electric field to potential.
4. Conductor equilibrium explains shielding, surface charge, and sharp-tip fields.
5. Potential difference and stored charge enable capacitance and dielectric response.
6. Capacitance plus work enables stored energy, energy density, and Marx-bank accounting.
7. Current, resistance, power, and Kirchhoff rules enable DC-network and reference-path diagnosis.
8. Moving charge and current produce magnetic force and magnetic fields; symmetry enables Ampere's law.
9. Magnetic flux and Faraday-Lenz law enable loop coupling and motional emf.
10. Self and mutual inductance enable RL transients, magnetic energy, and bandwidth limits.
11. RC/RL time constants and frequency response distinguish DC certification from microsecond behavior.
12. The finale combines the full chain and introduces no major new science.

### Keystone concepts

`K1` field superposition; `K2` Gauss/flux/symmetry; `K3` field-potential relation; `K4` conductor boundary behavior; `K5` capacitance/dielectrics; `K6` electromagnetic energy; `K7` circuit conservation and transients; `K8` magnetic field from current; `K9` magnetic force; `K10` Faraday-Lenz induction; `K11` self/mutual inductance; `K12` measurement independence and uncertainty.

### Keystone retrieval compliance ledger

| Keystone | Introduce/practice | Delayed retrieve | Combine/transfer payoff |
|---|---|---|---|
| K1 field superposition | M1 | M4, M8 | M11, M15 |
| K2 Gauss/flux | M2 | M5 | M12, M15 |
| K3 field-potential | M3 | M6 | M9, M15 |
| K4 conductors | M4 | M7 | M13, M15 |
| K5 capacitance | M5 | M6, M10 | M14, M15 |
| K6 EM energy | M6 | M10 | M14, M15 |
| K7 circuits/transients | M7 | M10, M13 | M14, M15 |
| K8 magnetic field | M8 | M10 | M11, M15 |
| K9 magnetic force | M8 | M11 | M14, M15 |
| K10 induction | M9 | M12 | M14, M15 |
| K11 inductance | M10 | M12, M13 | M14, M15 |
| K12 independence/uncertainty | M1, M7 | M9, M13 | M14, M15 |

### Mission-by-mission physics and dramatic spine

| M | Report piece / science movement | Mystery and stakes movement | Route |
|---:|---|---|---|
| 1 | Crew-clear criterion; field vectors and uncertainty | Mill signs disagree; launch waits | SHOT only |
| 2 | Effective layer charge; Gauss's law | Large charge supports the overvoltage theory | FIELD only |
| 3 | Cloud-ground potential; line integral | Energy scale is large enough to matter | FIELD only |
| 4 | Tip-field assessment; conductors | Mast tip explains launch, not trailer loss | MAST only |
| 5 | Cloud-ground capacitance; dielectric model | Stored charge links sky model to bank model | FIELD→BANK |
| 6 | Stored-energy derivation; Marx bank | Bank can reproduce energy safely; smaller reversal: stage tolerance matters | BANK→SHOT |
| 7 | Shared-reference finding; circuits/TRACE | **Twist 1:** four agreeing mills were not independent | FIELD→SHOT |
| 8 | Field and loop hazard; magnetic field/force | Trailer loss can occur without direct strike | MAST→COUPLE |
| 9 | Trench-coupling prediction; Faraday/Lenz | A buried loop predicts the observed polarity | EARTH→COUPLE |
| 10 | Bonding-lead prediction; inductance | A “good” bond can make a dangerous fast voltage | BANK→EARTH |
| 11 | Current-path finding; current density/Ampere | **Twist 2:** bonded conduit carried one third of strike current | MAST→EARTH→SHOT |
| 12 | Prediction then measurement; Gauss/induction/VERIFY | Conduit reroute works on a reduced-energy shot | BANK→MAST→EARTH |
| 13 | Bandwidth finding; RC/RL response | April certificate measured DC, not microseconds | SCREEN→SHOT→EARTH |
| 14 | Last-shot coupling test; integration | Apparent victory, then **Twist 3:** trailer rack loop remains vulnerable | SHOT→MAST→COUPLE |
| 15 | Signed final report; transfer | Final rule, repair, shot, inspection, certification | SHOT→BANK→COUPLE |

## 7. Clue ledger

| Clue | Planted / reinforced | Objective observation and initial reading | True meaning / concept / payoff |
|---|---|---|---|
| Four mills agree within 2% | M1 / M2 | Taken as independent confirmation | All share SHOT ground reference; circuit topology and TRACE; M7 |
| Mast tip corona begins before launch | M3 / M4 | Taken as proof the whole site is overvolted | Local conductor curvature enhances field; M4 and rules out direct site-wide field in M8 |
| April earth certificate says 0.42 Ω | M2 / M10 | Taken as proof grounding is safe | It is a slow resistance test, not transient impedance; inductance/bandwidth; M13 |
| Outstation damage has no arc mark | M4 / M8 | Initially called a missed inspection | Inductive coupling can act without contact; Faraday/Lenz; M9 |
| Three mast shunts disagree with clamp total | M6 / M8 | Initially called shunt calibration scatter | Missing current flows in bonded conduit; current conservation; M11 |
| Trailer upset polarity is opposite the mast-current rise | M8 / M9 | Initially unexplained | Lenz-law response of cable loop; M9/M14 |
| Bank stage 7 fires late | M6 / M10 | Treated as small bank defect | Changes `dI/dt`, hence inductive voltage and frequency content; M12-M14 |
| Door field is zero only when fingerstock closes | M7 / M13 | Taken as shielding demonstration | High-frequency continuity and loop area control coupling; M13-M15 |

---

## 8. Mission content contract

Every stop below includes its complete authored payload. Field spellings are canonical intent, not a claim about an unseen importer version. The implementer must map these blocks to the repository's current schema and run import/trap/lesson validation. Numerical tolerances are inclusive.

For every `DERIVE`, the payload contains ordered `lines`; each line supplies `expression`, `rule`, and decoys. Grading requires both expression and rule. For every `VERIFY`, later stages remain locked until the preceding stage is committed, and the visible prompt uses **CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET**. Every wrong submission shows the listed feedback and permits retry; exploratory control changes before Commit do not cost RP.

Beat shorthand used below expands to the required beat fields: each beat lists trigger, location, presentation, player control, world state, exact copy, and unlock. Required bubbles pause the timer, advance with Continue, enter the log, and then restore control.

---

### Revision 10.2 presentation and validation cleanup

Glossary entries use compact one-line `Term: definition` form. Equation blocks contain the equation, purpose, symbols, and campaign-specific reason, with no alias or concept boilerplate. Every operated stop is authored to the current action-clarity rules, and each canonical payload must be checked against the live importer before handoff.

### Player-facing glossary dependency

Define every technical term before a briefing, bubble, setup, or prompt assumes it. An entry may not depend on another undefined term. The first mission card that needs a term owns its compact definition.

Every mission below supplies its briefing promise, primer, story event, beat script, route, character beat, concepts, four globally numbered stops, outcome, exact metric screen, and quick review.

# Mission 1 - Write the Stop Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 15 DAYS TO FINAL STORM WINDOW  
**Card title:** Write the Stop Rule  
**Go now:** Go to Launch Control and meet Dr. Lena Ortiz, station director, at the launch board.  
**Card body:** The outstation failed on a shot that the crew-clear lights had approved, so today's launch is paused. A field mill reports the electric field above its sensor, including direction. You will reconcile the mill signs, combine fields, and set a launch rule before new data arrive. By the end of the mission, decide the crew-clear criterion for every later shot.  
**Objective:** Commit a numerical field threshold and a disagreement rule before launch data appear.

### Worth knowing first — exact player copy

#### Glossary terms  
Electric charge: a property of matter that creates electric force; like signs repel and unlike signs attract.  
Electric field: force per positive test charge, measured in newtons per coulomb or volts per metre.  
Superposition: add each source's field as a vector to obtain the net field.  

#### Primer concepts
- Field arrows point away from positive charge and toward negative charge.
- Add components with signs; do not add vector magnitudes blindly.
- A safety rule must be written before the reading it judges.

#### Equations first needed today  
**Equation:** `E = F/q` and `E_net = ΣE_i`  
**What it is for:** Define field and combine several source fields.  
**Symbols:** `E` electric field (N/C), `F` electric force (N), `q` test charge (C), `E_i` each source field.  
**Why this campaign needs it:** The four warning channels must be reduced to one signed, reviewable crew-clear decision.

**Authoring-only failure consequence:** Launching without the rule risks a crew on the flat; refusing every shot consumes the storm window.

## Main story happening - designer summary

The player finds two mills using the opposite sign convention, derives vector superposition, and commits `|E_vertical| ≤ 5.0 kV/m` with no pair differing by more than `0.50 kV/m`. Ortiz blocks launch whenever either condition fails. Science moves from field direction to a precommitted rule; mystery gains the too-neat four-mill agreement; stakes become a real go/no-go decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Launch Control | `radar-desk` | automatic**

**World state:** The fix the signs fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 1: FIX THE SIGNS OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "The green lights disagree about what upward means. Write one rule before the cell reaches us."

**Unlocks/waypoint:** Unlock Stop 1 at `radar-desk` in Launch Control.

**Beat 2 - After Stop 1 | `launch-board` | automatic**

**World state:** The fix the signs result remains visible while the derive the net field fixture lights.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "Use the Stop 1 result to settle derive the net field."

**Unlocks/waypoint:** Unlock Stop 2 at `launch-board` in Launch Control.

**Beat 3 - After Stop 2 | `launch-board` | automatic**

**World state:** (2) S2 complete, board update: `SIGNED FIELD = VECTOR SUM`.

**Panel/HUD text:** SIGNED FIELD = VECTOR SUM

**Dialogue bubbles -** Dr. Lena Ortiz: "Use the Stop 2 result to settle bound the disagreement."

**Unlocks/waypoint:** Unlock Stop 3 at `launch-board` in Launch Control.

**Beat 4 - After Stop 3 | `launch-board` | automatic**

**World state:** The bound the disagreement result remains visible while the commit the criterion fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Noor Haddad: "Agreement helps only if the channels are independent."

**Unlocks/waypoint:** Unlock Stop 4 at `launch-board` in Launch Control.

**Beat 5 - At mission end | `radar-desk` | automatic**

**World state:** (4) S4 complete, launch cover remains closed and criterion appears on board; Outcome walk: player places report piece 1 in SHOT; metric screen unlocks.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Dr. Lena Ortiz: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

One location, SHOT; all evidence is on the launch board and radar desk, so no travel is justified.

## Characters and dramatic beat

Ortiz wants a usable rule but will not let live data choose it; Noor plants the independence question.

## Key concepts, explained here

Electric field is a vector. A signed component says direction, while its magnitude says strength. Superposition and an uncertainty band turn several readings into one falsifiable safety rule.

## Four graded stops

## Stop 1 - Fix the signs

**Format/placement:** PROTOCOL, at `radar-desk`.

**Metadata:** Concept: field direction/sign; Keystone: K1,K12; Area: Remote Outstation; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** The board cannot compare mills until every arrow uses the same sign.

**Question card story setup - exact player copy:** Two field mills label upward as positive, while two old channels label downward as positive. Convert all four readings to the station rule so the launch board compares physical directions rather than printed signs.

**Question card story-science connection - exact player copy:** A sign convention changes labels, not the actual direction of the field.

**Question card prompt - exact player copy:** Match each printed reading to its signed value under the displayed rule “upward is positive”; submit four matches in kV/m.

**Complete format-specific interaction block:** `scenarios=[A:+4.2 old_down_positive,B:-4.1 old_down_positive,C:-4.3 new_up_positive,D:-4.2 new_up_positive]`; `choices=[-4.2,-4.1,-4.3,-4.2 kV/m upward-positive]`; `mapping=[A→-4.2,B→+4.1,C→-4.3,D→-4.2]`.

**Correct result:** Mapping above, exact labels.

**Answer text:** Reverse the sign only for old downward-positive channels; the physical arrows do not change.

**Why:** A sign convention changes labels, not the actual direction of the field.

**Wrong-path feedback:** You changed a magnitude or reversed a new channel; use the convention label once per channel.

**State/output:** Normalized values enter the board; unlock S2.

## Stop 2 - Derive the net field

**Format/placement:** DERIVE, at `launch-board`.

**Metadata:** Concept: vector superposition; Keystone: K1; Area: Field Station; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** Ortiz needs the field from two charged layers, not either layer alone.

**Question card story setup - exact player copy:** The normalized channels establish that downward is negative, but the model contains an upper positive layer and a lower negative layer. Derive their combined vertical field before the criterion can use a prediction.

**Question card story-science connection - exact player copy:** Vector addition determines whether layer fields reinforce or cancel at crew height.

**Question card prompt - exact player copy:** Build the three-line derivation; for each line choose the expression and the rule that licenses it, then submit the final signed field in kV/m.

**Complete format-specific interaction block:** `lines=[{expression:E_y=E_1y+E_2y,rule:superposition,decoys:[E_y=|E_1|+|E_2|,E_y=E_1yE_2y]},{expression:E_y=(-3.0)+(-1.5) kV/m,rule:substitute_signed_components,decoys:[3.0-1.5,3.0+1.5]},{expression:E_y=-4.5 kV/m,rule:arithmetic_and_direction,decoys:[+4.5,-1.5]}]`.

**Correct result:** `-4.5 kV/m`, exact line/rule pairs.

**Answer text:** Both contributions point downward, so their signed components add to `-4.5 kV/m`; magnitudes alone would hide direction.

**Why:** Vector addition determines whether layer fields reinforce or cancel at crew height.

**Wrong-path feedback:** Superposition adds vectors component by component; keep each sign through substitution.

**State/output:** `MODEL FIELD -4.5 kV/m` appears; unlock S3.

## Stop 3 - Bound the disagreement

**Format/placement:** STRESS, asked by Dr. Lena Ortiz beside `launch-board`.

**Metadata:** Concept: uncertainty/range; Keystone: K12,K1; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the launch board in Launch Control.

**Stop reason - exact player copy:** A mean can look safe while one channel has already crossed the limit.

**Question card story setup - exact player copy:** With the predicted field fixed at `-4.5 kV/m`, four channels read `-4.1`, `-4.2`, `-4.2`, and `-4.3 kV/m`. Test whether calibration uncertainty can hide an unsafe disagreement, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** A safe average does not prove that every sensor is consistent with the same field.

**Question card prompt - exact player copy:** Move the allowed calibration offset from `-0.20` to `+0.20 kV/m`, inspect both explanations, and submit the conclusion that survives the full range.

**Complete format-specific interaction block:** `stress={assumption:per_channel_calibration_offset_kVpm,min:-0.20,max:0.20,step:0.05,candidates:[single_field,one_failed_channel],criterion:max_pair_spread<=0.50,correct:single_field_survives}`.

**Correct result:** Single-field model survives; observed pair spread `0.20 kV/m ≤ 0.50 kV/m`.

**Answer text:** All four readings remain mutually consistent within the campaign's calibration bound, though this does not prove independence.

**Why:** A safe average does not prove that every sensor is consistent with the same field.

**Wrong-path feedback:** Compare the largest and smallest channels; do not compare only each reading with the mean.

**State/output:** Agreement clue logged; unlock S4.

## Stop 4 - Commit the criterion

**Format/placement:** TRIGGER, at `launch-board`.

**Metadata:** Concept: precommitted threshold; Keystone: K12,K1; Area: Remote Outstation; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** The next cell must be judged by a rule it cannot influence.

**Question card story setup - exact player copy:** Because the current channels agree within the calibration band, the station can write one reusable stop rule. Commit both limits now, before the next field update appears on the board.

**Question card story-science connection - exact player copy:** Precommitment prevents a desired launch from moving the safety threshold after evidence arrives.

**Question card prompt - exact player copy:** Enter `5.0 kV/m` as the inclusive magnitude limit and `0.50 kV/m` as the inclusive channel-spread limit; submit the two-part GO rule, then reveal the new readings.

**Complete format-specific interaction block:** `trigger={decision_rule:"GO only if |E_vertical|≤5.0 kV/m AND max pair spread≤0.50 kV/m",scale:{min:0,max:8,unit:kV/m},anchors:[4.0,5.0,5.5],objective:crew_clear,direction:lower_is_safer,consequence_limit:5.0,secondary_limit:0.50,correct_rule_id:dual_limit}`.

**Correct result:** Dual limit exactly; revealed `-4.6,-4.7,-4.6,-4.8 kV/m` gives GO.

**Answer text:** The rule protects both physical field magnitude and sensor consistency and was frozen before the outcome.

**Why:** Precommitment prevents a desired launch from moving the safety threshold after evidence arrives.

**Wrong-path feedback:** A one-number rule misses either field danger or channel disagreement.

**State/output:** Report piece 1 filled; M2 activates.

## Mission outcome

Mission decision: Use both limits for every shot. Launch only when the field is at or below `5.0 kV/m` in size. And the channel spread is at or below `0.50 kV/m`. The present cell passes. The close agreement still needs an independence check.

### Post-mission metric screen - exact player copy

**Metric screen:** `MISSION 1 COMPLETE`; `TIME {elapsed} / TARGET 16:00`; `INCORRECT SUBMISSIONS {n}`; story event `A low-energy field check used one storm window.`; automatic `CREW CLEARANCE +2 | SHOT RESERVE -2`; RP line uses shared formula; prompt `Spend each point to raise one unlocked bar by 1%, or bank it (cap 30).`; QA `12 RP → 22/82/62/76`; failure `Any 0% bar restores the mission-start snapshot.`  


## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 2 - Bound the Layer Charge

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 14 DAYS TO FINAL STORM WINDOW  
**Card title:** Bound the Layer Charge  
**Go now:** Go to the Field Station and meet Ravi Sen, field scientist, at the mill bench.  
**Card body:** The crew-clear rule works, but it does not explain the charge above the flat. Electric flux counts field passing through a surface, and symmetry can turn that count into enclosed charge. You will choose a Gaussian surface, derive the layer field, and infer charge density. By the end of the mission, decide whether the storm layer can account for the measured field.  
**Objective:** Infer the effective layer charge from the mill array.

### Worth knowing first
#### Glossary terms  
Electric flux: the signed amount of electric field passing through a surface.  
Gaussian surface: an imaginary closed surface chosen to match field symmetry.  
Surface charge density: charge per area, written `σ` and measured in `C/m²`.  
#### Primer concepts
- Only charge enclosed by a closed surface contributes to net flux.
- Parallel field contributes zero through a surface; perpendicular field contributes most.
- Station model: the charged cloud base is a wide sheet above conducting ground.
#### Equations first needed today  
**Equation:** `∮E·dA = q_enc/ε₀`; **What it is for:** Relate closed-surface flux to enclosed charge. **Symbols:** `E` field, `dA` outward area element, `q_enc` enclosed charge, `ε₀=8.854×10^-12 C²/(N·m²)`. **Why this campaign needs it:** It converts ground field into a storm-layer charge estimate.  
**Equation:** `Φ_E=EA cosθ`; **What it is for:** Evaluate uniform flux through one face. **Symbols:** `Φ_E` flux, `A` area, `θ` angle between field and outward normal. **Why this campaign needs it:** The pillbox faces separate contributing and quiet surfaces.

## Main story happening - designer summary
Ravi uses a pillbox model to infer `σ`; the result supports, but does not prove, the direct-overvoltage theory.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**World state:** The derive the sheet field fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 2: DERIVE THE SHEET FIELD OPEN

**Dialogue bubbles -** Ravi Sen: "The mill tells us field; Gauss lets us ask what charge could make it."

**Unlocks/waypoint:** Unlock Stop 5 at `mill-array` in Field Station.

**Beat 2 - After Stop 5 | `mill-bench` | automatic**

**World state:** The derive the sheet field result remains visible while the sort the flux faces fixture lights.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Ravi Sen: "Use the Stop 5 result to settle sort the flux faces."

**Unlocks/waypoint:** Unlock Stop 6 at `mill-bench` in Field Station.

**Beat 3 - After Stop 6 | `mill-array` | automatic**

**World state:** Stop 2 lights the contributing pillbox faces,.

**Panel/HUD text:** STOP 6 RECORDED - STOP 7 OPEN

**Dialogue bubbles -** Ravi Sen: "Use the Stop 6 result to settle derive the effective charge density."

**Unlocks/waypoint:** Unlock Stop 7 at `mill-array` in Field Station.

**Beat 4 - After Stop 7 | `mill-array` | automatic**

**World state:** Stop 3 posts `σ=-7.97×10^-8 C/m²`, and.

**Panel/HUD text:** σ=-7.97×10^-8 C/m²

**Dialogue bubbles -** Ravi Sen: "Use the Stop 7 result to settle test spatial consistency."

**Unlocks/waypoint:** Unlock Stop 8 at `mill-array` in Field Station.

**Beat 5 - At mission end | `mill-array` | automatic**

**World state:** Stop 4 overlays all four mills and activates report piece 2.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Ravi Sen: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

FIELD only. The layer geometry, mill readings, and residual map all belong to the same physical array.

## Characters and dramatic beat

Ravi wants the field pattern to support a usable layer model, but he explicitly keeps the larger causal claim provisional.

## Key concepts, explained here

Gauss's law is useful only when symmetry makes the flux integral tractable. A conductor's interior field is zero in equilibrium, and net closed-surface flux depends only on enclosed charge.

## Four graded stops

## Stop 5 - Derive the sheet field

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: Gauss infinite sheet; Keystone: K2; Area: Field Station; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The field-to-charge conversion must be derived before the array can use it.

**Question card story setup - exact player copy:** The storm base is much wider than the station, so its field is nearly perpendicular to a small pillbox. Derive the field on either side from Gauss's law before inserting measurements.

**Question card story-science connection - exact player copy:** Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.

**Question card prompt - exact player copy:** Build the two-line symbolic derivation and name `Gauss's law with planar symmetry`, then submit `E=σ/(2ε₀)`.

**Complete format-specific interaction block:** `lines=[{2EA=σA/ε0,gauss_plus_two_faces,[EA=σA/ε0,4EA=σA/ε0]},{E=σ/(2ε0),cancel_A,[E=σ/ε0,E=2σε0]}]`.

**Correct result:** exact symbolic result.

**Answer text:** Two equal faces carry flux; area cancels.

**Why:** Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.

**Wrong-path feedback:** The pillbox encloses `σA`, not `σ`, and has two active faces.

**State/output:** model unlocks S2.

## Stop 6 - Sort the flux faces

**Format/placement:** PROTOCOL, at `mill-bench`.

**Metadata:** Concept: flux angle; Keystone: K2; Area: Field Station; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the mill bench, in Field Station.

**Stop reason - exact player copy:** Ravi needs to know which surfaces belong in the integral.

**Question card story setup - exact player copy:** With the sheet result available, Ravi rotates a virtual pillbox around the layer. Match each face orientation to positive, negative, or zero flux so the instrument integrates the correct surfaces.

**Question card story-science connection - exact player copy:** The dot product, not area alone, decides each surface's signed contribution.

**Question card prompt - exact player copy:** Match all three faces to signed flux and submit the mapping.

**Complete format-specific interaction block:** `scenarios=[top_normal_with_E,bottom_normal_against_E,side_normal_perpendicular]`; `choices=[+EA,-EA,0]`; `mapping=[top→+EA,bottom→-EA,side→0]`.

**Correct result:** as mapped.

**Answer text:** `cos0=1`, `cos180=-1`, `cos90=0`.

**Why:** The dot product, not area alone, decides each surface's signed contribution.

**Wrong-path feedback:** Compare field with the outward normal, not with the surface itself.

**State/output:** faces animate with arrows/text; unlock S3.

## Stop 7 - Derive the effective charge density

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: sheet plus image/conducting ground; Keystone: K2,K4; Area: Mast Base; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The measured field must become a charge density with units and sign.

**Question card story setup - exact player copy:** Because the conducting ground mirrors the layer field, the station model uses `E_ground=σ/ε₀`, not the isolated-sheet value. Use the measured `E=-9.0 kV/m` to derive the effective density, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** The conductor boundary doubles the isolated-sheet field between cloud and ground.

**Question card prompt - exact player copy:** Build four lines, name the rule at each step, and submit `σ` in `C/m²`; use `ε₀=8.854×10^-12 C²/(N·m²)` and `E=-9.0×10³ N/C`.

**Complete format-specific interaction block:** `lines=[{E=σ/ε0,conductor_boundary,[E=σ/(2ε0),E=2σ/ε0]},{σ=ε0E,algebra,[σ=E/ε0,σ=ε0/E]},{σ=(8.854e-12)(-9.0e3),substitution,[... ]},{σ=-7.97e-8 C/m2,arithmetic,[+7.97e-8,-7.97e8]}]`.

**Correct result:** `-7.97×10^-8 C/m²`, tolerance `±0.04×10^-8`.

**Answer text:** `σ=ε₀E=(8.854×10^-12)(-9.0×10³)=-7.97×10^-8 C/m²`.

**Why:** The conductor boundary doubles the isolated-sheet field between cloud and ground.

**Wrong-path feedback:** Convert kV/m to V/m and keep the field sign.

**State/output:** density posted; unlock S4.

## Stop 8 - Test spatial consistency

**Format/placement:** RESIDUAL, at `mill-array`.

**Metadata:** Concept: model residuals; Keystone: K2,K12; Area: Remote Outstation; Learning role: TRANSFER; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** One local match cannot justify a layer model across the flat.

**Question card story setup - exact player copy:** Now that `σ` predicts `-9.0 kV/m`, compare residual maps from a uniform layer and a compact charged pocket. Choose the model whose residuals are structureless, not merely smallest on average, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A spatial pattern means the model is missing physics even when its mean error is small.

**Question card prompt - exact player copy:** Inspect both four-station residual fields and submit the model with no directional pattern.

**Complete format-specific interaction block:** `residual={fields:[{id:uniform,residuals:[-.1,.1,0,.0],rms:.071,pattern:none,model:"Gauss planar"},{id:pocket,residuals:[-.3,-.1,.1,.3],rms:.224,pattern:gradient,model:"E=∫k dq r_hat/r² with off-axis r found by Pythagoras"}],correct:uniform,criterion:no_spatial_pattern}`.

**Correct result:** uniform layer.

**Answer text:** Its small residuals alternate without a gradient; the pocket leaves a west-east trend.

**Why:** A spatial pattern means the model is missing physics even when its mean error is small.

**Wrong-path feedback:** Lowest RMS helps, but the decisive test is unmodeled spatial structure.

**State/output:** report piece 2; M3.

## Mission outcome

Mission decision: Use the field map to mark the mast tip. The strongest field is near the close contours. The cabinet blocks the static field. Next, test the storm model.

### Post-mission metric screen - exact player copy

**Metric screen:** target `18:00`; event `A defensible layer model adds report evidence.`; auto `REPORT CERTAINTY +3`; shared RP; QA `29/86/62/80`; same allocation/failure copy.  
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 3 - From Field to Voltage

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 13 DAYS TO FINAL STORM WINDOW  
**Card title:** From Field to Voltage  
**Go now:** Go to the Field Station and meet Ravi Sen, field scientist, at the mill array.  
**Card body:** The layer model explains the field, but a field value alone does not give the energy available across the full height. Voltage is energy per charge and changes with position according to the electric field. You will integrate the measured profile and test its sign. By the end of the mission, decide the cloud-ground potential difference used in the failure model.  
**Objective:** Derive and validate the cloud-ground voltage.

### Worth knowing first
#### Glossary terms
 Electric potential: electric potential energy per charge, measured in volts. Equipotential: a path or surface along which voltage does not change. Line integral: a sum of tiny contributions along a path.  
#### Primer concepts Electric field points from high to low potential. Potential adds as a scalar. Moving along an equipotential requires no electric work.  
#### Equations first needed today
**Equation:** `ΔV=-∫_a^b E·dl`;

**What it is for:** Find voltage change from a field profile.

**Symbols:** `ΔV=V_b-V_a`, `E` field, `dl` path element. **Why:** The cloud height makes a point field reading into a site-scale voltage.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

**Equation:** `V=kq/r`, `U=qV`;

**What it is for:** Find point-charge potential and energy.

**Symbols:** `k=8.988×10^9 N·m²/C²`, `q` charge, `r` distance, `U` energy. **Why:** It checks sign and shows why voltage, unlike field, sums without components.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.## Main story happening - designer summary
Ravi derives `ΔV=+360 MV` from ground to cloud for `E_y=-9.0 kV/m` over `40 km`, checks it against sampled profile integration, and rejects a sign-flipped record.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**World state:** Arrival at FIELD unlocks the voltage board.

**Panel/HUD text:** MISSION 3: DERIVE VOLTAGE FROM UNIFORM FIELD OPEN

**Dialogue bubbles -** Ravi Sen: "Start with derive voltage from uniform field. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `mill-array` in Field Station.

**Beat 2 - After Stop 9 | `mill-array` | automatic**

**World state:** The derive voltage from uniform field result remains visible while the read the equipotentials fixture lights.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Ravi Sen: "Use the Stop 9 result to settle read the equipotentials."

**Unlocks/waypoint:** Unlock Stop 10 at `mill-array` in Field Station.

**Beat 3 - After Stop 10 | `mill-bench` | automatic**

**World state:** Stop 2 overlays equipotential contours,.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Ravi Sen: "Use the Stop 10 result to settle derive a sampled-profile estimate."

**Unlocks/waypoint:** Unlock Stop 11 at `mill-bench` in Field Station.

**Beat 4 - After Stop 11 | `mill-bench` | automatic**

**World state:** Stop 3 animates the balloon-profile strips and records the independent `250 MV` estimate, and.

**Panel/HUD text:** 250 MV

**Dialogue bubbles -** Ravi Sen: "Use the Stop 11 result to settle choose the report value."

**Unlocks/waypoint:** Unlock Stop 12 at `mill-bench` in Field Station.

**Beat 5 - At mission end | `mill-array` | automatic**

**World state:** Stop 4 writes the bounded `250–378 MV` interval onto report piece 3.

**Panel/HUD text:** 250–378 MV

**Dialogue bubbles -** Ravi Sen: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

FIELD only. The field profile, equipotential map, and balloon record are co-located and require no artificial travel.

## Characters and dramatic beat

Ravi owns the uniform-layer model; Noor requires the independent profile and keeps both valid endpoints rather than averaging the disagreement away.

## Key concepts, explained here

Potential is scalar, but its spatial derivative gives the vector field. The leading minus sign in `ΔV=-∫E·dl` determines direction, and a sampled profile supplies a defensible independent check.

## Four graded stops

## Stop 9 - Derive voltage from uniform field

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: field-potential integral; Keystone: K3,K1; Area: Mast Base; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The report needs a signed voltage, not the size of the field alone.

**Question card story setup - exact player copy:** The layer model gives a uniform vertical field `E_y=-9.0 kV/m` from ground at `y=0` to cloud at `y=40 km`. Derive `V_cloud-V_ground` with the sign intact, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** The minus sign makes potential rise when the path runs opposite the field.

**Question card prompt - exact player copy:** Build four lines and name each rule; use `1 km=1000 m`, then submit `ΔV` in volts and megavolts.

**Complete format-specific interaction block:** lines `ΔV=-∫0^h E_y dy`(definition), `=-E_yh`(constant integral), `=-(-9.0e3)(4.0e4)`(SI substitution), `=+3.60e8 V`(arithmetic).

**Correct result:** `+3.60×10^8 V=+360 MV`, tolerance `±2 MV`.

**Answer text:** worked arithmetic above.

**Why:** The minus sign makes potential rise when the path runs opposite the field.

**Wrong-path feedback:** Convert kilometres and preserve the leading negative integral sign.

**State/output:** voltage model; S2.

## Stop 10 - Read the equipotentials

**Format/placement:** CHOICE, asked by Ravi Sen beside `mill-array`.

**Metadata:** Concept: equipotential geometry; Keystone: K3; Area: Mast Base; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Talk to Ravi Sen, at the field-mill array in Field Station.

**Stop reason - exact player copy:** A contour map can expose a voltage sign error before it enters the report.

**Question card story setup - exact player copy:** With cloud potential established as higher than ground, the display shows four candidate contour maps. Select the one whose electric-field arrows cross equipotentials at right angles and point toward lower potential.

**Question card story-science connection - exact player copy:** `E=-∇V` fixes both direction and where a strong field needs close contour spacing.

**Question card prompt - exact player copy:** Select one map and submit the letter.

**Choices:**

1. Field arrows cross contours at right angles from high to low potential, with closer contours near the mast tip. **(correct)**

2. Field arrows run along the equipotential contours.

3. Field arrows cross contours from low toward high potential.

4. Contours are equally spaced everywhere, so the field is uniform.

**Complete format-specific interaction block:** `choices=[{id:A,text:"Field arrows perpendicular and downward; contours closer near the tip"},{id:B,text:"Field arrows parallel to equipotentials; contours closer near the tip"},{id:C,text:"Field arrows perpendicular and upward; contours closer near the tip"},{id:D,text:"Field arrows perpendicular and downward; contours equally spaced everywhere"}]`; `answer=A`; `rebuttals={B:"Electric field must cross an equipotential at right angles, not run along it.",C:"The field points from higher cloud potential toward lower ground potential, so these arrows are reversed.",D:"Equal spacing claims equal field strength and misses the measured sharp-tip enhancement."}`.

**Correct result:** A.

**Answer text:** Perpendicular, downhill arrows with closer spacing near the mast tip.

**Why:** `E=-∇V` fixes both direction and where a strong field needs close contour spacing.

**Wrong-path feedback:** (2) **Arrows along contours:** Electric field is perpendicular to an equipotential, not tangent to it. (3) **Low to high:** Because $\mathbf E=-\nabla V$, the field points toward lower potential. (4) **Equal spacing:** The measured tip enhancement requires closer contours and a stronger field near the tip.

**State/output:** correct overlay; S3.

## Stop 11 - Derive a sampled-profile estimate

**Format/placement:** DERIVE, at `mill-bench`.

**Metadata:** Concept: numerical line integral/trapezoid; Keystone: K3,K12; Area: Remote Outstation; Learning role: COMBINE; Difficulty: L4; Story role: verification.

**Call - exact player copy:** Go to the mill bench, in Field Station.

**Stop reason - exact player copy:** Noor needs the uniform-field result checked against independent height samples.

**Question card story setup - exact player copy:** Because the contour test confirms the sign, integrate an independent balloon profile with fields `-6,-8,-10,-8 kV/m` across three `10 km` layers. Compare the sampled voltage with the uniform model, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Agreement between different measurements is stronger when their sensors and assumptions differ.

**Question card prompt - exact player copy:** Build the three-line trapezoid derivation; use `1 (kV/m)(km)=1 MV`, submit voltage in MV and percent difference from `360 MV`.

**Complete format-specific interaction block:** lines `ΔV≈-Σ[(E_i+E_{i+1})/2]Δy`(trapezoid), `=-[(-7)+(-9)+(-9)]kV/m(10km)`(averages), `=+250 MV`(units); comparison `30.6% below 360 MV`.

**Correct result:** `+250 MV`, `30.6% lower`, tolerances `±2 MV`, `±0.5%`.

**Answer text:** `-[-25×10]=+250 MV`; difference `110/360=30.6%`.

**Why:** Agreement between different measurements is stronger when their sensors and assumptions differ.

**Wrong-path feedback:** Average adjacent endpoints before multiplying by each layer thickness.

**State/output:** uncertainty band 250–360 MV; S4.

## Stop 12 - Choose the report value

**Format/placement:** STRESS, asked by Ravi Sen beside `mill-bench`.

**Metadata:** Concept: model range; Keystone: K3,K12; Area: Remote Outstation; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Ravi Sen, at the mill bench in Field Station.

**Stop reason - exact player copy:** The next energy model needs a bounded voltage rather than false precision.

**Question card story setup - exact player copy:** Now two valid profiles give `250 MV` and `360 MV`, while balloon altitude may shift by `±2 km`. Stress both estimates across that range and choose the conservative report interval, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A bounded interval preserves disagreement instead of hiding it in one unjustified number.

**Question card prompt - exact player copy:** Move cloud height from `38` to `42 km`, then submit one interval in MV that contains both measurement methods throughout the range.

**Complete format-specific interaction block:** `stress={assumption:cloud_height_km,min:38,max:42,step:1,candidates:[250_to_360_MV,300_MV_exact,sign_negative],correct:250_to_378_MV}`.

**Correct result:** `250–378 MV`, inclusive.

**Answer text:** Sampled minimum remains 250; uniform maximum scales `360×42/40=378 MV`.

**Why:** A bounded interval preserves disagreement instead of hiding it in one unjustified number.

**Wrong-path feedback:** Do not average away method spread; bound it.

**State/output:** report piece 3; M4.

## Mission outcome

Mission decision: Use `250–378 MV` for the cloud-ground potential. Field direction makes the cloud positive relative to ground in this model. The voltage is large enough to matter. But it still does not explain why damage appeared only at the trailer.

### Post-mission metric screen - exact player copy

**Metric screen:** target `20:00`; event `An independent profile bounds the voltage.`; auto `CERTAINTY +3`; QA `36/90/62/84`.  
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 4 - The Point on the Skyline

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 12 DAYS TO FINAL STORM WINDOW  
**Card title:** The Point on the Skyline  
**Go now:** Go to Mast Base and meet Marcus Tate, mast engineer, at the mast desk.  
**Card body:** The voltage interval is large enough to drive a discharge, yet the outstation shows no direct arc mark. A conductor moves free charge until its interior field is zero, and sharp surfaces can crowd charge outside. You will model the mast tip and inspect the trailer record. By the end of the mission, decide whether tip enhancement alone caused the outstation loss.  
**Objective:** Separate local mast-tip breakdown from the remote failure.  
### Worth knowing first - exact player copy

#### Glossary terms

Conductor: material whose mobile charge rearranges easily.
Electrostatic equilibrium: settled state with zero field inside a conductor.
Breakdown field: field above which the campaign's air model conducts.  
#### Primer concepts

A conductor is equipotential; its surface field is perpendicular; sharper curvature produces larger surface charge density.  
#### Equations first needed today
**Equation:** `E_out=σ/ε₀`

**What it is for:** connect surface charge to field just outside

**Symbols:** `σ` C/m², `ε₀` constant

**Why this campaign needs it:** compare tip field with Station 12's fictional `3.0 MV/m` wet-air threshold.## Main story happening - designer summary
At MAST, Tate proves the tip can trigger a rocket but cannot create the trailer's no-contact damage. Arrival bubble→S1; S2 posts tip ratio; S3 cage interior reads zero; S4 logs missing arc mark and fills report piece 4. One location. The tension is useful launch enhancement versus unsafe remote inference.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `mast-desk` | automatic**

**World state:** | trigger | location | presentation | world_state | exact dialogue/panel copy | unlocks | |---|---|---|---|---|---| | briefing accepted | MAST/mast-desk | nearby_character_bubble | corona icon pulses at tip; cabinet normal | `` | M4S1 | | S2 correct | MAST/mast-desk | equipment_panel_update | tip label `50× BODY FIELD` | `The enhancement is local to the sharp tip.` | M4S3 | | S3 correct | MAST/cabinet | persistent_world_change | closed cabinet reads `0.00 kV/m — SHIELDED` | `A closed conductor cancels the static interior field.` | M4S4 | | S4 correct | MAST/cabinet | nearby_character_bubble | trailer photo gains `` | outcome | | outcome closes | MAST/mast-desk | system_banner | report piece 4 fixed in SHOT board remotely | `TIP EFFECT LOCAL — SEARCH FOR A PATH` | metric screen, M5 |.

**Panel/HUD text:** Marcus Tate, mast engineer: “The tip is meant to start a strike. Show me whether that can reach the trailer.”

**Dialogue bubbles -** Marcus Tate: "The tip is meant to start a strike. Show me whether that can reach the trailer."

**Unlocks/waypoint:** Unlock Stop 13 at `mast-desk` in Mast Base.

**Beat 2 - After Stop 13 | `mast-desk` | automatic**

**World state:** The conductor boundary result remains visible while the derive tip enhancement fixture lights.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Marcus Tate: "Use the Stop 13 result to settle derive tip enhancement."

**Unlocks/waypoint:** Unlock Stop 14 at `mast-desk` in Mast Base.

**Beat 3 - After Stop 14 | `cabinet` | automatic**

**World state:** The derive tip enhancement result remains visible while the verify static shielding fixture lights.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Marcus Tate: "Use the Stop 14 result to settle verify static shielding."

**Unlocks/waypoint:** Unlock Stop 15 at `cabinet` in Mast Base.

**Beat 4 - After Stop 15 | `cabinet` | automatic**

**World state:** The verify static shielding result remains visible while the diagnose the remote path fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Marcus Tate: "Use the Stop 15 result to settle diagnose the remote path."

**Unlocks/waypoint:** Unlock Stop 16 at `cabinet` in Mast Base.

**Beat 5 - At mission end | `mast-desk` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Marcus Tate: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

MAST only; cabinet and mast geometry are unavailable elsewhere. 

## Characters and dramatic beat

Tate wants to preserve the launch function; evidence moves him from defending the mast to seeking a path. 

## Key concepts, explained here

 electrostatic equilibrium, equipotential conductors, `E_out=σ/ε₀`, curvature enhancement, shielding.  

## Four graded stops
## Stop 13 - Conductor Boundary

**Format/placement:** CHOICE, asked by Marcus Tate beside `mast-desk`.

**Metadata:** Concept: conductor equilibrium; Keystone: K4; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L1 clue.

**Call - exact player copy:** Talk to Marcus Tate, at the mast desk in Mast Base.

**Stop reason - exact player copy:** the mast model must obey conductor boundaries.

**Question card story setup - exact player copy:** The mast sits at one voltage after charge settles, but four sketches show different interior and surface fields. Select the only sketch consistent with electrostatic equilibrium before Tate estimates the tip field.

**Question card story-science connection - exact player copy:** zero interior field and perpendicular exterior field rule out three pictures.

**Question card prompt - exact player copy:** Select the one conductor sketch that shows zero field inside, one surface potential, and an exterior field perpendicular to the surface; submit one letter.

**Choices:**

1. Zero field inside, one surface potential, and an exterior field perpendicular to the surface. **(correct)**

2. A nonzero uniform field remains inside the conductor.

3. The exterior field is tangent to the conductor surface.

4. Potential varies from point to point along the conductor surface.

**Complete format-specific interaction block:** `choices=[{id:A,text:"Zero interior field; one surface potential; exterior field perpendicular"},{id:B,text:"Nonzero uniform interior field; exterior field perpendicular"},{id:C,text:"Zero interior field; exterior field tangent to the surface"},{id:D,text:"Zero interior field; different potentials at the tip and body"}]`; `answer=A`; `rebuttals={B:"A nonzero interior field would keep moving free charge, so equilibrium has not been reached.",C:"A tangent surface field would move charge along the conductor; the equilibrium field must be perpendicular.",D:"A connected conductor in electrostatic equilibrium is one equipotential, including tip and body."}`.

**Correct result:** `A conductor at equilibrium has E=0 inside; outside E is normal.` Mobile charge moves until tangential/interior fields vanish.

**Answer text:** The completed check shows a conductor at equilibrium has E=0 inside; outside E is normal. Mobile charge moves until tangential/interior fields vanish.

**Why:** zero interior field and perpendicular exterior field rule out three pictures.

**Wrong-path feedback:** (2) **Nonzero interior field:** Mobile charge would continue moving, so this cannot be electrostatic equilibrium. (3) **Tangent exterior field:** A tangential component would drive surface charge; the settled field must be normal. (4) **Varying surface potential:** A conductor in electrostatic equilibrium is an equipotential.

**State/output:** boundary overlay→S2.

## Stop 14 - Derive Tip Enhancement

**Format/placement:** DERIVE, at `mast-desk`.

**Metadata:** Concept: spherical-curvature proxy; Keystone: K2,K4; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3 reveal.

**Call - exact player copy:** Go to the mast desk, in Mast Base.

**Stop reason - exact player copy:** the launch team needs a numerical enhancement, not “sharp is stronger.”

**Question card story setup - exact player copy:** With conductor boundaries fixed, approximate the tip and mast body as conducting spheres at the same potential, with radii `0.010 m` and `0.50 m`. Derive their surface-field ratio.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** equal potential makes `E=V/R`, so smaller curvature radius means larger field.

**Question card prompt - exact player copy:** Build four lines from V=kQ/R and E=kQ/R², choose the rule that licenses each line, and submit the numerical ratio E_tip/E_body.

**Complete format-specific interaction block:** lines: `V=kQ/R`(sphere potential), `E=kQ/R²`(Gauss/Coulomb), `E=V/R`(eliminate Q), `E_tip/E_body=R_body/R_tip=50`(ratio).

**Correct result:** 50 exact.

**Answer text:** `E_tip/E_body=R_body/R_tip=50.` Equal V with `E=V/R` crowds field at small radius.

**Why:** equal potential makes `E=V/R`, so smaller curvature radius means larger field.

**Wrong-path feedback:** equal voltage does not mean equal surface charge.

**State/output:** unlock S3.

## Stop 15 - Verify Static Shielding

**Format/placement:** VERIFY, at `cabinet`.

**Metadata:** Concept: shielding/conductor; Keystone: K4,K12; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3 test.

**Call - exact player copy:** Go to the shielding cabinet, in Mast Base.

**Stop reason - exact player copy:** a real enclosure must verify the zero-interior-field claim.

**Question card story setup - exact player copy:** Because the tip model is local, test whether a closed conducting cabinet blocks a static external field. Predict its interior reading before the door control unlocks, then compare open and closed states.

**Question card story-science connection - exact player copy:** induced surface charge cancels static field inside a closed conductor.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Enter 0.00 kV/m for the closed cabinet. OPERATE: Open, then close, the door while external field and sensor position stay fixed. MEASURE: Record both interior fields. INTERPRET: Restore the door closed and submit one shielding conclusion.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"closed-cabinet interior field",unit:"kV/m",truth:0.00,tolerance:0.02}},equipment_locked_until_prediction_commit:true,operation:{control:"cabinet door",settings:["open","closed"],fixed:["external field 4.0 kV/m","sensor position"]},measurements:{open:1.20,closed:0.00,unit:"kV/m"},restore:{required:true,setting:"closed",remeasure:true},correct_conclusion:"static shielding confirmed",answerText:"The closed cabinet reads 0.00 kV/m within tolerance, while opening admits field; closing restores shielding."}`

**Correct result:** `Closed reading 0.00 kV/m confirms static shielding.` Surface charge cancels interior E.

**Answer text:** The completed check shows closed reading 0.00 kV/m confirms static shielding. Surface charge cancels interior E.

**Why:** induced surface charge cancels static field inside a closed conductor.

**Wrong-path feedback:** `Commit the closed-state prediction before touching the door, and restore the door closed.`

**State/output:** unlock S4.

## Stop 16 - Diagnose the Remote Path

**Format/placement:** DIAGNOSIS, at `cabinet`.

**Metadata:** Concept: local versus remote cause; Keystone: K4,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the shielding cabinet, in Mast Base.

**Stop reason - exact player copy:** the same conductor physics must fit both mast and trailer evidence.

**Question card story setup - exact player copy:** Now the mast tip can exceed breakdown while a closed conductor remains field-free. Diagnose which explanation fits tip corona, no trailer arc mark, and damage only on a cable card.

**Question card story-science connection - exact player copy:** a local strong field explains corona but cannot cross two hundred metres without a coupling path.

**Question card prompt - exact player copy:** Read every alarming and quiet zone, select one diagnosis that fits them all, and submit either tip field alone, site-wide field, or conducted/induced path.

**Complete format-specific interaction block:** headline `WHAT FAILED?`; readings zones `[tip_corona:alarm,trailer_shell_arc:none,card_damage:alarm,cabinet_inside:quiet]`; choices `[tip_field_alone,conducted_or_induced_path,sitewide_uniform_field]`; answer `conducted_or_induced_path`.

**Correct result:** `A conducted or induced path fits all readings.` Tip-only and uniform-field models fail quiet evidence.

**Answer text:** The completed check shows a conducted or induced path fits all readings. Tip-only and uniform-field models fail quiet evidence.

**Why:** a local strong field explains corona but cannot cross two hundred metres without a coupling path.

**Wrong-path feedback:** `Use the absent shell arc and quiet cabinet, not only the alarming card.`

**State/output:** report piece 4→M5.

## Mission outcome

Mission decision: Tip enhancement did not by itself cause the outstation loss. It explains why the mast launches a discharge. But the trailer evidence requires a conducted or induced path. The search now moves from voltage to stored charge. **Metric:** target 18:00.

### Post-mission metric screen - exact player copy

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 18:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A verified tip model restores one launch boundary.

**Automatic bar change:** CREW CLEARANCE +3

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 39/96/64/88

**Lock result:** No bar locks.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- electrostatic equilibrium, equipotential conductors, E_out=σ/ε₀, curvature enhancement, shielding.
- ## Four graded stops
- **Mission takeaway:** Tip enhancement did not by itself cause the outstation loss.

---

# Mission 5 - The Sky as a Capacitor

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 11 DAYS TO FINAL STORM WINDOW; **Go now:** Field Station, Ravi Sen at mill array.  
**Card title:** The Sky as a Capacitor  
**Card body:** Tip enhancement starts the strike, but remote damage needs energy and a path. Two separated conductors can store opposite charge; their geometry and insulating material set capacitance. You will derive the cloud-ground model, test dielectric assumptions, and carry its charge prediction to the impulse bank. By the end of the mission, decide which bank setting can represent the storm without overstating it.  
**Objective:** Build a bounded cloud-ground capacitance and charge model.  
### Worth knowing first - exact player copy

#### Glossary terms

Capacitance: stored charge per voltage.
Dielectric: insulating material that changes capacitance by polarization.
Polarization: small charge separation inside matter.  
#### Primer concepts

`C` depends on geometry/material, not supplied `Q` or `V`; parallel capacitors add; series total is smaller than either member.  
#### Equations first needed today
**Equation:** `C=Q/V`, `C=κε₀A/d`

**What it is for:** connect geometry, material, charge, voltage

**Symbols:** `κ` dielectric constant, `A` area, `d` separation

**Why this campaign needs it:** translate storm geometry into a safe bank target.## Main story happening - designer summary
FIELD S1-S2 bounds geometry; evidence sends player to BANK because only bank hardware can reproduce charge; S3 derives combination; S4 selects setting. Two locations, causal waypoint `Take the bounded C and V to Impulse Hall.`

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**World state:** | trigger | location | presentation | world_state | exact copy | unlocks | |---|---|---|---|---|---| | accepted | FIELD/mill-array | nearby_character_bubble | cloud footprint overlay visible | `` | S1 | | S2 correct | FIELD/mill-array | waypoint_notification | truth pair pinned | `Take A = 2.0×10^8 m² and κ = 1.00 to Impulse Hall.` | BANK travel/S3 | | enter BANK | BANK/hall-board | nearby_character_bubble | earthing stick on | `` | S3 | | S4 correct | BANK/bank-stages | equipment_panel_update | selected evidence labels appear | `MATCH: VOLTAGE • CHARGE • TIMING; GEOMETRY NOT MATCHED` | outcome | | outcome closes | BANK/hall-board | system_banner | report piece 5 appears | `CLOUD MODEL BOUNDED` | metric/M6 |.

**Panel/HUD text:** Ravi Sen, field scientist: “Use geometry first. Voltage comes only after we know what can store charge.”

**Dialogue bubbles -** Mission lead: "Use geometry first. Voltage comes only after we know what can store charge."

**Unlocks/waypoint:** Unlock Stop 17 at `mill-array` in Field Station.

**Beat 2 - After Stop 17 | `storm-profile-board` | automatic**

**World state:** The derive cloud-ground capacitance result remains visible while the break the area-dielectric degeneracy fixture lights.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 17 result to settle break the area-dielectric degeneracy."

**Unlocks/waypoint:** Unlock Stop 18 at `storm-profile-board` in Field Station.

**Beat 3 - After Stop 18 | `hall-board` | automatic**

**World state:** The break the area-dielectric degeneracy result remains visible while the derive marx topology fixture lights.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 18 result to settle derive marx topology."

**Unlocks/waypoint:** Unlock Stop 19 at `hall-board` in Impulse Hall.

**Beat 4 - After Stop 19 | `trailer-cards` | automatic**

**World state:** The derive marx topology result remains visible while the buy model evidence fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 19 result to settle buy model evidence."

**Unlocks/waypoint:** Unlock Stop 20 at `trailer-cards` in Remote Outstation.

**Beat 5 - At mission end | `mill-array` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

FIELD→BANK because the bank topology cannot be inspected at FIELD. 

## Characters and dramatic beat

Ravi protects model honesty; Strand protects operability. 

## Key concepts, explained here

`C=Q/V`, `C=κε₀A/d`, dielectric polarization, series/parallel topology.  

## Four graded stops
## Stop 17 - Derive Cloud-Ground Capacitance

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: parallel-plate capacitance; Keystone: K2,K3,K5; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** bank settings need a geometry-based C.

**Question card story setup - exact player copy:** The layer model now has area `A=2.0×10^8 m²`, height `d=4.0×10^4 m`, and effective `κ=1.00`. Derive cloud-ground capacitance before using any voltage.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Gauss gives field, and the field-potential relation turns it into capacitance.

**Question card prompt - exact player copy:** Using ε₀=8.854×10^-12 F/m, build every line from Gauss’s law through C=Q/V, name each rule, and submit capacitance in nF to the displayed tolerance.

**Complete format-specific interaction block:** lines `E=σ/ε0`(Gauss boundary), `V=Ed=Qd/(ε0A)`(σ=Q/A), `C=Q/V=ε0A/d`(definition), substitution→`4.427×10^-8 F=44.3 nF`. Prompt includes `ε0`; submit nF. Tolerance .2 nF. Worked answer.

**Correct result:** `C=ε₀A/d=44.3 nF.` Gauss plus `V=Ed` cancels Q.

**Answer text:** The completed check shows c=ε₀A/d=44.3 nF. Gauss plus V=Ed cancels Q.

**Why:** Gauss gives field, and the field-potential relation turns it into capacitance.

**Wrong-path feedback:** `Convert height to metres and keep area in square metres; C is not QV.`

**State/output:** unlock S2.

## Stop 18 - Break the Area-Dielectric Degeneracy

**Format/placement:** DEGENERACY, at `storm-profile-board`.

**Metadata:** Concept: κ-area degeneracy; Keystone: K5,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L4.

**Call - exact player copy:** Go to the storm profile board, in Field Station.

**Stop reason - exact player copy:** the same capacitance can come from several footprint/material pairs.

**Question card story setup - exact player copy:** Because `C=κε₀A/d`, area and dielectric factor can trade off while matching `44.3 nF`. Adjust both controls, then use radar area to collapse the matching curve.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** a second physical constraint prevents a convenient but false parameter choice.

**Question card prompt - exact player copy:** Use the two controls `cloud area A` and `dielectric factor kappa`. Adjust A from 1.0×10^8 to 3.0×10^8 m2 in 0.1×10^8 m2 steps and kappa from 1.0 to 2.0 in 0.1 steps; apply both loci, then submit the numerical pair (A,kappa) before selecting the radar-constrained plan.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:"A",label:"cloud area",min:1.0e8,max:3.0e8,step:0.1e8,unit:"m^2"},{id:"kappa",label:"dielectric factor",min:1.0,max:2.0,step:0.1,unit:"unitless"}],tolerance:{capacitance:1,unit:"nF"},first_locus:[[1.0e8,2.0],[1.2e8,1.67],[1.4e8,1.43],[1.6e8,1.25],[1.8e8,1.11],[2.0e8,1.0]],second_locus:[[1.9e8,1.05],[2.0e8,1.0],[2.1e8,0.95]],physical_constraint:"radar area A=(2.0±0.1)×10^8 m^2",truth_pair:[2.0e8,1.0],required_submission:"numeric (A,kappa) pair before plan choice",correct_plan:"radar-constrained plan",answerText:"Radar fixes area near 2.0×10^8 m^2, so capacitance fixes kappa near 1.0."}`

**Correct result:** truth. State waypoint BANK.

**Answer text:** `Radar selects (2.0×10^8 m²,1.00).` A second constraint breaks the product degeneracy.

**Why:** a second physical constraint prevents a convenient but false parameter choice.

**Wrong-path feedback:** `Submit both numerical controls before the plan; capacitance alone leaves a locus.`

**State/output:** Record the result and unlock the next named stop.

## Stop 19 - Derive Marx Topology

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: series/parallel capacitors; Keystone: K5; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** Strand must convert one storm capacitance into twelve physical stages.

**Question card story setup - exact player copy:** At Impulse Hall, Elise Strand, impulse engineer, shows twelve `100 nF` stage capacitors. Derive the equivalent capacitance when they charge in parallel and discharge in series.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Marx topology stores charge at low stage voltage and delivers summed voltage.

**Question card prompt - exact player copy:** Build and license the parallel-charge and series-discharge derivations, then submit both equivalent capacitances in μF and nF.

**Complete format-specific interaction block:** lines `Ccharge=ΣC_i=12C=1.20µF`(parallel), `1/Cdis=Σ1/C=12/C`(series), `Cdis=C/12=8.33nF`(algebra).

**Correct result:** tolerances.

**Answer text:** `Charge: 1.20 μF; discharge: 8.33 nF.` Parallel adds C; series adds reciprocals.

**Why:** Marx topology stores charge at low stage voltage and delivers summed voltage.

**Wrong-path feedback:** `Identify same two nodes versus in-line stages before selecting a topology rule.`

**State/output:** unlock S4.

## Stop 20 - Buy Model Evidence

**Format/placement:** VALUE, asked by Dr. Lena Ortiz beside `trailer-cards`.

**Metadata:** Concept: bank representation; Keystone: K5,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the diagnostic card rack in Remote Outstation.

**Stop reason - exact player copy:** limited test budget must buy the setting that constrains the storm model.

**Question card story setup - exact player copy:** With storm capacitance bounded and bank topology known, four possible measurements compete for six setup-hours. Buy the evidence that determines voltage, charge, and timing without pretending the bank matches cloud geometry.

**Question card story-science connection - exact player copy:** a model is useful when its matched variables and limitations are explicit.

**Question card prompt - exact player copy:** Spend no more than six setup-hours on the listed measurements and submit the evidence set that fixes represented voltage, charge, and timing without claiming matched geometry.

**Complete format-specific interaction block:** `value:{budget:6,options:[{id:"stage_voltage",axis:"voltage scale",cost:2,required:true},{id:"stage_capacitance",axis:"stored charge and energy",cost:1,required:true},{id:"gap_timing",axis:"pulse timing",cost:2,required:true},{id:"hall_temperature",axis:"ambient condition",cost:2,required:false},{id:"paint_color",axis:"cosmetic condition",cost:1,required:false}],total_available_cost:8,correct_purchase:["stage_voltage","stage_capacitance","gap_timing"],reserve:1,answerText:"Buy voltage, capacitance, and timing evidence for five credits; temperature and paint cannot validate the electrical analog."}`

**Correct result:** `Buy stage V, stage C, and gap timing.` They constrain represented quantities within budget.

**Answer text:** match V,Q,timing.

**Why:** a model is useful when its matched variables and limitations are explicit.

**Wrong-path feedback:** `A convenient measurement is not valuable unless it can change the representation decision.`

**State/output:** report piece5.

## Mission outcome

Mission decision: Use the twelve-stage Marx bank only as an electrical model. Match voltage, charge, and timing. The storm capacitance is about 44.3 nF. The bank does not copy cloud shape. Next, calculate staged energy.

### Post-mission metric screen - exact player copy

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 21:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A geometry survey protects the model, but setup uses test supplies.

**Automatic bar change:** STATION INTEGRITY +2 | SHOT RESERVE -3

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 45/98/64/93

**Lock result:** No bar locks.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- C=Q/V, C=κε₀A/d, dielectric polarization, series/parallel topology.
- ## Four graded stops
- **Mission takeaway:** Use the twelve-stage Marx bank only as an electrical analog, matched in voltage, charge,.

---

# Mission 6 - Count the Bank's Energy

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 10 DAYS; **Go now:** Impulse Hall, Elise Strand at bank stages.  
**Card title:** Count the Bank's Energy  
**Card body:** The bank can match storm voltage, charge, and timing, but a wrong topology could hide a dangerous energy difference. Stored electric energy depends on capacitance and voltage, and the Marx bank changes connection between charge and discharge. You will derive both energy forms and inspect stage timing. By the end of the mission, decide whether a reduced-energy firing is safe enough to authorize.  
**Objective:** Bound bank energy and authorize or reject the test.  
### Worth knowing first - exact player copy

#### Glossary terms

Marx bank: capacitors charged in parallel and discharged in series.
Energy density: stored energy per volume.
Spark gap: switch that conducts after breakdown.  
#### Primer concepts

Total energy is conserved apart from losses; voltage sums in series; late gap firing changes pulse shape.  
#### Equations first needed today
**Equation:** `U=½CV²=Q²/(2C)=½QV`

**What it is for:** stored energy

**Symbols:** standard

**Why this campaign needs it:** bound test.

**Equation:** `u_E=½ε₀E²`

**What it is for:** energy density

**Symbols:** u_E, ε, E are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** compare local field hazard.## Main story happening - designer summary
BANK derives energy and gap timing, then SHOT records authorization. Beats include earthing stick visibly on until S4. Two locations due authority record unavailable in hall.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `hall-board` | automatic**

**World state:** accepted BANK/bubble/earthing stick on/``→S1; S2 correct/panel/gap 8 tagged/`8 mm: rise 115 ns; breakdown 56 kV.`→S3; S3 correct/panel/shield zone text/`39.8 J/m³ AT FICTIONAL WET-AIR LIMIT`→S4; S4 correct/nearby bubble/earth stick remains until authorization/``→SHOT waypoint; enter SHOT/record update/piece6/`STAGE 7: LATE FIRING FLAG`→outcome.

**Panel/HUD text:** Elise Strand, impulse engineer: “Count energy before this stick moves.”

**Dialogue bubbles -** Mission lead: "Count energy before this stick moves."

**Unlocks/waypoint:** Unlock Stop 21 at `hall-board` in Impulse Hall.

**Beat 2 - After Stop 21 | `gap-row` | automatic**

**World state:** The derive stored bank energy result remains visible while the sweep gap timing fixture lights.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 21 result to settle sweep gap timing."

**Unlocks/waypoint:** Unlock Stop 22 at `gap-row` in Impulse Hall.

**Beat 3 - After Stop 22 | `hall-board` | automatic**

**World state:** The sweep gap timing result remains visible while the derive electric energy density fixture lights.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 22 result to settle derive electric energy density."

**Unlocks/waypoint:** Unlock Stop 23 at `hall-board` in Impulse Hall.

**Beat 4 - After Stop 23 | `record-desk` | automatic**

**World state:** The derive electric energy density result remains visible while the authorize the reduced shot fixture lights.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 23 result to settle authorize the reduced shot."

**Unlocks/waypoint:** Unlock Stop 24 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `hall-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

BANK→SHOT because only the records desk can authorize and preserve a shot. 

## Characters and dramatic beat

Strand values hardware realism; Ortiz requires identity and condition. 

## Key concepts, explained here

 capacitor work integral, `U`, energy density, breakdown, Marx timing.  

## Four graded stops
## Stop 21 - Derive Stored Bank Energy

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: capacitor energy; Keystone: K5,K6; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** authorization needs energy from first principles.

**Question card story setup - exact player copy:** Each of twelve stages has `C=100 nF` and charges to `V=50.0 kV`. Derive the bank's total stored energy before anyone removes the earthing stick.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** summing stage energy avoids misusing the discharge-equivalent capacitance.

**Question card prompt - exact player copy:** Build the four-line energy derivation beginning with dU=Vdq, name each rule, and submit total twelve-stage stored energy in joules.

**Complete format-specific interaction block:** lines `dU=Vdq`(work), `q=CV`(capacitor), `U=∫0^Q(q/C)dq=Q²/2C=½CV²`(integrate), `Utot=12×½(100e-9)(50e3)²=1500J`. Prompt derive and submit J, tolerance 5. Answer 1.50 kJ.

**Correct result:** `Twelve stages store 1.50 kJ.` Integrating `V dq` gives `½CV²` per stage.

**Answer text:** The completed check shows twelve stages store 1.50 kJ. Integrating V dq gives ½CV² per stage.

**Why:** summing stage energy avoids misusing the discharge-equivalent capacitance.

**Wrong-path feedback:** `Use charging topology and multiply per-stage energy by twelve; do not use discharge C.`

**State/output:** unlock S2.

## Stop 22 - Sweep Gap Timing

**Format/placement:** SWEEP, at `gap-row`.

**Metadata:** Concept: breakdown/timing; Keystone: K4,K6,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3.

**Call - exact player copy:** Go to the spark-gap row, in Impulse Hall.

**Stop reason - exact player copy:** energy is safe only if the front is slow enough for protected sensors.

**Question card story setup - exact player copy:** With total energy fixed at `1.50 kJ`, sweep the first-gap spacing from `4` to `10 mm`. Record breakdown voltage and rise time only at settings you inspect.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** gap geometry changes the pulse front even when stored energy stays fixed.

**Question card prompt - exact player copy:** Sweep only first-gap spacing from 4 through 10 mm while total energy remains 1.50 kJ, measure voltage and rise time at inspected points, and submit one inspected setting meeting both goals.

**Complete format-specific interaction block:** points spacing `[4,5,6,7,8,9,10]`, rise_ns `[40,55,70,90,115,145,180]`, breakdown_kV `[30,36,42,49,56,63,70]`; goal rise≥100ns and V≤60kV; correct 8mm. Prompt sweep and submit setting.

**Correct result:** `Choose 8 mm.` It is the inspected setting meeting rise-time and breakdown bounds.

**Answer text:** The completed check shows choose 8 mm. It is the inspected setting meeting rise-time and breakdown bounds.

**Why:** gap geometry changes the pulse front even when stored energy stays fixed.

**Wrong-path feedback:** `Submit a measured setting satisfying both conditions, not an interpolated uninspected point.`

**State/output:** unlock S3.

## Stop 23 - Derive Electric Energy Density

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: energy density/field; Keystone: K6,K4; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** a safe total can still concentrate dangerous energy at a gap.

**Question card story setup - exact player copy:** Because the `8 mm` setting controls rise time, compute the local electric energy density at the fictional wet-air limit `E=3.0 MV/m`. Derive the result for the hall shield review.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** field squared makes local hotspots matter strongly.

**Question card prompt - exact player copy:** Build the electric-energy-density calculation using ε₀=8.854×10^-12 F/m and E=3.0×10^6 N/C, name each rule, and submit u_E in J/m³.

**Complete format-specific interaction block:** lines `uE=½ε0E²`; substitution `½(8.854e-12)(3.0e6)²`; result `39.84 J/m³`. Prompt submit J/m³ tolerance .2.

**Correct result:** `u_E=39.84 J/m³.` Energy density scales with field squared.

**Answer text:** The completed check shows u_E=39.84 J/m³. Energy density scales with field squared.

**Why:** field squared makes local hotspots matter strongly.

**Wrong-path feedback:** `Square 3.0×10^6 N/C before multiplying by ε₀/2.`

**State/output:** unlock S4.

## Stop 24 - Authorize the Reduced Shot

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `record-desk`.

**Metadata:** Concept: authorization records; Keystone: K6,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the record desk in Launch Control.

**Stop reason - exact player copy:** Ortiz needs physical condition and records before removing earth.

**Question card story setup - exact player copy:** Now energy and gap settings pass, but a calculation alone cannot prove the hall is ready. Verify the critical claims within three checks before signing the reduced-energy shot.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** identity, timing, and physical condition require independent backing.

**Question card prompt - exact player copy:** Use at most three checks to verify the unbacked critical hall claims, then submit AUTHORIZE or HOLD for the reduced-energy shot.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"earth_stick",label:"earth stick present",signed:true,backed:true,critical:true},{id:"discharged",label:"capacitors discharged",signed:true,backed:true,critical:true},{id:"gap",label:"gap set to 8 mm",signed:true,backed:true,critical:true},{id:"door_clear",label:"test door clear",signed:true,backed:false,critical:true},{id:"weather",label:"weather window safe",signed:true,backed:false,critical:true},{id:"stage_serial",label:"stage serial matches plan",signed:true,backed:false,critical:true}],correct_verified:["door_clear","weather","stage_serial"],critical_unbacked:["door_clear","weather","stage_serial"],answerText:"Use all three checks on the unbacked door, weather, and stage-serial claims before authorizing the reduced shot."}`

**Correct result:** `Authorize the reduced shot after three critical checks.` Records plus physical inspection establish readiness.

**Answer text:** The completed check shows authorize the reduced shot after three critical checks. Records plus physical inspection establish readiness.

**Why:** identity, timing, and physical condition require independent backing.

**Wrong-path feedback:** `A backed calculation cannot substitute for the unverified door or weather condition.`

**State/output:** report piece6.

## Mission outcome

Mission decision: Authorize one reduced-energy firing at the `8 mm` first-gap setting. The bank stores `1.50 kJ`. And the selected front protects the test sensors. The timing log shows stage 7 fires late, so the pulse may not be as uniform as the total energy suggests. Metric target 22:00.

### Post-mission metric screen - exact player copy

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 22:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The reduced shot uses reserve and adds a verified energy bound.

**Automatic bar change:** REPORT CERTAINTY +4 | SHOT RESERVE -4

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 53/98/66/95

**Lock result:** No bar locks.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- capacitor work integral, U, energy density, breakdown, Marx timing.
- ## Four graded stops
- **Mission takeaway:** Authorize one reduced-energy firing at the `8 mm` first-gap setting.

---

# Mission 7 - Four Screens, One Wire

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 9 DAYS; **Go now:** Field Station, Noor Haddad at mill array.  
**Card title:** Four Screens, One Wire  
**Card body:** The reduced shot stayed within the energy limit, yet all four field mills jumped by the same amount at the same microsecond. Agreement can be false when channels share a return path. You will derive circuit constraints, trace dependencies, and compare an independent sensor. By the end of the mission, decide whether the mill agreement can remain evidence in the report.  
**Objective:** Test whether the four mill channels are independent.  
### Worth knowing first - exact player copy

#### Glossary terms

Current: rate of charge flow.
Node: connection shared by circuit branches.
Reference: voltage point against which a channel is measured.  
#### Primer concepts

Charge is conserved at nodes; voltage changes sum to zero around a loop; shared references create common-mode error.  
#### Equations first needed today
**Equation:** `I=dQ/dt`, `V=IR`, `R=ρL/A`

**What it is for:** current/resistance

**Symbols:** include `ρ`

**Why this campaign needs it:** trace return path.

**Equation:** `ΣI_in=ΣI_out`, `Σε-ΣIR=0`

**What it is for:** Kirchhoff node/loop rules

**Symbols:** ΣI_in, ΣI_out, Σ, ε, ΣIR are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** expose impossible shared-current readings.## Main story happening - designer summary
FIELD circuit work sends player to SHOT raw reference panel. Twist 1 decertifies earlier agreement, causing named metric loss. Two locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**World state:** accepted FIELD/bubble/four traces aligned/``→S1; S1 correct/waypoint/trace dependency lights to SHOT/`ALL FOUR MILLS → SHOT GROUND REFERENCE`→travel; enter SHOT/bubble/hidden branch icon/`The trunk is short by 3.0 mA.`→S2; S3 correct/panel/jump disappears then returns/`ISOLATE: 0.03; RESTORE: 0.80 kV/m`→S4; S4 correct/world/report pieces 1-3 marked `SHARED REFERENCE—NOT INDEPENDENT`/`Evidence removed; layer model retained.`→outcome.

**Panel/HUD text:** Noor Haddad, data and safety analyst: “Independent of what?”

**Dialogue bubbles -** Mission lead: "Independent of what?"

**Unlocks/waypoint:** Unlock Stop 25 at `mill-array` in Field Station.

**Beat 2 - After Stop 25 | `radar-desk` | automatic**

**World state:** The trace the shared reference result remains visible while the derive the missing branch current fixture lights.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 25 result to settle derive the missing branch current."

**Unlocks/waypoint:** Unlock Stop 26 at `radar-desk` in Launch Control.

**Beat 3 - After Stop 26 | `radar-desk` | automatic**

**World state:** The derive the missing branch current result remains visible while the isolate reference c fixture lights.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 26 result to settle isolate reference c."

**Unlocks/waypoint:** Unlock Stop 27 at `radar-desk` in Launch Control.

**Beat 4 - After Stop 27 | `record-desk` | automatic**

**World state:** The isolate reference c result remains visible while the quantify common-mode error fixture lights.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 27 result to settle quantify common-mode error."

**Unlocks/waypoint:** Unlock Stop 28 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `mill-array` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

FIELD→SHOT because dependency tracing identifies the shared reference there. 

## Characters and dramatic beat

Noor accepts sufficient evidence after reversal; Ravi's earlier confidence is revised without making him incompetent. 

## Key concepts, explained here

 current, Kirchhoff, Ohm, power, common-mode error.  

## Four graded stops
## Stop 25 - Trace the Shared Reference

**Format/placement:** TRACE, at `mill-array`.

**Metadata:** Concept: dependencies; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L4 reveal.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** identical jumps may share infrastructure.

**Question card story setup - exact player copy:** The four mills agree to the microsecond, while a battery logger does not jump. Open every channel's power, clock, and reference dependencies to find what the agreeing screens share.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** common upstream hardware makes correlated readings less independent than their number suggests.

**Question card prompt - exact player copy:** Open the power, clock, and reference dependencies for all five channels, name the shared upstream resource, and submit whether the four mills are independent.

**Complete format-specific interaction block:** `trace:{channels:[{id:"mill_A",label:"mill A",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_B",label:"mill B",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_C",label:"mill C",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_D",label:"mill D",dependency:"SHOT ground reference",target_dependent:true},{id:"battery",label:"battery logger",dependency:"isolated battery reference",independent:true}],shared_upstream:"SHOT ground reference",correct_conclusion:"the agreeing mills share a reference; the battery logger is independent",answerText:"Four agreeing mill channels are not independent because they share SHOT ground; the isolated battery logger breaks the pattern."}`

**Correct result:** `All four mills share SHOT ground; they are not independent.`

**Answer text:** The completed check shows all four mills share SHOT ground; they are not independent.

**Why:** common upstream hardware makes correlated readings less independent than their number suggests.

**Wrong-path feedback:** `Count upstream dependencies, not screen names; the battery logger is the independent channel.`

**State/output:** Record the result and unlock the next named stop.

## Stop 26 - Derive the Missing Branch Current

**Format/placement:** DERIVE, at `radar-desk`.

**Metadata:** Concept: junction rule; Keystone: K7; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** trace result must be checked against charge conservation.

**Question card story setup - exact player copy:** At Launch Control, four `2.0 mA` channel returns join a node, while the measured trunk current is `5.0 mA`. Derive the missing branch current and its direction.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Kirchhoff's junction rule exposes current on an undocumented path.

**Question card prompt - exact player copy:** Build three Kirchhoff-junction lines, name charge conservation and algebra where used, and submit the missing current in mA with its direction.

**Complete format-specific interaction block:** lines `ΣIin=ΣIout`(charge conservation), `8.0=5.0+Ix`(substitute), `Ix=3.0mA outward`(solve). Prompt submit mA/direction.

**Correct result:** `Missing current is 3.0 mA outward.` KCL conserves charge.

**Answer text:** The completed check shows missing current is 3.0 mA outward. KCL conserves charge.

**Why:** Kirchhoff's junction rule exposes current on an undocumented path.

**Wrong-path feedback:** `Sum all four 2.0 mA returns before subtracting the 5.0 mA trunk.`

**State/output:** unlock S3.

## Stop 27 - Isolate Reference C

**Format/placement:** CONTROL, at `radar-desk`.

**Metadata:** Concept: causal reference test; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4 reversal.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** shared topology suggests correlation, but controlled reversal must establish cause.

**Question card story setup - exact player copy:** Because `3.0 mA` leaves by an undocumented branch, switch only channel C to an isolated reference, then restore it. Keep field source, gain, clock, and sampling fixed.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** disappearance and return of the jump establishes that the reference path causes it.

**Question card prompt - exact player copy:** Change only channel C’s reference, keep field source, gain, clock, and sampling fixed, measure the jump before, during, and after isolation, restore the original reference, and submit one causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"reference_C",label:"channel C reference"},{id:"gain_C",label:"channel C gain"},{id:"clock_C",label:"channel C clock"}],correct_control:"reference_C",baseline:{jump:0.80,unit:"kV/m"},response:{setting:"isolated",jump:0.03,unit:"kV/m"},noise_band:{value:0.05,unit:"kV/m"},fixed:["field source","gain","clock","sampling"],measure_when:"after each setting settles",restore:{required:true,setting:"original reference",remeasure:true},correct_conclusion:"the shared reference causes the jump",answerText:"Only isolating channel C reference removes the jump beyond the noise band, and restoration returns it."}`

**Correct result:** `Isolation removes and restoration returns the jump.` That reversal establishes reference causation.

**Answer text:** The completed check shows isolation removes and restoration returns the jump. That reversal establishes reference causation.

**Why:** disappearance and return of the jump establishes that the reference path causes it.

**Wrong-path feedback:** `Change only reference C; changing gain or clock does not test the traced cause.`

**State/output:** unlock S4.

## Stop 28 - Quantify Common-Mode Error

**Format/placement:** BALLPARK, at `record-desk`.

**Metadata:** Concept: Ohm drop and Joule power; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the record desk, in Launch Control.

**Stop reason - exact player copy:** the report needs the size and heating cost of reference error.

**Question card story setup - exact player copy:** The reversal proves causation; now a `3.0 mA` transient crosses a `120 Ω` shared lead while true sensor output is `-4.2 V`. Estimate the recorded voltage and instantaneous lead power, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** a shared `IR` drop adds the same false shift to every referenced channel, while `I²R` reveals its heating scale.

**Question card prompt - exact player copy:** Using I=3.0 mA, R=120 Ω, and V_true=-4.2 V, assemble IR, V_true+IR, and I²R; submit voltage drop, recorded voltage, and lead power with units.

**Complete format-specific interaction block:** `estimate={labels:[I,R,Vtrue],values:[.003,120,-4.2],slots:[Vdrop,Vrecord,P],template:[IR,Vtrue+IR,I²R],formula:[.360,-3.840,.00108],correct:[.360,-3.840,.00108],target:[V,V,W],tolerance:[.005,.005,.00005]}`.

**Correct result:** `Vdrop=.360 V, Vrecord=-3.840 V, P=1.08 mW.` Ohm and Joule relations quantify common error.

**Answer text:** `Vdrop=(.003)(120)=.360 V`; `Vrecord=-4.2+.360=-3.840 V`; `P=(.003)²(120)=1.08 mW`.

**Why:** a shared `IR` drop adds the same false shift to every referenced channel, while `I²R` reveals its heating scale.

**Wrong-path feedback:** `Keep the true voltage sign and use I²R—not VI with the sensor voltage—for lead power.`

**State/output:** report piece7.

## Mission outcome

Mission decision: The mills share one ground reference. The battery logger is separate. Isolating channel C removes the jump. The archive now points to the buried loop.

### Post-mission metric screen - exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 20:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A shared reference removes four-channel agreement from the evidence.

**Automatic bar change:** REPORT CERTAINTY -8 | CREW CLEARANCE -4

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 53/98/66/95

**Lock result:** No bar locks.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- current, Kirchhoff, Ohm, power, common-mode error.
- ## Four graded stops
- **Mission takeaway:** Remove the four-mill agreement as independent evidence.

---

# Mission 8 - A Field Without Contact

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 8 DAYS; **Go now:** Mast Base, Marcus Tate at shunt rack.  
**Card title:** A Field Without Contact  
**Card body:** The mill jump came through a wire, so the trailer failure may also have followed a path no strike touched. Current creates magnetic field, and magnetic field pushes moving charge without doing work on it. You will derive the mast field, test force directions, and inspect the trailer loop. By the end of the mission, decide whether no-contact coupling is physically plausible.  
**Objective:** Determine whether strike current can influence the trailer cable without direct contact.  
### Worth knowing first - exact player copy

#### Glossary terms

Magnetic field: field that deflects moving charge and currents.
Right-hand rule: hand convention for cross-product direction.
Helical motion: circular perpendicular motion plus unchanged parallel motion.  
#### Primer concepts

Magnetic force is perpendicular and changes direction, not speed; same-direction parallel currents attract; `μ₀=4π×10^-7 T·m/A`.  
#### Equations first needed today
**Equation:** `F=qv×B`, `F=IL×B`

**What it is for:** force

**Symbols:** F, qv, B, IL are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** assess cable.

**Equation:** `∮B·dl=μ₀I`

**What it is for:** symmetric fields

**Symbols:** B, dl, μ, I are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** mast current.## Main story happening - designer summary
MAST field result predicts a measurable loop effect, causing travel to COUPLE. S4 finds no arc but opposite-polarity upset.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `shunt-rack` | automatic**

**World state:** accepted MAST/bubble/shunts pulse/``→S1; S2 correct/waypoint/field rings extend/`Predicted B at 2.0 m: 3.00 mT; Inspect the outstation route.`→COUPLE; enter COUPLE/panel/no arc tag/`SHELL QUIET • CARD DAMAGED`→S3; S3 correct/panel/helix displayed/`MAGNETIC FORCE CHANGES DIRECTION, NOT SPEED`→S4; S4 correct/radio/loop highlighted/`No contact required; changing flux remains.`→outcome.

**Panel/HUD text:** Marcus Tate, mast engineer: “If a field reached the route, its direction must match the wiring.”

**Dialogue bubbles -** Mission lead: "If a field reached the route, its direction must match the wiring."

**Unlocks/waypoint:** Unlock Stop 29 at `shunt-rack` in Mast Base.

**Beat 2 - After Stop 29 | `mast-desk` | automatic**

**World state:** The match magnetic rules result remains visible while the derive the down-conductor field fixture lights.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 29 result to settle derive the down-conductor field."

**Unlocks/waypoint:** Unlock Stop 30 at `mast-desk` in Mast Base.

**Beat 3 - After Stop 30 | `cable-bay` | automatic**

**World state:** The derive the down-conductor field result remains visible while the track a charged particle fixture lights.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 30 result to settle track a charged particle."

**Unlocks/waypoint:** Unlock Stop 31 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 31 | `trailer-cards` | automatic**

**World state:** The track a charged particle result remains visible while the diagnose noncontact damage fixture lights.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 31 result to settle diagnose noncontact damage."

**Unlocks/waypoint:** Unlock Stop 32 at `trailer-cards` in Remote Outstation.

**Beat 5 - At mission end | `shunt-rack` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

MAST→COUPLE because only the trailer has the geometry and damage. 

## Characters and dramatic beat

Tate follows a path rather than defending drawings. 

## Key concepts, explained here

Lorentz force, helix, source fields, Ampere symmetry, no magnetic work.  

## Four graded stops
## Stop 29 - Match Magnetic Rules

**Format/placement:** PROTOCOL, at `shunt-rack`.

**Metadata:** Concept: right-hand rule/force and source patterns; Keystone: K8,K9; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L2.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** cable orientation determines which conductors are pushed.

**Question card story setup - exact player copy:** The down-conductor current points downward, and nearby wire segments run north, east, and vertical. Match force directions, then match straight wire, loop, solenoid, and toroid to their field patterns.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** right-hand rules connect current geometry to both magnetic field and mechanical stress.

**Question card prompt - exact player copy:** Match all three wire orientations to force direction or zero, then match straight wire, loop, solenoid, and toroid to their field formula and direction; submit all seven mappings.

**Complete format-specific interaction block:** scenarios include three force rows plus `[straight,loop_center,solenoid,toroid]`; choices include direction/zero and formulas `[μ0I/(2πr),μ0I/(2R),μ0nI,μ0NI/(2πr)]`; keyed mapping, vertical-parallel force zero. Prompt submit all seven matches.

**Correct result:** `Right-hand mappings and four source formulas are complete.` Geometry fixes directions.

**Answer text:** The completed check shows right-hand mappings and four source formulas are complete. Geometry fixes directions.

**Why:** right-hand rules connect current geometry to both magnetic field and mechanical stress.

**Wrong-path feedback:** `Use current direction in IL×B and curl fingers around the source; do not swap force and field.`

**State/output:** unlock S2.

## Stop 30 - Derive the Down-Conductor Field

**Format/placement:** DERIVE, at `mast-desk`.

**Metadata:** Concept: Ampere long wire; Keystone: K8,K2; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the mast desk, in Mast Base.

**Stop reason - exact player copy:** the trailer hypothesis needs field versus distance.

**Question card story setup - exact player copy:** Treat the mast down-conductor as a long straight wire carrying peak current `I=30 kA`. Derive magnetic field `B(r)` with a circular Amperian path, then evaluate it at `r=2.0 m`.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Ampere's law converts current symmetry into the field that can thread a nearby loop.

**Question card prompt - exact player copy:** Build four Ampere-law lines for a 30 kA long wire, name each symmetry and algebra step, and submit B at 2.0 m in mT.

**Complete format-specific interaction block:** lines `∮Bdl=μ0I`, `B(2πr)=μ0I`, `B=μ0I/(2πr)`, substitution→`3.0mT`. Tolerance .05 mT. State waypoint COUPLE.

**Correct result:** `B=μ₀I/(2πr)=3.00 mT.` Circular symmetry makes B constant on the path.

**Answer text:** The completed check shows b=μ₀I/(2πr)=3.00 mT. Circular symmetry makes B constant on the path.

**Why:** Ampere's law converts current symmetry into the field that can thread a nearby loop.

**Wrong-path feedback:** `The path length is 2πr, not r, and 30 kA is 3.0×10^4 A.`

**State/output:** Record the result and unlock the next named stop.

## Stop 31 - Track a Charged Particle

**Format/placement:** BALLPARK, at `cable-bay`.

**Metadata:** Concept: particle motion/mass spectrometer; Keystone: K9,K8; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** separate magnetic deflection from energy deposition.

**Question card story setup - exact player copy:** At the outstation, an electron enters `B=3.0 mT` with perpendicular speed `2.0×10^6 m/s` and parallel speed `1.0×10^6 m/s`. Estimate its helical radius, period, and pitch, then record the physical justification.

**Question card story-science connection - exact player copy:** a magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.

**Question card prompt - exact player copy:** Using the displayed electron constants, assemble r=mv⊥/(|q|B), T=2πm/(|q|B), and pitch=v∥T; submit mm, ns, mm, and whether kinetic energy changes.

**Complete format-specific interaction block:** labels `[m=9.11e-31kg,vperp=2e6,vparallel=1e6,q=1.602e-19C,B=.003T]`, formulas `[r=mvperp/(qB),T=2πm/(qB),pitch=vparallel*T]`, targets `[.00379m,1.191e-8s,.01191m]`, tolerance 10%. Prompt submit radius in mm, period in ns, pitch in mm, and select “kinetic energy unchanged.” Answer `3.79 mm,11.9 ns,11.9 mm`; `ω=qB/m`.

**Correct result:** `r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.`

**Answer text:** The completed check shows r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.

**Why:** a magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.

**Wrong-path feedback:** `Use v⊥ for radius, v∥ for pitch, and remember magnetic force does no work.`

**State/output:** unlock S4.

## Stop 32 - Diagnose Noncontact Damage

**Format/placement:** DIAGNOSIS, at `trailer-cards`.

**Metadata:** Concept: field/loop hazard; Keystone: K8,K9,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the diagnostic card rack, in Remote Outstation.

**Stop reason - exact player copy:** evidence must distinguish force, induction, and direct arc.

**Question card story setup - exact player copy:** The field is strong enough to reach the trailer route, but magnetic force alone does no work. Diagnose the mechanism consistent with no shell arc, cable-card damage, and opposite-polarity voltage.

**Question card story-science connection - exact player copy:** the pattern points toward changing magnetic flux and induced electric field, not static magnetic work.

**Question card prompt - exact player copy:** Read tip, shell, card, and cabinet zones, select the one mechanism that fits all four, and submit one diagnosis.

**Complete format-specific interaction block:** readings ≥3 plus quiet shell; choices `[direct_arc,static_B_work,changing_flux_induction]`; answer induction.

**Correct result:** `Changing-flux induction fits all four zones.`

**Answer text:** The completed check shows changing-flux induction fits all four zones.

**Why:** the pattern points toward changing magnetic flux and induced electric field, not static magnetic work.

**Wrong-path feedback:** `Static B can deflect charge but cannot supply the card’s electrical energy.`

**State/output:** report piece8.

## Mission outcome

Mission decision: No-contact coupling is physically plausible. A `30 kA` mast current makes about `3.0 mT` at the nearby route. And the damage pattern points to changing flux rather than direct contact. The trailer loop geometry must now predict the voltage sign. And size.

### Post-mission metric screen - exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 21:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The direct-arc search ends and the mast route is marked.

**Automatic bar change:** STATION INTEGRITY +3

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 57/100/69/100; excess RP banked

**Lock result:** Crew Clearance and Station Integrity remain vulnerable until Mission 15.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- Lorentz force, helix, source fields, Ampere symmetry, no magnetic work.
- ## Four graded stops
- **Mission takeaway:** No-contact coupling is physically plausible.

---

# Mission 9 - The Buried Loop

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 7 DAYS; **Go now:** Earthing Compound, Marcus Tate at earth trench.  
**Card title:** The Buried Loop  
**Card body:** Magnetic field reaches the cable route, but only changing flux can drive the opposite-polarity trailer pulse. Magnetic flux measures field through a loop, and Faraday's law connects its change to induced voltage. You will derive the pulse, use Lenz's law, and test trench geometry at the trailer. By the end of the mission, decide whether the buried loop predicts the failed card.  
**Objective:** Predict the induced pulse from measured geometry and current rise.  
### Worth knowing first - exact player copy

#### Glossary terms

Magnetic flux: magnetic field passing through a surface.
Induced emf: voltage created by changing magnetic flux. Lenz's law: induced current opposes the flux change.  
#### Primer concepts

Flux uses the perpendicular field component; changing B, area, or angle induces emf; sign encodes opposition.  
#### Equations first needed today
**Equation:** `Φ_B=∫B·dA`, `ε=-dΦ_B/dt`

**What it is for:** induction

**Symbols:** Φ_B, B, dA, ε, d, dt are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** trailer.

**Equation:** `ε=BLv`

**What it is for:** motional emf

**Symbols:** ε, BLv are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** distinguish moving-wire tests.## Main story happening - designer summary
EARTH geometry yields predicted pulse and polarity; waypoint to COUPLE because damaged card carries stored waveform. S4 confirms magnitude within uncertainty but causes trench exposure cost.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Earthing Trench | `loop-bench` | automatic**

**World state:** accepted EARTH/bubble/trench open/``→S1; S2 correct/waypoint/polarity arrow locked/`PREDICTION: NEGATIVE DURING CURRENT RISE; TAKE IT TO OUTSTATION.`→travel; enter COUPLE/panel/archive locked/`Commit magnitude before archive unlock.`→S3; S3 correct/panel/archive reveals -1.06 kV/`PREDICTED -1.10 kV • MEASURED -1.06 kV`→S4; S4 correct/world/second lead appears in trench photo/`Model passes; current path remains incomplete.`→outcome.

**Panel/HUD text:** Marcus Tate, mast engineer: “Draw the loop we built, not the cable we meant to build.”

**Dialogue bubbles -** Mission lead: "Draw the loop we built, not the cable we meant to build."

**Unlocks/waypoint:** Unlock Stop 33 at `loop-bench` in Earthing Trench.

**Beat 2 - After Stop 33 | `loop-bench` | automatic**

**World state:** The derive the buried-loop emf result remains visible while the match induction sources fixture lights.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 33 result to settle match induction sources."

**Unlocks/waypoint:** Unlock Stop 34 at `loop-bench` in Earthing Trench.

**Beat 3 - After Stop 34 | `cable-bay` | automatic**

**World state:** The match induction sources result remains visible while the calculate the archived emf fixture lights.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 34 result to settle calculate the archived emf."

**Unlocks/waypoint:** Unlock Stop 35 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 35 | `cable-bay` | automatic**

**World state:** The calculate the archived emf result remains visible while the verify the loop model fixture lights.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 35 result to settle verify the loop model."

**Unlocks/waypoint:** Unlock Stop 36 at `cable-bay` in Remote Outstation.

**Beat 5 - At mission end | `loop-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

EARTH→COUPLE; geometry precedes the locked archived trace. 

## Characters and dramatic beat

Tate supplies construction truth; Noor enforces precommitment. 

## Key concepts, explained here

 flux integral, Faraday, Lenz, motion/rotation emf, uncertainty.  

## Four graded stops
## Stop 33 - Derive the Buried-Loop EMF

**Format/placement:** DERIVE, at `loop-bench`.

**Metadata:** Concept: Faraday rectangular loop near wire; Keystone: K8,K10; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the buried-loop bench, in Earthing Trench.

**Stop reason - exact player copy:** the trench path must predict voltage before record is opened.

**Question card story setup - exact player copy:** The buried cable and return form a rectangle of length `ℓ`, spanning radii `a` to `b` from the mast. Derive induced emf from changing mast current before seeing the trailer trace.

**Question card story-science connection - exact player copy:** integrating nonuniform `B(r)` prevents a false uniform-field estimate.

**Question card prompt - exact player copy:** Build the three-line flux and Faraday derivation for the rectangular loop, name Ampere, integration, and Faraday-Lenz rules, and submit the symbolic emf.

**Complete format-specific interaction block:** lines `B=μ0I/(2πr)`, `Φ=∫a^b Bℓdr=μ0Iℓ/(2π)ln(b/a)`, `ε=-μ0ℓ/(2π)ln(b/a)dI/dt`. Prompt derive/rules.

**Correct result:** `ε=-(μ₀ℓ/2π)ln(b/a)dI/dt.` Integrate the `1/r` field over loop width.

**Answer text:** The completed check shows ε=-(μ₀ℓ/2π)ln(b/a)dI/dt. Integrate the 1/r field over loop width.

**Why:** integrating nonuniform `B(r)` prevents a false uniform-field estimate.

**Wrong-path feedback:** `B is not uniform across a=2 m to b=5 m; integrate dr/r.`

**State/output:** unlock S2.

## Stop 34 - Match Induction Sources

**Format/placement:** PROTOCOL, at `loop-bench`.

**Metadata:** Concept: Lenz direction and emf sources; Keystone: K10; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L2.

**Call - exact player copy:** Go to the buried-loop bench, in Earthing Trench.

**Stop reason - exact player copy:** polarity is the strongest archived clue.

**Question card story setup - exact player copy:** With the symbolic pulse fixed, match rising, steady, and falling mast current to loop polarity. Then match sliding rod, changing field, and rotating coil to their specific Faraday expressions.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Question card prompt - exact player copy:** Match rising, steady, and falling current to polarity; match sliding rod, changing uniform field, and rotating loop to BLv, -A dB/dt, and NABωsin(ωt); submit all six matches.

**Complete format-specific interaction block:** scenarios `[rising,steady,falling,sliding_rod,changing_uniform_B,rotating_N_loop]`; choices include `[negative/clockwise,zero,positive/counterclockwise,BLv,-A dB/dt,NABωsinωt]`; keyed mapping. Prompt submit all six matches. State waypoint.

**Correct result:** `Rising opposes, steady gives zero, falling reverses; BLv, -A dB/dt, and rotating-loop form match.`

**Answer text:** The completed check shows rising opposes, steady gives zero, falling reverses; BLv, -A dB/dt, and rotating-loop form match.

**Why:** Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Wrong-path feedback:** `Lenz opposes the change in flux, not the existing field.`

**State/output:** Record the result and unlock the next named stop.

## Stop 35 - Calculate the Archived EMF

**Format/placement:** DERIVE, at `cable-bay`.

**Metadata:** Concept: numerical induction; Keystone: K10,K8; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** archived trace can be opened only after prediction is frozen.

**Question card story setup - exact player copy:** Take the derived model to the outstation with loop dimensions `ell=20 m`, `a=2.0 m`, `b=5.0 m`, and current rise `dI/dt=3.0×10^8 A/s`. Calculate the predicted emf and record its physical justification.

**Question card story-science connection - exact player copy:** a precomputed magnitude and sign make the archived waveform a real test.

**Question card prompt - exact player copy:** Using μ₀=4π×10^-7 T·m/A and the displayed ℓ, a, b, and dI/dt, build the substitution and submit predicted emf in kV with sign.

**Complete format-specific interaction block:** substitution in formula with `μ0`; result magnitude `1099.8 V≈1.10kV`, negative during rise. Prompt lines/rules, submit kV/sign; tolerance .03kV. State trace reveals -1.06kV.

**Correct result:** `Prediction is -1.10 kV.` Visible substitution reproduces it.

**Answer text:** The completed check shows prediction is -1.10 kV. Visible substitution reproduces it.

**Why:** a precomputed magnitude and sign make the archived waveform a real test.

**Wrong-path feedback:** `Use ln(5/2), SI units, and the displayed loop orientation for sign.`

**State/output:** Record the result and unlock the next named stop.

## Stop 36 - Verify the Loop Model

**Format/placement:** VERIFY, at `cable-bay`.

**Metadata:** Concept: prediction test; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 decision.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** prediction must survive measured pulse and geometry uncertainty.

**Question card story setup - exact player copy:** Because the prediction is `-1.10 kV`, compare it with the archived `-1.06 kV` peak while varying `a` by `±0.10 m`. Decide whether one loop model explains both.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** prediction before reveal protects the test from after-the-fact tuning.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock -1.10 kV. OPERATE: Vary only a from 1.90 to 2.10 m while ℓ, b, and dI/dt stay fixed. MEASURE: Record the predicted range and archived peak. INTERPRET: Submit consistent or inconsistent; no restoration is required.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{source:"Stop 35 loop model",submit:{quantity:"induced voltage",unit:"kV",truth:-1.10,tolerance:0.03}},equipment_locked_until_prediction_commit:true,operation:{control:"loop dimension a",range:[1.90,2.10],unit:"m",fixed:["ell","b","dI/dt"]},measurements:{predicted_range:[-1.13,-1.07],archived_peak:-1.10,unit:"kV"},restore:{required:false,reason:"uncertainty sweep changes no equipment setting"},correct_conclusion:"consistent",answerText:"The archived -1.10 kV peak lies inside the predicted uncertainty range, so the loop model is consistent."}`

**Correct result:** `Archived -1.06 kV lies inside the predicted geometry band.`

**Answer text:** The completed check shows archived -1.06 kV lies inside the predicted geometry band.

**Why:** prediction before reveal protects the test from after-the-fact tuning.

**Wrong-path feedback:** `Do not retune ℓ, b, or dI/dt after reveal; only the stated a uncertainty moves.`

**State/output:** report piece9.

## Mission outcome

Mission decision: The buried loop predicts the failed card. Its pulse is near -1.10 kV, close to the archived -1.06 kV peak. The trench reveals another bonded lead. The current path is still incomplete.

### Post-mission metric screen - exact player copy

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 23:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The trench opening finds evidence but exposes a vulnerable joint.

**Automatic bar change:** REPORT CERTAINTY +4 | STATION INTEGRITY -3

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 65/100/73/100

**Lock result:** No new lock.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- flux integral, Faraday, Lenz, motion/rotation emf, uncertainty.
- ## Four graded stops
- **Mission takeaway:** The buried loop predicts the failed card.

---

# Mission 10 - A Good Bond at the Wrong Speed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 6 DAYS; **Go now:** Impulse Hall, Elise Strand at gap row.  
**Card title:** A Good Bond at the Wrong Speed  
**Card body:** The loop model matches the trailer pulse, and the trench exposes a bond certified at low frequency. A changing current creates self-induced voltage, so a low-resistance lead can still oppose a fast pulse. You will derive inductance, compare pulse fronts, and carry a prediction to the trench. By the end of the mission, decide whether the bonding lead is safe for lightning timescales.  
**Objective:** Predict the bond's transient voltage and judge its certificate.  
### Worth knowing first - exact player copy

#### Glossary terms

Inductance: flux linkage per current and opposition to current change.
Transient: brief change before a circuit settles.
Time constant: characteristic response time.  
#### Primer concepts

Inductor voltage scales with `dI/dt`; resistance tests do not measure all transient impedance; magnetic energy is `½LI²`.  
#### Equations first needed today
**Equation:** `ε_L=-L dI/dt`, `U_B=½LI²`

**What it is for:** self-induced voltage/energy

**Symbols:** `L` H

**Why this campaign needs it:** bond.

**Equation:** `B=μ₀nI`, `L=μ₀N²A/ℓ`

**What it is for:** solenoid field/inductance

**Symbols:** B, μ, nI, L, N, A are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** derive path model.## Main story happening - designer summary
BANK S1-S2 establishes pulse; travel EARTH because only trench has lead length/loop; S3-S4 reject certificate for fast use. Two locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `hall-board` | automatic**

**World state:** accepted BANK/bubble/stage7 amber text/``→S1; S2 correct/waypoint/acceptable delay tag/`DELAY ≤ 50 ns; TAKE dI/dt TO TRENCH`→EARTH; enter EARTH/panel/certificate visible/`APRIL: 0.42 Ω DC`→S3; S4 correct/world/certificate relabeled/`VALID FOR STEADY CURRENT ONLY`→outcome; outcome/radio/conduit bond pulses/`A second path must be measured.`→M11.

**Panel/HUD text:** Elise Strand, impulse engineer: “Same energy, different front. Watch the derivative.”

**Dialogue bubbles -** Mission lead: "Same energy, different front. Watch the derivative."

**Unlocks/waypoint:** Unlock Stop 37 at `hall-board` in Impulse Hall.

**Beat 2 - After Stop 37 | `gap-row` | automatic**

**World state:** The derive inductance result remains visible while the sweep stage-7 delay fixture lights.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 37 result to settle sweep stage-7 delay."

**Unlocks/waypoint:** Unlock Stop 38 at `gap-row` in Impulse Hall.

**Beat 3 - After Stop 38 | `conduit-bond` | automatic**

**World state:** The sweep stage-7 delay result remains visible while the derive bond voltage fixture lights.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 38 result to settle derive bond voltage."

**Unlocks/waypoint:** Unlock Stop 39 at `conduit-bond` in Earthing Trench.

**Beat 4 - After Stop 39 | `earth-cert` | automatic**

**World state:** The derive bond voltage result remains visible while the scope the april certificate fixture lights.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 39 result to settle scope the april certificate."

**Unlocks/waypoint:** Unlock Stop 40 at `earth-cert` in Earthing Trench.

**Beat 5 - At mission end | `hall-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

BANK→EARTH because source waveform and receiving lead are separate. 

## Characters and dramatic beat

Strand admits stage timing; Tate accepts certificate limits. 

## Key concepts, explained here

 solenoid L, self-emf, magnetic energy, transient impedance.  

## Four graded stops
## Stop 37 - Derive Inductance

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: solenoid inductance; Keystone: K8,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** the lead model needs a defensible inductance relation.

**Question card story setup - exact player copy:** Model a wound calibration coil with `N` turns, length `ℓ`, and area `A`. Derive its inductance from Ampere's field and flux linkage before testing the bond pulse.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** the derivation shows how geometry controls opposition to changing current.

**Question card prompt - exact player copy:** Build four lines from Ampere’s solenoid field through total flux linkage, name each rule, and submit L=μ₀N²A/ℓ.

**Complete format-specific interaction block:** lines `B=μ0NI/ℓ`(Ampere), `Φ=BA`(flux), `NΦ=LI`(definition), `L=μ0N²A/ℓ`; exact.

**Correct result:** `L=μ₀N²A/ℓ.` Ampere field plus N flux linkages gives the result.

**Answer text:** The completed check shows l=μ₀N²A/ℓ. Ampere field plus N flux linkages gives the result.

**Why:** the derivation shows how geometry controls opposition to changing current.

**Wrong-path feedback:** `Flux linkage is NΦ; omitting that N loses the square.`

**State/output:** unlock S2.

## Stop 38 - Sweep Stage-7 Delay

**Format/placement:** SWEEP, at `gap-row`.

**Metadata:** Concept: dI/dt; Keystone: K11,K6; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the spark-gap row, in Impulse Hall.

**Stop reason - exact player copy:** stage 7 lateness changes the derivative that drives bond voltage.

**Question card story setup - exact player copy:** With the inductance relation established, sweep stage-7 delay from `0` to `200 ns` while energy stays `1.50 kJ`. Record peak `dI/dt` and pulse ringing.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** equal stored energy can create unequal inductive hazard because waveform shape matters.

**Question card prompt - exact player copy:** Sweep only stage-7 delay from 0 to 200 ns while energy remains 1.50 kJ, record dI/dt and ringing at inspected delays, and submit the inclusive acceptable delay bound.

**Complete format-specific interaction block:** delay `[0,50,100,150,200]ns`, dIdt `[3.0,2.8,2.4,2.0,1.7]e8A/s`, ringing `[5,8,14,22,31]%`; correct acceptable delay≤50ns. Prompt inspect/submit bound. State waypoint EARTH.

**Correct result:** `Delay must be ≤50 ns.` Greater delay lowers derivative but raises ringing beyond the joint rule.

**Answer text:** The completed check shows delay must be ≤50 ns. Greater delay lowers derivative but raises ringing beyond the joint rule.

**Why:** equal stored energy can create unequal inductive hazard because waveform shape matters.

**Wrong-path feedback:** `Energy stays fixed; judge both dI/dt and ringing at inspected settings.`

**State/output:** Record the result and unlock the next named stop.

## Stop 39 - Derive Bond Voltage

**Format/placement:** DERIVE, at `conduit-bond`.

**Metadata:** Concept: bond voltage; Keystone: K11,K7; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the bonded conduit, in Earthing Trench.

**Stop reason - exact player copy:** the certificate's `0.42 Ω` must be compared with transient voltage.

**Question card story setup - exact player copy:** At the trench, the bond has `L=2.0 microH`, `R=0.42 ohm`, current `I=10 kA`, and `dI/dt=3.0×10^8 A/s`. Derive the resistive and inductive voltage terms, then justify their physical meanings.

**Question card story-science connection - exact player copy:** the larger term identifies what the slow certificate failed to test.

**Question card prompt - exact player copy:** Using L=2.0 μH, R=0.42 Ω, I=10 kA, and dI/dt=3.0×10^8 A/s, build both voltage calculations and submit V_R and |V_L| in kV.

**Complete format-specific interaction block:** lines `VR=IR=4.2kV`; `VL=LdI/dt=600V`; total magnitude bound `4.8kV` with polarity diagram. Prompt submit both/units; tolerances 0.1kV,10V.

**Correct result:** `VR=4.2 kV; VL=0.600 kV.` Resistance and inductance are separate voltage terms.

**Answer text:** The completed check shows vR=4.2 kV; VL=0.600 kV. Resistance and inductance are separate voltage terms.

**Why:** the larger term identifies what the slow certificate failed to test.

**Wrong-path feedback:** `Convert μH before multiplying and do not replace dI/dt with I.`

**State/output:** unlock S4.

## Stop 40 - Scope the April Certificate

**Format/placement:** DIAGNOSIS, at `earth-cert`.

**Metadata:** Concept: DC vs transient safety; Keystone: K7,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the earth certificate board, in Earthing Trench.

**Stop reason - exact player copy:** decide what the April certificate actually proves.

**Question card story setup - exact player copy:** Now the same lead produces `4.2 kV` resistive and `0.60 kV` inductive drop during the pulse. Diagnose which statement the `0.42 Ω` certificate can honestly support.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** a measurement is valid only for the quantity and timescale it tested.

**Question card prompt - exact player copy:** Read all four certificate zones, select the one scope statement they jointly support, and submit safe at all times, safe for DC only, or inductance only.

**Complete format-specific interaction block:** readings `[dc_R normal,pulse_L untested,stage_delay alarm,physical_bond intact]`; choices `[safe_all_times,safe_dc_only,inductance_only]`; answer safe_dc_only.

**Correct result:** `The 0.42 Ω certificate supports steady-current resistance only.`

**Answer text:** The completed check shows the 0.42 Ω certificate supports steady-current resistance only.

**Why:** a measurement is valid only for the quantity and timescale it tested.

**Wrong-path feedback:** `An intact bond and true DC value do not certify a microsecond waveform.`

**State/output:** report piece10.

## Mission outcome

Mission decision: Do not certify the bond lead for lightning. Its low-rate test is sound. A fast pulse adds voltage from the lead itself. Gap timing changes that voltage. Next, measure every current path.

### Post-mission metric screen - exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 22:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** One pulse test uses supplies while improving the crew rule.

**Automatic bar change:** CREW CLEARANCE +2 | SHOT RESERVE -2

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 69/100/79/100

**Lock result:** No new lock.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- solenoid L, self-emf, magnetic energy, transient impedance.
- ## Four graded stops
- **Mission takeaway:** The bonding lead is not certified for lightning timescales.

---

# Mission 11 - The Missing Third

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 5 DAYS; **Go now:** Mast Base, Marcus Tate at shunt rack.  
**Card title:** The Missing Third  
**Card body:** The bond certificate cannot clear a fast strike, and the mast clamp records more current than three down-conductor shunts. Current must be conserved, even when drawings omit a branch. You will close the current ledger, derive nearby magnetic fields, inspect the trench bond, and audit the launch record. By the end of the mission, decide where the missing strike current flowed.  
**Objective:** Identify and quantify every current path.  
### Worth knowing first - exact player copy

#### Glossary terms

Current density: current per cross-sectional area.
Toroid: ring-shaped winding whose field is mainly inside.
Displacement current: changing electric flux term in Ampere-Maxwell law.  
#### Primer concepts

Node currents conserve charge; `J=I/A`; current paths create magnetic fields and forces.  
#### Equations first needed today
**Equation:** `J=I/A`

**What it is for:** heating/current concentration

**Symbols:** J, I, A are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** conduit.

**Equation:** `∮B·dl=μ₀(I+ε₀dΦ_E/dt)`

**What it is for:** Ampere-Maxwell

**Symbols:** B, dl, μ, I, ε, d, Φ_E, dt are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** distinguish conduction from changing-field contribution.## Main story happening - designer summary
MAST ledger points to conduit; EARTH inspection confirms both-end bond; SHOT timestamp audit rejects calibration error. Three locations causally linked.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `shunt-rack` | automatic**

**World state:** accepted MAST/bubble/clamp and shunts side-by-side/``→S1; S2 correct/waypoint/conduit label `10 kA PREDICTED`/`Inspect its earth bond.`→EARTH; S3 correct/waypoint/test link restored/`ISOLATION REMOVES MISSING CURRENT; TAKE RESULT TO RECORDS.`→SHOT; S4 correct/panel/week-five records aligned/`ONE THIRD VIA CONDUIT`→outcome; outcome/world/conduit locked/tagged/`UNSAFE PATH ISOLATED`→metric.

**Panel/HUD text:** Marcus Tate, mast engineer: “Thirty entered. Twenty is named. Find the path.”

**Dialogue bubbles -** Mission lead: "Thirty entered. Twenty is named. Find the path."

**Unlocks/waypoint:** Unlock Stop 41 at `shunt-rack` in Mast Base.

**Beat 2 - After Stop 41 | `cable-bay` | automatic**

**World state:** The close the strike-current ledger result remains visible while the derive field and wire force fixture lights.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 41 result to settle derive field and wire force."

**Unlocks/waypoint:** Unlock Stop 42 at `cable-bay` in Remote Outstation.

**Beat 3 - After Stop 42 | `conduit-bond` | automatic**

**World state:** The derive field and wire force result remains visible while the isolate conduit current fixture lights.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 42 result to settle isolate conduit current."

**Unlocks/waypoint:** Unlock Stop 43 at `conduit-bond` in Earthing Trench.

**Beat 4 - After Stop 43 | `record-desk` | automatic**

**World state:** The isolate conduit current result remains visible while the verify the historical path fixture lights.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 43 result to settle verify the historical path."

**Unlocks/waypoint:** Unlock Stop 44 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `shunt-rack` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

MAST→EARTH→SHOT, each unlocked by field, causal isolation, then historical identity. 

## Characters and dramatic beat

Tate changes from drawing trust to measured-path ownership; Ortiz closes path. 

## Key concepts, explained here

KCL, current density, Ampere, force between wires, attestation.  

## Four graded stops
## Stop 41 - Close the Strike-Current Ledger

**Format/placement:** BALANCE, at `shunt-rack`.

**Metadata:** Concept: current ledger; Keystone: K7; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L4.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** clamp total must equal named branches.

**Question card story setup - exact player copy:** The base clamp reads `30 kA`, while three down-conductor shunts total only `20 kA`. Decide which readings count, close the ledger, and compute the missing current.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** charge conservation makes an unmeasured branch a physical requirement, not optional speculation.

**Question card prompt - exact player copy:** Choose which identified streams count once, close the 30 kA current ledger, and submit the missing branch current in kA.

**Complete format-specific interaction block:** `balance:{streams:[{id:"clamp_total",direction:"in",value:30,unit:"kA",counts:true},{id:"shunt_1",direction:"out",value:8,unit:"kA",counts:true},{id:"shunt_2",direction:"out",value:7,unit:"kA",counts:true},{id:"shunt_3",direction:"out",value:5,unit:"kA",counts:true},{id:"duplicate_display",direction:"none",value:30,unit:"kA",counts:false,reason:"duplicate display of the clamp"}],equation:"missing=clamp-sum(shunts)",correct:10,tolerance:0.5,answerText:"Ten kiloamperes require an unmeasured path; the duplicate clamp display is not another current stream."}`

**Correct result:** `The unlisted branch carries 10 kA.` A closed ledger enforces current conservation.

**Answer text:** The completed check shows the unlisted branch carries 10 kA. A closed ledger enforces current conservation.

**Why:** charge conservation makes an unmeasured branch a physical requirement, not optional speculation.

**Wrong-path feedback:** `Do not count the duplicate display as a second physical stream.`

**State/output:** Record the result and unlock the next named stop.

## Stop 42 - Derive Field and Wire Force

**Format/placement:** DERIVE, at `cable-bay`.

**Metadata:** Concept: coax/toroid Ampere field and force; Keystone: K8,K9,K7; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** the `10 kA` branch must predict a measurable field.

**Question card story setup - exact player copy:** Treat the bonded conduit as a straight branch carrying `10 kA`; the cabinet is `2.0 m` away. Derive `B`, then derive force per length against a parallel `5.0 kA` lead `0.20 m` away, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** field and force provide independent evidence for the hidden path.

**Question card prompt - exact player copy:** Build the long-wire field and parallel-wire-force derivations, name each rule, and submit B in mT, F/L in N/m, and attract or repel.

**Complete format-specific interaction block:** lines `B=μ0I/2πr=1.0mT`; `F/L=I2B1=μ0I1I2/(2πd)=50N/m`; same currents attract. Tolerances. State waypoint EARTH.

**Correct result:** `B=1.00 mT; F/L=50 N/m; same-direction currents attract.`

**Answer text:** The completed check shows b=1.00 mT; F/L=50 N/m; same-direction currents attract.

**Why:** field and force provide independent evidence for the hidden path.

**Wrong-path feedback:** `Use 2.0 m for cabinet B and 0.20 m for wire-force separation.`

**State/output:** Record the result and unlock the next named stop.

## Stop 43 - Isolate Conduit Current

**Format/placement:** CONTROL, at `conduit-bond`.

**Metadata:** Concept: bond causality; Keystone: K7,K8,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4.

**Call - exact player copy:** Go to the bonded conduit, in Earthing Trench.

**Stop reason - exact player copy:** drawings show a bond, but only isolation proves current uses it.

**Question card story setup - exact player copy:** Because the field predicts `10 kA`, open only the approved test link, keep bank pulse, shunts, and geometry fixed, then restore the link. Measure clamp-minus-shunt current each time.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** loss and return of the missing current ties it to the conduit branch.

**Question card prompt - exact player copy:** Change only the approved conduit link from closed to open while pulse, shunts, and geometry stay fixed. Measure clamp-minus-shunt current after the link settles, restore closed and remeasure, then submit the numerical comparison and causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"test_link",label:"approved conduit link"},{id:"stage_voltage",label:"stage voltage"},{id:"shunt_gain",label:"shunt gain"}],correct_control:"test_link",baseline:{state:"closed",difference_current:10,unit:"kA"},response:{state:"open",difference_current:0.3,unit:"kA"},noise_band:{value:0.5,unit:"kA"},fixed:["pulse","shunts","geometry"],measure_when:"after each link state settles",restore:{required:true,state:"closed",remeasure:true},correct_conclusion:"the conduit carried the missing current",answerText:"Opening only the conduit link removes the clamp-minus-shunt current beyond noise; restoration brings it back."}`

**Correct result:** `Open removes the 10 kA difference; restore returns it.`

**Answer text:** The completed check shows open removes the 10 kA difference; restore returns it.

**Why:** loss and return of the missing current ties it to the conduit branch.

**Wrong-path feedback:** `Operate only the approved link and complete the restoration measurement before concluding.`

**State/output:** Record the result and unlock the next named stop.

## Stop 44 - Verify the Historical Path

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `record-desk`.

**Metadata:** Concept: timestamps/current identity; Keystone: K12,K7; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the record desk in Launch Control.

**Stop reason - exact player copy:** Ortiz needs proof the branch existed on week five, not only today.

**Question card story setup - exact player copy:** The controlled link proves today's path; now verify week-five shunt identity, clock alignment, conduit bond record, and clamp calibration within four checks. Decide whether the historical current split is defensible.

**Question card story-science connection - exact player copy:** matched identity and timing transfer the causal result to the failed shot.

**Question card prompt - exact player copy:** Use no more than four checks to verify week-five identity, timing, bond, and calibration records, then submit the historical current fraction and path.

**Complete format-specific interaction block:** `attest:{verification_limit:4,claims:[{id:"shunt_identity",label:"week-five shunt identity",signed:true,backed:true,critical:true},{id:"clock_alignment",label:"week-five clock alignment",signed:true,backed:true,critical:true},{id:"conduit_work_order",label:"conduit bond work order",signed:true,backed:false,critical:true},{id:"clamp_calibration",label:"clamp calibration",signed:true,backed:true,critical:true},{id:"today_link",label:"today controlled-link result",signed:true,backed:true,critical:false}],correct_verified:["shunt_identity","clock_alignment","conduit_work_order","clamp_calibration"],critical_unbacked:"conduit_work_order",answerText:"Verify the four historical records, including the unbacked conduit work order, before applying the current causal result to week five."}`

**Correct result:** `Week-five records support one-third via conduit.` Identity and timing transfer the test.

**Answer text:** The completed check shows week-five records support one-third via conduit. Identity and timing transfer the test.

**Why:** matched identity and timing transfer the causal result to the failed shot.

**Wrong-path feedback:** `Today’s result alone cannot establish the historical shot; verify all four critical records.`

**State/output:** report piece11.

## Mission outcome

Mission decision: About one third of the strike used the bonded conduit. Current totals, field tests, and timing all agree. Mark the conduit unsafe for now. Test a new route before the next shot.

### Post-mission metric screen - exact player copy

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 24:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The unsafe conduit path is isolated.

**Automatic bar change:** REPORT CERTAINTY +5 | STATION INTEGRITY -6

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 79/100/86/94

**Lock result:** No new lock.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- KCL, current density, Ampere, force between wires, attestation.
- ## Four graded stops
- **Mission takeaway:** About one third of the week-five strike current flowed through the bonded instrument conduit.

---

# Mission 12 - Predict, Then Fire

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 4 DAYS; **Go now:** Impulse Hall, Elise Strand at bank stages.  
**Card title:** Predict, Then Fire  
**Card body:** The conduit carried one third of the strike, and a temporary reroute is ready. A repair earns trust only if it predicts fields and induced voltage before a new pulse. You will calculate the reduced shot, commit the prediction, measure current at the mast, and compare trench voltage. By the end of the mission, decide whether the reroute is safe for a full shot.  
**Objective:** Verify the reroute with a committed quantitative prediction.  
### Worth knowing first - exact player copy

#### Glossary terms

Mutual inductance: flux linkage in one circuit per current in another.
Transfer function: output divided by input as a function of frequency.  
#### Primer concepts

Changing current couples loops; smaller loop area and greater separation reduce mutual inductance; verification requires prediction first.  
#### Equations first needed today
**Equation:** `ε₂=-M dI₁/dt`

**What it is for:** mutual induction

**Symbols:** `M` H

**Why this campaign needs it:** reroute.## Main story happening - designer summary
BANK calculate/commit→MAST operate/measure→EARTH interpret. Three locations mirror physical causal chain.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `bank-stages` | automatic**

**World state:** accepted BANK/bubble/charge controls locked/``→S1; S2 correct/panel/prediction seal `90 V`/`PREDICTION LOCKED`→MAST; enter MAST/fixture/shot control enabled/`25.0 kV STAGES • 8 mm GAP • REROUTE FIXED`→S3; S3 complete/waypoint/measurements logged/`Take 92 V to the trench tolerance board.`→EARTH/S4; S4 correct/world/reroute tag green+PASS text/`WORST CASE 224 V < 250 V`→outcome.

**Panel/HUD text:** Elise Strand, impulse engineer: “Calculate first. The charger stays locked until the number is committed.”

**Dialogue bubbles -** Mission lead: "Calculate first. The charger stays locked until the number is committed."

**Unlocks/waypoint:** Unlock Stop 45 at `bank-stages` in Impulse Hall.

**Beat 2 - After Stop 45 | `hall-board` | automatic**

**World state:** The calculate reduced energy result remains visible while the predict reroute voltage fixture lights.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 45 result to settle predict reroute voltage."

**Unlocks/waypoint:** Unlock Stop 46 at `hall-board` in Impulse Hall.

**Beat 3 - After Stop 46 | `shunt-rack` | automatic**

**World state:** The predict reroute voltage result remains visible while the fire the reduced test fixture lights.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 46 result to settle fire the reduced test."

**Unlocks/waypoint:** Unlock Stop 47 at `shunt-rack` in Mast Base.

**Beat 4 - After Stop 47 | `conduit-bond` | automatic**

**World state:** The fire the reduced test result remains visible while the stress worst-case coupling fixture lights.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 47 result to settle stress worst-case coupling."

**Unlocks/waypoint:** Unlock Stop 48 at `conduit-bond` in Earthing Trench.

**Beat 5 - At mission end | `bank-stages` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

BANK→MAST→EARTH follows source, current, receiving bond. 

## Characters and dramatic beat

Strand owns source, Tate path, Noor tolerance. 

## Key concepts, explained here

 voltage-squared energy, mutual L, staged verification, worst-case range.  

## Four graded stops
## Stop 45 - Calculate Reduced Energy

**Format/placement:** BALLPARK, at `bank-stages`.

**Metadata:** Concept: reduced energy; Keystone: K5,K6; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the Marx bank stages, in Impulse Hall.

**Stop reason - exact player copy:** reduced shot must meet energy cap.

**Question card story setup - exact player copy:** The test uses twelve `100 nF` stages at `25.0 kV` each rather than `50.0 kV`. Estimate total stored energy using `U_total=12(½CV²)` before the charging control unlocks.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** halving voltage quarters capacitor energy.

**Question card prompt - exact player copy:** Using twelve 100 nF stages at 25.0 kV, assemble U_total=12(½CV²) and submit total energy in joules before the charger unlocks.

**Complete format-specific interaction block:** target `375J`, tolerance 5%, visible constants. Prompt assemble/submit J.

**Correct result:** `Reduced bank energy is 375 J.` Halving V quarters U.

**Answer text:** The completed check shows reduced bank energy is 375 J. Halving V quarters U.

**Why:** halving voltage quarters capacitor energy.

**Wrong-path feedback:** `The bank still has twelve stages; change only stage voltage.`

**State/output:** unlock S2.

## Stop 46 - Predict Reroute Voltage

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: mutual emf; Keystone: K10,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** reroute must make a numerical promise.

**Question card story setup - exact player copy:** The old mutual inductance `3.7 microH` and rise rate `3.0×10^8 A/s` predicted `1.11 kV`. The reroute lowers mutual inductance to `0.60 microH`; derive its pulse prediction and justify the change.

**Question card story-science connection - exact player copy:** mutual inductance links the geometry repair directly to measurable voltage.

**Question card prompt - exact player copy:** Build the mutual-emf calculation for M_new=0.60 μH, first at 3.0×10^8 A/s and then at half that rise rate; submit both voltages in volts and commit the reduced prediction.

**Complete format-specific interaction block:** lines `|ε|=M|dI/dt|`; substitution `.60e-6×3e8`; `180V`; for half rise rate reduced shot `90V`. Prompt build lines/rules, submit 90V, tolerance 5V. State commit locked→S3.

**Correct result:** `180 V at full derivative; 90 V at reduced derivative.`

**Answer text:** The completed check shows 180 V at full derivative; 90 V at reduced derivative.

**Why:** mutual inductance links the geometry repair directly to measurable voltage.

**Wrong-path feedback:** `Apply both changes in order: new M, then half dI/dt.`

**State/output:** Record the result and unlock the next named stop.

## Stop 47 - Fire the Reduced Test

**Format/placement:** VERIFY, at `shunt-rack`.

**Metadata:** Concept: staged verification; Keystone: K7,K10,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** prediction must be frozen before the bank fires.

**Question card story setup - exact player copy:** The committed reduced-shot prediction is `90 V`. Fire only the `25.0 kV` stage setting, keep gap spacing `8 mm` and reroute geometry fixed, then collect peak current and rise time, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** operation cannot tune the prediction after the measurement.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock 90 V. OPERATE: Fire only 25.0 kV stages with 8 mm gap and reroute fixed. MEASURE: Record current, rise rate, and trailer peak. INTERPRET: Earth the bank and submit PASS or FAIL against 80–100 V.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"trailer peak",unit:"V",truth:90,tolerance:10}},equipment_locked_until_prediction_commit:true,operation:{action:"fire reduced test",settings:{stage_voltage:25.0,unit:"kV",gap:8,unit_gap:"mm"},fixed:["reroute"]},measurements:{current:15,unit_current:"kA",rise_rate:1.5e8,unit_rise:"A/s",trailer_peak:92,unit_peak:"V"},restore:{required:true,action:"earth the bank",remeasure:false},acceptance:[80,100],correct_conclusion:"PASS",answerText:"The measured 92 V lies inside the 80-100 V window; earth the bank and record PASS."}`

**Correct result:** `Measured 92 V passes the committed 80–100 V band.`

**Answer text:** The completed check shows measured 92 V passes the committed 80–100 V band.

**Why:** operation cannot tune the prediction after the measurement.

**Wrong-path feedback:** `Commit before firing, keep named controls fixed, collect every reading, and earth the bank.`

**State/output:** Record the result and unlock the next named stop.

## Stop 48 - Stress Worst-Case Coupling

**Format/placement:** STRESS, asked by Dr. Lena Ortiz beside `conduit-bond`.

**Metadata:** Concept: uncertainty; Keystone: K12,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the bonded conduit in Earthing Trench.

**Stop reason - exact player copy:** full-shot safety needs extrapolation across component tolerance.

**Question card story setup - exact player copy:** The reduced shot measured `92 V`, but the full shot has uncertain coupling and rise rate. Vary mutual inductance from `0.50` to `0.70 microH` and `dI/dt` from `2.8` to `3.2×10^8 A/s`, then test the `250 V` limit.

**Question card story-science connection - exact player copy:** the repair passes only if every allowed pair stays below the campaign limit.

**Question card prompt - exact player copy:** Adjust M and dI/dt through both displayed ranges, submit the numerical worst-case pair and voltage in volts, then select safe or unsafe against the inclusive 250 V limit.

**Complete format-specific interaction block:** ranges; maximum `224V`; correct pass. Prompt move assumptions, submit worst voltage/conclusion.

**Correct result:** `Worst pair gives 224 V, below 250 V.`

**Answer text:** The completed check shows worst pair gives 224 V, below 250 V.

**Why:** the repair passes only if every allowed pair stays below the campaign limit.

**Wrong-path feedback:** `Submit the numerical pair and worst voltage before selecting the safe plan.`

**State/output:** report piece12.

## Mission outcome

Mission decision: The reroute is safe for a full shot under the stated tolerance. The reduced test measured `92 V` against a `90 V` prediction. And the worst allowed full-shot case is `224 V`, below `250 V`. The remaining question is whether the recorders can see the fastest pulse. Metric target 25:00.

### Post-mission metric screen - exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 25:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The reduced shot matches its prediction and improves clearance.

**Automatic bar change:** REPORT CERTAINTY +5 | CREW CLEARANCE +3

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 88/100/90/98

**Lock result:** No new lock.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- voltage-squared energy, mutual L, staged verification, worst-case range.
- ## Four graded stops
- **Mission takeaway:** The reroute is safe for a full shot under the stated tolerance.

---

# Mission 13 - The Missing Microsecond

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 3 DAYS; **Go now:** Screened Room, Noor Haddad at record budget board.  
**Card title:** The Missing Microsecond  
**Card body:** The reroute passes its voltage test, but the fastest pulse may fall between recorded samples. Capacitors and inductors set circuit response times, so a quiet recorder can be too slow rather than truly quiet. You will derive RC and RL responses, test bandwidth, and compare the April certificate. By the end of the mission, decide which channels can certify the final shot.  
**Objective:** Choose recorders fast enough for the relevant transient.  
### Worth knowing first - exact player copy

#### Glossary terms

Bandwidth: range of signal frequencies a channel can follow.
RC circuit: resistor-capacitor circuit with `τ=RC`.
RL circuit: resistor-inductor circuit with `τ=L/R`.  
#### Primer concepts

After about `5τ` a first-order response is over 99% settled; larger τ is slower; shield continuity matters at high frequency.  
#### Equations first needed today
**Equation:** charging/discharging `Q=Q∞(1-e^-t/RC)`, `Q=Q0e^-t/RC`; RL `I=(ε/R)(1-e^-tR/L)`

**What it is for:** transient response

**Symbols:** charging, discharging, Q, Q∞, e, t, RC, Q0e, RL, I, ε, R, tR, L are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** qualify channels.

**Equation:** `ω₀=1/√(LC)` and transformer `V₂/V₁=N₂/N₁`

**What it is for:** LC oscillation/ideal transformation

**Symbols:** ω, LC, and, transformer, V, N are the named quantities and constants shown in the equation; their units are stated with the mission data.

**Why this campaign needs it:** recognize ringing and probe scaling.## Main story happening - designer summary
SCREEN analysis→SHOT raw sample audit→EARTH certificate reinterpretation. Three locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Screened Room | `record-budget` | automatic**

**World state:** accepted SCREEN/bubble/three traces/``→S1; S2 correct/panel/63.2% label/`ONE τ CAPTURES ONLY 63.2%`→S3; S3 correct/waypoint/channel slot moves/`FAST ISOLATED CHANNEL FUNDED; VERIFY RECORD AT SHOT.`→SHOT; record checked/waypoint/ringing trace/`Compare this transient with April’s DC certificate.`→EARTH/S4; S4 correct/world/certificate relabeled/`DC ONLY • TRANSIENT NOT CERTIFIED`→outcome.

**Panel/HUD text:** Noor Haddad, data and safety analyst: “A smooth line can be a slow instrument.”

**Dialogue bubbles -** Mission lead: "A smooth line can be a slow instrument."

**Unlocks/waypoint:** Unlock Stop 49 at `record-budget` in Screened Room.

**Beat 2 - After Stop 49 | `recorder-rack` | automatic**

**World state:** The find the fast recorder result remains visible while the derive rc response fixture lights.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 49 result to settle derive rc response."

**Unlocks/waypoint:** Unlock Stop 50 at `recorder-rack` in Screened Room.

**Beat 3 - After Stop 50 | `record-desk` | automatic**

**World state:** The derive rc response result remains visible while the buy the recorder upgrade fixture lights.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 50 result to settle buy the recorder upgrade."

**Unlocks/waypoint:** Unlock Stop 51 at `record-desk` in Launch Control.

**Beat 4 - After Stop 51 | `earth-cert` | automatic**

**World state:** The buy the recorder upgrade result remains visible while the diagnose frequency response fixture lights.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 51 result to settle diagnose frequency response."

**Unlocks/waypoint:** Unlock Stop 52 at `earth-cert` in Earthing Trench.

**Beat 5 - At mission end | `record-budget` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SCREEN→SHOT→EARTH because response model, actual record, and certificate are distinct evidence. 

## Characters and dramatic beat

Noor chooses sufficient evidence rather than perfect coverage. 

## Key concepts, explained here

RC/RL, `5τ`, LC/RLC, transformer, bandwidth/residuals.  

## Four graded stops
## Stop 49 - Find the Fast Recorder

**Format/placement:** RESIDUAL, at `record-budget`.

**Metadata:** Concept: bandwidth residual; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L4.

**Call - exact player copy:** Go to the recorder budget board, in Screened Room.

**Stop reason - exact player copy:** lowest RMS may hide missed pulse shape.

**Question card story setup - exact player copy:** Three channels fit the long baseline equally well, but only one records a `100 ns` spike without patterned residuals. Compare residual fields and reject the smooth channel that erases the peak.

**Question card story-science connection - exact player copy:** a good average fit cannot certify a fast event it systematically misses.

**Question card prompt - exact player copy:** Compare every residual field, select the recorder with no patterned failure at the 100 ns peak, and submit its channel ID.

**Complete format-specific interaction block:** traces fast/mid/slow with residual arrays; correct fast, not lowest overall slow RMS.

**Correct result:** `The fast isolated channel alone has structureless pulse residuals.`

**Answer text:** The completed check shows the fast isolated channel alone has structureless pulse residuals.

**Why:** a good average fit cannot certify a fast event it systematically misses.

**Wrong-path feedback:** `Do not select lowest baseline RMS when its residual erases the peak.`

**State/output:** unlock S2.

## Stop 50 - Derive RC Response

**Format/placement:** DERIVE, at `recorder-rack`.

**Metadata:** Concept: RC/RL exponentials; Keystone: K7,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the recorder rack, in Screened Room.

**Stop reason - exact player copy:** sampling choice needs a derived response fraction.

**Question card story setup - exact player copy:** Channel A has `R=1.0 kilohm`, `C=100 pF`, and time constant `RC=100 ns`. Derive its charging fraction after `100 ns` and after five time constants, then justify both results.

**Question card story-science connection - exact player copy:** response fraction quantifies why one sample per time constant underreports the peak.

**Question card prompt - exact player copy:** Build the charging-response lines for t=τ and t=5τ, name exponential substitution and evaluation, and submit both response percentages.

**Complete format-specific interaction block:** lines `Vc/V∞=1-e^-t/τ`; at τ `1-e^-1=.632`; at5τ `.9933`; result. Prompt rules/fractions/%; tolerances .2%. State waypoint SHOT.

**Correct result:** `63.2% at τ; 99.33% at 5τ.` Exponential response quantifies under-read.

**Answer text:** The completed check shows 63.2% at τ; 99.33% at 5τ. Exponential response quantifies under-read.

**Why:** response fraction quantifies why one sample per time constant underreports the peak.

**Wrong-path feedback:** `Use 1-e^-t/τ for charging, not e^-t/τ.`

**State/output:** Record the result and unlock the next named stop.

## Stop 51 - Buy the Recorder Upgrade

**Format/placement:** PROPAGATE, at `record-desk`.

**Metadata:** Concept: error budget; Keystone: K12,K7; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the record desk, in Launch Control.

**Stop reason - exact player copy:** one extra channel slot must buy the uncertainty that changes certification.

**Question card story setup - exact player copy:** With RC loss identified, the one-microsecond record can add only one upgrade. Compare costs and propagated uncertainty from faster sampling, another slow sensor, better paint calibration, or a longer cable survey.

**Question card story-science connection - exact player copy:** spend the channel on bandwidth because it dominates peak-voltage uncertainty.

**Question card prompt - exact player copy:** Read the live error budget, spend the one available record slot, and submit the upgrade that most reduces the uncertainty controlling certification.

**Complete format-specific interaction block:** live error contributions `[bandwidth:18%,gain:3%,timing:4%,geometry:6%]`; options/cost one slot; correct faster sampling reduces to4%. State waypoint EARTH.

**Correct result:** `Buy faster sampling; dominant uncertainty falls 18% to 4%.`

**Answer text:** The completed check shows buy faster sampling; dominant uncertainty falls 18% to 4%.

**Why:** spend the channel on bandwidth because it dominates peak-voltage uncertainty.

**Wrong-path feedback:** `Spend the one slot on the error term that changes certification.`

**State/output:** Record the result and unlock the next named stop.

## Stop 52 - Diagnose Frequency Response

**Format/placement:** DIAGNOSIS, at `earth-cert`.

**Metadata:** Concept: certification timescale, LC/RL/transformer; Keystone: K7,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5.

**Call - exact player copy:** Go to the earth certificate board, in Earthing Trench.

**Stop reason - exact player copy:** the April certificate must be labeled with what it measured.

**Question card story setup - exact player copy:** The upgraded channel captures damped ringing near `1/√(LC)`, while the April test used steady current. Diagnose why its `0.42 Ω` result and the fast waveform can both be correct.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** DC resistance, RL growth, RLC loss, and transformer scaling answer different parts of a transient.

**Question card prompt - exact player copy:** Read DC, RL, RLC, transformer, and physical-condition zones, select the one explanation fitting all of them, and submit one certificate scope.

**Complete format-specific interaction block:** readings `[DC stable,RL_current_rises_with_tau_LoverR,ringing_at_1overSqrtLC_decays_through_R,probe_ratio_V2overV1_equals_N2overN1,physical_bond_intact]`; choices `[fraud,frequency_dependent_response,charge_nonconservation]`; answer frequency response; mechanism explicitly checks `L dI/dt+IR=ε`, `ω0=1/√LC`, resistance damps RLC energy, and ideal `V2/V1=N2/N1`.

**Correct result:** `Frequency-dependent response reconciles DC and transient records.`

**Answer text:** The completed check shows frequency-dependent response reconciles DC and transient records.

**Why:** DC resistance, RL growth, RLC loss, and transformer scaling answer different parts of a transient.

**Wrong-path feedback:** `Fraud and charge loss do not predict RL rise, damped LC ringing, and correct transformer ratio together.`

**State/output:** report piece13.

## Mission outcome

Mission decision: Use only the fast, separate channels for the final shot. A slow channel misses much of the peak. The old test still works for steady current. It does not prove safety during lightning.

### Post-mission metric screen - exact player copy

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 24:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A fast recorder and relabeled certificate restore station integrity.

**Automatic bar change:** STATION INTEGRITY +4

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 92/100/94/100; BANK 2

**Lock result:** No new lock.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- RC/RL, 5τ, LC/RLC, transformer, bandwidth/residuals.
- ## Four graded stops
- **Mission takeaway:** Only the fast isolated channels can certify the final shot.

---

# Mission 14 - The Shot That Almost Closed the Case

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 2 DAYS; **Go now:** Launch Control, Dr. Lena Ortiz at launch board.  
**Card title:** The Shot That Almost Closed the Case  
**Card body:** The reroute and fast recorders are ready, and every derived limit can now be tested together. The shot is safe only if field, current, induced voltage, and record independence all pass their prewritten rules. You will commit thresholds, fire once, inspect the mast, and compare the trailer trace. By the end of the mission, decide whether the station has reproduced and removed the failure.  
**Objective:** Run the integrated full-shot coupling test.  
### Worth knowing first - exact player copy

#### Glossary terms

Poynting vector: electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.  
#### Primer concepts

Gauss links charge to E; no magnetic monopoles give zero net B flux; Faraday links changing B to circulating E; Ampere-Maxwell links current/changing E to B.  
#### Equations first needed today
**Equation:** `S=(1/μ₀)E×B`, `u=u_E+u_B`

**What it is for:** energy flow/density

**Symbols:** standard

**Why this campaign needs it:** track where shot energy travels.## Main story happening - designer summary
SHOT precommit/fire→MAST inspect paths→COUPLE compare. Apparent pass followed by rack-loop residual—Twist 3.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Launch Control | `launch-board` | automatic**

**World state:** accepted SHOT/bubble/blank rule fields/``→S1; S2 correct/panel/Poynting arrow up/`ENERGY FLOW: 1.59×10^7 W/m² UP`→S3; S3 pass/waypoint/main probe PASS/`Main reroute passes; Inspect every rack position.`→COUPLE/S4; S4 correct/world/card E red+text/`CARD E 310 V — LIMIT 250 V`→outcome; outcome/radio/local loop highlighted/`Main path repaired; local loop remains.`→metric.

**Panel/HUD text:** Dr. Lena Ortiz, station director: “Write every stop condition before the cell arrives.”

**Dialogue bubbles -** Lena Ortiz: "Write every stop condition before the cell arrives."

**Unlocks/waypoint:** Unlock Stop 53 at `launch-board` in Launch Control.

**Beat 2 - After Stop 53 | `radar-desk` | automatic**

**World state:** The freeze final thresholds result remains visible while the derive energy flow fixture lights.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 53 result to settle derive energy flow."

**Unlocks/waypoint:** Unlock Stop 54 at `radar-desk` in Launch Control.

**Beat 3 - After Stop 54 | `shunt-rack` | automatic**

**World state:** The derive energy flow result remains visible while the fire the full shot fixture lights.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 54 result to settle fire the full shot."

**Unlocks/waypoint:** Unlock Stop 55 at `shunt-rack` in Mast Base.

**Beat 4 - After Stop 55 | `probe-rack` | automatic**

**World state:** The fire the full shot result remains visible while the probe the rack fixture lights.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Mission lead: "Use the Stop 55 result to settle probe the rack."

**Unlocks/waypoint:** Unlock Stop 56 at `probe-rack` in Remote Outstation.

**Beat 5 - At mission end | `launch-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Mission lead: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SHOT→MAST measurement within S3→COUPLE; source, path, load. 

## Characters and dramatic beat

Ortiz resists declaring victory; Noor requires spatial coverage. 

## Key concepts, explained here

Maxwell synthesis, Poynting, precommitment, spatial probing.  

## Four graded stops
## Stop 53 - Freeze Final Thresholds

**Format/placement:** TRIGGER, at `launch-board`.

**Metadata:** Concept: integrated rules; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L5.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** all limits must be frozen before final test data.

**Question card story setup - exact player copy:** The board is blank and the storm cell is approaching. Enter the inclusive limits for field `5.0 kV/m`, conduit current `1.0 kA`, trailer voltage `250 V`, and channel spread `0.50 kV/m`, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** one precommitted rule protects against choosing whichever successful measure looks best.

**Question card prompt - exact player copy:** Before any update appears, enter the inclusive field, conduit-current, trailer-voltage, and channel-spread limits with units; submit the complete GO rule.

**Complete format-specific interaction block:** four anchors/rules and consequence; exact. Prompt enter four numeric thresholds/units and submit GO rule before updates.

**Correct result:** `All four inclusive thresholds are frozen before data.`

**Answer text:** The completed check shows all four inclusive thresholds are frozen before data.

**Why:** one precommitted rule protects against choosing whichever successful measure looks best.

**Wrong-path feedback:** `A partial rule lets one passing measure hide another failure; enter every limit.`

**State/output:** unlock S2.

## Stop 54 - Derive Energy Flow

**Format/placement:** DERIVE, at `radar-desk`.

**Metadata:** Concept: Poynting; Keystone: K1,K6,K8; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** the report needs direction of electromagnetic energy flow.

**Question card story setup - exact player copy:** At one probe, `E=2.0×10^4 N/C` east and `B=1.0 mT` north. Derive the Poynting-vector magnitude and direction before the shot trace appears.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** `E×B` shows energy moving upward rather than along either field alone.

**Question card prompt - exact player copy:** Build three Poynting-vector lines using E=2.0×10^4 N/C, B=1.0×10^-3 T, and μ₀=4π×10^-7 T·m/A; submit W/m² and direction.

**Complete format-specific interaction block:** lines `S=E×B/μ0`; magnitude `EB/μ0`; substitution `(20)/(4π×10^-7)=1.59×10^7 W/m²`; east×north=up. Prompt rules/value/direction; tolerance 2%. State fire unlocked.

**Correct result:** `S=1.59×10^7 W/m² upward.` East×north is up.

**Answer text:** The completed check shows s=1.59×10^7 W/m² upward. East×north is up.

**Why:** `E×B` shows energy moving upward rather than along either field alone.

**Wrong-path feedback:** `E×B is 20 before division by μ₀; do not multiply by μ₀.`

**State/output:** Record the result and unlock the next named stop.

## Stop 55 - Fire the Full Shot

**Format/placement:** VERIFY, at `shunt-rack`.

**Metadata:** Concept: full test; Keystone: K7,K10,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** operate only after thresholds and energy-flow prediction are committed.

**Question card story setup - exact player copy:** The GO board passes the incoming field. Fire one full shot, keep `8 mm` gap and reroute fixed, measure current, rise time, conduit current, and independent trailer voltage, then earth the bank.

**Question card story-science connection - exact player copy:** one controlled shot tests the full causal chain.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock 180 V. OPERATE: Fire one full shot with 8 mm gap and reroute fixed. MEASURE: Record field, current, rise time, conduit current, and trailer voltage. INTERPRET: Earth the bank and submit the all-threshold verdict.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"trailer voltage",unit:"V",truth:180,tolerance:10}},equipment_locked_until_prediction_commit:true,operation:{action:"fire one full shot",settings:{gap:8,unit:"mm"},fixed:["reroute"]},measurements:{current:30,unit_current:"kA",rise_time:100,unit_rise:"ns",conduit_current:0.4,unit_conduit:"kA",trailer_voltage:188,unit_voltage:"V"},restore:{required:true,action:"earth the bank",remeasure:false},correct_conclusion:"all thresholds pass",answerText:"All full-shot readings meet their written limits; earth the bank and record PASS."}`

**Correct result:** `Main reroute passes: 188 V, 0.40 kA conduit, thresholds met.`

**Answer text:** The completed check shows main reroute passes: 188 V, 0.40 kA conduit, thresholds met.

**Why:** one controlled shot tests the full causal chain.

**Wrong-path feedback:** `Follow all four phases and earth the bank before submitting the conclusion.`

**State/output:** Record the result and unlock the next named stop.

## Stop 56 - Probe the Rack

**Format/placement:** PROBE, at `probe-rack`.

**Metadata:** Concept: spatial coupling; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the probe rack, in Remote Outstation.

**Stop reason - exact player copy:** a passing peak at one probe cannot clear the whole rack.

**Question card story setup - exact player copy:** Because the main trailer probe reads `188 V`, sample all six card positions before declaring victory. Identify where the spatial pattern breaks the `250 V` limit and submit the failed location, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** local loop area can preserve a hazard after the main cable reroute succeeds.

**Question card prompt - exact player copy:** Probe all six card positions, record each peak in volts, identify the location exceeding the inclusive 250 V limit, and submit location, value, and mechanism.

**Complete format-specific interaction block:** `probe={comparison:"observed peak must be within station-specific expected interval and at or below the inclusive 250 V load limit",stations:[{id:A,reading:188,expected:190,tolerance:15,load:250,comparison:"within expected; load passes"},{id:B,reading:190,expected:188,tolerance:15,load:250,comparison:"within expected; load passes"},{id:C,reading:185,expected:187,tolerance:15,load:250,comparison:"within expected; load passes"},{id:D,reading:192,expected:191,tolerance:15,load:250,comparison:"within expected; load passes"},{id:E,reading:310,expected:189,tolerance:15,load:250,comparison:"121 V above expected and 60 V above load; fails"},{id:F,reading:187,expected:190,tolerance:15,load:250,comparison:"within expected; load passes"}],correct_station:E,correct_conclusion:"rack-local loop"}`.

**Correct result:** `Card E fails at 310 V; local loop remains.`

**Answer text:** The completed check shows card E fails at 310 V; local loop remains.

**Why:** local loop area can preserve a hazard after the main cable reroute succeeds.

**Wrong-path feedback:** `Probe every station; the main probe cannot certify an unsampled rack.`

**State/output:** report piece14 then visible card E red text/icon.

## Mission outcome

Mission decision: The station reproduced. And removed the main cable failure, but it has not removed every hazard. The reroute holds the main probe to `188 V`, while card E reaches `310 V` because its rack wiring forms a smaller hidden loop. One repair remains before the report can be signed. Metric target 27:00.

### Post-mission metric screen - exact player copy

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 27:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The full shot uses reserve and reveals a rack-local failure.

**Automatic bar change:** REPORT CERTAINTY +4 | SHOT RESERVE -5 | STATION INTEGRITY -4

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 100/100/95/100

**Lock result:** No lock; card E blocks certification.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- Maxwell synthesis, Poynting, precommitment, spatial probing.
- ## Four graded stops
- **Mission takeaway:** The station reproduced.

---

# Mission 15 - Sign the Ground Truth

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** FINAL STORM WINDOW TODAY; **Go now:** Launch Control, Dr. Lena Ortiz at record desk.  
**Card title:** Sign the Ground Truth  
**Card body:** The main reroute works, but card E's local loop still exceeds the limit. The final report must join electrostatics, energy, circuits, magnetism, induction, bandwidth, and independent evidence into one action. You will approve a repair, run a dry check, witness the final shot, and close the record. By the end of the mission, decide whether Station 12 is safe to certify.  
**Objective:** Repair the local loop, execute the final rule, and sign or reject certification.  
### Worth knowing first - exact player copy

#### Glossary terms

No new terms; use the mission log glossary.  
#### Primer concepts

Use the complete causal chain; preserve precommitted limits; no single quiet reading overrides failed independent evidence.  
#### Equations first needed today
No new equation is introduced; retrieve the field, capacitance, circuit, magnetic-force, induction, transient, and energy-flow equations already recorded.

## Main story happening - designer summary
SHOT plan approval→BANK dry-source check→COUPLE physical repair/final read. Three locations; each move required by authority, source, and affected load. All characters contribute one constraint.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Remote Outstation | `repair-board` | automatic**

**World state:** accepted SHOT/bubble/100-point board/``→S1; S1 correct/waypoint/plan pinned/`TWIST PAIR • ISOLATE RECORD • VERIFY TIMING • PROTECT INSPECTION`→BANK/S2; S2 correct/waypoint/dry checks PASS/`Dry source and law map pass; Repair card E.`→COUPLE/S3; S3 correct/world/pair permanently twisted/`TEMP 72 V • RESTORE 305 V • REPAIR 74 V`→S4; S4 correct/nearby bubbles then banner/report signed/`ALL LIMITS PASS • INDEPENDENT RECORDS COMPLETE`→outcome/victory.

**Panel/HUD text:** Dr. Lena Ortiz, station director: “Fund the cause, the witness, and the recovery.”

**Dialogue bubbles -** Lena Ortiz: "Fund the cause, the witness, and the recovery."

**Unlocks/waypoint:** Unlock Stop 57 at `repair-board` in Remote Outstation.

**Beat 2 - After Stop 57 | `bank-stages` | automatic**

**World state:** The fund the final repair result remains visible while the map the final laws fixture lights.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "Use the Stop 57 result to settle map the final laws."

**Unlocks/waypoint:** Unlock Stop 58 at `bank-stages` in Impulse Hall.

**Beat 3 - After Stop 58 | `cable-bay` | automatic**

**World state:** The map the final laws result remains visible while the reverse the loop geometry fixture lights.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "Use the Stop 58 result to settle reverse the loop geometry."

**Unlocks/waypoint:** Unlock Stop 59 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 59 | `repair-board` | automatic**

**World state:** The reverse the loop geometry result remains visible while the certify station 12 fixture lights.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "Use the Stop 59 result to settle certify station 12."

**Unlocks/waypoint:** Unlock Stop 60 at `repair-board` in Remote Outstation.

**Beat 5 - At mission end | `repair-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Dr. Lena Ortiz: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SHOT→BANK→COUPLE, following authority, source, and final load. 

## Characters and dramatic beat

Ortiz supplies stop rule, Strand timing, Tate path, Ravi field, Noor independence; the player alone integrates all. 

## Key concepts, explained here

 complete dependency graph and evidence standard.  

## Four graded stops
## Stop 57 - Fund the Final Repair

**Format/placement:** SCIENCETANK, asked by Dr. Lena Ortiz beside `repair-board`.

**Metadata:** Concept: causal repair portfolio; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L5.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the repair board in Remote Outstation.

**Stop reason - exact player copy:** limited final window must fund causes, not cosmetic work.

**Question card story setup - exact player copy:** Ortiz has `100` effort points and four hours. Fund a plan that reduces card-E loop area, preserves isolated recording, verifies bank timing, and keeps a protected inspection reserve.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** the final plan must cover source, path, measurement, and recovery.

**Question card prompt - exact player copy:** Allocate the 100 effort points across the five proposals, preserve the protected inspection reserve, and submit answers to all three causal-plan checks.

**Complete format-specific interaction block:** proposals `[twist_pair 35 required,isolated_channel20 required,gap_timing15 required,inspection20 protected,repaint10]`; recommended first four=90; evidence constraints. Prompt allocate 100 and answer three decision checks. State waypoint BANK.

**Correct result:** `Fund twist, isolation, timing, and protected inspection.` Causal chain costs 90 points.

**Answer text:** The completed check shows fund twist, isolation, timing, and protected inspection. Causal chain costs 90 points.

**Why:** the final plan must cover source, path, measurement, and recovery.

**Wrong-path feedback:** `Do not spend protected inspection capacity on cosmetic work.`

**State/output:** Record the result and unlock the next named stop.

## Stop 58 - Map the Final Laws

**Format/placement:** PROTOCOL, at `bank-stages`.

**Metadata:** Concept: full-course tool selection; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the Marx bank stages, in Impulse Hall.

**Stop reason - exact player copy:** the dry check must use the right relation for each observed quantity.

**Question card story setup - exact player copy:** The funded plan is locked. Match each final observation to the equation family that can actually determine it, including static, circuit, magnetic, induction, transient, and energy-flow cases.”, and record the result with its physical justification in the station report.

**Question card story-science connection - exact player copy:** selecting the governing law prevents one successful equation from being used outside its domain.

**Question card prompt - exact player copy:** Match all twelve final observations to the governing equation family, then submit the complete mapping; every row is required.

**Complete format-specific interaction block:** `scenarios=[off_axis_point_charge_field,point_charge_energy,uniform_sphere_inside_outside,surface_field,series_capacitors,temperature_changed_resistor,multiloop_currents,loop_center_field,toroid_field,rotating_loop_emf,changing_capacitor_gap_field,energy_flow_direction]`; `choices=[Coulomb_vector_sum_and_dq_integral,V_scalar_sum_and_Uq,Gauss_concentric,Eout_sigma_over_epsilon0,reciprocal_C_series,R=R0(1+alphaDeltaT),Kirchhoff_simultaneous,BiotSavart_loop_or_Ampere,Ampere_toroid,epsilon=NABomegaSinOmegaT,AmpereMaxwell_displacement_current,Poynting_ExB]`; one-to-one keyed mapping in listed order.

**Correct result:** `All twelve law mappings are correct.` Each equation has a defined physical job.

**Answer text:** The completed check shows all twelve law mappings are correct. Each equation has a defined physical job.

**Why:** selecting the governing law prevents one successful equation from being used outside its domain.

**Wrong-path feedback:** `Match by source and requested quantity, not by whichever formula contains a familiar symbol.`

**State/output:** Record the result and unlock the next named stop.

## Stop 59 - Reverse the Loop Geometry

**Format/placement:** CONTROL, at `cable-bay`.

**Metadata:** Concept: loop-area causality; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** repair must show reversible causal effect before permanent fastening.

**Question card story setup - exact player copy:** Temporarily twist card E's outgoing and return wires together, keep pulse source, gain, resistance, and sampling fixed, then untwist once. Measure induced peak in all three states before permanent fastening.

**Question card story-science connection - exact player copy:** reduced loop area should lower flux and voltage, with reversal restoring the old peak.

**Question card prompt - exact player copy:** Change only pair twisting while source, gain, resistance, and sampling stay fixed; measure original, twisted, and restored peaks; restore once, fasten permanently, remeasure, and submit the causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"twist_pair",label:"twist the signal pair"},{id:"lower_gain",label:"lower receiver gain"},{id:"add_resistor",label:"add series resistance"}],correct_control:"twist_pair",baseline:{peak:310,unit:"V"},response:{peak:72,unit:"V"},noise_band:{value:8,unit:"V"},fixed:["source","gain","resistance","sampling"],restore:{required:true,peak:305,unit:"V",remeasure:true},final_setting:{twist_pair:"fastened",peak:74,unit:"V"},correct_conclusion:"loop area caused the pickup",answerText:"Twisting the pair collapses the induced peak, restoration brings it back, and refastening makes the repair permanent."}`

**Correct result:** `Twisting causes 310→72 V; reversal gives 305 V; final repair gives 74 V.`

**Answer text:** The completed check shows twisting causes 310→72 V; reversal gives 305 V; final repair gives 74 V.

**Why:** reduced loop area should lower flux and voltage, with reversal restoring the old peak.

**Wrong-path feedback:** `A low value without reversal is correlation; untwist once before permanent fastening.`

**State/output:** Record the result and unlock the next named stop.

## Stop 60 - Certify Station 12

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `repair-board`.

**Metadata:** Concept: final certification; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 payoff.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the repair board in Remote Outstation.

**Stop reason - exact player copy:** certification requires independent proof of thresholds, identity, timing, and physical repair.

**Question card story setup - exact player copy:** The repaired card measures `74 V` on the final shot. Verify crew-clear field, conduit current, all trailer peaks, channel independence, bank timing, and post-shot inspection, then submit one certification verdict, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** the signed report is warranted only if every physical limit and evidence condition passes.

**Question card prompt - exact player copy:** Use at most six checks to verify every critical threshold, identity, timing, independence, and inspection claim; submit CERTIFY or REJECT as one final verdict.

**Complete format-specific interaction block:** `attest:{verification_limit:6,claims:[{id:"field",label:"crew-clear field 4.7 kV/m",signed:true,backed:true,critical:true},{id:"conduit",label:"conduit current 0.3 kA",signed:true,backed:true,critical:true},{id:"trailers",label:"maximum trailer peak 190 V",signed:true,backed:true,critical:true},{id:"independence",label:"channel spread 0.2",signed:true,backed:true,critical:true},{id:"timing",label:"bank timing 100 ns",signed:true,backed:true,critical:true},{id:"inspection",label:"post-shot inspection passed",signed:true,backed:true,critical:true},{id:"draft_note",label:"unsigned draft summary",signed:false,backed:false,critical:false}],correct_verified:["field","conduit","trailers","independence","timing","inspection"],answerText:"All six critical signed records pass, so certify Station 12; the unsigned draft is not evidence."}`

**Correct result:** `CERTIFY.` Every threshold, identity, timing, independence, and inspection claim is backed.

**Answer text:** The completed check shows cERTIFY. Every threshold, identity, timing, independence, and inspection claim is backed.

**Why:** the signed report is warranted only if every physical limit and evidence condition passes.

**Wrong-path feedback:** `One missing critical record blocks certification even if every visible number is green.`

**State/output:** Record the result and unlock the next named stop.

## Mission outcome

Mission decision: Certify Station 12. The loop repair keeps card E below 250 volts. Every rule set before the shot now passes. Separate records confirm the result. The report names the bad path and the fix.

### Post-mission metric screen - exact player copy

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 28:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The accepted stock count converts the final storm window into certified reserve.

**Automatic bar change:** SHOT RESERVE +5

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 100/100/100/100; BANK 12

**Lock result:** LOCK ALL FOUR BARS — STATION CERTIFIED.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Quick concept review
- complete dependency graph and evidence standard.
- ## Four graded stops
- **Mission takeaway:** Certify Station 12.

---

# 9. Mission-at-a-glance production map

| Mission | Main event | Locations | Core E&M | Ending change |
|---:|---|---|---|---|
| 1 | Crew-clear rule written | SHOT | field vectors, uncertainty | agreement clue planted |
| 2 | Layer charge bounded | FIELD | Gauss law, flux | overvoltage theory survives |
| 3 | Voltage interval derived | FIELD | potential, line integral | energy scale becomes credible |
| 4 | Tip cause narrowed | MAST | conductors, shielding | remote path required |
| 5 | Cloud model built | FIELD→BANK | capacitance, dielectric | bank analog defined |
| 6 | Bank energy certified | BANK→SHOT | capacitor energy | stage-7 delay appears |
| 7 | Twist 1 | FIELD→SHOT | Kirchhoff, common reference | mill agreement decertified |
| 8 | Noncontact route identified | MAST→COUPLE | magnetic field and force | induction becomes lead model |
| 9 | Buried-loop prediction passes | EARTH→COUPLE | Faraday-Lenz | current path remains incomplete |
| 10 | Certificate scope narrowed | BANK→EARTH | inductance, transient voltage | DC safety claim fails |
| 11 | Twist 2 | MAST→EARTH→SHOT | KCL, Ampere, wire force | conduit path isolated |
| 12 | Reroute verified | BANK→MAST→EARTH | mutual induction | full shot authorized |
| 13 | Fast recorder qualified | SCREEN→SHOT→EARTH | RC/RL response | transient evidence repaired |
| 14 | Twist 3 | SHOT→MAST→COUPLE | Maxwell/Poynting, PROBE | card-E loop remains |
| 15 | Station certified | SHOT→BANK→COUPLE | cumulative transfer | report signed; all bars lock |

# 10. Stop manifest

| Stops | Formats | Instructional movement |
|---|---|---|
| 1–4 | PROTOCOL, DERIVE, STRESS, TRIGGER | establish signed field and precommit safety rule |
| 5–8 | DERIVE, PROTOCOL, DERIVE, RESIDUAL | infer layer charge with Gauss symmetry |
| 9–12 | DERIVE, CHOICE, DERIVE, STRESS | turn field into bounded voltage |
| 13–16 | CHOICE, DERIVE, VERIFY, DIAGNOSIS | distinguish local conductor effect from remote path |
| 17–20 | DERIVE, DEGENERACY, DERIVE, VALUE | build and constrain capacitance analog |
| 21–24 | DERIVE, SWEEP, DERIVE, ATTEST | bound stored energy and authorize test |
| 25–28 | TRACE, DERIVE, CONTROL, BALLPARK | expose shared reference and quantify error |
| 29–32 | PROTOCOL, DERIVE, BALLPARK, DIAGNOSIS | connect current to magnetic field and force |
| 33–36 | DERIVE, PROTOCOL, DERIVE, VERIFY | predict and test induction |
| 37–40 | DERIVE, SWEEP, DERIVE, DIAGNOSIS | distinguish resistance from transient impedance |
| 41–44 | BALANCE, DERIVE, CONTROL, ATTEST | identify and verify conduit current |
| 45–48 | BALLPARK, DERIVE, VERIFY, STRESS | verify reroute from prediction through tolerance |
| 49–52 | RESIDUAL, DERIVE, PROPAGATE, DIAGNOSIS | qualify recorder bandwidth |
| 53–56 | TRIGGER, DERIVE, VERIFY, PROBE | run final shot and reveal rack-local exception |
| 57–60 | SCIENCETANK, PROTOCOL, CONTROL, ATTEST | fund, repair, reverse, and certify |

# 11. Narrative implementation notes

- Keep the report board visible in SHOT; each mission adds exactly one signed piece or visibly revises an earlier claim.
- M7 marks pieces 1–3 `SHARED REFERENCE—NOT INDEPENDENT` without deleting their physical calculations.
- M11 illuminates the conduit current path and locks the unsafe bond out of service.
- M14 displays a main-path PASS before card E changes to `310 V—LIMIT 250 V`; the apparent victory is necessary for Twist 3.
- M15 permanently twists card E's outgoing and return wires only after the temporary change and restoration establish causation.
- Every alarm uses text and an icon as well as color. Every critical numerical result remains in the mission log.
- Mission endings return control for a visible equipment, report, sample, or route change before the next briefing.

# 12. Content and UI acceptance tests

## AP Physics C: E&M cheat-sheet coverage audit

This table uses the supplied E&M sheet as the authoritative checklist. “Teach” identifies the first focused, graded encounter; “retrieve/use” identifies later graded use. Material marked “exam practice” is still embedded in a graded interaction rather than left as optional prose.

| Sheet topic | Teach | Retrieve/use |
|---|---|---|
| Coulomb field, vector superposition, off-axis distance, continuous `dq` integration | M1 S2; M2 S4 model payload | M15 S2 |
| Gauss law; planar, cylindrical, spherical symmetry; flux angle; enclosed charge; conductor interior | M2 S1-S4 | M4 S1-S2; M5 S1; M15 S2 |
| Potential `V=U/q`, `V=kq/r`, scalar superposition, work `W=qΔV`, reference, `E=-∇V` | M3 S1-S4 | M4 S2; M6; M15 S2 |
| Equipotentials, contour spacing, sign of field | M3 S2 | M4, M15 |
| Conductors, perpendicular surface field, equipotential, surface charge, shielding | M4 S1-S3 | M7 S3; M13; M15 |
| Capacitance `Q/V`, parallel plate, dielectric/polarization, geometry independence | M5 S1-S2 | M6; M12; M14 |
| Capacitors in series/parallel and voltage/charge rules | M5 S3 | M6 S1; M15 S2 |
| Capacitor energy, electric energy density, breakdown | M6 S1-S3 | M12 S1; M14 S2 |
| Marx bank charge-in-parallel/discharge-in-series, stage timing, gap front, energy | M5 S3-S4; M6 | M10 S2; M12; M14-M15 |
| Current `dQ/dt`, Ohm law, `R=ρL/A`, temperature relation, power/Joule heat | M7 primer and S2-S4 | M10 S3; M11 S1; M15 S2 |
| Kirchhoff junction/loop laws, polarity, simultaneous multi-loop solution | M7 S2-S4 | M11 S1; M15 S2 |
| Resistors in series/parallel; same/divided voltage/current | M7 mission-log worked circuit and M15 S2 graded mapping | M13 S4 |
| RC charging/discharging, `τ=RC`, `5τ` | M13 S1-S2 | M14 S3; M15 S2 |
| Magnetic force `qv×B`, `IL×B`, no work, circle/helix, mass-spectrometer `q/m` | M8 S1,S3 | M14; M15 S2 |
| Parallel-wire force and attraction/repulsion | M11 S2 | M14 S3 |
| Ampere law; straight wire, loop center, solenoid, toroid; right-hand directions | M8 S1-S2 | M10 S1; M11 S2; M15 S2 |
| Magnetic flux, Faraday, Lenz, induced current | M9 S1-S4 | M12 S2-S4; M14 S3 |
| Motional emf, changing-B emf, rotating-loop AC | M9 S2 | M15 S2 |
| Self/mutual inductance, RL growth, magnetic energy | M10 S1-S4 | M12; M13 S4; M14 |
| LC frequency, RLC damping, ideal transformer | M13 S4 | M15 S2 |
| Maxwell I–IV, no monopoles, displacement current, E/B feedback and waves | M11 primer; M14 primer; M15 S2 | M14 S2-S3 |
| Electric/magnetic energy density and Poynting vector | M6 S3; M14 S2 | M15 S2 |
| Symbolic-first FRQ workflow, direction/sign/unit checks, multi-part reasoning | All 20 DERIVE boards | M14-M15 integrated decisions |

The only sheet material not modeled as its own gameplay mechanic is exam time management (“scan all four FRQs,” “about 25 minutes each,” and skip/return). It is an assessment strategy rather than E&M content; the campaign instead records symbolic steps, rules, units, and reasoning on every DERIVE.

---

## DERIVE and format audit

## DERIVE ledger — exactly 20/60

| Mission | DERIVE stops and major result |
|---:|---|
| 1 | S2 vector superposition |
| 2 | S1 infinite-sheet Gauss field; S3 conductor-backed layer density |
| 3 | S1 field-to-potential integral; S3 sampled-profile integral |
| 4 | S2 conductor curvature field ratio |
| 5 | S1 parallel-plate capacitance; S3 Marx series/parallel equivalent |
| 6 | S1 capacitor energy from work; S3 electric energy density |
| 7 | S2 Kirchhoff junction result |
| 8 | S2 long-wire field from Ampere law |
| 9 | S1 nonuniform-flux induction; S3 numerical induced emf |
| 10 | S1 solenoid inductance; S3 resistive plus inductive bond voltage |
| 11 | S2 magnetic field and parallel-wire force |
| 12 | S2 mutual-inductance prediction |
| 13 | S2 RC exponential response |
| 14 | S2 Poynting vector |
| 15 | none; finale retrieves rather than introduces |

Total DERIVE = 20. The format cap is `round(60/3)=20`; therefore the campaign is at, and does not exceed, the one-third limit. No DERIVE is converted into a decorative multiple-choice question: each grades an ordered expression and the rule that licenses it.

## Full format mix

| Format | Count | Format | Count |
|---|---:|---|---:|
| DERIVE | 20 | PROTOCOL | 5 |
| DIAGNOSIS | 4 | VERIFY | 4 |
| CONTROL | 3 | STRESS | 3 |
| ATTEST | 3 | BALLPARK | 3 |
| CHOICE | 2 | RESIDUAL | 2 |
| SWEEP | 2 | TRIGGER | 2 |
| TRACE | 1 | VALUE | 1 |
| DEGENERACY | 1 | BALANCE | 1 |
| PROPAGATE | 1 | PROBE | 1 |
| SCIENCETANK | 1 | **Total** | **60** |

No suspended `STACK` format is used. Decision formats occur at people; calculations occur at boards/benches; operated formats occur at fixtures. No format other than DERIVE approaches the cap.

---

## Validation audits

## Throughline audit

Each mission's final stop produces the exact decision promised in sentence four: rule, layer model, voltage interval, tip verdict, bank analog, reduced-shot authorization, independence verdict, coupling plausibility, loop prediction, bond certificate, current path, reroute verification, recorder qualification, integrated reproduction, and final certification. After Stop 1, every setup begins from or explicitly depends on the preceding result. Every outcome starts `Mission decision:` and exposes the consequence that creates the next mission.

## Story audit

- Twist 1 (M7 shared reference) is planted by M1's close agreement and reinforced in M2-M3.
- Twist 2 (M11 conduit current) is planted by the missing shunt current and the April bond record.
- Twist 3 (M14 rack-local loop) follows an apparent main-reroute victory and is planted by location-specific card damage.
- Every clue remains objectively true after reinterpretation.
- Correct science sometimes gives bad news: M7 decertifies data, M11 closes the station path, and M14 finds a residual hazard.
- The finale adds no new major concept and makes the player's integrated judgment decisive.

## Location audit

- M1-M4 use exactly one area each.
- M5-M10 use exactly two areas each, with evidence-triggered travel.
- M11-M15 use exactly three areas each.
- The distant outstation is first visited after M4.
- No sightseeing, greeting, or location-race warm-up is authored.

## Dedicated action-clarity and format-payload audit

Audit procedure: inspect each stop against the current canonical entry for its named format in `QUESTION_TYPES(3).md`, then compare the mapped object with the repository importer/schema. Do not accept prose that describes an intended interaction when the required data are absent from the payload. The documentation-level checks below pass; importer execution remains the final external gate.

- Numerical prompts expose inputs, constants, units, requested units, keyed values, and inclusive tolerances.
- All four VERIFY stops state prediction/commitment, named operation, fixed quantities, measurements, restoration state, and submitted conclusion. Equipment remains locked until commitment.
- All three CONTROL stops name candidate controls, the chosen change, fixed variables, baseline/response/noise, reversal, restoration, and conclusion.
- The DEGENERACY stop names both `A` and `κ`, their ranges/steps, requires the numeric pair, and then requires the plan choice.
- TRIGGER thresholds are inclusive and committed before readings arrive.
- VALUE, ATTEST, TRACE, BALANCE, DIAGNOSIS, RESIDUAL, PROBE, PROPAGATE, and SCIENCETANK meet the minimum collection/budget/truth requirements stated in the format guide.

### Mandatory shipping gates against `QUESTION_TYPES(3).md`

| Gate | Authored count | Shipping test | Result in this bible |
|---|---:|---|---|
| One canonical type per lesson | 60 | Exactly 60 stops and one format token per stop | PASS |
| DERIVE cap | 20 | `20 ≤ round(60/3)=20`; every line grades expression plus licensing rule | PASS at cap |
| CHOICE | 2 | Exactly four distinct item objects; correct label present verbatim; one specific rebuttal for each of three wrong IDs; no slash-joined pseudo-options | PASS; both payloads expanded |
| PROBE | 1 | Every station has observed reading, station-specific expected reading, tolerance, load limit, and explicit comparison; correct break location keyed | PASS; six of six stations complete |
| VERIFY | 4 | Numerical prediction must be committed before control unlock; then named operation, fixed variables, measurements, restoration state, and conclusion | PASS: commitments `0.00 kV/m`, `-1.10 kV`, `90 V`, `180 V` |
| CONTROL | 3 | One named causal change; all fixed variables stated; baseline, changed-state, and restored measurements timed; restoration and remeasurement required | PASS: reference C, conduit test link, card-E twist |
| DEGENERACY | 1 | Exactly two named controls with min/max/step, ≥5 first-locus points, ≥3 second-locus points, tolerance, physical constraint, numeric truth pair, and plan | PASS: `A` and `κ`; pair `(2.0×10^8 m²,1.00)` |
| SWEEP | 2 | Every available inspected setting has a response; prompt forbids guessing an unmeasured point | PASS |
| TRACE | 1 | Five channels, named upstream resource, four dependent and one independent | PASS |
| DIAGNOSIS | 4 | Headline, ≥3 zones including quiet evidence, candidates with mechanisms, one key | PASS |
| ATTEST | 3 | ≥4 claims, numeric limit, critical unbacked claim before checks, not all initially backed | PASS |
| VALUE | 1 | Positive budget, ≥4 costed options, required evidence, total cost above budget | PASS |
| SCIENCETANK | 1 | 100-point pool, proposals/evidence/constraints, recommended causal allocation ≥60 | PASS |
| RESIDUAL | 2 | Complete residual fields and keyed pattern-based conclusion | PASS |
| TRIGGER | 2 | Rule, scale, anchors, objective, direction, consequence limit; thresholds committed before reveal | PASS |
| ALLOCATE | 0 | No ALLOCATE authored; SCIENCETANK carries the final 100-point proposal decision | Not applicable |
| Suspended STACK | 0 | Importer must see no STACK stop | PASS |

### Quantitative-card shipping gate

There are 20 DERIVE and 3 BALLPARK calculation cards, plus quantitative operated/decision cards. Every such card exposes, either directly in its prompt or in the immediately visible data/payload on the same card: all numbers, constants and conversion factors; units on inputs; the governing equation or previously recorded relationship; the requested output unit; the submission type; keyed result; inclusive tolerance; and worked arithmetic in `answerText`. A reference such as “displayed values” is buildable only because the exact displayed values are enumerated in that stop's payload; implementation must render them on the card.

### Violations found and fixed in this QA pass

1. M14S4 originally listed only observed station peaks. It now carries six station objects, each with observed voltage, its own expected voltage and tolerance, the `250 V` load, and a written comparison.
2. M3S2 and M4S1 originally compressed choices with slash-separated descriptions. Each now has exactly four distinct item objects and three mechanism-specific rebuttals.
3. Twenty later setup strings were below the 30-word minimum. Their mission-local exact-copy fields now contain normative two-sentence replacements of 30–41 words while retaining the same evidence and decision.
4. Shortened prompt notes were insufficient for direct implementation. The 48 M4–M15 stop chapters now state the exact submission and all interaction phases; M1–M3 were already expanded in place.
5. VERIFY, CONTROL, and DEGENERACY prompts were checked against the new action order. No later control unlocks before a required prediction or parameter commitment.

Repository importer execution remains unavailable; this is the only unrun shipping gate.

## Scientific spot checks

- `ε₀(9.0×10³)=7.97×10^-8 C/m²`.
- `(9.0×10³)(4.0×10⁴)=3.60×10⁸ V`.
- `ε₀A/d=44.27 nF` for `A=2.0×10⁸ m²`, `d=4.0×10⁴ m`.
- `12×½(100 nF)(50.0 kV)²=1500 J`; halving voltage gives `375 J`.
- `μ₀(30 kA)/(2π·2 m)=3.00 mT`.
- `μ₀ℓ ln(b/a)(dI/dt)/(2π)=1.10 kV` for the M9 values.
- `(0.60 μH)(1.5×10⁸ A/s)=90 V`; maximum `(0.70 μH)(3.2×10⁸ A/s)=224 V`.
- `1-e^-1=0.6321`; `1-e^-5=0.9933`.
- `(2.0×10⁴)(1.0×10^-3)/μ₀=1.59×10⁷ W/m²`, not `1.59×10⁴ W/m²`.

M14 S2's keyed Poynting magnitude is **`1.59×10⁷ W/m²`**, matching the visible values and worked arithmetic.

## Metric audit

Exactly four bars exist, every loss is tied to a visible event, 0% restores the mission snapshot, and the canonical path reaches `100/100/100/100`. The final action remains blocked until all limits pass, the report is signed, and all four bars reach 100. Required pauses do not consume timer time.

## Accessibility/readability audit

Color always has text or icon reinforcement. Essential results enter the mission log. Glossary terms use one-line definitions; equation primers contain only equation, purpose, symbols, and campaign reason. Briefings are four sentences and 30–70 words; all question setups are authored as two-sentence, 30–45-word mission-local exact copy. Closing copy uses short concrete sentences. A production build must still run the repository's actual word-count, sentence-count, grade-level, schema, and importer validators.

---

# 13. Suggested YAML assembly order

1. Preserve existing Station 12 theme assets, place IDs, fixture IDs, sightlines, and day gates.
2. Replace or reorder the mission list into the 15 missions and 60 globally numbered lessons in this bible.
3. Implement DERIVE line/rule grading and the base decision formats first; verify answer and feedback parity.
4. Implement operated formats in mission order so prediction locks, fixture unlocks, measurements, restoration, and state outputs remain causal.
5. Add `takesAsRead`, evidence flags, beat triggers, dialogue conditions, metric deltas, report-piece updates, and persistent world changes.
6. Import with `node tools/import-book.mjs books/groundtruth.yml groundtruth --verify` and fix schema failures without flattening operated formats into CHOICE.
7. Run the repository's trap, lesson, location-parity, glossary, readability, right-first, and wrong-first suites.
8. Confirm Stop 60 is the final educational gate and the signed-report payoff begins immediately afterward.

## Recommended content object shape

Use the repository's live schema; this is a semantic checklist rather than a replacement schema:

```yaml
- group: MAST
  task: player-facing action
  title: short dramatic title
  at: exact-fixture-id
  reason: exact player-facing reason this stop is needed now
  concept: narrow AP Physics C concept
  keystone: recurring K1-K12 concept
  learningRole: INTRODUCE | PRACTICE | RETRIEVE | COMBINE | TRANSFER
  takesAsRead: [earlier concept labels]
  scene: exactly two short sentences, 30-45 words total
  storyScienceConnection: one clear sentence
  format: CANONICAL_FORMAT
  question: exact player prompt with submission type and units
  # complete canonical format-specific interaction object here
  answerText: exact result shown after grading
  why: mechanism explanation
  wrongPathFeedback: actionable retry guidance
```

Do not author `guide`, `background`, or `takeaway` fields on question cards.

# 14. Final handoff checklist

The sole external completion gap is repository validation: the repository containing `engine/content/normalize.js`, the theme books, and `tools/import-book.mjs` was not supplied. Before shipping, run import, traps, lessons, location parity, glossary dependency, readability, right-first, and wrong-first tests. Preserve all fixture IDs and day gates from `groundtruth.txt`; do not move the outstation or block the spawn-to-mast sightline.

- [x] 15 missions and 60 globally numbered graded stops.
- [x] Exactly one canonical interaction type per stop.
- [x] Exactly 20 DERIVE stops, at the one-third cap, with expression-and-rule grading.
- [x] One/two/three-location escalation preserved.
- [x] All three reversals have multiple earlier clues and reinterpret objectively true evidence.
- [x] Each mission ends with the decision promised in its briefing.
- [x] Every mission contains compact glossary entries and clean equation primers.
- [x] Both CHOICE stops contain four distinct items and option-specific wrong-path rebuttals.
- [x] The PROBE contains observed and station-specific expected values, a load limit, and comparisons for all six stations.
- [x] VERIFY, CONTROL, and DEGENERACY prompts meet the current action-order and submission rules.
- [x] Numerical prompts expose inputs, constants, equations, units, requested units, results, and tolerances.
- [x] Stop 60 is the final graded interaction; certification is story payoff, not another quiz.
- [ ] Run the actual repository importer and automated play suites when the game repository is available.

**Canonical ending line:** “A reading earns trust only when we can say what made it.”
