# WHITEOUT

## AP Computer Science A Campaign Implementation Bible

**Version:** 2.11 — Handback 4 final instrument repair + code-display preservation  
**Campaign length:** 15 missions, 60 graded stops  
**Setting:** Aster Station, Antarctica, during polar night  
**Primary subject:** AP Computer Science A (Java)

> **Course-source note.** The supplied cheat sheet is explicitly an **AP Computer Science Principles** sheet, not AP Computer Science A. To avoid silently treating CSP as CSA, WHITEOUT v2 defines its own numbered AP-CSA-oriented Java spine (concepts 1–34) and separately carries the supplied sheet's useful cross-course material on testing, data quality, networks, and impacts (35–38). This campaign spine is the authoritative numbering used by every stop in this bible.

## 0. Readiness boundary

This bible is authored to the supplied Master Campaign Brief, `QUESTION_TYPES.md`, and Giant Campaign Gate Check. It contains concrete stop-specific boards rather than payload placeholders. **Importer/schema acceptance and runtime play remain NOT TESTED** because `engine/content/normalize.js`, the importer/schema, validators, and a playable repository were not supplied; `QUESTION_TYPES.md` itself says those code sources are authoritative over the markdown description.

**Handback 1 resolution:** the twelve standard VERIFY stops identified by the build handback now use `predictionRange`, one numeric `truth`, and a costed `measurement` instead of a `readings` table. The Stop 11 CHOICE has one unambiguous key, the two equation-symbol lines use parser-safe symbol glosses, Mission 1's closing card is simplified, and Mission 15 explicitly opens the Runway Door and lands the rescue aircraft in the playable world.

**Handback 2 resolution:** all twelve DERIVE boards now declare a concrete `start` state and a non-answer-revealing `goal`; all 27 wrong DERIVE candidates carry their own mechanism-specific `why`; all three TRACE boards declare explicit `resources`, a `target` that resolves to one resource ID, at least two channels that depend on the target, and at least one independent channel; and all three PROBE boards declare a `target` that resolves to one of their own station IDs. Each mission card also carries an optional `WORKED EXAMPLES (5)` button opening five generic, ungraded examples of that mission's equations, numbers, or programming concepts.

**Handback 3 resolution:** VALUE options now carry distinct evidence axes and numeric costs; ATTEST has an explicit numeric `checks` budget; both CASEBOOK boards use complete one-to-one clue mappings; TRACE channels carry build-recognized shared-dependency flags as well as explicit resource dependencies; the M14 STRESS board gives every criterion a score `key` and names a robust candidate that exists; the final VERIFY has a reachable numeric truth with a real fail region; and the Mission 15 outcome is split below the reading ceiling. The visible Runway Door / aircraft ending remains unchanged.

**Handback 4 resolution:** ATTEST now crosses critical/backed status so the player must spend checks rather than tick every critical claim; BALLPARK uses a numeric tile bank, valid tile indexes, slot-letter formula, units, and `correctResult`; the Mission 12 VALUE board has explicit axes and reveals; Mission 14 Stop 53 is retyped from HOLDOUT to VERIFY because its content is a commit-then-reveal test rather than a tuning curve; Mission 14 STRESS uses `feasible` thresholds and a criterion-key `optimiseOn`; all DIAGNOSIS readings now carry status and each wrong diagnosis has its own rebuttal; the keyed M2 diagnosis label is no longer uniquely longest; the M14 RESIDUAL tabs have labels and a subject-specific hint; and source-code display plus the visible runway ending are explicitly preserved.

---
## Build decisions requested by the handbacks

- **Runway Door / aircraft ending: YES.** The Runway Door visibly opens in Mission 15 only after the canary gate and all four campaign bars pass. Runway lights switch on, the rescue aircraft lands and taxis into view, and the player walks through the open door before the final metric screen unlocks.
- **Java source display: KEEP IT.** Losing source display was never intended. Stop 1's `code:` block is canonical player-facing material, and DERIVE `start` lines are also source shown on the derivation rail. Any future stop whose prompt asks the player to read or trace source must carry the exact source in the interaction payload; revisions must not strip it.

# 1. Campaign premise and opening

Aster Station houses 28 people through Antarctic polar night. A whiteout has closed the runway, iced the primary communications mast, and left one possible rescue window about 36 hours away. Heat, habitat, rover, and communications systems then begin reporting contradictory failures after a routine software update. The player's job is to understand the Java control software well enough to distinguish physical danger from software-generated symptoms, repair only what the evidence justifies, and keep a reversible rescue path alive.

The story begins with apparently unrelated hardware failures. The first major reversal proves several alarms are produced by arithmetic, branching, and loop logic rather than damaged equipment. The second shows that object references, shared class state, indexing, and collection code connect systems the crew believed were independent. Mission 14 creates an apparent victory, then a holdout test resurrects the exact alternating-skip ArrayList signature planted in Mission 8. The finale succeeds only through a staged canary release, not a full restart.

## Opening card — exact player copy

You are at Aster Station in Antarctica, where a whiteout has cut off 28 people and left one rescue window about 36 hours away. Your AP Computer Science A skills are needed because Java software controls heat, air, vehicles, and communications. If those systems fail together, the station may become unsafe before aircraft can arrive. Station director Elena Park puts you in charge of proving what the code does before anyone changes a live system. “Do not trust a green light or a red light until you can explain why it is there.”

### Opening implementation state

The opening card appears over the normal playable spawn in the Operations Module, with all five sentences visible together and one Continue action. On Continue, the four campaign bars appear, the Mission 1 briefing activates, and normal first-person control returns immediately. WHITEOUT authors no pre-day sightseeing, greeting, or race warm-up; movement is learned inside Mission 1 while the player is already solving the heat alarm.

---
# 2. Campaign metrics, timer, and recovery economy

| Bar | Start | Player-facing meaning | Zero state | Lock condition |
|---|---:|---|---|---|

| Habitat Stability | 72% | Verified margin in air, heat, and occupied-room conditions. | Life-support margin is exhausted; restore the mission-start snapshot. | Locks at 100% only after the Mission 15 canary and staged-release gate passes. |

| Power Reserve | 68% | Electrical and thermal margin above protected station loads. | Protected heat/power margin is exhausted; restore the mission-start snapshot. | Locks at 100% only after the Mission 15 canary and staged-release gate passes. |

| Control Reliability | 56% | Share of control behavior that is verified rather than merely running. | The station no longer has a trusted control path; restore the mission-start snapshot. | Locks at 100% only after the Mission 15 canary and staged-release gate passes. |

| Rescue Readiness | 48% | Readiness of communications, vehicles, route, and aircraft coordination. | No viable rescue/command path remains; restore the mission-start snapshot. | Locks at 100% only after the Mission 15 canary and staged-release gate passes. |


**Bounds:** every bar is clamped to 0–100%. **Victory:** all four bars at 100% plus the final canary gate. **Recovery Points:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`; one point raises one unlocked bar by one percentage point, and the bank cap is 30. A committed wrong answer costs one point; exploratory interaction before Commit does not.


**Timer:** every mission starts its visible timer when the arrival beat closes and Stop 1 unlocks. Required dialogue, loading, accessibility menus, app backgrounding, and system interruptions pause it.


## 2.0 Metric behavior and decision relevance

| Bar | Rises when | Falls when | How it changes decisions |
|---|---|---|---|
| Habitat Stability | A life-support reading or controller path is independently verified and safe occupancy can be preserved. | A named air, heat, or room-control event removes verified life-support margin. | Low margin makes conservative habitat actions mandatory; 0% restores the mission-start snapshot. |
| Power Reserve | A verified repair preserves protected electrical or thermal load, or Recovery Points are allocated here. | A named test, storm load, field deployment, or repair consumes power or heat reserve. | Low reserve blocks discretionary tests and field actions that would threaten protected heat loads. |
| Control Reliability | A controller behavior, algorithm, rollback path, or cross-system assumption survives a test that could have failed. | New evidence invalidates behavior that had been trusted but not adequately tested. | Low reliability keeps wider deployment locked and forces isolated or canary operation. |
| Rescue Readiness | A communications path, rover route, message, or aircraft requirement is verified. | Weather, route, vehicle, or link evidence removes a rescue option. | Low readiness blocks travel or rescue commitments that lack a viable route or command path. |

A bar reaching 100% remains vulnerable until its Mission 15 lock condition is earned. The **final campaign action** is the Runway Door/rescue-complete state, not the canary test itself: the canary may be run below 100%, but the Runway Door and victory state remain locked until all four bars are 100% and the five canary predictions have matched.

## 2.1 Automatic delta and canonical non-perfect recovery path

The reference path deliberately assumes only **4 RP per mission**, the formula minimum, and still reaches 100/100/100/100 at Mission 15.

| M | Story event | Auto H/P/C/R | 4-RP allocation H/P/C/R | Bars after allocation | Bank |
|---:|---|---|---|---|---:|

| 1 | The false heat shutdown is prevented, restoring control confidence while keeping the healthy generator online. | +1/+4/+6/+0 | 0/0/0/4 | 73/72/62/52 | 0 |

| 2 | The scrubber remains stable, but two controlled branch tests consume a small amount of power. | +5/-1/+5/+0 | 0/0/0/4 | 78/71/67/56 | 0 |

| 3 | Rover Three is recovered for field work, while repeated indoor simulations consume a little power. | +0/-2/+4/+5 | 0/0/0/4 | 78/69/71/65 | 0 |

| 4 | The shared utility is localized and the station stops patching live systems by guesswork. | +0/+0/+8/+2 | 0/1/0/3 | 78/70/79/70 | 0 |

| 5 | P02 is patched through the correct live reference and the power controller returns to verified service. | +0/+4/+6/+0 | 0/0/0/4 | 78/74/85/74 | 0 |

| 6 | The timestamp parser is repaired and the rescue link remains available. | +0/+0/+4/+6 | 0/4/0/0 | 78/78/89/80 | 0 |

| 7 | Room 7 stays occupied after the array mapping is corrected, while one extra software-mirror test consumes power. | +6/-1/+5/+0 | 0/4/0/0 | 84/81/94/80 | 0 |

| 8 | The full incident timeline is restored and the ArrayList regression case is preserved. | +0/+0/+7/+2 | 0/3/0/1 | 84/84/100/83 | 0 |

| 9 | Rover Three receives the corrected hazard map, but map rebuild and route simulation consume battery reserve. | +0/-2/+5/+7 | 1/3/0/0 | 85/85/100/90 | 0 |

| 10 | Binary search locks the rescue frequency before the pass closes. | +0/+0/+3/+8 | 2/2/0/0 | 87/87/100/98 | 0 |

| 11 | Power and habitat controllers regain independent warning state. | +7/+5/+7/+0 | 1/3/0/0 | 95/95/100/98 | 0 |

| 12 | The aircraft acknowledges the ordered operational queue without receiving unnecessary PII. | +0/+0/+4/+7 | 2/2/0/0 | 97/97/100/100 | 0 |

| 13 | The rover relay comes online, but outside deployment consumes battery reserve. | +0/-2/+4/+8 | 1/3/0/0 | 98/98/100/100 | 0 |

| 14 | The holdout reversal revokes false confidence and proves the trusted rollback path is unsafe. | -5/-4/-10/-3 | 2/2/0/0 | 95/96/90/97 | 0 |

| 15 | The canary passes, staged release completes, and the rescue route becomes fully available. | +9/+8/+10/+10 | 0/0/0/0 | 100/100/100/100 | 4 |

---
# 3. Aster Station — areas and fixtures

## OPS — Operations Module

Station command, incident coordination, rescue decisions, and the wall-size systems map live here.

**Fixtures:** Incident Console · Systems Map · Rescue Board · Shift Log Desk · Emergency Radio · Incident Analysis Board

## CODE — Software Lab

The station's source mirror, test harnesses, build tools, and safe simulations live here.

**Fixtures:** Code Review Wall · Test Bench · Build Console · Version Rack · Sandbox Terminal

## POWER — Power & Thermal Plant

Generators, batteries, heat loops, and the controllers that keep the station warm live here.

**Fixtures:** Generator Controller · Battery Rack · Heat-Loop Panel · Load Board · Breaker Cabinet

## HAB — Habitat Control

Air handling, scrubbers, room sensors, water, and life-support automation live here.

**Fixtures:** Air Handler Panel · Scrubber Console · Sensor Wall · Alarm Cabinet · Habitat Analysis Board · Sensor Probe Rack

## VEH — Vehicle Bay

Rovers, drones, chargers, route maps, and the software that moves field machines live here.

**Fixtures:** Rover Diagnostic Cart · Drone Rack · Route Table · Charging Console · Parts Bench · Route Planning Board

## COMMS — Communications & Weather

Satellite links, packet routing, weather instruments, and rescue-window traffic live here.

**Fixtures:** Link Console · Packet Monitor · Weather Mast Console · Antenna Router · Message Queue Board


## Landmark-only spaces

- **Mess & Bunks:** The crew eats, sleeps, and argues here, but no graded stop is attached to it.

- **Medical Bay:** Human consequences of cold or poor air are visible here without turning the room into a quiz station.

- **Runway Door:** The door stays shut until final rescue readiness and the canary gate are satisfied.

- **External Mast Walk:** Outside travel becomes relevant only after evidence creates a reason to support the communications path.


No `s01-...` or stop-shaped fixture exists. Every stop placement below resolves to one declared reusable fixture or one canonical named person.

---
# 4. Canonical roster

### Dr. Elena Park

- **Display name:** Dr. Elena Park
- **Role:** Station director
- **First entrance:** Opening / Operations Module — halts ad-hoc live changes and gives the player authority to require evidence before action.
- **Pronouns:** she/her
- **Allowed short name:** Park
- **Area ownership:** OPS
- **Wants:** Keep 28 people alive and preserve the evacuation option.
- **Blind spot:** She initially favors the fastest reversible action when evidence is incomplete.
- **Scientific/technical domain:** incident command, risk integration, staged release criteria.
- **Decision function:** authorizes station-wide actions only after the player integrates evidence across subsystems.
- **Verbal habit:** “What can we safely decide now?”
- **Arc:** Moves from fast reversible action to requiring committed predictions and a staged canary release.
- **Gameplay necessity:** Removing Park removes the authority constraint that turns technical results into station-wide GO/NO-GO decisions.

### Malik Okafor

- **Display name:** Malik Okafor
- **Role:** Power and thermal engineer
- **First entrance:** Mission 1 / Power & Thermal Plant — keeps a loaded generator running while asking the player to explain the red alarm before shutdown.
- **Pronouns:** he/him
- **Allowed short name:** Okafor
- **Area ownership:** POWER
- **Wants:** Keep heat and power above survival limits.
- **Blind spot:** He initially trusts physical symptoms more than software traces.
- **Scientific/technical domain:** generator output, thermal reserve, controller limits, power-load evidence.
- **Decision function:** decides whether power hardware stays online and whether a controller patch is safe to accept.
- **Verbal habit:** “What changed before the load moved?”
- **Arc:** Learns to treat code traces as physical evidence when independent readings support them.
- **Gameplay necessity:** Removing Okafor removes the hardware-first constraint that makes software evidence earn operational trust.

### Priya Nair

- **Display name:** Priya Nair
- **Role:** Software architect
- **First entrance:** Mission 4 / Software Lab — builds an isolated test harness so captured failures can be reproduced without touching live controllers.
- **Pronouns:** she/her
- **Allowed short name:** Nair
- **Area ownership:** CODE
- **Wants:** Restore reliable control without creating a second hidden failure.
- **Blind spot:** She initially trusts clean interfaces more than old integration code deserves.
- **Scientific/technical domain:** Java control flow, objects, collections, test harnesses, rollback, code review.
- **Decision function:** controls what code can move from simulation into the live station.
- **Verbal habit:** “Which assumption does this method hide?”
- **Arc:** Moves from interface trust to adversarial testing across legacy boundaries.
- **Gameplay necessity:** Removing Nair removes the safe test environment and the viewpoint that turns bugs into testable software mechanisms.

### Jonah Reyes

- **Display name:** Jonah Reyes
- **Role:** Field robotics lead
- **First entrance:** Mission 3 / Vehicle Bay — holds Rover Three for diagnosis instead of replacing working wheels while its route repeats.
- **Pronouns:** he/him
- **Allowed short name:** Reyes
- **Area ownership:** VEH
- **Wants:** Keep autonomous vehicles available for rescue and external repairs.
- **Blind spot:** He initially treats intermittent behavior as damaged hardware.
- **Scientific/technical domain:** rover routes, vehicle state, hazard grids, field relay deployment.
- **Decision function:** authorizes rover movement only when code behavior and field geometry agree.
- **Verbal habit:** “Can you make it fail twice the same way?”
- **Arc:** Shifts from replacing hardware to demanding repeatable software failure before touching parts.
- **Gameplay necessity:** Removing Reyes removes the moving physical system that makes loops, grids, and recursion visible in the world.

### Liv Andersen

- **Display name:** Liv Andersen
- **Role:** Communications and weather lead
- **First entrance:** Mission 6 / Communications & Weather — keeps the satellite path open while comparing raw packet time with station displays.
- **Pronouns:** she/her
- **Allowed short name:** Andersen
- **Area ownership:** COMMS
- **Wants:** Hold a satellite path and identify a safe rescue window.
- **Blind spot:** She can overvalue a fast primary path unless independence is tested.
- **Scientific/technical domain:** packet paths, timestamps, search deadlines, network redundancy, weather-window timing.
- **Decision function:** decides which communications path and message can support rescue action.
- **Verbal habit:** “Which path still works if this one disappears?”
- **Arc:** Broadens redundancy from networking into whole-system release design.
- **Gameplay necessity:** Removing Andersen removes the deadline and independent-path constraints that make search and fault tolerance operational.

### Mei Alvarez

- **Display name:** Mei Alvarez
- **Role:** Habitat systems lead
- **First entrance:** Mission 2 / Habitat Control — keeps the scrubber online long enough to test why one sensor event produced two commands.
- **Pronouns:** she/her
- **Allowed short name:** Alvarez
- **Area ownership:** HAB
- **Wants:** Keep air and water stable while controllers are isolated.
- **Blind spot:** She initially trusts agreement among sensors without asking what they share upstream.
- **Scientific/technical domain:** scrubber logic, room sensors, habitat thresholds, independent environmental readings.
- **Decision function:** decides whether occupied spaces remain in service or require protective action.
- **Verbal habit:** “Do these instruments agree because reality agrees, or because they share code?”
- **Arc:** Learns that sensor agreement is not independence when software is shared upstream.
- **Gameplay necessity:** Removing Alvarez removes the human consequence of bad indexing and branching in life-support control.

---
# 5. Authoritative numbered concept spine

| # | Campaign concept | Source status |
|---:|---|---|

| 1 | Algorithms, sequencing, and program execution | WHITEOUT AP-CSA-oriented Java spine |

| 2 | Primitive variables and data types | WHITEOUT AP-CSA-oriented Java spine |

| 3 | Expressions, arithmetic, precedence, and output | WHITEOUT AP-CSA-oriented Java spine |

| 4 | Assignment, input, and reassignment | WHITEOUT AP-CSA-oriented Java spine |

| 5 | Casting, integer division, numeric range, and overflow awareness | WHITEOUT AP-CSA-oriented Java spine |

| 6 | Compound assignment and increment/decrement | WHITEOUT AP-CSA-oriented Java spine |

| 7 | APIs and library methods | WHITEOUT AP-CSA-oriented Java spine |

| 8 | Comments, documentation, preconditions, and postconditions | WHITEOUT AP-CSA-oriented Java spine |

| 9 | Method signatures, parameters, return types, and calls | WHITEOUT AP-CSA-oriented Java spine |

| 10 | String objects and common String methods | WHITEOUT AP-CSA-oriented Java spine |

| 11 | Boolean expressions and relational operators | WHITEOUT AP-CSA-oriented Java spine |

| 12 | if / if-else selection | WHITEOUT AP-CSA-oriented Java spine |

| 13 | Nested conditionals | WHITEOUT AP-CSA-oriented Java spine |

| 14 | Compound Boolean logic and De Morgan reasoning | WHITEOUT AP-CSA-oriented Java spine |

| 15 | while loops and termination | WHITEOUT AP-CSA-oriented Java spine |

| 16 | for loops and loop tracing | WHITEOUT AP-CSA-oriented Java spine |

| 17 | Selection-and-iteration algorithms: count, sum, min/max, search | WHITEOUT AP-CSA-oriented Java spine |

| 18 | String traversal and string algorithms | WHITEOUT AP-CSA-oriented Java spine |

| 19 | Nested iteration and informal run-time reasoning | WHITEOUT AP-CSA-oriented Java spine |

| 20 | Abstraction and program design | WHITEOUT AP-CSA-oriented Java spine |

| 21 | Class anatomy: fields, encapsulation, and object state | WHITEOUT AP-CSA-oriented Java spine |

| 22 | Constructors and initialization | WHITEOUT AP-CSA-oriented Java spine |

| 23 | Writing instance methods | WHITEOUT AP-CSA-oriented Java spine |

| 24 | Passing and returning object references | WHITEOUT AP-CSA-oriented Java spine |

| 25 | Class variables, static methods, scope, access, and this | WHITEOUT AP-CSA-oriented Java spine |

| 26 | Arrays: creation, access, default values, and bounds | WHITEOUT AP-CSA-oriented Java spine |

| 27 | Array traversals and array algorithms | WHITEOUT AP-CSA-oriented Java spine |

| 28 | Text files, wrapper classes, and data ingestion | WHITEOUT AP-CSA-oriented Java spine |

| 29 | ArrayList methods, traversals, mutation, and algorithms | WHITEOUT AP-CSA-oriented Java spine |

| 30 | 2D arrays: creation, access, traversal, and algorithms | WHITEOUT AP-CSA-oriented Java spine |

| 31 | Linear and binary search | WHITEOUT AP-CSA-oriented Java spine |

| 32 | Selection sort and insertion sort | WHITEOUT AP-CSA-oriented Java spine |

| 33 | Recursion: base cases, recursive calls, and tracing | WHITEOUT AP-CSA-oriented Java spine |

| 34 | Recursive search/sort reasoning | WHITEOUT AP-CSA-oriented Java spine |

| 35 | Testing, debugging, edge cases, and incremental development | Explicit cross-course enrichment retained from supplied CSP cheat sheet |

| 36 | Data representation, precision, and data quality | Explicit cross-course enrichment retained from supplied CSP cheat sheet |

| 37 | Networks, packets, protocols, redundancy, and cybersecurity | Explicit cross-course enrichment retained from supplied CSP cheat sheet |

| 38 | Ethics, privacy, bias, and impact of computing | Explicit cross-course enrichment retained from supplied CSP cheat sheet |


## 5.1 Keystone set

- **State & assignment**

- **Boolean logic**

- **Iteration**

- **Debugging & tests**

- **Methods & abstraction**

- **Object state & references**

- **Collections & indexing**

- **Search & efficiency**

- **Data quality & representation**

- **Reliability & redundancy**



## 5.2 Dependency graph

The numbered spine is not a textbook-order list; these are the prerequisite paths WHITEOUT actually uses. A concept may have several incoming arrows when a later stop combines them.

- **1 sequencing → 3 expressions → 4 assignment → 11 Boolean comparison → 12 selection → 13 nested selection → 14 compound Boolean logic.**
- **1 sequencing → 15 while termination → 16 for-loop tracing → 17 selection/iteration algorithms → 19 informal run-time reasoning → 31 search → 32 sorting.**
- **2 primitive types + 3 expressions → 5 casting/integer division → 10 String objects → 18 String traversal.**
- **8 documentation/contracts + 9 method signatures → 20 abstraction/program design.**
- **2 primitive state + 4 assignment → 21 object state → 22 constructors → 23 instance methods → 24 object references → 25 static/class scope.**
- **4 assignment + 16 iteration → 26 arrays → 27 array traversal → 29 ArrayList mutation.**
- **26 arrays + 27 traversal → 30 2D arrays.**
- **15 termination + 9 method calls → 33 recursion → 34 recursive search/sort reasoning.**
- **35 testing/debugging depends on 1 sequencing and then recurs across every later family as the way behavior is verified.**
- **36 data quality depends on 2/3/10 representation choices; 37 network reliability is independent background enriched by 35 testing; 38 impact/privacy combines data handling with operational decisions.**

No finale concept is new: Mission 15 only transfers abstractions, collection mutation, testing, object state, Boolean logic, and redundancy that were established earlier.

## 5.3 Keystone utility table

| Keystone | What it enables | Later unlocks | World/equipment decision | Likely misconception |
|---|---|---|---|---|
| State & assignment | Trace how a value changes over time. | objects, loops, canary predictions | whether a controller really changed | a variable name guarantees the intended state |
| Boolean logic | Predict which branch or safety condition fires. | nested control, verification gates | keep/shut down equipment | two true `if` tests behave like one `if/else` |
| Iteration | Predict repeated work and termination. | arrays, search, recursion | rover route completion and bounded work | a loop eventually stops even if its progress state never changes |
| Debugging & tests | Separate competing explanations with known and edge inputs. | holdout, regression, canary release | whether evidence is strong enough for live action | a green result from familiar cases proves all cases |
| Methods & abstraction | Reason about contracts and shared utility behavior. | object methods, recursive helpers, final release plan | whether one code layer explains several symptoms | a clean method name guarantees a correct implementation |
| Object state & references | Distinguish object identity, instance state, and shared state. | live patching and static-field diagnosis | which physical controller a patch changes | same class or same-looking values mean same object |
| Collections & indexing | Map positions to values and mutate ordered data safely. | 2D maps, sorting, rollback | room labels, rover hazards, incident history | removing an item leaves later indexes unchanged |
| Search & efficiency | Choose an algorithm that meets a time limit. | rescue lookup, resource-aware design | whether an answer arrives before the link closes | sorted data does not change the useful search strategy |
| Data quality & representation | Distinguish raw data from parsing/mapping errors. | independent checks and reliable logs | whether to trust a displayed value | a formatted display is equivalent to the source record |
| Reliability & redundancy | Trace shared dependencies and independent paths. | relay routing and staged deployment | whether rescue control survives one failure | two channels are redundant just because both are visible |

## 5.4 Concept encounter matrix

| Concept | Encounters |
|---:|---|

| 1 | M3 S9 INTRODUCE — Order one rover lap |

| 2 | M1 S3 PRACTICE — Store the repaired value |

| 3 | M1 S1 INTRODUCE — Trace the controller |

| 4 | M5 S20 COMBINE — Patch the live controller |

| 5 | M1 S2 PRACTICE — Preserve the fraction |

| 6 | M3 S11 PRACTICE — Advance the route index |

| 7 | M6 S24 RETRIEVE — Repair message parsing |

| 8 | M4 S15 INTRODUCE — Verify the utility contract |

| 9 | M4 S16 COMBINE — Localize the shared utility |

| 10 | M6 S22 PRACTICE — Read the timestamp String |

| 11 | M1 S4 COMBINE — Authorize the generator; M2 S5 INTRODUCE — Read the alarm condition |

| 12 | M2 S6 PRACTICE — Separate the branches |

| 13 | M2 S7 COMBINE — Trace the nested lockout |

| 14 | M2 S8 COMBINE — Restore scrubber control |

| 15 | M3 S10 INTRODUCE — Find the endless condition |

| 16 | M3 S12 COMBINE — Send a bounded route |

| 17 | M7 S28 COMBINE — Certify the room map; M14 S54 TRANSFER — Stress the adjacency assumption |

| 18 | M6 S23 COMBINE — Trace the substring |

| 19 | M10 S37 INTRODUCE — Estimate the search work |

| 20 | M14 S56 TRANSFER — Decide whether green means safe; M15 S57 TRANSFER — Choose the staged release |

| 21 | M5 S17 INTRODUCE — Inspect object state; M11 S41 RETRIEVE — Compare two controller objects |

| 22 | M5 S18 PRACTICE — Check initialization |

| 23 | M11 S43 PRACTICE — Probe independent warning state |

| 24 | M5 S19 COMBINE — Follow the live reference |

| 25 | M11 S42 INTRODUCE — Inspect the static field; M11 S44 COMBINE — Separate shared from local state |

| 26 | M7 S25 INTRODUCE — Map sensor positions; M7 S27 PRACTICE — Catch the shifted index |

| 27 | M7 S26 RETRIEVE — Trace the sensor loop |

| 28 | M8 S29 RETRIEVE — Read the raw file |

| 29 | M8 S31 PRACTICE — Trace the skipped records; M12 S48 COMBINE — Transmit the ordered plan; M14 S55 TRANSFER — Audit the rollback pattern; M15 S58 TRANSFER — Prove the rollback traversal |

| 30 | M9 S33 INTRODUCE — Read the hazard grid; M9 S34 PRACTICE — Walk the grid in order; M9 S35 COMBINE — Find the transposed write; M9 S36 TRANSFER — Release Rover Three |

| 31 | M10 S38 PRACTICE — Choose the search; M10 S39 COMBINE — Trace midpoint updates; M10 S40 TRANSFER — Lock the rescue frequency |

| 32 | M12 S46 RETRIEVE — Order the priority passes; M12 S47 COMBINE — Preserve equal-priority order |

| 33 | M13 S49 INTRODUCE — Trace the recursive calls; M13 S50 PRACTICE — Repair the base case; M13 S52 TRANSFER — Build the relay route |

| 34 | M13 S51 COMBINE — Test the recursive contract |

| 35 | M4 S13 INTRODUCE — Choose the first discriminating test; M4 S14 PRACTICE — Add the edge case; M8 S32 RETRIEVE — Recover the full timeline; M14 S53 RETRIEVE — Test unseen rollback cases; M15 S60 TRANSFER — Commit the station recovery |

| 36 | M8 S30 COMBINE — Check the parsed records |

| 37 | M6 S21 INTRODUCE — Check the network path; M15 S59 RETRIEVE — Protect the rescue link |

| 38 | M12 S45 INTRODUCE — Choose what the aircraft needs |


## 5.5 Keystone recurrence matrix

| Keystone | Separated missions and roles |
|---|---|

| State & assignment | M1 S1 INTRODUCE; M1 S2 PRACTICE; M1 S3 PRACTICE; M3 S11 PRACTICE; M5 S17 INTRODUCE; M11 S41 RETRIEVE; M15 S60 TRANSFER |

| Boolean logic | M1 S4 COMBINE; M2 S5 INTRODUCE; M2 S6 PRACTICE; M2 S7 COMBINE; M2 S8 COMBINE; M7 S28 COMBINE; M10 S40 TRANSFER; M11 S41 RETRIEVE; M11 S44 COMBINE; M14 S56 TRANSFER; M15 S60 TRANSFER |

| Iteration | M3 S9 INTRODUCE; M3 S10 INTRODUCE; M3 S11 PRACTICE; M3 S12 COMBINE; M7 S26 RETRIEVE; M10 S37 INTRODUCE; M10 S39 COMBINE; M13 S49 INTRODUCE; M13 S50 PRACTICE; M14 S54 TRANSFER |

| Debugging & tests | M1 S4 COMBINE; M2 S8 COMBINE; M3 S12 COMBINE; M4 S13 INTRODUCE; M4 S14 PRACTICE; M4 S15 INTRODUCE; M4 S16 COMBINE; M5 S20 COMBINE; M6 S24 RETRIEVE; M7 S28 COMBINE; M8 S29 RETRIEVE; M8 S32 RETRIEVE; M9 S36 TRANSFER; M12 S48 COMBINE; M14 S53 RETRIEVE; M14 S54 TRANSFER; M14 S55 TRANSFER; M14 S56 TRANSFER; M15 S60 TRANSFER |

| Methods & abstraction | M4 S15 INTRODUCE; M4 S16 COMBINE; M5 S18 PRACTICE; M5 S19 COMBINE; M6 S23 COMBINE; M6 S24 RETRIEVE; M11 S42 INTRODUCE; M11 S44 COMBINE; M13 S50 PRACTICE; M13 S51 COMBINE; M15 S57 TRANSFER; M15 S58 TRANSFER |

| Object state & references | M5 S17 INTRODUCE; M5 S18 PRACTICE; M5 S19 COMBINE; M5 S20 COMBINE; M11 S41 RETRIEVE; M11 S42 INTRODUCE; M11 S43 PRACTICE; M11 S44 COMBINE; M15 S60 TRANSFER |

| Collections & indexing | M7 S25 INTRODUCE; M7 S26 RETRIEVE; M7 S27 PRACTICE; M7 S28 COMBINE; M8 S31 PRACTICE; M8 S32 RETRIEVE; M9 S33 INTRODUCE; M9 S34 PRACTICE; M9 S35 COMBINE; M9 S36 TRANSFER; M12 S46 RETRIEVE; M12 S47 COMBINE; M12 S48 COMBINE; M13 S52 TRANSFER; M14 S55 TRANSFER; M15 S58 TRANSFER |

| Search & efficiency | M10 S37 INTRODUCE; M10 S38 PRACTICE; M10 S39 COMBINE; M10 S40 TRANSFER; M12 S46 RETRIEVE; M12 S47 COMBINE; M13 S51 COMBINE; M15 S57 TRANSFER |

| Data quality & representation | M1 S1 INTRODUCE; M1 S2 PRACTICE; M6 S22 PRACTICE; M6 S23 COMBINE; M8 S29 RETRIEVE; M8 S30 COMBINE; M12 S45 INTRODUCE; M14 S53 RETRIEVE; M14 S56 TRANSFER |

| Reliability & redundancy | M6 S21 INTRODUCE; M10 S40 TRANSFER; M13 S52 TRANSFER; M15 S59 RETRIEVE; M15 S60 TRANSFER |

---
# 6. Dramatic spine and clue ledger

## 6.1 Major turns

1. **Twist 1 — the storm did not break everything the alarms say it broke.** Arithmetic, branching, and loop logic create physical-looking emergencies.

2. **Twist 2 — the failures are coupled.** References, shared state, indexing, and collection code connect systems the crew believed were independent.

3. **Twist 3 — ALL GREEN is not verified recovery.** A holdout test reactivates the Mission 8 ArrayList signature after an apparent victory.


## 6.2 Clue ledger

| Plant | Objective observation | Initial interpretation | True meaning | Concept needed | Reinforcement | Payoff |
|---|---|---|---|---|---|---|

| M1 | 83 kW physical output stays steady while controller displays 0% | generator damage | integer division creates the alarm | numeric types and expression evaluation | M4 shared-software replay | M4 |

| M2 | one packet produces two true threshold tests | duplicate sensor | two independent branches can both run | Boolean selection | M7 array label mismatch also preserves valid raw evidence | M4 |

| M3 | rover repeats the same circle exactly | steering hardware | loop state never advances | iteration and termination | M9 correct field data / wrong software map | M4 |

| M5 | simulator changes but P02 does not | patch method is broken | reference points at the wrong object | objects and references | M11 shared-versus-instance state | M11 |

| M6 | raw packet and independent clocks show 08:07 | network delay | substring drops final character | String indexing | M10 rescue communications deadline | M10 |

| M8 | forward cleanup leaves A,C,D,F | missing source records | removal shifts the next resolved item left | ArrayList mutation | M14 holdout and residual pattern | M14 |

| M9 | crevasse moves from [0][1] to [1][0] | bad field survey | destination indexes are transposed | 2D arrays | M13 route safety uses repaired map | M13 |

| M10 | binary search reaches target in 3 checks | satellite too slow | old algorithm wastes sorted structure | search efficiency | M13 recursive search reasoning / final deadline | M15 |

| M13 | every live dashboard turns green while rollback still says `ADJACENT CASES: UNTESTED` | final recovery is nearly done | live calm does not prove rollback generalization | testing and holdout logic | M4 edge-case discipline and M8 mutation signature | M14 |

| M14 | all live dashboards are quiet while rollback fails 0/5 holdout cases | new physical cascade | current state is stable but recovery path is unsafe | testing and generalization | earlier Mission 8 pattern | M15 |

---

## 6.3 Mission science / mystery / stakes movement

| Mission | Science movement | Mystery movement | Stakes movement |
|---:|---|---|---|
| 1 | Integer arithmetic becomes a tool for tracing a controller. | First red alarm is shown to be software-made. | A healthy generator nearly gets shut down during a whiteout. |
| 2 | Boolean selection distinguishes independent from exclusive branches. | A second physical-looking fault is also software-shaped. | Bad branch logic can disable working air equipment. |
| 3 | Loop state and termination become operational evidence. | Rover hardware is cleared; exact repetition points back to code. | The field rover is needed for later rescue work. |
| 4 | Known-input, edge-case, contract, and shared-utility tests become a formal method. | Three incidents converge on one legacy software layer. | Live patching by guess is frozen. |
| 5 | Object identity, constructors, references, and instance methods become one chain. | A correct method can still act on the wrong object. | A patch that misses P02 can leave power control falsely trusted. |
| 6 | String parsing is separated from packet transport and dependency evidence. | The satellite is cleared; the display parser is at fault. | Abandoning a healthy link would shrink the rescue window. |
| 7 | Array indexing is checked against independent physical measurements. | The cold-room emergency is a label/index error. | A bad index can move people unnecessarily or hide a real cold room. |
| 8 | File ingestion and ArrayList mutation are compared against raw records. | Missing events are revealed as a cleanup skip pattern. | The incident history itself can become unreliable. |
| 9 | 2D row/column reasoning ties software cells to surveyed ground. | The field crew is cleared; one write transposes the hazard. | A rover can be sent onto unsafe ice by one index swap. |
| 10 | Binary search and run-time reasoning become deadline tools. | The link is not inherently too slow; the old search is. | The rescue frequency must be found during a short pass. |
| 11 | Instance state is separated from class-wide static state. | Two unrelated controllers are coupled through one field. | One system can silently overwrite another during rescue. |
| 12 | Sorting, stable order, budget, and privacy become one message-design problem. | More data is not always a better rescue message. | The aircraft has only ten seconds and should not receive unnecessary PII. |
| 13 | Recursion is traced to a base case and tested as a route builder. | A rover relay can provide real independence from the primary mast. | Icing threatens the main command path before aircraft arrival. |
| 14 | Holdout, stress, residual pattern, and diagnosis test generalization. | ALL GREEN is reinterpreted as live calm, not safe recovery. | The trusted rollback path could fail during the final window. |
| 15 | Earlier mechanisms are integrated into a canary and staged release. | The apparent need for a full restart is rejected. | One last cascade could erase both recovery and rescue options. |

## 6.4 Smaller reversals and cadence

Between the three major twists, the campaign deliberately changes the player's working theory: M5 reveals the patch reached the wrong object; M6 clears the network and blames parsing; M7 clears the physical room and blames indexing; M9 clears the survey and blames a transposed write; and M11 reveals cross-controller coupling through static state. These changes keep science, mystery, and stakes moving at least every two missions rather than saving all reinterpretation for the three major turns.


---
# 7. Mission route overview

| Mission | Places | Promised decision | Decision delivered |
|---:|---|---|---|

| 1 — THE HEAT THAT ISN'T GONE | Power & Thermal Plant | whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly | The generator is healthy; integer arithmetic is collapsing 83/100 to zero and falsely creating the heat emergency. |

| 2 — THE ALARM THAT CALLS TWICE | Habitat Control | whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire | The sensor is not duplicated; two independent if statements can both fire, and an exclusive branch structure removes the double command. |

| 3 — THE ROVER THAT NEVER ARRIVES | Vehicle Bay | whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state | Rover Three is mechanically healthy; its loop never advances the route index, so the stopping condition can never become true. |

| 4 — THE QUIET TEST | Software Lab | whether the station should keep treating each failure separately or investigate one shared software utility | The failures should be investigated together; all three reproduce through the same legacy utility layer while independent hardware controls stay quiet. |

| 5 — ONE NAME, TWO OBJECTS | Software Lab → Power & Thermal Plant | whether the patch is modifying the intended live controller object or a different object with similar state | The patch is modifying simulator object C17, not live controller P02; the live reference path must be corrected before the method call can matter. |

| 6 — THE MESSAGE WITH THE WRONG MINUTE | Communications & Weather → Software Lab | whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly | The network is on time; the parser cuts the timestamp one character early, turning 08:07 into 08:0 on two displays. |

| 7 — THE ARRAY WITH A HOLE | Habitat Control → Software Lab | whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element | Room 7 is safe; the controller maps Room 6 and Room 7 to the wrong indexes, producing a false 4.1°C emergency. |

| 8 — THE LOG THAT SKIPS EVERY SECOND LINE | Operations Module → Software Lab | whether recovery records were never written or the program is skipping entries while it removes resolved records | The records were written; forward ArrayList removal skips shifted resolved entries, leaving an alternating survivor pattern. |

| 9 — THE MAP THAT LIES BY ONE COLUMN | Vehicle Bay → Software Lab → Vehicle Bay (2 unique) | whether the field survey is wrong or the rover display is swapping row and column indexes | The field survey is correct; one write uses [column][row], transposing the crevasse into the neighboring cell. |

| 10 — THE FAST ANSWER | Communications & Weather → Software Lab → Communications & Weather (2 unique) | which search method can find the rescue-frequency record fast enough for the next satellite window | Binary search is required; the sorted table lets the code cut the remaining range in half and reach 122.3 MHz in three midpoint checks. |

| 11 — THE CLASS THAT REMEMBERS TOO MUCH | Software Lab → Power & Thermal Plant → Habitat Control | whether unrelated controllers are overwriting one another because their warning state is shared at the class level | The controllers share one static warning field; changing H04 overwrites the value later read from P02 even though the objects are physically separate. |

| 12 — THE SORTED QUEUE | Operations Module → Software Lab → Communications & Weather | which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII | Send runway, weather, power endurance, and medical count in stable priority order; omit names, birthdates, and the full debug dump. |

| 13 — THE CALL THAT CALLS ITSELF | Software Lab → Vehicle Bay → Communications & Weather | whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay | The repaired recursion terminates at build(0) and returns exactly four safe waypoints, so Rover Three can deploy the backup relay. |

| 14 — ALL GREEN | Software Lab → Power & Thermal Plant → Operations Module | whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure | The live station is stable now, but ALL GREEN is false assurance because forward rollback fails unseen adjacent-record cases. |

| 15 — WHITEOUT | Operations Module → Software Lab → Communications & Weather → Operations Module (3 unique) | which final software release and rescue plan can be committed without creating another hidden cascade | Use a staged canary release with backward rollback, independent rover communications, and five committed checks before expanding to the remaining controllers. |



## 7.1 Persistent world-state ledger

| Mission | State that persists after the outcome |
|---:|---|
| 1 | Generator stays online; the false percentage alarm is tagged as a repaired software fault. |
| 2 | Scrubber uses exclusive branch logic; the one-packet/two-command trace remains in the mission log. |
| 3 | Rover Three remains available; the corrected bounded-loop trace is stored with the vehicle. |
| 4 | The shared utility is isolated behind the Software Lab test harness; ad-hoc live patching remains frozen. |
| 5 | P02 is linked to the corrected live reference; C17 remains labeled as the simulator object. |
| 6 | Rescue packet parsing preserves `08:07`; the satellite path remains active. |
| 7 | Room 7 keeps its correct sensor label and stays occupied. |
| 8 | The full raw incident timeline is restored; the A-C-D-F forward-removal signature is saved as a regression case. |
| 9 | Rover hazard display keeps row/column order correct; the crevasse remains at `[0][1]`. |
| 10 | Binary lookup for the rescue frequency remains available; the slow scan is retained only as a comparison test. |
| 11 | P02 and H04 keep independent warning fields. |
| 12 | The accepted four-item rescue queue and the decision not to transmit unnecessary PII remain logged. |
| 13 | Rover Three relay remains active as an independent command path; `ADJACENT CASES: UNTESTED` stays visible on rollback. |
| 14 | ALL GREEN remains revoked; status stays `LIVE STABLE / RECOVERY UNVERIFIED`; backward rollback is the only surviving candidate. |
| 15 | Backward rollback, rover command redundancy, and staged release remain active; all four bars lock and the Runway Door opens. |


---
# Mission 1 — THE HEAT THAT ISN'T GONE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 36 HOURS REMAIN

**Card title:** THE HEAT THAT ISN'T GONE

**Go now:** Go to Power & Thermal Plant and meet Malik Okafor, power and thermal engineer, at the Load Board.

**Card body (65 words; 4 sentences):** The whiteout has cut Aster Station off, and the first heat alarm is red. The controller turns whole-number power readings into a percentage before deciding whether to warn the crew. At the Power & Thermal Plant, trace and test that calculation before anyone shuts down a healthy generator. By the end of the mission, decide whether the generator is failing or the percentage code is wrong.

**Objective:** Gather enough code and station evidence to decide whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **integer division:** division between two integers that discards the fractional part before any later conversion.

- **cast:** an explicit conversion that changes how Java treats a value for an expression.

- **Boolean expression:** a comparison or logical test whose value is true or false.


#### Primer concepts

- Java evaluates arithmetic from the actual operand types, not from the type you wish the result had.

- A controller alarm is evidence only if its calculation agrees with an independent physical reading.


#### Equations first needed today

**Equation:** percent = 100.0 × delivered / requested  
**What it is for:** turn delivered power into a percentage of requested power.  
**Symbols:** `delivered` measured power; `requested` requested power; `percent` calculated percentage.  
**Why this campaign needs it:** the first alarm is generated from this relationship.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Integer division:** With `int a = 7; int b = 2;`, Java evaluates `a / b` as `3`. The `.5` is discarded because both operands are integers.

2. **Cast before division:** `(double) 7 / 2` becomes `7.0 / 2`, so the result is `3.5`. Casting after `7 / 2` would only turn the already-truncated `3` into `3.0`.

3. **Percentage:** If 45 items out of 60 are complete, `100.0 * 45 / 60 = 75.0`. Using `45 / 60 * 100` with integers gives `0` instead.

4. **Assignment:** `int x = 4; x = x + 3;` leaves `x` equal to `7`. Java evaluates the right side using the old value, then stores the result.

5. **Boolean comparison:** If `double p = 75.0;`, then `p < 70.0` is `false` and `p >= 70.0` is `true`.


**Authoring-only failure consequence:** A wrong call can shut down a healthy generator or leave a real heat failure active.


## B. Main story happening — designer summary

The whiteout has cut the station off, and the first heat alarm appeared during the storm. The power controller turns integer sensor readings into a percentage before it decides whether to raise an emergency alarm. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: A habitat scrubber now issues two shutdown orders from one sensor reading, suggesting a second software-shaped failure.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M1-B1 — On arrival at Power & Thermal Plant

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Load Board shows the unresolved incident.  
**Dialogue bubble — Malik Okafor, power and thermal engineer:** “The generator is still carrying load. Show me why the controller thinks it is not.”  
**Unlocks:** Stop 1.


### Beat M1-B2 — After Stops 1 and 2

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “The percentage bug is confirmed; the generator stays online.”  

**Unlocks:** Stop 3.


### Beat M1-B4 — After Stop 4

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “The generator is healthy; integer arithmetic is collapsing 83/100 to zero and falsely creating the heat emergency.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M1-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The red heat banner clears while generator output stays at 83 kW; the Habitat tile flashes `SCRUBBER: 2 COMMANDS / 1 SENSOR`, making the next problem visible.
**Dialogue bubble — Malik Okafor, power and thermal engineer:** “Fuel and exhaust were right. I was ready to blame the machine; next time I want the trace before the shutdown.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**1 location:** Power & Thermal Plant. 
All four stops stay local so the early campaign teaches one subsystem without sightseeing travel.


## F. Characters and dramatic beat

**Malik Okafor, Power and thermal engineer,** pushes to keep heat and power above survival limits.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Expressions, arithmetic, precedence, and output:** Equal-precedence multiplication and division are evaluated left to right, and both operands are integers.

- **Casting, integer division, numeric range, and overflow awareness:** The cast must occur before the division; casting the already-truncated result cannot recover discarded information.

- **Primitive variables and data types:** Assignment stores the evaluated right-hand value in a variable whose declared type must support that value and its later use.

- **Boolean expressions and relational operators:** A Boolean comparison should be evaluated from the repaired numeric state, and verification requires a prediction before the test result is revealed.


## H1. Stop 1 — Trace the controller

**Format/placement:** CHOICE, Malik Okafor at the Load Board.

**Code-display requirement:** Render the `code:` block exactly as authored beside the CHOICE panel; the player must be able to read the three Java lines before answering.

**Metadata:** Concept: 3 — Expressions, arithmetic, precedence, and output; Keystone: Data quality & representation, State & assignment; Area: POWER; Prerequisites: None — this is the first graded code trace.; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly.

**Call — exact player copy:** Go to Power & Thermal Plant and meet Malik Okafor, power and thermal engineer, at the Load Board.

**Stop reason — exact player copy:** Malik needs the displayed percentage explained before he shuts down a generator that still sounds normal.

**Question card story setup — exact player copy (38 words; 2 sentences):** The Load Board shows `delivered = 83`, `requested = 100`, and the alarm code `delivered / requested * 100`, while fuel flow and exhaust stay normal. Determine the integer expression's output before the crew decides whether the red percentage reflects the generator.

**Question card story-science connection — exact player copy:** If the arithmetic itself produces the alarm value, the physical generator should stay online while the software path is investigated.

**Format-specific interaction block:**
```yaml
question: "What value does Java store in percent?"
code: |
  int delivered = 83;
  int requested = 100;
  int percent = delivered / requested * 100;
