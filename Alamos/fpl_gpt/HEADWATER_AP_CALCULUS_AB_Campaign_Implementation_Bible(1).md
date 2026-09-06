# HEADWATER

## AP Calculus AB Campaign Implementation Bible

**Version:** 10.2 — compact glossary and canonical action-clarity handoff  
**Build target:** `headwater`  
**Player role:** Duty Engineer, Ashfell Dam  
**Length:** 15 missions, 60 graded stops  
**Delivery:** one signed piece of **The Ashfell Release Rules** per mission  
**Format policy:** exactly 20 DERIVE stops; no format exceeds one third of the campaign.

---

## 1. One-page implementation brief

The supplied place file provides an unusually strong calculus world: inflow is a rate, storage is accumulation, reservoir level depends on stored volume, gate discharge depends on opening and head, power depends on flow, and downstream arrival depends on a changing release. The five-floor glass tower and visible spillway make calculated change visible. The six instructional rooms and named fixtures are preserved exactly.

The source is a place and delivery specification, not a complete campaign. It does not supply a 15-Day dramatic spine, canonical character roster, four-bar economy, clue ledger, fully authored question payloads, or AP Calculus AB coverage. Its existing fifteen rule names are preserved as daily deliverables, but several have been interpreted more broadly so all eight cheat-sheet units can be covered without creating disconnected school questions. No pre-Day tour, greeting task, or sightseeing warm-up is authored.

The central repair is to make one error travel through the whole system. Ashfell's crew initially trusts three familiar things: the old stage-storage sheet, a familiar inflow forecast, and a gate chart that looks smooth. Calculus lets the player discover that all three can be locally plausible while producing the wrong release plan when rates change, curves are integrated, and measurement errors propagate.

## Genuine implementation limits

This bible specifies canonical interaction blocks at the field level described in `QUESTION_TYPES(3).md`. The repository importer and exact engine schema were not supplied, so final YAML field spelling and automated import cannot be verified here. `DERIVE` blocks explicitly supply expressions and licensing rules; operated and decision formats supply their required structured data. Before shipping, transpose these blocks into the current book schema and run `npm run traps`, `npm run lessons`, importer, reachability, and gameplay tests.

---

### Non-negotiable engine rules

- All numeric tolerances are inclusive. Unless stated otherwise, round only the final value.
- A DERIVE payload contains `goal`, visible `givens`, ordered `lines`, and for each line `expression_choices`, `correct_expression`, `rule_choices`, and `correct_rule`; both the line and license must be correct before the next line unlocks.
- A VERIFY payload contains locked phases `prediction -> commit -> operate -> measure -> interpret`; the equipment is unavailable before commitment.
- A CONTROL payload names one changed control, fixed quantities, the reversal, both measurements, and the required causal conclusion.
- Closing-card language is intentionally short; named reactions occur immediately before the system card.
- Every completed dialogue, formula, result, and destination is copied to the mission log.

---

- No pre-mission tour, greeting chore, or ungraded prerequisite blocks access to Mission 1.
- Every mission has four globally numbered graded stops and a non-quiz outcome beat.
- Every CHOICE presents four distinct items and three option-specific rebuttals.
- Every PROBE carries a station-specific load, reading, expected value, and comparison.
- Every multi-phase calculation/operation uses **CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET**.

## 2. Campaign promise, clock, and player experience

### Opening sequence - no movie required, maximum five sentences

Ashfell Dam must lower its reservoir before a three-day storm reaches the valley. Water can leave through turbines and spillway gates, but too much at once floods the towns below and too little leaves the dam carrying the storm. Fifteen work shifts remain, and failure could force an uncontrolled release through homes and a school. Mara Vale, dam operations chief, hands you the release board and says, “Show what changes, not what you hope.” Your first level trace is already bending away from yesterday's plan.

**HUD revealed after Continue:** Safe Storage 42% | Downstream Readiness 48% | Operating Reserve 62% | Dam Integrity 72%.

---

### Concrete stakes

The storm can force an uncontrolled release through downstream homes and a school. The player must create enough storage without outrunning warnings, exhausting machinery, or placing unsafe pressure on the wall.

### Three major reversals

1. A high-ground gauge reveals a larger, later crest than the old radar forecast.
2. A resurvey proves silt has removed usable reservoir volume.
3. Failed warning circuits and a nonlinear last half-metre force a staged final release.

### Four campaign metrics and recovery economy

| Bar | Category | Start | Meaning | Rises when | Falls when | Zero consequence | Lock |
|---|---|---:|---|---|---|---|---|
| Safe Storage | primary | 42 | verified room for storm water | storage/release model is certified | forecast or storage estimate is invalidated | storm overtops emergency margin; restore Day start | locks only after final release succeeds |
| Downstream Readiness | secondary | 48 | people and roads prepared for planned flow | arrival and warning rules are verified | release changes outrun warnings | release authorization is withdrawn | locks after D14 siren verification |
| Operating Reserve | reserve | 62 | turbine, gate, staff, and power capacity remaining | efficient plan preserves capacity | tests, outages, and delays consume it | operations stop; restore Day start | never locks before finale |
| Dam Integrity | integrity | 72 | confidence the wall, uplift, and gates remain within limits | independent structural evidence clears a load | unsafe head or unverified seepage raises risk | emergency evacuation; restore Day start | locks after D13 independent check |

**Recovery Points:** `RP = clamp(4,12,11 + time_modifier - incorrect_submissions)`, with `+1` at/before target, `0` through 125%, `-2` later. One RP adds one point to one unlocked bar; bank cap 30. Required dialogue, menus, loading, and app background pause the timer. Exploration before Commit is free; each committed wrong answer costs one RP.

### Automatic metric ledger

| Day | Named event | Automatic change |
|---:|---|---|
|1|The smooth forecast fails its first limit check.|Safe Storage +3|
|2|A verified rate limit replaces a guess.|Operating Reserve +3|
|3|Gate sensitivity is mapped.|Dam Integrity +3|
|4|Downstream travel rate is bounded.|Downstream Readiness +4|
|5|The old plan has a true interior peak.|Safe Storage +4|
|6|**Twist 1:** high-ground gauge shows a larger, later crest.|Safe Storage -8; Operating Reserve -3|
|7|Accumulated inflow is recomputed.|Safe Storage +8|
|8|A feasible release envelope is integrated.|Downstream Readiness +5|
|9|Silent piezometers are restored.|Dam Integrity +6; Operating Reserve -3|
|10|Seepage growth fits a stable model.|Dam Integrity +5|
|11|**Twist 2:** resurvey shows lost reservoir volume.|Safe Storage -10; Dam Integrity -4|
|12|Turbine and hoist work budgets are verified.|Operating Reserve +7|
|13|Independent errors clear the wall and lock Integrity.|Dam Integrity +12, then lock at 100 if allocation completes it|
|14|Apparent victory; failed sirens expose final constraint.|Downstream Readiness +10, then -8 until repair; lock when restored|
|15|Corrected release succeeds.|all remaining bars may receive saved RP; victory at 100/100/100/100|

With 15 target-time, zero-error awards (180 RP), named gains, and setbacks, the canonical path has ample margin to finish all bars without perfect banking. Each Day's QA example below assumes the player enters with the displayed reference state and allocates the awarded RP as stated.

### Timer and Recovery Points

Timer and dialogue behavior, the Recovery Point formula, allocation rules, bank cap, zero-bar restoration, and lock timing are fixed by the metric table above and repeated on each mission's metric screen.

### Resolution order, locks, and failure

Grade the stop, apply authored state, play the story beat, apply the automatic metric event, award Recovery Points, accept allocation, then unlock the next mission. A zero bar restores the mission-start snapshot; it never silently changes a correct mathematical result.

## 3. World and location plan

| Group | Player-facing place | Core fixtures |
|---|---|---|
| STORE | Storage & Level Board | level desk, storage curve, accumulator, release ledger |
| INFLOW | Catchment & Inflow Desk | trace bench, gauge wall, high-ground gauge |
| GATES | Gate House | discharge board, hoist stand, trigger board |
| SAFE | Downstream Warning Desk | arrival map, warning list, settlement circuits |
| STRUCT | Seepage & Uplift Bay | uplift wall, weir bench, independent transects |
| POWER | Powerhouse | machine board, turbine passage, runner and work displays |
| ARCHIVE | Forecast Archive | frozen models, holdout drawer, residual plot |

### Areas of study and complete fixture declaration

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Storage & Level Board | yes | `storage-board` | board | A blue storage curve, three pencilled flood marks, and today's operating line. |
| Storage & Level Board | yes | `level-desk` | bench | The live reservoir level, sensor-offset slips, and a brass ruler worn smooth at 206 metres. |
| Storage & Level Board | yes | `release-ledger` | rack | Bound hourly release sheets, their wet corners held down with old gate keys. |
| Storage & Level Board | yes | `survey-rack` | rack | Rolled sonar transects tagged by date, crew, and the gaps nobody signed. |
| Storage & Level Board | yes | `control-bench` | bench | Two linked control dials, one level display, and no label claiming which dial did the work. |
| Catchment & Inflow Desk | yes | `trace-bench` | bench | Rain and inflow traces laid beneath a straightedge, with the crest still beyond the paper. |
| Catchment & Inflow Desk | yes | `gauge-wall` | board | Every basin gauge at once: river-blue lines, one red alarm mark, and one silent channel. |
| Catchment & Inflow Desk | yes | `high-ground-gauge` | vessel | The ridge instrument in its dented housing, still beaded with rain. |
| Catchment & Inflow Desk | yes | `forecast-drawer` | rack | Sealed forecast runs, each stamped with the data cutoff used to make it. |
| Catchment & Inflow Desk | yes | `water-ledger` | board | Inflow, release, evaporation, and storage change written in four columns that must close. |
| Catchment & Inflow Desk | yes | `staging-console` | bench | Three release stages, a locked commit key, and the downstream response returning live. |
| Gate House | yes | `discharge-board` | board | Gate opening, head, and discharge curves overlaid in grease pencil. |
| Gate House | yes | `hoist-stand` | vessel | The gate hoist, its travel scale, and a handwheel polished by emergency drills. |
| Gate House | yes | `trigger-board` | board | The signed opening limits and the alarm thresholds they drive. |
| Gate House | yes | `maintenance-rack` | rack | Calibration bars, linkage gauges, and the last mechanic's correction sheet. |
| Downstream Warning Desk | no | `arrival-map` | board | The river reach unrolled beneath settlement pins and pencilled arrival times. |
| Downstream Warning Desk | no | `warning-list` | rack | Call sheets ordered by consequence, with acknowledgement boxes still empty. |
| Downstream Warning Desk | no | `settlement-circuits` | board | Four settlement circuits, their siren status, and the road each warning must beat. |
| Downstream Warning Desk | no | `radio-desk` | bench | Two radios, the approved warning script, and a clock set to river time. |
| Seepage & Uplift Bay | yes | `uplift-wall` | board | Piezometer pressure along the wall, one quiet sensor, and yesterday's chalk envelope. |
| Seepage & Uplift Bay | yes | `weir-bench` | bench | The seepage weir, measured head marks, and a notebook swollen by spray. |
| Seepage & Uplift Bay | yes | `transect-rack` | rack | Independent pressure transects filed apart so one bad line cannot tutor the next. |
| Seepage & Uplift Bay | yes | `drain-console` | vessel | Cooling and drain controls sharing one panel, with both settings visible at once. |
| Powerhouse | yes | `machine-board` | board | Turbine demand, head, efficiency, and reserve traced across the shift. |
| Powerhouse | yes | `dispatch-console` | bench | The release allocation sliders beside the price strip and the reserve floor. |
| Powerhouse | yes | `runner-crate` | rack | A spare runner shell, section drawings, and dimensions stencilled on the timber. |
| Powerhouse | yes | `work-meter` | vessel | The service hoist meter with load, height, and accumulated work on separate dials. |
| Forecast Archive | yes | `frozen-models` | rack | Forecast versions frozen at issuance, never overwritten by what happened later. |
| Forecast Archive | yes | `holdout-drawer` | rack | Unopened crest observations under a paper seal bearing Imani's initials. |
| Forecast Archive | yes | `residual-plot` | board | Residuals pinned by forecast run, including the pattern the summary score hides. |

### Location escalation

Missions 1-4 use one meaningful location, Missions 5-10 use two, and Missions 11-15 use three. Every move follows evidence and reaches a fixture, record, control, or authority unavailable at the previous place.

## 4. Character bible

| Character | Role and pronouns | Wants / blind spot | Gameplay and arc | Verbal habit |
|---|---|---|---|---|
| Mara Vale | operations chief; she/her | a signed rule each shift / trusts familiar charts | authority and final decisions; learns to demand independent curves | “What changes?” |
| Imani Okoro | catchment hydrologist; she/her | protect forecast credibility / underweights unseen high ground | inflow, sums, DEs; reveals and corrects forecast | “What did the rain become?” |
| Tomas Wilkes | gate mechanic; he/him | keep gates operable / trusts sound and experience | gate controls, related rates, work; accepts modeled limits | “Can the steel do it twice?” |
| Elise Baptiste | downstream safety lead; she/her | never surprise a settlement / favors lower releases | travel, thresholds, warnings; authorizes final release | “Who hears it first?” |
| Arun Mehta | structural engineer; he/him | protect the wall / treats silent instruments as danger | uplift, error, stress tests; accepts independent clearance | “Which reading is quiet?” |
| Nia Chen | power dispatcher; she/her | retain grid output / values turbine revenue too highly | marginal value, optimization, reserve allocation | “What do we lose per hour?” |

## 5. Character direction and dialogue rules

- Give each major character a legitimate operating constraint, not a cartoon position.
- Put required story information in dialogue bubbles, panels, labels, and persistent world changes; never rely on voice, color, or cinematic staging.
- Pause the timer during system-owned dialogue and restore control after Continue.
- Let correct mathematics worsen the situation when the evidence demands it.
- Keep character reactions before the system-owned outcome card; every outcome begins with the mission decision.

### Non-cinematic beat presentation contract

Each beat below names its trigger, location, presentation, player-control state, visible world change, exact bubble or panel text, and unlock. The engine may adapt layout but may not delete evidence or hide a required action in ambient dialogue.

## 6. Calculus spine and recurring concepts

### Dependency graph

`function and graph -> limits -> continuity -> derivative definition -> derivative rules -> chain/implicit/inverse derivatives -> motion and related rates -> critical points/MVT/concavity -> antiderivatives/Riemann sums -> FTC and substitution -> differential equations/Euler -> area/volume/average/work -> cumulative modeling and decisions`

Every contextual calculation carries units. All claims about extrema, inflection, continuity, or model choice require a named theorem, sign change, or test rather than a bare answer.

### Keystone encounter matrix

| Keystone | Introduce/practice | Delayed retrieve | Combine/transfer/payoff |
|---|---|---|---|
| Limits and continuity | D1 | D6 | D13, D15 |
| Derivative as rate | D2 | D4 | D8, D14-D15 |
| Differentiation rules | D2-D3 | D5 | D13-D15 |
| Chain/implicit/inverse reasoning | D3 | D6 | D10, D14 |
| Motion and related rates | D4 | D8 | D11, D15 |
| Extrema/MVT/concavity | D5-D6 | D9 | D13-D15 |
| Accumulation/Riemann sums | D7 | D9 | D11, D14-D15 |
| FTC and antiderivatives | D7-D8 | D10 | D11-D15 |
| Differential equations/Euler | D9-D10 | D12 | D14-D15 |
| Applied integrals | D8, D11-D12 | D14 | D15 |
| Approximation/error | D2, D7 | D13 | D14-D15 |

### Cheat-sheet coverage matrix

| Cheat-sheet item | Primary stop(s) | Later retrieval/payoff |
|---|---|---|
| Direct substitution; factoring; conjugates | 1.1-1.2 | 6.1, 15.1 |
| L'Hopital for 0/0 or infinity/infinity | 1.3 | 6.1 |
| Piecewise limits; three-part continuity; IVT | 1.4 | 5.4, 15.1 |
| Removable, jump, infinite discontinuities | 1.4, 6.1 | 13.4 |
| Horizontal, vertical, oblique asymptotes | 6.1-6.2 | 6.4 |
| Derivative definition and meaning | 2.1 | 4.1, 15.1 |
| Power, product, quotient rules | 2.2-2.4 | 5.2, 14.1 |
| Tangent line and linear approximation | 2.4 | 13.1-13.3 |
| Increasing/decreasing; f' and f'' | 5.1-5.3 | 6.3-6.4, 14.2 |
| Differentiability versus continuity; corners/cusps/vertical tangents | 2.1, 5.4 | 13.4 |
| Trig, exponential, logarithmic derivatives | 2.2-2.3 | 3.1, 10.1 |
| Chain rule and stacked functions | 3.1 | 10.1, 14.1 |
| Implicit and second implicit derivatives | 3.2-3.3 | 4.3, 12.3 |
| Inverse derivative; arcsin/arctan/ln | 3.4 | 6.2, 12.4 |
| Position, velocity, acceleration, speed, distance/displacement | 4.1-4.2 | 8.3, 15.2 |
| Related rates | 4.3-4.4 | 11.4, 15.3 |
| Optimization and marginal quantities | 5.1-5.3 | 14.1-14.4 |
| Critical points; first/second derivative tests | 5.1-5.3 | 14.2 |
| Absolute extrema and EVT | 5.2 | 14.2 |
| Concavity and inflection | 5.3 | 6.3, 14.2 |
| Implicit critical points | 5.4 | 12.3 |
| Curve sketching and sign charts | 6.3-6.4 | 13.4 |
| Mean Value Theorem | 5.4 | 15.1 |
| Antiderivatives, +C, power/ln/exp/trig, linearity | 7.1-7.2 | 8.1, 10.1 |
| Definite integral, FTC 1 and 2 | 7.2-7.3 | 8.2, 11.1 |
| u-substitution | 8.1 | 10.1, 12.1 |
| Signed area versus total area | 7.4, 8.3 | 11.1 |
| Left/right/trapezoid accuracy | 7.1, 7.4 | 13.2 |
| Riemann-sum limit definition | 7.2 | 11.1 |
| Slope fields and equilibrium | 9.1-9.2 | 10.4 |
| Euler's method | 9.2-9.3 | 14.3 |
| Separation and initial condition | 10.1-10.2 | 14.3 |
| Exponential, logistic, Newton cooling models | 10.2-10.4 | 14.3, 15.3 |
| Area between curves and splitting crossings | 11.1-11.2 | 15.2 |
| Disk/washer and shell volumes | 12.1-12.2 | 15.3 |
| Average value | 11.3 | 15.2 |
| Work integral and Hooke's law | 12.4 | 15.3 |
| FRQ setup, justification, units, calculator/no-calculator habits | every Day | D15 integrated response |

---

### Fifteen-mission learning and dramatic spine

| Day | Science movement | Mystery movement | Stakes movement / decision |
|---:|---|---|---|
|1|Limits and continuity test the trace.|The jump is data handling, not sudden water.|Accept a continuous local forecast only with a repaired hole.|
|2|Derivative definition and rules set a rise limit.|The level is accelerating despite modest current rise.|Set the alert from rate, not height alone.|
|3|Chain, implicit, inverse derivatives map gates.|Small head changes amplify gate discharge.|Choose a safe calibration path.|
|4|Motion and related rates connect release to people.|Arrival speed varies by reach.|Choose the warning lead time.|
|5|Extrema and MVT test the two-day plan.|The old plan peaks between sampled times.|Reject average-only planning.|
|6|Asymptotes and curve sketching test a new gauge.|**Twist 1:** unseen high ground shifts the crest.|Adopt the larger, later forecast.|
|7|Riemann sums and FTC total storm inflow.|The new peak adds more volume than staff expected.|Set required drawdown volume.|
|8|Substitution and signed accumulation find release envelope.|Turbines alone cannot clear it.|Authorize a mixed turbine/gate plan.|
|9|Slope fields and Euler reconstruct uplift.|Silent heads were cable failures, not wall failure.|Continue tests under a bounded load.|
|10|Separable models distinguish decay from growth.|Seepage stabilizes, clearing the wall.|Approve the structural limit.|
|11|Area, average value, and related rates use resurvey.|**Twist 2:** silt stole usable volume.|Replace the old storage curve.|
|12|Volumes and work price the physical plan.|One turbine is unavailable; hoist work matters.|Choose a feasible gate/turbine schedule.|
|13|Linearization, residuals, propagation test all uncertainty.|Independent errors do not share one cause.|Lock Dam Integrity and certify corrected rules.|
|14|Optimization and Euler forecast choose final policy.|Apparent victory ends when four sirens fail.|Repair warnings before release.|
|15|All prior calculus supports an integrated trigger.|**Twist 3:** last half-metre nonlinearity requires staged action.|Commit and execute the corrected release.|

## 7. Clue ledger

| Planted | Objective observation | Initial meaning | True meaning / needed concept | Reinforced | Payoff |
|---:|---|---|---|---:|---:|
|1|trace has a one-sample jump but matching side trend|reservoir surged|removable data hole; limits/continuity|2|6|
|2|rise rate steepens while level remains below alarm|still plenty of time|derivative predicts danger before height|5|7|
|3|discharge changes sharply near high head|gate fault|chain-rule sensitivity is physical|8|15|
|4|downstream travel times are uneven|bad clocks|velocity depends on reach and flow|8|14|
|5|average two-day rise looks safe|old plan works|interior maximum was missed; EVT/MVT|5|6|
|6|high-ground gauge crest is later and larger|new gauge is biased|old radar missed terrain|6|7|
|9|two piezometers are silent|wall pressure rising unseen|common cable failed; independent readings stay calm|9|13|
|11|new transects lie below 2003 storage curve|survey disagreement|silt reduced volume per level|11|13|
|12|runner crate removes turbine capacity|minor maintenance delay|mixed plan needs more gate work|12|14|
|14|four siren lamps show open circuits|panel cosmetic issue|settlements will miss warning|14|15|

---

## 8. Mission content contract

Every mission below supplies a briefing promise, compact glossary, primer, equations, story event, route, character beat, concepts, four exact stops, an outcome that answers the promise, a metric screen, and a quick review. Every stop contains a reason, two-sentence story setup, story-science connection, visible prompt, complete canonical payload, keyed truth, answer text, mechanism explanation or actionable feedback, and state output.

### Revision 10.2 presentation cleanup

Glossary entries are compact one-line definitions in the form `Term: definition`. Equation entries omit `Also called` and `Concept`; they retain the equation, purpose, symbols, and campaign-specific reason.

### Player-facing glossary dependency

Define every technical term before the player must use it. Implement the exact mission-card entries below rather than reconstructing definitions from metadata.

### Keystone retrieval compliance ledger

The dependency graph, keystone matrix, cheat-sheet coverage matrix, and fifteen-mission spine above are authoritative. Each keystone is introduced, retrieved after an intervening mission, and used in a later combination, transfer, or finale payoff.

# Mission 1 - The Rate-Limit Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 15 SHIFTS UNTIL THE STORM

**Card title:** The Broken Trace

**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the level desk.

**Card body:** Yesterday's level trace bends away from the release plan, but one recorded point jumps far above its neighbors. A limit asks what values approach near a time, while continuity checks whether the recorded value belongs on that approach. At the level desk, test the suspicious point and the forecast around it. By the end of the mission, decide whether the local forecast can be used.

**Objective:** Certify or reject the local level forecast.

### Worth knowing first - exact player copy

#### Glossary terms

Limit: the value a function approaches as its input nears a point.

Continuous: having a defined value that equals the common left and right limit.

#### Primer concepts

- Substitute first; if `0/0` appears, simplify before evaluating.
- Left and right limits must agree.
- A hole can be repaired only when the surrounding limit exists.

#### Equations first needed today
**Equation:** `lim_(x->a) f(x)`

**What it is for:** finding the value approached near `a`.

**Symbols:** `x` is input, `a` is the approached input, and `f(x)` is output.

**Why this campaign needs it:** a nearby trend can distinguish a bad sample from a real level jump.## Main story happening - designer summary

One impossible stored point is removed only after three independent limit checks; the surrounding acceleration remains.

## Learning and dramatic intent

Introduce rigorous nearby behavior and make the first correct answer preserve bad news.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `storage-board` | automatic**

**World state:** The cancel the false zero fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 1: CANCEL THE FALSE ZERO OPEN

**Dialogue bubbles -** Mara Vale: "Start with cancel the false zero. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 1 | `level-desk` | automatic**

**World state:** After 1.2 Location: STORE.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 1 result to settle rationalize the float transform."

**Unlocks/waypoint:** Unlock Stop 2 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 2 | `storage-board` | automatic**

**World state:** After 1.3 Location: STORE.

**Panel/HUD text:** STOP 2 RECORDED - STOP 3 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 2 result to settle check the indeterminate rate."

**Unlocks/waypoint:** Unlock Stop 3 at `storage-board` in Storage & Level Board.

**Beat 4 - After Stop 3 | `storage-board` | automatic**

**World state:** The check the indeterminate rate result remains visible while the certify continuity fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 3 result to settle certify continuity."

**Unlocks/waypoint:** Unlock Stop 4 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STORE only; all necessary raw trace and model records are co-located.

