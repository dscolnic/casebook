# HEADWATER

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

Ashfell Dam must lower its reservoir before a three-day storm reaches the valley. You will use calculus to decide how water should leave through turbines and spillway gates; too much at once floods the towns below, while too little leaves the dam carrying the storm. Fifteen work shifts remain, and failure could force an uncontrolled release through homes and a school. Mara Vale, dam operations chief, hands you the release board and says, “Families below this dam are trusting us to hold back a storm without sending it through their homes: read the water correctly, control the release, and bring the valley through safely.”

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

**Card title:** Did the Water Really Rise?

**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the desk showing reservoir water levels.

**Card body:** Yesterday's record shows the water behind the dam suddenly jumping higher, then dropping back. Did the water really change, or is one measurement wrong? Use calculus to check the readings and decide whether the crew can trust the forecast before letting water flow toward the towns below.

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

**World state:** The cancel the false zero fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 1: CANCEL THE FALSE ZERO OPEN

**Dialogue bubbles -** Mara Vale: "Start with cancel the false zero. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 1 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 1 | `level-desk` | automatic**

**World state:** After 1.2 Location: STORE.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Mara Vale: "Nice work. Use the Stop 1 result to settle rationalize the float transform."

**Unlocks/waypoint:** Unlock Stop 2 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 2 | `storage-board` | automatic**

**World state:** After 1.3 Location: STORE.

**Panel/HUD text:** STOP 2 RECORDED - STOP 3 OPEN

**Dialogue bubbles -** Mara Vale: "Good thinking. Use the Stop 2 result to classify the rival forecast's asymptotes."

**Unlocks/waypoint:** Unlock Stop 3 at `storage-board` in Storage & Level Board.

**Beat 4 - After Stop 3 | `storage-board` | automatic**

**World state:** The forecast-break classification remains visible while the certify continuity fixture lights.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Mara Vale: "Exactly right. Use the Stop 3 result to settle certify continuity."

**Unlocks/waypoint:** Unlock Stop 4 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

**Question card story setup - exact player copy:** The water-level prediction H(t)=(t^2-36)/(t-6) cm is undefined at minute 6 even though the surrounding readings are finite. The logger predicts reservoir height with H(t)=(t^2-36)/(t-6), where t is minutes and H is centimetres. Because H(6) is undefined, find L=lim_(t->6)H(t), the height approached near minute 6, and compare it with the spike.

**Question card story-science connection - exact player copy:** The nearby height limit determines whether the formula supports the isolated spike or instead approaches a different height.

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

**Question card story setup - exact player copy:** With the algebraic hole repaired, the float conversion still returns 0/0 near zero displacement. The float sensor uses A(h)=[sqrt(16+h)-4]/h for its level-change gain after displacement h. Because A(0) gives 0/0, find L=lim_(h->0)A(h), the gain approached during tiny float motions.

**Question card story-science connection - exact player copy:** The small-motion gain determines whether the float transform has a finite response despite its undefined displayed value at zero.

**Question card prompt - exact player copy:** Submit the unitless gain.

**Complete format-specific interaction block:** `derive: {left_side:"L",goal:"local gain",givens:["L = lim_(h->0) [sqrt(16+h)-4]/h"],lines:[{expressions:["L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}","L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)-4])/[h(sqrt(16+h)-4)]}"],correct:"L = lim_(h->0) {([sqrt(16+h)-4][sqrt(16+h)+4])/[h(sqrt(16+h)+4)]}",rules:["multiply by the conjugate over itself","multiply by h over itself"],correct_rule:"multiply by the conjugate over itself"},{expressions:["L = lim_(h->0) 1/[sqrt(16+h)+4]","L = lim_(h->0) h/[sqrt(16+h)+4]"],correct:"L = lim_(h->0) 1/[sqrt(16+h)+4]",rules:["difference of squares and cancel h","cancel before forming the difference of squares"],correct_rule:"difference of squares and cancel h"},{expressions:["L = 1/[sqrt(16+0)+4] = 1/8","L = 1/4"],correct:"L = 1/[sqrt(16+0)+4] = 1/8",rules:["substitute h=0","drop the second term in the denominator"],correct_rule:"substitute h=0"}],answerText:"The local gain is 1/8."}`

**DERIVE per-step choice rule:** Each `expressions` array is exactly one step's two choices: the value named by `correct` and the other value, which is a common-mistake alternative. Randomize left/right display order; do not show more than these two choices.

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["With the algebraic hole repaired, the float conversion still returns 0/0 near zero displacement. The float sensor uses A(h)=[sqrt(16+h)-4]/h for its level-change gain after displacement h. Because A(0) gives 0/0, find L=lim_(h->0)A(h), the gain approached during tiny float motions.", "Let L=lim_(h->0)A(h)=lim_(h->0)[sqrt(16+h)-4]/h."]
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

Mission decision: Use the repaired local forecast. Both sides approach `4.20 m`, so the lone high point is a fixable hole. The crew restores that point. And keeps the surrounding rise. The rise is smooth,.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Excellent judgment. You made the right call: Use the repaired local forecast. Ashfell has more protection from the storm.

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

**Secondary briefing card - exact player copy:** You completed The Rate-Limit Rule. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Rate-Limit Rule, the water-level prediction H(t)=(t^2-36)/(t-6) cm is undefined at minute 6 even though the surrounding readings are finite. Resolve that mismatch before the crew decides whether the recorded spike is physical or only a hole in the formula. What does the limit represent in this situation?

**Options - exact player copy:**

- A. Having a defined value that equals the common left and right limit.
- B. The value a function approaches as its input nears a point.
- C. Factor, cancel for t != 6, then substitute.
- D. Conjugate converts numerator product to h.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Limit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Continuous, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. the value a function approaches as its input nears a point.
- C: This describes rational limit, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes radical limit, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Rate-Limit Rule: the water-level prediction H(t)=(t^2-36)/(t-6) cm is undefined at minute 6 even though the surrounding readings are finite. Resolve that mismatch before the crew decides whether the recorded spike is physical or only a hole in the formula. Which condition or conclusion correctly determines continuity here?

**Options - exact player copy:**

- A. The value a function approaches as its input nears a point.
- B. Factor, cancel for t != 6, then substitute.
- C. Having a defined value that equals the common left and right limit.
- D. Conjugate converts numerator product to h.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Continuous; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Limit, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes rational limit, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. having a defined value that equals the common left and right limit.
- D: This describes radical limit, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Rate-Limit Rule using new evidence: the water-level prediction H(t)=(t^2-36)/(t-6) cm is undefined at minute 6 even though the surrounding readings are finite. Resolve that mismatch before the crew decides whether the recorded spike is physical or only a hole in the formula. Which option correctly carries out the required rational limit reasoning?

**Options - exact player copy:**

- A. The value a function approaches as its input nears a point.
- B. Having a defined value that equals the common left and right limit.
- C. Conjugate converts numerator product to h.
- D. Factor, cancel for t != 6, then substitute.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for rational limit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Limit, not rational limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Continuous, not rational limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes radical limit, not rational limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. factor, cancel for t != 6, then substitute.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Rate-Limit Rule: with the algebraic hole repaired, the float conversion still returns 0/0 near zero displacement. Which option correctly carries out the required radical limit reasoning?

**Options - exact player copy:**

- A. Conjugate converts numerator product to h.
- B. The value a function approaches as its input nears a point.
- C. Having a defined value that equals the common left and right limit.
- D. Factor, cancel for t != 6, then substitute.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for radical limit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. conjugate converts numerator product to h.
- B: This describes Limit, not radical limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Continuous, not radical limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes rational limit, not radical limit. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Rate-Limit Rule decision, the team knows this: the water-level prediction H(t)=(t^2-36)/(t-6) cm is undefined at minute 6 even though the surrounding readings are finite. Resolve that mismatch before the crew decides whether the recorded spike is physical or only a hole in the formula. Which option correctly applies the mission concept to this follow-up case?

**Options - exact player copy:**

- A. Vertical: t=-3 and t=3; horizontal: F=2.
- B. Vertical: t=9; horizontal: F=1/9.
- C. Vertical: t=-3 and t=3; horizontal: F=0.
- D. Vertical: t=3 only; horizontal: F=2.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for the mission concept; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. The denominator is zero at t=-3 and t=3, and the ratio of leading coefficients is 2.
- B: This reads constants directly instead of solving t^2-9=0 and ignores the leading terms. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: The vertical asymptotes are correct, but equal degrees approach the ratio 2/1, not zero. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Solving t^2=9 requires both square roots, so t=-3 is also a vertical asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Rate-Limit Rule to this follow-up: the left and right traces now both approach 4.20 m, while the logger stores 4.68 m at 09:06. Which condition or conclusion correctly determines continuity here?

**Options - exact player copy:**

- A. The value a function approaches as its input nears a point.
- B. Having a defined value that equals the common left and right limit.
- C. Matching side limits establish existence; IVT may then support intermediate values locally.
- D. Factor, cancel for t != 6, then substitute.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for piecewise continuity/IVT/discontinuities; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Limit, not piecewise continuity/IVT/discontinuities. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Continuous, not piecewise continuity/IVT/discontinuities. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. matching side limits establish existence; IVT may then support intermediate values locally.
- D: This describes rational limit, not piecewise continuity/IVT/discontinuities. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- Simplify `0/0` before evaluating a limit.
- Continuity needs existence, a defined value, and equality.
- **Mission takeaway:** Use limits to repair removable holes and asymptotes to reject models with impossible breaks.

---

# Mission 2 - The Rising-Fast Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** 14 SHIFTS UNTIL THE STORM  
**Card title:** Faster Than the Gauge  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the trace bench.  
**Card body:** The water behind the dam is still below the alarm line, but it is rising faster. Waiting for the old alarm could leave the crew too little time to act. Calculate how quickly the water is rising and choose an earlier warning.
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

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with build the instantaneous rise. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 5 | `gauge-wall` | automatic**

**World state:** After 2.1 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Nice work. Use the Stop 5 result to settle differentiate the forecast signal."

**Unlocks/waypoint:** Unlock Stop 6 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 3 - After Stop 6 | `trace-bench` | automatic**

**World state:** After 2.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Good thinking. Use the Stop 6 result to settle protect the net-rise calculation."

**Unlocks/waypoint:** Unlock Stop 7 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 7 | `gauge-wall` | automatic**

**World state:** The protect the net-rise calculation result remains visible while the set the tangent alarm fixture lights.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Exactly right. Use the Stop 7 result to settle set the tangent alarm."

**Unlocks/waypoint:** Unlock Stop 8 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Set the new rate alarm at the tangent prediction. The next reading is above `4.230 m`, so the reservoir is rising faster than the current local trend. The crew starts an early watch. A gate chart must now turn level change into release change.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a sharp decision. Your evidence supports a clear decision: Set the new rate alarm at the tangent prediction. The dam crew can now act with a calculation it trusts.

**Story event - exact player copy:** The early rate alarm activates before the reservoir crosses the old height warning.

TARGET `17:00`; automatic `OPERATING RESERVE +3`; canonical QA enter `53/52/62/72`, auto `53/52/65/72`, award 12, allocate 7 Safe Storage and 5 Downstream -> `60/57/65/72`; standard RP text and zero-bar restore apply.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Rising-Fast Rule. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Rising-Fast Rule, the level model near hour 2 is H(t)=0.03t^2+4.00 metres, and the current height alone looks safe. Which option correctly carries out the required Derivative reasoning?

**Options - exact player copy:**