choices:
  - "0"
  - "83"
  - "100"
  - "The code does not compile"
answer: "0"
why: "83 / 100 is integer division, so Java evaluates it as 0 before multiplying by 100."
rebuttals:
  "83": "That would require multiplying before the integer division or converting first; Java evaluates left to right at the same precedence."
  "100": "No operation in this expression can turn 83 into the full requested amount."
  "The code does not compile": "All variables and operations are valid int operations, so the code compiles."
```

**Question card prompt — exact player copy:** Read the three displayed lines, trace the expression exactly as Java evaluates it, and submit the stored value of `percent`.

**Correct result:** `percent` stores `0`.

**Answer text:** Java performs `83 / 100` as integer division first, giving `0`; `0 * 100` remains `0`.

**Why/mechanism:** Equal-precedence multiplication and division are evaluated left to right, and both operands are integers.

**Wrong-path feedback:**

- 83 assumes the fractional 0.83 survives integer division.

- 100 treats requested power as the result rather than an operand.

- Compile error ignores that every token is valid Java.

**State/output:** The Load Board adds `SOFTWARE VALUE = 0; PHYSICAL OUTPUT UNCHANGED` beside the alarm.

**Unlock:** Stop 2.

**Retrieval:** None; this is the first graded code trace.

**Later payoff:** The zero result becomes the prediction repaired in Stop 2.


## H2. Stop 2 — Preserve the fraction

**Format/placement:** DERIVE, Power & Thermal Plant — Load Board.

**Metadata:** Concept: 5 — Casting, integer division, numeric range, and overflow awareness; Keystone: Data quality & representation, State & assignment; Area: POWER; Prerequisites: Retrieves Stop 1's expression order immediately as practice, not delayed retrieval.; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly.

**Call — exact player copy:** Go to the Load Board in Power & Thermal Plant.

**Stop reason — exact player copy:** Stop 1 proved the integer expression collapses before multiplication, so the crew needs a repair that preserves the 0.83 fraction.

**Question card story setup — exact player copy (38 words; 2 sentences):** Stop 1 produced `0` even though 83 of 100 kilowatts are being delivered, proving the fraction disappears before the percentage is formed. Build the corrected expression so Java performs real-number division before the result is multiplied by 100.

**Question card story-science connection — exact player copy:** A correct cast should predict 83.0 percent without changing any physical generator setting.

**Format-specific interaction block:**
```yaml
derive:
  start: "int delivered = 83; int requested = 100;"
  goal: "percent as a double, starting from integer inputs"
  steps:
    - id: cast
      prompt: "Choose the division that preserves the fraction."
      choices:
        - {line: "double fraction = (double) delivered / requested;", correct: true}
        - {line: "double fraction = (double) (delivered / requested);", correct: false, survives: true, why: "The parentheses force integer division first, so the fraction is already lost before the cast to double."}
    - id: percent
      prompt: "Choose the percentage expression."
      choices:
        - {line: "double percent = fraction * 100.0;", correct: true}
        - {line: "double percent = (int) fraction * 100.0;", correct: false, survives: true, why: "Casting fraction back to int discards its fractional part before multiplying and recreates the whole-number loss."}
```

**Question card prompt — exact player copy:** Build the repaired calculation one line at a time; choose exactly one line at each step.

**Correct result:** `double fraction = (double) delivered / requested;` then `double percent = fraction * 100.0;`, producing `83.0`.

**Answer text:** Casting one operand before division changes the operation to floating-point division, so 83/100 becomes 0.83 and then 83.0 percent.

**Why/mechanism:** The cast must occur before the division; casting the already-truncated result cannot recover discarded information.

**Wrong-path feedback:**

- Leaving both operands as int recreates the zero from Stop 1.

- Casting `fraction` back to int discards 0.83 before the multiplication.

**State/output:** The Load Board displays a white `PREDICTED 83.0%` tag beside the unrepaired alarm code.

**Unlock:** Stop 3.

**Retrieval:** Retrieves Stop 1's expression order immediately as practice, not delayed retrieval.

**Later payoff:** Stop 4 will require the 83.0 prediction before the live test unlocks.


## H3. Stop 3 — Store the repaired value

**Format/placement:** CHOICE, Malik Okafor at the Load Board.

**Metadata:** Concept: 2 — Primitive variables and data types; Keystone: State & assignment; Area: POWER; Prerequisites: Uses the repaired numeric value from Stop 2.; Learning role: PRACTICE; Difficulty: L2; Story role: character.

**Briefing decision advanced:** whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly.

**Call — exact player copy:** Go to Power & Thermal Plant and meet Malik Okafor, power and thermal engineer, at the Load Board.

**Stop reason — exact player copy:** Malik needs the corrected percentage stored without turning it back into an integer before the alarm comparison runs.

**Question card story setup — exact player copy (37 words; 2 sentences):** The repaired expression now produces `83.0`, but the controller field receiving it is still declared with the old whole-number type. Choose the declaration and assignment that keep the fractional-capable result intact for later comparisons and logging.

**Question card story-science connection — exact player copy:** The repaired arithmetic only matters if assignment preserves the type and value that the next alarm test will read.

**Format-specific interaction block:**
```yaml
question: "Which replacement safely stores the repaired percentage?"
choices:
  - "double percent = 83.0;"
  - "int percent = (int) 83.0;"
  - "boolean percent = true;"
  - "String percent = \"83.0%\";"
answer: "double percent = 83.0;"
why: "A double stores the numeric 83.0 directly and remains usable in numeric comparisons."
rebuttals:
  "int percent = (int) 83.0;": "This converts the result back to an integer and recreates a type mismatch with the repaired calculation."
  "boolean percent = true;": "A Boolean stores true/false, not the measured percentage."
  "String percent = \"83.0%\";": "A String is display text and cannot be compared numerically without another parse step."
```

**Question card prompt — exact player copy:** Select the declaration that stores the repaired numeric percentage for the alarm comparison.

**Correct result:** `double percent = 83.0;`.

**Answer text:** The controller needs a numeric type that can store a decimal result and participate directly in later numeric tests.

**Why/mechanism:** Assignment stores the evaluated right-hand value in a variable whose declared type must support that value and its later use.

**Wrong-path feedback:**

- Casting to int discards numeric precision.

- Boolean cannot represent the percentage.

- String changes the value into text.

**State/output:** Malik's panel replaces `int percent` with `double percent` in the pending patch.

**Unlock:** Stop 4.

**Retrieval:** Uses the repaired numeric value from Stop 2.

**Later payoff:** The stored 83.0 becomes the committed prediction in Stop 4.


## H4. Stop 4 — Authorize the generator

**Format/placement:** VERIFY, Generator Controller.

**Metadata:** Concept: 11 — Boolean expressions and relational operators; Keystone: Boolean logic, Debugging & tests; Area: POWER; Prerequisites: Combines the arithmetic, type, and assignment work of Stops 1–3.; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether the generator is actually under-delivering heat or the controller is calculating the percentage incorrectly.

**Call — exact player copy:** Go to the Generator Controller in Power & Thermal Plant.

**Stop reason — exact player copy:** The generator may stay online only if the repaired percentage predicts the alarm state and a controlled run matches that prediction.

**Question card story setup — exact player copy:** Stops 1–3 predict `percent = 83.0` from unchanged 83 kW delivery and a 100 kW request, while the physical generator remains steady. Commit the repaired percentage before the isolated calculation reveals what the controller actually computes.

**Question card story-science connection — exact player copy:** Agreement between the committed Boolean prediction and the isolated run can clear the generator without pretending 83 percent is full output.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the percentage the repaired controller will compute before RUN unlocks."
  predictionRange: {min: 0, max: 100, step: 1, unit: "%"}
  truth: 83
  measurement:
    label: "calculated percent"
    cost: 1
  correct_action: "Keep the generator online and repair the percentage code."
  answerText: "The repaired controller computes 83.0%, so percent < 70.0 is false while the generator continues delivering 83 kW."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the repaired calculated percentage. OPERATE: run the isolated controller calculation. MEASURE: reveal the calculated percent. INTERPRET: combine that measurement with the steady 83 kW delivery and submit KEEP ONLINE or SHUT DOWN.

**Correct result:** 83%; KEEP ONLINE.

**Answer text:** The calculation and Boolean threshold now agree with the independent physical reading, so the alarm was software-generated rather than evidence of generator collapse.

**Why/mechanism:** A Boolean comparison should be evaluated from the repaired numeric state, and verification requires a prediction before the test result is revealed.

**Wrong-path feedback:**

- SHUT DOWN ignores the independent 83 kW reading and the false threshold result.

- Predicting `true` treats 83 as below 70.

- Predicting 0% repeats the integer-division bug already repaired.

**State/output:** The Generator Controller changes from `HEAT EMERGENCY` to `OUTPUT 83 kW / SOFTWARE ALARM CLEARED`.

**Unlock:** Beat M1-B4 and the Mission 1 outcome.

**Retrieval:** Combines the arithmetic, type, and assignment work of Stops 1–3.

**Later payoff:** Mission 2 begins when a different controller produces a suspicious duplicate action.


## I. Mission outcome

**Mission decision:** The generator is healthy. Java made 83/100 equal 0 with whole-number math. The steady 83 kW reading shows the machine still works. The crew keeps it online and fixes the percent code. Habitat Control then shows two commands from one sensor reading.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 1 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 09:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The false heat shutdown is prevented, restoring control confidence while keeping the healthy generator online.  
**Automatic bar change:** HABITAT +1 | POWER +4 | CONTROL +6 | RESCUE +0  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/0/0/4; expected bars = 73/72/62/52, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Equal-precedence multiplication and division are evaluated left to right, and both operands are integers.

- A Boolean comparison should be evaluated from the repaired numeric state, and verification requires a prediction before the test result is revealed.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The generator is healthy; integer arithmetic is collapsing 83/100 to zero and falsely creating the heat emergency.


---
# Mission 2 — THE ALARM THAT CALLS TWICE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 34 HOURS REMAIN

**Card title:** THE ALARM THAT CALLS TWICE

**Go now:** Go to Habitat Control and meet Mei Alvarez, habitat systems lead, at the Alarm Cabinet.

**Card body (69 words; 4 sentences):** The generator was healthy, but Habitat Control now sends two commands from one carbon-dioxide reading. Conditional branches decide which scrubber action runs when a Boolean test is true. At Habitat Control, trace and test the branch logic before a healthy scrubber is locked out or a real air alarm is ignored. By the end of the mission, decide whether the duplicate action comes from the sensor or the code.

**Objective:** Gather enough code and station evidence to decide whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **Boolean expression:** a comparison or logical test whose value is true or false.

- **branch:** one path through conditional code that runs only when its condition is selected.


#### Primer concepts

- More than one Boolean condition can be true for the same input.

- Two independent `if` statements may both run; an `if / else if` chain selects the first true branch.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **One branch with `if/else`:** If `x = 12`, `if (x > 10) A(); else B();` runs only `A()`.

2. **Two independent `if`s:** If `x = 12`, `if (x > 10) A(); if (x > 5) B();` runs both methods because the tests are separate.

3. **Compound AND:** With `x = 8`, `x > 5 && x < 10` is `true` because both comparisons are true.

4. **Compound OR:** With `x = 3`, `x < 0 || x == 3` is `true` because at least one comparison is true.

5. **De Morgan check:** `!(a && b)` is equivalent to `!a || !b`; negating a conjunction changes both the operator and each condition.


**Authoring-only failure consequence:** A wrong call can disable a healthy scrubber or leave a real air-control fault active.


## B. Main story happening — designer summary

Mission 1 proved that a software calculation can create a physical-looking emergency even when the hardware is healthy. The habitat controller uses Boolean tests and conditional branches to decide which scrubber action can run for one carbon-dioxide reading. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: Rover Three begins circling the same snow marker, creating a failure that looks mechanical but repeats too perfectly.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M2-B1 — On arrival at Habitat Control

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Alarm Cabinet shows the unresolved incident.  
**Dialogue bubble — Mei Alvarez, habitat systems lead:** “One sensor event should not order two different scrubber actions. Trace the branch before I lock anything out.”  
**Unlocks:** Stop 5.


### Beat M2-B2 — After Stops 5 and 6

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “One reading now produces one scrubber action.”  

**Unlocks:** Stop 7.


### Beat M2-B4 — After Stop 8

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “The sensor is not duplicated; two independent if statements can both fire, and an exclusive branch structure removes the double command.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M2-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The Alarm Cabinet shows one shutdown instead of two; the Vehicle status pane begins repeating `MARKER 3` for Rover Three, making the next failure visible.
**Dialogue bubble — Mei Alvarez, habitat systems lead:** “One sensor can still produce two bad actions. I will not call agreement proof until I know what logic sits between.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**1 location:** Habitat Control. 
All four stops stay local so the early campaign teaches one subsystem without sightseeing travel.


## F. Characters and dramatic beat

**Mei Alvarez, Habitat systems lead,** pushes to keep air and water stable while controllers are isolated.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Boolean expressions and relational operators:** Relational operators compare the stored numeric value with each threshold independently.

- **if / if-else selection:** Selection structure, not sensor count, determines whether multiple true conditions can produce multiple actions.

- **Nested conditionals:** Nested and exclusive conditions must be traced with the actual values of every enclosing test.

- **Compound Boolean logic and De Morgan reasoning:** AND requires both parts true, NOT flips the maintenance flag, and the else-if chain selects only the first true branch.


## H1. Stop 5 — Read the alarm condition

**Format/placement:** CHOICE, Mei Alvarez at the Alarm Cabinet.

**Metadata:** Concept: 11 — Boolean expressions and relational operators; Keystone: Boolean logic; Area: HAB; Prerequisites: Delayed retrieval of Boolean comparison from Mission 1 after the mission boundary.; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire.

**Call — exact player copy:** Go to Habitat Control and meet Mei Alvarez, habitat systems lead, at the Alarm Cabinet.

**Stop reason — exact player copy:** Mei needs the first carbon-dioxide reading translated into true and false conditions before anyone blames the sensor.

**Question card story setup — exact player copy (40 words; 2 sentences):** The scrubber log records one sensor value of 1050 ppm, and both shutdown and high-vent commands appear immediately afterward. Evaluate the two displayed comparisons so the crew can tell whether the duplicate actions are even possible from one valid reading.

**Question card story-science connection — exact player copy:** If both comparisons are true at 1050 ppm, duplicate output can come from control flow without any duplicate sensor packet.

**Format-specific interaction block:**
```yaml
question: "At CO2 = 1050, which statement is true?"
choices:
  - "co2 > 1000 is true and co2 > 900 is true"
  - "co2 > 1000 is true and co2 > 900 is false"
  - "co2 > 1000 is false and co2 > 900 is true"
  - "both comparisons are false"
answer: "co2 > 1000 is true and co2 > 900 is true"
why: "1050 exceeds both thresholds."
rebuttals:
  "co2 > 1000 is true and co2 > 900 is false": "1050 is also greater than 900."
  "co2 > 1000 is false and co2 > 900 is true": "1050 is greater than 1000."
  "both comparisons are false": "1050 exceeds both displayed thresholds."
```

**Question card prompt — exact player copy:** Evaluate both comparisons at 1050 ppm and submit the truth-value pair.

**Correct result:** Both comparisons are true.

**Answer text:** The same numeric reading can satisfy more than one Boolean expression at once.

**Why/mechanism:** Relational operators compare the stored numeric value with each threshold independently.

**Wrong-path feedback:**

- 1050 > 900 cannot be false.

- 1050 > 1000 cannot be false.

- Both false contradicts both numeric comparisons.

**State/output:** The Alarm Cabinet shows `ONE READING / TWO TRUE TESTS`.

**Unlock:** Stop 6.

**Retrieval:** Delayed retrieval of Boolean comparison from Mission 1 after the mission boundary.

**Later payoff:** Stop 6 determines whether the code permits both true tests to command equipment.


## H2. Stop 6 — Separate the branches

**Format/placement:** DERIVE, Habitat Control — Sensor Wall.

**Metadata:** Concept: 12 — if / if-else selection; Keystone: Boolean logic; Area: HAB; Prerequisites: Uses Stop 5's truth-value pair.; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire.

**Call — exact player copy:** Go to the Sensor Wall in Habitat Control.

**Stop reason — exact player copy:** Stop 5 proved one valid reading satisfies both thresholds, so the branch structure now determines whether one or two commands can run.

**Question card story setup — exact player copy (38 words; 2 sentences):** The current controller uses two independent `if` statements, so 1050 ppm can issue both SHUTDOWN and HIGH VENT commands in sequence. Build an exclusive branch structure that chooses the emergency action first and otherwise chooses the lower-level response.

**Question card story-science connection — exact player copy:** An exclusive structure should preserve the emergency response while preventing a second conflicting command from the same reading.

**Format-specific interaction block:**
```yaml
derive:
  start: "int co2 = reading; boolean maintenanceMode = false;"
  goal: "one mutually exclusive command from each CO2 reading"
  steps:
    - id: emergency
      prompt: "Choose the first branch."
      choices:
        - {line: "if (co2 > 1000) shutdown();", correct: true}
        - {line: "if (co2 < 1000) shutdown();", correct: false, survives: true, why: "This reverses the comparison and would shut down for lower CO2 rather than the high-CO2 condition named by the rule."}
    - id: alternate
      prompt: "Choose the mutually exclusive second branch."
      choices:
        - {line: "else if (co2 > 900 && co2 <= 1100) highVent();", correct: true}
        - {line: "if (co2 > 900 && co2 <= 1100) highVent(); // second check", correct: false, survives: true, why: "A second independent if is checked even after shutdown runs, so one reading can still issue two commands."}
```

**Question card prompt — exact player copy:** Choose the emergency branch and then the mutually exclusive lower-level branch.

**Correct result:** `if (co2 > 1000) shutdown(); else if (co2 > 900) highVent();`.

**Answer text:** Once the first condition is true, `else if` prevents the second branch from running for the same reading.

**Why/mechanism:** Selection structure, not sensor count, determines whether multiple true conditions can produce multiple actions.

**Wrong-path feedback:**

- Reversing the emergency comparison suppresses the action at high CO2.

- A second independent `if` recreates the duplicate-command bug.

**State/output:** The Sensor Wall displays `ONE READING → ONE SELECTED ACTION`.

**Unlock:** Stop 7.

**Retrieval:** Uses Stop 5's truth-value pair.

**Later payoff:** Stop 7 checks nested lockout logic before the controller is run.


## H3. Stop 7 — Trace the nested lockout

**Format/placement:** DIAGNOSIS, Habitat Control — Habitat Analysis Board.

**Metadata:** Concept: 13 — Nested conditionals; Keystone: Boolean logic; Area: HAB; Prerequisites: Combines Stops 5 and 6 with the maintenance-state condition.; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire.

**Call — exact player copy:** Go to the Habitat Analysis Board in Habitat Control.

**Stop reason — exact player copy:** The branch repair removes the duplicate action, but the controller also contains a nested maintenance lockout that could still suppress the wrong command.

**Question card story setup — exact player copy (38 words; 2 sentences):** At 1050 ppm the outer emergency condition is true, maintenance mode is false, and the sensor packet count is exactly one. Diagnose the control path that fits those readings and the observed single shutdown after the branch repair.

**Question card story-science connection — exact player copy:** The correct explanation must account for both the emergency branch and the quiet maintenance control without inventing a second sensor event.

**Format-specific interaction block:**
```yaml
headline: "Why does exactly one shutdown run?"
readings:
  - {zone: "SENSOR", label: "CO2", value: "1050 ppm", status: alarm}
  - {zone: "PACKETS", label: "sensor packet count", value: "1", status: normal}
  - {zone: "CONTROL", label: "maintenanceMode", value: "false", status: normal}
  - {zone: "OUTPUT", label: "commands after branch repair", value: "SHUTDOWN only", status: normal}