## Characters and dramatic beat

Mara wants a usable trace but blocks unsupported edits; proof earns conditional trust.

## Key concepts, explained here

rational/radical/L'Hopital limits, two-sided limits, continuity, removable versus jump/infinite breaks, IVT.

## Stop 1 - Cancel the false zero

**Format/placement:** DERIVE, at `storage-board`.

**Metadata:** Concept: rational limit; Keystone: Limits; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The crew needs the trend at minute 6 before judging the jump.

**Question card story setup - exact player copy:** The logger's local model is `(t^2-36)/(t-6)` centimetres above datum, but it is undefined at minute 6. Simplify the nearby behavior so the crew can compare the model with the recorded spike.

**Question card story-science connection - exact player copy:** A finite limit would show what the trace should approach even though its stored point is missing.

**Question card prompt - exact player copy:** Build and license each line to find `lim_(t->6) (t^2-36)/(t-6)` in centimetres; submit one number in centimetres.

**Complete format-specific interaction block:** `derive: {goal:"limit in cm", givens:["(t^2-36)/(t-6)","t->6"], lines:[{expressions:["((t-6)(t+6))/(t-6)","(t-6)^2/(t-6)"],correct:"((t-6)(t+6))/(t-6)",rules:["factor difference of squares","differentiate numerator"],correct_rule:"factor difference of squares"},{expressions:["t+6 for t!=6","t-6"],correct:"t+6 for t!=6",rules:["cancel common nonzero factor","cancel the limit"],correct_rule:"cancel common nonzero factor"},{expressions:["12 cm","0 cm"],correct:"12 cm",rules:["direct substitution after simplification","use stored point"],correct_rule:"direct substitution after simplification"}], answerText:"The nearby model approaches 12 cm."}`

**Correct result:** `12 cm`, exact.

**Answer text:** The nearby model approaches 12 cm.

**Why:** factor, cancel for `t != 6`, then substitute.

**Wrong-path feedback:** `0/0` is a signal to simplify, not an answer.

**State/output:** expected-trend tag `12 cm`; unlock 1.2.

## Stop 2 - Rationalize the float transform

**Format/placement:** DERIVE, at `level-desk`.

**Metadata:** Concept: radical limit; Keystone: Limits; Area: Storage & Level Board; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The float's square-root calibration needs its own limit check.

**Question card story setup - exact player copy:** With the algebraic hole repaired, the float conversion still returns `0/0` near zero displacement. Rationalize its square-root expression to find the gain that should turn a tiny float motion into level change.

**Question card story-science connection - exact player copy:** The correct local gain tells whether the spike could come from the conversion formula.

**Question card prompt - exact player copy:** Build the derivation for `lim_(h->0) [sqrt(16+h)-4]/h`; submit the gain as a unitless number.

**Complete format-specific interaction block:** `derive: {goal:"local gain",givens:["[sqrt(16+h)-4]/h","h->0"],lines:[{expressions:["multiply by [sqrt(16+h)+4]/[sqrt(16+h)+4]","multiply by h/h"],correct:"multiply by [sqrt(16+h)+4]/[sqrt(16+h)+4]",rules:["conjugate","power rule"],correct_rule:"conjugate"},{expressions:["1/[sqrt(16+h)+4]","h/[sqrt(16+h)+4]"],correct:"1/[sqrt(16+h)+4]",rules:["difference of squares and cancel h","direct substitution before simplifying"],correct_rule:"difference of squares and cancel h"},{expressions:["1/8","1/4"],correct:"1/8",rules:["substitute h=0","average endpoints"],correct_rule:"substitute h=0"}],answerText:"The local gain is 1/8."}`

**Correct result:** `0.125`, tolerance `0.0005`.

**Answer text:** The local gain is 1/8.

**Why:** conjugate converts numerator product to `h`.

**Wrong-path feedback:** Substitution is valid only after the zero factor is removed.

**State/output:** calibration gain displayed; unlock 1.3.

## Stop 3 - Check the indeterminate rate

**Format/placement:** BALLPARK, at `storage-board`.

**Metadata:** Concept: L'Hopital; Keystone: Limits; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** A second model must agree before anyone edits the official trace.

**Question card story setup - exact player copy:** Because both algebraic checks give finite behavior, the archive model now provides `(e^(0.02t)-1)/t` metres per minute near `t=0`. Evaluate its `0/0` limit to confirm the same smooth start, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Agreement from a separate formula supports a data error rather than sudden reservoir motion.

**Question card prompt - exact player copy:** Using L'Hopital's rule, differentiate numerator and denominator separately, then submit `lim_(t->0)(e^(0.02t)-1)/t` in metres per minute.

**Complete format-specific interaction block:** `estimate:{labels:["numerator derivative at 0","denominator derivative"],values:[[0.02,1],[1,0]],slots:2,template:"numerator derivative / denominator derivative",formula:"0.02/1",correct:[0.02,1],target:0.02,tolerance:0.0001}`; `answerText:"The limit is 0.020 m/min because the differentiated ratio is 0.02e^(0.02t)/1."`

**Correct result:** `0.020 m/min`.

**Answer text:** The limit is 0.020 m/min because the differentiated ratio is 0.02e^(0.02t)/1.

**Why:** `0/0` licenses L'Hopital; new ratio tends to `0.02`.

**Wrong-path feedback:** Do not apply L'Hopital unless the original form is indeterminate.

**State/output:** independent smooth-start check; unlock 1.4.

## Stop 4 - Certify continuity

**Format/placement:** DIAGNOSIS, at `storage-board`.

**Metadata:** Concept: piecewise continuity/IVT/discontinuities; Keystone: Limits; Area: Storage & Level Board; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** Mara needs a formal reason to repair the point without discarding the curve.

**Question card story setup - exact player copy:** The left and right traces now both approach `4.20 m`, while the logger stores `4.68 m` at 09:06. Diagnose the discontinuity and decide whether redefining that single value makes the local forecast continuous.

**Question card story-science connection - exact player copy:** Only a removable discontinuity can be repaired without changing nearby behavior.

**Question card prompt - exact player copy:** Select the one diagnosis that fits every reading and submit a conclusion: use or reject the repaired local forecast.

**Complete format-specific interaction block:** `diagnosis:{headline:"09:06 continuity test",readings:[{zone:"left",value:"4.20 m"},{zone:"right",value:"4.20 m"},{zone:"stored value",value:"4.68 m"},{zone:"nearby sensor",value:"smooth"}],choices:[{label:"removable hole; redefine f(09:06)=4.20 m",mechanism:"common limit exists but stored value differs"},{label:"jump",mechanism:"would require unequal side limits"},{label:"infinite break",mechanism:"would require unbounded values"},{label:"continuous as stored",mechanism:"fails limit=value"}],answer:"removable hole; redefine f(09:06)=4.20 m"}`

**Correct result:** repair and use locally.

**Answer text:** Left limit = right limit = `4.20 m`; after redefining the point, all three continuity conditions hold.

**Why:** matching side limits establish existence; IVT may then support intermediate values locally.

**Wrong-path feedback:** A defined point alone does not make a function continuous.

**State/output:** repaired trace persists; unlock outcome.

## Mission outcome

Mission decision: Use the repaired local forecast. Both sides approach `4.20 m`, so the lone high point is a fixable hole. The crew restores that point. And keeps the surrounding rise. The rise is smooth,.

### Post-mission metric screen - exact player copy

**Header:** MISSION 1 COMPLETE  
**Timer:** TIME `{elapsed}` / TARGET `16:00`  
**Accuracy:** INCORRECT SUBMISSIONS `{incorrect_submissions}`  
**Story event:** The smooth forecast fails its first limit check and is repaired.  
**Automatic bar change:** SAFE STORAGE `+3`  
**Recovery Point line:** `RP = clamp(4,12,11 + time_modifier - incorrect submissions)`  
**Allocation prompt:** Spend each point to raise one unlocked bar by 1%, or bank up to 30.  
**Canonical QA:** start `42/48/62/72`, auto -> `45/48/62/72`, award 12, allocate 8 Safe Storage and 4 Downstream -> `53/52/62/72`, bank 0.  
**Failure:** any bar at 0 restores the Day-start snapshot.

## Quick concept review
- Simplify `0/0` before evaluating a limit.
- Continuity needs existence, a defined value, and equality.
- **Mission takeaway:** Use L'Hopital only for `0/0` or infinity/infinity.

---

# Mission 2 - The Rising-Fast Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 SHIFTS UNTIL THE STORM  
**Card title:** Faster Than the Gauge  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the trace bench.  
**Card body:** The repaired trace is smooth, but its slope is growing while the level remains below the old alarm. A derivative measures instantaneous change and can warn before a height limit is crossed. At the hydrograph bench, derive the rise rate, differentiate the forecast, and build a local tangent estimate. By the end of the mission, choose the new rate alarm.  
**Objective:** Set a defensible reservoir-rise alarm.

### Worth knowing first - exact player copy

#### Glossary terms

Derivative: instantaneous output change per unit input change.

Tangent line: a line matching a curve's value and slope at one point.

#### Primer concepts

- The derivative is a limit of average rates.
- Positive slope means increasing; negative slope means decreasing.
- A tangent line gives a nearby linear estimate.

#### Equations first needed today
**Equation:** `f'(a)=lim_(h->0)[f(a+h)-f(a)]/h`

**What it is for:** defining instantaneous rate from nearby changes.

**Symbols:** `f` is the function, `a` the time, and `h` a shrinking time step.

**Why this campaign needs it:** the crew needs a warning based on how fast level rises.

**Equation:** `L(x)=f(a)+f'(a)(x-a)`

**What it is for:** estimating a nearby function value.

**Symbols:** `L` is the linear estimate, `a` the base point, and `x` the new input.

**Why this campaign needs it:** a short-term level estimate can trigger action before the next full forecast.## Main story happening - designer summary

The player replaces a height-only alarm with a derivative-and-tangent trigger.

## Learning and dramatic intent

Make derivative definition, rules, and linearization one causal warning chain.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `trace-bench` | automatic**

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with build the instantaneous rise. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 5 | `gauge-wall` | automatic**

**World state:** After 2.1 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Use the Stop 5 result to settle differentiate the forecast signal."

**Unlocks/waypoint:** Unlock Stop 6 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 3 - After Stop 6 | `trace-bench` | automatic**

**World state:** After 2.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Use the Stop 6 result to settle protect the net-rise calculation."

**Unlocks/waypoint:** Unlock Stop 7 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 7 | `gauge-wall` | automatic**

**World state:** The protect the net-rise calculation result remains visible while the set the tangent alarm fixture lights.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Use the Stop 7 result to settle set the tangent alarm."

**Unlocks/waypoint:** Unlock Stop 8 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

INFLOW only; gauge wall and trace bench hold all rate evidence.

## Characters and dramatic beat

Imani shifts from defending height thresholds to accepting rate-based warning.

## Key concepts, explained here

derivative limit, power/product/quotient/trig/exp rules, tangent line, linear approximation.

## Stop 5 - Build the instantaneous rise

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: derivative definition; Keystone: Derivative as rate; Area: Gate House; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The alarm needs an instantaneous rate rather than a fifteen-minute average.

**Question card story setup - exact player copy:** The level model near hour 2 is `H(t)=0.03t^2+4.00` metres, and the current height alone looks safe. Build the difference quotient at `t=2` to expose how fast the level is changing now.

**Question card story-science connection - exact player copy:** A rate alarm responds to the curve's local motion before the height reaches danger.

**Question card prompt - exact player copy:** Derive `H'(2)` from the limit definition and submit a rate in metres per hour.

**Complete format-specific interaction block:** `derive:{goal:"H'(2)",givens:["H(t)=0.03t^2+4.00 m","t=2 h"],lines:[{expressions:["lim h->0 [H(2+h)-H(2)]/h","H(2)/2"],correct:"lim h->0 [H(2+h)-H(2)]/h",rules:["derivative definition","average height"],correct_rule:"derivative definition"},{expressions:["lim h->0 [0.12h+0.03h^2]/h","lim h->0 0.03h^2"],correct:"lim h->0 [0.12h+0.03h^2]/h",rules:["expand and subtract","power rule"],correct_rule:"expand and subtract"},{expressions:["lim h->0 (0.12+0.03h)","0.03h"],correct:"lim h->0 (0.12+0.03h)",rules:["cancel h for h!=0","set h=0 too early"],correct_rule:"cancel h for h!=0"},{expressions:["0.12 m/h","0.06 m/h"],correct:"0.12 m/h",rules:["evaluate limit","divide height by time"],correct_rule:"evaluate limit"}],answerText:"At hour 2 the level rises at 0.12 m/h."}`

**Correct result:** `0.12 m/h`, tolerance `0.001`.

**Answer text:** At hour 2 the level rises at 0.12 m/h.

**Why:** limit of secant slopes.

**Wrong-path feedback:** Average height is not instantaneous change.

**State/output:** live rate field; unlock 2.2.

## Stop 6 - Differentiate the forecast signal

**Format/placement:** DERIVE, at `gauge-wall`.

**Metadata:** Concept: power/trig/exp/chain; Keystone: Differentiation rules; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The rate display needs the derivative of the full forecast signal.

**Question card story setup - exact player copy:** The forecast is `I(t)=120+8t^3+20sin(t)+15e^(0.1t)` cubic metres per second. Differentiate every term so the panel can show whether inflow itself is rising at hour 2.

**Question card story-science connection - exact player copy:** The derivative of inflow reveals acceleration in the reservoir's incoming load.

**Question card prompt - exact player copy:** Build `I'(t)`, naming the rule for each term, then evaluate at `t=2 h`; angles are radians. Submit cubic metres per second per hour.

**Complete format-specific interaction block:** `derive:{goal:"I'(2)",givens:["I(t)=120+8t^3+20sin t+15e^(0.1t)"],lines:[{expressions:["24t^2+20cos t+1.5e^(0.1t)","8t^2-20sin t+15e^(0.1t)"],correct:"24t^2+20cos t+1.5e^(0.1t)",rules:["sum, power, trig, exponential chain rules","product rule only"],correct_rule:"sum, power, trig, exponential chain rules"},{expressions:["89.509","96.000"],correct:"89.509",rules:["substitute t=2 radians","drop non-polynomial terms"],correct_rule:"substitute t=2 radians"}],answerText:"I'(2)=89.509 (m^3/s)/h, so inflow is rising quickly."}`

**Correct result:** `89.509 (m^3/s)/h`, tolerance `0.01`.

**Answer text:** I'(2)=89.509 (m^3/s)/h, so inflow is rising quickly.

**Why:** `96+20cos2+1.5e^.2=89.509`.

**Wrong-path feedback:** `d(e^(0.1t))/dt` includes `0.1`.

**State/output:** rate lamp amber; unlock 2.3.

## Stop 7 - Protect the net-rise calculation

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: product/quotient rules; Keystone: Differentiation rules; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** Rain correction and gate efficiency both change with time, so simple subtraction is unsafe.

**Question card story setup - exact player copy:** Because inflow is accelerating, the corrected signal multiplies raw inflow by calibration `c(t)`, while turbine flow divides demand `P(t)` by head `H(t)`. Derive both rates before combining them into net storage change.

**Question card story-science connection - exact player copy:** Missing either product term or the quotient denominator would shift the alarm threshold.

**Question card prompt - exact player copy:** For `J=cI` and `Q=P/H`, derive `J'` and `Q'`; submit the ordered expression pair.

**Complete format-specific interaction block:** `derive:{goal:"(J',Q')",givens:["J=cI","Q=P/H"],lines:[{expressions:["c'I+cI'","c'I'"],correct:"c'I+cI'",rules:["product rule","chain rule"],correct_rule:"product rule"},{expressions:["(P'H-PH')/H^2","P'/H'"],correct:"(P'H-PH')/H^2",rules:["quotient rule","ratio of derivatives"],correct_rule:"quotient rule"}],answerText:"J'=c'I+cI' and Q'=(P'H-PH')/H^2."}`

**Correct result:** exact pair.

**Answer text:** J'=c'I+cI' and Q'=(P'H-PH')/H^2.

**Why:** both changing factors contribute.

**Wrong-path feedback:** A product's derivative is not the product of derivatives.

**State/output:** net-rate formula saved; unlock 2.4.

## Stop 8 - Set the tangent alarm

**Format/placement:** TRIGGER, at `gauge-wall`.

**Metadata:** Concept: tangent line/linear approximation; Keystone: Derivative as rate; Area: Gate House; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** Imani needs an alarm rule before the next fifteen-minute reading arrives.

**Question card story setup - exact player copy:** The verified level is `4.20 m` at `10:00`, and the current derivative is `0.12 m/h`. Use the tangent line to predict `10:15`, then commit an inclusive alarm threshold before the update appears.

**Question card story-science connection - exact player copy:** A precommitted threshold prevents the crew from moving the rule after seeing the data.

**Question card prompt - exact player copy:** Calculate `L(0.25)=4.20+(0.12)(0.25)` and submit the predicted level in metres; then commit `RISING FAST` if measured level is at least that value.

**Complete format-specific interaction block:** `trigger:{decision_rule:"RISING FAST if measured 10:15 level >= committed tangent prediction",scale:{min:4.18,max:4.28,step:0.001,unit:"m"},anchors:[4.20,4.23,4.26],objective:"detect a rise at least as fast as current derivative",direction:"at or above",consequence_limit:"do not change release until warning review"}`; update reveals `4.235 m`.

**Correct result:** prediction `4.230 m`, tolerance `0.001`; trigger fires.

**Answer text:** `4.20+0.12(0.25)=4.230 m`; `4.235 >= 4.230`, so the rising-fast condition is met.

**Why:** `4.20+0.12(0.25)=4.230 m`; `4.235 >= 4.230`, so the rising-fast condition is met. A precommitted threshold prevents the crew from moving the rule after seeing the data.

**Wrong-path feedback:** Multiply the hourly rate by `0.25 h`, not 15.

**State/output:** rate alarm set; delivery piece 2 pinned.

## Mission outcome

Mission decision: Set the new rate alarm at the tangent prediction. The next reading is above `4.230 m`, so the reservoir is rising faster than the current local trend. The crew starts an early watch. A gate chart must now turn level change into release change.

### Post-mission metric screen - exact player copy

TARGET `17:00`; event: verified rate replaces a guess; automatic `OPERATING RESERVE +3`; canonical QA enter `53/52/62/72`, auto `53/52/65/72`, award 12, allocate 7 Safe Storage and 5 Downstream -> `60/57/65/72`; standard RP text and zero-bar restore apply.

## Quick concept review
- A derivative is a limit of average rates.
- Product and quotient rules include every changing part.
- **Mission takeaway:** Linear approximation uses a value and local slope.

---

# Mission 3 - The Inflow Accumulation

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 13 SHIFTS UNTIL THE STORM  
**Card title:** One Motion, Three Changes  
**Go now:** Go to Gate House and meet Tomas Wilkes, gate mechanic, at the discharge board.  
**Card body:** The rate alarm is set, but the crew still cannot translate reservoir height into gate discharge safely. Gate flow depends on opening, head, and linked mechanisms that change together. At the discharge board, use chain, implicit, and inverse derivatives to map those sensitivities. By the end of the mission, choose a safe gate-calibration path.  
**Objective:** Map and certify the gate's changing response.

### Worth knowing first - exact player copy

#### Glossary terms

Chain rule: differentiate an outside function, then multiply by the derivative of its inside.

Implicit relation: an equation connecting variables without isolating one.

Inverse function: a function that reverses another function.

#### Primer concepts

nested changes multiply; treat `y` as a function when differentiating in `x`; an inverse derivative is the reciprocal derivative at the matching input.  
#### Equations first needed today
**Equation:** `d[f(g(x))]/dx=f'(g(x))g'(x)`

**What it is for:** differentiating nested functions.

**Symbols:** `f` is outer, `g` inner, and primes are derivatives.

**Why this campaign needs it:** head changes act through a nonlinear discharge law.

**Equation:** `(f^-1)'(a)=1/f'(f^-1(a))`

**What it is for:** finding sensitivity of a reversed calibration.

**Symbols:** `a` is output and `f^-1(a)` its matching input.

**Why this campaign needs it:** operators enter desired flow and need the required opening.## Main story happening - designer summary

Three linked derivative views produce and physically verify a reversible gate calibration.

## Learning and dramatic intent

Teach chain, implicit, second implicit, and inverse differentiation as linked mechanisms.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Gate House | `discharge-board` | automatic**

**World state:** The differentiate nested discharge fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 3: DIFFERENTIATE NESTED DISCHARGE OPEN

**Dialogue bubbles -** Tomas Wilkes: "Start with differentiate nested discharge. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `discharge-board` in Gate House.

**Beat 2 - After Stop 9 | `discharge-board` | automatic**

**World state:** After 3.1 Location: GATES.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Use the Stop 9 result to settle link opening and head."

**Unlocks/waypoint:** Unlock Stop 10 at `discharge-board` in Gate House.

**Beat 3 - After Stop 10 | `hoist-stand` | automatic**

**World state:** After 3.3 Location: GATES.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Use the Stop 10 result to settle find linkage curvature."

**Unlocks/waypoint:** Unlock Stop 11 at `hoist-stand` in Gate House.

**Beat 4 - After Stop 11 | `hoist-stand` | automatic**

**World state:** The find linkage curvature result remains visible while the reverse the flow calibration fixture lights.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Use the Stop 11 result to settle reverse the flow calibration."

**Unlocks/waypoint:** Unlock Stop 12 at `hoist-stand` in Gate House.

**Beat 5 - At mission end | `discharge-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Wilkes: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

GATES only; calculation boards and operated hoist must share the same linkage.

## Characters and dramatic beat

Wilkes values repeatability over theory alone; predicted reversal earns his support.

## Key concepts, explained here

chain rule, implicit first/second derivatives, inverse derivative, arctan/exponential derivatives.

## Stop 9 - Differentiate nested discharge

**Format/placement:** DERIVE, at `discharge-board`.

**Metadata:** Concept: chain/exp/log; Keystone: Chain reasoning; Area: Forecast Archive; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the discharge board, in Gate House.

**Stop reason - exact player copy:** The hoist cannot move until the expected discharge sensitivity is known.

**Question card story setup - exact player copy:** Gate discharge is modeled by `Q(h)=40e^(0.3sqrt(h))` cubic metres per second, where `h` is head in metres. Differentiate the three nested layers so a small head change has a predicted flow response.

**Question card story-science connection - exact player copy:** Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Question card prompt - exact player copy:** Derive `dQ/dh`; submit the expression in `(m^3/s)/m`.

**Complete format-specific interaction block:** `derive:{goal:"dQ/dh",givens:["Q=40e^(0.3sqrt h)"],lines:[{expressions:["40e^(0.3sqrt h)*d(0.3sqrt h)/dh","12e^h"],correct:"40e^(0.3sqrt h)*d(0.3sqrt h)/dh",rules:["exponential chain rule","power only"],correct_rule:"exponential chain rule"},{expressions:["6e^(0.3sqrt h)/sqrt h","12sqrt h e^(0.3sqrt h)"],correct:"6e^(0.3sqrt h)/sqrt h",rules:["power rule and multiply layers","quotient rule"],correct_rule:"power rule and multiply layers"}],answerText:"dQ/dh=6e^(0.3sqrt h)/sqrt h."}`

**Correct result:** exact.

**Answer text:** dQ/dh=6e^(0.3sqrt h)/sqrt h.

**Why:** dQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Wrong-path feedback:** Three layers require three derivative factors.

**State/output:** sensitivity curve; unlock 3.2.

## Stop 10 - Link opening and head

**Format/placement:** DERIVE, at `discharge-board`.

**Metadata:** Concept: implicit differentiation; Keystone: Chain reasoning; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the discharge board, in Gate House.

**Stop reason - exact player copy:** The linkage constraint decides how opening changes when head loads the gate.

**Question card story setup - exact player copy:** Linkage tests satisfy `o^2+0.5oh+h^2=9`, where opening `o` and head `h` are metres. Differentiate implicitly to find how opening changes with head at `o=2` and `h=1`.

**Question card story-science connection - exact player copy:** The linkage slope turns water-level motion into a required hoist correction.

**Question card prompt - exact player copy:** Derive `do/dh` and submit its value at `(h,o)=(1,2)` in metres of opening per metre of head.

**Complete format-specific interaction block:** `derive:{goal:"do/dh",givens:["o^2+0.5oh+h^2=9","o=2,h=1"],lines:[{expressions:["2o o'+0.5(o'h+o)+2h=0","2o+0.5h+2h=0"],correct:"2o o'+0.5(o'h+o)+2h=0",rules:["implicit plus product rule","hold o fixed"],correct_rule:"implicit plus product rule"},{expressions:["o'=-(0.5o+2h)/(2o+0.5h)","o'=-(2o+0.5h)/(0.5o+2h)"],correct:"o'=-(0.5o+2h)/(2o+0.5h)",rules:["collect o' terms","invert relation"],correct_rule:"collect o' terms"},{expressions:["-2/3","-3/2"],correct:"-2/3",rules:["substitute o=2,h=1","reciprocal slope"],correct_rule:"substitute o=2,h=1"}],answerText:"do/dh=-2/3."}`

**Correct result:** `-0.6667`, tolerance `.001`.

**Answer text:** do/dh=-2/3.

**Why:** do/dh=-2/3. The linkage slope turns water-level motion into a required hoist correction.

**Wrong-path feedback:** `o` varies with `h`; its derivative cannot be dropped.

**State/output:** linkage arrow; unlock 3.3.

## Stop 11 - Find linkage curvature

**Format/placement:** DERIVE, at `hoist-stand`.

**Metadata:** Concept: second implicit derivative; Keystone: Chain reasoning; Area: Gate House; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the hoist stand, in Gate House.

**Stop reason - exact player copy:** A safe first slope may still bend into an unsafe response.

**Question card story setup - exact player copy:** The linkage slope is negative at the test point, but Wilkes needs to know how that slope itself changes. Differentiate the first derivative relation again and substitute the known `do/dh=-2/3`.

**Question card story-science connection - exact player copy:** Curvature determines whether the safe correction stays safe over a finite movement.

**Question card prompt - exact player copy:** From `(2o+0.5h)o'+0.5o+2h=0`, derive `o''`; submit its value at `(h,o)=(1,2)`.

