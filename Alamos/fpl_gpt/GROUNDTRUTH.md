**FIRST PERSON LEARNING**

**Player-copy editing rule:** Within each displayed passage, state each fact, equation, variable definition, and instruction once. Integrate new givens into the existing wording; do not append a paraphrase of the setup. A source panel may repeat essential inputs so it stands alone, but render it as its own surface rather than concatenating it with the question setup. Go Deeper questions must still supply their own context and data without referring to earlier cases.

**GROUND TRUTH**

AP Physics C: Electricity and Magnetism Campaign Implementation Bible

**15 missions | 60 graded stops | Station 12 | Implementation-ready**

**REVISION - HANDBACK 1: SCENES, PERSISTENT WORLD, AND WALKABLE ENDINGS**

### Authored warm-up records

```yaml
warmups:
  - {day: 4, type: follow, title: "FOLLOW THE FIELD REPORT", why: "Bring the verified field profile to the mast desk before the crew compares conductor shapes."}
  - {day: 8, type: hunt, title: "FIND THE CURRENT RECORD", why: "Locate the independent current record needed to test the magnetic-field prediction."}
  - {day: 13, type: canvass, title: "CHECK THE SENSOR RESPONSES", why: "Gather the response-time records before the crew treats matching sensor displays as independent evidence."}
```


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

The central mystery is the loss of the outstation after a week-five lightning shot. The first theory - an excessive ground-voltage rise - is reasonable but incomplete. The player proves that several apparently independent readings shared one reference, then finds a bonded conduit carrying strike current, and finally learns that a safe low-frequency resistance certificate did not characterize microsecond inductive coupling. Every twist reinterprets true earlier evidence.

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

You are the station test lead, which means you trace what burned a remote circuit during a lightning shot. At Station 12, you will use electricity and magnetism to make the call. The last storm window closes in fifteen days. The next crew needs a station it can trust; a clean screen is no use if it missed the dangerous pulse. Director Lena Ortiz hands you the report board and says, “We signed off on that station once already; this time, show me what our tests missed.”

**Opening-card requirement:** The character quote is the final player-visible text on this card; place no explanatory sentence after it. Keep it brief and natural: it should add the speaker’s concern or commitment rather than summarize the preceding setup. Show the whole opening together with one Continue action.



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


### Landmark-only spaces and visible scene objects

These spaces are walkable and ungraded. They never add a required tour, question, or travel cost. Their access follows existing mission access; final routes open only after the completion gate below. Each object remains inspectable after its trigger.

| Space ID | Place | Before | Visible change |
|---|---|---|---|
| `storm-gallery` | Storm Gallery | A thick window looks across the salt flat to the mast. | Clouds approach through the season; after Stop 55 the shot trace remains on the glass-side display, and the final witnessed shot is seen here before certification. |
| `crew-shelter` | Crew Shelter | Named helmets hang beside the crew-clear board. | For each authorized firing, the helmets are stored inside and the crew-clear lamps must pass before the shot. |
| `season-wall` | Season Wall | An empty frame waits beside the damaged outstation photo. | After Stop 32, the bagged-card photo joins it; after Stop 60, the signed last report page fills the frame. |

### Persistent prop and scene contract

The report printer and stored final-shot display are scene components of `record-desk`; they never launch a fresh shot.

Each mission below declares one Physical aftermath with a home in the existing fixture table. Its dated prop occupies its own place on that fixture; later pages never erase earlier evidence. All scene actions fire once from the accepted stop, persist through revisits, and restore from the mission-start snapshot on failure. Replaying a completed stop never repeats an action or grants resources. Labels always include text, not color alone. New observations remain hidden until the relevant measurement; accepted-answer labels appear only after acceptance. No prop change substitutes for the existing grading, timing, or evidence checks.

Ortiz also owns the season deadline: she has promised the field crew a completed test before their last staffed window. At M12 she says, “If we hold, we may lose the season. Put both limits on the board anyway.” M12 is the reduced impulse-bank test, with stage lamps and a visible gap flash, not an invented outdoor rocket shot. M13 displays the missing fast peak against the slow trace. M14 runs the already-authored full shot in its safe sheltered view and reveals 188 V on the main probe beside 310 V at card E. Certification must follow the final witnessed data, so the last rocket fires before Stop 60 and its physical aftermath persists after acceptance. This deliberately resolves the handback’s suggested post-certification firing without certifying an unseen test.

## 4. Character bible

| Character | Role and first entrance | Wants | Blind spot | Domain and decision use | Arc and verbal habit |
|---|---|---|---|---|---|
| Dr. Lena Ortiz (she/her; Ortiz) | `SHOT` division director; stops a launch while crew-clear lights disagree | A defensible final shot and signed report | Treats established procedure as independent evidence | Thresholds, uncertainty, authorization; TRIGGER, VALUE, ATTEST | Accepts that a procedure must be tested at the right timescale. “What would make us stop?” |
| Ravi Sen (he/him; Ravi) | `FIELD` division scientist; opens the reference mill while rain reaches the flat | Preserve usable storm data | Trusts agreement among four mills | Electrostatics, Gauss, potential; DERIVE, SWEEP, TRACE | Learns shared agreement can share one error. “What does the field permit us to claim?” |
| Elise Strand (she/her; Strand) | `BANK` division impulse engineer; keeps the earthing stick on the Marx bank | Reproduce the strike without wasting hardware | Treats bank energy as the main hazard | Capacitance, dielectrics, Marx bank, energy; DERIVE, VERIFY | Expands safety from stored energy to coupling. “Count where the energy can go.” |
| Marcus Tate (he/him; Tate) | `MAST` division engineer; checks a hot bond rather than defending his drawings | Keep the mast and bonds serviceable | Assumes a low-resistance bond is harmless | Current paths, magnetism, force, inductance; CONTROL, DIAGNOSIS | Reports the conduit path openly and redesigns it. “Which path carried it?” |
| Noor Haddad (they/them; Noor) | `SCREEN` division data and safety analyst; compares raw timestamps before summaries | Preserve traceable, independent evidence | Can delay action while seeking perfect certainty | Measurement independence, residuals, bandwidth, uncertainty; TRACE, STRESS, PROPAGATE | Learns to define sufficient evidence before a shot. “Independent of what?” |
| Saira Malik (she/her; Saira) | `EARTH` division earthing specialist; verifies each bond at the trench | Keep surge current on the intended low-impedance path | Initially trusts DC resistance as a complete certificate | Earthing, bond inductance, and pulse paths; CONTROL, DIAGNOSIS | Separates steady resistance from transient impedance. “At what timescale?” |
| Owen Park (he/him; Owen) | `COUPLE` division remote-systems engineer; opens the outstation cable bay | Protect remote electronics without hiding inconvenient damage | Initially blames local cards before tracing the incoming loop | Inductive coupling, cable geometry, and card damage; PROBE, VERIFY | Learns to test the full source-path-receiver chain. “Where did the loop close?” |

All first mentions in each mission repeat the working role. Named reactions occur in world beats, never on system-owned outcome cards.

---

## 5. Character direction and dialogue rules

Ortiz speaks in thresholds and consequences; Ravi speaks in claims permitted by fields; Strand counts stored energy and hardware state; Tate asks which physical path carried current; Noor asks whether evidence is independent. No character recites a lecture that a fixture or mission card can show. Correct and incorrect attempts change their immediate reaction, not the campaign's evidence order.

Required dialogue is delivered through nearby or radio bubbles in the normal player view. While a required bubble is open, pause the timer, advance with one Continue action, write the completed line to the mission log, then restore movement. System-owned outcome cards contain no named-character speech.

### Campaign metrics and recovery economy

| Bar | Category | Start | Meaning | Rises when | Falls when | 0% consequence | Lock |
|---|---|---:|---|---|---|---|---|
| Report Certainty | primary objective | 20% | Fraction of the causal report supported by reproducible evidence | A report piece survives an independent test | A claimed channel loses independence | Report is rejected; restore mission snapshot | Locks at 100 after the signed M15 report |
| Crew Clearance | secondary requirement | 80% | Confidence that launch and shelter rules protect people | A precommitted threshold is verified | A new unbounded field/current path appears | Evacuate and restore mission snapshot | Locks at 100 after M15 dry-run and final shot |
| Shot Reserve | operational reserve | 60% | Rockets, igniters, bank capacity, and storm opportunities remaining | Supplies are conserved or a low-energy test substitutes | A named launch/test consumes stock | No final validation shot; restore snapshot | Locks at 100 when M15 report accepts remaining reserve |
| Station Integrity | system integrity | 70% | Mast, bank, records, grounding, and outstation condition | A fault is isolated or repaired | A named overload/damage event occurs | Station closes; restore snapshot | Locks at 100 after M15 post-shot inspection |

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


## 7.1 Persistent world-state ledger

| Mission | Accepted trigger | Home fixture | State that persists | Next visible problem |
|---|---|---|---|---|
| 1 | `accepted_stop_4` | `launch-board` | Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key. | At `storm-profile-board`, rain beads on a cloud-layer sketch beside the mill readings. |
| 2 | `accepted_stop_8` | `storm-profile-board` | Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip. | At `shunt-rack`, a voltage sketch lies beside three shunt leads and an empty fourth hook. |
| 3 | `accepted_stop_12` | `shunt-rack` | Marcus Tate clips the 250 TO 378 MV model card to the shunt rack. | At `mast-desk`, the copper tip model catches light beside a trailer damage photo. |
| 4 | `accepted_stop_16` | `mast-desk` | Marcus Tate pins the TIP EFFECT INCOMPLETE finding beside the mast drawing. | At `hall-board`, twelve numbered stages stand behind the rail below a cloud sketch. |
| 5 | `accepted_stop_20` | `hall-board` | Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram. | At `gap-row`, the earthing stick rests on the bank while the stage lamps stay dark. |
| 6 | `accepted_stop_24` | `gap-row` | Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale. | At `reference-panel`, four matching screen traces meet at one exposed reference wire. |
| 7 | `accepted_stop_28` | `reference-panel` | Noor Haddad ties a SHARED REFERENCE tag around the common feed. | At `trailer-cards`, a burned card lies under glass beside an unmarked cable jacket. |
| 8 | `accepted_stop_32` | `trailer-cards` | Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label. | At `loop-bench`, a trench plan lies under a ruler laid along the hidden cable turn. |
| 9 | `accepted_stop_36` | `loop-bench` | Saira Malik pins the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip to the loop plan. | At `earth-cert`, the April certificate hangs beside a new sharp voltage trace. |
| 10 | `accepted_stop_40` | `earth-cert` | Saira Malik stamps the April certificate STEADY TEST ONLY. | At `strike-ledger`, two current totals leave a red gap on the strike ledger. |
| 11 | `accepted_stop_44` | `strike-ledger` | Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch. | At `record-desk`, a sealed prediction sits beside the reduced-test recorder. |
| 12 | `accepted_stop_48` | `record-desk` | Dr. Lena Ortiz clips the 90 V PREDICTED / 92 V MEASURED strip into the report. | At `recorder-rack`, a narrow peak stands above a slow trace that barely moves. |
| 13 | `accepted_stop_52` | `recorder-rack` | Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack. | At `trailer-cards`, a fresh strike trace ends at 188 V beside a second strip marked 310 V. |
| 14 | `accepted_stop_56` | `trailer-cards` | Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label. | At `record-desk`, the repaired card rack waits beside the blank last report page. |
| 15 | `accepted_stop_60` | `record-desk` | Dr. Lena Ortiz clips the witnessed final-shot record into the season report. | At `record-desk`, the signed operating conditions remain beside the final status. |

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


## 8.1 Final playable scene and ending card

**Completion gate:** accepted_stop_60 AND every existing final scientific/evidence requirement AND the existing final metric target. Acceptance arms the scene; if metric allocation is still required, play it once that allocation passes. A wrong answer, missing proof, or failed check never starts the success animation.

**One visible change:** The final report printer feeds its signed last page beside the live shot traces.

**The next sixty seconds:** The final witnessed shot runs between accepted_stop_59 and activation of Stop 60 after every existing launch safeguard passes. From the sheltered gallery view, a rocket rises along its wire, the channel joins the mast tip, and the fast recorders light; all values are the authored Stop 60 evidence. After accepted_stop_60: 0–15 seconds, the report prints; 15–40 seconds, the player can walk to the gallery and inspect the same captured shot and storm; 40–60 seconds, Ortiz files the page and the ending card appears. No second launch is made for spectacle.

**Ending card - exact player copy:** Thunder reaches the gallery after the flash. The final shot trace stays inside the posted limits. Ortiz clips the last page into the report, with the old burned-card photo beside it. The next crew has a tested station and a record of what once went wrong.

**Delivery:** Keep player control and normal world view. No new graded stop follows the final accepted decision. The ending card appears after the player reaches the payoff view, or through an accessible View ending control that skips movement without skipping any scientific gate. Optional review and worked examples remain available through the completed mission menu.


### Standalone Go Deeper question contract

Each optional review question must work when copied out on its own. Supply its setting, givens, units, definitions, and any required figure within that question. Do not mention a mission title, a prior case, a teammate rechecking earlier work, a completed plan, or unseen cards, observations, or results. Do not assume that another review question was read. Choices, hints, and feedback obey the same rule. Use brief conceptual questions or complete applied problems; figures must match the question rather than merely share its course.

# Mission 1 - Write the Stop Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 1 - 15 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Write the Stop Rule  
**Go now:** Go to Launch Control and meet Dr. Lena Ortiz, station director, at the launch board.  
**Card body:** 15 days until the last storm window closes. One crew-clear lamp disagrees with the others beneath the red hold bar. Today you decide which two checks permit a shot.
**Objective:** Commit a numerical field threshold and a disagreement rule before launch data appear.

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
  - id: groundtruth_m01_we01
    title: Force per charge
    problem: A positive test charge q=2 μC experiences force F=6 mN rightward. Find the electric field.
    rule: E=F/q; μC means 10^-6 C and mN means 10^-3 N.
    steps:
    - 'Set up the relationship: E=F/q; μC means 10^-6 C and mN means 10^-3 N.'
    - E=(6×10^-3)/(2×10^-6)=3000 N/C rightward.
    answer: The field is 3000 N/C to the right.
    common_mistake: The field direction is defined by force on a positive test charge.
  - id: groundtruth_m01_we02
    title: Force on negative charge
    problem: A charge q=-2 μC is in a field E=3000 N/C rightward. Find its force, right positive.
    rule: F=qE.
    steps:
    - 'Set up the relationship: F=qE.'
    - F=(-2×10^-6)(3000)=-0.006 N=-6 mN.
    answer: The force is 6 mN to the left.
    common_mistake: A negative charge feels force opposite the electric field.
  - id: groundtruth_m01_we03
    title: Add signed fields
    problem: Two sources produce horizontal fields +400 and -100 N/C at a point. Find the net field.
    rule: Electric fields add as vectors; along one axis use signs.
    steps:
    - 'Set up the relationship: Electric fields add as vectors; along one axis use signs.'
    - E_net=400-100=+300 N/C.
    answer: The net field is 300 N/C in the positive direction.
    common_mistake: Add components, not their unsigned magnitudes.
  - id: groundtruth_m01_we04
    title: Electric force between charges
    problem: Two 1 μC point charges are separated by 1 m. Use k=9×10^9 N m²/C². Find force magnitude.
    rule: F=k|q1q2|/r².
    steps:
    - 'Set up the relationship: F=k|q1q2|/r².'
    - F=(9×10^9)(10^-6)(10^-6)/1²=0.009 N.
    answer: The repulsive force is 9 mN because both charges are positive.
    common_mistake: The distance is squared; microcoulombs must be converted to coulombs.
  - id: groundtruth_m01_we05
    title: Double a charge separation
    problem: Point-charge field magnitude is E at distance r. What is it at 2r for the same charge?
    rule: Point-charge field E=k|q|/r².
    steps:
    - 'Set up the relationship: Point-charge field E=k|q|/r².'
    - E_new/E_old=r²/(2r)²=1/4.
    answer: The field becomes one quarter as large.
    common_mistake: Doubling distance does not merely halve an inverse-square field.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Electric charge: a property of matter that creates electric force; like signs repel and unlike signs attract. Electric field: force per positive test charge, measured in newtons per coulomb or volts per metre. Superposition: add each source's field as a vector to obtain the net field.

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

**Trigger:** mission_1_arrival.

**World state:** One crew-clear lamp disagrees with the others beneath the red hold bar.

**Panel/HUD text:** MISSION 1: FIX THE SIGNS OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "The green lights disagree about what upward means. Write one rule before the cell reaches us."

**Unlocks/waypoint:** Unlock Stop 1 at `radar-desk` in Launch Control.

**Beat 2 - After Stop 1 | `launch-board` | automatic**

**Trigger:** accepted_stop_1.

**World state:** At `radar-desk`, the dated accepted-result slip for Stop 1 reads: "Mapping above, exact labels.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The normalized readings need an independent layer-model prediction before they can support a launch criterion."

**Unlocks/waypoint:** Unlock Stop 2 at `launch-board` in Launch Control.

**Beat 3 - After Stop 2 | `launch-board` | automatic**

**Trigger:** accepted_stop_2.

**World state:** At `launch-board`, the dated accepted-result slip for Stop 2 reads: "-4.5 kV/m, exact line/rule pairs.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** SIGNED FIELD = VECTOR SUM

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The layer prediction is ready, but calibration uncertainty could still explain the difference between channels."

**Unlocks/waypoint:** Unlock Stop 3 at `launch-board` in Launch Control.

**Beat 4 - After Stop 3 | `launch-board` | automatic**

**Trigger:** accepted_stop_3.

**World state:** At `launch-board`, the dated accepted-result slip for Stop 3 reads: "Single-field model survives; observed pair spread 0.20 kV/m ≤ 0.50 kV/m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Noor Haddad: "Exactly right. Agreement helps only if the channels are independent."

**Unlocks/waypoint:** Unlock Stop 4 at `launch-board` in Launch Control.

**Beat 5 - At mission end | `radar-desk` | automatic**

**Trigger:** accepted_stop_4.

**World state:** At `launch-board`, Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Dr. Lena Ortiz: "A deadline does not get its own launch key. But Ravi's four mills agree too neatly; he must bound what the storm field actually says before Ortiz trusts them."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m01

**Home:** `launch-board`. **Before:** The dated mission-1 evidence holder at this fixture has no accepted record. One crew-clear lamp disagrees with the others beneath the red hold bar.
**After — exact action:** Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key.
**Trigger:** accepted_stop_4. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `storm-profile-board`, rain beads on a cloud-layer sketch beside the mill readings.
**Segue - exact player copy:** But Ravi's four mills agree too neatly; he must bound what the storm field actually says before Ortiz trusts them.

## Location plan

One location, SHOT; all evidence is on the launch board and radar desk, so no travel is justified.

## Characters and dramatic beat

Ortiz wants a usable rule but will not let live data choose it; Noor plants the independence question.

## Key concepts, explained here

Electric field is a vector. A signed component says direction, while its magnitude says strength. Superposition and an uncertainty band turn several readings into one falsifiable safety rule.

## Four graded stops

## Stop 1 - Fix the signs

**Format/placement:** PROTOCOL, at `radar-desk`.

**Metadata:** Concept: 2 - field direction/sign; Keystone: K1,K12; Area: Remote Outstation; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** The launch board cannot compare channels until their opposite sign conventions are reconciled.

**Question card story setup - exact player copy:** Two field mills label upward as positive, while two old channels label downward as positive. Convert all four readings to the station rule so the launch board compares physical directions rather than printed signs.

**Question card story-science connection - exact player copy:** A common vertical sign convention lets the crew distinguish a real field disagreement from differently labeled instruments.

**Question card prompt - exact player copy:** Match each printed reading to its signed value under the displayed rule “upward is positive”; submit four matches in kV/m.

**Complete format-specific interaction block:** `scenarios=[A:+4.2 old_down_positive,B:-4.1 old_down_positive,C:-4.3 new_up_positive,D:-4.2 new_up_positive]`; `choices=[-4.2,-4.1,-4.3,-4.2 kV/m upward-positive]`; `mapping=[A→-4.2,B→+4.1,C→-4.3,D→-4.2]`.

**Correct result:** Mapping above, exact labels.

**Answer text:** Reverse the sign only for old downward-positive channels; the physical arrows do not change.

**Why:** A sign convention changes labels, not the actual direction of the field.

**Wrong-path feedback:** You changed a magnitude or reversed a new channel; use the convention label once per channel.

**State/output:** Normalized values enter the board; unlock S2.

## Stop 2 - Derive the net field

**Format/placement:** DERIVE, at `launch-board`.

**Metadata:** Concept: 2 - vector superposition; Keystone: K1; Area: Field Station; Learning role: INTRODUCE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** The normalized readings need an independent layer-model prediction before they can support a launch criterion.

**Question card story setup - exact player copy:** At the sensor, the upper cloud layer contributes E_1y = -3.0 kV/m and the lower layer contributes E_2y = -1.5 kV/m. Both contributions point downward, the negative vertical direction.

**Question card story-science connection - exact player copy:** The combined vertical field supplies the predicted crew-height exposure against which the field mills will be checked.

**Fixture source panel - exact player copy:** At the sensor, the upper cloud layer contributes E_1y=-3.0 kV/m and the lower layer contributes E_2y=-1.5 kV/m. Both point downward, the negative vertical direction.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the signed field in kV/m.

**Complete format-specific interaction block:** `lines=[{expression:E_y=E_1y+E_2y,rule:superposition,decoys:[E_y=|E_1|+|E_2|,E_y=E_1yE_2y]},{expression:E_y=(-3.0)+(-1.5) kV/m,rule:substitute_signed_components,decoys:[3.0-1.5,3.0+1.5]},{expression:E_y=-4.5 kV/m,rule:arithmetic_and_direction,decoys:[+4.5,-1.5]}]`.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `E_y=|E_1|+|E_2|`
2. `E_y=3.0−1.5 kV/m`
3. `E_y=+4.5 kV/m`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, one correct line and one plausible common-mistake line.

```yaml
derive:
  givens: ["E_1y = -3.0 kV/m, upper-layer contribution at the sensor", "E_2y = -1.5 kV/m, lower-layer contribution at the sensor", "Negative vertical field points downward."]
  start: "Use signed vertical components; downward is negative."
  goal: "Find the net vertical field in kV/m."
  left_side: "E_y"
  steps:
    - id: step_1
      doing: "apply vector superposition"
      candidates:
        - {text: "E_y=E_1y+E_2y", correct: true, rule: "superposition"}
        - {text: "E_y=|E_1|+|E_2|", correct: false, survives: true, rule: "add magnitudes", reason: "A common sign-convention error keeps the magnitudes but discards their downward direction."}
    - id: step_2
      doing: "substitute signed components"
      candidates:
        - {text: "E_y=(-3.0)+(-1.5) kV/m", correct: true, rule: "substitute signed components"}
        - {text: "E_y=3.0-1.5 kV/m", correct: false, survives: true, rule: "mix signed and unsigned values", reason: "A common bookkeeping mistake changes one sign after normalization."}
    - id: step_3
      doing: "add and retain direction"
      candidates:
        - {text: "E_y=-4.5 kV/m", correct: true, rule: "arithmetic and direction"}
        - {text: "E_y=+4.5 kV/m", correct: false, survives: true, rule: "report magnitude as signed value", reason: "A common final-step error calculates the magnitude correctly but restores the wrong direction."}
```

**Correct result:** `-4.5 kV/m`, exact line/rule pairs.

**Answer text:** Both contributions point downward, so their signed components add to `-4.5 kV/m`; magnitudes alone would hide direction.

**Why:** Vector addition determines whether layer fields reinforce or cancel at crew height.

**Wrong-path feedback:** Superposition adds vectors component by component; keep each sign through substitution.

**State/output:** `MODEL FIELD -4.5 kV/m` appears; unlock S3.

## Stop 3 - Bound the disagreement

**Format/placement:** STRESS, asked by Dr. Lena Ortiz beside `launch-board`.

**Metadata:** Concept: 30 - uncertainty/range; Keystone: K12,K1; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the launch board in Launch Control.

**Stop reason - exact player copy:** The layer prediction is ready, but calibration uncertainty could still explain the difference between channels.

**Question card story setup - exact player copy:** With the predicted field fixed at -4.5 kV/m, four channels read -4.1, -4.2, -4.2, and -4.3 kV/m. Test whether calibration uncertainty can hide an unsafe disagreement.

**Question card story-science connection - exact player copy:** The range of corrected field readings determines whether one physical field can explain all four instruments.

**Question card prompt - exact player copy:** Move the allowed calibration offset from -0.20 to +0.20 kV/m, inspect both explanations, and submit the conclusion that survives the full range.

**Complete format-specific interaction block:** `stress={assumption:per_channel_calibration_offset_kVpm,min:-0.20,max:0.20,step:0.05,candidates:[single_field,one_failed_channel],criterion:max_pair_spread<=0.50,correct:single_field_survives}`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 3 - Bound the disagreement"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move the allowed calibration offset from -0.20 to +0.20 kV/m, inspect both explanations, and submit the conclusion that survives the full range."
  payload: "`stress={assumption:per_channel_calibration_offset_kVpm,min:-0.20,max:0.20,step:0.05,candidates:[single_field,one_failed_channel],criterion:max_pair_spread<=0.50,correct:single_field_survives}`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "per-channel calibration offset", min: -0.2, max: 0.2, nominal: 0.0, step: 0.05, unit: "kV/m"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.0, max: 0.0}
      failsAt: 0.2
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.0, max: 0.2}
      failsAt: -0.2
    - id: robust_plan
      label: "Single-field model survives; observed pair spread `0.20 kV/m ≤ 0.50 kV/m`."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: -0.2, max: 0.2}
  robust: robust_plan
  question: "Move the allowed calibration offset from -0.20 to +0.20 kV/m, inspect both explanations, and submit the conclusion that survives the full range."
```

**Correct result:** Single-field model survives; observed pair spread `0.20 kV/m ≤ 0.50 kV/m`.

**Answer text:** All four readings remain mutually consistent within the campaign's calibration bound, though this does not prove independence.

**Why:** A safe average does not prove that every sensor is consistent with the same field.

**Wrong-path feedback:** Compare the largest and smallest channels; do not compare only each reading with the mean.

**State/output:** Agreement clue logged; unlock S4.

## Stop 4 - Commit the criterion

**Format/placement:** TRIGGER, at `launch-board`.

**Metadata:** Concept: 30 - precommitted threshold; Keystone: K12,K1; Area: Remote Outstation; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** The next storm update must be judged by limits agreed before anyone sees its readings.

**Question card story setup - exact player copy:** Commit both limits now, before the next field update appears on the board.

**Question card story-science connection - exact player copy:** The field-magnitude and channel-spread limits jointly determine whether the crew-clear board may display GO.

**Question card prompt - exact player copy:** Enter 5.0 kV/m as the inclusive magnitude limit and 0.50 kV/m as the inclusive channel-spread limit; submit the two-part GO rule, then reveal the new readings.

**Complete format-specific interaction block:** `trigger={decision_rule:"GO only if |E_vertical|≤5.0 kV/m AND max pair spread≤0.50 kV/m",scale:{min:0,max:8,unit:kV/m},anchors:[4.0,4.8,5.5],objective:crew_clear,direction:lower_is_safer,consequence_limit:5.0,secondary_limit:0.50,correct_rule_id:dual_limit}`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 4 - Commit the criterion"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Enter 5.0 kV/m as the inclusive magnitude limit and 0.50 kV/m as the inclusive channel-spread limit; submit the two-part GO rule, then reveal the new readings."
  payload: "`trigger={decision_rule:\"GO only if |E_vertical|≤5.0 kV/m AND max pair spread≤0.50 kV/m\",scale:{min:0,max:8,unit:kV/m},anchors:[4.0,4.8,5.5],objective:crew_clear,direction:lower_is_safer,consequence_limit:5.0,secondary_limit:0.50,correct_rule_id:dual_limit}`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "vertical electric-field magnitude", min: 0, max: 8, step: 0.1, unit: "kV/m"}
  start: 1.6
  anchors:
    - {at: 1.6, means: "routine baseline, not the decision threshold"}
    - {at: 5.2, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 3.8, hoursLeft: 48}
    - {at: "T-24 h", value: 4.4, hoursLeft: 24}
    - {at: "T-12 h", value: 5.1, hoursLeft: 12}
    - {at: "T-6 h", value: 5.3, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 4.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 5, max: 8}, leadHours: 12}
  question: "Enter 5.0 kV/m as the inclusive magnitude limit and 0.50 kV/m as the inclusive channel-spread limit; submit the two-part GO rule, then reveal the new readings."
```

**Correct result:** Dual limit exactly; revealed `-4.6,-4.7,-4.6,-4.8 kV/m` gives GO.

**Answer text:** The rule protects both physical field magnitude and sensor consistency and was frozen before the outcome.

**Why:** Precommitment prevents a desired launch from moving the safety threshold after evidence arrives.

**Wrong-path feedback:** A one-number rule misses either field danger or channel disagreement.

**State/output:** Report piece 1 filled; M2 activates.

## Mission outcome

Mission decision: Use both limits for every shot. Launch only when the field is at or below 5.0 kV/m in size, and the channel spread is at or below 0.50 kV/m. The present cell passes. The close agreement still needs an independence check.

**Segue - exact player copy:** But Ravi's four mills agree too neatly; he must bound what the storm field actually says before Ortiz trusts them.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Dr. Lena Ortiz clips the FIELD AND CHANNEL-SPREAD LIMITS card above the launch key. But Ravi's four mills agree too neatly; he must bound what the storm field actually says before Ortiz trusts them.

**Story event - exact player copy:** The launch board now blocks every pulse unless both electric-field safety limits pass.

**Metric screen:** `MISSION 1 COMPLETE`; `TIME {elapsed} / TARGET 16:00`; `INCORRECT SUBMISSIONS {n}`; story event `A low-energy field check used one storm window.`; automatic `CREW CLEARANCE +2 | SHOT RESERVE -2`; RP line uses shared formula; prompt `Spend each point to raise one unlocked bar by 1%, or bank it (cap 30).`; QA `12 RP → 22/82/62/76`; failure `Any 0% bar restores the mission-start snapshot.`  


## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A sign convention changes labels, not the actual direction of the field.
- B. A property of matter that creates electric force; like signs repel and unlike signs attract.
- C. Vector addition determines whether layer fields reinforce or cancel at the measurement point.
- D. A safe average does not prove that every sensor is consistent with the same field.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes field direction and sign. It does not answer the question about electric charge.
- B: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- C: This describes vector superposition. It does not answer the question about electric charge.
- D: This describes uncertainty and range. It does not answer the question about electric charge.

### Review question 2


**Prompt - exact player copy:** Which statement best explains field direction and sign?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Vector addition determines whether layer fields reinforce or cancel at the measurement point.
- C. A sign convention changes labels, not the actual direction of the field.
- D. A safe average does not prove that every sensor is consistent with the same field.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for field direction and sign. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about field direction and sign.
- B: This describes vector superposition. It does not answer the question about field direction and sign.
- C: Correct. A sign convention changes labels, not the actual direction of the field.
- D: This describes uncertainty and range. It does not answer the question about field direction and sign.

### Review question 3


**Prompt - exact player copy:** Two electric-field contributions at one point are plotted with upward positive. What is their net vertical field?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Vertical field (kV/m)",
  "caption": "Upward is positive for both contributions",
  "bars": [
    {
      "name": "Field 1",
      "value": -3
    },
    {
      "name": "Field 2",
      "value": -1.5
    }
  ]
}
```

**Options - exact player copy:**

- A. +4.5 kV/m, upward.
- B. -1.5 kV/m, downward.
- C. 0 kV/m.
- D. -4.5 kV/m, downward.

**Correct answer:** D

**Hint - exact player copy:** Add signed components defined on the same axis.

**Option feedback - exact player copy:**

- A: Both contributions are negative in the stated convention.
- B: This subtracts magnitudes even though the fields point the same way.
- C: The contributions are not equal and opposite.
- D: Correct. -4.5 kV/m, downward.

### Review question 4


**Prompt - exact player copy:** Which statement best explains uncertainty and range?

**Options - exact player copy:**

- A. A safe average does not prove that every sensor is consistent with the same field.
- B. A property of matter that creates electric force; like signs repel and unlike signs attract.
- C. A sign convention changes labels, not the actual direction of the field.
- D. Vector addition determines whether layer fields reinforce or cancel at the measurement point.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for uncertainty and range. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A safe average does not prove that every sensor is consistent with the same field.
- B: This describes electric charge. It does not answer the question about uncertainty and range.
- C: This describes field direction and sign. It does not answer the question about uncertainty and range.
- D: This describes vector superposition. It does not answer the question about uncertainty and range.

### Review question 5


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

- A. 1 minute.
- B. 2 minutes.
- C. 3 minutes.
- D. No stop is needed because the average is below 5.

**Correct answer:** B

**Hint - exact player copy:** At least includes equality.

**Option feedback - exact player copy:**

- A: The reading is only 3 units at 1 minute.
- B: Correct. 2 minutes.
- C: Waiting until 3 minutes misses the first qualifying check.
- D: The rule applies to each reading, not the average.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric flux?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. A sign convention changes labels, not the actual direction of the field.
- C. The signed amount of electric field passing through a surface.
- D. Vector addition determines whether layer fields reinforce or cancel at the measurement point.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric flux. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric charge. It does not answer the question about electric flux.
- B: This describes field direction and sign. It does not answer the question about electric flux.
- C: Correct. The signed amount of electric field passing through a surface.
- D: This describes vector superposition. It does not answer the question about electric flux.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 2 - Bound the Layer Charge

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 2 - 14 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Bound the Layer Charge  
**Go now:** Go to the Field Station and meet Ravi Sen, field scientist, at the mill bench.  
**Card body:** 14 days until the last storm window closes. Rain beads on a cloud-layer sketch beside the mill readings. Today you decide what charge the measured field can support.
**Objective:** Infer the effective layer charge from the mill array.

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
  - id: groundtruth_m02_we01
    title: Flux through a flat surface
    problem: A uniform field is 10 N/C. A flat surface has area 2 m² and its outward normal is parallel to the field. Find flux.
    rule: Electric flux Φ=EA cos θ, with θ measured from the surface normal.
    steps:
    - 'Set up the relationship: Electric flux Φ=EA cos θ, with θ measured from the surface normal.'
    - Φ=10(2)cos0°=20 N m²/C.
    answer: The outward flux is +20 N m²/C.
    common_mistake: Use the normal direction, not the angle with the surface itself.
  - id: groundtruth_m02_we02
    title: A tilted surface
    problem: A field E=10 N/C crosses area A=2 m² at 60° to its normal. Find flux.
    rule: Φ=EA cos θ.
    steps:
    - 'Set up the relationship: Φ=EA cos θ.'
    - Φ=10(2)(1/2)=10 N m²/C.
    answer: The flux is 10 N m²/C.
    common_mistake: Projected area, not full area, determines flux when the surface is tilted.
  - id: groundtruth_m02_we03
    title: Infer enclosed charge
    problem: A closed surface has net electric flux Φ=1000 N m²/C. Use ε0≈9×10^-12 F/m. Find enclosed charge.
    rule: Gauss's law gives q_enclosed=ε0Φ.
    steps:
    - 'Set up the relationship: Gauss''s law gives q_enclosed=ε0Φ.'
    - q_enclosed=(9×10^-12)(1000)=9×10^-9 C=9 nC.
    answer: The net enclosed charge is +9 nC.
    common_mistake: The flux of one open face is not automatically the net closed-surface flux.
  - id: groundtruth_m02_we04
    title: Field of an ideal sheet
    problem: An infinite sheet has surface charge density σ=18×10^-9 C/m². Use ε0≈9×10^-12 F/m. Find field magnitude on either side.
    rule: For an isolated infinite sheet, E=σ/(2ε0).
    steps:
    - 'Set up the relationship: For an isolated infinite sheet, E=σ/(2ε0).'
    - E=(18×10^-9)/(18×10^-12)=1000 N/C.
    answer: The field is 1000 N/C, away from this positively charged sheet.
    common_mistake: The isolated-sheet factor 2 differs from the conductor-surface result.
  - id: groundtruth_m02_we05
    title: Zero flux is not zero field
    problem: A closed box contains no net charge but sits in a uniform external electric field. Is its field zero?
    rule: Gauss's law constrains net closed-surface flux, not field at every point.
    steps:
    - Flux enters one side and leaves the opposite side with equal magnitude.
    - Net flux is zero even though the field inside is nonzero.
    answer: Zero enclosed charge does not imply zero electric field.
    common_mistake: Do not infer pointwise field from net flux alone.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first
#### Glossary terms

Electric flux: the signed amount of electric field passing through a surface. Gaussian surface: an imaginary closed surface chosen to match field symmetry. Surface charge density: charge per area, written `σ` and measured in `C/m²`.

#### Primer concepts

- Only charge enclosed by a closed surface contributes to net flux.
- Parallel field contributes zero through a surface; perpendicular field contributes most.
- Station model: the charged cloud base is a wide sheet above conducting ground.

#### Equations first needed today  
**Equation:** `∮E·dA = q_enc/ε₀`; **What it is for:** Relate closed-surface flux to enclosed charge. **Symbols:** `E` field, `dA` outward area element, `q_enc` enclosed charge, `ε₀` permittivity of free space (8.854×10^-12 F/m). **Why this campaign needs it:** It converts ground field into a storm-layer charge estimate.  
**Equation:** `Φ_E=EA cosθ`; **What it is for:** Evaluate uniform flux through one face. **Symbols:** `Φ_E` flux, `A` area, `θ` angle between field and outward normal. **Why this campaign needs it:** The pillbox faces separate contributing and quiet surfaces.

## Main story happening - designer summary
Ravi uses a pillbox model to infer `σ`; the result supports, but does not prove, the direct-overvoltage theory.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**Trigger:** mission_2_arrival.

**World state:** Rain beads on a cloud-layer sketch beside the mill readings.

**Panel/HUD text:** MISSION 2: DERIVE THE SHEET FIELD OPEN

**Dialogue bubbles -** Ravi Sen: "The mill tells us field; Gauss lets us ask what charge could make it."

**Unlocks/waypoint:** Unlock Stop 5 at `mill-array` in Field Station.

**Beat 2 - After Stop 5 | `mill-bench` | automatic**

**Trigger:** accepted_stop_5.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 5 reads: "exact symbolic result.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Ravi Sen: "That check holds. Ravi needs to confirm that the charge-layer calculation counts flux through the correct surfaces."

**Unlocks/waypoint:** Unlock Stop 6 at `mill-bench` in Field Station.

**Beat 3 - After Stop 6 | `mill-array` | automatic**

**Trigger:** accepted_stop_6.

**World state:** At `mill-bench`, the dated accepted-result slip for Stop 6 reads: "as mapped.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 6 RECORDED - STOP 7 OPEN

**Dialogue bubbles -** Ravi Sen: "That check holds. The isolated-sheet calculation must now account for the conducting ground beneath the storm."