choices:
  - {id: branch, label: "Emergency branch runs alone", mechanism: "Fits 1050 ppm, one packet, and one output."}
  - {id: duplicate, label: "Two identical sensor packets arrived", mechanism: "Contradicted by packet count 1."}
  - {id: maintenance, label: "Maintenance mode forced shutdown", mechanism: "Contradicted by maintenanceMode=false."}
  - {id: low, label: "Only the 900-ppm branch ran", mechanism: "Contradicted by 1050 satisfying the emergency condition first."}
answer: branch
rebuttals:
  duplicate: "Packet count is 1, so duplicate sensor packets cannot explain the output."
  maintenance: "maintenanceMode is false, so maintenance did not force the shutdown."
  low: "At 1050 ppm the emergency condition is true first, so the else-if path is skipped."
```

**Question card prompt — exact player copy:** Read all four zones and select the one control-flow explanation that fits every reading.

**Correct result:** The emergency branch runs once; the else-if branch is skipped.

**Answer text:** The single sensor packet enters the true emergency branch, and the mutually exclusive structure prevents the lower branch from also running.

**Why/mechanism:** Nested and exclusive conditions must be traced with the actual values of every enclosing test.

**Wrong-path feedback:**

- Duplicate packet contradicts the packet counter.

- Maintenance explanation contradicts the false control.

- Low branch ignores top-down branch order.

**State/output:** The Alarm Cabinet replaces `DUPLICATE SENSOR?` with `CONTROL FLOW CONFIRMED`.

**Unlock:** Stop 8.

**Retrieval:** Combines Stops 5 and 6 with the maintenance-state condition.

**Later payoff:** Stop 8 verifies the full compound condition on the scrubber hardware.


## H4. Stop 8 — Restore scrubber control

**Format/placement:** VERIFY, Scrubber Console.

**Metadata:** Concept: 14 — Compound Boolean logic and De Morgan reasoning; Keystone: Boolean logic, Debugging & tests; Area: HAB; Prerequisites: Combines Boolean, branch, and nested-state reasoning from the mission.; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether the scrubber is receiving two shutdown commands because of duplicate sensor input or because both branches can fire.

**Call — exact player copy:** Go to the Scrubber Console in Habitat Control.

**Stop reason — exact player copy:** The repaired branch must also respect maintenance mode, so the crew needs a committed compound-logic prediction before live control unlocks.

**Question card story setup — exact player copy:** The repaired branch will run at 1050 ppm and 950 ppm with maintenance mode false in both cases. Commit the maximum number of commands one reading should produce before the scrubber reveals the measured command count.

**Question card story-science connection — exact player copy:** Two planned cases can prove the emergency path and the lower-level path are exclusive without disabling a healthy scrubber.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the maximum number of commands one test case should issue before RUN unlocks."
  predictionRange: {min: 0, max: 3, step: 1, unit: "commands"}
  truth: 1
  measurement:
    label: "maximum commands issued by one test case"
    cost: 1
  correct_action: "Keep the scrubber online with repaired branch logic."
  answerText: "Each case produces exactly one command: SHUTDOWN at 1050 ppm and HIGH VENT at 950 ppm, so the duplicate-command failure is gone."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the maximum number of commands one reading should produce. OPERATE: run the 1050 ppm and 950 ppm cases. MEASURE: reveal the maximum command count. INTERPRET: submit KEEP ONLINE or LOCK OUT.

**Correct result:** 1 command per case; KEEP ONLINE.

**Answer text:** The compound condition includes the maintenance negation, and the exclusive branch ensures only one action is selected for each reading.

**Why/mechanism:** AND requires both parts true, NOT flips the maintenance flag, and the else-if chain selects only the first true branch.

**Wrong-path feedback:**

- Two commands per case recreates the original bug.

- LOCK OUT ignores two passing planned cases.

- HIGH VENT at 1050 ignores the first true emergency branch.

**State/output:** The Scrubber Console shows two verified cases and removes the duplicate-command alarm.

**Unlock:** Beat M2-B4 and the Mission 2 outcome.

**Retrieval:** Combines Boolean, branch, and nested-state reasoning from the mission.

**Later payoff:** The campaign now has two independent examples of software creating physical-looking alarms.


## I. Mission outcome

**Mission decision:** The sensor is not duplicated; two separate `if` tests both run. One 1050 ppm packet made two commands, but the new branch made one. The crew keeps the scrubber online and fixes the branches. Rover Three then circles the same snow marker again.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 2 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 09:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The scrubber remains stable, but two controlled branch tests consume a small amount of power.  
**Automatic bar change:** HABITAT +5 | POWER -1 | CONTROL +5 | RESCUE +0  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/0/0/4; expected bars = 78/71/67/56, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Relational operators compare the stored numeric value with each threshold independently.

- AND requires both parts true, NOT flips the maintenance flag, and the else-if chain selects only the first true branch.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The sensor is not duplicated; two independent if statements can both fire, and an exclusive branch structure removes the double command.


---
# Mission 3 — THE ROVER THAT NEVER ARRIVES

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 32 HOURS REMAIN

**Card title:** THE ROVER THAT NEVER ARRIVES

**Go now:** Go to the Route Planning Board in Vehicle Bay.

**Card body (65 words; 4 sentences):** The scrubber sensors were healthy, but Rover Three keeps circling the same snow marker. A loop repeats while its condition stays true, so stored state must move toward a stopping value. In the Vehicle Bay, trace and repair the route loop before the rover wastes rescue time. By the end of the mission, decide whether the rover hardware is stuck or the code cannot terminate.

**Objective:** Gather enough code and station evidence to decide whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **loop:** code that repeats while a condition or counter says more work remains.

- **termination:** the condition that makes repeated or recursive work stop.

- **index:** the numbered position used to access an element; Java arrays and lists start at index zero.


#### Primer concepts

- A loop needs both repeated work and a state change that can make its condition false.

- Trace the value of the loop variable after every iteration.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Counted `for` loop:** `for (int i=0; i<4; i++)` runs with `i = 0,1,2,3` and stops when `i` becomes `4`.

2. **Terminating `while`:** `int n=3; while(n>0){n--;}` visits `3,2,1` and finishes with `n = 0`.

3. **Infinite loop:** `int n=3; while(n>0){System.out.println(n);}` never changes `n`, so its condition never becomes false.

4. **Accumulator:** Starting `sum=0`, adding `2,4,6` in a loop produces `sum = 12`.

5. **Search flag:** Loop through a list and set `found = true` when an item equals the target; once found, the Boolean records the result.


**Authoring-only failure consequence:** A wrong call can waste time replacing healthy rover hardware while the route loop remains broken.


## B. Main story happening — designer summary

Mission 2 showed that control flow, not bad sensors, can duplicate a physical action. The rover route code repeats instructions while a loop condition remains true, so one missing state update can trap the machine forever. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: Priya wants the first three failures reproduced in a safe software mirror before anyone patches another live controller.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M3-B1 — On arrival at Vehicle Bay

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Route Planning Board shows the unresolved incident.  
**Dialogue bubble — Jonah Reyes, field robotics lead:** “The rover turns cleanly and repeats the same circle. Make the code explain that pattern before I replace hardware.”  
**Unlocks:** Stop 9.


### Beat M3-B2 — After Stops 9 and 10

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “The route loop terminates in simulation and the rover hardware stays in service.”  

**Unlocks:** Stop 11.


### Beat M3-B4 — After Stop 12

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “Rover Three is mechanically healthy; its loop never advances the route index, so the stopping condition can never become true.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M3-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The rover completes four simulated waypoints and stops; the incident board highlights `normalizeState` beside all three earlier failures, opening the shared-software question.
**Dialogue bubble — Jonah Reyes, field robotics lead:** “I had a wheel kit open. Put it away—the rover fails the same way in code, so we fix code.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**1 location:** Vehicle Bay. 
All four stops stay local so the early campaign teaches one subsystem without sightseeing travel.


## F. Characters and dramatic beat

**Jonah Reyes, Field robotics lead,** pushes to keep autonomous vehicles available for rescue and external repairs.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Algorithms, sequencing, and program execution:** Algorithms are ordered instructions; changing the order can make later steps use stale state.

- **while loops and termination:** A while loop does not know that a physical action finished unless program state is updated explicitly.

- **Compound assignment and increment/decrement:** Compound updates change stored state; their direction and step size determine which indexes are visited.

- **for loops and loop tracing:** A for/while trace can prove both the repeated work and the exact termination state.


## H1. Stop 9 — Order one rover lap

**Format/placement:** SEQUENCE, Vehicle Bay — Route Planning Board.

**Metadata:** Concept: 1 — Algorithms, sequencing, and program execution; Keystone: Iteration; Area: VEH; Prerequisites: Introduces sequencing as the explicit structure behind later loop tracing.; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state.

**Call — exact player copy:** Go to the Route Planning Board in Vehicle Bay.

**Stop reason — exact player copy:** Jonah needs the rover's intended four-step route separated from the code that is trapping it at the first marker.

**Question card story setup — exact player copy (39 words; 2 sentences):** Rover Three should read a waypoint, steer toward it, confirm arrival, and then advance to the next route position. Put those four algorithm steps in execution order so the crew can compare intended behavior with the repeating field trace.

**Question card story-science connection — exact player copy:** A correct sequence gives the loop a state change that can move the rover toward its stopping condition.

**Format-specific interaction block:**
```yaml
cards:
- id: read
  label: read waypoint[index]
- id: steer
  label: steer to waypoint
- id: confirm
  label: confirm arrival
- id: advance
  label: advance index
order:
- read
- steer
- confirm
- advance
```

**Question card prompt — exact player copy:** Place the four route actions in the order one successful loop iteration should perform them, then submit the sequence.

**Correct result:** read waypoint → steer → confirm arrival → advance index.

**Answer text:** The next iteration should begin only after the current waypoint is reached and the index changes.

**Why/mechanism:** Algorithms are ordered instructions; changing the order can make later steps use stale state.

**Wrong-path feedback:**

- Advancing before arrival can skip a waypoint.

- Steering before reading gives no target.

- Omitting the final state update makes the loop repeat the same position.

**State/output:** The Route Table displays one intended loop cycle beside the rover's repeated physical circle.

**Unlock:** Stop 10.

**Retrieval:** Introduces sequencing as the explicit structure behind later loop tracing.

**Later payoff:** Stop 10 compares the intended cycle with the actual while loop.


## H2. Stop 10 — Find the endless condition

**Format/placement:** DERIVE, Vehicle Bay — Route Planning Board.

**Metadata:** Concept: 15 — while loops and termination; Keystone: Iteration; Area: VEH; Prerequisites: Uses the sequence from Stop 9.; Learning role: INTRODUCE; Difficulty: L3; Story role: reveal.

**Briefing decision advanced:** whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state.

**Call — exact player copy:** Go to the Route Planning Board in Vehicle Bay.

**Stop reason — exact player copy:** Stop 9 showed the route index must advance, but the live trace repeats index zero through every lap around the marker.

**Question card story setup — exact player copy (34 words; 2 sentences):** The current `while` loop checks `index < waypoints.length`, reads `waypoints[index]`, and steers correctly, but its body never changes `index`. Choose the progress statement and explain why the condition can otherwise remain true forever.

**Question card story-science connection — exact player copy:** A loop terminates only if repeated work changes state in a way that can eventually make its condition false.

**Format-specific interaction block:**
```yaml
derive:
  start: "int index = 0; while (index < waypoints.length) { goTo(waypoints[index]); ... }"
  goal: "advance loop state until the waypoint condition becomes false"
  steps:
    - id: progress
      prompt: "Choose the state update."
      choices:
        - {line: "index++;", correct: true}
        - {line: "index = index;", correct: false, survives: true, why: "The assignment stores the same value back into index, so index never approaches waypoints.length and the condition never becomes false."}
    - id: reason
      prompt: "Choose the termination explanation."
      choices:
        - {line: "index eventually reaches waypoints.length, making index < length false", correct: true}
        - {line: "steering changes, so the Java condition becomes false automatically", correct: false, survives: true, why: "The while condition reads index and the array length; changing unrelated state cannot make that Boolean expression false."}
```

**Question card prompt — exact player copy:** Choose the missing progress statement and the explanation that proves the loop can terminate.

**Correct result:** `index++;`; the loop ends when index reaches `waypoints.length`.

**Answer text:** Without changing index, the condition `index < length` remains true for the same stored value.

**Why/mechanism:** A while loop does not know that a physical action finished unless program state is updated explicitly.

**Wrong-path feedback:**

- `index = index` leaves the state unchanged.

- Physical steering does not change a Java variable unless code assigns the new state.

**State/output:** The Route Table highlights `index` as the missing progress variable.

**Unlock:** Stop 11.

**Retrieval:** Uses the sequence from Stop 9.

**Later payoff:** Stop 11 checks the safest update syntax before simulation.


## H3. Stop 11 — Advance the route index

**Format/placement:** CHOICE, Jonah Reyes at the Route Planning Board.

**Metadata:** Concept: 6 — Compound assignment and increment/decrement; Keystone: Iteration, State & assignment; Area: VEH; Prerequisites: Practices the progress requirement from Stop 10.; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state.

**Call — exact player copy:** Go to Vehicle Bay and meet Jonah Reyes, field robotics lead, at the Route Planning Board.

**Stop reason — exact player copy:** Jonah wants the smallest repair that advances exactly one waypoint after each confirmed arrival without changing the loop condition.

**Question card story setup — exact player copy (35 words; 2 sentences):** The loop index is an `int` starting at zero, and each completed waypoint must advance it by exactly one. Choose the update that changes the stored value once per iteration without resetting or skipping positions.

**Question card story-science connection — exact player copy:** The correct update should produce indexes 0, 1, 2, and 3 before the length check stops a four-waypoint route.

**Format-specific interaction block:**
```yaml
question: "Which update advances exactly one position?"
choices:
  - "index++;"
  - "index = 0;"
  - "index += 2;"
  - "index =+ 1;"
answer: "index++;"
why: "index++ adds one to the current stored value after each completed waypoint."
rebuttals:
  "index = 0;": "This resets the rover to the first waypoint and recreates the endless loop."
  "index += 2;": "This skips every second waypoint."
  "index =+ 1;": "This assigns positive one every time instead of adding one to the current index, so the route gets stuck at index 1."
```

**Question card prompt — exact player copy:** Select the one update that advances the stored route index by exactly one.

**Correct result:** `index++;`.

**Answer text:** Increment is shorthand for assigning the current integer value plus one back into the same variable.

**Why/mechanism:** Compound updates change stored state; their direction and step size determine which indexes are visited.

**Wrong-path feedback:**

- Reset keeps the rover at zero.

- Adding two skips waypoints.

- `index =+ 1` resets the stored value to positive one instead of incrementing it.

**State/output:** Jonah adds `index++` to the pending route patch.

**Unlock:** Stop 12.

**Retrieval:** Practices the progress requirement from Stop 10.

**Later payoff:** Stop 12 verifies the exact index trace on a bounded route.


## H4. Stop 12 — Send a bounded route

**Format/placement:** VERIFY, Rover Diagnostic Cart.

**Metadata:** Concept: 16 — for loops and loop tracing; Keystone: Iteration, Debugging & tests; Area: VEH; Prerequisites: Combines sequencing, while termination, and increment state from Stops 9–11.; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether Rover Three is mechanically stuck or trapped in code that can never reach its stopping state.

**Call — exact player copy:** Go to the Rover Diagnostic Cart in Vehicle Bay.

**Stop reason — exact player copy:** The rover may move only after the repaired loop predicts every index it will visit and the point where it must stop.

**Question card story setup — exact player copy:** A four-waypoint simulation starts at `index = 0` and uses the repaired `while (index < 4)` loop with `index++` after each arrival. Commit the final index before the diagnostic cart reveals the stopping state.

**Question card story-science connection — exact player copy:** A correct bounded trace can separate a software loop from a mechanical steering failure without sending the rover into the whiteout.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the final index after the four-waypoint loop before RUN unlocks."
  predictionRange: {min: 0, max: 6, step: 1, unit: "index"}
  truth: 4
  measurement:
    label: "final route index"
    cost: 1
  correct_action: "Keep rover hardware in service; deploy the loop repair."
  answerText: "The loop visits indexes 0, 1, 2, and 3 once, then stops when the index becomes 4; the clean steering response leaves the software loop as the failure."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the final index after all four waypoints. OPERATE: run the route simulation. MEASURE: reveal the final route index. INTERPRET: use the bounded trace and clean steering response to submit SOFTWARE LOOP or MECHANICAL FAILURE.

**Correct result:** Final index 4; SOFTWARE LOOP.

**Answer text:** The updated index eventually makes `index < 4` false, and the hardware executes every commanded turn correctly.

**Why/mechanism:** A for/while trace can prove both the repeated work and the exact termination state.

**Wrong-path feedback:**

- Including index 4 as a visited waypoint would access past the array end.

- A mechanical-failure diagnosis contradicts the clean simulated steering response.

- Stopping at 3 would leave the last waypoint uncompleted.

**State/output:** The diagnostic cart marks Rover Three hardware `HEALTHY` and the loop `REPAIRED`.

**Unlock:** Beat M3-B4 and the Mission 3 outcome.

**Retrieval:** Combines sequencing, while termination, and increment state from Stops 9–11.

**Later payoff:** Mission 4 receives the third reproducible software-shaped failure.


## I. Mission outcome

**Mission decision:** Rover Three is healthy; the route index never changes in the old loop. The fixed trace visits four points and stops at index 4. The crew keeps the rover ready. The incident log then links three failures to one software tool.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 3 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 09:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** Rover Three is recovered for field work, while repeated indoor simulations consume a little power.  
**Automatic bar change:** HABITAT +0 | POWER -2 | CONTROL +4 | RESCUE +5  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/0/0/4; expected bars = 78/69/71/65, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Algorithms are ordered instructions; changing the order can make later steps use stale state.

- A for/while trace can prove both the repeated work and the exact termination state.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** Rover Three is mechanically healthy; its loop never advances the route index, so the stopping condition can never become true.


---
# Mission 4 — THE QUIET TEST

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 30 HOURS REMAIN

**Card title:** THE QUIET TEST

**Go now:** Go to Software Lab and meet Priya Nair, software architect, at the Test Bench.

**Card body (68 words; 4 sentences):** Three physical-looking failures have now been explained by code, but the station cannot safely patch each one by guesswork. A test harness can replay captured inputs without changing the live station. In the Software Lab, design tests and inspect the shared utility before three separate live patches create new faults. By the end of the mission, decide whether the three failures should be investigated as one software problem.

**Objective:** Gather enough code and station evidence to decide whether the station should keep treating each failure separately or investigate one shared software utility.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **edge case:** an input at a boundary or unusual condition that can expose a hidden bug.

- **method contract:** the promised inputs, outputs, and conditions a method is expected to satisfy.


#### Primer concepts

- A useful test has a known expected result and can distinguish competing explanations.

- Boundary cases such as empty input often expose assumptions hidden by ordinary examples.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Known-output test:** If `square(4)` is supposed to return `16`, an output of `8` proves the implementation is wrong.

2. **Boundary test:** For a method accepting values from 0 through 100 inclusive, test `0`, `100`, and at least one ordinary interior value.

3. **Empty case:** A method that finds a maximum needs a defined empty-list behavior because there is no first element from which to initialize `max`.

4. **Small-section debugging:** If a total is wrong, test the parsing method and the summing method separately before changing both.

5. **Method contract:** If `countPositive([2,-1,0,5])` promises the number of positive entries, the correct result is `2`.


**Authoring-only failure consequence:** A wrong call can send three independent patches into live systems when one shared software cause is still active.


## B. Main story happening — designer summary

Mission 3 added a loop failure to the arithmetic and branching failures already proven. A test harness can run known inputs and edge cases against shared utility methods without touching the live station. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: A patch that works in the simulator fails to change the live power controller, so the team must trace which object the code actually reaches.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M4-B1 — On arrival at Software Lab

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Test Bench shows the unresolved incident.  
**Dialogue bubble — Priya Nair, software architect:** “Three failures are enough to stop guessing. Build me a test that can make the shared-code theory fail.”  
**Unlocks:** Stop 13.


### Beat M4-B2 — After Stops 13 and 14

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “The shared utility reproduces all three failures while hardware controls stay quiet.”  

**Unlocks:** Stop 15.


### Beat M4-B4 — After Stop 16

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “The failures should be investigated together; all three reproduce through the same legacy utility layer while independent hardware controls stay quiet.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M4-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The live patch queue freezes and the shared utility turns amber on the Code Review Wall; a reference panel shows C17 changing while P02 stays at its old limit.
**Dialogue bubble — Priya Nair, software architect:** “Three symptoms, one utility. No more live guesses; every patch has to fail safely here first.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**1 location:** Software Lab. 
All four stops stay local so the early campaign teaches one subsystem without sightseeing travel.


## F. Characters and dramatic beat

**Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Testing, debugging, edge cases, and incremental development:** Testing should discriminate competing explanations rather than maximize activity or data volume.

- **Testing, debugging, edge cases, and incremental development:** Edge cases target boundaries such as empty, minimum, maximum, or transition conditions.

- **Comments, documentation, preconditions, and postconditions:** Comments and contracts communicate intended preconditions/postconditions, but examples alone do not make an accidental pattern a guarantee.

- **Method signatures, parameters, return types, and calls:** A method signature and call graph expose abstraction boundaries; diagnosis should prefer the smallest common dependency consistent with all evidence.


## H1. Stop 13 — Choose the first discriminating test

**Format/placement:** VALUE, Priya Nair at the Test Bench.

**Metadata:** Concept: 35 — Testing, debugging, edge cases, and incremental development; Keystone: Debugging & tests; Area: CODE; Prerequisites: Introduces formal test design after three missions of ad hoc tracing.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the station should keep treating each failure separately or investigate one shared software utility.

**Call — exact player copy:** Go to Software Lab and meet Priya Nair, software architect, at the Test Bench.

**Stop reason — exact player copy:** Priya will not patch the live station until one cheap test can tell whether the three failures share a software utility.

**Question card story setup — exact player copy (39 words; 2 sentences):** The software mirror can spend twelve test minutes before the next heat cycle, and several tests reproduce symptoms without equally separating causes. Choose the evidence package most likely to distinguish a shared utility defect from three unrelated hardware failures.

**Question card story-science connection — exact player copy:** The best test is the one whose outcome changes which explanation survives, not simply the one that produces the most data.

**Format-specific interaction block:**
```yaml
value:
  budget: 4
  options:
    - {id: shared, label: "Run captured inputs through the shared utility", axis: "software", cost: 2, required: true}
    - {id: hardware, label: "Replay independent physical-control values", axis: "physical", cost: 2}
    - {id: log, label: "Pull the prior-shift event log", axis: "history", cost: 1}
    - {id: full, label: "Run the entire integrated station simulation", axis: "integration", cost: 4}
  correct: [shared, hardware]
  answerText: "Spend the four-minute budget on the shared-code replay and the independent physical control. Together they test two different evidence axes and can separate one shared software cause from unrelated hardware failures."
```

**Question card prompt — exact player copy:** Spend at most four test minutes and submit the evidence package that tests two different kinds of evidence and can change the shared-cause decision.

**Correct result:** Choose the shared-utility replay (2) plus independent physical controls (2); total 4 minutes.

**Answer text:** The shared replay tests the common code path, while the hardware controls check whether the physical systems can remain normal at the same time.

**Why/mechanism:** Testing should discriminate competing explanations rather than maximize activity or data volume.

**Wrong-path feedback:** - The prior-shift log adds history but does not independently test the live physical mechanism.

- The full simulation spends the entire budget on one integrated axis and gives up the independent physical comparison.

- The shared replay alone tests software but cannot reject simultaneous physical faults.

**State/output:** Priya schedules the shared replay and quiet controls on the Test Bench.

**Unlock:** Stop 14.

**Retrieval:** Introduces formal test design after three missions of ad hoc tracing.

**Later payoff:** Stop 16 will use the combined test results to localize the fault.


## H2. Stop 14 — Add the edge case

**Format/placement:** CHOICE, Priya Nair at the Test Bench.

**Metadata:** Concept: 35 — Testing, debugging, edge cases, and incremental development; Keystone: Debugging & tests; Area: CODE; Prerequisites: Practices testing introduced in Stop 13.; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether the station should keep treating each failure separately or investigate one shared software utility.

**Call — exact player copy:** Go to Software Lab and meet Priya Nair, software architect, at the Test Bench.

**Stop reason — exact player copy:** The shared replay reproduces the ordinary failures, but Priya wants one boundary input that could expose whether the utility assumes nonempty data.

**Question card story setup — exact player copy (38 words; 2 sentences):** The utility receives lists of sensor values and normally processes at least one item, yet an outage can legitimately produce an empty list. Choose the edge case that tests this boundary directly instead of repeating another ordinary input.

**Question card story-science connection — exact player copy:** A boundary case is useful when it exercises a condition the normal examples never reach.

**Format-specific interaction block:**
```yaml
question: "Which next input is the best edge case?"
choices:
  - "an empty sensor list []"
  - "the same three-value list again"
  - "a list with the values in a different font"
  - "a screenshot of the live dashboard"
answer: "an empty sensor list []"
why: "An empty list exercises the lower boundary where indexing or averaging code may fail."
rebuttals:
  "the same three-value list again": "This repeats the ordinary path and adds little new information."
  "a list with the values in a different font": "Display styling does not change the program input."
  "a screenshot of the live dashboard": "A screenshot is observation, not an input to the utility."
```

**Question card prompt — exact player copy:** Select the one input that directly tests the utility's lower-boundary behavior.

**Correct result:** Use the empty list `[]`.

**Answer text:** The empty list reaches code paths that ordinary nonempty examples cannot exercise.

**Why/mechanism:** Edge cases target boundaries such as empty, minimum, maximum, or transition conditions.

**Wrong-path feedback:**

- Repeating ordinary data is practice, not a boundary test.

- Font choice is not input state.

- Screenshot does not execute the utility.

**State/output:** The Test Bench adds `EMPTY INPUT` to the regression set.

**Unlock:** Stop 15.

**Retrieval:** Practices testing introduced in Stop 13.

**Later payoff:** The edge case becomes one claim checked in Stop 15.


## H3. Stop 15 — Verify the utility contract

**Format/placement:** ATTEST, Priya Nair at the Code Review Wall.

**Metadata:** Concept: 8 — Comments, documentation, preconditions, and postconditions; Keystone: Methods & abstraction, Debugging & tests; Area: CODE; Prerequisites: Introduces method-contract abstraction while retrieving the edge-case test.; Learning role: INTRODUCE; Difficulty: L3; Story role: character.

**Briefing decision advanced:** whether the station should keep treating each failure separately or investigate one shared software utility.

**Call — exact player copy:** Go to Software Lab and meet Priya Nair, software architect, at the Code Review Wall.

**Stop reason — exact player copy:** Priya needs to separate what the utility's documentation actually promises from behaviors the station merely happened to rely on.

**Question card story setup — exact player copy (42 words; 2 sentences):** The method header, comments, and captured tests make several claims about valid inputs and returned values, but only three can be verified before the next control cycle. Spend three checks on the claims that determine whether callers are using the utility correctly.

**Question card story-science connection — exact player copy:** A documented precondition can shift responsibility to callers, while an undocumented behavior cannot safely be treated as a contract.

**Format-specific interaction block:**
```yaml
attest:
  checks: 2
  claims:
  - id: c1
    label: input may be empty
    evidence: comment plus empty-input test
    backed: true
    critical: false
  - id: c2
    label: returned list preserves input order
    evidence: comment plus two order tests
    backed: true
    critical: true
  - id: c3
    label: method never changes the input list
    evidence: must be checked with a reference-preservation test
    backed: false
    critical: true
  - id: c4
    label: method always returns exactly three values
    evidence: must be checked with a four-value input
    backed: false
    critical: true
  answer:
  - c3
  - c4
  answerText: Spend the two checks on the two unresolved critical claims. The reference
    test supports no input mutation; the four-value test disproves the fixed-size
    claim.
```

**Question card prompt — exact player copy:** You have two verification checks. Spend them on the unresolved claims whose failure would change whether this method is safe to reuse, then submit the two claims to verify.

**Correct result:** Verify `method never changes the input list` and `method always returns exactly three values`; the first is supported and the second is disproved.

**Answer text:** The two scarce checks belong on the unresolved critical claims. The reference test confirms no mutation, while a four-value input proves that fixed size is not part of the contract.

**Why/mechanism:** Comments and contracts communicate intended preconditions/postconditions, but examples alone do not make an accidental pattern a guarantee.

**Wrong-path feedback:** - Rechecking empty-input support spends a scarce check on a claim already backed by documentation and a boundary test.

- Rechecking order preservation repeats evidence already supported by documentation and two tests.

- Skipping either unresolved critical claim leaves a behavior that could break callers unverified.

**State/output:** The Code Review Wall marks three contract claims VERIFIED and one `NOT GUARANTEED`.

**Unlock:** Stop 16.

**Retrieval:** Introduces method-contract abstraction while retrieving the edge-case test.

**Later payoff:** Stop 16 compares all three failure traces against this shared contract.


## H4. Stop 16 — Localize the shared utility

**Format/placement:** DIAGNOSIS, Software Lab — Code Review Wall.

**Metadata:** Concept: 9 — Method signatures, parameters, return types, and calls; Keystone: Methods & abstraction, Debugging & tests; Area: CODE; Prerequisites: Combines testing, contract, and method-call evidence from the mission.; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether the station should keep treating each failure separately or investigate one shared software utility.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The test harness now has three reproduced failures, an empty-input result, and a verified method contract, enough to localize the common defect.

**Question card story setup — exact player copy (39 words; 2 sentences):** Power percentage, scrubber branch state, and rover progress all pass through `normalizeState(int[] values)` before separate controllers act, while independent hardware controls remain normal. Diagnose the smallest explanation that fits all reproduced software failures and the quiet physical controls.

**Question card story-science connection — exact player copy:** The right diagnosis should explain shared software symptoms without requiring three unrelated pieces of hardware to fail at the same time.

**Format-specific interaction block:**
```yaml
headline: "What single location best explains the reproduced failures?"
readings:
  - {zone: "POWER REPLAY", label: "fails after normalizeState", value: "yes", status: alarm}
  - {zone: "HAB REPLAY", label: "fails after normalizeState", value: "yes", status: alarm}
  - {zone: "ROVER REPLAY", label: "fails after normalizeState", value: "yes", status: alarm}
  - {zone: "QUIET CONTROL", label: "independent hardware response", value: "normal", status: normal}
choices:
  - {id: utility, label: "shared normalizeState utility", mechanism: "All three reproduced paths share it while hardware controls stay quiet."}
  - {id: generator, label: "generator hardware", mechanism: "Cannot explain habitat and rover replay failures."}
  - {id: sensor, label: "habitat sensor", mechanism: "Cannot explain power and rover replay failures."}
  - {id: wheels, label: "rover steering hardware", mechanism: "Cannot explain software-only power and habitat replays."}
answer: utility
rebuttals:
  generator: "Generator hardware cannot produce the same replay failure in habitat and rover code while the hardware control stays normal."
  sensor: "A habitat sensor cannot explain the power and rover replays, and the independent hardware control is normal."
  wheels: "Rover steering hardware cannot explain software-only failures reproduced in the power and habitat paths."
