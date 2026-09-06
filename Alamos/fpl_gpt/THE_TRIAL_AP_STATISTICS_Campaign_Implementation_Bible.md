**FIRST PERSON LEARNING**

**THE TRIAL - HS EDITION**

AP Statistics Campaign Implementation Bible

**15 missions | 60 graded stops | Clinical trial | Implementation-ready**

**REVISION 10.2 - COMPACT GLOSSARY, BUILDABLE PANELS, AND CUMULATIVE RETRIEVAL**

## AP Statistics Campaign Implementation Bible

**Project:** First Person Learning

**World:** Fenwick Coordinating Centre, CLARION-3 clinical trial

**Player role:** Methodology and Operations Lead

**Campaign size:** 15 missions, 60 graded stops, one final Monitoring Board recommendation

**Audience:** AP Statistics students

**Primary implementation target:** the current `the_trial` book and theme assets

**Status:** Buildable implementation specification; all 60 stops carry player copy, grading truth, answer text, and interaction data

> *The design test: if the statistics is removed, the board decision cannot be defended. If the story is removed, the student still completes a cumulative AP Statistics review in which design, probability, modeling, and inference become tools for later decisions.*

---

## 1. One-page implementation brief

The supplied world gives the course a strong physical metaphor: evidence begins with patients on Level 0, becomes blinded data on Level 1, and crosses the firewall to the monitoring board on Level 2. The six staffed areas, nine supporting rooms, and 15 named board-pack pieces are preserved. The initial premise did not yet specify a complete academic dependency chain, fair twists, per-stop actions, campaign economy, or exact card-to-outcome throughlines. This bible makes one clinical question - whether CLARION-3 should stop, continue, or change - depend on the full AP Statistics course.

Strengths preserved are the trial setting, three-floor evidence path, blinded/unblinded boundary, six functional groups, 15-day delivery, and one physical pack piece per mission. Risks corrected are shallow topic appearance, inference before design conditions, treating association as causation, using significance without effect size, confusing records with reality, and allowing a final board decision to be narrated rather than made by the player. No filler tour or greeting warm-up is required; Mission 1 teaches movement while the player retrieves the actual registered claims.

---

## 2. Campaign promise, clock, and player experience

### Opening sequence - no movie required, maximum five sentences

Fenwick Coordinating Centre is running CLARION-3 to learn whether a new treatment helps patients without causing unacceptable harm. In 15 days, the independent monitoring board must decide whether the trial continues, changes, or stops. A weak pack could expose more patients to harm or bury a useful treatment. Director Mara Voss hands you the empty board binder and says, "Every claim must survive its own evidence." A safety alert from two hospitals is already flashing.

**Delivery:** Show all five opening sentences together on one full-screen text card over the normal Regulatory & Registry view. The player dismisses the card once with Continue. When it clears, reveal the four-bar HUD, activate the Mission 1 briefing icon, and leave the player beside the commitment terminal on Level 1.

### Concrete stakes

The monitoring board meets after Mission 15. An unjustified stop can bury a useful treatment; an unjustified continuation can expose more patients to harm; a biased or unlocked analysis can make either decision indefensible. The player is never asked to protect an arbitrary score: every bar represents evidence quality, patient protection, trial credibility, or the remaining time to assemble the pack.

### Three major reversals

1. **Twist 1 - The signal is concentrated, not universal:** the two-hospital alert is far above an independence prediction, justifying a targeted pause but not proving that the drug caused every event.
2. **Twist 2 - The blind did not fail:** unequal treatment guesses are statistically detectable, but the physical allocation audit remains intact; handling and site composition, not exposed allocation, explain the strongest distortions.
3. **Twist 3 - Several wins are not several discoveries:** ten secondary analyses created many chances for small p-values; correction removes a headline while leaving the primary claim and one planned slope result standing.

---

### Four campaign metrics and recovery economy

| Bar | Category | Start | Meaning | Rises when | Falls when | Zero consequence | 100% lock |
|---|---|---:|---|---|---|---|---|
| Evidence Strength | primary objective | 38% | How well estimates and tests answer the registered questions | representative data, justified models, precise estimates | bias, model failure, avoidable missingness | no defensible efficacy conclusion | locked after M13 multiplicity correction |
| Patient Safety | secondary requirement | 52% | How well harms are detected and controlled | verified signals, exposure limits, stop rules | added exposure, missed events, delayed action | enrollment stops and mission restarts | locked only by M15 safeguards |
| Trial Integrity | system integrity | 58% | Randomisation, blinding, measurement, and reporting credibility | audits and independent checks | unplanned looks, broken handling, undisclosed changes | data cannot support a decision | locked after M11 file lock |
| Time Reserve | operational reserve | 64% | Staff and calendar capacity before day 15 | efficient correct decisions | named rework, extra sampling, delayed queries | board meets with an incomplete pack | never locks |

RP = clamp(4,12,11 + time_modifier - incorrect_submissions), where time_modifier is +1 at or before target, 0 through 125% of target, and -2 beyond 125%. One committed wrong answer costs one RP; exploratory actions do not. One RP raises one unlocked bar by one point; bank cap 30. Required dialogue, menus, backgrounding, loading, and system interruptions pause the timer. Any 0% bar restores the mission-start snapshot. Victory requires all bars at 100%, the registered primary interval excluding no benefit, the harm boundary not crossed, and the signed decision rule.

### Timer and Recovery Points

The timer begins when the arrival beat closes and the first stop becomes active. It runs during questions and player-controlled movement, and pauses during required dialogue, menus, loading, backgrounding, accessibility actions, and system interruptions.

RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions). The time modifier is +1 at or before target, 0 through 125% of target, and -2 beyond 125%. A committed wrong answer costs one RP; exploratory work before Commit does not. One RP raises one unlocked bar by one percentage point, with a 30-RP bank cap.

State keys: `evidence_strength`; `patient_safety`; `trial_integrity`; `time_reserve`.

### Resolution order, locks, and failure

After each outcome beat, apply the named story-event deltas, check for a 0% bar, award RP, open allocation, show the concept review, and issue the next briefing. Any bar at 0% shows `MISSION FAILED - [METRIC] COLLAPSED` and restores the mission-start snapshot. Trial Integrity locks after Mission 11, Evidence Strength after Mission 13, and Patient Safety only through the Mission 15 safeguards. Final victory requires 100 / 100 / 100 / 100, a primary-benefit interval excluding no benefit, the harm boundary not crossed, and a signed precommitted decision rule.

### Automatic-event and canonical-allocation ledger

The QA path assumes target time, zero wrong submissions, 12 RP per mission, and the listed allocation. Values are post-event, post-allocation.

| M | Named automatic event | Automatic delta E/S/I/T | Canonical 12-RP allocation | QA bars E/S/I/T |
|---:|---|---|---|---|
| 1 | Registry recovered before analysis | +4/0/+6/-2 | 4/2/4/2 | 46/54/68/64 |
| 2 | Endpoint recheck uses one work shift | +4/+2/+4/-4 | 4/2/4/2 | 54/58/76/62 |
| 3 | Verified cluster pauses two sites | +2/+6/+2/-4 | 3/4/3/2 | 59/68/81/60 |
| 4 | Unplanned look is disclosed | +2/+2/+5/-5 | 3/3/4/2 | 64/73/90/57 |
| 5 | Fast-site audit replaces biased records | +6/+2/+3/-4 | 5/2/3/2 | 75/77/96/55 |
| 6 | Amendment adds required events | +3/+2/+2/-5 | 4/3/2/3 | 82/82/100/53 |
| 7 | Missing-data recovery takes four days | +4/+2/0/-7 | 5/3/0/4 | 91/87/100/50 |
| 8 | Cold-room cohort is quarantined | +2/+5/0/-5 | 3/5/0/4 | 96/97/100/49 |
| 9 | Blind confirmed; survey cost paid | +1/+2/0/-4 | 1/1/0/10 | 98/100/100/55 |
| 10 | Bias adjustment lowers headline benefit | -4/0/0/-3 | 6/0/0/6 | 100/100/100/58 |
| 11 | File lock prevents further silent edits | 0/0/0/-3 | 0/0/0/12 | 100/100/100/67 |
| 12 | Three problems require separate teams | 0/0/0/-6 | 0/0/0/12 | 100/100/100/73 |
| 13 | Multiplicity correction locks evidence | 0/0/0/-4 | 0/0/0/12 | 100/100/100/81 |
| 14 | One final follow-up wave is authorized | 0/0/0/-7 | 0/0/0/12 | 100/100/100/86 |
| 15 | Board safeguards release reserve | 0/0/0/+2 | 0/0/0/12 | 100/100/100/100 |

---

## 3. World and location plan

Fenwick makes the path from patient to decision walkable. Patient and site evidence enters on Level 0, blinded operational data is cleaned and modeled on Level 1, and only controlled unblinded results cross the firewall to the Level 2 board and archive. Travel is never a tour: a roster, model ID, holdout hash, registry list, or board decision creates each move.

| ID | Place | Story/statistics function | Signature fixture |
|---|---|---|---|
| REG | Regulatory & Registry | promises, timestamps, multiplicity, evidence orders | commitment terminal and records wall |
| SITE | Monitors' Room | sampling frames, enrollment, follow-up, source queries | enrollment wall and query map |
| RAND | Randomisation & Blinding | assignment, blocking, concealment, kit audit | allocation reader and sealed-box scanner |
| DATA | Data Management | cleaning, missingness, extraction, holdouts | roster fixture and extraction console |
| ADJUD | Endpoint Adjudication | endpoint definitions, paired records, categorical tables | matched-record table and table wall |
| STAT | Statistics & Analysis | probability, models, inference, diagnostics | analysis board, residual wall, uncertainty console |
| BOARD | Monitoring Board Room | thresholds, risk trade-offs, final recommendation | trigger rail and board console |
| ARCHIVE | Trial Master File | read-only evidence lock and signed provenance | archive seal |

### Areas of study and complete fixture declaration

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Regulatory & Registry | no | `commitment-terminal` | vessel | The preregistered endpoints, analysis dates, and amendment controls glow behind Lena’s keyed approval screen. |
| Regulatory & Registry | no | `records-wall` | board | Protocol pages, registry timestamps, and signed change notices run in one dated line across the wall. |
| Regulatory & Registry | no | `claim-ledger` | board | Every proposed claim has a numbered row, a promised test, and a blank seal where evidence is still missing. |
| Regulatory & Registry | no | `evidence-desk` | bench | Variable cards, summary sheets, and the day’s flagged values lie beneath a lamp marked DESCRIBE FIRST. |
| Monitors' Room | no | `monitor-desk` | bench | Hospital rosters, sampling instructions, and source-query slips arrive here before they cross upstairs. |
| Monitors' Room | no | `enrollment-wall` | board | Enrollment counts by hospital and region face a row of empty spaces for patients who never entered the frame. |
| Monitors' Room | no | `query-map` | board | Distance, follow-up delay, and open queries connect each site to Fenwick with colored cord. |
| Monitors' Room | no | `site-comparison-board` | board | Site rates, residuals, deletion checks, and pause status share one board beside Eli’s phone. |
| Randomisation & Blinding | yes | `allocation-reader` | vessel | The concealed sequence appears one assignment at a time, with block and match settings locked behind Priya’s key. |
| Randomisation & Blinding | yes | `sealed-box-scanner` | vessel | Numbered treatment boxes pass under a scanner that records seals, weights, and handling times without revealing the arm. |
| Randomisation & Blinding | yes | `blind-ledger` | board | Kit numbers, guess surveys, and custody signatures meet here without treatment labels. |
| Randomisation & Blinding | yes | `randomisation-board` | board | Candidate designs, precision estimates, and expected waiting times remain pinned beside the approved allocation rule. |
| Data Management | no | `roster-wall` | board | Screened, enrolled, randomized, treated, and analyzed patients occupy separate columns, including the missing rows. |
| Data Management | no | `extraction-console` | vessel | The frozen extract, sampling controls, and holdout hash sit behind a two-person release switch. |
| Data Management | no | `deletion-diagnostic` | board | Complete-case and restored-data fits appear together, with the fast site circled only after the comparison runs. |
| Data Management | no | `holdout-safe` | rack | Sealed validation files carry hashes, owners, and release times on tamper-evident sleeves. |
| Data Management | no | `sampling-board` | board | Sample size, standard error, and repeated-sample spreads are written beside the roster they describe. |
| Endpoint Adjudication | yes | `outcome-viewer` | vessel | Patient records can be viewed by center, outcome definition, and adjudication status without exposing treatment. |
| Endpoint Adjudication | yes | `adjudication-desk` | bench | Amina’s rubric, paired charts, and disputed endpoint packets wait under the same reading lamp. |
| Endpoint Adjudication | yes | `matched-record-table` | bench | Matched pairs and independent groups occupy separate trays so no patient can silently count twice. |
| Endpoint Adjudication | yes | `table-wall` | board | Means, counts, fitted distributions, and the population each table can reach are posted with their assumptions. |
| Statistics & Analysis | yes | `analysis-board` | board | Parameters, estimators, probability rules, and the current model are written where the whole team can challenge them. |
| Statistics & Analysis | yes | `simulation-console` | vessel | Repeated trials accumulate into sampling distributions, event counts, and power curves on the central console. |
| Statistics & Analysis | yes | `residual-wall` | board | Residual plots, leverage marks, and model checks remain visible after the headline fit is printed. |
| Statistics & Analysis | yes | `uncertainty-console` | vessel | Intervals, error rates, and sensitivity bounds move together as Tomas changes one assumption at a time. |
| Statistics & Analysis | yes | `extraction-map` | board | Roster fields, adjudicated outcomes, model inputs, and final tables connect through a signed data lineage. |
| Statistics & Analysis | yes | `evidence-budget-desk` | bench | Follow-up options carry costs, expected information, and the decision each result could still change. |
| Monitoring Board Room | yes | `event-console` | vessel | Arm-by-event counts, exposure time, and interim boundaries appear without patient names. |
| Monitoring Board Room | yes | `board-console` | vessel | Jonas’s console holds site pauses, benefit-harm summaries, and the controls that authorize the next action. |
| Monitoring Board Room | yes | `trigger-rail` | board | Precommitted stop, continue, and follow-up rules slide along a rail but cannot be rewritten after results arrive. |
| Monitoring Board Room | yes | `board-simulator` | vessel | Power, effect size, variance, and enrollment assumptions feed a projected decision path across the screen. |
| Monitoring Board Room | yes | `board-table` | bench | The final statistical argument, safeguard sheet, and seven signature spaces lie in front of the voting seats. |
| Trial Master File | no | `archive-seal` | vessel | A steel seal records the file hash, lock time, and every authorized opening of the master record. |
| Trial Master File | no | `evidence-locker` | rack | Protocol versions, signed attestations, and frozen extracts occupy numbered archival boxes. |
| Trial Master File | no | `provenance-desk` | bench | A read-only terminal traces each final number back to its source record and approving signature. |
| Kit Warehouse & Cold Room | no | `exposure-logger` | vessel | Temperature traces, door openings, and kit identifiers scroll beneath the cold-room alarm lamps. |
| Kit Warehouse & Cold Room | no | `cold-room-workbench` | bench | Interval worksheets, benchmark limits, and quarantined-kit lists sit beside insulated gloves. |
| Kit Warehouse & Cold Room | no | `temperature-rack` | rack | Reference probes and sealed control kits stand at three shelf heights inside the monitored room. |
| Kit Warehouse | no | `kit-sequence-rack` | rack | Numbered boxes preserve the actual packing order, with one sealed sequence reserved for audit. |
| Kit Warehouse | no | `blind-audit-table` | bench | Guess surveys, concealment checks, and arm-free summaries are spread across a table with no treatment key. |
| Kit Warehouse | no | `label-scanner` | vessel | A handheld reader checks label order and custody history while keeping assignment codes masked. |

### Location escalation

| Missions | Places per mission | Travel rule |
|---|---:|---|
| 1-4 | 1 | local investigation; the initial evidence chain stays on one working floor |
| 5-10 | 2 | a physical roster, amendment, model, survey, or adjusted table causes the move |
| 11-15 | 3 | the player crosses data, registry, and authority boundaries to synthesize evidence |

The unblinded board controls remain locked until Mission 3. The Trial Master File is visible but cannot be sealed before Mission 11. The final board-signature console becomes interactable only after Stop 59.

## 4. Character bible

| Name | Pronouns | World role | Wants | Reasonable blind spot | Gameplay/domain | Verbal habit and arc |
|---|---|---|---|---|---|---|
| Mara Voss | she/her | Trial director and mission authority | A defensible board decision on day 15 | Schedule pressure can make a settled-looking number feel final | integrates evidence; authorizes travel and final action | "What can that number honestly claim?" She moves from deadline-first to evidence-first. |
| Eli Navarro | he/him | Site operations lead | Keep hospitals enrolling and queries moving | Fast sites look efficient before representativeness is checked | sampling frames, nonresponse, source verification | "Who is missing?" He ultimately pauses the fastest site himself. |
| Priya Shah | she/her | Randomisation and blinding lead | Preserve treatment concealment and causal validity | A correct allocation file can hide failures in physical kit handling | random assignment, blocking, matched pairs, blinding | "Could anyone predict the next box?" She accepts an audit beyond her records. |
| Tomas Reed | he/him | Trial statistician | Protect the analysis plan and statistical power | Formal significance can distract him from bias and practical size | distributions, probability, inference, power, regression | "State the parameter first." He presents uncertainty before the headline. |
| Amina Okafor | she/her | Endpoint adjudication lead | Count the same clinical event the same way everywhere | Precise rules can still measure the wrong construct | variables, measurement, missing data, categorical tables | "What exactly was counted?" She revises the endpoint rule. |
| Lena Wu | she/her | Regulatory and registry lead | Keep every change transparent and reproducible | Documentation can verify a record without verifying a patient's condition | preregistration, attestations, multiplicity, reporting | "Was that promised before the data?" She distinguishes audit trail from truth. |
| Jonas Berg | he/him | Safety monitoring chair | Prevent avoidable patient harm | Early clusters can tempt him to stop before accounting for chance and exposure | adverse-event probability, interim rules, final trade-off | "What would change the decision?" He accepts continuation only with enforceable triggers. |

Names, roles, pronouns, and short forms above are canonical everywhere.

## 5. Character direction and dialogue rules

- Introduce competence before biography; show each person performing a real trial function under pressure.
- Preserve each verbal habit: Mara asks what a number can claim; Eli asks who is missing; Priya asks whether the next box could be predicted; Tomas asks for the parameter; Amina asks what was counted; Lena asks what was promised; Jonas asks what would change the decision.
- Characters may defend incomplete interpretations, but never state a false fact in their specialty without an explicit story reason.
- Wrong-answer dialogue names the statistical mechanism and a productive retry; it never ridicules the player.
- After M5, Eli stops equating speed with quality. After M9, Priya's greetings reflect that the blind survived. After M13, Tomas separates lost headlines from preserved data.

### Non-cinematic beat presentation contract

- Keep the player in normal playable view; story delivery never requires a forced camera or video.
- Use `nearby_character_bubble` for a person in the room and `radio_bubble` for a remote speaker.
- Advance required bubbles with one Continue; never let essential evidence disappear on a timer.
- Put results on persistent equipment panels until the next stop begins, and copy them into the mission log.
- Use banners only for one conclusion, warning, or destination. Pair color with text and an icon.
- Activate travel only after dialogue names the destination and the item being carried there.

---

## 6. Statistics spine and recurring concepts

## Dependency graph

1. Variable type and graph choice -> distribution description -> resistant summaries, outliers, normal model.
2. Population/parameter versus sample/statistic -> sampling design -> sampling distributions, bias, standard error, and scope.
3. Probability rules -> random variables -> binomial/geometric models -> Type I/II errors and power.
4. Scatterplots -> correlation -> least-squares line -> residuals/influence -> inference for slope.
5. Random assignment/control/replication/blocking -> causal inference; random sampling -> generalization.
6. Conditions and sampling distributions -> confidence intervals and tests for proportions/means -> chi-square and slope inference.
7. All branches -> effect size + uncertainty + error costs -> board decision.

## Keystone encounter matrix

| Keystone | Introduce | Practice | Delayed retrieve | Combine | Transfer/payoff |
|---|---|---|---|---|---|
| Distribution description and summaries | M1 | M2 | M7 | M10 | M15 |
| Study design and scope | M1 | M5 | M9 | M12 | M15 |
| Sampling and bias | M5 | M6 | M7 | M10 | M14-M15 |
| Probability and conditional reasoning | M3 | M4 | M8 | M12 | M14-M15 |
| Random variables and sampling distributions | M4 | M6 | M8 | M11 | M14-M15 |
| Normal model and standardization | M2 | M6 | M8 | M11 | M15 |
| Regression and diagnostics | M7 | M7 | M10 | M13 | M15 |
| Conditions for inference | M6 | M8 | M9 | M10-M13 | M15 |
| Confidence intervals | M8 | M9 | M10 | M13 | M14-M15 |
| Significance tests and contextual conclusions | M4 | M8 | M9 | M10-M13 | M14-M15 |
| Error, power, and thresholds | M4 | M6 | M13 | M14 | M15 |
| Categorical-data inference | M3 | M9 | M12 | M13 | M15 |

## Cheat-sheet coverage matrix

| Cheat-sheet item | Mission-stop coverage |
|---|---|
| SOCS; symmetric/skewed/uniform/bimodal; comparative language | M1S2, M2S1, M15S1 |
| Mean/median, SD/IQR/range, resistance, quartiles, 1.5 IQR and 2 SD outliers | M1S3, M2S1, M2S4, M7S4 |
| Dotplot/stemplot/histogram/boxplot/bar chart; categorical vs quantitative | M1S1, M1S2, M2S4 |
| z-scores, percentiles, 68-95-99.7, normalcdf/invNorm reasoning | M2S2-S3, M6S3, M11S1 |
| Scatterplot direction/form/strength/outliers; correlation vocabulary and causation warning | M7S1, M7S4, M13S2 |
| LSRL slope/intercept, extrapolation, line through means, b=r(sy/sx), a=ybar-bxbar | M7S2-S3 |
| Residuals; nonlinearity; outlier/leverage/influence | M7S4, M10S4, M13S1 |
| SRS, stratified, cluster, systematic, RNG detail and ignoring repeats | M5S1-S2 |
| Undercoverage, nonresponse, response bias, convenience/voluntary response | M5S3-S4, M7S1 |
| Observational vs experiment, confounding, control/random assignment/replication/blocking/blinding/matched pairs | M1S4, M5S4, M6S1-S2, M9S1 |
| Scope: cause/generalize table | M5S4, M9S4, M15S2 |
| Complement/addition/multiplication/conditional; independence vs mutually exclusive | M3S1-S4 |
| Expected value; linear transforms; combining independent RV means and variances | M4S1-S2, M11S3 |
| Binomial/geometric questions, fixed n/p, means np and 1/p | M4S3, M6S4 |
| Parameter/statistic; unbiasedness; effect of n; p-hat and x-bar sampling distributions; CLT; SD vs SE | M1S4, M6S3, M11S1-S2 |
| Master inference conditions: random, 10%, counts/normality, chi-square counts, LINE | M6S3, M8S1, M9S2, M10S1-S3, M12S1-S3, M13S1 |
| One-proportion z interval/test; critical values; ME/sample size | M8S1-S4 |
| Two-proportion z interval/test; pooled test only | M9S2-S4 |
| Hypothesis language; p versus alpha; Type I/II; power | M4S4, M8S3, M9S3, M13S4, M14 |
| One-sample, two-sample, and paired t; df; no pooled variance; difference order | M10S1-S3 |
| Chi-square GOF/independence/homogeneity; expected counts; df; right tail | M12S1-S3 |
| Slope test/CI, beta, t=b/SE, df=n-2, one-tail p-value trap, LINE | M13S1-S3 |
| FRQ State-Plan-Do-Conclude; context, units, no accept/prove, carry guessed value | repeated M8-M15; explicit M15S4 |

---

## 7. Clue ledger

| M | Science movement | Mystery movement | Stakes movement | Pack piece / decision |
|---:|---|---|---|---|
| 1 | variables, graphs, preregistration | alert was not a registered primary claim | board may react to wrong question | pre-specified claims |
| 2 | distributions, outliers, normal model | extremes distort average | endpoint choice can enlarge benefit | measurement procedures |
| 3 | conditional probability and independence | signal is too concentrated for independence | enrollment pauses at two sites | two-site safety signal |
| 4 | RVs, binomial risk, errors, power | analyst already opened labels | nominal false-positive rate is altered | unplanned look accounted |
| 5 | sampling and bias | fast site enrolled a narrow subset | benefit may not generalize | fast-site audit |
| 6 | design, sampling distributions, size | fixing representation reduces effective events | amendment costs time and power | amendment cost |
| 7 | regression and residuals | missingness follows travel distance | complete-case analysis is biased | missing-data rule |
| 8 | one-proportion inference | cold exposure predicts kit failures | signal may be handling, not drug | exposure note |
| 9 | two-proportion inference and blinding | guessing equal across arms | Priya did not break allocation | blinding survey |
| 10 | t inference and adjustment | corrected benefit shrinks | board cannot use old headline | bias-adjusted estimate |
| 11 | CLT, propagation, lock | agreeing feeds share one extraction | validation becomes mandatory | locked file |
| 12 | chi-square family | safety, site mix, handling differ | one global fix would fail | three separated problems |
| 13 | slope inference and multiplicity | secondary win disappears | primary claim must carry decision | multiplicity correction |
| 14 | power and loss | primary benefit survives; harm uncertain | one follow-up wave remains | stop-or-continue trade-off |
| 15 | full transfer | continuation requires triggers | execution protects patients and evidence | signed board pack |

## Major clue ledger

| Planted | Objective observation | Initial interpretation | True meaning / concept | Reinforced | Payoff |
|---|---|---|---|---|---|
| M1 | two hospitals supply most serious reports | toxicity everywhere | concentration needs conditional probability and denominators | M3 | M3 |
| M2 | mean improves more than median | broad benefit | skew and extremes distort mean | M7 | M10 |
| M4 | analysis folder has early timestamp | randomisation lead revealed arms | unplanned look occurred in statistics | M5 | M9/M13 |
| M5 | fast site has younger nearby patients | best-run hospital | recruitment and distance missingness bias results | M7 | M10 |
| M8 | failed kits share cold exposure | defective drug batch | handling caused misclassification | M9 | M12 |
| M11 | three reports agree exactly | independent confirmation | all share one extraction | M13 | M13 |
| M14 | harm interval crosses boundary but center does not | stop or ignore | uncertainty needs a precommitted trigger | earlier error-cost work | M15 |

---

## 8. Mission content contract

Each mission uses four stops. After the final stop, provide 45-90 seconds of world response before the metric screen. Every completed dialogue, result, and destination is copied into the mission log. Required bubbles pause the timer and advance with one Continue. Color is paired with words and icons.

**Standard metric-screen copy:** MISSION N COMPLETE; TIME {elapsed} / TARGET mm:ss; INCORRECT SUBMISSIONS {incorrect_submissions}; named event and automatic changes; RECOVERY POINTS = clamp(4,12,11 + time modifier - incorrect submissions): {award}; Spend one point to raise one unlocked bar by 1%, or bank it (cap 30). Failure: any 0% bar restores the mission snapshot.

**Payload contracts:** CHOICE/TRIAGE supplies four labels, keyed answer, why, and one rebuttal per wrong label. BALLPARK supplies labels, values, slots, template, formula, target, correct and tolerance. SEQUENCE supplies cards and exact order. PROTOCOL/CASEBOOK supplies scenarios, choices, and a permutation mapping. DIAGNOSIS supplies a headline, at least three mixed quiet/alarm readings, candidate mechanisms, and one answer. DERIVE supplies candidate expression lines, license labels, ordered keyed lines, and decoys. Every operated format below names controls, fixed quantities, readings, commitment gates, restoration, and conclusion.

---

Every mission below supplies a story event, route, character beat, plain-language concepts, four exact stops, an outcome scene, and a quick review. Each briefing connects to the prior outcome, explains the present problem, names what the player will do, and ends with the decision or result the mission must produce. Each two-sentence question setup identifies the next necessary step and, after Stop 1, consumes the preceding result. Each outcome begins with `Mission decision:` and answers the briefing promise.

Correct result is the grading truth. Wrong-path feedback is implementation content, not optional commentary. State/output names persistent flags, equipment changes, and unlocks.

### Revision 10.2 presentation and action-clarity rules

Glossary entries use compact `Term: definition` lines. Equation entries include only the equation, its purpose, every symbol, and the campaign-specific reason. PROBE supplies an observed reading and a station-specific expected value at every station. CHOICE supplies four distinct items and a separate mechanism-specific rebuttal for each wrong item. VERIFY requires a numerical commitment before operation unlocks. CONTROL names the changed variable, every fixed variable, measurement timing, restoration, remeasurement, and the submitted conclusion. Any calculation-plus-operation prompt prints **CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET** in that order. Numerical cards expose all inputs, constants, units, equations, output units, response types, and tolerances.

### Source-of-truth and importer rule

The repository importer and schema are authoritative first; `QUESTION_TYPES(3).md` is authoritative second; this bible supplies the complete semantic payload. Map changed field names without deleting interactions or replacing operated formats with generic choices. STACK is not used.

### Keystone retrieval compliance ledger

- Distribution description and summaries: introduce M1-M2; delayed retrieve M7; combine M10; transfer M15.
- Study design, scope, and sampling bias: introduce M1/M5; delayed retrieve M9; combine M12; transfer M15.
- Probability and random variables: introduce M3-M4; delayed retrieve M8; combine M11-M12; transfer M14-M15.
- Regression and diagnostics: introduce M7; delayed retrieve M10; combine M13; transfer M15.
- Sampling distributions and Normal models: introduce M2/M6; delayed retrieve M8/M11; combine M14; transfer M15.
- Confidence intervals and significance tests: introduce M8; delayed retrieve M10; combine M12-M13; transfer M14-M15.
- Error, power, thresholds, and multiplicity: introduce M4; delayed retrieve M13; combine M14; transfer M15.

---

# Mission 1 - What Was Promised

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** DAY 1 - BOARD IN 15 DAYS  
**Card title:** What Was Promised  
**Go now:** Go to Regulatory & Registry and meet Lena Wu, regulatory and registry lead, at the commitment terminal.  
**Card body:** A two-hospital safety alert is flashing, but the board must judge the trial by questions promised before results appeared. A registered plan names each outcome, population, and analysis in advance. At the terminal, classify the data, describe the first distributions, and verify the commitments. By the end of the mission, decide which claims belong in the board pack.  
**Objective:** Recover the trial's pre-specified claims.

### Worth knowing first - exact player copy

#### Glossary terms

Variable: a characteristic recorded for each patient.  
Categorical variable: a variable placing a patient into a group.  
Quantitative variable: a variable recorded as a meaningful number.  
Parameter: a fixed but usually unknown number describing a population.  
Statistic: a number computed from a sample.

#### Primer concepts

- Graph choice depends on whether data are categorical or quantitative.
- A sample statistic estimates a population parameter.
- A claim written after seeing results has a different false-alarm risk.

