**FIRST PERSON LEARNING**

**ELEVEN DAYS**

Planetary Defense + Introductory Astronomy Campaign Implementation Bible

**15 missions | 60 graded stops | Cerro Alto Range | Implementation-ready**

**REVISION 2.4 - EXPLICIT AREAS, FIXTURES, CALLS, TRIGGERS, AND FEEDBACK**

## AP-Level Planetary Defense and Introductory Astronomy Campaign Implementation Bible

**Project:** First Person Learning

**World:** Cerro Alto planetary-defense range

**Player role:** Newly assigned Planetary Defense Analyst

**Campaign size:** 15 missions, 60 graded stops, 1 final protective-action commitment

**Audience:** AP-level high-school astronomy and introductory college astronomy students

**Primary implementation target:** Current campaign YAML plus existing Cerro Alto theme assets

**Status:** Buildable implementation specification; all 60 stops carry player copy, grading truth, answer text, feedback, and interaction data

> *The design test: if the astronomy is removed, the hazard cannot be understood or managed. If the story is removed, the student still completes a cumulative astronomy review in which early observations become tools for later decisions.*

## 1. One-page implementation brief

A fictional asteroid, **2026 PDC**, has been discovered only eleven days before a possible Earth impact. The first orbit solutions place nine million people somewhere inside the broad impact corridor, but the range does not yet know the object's true size, structure, exact path, or whether a last-minute space intervention is physically possible. The player becomes the only analyst authorized to move evidence among discovery, orbit, characterization, radar, consequences, and emergency-response teams.

This is not a campaign about blowing up an asteroid. Eleven days is too little warning for a believable kinetic deflection of a large object. The campaign's central scientific and moral argument is that planetary defense includes finding the object, measuring honestly, narrowing uncertainty, rejecting impossible options, committing response thresholds before panic changes them, and protecting the people who are actually at risk.

Implementation is linear at the evidence level. Wrong answers teach, retry, and permit progress rather than creating a broken campaign branch. Player performance changes the four campaign bars, Recovery Point flexibility, and selected dialogue acknowledgements, but every student reaches the same three evidence-based reversals.

### Non-negotiable engine rules

- Import with the target repository's current book importer and verification flag.
- Every lesson carries exactly one canonical format supported by the current normalizer.
- Do not use suspended STACK.
- Decision formats belong at people, calculation formats at rooms or boards, and operated formats at the controlled fixture.
- Every question setup is exactly two sentences totaling 30–45 words; teaching belongs in the connection, answer text, Why, and wrong-path feedback.
- Every PROBE station authors its own observed `reading`, explicit station-specific `expected` value, and useful `load` or comparison text. A general range or pattern never substitutes for those station records.
- Every CHOICE authors exactly four distinct list items, one answer matching a listed choice verbatim, and one specific rebuttal for each of the three wrong choices. Never encode alternatives as slash-separated prose.
- Multi-phase questions state the required player actions in interface order. Calculation-plus-experiment questions use **CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET**.
- Numerical questions display every input, constant, equation, unit, requested answer unit, and submission type in player-facing copy.
- VERIFY requires a committed prediction before the relevant equipment or evidence unlocks.
- CONTROL names the changed variable, fixed variables, measurement timing, and whether restoration is required.
- DEGENERACY names both numerical controls and requires submission of the numerical parameter pair.
- Every prompt or adjacent expected-submission line identifies whether the player submits a number, setting, pair, plan, allocation, mapping, or conclusion.
- Before handoff, run the dedicated action-clarity and format-payload audit against the current normalizer, instrument registry, book importer, and canonical format examples; descriptive prose is not evidence that a payload will render or grade.
- Each mission briefing body is four sentences and 30–70 words; sentence four begins “By the end of the mission”.
- Grade with authored answer logic, never prose similarity.
- Use `takesAsRead` when a later stop relies on evidence or a concept already established.
- Treat 2026 PDC, Cerro Alto institutions, measurements, action thresholds, and outcome events as fictional campaign specifications.

### Opening sequence - no movie required, maximum five sentences

> You are at the Cerro Alto planetary-defense range, where six teams must determine whether a newly found asteroid will strike Earth. It may arrive in eleven days, and the current path places nine million people under a warning that is too broad to act on. Your job is to turn telescope images, radar echoes, and impact models into one defensible response. Director Mira Chen closes the launch binder and says, “A warning we cannot defend is another hazard.” The next observation window opens now.

**Delivery:** Show the five sentences together on one full-screen card over the normal Coordination Office view. Continue dismisses the card once, reveals the four-bar HUD at its starting values, and activates the Mission 1 briefing icon. Do not advance the sentences individually.

Opening quality check:

- **Where:** Cerro Alto planetary-defense range.
- **Goal:** determine the real impact path and build the response.
- **Deadline:** eleven days.
- **Failure:** either people receive no protection or nine million are moved on a false warning.
- **Player responsibility:** connect evidence across all six technical areas and authorize the final action.

---

## 2. Scientific scope and learning spine

### 2.1 Course coverage

The campaign uses planetary defense as the applied spine for the most relevant half of an introductory astronomy course:

- angular measure, sky coordinates, time standards, and apparent motion;
- electromagnetic radiation, brightness, magnitudes, spectra, and thermal emission;
- telescope aperture, resolution, limiting magnitude, cadence, and survey completeness;
- Newtonian gravity, Kepler's laws, orbital elements, and perturbations;
- asteroids, comets, NEOs, PHAs, orbital groups, albedo, and small-body structure;
- astrometry, orbit fitting, residuals, covariance, b-planes, virtual asteroids, and impact probability;
- mass, kinetic energy, atmospheric entry, airbursts, and consequence modeling;
- mitigation, warning time, decision thresholds, risk communication, and civil defense.

Stellar evolution, galaxies, cosmology, and exoplanets remain in the companion cheat sheet but are not forced into this story. Using them as unrelated gate questions would violate the campaign's story-first rule.

### 2.2 Dependency graph

~~~mermaid
flowchart TD
    A[Angles, coordinates, and time] --> B[Astrometry and apparent motion]
    C[Light, flux, and magnitudes] --> D[Telescopes and discovery]
    C --> E[Albedo, spectra, and thermal emission]
    F[Gravity and Kepler orbits] --> G[Orbit fit and propagation]
    B --> G
    D --> G
    E --> H[Size, mass, and structure]
    G --> I[Covariance, b-plane, and impact probability]
    H --> J[Impact energy and atmospheric entry]
    I --> K[Impact corridor and warning thresholds]
    J --> K
    K --> L[Mitigation and civil-defense decision]
~~~

### 2.3 Keystone concepts

1. Measurement versus inference.
2. Angular position, time, and apparent motion.
3. Light, brightness, magnitudes, and inverse-square reasoning.
4. Telescope limits, cadence, and survey completeness.
5. Gravity, Keplerian orbits, and orbital geometry.
6. Astrometry, residuals, and orbit fitting.
7. Uncertainty, covariance, and impact probability.
8. Albedo-size degeneracy and thermal characterization.
9. Small-body structure, spin, and composition.
10. Mass, speed, kinetic energy, and atmospheric entry.
11. Warning time, impulse, and mitigation feasibility.
12. Evidence thresholds, independent verification, and risk communication.

### 2.4 Concept-encounter matrix

| Keystone | Introduce | Practice | Delayed retrieve | Combine | Transfer/payoff |
|---|---|---|---|---|---|
| Measurement vs. inference | M1 | M2 | M5 | M10 | M15 |
| Angles, coordinates, time | M1 | M2 | M7 | M13 | M14 |
| Light and magnitudes | M1 | M5 | M6 | M10 | M14 |
| Telescope limits/completeness | M1 | M4 | M5 | M7 | M15 |
| Gravity/orbits | M2 | M3 | M8 | M11 | M13 |
| Astrometry/residuals | M2 | M5 | M7 | M8 | M14 |
| Uncertainty/probability | M2 | M3 | M8 | M9 | M15 |
| Albedo-size degeneracy | M5 | M6 | M9 | M10 | M11 |
| Structure/spin/composition | M6 | M7 | M10 | M11 | M14 |
| Impact energy/entry | M6 | M9 | M11 | M12 | M15 |
| Warning time/mitigation | M3 | M4 | M11 | M12 | M15 |
| Thresholds/verification | M1 | M3 | M7 | M12 | M15 |

---

## 3. World and location plan

### Dramatic spine

| Mission | Title | Science movement | Mystery movement | Stakes movement | Decision |
|---:|---|---|---|---|---|
| 1 | The Moving Point | Separate motion from image artifacts. | The detection is probably real. | The eleven-day clock starts. | Is the alert worth following? |
| 2 | Six Points Are Not an Orbit | Fit and propagate a short arc. | Many trajectories still fit. | Earth lies inside the uncertainty tube. | Does the object require impact monitoring? |
| 3 | The Probability Goes Up | Interpret changing probability. | Better data increase concern. | The international notification threshold is crossed. | Issue a conditional warning or wait? |
| 4 | The Last Dark Window | Value observations by information gain. | One observing plan can separate the orbit families. | Daylight will soon hide the object. | Which observations receive the scarce window? |
| 5 | The Summit Test | Test completeness and instrumental artifacts. | The moving source survives every control. | Losing the summit would end optical recovery. | Certify the detection and its astrometry? |
| 6 | The Darker Answer | Break the brightness-size degeneracy. | **Twist 1:** the object is about 260 m, not about 100 m. | The threat becomes regional, not merely local. | Adopt the larger consequence model? |
| 7 | The Echo Clock | Add radar range/Doppler and audit timestamps. | A weak second radar shoulder appears. | The orbit tightens while one unexplained signal remains. | Accept the radar solution? |
| 8 | The Orbit Narrows | Combine covariance on the b-plane. | Correct work drives impact probability to 63%. | The corridor can now be mapped. | Treat impact as the planning case? |
| 9 | Where It Lands | Convert size/speed into effects and corridor needs. | The nominal track crosses Valle Seco. | Nine million people cannot be moved in eleven days. | What information can still change the response? |
| 10 | One Object, Two Motions | Infer shape and structure from light curve and radar. | **Twist 2:** 2026 PDC is a weak contact binary shedding material. | Both orbit and response models are incomplete. | Replace the single-body model? |
| 11 | The One Push | Test deflection feasibility with impulse and lead time. | No credible spacecraft plan can move the full body enough. | False hope would consume the response window. | Reject deflection and commit to civil defense? |
| 12 | The Line We Promise | Precommit evidence-based action thresholds. | Officials accept staged action instead of one giant evacuation. | Trust can now rise or collapse with each update. | Which thresholds trigger shelter, relocation, and evacuation? |
| 13 | Through the Keyhole | Correct the orbit and map the impact corridor. | The main body is headed to an empty ocean sector. | Most of the population corridor can stand down. | Freeze the primary-body solution? |
| 14 | The Second Echo | Verify the primary track independently. | **Apparent victory, then Twist 3:** a separated 32 m fragment still targets land. | A smaller but immediate local airburst threat remains. | Is the second echo a real impactor? |
| 15 | The Honest Warning | Integrate fragment orbit, entry, and response thresholds. | The fragment corridor covers 180,000 people, not nine million. | The team has hours to move the right people. | Issue the narrow warning and execute the staged response. |

Major twist plants and payoffs:

- **Large dark body:** H = 22.0 is planted in M1; the assumed albedo appears in M5; thermal flux breaks the degeneracy in M6.
- **Contact binary:** asymmetric light curve begins in M6; weak radar shoulder appears in M7; inconsistent single-body residuals appear in M10.
- **Second land corridor:** the second radar shoulder is preserved, not discarded; shedding is established in M10; primary and secondary echoes separate after closest approach in M14; M15 pays off with a narrow local warning.

### Areas of study, places, and declared fixtures

`Area:` in each stop names the subject area that owns the lesson. `Format/placement:` and the call line name the physical place and declared fixture where the player answers it; these may differ.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Coordination Office | yes | `scopeboard` | board | The live evidence board: images, orbit clouds, thresholds, and signed claims, with every source shown. |
| Coordination Office | yes | `archive-bench` | bench | The plate-and-data archive bench, with calibrated frames, ingest records, and an open audit drawer. |
| Coordination Office | yes | `review-desk` | bench | Lena's review desk, where each clue receives one physical explanation or an unresolved tag. |
| Coordination Office | yes | `delivery-desk` | bench | Mira's delivery desk, with the notice draft, claim ledger, and release controls. |
| Coordination Office | yes | `pipeline-link` | board | A live link to the summit pipeline, showing injected sources beside recovered detections. |
| Orbit Determination Center | yes | `astro-bench` | bench | The astrometry bench, with timed sky positions, geometry tools, and uncertainty readouts. |
| Orbit Determination Center | yes | `fit-board` | board | The orbit-fit board, with candidate solutions, residuals, covariance, and propagation controls. |
| Orbit Determination Center | yes | `scope-schedule` | board | The observing schedule board, where time blocks, sites, weather, and information gain compete. |
| Orbit Determination Center | yes | `orbit-delivery-desk` | bench | The orbit team's delivery desk, where a shared observing plan is funded and committed. |
| Orbit Determination Center | yes | `tracking-rack` | rack | The tracking rack, holding raw and corrected astrometry views plus the independent reference-star channel. |
| Survey Telescope | yes | `dome-console` | vessel | The summit telescope console, with exposure, pointing, prediction, and image-measurement controls. |
| Survey Telescope | yes | `pipeline-bench` | bench | The summit pipeline bench, showing masks, injected sources, recovered positions, and identity checks. |
| Spectroscopy Dome | yes | `sizing-board` | board | The physical-sizing board, where brightness, albedo, thermal flux, shape, and mass ranges overlap. |
| Spectroscopy Dome | yes | `spectrograph` | vessel | The thermal spectrograph, with wavelength channels, temperature controls, and calibrated flux readouts. |
| Spectroscopy Dome | yes | `photometry-bench` | bench | The rotation photometry bench, with phased light curves, residuals, and repeat-cycle comparisons. |
| Bistatic Radar Range | yes | `tracking-clock` | board | The radar timing board, tracing transmit, receive, archive, and correction clocks to their sources. |
| Bistatic Radar Range | yes | `radar-console` | vessel | The bistatic radar console, with delay-Doppler frames, range gates, and controlled sweep settings. |
| Bistatic Radar Range | yes | `echo-archive` | rack | The preserved echo archive, holding untouched packets, frozen windows, and independent repeat observations. |
| Entry & Consequences Lab | yes | `energy-bench` | bench | The impact-energy bench, with diameter, density, speed, mass, energy, and TNT-equivalent fields. |
| Entry & Consequences Lab | yes | `risk-display` | board | The corridor risk display, joining physical effects to exposed populations and staged action thresholds. |
| Entry & Consequences Lab | yes | `deflection-desk` | bench | The intervention desk, where miss distance, lead time, required impulse, and launch-ready capability are compared. |
| Emergency Management Office | yes | `evac-desk` | bench | The response allocation desk, with transport, shelter, accessibility, medical, communications, and reserve capacity. |
| Emergency Management Office | yes | `threshold-board` | board | The public-action board, with precommitted evidence lines, authorities, messages, and review times. |

---

## 4. Canonical character roster

| Name | Pronouns | Working role | Wants | Blind spot | Verbal habit | Arc |
|---|---|---|---|---|---|---|
| Mira Chen | she/her | International NEO Response Director | One defensible action before politics outruns evidence. | Can sound cold when she protects uncertainty. | “What would change the decision?” | Learns to state uncertainty without hiding urgency. |
| Lena Ortiz | she/her | Survey and discovery lead | Keep optical recovery continuous. | Trusts her pipeline after years of tuning it. | “Show me the pixels.” | Accepts that independent timing and radar outrank pipeline confidence. |
| Malik Rowan | he/him | Orbit-determination lead | Wait for a mathematically stable solution. | Treats modeled covariance as complete until systematics are proved. | “Where is the uncertainty?” | Broadens from statistical fit to independent physical checks. |
| Sanaa Vale | she/her | Physical-characterization lead | Measure size, spin, and material before anyone acts. | Prefers completeness when time forces decisions. | “What else could make that signal?” | Learns to deliver bounded answers early, then refine them. |
| Tomás Ibarra | he/him | Planetary-radar director | Use radar geometry to collapse the orbit. | Assumes a clean main echo deserves priority over weak structure. | “Range first; story second.” | Preserves the second echo and later proves it matters. |
| Evelyn Park | she/her | Entry-and-consequences lead | Protect people before certainty arrives. | Frames decisions around worst credible harm. | “Who is under the corridor?” | Accepts staged thresholds that can stand down as well as escalate. |
| Jordan Hale | they/them | Valle Seco emergency manager | Give counties one clear plan they can execute. | Fears that changing guidance will destroy trust. | “Tell me what happens at each line.” | Uses transparent conditional plans instead of pretending certainty. |
| Arjun Sen | he/him | Space-intervention and operations lead | Use the dormant Aegis demonstrator if any credible intercept exists. | Momentum hardware makes action feel more valuable than observation. | “How much miss distance do we buy?” | Publicly rejects his own favored mission when the impulse fails. |

No character exists only to ask questions. Each owns evidence, authority, equipment, or a constraint used in the final response.

---

## 5. Locations and causal progression

| Missions | Required pattern | Authored routes |
|---|---|---|
| 1-4 | One location | M1 OPS; M2 ORBIT; M3 OPS; M4 ORBIT. |
| 5-10 | Two locations | M5 OPS→DISC; M6 DISC→CHAR; M7 OPS→RADAR; M8 RADAR→ORBIT; M9 ORBIT→IMPACT; M10 CHAR→RADAR. |
| 11-15 | Three locations | M11 CHAR→IMPACT→OPS; M12 IMPACT→TOWN→OPS; M13 ORBIT→RADAR→OPS; M14 OPS→RADAR→ORBIT; M15 DISC→ORBIT→TOWN. |

The aircraft remains visibly unavailable through Mission 4. Mission 4's observing allocation signs it out, so the first flight in Mission 5 is caused by a real need: the summit instrument must run an artifact-control sequence before its astrometry can be certified. There is no pre-campaign race, greeting round, or sightseeing lap.

---

## 6. Campaign metrics and recovery economy

### 6.1 Four bars

| ID | Player-facing name | Category | Start | Meaning | 0% failure | Lock condition |
|---|---|---|---:|---|---|---|
| solution | Impact Solution | Primary objective | 42% | Confidence that the correct objects, orbits, and corridors are identified. | Officials cannot know whom to warn. | Final independent fragment orbit and corridor accepted in M15. |
| response | Response Readiness | Secondary requirement | 38% | Ability of local and international teams to act on the science. | No executable protection plan remains. | Staged response is executed and confirmed in M15. |
| reserve | Observing Reserve | Operational reserve | 72% | Remaining telescope, radar, aircraft, staff, and data-link capacity. | The range loses the object and cannot update the warning. | Network handoff is complete in M15. |
| trust | Public Trust | System integrity | 64% | Willingness of officials and the public to follow conditional guidance. | Orders are ignored and the response fragments. | Final warning matches precommitted evidence thresholds in M15. |

**Recovery Points:** RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions); +1 at or before target, 0 through 125% of target, and -2 beyond 125%. One committed wrong answer costs one point. One RP raises one unlocked bar by one point; the Recovery Bank cap is 30.

### 6.2 Canonical metric path

Assumption: ten RP per mission, allocated to the lowest available bar. Values below are after the automatic event and RP allocation.

| M | Automatic event delta: Solution / Response / Reserve / Trust | Canonical RP allocation | Canonical bars after allocation |
|---:|---|---|---|
| 1 | +6 / 0 / -4 / 0 | Response +10 | 48 / 48 / 68 / 64 |
| 2 | +8 / 0 / -3 / 0 | Solution +1, Response +9 | 57 / 57 / 65 / 64 |
| 3 | +5 / 0 / -2 / -6 | Solution +1, Response +5, Trust +4 | 63 / 62 / 63 / 62 |
| 4 | +4 / +5 / -5 / 0 | Reserve +7, Trust +3 | 67 / 67 / 65 / 65 |
| 5 | +8 / 0 / -6 / +2 | Response +1, Reserve +9 | 75 / 68 / 68 / 67 |
| 6 | +5 / +4 / -5 / -8 | Reserve +3, Trust +7 | 80 / 72 / 66 / 66 |
| 7 | +10 / 0 / -6 / 0 | Reserve +8, Trust +2 | 90 / 72 / 68 / 68 |
| 8 | +8 / 0 / -4 / 0 | Reserve +7, Trust +3 | 98 / 72 / 71 / 71 |
| 9 | +5 / +8 / -3 / -2 | Reserve +6, Trust +4 | 100 / 80 / 74 / 73 |
| 10 | -10 / 0 / -4 / -6 | Reserve +4, Trust +6 | 90 / 80 / 74 / 73 |
| 11 | 0 / +8 / -2 / 0 | Reserve +6, Trust +4 | 90 / 88 / 78 / 77 |
| 12 | 0 / +12 / -3 / +8 | Reserve +10 | 90 / 100 / 85 / 85 |
| 13 | +10 / +5 / -5 / +4 | Reserve +10 | 100 / 100 / 90 / 89 |
| 14 | -8 / +3 / -4 / -4 | Reserve +5, Trust +5 | 92 / 100 / 91 / 90 |
| 15 | +16 / +10 / +10 / +15 | Bank all RP | 100 / 100 / 100 / 100 |

All negative changes are named story events: expended observing windows, a public escalation, an invalidated single-body model, or the discovery of the land-bound fragment. No bar falls merely because a twist is dramatic.

---

## 7. Clue ledger

| Planted | Objective observation | Initial interpretation | True meaning | Concept needed | Reinforced | Payoff |
|---|---|---|---|---|---|---|
| M1 | H = 22.0 from visible photometry. | Roughly 100 m under a bright-surface assumption. | About 260 m because the surface is dark. | Albedo-size degeneracy and thermal emission. | M5 | M6 |
| M1 | One frame has a 0.7 s timestamp offset. | Harmless ingest delay. | A shared timing path can bias all optical astrometry. | Independent time standards and traceable dependencies. | M7 | M13-M14 |
| M5 | Detection completeness falls near a satellite trail. | Local survey inefficiency. | The discovery was real, but its formal uncertainty is not purely random. | Injection tests and systematic residuals. | M7 | M8 |
| M6 | Light curve has unequal maxima. | Irregular single body. | Contact binary with two lobes. | Shape-spin degeneracy plus radar imaging. | M7 | M10 |
| M7 | Radar echo has a weak delayed shoulder. | Multipath or sidelobe. | A second lobe or fragment. | Range-Doppler structure and independent repetition. | M10 | M14 |
| M9 | Main corridor crosses Valle Seco but remains thousands of kilometers long. | Plan for the nominal line. | Response must be conditional on the full probability corridor. | Covariance and trigger thresholds. | M12 | M15 |
| M10 | Single-body model leaves alternating residuals. | Radar noise. | Two centers of reflection moving differently. | Residual pattern and binary dynamics. | M13 | M14 |
| M12 | Action thresholds are written before the next data arrive. | Administrative caution. | Precommitment preserves trust when guidance changes. | Decision thresholds and verification. | M13 | M15 |

---

## 8. Format mix and placement audit

The 60 stops use supported formats. No format exceeds one third of the campaign. Decision formats are placed with people, calculation formats at rooms/boards/benches, and operated formats at the equipment they control.

| Format | Count | Main player verb |
|---|---:|---|
| CHOICE | 2 | Select an interpretation. |
| BALLPARK | 4 | Build an order-of-magnitude estimate. |
| SEQUENCE | 3 | Order a physical or operational chain. |
| PROTOCOL | 2 | Match conditions to responses. |
| CASEBOOK | 1 | Match evidence to explanations. |
| DIAGNOSIS | 3 | Name the one mechanism fitting all readings. |
| SCIENCETANK | 1 | Fund evidence under a fixed budget. |
| SWEEP | 3 | Turn one control and read the response. |
| PROBE | 3 | Sample stations and locate the break. |
| HOLDOUT | 2 | Freeze a model before unseen data. |
| VERIFY | 2 | Predict, act, and measure. |
| VALUE | 3 | Buy evidence that changes a decision. |
| CONTROL | 2 | Change one variable and reverse it. |
| ATTEST | 3 | Verify claims against independent records. |
| ALLOCATE | 2 | Spend a finite operational pool. |
| TRACE | 2 | Expose shared dependencies. |
| BALANCE | 2 | Close a measurement ledger. |
| CHAIN | 1 | Build the transfer path. |
| TRIGGER | 3 | Commit thresholds before updates arrive. |
| CLOUD | 4 | Move/narrow a distribution against a corridor. |
| DEGENERACY | 2 | Use added physics to break a two-parameter locus. |
| STRESS | 3 | Test whether a conclusion survives assumptions. |
| RESIDUAL | 3 | Reject patterned model failure. |
| PROPAGATE | 1 | Buy the measurement that moves an error budget. |
| INJECT | 1 | Measure pipeline recovery with known synthetic sources. |
| DERIVE | 1 | Build a licensed equation chain. |
| TRIANGULATE | 1 | Constrain a solution by intersecting independent geometry. |

STACK is not used because the supplied question-type guide marks it suspended. World-graded warm-ups are not used because the campaign brief forbids filler orientation; Mission 1 teaches interaction through the real detection review.

---

# Mission 1 - The Moving Point

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 11 DAYS

**Card title:** THE MOVING POINT

**Go now:** Go to the Coordination Office and meet Lena Ortiz, survey and discovery lead, at the scopeboard.

**Card body:** A survey camera has marked one faint point that moves while the stars stay fixed. Real asteroids shift between timed images, but hot pixels, satellites, and bad image alignment can imitate that motion. At the Coordination Office, inspect the six discovery frames and the pipeline record. By the end of the mission, decide whether this alert deserves the range's limited follow-up time.

**Objective:** Decide whether the moving point is a credible asteroid detection.

### Worth knowing first - exact player copy

#### Glossary terms

Astrometry: precise measurement of an object's sky position and the time of that measurement.

Tracklet: several detections linked as one moving object during a short observing period.

Artifact: a false feature created by the detector, image processing, or another object such as a satellite.

#### Primer concepts

- Stars define a nearly fixed background over a few minutes.
- A real nearby object should move smoothly across several calibrated images.
- One convincing-looking frame is weaker than several independent checks.

#### Equations first needed today

**Equation:** angular rate = change in angle / change in time

**What it is for:** testing whether the point moves smoothly.

**Symbols:** change in angle is the shift on the sky; change in time is the time between images.

**Why this campaign needs it:** a consistent rate helps separate an asteroid from a one-frame defect.

**Authoring-only failure consequence:** Wasting the night on a false alert may cost the only follow-up window; rejecting a real alert leaves Earth unwarned.

## Main story happening - designer summary

The player reconstructs the discovery rather than accepting the automated alert. The motion is smooth, appears in multiple images, and is absent from the detector's fixed bad-pixel map. A satellite trail explains one contaminated frame but not the source. The last audit reveals a 0.7 s ingest-time offset on one frame; it is preserved as a clue rather than treated as decisive. The player certifies a real moving object while refusing to certify its orbit or size.

### Designer intent - not shown to player

Mission 1 teaches the campaign's governing distinction: observations are not the same as interpretations. It introduces angular motion, timestamps, artifacts, independent evidence, and the standard of making only the claim the data support.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Coordination Office | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Lena Ortiz, survey and discovery lead, drags a satellite trail away from the candidate and says, “Show me the pixels before anyone shows me a probability.” Timer pauses; Continue unlocks Stop 1.

**Panel/HUD text:** THE MOVING POINT / MISSION ACTIVE

**Dialogue bubbles -** Lena Ortiz: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 1.

**Beat 2 - After Stop 1 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The scopeboard labels four frames CONSISTENT MOTION and one frame CONTAMINATED, NOT DISCARDED.

**Panel/HUD text:** THE MOVING POINT / FIRST RESULT LOGGED

**Dialogue bubbles -** Lena Ortiz: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 2.

**Beat 3 - After Stop 2 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The pipeline path lights from calibrated image to linked tracklet; the plate archive drawer opens.

**Panel/HUD text:** THE MOVING POINT / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Lena Ortiz: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 3.

**Beat 4 - After Stop 3 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The detector map marks the hot pixel elsewhere; the 0.7 s timestamp offset receives a yellow CHECK tag.

**Panel/HUD text:** THE MOVING POINT / DECISION EVIDENCE READY

**Dialogue bubbles -** Lena Ortiz: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 4.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Mira Chen, International NEO Response Director, moves the alert from AUTOMATED to HUMAN-VERIFIED and opens the Orbit Determination call.

**Panel/HUD text:** THE MOVING POINT / MISSION DECISION LOGGED

**Dialogue bubbles -** Lena Ortiz: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 1 outcome, metric screen, concept review, and Mission 2 briefing.

## Location plan

**One location:** OPS only. All evidence is already present at the scopeboard, archive, and review desk; moving elsewhere would add travel without adding a new measurement.

## Characters and dramatic beat

Lena wants the candidate protected from casual dismissal, but her trust in the pipeline makes her minimize the timestamp offset. Mira insists on a narrower certified claim. The player's result lets both be right: the detection is real, while its orbit remains unknown.

## Key concepts, explained here

Angular position is a direction on the sky, not a distance. A nearby object's position can change against distant stars, but image defects and satellites can create false motion. Repeated detections, calibrated coordinates, smooth timing, and independent detector maps strengthen the claim. Absolute magnitude H is recorded now, but no size is claimed because albedo is unknown.

## Stop 1 - What moved?

**Format/placement:** CHOICE, asked by Lena Ortiz beside `scopeboard`.

**Metadata:** Concept: apparent motion; Keystone: measurement versus inference; Area: Survey Telescope; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Talk to Lena Ortiz, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** Lena needs a physical test before protecting the alert from automatic rejection.

**Question card story setup - exact player copy:** Six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The first task is to identify which pattern can represent one object moving through the sky.

**Question card story-science connection - exact player copy:** Choosing the physical motion pattern decides whether the remaining frames deserve a linked-track test.

**Complete format-specific interaction block:**

~~~yaml
question: Which observation best supports a real nearby object?
choices:
  - A point appears once on a known bad detector column.
  - A point shifts smoothly across four timed frames while stars remain fixed.
  - A straight bright streak crosses one exposure.
  - Every star shifts by the same amount after image alignment.
answer: A point shifts smoothly across four timed frames while stars remain fixed.
why: Differential motion repeated in calibrated frames supports one moving source without making an orbit or size claim.
rebuttals:
  "A point appears once on a known bad detector column.": A detector-fixed feature stays tied to the same pixels and supplies no repeated sky path.
  "A straight bright streak crosses one exposure.": A one-frame streak can be a satellite and does not reproduce the candidate's four timed point detections.
  "Every star shifts by the same amount after image alignment.": Motion shared by the entire star field signals a registration error, not one nearby moving body.
~~~

**Question card prompt - exact player copy:** Select the observation that is hardest for an artifact to imitate.

**Choices:**

1. A point shifts smoothly across four timed frames while stars remain fixed. **(correct)**

2. A point appears once on a known bad detector column.

3. A straight bright streak crosses one exposure.

4. Every star shifts by the same amount after image alignment.

**Expected submission - exact player copy:** one conclusion choice

**Correct result:** Smooth motion in four frames against fixed stars.

**Answer text:** The repeated point moves while the reference stars do not, so it can be one nearby object.

**Why:** Differential motion across calibrated images is evidence for a moving source; one-frame features are not.

**Wrong-path feedback:**

- **Choice 2:** A detector-fixed feature supplies no repeated sky path.

- **Choice 3:** A one-frame streak can be a satellite and does not match four timed points.

- **Choice 4:** Shared star motion signals a registration error, not one moving object.

**State/output:** Candidate frames gain a REAL-MOTION flag; Stop 2 unlocks.

## Stop 2 - Rebuild the discovery chain

**Format/placement:** SEQUENCE, at `archive-bench`.

**Metadata:** Concept: discovery pipeline; Keystone: telescope limits; Area: Survey Telescope; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the plate-and-data archive bench, in the Coordination Office.

**Stop reason - exact player copy:** The moving pattern matters only if each image reached the alert through a valid processing chain.

**Question card story setup - exact player copy:** With physical motion identified, the team must prove that calibration and linking happened before the alert was issued. Rebuild the pipeline so a later reviewer can see where a false point would have entered.

**Question card story-science connection - exact player copy:** A correctly ordered record exposes which checks are independent and where the timestamp clue belongs.