```

**Question card prompt — exact player copy:** Read all four zones and submit the smallest shared code location that explains every reproduced failure.

**Correct result:** Investigate the shared `normalizeState` utility.

**Answer text:** Every failed software replay shares that method call, while independent hardware controls remain normal.

**Why/mechanism:** A method signature and call graph expose abstraction boundaries; diagnosis should prefer the smallest common dependency consistent with all evidence.

**Wrong-path feedback:**

- Single hardware causes cannot explain failures reproduced in other subsystems.

- The quiet control argues against simultaneous physical faults.

**State/output:** The Code Review Wall highlights `normalizeState(...)` as the first shared suspect and freezes live changes.

**Unlock:** Beat M4-B4 and the Mission 4 outcome.

**Retrieval:** Combines testing, contract, and method-call evidence from the mission.

**Later payoff:** Mission 5 follows one patch from this abstraction into the wrong object.


## I. Mission outcome

**Mission decision:** Treat the three failures as one software problem. All three bad inputs fail after the same utility, while hardware checks stay normal. The crew stops live patching and tests that utility in the lab. The first patch then changes C17 but not live controller P02.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 4 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 09:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The shared utility is localized and the station stops patching live systems by guesswork.  
**Automatic bar change:** HABITAT +0 | POWER +0 | CONTROL +8 | RESCUE +2  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/1/0/3; expected bars = 78/70/79/70, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Testing should discriminate competing explanations rather than maximize activity or data volume.

- A method signature and call graph expose abstraction boundaries; diagnosis should prefer the smallest common dependency consistent with all evidence.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The failures should be investigated together; all three reproduce through the same legacy utility layer while independent hardware controls stay quiet.


---
# Mission 5 — ONE NAME, TWO OBJECTS

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 28 HOURS REMAIN

**Card title:** ONE NAME, TWO OBJECTS

**Go now:** Go to Software Lab and meet Priya Nair, software architect, beside the Version Rack.

**Card body (70 words; 4 sentences):** The shared utility is suspect, but its first patch changes simulation and leaves live controller P02 untouched. Java variables can hold references to different objects even when those objects look similar. In the Software Lab and Power Plant, trace the live object path before the crew accepts a patch that never reaches P02. By the end of the mission, decide whether the patch reaches P02 or a different controller object.

**Objective:** Gather enough code and station evidence to decide whether the patch is modifying the intended live controller object or a different object with similar state.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **reference:** a value that points to an object rather than containing a separate copy of that object.

- **constructor:** code that initializes a new object when it is created.

- **instance field:** state stored separately inside each object.


#### Primer concepts

- Two variables can refer to the same object, and two similar objects can still be completely separate.

- Constructors establish initial object state; instance methods change the receiver object.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Constructor initialization:** `new Point(3,4)` stores `x=3` and `y=4` when the constructor uses `this.x=x; this.y=y;`.

2. **Two objects:** `Point a = new Point(1,2); Point b = new Point(1,2);` creates two different objects even though their field values match.

3. **Aliasing:** `Point b = a;` makes `a` and `b` refer to the same object. Changing `b.x` changes the object seen through `a` too.

4. **Instance method:** If `counter.add(3)` changes one object from 5 to 8, another independent counter object is unchanged.

5. **Reference parameter:** Passing an object reference to a method allows the method to mutate that object through its fields or mutating methods.


**Authoring-only failure consequence:** A wrong call can certify a patch that changed only the simulator while the live power controller remains uncorrected.

**Authoring-only later travel:** Evidence unlocks Power & Thermal Plant; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 4 localized several failures to shared utility code, but the first patch changes simulation and leaves the live controller untouched. Java variables can hold references to objects, and two references with similar-looking state do not necessarily point to the same object. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: The satellite console now shows rescue messages arriving several minutes late, threatening the weather window.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M5-B1 — On arrival at Software Lab

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Version Rack shows simulator C17 and live controller P02 with different object IDs.  
**Dialogue bubble — Priya Nair, software architect:** “The method can be right and still hit the wrong object. Prove which reference reaches P02.”  
**Unlocks:** Stop 17.

### Beat M5-B2 — After Stops 17 and 18

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** C17 and P02 are confirmed as separate objects, and the constructor evidence is written beside both IDs.  
**Panel text:** “Same class, different objects; the live path still has to be traced.”  
**Unlocks:** Stop 19 at the Build Console.

### Beat M5-B3 — After Stop 19

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The trace shows `active → C17` and `live → P02`.  
**Waypoint:** “Take the live-reference result to the Generator Controller in Power & Thermal Plant.”  
**Unlocks:** Power & Thermal Plant and Stop 20.

### Beat M5-B4 — After Stop 20

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final object identity and verified live patch.  
**Panel text:** “The patch reached simulator C17 first; the corrected live reference reaches P02.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M5-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** P02 changes only after the corrected reference is used; the Emergency Radio now shows raw time `08:07` beside display time `08:0`, exposing the next contradiction.  
**Dialogue bubble — Malik Okafor, power and thermal engineer:** “Now I can see why the simulator fooled us. Show me object identity before I trust the next patch.”  
**Waypoint:** “Inspect P02’s verified limit, then look at the mismatched rescue timestamp before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 locations:** Software Lab → Power & Thermal Plant. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Malik Okafor, Power and thermal engineer,** pushes to keep heat and power above survival limits.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Class anatomy: fields, encapsulation, and object state:** Object state belongs to each instance unless state is explicitly shared.

- **Constructors and initialization:** Constructors establish initial object state; `this` distinguishes the object's field from a parameter with the same name.

- **Passing and returning object references:** Passing an object reference lets a method operate on the referenced object's state; aliasing means two variables can point to one object.

- **Assignment, input, and reassignment:** Instance methods operate on the receiver object's state, represented by `this` inside the method.


## H1. Stop 17 — Inspect object state

**Format/placement:** CASEBOOK, Priya Nair beside the Version Rack.

**Metadata:** Concept: 21 — Class anatomy: fields, encapsulation, and object state; Keystone: Object state & references, State & assignment; Area: CODE; Prerequisites: Delayed retrieval of state/assignment from Mission 1 in an object context.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the patch is modifying the intended live controller object or a different object with similar state.

**Call — exact player copy:** Go to Software Lab and meet Priya Nair, software architect, beside the Version Rack.

**Stop reason — exact player copy:** Priya needs to know why a patch changes the simulator but leaves live controller P02 untouched.

**Question card story setup — exact player copy (41 words; 2 sentences):** The software mirror shows simulator controller C17 and live controller P02 with the same class and similar limits, yet only C17 changes after the patch. Match each evidence row to the interpretation that distinguishes object identity from merely matching field values.

**Question card story-science connection — exact player copy:** Two objects can look alike while storing separate state, so the patch target must be identified by reference rather than appearance.

**Format-specific interaction block:**
```yaml
scenarios:
  - {id: c17_after_patch, label: "C17 after patch", reading: "id C17; limit 90"}
  - {id: p02_after_patch, label: "P02 after patch", reading: "id P02; limit 70"}
  - {id: identity_test, label: "Identity comparison", reading: "C17 == P02 is false"}
  - {id: class_test, label: "Class comparison", reading: "both are PowerController objects"}
choices:
  - {id: patch_landed_c17, label: "C17 received the patch"}
  - {id: p02_unchanged, label: "P02 did not receive the patched state"}
  - {id: different_objects, label: "The references identify different objects"}
  - {id: same_class_only, label: "Same class does not mean same object"}
mapping: {c17_after_patch: patch_landed_c17, p02_after_patch: p02_unchanged, identity_test: different_objects, class_test: same_class_only}
```

**Question card prompt — exact player copy:** Match each evidence row to the interpretation it supports, then submit whether C17 and P02 are the same object.

**Correct result:** C17 and P02 are different objects; only C17 received the patch.

**Answer text:** Their identifiers and field states diverge, and the identity comparison is false even though both objects use the same class.

**Why/mechanism:** Object state belongs to each instance unless state is explicitly shared.

**Wrong-path feedback:**

- Treating same class as same object confuses type with identity.

- Ignoring the unchanged P02 field misses the live-state evidence.

**State/output:** The Version Rack labels C17 `SIMULATION OBJECT` and P02 `LIVE OBJECT`.

**Unlock:** Stop 18.

**Retrieval:** Delayed retrieval of state/assignment from Mission 1 in an object context.

**Later payoff:** Stop 18 checks whether P02 was initialized from the intended constructor path.


## H2. Stop 18 — Check initialization

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 22 — Constructors and initialization; Keystone: Object state & references, Methods & abstraction; Area: CODE; Prerequisites: Builds on object identity from Stop 17.; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the patch is modifying the intended live controller object or a different object with similar state.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** Stop 17 proved the patch reached C17, so the team must verify how the live P02 object was constructed before following references further.

**Question card story setup — exact player copy (39 words; 2 sentences):** P02 should start with identifier `P02` and a 70 percent safety limit, but one constructor call swaps the arguments. Build the constructor and call that produce the displayed live state without silently changing which value belongs to which field.

**Question card story-science connection — exact player copy:** A reference trace is only useful after the object itself has been initialized with the state the crew thinks it has.

**Format-specific interaction block:**
```yaml
derive:
  start: "class PowerController { String id; int limit; PowerController(String id, int limit) { ... } }"
  goal: "initialize an object from supplied constructor arguments"
  steps:
    - id: constructor
      prompt: "Choose the constructor body."
      choices:
        - {line: "this.id = id; this.limit = limit;", correct: true}
        - {line: "this.id = \"P02\"; this.limit = 90;", correct: false, survives: true, why: "Hard-coding values ignores the arguments, so every constructed object would receive the same identity and limit."}
    - id: call
      prompt: "Choose the object construction."
      choices:
        - {line: "new PowerController(\"P02\", 70);", correct: true}
        - {line: "new PowerController(\"70\", 70 + 0);", correct: false, survives: true, why: "The first argument is the object ID, so passing \"70\" creates the wrong identity even though the numeric limit is 70."}
```

**Question card prompt — exact player copy:** Choose the constructor assignments and the call that create P02 with identifier P02 and limit 70.

**Correct result:** `this.id = id; this.limit = limit;` and `new PowerController("P02", 70);`.

**Answer text:** The constructor copies each parameter into the corresponding instance field, producing the intended live state.

**Why/mechanism:** Constructors establish initial object state; `this` distinguishes the object's field from a parameter with the same name.

**Wrong-path feedback:**

- Hard-coding a later patched value hides the initialization contract.

- Swapping text and numeric meaning corrupts both fields.

**State/output:** The Code Review Wall shows P02 construction VERIFIED with `id=P02, limit=70`.

**Unlock:** Stop 19.

**Retrieval:** Builds on object identity from Stop 17.

**Later payoff:** Stop 19 follows which reference actually points to this verified P02 object.


## H3. Stop 19 — Follow the live reference

**Format/placement:** TRACE, Build Console.

**Metadata:** Concept: 24 — Passing and returning object references; Keystone: Object state & references, Methods & abstraction; Area: CODE; Prerequisites: Combines object identity and constructor state from Stops 17–18.; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether the patch is modifying the intended live controller object or a different object with similar state.

**Call — exact player copy:** Go to the Build Console in Software Lab.

**Stop reason — exact player copy:** P02 is constructed correctly, so the remaining question is which references flow into the patch method.

**Question card story setup — exact player copy (39 words; 2 sentences):** The build graph shows four channels named `sim`, `live`, `active`, and `backup`; two eventually reach C17 while one reaches P02 and one reaches B04. Open each dependency and identify which argument must be passed to patch the live controller.

**Question card story-science connection — exact player copy:** The patch only changes the physical station if the method receives a reference to P02 rather than a simulation or backup object.

**Format-specific interaction block:**
```yaml
trace:
  resources:
    - {id: active_ref, label: "Reference currently passed to applyPatch"}
    - {id: live_ref, label: "Direct reference to live controller P02"}
    - {id: backup_ref, label: "Direct reference to backup controller B04"}
  target: active_ref
  shared_resource: "Reference currently passed to applyPatch"
  channels:
    - {id: sim, label: "sim reference", reading: "C17", depends: [active_ref], depends_on_shared: true}
    - {id: active, label: "active reference", reading: "C17", depends: [active_ref], depends_on_shared: true}
    - {id: live, label: "live reference", reading: "P02", depends: [live_ref], depends_on_shared: false}
    - {id: backup, label: "backup reference", reading: "B04", depends: [backup_ref], depends_on_shared: false}
  independent: [live, backup]
  commit: "Name the shared reference that makes sim and active agree, then identify which reference reaches P02."
  correctConclusion: "sim and active share active_ref and both point to C17; live_ref is the independent path that reaches P02."
```

**Question card prompt — exact player copy:** Open all four reference paths, identify the two aliases that reach C17, and submit the reference that reaches P02.

**Correct result:** `sim` and `active` both reach C17; `live` reaches P02.

**Answer text:** The patch method receives an object reference, so aliases to C17 modify the same simulation object while `live` is the distinct reference to P02.

**Why/mechanism:** Passing an object reference lets a method operate on the referenced object's state; aliasing means two variables can point to one object.

**Wrong-path feedback:**

- Choosing `active` follows an alias to C17.

- Choosing `backup` reaches B04, not P02.

**State/output:** The Build Console draws `live → P02` as the only approved patch path.

**Unlock:** Stop 20.

**Retrieval:** Combines object identity and constructor state from Stops 17–18.

**Later payoff:** Travel to the Power & Thermal Plant unlocks for the first live-object test.


## H4. Stop 20 — Patch the live controller

**Format/placement:** VERIFY, Generator Controller.

**Metadata:** Concept: 4 — Assignment, input, and reassignment; Keystone: Object state & references, Debugging & tests; Area: POWER; Prerequisites: Combines object state, constructor, references, and instance methods.; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether the patch is modifying the intended live controller object or a different object with similar state.

**Call — exact player copy:** Go to the Generator Controller in Power & Thermal Plant.

**Stop reason — exact player copy:** The live reference is now known, but Malik will not accept the patch until the method's effect on P02 is predicted before operation.

**Question card story setup — exact player copy:** P02 starts with limit 70 while C17 already holds 90, and `applyPatch(live)` calls `setLimit(90)` on the object referenced by `live`. Commit P02's final limit before the isolated patch reveals which live object changed.

**Question card story-science connection — exact player copy:** A method call through the correct reference should change P02 while leaving the simulator object's state independent.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit P02's limit after applyPatch(live) before APPLY unlocks."
  predictionRange: {min: 60, max: 100, step: 5, unit: "limit"}
  truth: 90
  measurement:
    label: "P02 limit after patch"
    cost: 1
  correct_action: "Accept the live-reference repair."
  answerText: "P02 changes from 70 to 90 because `live` references P02, while C17 remains at its existing 90; the patch reached the intended live controller."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial P02's final limit. OPERATE: run the isolated patch through `live`. MEASURE: reveal P02's limit after the call. INTERPRET: compare it with C17's unchanged state and submit ACCEPT or REJECT.

**Correct result:** P02=90; C17 remains 90; ACCEPT.

**Answer text:** Calling an instance method through `live` sends the message to P02, changing that object's field without copying or replacing C17.

**Why/mechanism:** Instance methods operate on the receiver object's state, represented by `this` inside the method.

**Wrong-path feedback:**

- Predicting P02=70 ignores the verified reference path.

- Predicting C17 changes because of this call confuses existing equal values with shared identity.

- REJECT contradicts all three committed measurements.

**State/output:** The Generator Controller displays `P02 PATCHED VIA LIVE REFERENCE`; C17 remains explicitly labeled simulation.

**Unlock:** Beat M5-B4 and the Mission 5 outcome.

**Retrieval:** Combines object state, constructor, references, and instance methods.

**Later payoff:** Mission 6 begins with a communications symptom that may be network or String handling.


## I. Mission outcome

**Mission decision:** The patch changed simulator C17, not live controller P02. The trace shows `active` points to C17 and `live` points to P02. The crew fixes the live reference and checks P02. A rescue message then shows `08:0` while the raw packet shows `08:07`.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 5 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** P02 is patched through the correct live reference and the power controller returns to verified service.  
**Automatic bar change:** HABITAT +0 | POWER +4 | CONTROL +6 | RESCUE +0  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/0/0/4; expected bars = 78/74/85/74, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Object state belongs to each instance unless state is explicitly shared.

- Instance methods operate on the receiver object's state, represented by `this` inside the method.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The patch is modifying simulator object C17, not live controller P02; the live reference path must be corrected before the method call can matter.


---
# Mission 6 — THE MESSAGE WITH THE WRONG MINUTE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 26 HOURS REMAIN

**Card title:** THE MESSAGE WITH THE WRONG MINUTE

**Go now:** Go to the Packet Monitor in Communications & Weather.

**Card body (63 words; 4 sentences):** The live power patch works, but rescue messages now appear late on station displays. Network transport and String parsing are separate stages that can disagree about the same message. At Communications and the Software Lab, trace both stages before abandoning a healthy satellite path. By the end of the mission, decide whether the rescue link is late or the timestamp parser is wrong.

**Objective:** Gather enough code and station evidence to decide whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **packet:** a chunk of network data routed independently before messages are reassembled.

- **String:** an object that stores an ordered sequence of characters.

- **substring:** a String method that returns characters from a chosen start index up to, but not including, an end index.


#### Primer concepts

- Network delivery and local parsing are separate stages.

- Java String indexes start at zero, and `substring(start,end)` excludes the end index.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **String length:** `"hello".length()` is `5`.

2. **Substring bounds:** `"abcdef".substring(2,5)` returns `"cde"` because index 2 is included and index 5 is excluded.

3. **Character position:** `"JAVA".indexOf("V")` returns `2` because Java String indexes start at 0.

4. **Equality:** `"cat".equals(word)` tests String contents; `==` tests whether two references point to the same object.

5. **API contract:** If a library method documents an exclusive end index, follow that contract directly rather than guessing from visible character count.


**Authoring-only failure consequence:** A wrong call can discard a healthy rescue link or leave a timestamp parser defect in service.

**Authoring-only later travel:** Evidence unlocks Software Lab; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 5 proved that a correct method is useless if the program reaches the wrong object. Rescue messages travel through network paths, then station code parses timestamp characters before displaying the arrival time. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: A habitat room suddenly appears dangerously cold while neighboring measurements disagree, forcing an indexing check.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M6-B1 — On arrival at Communications & Weather

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Packet Monitor shows raw rescue time `08:07` while the wall display shows `08:0`.  
**Dialogue bubble — Liv Andersen, communications and weather lead:** “Do not call the link late until the raw packet and an independent clock say it is late.”  
**Unlocks:** Stop 21.

### Beat M6-B2 — After Stops 21 and 22

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The raw packet and independent clocks agree on 08:07, and index 15 is marked over the final `7`.  
**Panel text:** “Transport is on time; the defect is downstream of the packet path.”  
**Waypoint:** “Take the indexed timestamp to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 23.

### Beat M6-B4 — After Stop 24

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The corrected parser restores 08:07 on both station displays.  
**Panel text:** “The network is on time; the substring boundary dropped the final minute digit.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M6-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The wall display returns to 08:07 and the satellite path stays active; Habitat Control posts Room 7 at `4.1°C` beside an independent local reading of `20.9°C`.  
**Dialogue bubble — Liv Andersen, communications and weather lead:** “The packets were on time. I am keeping the link because the independent clocks agree, not because the screen looks better.”  
**Waypoint:** “Inspect the repaired timestamp, then look at the conflicting Room 7 readings before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 locations:** Communications & Weather → Software Lab. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Liv Andersen, Communications and weather lead,** pushes to hold a satellite path and identify a safe rescue window. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Networks, packets, protocols, redundancy, and cybersecurity:** Redundant independent observations can localize a fault by showing which dependency they do not share.

- **String objects and common String methods:** String methods use exact character indexes, making off-by-one boundaries visible and testable.

- **String traversal and string algorithms:** String traversal and slicing depend on index boundaries, and an exclusive endpoint is a common source of off-by-one bugs.

- **APIs and library methods:** Library methods are abstractions whose documented index rules can be tested against known input and output.


## H1. Stop 21 — Check the network path

**Format/placement:** TRACE, Packet Monitor.

**Metadata:** Concept: 37 — Networks, packets, protocols, redundancy, and cybersecurity; Keystone: Reliability & redundancy; Area: COMMS; Prerequisites: Introduces reliability and shared-dependency reasoning.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly.

**Call — exact player copy:** Go to the Packet Monitor in Communications & Weather.

**Stop reason — exact player copy:** Liv needs to know whether the apparent late message is already visible in the network path before software parsing is blamed.

**Question card story setup — exact player copy (43 words; 2 sentences):** The rescue packet reaches the station through satellite hop S1 and router AR-2, while a local clock feed and rover radio use different upstream paths. Open all four dependencies and identify whether the delayed display shares a transport failure with the packet capture.

**Question card story-science connection — exact player copy:** Independent path evidence can separate network transport delay from a later display or parsing error.

**Format-specific interaction block:**
```yaml
trace:
  resources:
    - {id: ar2, label: "Antenna Router AR-2"}
    - {id: parser, label: "Station timestamp parser"}
    - {id: clk1, label: "Local clock CLK-1"}
    - {id: vr3, label: "Rover radio clock VR-3"}
  target: ar2
  shared_resource: "Antenna Router AR-2"
  channels:
    - {id: packet, label: "raw rescue packet", reading: "08:07", depends: [ar2], depends_on_shared: true}
    - {id: display, label: "wall display message", reading: "08:0", depends: [ar2, parser], depends_on_shared: true}
    - {id: local, label: "local station clock", reading: "08:07", depends: [clk1], depends_on_shared: false}
    - {id: rover, label: "rover radio clock", reading: "08:07", depends: [vr3], depends_on_shared: false}
  independent: [local, rover]
  commit: "Name the shared network resource and decide whether the mismatch begins in transport or after transport."
  correctConclusion: "The packet and wall display share AR-2, while independent clocks agree with the packet; the mismatch appears after transport in the parser/display path."
```

**Question card prompt — exact player copy:** Open all four dependency paths and submit whether the evidence points to network transport or downstream parsing.

**Correct result:** The packet arrives at 08:07; the mismatch is downstream of transport.

**Answer text:** The raw packet and two independent clocks agree on 08:07, while only the parsed display loses a character.

**Why/mechanism:** Redundant independent observations can localize a fault by showing which dependency they do not share.

**Wrong-path feedback:**

- Network-delay diagnosis cannot explain a raw packet already stamped 08:07.

- Local and rover clocks are independent controls that agree with the packet.

**State/output:** The Packet Monitor marks `TRANSPORT ON TIME / DISPLAY MISMATCH DOWNSTREAM`.

**Unlock:** Stop 22.

**Retrieval:** Introduces reliability and shared-dependency reasoning.

**Later payoff:** Stop 22 inspects the String that enters the parser.


## H2. Stop 22 — Read the timestamp String

**Format/placement:** CHOICE, Liv Andersen at the Message Queue Board.

**Metadata:** Concept: 10 — String objects and common String methods; Keystone: Data quality & representation; Area: COMMS; Prerequisites: Retrieves data representation after several missions by treating the timestamp as stored characters.; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Briefing decision advanced:** whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly.

**Call — exact player copy:** Go to Communications & Weather and meet Liv Andersen, communications and weather lead, at the Message Queue Board.

**Stop reason — exact player copy:** The packet is on time, so Liv needs the exact character positions of its timestamp before the parser can be traced.

**Question card story setup — exact player copy (38 words; 2 sentences):** The captured text is `2026-09-08 08:07`, and Java indexes its String characters from zero. Choose the character at index 15 so the crew can verify where the final minute digit sits relative to the current substring boundary.

**Question card story-science connection — exact player copy:** Correct indexing of the raw String tells the team whether the parser is cutting data before it ever reaches the display.

**Format-specific interaction block:**
```yaml
question: "What character is at index 15 in \"2026-09-08 08:07\"?"
choices:
  - "\"7\""
  - "\"0\""
  - "\":\""
  - "\"8\""
answer: "\"7\""
why: "Indexes 11–15 are 0,8,:,0,7, so index 15 is the final minute digit 7."
rebuttals:
  "\"0\"": "The second minute tens digit is at index 14."
  "\":\"": "The colon is at index 13."
  "\"8\"": "The hour ones digit is at index 12."
```

**Question card prompt — exact player copy:** Count from index zero and submit the character stored at String index 15.

**Correct result:** Index 15 contains `7`.

**Answer text:** Java String indexes start at zero, so the final character of `08:07` is index 15 in the full timestamp.

**Why/mechanism:** String methods use exact character indexes, making off-by-one boundaries visible and testable.

**Wrong-path feedback:**

- Each distractor is a nearby character but not index 15.

**State/output:** Liv marks index 15 above the final `7` on the Message Queue Board.

**Unlock:** Stop 23.

**Retrieval:** Retrieves data representation after several missions by treating the timestamp as stored characters.

**Later payoff:** Stop 23 traces the exclusive end boundary used by substring.


## H3. Stop 23 — Trace the substring

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 18 — String traversal and string algorithms; Keystone: Data quality & representation, Methods & abstraction; Area: CODE; Prerequisites: Combines String indexing from Stop 22 with a library method.; Learning role: COMBINE; Difficulty: L3; Story role: reveal.

**Briefing decision advanced:** whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** Stop 22 placed the final minute digit at index 15, so the current substring must include that character to display the full time.

**Question card story setup — exact player copy (34 words; 2 sentences):** The parser currently calls `timestamp.substring(11, 15)`, which includes index 11 but stops before index 15. Build the correct call and resulting String so the packet's `08:07` value survives the parser unchanged.

**Question card story-science connection — exact player copy:** The display can only show the correct minute if the method's exclusive end index extends one position beyond the final character needed.

**Format-specific interaction block:**
```yaml
derive:
  start: "String timestamp = \"2026-09-08 08:07\";"
  goal: "extract the five-character HH:MM field"
  steps:
    - id: end
      prompt: "Choose the substring call."
      choices:
        - {line: "timestamp.substring(11, 16)", correct: true}
        - {line: "timestamp.substring(11, 15)", correct: false, survives: true, why: "Java excludes the end index, so ending at 15 omits the final minute digit and returns only four characters."}
    - id: result
      prompt: "Choose the returned String."
      choices:
        - {line: "\"08:07\"", correct: true}
        - {line: "\"08:0\" — end index 15 excludes index 15", correct: false, survives: true, why: "That truncated String is the old buggy output; it cannot be the result of the repaired call ending at 16."}
```

**Question card prompt — exact player copy:** Choose the substring call and the exact String it returns.

**Correct result:** `substring(11,16)` returns `"08:07"`.

**Answer text:** Java includes the start index and excludes the end index, so end 16 is required to include character 15.

**Why/mechanism:** String traversal and slicing depend on index boundaries, and an exclusive endpoint is a common source of off-by-one bugs.

**Wrong-path feedback:**

- End 15 reproduces the truncated display.

- `08:0` is the old parser result and omits index 15.

**State/output:** The Code Review Wall replaces `substring(11,15)` with `substring(11,16)`.

**Unlock:** Stop 24.

**Retrieval:** Combines String indexing from Stop 22 with a library method.

**Later payoff:** Stop 24 verifies the corrected parser against the captured packet.


## H4. Stop 24 — Repair message parsing

**Format/placement:** VERIFY, Build Console.

**Metadata:** Concept: 7 — APIs and library methods; Keystone: Methods & abstraction, Debugging & tests; Area: CODE; Prerequisites: Delayed retrieval of method/abstraction reasoning from Mission 4.; Learning role: RETRIEVE; Difficulty: L3; Story role: decision.

**Briefing decision advanced:** whether rescue messages are actually arriving late or the station software is displaying the timestamp incorrectly.

**Call — exact player copy:** Go to the Build Console in Software Lab.

**Stop reason — exact player copy:** The parser call is repaired, but the rescue window depends on proving the method returns the same time already present in the packet.

**Question card story setup — exact player copy:** The captured packet contains `2026-09-08 08:07`, and the corrected parser now uses `substring(11,16)`. Commit the numeric minute field the repaired display should show before the parser test reveals its measured output.

**Question card story-science connection — exact player copy:** Agreement after a frozen prediction can clear the network path and keep the rescue window open.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the numeric minute field the corrected parser will display before TEST unlocks."
  predictionRange: {min: 0, max: 59, step: 1, unit: "minute"}
  truth: 7
  measurement:
    label: "parsed minute field"
    cost: 1
  correct_action: "Keep the network path; deploy the parser repair."
  answerText: "The corrected substring returns 08:07, so the parsed minute is 7 and both independent clocks agree; the apparent delay came from the parser, not the network."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the minute value the corrected parser should display. OPERATE: run the repaired method on the captured packet. MEASURE: reveal the parsed minute. INTERPRET: compare the full 08:07 display with the independent clocks and submit NETWORK DELAY or PARSER ERROR.

**Correct result:** Minute 7; full display 08:07; PARSER ERROR.

**Answer text:** The same packet time survives the corrected String method and matches independent clocks, localizing the defect to the old parser.

**Why/mechanism:** Library methods are abstractions whose documented index rules can be tested against known input and output.

**Wrong-path feedback:**

- NETWORK DELAY contradicts the raw packet and independent clocks.

- 08:0 repeats the old exclusive-end mistake.

**State/output:** The Build Console marks the parser VERIFIED and Communications removes `NETWORK DELAY` from the incident board.

**Unlock:** Beat M6-B4 and the Mission 6 outcome.

**Retrieval:** Delayed retrieval of method/abstraction reasoning from Mission 4.

**Later payoff:** Mission 7 applies indexing to a physical sensor array.


## I. Mission outcome

**Mission decision:** The rescue link is on time; the time parser is wrong. The raw packet and two clocks show 08:07, but the String cut drops the last digit. The crew keeps the link and fixes the cut. Habitat Control then labels Room 7 as 4.1°C while a local reading shows 20.9°C.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 6 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The timestamp parser is repaired and the rescue link remains available.  
**Automatic bar change:** HABITAT +0 | POWER +0 | CONTROL +4 | RESCUE +6  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/4/0/0; expected bars = 78/78/89/80, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Redundant independent observations can localize a fault by showing which dependency they do not share.

- Library methods are abstractions whose documented index rules can be tested against known input and output.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The network is on time; the parser cuts the timestamp one character early, turning 08:07 into 08:0 on two displays.


---
# Mission 7 — THE ARRAY WITH A HOLE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 24 HOURS REMAIN

**Card title:** THE ARRAY WITH A HOLE

**Go now:** Go to the Sensor Probe Rack in Habitat Control.

**Card body (67 words; 4 sentences):** The rescue packet was on time, but Room 7 now appears dangerously cold while nearby readings disagree. The habitat controller stores room temperatures in an indexed array, so one shifted index can attach a real value to the wrong room. At Habitat Control and the Software Lab, trace the mapping before moving anyone. By the end of the mission, decide whether Room 7 is unsafe or misindexed.

**Objective:** Gather enough code and station evidence to decide whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **array:** a fixed-length indexed collection whose elements all use one declared type.

- **index:** the numbered position used to access an element; Java arrays and lists start at index zero.

- **Boolean expression:** a comparison or logical test whose value is true or false.


#### Primer concepts

- Java arrays use indexes from zero through length minus one.

- A value can be correct while its mapping to a real-world label is wrong.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Array indexes:** `int[] a = {4,7,9};` has legal indexes `0,1,2`; `a[3]` is out of bounds.

2. **Same-index pairing:** If `names[i]` and `scores[i]` describe the same student, changing one side to `i+1` misaligns the data.

3. **Full traversal:** `for(int i=0;i<a.length;i++)` visits every legal element exactly once.

4. **Maximum:** For `{3,8,5}`, initialize `max=3`, compare 8 to get `max=8`, then compare 5 and keep `8`.

5. **Filter count:** For `{2,-1,4,0}`, a loop that increments only when `x>0` returns `2`.


**Authoring-only failure consequence:** A wrong call can evacuate a safe room or leave people in a room that is truly too cold.

**Authoring-only later travel:** Evidence unlocks Software Lab; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 6 showed that correct network data can become wrong when software extracts the wrong characters. The habitat controller stores room temperatures in an indexed array, so one shifted position can attach a real reading to the wrong room. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: The incident log now appears to omit every second recovery action, raising the question of whether records are missing or skipped during processing.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M7-B1 — On arrival at Habitat Control

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Sensor Probe Rack shows Room 7 at 20.9°C while the controller label shows 4.1°C.  
**Dialogue bubble — Mei Alvarez, habitat systems lead:** “Before I move anyone, tell me which value belongs to which room.”  
**Unlocks:** Stop 25.

### Beat M7-B2 — After Stops 25 and 26

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** Independent readings place 4.1°C in Room 6 and 20.9°C in Room 7; the traversal order is confirmed.  
**Panel text:** “The physical readings are consistent; the remaining fault is the label/index mapping.”  
**Unlocks:** Stop 27 at the Sensor Wall.

### Beat M7-B3 — After Stop 27

**Presentation:** waypoint_notification.  
**Player control:** Immediate return.  
**World state:** The shifted index is marked in the mission log.  
**Waypoint:** “Take the corrected mapping to the Test Bench in Software Lab.”  
**Unlocks:** Software Lab and Stop 28.

### Beat M7-B4 — After Stop 28

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** Room labels and independent temperatures agree after the corrected mapping.  
**Panel text:** “Room 7 is safe; the emergency came from a shifted array index.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M7-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** Room 7 remains occupied and the Sensor Wall restores the correct labels; the Shift Log Desk now shows gaps at every second recovery entry.  
**Dialogue bubble — Mei Alvarez, habitat systems lead:** “Room 7 stays occupied. From now on I want the sensor value and the array index together.”  
**Waypoint:** “Inspect the corrected Room 7 label, then look at the patterned log gaps before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 locations:** Habitat Control → Software Lab. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Mei Alvarez, Habitat systems lead,** pushes to keep air and water stable while controllers are isolated. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Arrays: creation, access, default values, and bounds:** Arrays store values by index, and a wrong mapping can attach a correct element to the wrong real-world label.

- **Array traversals and array algorithms:** Array traversal uses a loop variable as an index; bounds and same-index relationships are part of algorithm correctness.

- **Arrays: creation, access, default values, and bounds:** Index expressions are ordinary integer expressions, so an off-by-one error can be traced numerically.

- **Selection-and-iteration algorithms: count, sum, min/max, search:** Selection-and-iteration algorithms often combine traversal with tests such as count, search, or threshold classification.


## H1. Stop 25 — Map sensor positions

**Format/placement:** PROBE, Sensor Probe Rack.

**Metadata:** Concept: 26 — Arrays: creation, access, default values, and bounds; Keystone: Collections & indexing; Area: HAB; Prerequisites: Introduces collection/index mapping.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element.

**Call — exact player copy:** Go to the Sensor Probe Rack in Habitat Control.

**Stop reason — exact player copy:** Mei needs the physical room labels compared with the array entries before she evacuates anyone from a cold-room alarm.

**Question card story setup — exact player copy (38 words; 2 sentences):** Four room stations each show an independent thermometer and the controller value read from `temps[index]`. Probe every station and compare observed room temperature with the expected array mapping to find where the controller's position-to-room relationship first breaks.

**Question card story-science connection — exact player copy:** Station-by-station expected values can reveal an indexing problem even when every numeric reading is individually plausible.

**Format-specific interaction block:**
```yaml
probe:
  stations:
    - {id: r5, label: "Room 5", reading: "20.4 °C", expected: "20.4 °C", load: "temps[0]"}
    - {id: r6, label: "Room 6", reading: "4.1 °C", expected: "4.1 °C", load: "temps[1]"}
    - {id: r7, label: "Room 7", reading: "20.9 °C", expected: "20.9 °C", load: "temps[2]"}
    - {id: vest, label: "Vestibule", reading: "7.0 °C", expected: "7.0 °C", load: "temps[3]"}
  target: r7
  quantityAndUnits: "Compare each room's physical temperature with its expected reading and determine whether Room 7 is actually cold."
  correctConclusion: "Room 7 is 20.9 °C, so the physical readings are consistent and the controller label mapping is suspect."
```

**Question card prompt — exact player copy:** Probe all four stations, compare each observed reading with its explicit expected value, and submit where the pattern breaks.

**Correct result:** The physical station readings are consistent; the controller's room-label mapping is the suspect layer.

**Answer text:** Each thermometer agrees with its own expected room value, so the alarming 4.1°C exists physically but belongs to Room 6 rather than Room 7.

**Why/mechanism:** Arrays store values by index, and a wrong mapping can attach a correct element to the wrong real-world label.

**Wrong-path feedback:**

- Calling the 4.1°C value fabricated ignores the independent Room 6 thermometer.

- Evacuating Room 7 before mapping the indexes confuses value correctness with label correctness.

**State/output:** The Sensor Wall places index numbers beside all four room labels.

**Unlock:** Stop 26.

**Retrieval:** Introduces collection/index mapping.

**Later payoff:** Stop 26 traces the loop that builds the label mapping.


## H2. Stop 26 — Trace the sensor loop

**Format/placement:** DERIVE, Habitat Control — Sensor Wall.

**Metadata:** Concept: 27 — Array traversals and array algorithms; Keystone: Collections & indexing, Iteration; Area: HAB; Prerequisites: Delayed retrieval of iteration from Mission 3.; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element.

**Call — exact player copy:** Go to the Sensor Wall in Habitat Control.

**Stop reason — exact player copy:** Stop 25 proved the values are real but attached to the wrong room labels, so the loop that copies array entries into display rows is next.

**Question card story setup — exact player copy (35 words; 2 sentences):** The display loop should pair `labels[i]` with `temps[i]` for indexes zero through three, but one candidate increments the temperature index twice. Build the traversal that visits every element once and preserves same-index pairing.

**Question card story-science connection — exact player copy:** A correct traversal should keep Room 6's 4.1°C value at the same index as the Room 6 label.

**Format-specific interaction block:**
```yaml
derive:
  start: "String[] labels = {...}; double[] temps = {...}; both arrays have matching indexes and the same length."
  goal: "visit every legal index once and pair each label with the value at that same index"
  steps:
    - id: header
      prompt: "Choose the traversal header."
      choices:
        - {line: "for (int i = 0; i < temps.length; i++) {", correct: true}
        - {line: "for (int i = 0; i <= temps.length; i++) {", correct: false, survives: true, why: "The final legal index is length-1; using <= lets i become length and access one position past the end."}
    - id: pair
      prompt: "Choose the display pairing."
      choices:
        - {line: "show(labels[i], temps[i]);", correct: true}
        - {line: "show(labels[i], temps[i+1]);", correct: false, survives: true, why: "Using i+1 shifts every value one label forward and eventually reads past the array instead of preserving same-index correspondence."}