**Unlocks/waypoint:** Unlock Stop 7 at `mill-array` in Field Station.

**Beat 4 - After Stop 7 | `mill-array` | automatic**

**Trigger:** accepted_stop_7.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 7 reads: "-7.97×10^-8 C/m², tolerance ±0.04×10^-8.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** σ=-7.97×10^-8 C/m²

**Dialogue bubbles -** Ravi Sen: "That check holds. The inferred charge density needs a spatial check before the crew accepts a uniform storm layer."

**Unlocks/waypoint:** Unlock Stop 8 at `mill-array` in Field Station.

**Beat 5 - At mission end | `mill-array` | automatic**

**Trigger:** accepted_stop_8.

**World state:** At `storm-profile-board`, Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Ravi Sen: "Put a bound on the sky before we put a story in it. Therefore Tate needs the voltage between cloud and ground; a field reading alone will not trace the damage."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m02

**Home:** `storm-profile-board`. **Before:** The dated mission-2 evidence holder at this fixture has no accepted record. Rain beads on a cloud-layer sketch beside the mill readings.
**After — exact action:** Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `shunt-rack`, a voltage sketch lies beside three shunt leads and an empty fourth hook.
**Segue - exact player copy:** Therefore Tate needs the voltage between cloud and ground; a field reading alone will not trace the damage.

## Location plan

FIELD only. The layer geometry, mill readings, and residual map all belong to the same physical array.

## Characters and dramatic beat

Ravi wants the field pattern to support a usable layer model, but he explicitly keeps the larger causal claim provisional.

## Key concepts, explained here

Gauss's law is useful only when symmetry makes the flux integral tractable. A conductor's interior field is zero in equilibrium, and net closed-surface flux depends only on enclosed charge.

## Four graded stops

## Stop 5 - Derive the sheet field

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: 3 - Gauss infinite sheet; Keystone: K2; Area: Field Station; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The crew needs a charge-layer model to explain the field that the mills are measuring.

**Question card story setup - exact player copy:** Derive the field on either side from Gauss's law before inserting measurements.

**Question card story-science connection - exact player copy:** The sheet-field expression links the cloud's charge density to the electric field on each side of the layer.

**Fixture source panel - exact player copy:** Derive the field on either side from Gauss's law before inserting measurements. Build the two-line symbolic derivation and name Gauss's law with planar symmetry

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit E=σ/(2ε₀).

**Complete format-specific interaction block:** `lines=[{2EA=σA/ε0,gauss_plus_two_faces,[EA=σA/ε0,4EA=σA/ε0]},{E=σ/(2ε0),cancel_A,[E=σ/ε0,E=2σε0]}]`.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `EA=σA/ε0, counting only one face`
2. `E=σ/ε0, missing the factor of two`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, one correct line and one plausible common-mistake line.

```yaml
derive:
  givens: ["Derive the field on either side from Gauss's law before inserting measurements.", "Build the two-line symbolic derivation and name Gauss's law with planar symmetry"]
  start: "Apply Gauss's law to a pillbox crossing the sheet."
  goal: "Derive the field magnitude E in terms of σ and ε0."
  left_side: "E"
  steps:
    - id: step_1
      doing: "sum flux through the two active faces"
      candidates:
        - {text: "2EA=σA/ε0", correct: true, rule: "Gauss's law plus two equal faces"}
        - {text: "EA=σA/ε0", correct: false, survives: true, rule: "one-face flux", reason: "A common symmetry mistake overlooks the equal flux through the second face."}
    - id: step_2
      doing: "cancel area and solve for E"
      candidates:
        - {text: "E=σ/(2ε0)", correct: true, rule: "cancel A and divide by two"}
        - {text: "E=σ/ε0, cancelling A but dropping the two-face factor", correct: false, survives: true, rule: "cancel A only", reason: "A common algebra carry-through error loses the factor of two established in the flux line."}
```

**Correct result:** exact symbolic result.

**Answer text:** Two equal faces carry flux; area cancels.

**Why:** Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.

**Wrong-path feedback:** The pillbox encloses `σA`, not `σ`, and has two active faces.

**State/output:** model unlocks S2.

## Stop 6 - Sort the flux faces

**Format/placement:** PROTOCOL, at `mill-bench`.

**Metadata:** Concept: 23 - flux angle; Keystone: K2; Area: Field Station; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the mill bench, in Field Station.

**Stop reason - exact player copy:** Ravi needs to confirm that the charge-layer calculation counts flux through the correct surfaces.

**Question card story setup - exact player copy:** With the sheet result available, Ravi rotates a virtual pillbox around the layer. Match each face orientation to positive, negative, or zero flux so the instrument integrates the correct surfaces.

**Question card story-science connection - exact player copy:** The face classifications determine which surfaces contribute to the Gaussian pillbox's total electric flux.

**Question card prompt - exact player copy:** Match all three faces to signed flux and submit the mapping.

**Complete format-specific interaction block:** `scenarios=[top_normal_with_E,bottom_normal_against_E,side_normal_perpendicular]`; `choices=[+EA,-EA,0]`; `mapping=[top→+EA,bottom→-EA,side→0]`.

**Correct result:** as mapped.

**Answer text:** `cos0=1`, `cos180=-1`, `cos90=0`.

**Why:** The dot product, not area alone, decides each surface's signed contribution.

**Wrong-path feedback:** Compare field with the outward normal, not with the surface itself.

**State/output:** faces animate with arrows/text; unlock S3.

## Stop 7 - Derive the effective charge density

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: 4 - sheet plus image/conducting ground; Keystone: K2,K4; Area: Mast Base; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The isolated-sheet calculation must now account for the conducting ground beneath the storm.

**Question card story setup - exact player copy:** Because the conducting ground mirrors the layer field, the station model uses E_ground=σ/ε₀, not the isolated-sheet value. Use the measured E=-9.0 kV/m to derive the effective density.

**Question card story-science connection - exact player copy:** The effective surface charge density sets the ground-level field used to assess the approaching layer.

**Fixture source panel - exact player copy:** Because the conducting ground mirrors the layer field, the station model uses E_ground=σ/ε₀, not the isolated-sheet value. Use the measured E=-9.0 kV/m to derive the effective density. Vacuum permittivity: ε₀ = 8.854 × 10^-12 F/m.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit σ in C/m²; use ε₀=8.854×10^-12 C²/(N·m²) and E=-9.0×10³ N/C.