**Complete format-specific interaction block:**

~~~yaml
cards:
  - Calibrate detector and sky coordinates
  - Detect sources in each exposure
  - Link positions consistent with one moving object
  - Compare with known objects and artifact masks
  - Issue candidate alert for human review
order:
  - Calibrate detector and sky coordinates
  - Detect sources in each exposure
  - Link positions consistent with one moving object
  - Compare with known objects and artifact masks
  - Issue candidate alert for human review
~~~

**Question card prompt - exact player copy:** Put the discovery steps in the order needed to make the alert auditable.

**Expected submission - exact player copy:** one ordered plan

**Correct result:** Calibration → detection → linking → catalog/artifact comparison → alert.

**Answer text:** The alert is meaningful because calibrated detections were linked before the candidate was promoted.

**Why:** Linking before calibration or artifact checks can turn detector or alignment errors into false motion.

**Wrong-path feedback:** Begin with what converts pixels and timestamps into comparable sky measurements.

**State/output:** The pipeline path illuminates; the archive drawer and Stop 3 unlock.

## Stop 3 - Explain every clue

**Format/placement:** CASEBOOK, asked by Lena Ortiz beside `review-desk`.

**Metadata:** Concept: artifact rejection; Keystone: measurement versus inference; Area: Survey Telescope; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Lena Ortiz, at the review desk in the Coordination Office.

**Stop reason - exact player copy:** One unexplained clue is enough to block a human-verified detection.

**Question card story setup - exact player copy:** Because the pipeline is now ordered, each suspicious feature can be tied to a physical cause or left unresolved. Match the frame evidence to explanations before the director accepts the moving point as real.

**Question card story-science connection - exact player copy:** Explaining the satellite, hot pixel, star alignment, and candidate separately prevents one cause from being stretched to fit every feature.

**Complete format-specific interaction block:**

~~~yaml
scenarios:
  - Candidate shifts 18, 19, and 18 arcsec between clean frames.
  - Bright line crosses only frame 3.
  - Fixed bright point lies on detector column 1842 in every dark frame.
  - All catalog stars align within 0.12 arcsec.
choices:
  - Smooth moving source
  - Satellite trail
  - Hot pixel
  - Successful image registration
mapping:
  candidate: Smooth moving source
  line: Satellite trail
  fixed_point: Hot pixel
  stars: Successful image registration
~~~

**Question card prompt - exact player copy:** Match each observation to the explanation that accounts for it without contradicting the others.

**Expected submission - exact player copy:** one complete evidence-to-explanation mapping

**Correct result:** Candidate→moving source; line→satellite; fixed point→hot pixel; stars→good registration.

**Answer text:** Each artifact has its own signature, and none explains the candidate's repeated smooth motion.

**Why:** A valid explanation must fit the relevant observation without breaking quiet evidence elsewhere.

**Wrong-path feedback:** Ask whether the feature stays on one detector location, crosses one exposure, or moves between sky coordinates.

**State/output:** Three false features receive labels; the candidate remains unmasked; Stop 4 unlocks.

## Stop 4 - Certify only what is known

**Format/placement:** ATTEST, asked by Mira Chen beside `delivery-desk`.

**Metadata:** Concept: claim verification; Keystone: thresholds and verification; Area: Coordination Office; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Mira Chen, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** Mira will release follow-up time only for claims backed by records the range can defend.

**Question card story setup - exact player copy:** Because every image feature now has an explanation, the detection claim can be audited without claiming an orbit or size. Verify the statements that are backed, and leave the tempting unsupported statements unsigned.

**Question card story-science connection - exact player copy:** A narrow verified claim starts the next investigation without turning assumptions into facts.

**Complete format-specific interaction block:**

~~~yaml
attest:
  verification_limit: 4
  claims:
    - {id: motion, text: The source moves smoothly in four calibrated frames, backed: true, critical: true}
    - {id: artifact, text: Known detector and satellite artifacts do not explain it, backed: true, critical: true}
    - {id: time, text: All timestamps are independently verified, backed: false, critical: true}
    - {id: impact, text: The object will strike Earth, backed: false, critical: true}
    - {id: size, text: The object is about 100 m wide, backed: false, critical: false}
  correct_claims: [motion, artifact]
  answerText: Certify a real moving source; do not certify its orbit, impact, size, or the one offset timestamp.
~~~

**Question card prompt - exact player copy:** Sign every claim the evidence supports and no claim that still depends on an assumption.

**Expected submission - exact player copy:** one complete signed-versus-rejected claim set

**Correct result:** Sign motion and artifact rejection only.

**Answer text:** The range has a credible moving-object detection, not yet an impact prediction.

**Why:** Scientific attestation separates direct evidence from model-dependent conclusions.

**Wrong-path feedback:** If a statement requires distance, orbit, albedo, or an unaudited timestamp, it is not yet backed.

**State/output:** Alert status becomes HUMAN-VERIFIED; ORBIT call unlocks; the timestamp CHECK tag persists.

## Mission outcome

Mission decision: Spend follow-up time on the alert. Four clean images show one point moving while the stars stay fixed. The range accepts a real object but does not yet claim an impact or a size. The orbit team now has to learn where it is going.

**Pre-card character beat:** Lena Ortiz, survey and discovery lead, says, “Real point, unverified clock, no story added.” Mira sends the six positions to Orbit Determination.

### Post-mission metric screen - exact player copy

**Header:** MISSION 1 COMPLETE

**Timer:** TIME {elapsed} / TARGET 08:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The real candidate enters continuous follow-up; one optical window is consumed.

**Automatic bar change:** IMPACT SOLUTION +6 | OBSERVING RESERVE -4

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or save it in the Recovery Bank.

**Canonical QA example:** Award 10 RP; Response Readiness +10; bars 48 / 48 / 68 / 64; bank 0.

**Failure check:** If Observing Reserve reaches 0%, restore the mission-start snapshot.

## Quick concept review

- Real motion repeats across timed, aligned images.
- One frame can contain more than one cause.
- Observations support narrower claims than models.
- Use independent records before certifying a statement.
- **Mission takeaway:** Verify the moving object before inferring its orbit, size, or danger.

---

# Mission 2 - Six Points Are Not an Orbit

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 10 DAYS, 18 HOURS

**Card title:** SIX POINTS ARE NOT AN ORBIT

**Go now:** Go to Orbit Determination and meet Malik Rowan, orbit-determination lead, at the astro-bench.

**Card body:** The last mission proved that the point is real, but six directions on the sky do not reveal one unique path. An orbit fit finds the trajectories that gravity can carry through every timed position. At Orbit Determination, estimate the motion, combine geometric constraints, and inspect the residual pattern. By the end of the mission, decide whether 2026 PDC belongs on continuous Earth-impact monitoring.

**Objective:** Determine whether the allowed orbit family includes a credible Earth encounter.

### Worth knowing first - exact player copy

#### Glossary terms

Orbit fit: a calculation that finds trajectories consistent with measured positions, times, and gravity.

Residual: observed position minus the position predicted by a model.

Covariance: a description of parameter uncertainties and how their errors move together.

#### Primer concepts

- A sky direction does not directly give distance.
- A short observing arc can fit many different three-dimensional orbits.
- Random residuals can be acceptable; a pattern can expose a wrong model.

#### Equations first needed today

**Equation:** P²(yr) ≈ a³(AU)

**What it is for:** checking whether a heliocentric orbit's period matches its semimajor axis.

**Symbols:** P is orbital period in years; a is semimajor axis in astronomical units.

**Why this campaign needs it:** impossible period-size pairs must be rejected before impact propagation.

**Equation:** residual = observed position - calculated position

**What it is for:** testing whether an orbit misses the data in a patterned way.

**Symbols:** observed is the measured sky coordinate; calculated is the orbit prediction.

**Why this campaign needs it:** a low average error is not enough if the errors all bend the same way.

## Main story happening - designer summary

The player measures an angular rate, uses time and viewing geometry to narrow the range of admissible distances, and rejects a deceptively low-RMS orbit whose residuals curve systematically. The accepted family contains Earth-crossing solutions and a 3.2% impact probability. The mission does not declare impact; it authorizes continuous monitoring and introduces the uncertainty tube.

### Designer intent - not shown to player

This mission moves from detection to dynamics. It explicitly teaches why several sky positions do not uniquely determine distance, why model residual shape matters, and why impact probability belongs to a distribution of allowed orbits rather than the nominal path alone.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Orbit Determination Center | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Malik Rowan, orbit-determination lead, draws six dots and a fan of curves through them: “Every line fits the picture. Gravity decides which lines survive.”

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / MISSION ACTIVE

**Dialogue bubbles -** Malik Rowan: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 5.

**Beat 2 - After Stop 5 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The fit-board displays ANGULAR RATE 92 ± 5 ARCSEC/HOUR.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / FIRST RESULT LOGGED

**Dialogue bubbles -** Malik Rowan: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 6.

**Beat 3 - After Stop 6 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The orbit fan contracts from 1,800 admissible paths to 240.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 7.

**Beat 4 - After Stop 7 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The lowest-RMS solution turns red for PATTERNED RESIDUALS; the random-residual solution stays.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 8.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Earth appears on the propagated encounter plane; the board reads CURRENT IMPACT PROBABILITY 3.2% — MODEL DEPENDENT.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 2 outcome, metric screen, concept review, and Mission 3 briefing.

## Location plan

**One location:** ORBIT only. The astro-bench, fit-board, and propagation display contain the required calculations and no distant instrument can yet add data before the orbit family is defined.

## Characters and dramatic beat

Malik wants mathematical restraint and initially prefers the lowest RMS. The player shows that patterned errors outweigh a marginally smaller average. Malik accepts continuous monitoring while emphasizing that 3.2% is not a prediction of certain impact.

## Key concepts, explained here

An orbit needs position and velocity in three dimensions. Optical astrometry supplies precise directions at known times but weak immediate distance information. Dynamics and viewing geometry reduce the possibilities. Residuals test model adequacy; covariance describes remaining uncertainty. Propagation asks how much of that allowed family reaches Earth.

## Stop 5 - Measure the sky rate

**Format/placement:** BALLPARK, at `astro-bench`.

**Metadata:** Concept: angular rate; Keystone: angles/time; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The orbit solver needs a checked angular rate before it searches three-dimensional paths.

**Question card story setup - exact player copy:** The verified point moves 37 arcseconds during a 24-minute clean interval while the reference stars remain fixed. Estimate its hourly angular rate so the orbit search begins in the correct region.

**Question card story-science connection - exact player copy:** A wrong rate would make the solver explore paths that never match the measured sky motion.

**Player-visible data and equations - exact player copy:** Angular shift Δθ = 37 arcsec; elapsed time Δt = 24 min; conversion = 60 min/h; equation ω = Δθ/Δt.

**Complete format-specific interaction block:**

~~~yaml
estimate:
  labels: [angular shift, elapsed time, minutes per hour]
  values: [[37 arcsec], [24 min], [60 min/hour]]
  slots: [numerator, denominator, scale]
  template: 37 arcsec / 24 min × 60 min/hour
  formula: rate = angular shift / time
  target: 92.5
  correct: 93 arcsec/hour
  tolerance: 10 percent
~~~

**Question card prompt - exact player copy:** Using the displayed values, submit one angular rate ω in arcseconds per hour.

**Expected submission - exact player copy:** one numerical angular rate in degrees per day

**Correct result:** 92.5 arcsec/hour; accept 83-102 arcsec/hour.

**Answer text:** The object moves about 93 arcseconds per hour.

**Why:** Rate is angular displacement divided by elapsed time, then scaled to one hour.

**Wrong-path feedback:** Keep arcseconds in the numerator and convert 24 minutes to a fraction of an hour.

**State/output:** Rate enters the orbit solver; Stop 6 unlocks.

## Stop 6 - Add geometric leverage

**Format/placement:** TRIANGULATE, at `astro-bench`.

**Metadata:** Concept: distance constraint; Keystone: orbit geometry; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** Angular rate alone leaves nearby slow and distant fast trajectories mixed together.

**Question card story setup - exact player copy:** With the sky rate established, the solver still permits trajectories at very different distances and speeds. Switch in the separated-station observation and the exact observer locations to isolate the region where both sight lines cross.

**Question card story-science connection - exact player copy:** The intersection adds distance information that one telescope direction cannot supply.

**Player-visible data and equations - exact player copy:** Cerro Alto bearing = 0.0 ± 0.20 arcsec; East Station bearing = 1.7 ± 0.25 arcsec; surveyed baseline = 1.31 km with 0.05 km systematic uncertainty. Submit the intersection region in astronomical units.

**Required action order - exact player copy:** SELECT BOTH SIGHT LINES AND THE SURVEYED 1.31 km BASELINE → APPLY THE STATION-POSITION CORRECTION → SOLVE THE INTERSECTION → SUBMIT THE DISTANCE REGION.

**Complete format-specific interaction block:**

~~~yaml
triangulate:
  constraints:
    - {id: alto, label: Cerro Alto line of sight, bearing_arcsec: 0.0, sigma_arcsec: 0.20}
    - {id: east, label: East station line of sight, bearing_arcsec: 1.7, sigma_arcsec: 0.25}
    - {id: baseline, label: Station separation, value_km: 1.31, systematic: 0.05}
  corrections:
    - {id: station_position, label: Apply surveyed station coordinates, correct: true}
    - {id: brightness, label: Use apparent brightness as direct range, correct: false}
  truth_region: 0.071 to 0.089 AU
  answerText: The two sight lines constrain the object to roughly 0.08 AU; brightness alone cannot.
~~~

**Question card prompt - exact player copy:** Activate the constraints and correction that provide a physical distance estimate.

**Expected submission - exact player copy:** one selected constraint set and resulting numerical region

**Correct result:** Use both sight lines, surveyed baseline, and station-position correction; range 0.071-0.089 AU.

**Answer text:** Parallax places the object near 0.08 AU while preserving a family of velocities.

**Why:** Separated observing sites view a nearby object from measurably different directions.

**Wrong-path feedback:** Brightness mixes distance, size, phase, and albedo; it is not a direct geometric range.

**State/output:** Orbit family contracts to 240 solutions; Stop 7 unlocks.

## Stop 7 - Refuse the prettiest fit

**Format/placement:** RESIDUAL, at `fit-board`.

**Metadata:** Concept: model adequacy; Keystone: astrometry/residuals; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** Two orbit families survive, and the smallest RMS belongs to the one with a visible error pattern.

**Question card story setup - exact player copy:** Because distance has narrowed, only two candidate orbit families remain, with nearly identical average residuals. Compare their residual fields and reject the fit that hides a systematic curve behind a slightly smaller RMS.

**Question card story-science connection - exact player copy:** The accepted residual pattern controls which future encounter family is propagated toward Earth.

**Required action order - exact player copy:** OPERATE BOTH RESIDUAL VIEWS → MEASURE RMS AND SIGN PATTERN → COMPARE WITH RANDOM SCATTER → INTERPRET AND SELECT ONE MODEL.

**Complete format-specific interaction block:**

~~~yaml
residual:
  models:
    - id: A
      rms_arcsec: 0.18
      residuals_arcsec: [-0.24, -0.16, -0.05, 0.07, 0.15, 0.25]
    - id: B
      rms_arcsec: 0.21
      residuals_arcsec: [0.18, -0.22, 0.09, -0.19, 0.24, -0.11]
  correct_model: B
  correct_conclusion: keep_model_B_and_reject_patterned_model_A
  pattern_to_reject: monotonic curvature
  answerText: Model B has slightly larger RMS but random residuals; Model A is systematically wrong.
~~~

**Question card prompt - exact player copy:** Choose the orbit family that is scientifically safer to propagate.

**Expected submission - exact player copy:** one residual classification and model conclusion

**Correct result:** Model B.

**Answer text:** Keep Model B; Model A's residuals sweep from negative to positive and reveal missing curvature.

**Why:** Random scatter can reflect measurement noise, while ordered residuals indicate model misspecification.

**Wrong-path feedback:** Do not rank only by RMS; inspect whether the sign and size change systematically with time.

**State/output:** Model A is tagged REJECTED: PATTERNED; Stop 8 unlocks.

## Stop 8 - Propagate the allowed cloud

**Format/placement:** CLOUD, at `fit-board`.

**Metadata:** Concept: impact probability; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** Continuous monitoring is justified only if a meaningful part of the allowed orbit cloud reaches Earth.

**Question card story setup - exact player copy:** With the biased fit removed, 240 weighted orbit solutions remain and the nominal path still misses Earth. Propagate the full cloud to the encounter date and measure how much probability intersects Earth's effective cross section.

**Question card story-science connection - exact player copy:** The cloud, not the best-fit line, determines whether the object enters impact monitoring.

**Required action order - exact player copy:** SELECT THE FULL WEIGHTED CLOUD → INCLUDE GRAVITATIONAL FOCUSING → PROPAGATE TO ENCOUNTER → MEASURE INTERSECTION → INTERPRET.

**Player-visible data and equations - exact player copy:** Propagate all 240 weighted orbit solutions to the encounter date, include gravitational focusing, and use Earth’s effective collision radius of 7240 km. Measure the intersecting weighted fraction and report it as a percent.

**Complete format-specific interaction block:**

~~~yaml
cloud:
  initial_solutions: 240
  points:
    - {id: propagate_all, setting: all weighted solutions, reading: 240 propagated paths}
    - {id: include_focusing, setting: gravitational focusing on, reading: 7240 km effective Earth radius}
    - {id: measure_intersection, setting: weighted Earth intersection, reading: 3.2 percent impact fraction}
    - {id: nominal_only, setting: nominal solution only, reading: nominal path misses Earth, trap: true}
  controls:
    - {id: propagate, label: Propagate all weighted solutions to encounter}
    - {id: focus, label: Include gravitational focusing}
    - {id: nominal_only, label: Use nominal solution only, trap: true}
  earth_effective_radius_km: 7240
  weighted_impact_fraction: 0.032
  correct_conclusion: continuous_monitoring
  answerText: 3.2% of the weighted allowed cloud impacts Earth, so continuous monitoring is warranted.
~~~

**Question card prompt - exact player copy:** Submit the weighted impact probability in percent and one conclusion: CONTINUOUS MONITORING or RELEASE FROM MONITORING.

**Expected submission - exact player copy:** one weighted impact probability in percent and one monitoring conclusion

**Correct result:** Include all weighted solutions and focusing; 3.2%; continuous monitoring.

**Answer text:** The best-fit line misses, but 3.2% of the allowed probability reaches Earth.

**Why:** Impact probability integrates the uncertainty distribution over Earth's effective collision region.

**Wrong-path feedback:** A nominal miss does not remove risk when the surrounding orbit cloud still crosses Earth.

**State/output:** Sentry-style monitoring flag activates; OPS warning review unlocks.

## Mission outcome

Mission decision: Keep 2026 PDC on the Earth watch list. The best path misses Earth. Yet 3.2% of the allowed paths hit it. The team needs more data before it can act.

**Pre-card character beat:** Malik Rowan, orbit-determination lead, circles Earth inside the long orbit cloud and says, “Not a prediction. Not dismissible.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 2 COMPLETE

**Timer:** TIME {elapsed} / TARGET 10:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The orbit family is constrained; another optical block is consumed.

**Automatic bar change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -3

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Solution +1, Response +9; bars 57 / 57 / 65 / 64; bank 0.

**Failure check:** Any bar at 0% restores the mission-start snapshot.

## Quick concept review

- Optical astrometry measures direction more directly than distance.
- Several short-arc orbits can fit the same positions.
- Residual patterns can disqualify a low-RMS model.
- Impact probability belongs to the full weighted orbit cloud.
- **Mission takeaway:** A nominal miss is not zero risk when uncertainty still reaches Earth.

---

# Mission 3 - The Probability Goes Up

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 10 DAYS, 12 HOURS

**Card title:** THE PROBABILITY GOES UP

**Go now:** Go to the Coordination Office and meet Mira Chen, International NEO Response Director, at the delivery desk.

**Card body:** Orbit monitoring found a 3.2% impact chance, and new positions have narrowed the cloud toward Earth instead of away. Better measurements can raise probability when Earth occupies more of the remaining possibilities. At the Coordination Office, test the update, its assumptions, and the warning rule. By the end of the mission, decide whether to issue a conditional international impact notice now.

**Objective:** Decide whether the current evidence crosses the notification threshold.

### Worth knowing first - exact player copy

#### Glossary terms

Impact probability: the weighted fraction of allowed trajectories that strike Earth under the current model.

Torino Scale: a public 0-to-10 scale combining impact probability and impact energy for events within 100 years.

Palermo Scale: a technical logarithmic comparison between one impact risk and the background hazard.

#### Primer concepts

- Shrinking uncertainty can concentrate probability onto Earth before later data remove it.
- A notification threshold starts coordination; it does not declare that impact is likely.
- Probability, consequence, warning time, and uncertainty must be communicated together.

#### Equations first needed today

**Equation:** expected loss ≈ impact probability × consequence

**What it is for:** comparing risks that differ in both likelihood and harm.

**Symbols:** impact probability is a number from 0 to 1; consequence is the modeled harm.

**Why this campaign needs it:** a small chance of a large event can justify observation and planning without justifying panic.

## Main story happening - designer summary

The updated data shrink the orbit cloud around Earth's cross section and raise probability from 3.2% to 8.0%. The player distinguishes notification from certainty, tests the result under weighting and focusing assumptions, then writes the public and technical thresholds before the final update appears. The warning goes out with clear conditional language, and public trust falls because the probability headline spreads without its uncertainty context.

### Designer intent - not shown to player

This mission makes correct science produce bad news. It teaches probability evolution, risk scales, expected consequence, robustness testing, and precommitted communication thresholds while preserving uncertainty and avoiding sensational language.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Coordination Office | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Mira Chen, International NEO Response Director, has two drafts open: WAIT FOR CERTAINTY and CONDITIONAL NOTICE. “We will not hide behind either.”

**Panel/HUD text:** THE PROBABILITY GOES UP / MISSION ACTIVE

**Dialogue bubbles -** Mira Chen: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 9.

**Beat 2 - After Stop 9 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The public and technical scales separate on the scopeboard.

**Panel/HUD text:** THE PROBABILITY GOES UP / FIRST RESULT LOGGED

**Dialogue bubbles -** Mira Chen: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 10.

**Beat 3 - After Stop 10 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The cloud contracts; IMPACT PROBABILITY changes from 3.2% to 8.0% with the label CURRENT MODEL.

**Panel/HUD text:** THE PROBABILITY GOES UP / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Mira Chen: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 11.

**Beat 4 - After Stop 11 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The 8.0% value survives reasonable reweighting between 6.7% and 9.4%.

**Panel/HUD text:** THE PROBABILITY GOES UP / DECISION EVIDENCE READY

**Dialogue bubbles -** Mira Chen: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 12.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The warning network receives the prewritten notice; outside news alerts appear on the wall display without the qualifying sentence.

**Panel/HUD text:** THE PROBABILITY GOES UP / MISSION DECISION LOGGED

**Dialogue bubbles -** Mira Chen: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 3 outcome, metric screen, concept review, and Mission 4 briefing.

## Location plan

**One location:** OPS only. This is a coordination and communication decision using the orbit products already delivered; no new distant measurement is available during the review.

## Characters and dramatic beat

Mira wants a defensible notice. Evelyn Park, entry-and-consequences lead, joins by radio and pushes for plain human consequences. Malik warns against turning an 8% model result into certainty. The player writes a conditional notice that respects all three constraints.

## Key concepts, explained here

Probability can rise as uncertainty shrinks because Earth may fill more of the remaining distribution. The Torino Scale is broad public communication; the Palermo Scale is a technical comparison to background risk. Neither replaces the underlying probability, size range, date, and uncertainty. Thresholds should be written before emotionally charged updates arrive.

## Stop 9 - Name the number honestly

**Format/placement:** CHOICE, asked by Mira Chen beside `delivery-desk`.

**Metadata:** Concept: risk language; Keystone: thresholds/verification; Area: Orbit Determination Center; Learning role: RETRIEVE; Difficulty: L2; Story role: character.

**Call - exact player copy:** Talk to Mira Chen, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** The warning draft cannot proceed until probability, certainty, and hazard scales are separated.

**Question card story setup - exact player copy:** The monitoring board shows a current impact probability, a Torino value, and a Palermo value for the same event. Choose the statement that reports what the 8.0% number means without adding certainty.

**Question card story-science connection - exact player copy:** Honest language determines whether the next calculation informs coordination or becomes a false declaration of impact.

**Player-visible data and equations - exact player copy:** The board displays impact probability = 8.0%, Torino Scale = 2, and Palermo Scale = −1.1. Report what the 8.0% probability means without treating either hazard scale as a percentage.

**Complete format-specific interaction block:**

~~~yaml
question: Which statement accurately reports an 8.0% impact probability?
choices:
  - The asteroid has an 8.0% model-based chance of impact under the current orbit distribution.
  - The asteroid will miss because the probability is below 50%.
  - The asteroid will hit because the probability rose.
  - Torino 2 means the impact probability is 2%.
answer: The asteroid has an 8.0% model-based chance of impact under the current orbit distribution.
why: Impact probability is the modeled fraction of justified orbit solutions that intersect Earth, not a certainty claim or hazard-scale reading.
rebuttals:
  "The asteroid will miss because the probability is below 50%.": A probability below 50% still includes impact solutions and cannot justify a definite miss.
  "The asteroid will hit because the probability rose.": An increase changes the weight of impact solutions but does not make impact certain.
  "Torino 2 means the impact probability is 2%.": Torino combines probability and consequence in a communication scale; its category number is not a percentage.
~~~

**Question card prompt - exact player copy:** Select the sentence that can appear unchanged in the official notice.

**Choices:**

1. The asteroid has an 8.0% model-based chance of impact under the current orbit distribution. **(correct)**

2. The asteroid will miss because the probability is below 50%.

3. The asteroid will hit because the probability rose.

4. Torino 2 means the impact probability is 2%.

**Expected submission - exact player copy:** one conclusion choice

**Correct result:** The model-based 8.0% statement.

**Answer text:** Report the probability, model dependence, and current status without predicting the outcome.

**Why:** Probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.

**Wrong-path feedback:**

- **Choice 2:** A probability below 50% still includes impact solutions and cannot justify a definite miss.

- **Choice 3:** A rising probability changes the weight of impact solutions but does not make impact certain.

- **Choice 4:** Torino 2 is a hazard category, not a 2% probability.

**State/output:** Notice language field unlocks; Stop 10 activates.

## Stop 10 - Why better data made the number worse

**Format/placement:** CLOUD, at `scopeboard`.

**Metadata:** Concept: probability evolution; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The director needs to show why a higher probability does not mean the previous calculation was dishonest.

**Question card story setup - exact player copy:** With the language fixed, overlay the old and new orbit clouds on Earth's effective cross section. The new cloud is smaller, but Earth occupies more of it, so measure the resulting probability change.

**Question card story-science connection - exact player copy:** The overlay lets the notice explain that improved precision changed the fraction, not the rules.

**Required action order - exact player copy:** OVERLAY BOTH CLOUDS → NORMALIZE EACH TO ITS OWN TOTAL WEIGHT → MEASURE EACH EARTH INTERSECTION → INTERPRET THE CHANGE.

**Player-visible data and equations - exact player copy:** Old cloud: 240 weighted solutions, 48,000 km width, impact fraction 3.2%. New cloud: 180 weighted solutions, 17,000 km width, impact fraction 8.0%. Normalize each cloud to its own total weight.

**Complete format-specific interaction block:**

~~~yaml
cloud:
  old: {weighted_solutions: 240, impact_fraction: 0.032, width_km: 48000}
  new: {weighted_solutions: 180, impact_fraction: 0.080, width_km: 17000}
  points:
    - {id: old_cloud, setting: normalize old cloud, reading: 3.2 percent impact at 48000 km width}
    - {id: new_cloud, setting: normalize new cloud, reading: 8.0 percent impact at 17000 km width}
  earth_effective_radius_km: 7240
  operations: [overlay, normalize_weights, measure_intersection]
  correct_conclusion: probability_rises_as_cloud_concentrates
  answerText: The smaller cloud places 8.0% of its weight on Earth, up from 3.2%.
~~~

**Question card prompt - exact player copy:** Submit the old and new impact probabilities in percent and one conclusion explaining why the value changed.

**Expected submission - exact player copy:** two measured impact fractions in percent and one comparison conclusion

**Correct result:** 3.2% old; 8.0% new.

**Answer text:** Better data narrowed the allowed region toward Earth, so the current impact probability increased.

**Why:** Probability is the normalized weight inside Earth's impact cross section, not the absolute width of the cloud.

**Wrong-path feedback:** Compare the fraction of each cloud on Earth, not which cloud looks larger on the screen.

**State/output:** Explanation sentence enters the notice; Stop 11 unlocks.

## Stop 11 - Stress the warning

**Format/placement:** STRESS, asked by Malik Rowan beside `delivery-desk`.

**Metadata:** Concept: robustness; Keystone: uncertainty/probability; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Malik Rowan, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** Malik will not support notification if one reasonable weighting choice can drive the result below the threshold.

**Question card story setup - exact player copy:** Because the normalized cloud gives 8.0%, vary the astrometric weights, focusing radius, and one-frame timing uncertainty across justified ranges. Determine whether every reasonable case remains above the 1% notification line.

**Question card story-science connection - exact player copy:** A robust threshold crossing supports action even while the exact percentage continues to change.

**Required action order - exact player copy:** VARY EACH ASSUMPTION THROUGH ITS PRINTED RANGE → MEASURE THE MINIMUM PROBABILITY → COMPARE WITH 1.0% → INTERPRET ROBUSTNESS.

**Player-visible data and equations - exact player copy:** Vary optical weight from 0.7–1.3, focusing radius from 6800–7600 km, and frame-time uncertainty from 0.2–1.0 s. Resulting probabilities span 6.7–9.4%; notification threshold = 1.0%.

**Complete format-specific interaction block:**

~~~yaml
stress:
  assumptions:
    - {id: optical_weight, min: 0.7, max: 1.3, baseline: 1.0}
    - {id: focusing_radius_km, min: 6800, max: 7600, baseline: 7240}
    - {id: frame_time_sigma_s, min: 0.2, max: 1.0, baseline: 0.7}
  outcomes_percent: {minimum: 6.7, baseline: 8.0, maximum: 9.4}
  threshold_percent: 1.0
  correct_conclusion: robustly_above_notification
  answerText: Every justified case remains above 1%, so notification does not depend on one tuning choice.
~~~

**Question card prompt - exact player copy:** Submit the minimum probability in percent and one conclusion: ROBUSTLY ABOVE THRESHOLD or NOT ROBUST.

**Expected submission - exact player copy:** one minimum probability in percent and one above-or-below-threshold conclusion

**Correct result:** Yes; minimum 6.7% remains above 1%.

**Answer text:** The exact probability varies, but the decision to notify is robust.

**Why:** Decision robustness depends on whether reasonable assumptions cross the action boundary, not whether they change the reported number.

**Wrong-path feedback:** Separate uncertainty in the exact percentage from uncertainty about which side of 1% it occupies.

**State/output:** Malik adds ROBUST THRESHOLD CROSSING; Stop 12 unlocks.

## Stop 12 - Write the line before the update

**Format/placement:** TRIGGER, at `scopeboard`.

**Metadata:** Concept: notification threshold; Keystone: thresholds/verification; Area: Coordination Office; Learning role: INTRODUCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The range must commit its notification rule before the next emotionally charged update arrives.

**Question card story setup - exact player copy:** Because the impact probability remains above 1% under every justified test, write the action threshold before revealing the final update. Pair the threshold with consequence and uncertainty language that prevents it from sounding like certainty.

**Question card story-science connection - exact player copy:** A precommitted rule turns the next number into a consistent action instead of a political improvisation.

**Player-visible data and equations - exact player copy:** Notification trigger: impact probability > 1.0% and estimated diameter > 10 m. Revealed update after commitment: impact probability = 8.0%; the notice must include date, size range, probability, and uncertainty.

**Required action order - exact player copy:** COMMIT THE THRESHOLD RULE → REVEAL THE 8.0% UPDATE → APPLY THE RULE → SUBMIT THE NOTIFICATION ACTION.

**Complete format-specific interaction block:**