```

**Question card prompt — exact player copy:** Choose the loop header and element pairing that display every valid sensor once without shifting indexes.

**Correct result:** `i < temps.length` and `show(labels[i], temps[i]);`.

**Answer text:** Valid array indexes are zero through length minus one, and the same `i` must select the corresponding label and temperature.

**Why/mechanism:** Array traversal uses a loop variable as an index; bounds and same-index relationships are part of algorithm correctness.

**Wrong-path feedback:**

- `<= length` eventually accesses an invalid index equal to length.

- `temps[i+1]` shifts every value and goes out of bounds on the final iteration.

**State/output:** The Sensor Wall highlights same-index pairs from 0 through 3.

**Unlock:** Stop 27.

**Retrieval:** Delayed retrieval of iteration from Mission 3.

**Later payoff:** Stop 27 checks the exact off-by-one symptom that produced the false room label.


## H3. Stop 27 — Catch the shifted index

**Format/placement:** CHOICE, Mei Alvarez at the Sensor Wall.

**Metadata:** Concept: 26 — Arrays: creation, access, default values, and bounds; Keystone: Collections & indexing; Area: HAB; Prerequisites: Practices array access from Stops 25–26.; Learning role: PRACTICE; Difficulty: L3; Story role: reveal.

**Briefing decision advanced:** whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element.

**Call — exact player copy:** Go to Habitat Control and meet Mei Alvarez, habitat systems lead, at the Sensor Wall.

**Stop reason — exact player copy:** The correct traversal uses matching indexes, but the live display code contains one explicit `temps[i - 1]` access for Room 7.

**Question card story setup — exact player copy (37 words; 2 sentences):** When the display row for Room 7 uses `i = 2`, the expression `temps[i - 1]` reads array index 1, whose value is 4.1°C from Room 6. Choose the controller value Room 7 will falsely display.

**Question card story-science connection — exact player copy:** Computing the exact wrong index explains the alarm without changing or discarding any physical temperature measurement.

**Format-specific interaction block:**
```yaml
question: "What value does Room 7 display when i=2 and the code reads temps[i-1]?"
choices:
  - "4.1 °C"
  - "20.9 °C"
  - "7.0 °C"
  - "array index 3"
answer: "4.1 °C"
why: "i-1 is 1, and temps[1] is the Room 6 value 4.1 °C."
rebuttals:
  "20.9 °C": "That is temps[2], the correct same-index value, not temps[i-1]."
  "7.0 °C": "That is temps[3], the vestibule value."
  "array index 3": "The prompt asks for the displayed temperature, and i-1 equals 1."
```

**Question card prompt — exact player copy:** Evaluate `i - 1` at `i = 2` and submit the temperature the buggy display assigns to Room 7.

**Correct result:** 4.1°C.

**Answer text:** Subtracting one from the display-row index maps Room 7 to Room 6's element.

**Why/mechanism:** Index expressions are ordinary integer expressions, so an off-by-one error can be traced numerically.

**Wrong-path feedback:**

- 20.9 is the correct index 2 value, not the buggy result.

- 7.0 comes from index 3.

- Index 3 is neither i-1 nor a temperature answer.

**State/output:** Mei tags the Room 7 alarm `VALUE FROM ROOM 6 / INDEX SHIFT`.

**Unlock:** Stop 28.

**Retrieval:** Practices array access from Stops 25–26.

**Later payoff:** Stop 28 verifies the corrected mapping before Room 7 is cleared.


## H4. Stop 28 — Certify the room map

**Format/placement:** VERIFY, Test Bench.

**Metadata:** Concept: 17 — Selection-and-iteration algorithms: count, sum, min/max, search; Keystone: Collections & indexing, Boolean logic, Debugging & tests; Area: CODE; Prerequisites: Combines array indexing with delayed Boolean retrieval from Mission 2.; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether Room 7 is truly cold enough to evacuate or the controller is reading another sensor's array element.

**Call — exact player copy:** Go to the Test Bench in Software Lab.

**Stop reason — exact player copy:** Room 7 should remain occupied only if the corrected traversal restores every room value and the safety check classifies the rooms correctly.

**Question card story setup — exact player copy:** The repaired map should place 20.9°C in Room 7, while the sleeping-room safety rule remains `temp >= 10.0`. Commit Room 7's mapped temperature before the mirror reveals the value used by the safety test.

**Question card story-science connection — exact player copy:** The final decision requires both the corrected array algorithm and a Boolean safety test on the value actually belonging to Room 7.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit Room 7's mapped temperature before TEST unlocks."
  predictionRange: {min: 0, max: 30, step: 0.1, unit: "°C"}
  truth: 20.9
  measurement:
    label: "Room 7 mapped temperature"
    cost: 1
  correct_action: "Keep Room 7 occupied; investigate Room 6 separately."
  answerText: "The corrected array maps 20.9°C to Room 7, making temp >= 10.0 true; the 4.1°C reading belongs to Room 6."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial Room 7's mapped temperature. OPERATE: run the corrected array mapping. MEASURE: reveal the mapped Room 7 value. INTERPRET: apply the 10.0°C safety rule and submit EVACUATE ROOM 7 or KEEP OCCUPIED.

**Correct result:** 20.9°C; safe=true; KEEP OCCUPIED.

**Answer text:** The same-index traversal restores the correct room/value pairing, and the Boolean threshold then evaluates the proper Room 7 element.

**Why/mechanism:** Selection-and-iteration algorithms often combine traversal with tests such as count, search, or threshold classification.

**Wrong-path feedback:**

- Evacuating Room 7 applies the real 4.1°C value to the wrong room.

- safe=false contradicts 20.9 >= 10.0.

- Changing Room 6's value would rewrite evidence rather than fix mapping.

**State/output:** The Test Bench marks Room 7 SAFE and routes a separate maintenance ticket to Room 6.

**Unlock:** Beat M7-B4 and the Mission 7 outcome.

**Retrieval:** Combines array indexing with delayed Boolean retrieval from Mission 2.

**Later payoff:** Mission 8 asks whether apparently missing records are another mapping problem or list mutation.


## I. Mission outcome

**Mission decision:** Room 7 is safe; the controller reads the wrong array item. Local room readings are right, but the code swaps the Room 6 and Room 7 labels. The crew cancels the move and fixes the index map. The incident view then loses every second record.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 7 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** Room 7 stays occupied after the array mapping is corrected, while one extra software-mirror test consumes power.  
**Automatic bar change:** HABITAT +6 | POWER -1 | CONTROL +5 | RESCUE +0  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/4/0/0; expected bars = 84/81/94/80, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Arrays store values by index, and a wrong mapping can attach a correct element to the wrong real-world label.

- Selection-and-iteration algorithms often combine traversal with tests such as count, search, or threshold classification.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** Room 7 is safe; the controller maps Room 6 and Room 7 to the wrong indexes, producing a false 4.1°C emergency.


---
# Mission 8 — THE LOG THAT SKIPS EVERY SECOND LINE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 22 HOURS REMAIN

**Card title:** THE LOG THAT SKIPS EVERY SECOND LINE

**Go now:** Go to Operations Module and meet Dr. Elena Park, station director, at the Shift Log Desk.

**Card body (63 words; 4 sentences):** Room 7 was safe, but the incident view now omits every second recovery action. The logger reads text into an ArrayList whose indexes shift when an element is removed. At Operations and the Software Lab, compare raw and processed records before anyone treats existing records as lost. By the end of the mission, decide whether records were never written or skipped during cleanup.

**Objective:** Gather enough code and station evidence to decide whether recovery records were never written or the program is skipping entries while it removes resolved records.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **ArrayList:** a resizable indexed collection that can add and remove elements while a program runs.

- **index:** the numbered position used to access an element; Java arrays and lists start at index zero.

- **edge case:** an input at a boundary or unusual condition that can expose a hidden bug.


#### Primer concepts

- Removing an ArrayList element shifts later elements one index left.

- Compare raw input with each processed stage before deciding where data were lost.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **ArrayList removal shifts indexes:** From `[A,B,C,D]`, removing index 1 leaves `[A,C,D]`; C immediately becomes index 1.

2. **Forward-removal trap:** Removing adjacent matching items while incrementing forward can skip the item that shifts into the removed index.

3. **Backward removal:** Starting at the final index and moving downward lets you remove elements without changing any lower index still unvisited.

4. **`set` versus `add`:** `list.set(1,"X")` replaces index 1; `list.add(1,"X")` inserts a new item and shifts later items right.

5. **Regression test:** If a bug involved adjacent removable items, keep an adjacent-match test so a future change cannot silently reintroduce the skip.


**Authoring-only failure consequence:** A wrong call can erase trust in records that still exist and hide the algorithm that removed them from the processed view.

**Authoring-only later travel:** Evidence unlocks Software Lab; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 7 proved that an indexing mistake can move a correct value onto the wrong physical target. The incident processor loads text records into an ArrayList, where removing an element shifts every later index one position left. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: A rover hazard map now places a crevasse one column away from its surveyed position, echoing the earlier indexing lesson in two dimensions.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M8-B1 — On arrival at Operations Module

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Shift Log Desk shows the processed timeline with every second recovery action missing.  
**Dialogue bubble — Dr. Elena Park, station director:** “Do not call a record lost until the raw file says it was never there.”  
**Unlocks:** Stop 29.

### Beat M8-B2 — After Stops 29 and 30

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The raw file proves the records existed, while the parsed list preserves the same source entries before cleanup.  
**Panel text:** “The records survived ingestion; the omission happens during list mutation.”  
**Waypoint:** “Take the source-versus-view evidence to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 31.

### Beat M8-B4 — After Stop 32

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** Backward cleanup restores the correct retained list and zero resolved records.  
**Panel text:** “Forward removal skips shifted entries; backward traversal preserves the full cleanup.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M8-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** All six records return to the Shift Log Desk and the A-C-D-F trace stays pinned as a regression clue; the Route Table now shows a crevasse one column from its survey stake.  
**Dialogue bubble — Priya Nair, software architect:** “Keep the ugly A-C-D-F trace. If this pattern comes back, I want us to recognize it before we erase it.”  
**Waypoint:** “Inspect the restored timeline, then look at the shifted crevasse before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 locations:** Operations Module → Software Lab. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Dr. Elena Park, Station director,** pushes to keep 28 people alive and preserve the evacuation option. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Text files, wrapper classes, and data ingestion:** Text-file ingestion converts stored characters into program objects; comparing before and after states is a debugging control.

- **Data representation, precision, and data quality:** Data quality should be checked at pipeline boundaries rather than assuming the first visible wrong output identifies the faulty stage.

- **ArrayList methods, traversals, mutation, and algorithms:** Mutating a list during forward index traversal can skip elements because structure changes under the traversal.

- **Testing, debugging, edge cases, and incremental development:** Regression testing preserves a known failing case so a repaired mechanism is checked against the exact bug it is meant to prevent.


## H1. Stop 29 — Read the raw file

**Format/placement:** CASEBOOK, Dr. Elena Park at the Shift Log Desk.

**Metadata:** Concept: 28 — Text files, wrapper classes, and data ingestion; Keystone: Data quality & representation, Debugging & tests; Area: OPS; Prerequisites: Delayed retrieval of debugging/test comparison from Mission 4.; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether recovery records were never written or the program is skipping entries while it removes resolved records.

**Call — exact player copy:** Go to Operations Module and meet Dr. Elena Park, station director, at the Shift Log Desk.

**Stop reason — exact player copy:** Park needs to know whether six recovery actions were ever written before anyone accuses the incident logger of losing them.

**Question card story setup — exact player copy (41 words; 2 sentences):** The raw text file contains records A through F with timestamps and status labels, while the processed incident view shows only A, C, D, and F. Match the raw evidence to the conclusions it supports before the processing code is blamed.

**Question card story-science connection — exact player copy:** Raw-file evidence can distinguish missing source data from records that disappear only after a program transforms the file.

**Format-specific interaction block:**
```yaml
scenarios:
  - {id: raw_a, label: "Raw record A", reading: "A open exists in source file"}
  - {id: raw_b, label: "Raw record B", reading: "B resolved exists in source file"}
  - {id: raw_c, label: "Raw record C", reading: "C resolved exists adjacent to B"}
  - {id: processed_gap, label: "Processed view", reading: "B and E are missing after processing"}
choices:
  - {id: a_unresolved, label: "A remains an unresolved source record"}
  - {id: b_existed, label: "B existed before processing"}
  - {id: adjacent_resolved, label: "Adjacent resolved records exist in the source"}
  - {id: processing_loss, label: "The processing step can remove source records incorrectly"}
mapping: {raw_a: a_unresolved, raw_b: b_existed, raw_c: adjacent_resolved, processed_gap: processing_loss}
```

**Question card prompt — exact player copy:** Match the raw-file evidence to the conclusions it supports, then submit whether the missing records existed before processing.

**Correct result:** Yes; B and E exist in the raw file, so they disappear during processing.

**Answer text:** The source file preserves the records that the processed view lacks, localizing the loss to ingestion or later list operations.

**Why/mechanism:** Text-file ingestion converts stored characters into program objects; comparing before and after states is a debugging control.

**Wrong-path feedback:**

- Claiming B never existed contradicts the raw line.

- Calling the source file incomplete ignores six intact records.

**State/output:** The Shift Log Desk pins the complete raw file beside the shortened processed list.

**Unlock:** Stop 30.

**Retrieval:** Delayed retrieval of debugging/test comparison from Mission 4.

**Later payoff:** Stop 30 checks whether the parsed data themselves are corrupted.


## H2. Stop 30 — Check the parsed records

**Format/placement:** CHOICE, Dr. Elena Park at the Shift Log Desk.

**Metadata:** Concept: 36 — Data representation, precision, and data quality; Keystone: Data quality & representation; Area: OPS; Prerequisites: Combines raw-file ingestion with data-quality reasoning.; Learning role: COMBINE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether recovery records were never written or the program is skipping entries while it removes resolved records.

**Call — exact player copy:** Go to Operations Module and meet Dr. Elena Park, station director, at the Shift Log Desk.

**Stop reason — exact player copy:** The raw file proves the records existed, so Park needs to know whether parsing changed their labels before list mutation is examined.

**Question card story setup — exact player copy (31 words; 2 sentences):** The parser creates `[A open, B resolved, C resolved, D open, E resolved, F resolved]`, matching every raw status exactly before cleanup begins. Choose the conclusion supported by that before-and-after comparison.

**Question card story-science connection — exact player copy:** If parsed data match the raw file, the loss must occur in a later operation rather than during text conversion.

**Format-specific interaction block:**
```yaml
question: "What does the matching parsed list show?"
choices:
  - "Parsing preserved all six records and statuses"
  - "The raw file is missing B and E"
  - "The parser converted resolved to open"
  - "Only four records were ever loaded"
answer: "Parsing preserved all six records and statuses"
why: "The parsed list reproduces A–F and each raw status before cleanup starts."
rebuttals:
  "The raw file is missing B and E": "Stop 29 showed both records in the raw file."
  "The parser converted resolved to open": "The displayed parsed statuses match the raw statuses."
  "Only four records were ever loaded": "Six parsed objects are shown before cleanup."
```

**Question card prompt — exact player copy:** Compare the raw and parsed states and submit what stage of the pipeline has been cleared.

**Correct result:** Parsing preserved all six records and statuses.

**Answer text:** The exact source and parsed states agree before cleanup, so the later mutation algorithm becomes the next suspect.

**Why/mechanism:** Data quality should be checked at pipeline boundaries rather than assuming the first visible wrong output identifies the faulty stage.

**Wrong-path feedback:**

- Each wrong option contradicts an explicit raw or parsed record.

**State/output:** Park clears `FILE READ` and `PARSE` on the Systems Map and leaves `CLEANUP` highlighted.

**Unlock:** Stop 31.

**Retrieval:** Combines raw-file ingestion with data-quality reasoning.

**Later payoff:** Travel to the Software Lab unlocks for the cleanup trace.


## H3. Stop 31 — Trace the skipped records

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 29 — ArrayList methods, traversals, mutation, and algorithms; Keystone: Collections & indexing; Area: CODE; Prerequisites: Practices collection indexing introduced in Mission 7.; Learning role: PRACTICE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether recovery records were never written or the program is skipping entries while it removes resolved records.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The source and parser both preserve six records, leaving the forward cleanup loop as the first stage where B and E can disappear incorrectly.

**Question card story setup — exact player copy (37 words; 2 sentences):** The cleanup iterates from index zero upward and removes a record when `isResolved()` is true. Trace the mutation after B is removed, then choose why C shifts into index 1 while the loop advances to index 2.

**Question card story-science connection — exact player copy:** The exact survivor pattern can become a reusable clue if the same mutation mechanism appears elsewhere later.

**Format-specific interaction block:**
```yaml
derive:
  start: "records = [A open, B resolved, C resolved, D open, E resolved, F resolved]; traverse i upward and remove records.get(i) when resolved."
  goal: "trace the actual survivors of forward removal as indexes shift"
  steps:
    - id: afterB
      prompt: "Choose the list immediately after removing B at index 1."
      choices:
        - {line: "[A, C, D, E, F]", correct: true}
        - {line: "[A, _, C, D, E, F]", correct: false, survives: true, why: "ArrayList removal closes the gap immediately; it does not leave an empty slot, so C shifts into index 1."}
    - id: skipC
      prompt: "Choose what the next i++ does."
      choices:
        - {line: "moves i to 2, so shifted C at index 1 is skipped", correct: true}
        - {line: "keeps i at 1, so shifted C is checked next", correct: false, survives: true, why: "The for-loop update still increments i after removal, so it advances to index 2 rather than rechecking the shifted element."}
    - id: survivors
      prompt: "Choose the final forward-removal list."
      choices:
        - {line: "[A, C, D, F]", correct: true}
        - {line: "[A, D] — assumes every resolved record was removed", correct: false, survives: true, why: "That result assumes shifted neighbors are revisited; forward mutation skips C and F, leaving both resolved records behind."}
```

**Question card prompt — exact player copy:** Build the forward-removal trace and select the final list produced by the buggy loop.

**Correct result:** After removing B, C shifts left and is skipped; the final list is `[A, C, D, F]`.

**Answer text:** Removing from an ArrayList shifts every later element left, while the loop's increment advances the index again.

**Why/mechanism:** Mutating a list during forward index traversal can skip elements because structure changes under the traversal.

**Wrong-path feedback:**

- A blank hole is not left in an ArrayList after removal.

- Keeping i at 1 describes a different algorithm.

- [A,D] is the desired cleaned result, not the buggy output.

**State/output:** The Code Review Wall pins the alternating survivor signature `A C D F`.

**Unlock:** Stop 32.

**Retrieval:** Practices collection indexing introduced in Mission 7.

**Later payoff:** This exact pattern is planted for Mission 14.


## H4. Stop 32 — Recover the full timeline

**Format/placement:** VERIFY, Test Bench.

**Metadata:** Concept: 35 — Testing, debugging, edge cases, and incremental development; Keystone: Debugging & tests, Collections & indexing; Area: CODE; Prerequisites: Delayed retrieval of formal debugging/testing from Mission 4.; Learning role: RETRIEVE; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether recovery records were never written or the program is skipping entries while it removes resolved records.

**Call — exact player copy:** Go to the Test Bench in Software Lab.

**Stop reason — exact player copy:** The forward trace explains the omissions, so the crew needs a regression test that proves a safe cleanup removes every resolved record without losing unresolved ones.

**Question card story setup — exact player copy:** The repaired cleanup traverses `[A open, B resolved, C resolved, D open, E resolved, F resolved]` backward from the final index. Commit how many records should remain before the Test Bench reveals the repaired list size.

**Question card story-science connection — exact player copy:** A regression test should fail the old forward loop and pass the new backward traversal on the same adjacent-resolved input.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit how many records remain after backward cleanup before TEST unlocks."
  predictionRange: {min: 0, max: 6, step: 1, unit: "records"}
  truth: 2
  measurement:
    label: "records retained after backward cleanup"
    cost: 1
  correct_action: "Deploy backward cleanup and keep the failing forward case in regression."
  answerText: "Backward traversal leaves two records, A and D, with zero resolved records remaining; the old forward loop still reproduces [A,C,D,F], preserving the alternating-skip regression signature."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the number of records the backward cleanup should retain. OPERATE: run the repaired cleanup. MEASURE: reveal the retained-record count. INTERPRET: inspect the retained labels and submit DEPLOY or HOLD.

**Correct result:** 2 records retained: A and D; zero resolved; DEPLOY.

**Answer text:** Removing a higher index cannot change any lower index that the descending traversal has not yet visited.

**Why/mechanism:** Regression testing preserves a known failing case so a repaired mechanism is checked against the exact bug it is meant to prevent.

**Wrong-path feedback:**

- Keeping C or F means the repair still skips shifted resolved records.

- HOLD contradicts the exact repaired and failing-reference results.

**State/output:** The Test Bench stores the adjacent-resolved case permanently and restores the full incident timeline.

**Unlock:** Beat M8-B4 and the Mission 8 outcome.

**Retrieval:** Delayed retrieval of formal debugging/testing from Mission 4.

**Later payoff:** Mission 14 will intentionally reuse this regression signature during the apparent-victory reversal.


## I. Mission outcome

**Mission decision:** The records were written; forward list removal skipped shifted items. The raw file has all six records, but cleanup leaves A-C-D-F. The crew restores the log and saves that case for later tests. The rover map then moves a known crevasse to the next cell.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 8 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The full incident timeline is restored and the ArrayList regression case is preserved.  
**Automatic bar change:** HABITAT +0 | POWER +0 | CONTROL +7 | RESCUE +2  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/3/0/1; expected bars = 84/84/100/83, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Text-file ingestion converts stored characters into program objects; comparing before and after states is a debugging control.

- Regression testing preserves a known failing case so a repaired mechanism is checked against the exact bug it is meant to prevent.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The records were written; forward ArrayList removal skips shifted resolved entries, leaving an alternating survivor pattern.


---
# Mission 9 — THE MAP THAT LIES BY ONE COLUMN

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 20 HOURS REMAIN

**Card title:** THE MAP THAT LIES BY ONE COLUMN

**Go now:** Go to the Route Table in Vehicle Bay.

**Card body (65 words; 4 sentences):** The missing records came from list mutation, and now a rover map places one crevasse in the wrong cell. A two-dimensional array uses separate row and column indexes whose order matters. In the Vehicle Bay and Software Lab, trace the grid copy before Rover Three moves. By the end of the mission, decide whether the field survey is wrong or the display transposes its coordinates.

**Objective:** Gather enough code and station evidence to decide whether the field survey is wrong or the rover display is swapping row and column indexes.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **2D array:** an array of rows and columns accessed with two indexes.

- **index:** the numbered position used to access an element; Java arrays and lists start at index zero.


#### Primer concepts

- A 2D array access uses `[row][column]` in this campaign.

- Nested loops can traverse correctly even when a later read or write swaps the two indexes.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **2D access:** In `int[][] grid = {{1,2},{3,4}}`, `grid[0][1]` is `2` and `grid[1][0]` is `3`.

2. **Row-major traversal:** An outer row loop and inner column loop visit `(0,0),(0,1),(1,0),(1,1)` in a 2×2 grid.

3. **Transpose mistake:** Reading `source[row][col]` but writing `dest[col][row]` swaps off-diagonal positions.

4. **Row sum:** For row `{2,5,3}`, start at 0 and add each element to obtain `10`.

5. **Bounds:** A 3×4 array has row indexes `0..2` and column indexes `0..3`.


**Authoring-only failure consequence:** A wrong call can send Rover Three toward a real crevasse or waste time resurveying correct field data.

**Authoring-only later travel:** Evidence unlocks Software Lab; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 8 exposed a collection bug whose pattern can survive even when the underlying records are correct. The rover hazard map is a two-dimensional array whose first index selects a row and second index selects a column. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: The next satellite pass is short, and the station must find one rescue frequency inside a large sorted table before the link closes.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M9-B1 — On arrival at Vehicle Bay

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Route Table shows survey cell `[0][1]` as CREVASSE while the rover display marks `[1][0]`.  
**Dialogue bubble — Jonah Reyes, field robotics lead:** “The field crew says the stake is right. Prove whether the software moved the hazard.”  
**Unlocks:** Stop 33.

### Beat M9-B2 — After Stops 33 and 34

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The survey grid and row-major traversal are both confirmed.  
**Panel text:** “The source data are right; the write operation is the remaining suspect.”  
**Waypoint:** “Take the grid trace to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 35.

### Beat M9-B3 — After Stop 35

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The transposed destination write is identified in the code review.  
**Waypoint:** “Return to the Rover Diagnostic Cart in Vehicle Bay and verify the repaired display.”  
**Unlocks:** Vehicle Bay and Stop 36.

### Beat M9-B4 — After Stop 36

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The rover display now matches all four surveyed cells.  
**Panel text:** “The survey is correct; the repaired write keeps row and column in the right order.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M9-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The map restores the crevasse to `[0][1]` and the rover remains on the repaired grid; the Message Queue Board starts a short satellite countdown beside a large sorted frequency table.  
**Dialogue bubble — Jonah Reyes, field robotics lead:** “The survey crew was right. I release the rover only when the software map points to the same cell.”  
**Waypoint:** “Inspect the corrected hazard cell, then look at the satellite countdown before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 unique locations:** Vehicle Bay → Software Lab → Vehicle Bay. The code diagnosis requires Software Lab, then the repaired grid must be verified back on the rover equipment in Vehicle Bay.


## F. Characters and dramatic beat

**Jonah Reyes, Field robotics lead,** pushes to keep autonomous vehicles available for rescue and external repairs. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **2D arrays: creation, access, traversal, and algorithms:** 2D arrays use two indexes whose order matters; swapping them can transpose a map.

- **2D arrays: creation, access, traversal, and algorithms:** Nested iteration over a 2D array creates a predictable visit order from the loop structure.

- **2D arrays: creation, access, traversal, and algorithms:** 2D array correctness depends separately on traversal order and the index expressions used at each access.

- **2D arrays: creation, access, traversal, and algorithms:** Transfer requires recognizing the familiar indexing mechanism in a 2D structure rather than a 1D list.


## H1. Stop 33 — Read the hazard grid

**Format/placement:** PROBE, Route Table.

**Metadata:** Concept: 30 — 2D arrays: creation, access, traversal, and algorithms; Keystone: Collections & indexing; Area: VEH; Prerequisites: Builds on 1D indexing from Mission 7 and ArrayList indexing from Mission 8.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the field survey is wrong or the rover display is swapping row and column indexes.

**Call — exact player copy:** Go to the Route Table in Vehicle Bay.

**Stop reason — exact player copy:** Jonah needs to know whether the field survey or the rover display moved the crevasse before Rover Three uses the map.

**Question card story setup — exact player copy (39 words; 2 sentences):** Survey stakes mark a crevasse at row 0, column 1, but the rover display highlights row 1, column 0. Probe four named cells and compare observed survey status with the expected stored grid value to locate the mismatch pattern.

**Question card story-science connection — exact player copy:** A two-dimensional indexing error can transpose correct field data into a different map cell without changing the survey itself.

**Format-specific interaction block:**
```yaml
probe:
  stations:
    - {id: c00, label: "cell [0][0]", reading: "SAFE", expected: "SAFE", load: "survey stake 00"}
    - {id: c01, label: "cell [0][1]", reading: "CREVASSE", expected: "CREVASSE", load: "survey stake 01"}
    - {id: c10, label: "cell [1][0]", reading: "SAFE", expected: "SAFE", load: "survey stake 10"}
    - {id: c11, label: "cell [1][1]", reading: "SAFE", expected: "SAFE", load: "survey stake 11"}
  target: c01
  quantityAndUnits: "Probe all four survey cells and identify the station that establishes the crevasse's true row-column location."
  correctConclusion: "Cell [0][1] is the crevasse and the other three cells are SAFE; the display write is transposing coordinates."
```

**Question card prompt — exact player copy:** Probe all four cells, compare each reading with its explicit expected state, and submit whether the survey or display mapping is suspect.

**Correct result:** The survey is consistent; the display mapping is suspect.

**Answer text:** The field measurements agree with the stored survey grid, while the displayed crevasse appears at the swapped coordinate.

**Why/mechanism:** 2D arrays use two indexes whose order matters; swapping them can transpose a map.

**Wrong-path feedback:**

- Blaming the survey ignores four matching station checks.

- Calling both cells crevasses invents evidence not present in the probes.

**State/output:** The Route Table shows the surveyed crevasse at `[0][1]` and the display mismatch at `[1][0]`.

**Unlock:** Stop 34.

**Retrieval:** Builds on 1D indexing from Mission 7 and ArrayList indexing from Mission 8.

**Later payoff:** Stop 34 traces row-major access before the write is diagnosed.


## H2. Stop 34 — Walk the grid in order

**Format/placement:** SEQUENCE, Vehicle Bay — Route Planning Board.

**Metadata:** Concept: 30 — 2D arrays: creation, access, traversal, and algorithms; Keystone: Collections & indexing; Area: VEH; Prerequisites: Practices 2D access introduced in Stop 33.; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** whether the field survey is wrong or the rover display is swapping row and column indexes.

**Call — exact player copy:** Go to the Route Planning Board in Vehicle Bay.

**Stop reason — exact player copy:** Stop 33 proved the survey grid is correct, so the crew now needs the exact row-major order used by the map-copy loop.

**Question card story setup — exact player copy (39 words; 2 sentences):** For a 2×2 grid, the copy loop should visit `[0][0]`, `[0][1]`, `[1][0]`, and `[1][1]` in row-major order. Put those accesses on the rail so the later write can be compared with the intended traversal.

**Question card story-science connection — exact player copy:** A correct traversal order makes it easier to isolate whether the defect is in visiting cells or writing them to the destination.

**Format-specific interaction block:**
```yaml
cards:
- id: a
  label: '[0][0]'
- id: b
  label: '[0][1]'
- id: c
  label: '[1][0]'
- id: d
  label: '[1][1]'
order:
- a
- b
- c
- d
axis: row-major traversal
ends:
- start row 0
- finish row 1
```

**Question card prompt — exact player copy:** Place the four grid accesses in row-major order, then submit the sequence.

**Correct result:** `[0][0] → [0][1] → [1][0] → [1][1]`.

**Answer text:** The inner column loop completes both columns of row 0 before the outer row loop advances to row 1.

**Why/mechanism:** Nested iteration over a 2D array creates a predictable visit order from the loop structure.

**Wrong-path feedback:**

- Column-major order would visit `[1][0]` before `[0][1]`.

- Any order that repeats or omits a cell is not a complete 2×2 traversal.

**State/output:** The Route Table animates the four row-major cells in sequence.

**Unlock:** Stop 35.

**Retrieval:** Practices 2D access introduced in Stop 33.

**Later payoff:** Travel to the Software Lab unlocks to diagnose the copy statement.


## H3. Stop 35 — Find the transposed write

**Format/placement:** DIAGNOSIS, Software Lab — Code Review Wall.

**Metadata:** Concept: 30 — 2D arrays: creation, access, traversal, and algorithms; Keystone: Collections & indexing; Area: CODE; Prerequisites: Combines 2D structure with earlier indexing error diagnosis.; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether the field survey is wrong or the rover display is swapping row and column indexes.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The visit order is correct, so the bug must occur when each surveyed cell is written into the rover display grid.

**Question card story setup — exact player copy (38 words; 2 sentences):** The copy loop visits cells in row-major order, the source survey shows the crevasse at `[0][1]`, and the display shows it at `[1][0]`. Diagnose which write statement produces exactly that transpose while preserving every source value.

**Question card story-science connection — exact player copy:** The right explanation must account for correct traversal, correct source data, and a swapped destination coordinate.

**Format-specific interaction block:**
```yaml
headline: "Which write creates the one-cell transpose?"
readings:
  - {zone: "SOURCE", label: "survey[0][1]", value: "CREVASSE", status: alarm}
  - {zone: "TRAVERSAL", label: "visit order", value: "row-major correct", status: normal}
  - {zone: "DISPLAY", label: "display[1][0]", value: "CREVASSE", status: alarm}
  - {zone: "QUIET CONTROL", label: "display[0][0]", value: "SAFE as expected", status: normal}
choices:
  - {id: swap, label: "display[col][row] = survey[row][col]", mechanism: "Swaps destination indexes and moves [0][1] to [1][0]."}
  - {id: same, label: "display[row][col] = survey[row][col]", mechanism: "Would preserve the crevasse at [0][1]."}
  - {id: clear, label: "display[row][col] = SAFE", mechanism: "Would erase the crevasse rather than transpose it."}
  - {id: survey, label: "survey[col][row] = display[row][col]", mechanism: "Writes into the source grid and does not match the observed direction."}
answer: swap
rebuttals:
  same: "Same-index copying would leave the crevasse at [0][1], contradicting display[1][0]."
  clear: "Writing SAFE would erase a hazard rather than move it to the transposed cell."
  survey: "Writing into survey changes the source grid, but the source reading at [0][1] is already correct."