- A. A line matching a curve's value and slope at one point.
- B. Instantaneous output change per unit input change.
- C. Limit of secant slopes.
- D. 96+20cos2+1.5e^.2=89.509.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Derivative; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tangent line, not Derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. instantaneous output change per unit input change.
- C: This describes derivative definition, not Derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes power/trig/exp/chain, not Derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Rising-Fast Rule: the verified level is 4.20 m at 10:00, and the current derivative is 0.12 m/h. Write the action threshold now, before new evidence or operational pressure can move it. Which option correctly applies Tangent line to this follow-up case?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. Limit of secant slopes.
- C. A line matching a curve's value and slope at one point.
- D. 96+20cos2+1.5e^.2=89.509.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Tangent line; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Derivative, not Tangent line. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes derivative definition, not Tangent line. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. a line matching a curve's value and slope at one point.
- D: This describes power/trig/exp/chain, not Tangent line. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Rising-Fast Rule using new evidence: the level model near hour 2 is H(t)=0.03t^2+4.00 metres, and the current height alone looks safe. Which option correctly carries out the required derivative definition reasoning?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. A line matching a curve's value and slope at one point.
- C. 96+20cos2+1.5e^.2=89.509.
- D. Limit of secant slopes.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for derivative definition; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Derivative, not derivative definition. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Tangent line, not derivative definition. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes power/trig/exp/chain, not derivative definition. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. limit of secant slopes.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Rising-Fast Rule: the forecast is I(t)=120+8t^3+20sin(t)+15e^(0.1t) cubic metres per second. Which statistical conclusion or procedure correctly uses power/trig/exp/chain?

**Options - exact player copy:**

- A. 96+20cos2+1.5e^.2=89.509.
- B. Instantaneous output change per unit input change.
- C. A line matching a curve's value and slope at one point.
- D. Limit of secant slopes.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for power/trig/exp/chain; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. 96+20cos2+1.5e^.2=89.509.
- B: This describes Derivative, not power/trig/exp/chain. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Tangent line, not power/trig/exp/chain. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes derivative definition, not power/trig/exp/chain. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Rising-Fast Rule decision, the team knows this: because inflow is accelerating, the corrected signal multiplies raw inflow by calibration c(t), while turbine flow divides demand P(t) by head H(t). Which option correctly applies product/quotient rules to this follow-up case?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. Both changing factors contribute.
- C. A line matching a curve's value and slope at one point.
- D. Limit of secant slopes.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for product/quotient rules; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Derivative, not product/quotient rules. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. both changing factors contribute.
- C: This describes Tangent line, not product/quotient rules. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes derivative definition, not product/quotient rules. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Rising-Fast Rule to this follow-up: the verified level is 4.20 m at 10:00, and the current derivative is 0.12 m/h. Write the action threshold now, before new evidence or operational pressure can move it. Which option correctly applies tangent line/linear approximation to this follow-up case?

**Options - exact player copy:**

- A. Instantaneous output change per unit input change.
- B. A line matching a curve's value and slope at one point.
- C. 4.20+0.12(0.25)=4.230 m; 4.235 >= 4.230, so the rising-fast condition is met. A precommitted threshold prevents the crew from moving the rule after seeing the data.
- D. Limit of secant slopes.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for tangent line/linear approximation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Derivative, not tangent line/linear approximation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Tangent line, not tangent line/linear approximation. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. 4.20+0.12(0.25)=4.230 m; 4.235 >= 4.230, so the rising-fast condition is met. A precommitted threshold prevents the crew from moving the rule after seeing the data.
- D: This describes derivative definition, not tangent line/linear approximation. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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
**Card body:** The crew needs to lower the water behind the dam, but opening a gate wider does not always release water at the same rate. Work out how water depth and gate position affect the flow. Choose a safe way to test the gate's controls.
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

**World state:** The differentiate nested discharge fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 3: DIFFERENTIATE NESTED DISCHARGE OPEN

**Dialogue bubbles -** Tomas Wilkes: "Start with differentiate nested discharge. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 9 at `discharge-board` in Gate House.

**Beat 2 - After Stop 9 | `discharge-board` | automatic**

**World state:** After 3.1 Location: GATES.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Nice work. Use the Stop 9 result to settle link opening and head."

**Unlocks/waypoint:** Unlock Stop 10 at `discharge-board` in Gate House.

**Beat 3 - After Stop 10 | `hoist-stand` | automatic**

**World state:** After 3.3 Location: GATES.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Good thinking. Use the Stop 10 result to settle find linkage curvature."

**Unlocks/waypoint:** Unlock Stop 11 at `hoist-stand` in Gate House.

**Beat 4 - After Stop 11 | `hoist-stand` | automatic**

**World state:** The find linkage curvature result remains visible while the reverse the flow calibration fixture lights.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Tomas Wilkes: "Exactly right. Use the Stop 11 result to settle reverse the flow calibration."

**Unlocks/waypoint:** Unlock Stop 12 at `hoist-stand` in Gate House.

**Beat 5 - At mission end | `discharge-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Wilkes: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Use the staged calibration path. The chain, linkage. And inverse tests agree, and the gate returns to baseline. The crew can predict discharge without forcing the hoist. Now it must learn how that water moves downstream.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Outstanding reasoning. The key result is now settled: Use the staged calibration path. Your result keeps the reservoir plan both useful and safe.

**Story event - exact player copy:** The crew completes the staged gate calibration without forcing the hoist.

TARGET `18:00`; auto `DAM INTEGRITY +3`; canonical enter `60/57/65/72` -> `60/57/65/75`, award 12, allocate 5 Integrity, 4 Safe Storage, 3 Reserve -> `64/57/68/80`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Inflow Accumulation. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Inflow Accumulation, gate discharge is modeled by Q(h)=40e^(0.3sqrt(h)) cubic metres per second, where h is head in metres. Which option correctly applies Chain rule to this follow-up case?

**Options - exact player copy:**

- A. An equation connecting variables without isolating one.
- B. Differentiate an outside function, then multiply by the derivative of its inside.
- C. A function that reverses another function.
- D. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Chain rule; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Implicit relation, not Chain rule. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. differentiate an outside function, then multiply by the derivative of its inside.
- C: This describes Inverse function, not Chain rule. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes chain/exp/log, not Chain rule. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Inflow Accumulation: linkage tests satisfy o^2+0.5oh+h^2=9, where opening o and head h are metres. Which option correctly applies Implicit relation to this follow-up case?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. A function that reverses another function.
- C. An equation connecting variables without isolating one.
- D. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Implicit relation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Chain rule, not Implicit relation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Inverse function, not Implicit relation. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. an equation connecting variables without isolating one.
- D: This describes chain/exp/log, not Implicit relation. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Inflow Accumulation using new evidence: because linkage curvature narrows the safe motion, the command map uses F(o)=100 arctan(o/2) cubic metres per second. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which option correctly applies Inverse function to this follow-up case?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. An equation connecting variables without isolating one.
- C. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.
- D. A function that reverses another function.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Inverse function; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Chain rule, not Inverse function. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Implicit relation, not Inverse function. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes chain/exp/log, not Inverse function. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. a function that reverses another function.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Inflow Accumulation: gate discharge is modeled by Q(h)=40e^(0.3sqrt(h)) cubic metres per second, where h is head in metres. Which option correctly applies chain/exp/log to this follow-up case?

**Options - exact player copy:**

- A. DQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.
- B. Differentiate an outside function, then multiply by the derivative of its inside.
- C. An equation connecting variables without isolating one.
- D. A function that reverses another function.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for chain/exp/log; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. dQ/dh=6e^(0.3sqrt h)/sqrt h. Multiplying every layer's derivative prevents a dangerously small sensitivity estimate.
- B: This describes Chain rule, not chain/exp/log. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Implicit relation, not chain/exp/log. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Inverse function, not chain/exp/log. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Inflow Accumulation decision, the team knows this: linkage tests satisfy o^2+0.5oh+h^2=9, where opening o and head h are metres. Which option correctly applies implicit differentiation to this follow-up case?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. Do/dh=-2/3. The linkage slope turns water-level motion into a required hoist correction.
- C. An equation connecting variables without isolating one.
- D. A function that reverses another function.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for implicit differentiation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Chain rule, not implicit differentiation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. do/dh=-2/3. The linkage slope turns water-level motion into a required hoist correction.
- C: This describes Implicit relation, not implicit differentiation. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Inverse function, not implicit differentiation. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Inflow Accumulation to this follow-up: the linkage slope is negative at the test point, but Wilkes needs to know how that slope itself changes. Which option correctly carries out the required second implicit derivative reasoning?

**Options - exact player copy:**

- A. Differentiate an outside function, then multiply by the derivative of its inside.
- B. An equation connecting variables without isolating one.
- C. O''=-40/81 per metre. Curvature determines whether the safe correction stays safe over a finite movement.
- D. A function that reverses another function.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for second implicit derivative; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Chain rule, not second implicit derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Implicit relation, not second implicit derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. o''=-40/81 per metre. Curvature determines whether the safe correction stays safe over a finite movement.
- D: This describes Inverse function, not second implicit derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 4 - The Two-Day Cost Note

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 12 SHIFTS UNTIL THE STORM  
**Card title:** Water in Motion  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the arrival map.  
**Card body:** Opening the dam's gates sends water toward settlements downstream. The crew needs to know how soon it will arrive and how high it will rise. Calculate the water's motion and changing depth, then decide how much warning residents need before a release begins.
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

**World state:** The differentiate the flood front fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 4: DIFFERENTIATE THE FLOOD FRONT OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with differentiate the flood front. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 13 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 13 | `arrival-map` | automatic**

**World state:** After 4.2 Location: SAFE.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Elise Baptiste: "Nice work. Use the Stop 13 result to settle distance is not displacement."

**Unlocks/waypoint:** Unlock Stop 14 at `arrival-map` in Downstream Warning Desk.

**Beat 3 - After Stop 14 | `arrival-map` | automatic**

**World state:** After 4.3 Location: SAFE.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Elise Baptiste: "Good thinking. Use the Stop 14 result to settle relate depth and reach volume."

**Unlocks/waypoint:** Unlock Stop 15 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 15 | `radio-desk` | automatic**

**World state:** The relate depth and reach volume result remains visible while the commit the warning fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Elise Baptiste: "Exactly right. Use the Stop 15 result to settle commit the warning."

**Unlocks/waypoint:** Unlock Stop 16 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Use a minimum warning lead of `280 minutes`. It includes travel to the village. And the road's rise time. The warning rule is now tied to motion, not an average. The two-day release plan still needs a true peak test.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You handled that beautifully. You gave the team its answer: Use a minimum warning lead of 280 minutes. People downstream have a stronger margin of safety tonight.

**Story event - exact player copy:** Every downstream settlement receives at least 280 minutes of warning.

TARGET `17:00`; auto `DOWNSTREAM +4`; canonical enter `64/57/68/80` -> `64/61/68/80`, award 12, allocate 7 Downstream and 5 Storage -> `69/68/68/80`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Two-Day Cost Note. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Additional concepts kept out of the required mission card

- **Speed:** absolute value of velocity.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Two-Day Cost Note, the front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Which option correctly applies Speed to this follow-up case?

**Options - exact player copy:**

- A. Location along a route.
- B. Absolute value of velocity.
- C. Signed change of position per time.
- D. Final position minus initial position.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Speed; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Position, not Speed. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. absolute value of velocity.
- C: This describes Velocity, not Speed. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Displacement, not Speed. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Two-Day Cost Note: the front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Position (m)",
  "caption": "Ride position increases with a changing slope.",
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

- A. Absolute value of velocity.
- B. Signed change of position per time.
- C. Location along a route.
- D. Final position minus initial position.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Speed, not Position. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Velocity, not Position. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. location along a route.
- D: This describes Displacement, not Position. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Two-Day Cost Note using new evidence: the front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Velocity (m/s)",
  "caption": "Ride velocity changes over the test interval.",
  "series": [
    {
      "name": "Velocity",
      "points": [
        [
          0,
          0
        ],
        [
          1,
          4
        ],
        [
          2,
          8
        ],
        [
          3,
          8
        ],
        [
          4,
          4
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Absolute value of velocity.
- B. Location along a route.
- C. Final position minus initial position.
- D. Signed change of position per time.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Speed, not Velocity. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Position, not Velocity. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Displacement, not Velocity. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. signed change of position per time.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Two-Day Cost Note: with a stop at t=2 established, velocity factors as 6(t-1)(t-2), so direction also changes at hour 1. Which option correctly applies Displacement to this follow-up case?

**Options - exact player copy:**

- A. Final position minus initial position.
- B. Absolute value of velocity.
- C. Location along a route.
- D. Signed change of position per time.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Displacement; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. final position minus initial position.
- B: This describes Speed, not Displacement. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Position, not Displacement. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Velocity, not Displacement. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Two-Day Cost Note decision, the team knows this: with a stop at t=2 established, velocity factors as 6(t-1)(t-2), so direction also changes at hour 1. Which option correctly applies Total distance to this follow-up case?

**Options - exact player copy:**

- A. Absolute value of velocity.
- B. All travel counted positively.
- C. Location along a route.
- D. Signed change of position per time.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Total distance; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Speed, not Total distance. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. all travel counted positively.
- C: This describes Position, not Total distance. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Velocity, not Total distance. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Two-Day Cost Note to this follow-up: the front's position is x(t)=2t^3-9t^2+12t kilometres after release, for 0<=t<=3 hours. Which option correctly carries out the required motion derivatives reasoning?

**Options - exact player copy:**

- A. Absolute value of velocity.
- B. Location along a route.
- C. At 2 h the front momentarily stops; acceleration is +6 km/h^2. Velocity and acceleration signs show both direction and whether the front is speeding up.
- D. Signed change of position per time.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for motion derivatives; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Speed, not motion derivatives. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Position, not motion derivatives. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. at 2 h the front momentarily stops; acceleration is +6 km/h^2. Velocity and acceleration signs show both direction and whether the front is speeding up.
- D: This describes Velocity, not motion derivatives. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 5 - The Last-Half-Metre Relation

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 11 SHIFTS UNTIL THE STORM  
**Card title:** The Peak Between Readings  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** The old two-day plan checks water levels at the start and finish, but trouble could develop between those times. Find when the forecast reaches its highest and lowest values. Decide whether the plan can produce power while keeping enough room behind the dam.
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

**World state:** The find critical turbine demand fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 5: FIND CRITICAL TURBINE DEMAND OPEN

**Dialogue bubbles -** Nia Chen: "Start with find critical turbine demand. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 17 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 17 | `machine-board` | automatic**

**World state:** After 5.2 Location: POWER.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Nia Chen: "Nice work. Use the Stop 17 result to settle test the absolute peak."

**Unlocks/waypoint:** Unlock Stop 18 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 18 | `dispatch-console` | automatic**

**World state:** Travel Location: POWER->STORE.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Nia Chen: "Good thinking. Use the Stop 18 result to settle optimize storage against value."

**Unlocks/waypoint:** Unlock Stop 19 at `dispatch-console` in Powerhouse.

**Beat 4 - After Stop 19 | `machine-board` | automatic**

**World state:** The optimize storage against value result remains visible while the prove an intermediate crossing fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Nia Chen: "Exactly right. Use the Stop 19 result to settle prove an intermediate crossing."

**Unlocks/waypoint:** Unlock Stop 20 at `machine-board` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Superb work. The record now supports this decision: Use the safer release setting. The storm plan is sharper because you followed how the water actually changes.

**Story event - exact player copy:** The control room replaces the average-based release plan with the safer setting.

TARGET `18:00`; auto `SAFE STORAGE +4`; canonical enter `69/68/68/80` -> `73/68/68/80`, award 12, allocate 7 Reserve, 5 Integrity -> `73/68/75/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Last-Half-Metre Relation. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Last-Half-Metre Relation, turbine demand is D(t)=t^3-6t^2+9t+20 megawatts for 0<=t<=5 hours. Which option correctly applies Critical point to this follow-up case?