~~~yaml
trigger:
  decision_rule: Issue a conditional international notice when impact probability is greater than 1% and estimated diameter is greater than 10 m.
  scale: {min: 0, max: 100, unit: percent}
  anchors:
    - {value: 1, action: conditional_notice}
    - {value: 10, action: intensified_planning}
    - {value: 50, action: impact_as_leading_case}
  objective: begin coordination without claiming certainty
  direction: escalate_above
  consequence_limit: notice must include date, size range, and model uncertainty
  revealed_update_percent: 8.0
  correct_action: conditional_notice
  answerText: Issue the conditional notice because the robust probability exceeds 1% for an object well above 10 m.
~~~

**Question card prompt - exact player copy:** Commit the numerical trigger first; after the 8.0% update appears, submit one action: CONDITIONAL NOTICE or NO NOTICE.

**Expected submission - exact player copy:** one numerical trigger setting and one triggered-action conclusion

**Correct result:** Issue conditional notice with date, size range, probability, and uncertainty.

**Answer text:** The threshold starts international coordination; it does not announce a certain impact.

**Why:** Precommitted thresholds make action reproducible and reduce motivated changes after alarming evidence appears.

**Wrong-path feedback:** Waiting for certainty wastes warning time; declaring impact ignores the 92% of current probability that misses.

**State/output:** Notice transmits; public news wall activates; Mission 4 observing review unlocks.

## Mission outcome

Mission decision: Send a warning now, but state its limits. The 8.0% result stays above the 1% line in each test. The notice gives the date, size range, and doubt. The next update must earn trust with better data.

**Pre-card character beat:** Mira Chen, International NEO Response Director, sends the notice. Evelyn Park says by radio, “Now give people the condition, not just the number.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 3 COMPLETE

**Timer:** TIME {elapsed} / TARGET 09:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The robust warning starts coordination, but incomplete headlines spread.

**Automatic bar change:** IMPACT SOLUTION +5 | OBSERVING RESERVE -2 | PUBLIC TRUST -6

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Solution +1, Response +5, Trust +4; bars 63 / 62 / 63 / 62; bank 0.

**Failure check:** Public Trust at 0% means later protective orders will fail; restore the mission-start snapshot.

## Quick concept review

- Better data can raise or lower impact probability.
- Probability is not certainty and a hazard scale is not a percent.
- Stress tests ask whether a decision crosses its threshold.
- Precommitted rules protect consistency under pressure.
- **Mission takeaway:** Notify when the evidence crosses the rule, and communicate the condition as carefully as the number.

---

# Mission 4 - The Last Dark Window

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 10 DAYS

**Card title:** THE LAST DARK WINDOW

**Go now:** Go to Orbit Determination and meet Malik Rowan, orbit-determination lead, at the fit-board.

**Card body:** The warning is out, but 180 orbit solutions still place the object on both impact and miss paths. The object soon enters the Sun's glare, so tonight's time must buy information rather than more of the same. At Orbit Determination, compare observing schedules and propagate their expected gains. By the end of the mission, choose which optical, radar, and thermal observations receive the range's last dark window.

**Objective:** Fund the observing plan most likely to change the impact decision.

### Worth knowing first - exact player copy

#### Glossary terms

Solar elongation: the angle between an object and the Sun in the sky.

Observing arc: the time span covered by measurements used in an orbit fit.

Information gain: the expected reduction in uncertainty that matters to a decision.

#### Primer concepts

- A longer time baseline often adds more orbital leverage than many same-night points.
- Radar can add range and radial velocity; thermal infrared can constrain size.
- The best observation is the one that can change an action, not the one with the most data points.

#### Equations first needed today

No new equation is introduced; this mission retrieves angular rate, residuals, and impact-cloud reasoning already recorded in the mission log.

## Main story happening - designer summary

The player compares quantity of observations with decision value. A dense optical block improves precision modestly, while one later optical recovery plus radar and thermal time separate orbit and size questions. The player builds a schedule around the final dark window, protects enough reserve for follow-up, and signs out the aircraft for the summit. This is the last base-camp-only mission.

### Designer intent - not shown to player

Mission 4 teaches resource allocation, cadence, solar elongation, and value of information. It also earns the aircraft and distant travel through a real scientific need, satisfying orientation without a tour.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Orbit Determination Center | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Malik Rowan, orbit-determination lead, points to a daylight gap on the fit-board: “More points tonight or one point later—those are not the same.”

**Panel/HUD text:** THE LAST DARK WINDOW / MISSION ACTIVE

**Dialogue bubbles -** Malik Rowan: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 13.

**Beat 2 - After Stop 13 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Low-value repeated exposures dim; later-baseline optical, radar, and thermal options remain bright.

**Panel/HUD text:** THE LAST DARK WINDOW / FIRST RESULT LOGGED

**Dialogue bubbles -** Malik Rowan: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 14.

**Beat 3 - After Stop 14 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The chosen schedule appears on the scopeboard with protected handoff blocks.

**Panel/HUD text:** THE LAST DARK WINDOW / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 15.

**Beat 4 - After Stop 15 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The error budget predicts orbit-width reduction from 17,000 km to 4,600 km.

**Panel/HUD text:** THE LAST DARK WINDOW / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 16.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Mira authorizes the plan; the aircraft changes from HELD to SIGNED OUT FOR PHASE 5.

**Panel/HUD text:** THE LAST DARK WINDOW / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 4 outcome, metric screen, concept review, and Mission 5 briefing.

## Location plan

**One location:** ORBIT only. The mission is an allocation decision using forecasted measurement value; the distant instruments do not operate until the plan is approved.

## Characters and dramatic beat

Malik favors a later optical baseline. Lena argues for dense immediate coverage before clouds arrive. Sanaa needs thermal time to stop size guesses. Tomás requests radar. The player funds a mixed plan and preserves a reserve instead of choosing one specialist's complete wish list.

## Key concepts, explained here

Cadence is the pattern of observations over time. Closely spaced data can measure short-term motion, while a longer arc reveals curvature. Solar elongation limits when the object can be seen. Information gain asks which measurement changes uncertainty relevant to a decision. A balanced plan separates orbit, size, and instrument failure.

## Stop 13 - Buy evidence, not volume

**Format/placement:** VALUE, asked by Malik Rowan beside `fit-board`.

**Metadata:** Concept: information gain; Keystone: telescope limits; Area: Orbit Determination Center; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Malik Rowan, at the orbit-fit board in the Orbit Determination Center.

**Stop reason - exact player copy:** Only 100 observing credits remain before the object enters daylight.

**Question card story setup - exact player copy:** The current orbit cloud is limited mainly by range, time baseline, and one possible timestamp bias, not by raw image count. Spend the fixed budget on measurements that can change the warning decision.

**Question card story-science connection - exact player copy:** The selected evidence determines whether tonight narrows the real uncertainty or merely repeats it.

**Player-visible data and equations - exact player copy:** Observing budget = 100 credits. Options: late optical recovery = 30, radar geometry = 40, thermal size = 20, 60 same-night frames = 45, public live feed = 20. Preserve unspent credits.

**Complete format-specific interaction block:**

~~~yaml
value:
  budget: 100
  options:
    - {id: dense_optical, label: 60 same-night optical frames, cost: 45, axis: precision}
    - {id: late_optical, label: 12-frame recovery near dawn, cost: 30, axis: time_baseline, required: true}
    - {id: radar, label: Range-Doppler block, cost: 35, axis: geometry, required: true}
    - {id: thermal, label: Thermal infrared block, cost: 25, axis: size}
    - {id: publicity, label: Live public telescope feed, cost: 20, axis: communication}
  recommended: [late_optical, radar, thermal]
  total_recommended_cost: 90
  answerText: Fund the later optical recovery, radar geometry, and thermal size measurement; preserve 10 credits.
~~~

**Question card prompt - exact player copy:** Submit one observing plan costing at most 100 credits, its total cost, and the remaining reserve.

**Expected submission - exact player copy:** one selected plan with its decision-relevant result

**Correct result:** Late optical + radar + thermal = 90 credits.

**Answer text:** The mixed plan attacks time baseline, range, and size while preserving a small reserve.

**Why:** Independent measurement axes reduce different uncertainties; repeated same-night frames mostly refine an already precise direction.

**Wrong-path feedback:** Ask which current uncertainty each option reduces and whether another option measures the same thing.

**State/output:** Selected blocks move onto the schedule rail; Stop 14 unlocks.

## Stop 14 - Build the night

**Format/placement:** SEQUENCE, at `scope-schedule`.

**Metadata:** Concept: cadence; Keystone: telescope limits; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the observing schedule board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The funded observations fail if the object sets before the handoffs occur.

**Question card story setup - exact player copy:** With the three evidence blocks funded, their order must respect sky visibility, radar geometry, aircraft travel, and instrument handoff. Build a schedule that preserves the late optical baseline and transfers each result before the next fit.

**Question card story-science connection - exact player copy:** Correct cadence turns three instruments into one growing evidence chain.

**Complete format-specific interaction block:**

~~~yaml
cards:
  - Fly to Cerro Alto and validate the optical pipeline
  - Obtain early optical tracklet
  - Acquire radar range-Doppler block
  - Obtain thermal infrared block
  - Recover final optical tracklet near dawn
  - Refit orbit and consequences
order:
  - Fly to Cerro Alto and validate the optical pipeline
  - Obtain early optical tracklet
  - Acquire radar range-Doppler block
  - Obtain thermal infrared block
  - Recover final optical tracklet near dawn
  - Refit orbit and consequences
~~~

**Question card prompt - exact player copy:** Order the funded work so visibility and evidence handoffs are physically possible.

**Expected submission - exact player copy:** one ordered plan

**Correct result:** Validate/early optical → radar → thermal → dawn optical → refit.

**Answer text:** The plan protects the long time baseline and delivers each measurement before the final fit.

**Why:** Observing cadence is constrained by sky position, geometry, travel, and processing time.

**Wrong-path feedback:** Keep the dawn recovery last among observations; it supplies the longest baseline.

**State/output:** Schedule rail locks; Stop 15 unlocks.

## Stop 15 - Propagate the error budget

**Format/placement:** PROPAGATE, at `fit-board`.

**Metadata:** Concept: error budget; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The director needs a forecast of what the chosen schedule can actually improve.

**Question card story setup - exact player copy:** Because the observing order is fixed, the orbit team can forecast how each block changes the encounter uncertainty. Buy the measurement update that most reduces the b-plane width while preserving size information.

**Question card story-science connection - exact player copy:** The predicted reduction sets the success test for the real observations in later missions.

**Player-visible data and equations - exact player copy:** Budget = 65 credits. Candidate cost/result pairs: same-night optical 20 credits/13,200 km; radar 35/7,600 km; dawn recovery 30/8,900 km; radar plus dawn 65/4,600 km.

**Complete format-specific interaction block:**

~~~yaml
propagate:
  current_error_budget:
    angular_arc_km: 6200
    range_km: 13800
    timing_km: 4100
    model_km: 2900
  candidate_updates:
    - {id: more_same_night, cost: 20, new_total_width_km: 13200}
    - {id: radar_range, cost: 35, new_total_width_km: 7600}
    - {id: dawn_arc, cost: 30, new_total_width_km: 8900}
    - {id: radar_plus_dawn, cost: 65, new_total_width_km: 4600}
  budget: 65
  correct_update: radar_plus_dawn
  answerText: Radar plus the dawn recovery reduces the forecast encounter width to 4,600 km.
~~~

**Question card prompt - exact player copy:** Submit one observing-update plan costing no more than 65 credits and its resulting b-plane width in kilometers.

**Expected submission - exact player copy:** one selected update plan and its numerical propagated result

**Correct result:** Radar plus dawn; 4,600 km forecast width.

**Answer text:** Geometry and time baseline together outperform more same-night precision.

**Why:** Correlated range and along-track uncertainty require complementary measurements.

**Wrong-path feedback:** A single smaller component does not guarantee the smallest propagated encounter width.

**State/output:** A 4,600 km success band appears on the board; Stop 16 unlocks.

## Stop 16 - Commit the shared plan

**Format/placement:** SCIENCETANK, asked by Mira Chen beside `orbit-delivery-desk`.

**Metadata:** Concept: observing allocation; Keystone: thresholds/verification; Area: Coordination Office; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mira Chen, at the orbit delivery desk in the Orbit Determination Center.

**Stop reason - exact player copy:** Four teams want the same staff, aircraft, and data link during one night.

**Question card story setup - exact player copy:** With the expected error reduction known, allocate 100 coordination points across the proposals that make the mixed plan executable. Fund the chain, not the loudest department, and keep the final fit from losing its inputs.

**Question card story-science connection - exact player copy:** The allocation converts an optimal observing idea into a plan the range can actually complete.

**Player-visible data and equations - exact player copy:** Allocate exactly 100 points. Maximum useful amounts: aircraft and pipeline crew 30, radar team 30, thermal link 20, orbit handoff 30, and public live feed 20; every selected evidence block requires its handoff.

**Complete format-specific interaction block:**

~~~yaml
proposals:
  - {id: aircraft, label: Aircraft and summit pipeline crew, evidence: Enables both optical tracklets, max: 30}
  - {id: radar_staff, label: Radar pointing and reduction team, evidence: Supplies range-Doppler geometry, max: 30}
  - {id: thermal_link, label: East-dome thermal link, evidence: Supplies diameter constraint, max: 20}
  - {id: orbit_handoff, label: Final orbit and covariance handoff, evidence: Combines all blocks, max: 25}
  - {id: media_feed, label: Public live feed, evidence: Does not reduce scientific uncertainty tonight, max: 20}
recommended:
  aircraft: 25
  radar_staff: 25
  thermal_link: 20
  orbit_handoff: 30
  media_feed: 0
constraints: total exactly 100; every funded evidence block needs its handoff
answerText: Fund all four scientific links and the final handoff; do not spend the night on a media feed.
~~~

**Question card prompt - exact player copy:** Submit one five-category allocation totaling exactly 100 points.

**Expected submission - exact player copy:** one allocation totaling the stated budget

**Correct result:** 25 / 25 / 20 / 30 / 0.

**Answer text:** The range funds optical, radar, thermal, and the final integration that gives those measurements meaning.

**Why:** Evidence has value only when acquisition, transfer, and combined inference all survive the resource plan.

**Wrong-path feedback:** A funded instrument without its handoff produces data that cannot change tonight's orbit decision.

**State/output:** Aircraft and three remote destinations unlock for later missions.

## Mission outcome

Mission decision: Use the last dark window for dawn images, radar, and heat data. These tests may cut the path width to about 4,600 km. The range will guard the handoff. The summit system must pass its checks first.

**Pre-card character beat:** Mira Chen signs the aircraft release. Malik says, “We are buying a longer lever, not a taller stack of images.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 4 COMPLETE

**Timer:** TIME {elapsed} / TARGET 11:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The mixed observing plan is authorized and the aircraft/staff reserve is committed.

**Automatic bar change:** IMPACT SOLUTION +4 | RESPONSE READINESS +5 | OBSERVING RESERVE -5

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Reserve +7, Trust +3; bars 67 / 67 / 65 / 65; bank 0.

**Failure check:** Observing Reserve at 0% cancels the schedule and restores the mission-start snapshot.

## Quick concept review

- Cadence controls the time leverage of observations.
- Independent measurements attack different uncertainties.
- Information gain is measured against a decision.
- An instrument without a handoff cannot change the model.
- **Mission takeaway:** Spend scarce observing time on complementary evidence, not repeated volume.

---

# Mission 5 - The Summit Test

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 9 DAYS, 18 HOURS

**Card title:** THE SUMMIT TEST

**Go now:** Go to the Coordination Office and meet Lena Ortiz, survey and discovery lead, at the pipeline-bench link.

**Card body:** The last mission funded a summit recovery, but the discovery frames include a satellite trail and a small completeness gap. A pipeline test inserts known false stars to measure what the camera and software recover. Begin at the Coordination Office, then fly to the Survey Telescope and operate the real system. By the end of the mission, decide whether its new astrometry is safe to enter into the impact solution.

**Objective:** Validate the survey pipeline and certify the new optical positions.

### Worth knowing first - exact player copy

#### Glossary terms

Completeness: the fraction of real objects a survey detects under stated conditions.

Limiting magnitude: the faintest brightness a survey can detect reliably.

Injection test: adding known synthetic sources to data and measuring how many the pipeline recovers.

#### Primer concepts

- A pipeline can miss faint objects without inventing false motion.
- Controls should change one variable and then reverse it.
- Optical astrometry must be validated where the instrument actually operates.

#### Equations first needed today

**Equation:** m₂ - m₁ = -2.5 log₁₀(F₂/F₁)

**What it is for:** connecting a magnitude difference to a flux ratio.

**Symbols:** m is magnitude; F is measured flux; subscripts label two sources or settings.

**Why this campaign needs it:** exposure settings must reach 2026 PDC without saturating the reference stars.

## Main story happening - designer summary

At OPS the player injects 200 synthetic moving points and identifies a completeness dip only near the satellite trail. That result creates the need to operate the actual summit camera. At DISC the player sweeps exposure time, reverses a detector-column control, and predicts then verifies the candidate's position. The asteroid appears where the independent orbit forecast placed it, so the optical astrometry is certified with a larger systematic uncertainty near contaminated pixels.

### Designer intent - not shown to player

This mission introduces injection, sweep, control, and verification as distinct experimental verbs. It retrieves magnitudes and residuals while making first remote travel necessary and purposeful.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Coordination Office | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Lena Ortiz, survey and discovery lead, loads a synthetic-source set: “If we know what went in, we can count what came back.”

**Panel/HUD text:** THE SUMMIT TEST / MISSION ACTIVE

**Dialogue bubbles -** Lena Ortiz: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 17.

**Beat 2 - After Stop 17 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The recovery map shows one localized gap. Waypoint: FLY TO CERRO ALTO — TEST THE CAMERA WHERE THE GAP OCCURS.

**Panel/HUD text:** THE SUMMIT TEST / FIRST RESULT LOGGED

**Dialogue bubbles -** Lena Ortiz: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Survey Telescope waypoint and Stop 18.

**Beat 3 - After Stop 18 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Dome shutter opens; the pipeline-bench displays the same image region.

**Panel/HUD text:** THE SUMMIT TEST / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Lena Ortiz: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 19.

**Beat 4 - After Stop 19 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Exposure setting locks; the bad-column mask shifts off and back on without moving the candidate.

**Panel/HUD text:** THE SUMMIT TEST / DECISION EVIDENCE READY

**Dialogue bubbles -** Lena Ortiz: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 20.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** A new point appears 0.31 arcsec from the independent prediction; the astrometry packet receives CERTIFIED WITH LOCAL SYSTEMATIC.

**Panel/HUD text:** THE SUMMIT TEST / MISSION DECISION LOGGED

**Dialogue bubbles -** Lena Ortiz: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 5 outcome, metric screen, concept review, and Mission 6 briefing.

## Location plan

**Two locations:** OPS Stop 1, then DISC Stops 2-4. The injection map identifies a detector-region problem that can only be tested by operating the physical summit camera.

## Characters and dramatic beat

Lena initially treats the localized completeness loss as harmless because it does not create sources. Malik joins by radio and insists it still affects formal uncertainty. The player certifies the positions while carrying the localized systematic into the orbit fit.

## Key concepts, explained here

Completeness measures recovery of real sources, not purity of detections. Limiting magnitude depends on exposure, sky, and instrument noise. An injection test maps pipeline performance with known inputs. A control changes one factor and reverses it. Verification requires a prediction written before the measurement appears.

## Stop 17 - Put known objects through the pipeline

**Format/placement:** INJECT, at `pipeline-link`.

**Metadata:** Concept: completeness; Keystone: telescope limits; Area: Survey Telescope; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the summit pipeline link, in the Coordination Office.

**Stop reason - exact player copy:** The summit data cannot enter the orbit fit until the range knows what the pipeline misses.

**Question card story setup - exact player copy:** The funded recovery depends on a pipeline that lost sources near one bright satellite trail in the discovery night. Inject known moving points across magnitude and detector position, then count where the system fails.

**Question card story-science connection - exact player copy:** The recovery map tells the summit team which detector condition requires a live control.

**Player-visible data and equations - exact player copy:** Inject 200 known sources: 50 in each clean/bright, clean/faint, trail/bright, and trail/faint bin. Expected acceptable completeness is at least 80% in every bin; recovery fraction = recovered/injected × 100%, so the committed minimum is 0.80 × 50 = 40 recovered sources per bin. Magnitudes span 20.0–23.5 and rates span 60–130 arcsec/h.

**Required action order - exact player copy:** CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET.

**Complete format-specific interaction block:**

~~~yaml
inject:
  prediction_commit_required: true
  equipment_unlocks_after_commit: true
  prediction: {minimum_acceptable_recovery_percent: 80, minimum_recovered_per_50_source_bin: 40}
  population:
    count: 200
    magnitude_range: [20.0, 23.5]
    motion_range_arcsec_per_hour: [60, 130]
  bins:
    clean_bright: {injected: 50, recovered: 49}
    clean_faint: {injected: 50, recovered: 43}
    trail_bright: {injected: 50, recovered: 45}
    trail_faint: {injected: 50, recovered: 27}
  correct_conclusion: localized_completeness_loss_near_trail
  answerText: Recovery falls to 54% for faint moving sources near the trail but remains high elsewhere.
~~~

**Question card prompt - exact player copy:** Calculate and commit the 40-of-50 minimum plus the four-bin injection plan before the pipeline unlocks; then operate it, measure all four recovery fractions in percent, and submit the localized failure-bin conclusion.

**Expected submission - exact player copy:** one committed numerical minimum and four-bin test plan, four measured recovery fractions in percent, and one failure-bin conclusion

**Correct result:** Trail/faint bin: 27/50 = 54%; localized loss.

**Answer text:** The pipeline does not invent the candidate, but it under-recovers faint sources near the trail.

**Why:** Known inputs reveal selection effects that cannot be measured from detected sources alone.

**Wrong-path feedback:** Compare recovered with injected in each bin; raw detection counts do not give completeness.

**State/output:** Detector-region map highlights the gap; DISC waypoint unlocks.

## Stop 18 - Find the usable exposure

**Format/placement:** SWEEP, at `dome-console`.

**Metadata:** Concept: exposure and magnitude; Keystone: light/telescopes; Area: Survey Telescope; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** The live camera must detect the asteroid while keeping enough reference stars unsaturated.

**Question card story setup - exact player copy:** With the weak detector region located, sweep exposure time from 10 to 90 seconds and watch asteroid signal and star saturation together. Choose the shortest setting that reaches the signal goal without crossing the saturation limit.

**Question card story-science connection - exact player copy:** The chosen exposure determines whether the position can be measured against trustworthy reference stars.

**Player-visible data and equations - exact player copy:** Control: exposure time = 10, 20, 30, 45, 60, or 90 s. Measure asteroid S/N and saturated reference-star count after each setting; goals are S/N ≥ 5 and saturated stars ≤ 1.

**Required action order - exact player copy:** OPERATE THE EXPOSURE CONTROL → MEASURE BOTH OUTPUTS → INTERPRET BOTH LIMITS → COMMIT ONE SETTING.

**Complete format-specific interaction block:**

~~~yaml
sweep:
  control: {label: exposure time, unit: s, values: [10, 20, 30, 45, 60, 90]}
  readings:
    signal_to_noise: [2.1, 3.4, 4.7, 6.1, 7.0, 8.1]
    saturated_reference_stars: [0, 0, 0, 1, 5, 14]
  goal: signal_to_noise at least 5 and saturated_reference_stars no more than 1
  correct_setting: 45
  answerText: Use 45 s; it reaches S/N 6.1 with only one saturated reference star.
~~~

**Question card prompt - exact player copy:** Operate the sweep, then submit one exposure setting in seconds: the shortest value with asteroid S/N ≥ 5 and no more than one saturated reference star.

**Expected submission - exact player copy:** one exposure setting in seconds and one signal-versus-saturation interpretation

**Correct result:** 45 s.

**Answer text:** A 45-second exposure gives usable asteroid signal without destroying the reference grid.

**Why:** Longer exposure improves signal but eventually saturates bright stars needed for astrometry.

**Wrong-path feedback:** The highest signal is not automatically best; read both the minimum signal and maximum saturation goals.

**State/output:** Exposure control locks at 45 s; Stop 19 unlocks.

## Stop 19 - Move the mask, not the object

**Format/placement:** CONTROL, at `pipeline-bench`.

**Metadata:** Concept: causal artifact test; Keystone: measurement/inference; Area: Survey Telescope; Learning role: COMBINE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the pipeline bench, in the Survey Telescope.

**Stop reason - exact player copy:** A detector mask must be ruled out as the cause of the candidate's measured shift.

**Question card story setup - exact player copy:** Because 45 seconds gives a usable image, test whether the local bad-column mask moves the candidate centroid. Change only the mask, reverse it, and compare the position with the expected noise band.

**Question card story-science connection - exact player copy:** A reversible nonresponse shows that the candidate motion is on the sky rather than tied to the mask.

**Player-visible data and equations - exact player copy:** Change only the bad-column mask position by +3 px. Hold the raw 45 s image, star catalog, world-coordinate solution, and centroid algorithm fixed; measure centroid x before and after, restore the mask, and measure again. Restoration is required.

**Required action order - exact player copy:** MEASURE BASELINE → CHANGE ONLY THE MASK → MEASURE → RESTORE THE MASK → MEASURE AGAIN → INTERPRET.

**Complete format-specific interaction block:**

~~~yaml
control:
  changed: {bad_column_mask_shift_px: [0, 3]}
  held_fixed: [raw 45 s image, star catalog, world-coordinate solution, centroid algorithm]
  measurement_timing: [before change, after +3 px change, after restoration]
  variables:
    - {id: mask_shift_px, label: Bad-column mask shift, baseline: 0, test: 3, unit: px}
    - {id: raw_image, label: Raw image, baseline: 45, test: 45, unit: s exposure}
    - {id: star_catalog, label: Star catalog, baseline: fixed, test: fixed}
    - {id: coordinate_solution, label: World-coordinate solution, baseline: fixed, test: fixed}
    - {id: centroid_algorithm, label: Centroid algorithm, baseline: fixed, test: fixed}
  baseline: {centroid_x_px: 2048.62, noise_band_px: 0.08}
  candidates:
    - {id: mask, label: Shift bad-column mask by 3 px, response_px: 0.03}
    - {id: alignment, label: Shift world-coordinate solution, response_px: 0.41}
    - {id: exposure, label: Double exposure time, response_px: 0.12}
  reversal:
    required: true
    control_id: mask
    return_centroid_x_px: 2048.61
  response: {label: centroid x, baseline_px: 2048.62, after_change_px: 2048.65, after_restore_px: 2048.61, noise_band_px: 0.08}
  required_sequence: [measure_baseline, change_mask_only, measure, restore_mask, measure_again]
  correct_control: mask
  correct: mask_shift_px
  answerText: Moving and restoring the mask changes the centroid by less than the 0.08 px noise band.
~~~

**Question card prompt - exact player copy:** Submit the mask-shift setting (+3 px), the changed and restored centroid measurements in pixels, and one conclusion about whether the centroid follows the mask.

**Expected submission - exact player copy:** one control setting, the before-and-after measurements, and one causal conclusion

**Correct result:** Mask shift; response 0.03 px, below noise; returns to 2048.61 px.

**Answer text:** The candidate position does not follow the detector mask.

**Why:** Causation requires changing the proposed cause while holding other factors fixed, then confirming by reversal.

**Wrong-path feedback:** Changing alignment directly moves every sky coordinate and cannot isolate the mask.

**State/output:** MASK ARTIFACT rejected; Stop 20 unlocks.

## Stop 20 - Predict, observe, verify

**Format/placement:** VERIFY, at `dome-console`.

**Metadata:** Concept: independent prediction; Keystone: astrometry/verification; Area: Survey Telescope; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** The new astrometry is certifiable only if it lands near a prediction frozen before the exposure.

**Question card story setup - exact player copy:** With exposure and mask effects controlled, freeze Malik's independent predicted position before opening the latest frame. Measure the new centroid and decide whether its separation falls inside the 0.50-arcsecond acceptance radius.

**Question card story-science connection - exact player copy:** Agreement with a blinded prediction verifies the optical packet without letting the fit chase the new point.

**Player-visible data and equations - exact player copy:** Before equipment unlocks: predicted offsets are RA = +124.20 arcsec and Dec = −38.70 arcsec; acceptance radius = 0.50 arcsec. After frame reveal, measure RA and Dec offsets in arcseconds and use separation = √[(ΔRA)² + (ΔDec)²].

**Required action order - exact player copy:** CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET.

**Complete format-specific interaction block:**

~~~yaml
verify:
  prediction_commit_required: true
  prediction:
    prompt: Commit the predicted RA and Dec offsets before revealing the latest frame.
    formula: "separation = sqrt[(measured_RA - predicted_RA)^2 + (measured_Dec - predicted_Dec)^2]"
    correct: {ra_offset_arcsec: 124.20, dec_offset_arcsec: -38.70}
    unit: arcsec
    tolerance: {maximum_separation_arcsec: 0.50}
  acceptance_radius_arcsec: 0.50
  equipment_unlocks_after_commit: true
  action: {id: reveal_latest_frame, label: Reveal latest calibrated frame}
  measurement: {ra_offset_arcsec: 124.43, dec_offset_arcsec: -38.91}
  separation_arcsec: 0.31
  required_sequence: [commit_prediction, reveal_latest_frame, measure_ra_and_dec, calculate_separation, interpret]
  truth: The measured point is 0.31 arcsec from the frozen prediction and passes the 0.50 arcsec limit.
  correct_conclusion: verified
  answerText: The measured point is 0.31 arcsec from the frozen prediction, inside the 0.50 arcsec goal.
~~~

**Question card prompt - exact player copy:** First commit the predicted RA and Dec offsets and 0.50-arcsec acceptance rule; this unlocks the frame. Then operate Reveal, measure the centroid, calculate separation in arcseconds, and submit VERIFIED or REJECTED.

**Expected submission - exact player copy:** one committed RA/Dec prediction pair in arcseconds, one measured RA/Dec pair and separation in arcseconds, and one verification conclusion

**Correct result:** Verified; separation 0.31 arcsec.

**Answer text:** The new optical position passes the independent prediction test.

**Why:** A held prediction prevents post-measurement tuning from masquerading as verification.

**Wrong-path feedback:** Compare the two-dimensional separation with the printed goal, not either coordinate alone.

**State/output:** Astrometry packet transfers to ORBIT with a local systematic term; CHAR destination unlocks.

## Mission outcome

Mission decision: Add the new sky points to the impact model. Keep the local error term. Three tests support the result. The same frames show odd light, so the dome must test the body's size.

**Pre-card character beat:** Lena Ortiz, survey and discovery lead, stamps the packet and adds, “Keep the trail penalty. Clean enough is not the same as perfect.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 5 COMPLETE

**Timer:** TIME {elapsed} / TARGET 12:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Certified optical positions arrive; aircraft and summit time are spent.

**Automatic bar change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -6 | PUBLIC TRUST +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Response +1, Reserve +9; bars 75 / 68 / 68 / 67; bank 0.

**Failure check:** Observing Reserve at 0% loses the dawn recovery and restores the mission-start snapshot.

## Quick concept review

- Completeness requires known injected objects.
- Exposure trades signal against saturation.
- A reversible control isolates a proposed cause.
- Verification freezes a prediction before new data appear.
- **Mission takeaway:** Validate both the pipeline and the position before adding precision to an impact orbit.

---

# Mission 6 - The Darker Answer

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 9 DAYS, 10 HOURS

**Card title:** THE DARKER ANSWER

**Go now:** Go to the Survey Telescope and meet Sanaa Vale, physical-characterization lead, by radio at the dome-console.

**Card body:** The summit positions passed their controls, but visible brightness alone allows a small bright body or a much larger dark one. Thermal infrared measures the heat leaving the surface and helps separate size from reflectivity. Begin at the Survey Telescope, then carry the light curve to the Spectroscopy Dome. By the end of the mission, decide which diameter and consequence range the response must use.

**Objective:** Break the brightness-size degeneracy and adopt a defensible diameter range.

### Worth knowing first - exact player copy

#### Glossary terms

Absolute magnitude H: a standardized visible brightness used with albedo to estimate asteroid diameter.

Albedo: a measure of how strongly a surface reflects visible light.

Light curve: brightness measured over time, often used to infer spin and shape.

Thermal infrared: heat radiation that can constrain emitting area and temperature.

#### Primer concepts

- The same visible brightness can come from a small bright surface or a large dark surface.
- Thermal emission depends strongly on size and temperature.
- Unequal light-curve maxima can indicate an irregular or two-lobed shape.