#### Equations first needed today
**Equation:** IQR = Q3 - Q1

**What it is for:** Measuring the middle half of a quantitative distribution.

**Symbols:** Q1 is the first quartile; Q3 is the third quartile; IQR is interquartile range.

**Why this campaign needs it:** The board must flag extreme patient values without letting them redefine the promised outcome.## Main story happening - designer summary

Lena blocks the safety headline until the registered outcome is recovered. The player distinguishes variables, selects honest displays, describes the primary outcome, and attests which claims were timestamped before enrollment. This establishes context-first language and plants that the two-site safety pattern was not a registered primary claim.

## Designer intent - not shown to player

Teach variable type, graph choice, SOCS, outlier rules, parameter/statistic, and pre-specification as one evidence-registration chain. The apparent safety claim remains visible but is correctly labeled exploratory.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Regulatory & Registry | `commitment-terminal` | automatic**

**World state:** Arrival | REG | nearby bubble:  Terminal reads REGISTRATION LOCK: 14 MONTHS BEFORE FIRST PATIENT.

**Panel/HUD text:** MISSION 1: NAME THE DATA OPEN

**Dialogue bubbles -** Lena Wu: "The alert matters. First separate what was promised from what was noticed."

**Unlocks/waypoint:** Unlock Stop 1 at `commitment-terminal` in Regulatory & Registry.

**Beat 2 - After Stop 1 | `records-wall` | automatic**

**World state:** The name the data result remains visible while the describe before judging fixture lights.

**Panel/HUD text:** STOP 1 RECORDED - STOP 2 OPEN

**Dialogue bubbles -** Lena Wu: "Use the Stop 1 result to settle describe before judging."

**Unlocks/waypoint:** Unlock Stop 2 at `records-wall` in Regulatory & Registry.

**Beat 3 - After Stop 2 | `evidence-desk` | automatic**

**World state:** After S1-S2 | REG | panel update.

**Panel/HUD text:** VARIABLES CLASSIFIED - DISPLAY CHECK PASSED

**Dialogue bubbles -** Lena Wu: "Now describe what the display actually shows."

**Unlocks/waypoint:** Unlock Stop 3 at `evidence-desk` in Regulatory & Registry.

**Beat 4 - After Stop 3 | `claim-ledger` | automatic**

**World state:** After S3 | REG | persistent world change: the primary-outcome tab illuminates with text and document icon.

**Panel/HUD text:** STOP 3 RECORDED - STOP 4 OPEN

**Dialogue bubbles -** Lena Wu: "Use the Stop 3 result to settle seal the claims."

**Unlocks/waypoint:** Unlock Stop 4 at `claim-ledger` in Regulatory & Registry.

**Beat 5 - At mission end | `commitment-terminal` | automatic**

**World state:** Binder slot 1 fills; outcome unlocks.

**Panel/HUD text:** MISSION 1 EVIDENCE: RECORDED

**Dialogue bubbles -** Lena Wu: "The safety pattern enters as monitoring evidence, not a pre-specified efficacy claim."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

**One location:** REG commitment terminal, records wall, and binder fixture; only the timestamped registry can establish pre-specification. Lena wants transparency and initially treats documentation as sufficient; the alert makes her require observed evidence later. Categorical data need counts/proportions and bar charts; quantitative data need dotplots, stemplots, histograms, or boxplots. SOCS means shape, outliers, center, and spread, stated in context with comparisons. Parameters describe populations; statistics vary across samples.

## Characters and dramatic beat

Lena wants an auditable pack and blocks premature interpretation. Her blind spot is treating a backed record as enough; the exploratory alert begins her shift toward independent physical evidence.

## Key concepts, explained here

Categorical values name groups, while quantitative values have meaningful numerical distance. SOCS requires shape, unusual values, center, and spread in context. Resistant summaries remain stable under extremes. A parameter describes the population; a sample statistic estimates it.


## Stop 1 - Name the Data

**Format/placement:** CHOICE, asked by Lena Wu beside `commitment-terminal`.

**Metadata:** Concept: variable type and graph choice; Keystone: keystone distribution description; Area: Endpoint Adjudication; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Talk to Lena Wu, at the commitment terminal in Regulatory & Registry.

**Stop reason - exact player copy:** The registry cannot pair each promised outcome with an honest display until its variable type is clear.

**Question card story setup - exact player copy:** The registry lists treatment arm, serious-event grade, recovery days, and whether each patient improved. Classifying the primary outcome first determines which display can reveal its pattern without turning category codes into fake measurements.

**Question card story-science connection - exact player copy:** Treating category labels as quantities could create a meaningless average and mislead the board.

**Question card prompt - exact player copy:** Primary outcome: improved by day 30, yes or no. Submit one selection: categorical with bar chart; categorical with histogram; quantitative with bar chart; quantitative with boxplot.

**Choices:**

1. Categorical variable with a bar chart. **(correct)**

2. Categorical variable with a histogram.

3. Quantitative variable with a bar chart.

4. Quantitative variable with a boxplot.

**Correct result:** Improved/not improved is categorical, so compare counts or proportions with a bar chart.

**Answer text:** The completed check shows improved/not improved is categorical, so compare counts or proportions with a bar chart.

**Why:** Treating category labels as quantities could create a meaningless average and mislead the board.

**Wrong-path feedback:** (2) **Categorical with histogram:** Histograms require numerical intervals; yes/no outcomes have categories. (3) **Quantitative with bar chart:** Coding yes/no as numbers does not make arithmetic differences meaningful. (4) **Quantitative with boxplot:** A boxplot summarizes a quantitative distribution, not two outcome categories.

**State/output:** Primary outcome gains a text CATEGORICAL label; unlock S2; sets up M9 and M12.

## Stop 2 - Describe Before Judging

**Format/placement:** SEQUENCE, at `records-wall`.

**Metadata:** Concept: SOCS and graph uses; Keystone: keystone distribution description; Area: Endpoint Adjudication; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the records wall, in Regulatory & Registry.

**Stop reason - exact player copy:** The board needs a fixed description order before anyone argues that one arm looks better.

**Question card story setup - exact player copy:** With the primary outcome classified, the recovery-days histogram becomes the first quantitative evidence the team can inspect. A fixed description order prevents the most dramatic bar or point from replacing the full distribution.

**Question card story-science connection - exact player copy:** Shape determines whether mean and standard deviation or median and IQR best summarize what patients experienced.

**Question card prompt - exact player copy:** The histogram is unimodal and right-skewed with two high values. Order four cards: shape in context; unusual values; center in context; spread in context.

**Correct result:** Describe shape, outliers, center, and spread, using recovery days and treatment arms in every statement.

**Answer text:** The completed check shows describe shape, outliers, center, and spread, using recovery days and treatment arms in every statement.

**Why:** Shape determines whether mean and standard deviation or median and IQR best summarize what patients experienced.

**Wrong-path feedback:** List values without comparisons; require SOCS in patient context

**State/output:** SOCS CHECK appears; unlock S3; sets up M2.

## Stop 3 - Mark the Extreme

**Format/placement:** BALLPARK, at `evidence-desk`.

**Metadata:** Concept: IQR outlier rule; Keystone: keystone distribution description; Area: Endpoint Adjudication; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the evidence desk, in Regulatory & Registry.

**Stop reason - exact player copy:** Two long recoveries may be real patients, so the registry must flag rather than erase them.

**Question card story setup - exact player copy:** The right-skewed shape makes median and IQR the safer summary, but the two high recovery times still need an objective check. Compute the upper fence before deciding whether 34 days receives an outlier flag.

**Question card story-science connection - exact player copy:** An outlier flag triggers source review; it does not grant permission to delete a patient.

**Question card prompt - exact player copy:** Using Q1=10 days, Q3=18 days, IQR=Q3-Q1, and upper fence=Q3+1.5(IQR), submit the upper fence in days and whether the 34-day record is flagged.

**Correct result:** IQR = 8 days; upper fence = 18 + 1.5(8) = 30 days. Since 34 > 30, flag it and keep it pending review.

**Answer text:** The completed check shows iQR = 8 days; upper fence = 18 + 1.5(8) = 30 days. Since 34 > 30, flag it and keep it pending review.

**Why:** An outlier flag triggers source review; it does not grant permission to delete a patient.

**Wrong-path feedback:** number in days, then flag selection

**State/output:** The 34-day record gains amber REVIEW, DO NOT DELETE; unlock S4; pays off M2/M7.

## Stop 4 - Seal the Claims

**Format/placement:** ATTEST, asked by Lena Wu beside `claim-ledger`.

**Metadata:** Concept: pre-specification and scope; Keystone: keystone study design; Area: Randomisation & Blinding; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Lena Wu, at the claim ledger in Regulatory & Registry.

**Stop reason - exact player copy:** Lena must know which claims have independent timestamps before she seals the first pack piece.

**Question card story setup - exact player copy:** The variables and summaries are now defined, but only claims fixed before enrollment can keep their planned error rates. Compare each claim with the registry timestamp and identify the critical claim that lacks prior backing.

**Question card story-science connection - exact player copy:** A clear sample statistic cannot turn an unregistered observation into a pre-specified population claim.

**Question card prompt - exact player copy:** Verification limit 3. Claims: primary 30-day improvement backed/critical; serious-event rate backed; recovery-time mean backed; two-site treatment interaction unbacked/critical; exploratory lab marker unbacked. Spend three checks; submit three backed claims and label the interaction exploratory.

**Complete format-specific interaction block:** `attest:{verification_limit:3,claims:[{id:"primary_30d",label:"primary 30-day improvement",backed:true,critical:true},{id:"serious_event",label:"serious-event rate",backed:true,critical:true},{id:"recovery_mean",label:"recovery-time mean",backed:true,critical:false},{id:"site_interaction",label:"two-site treatment interaction",backed:false,critical:true},{id:"lab_marker",label:"exploratory lab marker",backed:false,critical:false}],required_checks:["primary_30d","serious_event","recovery_mean"],critical_unbacked:"site_interaction",correct_conclusion:"label the interaction exploratory",answerText:"Verify the three backed claims and label the critical, unbacked site interaction exploratory."}`

**Correct result:** Verify the first three; interaction is critical but unbacked.

**Answer text:** Keep the three timestamped claims as pre-specified and report the two-site pattern transparently as exploratory monitoring evidence.

**Why:** A clear sample statistic cannot turn an unregistered observation into a pre-specified population claim.

**Wrong-path feedback:** Timestamp proves truth; separate timing from condition

**State/output:** Binder piece 1 appears; next briefing unlocks; sets up M4/M13.

## Mission outcome

Mission decision: Put the three timed claims in the board pack. Mark the two-site pattern as a clue, not proof. The log shows when each claim was made. Two odd recovery records now need a full check.

### Post-mission metric screen - exact player copy

**Header:** MISSION 1 COMPLETE. **Timer:** TIME {elapsed} / TARGET 12:00. **Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}. **Story event:** Registry recovered before analysis. **Automatic:** Evidence +4; Safety +0; Integrity +6; Time -2. **Recovery:** shared formula and allocation prompt. **Canonical QA:** 46/54/68/64 after 12 RP allocated 4/2/4/2. **Failure:** restore if any bar is 0%.

## Quick concept review
- Match graphs to variable type.
- Describe quantitative data with shape, unusual values, center, and spread.
- **Mission takeaway:** Median and IQR resist extreme values.

# Mission 2 - What Was Measured

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** DAY 2 - BOARD IN 14 DAYS  
**Card title:** What Was Measured  
**Go now:** Go to the Adjudication Room and meet Amina Okafor, endpoint adjudication lead, at the outcome viewer.  
**Card body:** The registered claims are secure, but two extreme recovery records could distort the treatment summary. A distribution shows how patient values vary, while standardization shows how unusual one value is. At the outcome viewer, compare summaries, standardize records, and test the normal model. By the end of the mission, decide how recovery time should be measured and summarized.  
**Objective:** Approve a defensible recovery-time procedure.

### Worth knowing first - exact player copy

#### Glossary terms

Resistant statistic: a summary changed little by extreme values.  
Standard deviation: typical distance of values from their mean.  
Percentile: the percent of observations at or below a value.  
Normal model: a symmetric bell-shaped model described by mean and standard deviation.

#### Primer concepts

- Right skew usually pulls the mean above the median.
- Mean and SD suit symmetric data; median and IQR suit skewed data.
- Standardizing places different measurements on a common scale.

#### Equations first needed today
**Equation:** z = (x - mean) / SD

**What it is for:** Finding how many standard deviations a value lies from its mean.

**Symbols:** x is the observed value; mean is the distribution mean; SD is its standard deviation; z is the standardized score.

**Why this campaign needs it:** The audit must compare unusually long recoveries across hospitals with different baselines.## Main story happening - designer summary

Amina reopens source scans rather than deleting extremes. The player sees that the mean changes sharply while the median does not, calculates a z-score, verifies the normal-model range, and selects median/IQR plus a source-review rule. **Beats:** arrival bubble: "An extreme value can be wrong, rare, or important. We check before choosing." After S1, panel labels mean 8 and median 5. After S2-S3, two source scans appear with z tags and NORMAL MODEL: LIMITED FIT. After S4, procedure placard changes to MEDIAN/IQR; binder slot 2 fills. **One location:** only adjudication has images and definitions needed to verify measurement. The mission distinguishes resistant/nonresistant summaries, range, percentiles, and the empirical rule.

## Designer intent - not shown to player

Make distribution shape control summary choice and normal-model use. Extreme values remain evidence rather than disposable inconvenience.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at the Adjudication Room | `outcome-viewer` | automatic**

**World state:** Arrival: trigger room entry; location ADJUD; nearby bubble; outcome viewer shows two flagged scans; dialogue shown above;  - After S1: trigger correct commit; equipment update; player control restored; panel shows MEAN 8 / MEDIAN 5;  - After S2-S3: trigger measurement; persistent state; z tags and LIMITED FIT text appear;  - Final/outcome: trigger S4; character bubble then placard change; binder slot 2 fills; unlock metric screen.

**Panel/HUD text:** MISSION 2: WHICH CENTER SURVIVES OPEN

**Dialogue bubbles -** Amina Okafor: "Start with which center survives. We need evidence the next decision can use."

**Unlocks/waypoint:** Unlock Stop 5 at `outcome-viewer` in the Adjudication Room.

**Beat 2 - After Stop 5 | `adjudication-desk` | automatic**

**World state:** The which center survives result remains visible while the put hospitals on one scale fixture lights.

**Panel/HUD text:** STOP 5 RECORDED - STOP 6 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 5 result to settle put hospitals on one scale."

**Unlocks/waypoint:** Unlock Stop 6 at `adjudication-desk` in the Adjudication Room.

**Beat 3 - After Stop 6 | `outcome-viewer` | automatic**

**World state:** The put hospitals on one scale result remains visible while the test the bell fixture lights.

**Panel/HUD text:** STOP 6 RECORDED - STOP 7 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 6 result to settle test the bell."

**Unlocks/waypoint:** Unlock Stop 7 at `outcome-viewer` in the Adjudication Room.

**Beat 4 - After Stop 7 | `outcome-viewer` | automatic**

**World state:** The test the bell result remains visible while the approve the procedure fixture lights.

**Panel/HUD text:** STOP 7 RECORDED - STOP 8 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 7 result to settle approve the procedure."

**Unlocks/waypoint:** Unlock Stop 8 at `outcome-viewer` in the Adjudication Room.

**Beat 5 - At mission end | `outcome-viewer` | automatic**

**World state:** One location, ADJUD, because only its source images can distinguish rare verified outcomes from entry errors.

**Panel/HUD text:** MISSION 2 EVIDENCE: RECORDED

**Dialogue bubbles -** Amina Okafor: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

One location, ADJUD, because only its source images can distinguish rare verified outcomes from entry errors.

## Characters and dramatic beat

Amina wants a consistent endpoint but will not erase real patients. The failed Normal fit moves her from one universal summary to a shape-based procedure.

## Key concepts, explained here

Mean, SD, and range are sensitive to extremes; median and IQR resist them. z expresses distance from a mean in SD units. The 68-95-99.7 rule applies only when a Normal model fits.


## Stop 5 - Which Center Survives

**Format/placement:** BALLPARK, at `outcome-viewer`.

**Metadata:** Concept: mean, median, skew; Keystone: keystone distributions; Area: Endpoint Adjudication; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the outcome viewer, in the Adjudication Room.

**Stop reason - exact player copy:** Amina needs to know whether one long recovery is driving the reported average benefit.

**Question card story setup - exact player copy:** The verified sample contains recovery times of 4, 5, 5, 6, and 20 days. Compare the mean and median to learn which summary stays closer to the experience of most patients.

**Question card story-science connection - exact player copy:** A treatment claim built on a pulled mean may exaggerate what a typical patient gains.

**Question card prompt - exact player copy:** Submit mean and median in days from values 4,5,5,6,20; formula mean=sum/5. BALLPARK slots sum,mean,median; targets 40,8,5; tolerances 0,0.01,0.01.

**Correct result:** Mean = 40/5 = 8 days; median = 5 days. The high value pulls the mean above the median, matching right skew.

**Answer text:** The completed check shows mean = 40/5 = 8 days; median = 5 days. The high value pulls the mean above the median, matching right skew.

**Why:** A treatment claim built on a pulled mean may exaggerate what a typical patient gains.

**Wrong-path feedback:** pair: mean days, median days

**State/output:** Viewer displays MEAN 8, MEDIAN 5; unlock S2.

## Stop 6 - Put Hospitals on One Scale

**Format/placement:** DERIVE, at `adjudication-desk`.

**Metadata:** Concept: z-score and percentile meaning; Keystone: keystone normal model; Area: Statistics & Analysis; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the adjudication desk, in the Adjudication Room.

**Stop reason - exact player copy:** Raw days cannot show whether 84 hours is equally unusual at hospitals with different baselines.

**Question card story setup - exact player copy:** With the resistant center chosen, one hospital's delay must still be compared with its own baseline. Build the standardization from an observed 84 hours, mean 70 hours, and standard deviation 7 hours.

**Question card story-science connection - exact player copy:** A common z-scale identifies which record deserves the first source check.

**Question card prompt - exact player copy:** Build three licensed lines and submit z with no unit: deviation 84-70=14 hours [subtract mean]; z=14/7 [divide by SD]; z=2 [simplify]. Decoys include 84/70 and 14/49.

**Complete format-specific interaction block:** `derive:{"goal":"z-score for 84 hours","givens":["x=84 h","mean=70 h","SD=7 h"],"lines":[{"id":"L1","expression":"deviation=84-70=14 h","license":"state governing relationship"},{"id":"L2","expression":"z=14/7=2","license":"substitute displayed values"}],"keyed_order":["L1","L2"],"decoys":["84/70","14/49"],"correct_result":"z=2","answerText":"The delay is two standard deviations above its hospital mean; z is unitless."}`

**Correct result:** z=2 exactly, tolerance 0.01.

**Answer text:** z = (84-70)/7 = 2, so the delay is two standard deviations above that hospital's mean and near the 97.5th percentile under a Normal model.

**Why:** A common z-scale identifies which record deserves the first source check.

**Wrong-path feedback:** unitless z number

**State/output:** Record gains z=+2 and HIGH TAIL text; unlock S3.

## Stop 7 - Test the Bell

**Format/placement:** VERIFY, at `outcome-viewer`.

**Metadata:** Concept: 68-95-99.7 rule; Keystone: keystone normal model; Area: Statistics & Analysis; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the outcome viewer, in the Adjudication Room.

**Stop reason - exact player copy:** The team must verify whether a bell-shaped benchmark can summarize ordinary recovery times.

**Question card story setup - exact player copy:** The standardized record lies two deviations high, so the viewer can test the model against the full verified sample. Predict the percent expected between 56 and 84 hours when mean is 70 and SD is 7.