```

**Question card prompt — exact player copy:** Read all four zones and submit the one write statement that produces the observed transpose.

**Correct result:** `display[col][row] = survey[row][col]`.

**Answer text:** The source indexes are read correctly, but the destination receives column first and row second, moving `[0][1]` to `[1][0]`.

**Why/mechanism:** 2D array correctness depends separately on traversal order and the index expressions used at each access.

**Wrong-path feedback:**

- Same-index copy contradicts the display mismatch.

- Writing SAFE would remove, not move, the hazard.

- The reversed assignment changes the wrong array.

**State/output:** The Code Review Wall highlights the swapped destination indexes.

**Unlock:** Stop 36.

**Retrieval:** Combines 2D structure with earlier indexing error diagnosis.

**Later payoff:** Stop 36 verifies the corrected grid before any rover move.


## H4. Stop 36 — Release Rover Three

**Format/placement:** VERIFY, Rover Diagnostic Cart.

**Metadata:** Concept: 30 — 2D arrays: creation, access, traversal, and algorithms; Keystone: Collections & indexing, Debugging & tests; Area: VEH; Prerequisites: Transfers collection/index reasoning from Missions 7–8 into a 2D map.; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** whether the field survey is wrong or the rover display is swapping row and column indexes.

**Call — exact player copy:** Go to the Rover Diagnostic Cart in Vehicle Bay.

**Stop reason — exact player copy:** The transposed write is identified, but the rover remains locked until the repaired map predicts the exact crevasse coordinate.

**Question card story setup — exact player copy:** The corrected copy uses `display[row][col] = survey[row][col]` on the same 2×2 source grid. Commit the column index where the crevasse should appear in row 0 before the simulator reveals the rebuilt hazard map.

**Question card story-science connection — exact player copy:** A committed full-grid prediction can prove the repair fixes the coordinate mapping without inventing new survey data.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the crevasse column in row 0 before REBUILD unlocks."
  predictionRange: {min: 0, max: 1, step: 1, unit: "column index"}
  truth: 1
  measurement:
    label: "crevasse column at row 0"
    cost: 1
  correct_action: "Release Rover Three on the repaired map."
  answerText: "The repaired copy preserves source coordinates: the crevasse remains at row 0, column 1, and the other three cells remain SAFE."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the crevasse's column index in row 0. OPERATE: rebuild the hazard grid with the corrected write. MEASURE: reveal the crevasse column. INTERPRET: confirm the remaining cells against the source and submit RELEASE or HOLD.

**Correct result:** Crevasse at column 1 of row 0; RELEASE.

**Answer text:** Using the same row and column indexes in source and destination preserves the physical survey geometry.

**Why/mechanism:** Transfer requires recognizing the familiar indexing mechanism in a 2D structure rather than a 1D list.

**Wrong-path feedback:**

- Putting the crevasse at [1][0] repeats the transposed write.

- HOLD contradicts four matching committed cells.

**State/output:** The rover display marks `[0][1] CREVASSE` in text and clears the false hazard at `[1][0]`.

**Unlock:** Beat M9-B4 and the Mission 9 outcome.

**Retrieval:** Transfers collection/index reasoning from Missions 7–8 into a 2D map.

**Later payoff:** Mission 10 turns to choosing an efficient algorithm under a real time limit.


## I. Mission outcome

**Mission decision:** The field survey is right; the display swaps row and column. The source marks the crevasse at `[0][1]`, but the broken write shows `[1][0]`. The crew fixes the grid before releasing the rover. A short satellite pass then makes the old search too slow.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 9 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** Rover Three receives the corrected hazard map, but map rebuild and route simulation consume battery reserve.  
**Automatic bar change:** HABITAT +0 | POWER -2 | CONTROL +5 | RESCUE +7  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 1/3/0/0; expected bars = 85/85/100/90, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- 2D arrays use two indexes whose order matters; swapping them can transpose a map.

- Transfer requires recognizing the familiar indexing mechanism in a 2D structure rather than a 1D list.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The field survey is correct; one write uses [column][row], transposing the crevasse into the neighboring cell.


---
# Mission 10 — THE FAST ANSWER

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 18 HOURS REMAIN

**Card title:** THE FAST ANSWER

**Go now:** Go to the Message Queue Board in Communications & Weather.

**Card body (70 words; 4 sentences):** The hazard map is repaired, but the next satellite pass is too short for a slow rescue-frequency lookup. A sorted table allows binary search to discard half the remaining records after each comparison. At Communications and the Software Lab, estimate and trace the search before the pass closes without the rescue frequency. By the end of the mission, decide which search can find 122.3 MHz before the link closes.

**Objective:** Gather enough code and station evidence to decide which search method can find the rescue-frequency record fast enough for the next satellite window.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **binary search:** a search on sorted data that repeatedly discards half of the remaining range.

- **loop:** code that repeats while a condition or counter says more work remains.


#### Primer concepts

- Binary search requires sorted data.

- After each midpoint comparison, discard only the half that cannot contain the target.


#### Equations first needed today

**Equation:** binary-search work ≈ log₂(n)  
**What it is for:** estimate how many halvings are needed for a sorted table.  
**Symbols:** `n` number of sorted records.  
**Why this campaign needs it:** the rescue link has a short time window.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Linear search:** Searching 8 unsorted items may require all 8 checks in the worst case.

2. **Binary-search prerequisite:** Binary search needs sorted data because each comparison decides which whole half can be discarded.

3. **Binary midpoint:** With `low=0` and `high=7`, integer midpoint `(low+high)/2` is `3`.

4. **Halving work:** A sorted list of 1024 items needs about 10 binary-search comparisons because `2^10 = 1024`.

5. **Update rule:** If `a[mid] < target`, set `low = mid + 1`; if `a[mid] > target`, set `high = mid - 1`.


**Authoring-only failure consequence:** A wrong search choice can consume the satellite window before the rescue frequency is found.

**Authoring-only later travel:** Evidence unlocks Software Lab; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 9 showed that correct data structures still fail when code uses their indexes incorrectly. A sorted frequency table can be searched by repeatedly halving the remaining range instead of checking every entry in order. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: Two physically separate controllers begin reporting the same last-warning value, suggesting shared state rather than shared hardware.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M10-B1 — On arrival at Communications & Weather

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Message Queue Board shows 1,024 sorted frequency records and the shrinking satellite-pass clock.  
**Dialogue bubble — Liv Andersen, communications and weather lead:** “We do not have time to read every row. Use the order we already paid to build.”  
**Unlocks:** Stop 37.

### Beat M10-B2 — After Stops 37 and 38

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The board records about ten worst-case midpoint checks and selects binary search for the sorted table.  
**Panel text:** “The method fits the deadline; now prove its boundary updates on the target.”  
**Waypoint:** “Take the selected search to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 39.

### Beat M10-B3 — After Stop 39

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The trace records midpoint indexes `3 → 5 → 4` and finds 122.3 MHz.  
**Waypoint:** “Return to the Packet Monitor in Communications & Weather and verify the live search.”  
**Unlocks:** Communications & Weather and Stop 40.

### Beat M10-B4 — After Stop 40

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The live table locks 122.3 MHz before the pass closes.  
**Panel text:** “Binary search reaches the rescue frequency in three midpoint checks.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M10-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The frequency locks at 122.3 MHz before the pass ends; the Incident Console then shows P02 and H04 both reporting warning 7 even though their other state differs.  
**Dialogue bubble — Liv Andersen, communications and weather lead:** “Three checks beat a full scan. The deadline decides which algorithm is useful, not which one we always used.”  
**Waypoint:** “Inspect the locked frequency, then look at the shared warning value before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**2 unique locations:** Communications & Weather → Software Lab → Communications & Weather. The boundary trace requires Software Lab, then the live frequency must be verified on the communications equipment.


## F. Characters and dramatic beat

**Liv Andersen, Communications and weather lead,** pushes to hold a satellite path and identify a safe rescue window. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Nested iteration and informal run-time reasoning:** Informal run-time reasoning compares how work grows with input size rather than timing one specific machine.

- **Linear and binary search:** Algorithm prerequisites are part of correctness; efficiency does not excuse using a method on incompatible data.

- **Linear and binary search:** Binary search combines iteration, midpoint calculation, and Boolean comparisons while maintaining an inclusive candidate interval.

- **Linear and binary search:** Transfer means selecting and executing the efficient search because its prerequisites and deadline both matter.


## H1. Stop 37 — Estimate the search work

**Format/placement:** BALLPARK, Communications & Weather — Message Queue Board.

**Metadata:** Concept: 19 — Nested iteration and informal run-time reasoning; Keystone: Search & efficiency, Iteration; Area: COMMS; Prerequisites: Introduces search-efficiency reasoning after several loop-based algorithms.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** which search method can find the rescue-frequency record fast enough for the next satellite window.

**Call — exact player copy:** Go to the Message Queue Board in Communications & Weather.

**Stop reason — exact player copy:** Liv needs a search strategy before the short satellite pass begins, and the table contains 1,024 sorted frequency records.

**Question card story setup — exact player copy (43 words; 2 sentences):** A linear search may inspect all 1,024 records, while a halving search needs about one check per power of two in the table size. Estimate the maximum midpoint checks for binary search so the crew can compare the two methods before coding.

**Question card story-science connection — exact player copy:** The rescue decision depends on choosing an algorithm whose work fits the time window, not merely one that eventually finds the record.

**Format-specific interaction block:**
```yaml
estimate:
  labels: ["table size", "records eliminated per check"]
  values: [1024, 2]
  slots: 2
  template: "log{1}({0}) ≈ {checks} checks"
  formula: "log(a) / log(b)"
  correct: [0, 1]
  target: 10
  tolerance: 1
  units: "checks"
  correctResult: "log2(1024) = 10, so at most ten midpoint checks."
```

**Question card prompt — exact player copy:** Use the displayed table size and power-of-two relationship to estimate the maximum binary-search midpoint checks; submit one number.

**Correct result:** About 10 checks.

**Answer text:** Because 1,024 = 2^10, ten halvings reduce the search interval to one candidate, so binary search needs about 10 midpoint checks.

**Why/mechanism:** Binary search cuts the remaining sorted interval in half after each comparison. The base-2 logarithm counts how many halvings are needed to reduce 1,024 possibilities to one.

**Wrong-path feedback:**

- A value near 1,024 describes linear search, not halving.

- One check cannot identify an arbitrary target in 1,024 records.

**State/output:** The Message Queue Board posts `LINEAR: up to 1024 / BINARY: about 10` without naming the winning target index.

**Unlock:** Stop 38.

**Retrieval:** Introduces search-efficiency reasoning after several loop-based algorithms.

**Later payoff:** Stop 38 decides whether the table's ordering permits binary search.


## H2. Stop 38 — Choose the search

**Format/placement:** CHOICE, Liv Andersen at the Message Queue Board.

**Metadata:** Concept: 31 — Linear and binary search; Keystone: Search & efficiency; Area: COMMS; Prerequisites: Practices efficiency from Stop 37.; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which search method can find the rescue-frequency record fast enough for the next satellite window.

**Call — exact player copy:** Go to Communications & Weather and meet Liv Andersen, communications and weather lead, at the Message Queue Board.

**Stop reason — exact player copy:** The estimate favors halving, but binary search is valid only if the rescue-frequency table is sorted by the same quantity being searched.

**Question card story setup — exact player copy (35 words; 2 sentences):** The table is sorted ascending by frequency in megahertz, and the target record is 122.3 MHz. Choose the search method that can use that ordering without first rearranging the data during the satellite window.

**Question card story-science connection — exact player copy:** The fastest-looking method is only correct when its prerequisite about data order is actually satisfied.

**Format-specific interaction block:**
```yaml
question: "Which search should the station use on this sorted frequency table?"
choices:
  - "binary search"
  - "linear search only because binary search requires unsorted data"
  - "selection sort instead of searching"
  - "randomly sample records until 122.3 appears"
answer: "binary search"
why: "The table is already sorted by the searched quantity, so binary search can discard half the range each step."
rebuttals:
  "linear search only because binary search requires unsorted data": "Binary search requires sorted data, which is exactly what the table provides."
  "selection sort instead of searching": "The table is already sorted and the task is to locate one record."
  "randomly sample records until 122.3 appears": "Random sampling gives no guarantee within the window."
```

**Question card prompt — exact player copy:** Select the search method justified by the table's existing order.

**Correct result:** Binary search.

**Answer text:** Binary search compares the target with a midpoint and uses sorted order to eliminate the impossible half.

**Why/mechanism:** Algorithm prerequisites are part of correctness; efficiency does not excuse using a method on incompatible data.

**Wrong-path feedback:**

- The table is explicitly sorted.

- Sorting again wastes time and does not locate the target.

- Random sampling is not a guaranteed search algorithm.

**State/output:** Liv authorizes binary search for the rescue-frequency lookup.

**Unlock:** Stop 39.

**Retrieval:** Practices efficiency from Stop 37.

**Later payoff:** Travel to the Software Lab unlocks to trace the midpoint updates.


## H3. Stop 39 — Trace midpoint updates

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 31 — Linear and binary search; Keystone: Search & efficiency, Iteration; Area: CODE; Prerequisites: Combines search with delayed iteration retrieval from Mission 3.; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** which search method can find the rescue-frequency record fast enough for the next satellite window.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The table is sorted and binary search is authorized, so Priya needs the exact low/high updates for the captured target.

**Question card story setup — exact player copy (45 words; 2 sentences):** The eight displayed frequencies are `[118.0,119.4,120.2,121.6,122.3,123.1,124.5,126.0]`, with target 122.3. Build the midpoint trace from indexes 0–7 and choose the update after each comparison until index 4 is found.

**Question card story-science connection — exact player copy:** Correct midpoint logic matters as much as choosing binary search; one reversed boundary update can discard the target half.

**Format-specific interaction block:**
```yaml
derive:
  start: "sorted values = [118.1, 119.4, 120.8, 121.6, 122.3, 123.1, 124.7, 126.0]; target = 122.3; low = 0; high = 7."
  goal: "narrow binary-search bounds until the target index is identified"
  steps:
    - id: first
      prompt: "At mid=3, value 121.6 < 122.3. Choose the update."
      choices:
        - {line: "low = mid + 1;", correct: true}
        - {line: "high = mid - 1;", correct: false, survives: true, why: "The midpoint is below the target in a sorted array, so lowering high discards the half that can still contain the target."}
    - id: second
      prompt: "Now low=4, high=7, mid=5, value 123.1 > 122.3. Choose the update."
      choices:
        - {line: "high = mid - 1;", correct: true}
        - {line: "low = mid + 1; // move lower bound upward", correct: false, survives: true, why: "The midpoint is above the target, so raising low would discard index 4, the remaining location that contains 122.3."}
    - id: found
      prompt: "Now low=4, high=4. Choose the result."
      choices:
        - {line: "mid=4 and value=122.3: found", correct: true}
        - {line: "mid=5 and value=123.1: not found", correct: false, survives: true, why: "After the bounds change, the midpoint must be recomputed as 4; reusing the prior midpoint ignores the current interval."}
```

**Question card prompt — exact player copy:** Choose the correct boundary update at each comparison and then the final search result.

**Correct result:** mid 3 → low=4; mid 5 → high=4; mid 4 finds 122.3.

**Answer text:** Sorted order determines which half can be eliminated after each comparison.

**Why/mechanism:** Binary search combines iteration, midpoint calculation, and Boolean comparisons while maintaining an inclusive candidate interval.

**Wrong-path feedback:**

- Reversing either update discards the half containing the target.

- A one-element range is not empty until low exceeds high.

**State/output:** The Code Review Wall displays the midpoint path `3 → 5 → 4`.

**Unlock:** Stop 40.

**Retrieval:** Combines search with delayed iteration retrieval from Mission 3.

**Later payoff:** Stop 40 verifies the lookup inside the live link window.


## H4. Stop 40 — Lock the rescue frequency

**Format/placement:** VERIFY, Packet Monitor.

**Metadata:** Concept: 31 — Linear and binary search; Keystone: Search & efficiency, Reliability & redundancy, Boolean logic; Area: COMMS; Prerequisites: Retrieves reliability concerns from Mission 6 while transferring binary search.; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Briefing decision advanced:** which search method can find the rescue-frequency record fast enough for the next satellite window.

**Call — exact player copy:** Go to the Packet Monitor in Communications & Weather.

**Stop reason — exact player copy:** The midpoint trace reaches 122.3 MHz in three checks, but the station must verify the live lookup returns the same record before the pass closes.

**Question card story setup — exact player copy:** The sorted table still contains eight frequencies, and the live binary search begins with low 0 and high 7 while targeting 122.3 MHz. Commit the array index the search should return before the Packet Monitor reveals it.

**Question card story-science connection — exact player copy:** A verified fast lookup protects the rescue link without replacing the independent path evidence needed later.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the array index binary search should return for 122.3 MHz before SEARCH unlocks."
  predictionRange: {min: 0, max: 7, step: 1, unit: "array index"}
  truth: 4
  measurement:
    label: "returned array index"
    cost: 1
  correct_action: "Use 122.3 MHz for the rescue link."
  answerText: "Binary search returns index 4 after midpoint checks 3, 5, and 4, and the link acknowledges on 122.3 MHz."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the index binary search should return for 122.3 MHz. OPERATE: run the search on the live sorted table. MEASURE: reveal the returned index. INTERPRET: inspect the midpoint trace and acknowledgment, then submit LOCK or ABORT.

**Correct result:** Index 4; 122.3 MHz; 3 midpoint checks; LOCK.

**Answer text:** The live search reproduces the traced algorithm and returns the expected record before the link window ends.

**Why/mechanism:** Transfer means selecting and executing the efficient search because its prerequisites and deadline both matter.

**Wrong-path feedback:**

- ABORT contradicts a matching index, value, and acknowledgment.

- A different index contradicts the frozen table trace.

**State/output:** The Packet Monitor locks `RESCUE 122.3 MHz` and logs the three-check trace.

**Unlock:** Beat M10-B4 and the Mission 10 outcome.

**Retrieval:** Retrieves reliability concerns from Mission 6 while transferring binary search.

**Later payoff:** Mission 11 begins when two separate controllers unexpectedly share one warning value.


## I. Mission outcome

**Mission decision:** Binary search can find 122.3 MHz before the link closes. The sorted table reaches it at index 4 after three checks. The crew locks that rescue frequency. Two separate controllers then report the same last-warning value.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 10 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 10:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** Binary search locks the rescue frequency before the pass closes.  
**Automatic bar change:** HABITAT +0 | POWER +0 | CONTROL +3 | RESCUE +8  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 2/2/0/0; expected bars = 87/87/100/98, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Informal run-time reasoning compares how work grows with input size rather than timing one specific machine.

- Transfer means selecting and executing the efficient search because its prerequisites and deadline both matter.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** Binary search is required; the sorted table lets the code cut the remaining range in half and reach 122.3 MHz in three midpoint checks.


---
# Mission 11 — THE CLASS THAT REMEMBERS TOO MUCH

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 16 HOURS REMAIN

**Card title:** THE CLASS THAT REMEMBERS TOO MUCH

**Go now:** Go to Software Lab and meet Priya Nair, software architect, at the Version Rack.

**Card body (70 words; 4 sentences):** The rescue frequency is locked, but two separate controllers now report the same last-warning value. A static field is shared by a class, while an instance field belongs to one object. Across Software, Power, and Habitat, test which kind of state the warning uses before one controller silently overwrites another during rescue. By the end of the mission, decide whether the controllers are overwriting one another through shared class state.

**Objective:** Gather enough code and station evidence to decide whether unrelated controllers are overwriting one another because their warning state is shared at the class level.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **static field:** one field shared by the class rather than stored separately in each object.

- **instance field:** state stored separately inside each object.

- **reference:** a value that points to an object rather than containing a separate copy of that object.


#### Primer concepts

- A static field is shared by every instance of the class.

- An instance field changes only inside the object receiving the method call.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Instance fields:** If two `Counter` objects each have `int value`, changing one object does not change the other object.

2. **Static fields:** If `value` is `static`, all `Counter` objects share that one class-level variable.

3. **`this`:** In `this.value = value;`, `this.value` is the receiving object field and `value` is the parameter.

4. **Static method:** A static method can be called with the class name and does not require a particular object instance.

5. **Scope:** A local variable declared inside a method exists only during that call and is not persistent object state.


**Authoring-only failure consequence:** A wrong call can leave two life-critical controllers coupled through one warning value.

**Authoring-only later travel:** Evidence unlocks Power & Thermal Plant then Habitat Control; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 10 used data structure order to make a search fast enough for a real rescue deadline. A class can store state separately in each object or once for the whole class with a static field shared by every instance. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: Only a short message burst remains, so the crew must order rescue tasks without transmitting unnecessary personal information.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M11-B1 — On arrival at Software Lab

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Version Rack shows the unresolved incident.  
**Dialogue bubble — Priya Nair, software architect:** “P02 and H04 are different objects, yet they remember the same warning. Find the state they are sharing.”  
**Unlocks:** Stop 41.


### Beat M11-B2 — After Stops 41 and 42

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “The shared static warning is replaced by independent instance state.”  

**Waypoint:** “Take that result to the Generator Controller in Power & Thermal Plant.”  
**Unlocks:** Power & Thermal Plant and Stop 43.


### Beat M11-B3 — After Stop 43

**Presentation:** waypoint_notification.  
**Player control:** Immediate return.  
**World state:** The prior result is copied into the mission log.  
**Waypoint:** “The remaining check is at the Scrubber Console in Habitat Control.”  
**Unlocks:** Habitat Control and Stop 44.


### Beat M11-B4 — After Stop 44

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “The controllers share one static warning field; changing H04 overwrites the value later read from P02 even though the objects are physically separate.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M11-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** P02 and H04 keep different warning values after the patch; the Rescue Board lights a `10 SECOND BURST` limit and a queue of possible aircraft fields.
**Dialogue bubble — Mei Alvarez, habitat systems lead:** “My warning should belong to my controller. Shared state is coupling, not independent agreement.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**3 locations:** Software Lab → Power & Thermal Plant → Habitat Control. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Malik Okafor, Power and thermal engineer,** pushes to keep heat and power above survival limits. **Mei Alvarez, Habitat systems lead,** pushes to keep air and water stable while controllers are isolated.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Class anatomy: fields, encapsulation, and object state:** Objects can have independent instance fields while also reading a class-wide static field.

- **Class variables, static methods, scope, access, and this:** Static fields belong to the class; instance fields belong to individual objects.

- **Writing instance methods:** Object encapsulation is observable when changes remain local to the intended receiver.

- **Class variables, static methods, scope, access, and this:** The final Boolean check converts object-state independence into a concrete pass/fail condition.


## H1. Stop 41 — Compare two controller objects

**Format/placement:** CASEBOOK, Priya Nair at the Version Rack.

**Metadata:** Concept: 21 — Class anatomy: fields, encapsulation, and object state; Keystone: Object state & references, State & assignment, Boolean logic; Area: CODE; Prerequisites: Delayed retrieval of object identity from Mission 5.; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether unrelated controllers are overwriting one another because their warning state is shared at the class level.

**Call — exact player copy:** Go to Software Lab and meet Priya Nair, software architect, at the Version Rack.

**Stop reason — exact player copy:** Priya needs to prove P02 and H04 are different objects before blaming a shared field for their identical warnings.

**Question card story setup — exact player copy (38 words; 2 sentences):** P02 belongs to power, H04 belongs to habitat, their object identifiers differ, and each has a separate limit field, yet both report `lastWarning = 7`. Match the evidence to what it says about object identity and unexpectedly shared state.

**Question card story-science connection — exact player copy:** Separate object identities make a class-level shared field more plausible than one physical controller somehow becoming the other.

**Format-specific interaction block:**
```yaml
scenarios:
- id: p
  label: P02 id=P02, limit=90
- id: h
  label: H04 id=H04, limit=65
- id: eq
  label: P02 == H04 is false
- id: warn
  label: both read lastWarning=7
choices:
- id: diff
  label: the objects are distinct
- id: separate
  label: their instance limits are independent
- id: shared
  label: some warning state may be class-wide
- id: identity
  label: identity comparison confirms different references
mapping:
  p: separate
  h: diff
  eq: identity
  warn: shared
```

**Question card prompt — exact player copy:** Match each record to the interpretation it supports, then submit whether the identical warning proves the objects are the same.

**Correct result:** No; P02 and H04 are different objects, and the identical warning suggests shared class state.

**Answer text:** Their identifiers, limits, and identity comparison are independent, leaving the shared warning value as a separate state-design issue.

**Why/mechanism:** Objects can have independent instance fields while also reading a class-wide static field.

**Wrong-path feedback:**

- Same warning does not override explicit identity evidence.

- Different limits support separate instance state.

**State/output:** The Version Rack places P02 and H04 on separate object cards with one shared warning arrow above them.

**Unlock:** Stop 42.

**Retrieval:** Delayed retrieval of object identity from Mission 5.

**Later payoff:** Stop 42 inspects the declaration that could create this coupling.


## H2. Stop 42 — Inspect the static field

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 25 — Class variables, static methods, scope, access, and this; Keystone: Object state & references, Methods & abstraction; Area: CODE; Prerequisites: Builds directly on Stop 41's object-identity evidence.; Learning role: INTRODUCE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether unrelated controllers are overwriting one another because their warning state is shared at the class level.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** Stop 41 proved the controllers are distinct, so the identical warning must come from code that stores state outside each individual object.

**Question card story setup — exact player copy (37 words; 2 sentences):** The class currently declares `static int lastWarning;`, and H04 writes 7 immediately before P02 reads the same value. Build the declaration and access pattern that give each controller its own warning state instead of one class-wide slot.

**Question card story-science connection — exact player copy:** Moving warning state into each object should let H04 change without overwriting P02's previously stored warning.

**Format-specific interaction block:**
```yaml
derive:
  start: "P02.lastWarning = 3; H04.lastWarning = 4; then H04.setWarning(7) is called."
  goal: "keep each object's warning state independent after one object changes"
  steps:
    - id: field
      prompt: "Choose the field declaration."
      choices:
        - {line: "private int lastWarning;", correct: true}
        - {line: "private static int lastWarning;", correct: false, survives: true, why: "A static field belongs to the class, so one object's write changes the value seen through every object."}
    - id: write
      prompt: "Choose the assignment inside setWarning."
      choices:
        - {line: "this.lastWarning = value;", correct: true}
        - {line: "Controller.lastWarning = value;", correct: false, survives: true, why: "Writing through the class name targets shared class state instead of the receiving object's own field."}
```

**Question card prompt — exact player copy:** Choose the field declaration and assignment that store warning state separately in each controller object.

**Correct result:** `private int lastWarning;` and `this.lastWarning = value;`.

**Answer text:** Removing `static` gives every instance its own field, and `this` writes the receiver's copy.

**Why/mechanism:** Static fields belong to the class; instance fields belong to individual objects.

**Wrong-path feedback:**

- Keeping static preserves the coupling.

- Writing through the class name still targets shared class state.

**State/output:** The Code Review Wall changes the warning field from CLASS STATE to INSTANCE STATE.

**Unlock:** Stop 43.

**Retrieval:** Builds directly on Stop 41's object-identity evidence.

**Later payoff:** Travel to the Power & Thermal Plant unlocks for an independent object probe.


## H3. Stop 43 — Probe independent warning state

**Format/placement:** PROBE, Generator Controller.

**Metadata:** Concept: 23 — Writing instance methods; Keystone: Object state & references; Area: POWER; Prerequisites: Practices instance methods from Mission 5 after a long delay.; Learning role: PRACTICE; Difficulty: L4; Story role: obstacle.

**Briefing decision advanced:** whether unrelated controllers are overwriting one another because their warning state is shared at the class level.

**Call — exact player copy:** Go to the Generator Controller in Power & Thermal Plant.

**Stop reason — exact player copy:** The field is now instance state, but the team needs multiple controllers to show the repair is not accidentally hard-coded to P02.

**Question card story setup — exact player copy (32 words; 2 sentences):** Four controllers start with different warning values, then H04 alone receives `setWarning(7)`. Probe each controller and compare its observed warning with the explicit value expected if instance state is truly independent.

**Question card story-science connection — exact player copy:** A station-wide fix should preserve each untouched object's warning while changing only the receiver of the method call.

**Format-specific interaction block:**
```yaml
probe:
  stations:
    - {id: p02, label: "P02", reading: "3", expected: "3", load: "untouched power controller"}
    - {id: p03, label: "P03", reading: "2", expected: "2", load: "untouched power controller"}
    - {id: h04, label: "H04", reading: "7", expected: "7", load: "setWarning(7)"}
    - {id: h05, label: "H05", reading: "4", expected: "4", load: "untouched habitat controller"}
  target: h04
  quantityAndUnits: "Probe all four controller warning values and determine whether only the object that received setWarning(7) changed."
  correctConclusion: "Only H04 changed to 7 while P02, P03, and H05 stayed at their expected values; warning state is independent per object."
```

**Question card prompt — exact player copy:** Probe all four controllers, compare every observed warning with its station-specific expected value, and submit whether the state is independent.

**Correct result:** Only H04 changes to 7; the other three retain 3, 2, and 4.

**Answer text:** The instance method writes the receiver object's field and leaves every other object's field unchanged.

**Why/mechanism:** Object encapsulation is observable when changes remain local to the intended receiver.

**Wrong-path feedback:**

- Any common value across all four would indicate shared state remains.

- Changing P02 would contradict the no-call control.

**State/output:** The Generator Controller panel shows P02 warning 3 after H04 writes 7.

**Unlock:** Stop 44.

**Retrieval:** Practices instance methods from Mission 5 after a long delay.

**Later payoff:** Travel to Habitat Control unlocks for the original cross-controller sequence.


## H4. Stop 44 — Separate shared from local state

**Format/placement:** VERIFY, Scrubber Console.

**Metadata:** Concept: 25 — Class variables, static methods, scope, access, and this; Keystone: Object state & references, Methods & abstraction, Boolean logic; Area: HAB; Prerequisites: Combines delayed object/reference retrieval with method abstraction and Boolean verification.; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether unrelated controllers are overwriting one another because their warning state is shared at the class level.

**Call — exact player copy:** Go to the Scrubber Console in Habitat Control.

**Stop reason — exact player copy:** The probe looks correct, but the original dangerous sequence must be replayed before both controller families can return to service.

**Question card story setup — exact player copy:** P02 starts warning 3 and H04 starts warning 4; the replay then calls `H04.setWarning(7)` while warning is an instance field. Commit P02's final warning before the test reveals whether H04 can still overwrite it.

**Question card story-science connection — exact player copy:** The repair passes only if H04 changes, P02 stays local, and the Boolean comparison proves the old cross-controller coupling is gone.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit P02's warning after H04.setWarning(7) before REPLAY unlocks."
  predictionRange: {min: 0, max: 9, step: 1, unit: "warning value"}
  truth: 3
  measurement:
    label: "P02 warning after H04 writes 7"
    cost: 1
  correct_action: "Return both controller families to service."
  answerText: "P02 remains 3 while H04 becomes 7, so P02.getWarning() == 7 is false and the warning field is now instance-local."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial P02's warning after H04 writes 7. OPERATE: replay the cross-controller sequence. MEASURE: reveal P02's final warning. INTERPRET: compare it with H04=7 and submit RETURN TO SERVICE or HOLD.

**Correct result:** P02=3; H04=7; comparison=false; RETURN TO SERVICE.

**Answer text:** Instance state stays with each receiver, so a method call on H04 cannot overwrite P02's field.

**Why/mechanism:** The final Boolean check converts object-state independence into a concrete pass/fail condition.

**Wrong-path feedback:**

- P02=7 recreates the static-field bug.

- comparison=true contradicts the predicted independent state.

- HOLD contradicts three matching measurements.

**State/output:** Both controller panels change from `SHARED STATE SUSPECT` to `INSTANCE STATE VERIFIED`.

**Unlock:** Beat M11-B4 and the Mission 11 outcome.

**Retrieval:** Combines delayed object/reference retrieval with method abstraction and Boolean verification.

**Later payoff:** Mission 12 now has to decide what information and order can fit in the rescue burst.


## I. Mission outcome

**Mission decision:** The controllers share one `static` warning field. P02 and H04 are separate objects, but one write changes what both later read. The crew gives each object its own warning. The aircraft then allows only ten seconds for the next message.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 11 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 12:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** Power and habitat controllers regain independent warning state.  
**Automatic bar change:** HABITAT +7 | POWER +5 | CONTROL +7 | RESCUE +0  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 1/3/0/0; expected bars = 95/95/100/98, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Objects can have independent instance fields while also reading a class-wide static field.

- The final Boolean check converts object-state independence into a concrete pass/fail condition.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The controllers share one static warning field; changing H04 overwrites the value later read from P02 even though the objects are physically separate.


---
# Mission 12 — THE SORTED QUEUE

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 14 HOURS REMAIN

**Card title:** THE SORTED QUEUE

**Go now:** Go to Operations Module and meet Dr. Elena Park, station director, at the Rescue Board.

**Card body (63 words; 4 sentences):** The controller state is separated, but the aircraft can receive only a short rescue burst before weather cuts the link. The queue must fit the time limit, preserve operational priority, and avoid unnecessary personal data. Across Operations, Software, and Communications, choose and order the message before the burst closes. By the end of the mission, decide which transmitted queue the aircraft should trust.

**Objective:** Gather enough code and station evidence to decide which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **PII:** personally identifiable information that can identify or strongly distinguish a person.

- **selection sort:** a sorting algorithm that repeatedly selects the next smallest or largest remaining item.

- **insertion sort:** a sorting algorithm that inserts each new item into the correct place in an already-sorted prefix.


#### Primer concepts

- Sorting can have requirements beyond numeric order, including preserving equal-priority order.

- Collect and transmit only the data needed for the decision.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Selection sort:** In `[4,2,3]`, find the smallest item `2` and swap it into index 0 to get `[2,4,3]`; repeat on the remaining suffix.

2. **Insertion sort:** To insert `3` into `[1,4,7]`, shift 7 and 4 right, then place 3 after 1 to get `[1,3,4,7]`.

3. **Stable tie rule:** Using `>` rather than `>=` when shifting preserves the existing order of items with equal keys.

4. **Budget arithmetic:** If four records each cost 2 seconds to send, total time is `4 × 2 = 8` seconds.

5. **Privacy minimization:** If a task only needs a count, sending names too adds personally identifying data without improving the calculation.


**Authoring-only failure consequence:** A wrong plan can waste the short transmission window or send personal data the aircraft does not need.

**Authoring-only later travel:** Evidence unlocks Software Lab then Communications & Weather; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 11 proved that shared state can silently couple systems the crew thought were independent. The rescue queue must preserve operational priority while fitting inside a short transmission budget and excluding data the aircraft does not need. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: The primary mast is icing, so a rover relay must follow a recursively generated safe route before the command path disappears.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M12-B1 — On arrival at Operations Module

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Rescue Board shows a ten-second transmission budget and six candidate message fields.  
**Dialogue bubble — Dr. Elena Park, station director:** “The aircraft needs enough to act, not everything we know. Choose what earns space in ten seconds.”  
**Unlocks:** Stop 45.

### Beat M12-B2 — After Stop 45

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** Runway, weather, power endurance, and medical count remain; PII and the debug dump are rejected.  
**Panel text:** “Four operational fields survive the budget; now their order must be built.”  
**Waypoint:** “Take the four selected fields to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 46.

### Beat M12-B2B — After Stop 46

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** Selection-sort passes place WEATHER first and expose the equal-priority POWER/RUNWAY pair.  
**Panel text:** “The priority values are ordered; one equal-priority relationship still has to be preserved.”  
**Unlocks:** Stop 47.

### Beat M12-B3 — After Stop 47

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** Stable insertion logic preserves POWER before RUNWAY among equal priorities.  
**Waypoint:** “Take the finished queue to the Link Console in Communications & Weather.”  
**Unlocks:** Communications & Weather and Stop 48.

### Beat M12-B4 — After Stop 48

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The aircraft acknowledges the four-item queue inside the ten-second burst.  
**Panel text:** “The rescue packet is short, ordered, and contains no unnecessary PII.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M12-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** The four-item packet leaves in under ten seconds and unnecessary PII stays local; the Weather Mast Console then posts `PRIMARY ANTENNA ICING` with the rescue countdown still running.  
**Dialogue bubble — Liv Andersen, communications and weather lead:** “The aircraft got what it needed and nothing it did not. Short can still be complete.”  
**Waypoint:** “Inspect the acknowledged queue, then look at the antenna-icing warning before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**3 locations:** Operations Module → Software Lab → Communications & Weather. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Dr. Elena Park, Station director,** pushes to keep 28 people alive and preserve the evacuation option. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Liv Andersen, Communications and weather lead,** pushes to hold a satellite path and identify a safe rescue window.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Ethics, privacy, bias, and impact of computing:** Impact-of-computing reasoning asks what data are necessary, who bears risk, and whether a technical choice creates avoidable privacy harm.

- **Selection sort and insertion sort:** Delayed retrieval of search/efficiency asks how algorithm choice and ordering affect work and downstream behavior.

- **Selection sort and insertion sort:** Sorting correctness can include a stability requirement in addition to numeric order.

- **ArrayList methods, traversals, mutation, and algorithms:** A final implementation check must test the actual data structure and output, not assume the planned queue is what was transmitted.


## H1. Stop 45 — Choose what the aircraft needs

**Format/placement:** VALUE, Dr. Elena Park at the Rescue Board.

**Metadata:** Concept: 38 — Ethics, privacy, bias, and impact of computing; Keystone: Data quality & representation; Area: OPS; Prerequisites: Introduces explicit privacy/impact reasoning from the supplied cheat sheet.; Learning role: INTRODUCE; Difficulty: L4; Story role: clue.

**Briefing decision advanced:** which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII.

**Call — exact player copy:** Go to Operations Module and meet Dr. Elena Park, station director, at the Rescue Board.

**Stop reason — exact player copy:** Park has ten transmission seconds and must send enough operational evidence for the aircraft to act without exposing information it does not need.

**Question card story setup — exact player copy (37 words; 2 sentences):** Each message item has a transmission cost, and names plus birthdates are personally identifiable information that do not change the landing decision. Spend the ten-second budget on the evidence that determines runway, weather, medical, and power readiness.

**Question card story-science connection — exact player copy:** Useful computing decisions include both technical sufficiency and the human cost of collecting or transmitting unnecessary personal data.

**Format-specific interaction block:**
```yaml
value:
  budget: 10
  options:
    - {id: runway, label: "runway surface state", axis: "landing surface", cost: 2, required: true, reveals: "whether the runway can accept the aircraft"}
    - {id: weather, label: "crosswind and visibility", axis: "flight conditions", cost: 2, required: true, reveals: "whether the approach is inside weather limits"}
    - {id: power, label: "station power endurance", axis: "station endurance", cost: 2, required: true, reveals: "whether landing support can remain powered"}
    - {id: medical, label: "medical passenger count", axis: "casualty load", cost: 2, required: true, reveals: "how many medical seats the aircraft must plan for"}
    - {id: pii, label: "names and birthdates of all 28 people", axis: "personal data", cost: 5, reveals: "identities that do not change the landing decision"}
    - {id: debug, label: "full controller debug dump", axis: "diagnostics", cost: 6, reveals: "low-level software details that do not change the landing decision"}
  correct: [runway, weather, power, medical]
  answerText: "The four operational axes cost eight seconds and each changes the landing plan; personal data and a full debug dump consume bandwidth without changing that decision."