**Complete format-specific interaction block:** `derive:{goal:"o''",givens:["(2o+0.5h)o'+0.5o+2h=0","o'=-2/3"],lines:[{expressions:["(2o'+0.5)o'+(2o+0.5h)o''+0.5o'+2=0","(2o+0.5h)o''+2=0"],correct:"(2o'+0.5)o'+(2o+0.5h)o''+0.5o'+2=0",rules:["product and implicit rules","differentiate constants only"],correct_rule:"product and implicit rules"},{expressions:["o''=-[(2o'+0.5)o'+0.5o'+2]/(2o+0.5h)","o''=-2/(2o+0.5h)"],correct:"o''=-[(2o'+0.5)o'+0.5o'+2]/(2o+0.5h)",rules:["isolate o''","discard slope"],correct_rule:"isolate o''"},{expressions:["-40/81","-4/9"],correct:"-40/81",rules:["substitute all known values","use first derivative only"],correct_rule:"substitute all known values"}],answerText:"o''=-40/81 per metre."}`

**Correct result:** `-0.49383`, tolerance `.001`.

**Answer text:** o''=-40/81 per metre.

**Why:** o''=-40/81 per metre. Curvature determines whether the safe correction stays safe over a finite movement.

**Wrong-path feedback:** Substitute the original first derivative into the second derivative.

**State/output:** safe corridor narrows; unlock 3.4.

## Stop 12 - Reverse the flow calibration

**Format/placement:** VERIFY, at `hoist-stand`.

**Metadata:** Concept: inverse derivative/arctan; Keystone: Chain reasoning; Area: Gate House; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the hoist stand, in Gate House.

**Stop reason - exact player copy:** The operator enters desired flow, so the reverse calibration must be tested.

**Question card story setup - exact player copy:** Because linkage curvature narrows the safe motion, the command map uses `F(o)=100 arctan(o/2)` cubic metres per second. Predict the opening sensitivity at `o=2`, then verify it with one reversible step, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A measured inverse response certifies the command direction without assuming the chart is correct.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** From $F(o)=100\arctan(o/2)$, use $F'(o)=50/(1+(o/2)^2)$ at $o=2$ to submit the inverse sensitivity $do/dF$ in m/(m^3/s); the linkage remains locked until commitment. **OPERATE:** Apply a +2.0 m^3/s command while head stays 1.0 m and voltage stays fixed. **MEASURE:** Record opening change, then return the command to zero and record residual opening. **INTERPRET:** Submit PASS or FAIL for the predicted 0.080 m response and restoration.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"F'(o)=50/(1+(o/2)^2); do/dF=1/F'(o)",inputs:{o:2,flow_step:2.0},constants:{coefficient:50},submit:{quantity:"inverse sensitivity",unit:"m/(m^3/s)",truth:0.04,tolerance:0.001}},equipment_locked_until_prediction_commit:true,operation:{command_change:2.0,unit:"m^3/s",fixed:["head 1.0 m","voltage"]},measurements:["opening change 0.080 m","returned residual 0.000 m"],restore:{required:true,setting:"zero command",remeasure:true},correct_conclusion:"PASS",answerText:"The inverse sensitivity is 0.040 m/(m^3/s), so a 2.0 m^3/s step predicts 0.080 m; the measured change and zero residual pass."}`

**Correct result:** `dF/do=25`, inverse `.040`; pass.

**Answer text:** predicted `2*.04=.080 m`, measured `.080 m`, and reversal returns to baseline.

**Why:** predicted `2*.04=.080 m`, measured `.080 m`, and reversal returns to baseline. A measured inverse response certifies the command direction without assuming the chart is correct.

**Wrong-path feedback:** The inverse derivative is reciprocal at the matching point, not at the same displayed output by guess.

**State/output:** safe calibration signed.

## Mission outcome

Mission decision: Use the staged calibration path. The chain, linkage. And inverse tests agree, and the gate returns to baseline. The crew can predict discharge without forcing the hoist. Now it must learn how that water moves downstream.

### Post-mission metric screen - exact player copy

TARGET `18:00`; auto `DAM INTEGRITY +3`; canonical enter `60/57/65/72` -> `60/57/65/75`, award 12, allocate 5 Integrity, 4 Safe Storage, 3 Reserve -> `64/57/68/80`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 4 - The Two-Day Cost Note

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 12 SHIFTS UNTIL THE STORM  
**Card title:** Water in Motion  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the arrival map.  
**Card body:** The gate response is predictable, but a safe release also depends on when and how high water reaches each settlement. Position, velocity, acceleration, and related rates turn the moving flood front into warning times. At the arrival map, calculate motion, distance, and changing depth. By the end of the mission, choose the minimum warning lead time.  
**Objective:** Set a warning time that covers the first dangerous arrival.

### Worth knowing first - exact player copy
#### Glossary terms

Position: location along a route.

Velocity: signed change of position per time.

Speed: absolute value of velocity.

Displacement: final position minus initial position.

Total distance: all travel counted positively.

#### Primer concepts

differentiate position for velocity and again for acceleration; compare signs to decide speeding up; split total distance where velocity is zero.  
#### Equations first needed today
**Equation:** `v=dx/dt`, `a=dv/dt=d^2x/dt^2`

**What it is for:** describing motion.

**Symbols:** `x` position, `t` time, `v` velocity, `a` acceleration.

**Why this campaign needs it:** arrival warnings depend on motion, not distance alone.

**Equation:** `dV/dt=(dV/dh)(dh/dt)`

**What it is for:** connecting changing depth to changing volume.

**Symbols:** `V` volume and `h` depth.

**Why this campaign needs it:** downstream rise must be converted into water load.## Main story happening - designer summary

Motion and depth rates convert a release into the first public warning rule.

## Learning and dramatic intent

Join kinematics, distance, and related rates in one human consequence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Downstream Warning Desk | `arrival-map` | automatic**

**World state:** The differentiate the flood front fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 4: DIFFERENTIATE THE FLOOD FRONT OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with differentiate the flood front. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 13 | `arrival-map` | automatic**

**World state:** After 4.2 Location: SAFE.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 13 result to settle distance is not displacement."

**Unlocks/waypoint:** Unlock Stop 14 at `arrival-map` in Downstream Warning Desk.

**Beat 3 - After Stop 14 | `arrival-map` | automatic**

**World state:** After 4.3 Location: SAFE.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 14 result to settle relate depth and reach volume."

**Unlocks/waypoint:** Unlock Stop 15 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 15 | `radio-desk` | automatic**

**World state:** The relate depth and reach volume result remains visible while the commit the warning fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 15 result to settle commit the warning."

**Unlocks/waypoint:** Unlock Stop 16 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SAFE only; settlement route, depth model, and warning authority are here.

## Characters and dramatic beat

Baptiste forces the crew to count closure time after arrival.

## Key concepts, explained here

position/velocity/acceleration, speeding signs, stops, distance/displacement, related rates.

## Stop 13 - Differentiate the flood front

**Format/placement:** DERIVE, at `arrival-map`.

**Metadata:** Concept: motion derivatives; Keystone: Motion/rates; Area: Gate House; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The first settlement needs the flood front's current speed and acceleration.

**Question card story setup - exact player copy:** The front's position is `x(t)=2t^3-9t^2+12t` kilometres after release, for `0<=t<=3` hours. Differentiate twice and classify its motion at `t=2 h` before using the map's average time, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Velocity and acceleration signs show both direction and whether the front is speeding up.

**Question card prompt - exact player copy:** Derive `v(t)` and `a(t)`; submit `(v(2),a(2))` with units and the motion classification.

**Complete format-specific interaction block:** `derive:{goal:"v,a and classification",givens:["x=2t^3-9t^2+12t"],lines:[{expressions:["v=6t^2-18t+12","v=6t-18"],correct:"v=6t^2-18t+12",rules:["power and sum rules","second derivative"],correct_rule:"power and sum rules"},{expressions:["a=12t-18","a=12t+12"],correct:"a=12t-18",rules:["differentiate velocity","absolute value"],correct_rule:"differentiate velocity"},{expressions:["v(2)=0 km/h,a(2)=6 km/h^2; momentary stop","v=6,a=0"],correct:"v(2)=0 km/h,a(2)=6 km/h^2; momentary stop",rules:["substitute and interpret","same sign test"],correct_rule:"substitute and interpret"}],answerText:"At 2 h the front momentarily stops; acceleration is +6 km/h^2."}`

**Correct result:** exact.

**Answer text:** At 2 h the front momentarily stops; acceleration is +6 km/h^2.

**Why:** At 2 h the front momentarily stops; acceleration is +6 km/h^2. Velocity and acceleration signs show both direction and whether the front is speeding up.

**Wrong-path feedback:** Speed is `|v|`; at `v=0` sign comparison needs nearby times.

**State/output:** stop marker; unlock 4.2.

## Stop 14 - Distance is not displacement

**Format/placement:** SEQUENCE, at `arrival-map`.

**Metadata:** Concept: total distance; Keystone: Motion/rates; Area: Powerhouse; Learning role: PRACTICE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** A temporary reversal changes travelled distance and warning coverage.

**Question card story setup - exact player copy:** With a stop at `t=2` established, velocity factors as `6(t-1)(t-2)`, so direction also changes at hour 1. Split the interval and compute every positive position change from `t=0` through `t=3`.

**Question card story-science connection - exact player copy:** Total travel follows each segment; displacement records only the endpoints.

**Question card prompt - exact player copy:** Order the steps, then submit total distance and displacement in kilometres.

**Complete format-specific interaction block:** `cards:["solve v=0: t=1,2","evaluate x(0)=0,x(1)=5,x(2)=4,x(3)=9","sum |5-0|+|4-5|+|9-4|","compute x(3)-x(0)"],order:["solve v=0: t=1,2","evaluate x(0)=0,x(1)=5,x(2)=4,x(3)=9","sum |5-0|+|4-5|+|9-4|","compute x(3)-x(0)"]`

**Correct result:** distance `11 km`, displacement `9 km`.

**Answer text:** split wherever `v=0`, then sum absolute changes.

**Why:** split wherever `v=0`, then sum absolute changes. Total travel follows each segment; displacement records only the endpoints.

**Wrong-path feedback:** Absolute endpoint displacement misses reversals.

**State/output:** route segments; unlock 4.3.

## Stop 15 - Relate depth and reach volume

**Format/placement:** DERIVE, at `arrival-map`.

**Metadata:** Concept: related rates; Keystone: Motion/rates; Area: Powerhouse; Learning role: INTRODUCE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** Warning level depends on how fast depth rises in a widening reach.

**Question card story setup - exact player copy:** Because route distance alone misses water height, model the first reach as `V(h)=12000h^2` cubic metres. At `h=1.5 m`, inflow is `900 m^3/min`; differentiate the constraint to find `dh/dt`, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The depth rate tells how quickly a safe bank becomes a flooded road.

**Question card prompt - exact player copy:** Derive and submit `dh/dt` in metres per minute, showing units.

**Complete format-specific interaction block:** `derive:{goal:"dh/dt",givens:["V=12000h^2 m^3","h=1.5 m","dV/dt=900 m^3/min"],lines:[{expressions:["dV/dt=24000h dh/dt","dV/dt=24000h"],correct:"dV/dt=24000h dh/dt",rules:["implicit chain rule in time","power only"],correct_rule:"implicit chain rule in time"},{expressions:["dh/dt=900/(24000*1.5)=0.025 m/min","0.0375 m/min"],correct:"dh/dt=900/(24000*1.5)=0.025 m/min",rules:["substitute then solve","divide before inserting h"],correct_rule:"substitute then solve"}],answerText:"Depth rises at 0.025 m/min."}`

**Correct result:** `.025 m/min`, tolerance `.0001`.

**Answer text:** Depth rises at 0.025 m/min.

**Why:** Depth rises at 0.025 m/min. The depth rate tells how quickly a safe bank becomes a flooded road.

**Wrong-path feedback:** Differentiate first, then insert the instantaneous depth.

**State/output:** road clock; unlock 4.4.

## Stop 16 - Commit the warning

**Format/placement:** TRIGGER, at `radio-desk`.

**Metadata:** Concept: motion/threshold; Keystone: Motion/rates; Area: Powerhouse; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radio desk, in Downstream Warning Desk.

**Stop reason - exact player copy:** Baptiste must send warnings before release settings arrive.

**Question card story setup - exact player copy:** The first village is `4.0 h` away, and the road closes `40 min` after the rise begins there. Combine travel and closure times, then commit the latest inclusive warning deadline before dispatch updates.

**Question card story-science connection - exact player copy:** A rule written before the update protects people from optimistic rescheduling.

**Question card prompt - exact player copy:** Submit the minimum lead time in minutes before road closure and commit `WARN if planned release begins within that lead time`; use `60 min/h`.

**Complete format-specific interaction block:** `trigger:{decision_rule:"WARN if release begins within committed lead time",scale:{min:200,max:300,step:5,unit:"min"},anchors:[240,280],objective:"warning before first road closure",direction:"at least",consequence_limit:"road must remain open for evacuation"}`

**Correct result:** `4*60+40=280 min`, exact; commit 280.

**Answer text:** warning must precede closure by at least 280 minutes.

**Why:** warning must precede closure by at least 280 minutes. A rule written before the update protects people from optimistic rescheduling.

**Wrong-path feedback:** Include downstream rise time after arrival.

**State/output:** four-hour-forty rule pinned.

## Mission outcome

Mission decision: Use a minimum warning lead of `280 minutes`. It includes travel to the village. And the road's rise time. The warning rule is now tied to motion, not an average. The two-day release plan still needs a true peak test.

### Post-mission metric screen - exact player copy

TARGET `17:00`; auto `DOWNSTREAM +4`; canonical enter `64/57/68/80` -> `64/61/68/80`, award 12, allocate 7 Downstream and 5 Storage -> `69/68/68/80`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 5 - The Last-Half-Metre Relation

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 11 SHIFTS UNTIL THE STORM  
**Card title:** The Peak Between Readings  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** The warning clock is sound, but the two-day plan was approved from endpoint and average values. A continuous function can hide absolute extrema and changing marginal value between sampled times. At the machine board, locate critical points, test endpoints, and compare power with storage. By the end of the mission, decide whether the old two-day plan remains safe.  
**Objective:** Accept or reject the average-based release plan.

### Worth knowing first - exact player copy
#### Glossary terms

Critical point: an interior input where the derivative is zero or undefined.

Absolute maximum: greatest value on the full interval.

Marginal value: the derivative of a total with respect to one more unit.

#### Primer concepts

 EVT guarantees extrema for a continuous function on a closed interval; candidates are endpoints and critical points; first-derivative sign changes classify local extrema.  
#### Equations first needed today
**Equation:** `P'(q)=R'(q)-C'(q)`

**What it is for:** marginal profit/change.

**Symbols:** `P` net value, `R` return, `C` cost, `q` flow.

**Why this campaign needs it:** power value cannot override safe storage.## Main story happening - designer summary

An endpoint overload defeats the average-based plan; a controlled storage test finds a feasible alternative.

## Learning and dramatic intent

Make extrema and theorem hypotheses change operations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `machine-board` | automatic**

**World state:** The find critical turbine demand fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 5: FIND CRITICAL TURBINE DEMAND OPEN

**Dialogue bubbles -** Nia Chen: "Start with find critical turbine demand. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 17 | `machine-board` | automatic**

**World state:** After 5.2 Location: POWER.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 17 result to settle test the absolute peak."

**Unlocks/waypoint:** Unlock Stop 18 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 18 | `dispatch-console` | automatic**

**World state:** Travel Location: POWER->STORE.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 18 result to settle optimize storage against value."

**Unlocks/waypoint:** Unlock Stop 19 at `dispatch-console` in Powerhouse.

**Beat 4 - After Stop 19 | `machine-board` | automatic**

**World state:** The optimize storage against value result remains visible while the prove an intermediate crossing fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 19 result to settle prove an intermediate crossing."

**Unlocks/waypoint:** Unlock Stop 20 at `machine-board` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

POWER to STORE; demand capacity is known only at POWER, storage consequence only at STORE.

## Characters and dramatic beat

Nia legitimately pushes generation, then withdraws the schedule when the endpoint fails.

## Key concepts, explained here

critical points, first/second tests, absolute extrema, EVT, IVT/MVT, marginal change.

## Stop 17 - Find critical turbine demand

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: critical points; Keystone: Extrema; Area: Powerhouse; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The plan's hidden peak must be found before turbines are scheduled.

**Question card story setup - exact player copy:** Turbine demand is `D(t)=t^3-6t^2+9t+20` megawatts for `0<=t<=5` hours. Differentiate and solve for interior critical times before comparing the plan's endpoints and average, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A zero derivative can reveal a peak that sparse readings miss.

**Question card prompt - exact player copy:** Derive `D'(t)`, factor it, and submit all critical times in hours.

**Complete format-specific interaction block:** `derive:{goal:"critical times",givens:["D=t^3-6t^2+9t+20","0<=t<=5"],lines:[{expressions:["D'=3t^2-12t+9","D'=t^2-6t+9"],correct:"D'=3t^2-12t+9",rules:["power and sum rules","divide derivative by degree"],correct_rule:"power and sum rules"},{expressions:["3(t-1)(t-3)=0","3(t-2)^2=0"],correct:"3(t-1)(t-3)=0",rules:["factor quadratic","complete wrong square"],correct_rule:"factor quadratic"},{expressions:["t=1,3 h","t=0,5 h"],correct:"t=1,3 h",rules:["zero-product property","endpoint theorem"],correct_rule:"zero-product property"}],answerText:"Critical times are 1 h and 3 h."}`

**Correct result:** `1,3 h`.

**Answer text:** Critical times are 1 h and 3 h.

**Why:** Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Wrong-path feedback:** Endpoints are extrema candidates but not critical interior points.

**State/output:** candidates lit; unlock 5.2.

## Stop 18 - Test the absolute peak

**Format/placement:** BALLPARK, at `machine-board`.

**Metadata:** Concept: EVT/first-second derivative tests; Keystone: Extrema; Area: Gate House; Learning role: PRACTICE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The highest candidate, not the average, sets turbine capacity.

**Question card story setup - exact player copy:** With critical times found, evaluate demand at `t=0,1,3,5`, then use derivative signs or `D''(t)=6t-12` to justify the maximum. The machine limit is `24 MW`, inclusive, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A correct maximum decides whether the two-day plan overloads the available unit.

**Question card prompt - exact player copy:** Using `D(t)=t^3-6t^2+9t+20 MW`, evaluate `t=0,1,3,5 h`; submit the absolute maximum in megawatts, its time in hours, and `safe/unsafe` against the inclusive `24 MW` limit.

**Complete format-specific interaction block:** `estimate:{labels:["D(0)","D(1)","D(3)","D(5)"],values:[[20],[24],[20],[40]],slots:4,template:"largest candidate",formula:"max(20,24,20,40)",correct:[20,24,20,40],target:40,tolerance:0}`

**Correct result:** `40 MW at 5 h`, unsafe; local max at `1 h` is `24 MW`.

**Answer text:** EVT requires endpoints plus critical points; the endpoint peak exceeds capacity.

**Why:** EVT requires endpoints plus critical points; the endpoint peak exceeds capacity. A correct maximum decides whether the two-day plan overloads the available unit.

**Wrong-path feedback:** A local maximum need not be the absolute maximum.

**State/output:** overload tag; waypoint to STORE.

## Stop 19 - Optimize storage against value

**Format/placement:** CONTROL, at `dispatch-console`.

**Metadata:** Concept: optimization/marginal value; Keystone: Extrema; Area: Powerhouse; Learning role: COMBINE; Difficulty: L5; Story role: character.

**Call - exact player copy:** Go to the dispatch console, in Powerhouse.

**Stop reason - exact player copy:** Storage must show whether a lower-power schedule can still create room.

**Question card story setup - exact player copy:** Because the power peak is unsafe, test release `q=180` then `200 m^3/s` while forecast inflow and starting level remain fixed. Measure projected storage margin, restore `q=180`, and compare marginal benefit, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A controlled reversal separates the release setting's effect from a changing forecast.