#### Equations first needed today

**Equation:** D(km) = 1329 × 10^(-H/5) / sqrt(pv)

**What it is for:** estimating diameter from absolute magnitude and assumed visible albedo.

**Symbols:** D is diameter; H is asteroid absolute magnitude; pv is visible geometric albedo.

**Why this campaign needs it:** the response cannot estimate energy until it replaces the assumed albedo with measured constraints.

**Equation:** wavelength_peak × T = 2.90 × 10^-3 m K

**What it is for:** estimating surface temperature from the peak thermal wavelength.

**Symbols:** wavelength_peak is the peak wavelength; T is temperature in kelvin.

**Why this campaign needs it:** temperature and thermal flux together constrain the asteroid's emitting area.

## Main story happening - designer summary

The player first reproduces the convenient 106 m estimate that assumed pv = 0.25. At CHAR, reflected-light and thermal loci intersect near D = 260 m and pv = 0.041. A thermal sweep confirms a roughly 285 K color temperature. The combined readings also preserve unequal light-curve maxima as a structural clue. The correct result is bad news: consequence planning must use a 230-290 m body.

### Designer intent - not shown to player

Mission 6 delivers Twist 1 through a fair scientific degeneracy. It teaches H, albedo, thermal radiation, diameter scaling, and the difference between estimating size and inferring shape.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. All beats use dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no movie is required.*

**Beat 1 - On arrival at Survey Telescope | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Sanaa Vale, physical-characterization lead, appears by radio: “The brightness is measured. The diameter is still an assumption.”

**Panel/HUD text:** THE DARKER ANSWER / MISSION ACTIVE

**Dialogue bubbles -** Sanaa Vale: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 21.

**Beat 2 - After Stop 21 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The 106 m estimate receives ASSUMES pv = 0.25. Waypoint: FLY TO EAST SUMMIT — MEASURE HEAT, NOT JUST REFLECTION.

**Panel/HUD text:** THE DARKER ANSWER / FIRST RESULT LOGGED

**Dialogue bubbles -** Sanaa Vale: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Spectroscopy Dome waypoint and Stop 22.

**Beat 3 - After Stop 22 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The sizing-board shows reflected-light and thermal curves crossing at one region.

**Panel/HUD text:** THE DARKER ANSWER / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Sanaa Vale: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 23.

**Beat 4 - After Stop 23 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Diameter range locks at 230-290 m; the albedo marker falls to 0.041.

**Panel/HUD text:** THE DARKER ANSWER / DECISION EVIDENCE READY

**Dialogue bubbles -** Sanaa Vale: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 24.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Consequence class changes from LOCAL to REGIONAL; the unequal light-curve peaks remain tagged STRUCTURE UNRESOLVED.

**Panel/HUD text:** THE DARKER ANSWER / MISSION DECISION LOGGED

**Dialogue bubbles -** Sanaa Vale: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 6 outcome, metric screen, concept review, and Mission 7 briefing.

## Location plan

**Two locations:** DISC Stop 1, then CHAR Stops 2-4. Visible photometry establishes the degeneracy; only the characterization dome has thermal and spectral measurements to break it.

## Characters and dramatic beat

Sanaa refuses the convenient bright-surface assumption. Evelyn joins by radio and needs a size range before changing public consequence language. The player's larger estimate raises the stakes and costs trust, but it also prevents an order-of-magnitude energy underestimate.

## Key concepts, explained here

Absolute magnitude H standardizes reflected brightness. Albedo changes how much sunlight a surface returns. Diameter and albedo therefore trade off along one reflected-light locus. Thermal flux measures emitting area after temperature is constrained. Because mass scales with diameter cubed, a factor of 2.5 in diameter changes energy by roughly a factor of 16 at fixed density and speed.

## Stop 21 - Reproduce the assumption

**Format/placement:** BALLPARK, at `dome-console`.

**Metadata:** Concept: H-to-diameter estimate; Keystone: albedo-size degeneracy; Area: Spectroscopy Dome; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** The team must expose the assumption behind the public 100 m estimate before replacing it.

**Question card story setup - exact player copy:** The certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Estimate the diameter produced by that assumption and label the preliminary result as explicitly conditional.

**Question card story-science connection - exact player copy:** Reproducing the old estimate shows that the arithmetic was sound even though the physical assumption may be wrong.

**Player-visible data and equations - exact player copy:** H = 22.0; geometric albedo pv = 0.25; constant = 1329 km; equation D(km) = 1329 × 10^(−H/5) / √pv; conversion = 1000 m/km.

**Complete format-specific interaction block:**

~~~yaml
estimate:
  labels: [constant, magnitude factor, albedo factor]
  values: [[1329 km], [10^(-22/5)], [1/sqrt(0.25)]]
  slots: [constant, magnitude, albedo]
  template: 1329 × 10^(-H/5) / sqrt(pv)
  formula: asteroid diameter from H and albedo
  target: 0.106
  correct: 0.106 km or 106 m
  tolerance: 8 percent
~~~

**Question card prompt - exact player copy:** Using every displayed input, submit one conditional diameter in meters.

**Expected submission - exact player copy:** one conditional diameter in meters

**Correct result:** 0.106 km = 106 m; accept 98-114 m.

**Answer text:** The early estimate is about 106 m only if the surface reflects 25% under the adopted geometric model.

**Why:** Lower albedo requires a larger area to produce the same reflected brightness.

**Wrong-path feedback:** Keep the square root of albedo in the denominator and convert kilometers to meters at the end.

**State/output:** The old estimate gains an ASSUMED ALBEDO label; CHAR waypoint unlocks.

## Stop 22 - Break the reflected-light locus

**Format/placement:** DEGENERACY, at `sizing-board`.

**Metadata:** Concept: diameter-albedo degeneracy; Keystone: albedo-size; Area: Spectroscopy Dome; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** Reflected light alone leaves many diameter and albedo pairs that fit H = 22.0.

**Question card story setup - exact player copy:** With the conditional 106 m result visible, slide diameter and albedo along every pair that matches the reflected brightness. Then add the thermal-area constraint and locate the smaller region that satisfies both.

**Question card story-science connection - exact player copy:** The intersection, not either measurement alone, sets the diameter used for impact energy.

**Player-visible data and equations - exact player copy:** Control 1 is diameter D from 80–320 m; Control 2 is visible albedo pv from 0.02–0.30. Constraint A is reflected brightness H = 22.0; Constraint B is thermal flux at 10.2 μm. Required submission units are meters and dimensionless albedo.

**Required action order - exact player copy:** MOVE BOTH NUMERICAL CONTROLS → MATCH H = 22.0 → ADD THE 10.2 μm THERMAL CONSTRAINT → SUBMIT THE INTERSECTION PAIR.

**Complete format-specific interaction block:**

~~~yaml
degeneracy:
  controls:
    - {id: diameter_m, label: Diameter, min: 80, max: 320, step: 20}
    - {id: albedo, label: Visible albedo, min: 0.02, max: 0.30, step: 0.01}
  tolerance: 0.08
  first_locus:
    - [100, 0.28]
    - [120, 0.19]
    - [160, 0.11]
    - [200, 0.070]
    - [240, 0.049]
    - [260, 0.041]
    - [300, 0.031]
  second_locus:
    label: Thermal emitting-area constraint
    points:
      - [230, 0.050]
      - [260, 0.041]
      - [290, 0.034]
  physical_constraint: thermal flux at 10.2 micrometers
  truth_pair: [260, 0.041]
  answerText: Reflected and thermal measurements intersect near 260 m and pv = 0.041.
~~~

**Question card prompt - exact player copy:** Submit the numerical pair (D in meters, pv dimensionless) that satisfies both the reflected-light and thermal controls.

**Expected submission - exact player copy:** one numerical pair that satisfies both named controls

**Correct result:** D = 260 m, pv = 0.041; diameter range 230-290 m.

**Answer text:** The asteroid is large and dark, not small and bright.

**Why:** Two measurements with different parameter dependence break a degeneracy.

**Wrong-path feedback:** A point on only one curve is still ambiguous; find where both physical constraints overlap.

**State/output:** Sizing board locks 230-290 m; Stop 23 unlocks.

## Stop 23 - Check the thermal temperature

**Format/placement:** SWEEP, at `spectrograph`.

**Metadata:** Concept: Wien relation; Keystone: light/thermal characterization; Area: Spectroscopy Dome; Learning role: PRACTICE; Difficulty: L3; Story role: verification.

**Call - exact player copy:** Go to the thermal spectrograph, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The emitting-area result depends on a defensible surface temperature.

**Question card story setup - exact player copy:** Because the thermal locus selects a large dark body, sweep model temperature and compare the predicted spectral peak with the observed 10.2-micrometer maximum. Choose the temperature that aligns the shape before accepting the area.

**Question card story-science connection - exact player copy:** A correct temperature prevents a hot small body from imitating a cooler large one.

**Player-visible data and equations - exact player copy:** Observed peak λmax = 10.2 μm; Wien constant b = 2898 μm·K; equation T = b/λmax; temperature control values = 220, 250, 270, 285, 300, 330 K; acceptance is |model peak − 10.2 μm| ≤ 0.3 μm.

**Required action order - exact player copy:** CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET.

**Complete format-specific interaction block:**

~~~yaml
sweep:
  control: {label: temperature, unit: K, values: [220, 250, 270, 285, 300, 330]}
  predicted_peak_micrometers: [13.2, 11.6, 10.7, 10.2, 9.7, 8.8]
  observed_peak_micrometers: 10.2
  goal: absolute peak mismatch no more than 0.3 micrometers
  correct_setting: 285
  answerText: A temperature near 285 K reproduces the observed thermal peak.
~~~

**Question card prompt - exact player copy:** Calculate and commit the predicted temperature in kelvin before the temperature control unlocks; then operate the sweep, measure the model peak in micrometers, and submit the setting plus PASS or FAIL.

**Expected submission - exact player copy:** one temperature setting in kelvin, one measured peak in micrometers, and one PASS-or-FAIL conclusion

**Correct result:** 285 K.

**Answer text:** The thermal color temperature is about 285 K, supporting the large emitting area.

**Why:** Wien's law links a thermal spectrum's peak wavelength inversely to temperature.

**Wrong-path feedback:** Match the spectral peak, not the highest temperature or largest total flux.

**State/output:** Thermal constraint changes from PROVISIONAL to VERIFIED; Stop 24 unlocks.

## Stop 24 - Adopt the consequence body

**Format/placement:** DIAGNOSIS, at `sizing-board`.

**Metadata:** Concept: physical characterization; Keystone: size/structure; Area: Spectroscopy Dome; Learning role: TRANSFER; Difficulty: L4; Story role: decision/Twist 1.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** Evelyn cannot update consequences until one physical explanation fits brightness, heat, and the light curve.

**Question card story setup - exact player copy:** With diameter and temperature constrained, compare explanations against H = 22.0, pv = 0.041, the 230-290 m thermal size, and unequal light-curve maxima. Name the physical model that fits every independent reading.

**Question card story-science connection - exact player copy:** The diagnosis sets both the energy range and the unresolved structure risk carried into radar.

**Complete format-specific interaction block:**

~~~yaml
headline: Which physical model fits all current characterization data?
readings:
  - {zone: visible, label: Absolute magnitude H, value: 22.0, status: quiet}
  - {zone: thermal, label: Diameter, value: 230-290 m, status: alarm}
  - {zone: surface, label: Albedo, value: 0.041, status: low}
  - {zone: rotation, label: Light curve, value: unequal double maxima, status: high}
choices:
  - {id: small_bright, label: 106 m bright sphere, mechanism: contradicts thermal area and low albedo}
  - {id: large_dark_round, label: 260 m dark sphere, mechanism: fits size but not unequal double maxima}
  - {id: large_dark_irregular, label: 260 m dark irregular or two-lobed body, mechanism: fits all readings}
  - {id: comet_coma, label: Small active comet with bright coma, mechanism: would raise visible area and show activity}
answer: large_dark_irregular
answerText: Use a 230-290 m dark irregular-body model and keep internal structure unresolved.
~~~

**Question card prompt - exact player copy:** Diagnose the one model that fits every reading, including the quiet lack of visible activity.

**Expected submission - exact player copy:** one physical-model diagnosis and one consequence-planning action

**Correct result:** Large, dark, irregular or two-lobed body.

**Answer text:** Consequence planning must use a roughly 260 m dark body while radar tests its structure.

**Why:** Thermal area breaks the size-albedo degeneracy; the light curve adds shape information without proving a binary.

**Wrong-path feedback:** A model that fits diameter but ignores the unequal rotation signature is incomplete.

**State/output:** Consequence class changes to REGIONAL; radar structure request unlocks.

## Mission outcome

Mission decision: Plan for a dark body that is 230–290 m wide. Its heat shows that it is larger than first thought. Its light may point to two lobes. Radar must test its shape and path.

**Pre-card character beat:** Sanaa Vale, physical-characterization lead, moves the 106 m card into ASSUMPTIONS. Evelyn Park says by radio, “Then the warning must change before the next headline changes it for us.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 6 COMPLETE

**Timer:** TIME {elapsed} / TARGET 13:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The larger dark body improves the model but forces a more severe public consequence class.

**Automatic bar change:** IMPACT SOLUTION +5 | RESPONSE READINESS +4 | OBSERVING RESERVE -5 | PUBLIC TRUST -8

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Reserve +3, Trust +7; bars 80 / 72 / 66 / 66; bank 0.

**Failure check:** Public Trust at 0% blocks later county action and restores the mission-start snapshot.

## Quick concept review

- Visible brightness mixes size and albedo.
- Thermal spectra constrain temperature and emitting area.
- Mass and energy will scale with diameter cubed.
- A light curve can suggest shape without proving structure.
- **Mission takeaway:** Break a degeneracy with evidence that depends on the unknowns in a different way.

---

# Mission 7 - The Echo Clock

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 8 DAYS

**Card title:** THE ECHO CLOCK

**Go now:** Go to the Coordination Office and meet Mira Chen at the scopeboard before traveling to the Bistatic Radar Range.

**Card body:** Radar can measure an asteroid's distance and line-of-sight speed far more precisely than optical angles alone. Tonight's echo is faint, and a shared timing error could manufacture confidence. Trace the clocks, correct the delay, and decide what the returning shape permits you to claim. By the end of the mission, you will deliver one radar constraint the orbit team can safely use.

**Objective:** Deliver one independently timed radar constraint the orbit team can safely use.

### Worth knowing first - exact player copy

#### Glossary terms

Range: distance inferred from a radar echo’s round-trip travel time.

Doppler shift: a frequency change caused by motion toward or away from the radar.

Residual: the measured value minus the value predicted by a model.

UTC: the shared time standard used to compare observations from different systems.

#### Primer concepts

- Radar delay measures distance while Doppler measures line-of-sight motion.
- A shared clock error shifts many measurements together and cannot be averaged away.
- A weak unexplained feature should be preserved without being named prematurely.

#### Equations first needed today

**Equation:** R = cΔt / 2

**What it is for:** converting round-trip echo delay into range

**Symbols:** R is range; c is light speed; Δt is round-trip delay; the factor two covers outward and return travel

**Why this campaign needs it:** The orbit fit needs a defensible distance measurement.

**Crew on this mission - mission log:** Mira Chen, Tomás Ibarra, Malik Rowan.

## Main story happening - designer summary

**Story purpose:** Turn a faint echo into an independent orbital constraint while preserving a suspicious second shoulder.

**Learning goals:** timing traceability; radar ranging; Doppler sign; evidential restraint.

**Route:** OPS Coordination Office -> RADAR Bistatic Radar Range.

**Cast:** Mira Chen, Tomás Ibarra, Malik Rowan.

**Unlock:** radar-console, tracking-clock panel, echo archive.

**Target time:** 10:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no pre-rendered sequence or forced viewpoint change is required.*

**Beat 1 - On arrival at Coordination Office | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** At OPS, Mira refuses to transmit an untraced timestamp.

**Panel/HUD text:** THE ECHO CLOCK / MISSION ACTIVE

**Dialogue bubbles -** Tomás Ibarra: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 25.

**Beat 2 - After Stop 25 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The aircraft carries the player to RADAR while Tomás explains the narrow observing window.

**Panel/HUD text:** THE ECHO CLOCK / FIRST RESULT LOGGED

**Dialogue bubbles -** Tomás Ibarra: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 26.

**Beat 3 - After Stop 26 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A corrected echo lands exactly where one surviving orbit family predicts.

**Panel/HUD text:** THE ECHO CLOCK / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Tomás Ibarra: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 27.

**Beat 4 - After Stop 27 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A weaker shoulder appears beside the main return; Tomás preserves it without naming it.

**Panel/HUD text:** THE ECHO CLOCK / DECISION EVIDENCE READY

**Dialogue bubbles -** Tomás Ibarra: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 28.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ECHO CLOCK / MISSION DECISION LOGGED

**Dialogue bubbles -** Tomás Ibarra: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 7 outcome, metric screen, concept review, and Mission 8 briefing.

## Location plan

**Mission route:** OPS Coordination Office -> RADAR Bistatic Radar Range.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Mira Chen, Tomás Ibarra, Malik Rowan.   The central beat is: Turn a faint echo into an independent orbital constraint while preserving a suspicious second shoulder.

## Key concepts, explained here

Radar delay measures distance while Doppler measures line-of-sight motion. A shared clock error shifts many measurements together and cannot be averaged away. A weak unexplained feature should be preserved without being named prematurely. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

## Stop 25 - Trace the time chain

**Format/placement:** TRACE, at `scopeboard`.

**Metadata:** Concept: radar timing; Keystone: systems/verification; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** A radar range is only as defensible as the clocks behind its delay.

**Question card story setup - exact player copy:** The radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Trace the timestamp from observatory receipt backward and flag the device that can shift every derived range together.

**Question card story-science connection - exact player copy:** A shared clock error creates a systematic offset, not four independent noisy measurements.

**Player-visible data and equations - exact player copy:** Trace four labelled channels. Archived main delay, archived shoulder delay, and archive Doppler time share the archive server; an independent receiver-clock monitor bypasses it. The archive reads +0.7 s relative to the 0.0 s UTC expectation; all earlier clocks pass. Correction = expected − reading = −0.7 s.

**Required action order - exact player copy:** OPEN EACH DEPENDENCY → COMPARE READING WITH EXPECTED VALUE → IDENTIFY THE GOVERNING FAILURE → SUBMIT THE SIGNED CORRECTION.

**Question card prompt - exact player copy:** Submit one completed timing chain, identify the common failure point, and give the signed correction in seconds.

**Expected submission - exact player copy:** one completed dependency chain and conclusion

**Complete format-specific interaction block:**

~~~yaml
trace:
  shared_resources:
    - {id: archive_server, label: Archive server clock, reading_offset_s: 0.7, expected_offset_s: 0.0}
    - {id: utc_receiver, label: Independent UTC receiver, reading_offset_s: 0.0, expected_offset_s: 0.0}
  target: archive_server
  channels:
    - {id: main_delay, label: Archived main-echo delay, reading: shifted +0.7 s, expected: zero archive offset, depends_on: [archive_server]}
    - {id: shoulder_delay, label: Archived shoulder delay, reading: shifted +0.7 s, expected: zero archive offset, depends_on: [archive_server]}
    - {id: doppler_time, label: Archive Doppler timestamp, reading: shifted +0.7 s, expected: zero archive offset, depends_on: [archive_server]}
    - {id: receiver_monitor, label: Independent receiver-clock monitor, reading: 0.0 s offset, expected: 0.0 s offset, depends_on: [utc_receiver]}
  truth: {dependent_channels: [main_delay, shoulder_delay, doppler_time], independent_channels: [receiver_monitor]}
  correct: Archive server is the shared failure; apply −0.7 s to its stored receipt times.
~~~

**Correct result:** Flag the archive server and subtract 0.7 s from archived receipt times.

**Answer text:** The archive clock is common to every stored echo, so its offset shifts the whole set.

**Why:** TRACE follows provenance until one upstream cause explains correlated downstream error.

**Wrong-path feedback:** Do not average away an offset shared by every archived return.

**State/output:** CORRECTED TIME CHAIN prints; RADAR travel unlocks.

## Stop 26 - Protect the observing protocol

**Format/placement:** PROTOCOL, at `tracking-clock`.

**Metadata:** Concept: radar acquisition; Keystone: procedure/control; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L4; Story role: method.

**Call - exact player copy:** Go to the radar timing board, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The team needs a sequence that prevents the correction from contaminating raw evidence.

**Question card story setup - exact player copy:** Tomás can repair the archive, but overwriting the raw packet would destroy the audit trail. Put the correction, calibration pulse, target integration, and independent clock comparison into a defensible operational order.

**Question card story-science connection - exact player copy:** Reproducible science preserves raw data and records every transformation.

**Question card prompt - exact player copy:** Arrange the radar protocol from first action to released product.

**Expected submission - exact player copy:** one ordered six-step procedure

**Complete format-specific interaction block:**

~~~yaml
scenarios:
  - Raw packet arrives
  - Clock difference is found
  - Correction is approved
  - Calibration pulse is available
  - Target echo is integrated
  - Product is ready for release
choices:
  - Preserve the raw packet
  - Compare clocks and record the correction
  - Apply the recorded correction to a working copy
  - Process the calibration pulse
  - Integrate the target return
  - Release the corrected echo with provenance
mapping:
  raw_arrival: Preserve the raw packet
  clock_difference: Compare clocks and record the correction
  correction_approved: Apply the recorded correction to a working copy
  calibration_available: Process the calibration pulse
  target_integrated: Integrate the target return
  ready_for_release: Release the corrected echo with provenance
~~~

**Correct result:** Preserve -> compare -> record -> calibrate -> integrate -> release.

**Answer text:** Calibration and correction remain reversible because the untouched packet survives.

**Why:** A protocol orders controls before interpretation and preserves provenance.

**Wrong-path feedback:** Applying a silent correction first makes later verification impossible.

**State/output:** Audit-safe radar run begins; Stop 27 unlocks.

## Stop 27 - Read delay and Doppler

**Format/placement:** PROBE, at `radar-console`.

**Metadata:** Concept: range and radial speed; Keystone: equations/interpretation; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The echo must become two physical measurements without confusing their jobs.

**Question card story setup - exact player copy:** The corrected return arrives 0.080 seconds after transmission and shifts toward the transmitter. Probe the clock, delay, Doppler, and background stations; calculate range and classify radial motion without inferring sideways speed.

**Question card story-science connection - exact player copy:** Delay and Doppler constrain different components of the orbit.

**Player-visible data and equations - exact player copy:** Four stations must be sampled. Clock reading = 0.000 s after correction, expected = 0.000 s; round-trip delay Δt = 0.080 s; c = 3.00 × 10^8 m/s; R = cΔt/2; 1000 m = 1 km. Doppler shifts toward the transmitter; background S/N = 1.1, expected ≤ 1.5.

**Required action order - exact player copy:** CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET.

**Question card prompt - exact player copy:** Calculate and commit range in kilometers; then probe all four stations, measure each reading, and submit the range plus APPROACHING or RECEDING.

**Expected submission - exact player copy:** four station readings, one range in kilometers, and one radial-motion classification

**Complete format-specific interaction block:**

~~~yaml
probe:
  prediction_commit_required: true
  equipment_unlocks_after_commit: true
  points:
    - id: corrected_clock
      load: "Corrected timing reference; verify zero residual clock offset before using the echo."
      reading: {clock_offset_s: 0.000}
      expected: {clock_offset_s: 0.000}
      comparison: "The observed offset equals the station-specific zero-offset expectation."
    - id: delay_channel
      load: "Round-trip echo timing; calculate R = cΔt/2 using c = 3.00 × 10^8 m/s and Δt = 0.080 s."
      reading: {round_trip_delay_s: 0.080}
      expected: {one_way_range_km: 12000}
      comparison: "The calculated 12,000 km range is the station-specific expected result."
    - id: doppler_channel
      load: "Frequency-shift direction relative to the transmitter; do not infer transverse speed."
      reading: {shift_direction: toward_transmitter}
      expected: {radial_motion: approaching}
      comparison: "A shift toward the transmitter specifically means APPROACHING radial motion."
    - id: background_channel
      load: "Off-target background gate; check that noise cannot imitate the timed return."
      reading: {signal_to_noise: 1.1}
      expected: {maximum_signal_to_noise: 1.5}
      comparison: "The background stays below its station-specific 1.5 limit."
  correct_submission: {range_km: 12000, radial_motion: approaching}
  required_samples: [corrected_clock, delay_channel, doppler_channel, background_channel]
  truth: {range_km: 12000, radial_motion: approaching}
  commit_gate: All four stations sampled after the range prediction is committed.
~~~

**Correct result:** 12,000 km range; object is approaching along the line of sight.

**Answer text:** Delay gives distance, while the frequency shift gives only radial-motion direction.

**Why:** Round-trip light time is halved; Doppler does not reveal transverse velocity.

**Wrong-path feedback:** A one-way calculation doubles range, and Doppler alone cannot supply the full velocity vector.

**State/output:** RANGE 12,000 KM and APPROACHING enter the orbit packet.

## Stop 28 - Freeze the claim before the image

**Format/placement:** HOLDOUT, at `echo-archive`.

**Metadata:** Concept: echo interpretation; Keystone: bias/verification; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L5; Story role: judgment.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The team must state its prediction before viewing the integrated echo.

**Question card story setup - exact player copy:** Malik's surviving orbit predicts the main echo window, but the integrated image remains hidden. Freeze the expected delay band and rejection condition before revealing a strong return plus a weak adjacent shoulder.

**Question card story-science connection - exact player copy:** A holdout test separates prediction from explanation after the fact.

**Player-visible data and equations - exact player copy:** Predicted main-echo acceptance window = expected delay ±0.004 s; reject the orbit constraint if the main return falls outside. The integrated image unlocks only after commitment; then measure main-return offset and record whether a shoulder exists.

**Required action order - exact player copy:** COMMIT THE EXPECTED DELAY WINDOW AND REJECTION RULE → REVEAL THE HOLDOUT IMAGE → MEASURE THE MAIN RETURN AND SHOULDER → INTERPRET BOTH.

**Question card prompt - exact player copy:** Commit the ±0.004 s window and rejection rule first; after reveal, submit the main-return offset in seconds, shoulder status, and ACCEPT or REJECT.

**Expected submission - exact player copy:** one committed prediction followed by one evidence-based conclusion

**Complete format-specific interaction block:**

~~~yaml
holdout:
  commit_required: true
  fit: {main_echo_window_s: [-0.004, 0.004], reject_outside_window: true}
  reveal_after_commit: {main_echo_offset_s: 0.001, weak_adjacent_shoulder: present}
  score:
    main_range_constraint: accept
    shoulder_status: unexplained
  correct_conclusion: accept_main_range_and_preserve_unexplained_shoulder
~~~

**Correct result:** Accept the main constraint; label the shoulder unresolved.

**Answer text:** The main return passes the frozen test, while the shoulder becomes a clue rather than a conclusion.

**Why:** Pre-registration limits hindsight bias and protects anomalies for later testing.

**Wrong-path feedback:** Neither deleting the shoulder nor naming it a fragment is justified yet.

**State/output:** RADAR CONSTRAINT VALID; SECOND SHOULDER UNRESOLVED.

## Mission outcome

Mission decision: Accept the fixed main radar echo as a new range and speed check. Keep the weak shoulder marked as unknown. The orbit can now shrink without hiding that clue.

**Pre-card character beat:** Tomás sends Malik the traced radar packet and keeps the weak shoulder in a separate evidence lane.

### Post-mission metric screen - exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Tomás sends Malik the traced radar packet and keeps the weak shoulder in a separate evidence lane.



**Automatic change:** IMPACT SOLUTION +10 | OBSERVING RESERVE -6.

**Canonical QA allocation:** 10 RP; Reserve +2, Trust +2, Solution +6 -> bars 90 / 72 / 68 / 68.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Radar delay gives range; Doppler gives radial motion; shared timing errors are systematic; a holdout protects anomalies from hindsight.

- **Mission takeaway:** Correct the clock, freeze the prediction, and keep unexplained structure alive.

---

# Mission 8 - The Orbit Narrows

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 7 DAYS, 12 HOURS

**Card title:** THE ORBIT NARROWS

**Go now:** Go to the Radar Range and meet Tomás Ibarra at the radar console, then carry the traced packet to Orbit Determination.

**Card body:** Optical angles describe direction, while radar adds distance and radial speed. Together they can shrink the encounter cloud dramatically, but duplicated measurements can create false precision. Transfer only traced evidence, refit the orbit, and test which planning statement survives. By the end of the mission, you will issue a revised impact probability with its assumptions attached.

**Objective:** Combine optical and radar evidence into a revised impact probability without double-counting shared errors.

### Worth knowing first - exact player copy

#### Glossary terms

Data fusion: combining complementary measurements in one model.

Covariance: linked uncertainty between fitted quantities or measurements.

B-plane: an imagined target plane used to describe a close planetary encounter.

Independent evidence: evidence that does not share the same likely source of error.

#### Primer concepts

- Optical angles and radar range constrain different parts of an orbit.
- Measurement weight depends on uncertainty and covariance, not the number of rows.
- An impact probability describes an ensemble of allowed paths, not a single certain trajectory.

#### Equations first needed today

No new equation is introduced; this mission retrieves equations and evidence rules already recorded in the mission log.

**Crew on this mission - mission log:** Tomás Ibarra, Malik Rowan, Mira Chen.

## Main story happening - designer summary

**Story purpose:** Collapse the orbit cloud to a decision-relevant corridor and a 63% impact probability.

**Route:** RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.

**Cast:** Tomás Ibarra, Malik Rowan, Mira Chen.

**Target time:** 10:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistentis required.*

**Beat 1 - On arrival at Bistatic Radar Range | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Tomás transfers only products with complete provenance.

**Panel/HUD text:** THE ORBIT NARROWS / MISSION ACTIVE

**Dialogue bubbles -** Malik Rowan: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 29.

**Beat 2 - After Stop 29 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Malik balances optical and radar weights.

**Panel/HUD text:** THE ORBIT NARROWS / FIRST RESULT LOGGED

**Dialogue bubbles -** Malik Rowan: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 30.

**Beat 3 - After Stop 30 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The b-plane cloud contracts across Earth's disk.

**Panel/HUD text:** THE ORBIT NARROWS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 31.

**Beat 4 - After Stop 31 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira asks for the strongest defensible sentence, not the largest number.

**Panel/HUD text:** THE ORBIT NARROWS / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 32.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ORBIT NARROWS / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 8 outcome, metric screen, concept review, and Mission 9 briefing.

## Location plan

**Mission route:** RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Tomás Ibarra, Malik Rowan, Mira Chen.   The central beat is: Collapse the orbit cloud to a decision-relevant corridor and a 63% impact probability.

## Key concepts, explained here

Optical angles and radar range constrain different parts of an orbit. Measurement weight depends on uncertainty and covariance, not the number of rows. An impact probability describes an ensemble of allowed paths, not a single certain trajectory. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

 world changes, or waypoint notices; no pre-rendered sequence or forced viewpoint change

## Stop 29 - Transfer the evidence chain

**Format/placement:** CHAIN, at `radar-console`.

**Metadata:** Concept: data fusion; Keystone: provenance; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The orbit team needs to know which radar products share corrections.

**Question card story setup - exact player copy:** Four radar products are ready, but two inherit the same archive-clock correction and cannot count as independent confirmation. Build the evidence chain from raw packets through calibration to released range and Doppler products.

**Question card story-science connection - exact player copy:** Provenance prevents correlated products from masquerading as separate evidence.

**Required action order - exact player copy:** CONNECT RAW SOURCES → CONNECT CORRECTIONS AND CALIBRATION → CONNECT RELEASED PRODUCTS → IDENTIFY THE GOVERNING SHARED LINK.

**Question card prompt - exact player copy:** Submit the completed evidence chain and name the correction shared by the range and Doppler products.

**Expected submission - exact player copy:** one completed evidence chain

**Complete format-specific interaction block:**