**Question card story-science connection - exact player copy:** If observed coverage differs sharply from 95%, normal-model tail claims cannot govern source review.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use the 68-95-99.7 rule with mean 70 h, SD 7 h, and interval 56-84 h; submit the predicted percent before the viewer unlocks. **OPERATE:** Reveal verified-sample coverage with the interval fixed. **MEASURE:** Record observed coverage. **INTERPRET:** Compare 88% with 95% and submit adequate or inadequate Normal fit; no restoration is required.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"68-95-99.7 rule for mean ±2 SD",inputs:{mean:70,sd:7,lower:56,upper:84},units:"hours",submit:{quantity:"predicted coverage",unit:"percent",truth:95,tolerance:1}},equipment_locked_until_prediction_commit:true,operation:{action:"reveal verified-sample coverage",fixed:["56-84 h interval","verified sample"]},measurements:{observed_coverage:88,unit:"percent"},restore:{required:false,reason:"reveal changes no setting"},correct_conclusion:"inadequate Normal fit",answerText:"The model predicts 95%, but observed coverage is 88%, so the Normal tail model is inadequate."}`

**Correct result:** Prediction 95%; observed coverage 88%; conclusion `inadequate Normal fit`; prediction tolerance 1 percentage point.

**Answer text:** The model predicts about 95% within two SD, but only 88% are inside. The heavy right tail makes the Normal model inadequate for tail decisions.

**Why:** If observed coverage differs sharply from 95%, normal-model tail claims cannot govern source review.

**Wrong-path feedback:** predicted percent, then fit conclusion

**State/output:** NORMAL MODEL: LIMITED FIT appears in words and icon; unlock S4.

## Stop 8 - Approve the Procedure

**Format/placement:** DIAGNOSIS, at `outcome-viewer`.

**Metadata:** Concept: graph choice, resistance, outlier treatment; Keystone: keystone distributions; Area: Endpoint Adjudication; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the outcome viewer, in the Adjudication Room.

**Stop reason - exact player copy:** Amina must lock one procedure before the next data export.

**Question card story setup - exact player copy:** The mean is pulled upward, the median remains stable, and observed tail coverage fails the Normal benchmark. Choose the one procedure that fits all readings while preserving extreme records for source review.

**Question card story-science connection - exact player copy:** The measurement rule determines whether later treatment comparisons answer the registered patient question.

**Question card prompt - exact player copy:** Compare the displayed shape, center, spread, Normal-fit, and source-status readings. Submit the endpoint procedure that preserves extremes while using resistant summaries.

**Complete format-specific interaction block:** headline RECOVERY SUMMARY; readings: histogram right-skew alarm, mean 8 quiet, median 5 quiet, IQR fence flags 20 alarm, normal coverage 88% alarm. Choices with mechanisms: mean/SD delete extremes; median/IQR retain-and-review; range only; category average. Answer median/IQR retain-and-review.

**Correct result:** Report median and IQR, compare arms with boxplots, and retain flagged records until source review resolves them.

**Answer text:** The completed check shows report median and IQR, compare arms with boxplots, and retain flagged records until source review resolves them.

**Why:** The measurement rule determines whether later treatment comparisons answer the registered patient question.

**Wrong-path feedback:** Delete extremes or force Normality; retain sources

**State/output:** Measurement procedure locks; binder piece 2 fills; M3 unlocks.

## Mission outcome

Mission decision: Use the median and IQR for the uneven recovery times. Check flagged records instead of deleting them. The Normal model misses the long tail. The method now fits most patients. Two hospitals still have safety alerts.

### Post-mission metric screen - exact player copy

MISSION 2 COMPLETE; TIME {elapsed} / TARGET 13:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Endpoint recheck uses one work shift; E+4/S+2/I+4/T-4; shared RP copy; canonical QA 54/58/76/62 after 4/2/4/2 RP; restore on any 0%.

## Quick concept review
- Right skew pulls mean above median.
- A z-score compares distance from a mean in SD units.
- **Mission takeaway:** Check a Normal model before using its tail areas.

# Mission 3 - The Two-Site Alarm

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** DAY 3 - BOARD IN 13 DAYS  
**Card title:** The Two-Site Alarm  
**Go now:** Go to the Monitoring Board Room and meet Jonas Berg, safety monitoring chair, at the event console.  
**Card body:** The recovery procedure is defensible, but serious events remain concentrated at two hospitals. Probability rules separate coincidence from patterns that need action. At the event console, calculate unions, conditional rates, and the expectation under independence. By the end of the mission, decide whether to pause enrollment at those hospitals.  
**Objective:** Determine whether the two-site signal needs immediate action.

### Worth knowing first - exact player copy

#### Glossary terms

Union: the event that A or B or both occur.  
Intersection: the event that A and B both occur.  
Conditional probability: the probability of A among cases where B occurred.  
Independent events: events for which knowing one occurred does not change the probability of the other.  
Mutually exclusive events: events that cannot occur together.

#### Primer concepts

- Use a complement to find at least one event.
- Mutually exclusive and independent do not mean the same thing.
- Rates need denominators; counts alone can hide exposure.

#### Equations first needed today
**Equation:** P(A union B)=P(A)+P(B)-P(A and B)

**What it is for:** Avoiding double-counting cases in both events.

**Symbols:** A and B are events; P gives probability.

**Why this campaign needs it:** Some reports belong to both a site cluster and a lab flag.

**Equation:** P(A given B)=P(A and B)/P(B)

**What it is for:** Finding a rate within a selected group.

**Symbols:** A given B means A among B cases.

**Why this campaign needs it:** The board needs the event rate among flagged shipments.## Main story happening - designer summary

Jonas first treats the raw cluster as enough to stop globally. Probability shows overlap and conditional concentration, then a controlled comparison rejects independence without claiming certainty about cause. **Beats:** arrival event map; after S1 overlap cells illuminate; after S2 shipment filter opens; after S3 sites 12 and 19 gain PAUSED signs; after S4 binder piece 3 fills and a hidden early-analysis timestamp appears. **One location:** only BOARD has unblinded safety denominators. Conditional probability changes the denominator; independent events multiply; mutually exclusive nonzero events cannot be independent.

## Designer intent - not shown to player

Use probability to convert alarming counts into disciplined targeted action while preventing causal overclaim.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at the Monitoring Board Room | `event-console` | automatic**

**World state:** Arrival: BOARD entry; nearby bubble; event map shows two-site cluster; Jonas says, ;  - After S1-S2: correct commits; panel update; overlap becomes 11% and shipment subset 40%; player control restored;  - After S3: model restore confirmed; persistent signs mark sites 12/19 PAUSED;  - Final/outcome: S4 decision; early timestamp appears on console; binder 3 fills; metric screen unlocks.

**Panel/HUD text:** MISSION 3: COUNT THE OVERLAP ONCE OPEN

**Dialogue bubbles -** Jonas Berg: "Show me the denominator before I stop everyone"

**Unlocks/waypoint:** Unlock Stop 9 at `event-console` in the Monitoring Board Room.

**Beat 2 - After Stop 9 | `event-console` | automatic**

**World state:** The count the overlap once result remains visible while the ask among the flagged fixture lights.

**Panel/HUD text:** STOP 9 RECORDED - STOP 10 OPEN

**Dialogue bubbles -** Jonas Berg: "Use the Stop 9 result to settle ask among the flagged."

**Unlocks/waypoint:** Unlock Stop 10 at `event-console` in the Monitoring Board Room.

**Beat 3 - After Stop 10 | `event-console` | automatic**

**World state:** The ask among the flagged result remains visible while the test independence fixture lights.

**Panel/HUD text:** STOP 10 RECORDED - STOP 11 OPEN

**Dialogue bubbles -** Jonas Berg: "Use the Stop 10 result to settle test independence."

**Unlocks/waypoint:** Unlock Stop 11 at `event-console` in the Monitoring Board Room.

**Beat 4 - After Stop 11 | `board-console` | automatic**

**World state:** The test independence result remains visible while the pause the right places fixture lights.

**Panel/HUD text:** STOP 11 RECORDED - STOP 12 OPEN

**Dialogue bubbles -** Jonas Berg: "Use the Stop 11 result to settle pause the right places."

**Unlocks/waypoint:** Unlock Stop 12 at `board-console` in Monitoring Board Room.

**Beat 5 - At mission end | `event-console` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 3 EVIDENCE: RECORDED

**Dialogue bubbles -** Jonas Berg: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

One location, BOARD, because only the unblinded safety room can expose arm and site denominators.

## Characters and dramatic beat

Jonas wants immediate protection and initially favors a global stop. The stable readings at 29 sites move him to a narrower pause.

## Key concepts, explained here

The addition rule removes double-counted overlap; conditioning changes the denominator. Independence means one event does not change the probability of another. Mutually exclusive events cannot occur together and, unless one has probability zero, are not independent.


## Stop 9 - Count the Overlap Once

**Format/placement:** DERIVE, at `event-console`.

**Metadata:** Concept: addition rule; Keystone: keystone probability; Area: Statistics & Analysis; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the event console, in the Monitoring Board Room.

**Stop reason - exact player copy:** Duplicate reports must be removed before the board sees a combined alarm rate.

**Question card story setup - exact player copy:** Eight percent of patients had a serious event, five percent had a shipment flag, and two percent had both. Build the union calculation to find the percent with at least one warning.

**Question card story-science connection - exact player copy:** Double-counting overlap would exaggerate the apparent size of the safety problem.

**Question card prompt - exact player copy:** Lines: P(A or B)=P(A)+P(B)-P(A and B) [addition rule]; =0.08+0.05-0.02 [substitute]; =0.11 [simplify]. Decoys omit subtraction or subtract twice. Submit probability.

**Complete format-specific interaction block:** `derive:{"goal":"P(A or B)","givens":["P(A)=0.08","P(B)=0.05","P(A and B)=0.02"],"lines":[{"id":"L1","expression":"P(A or B)=P(A)+P(B)-P(A and B)","license":"state governing relationship"},{"id":"L2","expression":"=0.08+0.05-0.02","license":"substitute displayed values"},{"id":"L3","expression":"=0.11","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["0.13","0.09"],"correct_result":"0.11 or 11%","answerText":"The union probability is 0.11 because the overlap must be subtracted once."}`

**Correct result:** 0.11 or 11%, tolerance 0.001.

**Answer text:** P(A union B)=0.08+0.05-0.02=0.11, so 11% had at least one warning.

**Why:** Double-counting overlap would exaggerate the apparent size of the safety problem.

**Wrong-path feedback:** probability or percent

**State/output:** overlap display changes from duplicated 13% to unique 11%; unlock S2.

## Stop 10 - Ask Among the Flagged

**Format/placement:** BALLPARK, at `event-console`.

**Metadata:** Concept: conditional probability; Keystone: keystone probability; Area: Statistics & Analysis; Learning role: PRACTICE; Difficulty: L2; Story role: reveal.

**Call - exact player copy:** Go to the event console, in the Monitoring Board Room.

**Stop reason - exact player copy:** The board must know how often serious events occurred specifically among flagged shipments.

**Question card story setup - exact player copy:** With duplicate reports removed, the shipment flag can become the conditioning group rather than another headline count. Use the two-percent overlap and five-percent flag rate to calculate the serious-event probability among flagged shipments.

**Question card story-science connection - exact player copy:** A high conditional rate directs the next inspection toward handling without proving that handling caused harm.

**Question card prompt - exact player copy:** visible P(A and B)=0.02, P(B)=0.05; formula P(A|B)=P(A and B)/P(B); correct 0.40 or 40%; tolerance 0.005.

**Correct result:** P(serious event | shipment flag)=0.02/0.05=0.40, so 40% of flagged shipments coincide with a serious event.

**Answer text:** The completed check shows p(serious event | shipment flag)=0.02/0.05=0.40, so 40% of flagged shipments coincide with a serious event.

**Why:** A high conditional rate directs the next inspection toward handling without proving that handling caused harm.

**Wrong-path feedback:** conditional probability or percent

**State/output:** shipment lane gains 40% conditional-rate label; unlock S3.

## Stop 11 - Test Independence

**Format/placement:** CONTROL, at `event-console`.

**Metadata:** Concept: multiplication rule and independence; Keystone: keystone probability; Area: Statistics & Analysis; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the event console, in the Monitoring Board Room.

**Stop reason - exact player copy:** Jonas needs a comparison between the observed overlap and what independence predicts.

**Question card story setup - exact player copy:** The conditional rate is high, but concentration alone does not show whether shipment flags and serious events move independently. Predict the overlap under independence, then compare it with the observed two-percent overlap while holding the cohort fixed.

**Question card story-science connection - exact player copy:** A failed independence prediction justifies a targeted pause, not a claim that shipment handling caused every event.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $P(F\cap E)=P(F)P(E)$ with $P(F)=0.08$ and $P(E)=0.05$; submit the predicted overlap as a percent before the model switch unlocks. **OPERATE:** Change only the association model from observed to independent while cohort, marginal rates, and time window stay fixed. **MEASURE:** Record overlap under independence, restore the observed model, and record overlap again. **INTERPRET:** Submit independent or not independent and the numerical comparison.

**Complete format-specific interaction block:** `control:{candidates:[{id:"association_model",label:"association model"},{id:"flag_rate",label:"shipment-flag marginal rate"},{id:"event_rate",label:"serious-event marginal rate"}],correct_control:"association_model",prediction:{equation:"P(F∩E)=P(F)P(E)",inputs:{P_F:0.08,P_E:0.05},submit:{unit:"percent",truth:0.4,tolerance:0.05}},equipment_locked_until_prediction_commit:true,baseline:{model:"observed",overlap:2.0,unit:"percent"},response:{model:"independent",overlap:0.4,unit:"percent"},noise_band:{value:0.05,unit:"percentage point"},fixed:["cohort","marginal rates","time window"],measure_when:"after each model settles",restore:{required:true,model:"observed",overlap:2.0,remeasure:true},correct_conclusion:"not independent",answerText:"Independence predicts 0.4%, but the restored observed overlap is 2.0%, so the events are associated."}`

**Correct result:** Predicted independent overlap 0.4%; independent-model reading 0.4%; restored observed reading 2.0%; conclusion `not independent`; prediction tolerance 0.05 percentage point.

**Answer text:** Independence predicts 0.08(0.05)=0.004=0.4%, far below the observed 2.0%. The events are associated, but this alone does not prove causation.

**Why:** A failed independence prediction justifies a targeted pause, not a claim that shipment handling caused every event.

**Wrong-path feedback:** predicted percent, readings, conclusion

**State/output:** NOT INDEPENDENT appears with broken-link icon; unlock S4.

## Stop 12 - Pause the Right Places

**Format/placement:** DIAGNOSIS, at `board-console`.

**Metadata:** Concept: complement, independence versus exclusivity, exposure denominators; Keystone: keystone probability; Area: Statistics & Analysis; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the board console, in Monitoring Board Room.

**Stop reason - exact player copy:** Jonas must choose between no pause, a global stop, and a targeted two-site pause.

**Question card story setup - exact player copy:** The unique warning rate is 11%, flagged shipments have a 40% serious-event rate, and observed overlap is five times the independent prediction. Choose the action fitting all evidence without claiming a cause the data cannot establish.

**Question card story-science connection - exact player copy:** The narrowest safe action preserves evidence while preventing more exposure where the signal is concentrated.

**Question card prompt - exact player copy:** Compare the 11% warning rate, 40% conditional rate, 2.0% overlap, 0.4% independence expectation, and 29 stable sites. Submit one action and causal-scope conclusion.

**Complete format-specific interaction block:** headline TWO-SITE SIGNAL; readings overall event rate 8 alarm, overlap 2 alarm, independence expectation 0.4 quiet benchmark, 29 other sites stable quiet. Choices: continue all; stop all; pause sites 12/19 and audit handling; declare drug cause. Answer targeted pause/audit.

**Correct result:** Pause enrollment at sites 12 and 19, audit flagged shipments, and continue enhanced monitoring elsewhere. Association warrants action but does not establish cause.

**Answer text:** The completed check shows pause enrollment at sites 12 and 19, audit flagged shipments, and continue enhanced monitoring elsewhere. Association warrants action but does not establish cause.

**Why:** The narrowest safe action preserves evidence while preventing more exposure where the signal is concentrated.

**Wrong-path feedback:** Global stop is safest; compare 29 quiet sites

**State/output:** two site signs change to PAUSED in text; binder piece 3 fills; timestamp clue unlocks M4.

## Mission outcome

Mission decision: Pause work at the two flagged hospitals. Check their drug shipments. The shared pattern is far above what chance predicts. It shows a link, not a cause. A hidden early analysis also needs review.

### Post-mission metric screen - exact player copy

MISSION 3 COMPLETE; TIME {elapsed} / TARGET 14:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Verified cluster pauses two sites; E+2/S+6/I+2/T-4; shared RP copy; canonical QA 59/68/81/60 after 3/4/3/2 RP; restore on any 0%.

## Quick concept review
- Conditional probability changes the denominator.
- Subtract overlap in an addition rule.
- **Mission takeaway:** Independence predicts a product; association does not prove cause.

# Mission 4 - The Opened Envelope

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** DAY 4 - BOARD IN 12 DAYS  
**Card title:** The Opened Envelope  
**Go now:** Go to Statistics & Analysis and meet Tomas Reed, trial statistician, at the interim-analysis board.  
**Card body:** The targeted pause is justified, but an analysis folder was opened before the registered review. Repeated early looks increase the chance of acting on random noise. At the analysis board, model event counts, combine uncertainty, and set error rules. By the end of the mission, decide how the unplanned look must change later inference.  
**Objective:** Account for the unplanned interim analysis.

### Worth knowing first - exact player copy

#### Glossary terms
Random variable: a numerical outcome determined by chance.  
Expected value: the long-run average value of a random variable.  
Type I error: rejecting a true null hypothesis.  
Type II error: failing to reject a false null hypothesis.  
Power: the probability that a test rejects a false null hypothesis.

#### Primer concepts
- Means of sums or differences add or subtract.
- Variances add for independent random variables, even for a difference.
- More unplanned tests create more chances for a false positive.

#### Equations first needed today
**Equation:** E(X)=sum[xP(x)]
**What it is for:** Finding a random variable's long-run mean.
**Symbols:** x is a possible value; P(x) is its probability.
**Why this campaign needs it:** The board must forecast event workload.

**Equation:** Var(X plus or minus Y)=Var(X)+Var(Y), for independent X and Y

**What it is for:** Combining independent uncertainty.

**Symbols:** Var is variance; X and Y are random variables.

**Why this campaign needs it:** Two site streams feed one safety total.## Main story happening - designer summary

Tomas admits an analyst opened labels to answer an urgent query. Expected value forecasts reports, variance gives their combined spread, binomial risk quantifies at least one event, and a trigger board records error costs. **Beats:** arrival folder timestamp; after S1-S2 workload and uncertainty gauges; after S3 the chance counter illuminates; after S4 the early look is stamped DISCLOSED and binder piece 4 fills. **One location:** only STAT holds the unplanned output and simulation board.

## Designer intent - not shown to player

Turn an audit breach into an authentic probability-and-decision sequence: quantify random workload, model event risk, and precommit error costs.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Statistics & Analysis | `analysis-board` | automatic**

**World state:** Arrival: trigger STAT entry; nearby bubble; folder timestamp visible; Tomas says, ;  - After S1-S2: correct commits; equipment update; workload reads 0.35 and total SD 5; player control restored;  - After S3: simulation complete; persistent counter shows 55.8% AT LEAST ONE;  - Final: threshold committed; report stamped DISCLOSED; binder 4 fills; outcome and screen unlock.

**Panel/HUD text:** MISSION 4: EXPECTED REPORTS OPEN

**Dialogue bubbles -** Tomas Reed: "An urgent look still counts as a look"

**Unlocks/waypoint:** Unlock Stop 13 at `analysis-board` in Statistics & Analysis.

**Beat 2 - After Stop 13 | `analysis-board` | automatic**

**World state:** The expected reports result remains visible while the combine two streams fixture lights.

**Panel/HUD text:** STOP 13 RECORDED - STOP 14 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 13 result to settle combine two streams."

**Unlocks/waypoint:** Unlock Stop 14 at `analysis-board` in Statistics & Analysis.

**Beat 3 - After Stop 14 | `simulation-console` | automatic**

**World state:** The combine two streams result remains visible while the at least one event fixture lights.

**Panel/HUD text:** STOP 14 RECORDED - STOP 15 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 14 result to settle at least one event."

**Unlocks/waypoint:** Unlock Stop 15 at `simulation-console` in Statistics & Analysis.

**Beat 4 - After Stop 15 | `uncertainty-console` | automatic**

**World state:** The at least one event result remains visible while the price the errors fixture lights.

**Panel/HUD text:** STOP 15 RECORDED - STOP 16 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 15 result to settle price the errors."

**Unlocks/waypoint:** Unlock Stop 16 at `uncertainty-console` in Statistics & Analysis.

**Beat 5 - At mission end | `analysis-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 4 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

One location, STAT, because only its unblinded simulator and audit log can reproduce the early analysis.

## Characters and dramatic beat

Tomas values formal plans but owns the urgent breach. He changes from defending intent to recording statistical cost.

## Key concepts, explained here

Expected value is a probability-weighted long-run mean. Independent variances add, then SD is their square root. Binomial models use fixed n and p; Type I and II errors price opposite bad decisions.


## Stop 13 - Expected Reports

**Format/placement:** DERIVE, at `analysis-board`.

**Metadata:** Concept: expected value; Keystone: keystone random variables; Area: Endpoint Adjudication; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the analysis board, in Statistics & Analysis.

**Stop reason - exact player copy:** Staffing cannot be set until the team knows the expected number of reports per site-day.

**Question card story setup - exact player copy:** A site-day produces 0 reports with probability 0.70, 1 with probability 0.25, and 2 with probability 0.05. Build the expected-value sum before assigning the limited overnight clinical patient-safety review shift.

**Question card story-science connection - exact player copy:** Expected workload controls whether delayed review could create a safety blind spot.

**Question card prompt - exact player copy:** Order licensed lines E(X)=sum xP(x); =0(.70)+1(.25)+2(.05); =0.35 reports/site-day. Decoys average 0,1,2 equally or omit weights. Submit reports/site-day.

**Complete format-specific interaction block:** `derive:{"goal":"expected reports per site-day","givens":["P(0)=0.70","P(1)=0.25","P(2)=0.05"],"lines":[{"id":"L1","expression":"E(X)=sum xP(x)","license":"state governing relationship"},{"id":"L2","expression":"=0(0.70)+1(0.25)+2(0.05)","license":"substitute displayed values"},{"id":"L3","expression":"=0.35 reports/site-day","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["1.00","0.30"],"correct_result":"0.35 reports/site-day","answerText":"The long-run mean is 0.35 reports per site-day after weighting each count by its probability."}`

**Correct result:** 0.35 reports per site-day, tolerance 0.001.

**Answer text:** The expected workload is 0.35 report per site-day; this is a long-run average, not a possible count for one site-day.

**Why:** Expected workload controls whether delayed review could create a safety blind spot.

**Wrong-path feedback:** reports per site-day

**State/output:** The workload gauge displays 0.35 reports per site-day and unlocks Stop 14.

## Stop 14 - Combine Two Streams

**Format/placement:** DERIVE, at `analysis-board`.

**Metadata:** Concept: independent sums of RVs and linear transforms; Keystone: keystone random variables; Area: Endpoint Adjudication; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the analysis board, in Statistics & Analysis.

**Stop reason - exact player copy:** Two independent regions share one queue, so their total mean and SD must be forecast correctly.

**Question card story setup - exact player copy:** Region A has mean 10 reports and SD 3; Region B has mean 8 and SD 4. Combine their independent streams to size the queue without incorrectly adding standard deviations.

**Question card story-science connection - exact player copy:** Understating spread could leave serious reports waiting beyond the review limit.

**Question card prompt - exact player copy:** Build E(A+B)=10+8=18 [linearity]; Var=3^2+4^2=25 [independent variances add]; SD=sqrt25=5 [convert]. Include decoy SD=7. Submit pair 18 reports, 5 reports.

**Complete format-specific interaction block:** `derive: {visible_prompt: "Build E(A+B)=10+8=18 [linearity]; Var=3^2+4^2=25 [independent variances add]; SD=sqrt25=5 [convert]. Include decoy SD=7. Submit pair 18 reports, 5 reports.", keyed_result: "Mean 18 reports and standard deviation 5 reports.", feedback: "pair: total mean and SD in reports", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** Mean 18 reports and standard deviation 5 reports.

**Answer text:** The combined stream has mean 18 reports and SD 5 reports. For aX+b, expectation is aμ+b and SD is |a|σ.

**Why:** Understating spread could leave serious reports waiting beyond the review limit.

**Wrong-path feedback:** pair: total mean and SD in reports

**State/output:** The combined-stream gauge displays mean 18 and SD 5 and unlocks Stop 15.

## Stop 15 - At Least One Event

**Format/placement:** TALLY, at `simulation-console`.

**Metadata:** Concept: binomial complement; Keystone: keystone probability/random variables; Area: Endpoint Adjudication; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the simulation console, in Statistics & Analysis.

**Stop reason - exact player copy:** The pause length depends on the chance of seeing at least one event in 20 similar patients.

**Question card story setup - exact player copy:** With queue uncertainty sized, the board asks whether another event during review would be surprising. Use independent patient probability 0.04 and 20 fixed trials to predict at least one event.

**Question card story-science connection - exact player copy:** The result prevents one event from being treated as impossible while the audit is open.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use $P(X\ge1)=1-(1-p)^n$ with $p=0.04$ per patient and $n=20$ independent patients; submit the probability or percent before simulation unlocks. **OPERATE:** Run the displayed fixed-trial simulation. **MEASURE:** Record the simulated proportion of runs with at least one event. **INTERPRET:** Compare it with 55.8% and submit plausible or implausible; no restoration is required.

**Complete format-specific interaction block:** `tally:{prediction:{equation:"P(X≥1)=1-(1-p)^n",inputs:{p:0.04,n:20},submit:{unit:"probability or percent",truth:0.558,tolerance:0.01}},equipment_locked_until_prediction_commit:true,bins:[{id:"zero",label:"zero events"},{id:"one_plus",label:"at least one event"}],trials_per_run:20,success_probability:0.04,measure:"proportion of runs in one_plus",expected_reading:0.558,correct_conclusion:"plausible",answerText:"The complement gives 1-0.96^20=0.558, so a simulation near 55.8% is plausible."}`

**Correct result:** Prediction 0.558 or 55.8%, tolerance 1 percentage point; simulation conclusion `plausible` when the run lies within its displayed simulation band.

**Answer text:** 1-.96^20=0.558; simulation should be near 56%. This is binomial: fixed n, independent trials, constant p, two outcomes.

**Why:** The result prevents one event from being treated as impossible while the audit is open.

**Wrong-path feedback:** predicted percent and plausibility conclusion

**State/output:** The chance counter displays 55.8% and unlocks Stop 16.

## Stop 16 - Price the Errors

**Format/placement:** TRIGGER, at `uncertainty-console`.

**Metadata:** Concept: Type I/II, alpha, power; Keystone: keystone decision thresholds; Area: Monitoring Board Room; Learning role: INTRODUCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the uncertainty console, in Statistics & Analysis.

**Stop reason - exact player copy:** Later analyses need thresholds written before new results arrive.

**Question card story setup - exact player copy:** The unplanned look spent one chance to make a false claim, while a delayed true warning could also harm patients. Commit error definitions and a stricter future threshold before the hidden update appears.

**Question card story-science connection - exact player copy:** A transparent rule keeps urgency from moving the decision line after results are known.

**Question card prompt - exact player copy:** Rule: reject H0 only if adjusted p<=.025; scale 0-.10; anchors .01,.025,.05,.10; objective limit false-positive risk after extra look; direction lower p stronger; consequence limit no more than 2.5%. Submit threshold and map: Type I=stop effective trial, Type II=continue harmful trial, power=1-beta. Then reveal update p=.031 and select fail to reject.

**Complete format-specific interaction block:** `trigger:{decision_rule:"reject H0 only when adjusted p ≤ 0.025",scale:{min:0,max:0.10,anchors:[0.01,0.025,0.05,0.10]},objective:"limit false-positive risk after the extra look",direction:"smaller p is stronger evidence",consequence_limit:{value:0.025,label:"family false-positive risk"},mapping:{type_I:"stop an effective trial",type_II:"continue a harmful trial",power:"1-beta"},update:{p:0.031,decision:"fail to reject"},answerText:"The inclusive threshold is 0.025; because 0.031 is larger, fail to reject H0."}`

**Correct result:** Threshold 0.025 inclusive; update p=0.031 produces fail to reject.

**Answer text:** Because 0.031 is above the precommitted 0.025 threshold, fail to reject the null. Never say the null was accepted or proved. Power rises with sample size, alpha, effect size, and lower variability.

**Why:** A transparent rule keeps urgency from moving the decision line after results are known.

**Wrong-path feedback:** threshold number, error mapping, decision

**State/output:** The analysis receives a `DISCLOSED` stamp, binder piece 4 fills, and Mission 5 unlocks.

## Mission outcome

Mission decision: Count the unplanned look. And use the stricter prewritten threshold for later tests. The opened analysis changed the false-alarm risk. Its p-value does not cross the new line. The analyst who opened it worked with data from the fastest hospital.

### Post-mission metric screen - exact player copy

MISSION 4 COMPLETE; TIME {elapsed} / TARGET 15:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Unplanned look disclosed; E+2/S+2/I+5/T-5; shared RP/allocation copy; QA 64/73/90/57 after 3/3/4/2 RP; restore on 0%.

## Quick concept review
- Expected value is a long-run average.
- Add independent variances, then take a square root for SD.
- **Mission takeaway:** At least one equals one minus none.

# Mission 5 - The Fast Site

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 5 - BOARD IN 11 DAYS  
**Card title:** The Fast Site  
**Go now:** Go to the Monitors' Room and meet Eli Navarro, site operations lead, at the enrollment wall.  
**Card body:** The early look used data dominated by the fastest hospital, so speed may have shaped the result. A sampling method controls who can enter the evidence and whom it can represent. Inspect the frame, reproduce selections, and trace missing groups before carrying records upstairs. By the end of the mission, decide whether the fast site's estimate can generalize.  
**Objective:** Audit the fast site's patient sample.

### Worth knowing first - exact player copy
#### Glossary terms
Sampling frame: the list or process from which a sample is selected.  
Simple random sample: a sample for which every set of size n is equally likely.  
Stratified sample: separate random samples drawn within defined groups.  
Cluster sample: randomly selected whole groups.  
Systematic sample: a random start followed by every kth item.  
Undercoverage: members of the population are absent from the frame.

#### Primer concepts
- Convenience and voluntary-response samples are biased.
- Random sampling supports generalization.
- Random assignment supports causal conclusions.

#### Equations first needed today
No new equation is introduced; retrieve proportions and the recorded probability rules.

**Crew on this mission - mission log:** Eli Navarro — site operations lead; Amina Okafor — endpoint adjudication lead.

## Main story happening - designer summary

At SITE, Eli shows impressive enrollment. The player reconstructs an SRS, chooses stratification over cluster/systematic sampling, and finds undercoverage and nonresponse. The audited sample is carried to DATA because only its roster can compare enrolled with eligible patients. **Two locations:** S1-S2 at MONITOR; result unlocks waypoint TAKE THE AUDIT ROSTER TO DATA MANAGEMENT; S3-S4 at DATA. Beats show an initially proud dashboard changing to NARROW SAMPLE; Eli concedes before binder 5 fills.

## Designer intent - not shown to player

Make sampling bias visible as people missing from a pipeline, then separate causal validity from population reach.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at the Monitors' Room | `monitor-desk` | automatic**

**World state:** Arrival: SITE entry; nearby bubble; fast enrollment dashboard visible; Eli says, ;  - After S1-S2: sample and stratification committed; roster prints; waypoint TAKE THE AUDIT ROSTER TO DATA MANAGEMENT; unlock travel. - DATA arrival/after S3: probe reveals FRAME GAP; panel text and icon persist;  - Final: scope decision; dashboard changes to NARROW SAMPLE; Eli concedes; binder 5 and outcome unlock.

**Panel/HUD text:** MISSION 5: DRAW AN SRS OPEN

**Dialogue bubbles -** Eli Navarro: "This site clears every deadline"

**Unlocks/waypoint:** Unlock Stop 17 at `monitor-desk` in the Monitors' Room.

**Beat 2 - After Stop 17 | `enrollment-wall` | automatic**

**World state:** The draw an srs result remains visible while the preserve every region fixture lights.

**Panel/HUD text:** STOP 17 RECORDED - STOP 18 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 17 result to settle preserve every region."

**Unlocks/waypoint:** Unlock Stop 18 at `enrollment-wall` in Monitors' Room.

**Beat 3 - After Stop 18 | `roster-wall` | automatic**

**World state:** The preserve every region result remains visible while the find who never entered fixture lights.

**Panel/HUD text:** STOP 18 RECORDED - STOP 19 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 18 result to settle find who never entered."

**Unlocks/waypoint:** Unlock Stop 19 at `roster-wall` in Data Management.

**Beat 4 - After Stop 19 | `extraction-console` | automatic**

**World state:** The find who never entered result remains visible while the set the scope fixture lights.

**Panel/HUD text:** STOP 19 RECORDED - STOP 20 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 19 result to settle set the scope."

**Unlocks/waypoint:** Unlock Stop 20 at `extraction-console` in Data Management.

**Beat 5 - At mission end | `monitor-desk` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 5 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Navarro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

SITE supplies charts and enrollment actions; DATA uniquely compares eligible, framed, contacted, responding, and enrolled people.

## Characters and dramatic beat

Eli equates speed with quality until the frame gap shows whom speed excluded. He chooses to reopen recruitment.

## Key concepts, explained here

SRS makes every set of size n equally likely; strata guarantee representation; clusters select whole groups; systematic samples use a random start and every kth case. Undercoverage differs from nonresponse and response bias.


## Stop 17 - Draw an SRS

**Format/placement:** PROTOCOL, at `monitor-desk`.

**Metadata:** Concept: SRS/RNG; Keystone: keystone sampling; Area: Monitoring Board Room; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the monitor desk, in the Monitors' Room.

**Stop reason - exact player copy:** The audit must reproduce a chance sample of source charts.

**Question card story setup - exact player copy:** The site has charts numbered 001 through 240, and the audit needs 12 without replacement. Build a fully reproducible random-number procedure that another monitor can repeat from the saved seed.

**Question card story-science connection - exact player copy:** A chance mechanism prevents staff from selecting only easy or complete charts.

**Question card prompt - exact player copy:** Map scenarios: label 001-240 -> assign unique labels; generate 001-240 -> RNG; repeated number -> ignore repeat; number 241-999 -> ignore outside range; stop -> 12 unique valid labels. Choices are those actions; exact permutation mapping.

**Complete format-specific interaction block:** `protocol:{scenarios:[{id:"label",text:"label 240 charts"},{id:"draw",text:"generate a three-digit number"},{id:"repeat",text:"number repeats"},{id:"outside",text:"number is 241-999"},{id:"stop",text:"12 unique valid labels recorded"}],choices:[{id:"assign",text:"assign unique labels 001-240"},{id:"rng",text:"use the recorded RNG seed"},{id:"ignore_repeat",text:"ignore and draw again"},{id:"ignore_outside",text:"ignore and draw again"},{id:"finish",text:"stop sampling"}],mapping:{label:"assign",draw:"rng",repeat:"ignore_repeat",outside:"ignore_outside",stop:"finish"},answerText:"Record the seed, use labels 001-240, ignore repeats and out-of-range numbers, and stop at 12 unique charts."}`

**Correct result:** Record the seed, generate three-digit numbers, ignore repeats and 241-999, and stop after 12 unique charts.

**Answer text:** The completed check shows record the seed, generate three-digit numbers, ignore repeats and 241-999, and stop after 12 unique charts.

**Why:** A chance mechanism prevents staff from selecting only easy or complete charts.

**Wrong-path feedback:** Random means arbitrary; require seed/range/repeats

**State/output:** The reproducible audit list prints and unlocks Stop 18.

## Stop 18 - Preserve Every Region

**Format/placement:** CHOICE, asked by Eli Navarro beside `enrollment-wall`.

**Metadata:** Concept: stratified/cluster/systematic; Keystone: keystone sampling; Area: Monitoring Board Room; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Talk to Eli Navarro, at the enrollment wall in Monitors' Room.

**Stop reason - exact player copy:** Rural patients are few, so the design must guarantee their presence.

**Question card story setup - exact player copy:** The chance audit works, but a plain SRS could include too few rural patients to check travel barriers. Choose a design that splits urban and rural patients first, then samples randomly within each group.

**Question card story-science connection - exact player copy:** Stratification protects comparison across important groups while keeping selection random.

**Question card prompt - exact player copy:** Submit one selection from the four distinct choice items below.

**Choices:**

1. Stratify by residence, then take an SRS within each residence stratum. **(correct)**

2. Select a few residence regions as clusters and include everyone in them.

3. Use the easiest patients to contact in each region.

4. Take one overall SRS and ignore residence during selection.

**Correct result:** Stratify by residence, then take an SRS within each stratum.

**Answer text:** The completed check shows stratify by residence, then take an SRS within each stratum.

**Why:** Stratification protects comparison across important groups while keeping selection random.

**Wrong-path feedback:** (2) **Cluster sample:** Selecting whole regions can omit other regions and does not guarantee representation from each one. (3) **Convenience sample:** Easy-to-contact patients can differ systematically from remote patients. (4) **Overall SRS only:** It is random, but small residence groups can be missed or too thin for planned comparisons.

**State/output:** rural roster opens; travel to DATA.

## Stop 19 - Find Who Never Entered

**Format/placement:** PROBE, at `roster-wall`.

**Metadata:** Concept: undercoverage/nonresponse/response bias; Keystone: keystone sampling; Area: Randomisation & Blinding; Learning role: COMBINE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the roster wall, in Data Management.

**Stop reason - exact player copy:** The roster must separate people absent from the frame from people who were sampled but did not answer.

**Question card story setup - exact player copy:** The stratified roster exposes a sharp drop before enrollment, not only after questionnaires were sent. Probe eligibility, contact, response, and enrollment stations to locate exactly where rural patients disappear today.

**Question card story-science connection - exact player copy:** Different bias mechanisms require different repairs and support different claims.

**Question card prompt - exact player copy:** Probe the four stations in order—eligible list, sampling frame, contacted sample, and completed response. At each station compare the observed count with its stated expected count, then submit the first break and classify the bias.

**Complete format-specific interaction block:** `probe:{load:"Rural-patient roster, expected flow from the eligibility audit",stations:[{id:"eligible",label:"Eligible list",reading:120,expected:120,comparison:"matches",unit:"patients"},{id:"frame",label:"Sampling frame",reading:92,expected:120,comparison:"28 missing before sampling",unit:"patients"},{id:"contacted",label:"Contacted sample",reading:80,expected:92,comparison:"12 sampled patients not reached",unit:"patients"},{id:"response",label:"Completed response",reading:74,expected:80,comparison:"6 contacted patients did not answer",unit:"patients"}],ordered:true,first_break:"frame",correct_conclusion:"28-person undercoverage before sampling; later losses are nonresponse",submission:"station, numerical gap, and bias classification"}`

**Correct result:** Twenty-eight eligible rural patients never entered the frame, so this is undercoverage; later losses include nonresponse. Leading questions would instead create response bias.

**Answer text:** The completed check shows twenty-eight eligible rural patients never entered the frame, so this is undercoverage; later losses include nonresponse. Leading questions would instead create response bias.

**Why:** Different bias mechanisms require different repairs and support different claims.

**Wrong-path feedback:** All absence is nonresponse; locate pre-frame loss

**State/output:** pipeline marks FRAME GAP; S4.

## Stop 20 - Set the Scope

**Format/placement:** DIAGNOSIS, at `extraction-console`.

**Metadata:** Concept: observational/experiment and inference scope; Keystone: keystone design/sampling; Area: Randomisation & Blinding; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the extraction console, in Data Management.

**Stop reason - exact player copy:** The board needs one honest statement about cause and generalization.

**Question card story setup - exact player copy:** Random assignment inside the trial supports a treatment comparison, but the fast site's enrollment frame omitted many rural patients. Select the conclusion that respects causal design while limiting population generalization.

**Question card story-science connection - exact player copy:** A randomized experiment can support causation for studied participants without representing everyone the treatment may reach.

**Question card prompt - exact player copy:** Use the random-assignment, sampling-frame, undercoverage, and concealment readings. Submit the strongest causal conclusion and honest population-generalization limit.

**Complete format-specific interaction block:** readings random assignment alarm-pass, no population random sample warning, rural undercoverage alarm, treatment concealment quiet. Choices: cause+all patients; association only; cause for trial-like patients with limited generalization; generalize no cause. Answer third.

**Correct result:** Random assignment supports a causal treatment comparison, but biased enrollment limits generalization beyond patients like those enrolled.

**Answer text:** The completed check shows random assignment supports a causal treatment comparison, but biased enrollment limits generalization beyond patients like those enrolled.

**Why:** A randomized experiment can support causation for studied participants without representing everyone the treatment may reach.

**Wrong-path feedback:** Randomized trial automatically generalizes

**State/output:** FAST becomes NARROW SAMPLE; binder 5; M6.

## Mission outcome

Mission decision: Do not apply the fast site result to all patients. Random assignment still supports cause within the trial. Rural patients were missed before sampling. Fixing that gap will take more people and more time.

### Post-mission metric screen - exact player copy

MISSION 5 COMPLETE; TIME {elapsed} / TARGET 14:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Biased records replaced; E+6/S+2/I+3/T-4; shared RP copy; QA 75/77/96/55 after 5/2/3/2; restore on 0%.

## Quick concept review
- SRS gives every set of size n an equal chance.
- Stratify to guarantee representation of key groups.
- **Mission takeaway:** Random assignment and random sampling justify different claims.

# Mission 6 - The Amendment Price

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 6 - BOARD IN 10 DAYS  
**Card title:** The Amendment Price  
**Go now:** Go to Randomisation & Blinding and meet Priya Shah, randomisation and blinding lead, at the allocation reader.  
**Card body:** The fast site's estimate cannot represent rural patients, so the amendment must repair enrollment without weakening causal comparison. Control, random assignment, replication, and blocking make treatment groups comparable. Rebuild the design, calculate sampling spread, then price the added sample at Statistics. By the end of the mission, decide which amendment preserves validity and power.  
**Objective:** Approve the corrected enrollment and assignment design.

### Worth knowing first - exact player copy
#### Glossary terms
Control: keeping conditions comparable except for the treatment.  
Random assignment: using chance to place experimental units into treatments.  
Replication: applying treatments to enough independent units.  
Blocking: grouping similar units before random assignment.  
Sampling distribution: distribution of a statistic across repeated samples.

#### Primer concepts
- Larger samples reduce sampling spread without moving its center.
- Matched pairs use paired units or give both treatments to one unit.
- Standard error estimates sampling spread from sample data.

#### Equations first needed today
**Equation:** SD(p-hat)=sqrt[p(1-p)/n] and SD(x-bar)=sigma/sqrt(n)
**What it is for:** Describing sampling-distribution spread.
**Symbols:** p is population proportion; n sample size; sigma population SD.
**Why this campaign needs it:** The amendment must recover precision lost by fixing representation.

**Crew on this mission - mission log:** Priya Shah — randomisation and blinding lead; Tomas Reed — trial statistician.

## Main story happening - designer summary

Priya demonstrates allocation concealment, then blocks by site/remoteness. At RAND, S1-S2 establish design; the amended event target causes travel to STAT for S3-S4. **Waypoint:** TAKE THE AMENDMENT COUNTS TO STATISTICS. There, sampling spread and geometric waiting time determine feasibility. The relationship shifts from suspicion to technical disagreement. Binder 6 records the cost.

## Designer intent - not shown to player

Separate design protections from precision, then make representation repair consume calendar time.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Randomisation & Blinding | `allocation-reader` | automatic**

**World state:** Arrival: RAND entry; nearby bubble; sealed kits visible; Priya says, ;  - After S1-S2: amendment rail locks; waypoint TAKE THE AMENDMENT COUNTS TO STATISTICS; player control restored. - STAT arrival/after S3: precision gauge shows center .50, SD .025;  - Final: wait estimate accepted; staffing board adds five screens per success; binder 6 fills; outcome unlocks.

**Panel/HUD text:** MISSION 6: BUILD THE EXPERIMENT OPEN

**Dialogue bubbles -** Priya Shah: "A repaired frame still needs clean assignment"

**Unlocks/waypoint:** Unlock Stop 21 at `allocation-reader` in Randomisation & Blinding.

**Beat 2 - After Stop 21 | `allocation-reader` | automatic**

**World state:** The build the experiment result remains visible while the choose matched or blocked fixture lights.

**Panel/HUD text:** STOP 21 RECORDED - STOP 22 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 21 result to settle choose matched or blocked."

**Unlocks/waypoint:** Unlock Stop 22 at `allocation-reader` in Randomisation & Blinding.

**Beat 3 - After Stop 22 | `randomisation-board` | automatic**

**World state:** The choose matched or blocked result remains visible while the price the precision fixture lights.

**Panel/HUD text:** STOP 22 RECORDED - STOP 23 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 22 result to settle price the precision."

**Unlocks/waypoint:** Unlock Stop 23 at `randomisation-board` in Randomisation & Blinding.

**Beat 4 - After Stop 23 | `randomisation-board` | automatic**

**World state:** The price the precision result remains visible while the how long until the first fixture lights.

**Panel/HUD text:** STOP 23 RECORDED - STOP 24 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 23 result to settle how long until the first."

**Unlocks/waypoint:** Unlock Stop 24 at `randomisation-board` in Randomisation & Blinding.

**Beat 5 - At mission end | `allocation-reader` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 6 EVIDENCE: RECORDED

**Dialogue bubbles -** Priya Shah: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

RAND alone can demonstrate allocation and concealment; STAT alone can model the amended statistic's sampling spread.

## Characters and dramatic beat

Priya defends causal validity but accepts a representativeness repair. Evidence separates her correct allocation work from the trial's recruitment failure.

## Key concepts, explained here

Control, random assignment, replication, blocking, and blinding protect experiments in distinct ways. Sampling-distribution center reflects bias; spread falls as n grows. Geometric waiting differs from fixed-n binomial counting.


## Stop 21 - Build the Experiment

**Format/placement:** SEQUENCE, at `allocation-reader`.

**Metadata:** Concept: experiment principles; Keystone: keystone study design; Area: Randomisation & Blinding; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the allocation reader, in Randomisation & Blinding.

**Stop reason - exact player copy:** Priya must preserve causal validity while the enrollment frame changes.

**Question card story setup - exact player copy:** The new frame includes rural patients, but assignment must still separate treatment effects from site differences. Order the design steps so blocking happens before random assignment and outcomes are measured the same way.

**Question card story-science connection - exact player copy:** Correct order prevents site mix from becoming a confounder.

**Question card prompt - exact player copy:** Order the six design cards from enrollment through common measurement, placing blocking before random assignment. Submit one complete sequence.

**Complete format-specific interaction block:** cards enroll eligible, block by site/remoteness, randomly assign within block, conceal kits, apply common endpoint, replicate across patients; exact order as listed.

**Correct result:** Block similar patients first, randomize within blocks, conceal treatment, and use the same measurement.

**Answer text:** The completed check shows block similar patients first, randomize within blocks, conceal treatment, and use the same measurement.

**Why:** Correct order prevents site mix from becoming a confounder.

**Wrong-path feedback:** Randomize before blocking; order similar groups first

**State/output:** design rail lights; S2.

## Stop 22 - Choose Matched or Blocked

**Format/placement:** CHOICE, asked by Priya Shah beside `allocation-reader`.

**Metadata:** Concept: matched pairs/blinding; Keystone: keystone design; Area: Monitoring Board Room; Learning role: PRACTICE; Difficulty: L3; Story role: character.

**Call - exact player copy:** Talk to Priya Shah, at the allocation reader in Randomisation & Blinding.

**Stop reason - exact player copy:** A matched-pairs proposal could halve enrollment, but only if pairing matches the scientific unit.

**Question card story setup - exact player copy:** With the design order fixed, one proposal pairs unrelated patients from different sites solely because their ages match. Decide whether this is a valid matched-pairs study or a blocked randomized design.

**Question card story-science connection - exact player copy:** Calling loose similarity a pair could understate variability and overstate precision.

**Question card prompt - exact player copy:** Submit one selection from the four distinct choice items below.

**Choices:**

1. Block by important traits and randomize treatments within each block. **(correct)**

2. Call similar patients matched pairs even though each receives only one treatment.

3. Assign treatments without blocks because randomization removes all chance imbalance.

4. Compare patients who chose their own treatment.

**Correct result:** Block by important traits and randomize within blocks; paired inference needs genuine paired observations or both treatments on one unit. Double blinding hides assignment from subjects and researchers.

**Answer text:** The completed check shows block by important traits and randomize within blocks; paired inference needs genuine paired observations or both treatments on one unit. Double blinding hides assignment from subjects and researchers.

**Why:** Calling loose similarity a pair could understate variability and overstate precision.

**Wrong-path feedback:** (2) **Loose matched pairs:** Paired inference needs genuine pairs or two measurements on the same unit, not general similarity. (3) **No blocks:** Randomization protects causal inference, but blocking can reduce chance imbalance on important traits. (4) **Self-selected treatment:** Choice creates confounding and does not support the planned causal comparison.

**State/output:** amendment design approved; travel to STAT.

## Stop 23 - Price the Precision

**Format/placement:** DERIVE, at `randomisation-board`.

**Metadata:** Concept: sampling distribution/CLT/10% idea; Keystone: keystone sampling distributions; Area: Endpoint Adjudication; Learning role: COMBINE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the randomisation board, in Randomisation & Blinding.

**Stop reason - exact player copy:** The amendment needs a reproducible estimate of sampling spread before more sites are opened.

**Question card story setup - exact player copy:** The corrected design expects improvement probability p=0.50 and needs n=400 independent patients from more than 4,000 eligible people. Derive the center and SD of the sampling distribution of p-hat.

**Question card story-science connection - exact player copy:** Precision, not the observed sample center, determines whether the board can separate benefit from noise.

**Question card prompt - exact player copy:** lines mean(p-hat)=p=.50 [unbiased]; SD=sqrt(.5(.5)/400) [formula, independence/10%]; =.025 [simplify]. Decoy SD=.25/400. Submit pair .50,.025.

**Complete format-specific interaction block:** `derive:{"goal":"center and SD of p-hat","givens":["p=0.50","n=400","population>4000"],"lines":[{"id":"L1","expression":"mean(p-hat)=p=0.50","license":"state governing relationship"},{"id":"L2","expression":"SD=sqrt[p(1-p)/n]","license":"substitute displayed values"},{"id":"L3","expression":"SD=sqrt[0.5(0.5)/400]=0.025","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["SD=0.25/400","mean=0.025"],"correct_result":"(0.50,0.025)","answerText":"The sampling distribution is centered at 0.50 with standard deviation 0.025."}`

**Correct result:** The distribution is centered at .50 with SD .025. Larger n narrows spread but does not change the center; large counts are 200 and 200.

**Answer text:** The completed check shows the distribution is centered at .50 with SD .025. Larger n narrows spread but does not change the center; large counts are 200 and 200.

**Why:** Precision, not the observed sample center, determines whether the board can separate benefit from noise.

**Wrong-path feedback:** pair of unitless proportions

**State/output:** precision gauge; S4.

## Stop 24 - How Long Until the First

**Format/placement:** BALLPARK, at `randomisation-board`.

**Metadata:** Concept: geometric versus binomial; Keystone: keystone probability; Area: Statistics & Analysis; Learning role: RETRIEVE; Difficulty: L3; Story role: decision.

**Call - exact player copy:** Go to the randomisation board, in Randomisation & Blinding.

**Stop reason - exact player copy:** The amendment cannot proceed unless the expected wait for the first rural enrollment is acceptable.

**Question card story setup - exact player copy:** Precision requires the repaired frame, but each screened rural candidate has success probability p=0.20. Calculate the expected number screened until the first enrollment and distinguish this geometric question from a fixed-trial binomial count.

**Question card story-science connection - exact player copy:** The waiting-time estimate turns a statistical repair into a calendar cost.

**Question card prompt - exact player copy:** formula geometric mean=1/p; p=.20; target 5 candidates, tolerance .01; then select geometric. Include binomial mean np reminder.

**Correct result:** Expected trials to first success=1/.20=5. The number of trials is not fixed, so the model is geometric.

**Answer text:** The completed check shows expected trials to first success=1/.20=5. The number of trials is not fixed, so the model is geometric.

**Why:** The waiting-time estimate turns a statistical repair into a calendar cost.

**Wrong-path feedback:** candidates screened

**State/output:** five-candidate staffing added; binder 6; M7.

## Mission outcome

Mission decision: Group patients by site and travel distance. Then randomize within each group. This keeps the cause test fair. At 400 patients, the sampling spread is 0.025. Each rural enrollment needs about five screens.

### Post-mission metric screen - exact player copy

MISSION 6 COMPLETE; TIME {elapsed} / TARGET 16:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Amendment adds events; E+3/S+2/I+2/T-5; shared RP copy; QA 82/82/100/53 after 4/3/2/3; no permanent Integrity lock until M11.

## Quick concept review
- Block before random assignment.
- Larger n narrows sampling distributions.
- **Mission takeaway:** Use binomial for successes in fixed n and geometric for trials to first success.

# Mission 7 - The Missing Outcomes

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 7 - BOARD IN 9 DAYS  
**Card title:** The Missing Outcomes  
**Go now:** Go to the Monitors' Room and meet Eli Navarro, site operations lead, at the query map.  
**Card body:** The amendment repairs enrollment, but many rural outcomes are still missing at day 30. Regression predicts one quantitative variable from another and residuals show where the prediction fails. At Site Operations, model missingness by travel distance, then test its residual pattern at Data Management. By the end of the mission, decide whether complete-case analysis is defensible.  
**Objective:** Set the missing-data rule.

### Worth knowing first - exact player copy
#### Glossary terms
Scatterplot: a graph of paired quantitative values.  
Correlation: the strength and direction of a linear relationship between two quantitative variables.  
Least-squares regression line: the line minimizing squared vertical residuals.  
Residual: observed y minus predicted y.  
Influential point: a point whose removal substantially changes the fitted line.

#### Primer concepts
- Describe direction, form, strength, and outliers.
- Correlation measures linear association, not causation.
- Extrapolation beyond observed x-values is unreliable.

#### Equations first needed today
**Equation:** b=r(sy/sx); a=y-bar-bx-bar; y-hat=a+bx
**What it is for:** Building the least-squares line from summary statistics.
**Symbols:** b slope; a intercept; r correlation; sx,sy SDs; x-bar,y-bar means.
**Why this campaign needs it:** The query team must predict follow-up delay from travel distance.

**Equation:** residual=y-y-hat

**What it is for:** Showing how far each observed outcome lies above or below prediction.

**Symbols:** y observed; y-hat predicted.

**Why this campaign needs it:** A patterned miss can expose a biased complete-case set.## Main story happening - designer summary

At MONITOR, distance and follow-up delay show strong positive linear association. The line is built and interpreted, forcing travel to DATA because only that floor has residual and deletion diagnostics. **Route:** S1-S2 MONITOR; waypoint TAKE MODEL ID L7 TO DATA; S3-S4 DATA. Beats change the map from random missingness to DISTANCE-LINKED and reveal the fast-site outlier is influential. Complete-case analysis is rejected.

## Designer intent - not shown to player

Teach regression as diagnosis rather than prediction alone and pay off the fast-site sampling clue.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Monitors' Room | `query-map` | automatic**

**World state:** Arrival: MONITOR entry; query map visible; Eli says, ; timer pauses;  - After S1-S2: fitted line appears; waypoint TAKE MODEL ID L7 TO DATA; travel unlocks. - DATA arrival/after S3: residual candidates render; selected field remains;  - Final: restored influence control; panel reads DISTANCE-LINKED; binder 7 fills; outcome unlocks.

**Panel/HUD text:** MISSION 7: DESCRIBE THE RELATIONSHIP OPEN

**Dialogue bubbles -** Eli Navarro: "The missing rows have addresses"

**Unlocks/waypoint:** Unlock Stop 25 at `query-map` in Monitors' Room.

**Beat 2 - After Stop 25 | `monitor-desk` | automatic**

**World state:** The describe the relationship result remains visible while the build and read the line fixture lights.

**Panel/HUD text:** STOP 25 RECORDED - STOP 26 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 25 result to settle build and read the line."

**Unlocks/waypoint:** Unlock Stop 26 at `monitor-desk` in the Monitors' Room.

**Beat 3 - After Stop 26 | `deletion-diagnostic` | automatic**

**World state:** The build and read the line result remains visible while the read the residual fixture lights.

**Panel/HUD text:** STOP 26 RECORDED - STOP 27 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 26 result to settle read the residual."

**Unlocks/waypoint:** Unlock Stop 27 at `deletion-diagnostic` in Data Management.

**Beat 4 - After Stop 27 | `site-comparison-board` | automatic**

**World state:** The read the residual result remains visible while the test the fast-site point fixture lights.

**Panel/HUD text:** STOP 27 RECORDED - STOP 28 OPEN

**Dialogue bubbles -** Eli Navarro: "Use the Stop 27 result to settle test the fast-site point."

**Unlocks/waypoint:** Unlock Stop 28 at `site-comparison-board` in the Monitors' Room.

**Beat 5 - At mission end | `query-map` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 7 EVIDENCE: RECORDED

**Dialogue bubbles -** Eli Navarro: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

MONITOR has travel/contact evidence; DATA has residual and deletion diagnostics. The model ID causally links them.

## Characters and dramatic beat

Eli now asks who is missing rather than celebrating speed. The influential point makes him reject his own site's headline.

## Key concepts, explained here

Correlation is linear association for two quantitative variables, not causation. The LSRL passes through the means; slope has y-per-x units. Residual patterns test linear form; leverage and influence are not the same as a large residual.


## Stop 25 - Describe the Relationship

**Format/placement:** CHOICE, asked by Eli Navarro beside `query-map`.

**Metadata:** Concept: scatterplot/correlation; Keystone: keystone regression/sampling bias; Area: Endpoint Adjudication; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Talk to Eli Navarro, at the query map in Monitors' Room.

**Stop reason - exact player copy:** The team needs an honest description before fitting a line.

**Question card story setup - exact player copy:** Rural travel distance and follow-up delay form a tight upward cloud, while one fast-site point sits far to the right. Describe direction, form, strength, and the unusual point without claiming causation.

**Question card story-science connection - exact player copy:** If delay is associated with distance, complete cases may systematically omit remote patients.

**Question card prompt - exact player copy:** Submit one selection from the four distinct choice items below.

**Choices:**

1. Strong positive, roughly linear association with one high-leverage point. **(correct)**

2. Strong negative linear association with no unusual points.

3. No association because correlation does not prove causation.

4. A categorical difference that should be shown with a bar chart.

**Correct result:** Strong positive, roughly linear association with a high-leverage point. Use correlation only for two quantitative variables.

**Answer text:** The completed check shows strong positive, roughly linear association with a high-leverage point. Use correlation only for two quantitative variables.

**Why:** If delay is associated with distance, complete cases may systematically omit remote patients.

**Wrong-path feedback:** (2) **Negative association:** The plotted delays rise with distance, so the direction is positive. (3) **No association:** Lack of causal proof does not erase a visible statistical association. (4) **Categorical difference:** Both distance and delay are quantitative, so a scatterplot description is appropriate.

**State/output:** relationship tag; S2.

## Stop 26 - Build and Read the Line

**Format/placement:** DERIVE, at `monitor-desk`.

**Metadata:** Concept: LSRL; Keystone: keystone regression; Area: Endpoint Adjudication; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the monitor desk, in the Monitors' Room.

**Stop reason - exact player copy:** Monitors need a prediction rule to prioritize overdue visits.

**Question card story setup - exact player copy:** The scatterplot supports a linear model with r=0.80, x-bar=50 km, sx=20 km, y-bar=6 days, and sy=4 days. Derive slope and intercept, then interpret both values in patient follow-up context.

**Question card story-science connection - exact player copy:** A contextual line can direct calls, but its intercept and extrapolated values may lack meaning.

**Question card prompt - exact player copy:** b=.8(4/20)=.16 day/km; a=6-.16(50)=-2 days; y-hat=-2+.16x. Licenses slope formula, passes through means, substitute. Submit pair b=.16 day/km, a=-2 days.

**Complete format-specific interaction block:** `derive:{"goal":"least-squares slope and intercept","givens":["r=0.80","xbar=50 km","sx=20 km","ybar=6 days","sy=4 days"],"lines":[{"id":"L1","expression":"b=r(sy/sx)=0.8(4/20)=0.16 day/km","license":"state governing relationship"},{"id":"L2","expression":"a=ybar-bxbar=6-0.16(50)=-2 days","license":"substitute displayed values"},{"id":"L3","expression":"yhat=-2+0.16x","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["b=4.0","a=+2"],"correct_result":"b=0.16 day/km, a=-2 days","answerText":"Each added kilometre predicts 0.16 day more delay; the -2-day intercept lies outside a meaningful context."}`

**Correct result:** Each additional kilometer predicts .16 more day of delay. The -2-day intercept at 0 km is not meaningful here; do not extrapolate beyond observed distances.

**Answer text:** The completed check shows each additional kilometer predicts .16 more day of delay. The -2-day intercept at 0 km is not meaningful here; do not extrapolate beyond observed distances.

**Why:** A contextual line can direct calls, but its intercept and extrapolated values may lack meaning.

**Wrong-path feedback:** pair: b in day/km, a in days

**State/output:** line drawn; travel unlock.

## Stop 27 - Read the Residual

**Format/placement:** RESIDUAL, at `deletion-diagnostic`.

**Metadata:** Concept: residual plots/nonlinearity; Keystone: keystone regression; Area: Endpoint Adjudication; Learning role: PRACTICE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the deletion diagnostic, in Data Management.

**Stop reason - exact player copy:** A good correlation can still hide a model failure that biases recovered outcomes.

**Question card story setup - exact player copy:** With the line established, Data Management reveals residuals by distance band. Compare the candidate residual fields and reject the lowest-RMS fit if it leaves a curved or fan-shaped pattern behind.

**Question card story-science connection - exact player copy:** Random residual scatter supports linear form; structure means the missingness rule remains incomplete.

**Question card prompt - exact player copy:** fields A random scatter RMS2.1, B U-shape RMS1.8, C fan RMS1.9; correct A despite higher RMS; residual sign labels positive=underprediction, negative=overprediction.

**Complete format-specific interaction block:** `residual: {visible_prompt: "fields A random scatter RMS2.1, B U-shape RMS1.8, C fan RMS1.9; correct A despite higher RMS; residual sign labels positive=underprediction, negative=overprediction.", keyed_result: "Choose A. Residual=y-y-hat; positive means the model underpredicted. Pattern matters more than the smallest RMS.", feedback: "Lowest RMS always wins; reject structured error", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** Choose A. Residual=y-y-hat; positive means the model underpredicted. Pattern matters more than the smallest RMS.

**Answer text:** The completed check shows choose A. Residual=y-y-hat; positive means the model underpredicted. Pattern matters more than the smallest RMS.

**Why:** Random residual scatter supports linear form; structure means the missingness rule remains incomplete.

**Wrong-path feedback:** Lowest RMS always wins; reject structured error

**State/output:** random-field model retained; S4.

## Stop 28 - Test the Fast-Site Point

**Format/placement:** CONTROL, at `site-comparison-board`.

**Metadata:** Concept: outlier/leverage/influence and missingness; Keystone: keystone regression/sampling bias; Area: Endpoint Adjudication; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the site comparison board, in the Monitors' Room.

**Stop reason - exact player copy:** The complete-case rule depends on whether one extreme-x site controls the line.

**Question card story setup - exact player copy:** The residual field is acceptable, but the far-right fast-site point may pull the fitted slope. Remove that point while holding all other records fixed, refit, measure slope change, then restore it.

**Question card story-science connection - exact player copy:** A substantial line change makes the point influential and blocks an unqualified complete-case analysis.

**Question card prompt - exact player copy:** Choose `fast-site point` from candidate controls `fast-site point`, `ordinary residual-outlier point`, and `display scale`. Measure slope at 0.16 day/km, change only the fast-site-point control by removing that point while all other records and the fitted method remain fixed, measure the slope after refitting, restore the point and remeasure, then submit both slopes and whether the point is influential.

**Complete format-specific interaction block:** `control:{candidates:[{id:"fast_site",label:"fast-site point"},{id:"residual_outlier",label:"ordinary residual-outlier point"},{id:"display_scale",label:"display scale"}],correct_control:"fast_site",baseline:{slope:0.16,unit:"day/km"},response:{slope:0.10,unit:"day/km"},noise_band:{value:0.005,unit:"day/km"},fixed:["all other records","least-squares method"],measure_when:"after each refit",restore:{required:true,slope:0.16,unit:"day/km",remeasure:true},correct_conclusion:"influential point",answerText:"Removing the fast-site point changes slope from 0.16 to 0.10 day/km, far beyond noise; restoration recovers 0.16."}`

**Correct result:** Baseline 0.16 day/km; refit 0.10 day/km; restored reading 0.16 day/km; conclusion pair `influential` and `reject unadjusted complete cases`; numeric tolerance 0.005 day/km.

**Answer text:** Removal changes slope from .16 to .10, a large change, so the point is influential. Complete cases overrepresent nearby patients.

**Why:** A substantial line change makes the point influential and blocks an unqualified complete-case analysis.

**Wrong-path feedback:** three readings in day/km and conclusion pair

**State/output:** MISSINGNESS: DISTANCE-LINKED; binder 7; M8.

## Mission outcome

Mission decision: Do not use only patients with complete records. Recover results by travel band. Delay grows with travel distance. One fast site changes the fitted line. The fix needs four more days of follow-up.

### Post-mission metric screen - exact player copy

MISSION 7 COMPLETE; TIME {elapsed} / TARGET 16:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Missing-outcome recovery takes four days; E+4/S+2/I0/T-7; shared RP copy; QA 91/87/100/50 after 5/3/0/4.

## Quick concept review
- Correlation describes linear association, not cause.
- Interpret slope with y units per x unit.
- **Mission takeaway:** Residual patterns test model form.

# Mission 8 - The Cold-Room Rate

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 8 - BOARD IN 8 DAYS  
**Card title:** The Cold-Room Rate  
**Go now:** Go to the Kit Warehouse & Cold Room and meet Priya Shah, randomisation and blinding lead, at the exposure logger.  
**Card body:** The missing-data rule is repaired, but failed kits now cluster after one cold-room exposure. A one-proportion interval estimates a population rate, while a test compares it with a safety benchmark. Inspect conditions in the warehouse, then calculate and test the failure rate in Statistics. By the end of the mission, decide whether the exposed cohort needs quarantine.  
**Objective:** Estimate and test the exposed-kit failure rate.

### Worth knowing first - exact player copy
#### Glossary terms
Confidence interval: a range from a method that captures the true parameter at a stated long-run rate.  
Margin of error: the critical value times standard error.  
Null hypothesis: the benchmark claim tested.  
P-value: probability, assuming the null, of a result at least as extreme as observed.

#### Primer concepts
- Check random/independent selection, 10% condition, and large counts.
- Use p-hat in interval SE but p0 in test SE.
- Reject when p<alpha; otherwise fail to reject.

#### Equations first needed today
**Equation:** p-hat plus or minus z-star sqrt[p-hat(1-p-hat)/n]
**What it is for:** A confidence interval for one population proportion.
**Symbols:** p-hat sample proportion; n sample size; z-star confidence critical value.
**Why this campaign needs it:** The board needs a plausible range for the exposed-kit failure rate.

**Equation:** z=(p-hat-p0)/sqrt[p0(1-p0)/n]

**What it is for:** Testing a proportion against a benchmark.

**Symbols:** p0 null rate; other symbols as above.

**Why this campaign needs it:** Quarantine depends on whether failures exceed the 10% campaign safety benchmark.## Main story happening - designer summary

At KIT, the logger establishes a random audit of 200 among over 2,000 exposed kits with 30 failures. The sample goes to STAT after S1. S2 interval and S3 test show a high rate; S4 sizes a confirmatory audit. **Two locations:** KIT S1, then STAT S2-S4 because only unblinded statistics calculates the rate. World state adds QUARANTINED labels.

## Designer intent - not shown to player

Use one-proportion inference to convert a handling clue into a bounded quarantine decision.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at the Kit Warehouse & Cold Room | `exposure-logger` | automatic**

**World state:** Arrival: KIT entry; exposure logger flashes COLD EXCURSION with text/icon; Priya says, ;  - After S1: conditions pass; sealed sample transfer appears; waypoint CARRY EXPOSURE SAMPLE TO STAT. - STAT arrival/after S2-S3: interval and p-value display; QUARANTINE READY control  - Final: sample-size commit; exposed shelves gain QUARANTINED labels; binder 8 fills; outcome unlocks.

**Panel/HUD text:** MISSION 8: CHECK BEFORE CALCULATING OPEN

**Dialogue bubbles -** Priya Shah: "Check the sample before the rate"

**Unlocks/waypoint:** Unlock Stop 29 at `exposure-logger` in the Kit Warehouse & Cold Room.

**Beat 2 - After Stop 29 | `cold-room-workbench` | automatic**

**World state:** The check before calculating result remains visible while the build the interval fixture lights.

**Panel/HUD text:** STOP 29 RECORDED - STOP 30 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 29 result to settle build the interval."

**Unlocks/waypoint:** Unlock Stop 30 at `cold-room-workbench` in the Kit Warehouse & Cold Room.

**Beat 3 - After Stop 30 | `exposure-logger` | automatic**

**World state:** The build the interval result remains visible while the test the benchmark fixture lights.

**Panel/HUD text:** STOP 30 RECORDED - STOP 31 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 30 result to settle test the benchmark."

**Unlocks/waypoint:** Unlock Stop 31 at `exposure-logger` in the Kit Warehouse & Cold Room.

**Beat 4 - After Stop 31 | `cold-room-workbench` | automatic**

**World state:** The test the benchmark result remains visible while the size the confirmation fixture lights.

**Panel/HUD text:** STOP 31 RECORDED - STOP 32 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 31 result to settle size the confirmation."

**Unlocks/waypoint:** Unlock Stop 32 at `cold-room-workbench` in the Kit Warehouse & Cold Room.

**Beat 5 - At mission end | `exposure-logger` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 8 EVIDENCE: RECORDED

**Dialogue bubbles -** Priya Shah: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

KIT verifies the physical frame and exposure; STAT is required for unblinded interval and test computation.

## Characters and dramatic beat

Priya first fears an assignment breach but accepts that cold handling is an independent failure path.

## Key concepts, explained here

One-proportion inference needs random selection, 10% independence, and large counts. Intervals estimate a parameter; tests compare it with p0. Standard errors use different proportions for those two jobs.


## Stop 29 - Check Before Calculating

**Format/placement:** PROTOCOL, at `exposure-logger`.

**Metadata:** Concept: one-proportion conditions; Keystone: keystone inference conditions; Area: Monitoring Board Room; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the exposure logger, in the Kit Warehouse & Cold Room.

**Stop reason - exact player copy:** An interval is invalid unless the audited kits meet its conditions.

**Question card story setup - exact player copy:** The warehouse randomly selected 200 of more than 2,000 exposed kits and found 30 failures. Match each condition with its evidence before the sample crosses the firewall to Statistics.

**Question card story-science connection - exact player copy:** Conditions connect the formula to a sampling process the board can trust.

**Question card prompt - exact player copy:** Match the displayed evidence to the randomization, independence/10%, and large-count conditions. Submit one decision for each condition.

**Complete format-specific interaction block:** `protocol:{scenarios:[{id:"random",text:"random-selection condition"},{id:"ten_percent",text:"10% independence condition"},{id:"large_counts",text:"large-count condition"}],choices:[{id:"logger",text:"warehouse logger randomly selected 200 kits"},{id:"population",text:"200 is no more than 10% of over 2,000 kits"},{id:"counts",text:"30 failures and 170 nonfailures are both at least 10"}],mapping:{random:"logger",ten_percent:"population",large_counts:"counts"},answerText:"The logger supports randomness, the population size supports 10%, and 30/170 supports large counts."}`

**Correct result:** All three conditions pass; use 30 and 170 for interval large counts.

**Answer text:** The completed check shows all three conditions pass; use 30 and 170 for interval large counts.

**Why:** Conditions connect the formula to a sampling process the board can trust.

**Wrong-path feedback:** Formula works without conditions; match evidence

**State/output:** sample transfer; waypoint STAT.

## Stop 30 - Build the Interval

**Format/placement:** DERIVE, at `cold-room-workbench`.

**Metadata:** Concept: one-proportion CI; Keystone: keystone CI/conditions; Area: Monitoring Board Room; Learning role: INTRODUCE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the cold room workbench, in the Kit Warehouse & Cold Room.

**Stop reason - exact player copy:** Quarantine needs a plausible range, not only the observed 15% rate.

**Question card story setup - exact player copy:** The random, 10%, and large-count conditions all pass, and p-hat=30/200=0.15. Build the 95% confidence interval using z-star=1.960 and the sample proportion in the standard error, then submit both endpoints.

**Question card story-science connection - exact player copy:** If the whole interval lies near or above the 10% benchmark, the observed excess is not merely a headline percentage.

**Question card prompt - exact player copy:** SE=sqrt(.15(.85)/200)=.02525; ME=1.96(.02525)=.0495; interval .15 plus/minus .0495=[.1005,.1995]. Licensed lines; decoy uses .10 in CI SE.

**Complete format-specific interaction block:** `derive:{"goal":"95% confidence interval for a proportion","givens":["phat=30/200=0.15","n=200","z*=1.960"],"lines":[{"id":"L1","expression":"SE=sqrt[0.15(0.85)/200]=0.02525","license":"state governing relationship"},{"id":"L2","expression":"ME=1.960(0.02525)=0.0495","license":"substitute displayed values"},{"id":"L3","expression":"CI=0.15±0.0495=[0.1005,0.1995]","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["use 0.10 in the CI standard error","divide the margin by n again"],"correct_result":"[0.1005,0.1995]","answerText":"The 95% interval is 10.05% to 19.95% using the sample proportion in the standard error."}`

**Correct result:** endpoints 10.05%,19.95%, tolerance .1 percentage point.

**Answer text:** We are 95% confident the true exposed-kit failure proportion is between 10.05% and 19.95%.

**Why:** If the whole interval lies near or above the 10% benchmark, the observed excess is not merely a headline percentage.

**Wrong-path feedback:** endpoint pair in proportions or percent

**State/output:** interval band; S3.

## Stop 31 - Test the Benchmark

**Format/placement:** DERIVE, at `exposure-logger`.

**Metadata:** Concept: one-proportion z test/conclusion; Keystone: keystone tests; Area: Monitoring Board Room; Learning role: COMBINE; Difficulty: L3; Story role: decision evidence.

**Call - exact player copy:** Go to the exposure logger, in the Kit Warehouse & Cold Room.

**Stop reason - exact player copy:** The campaign rule requires a formal one-sided comparison with p0=.10.

**Question card story setup - exact player copy:** The interval barely clears the benchmark, so the registered test now asks whether the true failure rate exceeds 10%. State hypotheses, calculate z, and give a contextual decision at alpha=.05.

**Question card story-science connection - exact player copy:** The test decides whether the excess warrants quarantine under the prewritten safety rule.

**Question card prompt - exact player copy:** H0:p=.10, Ha:p>.10; z=(.15-.10)/sqrt(.10(.90)/200)=2.357; p=.0092. Ordered State/Plan/Do/Conclude lines; p calculator supplied.

**Complete format-specific interaction block:** `derive: {visible_prompt: "H0:p=.10, Ha:p>.10; z=(.15-.10)/sqrt(.10(.90)/200)=2.357; p=.0092. Ordered State/Plan/Do/Conclude lines; p calculator supplied.", keyed_result: "z 2.36 tolerance .01; p .0092 tolerance .001; reject.", feedback: "z, p-value, reject/fail conclusion", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** z 2.36 tolerance .01; p .0092 tolerance .001; reject.

**Answer text:** Since .0092<.05, reject H0; there is convincing evidence the exposed-kit failure proportion exceeds 10%. Do not say H0 is proven false.

**Why:** The test decides whether the excess warrants quarantine under the prewritten safety rule.

**Wrong-path feedback:** z, p-value, reject/fail conclusion

**State/output:** quarantine warning; S4.

## Stop 32 - Size the Confirmation

**Format/placement:** BALLPARK, at `cold-room-workbench`.

**Metadata:** Concept: margin of error/sample size; Keystone: keystone CI/power; Area: Randomisation & Blinding; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the cold room workbench, in the Kit Warehouse & Cold Room.

**Stop reason - exact player copy:** A new shipment cannot release until its failure-rate estimate has margin of error at most 3%.

**Question card story setup - exact player copy:** The exposed cohort exceeds the benchmark, and the replacement audit must be precise before release. Calculate the conservative minimum sample for 95% confidence and margin of error 0.03 using p-star=0.50.

**Question card story-science connection - exact player copy:** Rounding down would promise precision the audit cannot deliver.

**Question card prompt - exact player copy:** n=(1.96^2(.5)(.5))/.03^2=1067.11; submit whole kits; correct 1068, tolerance 0. Formula/slots displayed.

**Correct result:** Round up to 1,068 kits. Lower confidence or larger n changes margin of error; using .50 is conservative when p is unknown.

**Answer text:** The completed check shows round up to 1,068 kits. Lower confidence or larger n changes margin of error; using .50 is conservative when p is unknown.

**Why:** Rounding down would promise precision the audit cannot deliver.

**Wrong-path feedback:** minimum whole kits

**State/output:** cohort quarantined; binder 8; M9.

## Mission outcome

Mission decision: Quarantine the exposed cohort. And require a 1,068-kit release audit. The estimated failure rate is 10.05% to 19.95%. And the one-sided test exceeds the safety benchmark. The pattern points to handling.

### Post-mission metric screen - exact player copy

MISSION 8 COMPLETE; TIME {elapsed} / TARGET 17:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Cold-room cohort quarantined; E+2/S+5/I0/T-5; shared RP copy; QA 96/97/100/49 after 3/5/0/4.

## Quick concept review
- Conditions come before inference.
- Use p-hat for CI SE and p0 for test SE.
- **Mission takeaway:** Interpret intervals and tests in context.

# Mission 9 - Could Anyone Tell

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 9 - BOARD IN 7 DAYS  
**Card title:** Could Anyone Tell  
**Go now:** Go to the Kit Warehouse and meet Priya Shah, randomisation and blinding lead, at the blind-check kiosk.  
**Card body:** Cold-room handling explains failed kits, but it does not show whether staff could identify treatment arms. Blinding reduces behavior and measurement changes caused by knowing assignment. Audit the kit sequence, then compare correct-guess proportions at Statistics. By the end of the mission, decide whether treatment concealment failed differently across arms.  
**Objective:** Test the blinding survey by treatment arm.

### Worth knowing first - exact player copy
#### Glossary terms
Single blind: either subjects or researchers do not know assignments.  
Double blind: neither subjects nor researchers know assignments.  
Pooled proportion: combined success proportion used in a two-proportion null test.  
Homogeneity: equal distribution of one categorical variable across populations or treatments.

#### Primer concepts
- Two-proportion intervals use separate sample proportions.
- Two-proportion null tests pool because H0 says proportions are equal.
- A random sample plus random assignment supports cause and generalization.

#### Equations first needed today
**Equation:** (p1-hat-p2-hat) plus or minus z-star sqrt[p1-hat q1-hat/n1 + p2-hat q2-hat/n2]
**What it is for:** Estimating a difference in proportions.
**Symbols:** q-hat=1-p-hat; subscripts mark arms.
**Why this campaign needs it:** The survey must estimate the treatment-minus-placebo guessing difference.

**Crew on this mission - mission log:** Priya Shah — randomisation and blinding lead; Tomas Reed — trial statistician.

## Main story happening - designer summary

At KIT, Priya proves the numbered sequence itself was unpredictable; the survey data then require travel to STAT. S2 checks conditions and interval, S3 tests equality, S4 states scope. **Route:** KIT S1; waypoint CARRY SEALED SURVEY TO STAT; STAT S2-S4. Results exonerate allocation concealment but not cold handling.

## Designer intent - not shown to player

Teach two-proportion inference while separating a statistically detectable survey difference from proof of a broken blind.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at the Kit Warehouse | `kit-sequence-rack` | automatic**

**World state:** Arrival: KIT entry; sealed sequence visible; Priya says, ;  - After S1: independent audit path lights; sealed survey appears; waypoint CARRY SEALED SURVEY TO STAT. - STAT arrival/after S2-S3: interval and pooled-test panels appear; nonresponse stress control  - Final: claim label changes to UNEQUAL GUESSES, BLIND NOT PROVEN BROKEN; binder 9 and outcome unlock.

**Panel/HUD text:** MISSION 9: REBUILD THE BLIND OPEN

**Dialogue bubbles -** Priya Shah: "A failed refrigerator does not reveal the next box"

**Unlocks/waypoint:** Unlock Stop 33 at `kit-sequence-rack` in the Kit Warehouse.

**Beat 2 - After Stop 33 | `analysis-board` | automatic**

**World state:** The rebuild the blind result remains visible while the estimate the guessing difference fixture lights.

**Panel/HUD text:** STOP 33 RECORDED - STOP 34 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 33 result to settle estimate the guessing difference."

**Unlocks/waypoint:** Unlock Stop 34 at `analysis-board` in Statistics & Analysis.

**Beat 3 - After Stop 34 | `analysis-board` | automatic**

**World state:** The estimate the guessing difference result remains visible while the pool only for the test fixture lights.

**Panel/HUD text:** STOP 34 RECORDED - STOP 35 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 34 result to settle pool only for the test."

**Unlocks/waypoint:** Unlock Stop 35 at `analysis-board` in Statistics & Analysis.

**Beat 4 - After Stop 35 | `blind-audit-table` | automatic**

**World state:** The pool only for the test result remains visible while the say what it means fixture lights.

**Panel/HUD text:** STOP 35 RECORDED - STOP 36 OPEN

**Dialogue bubbles -** Priya Shah: "Use the Stop 35 result to settle say what it means."

**Unlocks/waypoint:** Unlock Stop 36 at `blind-audit-table` in the Kit Warehouse.

**Beat 5 - At mission end | `kit-sequence-rack` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 9 EVIDENCE: RECORDED

**Dialogue bubbles -** Priya Shah: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

KIT verifies concealment physically; STAT compares unblinded survey proportions. The sealed survey causes travel.

## Characters and dramatic beat

Priya is apparently implicated by unequal guesses, but the independent box audit reverses the accusation. She still accepts the limited survey claim.

## Key concepts, explained here

Two-proportion intervals keep separate SE terms. A null test pools because equality is assumed. Significance describes a difference, not automatically its mechanism.


## Stop 33 - Rebuild the Blind

**Format/placement:** TRACE, at `kit-sequence-rack`.

**Metadata:** Concept: blinding versus randomisation records; Keystone: keystone design; Area: Monitoring Board Room; Learning role: RETRIEVE; Difficulty: L3; Story role: character.

**Call - exact player copy:** Go to the kit sequence rack, in the Kit Warehouse.

**Stop reason - exact player copy:** The survey means little unless the physical assignment path is independently checked.

**Question card story setup - exact player copy:** The cold-room failure made Priya's records look suspicious, but assignment concealment uses a different path. Open each channel and identify which displays depend on the master randomisation file and which remain independent.

**Question card story-science connection - exact player copy:** Agreement among shared displays cannot count as independent proof that nobody could predict the next kit.

**Question card prompt - exact player copy:** Open every dependency, identify channels sharing the master allocation file, and submit the channel that independently verifies the physical blind.

**Complete format-specific interaction block:** `trace:{channels:[{id:"pack_label",label:"pack label",dependency:"master randomisation file",target_dependent:true},{id:"kiosk",label:"kiosk display",dependency:"master randomisation file",target_dependent:true},{id:"pharmacy",label:"pharmacy receipt",dependency:"master randomisation file",target_dependent:true},{id:"sealed_box",label:"physical sealed-box audit",dependency:"physical custody trail",independent:true}],shared_upstream:"master randomisation file",correct_conclusion:"the physical sealed-box audit is independent",answerText:"Three displays share the master file; only the physical sealed-box audit independently tests concealment."}`

**Correct result:** Three displays share the master file; only the sealed-box audit independently confirms concealment.

**Answer text:** The completed check shows three displays share the master file; only the sealed-box audit independently confirms concealment.

**Why:** Agreement among shared displays cannot count as independent proof that nobody could predict the next kit.

**Wrong-path feedback:** Matching displays are independent checks

**State/output:** BLIND PATH INTACT; survey travels.

## Stop 34 - Estimate the Guessing Difference

**Format/placement:** DERIVE, at `analysis-board`.

**Metadata:** Concept: two-proportion CI/conditions; Keystone: keystone CI; Area: Monitoring Board Room; Learning role: INTRODUCE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the analysis board, in Statistics & Analysis.

**Stop reason - exact player copy:** The board needs the size and uncertainty of the arm difference.

**Question card story setup - exact player copy:** The audit path is intact; the survey has 30 correct guesses among 200 treatment staff and 16 among 200 placebo staff. Check counts, then derive the 95% interval for treatment minus placebo.

**Question card story-science connection - exact player copy:** An interval shows whether the observed seven-point gap could plausibly be near zero.

**Question card prompt - exact player copy:** p1=.15,p2=.08,diff=.07; SE=sqrt(.15(.85)/200+.08(.92)/200)=.03171; ME=1.96SE=.06215; CI [.00785,.13215]. Counts 30/170/16/184.

**Complete format-specific interaction block:** `derive:{"goal":"two-proportion confidence interval","givens":["p1=0.15","p2=0.08","n1=n2=200","z*=1.96"],"lines":[{"id":"L1","expression":"difference=0.15-0.08=0.07","license":"state governing relationship"},{"id":"L2","expression":"SE=sqrt[0.15(0.85)/200+0.08(0.92)/200]=0.03171","license":"substitute displayed values"},{"id":"L3","expression":"ME=1.96(0.03171)=0.06215","license":"simplify with units"},{"id":"L4","expression":"CI=0.07±0.06215=[0.00785,0.13215]","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["pool proportions for a confidence interval","reverse only one endpoint"],"correct_result":"[0.00785,0.13215]","answerText":"The treatment-minus-control interval is about 0.008 to 0.132."}`

**Correct result:** .008 to .132 tolerance .002.

**Answer text:** We are 95% confident the true difference in correct-guess proportions is about 0.8 to 13.2 percentage points.

**Why:** An interval shows whether the observed seven-point gap could plausibly be near zero.

**Wrong-path feedback:** endpoint pair in proportions/percentage points

**State/output:** interval appears; S3.

## Stop 35 - Pool Only for the Test

**Format/placement:** DERIVE, at `analysis-board`.

**Metadata:** Concept: two-proportion z test; Keystone: keystone tests; Area: Monitoring Board Room; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the analysis board, in Statistics & Analysis.

**Stop reason - exact player copy:** The registered equality test must use the pooled null standard error.

**Question card story setup - exact player copy:** The confidence interval barely excludes zero, so test H0:p1=p2 against Ha:p1 not equal p2. Pool only for the test, calculate z and p, then state the result at alpha=.05.

**Question card story-science connection - exact player copy:** Correct pooling prevents the same data from receiving incompatible standards.

**Question card prompt - exact player copy:** pooled p=46/400=.115; SE=sqrt(.115(.885)(1/200+1/200))=.03190; z=.07/.03190=2.194; p=.0282.

**Complete format-specific interaction block:** `derive:{"goal":"two-proportion z test","givens":["30/200 versus 16/200","H0:p1=p2"],"lines":[{"id":"L1","expression":"pooled p=(30+16)/400=0.115","license":"state governing relationship"},{"id":"L2","expression":"SE=sqrt[0.115(0.885)(1/200+1/200)]=0.03190","license":"substitute displayed values"},{"id":"L3","expression":"z=0.07/0.03190=2.194","license":"simplify with units"},{"id":"L4","expression":"two-sided p=0.0282","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["use unpooled CI standard error","p=0.0564"],"correct_result":"z=2.19, p=0.028, reject at 0.05","answerText":"The pooled test gives z=2.19 and p=0.028, so reject equal proportions at alpha 0.05."}`

**Correct result:** z2.19 tol .01, p.028 tol .001, reject.

**Answer text:** Since .0282<.05, there is convincing evidence the guessing proportions differ. Pool tests only, never intervals.

**Why:** Correct pooling prevents the same data from receiving incompatible standards.

**Wrong-path feedback:** pooled p, z, p-value, decision

**State/output:** survey flag; S4.

## Stop 36 - Say What It Means

**Format/placement:** STRESS, asked by Priya Shah beside `blind-audit-table`.

**Metadata:** Concept: practical scope and blinding; Keystone: keystone design/inference; Area: Randomisation & Blinding; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Priya Shah, at the blind audit table in the Kit Warehouse.

**Stop reason - exact player copy:** A statistically different survey does not automatically prove broken treatment concealment.

**Question card story setup - exact player copy:** The arm difference is statistically detectable, but the sealed-box audit remained intact and both correct-guess rates are low. Stress the conclusion across survey nonresponse from zero to five percentage points and choose the supported claim.

**Question card story-science connection - exact player copy:** The board must separate evidence of unequal guessing from proof that allocation was exposed.

**Question card prompt - exact player copy:** Move nonresponse from 0 to 5 percentage points in 1-point steps while holding the sealed-box audit fixed. Submit the conclusion surviving the full range.

**Complete format-specific interaction block:** assumption range nonresponse shift 0-.05 step .01; candidates concealment failed, guessing differed, randomisation caused guesses, no evidence; correct guessing differed survives, concealment failed darkens above .01.

**Correct result:** Report unequal guessing proportions, not a proven allocation breach. Design, audit, and survey limitations constrain scope.

**Answer text:** The completed check shows report unequal guessing proportions, not a proven allocation breach. Design, audit, and survey limitations constrain scope.

**Why:** The board must separate evidence of unequal guessing from proof that allocation was exposed.

**Wrong-path feedback:** Difference proves broken concealment

**State/output:** binder 9; M10.

## Mission outcome

Mission decision: Report an arm difference in correct guesses. But do not declare that concealment failed. The interval is about 0.8 to 13.2 points. And the pooled test gives p=.028. The independent box audit stayed intact.

### Post-mission metric screen - exact player copy

MISSION 9 COMPLETE; TIME {elapsed} / TARGET 17:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Blind confirmed and survey cost paid; E+1/S+2/I0/T-4; shared RP copy; QA 98/100/100/55 after 1/1/0/10.

## Quick concept review
- Pool the proportion for a two-proportion test, not its interval.
- Statistical difference and mechanism are separate claims.
- **Mission takeaway:** Random assignment and sampling control scope.

# Mission 10 - The Smaller Benefit

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 10 - BOARD IN 6 DAYS  
**Card title:** The Smaller Benefit  
**Go now:** Go to Adjudication and meet Amina Okafor, endpoint adjudication lead, at the matched-record table.  
**Card body:** Blinding stayed credible, but the fast site's missing outcomes still inflate the recovery headline. t procedures estimate means when population spread is unknown. Compare the adjusted mean, matched records, and two independent groups before taking diagnostics to Statistics. By the end of the mission, decide which treatment-effect estimate belongs in the pack.  
**Objective:** Produce the bias-adjusted mean estimate.

### Worth knowing first - exact player copy
#### Glossary terms
t distribution: a bell-shaped distribution with heavier tails used when population SD is unknown.  
Degrees of freedom: a number controlling the t distribution's shape.  
Paired data: linked measurements analyzed through within-pair differences.  
Two-sample data: measurements from two independent groups.

#### Primer concepts
- Define the order of subtraction.
- Paired t is one-sample t on differences.
- Never pool variances for the AP two-sample t procedure.

#### Equations first needed today
**Equation:** t=(x-bar-mu0)/(s/sqrt n), df=n-1
**What it is for:** Testing one population mean.
**Symbols:** x-bar sample mean; mu0 null mean; s sample SD; n sample size.
**Why this campaign needs it:** The adjusted mean must be compared with the registered benchmark.

**Crew on this mission - mission log:** Amina Okafor — endpoint adjudication lead; Tomas Reed — trial statistician.

## Main story happening - designer summary

At ADJUD, S1 one-sample and S2 paired analyses use verified outcomes; S3 compares independent groups. The results travel to STAT for residual stress testing in S4. **Route:** ADJUD S1-S3; waypoint TAKE ADJUSTED TABLE TO STAT; STAT S4. The old benefit shrinks, a correct answer producing bad news.

## Designer intent - not shown to player

Force procedure choice from data structure and make a smaller, better estimate the dramatic result.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Endpoint Adjudication | `matched-record-table` | automatic**

**World state:** Arrival: ADJUD entry; matched-record table visible; Amina says, ;  - After S1-S2: benchmark dims and paired interval appears;  - After S3: adjusted table seals; waypoint TAKE ADJUSTED TABLE TO STAT. - STAT arrival/final: valid residual field remains; old headline dims; binder 10 and outcome unlock.

**Panel/HUD text:** MISSION 10: TEST THE ADJUSTED MEAN OPEN

**Dialogue bubbles -** Amina Okafor: "Keep pairs together and separate arms apart"

**Unlocks/waypoint:** Unlock Stop 37 at `matched-record-table` in Endpoint Adjudication.

**Beat 2 - After Stop 37 | `matched-record-table` | automatic**

**World state:** The test the adjusted mean result remains visible while the use the pairs fixture lights.

**Panel/HUD text:** STOP 37 RECORDED - STOP 38 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 37 result to settle use the pairs."

**Unlocks/waypoint:** Unlock Stop 38 at `matched-record-table` in Endpoint Adjudication.

**Beat 3 - After Stop 38 | `table-wall` | automatic**

**World state:** The use the pairs result remains visible while the keep groups independent fixture lights.

**Panel/HUD text:** STOP 38 RECORDED - STOP 39 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 38 result to settle keep groups independent."

**Unlocks/waypoint:** Unlock Stop 39 at `table-wall` in Endpoint Adjudication.

**Beat 4 - After Stop 39 | `residual-wall` | automatic**

**World state:** The keep groups independent result remains visible while the stress the adjustment fixture lights.

**Panel/HUD text:** STOP 39 RECORDED - STOP 40 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 39 result to settle stress the adjustment."

**Unlocks/waypoint:** Unlock Stop 40 at `residual-wall` in Statistics & Analysis.

**Beat 5 - At mission end | `matched-record-table` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 10 EVIDENCE: RECORDED

**Dialogue bubbles -** Amina Okafor: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

ADJUD verifies paired and independent source structure; STAT uniquely tests model residuals.

## Characters and dramatic beat

Amina values measurement consistency and accepts a smaller headline when repaired outcomes change the mean.

## Key concepts, explained here

t procedures estimate means when sigma is unknown. One-sample, paired, and two-sample procedures answer different structures. Paired analysis uses within-pair differences; AP two-sample t does not pool variances.


## Stop 37 - Test the Adjusted Mean

**Format/placement:** DERIVE, at `matched-record-table`.

**Metadata:** Concept: one-sample t/conditions; Keystone: keystone t inference; Area: Randomisation & Blinding; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the matched record table, in Endpoint Adjudication.

**Stop reason - exact player copy:** The corrected recovery score must be compared with the registered mean benchmark.

**Question card story setup - exact player copy:** After recovering missing outcomes, n=25 patients have mean score 72 and sample SD 10; the null mean is 68. Check independence and shape, then build the one-sample t statistic.

**Question card story-science connection - exact player copy:** The heavier-tailed t model reflects that population SD is estimated rather than known.

**Question card prompt - exact player copy:** t=(72-68)/(10/sqrt25)=2.00, df24; two-sided p=.0568 from supplied calculator. Lines include conditions random/10% and no strong skew.

**Complete format-specific interaction block:** `derive:{"goal":"one-sample t test","givens":["n=25","xbar=72","s=10","mu0=68"],"lines":[{"id":"L1","expression":"t=(72-68)/(10/sqrt25)=2.00","license":"state governing relationship"},{"id":"L2","expression":"df=24","license":"substitute displayed values"},{"id":"L3","expression":"two-sided p=0.0568","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["use z with known sigma","df=25"],"correct_result":"t=2.00, df=24, p=0.0568; fail to reject","answerText":"The result does not cross alpha 0.05, so fail to reject the null mean."}`

**Correct result:** t2.00 tol .01; df24; p.0568 tol .002; fail reject at .05.

**Answer text:** p=.0568>=.05, so fail to reject H0; evidence is not convincing that the adjusted mean differs from 68.

**Why:** The heavier-tailed t model reflects that population SD is estimated rather than known.

**Wrong-path feedback:** t, df, p-value, conclusion

**State/output:** old headline dims; S2.

## Stop 38 - Use the Pairs

**Format/placement:** DERIVE, at `matched-record-table`.

**Metadata:** Concept: paired t and CI; Keystone: keystone t/CI; Area: Monitoring Board Room; Learning role: PRACTICE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the matched record table, in Endpoint Adjudication.

**Stop reason - exact player copy:** Patients measured before and after treatment must retain their pairing.

**Question card story setup - exact player copy:** The adjusted mean is inconclusive, but 16 same-patient differences defined as after minus before have mean -3 days and SD 4 days. Derive the paired significance test and 95% interval.

**Question card story-science connection - exact player copy:** Pairing removes between-patient variation and tests the mean change actually experienced.

**Question card prompt - exact player copy:** H0:mud=0; t=-3/(4/sqrt16)=-3, df15, p=.0090; t*=2.131, CI -3 plus/minus2.131=[-5.131,-.869].

**Complete format-specific interaction block:** `derive: {visible_prompt: "H0:mud=0; t=-3/(4/sqrt16)=-3, df15, p=.0090; t*=2.131, CI -3 plus/minus2.131=[-5.131,-.869].", keyed_result: "t-3 tol .01; CI endpoints tol .02.", feedback: "t and interval endpoints in days", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** t-3 tol .01; CI endpoints tol .02.

**Answer text:** The interval is -5.13 to -0.87 days; because zero is absent, reject H0 and infer a mean decrease.

**Why:** Pairing removes between-patient variation and tests the mean change actually experienced.

**Wrong-path feedback:** t and interval endpoints in days

**State/output:** paired line retained; S3.

## Stop 39 - Keep Groups Independent

**Format/placement:** DERIVE, at `table-wall`.

**Metadata:** Concept: two-sample t; Keystone: keystone t inference; Area: Randomisation & Blinding; Learning role: COMBINE; Difficulty: L4; Story role: decision evidence.

**Call - exact player copy:** Go to the table wall, in Endpoint Adjudication.

**Stop reason - exact player copy:** A separate arm comparison cannot reuse the paired formula.

**Question card story setup - exact player copy:** The paired change is clear, while independent groups have n1=30, mean1=72, s1=8 and n2=28, mean2=68, s2=7. Derive the unpooled two-sample t statistic for treatment minus placebo before choosing the headline.

**Question card story-science connection - exact player copy:** Using the right data structure keeps a precise-looking but invalid estimate out of the pack.

**Question card prompt - exact player copy:** SE=sqrt(64/30+49/28)=1.971; t=4/1.971=2.03; df supplied Welch 55.6 or conservative min27; two-sided p about .047.

**Complete format-specific interaction block:** `derive: {visible_prompt: "SE=sqrt(64/30+49/28)=1.971; t=4/1.971=2.03; df supplied Welch 55.6 or conservative min27; two-sided p about .047.", keyed_result: "t2.03 tol .02; never pool variances.", feedback: "t and difference in score units", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** t2.03 tol .02; never pool variances.

**Answer text:** The estimated mean difference is 4 score units; Welch t=2.03 with p about .047. Define treatment minus placebo before interpreting sign.

**Why:** Using the right data structure keeps a precise-looking but invalid estimate out of the pack.

**Wrong-path feedback:** t and difference in score units

**State/output:** travel.

## Stop 40 - Stress the Adjustment

**Format/placement:** RESIDUAL, at `residual-wall`.

**Metadata:** Concept: adjustment diagnostics; Keystone: keystone regression/t inference; Area: Endpoint Adjudication; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the residual wall, in Statistics & Analysis.

**Stop reason - exact player copy:** The board needs the estimate that survives both data structure and residual checks.

**Question card story setup - exact player copy:** The three analyses now disagree in strength, so Statistics compares residual fields after distance adjustment. Choose the adjusted model with random scatter, no fan shape, and no single influential site.

**Question card story-science connection - exact player copy:** A smaller well-diagnosed effect is more defensible than a larger biased headline.

**Question card prompt - exact player copy:** Compare residual fields A, B, and C for curvature, unequal spread, and influence. Submit the adjusted model with random scatter and no controlling site.

**Complete format-specific interaction block:** model A benefit7 RMS1.5 curved; B benefit4 RMS1.8 random/equal spread; C benefit6 RMS1.6 fan/influential; answer B.

**Correct result:** Carry the adjusted 4-unit treatment-minus-placebo estimate with its t uncertainty; it is smaller but diagnostically credible.

**Answer text:** The completed check shows carry the adjusted 4-unit treatment-minus-placebo estimate with its t uncertainty; it is smaller but diagnostically credible.

**Why:** A smaller well-diagnosed effect is more defensible than a larger biased headline.

**Wrong-path feedback:** Largest effect is best model; require valid diagnostics

**State/output:** binder 10; M11.

## Mission outcome

Mission decision: Put the adjusted four-unit treatment effect in the pack. It uses the two groups in the right way. The error check also passes. Paired records support a shorter recovery. The one-group test does not settle the claim.

### Post-mission metric screen - exact player copy

MISSION 10 COMPLETE; TIME {elapsed} / TARGET 18:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Bias adjustment lowers headline; E-4/S0/I0/T-3; shared RP copy; QA 100/100/100/58 after 6/0/0/6.

## Quick concept review
- Choose one-sample, paired, or two-sample t from the data structure.
- Use t because sigma is unknown.
- **Mission takeaway:** Never pool AP two-sample variances.

# Mission 11 - Lock the File

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 11 - BOARD IN 5 DAYS  
**Card title:** Lock the File  
**Go now:** Go to Data Management and meet Mara Voss, trial director, at the extraction console.  
**Card body:** The adjusted estimate is ready, but three reports point to different final tables. Sampling distributions explain ordinary variation; shared extraction paths explain identical errors. Validate the table at Data Management, trace dependencies in Statistics, then lock the master file upstairs. By the end of the mission, decide which extraction is independent enough to become final.  
**Objective:** Validate and lock one analysis file.

### Worth knowing first - exact player copy
#### Glossary terms
Central Limit Theorem: for large n, the sampling distribution of a sample mean is approximately Normal.  
Standard error: an estimate of a statistic's sampling spread.  
Unbiased estimator: an estimator whose sampling-distribution mean equals the parameter.

#### Primer concepts
- Statistics vary; parameters are fixed.
- Larger n narrows sampling spread without changing its center.
- Exact agreement can signal a shared dependency rather than confirmation.

#### Equations first needed today
**Equation:** mean(x-bar)=mu; SD(x-bar)=sigma/sqrt(n)
**What it is for:** Describing sample-mean behavior.
**Symbols:** mu and sigma are population mean and SD; n is sample size.
**Why this campaign needs it:** The lock check must separate expected sampling variation from copied extraction errors.

**Crew on this mission - mission log:** Mara Voss — trial director; Tomas Reed — trial statistician.

## Main story happening - designer summary

**Three locations:** DATA S1-S2 validates center/spread and held-out rows; STAT S3 traces dependencies; ARCHIVE S4 attests lock. Waypoints: CARRY HOLDOUT HASH TO STAT, then TAKE INDEPENDENT HASH TO TRIAL MASTER FILE. Beats show three identical reports, one independent rerun, firewall climb, and LOCKED seal. Mara's schedule-first stance changes when identical errors expose false confirmation.

## Designer intent - not shown to player

Retrieve sampling-distribution logic and use it to distinguish ordinary variability from copied pipeline error.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Data Management | `sampling-board` | automatic**

**World state:** Arrival: DATA entry; three identical reports visible; Mara says, ;  - After S1-S2: holdout hash prints; waypoint CARRY HOLDOUT HASH TO STAT. - STAT arrival/after S3: shared dependency lines appear; waypoint TAKE INDEPENDENT HASH TO TRIAL MASTER FILE. - ARCHIVE final: four attestations pass; archive becomes READ ONLY / LOCKED; binder 11 and outcome unlock.

**Panel/HUD text:** MISSION 11: PREDICT SAMPLING SPREAD OPEN

**Dialogue bubbles -** Mara Voss: "Matching is not enough. Show me independence"

**Unlocks/waypoint:** Unlock Stop 41 at `sampling-board` in Data Management.

**Beat 2 - After Stop 41 | `holdout-safe` | automatic**

**World state:** The predict sampling spread result remains visible while the freeze before revealing fixture lights.

**Panel/HUD text:** STOP 41 RECORDED - STOP 42 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 41 result to settle freeze before revealing."

**Unlocks/waypoint:** Unlock Stop 42 at `holdout-safe` in Data Management.

**Beat 3 - After Stop 42 | `extraction-map` | automatic**

**World state:** The freeze before revealing result remains visible while the trace the agreement fixture lights.

**Panel/HUD text:** STOP 42 RECORDED - STOP 43 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 42 result to settle trace the agreement."

**Unlocks/waypoint:** Unlock Stop 43 at `extraction-map` in Statistics & Analysis.

**Beat 4 - After Stop 43 | `archive-seal` | automatic**

**World state:** The trace the agreement result remains visible while the make the lock real fixture lights.

**Panel/HUD text:** STOP 43 RECORDED - STOP 44 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 43 result to settle make the lock real."

**Unlocks/waypoint:** Unlock Stop 44 at `archive-seal` in Trial Master File.

**Beat 5 - At mission end | `sampling-board` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 11 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

DATA validates unseen source rows; STAT reveals extraction dependencies; ARCHIVE alone can enforce read-only lock.

## Characters and dramatic beat

Mara initially wants speed. Identical errors make her accept the delayed independent rerun and permanent lock.

## Key concepts, explained here

Sample statistics vary around fixed parameters. Unbiasedness concerns the sampling-distribution center; n controls spread. Holdouts test new data. Shared upstream dependencies make matching outputs redundant.


## Stop 41 - Predict Sampling Spread

**Format/placement:** DERIVE, at `sampling-board`.

**Metadata:** Concept: CLT/unbiasedness/SE; Keystone: keystone sampling distributions/normal; Area: Endpoint Adjudication; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the sampling board, in Data Management.

**Stop reason - exact player copy:** Ordinary sample-to-sample change must not be mistaken for a corrupted extraction.

**Question card story setup - exact player copy:** The source population has mean 70, SD 12, and each extraction averages n=36 independent records. Derive the sampling distribution of x-bar and explain what increasing n changes in that distribution.

**Question card story-science connection - exact player copy:** A discrepancy far beyond expected spread points to pipeline error rather than ordinary sampling fluctuation.

**Question card prompt - exact player copy:** center=70 [unbiased]; SD=12/sqrt36=2 [sampling SD]; CLT approximate Normal [n>=30]. Submit 70 units,2 units.

**Complete format-specific interaction block:** `derive:{"goal":"center and spread of xbar","givens":["mu=70","sigma=12","n=36"],"lines":[{"id":"L1","expression":"mean(xbar)=mu=70","license":"state governing relationship"},{"id":"L2","expression":"SD(xbar)=sigma/sqrt(n)=12/6=2","license":"substitute displayed values"},{"id":"L3","expression":"n=36 supports an approximately Normal mean","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["SD=12","mean=72"],"correct_result":"mean 70, SD 2","answerText":"The sampling distribution is centered at 70 with standard deviation 2."}`

**Correct result:** x-bar is approximately Normal with mean 70 and SD 2. Larger n narrows spread, not center. Use SE when sigma is estimated by s.

**Answer text:** The completed check shows x-bar is approximately Normal with mean 70 and SD 2. Larger n narrows spread, not center. Use SE when sigma is estimated by s.

**Why:** A discrepancy far beyond expected spread points to pipeline error rather than ordinary sampling fluctuation.

**Wrong-path feedback:** center/spread pair in units

**State/output:** corridor 70 plus/minus spread; S2.

## Stop 42 - Freeze Before Revealing

**Format/placement:** HOLDOUT, at `holdout-safe`.

**Metadata:** Concept: model validation; Keystone: keystone sampling distributions; Area: Endpoint Adjudication; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the holdout safe, in Data Management.

**Stop reason - exact player copy:** The chosen extraction rule must face records it did not use to tune itself.

**Question card story setup - exact player copy:** The expected spread is two units, and three candidate cleaning rules fit the development rows. Freeze one rule before the console reveals 20 previously held-out source records and their errors.

**Question card story-science connection - exact player copy:** A holdout prevents the rule from being rewarded for memorizing the same anomalies it must predict.

**Question card prompt - exact player copy:** Review training errors for rules A, B, and C, then freeze one documented rule before 20 held-out records unlock. Submit the rule with acceptable unseen error.

**Complete format-specific interaction block:** training fits A1.2,B1.3,C1.4 error; freeze B due documented rule; heldout A4.8,B1.6,C3.9; correct B; settings and revealed data supplied.

**Correct result:** Freeze B before reveal; it stays within expected error on unseen records.

**Answer text:** The completed check shows freeze B before reveal; it stays within expected error on unseen records.

**Why:** A holdout prevents the rule from being rewarded for memorizing the same anomalies it must predict.

**Wrong-path feedback:** Tune on holdout; freeze before reveal

**State/output:** independent hash created; travel STAT.

## Stop 43 - Trace the Agreement

**Format/placement:** TRACE, at `extraction-map`.

**Metadata:** Concept: dependence; Keystone: keystone inference integrity; Area: Monitoring Board Room; Learning role: TRANSFER; Difficulty: L4; Story role: twist.

**Call - exact player copy:** Go to the extraction map, in Statistics & Analysis.

**Stop reason - exact player copy:** Three matching reports may share the same wrong upstream table.

**Question card story setup - exact player copy:** The held-out rule produced an independent hash, while efficacy, safety, and registry reports agree digit for digit. Open all their dependencies and identify which report channels share the same nightly extraction.

**Question card story-science connection - exact player copy:** Shared inputs make agreement redundant; only the source rerun can validate the final table.

**Question card prompt - exact player copy:** Open all four extraction channels and trace each to its upstream source. Submit the three dependent reports and the genuinely independent rerun.

**Complete format-specific interaction block:** `trace:{channels:[{id:"efficacy",label:"efficacy report",dependency:"nightly_v7 extraction",target_dependent:true},{id:"safety",label:"safety report",dependency:"nightly_v7 extraction",target_dependent:true},{id:"registry",label:"registry report",dependency:"nightly_v7 extraction",target_dependent:true},{id:"source_rerun",label:"independent source rerun",dependency:"raw source tables",independent:true}],shared_upstream:"nightly_v7 extraction",correct_conclusion:"only the source rerun is independent",answerText:"Digit-for-digit agreement among three reports is redundant because all use nightly_v7; the source rerun is independent."}`

**Correct result:** The three matching reports are not independent confirmations; use the source rerun and held-out hash.

**Answer text:** The completed check shows the three matching reports are not independent confirmations; use the source rerun and held-out hash.

**Why:** Shared inputs make agreement redundant; only the source rerun can validate the final table.

**Wrong-path feedback:** Exact agreement proves confirmation

**State/output:** shared lines turn amber with text; travel ARCHIVE.

## Stop 44 - Make the Lock Real

**Format/placement:** ATTEST, asked by Mara Voss beside `archive-seal`.

**Metadata:** Concept: file integrity; Keystone: keystone study design/reporting; Area: Monitoring Board Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mara Voss, at the archive seal in Trial Master File.

**Stop reason - exact player copy:** Mara must verify identity, time, and physical condition before sealing the file.

**Question card story setup - exact player copy:** The independent extraction survives its holdout and dependency audit. Verify the source hash, signed timestamp, frozen analysis plan, and read-only archive while rejecting the copied report as genuinely independent support.

**Question card story-science connection - exact player copy:** A lock preserves the analysis boundary only if its evidence and permissions are independently backed.

**Question card prompt - exact player copy:** Select exactly four backed controls: source hash, signed timestamp, frozen plan, and read-only permission. Submit the attestation while rejecting copied-report agreement as independent evidence.

**Complete format-specific interaction block:** `attest:{verification_limit:4,claims:[{id:"source_hash",label:"source hash",signed:true,backed:true,critical:true},{id:"timestamp",label:"signed timestamp",signed:true,backed:true,critical:true},{id:"analysis_plan",label:"frozen analysis plan",signed:true,backed:true,critical:true},{id:"readonly",label:"read-only archive permission",signed:true,backed:true,critical:true},{id:"copied_reports",label:"three copied reports are independent",signed:true,backed:false,critical:true}],correct_verified:["source_hash","timestamp","analysis_plan","readonly"],critical_unbacked:"copied_reports",answerText:"Verify the four independent lock records and reject copied-report agreement as independent support."}`

**Correct result:** Lock the independently rerun table with four backed controls; matching dependent reports add no independent evidence.

**Answer text:** The completed check shows lock the independently rerun table with four backed controls; matching dependent reports add no independent evidence.

**Why:** A lock preserves the analysis boundary only if its evidence and permissions are independently backed.

**Wrong-path feedback:** Copied reports provide three proofs

**State/output:** binder 11; Integrity lock; M12.

## Mission outcome

Mission decision: Lock the fresh data run, not the three copied reports. Its tests, holdout, file mark, and access log all pass. Trial data are now secure. The last table holds three different problems.

### Post-mission metric screen - exact player copy

MISSION 11 COMPLETE; TIME {elapsed} / TARGET 18:00; INCORRECT SUBMISSIONS {incorrect_submissions}; File lock prevents silent edits; T-3; shared RP copy; QA 100/100/100/67 after 12 RP to Time; Integrity locks.

## Quick concept review
- Parameters are fixed; sample statistics vary.
- Larger samples reduce sampling spread.
- **Mission takeaway:** Validate on held-out data.

# Mission 12 - Three Different Tables

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 12 - BOARD IN 4 DAYS  
**Card title:** Three Different Tables  
**Go now:** Go to Adjudication and meet Amina Okafor, endpoint adjudication lead, at the categorical-table wall.  
**Card body:** The file is locked, and it separates the alert into outcome mix, arm association, and site differences. Chi-square procedures compare observed categorical counts with expected counts. Build each expected table at Adjudication, verify design at Site Operations, then brief the board upstairs. By the end of the mission, decide whether the three problems share one explanation.  
**Objective:** Separate the categorical findings.

### Worth knowing first - exact player copy
#### Glossary terms
Goodness-of-fit test: compares one categorical variable with a claimed distribution.  
Independence test: tests association between two categorical variables in one population.  
Homogeneity test: compares one categorical distribution across two or more populations or treatments.  
Expected count: count predicted under the null model.

#### Primer concepts
- All expected counts must be at least 5.
- Chi-square is nonnegative and uses the right tail.
- Independence and homogeneity use the same arithmetic but different designs.

#### Equations first needed today
**Equation:** chi-square=sum[(O-E)^2/E]
**What it is for:** Measuring total categorical mismatch.
**Symbols:** O observed count; E expected count.
**Why this campaign needs it:** The board must quantify three different table discrepancies.

**Crew on this mission - mission log:** Amina Okafor — endpoint adjudication lead; Jonas Berg — safety monitoring chair.

## Main story happening - designer summary

**Three locations:** ADJUD S1 GOF; SITE S2 verifies one-sample independence design; BOARD S3-S4 handles homogeneity and diagnosis. Waypoints follow each table. Beats label TABLE 1 DISTRIBUTION, TABLE 2 ASSOCIATION, TABLE 3 SITE DIFFERENCE. The result rejects a single-cause story.

## Designer intent - not shown to player

Teach all three chi-square procedures through the collection design, not merely through similar tables.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Endpoint Adjudication | `table-wall` | automatic**

**World state:** Arrival: ADJUD entry; categorical wall shows grade counts; Amina says, ;  - After S1: GOF label locks; waypoint TAKE ARM/EVENT TABLE TO SITE OPERATIONS. - SITE after S2: design label INDEPENDENCE appears; waypoint CARRY VERIFIED TABLES TO BOARD. - BOARD after S3/final: association and site-difference labels appear; binder 12 and outcome unlock.

**Panel/HUD text:** MISSION 12: FIT ONE DISTRIBUTION OPEN

**Dialogue bubbles -** Amina Okafor: "First ask what this one distribution should look like"

**Unlocks/waypoint:** Unlock Stop 45 at `table-wall` in Endpoint Adjudication.

**Beat 2 - After Stop 45 | `enrollment-wall` | automatic**

**World state:** The fit one distribution result remains visible while the name the design fixture lights.

**Panel/HUD text:** STOP 45 RECORDED - STOP 46 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 45 result to settle name the design."

**Unlocks/waypoint:** Unlock Stop 46 at `enrollment-wall` in Monitors' Room.

**Beat 3 - After Stop 46 | `event-console` | automatic**

**World state:** The name the design result remains visible while the test arm by event fixture lights.

**Panel/HUD text:** STOP 46 RECORDED - STOP 47 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 46 result to settle test arm by event."

**Unlocks/waypoint:** Unlock Stop 47 at `event-console` in Monitoring Board Room.

**Beat 4 - After Stop 47 | `board-console` | automatic**

**World state:** The test arm by event result remains visible while the compare the sites fixture lights.

**Panel/HUD text:** STOP 47 RECORDED - STOP 48 OPEN

**Dialogue bubbles -** Amina Okafor: "Use the Stop 47 result to settle compare the sites."

**Unlocks/waypoint:** Unlock Stop 48 at `board-console` in Monitoring Board Room.

**Beat 5 - At mission end | `table-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 12 EVIDENCE: RECORDED

**Dialogue bubbles -** Amina Okafor: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

ADJUD owns category definitions; SITE verifies how samples were drawn; BOARD holds unblinded cross-arm and cross-site counts.

## Characters and dramatic beat

Amina insists that one count table cannot stand in for three questions. Jonas accepts separate actions rather than one global response.

## Key concepts, explained here

GOF compares one variable to fixed expected proportions. Independence uses two variables from one sample; homogeneity compares one variable across samples. Expected counts and degrees of freedom define the right-tailed reference distribution.


## Stop 45 - Fit One Distribution

**Format/placement:** DERIVE, at `table-wall`.

**Metadata:** Concept: chi-square GOF; Keystone: keystone categorical inference; Area: Statistics & Analysis; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the table wall, in Endpoint Adjudication.

**Stop reason - exact player copy:** Outcome grades must be tested against the registered 40/40/20 split.

**Question card story setup - exact player copy:** The locked file observes 50 mild, 30 moderate, and 20 severe events among 100 reports. Derive the goodness-of-fit statistic and degrees of freedom against the registered expected counts 40,40,20.

**Question card story-science connection - exact player copy:** This asks whether one variable follows a claimed distribution, not whether two variables are associated.

**Question card prompt - exact player copy:** contributions 100/40=2.5,100/40=2.5,0; chi2=5; df=3-1=2; p=.0821 supplied.

**Complete format-specific interaction block:** `derive:{"goal":"chi-square goodness-of-fit test","givens":["observed counts differ by +10,+10,0","expected count=40 in each of three categories"],"lines":[{"id":"L1","expression":"contributions=10^2/40+10^2/40+0=2.5+2.5+0","license":"state governing relationship"},{"id":"L2","expression":"chi-square=5.0","license":"substitute displayed values"},{"id":"L3","expression":"df=3-1=2","license":"simplify with units"},{"id":"L4","expression":"p=0.0821","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["df=3","reject at 0.05"],"correct_result":"chi-square=5, df=2, p=0.082; fail to reject","answerText":"With p=0.082, the observed grades do not significantly differ from the planned distribution at 0.05."}`

**Correct result:** 5,df2,p.082; fail reject at .05.

**Answer text:** The mismatch is not convincing at alpha .05; do not say the registered mix is true.

**Why:** This asks whether one variable follows a claimed distribution, not whether two variables are associated.

**Wrong-path feedback:** chi-square, df, p-value conclusion

**State/output:** table1 labeled GOF; travel SITE.

## Stop 46 - Name the Design

**Format/placement:** PROTOCOL, at `enrollment-wall`.

**Metadata:** Concept: independence versus homogeneity; Keystone: keystone design/categorical; Area: Monitoring Board Room; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the enrollment wall, in Monitors' Room.

**Stop reason - exact player copy:** The next table's test name depends on how its counts were collected.

**Question card story setup - exact player copy:** One randomized trial sample records treatment arm and serious-event status for every patient. Match this design to independence, then distinguish a future comparison drawing separate patient samples from several hospitals.

**Question card story-science connection - exact player copy:** Same arithmetic cannot erase the difference between one sample with two variables and several populations with one variable.

**Question card prompt - exact player copy:** Match each collection design to chi-square goodness-of-fit, independence, or homogeneity. Submit the complete three-item method mapping.

**Complete format-specific interaction block:** one sample/two variables -> independence; multiple site samples/one response -> homogeneity; one variable versus fixed distribution -> GOF.

**Correct result:** Use independence for arm by event in one sample; homogeneity for comparing response distributions across site samples.

**Answer text:** The completed check shows use independence for arm by event in one sample; homogeneity for comparing response distributions across site samples.

**Why:** Same arithmetic cannot erase the difference between one sample with two variables and several populations with one variable.

**Wrong-path feedback:** Test chosen by table shape alone

**State/output:** design verified; travel BOARD.

## Stop 47 - Test Arm by Event

**Format/placement:** DERIVE, at `event-console`.

**Metadata:** Concept: chi-square independence; Keystone: keystone categorical/tests; Area: Statistics & Analysis; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the event console, in Monitoring Board Room.

**Stop reason - exact player copy:** The board needs to know whether treatment arm and serious-event status are associated.

**Question card story setup - exact player copy:** The table has 30 events and 170 non-events in treatment, versus 16 and 184 in placebo. Compute expected counts from row total times column total over 400, then calculate chi-square.

**Question card story-science connection - exact player copy:** Association by arm is a different question from the outcome-grade distribution.

**Question card prompt - exact player copy:** expected per arm event23, none177; chi2=2(49/23)+2(49/177)=4.8146; df1; p=.0282.

**Complete format-specific interaction block:** `derive:{"goal":"chi-square test of independence","givens":["two arms","event total=46","none total=354","n=400"],"lines":[{"id":"L1","expression":"expected per arm: event=23, none=177","license":"state governing relationship"},{"id":"L2","expression":"chi-square=2(49/23)+2(49/177)=4.8146","license":"substitute displayed values"},{"id":"L3","expression":"df=(2-1)(2-1)=1","license":"simplify with units"},{"id":"L4","expression":"p=0.0282","license":"simplify with units"}],"keyed_order":["L1","L2","L3","L4"],"decoys":["use observed counts as expected","df=2"],"correct_result":"chi-square=4.815, df=1, p=0.0282; reject independence","answerText":"The arm and event variables are associated at alpha 0.05."}`

**Correct result:** 4.815 tol .01; reject independence.

**Answer text:** There is convincing evidence of association between arm and event status; randomized assignment supports a causal arm effect if trial conduct is sound.

**Why:** Association by arm is a different question from the outcome-grade distribution.

**Wrong-path feedback:** expected counts, chi-square, df, conclusion

**State/output:** table2 ASSOCIATION; S4.

## Stop 48 - Compare the Sites

**Format/placement:** DIAGNOSIS, at `board-console`.

**Metadata:** Concept: chi-square homogeneity and integrated design; Keystone: keystone categorical/design; Area: Statistics & Analysis; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the board console, in Monitoring Board Room.

**Stop reason - exact player copy:** One repair is unsafe unless the site-distribution problem is kept separate.

**Question card story setup - exact player copy:** Three site samples report events 18/100, 30/100, and 12/100; chi-square is 10.50 with df=2 and p=.0053. Combine all three categorical tests and choose the one explanation fitting their different collection designs.

**Question card story-science connection - exact player copy:** Different null questions can yield different decisions even when every display uses counts.

**Question card prompt - exact player copy:** Compare GOF p=0.082, arm-independence p=0.028, site-homogeneity p=0.0053, and cold exposure. Submit the interpretation keeping the three questions separate.

**Complete format-specific interaction block:** readings GOF p.082 quiet, arm independence p.028 alarm, site homogeneity p.0053 alarm, cold exposure concentrated alarm. Choices one universal counting error; grade mix consistent but arm/site distributions differ; no issue; GOF proves equal sites. Answer second.

**Correct result:** Keep three findings separate: grade mix is not detectably different, arm and event are associated, and event distribution differs across sites.

**Answer text:** The completed check shows keep three findings separate: grade mix is not detectably different, arm and event are associated, and event distribution differs across sites.

**Why:** Different null questions can yield different decisions even when every display uses counts.

**Wrong-path feedback:** One significant table explains all tables

**State/output:** binder12; M13.

## Mission outcome

Mission decision: Do not force one cause onto all three tables. Event grades match the planned mix. Treatment arm and hospital do not. The study design calls for different tests. New side studies now compete for one error budget.

### Post-mission metric screen - exact player copy

MISSION 12 COMPLETE; TIME {elapsed} / TARGET 18:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Three problems require separate teams; T-6; shared RP copy; QA 100/100/100/73 after 12 RP to Time.

## Quick concept review
- Expected counts come from the null model.
- Chi-square uses the right tail.
- **Mission takeaway:** Test name follows the study design.

# Mission 13 - Too Many Wins

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 13 - BOARD IN 3 DAYS  
**Card title:** Too Many Wins  
**Go now:** Go to Statistics and meet Tomas Reed, trial statistician, at the residual wall.  
**Card body:** The locked tables separate three problems, but ten secondary analyses now contain several small p-values. Slope inference tests a population linear trend, and multiplicity counts the opportunities for false wins. Check model conditions in Statistics, verify commitments in Regulatory, then carry corrected claims upstairs. By the end of the mission, decide which benefits remain evidence.  
**Objective:** Correct the secondary claims and lock Evidence Strength.

### Worth knowing first - exact player copy
#### Glossary terms
Population slope: the true change in mean response per unit x in the population.  
LINE conditions: linearity, independence, Normal residuals, and equal residual variance.  
Multiplicity: increased false-positive opportunity from testing many claims.

#### Primer concepts
- Regression output usually reports a two-sided p-value.
- For a one-sided alternative matching the slope sign, halve that p-value.
- A correction changes the claim threshold, not the observed effect.

#### Equations first needed today
**Equation:** t=b/SE(b), df=n-2; slope CI=b plus or minus t-star SE(b)
**What it is for:** Testing and estimating a population slope.
**Symbols:** b sample slope; SE(b) its standard error; n sample size.
**Why this campaign needs it:** The board must assess a dose-response trend.

**Crew on this mission - mission log:** Tomas Reed — trial statistician; Lena Wu — regulatory and registry lead.

## Main story happening - designer summary

**Three locations:** STAT S1-S2 conditions/slope; REG S3 attests ten registered secondary tests; BOARD S4 sets correction. Waypoints carry output and registry list. The attractive biomarker win vanishes; primary evidence locks.

## Designer intent - not shown to player

Join regression-slope inference to the familywise false-positive problem and pay off preregistration.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Statistics & Analysis | `residual-wall` | automatic**

**World state:** Arrival: STAT entry; residual wall visible; Tomas says, ;  - After S1-S2: slope report seals; waypoint TAKE SLOPE REPORT TO REGISTRY. - REG after S3: ten-test family prints; waypoint CARRY REGISTERED FAMILY TO BOARD. - BOARD final: threshold commits before p-values reveal; two survivors remain; binder 13 and outcome unlock.

**Panel/HUD text:** MISSION 13: PASS LINE OPEN

**Dialogue bubbles -** Tomas Reed: "A small p-value waits until LINE passes"

**Unlocks/waypoint:** Unlock Stop 49 at `residual-wall` in Statistics & Analysis.

**Beat 2 - After Stop 49 | `analysis-board` | automatic**

**World state:** The pass line result remains visible while the infer the slope fixture lights.

**Panel/HUD text:** STOP 49 RECORDED - STOP 50 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 49 result to settle infer the slope."

**Unlocks/waypoint:** Unlock Stop 50 at `analysis-board` in Statistics & Analysis.

**Beat 3 - After Stop 50 | `claim-ledger` | automatic**

**World state:** The infer the slope result remains visible while the count the claims fixture lights.

**Panel/HUD text:** STOP 50 RECORDED - STOP 51 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 50 result to settle count the claims."

**Unlocks/waypoint:** Unlock Stop 51 at `claim-ledger` in Regulatory & Registry.

**Beat 4 - After Stop 51 | `trigger-rail` | automatic**

**World state:** The count the claims result remains visible while the correct before seeing fixture lights.

**Panel/HUD text:** STOP 51 RECORDED - STOP 52 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 51 result to settle correct before seeing."

**Unlocks/waypoint:** Unlock Stop 52 at `trigger-rail` in Monitoring Board Room.

**Beat 5 - At mission end | `residual-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 13 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STAT owns diagnostics/output; REG proves which tests belong to the family; BOARD commits the correction and acts.

## Characters and dramatic beat

Tomas loses a preferred biomarker claim but preserves the valid slope. Lena's registry work becomes decision evidence, not paperwork.

## Key concepts, explained here

Slope t inference requires LINE. The sample slope estimates beta and carries y-per-x units. Multiplicity counts chances to err; Bonferroni divides family alpha across planned tests.


## Stop 49 - Pass LINE

**Format/placement:** RESIDUAL, at `residual-wall`.

**Metadata:** Concept: LINE; Keystone: keystone regression/conditions; Area: Endpoint Adjudication; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the residual wall, in Statistics & Analysis.

**Stop reason - exact player copy:** Slope inference is invalid if its residual pattern fails the model.

**Question card story setup - exact player copy:** The dose-response scatterplot looks linear, but inference needs more than the fitted line. Select the residual field with random scatter, near-Normal shape, independent patients, and equal spread across fitted values.

**Question card story-science connection - exact player copy:** A small slope p-value cannot repair nonlinearity or a fan-shaped residual field.

**Question card prompt - exact player copy:** Inspect residual fields A, B, and C for LINE: linearity, independence, Normal residuals, and equal variance. Submit the only field passing all four conditions.

**Complete format-specific interaction block:** fields A random/equal/normal, B curve, C fan; correct A; independence supplied by random patient units.

**Correct result:** A passes LINE: linear residual pattern, independent observations, Normal residuals, and equal variance.

**Answer text:** The completed check shows a passes LINE: linear residual pattern, independent observations, Normal residuals, and equal variance.

**Why:** A small slope p-value cannot repair nonlinearity or a fan-shaped residual field.

**Wrong-path feedback:** Small p repairs a bad model

**State/output:** slope output unlocks.

## Stop 50 - Infer the Slope

**Format/placement:** DERIVE, at `analysis-board`.

**Metadata:** Concept: slope test/CI and one-tail trap; Keystone: keystone regression/CI/tests; Area: Endpoint Adjudication; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the analysis board, in Statistics & Analysis.

**Stop reason - exact player copy:** The board needs the size and uncertainty of the dose-response trend.

**Question card story setup - exact player copy:** The model passes LINE; output gives b=-0.80 recovery day per dose unit, SE(b)=0.25, and n=30. Derive t, df, the 95% interval, and the correct one-sided p-value from the reported two-sided p=.0034.

**Question card story-science connection - exact player copy:** Direction, units, and uncertainty determine whether the trend is useful rather than merely significant.

**Question card prompt - exact player copy:** t=-.8/.25=-3.2; df28; t*=2.048; CI -.8 plus/minus .512=[-1.312,-.288]; one-sided p=.0017 for beta<0.

**Complete format-specific interaction block:** `derive:{"goal":"test and interval for regression slope","givens":["b=-0.8 day/dose","SEb=0.25","df=28","t*=2.048"],"lines":[{"id":"L1","expression":"t=-0.8/0.25=-3.2","license":"state governing relationship"},{"id":"L2","expression":"CI=-0.8±2.048(0.25)=[-1.312,-0.288]","license":"substitute displayed values"},{"id":"L3","expression":"one-sided p=0.0017 for beta<0","license":"simplify with units"}],"keyed_order":["L1","L2","L3"],"decoys":["t=-0.3125","CI centered at zero"],"correct_result":"t=-3.2; CI [-1.312,-0.288]; p=0.0017","answerText":"The negative slope is statistically supported, and its 95% interval excludes zero."}`

**Correct result:** values above, tolerances .01/.005.

**Answer text:** Each dose unit predicts .80 fewer recovery day; the 95% population-slope interval is -1.312 to -.288.

**Why:** Direction, units, and uncertainty determine whether the trend is useful rather than merely significant.

**Wrong-path feedback:** t, df, slope-CI endpoint pair in day/dose, one-tail p

**State/output:** travel REG.

## Stop 51 - Count the Claims

**Format/placement:** ATTEST, asked by Tomas Reed beside `claim-ledger`.

**Metadata:** Concept: registered tests; Keystone: keystone multiplicity/reporting; Area: Monitoring Board Room; Learning role: RETRIEVE; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Talk to Tomas Reed, at the claim ledger in Regulatory & Registry.

**Stop reason - exact player copy:** Correction requires the true number of opportunities to claim a win.

**Question card story setup - exact player copy:** The slope survives its own test, but the registry lists ten secondary analyses sharing one family. Verify all ten timestamps and reject an eleventh biomarker analysis added after results appeared.

**Question card story-science connection - exact player copy:** Counting only significant results would hide the number of chances that produced them.

**Question card prompt - exact player copy:** Verify the ten preregistered secondary-test timestamps and reject the post-result biomarker claim. Submit the ten-test correction family.

**Complete format-specific interaction block:** `attest:{verification_limit:10,claims:[{id:"secondary_1",signed:true,backed:true,critical:true},{id:"secondary_2",signed:true,backed:true,critical:true},{id:"secondary_3",signed:true,backed:true,critical:true},{id:"secondary_4",signed:true,backed:true,critical:true},{id:"secondary_5",signed:true,backed:true,critical:true},{id:"secondary_6",signed:true,backed:true,critical:true},{id:"secondary_7",signed:true,backed:true,critical:true},{id:"secondary_8",signed:true,backed:true,critical:true},{id:"secondary_9",signed:true,backed:true,critical:true},{id:"secondary_10",signed:true,backed:true,critical:true},{id:"late_biomarker",signed:true,backed:false,critical:true}],correct_verified:["secondary_1","secondary_2","secondary_3","secondary_4","secondary_5","secondary_6","secondary_7","secondary_8","secondary_9","secondary_10"],critical_unbacked:"late_biomarker",answerText:"Count and verify all ten preregistered secondary claims; exclude the biomarker added after results appeared."}`

**Correct result:** The correction family contains ten pre-specified tests; the added biomarker is exploratory.

**Answer text:** The completed check shows the correction family contains ten pre-specified tests; the added biomarker is exploratory.

**Why:** Counting only significant results would hide the number of chances that produced them.

**Wrong-path feedback:** Count only significant tests

**State/output:** travel BOARD.

## Stop 52 - Correct Before Seeing

**Format/placement:** TRIGGER, at `trigger-rail`.

**Metadata:** Concept: familywise error/complement/power; Keystone: keystone probability/errors; Area: Statistics & Analysis; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the trigger rail, in Monitoring Board Room.

**Stop reason - exact player copy:** The board must set a family threshold before sorting the ten p-values.

**Question card story setup - exact player copy:** Ten independent null tests at alpha=.05 create about a 40% chance of at least one false positive. Commit the Bonferroni threshold, then reveal the secondary p-values and select survivors.

**Question card story-science connection - exact player copy:** Correction protects the family claim while preserving the observed effect sizes for transparent reporting.

**Question card prompt - exact player copy:** calculate/commit 1-.95^10=.4013 and .05/10=.005; threshold scale 0-.05, anchors .001,.005,.01,.05; reveal p-values [.0017,.004,.007,.012,.02,.03,.08,.11,.24,.61]; survivors first two.

**Complete format-specific interaction block:** `trigger:{prediction:{equation:"family risk=1-(1-alpha)^m",inputs:{alpha:0.05,m:10},truth:0.4013,tolerance:0.002},decision_rule:"retain only p≤0.005",scale:{min:0,max:0.05,anchors:[0.001,0.005,0.01,0.05]},updates:[0.0017,0.004,0.007,0.012,0.02,0.03,0.08,0.11,0.24,0.61],correct_survivors:[0.0017,0.004],answerText:"Ten uncorrected tests have 40.13% family risk; the Bonferroni line is 0.005, so only the first two p-values survive."}`

**Correct result:** 40.13%, .005 inclusive; first two survive.

**Answer text:** Use alpha=.005 per test. The slope and one other claim survive; the biomarker does not enter the family.

**Why:** Correction protects the family claim while preserving the observed effect sizes for transparent reporting.

**Wrong-path feedback:** family-risk percent, threshold, survivor selection

**State/output:** binder13; Evidence locks; M14.

## Mission outcome

Mission decision: Keep only the two planned results with p at or below .005. The dose slope still has support. The marker result is now only a clue. Evidence strength is locked. A late harm range still crosses the stop line.

### Post-mission metric screen - exact player copy

MISSION 13 COMPLETE; TIME {elapsed} / TARGET 18:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Multiplicity correction locks Evidence; T-4; shared RP copy; QA 100/100/100/81 after 12 RP to Time; Evidence locks.

## Quick concept review
- LINE comes before slope inference.
- Interpret slope with units and direction.
- **Mission takeaway:** Count every planned test, not only wins.

# Mission 14 - Stop or Continue

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 14 - BOARD TOMORROW  
**Card title:** Stop or Continue  
**Go now:** Go to Statistics and meet Tomas Reed, trial statistician, at the uncertainty console.  
**Card body:** The primary benefit survives correction, but the late-harm interval still overlaps the stopping boundary. A decision must weigh Type I and Type II errors, power, effect size, and patient cost. Stress the estimates in Statistics, price evidence in Regulatory, then precommit the safety rule upstairs. By the end of the mission, decide whether one final follow-up wave is justified.  
**Objective:** Choose between stopping now and one bounded follow-up.

### Worth knowing first - exact player copy
#### Glossary terms
Practical significance: whether an effect is large enough to matter in context.  
False-positive family rate: chance of at least one Type I error across a group of tests.  
Decision rule: a threshold and action written before new data arrive.

#### Primer concepts
- Confidence level up means margin of error up, holding n fixed.
- Power increases with n, alpha, effect size, and lower variability.
- Failure to reject is not evidence that the null is true.

#### Equations first needed today
No new equation is introduced; retrieve confidence intervals, power, expected value, and error rules from the mission log.

**Crew on this mission - mission log:** Tomas Reed — trial statistician; Lena Wu — regulatory and registry lead; Jonas Berg — safety monitoring chair.

## Main story happening - designer summary

**Three locations:** STAT S1 stress intervals; REG S2 VALUE buys evidence; BOARD S3-S4 computes power direction and precommits trigger. Waypoints follow the uncertainty result. Apparent victory becomes a final constrained problem. One bounded follow-up is authorized.

## Designer intent - not shown to player

Make uncertainty and asymmetric error costs produce a bounded action rather than a generic call for more data.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Statistics | `uncertainty-console` | automatic**

**World state:** Arrival: STAT entry; harm interval crosses the line; Tomas says, ;  - After S1: unconditional continuation darkens; waypoint TAKE LIVE UNCERTAINTY TO REGISTRY. - REG after S2: source calls and kit audit funded; waypoint CARRY EVIDENCE ORDER TO BOARD. - BOARD after S3/final: cloud narrows; trigger and 120-patient cap lock; binder 14 and outcome unlock.

**Panel/HUD text:** MISSION 14: STRESS THE BOUNDARY OPEN

**Dialogue bubbles -** Tomas Reed: "The center is not the whole interval"

**Unlocks/waypoint:** Unlock Stop 53 at `uncertainty-console` in Statistics.

**Beat 2 - After Stop 53 | `evidence-budget-desk` | automatic**

**World state:** The stress the boundary result remains visible while the buy decision-changing evidence fixture lights.

**Panel/HUD text:** STOP 53 RECORDED - STOP 54 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 53 result to settle buy decision-changing evidence."

**Unlocks/waypoint:** Unlock Stop 54 at `evidence-budget-desk` in Statistics.

**Beat 3 - After Stop 54 | `board-simulator` | automatic**

**World state:** The buy decision-changing evidence result remains visible while the predict power direction fixture lights.

**Panel/HUD text:** STOP 54 RECORDED - STOP 55 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 54 result to settle predict power direction."

**Unlocks/waypoint:** Unlock Stop 55 at `board-simulator` in Monitoring Board Room.

**Beat 4 - After Stop 55 | `trigger-rail` | automatic**

**World state:** The predict power direction result remains visible while the write the rule fixture lights.

**Panel/HUD text:** STOP 55 RECORDED - STOP 56 OPEN

**Dialogue bubbles -** Tomas Reed: "Use the Stop 55 result to settle write the rule."

**Unlocks/waypoint:** Unlock Stop 56 at `trigger-rail` in Monitoring Board Room.

**Beat 5 - At mission end | `uncertainty-console` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 14 EVIDENCE: RECORDED

**Dialogue bubbles -** Tomas Reed: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

STAT stresses estimates; REG owns finite staff budget and commitments; BOARD alone can authorize exposure.

## Characters and dramatic beat

Tomas emphasizes power, Lena precommitment, and Jonas safety cost. The player integrates their legitimate constraints.

## Key concepts, explained here

Confidence intervals express plausible parameter ranges. Power concerns detecting real effects. Value of information asks which evidence can change action. A trigger converts uncertainty into a bounded plan.


## Stop 53 - Stress the Boundary

**Format/placement:** STRESS, asked by Tomas Reed beside `uncertainty-console`.

**Metadata:** Concept: interval sensitivity/practical significance; Keystone: keystone CI; Area: Statistics & Analysis; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Tomas Reed, at the uncertainty console in Statistics.

**Stop reason - exact player copy:** The late-harm conclusion must survive reasonable missing-outcome assumptions.

**Question card story setup - exact player copy:** The primary benefit interval excludes zero, while late harm ranges from -1 to +5 events per 1,000. Move the missing-outcome assumption through its registered range and watch which actions remain defensible.

**Question card story-science connection - exact player copy:** Crossing a safety boundary under plausible assumptions blocks unconditional continuation.

**Question card prompt - exact player copy:** Move the missing-outcome assumption from -2 to +2 events per 1,000 in steps of 1 while holding the model fixed. Submit the action defensible throughout.

**Complete format-specific interaction block:** assumption -2 to +2 events/1000 step1; candidates stop now, continue unconditionally, bounded follow-up with trigger; only bounded follow-up remains across full range.

**Correct result:** The data support benefit, but harm uncertainty rules out unconditional continuation; a bounded follow-up can reduce uncertainty.

**Answer text:** The completed check shows the data support benefit, but harm uncertainty rules out unconditional continuation; a bounded follow-up can reduce uncertainty.

**Why:** Crossing a safety boundary under plausible assumptions blocks unconditional continuation.

**Wrong-path feedback:** Point estimate alone controls action

**State/output:** travel REG.

## Stop 54 - Buy Decision-Changing Evidence

**Format/placement:** VALUE, asked by Tomas Reed beside `evidence-budget-desk`.

**Metadata:** Concept: value of information; Keystone: keystone decision/inference; Area: Monitoring Board Room; Learning role: COMBINE; Difficulty: L5; Story role: character.

**Call - exact player copy:** Talk to Tomas Reed, at the evidence budget desk in Statistics.

**Stop reason - exact player copy:** Only one day of staff time remains, so evidence must be chosen by whether it could change action.

**Question card story setup - exact player copy:** The stress test leaves one uncertain harm boundary, while efficacy and file integrity are already locked. Spend a 60-hour budget on evidence that can narrow harm uncertainty without reopening settled analyses.

**Question card story-science connection - exact player copy:** More data are not automatically valuable; useful evidence must alter the stop-or-continue decision.

**Question card prompt - exact player copy:** Allocate at most 60 staff-hours among the five evidence options. Submit the combination that narrows harm uncertainty without reopening locked analyses.

**Complete format-specific interaction block:** `value:{budget:60,options:[{id:"source_calls",axis:"late-event outcome verification",cost:30,required:true},{id:"kit_audit",axis:"independent exposure verification",cost:20,required:true},{id:"efficacy_rerun",axis:"settled efficacy estimate",cost:25,required:false},{id:"staff_survey",axis:"workflow opinion",cost:15,required:false},{id:"biomarker",axis:"new exploratory mechanism",cost:25,required:false}],total_available_cost:115,correct_purchase:["source_calls","kit_audit"],reserve:10,answerText:"Buy source calls and the independent kit audit for 50 hours; only they can narrow the unresolved harm boundary."}`

**Correct result:** Fund source calls and the independent kit audit; they address the live harm boundary.

**Answer text:** The completed check shows fund source calls and the independent kit audit; they address the live harm boundary.

**Why:** More data are not automatically valuable; useful evidence must alter the stop-or-continue decision.

**Wrong-path feedback:** Any new data are valuable

**State/output:** evidence orders; travel BOARD.

## Stop 55 - Predict Power Direction

**Format/placement:** CLOUD, at `board-simulator`.

**Metadata:** Concept: power/sample size/effect/alpha/sigma; Keystone: keystone errors/power; Area: Randomisation & Blinding; Learning role: RETRIEVE; Difficulty: L3; Story role: decision evidence.

**Call - exact player copy:** Go to the board simulator, in Monitoring Board Room.

**Stop reason - exact player copy:** The board must know whether one follow-up wave can materially narrow uncertainty.

**Question card story setup - exact player copy:** The funded calls add observations and reduce missingness without changing alpha or the target effect. Narrow the sampling cloud by increasing n from 200 to 320 while holding effect and variability assumptions fixed.

**Question card story-science connection - exact player copy:** A narrower sampling distribution increases power and makes the final trigger informative.

**Question card prompt - exact player copy:** control n 200-320; fixed alpha=.025,effect=4/1000,sigma assumption; target corridor harm boundary; correct conclusion spread decreases, power increases, center unchanged.

**Complete format-specific interaction block:** `cloud:{settings:[{id:"n200",n:200,center:0.004,spread:0.0031,power:0.52},{id:"n240",n:240,center:0.004,spread:0.0028,power:0.60},{id:"n280",n:280,center:0.004,spread:0.0026,power:0.67},{id:"n320",n:320,center:0.004,spread:0.0024,power:0.73}],fixed:{alpha:0.025,effect:0.004,variance_assumption:"unchanged"},corridor:"harm boundary",correct_conclusion:"larger n narrows spread and raises power without moving center",answerText:"Increasing n from 200 to 320 narrows the sampling cloud and raises power; its expected center stays fixed."}`

**Correct result:** Increasing n narrows standard error and increases power; it does not move the expected center.

**Answer text:** The completed check shows increasing n narrows standard error and increases power; it does not move the expected center.

**Why:** A narrower sampling distribution increases power and makes the final trigger informative.

**Wrong-path feedback:** n setting and direction-of-change conclusion

**State/output:** S4.

## Stop 56 - Write the Rule

**Format/placement:** TRIGGER, at `trigger-rail`.

**Metadata:** Concept: integrated decision threshold; Keystone: keystone tests/errors; Area: Monitoring Board Room; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the trigger rail, in Monitoring Board Room.

**Stop reason - exact player copy:** The last follow-up cannot begin until its stop rule is fixed.

**Question card story setup - exact player copy:** The chosen evidence can improve power, but waiting exposes more patients. Commit the harm threshold and maximum enrollment before the new calls arrive, then map each possible result to stop, modify, or continue.

**Question card story-science connection - exact player copy:** Precommitment prevents a favored outcome from moving the safety boundary tomorrow.

**Question card prompt - exact player copy:** rule stop if upper 95% harm bound >=4/1000; modify if 2 to <4; continue if <2; max additional enrollment120; scale 0-6 anchors2,4; inclusive stop at4; objective preserve benefit, consequence limit 4 excess serious events/1000.

**Complete format-specific interaction block:** `trigger: {visible_prompt: "rule stop if upper 95% harm bound >=4/1000; modify if 2 to <4; continue if <2; max additional enrollment120; scale 0-6 anchors2,4; inclusive stop at4; objective preserve benefit, consequence limit 4 excess serious events/1000.", keyed_result: "Authorize one 120-patient follow-up under the written 2/4 thresholds; stop is inclusive at 4.", feedback: "numeric threshold pair, enrollment cap, action mapping", answerText: "Use the keyed result and explanation printed below."}`

**Correct result:** Authorize one 120-patient follow-up under the written 2/4 thresholds; stop is inclusive at 4.

**Answer text:** The completed check shows authorize one 120-patient follow-up under the written 2/4 thresholds; stop is inclusive at 4.

**Why:** Precommitment prevents a favored outcome from moving the safety boundary tomorrow.

**Wrong-path feedback:** numeric threshold pair, enrollment cap, action mapping

**State/output:** binder14; M15.

## Mission outcome

Mission decision: Allow one small follow-up group under the safety rule. The benefit data support more study. The harm range blocks a full restart. Only source calls and a separate kit check can change that choice.

### Post-mission metric screen - exact player copy

MISSION 14 COMPLETE; TIME {elapsed} / TARGET 17:00; INCORRECT SUBMISSIONS {incorrect_submissions}; One follow-up wave authorized; T-7; shared RP copy; QA 100/100/100/86 after 12 RP to Time.

## Quick concept review
- Statistical and practical significance both matter.
- Increasing n narrows spread and raises power.
- **Mission takeaway:** Buy evidence that can change the decision.

# Mission 15 - The Board Pack

**MISSION BRIEFING CARD - EXACT PLAYER COPY**
**Header:** DAY 15 - BOARD TODAY  
**Card title:** The Board Pack  
**Go now:** Go to Regulatory & Registry and meet Mara Voss, trial director, at the delivery board.  
**Card body:** The follow-up is complete, and every earlier result now feeds one board decision. The final claim must match the design, conditions, uncertainty, error rules, and patient stakes. Audit the pack in Regulatory, verify the source at Adjudication, then execute the rule upstairs. By the end of the mission, decide whether CLARION-3 stops, changes, or continues under safeguards.  
**Objective:** Sign and deliver the Monitoring Board Pack.

### Worth knowing first - exact player copy
#### Glossary terms
State-Plan-Do-Conclude: the four-part structure for a complete inference response.  
Context: naming the population, variable, units, and decision in statistical conclusions.  
Safeguard: a required action or threshold protecting patients during continuation.

#### Primer concepts
- Do not introduce new analyses in the finale.
- Carry earlier results forward even after an arithmetic error; the reasoning can still be assessed.
- Say fail to reject, never accept or prove the null.

#### Equations first needed today
No new equation is introduced; retrieve the complete formula and condition record.

**Crew on this mission - mission log:** Mara Voss — trial director; Jonas Berg — safety monitoring chair; Tomas Reed — trial statistician.

## Main story happening - designer summary

**Three locations:** REG S1 pack audit, ADJUD S2 source/scope verification, BOARD S3 integrated diagnosis and S4 signed decision. Waypoints are caused by missing source confirmation and then completed pack. All major characters contribute one constraint in short bubbles. The final follow-up yields benefit difference 4 units, 95% CI 1 to 7; excess-harm upper bound 1.8/1000, below the 2 continuation line. Campaign ends after payoff, with no further quiz.

## Designer intent - not shown to player

Require complete transfer: method selection, scope, threshold execution, and contextual argument. No new academic content appears.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Regulatory & Registry | `records-wall` | automatic**

**World state:** Arrival: REG entry; 14 binder slots lit; Mara says, ;  - After S1: method links illuminate; waypoint TAKE SOURCE CLAIMS TO ADJUDICATION. - ADJUD after S2: source/scope stamp appears; waypoint CARRY COMPLETE PACK TO MONITORING BOARD. - BOARD after S3: locked rule displays CONTINUE WITH SAFEGUARDS;  - Final/outcome: signatures appear, binder slot15 fills, doors open, BOARD PACK ACCEPTED; timer remains paused; metric victory screen unlocks.

**Panel/HUD text:** MISSION 15: RECONSTRUCT THE EVIDENCE CHAIN OPEN

**Dialogue bubbles -** Mara Voss: "Rebuild the chain before anyone signs"

**Unlocks/waypoint:** Unlock Stop 57 at `records-wall` in Regulatory & Registry.

**Beat 2 - After Stop 57 | `outcome-viewer` | automatic**

**World state:** The reconstruct the evidence chain result remains visible while the state the reach fixture lights.

**Panel/HUD text:** STOP 57 RECORDED - STOP 58 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 57 result to settle state the reach."

**Unlocks/waypoint:** Unlock Stop 58 at `outcome-viewer` in Endpoint Adjudication.

**Beat 3 - After Stop 58 | `board-console` | automatic**

**World state:** The state the reach result remains visible while the apply the trigger fixture lights.

**Panel/HUD text:** STOP 58 RECORDED - STOP 59 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 58 result to settle apply the trigger."

**Unlocks/waypoint:** Unlock Stop 59 at `board-console` in Monitoring Board Room.

**Beat 4 - After Stop 59 | `board-table` | automatic**

**World state:** The apply the trigger result remains visible while the sign the statistical argument fixture lights.

**Panel/HUD text:** STOP 59 RECORDED - STOP 60 OPEN

**Dialogue bubbles -** Mara Voss: "Use the Stop 59 result to settle sign the statistical argument."

**Unlocks/waypoint:** Unlock Stop 60 at `board-table` in Monitoring Board Room.

**Beat 5 - At mission end | `records-wall` | automatic**

**World state:** The completed decision changes the mission world and locks into the campaign record.

**Panel/HUD text:** MISSION 15 EVIDENCE: RECORDED

**Dialogue bubbles -** Mara Voss: "The mission decision is recorded. Carry it into the next briefing."

**Unlocks/waypoint:** Open the mission outcome and metric screen.

## Location plan

REG verifies the claim chain; ADJUD verifies the patient-source reach; BOARD owns the unblinded trigger and final authority.

## Characters and dramatic beat

Each major character contributes one constraint. Mara delegates the final decision to the evidence chain, completing her arc.

## Key concepts, explained here

Procedure choice follows variable type and design. Conditions justify reference distributions. Intervals estimate, tests compare, and decision rules translate uncertainty into action. Complete inference states parameters, plans a method, performs work, and concludes in context.

## Stop 57 - Reconstruct the Evidence Chain

**Format/placement:** CASEBOOK, at `records-wall`.

**Metadata:** Concept: cumulative matching; Keystone: all keystones; Area: Monitoring Board Room; Learning role: RETRIEVE; Difficulty: L4; Story role: payoff.

**Call - exact player copy:** Go to the records wall, in Regulatory & Registry.

**Stop reason - exact player copy:** A pack piece is useless if its result is attached to the wrong claim or design.

**Question card story setup - exact player copy:** Fourteen pieces now fill the delivery board, but four headline conclusions have lost their method labels. Match each conclusion to its study design, conditions, and correct statistical procedure before signing.

**Question card story-science connection - exact player copy:** The board can act only when every conclusion remains traceable to the data-generating process.

**Question card prompt - exact player copy:** Match each of four conclusions to its study design, required conditions, and correct procedure. Submit the complete evidence-chain mapping.

**Complete format-specific interaction block:** scenarios primary binary arm effect, paired recovery, site event distributions, dose-response quantitative trend; choices two-prop z, paired t, chi-square homogeneity, slope t; exact mapping.

**Correct result:** Match procedure to variable type and design; formulas do not determine scope by themselves.

**Answer text:** The completed check shows match procedure to variable type and design; formulas do not determine scope by themselves.

**Why:** The board can act only when every conclusion remains traceable to the data-generating process.

**Wrong-path feedback:** Formula alone chooses test

**State/output:** pack chain lights; travel ADJUD.

## Stop 58 - State the Reach

**Format/placement:** DIAGNOSIS, at `outcome-viewer`.

**Metadata:** Concept: causation/generalization/measurement; Keystone: design and scope; Area: Randomisation & Blinding; Learning role: TRANSFER; Difficulty: L5; Story role: payoff.

**Call - exact player copy:** Go to the outcome viewer, in Endpoint Adjudication.

**Stop reason - exact player copy:** The final claim must not reach beyond the patients or measurements the trial can support.

**Question card story setup - exact player copy:** The reconstructed chain shows random assignment, repaired but not population-random enrollment, verified endpoints, and bounded missingness. Choose the strongest treatment conclusion that every one of those design facts permits the board to state.

**Question card story-science connection - exact player copy:** A correct calculation can still produce an invalid claim if its population or causal reach is overstated.

**Question card prompt - exact player copy:** Use random assignment, nonrandom enrollment, partial rural repair, and verified endpoints. Submit one causal conclusion and one generalization limit.

**Complete format-specific interaction block:** readings random assignment pass, random population sample absent, rural repair partial, endpoint audit pass. Choices causation for trial-like patients with limited generalization; association only; universal causation; population generalization no cause. Answer first.

**Correct result:** Infer a causal treatment effect for patients like those enrolled, while limiting generalization to broader populations.

**Answer text:** The completed check shows infer a causal treatment effect for patients like those enrolled, while limiting generalization to broader populations.

**Why:** A correct calculation can still produce an invalid claim if its population or causal reach is overstated.

**Wrong-path feedback:** Random assignment implies universal generalization

**State/output:** source VERIFIED; travel BOARD.

## Stop 59 - Apply the Trigger

**Format/placement:** VERIFY, at `board-console`.

**Metadata:** Concept: integrated interval/trigger; Keystone: keystone CI/errors; Area: Monitoring Board Room; Learning role: TRANSFER; Difficulty: L5; Story role: climax.

**Call - exact player copy:** Go to the board console, in Monitoring Board Room.

**Stop reason - exact player copy:** The written safety rule, not preference, must control the board action.

**Question card story setup - exact player copy:** The final source calls yield an excess-harm 95% upper bound of 1.8 per 1,000, below the prewritten continuation line of 2.0. Verify the displayed calculation and apply the locked rule.

**Question card story-science connection - exact player copy:** Executing a rule after data appear proves that the trial's safeguards are operational rather than decorative.

**Question card prompt - exact player copy:** **CALCULATE AND COMMIT:** Use upper bound = estimate + 1.96(SE) with estimate 0.60 events/1,000 and SE 0.612 events/1,000; submit the upper bound in events/1,000 before the rule panel unlocks. **OPERATE:** Apply the locked safety rule with continuation below 2.0 and stop at or above 4.0. **MEASURE:** Record the panel upper bound and benefit-interval status. **INTERPRET:** Submit the required board action; no restoration is required.

**Complete format-specific interaction block:** `verify:{required_sequence:[calculate_and_commit,operate,measure,interpret],prediction:{equation:"upper bound=estimate+1.96(SE)",inputs:{estimate:0.60,SE:0.612,critical_value:1.96},submit:{quantity:"upper harm bound",unit:"events per 1,000 patients",truth:1.80,tolerance:0.01}},equipment_locked_until_prediction_commit:true,operation:{action:"apply locked safety rule",fixed:["continue below 2.0","modify from 2.0 to below 4.0","stop at or above 4.0"]},measurements:{upper_bound:1.80,unit:"events per 1,000 patients",benefit_interval:"excludes zero"},restore:{required:false,reason:"rule application changes no equipment setting"},correct_conclusion:"continue under safeguards",answerText:"The upper harm bound is 1.80 per 1,000, below 2.0, while benefit excludes zero; continue under safeguards."}`

**Correct result:** Predicted and measured upper bound 1.80 events per 1,000 patients, tolerance 0.01 event per 1,000; conclusion `continue under safeguards`.

**Answer text:** 0.6+1.96(.612)=1.80 per 1,000, below 2.0; benefit interval excludes zero, so continue under safeguards.

**Why:** Executing a rule after data appear proves that the trial's safeguards are operational rather than decorative.

**Wrong-path feedback:** predicted upper bound in events/1000, measured values, action conclusion

**State/output:** rule displays CONTINUE WITH SAFEGUARDS; S4.

## Stop 60 - Sign the Statistical Argument

**Format/placement:** SEQUENCE, at `board-table`.

**Metadata:** Concept: FRQ State-Plan-Do-Conclude; Keystone: all keystones; Area: Monitoring Board Room; Learning role: TRANSFER; Difficulty: L5; Story role: final decision.

**Call - exact player copy:** Go to the board table, in Monitoring Board Room.

**Stop reason - exact player copy:** The board needs one complete argument whose words, symbols, conditions, work, and conclusion agree.

**Question card story setup - exact player copy:** The trigger permits guarded continuation, but the signed record must show how that conclusion was earned. Order State, Plan, Do, and Conclude, preserving population names, units, conditions, calculations, and cautious language.

**Question card story-science connection - exact player copy:** A reproducible argument lets future monitors challenge any step without rewriting the result.

**Question card prompt - exact player copy:** cards: State parameters/hypotheses in words/symbols; Plan procedure/check conditions; Do formula/statistic/p-value or interval; Conclude compare p to alpha and interpret in context. Exact order. A prior guessed value may carry forward without double penalty.

**Correct result:** State, Plan, Do, Conclude. Use patient variables and units; never say accept H0, prove H0, or omit context.

**Answer text:** The completed check shows state, Plan, Do, Conclude. Use patient variables and units; never say accept H0, prove H0, or omit context.

**Why:** A reproducible argument lets future monitors challenge any step without rewriting the result.

**Wrong-path feedback:** Conclusion can omit context or say accept H0

**State/output:** signature applied; piece15; final payoff.

## Mission outcome and final payoff

Mission decision: Continue with safeguards. The harm bound is below the written line. The benefit range stays above zero. The board signs the full statistical case.

### Post-mission metric screen - exact player copy

MISSION 15 COMPLETE; TIME {elapsed} / TARGET 20:00; INCORRECT SUBMISSIONS {incorrect_submissions}; Board safeguards release reserve; T+2; shared RP copy; QA 100/100/100/100 after 12 RP to Time; lock Patient Safety and declare victory only if all bars and scientific thresholds pass.

## Quick concept review
- Match procedures to variable types, designs, and conditions.
- Put estimates, uncertainty, and error costs in context.
- Random assignment supports cause; sampling controls generalization.
- **Mission takeaway:** Use State-Plan-Do-Conclude for every inference argument.

---

# 9. Mission-at-a-glance production map

### Mission 1

**Main event:** The registered claims are recovered before the alert is promoted.  
**Locations:** Regulatory & Registry.  
**Core statistics:** variables, displays, SOCS, outlier rule, parameter versus statistic.  
**Ending change:** the safety pattern becomes monitoring evidence rather than a primary claim.

### Mission 2

**Main event:** Extreme recovery times pull the mean away from the median.  
**Locations:** Endpoint Adjudication.  
**Core statistics:** resistant summaries, z-scores, Normal model, display choice.  
**Ending change:** the endpoint procedure is rewritten to retain and review extremes.

### Mission 3

**Main event:** The two-site overlap greatly exceeds independence.  
**Locations:** Monitoring Board Room.  
**Core statistics:** addition, conditional probability, multiplication, independence.  
**Ending change:** two sites pause while the rest continue under enhanced monitoring.

### Mission 4

**Main event:** An unplanned early analysis is disclosed.  
**Locations:** Statistics & Analysis.  
**Core statistics:** expected value, combined random variables, binomial probability, error types.  
**Ending change:** a stricter prewritten threshold governs later inference.

### Mission 5

**Main event:** The fastest site is shown to under-cover rural patients.  
**Locations:** Monitors' Room; Data Management.  
**Core statistics:** SRS, stratification, bias mechanisms, scope of inference.  
**Ending change:** recruitment reopens and generalization narrows.

### Mission 6

**Main event:** The sampling amendment preserves causal assignment but costs time.  
**Locations:** Randomisation & Blinding; Statistics & Analysis.  
**Core statistics:** experiments, blocking, sampling distributions, geometric waiting time.  
**Ending change:** the corrected design is approved with an explicit precision target.

### Mission 7

**Main event:** Missing outcomes track travel distance and an influential fast-site record.  
**Locations:** Monitors' Room; Data Management.  
**Core statistics:** correlation, LSRL, residuals, leverage, influence.  
**Ending change:** complete-case analysis is rejected.

### Mission 8

**Main event:** A cold-room kit failure rate crosses its benchmark.  
**Locations:** Data Management; Endpoint Adjudication.  
**Core statistics:** inference conditions, one-proportion interval and test, sample size.  
**Ending change:** the exposed cohort is quarantined and independently checked.

### Mission 9

**Main event:** Unequal staff guesses do not overturn the intact physical blind.  
**Locations:** Randomisation & Blinding; Statistics & Analysis.  
**Core statistics:** two-proportion interval and test, pooling, scope, sensitivity.  
**Ending change:** allocation breach is rejected while the survey difference is reported.

### Mission 10

**Main event:** Correcting bias shrinks the apparent treatment benefit.  
**Locations:** Endpoint Adjudication; Statistics & Analysis.  
**Core statistics:** one-sample, paired, and independent two-sample t procedures.  
**Ending change:** the smaller diagnostically credible estimate replaces the headline.

### Mission 11

**Main event:** Matching reports are traced to one shared extraction.  
**Locations:** Data Management; Statistics & Analysis; Trial Master File.  
**Core statistics:** CLT, sampling spread, holdouts, dependence.  
**Ending change:** the independent rerun is sealed and Trial Integrity locks.

### Mission 12

**Main event:** Three categorical tables are separated into three distinct questions.  
**Locations:** Endpoint Adjudication; Monitors' Room; Monitoring Board Room.  
**Core statistics:** chi-square goodness-of-fit, independence, and homogeneity.  
**Ending change:** two significant findings receive separate responses.

### Mission 13

**Main event:** Multiplicity correction removes an attractive secondary headline.  
**Locations:** Statistics & Analysis; Regulatory & Registry; Monitoring Board Room.  
**Core statistics:** LINE, slope inference, one-tail conversion, familywise error.  
**Ending change:** only two registered secondary results survive and Evidence Strength locks.

### Mission 14

**Main event:** A harm interval crosses the boundary after apparent efficacy success.  
**Locations:** Statistics & Analysis; Regulatory & Registry; Monitoring Board Room.  
**Core statistics:** interval sensitivity, power, value of information, decision thresholds.  
**Ending change:** one bounded follow-up wave is authorized under a precommitted rule.

### Mission 15

**Main event:** The complete evidence chain is tested and signed.  
**Locations:** Trial Master File; Statistics & Analysis; Monitoring Board Room.  
**Core statistics:** cumulative procedure choice, scope, numerical verification, FRQ reasoning.  
**Ending change:** continuation is authorized only with enforceable safeguards.

### Production stop summary

| Mission | Stops: format - concept - role - difficulty - story role |
|---:|---|
| 1 | CHOICE variable/graph I L1 clue; SEQUENCE SOCS I L2 obstacle; BALLPARK outlier P L2 clue; ATTEST preregistration C L4 decision |
| 2 | BALLPARK center P L2 clue; DERIVE z-score I L2 obstacle; VERIFY Normal rule C L3 reversal; DIAGNOSIS summaries T L4 decision |
| 3 | DERIVE addition I L2 clue; BALLPARK conditional P L2 reveal; CONTROL independence C L3 reversal; DIAGNOSIS action T L5 decision |
| 4 | DERIVE expectation I L2 clue; DERIVE combined RV P L3 obstacle; TALLY binomial C L3 reversal; TRIGGER errors I L5 decision |
| 5 | PROTOCOL SRS I L2 obstacle; CHOICE stratification P L2 clue; PROBE bias C L3 reveal; DIAGNOSIS scope T L5 decision |
| 6 | SEQUENCE experiment I L2 obstacle; CHOICE block/pair P L3 character; DERIVE sampling dist C L3 reveal; BALLPARK geometric R L3 decision |
| 7 | CHOICE scatter R L2 clue; DERIVE LSRL I L3 obstacle; RESIDUAL diagnostics P L3 reveal; CONTROL influence C L4 decision |
| 8 | PROTOCOL conditions I L2 obstacle; DERIVE 1-prop CI I L3 reveal; DERIVE 1-prop test C L3 evidence; BALLPARK sample size T L4 decision |
| 9 | TRACE blind R L3 character; DERIVE 2-prop CI I L3 reveal; DERIVE 2-prop test C L4 reversal; STRESS scope T L5 decision |
| 10 | DERIVE 1-sample t I L3 obstacle; DERIVE paired t P L3 reveal; DERIVE 2-sample t C L4 evidence; RESIDUAL adjustment T L5 decision |
| 11 | DERIVE CLT R L3 clue; HOLDOUT validation C L4 reveal; TRACE dependence T L4 twist; ATTEST lock T L5 decision |
| 12 | DERIVE GOF I L3 clue; PROTOCOL designs P L3 obstacle; DERIVE independence C L4 reveal; DIAGNOSIS homogeneity T L5 decision |
| 13 | RESIDUAL LINE R L3 obstacle; DERIVE slope C L4 reveal; ATTEST family R L4 clue; TRIGGER correction T L5 decision |
| 14 | STRESS boundary R L4 obstacle; VALUE evidence C L5 character; CLOUD power R L3 evidence; TRIGGER rule T L5 decision |
| 15 | CASEBOOK chain R L4 payoff; DIAGNOSIS scope T L5 payoff; VERIFY trigger T L5 climax; SEQUENCE FRQ T L5 final |

# 10. Stop manifest

The summary above records format, concept, learning role, difficulty, and story role for all 60 globally numbered stops. No format exceeds one third of the campaign; DERIVE appears 17 times because students must build authentic probability, regression, sampling-distribution, interval, and test-statistic reasoning.

## Retrieval, misconception, feedback, and payoff ledger

The detailed stop is the source for exact placement, concept, keystone, prerequisites, role, difficulty, story role, briefing decision, reason, setup, connection, action, visible data, payload, key/tolerance, answer text, mechanism, and state. This ledger supplies the remaining explicit retrieval and later-payoff fields for every stop.

| Stop | Earlier concept retrieved | Likely misconception and retry feedback | Later payoff / unlock |
|---|---|---|---|
| M1S1 | none | Numeric category codes are quantitative; ask whether differences support arithmetic | honest primary display; M9/M12 |
| M1S2 | M1S1 variable type | List values without comparisons; require SOCS in patient context | summary choice in M2 |
| M1S3 | M1S2 skew | Flag means delete; require retain-and-review | extreme-record audit M2/M7 |
| M1S4 | parameter/statistic | Timestamp proves truth; separate timing from condition | unplanned-look audit M4/M13 |
| M2S1 | M1S2-S3 | Mean is always typical; compare movement of mean and median | adjusted headline M10 |
| M2S2 | quantitative center/spread | z keeps original units; cancel hour units explicitly | Normal verification |
| M2S3 | z=2 | Empirical rule applies to all data; compare observed coverage | robust procedure |
| M2S4 | M1 outliers, M2 summaries | Delete extremes or force Normality; retain sources | pack procedure; M10 |
| M3S1 | categorical overlap | Add percentages without removing overlap | unique warning rate |
| M3S2 | intersection from S1 | Use whole cohort denominator; highlight conditioning group | handling hypothesis M8 |
| M3S3 | multiplication rule | Association proves cause; state only non-independence | targeted pause |
| M3S4 | S1-S3 chain | Global stop is safest; compare 29 quiet sites | early-look clue M4 |
| M4S1 | probability weights | Average possible values equally | staffing workload |
| M4S2 | expectation | Add SDs; add variances then square-root | safe queue sizing |
| M4S3 | complement | np is event probability; calculate none first | error-cost rule |
| M4S4 | M1 preregistration | Fail to reject accepts H0; require cautious language | multiplicity M13 |
| M5S1 | population/sample | Random means arbitrary; require seed/range/repeats | reproducible audit |
| M5S2 | SRS | Cluster and stratified are interchangeable; state selected unit | rural roster |
| M5S3 | sampling pipeline | All absence is nonresponse; locate pre-frame loss | biased scope |
| M5S4 | random assignment | Randomized trial automatically generalizes | amendment M6 |
| M6S1 | M5 scope | Randomize before blocking; order similar groups first | valid amendment |
| M6S2 | blocking | Any similarity creates matched pairs | correct data structure M10 |
| M6S3 | parameter/statistic | Larger n changes center; show center and spread separately | sample-size work M8 |
| M6S4 | binomial/geometric | Use np when n is not fixed; identify stopping rule | calendar cost |
| M7S1 | M5 undercoverage | Correlation proves travel causes delay | regression model |
| M7S2 | scatterplot | Intercept always meaningful; inspect x=0 range | residual audit |
| M7S3 | residual definition | Lowest RMS always wins; reject structured error | influence test |
| M7S4 | outlier rule | Large residual equals influential; measure slope change | adjustment M10 |
| M8S1 | M6 independence | Formula works without conditions; match evidence | interval unlock |
| M8S2 | sampling SE | Use p0 in interval SE; use sample p-hat | test benchmark |
| M8S3 | p-value rule | p is probability H0 is true; restate conditional meaning | quarantine |
| M8S4 | margin of error | Round minimum n down; always round up | release audit |
| M9S1 | M8 handling | Matching displays are independent checks | survey interpretation |
| M9S2 | one-prop CI | Pool CI proportions; retain separate arms | equality test |
| M9S3 | test SE | Never pool or always pool; pool only null test | limited claim |
| M9S4 | design scope | Difference proves broken concealment | exoneration/M10 |
| M10S1 | mean/Normal conditions | Use z because n is numerical; sigma is unknown so use t | paired comparison |
| M10S2 | matched design | Treat paired records as independent groups | interval excludes zero |
| M10S3 | S2 structure | Pool sample variances; use Welch/unpooled SE | adjusted effect |
| M10S4 | M7 residuals | Largest effect is best model; require valid diagnostics | final table M11 |
| M11S1 | M6 sampling distribution | Data distribution equals sampling distribution | corruption corridor |
| M11S2 | model spread | Tune on holdout; freeze before reveal | independent hash |
| M11S3 | M9 independence | Exact agreement proves confirmation | master-file choice |
| M11S4 | M1 attestation | Copied reports provide three proofs | Integrity lock |
| M12S1 | categorical variables | GOF compares two variables | correct table label |
| M12S2 | M5 study design | Test chosen by table shape alone | independence test |
| M12S3 | expected counts | Expected equals observed proportion; derive under null | arm association |
| M12S4 | S1-S3 | One significant table explains all tables | three-team response |
| M13S1 | M7 diagnostics | Small p repairs a bad model | valid slope output |
| M13S2 | LSRL | Reported two-tail p works for one-tail unchanged | registered slope claim |
| M13S3 | M1/M4 registry | Count only significant tests | family size ten |
| M13S4 | complement/power | Correction erases effects; it changes thresholds | Evidence lock |
| M14S1 | intervals | Point estimate alone controls action | bounded follow-up |
| M14S2 | uncertainty | Any new data are valuable | focused evidence order |
| M14S3 | M6 spread | Larger n moves expected center | informative trigger |
| M14S4 | M4 precommitment | Choose threshold after update | final rule M15 |
| M15S1 | all procedures | Formula alone chooses test | traceable pack |
| M15S2 | M5/M9 scope | Random assignment implies universal generalization | lawful final claim |
| M15S3 | M14 trigger | Reinterpret locked line after result | continue with safeguards |
| M15S4 | inference sequence | Conclusion can omit context or say accept H0 | signed pack and final payoff |

---

# 11. Narrative implementation notes

## Environmental state changes

- M1: the commitment terminal separates PRIMARY, SAFETY MONITORING, and EXPLORATORY tabs; binder piece 1 appears.
- M2: the recovery display changes from a single average to median, spread, and flagged source records.
- M3: two site tiles become `PAUSED`; 29 others remain `ENHANCED MONITORING`.
- M4: the early folder receives a persistent `DISCLOSED` stamp and a stricter threshold appears on the board rail.
- M5: the fast-site banner changes from `FASTEST` to `NARROW SAMPLE`; rural-frame gaps remain visible.
- M6: the amended allocation rail locks blocking and randomization order; the added screening burden appears on the calendar.
- M7: the query map changes to `DISTANCE-LINKED`; the fast-site point remains marked influential.
- M8: the cold-room cohort and kit lot gain quarantine tags with text and icons.
- M9: the sealed-box path displays `BLIND INTACT`; the guessing difference remains logged separately.
- M10: the old benefit headline dims and the adjusted four-unit estimate occupies the pack slot.
- M11: shared report lines turn amber; the independently rerun archive becomes `READ ONLY / LOCKED`.
- M12: the categorical wall permanently labels the tables `DISTRIBUTION`, `ASSOCIATION`, and `SITE DIFFERENCE`.
- M13: the ten-test family and .005 threshold remain visible; disallowed headlines move to `EXPLORATORY`.
- M14: the final 120-patient cap and harm boundaries lock before the update arrives.
- M15: the board console accepts a signature only after the numerical trigger and all four metrics settle at 100%.

## Dialogue state

Wrong answers do not branch the evidence sequence. Optional greetings react to demonstrated evidence: Eli adopts “Who is missing?” after M5; Priya distinguishes survey differences from allocation exposure after M9; Mara requires independent provenance after M11; Tomas names effect size and uncertainty before significance after M13. Jonas never treats a p-value alone as a patient-safety action.

## Mission endings

Every mission ending provides 45-90 seconds of non-quiz play: a panel changes, a roster prints, a site pauses, a sample or hash is carried, a threshold locks, or a character responds to player-produced evidence. Outcome cards show `WHAT CHANGED` and `STATISTICS YOU CAN NOW USE`, then return control to the world. The board decision and epilogue begin immediately after Stop 60; no educational gate follows.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every numerical key from the values displayed on that stop; tolerance may absorb rounding, never a different method.
- Match procedure to design before calculation: random sampling controls generalization, random assignment controls causal scope, and pairing is preserved.
- Use pooled proportions only for the two-proportion null test, never for the confidence interval.
- Use unpooled/Welch two-sample t logic, the right tail for chi-square, and `df=n-2` for slope inference.
- State hypotheses about population parameters; compare p with alpha; never “accept” or “prove” a null hypothesis.
- Interpret intervals, slopes, residuals, and effects in patient context with units.

### Numerical visibility manifest - mandatory player-visible shipping data

This table is normative. During schema conversion, its data must appear on the question card before Commit; a hidden payload does not satisfy the gate. "Selection" rows still show every numerical boundary used by the choice.

| Stop | Player-visible inputs, constant, and equation | Required submission type and unit |
|---|---|---|
| M1S3 | Q1=10 days, Q3=18 days, candidate=34 days; IQR=Q3-Q1; upper=Q3+1.5IQR | number in days, then flag selection |
| M2S1 | recovery days 4,5,5,6,20; mean=sum/5; median=middle ordered value | pair: mean days, median days |
| M2S2 | x=84 h, mean=70 h, SD=7 h; z=(x-mean)/SD | unitless z number |
| M2S3 | mean=70 h, SD=7 h, limits 56/84 h; 68-95-99.7 rule | predicted percent, then fit conclusion |
| M3S1 | P(A)=.08, P(B)=.05, P(A and B)=.02; union=sum-intersection | probability or percent |
| M3S2 | joint=.02, conditioning event=.05; P(A given B)=joint/P(B) | conditional probability or percent |
| M3S3 | marginals .08/.05, observed overlap 2.0%; independent overlap=product | predicted percent, readings, conclusion |
| M4S1 | x=0,1,2 reports with P=.70,.25,.05; E(X)=sum xP(x) | reports per site-day |
| M4S2 | means 10/8 reports, SDs 3/4 reports; means add, variances add, SD=square root | pair: total mean and SD in reports |
| M4S3 | n=20, p=.04; P(at least one)=1-(1-p)^n; simulations=500 | predicted percent and plausibility conclusion |
| M4S4 | alpha family allowance and disclosed extra look; registered adjusted threshold .025 inclusive; update p=.031 | threshold number, error mapping, decision |
| M6S3 | p=.50, n=400, eligible population>4000; mean(p-hat)=p; SD=sqrt[p(1-p)/n] | pair of unitless proportions |
| M6S4 | p=.20 per screened candidate; geometric mean=1/p | candidates screened |
| M7S2 | r=.80, x-bar=50 km, sx=20 km, y-bar=6 days, sy=4 days; b=r sy/sx; a=y-bar-bx-bar | pair: b in day/km, a in days |
| M7S4 | baseline .16 day/km, refit .10 day/km, noise .005 day/km | three readings in day/km and conclusion pair |
| M8S2 | x=30, n=200, p-hat=.15, z-star=1.960; interval formula shown | endpoint pair in proportions or percent |
| M8S3 | p-hat=.15, p0=.10, n=200, alpha=.05; z-test equation shown | z, p-value, reject/fail conclusion |
| M8S4 | z-star=1.960, conservative p-star=.50, ME=.03; n=z-star^2 p(1-p)/ME^2 | minimum whole kits |
| M9S2 | x1=30,n1=200,x2=16,n2=200,z-star=1.960; unpooled two-proportion CI equation | endpoint pair in proportions/percentage points |
| M9S3 | x totals 46/400, p1=.15,p2=.08; pooled-null z equation; alpha=.05 | pooled p, z, p-value, decision |
| M10S1 | n=25,x-bar=72 score units,s=10,mu0=68; t equation, df=n-1, alpha=.05 | t, df, p-value, conclusion |
| M10S2 | n=16, after-before mean=-3 days,s=4,t-star=2.131; paired t and CI equations | t and interval endpoints in days |
| M10S3 | n1=30,mean1=72,s1=8;n2=28,mean2=68,s2=7; unpooled t equation | t and difference in score units |
| M11S1 | mu=70 units,sigma=12 units,n=36; mean(x-bar)=mu, SD=sigma/sqrt n | center/spread pair in units |
| M12S1 | O=50,30,20; E=40,40,20; chi-square=sum(O-E)^2/E; df=k-1 | chi-square, df, p-value conclusion |
| M12S3 | observed 30/170 and 16/184; grand=400; E=row total x column total/grand; chi-square equation | expected counts, chi-square, df, conclusion |
| M13S2 | b=-.80 day/dose,SE=.25 day/dose,n=30,t-star=2.048,t=b/SE,df=n-2,CI equation,two-tail p=.0034 | t, df, slope-CI endpoint pair in day/dose, one-tail p |
| M13S4 | ten tests, family alpha=.05; 1-.95^10 and .05/10; ten displayed p-values | family-risk percent, threshold, survivor selection |
| M14S3 | n control 200 to 320 patients; alpha=.025,effect=4 events/1000,variability fixed; SE proportional to 1/sqrt n | n setting and direction-of-change conclusion |
| M14S4 | continuation boundary 2, stop boundary 4 events/1000, maximum n=120; inclusive stop at 4 | numeric threshold pair, enrollment cap, action mapping |
| M15S3 | estimate=.600 event/1000,SE=.612 event/1000,z-star=1.960; upper=estimate+z-star(SE); benefit CI 1 to 7 units | predicted upper bound in events/1000, measured values, action conclusion |

## Format checks

### Action-clarity and format-payload shipping gates

1. **PROBE gate:** every station must name the reading collected and its expected comparison; any required dataset/load action must precede probing; the conclusion remains locked until all stations are read.
2. **CHOICE gate:** exactly four distinct, unslashed choice labels; one keyed answer; one specific mechanism rebuttal for each of the three wrong labels. Generic "rebuttals explain" copy fails.
3. **Multi-phase gate:** whenever all phases occur, visible copy must show CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET in that order. Equipment remains locked until commitment.
4. **VERIFY gate:** a numerical prediction, answer unit, tolerance, and explicit Commit gate must precede equipment unlock; then name operation, fixed values, measured readings, and final conclusion.
5. **CONTROL gate:** name the changed variable, every fixed variable, when each reading is taken, whether restoration is required, the restored remeasurement, and the submitted conclusion.
6. **DEGENERACY gate:** if introduced later, name both controls, each min/max/step, both loci and physical constraint, positive tolerance, numeric truth pair, and require the player to submit that pair before any plan choice. This campaign currently has zero DEGENERACY stops.
7. **Numerical-card gate:** before Commit, show every input, constant, unit, governing equation, requested answer unit, response type, and implementation tolerance. Worked answer arithmetic must reproduce the key from those same values.
8. **Canonical-payload gate:** validate every block against QUESTION_TYPES(3).md and then the current importer. A prose description or generic options list cannot replace a format block.

### QA counts and violations repaired in this pass

| Check | Inspected | Violations fixed | Post-pass status |
|---|---:|---:|---|
| PROBE | 1 | 1 | five observed readings, five expected comparisons, explicit LOAD, ordered probe, locked conclusion |
| CHOICE | 4 | 4 | exactly four distinct items and three labeled, specific wrong-answer rebuttals per stop |
| VERIFY | 2 | 2 | numerical commitment explicitly gates equipment; full four-phase order and fixed/read values stated |
| CONTROL | 2 | 2 | control/fixed variables, settled-reading timing, restore/remeasure, and conclusion are explicit |
| DEGENERACY | 0 | 0 | not used; future-use gate recorded |
| Numerical interactions/settings | 31 | 31 visibility records normalized | manifest supplies inputs, constants, units, equations, answer units, and response types |
| Two-sentence story setups | 60 | 0 remaining | all 60 are 30-45 words in source markdown |
| Mission A-K contracts | 15 | 0 remaining | all 15 contain A through K in order |

Four stops contain all four stages and now print them in order: M2S3 VERIFY, M3S3 CONTROL, M4S3 TALLY, and M15S3 VERIFY. M7S4 CONTROL begins with a required baseline measurement and has no prediction calculation; it explicitly orders baseline measure -> operate -> measure -> restore and remeasure -> interpret. M5S3 PROBE explicitly orders load -> probe every station -> compare -> conclude.

**Importer status:** unavailable. The content has been audited against QUESTION_TYPES(3).md, but schema acceptance, traps, and live-panel behavior remain unresolved shipping gates rather than claimed successes.

### Format-payload audit against QUESTION_TYPES(3).md

| Canonical format | Count | Authored payload check | Status before importer |
|---|---:|---|---|
| DERIVE | 17 | ordered expression lines, licenses, keyed line/result, decoy or wrong-path mechanism | content-complete |
| BALLPARK | 5 | visible values, equation/template, slots or requested outputs, target/correct, tolerance | content-complete |
| DIAGNOSIS | 5 | headline, at least three mixed quiet/alarm readings, competing mechanisms, one key | content-complete |
| CHOICE | 4 | exactly four distinct labels, one exact key, three label-specific rebuttals | repaired; content-complete |
| SEQUENCE | 3 | unique cards and exact order; axis where needed | content-complete |
| ATTEST | 3 | at least four claims, backed status, numeric limit, critical unbacked claim, key | content-complete |
| TRIGGER | 3 | decision rule, numeric scale, at most four anchors, objective, direction, consequence, key | content-complete |
| PROTOCOL | 3 | scenarios, distinct responses, complete permutation mapping | content-complete |
| RESIDUAL | 3 | labeled candidate residual fields, diagnostics, correct field/action | content-complete |
| VERIFY | 2 | prediction/tolerance, locked commitment, operation, measurement, interpretation | repaired; content-complete |
| CONTROL | 2 | at least three candidate controls, numeric baseline/response/noise, restore and conclusion | repaired; content-complete |
| TRACE | 2 | at least four channels, shared upstream resource, dependent targets, independent channel | content-complete |
| STRESS | 2 | named assumption, numeric range/step, candidates and survivor | content-complete |
| TALLY | 1 | bin definitions, fixed run count, accumulated observations, prediction and conclusion | content-complete |
| PROBE | 1 | loaded comparison, five station readings/expectations, keyed break and conclusion | repaired; content-complete |
| HOLDOUT | 1 | candidate rules, training values, freeze gate, unseen values, keyed survivor | content-complete |
| VALUE | 1 | positive budget, five costed axes, required items, total cost above budget, key | content-complete |
| CLOUD | 1 | named control/range, fixed quantities, response corridor, keyed conclusion | content-complete |
| CASEBOOK | 1 | four evidence scenarios, four method labels, permutation mapping | content-complete |

“Content-complete” means every semantic field demanded by the supplied format document is authored. It does not mean the unavailable repository importer has accepted exact field names.

## Learning and coverage audit

- All cheat-sheet topics are mapped in Section 5 and instantiated in the named stop.
- No inferential procedure appears before sampling distributions and conditions in M6.
- Twelve keystones recur across separated missions, include delayed retrieval, and contribute to combine/transfer decisions.
- DERIVE appears 17 times where students genuinely construct formulas, test statistics, expected values, regression lines, intervals, or logical inference chains. It is not used for mere recognition.
- The finale introduces no new statistical concept.

## Story and clue audit

- The human risk is clear in the five-sentence opening.
- Three major turns are supported: M4 unplanned look, M9 handling-not-allocation reversal, and M13 multiplicity correction; M14 adds the final complication after apparent victory.
- Every clue remains objectively true after reinterpretation.
- Each named character owns a legitimate constraint and changes behavior because of player-produced evidence.

## Briefing, throughline, and action-clarity audit

- Each briefing has four sentences, 30-70 words, and its fourth begins "By the end of the mission."
- Every outcome begins "Mission decision:" and answers that exact promise.
- Every stop setup is two sentences and targets 30-45 words; automated word-count verification remains an implementation gate after schema conversion.
- Stop n+1 explicitly consumes the prior result; final stops make the promised decision.
- Numerical prompts expose inputs, formulas, units, requested output, correct values, and tolerances.
- VERIFY in M2 and M15 follows CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET, with later phases locked.
- CONTROL in M3 and M7 names the changed control, fixed quantities, measurement time, restoration, second measurement, and submitted conclusion.
- No DEGENERACY is used; no incomplete two-control payload exists.
- Expected response type is explicit: number, pair, ordered sequence, selection, allocation, or conclusion.

## Location and dialogue audit

- M1-M4 use one functional location; M5-M10 use two; M11-M15 use three.
- Every travel transition is caused by a sample, hash, model, registry list, or decision available only at the destination.
- No sightseeing, greeting checklist, or pre-day race exists.
- First mission mention always gives name and working role in the briefing or beat.
- Essential information uses text/panel state and never depends on sound, color, cinema, or animation.

## Format and payload audit

- Only canonical supported formats are used; STACK and world-graded filler formats are absent.
- One typed interaction appears per lesson.
- Decisions are asked at people, calculations at desks/rooms, and operated tasks at fixtures.
- Every nonplain payload supplies its named collections, truth key, readings/range/budget, and answerText-equivalent.
- CHOICE includes four choices and rebuttals; DIAGNOSIS includes quiet and alarm readings; ATTEST has backed/unbacked critical claims; TRACE contains dependent and independent channels; VALUE costs exceed budget and includes required options; CONTROL has three controls, numeric baseline/response/noise, and restoration; TRIGGER has rule/scale/anchors/objective/direction/consequence.
- Repository import, trap, reachability, and right-first/wrong-first play tests remain required because the repository schema was not supplied with these source documents.

## Metric-economy checks

- Exactly four player-facing bars exist and remain bounded from 0% to 100%.
- Every mission uses its authored timer target and pauses only during non-player-controlled states.
- RP uses `clamp(4, 12, 11 + time_modifier - incorrect_submissions)` and replay grants only improvement over the prior award.
- Every negative metric delta is attached to the named story event in the canonical allocation ledger.
- Trial Integrity locks after Mission 11 and Evidence Strength after Mission 13; final safeguards lock Patient Safety.
- The canonical right-first path reaches 100 / 100 / 100 / 100 before the board authorization.
- Stop 60 cannot set the continuation authorization until final metric settlement completes.

## Tone and accessibility checks

- All keyed arithmetic was independently recalculated; units, formula, key, tolerance, and worked explanation agree.
- Threshold inclusivity is stated in M4, M13, and M14.
- Wrong paths identify the failed mechanism and permit retry.
- Glossary terms use one-line Term: definition form; equation primers include only equation, purpose, symbols, and campaign reason.
- Closing copy uses short sentences and should be run through the project's grade-level checker after import; target is grade 6.5 or below.
- Color always has text/icon redundancy; dialogue and conclusions enter the mission log.

## Genuine implementation gaps

1. The game repository, exact importer field names, readability script, and theme data were not provided. The structured payloads therefore cannot honestly be claimed to have passed import, reachability, trap, or browser-drive validation.
2. Numerical p-values assume standard calculator output and are keyed above; the shipped calculator must reproduce them to the stated tolerance.
3. The three-floor world and named fixtures come from the supplied place file; their runtime IDs should be checked against the current theme before conversion.
4. Automated checks should confirm every setup's final tokenization stays within 30-45 words after engine interpolation and every outcome remains at or below grade 6.5.

---

# 13. Suggested YAML assembly order for Claude Code

1. Preserve current theme, area IDs, fixture IDs, and roster asset IDs where they match this world plan.
2. Normalize the speaking cast to the seven canonical roles; keep any extra NPCs ambient and nonessential.
3. Replace or reorder the mission list into 15 missions and 60 globally numbered lessons.
4. Implement CHOICE, BALLPARK, SEQUENCE, PROTOCOL, CASEBOOK, DIAGNOSIS, and DERIVE first and verify answer/feedback parity.
5. Implement operated panels in mission order, preserving prediction locks, required readings, restoration, and conclusion gates.
6. Add `takesAsRead`, evidence flags, conditional dialogue, mission-log entries, and persistent environment changes.
7. Run the current importer with its verification flag; fix schema failures without changing the authored statistical intent.
8. Run format traps, reachability, numerical-key, glossary, grade-level, mission-card, metric, and world-parity suites.
9. Play all 15 missions once right-first and once wrong-first.
10. Confirm that the final board epilogue begins immediately after Stop 60 and that no question UI remains.

## Recommended content object shape

Use the repository's exact schema; this is a semantic checklist, not a replacement schema:

```yaml
- group: STAT
  task: player-facing action
  title: short dramatic title
  at: exact-fixture-id
  reason: exact player-facing reason this task is needed now
  concept: narrow AP Statistics concept
  keystone: broader recurring concept
  learningRole: INTRODUCE | PRACTICE | RETRIEVE | COMBINE | TRANSFER
  takesAsRead: [earlier concept labels]
  scene: exactly two short sentences, 30-45 words total
  storyScienceConnection: one clear sentence
  format: CANONICAL_FORMAT
  question: exact player prompt including response type and units
  # complete canonical format-specific interaction block here
  answerText: exact result shown after grading
  why: mechanism explanation
  wrongPathFeedback: actionable correction and retry
```

Do not author question-card `guide`, `background`, or `takeaway` fields. For CHOICE, emit four separate choice objects rather than one slash-separated string. For PROBE, emit `reading` and `expected` on every station. For VERIFY, CONTROL, and any other operated format, preserve the visible ordered phases and lock state described in the stop.

# 14. Final handoff checklist

- [ ] 15 missions and 60 globally numbered graded stops import in order.
- [ ] Every mission contains briefing, compact glossary, primer, equation support, designer story, beat script, route, character beat, key concepts, four full stops, outcome, metric screen, and review.
- [ ] Missions 1-4 use one meaningful location; Missions 5-10 use two; Missions 11-15 use three.
- [ ] Seven canonical characters retain distinct wants, blind spots, domains, and verbal habits.
- [ ] The two-site signal, blinding reversal, multiplicity reversal, and final harm uncertainty have planted evidence and visible payoffs.
- [ ] All AP Statistics cheat-sheet topics map to an authored stop and later retrieval.
- [ ] Exactly 17 DERIVE stops build authentic multi-line statistical reasoning rather than simple recognition.
- [ ] Every CHOICE has four distinct items, a verbatim key, and three option-specific rebuttals.
- [ ] Every PROBE station has its own observed `reading` and explicit `expected` value.
- [ ] VERIFY commits the numerical prediction before operation unlocks; CONTROL names changed/fixed variables, timing, restoration, remeasurement, and conclusion.
- [ ] Every numerical card exposes inputs, constants, equations, units, requested response type, keyed result, and tolerance.
- [ ] All 60 two-sentence setups remain 30-45 words after schema interpolation.
- [ ] All outcome cards begin `Mission decision:`; character reaction precedes the system-owned card.
- [ ] The canonical QA path reaches 100 / 100 / 100 / 100 before the final authorization.
- [ ] Importer, traps, reachability, wrong-first, and right-first playthroughs pass with no missing interaction block.
- [ ] The post-Stop-60 board decision and epilogue contain no further quiz.

**Canonical ending line:** "You did not make the decision for the board. You made every claim earn its place in the room."