**Options - exact player copy:**

- A. Greatest value on the full interval.
- B. An interior input where the derivative is zero or undefined.
- C. The derivative of a total with respect to one more unit.
- D. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Critical point; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute maximum, not Critical point. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. an interior input where the derivative is zero or undefined.
- C: This describes Marginal value, not Critical point. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes critical points, not Critical point. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Last-Half-Metre Relation: with critical times found, evaluate demand at t=0,1,3,5, then use derivative signs or D''(t)=6t-12 to justify the maximum. Which option correctly applies Absolute maximum to this follow-up case?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. The derivative of a total with respect to one more unit.
- C. Greatest value on the full interval.
- D. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Absolute maximum; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Critical point, not Absolute maximum. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Marginal value, not Absolute maximum. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. greatest value on the full interval.
- D: This describes critical points, not Absolute maximum. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Last-Half-Metre Relation using new evidence: because the power peak is unsafe, test release q=180 then 200 m^3/s while forecast inflow and starting level remain fixed. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which option correctly applies Marginal value to this follow-up case?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. Greatest value on the full interval.
- C. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Marginal value; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Critical point, not Marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Absolute maximum, not Marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes critical points, not Marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. the derivative of a total with respect to one more unit.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Last-Half-Metre Relation: turbine demand is D(t)=t^3-6t^2+9t+20 megawatts for 0<=t<=5 hours. Which option correctly applies critical points to this follow-up case?

**Options - exact player copy:**

- A. Critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.
- B. An interior input where the derivative is zero or undefined.
- C. Greatest value on the full interval.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for critical points; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. critical times are 1 h and 3 h. A zero derivative can reveal a peak that sparse readings miss.
- B: This describes Critical point, not critical points. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Absolute maximum, not critical points. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Marginal value, not critical points. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Last-Half-Metre Relation decision, the team knows this: with critical times found, evaluate demand at t=0,1,3,5, then use derivative signs or D''(t)=6t-12 to justify the maximum. Which option correctly carries out the required EVT/first-second derivative tests reasoning?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. EVT requires endpoints plus critical points; the endpoint peak exceeds capacity. A correct maximum decides whether the two-day plan overloads the available unit.
- C. Greatest value on the full interval.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for EVT/first-second derivative tests; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Critical point, not EVT/first-second derivative tests. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. eVT requires endpoints plus critical points; the endpoint peak exceeds capacity. A correct maximum decides whether the two-day plan overloads the available unit.
- C: This describes Absolute maximum, not EVT/first-second derivative tests. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Marginal value, not EVT/first-second derivative tests. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Last-Half-Metre Relation to this follow-up: because the power peak is unsafe, test release q=180 then 200 m^3/s while forecast inflow and starting level remain fixed. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which option correctly applies optimization/marginal value to this follow-up case?

**Options - exact player copy:**

- A. An interior input where the derivative is zero or undefined.
- B. Greatest value on the full interval.
- C. Causal; marginal gain .08/20=.004 million m^3 per (m^3/s). A controlled reversal separates the release setting's effect from a changing forecast.
- D. The derivative of a total with respect to one more unit.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for optimization/marginal value; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Critical point, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Absolute maximum, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. causal; marginal gain .08/20=.004 million m^3 per (m^3/s). A controlled reversal separates the release setting's effect from a changing forecast.
- D: This describes Marginal value, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 6 - The Peak Test

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 10 SHIFTS UNTIL THE STORM  
**Card title:** Beyond the Old Horizon  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the high-ground gauge.  
**Card body:** A rain gauge has found rainfall the weather radar missed, and two forecasts now disagree about the flood. Check how each forecast begins and compare its predictions with measurements. Choose which forecast the crew should use when lowering the reservoir before the storm.
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

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with the indeterminate-rate check. We now have the derivative tools to test the replacement forecast properly."

**Unlocks/waypoint:** Unlock Stop 21 at `trace-bench` in Catchment & Inflow Desk.

**Beat 2 - After Stop 21 | `high-ground-gauge` | automatic**

**World state:** After 6.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Nice work. Use the Stop 21 result to settle read inverse-shaped saturation."

**Unlocks/waypoint:** Unlock Stop 22 at `high-ground-gauge` in Catchment & Inflow Desk.

**Beat 3 - After Stop 22 | `forecast-drawer` | automatic**

**World state:** Travel Location: INFLOW->ARCHIVE.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Imani Okoro: "Good thinking. Use the Stop 22 result to settle freeze before revealing the crest."

**Unlocks/waypoint:** Unlock Stop 23 at `forecast-drawer` in Catchment & Inflow Desk.

**Beat 4 - After Stop 23 | `gauge-wall` | automatic**

**World state:** The freeze before revealing the crest result remains visible while the diagnose the full curve fixture lights.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "Exactly right. Use the Stop 23 result to settle diagnose the full curve."

**Unlocks/waypoint:** Unlock Stop 24 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `trace-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** ARCHIVE

**Dialogue bubbles -** Imani Okoro: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Use Forecast B. It stays finite, predicts a later crest. And survives unseen high-ground data. The old model missed the peak rather than suffering a constant bias. More water is coming, so the crew must total the full storm volume.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was exactly the insight the team needed. You resolved the central question: Use Forecast B. Ashfell has more protection from the storm.

**Story event - exact player copy:** Forecast B becomes the official storm forecast and raises the required drawdown.

TARGET `19:00`; automatic `SAFE STORAGE -8 | OPERATING RESERVE -3`; canonical enter `73/68/75/85` -> `65/68/72/85`, award 12, allocate all Storage -> `77/68/72/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Peak Test. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Peak Test, the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which interpretation of the displayed evidence correctly uses rational-function asymptotes?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (h)",
  "yLabel": "Reservoir response",
  "caption": "The response approaches a horizontal limit.",
  "series": [
    {
      "name": "Model",
      "points": [
        [
          0,
          0
        ],
        [
          1,
          5
        ],
        [
          2,
          7.5
        ],
        [
          3,
          8.8
        ],
        [
          4,
          9.4
        ],
        [
          5,
          9.7
        ]
      ]
    }
  ],
  "limit": {
    "at": 10,
    "label": "Long-run level"
  }
}
```


**Options - exact player copy:**

- A. Observed value minus model prediction.
- B. A line a graph approaches.
- C. Observations hidden until a model is frozen.
- D. Vertical asymptotes t=+-2; horizontal asymptote R=3. Physical rainfall cannot become infinite at an ordinary forecast hour.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Residual, not Asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. a line a graph approaches.
- C: This describes Holdout data, not Asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes asymptotes/L'Hopital, not Asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Peak Test: the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which interpretation of the displayed evidence correctly uses rational-function asymptotes?

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

- A. A line a graph approaches.
- B. Observations hidden until a model is frozen.
- C. Observed value minus model prediction.
- D. Vertical asymptotes t=+-2; horizontal asymptote R=3. Physical rainfall cannot become infinite at an ordinary forecast hour.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Asymptote, not Residual. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Holdout data, not Residual. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. observed value minus model prediction.
- D: This describes asymptotes/L'Hopital, not Residual. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Peak Test using new evidence: the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which interpretation of the displayed evidence correctly uses rational-function asymptotes?

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

- A. A line a graph approaches.
- B. Observed value minus model prediction.
- C. Vertical asymptotes t=+-2; horizontal asymptote R=3. Physical rainfall cannot become infinite at an ordinary forecast hour.
- D. Observations hidden until a model is frozen.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Asymptote, not Holdout data. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Residual, not Holdout data. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes asymptotes/L'Hopital, not Holdout data. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. observations hidden until a model is frozen.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Peak Test: the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which option correctly applies the mission concept to this follow-up case?

**Options - exact player copy:**

- A. The form is 0/0, so L=lim_(t->0)0.04e^(0.04t)/1=0.04.
- B. The form is 0/0, so differentiate only the numerator and use L=0.04/0.
- C. Substitute t=0 and report L=0 because the numerator is zero.
- D. Cancel t from the exponent and denominator to obtain L=e^0-1=0.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for the mission concept; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. The original ratio is 0/0, and the differentiated ratio approaches 0.04.
- B: L'Hopital's rule differentiates the denominator too; the derivative of t is 1. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: The original 0/0 form is indeterminate, not a value of zero. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: A factor outside an exponential cannot be canceled from its exponent. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Peak Test decision, the team knows this: the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (h)",
  "yLabel": "Reservoir response",
  "caption": "The response approaches a horizontal limit.",
  "series": [
    {
      "name": "Model",
      "points": [
        [
          0,
          0
        ],
        [
          1,
          5
        ],
        [
          2,
          7.5
        ],
        [
          3,
          8.8
        ],
        [
          4,
          9.4
        ],
        [
          5,
          9.7
        ]
      ]
    }
  ],
  "limit": {
    "at": 10,
    "label": "Long-run level"
  }
}
```