**Question card prompt - exact player copy:** Choose `release` from the three candidate controls `release`, `inflow forecast`, and `starting level`. Measure projected storage margin at 180 m^3/s, change only release to 200 m^3/s while the forecast and starting level remain fixed, measure after the projection settles, restore 180 m^3/s and measure again, then submit the marginal gain in million m^3 per (m^3/s) and one causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"release",label:"release q"},{id:"forecast",label:"inflow forecast"},{id:"start",label:"starting level"}],correct_control:"release",baseline:180,response:200,noise_band:0.01,measurements:[0.42,0.50,0.42],restore:true,correct_conclusion:"Increasing q by 20 adds 0.08 million m^3 margin; 0.004 million m^3 per (m^3/s)."}`

**Correct result:** causal; marginal gain `.08/20=.004 million m^3 per (m^3/s)`.

**Answer text:** The completed check shows causal; marginal gain .08/20=.004 million m^3 per (m^3/s).

**Why:** causal; marginal gain `.08/20=.004 million m^3 per (m^3/s)`. A controlled reversal separates the release setting's effect from a changing forecast.

**Wrong-path feedback:** A one-way change without restoration cannot rule out drift.

**State/output:** feasible lower-power candidate; unlock 5.4.

## Stop 20 - Prove an intermediate crossing

**Format/placement:** CHOICE, asked by Nia Chen beside `machine-board`.

**Metadata:** Concept: IVT/MVT/differentiability; Keystone: Limits and extrema; Area: Storage & Level Board; Learning role: RETRIEVE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Nia Chen, at the machine board in Powerhouse.

**Stop reason - exact player copy:** The final plan must prove, not assume, that a warning level is crossed.

**Question card story setup - exact player copy:** The continuous level model gives `H(2)=4.3 m` and `H(4)=4.9 m`, while warning level is `4.6 m`. Choose the theorem guaranteeing a crossing, then distinguish it from the Mean Value Theorem.

**Question card story-science connection - exact player copy:** The theorem's hypotheses determine what the crew may guarantee between readings.

**Question card prompt - exact player copy:** Select exactly one of four theorem conclusions and submit its label.

**Choices:**

1. Intermediate Value Theorem: some time has the intermediate level because the level function is continuous and the endpoints bracket it. **(correct)**

2. Mean Value Theorem: some time has the intermediate level because the average rate is 0.3 m/h.

3. Extreme Value Theorem: the desired level must be a maximum or minimum.

4. No theorem applies unless the exact crossing time can first be solved.

**Complete format-specific interaction block:** `question:"Which claim is justified?"; choices:["IVT guarantees some c in (2,4) with H(c)=4.6 m","MVT guarantees H(c)=4.6 m","EVT guarantees H(c)=4.6 m","No theorem applies"]; answer:"IVT guarantees some c in (2,4) with H(c)=4.6 m"; why:"Continuity and the endpoint values satisfy IVT."; rebuttals:{"MVT guarantees H(c)=4.6 m":"MVT guarantees a derivative equal to the secant slope, not an intermediate function value.","EVT guarantees H(c)=4.6 m":"EVT guarantees absolute extrema, not every value between endpoint outputs.","No theorem applies":"Continuity and 4.6 lying between the endpoint values satisfy IVT."}`

**Correct result:** IVT. MVT would instead guarantee some derivative equal `(4.9-4.3)/2=0.3 m/h` if differentiable.

**Answer text:** The completed check shows iVT. MVT would instead guarantee some derivative equal (4.9-4.3)/2=0.3 m/h if differentiable.

**Why:** IVT. MVT would instead guarantee some derivative equal `(4.9-4.3)/2=0.3 m/h` if differentiable. The theorem's hypotheses determine what the crew may guarantee between readings.

**Wrong-path feedback:** (2) **Mean Value Theorem:** MVT guarantees a derivative matching an average rate, not a function value between endpoint values. (3) **Extreme Value Theorem:** EVT guarantees extrema on a closed interval; it does not guarantee this intermediate level. (4) **No theorem applies:** Continuity plus bracketing values is exactly the IVT hypothesis, so an exact time is unnecessary.

**State/output:** old plan rejected.

## Mission outcome

Mission decision: Use the safer release setting. The level must cross 4.6 metres. The theorem proves a crossing, not its exact time. Next, total the storm inflow.

### Post-mission metric screen - exact player copy

TARGET `18:00`; auto `SAFE STORAGE +4`; canonical enter `69/68/68/80` -> `73/68/68/80`, award 12, allocate 7 Reserve, 5 Integrity -> `73/68/75/85`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 6 - The Peak Test

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 10 SHIFTS UNTIL THE STORM  
**Card title:** Beyond the Old Horizon  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the high-ground gauge.  
**Card body:** The average-based release plan is unsafe, and a newly installed high-ground gauge now sees rain hidden from radar. Asymptotes and derivative sign charts reveal long-run behavior and peaks without trusting a pretty fit. At the gauge and archive, compare rival hydrographs and their residuals. By the end of the mission, decide which inflow forecast controls the drawdown.  
**Objective:** Select the forecast that survives unseen data.

### Worth knowing first - exact player copy
#### Glossary terms

Asymptote: a line a graph approaches.

Residual: observed value minus model prediction.

Holdout data: observations hidden until a model is frozen.

#### Primer concepts

 compare rational degrees for horizontal asymptotes; denominator zeros can create vertical asymptotes; use derivative signs for shape and second-derivative signs for concavity.  
#### Equations first needed today
**Equation:** `residual=observed-predicted`

**What it is for:** exposing patterned model failure.

**Symbols:** observed is measurement; predicted is fitted value.

**Why this campaign needs it:** unseen gauge data decides between forecasts.## Main story happening - designer summary

Physical asymptotes reject one model; frozen holdout testing reveals a missed later crest.

## Learning and dramatic intent

Teach full curve behavior and honest validation while delivering Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `trace-bench` | automatic**

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with classify forecast breaks. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 21 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 21 | `high-ground-gauge` | automatic**

**World state:** After 6.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Use the Stop 21 result to settle read inverse-shaped saturation."

**Unlocks/waypoint:** Unlock Stop 22 at `high-ground-gauge` in Catchment & Inflow Desk.

**Beat 3 - After Stop 22 | `forecast-drawer` | automatic**

**World state:** Travel Location: INFLOW->ARCHIVE.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 22 result to settle freeze before revealing the crest."

**Unlocks/waypoint:** Unlock Stop 23 at `forecast-drawer` in Catchment & Inflow Desk.

**Beat 4 - After Stop 23 | `gauge-wall` | automatic**

**World state:** The freeze before revealing the crest result remains visible while the diagnose the full curve fixture lights.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "Use the Stop 23 result to settle diagnose the full curve."

**Unlocks/waypoint:** Unlock Stop 24 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

INFLOW to ARCHIVE; gauge supplies models, archive alone holds unseen readings.

## Characters and dramatic beat

Imani admits the terrain limitation rather than blaming the new instrument.

## Key concepts, explained here

vertical/horizontal/oblique asymptotes, derivative/concavity signs, holdout residuals, curve sketching.

## Stop 21 - Classify forecast breaks

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: asymptotes/L'Hopital; Keystone: Limits; Area: Storage & Level Board; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** A forecast with an artificial blow-up cannot control the release.

**Question card story setup - exact player copy:** The first rival model is `R(t)=(3t^2+1)/(t^2-4)` millimetres per hour. Find vertical and horizontal asymptotes, then use the limits to state where its graph cannot represent a physical rain rate, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Physical rainfall cannot become infinite at an ordinary forecast hour.

**Question card prompt - exact player copy:** Derive the denominator zeros and `lim_(t->infinity)R(t)`; submit all asymptotes.

**Complete format-specific interaction block:** `derive:{goal:"asymptotes",givens:["R=(3t^2+1)/(t^2-4)"],lines:[{expressions:["t=+-2","t=4"],correct:"t=+-2",rules:["denominator zero with nonzero numerator","numerator zero"],correct_rule:"denominator zero with nonzero numerator"},{expressions:["lim=3","lim=0"],correct:"lim=3",rules:["divide by t^2 / compare degrees","use denominator roots"],correct_rule:"divide by t^2 / compare degrees"}],answerText:"Vertical asymptotes t=+-2; horizontal asymptote R=3."}`

**Correct result:** exact.

**Answer text:** Vertical asymptotes t=+-2; horizontal asymptote R=3.

**Why:** Vertical asymptotes t=+-2; horizontal asymptote R=3. Physical rainfall cannot become infinite at an ordinary forecast hour.

**Wrong-path feedback:** Equal polynomial degrees approach the ratio of leading coefficients; an oblique asymptote would require numerator degree one greater and long division.

**State/output:** first model rejected; unlock 6.2.

## Stop 22 - Read inverse-shaped saturation

**Format/placement:** SWEEP, at `high-ground-gauge`.

**Metadata:** Concept: arctan derivative/asymptote; Keystone: Chain/inverse; Area: Storage & Level Board; Learning role: RETRIEVE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the high-ground gauge, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The second forecast must show a finite, physically plausible long-run rain rate.

**Question card story setup - exact player copy:** Because the rational forecast blows up, sweep `S(t)=18+12 arctan(t-4)` from `t=0` to `10 h`. Record where its slope is largest and the horizontal value it approaches as time grows, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A smooth saturating curve can represent a storm band without an artificial infinite spike.

**Question card prompt - exact player copy:** Sweep `t` from `0` through `10 h` in `0.5 h` steps, collect readings at `0,4,8,10 h`, and submit the maximum-slope time in hours plus the upper asymptote in `mm/h`.

**Complete format-specific interaction block:** `sweep:{control:"t",min:0,max:10,step:0.5,unit:"h",response:"S(t) mm/h",required_points:[0,4,8,10],correct_conclusion:"maximum slope at t=4; upper asymptote 18+6pi=36.850 mm/h"}`.

**Correct result:** `t=4`, `36.850 mm/h`, tolerance `.01`.

**Answer text:** `S'=12/[1+(t-4)^2]`, largest at 4; `arctan -> pi/2`.

**Why:** `S'=12/[1+(t-4)^2]`, largest at 4; `arctan -> pi/2`. A smooth saturating curve can represent a storm band without an artificial infinite spike.

**Wrong-path feedback:** The function's maximum slope and maximum value are different.

**State/output:** travel to ARCHIVE.

## Stop 23 - Freeze before revealing the crest

**Format/placement:** HOLDOUT, at `forecast-drawer`.

**Metadata:** Concept: curve shape/model validation; Keystone: Extrema/concavity; Area: Forecast Archive; Learning role: RETRIEVE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the forecast drawer, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** Each forecast must be fixed before the unseen high-ground readings appear.

**Question card story setup - exact player copy:** With the plausible model identified, fit old radar hours `0-5` using Forecast A or B and freeze every parameter. The archive then reveals high-ground readings at hours `6-9` to test extrapolation.

**Question card story-science connection - exact player copy:** A model that fits training data but misses a patterned holdout crest cannot guide release.

**Question card prompt - exact player copy:** Fit and freeze exactly one named model using hours `0-5`, reveal hours `6-9`, and submit the model label `A` or `B` that passes the holdout.

**Complete format-specific interaction block:** `holdout:{training:[{t:0,y:19},{t:2,y:21},{t:4,y:29},{t:5,y:33}],models:[{id:"A",pred_holdout:[31,27,22,19]},{id:"B",pred_holdout:[35,37,34,28]}],freeze_required:true,holdout:[{t:6,y:35},{t:7,y:38},{t:8,y:34},{t:9,y:29}],answer:"B"}`

**Correct result:** B.

**Answer text:** B residuals `[0,1,0,1]`; A residuals `[4,11,12,10]` form a missed crest.

**Why:** B residuals `[0,1,0,1]`; A residuals `[4,11,12,10]` form a missed crest. A model that fits training data but misses a patterned holdout crest cannot guide release.

**Wrong-path feedback:** Training fit does not validate extrapolation.

**State/output:** late crest on wall; unlock 6.4.

## Stop 24 - Diagnose the full curve

**Format/placement:** RESIDUAL, at `gauge-wall`.

**Metadata:** Concept: curve sketching/signs; Keystone: Extrema/limits; Area: Storage & Level Board; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The replacement forecast must fit values and the direction of change.

**Question card story setup - exact player copy:** Forecast B matches the holdout values, so inspect its residual field, derivative signs, and concavity around the crest. Decide whether a bias, timing shift, or missing peak best explains Forecast A's failure.

**Question card story-science connection - exact player copy:** Pattern, not merely low average error, identifies the failed mechanism.

**Question card prompt - exact player copy:** Compare all three labeled residual fields and submit exactly one conclusion: `bias`, `timing`, or `missing_peak`.

**Complete format-specific interaction block:** `residual:{fields:[{id:"bias",residuals:[6,6,6,6],rms:6},{id:"timing",residuals:[-3,0,3,0],rms:2.12},{id:"missing_peak",residuals:[4,11,12,10],rms:9.72}],features:["A residuals positive through crest","B derivative + then -","B concavity changes before crest"],correct:"missing_peak"}`

**Correct result:** missing peak.

**Answer text:** systematic positive residuals at the crest show the old forecast underestimates a later, larger storm.

**Why:** systematic positive residuals at the crest show the old forecast underestimates a later, larger storm. Pattern, not merely low average error, identifies the failed mechanism.

**Wrong-path feedback:** Lowest RMS alone is not the question when residual shape diagnoses mechanism.

**State/output:** Forecast B controls.

## Mission outcome

Mission decision: Use Forecast B. It stays finite, predicts a later crest. And survives unseen high-ground data. The old model missed the peak rather than suffering a constant bias. More water is coming, so the crew must total the full storm volume.

### Post-mission metric screen - exact player copy

TARGET `19:00`; automatic `SAFE STORAGE -8 | OPERATING RESERVE -3`; canonical enter `73/68/75/85` -> `65/68/72/85`, award 12, allocate all Storage -> `77/68/72/85`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 7 - The Wall's Carrying Limit

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 9 SHIFTS UNTIL THE STORM  
**Card title:** Count Every Cubic Metre  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** Forecast B predicts a larger crest, but peak flow alone does not tell how much water the reservoir must hold. A definite integral accumulates a rate, and numerical sums estimate it from readings. At the gauges and storage board, total incoming water and verify the accumulation rule. By the end of the mission, set the required drawdown volume.  
**Objective:** Calculate storm inflow and required empty storage.

### Worth knowing first - exact player copy
#### Glossary terms

Antiderivative: a function whose derivative is the integrand.

Riemann sum: rectangles approximating accumulated change.

Definite integral: signed accumulation across bounds.

#### Primer concepts

 include `+C` for indefinite integrals; FTC evaluates an antiderivative at bounds; left/right accuracy follows monotonicity and trapezoid error follows concavity.  
#### Equations first needed today
**Equation:** `integral_a^b f(x)dx=F(b)-F(a)`

**What it is for:** exact accumulation.

**Symbols:** `f` rate, `F` antiderivative, `a,b` bounds.

**Why this campaign needs it:** storm flow must become storm volume.

**Equation:** `lim_(n->infinity) sum f(x_i)Delta x=integral_a^b f(x)dx`, `Delta x=(b-a)/n`

**What it is for:** linking sampled rectangles to exact accumulation.

**Symbols:** `n` rectangles and `x_i` sample points.

**Why this campaign needs it:** gauges provide discrete readings.## Main story happening - designer summary

Discrete and exact accumulation convert the larger crest into a drawdown target.

## Learning and dramatic intent

Move from rate samples to Riemann sums, antiderivatives, and both FTC parts.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `gauge-wall` | automatic**

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with estimate sampled inflow. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 25 | `trace-bench` | automatic**

**World state:** After 7.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Use the Stop 25 result to settle build exact accumulation."

**Unlocks/waypoint:** Unlock Stop 26 at `trace-bench` in Catchment & Inflow Desk.

**Beat 3 - After Stop 26 | `trace-bench` | automatic**

**World state:** Travel Location: INFLOW->STORE.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 26 result to settle verify ftc part 2."

**Unlocks/waypoint:** Unlock Stop 27 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 27 | `water-ledger` | automatic**

**World state:** The verify ftc part 2 result remains visible while the separate signed change from physical volume fixture lights.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 27 result to settle separate signed change from physical volume."

**Unlocks/waypoint:** Unlock Stop 28 at `water-ledger` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

INFLOW to STORE; only STORE contains current empty capacity and safety margin.

## Characters and dramatic beat

Imani owns inflow total; Mara converts it into operational room.

## Key concepts, explained here

Riemann sums, left/right/trapezoid behavior, antiderivatives and `+C`, linearity, FTC 1/2, signed accumulation.

## Stop 25 - Estimate sampled inflow

**Format/placement:** BALANCE, at `gauge-wall`.

**Metadata:** Concept: L/R/trapezoid sums; Keystone: Accumulation; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The crew needs a first volume estimate from six-hour gauge readings.

**Question card story setup - exact player copy:** Forecast flows at hours `0,6,12,18,24` are `120,172.5,210,232.5,240 m3/s`. Compute left, right, and trapezoidal sums using `6 h=21,600 s`, then compare their likely bias from the rise.

**Question card story-science connection - exact player copy:** Numerical accumulation brackets urgency before an exact model is integrated.

**Question card prompt - exact player copy:** Load the five flows in `m^3/s`, use `Delta t=6 h=21600 s`, and submit the left, right, and trapezoidal totals in cubic metres plus an over/under conclusion.

**Complete format-specific interaction block:** `balance:{streams:[{id:"left_sum",label:"left-endpoint estimate",values:[120,172.5,210,232.5],weight:21600,unit:"m3",counts:true},{id:"right_sum",label:"right-endpoint estimate",values:[172.5,210,232.5,240],weight:21600,unit:"m3",counts:true},{id:"trapezoid",label:"trapezoidal estimate",values:[146.25,191.25,221.25,236.25],weight:21600,unit:"m3",counts:true},{id:"midpoint_guess",label:"unsupported midpoint guess",value:18000000,unit:"m3",counts:false,reason:"no midpoint readings were observed"}],correct:{left_sum:15876000,right_sum:18468000,trapezoid:17172000},answerText:"Left and right sums bracket the rising flow; the trapezoidal estimate is 17,172,000 m3, and the unsupported midpoint guess does not count."}`

**Correct result:** `L=15.876`, `R=18.468`, `T=17.172 million m^3`.

**Answer text:** for this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints.

**Why:** for this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Wrong-path feedback:** Convert hours to seconds.

**State/output:** estimated band; unlock 7.2.

## Stop 26 - Build exact accumulation

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: antiderivatives/linearity/FTC/Riemann limit; Keystone: FTC; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The release goal needs an exact model total, not only rectangles.

**Question card story setup - exact player copy:** Use `I(t)=120+10t-(5/24)t^2 m3/s` for `0<=t<=24 h`. Build its antiderivative and evaluate the definite integral, converting hours to seconds, to check the sampled estimate near `17 million m3`.

**Question card story-science connection - exact player copy:** FTC converts the continuous forecast rate into total incoming volume.

**Question card prompt - exact player copy:** Derive `integral_0^24 I(t)dt`, multiply by `3600 s/h`, and submit cubic metres.

**Complete format-specific interaction block:** `derive:{goal:"storm volume",givens:["I=120+10t-(5/24)t^2","0<=t<=24 h","3600 s/h"],lines:[{expressions:["F=120t+5t^2-(5/72)t^3+C","F=120+10t^2-(5/12)t^3"],correct:"F=120t+5t^2-(5/72)t^3+C",rules:["linearity and power antiderivative","differentiate"],correct_rule:"linearity and power antiderivative"},{expressions:["[F(24)-F(0)]*3600","F(24)*24"],correct:"[F(24)-F(0)]*3600",rules:["FTC Part 1 and unit conversion","mean value"],correct_rule:"FTC Part 1 and unit conversion"},{expressions:["17,280,000 m^3","4,800 m^3"],correct:"17,280,000 m^3",rules:["evaluate bounds","omit seconds"],correct_rule:"evaluate bounds"}],answerText:"The modeled storm adds 17,280,000 m^3."}`

**Correct result:** `17,280,000 m^3`, tolerance `1000`.

**Answer text:** The modeled storm adds 17,280,000 m^3.

**Why:** The modeled storm adds 17,280,000 m^3. FTC converts the continuous forecast rate into total incoming volume.

**Wrong-path feedback:** The antiderivative constant cancels in a definite integral, but belongs in the indefinite family.

**State/output:** exact total; waypoint STORE.

## Stop 27 - Verify FTC Part 2

**Format/placement:** VERIFY, at `trace-bench`.

**Metadata:** Concept: accumulation derivative; Keystone: FTC; Area: Gate House; Learning role: PRACTICE; Difficulty: L4; Story role: verification.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The board must show that its running total changes at the measured inflow rate.

**Question card story setup - exact player copy:** Because exact total matches the numerical scale, test the live accumulator `A(x)=integral_0^x I(t)dt`. Predict `A'(12)`, advance the clock around hour 12, and compare the measured accumulation slope with inflow, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** FTC Part 2 certifies that the totalizer and rate gauge describe the same water.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** For $A(x)=\int_0^x I(t)dt$ and $I(t)=120+10t-(5/24)t^2$ m^3/s, submit $A'(12)$ in m^3/s; the clock remains locked until commitment. **OPERATE:** Advance from 11.9 to 12.1 h with Forecast B and release 0 fixed. **MEASURE:** Record accumulator slope and inflow gauge at hour 12. **INTERPRET:** Submit PASS or FAIL; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:210,unit:"m^3/s",tolerance:1},equipment_locked_until_prediction_commit:true,operation:"advance 11.9 to 12.1 h",fixed:["forecast B","release 0"],measurements:["accumulator slope 209.9 m^3/s","gauge 210.0 m^3/s"],restore:false,correct_conclusion:"passes"}`

**Correct result:** `210`; pass.

**Answer text:** `120+10(12)-(5/24)(12^2)=210`; both readings agree within `1 m^3/s`.

**Why:** `120+10(12)-(5/24)(12^2)=210`; both readings agree within `1 m^3/s`. FTC Part 2 certifies that the totalizer and rate gauge describe the same water.

**Wrong-path feedback:** The derivative of an accumulation with upper bound `x` is the integrand at `x`.

**State/output:** totalizer certified; unlock 7.4.

## Stop 28 - Separate signed change from physical volume

**Format/placement:** CHOICE, asked by Imani Okoro beside `water-ledger`.

**Metadata:** Concept: signed integral/area/sum bias; Keystone: Accumulation; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Imani Okoro, at the water ledger in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The drawdown target must count incoming water and a fixed safety margin.

**Question card story setup - exact player copy:** The current empty storage is `14.0 million m^3`; storm inflow is `17.28 million m^3`, and the campaign safety margin is `2.00 million m^3`. Choose the additional pre-storm drawdown required, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A volume ledger, not peak flow, determines whether the reservoir can hold the storm.

**Question card prompt - exact player copy:** Use `drawdown = storm inflow + safety margin - current empty storage`; select exactly one of four values and submit its label in million cubic metres.

**Choices:**

1. 1.28 million m^3.

2. 5.28 million m^3. **(correct)**

3. 15.28 million m^3.

4. 33.28 million m^3.

**Complete format-specific interaction block:** `question:"What additional drawdown is required?"; choices:["5.28 million m^3","3.28 million m^3","19.28 million m^3","1.28 million m^3"]; answer:"5.28 million m^3"; why:"17.28+2.00-14.00=5.28 million m^3."; rebuttals:{"3.28 million m^3":"This omits the required 2.00 million m^3 safety margin.","19.28 million m^3":"This fails to subtract the 14.00 million m^3 already empty.","1.28 million m^3":"This subtracts the safety margin instead of reserving it."}`

**Correct result:** `17.28+2.00-14.00=5.28 million m^3`.

**Answer text:** The completed check shows 17.28+2.00-14.00=5.28 million m^3.

**Why:** `17.28+2.00-14.00=5.28 million m^3`. A volume ledger, not peak flow, determines whether the reservoir can hold the storm.

**Wrong-path feedback:** (1) **1.28 million m^3:** This subtracts the safety margin instead of reserving it. (3) **15.28 million m^3:** This omits the 14.00 million m^3 of storage already empty. (4) **33.28 million m^3:** This adds current empty storage when it must reduce required drawdown.

**State/output:** drawdown target painted on board.

## Mission outcome

Mission decision: Draw down `5.28 million m^3` before the storm. The integral gives `17.28 million m^3` of inflow. And the plan also keeps `2.00 million m^3` of campaign safety room. The next task is finding a release mix that clears this volume without flooding the valley.

### Post-mission metric screen - exact player copy

TARGET `19:00`; auto `SAFE STORAGE +8`; canonical enter `77/68/72/85` -> `85/68/72/85`, award 12, allocate 8 Downstream, 4 Reserve -> `85/76/76/85`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 8 - The Just-Clears Release

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 8 SHIFTS UNTIL THE STORM  
**Card title:** Make Room Without Making a Flood  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** The reservoir needs `5.28 million m^3` of added room, but every cubic metre released travels downstream. Substitution and signed accumulation can compare changing turbine and gate flows with the safety corridor. At the machines and warning desk, integrate candidate schedules and total their downstream effect. By the end of the mission, choose a release mix that just clears the target.  
**Objective:** Select a release schedule meeting storage and downstream limits.

### Worth knowing first - exact player copy
#### Glossary terms

Substitution: replacing a repeated inner expression with one variable.

Signed accumulation: positive and negative contributions retained by sign.

#### Primer concepts

 choose `u=g(x)` when `g'(x)` is present; total physical area uses absolute values; split intervals where sign changes.  
#### Equations first needed today
**Equation:** `u=g(x), du=g'(x)dx`

**What it is for:** simplifying a composite integral.

**Symbols:** `u` replacement variable and `du` its differential.

**Why this campaign needs it:** gate flow contains a repeated head expression.## Main story happening - designer summary

Integrated turbine volume leaves a gate deficit; downstream signed exposure constrains its allocation.

## Learning and dramatic intent

Use substitution and absolute accumulation to build a multi-constraint plan.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `machine-board` | automatic**

**World state:** The substitute the head term fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 8: SUBSTITUTE THE HEAD TERM OPEN

**Dialogue bubbles -** Nia Chen: "Start with substitute the head term. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 29 | `machine-board` | automatic**

**World state:** After 8.2 Location: POWER.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 29 result to settle verify turbine volume."

**Unlocks/waypoint:** Unlock Stop 30 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 30 | `machine-board` | automatic**

**World state:** Travel Location: POWER->SAFE.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 30 result to settle total the signed surge."

**Unlocks/waypoint:** Unlock Stop 31 at `machine-board` in Powerhouse.

**Beat 4 - After Stop 31 | `dispatch-console` | automatic**

**World state:** The total the signed surge result remains visible while the allocate the just-clears plan fixture lights.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 31 result to settle allocate the just-clears plan."

**Unlocks/waypoint:** Unlock Stop 32 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

POWER to SAFE; turbine total creates the gate question, and SAFE owns its consequence.

## Characters and dramatic beat

Nia and Baptiste reconcile generation with public limits.

## Key concepts, explained here

u-substitution, bounds conversion, signed versus total area, constrained allocation.

## Stop 29 - Substitute the head term

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: u-substitution; Keystone: FTC; Area: Forecast Archive; Learning role: PRACTICE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The changing-head turbine flow must be integrated before a gate deficit is known.

**Question card story setup - exact player copy:** Turbine flow is `Q(t)=200t(1+t^2)^2 m3/s` for `0<=t<=2 h` in a scaled test. Substitute `u=1+t^2` and derive the exact accumulated value before unit conversion.

**Question card story-science connection - exact player copy:** Substitution turns linked head response into a usable released volume.

**Question card prompt - exact player copy:** Derive `integral_0^2 200t(1+t^2)^2dt`; submit the scaled integral value and name `u,du`.

**Complete format-specific interaction block:** `derive:{goal:"integral",givens:["u=1+t^2","du=2t dt"],lines:[{expressions:["100 integral_1^5 u^2 du","200 integral_0^2 u^2 dt"],correct:"100 integral_1^5 u^2 du",rules:["u-substitution and changed bounds","power rule"],correct_rule:"u-substitution and changed bounds"},{expressions:["(100/3)[u^3]_1^5","100[u^2]_1^5"],correct:"(100/3)[u^3]_1^5",rules:["power antiderivative","differentiate"],correct_rule:"power antiderivative"},{expressions:["12400/3","400"],correct:"12400/3",rules:["evaluate bounds","subtract inputs"],correct_rule:"evaluate bounds"}],answerText:"The scaled accumulation is 12400/3."}`

**Correct result:** `4133.333`, tolerance `.01`.

**Answer text:** The scaled accumulation is 12400/3.

**Why:** The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Wrong-path feedback:** Change the bounds when changing variables.

**State/output:** integral method certified; unlock 8.2.

## Stop 30 - Verify turbine volume

**Format/placement:** VERIFY, at `machine-board`.