~~~yaml
chain:
  transfers:
    - {id: raw_a, label: Raw packet A to correction C, carries: uncorrected echo samples and archive time}
    - {id: range_a, label: Correction C to range product A, carries: corrected round-trip delay}
    - {id: doppler_a, label: Correction C to Doppler product A, carries: corrected frequency shift and shared time provenance}
    - {id: raw_b, label: Raw packet B to clock B, carries: independent echo samples and time}
    - {id: range_b, label: Clock B to range product B, carries: independent round-trip delay}
    - {id: gain, label: Calibration pulse to gain model, carries: echo-power calibration}
  order: [raw_a, range_a, doppler_a, raw_b, range_b, gain]
  decoys:
    - {id: independent_a_products, label: Treat range A and Doppler A as independent}
    - {id: clock_b_to_a, label: Route packet A through independent clock B}
  governing_relationship: Range A and Doppler A share correction C; range B has an independent clock path.
  correct: [raw_a, range_a, doppler_a, raw_b, range_b, gain]
~~~

**Correct result:** Mark A-products as correlated; preserve B-range as independent.

**Answer text:** Shared correction C links two products even though their reported units differ.

**Why:** CHAIN exposes dependency through transformations.

**Wrong-path feedback:** Different output columns do not guarantee independent error sources.

**State/output:** FUSION MANIFEST signed; travel to ORBIT.

## Stop 30 - Balance the fit

**Format/placement:** BALANCE, at `fit-board`.

**Metadata:** Concept: weighted fit; Keystone: uncertainty/modeling; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L5; Story role: model.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** One precise radar point must not erase the sky-plane information in many optical points.

**Question card story setup - exact player copy:** The radar range has tiny uncertainty, while optical positions provide the longer time baseline and transverse motion. Balance the datasets by documented uncertainty and correlation, then reject equal weighting and simple vote counting.

**Question card story-science connection - exact player copy:** Complementary geometry, properly weighted, constrains more orbit dimensions than either dataset alone.

**Player-visible data and equations - exact player copy:** Count the optical sky-plane stream and the independent radar range stream. Keep Doppler in the radar covariance group, but do not count the archive-clock diagnostic as a third observation. Weight counted streams by inverse variance and preserve their named covariance groups.

**Question card prompt - exact player copy:** Choose and justify the defensible fusion weighting.

**Expected submission - exact player copy:** one weighting plan and its covariance justification

**Complete format-specific interaction block:**

~~~yaml
balance:
  target: {label: Defensible fused orbit, value: one, unit: solution}
  streams:
    - {id: optical, label: Optical sky-plane positions, information: sky-plane position and long time baseline, correlation_group: optical_pipeline, count: true}
    - {id: radar_range, label: Independent radar range, information: line-of-sight distance, correlation_group: radar_clock, count: true}
    - {id: radar_doppler, label: Radar Doppler, information: radial motion, correlation_group: radar_clock, count: true}
    - {id: clock_diagnostic, label: Archive-clock diagnostic, information: provenance for radar products, correlation_group: radar_clock, count: false}
  candidates:
    - Equal weight per row
    - Radar only
    - Inverse-variance weighting with covariance groups
    - Majority vote by observatory
  correctChoice: Inverse-variance weighting with covariance groups
  rationale: Weight by documented uncertainty while preventing correlated products from being counted as independent.
~~~

**Correct result:** Weight by uncertainty while grouping correlated radar products.

**Answer text:** Precision controls weight, covariance prevents double-counting, and optical timing preserves transverse information.

**Why:** BALANCE trades influence according to information content and dependence.

**Wrong-path feedback:** The smallest error bar does not make every other geometric constraint irrelevant.

**State/output:** COMBINED FIT converges; Stop 31 unlocks.

## Stop 31 - Read the b-plane cloud

**Format/placement:** CLOUD, at `astro-bench`.

**Metadata:** Concept: encounter uncertainty; Keystone: probability/visualization; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: interpretation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The fitted orbit must be translated into an impact probability without treating the nominal point as destiny.

**Question card story setup - exact player copy:** The combined trials form a narrow cloud crossing Earth's b-plane disk; 63 percent intersect the disk. Classify the remaining miss solutions and state what the cloud does and does not establish.

**Question card story-science connection - exact player copy:** Impact probability is the fraction of justified orbit trials that intersect Earth under the model.

**Required action order - exact player copy:** COUNT IMPACT AND MISS TRIALS → CALCULATE BOTH FRACTIONS → INTERPRET THE ENSEMBLE → SUBMIT THE OPERATIONAL CONCLUSION.

**Player-visible data and equations - exact player copy:** Combined orbit ensemble = 10,000 weighted trials: 6300 intersect Earth and 3700 miss. Impact probability = impacts/total × 100%.

**Question card prompt - exact player copy:** Submit the impact and miss fractions in percent and one operational conclusion: IMPACT LEADING CASE or IMPACT CERTAIN.

**Expected submission - exact player copy:** two numerical fractions in percent and one operational conclusion

**Complete format-specific interaction block:**

~~~yaml
cloud:
  total_weighted_trials: 10000
  impact_trials: 6300
  miss_trials: 3700
  points:
    - {id: impact_set, setting: Earth intersection, reading: 6300 weighted trials}
    - {id: miss_set, setting: outside Earth, reading: 3700 weighted trials}
  equation: probability_percent = count / total_weighted_trials * 100
  expected: {impact_percent: 63, miss_percent: 37}
  correct_conclusion: impact_leading_case
  rejected_conclusion: impact_certain
~~~

**Correct result:** Impact is the leading case at 63%, with a material 37% miss set.

**Answer text:** Planning should intensify while observations continue to test both impact and miss solutions.

**Why:** A probability cloud represents distributed uncertainty, not a single certain track.

**Wrong-path feedback:** A nominal trajectory cannot replace the ensemble that produced the probability.

**State/output:** IMPACT PROBABILITY 63%; corridor work unlocks.

## Stop 32 - Stress the planning sentence

**Format/placement:** STRESS, asked by Malik Rowan beside `fit-board`.

**Metadata:** Concept: robust conclusion; Keystone: decisions/uncertainty; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Malik Rowan, at the orbit-fit board in the Orbit Determination Center.

**Stop reason - exact player copy:** The public statement must survive justified changes in weighting and one-data-source removal.

**Question card story setup - exact player copy:** Malik reruns the fit with conservative optical errors, doubled radar errors, and each observatory removed once. Probabilities range from 55 to 69 percent, so test which proposed planning statement survives every run.

**Question card story-science connection - exact player copy:** Robust actions can survive meaningful numerical variation.

**Player-visible data and equations - exact player copy:** Stress-test results: conservative optical errors = 55%, doubled radar errors = 59%, leave-one-observatory-out trials = 57–69%. Compare every result with the 50% leading-case boundary; none establishes certainty.

**Required action order - exact player copy:** RUN OR REVEAL EACH STRESS TEST → MEASURE THE MINIMUM AND MAXIMUM PROBABILITY → COMPARE WITH THE PLANNING BOUNDARY → INTERPRET.

**Question card prompt - exact player copy:** Submit the minimum and maximum probability in percent and one statement that survives every test.

**Expected submission - exact player copy:** one minimum-and-maximum probability pair in percent and one robust planning conclusion

**Complete format-specific interaction block:**

~~~yaml
stress:
  assumption_runs:
    - {label: conservative optical errors, probability_percent: 55}
    - {label: doubled radar errors, probability_percent: 59}
    - {label: leave-one-observatory-out, probability_percent: [57, 69]}
  planning_boundary_percent: 50
  candidates:
    - Impact is certain
    - No action is needed
    - Impact remains the leading case and preparation should intensify
    - The exact corridor is fixed
  correctChoice: Impact remains the leading case and preparation should intensify
  correct_conclusion: impact_remains_leading_case_and_preparation_intensifies
~~~

**Correct result:** State that impact is the leading case and preparation should intensify.

**Answer text:** Every justified run remains above 50%, but none removes location uncertainty.

**Why:** Stress testing separates a stable decision from unstable precision.

**Wrong-path feedback:** Do not promote a robust majority into certainty or a fixed impact point.

**State/output:** 63% CONDITIONAL UPDATE released.

## Mission outcome

Mission decision: Report a 63% chance of impact. Treat impact as the lead case for plans. Keep the miss paths and the wide land band in view.

**Pre-card character beat:** Malik circles the 37% miss set before handing Mira the update. “Those paths are still evidence,” he says.

### Post-mission metric screen - exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Malik circles the 37% miss set before handing Mira the update. “Those paths are still evidence,” he says.



**Automatic change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -4.

**Canonical QA allocation:** 10 RP; Response +3, Reserve +3, Trust +4 -> bars 98 / 72 / 71 / 71.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Fuse complementary measurements; track covariance; read an ensemble, not only its nominal point; stress the decision language.

- **Mission takeaway:** Stronger evidence narrows uncertainty without abolishing it.

---

# Mission 9 - Where It Lands

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 6 DAYS

**Card title:** WHERE IT LANDS

**Go now:** Go to Orbit Determination and meet Malik Rowan at the astro-bench, then carry the corridor to the Entry and Consequences Lab.

**Card body:** The orbit team can now map a long impact corridor, but the same asteroid produces different effects over ocean, desert, or city. Energy sets the scale; entry angle and location shape the outcome. Estimate the energy, model the consequence envelope, and identify the next measurement that changes action. By the end of the mission, you will define where protective planning is justified and where it is premature.

**Objective:** Define where protective planning is justified without drawing a false impact bullseye.

### Worth knowing first - exact player copy

#### Glossary terms

Impact corridor: the set of possible surface locations allowed by the current orbit uncertainty.

Airburst: atmospheric energy release after an object breaks apart or slows rapidly.

Kinetic energy: energy an object has because of its motion.

TNT equivalent: a comparison unit for released energy, not a claim about explosive material.

#### Primer concepts

- Diameter, density, and speed set the approximate energy scale.
- The same energy produces different consequences over ocean, desert, and a populated coast.
- Hazard describes physical effects; risk also includes exposure and vulnerability.

#### Equations first needed today

**Equation:** m = (4/3)πr³ρ

**What it is for:** estimating asteroid mass

**Symbols:** m is mass; r is radius; ρ is density

**Why this campaign needs it:** The consequence model needs mass before it can estimate energy.

**Equation:** KE = ½mv²

**What it is for:** estimating impact kinetic energy

**Symbols:** KE is kinetic energy; m is mass; v is impact speed

**Why this campaign needs it:** Energy sets the scale that the location-specific model distributes.

**Crew on this mission - mission log:** Malik Rowan, Evelyn Park, Jordan Hale.

## Main story happening - designer summary

**Story purpose:** Translate a 260 m impactor into scale-aware, location-dependent planning.

**Route:** ORBIT Orbit Determination Center -> IMPACT Entry & Consequences Lab.

**Cast:** Malik Rowan, Evelyn Park, Jordan Hale.

**Target time:** 11:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, peris required.*

**Beat 1 - On arrival at Orbit Determination Center | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Malik transfers a corridor, not a point.

**Panel/HUD text:** WHERE IT LANDS / MISSION ACTIVE

**Dialogue bubbles -** Evelyn Park: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 33.

**Beat 2 - After Stop 33 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Evelyn forces a rough energy calculation before simulation.

**Panel/HUD text:** WHERE IT LANDS / FIRST RESULT LOGGED

**Dialogue bubbles -** Evelyn Park: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Entry & Consequences Lab waypoint and Stop 34.

**Beat 3 - After Stop 34 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Outcome maps diverge over ocean and land.

**Panel/HUD text:** WHERE IT LANDS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Evelyn Park: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 35.

**Beat 4 - After Stop 35 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan asks what observation can shrink the population under warning.

**Panel/HUD text:** WHERE IT LANDS / DECISION EVIDENCE READY

**Dialogue bubbles -** Evelyn Park: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 36.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** WHERE IT LANDS / MISSION DECISION LOGGED

**Dialogue bubbles -** Evelyn Park: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 9 outcome, metric screen, concept review, and Mission 10 briefing.

## Location plan

**Mission route:** ORBIT Orbit Determination Center -> IMPACT Entry & Consequences Lab.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Malik Rowan, Evelyn Park, Jordan Hale.   The central beat is: Translate a 260 m impactor into scale-aware, location-dependent planning.

## Key concepts, explained here

Diameter, density, and speed set the approximate energy scale. The same energy produces different consequences over ocean, desert, and a populated coast. Hazard describes physical effects; risk also includes exposure and vulnerability. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

sistent world changes, or waypoint notices; no pre-rendered sequence or forced viewpoint change

## Stop 33 - Estimate the energy scale

**Format/placement:** BALLPARK, at `astro-bench`.

**Metadata:** Concept: kinetic energy; Keystone: mechanics/estimation; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The consequence model needs an order-of-magnitude check before detailed simulation.

**Question card story setup - exact player copy:** Use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Estimate mass, kinetic energy, and TNT equivalent closely enough to catch a thousandfold unit mistake.

**Question card story-science connection - exact player copy:** Because energy scales with diameter cubed and speed squared, modest input errors can strongly change consequences.

**Required action order - exact player copy:** CALCULATE RADIUS AND MASS → CALCULATE KINETIC ENERGY → CONVERT JOULES TO MEGATONS → SUBMIT ALL THREE RESULTS.

**Player-visible data and equations - exact player copy:** Diameter D = 260 m, radius r = D/2, density ρ = 1800 kg/m³, speed v = 19 km/s = 19,000 m/s, m = (4/3)πr³ρ, KE = ½mv², and 1 megaton TNT = 4.184 × 10^15 J.

**Question card prompt - exact player copy:** Submit three numerical results with units: mass in kilograms, kinetic energy in joules, and TNT equivalent in megatons.

**Expected submission - exact player copy:** three numerical values: mass in kilograms, energy in joules, and TNT equivalent in megatons

**Complete format-specific interaction block:**

~~~yaml
estimate:
  labels: [volume and mass, kinetic energy, TNT conversion]
  values:
    - ["D = 260 m", "ρ = 1800 kg/m³", "m = (4/3)π(D/2)³ρ"]
    - ["v = 19000 m/s", "KE = 1/2 mv²"]
    - ["1 Mt TNT = 4.184 × 10^15 J"]
  slots: [mass_kg, kinetic_energy_J, tnt_megatons]
  template: "m = (4/3)π(D/2)³ρ; KE = 1/2 mv²; Mt = KE/(4.184 × 10^15 J)"
  formula: spherical-body energy scale
  correct: ["1.66 × 10^10 kg", "3.00 × 10^18 J", "717 Mt"]
  target: 3.00e18
  tolerance: 15 percent
~~~

**Correct result:** About (1.66\times10^{10}) kg, (3.0\times10^{18}) J, or 715 megatons TNT.

**Answer text:** This is a regional-to-continental catastrophe scale, not a planet-destroying event.

**Why:** BALLPARK checks powers of ten before model detail.

**Wrong-path feedback:** Convert 19 km/s to 19,000 m/s before squaring.

**State/output:** ENERGY SCALE VERIFIED; IMPACT travel unlocks.

## Stop 34 - Order the entry chain

**Format/placement:** SEQUENCE, at `energy-bench`.

**Metadata:** Concept: atmospheric entry; Keystone: causal systems; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L4; Story role: mechanism.

**Call - exact player copy:** Go to the impact-energy bench, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** Consequence outputs must follow physical causes rather than a generic damage label.

**Question card story setup - exact player copy:** Evelyn separates the simulation into approach, atmospheric loading, fragmentation or survival, energy deposition, and surface effects. Place the stages in causal order, then identify which uncertain property most directly controls breakup altitude.

**Question card story-science connection - exact player copy:** Material strength and structure mediate how kinetic energy becomes blast, heat, waves, or crater excavation.

**Question card prompt - exact player copy:** Order the entry stages and select the breakup-sensitive property.

**Expected submission - exact player copy:** one ordered plan

**Complete format-specific interaction block:**

~~~yaml
cards:
  - Approach
  - Atmospheric loading
  - Breakup or survival
  - Energy deposition
  - Surface and atmospheric effects
order:
  - Approach
  - Atmospheric loading
  - Breakup or survival
  - Energy deposition
  - Surface and atmospheric effects
followup:
  breakup_sensitive_property: material strength and structure
~~~

**Correct result:** Correct causal order; material strength or internal structure controls breakup behavior.

**Answer text:** Energy is conserved, but where and how it is deposited determines the hazard pattern.

**Why:** SEQUENCE maps upstream physical conditions to downstream consequences.

**Wrong-path feedback:** Population changes exposure, not the asteroid's atmospheric breakup altitude.

**State/output:** ENTRY CHAIN configured; Stop 35 unlocks.

## Stop 35 - Compare corridor consequences

**Format/placement:** PROBE, at `risk-display`.

**Metadata:** Concept: consequence mapping; Keystone: systems/interpretation; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the corridor risk display, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The corridor crosses environments that convert the same energy into different response problems.

**Question card story setup - exact player copy:** Probe four corridor stations: deep ocean, continental shelf, remote desert, and a dense coast. Compare blast, heat, waves, and evacuation exposure without assigning one casualty count to the full corridor.

**Question card story-science connection - exact player copy:** Hazard is physical intensity; risk also depends on exposure and vulnerability.

**Player-visible data and equations - exact player copy:** Probe four fixed stations—deep ocean, continental shelf, remote desert, and dense coast—while holding asteroid diameter, density, speed, and entry angle fixed. Record each station's blast, thermal, wave, and exposed-population readings and compare them with that station's expected concern.

**Required action order - exact player copy:** SELECT ONE CORRIDOR STATION → MEASURE ITS CONSEQUENCE OUTPUTS → REPEAT FOR ALL FOUR → SUBMIT THE FOUR-PART MAPPING.

**Question card prompt - exact player copy:** Submit one mapping from each of the four corridor stations to its dominant planning concern; do not submit one corridor-wide casualty number.

**Expected submission - exact player copy:** one four-station consequence-to-planning mapping

**Complete format-specific interaction block:**

~~~yaml
probe:
  held_fixed: [diameter, density, speed, entry angle]
  points:
    - id: deep_ocean
      load: "Same impactor over deep ocean; compare water-wave generation with direct blast and population exposure."
      reading: {blast: moderate, thermal: low_on_land, wave: regional, exposed_population: low_local}
      expected: {dominant_planning_concern: coastal_wave_uncertainty}
      comparison: "The regional wave reading exceeds the direct local-exposure concern at this station."
    - id: continental_shelf
      load: "Same impactor above the continental shelf; compare stronger coastal coupling with offshore exposure."
      reading: {blast: moderate, thermal: low_on_land, wave: high_coastal, exposed_population: moderate}
      expected: {dominant_planning_concern: coastal_wave_warning}
      comparison: "The shallow-water wave reading raises coastal warning needs above the deep-ocean station."
    - id: remote_desert
      load: "Same impactor over remote desert; keep the physical energy fixed while exposure changes."
      reading: {blast: high_local, thermal: high_local, wave: none, exposed_population: low}
      expected: {dominant_planning_concern: blast_and_thermal_with_low_exposure}
      comparison: "Physical intensity is high, but low exposed population limits immediate evacuation demand."
    - id: dense_coast
      load: "Same impactor over a dense coastal region; compare physical effects with evacuation exposure."
      reading: {blast: high, thermal: high, wave: possible, exposed_population: high}
      expected: {dominant_planning_concern: combined_effects_and_evacuation_exposure}
      comparison: "High exposure makes evacuation capacity part of the dominant planning concern."
  correct_submission:
    deep_ocean: coastal_wave_uncertainty
    continental_shelf: coastal_wave_warning
    remote_desert: blast_and_thermal_with_low_exposure
    dense_coast: combined_effects_and_evacuation_exposure
  required_samples: [deep_ocean, continental_shelf, remote_desert, dense_coast]
  truth: {breaks_one_corridor_wide_risk_model: true}
  commit_gate: All four corridor stations sampled.
~~~

**Correct result:** Distinguish physical effects and exposed populations by segment.

**Answer text:** The asteroid's energy is common, but the risk distribution is geographically conditional.

**Why:** PROBE examines model response across controlled location changes.

**Wrong-path feedback:** A corridor-wide average hides the places where action costs and benefits differ most.

**State/output:** CONDITIONAL CONSEQUENCE MAP appears.

## Stop 36 - Buy the decision-changing measurement

**Format/placement:** VALUE, asked by Evelyn Park beside `deflection-desk`.

**Metadata:** Concept: value of information; Keystone: decisions/resources; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Evelyn Park, at the intervention desk in the Entry & Consequences Lab.

**Stop reason - exact player copy:** Limited observing time should target uncertainty that changes who must act.

**Question card story setup - exact player copy:** The team can improve diameter by ten percent, composition classification, or corridor timing enough to separate ocean from populated land. Choose the measurement with the largest expected change to tomorrow's protective decision.

**Question card story-science connection - exact player copy:** Value of information depends on its effect on action, not only on scientific interest.

**Player-visible data and equations - exact player copy:** Budget = 10 observing hours. Options: diameter precision, 4 h; composition class, 4 h; corridor timing, 10 h; repeated brightness, 3 h. The 21 h total exceeds the budget, so submit one funded option and its decision effect.

**Question card prompt - exact player copy:** Spend at most 10 observing hours and select the option with the greatest immediate decision value.

**Expected submission - exact player copy:** one selected plan with its decision-relevant result

**Complete format-specific interaction block:**

~~~yaml
value:
  budget: {value: 10, unit: observing_hours}
  options:
    - {id: diameter, label: Improve diameter by 10 percent, cost: 4, axis: size, decision_change: small}
    - {id: composition, label: Refine composition class, cost: 4, axis: material, decision_change: moderate}
    - {id: corridor, label: Separate ocean from populated-land timing, cost: 10, axis: exposure, decision_change: large}
    - {id: brightness, label: Repeat the brightness curve, cost: 3, axis: reflected_light, decision_change: small}
  total_option_cost: 21
  correct: [corridor]
  decision_changed: Determines whether populated land remains inside tomorrow's action envelope.
~~~

**Correct result:** Prioritize corridor timing.

**Answer text:** All four improve knowledge, but only timing can remove millions of people from the current action envelope tomorrow.

**Why:** VALUE ranks observations by expected decision improvement under scarcity.

**Wrong-path feedback:** Precision is useful only when it can alter the choice facing the team.

**State/output:** NEXT WINDOW assigned to corridor timing.

## Mission outcome

Mission decision: Start plans for the full path band. Do not order local action yet. New timing data must first split the ocean, desert, and coast cases.

**Pre-card character beat:** Jordan studies the conditional map and says, “A corridor is not a city list. Not yet.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan studies the conditional map and says, “A corridor is not a city list. Not yet.”



**Automatic change:** IMPACT SOLUTION +5 | RESPONSE READINESS +8 | OBSERVING RESERVE -3 | PUBLIC TRUST -2.

**Canonical QA allocation:** 10 RP; Reserve +3, Trust +2, Solution +5 -> bars 100 / 80 / 74 / 73.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Mass scales with diameter cubed; energy scales with speed squared; hazard differs from risk; value of information is decision-relative.

- **Mission takeaway:** Estimate the scale, preserve the corridor, and buy the observation that changes action.

---

# Mission 10 - One Object, Two Motions

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 5 DAYS

**Card title:** ONE OBJECT, TWO MOTIONS

**Go now:** Go to the Spectroscopy Dome and meet Sanaa Vale at the photometry bench, then compare her result with radar.

**Card body:** The single-body model predicts the overall light curve and main radar echo, yet structured residuals remain in both. A repeated mismatch across independent instruments usually points to missing physics. Compare competing shapes, test the radar frames, and diagnose only what both datasets require. By the end of the mission, you will decide whether the asteroid is one compact body or a weak two-lobed system.

**Objective:** Decide whether the asteroid is one compact body or a weak two-lobed system.

### Worth knowing first - exact player copy

#### Glossary terms

Contact binary: two lobes touching or nearly touching.

Light curve: a record of brightness changing with time.

Delay-Doppler image: a radar map organized by range and line-of-sight speed.

Model residual: the observed value minus the model prediction.

#### Primer concepts

- Residuals repeating at the same rotational phase suggest missing structure.
- Different shapes and surface patterns can produce similar light curves.
- Agreement between optical and radar patterns can break that degeneracy.

#### Equations first needed today

No new equation is introduced; this mission retrieves equations and evidence rules already recorded in the mission log.

**Crew on this mission - mission log:** Sanaa Vale, Tomás Ibarra, Malik Rowan.

## Main story happening - designer summary

**Story purpose:** Reveal that 2026 PDC is a weak contact binary that may shed material.

**Route:** CHAR Spectroscopy Dome -> RADAR Bistatic Radar Range.

**Cast:** Sanaa Vale, Tomás Ibarra, Malik Rowan.

**Target time:** 10:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; nois required.*

**Beat 1 - On arrival at Spectroscopy Dome | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Sanaa overlays the unequal brightness peaks from Mission 6.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / MISSION ACTIVE

**Dialogue bubbles -** Sanaa Vale: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 37.

**Beat 2 - After Stop 37 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A single ellipsoid fits the period but leaves alternating residuals.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / FIRST RESULT LOGGED

**Dialogue bubbles -** Sanaa Vale: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 38.

**Beat 3 - After Stop 38 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Radar frames show two delay concentrations moving together.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Sanaa Vale: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 39.

**Beat 4 - After Stop 39 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The team names the minimum shared explanation: a weak contact binary.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / DECISION EVIDENCE READY

**Dialogue bubbles -** Sanaa Vale: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 40.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / MISSION DECISION LOGGED

**Dialogue bubbles -** Sanaa Vale: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 10 outcome, metric screen, concept review, and Mission 11 briefing.

## Location plan

**Mission route:** CHAR Spectroscopy Dome -> RADAR Bistatic Radar Range.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Sanaa Vale, Tomás Ibarra, Malik Rowan.   The central beat is: Reveal that 2026 PDC is a weak contact binary that may shed material.

## Key concepts, explained here

Residuals repeating at the same rotational phase suggest missing structure. Different shapes and surface patterns can produce similar light curves. Agreement between optical and radar patterns can break that degeneracy. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

 pre-rendered sequence or forced viewpoint change

## Stop 37 - See the alternating residual

**Format/placement:** RESIDUAL, at `photometry-bench`.

**Metadata:** Concept: light-curve model; Keystone: evidence/model failure; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L5; Story role: diagnosis.

**Call - exact player copy:** Go to the rotation photometry bench, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The team must decide whether the unequal peaks are noise or missing structure.

**Question card story setup - exact player copy:** A single rotating ellipsoid matches the period, but its residuals alternate positive and negative at the same phases for four cycles. Identify the pattern that random measurement noise is least likely to produce.

**Question card story-science connection - exact player copy:** Phase-locked residuals reveal systematic model inadequacy.

**Required action order - exact player copy:** OPERATE ALL FOUR CYCLE VIEWS → MEASURE THE PHASE-SIGN PATTERN → COMPARE WITH UNCORRELATED NOISE → SUBMIT A CLASSIFICATION AND MODEL ACTION.

**Question card prompt - exact player copy:** Classify the residual pattern and state what it demands.

**Expected submission - exact player copy:** one residual classification and model conclusion

**Complete format-specific interaction block:**

~~~yaml
residual:
  fields:
    - {cycle: 1, phase_signs: [positive, negative, positive, negative]}
    - {cycle: 2, phase_signs: [positive, negative, positive, negative]}
    - {cycle: 3, phase_signs: [positive, negative, positive, negative]}
    - {cycle: 4, phase_signs: [positive, negative, positive, negative]}
  expected_noise_pattern: uncorrelated_signs
  correct_classification: systematic_phase_locked_residual
  required_model_action: test_more_complex_shape_or_reflectance
~~~

**Correct result:** Reject pure random noise; test a more complex body model.

**Answer text:** Repetition at the same rotational phases points to missing structure.

**Why:** RESIDUAL compares leftover patterns to the noise behavior assumed by the model.

**Wrong-path feedback:** Random errors should not reproduce the same sign sequence every rotation.

**State/output:** SINGLE ELLIPSOID INADEQUATE.

## Stop 38 - Separate shape from surface

**Format/placement:** DEGENERACY, at `sizing-board`.

**Metadata:** Concept: inverse problems; Keystone: uncertainty/model selection; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L5; Story role: model.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** Photometry alone permits more than one explanation for unequal peaks.

**Question card story setup - exact player copy:** Unequal peaks can arise from a two-lobed shape, patchy albedo, or a changed viewing geometry. Match each explanation to the additional observation that would most cleanly separate it from the others.

**Question card story-science connection - exact player copy:** A degeneracy exists when distinct physical causes produce similar observations.

**Player-visible data and equations - exact player copy:** Control 1 is long-to-short shape ratio q from 1.00–2.00; Control 2 is bright-to-dark albedo ratio A from 0.70–1.40. Hold rotation period, viewing geometry, mean brightness, and filter fixed. Radar requires q = 1.65 ± 0.10; color modulation requires A = 1.00 ± 0.05.

**Required action order - exact player copy:** MOVE BOTH NUMERICAL CONTROLS → MATCH THE RADAR SHAPE BAND → MATCH THE COLOR-MODULATION BAND → SUBMIT THE JOINT PAIR.

**Question card prompt - exact player copy:** Submit the numerical pair (q, A) that satisfies both named controls, then select SHAPE-DOMINATED or ALBEDO-DOMINATED.

**Expected submission - exact player copy:** one numerical pair that satisfies both named controls

**Complete format-specific interaction block:**

~~~yaml
degeneracy:
  controls:
    - {id: shape_ratio_q, label: "Long-to-short shape ratio", min: 1.00, max: 2.00, step: 0.05}
    - {id: albedo_ratio_A, label: "Bright-to-dark albedo ratio", min: 0.70, max: 1.40, step: 0.05}
  held_fixed: [rotation period, viewing geometry, mean brightness, filter]
  constraint_1: {source: radar, q: 1.65, tolerance: 0.10}
  constraint_2: {source: color modulation, A: 1.00, tolerance: 0.05}
  truth_pair: [1.65, 1.00]
  interpretation: shape_dominated
~~~

**Correct result:** q = 1.65 and A = 1.00; SHAPE-DOMINATED.

**Answer text:** The light curve motivates hypotheses but cannot uniquely choose among them.

**Why:** DEGENERACY pairs look-alike models with observations where their predictions diverge.

**Wrong-path feedback:** A better photometric fit is not unique physical identification.

**State/output:** RADAR DISCRIMINATOR selected; travel unlocks.

## Stop 39 - Sweep the radar frames

**Format/placement:** SWEEP, at `radar-console`.

**Metadata:** Concept: delay-Doppler structure; Keystone: observation/controls; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** A real second lobe should move coherently with the main body across frames.

**Question card story setup - exact player copy:** Sweep eight calibrated radar frames and compare the main echo, adjacent shoulder, and background artifacts across the complete observation series. Mark features that persist at connected delay-Doppler positions as the body rotates.

**Question card story-science connection - exact player copy:** Coherent motion across independent frames distinguishes physical structure from isolated interference.

**Player-visible data and equations - exact player copy:** Operate eight calibrated radar frames. Measure whether the shoulder is present in each frame and whether its delay-Doppler position moves coherently with the primary; submit a count out of eight and one classification.

**Required action order - exact player copy:** OPERATE THE FRAME SWEEP → MEASURE PERSISTENCE AND MOTION → INTERPRET → COMMIT ONE CLASSIFICATION.

**Question card prompt - exact player copy:** Sweep the frames and classify the shoulder.

**Expected submission - exact player copy:** one persistence count out of eight and one shoulder classification

**Complete format-specific interaction block:**

~~~yaml
sweep:
  control: {label: calibrated radar frame, values: [1, 2, 3, 4, 5, 6, 7, 8]}
  readings:
    shoulder_present: [true, true, true, false, true, true, true, true]
    coherent_with_primary_rotation: [true, true, true, null, true, true, true, true]
    stationary_calibration_artifact: [false, false, false, false, false, false, false, false]
  goal: persistent motion connected to the primary in at least 6 of 8 frames
  correct_setting: all_eight_frames
  correct_interpretation: physical_secondary_structure
~~~

**Correct result:** Classify the shoulder as physical secondary structure associated with the target.

**Answer text:** Its persistence and coherent motion make ordinary interference unlikely.

**Why:** SWEEP searches a controlled series for persistence and coordinated change.

**Wrong-path feedback:** One bright frame is weak evidence; seven coherently moving frames are not.

**State/output:** TWO-LOBE MODEL favored.

## Stop 40 - Diagnose the minimum model

**Format/placement:** DIAGNOSIS, at `echo-archive`.

**Metadata:** Concept: contact binary; Keystone: synthesis/modeling; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The claim must explain both instruments without inventing unsupported detail.

**Question card story setup - exact player copy:** The two-lobe model explains alternating optical residuals and coherent radar structure, while a surface patch explains only photometry. Diagnose the minimum shared model and state the new operational concern it raises.