**Options - exact player copy:**

- A. A line a graph approaches.
- B. S'=12/[1+(t-4)^2], largest at 4; arctan -> pi/2. A smooth saturating curve can represent a storm band without an artificial infinite spike.
- C. Observed value minus model prediction.
- D. Observations hidden until a model is frozen.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Asymptote, not arctan derivative/asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. s'=12/[1+(t-4)^2], largest at 4; arctan -> pi/2. A smooth saturating curve can represent a storm band without an artificial infinite spike.
- C: This describes Residual, not arctan derivative/asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Holdout data, not arctan derivative/asymptote. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Peak Test to this follow-up: the earlier rational forecast was rejected because it became infinite at an ordinary time. A replacement exponential forecast is undefined at exactly zero hours, but its limiting starting rate may still be finite. Test that rate before the crew uses the model. Which interpretation of the displayed evidence correctly uses the mission concept?

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

- A. A line a graph approaches.
- B. Observed value minus model prediction.
- C. B residuals [0,1,0,1]; A residuals [4,11,12,10] form a missed crest. A model that fits training data but misses a patterned holdout crest cannot guide release.
- D. Observations hidden until a model is frozen.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Asymptote, not curve shape/model validation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Residual, not curve shape/model validation. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. b residuals [0,1,0,1]; A residuals [4,11,12,10] form a missed crest. A model that fits training data but misses a patterned holdout crest cannot guide release.
- D: This describes Holdout data, not curve shape/model validation. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 7 - The Wall's Carrying Limit

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 9 SHIFTS UNTIL THE STORM  
**Card title:** Count Every Cubic Metre  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** The crew knows how fast floodwater may arrive, but not yet how much water will arrive altogether. Add up the predicted inflow over the storm. Decide how much water must leave the reservoir beforehand so the dam has room to hold the flood.
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

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with estimate sampled inflow. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 25 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 25 | `trace-bench` | automatic**

**World state:** After 7.2 Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Nice work. Use the Stop 25 result to settle build exact accumulation."

**Unlocks/waypoint:** Unlock Stop 26 at `trace-bench` in Catchment & Inflow Desk.

**Beat 3 - After Stop 26 | `trace-bench` | automatic**

**World state:** Travel Location: INFLOW->STORE.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Imani Okoro: "Good thinking. Use the Stop 26 result to settle verify ftc part 2."

**Unlocks/waypoint:** Unlock Stop 27 at `trace-bench` in Catchment & Inflow Desk.

**Beat 4 - After Stop 27 | `water-ledger` | automatic**

**World state:** The verify ftc part 2 result remains visible while the separate signed change from physical volume fixture lights.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Imani Okoro: "Exactly right. Use the Stop 27 result to settle separate signed change from physical volume."

**Unlocks/waypoint:** Unlock Stop 28 at `water-ledger` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

**Question card story setup - exact player copy:** Because exact total matches the numerical scale, test the live accumulator A(x)=integral0^x I(t)dt. Because exact total matches the numerical scale, test the live accumulator A(x)=integral_0^x I(t)dt. Predict A'(12), advance the clock around hour 12, and compare the measured accumulation slope with inflow.

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

Mission decision: Draw down `5.28 million m^3` before the storm. The integral gives `17.28 million m^3` of inflow. And the plan also keeps `2.00 million m^3` of campaign safety room. The next task is finding a release mix that clears this volume without flooding the valley.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You saw through the trap. Your analysis established the point that matters: Draw down 5.28 million m^3 before the storm. The dam crew can now act with a calculation it trusts.

**Story event - exact player copy:** The storage board posts a 5.28-million-cubic-metre drawdown target.

TARGET `19:00`; auto `SAFE STORAGE +8`; canonical enter `77/68/72/85` -> `85/68/72/85`, award 12, allocate 8 Downstream, 4 Reserve -> `85/76/76/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Wall's Carrying Limit. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Wall's Carrying Limit, use I(t)=120+10t-(5/24)t^2 m3/s for 0<=t<=24 h. Which option correctly carries out the required Antiderivative reasoning?

**Options - exact player copy:**

- A. Rectangles approximating accumulated change.
- B. A function whose derivative is the integrand.
- C. Signed accumulation across bounds.
- D. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Antiderivative; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Riemann sum, not Antiderivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. a function whose derivative is the integrand.
- C: This describes Definite integral, not Antiderivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes L/R/trapezoid sums, not Antiderivative. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Wall's Carrying Limit: use I(t)=120+10t-(5/24)t^2 m3/s for 0<=t<=24 h. Which option correctly carries out the required Riemann sum reasoning?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Signed accumulation across bounds.
- C. Rectangles approximating accumulated change.
- D. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Riemann sum; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Antiderivative, not Riemann sum. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Definite integral, not Riemann sum. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. rectangles approximating accumulated change.
- D: This describes L/R/trapezoid sums, not Riemann sum. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Wall's Carrying Limit using new evidence: the current empty storage is 14.0 million m^3; storm inflow is 17.28 million m^3, and the campaign safety margin is 2.00 million m^3. The next action depends on selecting the conclusion that fits all of those facts. Which option correctly carries out the required Definite integral reasoning?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Rectangles approximating accumulated change.
- C. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.
- D. Signed accumulation across bounds.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Definite integral; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Antiderivative, not Definite integral. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Riemann sum, not Definite integral. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes L/R/trapezoid sums, not Definite integral. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. signed accumulation across bounds.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Wall's Carrying Limit: forecast flows at hours 0,5,10,15,20 are 100,150,200,250,300 m3/s. Which option correctly applies L/R/trapezoid sums to this follow-up case?

**Options - exact player copy:**

- A. For this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.
- B. A function whose derivative is the integrand.
- C. Rectangles approximating accumulated change.
- D. Signed accumulation across bounds.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for L/R/trapezoid sums; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. for this increasing curve, left underestimates and right overestimates; trapezoids average adjacent endpoints. Numerical accumulation brackets urgency before an exact model is integrated.
- B: This describes Antiderivative, not L/R/trapezoid sums. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Riemann sum, not L/R/trapezoid sums. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Definite integral, not L/R/trapezoid sums. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Wall's Carrying Limit decision, the team knows this: use I(t)=120+10t-(5/24)t^2 m3/s for 0<=t<=24 h. Which option correctly carries out the required antiderivatives/linearity/FTC/Riemann limit reasoning?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. The modeled storm adds 17,280,000 m^3. FTC converts the continuous forecast rate into total incoming volume.
- C. Rectangles approximating accumulated change.
- D. Signed accumulation across bounds.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for antiderivatives/linearity/FTC/Riemann limit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Antiderivative, not antiderivatives/linearity/FTC/Riemann limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. the modeled storm adds 17,280,000 m^3. FTC converts the continuous forecast rate into total incoming volume.
- C: This describes Riemann sum, not antiderivatives/linearity/FTC/Riemann limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Definite integral, not antiderivatives/linearity/FTC/Riemann limit. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Wall's Carrying Limit to this follow-up: because exact total matches the numerical scale, test the live accumulator A(x)=integral0^x I(t)dt. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which option correctly carries out the required accumulation derivative reasoning?

**Options - exact player copy:**

- A. A function whose derivative is the integrand.
- B. Rectangles approximating accumulated change.
- C. 120+10(12)-(5/24)(12^2)=210; both readings agree within 1 m^3/s. FTC Part 2 certifies that the totalizer and rate gauge describe the same water.
- D. Signed accumulation across bounds.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for accumulation derivative; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Antiderivative, not accumulation derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Riemann sum, not accumulation derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. 120+10(12)-(5/24)(12^2)=210; both readings agree within 1 m^3/s. FTC Part 2 certifies that the totalizer and rate gauge describe the same water.
- D: This describes Definite integral, not accumulation derivative. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 8 - The Just-Clears Release

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 8 SHIFTS UNTIL THE STORM  
**Card title:** Make Room Without Making a Flood  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the machine board.  
**Card body:** The reservoir needs another 5.28 million cubic metres of room, but releasing that water too quickly could flood communities below. Compare how much water different gate and turbine schedules send downstream. Choose a schedule that makes enough room without exceeding the downstream safety limits.
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

**World state:** The substitute the head term fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 8: SUBSTITUTE THE HEAD TERM OPEN

**Dialogue bubbles -** Nia Chen: "Start with substitute the head term. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 29 at `machine-board` in Powerhouse.

**Beat 2 - After Stop 29 | `machine-board` | automatic**

**World state:** After 8.2 Location: POWER.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Nia Chen: "Nice work. Use the Stop 29 result to settle verify turbine volume."

**Unlocks/waypoint:** Unlock Stop 30 at `machine-board` in Powerhouse.

**Beat 3 - After Stop 30 | `machine-board` | automatic**

**World state:** Travel Location: POWER->SAFE.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Nia Chen: "Good thinking. Use the Stop 30 result to settle total the signed surge."

**Unlocks/waypoint:** Unlock Stop 31 at `machine-board` in Powerhouse.

**Beat 4 - After Stop 31 | `dispatch-console` | automatic**

**World state:** The total the signed surge result remains visible while the allocate the just-clears plan fixture lights.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Nia Chen: "Exactly right. Use the Stop 31 result to settle allocate the just-clears plan."

**Unlocks/waypoint:** Unlock Stop 32 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `machine-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Use the mixed turbine-and-gate plan. Turbines clear `3.60 million m^3`. And the gate clears the remaining `1.68 million m^3` with warning and restart capacity protected. The plan fits downstream limits. The wall must now show it can carry the changing head.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Impressive work under pressure. The team can now act on a firm conclusion: Use the mixed turbine-and-gate plan. Your result keeps the reservoir plan both useful and safe.