**Metadata:** Concept: definite integral/unit conversion; Keystone: FTC; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The actual schedule must be checked against the integrated prediction.

**Question card story setup - exact player copy:** The operational schedule predicts a constant-equivalent turbine release of `125 m^3/s` for `8.0 h`. Calculate its volume, commit it, then run the dispatch simulation and measure total discharge, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Measured turbine volume determines the gate volume still needed.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $V=Qt$ with $Q=125$ m^3/s, $t=8.0$ h, and 3,600 s/h; submit volume in m^3 before dispatch unlocks. **OPERATE:** Run the 8.0 h schedule with Forecast B and gate flow 0 fixed. **MEASURE:** Record total discharge and ending rate. **INTERPRET:** Submit PASS or FAIL; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:3600000,unit:"m^3",tolerance:1000},equipment_locked_until_prediction_commit:true,operation:"run 8.0 h schedule",fixed:["Forecast B","gate flow 0"],measurements:["3.598 million m^3","124.9 m^3/s end"],restore:false,correct_conclusion:"passes"}`

**Correct result:** `3.600 million m^3`; pass.

**Answer text:** `125*8*3600=3,600,000`.

**Why:** `125*8*3600=3,600,000`. Measured turbine volume determines the gate volume still needed.

**Wrong-path feedback:** Hours must convert to seconds.

**State/output:** deficit `1.68 million`; waypoint SAFE.

## Stop 31 - Total the signed surge

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: velocity integral/total area; Keystone: Motion+FTC; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The gate addition must not push the downstream surge beyond its corridor.

**Question card story setup - exact player copy:** With a `1.68 million m^3` deficit, downstream excess flow is `E(t)=30t-10t^2 m^3/s` for `0<=t<=4 h`. Find its zero, then separate signed net change from total water movement, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Flood exposure counts positive excess, while net signed change can hide a later reversal.

**Question card prompt - exact player copy:** Derive the zero and evaluate `integral_0^4 E(t)dt` and `integral_0^4 |E(t)|dt`; submit both scaled values in `(m^3/s)*h`.

**Complete format-specific interaction block:** `derive:{goal:"signed and total",givens:["E=10t(3-t)"],lines:[{expressions:["zeros t=0,3","zeros t=0,4"],correct:"zeros t=0,3",rules:["factor and zero product","endpoint only"],correct_rule:"factor and zero product"},{expressions:["[15t^2-(10/3)t^3]_0^4=80/3","40/3"],correct:"[15t^2-(10/3)t^3]_0^4=80/3",rules:["FTC signed integral","absolute endpoints"],correct_rule:"FTC signed integral"},{expressions:["integral_0^3 E - integral_3^4 E=190/3","80/3"],correct:"integral_0^3 E - integral_3^4 E=190/3",rules:["split and reverse negative area","keep signed"],correct_rule:"split and reverse negative area"}],answerText:"Net=80/3; total=190/3 in scaled units."}`

**Correct result:** `26.667,63.333`, tolerance `.01`.

**Answer text:** Net=80/3; total=190/3 in scaled units.

**Why:** Net=80/3; total=190/3 in scaled units. Flood exposure counts positive excess, while net signed change can hide a later reversal.

**Wrong-path feedback:** Total physical amount splits where the rate changes sign.

**State/output:** downstream exposure limit; unlock 8.4.

## Stop 32 - Allocate the just-clears plan

**Format/placement:** ALLOCATE, at `dispatch-console`.

**Metadata:** Concept: constrained accumulation; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the dispatch console, in Powerhouse.

**Stop reason - exact player copy:** The remaining volume must be assigned without losing warning or reserve capacity.

**Question card story setup - exact player copy:** Turbines clear `3.60` of the required `5.28 million m^3`, leaving `1.68`. Allocate the remaining release, warning staff, gate test, and protected reserve so every required condition is funded, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A mathematically sufficient release is unusable without warning and restart capacity.

**Question card prompt - exact player copy:** Allocate all `100` points among the four named items and submit one allocation plan; gate release, warning, test, and protected reserve must all be funded.

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"gate",label:"1.68 million m3 gate release",cost:40,required:true},{id:"warning",label:"downstream warning shift",cost:25,required:true},{id:"test",label:"reversal gate test",cost:15,required:true},{id:"reserve",label:"restart reserve",cost:20,required:true,protected:true},{id:"cosmetic",label:"control-room repainting",cost:15,required:false}],questions:[{id:"release",text:"Does total release reach 5.28 million m3?",required:true},{id:"warning",text:"Are downstream warnings staffed?",required:true},{id:"reserve",text:"Is the restart reserve protected?",required:true}],correct_allocation:{gate:40,warning:25,test:15,reserve:20},answerText:"Fund the gate, warning, reversal test, and protected reserve; repainting would exceed the pool without improving clearance."}`

**Correct result:** all four funded exactly.

**Answer text:** The completed check shows all four funded exactly.

**Why:** all four funded exactly. A mathematically sufficient release is unusable without warning and restart capacity.

**Wrong-path feedback:** Storage volume alone is not the whole release constraint.

**State/output:** mixed plan authorized.

## Mission outcome

Mission decision: Use the mixed turbine-and-gate plan. Turbines clear `3.60 million m^3`. And the gate clears the remaining `1.68 million m^3` with warning and restart capacity protected. The plan fits downstream limits. The wall must now show it can carry the changing head.

### Post-mission metric screen - exact player copy

TARGET `19:00`; auto `DOWNSTREAM +5`; canonical `85/76/76/85` -> `85/81/76/85`, award 12, allocate 7 Storage, 5 Downstream -> `92/86/76/85`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 9 - The Seepage Ledger Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 7 SHIFTS UNTIL THE STORM  
**Card title:** The Silent Heads  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the uplift wall.  
**Card body:** The mixed release clears enough water, but two foundation pressure gauges are silent before the wall takes a changing load. A slope field shows possible pressure paths, and Euler's method advances one path from measured data. At the uplift wall and gate board, reconstruct the missing trend and test the load. By the end of the mission, decide whether controlled release tests may continue.  
**Objective:** Reconstruct uplift pressure and authorize or stop testing.

### Worth knowing first - exact player copy
#### Glossary terms

Slope field: short segments showing a differential equation's slope at many points.

Equilibrium solution: a constant solution where slope is zero.

Euler's method: repeated tangent-line steps.

#### Primer concepts

 a solution curve follows field slopes; smaller steps usually reduce Euler error; each new estimate becomes the next starting point.  
#### Equations first needed today
**Equation:** `y_(n+1)=y_n+f(x_n,y_n)Delta x`

**What it is for:** approximating a differential-equation solution.

**Symbols:** `f` slope and `Delta x` step.

**Why this campaign needs it:** missing pressure readings must be estimated between live gauges.## Main story happening - designer summary

Euler reconstruction and independent channels show that two silent heads share a failed cable.

## Learning and dramatic intent

Teach slope fields, Euler steps, numerical control, and evidence independence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Seepage & Uplift Bay | `uplift-wall` | automatic**

**World state:** Arrival Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with read the pressure field. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 2 - After Stop 33 | `uplift-wall` | automatic**

**World state:** After 9.2 Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Use the Stop 33 result to settle step through the gap."

**Unlocks/waypoint:** Unlock Stop 34 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 3 - After Stop 34 | `transect-rack` | automatic**

**World state:** Travel Location: STRUCT->GATES.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Arun Mehta: "Use the Stop 34 result to settle test step-size sensitivity."

**Unlocks/waypoint:** Unlock Stop 35 at `transect-rack` in Seepage & Uplift Bay.

**Beat 4 - After Stop 35 | `uplift-wall` | automatic**

**World state:** The test step-size sensitivity result remains visible while the diagnose silence fixture lights.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Arun Mehta: "Use the Stop 35 result to settle diagnose silence."

**Unlocks/waypoint:** Unlock Stop 36 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `uplift-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STRUCT to GATES; STRUCT supplies missing field, GATES provides independent load simulation and dependency panel.

## Characters and dramatic beat

Arun treats silence as danger until independent evidence narrows its cause.

## Key concepts, explained here

slope fields, equilibrium, Euler recursion and step size, shared versus independent channels.

## Stop 33 - Read the pressure field

**Format/placement:** PROBE, at `uplift-wall`.

**Metadata:** Concept: slope fields/equilibrium; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** Live surrounding gauges must show whether pressure trends toward or away from safety.

**Question card story setup - exact player copy:** Uplift obeys `dP/dh=0.4(8-P)` in scaled units. Probe field points at `P=4,8,10` and identify slope direction, equilibrium, and whether pressure is driven toward `P=8`, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Field direction can bound the silent readings before exact solving.

**Question card prompt - exact player copy:** Probe stations A, B, and C in order. At A compare reading +1.6 pressure/m with expected $0.4(8-4)=+1.6$; at B compare 0 with expected $0.4(8-8)=0$; at C compare -0.8 with expected $0.4(8-10)=-0.8$. Submit whether any station breaks the pattern, the numerical equilibrium pressure, and the direction of change on each side.

**Complete format-specific interaction block:** `probe:{load_sequence:["A","B","C","D"],stations:[{id:"A",load:{P:4,unit:"pressure"},reading:{slope:1.6,unit:"pressure/m"},expected:{slope:1.6,unit:"pressure/m"},comparison:"matches positive approach"},{id:"B",load:{P:8,unit:"pressure"},reading:{slope:0,unit:"pressure/m"},expected:{slope:0,unit:"pressure/m"},comparison:"matches equilibrium"},{id:"C",load:{P:10,unit:"pressure"},reading:{slope:-0.8,unit:"pressure/m"},expected:{slope:-0.8,unit:"pressure/m"},comparison:"matches negative return"},{id:"D",load:{P:12,unit:"pressure"},reading:{slope:-1.6,unit:"pressure/m"},expected:{slope:-1.6,unit:"pressure/m"},comparison:"matches stronger return"}],required:["A","B","C","D"],correct_break:"none",equilibrium:8,answerText:"All four readings match dP/dh=0.4(8-P); slopes point toward equilibrium P=8."}`

**Correct result:** toward `8`; equilibrium `P=8`.

**Answer text:** The completed check shows toward 8; equilibrium P=8.

**Why:** toward `8`; equilibrium `P=8`. Field direction can bound the silent readings before exact solving.

**Wrong-path feedback:** Horizontal segments mean zero slope, not zero pressure.

**State/output:** field lit; unlock 9.2.

## Stop 34 - Step through the gap

**Format/placement:** DERIVE, at `uplift-wall`.

**Metadata:** Concept: Euler method; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: PRACTICE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The two missing readings need reproducible estimates from the last live value.

**Question card story setup - exact player copy:** The last live value is `P(0)=4.0`, and `dP/dh=0.4(8-P)`. Use Euler steps of `0.5 m` twice to estimate `P(1.0)` before the next safe decision.

**Question card story-science connection - exact player copy:** A stepwise prediction can be compared with independent seepage evidence.

**Question card prompt - exact player copy:** Build both Euler updates and submit `P(1.0)` in scaled pressure units.

**Complete format-specific interaction block:** `derive:{goal:"P(1.0)",givens:["P0=4","f=0.4(8-P)","Delta h=.5"],lines:[{expressions:["P1=4+0.4(8-4)(0.5)=4.8","P1=5.6"],correct:"P1=4+0.4(8-4)(0.5)=4.8",rules:["Euler update","full derivative step"],correct_rule:"Euler update"},{expressions:["P2=4.8+0.4(8-4.8)(0.5)=5.44","P2=5.6"],correct:"P2=4.8+0.4(8-4.8)(0.5)=5.44",rules:["update slope at new point","reuse old slope"],correct_rule:"update slope at new point"}],answerText:"Euler gives P(1.0)=5.44."}`

**Correct result:** `5.44`, tolerance `.001`.

**Answer text:** Euler gives P(1.0)=5.44.

**Why:** Euler gives P(1.0)=5.44. A stepwise prediction can be compared with independent seepage evidence.

**Wrong-path feedback:** Recalculate slope after each step.

**State/output:** missing points penciled; waypoint GATES.

## Stop 35 - Test step-size sensitivity

**Format/placement:** CONTROL, at `transect-rack`.

**Metadata:** Concept: Euler error/control; Keystone: Approximation; Area: Seepage & Uplift Bay; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the transect rack, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The estimate must survive a smaller numerical step before loading the gate.

**Question card story setup - exact player copy:** Because two coarse Euler steps give `5.44`, rerun with `Delta h=0.25 m` while the same equation and initial value remain fixed. Compare the estimate, restore `0.50`, and state the step-size effect, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Changing only step size tests numerical approximation rather than wall behavior.

**Question card prompt - exact player copy:** Choose `step size` from candidate controls `step size`, `initial value`, and `equation`. Measure the Euler estimate at 0.50 m, change only step size to 0.25 m while the equation and initial value stay fixed, measure after the same interval, restore 0.50 m and remeasure, then submit the numerical change and conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"step"},{id:"initial"},{id:"equation"}],correct_control:"step",baseline:.5,response:.25,noise_band:.005,measurements:[5.44,5.3756,5.44],restore:true,correct_conclusion:"smaller step lowers estimate by .0644; result remains near 5.4"}`

**Correct result:** as stated.

**Answer text:** The completed check shows as stated.

**Why:** as stated. Changing only step size tests numerical approximation rather than wall behavior.

**Wrong-path feedback:** A valid control changes one input and reverses it.

**State/output:** uncertainty band; unlock 9.4.

## Stop 36 - Diagnose silence

**Format/placement:** TRACE, at `uplift-wall`.

**Metadata:** Concept: dependency/independent evidence; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The crew must distinguish wall danger from a shared instrument failure.

**Question card story setup - exact player copy:** Euler predictions agree with live weirs, while two piezometers remain blank. Open each channel's dependencies and decide whether agreement is independent or whether a shared cable explains the silence, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Quiet independent evidence can rule out wall failure even when two displays agree by failing together.

**Question card prompt - exact player copy:** Open the dependency record for all four channels, then submit the shared upstream cause and the conclusion `continue controlled tests` or `stop controlled tests`.

**Complete format-specific interaction block:** `trace:{channels:[{id:"pressure_1",label:"pressure channel 1",reading:"blank",dependency:"junction cable J4",target_dependent:true},{id:"pressure_2",label:"pressure channel 2",reading:"blank",dependency:"junction cable J4",target_dependent:true},{id:"weir",label:"manual weir scale",reading:5.39,dependency:"manual scale",independent:true},{id:"uplift_3",label:"uplift channel 3",reading:5.42,dependency:"junction cable J7",independent:true}],shared_upstream:"junction cable J4",correct_conclusion:"J4 cable failure; controlled tests may continue",answerText:"The two blank pressure channels share J4, while independent weir and uplift readings remain live; diagnose a J4 cable failure."}`

**Correct result:** shared cable J4.

**Answer text:** The completed check shows shared cable J4.

**Why:** shared cable J4. Quiet independent evidence can rule out wall failure even when two displays agree by failing together.

**Wrong-path feedback:** A wall-failure claim conflicts with the two independent live readings; the two blanks share J4 and therefore are not independent evidence.

**State/output:** crate replaced by live heads on Day 9.

## Mission outcome

Mission decision: Continue controlled release tests. Euler estimates agree with independent live readings. And the two silent gauges share one failed cable. The crew replaces that cable. And bounds the uplift load.

### Post-mission metric screen - exact player copy

TARGET `18:00`; auto `INTEGRITY +6 | RESERVE -3`; canonical `92/86/76/85` -> `92/86/73/91`, award 12, allocate 9 Integrity, 3 Reserve -> `92/86/76/100`; Integrity not yet locked.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 10 - The Error Carried Into Volume

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 6 SHIFTS UNTIL THE STORM  
**Card title:** Settle or Grow  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the weir bench.  
**Card body:** The silent gauges were a cable fault, but the wall still needs a model for seepage under sustained head. Separable differential equations distinguish bounded decay, exponential growth, and approach to equilibrium. At the weirs and storage board, solve candidate models and compare their predictions. By the end of the mission, decide whether the wall's carrying limit can be approved.  
**Objective:** Select the seepage model and approve or reject the load limit.

### Worth knowing first - exact player copy
#### Glossary terms

Differential equation: an equation involving a function and its rate.

Initial condition: one known point selecting a particular solution.

Carrying capacity: limiting level in a logistic model.

#### Primer concepts

 separate `y` and `x` factors; integrate both sides; use the initial condition to find `C`; exponential sign controls growth or decay.  
#### Equations first needed today
**Equation:** `dy/dt=ky`, `y=Ae^(kt)`

**What it is for:** growth or decay proportional to amount.

**Symbols:** `k` rate constant.

**Why this campaign needs it:** seepage may decay after a gate change.

**Equation:** `dy/dt=ky(L-y)`

**What it is for:** bounded logistic change.

**Symbols:** `L` limiting level.

**Why this campaign needs it:** soil drainage can approach a stable ceiling.## Main story happening - designer summary

A separable exponential model predicts bounded seepage and survives worst-case stress.

## Learning and dramatic intent

Distinguish standard differential models through equilibrium and mechanism.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Seepage & Uplift Bay | `weir-bench` | automatic**

**World state:** Arrival Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with separate the seepage equation. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `weir-bench` in Seepage & Uplift Bay.

**Beat 2 - After Stop 37 | `weir-bench` | automatic**

**World state:** After 10.2 Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Use the Stop 37 result to settle select the model."

**Unlocks/waypoint:** Unlock Stop 38 at `weir-bench` in Seepage & Uplift Bay.

**Beat 3 - After Stop 38 | `drain-console` | automatic**

**World state:** Travel Location: STRUCT->STORE.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Arun Mehta: "Use the Stop 38 result to settle transfer to cooling."

**Unlocks/waypoint:** Unlock Stop 39 at `drain-console` in Seepage & Uplift Bay.

**Beat 4 - After Stop 39 | `uplift-wall` | automatic**

**World state:** The transfer to cooling result remains visible while the approve the carrying limit fixture lights.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Arun Mehta: "Use the Stop 39 result to settle approve the carrying limit."

**Unlocks/waypoint:** Unlock Stop 40 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `weir-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STRUCT to STORE; second system provides transfer evidence unavailable at seepage bench.

## Characters and dramatic beat

Arun moves from suspicion to approval only after parameter stress.

## Key concepts, explained here

separation, `ln|y|`, initial condition, exponential/logistic/Newton models, equilibrium, parameter stress.

## Stop 37 - Separate the seepage equation

**Format/placement:** DERIVE, at `weir-bench`.

**Metadata:** Concept: separation/initial condition; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: INTRODUCE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the weir bench, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The crew needs an explicit seepage curve before holding the test load.

**Question card story setup - exact player copy:** Excess seepage `S` follows `dS/dt=-0.30S` per hour with `S(0)=12 L/min`. Separate variables, integrate, and use the initial condition to predict the excess after `4 h`, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A negative constant should produce measured decay rather than hidden growth.

**Question card prompt - exact player copy:** Build the general and particular solutions; submit `S(4)` in litres per minute.

**Complete format-specific interaction block:** `derive:{goal:"S(4)",givens:["S'=-.30S","S(0)=12"],lines:[{expressions:["dS/S=-.30dt","S dS=-.30dt"],correct:"dS/S=-.30dt",rules:["separate variables","multiply same side"],correct_rule:"separate variables"},{expressions:["ln|S|=-.30t+C","S^2/2=-.30t"],correct:"ln|S|=-.30t+C",rules:["integral of 1/S","power rule with n=1"],correct_rule:"integral of 1/S"},{expressions:["S=12e^(-.30t)","S=e^(-.30t)+12"],correct:"S=12e^(-.30t)",rules:["use initial condition","add initial value"],correct_rule:"use initial condition"},{expressions:["3.614 L/min","8.4 L/min"],correct:"3.614 L/min",rules:["evaluate t=4","linear decay"],correct_rule:"evaluate t=4"}],answerText:"S(4)=12e^-1.2=3.614 L/min."}`

**Correct result:** `3.614`, tolerance `.005`.

**Answer text:** S(4)=12e^-1.2=3.614 L/min.

**Why:** S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Wrong-path feedback:** Proportional decay is exponential, not linear.

**State/output:** decay curve; unlock 10.2.

## Stop 38 - Select the model

**Format/placement:** DIAGNOSIS, at `weir-bench`.

**Metadata:** Concept: exponential/logistic/Newton models; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: PRACTICE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the weir bench, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** Quiet values must distinguish decay from bounded growth and cooling.

**Question card story setup - exact player copy:** The measured excess is `12.0, 8.9, 6.6, 4.9, 3.6 L/min` at hours `0-4`. Compare candidate mechanisms, including their equilibrium behavior, and choose the one fitting every reading, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The correct mechanism determines whether continued head makes the wall safer or worse.

**Question card prompt - exact player copy:** Compare all four candidate differential equations with every displayed reading in `L/min`, then submit exactly one model label.

**Complete format-specific interaction block:** `diagnosis:{headline:"seepage model",readings:[{zone:"t0",value:12},{zone:"t1",value:8.9},{zone:"t2",value:6.6},{zone:"t4",value:3.6}],choices:[{label:"S'= -0.30S",mechanism:"exponential decay to 0"},{label:"S'=0.30S",mechanism:"unbounded growth"},{label:"S'=0.03S(20-S)",mechanism:"logistic toward 20"},{label:"S'=-.3(S-5)",mechanism:"Newton-type approach to 5"}],answer:"S'= -0.30S"}`

**Correct result:** decay.

**Answer text:** ratios are near `e^-0.3`; values approach zero.

**Why:** ratios are near `e^-0.3`; values approach zero. The correct mechanism determines whether continued head makes the wall safer or worse.

**Wrong-path feedback:** Model choice uses direction and equilibrium, not one point.

**State/output:** travel STORE.

## Stop 39 - Transfer to cooling

**Format/placement:** CONTROL, at `drain-console`.

**Metadata:** Concept: Newton cooling; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: TRANSFER; Difficulty: L4; Story role: check.

**Call - exact player copy:** Go to the drain console, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** A second system tests whether the crew can recognize approach to a nonzero environment.

**Question card story setup - exact player copy:** Because seepage approaches zero, compare a sensor at `70 C` cooling toward a `20 C` room. Change only room temperature to `25 C`, hold the cooling constant fixed, then restore and compare limits.

**Question card story-science connection - exact player copy:** A nonzero equilibrium separates Newton cooling from simple decay.

**Question card prompt - exact player copy:** Choose `ambient temperature` from candidate controls `ambient temperature`, `cooling constant`, and `initial temperature`. Measure the limiting temperature at 20 C, change only ambient temperature to 25 C while the cooling constant and initial temperature remain fixed, measure the new limit, restore 20 C and remeasure, then submit the causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"ambient"},{id:"k"},{id:"initial"}],correct_control:"ambient",baseline:20,response:25,noise_band:.2,measurements:[20,25,20],restore:true,correct_conclusion:"ambient sets equilibrium"}`

**Correct result:** ambient sets limit.

**Answer text:** The completed check shows ambient sets limit.

**Why:** ambient sets limit. A nonzero equilibrium separates Newton cooling from simple decay.

**Wrong-path feedback:** Newton's law uses temperature difference `T-Ta`.

**State/output:** model legend; unlock 10.4.

## Stop 40 - Approve the carrying limit

**Format/placement:** STRESS, asked by Arun Mehta beside `uplift-wall`.

**Metadata:** Concept: logistic stability/parameter uncertainty; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Arun Mehta, at the uplift wall in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The wall limit must survive reasonable uncertainty in the decay constant.

**Question card story setup - exact player copy:** The observed decay constant is `k=-0.30+-0.05 h^-1`, and approval requires excess seepage below `5.0 L/min` after `4 h`, inclusive. Stress the full interval before approving the load, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** A safety conclusion should survive the least favorable supported parameter.

**Question card prompt - exact player copy:** Sweep `k` from `-0.35` through `-0.25 h^-1` in `0.01 h^-1` steps using `S(4)=12e^(4k)`; submit the worst-case value in `L/min` and `approve/reject`.

**Complete format-specific interaction block:** `stress:{assumption:{label:"k",min:-.35,max:-.25,step:.01},candidates:[{id:"approve",condition:"12e^(4k)<=5"},{id:"reject",condition:"otherwise"}],correct:"approve",worst_case:{k:-.25,value:4.415}}`

**Correct result:** approve; worst `12e^-1=4.415`.

**Answer text:** even slowest supported decay stays below 5.

**Why:** even slowest supported decay stays below 5. A safety conclusion should survive the least favorable supported parameter.

**Wrong-path feedback:** Test the least negative `k`, which decays slowest.

**State/output:** carrying limit signed.

## Mission outcome

Mission decision: Approve the wall seepage limit. The extra flow falls with time. It stays below 5.0 litres per minute in every sound case. The wall check passes. A new lake survey now tests the storage chart.

### Post-mission metric screen - exact player copy