**Question card story-science connection - exact player copy:** Converging independent evidence supports structure while leaving material strength uncertain.

**Question card prompt - exact player copy:** Select the diagnosis and its justified operational implication.

**Expected submission - exact player copy:** one minimum-structure diagnosis and one operational implication

**Complete format-specific interaction block:**

~~~yaml
headline: Which minimum model fits the optical and radar evidence?
readings:
  - {zone: optical, label: phase-locked alternating residual, value: present, status: alarm}
  - {zone: radar, label: coherent secondary shoulder, value: present in 7 of 8 frames, status: alarm}
  - {zone: orbit, label: separate fragment trajectory, value: not yet measured, status: quiet}
choices:
  - {id: noise, label: Random noise, mechanism: cannot repeat at fixed optical phase and move coherently in radar}
  - {id: surface_patch, label: One surface patch, mechanism: can affect photometry but cannot create a radar lobe}
  - {id: contact_binary, label: Weak contact binary, mechanism: explains two-lobed optical and radar structure while leaving strength uncertain}
  - {id: known_fragment, label: Confirmed fragment on a known path, mechanism: exceeds the evidence because no separate trajectory exists}
answer: contact_binary
~~~

**Correct result:** Diagnose a contact binary and monitor for separation; do not claim an existing fragment orbit.

**Answer text:** Two connected lobes explain both datasets, but the binding strength remains unknown.

**Why:** DIAGNOSIS selects the least complicated model that explains all reliable findings.

**Wrong-path feedback:** Structural weakness raises a testable risk; it does not prove breakup has occurred.

**State/output:** CONTACT BINARY advisory issued.

## Mission outcome

Mission decision: Treat 2026 PDC as a weak two-lobed body. Add checks for loose parts. Do not claim that a part has split off yet.

**Pre-card character beat:** Sanaa points to the old weak shoulder. “It was never noise,” she says. Tomás answers, “It still is not a fragment.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Sanaa points to the old weak shoulder. “It was never noise,” she says. Tomás answers, “It still is not a fragment.”



**Automatic change:** IMPACT SOLUTION -10 | OBSERVING RESERVE -4 | PUBLIC TRUST -6.

**Canonical QA allocation:** 10 RP; Reserve +4, Trust +6 -> bars 90 / 80 / 74 / 73.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Phase-locked residuals are systematic; degeneracies need discriminating evidence; coherent radar motion supports structure; diagnosis should remain minimal.

- **Mission takeaway:** When independent residuals agree, revise the model—and no further.

---

# Mission 11 - One Push

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 4 DAYS

**Card title:** ONE PUSH

**Go now:** Go to the Spectroscopy Dome for the mass estimate, continue to the Consequences Lab, and deliver the feasibility result to Mira Chen at Coordination.

**Card body:** A small early velocity change can become a large later miss, but only when time remains for that separation to grow. With eleven days at discovery and fewer now, slogans about deflection may outrun physics. Estimate the needed impulse, compare a credible kinetic impactor, and stress the assumptions. By the end of the mission, you will decide whether to attempt space deflection or shift fully to consequence reduction.

**Objective:** Decide whether space deflection is physically credible with the remaining warning time.

### Worth knowing first - exact player copy

#### Glossary terms

Deflection: changing an object’s motion before it reaches Earth.

Disruption: breaking an object into pieces rather than moving it intact.

Impulse: the change in momentum delivered to an object.

Momentum enhancement: extra impulse from impact ejecta, represented by the factor beta.

#### Primer concepts

- A small velocity change becomes useful only if time remains for separation to grow.
- Short warning time greatly increases the velocity change required.
- An intervention fails when optimistic capacity remains orders of magnitude below a conservative requirement.

#### Equations first needed today

**Equation:** Δx ≈ Δv t

**What it is for:** estimating displacement accumulated after a velocity change

**Symbols:** Δx is displacement; Δv is velocity change; t is remaining time

**Why this campaign needs it:** The campaign must test whether enough miss distance can grow before encounter.

**Equation:** J = mΔv; J ≈ βmᵢvᵢ

**What it is for:** comparing required and delivered impulse

**Symbols:** J is impulse; m is asteroid mass; β is enhancement; mᵢ and vᵢ describe the impactor

**Why this campaign needs it:** The launch decision must compare the same physical quantity on both sides.

**Crew on this mission - mission log:** Sanaa Vale, Evelyn Park, Arjun Sen, Mira Chen.

## Main story happening - designer summary

**Story purpose:** Make the player reject an emotionally attractive but infeasible last-minute deflection.

**Route:** CHAR Spectroscopy Dome -> IMPACT Entry & Consequences Lab -> OPS Coordination Office.

**Cast:** Sanaa Vale, Evelyn Park, Arjun Sen, Mira Chen.

**Target time:** 11:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world chis required.*

**Beat 1 - On arrival at Spectroscopy Dome | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Sanaa supplies the dark-body mass range.

**Panel/HUD text:** THE ONE PUSH / MISSION ACTIVE

**Dialogue bubbles -** Arjun Sen: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 41.

**Beat 2 - After Stop 41 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Evelyn defines a generous required displacement and remaining time.

**Panel/HUD text:** THE ONE PUSH / FIRST RESULT LOGGED

**Dialogue bubbles -** Arjun Sen: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Entry & Consequences Lab waypoint and Stop 42.

**Beat 3 - After Stop 42 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Arjun offers the strongest launch-ready impactor in the fiction.

**Panel/HUD text:** THE ONE PUSH / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Arjun Sen: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 43.

**Beat 4 - After Stop 43 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira asks for a go/no-go based on orders of magnitude.

**Panel/HUD text:** THE ONE PUSH / DECISION EVIDENCE READY

**Dialogue bubbles -** Arjun Sen: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Coordination Office waypoint and Stop 44.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ONE PUSH / MISSION DECISION LOGGED

**Dialogue bubbles -** Arjun Sen: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 11 outcome, metric screen, concept review, and Mission 12 briefing.

## Location plan

**Mission route:** CHAR Spectroscopy Dome -> IMPACT Entry & Consequences Lab -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Sanaa Vale, Evelyn Park, Arjun Sen, Mira Chen.   The central beat is: Make the player reject an emotionally attractive but infeasible last-minute deflection.

## Key concepts, explained here

A small velocity change becomes useful only if time remains for separation to grow. Short warning time greatly increases the velocity change required. An intervention fails when optimistic capacity remains orders of magnitude below a conservative requirement. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

anges, or waypoint notices; no pre-rendered sequence or forced viewpoint change

## Stop 41 - Carry the mass honestly

**Format/placement:** BALLPARK, at `sizing-board`.

**Metadata:** Concept: mass range; Keystone: estimation/uncertainty; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** Deflection feasibility depends on mass, not diameter alone.

**Question card story setup - exact player copy:** Use the 260-meter diameter and plausible rubble-pile densities from 1,200 to 2,400 kilograms per cubic meter in the campaign model. Estimate a mass range and preserve it through the intervention calculation.

**Question card story-science connection - exact player copy:** A darker, denser, or larger body requires more momentum change for the same velocity change.

**Required action order - exact player copy:** CALCULATE VOLUME → APPLY THE LOW DENSITY → APPLY THE HIGH DENSITY → SUBMIT BOTH MASS BOUNDS.

**Player-visible data and equations - exact player copy:** Diameter D = 260 m, radius r = 130 m, density range ρ = 1200–2400 kg/m³, and m = (4/3)πr³ρ.

**Question card prompt - exact player copy:** Submit the lower and upper asteroid mass bounds in kilograms.

**Expected submission - exact player copy:** one numerical lower-and-upper mass pair in kilograms

**Complete format-specific interaction block:**

~~~yaml
estimate:
  labels: [radius, low-density mass, high-density mass]
  values:
    - ["D = 260 m", "r = D/2"]
    - ["ρlow = 1200 kg/m³", "m = (4/3)πr³ρ"]
    - ["ρhigh = 2400 kg/m³", "m = (4/3)πr³ρ"]
  slots: [radius_m, low_mass_kg, high_mass_kg]
  template: "m = (4/3)π(D/2)³ρ"
  formula: spherical mass range
  correct: ["130 m", "1.10 × 10^10 kg", "2.21 × 10^10 kg"]
  target: 1.66e10
  tolerance: 8 percent
~~~

**Correct result:** Roughly (1.1\times10^{10}) to (2.2\times10^{10}) kg.

**Answer text:** The intervention test must succeed across this range, not only at the lightest convenient value.

**Why:** BALLPARK carries parameter uncertainty into feasibility bounds.

**Wrong-path feedback:** Density multiplies volume; it cannot be omitted from momentum demand.

**State/output:** MASS ENVELOPE transferred to IMPACT.

## Stop 42 - Derive the required impulse

**Format/placement:** DERIVE, at `deflection-desk`.

**Metadata:** Concept: impulse requirement; Keystone: mechanics/derivation; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: calculation.

**Call - exact player copy:** Go to the intervention desk, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The team needs a transparent lower-bound demand before evaluating any mission concept.

**Question card story setup - exact player copy:** Grant the defender eight days of useful lead time and require 6,400 kilometers of accumulated displacement. Derive the velocity change and nominal impulse, treating the straight-line estimate as deliberately optimistic.

**Question card story-science connection - exact player copy:** Short warning time forces a much larger velocity change than early interception.

**Required action order - exact player copy:** CONVERT DISTANCE AND TIME → CALCULATE Δv → CALCULATE IMPULSE J → SUBMIT BOTH RESULTS.

**Player-visible data and equations - exact player copy:** Required displacement Δx = 6400 km = 6.4 × 10^6 m; useful time t = 8 days = 691,200 s; nominal mass m = 1.66 × 10^10 kg; Δv = Δx/t; J = mΔv.

**Question card prompt - exact player copy:** Submit two numerical results with units: minimum Δv in meters per second and nominal impulse J in newton-seconds.

**Expected submission - exact player copy:** one ordered derivation ending in Δv in meters per second and impulse in newton-seconds

**Complete format-specific interaction block:**

~~~yaml
derive:
  givens:
    miss_distance_m: 6.4e6
    warning_time_s: 691200
    asteroid_mass_kg: 1.66e10
  candidate_lines:
    - {id: line_1, expression: "Δv = Δx/t", license: constant transverse velocity change over the stated interval}
    - {id: line_2, expression: "Δv = (6.4 × 10^6 m)/(691200 s) = 9.26 m/s", license: substitute displayed values with SI units}
    - {id: line_3, expression: "J = mΔv", license: impulse equals change in momentum}
    - {id: line_4, expression: "J = (1.66 × 10^10 kg)(9.26 m/s) = 1.54 × 10^11 N·s", license: substitute the adopted mass}
  keyed_order: [line_1, line_2, line_3, line_4]
  decoys:
    - {id: decoy_multiply_time, expression: "Δv = Δx t", fails_because: displacement from a fixed velocity change is proportional to time, so solving for velocity requires division}
    - {id: decoy_divide_mass, expression: "J = Δv/m", fails_because: impulse equals mass times velocity change}
  correct: {delta_v_m_per_s: 9.26, impulse_Ns: 1.54e11}
  requested_units: [m/s, N·s]
~~~

**Correct result:** About 9.3 m/s and (1.5\times10^{11}) N·s.

**Answer text:** Even the simplified lower bound is enormous for a launch-ready response.

**Why:** DERIVE builds the requirement from displacement, time, and momentum definitions.

**Wrong-path feedback:** Eight days is seconds, and 6,400 kilometers is meters before division.

**State/output:** REQUIRED IMPULSE posted.

## Stop 43 - Stress the kinetic impactor

**Format/placement:** STRESS, asked by Arjun Sen beside `deflection-desk`.

**Metadata:** Concept: kinetic impactor; Keystone: feasibility/assumptions; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Talk to Arjun Sen, at the intervention desk in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The best-case mission must be compared with the lower-bound requirement.

**Question card story setup - exact player copy:** Arjun offers a 1,000-kilogram impactor at 10 kilometers per second and grants an optimistic momentum enhancement of three. Compare delivered impulse with demand across the asteroid mass range and weaker enhancement.

**Question card story-science connection - exact player copy:** Feasibility fails when an optimistic supply remains orders of magnitude below an optimistic demand.

**Required action order - exact player copy:** CALCULATE DELIVERED IMPULSE → COMPARE WITH THE LOWEST REQUIRED IMPULSE → CALCULATE THE SHORTFALL FACTOR → INTERPRET FEASIBILITY.

**Player-visible data and equations - exact player copy:** Impactor mass mi = 1000 kg; impact speed vi = 10 km/s = 10,000 m/s; optimistic β = 3; Jdeliver = βmivi; required impulse range = 1.0 × 10^11–2.0 × 10^11 N·s.

**Question card prompt - exact player copy:** Submit delivered impulse in newton-seconds, the minimum shortfall factor, and one conclusion: FEASIBLE or INFEASIBLE.

**Expected submission - exact player copy:** one delivered impulse in newton-seconds, one minimum shortfall factor, and one feasibility conclusion

**Complete format-specific interaction block:**

~~~yaml
stress:
  equation: Jdeliver = β mi vi
  inputs: {impactor_mass_kg: 1000, impact_speed_m_per_s: 10000, beta: 3}
  settings:
    - {beta: 1, delivered_impulse_Ns: 1.0e7, minimum_shortfall_factor: 10000}
    - {beta: 2, delivered_impulse_Ns: 2.0e7, minimum_shortfall_factor: 5000}
    - {beta: 3, delivered_impulse_Ns: 3.0e7, minimum_shortfall_factor: 3333}
  delivered_impulse_Ns: 3.0e7
  required_impulse_Ns: [1.0e11, 2.0e11]
  minimum_shortfall_factor: 3333
  correct_conclusion: infeasible
~~~

**Correct result:** Infeasible by more than three orders of magnitude, even before navigation and launch delays.

**Answer text:** The proposed impactor supplies at most about one five-thousandth of nominal demand.

**Why:** STRESS compares best-case capacity with worst-relevant requirements.

**Wrong-path feedback:** A successful earlier kinetic-impact demonstration does not erase this object's mass and deadline.

**State/output:** KINETIC DEFLECTION NO-GO.

## Stop 44 - Choose the useful action

**Format/placement:** VALUE, asked by Arjun Sen beside `scopeboard`.

**Metadata:** Concept: response portfolio; Keystone: decisions/value; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Arjun Sen, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** Resources spent on an infeasible launch would reduce observations and civil preparation.

**Question card story setup - exact player copy:** The last budget can fund a symbolic impactor, corridor observations, civil-defense preparation, or a public demonstration. Rank all four by expected harm reduction under the verified warning time and intervention gap.

**Question card story-science connection - exact player copy:** Planetary defense includes both prevention and consequence management; the feasible branch depends on lead time.

**Player-visible data and equations - exact player copy:** Budget = 100 response credits. Options: symbolic impactor, 80; corridor observations, 45; civil-defense preparation, 55; public demonstration, 25. The 205-credit total exceeds the budget. Submit a portfolio, total cost, and decision effect.

**Question card prompt - exact player copy:** Spend at most 100 credits and choose the action portfolio with the greatest expected value.

**Expected submission - exact player copy:** one selected plan with its decision-relevant result

**Complete format-specific interaction block:**

~~~yaml
value:
  budget: {value: 100, unit: response_credits}
  options:
    - {id: symbolic_impactor, label: Launch symbolic impactor, cost: 80, axis: prevention, decision_value: negligible}
    - {id: corridor_observations, label: Fund corridor-refining observations, cost: 45, axis: location, decision_value: high}
    - {id: civil_defense, label: Begin reversible civil-defense preparation, cost: 55, axis: exposure, decision_value: high}
    - {id: public_demo, label: Fund a public technology demonstration, cost: 25, axis: communication, decision_value: low}
  total_option_cost: 205
  correct: [corridor_observations, civil_defense]
  decision_changed: Refines who is at risk while funding actions that can still reduce harm.
~~~

**Correct result:** Fund corridor observations and civil-defense preparation; do not launch.

**Answer text:** Refusing an impossible intervention protects the actions that can still reduce harm.

**Why:** VALUE compares expected decision benefit and opportunity cost.

**Wrong-path feedback:** Hope is not added momentum, and a launch can consume the warning time it cannot overcome.

**State/output:** DEFLECTION BRANCH CLOSED; RESPONSE BRANCH EXPANDED.

## Mission outcome

Mission decision: Do not try to push the body now. The best ready craft falls short by more than 3,300 times. Move all spare work to path checks and harm reduction.

**Pre-card character beat:** Arjun closes the launch window himself. “With years, this is a mission,” he says. “With days, it is theater.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Arjun closes the launch window himself. “With years, this is a mission,” he says. “With days, it is theater.”



**Automatic change:** RESPONSE READINESS +8 | OBSERVING RESERVE -2.

**Canonical QA allocation:** 10 RP; Reserve +4, Trust +4, Solution +2 -> bars 90 / 88 / 78 / 77.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Deflection leverage grows with lead time; impulse equals mass times velocity change; best-case supply must meet lower-bound demand; opportunity cost matters.

- **Mission takeaway:** The scientifically brave answer can be no.

---

# Mission 12 - The Line We Promise

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 3 DAYS

**Card title:** THE LINE WE PROMISE

**Go now:** Go to the Consequences Lab, carry the response envelope to the Town Emergency Office, and publish the final rules from Coordination.

**Card body:** Emergency action has costs, so the team needs rules that connect evidence to proportionate protection. Waiting for the next alarming map invites inconsistent decisions and unequal treatment. Define thresholds, allocate scarce capacity, rehearse the protocol, and publish claims that remain true under revision. By the end of the mission, you will approve a staged response plan before knowing which branch benefits from it.

**Objective:** Approve a staged response plan before the next orbit result is known.

### Worth knowing first - exact player copy

#### Glossary terms

Threshold: a measurable evidence level that triggers an action.

Protective action: a step intended to reduce people’s exposure to harm.

Staging: preparing resources without yet ordering mass movement.

Precommitment: choosing a rule before seeing the result that will test it.

#### Primer concepts

- Reversible preparation can begin under broader uncertainty than disruptive evacuation.
- Action rules should include likelihood, consequence, time, exposure, and verification.
- Publishing the rule before the result reduces motivated changes and unequal treatment.

#### Equations first needed today

No new equation is introduced; this mission retrieves equations and evidence rules already recorded in the mission log.

**Crew on this mission - mission log:** Evelyn Park, Jordan Hale, Mira Chen.

## Main story happening - designer summary

**Story purpose:** Build the response rules that make the final fragment decision fair and fast.

**Route:** IMPACT Entry & Consequences Lab -> TOWN Emergency Management Office -> OPS Coordination Office.

**Cast:** Evelyn Park, Jordan Hale, Mira Chen.

**Target time:** 11:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world changes, or waypoinis required.*

**Beat 1 - On arrival at Entry & Consequences Lab | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Evelyn presents conditional consequence envelopes.

**Panel/HUD text:** THE LINE WE PROMISE / MISSION ACTIVE

**Dialogue bubbles -** Jordan Hale: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 45.

**Beat 2 - After Stop 45 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan exposes the thirty-day evacuation lead versus eleven-day discovery warning.

**Panel/HUD text:** THE LINE WE PROMISE / FIRST RESULT LOGGED

**Dialogue bubbles -** Jordan Hale: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Emergency Management Office waypoint and Stop 46.

**Beat 3 - After Stop 46 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The player assigns staged actions to escalating evidence.

**Panel/HUD text:** THE LINE WE PROMISE / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Jordan Hale: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 47.

**Beat 4 - After Stop 47 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira publishes the rule before the next orbit update.

**Panel/HUD text:** THE LINE WE PROMISE / DECISION EVIDENCE READY

**Dialogue bubbles -** Jordan Hale: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Coordination Office waypoint and Stop 48.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE LINE WE PROMISE / MISSION DECISION LOGGED

**Dialogue bubbles -** Jordan Hale: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 12 outcome, metric screen, concept review, and Mission 13 briefing.

## Location plan

**Mission route:** IMPACT Entry & Consequences Lab -> TOWN Emergency Management Office -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Evelyn Park, Jordan Hale, Mira Chen.   The central beat is: Build the response rules that make the final fragment decision fair and fast.

## Key concepts, explained here

Reversible preparation can begin under broader uncertainty than disruptive evacuation. Action rules should include likelihood, consequence, time, exposure, and verification. Publishing the rule before the result reduces motivated changes and unequal treatment. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

t notices; no pre-rendered sequence or forced viewpoint change

## Stop 45 - Draw the action thresholds

**Format/placement:** TRIGGER, at `risk-display`.

**Metadata:** Concept: staged response; Keystone: thresholds/decisions; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: design.

**Call - exact player copy:** Go to the corridor risk display, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** Each response step needs a condition stronger than anxiety and earlier than certainty.

**Question card story setup - exact player copy:** Define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Use probability, corridor population, warning time, and independent verification so each trigger is observable.

**Question card story-science connection - exact player copy:** Proportionate thresholds connect uncertain evidence to reversible or irreversible action.

**Player-visible data and equations - exact player copy:** Policy inputs: WATCH when impact probability p > 1% and diameter D > 10 m; STAGE when p > 50% and the modeled corridor contains people; TARGETED ORDER when p ≥ 90%, a damaging D ≥ 20 m object has an independently verified populated three-sigma corridor, and warning time is under 2 days; STAND-DOWN when the verified complete three-sigma corridor excludes the jurisdiction.

**Required action order - exact player copy:** WRITE ALL FOUR NUMERICAL OR OBSERVABLE THRESHOLDS → COMMIT THE LADDER → REVEAL THE UPDATES → MATCH EACH ACTION.

**Question card prompt - exact player copy:** Write and commit all four thresholds before updates unlock; then submit the four-stage threshold-to-action mapping.

**Expected submission - exact player copy:** one four-stage threshold-to-action mapping

**Complete format-specific interaction block:**

~~~yaml
trigger:
  stages:
    - {id: watch, threshold: "impact probability > 1% and diameter > 10 m", action: maintain watch}
    - {id: stage, threshold: "impact probability > 50% and the corridor contains population", action: stage reversible resources}
    - {id: order, threshold: "impact probability >= 90%, diameter >= 20 m, narrow populated three-sigma corridor, independent verification, and warning time < 2 days", action: issue targeted protective order}
    - {id: stand_down, threshold: "verified complete corridor excludes the jurisdiction", action: stand down that jurisdiction}
  updates_hidden_until_commit: true
  blind_updates:
    - {id: update_watch, reading: "p = 1.2%, D = 15 m, no populated corridor", keyed_action: maintain watch}
    - {id: update_stage, reading: "p = 63%, populated corridor, warning time = 3 days", keyed_action: stage reversible resources}
    - {id: update_order, reading: "p = 91%, D = 32 m, 180000 people, independent pass, warning time < 2 days", keyed_action: issue targeted protective order}
    - {id: update_stand_down, reading: "complete three-sigma corridor excludes jurisdiction", keyed_action: stand down that jurisdiction}
  correct_conclusion: match_all_four_updates_to_the_committed_ladder
~~~

**Correct result:** Correct four trigger-action matches.

**Answer text:** Reversible preparation begins earlier; disruptive orders require narrower, independently verified evidence.

**Why:** TRIGGER binds a measurable condition to a predefined action.

**Wrong-path feedback:** One probability threshold cannot govern actions with radically different costs.

**State/output:** RESPONSE LADDER drafted.

## Stop 46 - Allocate limited capacity

**Format/placement:** ALLOCATE, at `evac-desk`.

**Metadata:** Concept: emergency resources; Keystone: optimization/equity; Area: Emergency Management Office; Learning role: INTRODUCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the response allocation desk, in the Emergency Management Office.

**Stop reason - exact player copy:** The office cannot simultaneously move every person in the broad corridor.

**Question card story setup - exact player copy:** Nine million people lie under the current warning, full evacuation normally needs about thirty days, and discovery provided eleven. Allocate transport, shelters, medical teams, and communication capacity to reversible staging first.

**Question card story-science connection - exact player copy:** Scarcity makes prioritization part of risk reduction, not an administrative afterthought.

**Player-visible data and equations - exact player copy:** Allocate exactly 100 first-wave points in 5-point steps among mobility-limited transport, shelter readiness, hospital continuity, multilingual alerts, and reserve. Each item allows 10–40 points, but reserve requires 20–40; total assigned points must equal 100. Do not order movement of all nine million people.

**Required action order - exact player copy:** SET ALL FIVE CATEGORY VALUES → CHECK THE 100-POINT TOTAL → CHECK EVERY MINIMUM AND RESERVE → SUBMIT THE ALLOCATION.

**Question card prompt - exact player copy:** Submit one five-category allocation totaling 100 points that preserves at least 20 points in reserve.

**Expected submission - exact player copy:** one allocation satisfying every stated constraint

**Complete format-specific interaction block:**

~~~yaml
allocate:
  pool: {label: First-wave capacity, value: 100, unit: points}
  items:
    - {id: transport, label: Mobility-limited transport, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: shelters, label: Shelter readiness, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: hospitals, label: Hospital continuity, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: communications, label: Multilingual alerts, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: reserve, label: Reserve, cost_per_unit: 1, min: 20, max: 40, step: 5, unit: points}
  questions:
    - {id: mobility, label: "Can mobility-limited residents be reached?", required: true, needs: {transport: 10}}
    - {id: continuity, label: "Can shelters and hospitals stay ready?", required: true, needs: {shelters: 10, hospitals: 10}}
    - {id: access, label: "Can every county receive accessible alerts?", required: true, needs: {communications: 10}}
    - {id: extra_comfort, label: "Can optional comfort sites be expanded now?", required: false, needs: {shelters: 30}}
  correct: {transport: 20, shelters: 20, hospitals: 20, communications: 20, reserve: 20}
  pass_rule: total = 100; each operational item >= 10; reserve >= 20
  forbidden_action: move_all_nine_million_people_now
~~~

**Correct result:** Stage targeted capacity and retain a reserve; do not order corridor-wide evacuation.

**Answer text:** Staging buys speed without imposing the harms of premature mass movement.

**Why:** ALLOCATE distributes finite resources against expected need, reversibility, and equity.

**Wrong-path feedback:** Spending everything now leaves no capacity when the corridor narrows.

**State/output:** TOWN readiness package reaches 80%.

## Stop 47 - Rehearse the decision protocol

**Format/placement:** PROTOCOL, at `threshold-board`.

**Metadata:** Concept: emergency decision; Keystone: procedure/verification; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: application.

**Call - exact player copy:** Go to the public-action board, in the Emergency Management Office.

**Stop reason - exact player copy:** Evidence must move from scientists to emergency action without an improvised handoff.

**Question card story setup - exact player copy:** Arrange the complete handoff from verified orbit update through consequence overlay, jurisdiction check, authorization, accessible public message, and scheduled reassessment. Insert an independent scientific verification gate before any protective order.

**Question card story-science connection - exact player copy:** A protocol preserves both speed and error checking under deadline pressure.

**Question card prompt - exact player copy:** Build the order-and-reassessment protocol.

**Expected submission - exact player copy:** one ordered seven-step procedure

**Complete format-specific interaction block:**

~~~yaml
scenarios:
  - New orbit result arrives
  - Consequences are mapped
  - A jurisdiction is implicated
  - Evidence must be independently checked
  - Authority decides
  - Public receives instructions
  - Conditions may change
choices:
  - Verify the orbit update
  - Overlay consequences
  - Check jurisdiction
  - Perform independent scientific verification
  - Obtain authorization
  - Issue an accessible message
  - Schedule reassessment
mapping:
  orbit_arrives: Verify the orbit update
  consequences_mapped: Overlay consequences
  jurisdiction_implicated: Check jurisdiction
  evidence_check: Perform independent scientific verification
  authority_decides: Obtain authorization
  public_instructions: Issue an accessible message
  conditions_change: Schedule reassessment
~~~

**Correct result:** Complete the seven-step protocol with verification before authorization.

**Answer text:** Every order carries its evidence, authority, message, and next review time.

**Why:** PROTOCOL makes a complex response repeatable across teams.

**Wrong-path feedback:** A technically correct map cannot issue or explain an order by itself.

**State/output:** RESPONSE PROTOCOL rehearsed.

## Stop 48 - Sign the public claims

**Format/placement:** ATTEST, asked by Mira Chen beside `scopeboard`.

**Metadata:** Concept: risk communication; Keystone: evidence/ethics; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: communication.

**Call - exact player copy:** Talk to Mira Chen, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** The published plan must say what is known, conditional, and still unknown.

**Question card story setup - exact player copy:** Review five proposed public statements and sign only those supported by the current campaign evidence. Each accepted line must name its condition, intended action, and next update without promising certainty.

**Question card story-science connection - exact player copy:** Trust grows when institutional claims remain valid after honest scientific revision.

**Question card prompt - exact player copy:** Attest the defensible response-plan statements.

**Expected submission - exact player copy:** one complete signed-versus-rejected claim set

**Complete format-specific interaction block:**

~~~yaml
attest:
  verification_limit: 5
  claims:
    - {id: leading_case, text: "A 63% impact probability makes impact the leading planning case.", backed: true, critical: true}
    - {id: staging, text: "The broad corridor supports reversible staging, not mass evacuation.", backed: true, critical: true}
    - {id: order_rule, text: "A protective order requires a narrow independently verified damaging corridor.", backed: true, critical: true}
    - {id: city_hit, text: "A named city will be hit.", backed: false, critical: true}
    - {id: deflection, text: "A last-minute deflection can still save us.", backed: false, critical: true}
  correct_signed: [leading_case, staging, order_rule]
~~~

**Correct result:** Sign the three conditional statements and reject both absolute claims.

**Answer text:** The plan is firm about actions precisely because it is honest about uncertainty.

**Why:** ATTEST requires explicit evidence ownership for public claims.

**Wrong-path feedback:** Confidence in a process is not permission to overstate its inputs.

**State/output:** PRECOMMITTED RESPONSE PLAN published.

## Mission outcome

Mission decision: Approve the staged plan. Start with broad steps that can be undone. Use strong orders only for a narrow, checked danger zone. Stand down places that the full path rules out.

**Pre-card character beat:** Jordan initials the threshold board before Mira opens the next orbit packet. “Now the map cannot move our principles,” they say.

### Post-mission metric screen - exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan initials the threshold board before Mira opens the next orbit packet. “Now the map cannot move our principles,” they say.



**Automatic change:** RESPONSE READINESS +12 | OBSERVING RESERVE -3 | PUBLIC TRUST +8.

**Canonical QA allocation:** 10 RP; Reserve +7, Trust +2, Response +1 -> bars 90 / 100 / 85 / 85.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Triggers must be observable; reversible actions can begin earlier; resources need reserves and equity; every order needs verification and reassessment.

- **Mission takeaway:** Decide the rule before the result tests your courage.

---

# Mission 13 - Through the Keyhole

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 2 DAYS

**Card title:** THROUGH THE KEYHOLE

**Go now:** Go to Orbit Determination, verify the final primary-body prediction at Radar, and deliver the result to Coordination.

**Card body:** The final optical arc and an independent radar pass can test whether the main body crosses the populated corridor. A hidden timing offset could still move every apparent solution together. Check the control, refit the residuals, read the new cloud, and reveal the holdout. By the end of the mission, you will either escalate the primary-body response or stand down the threatened land corridor.

**Objective:** Escalate the primary-body response or defensibly stand down the populated land corridor.

### Worth knowing first - exact player copy

#### Glossary terms

Control: a known reference used to reveal measurement bias.

Holdout: data withheld until after a prediction is frozen.

Systematic error: a common shift affecting multiple measurements together.

Three-sigma envelope: a wide model uncertainty region used here to test land intersection.

#### Primer concepts

- A reference star can reveal a shift caused by the optical pipeline.
- A justified correction removes structure but leaves realistic scatter.
- Independent radar can verify a corrected optical prediction without inheriting its error.

#### Equations first needed today

No new equation is introduced; this mission retrieves equations and evidence rules already recorded in the mission log.

**Crew on this mission - mission log:** Malik Rowan, Tomás Ibarra, Mira Chen, Jordan Hale.

**Target time:** 10:00.

## Main story happening - designer summary

**Story purpose:** Deliver an evidence-earned apparent victory: the main body is constrained to an ocean impact.

**Route:** ORBIT Orbit Determination Center -> RADAR Bistatic Radar Range -> OPS Coordination Office.

**Cast:** Malik Rowan, Tomás Ibarra, Mira Chen, Jordan Hale.