**Story event - exact player copy:** The combined turbine-and-gate schedule creates the required storage while preserving downstream warnings.

TARGET `19:00`; auto `DOWNSTREAM +5`; canonical `85/76/76/85` -> `85/81/76/85`, award 12, allocate 7 Storage, 5 Downstream -> `92/86/76/85`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Just-Clears Release. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Just-Clears Release, turbine flow is Q(t)=200t(1+t^2)^2 m3/s for 0<=t<=2 h in a scaled test. Which option correctly applies Substitution to this follow-up case?

**Options - exact player copy:**

- A. Positive and negative contributions retained by sign.
- B. Replacing a repeated inner expression with one variable.
- C. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.
- D. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Substitution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Signed accumulation, not Substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. replacing a repeated inner expression with one variable.
- C: This describes u-substitution, not Substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes definite integral/unit conversion, not Substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Just-Clears Release: turbines clear 3.60 of the required 5.28 million m^3, leaving 1.68. Before the plan can proceed, divide the limited supply so every required use is covered. Which option correctly applies Signed accumulation to this follow-up case?

**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.
- C. Positive and negative contributions retained by sign.
- D. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Signed accumulation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Substitution, not Signed accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes u-substitution, not Signed accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. positive and negative contributions retained by sign.
- D: This describes definite integral/unit conversion, not Signed accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Just-Clears Release using new evidence: turbine flow is Q(t)=200t(1+t^2)^2 m3/s for 0<=t<=2 h in a scaled test. Which option correctly applies u-substitution to this follow-up case?

**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. Positive and negative contributions retained by sign.
- C. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for u-substitution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Substitution, not u-substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Signed accumulation, not u-substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes definite integral/unit conversion, not u-substitution. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. the scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Just-Clears Release: the operational schedule predicts a constant-equivalent turbine release of 125 m^3/s for 8.0 h. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which option correctly carries out the required definite integral/unit conversion reasoning?

**Options - exact player copy:**

- A. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.
- B. Replacing a repeated inner expression with one variable.
- C. Positive and negative contributions retained by sign.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for definite integral/unit conversion; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. 125*8*3600=3,600,000. Measured turbine volume determines the gate volume still needed.
- B: This describes Substitution, not definite integral/unit conversion. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Signed accumulation, not definite integral/unit conversion. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes u-substitution, not definite integral/unit conversion. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Just-Clears Release decision, the team knows this: turbine flow is Q(t)=200t(1+t^2)^2 m3/s for 0<=t<=2 h in a scaled test. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (min)",
  "yLabel": "Flow rate (m3/min)",
  "caption": "Signed area under the rate curve gives accumulated change.",
  "series": [
    {
      "name": "Net flow",
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
          3
        ],
        [
          3,
          0
        ],
        [
          4,
          -2
        ],
        [
          5,
          -1
        ]
      ]
    }
  ],
  "limit": {
    "at": 0,
    "label": "Zero flow"
  }
}
```


**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. Net=80/3; total=190/3 in scaled units. Flood exposure counts positive excess, while net signed change can hide a later reversal.
- C. Positive and negative contributions retained by sign.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Substitution, not velocity integral/total area. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. net=80/3; total=190/3 in scaled units. Flood exposure counts positive excess, while net signed change can hide a later reversal.
- C: This describes Signed accumulation, not velocity integral/total area. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes u-substitution, not velocity integral/total area. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Just-Clears Release to this follow-up: turbines clear 3.60 of the required 5.28 million m^3, leaving 1.68. Before the plan can proceed, divide the limited supply so every required use is covered. Which option correctly applies constrained accumulation to this follow-up case?

**Options - exact player copy:**

- A. Replacing a repeated inner expression with one variable.
- B. Positive and negative contributions retained by sign.
- C. All four funded exactly. A mathematically sufficient release is unusable without warning and restart capacity.
- D. The scaled accumulation is 12400/3. Substitution turns linked head response into a usable released volume.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for constrained accumulation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Substitution, not constrained accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Signed accumulation, not constrained accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. all four funded exactly. A mathematically sufficient release is unusable without warning and restart capacity.
- D: This describes u-substitution, not constrained accumulation. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 9 - The Seepage Ledger Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 7 SHIFTS UNTIL THE STORM  
**Card title:** The Silent Heads  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the uplift wall.  
**Card body:** Two pressure gauges beneath the dam have stopped reporting just as the water load is changing. Use the remaining measurements to estimate the missing pressure changes. Decide whether the crew can continue controlled releases without putting the dam wall at risk.
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

**World state:** Arrival Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with read the pressure field. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 33 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 2 - After Stop 33 | `uplift-wall` | automatic**

**World state:** After 9.2 Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Nice work. Use the Stop 33 result to settle step through the gap."

**Unlocks/waypoint:** Unlock Stop 34 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 3 - After Stop 34 | `transect-rack` | automatic**

**World state:** Travel Location: STRUCT->GATES.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Arun Mehta: "Good thinking. Use the Stop 34 result to settle test step-size sensitivity."

**Unlocks/waypoint:** Unlock Stop 35 at `transect-rack` in Seepage & Uplift Bay.

**Beat 4 - After Stop 35 | `uplift-wall` | automatic**

**World state:** The test step-size sensitivity result remains visible while the diagnose silence fixture lights.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Arun Mehta: "Exactly right. Use the Stop 35 result to settle diagnose silence."

**Unlocks/waypoint:** Unlock Stop 36 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `uplift-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Continue controlled release tests. Euler estimates agree with independent live readings. And the two silent gauges share one failed cable. The crew replaces that cable. And bounds the uplift load.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a careful and clever call. You replaced uncertainty with a defensible result: Continue controlled release tests. People downstream have a stronger margin of safety tonight.

**Story event - exact player copy:** The reconstructed pressure path matches the live gauges, so controlled release testing continues.

TARGET `18:00`; auto `INTEGRITY +6 | RESERVE -3`; canonical `92/86/76/85` -> `92/86/73/91`, award 12, allocate 9 Integrity, 3 Reserve -> `92/86/76/100`; Integrity not yet locked.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Seepage Ledger Rule. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Seepage Ledger Rule, uplift obeys dP/dh=0.4(8-P) in scaled units. Sample the locations in order now so the crew can identify where the system first departs from normal. Which statistical conclusion or procedure correctly uses Slope field?

**Options - exact player copy:**

- A. A constant solution where slope is zero.
- B. Short segments showing a differential equation's slope at many points.
- C. Repeated tangent-line steps.
- D. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Slope field; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Equilibrium solution, not Slope field. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. short segments showing a differential equation's slope at many points.
- C: This describes Euler's method, not Slope field. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes slope fields/equilibrium, not Slope field. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Seepage Ledger Rule: uplift obeys dP/dh=0.4(8-P) in scaled units. Sample the locations in order now so the crew can identify where the system first departs from normal. Which option correctly applies Equilibrium solution to this follow-up case?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. Repeated tangent-line steps.
- C. A constant solution where slope is zero.
- D. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Equilibrium solution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Slope field, not Equilibrium solution. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Euler's method, not Equilibrium solution. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. a constant solution where slope is zero.
- D: This describes slope fields/equilibrium, not Equilibrium solution. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Seepage Ledger Rule using new evidence: the last live value is P(0)=4.0, and dP/dh=0.4(8-P). Which option correctly carries out the required Euler's method reasoning?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. A constant solution where slope is zero.
- C. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.
- D. Repeated tangent-line steps.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Euler's method; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Slope field, not Euler's method. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Equilibrium solution, not Euler's method. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes slope fields/equilibrium, not Euler's method. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. repeated tangent-line steps.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Seepage Ledger Rule: uplift obeys dP/dh=0.4(8-P) in scaled units. Sample the locations in order now so the crew can identify where the system first departs from normal. Which statistical conclusion or procedure correctly uses slope fields/equilibrium?

**Options - exact player copy:**

- A. Toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.
- B. Short segments showing a differential equation's slope at many points.
- C. A constant solution where slope is zero.
- D. Repeated tangent-line steps.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for slope fields/equilibrium; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. toward 8; equilibrium P=8. Field direction can bound the silent readings before exact solving.
- B: This describes Slope field, not slope fields/equilibrium. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Equilibrium solution, not slope fields/equilibrium. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Euler's method, not slope fields/equilibrium. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Seepage Ledger Rule decision, the team knows this: the last live value is P(0)=4.0, and dP/dh=0.4(8-P). Which option correctly carries out the required Euler method reasoning?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. Euler gives P(1.0)=5.44. A stepwise prediction can be compared with independent seepage evidence.
- C. A constant solution where slope is zero.
- D. Repeated tangent-line steps.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Euler method; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Slope field, not Euler method. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. euler gives P(1.0)=5.44. A stepwise prediction can be compared with independent seepage evidence.
- C: This describes Equilibrium solution, not Euler method. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Euler's method, not Euler method. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Seepage Ledger Rule to this follow-up: because two coarse Euler steps give 5.44, rerun with Delta h=0.25 m while the same equation and initial value remain fixed. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which option correctly carries out the required Euler error/control reasoning?

**Options - exact player copy:**

- A. Short segments showing a differential equation's slope at many points.
- B. A constant solution where slope is zero.
- C. As stated. Changing only step size tests numerical approximation rather than wall behavior.
- D. Repeated tangent-line steps.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Euler error/control; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Slope field, not Euler error/control. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Equilibrium solution, not Euler error/control. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. as stated. Changing only step size tests numerical approximation rather than wall behavior.
- D: This describes Euler's method, not Euler error/control. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 10 - The Error Carried Into Volume

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 6 SHIFTS UNTIL THE STORM  
**Card title:** Settle or Grow  
**Go now:** Go to Seepage & Uplift Bay and meet Arun Mehta, structural engineer, at the weir bench.  
**Card body:** A broken cable explains the silent gauges, but water leaking through the dam still needs watching. Compare predictions of how that seepage changes under continued pressure. Decide how much water the reservoir can safely hold without the leakage becoming dangerous.
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

**World state:** Arrival Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Start with separate the seepage equation. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 37 at `weir-bench` in Seepage & Uplift Bay.

**Beat 2 - After Stop 37 | `weir-bench` | automatic**

**World state:** After 10.2 Location: STRUCT.

**Panel/HUD text:** STRUCT

**Dialogue bubbles -** Arun Mehta: "Nice work. Use the Stop 37 result to settle select the model."

**Unlocks/waypoint:** Unlock Stop 38 at `weir-bench` in Seepage & Uplift Bay.

**Beat 3 - After Stop 38 | `drain-console` | automatic**

**World state:** Travel Location: STRUCT->STORE.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Arun Mehta: "Good thinking. Use the Stop 38 result to settle transfer to cooling."

**Unlocks/waypoint:** Unlock Stop 39 at `drain-console` in Seepage & Uplift Bay.

**Beat 4 - After Stop 39 | `uplift-wall` | automatic**

**World state:** The transfer to cooling result remains visible while the approve the carrying limit fixture lights.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Arun Mehta: "Exactly right. Use the Stop 39 result to settle approve the carrying limit."

**Unlocks/waypoint:** Unlock Stop 40 at `uplift-wall` in Seepage & Uplift Bay.

**Beat 5 - At mission end | `weir-bench` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Arun Mehta: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You gave the team the breakthrough it needed. The mission now has its answer: Approve the wall seepage limit. The storm plan is sharper because you followed how the water actually changes.