```

**Question card prompt — exact player copy:** Spend at most ten seconds and submit the evidence set the aircraft needs for the landing decision.

**Correct result:** Runway + weather + power + medical count; total 8 seconds.

**Answer text:** Those four items each change an operational decision, while PII and a full debug dump consume scarce bandwidth without changing the landing call.

**Why/mechanism:** Impact-of-computing reasoning asks what data are necessary, who bears risk, and whether a technical choice creates avoidable privacy harm.

**Wrong-path feedback:**

- PII is not required for the landing decision.

- The debug dump exceeds the remaining budget after required operational items.

- Dropping a required operational item removes evidence the aircraft needs.

**State/output:** The Rescue Board marks the four operational items SEND and the PII/debug items LOCAL ONLY.

**Unlock:** Stop 46.

**Retrieval:** Introduces explicit privacy/impact reasoning from the supplied cheat sheet.

**Later payoff:** Travel to the Software Lab unlocks to order the chosen operational queue.


## H2. Stop 46 — Order the priority passes

**Format/placement:** SEQUENCE, Software Lab — Code Review Wall.

**Metadata:** Concept: 32 — Selection sort and insertion sort; Keystone: Search & efficiency, Collections & indexing; Area: CODE; Prerequisites: Delayed retrieval of search/efficiency from Mission 10 after Mission 11.; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Briefing decision advanced:** which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The message set is fixed, but the queue must be sorted by priority without losing the original order of equal-priority safety items.

**Question card story setup — exact player copy (38 words; 2 sentences):** The four items enter as `POWER(2)`, `RUNWAY(2)`, `WEATHER(1)`, and `MEDICAL(3)`, where smaller numbers mean higher priority. Put the first two selection-sort placements on the rail so Priya can compare them with a stable alternative.

**Question card story-science connection — exact player copy:** Sorting is not just cosmetic here because the aircraft acts on the earliest items before the burst is fully complete.

**Format-specific interaction block:**
```yaml
cards:
- id: w
  label: WEATHER(1) moves to position 0
- id: p
  label: POWER(2) becomes next selected minimum
- id: r
  label: RUNWAY(2) follows POWER among equal priorities
- id: m
  label: MEDICAL(3) remains last
order:
- w
- p
- r
- m
```

**Question card prompt — exact player copy:** Place the four selection-sort outcomes in the order produced by ascending priority, preserving the observed tie result.

**Correct result:** WEATHER → POWER → RUNWAY → MEDICAL.

**Answer text:** Selection sort repeatedly chooses the smallest remaining priority, and this particular pass leaves POWER before RUNWAY after the first swap.

**Why/mechanism:** Delayed retrieval of search/efficiency asks how algorithm choice and ordering affect work and downstream behavior.

**Wrong-path feedback:**

- Putting MEDICAL earlier contradicts its priority 3.

- Reversing POWER/RUNWAY ignores the displayed tie behavior being audited.

**State/output:** The Code Review Wall shows the selection-sort queue and highlights the equal-priority pair.

**Unlock:** Stop 47.

**Retrieval:** Delayed retrieval of search/efficiency from Mission 10 after Mission 11.

**Later payoff:** Stop 47 checks a stable insertion condition that preserves the intended equal-priority order.


## H3. Stop 47 — Preserve equal-priority order

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 32 — Selection sort and insertion sort; Keystone: Search & efficiency, Collections & indexing; Area: CODE; Prerequisites: Combines sorting with collection order and delayed efficiency reasoning.; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Briefing decision advanced:** which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The selection-sort trace exposes an equal-priority pair, so Priya wants an insertion rule that never moves a later equal-priority item ahead of an earlier one.

**Question card story setup — exact player copy (35 words; 2 sentences):** Insertion sort shifts prior items while their priority is worse than the current item. Choose the comparison that shifts only strictly larger priority numbers and therefore preserves POWER before RUNWAY when both have priority 2.

**Question card story-science connection — exact player copy:** A one-character comparison choice can change whether equal-priority rescue actions retain their original operational order.

**Format-specific interaction block:**
```yaml
derive:
  start: "The list already contains POWER before RUNWAY, and the current item has the same priority."
  goal: "insert an item without reversing earlier equal-priority items"
  steps:
    - id: condition
      prompt: "Choose the stable shift condition."
      choices:
        - {line: "while (j >= 0 && queue[j].priority > current.priority)", correct: true}
        - {line: "while (j >= 0 && queue[j].priority >= current.priority)", correct: false, survives: true, why: "Using >= shifts earlier items even on a tie, so a later equal-priority item can move ahead and destroy stable order."}
    - id: result
      prompt: "Choose the equal-priority result."
      choices:
        - {line: "POWER stays before RUNWAY", correct: true}
        - {line: "RUNWAY may move ahead of POWER solely because priorities tie", correct: false, survives: true, why: "A stable insertion preserves the original order of equal keys; equality alone is not a reason to reverse them."}
```

**Question card prompt — exact player copy:** Choose the insertion-sort comparison and the resulting order for the equal-priority pair.

**Correct result:** Use `>` rather than `>=`; POWER remains before RUNWAY.

**Answer text:** Strict `>` shifts only worse priorities, so an equal-priority earlier item is not moved behind the later one.

**Why/mechanism:** Sorting correctness can include a stability requirement in addition to numeric order.

**Wrong-path feedback:**

- `>=` allows equal-priority items to shift and can reverse their original order.

- A stable comparison preserves, rather than arbitrarily rearranges, the tie.

**State/output:** The Code Review Wall posts `STABLE PRIORITY ORDER: WEATHER, POWER, RUNWAY, MEDICAL`.

**Unlock:** Stop 48.

**Retrieval:** Combines sorting with collection order and delayed efficiency reasoning.

**Later payoff:** Travel to Communications unlocks for the live burst.


## H4. Stop 48 — Transmit the ordered plan

**Format/placement:** VERIFY, Link Console.

**Metadata:** Concept: 29 — ArrayList methods, traversals, mutation, and algorithms; Keystone: Collections & indexing, Debugging & tests; Area: COMMS; Prerequisites: Combines list algorithms, sorting, test discipline, and impact-of-computing constraints.; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** which ordered rescue message gives the aircraft the information it needs without wasting the limited burst or exposing unnecessary PII.

**Call — exact player copy:** Go to the Link Console in Communications & Weather.

**Stop reason — exact player copy:** The four-item queue now fits the privacy and priority rules, but the aircraft must receive exactly that ordered list within the ten-second burst.

**Question card story setup — exact player copy:** The committed queue is `WEATHER, POWER, RUNWAY, MEDICAL`, each item costs two seconds, and no PII item should enter the transmitted ArrayList. Commit the total burst time before the live queue reveals how long transmission actually took.

**Question card story-science connection — exact player copy:** The mission succeeds only if data selection, list order, and transmission budget all agree in one observable output.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit total transmission time for the four-item queue before SEND unlocks."
  predictionRange: {min: 0, max: 10, step: 1, unit: "s"}
  truth: 8
  measurement:
    label: "total transmission time"
    cost: 1
  correct_action: "Accept the rescue message."
  answerText: "The four operational items transmit in eight seconds, preserve WEATHER, POWER, RUNWAY, MEDICAL order, and send zero PII items."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the total transmission time for four two-second items. OPERATE: send the rescue queue. MEASURE: reveal the burst time. INTERPRET: verify the four-item order and zero-PII condition, then submit ACCEPT or ABORT.

**Correct result:** 8 seconds; 4 items; WEATHER, POWER, RUNWAY, MEDICAL; 0 PII; ACCEPT.

**Answer text:** The verified ArrayList contains only the chosen evidence and retains the intended stable priority order inside the time budget.

**Why/mechanism:** A final implementation check must test the actual data structure and output, not assume the planned queue is what was transmitted.

**Wrong-path feedback:**

- Any PII count above zero violates the chosen data policy.

- Ten or more seconds contradict four two-second items.

- Different order violates the stable sort result.

**State/output:** The Message Queue Board shows the four-item burst acknowledged by the aircraft.

**Unlock:** Beat M12-B4 and the Mission 12 outcome.

**Retrieval:** Combines list algorithms, sorting, test discipline, and impact-of-computing constraints.

**Later payoff:** Mission 13 begins because the primary antenna may ice before the final rescue window.


## I. Mission outcome

**Mission decision:** Send runway, weather, power time, and medical count; keep tied items in their old order. Those four items fit the ten-second burst, while names and the debug dump do not. The aircraft accepts the short queue. Icing then threatens the main antenna.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 12 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 12:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The aircraft acknowledges the ordered operational queue without receiving unnecessary PII.  
**Automatic bar change:** HABITAT +0 | POWER +0 | CONTROL +4 | RESCUE +7  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 2/2/0/0; expected bars = 97/97/100/100, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Impact-of-computing reasoning asks what data are necessary, who bears risk, and whether a technical choice creates avoidable privacy harm.

- A final implementation check must test the actual data structure and output, not assume the planned queue is what was transmitted.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** Send runway, weather, power endurance, and medical count in stable priority order; omit names, birthdates, and the full debug dump.


---
# Mission 13 — THE CALL THAT CALLS ITSELF

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 12 HOURS REMAIN

**Card title:** THE CALL THAT CALLS ITSELF

**Go now:** Go to the Code Review Wall in Software Lab.

**Card body (66 words; 4 sentences):** The rescue queue is ready, but icing may remove the primary antenna before the aircraft arrives. The backup rover route uses recursion: each call solves a smaller route until a base case stops the chain. Across Software, Vehicle, and Communications, prove the builder before Rover Three enters the whiteout. By the end of the mission, decide whether Rover Three can deploy a four-waypoint relay route safely.

**Objective:** Gather enough code and station evidence to decide whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **recursion:** a method solving a problem by calling itself on a smaller version of that problem.

- **base case:** the input a recursive method can answer directly without another recursive call.

- **method contract:** the promised inputs, outputs, and conditions a method is expected to satisfy.


#### Primer concepts

- Every recursive method needs a base case and progress toward it.

- Trace call entry separately from the order in which calls return.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Base case:** `fact(0)=1` stops factorial recursion; without a base case, recursive calls continue indefinitely.

2. **Countdown recursion:** `f(3)` calling `f(2)`, then `f(1)`, then `f(0)` moves toward termination because the argument decreases.

3. **Trace return values:** If `sum(n)=n+sum(n-1)` and `sum(0)=0`, then `sum(3)=3+2+1+0=6`.

4. **Recursive binary search:** Each call keeps only the left or right half and uses a smaller interval until the target is found or the interval is empty.

5. **Progress test:** A recursive call must move its arguments toward the base case; `f(n+1)` cannot reach a base case at `n==0` when starting positive.


**Authoring-only failure consequence:** A wrong call can send Rover Three outside on a route that fails to terminate or crosses an unsafe cell.

**Authoring-only later travel:** Evidence unlocks Vehicle Bay then Communications & Weather; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 12 established a verified rescue queue, but the primary antenna may not survive the next icing burst. The relay-route builder uses recursion, where each call solves one smaller route and must eventually reach a base case that stops calling itself. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: With the relay active, every dashboard turns green, but Priya insists the rollback routine has never seen adjacent resolved records.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M13-B1 — On arrival at Software Lab

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** Code Review Wall shows the unresolved incident.  
**Dialogue bubble — Priya Nair, software architect:** “The primary mast may ice over. Prove the recursive route stops before Jonah sends the relay into the whiteout.”  
**Unlocks:** Stop 49.


### Beat M13-B2 — After Stops 49 and 50

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** The current board records the two established results in text.  
**Panel text:** “The recursive builder returns four safe waypoints and the rover relay comes online.”  

**Waypoint:** “Take that result to the Route Planning Board in Vehicle Bay.”  
**Unlocks:** Vehicle Bay and Stop 51.


### Beat M13-B3 — After Stop 51

**Presentation:** waypoint_notification.  
**Player control:** Immediate return.  
**World state:** The prior result is copied into the mission log.  
**Waypoint:** “The remaining check is at the Link Console in Communications & Weather.”  
**Unlocks:** Communications & Weather and Stop 52.


### Beat M13-B4 — After Stop 52

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board records the final decision evidence.  
**Panel text:** “The repaired recursion terminates at build(0) and returns exactly four safe waypoints, so Rover Three can deploy the backup relay.”  
**Unlocks:** Mission outcome and free-play aftermath.


### Beat M13-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** Rover Three reports each waypoint and its relay appears as a second command path; every live dashboard turns green while the rollback panel still reads `ADJACENT CASES: UNTESTED`.
**Dialogue bubble — Liv Andersen, communications and weather lead:** “The relay is real independence now, not just a second icon on the same router.”
**Waypoint:** “Walk to the changed panel and inspect the new state before opening the metric screen.”  
**Unlocks:** Metric screen after the player inspects the changed state.


## E. Location plan

**3 locations:** Software Lab → Vehicle Bay → Communications & Weather. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Jonah Reyes, Field robotics lead,** pushes to keep autonomous vehicles available for rescue and external repairs. **Liv Andersen, Communications and weather lead,** pushes to hold a satellite path and identify a safe rescue window.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Recursion: base cases, recursive calls, and tracing:** Recursion replaces loop repetition with a chain of method calls, but termination still requires measurable progress.

- **Recursion: base cases, recursive calls, and tracing:** Recursive methods need a directly solvable base case and guaranteed progress toward it.

- **Recursive search/sort reasoning:** Recursive reasoning can be checked by relating a larger input's result to a known smaller result and its base case.

- **Recursion: base cases, recursive calls, and tracing:** Transfer requires integrating recursion with prior data-structure and redundancy evidence rather than receiving a route as a label.


## H1. Stop 49 — Trace the recursive calls

**Format/placement:** SEQUENCE, Software Lab — Code Review Wall.

**Metadata:** Concept: 33 — Recursion: base cases, recursive calls, and tracing; Keystone: Iteration; Area: CODE; Prerequisites: Retrieves the progress/termination idea from Mission 3 in a new mechanism.; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** Priya needs the relay-route call stack made visible before any recursive code is allowed to command a rover outside.

**Question card story setup — exact player copy (39 words; 2 sentences):** The route builder `build(n)` calls `build(n - 1)` until no waypoints remain, then adds one waypoint while calls return. Put the calls for `build(3)` in entry order so the crew can see exactly where recursion must stop.

**Question card story-science connection — exact player copy:** The same progress idea used in loops now appears in recursive calls: each step must move toward a stopping state.

**Format-specific interaction block:**
```yaml
cards:
- id: c3
  label: build(3)
- id: c2
  label: build(2)
- id: c1
  label: build(1)
- id: c0
  label: build(0)
order:
- c3
- c2
- c1
- c0
```

**Question card prompt — exact player copy:** Place the four calls in the order they are entered.

**Correct result:** `build(3) → build(2) → build(1) → build(0)`.

**Answer text:** Each recursive call reduces `n` by one, so the argument approaches zero.

**Why/mechanism:** Recursion replaces loop repetition with a chain of method calls, but termination still requires measurable progress.

**Wrong-path feedback:**

- A larger `n` later in the chain moves away from termination.

- Omitting build(0) removes the state where no work remains.

**State/output:** The Code Review Wall displays the four-entry call stack.

**Unlock:** Stop 50.

**Retrieval:** Retrieves the progress/termination idea from Mission 3 in a new mechanism.

**Later payoff:** Stop 50 repairs the base case reached by this stack.


## H2. Stop 50 — Repair the base case

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 33 — Recursion: base cases, recursive calls, and tracing; Keystone: Iteration, Methods & abstraction; Area: CODE; Prerequisites: Builds directly on Stop 49's call stack.; Learning role: PRACTICE; Difficulty: L4; Story role: reveal.

**Briefing decision advanced:** whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** Stop 49 reaches `build(0)`, but the current code tests `n < 0`, so zero still attempts another recursive call and an invalid waypoint access.

**Question card story setup — exact player copy (39 words; 2 sentences):** The empty-route case should return before another call, while every nonzero call must reduce `n`. Choose the base condition and recursive progress line that guarantee the method reaches a solved smaller problem instead of stepping past the route start.

**Question card story-science connection — exact player copy:** A correct base case is both a stopping rule and part of the method's promised behavior for empty input.

**Format-specific interaction block:**
```yaml
derive:
  start: "build(n) is called with a nonnegative count; each recursive call must move n toward its stopping case."
  goal: "reach a terminating base case by reducing the remaining count"
  steps:
    - id: base
      prompt: "Choose the base case."
      choices:
        - {line: "if (n == 0) return;", correct: true}
        - {line: "if (n == -1) return;", correct: false, survives: true, why: "Starting from n >= 0 and reducing by one, zero is the stopping state; waiting for -1 performs one extra invalid step."}
    - id: progress
      prompt: "Choose the recursive call."
      choices:
        - {line: "build(n - 1);", correct: true}
        - {line: "build(n + 1);", correct: false, survives: true, why: "Increasing n moves the argument away from the zero base case, so the recursion cannot terminate through the intended countdown."}
```

**Question card prompt — exact player copy:** Choose the base case and recursive call that guarantee termination.

**Correct result:** `if (n == 0) return;` and `build(n - 1);`.

**Answer text:** Zero is the first input with no waypoints left to add, and subtracting one moves every positive input toward that case.

**Why/mechanism:** Recursive methods need a directly solvable base case and guaranteed progress toward it.

**Wrong-path feedback:**

- `n < 0` is too late because build(0) still recurses.

- `n + 1` moves away from the base case and can recurse forever.

**State/output:** The Code Review Wall marks `BASE CASE n==0` and `PROGRESS n-1`.

**Unlock:** Stop 51.

**Retrieval:** Builds directly on Stop 49's call stack.

**Later payoff:** Travel to the Vehicle Bay unlocks for contract testing.


## H3. Stop 51 — Test the recursive contract

**Format/placement:** PROTOCOL, Vehicle Bay — Route Planning Board.

**Metadata:** Concept: 34 — Recursive search/sort reasoning; Keystone: Search & efficiency, Methods & abstraction; Area: VEH; Prerequisites: Combines method-contract reasoning from Mission 4 and delayed search/efficiency reasoning from Mission 10.; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Briefing decision advanced:** whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay.

**Call — exact player copy:** Go to the Route Planning Board in Vehicle Bay.

**Stop reason — exact player copy:** The recursion now terminates, but Jonah needs expected outputs for boundary and ordinary inputs before the route can be trusted.

**Question card story setup — exact player copy (39 words; 2 sentences):** The repaired builder should return no waypoints for `build(0)`, one waypoint for `build(1)`, and four waypoints for `build(4)`. Match each call to its expected route size, then compare the recursive pattern with the earlier halving-search idea.

**Question card story-science connection — exact player copy:** A recursive method is correct only when its outputs match the contract across boundary and ordinary cases, not merely when it stops.

**Format-specific interaction block:**
```yaml
scenarios:
- id: s0
  label: build(0)
- id: s1
  label: build(1)
- id: s4
  label: build(4)
choices:
- id: r0
  label: 0 waypoints
- id: r1
  label: 1 waypoint
- id: r4
  label: 4 waypoints
mapping:
  s0: r0
  s1: r1
  s4: r4
```

**Question card prompt — exact player copy:** Match each recursive input to the number of waypoints it should return.

**Correct result:** build(0)→0, build(1)→1, build(4)→4.

**Answer text:** The base case contributes no waypoint, and each recursive level adds exactly one waypoint to the smaller solution.

**Why/mechanism:** Recursive reasoning can be checked by relating a larger input's result to a known smaller result and its base case.

**Wrong-path feedback:**

- Any nonzero result for build(0) violates the base case.

- Returning fewer than n waypoints means some recursive level failed to add its contribution.

**State/output:** The Route Table posts three accepted recursive contract cases.

**Unlock:** Stop 52.

**Retrieval:** Combines method-contract reasoning from Mission 4 and delayed search/efficiency reasoning from Mission 10.

**Later payoff:** Travel to Communications unlocks for a live route verification through the backup link.


## H4. Stop 52 — Build the relay route

**Format/placement:** VERIFY, Link Console.

**Metadata:** Concept: 33 — Recursion: base cases, recursive calls, and tracing; Keystone: Reliability & redundancy, Collections & indexing; Area: COMMS; Prerequisites: Transfers reliability from Mission 6 and 2D/index reasoning from Mission 9.; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the recursive route builder will terminate and produce a four-waypoint path safe enough for Rover Three to carry the backup relay.

**Call — exact player copy:** Go to the Link Console in Communications & Weather.

**Stop reason — exact player copy:** The recursive contract is verified, but the relay route must still be derived from the safe-cell list rather than printed in advance.

**Question card story setup — exact player copy:** The console shows safe waypoints in scrambled storage order: `W3`, `W1`, `W4`, `W2`, with next fields `W3→W4`, `W1→W2`, `W4→null`, and `W2→W3`. Starting at W1, commit the route length before the simulation reveals the recursive result.

**Question card story-science connection — exact player copy:** The player must combine object/link data with recursion to produce the path instead of reading the answer from a prefilled route list.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit the number of waypoints returned from W1 before SIMULATE unlocks."
  predictionRange: {min: 1, max: 6, step: 1, unit: "waypoints"}
  truth: 4
  measurement:
    label: "returned route length"
    cost: 1
  correct_action: "Dispatch Rover Three with the relay."
  answerText: "Following next fields from W1 returns four waypoints in order W1→W2→W3→W4; recursion then reaches build(0), and no unsafe waypoint enters the path."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial the number of waypoints returned from W1. OPERATE: simulate the recursive builder. MEASURE: reveal the returned route length. INTERPRET: inspect the returned labels and base call, then submit DISPATCH or HOLD.

**Correct result:** 4 waypoints; W1,W2,W3,W4; build(0); 0 unsafe; DISPATCH.

**Answer text:** The recursive builder follows one smaller linked remainder at each call, while the existing 2D-map safety tags constrain which waypoint objects are eligible.

**Why/mechanism:** Transfer requires integrating recursion with prior data-structure and redundancy evidence rather than receiving a route as a label.

**Wrong-path feedback:**

- Any order that breaks a displayed link is not the returned route.

- A fifth waypoint contradicts the base case.

- HOLD contradicts the verified safe route and zero unsafe count.

**State/output:** The Link Console shows Rover Three entering the four-waypoint route and a second command channel coming online.

**Unlock:** Beat M13-B4 and the Mission 13 outcome.

**Retrieval:** Transfers reliability from Mission 6 and 2D/index reasoning from Mission 9.

**Later payoff:** Mission 14 begins after every current-state dashboard turns green.


## I. Mission outcome

**Mission decision:** Rover Three can carry the backup relay on the fixed route. The code reaches `build(0)` and returns four safe points. The rover deploys and gives the station a second command path. All dashboards turn green, but rollback has not tested side-by-side resolved records.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 13 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 12:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The rover relay comes online, but outside deployment consumes battery reserve.  
**Automatic bar change:** HABITAT +0 | POWER -2 | CONTROL +4 | RESCUE +8  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 1/3/0/0; expected bars = 98/98/100/100, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Recursion replaces loop repetition with a chain of method calls, but termination still requires measurable progress.

- Transfer requires integrating recursion with prior data-structure and redundancy evidence rather than receiving a route as a label.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The repaired recursion terminates at build(0) and returns exactly four safe waypoints, so Rover Three can deploy the backup relay.


---
# Mission 14 — ALL GREEN

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 10 HOURS REMAIN

**Card title:** ALL GREEN

**Go now:** Go to the Test Bench in Software Lab.

**Card body (64 words; 4 sentences):** The relay is active and every dashboard is green, but rollback has never faced adjacent resolved records. Holdout and stress tests ask whether a repair survives inputs that did not shape it. Across Software, Power, and Operations, challenge the green state before anyone trusts the rollback path. By the end of the mission, decide whether the station is truly safe or only currently stable.

**Objective:** Gather enough code and station evidence to decide whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **holdout test:** a test on cases that were not used while choosing or tuning the solution.

- **residual:** the difference between an observed result and the result a model or program predicts.

- **ArrayList:** a resizable indexed collection that can add and remove elements while a program runs.


#### Primer concepts

- Passing development examples does not prove a repair works on unseen structure.

- A patterned residual can be more diagnostic than a slightly better aggregate score.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Training versus unseen test:** A rule that fits the examples used to build it can still fail on new examples, so keep some cases hidden until the rule is frozen.

2. **Edge-case generalization:** If a list algorithm passes isolated removable items, also test adjacent removable items because index shifts create a different case.

3. **Residual pattern:** Errors `+2,+2,-2,-2` average to zero but are structured; a small mean error does not prove a good model.

4. **Stress test:** Vary one assumption across a reasonable range and reject a method if it fails anywhere in the range that matters.

5. **Quiet control:** A normal independent check can rule out explanations just as strongly as an abnormal reading can support one.


**Authoring-only failure consequence:** A wrong call can approve a recovery path that fails exactly when the station needs rollback most.

**Authoring-only later travel:** Evidence unlocks Power & Thermal Plant then Operations Module; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 13 created an independent command path, and every station dashboard now reports green. A green current-state display does not prove that recovery code will work on inputs it never saw during development. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: The aircraft enters the final weather window, forcing a staged canary release that can be reversed without losing the independent relay.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M14-B1 — On arrival at Software Lab

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Test Bench shows ALL GREEN beside a blank held-out test column.  
**Dialogue bubble — Priya Nair, software architect:** “Everything is green because we tested what we expected. Now test what the rollback has never seen.”  
**Unlocks:** Stop 53.

### Beat M14-B2 — After Stop 53

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** Forward rollback falls to 0/5 on held-out adjacent-record cases while backward rollback scores 5/5.  
**Panel text:** “ALL GREEN is revoked; adjacency is the new stress variable.”  
**Waypoint:** “Take the holdout failure to Malik Okafor, power and thermal engineer, at the Load Board.”  
**Unlocks:** Power & Thermal Plant and Stop 54.

### Beat M14-B2B — After Stop 54

**Presentation:** equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The Load Board shows backward removal as the only strategy that stays correct and under twelve inspections.  
**Panel text:** “One robust candidate remains; compare its failure pattern with the old incident trace.”  
**Unlocks:** Stop 55 at the Generator Controller.

### Beat M14-B3 — After Stop 55

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The alternating rollback residuals are pinned beside Mission 8’s A-C-D-F survivor pattern.  
**Waypoint:** “Take the matched failure signature to the Incident Analysis Board in Operations Module.”  
**Unlocks:** Operations Module and Stop 56.

### Beat M14-B4 — After Stop 56

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** The incident board changes from ALL GREEN to `LIVE STABLE / RECOVERY UNVERIFIED`.  
**Panel text:** “Current systems are stable; forward rollback is not safe.”  
**Unlocks:** Mission outcome and free-play aftermath.

### Beat M14-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** ALL GREEN changes to `LIVE STABLE / RECOVERY UNVERIFIED`, and the old alternating skip signature is pinned beside rollback; the Rescue Board starts the final aircraft-window countdown.  
**Dialogue bubble — Dr. Elena Park, station director:** “Green means the live state is quiet, not that recovery is safe. We do not restart until rollback survives the unseen case.”  
**Waypoint:** “Inspect the revoked green status, then look at the final aircraft-window countdown before opening the metric screen.”  
**Unlocks:** Metric screen after both changed states are inspected.
## E. Location plan

**3 locations:** Software Lab → Power & Thermal Plant → Operations Module. 
Each later location unlocks only after the preceding evidence makes that move necessary; the destination supplies code, equipment, or an independent reading unavailable at the prior place.


## F. Characters and dramatic beat

**Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Malik Okafor, Power and thermal engineer,** pushes to keep heat and power above survival limits. **Dr. Elena Park, Station director,** pushes to keep 28 people alive and preserve the evacuation option.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Testing, debugging, edge cases, and incremental development:** Holdout testing separates generalization from memorizing or tuning to the development examples.

- **Selection-and-iteration algorithms: count, sum, min/max, search:** Stress testing varies a plausible assumption and rejects candidates when any required criterion fails.

- **ArrayList methods, traversals, mutation, and algorithms:** Residual structure can reject a model or algorithm that an aggregate score alone would incorrectly favor.

- **Abstraction and program design:** Abstraction and verification distinguish present-state success from the behavior of a different path that may run during failure.


## H1. Stop 53 — Test unseen rollback cases

**Format/placement:** VERIFY, Test Bench.

**Metadata:** Concept: 35 — Testing, debugging, edge cases, and incremental development; Keystone: Debugging & tests, Data quality & representation; Area: CODE; Prerequisites: Delayed retrieval of formal testing from Missions 4 and 8.; Learning role: RETRIEVE; Difficulty: L4; Story role: reversal.

**Briefing decision advanced:** whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure.

**Call — exact player copy:** Go to the Test Bench in Software Lab.

**Stop reason — exact player copy:** Every dashboard is green, but Priya refuses to trust rollback because its development cases never contained adjacent resolved records.

**Question card story setup — exact player copy:** Forward rollback passed five development cases with no adjacent resolved records, while a backward-traversal control already passes five held-out adjacency cases. Commit how many of five held-out cases forward rollback will restore exactly before the sealed suite opens.

**Question card story-science connection — exact player copy:** A held-out test asks whether a repair survives structure that did not shape the implementation, rather than rewarding success on development cases alone.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit how many of the five held-out cases forward rollback will restore exactly."
  predictionRange: {min: 0, max: 5, step: 1, unit: "cases"}
  truth: 0
  measurement:
    label: "run the held-out suite against forward rollback"
    cost: 1
  correct_action: "Reject forward rollback; the backward-traversal control passes 5 of 5 held-out cases."
  answerText: "Forward rollback restores 0 of 5 held-out adjacency cases exactly, while backward traversal restores 5 of 5; reject the forward routine."
```

**Question card prompt — exact player copy:** PREDICT AND COMMIT: dial how many of five held-out cases forward rollback will restore exactly. OPERATE: run the sealed suite. MEASURE: reveal the exact-restoration count. INTERPRET: compare it with the backward control's 5/5 and submit FORWARD or BACKWARD.

**Correct result:** Forward rollback: 0/5; choose BACKWARD.

**Answer text:** Forward rollback fails all five held-out adjacency cases, while backward traversal restores all five exactly.

**Why/mechanism:** The development cases never contained adjacent removals, so forward traversal never exposed its index-shift weakness there. The sealed adjacency cases do, and the failure appears immediately.

**Wrong-path feedback:** - Predicting 5/5 copies the development score instead of reasoning about the new adjacent-record structure.

- Choosing FORWARD after the measurement ignores a 0/5 held-out score against a backward control at 5/5.