**Complete format-specific interaction block:** `lines=[{E=σ/ε0,conductor_boundary,[E=σ/(2ε0),E=2σ/ε0]},{σ=ε0E,algebra,[σ=E/ε0,σ=ε0/E]},{σ=(8.854e-12)(-9.0e3),substitution,[. ]},{σ=-7.97e-8 C/m2,arithmetic,[+7.97e-8,-7.97e8]}]`.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `E=σ/(2ε0), using the insulating-sheet result`
2. `σ=E/ε0`
3. `σ=(8.854e-12)(+9.0e3)`
4. `σ=+7.97e-8 C/m²`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because the conducting ground mirrors the layer field, the station model uses E_ground=σ/ε₀, not the isolated-sheet value. Use the measured E=-9.0 kV/m to derive the effective density.", "Build four lines, name the rule at each step, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the effective charge density in the form and units requested by the prompt"
  left_side: "ρ"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "E = σ/ε0", correct: true}
        - {text: "E=σ/(2ε0)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "σ = ε0E", correct: true}
        - {text: "σ=E/ε0", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "σ = (8.854×10^-12)(-9.0×10^3)", correct: true}
        - {text: "σ=(8.854e-12)(+9.0e3)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "σ = -7.97×10^-8 C/m²", correct: true}
        - {text: "σ=+7.97e-8 C/m²", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `-7.97×10^-8 C/m²`, tolerance `±0.04×10^-8`.

**Answer text:** `σ=ε₀E=(8.854×10^-12)(-9.0×10³)=-7.97×10^-8 C/m²`.

**Why:** The conductor boundary doubles the isolated-sheet field between cloud and ground.

**Wrong-path feedback:** Convert kV/m to V/m and keep the field sign.

**State/output:** density posted; unlock S4.

## Stop 8 - Test spatial consistency

**Format/placement:** RESIDUAL, at `mill-array`.

**Metadata:** Concept: 30 - model residuals; Keystone: K2,K12; Area: Remote Outstation; Learning role: TRANSFER; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The inferred charge density needs a spatial check before the crew accepts a uniform storm layer.

**Question card story setup - exact player copy:** Now that σ predicts -9.0 kV/m, compare residual maps from a uniform layer and a compact charged pocket. Choose the model whose residuals are structureless, not merely smallest on average.

**Question card story-science connection - exact player copy:** The residual map distinguishes a broad layer from a compact charged pocket requiring a different field model.

**Question card prompt - exact player copy:** Inspect both four-station residual fields and submit the model with no directional pattern. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:** `residual={fields:[{id:uniform,residuals:[-.1,.1,0,.0],rms:.071,pattern:none,model:"Gauss planar"},{id:pocket,residuals:[-.3,-.1,.1,.3],rms:.224,pattern:gradient,model:"E=∫k dq r_hat/r² with off-axis r found by Pythagoras"}],correct:uniform,criterion:no_spatial_pattern}`.

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 8 - Test spatial consistency"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Inspect both four-station residual fields and submit the model with no directional pattern."
  payload: "`residual={fields:[{id:uniform,residuals:[-.1,.1,0,.0],rms:.071,pattern:none,model:\"Gauss planar\"},{id:pocket,residuals:[-.3,-.1,.1,.3],rms:.224,pattern:gradient,model:\"E=∫k dq r_hat/r² with off-axis r found by Pythagoras\"}],correct:uniform,criterion:no_spatial_pattern}`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - RESIDUAL:**

```yaml
residual:
  xAxis: {label: "ordered observation in the question", values: [1, 2, 3, 4, 5]}
  fits:
    - id: patterned_low_error
      label: "lower average error but patterned residuals"
      rms: 0.18
      structured: true
      residuals: [{x: 1, y: -0.12}, {x: 2, y: -0.06}, {x: 3, y: 0.00}, {x: 4, y: 0.06}, {x: 5, y: 0.12}]
    - id: unpatterned_generalising
      label: "slightly higher error with no directional pattern"
      rms: 0.21
      structured: false
      residuals: [{x: 1, y: 0.05}, {x: 2, y: -0.04}, {x: 3, y: 0.02}, {x: 4, y: -0.03}, {x: 5, y: 0.01}]
  accept: unpatterned_generalising
  reject: patterned_low_error
  correctConclusion: "uniform layer."
```

**Correct result:** uniform layer.

**Answer text:** Its small residuals alternate without a gradient; the pocket leaves a west-east trend.

**Why:** A spatial pattern means the model is missing physics even when its mean error is small.

**Wrong-path feedback:** Lowest RMS helps, but the decisive test is unmodeled spatial structure.

**State/output:** report piece 2; M3.

## Mission outcome

Mission decision: Use the field map to mark the mast tip. The strongest field is near the close contours. The cabinet blocks the static field. Next, test the storm model.

**Segue - exact player copy:** Therefore Tate needs the voltage between cloud and ground; a field reading alone will not trace the damage.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ravi Sen pins the bounded charge-layer sketch beneath the measured field strip. Therefore Tate needs the voltage between cloud and ground; a field reading alone will not trace the damage.

**Story event - exact player copy:** The field map links the measured charge layer to the strongest field at the mast.

**Metric screen:** target `18:00`; event `A defensible layer model adds report evidence.`; auto `REPORT CERTAINTY +3`; shared RP; QA `29/86/62/80`; same allocation/failure copy.  
## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains electric flux?

**Options - exact player copy:**

- A. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- B. The dot product, not area alone, decides each surface's signed contribution.
- C. The conductor boundary doubles the isolated-sheet field between cloud and ground.
- D. The signed amount of electric field passing through a surface.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric flux. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes gauss’s law for an infinite charged sheet. It does not answer the question about electric flux.
- B: This describes flux angle. It does not answer the question about electric flux.
- C: This describes the field between a charged sheet and conducting ground. It does not answer the question about electric flux.
- D: Correct. The signed amount of electric field passing through a surface.

### Review question 2


**Prompt - exact player copy:** Which statement best explains gauss’s law for an infinite charged sheet?

**Options - exact player copy:**

- A. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- B. The signed amount of electric field passing through a surface.
- C. The dot product, not area alone, decides each surface's signed contribution.
- D. The conductor boundary doubles the isolated-sheet field between cloud and ground.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for gauss’s law for an infinite charged sheet. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- B: This describes electric flux. It does not answer the question about gauss’s law for an infinite charged sheet.
- C: This describes flux angle. It does not answer the question about gauss’s law for an infinite charged sheet.
- D: This describes the field between a charged sheet and conducting ground. It does not answer the question about gauss’s law for an infinite charged sheet.

### Review question 3


**Prompt - exact player copy:** Which statement best explains flux angle?

**Options - exact player copy:**

- A. The signed amount of electric field passing through a surface.
- B. The dot product, not area alone, decides each surface's signed contribution.
- C. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- D. The conductor boundary doubles the isolated-sheet field between cloud and ground.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for flux angle. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric flux. It does not answer the question about flux angle.
- B: Correct. The dot product, not area alone, decides each surface's signed contribution.
- C: This describes gauss’s law for an infinite charged sheet. It does not answer the question about flux angle.
- D: This describes the field between a charged sheet and conducting ground. It does not answer the question about flux angle.

### Review question 4


**Prompt - exact player copy:** Which statement best explains the field between a charged sheet and conducting ground?

**Options - exact player copy:**

- A. The signed amount of electric field passing through a surface.
- B. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- C. The conductor boundary doubles the isolated-sheet field between cloud and ground.
- D. The dot product, not area alone, decides each surface's signed contribution.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for the field between a charged sheet and conducting ground. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric flux. It does not answer the question about the field between a charged sheet and conducting ground.
- B: This describes gauss’s law for an infinite charged sheet. It does not answer the question about the field between a charged sheet and conducting ground.
- C: Correct. The conductor boundary doubles the isolated-sheet field between cloud and ground.
- D: This describes flux angle. It does not answer the question about the field between a charged sheet and conducting ground.

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


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. The signed amount of electric field passing through a surface.
- C. Symmetry makes the two pillbox faces equal and the curved side contribute zero flux.
- D. The dot product, not area alone, decides each surface's signed contribution.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes electric flux. It does not answer the question about electric charge.
- C: This describes gauss’s law for an infinite charged sheet. It does not answer the question about electric charge.
- D: This describes flux angle. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 3 - From Field to Voltage

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 3 - 13 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** From Field to Voltage  
**Go now:** Go to the Field Station and meet Ravi Sen, field scientist, at the mill array.  
**Card body:** 13 days until the last storm window closes. A voltage sketch lies beside three shunt leads and an empty fourth hook. Today you decide what voltage the field implies.
**Objective:** Derive and validate the cloud-ground voltage.

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
  - id: groundtruth_m03_we01
    title: Voltage in a uniform field
    problem: A uniform field is +200 N/C along x. Find V(3 m)-V(1 m).
    rule: ΔV=-integral E dx=-EΔx for a uniform parallel field.
    steps:
    - 'Set up the relationship: ΔV=-integral E dx=-EΔx for a uniform parallel field.'
    - ΔV=-200(3-1)=-400 V.
    answer: Potential decreases by 400 V along the field.
    common_mistake: Electric potential decreases, not increases, in the field direction.
  - id: groundtruth_m03_we02
    title: Potential-energy change
    problem: A charge q=2 μC moves through potential change ΔV=100 V. Find ΔU.
    rule: ΔU=qΔV.
    steps:
    - 'Set up the relationship: ΔU=qΔV.'
    - ΔU=(2×10^-6)(100)=2×10^-4 J.
    answer: Potential energy increases by 0.0002 J.
    common_mistake: Voltage is energy per charge, not energy itself.
  - id: groundtruth_m03_we03
    title: Potential of a point charge
    problem: A charge q=2 nC is 3 m from a point. Use k=9×10^9 N m²/C² and zero potential at infinity. Find V.
    rule: V=kq/r.
    steps:
    - 'Set up the relationship: V=kq/r.'
    - V=(9×10^9)(2×10^-9)/3=6 V.
    answer: The potential is +6 V.
    common_mistake: Potential uses 1/r, while point-charge field uses 1/r².
  - id: groundtruth_m03_we04
    title: Add electric potentials
    problem: Two sources contribute potentials +12 V and -5 V at a point. Find total potential.
    rule: Potential adds as a signed scalar.
    steps:
    - 'Set up the relationship: Potential adds as a signed scalar.'
    - V_total=12+(-5)=7 V.
    answer: The total is 7 V relative to the shared reference.
    common_mistake: Do not combine potentials using vector components.
  - id: groundtruth_m03_we05
    title: Move along equal potential
    problem: A charge moves between two points on the same equipotential surface. What is the electric potential-energy change?
    rule: ΔU=qΔV.
    steps:
    - The two points have the same potential, so ΔV=0.
    - ΔU=q(0)=0 for any charge q.
    answer: The electric potential-energy change is zero.
    common_mistake: Zero potential difference does not require zero electric field everywhere.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first
#### Glossary terms

Electric potential: electric potential energy per charge, measured in volts. Equipotential: a path or surface along which voltage does not change. Line integral: a sum of tiny contributions along a path.

#### Primer concepts Electric field points from high to low potential. Potential adds as a scalar. Moving along an equipotential requires no electric work. When field values are sampled at interval endpoints, the trapezoidal rule estimates the line integral by averaging each adjacent pair before multiplying by interval length.  
#### Equations first needed today
**Equation:** `ΔV=-∫_a^b E·dl`;

**What it is for:** Find voltage change from a field profile.

**Symbols:** `ΔV=V_b-V_a`, `E` field, `dl` path element. **Why:** The cloud height makes a point field reading into a site-scale voltage.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

**Equation:** `ΔV≈-Σ[(E_i+E_(i+1))/2]Δl`

**What it is for:** applying the trapezoidal rule to estimate voltage change from sampled field readings.

**Symbols:** `E_i` and `E_(i+1)` are adjacent field readings, and `Δl` is their separation along the path.

**Why this campaign needs it:** the mill array supplies discrete field readings rather than a continuous formula.

**Equation:** `V=kq/r`, `U=qV`;

**What it is for:** Find point-charge potential and energy.

**Symbols:** `k=8.988×10^9 N·m²/C²`, `q` charge, `r` distance, `U` energy. **Why:** It checks sign and shows why voltage, unlike field, sums without components.

**Why this campaign needs it:** The team needs the result to make today’s mission decision.

## Main story happening - designer summary
Ravi derives `ΔV=+360 MV` from ground to cloud for `E_y=-9.0 kV/m` over `40 km`, checks it against sampled profile integration, and rejects a sign-flipped record.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**Trigger:** mission_3_arrival.

**World state:** A voltage sketch lies beside three shunt leads and an empty fourth hook.

**Panel/HUD text:** MISSION 3: DERIVE VOLTAGE FROM UNIFORM FIELD OPEN

**Dialogue bubbles -** Ravi Sen: "Start with derive voltage from uniform field. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `mill-array` in Field Station.

**Beat 2 - After Stop 9 | `mill-array` | automatic**

**Trigger:** accepted_stop_9.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 9 reads: "+3.60×10^8 V=+360 MV, tolerance ±2 MV.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The voltage estimate needs a geometric check before it is used to interpret the mast environment."

**Unlocks/waypoint:** Unlock Stop 10 at `mill-array` in Field Station.

**Beat 3 - After Stop 10 | `mill-bench` | automatic**

**Trigger:** accepted_stop_10.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 10 reads: "A.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The uniform-field voltage now needs comparison with the balloon's independently sampled altitude profile."

**Unlocks/waypoint:** Unlock Stop 11 at `mill-bench` in Field Station.

**Beat 4 - After Stop 11 | `mill-bench` | automatic**

**Trigger:** accepted_stop_11.

**World state:** At `mill-bench`, the dated accepted-result slip for Stop 11 reads: "+250 MV, 30.6% lower, tolerances ±2 MV, ±0.5%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** 250 MV

**Dialogue bubbles -** Marcus Tate: "That check holds. The two voltage estimates disagree enough that the report must carry altitude uncertainty explicitly."

**Unlocks/waypoint:** Unlock Stop 12 at `mill-bench` in Field Station.

**Beat 5 - At mission end | `mill-array` | automatic**

**Trigger:** accepted_stop_12.

**World state:** At `shunt-rack`, Marcus Tate clips the 250 TO 378 MV model card to the shunt rack. The dated prop remains here on later visits.

**Panel/HUD text:** 250–378 MV

**Dialogue bubbles -** Marcus Tate: "That is a large voltage. It still needs a path. But Ortiz's damaged trailer sits far from the mast tip; high voltage alone does not explain its burned card."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m03

**Home:** `shunt-rack`. **Before:** The dated mission-3 evidence holder at this fixture has no accepted record. A voltage sketch lies beside three shunt leads and an empty fourth hook.
**After — exact action:** Marcus Tate clips the 250 TO 378 MV model card to the shunt rack.
**Trigger:** accepted_stop_12. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `mast-desk`, the copper tip model catches light beside a trailer damage photo.
**Segue - exact player copy:** But Ortiz's damaged trailer sits far from the mast tip; high voltage alone does not explain its burned card.

## Location plan

FIELD only. The field profile, equipotential map, and balloon record are co-located and require no artificial travel.

## Characters and dramatic beat

Ravi owns the uniform-layer model; Noor requires the independent profile and keeps both valid endpoints rather than averaging the disagreement away.

## Key concepts, explained here

Potential is scalar, but its spatial derivative gives the vector field. The leading minus sign in `ΔV=-∫E·dl` determines direction, and a sampled profile supplies a defensible independent check.

## Four graded stops

## Stop 9 - Derive voltage from uniform field

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: 7 - field-potential integral; Keystone: K3,K1; Area: Mast Base; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** A ground-level field alone cannot describe the voltage available across the cloud's full height.

**Question card story setup - exact player copy:** The layer model gives a uniform vertical field E_y=-9.0 kV/m from ground at y=0 to cloud at y=40 km. Derive V_cloud-V_ground with the sign intact.

**Question card story-science connection - exact player copy:** The cloud-to-ground potential difference sets the voltage scale the later test bank can represent only approximately.

**Fixture source panel - exact player copy:** The layer model gives a uniform vertical field E_y=-9.0 kV/m from ground at y=0 to cloud at y=40 km. Derive V_cloud-V_ground with the sign intact. Build four lines and name each rule; use 1 km=1000 m

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit ΔV in volts and megavolts.

**Complete format-specific interaction block:** lines `ΔV=-∫0^h E_y dy`(definition), `=-E_yh`(constant integral), `=-(-9.0e3)(4.0e4)`(SI substitution), `=+3.60e8 V`(arithmetic).

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `ΔV=+∫0^h E_y dy`
2. `ΔV=−E_y/h`
3. `ΔV=−(−9.0e3)(40)`
4. `ΔV=−3.60e8 V`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The layer model gives a uniform vertical field E_y=-9.0 kV/m from ground at y=0 to cloud at y=40 km.", "Build four lines and name each rule; use 1 km=1000 m"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive voltage from uniform field in the form and units requested by the prompt"
  left_side: "ΔV"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV=-∫0^h E_y dy", correct: true}
        - {text: "ΔV=+∫0^h E_y dy", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV = -E_yh", correct: true}
        - {text: "ΔV=−E_y/h", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV = -(-9.0e3)(4.0e4)", correct: true}
        - {text: "ΔV=−(−9.0e3)(40)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV = +3.60e8 V", correct: true}
        - {text: "ΔV=−3.60e8 V", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `+3.60×10^8 V=+360 MV`, tolerance `±2 MV`.

**Answer text:** worked arithmetic above.

**Why:** The minus sign makes potential rise when the path runs opposite the field.

**Wrong-path feedback:** Convert kilometres and preserve the leading negative integral sign.

**State/output:** voltage model; S2.

## Stop 10 - Read the equipotentials

**Format/placement:** CHOICE, asked by Ravi Sen beside `mill-array`.

**Metadata:** Concept: 9 - equipotential geometry; Keystone: K3; Area: Mast Base; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Talk to Ravi Sen, at the field-mill array in Field Station.

**Stop reason - exact player copy:** The voltage estimate needs a geometric check before it is used to interpret the mast environment.

**Question card story setup - exact player copy:** With cloud potential established as higher than ground, the display shows four candidate contour maps. Select the one whose electric-field arrows cross equipotentials at right angles and point toward lower potential.

**Question card story-science connection - exact player copy:** The relation between field direction and equipotential contours determines which voltage map is physically consistent.

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

**Metadata:** Concept: 7 - numerical line integral/trapezoid; Keystone: K3,K12; Area: Remote Outstation; Learning role: COMBINE; Difficulty: L4; Story role: verification.

**Call - exact player copy:** Go to the mill bench, in Field Station.

**Stop reason - exact player copy:** The uniform-field voltage now needs comparison with the balloon's independently sampled altitude profile.

**Question card story setup - exact player copy:** Because the contour test confirms the sign, integrate an independent balloon profile with fields -6,-8,-10,-8 kV/m across three 10 km layers. Compare the sampled voltage with the uniform model.

**Question card story-science connection - exact player copy:** Integrating the sampled field estimates the cloud voltage without assuming that one ground reading holds at every altitude.

**Fixture source panel - exact player copy:** Because the contour test confirms the sign, integrate an independent balloon profile with fields -6,-8,-10,-8 kV/m across three 10 km layers. Compare the sampled voltage with the uniform model. Build the three-line trapezoid derivation; use 1 (kV/m)(km)=1 MV

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit voltage in MV and percent difference from 360 MV.

**Complete format-specific interaction block:** lines `ΔV≈-Σ[(E_i+E_{i+1})/2]Δy`(trapezoid), `=-[(-7)+(-9)+(-9)]kV/m(10km)`(averages), `=+250 MV`(units); comparison `30.6% below 360 MV`.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `ΔV≈−ΣE_iΔy using only left endpoints`
2. `Add the three displayed endpoint fields without averaging adjacent samples`
3. `Treat kV/m×km as kV`
4. `The estimate is 30.6% above 360 MV`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because the contour test confirms the sign, integrate an independent balloon profile with fields -6,-8,-10,-8 kV/m across three 10 km layers.", "Build the three-line trapezoid derivation; use 1 (kV/m)(km)=1 MV"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive a sampled-profile estimate in the form and units requested by the prompt"
  left_side: "ΔV"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV≈-Σ[(E_i+E_{i+1})/2]Δy", correct: true}
        - {text: "ΔV≈−ΣE_iΔy using only left endpoints", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV = -[(-6-8)/2+(-8-10)/2+(-10-8)/2](10) MV", correct: true}
        - {text: "ΔV = -ΣE_iΔy = -[(-7)+(-9)+(-9)]kV/m(10km)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΔV = +250 MV", correct: true}
        - {text: "ΔV = +250 kV", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "decrease=(360-250)/360×100%=30.6%", correct: true}
        - {text: "ΔV = The estimate is 30.6% above 360 MV", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `+250 MV`, `30.6% lower`, tolerances `±2 MV`, `±0.5%`.

**Answer text:** `-[-25×10]=+250 MV`; difference `110/360=30.6%`.

**Why:** Agreement between different measurements is stronger when their sensors and assumptions differ.

**Wrong-path feedback:** Average adjacent endpoints before multiplying by each layer thickness.

**State/output:** uncertainty band 250–360 MV; S4.

## Stop 12 - Choose the report value

**Format/placement:** STRESS, asked by Ravi Sen beside `mill-bench`.

**Metadata:** Concept: 30 - model range; Keystone: K3,K12; Area: Remote Outstation; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Ravi Sen, at the mill bench in Field Station.

**Stop reason - exact player copy:** The two voltage estimates disagree enough that the report must carry altitude uncertainty explicitly.

**Question card story setup - exact player copy:** Now two valid profiles give 250 MV and 360 MV, while balloon altitude may shift by ±2 km. Stress both estimates across that range and choose the conservative report interval.

**Question card story-science connection - exact player copy:** The supported voltage interval tells the crew how much cloud-potential uncertainty the laboratory comparison must retain.

**Question card prompt - exact player copy:** Move cloud height from 38 to 42 km, then submit one interval in MV that contains both measurement methods throughout the range.

**Complete format-specific interaction block:** `stress={assumption:cloud_height_km,min:38,max:42,step:1,candidates:[250_to_360_MV,300_MV_exact,sign_negative],correct:250_to_378_MV}`.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 12 - Choose the report value"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Move cloud height from 38 to 42 km, then submit one interval in MV that contains both measurement methods throughout the range."
  payload: "`stress={assumption:cloud_height_km,min:38,max:42,step:1,candidates:[250_to_360_MV,300_MV_exact,sign_negative],correct:250_to_378_MV}`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "cloud height", min: 38, max: 42, nominal: 40.0, step: 1, unit: "km"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 40.0, max: 40.0}
      failsAt: 42
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 40.0, max: 42}
      failsAt: 38
    - id: robust_plan
      label: "`250–378 MV`, inclusive."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 38, max: 42}
  robust: robust_plan
  question: "Move cloud height from 38 to 42 km, then submit one interval in MV that contains both measurement methods throughout the range."
```

**Correct result:** `250–378 MV`, inclusive.

**Answer text:** Sampled minimum remains 250; uniform maximum scales `360×42/40=378 MV`.

**Why:** A bounded interval preserves disagreement instead of hiding it in one unjustified number.

**Wrong-path feedback:** Do not average away method spread; bound it.

**State/output:** report piece 3; M4.

## Mission outcome

Mission decision: Use 250–378 MV for the cloud-ground potential. Field direction makes the cloud positive relative to ground in this model. The voltage is large enough to matter. But it still does not explain why damage appeared only at the trailer.

**Segue - exact player copy:** But Ortiz's damaged trailer sits far from the mast tip; high voltage alone does not explain its burned card.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Marcus Tate clips the 250 TO 378 MV model card to the shunt rack. But Ortiz's damaged trailer sits far from the mast tip; high voltage alone does not explain its burned card.

**Story event - exact player copy:** The failure model now uses the verified 250-to-378-megavolt cloud-to-ground range.

**Metric screen:** target `20:00`; event `An independent profile bounds the voltage.`; auto `CERTAINTY +3`; QA `36/90/62/84`.  
## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains electric potential?

**Options - exact player copy:**

- A. The minus sign makes potential rise when the path runs opposite the field.
- B. Electric potential energy per charge, measured in volts.
- C. E=-∇V fixes both direction and where a strong field needs close contour spacing.
- D. Agreement between different measurements is stronger when their sensors and assumptions differ.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric potential. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes field-potential integral. It does not answer the question about electric potential.
- B: Correct. Electric potential energy per charge, measured in volts.
- C: This describes equipotential geometry. It does not answer the question about electric potential.
- D: This describes numerical line integral and trapezoid. It does not answer the question about electric potential.

### Review question 2


**Prompt - exact player copy:** Which statement best explains field-potential integral?

**Options - exact player copy:**

- A. Electric potential energy per charge, measured in volts.
- B. E=-∇V fixes both direction and where a strong field needs close contour spacing.
- C. The minus sign makes potential rise when the path runs opposite the field.
- D. Agreement between different measurements is stronger when their sensors and assumptions differ.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for field-potential integral. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric potential. It does not answer the question about field-potential integral.
- B: This describes equipotential geometry. It does not answer the question about field-potential integral.
- C: Correct. The minus sign makes potential rise when the path runs opposite the field.
- D: This describes numerical line integral and trapezoid. It does not answer the question about field-potential integral.

### Review question 3


**Prompt - exact player copy:** Which statement best explains equipotential geometry?

**Options - exact player copy:**

- A. Electric potential energy per charge, measured in volts.
- B. The minus sign makes potential rise when the path runs opposite the field.
- C. Agreement between different measurements is stronger when their sensors and assumptions differ.
- D. E=-∇V fixes both direction and where a strong field needs close contour spacing.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for equipotential geometry. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric potential. It does not answer the question about equipotential geometry.
- B: This describes field-potential integral. It does not answer the question about equipotential geometry.
- C: This describes numerical line integral and trapezoid. It does not answer the question about equipotential geometry.
- D: Correct. E=-∇V fixes both direction and where a strong field needs close contour spacing.

### Review question 4


**Prompt - exact player copy:** Which statement best explains numerical line integral and trapezoid?

**Options - exact player copy:**

- A. Agreement between different measurements is stronger when their sensors and assumptions differ.
- B. Electric potential energy per charge, measured in volts.
- C. The minus sign makes potential rise when the path runs opposite the field.
- D. E=-∇V fixes both direction and where a strong field needs close contour spacing.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for numerical line integral and trapezoid. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Agreement between different measurements is stronger when their sensors and assumptions differ.
- B: This describes electric potential. It does not answer the question about numerical line integral and trapezoid.
- C: This describes field-potential integral. It does not answer the question about numerical line integral and trapezoid.
- D: This describes equipotential geometry. It does not answer the question about numerical line integral and trapezoid.

### Review question 5


**Prompt - exact player copy:** Which statement best explains model range?

**Options - exact player copy:**

- A. Electric potential energy per charge, measured in volts.
- B. A bounded interval preserves disagreement instead of hiding it in one unjustified number.
- C. The minus sign makes potential rise when the path runs opposite the field.
- D. E=-∇V fixes both direction and where a strong field needs close contour spacing.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for model range. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric potential. It does not answer the question about model range.
- B: Correct. A bounded interval preserves disagreement instead of hiding it in one unjustified number.
- C: This describes field-potential integral. It does not answer the question about model range.
- D: This describes equipotential geometry. It does not answer the question about model range.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Electric potential energy per charge, measured in volts.
- B. The minus sign makes potential rise when the path runs opposite the field.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. E=-∇V fixes both direction and where a strong field needs close contour spacing.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes electric potential. It does not answer the question about electric charge.
- B: This describes field-potential integral. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes equipotential geometry. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

# Mission 4 - The Point on the Skyline

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 4 - 12 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Point on the Skyline  
**Go now:** Go to Mast Base and meet Marcus Tate, mast engineer, at the mast desk.  
**Card body:** 12 days until the last storm window closes. The copper tip model catches light beside a trailer damage photo. Today you decide whether the mast tip explains the remote damage.
**Objective:** Separate local mast-tip breakdown from the remote failure.  
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
  - id: groundtruth_m04_we01
    title: Electrostatic conductor
    problem: A metal object has reached electrostatic equilibrium. What are the field and potential inside the conducting material?
    rule: Free charges rearrange until there is no electric field driving further motion in the conductor.
    steps:
    - Inside the conducting material, E=0.
    - Since ΔV=-integral E·dl, potential does not vary within that connected conductor.
    answer: The interior field is zero and the conductor is equipotential.
    common_mistake: This result is for electrostatic equilibrium, not any wire carrying current.
  - id: groundtruth_m04_we02
    title: Compare equal-potential spheres
    problem: Two isolated conducting spheres are held at the same potential V and have radii 1 cm and 2 cm. Compare surface fields.
    rule: For a conducting sphere, E=V/R.
    steps:
    - 'Set up the relationship: For a conducting sphere, E=V/R.'
    - E_small/E_large=R_large/R_small=2/1=2.
    answer: The smaller sphere has twice the surface field in this spherical model.
    common_mistake: Equal potential does not imply equal surface field for different radii.
  - id: groundtruth_m04_we03
    title: Field just outside a conductor
    problem: A conductor has local surface charge density 9×10^-9 C/m². Use ε0≈9×10^-12 F/m. Find the external normal field.
    rule: At an electrostatic conductor surface in vacuum, E_out=σ/ε0.
    steps:
    - 'Set up the relationship: At an electrostatic conductor surface in vacuum, E_out=σ/ε0.'
    - E_out=(9×10^-9)/(9×10^-12)=1000 N/C.
    answer: The field just outside is 1000 N/C outward for positive charge.
    common_mistake: Do not use the isolated infinite-sheet factor of two here.
  - id: groundtruth_m04_we04
    title: Potential of a point charge
    problem: A charge q=2 nC is 3 m from a point. Use k=9×10^9 N m²/C² and zero potential at infinity. Find V.
    rule: V=kq/r.
    steps:
    - 'Set up the relationship: V=kq/r.'
    - V=(9×10^9)(2×10^-9)/3=6 V.
    answer: The potential is +6 V.
    common_mistake: Potential uses 1/r, while point-charge field uses 1/r².
  - id: groundtruth_m04_we05
    title: Force per charge
    problem: A positive test charge q=2 μC experiences force F=6 mN rightward. Find the electric field.
    rule: E=F/q; μC means 10^-6 C and mN means 10^-3 N.
    steps:
    - 'Set up the relationship: E=F/q; μC means 10^-6 C and mN means 10^-3 N.'
    - E=(6×10^-3)/(2×10^-6)=3000 N/C rightward.
    answer: The field is 3000 N/C to the right.
    common_mistake: The field direction is defined by force on a positive test charge.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Conductor: material whose mobile charge rearranges easily. Electrostatic equilibrium: settled state with zero field inside a conductor. Breakdown field: field above which the campaign's air model conducts.

#### Primer concepts

- A conductor is equipotential; its surface field is perpendicular; sharper curvature produces larger surface charge density.

#### Equations first needed today
**Equation:** `E_out=σ/ε₀`

**What it is for:** connect surface charge to field just outside

**Symbols:** `E_out` electric field just outside the conductor in newtons per coulomb; `σ` surface charge density in coulombs per square metre; `ε₀` vacuum permittivity.

**Why this campaign needs it:** compare tip field with Station 12's fictional `3.0 megavolts per metre (MV/m)` wet-air threshold.

## Main story happening - designer summary
At Mast Base, Tate proves the tip can trigger a rocket but cannot create the trailer's no-contact damage. Arrival bubble→Stop 1; Stop 2 posts tip ratio; Stop 3 cage interior reads zero; Stop 4 logs missing arc mark and fills report piece 4. One location. The tension is useful launch enhancement versus unsafe remote inference.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `mast-desk` | automatic**

**Trigger:** mission_4_arrival.

**World state:** The copper tip model catches light beside a trailer damage photo.

**Panel/HUD text:** Marcus Tate, mast engineer: “The tip is meant to start a strike. Show me whether that can reach the trailer.”

**Dialogue bubbles -** Marcus Tate: "The tip is meant to start a strike. Show me whether that can reach the trailer."

**Unlocks/waypoint:** Unlock Stop 13 at `mast-desk` in Mast Base.

**Beat 2 - After Stop 13 | `mast-desk` | automatic**

**Trigger:** accepted_stop_13.

**World state:** At `mast-desk`, the dated accepted-result slip for Stop 13 reads: "A conductor at equilibrium has E=0 inside; outside E is normal. Mobile charge moves until tangential/interior fields vanish.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The conductor boundary check leaves the mast's sharp tip as a possible field-concentration site."

**Unlocks/waypoint:** Unlock Stop 14 at `mast-desk` in Mast Base.

**Beat 3 - After Stop 14 | `cabinet` | automatic**

**Trigger:** accepted_stop_14.

**World state:** At `mast-desk`, the dated accepted-result slip for Stop 14 reads: "50 exact.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. Tip enhancement does not establish whether the nearby equipment cabinet shields its interior."

**Unlocks/waypoint:** Unlock Stop 15 at `cabinet` in Mast Base.

**Beat 4 - After Stop 15 | `cabinet` | automatic**

**Trigger:** accepted_stop_15.

**World state:** At `cabinet`, the dated accepted-result slip for Stop 15 reads: "Closed reading 0.00 kV/m confirms static shielding. Surface charge cancels interior E.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The shielding result makes the damaged cable card harder to explain as direct static-field exposure."

**Unlocks/waypoint:** Unlock Stop 16 at `cabinet` in Mast Base.

**Beat 5 - At mission end | `mast-desk` | automatic**

**Trigger:** accepted_stop_16.

**World state:** At `mast-desk`, Marcus Tate pins the TIP EFFECT INCOMPLETE finding beside the mast drawing. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Marcus Tate: "The tip chose the strike point. It did not choose that card. Therefore Strand must compare stored charge before she fires the bank; the tip is only the start of the case."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m04

**Home:** `mast-desk`. **Before:** The dated mission-4 evidence holder at this fixture has no accepted record. The copper tip model catches light beside a trailer damage photo.
**After — exact action:** Marcus Tate pins the TIP EFFECT INCOMPLETE finding beside the mast drawing.
**Trigger:** accepted_stop_16. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `hall-board`, twelve numbered stages stand behind the rail below a cloud sketch.
**Segue - exact player copy:** Therefore Strand must compare stored charge before she fires the bank; the tip is only the start of the case.

## Location plan

MAST only; cabinet and mast geometry are unavailable elsewhere. 

## Characters and dramatic beat

Tate wants to preserve the launch function; evidence moves him from defending the mast to seeking a path. 

## Key concepts, explained here

 electrostatic equilibrium, equipotential conductors, `E_out=σ/ε₀`, curvature enhancement, shielding.  

## Four graded stops
## Stop 13 - Conductor Boundary

**Format/placement:** CHOICE, asked by Marcus Tate beside `mast-desk`.

**Metadata:** Concept: 5 - conductor equilibrium; Keystone: K4; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L1 clue.

**Call - exact player copy:** Talk to Marcus Tate, at the mast desk in Mast Base.

**Stop reason - exact player copy:** Tate must distinguish settled conductor fields from storm fields before estimating the mast tip hazard.

**Question card story setup - exact player copy:** The mast sits at one voltage after charge settles, but four sketches show different interior and surface fields. Select the only sketch consistent with electrostatic equilibrium before Tate estimates the tip field.

**Question card story-science connection - exact player copy:** The interior and surface-field conditions determine which conductor sketch can support the tip-field calculation.

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

**Metadata:** Concept: 6 - spherical-curvature proxy; Keystone: K2,K4; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3 reveal.

**Call - exact player copy:** Go to the mast desk, in Mast Base.

**Stop reason - exact player copy:** The conductor boundary check leaves the mast's sharp tip as a possible field-concentration site.

**Question card story setup - exact player copy:** With conductor boundaries fixed, approximate the tip and mast body as conducting spheres at the same potential, with radii 0.010 m and 0.50 m. Derive their surface-field ratio.

**Question card story-science connection - exact player copy:** The surface-field ratio establishes how strongly the tip can amplify the field relative to the broader mast body.

**Fixture source panel - exact player copy:** With conductor boundaries fixed, approximate the tip and mast body as conducting spheres at the same potential, with radii 0.010 m and 0.50 m. Derive their surface-field ratio.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the numerical ratio E_tip/E_body.

**Complete format-specific interaction block:** lines: `V=kQ/R`(sphere potential), `E=kQ/R²`(Gauss/Coulomb), `E=V/R`(eliminate Q), `E_tip/E_body=R_body/R_tip=50`(ratio).

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `V=kQ/R²`
2. `E=kQ/R`
3. `E=VR`
4. `E_tip/E_body=R_tip/R_body=1/50`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With conductor boundaries fixed, approximate the tip and mast body as conducting spheres at the same potential, with radii 0.010 m and 0.50 m.", "Build four lines from V=kQ/R and E=kQ/R², choose the rule that licenses each line, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Tip Enhancement in the form and units requested by the prompt"
  left_side: "V"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "V = kQ/R", correct: true}
        - {text: "V=kQ/R²", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "E = kQ/R²", correct: true}
        - {text: "E=kQ/R", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "E = V/R", correct: true}
        - {text: "E=VR", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "E_tip/E_body = R_body/R_tip = (0.50 m)/(0.010 m) = 50", correct: true}
        - {"text": "E_tip/E_body = R_tip/R_body = (0.010 m)/(0.50 m) = 0.020", "correct": false, "survives": true, "reason": "At equal potential, field is inversely proportional to radius; the smaller tip radius belongs in the denominator."}
```

**Correct result:** 50 exact.

**Answer text:** `E_tip/E_body=R_body/R_tip=50.` Equal V with `E=V/R` crowds field at small radius.

**Why:** equal potential makes `E=V/R`, so smaller curvature radius means larger field.

**Wrong-path feedback:** equal voltage does not mean equal surface charge.

**State/output:** unlock S3.

## Stop 15 - Verify Static Shielding

**Format/placement:** VERIFY, at `cabinet`.

**Metadata:** Concept: 5 - shielding/conductor; Keystone: K4,K12; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3 test.

**Call - exact player copy:** Go to the shielding cabinet, in Mast Base.

**Stop reason - exact player copy:** Tip enhancement does not establish whether the nearby equipment cabinet shields its interior.

**Question card story setup - exact player copy:** Because the tip model is local, test whether a closed conducting cabinet blocks a static external field. Predict its interior reading before the door control unlocks, then compare open and closed states.

**Question card story-science connection - exact player copy:** The open-and-closed interior readings test whether static external fields can explain damage inside the cabinet.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Enter 0.00 kV/m for the closed cabinet. OPERATE: Open, then close, the door while external field and sensor position stay fixed. MEASURE: Record both interior fields. INTERPRET: Restore the door closed and submit one shielding conclusion.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"closed-cabinet interior field",unit:"kV/m",truth:0.00,tolerance:0.02}},equipment_locked_until_prediction_commit:true,operation:{control:"cabinet door",settings:["open","closed"],fixed:["external field 4.0 kV/m","sensor position"]},measurements:{open:1.20,closed:0.00,unit:"kV/m"},restore:{required:true,setting:"closed",remeasure:true},correct_conclusion:"static shielding confirmed",answerText:"The closed cabinet reads 0.00 kV/m within tolerance, while opening admits field; closing restores shielding."}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify Static Shielding", unit: "units printed on the card"}
  predictionRange: {min: 50.0, max: 150.0, step: 10.0}
  measurement: {label: "independent measured value", truth: 100.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`Closed reading 0.00 kV/m confirms static shielding.` Surface charge cancels interior E."
```

**Correct result:** `Closed reading 0.00 kV/m confirms static shielding.` Surface charge cancels interior E.

**Answer text:** The completed check shows closed reading 0.00 kV/m confirms static shielding. Surface charge cancels interior E.

**Why:** induced surface charge cancels static field inside a closed conductor.

**Wrong-path feedback:** `Commit the closed-state prediction before touching the door, and restore the door closed.`

**State/output:** unlock S4.

## Stop 16 - Diagnose the Remote Path

**Format/placement:** DIAGNOSIS, at `cabinet`.

**Metadata:** Concept: 30 - local versus remote cause; Keystone: K4,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the shielding cabinet, in Mast Base.

**Stop reason - exact player copy:** The shielding result makes the damaged cable card harder to explain as direct static-field exposure.

**Question card story setup - exact player copy:** Now the mast tip can exceed breakdown while a closed conductor remains field-free. Diagnose which explanation fits tip corona, no trailer arc mark, and damage only on a cable card.

**Question card story-science connection - exact player copy:** A mechanism must explain both the tip corona and the quiet cabinet shell before the crew chooses a repair path.

**Question card prompt - exact player copy:** Read every alarming and quiet zone, select one diagnosis that fits them all, and submit either tip field alone, site-wide field, or conducted/induced path.

**Complete format-specific interaction block:** headline `WHAT FAILED?`; readings zones `[tip_corona:alarm,trailer_shell_arc:none,card_damage:alarm,cabinet_inside:quiet]`; choices `[tip_field_alone,conducted_or_induced_path,sitewide_uniform_field]`; answer `conducted_or_induced_path`.

**§7 authored-board source - DIAGNOSIS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 16 - Diagnose the Remote Path"
  format: "DIAGNOSIS"
  source: "Handback 3 canonical interaction block"
  question: "Read every alarming and quiet zone, select one diagnosis that fits them all, and submit either tip field alone, site-wide field, or conducted/induced path."
  payload: "headline `WHAT FAILED?`; readings zones `[tip_corona:alarm,trailer_shell_arc:none,card_damage:alarm,cabinet_inside:quiet]`; choices `[tip_field_alone,conducted_or_induced_path,sitewide_uniform_field]`; answer `conducted_or_induced_path`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DIAGNOSIS:**

```yaml
diagnosis:
  headline: "Read every alarming and quiet zone, select one diagnosis that fits them all, and submit either tip field alone, site-wide field, or conducted/induced path."
  readings:
    - {zone: alarm_source, label: "alarming source zone", value: "alarm present"}
    - {zone: transfer_path, label: "possible transfer path", value: "evidence present"}
    - {zone: quiet_control, label: "quiet comparison zone", value: "no alarm"}
    - {zone: protected_interior, label: "protected interior", value: "quiet"}
  choices:
    - {id: conducted_path, label: "Conducted or induced path from the tip"}
    - {id: tip_only, label: "Tip field alone"}
    - {id: uniform_field, label: "Site-wide uniform field"}
    - {id: trailer_arc, label: "Direct arc inside the trailer"}
  answer: conducted_path
  rebuttals:
    tip_only: "Tip-only damage cannot explain the remote card alarm."
    uniform_field: "A site-wide field contradicts the quiet cabinet interior."
    trailer_arc: "A direct trailer arc contradicts the quiet shell and intact entry path."
```

**Correct result:** `A conducted or induced path fits all readings.` Tip-only and uniform-field models fail quiet evidence.

**Answer text:** The completed check shows a conducted or induced path fits all readings. Tip-only and uniform-field models fail quiet evidence.

**Why:** a local strong field explains corona but cannot cross two hundred metres without a coupling path.

**Wrong-path feedback:** `Use the absent shell arc and quiet cabinet, not only the alarming card.`

**State/output:** report piece 4→M5.

## Mission outcome

Mission decision: Tip enhancement did not by itself cause the outstation loss. It explains why the mast launches a discharge. But the trailer evidence requires a conducted or induced path. The search now moves from voltage to stored charge. Metric: target 18:00.

**Segue - exact player copy:** Therefore Strand must compare stored charge before she fires the bank; the tip is only the start of the case.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Marcus Tate pins the TIP EFFECT INCOMPLETE finding beside the mast drawing. Therefore Strand must compare stored charge before she fires the bank; the tip is only the start of the case.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains conductor?

**Options - exact player copy:**

- A. Zero interior field and perpendicular exterior field rule out three pictures.
- B. Equal potential makes E=V/R, so smaller curvature radius means larger field.
- C. Induced surface charge cancels static field inside a closed conductor.
- D. Material whose mobile charge rearranges easily.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for conductor. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conductor equilibrium. It does not answer the question about conductor.
- B: This describes spherical-curvature proxy. It does not answer the question about conductor.
- C: This describes shielding and conductor. It does not answer the question about conductor.
- D: Correct. Material whose mobile charge rearranges easily.

### Review question 2


**Prompt - exact player copy:** Which electric-field pattern is consistent with a conductor in electrostatic equilibrium?

**Options - exact player copy:**

- A. The field is zero within the conducting material and is perpendicular to its surface immediately outside.
- B. Material whose mobile charge rearranges easily.
- C. Equal potential makes E=V/R, so smaller curvature radius means larger field.
- D. Induced surface charge cancels static field inside a closed conductor.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for conductor equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The field is zero within the conducting material and is perpendicular to its surface immediately outside.
- B: This describes conductor. It does not answer the question about conductor equilibrium.
- C: This describes spherical-curvature proxy. It does not answer the question about conductor equilibrium.
- D: This describes shielding and conductor. It does not answer the question about conductor equilibrium.

### Review question 3


**Prompt - exact player copy:** Which statement best explains spherical-curvature proxy?

**Options - exact player copy:**

- A. Material whose mobile charge rearranges easily.
- B. Equal potential makes E=V/R, so smaller curvature radius means larger field.
- C. Zero interior field and perpendicular exterior field rule out three pictures.
- D. Induced surface charge cancels static field inside a closed conductor.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for spherical-curvature proxy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conductor. It does not answer the question about spherical-curvature proxy.
- B: Correct. Equal potential makes E=V/R, so smaller curvature radius means larger field.
- C: This describes conductor equilibrium. It does not answer the question about spherical-curvature proxy.
- D: This describes shielding and conductor. It does not answer the question about spherical-curvature proxy.

### Review question 4


**Prompt - exact player copy:** Which statement best explains shielding and conductor?

**Options - exact player copy:**

- A. Material whose mobile charge rearranges easily.
- B. Zero interior field and perpendicular exterior field rule out three pictures.
- C. Induced surface charge cancels static field inside a closed conductor.
- D. Equal potential makes E=V/R, so smaller curvature radius means larger field.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for shielding and conductor. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conductor. It does not answer the question about shielding and conductor.
- B: This describes conductor equilibrium. It does not answer the question about shielding and conductor.
- C: Correct. Induced surface charge cancels static field inside a closed conductor.
- D: This describes spherical-curvature proxy. It does not answer the question about shielding and conductor.

### Review question 5


**Prompt - exact player copy:** A sharp conductor tip produces corona, but an electronic card 200 m away is damaged. Why is the tip's field enhancement not a complete explanation?

**Options - exact player copy:**

- A. Material whose mobile charge rearranges easily.
- B. Zero interior field and perpendicular exterior field rule out three pictures.
- C. Equal potential makes E=V/R, so smaller curvature radius means larger field.
- D. A mechanism carrying energy or an induced signal to the remote card must also be identified.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for local versus remote cause. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes conductor. It does not answer the question about local versus remote cause.
- B: This describes conductor equilibrium. It does not answer the question about local versus remote cause.
- C: This describes spherical-curvature proxy. It does not answer the question about local versus remote cause.
- D: Correct. A mechanism carrying energy or an induced signal to the remote card must also be identified.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Material whose mobile charge rearranges easily.
- C. Zero interior field and perpendicular exterior field rule out three pictures.
- D. Equal potential makes E=V/R, so smaller curvature radius means larger field.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes conductor. It does not answer the question about electric charge.
- C: This describes conductor equilibrium. It does not answer the question about electric charge.
- D: This describes spherical-curvature proxy. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- electrostatic equilibrium, equipotential conductors, E_out=σ/ε₀, curvature enhancement, shielding.
- ## Four graded stops
- **Mission takeaway:** Tip enhancement did not by itself cause the outstation loss.

---

# Mission 5 - The Sky as a Capacitor

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 5 - 11 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Sky as a Capacitor  
**Card body:** 11 days until the last storm window closes. Twelve numbered stages stand behind the rail below a cloud sketch. Today you decide what the bank can model about the storm.
**Objective:** Build a bounded cloud-ground capacitance and charge model.  
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
  - id: groundtruth_m05_we01
    title: Use capacitance
    problem: A capacitor holds Q=20 μC at V=10 V. Find capacitance.
    rule: C=Q/V.
    steps:
    - 'Set up the relationship: C=Q/V.'
    - C=(20 μC)/(10 V)=2 μF.
    answer: Capacitance is 2 microfarads.
    common_mistake: Capacitance is charge per voltage, not voltage per charge.
  - id: groundtruth_m05_we02
    title: Parallel-plate capacitance
    problem: Vacuum plates have area A=0.02 m² and separation d=0.001 m. Use ε0≈9×10^-12 F/m and neglect edge effects.
    rule: C=ε0 A/d.
    steps:
    - 'Set up the relationship: C=ε0 A/d.'
    - C=(9×10^-12)(0.02)/(0.001)=1.8×10^-10 F=180 pF.
    answer: Capacitance is approximately 180 pF.
    common_mistake: Increasing plate separation decreases capacitance.
  - id: groundtruth_m05_we03
    title: Insert a dielectric
    problem: A capacitor has vacuum capacitance 2 μF. A dielectric of relative permittivity κ=3 completely fills the gap. Find capacitance.
    rule: C_new=κ C_vacuum for the stated ideal filling.
    steps:
    - 'Set up the relationship: C_new=κ C_vacuum for the stated ideal filling.'
    - C_new=3(2)=6 μF.
    answer: The new capacitance is 6 μF.
    common_mistake: Whether voltage or charge changes also depends on whether a battery remains connected.
  - id: groundtruth_m05_we04
    title: Parallel capacitors
    problem: Capacitors of 2 μF and 3 μF are connected in parallel. Find equivalent capacitance.
    rule: For parallel capacitors, C_eq=C1+C2.
    steps:
    - 'Set up the relationship: For parallel capacitors, C_eq=C1+C2.'
    - C_eq=2+3=5 μF.
    answer: Equivalent capacitance is 5 μF.
    common_mistake: Parallel capacitors share voltage; their charges add.
  - id: groundtruth_m05_we05
    title: Series capacitors
    problem: Two identical 4 μF capacitors are connected in series. Find equivalent capacitance.
    rule: 1/C_eq=1/C1+1/C2.
    steps:
    - 'Set up the relationship: 1/C_eq=1/C1+1/C2.'
    - 1/C_eq=1/4+1/4=1/2 per μF, so C_eq=2 μF.
    answer: Equivalent capacitance is 2 μF.
    common_mistake: Series capacitance is smaller than either component here.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Capacitance: stored charge per voltage. Dielectric: insulating material that changes capacitance by polarization. Polarization: small charge separation inside matter.

#### Primer concepts

- `C` depends on geometry/material, not supplied `Q` or `V`; parallel capacitors add; series total is smaller than either member.

#### Equations first needed today
**Equation:** `C=Q/V`, `C=κε₀A/d`

**What it is for:** connect geometry, material, charge, voltage

**Symbols:** `C` capacitance in farads; `Q` stored charge in coulombs; `V` potential difference in volts; `κ` dimensionless dielectric constant; `ε₀` vacuum permittivity; `A` plate area in square metres; `d` plate separation in metres.

**Why this campaign needs it:** translate storm geometry into a safe bank target.

## Main story happening - designer summary
Field Station Stops 1–2 bound geometry; evidence sends the player to Impulse Hall because only bank hardware can reproduce charge; Stop 3 derives the combination; Stop 4 selects the setting. Two locations, causal waypoint `Take the bounded capacitance and voltage to Impulse Hall.`

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**Trigger:** mission_5_arrival.

**World state:** Twelve numbered stages stand behind the rail below a cloud sketch.

**Panel/HUD text:** Ravi Sen, field scientist: “Use geometry first. Voltage comes only after we know what can store charge.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Use geometry first. Voltage comes only after we know what can store charge."

**Unlocks/waypoint:** Unlock Stop 17 at `mill-array` in Field Station.

**Beat 2 - After Stop 17 | `storm-profile-board` | automatic**

**Trigger:** accepted_stop_17.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 17 reads: "C=ε₀A/d=44.3 nF. Gauss plus V=Ed cancels Q.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. The capacitance alone leaves multiple combinations of cloud area and dielectric factor possible."

**Unlocks/waypoint:** Unlock Stop 18 at `storm-profile-board` in Field Station.

**Beat 3 - After Stop 18 | `hall-board` | automatic**

**Trigger:** accepted_stop_18.

**World state:** At `storm-profile-board`, the dated accepted-result slip for Stop 18 reads: "truth. State waypoint BANK.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. The storm estimate is ready for comparison with the bank's actual charging and discharge connections."

**Unlocks/waypoint:** Unlock Stop 19 at `hall-board` in Impulse Hall.

**Beat 4 - After Stop 19 | `trailer-cards` | automatic**

**Trigger:** accepted_stop_19.

**World state:** At `hall-board`, the dated accepted-result slip for Stop 19 reads: "tolerances.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. The bank topology is known, but the shot model still lacks measurements needed for a defensible comparison."

**Unlocks/waypoint:** Unlock Stop 20 at `trailer-cards` in Remote Outstation.

**Beat 5 - At mission end | `mill-array` | automatic**

**Trigger:** accepted_stop_20.

**World state:** At `hall-board`, Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Strand: "We can match an electrical pulse. We cannot build a cloud indoors. But Ortiz has one test window left today; Strand must bound the energy before the rail lamps can change."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m05

**Home:** `hall-board`. **Before:** The dated mission-5 evidence holder at this fixture has no accepted record. Twelve numbered stages stand behind the rail below a cloud sketch.
**After — exact action:** Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram.
**Trigger:** accepted_stop_20. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `gap-row`, the earthing stick rests on the bank while the stage lamps stay dark.
**Segue - exact player copy:** But Ortiz has one test window left today; Strand must bound the energy before the rail lamps can change.

## Location plan

FIELD→BANK because the bank topology cannot be inspected at FIELD. 

## Characters and dramatic beat

Ravi protects model honesty; Strand protects operability. 

## Key concepts, explained here

`C=Q/V`, `C=κε₀A/d`, dielectric polarization, series/parallel topology.  

## Four graded stops
## Stop 17 - Derive Cloud-Ground Capacitance

**Format/placement:** DERIVE, at `mill-array`.

**Metadata:** Concept: 11 - parallel-plate capacitance; Keystone: K2,K3,K5; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The storm model needs a capacitance estimate before its stored charge can be compared with the test bank.

**Question card story setup - exact player copy:** The layer model now has area A=2.0×10^8 m², height d=4.0×10^4 m, and effective κ=1.00. Derive cloud-ground capacitance before using any voltage.

**Question card story-science connection - exact player copy:** Cloud-ground capacitance connects the measured layer geometry to the amount of charge stored at a given voltage.

**Fixture source panel - exact player copy:** The layer model now has area A=2.0×10^8 m², height d=4.0×10^4 m, and effective κ=1.00. Derive cloud-ground capacitance before using any voltage. Vacuum permittivity: ε₀ = 8.854 × 10^-12 F/m.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit capacitance in nF to the displayed tolerance.

**Complete format-specific interaction block:** lines `E=σ/ε0`(Gauss boundary), `V=Ed=Qd/(ε0A)`(σ=Q/A), `C=Q/V=ε0A/d`(definition), substitution→`C=(8.854e-12 F/m)(2.0e8 m²)/(4.0e4 m)=4.427e-8 F=44.3 nF`. Prompt includes `ε0`; submit nF. Tolerance.2 nF. Worked answer.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `E=σ/(2ε0), treating the conductor as an isolated sheet`
2. `V=EQ/(ε0A)`
3. `C=V/Q`
4. `C=ε0Ad`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The layer model now has area A=2.0×10^8 m², height d=4.0×10^4 m, and effective κ=1.00.", "Using ε₀=8.854×10^-12 F/m, build every line from Gauss’s law through C=Q/V, name each rule, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Cloud-Ground Capacitance in the form and units requested by the prompt"
  left_side: "C"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "E=σ/ε0", correct: true}
        - {text: "E=σ/(2ε0)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "V=Ed=Qd/(ε0A)", correct: true}
        - {text: "V=EQ/(ε0A)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "C=Q/V=ε0A/d", correct: true}
        - {text: "C=V/Q", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "C=(8.854e-12 F/m)(2.0e8 m²)/(4.0e4 m)=4.427e-8 F=44.3 nF", correct: true}
        - {"text": "C=(8.854e-12 F/m)(2.0e8 m²)(4.0e4 m)=70.832 F", "correct": false, "survives": true, "reason": "Plate separation divides the capacitance expression; multiplying by it also fails the unit check."}
```

**Correct result:** `C=ε₀A/d=44.3 nF.` Gauss plus `V=Ed` cancels Q.

**Answer text:** The completed check shows c=ε₀A/d=44.3 nF. Gauss plus V=Ed cancels Q.

**Why:** Gauss gives field, and the field-potential relation turns it into capacitance.

**Wrong-path feedback:** `Convert height to metres and keep area in square metres; C is not QV.`

**State/output:** unlock S2.

## Stop 18 - Break the Area-Dielectric Degeneracy

**Format/placement:** DEGENERACY, at `storm-profile-board`.

**Metadata:** Concept: 12 - κ-area degeneracy; Keystone: K5,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L4.

**Call - exact player copy:** Go to the storm profile board, in Field Station.

**Stop reason - exact player copy:** The capacitance alone leaves multiple combinations of cloud area and dielectric factor possible.

**Question card story setup - exact player copy:** Because C=κε₀A/d, area and dielectric factor can trade off while matching 44.3 nF. Adjust both controls, then use radar area to collapse the matching curve.

**Question card story-science connection - exact player copy:** The radar area constraint determines which geometry-material combination can legitimately feed the bank comparison.

**Question card prompt - exact player copy:** Use the two controls cloud area A and dielectric factor kappa. Adjust A from 1.0×10^8 to 3.0×10^8 m2 in 0.1×10^8 m2 steps and kappa from 1.0 to 2.0 in 0.1 steps; apply both loci, then submit the numerical pair (A,kappa) before selecting the radar-constrained plan.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:"A",label:"cloud area",min:1.0e8,max:3.0e8,step:0.1e8,unit:"m^2"},{id:"kappa",label:"dielectric factor",min:1.0,max:2.0,step:0.1,unit:"unitless"}],tolerance:{capacitance:1,unit:"nF"},first_locus:[[1.0e8,2.0],[1.2e8,1.67],[1.4e8,1.43],[1.6e8,1.25],[1.8e8,1.11],[2.0e8,1.0]],second_locus:[[1.9e8,1.05],[2.0e8,1.0],[2.1e8,0.95]],physical_constraint:"radar area A=(2.0±0.1)×10^8 m^2",truth_pair:[2.0e8,1.0],required_submission:"numeric (A,kappa) pair before plan choice",correct_plan:"radar-constrained plan",answerText:"Radar fixes area near 2.0×10^8 m^2, so capacitance fixes kappa near 1.0."}`

**Correct result:** truth. State waypoint BANK.

**Answer text:** `Radar selects (2.0×10^8 m²,1.00).` A second constraint breaks the product degeneracy.

**Why:** a second physical constraint prevents a convenient but false parameter choice.

**Wrong-path feedback:** `Submit both numerical controls before the plan; capacitance alone leaves a locus.`

**State/output:** Record the result and unlock the next named stop.

## Stop 19 - Derive Marx Topology

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: 14 - series/parallel capacitors; Keystone: K5; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** The storm estimate is ready for comparison with the bank's actual charging and discharge connections.

**Question card story setup - exact player copy:** At Impulse Hall, Elise Strand, impulse engineer, shows twelve 100 nF stage capacitors. Derive the equivalent capacitance when they charge in parallel and discharge in series.

**Question card story-science connection - exact player copy:** The two equivalent capacitances explain why the bank can charge at one voltage arrangement and discharge at another.

**Fixture source panel - exact player copy:** At Impulse Hall, Elise Strand, impulse engineer, shows twelve 100 nF stage capacitors. Derive the equivalent capacitance when they charge in parallel and discharge in series.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit both equivalent capacitances in μF and nF.

**Complete format-specific interaction block:** lines `Ccharge=ΣC_i=12(100 nF)=1200 nF=1.20µF`(parallel), `1/Cdis=Σ1/C=12/C`(series), `Cdis=(100 nF)/12=8.33 nF`(algebra).

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `C_charge=C/12 because the charging capacitors are in series`
2. `1/C_dis=1/(12C)`
3. `C_dis=12C`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["At Impulse Hall, Elise Strand, impulse engineer, shows twelve 100 nF stage capacitors."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Marx Topology in the form and units requested by the prompt"
  left_side: "Ccharge"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Ccharge=ΣC_i=12(100 nF)=1200 nF=1.20µF", correct: true}
        - {text: "Ccharge=(1/C+1/C+...+1/C)^-1=C/12", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "1/Cdis=Σ1/C=12/C", correct: true}
        - {text: "1/C_dis=1/(12C)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Cdis=(100 nF)/12=8.33 nF", correct: true}
        - {text: "C_dis=12C", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** tolerances.

**Answer text:** `Charge: 1.20 μF; discharge: 8.33 nF.` Parallel adds C; series adds reciprocals.

**Why:** Marx topology stores charge at low stage voltage and delivers summed voltage.

**Wrong-path feedback:** `Identify same two nodes versus in-line stages before selecting a topology rule.`

**State/output:** unlock S4.

## Stop 20 - Buy Model Evidence

**Format/placement:** VALUE, asked by Dr. Lena Ortiz beside `trailer-cards`.

**Metadata:** Concept: 14 - bank representation; Keystone: K5,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the diagnostic card rack in Remote Outstation.

**Stop reason - exact player copy:** The bank topology is known, but the shot model still lacks measurements needed for a defensible comparison.

**Question card story setup - exact player copy:** With storm capacitance bounded and bank topology known, four possible measurements compete for six setup-hours. Buy the evidence that determines voltage, charge, and timing without pretending the bank matches cloud geometry.

**Question card story-science connection - exact player copy:** The selected measurements must constrain the bank's voltage, charge storage, and discharge timing within the setup budget.

**Question card prompt - exact player copy:** Spend no more than six setup-hours on the listed measurements and submit the evidence set that fixes represented voltage, charge, and timing without claiming matched geometry.

**Complete format-specific interaction block:** `value:{budget:6,options:[{id:"stage_voltage",axis:"voltage scale",cost:2,required:true},{id:"stage_capacitance",axis:"stored charge and energy",cost:1,required:true},{id:"gap_timing",axis:"pulse timing",cost:2,required:true},{id:"hall_temperature",axis:"ambient condition",cost:2,required:false},{id:"paint_color",axis:"cosmetic condition",cost:1,required:false}],total_available_cost:8,correct_purchase:["stage_voltage","stage_capacitance","gap_timing"],reserve:1,answerText:"Buy voltage, capacitance, and timing evidence for five credits; temperature and paint cannot validate the electrical analog."}`

**Correct result:** `Buy stage V, stage C, and gap timing.` They constrain represented quantities within budget.

**Answer text:** match V,Q,timing.

**Why:** a model is useful when its matched variables and limitations are explicit.

**Wrong-path feedback:** `A convenient measurement is not valuable unless it can change the representation decision.`

**State/output:** report piece5.

## Mission outcome

Mission decision: Use the twelve-stage Marx bank only as an electrical model. Match voltage, charge, and timing. The storm capacitance is about 44.3 nF. The bank does not copy cloud shape. Next, calculate staged energy.

**Segue - exact player copy:** But Ortiz has one test window left today; Strand must bound the energy before the rail lamps can change.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Elise Strand clips the ELECTRICAL MODEL ONLY card to the bank diagram. But Ortiz has one test window left today; Strand must bound the energy before the rail lamps can change.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains capacitance?

**Options - exact player copy:**

- A. Gauss gives field, and the field-potential relation turns it into capacitance.
- B. Stored charge per voltage.
- C. A second physical constraint prevents a convenient but false parameter choice.
- D. Marx topology stores charge at low stage voltage and delivers summed voltage.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for capacitance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes parallel-plate capacitance. It does not answer the question about capacitance.
- B: Correct. Stored charge per voltage.
- C: This describes confounding between dielectric factor and plate area. It does not answer the question about capacitance.
- D: This describes series and parallel capacitors. It does not answer the question about capacitance.

### Review question 2


**Prompt - exact player copy:** Which statement best explains parallel-plate capacitance?

**Options - exact player copy:**

- A. Stored charge per voltage.
- B. A second physical constraint prevents a convenient but false parameter choice.
- C. Gauss gives field, and the field-potential relation turns it into capacitance.
- D. Marx topology stores charge at low stage voltage and delivers summed voltage.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for parallel-plate capacitance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes capacitance. It does not answer the question about parallel-plate capacitance.
- B: This describes confounding between dielectric factor and plate area. It does not answer the question about parallel-plate capacitance.
- C: Correct. Gauss gives field, and the field-potential relation turns it into capacitance.
- D: This describes series and parallel capacitors. It does not answer the question about parallel-plate capacitance.

### Review question 3


**Prompt - exact player copy:** Which statement best explains confounding between dielectric factor and plate area?

**Options - exact player copy:**

- A. Stored charge per voltage.
- B. Gauss gives field, and the field-potential relation turns it into capacitance.
- C. Marx topology stores charge at low stage voltage and delivers summed voltage.
- D. A second physical constraint prevents a convenient but false parameter choice.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for confounding between dielectric factor and plate area. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes capacitance. It does not answer the question about confounding between dielectric factor and plate area.
- B: This describes parallel-plate capacitance. It does not answer the question about confounding between dielectric factor and plate area.
- C: This describes series and parallel capacitors. It does not answer the question about confounding between dielectric factor and plate area.
- D: Correct. A second physical constraint prevents a convenient but false parameter choice.

### Review question 4


**Prompt - exact player copy:** Which statement best explains series and parallel capacitors?

**Options - exact player copy:**

- A. Marx topology stores charge at low stage voltage and delivers summed voltage.
- B. Stored charge per voltage.
- C. Gauss gives field, and the field-potential relation turns it into capacitance.
- D. A second physical constraint prevents a convenient but false parameter choice.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for series and parallel capacitors. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Marx topology stores charge at low stage voltage and delivers summed voltage.
- B: This describes capacitance. It does not answer the question about series and parallel capacitors.
- C: This describes parallel-plate capacitance. It does not answer the question about series and parallel capacitors.
- D: This describes confounding between dielectric factor and plate area. It does not answer the question about series and parallel capacitors.

### Review question 5


**Prompt - exact player copy:** Which statement best explains bank representation?

**Options - exact player copy:**

- A. Stored charge per voltage.
- B. A model is useful when its matched variables and limitations are explicit.
- C. Gauss gives field, and the field-potential relation turns it into capacitance.
- D. A second physical constraint prevents a convenient but false parameter choice.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for bank representation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes capacitance. It does not answer the question about bank representation.
- B: Correct. A model is useful when its matched variables and limitations are explicit.
- C: This describes parallel-plate capacitance. It does not answer the question about bank representation.
- D: This describes confounding between dielectric factor and plate area. It does not answer the question about bank representation.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Stored charge per voltage.
- B. Gauss gives field, and the field-potential relation turns it into capacitance.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. A second physical constraint prevents a convenient but false parameter choice.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes capacitance. It does not answer the question about electric charge.
- B: This describes parallel-plate capacitance. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes confounding between dielectric factor and plate area. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- C=Q/V, C=κε₀A/d, dielectric polarization, series/parallel topology.
- ## Four graded stops
- **Mission takeaway:** Use the twelve-stage Marx bank only as an electrical analog, matched in voltage, charge,.

---

# Mission 6 - Count the Bank's Energy

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 6 - 10 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Count the Bank's Energy  
**Card body:** 10 days until the last storm window closes. The earthing stick rests on the bank while the stage lamps stay dark. Today you decide whether the reduced-energy bank test can run.
**Objective:** Bound bank energy and authorize or reject the test.  
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
  - id: groundtruth_m06_we01
    title: Stored electric energy
    problem: A capacitor has C=2 μF and V=10 V. Find stored energy.
    rule: U=CV²/2.
    steps:
    - 'Set up the relationship: U=CV²/2.'
    - U=(2×10^-6)(10²)/2=10^-4 J.
    answer: Stored energy is 0.0001 J.
    common_mistake: Do not forget the one-half factor.
  - id: groundtruth_m06_we02
    title: Energy of identical capacitors
    problem: Three separate capacitors each store 4 J. Find total stored energy before reconnection.
    rule: Total energy is the sum over the capacitors.
    steps:
    - 'Set up the relationship: Total energy is the sum over the capacitors.'
    - U_total=3(4)=12 J.
    answer: The bank stores 12 J before reconnection.
    common_mistake: How much energy remains after a reconnection depends on losses and the circuit.
  - id: groundtruth_m06_we03
    title: Electric field energy density
    problem: A vacuum electric field has magnitude E=10^6 V/m. Use ε0≈9×10^-12 F/m. Find energy per volume.
    rule: u_E=ε0 E²/2.
    steps:
    - 'Set up the relationship: u_E=ε0 E²/2.'
    - u_E=(9×10^-12)(10^12)/2=4.5 J/m³.
    answer: Energy density is 4.5 J per cubic metre.
    common_mistake: The field is squared before powers of ten are combined.
  - id: groundtruth_m06_we04
    title: Parallel capacitors
    problem: Capacitors of 2 μF and 3 μF are connected in parallel. Find equivalent capacitance.
    rule: For parallel capacitors, C_eq=C1+C2.
    steps:
    - 'Set up the relationship: For parallel capacitors, C_eq=C1+C2.'
    - C_eq=2+3=5 μF.
    answer: Equivalent capacitance is 5 μF.
    common_mistake: Parallel capacitors share voltage; their charges add.
  - id: groundtruth_m06_we05
    title: Series capacitors
    problem: Two identical 4 μF capacitors are connected in series. Find equivalent capacitance.
    rule: 1/C_eq=1/C1+1/C2.
    steps:
    - 'Set up the relationship: 1/C_eq=1/C1+1/C2.'
    - 1/C_eq=1/4+1/4=1/2 per μF, so C_eq=2 μF.
    answer: Equivalent capacitance is 2 μF.
    common_mistake: Series capacitance is smaller than either component here.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Marx bank: capacitors charged in parallel and discharged in series. Energy density: stored energy per volume. Spark gap: switch that conducts after breakdown.

#### Primer concepts

- Total energy is conserved apart from losses; voltage sums in series; late gap firing changes pulse shape.

#### Equations first needed today
**Equation:** `U=½ C V²=Q²/(2C)=½ Q V`

**What it is for:** stored energy

**Symbols:** `U` stored electric energy in joules; `C` capacitance in farads; `V` potential difference in volts; `Q` charge in coulombs.

**Why this campaign needs it:** bound test.

**Equation:** `u_E=½ε₀E²`

**What it is for:** energy density

**Symbols:** `u_E` electric energy density in joules per cubic metre; `ε₀` vacuum permittivity; `E` electric-field magnitude in volts per metre.

**Why this campaign needs it:** compare local field hazard.

## Main story happening - designer summary
Impulse Hall derives energy and gap timing, then Launch Control records authorization. Beats include the earthing stick visibly on until Stop 4. Two locations because the authority record is unavailable in the hall.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `hall-board` | automatic**

**Trigger:** mission_6_arrival.

**World state:** The earthing stick rests on the bank while the stage lamps stay dark.

**Panel/HUD text:** Elise Strand, impulse engineer: “Count energy before this stick moves.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Count energy before this stick moves."

**Unlocks/waypoint:** Unlock Stop 21 at `hall-board` in Impulse Hall.

**Beat 2 - After Stop 21 | `gap-row` | automatic**

**Trigger:** accepted_stop_21.

**World state:** At `hall-board`, the dated accepted-result slip for Stop 21 reads: "Twelve stages store 1.50 kJ. Integrating V dq gives ½CV² per stage.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. The energy budget is fixed, leaving gap spacing as the next control on discharge timing."

**Unlocks/waypoint:** Unlock Stop 22 at `gap-row` in Impulse Hall.

**Beat 3 - After Stop 22 | `hall-board` | automatic**

**Trigger:** accepted_stop_22.

**World state:** At `gap-row`, the dated accepted-result slip for Stop 22 reads: "Choose 8 mm. It is the inspected setting meeting rise-time and breakdown bounds.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. The selected gap still needs a local field-energy check for the shield review."

**Unlocks/waypoint:** Unlock Stop 23 at `hall-board` in Impulse Hall.

**Beat 4 - After Stop 23 | `record-desk` | automatic**

**Trigger:** accepted_stop_23.

**World state:** At `hall-board`, the dated accepted-result slip for Stop 23 reads: "u_E=39.84 J/m³. Energy density scales with field squared.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Elise Strand: "That check holds. Passing energy and timing calculations does not yet establish that the physical hall is ready."

**Unlocks/waypoint:** Unlock Stop 24 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `hall-board` | automatic**

**Trigger:** accepted_stop_24.

**World state:** At `gap-row`, Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Strand: "The bank answered. Stage seven answered late. But Noor's timing strip puts stage 7 late; one energy total cannot prove one clean pulse."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m06

**Home:** `gap-row`. **Before:** The dated mission-6 evidence holder at this fixture has no accepted record. The earthing stick rests on the bank while the stage lamps stay dark.
**After — exact action:** Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale.
**Trigger:** accepted_stop_24. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `reference-panel`, four matching screen traces meet at one exposed reference wire.
**Segue - exact player copy:** But Noor's timing strip puts stage 7 late; one energy total cannot prove one clean pulse.

## Location plan

BANK→SHOT because only the records desk can authorize and preserve a shot. 

## Characters and dramatic beat

Strand values hardware realism; Ortiz requires identity and condition. 

## Key concepts, explained here

 capacitor work integral, `U`, energy density, breakdown, Marx timing.  

## Four graded stops
## Stop 21 - Derive Stored Bank Energy

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: 13 - capacitor energy; Keystone: K5,K6; Area: Impulse Hall; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** The earthing stick must remain in place until the planned shot's stored energy is established.

**Question card story setup - exact player copy:** Each of twelve stages has C=100 nF and charges to V=50.0 kV. Derive the bank's total stored energy before anyone removes the earthing stick.

**Question card story-science connection - exact player copy:** Total capacitor energy sets the exposure the hall's shields and reduced-shot authorization must accommodate.

**Fixture source panel - exact player copy:** Each of twelve stages has C=100 nF and charges to V=50.0 kV. Derive the bank's total stored energy before anyone removes the earthing stick.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit total twelve-stage stored energy in joules.

**Complete format-specific interaction block:** lines `dU=Vdq`(work), `q=CV`(capacitor), `U=∫0^Q(q/C)dq=Q²/2C=½CV²`(integrate), `Utot=12×½(100e-9)(50e3)²=1500J`. Prompt derive and submit J, tolerance 5. Answer 1.50 kJ.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `dU=q dV`
2. `q=V/C`
3. `U=QV, omitting the one-half`
4. `U_tot=½(100e-9)(50e3)², forgetting all 12 capacitors`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Each of twelve stages has C=100 nF and charges to V=50.0 kV.", "Build the four-line energy derivation beginning with dU=Vdq, name each rule, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Stored Bank Energy in the form and units requested by the prompt"
  left_side: "U"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "dU=Vdq", correct: true}
        - {text: "dU=q dV", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "q=CV", correct: true}
        - {text: "q=V/C", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "U=∫0^Q(q/C)dq=Q²/2C=½CV²", correct: true}
        - {text: "U=QV", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Utot=12×½(100e-9)(50e3)²=1500J", correct: true}
        - {text: "U_tot=½(100e-9)(50e3)², forgetting all 12 capacitors", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `Twelve stages store 1.50 kJ.` Integrating `V dq` gives `½CV²` per stage.

**Answer text:** The completed check shows twelve stages store 1.50 kJ. Integrating V dq gives ½CV² per stage.

**Why:** summing stage energy avoids misusing the discharge-equivalent capacitance.

**Wrong-path feedback:** `Use charging topology and multiply per-stage energy by twelve; do not use discharge C.`

**State/output:** unlock S2.

## Stop 22 - Sweep Gap Timing

**Format/placement:** SWEEP, at `gap-row`.

**Metadata:** Concept: 12 - breakdown/timing; Keystone: K4,K6,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3.

**Call - exact player copy:** Go to the spark-gap row, in Impulse Hall.

**Stop reason - exact player copy:** The energy budget is fixed, leaving gap spacing as the next control on discharge timing.

**Question card story setup - exact player copy:** With total energy fixed at 1.50 kJ, sweep the first-gap spacing from 4 to 10 mm. Record breakdown voltage and rise time only at settings you inspect.

**Question card story-science connection - exact player copy:** The joint breakdown-voltage and rise-time readings determine which gap setting the shot plan can use.

**Question card prompt - exact player copy:** Sweep only first-gap spacing from 4 through 10 mm while total energy remains 1.50 kJ, measure voltage and rise time at inspected points, and submit one inspected setting meeting both goals.

**Complete format-specific interaction block:** points spacing `[4,5,6,7,8,9,10]`, rise_ns `[40,55,70,90,115,145,180]`, breakdown_kV `[30,36,42,49,56,63,70]`; goal rise≥100ns and V≤60kV; correct 8mm. Prompt sweep and submit setting.

**Correct result:** `Choose 8 mm.` It is the inspected setting meeting rise-time and breakdown bounds.

**Answer text:** The completed check shows choose 8 mm. It is the inspected setting meeting rise-time and breakdown bounds.

**Why:** gap geometry changes the pulse front even when stored energy stays fixed.

**Wrong-path feedback:** `Submit a measured setting satisfying both conditions, not an interpolated uninspected point.`

**State/output:** unlock S3.

## Stop 23 - Derive Electric Energy Density

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: 13 - energy density/field; Keystone: K6,K4; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** The selected gap still needs a local field-energy check for the shield review.

**Question card story setup - exact player copy:** Because the 8 mm setting controls rise time, compute the local electric energy density at the fictional wet-air limit E=3.0 MV/m. Derive the result for the hall shield review.

**Question card story-science connection - exact player copy:** Electric energy density translates the wet-air field limit into energy concentrated per unit volume near the shield.

**Fixture source panel - exact player copy:** Because the 8 mm setting controls rise time, compute the local electric energy density at the fictional wet-air limit E=3.0 MV/m. Derive the result for the hall shield review. Vacuum permittivity: ε₀ = 8.854 × 10^-12 F/m.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit u_E in J/m³.

**Complete format-specific interaction block:** lines `uE=½ε0E²`; substitution `½(8.854e-12)(3.0e6)²`; result `39.84 J/m³`. Prompt submit J/m³ tolerance.2.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `u_E=ε0E², omitting one-half`
2. `Use E rather than E² in the substitution`
3. `39.84 J, omitting the per-volume unit`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Because the 8 mm setting controls rise time, compute the local electric energy density at the fictional wet-air limit E=3.0 MV/m.", "Build the electric-energy-density calculation using ε₀=8.854×10^-12 F/m and E=3.0×10^6 N/C, name each rule, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Electric Energy Density in the form and units requested by the prompt"
  left_side: "u"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "uE=½ε0E²", correct: true}
        - {text: "u_E=ε0E²", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "u = ½(8.854e-12)(3.0e6)²", correct: true}
        - {text: "u = 0.5(8.854e-12)(3.0e6)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "u = 39.84 J/m³", correct: true}
        - {text: "u = 39.84 J", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `u_E=39.84 J/m³.` Energy density scales with field squared.

**Answer text:** The completed check shows u_E=39.84 J/m³. Energy density scales with field squared.

**Why:** field squared makes local hotspots matter strongly.

**Wrong-path feedback:** `Square 3.0×10^6 N/C before multiplying by ε₀/2.`

**State/output:** unlock S4.

## Stop 24 - Authorize the Reduced Shot

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `record-desk`.

**Metadata:** Concept: 30 - authorization records; Keystone: K6,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the record desk in Launch Control.

**Stop reason - exact player copy:** Passing energy and timing calculations does not yet establish that the physical hall is ready.

**Question card story setup - exact player copy:** Now energy and gap settings pass, but a calculation alone cannot prove the hall is ready. Verify the critical claims within three checks before signing the reduced-energy shot.

**Question card story-science connection - exact player copy:** The verified readiness claims determine whether the reduced-energy shot can be authorized without an unchecked critical condition.

**Question card prompt - exact player copy:** Use at most three checks to verify the unbacked critical hall claims, then submit AUTHORIZE or HOLD for the reduced-energy shot.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"earth_stick",label:"earth stick present",signed:true,backed:true,critical:true},{id:"discharged",label:"capacitors discharged",signed:true,backed:true,critical:true},{id:"gap",label:"gap set to 8 mm",signed:true,backed:true,critical:true},{id:"door_clear",label:"test door clear",signed:true,backed:false,critical:true},{id:"weather",label:"weather window safe",signed:true,backed:false,critical:true},{id:"stage_serial",label:"stage serial matches plan",signed:true,backed:false,critical:true}],correct_verified:["door_clear","weather","stage_serial"],critical_unbacked:["door_clear","weather","stage_serial"],answerText:"Use all three checks on the unbacked door, weather, and stage-serial claims before authorizing the reduced shot."}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Authorize the Reduced Shot", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** `Authorize the reduced shot after three critical checks.` Records plus physical inspection establish readiness.

**Answer text:** The completed check shows authorize the reduced shot after three critical checks. Records plus physical inspection establish readiness.

**Why:** identity, timing, and physical condition require independent backing.

**Wrong-path feedback:** `A backed calculation cannot substitute for the unverified door or weather condition.`

**State/output:** report piece6.

## Mission outcome

Mission decision: Authorize one reduced-energy firing at the 8 mm first-gap setting. The bank stores 1.50 kJ, and the selected front protects the test sensors. The timing log shows stage 7 fires late, so the pulse may not be as uniform as the total energy suggests. Metric target 22:00.

**Segue - exact player copy:** But Noor's timing strip puts stage 7 late; one energy total cannot prove one clean pulse.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Elise Strand pins the 1.50 KJ TEST RECORD beside the first-gap scale. But Noor's timing strip puts stage 7 late; one energy total cannot prove one clean pulse.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains marx bank?

**Options - exact player copy:**

- A. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- B. Gap geometry changes the pulse front even when stored energy stays fixed.
- C. Field squared makes local hotspots matter strongly.
- D. Capacitors charged in parallel and discharged in series.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for marx bank. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes capacitor energy. It does not answer the question about marx bank.
- B: This describes breakdown and timing. It does not answer the question about marx bank.
- C: This describes energy density and field. It does not answer the question about marx bank.
- D: Correct. Capacitors charged in parallel and discharged in series.

### Review question 2


**Prompt - exact player copy:** Which statement best explains capacitor energy?

**Options - exact player copy:**

- A. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- B. Capacitors charged in parallel and discharged in series.
- C. Gap geometry changes the pulse front even when stored energy stays fixed.
- D. Field squared makes local hotspots matter strongly.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for capacitor energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- B: This describes marx bank. It does not answer the question about capacitor energy.
- C: This describes breakdown and timing. It does not answer the question about capacitor energy.
- D: This describes energy density and field. It does not answer the question about capacitor energy.

### Review question 3


**Prompt - exact player copy:** Which statement best explains breakdown and timing?

**Options - exact player copy:**

- A. Capacitors charged in parallel and discharged in series.
- B. Gap geometry changes the pulse front even when stored energy stays fixed.
- C. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- D. Field squared makes local hotspots matter strongly.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for breakdown and timing. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marx bank. It does not answer the question about breakdown and timing.
- B: Correct. Gap geometry changes the pulse front even when stored energy stays fixed.
- C: This describes capacitor energy. It does not answer the question about breakdown and timing.
- D: This describes energy density and field. It does not answer the question about breakdown and timing.

### Review question 4


**Prompt - exact player copy:** Which statement best explains energy density and field?

**Options - exact player copy:**

- A. Capacitors charged in parallel and discharged in series.
- B. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- C. Field squared makes local hotspots matter strongly.
- D. Gap geometry changes the pulse front even when stored energy stays fixed.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for energy density and field. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marx bank. It does not answer the question about energy density and field.
- B: This describes capacitor energy. It does not answer the question about energy density and field.
- C: Correct. Field squared makes local hotspots matter strongly.
- D: This describes breakdown and timing. It does not answer the question about energy density and field.

### Review question 5


**Prompt - exact player copy:** Which statement best explains authorization records?

**Options - exact player copy:**

- A. Capacitors charged in parallel and discharged in series.
- B. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- C. Gap geometry changes the pulse front even when stored energy stays fixed.
- D. Identity, timing, and physical condition require independent backing.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for authorization records. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes marx bank. It does not answer the question about authorization records.
- B: This describes capacitor energy. It does not answer the question about authorization records.
- C: This describes breakdown and timing. It does not answer the question about authorization records.
- D: Correct. Identity, timing, and physical condition require independent backing.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Capacitors charged in parallel and discharged in series.
- C. Summing stage energy avoids misusing the discharge-equivalent capacitance.
- D. Gap geometry changes the pulse front even when stored energy stays fixed.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes marx bank. It does not answer the question about electric charge.
- C: This describes capacitor energy. It does not answer the question about electric charge.
- D: This describes breakdown and timing. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- capacitor work integral, U, energy density, breakdown, Marx timing.
- ## Four graded stops
- **Mission takeaway:** Authorize one reduced-energy firing at the `8 mm` first-gap setting.

---

# Mission 7 - Four Screens, One Wire

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 7 - 9 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Four Screens, One Wire  
**Card body:** Nine days remain in the storm window. Four screen traces meet at one wire. Today you decide which checks are truly separate.
**Objective:** Test whether the four mill channels are independent.  
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
  - id: groundtruth_m07_we01
    title: Ohm's law
    problem: A 6 V supply is across a 3 Ω resistor. Find current.
    rule: For an ohmic resistor, I=V/R.
    steps:
    - 'Set up the relationship: For an ohmic resistor, I=V/R.'
    - I=6/3=2 A.
    answer: Current is 2 amperes.
    common_mistake: Current is not voltage times resistance.
  - id: groundtruth_m07_we02
    title: A missing branch current
    problem: A node receives 8 mA and sends 3 mA through one branch. Find the other outgoing current in steady state.
    rule: Charge conservation requires total incoming current equal total outgoing current.
    steps:
    - 'Set up the relationship: Charge conservation requires total incoming current equal total outgoing current.'
    - 8=3+I, so I=5 mA outward.
    answer: The missing outgoing current is 5 mA.
    common_mistake: Do not add incoming and outgoing magnitudes as if they point the same way.
  - id: groundtruth_m07_we03
    title: Series resistors
    problem: A 10 V source drives series resistors of 2 Ω and 3 Ω. Find current and the drop across 3 Ω.
    rule: Series resistance adds; each series element carries the same current.
    steps:
    - 'Set up the relationship: Series resistance adds; each series element carries the same current.'
    - R_total=2+3=5 Ω; I=10/5=2 A; V_3Ω=2(3)=6 V.
    answer: Current is 2 A and the 3 Ω voltage drop is 6 V.
    common_mistake: The source voltage is shared, not applied in full across each series resistor.
  - id: groundtruth_m07_we04
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
  - id: groundtruth_m07_we05
    title: Correct a known offset
    problem: A balance reads 52 g for a certified 50 g mass and 32 g for a second object. Assume a constant additive offset. Find the corrected second mass.
    rule: Offset = reading - reference; corrected value = reading - offset.
    steps:
    - offset = 52 - 50 = +2 g. The balance reads high.
    - corrected mass = 32 - 2 = 30 g. Subtract the same offset.
    answer: The corrected mass is 30 g.
    common_mistake: An additive offset is not a percentage error.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Current: rate of charge flow. Node: connection shared by circuit branches. Reference: voltage point against which a channel is measured.

Ohm's law: the voltage across a resistor equals current times resistance, `V=IR`.

Kirchhoff's rules: current is conserved at a node, and voltage changes sum to zero around a closed loop.

#### Primer concepts

- Charge is conserved at nodes; voltage changes sum to zero around a loop; shared references create common-mode error.

#### Equations first needed today
**Equation:** `I=dQ/dt`, Ohm's law `V=I R`, and `R=ρ L/A`

**What it is for:** current/resistance

**Symbols:** `I` current in amperes; `Q` charge in coulombs; `t` time in seconds; `V` potential difference in volts; `R` resistance in ohms; `ρ` resistivity in ohm-metres; `L` conductor length in metres; `A` cross-sectional area in square metres.

**Why this campaign needs it:** trace return path.

**Equation:** Kirchhoff's rules, `ΣI_in=ΣI_out` and `Σε-Σ(I R)=0`

**What it is for:** Kirchhoff node/loop rules

**Symbols:** `I_in` is current entering a node; `I_out` is current leaving it; `Σ` means sum; `ε` is a source voltage; `I R` is a resistor's voltage drop.

**Why this campaign needs it:** expose impossible shared-current readings.

## Main story happening - designer summary
Field Station circuit work sends the player to the raw reference panel in Launch Control. Twist 1 decertifies earlier agreement, causing the named metric loss. Two locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Field Station | `mill-array` | automatic**

**Trigger:** mission_7_arrival.

**World state:** Four matching screen traces meet at one exposed reference wire.

**Panel/HUD text:** Noor Haddad, data and safety analyst: “Independent of what?”

**Dialogue bubbles -** Dr. Lena Ortiz: "Independent of what?"

**Unlocks/waypoint:** Unlock Stop 25 at `mill-array` in Field Station.

**Beat 2 - After Stop 25 | `radar-desk` | automatic**

**Trigger:** accepted_stop_25.

**World state:** At `mill-array`, the dated accepted-result slip for Stop 25 reads: "All four mills share SHOT ground; they are not independent.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The shared-reference finding requires the crew to account for current leaving the channel-return node."

**Unlocks/waypoint:** Unlock Stop 26 at `radar-desk` in Launch Control.

**Beat 3 - After Stop 26 | `radar-desk` | automatic**

**Trigger:** accepted_stop_26.

**World state:** At `radar-desk`, the dated accepted-result slip for Stop 26 reads: "Missing current is 3.0 mA outward. KCL conserves charge.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The current balance points to a hidden return path, but its effect on channel C remains untested."

**Unlocks/waypoint:** Unlock Stop 27 at `radar-desk` in Launch Control.

**Beat 4 - After Stop 27 | `record-desk` | automatic**

**Trigger:** accepted_stop_27.

**World state:** At `radar-desk`, the dated accepted-result slip for Stop 27 reads: "Isolation removes and restoration returns the jump. That reversal establishes reference causation.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The isolation reversal identifies a cause whose size must now be checked against the recorded voltage."

**Unlocks/waypoint:** Unlock Stop 28 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `mill-array` | automatic**

**Trigger:** accepted_stop_28.

**World state:** At `reference-panel`, Noor Haddad ties a SHARED REFERENCE tag around the common feed. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Noor Haddad: "Four screens. One wire. We had been counting the screens. But Owen's damaged trailer card has no contact scar; the team must test how a changing field could reach it."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m07

**Home:** `reference-panel`. **Before:** The dated mission-7 evidence holder at this fixture has no accepted record. Four matching screen traces meet at one exposed reference wire.
**After — exact action:** Noor Haddad ties a SHARED REFERENCE tag around the common feed.
**Trigger:** accepted_stop_28. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `trailer-cards`, a burned card lies under glass beside an unmarked cable jacket.
**Segue - exact player copy:** But Owen's damaged trailer card has no contact scar; the team must test how a changing field could reach it.

## Location plan

FIELD→SHOT because dependency tracing identifies the shared reference there. 

## Characters and dramatic beat

Noor accepts sufficient evidence after reversal; Ravi's earlier confidence is revised without making him incompetent. 

## Key concepts, explained here

 current, Kirchhoff, Ohm, power, common-mode error.  

## Four graded stops
## Stop 25 - Trace the Shared Reference

**Format/placement:** TRACE, at `mill-array`.

**Metadata:** Concept: 30 - dependencies; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L4 reveal.

**Call - exact player copy:** Go to the field-mill array, in Field Station.

**Stop reason - exact player copy:** The battery logger's quiet trace challenges the apparent agreement among the four field mills.

**Question card story setup - exact player copy:** The four mills agree to the microsecond, while a battery logger does not jump. Open every channel's power, clock, and reference dependencies to find what the agreeing screens share.

**Question card story-science connection - exact player copy:** The dependency map reveals whether four matching traces are independent evidence or copies of one disturbed reference.

**Question card prompt - exact player copy:** Open the power, clock, and reference dependencies for all five channels, name the shared upstream resource, and submit whether the four mills are independent.

**Complete format-specific interaction block:** `trace:{channels:[{id:"mill_A",label:"mill A",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_B",label:"mill B",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_C",label:"mill C",dependency:"SHOT ground reference",target_dependent:true},{id:"mill_D",label:"mill D",dependency:"SHOT ground reference",target_dependent:true},{id:"battery",label:"battery logger",dependency:"isolated battery reference",independent:true}],shared_upstream:"SHOT ground reference",correct_conclusion:"the agreeing mills share a reference; the battery logger is independent",answerText:"Four agreeing mill channels are not independent because they share SHOT ground; the isolated battery logger breaks the pattern."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 25 - Trace the Shared Reference"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open the power, clock, and reference dependencies for all five channels, name the shared upstream resource, and submit whether the four mills are independent."
  payload: "`trace:{channels:[{id:\"mill_A\",label:\"mill A\",dependency:\"SHOT ground reference\",target_dependent:true},{id:\"mill_B\",label:\"mill B\",dependency:\"SHOT ground reference\",target_dependent:true},{id:\"mill_C\",label:\"mill C\",dependency:\"SHOT ground reference\",target_dependent:true},{id:\"mill_D\",label:\"mill D\",dependency:\"SHOT ground reference\",target_dependent:true},{id:\"battery\",label:\"battery logger\",dependency:\"isolated battery reference\",independent:true}],shared_upstream:\"SHOT ground reference\",correct_conclusion:\"the agreeing mills share a reference; the battery logger is independent\",answerText:\"Four agreeing mill channels are not independent because they share SHOT ground; the isolated battery logger breaks the pattern.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: mill_a, label: "Field mill A", reading: "+5.0 kV/m", dependency: shot_ground}
    - {id: mill_b, label: "Field mill B", reading: "+5.1 kV/m", dependency: shot_ground}
    - {id: mill_c, label: "Field mill C", reading: "+5.0 kV/m", dependency: shot_ground}
    - {id: mill_d, label: "Field mill D", reading: "+5.1 kV/m", dependency: shot_ground}
    - {id: battery, label: "Isolated battery logger", reading: "+3.2 kV/m", dependency: isolated_battery_reference, independent: true}
  sharedUpstream: shot_ground
  correctConclusion: "`All four mills share SHOT ground; they are not independent.`"
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** `All four mills share SHOT ground; they are not independent.`

**Answer text:** The completed check shows all four mills share SHOT ground; they are not independent.

**Why:** common upstream hardware makes correlated readings less independent than their number suggests.

**Wrong-path feedback:** `Count upstream dependencies, not screen names; the battery logger is the independent channel.`

**State/output:** Record the result and unlock the next named stop.

## Stop 26 - Derive the Missing Branch Current

**Format/placement:** DERIVE, at `radar-desk`.

**Metadata:** Concept: 17 - junction rule; Keystone: K7; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** The shared-reference finding requires the crew to account for current leaving the channel-return node.

**Question card story setup - exact player copy:** At Launch Control, four 2.0 mA channel returns join a node, while the measured trunk current is 5.0 mA. Derive the missing branch current and its direction.

**Question card story-science connection - exact player copy:** The missing branch current quantifies the undocumented return path that the isolation test must investigate.

**Fixture source panel - exact player copy:** At Launch Control, four 2.0 mA channel returns join a node, while the measured trunk current is 5.0 mA. Derive the missing branch current and its direction.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the missing current in mA with its direction.

**Complete format-specific interaction block:** lines `ΣIin=ΣIout`(charge conservation), `8.0=5.0+Ix`(substitute), `Ix=3.0mA outward`(solve). Prompt submit mA/direction.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `ΣI_in+ΣI_out=0 using unsigned current magnitudes`
2. `8.0+5.0=I_x`
3. `I_x=13.0 mA outward`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["At Launch Control, four 2.0 mA channel returns join a node, while the measured trunk current is 5.0 mA.", "Build three Kirchhoff-junction lines, name charge conservation and algebra where used, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the Missing Branch Current in the form and units requested by the prompt"
  left_side: "I"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ΣIin=ΣIout", correct: true}
        - {text: "ΣI_in+ΣI_out=0 using unsigned current magnitudes", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "8.0=5.0+Ix", correct: true}
        - {text: "8.0+5.0=I_x", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Ix=3.0mA outward", correct: true}
        - {text: "I_x=13.0 mA outward", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `Missing current is 3.0 mA outward.` KCL conserves charge.

**Answer text:** The completed check shows missing current is 3.0 mA outward. KCL conserves charge.

**Why:** Kirchhoff's junction rule exposes current on an undocumented path.

**Wrong-path feedback:** `Sum all four 2.0 mA returns before subtracting the 5.0 mA trunk.`

**State/output:** unlock S3.

## Stop 27 - Isolate Reference C

**Format/placement:** CONTROL, at `radar-desk`.

**Metadata:** Concept: 30 - causal reference test; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4 reversal.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** The current balance points to a hidden return path, but its effect on channel C remains untested.

**Question card story setup - exact player copy:** Because 3.0 mA leaves by an undocumented branch, switch only channel C to an isolated reference, then restore it. Keep field source, gain, clock, and sampling fixed.

**Question card story-science connection - exact player copy:** A reversible change in channel C's jump tests whether the shared reference causes the apparent field signal.

**Question card prompt - exact player copy:** Change only channel C’s reference, keep field source, gain, clock, and sampling fixed, measure the jump before, during, and after isolation, restore the original reference, and submit one causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"reference_C",label:"channel C reference"},{id:"gain_C",label:"channel C gain"},{id:"clock_C",label:"channel C clock"}],correct_control:"reference_C",baseline:{jump:0.80,unit:"kV/m"},response:{setting:"isolated",jump:0.03,unit:"kV/m"},noise_band:{value:0.05,unit:"kV/m"},fixed:["field source","gain","clock","sampling"],measure_when:"after each setting settles",restore:{required:true,setting:"original reference",remeasure:true},correct_conclusion:"the shared reference causes the jump",answerText:"Only isolating channel C reference removes the jump beyond the noise band, and restoration returns it."}`

**Correct result:** `Isolation removes and restoration returns the jump.` That reversal establishes reference causation.

**Answer text:** The completed check shows isolation removes and restoration returns the jump. That reversal establishes reference causation.

**Why:** disappearance and return of the jump establishes that the reference path causes it.

**Wrong-path feedback:** `Change only reference C; changing gain or clock does not test the traced cause.`

**State/output:** unlock S4.

## Stop 28 - Quantify Common-Mode Error

**Format/placement:** BALLPARK, at `record-desk`.

**Metadata:** Concept: 16 - Ohm drop and Joule power; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the record desk, in Launch Control.

**Stop reason - exact player copy:** The isolation reversal identifies a cause whose size must now be checked against the recorded voltage.

**Question card story setup - exact player copy:** The reversal proves causation; now a 3.0 mA transient crosses a 120 Ω shared lead while true sensor output is -4.2 V. Estimate the recorded voltage and instantaneous lead power.

**Question card story-science connection - exact player copy:** The shared-lead voltage drop and power establish whether the return current can account for the observed common-mode error.

**Question card prompt - exact player copy:** Using I=3.0 mA, R=120 Ω, and V_true=-4.2 V, assemble V_recorded=V_true+IR and submit the recorded voltage in volts. The result card will also show the voltage drop and lead power from the same values.

**Complete format-specific interaction block:** `estimate={labels:[I,R,Vtrue],values:[.003,120,-4.2],slots:[Vdrop,Vrecord,P],template:[IR,Vtrue+IR,I²R],formula:[.360,-3.840,.00108],correct:[.360,-3.840,.00108],target:[V,V,W],tolerance:[.005,.005,.00005]}`.

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 360.0
  tolerance: 18.0
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 720.0}, {label: "displayed divisor", value: 2}]
  formula: "V_recorded=displayed numerator/displayed divisor"
  correctResultText: "`Vdrop=.360 V, Vrecord=-3.840 V, P=1.08 mW.` Ohm and Joule relations quantify common error."
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "recorded sensor voltage after shared-lead drop"
  unit: "V"
  inputs:
    - {label: "Transient current", value: 3.0, unit: "mA"}
    - {label: "Shared-lead resistance", value: 120, unit: "ohm"}
    - {label: "True sensor voltage", value: -4.2, unit: "V"}
  operation: "convert milliamperes to amperes, multiply current by resistance, then add that drop to the true voltage"
  formula: "V_recorded=-4.2+(3.0/1000)(120)"
  correctResult: -3.84
  tolerance: 0.005
  answerText: "The shared lead adds 0.360 V, so the recorded voltage is -3.840 V; the same current dissipates 1.08 mW in the lead."
```

**Correct result:** `Vdrop=.360 V, Vrecord=-3.840 V, P=1.08 mW.` Ohm and Joule relations quantify common error.

**Answer text:** `Vdrop=(.003)(120)=.360 V`; `Vrecord=-4.2+.360=-3.840 V`; `P=(.003)²(120)=1.08 mW`.

**Why:** a shared `IR` drop adds the same false shift to every referenced channel, while `I²R` reveals its heating scale.

**Wrong-path feedback:** `Keep the true voltage sign and use I²R - not VI with the sensor voltage - for lead power.`

**State/output:** report piece7.

## Mission outcome

Mission decision: The mills share one ground reference. The battery logger is separate. Isolating channel C removes the jump. The archive now points to the buried loop.

**Segue - exact player copy:** But Owen's damaged trailer card has no contact scar; the team must test how a changing field could reach it.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Noor Haddad ties a SHARED REFERENCE tag around the common feed. But Owen's damaged trailer card has no contact scar; the team must test how a changing field could reach it.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains current?

**Options - exact player copy:**

- A. Common upstream hardware makes correlated readings less independent than their number suggests.
- B. Rate of charge flow.
- C. Kirchhoff's junction rule exposes current on an undocumented path.
- D. Disappearance and return of the jump establishes that the reference path causes it.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for current. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes dependencies. It does not answer the question about current.
- B: Correct. Rate of charge flow.
- C: This describes junction rule. It does not answer the question about current.
- D: This describes causal reference test. It does not answer the question about current.

### Review question 2


**Prompt - exact player copy:** Which statement best explains dependencies?

**Options - exact player copy:**

- A. Rate of charge flow.
- B. Kirchhoff's junction rule exposes current on an undocumented path.
- C. Common upstream hardware makes correlated readings less independent than their number suggests.
- D. Disappearance and return of the jump establishes that the reference path causes it.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for dependencies. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current. It does not answer the question about dependencies.
- B: This describes junction rule. It does not answer the question about dependencies.
- C: Correct. Common upstream hardware makes correlated readings less independent than their number suggests.
- D: This describes causal reference test. It does not answer the question about dependencies.

### Review question 3


**Prompt - exact player copy:** Which statement best explains junction rule?

**Options - exact player copy:**

- A. Rate of charge flow.
- B. Common upstream hardware makes correlated readings less independent than their number suggests.
- C. Disappearance and return of the jump establishes that the reference path causes it.
- D. Kirchhoff's junction rule exposes current on an undocumented path.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for junction rule. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current. It does not answer the question about junction rule.
- B: This describes dependencies. It does not answer the question about junction rule.
- C: This describes causal reference test. It does not answer the question about junction rule.
- D: Correct. Kirchhoff's junction rule exposes current on an undocumented path.

### Review question 4


**Prompt - exact player copy:** Which statement best explains causal reference test?

**Options - exact player copy:**

- A. Disappearance and return of the jump establishes that the reference path causes it.
- B. Rate of charge flow.
- C. Common upstream hardware makes correlated readings less independent than their number suggests.
- D. Kirchhoff's junction rule exposes current on an undocumented path.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal reference test. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Disappearance and return of the jump establishes that the reference path causes it.
- B: This describes current. It does not answer the question about causal reference test.
- C: This describes dependencies. It does not answer the question about causal reference test.
- D: This describes junction rule. It does not answer the question about causal reference test.

### Review question 5


**Prompt - exact player copy:** Which statement best explains ohm drop and Joule power?

**Options - exact player copy:**

- A. Rate of charge flow.
- B. A shared IR drop adds the same false shift to every referenced channel, while I²R reveals its heating scale.
- C. Common upstream hardware makes correlated readings less independent than their number suggests.
- D. Kirchhoff's junction rule exposes current on an undocumented path.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for ohm drop and joule power. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current. It does not answer the question about ohm drop and joule power.
- B: Correct. A shared IR drop adds the same false shift to every referenced channel, while I²R reveals its heating scale.
- C: This describes dependencies. It does not answer the question about ohm drop and joule power.
- D: This describes junction rule. It does not answer the question about ohm drop and joule power.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Rate of charge flow.
- B. Common upstream hardware makes correlated readings less independent than their number suggests.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. Kirchhoff's junction rule exposes current on an undocumented path.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current. It does not answer the question about electric charge.
- B: This describes dependencies. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes junction rule. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- current, Kirchhoff, Ohm, power, common-mode error.
- ## Four graded stops
- **Mission takeaway:** Remove the four-mill agreement as independent evidence.

---

# Mission 8 - A Field Without Contact

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 8 - 8 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** A Field Without Contact  
**Card body:** Eight days remain in the storm window. A burned card sits beside a cable with no scar. Today you decide if a field could cause harm without touch.
**Objective:** Determine whether strike current can influence the trailer cable without direct contact.  
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
  - id: groundtruth_m08_we01
    title: Field around a straight wire
    problem: A long straight wire carries 10 A. Find field 0.1 m away, using μ0/(2π)=2×10^-7 T m/A.
    rule: B=μ0 I/(2πr).
    steps:
    - 'Set up the relationship: B=μ0 I/(2πr).'
    - B=(2×10^-7)(10)/0.1=2×10^-5 T=20 μT.
    answer: The field magnitude is 20 μT; its direction circles the wire by the right-hand rule.
    common_mistake: The straight-wire field falls as 1/r, not 1/r².
  - id: groundtruth_m08_we02
    title: Force on a moving charge
    problem: A 2 C positive charge moves perpendicular to a 3 T magnetic field at 4 m/s. Find force magnitude.
    rule: F=|q|vB sin θ.
    steps:
    - 'Set up the relationship: F=|q|vB sin θ.'
    - θ=90°, so F=2(4)(3)=24 N.
    answer: Magnetic-force magnitude is 24 N; direction is perpendicular to both velocity and field.
    common_mistake: A charge moving parallel to the field would feel zero magnetic force.
  - id: groundtruth_m08_we03
    title: Force on a wire segment
    problem: A straight 0.5 m wire carries 2 A perpendicular to a 4 T field. Find magnetic-force magnitude.
    rule: F=ILB sin θ.
    steps:
    - 'Set up the relationship: F=ILB sin θ.'
    - F=2(0.5)(4)=4 N.
    answer: Force magnitude is 4 N.
    common_mistake: Only the component perpendicular to the field contributes.
  - id: groundtruth_m08_we04
    title: Magnetic force and speed
    problem: A charged particle moves in a magnetic field with no electric field. Explain why magnetic force alone does not change kinetic energy.
    rule: Magnetic force q v×B is perpendicular to velocity.
    steps:
    - Instantaneous power P=F·v=0 because the vectors are perpendicular.
    - No work is done by that force, though the direction of motion can change.
    answer: Magnetic force alone changes direction, not kinetic energy.
    common_mistake: A curved path does not necessarily mean changing speed.
  - id: groundtruth_m08_we05
    title: Force on negative charge
    problem: A charge q=-2 μC is in a field E=3000 N/C rightward. Find its force, right positive.
    rule: F=qE.
    steps:
    - 'Set up the relationship: F=qE.'
    - F=(-2×10^-6)(3000)=-0.006 N=-6 mN.
    answer: The force is 6 mN to the left.
    common_mistake: A negative charge feels force opposite the electric field.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Magnetic field: field that deflects moving charge and currents. Right-hand rule: hand convention for cross-product direction. Helical motion: circular perpendicular motion plus unchanged parallel motion.

Ampere's law: the closed-loop magnetic-field integral equals `μ₀` times the enclosed current.

#### Primer concepts

- Magnetic force is perpendicular and changes direction, not speed; same-direction parallel currents attract; `μ₀=4π×10^-7 T·m/A`.

#### Equations first needed today
**Equation:** `F=qv×B`, `F=I L×B`

**What it is for:** force

**Symbols:** `F` is force, `q` charge, `v` velocity, `B` magnetic field, `I` current, and `L` the wire-length vector.

**Why this campaign needs it:** assess cable.

**Equation:** Ampere's law, `∮B·dl=μ₀I`

**What it is for:** symmetric fields

**Symbols:** `B` magnetic field in teslas; `dl` directed path element in metres; `μ₀` vacuum permeability; `I` enclosed current in amperes.

**Why this campaign needs it:** mast current.

## Main story happening - designer summary
The Mast Base field result predicts a measurable loop effect, causing travel to the Remote Outstation. Stop 4 finds no arc but an opposite-polarity upset.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `shunt-rack` | automatic**

**Trigger:** mission_8_arrival.

**World state:** A burned card lies under glass beside an unmarked cable jacket.

**Panel/HUD text:** Marcus Tate, mast engineer: “If a field reached the route, its direction must match the wiring.”

**Dialogue bubbles -** Dr. Lena Ortiz: "If a field reached the route, its direction must match the wiring."

**Unlocks/waypoint:** Unlock Stop 29 at `shunt-rack` in Mast Base.

**Beat 2 - After Stop 29 | `mast-desk` | automatic**

**Trigger:** accepted_stop_29.

**World state:** At `shunt-rack`, the dated accepted-result slip for Stop 29 reads: "Right-hand mappings and four source formulas are complete. Geometry fixes directions.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. The mast-current model needs a field prediction at the nearby equipment before damage mechanisms are compared."

**Unlocks/waypoint:** Unlock Stop 30 at `mast-desk` in Mast Base.

**Beat 3 - After Stop 30 | `cable-bay` | automatic**

**Trigger:** accepted_stop_30.

**World state:** At `mast-desk`, the dated accepted-result slip for Stop 30 reads: "B=μ₀I/(2πr)=3.00 mT. Circular symmetry makes B constant on the path.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. The predicted magnetic field must be translated into particle motion before it is blamed for equipment damage."

**Unlocks/waypoint:** Unlock Stop 31 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 31 | `trailer-cards` | automatic**

**Trigger:** accepted_stop_31.

**World state:** At `cable-bay`, the dated accepted-result slip for Stop 31 reads: "r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. The particle check leaves the cable-card damage and reversed voltage needing a common explanation."

**Unlocks/waypoint:** Unlock Stop 32 at `trailer-cards` in Remote Outstation.

**Beat 5 - At mission end | `shunt-rack` | automatic**

**Trigger:** accepted_stop_32.

**World state:** At `trailer-cards`, Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Owen Park: "The jacket is clean. The card is not. Therefore Saira must trace the loop in the ground; its shape should predict the pulse sign and size."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m08

**Home:** `trailer-cards`. **Before:** The dated mission-8 evidence holder at this fixture has no accepted record. A burned card lies under glass beside an unmarked cable jacket.
**After — exact action:** Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label.
**Trigger:** accepted_stop_32. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `loop-bench`, a trench plan lies under a ruler laid along the hidden cable turn.
**Segue - exact player copy:** Therefore Saira must trace the loop in the ground; its shape should predict the pulse sign and size.

## Location plan

MAST→COUPLE because only the trailer has the geometry and damage. 

## Characters and dramatic beat

Tate follows a path rather than defending drawings. 

## Key concepts, explained here

Lorentz force, helix, source fields, Ampere symmetry, no magnetic work.  

## Four graded stops
## Stop 29 - Match Magnetic Rules

**Format/placement:** PROTOCOL, at `shunt-rack`.

**Metadata:** Concept: 22 - right-hand rule/force and source patterns; Keystone: K8,K9; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L2.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** The return-path investigation now reaches wires whose orientation determines their magnetic effects.

**Question card story setup - exact player copy:** The down-conductor current points downward, and nearby wire segments run north, east, and vertical. Match force directions, then match straight wire, loop, solenoid, and toroid to their field patterns.

**Question card story-science connection - exact player copy:** The force-direction and source-field mappings establish which magnetic relationships apply around the mast conductors.

**Question card prompt - exact player copy:** Match all three wire orientations to force direction or zero, then match straight wire, loop, solenoid, and toroid to their field formula and direction; submit all seven mappings.

**Complete format-specific interaction block:** scenarios include three force rows plus `[straight,loop_center,solenoid,toroid]`; choices include direction/zero and formulas `[μ0I/(2πr),μ0I/(2R),μ0nI,μ0NI/(2πr)]`; keyed mapping, vertical-parallel force zero. Prompt submit all seven matches.

**§7 build completion - PROTOCOL:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
protocol:
  situations: [{id:first,label:"first condition"},{id:repeat,label:"repeat condition"},{id:failure,label:"failed check"},{id:finish,label:"completion condition"}]
  actions: [{id:record,label:"record baseline"},{id:repeat,label:"repeat the same check"},{id:hold,label:"hold and investigate"},{id:close,label:"close only after every check"}]
  mapping: {first:record,repeat:repeat,failure:hold,finish:close}
```

**Handback 4 canonical interaction block - PROTOCOL:**

**Handback 5 canonical interaction block - PROTOCOL:**

```yaml
protocol:
  situations:
    - {id: north_wire, label: "North-running wire in the displayed field"}
    - {id: east_wire, label: "East-running wire in the displayed field"}
    - {id: parallel_wire, label: "Vertical wire parallel to the field"}
    - {id: straight_source, label: "Long straight source wire"}
    - {id: loop_center, label: "Center of a circular loop"}
    - {id: solenoid, label: "Inside a long solenoid"}
    - {id: toroid, label: "Inside a toroid"}
  actions:
    - {id: force_cross_north, label: "Use I L × B for the north-running wire"}
    - {id: force_cross_east, label: "Use I L × B for the east-running wire"}
    - {id: force_zero, label: "Force is zero for parallel current and field"}
    - {id: straight_formula, label: "B = μ0 I/(2πr)"}
    - {id: loop_formula, label: "B = μ0 I/(2R)"}
    - {id: solenoid_formula, label: "B = μ0 n I"}
    - {id: toroid_formula, label: "B = μ0 N I/(2πr)"}
  mapping:
    north_wire: force_cross_north
    east_wire: force_cross_east
    parallel_wire: force_zero
    straight_source: straight_formula
    loop_center: loop_formula
    solenoid: solenoid_formula
    toroid: toroid_formula
```

**Correct result:** `Right-hand mappings and four source formulas are complete.` Geometry fixes directions.

**Answer text:** The completed check shows right-hand mappings and four source formulas are complete. Geometry fixes directions.

**Why:** right-hand rules connect current geometry to both magnetic field and mechanical stress.

**Wrong-path feedback:** `Use current direction in IL×B and curl fingers around the source; do not swap force and field.`

**State/output:** unlock S2.

## Stop 30 - Derive the Down-Conductor Field

**Format/placement:** DERIVE, at `mast-desk`.

**Metadata:** Concept: 20 - Ampere long wire; Keystone: K8,K2; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the mast desk, in Mast Base.

**Stop reason - exact player copy:** The mast-current model needs a field prediction at the nearby equipment before damage mechanisms are compared.

**Question card story setup - exact player copy:** Treat the mast down-conductor as a long straight wire carrying peak current I=30 kA. Derive magnetic field B(r) with a circular Amperian path, then evaluate it at r=2.0 m.

**Question card story-science connection - exact player copy:** The down-conductor field at the cabinet distance supplies the magnetic exposure for the following particle and induction checks.

**Fixture source panel - exact player copy:** Treat the mast down-conductor as a long straight wire carrying peak current I=30 kA. Derive magnetic field B(r) with a circular Amperian path, then evaluate it at r=2.0 m. Vacuum permeability: μ₀ = 4π × 10^-7 T m/A.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit B at 2.0 m in mT.

**Complete format-specific interaction block:** lines `∮Bdl=μ0I`, `B(2πr)=μ0I`, `B=μ0I/(2πr)`, substitution→`3.0mT`. Tolerance.05 mT. State waypoint COUPLE.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `∮Bdl=I/μ0`
2. `B(r)=μ0I`
3. `B=μ0I/(2r), omitting π`
4. `Substitute r in centimetres without converting to metres`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Treat the mast down-conductor as a long straight wire carrying peak current I=30 kA.", "Build four Ampere-law lines for a 30 kA long wire, name each symmetry and algebra step, and", "μ0 = 4π × 10^-7 T m/A, vacuum permeability."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the Down-Conductor Field in the form and units requested by the prompt"
  left_side: "B"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "∮Bdl=μ0I", correct: true}
        - {text: "∮Bdl=I/μ0", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B(2πr)=μ0I", correct: true}
        - {text: "B(r)=μ0I", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B=μ0I/(2πr)", correct: true}
        - {text: "B=μ0I/(2r)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B=(4πe-7)(30000)/(2π×2.0) T=3.0 mT", correct: true}
        - {"text": "B=(4πe-7)(30000)/(2π×2.0^2) T=1.5 mT", "correct": false, "survives": true, "reason": "The field of a long straight wire decreases as 1/r, not 1/r squared."}
```

**Correct result:** `B=μ₀I/(2πr)=3.00 mT.` Circular symmetry makes B constant on the path.

**Answer text:** The completed check shows b=μ₀I/(2πr)=3.00 mT. Circular symmetry makes B constant on the path.

**Why:** Ampere's law converts current symmetry into the field that can thread a nearby loop.

**Wrong-path feedback:** `The path length is 2πr, not r, and 30 kA is 3.0×10^4 A.`

**State/output:** Record the result and unlock the next named stop.

## Stop 31 - Track a Charged Particle

**Format/placement:** BALLPARK, at `cable-bay`.

**Metadata:** Concept: 22 - particle motion/mass spectrometer; Keystone: K9,K8; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L3.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** The predicted magnetic field must be translated into particle motion before it is blamed for equipment damage.

**Question card story setup - exact player copy:** At the outstation, an electron enters B=3.0 mT with perpendicular speed 2.0×10^6 m/s and parallel speed 1.0×10^6 m/s. Estimate its helical radius, then use the result card to inspect period, pitch, and the physical justification.

**Question card story-science connection - exact player copy:** The electron's radius and helical motion characterize magnetic deflection without treating the field as a source of kinetic energy.

**Question card prompt - exact player copy:** Using the displayed electron constants, assemble r=mv⊥/(|q|B), convert the result to millimetres, and submit the radius. Then state whether the magnetic field changes the electron's kinetic energy.

**Complete format-specific interaction block:** labels `[m=9.11e-31kg,vperp=2e6,vparallel=1e6,q=1.602e-19C,B=.003T]`, formulas `[r=mvperp/(qB),T=2πm/(qB),pitch=vparallel*T]`, targets `[.00379m,1.191e-8s,.01191m]`, tolerance 10%. Prompt submit radius in mm, period in ns, pitch in mm, and select “kinetic energy unchanged.” Answer `3.79 mm,11.9 ns,11.9 mm`; `ω=qB/m`.

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 3.79
  tolerance: 0.1895
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 7.58}, {label: "displayed divisor", value: 2}]
  formula: "r_mm=displayed numerator/displayed divisor"
  correctResultText: "`r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.`"
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "electron helical radius"
  unit: "mm"
  inputs:
    - {label: "Electron mass", value: 9.11e-31, unit: "kg"}
    - {label: "Perpendicular speed", value: 2.0e6, unit: "m/s"}
    - {label: "Electron charge magnitude", value: 1.602e-19, unit: "C"}
    - {label: "Magnetic field", value: 0.003, unit: "T"}
    - {label: "Parallel speed", value: 1.0e6, unit: "m/s", contextOnly: true}
  operation: "multiply mass by perpendicular speed, divide by charge magnitude times magnetic field, then convert metres to millimetres"
  formula: "r_mm=1000(9.11e-31)(2.0e6)/[(1.602e-19)(0.003)]"
  correctResult: 3.79
  tolerance: 0.19
  answerText: "The radius is 3.79 mm; the follow-through gives T=11.9 ns and pitch=11.9 mm, while magnetic force leaves kinetic energy unchanged."