**Story event - exact player copy:** The seepage forecast stays below the structural limit and clears the wall hold.

TARGET `18:00`; auto `INTEGRITY +5` clamped at 100; canonical `92/86/76/100`, award 12, allocate 8 Storage, 4 Reserve -> `100/86/80/100`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Error Carried Into Volume. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Error Carried Into Volume, excess seepage S follows dS/dt=-0.30S per hour with S(0)=12 L/min. Which option correctly applies Differential equation to this follow-up case?

**Options - exact player copy:**

- A. One known point selecting a particular solution.
- B. An equation involving a function and its rate.
- C. Limiting level in a logistic model.
- D. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Differential equation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Initial condition, not Differential equation. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. an equation involving a function and its rate.
- C: This describes Carrying capacity, not Differential equation. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes separation/initial condition, not Differential equation. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Error Carried Into Volume: excess seepage S follows dS/dt=-0.30S per hour with S(0)=12 L/min. Which option correctly applies Initial condition to this follow-up case?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. Limiting level in a logistic model.
- C. One known point selecting a particular solution.
- D. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Initial condition; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Differential equation, not Initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Carrying capacity, not Initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. one known point selecting a particular solution.
- D: This describes separation/initial condition, not Initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Error Carried Into Volume using new evidence: the observed decay constant is k=-0.30+-0.05 h^-1, and approval requires excess seepage below 5.0 L/min after 4 h, inclusive. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which option correctly applies Carrying capacity to this follow-up case?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. One known point selecting a particular solution.
- C. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.
- D. Limiting level in a logistic model.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Carrying capacity; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Differential equation, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Initial condition, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes separation/initial condition, not Carrying capacity. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. limiting level in a logistic model.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Error Carried Into Volume: excess seepage S follows dS/dt=-0.30S per hour with S(0)=12 L/min. Which option correctly applies separation/initial condition to this follow-up case?

**Options - exact player copy:**