TARGET `18:00`; auto `INTEGRITY +5` clamped at 100; canonical `92/86/76/100`, award 12, allocate 8 Storage, 4 Reserve -> `100/86/80/100`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 11 - The Quiet-Day Check

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 5 SHIFTS UNTIL THE STORM  
**Card title:** The Reservoir Is Smaller  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the resurveyed curve.  
**Card body:** The wall can carry the planned load, but new transects show less stored volume at each level than the 2003 sheet reports. Area between curves measures lost capacity, while average value and related rates convert the loss into operations. At storage, structure, and gates, quantify the mismatch. By the end of the mission, decide whether to replace the official storage curve.  
**Objective:** Certify the old or resurveyed stage-storage curve.

### Worth knowing first - exact player copy
#### Glossary terms

Area between curves: integral of top minus bottom, split at crossings.

Average value: constant height with the same accumulated area.

Washer: cross-sectional disk with a hole.

#### Primer concepts

 find intersections before integrating; use absolute difference for geometric area; average value divides accumulation by interval length.  
#### Equations first needed today
**Equation:** `Area=integral_a^b |f-g|dx`; `f_avg=(1/(b-a))integral_a^b f dx`

**What it is for:** curve difference and representative mean.

**Symbols:** `a,b` bounds.

**Why this campaign needs it:** silt loss and average capacity error alter the release target.## Main story happening - designer summary

Area between surveys quantifies silt loss; independent transects and a level-rate test replace the old curve.

## Learning and dramatic intent

Deliver Twist 2 through area, average value, attestation, and related rates.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `storage-board` | automatic**

**World state:** The integrate lost capacity fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 11: INTEGRATE LOST CAPACITY OPEN

**Dialogue bubbles -** Mara Vale: "Start with integrate lost capacity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 41 | `level-desk` | automatic**

**World state:** After 11.2 Location: STORE.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 41 result to settle compute average loss."

**Unlocks/waypoint:** Unlock Stop 42 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 42 | `survey-rack` | automatic**

**World state:** Travel1 Location: STORE->STRUCT.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 42 result to settle verify independent transects."

**Unlocks/waypoint:** Unlock Stop 43 at `survey-rack` in Storage & Level Board.

**Beat 4 - After Stop 43 | `level-desk` | automatic**

**World state:** Travel2 Location: STRUCT->GATES.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 43 result to settle convert volume loss to level rate."

**Unlocks/waypoint:** Unlock Stop 44 at `level-desk` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STORE -> STRUCT -> GATES; each site supplies respectively discrepancy, independent identity, and operational response.

## Characters and dramatic beat

Mara's trust in the old sheet yields to physical evidence; Arun verifies rather than merely agrees.

## Key concepts, explained here

area between curves, crossings, average value, independent records, related-rate conversion.

## Stop 41 - Integrate lost capacity

**Format/placement:** DERIVE, at `storage-board`.

**Metadata:** Concept: area between curves/crossings; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The curve gap must become a volume before the release target can change.

**Question card story setup - exact player copy:** Old minus new storage density is `d(h)=6-h` million cubic metres per metre for `2<=h<=5`, and the curves cross at `h=6`. Integrate the positive gap across the operating interval, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Area between the curves is storage capacity lost to silt.

**Question card prompt - exact player copy:** Derive `integral_2^5 (6-h)dh`; submit lost volume in million cubic metres.

**Complete format-specific interaction block:** `derive:{goal:"lost volume",givens:["d=6-h","2<=h<=5"],lines:[{expressions:["[6h-h^2/2]_2^5","[6-h^2]_2^5"],correct:"[6h-h^2/2]_2^5",rules:["FTC and power antiderivative","differentiate"],correct_rule:"FTC and power antiderivative"},{expressions:["7.5 million m^3","3 million m^3"],correct:"7.5 million m^3",rules:["evaluate upper minus lower","width only"],correct_rule:"evaluate upper minus lower"}],answerText:"Lost capacity is 7.5 million m^3."}`

**Correct result:** `7.5 million m^3`, tolerance `.01`.

**Answer text:** Lost capacity is 7.5 million m^3.

**Why:** Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.

**Wrong-path feedback:** Area between curves integrates the gap, not only its endpoint.

**State/output:** loss shaded; unlock 11.2.

## Stop 42 - Compute average loss

**Format/placement:** BALLPARK, at `level-desk`.

**Metadata:** Concept: average value/splitting; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: PRACTICE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** Operators need one representative error for quick level calls.

**Question card story setup - exact player copy:** With `7.5 million m^3` lost over a `3 m` operating interval, compute the average capacity error per metre. Then state why that average cannot replace the full curve near a crossing, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Average value summarizes total loss but not local sensitivity.

**Question card prompt - exact player copy:** Use `f_avg=(1/(5-2))(7.5 million m^3)`; submit one number in `million m^3/m`, then submit `summary only` or `replace full curve`.

**Complete format-specific interaction block:** `estimate:{labels:["lost volume","height interval"],values:[[7.5],[3]],slots:2,template:"loss/interval",formula:"7.5/3",correct:[7.5,3],target:2.5,tolerance:.01}`

**Correct result:** `2.5 million m^3/m`.

**Answer text:** average preserves the integral but not pointwise change.

**Why:** average preserves the integral but not pointwise change. Average value summarizes total loss but not local sensitivity.

**Wrong-path feedback:** Divide by interval length `b-a`.

**State/output:** quick-call note; waypoint STRUCT.

## Stop 43 - Verify independent transects

**Format/placement:** ATTEST, asked by Mara Vale beside `survey-rack`.

**Metadata:** Concept: evidence independence; Keystone: Approximation; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L5; Story role: verification.

**Call - exact player copy:** Talk to Mara Vale, at the survey rack in Storage & Level Board.

**Stop reason - exact player copy:** The official curve cannot be replaced from an unverified survey alone.

**Question card story setup - exact player copy:** Because the integrated loss is large, verify the resurvey's identity, timing, and physical control with a limit of three record checks. At least one independent depth record and one calibration record are required.

**Question card story-science connection - exact player copy:** Independent physical records decide whether curve disagreement is real or clerical.

**Question card prompt - exact player copy:** Spend the three-record verification limit, select exactly three claim IDs including transects and sonar calibration, and submit `survey physically backed` or `survey not physically backed`.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"transects",label:"11 GPS transects dated this week",backed:true,critical:true},{id:"sonar",label:"depth sonar calibration block",backed:true,critical:true},{id:"oldsheet",label:"2003 sheet copied correctly",backed:true},{id:"operator",label:"operator memory of silt",backed:false},{id:"shared",label:"same software export",backed:false}],critical_unbacked:"operator memory",correct_checks:["transects","sonar","oldsheet"]}`

**Correct result:** three backed records.

**Answer text:** independent transects and calibration support real silt loss.

**Why:** independent transects and calibration support real silt loss. Independent physical records decide whether curve disagreement is real or clerical.

**Wrong-path feedback:** A repeated export is not independent measurement.

**State/output:** resurvey certified; waypoint GATES.

## Stop 44 - Convert volume loss to level rate

**Format/placement:** VERIFY, at `level-desk`.

**Metadata:** Concept: related rates; Keystone: Motion/rates+applied integrals; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** Gate operators need the corrected level fall per hour.

**Question card story setup - exact player copy:** The resurvey gives `dV/dh=2.0 million m3/m`, while net outflow is `0.50 million m3/h`. Predict the falling level rate, then verify it against the float gauge.

**Question card story-science connection - exact player copy:** The new derivative converts the same release into a faster level change than the old curve predicted.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $dh/dt=(dV/dt)/(dV/dh)$ with $dV/dt=-0.50$ million m^3/h and $dV/dh=2.0$ million m^3/m; submit $dh/dt$ in m/h before simulation unlocks. **OPERATE:** Run one hour with inflow and gate fixed. **MEASURE:** Record level change and volume change. **INTERPRET:** Submit whether to replace the old curve; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:-.25,unit:"m/h",tolerance:.005},equipment_locked_until_prediction_commit:true,operation:"one-hour simulation",fixed:["inflow","gate"],measurements:["-0.248 m","-0.50 million m^3"],restore:false,correct_conclusion:"replace old curve"}`

**Correct result:** `-.25 m/h`; replace.

**Answer text:** `-.50/2=-.25`; measurement agrees.

**Why:** `-.50/2=-.25`; measurement agrees. The new derivative converts the same release into a faster level change than the old curve predicted.

**Wrong-path feedback:** Keep the negative sign for falling level.

**State/output:** old sheet removed, resurvey pinned.

## Mission outcome

Mission decision: Replace the 2003 storage curve. New surveys show 7.5 million cubic metres of lost space. The new rate also matches the level drop. The old plan claimed too much room. Rebuild the release plan.

### Post-mission metric screen - exact player copy

TARGET `19:00`; auto `STORAGE -10 | INTEGRITY -4`; canonical `100/86/80/100` -> `90/86/80/96`, award 12, allocate 10 Storage, 2 Integrity -> `100/86/80/98`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 12 - The Decay Constant, Scored

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 4 SHIFTS UNTIL THE STORM  
**Card title:** What the Steel Can Do  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the crated runner.  
**Card body:** The corrected storage curve removes the old safety margin, and one turbine runner is still out of service. Volumes of revolution model cleared passages, while work integrals measure the energy needed to lift water and move the gate. At power, gates, and storage, calculate physical capacity and effort. By the end of the mission, choose a mechanically feasible release schedule.  
**Objective:** Fit the corrected release inside machine and hoist limits.

### Worth knowing first - exact player copy
#### Glossary terms

Disk: circular cross-section with no hole.

Washer: circular cross-section with an inner hole.

Shell: thin cylindrical layer.

Work: accumulated force through distance.

#### Primer concepts

 choose cross-sections perpendicular to the rotation axis for disks/washers; shells are parallel; work integrates changing force.  
#### Equations first needed today
**Equation:** `V=pi integral(R^2-r^2)dx`; `V=2pi integral(radius)(height)dx`

**What it is for:** volumes by washers or shells.

**Symbols:** `R,r` radii and `x` slice position.

**Why this campaign needs it:** passage volume determines usable water per gate motion.

**Equation:** `W=integral F(x)dx`; for a spring `F=kx`

**What it is for:** energy under changing force.

**Symbols:** `W` work, `F` force, `x` distance, `k` stiffness.

**Why this campaign needs it:** the hoist must complete the scheduled motion.## Main story happening - designer summary

Rotational volume removes unavailable turbine capacity; a work test bounds repeatable gate motion.

## Learning and dramatic intent

Make volume methods and work integrals decide a physical schedule.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `runner-crate` | automatic**

**World state:** The compute the missing runner volume fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 12: COMPUTE THE MISSING RUNNER VOLUME OPEN

**Dialogue bubbles -** Nia Chen: "Start with compute the missing runner volume. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `runner-crate` in Powerhouse.

**Beat 2 - After Stop 45 | `runner-crate` | automatic**

**World state:** Travel1 Location: POWER->GATES.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 45 result to settle compare the shell setup."

**Unlocks/waypoint:** Unlock Stop 46 at `runner-crate` in Powerhouse.

**Beat 3 - After Stop 46 | `work-meter` | automatic**

**World state:** After 12.3 Location: GATES.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 46 result to settle measure hoist work."

**Unlocks/waypoint:** Unlock Stop 47 at `work-meter` in Powerhouse.

**Beat 4 - After Stop 47 | `dispatch-console` | automatic**

**World state:** Travel2 Location: GATES->STORE.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Nia Chen: "Use the Stop 47 result to settle choose feasible schedule."

**Unlocks/waypoint:** Unlock Stop 48 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `runner-crate` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

POWER -> GATES -> STORE; missing runner, hoist capacity, and final storage feasibility are owned separately.

## Characters and dramatic beat

Nia accepts lost output; Wilkes accepts only a return-tested stroke.

## Key concepts, explained here

disk/washer, shell setup, work as force integral, Hooke force, evidence value.

## Stop 45 - Compute the missing runner volume

**Format/placement:** DERIVE, at `runner-crate`.

**Metadata:** Concept: disk/washer volume; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the runner crate, in Powerhouse.

**Stop reason - exact player copy:** The unavailable runner's capacity must be removed from the release plan.

**Question card story setup - exact player copy:** The runner passage is generated by rotating outer radius `R(x)=2 m` and inner radius `r(x)=x/2 m` for `0<=x<=2 m`. Use washers to compute its water volume, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Passage volume quantifies the turbine capacity the revised schedule has lost.

**Question card prompt - exact player copy:** Derive `V=pi integral_0^2 [R^2-r^2]dx`; submit cubic metres.

**Complete format-specific interaction block:** `derive:{goal:"runner volume",givens:["R=2","r=x/2","0<=x<=2"],lines:[{expressions:["pi integral_0^2(4-x^2/4)dx","2pi integral_0^2 x(2-x/2)dx"],correct:"pi integral_0^2(4-x^2/4)dx",rules:["washer method","shell method with wrong geometry"],correct_rule:"washer method"},{expressions:["pi[4x-x^3/12]_0^2","pi[4x-x^2/8]_0^2"],correct:"pi[4x-x^3/12]_0^2",rules:["power antiderivative","differentiate radius"],correct_rule:"power antiderivative"},{expressions:["22pi/3 m^3","8pi m^3"],correct:"22pi/3 m^3",rules:["evaluate bounds","outer cylinder only"],correct_rule:"evaluate bounds"}],answerText:"Runner passage volume is 22pi/3 = 23.038 m^3."}`

**Correct result:** `23.038 m^3`, tolerance `.01`.

**Answer text:** Runner passage volume is 22pi/3 = 23.038 m^3.

**Why:** Runner passage volume is 22pi/3 = 23.038 m^3. Passage volume quantifies the turbine capacity the revised schedule has lost.

**Wrong-path feedback:** A washer subtracts the inner squared radius.

**State/output:** runner capacity removed; waypoint GATES.

## Stop 46 - Compare the shell setup

**Format/placement:** CHOICE, asked by Nia Chen beside `runner-crate`.

**Metadata:** Concept: shell versus washer; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: PRACTICE; Difficulty: L3; Story role: check.

**Call - exact player copy:** Talk to Nia Chen, at the runner crate in Powerhouse.

**Stop reason - exact player copy:** A second geometry needs the simpler valid setup before fabrication.

**Question card story setup - exact player copy:** Because washers quantify the runner, a cylindrical gate recess formed by rotating `y=3-x` about the `y`-axis for `0<=x<=3` now needs a setup. Choose shells or washers and justify the bounds.

**Question card story-science connection - exact player copy:** The correct slice orientation prevents a costly geometry error.

**Question card prompt - exact player copy:** Select exactly one of four integral setups and submit its complete expression in cubic-metre units.

**Choices:**

1. $2\pi\int_0^3 x(3-x)\,dx=9\pi$ m^3. **(correct)**

2. $\pi\int_0^3 x^2(3-x)\,dx$ m^3.

3. $2\pi\int_0^3 (3-x)\,dx$ m^3.

4. $2\pi\int_0^3 x(3-x)^2\,dx$ m^3.

**Complete format-specific interaction block:** `question:"Which setup correctly uses shells about the y-axis?"; choices:["2pi integral_0^3 x(3-x)dx","pi integral_0^3(3-x)^2dx","2pi integral_0^3(3-x)x^2dx","pi integral_0^3 x(3-x)dx"]; answer:"2pi integral_0^3 x(3-x)dx"; why:"Shell radius is x, height is 3-x, and circumference is 2pi x."; rebuttals:{"pi integral_0^3(3-x)^2dx":"This disk-style expression omits shell circumference 2pi times radius x.","2pi integral_0^3(3-x)x^2dx":"Shell volume uses radius x, not squared radius x^2.","pi integral_0^3 x(3-x)dx":"This is missing the factor 2 from shell circumference."}`

**Correct result:** `2pi integral_0^3 x(3-x)dx=9pi m^3`.

**Answer text:** The completed check shows 2pi integral_0^3 x(3-x)dx=9pi m^3.

**Why:** `2pi integral_0^3 x(3-x)dx=9pi m^3`. The correct slice orientation prevents a costly geometry error.

**Wrong-path feedback:** (2) **Disk-style extra radius:** Shell volume uses circumference times height times thickness, not $\pi x^2$ times height. (3) **Missing radius:** The circumference factor is $2\pi x$, so dropping $x$ removes the shell radius. (4) **Squared height:** Shell height is $3-x$; squaring it has no geometric basis.

**State/output:** fabrication setup approved; unlock 12.3.

## Stop 47 - Measure hoist work

**Format/placement:** VERIFY, at `work-meter`.

**Metadata:** Concept: work/Hooke law; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the work meter, in Powerhouse.

**Stop reason - exact player copy:** The gate schedule cannot exceed the hoist energy reserve.

**Question card story setup - exact player copy:** The seal acts like a spring with campaign test stiffness `k=8000 N/m` over `0.30 m`, plus constant `1200 N` friction. Predict total work, then operate one reversible test, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Integrated force determines whether the gate can repeat its planned stroke.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $W=\tfrac12kx^2+F_fx$ with $k=8,000$ N/m, $x=0.30$ m, and $F_f=1,200$ N; submit joules before the hoist unlocks. **OPERATE:** Run a 0.30 m stroke and return with head and voltage fixed. **MEASURE:** Record work and residual displacement. **INTERPRET:** Restore the start position and submit PASS or FAIL.

**Complete format-specific interaction block:** `verify:{prediction:{target:720,unit:"J",tolerance:5},equipment_locked_until_prediction_commit:true,operation:"0.30 m stroke and return",fixed:["head","voltage"],measurements:["724 J","0.002 m residual"],restore:true,correct_conclusion:"passes"}`

**Correct result:** `.5*8000*.09+1200*.3=720 J`; pass.

**Answer text:** The completed check shows .5*8000*.09+1200*.3=720 J; pass.

**Why:** `.5*8000*.09+1200*.3=720 J`; pass. Integrated force determines whether the gate can repeat its planned stroke.

**Wrong-path feedback:** Work under a changing force is area, not final force times distance.

**State/output:** hoist certified; waypoint STORE.

## Stop 48 - Choose feasible schedule

**Format/placement:** VALUE, asked by Nia Chen beside `dispatch-console`.

**Metadata:** Concept: integrated capacity/work decision; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Nia Chen, at the dispatch console in Powerhouse.

**Stop reason - exact player copy:** Only evidence that can change release feasibility deserves the last inspection budget.

**Question card story setup - exact player copy:** Runner capacity is unavailable and the hoist passes one stroke, but three candidate schedules remain. Spend `6` inspection points on evidence that can distinguish repeatable gate work, storage clearance, and downstream safety.

**Question card story-science connection - exact player copy:** The chosen evidence must test every binding constraint, not merely improve precision on a nonbinding one.

**Question card prompt - exact player copy:** Spend exactly `6` inspection points and submit the selected evidence IDs; the plan must test repeatability, corrected storage clearance, and downstream arrival.

**Complete format-specific interaction block:** `value:{budget:6,options:[{id:"repeat",label:"second hoist stroke",cost:2,required:true},{id:"storage",label:"corrected volume simulation",cost:2,required:true},{id:"arrival",label:"downstream arrival check",cost:2,required:true},{id:"paint",label:"runner paint inspection",cost:2},{id:"revenue",label:"power-price update",cost:1}],required:["repeat","storage","arrival"],answerText:"Spend 2+2+2 on repeatability, storage, and arrival."}`

**Correct result:** repeat/storage/arrival.

**Answer text:** Spend 2+2+2 on repeatability, storage, and arrival.

**Why:** Spend 2+2+2 on repeatability, storage, and arrival. The chosen evidence must test every binding constraint, not merely improve precision on a nonbinding one.

**Wrong-path feedback:** Paint condition and power price do not test a binding release constraint; omitting repeatability, storage, or arrival leaves the schedule uncertified.

**State/output:** feasible schedule selected.

## Mission outcome

Mission decision: Use one runner and move each gate in stages. The blocked runner no longer counts. Each gate move stays below 750 joules. The storage test still passes. Now test if measurement error can change the result.

### Post-mission metric screen - exact player copy

TARGET `19:00`; auto `RESERVE +7`; canonical `100/86/80/98` -> `100/86/87/98`, award 12, allocate 10 Downstream, 2 Integrity -> `100/96/87/100`.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 13 - The Three-Before-Nine Order

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 3 SHIFTS UNTIL THE STORM  
**Card title:** Carry the Error Honestly  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the level desk.  
**Card body:** The staged schedule works in the corrected model, but level, storage, and flow measurements each carry uncertainty. Linear approximation and residual analysis reveal which error matters and whether several channels share one cause. At storage, structure, and inflow, propagate errors and test competing corrections. By the end of the mission, decide whether the corrected release rules are safe enough to sign.  
**Objective:** Certify the model across supported measurement error.

### Worth knowing first - exact player copy
#### Glossary terms

Linearization: tangent-line estimate of a nearby output.

Propagated error: output uncertainty caused by input uncertainty.

Degeneracy: two parameter choices fitting the same evidence.

#### Primer concepts

 approximate `Delta f` by `f'(a)Delta x`; patterned residuals can matter more than average size; independent constraints can break a degeneracy.  
#### Equations first needed today
**Equation:** `Delta f approximately f'(a)Delta x`

**What it is for:** carrying small input error into output.

**Symbols:** `Delta` means change and `f'(a)` local sensitivity.

**Why this campaign needs it:** level uncertainty becomes volume uncertainty.## Main story happening - designer summary

Propagated error, residual pattern, and an independent constraint certify the corrected model.

## Learning and dramatic intent

Teach uncertainty as structured sensitivity rather than vague caution.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `level-desk` | automatic**

**World state:** The linearize level error fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 13: LINEARIZE LEVEL ERROR OPEN

**Dialogue bubbles -** Mara Vale: "Start with linearize level error. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `level-desk` in Storage & Level Board.

**Beat 2 - After Stop 49 | `storage-board` | automatic**

**World state:** After 13.2 Location: STORE.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 49 result to settle refuse the lowest rms."

**Unlocks/waypoint:** Unlock Stop 50 at `storage-board` in Storage & Level Board.

**Beat 3 - After Stop 50 | `control-bench` | automatic**

**World state:** Travel1 Location: STORE->STRUCT.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 50 result to settle break the two-control degeneracy."

**Unlocks/waypoint:** Unlock Stop 51 at `control-bench` in Storage & Level Board.

**Beat 4 - After Stop 51 | `storage-board` | automatic**

**World state:** Travel2 Location: STRUCT->INFLOW.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Mara Vale: "Use the Stop 51 result to settle diagnose the signed rules."

**Unlocks/waypoint:** Unlock Stop 52 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `level-desk` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STORE -> STRUCT -> INFLOW; uncertainty originates in storage, independent geometry is structural, and forecast integration is at inflow.

## Characters and dramatic beat

Mara signs only after the player's independent parameter separation.

## Key concepts, explained here

linearization, propagated units, residual fields, numerical-method bias, degeneracy and physical constraints.

## Stop 49 - Linearize level error

**Format/placement:** PROPAGATE, at `level-desk`.

**Metadata:** Concept: linear approximation/error budget; Keystone: Approximation; Area: Forecast Archive; Learning role: RETRIEVE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The release margin must be compared with the largest carried measurement error.

**Question card story setup - exact player copy:** The corrected storage curve has `dV/dh=2.0 million m3/m`, and level uncertainty is `±0.015 m`. Propagate that error, then compare it with the `0.10 million m3` release margin.

**Question card story-science connection - exact player copy:** Only an error large enough to consume the margin can reverse authorization.

**Question card prompt - exact player copy:** Calculate `|Delta V| approximately |dV/dh||Delta h|` using `2.0 million m^3/m` and `0.015 m`; submit uncertainty in `million m^3`, compare it with the inclusive `0.10 million m^3` margin, then select one purchase ID.

**Complete format-specific interaction block:** `propagate:{budget:1,error_terms:[{id:"level",sigma:.015,sensitivity:2.0,output:.030},{id:"flow",sigma:.002,sensitivity:5,output:.010},{id:"clock",sigma:.001,sensitivity:4,output:.004}],purchase_options:[{id:"level",cost:1,reduction:.015},{id:"flow",cost:1,reduction:.003},{id:"clock",cost:1,reduction:.001}],correct_purchase:"level",threshold:.10}`

**Correct result:** `+-0.030 million m^3`; margin survives.

**Answer text:** `2.0*.015=.030<.10`; improve level.

**Why:** `2.0*.015=.030<.10`; improve level. Only an error large enough to consume the margin can reverse authorization.

**Wrong-path feedback:** Sensitivity carries units.

**State/output:** error bar; unlock 13.2.

## Stop 50 - Refuse the lowest RMS

**Format/placement:** RESIDUAL, at `storage-board`.

**Metadata:** Concept: approximation error/sum accuracy; Keystone: Approximation; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L4; Story role: clue payoff.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The chosen numerical method must not hide a directional storage bias.

**Question card story setup - exact player copy:** Because level error is tolerable, compare residuals from left, right, and trapezoidal accumulation against independent totals. Choose the method whose errors are small and unpatterned rather than blindly taking the lowest training RMS.

**Question card story-science connection - exact player copy:** A repeated sign would push every release decision in the same unsafe direction.

**Question card prompt - exact player copy:** Compare the three four-value residual arrays and their holdout residuals; submit one method ID and one conclusion about directional bias.