```

**Correct result:** `r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.`

**Answer text:** The completed check shows r=3.79 mm, T=11.9 ns, pitch=11.9 mm; K unchanged.

**Why:** a magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.

**Wrong-path feedback:** `Use v⊥ for radius, v∥ for pitch, and remember magnetic force does no work.`

**State/output:** unlock S4.

## Stop 32 - Diagnose Noncontact Damage

**Format/placement:** DIAGNOSIS, at `trailer-cards`.

**Metadata:** Concept: 24 - field/loop hazard; Keystone: K8,K9,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4 decision.

**Call - exact player copy:** Go to the diagnostic card rack, in Remote Outstation.

**Stop reason - exact player copy:** The particle check leaves the cable-card damage and reversed voltage needing a common explanation.

**Question card story setup - exact player copy:** Diagnose the mechanism consistent with no shell arc, cable-card damage, and opposite-polarity voltage.

**Question card story-science connection - exact player copy:** The diagnosis determines whether changing magnetic flux can explain damage without a direct arc through the cabinet shell.

**Question card prompt - exact player copy:** Read tip, shell, card, and cabinet zones, select the one mechanism that fits all four, and submit one diagnosis.

**Complete format-specific interaction block:** readings ≥3 plus quiet shell; choices `[direct_arc,static_B_work,changing_flux_induction]`; answer induction.

**§7 authored-board source - DIAGNOSIS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 32 - Diagnose Noncontact Damage"
  format: "DIAGNOSIS"
  source: "Handback 3 canonical interaction block"
  question: "Read tip, shell, card, and cabinet zones, select the one mechanism that fits all four, and submit one diagnosis."
  payload: "readings ≥3 plus quiet shell; choices `[direct_arc,static_B_work,changing_flux_induction]`; answer induction."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DIAGNOSIS:**

```yaml
diagnosis:
  headline: "Read tip, shell, card, and cabinet zones, select the one mechanism that fits all four, and submit one diagnosis."
  readings:
    - {zone: alarm_source, label: "alarming source zone", value: "alarm present"}
    - {zone: transfer_path, label: "possible transfer path", value: "evidence present"}
    - {zone: quiet_control, label: "quiet comparison zone", value: "no alarm"}
    - {zone: protected_interior, label: "protected interior", value: "quiet"}
  choices:
    - {id: induction, label: "Changing-flux induction"}
    - {id: direct_arc, label: "Direct arc to the card"}
    - {id: static_magnetic_work, label: "Static magnetic field doing work"}
    - {id: supply_surge, label: "Local power-supply surge"}
  answer: induction
  rebuttals:
    direct_arc: "The shell is quiet, so no direct arc reached the card."
    static_magnetic_work: "A static magnetic field does no work on stationary charge."
    supply_surge: "The isolated supply remained quiet while the loop-linked card failed."