- A. S(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.
- B. An equation involving a function and its rate.
- C. One known point selecting a particular solution.
- D. Limiting level in a logistic model.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for separation/initial condition; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. s(4)=12e^-1.2=3.614 L/min. A negative constant should produce measured decay rather than hidden growth.
- B: This describes Differential equation, not separation/initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Initial condition, not separation/initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Carrying capacity, not separation/initial condition. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Error Carried Into Volume decision, the team knows this: the measured excess is 12.0, 8.9, 6.6, 4.9, 3.6 L/min at hours 0-4. Which option correctly applies exponential/logistic/Newton models to this follow-up case?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. Ratios are near e^-0.3; values approach zero. The correct mechanism determines whether continued head makes the wall safer or worse.
- C. One known point selecting a particular solution.
- D. Limiting level in a logistic model.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for exponential/logistic/Newton models; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Differential equation, not exponential/logistic/Newton models. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. ratios are near e^-0.3; values approach zero. The correct mechanism determines whether continued head makes the wall safer or worse.
- C: This describes Initial condition, not exponential/logistic/Newton models. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Carrying capacity, not exponential/logistic/Newton models. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Error Carried Into Volume to this follow-up: because seepage approaches zero, compare a sensor at 70 C cooling toward a 20 C room. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which option correctly applies Newton cooling to this follow-up case?

**Options - exact player copy:**

- A. An equation involving a function and its rate.
- B. One known point selecting a particular solution.
- C. Ambient sets limit. A nonzero equilibrium separates Newton cooling from simple decay.
- D. Limiting level in a logistic model.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Newton cooling; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Differential equation, not Newton cooling. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Initial condition, not Newton cooling. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. ambient sets limit. A nonzero equilibrium separates Newton cooling from simple decay.
- D: This describes Carrying capacity, not Newton cooling. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 11 - The Quiet-Day Check

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 5 SHIFTS UNTIL THE STORM  
**Card title:** The Reservoir Is Smaller  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the resurveyed curve.  
**Card body:** New measurements show that the reservoir holds less water at a given height than the old chart claims. That could leave less room for the storm than the crew expects. Calculate the missing capacity and decide whether the official chart must be replaced.
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

**World state:** The integrate lost capacity fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 11: INTEGRATE LOST CAPACITY OPEN

**Dialogue bubbles -** Mara Vale: "Start with integrate lost capacity. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 41 at `storage-board` in Storage & Level Board.

**Beat 2 - After Stop 41 | `level-desk` | automatic**

**World state:** After 11.2 Location: STORE.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mara Vale: "Nice work. Use the Stop 41 result to settle compute average loss."

**Unlocks/waypoint:** Unlock Stop 42 at `level-desk` in Storage & Level Board.

**Beat 3 - After Stop 42 | `survey-rack` | automatic**

**World state:** Travel1 Location: STORE->STRUCT.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mara Vale: "Good thinking. Use the Stop 42 result to settle verify independent transects."

**Unlocks/waypoint:** Unlock Stop 43 at `survey-rack` in Storage & Level Board.

**Beat 4 - After Stop 43 | `level-desk` | automatic**

**World state:** Travel2 Location: STRUCT->GATES.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mara Vale: "Exactly right. Use the Stop 43 result to settle convert volume loss to level rate."

**Unlocks/waypoint:** Unlock Stop 44 at `level-desk` in Storage & Level Board.

**Beat 5 - At mission end | `storage-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Vale: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Brilliant analysis. You found the result the team needed: Replace the 2003 storage curve. Ashfell has more protection from the storm.

**Story event - exact player copy:** The corrected storage curve replaces the outdated 2003 chart in the control room.

TARGET `19:00`; auto `STORAGE -10 | INTEGRITY -4`; canonical `100/86/80/100` -> `90/86/80/96`, award 12, allocate 10 Storage, 2 Integrity -> `100/86/80/98`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Quiet-Day Check. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Quiet-Day Check, old minus new storage density is d(h)=6-h million cubic metres per metre for 2<=h<=5, and the curves cross at h=6. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (h)",
  "yLabel": "Flow rate (m3/s)",
  "caption": "Inflow and release cross before separating again.",
  "series": [
    {
      "name": "Inflow",
      "points": [
        [
          0,
          20
        ],
        [
          1,
          28
        ],
        [
          2,
          34
        ],
        [
          3,
          30
        ],
        [
          4,
          22
        ]
      ]
    },
    {
      "name": "Release",
      "points": [
        [
          0,
          25
        ],
        [
          1,
          26
        ],
        [
          2,
          28
        ],
        [
          3,
          30
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

- A. Constant height with the same accumulated area.
- B. Integral of top minus bottom, split at crossings.
- C. Cross-sectional disk with a hole.
- D. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Average value, not Area between curves. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. integral of top minus bottom, split at crossings.
- C: This describes Washer, not Area between curves. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes area between curves/crossings, not Area between curves. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Quiet-Day Check: with 7.5 million m^3 lost over a 3 m operating interval, compute the average capacity error per metre. Which option correctly applies Average value to this follow-up case?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Cross-sectional disk with a hole.
- C. Constant height with the same accumulated area.
- D. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Average value; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Area between curves, not Average value. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Washer, not Average value. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. constant height with the same accumulated area.
- D: This describes area between curves/crossings, not Average value. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Quiet-Day Check using new evidence: old minus new storage density is d(h)=6-h million cubic metres per metre for 2<=h<=5, and the curves cross at h=6. Which option correctly carries out the required Washer reasoning?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Constant height with the same accumulated area.
- C. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.
- D. Cross-sectional disk with a hole.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Washer; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Area between curves, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Average value, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes area between curves/crossings, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. cross-sectional disk with a hole.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Quiet-Day Check: old minus new storage density is d(h)=6-h million cubic metres per metre for 2<=h<=5, and the curves cross at h=6. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (h)",
  "yLabel": "Flow rate (m3/s)",
  "caption": "Inflow and release cross before separating again.",
  "series": [
    {
      "name": "Inflow",
      "points": [
        [
          0,
          20
        ],
        [
          1,
          28
        ],
        [
          2,
          34
        ],
        [
          3,
          30
        ],
        [
          4,
          22
        ]
      ]
    },
    {
      "name": "Release",
      "points": [
        [
          0,
          25
        ],
        [
          1,
          26
        ],
        [
          2,
          28
        ],
        [
          3,
          30
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

- A. Lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.
- B. Integral of top minus bottom, split at crossings.
- C. Constant height with the same accumulated area.
- D. Cross-sectional disk with a hole.

**Correct answer:** A

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: Correct. lost capacity is 7.5 million m^3. Area between the curves is storage capacity lost to silt.
- B: This describes Area between curves, not area between curves/crossings. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Average value, not area between curves/crossings. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Washer, not area between curves/crossings. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Quiet-Day Check decision, the team knows this: with 7.5 million m^3 lost over a 3 m operating interval, compute the average capacity error per metre. Which option correctly applies average value/splitting to this follow-up case?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Average preserves the integral but not pointwise change. Average value summarizes total loss but not local sensitivity.
- C. Constant height with the same accumulated area.
- D. Cross-sectional disk with a hole.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for average value/splitting; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Area between curves, not average value/splitting. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. average preserves the integral but not pointwise change. Average value summarizes total loss but not local sensitivity.
- C: This describes Average value, not average value/splitting. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Washer, not average value/splitting. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Quiet-Day Check to this follow-up: because the integrated loss is large, verify the resurvey's identity, timing, and physical control with a limit of three record checks. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which option correctly applies evidence independence to this follow-up case?

**Options - exact player copy:**

- A. Integral of top minus bottom, split at crossings.
- B. Constant height with the same accumulated area.
- C. Independent transects and calibration support real silt loss. Independent physical records decide whether curve disagreement is real or clerical.
- D. Cross-sectional disk with a hole.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for evidence independence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Area between curves, not evidence independence. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Average value, not evidence independence. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. independent transects and calibration support real silt loss. Independent physical records decide whether curve disagreement is real or clerical.
- D: This describes Washer, not evidence independence. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 12 - The Decay Constant, Scored

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 4 SHIFTS UNTIL THE STORM  
**Card title:** What the Steel Can Do  
**Go now:** Go to Powerhouse and meet Nia Chen, power dispatcher, at the crated runner.  
**Card body:** The smaller reservoir leaves less room for error, and one turbine wheel is unavailable. Calculate the space inside the remaining water passages and the energy needed to move water and open gates. Choose a release schedule the working machinery can actually carry out.
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

**World state:** The compute the missing runner volume fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 12: COMPUTE THE MISSING RUNNER VOLUME OPEN

**Dialogue bubbles -** Nia Chen: "Start with compute the missing runner volume. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 45 at `runner-crate` in Powerhouse.

**Beat 2 - After Stop 45 | `runner-crate` | automatic**

**World state:** Travel1 Location: POWER->GATES.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Nia Chen: "Nice work. Use the Stop 45 result to settle compare the shell setup."

**Unlocks/waypoint:** Unlock Stop 46 at `runner-crate` in Powerhouse.

**Beat 3 - After Stop 46 | `work-meter` | automatic**

**World state:** After 12.3 Location: GATES.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Nia Chen: "Good thinking. Use the Stop 46 result to settle measure hoist work."

**Unlocks/waypoint:** Unlock Stop 47 at `work-meter` in Powerhouse.

**Beat 4 - After Stop 47 | `dispatch-console` | automatic**

**World state:** Travel2 Location: GATES->STORE.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Nia Chen: "Exactly right. Use the Stop 47 result to settle choose feasible schedule."

**Unlocks/waypoint:** Unlock Stop 48 at `dispatch-console` in Powerhouse.

**Beat 5 - At mission end | `runner-crate` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Nia Chen: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You turned a difficult clue into a clear decision. Your work produced a sound decision: Use one runner and move each gate in stages. The dam crew can now act with a calculation it trusts.

**Story event - exact player copy:** One turbine runner and staged gate movements complete the release within mechanical limits.

TARGET `19:00`; auto `RESERVE +7`; canonical `100/86/80/98` -> `100/86/87/98`, award 12, allocate 10 Downstream, 2 Integrity -> `100/96/87/100`.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Decay Constant, Scored. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Decay Constant, Scored, the runner passage is generated by rotating outer radius R(x)=2 m and inner radius r(x)=x/2 m for 0<=x<=2 m. Which option correctly applies Disk to this follow-up case?

**Options - exact player copy:**

- A. Circular cross-section with an inner hole.
- B. Circular cross-section with no hole.
- C. Thin cylindrical layer.
- D. Accumulated force through distance.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Disk; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Washer, not Disk. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. circular cross-section with no hole.
- C: This describes Shell, not Disk. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Work, not Disk. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Decay Constant, Scored: the runner passage is generated by rotating outer radius R(x)=2 m and inner radius r(x)=x/2 m for 0<=x<=2 m. Which option correctly carries out the required Washer reasoning?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Thin cylindrical layer.
- C. Circular cross-section with an inner hole.
- D. Accumulated force through distance.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Washer; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Disk, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Shell, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. circular cross-section with an inner hole.
- D: This describes Work, not Washer. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Decay Constant, Scored using new evidence: because washers quantify the runner, a cylindrical gate recess formed by rotating y=3-x about the y-axis for 0<=x<=3 now needs a setup. The next action depends on selecting the conclusion that fits all of those facts. Which option correctly carries out the required Shell reasoning?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Circular cross-section with an inner hole.
- C. Accumulated force through distance.
- D. Thin cylindrical layer.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Shell; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Disk, not Shell. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Washer, not Shell. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Work, not Shell. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. thin cylindrical layer.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Decay Constant, Scored: the seal acts like a spring with campaign test stiffness k=8000 N/m over 0.30 m, plus constant 1200 N friction. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which option correctly applies Work to this follow-up case?

**Options - exact player copy:**

- A. Accumulated force through distance.
- B. Circular cross-section with no hole.
- C. Circular cross-section with an inner hole.
- D. Thin cylindrical layer.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Work; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. accumulated force through distance.
- B: This describes Disk, not Work. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Washer, not Work. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Shell, not Work. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Decay Constant, Scored decision, the team knows this: the runner passage is generated by rotating outer radius R(x)=2 m and inner radius r(x)=x/2 m for 0<=x<=2 m. Which option correctly carries out the required disk/washer volume reasoning?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Runner passage volume is 22pi/3 = 23.038 m^3. Passage volume quantifies the turbine capacity the revised schedule has lost.
- C. Circular cross-section with an inner hole.
- D. Thin cylindrical layer.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for disk/washer volume; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Disk, not disk/washer volume. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. runner passage volume is 22pi/3 = 23.038 m^3. Passage volume quantifies the turbine capacity the revised schedule has lost.
- C: This describes Washer, not disk/washer volume. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Shell, not disk/washer volume. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Decay Constant, Scored to this follow-up: because washers quantify the runner, a cylindrical gate recess formed by rotating y=3-x about the y-axis for 0<=x<=3 now needs a setup. The next action depends on selecting the conclusion that fits all of those facts. Which option correctly carries out the required shell versus washer reasoning?

**Options - exact player copy:**

- A. Circular cross-section with no hole.
- B. Circular cross-section with an inner hole.
- C. 2pi integral_0^3 x(3-x)dx=9pi m^3. The correct slice orientation prevents a costly geometry error.
- D. Thin cylindrical layer.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for shell versus washer; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Disk, not shell versus washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Washer, not shell versus washer. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. 2pi integral_0^3 x(3-x)dx=9pi m^3. The correct slice orientation prevents a costly geometry error.
- D: This describes Shell, not shell versus washer. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 13 - The Three-Before-Nine Order

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 3 SHIFTS UNTIL THE STORM  
**Card title:** Carry the Error Honestly  
**Go now:** Go to Storage & Level Board and meet Mara Vale, operations chief, at the level desk.  
**Card body:** The revised release schedule looks safe, but every water-height and flow measurement has some error. Test how those errors change the predicted result and whether several sensors share one fault. Decide whether the crew has enough reliable evidence to approve the schedule.
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

**World state:** The linearize level error fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 13: LINEARIZE LEVEL ERROR OPEN

**Dialogue bubbles -** Mara Vale: "Start with linearize level error. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 49 at `level-desk` in Storage & Level Board.

**Beat 2 - After Stop 49 | `storage-board` | automatic**

**World state:** After 13.2 Location: STORE.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Mara Vale: "Nice work. Use the Stop 49 result to settle refuse the lowest rms."

**Unlocks/waypoint:** Unlock Stop 50 at `storage-board` in Storage & Level Board.

**Beat 3 - After Stop 50 | `control-bench` | automatic**

**World state:** Travel1 Location: STORE->STRUCT.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Mara Vale: "Good thinking. Use the Stop 50 result to settle break the two-control degeneracy."

**Unlocks/waypoint:** Unlock Stop 51 at `control-bench` in Storage & Level Board.

**Beat 4 - After Stop 51 | `storage-board` | automatic**

**World state:** Travel2 Location: STRUCT->INFLOW.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Mara Vale: "Exactly right. Use the Stop 51 result to settle diagnose the signed rules."

**Unlocks/waypoint:** Unlock Stop 52 at `storage-board` in Storage & Level Board.

**Beat 5 - At mission end | `level-desk` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Mara Vale: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was first-rate reasoning. You pinned down the governing result: Sign the new release rules. Your result keeps the reservoir plan both useful and safe.

**Story event - exact player copy:** The chief engineer signs the corrected release rules after every uncertainty check passes.

TARGET `20:00`; auto `INTEGRITY +12` clamped and lock at 100; canonical `100/96/87/100`, award 12, allocate 4 Downstream, 8 Reserve -> `100/100/95/100`; Downstream is not locked yet.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Three-Before-Nine Order. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Three-Before-Nine Order, the corrected storage curve has dV/dh=2.0 million m3/m, and level uncertainty is ±0.015 m. Carry each uncertainty into the final result now so the team can choose the measurement that would reduce the decision risk. Which option correctly carries out the required Linearization reasoning?

**Options - exact player copy:**

- A. Output uncertainty caused by input uncertainty.
- B. Tangent-line estimate of a nearby output.
- C. Two parameter choices fitting the same evidence.
- D. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Linearization; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Propagated error, not Linearization. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. tangent-line estimate of a nearby output.
- C: This describes Degeneracy, not Linearization. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes linear approximation/error budget, not Linearization. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Three-Before-Nine Order: the corrected storage curve has dV/dh=2.0 million m3/m, and level uncertainty is ±0.015 m. Carry each uncertainty into the final result now so the team can choose the measurement that would reduce the decision risk. Which statistical conclusion or procedure correctly uses Propagated error?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Two parameter choices fitting the same evidence.
- C. Output uncertainty caused by input uncertainty.
- D. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Propagated error; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Linearization, not Propagated error. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Degeneracy, not Propagated error. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. output uncertainty caused by input uncertainty.
- D: This describes linear approximation/error budget, not Propagated error. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Three-Before-Nine Order using new evidence: trapezoidal accumulation is accepted, but storage totals can still be matched by a level offset b or scale factor s. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which option correctly applies Degeneracy to this follow-up case?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Output uncertainty caused by input uncertainty.
- C. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Degeneracy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Linearization, not Degeneracy. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Propagated error, not Degeneracy. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes linear approximation/error budget, not Degeneracy. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. two parameter choices fitting the same evidence.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Three-Before-Nine Order: the corrected storage curve has dV/dh=2.0 million m3/m, and level uncertainty is ±0.015 m. Carry each uncertainty into the final result now so the team can choose the measurement that would reduce the decision risk. Which statistical conclusion or procedure correctly uses linear approximation/error budget?

**Options - exact player copy:**

- A. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.
- B. Tangent-line estimate of a nearby output.
- C. Output uncertainty caused by input uncertainty.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for linear approximation/error budget; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. 2.0*.015=.030<.10; improve level. Only an error large enough to consume the margin can reverse authorization.
- B: This describes Linearization, not linear approximation/error budget. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Propagated error, not linear approximation/error budget. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Degeneracy, not linear approximation/error budget. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Three-Before-Nine Order decision, the team knows this: because level error is tolerable, compare residuals from left, right, and trapezoidal accumulation against independent totals. Which statistical conclusion or procedure correctly uses approximation error/sum accuracy?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Small alternating residuals survive holdout; left/right directional errors track changing curve. A repeated sign would push every release decision in the same unsafe direction.
- C. Output uncertainty caused by input uncertainty.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for approximation error/sum accuracy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Linearization, not approximation error/sum accuracy. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. small alternating residuals survive holdout; left/right directional errors track changing curve. A repeated sign would push every release decision in the same unsafe direction.
- C: This describes Propagated error, not approximation error/sum accuracy. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Degeneracy, not approximation error/sum accuracy. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Three-Before-Nine Order to this follow-up: trapezoidal accumulation is accepted, but storage totals can still be matched by a level offset b or scale factor s. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which option correctly applies sensitivity/systematics to this follow-up case?

**Options - exact player copy:**

- A. Tangent-line estimate of a nearby output.
- B. Output uncertainty caused by input uncertainty.
- C. Volume alone is degenerate; uplift fixes offset. A second physical constraint prevents two adjustable errors from sharing one apparent fix.
- D. Two parameter choices fitting the same evidence.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for sensitivity/systematics; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Linearization, not sensitivity/systematics. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Propagated error, not sensitivity/systematics. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. volume alone is degenerate; uplift fixes offset. A second physical constraint prevents two adjustable errors from sharing one apparent fix.
- D: This describes Degeneracy, not sensitivity/systematics. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 14 - The Lead-Time Rule

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** 2 SHIFTS UNTIL THE STORM  
**Card title:** Four Dark Sirens  
**Go now:** Go to Downstream Warning Desk and meet Elise Baptiste, downstream safety lead, at the siren repeater panel.  
**Card body:** The dam and machinery checks pass, but four downstream communities did not receive the test alarm. Water cannot be released safely while those warnings fail. Choose which faults to repair first and estimate the delay, then decide whether every community will receive enough warning.
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

**World state:** The find the repair optimum fixture wakes and the mission evidence opens.

**Panel/HUD text:** MISSION 14: FIND THE REPAIR OPTIMUM OPEN

**Dialogue bubbles -** Elise Baptiste: "Start with find the repair optimum. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 53 at `arrival-map` in Downstream Warning Desk.

**Beat 2 - After Stop 53 | `settlement-circuits` | automatic**

**World state:** After 14.2 Location: SAFE.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Elise Baptiste: "Nice work. Use the Stop 53 result to settle order settlements by consequence."

**Unlocks/waypoint:** Unlock Stop 54 at `settlement-circuits` in Downstream Warning Desk.

**Beat 3 - After Stop 54 | `arrival-map` | automatic**

**World state:** Travel1 Location: SAFE->INFLOW.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Elise Baptiste: "Good thinking. Use the Stop 54 result to settle update the delayed forecast."

**Unlocks/waypoint:** Unlock Stop 55 at `arrival-map` in Downstream Warning Desk.

**Beat 4 - After Stop 55 | `radio-desk` | automatic**

**World state:** Travel2 Location: INFLOW->GATES.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Elise Baptiste: "Exactly right. Use the Stop 55 result to settle commit repaired warning trigger."

**Unlocks/waypoint:** Unlock Stop 56 at `radio-desk` in Downstream Warning Desk.

**Beat 5 - At mission end | `arrival-map` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Elise Baptiste: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You kept your head when the evidence became difficult. The evidence now points to one clear action: Every reach below the dam is ready. People downstream have a stronger margin of safety tonight.

**Story event - exact player copy:** Repair crews restore all four settlement warning circuits before the release begins.

TARGET `18:00`; auto `DOWNSTREAM +10` then visible failure `-8`, repair returns `+8` and locks at 100; canonical `100/100/95/100`, net clamped `100/100/95/100`, award 12, allocate 5 Reserve and bank 7 -> `100/100/100/100`, bank 7.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Lead-Time Rule. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Lead-Time Rule, repair benefit is R(x)=18x-x^2 and coordination cost is C(x)=2x+8, where x crews can range from 0 to 6. Which option correctly applies Constraint to this follow-up case?

**Options - exact player copy:**

- A. The quantity optimized.
- B. A requirement a solution must satisfy.
- C. A choice satisfying every constraint.
- D. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Constraint; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Objective function, not Constraint. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. a requirement a solution must satisfy.
- C: This describes Feasible point, not Constraint. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes optimization/marginal value, not Constraint. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Lead-Time Rule: repair benefit is R(x)=18x-x^2 and coordination cost is C(x)=2x+8, where x crews can range from 0 to 6. Which option correctly applies Objective function to this follow-up case?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. A choice satisfying every constraint.
- C. The quantity optimized.
- D. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Objective function; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Constraint, not Objective function. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Feasible point, not Objective function. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. the quantity optimized.
- D: This describes optimization/marginal value, not Objective function. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Lead-Time Rule using new evidence: repair benefit is R(x)=18x-x^2 and coordination cost is C(x)=2x+8, where x crews can range from 0 to 6. Which option correctly applies Feasible point to this follow-up case?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. The quantity optimized.
- C. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.
- D. A choice satisfying every constraint.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Feasible point; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Constraint, not Feasible point. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Objective function, not Feasible point. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes optimization/marginal value, not Feasible point. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. a choice satisfying every constraint.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Lead-Time Rule: repair benefit is R(x)=18x-x^2 and coordination cost is C(x)=2x+8, where x crews can range from 0 to 6. Which option correctly applies optimization/marginal value to this follow-up case?

**Options - exact player copy:**

- A. Unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.
- B. A requirement a solution must satisfy.
- C. The quantity optimized.
- D. A choice satisfying every constraint.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for optimization/marginal value; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. unconstrained critical point 8 lies outside [0,6], so endpoints control. The optimum sets the fastest useful repair without wasting scarce operators.
- B: This describes Constraint, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes Objective function, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Feasible point, not optimization/marginal value. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Lead-Time Rule decision, the team knows this: with six crews fixed, sort four dark circuits by arrival and closure: Road 280 min, School 310, Caravan 350, Village 410. Rank the cases now so limited time goes first to the failures that can change the mission decision. Which option correctly applies constrained decision/extrema to this follow-up case?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. Road and School. Earliest binding deadlines determine a safe schedule.
- C. The quantity optimized.
- D. A choice satisfying every constraint.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for constrained decision/extrema; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Constraint, not constrained decision/extrema. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. road and School. Earliest binding deadlines determine a safe schedule.
- C: This describes Objective function, not constrained decision/extrema. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes Feasible point, not constrained decision/extrema. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Lead-Time Rule to this follow-up: repairs delay release by 1.0 h, so update dH/dt=0.20(5-H) from H(0)=4.20 m. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which option correctly carries out the required Euler/logistic delay reasoning?

**Options - exact player copy:**

- A. A requirement a solution must satisfy.
- B. The quantity optimized.
- C. 4.36 m. The delayed start must use a numerical forecast consistent with the same differential model.
- D. A choice satisfying every constraint.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Euler/logistic delay; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Constraint, not Euler/logistic delay. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes Objective function, not Euler/logistic delay. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. 4.36 m. The delayed start must use a numerical forecast consistent with the same differential model.
- D: This describes Feasible point, not Euler/logistic delay. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review
- The player can use today’s main model in the next decision.
- **Mission takeaway:** Evidence must match the mechanism, units, and stated limits.

---

# Mission 15 - The Corrected Release Rules, Signed

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** FINAL SHIFT - STORM EDGE ON THE RIDGE  
**Card title:** Open, Hold, Verify  
**Go now:** Go to Catchment & Inflow Desk and meet Imani Okoro, catchment hydrologist, at the gauge wall.  
**Card body:** The dam, warning system, and machinery are ready, but a small change in water depth can now cause a large change in flow through the gates. Bring together your earlier calculations. Carry out the release in stages, checking that each one stays within the agreed safety limits.
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

**World state:** Arrival Location: INFLOW.

**Panel/HUD text:** INFLOW

**Dialogue bubbles -** Imani Okoro: "Start with rebuild the release bound. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 57 at `gauge-wall` in Catchment & Inflow Desk.

**Beat 2 - After Stop 57 | `water-ledger` | automatic**

**World state:** Travel1 Location: INFLOW->STORE.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Imani Okoro: "Nice work. Use the Stop 57 result to settle close the final water ledger."

**Unlocks/waypoint:** Unlock Stop 58 at `water-ledger` in Catchment & Inflow Desk.

**Beat 3 - After Stop 58 | `staging-console` | automatic**

**World state:** Travel2 Location: STORE->GATES.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Imani Okoro: "Good thinking. Use the Stop 58 result to settle predict and operate the staged release."

**Unlocks/waypoint:** Unlock Stop 59 at `staging-console` in Catchment & Inflow Desk.

**Beat 4 - After Stop 59 | `staging-console` | automatic**

**World state:** After 15.3 Location: GATES.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Imani Okoro: "Exactly right. Use the Stop 59 result to settle diagnose the final run."

**Unlocks/waypoint:** Unlock Stop 60 at `staging-console` in Catchment & Inflow Desk.

**Beat 5 - At mission end | `gauge-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Imani Okoro: "Outstanding work. You solved the mission. The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

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

Mission decision: Complete the staged release. The forecast, water ledger, gate response, wall readings, machine work. And warning times all pass their signed limits. The reservoir reaches storm room before the crest. Ashfell holds the rain without sending an unsafe surge downstream.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Exceptional work. You brought the campaign to a decisive conclusion: Complete the staged release. The storm plan is sharper because you followed how the water actually changes.

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

**Secondary briefing card - exact player copy:** You completed The Corrected Release Rules, Signed. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Corrected Release Rules, Signed, forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. Which option correctly carries out the required limits/MVT/derivative synthesis reasoning?

**Options - exact player copy:**

- A. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- B. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- C. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.
- D. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for limits/MVT/derivative synthesis; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes accumulated change/area/average, not limits/MVT/derivative synthesis. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. the forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- C: This describes chain/related rates/Euler/work integration, not limits/MVT/derivative synthesis. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes whole-course model selection, not limits/MVT/derivative synthesis. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 2

**Prompt - exact player copy:** Ashfell Dam receives a second case related to The Corrected Release Rules, Signed: forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (min)",
  "yLabel": "Flow rate (m3/min)",
  "caption": "Signed area under the rate curve gives accumulated change.",
  "series": [
    {
      "name": "Net flow",
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
          3
        ],
        [
          3,
          0
        ],
        [
          4,
          -2
        ],
        [
          5,
          -1
        ]
      ]
    }
  ],
  "limit": {
    "at": 0,
    "label": "Zero flow"
  }
}
```


**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.
- C. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes limits/MVT/derivative synthesis, not accumulated change/area/average. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes chain/related rates/Euler/work integration, not accumulated change/area/average. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. the plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D: This describes whole-course model selection, not accumulated change/area/average. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Corrected Release Rules, Signed using new evidence: the ledger closes, so the gate must follow the staged rule without overshoot. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which option correctly carries out the required chain/related rates/Euler/work integration reasoning?

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- C. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for chain/related rates/Euler/work integration; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes limits/MVT/derivative synthesis, not chain/related rates/Euler/work integration. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes accumulated change/area/average, not chain/related rates/Euler/work integration. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes whole-course model selection, not chain/related rates/Euler/work integration. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: Correct. q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Corrected Release Rules, Signed: stage 2 matches predicted discharge; storage falls on the resurvey curve, uplift remains below 8, and all warnings arrive early. Which option correctly applies whole-course model selection to this follow-up case?

**Options - exact player copy:**

- A. Each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.
- B. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- C. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for whole-course model selection; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. each active limit and quiet control passes; do not broaden opening beyond the tested plan. The final verdict belongs to the complete evidence chain, not one successful gauge.
- B: This describes limits/MVT/derivative synthesis, not whole-course model selection. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: This describes accumulated change/area/average, not whole-course model selection. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes chain/related rates/Euler/work integration, not whole-course model selection. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 5

**Prompt - exact player copy:** Before another Corrected Release Rules, Signed decision, the team knows this: forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. What does the limit represent in this situation?

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The value a function approaches as its input nears a point.
- C. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Limit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes limits/MVT/derivative synthesis, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: Correct. the value a function approaches as its input nears a point.
- C: This describes accumulated change/area/average, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
- D: This describes chain/related rates/Euler/work integration, not Limit. It does not account for the quantities, conditions, or evidence in this calculus case.
### Review question 6

**Prompt - exact player copy:** Ashfell Dam applies the lesson from The Corrected Release Rules, Signed to this follow-up: forecast level is continuous on [0,2] and differentiable inside, with H(0)=4.36 m and H(2)=4.72 m. Which condition or conclusion correctly determines continuity here?

**Options - exact player copy:**

- A. The forecast passes MVT consistency. Continuity, differentiability, and a bounded matching derivative make the final forecast internally possible.
- B. The plan just clears required storage; power price is not water. The final volume balance decides whether the staged gate plan is sufficient before motion begins.
- C. Having a defined value that equals the common left and right limit.
- D. Q=40e^.6=72.885; Delta Q=(6e^.6/2)*.1=0.547; continue. A committed local prediction tests the steep final segment while warning and wall limits remain protected.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Continuous; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes limits/MVT/derivative synthesis, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
- B: This describes accumulated change/area/average, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
- C: Correct. having a defined value that equals the common left and right limit.
- D: This describes chain/related rates/Euler/work integration, not Continuous. It does not account for the quantities, conditions, or evidence in this calculus case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Core calculus:** rational and radical limits, rational-function asymptotes, two-sided limits, continuity, removable versus jump and infinite breaks, IVT.

**Stops:** Cancel the false zero; Rationalize the float transform; Classify forecast breaks; Certify continuity.

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

**Core calculus:** L'Hopital's rule, exponential derivatives, derivative and concavity signs, holdout residuals, curve sketching.

**Stops:** Check the indeterminate rate; Read inverse-shaped saturation; Freeze before revealing the crest; Diagnose the full curve.

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


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `GATES` roster owner: Mara Vale.
- `POWER` roster owner: Mara Vale.
- `SAFE` roster owner: Mara Vale.
- `STORE` roster owner: Mara Vale.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