**State/output:** The Test Bench replaces `ALL GREEN` with `HELD-OUT FAILURE — FORWARD ROLLBACK` and records backward traversal as the 5/5 control.

**Unlock:** Stop 54.

**Retrieval:** Delayed retrieval of formal testing from Missions 4 and 8.

**Later payoff:** Stop 54 identifies the hidden input dimension that controls failure.


## H2. Stop 54 — Stress the adjacency assumption

**Format/placement:** STRESS, Malik Okafor at the Load Board.

**Metadata:** Concept: 17 — Selection-and-iteration algorithms: count, sum, min/max, search; Keystone: Iteration, Debugging & tests; Area: POWER; Prerequisites: Transfers delayed iteration reasoning from Mission 3 into an adversarial boundary test.; Learning role: TRANSFER; Difficulty: L4; Story role: obstacle.

**Briefing decision advanced:** whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure.

**Call — exact player copy:** Go to Power & Thermal Plant and meet Malik Okafor, power and thermal engineer, at the Load Board.

**Stop reason — exact player copy:** The holdout failure appears only when resolved records are adjacent, so Malik needs the rollback algorithm that remains safe as adjacent runs become longer.

**Question card story setup — exact player copy (40 words; 2 sentences):** The holdout failure appears only when resolved records are adjacent, so Malik now has the hidden stress variable. Move the maximum adjacent run from one through four and compare three rollback strategies against zero skipped records and a twelve-inspection limit.

**Question card story-science connection — exact player copy:** A robust algorithm must survive the plausible input range and every required criterion, not merely the nominal case that made the dashboard green.

**Format-specific interaction block:**
```yaml
stress:
  assumption: {label: "maximum adjacent resolved run", unit: "records", min: 1, max: 4, nominal: 1, step: 1, worst: max}
  criteria:
    - {name: "Removes every resolved record", key: "correctness"}
    - {name: "Uses no more than 12 inspections", key: "efficiency"}
  optimiseOn: "efficiency"
  candidates:
    - name: "Forward removal"
      feasible: 1
      scores: {correctness: 1.0, efficiency: 1.0}
      values: [{at: 1, ok: true, inspections: 8},{at: 2, ok: false, inspections: 8},{at: 3, ok: false, inspections: 8},{at: 4, ok: false, inspections: 8}]
    - name: "Hold index"
      feasible: 3
      scores: {correctness: 1.0, efficiency: 0.8}
      values: [{at: 1, ok: true, inspections: 8},{at: 2, ok: true, inspections: 10},{at: 3, ok: true, inspections: 12},{at: 4, ok: true, inspections: 15}]
    - name: "Backward removal"
      feasible: 4
      scores: {correctness: 1.0, efficiency: 0.9}
      values: [{at: 1, ok: true, inspections: 8},{at: 2, ok: true, inspections: 8},{at: 3, ok: true, inspections: 8},{at: 4, ok: true, inspections: 8}]
  robust: "Backward removal"
  answerText: "Forward removal loses feasibility once adjacency reaches 2; hold-index survives through 3 but fails the inspection limit at 4; backward removal remains feasible through the full range."
```

**Question card prompt — exact player copy:** Move the adjacent-run assumption from 1 through 4 and submit the one rollback strategy that meets both criteria everywhere.

**Correct result:** `Backward removal`.

**Answer text:** Forward removal stops being feasible at adjacent run 2, hold-index reaches its limit at 3, and backward removal survives through run 4.

**Why/mechanism:** STRESS asks how far each candidate survives as the hard assumption worsens. A candidate that looks efficient at the nominal case is rejected when the slider passes its explicit feasibility limit.

**Wrong-path feedback:**

- Forward removal fails at run length 2 and above.

- Hold-index remains correct but reaches 15 inspections at run length 4.

**State/output:** The Load Board marks forward removal failed and leaves BACKWARD ROLLBACK as the only strategy that meets both stress criteria.

**Unlock:** Stop 55.

**Retrieval:** Transfers delayed iteration reasoning from Mission 3 into an adversarial boundary test.

**Later payoff:** Stop 55 uses the same Power & Thermal location to compare the surviving strategy with the old Mission 8 skip signature.


## H3. Stop 55 — Audit the rollback pattern

**Format/placement:** RESIDUAL, Generator Controller.

**Metadata:** Concept: 29 — ArrayList methods, traversals, mutation, and algorithms; Keystone: Collections & indexing, Debugging & tests; Area: POWER; Prerequisites: Transfers ArrayList mutation reasoning from Mission 8 after six intervening missions.; Learning role: TRANSFER; Difficulty: L5; Story role: reveal.

**Briefing decision advanced:** whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure.

**Call — exact player copy:** Go to the Generator Controller in Power & Thermal Plant.

**Stop reason — exact player copy:** The stress test rejects forward removal, but the crew still needs to know whether today's failure is the old skip mechanism or a new defect.

**Question card story setup — exact player copy (37 words; 2 sentences):** Eight controller records have restore-time residuals in milliseconds after rollback. Compare the lower-RMS forward routine's alternating residual pattern with the slightly higher-RMS backward routine's unstructured jitter, then decide which implementation the pattern forces the crew to reject.

**Question card story-science connection — exact player copy:** A systematic residual pattern can identify a wrong mechanism even when its aggregate error score looks slightly better.

**Format-specific interaction block:**
```yaml
residual:
  axis: {quantity: "controller record index", unit: "index"}
  hint: "A lower RMS is not enough if the residuals repeat a structured every-other-record pattern."
  fits:
    - id: forward_remove
      label: "Forward removal routine"
      error: 0.707
      structured: true
      points:
        - {x: 0, residual: 0.0}
        - {x: 1, residual: 1.0}
        - {x: 2, residual: 0.0}
        - {x: 3, residual: 1.0}
        - {x: 4, residual: 0.0}
        - {x: 5, residual: 1.0}
        - {x: 6, residual: 0.0}
        - {x: 7, residual: 1.0}
    - id: backward_remove
      label: "Backward removal routine"
      error: 0.711
      structured: false
      points:
        - {x: 0, residual: 0.6}
        - {x: 1, residual: -0.8}
        - {x: 2, residual: 0.5}
        - {x: 3, residual: -0.7}
        - {x: 4, residual: 0.9}
        - {x: 5, residual: -0.6}
        - {x: 6, residual: 0.8}
        - {x: 7, residual: -0.7}
  conclusion: "Reject forward_remove despite lower RMS because every second record shows the same one-sided restore residual."
  answerText: "Forward removal has the slightly lower RMS but a repeating every-second-record pattern; backward removal has slightly larger unstructured jitter and no systematic skip signature."
```

**Question card prompt — exact player copy:** Compare both residual fields and submit which rollback implementation must be rejected despite its lower RMS.

**Correct result:** Reject `forward_remove`.

**Answer text:** The forward residuals alternate exactly between 0 and +1 ms by record index, reproducing the every-second-record structure of the Mission 8 skip bug; backward residuals fluctuate around zero without ordered structure.

**Why/mechanism:** Residual structure can reject a model or algorithm that an aggregate score alone would incorrectly favor.

**Wrong-path feedback:**

- Choosing backward solely because 0.711 is larger ignores that RMS is not the only diagnostic criterion here.

- Calling the forward pattern random ignores four repeated +1 residuals on alternating indexes.

**State/output:** The Load Board pins Mission 8's `A C D F` survivor pattern beside the alternating rollback residuals.

**Unlock:** Stop 56.

**Retrieval:** Transfers ArrayList mutation reasoning from Mission 8 after six intervening missions.

**Later payoff:** Return to Operations for the station-level diagnosis.


## H4. Stop 56 — Decide whether green means safe

**Format/placement:** DIAGNOSIS, Operations Module — Incident Analysis Board.

**Metadata:** Concept: 20 — Abstraction and program design; Keystone: Debugging & tests, Boolean logic, Data quality & representation; Area: OPS; Prerequisites: Transfers testing and Boolean decision logic into a station-level diagnosis.; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** whether the station is truly safe to wait for rescue or the green dashboard is hiding an unverified rollback failure.

**Call — exact player copy:** Go to the Incident Analysis Board in Operations Module.

**Stop reason — exact player copy:** The holdout, stress, and residual tests all challenge ALL GREEN, but Park needs a station-level diagnosis that also respects the quiet live systems.

**Question card story setup — exact player copy (37 words; 2 sentences):** Heat, air, rover, and rescue link remain inside verified limits now, while forward rollback fails unseen adjacency cases and reproduces the alternating skip signature. Diagnose what the green dashboard actually proves about current state and future recovery.

**Question card story-science connection — exact player copy:** The right diagnosis must explain both the quiet live controls and the failed recovery path without inventing a simultaneous hardware cascade.

**Format-specific interaction block:**
```yaml
headline: "What does ALL GREEN actually prove?"
readings:
  - {zone: "LIVE SYSTEMS", label: "heat / air / rover / link", value: "currently within verified limits", status: normal}
  - {zone: "HELD-OUT TEST", label: "forward rollback unseen cases", value: "0/5 exact", status: alarm}
  - {zone: "STRESS", label: "forward rollback at adjacency 2–4", value: "fails", status: alarm}
  - {zone: "QUIET CONTROL", label: "backward rollback", value: "5/5 and robust", status: normal}
choices:
  - {id: false_green, label: "Live stable; recovery unverified", mechanism: "Fits quiet live readings and failed forward rollback."}
  - {id: hardware, label: "A new simultaneous hardware failure is underway", mechanism: "Contradicted by quiet independent live readings."}
  - {id: safe, label: "Green dashboards prove the whole recovery path is safe", mechanism: "Contradicted by 0/5 held-out forward rollback."}
  - {id: network, label: "Packet loss caused the rollback failures", mechanism: "Rollback fails locally without network use."}
answer: false_green
rebuttals:
  hardware: "The live heat, air, rover, and link checks are normal, so a new simultaneous hardware cascade does not fit the quiet controls."
  safe: "Forward rollback scores 0/5 on unseen adjacency cases, so green live dashboards do not certify the recovery path."
  network: "The rollback failure reproduces locally without network transport, so packet loss cannot be its cause."
```

**Question card prompt — exact player copy:** Read all four zones and submit the one diagnosis that fits both the current live state and the failed rollback evidence.

**Correct result:** Live systems are stable now, but recovery is unverified; revoke ALL GREEN.

**Answer text:** The current physical systems pass independent checks, yet the recovery algorithm fails unseen and stressed inputs.

**Why/mechanism:** Abstraction and verification distinguish present-state success from the behavior of a different path that may run during failure.

**Wrong-path feedback:**

- Simultaneous hardware failure contradicts quiet controls.

- Safe recovery contradicts 0/5 holdout results.

- Network cause contradicts local rollback reproduction.

**State/output:** The Incident Console changes `ALL GREEN` to `LIVE STABLE / RECOVERY UNVERIFIED` in text and icon form.

**Unlock:** Beat M14-B4 and the Mission 14 outcome.

**Retrieval:** Transfers testing and Boolean decision logic into a station-level diagnosis.

**Later payoff:** Mission 15 begins with the final weather window and a staged canary requirement.


## I. Mission outcome

**Mission decision:** The station is stable now, but rollback is not safe yet. Forward rollback scores 0/5 on new side-by-side cases and repeats the old skip pattern. The crew revokes ALL GREEN and keeps backward rollback. The aircraft then enters the last usable weather window.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 14 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 12:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The holdout reversal revokes false confidence and forces extra rollback work during the storm.  
**Automatic bar change:** HABITAT -5 | POWER -4 | CONTROL -10 | RESCUE -3  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 2/2/0/0; expected bars = 95/96/90/97, bank = 0.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** No permanent metric lock is earned in this mission.


## K. Quick concept review

- Holdout testing separates generalization from memorizing or tuning to the development examples.

- Abstraction and verification distinguish present-state success from the behavior of a different path that may run during failure.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** The live station is stable now, but ALL GREEN is false assurance because forward rollback fails unseen adjacent-record cases.


---
# Mission 15 — WHITEOUT

## A. Mission briefing card — exact player copy

**Header:** RESCUE WINDOW — ABOUT 8 HOURS REMAIN

**Card title:** WHITEOUT

**Go now:** Go to Operations Module and meet Dr. Elena Park, station director, at the Rescue Board.

**Card body (70 words; 4 sentences):** ALL GREEN was revoked, and the aircraft is entering the last usable weather window. A staged canary release limits the first change, preserves rollback, and keeps an independent command path alive. Across Operations, Software, and Communications, prove the release gates before a full restart can erase the verified recovery path. By the end of the mission, decide which software release and rescue plan can be committed without another hidden cascade.

**Objective:** Gather enough code and station evidence to decide which final software release and rescue plan can be committed without creating another hidden cascade.

**Optional help button:** `WORKED EXAMPLES (5)` — opens five generic, ungraded examples of this mission's equations, numbers, code, or concepts. Opening the panel pauses the timer, changes no story state, and the panel can be closed and reopened.


### Worth knowing first — exact player copy

#### Glossary terms

- **redundancy:** having an independent backup path so one failure does not remove the whole function.

- **ArrayList:** a resizable indexed collection that can add and remove elements while a program runs.

- **instance field:** state stored separately inside each object.


#### Primer concepts

- A canary release changes one limited target before the wider system.

- Final authorization requires committed predictions, measured results, and an independent recovery path.


#### Equations first needed today

No new mathematical equation is needed today; use the Java rules and relationships already recorded in the mission log.


### Optional worked examples — exact player copy

These are generic practice examples. They are not part of the campaign story, are not graded, and do not change mission state.

1. **Canary test:** Apply a change to one controlled case first, compare predicted and observed output, then expand only if they agree.

2. **Backward ArrayList cleanup:** Traversing from `size()-1` down to 0 avoids skipping elements when removal shifts later indexes.

3. **Independent path:** Two outputs that depend on the same resource are not redundant; a useful backup must avoid that shared dependency.

4. **Mixed-concept trace:** For a sorted ArrayList, first make mutation safe, then choose a search method only after the final list order is known.

5. **Staged deployment:** Prediction → limited operation → measurement → interpretation is safer than changing every instance before checking the first one.


**Authoring-only failure consequence:** A wrong final plan can remove rollback or command redundancy during the last usable rescue window.

**Authoring-only later travel:** Evidence unlocks Software Lab then Communications & Weather; each move is required because the next code, device, or independent reading exists only there.


## B. Main story happening — designer summary

Mission 14 revoked ALL GREEN and proved that the station can fail during recovery even while current systems look normal. A staged release tests one controller, keeps rollback available, and preserves an independent communications path before the change expands station-wide. The four stops produce the exact mission decision, then the aftermath makes the next problem visible: None; the final verified release opens the runway route and ends the campaign.


## C. Designer intent — not shown to player

The mission is one causal investigation rather than four topic-matched questions: each stop establishes evidence required by the next, and the final stop produces the briefing's promised decision.


## D. Player-facing beat script

### Beat M15-B1 — On arrival at Operations Module

**Presentation:** nearby_character_bubble.  
**Player control:** One Continue; the mission timer starts only after the bubble closes.  
**World state:** The Rescue Board shows the final weather countdown and five release gates.  
**Dialogue bubble — Dr. Elena Park, station director:** “No full restart. Build me a release we can stop after the first controller if one prediction fails.”  
**Unlocks:** Stop 57.

### Beat M15-B2 — After Stop 57

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return; timer remains paused during the update.  
**World state:** Regression, backward rollback, rover relay, and canary monitoring are funded; FULL RESTART is crossed out.  
**Panel text:** “The staged plan is chosen; now prove the rollback code that makes it reversible.”  
**Waypoint:** “Take the release plan to the Code Review Wall in Software Lab.”  
**Unlocks:** Software Lab and Stop 58.

### Beat M15-B3 — After Stop 58

**Presentation:** equipment_panel_update + waypoint_notification.  
**Player control:** Immediate return.  
**World state:** The backward traversal is marked MECHANISM VERIFIED.  
**Waypoint:** “Take the verified rollback to the Packet Monitor in Communications & Weather.”  
**Unlocks:** Communications & Weather and Stop 59.

### Beat M15-B3B — After Stop 59

**Presentation:** waypoint_notification + equipment_panel_update.  
**Player control:** Immediate return.  
**World state:** The Packet Monitor marks the rover relay as an independent command path around AR-2.  
**Waypoint:** “Return to the Incident Console in Operations Module for the five-check canary.”  
**Unlocks:** Operations Module and Stop 60.

### Beat M15-B4 — After Stop 60

**Presentation:** system_banner.  
**Player control:** One Continue; timer pauses.  
**World state:** All five committed canary expectations match measured results; the Runway Door indicator changes from `LOCKED` to `OPEN ON FINAL RELEASE`.  
**Panel text:** “GO — staged release may expand while rollback and rover command remain active.”  
**Unlocks:** Mission outcome, Runway Door event, and free-play aftermath.

### Beat M15-BE — At mission end

**Presentation:** persistent_world_change + nearby_character_bubble + waypoint_notification.  
**Player control:** Free movement for roughly 45–60 seconds; the mission timer is paused.  
**World state:** P02 passes all five canary checks, the wider release advances in stages, and the Runway Door opens visibly. Runway lights switch on, the rescue aircraft appears through the doorway, touches down, and taxis into view while both command paths remain active.  
**Dialogue bubble — Dr. Elena Park, station director:** “Five predictions, five matches. The runway is open. Keep the rover path alive until the aircraft is down.”  
**Waypoint:** “Walk through the open Runway Door and watch the rescue aircraft finish its taxi before opening the metric screen.”  
**Unlocks:** Metric screen only after the player reaches the runway-side inspection point and the aircraft has stopped.
## E. Location plan

**3 unique locations:** Operations Module → Software Lab → Communications & Weather → Operations Module. The final return is causal: the integrated canary can be committed only after rollback and the independent command path are both verified.


## F. Characters and dramatic beat

**Dr. Elena Park, Station director,** pushes to keep 28 people alive and preserve the evacuation option. **Priya Nair, Software architect,** pushes to restore reliable control without creating a second hidden failure. **Liv Andersen, Communications and weather lead,** pushes to hold a satellite path and identify a safe rescue window.
 The player resolves the conflict by producing testable code behavior rather than by choosing the most senior voice.


## G. Key concepts, explained here

- **Abstraction and program design:** Program design is the selection and composition of abstractions and tests that meet system constraints, not just writing one more line of code.

- **ArrayList methods, traversals, mutation, and algorithms:** This is an algorithm proof over a class of list states rather than a memorized fix for one example.

- **Networks, packets, protocols, redundancy, and cybersecurity:** Fault tolerance comes from independent failure paths, not from counting multiple channels that share the same upstream resource.

- **Testing, debugging, edge cases, and incremental development:** Integrated verification requires explicit predictions, a limited reversible operation, independent measurements, and a final decision only after all committed expectations are checked.


## H1. Stop 57 — Choose the staged release

**Format/placement:** SCIENCETANK, Dr. Elena Park at the Rescue Board.

**Metadata:** Concept: 20 — Abstraction and program design; Keystone: Methods & abstraction, Search & efficiency; Area: OPS; Prerequisites: Transfers abstraction and delayed efficiency reasoning into whole-system design.; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** which final software release and rescue plan can be committed without creating another hidden cascade.

**Call — exact player copy:** Go to Operations Module and meet Dr. Elena Park, station director, at the Rescue Board.

**Stop reason — exact player copy:** The aircraft is entering the last usable weather window, and Park must choose a release plan before any wider controller update begins.

**Question card story setup — exact player copy (36 words; 2 sentences):** The crew has 100 release points to divide among regression tests, backward rollback, independent communications, canary monitoring, and a tempting full restart. Allocate enough support to the mechanisms already proven necessary for a reversible staged release.

**Question card story-science connection — exact player copy:** The final plan should integrate established evidence rather than buy every attractive action or trust one dramatic restart.

**Format-specific interaction block:**
```yaml
proposals:
  - {id: regression, label: "Regression suite", max: 25}
  - {id: rollback, label: "Backward rollback readiness", max: 25}
  - {id: relay, label: "Independent rover relay", max: 20}
  - {id: canary, label: "Canary monitoring", max: 30}
  - {id: restart, label: "Immediate full restart", max: 100}
recommended:
  regression: 25
  rollback: 25
  relay: 20
  canary: 30
  restart: 0
evidence:
  - "Mission 14: forward rollback fails 0/5 holdout cases."
  - "Mission 13: rover relay is an independent command path."
  - "Mission 8: regression preserves the exact adjacent-record failure."
  - "A canary limits the first live change to one controller."
constraints:
  - "Allocate exactly 100 release points."
  - "Preserve a verified rollback path."
  - "Keep an independent command path active."
  - "Limit the first live change to one controller."
answerText: "Fund regression, backward rollback, relay, and canary monitoring; spend nothing on the irreversible full restart."
```

**Question card prompt — exact player copy:** Spend exactly 100 release points and submit the staged plan that satisfies every proven recovery constraint.

**Correct result:** 25 regression, 25 rollback, 20 relay, 30 canary, 0 full restart.

**Answer text:** Each funded proposal corresponds to evidence the campaign has already established, and the full restart removes the reversibility that the failed rollback path makes essential.

**Why/mechanism:** Program design is the selection and composition of abstractions and tests that meet system constraints, not just writing one more line of code.

**Wrong-path feedback:**

- Funding the full restart sacrifices the staged recovery constraint.

- Dropping relay removes independent command.

- Dropping regression or rollback abandons the specific Mission 14 failure mechanism.

**State/output:** The Rescue Board displays four release gates and crosses out FULL RESTART.

**Unlock:** Stop 58.

**Retrieval:** Transfers abstraction and delayed efficiency reasoning into whole-system design.

**Later payoff:** Stop 58 proves the rollback algorithm before the canary can unlock.


## H2. Stop 58 — Prove the rollback traversal

**Format/placement:** DERIVE, Software Lab — Code Review Wall.

**Metadata:** Concept: 29 — ArrayList methods, traversals, mutation, and algorithms; Keystone: Collections & indexing, Methods & abstraction; Area: CODE; Prerequisites: Transfers the collection bug first introduced in Mission 8 and reversed in Mission 14.; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Briefing decision advanced:** which final software release and rescue plan can be committed without creating another hidden cascade.

**Call — exact player copy:** Go to the Code Review Wall in Software Lab.

**Stop reason — exact player copy:** The staged plan cannot start until backward ArrayList removal is encoded as the exact mechanism that survived the holdout and stress tests.

**Question card story setup — exact player copy (39 words; 2 sentences):** The rollback must inspect controller records from the final valid index down to zero and remove a record only when it is resolved. Build the loop and choose the statement explaining why removal cannot skip a lower unvisited index.

**Question card story-science connection — exact player copy:** The final code must express the proven mechanism, not merely carry a label saying backward traversal is safer.

**Format-specific interaction block:**
```yaml
derive:
  start: "records contains open and resolved entries; remove each resolved entry while traversing the ArrayList by index."
  goal: "remove every resolved record without skipping a neighbor that shifts after deletion"
  steps:
    - id: header
      prompt: "Choose the loop header."
      choices:
        - {line: "for (int i = records.size()-1; i >= 0; i--) {", correct: true}
        - {line: "for (int i = 0; i <= records.size()-1; i++) {", correct: false, survives: true, why: "Forward traversal combines index growth with left-shifting elements after removal, which can skip a resolved neighbor."}
    - id: remove
      prompt: "Choose the removal line."
      choices:
        - {line: "if (records.get(i).isResolved()) records.remove(i);", correct: true}
        - {line: "if (records.get(i).isResolved()) records.remove(i+1);", correct: false, survives: true, why: "The test examines record i, so removing i+1 deletes a different record and can also exceed the list bounds."}
    - id: reason
      prompt: "Choose why descending removal does not skip work."
      choices:
        - {line: "removing i cannot change any lower index still to be visited", correct: true}
        - {line: "removing i preserves every higher index that has not been visited yet", correct: false, survives: true, why: "In a descending traversal the higher indexes have already been visited; lower unvisited indexes stay unchanged."}
```

**Question card prompt — exact player copy:** Build the rollback loop line by line and choose the explanation that proves descending traversal does not skip records.

**Correct result:** Descending loop; remove(i); lower unvisited indexes remain valid.

**Answer text:** Removal can shift higher positions, but those positions have already been processed; lower indexes still refer to the same unvisited records.

**Why/mechanism:** This is an algorithm proof over a class of list states rather than a memorized fix for one example.

**Wrong-path feedback:**

- Forward traversal recreates the Mission 8 skip.

- remove(i+1) targets the wrong record and can exceed bounds.

- Higher indexes may shift; they simply no longer matter.

**State/output:** The Code Review Wall changes rollback status to `MECHANISM VERIFIED`.

**Unlock:** Stop 59.

**Retrieval:** Transfers the collection bug first introduced in Mission 8 and reversed in Mission 14.

**Later payoff:** Travel to Communications unlocks for the independent-path check.


## H3. Stop 59 — Protect the rescue link

**Format/placement:** TRACE, Packet Monitor.

**Metadata:** Concept: 37 — Networks, packets, protocols, redundancy, and cybersecurity; Keystone: Reliability & redundancy; Area: COMMS; Prerequisites: Transfers redundancy introduced in Mission 6 and built physically in Mission 13.; Learning role: RETRIEVE; Difficulty: L4; Story role: payoff.

**Briefing decision advanced:** which final software release and rescue plan can be committed without creating another hidden cascade.

**Call — exact player copy:** Go to the Packet Monitor in Communications & Weather.

**Stop reason — exact player copy:** The rollback mechanism is verified, but the canary release still needs a command path that does not share the primary router's single point of failure.

**Question card story setup — exact player copy (41 words; 2 sentences):** Primary satellite acknowledgments, outbound patch confirmation, Rover Three relay traffic, and local weather updates do not all depend on the same hardware. Open each dependency and identify the shared router plus the independent channel that must remain active during canary deployment.

**Question card story-science connection — exact player copy:** Redundancy only protects the release when the backup path is genuinely independent of the component that can remove the primary path.

**Format-specific interaction block:**
```yaml
trace:
  resources:
    - {id: ar2, label: "Antenna Router AR-2"}
    - {id: vr3, label: "Vehicle radio VR-3"}
    - {id: wm1, label: "Weather mast WM-1"}
  target: ar2
  shared_resource: "Antenna Router AR-2"
  channels:
    - {id: primary, label: "primary satellite ACK", reading: "AR-2 path active", depends: [ar2], depends_on_shared: true}
    - {id: patch, label: "outbound patch confirmation", reading: "AR-2 path active", depends: [ar2], depends_on_shared: true}
    - {id: relay, label: "Rover Three relay", reading: "VR-3 path active", depends: [vr3], depends_on_shared: false}
    - {id: weather, label: "local weather mast feed", reading: "WM-1 feed active", depends: [wm1], depends_on_shared: false}
  independent: [relay, weather]
  commit: "Name the resource shared by the primary command channels and identify the independent command path."
  correctConclusion: "Primary ACK and patch confirmation both depend on AR-2; Rover Three's VR-3 relay remains an independent command path."
```

**Question card prompt — exact player copy:** Open all four dependencies, identify the shared single point, and submit the independent command path that must stay active.

**Correct result:** AR-2 is shared by primary and patch confirmation; keep Rover Three relay active.

**Answer text:** The rover path bypasses AR-2, so it can still carry command if the primary router disappears during deployment.

**Why/mechanism:** Fault tolerance comes from independent failure paths, not from counting multiple channels that share the same upstream resource.

**Wrong-path feedback:**

- Patch confirmation is not independent because it also uses AR-2.

- Weather mast is independent but is not a command path for controller release.

**State/output:** The Packet Monitor displays `CANARY COMMAND: PRIMARY + ROVER RELAY`.

**Unlock:** Stop 60.

**Retrieval:** Transfers redundancy introduced in Mission 6 and built physically in Mission 13.

**Later payoff:** Return to Operations for the final canary verification.


## H4. Stop 60 — Commit the station recovery

**Format/placement:** VERIFY, Incident Console.

**Metadata:** Concept: 35 — Testing, debugging, edge cases, and incremental development; Keystone: Debugging & tests, State & assignment, Object state & references, Boolean logic, Reliability & redundancy; Area: OPS; Prerequisites: Transfers the campaign's major keystones into one final controlled deployment.; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Briefing decision advanced:** which final software release and rescue plan can be committed without creating another hidden cascade.

**Call — exact player copy:** Go to the Incident Console in Operations Module.

**Stop reason — exact player copy:** Every release gate is ready, but the remaining controllers stay locked until the player computes and commits five canary expectations from displayed code and state.

**Question card story setup — exact player copy (44 words; 2 sentences):** P02 starts at limit 70 and warning 3; H04 is a separate controller, the packet time is `2026-09-08 08:07`, rollback starts `[P02 open, X resolved, H04 open]`, and AR-2 may fail. Use the displayed code and dependency rules to compute five canary expectations.

**Question card story-science connection — exact player copy:** The final verification integrates established mechanisms without printing the answers before the player's commitment.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: "Commit P02's final limit after the canary patch before DEPLOY unlocks."
  predictionRange: {min: 60, max: 110, step: 5, unit: "limit"}
  truth: 90
  passRatio: [0.99, 1.01]
  measurement:
    label: "P02 limit after canary patch"
    cost: 1
  supporting_checks:
    - {label: "P02 warning after H04 writes 7", expected: "3", observed: "3"}
    - {label: "parsed rescue time", expected: "08:07", observed: "08:07"}
    - {label: "rollback retained list", expected: "[P02,H04]", observed: "[P02,H04]"}
    - {label: "command path with AR-2 unavailable", expected: "Rover Three relay", observed: "Rover Three relay"}
  correct_action: "GO for staged fleet release only if the committed limit prediction hits and all four supporting checks match."
  answerText: "The canary limit is 90, which lies inside the dial range and has a narrow pass band; the four independent supporting checks also match, so staged expansion is justified."
```

**Question card prompt — exact player copy:** First, calculate and commit P02's final limit after the displayed `+20` patch. OPERATE: deploy only P02. MEASURE: reveal its final limit. INTERPRET: confirm the four previously established canary checks and submit GO or NO-GO.

**Correct result:** P02 final limit 90; the four supporting checks also match; GO for staged fleet release.

**Answer text:** Each result follows a mechanism proven earlier: an instance-method update, instance-local warning state, substring boundaries, descending ArrayList removal, and the rover relay's independent network path.

**Why/mechanism:** Integrated verification requires explicit predictions, a limited reversible operation, independent measurements, and a final decision only after all committed expectations are checked.

**Wrong-path feedback:** - A committed limit outside the narrow band around 90 fails the canary prediction.

- Any supporting check that disagrees with its previously verified mechanism is an immediate NO-GO.

- Changing the prediction after the measurement would invalidate the test.

**State/output:** After all five committed predictions match, all four campaign bars lock at 100%, the Runway Door unlocks, and no further graded stop appears.

**Unlock:** Beat M15-B4 and the Mission 15 outcome.

**Retrieval:** Transfers the campaign's major keystones into one final controlled deployment.

**Later payoff:** The campaign ends with story payoff, not another quiz.


## I. Mission outcome

**Mission decision:** Use a staged canary release with backward rollback and the rover command path. The canary checks match. The crew expands the release one stage at a time. The Runway Door opens. The player watches the rescue aircraft land and taxi to the station.
## J. Post-mission metric screen — exact player copy

**Header:** MISSION 15 COMPLETE  
**Timer line template:** TIME {elapsed} / TARGET 12:00  
**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}  

**Story event:** The canary passes, staged release completes, and the rescue route becomes fully available.  
**Automatic bar change:** HABITAT +9 | POWER +8 | CONTROL +10 | RESCUE +10  

**Recovery Point line template:** `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`  

**Allocation prompt:** One point raises one unlocked bar by one percentage point; unspent points may enter the Recovery Bank up to 30.  

**Canonical QA example:** On the minimum-4-RP reference path, allocate H/P/C/R = 0/0/0/0; expected bars = 100/100/100/100, bank = 4.  

**Failure check:** Any 0% bar restores the mission-start snapshot with the named failure event shown in text.  

**Lock result:** All four bars lock only after Stop 60's five canary measurements match their committed predictions.


## K. Quick concept review

- Program design is the selection and composition of abstractions and tests that meet system constraints, not just writing one more line of code.

- Integrated verification requires explicit predictions, a limited reversible operation, independent measurements, and a final decision only after all committed expectations are checked.

- When two explanations fit, use a test or dependency check that can make one of them fail.

- **Mission takeaway:** Use a staged canary release with backward rollback, independent rover communications, and five committed checks before expanding to the remaining controllers.


---
# 8. Implementation handoff boundary

Every stop above has one canonical format named in `QUESTION_TYPES.md`, one stop-specific payload, exact player-facing prompt, exact grading truth, answer text distinct from the key, mechanism-specific wrong feedback, a visible state change, and an explicit unlock. DERIVE uses exactly two choices per step. The twelve standard VERIFY stops identified in Handback 1 use a visible numeric `predictionRange`, one hidden numeric `truth`, and a costed `measurement`; the player commits before the measurement is revealed. Every DERIVE has `start`, a non-answer-revealing `goal`, and a specific `why` for every wrong line. Every TRACE target resolves to a declared resource with at least two build-recognized target-dependent channels and an independent channel; every PROBE target resolves to a declared station. VALUE options carry label/axis/cost fields with multiple evidence axes; ATTEST has a numeric checks budget; CASEBOOK mappings cover every clue; STRESS criteria have score keys and a valid robust candidate; every VERIFY truth lies inside its prediction range and retains a genuine fail region. Every mission card exposes exactly five optional generic worked examples that are ungraded, story-neutral, and timer-pausing. The final graded stop is followed by a walkable runway-and-aircraft payoff, not another quiz.

**Pre-answer visibility rule:** hidden keys never render as player-facing goals. In the standard VERIFY panel, the prediction range is visible but `truth` stays hidden until the player commits; the costed `measurement` then reveals the measured number. Stop 60 remains the authored integrated five-check canary pending importer/schema resolution. In HOLDOUT, held-out test points stay hidden until the fit is frozen. Recommended SCIENCETANK allocations, VALUE keys, diagnosis answers, and other grading truths remain grader-only until submission.

**DERIVE presentation rule:** each authored step contains exactly one correct line and one plausible reviewed mistake; the renderer must randomize their left/right order, so source-list order is not player-facing placement.


**Still required before implementation-ready or release-ready:** resolve these payloads against the actual `FORMATS` set and field schema in `engine/content/normalize.js` and the current importer; run schema/content/location/lesson/gameplay validators; then play all 60 stops right-first and wrong-first.