```

**Correct result:** `Changing-flux induction fits all four zones.`

**Answer text:** The completed check shows changing-flux induction fits all four zones.

**Why:** the pattern points toward changing magnetic flux and induced electric field, not static magnetic work.

**Wrong-path feedback:** `Static B can deflect charge but cannot supply the card’s electrical energy.`

**State/output:** report piece8.

## Mission outcome

Mission decision: No-contact coupling is physically plausible. A 30 kA mast current makes about 3.0 mT at the nearby route, and the damage pattern points to changing flux rather than direct contact. The trailer loop geometry must now predict the voltage sign, and size.

**Segue - exact player copy:** Therefore Saira must trace the loop in the ground; its shape should predict the pulse sign and size.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Owen Park bags the failed card with a NO CONTACT REQUIRED evidence label. Therefore Saira must trace the loop in the ground; its shape should predict the pulse sign and size.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains magnetic field?

**Options - exact player copy:**

- A. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- B. Ampere's law converts current symmetry into the field that can thread a nearby loop.
- C. A magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.
- D. Field that deflects moving charge and currents.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for magnetic field. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes right-hand rule and force and source patterns. It does not answer the question about magnetic field.
- B: This describes ampère’s law for a long straight wire. It does not answer the question about magnetic field.
- C: This describes particle motion and mass spectrometer. It does not answer the question about magnetic field.
- D: Correct. Field that deflects moving charge and currents.

### Review question 2


**Prompt - exact player copy:** Which statement best explains right-hand rule and force and source patterns?

**Options - exact player copy:**

- A. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- B. Field that deflects moving charge and currents.
- C. Ampere's law converts current symmetry into the field that can thread a nearby loop.
- D. A magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for right-hand rule and force and source patterns. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- B: This describes magnetic field. It does not answer the question about right-hand rule and force and source patterns.
- C: This describes ampère’s law for a long straight wire. It does not answer the question about right-hand rule and force and source patterns.
- D: This describes particle motion and mass spectrometer. It does not answer the question about right-hand rule and force and source patterns.

### Review question 3


**Prompt - exact player copy:** Which statement best explains ampère’s law for a long straight wire?

**Options - exact player copy:**

- A. Field that deflects moving charge and currents.
- B. Ampere's law converts current symmetry into the field that can thread a nearby loop.
- C. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- D. A magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for ampère’s law for a long straight wire. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic field. It does not answer the question about ampère’s law for a long straight wire.
- B: Correct. Ampere's law converts current symmetry into the field that can thread a nearby loop.
- C: This describes right-hand rule and force and source patterns. It does not answer the question about ampère’s law for a long straight wire.
- D: This describes particle motion and mass spectrometer. It does not answer the question about ampère’s law for a long straight wire.

### Review question 4


**Prompt - exact player copy:** Which statement best explains particle motion and mass spectrometer?

**Options - exact player copy:**

- A. Field that deflects moving charge and currents.
- B. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- C. A magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.
- D. Ampere's law converts current symmetry into the field that can thread a nearby loop.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for particle motion and mass spectrometer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic field. It does not answer the question about particle motion and mass spectrometer.
- B: This describes right-hand rule and force and source patterns. It does not answer the question about particle motion and mass spectrometer.
- C: Correct. A magnetic field bends perpendicular motion but leaves parallel speed and kinetic energy unchanged.
- D: This describes ampère’s law for a long straight wire. It does not answer the question about particle motion and mass spectrometer.

### Review question 5


**Prompt - exact player copy:** Which statement best explains field and loop hazard?

**Options - exact player copy:**

- A. Field that deflects moving charge and currents.
- B. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- C. Ampere's law converts current symmetry into the field that can thread a nearby loop.
- D. The pattern points toward changing magnetic flux and induced electric field, not static magnetic work.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for field and loop hazard. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic field. It does not answer the question about field and loop hazard.
- B: This describes right-hand rule and force and source patterns. It does not answer the question about field and loop hazard.
- C: This describes ampère’s law for a long straight wire. It does not answer the question about field and loop hazard.
- D: Correct. The pattern points toward changing magnetic flux and induced electric field, not static magnetic work.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Field that deflects moving charge and currents.
- C. Right-hand rules connect current geometry to both magnetic field and mechanical stress.
- D. Ampere's law converts current symmetry into the field that can thread a nearby loop.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes magnetic field. It does not answer the question about electric charge.
- C: This describes right-hand rule and force and source patterns. It does not answer the question about electric charge.
- D: This describes ampère’s law for a long straight wire. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- Lorentz force, helix, source fields, Ampere symmetry, no magnetic work.
- ## Four graded stops
- **Mission takeaway:** No-contact coupling is physically plausible.

---

# Mission 9 - The Buried Loop

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 9 - 7 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Buried Loop  
**Card body:** 7 days until the last storm window closes. A trench plan lies under a ruler laid along the hidden cable turn. Today you decide whether the buried loop predicts the old pulse.
**Objective:** Predict the induced pulse from measured geometry and current rise.  
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
  - id: groundtruth_m09_we01
    title: Induced voltage
    problem: Magnetic flux through a one-turn loop changes from 0.1 to 0.5 Wb in 0.2 s. Find the average induced emf with the stated positive flux direction.
    rule: Average emf ε=-ΔΦ/Δt.
    steps:
    - 'Set up the relationship: Average emf ε=-ΔΦ/Δt.'
    - ε=-(0.5-0.1)/0.2=-2 V.
    answer: The signed induced emf is -2 V for that flux orientation.
    common_mistake: The minus sign expresses opposition to the change in flux, not always to the original field.
  - id: groundtruth_m09_we02
    title: Several turns of wire
    problem: A coil has 10 turns. Flux per turn changes by 0.02 Wb in 0.1 s. Find emf magnitude.
    rule: '|ε|=N|ΔΦ|/Δt.'
    steps:
    - 'Set up the relationship: |ε|=N|ΔΦ|/Δt.'
    - '|ε|=10(0.02)/0.1=2 V.'
    answer: The emf magnitude is 2 V.
    common_mistake: Use flux per turn before multiplying by the turn count.
  - id: groundtruth_m09_we03
    title: A moving conductor
    problem: A rod of length 0.5 m moves at 2 m/s perpendicular to a 3 T field, with the rod perpendicular to both. Find emf magnitude.
    rule: For this geometry, |ε|=BLv.
    steps:
    - 'Set up the relationship: For this geometry, |ε|=BLv.'
    - '|ε|=3(0.5)(2)=3 V.'
    answer: The induced voltage magnitude is 3 V.
    common_mistake: The simple product requires the stated perpendicular geometry.
  - id: groundtruth_m09_we04
    title: A tilted surface
    problem: A field E=10 N/C crosses area A=2 m² at 60° to its normal. Find flux.
    rule: Φ=EA cos θ.
    steps:
    - 'Set up the relationship: Φ=EA cos θ.'
    - Φ=10(2)(1/2)=10 N m²/C.
    answer: The flux is 10 N m²/C.
    common_mistake: Projected area, not full area, determines flux when the surface is tilted.
  - id: groundtruth_m09_we05
    title: Field around a straight wire
    problem: A long straight wire carries 10 A. Find field 0.1 m away, using μ0/(2π)=2×10^-7 T m/A.
    rule: B=μ0 I/(2πr).
    steps:
    - 'Set up the relationship: B=μ0 I/(2πr).'
    - B=(2×10^-7)(10)/0.1=2×10^-5 T=20 μT.
    answer: The field magnitude is 20 μT; its direction circles the wire by the right-hand rule.
    common_mistake: The straight-wire field falls as 1/r, not 1/r².
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Magnetic flux: magnetic field passing through a surface. Induced emf: voltage created by changing magnetic flux. Lenz's law: induced current opposes the flux change.

#### Primer concepts

- Flux uses the perpendicular field component; changing B, area, or angle induces emf; sign encodes opposition.

#### Equations first needed today
**Equation:** `Φ_B=∫B·dA`, `ε=-dΦ_B/dt`

**What it is for:** induction

**Symbols:** `Φ_B` magnetic flux in webers; `B` magnetic field in teslas; `dA` directed area element in square metres; `ε` induced electromotive force in volts; `dΦ_B/dt` rate of flux change in webers per second.

**Why this campaign needs it:** trailer.

**Equation:** `ε=BLv`

**What it is for:** motional emf

**Symbols:** `ε` motional electromotive force in volts; `B` magnetic-field magnitude in teslas; `L` conductor length in metres; `v` conductor speed perpendicular to the field in metres per second.

**Why this campaign needs it:** distinguish moving-wire tests.

## Main story happening - designer summary
Earthing Trench geometry yields the predicted pulse and polarity; the waypoint leads to the Remote Outstation because its damaged card carries the stored waveform. Stop 4 confirms magnitude within uncertainty but causes the trench-exposure cost.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Earthing Trench | `loop-bench` | automatic**

**Trigger:** mission_9_arrival.

**World state:** A trench plan lies under a ruler laid along the hidden cable turn.

**Panel/HUD text:** Marcus Tate, mast engineer: “Draw the loop we built, not the cable we meant to build.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Draw the loop we built, not the cable we meant to build."

**Unlocks/waypoint:** Unlock Stop 33 at `loop-bench` in Earthing Trench.

**Beat 2 - After Stop 33 | `loop-bench` | automatic**

**Trigger:** accepted_stop_33.

**World state:** At `loop-bench`, the dated accepted-result slip for Stop 33 reads: "ε=-(μ₀ℓ/2π)ln(b/a)dI/dt. Integrate the 1/r field over loop width.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The loop prediction needs its polarity checked against changes in the mast current."

**Unlocks/waypoint:** Unlock Stop 34 at `loop-bench` in Earthing Trench.

**Beat 3 - After Stop 34 | `cable-bay` | automatic**

**Trigger:** accepted_stop_34.

**World state:** At `loop-bench`, the dated accepted-result slip for Stop 34 reads: "Rising opposes, steady gives zero, falling reverses; BLv, -A dB/dt, and rotating-loop form match.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The symbolic loop model is ready to be tested using the archived event's measured geometry and current rise."

**Unlocks/waypoint:** Unlock Stop 35 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 35 | `cable-bay` | automatic**

**Trigger:** accepted_stop_35.

**World state:** At `cable-bay`, the dated accepted-result slip for Stop 35 reads: "Prediction is -1.10 kV. Visible substitution reproduces it.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The archived pulse cannot confirm the model unless it also fits the uncertainty in loop geometry."

**Unlocks/waypoint:** Unlock Stop 36 at `cable-bay` in Remote Outstation.

**Beat 5 - At mission end | `loop-bench` | automatic**

**Trigger:** accepted_stop_36.

**World state:** At `loop-bench`, Saira Malik pins the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip to the loop plan. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Saira Malik: "Close enough to pursue. Not enough to stop digging. But Tate finds another bonded lead across the trench; the current still has a path missing from the plan."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m09

**Home:** `loop-bench`. **Before:** The dated mission-9 evidence holder at this fixture has no accepted record. A trench plan lies under a ruler laid along the hidden cable turn.
**After — exact action:** Saira Malik pins the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip to the loop plan.
**Trigger:** accepted_stop_36. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `earth-cert`, the April certificate hangs beside a new sharp voltage trace.
**Segue - exact player copy:** But Tate finds another bonded lead across the trench; the current still has a path missing from the plan.

## Location plan

EARTH→COUPLE; geometry precedes the locked archived trace. 

## Characters and dramatic beat

Tate supplies construction truth; Noor enforces precommitment. 

## Key concepts, explained here

 flux integral, Faraday, Lenz, motion/rotation emf, uncertainty.  

## Four graded stops
## Stop 33 - Derive the Buried-Loop EMF

**Format/placement:** DERIVE, at `loop-bench`.

**Metadata:** Concept: 24 - Faraday rectangular loop near wire; Keystone: K8,K10; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the buried-loop bench, in Earthing Trench.

**Stop reason - exact player copy:** The induction diagnosis needs a geometric prediction before the archived trailer pulse is opened.

**Question card story setup - exact player copy:** Derive induced emf from changing mast current before seeing the trailer trace.

**Question card story-science connection - exact player copy:** The buried-loop expression connects mast-current rise rate and loop dimensions to the voltage the trailer should experience.

**Fixture source panel - exact player copy:** Derive induced emf from changing mast current before seeing the trailer trace. Vacuum permeability: μ₀ = 4π × 10^-7 T m/A.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the symbolic emf.

**Complete format-specific interaction block:** lines `B=μ0I/(2πr)`, `Φ=∫a^b Bℓdr=μ0Iℓ/(2π)ln(b/a)`, `ε=-μ0ℓ/(2π)ln(b/a)dI/dt`. Prompt derive/rules.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `B=μ0I/(4πr²), using a point-source inverse square`
2. `Φ=Bℓ(b−a) with B treated as constant`
3. `ε=+μ0ℓ/(2π)ln(b/a)dI/dt, dropping Lenz's-law sign`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Derive induced emf from changing mast current before seeing the trailer trace.", "Build the three-line flux and Faraday derivation for the rectangular loop, name Ampere, integration, and Faraday-Lenz rules, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the Buried-Loop EMF in the form and units requested by the prompt"
  left_side: "emf"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B=μ0I/(2πr)", correct: true}
        - {text: "B=μ0I/(4πr²)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Φ=∫a^b Bℓdr=μ0Iℓ/(2π)ln(b/a)", correct: true}
        - {text: "Φ=Bℓ(b−a) with B treated as constant", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ε=-μ0ℓ/(2π)ln(b/a)dI/dt", correct: true}
        - {text: "ε=+μ0ℓ/(2π)ln(b/a)dI/dt", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `ε=-(μ₀ℓ/2π)ln(b/a)dI/dt.` Integrate the `1/r` field over loop width.

**Answer text:** The completed check shows ε=-(μ₀ℓ/2π)ln(b/a)dI/dt. Integrate the 1/r field over loop width.

**Why:** integrating nonuniform `B(r)` prevents a false uniform-field estimate.

**Wrong-path feedback:** `B is not uniform across a=2 m to b=5 m; integrate dr/r.`

**State/output:** unlock S2.

## Stop 34 - Match Induction Sources

**Format/placement:** PROTOCOL, at `loop-bench`.

**Metadata:** Concept: 25 - Lenz direction and emf sources; Keystone: K10; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: PRACTICE L2.

**Call - exact player copy:** Go to the buried-loop bench, in Earthing Trench.

**Stop reason - exact player copy:** The loop prediction needs its polarity checked against changes in the mast current.

**Question card story setup - exact player copy:** With the symbolic pulse fixed, match rising, steady, and falling mast current to loop polarity. Then match sliding rod, changing field, and rotating coil to their specific Faraday expressions.

**Question card story-science connection - exact player copy:** The induction mappings establish whether each source should produce a positive, negative, or zero voltage during the pulse.

**Question card prompt - exact player copy:** Match rising, steady, and falling current to polarity; match sliding rod, changing uniform field, and rotating loop to BLv, -A dB/dt, and NABωsin(ωt); submit all six matches.

**Complete format-specific interaction block:** scenarios `[rising,steady,falling,sliding_rod,changing_uniform_B,rotating_N_loop]`; choices include `[negative/clockwise,zero,positive/counterclockwise,BLv,-A dB/dt,NABωsinωt]`; keyed mapping. Prompt submit all six matches. State waypoint.

**Correct result:** `Rising opposes, steady gives zero, falling reverses; BLv, -A dB/dt, and rotating-loop form match.`

**Answer text:** The completed check shows rising opposes, steady gives zero, falling reverses; BLv, -A dB/dt, and rotating-loop form match.

**Why:** Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Wrong-path feedback:** `Lenz opposes the change in flux, not the existing field.`

**State/output:** Record the result and unlock the next named stop.

## Stop 35 - Calculate the Archived EMF

**Format/placement:** DERIVE, at `cable-bay`.

**Metadata:** Concept: 24 - numerical induction; Keystone: K10,K8; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** The symbolic loop model is ready to be tested using the archived event's measured geometry and current rise.

**Question card story setup - exact player copy:** Take the derived model to the outstation with loop dimensions ell=20 m, a=2.0 m, b=5.0 m, and current rise dI/dt=3.0×10^8 A/s. Calculate the predicted emf and record its physical justification.

**Question card story-science connection - exact player copy:** The predicted loop voltage provides an independent value for comparison with the trailer's stored pulse trace.

**Fixture source panel - exact player copy:** Take the derived model to the outstation with loop dimensions ell=20 m, a=2.0 m, b=5.0 m, and current rise dI/dt=3.0×10^8 A/s. Calculate the predicted emf and record its physical justification. Vacuum permeability: μ₀ = 4π × 10^-7 T m/A.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit predicted emf in kV with sign.

**Complete format-specific interaction block:** substitution in formula with `μ0`; result magnitude `1099.8 V≈1.10kV`, negative during rise. Prompt lines/rules, submit kV/sign; tolerance.03kV. State trace reveals -1.06kV.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Use the loop's outer radius for B everywhere instead of the logarithmic integral`
2. `Leave μ0=4π×10^-7 out of the substitution`
3. `Report +1.10 kV during a current rise`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Take the derived model to the outstation with loop dimensions ell=20 m, a=2.0 m, b=5.0 m, and current rise dI/dt=3.0×10^8 A/s.", "Using μ₀=4π×10^-7 T·m/A and the displayed ℓ, a, b, and dI/dt, build the substitution and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Calculate the Archived EMF in the form and units requested by the prompt"
  left_side: "emf"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε| = μ0ℓ/(2π) ln(b/a)|dI/dt|", correct: true}
        - {text: "|ε| = [μ0I/(2πb)](b-a)l", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε|=(4πe-7)(20)/(2π) ln(5.0/2.0)(3.0e8) V=1.0998e3 V", correct: true}
        - {"text": "|ε|=(4πe-7)(20)/(2π) ln(2.0/5.0)(3.0e8) V=-1.0998e3 V", "correct": false, "survives": true, "reason": "Reversing the integration bounds changes the sign; an emf magnitude cannot be negative."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ε = -1.10 kV during the rise", correct: true}
        - {text: "emf = Report +1.10 kV during a current rise", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `Prediction is -1.10 kV.` Visible substitution reproduces it.

**Answer text:** The completed check shows prediction is -1.10 kV. Visible substitution reproduces it.

**Why:** a precomputed magnitude and sign make the archived waveform a real test.

**Wrong-path feedback:** `Use ln(5/2), SI units, and the displayed loop orientation for sign.`

**State/output:** Record the result and unlock the next named stop.

## Stop 36 - Verify the Loop Model

**Format/placement:** VERIFY, at `cable-bay`.

**Metadata:** Concept: 30 - prediction test; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 decision.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** The archived pulse cannot confirm the model unless it also fits the uncertainty in loop geometry.

**Question card story setup - exact player copy:** Because the prediction is -1.10 kV, compare it with the archived -1.06 kV peak while varying a by ±0.10 m. Decide whether one loop model explains both.

**Question card story-science connection - exact player copy:** The predicted voltage band determines whether one loop model can account for the measured archived peak.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock -1.10 kV. OPERATE: Vary only a from 1.90 to 2.10 m while ℓ, b, and dI/dt stay fixed. MEASURE: Record the predicted range and archived peak. INTERPRET: Submit consistent or inconsistent; no restoration is required.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{source:"Stop 35 loop model",submit:{quantity:"induced voltage",unit:"kV",truth:-1.10,tolerance:0.03}},equipment_locked_until_prediction_commit:true,operation:{control:"loop dimension a",range:[1.90,2.10],unit:"m",fixed:["ell","b","dI/dt"]},measurements:{predicted_range:[-1.13,-1.07],archived_peak:-1.10,unit:"kV"},restore:{required:false,reason:"uncertainty sweep changes no equipment setting"},correct_conclusion:"consistent",answerText:"The archived -1.10 kV peak lies inside the predicted uncertainty range, so the loop model is consistent."}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify the Loop Model", unit: "units printed on the card"}
  predictionRange: {min: 0.53, max: 1.59, step: 0.106}
  measurement: {label: "independent measured value", truth: 1.06}
  passRatio: [0.95, 1.05]
  correctResultText: "`Archived -1.06 kV lies inside the predicted geometry band.`"
```

**Correct result:** `Archived -1.06 kV lies inside the predicted geometry band.`

**Answer text:** The completed check shows archived -1.06 kV lies inside the predicted geometry band.

**Why:** prediction before reveal protects the test from after-the-fact tuning.

**Wrong-path feedback:** `Do not retune ℓ, b, or dI/dt after reveal; only the stated a uncertainty moves.`

**State/output:** report piece9.

## Mission outcome

Mission decision: The buried loop predicts the failed card. Its pulse is near -1.10 kV, close to the archived -1.06 kV peak. The trench reveals another bonded lead. The current path is still incomplete.

**Segue - exact player copy:** But Tate finds another bonded lead across the trench; the current still has a path missing from the plan.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Saira Malik pins the -1.10 KV PREDICTED / -1.06 KV ARCHIVED strip to the loop plan. But Tate finds another bonded lead across the trench; the current still has a path missing from the plan.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains magnetic flux?

**Options - exact player copy:**

- A. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- B. Magnetic field passing through a surface.
- C. Lenz's law fixes direction while flux change can come from field, motion, or rotation.
- D. A precomputed magnitude and sign make the archived waveform a real test.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for magnetic flux. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes faraday’s law for a rectangular loop near a straight wire. It does not answer the question about magnetic flux.
- B: Correct. Magnetic field passing through a surface.
- C: This describes lenz direction and emf sources. It does not answer the question about magnetic flux.
- D: This describes numerical induction. It does not answer the question about magnetic flux.

### Review question 2


**Prompt - exact player copy:** Which statement best explains faraday’s law for a rectangular loop near a straight wire?

**Options - exact player copy:**

- A. Magnetic field passing through a surface.
- B. Lenz's law fixes direction while flux change can come from field, motion, or rotation.
- C. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- D. A precomputed magnitude and sign make the archived waveform a real test.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for faraday’s law for a rectangular loop near a straight wire. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic flux. It does not answer the question about faraday’s law for a rectangular loop near a straight wire.
- B: This describes lenz direction and emf sources. It does not answer the question about faraday’s law for a rectangular loop near a straight wire.
- C: Correct. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- D: This describes numerical induction. It does not answer the question about faraday’s law for a rectangular loop near a straight wire.

### Review question 3


**Prompt - exact player copy:** Which statement best explains lenz direction and emf sources?

**Options - exact player copy:**

- A. Magnetic field passing through a surface.
- B. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- C. A precomputed magnitude and sign make the archived waveform a real test.
- D. Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for lenz direction and emf sources. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic flux. It does not answer the question about lenz direction and emf sources.
- B: This describes faraday’s law for a rectangular loop near a straight wire. It does not answer the question about lenz direction and emf sources.
- C: This describes numerical induction. It does not answer the question about lenz direction and emf sources.
- D: Correct. Lenz's law fixes direction while flux change can come from field, motion, or rotation.

### Review question 4


**Prompt - exact player copy:** Which statement best explains numerical induction?

**Options - exact player copy:**

- A. A precomputed magnitude and sign make the archived waveform a real test.
- B. Magnetic field passing through a surface.
- C. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- D. Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for numerical induction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A precomputed magnitude and sign make the archived waveform a real test.
- B: This describes magnetic flux. It does not answer the question about numerical induction.
- C: This describes faraday’s law for a rectangular loop near a straight wire. It does not answer the question about numerical induction.
- D: This describes lenz direction and emf sources. It does not answer the question about numerical induction.

### Review question 5


**Prompt - exact player copy:** Which statement best explains prediction test?

**Options - exact player copy:**

- A. Magnetic field passing through a surface.
- B. Prediction before reveal protects the test from after-the-fact tuning.
- C. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- D. Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for prediction test. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic flux. It does not answer the question about prediction test.
- B: Correct. Prediction before reveal protects the test from after-the-fact tuning.
- C: This describes faraday’s law for a rectangular loop near a straight wire. It does not answer the question about prediction test.
- D: This describes lenz direction and emf sources. It does not answer the question about prediction test.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Magnetic field passing through a surface.
- B. Integrating nonuniform B(r) prevents a false uniform-field estimate.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. Lenz's law fixes direction while flux change can come from field, motion, or rotation.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes magnetic flux. It does not answer the question about electric charge.
- B: This describes faraday’s law for a rectangular loop near a straight wire. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes lenz direction and emf sources. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- flux integral, Faraday, Lenz, motion/rotation emf, uncertainty.
- ## Four graded stops
- **Mission takeaway:** The buried loop predicts the failed card.

---

# Mission 10 - A Good Bond at the Wrong Speed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 10 - 6 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** A Good Bond at the Wrong Speed  
**Card body:** 6 days until the last storm window closes. The April certificate hangs beside a new sharp voltage trace. Today you decide whether a slow bond test clears a fast pulse.
**Objective:** Predict the bond's transient voltage and judge its certificate.  
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
  - id: groundtruth_m10_we01
    title: Inductor voltage
    problem: An inductor has L=0.2 H and its current rises at 10 A/s. Find induced emf.
    rule: ε_L=-L(dI/dt) under the chosen positive-current convention.
    steps:
    - 'Set up the relationship: ε_L=-L(dI/dt) under the chosen positive-current convention.'
    - ε_L=-0.2(10)=-2 V.
    answer: The induced emf opposes the current increase and has magnitude 2 V.
    common_mistake: Use current change per time, not current itself.
  - id: groundtruth_m10_we02
    title: Inductor energy
    problem: An inductor has L=0.5 H and I=4 A. Find stored magnetic energy.
    rule: U_B=LI²/2.
    steps:
    - 'Set up the relationship: U_B=LI²/2.'
    - U_B=0.5(4²)/2=4 J.
    answer: Stored magnetic energy is 4 J.
    common_mistake: Energy is proportional to current squared.
  - id: groundtruth_m10_we03
    title: Mutual induction
    problem: Two coils have mutual inductance M=0.1 H. Current in the first rises at 20 A/s. Find induced-emf magnitude in the second.
    rule: '|ε2|=M|dI1/dt|.'
    steps:
    - 'Set up the relationship: |ε2|=M|dI1/dt|.'
    - '|ε2|=0.1(20)=2 V.'
    answer: The second coil has induced emf magnitude 2 V.
    common_mistake: A constant current does not induce emf through this mechanism.
  - id: groundtruth_m10_we04
    title: Ohm's law
    problem: A 6 V supply is across a 3 Ω resistor. Find current.
    rule: For an ohmic resistor, I=V/R.
    steps:
    - 'Set up the relationship: For an ohmic resistor, I=V/R.'
    - I=6/3=2 A.
    answer: Current is 2 amperes.
    common_mistake: Current is not voltage times resistance.
  - id: groundtruth_m10_we05
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Inductance: flux linkage per current and opposition to current change. Transient: brief change before a circuit settles. Time constant: characteristic response time.

#### Primer concepts

- Inductor voltage scales with `dI/dt`; resistance tests do not measure all transient impedance; magnetic energy is `½ L I²`.

#### Equations first needed today
**Equation:** `ε_L=-L dI/dt`, `U_B=½ L I²`

**What it is for:** self-induced voltage/energy

**Symbols:** `ε_L` induced voltage in volts; `L` inductance in henries; `I` current in amperes; `t` time in seconds; `U_B` stored magnetic energy in joules.

**Why this campaign needs it:** bond.

**Equation:** `B=μ₀nI`, `L=μ₀N²A/ℓ`

**What it is for:** solenoid field/inductance

**Symbols:** `B` magnetic field in teslas; `μ₀` vacuum permeability; `n` turns per metre; `I` current in amperes; `L` inductance in henries; `N` number of turns; `A` coil area in square metres; `ℓ` coil length in metres.

**Why this campaign needs it:** derive path model.

## Main story happening - designer summary
Impulse Hall Stops 1–2 establish the pulse; travel to the Earthing Trench because only the trench has the lead length and loop; Stops 3–4 reject the certificate for fast use. Two locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `hall-board` | automatic**

**Trigger:** mission_10_arrival.

**World state:** The April certificate hangs beside a new sharp voltage trace.

**Panel/HUD text:** Elise Strand, impulse engineer: “Same energy, different front. Watch the derivative.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Same energy, different front. Watch the derivative."

**Unlocks/waypoint:** Unlock Stop 37 at `hall-board` in Impulse Hall.

**Beat 2 - After Stop 37 | `gap-row` | automatic**

**Trigger:** accepted_stop_37.

**World state:** At `hall-board`, the dated accepted-result slip for Stop 37 reads: "L=μ₀N²A/ℓ. Ampere field plus N flux linkages gives the result.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The coil model is established, but a late bank stage could change both pulse slope and ringing."

**Unlocks/waypoint:** Unlock Stop 38 at `gap-row` in Impulse Hall.

**Beat 3 - After Stop 38 | `conduit-bond` | automatic**

**Trigger:** accepted_stop_38.

**World state:** At `gap-row`, the dated accepted-result slip for Stop 38 reads: "Delay must be ≤50 ns. Greater delay lowers derivative but raises ringing beyond the joint rule.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The timing check leaves the bond's voltage under a fast pulse to be quantified."

**Unlocks/waypoint:** Unlock Stop 39 at `conduit-bond` in Earthing Trench.

**Beat 4 - After Stop 39 | `earth-cert` | automatic**

**Trigger:** accepted_stop_39.

**World state:** At `conduit-bond`, the dated accepted-result slip for Stop 39 reads: "VR=4.2 kV; VL=0.600 kV. Resistance and inductance are separate voltage terms.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Saira Malik: "That check holds. The calculated pulse voltages exceed what the April resistance certificate was designed to describe."

**Unlocks/waypoint:** Unlock Stop 40 at `earth-cert` in Earthing Trench.

**Beat 5 - At mission end | `hall-board` | automatic**

**Trigger:** accepted_stop_40.

**World state:** At `earth-cert`, Saira Malik stamps the April certificate STEADY TEST ONLY. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Saira Malik: "April's test was sound. Its promise was too large. Therefore Tate must measure every current branch before Ortiz's next shot; the bond can pass slowly and fail fast."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m10

**Home:** `earth-cert`. **Before:** The dated mission-10 evidence holder at this fixture has no accepted record. The April certificate hangs beside a new sharp voltage trace.
**After — exact action:** Saira Malik stamps the April certificate STEADY TEST ONLY.
**Trigger:** accepted_stop_40. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `strike-ledger`, two current totals leave a red gap on the strike ledger.
**Segue - exact player copy:** Therefore Tate must measure every current branch before Ortiz's next shot; the bond can pass slowly and fail fast.

## Location plan

BANK→EARTH because source waveform and receiving lead are separate. 

## Characters and dramatic beat

Strand admits stage timing; Tate accepts certificate limits. 

## Key concepts, explained here

 solenoid L, self-emf, magnetic energy, transient impedance.  

## Four graded stops
## Stop 37 - Derive Inductance

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: 27 - solenoid inductance; Keystone: K8,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: INTRODUCE L3.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** The pulse investigation needs a coil model before the crew interprets inductive voltage in the bond.

**Question card story setup - exact player copy:** Model a wound calibration coil with N turns, length ℓ, and area A. Derive its inductance from Ampere's field and flux linkage before testing the bond pulse.

**Question card story-science connection - exact player copy:** The coil's inductance expression links its turns and geometry to the voltage created by changing current.

**Fixture source panel - exact player copy:** Model a wound calibration coil with N turns, length ℓ, and area A. Derive its inductance from Ampere's field and flux linkage before testing the bond pulse. Vacuum permeability: μ₀ = 4π × 10^-7 T m/A.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit L=μ₀N²A/ℓ.

**Complete format-specific interaction block:** lines `B=μ0NI/ℓ`(Ampere), `Φ=BA`(flux), `NΦ=LI`(definition), `L=μ0N²A/ℓ`; exact.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `B=μ0NI, omitting solenoid length`
2. `Φ=B/A`
3. `Φ=LI without the N turns`
4. `L=μ0NA/ℓ, missing one factor of N`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Model a wound calibration coil with N turns, length ℓ, and area A.", "Build four lines from Ampere’s solenoid field through total flux linkage, name each rule, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Inductance in the form and units requested by the prompt"
  left_side: "L"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B=μ0NI/ℓ", correct: true}
        - {text: "B=μ0NI", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Φ=BA", correct: true}
        - {text: "Φ=B/A", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "NΦ=LI", correct: true}
        - {text: "NΦ=LI/N", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "L=μ0N²A/ℓ", correct: true}
        - {text: "L=μ0NA/ℓ", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `L=μ₀N²A/ℓ.` Ampere field plus N flux linkages gives the result.

**Answer text:** The completed check shows l=μ₀N²A/ℓ. Ampere field plus N flux linkages gives the result.

**Why:** the derivation shows how geometry controls opposition to changing current.

**Wrong-path feedback:** `Flux linkage is NΦ; omitting that N loses the square.`

**State/output:** unlock S2.

## Stop 38 - Sweep Stage-7 Delay

**Format/placement:** SWEEP, at `gap-row`.

**Metadata:** Concept: 26 - dI/dt; Keystone: K11,K6; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the spark-gap row, in Impulse Hall.

**Stop reason - exact player copy:** The coil model is established, but a late bank stage could change both pulse slope and ringing.

**Question card story setup - exact player copy:** With the inductance relation established, sweep stage-7 delay from 0 to 200 ns while energy stays 1.50 kJ. Record peak dI/dt and pulse ringing.

**Question card story-science connection - exact player copy:** The joint current-rise and ringing limits determine how much stage-7 delay the shot plan can tolerate.

**Question card prompt - exact player copy:** Sweep only stage-7 delay from 0 to 200 ns while energy remains 1.50 kJ, record dI/dt and ringing at inspected delays, and submit the inclusive acceptable delay bound.

**Complete format-specific interaction block:** delay `[0,50,100,150,200]ns`, dIdt `[3.0,2.8,2.4,2.0,1.7]e8A/s`, ringing `[5,8,14,22,31]%`; correct acceptable delay≤50ns. Prompt inspect/submit bound. State waypoint EARTH.

**Correct result:** `Delay must be ≤50 ns.` Greater delay lowers derivative but raises ringing beyond the joint rule.

**Answer text:** The completed check shows delay must be ≤50 ns. Greater delay lowers derivative but raises ringing beyond the joint rule.

**Why:** equal stored energy can create unequal inductive hazard because waveform shape matters.

**Wrong-path feedback:** `Energy stays fixed; judge both dI/dt and ringing at inspected settings.`

**State/output:** Record the result and unlock the next named stop.

## Stop 39 - Derive Bond Voltage

**Format/placement:** DERIVE, at `conduit-bond`.

**Metadata:** Concept: 28 - bond voltage; Keystone: K11,K7; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L3.

**Call - exact player copy:** Go to the bonded conduit, in Earthing Trench.

**Stop reason - exact player copy:** The timing check leaves the bond's voltage under a fast pulse to be quantified.

**Question card story setup - exact player copy:** At the trench, the bond has L=2.0 microH, R=0.42 ohm, current I=10 kA, and dI/dt=3.0×10^8 A/s. Derive the resistive and inductive voltage terms, then justify their physical meanings.

**Question card story-science connection - exact player copy:** Separating resistive and inductive voltage shows which parts of the bond response a steady-resistance test cannot certify.

**Fixture source panel - exact player copy:** At the trench, the bond has L=2.0 microH, R=0.42 ohm, current I=10 kA, and dI/dt=3.0×10^8 A/s. Derive the resistive and inductive voltage terms, then justify their physical meanings.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit V_R and |V_L| in kV.

**Complete format-specific interaction block:** lines `VR=IR=(10000 A)(0.42 ohm)=4200 V=4.2 kV`; `|VL|=L|dI/dt|=(2.0e-6 H)(3.0e8 A/s)=600 V`; total magnitude bound `4.8kV` with polarity diagram. Prompt submit both/units; tolerances 0.1kV,10V.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `V_R=I/R`
2. `V_L=L I, omitting dI/dt`
3. `Subtract the two voltage demands even though the polarity diagram makes them add`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["At the trench, the bond has L=2.0 microH, R=0.42 ohm, current I=10 kA, and dI/dt=3.0×10^8 A/s.", "Using L=2.0 μH, R=0.42 Ω, I=10 kA, and dI/dt=3.0×10^8 A/s, build both voltage calculations and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Bond Voltage in the form and units requested by the prompt"
  left_side: "VR"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "VR=IR=(10000 A)(0.42 ohm)=4200 V=4.2 kV", correct: true}
        - {text: "V_R=I/R", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|VL|=L|dI/dt|=(2.0e-6 H)(3.0e8 A/s)=600 V", correct: true}
        - {text: "V_L=L I", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "V_total=4.2 kV+0.6 kV=4.8 kV", correct: true}
        - {text: "VR = Subtract the two voltage demands even though the polarity diagram makes them add", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `VR=4.2 kV; VL=0.600 kV.` Resistance and inductance are separate voltage terms.

**Answer text:** The completed check shows vR=4.2 kV; VL=0.600 kV. Resistance and inductance are separate voltage terms.

**Why:** the larger term identifies what the slow certificate failed to test.

**Wrong-path feedback:** `Convert μH before multiplying and do not replace dI/dt with I.`

**State/output:** unlock S4.

## Stop 40 - Scope the April Certificate

**Format/placement:** DIAGNOSIS, at `earth-cert`.

**Metadata:** Concept: 28 - DC vs transient safety; Keystone: K7,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the earth certificate board, in Earthing Trench.

**Stop reason - exact player copy:** The calculated pulse voltages exceed what the April resistance certificate was designed to describe.

**Question card story setup - exact player copy:** Now the same lead produces 4.2 kV resistive and 0.60 kV inductive drop during the pulse. Diagnose which statement the 0.42 Ω certificate can honestly support.

**Question card story-science connection - exact player copy:** The certificate's valid scope determines whether it can support fast-shot approval or only a steady-current resistance claim.

**Question card prompt - exact player copy:** Read all four certificate zones, then submit whether they support safe at all times, safe for direct current (DC) only, or inductance only.

**Complete format-specific interaction block:** readings `[dc_R normal,pulse_L untested,stage_delay alarm,physical_bond intact]`; choices `[safe_all_times,safe_dc_only,inductance_only]`; answer safe_dc_only.

**§7 authored-board source - DIAGNOSIS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 40 - Scope the April Certificate"
  format: "DIAGNOSIS"
  source: "Handback 3 canonical interaction block"
  question: "Read all four certificate zones, select the one scope statement they jointly support, and submit safe at all times, safe for DC only, or inductance only."
  payload: "readings `[dc_R normal,pulse_L untested,stage_delay alarm,physical_bond intact]`; choices `[safe_all_times,safe_dc_only,inductance_only]`; answer safe_dc_only."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DIAGNOSIS:**

```yaml
diagnosis:
  headline: "Read all four certificate zones, select the one scope statement they jointly support, and submit safe at all times, safe for DC only, or inductance only."
  readings:
    - {zone: alarm_source, label: "alarming source zone", value: "alarm present"}
    - {zone: transfer_path, label: "possible transfer path", value: "evidence present"}
    - {zone: quiet_control, label: "quiet comparison zone", value: "no alarm"}
    - {zone: protected_interior, label: "protected interior", value: "quiet"}
  choices:
    - {id: dc_only, label: "Safe for steady DC only"}
    - {id: all_times, label: "Safe at every timescale"}
    - {id: inductance_only, label: "Certificate proves inductance only"}
    - {id: broken_bond, label: "Physical bond was already broken"}
  answer: dc_only
  rebuttals:
    all_times: "The untested pulse inductance and stage-delay alarm defeat an all-times claim."
    inductance_only: "The certificate measured 0.42 Ω DC resistance, not inductance."
    broken_bond: "The physical bond is intact, so breakage cannot explain the scope failure."
```

**Correct result:** `The 0.42 Ω certificate supports steady-current resistance only.`

**Answer text:** The completed check shows the 0.42 Ω certificate supports steady-current resistance only.

**Why:** a measurement is valid only for the quantity and timescale it tested.

**Wrong-path feedback:** `An intact bond and true DC value do not certify a microsecond waveform.`

**State/output:** report piece10.

## Mission outcome

Mission decision: Do not certify the bond lead for lightning. Its low-rate test is sound. A fast pulse adds voltage from the lead itself. Gap timing changes that voltage. Next, measure every current path.

**Segue - exact player copy:** Therefore Tate must measure every current branch before Ortiz's next shot; the bond can pass slowly and fail fast.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Saira Malik stamps the April certificate STEADY TEST ONLY. Therefore Tate must measure every current branch before Ortiz's next shot; the bond can pass slowly and fail fast.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains inductance?

**Options - exact player copy:**

- A. The derivation shows how geometry controls opposition to changing current.
- B. Equal stored energy can create unequal inductive hazard because waveform shape matters.
- C. The larger term identifies what the slow certificate failed to test.
- D. Flux linkage per current and opposition to current change.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for inductance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes solenoid inductance. It does not answer the question about inductance.
- B: This describes dI and dt. It does not answer the question about inductance.
- C: This describes bond voltage. It does not answer the question about inductance.
- D: Correct. Flux linkage per current and opposition to current change.

### Review question 2


**Prompt - exact player copy:** Which statement best explains solenoid inductance?

**Options - exact player copy:**

- A. The derivation shows how geometry controls opposition to changing current.
- B. Flux linkage per current and opposition to current change.
- C. Equal stored energy can create unequal inductive hazard because waveform shape matters.
- D. The larger term identifies what the slow certificate failed to test.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for solenoid inductance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The derivation shows how geometry controls opposition to changing current.
- B: This describes inductance. It does not answer the question about solenoid inductance.
- C: This describes dI and dt. It does not answer the question about solenoid inductance.
- D: This describes bond voltage. It does not answer the question about solenoid inductance.

### Review question 3


**Prompt - exact player copy:** Which statement best explains dI and dt?

**Options - exact player copy:**

- A. Flux linkage per current and opposition to current change.
- B. Equal stored energy can create unequal inductive hazard because waveform shape matters.
- C. The derivation shows how geometry controls opposition to changing current.
- D. The larger term identifies what the slow certificate failed to test.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for di and dt. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes inductance. It does not answer the question about di and dt.
- B: Correct. Equal stored energy can create unequal inductive hazard because waveform shape matters.
- C: This describes solenoid inductance. It does not answer the question about di and dt.
- D: This describes bond voltage. It does not answer the question about di and dt.

### Review question 4


**Prompt - exact player copy:** A conductor has R=0.42 Ω and L=2.0 μH. During a pulse, I=10 kA and dI/dt=3.0×10⁸ A/s. Compare IR and L(dI/dt).

**Options - exact player copy:**

- A. Flux linkage per current and opposition to current change.
- B. The derivation shows how geometry controls opposition to changing current.
- C. The resistive term is 4200 V and the inductive term is 600 V; a steady-resistance test does not measure the added transient term.
- D. Equal stored energy can create unequal inductive hazard because waveform shape matters.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for bond voltage. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes inductance. It does not answer the question about bond voltage.
- B: This describes solenoid inductance. It does not answer the question about bond voltage.
- C: Correct. The resistive term is 4200 V and the inductive term is 600 V; a steady-resistance test does not measure the added transient term.
- D: This describes dI and dt. It does not answer the question about bond voltage.

### Review question 5


**Prompt - exact player copy:** Which statement best explains DC vs transient safety?

**Options - exact player copy:**

- A. Flux linkage per current and opposition to current change.
- B. The derivation shows how geometry controls opposition to changing current.
- C. Equal stored energy can create unequal inductive hazard because waveform shape matters.
- D. A measurement is valid only for the quantity and timescale it tested.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for dc vs transient safety. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes inductance. It does not answer the question about dc vs transient safety.
- B: This describes solenoid inductance. It does not answer the question about dc vs transient safety.
- C: This describes dI and dt. It does not answer the question about dc vs transient safety.
- D: Correct. A measurement is valid only for the quantity and timescale it tested.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Flux linkage per current and opposition to current change.
- C. The derivation shows how geometry controls opposition to changing current.
- D. Equal stored energy can create unequal inductive hazard because waveform shape matters.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes inductance. It does not answer the question about electric charge.
- C: This describes solenoid inductance. It does not answer the question about electric charge.
- D: This describes dI and dt. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- solenoid L, self-emf, magnetic energy, transient impedance.
- ## Four graded stops
- **Mission takeaway:** The bonding lead is not certified for lightning timescales.

---

# Mission 11 - The Missing Third

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 11 - 5 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Missing Third  
**Card body:** 5 days until the last storm window closes. Two current totals leave a red gap on the strike ledger. Today you decide where the missing strike current went.
**Objective:** Identify and quantify every current path.  
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
  - id: groundtruth_m11_we01
    title: Current per area
    problem: A wire carries 6 A through cross-sectional area 2 mm². Find average current density.
    rule: J=I/A.
    steps:
    - 'Set up the relationship: J=I/A.'
    - J=6/2=3 A/mm²=3×10^6 A/m².
    answer: Average current density is 3 million A/m².
    common_mistake: One square millimetre equals 10^-6 square metres, not 10^-3.
  - id: groundtruth_m11_we02
    title: A missing branch current
    problem: A node receives 8 mA and sends 3 mA through one branch. Find the other outgoing current in steady state.
    rule: Charge conservation requires total incoming current equal total outgoing current.
    steps:
    - 'Set up the relationship: Charge conservation requires total incoming current equal total outgoing current.'
    - 8=3+I, so I=5 mA outward.
    answer: The missing outgoing current is 5 mA.
    common_mistake: Do not add incoming and outgoing magnitudes as if they point the same way.
  - id: groundtruth_m11_we03
    title: Parallel currents
    problem: Two long wires carry 10 A each, 0.1 m apart in the same direction. Use μ0/(2π)=2×10^-7. Find force per length.
    rule: F/L=μ0 I1I2/(2πd).
    steps:
    - 'Set up the relationship: F/L=μ0 I1I2/(2πd).'
    - F/L=(2×10^-7)(10)(10)/0.1=2×10^-4 N/m.
    answer: Force per length is 0.0002 N/m and the wires attract.
    common_mistake: Same-direction parallel currents attract; opposite-direction currents repel.
  - id: groundtruth_m11_we04
    title: Field around a straight wire
    problem: A long straight wire carries 10 A. Find field 0.1 m away, using μ0/(2π)=2×10^-7 T m/A.
    rule: B=μ0 I/(2πr).
    steps:
    - 'Set up the relationship: B=μ0 I/(2πr).'
    - B=(2×10^-7)(10)/0.1=2×10^-5 T=20 μT.
    answer: The field magnitude is 20 μT; its direction circles the wire by the right-hand rule.
    common_mistake: The straight-wire field falls as 1/r, not 1/r².
  - id: groundtruth_m11_we05
    title: Force on a wire segment
    problem: A straight 0.5 m wire carries 2 A perpendicular to a 4 T field. Find magnetic-force magnitude.
    rule: F=ILB sin θ.
    steps:
    - 'Set up the relationship: F=ILB sin θ.'
    - F=2(0.5)(4)=4 N.
    answer: Force magnitude is 4 N.
    common_mistake: Only the component perpendicular to the field contributes.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Current density: current per cross-sectional area. Toroid: ring-shaped winding whose field is mainly inside. Displacement current: changing electric flux term in Ampere-Maxwell law.

#### Primer concepts

- Node currents conserve charge; `J=I/A`; current paths create magnetic fields and forces.

#### Equations first needed today
**Equation:** `J=I/A`

**What it is for:** heating/current concentration

**Symbols:** `J` current density in amperes per square metre; `I` current in amperes; `A` cross-sectional area in square metres.

**Why this campaign needs it:** conduit.

**Equation:** `∮B·dl=μ₀(I+ε₀dΦ_E/dt)`

**What it is for:** Ampere-Maxwell

**Symbols:** `B` magnetic field in teslas; `dl` directed path element in metres; `μ₀` vacuum permeability; `I` conduction current in amperes; `ε₀` vacuum permittivity; `Φ_E` electric flux; `dΦ_E/dt` rate of electric-flux change.

**Why this campaign needs it:** distinguish conduction from changing-field contribution.

## Main story happening - designer summary
The Mast Base ledger points to the conduit; Earthing Trench inspection confirms the both-end bond; the Launch Control timestamp audit rejects calibration error. Three locations are causally linked.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Mast Base | `shunt-rack` | automatic**

**Trigger:** mission_11_arrival.

**World state:** Two current totals leave a red gap on the strike ledger.

**Panel/HUD text:** Marcus Tate, mast engineer: “Thirty entered. Twenty is named. Find the path.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Thirty entered. Twenty is named. Find the path."

**Unlocks/waypoint:** Unlock Stop 41 at `shunt-rack` in Mast Base.

**Beat 2 - After Stop 41 | `cable-bay` | automatic**

**Trigger:** accepted_stop_41.

**World state:** At `shunt-rack`, the dated accepted-result slip for Stop 41 reads: "The unlisted branch carries 10 kA. A closed ledger enforces current conservation.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The missing-current estimate needs a magnetic and mechanical prediction along the suspected conduit."

**Unlocks/waypoint:** Unlock Stop 42 at `cable-bay` in Remote Outstation.

**Beat 3 - After Stop 42 | `conduit-bond` | automatic**

**Trigger:** accepted_stop_42.

**World state:** At `cable-bay`, the dated accepted-result slip for Stop 42 reads: "B=1.00 mT; F/L=50 N/m; same-direction currents attract.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. The conduit prediction must be tested by changing its approved link without changing the bank pulse."

**Unlocks/waypoint:** Unlock Stop 43 at `conduit-bond` in Earthing Trench.

**Beat 4 - After Stop 43 | `record-desk` | automatic**

**Trigger:** accepted_stop_43.

**World state:** At `conduit-bond`, the dated accepted-result slip for Stop 43 reads: "Open removes the 10 kA difference; restore returns it.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Marcus Tate: "That check holds. A successful present-day conduit test does not automatically establish the path during the historical event."

**Unlocks/waypoint:** Unlock Stop 44 at `record-desk` in Launch Control.

**Beat 5 - At mission end | `shunt-rack` | automatic**

**Trigger:** accepted_stop_44.

**World state:** At `strike-ledger`, Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Marcus Tate: "That was my conduit. Put it in the report. But Ortiz cannot fire through that route again; Strand needs a prediction for the repaired path first."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m11

**Home:** `strike-ledger`. **Before:** The dated mission-11 evidence holder at this fixture has no accepted record. Two current totals leave a red gap on the strike ledger.
**After — exact action:** Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch.
**Trigger:** accepted_stop_44. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `record-desk`, a sealed prediction sits beside the reduced-test recorder.
**Segue - exact player copy:** But Ortiz cannot fire through that route again; Strand needs a prediction for the repaired path first.

## Location plan

MAST→EARTH→SHOT, each unlocked by field, causal isolation, then historical identity. 

## Characters and dramatic beat

Tate changes from drawing trust to measured-path ownership; Ortiz closes path. 

## Key concepts, explained here

KCL, current density, Ampere, force between wires, attestation.  

## Four graded stops
## Stop 41 - Close the Strike-Current Ledger

**Format/placement:** BALANCE, at `shunt-rack`.

**Metadata:** Concept: 17 - current ledger; Keystone: K7; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L4.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** The base clamp and the listed down-conductors do not account for the same strike current.

**Question card story setup - exact player copy:** The base clamp reads 30 kA, while three down-conductor shunts total only 20 kA. Decide which readings count, close the ledger, and compute the missing current.

**Question card story-science connection - exact player copy:** The current imbalance measures the unlisted branch that could be carrying the pulse toward the cabinet.

**Question card prompt - exact player copy:** Choose which identified streams count once, close the 30 kA current ledger, and submit the missing branch current in kA.

**Complete format-specific interaction block:** `balance:{streams:[{id:"clamp_total",direction:"in",value:30,unit:"kA",counts:true},{id:"shunt_1",direction:"out",value:8,unit:"kA",counts:true},{id:"shunt_2",direction:"out",value:7,unit:"kA",counts:true},{id:"shunt_3",direction:"out",value:5,unit:"kA",counts:true},{id:"duplicate_display",direction:"none",value:30,unit:"kA",counts:false,reason:"duplicate display of the clamp"}],equation:"missing=clamp-sum(shunts)",correct:10,tolerance:0.5,answerText:"Ten kiloamperes require an unmeasured path; the duplicate clamp display is not another current stream."}`

**Correct result:** `The unlisted branch carries 10 kA.` A closed ledger enforces current conservation.

**Answer text:** The completed check shows the unlisted branch carries 10 kA. A closed ledger enforces current conservation.

**Why:** charge conservation makes an unmeasured branch a physical requirement, not optional speculation.

**Wrong-path feedback:** `Do not count the duplicate display as a second physical stream.`

**State/output:** Record the result and unlock the next named stop.

## Stop 42 - Derive Field and Wire Force

**Format/placement:** DERIVE, at `cable-bay`.

**Metadata:** Concept: 22 - coax/toroid Ampere field and force; Keystone: K8,K9,K7; Area: Mast Base; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** The missing-current estimate needs a magnetic and mechanical prediction along the suspected conduit.

**Question card story setup - exact player copy:** Treat the bonded conduit as a straight branch carrying 10 kA; the cabinet is 2.0 m away. Derive B, then derive force per length against a parallel 5.0 kA lead 0.20 m away.

**Question card story-science connection - exact player copy:** The conduit field and force per unit length establish the exposure and loading expected from the proposed current split.

**Fixture source panel - exact player copy:** Treat the bonded conduit as a straight branch carrying 10 kA; the cabinet is 2.0 m away. Derive B, then derive force per length against a parallel 5.0 kA lead 0.20 m away. Start with B=μ₀I/(2πr) for the magnetic field around the conduit, then use F/L=μ₀I₁I₂/(2πd) for force per unit length between the parallel currents. Vacuum permeability: μ₀ = 4π × 10^-7 T m/A.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit B in mT, F/L in N/m, and whether the force attracts or repels.

**Complete format-specific interaction block:** lines `B=μ0I/2πr=1.0mT`; `F/L=I2B1=μ0I1I2/(2πd)=50N/m`; same currents attract. Tolerances. State waypoint EARTH.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `B=μ0I/(2r), omitting π`
2. `F/L=I_2/B_1`
3. `Parallel currents repel`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Treat the bonded conduit as a straight branch carrying 10 kA; the cabinet is 2.0 m away.", "Start with B=μ₀I/(2πr) for the magnetic field around the conduit, then use F/L=μ₀I₁I₂/(2πd) for force per unit length between the parallel currents.", "μ0 = 4π × 10^-7 T m/A, vacuum permeability."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Field and Wire Force in the form and units requested by the prompt"
  left_side: "F"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "B=μ0I/(2πr)=(4πe-7)(10000)/(2π×2.0) T=1.0 mT", correct: true}
        - {text: "B=μ0I/(2r)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "F/L=μ0I1I2/(2πd)=(4πe-7)(10000)(5000)/(2π×0.20)=50 N/m", correct: true}
        - {text: "F/L=I_2/B_1", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "F = The same-direction currents attract", correct: true}
        - {text: "F = Parallel currents repel", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `B=1.00 mT; F/L=50 N/m; same-direction currents attract.`

**Answer text:** The completed check shows b=1.00 mT; F/L=50 N/m; same-direction currents attract.

**Why:** field and force provide independent evidence for the hidden path.

**Wrong-path feedback:** `Use 2.0 m for cabinet B and 0.20 m for wire-force separation.`

**State/output:** Record the result and unlock the next named stop.

## Stop 43 - Isolate Conduit Current

**Format/placement:** CONTROL, at `conduit-bond`.

**Metadata:** Concept: 30 - bond causality; Keystone: K7,K8,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L4.

**Call - exact player copy:** Go to the bonded conduit, in Earthing Trench.

**Stop reason - exact player copy:** The conduit prediction must be tested by changing its approved link without changing the bank pulse.

**Question card story setup - exact player copy:** Because the field predicts 10 kA, open only the approved test link, keep bank pulse, shunts, and geometry fixed, then restore the link. Measure clamp-minus-shunt current each time.

**Question card story-science connection - exact player copy:** The reversible clamp-minus-shunt difference tests whether the conduit actually carries the missing current.

**Question card prompt - exact player copy:** Change only the approved conduit link from closed to open while pulse, shunts, and geometry stay fixed. Measure clamp-minus-shunt current after the link settles, restore closed and remeasure, then submit the numerical comparison and causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"test_link",label:"approved conduit link"},{id:"stage_voltage",label:"stage voltage"},{id:"shunt_gain",label:"shunt gain"}],correct_control:"test_link",baseline:{state:"closed",difference_current:10,unit:"kA"},response:{state:"open",difference_current:0.3,unit:"kA"},noise_band:{value:0.5,unit:"kA"},fixed:["pulse","shunts","geometry"],measure_when:"after each link state settles",restore:{required:true,state:"closed",remeasure:true},correct_conclusion:"the conduit carried the missing current",answerText:"Opening only the conduit link removes the clamp-minus-shunt current beyond noise; restoration brings it back."}`

**Correct result:** `Open removes the 10 kA difference; restore returns it.`

**Answer text:** The completed check shows open removes the 10 kA difference; restore returns it.

**Why:** loss and return of the missing current ties it to the conduit branch.

**Wrong-path feedback:** `Operate only the approved link and complete the restoration measurement before concluding.`

**State/output:** Record the result and unlock the next named stop.

## Stop 44 - Verify the Historical Path

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `record-desk`.

**Metadata:** Concept: 30 - timestamps/current identity; Keystone: K12,K7; Area: Screened Room; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the record desk in Launch Control.

**Stop reason - exact player copy:** A successful present-day conduit test does not automatically establish the path during the historical event.

**Question card story setup - exact player copy:** Decide whether the historical current split is defensible.

**Question card story-science connection - exact player copy:** Matching conductor identity and event timing determines whether the old records support the same current split.

**Question card prompt - exact player copy:** Use no more than four checks to verify week-five identity, timing, bond, and calibration records, then submit the historical current fraction and path.

**Complete format-specific interaction block:** `attest:{verification_limit:4,claims:[{id:"shunt_identity",label:"week-five shunt identity",signed:true,backed:true,critical:true},{id:"clock_alignment",label:"week-five clock alignment",signed:true,backed:true,critical:true},{id:"conduit_work_order",label:"conduit bond work order",signed:true,backed:false,critical:true},{id:"clamp_calibration",label:"clamp calibration",signed:true,backed:true,critical:true},{id:"today_link",label:"today controlled-link result",signed:true,backed:true,critical:false}],correct_verified:["shunt_identity","clock_alignment","conduit_work_order","clamp_calibration"],critical_unbacked:"conduit_work_order",answerText:"Verify the four historical records, including the unbacked conduit work order, before applying the current causal result to week five."}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Verify the Historical Path", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** `Week-five records support one-third via conduit.` Identity and timing transfer the test.

**Answer text:** The completed check shows week-five records support one-third via conduit. Identity and timing transfer the test.

**Why:** matched identity and timing transfer the causal result to the failed shot.

**Wrong-path feedback:** `Today’s result alone cannot establish the historical shot; verify all four critical records.`

**State/output:** report piece11.

## Mission outcome

Mission decision: About one third of the strike used the bonded conduit. Current totals, field tests, and timing all agree. Mark the conduit unsafe for now. Test a new route before the next shot.

**Segue - exact player copy:** But Ortiz cannot fire through that route again; Strand needs a prediction for the repaired path first.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Marcus Tate pins the CONDUIT: ABOUT ONE THIRD record into the missing branch. But Ortiz cannot fire through that route again; Strand needs a prediction for the repaired path first.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains current density?

**Options - exact player copy:**

- A. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- B. Current per cross-sectional area.
- C. Field and force provide independent evidence for the hidden path.
- D. Loss and return of the missing current ties it to the conduit branch.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for current density. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current ledger. It does not answer the question about current density.
- B: Correct. Current per cross-sectional area.
- C: This describes using magnetic fields and forces to check a current path. It does not answer the question about current density.
- D: This describes bond causality. It does not answer the question about current density.

### Review question 2


**Prompt - exact player copy:** Which statement best explains current ledger?

**Options - exact player copy:**

- A. Current per cross-sectional area.
- B. Field and force provide independent evidence for the hidden path.
- C. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- D. Loss and return of the missing current ties it to the conduit branch.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for current ledger. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current density. It does not answer the question about current ledger.
- B: This describes using magnetic fields and forces to check a current path. It does not answer the question about current ledger.
- C: Correct. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- D: This describes bond causality. It does not answer the question about current ledger.

### Review question 3


**Prompt - exact player copy:** Which statement best explains using magnetic fields and forces to check a current path?

**Options - exact player copy:**

- A. Current per cross-sectional area.
- B. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- C. Loss and return of the missing current ties it to the conduit branch.
- D. Field and force provide independent evidence for the hidden path.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for using magnetic fields and forces to check a current path. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current density. It does not answer the question about using magnetic fields and forces to check a current path.
- B: This describes current ledger. It does not answer the question about using magnetic fields and forces to check a current path.
- C: This describes bond causality. It does not answer the question about using magnetic fields and forces to check a current path.
- D: Correct. Field and force provide independent evidence for the hidden path.

### Review question 4


**Prompt - exact player copy:** Which statement best explains bond causality?

**Options - exact player copy:**

- A. Loss and return of the missing current ties it to the conduit branch.
- B. Current per cross-sectional area.
- C. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- D. Field and force provide independent evidence for the hidden path.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for bond causality. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Loss and return of the missing current ties it to the conduit branch.
- B: This describes current density. It does not answer the question about bond causality.
- C: This describes current ledger. It does not answer the question about bond causality.
- D: This describes using magnetic fields and forces to check a current path. It does not answer the question about bond causality.

### Review question 5


**Prompt - exact player copy:** Which statement best explains timestamps and current identity?

**Options - exact player copy:**

- A. Current per cross-sectional area.
- B. Matched identity and timing transfer the causal result to the event being studied.
- C. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- D. Field and force provide independent evidence for the hidden path.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for timestamps and current identity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current density. It does not answer the question about timestamps and current identity.
- B: Correct. Matched identity and timing transfer the causal result to the event being studied.
- C: This describes current ledger. It does not answer the question about timestamps and current identity.
- D: This describes using magnetic fields and forces to check a current path. It does not answer the question about timestamps and current identity.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Current per cross-sectional area.
- B. Charge conservation makes an unmeasured branch a physical requirement, not optional speculation.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. Field and force provide independent evidence for the hidden path.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes current density. It does not answer the question about electric charge.
- B: This describes current ledger. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes using magnetic fields and forces to check a current path. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- KCL, current density, Ampere, force between wires, attestation.
- ## Four graded stops
- **Mission takeaway:** About one third of the week-five strike current flowed through the bonded instrument conduit.

---

# Mission 12 - Predict, Then Fire

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 12 - 4 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Predict, Then Fire  
**Card body:** Four days remain in the storm window. A sealed forecast sits beside the small-test trace. Today you decide if the fixed route earns a full-shot test.
**Objective:** Verify the reroute with a committed quantitative prediction.  
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
  - id: groundtruth_m12_we01
    title: Mutual induction
    problem: Two coils have mutual inductance M=0.1 H. Current in the first rises at 20 A/s. Find induced-emf magnitude in the second.
    rule: '|ε2|=M|dI1/dt|.'
    steps:
    - 'Set up the relationship: |ε2|=M|dI1/dt|.'
    - '|ε2|=0.1(20)=2 V.'
    answer: The second coil has induced emf magnitude 2 V.
    common_mistake: A constant current does not induce emf through this mechanism.
  - id: groundtruth_m12_we02
    title: Induced voltage
    problem: Magnetic flux through a one-turn loop changes from 0.1 to 0.5 Wb in 0.2 s. Find the average induced emf with the stated positive flux direction.
    rule: Average emf ε=-ΔΦ/Δt.
    steps:
    - 'Set up the relationship: Average emf ε=-ΔΦ/Δt.'
    - ε=-(0.5-0.1)/0.2=-2 V.
    answer: The signed induced emf is -2 V for that flux orientation.
    common_mistake: The minus sign expresses opposition to the change in flux, not always to the original field.
  - id: groundtruth_m12_we03
    title: Inductor voltage
    problem: An inductor has L=0.2 H and its current rises at 10 A/s. Find induced emf.
    rule: ε_L=-L(dI/dt) under the chosen positive-current convention.
    steps:
    - 'Set up the relationship: ε_L=-L(dI/dt) under the chosen positive-current convention.'
    - ε_L=-0.2(10)=-2 V.
    answer: The induced emf opposes the current increase and has magnitude 2 V.
    common_mistake: Use current change per time, not current itself.
  - id: groundtruth_m12_we04
    title: Use a reversible intervention
    problem: A lamp draws 2 A at setting A, 3 A at setting B, and 2 A after returning to A. Supply voltage and the lamp are unchanged. What does this support?
    rule: Change one proposed cause, hold other relevant factors fixed, then restore the original condition.
    steps:
    - A → B changes the current by 3-2 = 1 A.
    - B → A restores 2 A. The response reverses with the setting under the stated controls.
    answer: The result supports a setting effect under these test conditions.
    common_mistake: One intervention does not prove the effect is identical under every other condition.
  - id: groundtruth_m12_we05
    title: Test a frozen prediction
    problem: Before seeing a new measurement, a model predicts 12 units with an allowed error of 1 unit. The new measurement is 15 units. Does it pass this test?
    rule: Absolute prediction error = |observed - predicted|.
    steps:
    - absolute error = |15-12| = 3 units. The prediction remains fixed.
    - comparison = 3 > 1. The error exceeds the prewritten tolerance.
    answer: The model fails this held-out test.
    common_mistake: Refitting to 15 before scoring would no longer test the original prediction.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Mutual inductance: flux linkage in one circuit per current in another. Transfer function: output divided by input as a function of frequency.

#### Primer concepts

- Changing current couples loops; smaller loop area and greater separation reduce mutual inductance; verification requires prediction first.

#### Equations first needed today
**Equation:** `ε₂=-M dI₁/dt`

**What it is for:** mutual induction

**Symbols:** `ε₂` induced voltage in the second loop in volts; `M` mutual inductance in henries; `I₁` current in the first loop in amperes; `t` time in seconds.

**Why this campaign needs it:** reroute.

## Main story happening - designer summary
Impulse Hall calculate/commit→Mast Base operate/measure→Earthing Trench interpret. Three locations mirror the physical causal chain.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Impulse Hall | `bank-stages` | automatic**

**Trigger:** mission_12_arrival.

**World state:** A sealed prediction sits beside the reduced-test recorder.

**Panel/HUD text:** Elise Strand, impulse engineer: “Calculate first. The charger stays locked until the number is committed.”

**Dialogue bubbles -** Dr. Lena Ortiz: "Calculate first. The charger stays locked until the number is committed."

**Unlocks/waypoint:** Unlock Stop 45 at `bank-stages` in Impulse Hall.

**Beat 2 - After Stop 45 | `hall-board` | automatic**

**Trigger:** accepted_stop_45.

**World state:** At `bank-stages`, the dated accepted-result slip for Stop 45 reads: "Reduced bank energy is 375 J. Halving V quarters U.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The reduced-shot plan needs a new voltage prediction for the rerouted cable geometry."

**Unlocks/waypoint:** Unlock Stop 46 at `hall-board` in Impulse Hall.

**Beat 3 - After Stop 46 | `shunt-rack` | automatic**

**Trigger:** accepted_stop_46.

**World state:** At `hall-board`, the dated accepted-result slip for Stop 46 reads: "180 V at full derivative; 90 V at reduced derivative.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The reroute prediction is committed, so the crew can now collect an independent reduced-shot measurement."

**Unlocks/waypoint:** Unlock Stop 47 at `shunt-rack` in Mast Base.

**Beat 4 - After Stop 47 | `conduit-bond` | automatic**

**Trigger:** accepted_stop_47.

**World state:** At `shunt-rack`, the dated accepted-result slip for Stop 47 reads: "Measured 92 V passes the committed 80–100 V band.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The reduced-shot success must still survive the stronger pulse and uncertain coupling of a full shot."

**Unlocks/waypoint:** Unlock Stop 48 at `conduit-bond` in Earthing Trench.

**Beat 5 - At mission end | `bank-stages` | automatic**

**Trigger:** accepted_stop_48.

**World state:** At `record-desk`, Dr. Lena Ortiz clips the 90 V PREDICTED / 92 V MEASURED strip into the report. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Dr. Lena Ortiz: "The route earned a test. It has not earned blind trust. But Noor's fastest peak fits between the old recorder ticks; the final shot needs channels quick enough to see it."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m12

**Home:** `record-desk`. **Before:** The dated mission-12 evidence holder at this fixture has no accepted record. A sealed prediction sits beside the reduced-test recorder.
**After — exact action:** Dr. Lena Ortiz clips the 90 V PREDICTED / 92 V MEASURED strip into the report.
**Trigger:** accepted_stop_48. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `recorder-rack`, a narrow peak stands above a slow trace that barely moves.
**Segue - exact player copy:** But Noor's fastest peak fits between the old recorder ticks; the final shot needs channels quick enough to see it.

## Location plan

BANK→MAST→EARTH follows source, current, receiving bond. 

## Characters and dramatic beat

Strand owns source, Tate path, Noor tolerance. 

## Key concepts, explained here

 voltage-squared energy, mutual L, staged verification, worst-case range.  

## Four graded stops
## Stop 45 - Calculate Reduced Energy

**Format/placement:** BALLPARK, at `bank-stages`.

**Metadata:** Concept: 13 - reduced energy; Keystone: K5,K6; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L3.

**Call - exact player copy:** Go to the Marx bank stages, in Impulse Hall.

**Stop reason - exact player copy:** The reroute must first be tested at reduced energy before the crew attempts a full shot.

**Question card story setup - exact player copy:** The test uses twelve 100 nF stages at 25.0 kV each rather than 50.0 kV. Estimate total stored energy using U_total=12(½CV²) before the charging control unlocks.

**Question card story-science connection - exact player copy:** The reduced bank energy establishes the test exposure associated with the lower stage voltage.

**Question card prompt - exact player copy:** Using twelve 100 nF stages at 25.0 kV, assemble U_total=12(½CV²) and submit total energy in joules before the charger unlocks.

**Complete format-specific interaction block:** target `375J`, tolerance 5%, visible constants. Prompt assemble/submit J.

**Correct result:** `Reduced bank energy is 375 J.` Halving V quarters U.

**Answer text:** The completed check shows reduced bank energy is 375 J. Halving V quarters U.

**Why:** halving voltage quarters capacitor energy.

**Wrong-path feedback:** `The bank still has twelve stages; change only stage voltage.`

**State/output:** unlock S2.

## Stop 46 - Predict Reroute Voltage

**Format/placement:** DERIVE, at `hall-board`.

**Metadata:** Concept: 26 - mutual emf; Keystone: K10,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the impulse hall board, in Impulse Hall.

**Stop reason - exact player copy:** The reduced-shot plan needs a new voltage prediction for the rerouted cable geometry.

**Question card story setup - exact player copy:** The old mutual inductance 3.7 microH and rise rate 3.0×10^8 A/s predicted 1.11 kV. The reroute lowers mutual inductance to 0.60 microH; derive its pulse prediction and justify the change.

**Question card story-science connection - exact player copy:** The reroute's mutual inductance determines the expected trailer voltage at both full and reduced current-rise rates.

**Fixture source panel - exact player copy:** The old mutual inductance of 3.7 microH and current rise rate of 3.0×10^8 A/s predicted 1.11 kV. The reroute lowers mutual inductance to 0.60 microH. Derive its induced-emf magnitude at the same rise rate and at half that rate, then explain the change.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit both voltages in volts and commit the reduced prediction.

**Complete format-specific interaction block:** lines `|ε|=M|dI/dt|`; substitution `.60e-6×3e8`; `180V`; for half rise rate reduced shot `90V`. Prompt build lines/rules, submit 90V, tolerance 5V. State commit locked→S3.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `|ε|=M|I|, using current instead of its rate of change`
2. `Convert μH as 10^-3 H`
3. `0.60e-6×3e8=18 V`
4. `Halving rise time halves induced voltage`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The old mutual inductance 3.7 microH and rise rate 3.0×10^8 A/s predicted 1.11 kV. The reroute lowers mutual inductance to 0.60 microH; derive its pulse prediction and justify the change.", "Build the mutual-emf calculation for M_new=0.60 μH, first at 3.0×10^8 A/s and then at half that rise rate"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Predict Reroute Voltage in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε|=M|dI/dt|", correct: true}
        - {text: "|ε|=M|I|", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε|=(0.60e-6 H)(3.0e8 A/s)", correct: true}
        - {text: "R = Convert μH as 10^-3 H", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε|=180 V", correct: true}
        - {text: "0.60e-6×3e8=18 V", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|ε_half|=(0.60e-6 H)(1.5e8 A/s)=90 V", correct: true}
        - {text: "R = Halving rise time halves induced voltage", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `180 V at full derivative; 90 V at reduced derivative.`

**Answer text:** The completed check shows 180 V at full derivative; 90 V at reduced derivative.

**Why:** mutual inductance links the geometry repair directly to measurable voltage.

**Wrong-path feedback:** `Apply both changes in order: new M, then half dI/dt.`

**State/output:** Record the result and unlock the next named stop.

## Stop 47 - Fire the Reduced Test

**Format/placement:** VERIFY, at `shunt-rack`.

**Metadata:** Concept: 30 - staged verification; Keystone: K7,K10,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** The reroute prediction is committed, so the crew can now collect an independent reduced-shot measurement.

**Question card story setup - exact player copy:** The committed reduced-shot prediction is 90 V. Fire only the 25.0 kV stage setting, keep gap spacing 8 mm and reroute geometry fixed, then collect peak current and rise time.

**Question card story-science connection - exact player copy:** The measured trailer peak determines whether the new route passes its precommitted voltage band.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock 90 V. OPERATE: Fire only 25.0 kV stages with 8 mm gap and reroute fixed. MEASURE: Record current, rise rate, and trailer peak. INTERPRET: Earth the bank and submit PASS or FAIL against 80–100 V.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"trailer peak",unit:"V",truth:90,tolerance:10}},equipment_locked_until_prediction_commit:true,operation:{action:"fire reduced test",settings:{stage_voltage:25.0,unit:"kV",gap:8,unit_gap:"mm"},fixed:["reroute"]},measurements:{current:15,unit_current:"kA",rise_rate:1.5e8,unit_rise:"A/s",trailer_peak:92,unit_peak:"V"},restore:{required:true,action:"earth the bank",remeasure:false},acceptance:[80,100],correct_conclusion:"PASS",answerText:"The measured 92 V lies inside the 80-100 V window; earth the bank and record PASS."}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Fire the Reduced Test", unit: "units printed on the card"}
  predictionRange: {min: 46.0, max: 138.0, step: 9.2}
  measurement: {label: "independent measured value", truth: 92.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`Measured 92 V passes the committed 80–100 V band.`"
```

**Correct result:** `Measured 92 V passes the committed 80–100 V band.`

**Answer text:** The completed check shows measured 92 V passes the committed 80–100 V band.

**Why:** operation cannot tune the prediction after the measurement.

**Wrong-path feedback:** `Commit before firing, keep named controls fixed, collect every reading, and earth the bank.`

**State/output:** Record the result and unlock the next named stop.

## Stop 48 - Stress Worst-Case Coupling

**Format/placement:** STRESS, asked by Dr. Lena Ortiz beside `conduit-bond`.

**Metadata:** Concept: 26 - uncertainty; Keystone: K12,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5 decision.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the bonded conduit in Earthing Trench.

**Stop reason - exact player copy:** The reduced-shot success must still survive the stronger pulse and uncertain coupling of a full shot.

**Question card story setup - exact player copy:** The reduced shot measured 92 V, but the full shot has uncertain coupling and rise rate. Vary mutual inductance from 0.50 to 0.70 microH and dI/dt from 2.8 to 3.2×10^8 A/s, then test the 250 V limit.

**Question card story-science connection - exact player copy:** The worst-case coupled voltage determines whether the reroute remains below the trailer limit throughout the allowed uncertainty range.

**Question card prompt - exact player copy:** Adjust M and dI/dt through both displayed ranges, submit the numerical worst-case pair and voltage in volts, then select safe or unsafe against the inclusive 250 V limit.

**Complete format-specific interaction block:** ranges; maximum `224V`; correct pass. Prompt move assumptions, submit worst voltage/conclusion.

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 48 - Stress Worst-Case Coupling"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Adjust M and dI/dt through both displayed ranges, submit the numerical worst-case pair and voltage in volts, then select safe or unsafe against the inclusive 250 V limit."
  payload: "ranges; maximum `224V`; correct pass. Prompt move assumptions, submit worst voltage/conclusion."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "mutual inductance", min: 0.01, max: 0.014, nominal: 0.012, step: 0.001, unit: "H"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.012, max: 0.012}
      failsAt: 0.014
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.012, max: 0.014}
      failsAt: 0.01
    - id: robust_plan
      label: "`Worst pair gives 224 V, below 250 V.`"
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 0.01, max: 0.014}
  robust: robust_plan
  question: "Adjust M and dI/dt through both displayed ranges, submit the numerical worst-case pair and voltage in volts, then select safe or unsafe against the inclusive 250 V limit."
```

**Correct result:** `Worst pair gives 224 V, below 250 V.`

**Answer text:** The completed check shows worst pair gives 224 V, below 250 V.

**Why:** the repair passes only if every allowed pair stays below the campaign limit.

**Wrong-path feedback:** `Submit the numerical pair and worst voltage before selecting the safe plan.`

**State/output:** report piece12.

## Mission outcome

Mission decision: The reroute is safe for a full shot under the stated tolerance. The reduced test measured 92 V against a 90 V prediction, and the worst allowed full-shot case is 224 V, below 250 V. The remaining question is whether the recorders can see the fastest pulse. Metric target 25:00.

**Segue - exact player copy:** But Noor's fastest peak fits between the old recorder ticks; the final shot needs channels quick enough to see it.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Dr. Lena Ortiz clips the 90 V PREDICTED / 92 V MEASURED strip into the report. But Noor's fastest peak fits between the old recorder ticks; the final shot needs channels quick enough to see it.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains mutual inductance?

**Options - exact player copy:**

- A. Halving voltage quarters capacitor energy.
- B. Mutual inductance links the geometry repair directly to measurable voltage.
- C. Operation cannot tune the prediction after the measurement.
- D. Flux linkage in one circuit per current in another.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for mutual inductance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes reduced energy. It does not answer the question about mutual inductance.
- B: This describes mutual emf. It does not answer the question about mutual inductance.
- C: This describes staged verification. It does not answer the question about mutual inductance.
- D: Correct. Flux linkage in one circuit per current in another.

### Review question 2


**Prompt - exact player copy:** A capacitor's voltage is halved while its capacitance stays fixed. What happens to its stored energy, U=½CV²?

**Options - exact player copy:**

- A. It falls to one quarter of its original value.
- B. Flux linkage in one circuit per current in another.
- C. Mutual inductance links the geometry repair directly to measurable voltage.
- D. Operation cannot tune the prediction after the measurement.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for reduced energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. It falls to one quarter of its original value.
- B: This describes mutual inductance. It does not answer the question about reduced energy.
- C: This describes mutual emf. It does not answer the question about reduced energy.
- D: This describes staged verification. It does not answer the question about reduced energy.

### Review question 3


**Prompt - exact player copy:** Which statement best explains mutual emf?

**Options - exact player copy:**

- A. Flux linkage in one circuit per current in another.
- B. Mutual inductance links the geometry repair directly to measurable voltage.
- C. Halving voltage quarters capacitor energy.
- D. Operation cannot tune the prediction after the measurement.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for mutual emf. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes mutual inductance. It does not answer the question about mutual emf.
- B: Correct. Mutual inductance links the geometry repair directly to measurable voltage.
- C: This describes reduced energy. It does not answer the question about mutual emf.
- D: This describes staged verification. It does not answer the question about mutual emf.

### Review question 4


**Prompt - exact player copy:** Which statement best explains staged verification?

**Options - exact player copy:**

- A. Flux linkage in one circuit per current in another.
- B. Halving voltage quarters capacitor energy.
- C. Operation cannot tune the prediction after the measurement.
- D. Mutual inductance links the geometry repair directly to measurable voltage.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for staged verification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes mutual inductance. It does not answer the question about staged verification.
- B: This describes reduced energy. It does not answer the question about staged verification.
- C: Correct. Operation cannot tune the prediction after the measurement.
- D: This describes mutual emf. It does not answer the question about staged verification.

### Review question 5


**Prompt - exact player copy:** A circuit must remain below 250 V. All allowed combinations of two uncertain inputs predict peaks from 180 V to 224 V. What does the model support?

**Options - exact player copy:**

- A. Flux linkage in one circuit per current in another.
- B. Halving voltage quarters capacitor energy.
- C. Mutual inductance links the geometry repair directly to measurable voltage.
- D. The circuit passes the voltage requirement throughout the stated input range.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for uncertainty. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes mutual inductance. It does not answer the question about uncertainty.
- B: This describes reduced energy. It does not answer the question about uncertainty.
- C: This describes mutual emf. It does not answer the question about uncertainty.
- D: Correct. The circuit passes the voltage requirement throughout the stated input range.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Flux linkage in one circuit per current in another.
- C. Halving voltage quarters capacitor energy.
- D. Mutual inductance links the geometry repair directly to measurable voltage.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes mutual inductance. It does not answer the question about electric charge.
- C: This describes reduced energy. It does not answer the question about electric charge.
- D: This describes mutual emf. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- voltage-squared energy, mutual L, staged verification, worst-case range.
- ## Four graded stops
- **Mission takeaway:** The reroute is safe for a full shot under the stated tolerance.

---

# Mission 13 - The Missing Microsecond

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 13 - 3 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Missing Microsecond  
**Card body:** 3 days until the last storm window closes. A narrow peak stands above a slow trace that barely moves. Today you decide which recorders can see the fastest pulse.
**Objective:** Choose recorders fast enough for the relevant transient.  
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
  - id: groundtruth_m13_we01
    title: An RC time constant
    problem: A resistor R=1000 Ω charges a capacitor C=0.001 F. Find the time constant.
    rule: For this resistor-capacitor circuit, τ=RC.
    steps:
    - 'Set up the relationship: For this resistor-capacitor circuit, τ=RC.'
    - τ=1000(0.001)=1 s.
    answer: The time constant is 1 second.
    common_mistake: A time constant is not the time for mathematically complete charging.
  - id: groundtruth_m13_we02
    title: Fraction charged after one time constant
    problem: An initially uncharged capacitor charges through a resistor from a constant supply. Find Vc/V_final at t=τ. Use e^-1≈0.368.
    rule: Vc/V_final=1-e^(-t/τ).
    steps:
    - 'Set up the relationship: Vc/V_final=1-e^(-t/τ).'
    - Vc/V_final=1-e^-1=1-0.368=0.632.
    answer: It reaches about 63.2% of final voltage.
    common_mistake: One time constant does not mean fully charged.
  - id: groundtruth_m13_we03
    title: An RL time constant
    problem: A series resistor-inductor circuit has L=2 H and R=4 Ω. Find its time constant.
    rule: τ=L/R.
    steps:
    - 'Set up the relationship: τ=L/R.'
    - τ=2/4=0.5 s.
    answer: The current-response time constant is 0.5 s.
    common_mistake: The inductor time constant is L/R, not LR.
  - id: groundtruth_m13_we04
    title: Inductor voltage
    problem: An inductor has L=0.2 H and its current rises at 10 A/s. Find induced emf.
    rule: ε_L=-L(dI/dt) under the chosen positive-current convention.
    steps:
    - 'Set up the relationship: ε_L=-L(dI/dt) under the chosen positive-current convention.'
    - ε_L=-0.2(10)=-2 V.
    answer: The induced emf opposes the current increase and has magnitude 2 V.
    common_mistake: Use current change per time, not current itself.
  - id: groundtruth_m13_we05
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

Bandwidth: range of signal frequencies a channel can follow. Resistor-capacitor (RC) circuit: a circuit with time constant `τ=R C`. Resistor-inductor (RL) circuit: a circuit with time constant `τ=L/R`. Inductor-capacitor (LC) circuit: a circuit that can exchange energy between its magnetic and electric fields.

#### Primer concepts

- After about `5τ` a first-order response is over 99% settled; larger τ is slower; shield continuity matters at high frequency.

#### Equations first needed today
**Equation:** charging/discharging `Q=Q∞(1-e^-t/(R C))`, `Q=Q0e^-t/(R C)`; resistor-inductor response `I=(ε/R)(1-e^-tR/L)`

**What it is for:** transient response

**Symbols:** `Q` is charge, `Q∞` final charge, `Q0` initial charge, `e` the exponential constant, `t` time, `R` resistance, `C` capacitance, `I` current, `ε` source voltage, and `L` inductance.

**Why this campaign needs it:** qualify channels.

**Equation:** `ω₀=1/√(LC)` and transformer `V₂/V₁=N₂/N₁`

**What it is for:** inductor-capacitor oscillation and ideal transformation

**Symbols:** `ω₀` resonant angular frequency in radians per second; `L` inductance in henries; `C` capacitance in farads; `V₁` and `V₂` primary and secondary voltages; `N₁` and `N₂` primary and secondary turn counts.

**Why this campaign needs it:** recognize ringing and probe scaling.

## Main story happening - designer summary
Screened Room analysis→Launch Control raw-sample audit→Earthing Trench certificate reinterpretation. Three locations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Screened Room | `record-budget` | automatic**

**Trigger:** mission_13_arrival.

**World state:** A narrow peak stands above a slow trace that barely moves.

**Panel/HUD text:** Noor Haddad, data and safety analyst: “A smooth line can be a slow instrument.”

**Dialogue bubbles -** Dr. Lena Ortiz: "A smooth line can be a slow instrument."

**Unlocks/waypoint:** Unlock Stop 49 at `record-budget` in Screened Room.

**Beat 2 - After Stop 49 | `recorder-rack` | automatic**

**Trigger:** accepted_stop_49.

**World state:** At `record-budget`, the dated accepted-result slip for Stop 49 reads: "The fast isolated channel alone has structureless pulse residuals.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The slow channel's smooth trace needs a response-time calculation before its peak reading is trusted."

**Unlocks/waypoint:** Unlock Stop 50 at `recorder-rack` in Screened Room.

**Beat 3 - After Stop 50 | `record-desk` | automatic**

**Trigger:** accepted_stop_50.

**World state:** At `recorder-rack`, the dated accepted-result slip for Stop 50 reads: "63.2% at τ; 99.33% at 5τ. Exponential response quantifies under-read.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The recorder response identifies a timing weakness that the remaining upgrade budget must address."

**Unlocks/waypoint:** Unlock Stop 51 at `record-desk` in Launch Control.

**Beat 4 - After Stop 51 | `earth-cert` | automatic**

**Trigger:** accepted_stop_51.

**World state:** At `record-desk`, the dated accepted-result slip for Stop 51 reads: "Buy faster sampling; dominant uncertainty falls 18% to 4%.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Noor Haddad: "That check holds. The upgraded waveform shows ringing that the April steady-current test never measured."

**Unlocks/waypoint:** Unlock Stop 52 at `earth-cert` in Earthing Trench.

**Beat 5 - At mission end | `record-budget` | automatic**

**Trigger:** accepted_stop_52.

**World state:** At `recorder-rack`, Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Noor Haddad: "A calm screen can mean a slow screen. Therefore Ortiz must use those channels in the next storm window; the clean old trace cannot clear the repaired station."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m13

**Home:** `recorder-rack`. **Before:** The dated mission-13 evidence holder at this fixture has no accepted record. A narrow peak stands above a slow trace that barely moves.
**After — exact action:** Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack.
**Trigger:** accepted_stop_52. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `trailer-cards`, a fresh strike trace ends at 188 V beside a second strip marked 310 V.
**Segue - exact player copy:** Therefore Ortiz must use those channels in the next storm window; the clean old trace cannot clear the repaired station.

## Location plan

SCREEN→SHOT→EARTH because response model, actual record, and certificate are distinct evidence. 

## Characters and dramatic beat

Noor chooses sufficient evidence rather than perfect coverage. 

## Key concepts, explained here

RC/RL, `5τ`, LC/RLC, transformer, bandwidth/residuals.  

## Four graded stops
## Stop 49 - Find the Fast Recorder

**Format/placement:** RESIDUAL, at `record-budget`.

**Metadata:** Concept: 19 - bandwidth residual; Keystone: K7,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L4.

**Call - exact player copy:** Go to the recorder budget board, in Screened Room.

**Stop reason - exact player copy:** The coupling result needs a recorder fast enough to preserve the actual pulse peak.

**Question card story setup - exact player copy:** Three channels fit the long baseline equally well, but only one records a 100 ns spike without patterned residuals. Compare residual fields and reject the smooth channel that erases the peak.

**Question card story-science connection - exact player copy:** The residual pattern identifies which isolated channel can supply a trustworthy peak for the final shot decision.

**Question card prompt - exact player copy:** Compare every residual field, select the recorder with no patterned failure at the 100 ns peak, and submit its channel ID. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:** traces fast/mid/slow with residual arrays; correct fast, not lowest overall slow RMS.

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 49 - Find the Fast Recorder"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare every residual field, select the recorder with no patterned failure at the 100 ns peak, and submit its channel ID."
  payload: "traces fast/mid/slow with residual arrays; correct fast, not lowest overall slow RMS."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - RESIDUAL:**

```yaml
residual:
  xAxis: {label: "ordered observation in the question", values: [1, 2, 3, 4, 5]}
  fits:
    - id: patterned_low_error
      label: "lower average error but patterned residuals"
      rms: 0.18
      structured: true
      residuals: [{x: 1, y: -0.12}, {x: 2, y: -0.06}, {x: 3, y: 0.00}, {x: 4, y: 0.06}, {x: 5, y: 0.12}]
    - id: unpatterned_generalising
      label: "slightly higher error with no directional pattern"
      rms: 0.21
      structured: false
      residuals: [{x: 1, y: 0.05}, {x: 2, y: -0.04}, {x: 3, y: 0.02}, {x: 4, y: -0.03}, {x: 5, y: 0.01}]
  accept: unpatterned_generalising
  reject: patterned_low_error
  correctConclusion: "`The fast isolated channel alone has structureless pulse residuals.`"
```

**Correct result:** `The fast isolated channel alone has structureless pulse residuals.`

**Answer text:** The completed check shows the fast isolated channel alone has structureless pulse residuals.

**Why:** a good average fit cannot certify a fast event it systematically misses.

**Wrong-path feedback:** `Do not select lowest baseline RMS when its residual erases the peak.`

**State/output:** unlock S2.

## Stop 50 - Derive RC Response

**Format/placement:** DERIVE, at `recorder-rack`.

**Metadata:** Concept: 18 - RC/RL exponentials; Keystone: K7,K11; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the recorder rack, in Screened Room.

**Stop reason - exact player copy:** The slow channel's smooth trace needs a response-time calculation before its peak reading is trusted.

**Question card story setup - exact player copy:** Channel A has resistance R=1.0 kilohm and capacitance C=100 pF, so its resistance-capacitance (RC) time constant is tau=RC=100 ns. Derive the charging fraction after one and five time constants to test its response speed.

**Question card story-science connection - exact player copy:** The charging fractions show how much a short pulse can be suppressed by the recorder's resistance-capacitance response.

**Fixture source panel - exact player copy:** Channel A has resistance R=1.0 kilohm and capacitance C=100 pF, so its resistance-capacitance (RC) time constant is tau=RC=100 ns. Derive the charging fraction after one and five time constants to test its response speed.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit both response percentages.

**Complete format-specific interaction block:** lines `Vc/V∞=1-e^-t/τ`; at τ `Vc/V∞=1-e^(-τ/τ)=1-e^-1=0.632`; at5τ `.9933`; result. Prompt rules/fractions/%; tolerances.2%. State waypoint SHOT.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `V_C/V_inf=e^(−t/τ)`
2. `At τ the capacitor is at e^-1=36.8%`
3. `At 5τ the capacitor is exactly 100% charged`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Channel A has resistance R=1.0 kilohm and capacitance C=100 pF, so its resistance-capacitance (RC) time constant is tau=RC=100 ns.", "Build the charging-response lines for t=τ and t=5τ, name exponential substitution and evaluation, and"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive RC Response in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Vc/V∞=1-e^-t/τ", correct: true}
        - {text: "V_C/V_inf=e^(−t/τ)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Vc/V∞=1-e^(-τ/τ)=1-e^-1=0.632", correct: true}
        - {text: "At τ the capacitor is at e^-1=36.8%", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Vc/V∞=1-e^(-5τ/τ)=1-e^-5=0.9933", correct: true}
        - {text: "R = At 5τ the capacitor is exactly 100% charged", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `63.2% at τ; 99.33% at 5τ.` Exponential response quantifies under-read.

**Answer text:** The completed check shows 63.2% at τ; 99.33% at 5τ. Exponential response quantifies under-read.

**Why:** response fraction quantifies why one sample per time constant underreports the peak.

**Wrong-path feedback:** `Use 1-e^-t/τ for charging, not e^-t/τ.`

**State/output:** Record the result and unlock the next named stop.

## Stop 51 - Buy the Recorder Upgrade

**Format/placement:** PROPAGATE, at `record-desk`.

**Metadata:** Concept: 30 - error budget; Keystone: K12,K7; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the record desk, in Launch Control.

**Stop reason - exact player copy:** The recorder response identifies a timing weakness that the remaining upgrade budget must address.

**Question card story setup - exact player copy:** With RC loss identified, the one-microsecond record can add only one upgrade. Compare costs and propagated uncertainty from faster sampling, another slow sensor, better paint calibration, or a longer cable survey.

**Question card story-science connection - exact player copy:** The uncertainty reduction determines whether the selected upgrade materially improves the one-microsecond pulse measurement.

**Question card prompt - exact player copy:** Read the live error budget, spend the one available record slot, and submit the upgrade that most reduces the uncertainty controlling certification.

**Complete format-specific interaction block:** live error contributions `[bandwidth:18%,gain:3%,timing:4%,geometry:6%]`; options/cost one slot; correct faster sampling reduces to4%. State waypoint EARTH.

**§7 authored-board source - PROPAGATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 51 - Buy the Recorder Upgrade"
  format: "PROPAGATE"
  source: "Handback 5 canonical interaction block"
  question: "Read the live error budget, spend the one available record slot, and submit the upgrade that most reduces the uncertainty controlling certification."
  payload: "live error contributions `[bandwidth:18%,gain:3%,timing:4%,geometry:6%]`; options/cost one slot; correct faster sampling reduces to4%. State waypoint EARTH."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROPAGATE:**

**Handback 5 canonical interaction block - PROPAGATE:**

```yaml
propagate:
  costUnit: "upgrade credits"
  budget: 3
  inputs:
    - {id: bandwidth, label: "Recorder bandwidth", value: 1, sigmaFrac: 0.18, exponent: 1, unit: "response factor", improvableTo: 0.04, cost: 3}
    - {id: gain, label: "Recorder gain", value: 1, sigmaFrac: 0.03, exponent: 2, unit: "gain factor", improvableTo: 0.02, cost: 2}
    - {id: timing, label: "Trigger timing", value: 1, sigmaFrac: 0.04, exponent: 1, unit: "timing factor", improvableTo: 0.03, cost: 1}
    - {id: geometry, label: "Probe geometry", value: 1, sigmaFrac: 0.06, exponent: 1, unit: "geometry factor", improvableTo: 0.05, cost: 2}
  dominant: bandwidth
  improvable: [bandwidth, gain, timing, geometry]
  correctUpgrade: bandwidth
  correctResult: "`Buy faster sampling; dominant uncertainty falls 18% to 4%.`"
```

**Correct result:** `Buy faster sampling; dominant uncertainty falls 18% to 4%.`

**Answer text:** The completed check shows buy faster sampling; dominant uncertainty falls 18% to 4%.

**Why:** spend the channel on bandwidth because it dominates peak-voltage uncertainty.

**Wrong-path feedback:** `Spend the one slot on the error term that changes certification.`

**State/output:** Record the result and unlock the next named stop.

## Stop 52 - Diagnose Frequency Response

**Format/placement:** DIAGNOSIS, at `earth-cert`.

**Metadata:** Concept: 30 - certification timescale, LC/RL/transformer; Keystone: K7,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L5.

**Call - exact player copy:** Go to the earth certificate board, in Earthing Trench.

**Stop reason - exact player copy:** The upgraded waveform shows ringing that the April steady-current test never measured.

**Question card story setup - exact player copy:** The upgraded channel captures damped ringing near angular frequency 1/sqrt(LC), where L is inductance and C is capacitance. The April test used steady current. Diagnose why its 0.42-ohm result and fast waveform can both be correct.

**Question card story-science connection - exact player copy:** The frequency-response diagnosis determines whether both records can be valid while describing different electrical behavior.

**Question card prompt - exact player copy:** Compare direct-current (DC), resistor-inductor (RL), resistor-inductor-capacitor (RLC), transformer, and physical-condition zones. Select the explanation that fits all readings and submit one certificate scope.

**Complete format-specific interaction block:** readings `[DC stable,RL_current_rises_with_tau_LoverR,ringing_at_1overSqrtLC_decays_through_R,probe_ratio_V2overV1_equals_N2overN1,physical_bond_intact]`; choices `[fraud,frequency_dependent_response,charge_nonconservation]`; answer frequency response; mechanism explicitly checks `L dI/dt+IR=ε`, `ω0=1/√LC`, resistance damps RLC energy, and ideal `V2/V1=N2/N1`.

**§7 authored-board source - DIAGNOSIS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 52 - Diagnose Frequency Response"
  format: "DIAGNOSIS"
  source: "Handback 3 canonical interaction block"
  question: "Compare direct-current (DC), resistor-inductor (RL), resistor-inductor-capacitor (RLC), transformer, and physical-condition zones. Select the explanation that fits all readings and submit one certificate scope."
  payload: "readings `[DC stable,RL_current_rises_with_tau_LoverR,ringing_at_1overSqrtLC_decays_through_R,probe_ratio_V2overV1_equals_N2overN1,physical_bond_intact]`; choices `[fraud,frequency_dependent_response,charge_nonconservation]`; answer frequency response; mechanism explicitly checks `L dI/dt+IR=ε`, `ω0=1/√LC`, resistance damps RLC energy, and ideal `V2/V1=N2/N1`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DIAGNOSIS:**

```yaml
diagnosis:
  headline: "Compare the DC, RL, RLC, transformer, and physical-condition readings without treating a steady-current result as a fast-waveform result."
  readings:
    - {zone: alarm_source, label: "alarming source zone", value: "alarm present"}
    - {zone: transfer_path, label: "possible transfer path", value: "evidence present"}
    - {zone: quiet_control, label: "quiet comparison zone", value: "no alarm"}
    - {zone: protected_interior, label: "protected interior", value: "quiet"}
  choices:
    - {id: frequency_response, label: "Frequency-dependent circuit response"}
    - {id: fraud, label: "Fraudulent DC certificate"}
    - {id: charge_loss, label: "Charge nonconservation"}
    - {id: turns_error, label: "Transformer turns-ratio error alone"}
  answer: frequency_response
  rebuttals:
    fraud: "The stable DC resistance is reproducible; it simply does not certify microsecond response."
    charge_loss: "Kirchhoff conservation still holds across the measured branches."
    turns_error: "The transformer ratio is correct and cannot explain the RL and RLC timing together."
```

**Correct result:** `Frequency-dependent response reconciles DC and transient records.`

**Answer text:** The completed check shows frequency-dependent response reconciles DC and transient records.

**Why:** DC resistance, RL growth, RLC loss, and transformer scaling answer different parts of a transient.

**Wrong-path feedback:** `Fraud and charge loss do not predict RL rise, damped LC ringing, and correct transformer ratio together.`

**State/output:** report piece13.

## Mission outcome

Mission decision: Use only the fast, separate channels for the final shot. A slow channel misses much of the peak. The old test still works for steady current. It does not prove safety during lightning.

**Segue - exact player copy:** Therefore Ortiz must use those channels in the next storm window; the clean old trace cannot clear the repaired station.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Noor Haddad ties a FINAL SHOT: FAST INDEPENDENT CHANNELS tag to the recorder rack. Therefore Ortiz must use those channels in the next storm window; the clean old trace cannot clear the repaired station.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains bandwidth?

**Options - exact player copy:**

- A. A good average fit cannot certify a fast event it systematically misses.
- B. Range of signal frequencies a channel can follow.
- C. Response fraction quantifies why one sample per time constant underreports the peak.
- D. Spend the channel on bandwidth because it dominates peak-voltage uncertainty.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for bandwidth. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes bandwidth residual. It does not answer the question about bandwidth.
- B: Correct. Range of signal frequencies a channel can follow.
- C: This describes rC and RL exponentials. It does not answer the question about bandwidth.
- D: This describes error budget. It does not answer the question about bandwidth.

### Review question 2


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
- C. The model increasingly underpredicts as the input grows.
- D. The model fits every observation exactly.

**Correct answer:** C

**Hint - exact player copy:** Use the sign of observed minus predicted and check for a pattern.

**Option feedback - exact player copy:**

- A: Positive residuals mean observations exceed predictions, not the reverse.
- B: Residuals rise systematically with the input.
- C: Correct. The model increasingly underpredicts as the input grows.
- D: An exact fit would have zero residual at every point.

### Review question 3


**Prompt - exact player copy:** Which statement best explains RC and RL exponentials?

**Options - exact player copy:**

- A. Range of signal frequencies a channel can follow.
- B. A good average fit cannot certify a fast event it systematically misses.
- C. Spend the channel on bandwidth because it dominates peak-voltage uncertainty.
- D. Response fraction quantifies why one sample per time constant underreports the peak.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for rc and rl exponentials. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes bandwidth. It does not answer the question about rc and rl exponentials.
- B: This describes bandwidth residual. It does not answer the question about rc and rl exponentials.
- C: This describes error budget. It does not answer the question about rc and rl exponentials.
- D: Correct. Response fraction quantifies why one sample per time constant underreports the peak.

### Review question 4


**Prompt - exact player copy:** Timing bandwidth contributes 80% of a pulse-height error budget, while calibration gain contributes 5%. Which improvement should be investigated first if cost and feasibility are similar?

**Options - exact player copy:**

- A. Improve bandwidth, because it dominates the stated pulse-height uncertainty.
- B. Range of signal frequencies a channel can follow.
- C. A good average fit cannot certify a fast event it systematically misses.
- D. Response fraction quantifies why one sample per time constant underreports the peak.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for error budget. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Improve bandwidth, because it dominates the stated pulse-height uncertainty.
- B: This describes bandwidth. It does not answer the question about error budget.
- C: This describes bandwidth residual. It does not answer the question about error budget.
- D: This describes rC and RL exponentials. It does not answer the question about error budget.

### Review question 5


**Prompt - exact player copy:** Which statement best explains certification timescale, LC and RL and transformer?

**Options - exact player copy:**

- A. Range of signal frequencies a channel can follow.
- B. DC resistance, RL growth, RLC loss, and transformer scaling answer different parts of a transient.
- C. A good average fit cannot certify a fast event it systematically misses.
- D. Response fraction quantifies why one sample per time constant underreports the peak.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for certification timescale, lc and rl and transformer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes bandwidth. It does not answer the question about certification timescale, lc and rl and transformer.
- B: Correct. DC resistance, RL growth, RLC loss, and transformer scaling answer different parts of a transient.
- C: This describes bandwidth residual. It does not answer the question about certification timescale, lc and rl and transformer.
- D: This describes rC and RL exponentials. It does not answer the question about certification timescale, lc and rl and transformer.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. Range of signal frequencies a channel can follow.
- B. A good average fit cannot certify a fast event it systematically misses.
- C. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D. Response fraction quantifies why one sample per time constant underreports the peak.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes bandwidth. It does not answer the question about electric charge.
- B: This describes bandwidth residual. It does not answer the question about electric charge.
- C: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- D: This describes rC and RL exponentials. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- RC/RL, 5τ, LC/RLC, transformer, bandwidth/residuals.
- ## Four graded stops
- **Mission takeaway:** Only the fast isolated channels can certify the final shot.

---

# Mission 14 - The Shot That Almost Closed the Case

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 14 - 2 DAYS UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** The Shot That Almost Closed the Case  
**Card body:** 2 days until the last storm window closes. A fresh strike trace ends at 188 V beside a second strip marked 310 V. Today you decide whether the full shot cleared every card.
**Objective:** Run the integrated full-shot coupling test.  
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
  - id: groundtruth_m14_we01
    title: Electromagnetic energy flow
    problem: Perpendicular fields have E=6 V/m and B=2 μT. Use μ0=4π×10^-7 T m/A. Find energy-flow magnitude.
    rule: S=EB/μ0 when E and B are perpendicular.
    steps:
    - 'Set up the relationship: S=EB/μ0 when E and B are perpendicular.'
    - S=(6)(2×10^-6)/(4π×10^-7)=30/π≈9.55 W/m².
    answer: Energy-flow magnitude is about 9.55 W/m², directed along E×B.
    common_mistake: Poynting flux is power per area, not energy per volume.
  - id: groundtruth_m14_we02
    title: Use a vector direction
    problem: An electric field points east and a magnetic field north. Find the direction of electromagnetic energy flow.
    rule: The Poynting direction is E×B.
    steps:
    - Take east as +x, north as +y, and upward as +z.
    - The right-hand rule gives +x×+y=+z.
    answer: Energy flows upward.
    common_mistake: Reversing the cross-product order reverses the direction.
  - id: groundtruth_m14_we03
    title: Electric field energy density
    problem: A vacuum electric field has magnitude E=10^6 V/m. Use ε0≈9×10^-12 F/m. Find energy per volume.
    rule: u_E=ε0 E²/2.
    steps:
    - 'Set up the relationship: u_E=ε0 E²/2.'
    - u_E=(9×10^-12)(10^12)/2=4.5 J/m³.
    answer: Energy density is 4.5 J per cubic metre.
    common_mistake: The field is squared before powers of ten are combined.
  - id: groundtruth_m14_we04
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
  - id: groundtruth_m14_we05
    title: Apply simultaneous conditions
    problem: A sample must have purity ≥95% and temperature ≤30 °C. It has purity 97% and temperature 32 °C. Does it pass?
    rule: When both conditions are required, both must be true.
    steps:
    - purity test = 97 ≥ 95, true.
    - temperature test = 32 ≤ 30, false. A passing purity cannot cancel a failed temperature.
    answer: The sample fails the combined specification.
    common_mistake: Averaging a pass and a fail is not a logical AND.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Poynting vector: electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.

#### Primer concepts

- Gauss links charge to E; no magnetic monopoles give zero net B flux; Faraday links changing B to circulating E; Ampere-Maxwell links current/changing E to B.

#### Equations first needed today
**Equation:** `S=(1/μ₀)E×B`, `u=u_E+u_B`

**What it is for:** energy flow/density

**Symbols:** `S` electromagnetic energy-flow rate per unit area; `E` electric field; `B` magnetic field; `μ₀` vacuum permeability; `u` total electromagnetic energy density; `u_E` electric energy density; `u_B` magnetic energy density.

**Why this campaign needs it:** track where shot energy travels.

## Main story happening - designer summary
Launch Control precommit/fire→Mast Base inspect paths→Remote Outstation compare. An apparent pass is followed by a rack-loop residual - Twist 3.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Launch Control | `launch-board` | automatic**

**Trigger:** mission_14_arrival.

**World state:** A fresh strike trace ends at 188 V beside a second strip marked 310 V.

**Panel/HUD text:** Dr. Lena Ortiz, station director: “Write every stop condition before the cell arrives.”

**Dialogue bubbles -** Lena Ortiz: "Write every stop condition before the cell arrives."

**Unlocks/waypoint:** Unlock Stop 53 at `launch-board` in Launch Control.

**Beat 2 - After Stop 53 | `radar-desk` | automatic**

**Trigger:** accepted_stop_53.

**World state:** At `launch-board`, the dated accepted-result slip for Stop 53 reads: "All four inclusive thresholds are frozen before data.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. The final shot also needs a prediction of where electromagnetic energy crosses the probe location."

**Unlocks/waypoint:** Unlock Stop 54 at `radar-desk` in Launch Control.

**Beat 3 - After Stop 54 | `shunt-rack` | automatic**

**Trigger:** accepted_stop_54.

**World state:** At `radar-desk`, the dated accepted-result slip for Stop 54 reads: "S=1.59×10^7 W/m² upward. East×north is up.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. The incoming field passes the frozen criterion, allowing the full reroute test to proceed."

**Unlocks/waypoint:** Unlock Stop 55 at `shunt-rack` in Mast Base.

**Beat 4 - After Stop 55 | `probe-rack` | automatic**

**Trigger:** accepted_stop_55.

**World state:** At `shunt-rack`, the dated accepted-result slip for Stop 55 reads: "Main reroute passes: 188 V, 0.40 kA conduit, thresholds met.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Owen Park: "That check holds. A passing main trailer probe cannot exclude a dangerous local peak elsewhere in the card rack."

**Unlocks/waypoint:** Unlock Stop 56 at `probe-rack` in Remote Outstation.

**Beat 5 - At mission end | `launch-board` | automatic**

**Trigger:** accepted_stop_56.

**World state:** At `trailer-cards`, Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Owen Park: "We fixed the long route. This short one still reaches me. But Ortiz's last storm is nearly here; Owen must close the small loop before the final certificate can pass."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m14

**Home:** `trailer-cards`. **Before:** The dated mission-14 evidence holder at this fixture has no accepted record. A fresh strike trace ends at 188 V beside a second strip marked 310 V.
**After — exact action:** Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label.
**Trigger:** accepted_stop_56. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `record-desk`, the repaired card rack waits beside the blank last report page.
**Segue - exact player copy:** But Ortiz's last storm is nearly here; Owen must close the small loop before the final certificate can pass.

## Location plan

SHOT→MAST measurement within S3→COUPLE; source, path, load. 

## Characters and dramatic beat

Ortiz resists declaring victory; Noor requires spatial coverage. 

## Key concepts, explained here

Maxwell synthesis, Poynting, precommitment, spatial probing.  

## Four graded stops
## Stop 53 - Freeze Final Thresholds

**Format/placement:** TRIGGER, at `launch-board`.

**Metadata:** Concept: 30 - integrated rules; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L5.

**Call - exact player copy:** Go to the launch board, in Launch Control.

**Stop reason - exact player copy:** The approaching storm leaves no room to negotiate acceptance limits after the full-shot data arrive.

**Question card story setup - exact player copy:** The board is blank and the storm cell is approaching. Enter the inclusive limits for field 5.0 kV/m, conduit current 1.0 kA, trailer voltage 250 V, and channel spread 0.50 kV/m.

**Question card story-science connection - exact player copy:** The four frozen limits define the field, current, voltage, and channel-agreement conditions required for final approval.

**Question card prompt - exact player copy:** Before any update appears, enter the inclusive field, conduit-current, trailer-voltage, and channel-spread limits with units; submit the complete GO rule.

**Complete format-specific interaction block:** four anchors/rules and consequence; exact. Prompt enter four numeric thresholds/units and submit GO rule before updates.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 53 - Freeze Final Thresholds"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Before any update appears, enter the inclusive field, conduit-current, trailer-voltage, and channel-spread limits with units; submit the complete GO rule."
  payload: "four anchors/rules and consequence; exact. Prompt enter four numeric thresholds/units and submit GO rule before updates."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "vertical electric-field magnitude", min: 0, max: 8, step: 0.1, unit: "kV/m"}
  start: 1.6
  anchors:
    - {at: 1.6, means: "routine baseline, not the decision threshold"}
    - {at: 5.2, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 3.7, hoursLeft: 48}
    - {at: "T-24 h", value: 4.5, hoursLeft: 24}
    - {at: "T-12 h", value: 5.1, hoursLeft: 12}
    - {at: "T-6 h", value: 5.4, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 4.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 5, max: 8}, leadHours: 12}
  question: "Before any update appears, enter the inclusive field, conduit-current, trailer-voltage, and channel-spread limits with units; submit the complete GO rule."
```

**Correct result:** `All four inclusive thresholds are frozen before data.`

**Answer text:** The completed check shows all four inclusive thresholds are frozen before data.

**Why:** one precommitted rule protects against choosing whichever successful measure looks best.

**Wrong-path feedback:** `A partial rule lets one passing measure hide another failure; enter every limit.`

**State/output:** unlock S2.

## Stop 54 - Derive Energy Flow

**Format/placement:** DERIVE, at `radar-desk`.

**Metadata:** Concept: 29 - Poynting; Keystone: K1,K6,K8; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the radar desk, in Launch Control.

**Stop reason - exact player copy:** The final shot also needs a prediction of where electromagnetic energy crosses the probe location.

**Question card story setup - exact player copy:** At one probe, E=2.0×10^4 N/C east and B=1.0 mT north. Derive the Poynting-vector magnitude and direction before the shot trace appears.

**Question card story-science connection - exact player copy:** The energy-flow magnitude and direction connect the local electric and magnetic fields to the shot's spatial energy path.

**Fixture source panel - exact player copy:** At one probe, E=2.0×10^4 N/C points east and B=1.0 mT points north. Use vacuum permeability μ₀=4π×10^-7 T·m/A to derive the Poynting-vector magnitude and direction in three lines before the shot trace appears.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit W/m² and direction.

**Complete format-specific interaction block:** lines `S=E×B/μ0`; magnitude `EB/μ0`; substitution `(20)/(4π×10^-7)=1.59×10^7 W/m²`; east×north=up. Prompt rules/value/direction; tolerance 2%. State fire unlocked.

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `S=EBμ0`
2. `Use E+B instead of EB`
3. `Treat 4π×10^-7 as 4π×10^7`
4. `east×north points down`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["At one probe, E=2.0×10^4 N/C east and B=1.0 mT north.", "Build three Poynting-vector lines using E=2.0×10^4 N/C, B=1.0×10^-3 T, and μ₀=4π×10^-7 T·m/A"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive Energy Flow in the form and units requested by the prompt"
  left_side: "U"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "S=E×B/μ0", correct: true}
        - {text: "S=EBμ0", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|S|=EB/μ0", correct: true}
        - {text: "|S|=(E+B)/μ0", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "|S|=(20)/(4π×10^-7)=1.59×10^7 W/m²", correct: true}
        - {text: "|S|=EB/(4π×10^7)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "U = east×north points upward", correct: true}
        - {text: "U = east×north points down", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** `S=1.59×10^7 W/m² upward.` East×north is up.

**Answer text:** The completed check shows s=1.59×10^7 W/m² upward. East×north is up.

**Why:** `E×B` shows energy moving upward rather than along either field alone.

**Wrong-path feedback:** `E×B is 20 before division by μ₀; do not multiply by μ₀.`

**State/output:** Record the result and unlock the next named stop.

## Stop 55 - Fire the Full Shot

**Format/placement:** VERIFY, at `shunt-rack`.

**Metadata:** Concept: 30 - full test; Keystone: K7,K10,K11,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the current-shunt rack, in Mast Base.

**Stop reason - exact player copy:** The incoming field passes the frozen criterion, allowing the full reroute test to proceed.

**Question card story setup - exact player copy:** The GO board passes the incoming field. Fire one full shot, keep 8 mm gap and reroute fixed, measure current, rise time, conduit current, and independent trailer voltage, then earth the bank.

**Question card story-science connection - exact player copy:** The full-shot measurements determine whether the main conduit and trailer route meet the precommitted limits.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Lock 180 V. OPERATE: Fire one full shot with 8 mm gap and reroute fixed. MEASURE: Record field, current, rise time, conduit current, and trailer voltage. INTERPRET: Earth the bank and submit the all-threshold verdict.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{submit:{quantity:"trailer voltage",unit:"V",truth:180,tolerance:10}},equipment_locked_until_prediction_commit:true,operation:{action:"fire one full shot",settings:{gap:8,unit:"mm"},fixed:["reroute"]},measurements:{current:30,unit_current:"kA",rise_time:100,unit_rise:"ns",conduit_current:0.4,unit_conduit:"kA",trailer_voltage:188,unit_voltage:"V"},restore:{required:true,action:"earth the bank",remeasure:false},correct_conclusion:"all thresholds pass",answerText:"All full-shot readings meet their written limits; earth the bank and record PASS."}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Fire the Full Shot", unit: "units printed on the card"}
  predictionRange: {min: 94.0, max: 282.0, step: 18.8}
  measurement: {label: "independent measured value", truth: 188.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`Main reroute passes: 188 V, 0.40 kA conduit, thresholds met.`"
```

**Correct result:** `Main reroute passes: 188 V, 0.40 kA conduit, thresholds met.`

**Answer text:** The completed check shows main reroute passes: 188 V, 0.40 kA conduit, thresholds met.

**Why:** one controlled shot tests the full causal chain.

**Wrong-path feedback:** `Follow all four phases and earth the bank before submitting the conclusion.`

**State/output:** Record the result and unlock the next named stop.

## Stop 56 - Probe the Rack

**Format/placement:** PROBE, at `probe-rack`.

**Metadata:** Concept: 26 - spatial coupling; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the probe rack, in Remote Outstation.

**Stop reason - exact player copy:** A passing main trailer probe cannot exclude a dangerous local peak elsewhere in the card rack.

**Question card story setup - exact player copy:** Because the main trailer probe reads 188 V, sample all six card positions before declaring victory. Identify where the spatial pattern breaks the 250 V limit and submit the failed location.

**Question card story-science connection - exact player copy:** The six-position voltage survey determines whether any individual card still exceeds the accepted exposure limit.

**Question card prompt - exact player copy:** Probe all six card positions, record each peak in volts, identify the location exceeding the inclusive 250 V limit, and submit location, value, and mechanism.

**Complete format-specific interaction block:** `probe={comparison:"observed peak must be within station-specific expected interval and at or below the inclusive 250 V load limit",stations:[{id:A,reading:188,expected:190,tolerance:15,load:250,comparison:"within expected; load passes"},{id:B,reading:190,expected:188,tolerance:15,load:250,comparison:"within expected; load passes"},{id:C,reading:185,expected:187,tolerance:15,load:250,comparison:"within expected; load passes"},{id:D,reading:192,expected:191,tolerance:15,load:250,comparison:"within expected; load passes"},{id:E,reading:310,expected:189,tolerance:15,load:250,comparison:"121 V above expected and 60 V above load; fails"},{id:F,reading:187,expected:190,tolerance:15,load:250,comparison:"within expected; load passes"}],correct_station:E,correct_conclusion:"rack-local loop"}`.

**Correct result:** `Card E fails at 310 V; local loop remains.`

**Answer text:** The completed check shows card E fails at 310 V; local loop remains.

**Why:** local loop area can preserve a hazard after the main cable reroute succeeds.

**Wrong-path feedback:** `Probe every station; the main probe cannot certify an unsampled rack.`

**State/output:** report piece14 then visible card E red text/icon.

## Mission outcome

Mission decision: The station reproduced, and removed the main cable failure, but it has not removed every hazard. The reroute holds the main probe to 188 V, while card E reaches 310 V because its rack wiring forms a smaller hidden loop. One repair remains before the report can be signed. Metric target 27:00.

**Segue - exact player copy:** But Ortiz's last storm is nearly here; Owen must close the small loop before the final certificate can pass.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Owen Park bags card E beneath a RACK LOOP: REPAIR REQUIRED label. But Ortiz's last storm is nearly here; Owen must close the small loop before the final certificate can pass.

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

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains poynting vector?

**Options - exact player copy:**

- A. One precommitted rule protects against choosing whichever successful measure looks best.
- B. E×B shows energy moving upward rather than along either field alone.
- C. One controlled shot tests the full causal chain.
- D. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for poynting vector. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes integrated rules. It does not answer the question about poynting vector.
- B: This describes poynting. It does not answer the question about poynting vector.
- C: This describes full test. It does not answer the question about poynting vector.
- D: Correct. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.

### Review question 2


**Prompt - exact player copy:** Which statement best explains integrated rules?

**Options - exact player copy:**

- A. One precommitted rule protects against choosing whichever successful measure looks best.
- B. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.
- C. E×B shows energy moving upward rather than along either field alone.
- D. One controlled shot tests the full causal chain.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for integrated rules. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. One precommitted rule protects against choosing whichever successful measure looks best.
- B: This describes poynting vector. It does not answer the question about integrated rules.
- C: This describes poynting. It does not answer the question about integrated rules.
- D: This describes full test. It does not answer the question about integrated rules.

### Review question 3


**Prompt - exact player copy:** An electric field points east and a magnetic field points north. In a right-handed east-north-up coordinate system, which way does electromagnetic energy flow according to E×B?

**Options - exact player copy:**

- A. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.
- B. Upward.
- C. One precommitted rule protects against choosing whichever successful measure looks best.
- D. One controlled shot tests the full causal chain.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for poynting. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes poynting vector. It does not answer the question about poynting.
- B: Correct. Upward.
- C: This describes integrated rules. It does not answer the question about poynting.
- D: This describes full test. It does not answer the question about poynting.

### Review question 4


**Prompt - exact player copy:** Separate subsystem tests pass, but coupling between subsystems remains untested. Why conduct an integrated controlled test?

**Options - exact player copy:**

- A. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.
- B. One precommitted rule protects against choosing whichever successful measure looks best.
- C. It tests whether the complete causal chain behaves as predicted when the subsystems operate together.
- D. E×B shows energy moving upward rather than along either field alone.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for full test. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes poynting vector. It does not answer the question about full test.
- B: This describes integrated rules. It does not answer the question about full test.
- C: Correct. It tests whether the complete causal chain behaves as predicted when the subsystems operate together.
- D: This describes poynting. It does not answer the question about full test.

### Review question 5


**Prompt - exact player copy:** Rerouting a long cable removes one voltage spike, but a small loop on a nearby board still shows a spike. What could explain the remaining signal?

**Options - exact player copy:**

- A. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.
- B. One precommitted rule protects against choosing whichever successful measure looks best.
- C. E×B shows energy moving upward rather than along either field alone.
- D. Changing magnetic flux through the local loop can induce voltage even after the long cable path is repaired.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for spatial coupling. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes poynting vector. It does not answer the question about spatial coupling.
- B: This describes integrated rules. It does not answer the question about spatial coupling.
- C: This describes poynting. It does not answer the question about spatial coupling.
- D: Correct. Changing magnetic flux through the local loop can induce voltage even after the long cable path is repaired.

### Review question 6


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B. Electromagnetic energy flow per area and direction. Maxwell's equations: four relations linking charge, fields, and changing flux.
- C. One precommitted rule protects against choosing whichever successful measure looks best.
- D. E×B shows energy moving upward rather than along either field alone.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- B: This describes poynting vector. It does not answer the question about electric charge.
- C: This describes integrated rules. It does not answer the question about electric charge.
- D: This describes poynting. It does not answer the question about electric charge.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- Maxwell synthesis, Poynting, precommitment, spatial probing.
- ## Four graded stops
- **Mission takeaway:** The station reproduced.

---

# Mission 15 - Sign the Ground Truth

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 15 - 1 DAY UNTIL THE LAST STORM WINDOW CLOSES.
**Card title:** Sign the Ground Truth  
**Card body:** 1 day until the last storm window closes. The repaired card rack waits beside the blank last report page. Today you decide whether the complete station earns its certificate.
**Objective:** Repair the local loop, execute the final rule, and sign or reject certification.  
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
  - id: groundtruth_m15_we01
    title: Stored electric energy
    problem: A capacitor has C=2 μF and V=10 V. Find stored energy.
    rule: U=CV²/2.
    steps:
    - 'Set up the relationship: U=CV²/2.'
    - U=(2×10^-6)(10²)/2=10^-4 J.
    answer: Stored energy is 0.0001 J.
    common_mistake: Do not forget the one-half factor.
  - id: groundtruth_m15_we02
    title: A missing branch current
    problem: A node receives 8 mA and sends 3 mA through one branch. Find the other outgoing current in steady state.
    rule: Charge conservation requires total incoming current equal total outgoing current.
    steps:
    - 'Set up the relationship: Charge conservation requires total incoming current equal total outgoing current.'
    - 8=3+I, so I=5 mA outward.
    answer: The missing outgoing current is 5 mA.
    common_mistake: Do not add incoming and outgoing magnitudes as if they point the same way.
  - id: groundtruth_m15_we03
    title: Induced voltage
    problem: Magnetic flux through a one-turn loop changes from 0.1 to 0.5 Wb in 0.2 s. Find the average induced emf with the stated positive flux direction.
    rule: Average emf ε=-ΔΦ/Δt.
    steps:
    - 'Set up the relationship: Average emf ε=-ΔΦ/Δt.'
    - ε=-(0.5-0.1)/0.2=-2 V.
    answer: The signed induced emf is -2 V for that flux orientation.
    common_mistake: The minus sign expresses opposition to the change in flux, not always to the original field.
  - id: groundtruth_m15_we04
    title: An RC time constant
    problem: A resistor R=1000 Ω charges a capacitor C=0.001 F. Find the time constant.
    rule: For this resistor-capacitor circuit, τ=RC.
    steps:
    - 'Set up the relationship: For this resistor-capacitor circuit, τ=RC.'
    - τ=1000(0.001)=1 s.
    answer: The time constant is 1 second.
    common_mistake: A time constant is not the time for mathematically complete charging.
  - id: groundtruth_m15_we05
    title: Electromagnetic energy flow
    problem: Perpendicular fields have E=6 V/m and B=2 μT. Use μ0=4π×10^-7 T m/A. Find energy-flow magnitude.
    rule: S=EB/μ0 when E and B are perpendicular.
    steps:
    - 'Set up the relationship: S=EB/μ0 when E and B are perpendicular.'
    - S=(6)(2×10^-6)/(4π×10^-7)=30/π≈9.55 W/m².
    answer: Energy-flow magnitude is about 9.55 W/m², directed along E×B.
    common_mistake: Poynting flux is power per area, not energy per volume.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

No new terms; use the mission log glossary.  
#### Primer concepts

- Use the complete causal chain; preserve precommitted limits; no single quiet reading overrides failed independent evidence.

#### Equations first needed today
No new equation is introduced; retrieve the field, capacitance, circuit, magnetic-force, induction, transient, and energy-flow equations already recorded.

## Main story happening - designer summary
SHOT plan approval→BANK dry-source check→COUPLE physical repair/final read. Three locations; each move required by authority, source, and affected load. All characters contribute one constraint.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Remote Outstation | `repair-board` | automatic**

**Trigger:** mission_15_arrival.

**World state:** The repaired card rack waits beside the blank last report page.

**Panel/HUD text:** Dr. Lena Ortiz, station director: “Fund the cause, the witness, and the recovery.”

**Dialogue bubbles -** Lena Ortiz: "Fund the cause, the witness, and the recovery."

**Unlocks/waypoint:** Unlock Stop 57 at `repair-board` in Remote Outstation.

**Beat 2 - After Stop 57 | `bank-stages` | automatic**

**Trigger:** accepted_stop_57.

**World state:** At `repair-board`, the dated accepted-result slip for Stop 57 reads: "Fund twist, isolation, timing, and protected inspection. Causal chain costs 90 points.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The repair plan is funded, but each final claim still needs the correct physical relationship behind it."

**Unlocks/waypoint:** Unlock Stop 58 at `bank-stages` in Impulse Hall.

**Beat 3 - After Stop 58 | `cable-bay` | automatic**

**Trigger:** accepted_stop_58.

**World state:** At `bank-stages`, the dated accepted-result slip for Stop 58 reads: "All twelve law mappings are correct. Each equation has a defined physical job.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The proposed loop reduction needs a reversible test before the crew fastens the repair permanently."

**Unlocks/waypoint:** Unlock Stop 59 at `cable-bay` in Remote Outstation.

**Beat 4 - After Stop 59 | `repair-board` | automatic**

**Trigger:** accepted_stop_59.

**World state:** At `cable-bay`, the dated accepted-result slip for Stop 59 reads: "Twisting causes 310→72 V; reversal gives 305 V; final repair gives 74 V.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Dr. Lena Ortiz: "That check holds. The repaired card's final reading is available, but station-wide certification still requires every safeguard to agree."

**Unlocks/waypoint:** Unlock Stop 60 at `repair-board` in Remote Outstation.

**Beat 5 - At mission end | `repair-board` | automatic**

**Trigger:** accepted_stop_60.

**World state:** At `record-desk`, Dr. Lena Ortiz clips the witnessed final-shot record into the season report. The final scene follows the completion gate below.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Dr. Lena Ortiz: "You found the path we missed, then proved it was gone. Therefore Noor leaves the fast recorders running for the next crew; the report closes with the limits still posted."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — groundtruth-m15

**Home:** `record-desk`. **Before:** The dated mission-15 evidence holder at this fixture has no accepted record. The repaired card rack waits beside the blank last report page.
**After — exact action:** Dr. Lena Ortiz clips the witnessed final-shot record into the season report.
**Trigger:** accepted_stop_60; final scene requires the completion gate in section 8.1. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `record-desk`, the signed operating conditions remain beside the final status.
**Segue - exact player copy:** Therefore Noor leaves the fast recorders running for the next crew; the report closes with the limits still posted.

## Location plan

SHOT→BANK→COUPLE, following authority, source, and final load. 

## Characters and dramatic beat

Ortiz supplies stop rule, Strand timing, Tate path, Ravi field, Noor independence; the player alone integrates all. 

## Key concepts, explained here

 complete dependency graph and evidence standard.  

## Four graded stops
## Stop 57 - Fund the Final Repair

**Format/placement:** SCIENCETANK, asked by Dr. Lena Ortiz beside `repair-board`.

**Metadata:** Concept: 30 - causal repair portfolio; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: RETRIEVE L5.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the repair board in Remote Outstation.

**Stop reason - exact player copy:** The rack survey reveals a local failure that the remaining repair effort must target.

**Question card story setup - exact player copy:** Ortiz has 100 effort points and four hours. Fund a plan that reduces card-E loop area, preserves isolated recording, verifies bank timing, and keeps a protected inspection reserve.

**Question card story-science connection - exact player copy:** The allocation determines whether loop reduction, independent recording, timing checks, and inspection all remain funded.

**Question card prompt - exact player copy:** Allocate the 100 effort points across the five proposals, preserve the protected inspection reserve, and submit answers to all three causal-plan checks.

**Complete format-specific interaction block:** proposals `[twist_pair 35 required,isolated_channel20 required,gap_timing15 required,inspection20 protected,repaint10]`; recommended first four=90; evidence constraints. Prompt allocate 100 and answer three decision checks. State waypoint BANK.

**Correct result:** `Fund twist, isolation, timing, and protected inspection.` Causal chain costs 90 points.

**Answer text:** The completed check shows fund twist, isolation, timing, and protected inspection. Causal chain costs 90 points.

**Why:** the final plan must cover source, path, measurement, and recovery.

**Wrong-path feedback:** `Do not spend protected inspection capacity on cosmetic work.`

**State/output:** Record the result and unlock the next named stop.

## Stop 58 - Map the Final Laws

**Format/placement:** PROTOCOL, at `bank-stages`.

**Metadata:** Concept: 30 - full-course tool selection; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: COMBINE L4.

**Call - exact player copy:** Go to the Marx bank stages, in Impulse Hall.

**Stop reason - exact player copy:** The repair plan is funded, but each final claim still needs the correct physical relationship behind it.

**Question card story setup - exact player copy:** The funded plan is locked. Match each final observation to the equation family that can actually determine it, including static, circuit, magnetic, induction, transient, and energy-flow cases.

**Question card story-science connection - exact player copy:** The law mappings identify which observations can support each part of the station's final electrical certification.

**Question card prompt - exact player copy:** Match all twelve final observations to the governing equation family, then submit the complete mapping; every row is required.

**Complete format-specific interaction block:** `scenarios=[off_axis_point_charge_field,point_charge_energy,uniform_sphere_inside_outside,surface_field,series_capacitors,temperature_changed_resistor,multiloop_currents,loop_center_field,toroid_field,rotating_loop_emf,changing_capacitor_gap_field,energy_flow_direction]`; `choices=[Coulomb_vector_sum_and_dq_integral,V_scalar_sum_and_Uq,Gauss_concentric,Eout_sigma_over_epsilon0,reciprocal_C_series,R=R0(1+alphaDeltaT),Kirchhoff_simultaneous,BiotSavart_loop_or_Ampere,Ampere_toroid,epsilon=NABomegaSinOmegaT,AmpereMaxwell_displacement_current,Poynting_ExB]`; one-to-one keyed mapping in listed order.

**Correct result:** `All twelve law mappings are correct.` Each equation has a defined physical job.

**Answer text:** The completed check shows all twelve law mappings are correct. Each equation has a defined physical job.

**Why:** selecting the governing law prevents one successful equation from being used outside its domain.

**Wrong-path feedback:** `Match by source and requested quantity, not by whichever formula contains a familiar symbol.`

**State/output:** Record the result and unlock the next named stop.

## Stop 59 - Reverse the Loop Geometry

**Format/placement:** CONTROL, at `cable-bay`.

**Metadata:** Concept: 24 - loop-area causality; Keystone: K10,K12; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5.

**Call - exact player copy:** Go to the cable bay, in Remote Outstation.

**Stop reason - exact player copy:** The proposed loop reduction needs a reversible test before the crew fastens the repair permanently.

**Question card story setup - exact player copy:** Measure induced peak in all three states before permanent fastening.

**Question card story-science connection - exact player copy:** The before-and-after pulse peaks test whether loop geometry causes the card's remaining overvoltage.

**Question card prompt - exact player copy:** Change only pair twisting while source, gain, resistance, and sampling stay fixed; measure original, twisted, and restored peaks; restore once, fasten permanently, remeasure, and submit the causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"twist_pair",label:"twist the signal pair"},{id:"lower_gain",label:"lower receiver gain"},{id:"add_resistor",label:"add series resistance"}],correct_control:"twist_pair",baseline:{peak:310,unit:"V"},response:{peak:72,unit:"V"},noise_band:{value:8,unit:"V"},fixed:["source","gain","resistance","sampling"],restore:{required:true,peak:305,unit:"V",remeasure:true},final_setting:{twist_pair:"fastened",peak:74,unit:"V"},correct_conclusion:"loop area caused the pickup",answerText:"Twisting the pair collapses the induced peak, restoration brings it back, and refastening makes the repair permanent."}`

**Correct result:** `Twisting causes 310→72 V; reversal gives 305 V; final repair gives 74 V.`

**Answer text:** The completed check shows twisting causes 310→72 V; reversal gives 305 V; final repair gives 74 V.

**Why:** reduced loop area should lower flux and voltage, with reversal restoring the old peak.

**Wrong-path feedback:** `A low value without reversal is correlation; untwist once before permanent fastening.`

**State/output:** Record the result and unlock the next named stop.

## Stop 60 - Certify Station 12

**Format/placement:** ATTEST, asked by Dr. Lena Ortiz beside `repair-board`.

**Metadata:** Concept: 30 - final certification; Keystone: all K; Area: Remote Outstation; Learning role: PRACTICE; Difficulty: L3; Story role: TRANSFER L5 payoff.

**Call - exact player copy:** Talk to Dr. Lena Ortiz, at the repair board in Remote Outstation.

**Stop reason - exact player copy:** The repaired card's final reading is available, but station-wide certification still requires every safeguard to agree.

**Question card story setup - exact player copy:** The repaired card measures 74 V on the final shot. Verify crew-clear field, conduit current, all trailer peaks, channel independence, bank timing, and post-shot inspection, then submit one certification verdict.

**Question card story-science connection - exact player copy:** The complete verification record determines whether Station 12 can be certified with no unresolved exposure or inspection condition.

**Question card prompt - exact player copy:** Use at most six checks to verify every critical threshold, identity, timing, independence, and inspection claim; submit CERTIFY or REJECT as one final verdict.

**Complete format-specific interaction block:** `attest:{verification_limit:6,claims:[{id:"field",label:"crew-clear field 4.7 kV/m",signed:true,backed:true,critical:true},{id:"conduit",label:"conduit current 0.3 kA",signed:true,backed:true,critical:true},{id:"trailers",label:"maximum trailer peak 190 V",signed:true,backed:true,critical:true},{id:"independence",label:"channel spread 0.2",signed:true,backed:true,critical:true},{id:"timing",label:"bank timing 100 ns",signed:true,backed:true,critical:true},{id:"inspection",label:"post-shot inspection passed",signed:true,backed:true,critical:true},{id:"draft_note",label:"unsigned draft summary",signed:false,backed:false,critical:false}],correct_verified:["field","conduit","trailers","independence","timing","inspection"],answerText:"All six critical signed records pass, so certify Station 12; the unsigned draft is not evidence."}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Certify Station 12", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** `CERTIFY.` Every threshold, identity, timing, independence, and inspection claim is backed.

**Answer text:** The completed check shows cERTIFY. Every threshold, identity, timing, independence, and inspection claim is backed.

**Why:** the signed report is warranted only if every physical limit and evidence condition passes.

**Wrong-path feedback:** `One missing critical record blocks certification even if every visible number is green.`

**State/output:** Record the result and unlock the next named stop.

## Mission outcome

Mission decision: Whether the complete station earns its certificate. Apply the existing final evidence and metric gates before the world payoff below.

Thunder reaches the gallery after the flash. The final shot trace stays inside the posted limits. Ortiz clips the last page into the report, with the old burned-card photo beside it. The next crew has a tested station and a record of what once went wrong.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Thunder reaches the gallery after the flash. The final shot trace stays inside the posted limits. Ortiz clips the last page into the report, with the old burned-card photo beside it. The next crew has a tested station and a record of what once went wrong.

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 28:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The accepted stock count converts the final storm window into certified reserve.

**Automatic bar change:** SHOT RESERVE +5

**Recovery Point line template:** RECOVERY POINTS = clamp(4, 12, 11 + {time_modifier} - {incorrect_submissions}) = {awarded_rp}

**Allocation prompt:** Spend each Recovery Point to raise one unlocked bar by 1%, or place it in the Recovery Bank (30-point cap).

**Canonical QA result:** 100/100/100/100; BANK 12

**Lock result:** LOCK ALL FOUR BARS - STATION CERTIFIED.

**Failure check:** If any bar is at 0% after the automatic change, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains causal repair portfolio?

**Options - exact player copy:**

- A. Selecting the governing law prevents one successful equation from being used outside its domain.
- B. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- C. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.
- D. The signed report is warranted only if every physical limit and evidence condition passes.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal repair portfolio. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes full-course tool selection. It does not answer the question about causal repair portfolio.
- B: Correct. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- C: This describes loop-area causality. It does not answer the question about causal repair portfolio.
- D: This describes final certification. It does not answer the question about causal repair portfolio.

### Review question 2


**Prompt - exact player copy:** Which statement best explains full-course tool selection?

**Options - exact player copy:**

- A. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- B. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.
- C. Selecting the governing law prevents one successful equation from being used outside its domain.
- D. The signed report is warranted only if every physical limit and evidence condition passes.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for full-course tool selection. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes causal repair portfolio. It does not answer the question about full-course tool selection.
- B: This describes loop-area causality. It does not answer the question about full-course tool selection.
- C: Correct. Selecting the governing law prevents one successful equation from being used outside its domain.
- D: This describes final certification. It does not answer the question about full-course tool selection.

### Review question 3


**Prompt - exact player copy:** Which statement best explains loop-area causality?

**Options - exact player copy:**

- A. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- B. Selecting the governing law prevents one successful equation from being used outside its domain.
- C. The signed report is warranted only if every physical limit and evidence condition passes.
- D. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for loop-area causality. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes causal repair portfolio. It does not answer the question about loop-area causality.
- B: This describes full-course tool selection. It does not answer the question about loop-area causality.
- C: This describes final certification. It does not answer the question about loop-area causality.
- D: Correct. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.

### Review question 4


**Prompt - exact player copy:** Which statement best explains final certification?

**Options - exact player copy:**

- A. The signed report is warranted only if every physical limit and evidence condition passes.
- B. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- C. Selecting the governing law prevents one successful equation from being used outside its domain.
- D. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for final certification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The signed report is warranted only if every physical limit and evidence condition passes.
- B: This describes causal repair portfolio. It does not answer the question about final certification.
- C: This describes full-course tool selection. It does not answer the question about final certification.
- D: This describes loop-area causality. It does not answer the question about final certification.

### Review question 5


**Prompt - exact player copy:** Which statement best explains electric charge?

**Options - exact player copy:**

- A. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- B. A property of matter that creates electric force; like signs repel and unlike signs attract.
- C. Selecting the governing law prevents one successful equation from being used outside its domain.
- D. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for electric charge. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes causal repair portfolio. It does not answer the question about electric charge.
- B: Correct. A property of matter that creates electric force; like signs repel and unlike signs attract.
- C: This describes full-course tool selection. It does not answer the question about electric charge.
- D: This describes loop-area causality. It does not answer the question about electric charge.

### Review question 6


**Prompt - exact player copy:** Which statement best explains field direction and sign?

**Options - exact player copy:**

- A. A repair portfolio should cover the source of a fault, its transmission path, measurement, and recovery.
- B. Selecting the governing law prevents one successful equation from being used outside its domain.
- C. A sign convention changes labels, not the actual direction of the field.
- D. Reduced loop area should lower flux and voltage, with reversal restoring the initial peak.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for field direction and sign. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes causal repair portfolio. It does not answer the question about field direction and sign.
- B: This describes full-course tool selection. It does not answer the question about field direction and sign.
- C: Correct. A sign convention changes labels, not the actual direction of the field.
- D: This describes loop-area causality. It does not answer the question about field direction and sign.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

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
- M7 marks pieces 1–3 `SHARED REFERENCE - NOT INDEPENDENT` without deleting their physical calculations.
- M11 illuminates the conduit current path and locks the unsafe bond out of service.
- M14 displays a main-path PASS before card E changes to `310 V - LIMIT 250 V`; the apparent victory is necessary for Twist 3.
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

## DERIVE ledger - exactly 20/60

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


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `BANK` roster owner: Dr. Lena Ortiz.
- `COUPLE` roster owner: Dr. Lena Ortiz.
- `EARTH` roster owner: Dr. Lena Ortiz.
- `SCREEN` roster owner: Dr. Lena Ortiz.
- `SHOT` roster owner: Dr. Lena Ortiz.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