**Complete format-specific interaction block:** `residual:{fields:[{id:"left",residuals:[-.12,-.10,-.11,-.09],rms:.106},{id:"right",residuals:[.13,.09,.12,.10],rms:.111},{id:"trap",residuals:[.01,-.02,.00,.01],rms:.012}],holdout:{left:-.14,right:.15,trap:.01},correct:"trap"}`

**Correct result:** trapezoid.

**Answer text:** small alternating residuals survive holdout; left/right directional errors track changing curve.

**Why:** small alternating residuals survive holdout; left/right directional errors track changing curve. A repeated sign would push every release decision in the same unsafe direction.

**Wrong-path feedback:** Method accuracy depends on increase and concavity, not label.

**State/output:** trapezoid default; waypoint STRUCT.

## Stop 51 - Break the two-control degeneracy

**Format/placement:** DEGENERACY, at `control-bench`.

**Metadata:** Concept: sensitivity/systematics; Keystone: Approximation; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: reveal.

**Call - exact player copy:** Go to the control bench, in Storage & Level Board.

**Stop reason - exact player copy:** Level offset and storage scale still mimic the same total-volume correction.

**Question card story setup - exact player copy:** Trapezoidal accumulation is accepted, but storage totals can still be matched by a level offset `b` or scale factor `s`. Adjust both, then add independent uplift geometry to isolate the physical pair.

**Question card story-science connection - exact player copy:** A second physical constraint prevents two adjustable errors from sharing one apparent fix.

**Question card prompt - exact player copy:** Use the two controls `level offset b` in metres and unitless `storage scale s`. Adjust b from -0.05 to 0.05 in 0.01 steps and s from 0.90 to 1.10 in 0.01 steps; apply both loci, then submit the numeric pair (b,s) before choosing a correction plan.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:"b",label:"level offset",min:-.05,max:.05,step:.01},{id:"s",label:"storage scale",min:.90,max:1.10,step:.01}],tolerance:.011,first_locus:[[-.05,1.10],[-.03,1.06],[-.01,1.02],[.01,.98],[.03,.94],[.05,.90]],second_locus:[[-.02,.98],[-.01,1.00],[0,1.02],[.01,1.04]],physical_constraint:"independent uplift geometry requires b=-.01 m",truth_pair:[-.01,1.02],correct_plan:"use resurvey correction"}`

**Correct result:** `(-.01 m,1.02)`.

**Answer text:** volume alone is degenerate; uplift fixes offset.

**Why:** volume alone is degenerate; uplift fixes offset. A second physical constraint prevents two adjustable errors from sharing one apparent fix.

**Wrong-path feedback:** A good fit along one locus does not identify both controls.

**State/output:** Integrity lock eligible; waypoint INFLOW.

## Stop 52 - Diagnose the signed rules

**Format/placement:** DIAGNOSIS, at `storage-board`.

**Metadata:** Concept: cumulative calculus validity; Keystone: all keystones; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** Every correction must fit quiet as well as alarming evidence before signature.

**Question card story setup - exact player copy:** With offset and scale separated, review continuity, holdout crest, storage residuals, seepage decay, and gate reversal. Select the one release-rule set that fits every reading and preserves the downstream threshold.

**Question card story-science connection - exact player copy:** The signed rules must be one coherent model, not a collection of individually convenient results.

**Question card prompt - exact player copy:** Compare every candidate rule set with all five displayed readings, then submit exactly one rule-set label.

**Complete format-specific interaction block:** `diagnosis:{headline:"corrected release rules",readings:[{zone:"level",value:"continuous after one removable repair"},{zone:"inflow",value:"Forecast B passes holdout"},{zone:"storage",value:"resurvey pair (-.01,1.02)"},{zone:"wall",value:"decay below limit"},{zone:"gate",value:"reversal pass"}],choices:[{label:"B forecast + resurvey + staged gate",mechanism:"fits all"},{label:"A forecast + old sheet",mechanism:"misses crest and silt"},{label:"B + old sheet",mechanism:"wrong capacity"},{label:"B + resurvey + full gate",mechanism:"breaks warning/work limits"}],answer:"B forecast + resurvey + staged gate"}`

**Correct result:** first.

**Answer text:** all independent constraints align.

**Why:** all independent constraints align. The signed rules must be one coherent model, not a collection of individually convenient results.

**Wrong-path feedback:** The alternatives each conflict with at least one independent record: the holdout crest, resurveyed capacity, or verified work-and-warning limits.

**State/output:** corrected rules signed; Integrity locks at 100.

## Mission outcome

Mission decision: Sign the new release rules. Volume error stays below the safety margin. Model errors show no pattern. A separate survey breaks the last tie. Now test each valley warning line.

### Post-mission metric screen - exact player copy

TARGET `20:00`; auto `INTEGRITY +12` clamped and lock at 100; canonical `100/96/87/100`, award 12, allocate 4 Downstream, 8 Reserve -> `100/100/95/100`; Downstream is not locked yet.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 14 - The Lead-Time Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 2 SHIFTS UNTIL THE STORM  
**Card title:** Four Dark Sirens  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the siren repeater panel.  
**Card body:** The corrected release rules are signed, and the model meets storage, wall, and machine limits. A final warning test leaves four settlement circuits dark, so apparent readiness is not public safety. At warnings, inflow, and gates, optimize repair order and forecast the delay. By the end of the mission, decide whether every downstream reach is ready for release.  
**Objective:** Repair and certify the warning chain.

### Worth knowing first - exact player copy
#### Glossary terms

Constraint: a requirement a solution must satisfy.

Objective function: the quantity optimized.

Feasible point: a choice satisfying every constraint.

#### Primer concepts

 optimization requires candidates and endpoint checks; Euler can update a forecast after a delay; thresholds must be committed before results.  
#### Equations first needed today
**Equation:** `P'=R'-C'=0` at an interior optimum candidate

**What it is for:** finding a marginal balance.

**Symbols:** `P` net objective, `R` benefit, `C` cost.

**Why this campaign needs it:** repair time and warning coverage compete.## Main story happening - designer summary

Failed sirens turn apparent victory into an optimization and delayed-forecast problem, then all circuits pass.

## Learning and dramatic intent

Require calculus to repair a human readiness constraint before final release.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Downstream Warning Desk | `arrival-map` | automatic**

**World state:** The find the repair optimum fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 14: FIND THE REPAIR OPTIMUM OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with find the repair optimum. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 53 | `settlement-circuits` | automatic**

**World state:** After 14.2 Location: SAFE.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 53 result to settle order settlements by consequence."

**Unlocks/waypoint:** Unlock Stop 54 at `settlement-circuits` in Downstream Warning Desk.

**Beat 3 - After Stop 54 | `arrival-map` | automatic**

**World state:** Travel1 Location: SAFE->INFLOW.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 54 result to settle update the delayed forecast."

**Unlocks/waypoint:** Unlock Stop 55 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 55 | `radio-desk` | automatic**

**World state:** Travel2 Location: INFLOW->GATES.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Elise Baptiste: "Use the Stop 55 result to settle commit repaired warning trigger."

**Unlocks/waypoint:** Unlock Stop 56 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SAFE -> INFLOW -> GATES; warning failure creates forecast delay, which changes gate start.

## Characters and dramatic beat

Baptiste blocks release until the last circuit, while the other specialists accept the delay.

## Key concepts, explained here

constrained extrema and endpoints, deadline sorting, Euler step sensitivity, precommitted threshold.

## Stop 53 - Find the repair optimum

**Format/placement:** BALLPARK, at `arrival-map`.

**Metadata:** Concept: optimization/marginal value; Keystone: Extrema; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** Four circuits must be repaired before the shrinking release window closes.

**Question card story setup - exact player copy:** Repair benefit is `R(x)=18x-x^2` and coordination cost is `C(x)=2x+8`, where `x` crews can range from `0` to `6`. Find the integer crew count maximizing `P=R-C`, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The optimum sets the fastest useful repair without wasting scarce operators.

**Question card prompt - exact player copy:** Using `P(x)=(18x-x^2)-(2x+8)` for integer `0<=x<=6`, calculate `P'(x)`, check feasible critical points and endpoints, then submit one integer crew count.

**Complete format-specific interaction block:** `estimate:{labels:["solve P'=16-2x=0","check endpoints/integers"],values:[[8],[0,6]],slots:2,template:"feasible candidate",formula:"x=8 clipped then compare 0,6",correct:[8,6],target:6,tolerance:0}`

**Correct result:** `x=6` at endpoint; `P(6)=52`, versus `P(0)=-8`.

**Answer text:** unconstrained critical point 8 lies outside `[0,6]`, so endpoints control.

**Why:** unconstrained critical point 8 lies outside `[0,6]`, so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Wrong-path feedback:** A critical point outside the domain is not feasible.

**State/output:** six crews assigned; unlock 14.2.

## Stop 54 - Order settlements by consequence

**Format/placement:** TRIAGE, asked by Elise Baptiste beside `settlement-circuits`.

**Metadata:** Concept: constrained decision/extrema; Keystone: Extrema; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L5; Story role: consequence.

**Call - exact player copy:** Talk to Elise Baptiste, at the settlement circuits in Downstream Warning Desk.

**Stop reason - exact player copy:** Crew order must protect the earliest closure, not the loudest complaint.

**Question card story setup - exact player copy:** With six crews fixed, sort four dark circuits by arrival and closure: Road `280 min`, School `310`, Caravan `350`, Village `410`. Repairs take `35,25,20,30 min`, with two simultaneous teams, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Earliest binding deadlines determine a safe schedule.

**Question card prompt - exact player copy:** Select exactly one of four first-team pairs and submit its label.

**Complete format-specific interaction block:** `question:"Which two circuits receive the first teams?"; choices:["Road and School","Caravan and Village","Road and Village","School and Caravan"]; answer:"Road and School"; why:"Road and School have the two earliest binding deadlines."; rebuttals:{"Caravan and Village":"This leaves both earliest deadlines, 280 and 310 minutes, without first teams.","Road and Village":"The School deadline at 310 minutes binds before the Village deadline at 410 minutes.","School and Caravan":"The Road deadline at 280 minutes is the earliest and cannot wait."}`

**Correct result:** Road and School.

**Answer text:** The completed check shows road and School.

**Why:** Road and School. Earliest binding deadlines determine a safe schedule.

**Wrong-path feedback:** Any pair omitting Road or School delays one of the two earliest binding deadlines; the option-specific payload rebuttals identify the missed deadline.

**State/output:** repair route; waypoint INFLOW.

## Stop 55 - Update the delayed forecast

**Format/placement:** CONTROL, at `arrival-map`.

**Metadata:** Concept: Euler/logistic delay; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: RETRIEVE; Difficulty: L4; Story role: setback.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The repair delay changes starting level before release begins.

**Question card story setup - exact player copy:** Repairs delay release by `1.0 h`, so update `dH/dt=0.20(5-H)` from `H(0)=4.20 m`. Compare Euler steps of `1.0` and `0.5 h`, restoring the first setting before the safe decision.

**Question card story-science connection - exact player copy:** The delayed start must use a numerical forecast consistent with the same differential model.

**Question card prompt - exact player copy:** Choose `Euler step size` from candidate controls `step size`, `initial level`, and `rate constant`. Measure the delayed forecast with 1.0 h steps, change only the step to 0.5 h while $H(0)=4.20$ m and $dH/dt=0.20(5-H)$ remain fixed, remeasure at the same final time, restore 1.0 h and measure again, then submit the conservative level in metres and conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"step"},{id:"initial"},{id:"k"}],correct_control:"step",baseline:1,response:.5,noise_band:.005,measurements:[4.36,4.352,4.36],restore:true,correct_conclusion:"use conservative 4.36 m"}`

**Correct result:** `4.36 m`.

**Answer text:** The completed check shows 4.36 m.

**Why:** `4.36 m`. The delayed start must use a numerical forecast consistent with the same differential model.

**Wrong-path feedback:** Update slope after the first half-step.

**State/output:** revised gate start; waypoint GATES.

## Stop 56 - Commit repaired warning trigger

**Format/placement:** TRIGGER, at `radio-desk`.

**Metadata:** Concept: optimization/threshold synthesis; Keystone: all; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radio desk, in Downstream Warning Desk.

**Stop reason - exact player copy:** The gate needs a release threshold written before the repaired circuits report.

**Question card story setup - exact player copy:** Repairs finish in `65 min`, the minimum warning lead is `280 min`, and release begins no sooner than `360 min` from now. Commit the inclusive readiness slack before circuit results appear, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** Positive precommitted slack proves warnings finish before the last safe release time.

**Question card prompt - exact player copy:** Calculate and submit slack `360-280-65` in minutes; commit `READY if slack >=0 and all four circuits pass`, then reveal circuit results.

**Complete format-specific interaction block:** `trigger:{decision_rule:"READY iff slack>=0 and 4/4 circuits pass",scale:{min:-30,max:60,step:5,unit:"min"},anchors:[0,15,45],objective:"complete warning before required lead",direction:"at or above zero",consequence_limit:"no release with any dark circuit"}`; reveal `4/4 pass`.

**Correct result:** `15 min`; READY.

**Answer text:** `360-280-65=15>=0`, and every circuit passes.

**Why:** `360-280-65=15>=0`, and every circuit passes. Positive precommitted slack proves warnings finish before the last safe release time.

**Wrong-path feedback:** A negative slack or any dark circuit fails the committed rule; do not move the threshold after the four circuit results appear.

**State/output:** siren text `4/4 READY`; Downstream locks.

## Mission outcome

Mission decision: Every reach below the dam is ready. The repair order restores all four lines. It leaves 15 minutes before the warning deadline. The final release must still save enough power for the last gate move.

### Post-mission metric screen - exact player copy

TARGET `18:00`; auto `DOWNSTREAM +10` then visible failure `-8`, repair returns `+8` and locks at 100; canonical `100/100/95/100`, net clamped `100/100/95/100`, award 12, allocate 5 Reserve and bank 7 -> `100/100/100/100`, bank 7.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 15 - The Corrected Release Rules, Signed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** FINAL SHIFT - STORM EDGE ON THE RIDGE  
**Card title:** Open, Hold, Verify  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** Storage, warning, reserve, and wall checks all pass, but the last half-metre makes gate discharge sharply sensitive to head. The final action must combine limits, rates, accumulation, motion, differential models, and physical work without adding a new rule. Across inflow, storage, and gates, rebuild and execute the release. By the end of the mission, decide and carry out the final staged plan.  
**Objective:** Commit, execute, and verify the safe release.

### Worth knowing first - exact player copy
#### Glossary terms

No new terms; use the signed mission log.

#### Primer concepts

 justify each theorem; keep units through every line; use independent measurements after committing predictions.  
#### Equations first needed today
No new equation is introduced; retrieve the limit, derivative, integral, Euler, related-rate, and work relationships already recorded.
**Crew on this mission - mission log:** Imani Okoro — catchment hydrologist; Mara Vale — operations chief; Tomas Wilkes — gate mechanic; Elise Baptiste — downstream safety lead; Arun Mehta — structural engineer; Nia Chen — power dispatcher.

**Authoring-only failure consequence:** Skipping any link in the final evidence chain can turn a locally correct calculation into an unsafe release.

## Main story happening - designer summary

The player rebuilds the proof, closes water, executes the staged gate, and reads all independent limits.

## Learning and dramatic intent

Use the full course in transfer; introduce nothing and end with consequence, not another quiz.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `gauge-wall` | automatic**

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with rebuild the release bound. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 57 | `water-ledger` | automatic**

**World state:** Travel1 Location: INFLOW->STORE.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 57 result to settle close the final water ledger."

**Unlocks/waypoint:** Unlock Stop 58 at `water-ledger` in Catchment & Inflow Desk.

**Beat 3 - After Stop 58 | `staging-console` | automatic**

**World state:** Travel2 Location: STORE->GATES.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 58 result to settle predict and operate the staged release."

**Unlocks/waypoint:** Unlock Stop 59 at `staging-console` in Catchment & Inflow Desk.

**Beat 4 - After Stop 59 | `staging-console` | automatic**

**World state:** After 15.3 Location: GATES.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Imani Okoro: "Use the Stop 59 result to settle diagnose the final run."

**Unlocks/waypoint:** Unlock Stop 60 at `staging-console` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

INFLOW -> STORE -> GATES; forecast causes ledger, and zero ledger causes physical authorization.

## Characters and dramatic beat

Each specialist contributes one constraint; the player alone integrates them; Mara signs the player's rule.

## Key concepts, explained here

MVT hypotheses, derivative bounds, signed balance, chain linearization, related rates, work, diagnosis, and contextual justification.

## Stop 57 - Rebuild the release bound

**Format/placement:** DERIVE, at `gauge-wall`.

**Metadata:** Concept: limits/MVT/derivative synthesis; Keystone: Limits+rates+extrema; Area: Storage & Level Board; Learning role: TRANSFER; Difficulty: L5; Story role: foundation.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The final release needs a proved rate bound before any gate unlocks.

**Question card story setup - exact player copy:** Forecast level is continuous on `[0,2]` and differentiable inside, with `H(0)=4.36 m` and `H(2)=4.72 m`. Derive the average slope and test whether `0.15<=H'(t)<=0.21 m/h` is consistent with MVT.

**Question card story-science connection - exact player copy:** Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.

**Question card prompt - exact player copy:** Build the secant slope, state the MVT conclusion, and submit whether the forecast passes.

**Complete format-specific interaction block:** `derive:{goal:"MVT consistency",givens:["H continuous [0,2]","differentiable (0,2)","H0=4.36,H2=4.72",".15<=H'<=.21"],lines:[{expressions:["(4.72-4.36)/(2-0)=.18 m/h",".36 m/h"],correct:"(4.72-4.36)/(2-0)=.18 m/h",rules:["secant slope","endpoint difference only"],correct_rule:"secant slope"},{expressions:["exists c with H'(c)=.18","exists c with H(c)=.18"],correct:"exists c with H'(c)=.18",rules:["Mean Value Theorem","Intermediate Value Theorem"],correct_rule:"Mean Value Theorem"},{expressions:["passes because .18 lies in [.15,.21]","fails"],correct:"passes because .18 lies in [.15,.21]",rules:["compare bound","assume endpoint"],correct_rule:"compare bound"}],answerText:"The forecast passes MVT consistency."}`

**Correct result:** `.18 m/h`, passes.

**Answer text:** The forecast passes MVT consistency.

**Why:** The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.

**Wrong-path feedback:** MVT matches a derivative to the average rate; IVT matches a function value.

**State/output:** forecast lock; waypoint STORE.

## Stop 58 - Close the final water ledger

**Format/placement:** BALANCE, at `water-ledger`.

**Metadata:** Concept: accumulated change/area/average; Keystone: FTC+motion; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: synthesis.

**Call - exact player copy:** Go to the water ledger, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The rate-bound forecast must now satisfy the corrected storage total.

**Question card story setup - exact player copy:** With the forecast certified, count `14.00 million m^3` starting room, `17.28` storm inflow, `2.00` safety reserve, `3.60` turbine release, and `1.68` gate release. Close the signed ledger, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The final volume balance decides whether the staged gate plan is sufficient before motion begins.

**Question card prompt - exact player copy:** Select which displayed entries are physical water streams, assign each its shown sign, and submit one signed ledger total in `million m^3`; exclude power price.

**Complete format-specific interaction block:** `balance:{streams:[{id:"room",value:14,sign:1,count:true},{id:"turbine",value:3.6,sign:1,count:true},{id:"gate",value:1.68,sign:1,count:true},{id:"storm",value:17.28,sign:-1,count:true},{id:"reserve",value:2,sign:-1,count:true},{id:"power_price",value:.4,sign:1,count:false}],required_total:0,unit:"million m^3"}`

**Correct result:** `14+3.6+1.68-17.28-2=0`; exact.

**Answer text:** the plan just clears required storage; power price is not water.

**Why:** the plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.

**Wrong-path feedback:** Count physical streams once and keep their signs.

**State/output:** gate authorization token; waypoint GATES.

## Stop 59 - Predict and operate the staged release

**Format/placement:** VERIFY, at `staging-console`.

**Metadata:** Concept: chain/related rates/Euler/work integration; Keystone: all quantitative keystones; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the staging console, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The gate remains locked until the final head-sensitive prediction is committed.

**Question card story setup - exact player copy:** The ledger closes, so the gate must follow the staged rule without overshoot. At `h=4.0 m`, use `Q=40e^(0.3sqrt h)` and its derivative to predict the response to a `0.10 m` head change.

**Question card story-science connection - exact player copy:** A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** With $h=4.0$ m and $Q=40e^{0.3\sqrt h}$, submit $Q$ in m^3/s and the predicted $\Delta Q$ for $\Delta h=0.10$ m in m^3/s; controls remain locked until the numerical pair is committed. **OPERATE:** Run Stage 1, hold 20 minutes, then run Stage 2 with warning readiness, turbine schedule, and sensor calibration fixed. **MEASURE:** Record both flows, hoist work, arrival time, and uplift. **INTERPRET:** Submit CONTINUE or STOP against 750 J, 280 min, and 8-pressure-unit limits; restore only after a failed run.

**Complete format-specific interaction block:** `verify:{prediction:{targets:[72.885,0.547],units:["m^3/s","m^3/s"],tolerances:[.02,.02]},equipment_locked_until_prediction_commit:true,operation:"Stage1-hold20-Stage2",fixed:["warning ready","turbine schedule","sensor calibration"],measurements:["Q=72.90 then 73.43 m^3/s","work=724 J","arrival=294 min","uplift=5.7"],restore:"only on failure",limits:["W<=750 J","arrival>=280 min","uplift<=8 pressure units"],correct_conclusion:"continue"}`

**Correct result:** `Q=40e^.6=72.885`; `Delta Q=(6e^.6/2)*.1=0.547`; continue.

**Answer text:** The completed check shows q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue.

**Why:** `Q=40e^.6=72.885`; `Delta Q=(6e^.6/2)*.1=0.547`; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Wrong-path feedback:** Local change uses derivative times `Delta h`, not a second full function value unless asked.

**State/output:** gates open in two stages; unlock 15.4.

## Stop 60 - Diagnose the final run

**Format/placement:** DIAGNOSIS, at `staging-console`.

**Metadata:** Concept: whole-course model selection; Keystone: all keystones; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: final decision.

**Call - exact player copy:** Go to the staging console, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The release may finish only if every quiet and active reading fits one explanation.

**Question card story setup - exact player copy:** Stage 2 matches predicted discharge; storage falls on the resurvey curve, uplift remains below `8`, and all warnings arrive early. Choose the one diagnosis supported by every independent reading, and the team needs this result before it acts.

**Question card story-science connection - exact player copy:** The final verdict belongs to the complete evidence chain, not one successful gauge.

**Question card prompt - exact player copy:** Compare all five displayed readings with their inclusive limits, then submit exactly one final diagnosis label.

**Complete format-specific interaction block:** `diagnosis:{headline:"final release",readings:[{zone:"discharge",value:"prediction +0.02"},{zone:"storage",value:"resurvey residual +0.01"},{zone:"uplift",value:"5.7 < 8"},{zone:"warning",value:"294 >= 280 min"},{zone:"work",value:"724 <= 750 J"}],choices:[{label:"complete staged release",mechanism:"all independent limits pass"},{label:"abort for wall danger",mechanism:"contradicted by uplift"},{label:"return to old curve",mechanism:"contradicted by resurvey"},{label:"open fully",mechanism:"unverified work and arrival"}],answer:"complete staged release"}`

**Correct result:** complete staged release.

**Answer text:** each active limit and quiet control passes; do not broaden opening beyond the tested plan.

**Why:** each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.

**Wrong-path feedback:** Wall danger conflicts with uplift, the old curve conflicts with resurvey, and full opening exceeds what work and arrival tests actually verified.

**State/output:** release completes; spillway visible through glass; no more graded questions.

## Mission outcome and epilogue - no further quiz

Mission decision: Complete the staged release. The forecast, water ledger, gate response, wall readings, machine work. And warning times all pass their signed limits. The reservoir reaches storm room before the crest. Ashfell holds the rain without sending an unsafe surge downstream.

### Post-mission metric screen - exact player copy

**Header:** CAMPAIGN COMPLETE - ASHFELL RELEASE RULES SIGNED  
**Timer:** TIME `{elapsed}` / TARGET `22:00`  
**Accuracy:** INCORRECT SUBMISSIONS `{incorrect_submissions}`  
**Story event:** The corrected staged release creates the required storm room.  
**Automatic:** any saved RP may fill remaining unlocked bars; victory requires `100/100/100/100`, signed forecast, storage ledger `0.00`, and all four final limits passed.  
**RP line:** standard formula.  
**Canonical QA:** enter `100/100/100/100`, bank 7; award 12; bars remain locked/full and bank remains capped as configured.  
**Failure:** a failed final limit triggers the specified gate restoration and Day-start snapshot, not campaign data loss.

## Quick concept review
- Limits and continuity make local behavior trustworthy.
- Derivatives describe rates, sensitivities, motion, and extrema.
- Integrals turn rates and shapes into totals, areas, volumes, and work.
- **Mission takeaway:** Differential equations predict changing systems from rules and initial data.

---

