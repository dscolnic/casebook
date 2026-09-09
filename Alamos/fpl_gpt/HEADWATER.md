# HEADWATER

**Player-copy editing rule:** Within each displayed passage, state each fact, equation, variable definition, and instruction once. Integrate new givens into the existing wording; do not append a paraphrase of the setup. A source panel may repeat essential inputs so it stands alone, but render it as its own surface rather than concatenating it with the question setup. Go Deeper questions must still supply their own context and data without referring to earlier cases.

## AP Calculus AB Campaign Implementation Bible

**Version:** 10.2 - compact glossary and canonical action-clarity handoff  
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

### Authored warm-up records

```yaml
warmups:
  - {day: 4, type: follow, title: "FOLLOW THE RELEASE CHECK", why: "Carry the verified release reading from the control room to the crew member who needs it for today's gate decision."}
  - {day: 8, type: hunt, title: "FIND THE MISSING INFLOW RECORD", why: "Locate the archived measurement that can explain why today's storage forecast disagrees with the reservoir."}
  - {day: 13, type: canvass, title: "CANVASS THE FLOOD ROUTE", why: "Collect each downstream team's constraint before the final release plan is locked."}
```

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

You are the dam release lead, which means you decide how much water can leave without flooding the town. At Ashfell Dam, you will use calculus to make the call. Fifteen work shifts remain before the rain. The lake needs room for a storm; the people below need time to get clear of each release. Mara Vale, dam operations chief, hands you the release board and says, “We need room for the storm, but every gate we open sends water toward someone’s home.”

**Opening-card requirement:** The character quote is the final player-visible text on this card; place no explanatory sentence after it. Keep it brief and natural: it should add the speaker’s concern or commitment rather than summarize the preceding setup. Show the whole opening together with one Continue action.


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
| Safe Storage | primary | 40 | verified room for storm water | storage/release model is certified | forecast or storage estimate is invalidated | storm overtops emergency margin; restore Day start | locks only after final release succeeds |
| Downstream Readiness | secondary | 50 | people and roads prepared for planned flow | arrival and warning rules are verified | release changes outrun warnings | release authorization is withdrawn | locks after D14 siren verification |
| Operating Reserve | reserve | 60 | turbine, gate, staff, and power capacity remaining | efficient plan preserves capacity | tests, outages, and delays consume it | operations stop; restore Day start | never locks before finale |
| Dam Integrity | integrity | 70 | confidence the wall, uplift, and gates remain within limits | independent structural evidence clears a load | unsafe head or unverified seepage raises risk | emergency evacuation; restore Day start | locks after D13 independent check |

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


### Landmark-only spaces and visible scene objects

These spaces are walkable and ungraded. They never add a required tour, question, or travel cost. Their access follows existing mission access; final routes open only after the completion gate below. Each object remains inspectable after its trigger.

| Space ID | Place | Before | Visible change |
|---|---|---|---|
| `crest-walk` | Crest Walk | Old flood marks run down the wall beside the reservoir. | After each mission the current water line follows the latest measured storage state; after Stop 59 the spillway runs, and after Stop 60 the signed drawdown remains visible. |
| `valley-lookout` | Valley Lookout | A school roof and one low road sit below the dam. | After Stop 16, the warning route is posted; after Stop 56, all four acknowledgement lamps are lit. |
| `shift-kitchen` | Shift Kitchen | A kettle sits among unused lunch tins and wet coats. | After Stop 24 the night-watch rota fills; after Stop 60, coats come off the pegs as the relief crew arrives. |

### Persistent prop and scene contract

The crest access latch is a scene component controlled by `trigger-board`; it is not a release valve. Its opening never changes the tested gate settings.

Each mission below declares one Physical aftermath with a home in the existing fixture table. Its dated prop occupies its own place on that fixture; later pages never erase earlier evidence. All scene actions fire once from the accepted stop, persist through revisits, and restore from the mission-start snapshot on failure. Replaying a completed stop never repeats an action or grants resources. Labels always include text, not color alone. New observations remain hidden until the relevant measurement; accepted-answer labels appear only after acceptance. No prop change substitutes for the existing grading, timing, or evidence checks.

Water movement begins during the graded Stop 59 staged operation, never before prediction commitment. Stop 60 confirms completion and opens the crest walk; do not run the gates a second time for the ending. Gate order, 20-minute hold, 750 J work limit, 280-minute warning lead, and uplift limit stay in their existing interaction. Reservoir level is driven by the signed inflow-minus-outflow ledger, not an invented monotonic rise or an animation-only numerical series. Before drawdown the water climbs with the forecast; during verified releases it falls. Dates on optional examples are not the storm clock.

## 4. Character bible

| Character | Role and pronouns | Wants / blind spot | Gameplay and arc | Verbal habit |
|---|---|---|---|---|
| Mara Vale | operations chief; she/her | a signed rule each shift / trusts familiar charts | authority and final decisions; learns to demand independent curves | “What changes?” |
| Imani Okoro | `STORE` division catchment hydrologist; she/her | protect forecast credibility / underweights unseen high ground | inflow, sums, DEs; reveals and corrects forecast | “What did the rain become?” |
| Leila Hassan | `INFLOW` gauge operations hydrologist; she/her | preserve an auditable basin record / initially trusts dense sampling more than independent placement | owns inflow-desk access and gauge provenance | “Which gauge saw it?” |
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
| L'Hopital for 0/0 or infinity/infinity | 6.1 | 15.1 |
| Piecewise limits; three-part continuity; IVT | 1.4 | 5.4, 15.1 |
| Removable, jump, infinite discontinuities | 1.4, 6.1 | 13.4 |
| Horizontal, vertical, oblique asymptotes | 1.3, 6.2 | 6.4 |
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


## 7.1 Persistent world-state ledger

| Mission | Accepted trigger | Home fixture | State that persists | Next visible problem |
|---|---|---|---|---|
| 1 | `accepted_stop_4` | `level-desk` | Imani Okoro circles the repaired point marked 4.20 M on the trace. | At `storage-board`, the next tick on the level chart runs above the ruler. |
| 2 | `accepted_stop_8` | `storage-board` | Mara Vale pins the rate-alarm card beside the water curve. | At `discharge-board`, fresh grease marks stop short of an old notch on the hoist scale. |
| 3 | `accepted_stop_12` | `discharge-board` | Tomas Wilkes clips the verified calibration strip to the discharge board. | At `arrival-map`, a school pin sits just downstream of a road crossing. |
| 4 | `accepted_stop_16` | `arrival-map` | Elise Baptiste pins the MINIMUM LEAD: 280 MINUTES card beside the village pin. | At `storage-board`, two endpoint marks sit on opposite sides of a red line. |
| 5 | `accepted_stop_20` | `storage-board` | Mara Vale draws the MUST CROSS 4.6 M bracket between the endpoint marks. | At `forecast-drawer`, a sealed high-ground trace rests under the old forecast. |
| 6 | `accepted_stop_24` | `forecast-drawer` | Imani Okoro files the failed forecast under MISSED LATER CREST. | At `water-ledger`, the storm total fills a strip longer than the storage allowance. |
| 7 | `accepted_stop_28` | `water-ledger` | Leila Hassan pins the DRAW DOWN 5.28 MILLION CUBIC METRES card to the ledger. | At `hoist-stand`, the hoist rests at its baseline mark above a dry spillway. |
| 8 | `accepted_stop_32` | `hoist-stand` | Tomas Wilkes turns the hoist to the signed test notch. | At `uplift-wall`, two blank gauge faces sit beside a live independent trace. |
| 9 | `accepted_stop_36` | `uplift-wall` | Arun Mehta ties a FAILED SHARED CABLE tag around the removed cable. | At `weir-bench`, drops strike the weir bucket at a slowing pace. |
| 10 | `accepted_stop_40` | `weir-bench` | Arun Mehta clips the BELOW 5.0 LITRES PER MINUTE clearance to the weir notebook. | At `holdout-drawer`, a fresh sonar roll crowds the old 2003 drawing. |
| 11 | `accepted_stop_44` | `holdout-drawer` | Imani Okoro opens the sealed independent survey drawer. | At `machine-board`, a runner crate blocks one of the two machine bays. |
| 12 | `accepted_stop_48` | `machine-board` | Nia Chen hangs a RUNNER UNAVAILABLE card over the blocked machine slot. | At `residual-plot`, the new survey and old fit lie on separate hooks. |
| 13 | `accepted_stop_52` | `residual-plot` | Imani Okoro pins the independent clearance beside the corrected residual plot. | At `warning-list`, two acknowledgement boxes are empty beside a running clock. |
| 14 | `accepted_stop_56` | `warning-list` | Elise Baptiste ticks the fourth warning acknowledgement box. | At `trigger-board`, the gate order lies beside four acknowledged warning slips. |
| 15 | `accepted_stop_60` | `trigger-board` | Mara Vale unlatches the crest access gate. | At `trigger-board`, the signed operating conditions remain beside the final status. |

## 8. Mission content contract

Every mission below supplies a briefing promise, compact glossary, primer, equations, story event, route, character beat, concepts, four exact stops, an outcome that answers the promise, a metric screen, and a quick review. Every stop contains a reason, two-sentence story setup, story-science connection, visible prompt, complete canonical payload, keyed truth, answer text, mechanism explanation or actionable feedback, and state output.

### Revision 10.2 presentation cleanup

Glossary entries are compact one-line definitions in the form `Term: definition`. Equation entries omit `Also called` and `Concept`; they retain the equation, purpose, symbols, and campaign-specific reason.

### Player-facing glossary dependency

Define every technical term before the player must use it. Implement the exact mission-card entries below rather than reconstructing definitions from metadata.

### Keystone retrieval compliance ledger

The dependency graph, keystone matrix, cheat-sheet coverage matrix, and fifteen-mission spine above are authoritative. Each keystone is introduced, retrieved after an intervening mission, and used in a later combination, transfer, or finale payoff.


## 8.1 Final playable scene and ending card

**Completion gate:** accepted_stop_60 AND every existing final scientific/evidence requirement AND the existing final metric target. Acceptance arms the scene; if metric allocation is still required, play it once that allocation passes. A wrong answer, missing proof, or failed check never starts the success animation.

**One visible change:** The crest access gate opens onto the continuing signed release.

**The next sixty seconds:** 0–15 seconds: the crest access latch opens while the already-running release continues. 15–40 seconds: the player walks to the crest rail and sees the spillway and falling level. 40–60 seconds: all four acknowledged warning circuits stay visible; the ending card appears from this view.

**Ending card - exact player copy:** From the crest, the spillway runs white below the gates. The lake line falls along the checked curve. Four warning lamps stay green above the valley map. The town still has its roads, and the dam has room for the rain.

**Delivery:** Keep player control and normal world view. No new graded stop follows the final accepted decision. The ending card appears after the player reaches the payoff view, or through an accessible View ending control that skips movement without skipping any scientific gate. Optional review and worked examples remain available through the completed mission menu.


### Standalone Go Deeper question contract

Each optional review question must work when copied out on its own. Supply its setting, givens, units, definitions, and any required figure within that question. Do not mention a mission title, a prior case, a teammate rechecking earlier work, a completed plan, or unseen cards, observations, or results. Do not assume that another review question was read. Choices, hints, and feedback obey the same rule. Use brief conceptual questions or complete applied problems; figures must match the question rather than merely share its course.

# Mission 1 - The Broken Trace

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 1 - 15 WORK SHIFTS REMAIN BEFORE THE STORM.

**Card title:** Did the Water Really Rise?

**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the desk showing reservoir water levels.

**Card body:** 15 work shifts remain before the storm. One ink dot sits high above the rest of the water trace. Today you decide whether the odd water reading can be fixed.

**Objective:** Decide whether the water-height forecast can be trusted.

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
  - id: headwater_m01_we01
    title: Direct substitution
    problem: For f(x)=3x+1, find the limit as x approaches 2.
    rule: For a continuous function, lim(x→a) f(x)=f(a).
    steps:
    - 'Set up the relationship: For a continuous function, lim(x→a) f(x)=f(a).'
    - L=3(2)+1=7. A polynomial is continuous at 2.
    answer: The limit is 7.
    common_mistake: A limit concerns nearby values; continuity is what permits substitution.
  - id: headwater_m01_we02
    title: Remove a removable hole
    problem: Find L=lim(x→3)(x²-9)/(x-3).
    rule: x²-9=(x-3)(x+3).
    steps:
    - 'Set up the relationship: x²-9=(x-3)(x+3).'
    - L=lim(x→3)(x+3)=3+3=6; cancellation applies only for x≠3.
    answer: The limit is 6 even though the original expression is undefined at 3.
    common_mistake: Substitution giving 0/0 is not a final answer of zero.
  - id: headwater_m01_we03
    title: Rationalize a square root
    problem: Find L=lim(x→0)(sqrt(9+x)-3)/x.
    rule: Multiply numerator and denominator by sqrt(9+x)+3.
    steps:
    - 'Set up the relationship: Multiply numerator and denominator by sqrt(9+x)+3.'
    - L=lim(x→0)1/(sqrt(9+x)+3)=1/(3+3)=1/6.
    answer: The limit is 1/6.
    common_mistake: Multiply the whole fraction by the conjugate over itself, not just the numerator.
  - id: headwater_m01_we04
    title: Repair continuity
    problem: Let f(x)=x+2 for x≠1, and f(1)=k. Choose k so f is continuous at 1.
    rule: Continuity at a requires f(a)=lim(x→a)f(x).
    steps:
    - The nearby limit is L=1+2=3.
    - Set f(1)=k=3 to match that limit.
    answer: Choose k=3.
    common_mistake: The separately stored point does not determine the nearby limit.
  - id: headwater_m01_we05
    title: Identify asymptotes
    problem: For f(x)=(2x+1)/(x-1), identify vertical and horizontal asymptotes.
    rule: An uncancelled denominator zero can give a vertical asymptote; equal degrees give a horizontal leading-coefficient ratio.
    steps:
    - x-1=0 gives x=1; the numerator there is 3, so no cancellation occurs.
    - For large |x|, f(x)=(2+1/x)/(1-1/x) approaches 2.
    answer: 'Vertical asymptote: x=1. Horizontal asymptote: y=2.'
    common_mistake: Do not use the constant terms to determine the horizontal asymptote.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Limit: the value a function approaches as its input nears a point.

Continuous: having a defined value that equals the common left and right limit.

Asymptote: a line that a graph approaches. A vertical asymptote marks an input where a rational model grows without bound; a horizontal asymptote describes its long-run output.

#### Primer concepts

- Substitute first; if `0/0` appears, simplify before evaluating. Left and right limits must agree, and a hole can be repaired only when the surrounding limit exists.
- For a rational function, a denominator zero that does not cancel can create a vertical asymptote.
- When numerator and denominator have the same degree, the horizontal asymptote is the ratio of their leading coefficients.

#### Equations first needed today
**Equation:** `lim_(x->a) f(x)`

**What it is for:** finding the value approached near `a`.

**Symbols:** `x` is input, `a` is the approached input, and `f(x)` is output.

**Why this campaign needs it:** a nearby trend can distinguish a bad sample from a real level jump.

## Main story happening - designer summary

One impossible stored point is removed only after three independent limit checks; the surrounding acceleration remains.

## Learning and dramatic intent

Introduce rigorous nearby behavior and make the first correct answer preserve bad news.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `storage-board` | automatic**

**Trigger:** mission_1_arrival.

**World state:** One ink dot sits high above the rest of the water trace.

**Panel/HUD text:** MISSION 1: CANCEL THE FALSE ZERO OPEN

**Dialogue bubbles -** Mara Vale: "Start with cancel the false zero. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 1 | `level-desk` | automatic**

**Trigger:** accepted_stop_1.

**World state:** At `storage-board`, the dated accepted-result slip for Stop 1 reads: "12 cm, exact.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The height-limit check leaves a second possible fault in the float sensor's conversion rule."

**Unlocks/waypoint:** Unlock Stop 2 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 2 | `storage-board` | automatic**

**Trigger:** accepted_stop_2.

**World state:** At `level-desk`, the dated accepted-result slip for Stop 2 reads: "0.125, tolerance 0.0005.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 2 RECORDED - STOP 3 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The sensor checks are not enough to establish that the rival rainfall forecast behaves sensibly."

**Unlocks/waypoint:** Unlock Stop 3 at `storage-board` in Storage & Level Board.

**Beat 4 - After Stop 3 | `storage-board` | automatic**

**Trigger:** accepted_stop_3.

**World state:** At `storage-board`, the dated accepted-result slip for Stop 3 reads: "vertical asymptotes at t=-2 and t=2; horizontal asymptote R=3 mm/h.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The crew has enough nearby evidence to decide whether the logged spike requires abandoning the local forecast."

**Unlocks/waypoint:** Unlock Stop 4 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**Trigger:** accepted_stop_4.

**World state:** At `level-desk`, Imani Okoro circles the repaired point marked 4.20 M on the trace. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "The bad dot is gone. The rising water is real. But Mara sees the line still climb on both sides; the next alarm must watch how fast it rises."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m01

**Home:** `level-desk`. **Before:** The dated mission-1 evidence holder at this fixture has no accepted record. One ink dot sits high above the rest of the water trace.
**After — exact action:** Imani Okoro circles the repaired point marked 4.20 M on the trace.
**Trigger:** accepted_stop_4. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `storage-board`, the next tick on the level chart runs above the ruler.
**Segue - exact player copy:** But Mara sees the line still climb on both sides; the next alarm must watch how fast it rises.

## Location plan

STORE only; all necessary raw trace and model records are co-located.

## Characters and dramatic beat

Mara wants a usable trace but blocks unsupported edits; proof earns conditional trust.

## Key concepts, explained here

rational and radical limits, rational-function asymptotes, two-sided limits, continuity, removable versus jump and infinite breaks, IVT.

## Stop 1 - Cancel the false zero

**Format/placement:** DERIVE, at `storage-board`.

**Metadata:** Concept: 1 - rational limit; Keystone: Limits; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** A suspicious reservoir reading must be checked before the crew uses the local height forecast.

**Question card story setup - exact player copy:** The logger models water level as H(t)=(t^2-36)/(t-6), where t is in minutes and H is in centimetres. Nearby readings are finite, but the formula is undefined at t=6. Find L=lim_(t->6)H(t) to test whether this gap in the formula implies a physical spike.

**Question card story-science connection - exact player copy:** The nearby height limit determines whether the formula supports the isolated spike or instead approaches a different height.

**Fixture source panel - exact player copy:** The logger models water level as H(t)=(t^2-36)/(t-6), where t is in minutes and H is in centimetres. Nearby readings are finite, but the formula is undefined at t=6. Find L=lim_(t->6)H(t) to test whether this gap in the formula implies a physical spike.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit L in centimetres.

**Complete format-specific interaction block:** `derive: {left_side:"L",goal:"predicted height approached near minute 6 in cm",givens:["H(t)=(t^2-36)/(t-6) cm","L=lim_(t->6)H(t)"],lines:[{expressions:["L = lim_(t->6) ((t-6)(t+6))/(t-6)","L = lim_(t->6) ((t-6)(t-6))/(t-6)"],correct:"L = lim_(t->6) ((t-6)(t+6))/(t-6)",rules:["factor difference of squares","incorrectly square the repeated difference"],correct_rule:"factor difference of squares"},{expressions:["L = lim_(t->6) (t+6), for t!=6","L = lim_(t->6) (t-6), for t!=6"],correct:"L = lim_(t->6) (t+6), for t!=6",rules:["cancel the common nonzero factor","drop the t+6 factor"],correct_rule:"cancel the common nonzero factor"},{expressions:["L = 6+6 = 12 cm","L = 0 cm"],correct:"L = 6+6 = 12 cm",rules:["substitute t=6 after simplification","substitute into the canceled factor"],correct_rule:"substitute t=6 after simplification"}],answerText:"The predicted height approaches 12 cm near minute 6."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["H(t)=(t^2-36)/(t-6) cm", "L=lim_(t->6)H(t)"]
  start: "Begin with H(t)=(t^2-36)/(t-6) cm and L=lim_(t->6)H(t). Preserve L and the active limit on each transformation line."
  goal: "Cancel the false zero in the form and units requested by the prompt"
  left_side: "L"
  steps:
    - id: step_1
      doing: "factor difference of squares"
      candidates:
        - {text: "L = lim_(t->6) ((t-6)(t+6))/(t-6)", correct: true, rule: "factor difference of squares"}
        - {text: "L = lim_(t->6) ((t-6)(t-6))/(t-6)", correct: false, survives: true, rule: "incorrectly square the repeated difference", reason: "This common factoring mistake treats t^2-36 as (t-6)^2 instead of the difference of squares (t-6)(t+6)."}
    - id: step_2
      doing: "cancel common nonzero factor"
      candidates:
        - {text: "L = lim_(t->6) (t+6), for t!=6", correct: true, rule: "cancel the common nonzero factor"}
        - {text: "L = lim_(t->6) (t-6), for t!=6", correct: false, survives: true, rule: "drop the t+6 factor", reason: "This common cancellation mistake removes the wrong factor and loses the t+6 term that determines the nearby height."}
    - id: step_3
      doing: "direct substitution after simplification"
      candidates:
        - {text: "L = 6+6 = 12 cm", correct: true, rule: "substitute t=6 after simplification"}
        - {"text": "L = 6-6 = 0 cm", "correct": false, "survives": true, "rule": "substitute into the canceled factor", "reason": "The surviving factor is t+6, not t-6."}
```
**Correct result:** `12 cm`, exact.

**Answer text:** The logger's predicted height approaches 12 cm near minute 6.

**Why:** factor, cancel for `t != 6`, then substitute.

**Wrong-path feedback:** `0/0` is a signal to simplify, not an answer.

**State/output:** expected-trend tag `12 cm`; unlock 1.2.

## Stop 2 - Rationalize the float transform

**Format/placement:** DERIVE, at `level-desk`.

**Metadata:** Concept: 1 - radical limit; Keystone: Limits; Area: Storage & Level Board; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The height-limit check leaves a second possible fault in the float sensor's conversion rule.

**Question card story setup - exact player copy:** The float sensor uses A(h)=[sqrt(16+h)-4]/h for its level-change gain after displacement h. Substitution at h=0 gives the indeterminate form 0/0. Find L=lim_(h->0)A(h) to predict the gain during tiny float motions.

**Question card story-science connection - exact player copy:** The small-motion gain determines whether the float transform has a finite response despite its undefined displayed value at zero.

**Fixture source panel - exact player copy:** The float sensor uses A(h)=[sqrt(16+h)-4]/h for its level-change gain after displacement h. Substitution at h=0 gives the indeterminate form 0/0. Find L=lim_(h->0)A(h) to predict the gain during tiny float motions.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the unitless gain.

**Complete format-specific interaction block:** `derive: {left_side:"L",goal:"local gain",givens:["L = lim_(h->0) [sqrt(16+h)-4]/h"],lines:[{expressions:["L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}","L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)-4])/[h(sqrt(16+h)-4)]}"],correct:"L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}",rules:["multiply by the conjugate over itself","multiply by h over itself"],correct_rule:"multiply by the conjugate over itself"},{expressions:["L = lim_(h->0) 1/[sqrt(16+h)+4]","L = lim_(h->0) h/[sqrt(16+h)+4]"],correct:"L = lim_(h->0) 1/[sqrt(16+h)+4]",rules:["difference of squares and cancel h","cancel before forming the difference of squares"],correct_rule:"difference of squares and cancel h"},{expressions:["L = 1/[sqrt(16+0)+4] = 1/8","L = 1/4"],correct:"L = 1/[sqrt(16+0)+4] = 1/8",rules:["substitute h=0","drop the second term in the denominator"],correct_rule:"substitute h=0"}],answerText:"The local gain is 1/8."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The float sensor uses A(h)=[sqrt(16+h)-4]/h for its level-change gain after displacement h. Substitution at h=0 gives the indeterminate form 0/0. Find L=lim_(h->0)A(h) to predict the gain during tiny float motions.", "Let L=lim_(h->0)A(h)=lim_(h->0)[sqrt(16+h)-4]/h."]
  start: "Begin with L = lim_(h->0) [sqrt(16+h)-4]/h. Preserve L on the left of every line."
  goal: "Rationalize the float transform in the form and units requested by the prompt"
  left_side: "L"
  steps:
    - id: step_1
      doing: "conjugate"
      candidates:
        - {text: "L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}", correct: true, rule: "multiply by the conjugate over itself"}
        - {text: "L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)-4])/[h(sqrt(16+h)-4)]}", correct: false, survives: true, rule: "multiply by h over itself", reason: "Multiplying by h/h preserves the expression but leaves the indeterminate radical difference, a common detour instead of using the conjugate."}
    - id: step_2
      doing: "difference of squares and cancel h"
      candidates:
        - {text: "L = lim_(h->0) 1/[sqrt(16+h)+4]", correct: true, rule: "difference of squares and cancel h"}
        - {text: "L = lim_(h->0) h/[sqrt(16+h)+4]", correct: false, survives: true, rule: "cancel before forming the difference of squares", reason: "This common cancellation error leaves an extra h in the numerator after the difference of squares should produce exactly h."}
    - id: step_3
      doing: "substitute h=0"
      candidates:
        - {text: "L = 1/[sqrt(16+0)+4] = 1/8", correct: true, rule: "substitute h=0"}
        - {"text": "L = 1/[sqrt(16+0)-4] = 1/0, undefined", "correct": false, "survives": true, "rule": "drop the second term in the denominator", "reason": "The conjugate leaves a sum in the denominator, not the original difference."}
```
**Correct result:** `0.125`, tolerance `0.0005`.

**Answer text:** The local gain is 1/8.

**Why:** conjugate converts numerator product to `h`.

**Wrong-path feedback:** Substitution is valid only after the zero factor is removed.

**State/output:** calibration gain displayed; unlock 1.3.

## Stop 3 - Classify forecast breaks

**Format/placement:** DERIVE, at `storage-board`.

**Metadata:** Concept: 10 - rational-function asymptotes; Keystone: Limits; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L2; Story role: evidence.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The sensor checks are not enough to establish that the rival rainfall forecast behaves sensibly.

**Question card story setup - exact player copy:** A rival forecast gives rainfall rate R(t)=(3t^2+1)/(t^2-4) in millimetres per hour after t hours. Find where R grows without bound and what rate it approaches far from the current forecast window.

**Question card story-science connection - exact player copy:** The forecast's asymptotes identify times where its predictions fail and the rate implied far beyond the fitted window.

**Fixture source panel - exact player copy:** A rival forecast gives rainfall rate R(t)=(3t^2+1)/(t^2-4) in millimetres per hour after t hours. Find where R grows without bound and what rate it approaches far from the current forecast window. D(t)=t^2-4

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit both classifications.

**Complete format-specific interaction block:** `derive:{left_side:"forecast classification",goal:"vertical and horizontal asymptotes of R(t)",givens:["R(t)=(3t^2+1)/(t^2-4)","D(t)=t^2-4"],lines:[{expressions:["vertical asymptotes: t=-2 and t=2","vertical asymptotes: t=-4 and t=4"],correct:"vertical asymptotes: t=-2 and t=2",rules:["solve D(t)=0","set t equal to the constant term"],correct_rule:"solve D(t)=0"},{expressions:["horizontal asymptote: R=3","horizontal asymptote: R=0"],correct:"horizontal asymptote: R=3",rules:["use the ratio of leading coefficients","use the ratio of constant terms"],correct_rule:"use the ratio of leading coefficients"}],answerText:"The model has vertical asymptotes at t=-2 and t=2 and a horizontal asymptote at R=3 mm/h."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["R(t)=(3t^2+1)/(t^2-4)", "D(t)=t^2-4"]
  start: "Begin with R(t)=(3t^2+1)/(t^2-4) and D(t)=t^2-4. State the quantity being classified on the left of each result."
  goal: "Classify the rival forecast's vertical and horizontal asymptotes"
  left_side: "forecast classification"
  steps:
    - id: step_1
      doing: "solve D(t)=0 for vertical asymptotes"
      candidates:
        - {text: "vertical asymptotes: t=-2 and t=2", correct: true, rule: "solve D(t)=0"}
        - {text: "vertical asymptotes: t=-4 and t=4", correct: false, survives: true, rule: "set t equal to the constant term", reason: "This common mistake reads the 4 from t^2-4 without solving t^2=4 and therefore misses both square roots."}
    - id: step_2
      doing: "compare leading coefficients for the horizontal asymptote"
      candidates:
        - {text: "horizontal asymptote: R=3", correct: true, rule: "use the ratio of leading coefficients"}
        - {text: "horizontal asymptote: R=0", correct: false, survives: true, rule: "use the ratio of constant terms", reason: "This common mistake ignores the equal-degree leading terms that control the rational function's long-run value."}
```

**Correct result:** vertical asymptotes at `t=-2` and `t=2`; horizontal asymptote `R=3 mm/h`.

**Answer text:** The rival model becomes unbounded at t=2 h in the operating window, so the crew rejects it despite its finite horizontal asymptote.

**Why:** Denominator zeros identify uncancelled vertical breaks, and equal-degree leading coefficients determine the horizontal asymptote.

**Wrong-path feedback:** Solve the full denominator equation for vertical asymptotes, and use leading terms rather than constant terms for long-run behavior.

**State/output:** physically impossible rival forecast rejected; unlock 1.4.

## Stop 4 - Certify continuity

**Format/placement:** DIAGNOSIS, at `storage-board`.

**Metadata:** Concept: 2 - piecewise continuity/IVT/discontinuities; Keystone: Limits; Area: Storage & Level Board; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The crew has enough nearby evidence to decide whether the logged spike requires abandoning the local forecast.

**Question card story setup - exact player copy:** The left and right traces now both approach 4.20 m, while the logger stores 4.68 m at 09:06. Diagnose the discontinuity and decide whether redefining that single value makes the local forecast continuous.

**Question card story-science connection - exact player copy:** The agreement of the two one-sided limits determines whether correcting one stored height can restore continuity.

**Question card prompt - exact player copy:** Select the one diagnosis that fits every reading and submit a conclusion: use or reject the repaired local forecast.

**Complete format-specific interaction block:** `diagnosis:{headline:"09:06 continuity test",readings:[{zone:"left",value:"4.20 m"},{zone:"right",value:"4.20 m"},{zone:"stored value",value:"4.68 m"},{zone:"nearby sensor",value:"smooth"}],choices:[{label:"removable hole; redefine f(09:06)=4.20 m",mechanism:"common limit exists but stored value differs"},{label:"jump",mechanism:"would require unequal side limits"},{label:"infinite break",mechanism:"would require unbounded values"},{label:"continuous as stored",mechanism:"fails limit=value"}],answer:"removable hole; redefine f(09:06)=4.20 m"}`

**Correct result:** repair and use locally.

**Answer text:** Left limit = right limit = `4.20 m`; after redefining the point, all three continuity conditions hold.

**Why:** matching side limits establish existence; IVT may then support intermediate values locally.

**Wrong-path feedback:** A defined point alone does not make a function continuous.

**State/output:** repaired trace persists; unlock outcome.

## Mission outcome

Mission decision: Use the repaired local forecast. Both sides approach 4.20 m, so the lone high point is a fixable hole. The crew restores that point, and keeps the surrounding rise. The rise is smooth.

**Segue - exact player copy:** But Mara sees the line still climb on both sides; the next alarm must watch how fast it rises.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Imani Okoro circles the repaired point marked 4.20 M on the trace. But Mara sees the line still climb on both sides; the next alarm must watch how fast it rises.

**Header:** MISSION 1 COMPLETE  
**Timer:** TIME `{elapsed}` / TARGET `16:00`  
**Accuracy:** INCORRECT SUBMISSIONS `{incorrect_submissions}`  
**Story event:** The smooth forecast fails its first limit check and is repaired.  
**Automatic bar change:** SAFE STORAGE `+3`  
**Recovery Point line:** `RP = clamp(4,12,11 + time_modifier - incorrect submissions)`  
**Allocation prompt:** Spend each point to raise one unlocked bar by 1%, or bank up to 30.  
**Canonical QA:** start `40/50/60/70`, auto -> `43/50/60/70`, award 12, allocate 8 Safe Storage and 4 Downstream -> `51/54/60/70`, bank 0.  
**Failure:** any bar at 0 restores the Day-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Let f(t)=(t²-36)/(t-6) for t≠6. What is the limit of f(t) as t approaches 6?

**Options - exact player copy:**

- A. 0.
- B. 12.
- C. 6.
- D. The limit does not exist because f(6) is undefined.

**Correct answer:** B

**Hint - exact player copy:** Factor the numerator and simplify for t≠6.

**Option feedback - exact player copy:**

- A: Both numerator and denominator approach zero, but their ratio need not approach zero.
- B: Correct. 12.
- C: After cancellation the expression is t+6, not t.
- D: A limit depends on nearby values; f need not be defined at the point.

### Review question 2


**Prompt - exact player copy:** For t≠6, f(t)=(t²-36)/(t-6). Which choice of f(6) makes f continuous at t=6?

**Options - exact player copy:**

- A. f(6)=0.
- B. f(6)=6.
- C. f(6)=12.
- D. No value can make f continuous.

**Correct answer:** C

**Hint - exact player copy:** A continuous function equals its limit at the point.

**Option feedback - exact player copy:**

- A: The nearby values approach 12, not 0.
- B: The simplified nearby expression is t+6.
- C: Correct. f(6)=12.
- D: The common one-sided limit exists, so assigning that value removes the hole.

### Review question 3


**Prompt - exact player copy:** Let f(t)=(t²-36)/(t-6) for t≠6. Which method evaluates the limit as t approaches 6?

**Options - exact player copy:**

- A. The value a function approaches as its input nears a point.
- B. Having a defined value that equals the common left and right limit.
- C. Conjugate converts numerator product to h.
- D. Factor t²-36 as (t-6)(t+6), cancel for t≠6, and evaluate t+6 at 6.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for rational limit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes limit. It does not answer the question about rational limit.
- B: This describes continuous. It does not answer the question about rational limit.
- C: This describes radical limit. It does not answer the question about rational limit.
- D: Correct. Factor t²-36 as (t-6)(t+6), cancel for t≠6, and evaluate t+6 at 6.

### Review question 4


**Prompt - exact player copy:** Let g(h)=[√(16+h)-4]/h for h≠0. Which step removes the indeterminate form when finding the limit as h approaches 0?

**Options - exact player copy:**

- A. Multiply numerator and denominator by √(16+h)+4; the numerator becomes h, which cancels for h≠0.
- B. The value a function approaches as its input nears a point.
- C. Having a defined value that equals the common left and right limit.
- D. Factor, cancel for t != 6, then substitute.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for radical limit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Multiply numerator and denominator by √(16+h)+4; the numerator becomes h, which cancels for h≠0.
- B: This describes limit. It does not answer the question about radical limit.
- C: This describes continuous. It does not answer the question about radical limit.
- D: This describes rational limit. It does not answer the question about radical limit.

### Review question 5


**Prompt - exact player copy:** For F(t)=(2t²+1)/(t²-9), which are the vertical and horizontal asymptotes?

**Options - exact player copy:**

- A. Vertical: t=9; horizontal: F=1/9.
- B. Vertical: t=-3 and t=3; horizontal: F=2.
- C. Vertical: t=-3 and t=3; horizontal: F=0.
- D. Vertical: t=3 only; horizontal: F=2.

**Correct answer:** B

**Hint - exact player copy:** Check whether either denominator factor cancels.

**Option feedback - exact player copy:**

- A: Solve t²-9=0 and compare the leading coefficients.
- B: Correct. Vertical: t=-3 and t=3; horizontal: F=2.
- C: Equal-degree polynomials approach the ratio of leading coefficients, which is 2.
- D: Both roots of t²=9 cause uncancelled denominator zeros.

### Review question 6


**Prompt - exact player copy:** A function has left and right limits of 4.20 at t=6 but f(6)=4.68. Which change makes it continuous at t=6?

**Options - exact player copy:**

- A. The value a function approaches as its input nears a point.
- B. Having a defined value that equals the common left and right limit.
- C. Set f(6)=4.20, equal to the common one-sided limit.
- D. Factor, cancel for t != 6, then substitute.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for piecewise continuity and ivt and discontinuities. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes limit. It does not answer the question about piecewise continuity and ivt and discontinuities.
- B: This describes continuous. It does not answer the question about piecewise continuity and ivt and discontinuities.
- C: Correct. Set f(6)=4.20, equal to the common one-sided limit.
- D: This describes rational limit. It does not answer the question about piecewise continuity and ivt and discontinuities.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- Simplify `0/0` before evaluating a limit.
- Continuity needs existence, a defined value, and equality.
- **Mission takeaway:** Use limits to repair removable holes and asymptotes to reject models with impossible breaks.

---

# Mission 2 - Faster Than the Line

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 2 - 14 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Faster Than the Gauge  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the trace bench.  
**Card body:** 14 work shifts remain before the storm. The next tick on the level chart runs above the ruler. Today you decide when a faster rise needs an alarm.
**Objective:** Set a defensible reservoir-rise alarm.

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
  - id: headwater_m02_we01
    title: Use the derivative definition
    problem: Find f′(2) for f(x)=x².
    rule: f′(a)=lim(h→0)[f(a+h)-f(a)]/h.
    steps:
    - 'Set up the relationship: f′(a)=lim(h→0)[f(a+h)-f(a)]/h.'
    - f′(2)=lim(h→0)[(2+h)²-4]/h=lim(h→0)(4+h)=4.
    answer: The instantaneous slope at x=2 is 4.
    common_mistake: Subtract the entire original function value before dividing by h.
  - id: headwater_m02_we02
    title: Differentiate a polynomial
    problem: For f(x)=2x³-4x+5, find f′(1).
    rule: d(x^n)/dx=n x^(n-1); a constant has derivative zero.
    steps:
    - 'Set up the relationship: d(x^n)/dx=n x^(n-1); a constant has derivative zero.'
    - f′(x)=6x²-4, so f′(1)=6-4=2.
    answer: The slope at x=1 is 2.
    common_mistake: The derivative of the constant 5 is zero, not 5.
  - id: headwater_m02_we03
    title: Write a tangent line
    problem: For f(x)=x², write the tangent line at x=2.
    rule: L(x)=f(a)+f′(a)(x-a).
    steps:
    - 'Set up the relationship: L(x)=f(a)+f′(a)(x-a).'
    - f(2)=4 and f′(2)=4, so L(x)=4+4(x-2)=4x-4.
    answer: The tangent line is y=4x-4.
    common_mistake: The tangent line must pass through (2,4), not necessarily the origin.
  - id: headwater_m02_we04
    title: Differentiate a product
    problem: Find y′ when y=x²(x+1).
    rule: If y=uv, then y′=u′v+uv′.
    steps:
    - 'Set up the relationship: If y=uv, then y′=u′v+uv′.'
    - y′=2x(x+1)+x²(1)=3x²+2x.
    answer: The derivative is 3x²+2x.
    common_mistake: Multiplying the two derivatives omits both required product terms.
  - id: headwater_m02_we05
    title: Differentiate a ratio
    problem: Find y′ for y=x/(x+1), where x≠-1.
    rule: If y=u/v, then y′=(u′v-uv′)/v².
    steps:
    - 'Set up the relationship: If y=u/v, then y′=(u′v-uv′)/v².'
    - y′=[1(x+1)-x(1)]/(x+1)²=1/(x+1)².
    answer: The derivative is 1/(x+1)².
    common_mistake: Keep the subtraction order and square the denominator.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**Why this campaign needs it:** a short-term level estimate can trigger action before the next full forecast.

## Main story happening - designer summary

The player replaces a height-only alarm with a derivative-and-tangent trigger.

## Learning and dramatic intent

Make derivative definition, rules, and linearization one causal warning chain.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `trace-bench` | automatic**

**Trigger:** mission_2_arrival.

**World state:** The next tick on the level chart runs above the ruler.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with build the instantaneous rise. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 5 | `gauge-wall` | automatic**

**Trigger:** accepted_stop_5.

**World state:** At `trace-bench`, the dated accepted-result slip for Stop 5 reads: "0.12 m/h, tolerance 0.001.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "That check holds. The reservoir rise rate is known, but the incoming storm flow may itself be accelerating."

**Unlocks/waypoint:** Unlock Stop 6 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 3 - After Stop 6 | `trace-bench` | automatic**

**Trigger:** accepted_stop_6.

**World state:** At `gauge-wall`, the dated accepted-result slip for Stop 6 reads: "89.509 (m^3/s)/h, tolerance 0.01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "That check holds. The changing inflow must now be combined with discharge without mixing rates and stored amounts."

**Unlocks/waypoint:** Unlock Stop 7 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 7 | `gauge-wall` | automatic**

**Trigger:** accepted_stop_7.

**World state:** At `trace-bench`, the dated accepted-result slip for Stop 7 reads: "exact pair.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "That check holds. The verified height and rise rate are ready to support a near-term alarm commitment."

**Unlocks/waypoint:** Unlock Stop 8 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**Trigger:** accepted_stop_8.

**World state:** At `storage-board`, Mara Vale pins the rate-alarm card beside the water curve. The dated prop remains here on later visits.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "We bought time by watching the slope. Therefore Tomas needs a gate chart that turns the rising level into a release; the old handle marks are not enough."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m02

**Home:** `storage-board`. **Before:** The dated mission-2 evidence holder at this fixture has no accepted record. The next tick on the level chart runs above the ruler.
**After — exact action:** Mara Vale pins the rate-alarm card beside the water curve.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `discharge-board`, fresh grease marks stop short of an old notch on the hoist scale.
**Segue - exact player copy:** Therefore Tomas needs a gate chart that turns the rising level into a release; the old handle marks are not enough.

## Location plan

INFLOW only; gauge wall and trace bench hold all rate evidence.

## Characters and dramatic beat

Imani shifts from defending height thresholds to accepting rate-based warning.

## Key concepts, explained here

derivative limit, power/product/quotient/trig/exp rules, tangent line, linear approximation.

## Stop 5 - Build the instantaneous rise

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: 3 - derivative definition; Keystone: Derivative as rate; Area: Gate House; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** A safe present height can hide a rapidly rising reservoir as the storm approaches.

**Question card story setup - exact player copy:** The level model near hour 2 is H(t)=0.03t^2+4.00 metres, and the current height alone looks safe. Build the difference quotient at t=2 to expose how fast the level is changing now.

**Question card story-science connection - exact player copy:** The instantaneous height derivative establishes the current rise rate needed for the next short-term warning prediction.

**Fixture source panel - exact player copy:** The level model near hour 2 is H(t)=0.03t^2+4.00 metres, and the current height alone looks safe. Build the difference quotient at t=2 to expose how fast the level is changing now.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit a rate in metres per hour.

**Complete format-specific interaction block:** `derive:{left_side:"H'(2)",goal:"H'(2)",givens:["H(t)=0.03t^2+4.00 m","t=2 h"],lines:[{expressions:["H'(2) = lim h->0 [H(2+h)-H(2)]/h","lim h->0 [H(2+h)-H(2)]/2"],correct:"H'(2) = lim h->0 [H(2+h)-H(2)]/h",rules:["derivative definition","average height"],correct_rule:"derivative definition"},{expressions:["H'(2) = lim h->0 [0.12h+0.03h^2]/h","lim h->0 [0.12h-0.03h^2]/h"],correct:"H'(2) = lim h->0 [0.12h+0.03h^2]/h",rules:["expand and subtract","power rule"],correct_rule:"expand and subtract"},{expressions:["H'(2) = lim h->0 (0.12+0.03h)","lim h->0 (0.12-0.03h)"],correct:"H'(2) = lim h->0 (0.12+0.03h)",rules:["cancel h for h!=0","set h=0 too early"],correct_rule:"cancel h for h!=0"},{expressions:["H'(2) = 0.12 m/h","H'(2) = 0.06 m/h"],correct:"H'(2) = 0.12 m/h",rules:["evaluate limit","divide height by time"],correct_rule:"evaluate limit"}],answerText:"At hour 2 the level rises at 0.12 m/h."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["H(t)=0.03t^2+4.00 m", "t=2 h"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Build the instantaneous rise in the form and units requested by the prompt"
  left_side: "H'(2)"
  steps:
    - id: step_1
      doing: "derivative definition"
      candidates:
        - {text: "H'(2) = lim h->0 [H(2+h)-H(2)]/h", correct: true, rule: "derivative definition"}
        - {text: "lim h->0 [H(2+h)-H(2)]/2", correct: false, survives: true, rule: "average height", reason: "This is the common average height mistake; it does not perform the licensed derivative definition step."}
    - id: step_2
      doing: "expand and subtract"
      candidates:
        - {text: "H'(2) = lim h->0 [0.12h+0.03h^2]/h", correct: true, rule: "expand and subtract"}
        - {text: "lim h->0 [0.12h-0.03h^2]/h", correct: false, survives: true, rule: "power rule", reason: "This is the common power rule mistake; it does not perform the licensed expand and subtract step."}
    - id: step_3
      doing: "cancel h for h!=0"
      candidates:
        - {text: "H'(2) = lim h->0 (0.12+0.03h)", correct: true, rule: "cancel h for h!=0"}
        - {text: "lim h->0 (0.12-0.03h)", correct: false, survives: true, rule: "set h=0 too early", reason: "This is the common set h=0 too early mistake; it does not perform the licensed cancel h for h!=0 step."}
    - id: step_4
      doing: "evaluate limit"
      candidates:
        - {text: "H'(2) = 0.12 m/h", correct: true, rule: "evaluate limit"}
        - {text: "H'(2) = 0.06 m/h", correct: false, survives: true, rule: "divide height by time", reason: "This is the common divide height by time mistake; it does not perform the licensed evaluate limit step."}
```
**Correct result:** `0.12 m/h`, tolerance `0.001`.

**Answer text:** At hour 2 the level rises at 0.12 m/h.

**Why:** limit of secant slopes.

**Wrong-path feedback:** Average height is not instantaneous change.

**State/output:** live rate field; unlock 2.2.

## Stop 6 - Differentiate the forecast signal

**Format/placement:** DERIVE, at `gauge-wall`.

**Metadata:** Concept: 4 - power/trig/exp/chain; Keystone: Differentiation rules; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The reservoir rise rate is known, but the incoming storm flow may itself be accelerating.

**Question card story setup - exact player copy:** The forecast is I(t)=120+8t^3+20sin(t)+15e^(0.1t) cubic metres per second. Differentiate every term so the panel can show whether inflow itself is rising at hour 2.

**Question card story-science connection - exact player copy:** The inflow derivative determines how quickly the arriving water rate is changing at the forecast hour.

**Fixture source panel - exact player copy:** The forecast is I(t)=120+8t^3+20sin(t)+15e^(0.1t) cubic metres per second. Differentiate every term so the panel can show whether inflow itself is rising at hour 2.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit cubic metres per second per hour.

**Complete format-specific interaction block:** `derive:{left_side:"I'(2)",goal:"I'(2)",givens:["I(t)=120+8t^3+20sin t+15e^(0.1t)"],lines:[{expressions:["I'(t) = 24t^2+20cos t+1.5e^(0.1t)","I'(2) = 8t^2-20sin t+15e^(0.1t)"],correct:"I'(t) = 24t^2+20cos t+1.5e^(0.1t)",rules:["sum, power, trig, exponential chain rules","product rule only"],correct_rule:"sum, power, trig, exponential chain rules"},{expressions:["I'(2) = 24(2)^2+20cos(2)+1.5e^(0.2) = 89.509 (m^3/s)/h","I'(2) = 96.000"],correct:"I'(2) = 24(2)^2+20cos(2)+1.5e^(0.2) = 89.509 (m^3/s)/h",rules:["substitute t=2 radians","drop non-polynomial terms"],correct_rule:"substitute t=2 radians"}],answerText:"I'(2)=89.509 (m^3/s)/h, so inflow is rising quickly."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["I(t)=120+8t^3+20sin t+15e^(0.1t)"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Differentiate the forecast signal in the form and units requested by the prompt"
  left_side: "I'(2)"
  steps:
    - id: step_1
      doing: "sum, power, trig, exponential chain rules"
      candidates:
        - {text: "I'(t) = 24t^2+20cos t+1.5e^(0.1t)", correct: true, rule: "sum, power, trig, exponential chain rules"}
        - {text: "I'(2) = 8t^2-20sin t+15e^(0.1t)", correct: false, survives: true, rule: "product rule only", reason: "This is the common product rule only mistake; it does not perform the licensed sum, power, trig, exponential chain rules step."}
    - id: step_2
      doing: "substitute t=2 radians"
      candidates:
        - {text: "I'(2) = 24(2)^2+20cos(2)+1.5e^(0.2) = 89.509 (m^3/s)/h", correct: true, rule: "substitute t=2 radians"}
        - {"text": "I'(2) = 24(2)^2+20cos(2)+15e^(0.2) = 105.998 (m^3/s)/h", "correct": false, "survives": true, "rule": "drop non-polynomial terms", "reason": "Differentiating the exponential requires the inner derivative 0.1 as well as its original coefficient."}
```
**Correct result:** `89.509 (m^3/s)/h`, tolerance `0.01`.

**Answer text:** I'(2)=89.509 (m^3/s)/h, so inflow is rising quickly.

**Why:** `96+20cos2+1.5e^.2=89.509`.

**Wrong-path feedback:** `d(e^(0.1t))/dt` includes `0.1`.

**State/output:** rate lamp amber; unlock 2.3.

## Stop 7 - Protect the net-rise calculation

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: 5 - product/quotient rules; Keystone: Differentiation rules; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The changing inflow must now be combined with discharge without mixing rates and stored amounts.

**Question card story setup - exact player copy:** Derive both rates before combining them into net storage change.

**Question card story-science connection - exact player copy:** The two differentiated terms establish the net storage-change rate that governs whether the reservoir is gaining water.

**Fixture source panel - exact player copy:** Derive both rates before combining them into net storage change. J=cI Q=P/H

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the ordered expression pair.

**Complete format-specific interaction block:** `derive:{left_side:"R",goal:"(J',Q')",givens:["J=cI","Q=P/H"],lines:[{expressions:["J' = c'I+cI'","R = c'I'+cI'"],correct:"J' = c'I+cI'",rules:["product rule","chain rule"],correct_rule:"product rule"},{expressions:["Q' = (P'H-PH')/H^2","R = (P'H'-PH')/(H')^2"],correct:"Q' = (P'H-PH')/H^2",rules:["quotient rule","ratio of derivatives"],correct_rule:"quotient rule"}],answerText:"J'=c'I+cI' and Q'=(P'H-PH')/H^2."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["J=cI", "Q=P/H"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Protect the net-rise calculation in the form and units requested by the prompt"
  left_side: "R"
  steps:
    - id: step_1
      doing: "product rule"
      candidates:
        - {text: "J' = c'I+cI'", correct: true, rule: "product rule"}
        - {text: "R = c'I'+cI'", correct: false, survives: true, rule: "chain rule", reason: "This is the common chain rule mistake; it does not perform the licensed product rule step."}
    - id: step_2
      doing: "quotient rule"
      candidates:
        - {text: "Q' = (P'H-PH')/H^2", correct: true, rule: "quotient rule"}
        - {text: "R = (P'H'-PH')/(H')^2", correct: false, survives: true, rule: "ratio of derivatives", reason: "This is the common ratio of derivatives mistake; it does not perform the licensed quotient rule step."}
```
**Correct result:** exact pair.

**Answer text:** J'=c'I+cI' and Q'=(P'H-PH')/H^2.

**Why:** both changing factors contribute.

**Wrong-path feedback:** A product's derivative is not the product of derivatives.

**State/output:** net-rate formula saved; unlock 2.4.

## Stop 8 - Set the tangent alarm

**Format/placement:** TRIGGER, at `gauge-wall`.

**Metadata:** Concept: 9 - tangent line/linear approximation; Keystone: Derivative as rate; Area: Gate House; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The verified height and rise rate are ready to support a near-term alarm commitment.

**Question card story setup - exact player copy:** The verified level is 4.20 m at 10:00, and the current derivative is 0.12 m/h. Use the tangent line to predict 10:15, then commit an inclusive alarm threshold before the update appears.

**Question card story-science connection - exact player copy:** The tangent prediction and frozen threshold determine whether the next level update requires an alarm.

**Question card prompt - exact player copy:** Calculate L(0.25)=4.20+(0.12)(0.25) and submit the predicted level in metres; then commit RISING FAST if measured level is at least that value.

**Complete format-specific interaction block:** `trigger:{decision_rule:"RISING FAST if measured 10:15 level >= committed tangent prediction",scale:{min:4.18,max:4.28,step:0.001,unit:"m"},anchors:[4.20,4.23,4.26],objective:"detect a rise at least as fast as current derivative",direction:"at or above",consequence_limit:"do not change release until warning review"}`; update reveals `4.235 m`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 8 - Set the tangent alarm"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Calculate L(0.25)=4.20+(0.12)(0.25) and submit the predicted level in metres; then commit RISING FAST if measured level is at least that value."
  payload: "`trigger:{decision_rule:\"RISING FAST if measured 10:15 level >= committed tangent prediction\",scale:{min:4.18,max:4.28,step:0.001,unit:\"m\"},anchors:[4.20,4.23,4.26],objective:\"detect a rise at least as fast as current derivative\",direction:\"at or above\",consequence_limit:\"do not change release until warning review\"}`; update reveals `4.235 m`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "predicted water level", min: 4.18, max: 4.28, step: 0.001, unit: "m"}
  start: 4.2
  anchors:
    - {at: 4.2, means: "routine baseline, not the decision threshold"}
    - {at: 4.245, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 4.2, hoursLeft: 48}
    - {at: "T-24 h", value: 4.22, hoursLeft: 24}
    - {at: "T-12 h", value: 4.235, hoursLeft: 12}
    - {at: "T-6 h", value: 4.26, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 4.18, max: 4.229}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 4.23, max: 4.28}, leadHours: 12}
  question: "Calculate L(0.25)=4.20+(0.12)(0.25) and submit the predicted level in metres; then commit RISING FAST if measured level is at least that value."
```

**Correct result:** prediction `4.230 m`, tolerance `0.001`; trigger fires.

**Answer text:** `4.20+0.12(0.25)=4.230 m`; `4.235 >= 4.230`, so the rising-fast condition is met.

**Why:** `4.20+0.12(0.25)=4.230 m`; `4.235 >= 4.230`, so the rising-fast condition is met. A precommitted threshold prevents the crew from moving the rule after seeing the data.

**Wrong-path feedback:** Multiply the hourly rate by `0.25 h`, not 15.

**State/output:** rate alarm set; delivery piece 2 pinned.

## Mission outcome

Mission decision: Set the new rate alarm at the tangent prediction. The next reading is above 4.230 m, so the reservoir is rising faster than the current local trend. The crew starts an early watch. A gate chart must now turn level change into release change.

**Segue - exact player copy:** Therefore Tomas needs a gate chart that turns the rising level into a release; the old handle marks are not enough.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mara Vale pins the rate-alarm card beside the water curve. Therefore Tomas needs a gate chart that turns the rising level into a release; the old handle marks are not enough.

**Story event - exact player copy:** The early rate alarm activates before the reservoir crosses the old height warning.

TARGET `17:00`; automatic `OPERATING RESERVE +3`; canonical QA enter `53/52/62/72`, auto `53/52/65/72`, award 12, allocate 7 Safe Storage and 5 Downstream -> `60/57/65/72`; standard RP text and zero-bar restore apply.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains derivative?

**Options - exact player copy:**

- A. A line matching a curve's value and slope at one point.
- B. Limit of secant slopes.
- C. 96+20cos2+1.5e^.2=89.509.
- D. Instantaneous output change per unit input change.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for derivative. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes tangent line. It does not answer the question about derivative.
- B: This describes derivative definition. It does not answer the question about derivative.
- C: This describes differentiating sums of polynomial, trigonometric, and exponential terms. It does not answer the question about derivative.
- D: Correct. Instantaneous output change per unit input change.

### Review question 2


**Prompt - exact player copy:** Which statement best explains tangent line?

**Options - exact player copy:**

- A. A line matching a curve's value and slope at one point.
- B. Instantaneous output change per unit input change.
- C. Limit of secant slopes.
- D. 96+20cos2+1.5e^.2=89.509.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for tangent line. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. A line matching a curve's value and slope at one point.
- B: This describes derivative. It does not answer the question about tangent line.
- C: This describes derivative definition. It does not answer the question about tangent line.
- D: This describes differentiating sums of polynomial, trigonometric, and exponential terms. It does not answer the question about tangent line.

### Review question 3


**Prompt - exact player copy:** Which statement best explains derivative definition?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. Limit of secant slopes.
- C. A line matching a curve's value and slope at one point.
- D. 96+20cos2+1.5e^.2=89.509.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for derivative definition. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes derivative. It does not answer the question about derivative definition.
- B: Correct. Limit of secant slopes.
- C: This describes tangent line. It does not answer the question about derivative definition.
- D: This describes differentiating sums of polynomial, trigonometric, and exponential terms. It does not answer the question about derivative definition.

### Review question 4


**Prompt - exact player copy:** For I(t)=120+8t³+20sin(t)+15e^(0.1t), with angles in radians, which value equals I′(2)?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. A line matching a curve's value and slope at one point.
- C. 96+20cos(2)+1.5e^0.2≈89.509.
- D. Limit of secant slopes.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for differentiating sums of polynomial, trigonometric, and exponential terms. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes derivative. It does not answer the question about differentiating sums of polynomial, trigonometric, and exponential terms.
- B: This describes tangent line. It does not answer the question about differentiating sums of polynomial, trigonometric, and exponential terms.
- C: Correct. 96+20cos(2)+1.5e^0.2≈89.509.
- D: This describes derivative definition. It does not answer the question about differentiating sums of polynomial, trigonometric, and exponential terms.

### Review question 5


**Prompt - exact player copy:** Two differentiable functions c(t) and I(t) both change with time. For J(t)=c(t)I(t), which rule gives J′(t)?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. A line matching a curve's value and slope at one point.
- C. Limit of secant slopes.
- D. J′(t)=c′(t)I(t)+c(t)I′(t); both changing factors contribute.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for product and quotient rules. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes derivative. It does not answer the question about product and quotient rules.
- B: This describes tangent line. It does not answer the question about product and quotient rules.
- C: This describes derivative definition. It does not answer the question about product and quotient rules.
- D: Correct. J′(t)=c′(t)I(t)+c(t)I′(t); both changing factors contribute.

### Review question 6


**Prompt - exact player copy:** A tank's level is H(0)=4.20 m and H′(0)=0.12 m/h. An alarm is set to fire when the reading at 0.25 h meets or exceeds the tangent prediction. A reading of 4.235 m arrives. Which conclusion follows?

**Options - exact player copy:**

- A. The tangent prediction is 4.230 m, so 4.235 m triggers the alarm.
- B. Instantaneous output change per unit input change.
- C. A line matching a curve's value and slope at one point.
- D. Limit of secant slopes.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for tangent line and linear approximation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The tangent prediction is 4.230 m, so 4.235 m triggers the alarm.
- B: This describes derivative. It does not answer the question about tangent line and linear approximation.
- C: This describes tangent line. It does not answer the question about tangent line and linear approximation.
- D: This describes derivative definition. It does not answer the question about tangent line and linear approximation.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- A derivative is a limit of average rates.
- Product and quotient rules include every changing part.
- **Mission takeaway:** Linear approximation uses a value and local slope.

---

# Mission 3 - The Gate That Comes Back

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 3 - 13 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** One Motion, Three Changes  
**Go now:** Go to Gate House and meet Tomas Wilkes, gate mechanic, at the discharge board.  
**Card body:** 13 work shifts remain before the storm. Fresh grease marks stop short of an old notch on the hoist scale. Today you decide which gate setting can be tested and restored.
**Objective:** Map and certify the gate's changing response.

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
  - id: headwater_m03_we01
    title: Differentiate a nested power
    problem: Find y′ for y=(2x+1)³.
    rule: The chain rule multiplies the outer derivative by the inner derivative.
    steps:
    - 'Set up the relationship: The chain rule multiplies the outer derivative by the inner derivative.'
    - y′=3(2x+1)²(2)=6(2x+1)².
    answer: The extra factor 2 comes from differentiating 2x+1.
    common_mistake: Do not drop the derivative of the inside expression.
  - id: headwater_m03_we02
    title: Differentiate an exponential
    problem: Find y′(0) for y=4e^(2x).
    rule: d(e^(kx))/dx=k e^(kx).
    steps:
    - 'Set up the relationship: d(e^(kx))/dx=k e^(kx).'
    - y′(x)=8e^(2x), so y′(0)=8e^0=8.
    answer: The slope at zero is 8.
    common_mistake: The exponent coefficient multiplies the derivative.
  - id: headwater_m03_we03
    title: Find a slope on a circle
    problem: For x²+y²=25, find dy/dx at (3,4).
    rule: Differentiate both sides in x, treating y as a function of x.
    steps:
    - 'Set up the relationship: Differentiate both sides in x, treating y as a function of x.'
    - 2x+2y(dy/dx)=0, so dy/dx=-x/y=-3/4.
    answer: The tangent slope at (3,4) is -3/4.
    common_mistake: The derivative of y² is 2y(dy/dx), not just 2y.
  - id: headwater_m03_we04
    title: Differentiate an inverse
    problem: A differentiable function has f(2)=5 and f′(2)=4. Find (f inverse)′(5).
    rule: (f inverse)′(f(a))=1/f′(a), when the inverse exists locally and f′(a)≠0.
    steps:
    - 'Set up the relationship: (f inverse)′(f(a))=1/f′(a), when the inverse exists locally and f′(a)≠0.'
    - (f inverse)′(5)=1/f′(2)=1/4.
    answer: The inverse slope at output 5 is 1/4.
    common_mistake: Use the matching original input 2, not f′(5).
  - id: headwater_m03_we05
    title: Differentiate implicitly twice
    problem: For x²+y²=25 near (0,5), find y″.
    rule: First y′=-x/y; differentiating 2x+2yy′=0 gives 2+2(y′)²+2yy″=0.
    steps:
    - 'Set up the relationship: First y′=-x/y; differentiating 2x+2yy′=0 gives 2+2(y′)²+2yy″=0.'
    - At (0,5), y′=0, so y″=-[1+0²]/5=-1/5.
    answer: The curve is concave down there.
    common_mistake: The product yy′ requires a product rule on the second differentiation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Chain rule: differentiate an outside function, then multiply by the derivative of its inside.

Implicit relation: an equation connecting variables without isolating one.

Inverse function: a function that reverses another function.

#### Primer concepts

- nested changes multiply; treat `y` as a function when differentiating in `x`; an inverse derivative is the reciprocal derivative at the matching input.

#### Equations first needed today
**Equation:** `d[f(g(x))]/dx=f'(g(x))g'(x)`

**What it is for:** differentiating nested functions.

**Symbols:** `f` is outer, `g` inner, and primes are derivatives.

**Why this campaign needs it:** head changes act through a nonlinear discharge law.

**Equation:** `(f^-1)'(a)=1/f'(f^-1(a))`

**What it is for:** finding sensitivity of a reversed calibration.

**Symbols:** `a` is output and `f^-1(a)` its matching input.

**Why this campaign needs it:** operators enter desired flow and need the required opening.

## Main story happening - designer summary

Three linked derivative views produce and physically verify a reversible gate calibration.

## Learning and dramatic intent

Teach chain, implicit, second implicit, and inverse differentiation as linked mechanisms.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Gate House | `discharge-board` | automatic**

**Trigger:** mission_3_arrival.

**World state:** Fresh grease marks stop short of an old notch on the hoist scale.

**Panel/HUD text:** MISSION 3: DIFFERENTIATE NESTED DISCHARGE OPEN

**Dialogue bubbles -** Tomas Wilkes: "Start with differentiate nested discharge. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `discharge-board` in Gate House.

**Beat 2 - After Stop 9 | `discharge-board` | automatic**

**Trigger:** accepted_stop_9.

**World state:** At `discharge-board`, the dated accepted-result slip for Stop 9 reads: "exact.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The discharge response must account for the mechanical linkage between gate opening and water head."

**Unlocks/waypoint:** Unlock Stop 10 at `discharge-board` in Gate House.

**Beat 3 - After Stop 10 | `hoist-stand` | automatic**

**Trigger:** accepted_stop_10.

**World state:** At `discharge-board`, the dated accepted-result slip for Stop 10 reads: "-0.6667, tolerance .001.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The linkage's current slope is known, but its change may narrow the safe range of gate motion."

**Unlocks/waypoint:** Unlock Stop 11 at `hoist-stand` in Gate House.

**Beat 4 - After Stop 11 | `hoist-stand` | automatic**

**Trigger:** accepted_stop_11.

**World state:** At `hoist-stand`, the dated accepted-result slip for Stop 11 reads: "-0.49383, tolerance .001.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The linkage analysis is ready for an independent test of the flow-command calibration."

**Unlocks/waypoint:** Unlock Stop 12 at `hoist-stand` in Gate House.

**Beat 5 - At mission end | `discharge-board` | automatic**

**Trigger:** accepted_stop_12.

**World state:** At `discharge-board`, Tomas Wilkes clips the verified calibration strip to the discharge board. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Wilkes: "It came back to the same mark. Now we can use the curve. But Elise needs to know when that water reaches the village; the gate result is only half a warning."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m03

**Home:** `discharge-board`. **Before:** The dated mission-3 evidence holder at this fixture has no accepted record. Fresh grease marks stop short of an old notch on the hoist scale.
**After — exact action:** Tomas Wilkes clips the verified calibration strip to the discharge board.
**Trigger:** accepted_stop_12. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `arrival-map`, a school pin sits just downstream of a road crossing.
**Segue - exact player copy:** But Elise needs to know when that water reaches the village; the gate result is only half a warning.

## Location plan

GATES only; calculation boards and operated hoist must share the same linkage.

## Characters and dramatic beat

Wilkes values repeatability over theory alone; predicted reversal earns his support.

## Key concepts, explained here

chain rule, implicit first/second derivatives, inverse derivative, arctan/exponential derivatives.

## Stop 9 - Differentiate nested discharge

**Format/placement:** DERIVE, at `discharge-board`.

**Metadata:** Concept: 6 - chain/exp/log; Keystone: Chain reasoning; Area: Forecast Archive; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the discharge board, in Gate House.

**Stop reason - exact player copy:** The alarm forecast needs a gate-response model before the crew adjusts release under changing head.

**Question card story setup - exact player copy:** Gate discharge is modeled by Q(h)=40e^(0.3sqrt(h)) cubic metres per second, where h is head in metres. Differentiate the three nested layers so a small head change has a predicted flow response.

**Question card story-science connection - exact player copy:** The discharge derivative determines how sensitively flow responds to reservoir head at the gate.

**Fixture source panel - exact player copy:** Gate discharge is modeled by Q(h)=40e^(0.3sqrt(h)) cubic metres per second, where h is head in metres. Differentiate the three nested layers so a small head change has a predicted flow response.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit dQ/dh in (m^3/s)/m.

**Complete format-specific interaction block:** `derive:{left_side:"dQ/dh",goal:"dQ/dh",givens:["Q=40e^(0.3sqrt h)"],lines:[{expressions:["dQ/dh = 40e^(0.3sqrt h)*d(0.3sqrt h)/dh","dQ/dh = 40e^(0.3h)*d(0.3sqrt h)/dh"],correct:"dQ/dh = 40e^(0.3sqrt h)*d(0.3sqrt h)/dh",rules:["exponential chain rule","power only"],correct_rule:"exponential chain rule"},{expressions:["dQ/dh = 6e^(0.3sqrt h)/sqrt h","dQ/dh = 12sqrt h e^(0.3sqrt h)"],correct:"dQ/dh = 6e^(0.3sqrt h)/sqrt h",rules:["power rule and multiply layers","quotient rule"],correct_rule:"power rule and multiply layers"}],answerText:"dQ/dh=6e^(0.3sqrt h)/sqrt h."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Q=40e^(0.3sqrt h)"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Differentiate nested discharge in the form and units requested by the prompt"
  left_side: "dQ/dh"
  steps:
    - id: step_1
      doing: "exponential chain rule"
      candidates:
        - {text: "dQ/dh = 40e^(0.3sqrt h)*d(0.3sqrt h)/dh", correct: true, rule: "exponential chain rule"}
        - {text: "dQ/dh = 40e^(0.3h)*d(0.3sqrt h)/dh", correct: false, survives: true, rule: "power only", reason: "This is the common power only mistake; it does not perform the licensed exponential chain rule step."}
    - id: step_2
      doing: "power rule and multiply layers"
      candidates:
        - {text: "dQ/dh = 6e^(0.3sqrt h)/sqrt h", correct: true, rule: "power rule and multiply layers"}
        - {text: "dQ/dh = 12sqrt h e^(0.3sqrt h)", correct: false, survives: true, rule: "quotient rule", reason: "This is the common quotient rule mistake; it does not perform the licensed power rule and multiply layers step."}
```
**Correct result:** exact.

**Answer text:** dQ/dh=6e^(0.3sqrt h)/sqrt h.

**Why:** dQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Wrong-path feedback:** Three layers require three derivative factors.

**State/output:** sensitivity curve; unlock 3.2.

## Stop 10 - Link opening and head

**Format/placement:** DERIVE, at `discharge-board`.

**Metadata:** Concept: 7 - implicit differentiation; Keystone: Chain reasoning; Area: Gate House; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the discharge board, in Gate House.

**Stop reason - exact player copy:** The discharge response must account for the mechanical linkage between gate opening and water head.

**Question card story setup - exact player copy:** Linkage tests satisfy o^2+0.5oh+h^2=9, where opening o and head h are metres. Differentiate implicitly to find how opening changes with head at o=2 and h=1.

**Question card story-science connection - exact player copy:** The implicit slope determines whether the linked opening grows or shrinks as head changes near the test point.

**Fixture source panel - exact player copy:** Linkage tests satisfy o^2+0.5oh+h^2=9, where opening o and head h are metres. Differentiate implicitly to find how opening changes with head at o=2 and h=1.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit its value at (h,o)=(1,2) in metres of opening per metre of head.

**Complete format-specific interaction block:** `derive:{left_side:"do/dh",goal:"do/dh",givens:["o^2+0.5oh+h^2=9","o=2,h=1"],lines:[{expressions:["2o o'+0.5(o'h+o)+2h=0","2o o'+0.5(o'h+h)+2h=0"],correct:"2o o'+0.5(o'h+o)+2h=0",rules:["implicit plus product rule","hold o fixed"],correct_rule:"implicit plus product rule"},{expressions:["o'=-(0.5o+2h)/(2o+0.5h)","o'=-(2o+0.5h)/(0.5o+2h)"],correct:"o'=-(0.5o+2h)/(2o+0.5h)",rules:["collect o' terms","invert relation"],correct_rule:"collect o' terms"},{expressions:["do/dh = -(0.5×2+2×1)/(2×2+0.5×1) = -2/3","do/dh = -3/2"],correct:"do/dh = -(0.5×2+2×1)/(2×2+0.5×1) = -2/3",rules:["substitute o=2,h=1","reciprocal slope"],correct_rule:"substitute o=2,h=1"}],answerText:"do/dh=-2/3."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["o^2+0.5oh+h^2=9", "o=2,h=1"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Link opening and head in the form and units requested by the prompt"
  left_side: "do/dh"
  steps:
    - id: step_1
      doing: "implicit plus product rule"
      candidates:
        - {text: "2o o'+0.5(o'h+o)+2h=0", correct: true, rule: "implicit plus product rule"}
        - {text: "2o o'+0.5(o'h+h)+2h=0", correct: false, survives: true, rule: "hold o fixed", reason: "This is the common hold o fixed mistake; it does not perform the licensed implicit plus product rule step."}
    - id: step_2
      doing: "collect o' terms"
      candidates:
        - {text: "o'=-(0.5o+2h)/(2o+0.5h)", correct: true, rule: "collect o' terms"}
        - {text: "o'=-(2o+0.5h)/(0.5o+2h)", correct: false, survives: true, rule: "invert relation", reason: "This is the common invert relation mistake; it does not perform the licensed collect o' terms step."}
    - id: step_3
      doing: "substitute o=2,h=1"
      candidates:
        - {text: "do/dh = -(0.5×2+2×1)/(2×2+0.5×1) = -2/3", correct: true, rule: "substitute o=2,h=1"}
        - {"text": "do/dh = +(0.5×2+2×1)/(2×2+0.5×1) = +2/3", "correct": false, "survives": true, "rule": "reciprocal slope", "reason": "Moving the terms without the derivative across the equation introduces a minus sign."}
```
**Correct result:** `-0.6667`, tolerance `.001`.

**Answer text:** do/dh=-2/3.

**Why:** do/dh=-2/3. The linkage slope turns water-level motion into a required hoist correction.

**Wrong-path feedback:** `o` varies with `h`; its derivative cannot be dropped.

**State/output:** linkage arrow; unlock 3.3.

## Stop 11 - Find linkage curvature

**Format/placement:** DERIVE, at `hoist-stand`.

**Metadata:** Concept: 12 - second implicit derivative; Keystone: Chain reasoning; Area: Gate House; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the hoist stand, in Gate House.

**Stop reason - exact player copy:** The linkage's current slope is known, but its change may narrow the safe range of gate motion.

**Question card story setup - exact player copy:** The linkage slope is negative at the test point, but Wilkes needs to know how that slope itself changes. Differentiate the first derivative relation again and substitute the known do/dh=-2/3.

**Question card story-science connection - exact player copy:** The second derivative measures linkage curvature, which affects how far the local opening sensitivity can be trusted.

**Fixture source panel - exact player copy:** The linkage o²+0.5oh+h²=9 m² has opening o=2 m, head h=1 m, and slope o'=do/dh=-2/3 at the test point. Wilkes needs to know how that slope changes. Differentiate (2o+0.5h)o'+0.5o+2h=0 once more, then substitute the test values.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit its value at (h,o)=(1,2).

**Complete format-specific interaction block:** `derive:{left_side:"o''",goal:"o''",givens:["(2o+0.5h)o'+0.5o+2h=0","o'=-2/3"],lines:[{expressions:["(2o'+0.5)o'+(2o+0.5h)o''+0.5o'+2=0","(2o'+0.5)o'+(2o+0.5h)o''-0.5o'+2=0"],correct:"(2o'+0.5)o'+(2o+0.5h)o''+0.5o'+2=0",rules:["product and implicit rules","differentiate constants only"],correct_rule:"product and implicit rules"},{expressions:["o''=-[(2o'+0.5)o'+0.5o'+2]/(2o+0.5h)","o''=-[(2o'+0.5)o'+2]/(2o+0.5h)"],correct:"o''=-[(2o'+0.5)o'+0.5o'+2]/(2o+0.5h)",rules:["isolate o''","discard slope"],correct_rule:"isolate o''"},{expressions:["o'' = -[(2×(-2/3)+0.5)(-2/3)+0.5×(-2/3)+2]/(2×2+0.5×1) = -40/81","o'' = -36/81 = -4/9"],correct:"o'' = -[(2×(-2/3)+0.5)(-2/3)+0.5×(-2/3)+2]/(2×2+0.5×1) = -40/81",rules:["substitute all known values","use first derivative only"],correct_rule:"substitute all known values"}],answerText:"o''=-40/81 per metre."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["(2o+0.5h)o'+0.5o+2h=0", "o'=-2/3", "At the test point, h = 1 m, o = 2 m, and do/dh = -2/3."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Find linkage curvature in the form and units requested by the prompt"
  left_side: "o''"
  steps:
    - id: step_1
      doing: "product and implicit rules"
      candidates:
        - {text: "(2o'+0.5)o'+(2o+0.5h)o''+0.5o'+2=0", correct: true, rule: "product and implicit rules"}
        - {text: "(2o'+0.5)o'+(2o+0.5h)o''-0.5o'+2=0", correct: false, survives: true, rule: "differentiate constants only", reason: "This is the common differentiate constants only mistake; it does not perform the licensed product and implicit rules step."}
    - id: step_2
      doing: "isolate o''"
      candidates:
        - {text: "o''=-[(2o'+0.5)o'+0.5o'+2]/(2o+0.5h)", correct: true, rule: "isolate o''"}
        - {text: "o''=-[(2o'+0.5)o'+2]/(2o+0.5h)", correct: false, survives: true, rule: "discard slope", reason: "This is the common discard slope mistake; it does not perform the licensed isolate o'' step."}
    - id: step_3
      doing: "substitute all known values"
      candidates:
        - {text: "o'' = -[(2×(-2/3)+0.5)(-2/3)+0.5×(-2/3)+2]/(2×2+0.5×1) = -40/81", correct: true, rule: "substitute all known values"}
        - {text: "o'' = -36/81 = -4/9", correct: false, survives: true, rule: "use first derivative only", reason: "This is the common use first derivative only mistake; it does not perform the licensed substitute all known values step."}
```
**Correct result:** `-0.49383`, tolerance `.001`.

**Answer text:** o''=-40/81 per metre.

**Why:** o''=-40/81 per metre. Curvature determines whether the safe correction stays safe over a finite movement.

**Wrong-path feedback:** Substitute the original first derivative into the second derivative.

**State/output:** safe corridor narrows; unlock 3.4.

## Stop 12 - Reverse the flow calibration

**Format/placement:** VERIFY, at `hoist-stand`.

**Metadata:** Concept: 3 - inverse derivative/arctan; Keystone: Chain reasoning; Area: Gate House; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the hoist stand, in Gate House.

**Stop reason - exact player copy:** The linkage analysis is ready for an independent test of the flow-command calibration.

**Question card story setup - exact player copy:** Because linkage curvature narrows the safe motion, the command map uses F(o)=100 arctan(o/2) cubic metres per second. Predict the opening sensitivity at o=2, then verify it with one reversible step.

**Question card story-science connection - exact player copy:** The forward and inverse sensitivities determine whether the measured opening response agrees with the command map.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** From $F(o)=100\arctan(o/2)$, use $F'(o)=50/(1+(o/2)^2)$ at $o=2$ to submit the inverse sensitivity $do/dF$ in m/(m^3/s); the linkage remains locked until commitment. **OPERATE:** Apply a +2.0 m^3/s command while head stays 1.0 m and voltage stays fixed. **MEASURE:** Record opening change, then return the command to zero and record residual opening. **INTERPRET:** Submit PASS or FAIL for the predicted 0.080 m response and restoration.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"F'(o)=50/(1+(o/2)^2); do/dF=1/F'(o)",inputs:{o:2,flow_step:2.0},constants:{coefficient:50},submit:{quantity:"inverse sensitivity",unit:"m/(m^3/s)",truth:0.04,tolerance:0.001}},equipment_locked_until_prediction_commit:true,operation:{command_change:2.0,unit:"m^3/s",fixed:["head 1.0 m","voltage"]},measurements:["opening change 0.080 m","returned residual 0.000 m"],restore:{required:true,setting:"zero command",remeasure:true},correct_conclusion:"PASS",answerText:"The inverse sensitivity is 0.040 m/(m^3/s), so a 2.0 m^3/s step predicts 0.080 m; the measured change and zero residual pass."}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Reverse the flow calibration", unit: "units printed on the card"}
  predictionRange: {min: 12.5, max: 37.5, step: 2.5}
  measurement: {label: "independent measured value", truth: 25.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`dF/do=25`, inverse `.040`; pass."
```

**Correct result:** `dF/do=25`, inverse `.040`; pass.

**Answer text:** predicted `2*.04=.080 m`, measured `.080 m`, and reversal returns to baseline.

**Why:** predicted `2*.04=.080 m`, measured `.080 m`, and reversal returns to baseline. A measured inverse response certifies the command direction without assuming the chart is correct.

**Wrong-path feedback:** The inverse derivative is reciprocal at the matching point, not at the same displayed output by guess.

**State/output:** safe calibration signed.

## Mission outcome

Mission decision: Use the staged calibration path. The chain, linkage, and inverse tests agree, and the gate returns to baseline. The crew can predict discharge without forcing the hoist. Now it must learn how that water moves downstream.

**Segue - exact player copy:** But Elise needs to know when that water reaches the village; the gate result is only half a warning.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tomas Wilkes clips the verified calibration strip to the discharge board. But Elise needs to know when that water reaches the village; the gate result is only half a warning.

**Story event - exact player copy:** The crew completes the staged gate calibration without forcing the hoist.

TARGET `18:00`; auto `DAM INTEGRITY +3`; canonical enter `60/57/65/72` -> `60/57/65/75`, award 12, allocate 5 Integrity, 4 Safe Storage, 3 Reserve -> `64/57/68/80`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains chain rule?

**Options - exact player copy:**

- A. An equation connecting variables without isolating one.
- B. Differentiate an outside function, then multiply by the derivative of its inside.
- C. A function that reverses another function.
- D. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for chain rule. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes implicit relation. It does not answer the question about chain rule.
- B: Correct. Differentiate an outside function, then multiply by the derivative of its inside.
- C: This describes inverse function. It does not answer the question about chain rule.
- D: This describes the chain rule. It does not answer the question about chain rule.

### Review question 2


**Prompt - exact player copy:** Which statement best explains implicit relation?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. A function that reverses another function.
- C. An equation connecting variables without isolating one.
- D. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for implicit relation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes chain rule. It does not answer the question about implicit relation.
- B: This describes inverse function. It does not answer the question about implicit relation.
- C: Correct. An equation connecting variables without isolating one.
- D: This describes the chain rule. It does not answer the question about implicit relation.

### Review question 3


**Prompt - exact player copy:** Which statement best explains inverse function?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. An equation connecting variables without isolating one.
- C. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.
- D. A function that reverses another function.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for inverse function. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes chain rule. It does not answer the question about inverse function.
- B: This describes implicit relation. It does not answer the question about inverse function.
- C: This describes the chain rule. It does not answer the question about inverse function.
- D: Correct. A function that reverses another function.

### Review question 4


**Prompt - exact player copy:** A flow model is Q(h)=40e^(0.3√h), where h>0. What is dQ/dh?

**Options - exact player copy:**

- A. dQ/dh=6e^(0.3√h)/√h.
- B. Differentiate an outside function, then multiply by the derivative of its inside.
- C. An equation connecting variables without isolating one.
- D. A function that reverses another function.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for the chain rule. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. dQ/dh=6e^(0.3√h)/√h.
- B: This describes chain rule. It does not answer the question about the chain rule.
- C: This describes implicit relation. It does not answer the question about the chain rule.
- D: This describes inverse function. It does not answer the question about the chain rule.

### Review question 5


**Prompt - exact player copy:** The variables o and h obey o²+0.5oh+h²=6. Find do/dh at o=2 and h=1.

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. do/dh=-(0.5o+2h)/(2o+0.5h)=-2/3.
- C. An equation connecting variables without isolating one.
- D. A function that reverses another function.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for implicit differentiation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes chain rule. It does not answer the question about implicit differentiation.
- B: Correct. do/dh=-(0.5o+2h)/(2o+0.5h)=-2/3.
- C: This describes implicit relation. It does not answer the question about implicit differentiation.
- D: This describes inverse function. It does not answer the question about implicit differentiation.

### Review question 6


**Prompt - exact player copy:** Let o(h) satisfy o²+0.5oh+h²=6. At h=1, o=2 and o′=-2/3. Differentiating twice gives (2o+0.5h)o″+2(o′)²+o′+2=0. What is o″ at that point?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. An equation connecting variables without isolating one.
- C. o″=-40/81.
- D. A function that reverses another function.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for second implicit derivative. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes chain rule. It does not answer the question about second implicit derivative.
- B: This describes implicit relation. It does not answer the question about second implicit derivative.
- C: Correct. o″=-40/81.
- D: This describes inverse function. It does not answer the question about second implicit derivative.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 4 - Before the Water Arrives

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 4 - 12 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Water in Motion  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the arrival map.  
**Card body:** 12 work shifts remain before the storm. A school pin sits just downstream of a road crossing. Today you decide how much warning the village needs.
**Objective:** Set a warning time that covers the first dangerous arrival.

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
  - id: headwater_m04_we01
    title: Position, velocity, acceleration
    problem: A particle has position x(t)=t²-4t metres, with t in seconds. Find velocity and acceleration at t=1.
    rule: v(t)=x′(t); a(t)=v′(t).
    steps:
    - 'Set up the relationship: v(t)=x′(t); a(t)=v′(t).'
    - v(t)=2t-4, so v(1)=-2 m/s; a(t)=2 m/s².
    answer: It moves in the negative direction and slows down because velocity and acceleration have opposite signs.
    common_mistake: Positive acceleration does not always mean speeding up.
  - id: headwater_m04_we02
    title: Displacement versus distance
    problem: A particle has x(t)=(t-2)² m for 0≤t≤4 s. Find displacement and total distance.
    rule: Displacement = final minus initial position; distance adds travel lengths on each direction interval.
    steps:
    - 'Set up the relationship: Displacement = final minus initial position; distance adds travel lengths on each direction interval.'
    - Δx=x(4)-x(0)=4-4=0 m; distance=|x(2)-x(0)|+|x(4)-x(2)|=4+4=8 m.
    answer: Displacement is 0 m; distance is 8 m.
    common_mistake: Returning to the starting point does not mean no distance was travelled.
  - id: headwater_m04_we03
    title: A growing square
    problem: A square side s is 3 cm and grows at ds/dt=2 cm/s. Find dA/dt for area A.
    rule: A=s², so dA/dt=2s(ds/dt).
    steps:
    - 'Set up the relationship: A=s², so dA/dt=2s(ds/dt).'
    - dA/dt=2(3)(2)=12 cm²/s.
    answer: The area grows at 12 cm²/s.
    common_mistake: Differentiate before inserting the fixed side length.
  - id: headwater_m04_we04
    title: A growing circle
    problem: A circle has radius r=2 cm and dr/dt=1 cm/s. Find its area growth rate.
    rule: A=πr², so dA/dt=2πr(dr/dt).
    steps:
    - 'Set up the relationship: A=πr², so dA/dt=2πr(dr/dt).'
    - dA/dt=2π(2)(1)=4π cm²/s.
    answer: The area growth rate is 4π cm²/s.
    common_mistake: Area change has square-length units per time, not length per time.
  - id: headwater_m04_we05
    title: Read speed from velocity
    problem: A particle has v(t)=t-3 m/s. Find its speed at t=1 s and when it changes direction.
    rule: Speed = |velocity|; a direction change requires velocity to change sign.
    steps:
    - 'Set up the relationship: Speed = |velocity|; a direction change requires velocity to change sign.'
    - speed at 1=|1-3|=2 m/s. Velocity crosses zero at t=3 s, from negative to positive.
    answer: Speed is 2 m/s at t=1; direction changes at t=3.
    common_mistake: A zero velocity without a sign change would not establish a reversal.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Position: location along a route.

Velocity: signed change of position per time.

Displacement: final position minus initial position.

Total distance: all travel counted positively.

#### Primer concepts

- differentiate position for velocity and again for acceleration; compare signs to decide speeding up; split total distance where velocity is zero.

#### Equations first needed today
**Equation:** `v=dx/dt`, `a=dv/dt=d^2x/dt^2`

**What it is for:** describing motion.

**Symbols:** `x` position, `t` time, `v` velocity, `a` acceleration.

**Why this campaign needs it:** arrival warnings depend on motion, not distance alone.

**Equation:** `dV/dt=(dV/dh)(dh/dt)`

**What it is for:** connecting changing depth to changing volume.

**Symbols:** `V` volume and `h` depth.

**Why this campaign needs it:** downstream rise must be converted into water load.

## Main story happening - designer summary

Motion and depth rates convert a release into the first public warning rule.

## Learning and dramatic intent

Join kinematics, distance, and related rates in one human consequence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Downstream Warning Desk | `arrival-map` | automatic**

**Trigger:** mission_4_arrival.

**World state:** A school pin sits just downstream of a road crossing.

**Panel/HUD text:** MISSION 4: DIFFERENTIATE THE FLOOD FRONT OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with differentiate the flood front. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 13 | `arrival-map` | automatic**

**Trigger:** accepted_stop_13.

**World state:** At `arrival-map`, the dated accepted-result slip for Stop 13 reads: "exact.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The front's turning times mean net displacement may understate how far water has traveled."

**Unlocks/waypoint:** Unlock Stop 14 at `arrival-map` in Downstream Warning Desk.

**Beat 3 - After Stop 14 | `arrival-map` | automatic**

**Trigger:** accepted_stop_14.

**World state:** At `arrival-map`, the dated accepted-result slip for Stop 14 reads: "distance 11 km, displacement 9 km.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The route calculation leaves the downstream water-height rise to be estimated."

**Unlocks/waypoint:** Unlock Stop 15 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 15 | `radio-desk` | automatic**

**Trigger:** accepted_stop_15.

**World state:** At `arrival-map`, the dated accepted-result slip for Stop 15 reads: ".025 m/min, tolerance .0001.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The arrival and road-closure estimates are ready to become a dispatch deadline."

**Unlocks/waypoint:** Unlock Stop 16 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**Trigger:** accepted_stop_16.

**World state:** At `arrival-map`, Elise Baptiste pins the MINIMUM LEAD: 280 MINUTES card beside the village pin. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "A call that comes after the water is not a warning. But Mara's two-day plan still hides a possible peak; an average cannot clear the release."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m04

**Home:** `arrival-map`. **Before:** The dated mission-4 evidence holder at this fixture has no accepted record. A school pin sits just downstream of a road crossing.
**After — exact action:** Elise Baptiste pins the MINIMUM LEAD: 280 MINUTES card beside the village pin.
**Trigger:** accepted_stop_16. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `storage-board`, two endpoint marks sit on opposite sides of a red line.
**Segue - exact player copy:** But Mara's two-day plan still hides a possible peak; an average cannot clear the release.

## Location plan

SAFE only; settlement route, depth model, and warning authority are here.

## Characters and dramatic beat

Baptiste forces the crew to count closure time after arrival.

## Key concepts, explained here

position/velocity/acceleration, speeding signs, stops, distance/displacement, related rates.

## Stop 13 - Differentiate the flood front

**Format/placement:** DERIVE, at `arrival-map`.

**Metadata:** Concept: 3 - motion derivatives; Keystone: Motion/rates; Area: Gate House; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The release plan needs a moving flood-front prediction before downstream warnings can use its travel time.

**Question card story setup - exact player copy:** The front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Differentiate twice and classify its motion at t=2 h before using the map's average time.

**Question card story-science connection - exact player copy:** Velocity and acceleration distinguish the front's changing motion from the average speed shown on the route map.

**Fixture source panel - exact player copy:** The front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Differentiate twice and classify its motion at t=2 h before using the map's average time.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit v(2), a(2), their units, and the motion classification.

**Complete format-specific interaction block:** `derive:{left_side:"motion result",goal:"v,a and classification",givens:["x=2t^3-9t^2+12t"],lines:[{expressions:["v=6t^2-18t+12","v=6t^2-18t"],correct:"v=6t^2-18t+12",rules:["power and sum rules","second derivative"],correct_rule:"power and sum rules"},{expressions:["a=12t-18","a=12t+12"],correct:"a=12t-18",rules:["differentiate velocity","absolute value"],correct_rule:"differentiate velocity"},{expressions:["v(2)=0 km/h,a(2)=6 km/h^2; momentary stop","v(2)=6 km/h,a(2)=0 km/h^2; moving steadily"],correct:"v(2)=0 km/h,a(2)=6 km/h^2; momentary stop",rules:["substitute and interpret","same sign test"],correct_rule:"substitute and interpret"}],answerText:"At 2 h the front momentarily stops; acceleration is +6 km/h^2."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["x=2t^3-9t^2+12t"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Differentiate the flood front in the form and units requested by the prompt"
  left_side: "motion result"
  steps:
    - id: step_1
      doing: "power and sum rules"
      candidates:
        - {text: "v=6t^2-18t+12", correct: true, rule: "power and sum rules"}
        - {text: "v=6t^2-18t", correct: false, survives: true, rule: "second derivative", reason: "This is the common second derivative mistake; it does not perform the licensed power and sum rules step."}
    - id: step_2
      doing: "differentiate velocity"
      candidates:
        - {text: "a=12t-18", correct: true, rule: "differentiate velocity"}
        - {text: "a=12t+12", correct: false, survives: true, rule: "absolute value", reason: "This is the common absolute value mistake; it does not perform the licensed differentiate velocity step."}
    - id: step_3
      doing: "substitute and interpret"
      candidates:
        - {text: "v(2)=0 km/h,a(2)=6 km/h^2; momentary stop", correct: true, rule: "substitute and interpret"}
        - {text: "v(2)=6 km/h,a(2)=0 km/h^2; moving steadily", correct: false, survives: true, rule: "same sign test", reason: "This is the common same sign test mistake; it does not perform the licensed substitute and interpret step."}
```
**Correct result:** exact.

**Answer text:** At 2 h the front momentarily stops; acceleration is +6 km/h^2.

**Why:** At 2 h the front momentarily stops; acceleration is +6 km/h^2. Velocity and acceleration signs show both direction and whether the front is speeding up.

**Wrong-path feedback:** Speed is `|v|`; at `v=0` sign comparison needs nearby times.

**State/output:** stop marker; unlock 4.2.

## Stop 14 - Distance is not displacement

**Format/placement:** SEQUENCE, at `arrival-map`.

**Metadata:** Concept: 15 - total distance; Keystone: Motion/rates; Area: Powerhouse; Learning role: PRACTICE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The front's turning times mean net displacement may understate how far water has traveled.

**Question card story setup - exact player copy:** With a stop at t=2 established, velocity factors as 6(t-1)(t-2), so direction also changes at hour 1. Split the interval and compute every positive position change from t=0 through t=3.

**Question card story-science connection - exact player copy:** Total distance and signed displacement answer different route questions when the front reverses direction.

**Question card prompt - exact player copy:** Order the steps, then submit total distance and displacement in kilometres.

**Complete format-specific interaction block:** `cards:["solve v=0: t=1,2","evaluate x(0)=0,x(1)=5,x(2)=4,x(3)=9","sum |5-0|+|4-5|+|9-4|","compute x(3)-x(0)"],order:["solve v=0: t=1,2","evaluate x(0)=0,x(1)=5,x(2)=4,x(3)=9","sum |5-0|+|4-5|+|9-4|","compute x(3)-x(0)"]`

**Correct result:** distance `11 km`, displacement `9 km`.

**Answer text:** split wherever `v=0`, then sum absolute changes.

**Why:** split wherever `v=0`, then sum absolute changes. Total travel follows each segment; displacement records only the endpoints.

**Wrong-path feedback:** Absolute endpoint displacement misses reversals.

**State/output:** route segments; unlock 4.3.

## Stop 15 - Relate depth and reach volume

**Format/placement:** DERIVE, at `arrival-map`.

**Metadata:** Concept: 8 - related rates; Keystone: Motion/rates; Area: Powerhouse; Learning role: INTRODUCE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The route calculation leaves the downstream water-height rise to be estimated.

**Question card story setup - exact player copy:** Because route distance alone misses water height, model the first reach as V(h)=12000h^2 cubic metres. At h=1.5 m, inflow is 900 m^3/min; differentiate the constraint to find dh/dt.

**Question card story-science connection - exact player copy:** The volume-height relationship converts incoming flow into the local depth-rise rate relevant to downstream flooding.

**Fixture source panel - exact player copy:** Because route distance alone misses water height, model the first reach as V(h)=12000h^2 cubic metres. At h=1.5 m, inflow is 900 m^3/min; differentiate the constraint to find dh/dt.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit dh/dt in metres per minute.

**Complete format-specific interaction block:** `derive:{left_side:"dh/dt",goal:"dh/dt",givens:["V=12000h^2 m^3","h=1.5 m","dV/dt=900 m^3/min"],lines:[{expressions:["dV/dt=24000h dh/dt","dV/dt=24000h(1 m/min)"],correct:"dV/dt=24000h dh/dt",rules:["implicit chain rule in time","power only"],correct_rule:"implicit chain rule in time"},{expressions:["dh/dt=900/(24000*1.5)=0.025 m/min","dh/dt=900/(24000*1.0)=0.0375 m/min"],correct:"dh/dt=900/(24000*1.5)=0.025 m/min",rules:["substitute then solve","divide before inserting h"],correct_rule:"substitute then solve"}],answerText:"Depth rises at 0.025 m/min."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["V=12000h^2 m^3", "h=1.5 m", "dV/dt=900 m^3/min"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Relate depth and reach volume in the form and units requested by the prompt"
  left_side: "dh/dt"
  steps:
    - id: step_1
      doing: "implicit chain rule in time"
      candidates:
        - {text: "dV/dt=24000h dh/dt", correct: true, rule: "implicit chain rule in time"}
        - {text: "dV/dt=24000h(1 m/min)", correct: false, survives: true, rule: "power only", reason: "This is the common power only mistake; it does not perform the licensed implicit chain rule in time step."}
    - id: step_2
      doing: "substitute then solve"
      candidates:
        - {text: "dh/dt=900/(24000*1.5)=0.025 m/min", correct: true, rule: "substitute then solve"}
        - {text: "dh/dt=900/(24000*1.0)=0.0375 m/min", correct: false, survives: true, rule: "divide before inserting h", reason: "This is the common divide before inserting h mistake; it does not perform the licensed substitute then solve step."}
```
**Correct result:** `.025 m/min`, tolerance `.0001`.

**Answer text:** Depth rises at 0.025 m/min.

**Why:** Depth rises at 0.025 m/min. The depth rate tells how quickly a safe bank becomes a flooded road.

**Wrong-path feedback:** Differentiate first, then insert the instantaneous depth.

**State/output:** road clock; unlock 4.4.

## Stop 16 - Commit the warning

**Format/placement:** TRIGGER, at `radio-desk`.

**Metadata:** Concept: 3 - motion/threshold; Keystone: Motion/rates; Area: Powerhouse; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radio desk, in Downstream Warning Desk.

**Stop reason - exact player copy:** The arrival and road-closure estimates are ready to become a dispatch deadline.

**Question card story setup - exact player copy:** The first village is 4.0 h away, and the road closes 40 min after the rise begins there. Combine travel and closure times, then commit the latest inclusive warning deadline before dispatch updates.

**Question card story-science connection - exact player copy:** The combined travel and closure time defines the latest warning deadline the dispatch updates must satisfy.

**Question card prompt - exact player copy:** Submit the minimum lead time in minutes before road closure and commit WARN if planned release begins within that lead time; use 60 min/h.

**Complete format-specific interaction block:** `trigger:{decision_rule:"WARN if release begins within committed lead time",scale:{min:200,max:300,step:5,unit:"min"},anchors:[240,280],objective:"warning before first road closure",direction:"at least",consequence_limit:"road must remain open for evacuation"}`

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 16 - Commit the warning"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Submit the minimum lead time in minutes before road closure and commit WARN if planned release begins within that lead time; use 60 min/h."
  payload: "`trigger:{decision_rule:\"WARN if release begins within committed lead time\",scale:{min:200,max:300,step:5,unit:\"min\"},anchors:[240,280],objective:\"warning before first road closure\",direction:\"at least\",consequence_limit:\"road must remain open for evacuation\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "road-closure lead time", min: 200, max: 300, step: 5, unit: "min"}
  start: 220
  anchors:
    - {at: 220, means: "routine baseline, not the decision threshold"}
    - {at: 265, means: "elevated evidence requiring attention"}
  direction: falling
  updates:
    - {at: "T-48 h", value: 300, hoursLeft: 48}
    - {at: "T-24 h", value: 290, hoursLeft: 24}
    - {at: "T-12 h", value: 280, hoursLeft: 12}
    - {at: "T-6 h", value: 260, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 281, max: 300}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 200, max: 280}, leadHours: 12}
  question: "Submit the minimum lead time in minutes before road closure and commit WARN if planned release begins within that lead time; use 60 min/h."
```

**Correct result:** `4*60+40=280 min`, exact; commit 280.

**Answer text:** warning must precede closure by at least 280 minutes.

**Why:** warning must precede closure by at least 280 minutes. A rule written before the update protects people from optimistic rescheduling.

**Wrong-path feedback:** Include downstream rise time after arrival.

**State/output:** four-hour-forty rule pinned.

## Mission outcome

Mission decision: Use a minimum warning lead of 280 minutes. It includes travel to the village, and the road's rise time. The warning rule is now tied to motion, not an average. The two-day release plan still needs a true peak test.

**Segue - exact player copy:** But Mara's two-day plan still hides a possible peak; an average cannot clear the release.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Elise Baptiste pins the MINIMUM LEAD: 280 MINUTES card beside the village pin. But Mara's two-day plan still hides a possible peak; an average cannot clear the release.

**Story event - exact player copy:** Every downstream settlement receives at least 280 minutes of warning.

TARGET `17:00`; auto `DOWNSTREAM +4`; canonical enter `64/57/68/80` -> `64/61/68/80`, award 12, allocate 7 Downstream and 5 Storage -> `69/68/68/80`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Speed:** absolute value of velocity.

### Review question 1


**Prompt - exact player copy:** Which statement best explains speed?

**Options - exact player copy:**

- A. Location along a route.
- B. Signed change of position per time.
- C. Final position minus initial position.
- D. Absolute value of velocity.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for speed. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes position. It does not answer the question about speed.
- B: This describes velocity. It does not answer the question about speed.
- C: This describes displacement. It does not answer the question about speed.
- D: Correct. Absolute value of velocity.

### Review question 2


**Prompt - exact player copy:** The graph samples x(t)=2t² metres. What is the object’s position at t=2 s?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Position (m)",
  "caption": "Samples of x(t)=2t², with t in seconds",
  "series": [
    {
      "name": "Position",
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
          8
        ],
        [
          3,
          18
        ],
        [
          4,
          32
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 8 m.
- B. 4 m.
- C. 8 m/s.
- D. 16 m.

**Correct answer:** A

**Hint - exact player copy:** Read position from the vertical axis.

**Option feedback - exact player copy:**

- A: Correct. 8 m.
- B: This uses 2t rather than 2t².
- C: That is a velocity unit, not a position unit.
- D: Substituting t=2 gives 2×4, not 16.

### Review question 3


**Prompt - exact player copy:** The graph samples x(t)=2t² metres. What is the instantaneous velocity at t=2 s?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Position (m)",
  "caption": "Samples of x(t)=2t², with t in seconds",
  "series": [
    {
      "name": "Position",
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
          8
        ],
        [
          3,
          18
        ],
        [
          4,
          32
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 4 m/s.
- B. 8 m/s.
- C. 8 m.
- D. 0 m/s.

**Correct answer:** B

**Hint - exact player copy:** Differentiate the stated position function.

**Option feedback - exact player copy:**

- A: The derivative is 4t, which equals 8 at t=2.
- B: Correct. 8 m/s.
- C: This gives position units, not velocity units.
- D: The position curve has a positive slope at t=2.

### Review question 4


**Prompt - exact player copy:** Which statement best explains displacement?

**Options - exact player copy:**

- A. Absolute value of velocity.
- B. Location along a route.
- C. Final position minus initial position.
- D. Signed change of position per time.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for displacement. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes speed. It does not answer the question about displacement.
- B: This describes position. It does not answer the question about displacement.
- C: Correct. Final position minus initial position.
- D: This describes velocity. It does not answer the question about displacement.

### Review question 5


**Prompt - exact player copy:** Which statement best explains total distance?

**Options - exact player copy:**

- A. Absolute value of velocity.
- B. Location along a route.
- C. Signed change of position per time.
- D. All travel counted positively.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for total distance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes speed. It does not answer the question about total distance.
- B: This describes position. It does not answer the question about total distance.
- C: This describes velocity. It does not answer the question about total distance.
- D: Correct. All travel counted positively.

### Review question 6


**Prompt - exact player copy:** A particle has position x(t)=2t³-9t²+12t km, where t is in hours. What are its velocity and acceleration at t=2 h?

**Options - exact player copy:**

- A. Velocity is 0 km/h and acceleration is +6 km/h².
- B. Absolute value of velocity.
- C. Location along a route.
- D. Signed change of position per time.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for motion derivatives. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Velocity is 0 km/h and acceleration is +6 km/h².
- B: This describes speed. It does not answer the question about motion derivatives.
- C: This describes position. It does not answer the question about motion derivatives.
- D: This describes velocity. It does not answer the question about motion derivatives.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 5 - The Crossing We Can Prove

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 5 - 11 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** The Peak Between Readings  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** 11 work shifts remain before the storm. Two endpoint marks sit on opposite sides of a red line. Today you decide whether the level must cross the danger mark.
**Objective:** Accept or reject the average-based release plan.

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
  - id: headwater_m05_we01
    title: Find interior critical points
    problem: Find the critical inputs of f(x)=x³-3x.
    rule: Critical inputs occur where f′=0 or f′ is undefined, within the function domain.
    steps:
    - 'Set up the relationship: Critical inputs occur where f′=0 or f′ is undefined, within the function domain.'
    - f′(x)=3x²-3=3(x-1)(x+1), so x=-1 or x=1.
    answer: The critical inputs are -1 and 1.
    common_mistake: A critical input is not automatically an absolute maximum.
  - id: headwater_m05_we02
    title: Check endpoints as well
    problem: Find the absolute minimum and maximum of f(x)=x²-2x on [0,3].
    rule: Compare function values at endpoints and interior critical points.
    steps:
    - 'Set up the relationship: Compare function values at endpoints and interior critical points.'
    - f′=2x-2=0 gives x=1; f(0)=0, f(1)=-1, f(3)=3.
    answer: Minimum -1 occurs at x=1; maximum 3 occurs at x=3.
    common_mistake: Ignoring endpoints would miss the absolute maximum.
  - id: headwater_m05_we03
    title: Match average and instantaneous slopes
    problem: For f(x)=x² on [1,3], find the point guaranteed by the Mean Value Theorem.
    rule: For a continuous function differentiable inside the interval, f′(c)=[f(b)-f(a)]/(b-a).
    steps:
    - 'Set up the relationship: For a continuous function differentiable inside the interval, f′(c)=[f(b)-f(a)]/(b-a).'
    - average slope=(9-1)/(3-1)=4; f′(c)=2c=4 gives c=2.
    answer: The guaranteed matching slope occurs at c=2.
    common_mistake: The theorem equates a derivative with average slope, not with an average function value.
  - id: headwater_m05_we04
    title: Guarantee a crossing
    problem: A continuous function has f(0)=-2 and f(3)=4. Must it equal 1 somewhere between?
    rule: The Intermediate Value Theorem guarantees every value between endpoint outputs for a continuous function.
    steps:
    - The target 1 lies between -2 and 4.
    - Continuity prevents the function from jumping over that target.
    answer: There is at least one c in (0,3) with f(c)=1.
    common_mistake: The theorem does not guarantee exactly one crossing.
  - id: headwater_m05_we05
    title: Compare marginal cost and revenue
    problem: Revenue is R(q)=10q dollars and cost is C(q)=q² dollars. Find where profit stops increasing.
    rule: Profit P=R-C, so P′=R′-C′.
    steps:
    - 'Set up the relationship: Profit P=R-C, so P′=R′-C′.'
    - P′(q)=10-2q=0 gives q=5; P″=-2<0.
    answer: Profit is maximized at q=5 on q≥0.
    common_mistake: Maximize profit, not revenue alone.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Critical point: an interior input where the derivative is zero or undefined.

Absolute maximum: greatest value on the full interval.

Marginal value: the derivative of a total with respect to one more unit.

Intermediate Value Theorem (IVT) and Mean Value Theorem (MVT): IVT guarantees every output between endpoint outputs for a continuous function, while MVT guarantees some interior derivative equals the secant slope when the function is also differentiable inside the interval.

#### Primer concepts

- The extreme value theorem (EVT) guarantees extrema for a continuous function on a closed interval; candidates are endpoints and critical points; first-derivative sign changes classify local extrema.
- IVT guarantees an intermediate function value; MVT guarantees an interior derivative equal to an average rate of change. Do not interchange their conclusions.

#### Equations first needed today
**Equation:** `P'(q)=R'(q)-C'(q)`

**What it is for:** marginal profit/change.

**Symbols:** `P` net value, `R` return, `C` cost, `q` flow.

**Why this campaign needs it:** power value cannot override safe storage.

## Main story happening - designer summary

**Equation:** If `m=[H(b)-H(a)]/(b-a)` and H is continuous on `[a,b]` and differentiable on `(a,b)`, then the MVT guarantees some `c` in `(a,b)` with `H'(c)=m`.

**What it is for:** checking whether an observed endpoint change is consistent with a stated derivative range.

**Symbols:** `a` and `b` are endpoint times, `m` is the secant slope, and `c` is an interior time.

**Why this campaign needs it:** the mission's final consistency check compares an average rise with allowable instantaneous rise rates.

## Main story happening - designer summary

An endpoint overload defeats the average-based plan; a controlled storage test finds a feasible alternative.

## Learning and dramatic intent

Make extrema and theorem hypotheses change operations.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `machine-board` | automatic**

**Trigger:** mission_5_arrival.

**World state:** Two endpoint marks sit on opposite sides of a red line.

**Panel/HUD text:** MISSION 5: FIND CRITICAL TURBINE DEMAND OPEN

**Dialogue bubbles -** Nia Chen: "Start with find critical turbine demand. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 17 | `machine-board` | automatic**

**Trigger:** accepted_stop_17.

**World state:** At `machine-board`, the dated accepted-result slip for Stop 17 reads: "1,3 h.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The interior demand checks are ready to be compared with the schedule endpoints."

**Unlocks/waypoint:** Unlock Stop 18 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 18 | `dispatch-console` | automatic**

**Trigger:** accepted_stop_18.

**World state:** At `machine-board`, the dated accepted-result slip for Stop 18 reads: "40 MW at 5 h, unsafe; local max at 1 h is 24 MW.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The unsafe power peak forces the crew to reconsider how much release buys useful storage margin."

**Unlocks/waypoint:** Unlock Stop 19 at `dispatch-console` in Powerhouse.

**Beat 4 - After Stop 19 | `machine-board` | automatic**

**Trigger:** accepted_stop_19.

**World state:** At `dispatch-console`, the dated accepted-result slip for Stop 19 reads: "causal; marginal gain .08/20=.004 million m^3 per (m^3/s).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The revised release plan still needs to establish whether reservoir height crosses the warning level."

**Unlocks/waypoint:** Unlock Stop 20 at `machine-board` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**Trigger:** accepted_stop_20.

**World state:** At `storage-board`, Mara Vale draws the MUST CROSS 4.6 M bracket between the endpoint marks. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "It must cross. That does not tell us the hour. But Imani cannot say when the crest arrives from that proof; the forecast must face data it has not seen."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m05

**Home:** `storage-board`. **Before:** The dated mission-5 evidence holder at this fixture has no accepted record. Two endpoint marks sit on opposite sides of a red line.
**After — exact action:** Mara Vale draws the MUST CROSS 4.6 M bracket between the endpoint marks.
**Trigger:** accepted_stop_20. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `forecast-drawer`, a sealed high-ground trace rests under the old forecast.
**Segue - exact player copy:** But Imani cannot say when the crest arrives from that proof; the forecast must face data it has not seen.

## Location plan

POWER to STORE; demand capacity is known only at POWER, storage consequence only at STORE.

## Characters and dramatic beat

Nia legitimately pushes generation, then withdraws the schedule when the endpoint fails.

## Key concepts, explained here

critical points, first/second tests, absolute extrema, EVT, IVT/MVT, marginal change.

## Stop 17 - Find critical turbine demand

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: 11 - critical points; Keystone: Extrema; Area: Powerhouse; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The release plan's power demand must be checked over the entire operating interval.

**Question card story setup - exact player copy:** Turbine demand is D(t)=t^3-6t^2+9t+20 megawatts for 0<=t<=5 hours. Differentiate and solve for interior critical times before comparing the plan's endpoints and average.

**Question card story-science connection - exact player copy:** The critical times identify interior demand peaks and troughs that an endpoint-only check would miss.

**Fixture source panel - exact player copy:** Turbine demand is D(t)=t^3-6t^2+9t+20 megawatts for 0<=t<=5 hours. Differentiate and solve for interior critical times before comparing the plan's endpoints and average.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit all critical times in hours.

**Complete format-specific interaction block:** `derive:{left_side:"t_critical",goal:"critical times",givens:["D=t^3-6t^2+9t+20","0<=t<=5"],lines:[{expressions:["D'=3t^2-12t+9","D'=t^2-6t+9"],correct:"D'=3t^2-12t+9",rules:["power and sum rules","divide derivative by degree"],correct_rule:"power and sum rules"},{expressions:["3(t-1)(t-3)=0","3(t-2)^2=0"],correct:"3(t-1)(t-3)=0",rules:["factor quadratic","complete wrong square"],correct_rule:"factor quadratic"},{expressions:["t=1,3 h","t=0,5 h"],correct:"t=1,3 h",rules:["zero-product property","endpoint theorem"],correct_rule:"zero-product property"}],answerText:"Critical times are 1 h and 3 h."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["D=t^3-6t^2+9t+20", "0<=t<=5"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Find critical turbine demand in the form and units requested by the prompt"
  left_side: "t_critical"
  steps:
    - id: step_1
      doing: "power and sum rules"
      candidates:
        - {text: "D'=3t^2-12t+9", correct: true, rule: "power and sum rules"}
        - {text: "D'=t^2-6t+9", correct: false, survives: true, rule: "divide derivative by degree", reason: "This is the common divide derivative by degree mistake; it does not perform the licensed power and sum rules step."}
    - id: step_2
      doing: "factor quadratic"
      candidates:
        - {text: "3(t-1)(t-3)=0", correct: true, rule: "factor quadratic"}
        - {text: "3(t-2)^2=0", correct: false, survives: true, rule: "complete wrong square", reason: "This is the common complete wrong square mistake; it does not perform the licensed factor quadratic step."}
    - id: step_3
      doing: "zero-product property"
      candidates:
        - {text: "t=1,3 h", correct: true, rule: "zero-product property"}
        - {text: "t=0,5 h", correct: false, survives: true, rule: "endpoint theorem", reason: "This is the common endpoint theorem mistake; it does not perform the licensed zero-product property step."}
```
**Correct result:** `1,3 h`.

**Answer text:** Critical times are 1 h and 3 h.

**Why:** Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Wrong-path feedback:** Endpoints are extrema candidates but not critical interior points.

**State/output:** candidates lit; unlock 5.2.

## Stop 18 - Test the absolute peak

**Format/placement:** BALLPARK, at `machine-board`.

**Metadata:** Concept: 13 - EVT/first-second derivative tests; Keystone: Extrema; Area: Gate House; Learning role: PRACTICE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The interior demand checks are ready to be compared with the schedule endpoints.

**Question card story setup - exact player copy:** With critical times found, evaluate demand at t=0,1,3,5, then use derivative signs or D''(t)=6t-12 to justify the maximum. The machine limit is 24 MW, inclusive.

**Question card story-science connection - exact player copy:** The absolute maximum determines whether any part of the turbine schedule exceeds the machine's power limit.

**Question card prompt - exact player copy:** Using D(t)=t^3-6t^2+9t+20 MW, evaluate t=0,1,3,5 h; submit the absolute maximum in megawatts, its time in hours, and safe/unsafe against the inclusive 24 MW limit.

**Complete format-specific interaction block:** `estimate:{labels:["D(0)","D(1)","D(3)","D(5)"],values:[[20],[24],[20],[40]],slots:4,template:"largest candidate",formula:"D_max=max(20,24,20,40)",correct:[20,24,20,40],target:40,tolerance:0}`

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 40.0
  tolerance: 2.0
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 80.0}, {label: "displayed divisor", value: 2}]
  formula: "D_max=displayed numerator/displayed divisor"
  correctResultText: "`40 MW at 5 h`, unsafe; local max at `1 h` is `24 MW`."
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "absolute maximum demand"
  unit: "MW"
  inputs:
    - {label: "Demand at t=0 h", value: 20, unit: "MW"}
    - {label: "Demand at t=1 h", value: 24, unit: "MW"}
    - {label: "Demand at t=3 h", value: 20, unit: "MW"}
    - {label: "Demand at t=5 h", value: 40, unit: "MW"}
    - {label: "Inclusive machine limit", value: 24, unit: "MW", contextOnly: true}
  operation: "compare the endpoint and critical-point demand values and select the largest"
  formula: "D_max=max(20,24,20,40)"
  correctResult: 40
  tolerance: 0.1
  answerText: "The absolute maximum is 40 MW at 5 h, so the plan is unsafe against the inclusive 24 MW limit; 24 MW at 1 h is only a local maximum."
```

**Correct result:** `40 MW at 5 h`, unsafe; local max at `1 h` is `24 MW`.

**Answer text:** EVT requires endpoints plus critical points; the endpoint peak exceeds capacity.

**Why:** EVT requires endpoints plus critical points; the endpoint peak exceeds capacity. A correct maximum decides whether the two-day plan overloads the available unit.

**Wrong-path feedback:** A local maximum need not be the absolute maximum.

**State/output:** overload tag; waypoint to STORE.

## Stop 19 - Optimize storage against value

**Format/placement:** CONTROL, at `dispatch-console`.

**Metadata:** Concept: 11 - optimization/marginal value; Keystone: Extrema; Area: Powerhouse; Learning role: COMBINE; Difficulty: L5; Story role: character.

**Call - exact player copy:** Go to the dispatch console, in Powerhouse.

**Stop reason - exact player copy:** The unsafe power peak forces the crew to reconsider how much release buys useful storage margin.

**Question card story setup - exact player copy:** Because the power peak is unsafe, test release q=180 then 200 m^3/s while forecast inflow and starting level remain fixed. Measure projected storage margin, restore q=180, and compare marginal benefit.

**Question card story-science connection - exact player copy:** The controlled storage change measures the marginal benefit of increased discharge under the same inflow forecast.

**Question card prompt - exact player copy:** Choose release from the three candidate controls release, inflow forecast, and starting level. Measure projected storage margin at 180 m^3/s, change only release to 200 m^3/s while the forecast and starting level remain fixed, measure after the projection settles, restore 180 m^3/s and measure again, then submit the marginal gain in million m^3 per (m^3/s) and one causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"release",label:"release q"},{id:"forecast",label:"inflow forecast"},{id:"start",label:"starting level"}],correct_control:"release",baseline:180,response:200,noise_band:0.01,measurements:[0.42,0.50,0.42],restore:true,correct_conclusion:"Increasing q by 20 adds 0.08 million m^3 margin; 0.004 million m^3 per (m^3/s)."}`

**Correct result:** causal; marginal gain `.08/20=.004 million m^3 per (m^3/s)`.

**Answer text:** The completed check shows causal; marginal gain.08/20=.004 million m^3 per (m^3/s).

**Why:** causal; marginal gain `.08/20=.004 million m^3 per (m^3/s)`. A controlled reversal separates the release setting's effect from a changing forecast.

**Wrong-path feedback:** A one-way change without restoration cannot rule out drift.

**State/output:** feasible lower-power candidate; unlock 5.4.

## Stop 20 - Prove an intermediate crossing

**Format/placement:** CHOICE, asked by Nia Chen beside `machine-board`.

**Metadata:** Concept: 2 - IVT/MVT/differentiability; Keystone: Limits and extrema; Area: Storage & Level Board; Learning role: RETRIEVE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Nia Chen, at the machine board in Powerhouse.

**Stop reason - exact player copy:** The revised release plan still needs to establish whether reservoir height crosses the warning level.

**Question card story setup - exact player copy:** The continuous level model gives H(2)=4.3 m and H(4)=4.9 m, while warning level is 4.6 m. Choose the theorem guaranteeing a crossing, then distinguish it from the Mean Value Theorem.

**Question card story-science connection - exact player copy:** Continuity between the two measured heights can guarantee a level crossing without identifying its exact time.

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

**Segue - exact player copy:** But Imani cannot say when the crest arrives from that proof; the forecast must face data it has not seen.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mara Vale draws the MUST CROSS 4.6 M bracket between the endpoint marks. But Imani cannot say when the crest arrives from that proof; the forecast must face data it has not seen.

**Story event - exact player copy:** The control room replaces the average-based release plan with the safer setting.

TARGET `18:00`; auto `SAFE STORAGE +4`; canonical enter `69/68/68/80` -> `73/68/68/80`, award 12, allocate 7 Reserve, 5 Integrity -> `73/68/75/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains critical point?

**Options - exact player copy:**

- A. Greatest value on the full interval.
- B. An interior input where the derivative is zero or undefined.
- C. The derivative of a total with respect to one more unit.
- D. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for critical point. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes absolute maximum. It does not answer the question about critical point.
- B: Correct. An interior input where the derivative is zero or undefined.
- C: This describes marginal value. It does not answer the question about critical point.
- D: This describes critical points. It does not answer the question about critical point.

### Review question 2


**Prompt - exact player copy:** Which statement best explains absolute maximum?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. The derivative of a total with respect to one more unit.
- C. Greatest value on the full interval.
- D. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for absolute maximum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes critical point. It does not answer the question about absolute maximum.
- B: This describes marginal value. It does not answer the question about absolute maximum.
- C: Correct. Greatest value on the full interval.
- D: This describes critical points. It does not answer the question about absolute maximum.

### Review question 3


**Prompt - exact player copy:** Which statement best explains marginal value?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. Greatest value on the full interval.
- C. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for marginal value. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes critical point. It does not answer the question about marginal value.
- B: This describes absolute maximum. It does not answer the question about marginal value.
- C: This describes critical points. It does not answer the question about marginal value.
- D: Correct. The derivative of a total with respect to one more unit.

### Review question 4


**Prompt - exact player copy:** For D(t)=t³-6t²+9t+20 on 0≤t≤5, which interior times are critical points?

**Options - exact player copy:**

- A. t=1 and t=3, since D′(t)=3(t-1)(t-3).
- B. An interior input where the derivative is zero or undefined.
- C. Greatest value on the full interval.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for critical points. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. t=1 and t=3, since D′(t)=3(t-1)(t-3).
- B: This describes critical point. It does not answer the question about critical points.
- C: This describes absolute maximum. It does not answer the question about critical points.
- D: This describes marginal value. It does not answer the question about critical points.

### Review question 5


**Prompt - exact player copy:** A continuous function is defined on a closed interval and is differentiable except at finitely many interior points. How should its absolute maximum be found?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. Compare function values at both endpoints and every interior point where the derivative is zero or undefined.
- C. Greatest value on the full interval.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for evt and first-second derivative tests. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes critical point. It does not answer the question about evt and first-second derivative tests.
- B: Correct. Compare function values at both endpoints and every interior point where the derivative is zero or undefined.
- C: This describes absolute maximum. It does not answer the question about evt and first-second derivative tests.
- D: This describes marginal value. It does not answer the question about evt and first-second derivative tests.

### Review question 6


**Prompt - exact player copy:** A concave objective has derivative F′(x)=16-2x and feasible interval 0≤x≤6. Where is its maximum on the feasible interval?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. Greatest value on the full interval.
- C. At x=6: F′ stays positive on the feasible interval, and the unconstrained critical point x=8 is not allowed.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for optimization and marginal value. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes critical point. It does not answer the question about optimization and marginal value.
- B: This describes absolute maximum. It does not answer the question about optimization and marginal value.
- C: Correct. At x=6: F′ stays positive on the feasible interval, and the unconstrained critical point x=8 is not allowed.
- D: This describes marginal value. It does not answer the question about optimization and marginal value.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 6 - The Crest We Missed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 6 - 10 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Beyond the Old Horizon  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the high-ground gauge.  
**Card body:** 10 work shifts remain before the storm. A sealed high-ground trace rests under the old forecast. Today you decide which forecast earns use for the storm.
**Objective:** Select the forecast that survives unseen data.

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
  - id: headwater_m06_we01
    title: Resolve an exponential limit
    problem: Find L=lim(x→0)(e^(3x)-1)/x.
    rule: L'Hopital's rule applies here because substitution gives 0/0 and the differentiated ratio has a limit.
    steps:
    - 'Set up the relationship: L''Hopital''s rule applies here because substitution gives 0/0 and the differentiated ratio has a limit.'
    - L=lim(x→0)3e^(3x)/1=3. Numerator and denominator are differentiated separately.
    answer: The limit is 3.
    common_mistake: The quotient rule is not the operation used in L'Hopital's rule.
  - id: headwater_m06_we02
    title: Resolve a ratio at infinity
    problem: Find L=lim(x→∞)x/e^x.
    rule: The ratio has the form ∞/∞; L'Hopital's rule can be applied when its hypotheses hold.
    steps:
    - 'Set up the relationship: The ratio has the form ∞/∞; L''Hopital''s rule can be applied when its hypotheses hold.'
    - L=lim(x→∞)1/e^x=0. The exponential denominator grows without bound.
    answer: The ratio approaches 0.
    common_mistake: Infinity divided by infinity is not automatically 1.
  - id: headwater_m06_we03
    title: Read derivative signs
    problem: A function has f′(x)>0 and f″(x)<0 throughout an interval. Describe its graph.
    rule: The first derivative gives direction of change; the second gives change in slope.
    steps:
    - f′>0 means the function rises as x increases.
    - f″<0 means those positive slopes become smaller.
    answer: The function is increasing and concave down.
    common_mistake: Concave down does not necessarily mean decreasing.
  - id: headwater_m06_we04
    title: A measurement minus a prediction
    problem: A thermometer model predicts 20 °C; an independent thermometer reads 22 °C. Find the residual.
    rule: Residual = observed value - predicted value.
    steps:
    - residual = 22 °C - 20 °C. Keep observed first.
    - residual = +2 °C. The positive sign means the observation is above the prediction.
    answer: The model underpredicts this reading by 2 °C.
    common_mistake: Reversing the subtraction reverses the meaning of the sign.
  - id: headwater_m06_we05
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

L'Hopital's rule: when a limit has the indeterminate form 0/0 or infinity/infinity, differentiate the numerator and denominator separately and take the new limit, provided that new limit exists.

Residual: observed value minus model prediction.

Holdout data: observations hidden until a model is frozen.

#### Primer concepts

- Use L'Hopital's rule only after confirming an allowed indeterminate form.
- The derivative of e^(kt) is ke^(kt).
- Use derivative signs for shape and second-derivative signs for concavity.

#### Equations first needed today
**Equation:** If `L=lim_(t->a)N(t)/D(t)` has the form `0/0` or `infinity/infinity`, then `L=lim_(t->a)N'(t)/D'(t)` when the new limit exists.

**What it is for:** resolving an allowed indeterminate ratio after differentiation has been introduced.

**Symbols:** `L` is the limit, `N` is the numerator, `D` is the denominator, and primes denote derivatives.

**Why this campaign needs it:** the replacement forecast has an undefined ratio at its start even though its limiting rise rate is finite.

**Equation:** `residual=observed-predicted`

**What it is for:** exposing patterned model failure.

**Symbols:** observed is measurement; predicted is fitted value.

**Why this campaign needs it:** unseen gauge data decides between forecasts.

## Main story happening - designer summary

An independent limiting-rate check supports a replacement model; frozen holdout testing then reveals a missed later crest.

## Learning and dramatic intent

Teach full curve behavior and honest validation while delivering Twist 1.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `trace-bench` | automatic**

**Trigger:** mission_6_arrival.

**World state:** A sealed high-ground trace rests under the old forecast.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with the indeterminate-rate check. We now have the derivative tools to test the replacement forecast properly."

**Unlocks/waypoint:** Unlock Stop 21 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 21 | `high-ground-gauge` | automatic**

**Trigger:** accepted_stop_21.

**World state:** At `trace-bench`, the dated accepted-result slip for Stop 21 reads: "L=0.020 m/h.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "That check holds. The failed rational forecast needs comparison with a bounded alternative across the full forecast window."

**Unlocks/waypoint:** Unlock Stop 22 at `high-ground-gauge` in Catchment & Inflow Desk.

**Beat 3 - After Stop 22 | `forecast-drawer` | automatic**

**Trigger:** accepted_stop_22.

**World state:** At `high-ground-gauge`, the dated accepted-result slip for Stop 22 reads: "t=4, 36.850 mm/h, tolerance .01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The alternative forecasts must be frozen before the archived crest is revealed."

**Unlocks/waypoint:** Unlock Stop 23 at `forecast-drawer` in Catchment & Inflow Desk.

**Beat 4 - After Stop 23 | `gauge-wall` | automatic**

**Trigger:** accepted_stop_23.

**World state:** At `forecast-drawer`, the dated accepted-result slip for Stop 23 reads: "B.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "That check holds. The holdout result favors one forecast, but the crew still needs to understand the other's failure."

**Unlocks/waypoint:** Unlock Stop 24 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**Trigger:** accepted_stop_24.

**World state:** At `forecast-drawer`, Imani Okoro files the failed forecast under MISSED LATER CREST. The dated prop remains here on later visits.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "I wanted a shifted clock. The mountain sent more water. Therefore Leila must total the larger storm before Mara can set the drawdown; the later peak adds water, not just time."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m06

**Home:** `forecast-drawer`. **Before:** The dated mission-6 evidence holder at this fixture has no accepted record. A sealed high-ground trace rests under the old forecast.
**After — exact action:** Imani Okoro files the failed forecast under MISSED LATER CREST.
**Trigger:** accepted_stop_24. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `water-ledger`, the storm total fills a strip longer than the storage allowance.
**Segue - exact player copy:** Therefore Leila must total the larger storm before Mara can set the drawdown; the later peak adds water, not just time.

## Location plan

INFLOW to ARCHIVE; gauge supplies models, archive alone holds unseen readings.

## Characters and dramatic beat

Imani admits the terrain limitation rather than blaming the new instrument.

## Key concepts, explained here

L'Hopital's rule for allowed indeterminate forms, exponential derivatives, derivative and concavity signs, holdout residuals, curve sketching.

## Stop 21 - Check the indeterminate rate

**Format/placement:** BALLPARK, at `trace-bench`.

**Metadata:** Concept: 10 - L'Hopital's rule; Keystone: Limits; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The crew can now use differentiation to resolve the replacement forecast's undefined starting rate.

**Question card story setup - exact player copy:** A replacement forecast gives average rise A(t)=(e^(0.02t)-1)/t metres per hour during the first t hours. Because A(0) is undefined, calculate L=lim_(t->0)A(t), the rise rate approached when the forecast begins.

**Question card story-science connection - exact player copy:** The initial rate limit establishes whether the exponential forecast begins with a finite reservoir-rise prediction.

**Question card prompt - exact player copy:** Let `L=lim_(t->0) A(t)=lim_(t->0)(e^(0.02t)-1)/t`. Confirm the 0/0 form, apply L'Hopital's rule by differentiating the numerator and denominator separately, preserve `L` on the left, and submit the limit in metres per hour.

**Complete format-specific interaction block:** `estimate:{labels:["N'(0), numerator derivative at 0","D'(0), denominator derivative at 0"],values:[[0.02,1],[1,0]],slots:2,template:"L=N'(0)/D'(0)",formula:"L=0.02/1",correct:[0.02,1],target:0.02,tolerance:0.0001}`; `answerText:"The starting rise rate is L=0.020 m/h because N'(0)=0.02 and D'(0)=1."`

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 0.02
  tolerance: 0.0001
  unit: "m/h"
  tiles: [{label: "N'(0)", value: 0.02}, {label: "D'(0)", value: 1}]
  formula: "L=N'(0)/D'(0)"
  correctResultText: "L=0.020 m/h"
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "limiting starting rise rate L"
  unit: "m/h"
  inputs:
    - {label: "N'(0), numerator derivative at t=0", value: 0.02, unit: "m/h"}
    - {label: "D'(0), denominator derivative", value: 1, unit: "dimensionless"}
  operation: "divide N'(0) by D'(0)"
  formula: "L=0.02/1"
  correctResult: 0.02
  tolerance: 0.0001
  answerText: "The differentiated ratio is 0.02e^(0.02t)/1, so L=0.020 m/h."
```

**Correct result:** `L=0.020 m/h`.

**Answer text:** The replacement forecast begins with a finite limiting rise rate of 0.020 m/h.

**Why:** The original ratio has the indeterminate form 0/0, and the differentiated ratio approaches 0.02/1.

**Wrong-path feedback:** L'Hopital's rule applies only after the original ratio is confirmed as 0/0 or infinity/infinity.

**State/output:** replacement forecast passes the independent smooth-start check; unlock 6.2.

## Stop 22 - Read inverse-shaped saturation

**Format/placement:** SWEEP, at `high-ground-gauge`.

**Metadata:** Concept: 6 - arctan derivative/asymptote; Keystone: Chain/inverse; Area: Storage & Level Board; Learning role: RETRIEVE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the high-ground gauge, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The failed rational forecast needs comparison with a bounded alternative across the full forecast window.

**Question card story setup - exact player copy:** Because the rational forecast blows up, sweep the displayed saturating forecast from time zero through ten hours. Record where its slope is largest and the horizontal value it approaches as time grows.

**Question card story-science connection - exact player copy:** The maximum slope and limiting rainfall rate identify the replacement model's fastest change and long-term ceiling.

**Question card prompt - exact player copy:** Sweep t from 0 through 10 h in 0.5 h steps, collect readings across the interval, and submit the maximum-slope time in hours plus the upper asymptote in mm/h.

**Complete format-specific interaction block:** `sweep:{control:"t",min:0,max:10,step:0.5,unit:"h",response:"S(t) mm/h",required_points:[0,4,8,10],correct_conclusion:"maximum slope at t=4; upper asymptote 18+6pi=36.850 mm/h"}`.

**§7 authored-board source - SWEEP:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 22 - Read inverse-shaped saturation"
  format: "SWEEP"
  source: "Handback 5 canonical interaction block"
  question: "Sweep time from 0 through 10 h in 0.5 h steps, collect readings across the interval, and submit the maximum-slope time in hours plus the upper asymptote in mm/h."
  payload: "`sweep:{control:\"t\",min:0,max:10,step:0.5,unit:\"h\",response:\"S(t) mm/h\",required_points:[0,4,8,10],correct_conclusion:\"maximum slope at t=4; upper asymptote 18+6pi=36.850 mm/h\"}`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - SWEEP:**

**Handback 5 canonical interaction block - SWEEP:**

```yaml
sweep:
  axis: {label: "time t", min: 0, max: 10, step: 0.5, unit: h}
  response: {label: "saturation rate S(t)", unit: "mm/h"}
  series:
    - {at: 0, value: 0.706}
    - {at: 2, value: 2.4}
    - {at: 4, value: 12.0}
    - {at: 6, value: 2.4}
    - {at: 8, value: 0.706}
    - {at: 10, value: 0.324}
  start: 0
  target: 4
  tolerance: 0.25
  secondaryResult: {upperAsymptote: 36.850, unit: "mm/h", tolerance: 0.01}
  correctResult: "`t=4`, `36.850 mm/h`, tolerance `.01`."
```

**Handback 6 canonical interaction block - SWEEP:**

```yaml
sweep:
  axis: {label: "time t", min: 0, max: 10, step: 0.5, unit: h}
  response: {label: "saturation-rate slope", unit: "mm/h²"}
  series:
    - {at: 0, value: 0.706}
    - {at: 2, value: 2.4}
    - {at: 4, value: 12.0}
    - {at: 6, value: 2.4}
    - {at: 8, value: 0.706}
    - {at: 10, value: 0.324}
  start: 0
  target: 4
  tolerance: 0.25
  secondaryResult: {upperAsymptote: 36.850, unit: "mm/h", tolerance: 0.01}
  correctResult: "Maximum slope at the axis location where the displayed slope peaks; upper asymptote 36.850 mm/h."
```

**Correct result:** `t=4`, `36.850 mm/h`, tolerance `.01`.

**Answer text:** `S'=12/[1+(t-4)^2]`, largest at 4; `arctan -> pi/2`.

**Why:** `S'=12/[1+(t-4)^2]`, largest at 4; `arctan -> pi/2`. A smooth saturating curve can represent a storm band without an artificial infinite spike.

**Wrong-path feedback:** The function's maximum slope and maximum value are different.

**State/output:** travel to ARCHIVE.

## Stop 23 - Freeze before revealing the crest

**Format/placement:** HOLDOUT, at `forecast-drawer`.

**Metadata:** Concept: 25 - curve shape/model validation; Keystone: Extrema/concavity; Area: Forecast Archive; Learning role: RETRIEVE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the forecast drawer, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The alternative forecasts must be frozen before the archived crest is revealed.

**Question card story setup - exact player copy:** With the plausible model identified, fit old radar hours 0-5 using Forecast A or B and freeze every parameter. The archive then reveals high-ground readings at hours 6-9 to test extrapolation.

**Question card story-science connection - exact player copy:** Performance on the unseen crest determines which forecast deserves to guide the storm-storage plan.

**Question card prompt - exact player copy:** Fit and freeze exactly one named model using hours 0-5, reveal hours 6-9, and submit the model label A or B that passes the holdout.

**Complete format-specific interaction block:** `holdout:{training:[{t:0,y:19},{t:2,y:21},{t:4,y:29},{t:5,y:33}],models:[{id:"A",pred_holdout:[31,27,22,19]},{id:"B",pred_holdout:[35,37,34,28]}],freeze_required:true,holdout:[{t:6,y:35},{t:7,y:38},{t:8,y:34},{t:9,y:29}],answer:"B"}`

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 23 - Freeze before revealing the crest"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Fit and freeze exactly one named model using hours 0-5, reveal hours 6-9, and submit the model label A or B that passes the holdout."
  payload: "`holdout:{training:[{t:0,y:19},{t:2,y:21},{t:4,y:29},{t:5,y:33}],models:[{id:\"A\",pred_holdout:[31,27,22,19]},{id:\"B\",pred_holdout:[35,37,34,28]}],freeze_required:true,holdout:[{t:6,y:35},{t:7,y:38},{t:8,y:34},{t:9,y:29}],answer:\"B\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed crest-flow prediction error", min: 0, max: 8, step: 2, unit: "m³/s"}
  fit: [{at: 0, value: 0.58}, {at: 2, value: 0.98}, {at: 4, value: 0.83}, {at: 6, value: 0.87}, {at: 8, value: 0.84}]
  test: [{at: 0, value: 0.35}, {at: 2, value: 0.48}, {at: 4, value: 0.74}, {at: 6, value: 0.86}, {at: 8, value: 0.85}]
  passScore: 0.80
  overfitAt: 2
  correctAt: 6
  training: [{at: 0, value: 19}, {at: 2, value: 21}, {at: 4, value: 29}, {at: 5, value: 33}]
  testReadings: [{at: 6, value: 35}, {at: 7, value: 38}, {at: 8, value: 34}, {at: 9, value: 29}]
  modelPredictions: {A: [31, 27, 22, 19], B: [35, 37, 34, 28]}
  correctChoice: B
```

**Correct result:** B.

**Answer text:** B residuals `[0,1,0,1]`; A residuals `[4,11,12,10]` form a missed crest.

**Why:** B residuals `[0,1,0,1]`; A residuals `[4,11,12,10]` form a missed crest. A model that fits training data but misses a patterned holdout crest cannot guide release.

**Wrong-path feedback:** Training fit does not validate extrapolation.

**State/output:** late crest on wall; unlock 6.4.

## Stop 24 - Diagnose the full curve

**Format/placement:** RESIDUAL, at `gauge-wall`.

**Metadata:** Concept: 11 - curve sketching/signs; Keystone: Extrema/limits; Area: Storage & Level Board; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The holdout result favors one forecast, but the crew still needs to understand the other's failure.

**Question card story setup - exact player copy:** Forecast B matches the holdout values, so inspect its residual field, derivative signs, and concavity around the crest. Decide whether a bias, timing shift, or missing peak best explains Forecast A's failure.

**Question card story-science connection - exact player copy:** Residual shape and curvature distinguish a missing flood peak from a simple bias or timing offset.

**Question card prompt - exact player copy:** Compare all three labeled residual fields and submit exactly one conclusion: bias, timing, or missing_peak. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:** `residual:{fields:[{id:"bias",residuals:[6,6,6,6],rms:6},{id:"timing",residuals:[-3,0,3,0],rms:2.12},{id:"missing_peak",residuals:[4,11,12,10],rms:9.72}],features:["A residuals positive through crest","B derivative + then -","B concavity changes before crest"],correct:"missing_peak"}`

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 24 - Diagnose the full curve"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare all three labeled residual fields and submit exactly one conclusion: bias, timing, or missing_peak."
  payload: "`residual:{fields:[{id:\"bias\",residuals:[6,6,6,6],rms:6},{id:\"timing\",residuals:[-3,0,3,0],rms:2.12},{id:\"missing_peak\",residuals:[4,11,12,10],rms:9.72}],features:[\"A residuals positive through crest\",\"B derivative + then -\",\"B concavity changes before crest\"],correct:\"missing_peak\"}`"
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
  correctConclusion: "missing peak."
```

**Correct result:** missing peak.

**Answer text:** systematic positive residuals at the crest show the old forecast underestimates a later, larger storm.

**Why:** systematic positive residuals at the crest show the old forecast underestimates a later, larger storm. Pattern, not merely low average error, identifies the failed mechanism.

**Wrong-path feedback:** Lowest RMS alone is not the question when residual shape diagnoses mechanism.

**State/output:** Forecast B controls.

## Mission outcome

Mission decision: Use Forecast B. It stays finite, predicts a later crest, and survives unseen high-ground data. The old model missed the peak rather than suffering a constant bias. More water is coming, so the crew must total the full storm volume.

**Segue - exact player copy:** Therefore Leila must total the larger storm before Mara can set the drawdown; the later peak adds water, not just time.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Imani Okoro files the failed forecast under MISSED LATER CREST. Therefore Leila must total the larger storm before Mara can set the drawdown; the later peak adds water, not just time.

**Story event - exact player copy:** Forecast B becomes the official storm forecast and raises the required drawdown.

TARGET `19:00`; automatic `SAFE STORAGE -8 | OPERATING RESERVE -3`; canonical enter `73/68/75/85` -> `65/68/72/85`, award 12, allocate all Storage -> `77/68/72/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** For the function f(x)=2+1/(x+1), what horizontal asymptote is approached as x increases without bound?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "x",
  "yLabel": "f(x)",
  "caption": "f(x)=2+1/(x+1), shown for x≥0",
  "series": [
    {
      "name": "f(x)",
      "points": [
        [
          0,
          3.0
        ],
        [
          1,
          2.5
        ],
        [
          2,
          2.3333333333333335
        ],
        [
          3,
          2.25
        ],
        [
          4,
          2.2
        ],
        [
          5,
          2.1666666666666665
        ],
        [
          6,
          2.142857142857143
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. y=0.
- B. x=-1.
- C. y=3.
- D. y=2.

**Correct answer:** D

**Hint - exact player copy:** Find the limit of the reciprocal term as x grows.

**Option feedback - exact player copy:**

- A: Only the reciprocal term approaches zero; the constant 2 remains.
- B: That is a vertical asymptote, not a horizontal one.
- C: 3 is the value at x=0, not the long-run limit.
- D: Correct. y=2.

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

- A. The model increasingly underpredicts as the input grows.
- B. The model increasingly overpredicts.
- C. The errors have no relation to the input.
- D. The model fits every observation exactly.

**Correct answer:** A

**Hint - exact player copy:** Use the sign of observed minus predicted and check for a pattern.

**Option feedback - exact player copy:**

- A: Correct. The model increasingly underpredicts as the input grows.
- B: Positive residuals mean observations exceed predictions, not the reverse.
- C: Residuals rise systematically with the input.
- D: An exact fit would have zero residual at every point.

### Review question 3


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
- B. It tests prediction on data that did not set the model.
- C. It makes the test observations part of the training data retroactively.
- D. It removes all uncertainty from the observations.

**Correct answer:** B

**Hint - exact player copy:** Ask whether the model could have been tuned to these test values.

**Option feedback - exact player copy:**

- A: Agreement at these inputs cannot establish universal correctness.
- B: Correct. It tests prediction on data that did not set the model.
- C: The prediction was fixed without using these observations.
- D: Withholding data does not eliminate measurement uncertainty.

### Review question 4


**Prompt - exact player copy:** Evaluate lim(t→0)(e^(0.04t)-1)/t. If using L’Hôpital’s rule, differentiate the numerator and denominator separately.

**Options - exact player copy:**

- A. 0.
- B. 1.
- C. 0.04.
- D. The limit is infinite.

**Correct answer:** C

**Hint - exact player copy:** The derivative of e^(at) is ae^(at).

**Option feedback - exact player copy:**

- A: The form 0/0 is indeterminate, not a result.
- B: Differentiating e^(0.04t) also gives the factor 0.04.
- C: Correct. 0.04.
- D: The numerator approaches zero at the same first-order rate as 0.04t.

### Review question 5


**Prompt - exact player copy:** For S(t)=12 arctan(t-4), at which t is S′(t) largest?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "t",
  "yLabel": "S(t)",
  "caption": "S(t)=12 arctan(t−4), with angles in radians",
  "series": [
    {
      "name": "S(t)",
      "points": [
        [
          0,
          -15.909811964016392
        ],
        [
          1,
          -14.988549268779053
        ],
        [
          2,
          -13.285784613529085
        ],
        [
          3,
          -9.42477796076938
        ],
        [
          4,
          0.0
        ],
        [
          5,
          9.42477796076938
        ],
        [
          6,
          13.285784613529085
        ],
        [
          7,
          14.988549268779053
        ],
        [
          8,
          15.909811964016392
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. t=0.
- B. t=8.
- C. The slope is constant.
- D. t=4.

**Correct answer:** D

**Hint - exact player copy:** Maximize 12/[1+(t-4)²] by minimizing its positive denominator.

**Option feedback - exact player copy:**

- A: The denominator 1+(t-4)² is not smallest at 0.
- B: At 8 the slope has already decreased from its midpoint value.
- C: S′=12/[1+(t-4)²] varies with t.
- D: Correct. t=4.

### Review question 6


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

- A. The model increasingly underpredicts as the input grows.
- B. The model increasingly overpredicts.
- C. The errors have no relation to the input.
- D. The model fits every observation exactly.

**Correct answer:** A

**Hint - exact player copy:** Use the sign of observed minus predicted and check for a pattern.

**Option feedback - exact player copy:**

- A: Correct. The model increasingly underpredicts as the input grows.
- B: Positive residuals mean observations exceed predictions, not the reverse.
- C: Residuals rise systematically with the input.
- D: An exact fit would have zero residual at every point.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 7 - Room for the Storm

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 7 - 9 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Count Every Cubic Metre  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** 9 work shifts remain before the storm. The storm total fills a strip longer than the storage allowance. Today you decide how much room to clear before rain.
**Objective:** Calculate storm inflow and required empty storage.

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
  - id: headwater_m07_we01
    title: Find an antiderivative
    problem: Find every antiderivative of f(x)=6x².
    rule: 'Reverse the power rule: integral x^n dx=x^(n+1)/(n+1)+C for n≠-1.'
    steps:
    - 'Set up the relationship: Reverse the power rule: integral x^n dx=x^(n+1)/(n+1)+C for n≠-1.'
    - F(x)=6x³/3+C=2x³+C; checking gives F′(x)=6x².
    answer: The family is F(x)=2x³+C.
    common_mistake: An indefinite integral needs the arbitrary constant.
  - id: headwater_m07_we02
    title: Evaluate a definite integral
    problem: Find A=integral from 0 to 2 of 3x² dx.
    rule: A=F(2)-F(0), where F′(x)=3x².
    steps:
    - 'Set up the relationship: A=F(2)-F(0), where F′(x)=3x².'
    - F(x)=x³, so A=2³-0³=8.
    answer: The signed accumulation is 8.
    common_mistake: Evaluate upper bound minus lower bound.
  - id: headwater_m07_we03
    title: Estimate with left rectangles
    problem: A rate r(t)=t+1 L/min is sampled at t=0,1,2 min. Estimate volume on [0,2] using two left rectangles.
    rule: Left sum = sum of left-endpoint rates × interval width.
    steps:
    - 'Set up the relationship: Left sum = sum of left-endpoint rates × interval width.'
    - V_left=[r(0)+r(1)](1)=(1+2)(1)=3 L.
    answer: The estimate is 3 L and underestimates this increasing rate.
    common_mistake: There are two intervals, not three rectangles.
    figure:
      kind: line
      xLabel: Time (min)
      yLabel: Rate (L/min)
      caption: Increasing flow rate.
      series:
      - name: Rate (L/min)
        points:
        - - 0
          - 1
        - - 1
          - 2
        - - 2
          - 3
  - id: headwater_m07_we04
    title: Estimate with trapezoids
    problem: A rate is 2,4,6 L/min at times 0,1,2 min. Estimate total volume.
    rule: Each trapezoid contributes average endpoint rate × interval width.
    steps:
    - 'Set up the relationship: Each trapezoid contributes average endpoint rate × interval width.'
    - V=[(2+4)/2](1)+[(4+6)/2](1)=3+5=8 L.
    answer: The trapezoidal estimate is 8 L.
    common_mistake: Average adjacent endpoints for each interval, not every reading equally.
  - id: headwater_m07_we05
    title: Differentiate an accumulation
    problem: Let A(x)=integral from 0 to x of (t²+1) dt. Find A′(2).
    rule: The Fundamental Theorem of Calculus gives A′(x)=x²+1.
    steps:
    - 'Set up the relationship: The Fundamental Theorem of Calculus gives A′(x)=x²+1.'
    - A′(2)=2²+1=5. The derivative recovers the current integrand value.
    answer: A′(2)=5.
    common_mistake: You need not calculate A(2) to find its derivative.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Antiderivative: a function whose derivative is the integrand.

Riemann sum: rectangles approximating accumulated change.

Definite integral: signed accumulation across bounds.

#### Primer concepts

- Include `+C` for indefinite integrals; the fundamental theorem of calculus (FTC) evaluates an antiderivative at bounds; left/right accuracy follows monotonicity and trapezoid error follows concavity.

#### Equations first needed today
**Equation:** `integral_a^b f(x)dx=F(b)-F(a)`

**What it is for:** exact accumulation.

**Symbols:** `f` rate, `F` antiderivative, `a,b` bounds.

**Why this campaign needs it:** storm flow must become storm volume.

**Equation:** `lim_(n->infinity) sum f(x_i)Delta x=integral_a^b f(x)dx`, `Delta x=(b-a)/n`

**What it is for:** linking sampled rectangles to exact accumulation.

**Symbols:** `n` rectangles and `x_i` sample points.

**Why this campaign needs it:** gauges provide discrete readings.

## Main story happening - designer summary

Discrete and exact accumulation convert the larger crest into a drawdown target.

## Learning and dramatic intent

Move from rate samples to Riemann sums, antiderivatives, and both FTC parts.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `gauge-wall` | automatic**

**Trigger:** mission_7_arrival.

**World state:** The storm total fills a strip longer than the storage allowance.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with estimate sampled inflow. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 25 | `trace-bench` | automatic**

**Trigger:** accepted_stop_25.

**World state:** At `gauge-wall`, the dated accepted-result slip for Stop 25 reads: "L=12.6, R=16.2, T=14.4 million m^3.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Leila Hassan: "That check holds. The numerical storm-volume estimate needs an exact check using the fitted inflow function."

**Unlocks/waypoint:** Unlock Stop 26 at `trace-bench` in Catchment & Inflow Desk.

**Beat 3 - After Stop 26 | `trace-bench` | automatic**

**Trigger:** accepted_stop_26.

**World state:** At `trace-bench`, the dated accepted-result slip for Stop 26 reads: "17,280,000 m^3, tolerance 1000.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Leila Hassan: "That check holds. The total-volume check must be reconciled with the live accumulator's changing display."

**Unlocks/waypoint:** Unlock Stop 27 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 27 | `water-ledger` | automatic**

**Trigger:** accepted_stop_27.

**World state:** At `trace-bench`, the dated accepted-result slip for Stop 27 reads: "210; pass.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Leila Hassan: "That check holds. The storm volume is established, allowing the crew to compare it with available empty storage."

**Unlocks/waypoint:** Unlock Stop 28 at `water-ledger` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**Trigger:** accepted_stop_28.

**World state:** At `water-ledger`, Leila Hassan pins the DRAW DOWN 5.28 MILLION CUBIC METRES card to the ledger. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Leila Hassan: "Now the empty space has a number. But Nia's turbines cannot clear it all; the gates must take a share without flooding Elise's valley."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m07

**Home:** `water-ledger`. **Before:** The dated mission-7 evidence holder at this fixture has no accepted record. The storm total fills a strip longer than the storage allowance.
**After — exact action:** Leila Hassan pins the DRAW DOWN 5.28 MILLION CUBIC METRES card to the ledger.
**Trigger:** accepted_stop_28. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `hoist-stand`, the hoist rests at its baseline mark above a dry spillway.
**Segue - exact player copy:** But Nia's turbines cannot clear it all; the gates must take a share without flooding Elise's valley.

## Location plan

INFLOW to STORE; only STORE contains current empty capacity and safety margin.

## Characters and dramatic beat

Imani owns inflow total; Mara converts it into operational room.

## Key concepts, explained here

Riemann sums, left/right/trapezoid behavior, antiderivatives and `+C`, linearity, FTC 1/2, signed accumulation.

## Stop 25 - Estimate sampled inflow

**Format/placement:** BALLPARK, at `gauge-wall`.

**Metadata:** Concept: 14 - L/R/trapezoid sums; Keystone: Accumulation; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The selected forecast supplies flow rates, while the storage plan requires the accumulated storm volume.

**Question card story setup - exact player copy:** Forecast flows at hours 0,5,10,15,20 are 100,150,200,250,300 m3/s. Compute left, right, and trapezoidal sums using 5 h=18,000 s, then compare their likely bias from the rise.

**Question card story-science connection - exact player copy:** The three numerical sums bound and estimate incoming water while exposing bias from the rising sampled flow.

**Question card prompt - exact player copy:** Load the five flows in m^3/s, use Delta t=5 h=18000 s, and submit the trapezoidal total in million cubic metres. Then identify the left sum as low and the right sum as high.

**Complete format-specific interaction block:** `balance:{streams:[{id:"left_sum",label:"left-endpoint estimate",values:[100,150,200,250],weight:18000,unit:"m3",counts:true},{id:"right_sum",label:"right-endpoint estimate",values:[150,200,250,300],weight:18000,unit:"m3",counts:true},{id:"trapezoid",label:"trapezoidal estimate",values:[125,175,225,275],weight:18000,unit:"m3",counts:true},{id:"midpoint_guess",label:"unsupported midpoint guess",value:15000000,unit:"m3",counts:false,reason:"no midpoint readings were observed"}],correct:{left_sum:12600000,right_sum:16200000,trapezoid:14400000},answerText:"Left and right sums bracket the rising flow; the trapezoidal estimate is 14,400,000 m3, and the unsupported midpoint guess does not count."}`

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 25 - Estimate sampled inflow"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Load the five flows in m^3/s, use Delta t=5 h=18000 s, and submit the left, right, and trapezoidal totals in cubic metres plus an over/under conclusion."
  payload: "`balance:{streams:[{id:\"left_sum\",label:\"left-endpoint estimate\",values:[100,150,200,250],weight:18000,unit:\"m3\",counts:true},{id:\"right_sum\",label:\"right-endpoint estimate\",values:[150,200,250,300],weight:18000,unit:\"m3\",counts:true},{id:\"trapezoid\",label:\"trapezoidal estimate\",values:[125,175,225,275],weight:18000,unit:\"m3\",counts:true},{id:\"midpoint_guess\",label:\"unsupported midpoint guess\",value:15000000,unit:\"m3\",counts:false,reason:\"no midpoint readings were observed\"}],correct:{left_sum:12600000,right_sum:16200000,trapezoid:14400000},answerText:\"Left and right sums bracket the rising flow; the trapezoidal estimate is 14,400,000 m3, and the unsupported midpoint guess does not count.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "trapezoidal inflow volume"
  unit: "million m³"
  inputs:
    - {label: "Five-hour flow readings", values: [100, 150, 200, 250, 300], unit: "m³/s"}
    - {label: "Interval width", value: 18000, unit: "s"}
  operation: "average each adjacent pair, sum the four averages, multiply by 18000 s, then divide by 1000000"
  formula: "V_trap=18000[(100+150)/2+(150+200)/2+(200+250)/2+(250+300)/2]/1000000"
  start: 0
  correctResult: 14.4
  tolerance: 0.1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** `L=12.6`, `R=16.2`, `T=14.4 million m^3`.

**Answer text:** for this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints.

**Why:** for this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Wrong-path feedback:** Convert hours to seconds.

**State/output:** estimated band; unlock 7.2.

## Stop 26 - Build exact accumulation

**Format/placement:** DERIVE, at `trace-bench`.

**Metadata:** Concept: 16 - antiderivatives/linearity/FTC/Riemann limit; Keystone: FTC; Area: Storage & Level Board; Learning role: INTRODUCE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The numerical storm-volume estimate needs an exact check using the fitted inflow function.

**Question card story setup - exact player copy:** Use I(t)=120+10t-(5/24)t^2 m3/s for 0<=t<=24 h. Build its antiderivative and evaluate the definite integral, converting hours to seconds, to check the sampled estimate near 17 million m3.

**Question card story-science connection - exact player copy:** The definite integral converts the changing inflow rate into total water the reservoir must accommodate.

**Fixture source panel - exact player copy:** Use I(t)=120+10t-(5/24)t^2 m³/s for 0<=t<=24 h. Build its antiderivative and evaluate the definite integral, using 3600 s/h to convert the time units. Check the sampled estimate near 17 million m³.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit cubic metres.

**Complete format-specific interaction block:** `derive:{left_side:"V_storm",goal:"storm volume",givens:["I=120+10t-(5/24)t^2","0<=t<=24 h","3600 s/h"],lines:[{expressions:["F=120t+5t^2-(5/72)t^3+C","F=120+10t^2-(5/12)t^3"],correct:"F=120t+5t^2-(5/72)t^3+C",rules:["linearity and power antiderivative","differentiate"],correct_rule:"linearity and power antiderivative"},{expressions:["V_storm = [F(24)-F(0)]*3600","V_storm = [F(24)-F(0)]*24"],correct:"V_storm = [F(24)-F(0)]*3600",rules:["FTC Part 1 and unit conversion","mean value"],correct_rule:"FTC Part 1 and unit conversion"},{expressions:["V_storm = [120(24)+5(24)^2-(5/72)(24)^3-0]×3600 = 17,280,000 m^3","V_storm = 4,800 m^3"],correct:"V_storm = [120(24)+5(24)^2-(5/72)(24)^3-0]×3600 = 17,280,000 m^3",rules:["evaluate bounds","omit seconds"],correct_rule:"evaluate bounds"}],answerText:"The modeled storm adds 17,280,000 m^3."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["I=120+10t-(5/24)t^2", "0<=t<=24 h", "3600 s/h"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Build exact accumulation in the form and units requested by the prompt"
  left_side: "V_storm"
  steps:
    - id: step_1
      doing: "linearity and power antiderivative"
      candidates:
        - {text: "F=120t+5t^2-(5/72)t^3+C", correct: true, rule: "linearity and power antiderivative"}
        - {text: "F=120+10t^2-(5/12)t^3", correct: false, survives: true, rule: "differentiate", reason: "This is the common differentiate mistake; it does not perform the licensed linearity and power antiderivative step."}
    - id: step_2
      doing: "FTC Part 1 and unit conversion"
      candidates:
        - {text: "V_storm = [F(24)-F(0)]*3600", correct: true, rule: "FTC Part 1 and unit conversion"}
        - {text: "V_storm = [F(24)-F(0)]*24", correct: false, survives: true, rule: "mean value", reason: "This is the common mean value mistake; it does not perform the licensed FTC Part 1 and unit conversion step."}
    - id: step_3
      doing: "evaluate bounds"
      candidates:
        - {text: "V_storm = [120(24)+5(24)^2-(5/72)(24)^3-0]×3600 = 17,280,000 m^3", correct: true, rule: "evaluate bounds"}
        - {text: "V_storm = 4,800 m^3", correct: false, survives: true, rule: "omit seconds", reason: "This is the common omit seconds mistake; it does not perform the licensed evaluate bounds step."}
```
**Correct result:** `17,280,000 m^3`, tolerance `1000`.

**Answer text:** The modeled storm adds 17,280,000 m^3.

**Why:** The modeled storm adds 17,280,000 m^3. FTC converts the continuous forecast rate into total incoming volume.

**Wrong-path feedback:** The antiderivative constant cancels in a definite integral, but belongs in the indefinite family.

**State/output:** exact total; waypoint STORE.

## Stop 27 - Verify FTC Part 2

**Format/placement:** VERIFY, at `trace-bench`.

**Metadata:** Concept: 16 - accumulation derivative; Keystone: FTC; Area: Gate House; Learning role: PRACTICE; Difficulty: L4; Story role: verification.

**Call - exact player copy:** Go to the trace bench, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The total-volume check must be reconciled with the live accumulator's changing display.

**Question card story setup - exact player copy:** The exact total agrees with the numerical estimate. Now test the live accumulator A(x)=integral_0^x I(t)dt. Predict A'(12), advance the clock around hour 12, and compare the measured accumulation slope with inflow.

**Question card story-science connection - exact player copy:** The accumulator slope tests whether measured accumulation changes at the inflow rate predicted by the Fundamental Theorem of Calculus.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** For $A(x)=\int_0^x I(t)dt$ and $I(t)=120+10t-(5/24)t^2$ m^3/s, submit $A'(12)$ in m^3/s; the clock remains locked until commitment. **OPERATE:** Advance from 11.9 to 12.1 h with Forecast B and release 0 fixed. **MEASURE:** Record accumulator slope and inflow gauge at hour 12. **INTERPRET:** Submit PASS or FAIL; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:210,unit:"m^3/s",tolerance:1},equipment_locked_until_prediction_commit:true,operation:"advance 11.9 to 12.1 h",fixed:["forecast B","release 0"],measurements:["accumulator slope 209.9 m^3/s","gauge 210.0 m^3/s"],restore:false,correct_conclusion:"passes"}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify FTC Part 2", unit: "units printed on the card"}
  predictionRange: {min: 105.0, max: 315.0, step: 21.0}
  measurement: {label: "independent measured value", truth: 210.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`210`; pass."
```

**Correct result:** `210`; pass.

**Answer text:** `120+10(12)-(5/24)(12^2)=210`; both readings agree within `1 m^3/s`.

**Why:** `120+10(12)-(5/24)(12^2)=210`; both readings agree within `1 m^3/s`. FTC Part 2 certifies that the totalizer and rate gauge describe the same water.

**Wrong-path feedback:** The derivative of an accumulation with upper bound `x` is the integrand at `x`.

**State/output:** totalizer certified; unlock 7.4.

## Stop 28 - Separate signed change from physical volume

**Format/placement:** CHOICE, asked by Imani Okoro beside `water-ledger`.

**Metadata:** Concept: 22 - signed integral/area/sum bias; Keystone: Accumulation; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Imani Okoro, at the water ledger in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The storm volume is established, allowing the crew to compare it with available empty storage.

**Question card story setup - exact player copy:** The current empty storage is 14.0 million m^3; storm inflow is 17.28 million m^3, and the campaign safety margin is 2.00 million m^3. Choose the additional pre-storm drawdown required.

**Question card story-science connection - exact player copy:** The drawdown deficit determines how much additional water must leave before the storm while preserving the safety margin.

**Question card prompt - exact player copy:** Use drawdown = storm inflow + safety margin - current empty storage; select exactly one of four values and submit its label in million cubic metres.

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

Mission decision: Draw down 5.28 million m^3 before the storm. The integral gives 17.28 million m^3 of inflow, and the plan also keeps 2.00 million m^3 of campaign safety room. The next task is finding a release mix that clears this volume without flooding the valley.

**Segue - exact player copy:** But Nia's turbines cannot clear it all; the gates must take a share without flooding Elise's valley.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Leila Hassan pins the DRAW DOWN 5.28 MILLION CUBIC METRES card to the ledger. But Nia's turbines cannot clear it all; the gates must take a share without flooding Elise's valley.

**Story event - exact player copy:** The storage board posts a 5.28-million-cubic-metre drawdown target.

TARGET `19:00`; auto `SAFE STORAGE +8`; canonical enter `77/68/72/85` -> `85/68/72/85`, award 12, allocate 8 Downstream, 4 Reserve -> `85/76/76/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains antiderivative?

**Options - exact player copy:**

- A. Rectangles approximating accumulated change.
- B. A function whose derivative is the integrand.
- C. Signed accumulation across bounds.
- D. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for antiderivative. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes riemann sum. It does not answer the question about antiderivative.
- B: Correct. A function whose derivative is the integrand.
- C: This describes definite integral. It does not answer the question about antiderivative.
- D: This describes l and R and trapezoid sums. It does not answer the question about antiderivative.

### Review question 2


**Prompt - exact player copy:** Which statement best explains riemann sum?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Signed accumulation across bounds.
- C. Rectangles approximating accumulated change.
- D. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for riemann sum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes antiderivative. It does not answer the question about riemann sum.
- B: This describes definite integral. It does not answer the question about riemann sum.
- C: Correct. Rectangles approximating accumulated change.
- D: This describes l and R and trapezoid sums. It does not answer the question about riemann sum.

### Review question 3


**Prompt - exact player copy:** Which statement best explains definite integral?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Rectangles approximating accumulated change.
- C. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.
- D. Signed accumulation across bounds.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for definite integral. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes antiderivative. It does not answer the question about definite integral.
- B: This describes riemann sum. It does not answer the question about definite integral.
- C: This describes l and R and trapezoid sums. It does not answer the question about definite integral.
- D: Correct. Signed accumulation across bounds.

### Review question 4


**Prompt - exact player copy:** A rate increases throughout an interval. Left- and right-endpoint rectangle sums use the same partition. Which comparison is guaranteed?

**Options - exact player copy:**

- A. The left sum underestimates the integral and the right sum overestimates it; their average is the trapezoidal sum for that partition.
- B. A function whose derivative is the integrand.
- C. Rectangles approximating accumulated change.
- D. Signed accumulation across bounds.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for l and r and trapezoid sums. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The left sum underestimates the integral and the right sum overestimates it; their average is the trapezoidal sum for that partition.
- B: This describes antiderivative. It does not answer the question about l and r and trapezoid sums.
- C: This describes riemann sum. It does not answer the question about l and r and trapezoid sums.
- D: This describes definite integral. It does not answer the question about l and r and trapezoid sums.

### Review question 5


**Prompt - exact player copy:** Water enters a tank at I(t)=120+10t-(5/24)t² m³/s for 0≤t≤24, with t measured in hours. What volume enters? Use 3600 seconds per hour.

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. The volume is 3600∫₀²⁴I(t)dt=17,280,000 m³.
- C. Rectangles approximating accumulated change.
- D. Signed accumulation across bounds.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for antiderivatives and linearity and ftc and riemann limit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes antiderivative. It does not answer the question about antiderivatives and linearity and ftc and riemann limit.
- B: Correct. The volume is 3600∫₀²⁴I(t)dt=17,280,000 m³.
- C: This describes riemann sum. It does not answer the question about antiderivatives and linearity and ftc and riemann limit.
- D: This describes definite integral. It does not answer the question about antiderivatives and linearity and ftc and riemann limit.

### Review question 6


**Prompt - exact player copy:** Let V(t)=3600∫₀ᵗ[120+10u-(5/24)u²]du m³, where t is in hours. What is the inflow rate in m³/s at t=12 h?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Rectangles approximating accumulated change.
- C. Divide V′(12) by 3600 to obtain 120+120-30=210 m³/s.
- D. Signed accumulation across bounds.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for accumulation derivative. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes antiderivative. It does not answer the question about accumulation derivative.
- B: This describes riemann sum. It does not answer the question about accumulation derivative.
- C: Correct. Divide V′(12) by 3600 to obtain 120+120-30=210 m³/s.
- D: This describes definite integral. It does not answer the question about accumulation derivative.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 8 - The Just-Clears Release

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 8 - 8 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Make Room Without Making a Flood  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** 8 work shifts remain before the storm. The hoist rests at its baseline mark above a dry spillway. Today you decide which release mix clears enough water.
**Objective:** Select a release schedule meeting storage and downstream limits.

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
  - id: headwater_m08_we01
    title: Substitute an inner expression
    problem: Find A=integral from 0 to 1 of 2x(x²+1) dx.
    rule: Use u=x²+1 and du=2x dx; bounds change from x=0,1 to u=1,2.
    steps:
    - 'Set up the relationship: Use u=x²+1 and du=2x dx; bounds change from x=0,1 to u=1,2.'
    - A=integral from 1 to 2 of u du=[u²/2]_1^2=(4-1)/2=3/2.
    answer: The integral is 3/2.
    common_mistake: Do not keep x-bounds after changing the integration variable.
  - id: headwater_m08_we02
    title: Substitute in an exponential integral
    problem: Find F(x)=integral 2e^(2x) dx.
    rule: Use u=2x and du=2 dx.
    steps:
    - 'Set up the relationship: Use u=2x and du=2 dx.'
    - F(x)=integral e^u du=e^u+C=e^(2x)+C.
    answer: F(x)=e^(2x)+C.
    common_mistake: Return to the original variable for an indefinite integral.
  - id: headwater_m08_we03
    title: Signed versus total area
    problem: For f(x)=x on [-1,1], find its signed integral and total geometric area.
    rule: Signed areas retain signs; total area integrates |f(x)|.
    steps:
    - 'Set up the relationship: Signed areas retain signs; total area integrates |f(x)|.'
    - signed integral=[x²/2]_-1^1=0; total area=1/2+1/2=1.
    answer: Signed integral is 0; geometric area is 1.
    common_mistake: Cancellation is appropriate for net change, not total area.
  - id: headwater_m08_we04
    title: Split at a sign change
    problem: Velocity is v(t)=t-1 m/s on [0,2]. Find distance travelled.
    rule: Distance = integral |v(t)| dt, split where velocity changes sign.
    steps:
    - 'Set up the relationship: Distance = integral |v(t)| dt, split where velocity changes sign.'
    - distance=integral_0^1(1-t)dt+integral_1^2(t-1)dt=1/2+1/2=1 m.
    answer: The particle travels 1 m.
    common_mistake: Integrating signed velocity instead gives displacement.
  - id: headwater_m08_we05
    title: Evaluate a definite integral
    problem: Find A=integral from 0 to 2 of 3x² dx.
    rule: A=F(2)-F(0), where F′(x)=3x².
    steps:
    - 'Set up the relationship: A=F(2)-F(0), where F′(x)=3x².'
    - F(x)=x³, so A=2³-0³=8.
    answer: The signed accumulation is 8.
    common_mistake: Evaluate upper bound minus lower bound.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Substitution: replacing a repeated inner expression with one variable.

Signed accumulation: positive and negative contributions retained by sign.

#### Primer concepts

- choose `u=g(x)` when `g'(x)` is present; total physical area uses absolute values; split intervals where sign changes.

#### Equations first needed today
**Equation:** `u=g(x), du=g'(x)dx`

**What it is for:** simplifying a composite integral.

**Symbols:** `u` replacement variable and `du` its differential.

**Why this campaign needs it:** gate flow contains a repeated head expression.

## Main story happening - designer summary

Integrated turbine volume leaves a gate deficit; downstream signed exposure constrains its allocation.

## Learning and dramatic intent

Use substitution and absolute accumulation to build a multi-constraint plan.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `machine-board` | automatic**

**Trigger:** mission_8_arrival.

**World state:** The hoist rests at its baseline mark above a dry spillway.

**Panel/HUD text:** MISSION 8: SUBSTITUTE THE HEAD TERM OPEN

**Dialogue bubbles -** Nia Chen: "Start with substitute the head term. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 29 | `machine-board` | automatic**

**Trigger:** accepted_stop_29.

**World state:** At `machine-board`, the dated accepted-result slip for Stop 29 reads: "4133.333, tolerance .01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The turbine-volume prediction is ready for comparison with the dispatch simulation."

**Unlocks/waypoint:** Unlock Stop 30 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 30 | `machine-board` | automatic**

**Trigger:** accepted_stop_30.

**World state:** At `machine-board`, the dated accepted-result slip for Stop 30 reads: "3.600 million m^3; pass.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The remaining drawdown must be checked against a downstream flow that changes sign."

**Unlocks/waypoint:** Unlock Stop 31 at `machine-board` in Powerhouse.

**Beat 4 - After Stop 31 | `dispatch-console` | automatic**

**Trigger:** accepted_stop_31.

**World state:** At `machine-board`, the dated accepted-result slip for Stop 31 reads: "26.667,63.333, tolerance .01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Tomas Wilkes: "That check holds. The verified turbine contribution leaves a specific release deficit and supporting tasks to fund."

**Unlocks/waypoint:** Unlock Stop 32 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**Trigger:** accepted_stop_32.

**World state:** At `hoist-stand`, Tomas Wilkes turns the hoist to the signed test notch. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Wilkes: "The gate has a share now. So does the warning crew. But Arun's wall gauges fall silent during the change; the next test must tell a dead cable from a loaded wall."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m08

**Home:** `hoist-stand`. **Before:** The dated mission-8 evidence holder at this fixture has no accepted record. The hoist rests at its baseline mark above a dry spillway.
**After — exact action:** Tomas Wilkes turns the hoist to the signed test notch.
**Trigger:** accepted_stop_32. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `uplift-wall`, two blank gauge faces sit beside a live independent trace.
**Segue - exact player copy:** But Arun's wall gauges fall silent during the change; the next test must tell a dead cable from a loaded wall.

## Location plan

POWER to SAFE; turbine total creates the gate question, and SAFE owns its consequence.

## Characters and dramatic beat

Nia and Baptiste reconcile generation with public limits.

## Key concepts, explained here

u-substitution, bounds conversion, signed versus total area, constrained allocation.

## Stop 29 - Substitute the head term

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: 18 - u-substitution; Keystone: FTC; Area: Forecast Archive; Learning role: PRACTICE; Difficulty: L3; Story role: foundation.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The turbine release schedule needs integration before its contribution can be credited to drawdown.

**Question card story setup - exact player copy:** Turbine flow is Q(t)=200t(1+t^2)^2 m3/s for 0<=t<=2 h in a scaled test. Substitute u=1+t^2 and derive the exact accumulated value before unit conversion.

**Question card story-science connection - exact player copy:** The substituted integral measures accumulated discharge from the changing turbine-flow model.

**Fixture source panel - exact player copy:** Turbine flow is Q(t)=200t(1+t^2)^2 m3/s for 0<=t<=2 h in a scaled test. Substitute u=1+t^2 and derive the exact accumulated value before unit conversion. du=2t dt

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit the exact scaled value.

**Complete format-specific interaction block:** `derive:{left_side:"integral",goal:"integral",givens:["u=1+t^2","du=2t dt"],lines:[{expressions:["integral = 100 integral_1^5 u^2 du","integral = 200 integral_0^2 u^2 dt"],correct:"integral = 100 integral_1^5 u^2 du",rules:["u-substitution and changed bounds","power rule"],correct_rule:"u-substitution and changed bounds"},{expressions:["integral = (100/3)[u^3]_1^5","integral = 100[u^2]_1^5"],correct:"integral = (100/3)[u^3]_1^5",rules:["power antiderivative","differentiate"],correct_rule:"power antiderivative"},{expressions:["integral = 12400/3","integral = 400"],correct:"integral = 12400/3",rules:["evaluate bounds","subtract inputs"],correct_rule:"evaluate bounds"}],answerText:"The scaled accumulation is 12400/3."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["u=1+t^2", "du=2t dt"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Substitute the head term in the form and units requested by the prompt"
  left_side: "integral"
  steps:
    - id: step_1
      doing: "u-substitution and changed bounds"
      candidates:
        - {text: "integral = 100 integral_1^5 u^2 du", correct: true, rule: "u-substitution and changed bounds"}
        - {text: "integral = 200 integral_0^2 u^2 dt", correct: false, survives: true, rule: "power rule", reason: "This is the common power rule mistake; it does not perform the licensed u-substitution and changed bounds step."}
    - id: step_2
      doing: "power antiderivative"
      candidates:
        - {text: "integral = (100/3)[u^3]_1^5", correct: true, rule: "power antiderivative"}
        - {text: "integral = 100[u^2]_1^5", correct: false, survives: true, rule: "differentiate", reason: "This is the common differentiate mistake; it does not perform the licensed power antiderivative step."}
    - id: step_3
      doing: "evaluate bounds"
      candidates:
        - {text: "integral = 12400/3", correct: true, rule: "evaluate bounds"}
        - {text: "integral = 400", correct: false, survives: true, rule: "subtract inputs", reason: "This is the common subtract inputs mistake; it does not perform the licensed evaluate bounds step."}
```
**Correct result:** `4133.333`, tolerance `.01`.

**Answer text:** The scaled accumulation is 12400/3.

**Why:** The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Wrong-path feedback:** Change the bounds when changing variables.

**State/output:** integral method certified; unlock 8.2.

## Stop 30 - Verify turbine volume

**Format/placement:** VERIFY, at `machine-board`.

**Metadata:** Concept: 15 - definite integral/unit conversion; Keystone: FTC; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The turbine-volume prediction is ready for comparison with the dispatch simulation.

**Question card story setup - exact player copy:** The operational schedule predicts a constant-equivalent turbine release of 125 m^3/s for 8.0 h. Calculate its volume, commit it, then run the dispatch simulation and measure total discharge.

**Question card story-science connection - exact player copy:** Measured discharge determines whether the scheduled turbine run delivers the volume credited to the storage plan.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $V=Qt$ with $Q=125$ m^3/s, $t=8.0$ h, and 3,600 s/h; submit volume in m^3 before dispatch unlocks. **OPERATE:** Run the 8.0 h schedule with Forecast B and gate flow 0 fixed. **MEASURE:** Record total discharge and ending rate. **INTERPRET:** Submit PASS or FAIL; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:3600000,unit:"m^3",tolerance:1000},equipment_locked_until_prediction_commit:true,operation:"run 8.0 h schedule",fixed:["Forecast B","gate flow 0"],measurements:["3.598 million m^3","124.9 m^3/s end"],restore:false,correct_conclusion:"passes"}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify turbine volume", unit: "units printed on the card"}
  predictionRange: {min: 1.8, max: 5.4, step: 0.36}
  measurement: {label: "independent measured value", truth: 3.6}
  passRatio: [0.95, 1.05]
  correctResultText: "`3.600 million m^3`; pass."
```

**Correct result:** `3.600 million m^3`; pass.

**Answer text:** `125*8*3600=3,600,000`.

**Why:** `125*8*3600=3,600,000`. Measured turbine volume determines the gate volume still needed.

**Wrong-path feedback:** Hours must convert to seconds.

**State/output:** deficit `1.68 million`; waypoint SAFE.

## Stop 31 - Total the signed surge

**Format/placement:** DERIVE, at `machine-board`.

**Metadata:** Concept: 22 - velocity integral/total area; Keystone: Motion+FTC; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the machine board, in Powerhouse.

**Stop reason - exact player copy:** The remaining drawdown must be checked against a downstream flow that changes sign.

**Question card story setup - exact player copy:** With a 1.68 million m^3 deficit, downstream excess flow is E(t)=30t-10t^2 m^3/s for 0<=t<=4 h. Find its zero, then separate signed net change from total water movement.

**Question card story-science connection - exact player copy:** Signed accumulation and total water movement distinguish net added volume from movement that reverses during the interval.

**Fixture source panel - exact player copy:** With a 1.68 million m^3 deficit, downstream excess flow is E(t)=30t-10t^2 m^3/s for 0<=t<=4 h. Find its zero, then separate signed net change from total water movement. E=10t(3-t)

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit both in (m^3/s)*h.

**Complete format-specific interaction block:** `derive:{left_side:"change",goal:"signed and total",givens:["E=10t(3-t)"],lines:[{expressions:["zeros t=0,3","zeros t=0,4"],correct:"zeros t=0,3",rules:["factor and zero product","endpoint only"],correct_rule:"factor and zero product"},{expressions:["[15t^2-(10/3)t^3]_0^4=80/3","[15t^2-(10/3)t^3]_0^3=40/3"],correct:"[15t^2-(10/3)t^3]_0^4=80/3",rules:["FTC signed integral","absolute endpoints"],correct_rule:"FTC signed integral"},{expressions:["integral_0^3 E - integral_3^4 E=190/3","integral_0^4 E=80/3"],correct:"integral_0^3 E - integral_3^4 E=190/3",rules:["split and reverse negative area","keep signed"],correct_rule:"split and reverse negative area"}],answerText:"Net=80/3; total=190/3 in scaled units."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["E=10t(3-t)"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Total the signed surge in the form and units requested by the prompt"
  left_side: "change"
  steps:
    - id: step_1
      doing: "factor and zero product"
      candidates:
        - {text: "zeros t=0,3", correct: true, rule: "factor and zero product"}
        - {text: "zeros t=0,4", correct: false, survives: true, rule: "endpoint only", reason: "This is the common endpoint only mistake; it does not perform the licensed factor and zero product step."}
    - id: step_2
      doing: "FTC signed integral"
      candidates:
        - {text: "[15t^2-(10/3)t^3]_0^4=80/3", correct: true, rule: "FTC signed integral"}
        - {text: "[15t^2-(10/3)t^3]_0^3=40/3", correct: false, survives: true, rule: "absolute endpoints", reason: "This is the common absolute endpoints mistake; it does not perform the licensed FTC signed integral step."}
    - id: step_3
      doing: "split and reverse negative area"
      candidates:
        - {text: "integral_0^3 E - integral_3^4 E=190/3", correct: true, rule: "split and reverse negative area"}
        - {text: "integral_0^4 E=80/3", correct: false, survives: true, rule: "keep signed", reason: "This is the common keep signed mistake; it does not perform the licensed split and reverse negative area step."}
```
**Correct result:** `26.667,63.333`, tolerance `.01`.

**Answer text:** Net=80/3; total=190/3 in scaled units.

**Why:** Net=80/3; total=190/3 in scaled units. Flood exposure counts positive excess, while net signed change can hide a later reversal.

**Wrong-path feedback:** Total physical amount splits where the rate changes sign.

**State/output:** downstream exposure limit; unlock 8.4.

## Stop 32 - Allocate the just-clears plan

**Format/placement:** ALLOCATE, at `dispatch-console`.

**Metadata:** Concept: 15 - constrained accumulation; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the dispatch console, in Powerhouse.

**Stop reason - exact player copy:** The verified turbine contribution leaves a specific release deficit and supporting tasks to fund.

**Question card story setup - exact player copy:** Turbines clear 3.60 of the required 5.28 million m^3, leaving 1.68. Allocate the remaining release, warning staff, gate test, and protected reserve so every required condition is funded.

**Question card story-science connection - exact player copy:** The allocation determines whether remaining drawdown, warning staff, gate testing, and protected reserve all fit the plan.

**Question card prompt - exact player copy:** Allocate all 100 points among the four named items and submit one allocation plan; gate release, warning, test, and protected reserve must all be funded.

**Complete format-specific interaction block:** `allocate:{pool:100,items:[{id:"gate",label:"1.68 million m3 gate release",cost:40,required:true},{id:"warning",label:"downstream warning shift",cost:25,required:true},{id:"test",label:"reversal gate test",cost:15,required:true},{id:"reserve",label:"restart reserve",cost:20,required:true,protected:true},{id:"cosmetic",label:"control-room repainting",cost:15,required:false}],questions:[{id:"release",text:"Does total release reach 5.28 million m3?",required:true},{id:"warning",text:"Are downstream warnings staffed?",required:true},{id:"reserve",text:"Is the restart reserve protected?",required:true}],correct_allocation:{gate:40,warning:25,test:15,reserve:20},answerText:"Fund the gate, warning, reversal test, and protected reserve; repainting would exceed the pool without improving clearance."}`

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 32 - Allocate the just-clears plan"
  format: "ALLOCATE"
  source: "Handback 3 canonical interaction block"
  question: "Allocate all 100 points among the four named items and submit one allocation plan; gate release, warning, test, and protected reserve must all be funded."
  payload: "`allocate:{pool:100,items:[{id:\"gate\",label:\"1.68 million m3 gate release\",cost:40,required:true},{id:\"warning\",label:\"downstream warning shift\",cost:25,required:true},{id:\"test\",label:\"reversal gate test\",cost:15,required:true},{id:\"reserve\",label:\"restart reserve\",cost:20,required:true,protected:true},{id:\"cosmetic\",label:\"control-room repainting\",cost:15,required:false}],questions:[{id:\"release\",text:\"Does total release reach 5.28 million m3?\",required:true},{id:\"warning\",text:\"Are downstream warnings staffed?\",required:true},{id:\"reserve\",text:\"Is the restart reserve protected?\",required:true}],correct_allocation:{gate:40,warning:25,test:15,reserve:20},answerText:\"Fund the gate, warning, reversal test, and protected reserve; repainting would exceed the pool without improving clearance.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - ALLOCATE:**

```yaml
allocate_patch:
  questions:
    - {id: release, requires: [gate], required: true}
    - {id: warning, requires: [warning], required: true}
    - {id: reserve, requires: [reserve], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  decision_can_fail: true
  question: "Allocate all 100 points among the four named items and submit one allocation plan; gate release, warning, test, and protected reserve must all be funded."
```

**Correct result:** all four funded exactly.

**Answer text:** The completed check shows all four funded exactly.

**Why:** all four funded exactly. A mathematically sufficient release is unusable without warning and restart capacity.

**Wrong-path feedback:** Storage volume alone is not the whole release constraint.

**State/output:** mixed plan authorized.

## Mission outcome

Mission decision: Use the mixed turbine-and-gate plan. Turbines clear 3.60 million m^3, and the gate clears the remaining 1.68 million m^3 with warning and restart capacity protected. The plan fits downstream limits. The wall must now show it can carry the changing head.

**Segue - exact player copy:** But Arun's wall gauges fall silent during the change; the next test must tell a dead cable from a loaded wall.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tomas Wilkes turns the hoist to the signed test notch. But Arun's wall gauges fall silent during the change; the next test must tell a dead cable from a loaded wall.

**Story event - exact player copy:** The combined turbine-and-gate schedule creates the required storage while preserving downstream warnings.

TARGET `19:00`; auto `DOWNSTREAM +5`; canonical `85/76/76/85` -> `85/81/76/85`, award 12, allocate 7 Storage, 5 Downstream -> `92/86/76/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains substitution?

**Options - exact player copy:**

- A. Positive and negative contributions retained by sign.
- B. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.
- C. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.
- D. Replacing a repeated inner expression with one variable.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for substitution. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes signed accumulation. It does not answer the question about substitution.
- B: This describes u-substitution. It does not answer the question about substitution.
- C: This describes definite integral and unit conversion. It does not answer the question about substitution.
- D: Correct. Replacing a repeated inner expression with one variable.

### Review question 2


**Prompt - exact player copy:** Which statement best explains signed accumulation?

**Options - exact player copy:**

- A. Positive and negative contributions retained by sign.
- B. Replacing a repeated inner expression with one variable.
- C. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.
- D. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for signed accumulation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Positive and negative contributions retained by sign.
- B: This describes substitution. It does not answer the question about signed accumulation.
- C: This describes u-substitution. It does not answer the question about signed accumulation.
- D: This describes definite integral and unit conversion. It does not answer the question about signed accumulation.

### Review question 3


**Prompt - exact player copy:** Evaluate ∫₀²200t(1+t²)²dt using u=1+t².

**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. The integral is 100∫₁⁵u²du=12400/3.
- C. Positive and negative contributions retained by sign.
- D. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for u-substitution. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes substitution. It does not answer the question about u-substitution.
- B: Correct. The integral is 100∫₁⁵u²du=12400/3.
- C: This describes signed accumulation. It does not answer the question about u-substitution.
- D: This describes definite integral and unit conversion. It does not answer the question about u-substitution.

### Review question 4


**Prompt - exact player copy:** Water flows at 125 m³/s for 8 hours. How much water passes? Use 3600 seconds per hour.

**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. Positive and negative contributions retained by sign.
- C. 125×8×3600=3,600,000 m³.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for definite integral and unit conversion. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes substitution. It does not answer the question about definite integral and unit conversion.
- B: This describes signed accumulation. It does not answer the question about definite integral and unit conversion.
- C: Correct. 125×8×3600=3,600,000 m³.
- D: This describes u-substitution. It does not answer the question about definite integral and unit conversion.

### Review question 5


**Prompt - exact player copy:** A particle moves at 2 m/s for 1 s and then at -1 m/s for 2 s. Using these constant intervals, what are its displacement and total distance?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Velocity (m/s)",
  "caption": "Use v=2 for 0≤t<1 and v=−1 for 1≤t≤3; the jump is instantaneous",
  "series": [
    {
      "name": "Velocity",
      "points": [
        [
          0,
          2
        ],
        [
          1,
          2
        ],
        [
          1,
          -1
        ],
        [
          3,
          -1
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. Displacement 4 m; distance 4 m.
- B. Displacement 0 m; distance 0 m.
- C. Displacement -2 m; distance 2 m.
- D. Displacement 0 m; total distance 4 m.

**Correct answer:** D

**Hint - exact player copy:** Add signed velocity areas for displacement and their magnitudes for distance.

**Option feedback - exact player copy:**

- A: Displacement retains the negative sign of the second interval.
- B: Returning to the start does not erase travel.
- C: This omits the first interval.
- D: Correct. Displacement 0 m; total distance 4 m.

### Review question 6


**Prompt - exact player copy:** A release needs 100 work units: 40 for gates, 30 for pumps, 20 for warning, and 10 for restart reserve. None can be substituted for another. Which allocation is feasible?

**Options - exact player copy:**

- A. Fund all four requirements at 40, 30, 20, and 10 units respectively.
- B. Replacing a repeated inner expression with one variable.
- C. Positive and negative contributions retained by sign.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for constrained accumulation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Fund all four requirements at 40, 30, 20, and 10 units respectively.
- B: This describes substitution. It does not answer the question about constrained accumulation.
- C: This describes signed accumulation. It does not answer the question about constrained accumulation.
- D: This describes u-substitution. It does not answer the question about constrained accumulation.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 9 - Two Silent Gauges

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 9 - 7 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** The Silent Heads  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the uplift wall.  
**Card body:** 7 work shifts remain before the storm. Two blank gauge faces sit beside a live independent trace. Today you decide whether the quiet gauges mean wall trouble.
**Objective:** Reconstruct uplift pressure and authorize or stop testing.

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
  - id: headwater_m09_we01
    title: Read a slope field
    problem: The differential equation is y′=2-y. Find slopes at y=0,2,3.
    rule: A slope-field segment uses the differential equation at its point.
    steps:
    - At y=0, slope=2; at y=2, slope=0.
    - At y=3, slope=-1. Slopes depend on y, not on x here.
    answer: Segments point upward below y=2 and downward above y=2.
    common_mistake: The slope is not the current height y.
  - id: headwater_m09_we02
    title: Take two Euler steps
    problem: Use y′=y, y(0)=1, and step h=0.5 to estimate y(1).
    rule: y_next=y_current+h×slope_current.
    steps:
    - 'Set up the relationship: y_next=y_current+h×slope_current.'
    - y1=1+0.5(1)=1.5; y2=1.5+0.5(1.5)=2.25.
    answer: Euler's estimate is y(1)≈2.25.
    common_mistake: Recalculate the slope at the new estimated point.
  - id: headwater_m09_we03
    title: An Euler step depending on both inputs
    problem: Use y′=x+y, y(0)=2, and h=1 to estimate y(2).
    rule: Euler's method updates both x and y at each step.
    steps:
    - 'Set up the relationship: Euler''s method updates both x and y at each step.'
    - y1=2+1(0+2)=4; y2=4+1(1+4)=9.
    answer: The estimate is y(2)≈9.
    common_mistake: The second slope uses x=1, not x=0.
  - id: headwater_m09_we04
    title: Test an equilibrium
    problem: For y′=4-y, determine whether y=4 is a stable equilibrium.
    rule: An equilibrium has derivative zero; nearby derivative signs determine local attraction.
    steps:
    - At y=4, y′=0. Below 4, y′>0, so solutions rise.
    - Above 4, y′<0, so solutions fall. Both directions point toward 4.
    answer: The equilibrium y=4 is stable.
    common_mistake: Zero slope at equilibrium alone does not show stability.
  - id: headwater_m09_we05
    title: Verify a proposed solution
    problem: Does y=3e^(2x) satisfy y′=2y and y(0)=3?
    rule: Check both the differential equation and the initial condition.
    steps:
    - 'Set up the relationship: Check both the differential equation and the initial condition.'
    - y′=6e^(2x)=2(3e^(2x))=2y.
    answer: y(0)=3e^0=3, so both requirements hold.
    common_mistake: Checking the initial point alone is insufficient.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Slope field: short segments showing a differential equation's slope at many points.

Equilibrium solution: a constant solution where slope is zero.

Euler's method: repeated tangent-line steps.

#### Primer concepts

- a solution curve follows field slopes; smaller steps usually reduce Euler error; each new estimate becomes the next starting point.

#### Equations first needed today
**Equation:** `y_(n+1)=y_n+f(x_n,y_n)Delta x`

**What it is for:** approximating a differential-equation solution.

**Symbols:** `f` slope and `Delta x` step.

**Why this campaign needs it:** missing pressure readings must be estimated between live gauges.

## Main story happening - designer summary

Euler reconstruction and independent channels show that two silent heads share a failed cable.

## Learning and dramatic intent

Teach slope fields, Euler steps, numerical control, and evidence independence.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Seepage & Uplift Bay | `uplift-wall` | automatic**

**Trigger:** mission_9_arrival.

**World state:** Two blank gauge faces sit beside a live independent trace.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with read the pressure field. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 2 - After Stop 33 | `uplift-wall` | automatic**

**Trigger:** accepted_stop_33.

**World state:** At `uplift-wall`, the dated accepted-result slip for Stop 33 reads: "toward 8; equilibrium P=8.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "That check holds. The pressure model must bridge the gap between the last live reading and the next measurement."

**Unlocks/waypoint:** Unlock Stop 34 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 3 - After Stop 34 | `transect-rack` | automatic**

**Trigger:** accepted_stop_34.

**World state:** At `uplift-wall`, the dated accepted-result slip for Stop 34 reads: "5.44, tolerance .001.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Arun Mehta: "That check holds. The coarse pressure estimate needs a numerical-sensitivity check before it supports a load decision."

**Unlocks/waypoint:** Unlock Stop 35 at `transect-rack` in Seepage & Uplift Bay.

**Beat 4 - After Stop 35 | `uplift-wall` | automatic**

**Trigger:** accepted_stop_35.

**World state:** At `transect-rack`, the dated accepted-result slip for Stop 35 reads: "as stated.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Arun Mehta: "That check holds. Agreement with the model cannot explain why two pressure channels remain silent."

**Unlocks/waypoint:** Unlock Stop 36 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `uplift-wall` | automatic**

**Trigger:** accepted_stop_36.

**World state:** At `uplift-wall`, Arun Mehta ties a FAILED SHARED CABLE tag around the removed cable. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "Two silent faces. One cable. That is not two votes. But the weir still carries extra flow; Arun needs its time trend before he clears the wall."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m09

**Home:** `uplift-wall`. **Before:** The dated mission-9 evidence holder at this fixture has no accepted record. Two blank gauge faces sit beside a live independent trace.
**After — exact action:** Arun Mehta ties a FAILED SHARED CABLE tag around the removed cable.
**Trigger:** accepted_stop_36. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `weir-bench`, drops strike the weir bucket at a slowing pace.
**Segue - exact player copy:** But the weir still carries extra flow; Arun needs its time trend before he clears the wall.

## Location plan

STRUCT to GATES; STRUCT supplies missing field, GATES provides independent load simulation and dependency panel.

## Characters and dramatic beat

Arun treats silence as danger until independent evidence narrows its cause.

## Key concepts, explained here

slope fields, equilibrium, Euler recursion and step size, shared versus independent channels.

## Stop 33 - Read the pressure field

**Format/placement:** PROBE, at `uplift-wall`.

**Metadata:** Concept: 20 - slope fields/equilibrium; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The drawdown plan requires an uplift-pressure check before the dam carries the changed load.

**Question card story setup - exact player copy:** Uplift obeys dP/dh=0.4(8-P) in scaled units. Probe field points at P=4,8,10 and identify slope direction, equilibrium, and whether pressure is driven toward P=8.

**Question card story-science connection - exact player copy:** The slope field identifies the pressure equilibrium and whether nearby states move toward or away from it.

**Question card prompt - exact player copy:** Probe stations A, B, C, and D in order. Compare each reading with its station-specific expected value, then submit whether any station breaks the pattern, the numerical equilibrium pressure, and the direction of change on each side.

**Complete format-specific interaction block:** `probe:{load_sequence:["A","B","C","D"],stations:[{id:"A",load:{P:4,unit:"pressure"},reading:{slope:1.6,unit:"pressure/m"},expected:{slope:1.6,unit:"pressure/m"},comparison:"matches positive approach"},{id:"B",load:{P:8,unit:"pressure"},reading:{slope:0,unit:"pressure/m"},expected:{slope:0,unit:"pressure/m"},comparison:"matches equilibrium"},{id:"C",load:{P:10,unit:"pressure"},reading:{slope:-0.8,unit:"pressure/m"},expected:{slope:-0.8,unit:"pressure/m"},comparison:"matches negative return"},{id:"D",load:{P:12,unit:"pressure"},reading:{slope:-1.6,unit:"pressure/m"},expected:{slope:-1.6,unit:"pressure/m"},comparison:"matches stronger return"}],required:["A","B","C","D"],correct_break:"none",equilibrium:8,answerText:"All four readings match dP/dh=0.4(8-P); slopes point toward equilibrium P=8."}`

**§7 authored-board source - PROBE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 33 - Read the pressure field"
  format: "PROBE"
  source: "Handback 5 canonical interaction block"
  question: "Probe stations A, B, and C in order. At A compare reading +1.6 pressure/m with expected $0.4(8-4)=+1.6$; at B compare 0 with expected $0.4(8-8)=0$; at C compare -0.8 with expected $0.4(8-10)=-0.8$. Submit whether any station breaks the pattern, the numerical equilibrium pressure, and the direction of change on each side."
  payload: "`probe:{load_sequence:[\"A\",\"B\",\"C\",\"D\"],stations:[{id:\"A\",load:{P:4,unit:\"pressure\"},reading:{slope:1.6,unit:\"pressure/m\"},expected:{slope:1.6,unit:\"pressure/m\"},comparison:\"matches positive approach\"},{id:\"B\",load:{P:8,unit:\"pressure\"},reading:{slope:0,unit:\"pressure/m\"},expected:{slope:0,unit:\"pressure/m\"},comparison:\"matches equilibrium\"},{id:\"C\",load:{P:10,unit:\"pressure\"},reading:{slope:-0.8,unit:\"pressure/m\"},expected:{slope:-0.8,unit:\"pressure/m\"},comparison:\"matches negative return\"},{id:\"D\",load:{P:12,unit:\"pressure\"},reading:{slope:-1.6,unit:\"pressure/m\"},expected:{slope:-1.6,unit:\"pressure/m\"},comparison:\"matches stronger return\"}],required:[\"A\",\"B\",\"C\",\"D\"],correct_break:\"none\",equilibrium:8,answerText:\"All four readings match dP/dh=0.4(8-P); slopes point toward equilibrium P=8.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROBE:**

**Handback 5 canonical interaction block - PROBE:**

```yaml
probe:
  stations:
    - {id: A, label: "Station A at P=4", reading: 1.6, expected: 1.6, unit: "pressure/m"}
    - {id: B, label: "Station B at P=8", reading: 0, expected: 0, unit: "pressure/m"}
    - {id: C, label: "Station C at P=10", reading: -0.8, expected: -0.8, unit: "pressure/m"}
    - {id: D, label: "Station D at P=12", reading: -1.6, expected: -1.6, unit: "pressure/m"}
  target: B
  quantityAndUnits: "Probe stations A, B, and C in order. At A compare reading +1.6 pressure/m with expected $0.4(8-4)=+1.6$; at B compare 0 with expected $0.4(8-8)=0$; at C compare -0.8 with expected $0.4(8-10)=-0.8$. Submit whether any station breaks the pattern, the numerical equilibrium pressure, and the direction of change on each side."
  correctConclusion: "toward `8`; equilibrium `P=8`."
```

**Correct result:** toward `8`; equilibrium `P=8`.

**Answer text:** The completed check shows toward 8; equilibrium P=8.

**Why:** toward `8`; equilibrium `P=8`. Field direction can bound the silent readings before exact solving.

**Wrong-path feedback:** Horizontal segments mean zero slope, not zero pressure.

**State/output:** field lit; unlock 9.2.

## Stop 34 - Step through the gap

**Format/placement:** DERIVE, at `uplift-wall`.

**Metadata:** Concept: 20 - Euler method; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: PRACTICE; Difficulty: L3; Story role: evidence.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The pressure model must bridge the gap between the last live reading and the next measurement.

**Question card story setup - exact player copy:** The last live value is P(0)=4.0, and dP/dh=0.4(8-P). Use Euler steps of 0.5 m twice to estimate P(1.0) before the next safe decision.

**Question card story-science connection - exact player copy:** The Euler estimate predicts pressure at the missing height so the crew can assess the monitoring gap.

**Fixture source panel - exact player copy:** The last live value is P(0)=4.0, and dP/dh=0.4(8-P). Take two Euler steps with Delta h=0.5 m to estimate P(1.0) before the next safe decision.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit P(1.0).

**Complete format-specific interaction block:** `derive:{left_side:"P1",goal:"P(1.0)",givens:["P0=4","f=0.4(8-P)","Delta h=.5"],lines:[{expressions:["P1=4+0.4(8-4)(0.5)=4.8","P1=4+0.4(8-4)(1.0)=5.6"],correct:"P1=4+0.4(8-4)(0.5)=4.8",rules:["Euler update","full derivative step"],correct_rule:"Euler update"},{expressions:["P2=4.8+0.4(8-4.8)(0.5)=5.44","P2=4.8+0.4(8-4.8)(0.25)=5.6"],correct:"P2=4.8+0.4(8-4.8)(0.5)=5.44",rules:["update slope at new point","reuse old slope"],correct_rule:"update slope at new point"}],answerText:"Euler gives P(1.0)=5.44."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["P0=4", "f=0.4(8-P)", "Delta h=.5"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Step through the gap in the form and units requested by the prompt"
  left_side: "P1"
  steps:
    - id: step_1
      doing: "Euler update"
      candidates:
        - {text: "P1=4+0.4(8-4)(0.5)=4.8", correct: true, rule: "Euler update"}
        - {text: "P1=4+0.4(8-4)(1.0)=5.6", correct: false, survives: true, rule: "full derivative step", reason: "This is the common full derivative step mistake; it does not perform the licensed Euler update step."}
    - id: step_2
      doing: "update slope at new point"
      candidates:
        - {text: "P2=4.8+0.4(8-4.8)(0.5)=5.44", correct: true, rule: "update slope at new point"}
        - {text: "P2=4.8+0.4(8-4.8)(0.25)=5.6", correct: false, survives: true, rule: "reuse old slope", reason: "This is the common reuse old slope mistake; it does not perform the licensed update slope at new point step."}
```
**Correct result:** `5.44`, tolerance `.001`.

**Answer text:** Euler gives P(1.0)=5.44.

**Why:** Euler gives P(1.0)=5.44. A stepwise prediction can be compared with independent seepage evidence.

**Wrong-path feedback:** Recalculate slope after each step.

**State/output:** missing points penciled; waypoint GATES.

## Stop 35 - Test step-size sensitivity

**Format/placement:** CONTROL, at `transect-rack`.

**Metadata:** Concept: 25 - Euler error/control; Keystone: Approximation; Area: Seepage & Uplift Bay; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the transect rack, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The coarse pressure estimate needs a numerical-sensitivity check before it supports a load decision.

**Question card story setup - exact player copy:** Because two coarse Euler steps give 5.44, rerun with Delta h=0.25 m while the same equation and initial value remain fixed. Compare the estimate, restore 0.50, and state the step-size effect.

**Question card story-science connection - exact player copy:** The smaller-step comparison measures how much the predicted pressure depends on the approximation step size.

**Question card prompt - exact player copy:** Choose step size from candidate controls step size, initial value, and equation. Measure the Euler estimate at 0.50 m, change only step size to 0.25 m while the equation and initial value stay fixed, measure after the same interval, restore 0.50 m and remeasure, then submit the numerical change and conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"step"},{id:"initial"},{id:"equation"}],correct_control:"step",baseline:.5,response:.25,noise_band:.005,measurements:[5.44,5.3756,5.44],restore:true,correct_conclusion:"smaller step lowers estimate by.0644; result remains near 5.4"}`

**Correct result:** as stated.

**Answer text:** The completed check shows as stated.

**Why:** as stated. Changing only step size tests numerical approximation rather than wall behavior.

**Wrong-path feedback:** A valid control changes one input and reverses it.

**State/output:** uncertainty band; unlock 9.4.

## Stop 36 - Diagnose silence

**Format/placement:** TRACE, at `uplift-wall`.

**Metadata:** Concept: 27 - dependency/independent evidence; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the uplift wall, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** Agreement with the model cannot explain why two pressure channels remain silent.

**Question card story setup - exact player copy:** Euler predictions agree with live weirs, while two piezometers remain blank. Open each channel's dependencies and decide whether agreement is independent or whether a shared cable explains the silence.

**Question card story-science connection - exact player copy:** The dependency trace determines whether the blank readings share a cable fault rather than indicating independent instrument failures.

**Question card prompt - exact player copy:** Open the dependency record for all four channels, then submit the shared upstream cause and the conclusion continue controlled tests or stop controlled tests.

**Complete format-specific interaction block:** `trace:{channels:[{id:"pressure_1",label:"pressure channel 1",reading:"blank",dependency:"junction cable J4",target_dependent:true},{id:"pressure_2",label:"pressure channel 2",reading:"blank",dependency:"junction cable J4",target_dependent:true},{id:"weir",label:"manual weir scale",reading:5.39,dependency:"manual scale",independent:true},{id:"uplift_3",label:"uplift channel 3",reading:5.42,dependency:"junction cable J7",independent:true}],shared_upstream:"junction cable J4",correct_conclusion:"J4 cable failure; controlled tests may continue",answerText:"The two blank pressure channels share J4, while independent weir and uplift readings remain live; diagnose a J4 cable failure."}`

**§7 authored-board source - TRACE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 36 - Diagnose silence"
  format: "TRACE"
  source: "Handback 3 canonical interaction block"
  question: "Open the dependency record for all four channels, then submit the shared upstream cause and the conclusion continue controlled tests or stop controlled tests."
  payload: "`trace:{channels:[{id:\"pressure_1\",label:\"pressure channel 1\",reading:\"blank\",dependency:\"junction cable J4\",target_dependent:true},{id:\"pressure_2\",label:\"pressure channel 2\",reading:\"blank\",dependency:\"junction cable J4\",target_dependent:true},{id:\"weir\",label:\"manual weir scale\",reading:5.39,dependency:\"manual scale\",independent:true},{id:\"uplift_3\",label:\"uplift channel 3\",reading:5.42,dependency:\"junction cable J7\",independent:true}],shared_upstream:\"junction cable J4\",correct_conclusion:\"J4 cable failure; controlled tests may continue\",answerText:\"The two blank pressure channels share J4, while independent weir and uplift readings remain live; diagnose a J4 cable failure.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRACE:**

```yaml
trace:
  channels:
    - {id: pressure_1, label: "Pressure channel 1", reading: "blank pressure reading", dependency: junction_cable_J4}
    - {id: pressure_2, label: "Pressure channel 2", reading: "blank pressure reading", dependency: junction_cable_J4}
    - {id: weir, label: "Manual weir scale", reading: "5.39 m water level", dependency: manual_scale, independent: true}
    - {id: uplift_3, label: "Uplift channel 3", reading: "5.42 m water level", dependency: junction_cable_J7, independent: true}
  sharedUpstream: junction_cable_J4
  correctConclusion: "shared cable J4."
  commonMistake: "Counting two channels fed by one record as independent confirmation."
```

**Correct result:** shared cable J4.

**Answer text:** The completed check shows shared cable J4.

**Why:** shared cable J4. Quiet independent evidence can rule out wall failure even when two displays agree by failing together.

**Wrong-path feedback:** A wall-failure claim conflicts with the two independent live readings; the two blanks share J4 and therefore are not independent evidence.

**State/output:** crate replaced by live heads on Day 9.

## Mission outcome

Mission decision: Continue controlled release tests. Euler estimates agree with independent live readings, and the two silent gauges share one failed cable. The crew replaces that cable, and bounds the uplift load.

**Segue - exact player copy:** But the weir still carries extra flow; Arun needs its time trend before he clears the wall.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Arun Mehta ties a FAILED SHARED CABLE tag around the removed cable. But the weir still carries extra flow; Arun needs its time trend before he clears the wall.

**Story event - exact player copy:** The reconstructed pressure path matches the live gauges, so controlled release testing continues.

TARGET `18:00`; auto `INTEGRITY +6 | RESERVE -3`; canonical `92/86/76/85` -> `92/86/73/91`, award 12, allocate 9 Integrity, 3 Reserve -> `92/86/76/100`; Integrity not yet locked.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains slope field?

**Options - exact player copy:**

- A. A constant solution where slope is zero.
- B. Short segments showing a differential equation's slope at many points.
- C. Repeated tangent-line steps.
- D. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for slope field. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes equilibrium solution. It does not answer the question about slope field.
- B: Correct. Short segments showing a differential equation's slope at many points.
- C: This describes euler's method. It does not answer the question about slope field.
- D: This describes slope fields and equilibrium. It does not answer the question about slope field.

### Review question 2


**Prompt - exact player copy:** Which statement best explains equilibrium solution?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. Repeated tangent-line steps.
- C. A constant solution where slope is zero.
- D. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for equilibrium solution. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes slope field. It does not answer the question about equilibrium solution.
- B: This describes euler's method. It does not answer the question about equilibrium solution.
- C: Correct. A constant solution where slope is zero.
- D: This describes slope fields and equilibrium. It does not answer the question about equilibrium solution.

### Review question 3


**Prompt - exact player copy:** Which statement best explains euler's method?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. A constant solution where slope is zero.
- C. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.
- D. Repeated tangent-line steps.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for euler's method. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes slope field. It does not answer the question about euler's method.
- B: This describes equilibrium solution. It does not answer the question about euler's method.
- C: This describes slope fields and equilibrium. It does not answer the question about euler's method.
- D: Correct. Repeated tangent-line steps.

### Review question 4


**Prompt - exact player copy:** A pressure model obeys dP/dh=0.4(8-P). Which equilibrium and nearby direction of change does it predict?

**Options - exact player copy:**

- A. P=8 is an equilibrium; values below 8 rise and values above 8 fall as h increases.
- B. Short segments showing a differential equation's slope at many points.
- C. A constant solution where slope is zero.
- D. Repeated tangent-line steps.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for slope fields and equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. P=8 is an equilibrium; values below 8 rise and values above 8 fall as h increases.
- B: This describes slope field. It does not answer the question about slope fields and equilibrium.
- C: This describes equilibrium solution. It does not answer the question about slope fields and equilibrium.
- D: This describes euler's method. It does not answer the question about slope fields and equilibrium.

### Review question 5


**Prompt - exact player copy:** Use Euler's method on dP/dh=0.4(8-P), starting at P(0)=4, with two steps of Δh=0.5. What is P(1)?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. The first step gives 4.8 and the second gives 5.44.
- C. A constant solution where slope is zero.
- D. Repeated tangent-line steps.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for euler method. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes slope field. It does not answer the question about euler method.
- B: Correct. The first step gives 4.8 and the second gives 5.44.
- C: This describes equilibrium solution. It does not answer the question about euler method.
- D: This describes euler's method. It does not answer the question about euler method.

### Review question 6


**Prompt - exact player copy:** Two numerical runs solve the same initial-value problem on the same interval. Only the Euler step size changes, from 0.5 to 0.25. What does this comparison test?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. A constant solution where slope is zero.
- C. Sensitivity to numerical step size, while the physical model and initial condition remain fixed.
- D. Repeated tangent-line steps.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for euler error and control. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes slope field. It does not answer the question about euler error and control.
- B: This describes equilibrium solution. It does not answer the question about euler error and control.
- C: Correct. Sensitivity to numerical step size, while the physical model and initial condition remain fixed.
- D: This describes euler's method. It does not answer the question about euler error and control.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 10 - The Flow That Eases

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 10 - 6 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Settle or Grow  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the weir bench.  
**Card body:** 6 work shifts remain before the storm. Drops strike the weir bucket at a slowing pace. Today you decide whether seepage stays inside its limit.
**Objective:** Select the seepage model and approve or reject the load limit.

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
  - id: headwater_m10_we01
    title: Solve an exponential model
    problem: Solve y′=2y with y(0)=3.
    rule: For nonzero y, separate as dy/y=2 dx and integrate.
    steps:
    - 'Set up the relationship: For nonzero y, separate as dy/y=2 dx and integrate.'
    - ln|y|=2x+C, so y=Ae^(2x); y(0)=3 gives A=3.
    answer: The solution is y=3e^(2x).
    common_mistake: The integration constant must be fixed using the initial condition.
  - id: headwater_m10_we02
    title: Evaluate decay at a convenient time
    problem: A quantity satisfies y′=-y and y(0)=10. Find y(ln 2).
    rule: The solution of y′=ky is y=y0 e^(kt).
    steps:
    - 'Set up the relationship: The solution of y′=ky is y=y0 e^(kt).'
    - y(ln 2)=10e^(-ln 2)=10/2=5.
    answer: The quantity has halved to 5.
    common_mistake: The negative rate produces decay, not growth.
  - id: headwater_m10_we03
    title: Evaluate logistic growth
    problem: A population satisfies N′=0.2N(1-N/100). Find N′ at N=50.
    rule: The factor 1-N/K reduces growth as population approaches capacity K.
    steps:
    - 'Set up the relationship: The factor 1-N/K reduces growth as population approaches capacity K.'
    - N′=0.2(50)(1-50/100)=10(0.5)=5 individuals per time unit.
    answer: At population 50, the growth rate is 5 per time unit.
    common_mistake: Do not omit the capacity factor.
  - id: headwater_m10_we04
    title: Determine an integration constant
    problem: Solve y′=2x with y(1)=4.
    rule: Integrate the rate, then use the initial condition.
    steps:
    - 'Set up the relationship: Integrate the rate, then use the initial condition.'
    - y=x²+C; 4=1²+C gives C=3.
    answer: The solution is y=x²+3.
    common_mistake: A derivative does not determine the vertical offset without an initial value.
  - id: headwater_m10_we05
    title: Test an equilibrium
    problem: For y′=4-y, determine whether y=4 is a stable equilibrium.
    rule: An equilibrium has derivative zero; nearby derivative signs determine local attraction.
    steps:
    - At y=4, y′=0. Below 4, y′>0, so solutions rise.
    - Above 4, y′<0, so solutions fall. Both directions point toward 4.
    answer: The equilibrium y=4 is stable.
    common_mistake: Zero slope at equilibrium alone does not show stability.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Differential equation: an equation involving a function and its rate.

Initial condition: one known point selecting a particular solution.

Carrying capacity: limiting level in a logistic model.

#### Primer concepts

- separate `y` and `x` factors; integrate both sides; use the initial condition to find `C`; exponential sign controls growth or decay.

#### Equations first needed today
**Equation:** `dy/dt=ky`, `y=Ae^(kt)`

**What it is for:** growth or decay proportional to amount.

**Symbols:** `k` rate constant.

**Why this campaign needs it:** seepage may decay after a gate change.

**Equation:** `dy/dt=ky(L-y)`

**What it is for:** bounded logistic change.

**Symbols:** `L` limiting level.

**Why this campaign needs it:** soil drainage can approach a stable ceiling.

## Main story happening - designer summary

A separable exponential model predicts bounded seepage and survives worst-case stress.

## Learning and dramatic intent

Distinguish standard differential models through equilibrium and mechanism.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Seepage & Uplift Bay | `weir-bench` | automatic**

**Trigger:** mission_10_arrival.

**World state:** Drops strike the weir bucket at a slowing pace.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with separate the seepage equation. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `weir-bench` in Seepage & Uplift Bay.

**Beat 2 - After Stop 37 | `weir-bench` | automatic**

**Trigger:** accepted_stop_37.

**World state:** At `weir-bench`, the dated accepted-result slip for Stop 37 reads: "3.614, tolerance .005.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "That check holds. The seepage prediction has a measured time series available for an independent model check."

**Unlocks/waypoint:** Unlock Stop 38 at `weir-bench` in Seepage & Uplift Bay.

**Beat 3 - After Stop 38 | `drain-console` | automatic**

**Trigger:** accepted_stop_38.

**World state:** At `weir-bench`, the dated accepted-result slip for Stop 38 reads: "decay.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Arun Mehta: "That check holds. The decay model needs comparison with a process whose limiting value is not zero."

**Unlocks/waypoint:** Unlock Stop 39 at `drain-console` in Seepage & Uplift Bay.

**Beat 4 - After Stop 39 | `uplift-wall` | automatic**

**Trigger:** accepted_stop_39.

**World state:** At `drain-console`, the dated accepted-result slip for Stop 39 reads: "ambient sets limit.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Arun Mehta: "That check holds. The observed seepage decay still carries rate uncertainty that could change load approval."

**Unlocks/waypoint:** Unlock Stop 40 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `weir-bench` | automatic**

**Trigger:** accepted_stop_40.

**World state:** At `weir-bench`, Arun Mehta clips the BELOW 5.0 LITRES PER MINUTE clearance to the weir notebook. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "The flow is easing. The empty space still needs proof. But Imani's new lake survey has less space than the old chart; the release plan may be short again."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m10

**Home:** `weir-bench`. **Before:** The dated mission-10 evidence holder at this fixture has no accepted record. Drops strike the weir bucket at a slowing pace.
**After — exact action:** Arun Mehta clips the BELOW 5.0 LITRES PER MINUTE clearance to the weir notebook.
**Trigger:** accepted_stop_40. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `holdout-drawer`, a fresh sonar roll crowds the old 2003 drawing.
**Segue - exact player copy:** But Imani's new lake survey has less space than the old chart; the release plan may be short again.

## Location plan

STRUCT to STORE; second system provides transfer evidence unavailable at seepage bench.

## Characters and dramatic beat

Arun moves from suspicion to approval only after parameter stress.

## Key concepts, explained here

separation, `ln|y|`, initial condition, exponential/logistic/Newton models, equilibrium, parameter stress.

## Stop 37 - Separate the seepage equation

**Format/placement:** DERIVE, at `weir-bench`.

**Metadata:** Concept: 20 - separation/initial condition; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: INTRODUCE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the weir bench, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The pressure investigation now needs to test how excess seepage changes after the load adjustment.

**Question card story setup - exact player copy:** Excess seepage S follows dS/dt=-0.30S per hour with S(0)=12 L/min. Separate variables, integrate, and use the initial condition to predict the excess after 4 h.

**Question card story-science connection - exact player copy:** The initial-value solution predicts whether seepage should decay enough before the next load review.

**Fixture source panel - exact player copy:** Excess seepage S follows dS/dt=-0.30S per hour with S(0)=12 L/min. Separate variables, integrate, and use the initial condition to predict the excess after 4 h.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit S(4) in litres per minute.

**Complete format-specific interaction block:** `derive:{left_side:"S(4)",goal:"S(4)",givens:["S'=-.30S","S(0)=12"],lines:[{expressions:["dS/S=-.30dt","S dS=-.30dt"],correct:"dS/S=-.30dt",rules:["separate variables","multiply same side"],correct_rule:"separate variables"},{expressions:["ln|S|=-.30t+C","S^2/2=-.30t"],correct:"ln|S|=-.30t+C",rules:["integral of 1/S","power rule with n=1"],correct_rule:"integral of 1/S"},{expressions:["S=12e^(-.30t)","S=e^(-.30t)+12"],correct:"S=12e^(-.30t)",rules:["use initial condition","add initial value"],correct_rule:"use initial condition"},{expressions:["S(4) = 12e^(-0.30×4) = 3.614 L/min","S(4) = 8.4 L/min"],correct:"S(4) = 12e^(-0.30×4) = 3.614 L/min",rules:["evaluate t=4","linear decay"],correct_rule:"evaluate t=4"}],answerText:"S(4)=12e^-1.2=3.614 L/min."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["S'=-.30S", "S(0)=12"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Separate the seepage equation in the form and units requested by the prompt"
  left_side: "S(4)"
  steps:
    - id: step_1
      doing: "separate variables"
      candidates:
        - {text: "dS/S=-.30dt", correct: true, rule: "separate variables"}
        - {text: "S dS=-.30dt", correct: false, survives: true, rule: "multiply same side", reason: "This is the common multiply same side mistake; it does not perform the licensed separate variables step."}
    - id: step_2
      doing: "integral of 1/S"
      candidates:
        - {text: "ln|S|=-.30t+C", correct: true, rule: "integral of 1/S"}
        - {text: "S^2/2=-.30t", correct: false, survives: true, rule: "power rule with n=1", reason: "This is the common power rule with n=1 mistake; it does not perform the licensed integral of 1/S step."}
    - id: step_3
      doing: "use initial condition"
      candidates:
        - {text: "S=12e^(-.30t)", correct: true, rule: "use initial condition"}
        - {text: "S=e^(-.30t)+12", correct: false, survives: true, rule: "add initial value", reason: "This is the common add initial value mistake; it does not perform the licensed use initial condition step."}
    - id: step_4
      doing: "evaluate t=4"
      candidates:
        - {text: "S(4) = 12e^(-0.30×4) = 3.614 L/min", correct: true, rule: "evaluate t=4"}
        - {"text": "S(4) = 12e^(+0.30×4) = 39.841 L/min", "correct": false, "survives": true, "rule": "linear decay", "reason": "A positive exponent would model growth, while the given differential equation specifies decay."}
```
**Correct result:** `3.614`, tolerance `.005`.

**Answer text:** S(4)=12e^-1.2=3.614 L/min.

**Why:** S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Wrong-path feedback:** Proportional decay is exponential, not linear.

**State/output:** decay curve; unlock 10.2.

## Stop 38 - Select the model

**Format/placement:** DIAGNOSIS, at `weir-bench`.

**Metadata:** Concept: 21 - exponential/logistic/Newton models; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: PRACTICE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the weir bench, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The seepage prediction has a measured time series available for an independent model check.

**Question card story setup - exact player copy:** The measured excess is 12.0, 8.9, 6.6, 4.9, 3.6 L/min at hours 0-4. Compare candidate mechanisms, including their equilibrium behavior, and choose the one fitting every reading.

**Question card story-science connection - exact player copy:** The observed decline distinguishes decay toward zero from mechanisms with incompatible long-term behavior.

**Question card prompt - exact player copy:** Compare all four candidate differential equations with every displayed reading in L/min, then submit exactly one model label.

**Complete format-specific interaction block:** `diagnosis:{headline:"seepage model",readings:[{zone:"t0",value:12},{zone:"t1",value:8.9},{zone:"t2",value:6.6},{zone:"t4",value:3.6}],choices:[{label:"S'= -0.30S",mechanism:"exponential decay to 0"},{label:"S'=0.30S",mechanism:"unbounded growth"},{label:"S'=0.03S(20-S)",mechanism:"logistic toward 20"},{label:"S'=-.3(S-5)",mechanism:"Newton-type approach to 5"}],answer:"S'= -0.30S"}`

**Correct result:** decay.

**Answer text:** ratios are near `e^-0.3`; values approach zero.

**Why:** ratios are near `e^-0.3`; values approach zero. The correct mechanism determines whether continued head makes the wall safer or worse.

**Wrong-path feedback:** Model choice uses direction and equilibrium, not one point.

**State/output:** travel STORE.

## Stop 39 - Transfer to cooling

**Format/placement:** CONTROL, at `drain-console`.

**Metadata:** Concept: 21 - Newton cooling; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: TRANSFER; Difficulty: L4; Story role: check.

**Call - exact player copy:** Go to the drain console, in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The decay model needs comparison with a process whose limiting value is not zero.

**Question card story setup - exact player copy:** Because seepage approaches zero, compare a sensor at 70 C cooling toward a 20 C room. Change only room temperature to 25 C, hold the cooling constant fixed, then restore and compare limits.

**Question card story-science connection - exact player copy:** The room-temperature reversal tests whether the cooling sensor approaches its surroundings rather than an arbitrary zero reading.

**Question card prompt - exact player copy:** Choose ambient temperature from candidate controls ambient temperature, cooling constant, and initial temperature. Measure the limiting temperature at 20 C, change only ambient temperature to 25 C while the cooling constant and initial temperature remain fixed, measure the new limit, restore 20 C and remeasure, then submit the causal conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"ambient"},{id:"k"},{id:"initial"}],correct_control:"ambient",baseline:20,response:25,noise_band:.2,measurements:[20,25,20],restore:true,correct_conclusion:"ambient sets equilibrium"}`

**Correct result:** ambient sets limit.

**Answer text:** The completed check shows ambient sets limit.

**Why:** ambient sets limit. A nonzero equilibrium separates Newton cooling from simple decay.

**Wrong-path feedback:** Newton's law uses temperature difference `T-Ta`.

**State/output:** model legend; unlock 10.4.

## Stop 40 - Approve the carrying limit

**Format/placement:** STRESS, asked by Arun Mehta beside `uplift-wall`.

**Metadata:** Concept: 21 - logistic stability/parameter uncertainty; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Arun Mehta, at the uplift wall in Seepage & Uplift Bay.

**Stop reason - exact player copy:** The observed seepage decay still carries rate uncertainty that could change load approval.

**Question card story setup - exact player copy:** The observed decay constant is k=-0.30+-0.05 h^-1, and approval requires excess seepage below 5.0 L/min after 4 h, inclusive. Stress the full interval before approving the load.

**Question card story-science connection - exact player copy:** The slowest allowed decay determines whether excess seepage remains under the required four-hour limit.

**Question card prompt - exact player copy:** Sweep k from -0.35 through -0.25 h^-1 in 0.01 h^-1 steps using S(4)=12e^(4k); submit the worst-case value in L/min and approve/reject.

**Complete format-specific interaction block:** `stress:{assumption:{label:"k",min:-.35,max:-.25,step:.01},candidates:[{id:"approve",condition:"12e^(4k)<=5"},{id:"reject",condition:"otherwise"}],correct:"approve",worst_case:{k:-.25,value:4.415}}`

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 40 - Approve the carrying limit"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Sweep k from -0.35 through -0.25 h^-1 in 0.01 h^-1 steps using S(4)=12e^(4k); submit the worst-case value in L/min and approve/reject."
  payload: "`stress:{assumption:{label:\"k\",min:-.35,max:-.25,step:.01},candidates:[{id:\"approve\",condition:\"12e^(4k)<=5\"},{id:\"reject\",condition:\"otherwise\"}],correct:\"approve\",worst_case:{k:-.25,value:4.415}}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "decay constant k", min: -0.35, max: -0.25, nominal: -0.3, step: 0.01, unit: "h^-1"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: -0.3, max: -0.3}
      failsAt: -0.25
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: -0.3, max: -0.25}
      failsAt: -0.35
    - id: robust_plan
      label: "approve; worst `12e^-1=4.415`."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: -0.35, max: -0.25}
  robust: robust_plan
  question: "Sweep k from -0.35 through -0.25 h^-1 in 0.01 h^-1 steps using S(4)=12e^(4k); submit the worst-case value in L/min and approve/reject."
```

**Correct result:** approve; worst `12e^-1=4.415`.

**Answer text:** even slowest supported decay stays below 5.

**Why:** even slowest supported decay stays below 5. A safety conclusion should survive the least favorable supported parameter.

**Wrong-path feedback:** Test the least negative `k`, which decays slowest.

**State/output:** carrying limit signed.

## Mission outcome

Mission decision: Approve the wall seepage limit. The extra flow falls with time. It stays below 5.0 litres per minute in every sound case. The wall check passes. A new lake survey now tests the storage chart.

**Segue - exact player copy:** But Imani's new lake survey has less space than the old chart; the release plan may be short again.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Arun Mehta clips the BELOW 5.0 LITRES PER MINUTE clearance to the weir notebook. But Imani's new lake survey has less space than the old chart; the release plan may be short again.

**Story event - exact player copy:** The seepage forecast stays below the structural limit and clears the wall hold.

TARGET `18:00`; auto `INTEGRITY +5` clamped at 100; canonical `92/86/76/100`, award 12, allocate 8 Storage, 4 Reserve -> `100/86/80/100`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains differential equation?

**Options - exact player copy:**

- A. One known point selecting a particular solution.
- B. Limiting level in a logistic model.
- C. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.
- D. An equation involving a function and its rate.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for differential equation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes initial condition. It does not answer the question about differential equation.
- B: This describes carrying capacity. It does not answer the question about differential equation.
- C: This describes separation and initial condition. It does not answer the question about differential equation.
- D: Correct. An equation involving a function and its rate.

### Review question 2


**Prompt - exact player copy:** Which statement best explains initial condition?

**Options - exact player copy:**

- A. One known point selecting a particular solution.
- B. An equation involving a function and its rate.
- C. Limiting level in a logistic model.
- D. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for initial condition. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. One known point selecting a particular solution.
- B: This describes differential equation. It does not answer the question about initial condition.
- C: This describes carrying capacity. It does not answer the question about initial condition.
- D: This describes separation and initial condition. It does not answer the question about initial condition.

### Review question 3


**Prompt - exact player copy:** Which statement best explains carrying capacity?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. Limiting level in a logistic model.
- C. One known point selecting a particular solution.
- D. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for carrying capacity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes differential equation. It does not answer the question about carrying capacity.
- B: Correct. Limiting level in a logistic model.
- C: This describes initial condition. It does not answer the question about carrying capacity.
- D: This describes separation and initial condition. It does not answer the question about carrying capacity.

### Review question 4


**Prompt - exact player copy:** An excess flow obeys dS/dt=-0.30S per hour, with S(0)=12 L/min. What is S(4)?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. One known point selecting a particular solution.
- C. S(4)=12e^(-1.2)≈3.614 L/min.
- D. Limiting level in a logistic model.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for separation and initial condition. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes differential equation. It does not answer the question about separation and initial condition.
- B: This describes initial condition. It does not answer the question about separation and initial condition.
- C: Correct. S(4)=12e^(-1.2)≈3.614 L/min.
- D: This describes carrying capacity. It does not answer the question about separation and initial condition.

### Review question 5


**Prompt - exact player copy:** A positive quantity follows S(t)=12e^(-0.30t), where t is in hours. Which statement describes successive one-hour readings and the long-run limit?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. One known point selecting a particular solution.
- C. Limiting level in a logistic model.
- D. Each reading is e^(-0.30) times the preceding one, and S(t) approaches zero.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for exponential and logistic and newton models. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes differential equation. It does not answer the question about exponential and logistic and newton models.
- B: This describes initial condition. It does not answer the question about exponential and logistic and newton models.
- C: This describes carrying capacity. It does not answer the question about exponential and logistic and newton models.
- D: Correct. Each reading is e^(-0.30) times the preceding one, and S(t) approaches zero.

### Review question 6


**Prompt - exact player copy:** An object cools in a room held at 20°C according to T′=-k(T-20), where k>0. What temperature does the model approach?

**Options - exact player copy:**

- A. 20°C, the fixed ambient temperature.
- B. An equation involving a function and its rate.
- C. One known point selecting a particular solution.
- D. Limiting level in a logistic model.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for newton cooling. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. 20°C, the fixed ambient temperature.
- B: This describes differential equation. It does not answer the question about newton cooling.
- C: This describes initial condition. It does not answer the question about newton cooling.
- D: This describes carrying capacity. It does not answer the question about newton cooling.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 11 - The Lake Lost Its Room

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 11 - 5 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** The Reservoir Is Smaller  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the resurveyed curve.  
**Card body:** 5 work shifts remain before the storm. A fresh sonar roll crowds the old 2003 drawing. Today you decide which lake storage curve to use.
**Objective:** Certify the old or resurveyed stage-storage curve.

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
  - id: headwater_m11_we01
    title: Area between two graphs
    problem: Find the area between y=2 and y=x on 0≤x≤2.
    rule: Area = integral of upper function minus lower function.
    steps:
    - 'Set up the relationship: Area = integral of upper function minus lower function.'
    - A=integral_0^2(2-x)dx=[2x-x²/2]_0^2=2.
    answer: The enclosed area is 2 square units.
    common_mistake: Choose upper minus lower on the specified interval.
    figure:
      kind: line
      xLabel: x
      yLabel: y
      caption: The line y=x lies below y=2 on this interval.
      series:
      - name: y
        points:
        - - 0
          - 0
        - - 1
          - 1
        - - 2
          - 2
      - name: y=2
        points:
        - - 0
          - 2
        - - 2
          - 2
  - id: headwater_m11_we02
    title: Average value of a function
    problem: Find the average value of f(x)=x² on [0,3].
    rule: f_avg=(1/(b-a)) integral_a^b f(x)dx.
    steps:
    - 'Set up the relationship: f_avg=(1/(b-a)) integral_a^b f(x)dx.'
    - f_avg=(1/3)[x³/3]_0^3=(1/3)(9)=3.
    answer: The average function value is 3.
    common_mistake: The endpoint average is not generally the same as the integral average.
  - id: headwater_m11_we03
    title: Area when graphs cross
    problem: Find the area between y=x and y=0 on [-2,2].
    rule: Split at the crossing x=0 and integrate the positive height difference.
    steps:
    - 'Set up the relationship: Split at the crossing x=0 and integrate the positive height difference.'
    - A=integral_-2^0(-x)dx+integral_0^2 x dx=2+2=4.
    answer: The geometric area is 4 square units.
    common_mistake: A single signed integral would cancel the two equal areas.
  - id: headwater_m11_we04
    title: A growing square
    problem: A square side s is 3 cm and grows at ds/dt=2 cm/s. Find dA/dt for area A.
    rule: A=s², so dA/dt=2s(ds/dt).
    steps:
    - 'Set up the relationship: A=s², so dA/dt=2s(ds/dt).'
    - dA/dt=2(3)(2)=12 cm²/s.
    answer: The area grows at 12 cm²/s.
    common_mistake: Differentiate before inserting the fixed side length.
  - id: headwater_m11_we05
    title: Estimate with trapezoids
    problem: A rate is 2,4,6 L/min at times 0,1,2 min. Estimate total volume.
    rule: Each trapezoid contributes average endpoint rate × interval width.
    steps:
    - 'Set up the relationship: Each trapezoid contributes average endpoint rate × interval width.'
    - V=[(2+4)/2](1)+[(4+6)/2](1)=3+5=8 L.
    answer: The trapezoidal estimate is 8 L.
    common_mistake: Average adjacent endpoints for each interval, not every reading equally.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Area between curves: integral of top minus bottom, split at crossings.

Average value: constant height with the same accumulated area.

Washer: cross-sectional disk with a hole.

#### Primer concepts

- find intersections before integrating; use absolute difference for geometric area; average value divides accumulation by interval length.

#### Equations first needed today
**Equation:** `Area=integral_a^b |f-g|dx`; `f_avg=(1/(b-a))integral_a^b f dx`

**What it is for:** curve difference and representative mean.

**Symbols:** `a,b` bounds.

**Why this campaign needs it:** silt loss and average capacity error alter the release target.

## Main story happening - designer summary

Area between surveys quantifies silt loss; independent transects and a level-rate test replace the old curve.

## Learning and dramatic intent

Deliver Twist 2 through area, average value, attestation, and related rates.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `storage-board` | automatic**

**Trigger:** mission_11_arrival.

**World state:** A fresh sonar roll crowds the old 2003 drawing.

**Panel/HUD text:** MISSION 11: INTEGRATE LOST CAPACITY OPEN

**Dialogue bubbles -** Mara Vale: "Start with integrate lost capacity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 41 | `level-desk` | automatic**

**Trigger:** accepted_stop_41.

**World state:** At `storage-board`, the dated accepted-result slip for Stop 41 reads: "7.5 million m^3, tolerance .01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The lost-capacity result needs a per-metre summary without erasing changes along the curve."

**Unlocks/waypoint:** Unlock Stop 42 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 42 | `survey-rack` | automatic**

**Trigger:** accepted_stop_42.

**World state:** At `level-desk`, the dated accepted-result slip for Stop 42 reads: "2.5 million m^3/m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The storage discrepancy needs independent survey support before the old curve is replaced."

**Unlocks/waypoint:** Unlock Stop 43 at `survey-rack` in Storage & Level Board.

**Beat 4 - After Stop 43 | `level-desk` | automatic**

**Trigger:** accepted_stop_43.

**World state:** At `survey-rack`, the dated accepted-result slip for Stop 43 reads: "three backed records.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The supported capacity revision must also predict the level change observed during release."

**Unlocks/waypoint:** Unlock Stop 44 at `level-desk` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**Trigger:** accepted_stop_44.

**World state:** At `holdout-drawer`, Imani Okoro opens the sealed independent survey drawer. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "I kept the old chart because we knew it. That was not enough. Therefore Nia must rebuild the plan with 7.5 million cubic metres less room; old storage cannot power a new promise."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m11

**Home:** `holdout-drawer`. **Before:** The dated mission-11 evidence holder at this fixture has no accepted record. A fresh sonar roll crowds the old 2003 drawing.
**After — exact action:** Imani Okoro opens the sealed independent survey drawer.
**Trigger:** accepted_stop_44. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `machine-board`, a runner crate blocks one of the two machine bays.
**Segue - exact player copy:** Therefore Nia must rebuild the plan with 7.5 million cubic metres less room; old storage cannot power a new promise.

## Location plan

STORE -> STRUCT -> GATES; each site supplies respectively discrepancy, independent identity, and operational response.

## Characters and dramatic beat

Mara's trust in the old sheet yields to physical evidence; Arun verifies rather than merely agrees.

## Key concepts, explained here

area between curves, crossings, average value, independent records, related-rate conversion.

## Stop 41 - Integrate lost capacity

**Format/placement:** DERIVE, at `storage-board`.

**Metadata:** Concept: 22 - area between curves/crossings; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The new survey challenges how much empty capacity the old storage curve credits to the release plan.

**Question card story setup - exact player copy:** Old minus new storage density is d(h)=6-h million cubic metres per metre for 2<=h<=5, and the curves cross at h=6. Integrate the positive gap across the operating interval.

**Question card story-science connection - exact player copy:** The integrated gap between storage-density curves measures total capacity lost across the operating heights.

**Fixture source panel - exact player copy:** Old minus new storage density is d(h)=6-h million cubic metres per metre for 2<=h<=5, and the curves cross at h=6. Integrate the positive gap across the operating interval.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit million cubic metres.

**Complete format-specific interaction block:** `derive:{left_side:"V_lost",goal:"lost volume",givens:["d=6-h","2<=h<=5"],lines:[{expressions:["V_lost = [6h-h^2/2]_2^5","V_lost = [6-h^2]_2^5"],correct:"V_lost = [6h-h^2/2]_2^5",rules:["FTC and power antiderivative","differentiate"],correct_rule:"FTC and power antiderivative"},{expressions:["V_lost = (6×5-5^2/2)-(6×2-2^2/2) = 7.5 million m^3","V_lost = 3 million m^3"],correct:"V_lost = (6×5-5^2/2)-(6×2-2^2/2) = 7.5 million m^3",rules:["evaluate upper minus lower","width only"],correct_rule:"evaluate upper minus lower"}],answerText:"Lost capacity is 7.5 million m^3."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["d=6-h", "2<=h<=5"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Integrate lost capacity in the form and units requested by the prompt"
  left_side: "V_lost"
  steps:
    - id: step_1
      doing: "FTC and power antiderivative"
      candidates:
        - {text: "V_lost = [6h-h^2/2]_2^5", correct: true, rule: "FTC and power antiderivative"}
        - {text: "V_lost = [6-h^2]_2^5", correct: false, survives: true, rule: "differentiate", reason: "This is the common differentiate mistake; it does not perform the licensed FTC and power antiderivative step."}
    - id: step_2
      doing: "evaluate upper minus lower"
      candidates:
        - {text: "V_lost = (6×5-5^2/2)-(6×2-2^2/2) = 7.5 million m^3", correct: true, rule: "evaluate upper minus lower"}
        - {"text": "V_lost = (6×2-2^2/2)-(6×5-5^2/2) = -7.5 million m^3", "correct": false, "survives": true, "rule": "width only", "reason": "A definite integral evaluates the antiderivative at the upper bound minus the lower bound."}
```
**Correct result:** `7.5 million m^3`, tolerance `.01`.

**Answer text:** Lost capacity is 7.5 million m^3.

**Why:** Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.

**Wrong-path feedback:** Area between curves integrates the gap, not only its endpoint.

**State/output:** loss shaded; unlock 11.2.

## Stop 42 - Compute average loss

**Format/placement:** BALLPARK, at `level-desk`.

**Metadata:** Concept: 19 - average value/splitting; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: PRACTICE; Difficulty: L3; Story role: consequence.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The lost-capacity result needs a per-metre summary without erasing changes along the curve.

**Question card story setup - exact player copy:** With 7.5 million m^3 lost over a 3 m operating interval, compute the average capacity error per metre. Then state why that average cannot replace the full curve near a crossing.

**Question card story-science connection - exact player copy:** Average capacity error communicates the survey discrepancy while leaving the full curve necessary near a crossing.

**Question card prompt - exact player copy:** Use f_avg=(1/(5-2))(7.5 million m^3); submit one number in million m^3/m, then submit summary only or replace full curve.

**Complete format-specific interaction block:** `estimate:{labels:["lost volume","height interval"],values:[[7.5],[3]],slots:2,template:"loss/interval",formula:"f_avg=7.5/3",correct:[7.5,3],target:2.5,tolerance:.01}`

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "average capacity loss per metre"
  unit: "million m³/m"
  inputs:
    - {label: "Total lost volume", value: 7.5, unit: "million m³"}
    - {label: "Lower operating level", value: 2, unit: "m"}
    - {label: "Upper operating level", value: 5, unit: "m"}
  operation: "divide total lost volume by the operating-interval length"
  formula: "f_avg=7.5/(5-2)"
  correctResult: 2.5
  tolerance: 0.01
  answerText: "The average loss is 2.5 million m³ per metre; it summarizes the interval but cannot replace the full curve near a crossing."
```

**Correct result:** `2.5 million m^3/m`.

**Answer text:** average preserves the integral but not pointwise change.

**Why:** average preserves the integral but not pointwise change. Average value summarizes total loss but not local sensitivity.

**Wrong-path feedback:** Divide by interval length `b-a`.

**State/output:** quick-call note; waypoint STRUCT.

## Stop 43 - Verify independent transects

**Format/placement:** ATTEST, asked by Mara Vale beside `survey-rack`.

**Metadata:** Concept: 27 - evidence independence; Keystone: Approximation; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L5; Story role: verification.

**Call - exact player copy:** Talk to Mara Vale, at the survey rack in Storage & Level Board.

**Stop reason - exact player copy:** The storage discrepancy needs independent survey support before the old curve is replaced.

**Question card story setup - exact player copy:** At least one independent depth record and one calibration record are required.

**Question card story-science connection - exact player copy:** The verified depth and calibration records determine whether the revised capacity curve rests on independent evidence.

**Question card prompt - exact player copy:** Spend the three-record verification limit, select exactly three claim IDs including transects and sonar calibration, and submit survey physically backed or survey not physically backed.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"transects",label:"11 GPS transects dated this week",backed:true,critical:true},{id:"sonar",label:"depth sonar calibration block",backed:true,critical:true},{id:"oldsheet",label:"2003 sheet copied correctly",backed:true},{id:"operator",label:"operator memory of silt",backed:false},{id:"shared",label:"same software export",backed:false}],critical_unbacked:"operator memory",correct_checks:["transects","sonar","oldsheet"]}`

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Verify independent transects", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** three backed records.

**Answer text:** independent transects and calibration support real silt loss.

**Why:** independent transects and calibration support real silt loss. Independent physical records decide whether curve disagreement is real or clerical.

**Wrong-path feedback:** A repeated export is not independent measurement.

**State/output:** resurvey certified; waypoint GATES.

## Stop 44 - Convert volume loss to level rate

**Format/placement:** VERIFY, at `level-desk`.

**Metadata:** Concept: 8 - related rates; Keystone: Motion/rates+applied integrals; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The supported capacity revision must also predict the level change observed during release.

**Question card story setup - exact player copy:** The resurvey gives dV/dh=2.0 million m3/m, while net outflow is 0.50 million m3/h. Predict the falling level rate, then verify it against the float gauge.

**Question card story-science connection - exact player copy:** The float comparison tests whether the new volume-height conversion explains the measured falling level rate.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $dh/dt=(dV/dt)/(dV/dh)$ with $dV/dt=-0.50$ million m^3/h and $dV/dh=2.0$ million m^3/m; submit $dh/dt$ in m/h before simulation unlocks. **OPERATE:** Run one hour with inflow and gate fixed. **MEASURE:** Record level change and volume change. **INTERPRET:** Submit whether to replace the old curve; no restoration is required.

**Complete format-specific interaction block:** `verify:{prediction:{target:-.25,unit:"m/h",tolerance:.005},equipment_locked_until_prediction_commit:true,operation:"one-hour simulation",fixed:["inflow","gate"],measurements:["-0.248 m","-0.50 million m^3"],restore:false,correct_conclusion:"replace old curve"}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Convert volume loss to level rate", unit: "units printed on the card"}
  predictionRange: {min: 12.5, max: 37.5, step: 2.5}
  measurement: {label: "independent measured value", truth: 25.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`-.25 m/h`; replace."
```

**Correct result:** `-.25 m/h`; replace.

**Answer text:** `-.50/2=-.25`; measurement agrees.

**Why:** `-.50/2=-.25`; measurement agrees. The new derivative converts the same release into a faster level change than the old curve predicted.

**Wrong-path feedback:** Keep the negative sign for falling level.

**State/output:** old sheet removed, resurvey pinned.

## Mission outcome

Mission decision: Replace the 2003 storage curve. New surveys show 7.5 million cubic metres of lost space. The new rate also matches the level drop. The old plan claimed too much room. Rebuild the release plan.

**Segue - exact player copy:** Therefore Nia must rebuild the plan with 7.5 million cubic metres less room; old storage cannot power a new promise.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Imani Okoro opens the sealed independent survey drawer. Therefore Nia must rebuild the plan with 7.5 million cubic metres less room; old storage cannot power a new promise.

**Story event - exact player copy:** The corrected storage curve replaces the outdated 2003 chart in the control room.

TARGET `19:00`; auto `STORAGE -10 | INTEGRITY -4`; canonical `100/86/80/100` -> `90/86/80/96`, award 12, allocate 10 Storage, 2 Integrity -> `100/86/80/98`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** The boundaries are y=6-x and y=0 on 2≤x≤5. What area lies between them?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "x (m)",
  "yLabel": "Height (m)",
  "caption": "Upper boundary y=6−x and lower boundary y=0, for 2≤x≤5",
  "series": [
    {
      "name": "Upper boundary",
      "points": [
        [
          2,
          4
        ],
        [
          3,
          3
        ],
        [
          4,
          2
        ],
        [
          5,
          1
        ]
      ]
    },
    {
      "name": "Lower boundary",
      "points": [
        [
          2,
          0
        ],
        [
          3,
          0
        ],
        [
          4,
          0
        ],
        [
          5,
          0
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 3 m².
- B. 7.5 m².
- C. 15 m².
- D. -7.5 m².

**Correct answer:** B

**Hint - exact player copy:** Integrate 6−x from 2 to 5.

**Option feedback - exact player copy:**

- A: This counts only the interval width.
- B: Correct. 7.5 m².
- C: This doubles the integral of the height difference.
- D: Geometric area is nonnegative; integrate upper minus lower.

### Review question 2


**Prompt - exact player copy:** Which statement best explains average value?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Cross-sectional disk with a hole.
- C. Constant height with the same accumulated area.
- D. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for average value. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes area between curves. It does not answer the question about average value.
- B: This describes washer. It does not answer the question about average value.
- C: Correct. Constant height with the same accumulated area.
- D: This describes area between curves and crossings. It does not answer the question about average value.

### Review question 3


**Prompt - exact player copy:** Which statement best explains washer?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Constant height with the same accumulated area.
- C. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.
- D. Cross-sectional disk with a hole.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for washer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes area between curves. It does not answer the question about washer.
- B: This describes average value. It does not answer the question about washer.
- C: This describes area between curves and crossings. It does not answer the question about washer.
- D: Correct. Cross-sectional disk with a hole.

### Review question 4


**Prompt - exact player copy:** The boundaries are y=6-x and y=0 on 2≤x≤5. What area lies between them?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "x (m)",
  "yLabel": "Height (m)",
  "caption": "Upper boundary y=6−x and lower boundary y=0, for 2≤x≤5",
  "series": [
    {
      "name": "Upper boundary",
      "points": [
        [
          2,
          4
        ],
        [
          3,
          3
        ],
        [
          4,
          2
        ],
        [
          5,
          1
        ]
      ]
    },
    {
      "name": "Lower boundary",
      "points": [
        [
          2,
          0
        ],
        [
          3,
          0
        ],
        [
          4,
          0
        ],
        [
          5,
          0
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 7.5 m².
- B. 3 m².
- C. 15 m².
- D. -7.5 m².

**Correct answer:** A

**Hint - exact player copy:** Integrate 6−x from 2 to 5.

**Option feedback - exact player copy:**

- A: Correct. 7.5 m².
- B: This counts only the interval width.
- C: This doubles the integral of the height difference.
- D: Geometric area is nonnegative; integrate upper minus lower.

### Review question 5


**Prompt - exact player copy:** For a continuous function f on [a,b], let c=[1/(b-a)]∫ₐᵇf(x)dx. What does replacing f by c preserve?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. The integral over [a,b], but not necessarily any individual function value.
- C. Constant height with the same accumulated area.
- D. Cross-sectional disk with a hole.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for average value and splitting. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes area between curves. It does not answer the question about average value and splitting.
- B: Correct. The integral over [a,b], but not necessarily any individual function value.
- C: This describes average value. It does not answer the question about average value and splitting.
- D: This describes washer. It does not answer the question about average value and splitting.

### Review question 6


**Prompt - exact player copy:** Two lake-volume estimates use the same sonar file. A third uses a separate survey and calibration. Which evidence best tests whether a discrepancy reflects real change?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Constant height with the same accumulated area.
- C. The separately surveyed and calibrated estimate provides a check that does not repeat the first file's errors.
- D. Cross-sectional disk with a hole.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for evidence independence. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes area between curves. It does not answer the question about evidence independence.
- B: This describes average value. It does not answer the question about evidence independence.
- C: Correct. The separately surveyed and calibrated estimate provides a check that does not repeat the first file's errors.
- D: This describes washer. It does not answer the question about evidence independence.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 12 - The Runner in the Crate

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 12 - 4 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** What the Steel Can Do  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the crated runner.  
**Card body:** 4 work shifts remain before the storm. A runner crate blocks one of the two machine bays. Today you decide which machines can repeat the release.
**Objective:** Fit the corrected release inside machine and hoist limits.

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
  - id: headwater_m12_we01
    title: Rotate a constant height
    problem: Rotate y=2 on 0≤x≤3 about the x-axis. Find the volume.
    rule: Disk volume V=π integral R(x)² dx, where R is radius.
    steps:
    - 'Set up the relationship: Disk volume V=π integral R(x)² dx, where R is radius.'
    - V=π integral_0^3 2² dx=4π(3)=12π cubic units.
    answer: The solid has volume 12π cubic units.
    common_mistake: Square the radius before integrating.
  - id: headwater_m12_we02
    title: Rotate a region with a hole
    problem: Rotate the region between y=3 and y=1 on 0≤x≤2 about the x-axis.
    rule: Washer volume V=π integral(R²-r²)dx, with outer radius R and inner radius r.
    steps:
    - 'Set up the relationship: Washer volume V=π integral(R²-r²)dx, with outer radius R and inner radius r.'
    - V=π integral_0^2(9-1)dx=16π cubic units.
    answer: The volume is 16π cubic units.
    common_mistake: R²-r² is not (R-r)².
  - id: headwater_m12_we03
    title: Use cylindrical shells
    problem: Rotate the rectangle 1≤x≤2, 0≤y≤3 about the y-axis.
    rule: Shell volume V=2π integral radius×height dx.
    steps:
    - 'Set up the relationship: Shell volume V=2π integral radius×height dx.'
    - V=2π integral_1^2 x(3)dx=6π[x²/2]_1^2=9π cubic units.
    answer: The volume is 9π cubic units.
    common_mistake: The shell radius is distance to the rotation axis, here x.
  - id: headwater_m12_we04
    title: Integrate a changing force
    problem: A force F(x)=2x newtons acts along displacement x from 0 to 3 metres. Find its work.
    rule: Work W=integral F(x)dx along the displacement.
    steps:
    - 'Set up the relationship: Work W=integral F(x)dx along the displacement.'
    - W=integral_0^3 2x dx=[x²]_0^3=9 J.
    answer: The force does 9 joules of work.
    common_mistake: Final force times total distance would overestimate this increasing force.
  - id: headwater_m12_we05
    title: Stretch a spring
    problem: A spring has force F=kx with k=4 N/m. Find work to stretch it from x=0 to x=2 m.
    rule: W=integral_0^a kx dx=ka²/2.
    steps:
    - 'Set up the relationship: W=integral_0^a kx dx=ka²/2.'
    - W=4(2²)/2=8 J.
    answer: Stretching the spring requires 8 J.
    common_mistake: Spring force is not constant over the stretch.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Disk: circular cross-section with no hole.

Washer: circular cross-section with an inner hole.

Shell: thin cylindrical layer.

Work: accumulated force through distance.

#### Primer concepts

- choose cross-sections perpendicular to the rotation axis for disks/washers; shells are parallel; work integrates changing force.

#### Equations first needed today
**Equation:** `V=pi integral(R^2-r^2)dx`; `V=2pi integral(radius)(height)dx`

**What it is for:** volumes by washers or shells.

**Symbols:** `R,r` radii and `x` slice position.

**Why this campaign needs it:** passage volume determines usable water per gate motion.

**Equation:** `W=integral F(x)dx`; for a spring `F=kx`

**What it is for:** energy under changing force.

**Symbols:** `W` work, `F` force, `x` distance, `k` stiffness.

**Why this campaign needs it:** the hoist must complete the scheduled motion.

## Main story happening - designer summary

Rotational volume removes unavailable turbine capacity; a work test bounds repeatable gate motion.

## Learning and dramatic intent

Make volume methods and work integrals decide a physical schedule.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Powerhouse | `runner-crate` | automatic**

**Trigger:** mission_12_arrival.

**World state:** A runner crate blocks one of the two machine bays.

**Panel/HUD text:** MISSION 12: COMPUTE THE MISSING RUNNER VOLUME OPEN

**Dialogue bubbles -** Nia Chen: "Start with compute the missing runner volume. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `runner-crate` in Powerhouse.

**Beat 2 - After Stop 45 | `runner-crate` | automatic**

**Trigger:** accepted_stop_45.

**World state:** At `runner-crate`, the dated accepted-result slip for Stop 45 reads: "23.038 m^3, tolerance .01.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Nia Chen: "That check holds. The passage calculation needs a second geometry check with the correct axis and integration bounds."

**Unlocks/waypoint:** Unlock Stop 46 at `runner-crate` in Powerhouse.

**Beat 3 - After Stop 46 | `work-meter` | automatic**

**Trigger:** accepted_stop_46.

**World state:** At `runner-crate`, the dated accepted-result slip for Stop 46 reads: "2pi integral_0^3 x(3-x)dx=9pi m^3.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Nia Chen: "That check holds. The alternative release route needs a hoist-work test before it can replace the runner."

**Unlocks/waypoint:** Unlock Stop 47 at `work-meter` in Powerhouse.

**Beat 4 - After Stop 47 | `dispatch-console` | automatic**

**Trigger:** accepted_stop_47.

**World state:** At `work-meter`, the dated accepted-result slip for Stop 47 reads: ".5*8000*.09+1200*.3=720 J; pass.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Nia Chen: "That check holds. One successful stroke does not establish a repeatable schedule with sufficient storage clearance and warning time."

**Unlocks/waypoint:** Unlock Stop 48 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `runner-crate` | automatic**

**Trigger:** accepted_stop_48.

**World state:** At `machine-board`, Nia Chen hangs a RUNNER UNAVAILABLE card over the blocked machine slot. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "One runner. Real work. No power from the crate. But Mara needs the error carried into the smaller margin; a neat answer can still be too uncertain."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m12

**Home:** `machine-board`. **Before:** The dated mission-12 evidence holder at this fixture has no accepted record. A runner crate blocks one of the two machine bays.
**After — exact action:** Nia Chen hangs a RUNNER UNAVAILABLE card over the blocked machine slot.
**Trigger:** accepted_stop_48. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `residual-plot`, the new survey and old fit lie on separate hooks.
**Segue - exact player copy:** But Mara needs the error carried into the smaller margin; a neat answer can still be too uncertain.

## Location plan

POWER -> GATES -> STORE; missing runner, hoist capacity, and final storage feasibility are owned separately.

## Characters and dramatic beat

Nia accepts lost output; Wilkes accepts only a return-tested stroke.

## Key concepts, explained here

disk/washer, shell setup, work as force integral, Hooke force, evidence value.

## Stop 45 - Compute the missing runner volume

**Format/placement:** DERIVE, at `runner-crate`.

**Metadata:** Concept: 23 - disk/washer volume; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: INTRODUCE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the runner crate, in Powerhouse.

**Stop reason - exact player copy:** The unavailable runner requires a physical passage-volume estimate before release options are compared.

**Question card story setup - exact player copy:** The runner passage is generated by rotating outer radius R(x)=2 m and inner radius r(x)=x/2 m for 0<=x<=2 m. Use washers to compute its water volume.

**Question card story-science connection - exact player copy:** The washer integral determines the water volume inside the runner passage after its hollow center is excluded.

**Fixture source panel - exact player copy:** The runner passage is generated by rotating outer radius R(x)=2 m and inner radius r(x)=x/2 m for 0<=x<=2 m. Use washers to compute its water volume.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit cubic metres.

**Complete format-specific interaction block:** `derive:{left_side:"V_runner",goal:"runner volume",givens:["R=2","r=x/2","0<=x<=2"],lines:[{expressions:["V_runner = pi integral_0^2(4-x^2/4)dx","V_runner = 2pi integral_0^2 x(2-x/2)dx"],correct:"V_runner = pi integral_0^2(4-x^2/4)dx",rules:["washer method","shell method with wrong geometry"],correct_rule:"washer method"},{expressions:["V_runner = pi[4x-x^3/12]_0^2","V_runner = pi[4x-x^2/8]_0^2"],correct:"V_runner = pi[4x-x^3/12]_0^2",rules:["power antiderivative","differentiate radius"],correct_rule:"power antiderivative"},{expressions:["V_runner = 22pi/3 m^3","V_runner = 8pi m^3"],correct:"V_runner = 22pi/3 m^3",rules:["evaluate bounds","outer cylinder only"],correct_rule:"evaluate bounds"}],answerText:"Runner passage volume is 22pi/3 = 23.038 m^3."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["R=2", "r=x/2", "0<=x<=2"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Compute the missing runner volume in the form and units requested by the prompt"
  left_side: "V_runner"
  steps:
    - id: step_1
      doing: "washer method"
      candidates:
        - {text: "V_runner = pi integral_0^2(4-x^2/4)dx", correct: true, rule: "washer method"}
        - {text: "V_runner = 2pi integral_0^2 x(2-x/2)dx", correct: false, survives: true, rule: "shell method with wrong geometry", reason: "This is the common shell method with wrong geometry mistake; it does not perform the licensed washer method step."}
    - id: step_2
      doing: "power antiderivative"
      candidates:
        - {text: "V_runner = pi[4x-x^3/12]_0^2", correct: true, rule: "power antiderivative"}
        - {text: "V_runner = pi[4x-x^2/8]_0^2", correct: false, survives: true, rule: "differentiate radius", reason: "This is the common differentiate radius mistake; it does not perform the licensed power antiderivative step."}
    - id: step_3
      doing: "evaluate bounds"
      candidates:
        - {text: "V_runner = 22pi/3 m^3", correct: true, rule: "evaluate bounds"}
        - {text: "V_runner = 8pi m^3", correct: false, survives: true, rule: "outer cylinder only", reason: "This is the common outer cylinder only mistake; it does not perform the licensed evaluate bounds step."}
```
**Correct result:** `23.038 m^3`, tolerance `.01`.

**Answer text:** Runner passage volume is 22pi/3 = 23.038 m^3.

**Why:** Runner passage volume is 22pi/3 = 23.038 m^3. Passage volume quantifies the turbine capacity the revised schedule has lost.

**Wrong-path feedback:** A washer subtracts the inner squared radius.

**State/output:** runner capacity removed; waypoint GATES.

## Stop 46 - Compare the shell setup

**Format/placement:** CHOICE, asked by Nia Chen beside `runner-crate`.

**Metadata:** Concept: 23 - shell versus washer; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: PRACTICE; Difficulty: L3; Story role: check.

**Call - exact player copy:** Talk to Nia Chen, at the runner crate in Powerhouse.

**Stop reason - exact player copy:** The passage calculation needs a second geometry check with the correct axis and integration bounds.

**Question card story setup - exact player copy:** Because washers quantify the runner, a cylindrical gate recess formed by rotating y=3-x about the y-axis for 0<=x<=3 now needs a setup. Choose shells or washers and justify the bounds.

**Question card story-science connection - exact player copy:** The shell-or-washer setup determines whether the rotated region's volume matches the physical passage being assessed.

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

**Metadata:** Concept: 15 - work/Hooke law; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: COMBINE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the work meter, in Powerhouse.

**Stop reason - exact player copy:** The alternative release route needs a hoist-work test before it can replace the runner.

**Question card story setup - exact player copy:** The seal acts like a spring with campaign test stiffness k=8000 N/m over 0.30 m, plus constant 1200 N friction. Predict total work, then operate one reversible test.

**Question card story-science connection - exact player copy:** The spring and friction work predicts the energy required for the tested gate stroke.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $W=\tfrac12kx^2+F_fx$ with $k=8,000$ N/m, $x=0.30$ m, and $F_f=1,200$ N; submit joules before the hoist unlocks. **OPERATE:** Run a 0.30 m stroke and return with head and voltage fixed. **MEASURE:** Record work and residual displacement. **INTERPRET:** Restore the start position and submit PASS or FAIL.

**Complete format-specific interaction block:** `verify:{prediction:{target:720,unit:"J",tolerance:5},equipment_locked_until_prediction_commit:true,operation:"0.30 m stroke and return",fixed:["head","voltage"],measurements:["724 J","0.002 m residual"],restore:true,correct_conclusion:"passes"}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Measure hoist work", unit: "units printed on the card"}
  predictionRange: {min: 2.5, max: 7.5, step: 0.5}
  measurement: {label: "independent measured value", truth: 5.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`.5*8000*.09+1200*.3=720 J`; pass."
```

**Correct result:** `.5*8000*.09+1200*.3=720 J`; pass.

**Answer text:** The completed check shows.5*8000*.09+1200*.3=720 J; pass.

**Why:** `.5*8000*.09+1200*.3=720 J`; pass. Integrated force determines whether the gate can repeat its planned stroke.

**Wrong-path feedback:** Work under a changing force is area, not final force times distance.

**State/output:** hoist certified; waypoint STORE.

## Stop 48 - Choose feasible schedule

**Format/placement:** VALUE, asked by Nia Chen beside `dispatch-console`.

**Metadata:** Concept: 15 - integrated capacity/work decision; Keystone: Applied integrals; Area: Catchment & Inflow Desk; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Nia Chen, at the dispatch console in Powerhouse.

**Stop reason - exact player copy:** One successful stroke does not establish a repeatable schedule with sufficient storage clearance and warning time.

**Question card story setup - exact player copy:** Runner capacity is unavailable and the hoist passes one stroke, but three candidate schedules remain. Spend 6 inspection points on evidence that can distinguish repeatable gate work, storage clearance, and downstream safety.

**Question card story-science connection - exact player copy:** The purchased inspections determine whether the alternative gate schedule is mechanically repeatable and safe downstream.

**Question card prompt - exact player copy:** Spend exactly 6 inspection points and submit the selected evidence IDs; the plan must test repeatability, corrected storage clearance, and downstream arrival.

**Complete format-specific interaction block:** `value:{budget:6,options:[{id:"repeat",label:"second hoist stroke",cost:2,required:true},{id:"storage",label:"corrected volume simulation",cost:2,required:true},{id:"arrival",label:"downstream arrival check",cost:2,required:true},{id:"paint",label:"runner paint inspection",cost:2},{id:"revenue",label:"power-price update",cost:1}],required:["repeat","storage","arrival"],answerText:"Spend 2+2+2 on repeatability, storage, and arrival."}`

**§7 authored-board source - VALUE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 48 - Choose feasible schedule"
  format: "VALUE"
  source: "Handback 3 canonical interaction block"
  question: "Spend exactly 6 inspection points and submit the selected evidence IDs; the plan must test repeatability, corrected storage clearance, and downstream arrival."
  payload: "`value:{budget:6,options:[{id:\"repeat\",label:\"second hoist stroke\",cost:2,required:true},{id:\"storage\",label:\"corrected volume simulation\",cost:2,required:true},{id:\"arrival\",label:\"downstream arrival check\",cost:2,required:true},{id:\"paint\",label:\"runner paint inspection\",cost:2},{id:\"revenue\",label:\"power-price update\",cost:1}],required:[\"repeat\",\"storage\",\"arrival\"],answerText:\"Spend 2+2+2 on repeatability, storage, and arrival.\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 4 canonical interaction block - VALUE:**

```yaml
value:
  budget: 6
  costUnit: "inspection points"
  options:
    - {id: repeat, label: "Second hoist stroke", axis: "repeatability", cost: 2}
    - {id: storage, label: "Corrected volume simulation", axis: "storage clearance", cost: 2}
    - {id: arrival, label: "Downstream arrival check", axis: "timing", cost: 2}
    - {id: paint, label: "Runner paint inspection", axis: "appearance", cost: 2}
    - {id: revenue, label: "Power-price update", axis: "revenue", cost: 1}
  keyedChoice: [repeat, storage, arrival]
```

**Correct result:** repeat/storage/arrival.

**Answer text:** Spend 2+2+2 on repeatability, storage, and arrival.

**Why:** Spend 2+2+2 on repeatability, storage, and arrival. The chosen evidence must test every binding constraint, not merely improve precision on a nonbinding one.

**Wrong-path feedback:** Paint condition and power price do not test a binding release constraint; omitting repeatability, storage, or arrival leaves the schedule uncertified.

**State/output:** feasible schedule selected.

## Mission outcome

Mission decision: Use one runner and move each gate in stages. The blocked runner no longer counts. Each gate move stays below 750 joules. The storage test still passes. Now test if measurement error can change the result.

**Segue - exact player copy:** But Mara needs the error carried into the smaller margin; a neat answer can still be too uncertain.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Nia Chen hangs a RUNNER UNAVAILABLE card over the blocked machine slot. But Mara needs the error carried into the smaller margin; a neat answer can still be too uncertain.

**Story event - exact player copy:** One turbine runner and staged gate movements complete the release within mechanical limits.

TARGET `19:00`; auto `RESERVE +7`; canonical `100/86/80/98` -> `100/86/87/98`, award 12, allocate 10 Downstream, 2 Integrity -> `100/96/87/100`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains disk?

**Options - exact player copy:**

- A. Circular cross-section with an inner hole.
- B. Thin cylindrical layer.
- C. Accumulated force through distance.
- D. Circular cross-section with no hole.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for disk. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes washer. It does not answer the question about disk.
- B: This describes shell. It does not answer the question about disk.
- C: This describes work. It does not answer the question about disk.
- D: Correct. Circular cross-section with no hole.

### Review question 2


**Prompt - exact player copy:** Which statement best explains washer?

**Options - exact player copy:**

- A. Circular cross-section with an inner hole.
- B. Circular cross-section with no hole.
- C. Thin cylindrical layer.
- D. Accumulated force through distance.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for washer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Circular cross-section with an inner hole.
- B: This describes disk. It does not answer the question about washer.
- C: This describes shell. It does not answer the question about washer.
- D: This describes work. It does not answer the question about washer.

### Review question 3


**Prompt - exact player copy:** Which statement best explains shell?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Thin cylindrical layer.
- C. Circular cross-section with an inner hole.
- D. Accumulated force through distance.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for shell. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes disk. It does not answer the question about shell.
- B: Correct. Thin cylindrical layer.
- C: This describes washer. It does not answer the question about shell.
- D: This describes work. It does not answer the question about shell.

### Review question 4


**Prompt - exact player copy:** Which statement best explains work?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Circular cross-section with an inner hole.
- C. Accumulated force through distance.
- D. Thin cylindrical layer.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for work. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes disk. It does not answer the question about work.
- B: This describes washer. It does not answer the question about work.
- C: Correct. Accumulated force through distance.
- D: This describes shell. It does not answer the question about work.

### Review question 5


**Prompt - exact player copy:** A solid is formed by rotating the region with outer radius R(x)=2 and inner radius r(x)=x/2 about the x-axis, for 0≤x≤2. Lengths are in metres. What is its volume?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Circular cross-section with an inner hole.
- C. Thin cylindrical layer.
- D. π∫₀²[4-x²/4]dx=22π/3 m³≈23.038 m³.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for disk and washer volume. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes disk. It does not answer the question about disk and washer volume.
- B: This describes washer. It does not answer the question about disk and washer volume.
- C: This describes shell. It does not answer the question about disk and washer volume.
- D: Correct. π∫₀²[4-x²/4]dx=22π/3 m³≈23.038 m³.

### Review question 6


**Prompt - exact player copy:** The region under y=3-x for 0≤x≤3 is rotated about the y-axis. Which shell integral gives its volume in cubic units?

**Options - exact player copy:**

- A. 2π∫₀³x(3-x)dx=9π.
- B. Circular cross-section with no hole.
- C. Circular cross-section with an inner hole.
- D. Thin cylindrical layer.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for shell versus washer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. 2π∫₀³x(3-x)dx=9π.
- B: This describes disk. It does not answer the question about shell versus washer.
- C: This describes washer. It does not answer the question about shell versus washer.
- D: This describes shell. It does not answer the question about shell versus washer.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 13 - The Margin That Survives

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 13 - 3 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Carry the Error Honestly  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the level desk.  
**Card body:** 3 work shifts remain before the storm. The new survey and old fit lie on separate hooks. Today you decide whether the corrected plan has enough margin.
**Objective:** Certify the model across supported measurement error.

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
  - id: headwater_m13_we01
    title: Approximate a nearby square root
    problem: Estimate sqrt(4.04) using f(x)=sqrt(x) near x=4.
    rule: L(x)=f(4)+f′(4)(x-4), and f′(x)=1/(2sqrt(x)).
    steps:
    - 'Set up the relationship: L(x)=f(4)+f′(4)(x-4), and f′(x)=1/(2sqrt(x)).'
    - L(4.04)=2+(1/4)(0.04)=2.01.
    answer: sqrt(4.04)≈2.01, a local linear approximation.
    common_mistake: An approximation is not an exact equality for the original nonlinear function.
  - id: headwater_m13_we02
    title: Propagate a small radius error
    problem: A circle has r=10 cm with small uncertainty ±0.1 cm. Estimate area uncertainty.
    rule: For A=πr², dA≈2πr dr.
    steps:
    - 'Set up the relationship: For A=πr², dA≈2πr dr.'
    - '|dA|≈2π(10)(0.1)=2π cm²; relative error≈2(0.1/10)=2%.'
    answer: The approximate area uncertainty is ±2π cm², or ±2%.
    common_mistake: This differential estimate is local, not an exact finite-error calculation.
  - id: headwater_m13_we03
    title: A measurement minus a prediction
    problem: A thermometer model predicts 20 °C; an independent thermometer reads 22 °C. Find the residual.
    rule: Residual = observed value - predicted value.
    steps:
    - residual = 22 °C - 20 °C. Keep observed first.
    - residual = +2 °C. The positive sign means the observation is above the prediction.
    answer: The model underpredicts this reading by 2 °C.
    common_mistake: Reversing the subtraction reverses the meaning of the sign.
  - id: headwater_m13_we04
    title: Separate a fitted product
    problem: A rectangle has area 24 cm². Can area alone determine its length and width?
    rule: Area = length × width. One equation may leave more than one unknown pair.
    steps:
    - 24 = 6×4 and 24 = 8×3. Both pairs have the correct area.
    - If width is independently measured as 4 cm, length = 24/4 = 6 cm.
    answer: Area alone is insufficient; the additional width measurement selects 6 cm by 4 cm.
    common_mistake: One matching output does not identify both input parameters.
  - id: headwater_m13_we05
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

Linearization: tangent-line estimate of a nearby output.

Propagated error: output uncertainty caused by input uncertainty.

Degeneracy: two parameter choices fitting the same evidence.

#### Primer concepts

- approximate `Delta f` by `f'(a)Delta x`; patterned residuals can matter more than average size; independent constraints can break a degeneracy.

#### Equations first needed today
**Equation:** `Delta f approximately f'(a)Delta x`

**What it is for:** carrying small input error into output.

**Symbols:** `Delta` means change and `f'(a)` local sensitivity.

**Why this campaign needs it:** level uncertainty becomes volume uncertainty.

## Main story happening - designer summary

Propagated error, residual pattern, and an independent constraint certify the corrected model.

## Learning and dramatic intent

Teach uncertainty as structured sensitivity rather than vague caution.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Storage & Level Board | `level-desk` | automatic**

**Trigger:** mission_13_arrival.

**World state:** The new survey and old fit lie on separate hooks.

**Panel/HUD text:** MISSION 13: LINEARIZE LEVEL ERROR OPEN

**Dialogue bubbles -** Mara Vale: "Start with linearize level error. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `level-desk` in Storage & Level Board.

**Beat 2 - After Stop 49 | `storage-board` | automatic**

**Trigger:** accepted_stop_49.

**World state:** At `level-desk`, the dated accepted-result slip for Stop 49 reads: "+-0.030 million m^3; margin survives.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. Acceptable gauge uncertainty leaves the accumulation method itself to be checked against independent totals."

**Unlocks/waypoint:** Unlock Stop 50 at `storage-board` in Storage & Level Board.

**Beat 3 - After Stop 50 | `control-bench` | automatic**

**Trigger:** accepted_stop_50.

**World state:** At `storage-board`, the dated accepted-result slip for Stop 50 reads: "trapezoid.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The accumulation check leaves offset and scale errors that can imitate each other in the level system."

**Unlocks/waypoint:** Unlock Stop 51 at `control-bench` in Storage & Level Board.

**Beat 4 - After Stop 51 | `storage-board` | automatic**

**Trigger:** accepted_stop_51.

**World state:** At `control-bench`, the dated accepted-result slip for Stop 51 reads: "(-.01 m,1.02).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Imani Okoro: "That check holds. The separated calibration errors allow the crew to reconcile the earlier findings into one release-rule set."

**Unlocks/waypoint:** Unlock Stop 52 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `level-desk` | automatic**

**Trigger:** accepted_stop_52.

**World state:** At `residual-plot`, Imani Okoro pins the independent clearance beside the corrected residual plot. The dated prop remains here on later visits.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "This time the check did not learn from our model. But Elise's test call gets no answer from two valley circuits; a sound plan still needs a heard warning."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m13

**Home:** `residual-plot`. **Before:** The dated mission-13 evidence holder at this fixture has no accepted record. The new survey and old fit lie on separate hooks.
**After — exact action:** Imani Okoro pins the independent clearance beside the corrected residual plot.
**Trigger:** accepted_stop_52. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `warning-list`, two acknowledgement boxes are empty beside a running clock.
**Segue - exact player copy:** But Elise's test call gets no answer from two valley circuits; a sound plan still needs a heard warning.

## Location plan

STORE -> STRUCT -> INFLOW; uncertainty originates in storage, independent geometry is structural, and forecast integration is at inflow.

## Characters and dramatic beat

Mara signs only after the player's independent parameter separation.

## Key concepts, explained here

linearization, propagated units, residual fields, numerical-method bias, degeneracy and physical constraints.

## Stop 49 - Linearize level error

**Format/placement:** PROPAGATE, at `level-desk`.

**Metadata:** Concept: 9 - linear approximation/error budget; Keystone: Approximation; Area: Forecast Archive; Learning role: RETRIEVE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the level desk, in Storage & Level Board.

**Stop reason - exact player copy:** The revised storage curve still carries level-measurement error that could consume the remaining release margin.

**Question card story setup - exact player copy:** The corrected storage curve has dV/dh=2.0 million m3/m, and level uncertainty is ±0.015 m. Propagate that error, then compare it with the 0.10 million m3 release margin.

**Question card story-science connection - exact player copy:** The propagated volume uncertainty determines whether the drawdown margin survives the gauge's height error.

**Question card prompt - exact player copy:** Calculate |Delta V| approximately |dV/dh||Delta h| using 2.0 million m^3/m and 0.015 m; submit uncertainty in million m^3, compare it with the inclusive 0.10 million m^3 margin, then select one purchase ID.

**Complete format-specific interaction block:** `propagate:{budget:1,error_terms:[{id:"level",sigma:.015,sensitivity:2.0,output:.030},{id:"flow",sigma:.002,sensitivity:5,output:.010},{id:"clock",sigma:.001,sensitivity:4,output:.004}],purchase_options:[{id:"level",cost:1,reduction:.015},{id:"flow",cost:1,reduction:.003},{id:"clock",cost:1,reduction:.001}],correct_purchase:"level",threshold:.10}`

**§7 authored-board source - PROPAGATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 49 - Linearize level error"
  format: "PROPAGATE"
  source: "Handback 5 canonical interaction block"
  question: "Calculate |Delta V| approximately |dV/dh||Delta h| using 2.0 million m^3/m and 0.015 m; submit uncertainty in million m^3, compare it with the inclusive 0.10 million m^3 margin, then select one purchase ID."
  payload: "`propagate:{budget:1,error_terms:[{id:\"level\",sigma:.015,sensitivity:2.0,output:.030},{id:\"flow\",sigma:.002,sensitivity:5,output:.010},{id:\"clock\",sigma:.001,sensitivity:4,output:.004}],purchase_options:[{id:\"level\",cost:1,reduction:.015},{id:\"flow\",cost:1,reduction:.003},{id:\"clock\",cost:1,reduction:.001}],correct_purchase:\"level\",threshold:.10}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROPAGATE:**

**Handback 5 canonical interaction block - PROPAGATE:**

```yaml
propagate:
  costUnit: "inspection points"
  budget: 2
  inputs:
    - {id: level, label: "Level measurement", value: 2.0, sigmaFrac: 0.015, exponent: 1, unit: "million m³/m", improvableTo: 0.0075, cost: 2}
    - {id: flow, label: "Flow calibration", value: 5.0, sigmaFrac: 0.002, exponent: 2, unit: "flow sensitivity", improvableTo: 0.0006, cost: 1}
    - {id: clock, label: "Clock timing", value: 4.0, sigmaFrac: 0.001, exponent: 1, unit: "time sensitivity", improvableTo: 0.00025, cost: 1}
  dominant: level
  improvable: [level, flow, clock]
  correctUpgrade: level
  correctResult: "`+-0.030 million m^3`; margin survives."
```

**Correct result:** `+-0.030 million m^3`; margin survives.

**Answer text:** `2.0*.015=.030<.10`; improve level.

**Why:** `2.0*.015=.030<.10`; improve level. Only an error large enough to consume the margin can reverse authorization.

**Wrong-path feedback:** Sensitivity carries units.

**State/output:** error bar; unlock 13.2.

## Stop 50 - Refuse the lowest RMS

**Format/placement:** RESIDUAL, at `storage-board`.

**Metadata:** Concept: 25 - approximation error/sum accuracy; Keystone: Approximation; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L4; Story role: clue payoff.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** Acceptable gauge uncertainty leaves the accumulation method itself to be checked against independent totals.

**Question card story setup - exact player copy:** Because level error is tolerable, compare residuals from left, right, and trapezoidal accumulation against independent totals. Choose small, unpatterned errors instead of blindly taking the lowest root-mean-square (RMS) training error, which summarizes typical error size.

**Question card story-science connection - exact player copy:** The residual patterns determine which numerical accumulation rule generalizes beyond its fitted data.

**Question card prompt - exact player copy:** Compare the three four-value residual arrays and their holdout residuals; submit one method ID and one conclusion about directional bias. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:** `residual:{fields:[{id:"left",residuals:[-.12,-.10,-.11,-.09],rms:.106},{id:"right",residuals:[.13,.09,.12,.10],rms:.111},{id:"trap",residuals:[.01,-.02,.00,.01],rms:.012}],holdout:{left:-.14,right:.15,trap:.01},correct:"trap"}`

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 50 - Refuse the lowest RMS"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare the three four-value residual arrays and their holdout residuals; submit one method ID and one conclusion about directional bias."
  payload: "`residual:{fields:[{id:\"left\",residuals:[-.12,-.10,-.11,-.09],rms:.106},{id:\"right\",residuals:[.13,.09,.12,.10],rms:.111},{id:\"trap\",residuals:[.01,-.02,.00,.01],rms:.012}],holdout:{left:-.14,right:.15,trap:.01},correct:\"trap\"}`"
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
  correctConclusion: "trapezoid."
```

**Correct result:** trapezoid.

**Answer text:** small alternating residuals survive holdout; left/right directional errors track changing curve.

**Why:** small alternating residuals survive holdout; left/right directional errors track changing curve. A repeated sign would push every release decision in the same unsafe direction.

**Wrong-path feedback:** Method accuracy depends on increase and concavity, not label.

**State/output:** trapezoid default; waypoint STRUCT.

## Stop 51 - Break the two-control degeneracy

**Format/placement:** DEGENERACY, at `control-bench`.

**Metadata:** Concept: 26 - sensitivity/systematics; Keystone: Approximation; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: reveal.

**Call - exact player copy:** Go to the control bench, in Storage & Level Board.

**Stop reason - exact player copy:** The accumulation check leaves offset and scale errors that can imitate each other in the level system.

**Question card story setup - exact player copy:** Adjust both, then add independent uplift geometry to isolate the physical pair.

**Question card story-science connection - exact player copy:** The independent uplift geometry distinguishes the physical offset-scale pair from other pairs fitting the same readings.

**Question card prompt - exact player copy:** Use the two controls level offset b in metres and unitless storage scale s. Adjust b from -0.05 to 0.05 in 0.01 steps and s from 0.90 to 1.10 in 0.01 steps; apply both loci, then submit the numeric pair (b,s) before choosing a correction plan.

**Complete format-specific interaction block:** `degeneracy:{controls:[{id:"b",label:"level offset",min:-.05,max:.05,step:.01},{id:"s",label:"storage scale",min:.90,max:1.10,step:.01}],tolerance:.011,first_locus:[[-.05,1.10],[-.03,1.06],[-.01,1.02],[.01,.98],[.03,.94],[.05,.90]],second_locus:[[-.02,.98],[-.01,1.00],[0,1.02],[.01,1.04]],physical_constraint:"independent uplift geometry requires b=-.01 m",truth_pair:[-.01,1.02],correct_plan:"use resurvey correction"}`

**Correct result:** `(-.01 m,1.02)`.

**Answer text:** volume alone is degenerate; uplift fixes offset.

**Why:** volume alone is degenerate; uplift fixes offset. A second physical constraint prevents two adjustable errors from sharing one apparent fix.

**Wrong-path feedback:** A good fit along one locus does not identify both controls.

**State/output:** Integrity lock eligible; waypoint INFLOW.

## Stop 52 - Diagnose the signed rules

**Format/placement:** DIAGNOSIS, at `storage-board`.

**Metadata:** Concept: 15 - cumulative calculus validity; Keystone: all keystones; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the storage board, in Storage & Level Board.

**Stop reason - exact player copy:** The separated calibration errors allow the crew to reconcile the earlier findings into one release-rule set.

**Question card story setup - exact player copy:** With offset and scale separated, review continuity, holdout crest, storage residuals, seepage decay, and gate reversal. Select the one release-rule set that fits every reading and preserves the downstream threshold.

**Question card story-science connection - exact player copy:** The joint diagnosis determines which signed rules fit the forecast, storage, seepage, and gate evidence together.

**Question card prompt - exact player copy:** Compare every candidate rule set with all five displayed readings, then submit exactly one rule-set label.

**Complete format-specific interaction block:** `diagnosis:{headline:"corrected release rules",readings:[{zone:"level",value:"continuous after one removable repair"},{zone:"inflow",value:"Forecast B passes holdout"},{zone:"storage",value:"resurvey pair (-.01,1.02)"},{zone:"wall",value:"decay below limit"},{zone:"gate",value:"reversal pass"}],choices:[{label:"B forecast + resurvey + staged gate",mechanism:"fits all"},{label:"A forecast + old sheet",mechanism:"misses crest and silt"},{label:"B + old sheet",mechanism:"wrong capacity"},{label:"B + resurvey + full gate",mechanism:"breaks warning/work limits"}],answer:"B forecast + resurvey + staged gate"}`

**Correct result:** first.

**Answer text:** all independent constraints align.

**Why:** all independent constraints align. The signed rules must be one coherent model, not a collection of individually convenient results.

**Wrong-path feedback:** The alternatives each conflict with at least one independent record: the holdout crest, resurveyed capacity, or verified work-and-warning limits.

**State/output:** corrected rules signed; Integrity locks at 100.

## Mission outcome

Mission decision: Sign the new release rules. Volume error stays below the safety margin. Model errors show no pattern. A separate survey breaks the last tie. Now test each valley warning line.

**Segue - exact player copy:** But Elise's test call gets no answer from two valley circuits; a sound plan still needs a heard warning.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Imani Okoro pins the independent clearance beside the corrected residual plot. But Elise's test call gets no answer from two valley circuits; a sound plan still needs a heard warning.

**Story event - exact player copy:** The chief engineer signs the corrected release rules after every uncertainty check passes.

TARGET `20:00`; auto `INTEGRITY +12` clamped and lock at 100; canonical `100/96/87/100`, award 12, allocate 4 Downstream, 8 Reserve -> `100/100/95/100`; Downstream is not locked yet.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains linearization?

**Options - exact player copy:**

- A. Output uncertainty caused by input uncertainty.
- B. Tangent-line estimate of a nearby output.
- C. Two parameter choices fitting the same evidence.
- D. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for linearization. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes propagated error. It does not answer the question about linearization.
- B: Correct. Tangent-line estimate of a nearby output.
- C: This describes degeneracy. It does not answer the question about linearization.
- D: This describes linear approximation and error budget. It does not answer the question about linearization.

### Review question 2


**Prompt - exact player copy:** Which statement best explains propagated error?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Two parameter choices fitting the same evidence.
- C. Output uncertainty caused by input uncertainty.
- D. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for propagated error. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes linearization. It does not answer the question about propagated error.
- B: This describes degeneracy. It does not answer the question about propagated error.
- C: Correct. Output uncertainty caused by input uncertainty.
- D: This describes linear approximation and error budget. It does not answer the question about propagated error.

### Review question 3


**Prompt - exact player copy:** Which statement best explains degeneracy?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Output uncertainty caused by input uncertainty.
- C. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for degeneracy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes linearization. It does not answer the question about degeneracy.
- B: This describes propagated error. It does not answer the question about degeneracy.
- C: This describes linear approximation and error budget. It does not answer the question about degeneracy.
- D: Correct. Two parameter choices fitting the same evidence.

### Review question 4


**Prompt - exact player copy:** A volume estimate has sensitivity dV/dh=2.0 million m³ per metre. Level uncertainty is 0.015 m and the allowed volume error is 0.10 million m³. Does the linearized error fit the allowance?

**Options - exact player copy:**

- A. The estimated error is 2.0×0.015=0.030 million m³, below the 0.10 allowance.
- B. Tangent-line estimate of a nearby output.
- C. Output uncertainty caused by input uncertainty.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for linear approximation and error budget. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The estimated error is 2.0×0.015=0.030 million m³, below the 0.10 allowance.
- B: This describes linearization. It does not answer the question about linear approximation and error budget.
- C: This describes propagated error. It does not answer the question about linear approximation and error budget.
- D: This describes degeneracy. It does not answer the question about linear approximation and error budget.

### Review question 5


**Prompt - exact player copy:** Two models are checked on data withheld from fitting. One has small errors of mixed signs; the other repeatedly underpredicts. Which result better supports an unbiased prediction?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. The small errors of mixed signs provide better support; repeated underprediction indicates a systematic error.
- C. Output uncertainty caused by input uncertainty.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for approximation error and sum accuracy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes linearization. It does not answer the question about approximation error and sum accuracy.
- B: Correct. The small errors of mixed signs provide better support; repeated underprediction indicates a systematic error.
- C: This describes propagated error. It does not answer the question about approximation error and sum accuracy.
- D: This describes degeneracy. It does not answer the question about approximation error and sum accuracy.

### Review question 6


**Prompt - exact player copy:** Two combinations of sensor offset and scale fit the same volume data. An independent pressure measurement differs between the combinations. Why collect it?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Output uncertainty caused by input uncertainty.
- C. Its different dependence on the parameters can distinguish combinations that the volume data cannot separate.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for sensitivity and systematics. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes linearization. It does not answer the question about sensitivity and systematics.
- B: This describes propagated error. It does not answer the question about sensitivity and systematics.
- C: Correct. Its different dependence on the parameters can distinguish combinations that the volume data cannot separate.
- D: This describes degeneracy. It does not answer the question about sensitivity and systematics.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 14 - Four Voices Back

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 14 - 2 WORK SHIFTS REMAIN BEFORE THE STORM.
**Card title:** Four Dark Sirens  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the siren repeater panel.  
**Card body:** 2 work shifts remain before the storm. Two acknowledgement boxes are empty beside a running clock. Today you decide which warning repairs must come first.
**Objective:** Repair and certify the warning chain.

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
  - id: headwater_m14_we01
    title: Optimize a rectangle
    problem: A rectangle has perimeter 20 cm. Find its maximum area.
    rule: If width=x, length=10-x, so A=x(10-x).
    steps:
    - 'Set up the relationship: If width=x, length=10-x, so A=x(10-x).'
    - A′=10-2x=0 gives x=5; A″=-2<0 and A=25 cm².
    answer: A 5 cm by 5 cm square gives the maximum area.
    common_mistake: The perimeter includes two lengths and two widths.
  - id: headwater_m14_we02
    title: Check a constrained point
    problem: Choose nonnegative x,y subject to x+y≤10 and y≥3. Is (8,3) feasible? Is (6,3)?
    rule: A feasible point must satisfy every constraint.
    steps:
    - For (8,3), x+y=11>10, so it fails despite y=3.
    - For (6,3), x+y=9≤10 and y=3≥3; both variables are nonnegative.
    answer: (6,3) is feasible; (8,3) is not.
    common_mistake: A good objective value cannot rescue a point outside the allowed region.
  - id: headwater_m14_we03
    title: Compare marginal cost and revenue
    problem: Revenue is R(q)=10q dollars and cost is C(q)=q² dollars. Find where profit stops increasing.
    rule: Profit P=R-C, so P′=R′-C′.
    steps:
    - 'Set up the relationship: Profit P=R-C, so P′=R′-C′.'
    - P′(q)=10-2q=0 gives q=5; P″=-2<0.
    answer: Profit is maximized at q=5 on q≥0.
    common_mistake: Maximize profit, not revenue alone.
  - id: headwater_m14_we04
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
  - id: headwater_m14_we05
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

Constraint: a requirement a solution must satisfy.

Objective function: the quantity optimized.

Feasible point: a choice satisfying every constraint.

#### Primer concepts

- optimization requires candidates and endpoint checks; Euler can update a forecast after a delay; thresholds must be committed before results.

#### Equations first needed today
**Equation:** `P'=R'-C'=0` at an interior optimum candidate

**What it is for:** finding a marginal balance.

**Symbols:** `P` net objective, `R` benefit, `C` cost.

**Why this campaign needs it:** repair time and warning coverage compete.

## Main story happening - designer summary

Failed sirens turn apparent victory into an optimization and delayed-forecast problem, then all circuits pass.

## Learning and dramatic intent

Require calculus to repair a human readiness constraint before final release.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Downstream Warning Desk | `arrival-map` | automatic**

**Trigger:** mission_14_arrival.

**World state:** Two acknowledgement boxes are empty beside a running clock.

**Panel/HUD text:** MISSION 14: FIND THE REPAIR OPTIMUM OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with find the repair optimum. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 53 | `settlement-circuits` | automatic**

**Trigger:** accepted_stop_53.

**World state:** At `arrival-map`, the dated accepted-result slip for Stop 53 reads: "x=6 at endpoint; P(6)=52, versus P(0)=-8.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The crew allocation is fixed, leaving downstream repair order to be chosen by consequence."

**Unlocks/waypoint:** Unlock Stop 54 at `settlement-circuits` in Downstream Warning Desk.

**Beat 3 - After Stop 54 | `arrival-map` | automatic**

**Trigger:** accepted_stop_54.

**World state:** At `settlement-circuits`, the dated accepted-result slip for Stop 54 reads: "Road and School.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The repairs delay release, so the reservoir forecast must be advanced to the new starting time."

**Unlocks/waypoint:** Unlock Stop 55 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 55 | `radio-desk` | automatic**

**Trigger:** accepted_stop_55.

**World state:** At `arrival-map`, the dated accepted-result slip for Stop 55 reads: "4.36 m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Elise Baptiste: "That check holds. The repair schedule and delayed release time are ready for a warning-readiness commitment."

**Unlocks/waypoint:** Unlock Stop 56 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**Trigger:** accepted_stop_56.

**World state:** At `warning-list`, Elise Baptiste ticks the fourth warning acknowledgement box. The dated prop remains here on later visits.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "Four voices back. We can finally act on the plan. Therefore Nia must save power for the last gate move; only 15 minutes remain before the warning deadline."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m14

**Home:** `warning-list`. **Before:** The dated mission-14 evidence holder at this fixture has no accepted record. Two acknowledgement boxes are empty beside a running clock.
**After — exact action:** Elise Baptiste ticks the fourth warning acknowledgement box.
**Trigger:** accepted_stop_56. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `trigger-board`, the gate order lies beside four acknowledged warning slips.
**Segue - exact player copy:** Therefore Nia must save power for the last gate move; only 15 minutes remain before the warning deadline.

## Location plan

SAFE -> INFLOW -> GATES; warning failure creates forecast delay, which changes gate start.

## Characters and dramatic beat

Baptiste blocks release until the last circuit, while the other specialists accept the delay.

## Key concepts, explained here

constrained extrema and endpoints, deadline sorting, Euler step sensitivity, precommitted threshold.

## Stop 53 - Find the repair optimum

**Format/placement:** BALLPARK, at `arrival-map`.

**Metadata:** Concept: 11 - optimization/marginal value; Keystone: Extrema; Area: Powerhouse; Learning role: RETRIEVE; Difficulty: L4; Story role: foundation.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The final release plan needs repairs, but the available crew count limits the feasible benefit.

**Question card story setup - exact player copy:** Repair benefit is R(x)=18x-x^2 and coordination cost is C(x)=2x+8, where x crews can range from 0 to 6. Find the integer crew count maximizing P=R-C.

**Question card story-science connection - exact player copy:** Net repair benefit over the allowed crew interval determines the best achievable staffing level, including endpoints.

**Question card prompt - exact player copy:** Using P(x)=(18x-x^2)-(2x+8) for integer 0<=x<=6, calculate P'(x), check feasible critical points and endpoints, then submit one integer crew count.

**Complete format-specific interaction block:** `estimate:{labels:["solve P'=16-2x=0","check endpoints/integers"],values:[[8],[0,6]],slots:2,template:"feasible candidate",formula:"x=8 clipped then compare 0,6",correct:[8,6],target:6,tolerance:0}`

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 6.0
  tolerance: 0.30000000000000004
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 12.0}, {label: "displayed divisor", value: 2}]
  formula: "x_best=displayed numerator/displayed divisor"
  correctResultText: "`x=6` at endpoint; `P(6)=52`, versus `P(0)=-8`."
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "feasible crew count that maximizes net repair benefit"
  unit: "crews"
  inputs:
    - {label: "Benefit linear coefficient", value: 18, unit: "benefit/crew"}
    - {label: "Cost linear coefficient", value: 2, unit: "benefit/crew"}
    - {label: "Benefit quadratic coefficient magnitude", value: 1, unit: "benefit/crew²"}
    - {label: "Maximum available crews", value: 6, unit: "crews"}
    - {label: "Minimum available crews", value: 0, unit: "crews", contextOnly: true}
  operation: "find the unconstrained vertex, then enforce the feasible upper endpoint"
  formula: "x_best=min((18-2)/(2×1),6)"
  correctResult: 6
  tolerance: 0.1
  answerText: "The unconstrained critical point is 8 crews, outside the allowed interval, so the feasible maximum occurs at 6 crews."
```

**Correct result:** `x=6` at endpoint; `P(6)=52`, versus `P(0)=-8`.

**Answer text:** unconstrained critical point 8 lies outside `[0,6]`, so endpoints control.

**Why:** unconstrained critical point 8 lies outside `[0,6]`, so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Wrong-path feedback:** A critical point outside the domain is not feasible.

**State/output:** six crews assigned; unlock 14.2.

## Stop 54 - Order settlements by consequence

**Format/placement:** TRIAGE, asked by Elise Baptiste beside `settlement-circuits`.

**Metadata:** Concept: 13 - constrained decision/extrema; Keystone: Extrema; Area: Forecast Archive; Learning role: COMBINE; Difficulty: L5; Story role: consequence.

**Call - exact player copy:** Talk to Elise Baptiste, at the settlement circuits in Downstream Warning Desk.

**Stop reason - exact player copy:** The crew allocation is fixed, leaving downstream repair order to be chosen by consequence.

**Question card story setup - exact player copy:** With six crews fixed, sort four dark circuits by arrival and closure: Road 280 min, School 310, Caravan 350, Village 410. Repairs take 35,25,20,30 min, with two simultaneous teams.

**Question card story-science connection - exact player copy:** Arrival and closure deadlines determine which dark warning circuits must be restored first.

**Question card prompt - exact player copy:** Select exactly one of four first-team pairs and submit its label.

**Complete format-specific interaction block:** `question:"Which two circuits receive the first teams?"; choices:["Road and School","Caravan and Village","Road and Village","School and Caravan"]; answer:"Road and School"; why:"Road and School have the two earliest binding deadlines."; rebuttals:{"Caravan and Village":"This leaves both earliest deadlines, 280 and 310 minutes, without first teams.","Road and Village":"The School deadline at 310 minutes binds before the Village deadline at 410 minutes.","School and Caravan":"The Road deadline at 280 minutes is the earliest and cannot wait."}`

**Correct result:** Road and School.

**Answer text:** The completed check shows road and School.

**Why:** Road and School. Earliest binding deadlines determine a safe schedule.

**Wrong-path feedback:** Any pair omitting Road or School delays one of the two earliest binding deadlines; the option-specific payload rebuttals identify the missed deadline.

**State/output:** repair route; waypoint INFLOW.

## Stop 55 - Update the delayed forecast

**Format/placement:** CONTROL, at `arrival-map`.

**Metadata:** Concept: 20 - Euler/logistic delay; Keystone: Differential equations; Area: Seepage & Uplift Bay; Learning role: RETRIEVE; Difficulty: L4; Story role: setback.

**Call - exact player copy:** Go to the arrival map, in Downstream Warning Desk.

**Stop reason - exact player copy:** The repairs delay release, so the reservoir forecast must be advanced to the new starting time.

**Question card story setup - exact player copy:** Repairs delay release by 1.0 h, so update dH/dt=0.20(5-H) from H(0)=4.20 m. Compare Euler steps of 1.0 and 0.5 h, restoring the first setting before the safe decision.

**Question card story-science connection - exact player copy:** The updated height estimate determines the reservoir state from which the delayed release plan must begin.

**Question card prompt - exact player copy:** Choose Euler step size from candidate controls step size, initial level, and rate constant. Measure the delayed forecast with 1.0 h steps, change only the step to 0.5 h while $H(0)=4.20$ m and $dH/dt=0.20(5-H)$ remain fixed, remeasure at the same final time, restore 1.0 h and measure again, then submit the conservative level in metres and conclusion.

**Complete format-specific interaction block:** `control:{candidates:[{id:"step"},{id:"initial"},{id:"k"}],correct_control:"step",baseline:1,response:.5,noise_band:.005,measurements:[4.36,4.352,4.36],restore:true,correct_conclusion:"use conservative 4.36 m"}`

**§7 authored-board source - CONTROL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 55 - Update the delayed forecast"
  format: "CONTROL"
  source: "Handback 5 canonical interaction block"
  question: "Choose Euler step size from candidate controls step size, initial level, and rate constant. Measure the delayed forecast with 1.0 h steps, change only the step to 0.5 h while $H(0)=4.20$ m and $dH/dt=0.20(5-H)$ remain fixed, remeasure at the same final time, restore 1.0 h and measure again, then submit the conservative level in metres and conclusion."
  payload: "`control:{candidates:[{id:\"step\"},{id:\"initial\"},{id:\"k\"}],correct_control:\"step\",baseline:1,response:.5,noise_band:.005,measurements:[4.36,4.352,4.36],restore:true,correct_conclusion:\"use conservative 4.36 m\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CONTROL:**

**Handback 5 canonical interaction block - CONTROL:**

```yaml
control:
  candidates:
    - {id: step, label: "Euler step size", baseline: 1.0, treatment: 0.5, unit: "h"}
    - {id: initial, label: "Initial level", baseline: 4.20, treatment: 4.30, unit: "m"}
    - {id: rate_constant, label: "Rate constant", baseline: 0.20, treatment: 0.25, unit: "1/h"}
  truth: step
  responseLabel: "magnitude of forecast correction"
  baseline: {setting: 1.0, response: 0, reading: 4.36, noise: 0.002}
  treatment: {setting: 0.5, response: 0.008, reading: 4.352}
  fixed: ["H(0)=4.20 m", "dH/dt=0.20(5-H)", "final forecast time"]
  measureWhen: "at the same final forecast time"
  restore: {required: true, setting: 1.0, response: 0, reading: 4.36, remeasure: true}
  correctConclusion: "`4.36 m`."
```

**Correct result:** `4.36 m`.

**Answer text:** The completed check shows 4.36 m.

**Why:** `4.36 m`. The delayed start must use a numerical forecast consistent with the same differential model.

**Wrong-path feedback:** Update slope after the first half-step.

**State/output:** revised gate start; waypoint GATES.

## Stop 56 - Commit repaired warning trigger

**Format/placement:** TRIGGER, at `radio-desk`.

**Metadata:** Concept: 11 - optimization/threshold synthesis; Keystone: all; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radio desk, in Downstream Warning Desk.

**Stop reason - exact player copy:** The repair schedule and delayed release time are ready for a warning-readiness commitment.

**Question card story setup - exact player copy:** Repairs finish in 65 min, the minimum warning lead is 280 min, and release begins no sooner than 360 min from now. Commit the inclusive readiness slack before circuit results appear.

**Question card story-science connection - exact player copy:** Readiness slack determines whether repaired circuits can still provide the minimum warning lead before release.

**Question card prompt - exact player copy:** Calculate and submit slack 360-280-65 in minutes; commit READY if slack >=0 and all four circuits pass, then reveal circuit results.

**Complete format-specific interaction block:** `trigger:{decision_rule:"READY iff slack>=0 and 4/4 circuits pass",scale:{min:-30,max:60,step:5,unit:"min"},anchors:[0,15,45],objective:"complete warning before required lead",direction:"at or above zero",consequence_limit:"no release with any dark circuit"}`; reveal `4/4 pass`.

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 56 - Commit repaired warning trigger"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Calculate and submit slack 360-280-65 in minutes; commit READY if slack >=0 and all four circuits pass, then reveal circuit results."
  payload: "`trigger:{decision_rule:\"READY iff slack>=0 and 4/4 circuits pass\",scale:{min:-30,max:60,step:5,unit:\"min\"},anchors:[0,15,45],objective:\"complete warning before required lead\",direction:\"at or above zero\",consequence_limit:\"no release with any dark circuit\"}`; reveal `4/4 pass`."
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "warning-system slack", min: -30, max: 60, step: 5, unit: "min"}
  start: -12
  anchors:
    - {at: -12, means: "routine baseline, not the decision threshold"}
    - {at: 28.5, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: -10, hoursLeft: 48}
    - {at: "T-24 h", value: 0, hoursLeft: 24}
    - {at: "T-12 h", value: 15, hoursLeft: 12}
    - {at: "T-6 h", value: 30, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: -30, max: 14}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 15, max: 60}, leadHours: 12}
  question: "Calculate and submit slack 360-280-65 in minutes; commit READY if slack >=0 and all four circuits pass, then reveal circuit results."
```

**Correct result:** `15 min`; READY.

**Answer text:** `360-280-65=15>=0`, and every circuit passes.

**Why:** `360-280-65=15>=0`, and every circuit passes. Positive precommitted slack proves warnings finish before the last safe release time.

**Wrong-path feedback:** A negative slack or any dark circuit fails the committed rule; do not move the threshold after the four circuit results appear.

**State/output:** siren text `4/4 READY`; Downstream locks.

## Mission outcome

Mission decision: Every reach below the dam is ready. The repair order restores all four lines. It leaves 15 minutes before the warning deadline. The final release must still save enough power for the last gate move.

**Segue - exact player copy:** Therefore Nia must save power for the last gate move; only 15 minutes remain before the warning deadline.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Elise Baptiste ticks the fourth warning acknowledgement box. Therefore Nia must save power for the last gate move; only 15 minutes remain before the warning deadline.

**Story event - exact player copy:** Repair crews restore all four settlement warning circuits before the release begins.

TARGET `18:00`; auto `DOWNSTREAM +10` then visible failure `-8`, repair returns `+8` and locks at 100; canonical `100/100/95/100`, net clamped `100/100/95/100`, award 12, allocate 5 Reserve and bank 7 -> `100/100/100/100`, bank 7.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains constraint?

**Options - exact player copy:**

- A. The quantity optimized.
- B. A choice satisfying every constraint.
- C. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.
- D. A requirement a solution must satisfy.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for constraint. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes objective function. It does not answer the question about constraint.
- B: This describes feasible point. It does not answer the question about constraint.
- C: This describes optimization and marginal value. It does not answer the question about constraint.
- D: Correct. A requirement a solution must satisfy.

### Review question 2


**Prompt - exact player copy:** Which statement best explains objective function?

**Options - exact player copy:**

- A. The quantity optimized.
- B. A requirement a solution must satisfy.
- C. A choice satisfying every constraint.
- D. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for objective function. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The quantity optimized.
- B: This describes constraint. It does not answer the question about objective function.
- C: This describes feasible point. It does not answer the question about objective function.
- D: This describes optimization and marginal value. It does not answer the question about objective function.

### Review question 3


**Prompt - exact player copy:** Which statement best explains feasible point?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. A choice satisfying every constraint.
- C. The quantity optimized.
- D. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for feasible point. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes constraint. It does not answer the question about feasible point.
- B: Correct. A choice satisfying every constraint.
- C: This describes objective function. It does not answer the question about feasible point.
- D: This describes optimization and marginal value. It does not answer the question about feasible point.

### Review question 4


**Prompt - exact player copy:** A concave objective has derivative F′(x)=16-2x and feasible interval 0≤x≤6. Where is its maximum on the feasible interval?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. The quantity optimized.
- C. At x=6: F′ stays positive on the feasible interval, and the unconstrained critical point x=8 is not allowed.
- D. A choice satisfying every constraint.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for optimization and marginal value. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes constraint. It does not answer the question about optimization and marginal value.
- B: This describes objective function. It does not answer the question about optimization and marginal value.
- C: Correct. At x=6: F′ stays positive on the feasible interval, and the unconstrained critical point x=8 is not allowed.
- D: This describes feasible point. It does not answer the question about optimization and marginal value.

### Review question 5


**Prompt - exact player copy:** Two crews must repair three independent warning circuits. Road takes 2 h and is due in 2 h; School takes 3 h and is due in 3 h; Farm takes 1 h and is due in 5 h. What should start first?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. The quantity optimized.
- C. A choice satisfying every constraint.
- D. Start Road and School together, then use the first available crew for Farm.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for constrained decision and extrema. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes constraint. It does not answer the question about constrained decision and extrema.
- B: This describes objective function. It does not answer the question about constrained decision and extrema.
- C: This describes feasible point. It does not answer the question about constrained decision and extrema.
- D: Correct. Start Road and School together, then use the first available crew for Farm.

### Review question 6


**Prompt - exact player copy:** A level model has H(0)=4.00 m and dH/dt=0.1H(1-H/10) m/h. Use one Euler step of 1.5 h. What level is predicted?

**Options - exact player copy:**

- A. H(1.5)≈4.00+1.5×0.1×4.00×(1-4.00/10)=4.36 m.
- B. A requirement a solution must satisfy.
- C. The quantity optimized.
- D. A choice satisfying every constraint.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for euler and logistic delay. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. H(1.5)≈4.00+1.5×0.1×4.00×(1-4.00/10)=4.36 m.
- B: This describes constraint. It does not answer the question about euler and logistic delay.
- C: This describes objective function. It does not answer the question about euler and logistic delay.
- D: This describes feasible point. It does not answer the question about euler and logistic delay.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 15 - The Corrected Release Rules, Signed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** MISSION 15 - 1 WORK SHIFT REMAINS BEFORE THE STORM.
**Card title:** Open, Hold, Verify  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** 1 work shift remains before the storm. The gate order lies beside four acknowledged warning slips. Today you decide whether to carry out the final staged release.
**Objective:** Commit, execute, and verify the safe release.

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
  - id: headwater_m15_we01
    title: Match average and instantaneous slopes
    problem: For f(x)=x² on [1,3], find the point guaranteed by the Mean Value Theorem.
    rule: For a continuous function differentiable inside the interval, f′(c)=[f(b)-f(a)]/(b-a).
    steps:
    - 'Set up the relationship: For a continuous function differentiable inside the interval, f′(c)=[f(b)-f(a)]/(b-a).'
    - average slope=(9-1)/(3-1)=4; f′(c)=2c=4 gives c=2.
    answer: The guaranteed matching slope occurs at c=2.
    common_mistake: The theorem equates a derivative with average slope, not with an average function value.
  - id: headwater_m15_we02
    title: Evaluate a definite integral
    problem: Find A=integral from 0 to 2 of 3x² dx.
    rule: A=F(2)-F(0), where F′(x)=3x².
    steps:
    - 'Set up the relationship: A=F(2)-F(0), where F′(x)=3x².'
    - F(x)=x³, so A=2³-0³=8.
    answer: The signed accumulation is 8.
    common_mistake: Evaluate upper bound minus lower bound.
  - id: headwater_m15_we03
    title: Take two Euler steps
    problem: Use y′=y, y(0)=1, and step h=0.5 to estimate y(1).
    rule: y_next=y_current+h×slope_current.
    steps:
    - 'Set up the relationship: y_next=y_current+h×slope_current.'
    - y1=1+0.5(1)=1.5; y2=1.5+0.5(1.5)=2.25.
    answer: Euler's estimate is y(1)≈2.25.
    common_mistake: Recalculate the slope at the new estimated point.
  - id: headwater_m15_we04
    title: Integrate a changing force
    problem: A force F(x)=2x newtons acts along displacement x from 0 to 3 metres. Find its work.
    rule: Work W=integral F(x)dx along the displacement.
    steps:
    - 'Set up the relationship: Work W=integral F(x)dx along the displacement.'
    - W=integral_0^3 2x dx=[x²]_0^3=9 J.
    answer: The force does 9 joules of work.
    common_mistake: Final force times total distance would overestimate this increasing force.
  - id: headwater_m15_we05
    title: Propagate a small radius error
    problem: A circle has r=10 cm with small uncertainty ±0.1 cm. Estimate area uncertainty.
    rule: For A=πr², dA≈2πr dr.
    steps:
    - 'Set up the relationship: For A=πr², dA≈2πr dr.'
    - '|dA|≈2π(10)(0.1)=2π cm²; relative error≈2(0.1/10)=2%.'
    answer: The approximate area uncertainty is ±2π cm², or ±2%.
    common_mistake: This differential estimate is local, not an exact finite-error calculation.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy
#### Glossary terms

No new terms; use the signed mission log.

#### Primer concepts

- justify each theorem; keep units through every line; use independent measurements after committing predictions.

#### Equations first needed today
No new equation is introduced; retrieve the limit, derivative, integral, Euler, related-rate, and work relationships already recorded.
**Crew on this mission - mission log:** Imani Okoro - catchment hydrologist; Mara Vale - operations chief; Tomas Wilkes - gate mechanic; Elise Baptiste - downstream safety lead; Arun Mehta - structural engineer; Nia Chen - power dispatcher.

**Authoring-only failure consequence:** Skipping any link in the final evidence chain can turn a locally correct calculation into an unsafe release.

## Main story happening - designer summary

The player rebuilds the proof, closes water, executes the staged gate, and reads all independent limits.

## Learning and dramatic intent

Use the full course in transfer; introduce nothing and end with consequence, not another quiz.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Catchment & Inflow Desk | `gauge-wall` | automatic**

**Trigger:** mission_15_arrival.

**World state:** The gate order lies beside four acknowledged warning slips.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with rebuild the release bound. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 57 | `water-ledger` | automatic**

**Trigger:** accepted_stop_57.

**World state:** At `gauge-wall`, the dated accepted-result slip for Stop 57 reads: ".18 m/h, passes.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The updated forecast and verified releases are ready to be combined into the final storage balance."

**Unlocks/waypoint:** Unlock Stop 58 at `water-ledger` in Catchment & Inflow Desk.

**Beat 3 - After Stop 58 | `staging-console` | automatic**

**Trigger:** accepted_stop_58.

**World state:** At `water-ledger`, the dated accepted-result slip for Stop 58 reads: "14+3.6+1.68-17.28-2=0; exact.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The water ledger closes on paper, but the staged gate response must agree during operation."

**Unlocks/waypoint:** Unlock Stop 59 at `staging-console` in Catchment & Inflow Desk.

**Beat 4 - After Stop 59 | `staging-console` | automatic**

**Trigger:** accepted_stop_59.

**World state:** At `staging-console`, the dated accepted-result slip for Stop 59 reads: "Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Mara Vale: "That check holds. The final gate stage and independent dam readings are available for the completion decision."

**Unlocks/waypoint:** Unlock Stop 60 at `staging-console` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**Trigger:** accepted_stop_60.

**World state:** At `trigger-board`, Mara Vale unlatches the crest access gate. The final scene follows the completion gate below.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "You gave every stage a reason to stop. Now we can let it run. Therefore Elise keeps the warning watch as the level falls; the storm still has to pass through the valley."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

### Physical aftermath — headwater-m15

**Home:** `trigger-board`. **Before:** The dated mission-15 evidence holder at this fixture has no accepted record. The gate order lies beside four acknowledged warning slips.
**After — exact action:** Mara Vale unlatches the crest access gate.
**Trigger:** accepted_stop_60; final scene requires the completion gate in section 8.1. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `trigger-board`, the signed operating conditions remain beside the final status.
**Segue - exact player copy:** Therefore Elise keeps the warning watch as the level falls; the storm still has to pass through the valley.

## Location plan

INFLOW -> STORE -> GATES; forecast causes ledger, and zero ledger causes physical authorization.

## Characters and dramatic beat

Each specialist contributes one constraint; the player alone integrates them; Mara signs the player's rule.

## Key concepts, explained here

MVT hypotheses, derivative bounds, signed balance, chain linearization, related rates, work, diagnosis, and contextual justification.

## Stop 57 - Rebuild the release bound

**Format/placement:** DERIVE, at `gauge-wall`.

**Metadata:** Concept: 19 - limits/MVT/derivative synthesis; Keystone: Limits+rates+extrema; Area: Storage & Level Board; Learning role: TRANSFER; Difficulty: L5; Story role: foundation.

**Call - exact player copy:** Go to the gauge wall, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The delayed plan needs a final consistency check between average and allowed instantaneous rise rates.

**Question card story setup - exact player copy:** Forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. Derive the average slope and test whether 0.15<=H'(t)<=0.21 m/h is consistent with MVT.

**Question card story-science connection - exact player copy:** The Mean Value Theorem tests whether the endpoint height change is compatible with the proposed derivative bounds.

**Fixture source panel - exact player copy:** Forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. Derive the average slope and test whether 0.15<=H'(t)<=0.21 m/h is consistent with MVT.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit whether the derivative bound is consistent with the observed endpoint change.

**Complete format-specific interaction block:** `derive:{left_side:"bound",goal:"MVT consistency",givens:["H continuous [0,2]","differentiable (0,2)","H0=4.36,H2=4.72",".15<=H'<=.21"],lines:[{expressions:["secant slope=(4.72-4.36)/(2-0)=.18 m/h","(4.72-4.36)/(2-0)=.36 m/h"],correct:"secant slope=(4.72-4.36)/(2-0)=.18 m/h",rules:["secant slope","endpoint difference only"],correct_rule:"secant slope"},{expressions:["exists c with H'(c)=.18","exists c with H(c)=.18"],correct:"exists c with H'(c)=.18",rules:["Mean Value Theorem","Intermediate Value Theorem"],correct_rule:"Mean Value Theorem"},{expressions:["bound = passes because .18 lies in [.15,.21]","bound = fails because .18 lies outside [.15,.21]"],correct:"bound = passes because .18 lies in [.15,.21]",rules:["compare bound","assume endpoint"],correct_rule:"compare bound"}],answerText:"The forecast passes MVT consistency."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Rebuild the release bound in the form and units requested by the prompt"
  left_side: "bound"
  steps:
    - id: step_1
      doing: "secant slope"
      candidates:
        - {text: "secant slope=(4.72-4.36)/(2-0)=.18 m/h", correct: true, rule: "secant slope"}
        - {text: "(4.72-4.36)/(2-0)=.36 m/h", correct: false, survives: true, rule: "endpoint difference only", reason: "This is the common endpoint difference only mistake; it does not perform the licensed secant slope step."}
    - id: step_2
      doing: "Mean Value Theorem"
      candidates:
        - {text: "exists c with H'(c)=.18", correct: true, rule: "Mean Value Theorem"}
        - {text: "exists c with H(c)=.18", correct: false, survives: true, rule: "Intermediate Value Theorem", reason: "This is the common Intermediate Value Theorem mistake; it does not perform the licensed Mean Value Theorem step."}
    - id: step_3
      doing: "compare bound"
      candidates:
        - {text: "bound = passes because .18 lies in [.15,.21]", correct: true, rule: "compare bound"}
        - {text: "bound = fails because .18 lies outside [.15,.21]", correct: false, survives: true, rule: "assume endpoint", reason: "This is the common assume endpoint mistake; it does not perform the licensed compare bound step."}
```
**Correct result:** `.18 m/h`, passes.

**Answer text:** The forecast passes MVT consistency.

**Why:** The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.

**Wrong-path feedback:** MVT matches a derivative to the average rate; IVT matches a function value.

**State/output:** forecast lock; waypoint STORE.

## Stop 58 - Close the final water ledger

**Format/placement:** BALLPARK, at `water-ledger`.

**Metadata:** Concept: 15 - accumulated change/area/average; Keystone: FTC+motion; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: synthesis.

**Call - exact player copy:** Go to the water ledger, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The updated forecast and verified releases are ready to be combined into the final storage balance.

**Question card story setup - exact player copy:** With the forecast certified, count 14.00 million m^3 starting room, 17.28 storm inflow, 2.00 safety reserve, 3.60 turbine release, and 1.68 gate release. Close the signed ledger.

**Question card story-science connection - exact player copy:** The signed water ledger determines whether planned drawdown covers storm inflow and the protected safety margin.

**Question card prompt - exact player copy:** Select which displayed entries are physical water streams, assign each its shown sign, and submit one signed ledger total in million m^3; exclude power price.

**Complete format-specific interaction block:** `balance:{streams:[{id:"room",value:14,sign:1,count:true},{id:"turbine",value:3.6,sign:1,count:true},{id:"gate",value:1.68,sign:1,count:true},{id:"storm",value:17.28,sign:-1,count:true},{id:"reserve",value:2,sign:-1,count:true},{id:"power_price",value:.4,sign:1,count:false}],required_total:0,unit:"million m^3"}`

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 58 - Close the final water ledger"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Select which displayed entries are physical water streams, assign each its shown sign, and submit one signed ledger total in million m^3; exclude power price."
  payload: "`balance:{streams:[{id:\"room\",value:14,sign:1,count:true},{id:\"turbine\",value:3.6,sign:1,count:true},{id:\"gate\",value:1.68,sign:1,count:true},{id:\"storm\",value:17.28,sign:-1,count:true},{id:\"reserve\",value:2,sign:-1,count:true},{id:\"power_price\",value:.4,sign:1,count:false}],required_total:0,unit:\"million m^3\"}`"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "signed final water-ledger total"
  unit: "million m³"
  inputs:
    - {label: "Storage room", value: 14, sign: 1, unit: "million m³"}
    - {label: "Turbine recovery", value: 3.6, sign: 1, unit: "million m³"}
    - {label: "Gate recovery", value: 1.68, sign: 1, unit: "million m³"}
    - {label: "Storm release", value: 17.28, sign: -1, unit: "million m³"}
    - {label: "Required reserve", value: 2, sign: -1, unit: "million m³"}
  operation: "add signed physical water streams"
  formula: "water balance=14+3.6+1.68-17.28-2"
  start: 1
  correctResult: 0
  tolerance: 0.01
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** `14+3.6+1.68-17.28-2=0`; exact.

**Answer text:** the plan just clears required storage; power price is not water.

**Why:** the plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.

**Wrong-path feedback:** Count physical streams once and keep their signs.

**State/output:** gate authorization token; waypoint GATES.

## Stop 59 - Predict and operate the staged release

**Format/placement:** VERIFY, at `staging-console`.

**Metadata:** Concept: 8 - chain/related rates/Euler/work integration; Keystone: all quantitative keystones; Area: Powerhouse; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the staging console, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The water ledger closes on paper, but the staged gate response must agree during operation.

**Question card story setup - exact player copy:** The ledger closes, so the gate must follow the staged rule without overshoot. At h=4.0 m, use Q=40e^(0.3sqrt h) and its derivative to predict the response to a 0.10 m head change.

**Question card story-science connection - exact player copy:** The measured discharge change tests whether the live gate follows the head-sensitive response credited to the release plan.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** With $h=4.0$ m and $Q=40e^{0.3\sqrt h}$, submit $Q$ in m^3/s and the predicted $\Delta Q$ for $\Delta h=0.10$ m in m^3/s; controls remain locked until the numerical pair is committed. **OPERATE:** Run Stage 1, hold 20 minutes, then run Stage 2 with warning readiness, turbine schedule, and sensor calibration fixed. **MEASURE:** Record both flows, hoist work, arrival time, and uplift. **INTERPRET:** Submit CONTINUE or STOP against 750 J, 280 min, and 8-pressure-unit limits; restore only after a failed run.

**Complete format-specific interaction block:** `verify:{prediction:{targets:[72.885,0.547],units:["m^3/s","m^3/s"],tolerances:[.02,.02]},equipment_locked_until_prediction_commit:true,operation:"Stage1-hold20-Stage2",fixed:["warning ready","turbine schedule","sensor calibration"],measurements:["Q=72.90 then 73.43 m^3/s","work=724 J","arrival=294 min","uplift=5.7"],restore:"only on failure",limits:["W<=750 J","arrival>=280 min","uplift<=8 pressure units"],correct_conclusion:"continue"}`

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Predict and operate the staged release", unit: "units printed on the card"}
  predictionRange: {min: 20.0, max: 60.0, step: 4.0}
  measurement: {label: "independent measured value", truth: 40.0}
  passRatio: [0.95, 1.05]
  correctResultText: "`Q=40e^.6=72.885`; `Delta Q=(6e^.6/2)*.1=0.547`; continue."
```

**Correct result:** `Q=40e^.6=72.885`; `Delta Q=(6e^.6/2)*.1=0.547`; continue.

**Answer text:** The completed check shows q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue.

**Why:** `Q=40e^.6=72.885`; `Delta Q=(6e^.6/2)*.1=0.547`; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Wrong-path feedback:** Local change uses derivative times `Delta h`, not a second full function value unless asked.

**State/output:** gates open in two stages; unlock 15.4.

## Stop 60 - Diagnose the final run

**Format/placement:** DIAGNOSIS, at `staging-console`.

**Metadata:** Concept: 25 - whole-course model selection; Keystone: all keystones; Area: Forecast Archive; Learning role: TRANSFER; Difficulty: L5; Story role: final decision.

**Call - exact player copy:** Go to the staging console, in Catchment & Inflow Desk.

**Stop reason - exact player copy:** The final gate stage and independent dam readings are available for the completion decision.

**Question card story setup - exact player copy:** Stage 2 matches predicted discharge; storage falls on the resurvey curve, uplift remains below 8, and all warnings arrive early. Choose the one diagnosis supported by every independent reading.

**Question card story-science connection - exact player copy:** The combined storage, uplift, discharge, and warning evidence determines whether the staged release can be completed safely.

**Question card prompt - exact player copy:** Compare all five displayed readings with their inclusive limits, then submit exactly one final diagnosis label.

**Complete format-specific interaction block:** `diagnosis:{headline:"final release",readings:[{zone:"discharge",value:"prediction +0.02"},{zone:"storage",value:"resurvey residual +0.01"},{zone:"uplift",value:"5.7 < 8"},{zone:"warning",value:"294 >= 280 min"},{zone:"work",value:"724 <= 750 J"}],choices:[{label:"complete staged release",mechanism:"all independent limits pass"},{label:"abort for wall danger",mechanism:"contradicted by uplift"},{label:"return to old curve",mechanism:"contradicted by resurvey"},{label:"open fully",mechanism:"unverified work and arrival"}],answer:"complete staged release"}`

**Correct result:** complete staged release.

**Answer text:** each active limit and quiet control passes; do not broaden opening beyond the tested plan.

**Why:** each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.

**Wrong-path feedback:** Wall danger conflicts with uplift, the old curve conflicts with resurvey, and full opening exceeds what work and arrival tests actually verified.

**State/output:** release completes; spillway visible through glass; no more graded questions.

## Mission outcome and epilogue - no further quiz

Mission decision: Whether to carry out the final staged release. Apply the existing final evidence and metric gates before the world payoff below.

From the crest, the spillway runs white below the gates. The lake line falls along the checked curve. Four warning lamps stay green above the valley map. The town still has its roads, and the dam has room for the rain.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** From the crest, the spillway runs white below the gates. The lake line falls along the checked curve. Four warning lamps stay green above the valley map. The town still has its roads, and the dam has room for the rain.

**Header:** CAMPAIGN COMPLETE - ASHFELL RELEASE RULES SIGNED  
**Timer:** TIME `{elapsed}` / TARGET `22:00`  
**Accuracy:** INCORRECT SUBMISSIONS `{incorrect_submissions}`  
**Story event:** The corrected staged release creates the required storm room.  
**Automatic:** any saved RP may fill remaining unlocked bars; victory requires `100/100/100/100`, signed forecast, storage ledger `0.00`, and all four final limits passed.  
**RP line:** standard formula.  
**Canonical QA:** enter `100/100/100/100`, bank 7; award 12; bars remain locked/full and bank remains capped as configured.  
**Failure:** a failed final limit triggers the specified gate restoration and Day-start snapshot, not campaign data loss.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** H is continuous on [0,2] and differentiable on (0,2), with H(0)=4.36 m and H(2)=4.72 m. Is the bound 0.15≤H′(t)≤0.21 m/h consistent with the mean value theorem?

**Options - exact player copy:**

- A. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- B. Yes. The secant slope is 0.18 m/h, which lies within the stated derivative bounds.
- C. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.
- D. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for limits and mvt and derivative synthesis. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes accumulated change and area and average. It does not answer the question about limits and mvt and derivative synthesis.
- B: Correct. Yes. The secant slope is 0.18 m/h, which lies within the stated derivative bounds.
- C: This describes chain and related rates and Euler and work integration. It does not answer the question about limits and mvt and derivative synthesis.
- D: This describes whole-course model selection. It does not answer the question about limits and mvt and derivative synthesis.

### Review question 2


**Prompt - exact player copy:** The boundaries are y=6-x and y=0 on 2≤x≤5. What area lies between them?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "x (m)",
  "yLabel": "Height (m)",
  "caption": "Upper boundary y=6−x and lower boundary y=0, for 2≤x≤5",
  "series": [
    {
      "name": "Upper boundary",
      "points": [
        [
          2,
          4
        ],
        [
          3,
          3
        ],
        [
          4,
          2
        ],
        [
          5,
          1
        ]
      ]
    },
    {
      "name": "Lower boundary",
      "points": [
        [
          2,
          0
        ],
        [
          3,
          0
        ],
        [
          4,
          0
        ],
        [
          5,
          0
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. 3 m².
- B. 15 m².
- C. 7.5 m².
- D. -7.5 m².

**Correct answer:** C

**Hint - exact player copy:** Integrate 6−x from 2 to 5.

**Option feedback - exact player copy:**

- A: This counts only the interval width.
- B: This doubles the integral of the height difference.
- C: Correct. 7.5 m².
- D: Geometric area is nonnegative; integrate upper minus lower.

### Review question 3


**Prompt - exact player copy:** For Q(h)=40e^(0.3√h) m³/s at h=4.0 m, estimate Q and the change caused by Δh=0.10 m using linearization.

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- C. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.
- D. Q≈72.885 m³/s and ΔQ≈0.547 m³/s.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for chain and related rates and euler and work integration. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes limits and MVT and derivative synthesis. It does not answer the question about chain and related rates and euler and work integration.
- B: This describes accumulated change and area and average. It does not answer the question about chain and related rates and euler and work integration.
- C: This describes whole-course model selection. It does not answer the question about chain and related rates and euler and work integration.
- D: Correct. Q≈72.885 m³/s and ΔQ≈0.547 m³/s.

### Review question 4


**Prompt - exact player copy:** A process may run only if pressure≤8 units, work≤750 J, and warning lead≥280 min. Measurements are 5.7 units, 724 J, and 294 min. What decision fits all three limits?

**Options - exact player copy:**

- A. The tested process passes all three limits; this does not authorize untested settings.
- B. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- C. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for whole-course model selection. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The tested process passes all three limits; this does not authorize untested settings.
- B: This describes limits and MVT and derivative synthesis. It does not answer the question about whole-course model selection.
- C: This describes accumulated change and area and average. It does not answer the question about whole-course model selection.
- D: This describes chain and related rates and Euler and work integration. It does not answer the question about whole-course model selection.

### Review question 5


**Prompt - exact player copy:** Which statement best explains limit?

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The value a function approaches as its input nears a point.
- C. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for limit. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes limits and MVT and derivative synthesis. It does not answer the question about limit.
- B: Correct. The value a function approaches as its input nears a point.
- C: This describes accumulated change and area and average. It does not answer the question about limit.
- D: This describes chain and related rates and Euler and work integration. It does not answer the question about limit.

### Review question 6


**Prompt - exact player copy:** Which statement best explains continuous?

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- C. Having a defined value that equals the common left and right limit.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for continuous. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes limits and MVT and derivative synthesis. It does not answer the question about continuous.
- B: This describes accumulated change and area and average. It does not answer the question about continuous.
- C: Correct. Having a defined value that equals the common left and right limit.
- D: This describes chain and related rates and Euler and work integration. It does not answer the question about continuous.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review
- Limits and continuity make local behavior trustworthy.
- Derivatives describe rates, sensitivities, motion, and extrema.
- Integrals turn rates and shapes into totals, areas, volumes, and work.
- **Mission takeaway:** Differential equations predict changing systems from rules and initial data.

---

# 9. Mission-at-a-glance production map

### Mission 1 - The Broken Trace

**Main event:** One impossible stored point is removed only after three independent limit checks; the surrounding acceleration remains.

**Locations:** STORE only; all necessary raw trace and model records are co-located.

**Core calculus:** rational and radical limits, rational-function asymptotes, two-sided limits, continuity, removable versus jump and infinite breaks, IVT.

**Stops:** Cancel the false zero; Rationalize the float transform; Classify forecast breaks; Certify continuity.

**Ending change:** Use the repaired local forecast. Both sides approach `4.20 m`, so the lone high point is a fixable hole. The crew restores that point and keeps the surrounding rise. The rise is smooth, but it is getting steeper.

### Mission 2 - Faster Than the Line

**Main event:** The player replaces a height-only alarm with a derivative-and-tangent trigger.

**Locations:** INFLOW only; gauge wall and trace bench hold all rate evidence.

**Core calculus:** derivative limit, power/product/quotient/trig/exp rules, tangent line, linear approximation.

**Stops:** Build the instantaneous rise; Differentiate the forecast signal; Protect the net-rise calculation; Set the tangent alarm.

**Ending change:** Set the new rate alarm at the tangent prediction. The next reading is above `4.230 m`, so the reservoir is rising faster than the current local trend. The crew starts an early watch. A gate chart must now turn level change into release change.

### Mission 3 - The Gate That Comes Back

**Main event:** Three linked derivative views produce and physically verify a reversible gate calibration.

**Locations:** GATES only; calculation boards and operated hoist must share the same linkage.

**Core calculus:** chain rule, implicit first/second derivatives, inverse derivative, arctan/exponential derivatives.

**Stops:** Differentiate nested discharge; Link opening and head; Find linkage curvature; Reverse the flow calibration.

**Ending change:** Use the staged calibration path. The chain, linkage, and inverse tests agree, and the gate returns to baseline. The crew can predict discharge without forcing the hoist. Now it must learn how that water moves downstream.

### Mission 4 - Before the Water Arrives

**Main event:** Motion and depth rates convert a release into the first public warning rule.

**Locations:** SAFE only; settlement route, depth model, and warning authority are here.

**Core calculus:** position/velocity/acceleration, speeding signs, stops, distance/displacement, related rates.

**Stops:** Differentiate the flood front; Distance is not displacement; Relate depth and reach volume; Commit the warning.

**Ending change:** Use a minimum warning lead of `280 minutes`. It includes travel to the village and the road's rise time. The warning rule is now tied to motion, not an average. The two-day release plan still needs a true peak test.

### Mission 5 - The Crossing We Can Prove

**Main event:** An endpoint overload defeats the average-based plan; a controlled storage test finds a feasible alternative.

**Locations:** POWER to STORE; demand capacity is known only at POWER, storage consequence only at STORE.

**Core calculus:** critical points, first/second tests, absolute extrema, EVT, IVT/MVT, marginal change.

**Stops:** Find critical turbine demand; Test the absolute peak; Optimize storage against value; Prove an intermediate crossing.

**Ending change:** Reject the old two-day plan. Its endpoint demand reaches `40 MW`, above the `24 MW` unit limit, even though one interior peak only touches the limit. A lower-power release can add storage room. The forecast itself must now face the high-ground gauge.

### Mission 6 - The Crest We Missed

**Main event:** Physical asymptotes reject one model; frozen holdout testing reveals a missed later crest.

**Locations:** INFLOW to ARCHIVE; gauge supplies models, archive alone holds unseen readings.

**Core calculus:** L'Hopital's rule, exponential derivatives, derivative and concavity signs, holdout residuals, curve sketching.

**Stops:** Check the indeterminate rate; Read inverse-shaped saturation; Freeze before revealing the crest; Diagnose the full curve.

**Ending change:** Use Forecast B. It stays finite, predicts a later crest, and survives unseen high-ground data. The old model missed the peak rather than suffering a constant bias. More water is coming, so the crew must total the full storm volume.

### Mission 7 - Room for the Storm

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

### Mission 9 - Two Silent Gauges

**Main event:** Euler reconstruction and independent channels show that two silent heads share a failed cable.

**Locations:** STRUCT to GATES; STRUCT supplies missing field, GATES provides independent load simulation and dependency panel.

**Core calculus:** slope fields, equilibrium, Euler recursion and step size, shared versus independent channels.

**Stops:** Read the pressure field; Step through the gap; Test step-size sensitivity; Diagnose silence.

**Ending change:** Continue controlled release tests. Euler estimates agree with independent live readings, and the two silent gauges share one failed cable. The crew replaces that cable and bounds the uplift load. It must next decide whether seepage settles or keeps growing.

### Mission 10 - The Flow That Eases

**Main event:** A separable exponential model predicts bounded seepage and survives worst-case stress.

**Locations:** STRUCT to STORE; second system provides transfer evidence unavailable at seepage bench.

**Core calculus:** separation, `ln|y|`, initial condition, exponential/logistic/Newton models, equilibrium, parameter stress.

**Stops:** Separate the seepage equation; Select the model; Transfer to cooling; Approve the carrying limit.

**Ending change:** Approve the wall's carrying limit. Excess seepage follows bounded exponential decay and remains below `5.0 L/min` across the supported uncertainty. The structural hold clears. A new reservoir survey now challenges how much water each level truly represents.

### Mission 11 - The Lake Lost Its Room

**Main event:** Area between surveys quantifies silt loss; independent transects and a level-rate test replace the old curve.

**Locations:** STORE -> STRUCT -> GATES; each site supplies respectively discrepancy, independent identity, and operational response.

**Core calculus:** area between curves, crossings, average value, independent records, related-rate conversion.

**Stops:** Integrate lost capacity; Compute average loss; Verify independent transects; Convert volume loss to level rate.

**Ending change:** Replace the 2003 storage curve. Independent transects show `7.5 million m^3` of lost capacity, and the corrected derivative predicts the measured level fall. The old plan overstated safety room. The crew must rebuild its release around the gate and turbine work still available.

### Mission 12 - The Runner in the Crate

**Main event:** Rotational volume removes unavailable turbine capacity; a work test bounds repeatable gate motion.

**Locations:** POWER -> GATES -> STORE; missing runner, hoist capacity, and final storage feasibility are owned separately.

**Core calculus:** disk/washer, shell setup, work as force integral, Hooke force, evidence value.

**Stops:** Compute the missing runner volume; Compare the shell setup; Measure hoist work; Choose feasible schedule.

**Ending change:** Use the one-runner, staged-gate schedule. Washer volume removes the unavailable runner from capacity, and the work integral keeps each gate stroke below `750 J`. The corrected storage simulation still clears the target. The remaining question is whether measurement error could overturn that result.

### Mission 13 - The Margin That Survives

**Main event:** Propagated error, residual pattern, and an independent constraint certify the corrected model.

**Locations:** STORE -> STRUCT -> INFLOW; uncertainty originates in storage, independent geometry is structural, and forecast integration is at inflow.

**Core calculus:** linearization, propagated units, residual fields, numerical-method bias, degeneracy and physical constraints.

**Stops:** Linearize level error; Refuse the lowest RMS; Break the two-control degeneracy; Diagnose the signed rules.

**Ending change:** Sign the corrected release rules. Propagated volume error stays below the margin, residuals remain unpatterned, and independent uplift geometry breaks the last parameter tie. Dam Integrity is now locked. The valley warning system must pass before the release can start.

### Mission 14 - Four Voices Back

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


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `GATES` roster owner: Mara Vale.
- `POWER` roster owner: Mara Vale.
- `SAFE` roster owner: Mara Vale.
- `STORE` roster owner: Mara Vale.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