**Target time:** 10:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no pre-rendered sequence or forced viewpoint change is required.*

**Beat 1 - On arrival at Orbit Determination Center | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A reference-star control identifies a common offset in the last optical batch.

**Panel/HUD text:** THROUGH THE KEYHOLE / MISSION ACTIVE

**Dialogue bubbles -** Malik Rowan: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 49.

**Beat 2 - After Stop 49 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Corrected residuals center near zero without becoming unrealistically perfect.

**Panel/HUD text:** THROUGH THE KEYHOLE / FIRST RESULT LOGGED

**Dialogue bubbles -** Malik Rowan: “That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 50.

**Beat 3 - After Stop 50 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A separately clocked radar holdout lands inside the ocean solution.

**Panel/HUD text:** THROUGH THE KEYHOLE / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 51.

**Beat 4 - After Stop 51 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan stands down the nine-million-person land corridor under the published rule.

**Panel/HUD text:** THROUGH THE KEYHOLE / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 52.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THROUGH THE KEYHOLE / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 13 outcome, metric screen, concept review, and Mission 14 briefing.

## Location plan

**Mission route:** ORBIT Orbit Determination Center -> RADAR Bistatic Radar Range -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Malik Rowan, Tomás Ibarra, Mira Chen, Jordan Hale. The central beat is: Deliver an evidence-earned apparent victory: the main body is constrained to an ocean impact.

**Target time:** 10:00.

## Key concepts, explained here

A reference star can reveal a shift caused by the optical pipeline. A justified correction removes structure but leaves realistic scatter. Independent radar can verify a corrected optical prediction without inheriting its error. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

## Stop 49 - Test the common offset

**Format/placement:** CONTROL, at `tracking-rack`.

**Metadata:** Concept: astrometric control; Keystone: bias/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the tracking rack, in the Orbit Determination Center.

**Stop reason - exact player copy:** A shared optical offset could falsely move the whole corridor offshore.

**Question card story setup - exact player copy:** The newest positions all shift east by nearly the same amount, including measurements of a cataloged reference star. Use the reference as a control and determine whether the shift belongs to the asteroid or instrument.

**Question card story-science connection - exact player copy:** A known-position control distinguishes instrumental bias from target motion.

**Player-visible data and equations - exact player copy:** Candidate controls are batch correction, target-only offset, and fit weighting. Change only the batch correction from 0.00 to −0.36 arcsec; hold raw images, catalog positions, star selection, and fit model fixed. Measure both residuals before, after, and after restoration; the noise band is ±0.10 arcsec. Restoration is required.

**Required action order - exact player copy:** MEASURE BASELINE → CHANGE ONLY THE BATCH CORRECTION → MEASURE BOTH RESIDUALS → RESTORE RAW VIEW → CONFIRM RESTORATION → INTERPRET.

**Question card prompt - exact player copy:** Submit the correction setting in arcseconds, both corrected residuals in arcseconds, the restoration check, and one conclusion: TARGET MOTION or SHARED BIAS.

**Expected submission - exact player copy:** one control setting, the before-and-after measurements, and one causal conclusion

**Complete format-specific interaction block:**

~~~yaml
control:
  changed: {batch_correction_arcsec: [0.00, -0.36]}
  held_fixed: [raw images, catalog positions, star selection, fit model]
  measurement_timing: [before correction, after correction, after raw-view restoration]
  variables:
    - {id: batch_correction_arcsec, label: East-west batch correction, baseline: 0.00, test: -0.36, unit: arcsec}
    - {id: raw_images, label: Raw images, baseline: fixed, test: fixed}
    - {id: catalog_positions, label: Catalog positions, baseline: fixed, test: fixed}
    - {id: star_selection, label: Star selection, baseline: fixed, test: fixed}
    - {id: fit_model, label: Fit model, baseline: fixed, test: fixed}
  candidates:
    - {id: batch_correction, label: Apply −0.36 arcsec to the full batch, reference_response_arcsec: -0.36, asteroid_response_arcsec: -0.36}
    - {id: target_only, label: Shift only the asteroid positions, reference_response_arcsec: 0.00, asteroid_response_arcsec: -0.36}
    - {id: fit_weighting, label: Change fit weights, reference_response_arcsec: -0.04, asteroid_response_arcsec: -0.08}
  measurements:
    before: {reference_mean_arcsec: 0.36, asteroid_mean_arcsec: 0.38}
    after: {reference_mean_arcsec: 0.00, asteroid_mean_arcsec: 0.02}
  restoration: {required: true, raw_view_reference_mean_arcsec: 0.36}
  response:
    label: reference-star and asteroid mean residuals
    before_arcsec: {reference: 0.36, asteroid: 0.38}
    after_change_arcsec: {reference: 0.00, asteroid: 0.02}
    after_restore_arcsec: {reference: 0.36}
    noise_band_arcsec: 0.10
  required_sequence: [measure_baseline, change_batch_correction_only, measure_both_residuals, restore_raw_view, measure_again]
  correct: batch_correction_arcsec
  correct_conclusion: shared_bias
~~~

**Correct result:** Apply −0.36 arcsec; corrected reference residual = 0.00 arcsec and asteroid residual = +0.02 arcsec; restore raw view; conclude SHARED BIAS.

**Answer text:** The known star should not move, so its matching offset identifies the system.

**Why:** CONTROL holds expected reality fixed while testing measurement.

**Wrong-path feedback:** Target acceleration cannot move the reference star.

**State/output:** CONTROL CORRECTION logged.

## Stop 50 - Refit the corrected residuals

**Format/placement:** RESIDUAL, at `fit-board`.

**Metadata:** Concept: orbit correction; Keystone: modeling/residuals; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The correction must improve the model without hiding disagreement.

**Question card story setup - exact player copy:** Refit the complete optical batch with the documented correction and compare residuals before and after. The common eastward pattern disappears, while the remaining scatter stays centered near zero and within stated uncertainty.

**Question card story-science connection - exact player copy:** A justified correction removes predicted structure while preserving plausible random variation.

**Player-visible data and equations - exact player copy:** Before correction: mean east residual = +0.37 arcsec. After the documented correction: mean residual = +0.01 arcsec and residual scatter = 0.09 arcsec; expected 1σ scatter = 0.10 arcsec.

**Required action order - exact player copy:** REFIT WITH THE DOCUMENTED CORRECTION → MEASURE MEAN AND SCATTER → COMPARE WITH EXPECTED 1σ → INTERPRET PASS OR FAIL.

**Question card prompt - exact player copy:** Submit the corrected mean and scatter in arcseconds and one conclusion: PASS or FAIL.

**Expected submission - exact player copy:** one residual classification and model conclusion

**Complete format-specific interaction block:**

~~~yaml
residual:
  fields:
    - {id: before, mean_east_arcsec: 0.37, scatter_arcsec: 0.10}
    - {id: after, mean_east_arcsec: 0.01, scatter_arcsec: 0.09}
  expected: {mean_east_arcsec: 0.00, one_sigma_scatter_arcsec: 0.10}
  acceptance: {absolute_mean_max_arcsec: 0.10, scatter_max_arcsec: 0.10}
  correct_classification: pass
~~~

**Correct result:** Accept the fit and preserve correction provenance.

**Answer text:** Centered, expected scatter supports correction rather than overfitting.

**Why:** RESIDUAL tests the pattern left by a repair.

**Wrong-path feedback:** Perfect zeros would be suspicious; consistent scatter is the goal.

**State/output:** PRIMARY CORRIDOR refit.

## Stop 51 - Read the separated cloud

**Format/placement:** CLOUD, at `astro-bench`.

**Metadata:** Concept: primary corridor; Keystone: probability/response; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: interpretation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The cloud now separates populated land from deep ocean.

**Question card story setup - exact player copy:** Nearly all justified primary-body orbit trials intersect the ocean, and the complete three-sigma envelope no longer touches any populated land. Read the cloud against the precommitted stand-down and continued-monitoring thresholds.

**Question card story-science connection - exact player copy:** Location refinement can change exposure even when impact remains likely.

**Player-visible data and equations - exact player copy:** Primary-body impact probability = 96%; the complete three-sigma corridor does not intersect populated land. The published rule requires verified land exclusion for stand-down while preserving ocean and coastal monitoring.

**Required action order - exact player copy:** READ THE FULL CLOUD → CHECK LAND INTERSECTION → APPLY THE PUBLISHED RULE → SUBMIT THE RESPONSE CONCLUSION.

**Question card prompt - exact player copy:** Submit the 96% impact value, the land-intersection result, and one response conclusion: LAND STAND-DOWN or LAND EVACUATION.

**Expected submission - exact player copy:** one impact probability in percent, one land-intersection result, and one response conclusion

**Complete format-specific interaction block:**

~~~yaml
cloud:
  primary_impact_probability_percent: 96
  confidence_envelope_sigma: 3
  populated_land_intersection: false
  points:
    - {id: impact_weight, setting: full weighted cloud, reading: 96 percent intersects Earth}
    - {id: land_test, setting: complete three-sigma envelope, reading: no populated-land intersection}
    - {id: ocean_test, setting: primary impact region, reading: deep-ocean corridor}
  published_rule: verified_land_exclusion_allows_land_stand_down
  correct_conclusion: land_stand_down
  continuing_actions: [ocean_monitoring, coastal_monitoring, independent_verification]
~~~

**Correct result:** Stand down land evacuation and retain ocean/coastal monitoring.

**Answer text:** The hazard remains, but exposure changed.

**Why:** CLOUD maps the ensemble to an action threshold.

**Wrong-path feedback:** Ocean impact is neither total all-clear nor land-evacuation trigger.

**State/output:** LAND CORRIDOR EXCLUDED pending holdout.

## Stop 52 - Reveal the independent holdout

**Format/placement:** HOLDOUT, at `radar-console`.

**Metadata:** Concept: independent verification; Keystone: prediction/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** A disruptive stand-down deserves confirmation outside the corrected optical pipeline.

**Question card story setup - exact player copy:** Freeze the ocean-range prediction before opening Tomás's separately clocked radar pass. Reveal its measured range, test the acceptance window, and carry the independent result to OPS under the published protocol.

**Question card story-science connection - exact player copy:** Independent data can confirm a conclusion without inheriting its correction.

**Player-visible data and equations - exact player copy:** Predicted range = 18,420 km with acceptance window ±12 km. The independent holdout measurement appears only after the prediction and rejection rule are committed.

**Required action order - exact player copy:** COMMIT PREDICTION → REVEAL HOLDOUT → MEASURE RANGE → INTERPRET AGAINST THE FROZEN WINDOW.

**Question card prompt - exact player copy:** Commit the 18,420 ± 12 km prediction first; after reveal, submit the measured range in kilometers and the resulting stand-down conclusion.

**Expected submission - exact player copy:** one committed prediction followed by one evidence-based conclusion

**Complete format-specific interaction block:**

~~~yaml
holdout:
  commit_required: true
  fit: {predicted_range_km: 18420, acceptance_half_width_km: 12}
  reveal_after_commit: {measured_range_km: 18426}
  score: {absolute_difference_km: 6, result: pass, response_conclusion: land_stand_down}
  correct_conclusion: pass_holdout_and_stand_down_land_corridor
~~~

**Correct result:** Holdout passes; execute the land stand-down.

**Answer text:** Independent radar supports the corrected optical solution.

**Why:** HOLDOUT tests a frozen prediction outside the fitted data.

**Wrong-path feedback:** Do not move the window after seeing the result.

**State/output:** PRIMARY SOLUTION VERIFIED; OPS issues stand-down.

## Mission outcome

Mission decision: End the land alert for the main body. Fixed sky data and a separate radar test put its full path over deep ocean. Keep a fair watch on the coast.

**Pre-card character beat:** Jordan cancels mass-movement staging for nine million people while keeping coastal monitoring active. For one quiet minute, the operations floor believes the hardest decision is over.

### Post-mission metric screen - exact player copy

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan cancels mass-movement staging for nine million people while keeping coastal monitoring active. For one quiet minute, the operations floor believes the hardest decision is over.



**Automatic change:** Solution +10 | Response +5 | Reserve -5 | Trust +4.

**Canonical QA:** Allocate 10 RP as Reserve +5, Trust +1, Response +4 -> 100 / 100 / 90 / 89.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- Controls expose bias; corrections should leave plausible scatter; location changes risk; holdouts verify independently.

- **Mission takeaway:** A defensible stand-down is a planetary-defense success.

---

# Mission 14 - The Second Echo

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 1 DAY

**Card title:** THE SECOND ECHO

**Go now:** Go to Coordination for the anomaly review, inspect the second return at Radar, and open any new orbit track at Orbit Determination.

**Card body:** The main body is headed for deep ocean, but the weak radar shoulder has separated from its predicted echo. One instrument anomaly could be harmless; agreement with a fresh optical point would make it a new object. Verify the primary, probe the return, trace independence, and diagnose the minimum claim. By the end of the mission, you will decide whether the apparent all-clear hides a separate damaging fragment.

**Objective:** Decide whether the apparent all-clear hides a separate damaging fragment.

### Worth knowing first - exact player copy

#### Glossary terms

Fragment: a separated piece moving on its own trajectory.

Dual return: two distinguishable radar echoes.

Independent channel: a measurement path without the same likely error source.

Ephemeris: a prediction of an object’s position at specified times.

#### Primer concepts

- A new object can exist without invalidating the verified primary orbit.
- Independent relative motion distinguishes separation from a connected rotating lobe.
- Object existence and impact location are separate claims requiring different evidence.

#### Equations first needed today

No new equation is introduced; this mission retrieves equations and evidence rules already recorded in the mission log.

**Crew on this mission - mission log:** Mira Chen, Tomás Ibarra, Lena Ortiz, Malik Rowan.

**Target time:** 10:00.

## Main story happening - designer summary

**Story purpose:** Reverse the apparent victory without invalidating the science that produced it.

**Route:** OPS Coordination Office -> RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.

**Cast:** Mira Chen, Tomás Ibarra, Lena Ortiz, Malik Rowan.

**Target time:** 10:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persistent world changes, or waypoint notices; no is required.*

**Beat 1 - On arrival at Coordination Office | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira orders one final anomaly review before demobilization.

**Panel/HUD text:** THE SECOND ECHO / MISSION ACTIVE

**Dialogue bubbles -** Tomás Ibarra: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 53.

**Beat 2 - After Stop 53 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Tomás verifies the main echo and measures a separating secondary.

**Panel/HUD text:** THE SECOND ECHO / FIRST RESULT LOGGED

**Dialogue bubbles -** Tomás Ibarra: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 54.

**Beat 3 - After Stop 54 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Lena reports an uncataloged optical point at the secondary ephemeris.

**Panel/HUD text:** THE SECOND ECHO / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Tomás Ibarra: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 55.

**Beat 4 - After Stop 55 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Malik opens a distinct fragment track: approximately 32 meters.

**Panel/HUD text:** THE SECOND ECHO / DECISION EVIDENCE READY

**Dialogue bubbles -** Tomás Ibarra: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 56.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE SECOND ECHO / MISSION DECISION LOGGED

**Dialogue bubbles -** Tomás Ibarra: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 14 outcome, metric screen, concept review, and Mission 15 briefing.

## Location plan

**Mission route:** OPS Coordination Office -> RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Mira Chen, Tomás Ibarra, Lena Ortiz, Malik Rowan. The central beat is: Reverse the apparent victory without invalidating the science that produced it.

**Target time:** 10:00.

## Key concepts, explained here

A new object can exist without invalidating the verified primary orbit. Independent relative motion distinguishes separation from a connected rotating lobe. Object existence and impact location are separate claims requiring different evidence. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

pre-rendered sequence or forced viewpoint change

## Stop 53 - Verify the primary track

**Format/placement:** VERIFY, at `scopeboard`.

**Metadata:** Concept: primary solution; Keystone: evidence/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The review must not casually reopen a solution that passed independent tests.

**Question card story setup - exact player copy:** Compare the released primary ephemeris with the corrected optical fit, independent radar holdout, and the complete archived provenance record. Verify whether any new evidence actually contradicts the main ocean-impact track.

**Question card story-science connection - exact player copy:** Revision changes the claims touched by new evidence, not every result.

**Player-visible data and equations - exact player copy:** Before evidence unlocks, commit the numerical predictions: corrected optical mean residual = 0.00 arcsec with acceptance |mean| ≤ 0.10 arcsec; independent radar range = 18,420 km with acceptance |measured − predicted| ≤ 12 km; missing provenance links = 0. Then inspect each record.

**Required action order - exact player copy:** CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET.

**Question card prompt - exact player copy:** Commit the numerical prediction set (0.00 arcsec, 18,420 km, and 0 missing links) and both acceptance tolerances before the panels unlock; then operate each panel, measure all three results, and submit three PASS/FAIL checks plus KEEP PRIMARY TRACK or REOPEN PRIMARY TRACK.

**Expected submission - exact player copy:** one committed three-number prediction set with tolerances, three measured results with PASS/FAIL checks, and one track conclusion

**Complete format-specific interaction block:**

~~~yaml
verify:
  prediction_commit_required: true
  prediction:
    prompt: Commit the optical residual, independent radar range, and missing-link predictions before opening the evidence panels.
    formula: "optical pass if |mean| <= 0.10 arcsec; radar pass if |measured - 18420 km| <= 12 km; provenance pass if missing links = 0"
    correct: {corrected_optical_mean_arcsec: 0.00, independent_radar_range_km: 18420, missing_provenance_links: 0}
    unit: mixed_as_labeled
    tolerance: {optical_abs_mean_arcsec: 0.10, radar_abs_difference_km: 12, missing_links: 0}
  evidence_unlocks_after_commit: true
  action: {id: inspect_panels, label: Inspect corrected optical, independent radar, and provenance panels}
  measurement:
    corrected_optical_mean_arcsec: 0.01
    independent_radar_range_km: 18426
    missing_provenance_links: 0
  checks: {corrected_optical_fit: pass, independent_radar_holdout: pass, provenance: pass}
  required_sequence: [commit_prediction, inspect_panels, measure_all_three_results, interpret]
  truth: All three numerical checks pass, so the primary ocean track remains verified.
  correct_conclusion: keep_primary_track
~~~

**Correct result:** Keep the primary ocean solution.

**Answer text:** A second signal may add an object without making the first solution wrong.

**Why:** VERIFY applies explicit acceptance criteria.

**Wrong-path feedback:** A new anomaly does not discard unrelated verified evidence.

**State/output:** PRIMARY TRACK LOCKED.

## Stop 54 - Probe the separated return

**Format/placement:** PROBE, at `radar-console`.

**Metadata:** Concept: secondary echo; Keystone: observation/analysis; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** A detached return develops a path distinct from rotating lobes.

**Question card story setup - exact player copy:** Probe the latest radar frames and compare the weak return with predictions for a connected lobe, stationary interference, and a freely separating body. Track whether its delay changes independently over time.

**Question card story-science connection - exact player copy:** Independent relative motion distinguishes a separate object from structure or artifact.

**Player-visible data and equations - exact player copy:** Operate six calibrated radar frames. Measure whether the secondary delay stays fixed, periodically merges with the primary, or separates monotonically; submit the observed motion pattern and classification.

**Required action order - exact player copy:** OPERATE THE FRAME SERIES → MEASURE SECONDARY DELAY IN ALL SIX FRAMES → COMPARE THREE MODEL PREDICTIONS → INTERPRET.

**Question card prompt - exact player copy:** Submit all six measured secondary-minus-primary delays in milliseconds and one classification: CONNECTED LOBE, STATIONARY INTERFERENCE, or SEPARATING-BODY CANDIDATE.

**Expected submission - exact player copy:** six numerical delay readings in milliseconds and one motion classification

**Complete format-specific interaction block:**

~~~yaml
probe:
  points:
    - id: frame_1
      load: "Calibrated frame 1; measure secondary delay relative to the primary."
      reading: {secondary_minus_primary_delay_ms: 0.20}
      expected: {separating_body_delay_ms: 0.20}
      comparison: "Matches the separating-body prediction; connected-lobe and interference baselines begin at 0.20 ms."
    - id: frame_2
      load: "Calibrated frame 2; compare with all three motion models."
      reading: {secondary_minus_primary_delay_ms: 0.34}
      expected: {separating_body_delay_ms: 0.35}
      comparison: "Increases as predicted; stationary interference would remain near 0.20 ms."
    - id: frame_3
      load: "Calibrated frame 3; test for periodic merging or monotonic separation."
      reading: {secondary_minus_primary_delay_ms: 0.51}
      expected: {separating_body_delay_ms: 0.50}
      comparison: "Matches monotonic separation; a connected lobe would begin returning toward the primary."
    - id: frame_4
      load: "Calibrated frame 4; continue the independent-delay track."
      reading: {secondary_minus_primary_delay_ms: 0.66}
      expected: {separating_body_delay_ms: 0.65}
      comparison: "Continues outward instead of periodically merging."
    - id: frame_5
      load: "Calibrated frame 5; compare the measured offset with the free-separation prediction."
      reading: {secondary_minus_primary_delay_ms: 0.79}
      expected: {separating_body_delay_ms: 0.80}
      comparison: "Within 0.01 ms of the station-specific free-separation expectation."
    - id: frame_6
      load: "Calibrated frame 6; perform the final model comparison."
      reading: {secondary_minus_primary_delay_ms: 0.96}
      expected: {separating_body_delay_ms: 0.95}
      comparison: "The full series is monotonic; interference would be stationary and a lobe would merge periodically."
  model_expectations:
    connected_lobe: periodic_merge
    stationary_interference: constant_delay
    separating_body: monotonic_delay_increase
  correct_classification: separating_body_candidate
  required_samples: [frame_1, frame_2, frame_3, frame_4, frame_5, frame_6]
  truth: {motion_pattern: monotonic_delay_increase, classification: separating_body_candidate}
  commit_gate: All six calibrated frames sampled.
~~~

**Correct result:** Candidate separated body, pending independent evidence.

**Answer text:** Its delay changes independently from the primary.

**Why:** PROBE tests competing time-series predictions.

**Wrong-path feedback:** Radar supports candidacy, not yet a public declaration.

**State/output:** SECONDARY TRACK CANDIDATE.

## Stop 55 - Trace independent confirmation

**Format/placement:** TRACE, at `echo-archive`.

**Metadata:** Concept: confirmation; Keystone: provenance/independence; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** A second instrument must not secretly reuse the radar signal.

**Question card story setup - exact player copy:** Lena reports a faint optical point near the predicted secondary ephemeris after the radar shift begins. Trace its image, timestamp, reduction pipeline, and blind-search log to decide whether it independently confirms the radar candidate.

**Question card story-science connection - exact player copy:** Independent detection lowers the chance that one instrument's artifact created the object.

**Player-visible data and equations - exact player copy:** Trace four labelled channels: optical position, optical timestamp, blind-search log, and radar secondary delay. The first three share the DISC optical packet and optical-only reduction; the radar delay uses separate hardware, timing, and processing. Confirm whether either path depends on the other's signal.

**Required action order - exact player copy:** OPEN EACH OPTICAL DEPENDENCY → TRACE CAMERA, CLOCK, PIPELINE, AND SEARCH LOG → CHECK FOR RADAR DEPENDENCE → SUBMIT THE CHAIN AND CONCLUSION.

**Question card prompt - exact player copy:** Submit the completed optical dependency chain and one conclusion: INDEPENDENT or NOT INDEPENDENT.

**Expected submission - exact player copy:** one completed dependency chain and conclusion

**Complete format-specific interaction block:**

~~~yaml
trace:
  shared_resources:
    - {id: disc_optical, label: DISC optical packet and reduction}
    - {id: radar_path, label: RADAR hardware, clock, and processing}
  target: disc_optical
  channels:
    - {id: optical_position, label: Optical sky position, reading: candidate present, expected: point near secondary ephemeris, depends_on: [disc_optical]}
    - {id: optical_timestamp, label: Optical UTC timestamp, reading: valid, expected: separate clock pass, depends_on: [disc_optical]}
    - {id: blind_search, label: Blind-search log, reading: search completed before coordinate share, expected: no radar coordinates used, depends_on: [disc_optical]}
    - {id: radar_delay, label: Radar secondary delay, reading: monotonic separation, expected: separating-body track, depends_on: [radar_path]}
  truth: {dependent_channels: [optical_position, optical_timestamp, blind_search], independent_channels: [radar_delay]}
  correct: Optical and radar detections are independent evidence paths.
~~~

**Correct result:** Accept independent confirmation.

**Answer text:** Separate hardware, timing, processing, and blind search break the error chain.

**Why:** TRACE establishes evidence origin and dependencies.

**Wrong-path feedback:** Agreement is strongest when channels could fail differently.

**State/output:** SECONDARY DETECTION transferred to ORBIT.

## Stop 56 - Diagnose the fragment

**Format/placement:** DIAGNOSIS, at `fit-board`.

**Metadata:** Concept: fragment identification; Keystone: synthesis/decision; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: diagnosis.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** Open a new hazard track without overstating a one-night orbit.

**Question card story setup - exact player copy:** Radar separation, independent optical detection, and brightness consistent with roughly 32 meters now require one shared explanation. Diagnose the minimum claim, preserve broad trajectory uncertainty, and reopen the response protocol.

**Question card story-science connection - exact player copy:** A smaller object can carry lower energy yet greater land exposure.

**Question card prompt - exact player copy:** Diagnose the evidence and state the immediate action.

**Expected submission - exact player copy:** one fragment diagnosis and one immediate recovery-and-staging action

**Complete format-specific interaction block:**

~~~yaml
headline: Which claim fits all fragment evidence without exceeding it?
readings:
  - {zone: radar, label: independent delay change, value: monotonic across six frames, status: alarm}
  - {zone: optical, label: independent point, value: recovered near predicted secondary ephemeris, status: alarm}
  - {zone: brightness, label: conditional diameter, value: about 32 m, status: alarm}
  - {zone: orbit, label: corridor, value: broad one-night solution, status: quiet}
choices:
  - {id: artifact, label: Radar artifact only, mechanism: contradicted by independent optical recovery}
  - {id: attached_lobe, label: Attached rotating lobe, mechanism: contradicted by monotonic independent delay}
  - {id: fragment, label: Separated fragment with broad corridor, mechanism: fits radar, optical, and brightness evidence}
  - {id: known_city, label: Confirmed city impact, mechanism: exceeds the one-night orbit evidence}
answer: fragment
required_action: urgent_recovery_plus_reversible_staging
~~~

**Correct result:** Open a verified fragment track and urgent recovery, not a city order.

**Answer text:** Real enough to pursue; uncertain enough to forbid a bullseye.

**Why:** DIAGNOSIS synthesizes findings while retaining uncertainty.

**Wrong-path feedback:** Existence and location are different claims.

**State/output:** 32 M FRAGMENT TRACK opens.

## Mission outcome

Mission decision: Keep the main-body land stand-down. Open a new track for the separate 32 m piece. Start urgent search work and staged plans for it.

**Pre-card character beat:** The primary all-clear stays green as a second red track appears. Mira says, “We were right about the large body. Now be right about the smaller one.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The primary all-clear stays green as a second red track appears. Mira says, “We were right about the large body. Now be right about the smaller one.”



**Automatic change:** Solution -8 | Response +3 | Reserve -4 | Trust -4.

**Canonical QA:** Allocate 10 RP as Reserve +1, Trust +1, Solution +8 -> 92 / 100 / 91 / 90.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- New evidence can add rather than overturn; relative motion signals separation; independence is provenance; existence and trajectory uncertainty differ.

- **Mission takeaway:** Preserve the anomaly long enough for it to become evidence.

---

# Mission 15 - The Honest Warning

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: LESS THAN 12 HOURS

**Card title:** THE HONEST WARNING

**Go now:** Go to the Survey Telescope for the final recovery, carry the positions to Orbit Determination, and execute the response from the Town Emergency Office.

**Card body:** The fragment is far smaller than the primary, yet its possible land corridor and short warning time make it urgent. One final recovery can extend its arc enough to test the response thresholds already published. Verify the detection, combine track and consequence, then act without inflating or minimizing the hazard. By the end of the mission, you will issue the final warning and execute the proportionate protective response.

**Objective:** Issue the final warning and execute a proportionate protective response.

### Worth knowing first - exact player copy

#### Glossary terms

Recovery: finding a previously detected object again to extend its observation arc.

Airburst corridor: the possible locations where atmospheric energy release may occur.

Action envelope: the places and people included in a protective response.

All-clear: a stand-down claim tied to one specific hazard track.

#### Primer concepts

- A 32-meter object can be locally devastating without being globally catastrophic.
- Risk decisions combine probability, consequence, warning time, and exposure.
- The final order should cover the verified corridor and preserve monitoring of the primary.

#### Equations first needed today

**Equation:** m = (4/3)πr³ρ; KE = ½mv²

**What it is for:** checking the fragment energy range

**Symbols:** m is mass; r is radius; ρ is density; KE is kinetic energy; v is speed

**Why this campaign needs it:** The response threshold depends on whether the fragment can produce damaging effects.

**Crew on this mission - mission log:** Lena Ortiz, Malik Rowan, Evelyn Park, Jordan Hale, Mira Chen.

**Target time:** 12:00.

## Main story happening - designer summary

**Story purpose:** Pay off every evidence rule in a fast, proportionate, life-saving decision.

**Route:** DISC Survey Telescope -> ORBIT Orbit Determination Center -> TOWN Emergency Management Office.

**Cast:** Lena Ortiz, Malik Rowan, Evelyn Park, Jordan Hale, Mira Chen.

**Target time:** 12:00.

## Player-facing beat script - dialogue bubbles and world changes

*The mission briefing appears before travel. Accepting it activates the Go now waypoint. Each beat is delivered through dialogue bubbles, equipment displays, persis required.*

**Beat 1 - On arrival at Survey Telescope | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Lena recovers the fragment in the last dark window.

**Panel/HUD text:** THE HONEST WARNING / MISSION ACTIVE

**Dialogue bubbles -** Mira Chen: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 57.

**Beat 2 - After Stop 57 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Malik builds a narrow populated land corridor.

**Panel/HUD text:** THE HONEST WARNING / FIRST RESULT LOGGED

**Dialogue bubbles -** Mira Chen: “That result is now part of the record. Use it in the next test.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 58.

**Beat 3 - After Stop 58 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Evelyn bounds the event near 0.7–2 megatons TNT.

**Panel/HUD text:** THE HONEST WARNING / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Mira Chen: “The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** The Emergency Management Office waypoint and Stop 59.

**Beat 4 - After Stop 59 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan applies the published threshold to protect 180,000 people.

**Panel/HUD text:** THE HONEST WARNING / DECISION EVIDENCE READY

**Dialogue bubbles -** Mira Chen: “The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 60.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE HONEST WARNING / MISSION DECISION LOGGED

**Dialogue bubbles -** Mira Chen: “The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 15 outcome, final metric screen, concept review, and campaign epilogue.

## Location plan

**Mission route:** DISC Survey Telescope -> ORBIT Orbit Determination Center -> TOWN Emergency Management Office.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Lena Ortiz, Malik Rowan, Evelyn Park, Jordan Hale, Mira Chen. The central beat is: Pay off every evidence rule in a fast, proportionate, life-saving decision.

**Target time:** 12:00.

## Key concepts, explained here

A 32-meter object can be locally devastating without being globally catastrophic. Risk decisions combine probability, consequence, warning time, and exposure. The final order should cover the verified corridor and preserve monitoring of the primary. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

istent world changes, or waypoint notices; no pre-rendered sequence or forced viewpoint change

## Stop 57 - Attest the recovery

**Format/placement:** ATTEST, asked by Lena Ortiz beside `pipeline-bench`.

**Metadata:** Concept: fragment recovery; Keystone: evidence/verification; Area: Survey Telescope; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Talk to Lena Ortiz, at the pipeline bench in the Survey Telescope.

**Stop reason - exact player copy:** The final orbit needs another defensible optical position.

**Question card story setup - exact player copy:** A faint point appears inside the fragment search box and moves consistently over three exposures. Attest its identity only after checking timestamps, star-field solution, motion, brightness, and the static-source archive.

**Question card story-science connection - exact player copy:** Recovery extends the arc only when the point is genuinely the same object.

**Question card prompt - exact player copy:** Sign the five backed recovery checks and reject the unsupported city-impact claim.

**Expected submission - exact player copy:** one complete signed-versus-rejected claim set covering five evidence checks and one unsupported claim

**Complete format-specific interaction block:**