# 9. Mission-at-a-glance production map

### Mission 1 - The Rate-Limit Rule

**Main event:** One impossible stored point is removed only after three independent limit checks; the surrounding acceleration remains.

**Locations:** STORE only; all necessary raw trace and model records are co-located.

**Core calculus:** rational/radical/L'Hopital limits, two-sided limits, continuity, removable versus jump/infinite breaks, IVT.

**Stops:** Cancel the false zero; Rationalize the float transform; Check the indeterminate rate; Certify continuity.

**Ending change:** Use the repaired local forecast. Both sides approach `4.20 m`, so the lone high point is a fixable hole. The crew restores that point and keeps the surrounding rise. The rise is smooth, but it is getting steeper.

### Mission 2 - The Rising-Fast Rule

**Main event:** The player replaces a height-only alarm with a derivative-and-tangent trigger.

**Locations:** INFLOW only; gauge wall and trace bench hold all rate evidence.

**Core calculus:** derivative limit, power/product/quotient/trig/exp rules, tangent line, linear approximation.

**Stops:** Build the instantaneous rise; Differentiate the forecast signal; Protect the net-rise calculation; Set the tangent alarm.

**Ending change:** Set the new rate alarm at the tangent prediction. The next reading is above `4.230 m`, so the reservoir is rising faster than the current local trend. The crew starts an early watch. A gate chart must now turn level change into release change.

### Mission 3 - The Inflow Accumulation

**Main event:** Three linked derivative views produce and physically verify a reversible gate calibration.

**Locations:** GATES only; calculation boards and operated hoist must share the same linkage.

**Core calculus:** chain rule, implicit first/second derivatives, inverse derivative, arctan/exponential derivatives.

**Stops:** Differentiate nested discharge; Link opening and head; Find linkage curvature; Reverse the flow calibration.

**Ending change:** Use the staged calibration path. The chain, linkage, and inverse tests agree, and the gate returns to baseline. The crew can predict discharge without forcing the hoist. Now it must learn how that water moves downstream.

### Mission 4 - The Two-Day Cost Note

**Main event:** Motion and depth rates convert a release into the first public warning rule.

**Locations:** SAFE only; settlement route, depth model, and warning authority are here.

**Core calculus:** position/velocity/acceleration, speeding signs, stops, distance/displacement, related rates.

**Stops:** Differentiate the flood front; Distance is not displacement; Relate depth and reach volume; Commit the warning.

**Ending change:** Use a minimum warning lead of `280 minutes`. It includes travel to the village and the road's rise time. The warning rule is now tied to motion, not an average. The two-day release plan still needs a true peak test.

### Mission 5 - The Last-Half-Metre Relation

**Main event:** An endpoint overload defeats the average-based plan; a controlled storage test finds a feasible alternative.

**Locations:** POWER to STORE; demand capacity is known only at POWER, storage consequence only at STORE.

**Core calculus:** critical points, first/second tests, absolute extrema, EVT, IVT/MVT, marginal change.

**Stops:** Find critical turbine demand; Test the absolute peak; Optimize storage against value; Prove an intermediate crossing.

**Ending change:** Reject the old two-day plan. Its endpoint demand reaches `40 MW`, above the `24 MW` unit limit, even though one interior peak only touches the limit. A lower-power release can add storage room. The forecast itself must now face the high-ground gauge.

### Mission 6 - The Peak Test

**Main event:** Physical asymptotes reject one model; frozen holdout testing reveals a missed later crest.

**Locations:** INFLOW to ARCHIVE; gauge supplies models, archive alone holds unseen readings.

**Core calculus:** vertical/horizontal/oblique asymptotes, derivative/concavity signs, holdout residuals, curve sketching.

**Stops:** Classify forecast breaks; Read inverse-shaped saturation; Freeze before revealing the crest; Diagnose the full curve.

**Ending change:** Use Forecast B. It stays finite, predicts a later crest, and survives unseen high-ground data. The old model missed the peak rather than suffering a constant bias. More water is coming, so the crew must total the full storm volume.

### Mission 7 - The Wall's Carrying Limit

**Main event:** Discrete and exact accumulation convert the larger crest into a drawdown target.

**Locations:** INFLOW to STORE; only STORE contains current empty capacity and safety margin.

**Core calculus:** Riemann sums, left/right/trapezoid behavior, antiderivatives and `+C`, linearity, FTC 1/2, signed accumulation.

**Stops:** Estimate sampled inflow; Build exact accumulation; Verify FTC Part 2; Separate signed change from physical volume.

**Ending change:** Draw down `5.28 million m^3` before the storm. The integral gives `17.28 million m^3` of inflow, and the plan also keeps `2.00 million m^3` of campaign safety room. The next task is finding a release mix that clears this volume without flooding the valley.

### Mission 8 - The Just-Clears Release

**Main event:** Integrated turbine volume leaves a gate deficit; downstream signed exposure constrains its allocation.

**Locations:** POWER to SAFE; turbine total creates the gate question, and SAFE owns its consequence.

**Core calculus:** u-substitution, bounds conversion, signed versus total area, constrained allocation.

**Stops:** Substitute the head term; Verify turbine volume; Total the signed surge; Allocate the just-clears plan.

**Ending change:** Use the mixed turbine-and-gate plan. Turbines clear `3.60 million m^3`, and the gate clears the remaining `1.68 million m^3` with warning and restart capacity protected. The plan fits downstream limits. The wall must now show it can carry the changing head.

### Mission 9 - The Seepage Ledger Rule

**Main event:** Euler reconstruction and independent channels show that two silent heads share a failed cable.

**Locations:** STRUCT to GATES; STRUCT supplies missing field, GATES provides independent load simulation and dependency panel.

**Core calculus:** slope fields, equilibrium, Euler recursion and step size, shared versus independent channels.

**Stops:** Read the pressure field; Step through the gap; Test step-size sensitivity; Diagnose silence.

**Ending change:** Continue controlled release tests. Euler estimates agree with independent live readings, and the two silent gauges share one failed cable. The crew replaces that cable and bounds the uplift load. It must next decide whether seepage settles or keeps growing.

### Mission 10 - The Error Carried Into Volume

**Main event:** A separable exponential model predicts bounded seepage and survives worst-case stress.

**Locations:** STRUCT to STORE; second system provides transfer evidence unavailable at seepage bench.

**Core calculus:** separation, `ln|y|`, initial condition, exponential/logistic/Newton models, equilibrium, parameter stress.

**Stops:** Separate the seepage equation; Select the model; Transfer to cooling; Approve the carrying limit.

**Ending change:** Approve the wall's carrying limit. Excess seepage follows bounded exponential decay and remains below `5.0 L/min` across the supported uncertainty. The structural hold clears. A new reservoir survey now challenges how much water each level truly represents.

### Mission 11 - The Quiet-Day Check

**Main event:** Area between surveys quantifies silt loss; independent transects and a level-rate test replace the old curve.

**Locations:** STORE -> STRUCT -> GATES; each site supplies respectively discrepancy, independent identity, and operational response.

**Core calculus:** area between curves, crossings, average value, independent records, related-rate conversion.

**Stops:** Integrate lost capacity; Compute average loss; Verify independent transects; Convert volume loss to level rate.

**Ending change:** Replace the 2003 storage curve. Independent transects show `7.5 million m^3` of lost capacity, and the corrected derivative predicts the measured level fall. The old plan overstated safety room. The crew must rebuild its release around the gate and turbine work still available.

### Mission 12 - The Decay Constant, Scored

**Main event:** Rotational volume removes unavailable turbine capacity; a work test bounds repeatable gate motion.

**Locations:** POWER -> GATES -> STORE; missing runner, hoist capacity, and final storage feasibility are owned separately.

**Core calculus:** disk/washer, shell setup, work as force integral, Hooke force, evidence value.

**Stops:** Compute the missing runner volume; Compare the shell setup; Measure hoist work; Choose feasible schedule.

**Ending change:** Use the one-runner, staged-gate schedule. Washer volume removes the unavailable runner from capacity, and the work integral keeps each gate stroke below `750 J`. The corrected storage simulation still clears the target. The remaining question is whether measurement error could overturn that result.

### Mission 13 - The Three-Before-Nine Order

**Main event:** Propagated error, residual pattern, and an independent constraint certify the corrected model.

**Locations:** STORE -> STRUCT -> INFLOW; uncertainty originates in storage, independent geometry is structural, and forecast integration is at inflow.

**Core calculus:** linearization, propagated units, residual fields, numerical-method bias, degeneracy and physical constraints.

**Stops:** Linearize level error; Refuse the lowest RMS; Break the two-control degeneracy; Diagnose the signed rules.

**Ending change:** Sign the corrected release rules. Propagated volume error stays below the margin, residuals remain unpatterned, and independent uplift geometry breaks the last parameter tie. Dam Integrity is now locked. The valley warning system must pass before the release can start.

### Mission 14 - The Lead-Time Rule

**Main event:** Failed sirens turn apparent victory into an optimization and delayed-forecast problem, then all circuits pass.

**Locations:** SAFE -> INFLOW -> GATES; warning failure creates forecast delay, which changes gate start.

**Core calculus:** constrained extrema and endpoints, deadline sorting, Euler step sensitivity, precommitted threshold.

**Stops:** Find the repair optimum; Order settlements by consequence; Update the delayed forecast; Commit repaired warning trigger.

**Ending change:** Every downstream reach is ready. The optimized repair order restores all four circuits with `15 minutes` of slack before the warning deadline. Downstream Readiness is locked. The final release must still handle the gate's steep last half-metre without exhausting reserve.

### Mission 15 - The Corrected Release Rules, Signed

**Main event:** The player rebuilds the proof, closes water, executes the staged gate, and reads all independent limits.

**Locations:** INFLOW -> STORE -> GATES; forecast causes ledger, and zero ledger causes physical authorization.

**Core calculus:** MVT hypotheses, derivative bounds, signed balance, chain linearization, related rates, work, diagnosis, and contextual justification.

**Stops:** Rebuild the release bound; Close the final water ledger; Predict and operate the staged release; Diagnose the final run.

**Ending change:** Complete the staged release. The forecast, water ledger, gate response, wall readings, machine work, and warning times all pass their signed limits. The reservoir reaches storm room before the crest. Ashfell holds the rain without sending an unsafe surge downstream.

# 10. Stop manifest

| Stops | Required prior result | Visible output | Later payoff |
|---|---|---|---|
|1.1-1.4|algebra -> side limits -> independent limit|repaired open-circle trace|forecast continuity in 6.4, 15.1|
|2.1-2.4|limit definition -> derivative rules -> tangent|RISING FAST trigger|peak and final rate bounds|
|3.1-3.4|chain sensitivity -> linkage slope/curvature -> inverse test|gate corridor|staged final opening|
|4.1-4.4|motion -> distance -> depth rate -> threshold|280-minute rule|D14-D15 warning gate|
|5.1-5.4|critical points -> absolute peak -> control -> theorem|old plan crossed out|optimization in D14|
|6.1-6.4|physical asymptote -> saturation -> holdout -> residual|Forecast B|storm total and finale|
|7.1-7.4|numeric sum -> FTC total -> live totalizer -> ledger|5.28-million target|mixed and final balances|
|8.1-8.4|substitution -> measured turbine total -> exposure -> allocation|mixed schedule|mechanical schedule|
|9.1-9.4|field -> Euler -> step control -> dependency trace|J4 repair|independent integrity case|
|10.1-10.4|separation -> model diagnosis -> equilibrium transfer -> stress|wall limit|Integrity lock|
|11.1-11.4|curve area -> average -> records -> rate test|resurvey official|corrected ledger|
|12.1-12.4|runner volume -> shell setup -> work test -> value|staged physical plan|final gate operation|
|13.1-13.4|propagation -> residual -> degeneracy -> full diagnosis|Integrity locked|final authorization|
|14.1-14.4|endpoint optimum -> repair order -> delay update -> trigger|Downstream locked|final release|
|15.1-15.4|MVT proof -> zero ledger -> operated verify -> diagnosis|spillway release|campaign payoff|

## Exact format count

| Format | Count |
|---|---:|
| DERIVE | 20 |
| VERIFY | 6 |
| BALLPARK | 4 |
| DIAGNOSIS | 4 |
| CONTROL | 4 |
| CHOICE | 3 |
| TRIGGER | 3 |
| BALANCE | 2 |
| RESIDUAL | 2 |
| ALLOCATE | 1 |
| ATTEST | 1 |
| DEGENERACY | 1 |
| HOLDOUT | 1 |
| PROBE | 1 |
| PROPAGATE | 1 |
| SEQUENCE | 1 |
| STRESS | 1 |
| SWEEP | 1 |
| TRACE | 1 |
| TRIAGE | 1 |
| VALUE | 1 |
| **Total** | **60** |

DERIVE is exactly `20/60`, at but not above the one-third formatMix cap. No other family approaches the cap.

# 11. Narrative implementation notes

## Environmental state changes

Every mission's beat script names its persistent changes. Preserve repaired traces, signed rules, forecast selection, target volumes, cable repair, resurvey replacement, circuit readiness, metric locks, and final spillway state across revisits.

## Dialogue state

Wrong answers do not branch the plot. Optional dialogue may acknowledge accumulated evidence, but required information stays in the mission log and persistent displays.

## Mission endings

Each mission ending is a non-quiz world payoff. The final release begins after Stop 60 and contains no further educational gate.

# 12. Content and UI acceptance tests

## 12.1 Format and payload checks

- Scheduled stops: 60. DERIVE: 20, exactly one-third and therefore at the formatMix cap, never above it.
- Every DERIVE is asked at a room/desk/board and grades both an expression and a named licensing rule.
- VERIFY appears only at operated fixtures and states `CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET`, including fixed quantities and restoration rule.
- CONTROL blocks specify candidate controls, changed variable, fixed variables, numeric baseline/response, noise band, reversal, readings, and conclusion.
- DEGENERACY has exactly two numeric controls, valid min/max/step, six first-locus points, four second-locus points, positive tolerance, physical constraint, truth pair, and plan.
- TRACE has four channels, two sharing a named dependency and two independent. VALUE exceeds its budget in available costs and contains required evidence. ALLOCATE has a positive pool, four unique items, three decision checks, required items, and protected reserve.
- DIAGNOSIS blocks contain a headline, at least three mixed quiet/alarm readings, mechanisms, and one keyed answer. Other base types supply their canonical collections and keyed truth.
- `STACK` is not used. World-graded warm-ups are not authored as stops.

## 12.2 Action-clarity checks

- Every numerical prompt exposes inputs, constants/conversions, equation or recorded relationship, requested quantity, requested units, truth, tolerance, and worked arithmetic.
- Multi-phase operated questions lock controls before prediction commitment and name the required response at each stage.
- Stops 3.4, 7.3, 8.2, 11.4, 12.3, and 15.3 explicitly state whether restoration is required.
- The two-control stop 13.3 names both controls and requires numeric pair submission before plan choice.
- Decision prompts distinguish number, pair, selection, allocation, conclusion, or plan.

## 12.3 Scientific and learning checks

- All eight cheat-sheet units appear in the coverage matrix and in graded stops. No finale concept is new.
- Foundations precede dependent work: limits before derivatives, rules before implicit/related rates, derivatives before extrema, sums before FTC, FTC before DE solutions and applied integrals.
- Each keystone occurs in at least three separated Days, has delayed retrieval, and contributes to later combination or transfer.
- Later difficulty comes from choosing models and actions under constraints, not larger arithmetic.
- FRQ habits recur: setup, named theorem/rule, execution, units, contextual conclusion, and distinction between calculator prediction and no-calculator derivation.

## 12.4 Story and clue checks

- Three major turns are planted and paid: missed high-ground crest (D1-D6), lost storage from silt (D5-D11), and warning plus last-half-metre complication (D3/D4/D12-D15).
- Observations remain true after reinterpretation. No villain is required; each character protects a legitimate constraint.
- Correct results sometimes worsen the situation: D6 larger crest, D11 smaller capacity, D14 failed sirens.
- Each outcome directly answers its fourth briefing sentence and creates the next need.

## 12.5 Location and character checks

- Days 1-4 use one location, Days 5-10 use two, and Days 11-15 use three.
- Every move is caused by evidence and leads to a fixture, record, control, or authority unavailable at the previous place.
- Each major character first appears doing competent work, carries a scientific/operational viewpoint, changes with evidence, and contributes one final constraint.
- Required dialogue pauses the timer and is copied to the mission log; essential information never depends on sound or color.

## 12.6 Briefing, glossary, and accessibility checks

- Every briefing has four sentences, targets 30-70 words, and begins sentence four with `By the end of the mission`.
- Every mission primer uses glossary -> concepts -> equations; glossary terms are compact one-line definitions and equations contain only equation/job/symbols/campaign reason.
- Question setups are authored as exactly two short sentences targeting 30-45 words; production validation must machine-count after schema transcription because parenthetical word tokenization may differ.
- Outcomes start with `Mission decision:` and use short, plain sentences. Color is supplemented by text, icons, and numeric labels.

## 12.7 Metric-economy checks

- Exactly four bounded bars are used. Every decrease is a visible named event; zero restores the Day-start snapshot.
- Recovery formula, timer target, accuracy cost, allocation/bank rule, and canonical QA state are specified per Day.
- The reference path reaches all four bars at 100 without requiring perfect play because automatic gains, 180 maximum RP, and a seven-point late bank provide margin.
- Final action requires all four bars, the signed forecast, zeroed storage ledger, work, arrival, uplift, and discharge checks.

## 12.8 Dedicated action-clarity and format-payload audit

The campaign must not ship unless all of these checks pass in the implemented player-facing cards, not merely in hidden payload data:

1. **PROBE station contract:** every required station names what the player loads, what the fixture reads, the calculated or stated expected reading with units, and the comparison/conclusion. If several stations are required, the prompt states the station-by-station operating sequence.
2. **CHOICE and TRIAGE contract:** exactly four distinct option labels; no slash-separated bundles posing as one option; the keyed label appears verbatim; each of the three wrong options has its own mechanism-specific rebuttal.
3. **Explicit staged-action contract:** whenever calculation, operation, measurement, and interpretation all occur, the visible order is **CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET**. Controls do not unlock early.
4. **VERIFY contract:** the numeric prediction, units, relationship, inputs, tolerance, and submission type are visible; `equipment_locked_until_prediction_commit:true`; action, fixed quantities, readings, restoration rule, and conclusion are explicit.
5. **CONTROL contract:** the changed variable, every fixed variable, measurement timing, restoration, second measurement after restoration, and causal conclusion are visible.
6. **DEGENERACY contract:** both controls are named with units/ranges/steps; the player must submit the numerical parameter pair before choosing a plan; both loci, tolerance, physical constraint, and truth pair are present.
7. **Numerical completeness contract:** each numerical stop exposes every input, constant, conversion, assumption, equation or recorded relationship, input units, requested answer units, tolerance/grading rule, and response type (`number`, `pair`, `setting`, `selection`, `allocation`, `plan`, or `conclusion`).
8. **Canonical payload contract:** the current `QUESTION_TYPES(3).md` requirements are the minimum. Prose may not substitute for the named interaction block or required collections.

### Stop-by-stop action audit

| Stops inspected | Gate checked | Result after correction |
|---|---|---|
|1.1-3.3, 4.1-4.3, 5.1, 6.1, 7.2, 8.1/8.3, 9.2, 10.1, 11.1, 12.1, 15.1|DERIVE line, license, givens, units, response|Pass: all expression and rule choices are explicit; numerical DERIVEs state requested units and tolerances in the result block.|
|3.4, 7.3, 8.2, 11.4, 12.3, 15.3|VERIFY prediction lock and four-phase order|Pass: all six prompts visibly require commitment first, and all six payloads set `equipment_locked_until_prediction_commit:true`.|
|5.3, 9.3, 10.3, 14.3|CONTROL change/fix/time/restore/remeasure|Pass: prompts now name one changed control, fixed quantities, when to read, restoration, the second reading, and submitted conclusion.|
|9.1|PROBE station-by-station load/read/expected/compare|Pass after correction: A, B, and C each contain load, reading, expected calculation, units, and comparison; sequence is explicit.|
|5.4, 7.4, 12.2, 14.2|four-option CHOICE-family payload|Pass after correction: four distinct labels and three distinct mechanism rebuttals per stop; no slash-separated option.|
|13.3|DEGENERACY two-control numerical pair|Pass: `b` and `s` are named with units and numeric bounds/steps; pair precedes plan selection; loci and truth pair are complete.|
|2.4, 4.4, 14.4|TRIGGER precommit|Pass: thresholds are calculated and committed before updates, with inclusive directions and consequence limits.|
|6.3, 6.4, 7.1, 8.4, 9.4, 10.2, 10.4, 11.2-11.3, 12.4, 13.1-13.2/13.4, 14.1|previously implicit response type|Pass after correction: each now has a separate visible prompt naming the required model, method, number, record set, allocation, purchase, or conclusion.|
|all 60 stops|visible inputs, constants, units, equation/relationship, answer unit/type|Pass in this bible after card-plus-payload inspection; implementation must preserve visibility instead of hiding payload values.|

### Violations found and fixed in this QA pass

- Rebuilt PROBE 9.1 from three bare coordinates into an explicit A -> B -> C load/read/expected/compare interaction.
- Replaced summary statements about CHOICE rebuttals at 5.4, 7.4, 12.2, and TRIAGE 14.2 with four distinct option objects and a unique rebuttal for every wrong label.
- Added explicit prompts to fifteen stops whose submission type previously appeared only in the structured payload.
- Added the equipment-lock field to every VERIFY payload and confirmed visible prediction-first wording.
- Rewrote CONTROL prompts 5.3, 9.3, 10.3, and 14.3 to state measurement timing, restoration, and remeasurement.
- Expanded DEGENERACY 13.3 to name the level-offset and storage-scale controls, their units, and the required numeric pair before plan choice.
- Repeated the full demand function and inclusive machine threshold on 5.2 so its numerical card is independently reproducible.
- Preserved the earlier numerical corrections: `o''=-40/81`; exact storm volume `17.280 million m^3`; signed/total surge integrals `80/3` and `190/3`; repair objective `P(6)=52`. This pass also corrected the final linearized gate change to `0.547 m^3/s`.

### Unavailable implementation check

The target repository and importer were not provided. Therefore schema spelling, renderer behavior, trap tests, and live equipment-lock behavior cannot be executed here. This is the only open QA item: the content bible passes document-level inspection, but shipping still requires transcription into the current schema followed by importer, `npm run traps`, `npm run lessons`, reachability, and right-first/wrong-first play tests.

# 13. Suggested YAML assembly order for Claude Code

1. Preserve existing theme, area IDs, fixture IDs, and roster assets where possible.
2. Assemble the 15 missions in order with global Stops 1-60.
3. Implement DERIVE line-and-license grading and all operated payloads before importing story polish.
4. Preserve evidence flags, metric events, locks, dialogue triggers, and persistent world changes.
5. Run the current importer, schema validator, traps, lessons, reachability, and world-parity suites.
6. Play once right-first and once wrong-first, including every prediction lock and restoration.

## Recommended content object shape

```yaml
- group: INFLOW
  task: player-facing action
  title: short dramatic title
  at: exact-fixture-id
  reason: exact player-facing reason this task is needed now
  concept: narrow AP Calculus AB concept
  keystone: broader recurring concept
  learningRole: INTRODUCE | PRACTICE | RETRIEVE | COMBINE | TRANSFER
  takesAsRead: [earlier concept labels]
  scene: exactly two short sentences, 30-45 words total
  storyScienceConnection: one clear sentence
  format: CANONICAL_FORMAT
  question: exact player-facing prompt
  # complete canonical format-specific interaction block
  answerText: exact result shown after grading
  why: mechanism and contextual interpretation
  wrongPathFeedback: actionable correction and retry
```

Do not author question-card `guide`, `background`, or `takeaway` fields. The repository importer and current canonical format documentation remain the source of truth for final field spelling.

# 14. Final handoff checklist

1. Transcribe the bible into the repository's current book schema without renaming existing fixtures or groups.
2. Machine-check every briefing word count, two-sentence setup count, and closing-card grade level; repair only copy, never truth values.
3. Recalculate all keys in the engine representation, especially exponentials, numerical tolerances, and the `13.3` degeneracy loci.
4. Run importer and schema validation with zero missing blocks; run reachability/world parity for all six instructional groups.
5. Run `npm run traps`, `npm run lessons`, and the current campaign validators.
6. Play once right-first and once wrong-first; test every VERIFY lock, every CONTROL restoration, RP allocation, zero-bar recovery, and final gate restoration.
7. Confirm the final story payoff begins immediately after Stop 15.4 and no graded question follows it.

---

- [ ] Confirm exactly 20 DERIVE stops and 60 total stops after import.
- [ ] Confirm the corrected final linearized gate-flow change is `0.547 m^3/s` everywhere.
- [ ] Confirm PROBE, CHOICE, VERIFY, CONTROL, DEGENERACY, and every operated format against the live canonical importer.
- [ ] Confirm Stop 60 is the final graded interaction.

**Canonical ending line:** “The rule is signed. The valley has time, and Ashfell has room.”