~~~yaml
attest:
  verification_limit: 6
  claims:
    - {id: timestamps, text: Timestamps match the independent standard., backed: true, critical: true}
    - {id: astrometry, text: The star-field solution passes., backed: true, critical: true}
    - {id: motion, text: Motion is consistent across three exposures., backed: true, critical: true}
    - {id: magnitude, text: Brightness is consistent with the fragment model., backed: true, critical: false}
    - {id: static_source, text: No static source exists at the measured position., backed: true, critical: true}
    - {id: city_impact, text: The recovered point proves impact on a named city., backed: false, critical: true}
  correct_signed: [timestamps, astrometry, motion, magnitude, static_source]
~~~

**Correct result:** Sign the verified recovery.

**Answer text:** Every identity check agrees, so the positions extend the fragment arc.

**Why:** ATTEST owns a claim against named criteria.

**Wrong-path feedback:** Search-box proximity alone is not identity.

**State/output:** FRAGMENT RECOVERED.

## Stop 58 - Balance orbit and consequence

**Format/placement:** BALANCE, at `astro-bench`.

**Metadata:** Concept: fragment risk; Keystone: uncertainty/consequences; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The recommendation must combine likelihood, scale, and exposure.

**Question card story setup - exact player copy:** The recovered orbit gives a narrow damaging-airburst corridor over 180,000 people, while size and density ranges imply roughly 0.7 to 2 megatons TNT. Balance probability, consequence, timing, and reversibility against the published rule.

**Question card story-science connection - exact player copy:** Risk decisions combine likelihood and consequence rather than ranking either alone.

**Player-visible data and equations - exact player copy:** Count impact probability = 91%, diameter = 28–36 m, energy = 0.7–2.0 megatons TNT, exposed population = 180,000, warning time < 2 days, and independent verification = yes. Do not count the Torino summary again because it repeats probability and energy.

**Question card prompt - exact player copy:** Submit one threshold conclusion—TARGETED ORDER or CONTINUE STAGING—and identify the numerical evidence that controls it.

**Expected submission - exact player copy:** one threshold conclusion and the numerical evidence supporting it

**Complete format-specific interaction block:**

~~~yaml
balance:
  streams:
    - {id: likelihood, label: Impact probability, value: 91, unit: percent, count: true}
    - {id: diameter, label: Diameter range, value: [28, 36], unit: m, count: true}
    - {id: energy, label: Energy range, value: [0.7, 2.0], unit: Mt TNT, count: true}
    - {id: exposure, label: Exposed population, value: 180000, unit: people, count: true}
    - {id: warning, label: Warning time, value: less_than_2, unit: days, count: true}
    - {id: verification, label: Independent verification, value: independent, unit: status, count: true}
    - {id: torino_summary, label: Torino summary, value: derived, unit: category, count: false}
  published_threshold: high_probability_narrow_damaging_verified_time_critical
  correct_conclusion: targeted_order
~~~

**Correct result:** Every targeted-order criterion is crossed.

**Answer text:** High likelihood, damaging scale, narrow exposure, verification, and short time require action.

**Why:** BALANCE integrates unlike evidence at a decision boundary.

**Wrong-path feedback:** Smaller than the primary is not harmless.

**State/output:** TARGETED ORDER AUTHORIZED.

## Stop 59 - Trigger the promised action

**Format/placement:** TRIGGER, at `threshold-board`.

**Metadata:** Concept: protective order; Keystone: thresholds/response; Area: Emergency Management Office; Learning role: MASTER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the public-action board, in the Emergency Management Office.

**Stop reason - exact player copy:** The response must follow the public rule without exceeding the evidence.

**Question card story setup - exact player copy:** Apply the published, precommitted response ladder to the newly verified 180,000-person fragment corridor. Choose geographic scope, protective action, accessibility measures, and reassessment time while preserving the primary-body stand-down elsewhere.

**Question card story-science connection - exact player copy:** A narrow order reduces exposure without transferring unnecessary risk to millions.

**Player-visible data and equations - exact player copy:** Current verified state: impact probability = 91%; conditional diameter = 28–36 m; populated three-sigma corridor = 180,000 people; independent verification = PASS; warning time < 2 days. Compare every value with the committed TARGETED ORDER rule from Stop 45 and preserve the primary-body land stand-down.

**Required action order - exact player copy:** LOAD THE PRECOMMITTED RULE → READ THE VERIFIED CONDITIONS → SET SCOPE, ACTION, ACCESS, AND REASSESSMENT → SUBMIT THE TRIGGERED PLAN.

**Question card prompt - exact player copy:** Submit the triggered plan for 180,000 people, naming the protective action, accessibility measures, reassessment timing, and preserved primary-body stand-down.

**Expected submission - exact player copy:** one triggered-action plan naming scope, protective action, accessibility measures, and reassessment timing

**Complete format-specific interaction block:**

~~~yaml
trigger:
  committed_rule: high_probability_narrow_damaging_verified_time_critical
  observed_state:
    impact_probability_percent: 91
    exposed_population: 180000
    independently_verified: true
    warning_time_days: less_than_2
  triggered_action:
    scope_people: 180000
    action: shelter_or_move_outside_modeled_airburst_zone
    accessibility: [multilingual_alerts, mobility_support]
    reassessment: every_orbit_update
    preserve_primary_land_stand_down: true
  correct_conclusion: issue_targeted_accessible_updateable_order
~~~

**Correct result:** Issue the targeted, accessible, updateable order.

**Answer text:** The order is urgent, geographically limited, and revisable.

**Why:** TRIGGER converts verified conditions into promised action.

**Wrong-path feedback:** Nationwide evacuation and total all-clear both exceed evidence.

**State/output:** PROTECTIVE ORDER transmitted.

## Stop 60 - Allocate the final response

**Format/placement:** ALLOCATE, at `evac-desk`.

**Metadata:** Concept: execution; Keystone: resources/equity; Area: Emergency Management Office; Learning role: MASTER; Difficulty: L5; Story role: application.

**Call - exact player copy:** Go to the response allocation desk, in the Emergency Management Office.

**Stop reason - exact player copy:** The order only works if resources reach the right people in time.

**Question card story setup - exact player copy:** Allocate previously staged resources to mobility-limited residents, shelters, hospital continuity, multilingual alerts, and a protected reserve for corridor updates. Complete deployment without stripping ongoing coastal monitoring for the primary ocean event.

**Question card story-science connection - exact player copy:** Success means reduced exposure and resilient execution, not merely a correct orbit.

**Player-visible data and equations - exact player copy:** Allocate exactly 100 points in 5-point steps among mobility transport, shelters, hospitals, communications, and reserve. Each item allows 10–40 points; total assigned points must equal 100, reserve must remain at least 10, and coastal monitoring must stay funded from reserve.

**Required action order - exact player copy:** SET ALL FIVE CATEGORY VALUES → CHECK THE 100-POINT TOTAL → CHECK EVERY MINIMUM AND COASTAL-MONITORING CONSTRAINT → SUBMIT THE ALLOCATION AND CONCLUSION.

**Question card prompt - exact player copy:** Submit one five-category allocation totaling 100 points and a conclusion confirming whether every constraint and both hazard tracks remain satisfied.

**Expected submission - exact player copy:** one allocation satisfying every stated constraint

**Complete format-specific interaction block:**

~~~yaml
allocate:
  pool: {label: Final response capacity, value: 100, unit: points}
  items:
    - {id: transport, label: Mobility transport, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: shelters, label: Shelters, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: hospitals, label: Hospitals, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: communications, label: Communications, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
    - {id: reserve, label: Protected reserve, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points}
  questions:
    - {id: clear_zone, label: "Can mobility-limited residents clear the fragment zone?", required: true, needs: {transport: 25}}
    - {id: protect_care, label: "Can shelters and hospitals serve the corridor?", required: true, needs: {shelters: 25, hospitals: 20}}
    - {id: reach_public, label: "Can multilingual alerts reach the corridor?", required: true, needs: {communications: 15}}
    - {id: expand_elsewhere, label: "Can services expand outside both hazard zones now?", required: false, needs: {reserve: 30}}
  correct: {transport: 25, shelters: 25, hospitals: 20, communications: 15, reserve: 15}
  pass_rule: total = 100; every item >= 10; reserve >= 10; coastal monitoring retained
~~~

**Correct result:** Meet all minimums, retain reserve, preserve coastal monitoring.

**Answer text:** The fragment corridor receives protection while the primary remains monitored.

**Why:** ALLOCATE converts decision into constrained, equitable execution.

**Wrong-path feedback:** Spending the reserve makes the system brittle.

**State/output:** All campaign bars reach 100%; closing sequence begins.

## Mission outcome and epilogue - no further quiz

Mission decision: Send and carry out the narrow safety order for 180,000 people. Keep the main-body land stand-down. Watch both objects until each outcome is known.

**Pre-card character beat:** Jordan watches the final transport clear the vulnerable zone. Lena keeps the telescope on the fragment; Tomás keeps the ocean track; nobody calls uncertainty failure.

**Closing scene:** The fragment airbursts over an evacuated industrial edge; windows fail and structures are damaged, but the staged corridor avoids a mass-casualty event. Offshore, the primary enters the ocean inside its verified envelope while coastal systems track measured wave effects. Mira removes the first broad map. “Planetary defense is not promising that nothing reaches Earth,” she says. “It is finding the honest action while time still exists.”

### Post-mission metric screen - exact player copy

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan watches the final transport clear the vulnerable zone. Lena keeps the telescope on the fragment; Tomás keeps the ocean track; nobody calls uncertainty failure.



**Automatic change:** Solution +16 | Response +10 | Reserve +10 | Trust +15.

**Canonical QA:** No final RP spend; all bars cap at 100.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Quick concept review

- detect motion; fit orbit families and residuals; fuse optical and radar evidence; infer size cautiously; estimate energy; distinguish hazard from risk; test deflection against lead time; precommit thresholds; preserve anomalies; communicate conditional claims.

- **Mission takeaway:** Planetary defense is a chain of evidence, decisions, and proportionate action—not a single heroic technology.

---

# 9. Mission-at-a-glance production map

### Mission 1

- **Title:** The Moving Point
- **Objective:** Decide whether the moving point is a credible asteroid detection.
- **Route:** OPS only. All evidence is already present at the scopeboard, archive, and review desk; moving elsewhere would add travel without adding a new measurement.
- **Stops:** 1 What moved?; 2 Rebuild the discovery chain; 3 Explain every clue; 4 Certify only what is known

### Mission 2

- **Title:** Six Points Are Not an Orbit
- **Objective:** Determine whether the allowed orbit family includes a credible Earth encounter.
- **Route:** ORBIT only. The astro-bench, fit-board, and propagation display contain the required calculations and no distant instrument can yet add data before the orbit family is defined.
- **Stops:** 5 Measure the sky rate; 6 Add geometric leverage; 7 Refuse the prettiest fit; 8 Propagate the allowed cloud

### Mission 3

- **Title:** The Probability Goes Up
- **Objective:** Decide whether the current evidence crosses the notification threshold.
- **Route:** OPS only. This is a coordination and communication decision using the orbit products already delivered; no new distant measurement is available during the review.
- **Stops:** 9 Name the number honestly; 10 Why better data made the number worse; 11 Stress the warning; 12 Write the line before the update

### Mission 4

- **Title:** The Last Dark Window
- **Objective:** Fund the observing plan most likely to change the impact decision.
- **Route:** ORBIT only. The mission is an allocation decision using forecasted measurement value; the distant instruments do not operate until the plan is approved.
- **Stops:** 13 Buy evidence, not volume; 14 Build the night; 15 Propagate the error budget; 16 Commit the shared plan

### Mission 5

- **Title:** The Summit Test
- **Objective:** Validate the survey pipeline and certify the new optical positions.
- **Route:** OPS Stop 1, then DISC Stops 2-4. The injection map identifies a detector-region problem that can only be tested by operating the physical summit camera.
- **Stops:** 17 Put known objects through the pipeline; 18 Find the usable exposure; 19 Move the mask, not the object; 20 Predict, observe, verify

### Mission 6

- **Title:** The Darker Answer
- **Objective:** Break the brightness-size degeneracy and adopt a defensible diameter range.
- **Route:** DISC Stop 1, then CHAR Stops 2-4. Visible photometry establishes the degeneracy; only the characterization dome has thermal and spectral measurements to break it.
- **Stops:** 21 Reproduce the assumption; 22 Break the reflected-light locus; 23 Check the thermal temperature; 24 Adopt the consequence body

### Mission 7

- **Title:** The Echo Clock
- **Objective:** Deliver one independently timed radar constraint the orbit team can safely use.
- **Route:** OPS Coordination Office -> RADAR Bistatic Radar Range.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 25 Trace the time chain; 26 Protect the observing protocol; 27 Read delay and Doppler; 28 Freeze the claim before the image

### Mission 8

- **Title:** The Orbit Narrows
- **Objective:** Combine optical and radar evidence into a revised impact probability without double-counting shared errors.
- **Route:** RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 29 Transfer the evidence chain; 30 Balance the fit; 31 Read the b-plane cloud; 32 Stress the planning sentence

### Mission 9

- **Title:** Where It Lands
- **Objective:** Define where protective planning is justified without drawing a false impact bullseye.
- **Route:** ORBIT Orbit Determination Center -> IMPACT Entry & Consequences Lab.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 33 Estimate the energy scale; 34 Order the entry chain; 35 Compare corridor consequences; 36 Buy the decision-changing measurement

### Mission 10

- **Title:** One Object, Two Motions
- **Objective:** Decide whether the asteroid is one compact body or a weak two-lobed system.
- **Route:** CHAR Spectroscopy Dome -> RADAR Bistatic Radar Range.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 37 See the alternating residual; 38 Separate shape from surface; 39 Sweep the radar frames; 40 Diagnose the minimum model

### Mission 11

- **Title:** One Push
- **Objective:** Decide whether space deflection is physically credible with the remaining warning time.
- **Route:** CHAR Spectroscopy Dome -> IMPACT Entry & Consequences Lab -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 41 Carry the mass honestly; 42 Derive the required impulse; 43 Stress the kinetic impactor; 44 Choose the useful action

### Mission 12

- **Title:** The Line We Promise
- **Objective:** Approve a staged response plan before the next orbit result is known.
- **Route:** IMPACT Entry & Consequences Lab -> TOWN Emergency Management Office -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 45 Draw the action thresholds; 46 Allocate limited capacity; 47 Rehearse the decision protocol; 48 Sign the public claims

### Mission 13

- **Title:** Through the Keyhole
- **Objective:** Escalate the primary-body response or defensibly stand down the populated land corridor.
- **Route:** ORBIT Orbit Determination Center -> RADAR Bistatic Radar Range -> OPS Coordination Office.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 49 Test the common offset; 50 Refit the corrected residuals; 51 Read the separated cloud; 52 Reveal the independent holdout

### Mission 14

- **Title:** The Second Echo
- **Objective:** Decide whether the apparent all-clear hides a separate damaging fragment.
- **Route:** OPS Coordination Office -> RADAR Bistatic Radar Range -> ORBIT Orbit Determination Center.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 53 Verify the primary track; 54 Probe the separated return; 55 Trace independent confirmation; 56 Diagnose the fragment

### Mission 15

- **Title:** The Honest Warning
- **Objective:** Issue the final warning and execute a proportionate protective response.
- **Route:** DISC Survey Telescope -> ORBIT Orbit Determination Center -> TOWN Emergency Management Office.   Travel follows the evidence and is never an orientation errand.
- **Stops:** 57 Attest the recovery; 58 Balance orbit and consequence; 59 Trigger the promised action; 60 Allocate the final response

# 10. Stop manifest

| Stop | Mission | Title | Format and placement |
|---:|---:|---|---|
| 1 | 1 | What moved? | CHOICE; Lena Ortiz at the scopeboard. |
| 2 | 1 | Rebuild the discovery chain | SEQUENCE; Plate and Data Archive bench inside OPS. |
| 3 | 1 | Explain every clue | CASEBOOK; Lena Ortiz at the review desk. |
| 4 | 1 | Certify only what is known | ATTEST; Mira Chen at the delivery desk. |
| 5 | 2 | Measure the sky rate | BALLPARK; astro-bench. |
| 6 | 2 | Add geometric leverage | TRIANGULATE; astro-bench. |
| 7 | 2 | Refuse the prettiest fit | RESIDUAL; fit-board. |
| 8 | 2 | Propagate the allowed cloud | CLOUD; fit-board. |
| 9 | 3 | Name the number honestly | CHOICE; Mira Chen at the delivery desk. |
| 10 | 3 | Why better data made the number worse | CLOUD; scopeboard. |
| 11 | 3 | Stress the warning | STRESS; Malik Rowan by live call at the delivery desk. |
| 12 | 3 | Write the line before the update | TRIGGER; scopeboard. |
| 13 | 4 | Buy evidence, not volume | VALUE; Malik Rowan at the fit-board. |
| 14 | 4 | Build the night | SEQUENCE; scope-schedule board. |
| 15 | 4 | Propagate the error budget | PROPAGATE; fit-board. |
| 16 | 4 | Commit the shared plan | SCIENCETANK; Mira Chen at the delivery desk inside ORBIT. |
| 17 | 5 | Put known objects through the pipeline | INJECT; pipeline-bench link in OPS. |
| 18 | 5 | Find the usable exposure | SWEEP; dome-console at DISC. |
| 19 | 5 | Move the mask, not the object | CONTROL; pipeline-bench at DISC. |
| 20 | 5 | Predict, observe, verify | VERIFY; dome-console at DISC. |
| 21 | 6 | Reproduce the assumption | BALLPARK; dome-console at DISC. |
| 22 | 6 | Break the reflected-light locus | DEGENERACY; sizing-board at CHAR. |
| 23 | 6 | Check the thermal temperature | SWEEP; spectrograph at CHAR. |
| 24 | 6 | Adopt the consequence body | DIAGNOSIS; sizing-board at CHAR. |
| 25 | 7 | Trace the time chain | TRACE; OPS scopeboard.   |
| 26 | 7 | Protect the observing protocol | PROTOCOL; RADAR tracking-clock panel.   |
| 27 | 7 | Read delay and Doppler | PROBE; RADAR radar-console.   |
| 28 | 7 | Freeze the claim before the image | HOLDOUT; RADAR echo archive.   |
| 29 | 8 | Transfer the evidence chain | CHAIN; RADAR radar-console.   |
| 30 | 8 | Balance the fit | BALANCE; ORBIT fit-board.   |
| 31 | 8 | Read the b-plane cloud | CLOUD; ORBIT astro-bench.   |
| 32 | 8 | Stress the planning sentence | STRESS; ORBIT fit-board.   |
| 33 | 9 | Estimate the energy scale | BALLPARK; ORBIT astro-bench.   |
| 34 | 9 | Order the entry chain | SEQUENCE; IMPACT energy-bench.   |
| 35 | 9 | Compare corridor consequences | PROBE; IMPACT risk-display.   |
| 36 | 9 | Buy the decision-changing measurement | VALUE; IMPACT deflection-desk.   |
| 37 | 10 | See the alternating residual | RESIDUAL; CHAR photometry-bench.   |
| 38 | 10 | Separate shape from surface | DEGENERACY; CHAR sizing-board.   |
| 39 | 10 | Sweep the radar frames | SWEEP; RADAR radar-console.   |
| 40 | 10 | Diagnose the minimum model | DIAGNOSIS; RADAR echo archive.   |
| 41 | 11 | Carry the mass honestly | BALLPARK; CHAR sizing-board.   |
| 42 | 11 | Derive the required impulse | DERIVE; IMPACT deflection-desk.   |
| 43 | 11 | Stress the kinetic impactor | STRESS; IMPACT deflection-desk.   |
| 44 | 11 | Choose the useful action | VALUE; OPS scopeboard.   |
| 45 | 12 | Draw the action thresholds | TRIGGER; IMPACT risk-display.   |
| 46 | 12 | Allocate limited capacity | ALLOCATE; TOWN evac-desk.   |
| 47 | 12 | Rehearse the decision protocol | PROTOCOL; TOWN threshold-board.   |
| 48 | 12 | Sign the public claims | ATTEST; OPS scopeboard.   |
| 49 | 13 | Test the common offset | CONTROL; ORBIT tracking-rack.   |
| 50 | 13 | Refit the corrected residuals | RESIDUAL; ORBIT fit-board.   |
| 51 | 13 | Read the separated cloud | CLOUD; ORBIT astro-bench.   |
| 52 | 13 | Reveal the independent holdout | HOLDOUT; RADAR radar-console.   |
| 53 | 14 | Verify the primary track | VERIFY; OPS scopeboard.   |
| 54 | 14 | Probe the separated return | PROBE; RADAR radar-console.   |
| 55 | 14 | Trace independent confirmation | TRACE; RADAR echo archive.   |
| 56 | 14 | Diagnose the fragment | DIAGNOSIS; ORBIT fit-board.   |
| 57 | 15 | Attest the recovery | ATTEST; DISC pipeline-bench.   |
| 58 | 15 | Balance orbit and consequence | BALANCE; ORBIT astro-bench.   |
| 59 | 15 | Trigger the promised action | TRIGGER; TOWN threshold-board.   |
| 60 | 15 | Allocate the final response | ALLOCATE; TOWN evac-desk.   |

# 11. Narrative implementation notes

## Environmental state changes

- Evidence panels remain changed after each correct answer; the world must show what the student established.
- Waypoints activate only when the preceding observation creates a reason to travel.
- The primary-body ocean solution and the fragment track remain visually separate after Mission 14.
- Raw data, corrected products, and holdout evidence use different persistent labels.
- The final Town response shows transport, shelters, hospitals, alerts, and reserve capacity as deployed assets.

## Dialogue state

- Dialogue acknowledges correct scientific restraint as strongly as numerical success.
- Wrong answers teach and retry; they never create a dead story branch.
- Character disagreement concerns evidence standards and action thresholds, not arbitrary hostility.
- Do not use jargon in dialogue unless the same card defines it compactly.

## Mission endings

- Every outcome begins with “Mission decision:” and directly answers the briefing promise.
- Apply story deltas, check failure, award Recovery Points, allocate them, show review, then issue the next briefing.
- Mission 15 ends after the decision and epilogue; no additional quiz follows.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every numerical tolerance from the authored inputs.
- Keep probability distinct from certainty and from hazard scales.
- Keep optical angle, radar range, and Doppler velocity roles distinct.
- Preserve the diameter-albedo degeneracy until thermal evidence breaks it.
- Confirm the 260 m energy estimate and 32 m fragment energy range.
- Confirm the intervention capacity remains thousands of times below demand.

## Format checks

- Exactly 15 missions and 60 graded stops appear.
- Stop numbers and every dependency, unlock, and beat reference use the global 1–60 sequence; local decimal or per-mission stop numbers are forbidden.
- Every stop uses the exact house labels in the required order, with one bold label per line and a blank line between fields.
- Every metadata line explicitly labels Concept, Keystone, Area, Learning role, Difficulty, and Story role; `Area` names the subject owner even when the stop is physically elsewhere.
- Section 3 declares every fixture with one place, unique backticked id, legal kind, and player-facing caption; every placement names exactly one declared fixture id.
- Every stop carries `Call - exact player copy`; fixture calls name the fixture and place, while person calls name one rostered person, their fixture, and place.
- Every person stop names one rostered person in both its placement and call; groups and unnamed crew cannot own a stop.
- Every beat heading uses exactly one supported trigger: `On arrival at <PLACE>`, `After Stop N` / `After Stops N and M`, or `At mission end`.
- Every beat supplies a world-state sentence, panel or HUD text, one named speaker with exact dialogue, and a destination waypoint when the next stop changes place.
- Every stop has one canonical format; STACK is absent.
- Every setup has exactly two sentences.
- Every mission card body has four sentences, 30–70 words, and the required fourth-sentence opening.
- Every mission outcome begins immediately with plain-text `Mission decision:` and reads at Flesch–Kincaid grade 6.5 or below.
- Every equation entry contains exactly Equation, What it is for, Symbols, and Why this campaign needs it; every glossary definition is one complete sentence.
- Every CHOICE has exactly four distinct list items, an answer equal to one item verbatim, `why`, and three option-specific rebuttals; no choice list is slash-separated prose.
- Every CHOICE also renders those options as a numbered player-facing list with exactly one `**(correct)**` marker.
- Every stop keeps grading truth in `Correct result` and prints a different explanatory sentence in `Answer text`; discrete wrong options receive separately addressable rebuttals.
- Every PROBE has at least four stations; each station has its own `reading`, explicit station-specific `expected`, and useful `load` or `comparison` field.
- Enforce every format minimum in the rewrite brief: finite over-subscribed VALUE/ALLOCATE boards, reversible numeric CONTROL boards, independent TRACE channels, mixed DIAGNOSIS readings, limited ATTEST claims, non-counting BALANCE streams, and complete CHAIN/DERIVE structures.
- Every format uses its documented block name and required fields; generic `interaction.authored_payload` prose is forbidden.
- All interactive payloads map to the current importer before build.

## Action-clarity and format-payload audit

Run this audit after copy editing and again against the exact target-repository revision immediately before handoff. The supplied question-type document is a routing guide; the current `FORMATS` set and `stopKind()` in `engine/content/normalize.js`, `INSTRUMENTS`/block mapping in `engine/core/instruments.js`, worked canonical examples, and `tools/import-book.mjs` are the executable authority.

- For every multi-phase stop, read only the player-facing card and confirm that the required actions appear in the same order as the interface states.
- For every calculation-plus-experiment stop, confirm the visible order is **CALCULATE AND COMMIT → OPERATE → MEASURE → INTERPRET** and that equipment remains locked until commitment.
- For every numerical stop, verify that all inputs, constants, equations, units, conversions, tolerances, and requested answer units appear outside the hidden payload.
- For every VERIFY stop, confirm the prediction and pass/fail rule are committed before the frame, instrument, or evidence panel unlocks.
- For every CONTROL stop, confirm the card names the changed variable, everything held fixed, each measurement point, and whether the original setting must be restored.
- For every DEGENERACY stop, confirm two numerical controls are named and the graded response includes their numerical pair.
- For every PROBE stop, enumerate the station records and fail if any station lacks `reading`, a station-specific `expected`, and useful `load` or comparison text; do not accept a shared reference range as a substitute.
- For every CHOICE stop, parse `choices` as a four-item collection rather than prose, confirm `answer` matches one item verbatim, and require a distinct rebuttal keyed to each wrong item. Fail any slash-separated option string.
- For TRACE, CHAIN, TRIGGER, CLOUD, SWEEP, HOLDOUT, RESIDUAL, INJECT, ALLOCATE, and every other operated format, confirm the canonical block exists and that the player-facing action order matches the panel's actual controls, reveals, measurements, and commit gates.
- For every prompt, confirm the player knows whether to submit a number, setting, pair, plan, allocation, mapping, or conclusion.
- Fail validation if the hidden payload contains any required action or value that the player-facing instructions omit.

### Audit evidence and handoff gate

| Check | Campaign-source result | Repository handoff requirement |
|---|---|---|
| Area ownership | 60 of 60 stops carry one declared study area, including stops asked in another place | Confirm the imported lesson taxonomy preserves `Area` independently of physical placement |
| Fixture declarations | 23 unique fixtures; every placement names exactly one declared backticked id with a legal kind and caption | Confirm all 23 objects build in their declared places and accept the routed interaction |
| Stop calls | 60 of 60 stops carry exact player copy naming fixture and place; person calls also name one rostered person | Render the mission plan and verify no call falls back to a stop title |
| Beat triggers and content | 75 of 75 beats use arrival, stop-close, or mission-end triggers and contain world, HUD, dialogue, and unlock fields | Fire every beat from its declared event and verify cross-place waypoints |
| Person ownership | All CHOICE, CASEBOOK, SCIENCETANK, VALUE, ATTEST, and STRESS stops name exactly one rostered person | Confirm each person interaction routes to one actor, even when other crew share the scene |
| Verdict separation | 60 of 60 `Answer text` values differ from `Correct result`; both CHOICE stops carry three separately numbered wrong-option rebuttals | Confirm verdict cards print explanatory answer copy rather than the marking key |
| PROBE station records | 3 PROBE stops with 4, 4, and 6 stations; every `probe.points` station carries `reading`, station-specific `expected`, and `load` plus `comparison` | Import, render, and operate every station in the target build |
| CHOICE structure | 2 CHOICE stops; four separate items and three specific rebuttals each | Confirm exact answer-label and rebuttal routing in the rendered card |
| VERIFY commit lock | 2 VERIFY stops; numerical predictions precede equipment/evidence unlock | Attempt premature operation and confirm it is blocked |
| CONTROL causality | 2 CONTROL stops; changed/fixed variables, timing, and restoration are explicit | Drive change and reversal; confirm all measurements grade |
| DEGENERACY response | 2 DEGENERACY stops; both controls and numerical pairs are required | Move both controls and submit the pair in the rendered panel |
| Other operated formats | Every operated stop has a canonical named payload and explicit action order | Run importer traps and instrument drive tests for the repository revision |
| Generic payload ban | No `interaction.authored_payload` remains | Importer must reject any later regression to generic prose |

The source-package audit may be marked complete locally. Because the executable normalizer, instrument registry, worked `books/instruments.yml`, and importer are not bundled with this campaign attachment set, repository importer/render/grade results remain a mandatory handoff gate and must not be inferred from this Markdown alone.

## Metric-economy checks

- Bars start at 42 / 38 / 72 / 64 and remain between 0 and 100.
- RP uses the canonical clamp formula and replay awards only improvement.
- Failure restores the mission-start snapshot.
- Mission 15 reaches 100 / 100 / 100 / 100 on the canonical QA path.

## Story checks

- Travel follows evidence and respects the 1/2/3-location escalation.
- Each major twist is foreshadowed by a preserved clue.
- The Mission 13 stand-down feels earned before Mission 14 opens the fragment track.
- The final action applies the Mission 12 precommitment rather than inventing a new rule.

## Tone and accessibility checks

- Stakes are understandable without prior planetary-defense vocabulary.
- Prompts and outcomes use short concrete sentences.
- Essential evidence is not encoded by color alone.
- Equations, units, tables, and dialogue fit phone and desktop layouts.

# 13. Suggested YAML assembly order for Claude Code

1. Create campaign metadata, opening card, HUD bars, timer, and RP rules.
2. Create locations and fixtures using the supplied place IDs.
3. Create the character roster and dialogue-state keys.
4. Add Missions 1–4 and verify single-location gating.
5. Add Missions 5–10 and verify evidence-caused two-location travel.
6. Add Missions 11–15 and verify three-location synthesis.
7. Add clue flags, holdout locks, metric deltas, outcome screens, and epilogue.
8. Run importer verification and every acceptance test above.

## Recommended content object shape

~~~yaml
mission:
  id: mission_01
  briefing:
    header: string
    title: string
    goNow: string
    body: string
    objective: string
    glossary: []
    primerConcepts: []
    equations: []
  beats:
    - trigger: on_arrival | after_stop | mission_end
      triggerTarget: place_id | stop_id | null
      worldState: string
      panelText: string
      dialogue: {speaker: character_id, text: string}
      unlocks: []
  locations: []
  characters: []
  stops:
    - id: stop_01
      format: canonical_format
      placement: {fixtureId: declared_fixture_id, personId: optional_character_id}
      metadata: {concept: string, keystone: string, area: declared_area_id, learningRole: string, difficulty: string, storyRole: string}
      call: string
      stopReason: string
      storySetup: string
      storyScienceConnection: string
      prompt: string
      interaction: {}
      grading: {}
      answerText: string
      why: string
      wrongPathFeedback: string
      stateOutput: {}
  outcome: {}
  metrics: {}
  review: []
~~~

# 14. Final handoff checklist

1. Map payload labels to the target repository's exact schema and enum spelling; this bible specifies behavior, not importer field names.
2. Keep STACK disabled; use only the named canonical formats and placements.
3. Validate all 60 calls, area assignments, fixture routes, unlocks, travel transitions, and retry paths.
4. Confirm Missions 1–4 use one location, 5–10 use two, and 11–15 use three.
5. Preserve raw evidence, correction provenance, and holdout states.
6. Run phone- and desktop-width checks for prompts, equations, and feedback.
7. Confirm wrong answers teach mechanisms and cannot dead-end progression.
8. Label campaign object names, measurements, institutions, and outcomes as fictional.
9. End after Mission 15; do not append a surprise quiz.
10. Fire all 75 beats from their declared arrival, stop-close, or mission-end events and verify every HUD line, speaker bubble, and waypoint.
