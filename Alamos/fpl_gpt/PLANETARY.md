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

> You are at the Cerro Alto planetary-defense range, where six teams must determine whether a newly found asteroid will strike Earth. It may arrive in eleven days, and the current path places nine million people under a warning that is too broad to act on. Your job is to use astronomy to turn telescope images, radar echoes, and impact models into one defensible response. Director Mira Chen closes the launch binder and says, “Nine million people are waiting for an answer they can act on: find the true path, prove it, and give them the warning that brings them home safe.”

**Delivery:** Show the four sentences together on one full-screen card over the normal Coordination Office view. Continue dismisses the card once, reveals the four-bar HUD at its starting values, and activates the Mission 1 briefing icon. Do not advance the sentences individually.

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
| Jordan Hale | they/them | `TOWN` division emergency manager for Valle Seco | Give counties one clear plan they can execute. | Fears that changing guidance will destroy trust. | “Tell me what happens at each line.” | Uses transparent conditional plans instead of pretending certainty. |
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
| solution | Impact Solution | Primary objective | 40% | Confidence that the correct objects, orbits, and corridors are identified. | Officials cannot know whom to warn. | Final independent fragment orbit and corridor accepted in M15. |
| response | Response Readiness | Secondary requirement | 40% | Ability of local and international teams to act on the science. | No executable protection plan remains. | Staged response is executed and confirmed in M15. |
| reserve | Observing Reserve | Operational reserve | 70% | Remaining telescope, radar, aircraft, staff, and data-link capacity. | The range loses the object and cannot update the warning. | Network handoff is complete in M15. |
| trust | Public Trust | System integrity | 60% | Willingness of officials and the public to follow conditional guidance. | Orders are ignored and the response fragments. | Final warning matches precommitted evidence thresholds in M15. |

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
| CHOICE | 3 | Select an interpretation or evidence-based conclusion. |
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

STACK is not used because the supplied question-type guide marks it suspended. World-graded warm-ups are not used because the campaign brief forbids filler orientation; Mission 1 teaches interaction through the real detection review.

---

# Mission 1 - The Moving Point

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 11 DAYS

**Card title:** THE MOVING POINT

**Go now:** Go to the Coordination Office and meet Lena Ortiz, survey and discovery lead, at the scopeboard.

**Card body:** A telescope has photographed a faint dot moving against the stars. It could be an asteroid, a satellite, or an image defect. Use planetary science to check the six pictures and decide whether this possible asteroid deserves more observing time before it disappears from view.

**Objective:** Decide whether the moving point is a credible asteroid detection.

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
  - id: planetary_m01_we01
    title: Angular motion on the sky
    problem: An object shifts 12 arcseconds between images taken 3 minutes apart. Find its average angular speed. One arcsecond is 1/3600 degree.
    rule: Angular speed=change in sky angle/elapsed time.
    steps:
    - 'Set up the relationship: Angular speed=change in sky angle/elapsed time.'
    - ω=12/3=4 arcseconds/minute.
    answer: Its average angular speed is 4 arcseconds per minute.
    common_mistake: Angular speed alone does not specify physical speed without distance information.
  - id: planetary_m01_we02
    title: Convert pixels to sky angle
    problem: An image scale is 2 arcseconds per pixel. An object shifts 5 pixels. Find angular displacement.
    rule: Angular displacement=pixel displacement×angular scale.
    steps:
    - 'Set up the relationship: Angular displacement=pixel displacement×angular scale.'
    - Δθ=5(2)=10 arcseconds.
    answer: The sky displacement is 10 arcseconds.
    common_mistake: Pixels are detector distances, not angular units until a scale is supplied.
  - id: planetary_m01_we03
    title: Separate detector and sky motion
    problem: Across images with a shifted camera pointing, a bright spot stays at the same detector pixel while the stars move. What does that suggest?
    rule: A detector defect stays tied to detector coordinates; a sky source follows the sky-to-detector mapping.
    steps:
    - Changing pointing moves real sky positions across pixels.
    - The stationary detector spot does not follow that mapping.
    answer: The pattern supports a detector artifact as a candidate explanation.
    common_mistake: This diagnostic needs the stated pointing change; one image alone is insufficient.
  - id: planetary_m01_we04
    title: Predict a short motion track
    problem: At times 0,1,2 minutes, a dot is at x=2,5,8 pixels. Use constant image-plane velocity to predict x at 3 minutes.
    rule: x(t)=x0+vt for this short linear approximation.
    steps:
    - 'Set up the relationship: x(t)=x0+vt for this short linear approximation.'
    - v=(5-2)/1=3 pixels/min; x(3)=2+3(3)=11 pixels.
    answer: The predicted position is 11 pixels.
    common_mistake: A short linear track is not a complete gravitational orbit.
  - id: planetary_m01_we05
    title: Convert arcminutes
    problem: Two objects are separated by 3 arcminutes. Express the separation in arcseconds.
    rule: One arcminute equals 60 arcseconds.
    steps:
    - 'Set up the relationship: One arcminute equals 60 arcseconds.'
    - separation=3(60)=180 arcseconds.
    answer: The angular separation is 180 arcseconds.
    common_mistake: Angular minutes are not elapsed-time minutes.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**Dialogue bubbles -** Lena Ortiz: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 2.

**Beat 3 - After Stop 2 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The pipeline path lights from calibrated image to linked tracklet; the plate archive drawer opens.

**Panel/HUD text:** THE MOVING POINT / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Lena Ortiz: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 3.

**Beat 4 - After Stop 3 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The detector map marks the hot pixel elsewhere; the 0.7 s timestamp offset receives a yellow CHECK tag.

**Panel/HUD text:** THE MOVING POINT / DECISION EVIDENCE READY

**Dialogue bubbles -** Lena Ortiz: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 4.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Mira Chen, International NEO Response Director, moves the alert from AUTOMATED to HUMAN-VERIFIED and opens the Orbit Determination call.

**Panel/HUD text:** THE MOVING POINT / MISSION DECISION LOGGED

**Dialogue bubbles -** Lena Ortiz: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 1 outcome, metric screen, concept review, and Mission 2 briefing.

## Location plan

**One location:** OPS only. All evidence is already present at the scopeboard, archive, and review desk; moving elsewhere would add travel without adding a new measurement.

## Characters and dramatic beat

Lena wants the candidate protected from casual dismissal, but her trust in the pipeline makes her minimize the timestamp offset. Mira insists on a narrower certified claim. The player's result lets both be right: the detection is real, while its orbit remains unknown.

## Key concepts, explained here

Angular position is a direction on the sky, not a distance. A nearby object's position can change against distant stars, but image defects and satellites can create false motion. Repeated detections, calibrated coordinates, smooth timing, and independent detector maps strengthen the claim. Absolute magnitude H is recorded now, but no size is claimed because albedo is unknown.

## Stop 1 - What moved?

**Format/placement:** CHOICE, asked by Lena Ortiz beside `scopeboard`.

**Metadata:** Concept: 1 - apparent motion; Keystone: measurement versus inference; Area: Survey Telescope; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Talk to Lena Ortiz, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** The alert cannot enter orbit analysis until the apparent moving point is distinguished from image artifacts.

**Question card story setup - exact player copy:** Six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The first task is to identify which pattern can represent one object moving through the sky.

**Question card story-science connection - exact player copy:** Repeated motion relative to fixed stars determines whether the candidate deserves follow-up as a real sky source.

**Question card prompt - exact player copy:** Select the observation that is hardest for an artifact to imitate.

**Choices:**

1. A point shifts smoothly across four timed frames while stars remain fixed. **(correct)**

2. A point appears once on a known bad detector column.

3. A straight bright streak crosses one exposure.

4. Every star shifts by the same amount after image alignment.

**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Across four timed frames, one faint point shifts smoothly while the reference stars remain fixed; a detector defect stays on one column and a satellite makes a one-frame streak."
  choices:
    - {id: smooth_motion, label: "A point shifts smoothly across four timed frames while stars remain fixed.", correct: true}
    - {id: bad_column, label: "A point appears once on a known bad detector column.", correct: false}
    - {id: bright_streak, label: "A straight bright streak crosses one exposure.", correct: false}
    - {id: shared_shift, label: "Every star shifts by the same amount after image alignment.", correct: false}
  answer: smooth_motion
  rebuttals:
    bad_column: "A detector-fixed feature supplies no repeated path across sky coordinates."
    bright_streak: "A one-frame streak is consistent with a satellite and does not match four timed point detections."
    shared_shift: "Motion shared by every star indicates an alignment error, not one independently moving source."
```

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

**Metadata:** Concept: 18 - discovery pipeline; Keystone: telescope limits; Area: Survey Telescope; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the plate-and-data archive bench, in the Coordination Office.

**Stop reason - exact player copy:** The apparent motion needs an auditable processing history before the discovery alert can be trusted.

**Question card story setup - exact player copy:** With physical motion identified, the team must prove that calibration and linking happened before the alert was issued. Rebuild the pipeline so a later reviewer can see where a false point would have entered.

**Question card story-science connection - exact player copy:** The calibration and linking sequence identifies where a false detection could have entered the discovery chain.

**Question card prompt - exact player copy:** Put the discovery steps in the order needed to make the alert auditable.

**Expected submission - exact player copy:** one ordered plan

**Correct result:** Calibration → detection → linking → catalog/artifact comparison → alert.

**Answer text:** The alert is meaningful because calibrated detections were linked before the candidate was promoted.

**Why:** Linking before calibration or artifact checks can turn detector or alignment errors into false motion.

**Wrong-path feedback:** Begin with what converts pixels and timestamps into comparable sky measurements.

**State/output:** The pipeline path illuminates; the archive drawer and Stop 3 unlock.

## Stop 3 - Explain every clue

**Format/placement:** CASEBOOK, asked by Lena Ortiz beside `review-desk`.

**Metadata:** Concept: 6 - artifact rejection; Keystone: measurement versus inference; Area: Survey Telescope; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Lena Ortiz, at the review desk in the Coordination Office.

**Stop reason - exact player copy:** The processing order is established, leaving each suspicious image feature needing its own explanation.

**Question card story setup - exact player copy:** Because the pipeline is now ordered, each suspicious feature can be tied to a physical cause or left unresolved. Match the frame evidence to explanations before the director accepts the moving point as real.

**Question card story-science connection - exact player copy:** The evidence matches determine whether known artifacts can explain the candidate's repeated motion or only separate features.

**Question card prompt - exact player copy:** Match each observation to the explanation that accounts for it without contradicting the others.

**Expected submission - exact player copy:** one complete evidence-to-explanation mapping





**Complete format-specific interaction block:**

```yaml
casebook:
  evidence:
    - {id: candidate, text: "One faint point shifts smoothly through four timed sky positions while reference stars remain fixed."}
    - {id: streak, text: "One long straight streak appears in a single exposure."}
    - {id: fixed_pixel, text: "One bright point remains on the same detector column."}
    - {id: stars, text: "Reference stars align after the recorded image correction."}
  explanations:
    - {id: moving_source, text: "A nearby object moved against the stars."}
    - {id: satellite, text: "A satellite crossed one exposure."}
    - {id: hot_pixel, text: "A damaged detector pixel stayed fixed on the camera."}
    - {id: good_alignment, text: "The image registration is working."}
  correct_matches:
    candidate: moving_source
    streak: satellite
    fixed_pixel: hot_pixel
    stars: good_alignment
```

**Correct result:** Candidate→moving source; line→satellite; fixed point→hot pixel; stars→good registration.

**Answer text:** Each artifact has its own signature, and none explains the candidate's repeated smooth motion.

**Why:** A valid explanation must fit the relevant observation without breaking quiet evidence elsewhere.

**Wrong-path feedback:** Ask whether the feature stays on one detector location, crosses one exposure, or moves between sky coordinates.

**State/output:** Three false features receive labels; the candidate remains unmasked; Stop 4 unlocks.

## Stop 4 - Certify only what is known

**Format/placement:** ATTEST, asked by Mira Chen beside `delivery-desk`.

**Metadata:** Concept: 18 - claim verification; Keystone: thresholds and verification; Area: Coordination Office; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Mira Chen, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** The discovery review is complete, but the director must not certify an orbit or size it has not measured.

**Question card story setup - exact player copy:** Verify the statements that are backed, and leave the tempting unsupported statements unsigned.

**Question card story-science connection - exact player copy:** The signed claim set distinguishes verified detection from impact and size conclusions still awaiting evidence.

**Question card prompt - exact player copy:** Sign every claim the evidence supports and no claim that still depends on an assumption.

**Expected submission - exact player copy:** one complete signed-versus-rejected claim set






**Complete format-specific interaction block:**

```yaml
attest:
  claims:
    - {id: motion, text: "The source moves relative to fixed stars across four timed images.", supported: true, evidence: "four-frame differential motion"}
    - {id: artifacts, text: "The streak and detector-fixed point have separate artifact explanations.", supported: true, evidence: "single-frame streak and fixed detector column"}
    - {id: impact, text: "The object will strike Earth.", supported: false, missing: "an orbit and propagated uncertainty"}
    - {id: size, text: "The object is about 260 metres wide.", supported: false, missing: "thermal and reflectivity measurements"}
  required_signatures: [motion, artifacts]
  required_rejections: [impact, size]
```

**Correct result:** Sign motion and artifact rejection only.

**Answer text:** The range has a credible moving-object detection, not yet an impact prediction.

**Why:** Scientific attestation separates direct evidence from model-dependent conclusions.

**Wrong-path feedback:** If a statement requires distance, orbit, albedo, or an unaudited timestamp, it is not yet backed.

**State/output:** Alert status becomes HUMAN-VERIFIED; ORBIT call unlocks; the timestamp CHECK tag persists.

## Mission outcome

Mission decision: Spend follow-up time on the alert. Four clean images show one point moving while the stars stay fixed. The range accepts a real object but does not yet claim an impact or a size. The orbit team now has to learn where it is going.

**Pre-card character beat:** Lena Ortiz, survey and discovery lead, says, “Real point, unverified clock, no story added.” Mira sends the six positions to Orbit Determination.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Excellent judgment. You made the right call: Spend follow-up time on the alert. The response team can protect threatened communities with better information.

**Header:** MISSION 1 COMPLETE

**Timer:** TIME {elapsed} / TARGET 08:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The real candidate enters continuous follow-up; one optical window is consumed.

**Automatic bar change:** IMPACT SOLUTION +6 | OBSERVING RESERVE -4

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or save it in the Recovery Bank.

**Canonical QA example:** Award 10 RP; Response Readiness +10; bars 48 / 48 / 68 / 64; bank 0.

**Failure check:** If Observing Reserve reaches 0%, restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Moving Point. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Moving Point, six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies a moving source to the observations and physics?

**Options - exact player copy:**

- A. Several detections linked as one moving object during a short observing period.
- B. Precise measurement of an object's sky position and the time of that measurement.
- C. A false feature created by the detector, image processing, or another object such as a satellite.
- D. Differential motion across calibrated images is evidence for a moving source; one-frame features are not.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for a moving source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Tracklet, not Astrometry. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. precise measurement of an object's sky position and the time of that measurement.
- C: This describes Artifact, not Astrometry. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes apparent motion, not Astrometry. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Moving Point: six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies a moving source to the observations and physics?

**Options - exact player copy:**

- A. Precise measurement of an object's sky position and the time of that measurement.
- B. A false feature created by the detector, image processing, or another object such as a satellite.
- C. Several detections linked as one moving object during a short observing period.
- D. Differential motion across calibrated images is evidence for a moving source; one-frame features are not.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for a moving source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Astrometry, not Tracklet. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Artifact, not Tracklet. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. several detections linked as one moving object during a short observing period.
- D: This describes apparent motion, not Tracklet. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Moving Point using new evidence: six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies a moving source to the observations and physics?

**Options - exact player copy:**

- A. Precise measurement of an object's sky position and the time of that measurement.
- B. Several detections linked as one moving object during a short observing period.
- C. Differential motion across calibrated images is evidence for a moving source; one-frame features are not.
- D. A false feature created by the detector, image processing, or another object such as a satellite.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for a moving source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Astrometry, not Artifact. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Tracklet, not Artifact. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes apparent motion, not Artifact. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a false feature created by the detector, image processing, or another object such as a satellite.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Moving Point: six timed images show one faint point beside fixed stars, a long satellite streak, and a known bad detector column. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies a moving source to the observations and physics?

**Options - exact player copy:**

- A. Differential motion across calibrated images is evidence for a moving source; one-frame features are not.
- B. Precise measurement of an object's sky position and the time of that measurement.
- C. Several detections linked as one moving object during a short observing period.
- D. A false feature created by the detector, image processing, or another object such as a satellite.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for a moving source; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. differential motion across calibrated images is evidence for a moving source; one-frame features are not.
- B: This describes Astrometry, not apparent motion. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Tracklet, not apparent motion. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Artifact, not apparent motion. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Moving Point decision, the team knows this: with physical motion identified, the team must prove that calibration and linking happened before the alert was issued. Which conclusion correctly applies discovery pipeline to the observations and physics?

**Options - exact player copy:**

- A. Precise measurement of an object's sky position and the time of that measurement.
- B. Linking before calibration or artifact checks can turn detector or alignment errors into false motion.
- C. Several detections linked as one moving object during a short observing period.
- D. A false feature created by the detector, image processing, or another object such as a satellite.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for discovery pipeline; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Astrometry, not discovery pipeline. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. linking before calibration or artifact checks can turn detector or alignment errors into false motion.
- C: This describes Tracklet, not discovery pipeline. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Artifact, not discovery pipeline. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Moving Point to this follow-up: because the pipeline is now ordered, each suspicious feature can be tied to a physical cause or left unresolved. Match the evidence to the live explanations now so the investigation carries forward only supported claims. Which conclusion correctly applies artifact rejection to the observations and physics?

**Options - exact player copy:**

- A. Precise measurement of an object's sky position and the time of that measurement.
- B. Several detections linked as one moving object during a short observing period.
- C. A valid explanation must fit the relevant observation without breaking quiet evidence elsewhere.
- D. A false feature created by the detector, image processing, or another object such as a satellite.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for artifact rejection; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Astrometry, not artifact rejection. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Tracklet, not artifact rejection. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a valid explanation must fit the relevant observation without breaking quiet evidence elsewhere.
- D: This describes Artifact, not artifact rejection. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** The moving dot is real, but six sky positions still allow many possible paths through space. Compare paths that fit the measurements and check whether any reach Earth. Decide whether asteroid 2026 PDC needs continuous monitoring as a possible impact threat.

**Objective:** Determine whether the allowed orbit family includes a credible Earth encounter.

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
  - id: planetary_m02_we01
    title: A simple orbital period
    problem: A small body orbits the Sun with semimajor axis a=4 astronomical units. Find period in years using the stated solar-unit approximation.
    rule: P²=a³ for a negligible-mass body orbiting the Sun in these units.
    steps:
    - 'Set up the relationship: P²=a³ for a negligible-mass body orbiting the Sun in these units.'
    - P²=4³=64, so P=8 years.
    answer: The orbital period is 8 years.
    common_mistake: The semimajor axis is not always the body's current distance from the Sun.
  - id: planetary_m02_we02
    title: Position residual
    problem: A model predicts sky coordinate 100 arcseconds and the observed coordinate is 103 arcseconds in the same reference. Find residual.
    rule: Residual=observed-predicted coordinate.
    steps:
    - 'Set up the relationship: Residual=observed-predicted coordinate.'
    - r=103-100=+3 arcseconds.
    answer: The model prediction is 3 arcseconds below the observed coordinate.
    common_mistake: Use the same coordinate reference and units.
  - id: planetary_m02_we03
    title: Why a short arc is ambiguous
    problem: Two moving objects have the same sky direction and angular speed but different unknown distances. Do these observations uniquely determine their physical paths?
    rule: Sky angles alone do not specify full three-dimensional position and velocity.
    steps:
    - The same angular speed can correspond to different transverse speeds at different distances.
    - Different line-of-sight velocities can also remain consistent with a short angular record.
    answer: Several physical paths can fit the same short sky arc.
    common_mistake: A precise angle is not a direct measurement of distance.
  - id: planetary_m02_we04
    title: A simple uncertainty interval
    problem: A coordinate estimate is 10 units with standard uncertainty σ=2 units. Give the center ±3σ interval.
    rule: The stated three-sigma interval is estimate ±3×standard uncertainty.
    steps:
    - 'Set up the relationship: The stated three-sigma interval is estimate ±3×standard uncertainty.'
    - interval=[10-3(2),10+3(2)]=[4,16].
    answer: The interval is 4 to 16 units; a probability interpretation needs a distribution model.
    common_mistake: Three-sigma language alone does not prove a Gaussian error model.
  - id: planetary_m02_we05
    title: Predict a short motion track
    problem: At times 0,1,2 minutes, a dot is at x=2,5,8 pixels. Use constant image-plane velocity to predict x at 3 minutes.
    rule: x(t)=x0+vt for this short linear approximation.
    steps:
    - 'Set up the relationship: x(t)=x0+vt for this short linear approximation.'
    - v=(5-2)/1=3 pixels/min; x(3)=2+3(3)=11 pixels.
    answer: The predicted position is 11 pixels.
    common_mistake: A short linear track is not a complete gravitational orbit.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

Astronomical unit (AU): the average Earth-Sun distance.

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

**Dialogue bubbles -** Malik Rowan: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 6.

**Beat 3 - After Stop 6 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The orbit fan contracts from 1,800 admissible paths to 240.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 7.

**Beat 4 - After Stop 7 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The lowest-RMS solution turns red for PATTERNED RESIDUALS; the random-residual solution stays.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 8.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Earth appears on the propagated encounter plane; the board reads CURRENT IMPACT PROBABILITY 3.2% - MODEL DEPENDENT.

**Panel/HUD text:** SIX POINTS ARE NOT AN ORBIT / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 2 outcome, metric screen, concept review, and Mission 3 briefing.

## Location plan

**One location:** ORBIT only. The astro-bench, fit-board, and propagation display contain the required calculations and no distant instrument can yet add data before the orbit family is defined.

## Characters and dramatic beat

Malik wants mathematical restraint and initially prefers the lowest RMS. The player shows that patterned errors outweigh a marginally smaller average. Malik accepts continuous monitoring while emphasizing that 3.2% is not a prediction of certain impact.

## Key concepts, explained here

An orbit needs position and velocity in three dimensions. Optical astrometry supplies precise directions at known times but weak immediate distance information. Dynamics and viewing geometry reduce the possibilities. Residuals test model adequacy; covariance describes remaining uncertainty. Propagation asks how much of that allowed family reaches Earth.

## Stop 5 - Measure the sky rate

**Format/placement:** BALLPARK, at `astro-bench`.

**Metadata:** Concept: 1 - angular rate; Keystone: angles/time; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L2; Story role: foundation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The verified detection needs a rate of sky motion to initialize the orbit search.

**Question card story setup - exact player copy:** The verified point moves 37 arcseconds during a 24-minute clean interval while the reference stars remain fixed. Estimate its hourly angular rate so the orbit search begins in the correct region.

**Question card story-science connection - exact player copy:** The hourly angular rate constrains the search without pretending that angular motion alone establishes physical speed.

**Question card prompt - exact player copy:** Using the displayed values, submit one angular rate ω in arcseconds per hour.

**Expected submission - exact player copy:** one numerical angular rate in degrees per day

**Correct result:** 92.5 arcsec/hour; accept 83-102 arcsec/hour.

**Answer text:** The object moves about 93 arcseconds per hour.

**Why:** Rate is angular displacement divided by elapsed time, then scaled to one hour.

**Wrong-path feedback:** Keep arcseconds in the numerator and convert 24 minutes to a fraction of an hour.

**State/output:** Rate enters the orbit solver; Stop 6 unlocks.

## Stop 6 - Add geometric leverage

**Format/placement:** CHOICE, at `astro-bench`.

**Metadata:** Concept: 22 - distance constraint; Keystone: orbit geometry; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The measured sky rate still allows objects at different distances to fit the discovery images.

**Question card story setup - exact player copy:** With the sky rate established, the solver still permits trajectories at very different distances and speeds. Switch in the separated-station observation and the exact observer locations to isolate the region where both sight lines cross.

**Question card story-science connection - exact player copy:** The separated-station geometry constrains physical range while leaving velocity uncertainty for later observations.

**Question card prompt - exact player copy:** Choose the constraint-and-range conclusion that provides a defensible physical distance estimate.

**Expected submission - exact player copy:** one selected constraint-and-range conclusion

**§7 authored-board source - CHOICE:** Build this stop from the canonical block below. Use all four complete options, randomize their order, and show the keyed feedback only after submission.

**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Cerro Alto bearing 0.0 ± 2.0 arcsec; East Station bearing 22.8 ± 2.5 arcsec; surveyed baseline 1,310 ± 5 km."
  choices:
    - {id: corrected_parallax, label: "Use both sight lines, the surveyed baseline, and the station-position correction: 0.071–0.089 AU.", correct: true}
    - {id: brightness_only, label: "Use apparent brightness as direct distance: exactly 0.080 AU.", correct: false}
    - {id: one_sightline, label: "Use only the Cerro Alto sight line: 0.071–0.089 AU.", correct: false}
    - {id: uncorrected_baseline, label: "Use both sight lines but skip the station-position correction: 0.060–0.070 AU.", correct: false}
  answer: corrected_parallax
  rebuttals:
    brightness_only: "Brightness mixes distance with size, phase, and albedo, so it cannot supply a unique geometric range."
    one_sightline: "One sight line fixes a direction on the sky but leaves distance unconstrained; the second station creates the parallax angle."
    uncorrected_baseline: "Skipping the surveyed-position correction biases the effective baseline and shifts the inferred distance outside the supported range."
```

**Correct result:** Use both sight lines, surveyed baseline, and station-position correction; range 0.071-0.089 AU.

**Answer text:** Parallax places the object near 0.08 AU while preserving a family of velocities.

**Why:** Separated observing sites view a nearby object from measurably different directions.

**Wrong-path feedback:** Brightness mixes distance, size, phase, and albedo; it is not a direct geometric range.

**State/output:** Orbit family contracts to 240 solutions; Stop 7 unlocks.

## Stop 7 - Refuse the prettiest fit

**Format/placement:** RESIDUAL, at `fit-board`.

**Metadata:** Concept: 11 - model adequacy; Keystone: astrometry/residuals; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The range constraint leaves two plausible orbit fits whose average errors are almost indistinguishable.

**Question card story setup - exact player copy:** Because distance has narrowed, only two candidate orbit families remain, with nearly identical residuals. Compare their error patterns and reject the fit that hides a systematic curve behind a slightly smaller root-mean-square (RMS) error, the summary of typical error size.

**Question card story-science connection - exact player copy:** The residual pattern determines which orbit model can be propagated without carrying a systematic fitting error forward.

**Question card prompt - exact player copy:** Choose the orbit family that is scientifically safer to propagate. Use ordered observation coordinates 1–5 on the residual axis.

**Expected submission - exact player copy:** one residual classification and model conclusion

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 7 - Refuse the prettiest fit"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Choose the orbit family that is scientifically safer to propagate."
  payload: "~~~yaml residual: models: - id: A rms_arcsec: 0.18 residuals_arcsec: [-0.24, -0.16, -0.05, 0.07, 0.15, 0.25] - id: B rms_arcsec: 0.21 residuals_arcsec: [0.18, -0.22, 0.09, -0.19, 0.24, -0.11] correct_model: B correct_conclusion: keep_model_B_and_reject_patterned_model_A pattern_to_reject: monotonic curvature answerText: Model B has slightly larger RMS but random residuals; Model A is systematically wrong. ~~~"
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
  correctConclusion: "Model B."
```

**Correct result:** Model B.

**Answer text:** Keep Model B; Model A's residuals sweep from negative to positive and reveal missing curvature.

**Why:** Random scatter can reflect measurement noise, while ordered residuals indicate model misspecification.

**Wrong-path feedback:** Do not rank only by RMS; inspect whether the sign and size change systematically with time.

**State/output:** Model A is tagged REJECTED: PATTERNED; Stop 8 unlocks.

## Stop 8 - Propagate the allowed cloud

**Format/placement:** CHOICE, at `fit-board`.

**Metadata:** Concept: 28 - impact probability; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The retained fit needs its full uncertainty propagated before the team decides whether monitoring continues.

**Question card story setup - exact player copy:** With the biased fit removed, 240 weighted orbit solutions remain and the nominal path still misses Earth. Propagate the full cloud to the encounter date and measure how much probability intersects Earth's effective cross section.

**Question card story-science connection - exact player copy:** The weighted Earth-intersection probability determines whether the object crosses the monitoring threshold despite a nominal miss.

**Question card prompt - exact player copy:** Submit the weighted impact probability in percent and one conclusion: CONTINUOUS MONITORING or RELEASE FROM MONITORING.

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Result",
  "yLabel": "Impact probability (%)",
  "caption": "Weighted impact probability compared with the monitoring threshold.",
  "bars": [
    {
      "name": "Estimate",
      "value": 3.2
    },
    {
      "name": "Release threshold",
      "value": 1.0
    }
  ]
}
```


**Expected submission - exact player copy:** one weighted impact probability in percent and one monitoring conclusion

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 8 - Propagate the allowed cloud"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Submit the weighted impact probability in percent and one conclusion: CONTINUOUS MONITORING or RELEASE FROM MONITORING."
  payload: "~~~yaml cloud: initial_solutions: 240 points: - {id: propagate_all, setting: all weighted solutions, reading: 240 propagated paths} - {id: include_focusing, setting: gravitational focusing on, reading: 7240 km effective Earth radius} - {id: measure_intersection, setting: weighted Earth intersection, reading: 3.2 percent impact fraction} - {id: nominal_only, setting: nominal solution only, reading: nominal path misses Earth, trap: true} controls: - {id: propagate, label: Propagate all weighted solutions to encounter} - {id: focus, label: Include gravitational focusing} - {id: nominal_only, label: Use nominal solution only, trap: true} earth_effective_radius_km: 7240 weighted_impact_fraction: 0.032 correct_conclusion: continuous_monitoring answerText: 3.2% of the weighted allowed cloud impacts Earth, so continuous monitoring is warranted. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```













**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Of 240 weighted paths propagated with gravitational focusing, 3.2% cross Earth's effective collision area; the single best-fit path misses."
  choices:
    - {id: weighted, label: "Use all weighted paths and focusing: 3.2% impact probability; continue monitoring.", correct: true}
    - {id: nominal, label: "Use only the best-fit path: 0% impact probability; release from monitoring.", correct: false}
    - {id: unweighted, label: "Count each path equally without its weight: 1.7% impact probability; continue monitoring.", correct: false}
    - {id: no_focus, label: "Ignore gravitational focusing: 0.8% impact probability; release from monitoring.", correct: false}
  answer: weighted
  rebuttals:
    nominal: "A nominal miss cannot replace the probability carried by the surrounding paths."
    unweighted: "The paths carry unequal probability, so an unweighted count changes the stated model."
    no_focus: "Removing a stated physical effect makes the collision area too small and changes the decision."
```

**Correct result:** Include all weighted solutions and focusing; 3.2%; continuous monitoring.

**Answer text:** The best-fit line misses, but 3.2% of the allowed probability reaches Earth.

**Why:** Impact probability integrates the uncertainty distribution over Earth's effective collision region.

**Wrong-path feedback:** A nominal miss does not remove risk when the surrounding orbit cloud still crosses Earth.

**State/output:** Sentry-style monitoring flag activates; OPS warning review unlocks.

## Mission outcome

Mission decision: Keep 2026 PDC on the Earth watch list. The best path misses Earth. Yet 3.2% of the allowed paths hit it. The team needs more data before it can act.

**Pre-card character beat:** Malik Rowan, orbit-determination lead, circles Earth inside the long orbit cloud and says, “Not a prediction. Not dismissible.”

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was a sharp decision. Your evidence supports a clear decision: Keep 2026 PDC on the Earth watch list. Cerro Alto now has a clearer path through the uncertainty.

**Header:** MISSION 2 COMPLETE

**Timer:** TIME {elapsed} / TARGET 10:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The orbit family is constrained; another optical block is consumed.

**Automatic bar change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -3

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Solution +1, Response +9; bars 57 / 57 / 65 / 64; bank 0.

**Failure check:** Any bar at 0% restores the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Six Points Are Not an Orbit. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Six Points Are Not an Orbit, the verified point moves 37 arcseconds during a 24-minute clean interval while the reference stars remain fixed. Which conclusion correctly applies Orbit fit to the observations and physics?

**Options - exact player copy:**

- A. Observed position minus the position predicted by a model.
- B. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- C. A description of parameter uncertainties and how their errors move together.
- D. Rate is angular displacement divided by elapsed time, then scaled to one hour.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Orbit fit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Residual, not Orbit fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. a calculation that finds trajectories consistent with measured positions, times, and gravity.
- C: This describes Covariance, not Orbit fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes angular rate, not Orbit fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to Six Points Are Not an Orbit: the verified point moves 37 arcseconds during a 24-minute clean interval while the reference stars remain fixed. Which interpretation of the displayed evidence correctly uses the mission concept?

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

- A. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- B. A description of parameter uncertainties and how their errors move together.
- C. Observed position minus the position predicted by a model.
- D. Rate is angular displacement divided by elapsed time, then scaled to one hour.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Orbit fit, not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Covariance, not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. observed position minus the position predicted by a model.
- D: This describes angular rate, not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Six Points Are Not an Orbit using new evidence: with the biased fit removed, 240 weighted orbit solutions remain and the nominal path still misses Earth. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies Covariance to the observations and physics?

**Options - exact player copy:**

- A. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- B. Observed position minus the position predicted by a model.
- C. Rate is angular displacement divided by elapsed time, then scaled to one hour.
- D. A description of parameter uncertainties and how their errors move together.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Covariance; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Orbit fit, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Residual, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes angular rate, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a description of parameter uncertainties and how their errors move together.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Six Points Are Not an Orbit: the verified point moves 37 arcseconds during a 24-minute clean interval while the reference stars remain fixed. Which conclusion correctly applies angular rate to the observations and physics?

**Options - exact player copy:**

- A. Rate is angular displacement divided by elapsed time, then scaled to one hour.
- B. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- C. Observed position minus the position predicted by a model.
- D. A description of parameter uncertainties and how their errors move together.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for angular rate; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. rate is angular displacement divided by elapsed time, then scaled to one hour.
- B: This describes Orbit fit, not angular rate. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Residual, not angular rate. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Covariance, not angular rate. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Six Points Are Not an Orbit decision, the team knows this: with the sky rate established, the solver still permits trajectories at very different distances and speeds. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies distance constraint to the observations and physics?

**Options - exact player copy:**

- A. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- B. Separated observing sites view a nearby object from measurably different directions.
- C. Observed position minus the position predicted by a model.
- D. A description of parameter uncertainties and how their errors move together.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for distance constraint; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Orbit fit, not distance constraint. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. separated observing sites view a nearby object from measurably different directions.
- C: This describes Residual, not distance constraint. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Covariance, not distance constraint. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from Six Points Are Not an Orbit to this follow-up: because distance has narrowed, only two candidate orbit families remain, with nearly identical average residuals. Which conclusion correctly applies model adequacy to the observations and physics?

**Options - exact player copy:**

- A. A calculation that finds trajectories consistent with measured positions, times, and gravity.
- B. Observed position minus the position predicted by a model.
- C. Random scatter can reflect measurement noise, while ordered residuals indicate model misspecification.
- D. A description of parameter uncertainties and how their errors move together.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for model adequacy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Orbit fit, not model adequacy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Residual, not model adequacy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. random scatter can reflect measurement noise, while ordered residuals indicate model misspecification.
- D: This describes Covariance, not model adequacy. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** New measurements have raised concern that the asteroid could hit Earth. A more precise path does not always mean a safer one. Check the revised probability and its assumptions, then decide whether the evidence meets the agreed rule for notifying other countries.

**Objective:** Decide whether the current evidence crosses the notification threshold.

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
  - id: planetary_m03_we01
    title: Count collision-compatible paths
    problem: In a deliberately equally weighted toy sample of 100 possible paths, 8 cross a target. Estimate collision probability within this sample.
    rule: For equally weighted representative paths, probability estimate=hits/total.
    steps:
    - 'Set up the relationship: For equally weighted representative paths, probability estimate=hits/total.'
    - p=8/100=0.08=8%.
    answer: The sample estimate is 8%, conditional on the model and equal weighting.
    common_mistake: Unweighted counting is invalid if the paths carry unequal probabilities.
  - id: planetary_m03_we02
    title: A probability can rise with precision
    problem: An equally weighted toy set has 10 hitting paths among 100. New evidence leaves 5 hitting paths among 20. Compare probabilities.
    rule: Probability depends on the fraction of supported paths that hit, not only the count of such paths.
    steps:
    - old p=10/100=10%; new p=5/20=25%.
    - The remaining set is smaller but its hitting fraction is larger.
    answer: The model probability rises from 10% to 25% while the supported possibilities narrow.
    common_mistake: Fewer possible paths do not necessarily mean lower impact probability.
  - id: planetary_m03_we03
    title: Probability and expected loss
    problem: Two hypothetical events have probabilities 0.1 and 0.01 and losses 100 and 2000 units. Compare expected losses.
    rule: Expected loss=probability×loss in this two-outcome model.
    steps:
    - 'Set up the relationship: Expected loss=probability×loss in this two-outcome model.'
    - first=0.1(100)=10; second=0.01(2000)=20 units.
    answer: The less probable event has the larger expected loss in this simplified calculation.
    common_mistake: Expected loss is not the loss that must occur on one realization.
  - id: planetary_m03_we04
    title: Read a probability claim
    problem: A model assigns a 20% collision probability. Does that mean 20% of the object will collide?
    rule: Probability quantifies uncertainty about an event under a model, not a physical fraction of the object.
    steps:
    - The event is a collision or no collision for the modeled object.
    - Twenty percent describes the probability assigned to the collision event.
    answer: It does not mean one fifth of the object is predicted to strike.
    common_mistake: Probability and physical size are different quantities.
  - id: planetary_m03_we05
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

**Dialogue bubbles -** Mira Chen: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 10.

**Beat 3 - After Stop 10 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The cloud contracts; IMPACT PROBABILITY changes from 3.2% to 8.0% with the label CURRENT MODEL.

**Panel/HUD text:** THE PROBABILITY GOES UP / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Mira Chen: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 11.

**Beat 4 - After Stop 11 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The 8.0% value survives reasonable reweighting between 6.7% and 9.4%.

**Panel/HUD text:** THE PROBABILITY GOES UP / DECISION EVIDENCE READY

**Dialogue bubbles -** Mira Chen: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 12.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The warning network receives the prewritten notice; outside news alerts appear on the wall display without the qualifying sentence.

**Panel/HUD text:** THE PROBABILITY GOES UP / MISSION DECISION LOGGED

**Dialogue bubbles -** Mira Chen: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 3 outcome, metric screen, concept review, and Mission 4 briefing.

## Location plan

**One location:** OPS only. This is a coordination and communication decision using the orbit products already delivered; no new distant measurement is available during the review.

## Characters and dramatic beat

Mira wants a defensible notice. Evelyn Park, entry-and-consequences lead, joins by radio and pushes for plain human consequences. Malik warns against turning an 8% model result into certainty. The player writes a conditional notice that respects all three constraints.

## Key concepts, explained here

Probability can rise as uncertainty shrinks because Earth may fill more of the remaining distribution. The Torino Scale is broad public communication; the Palermo Scale is a technical comparison to background risk. Neither replaces the underlying probability, size range, date, and uncertainty. Thresholds should be written before emotionally charged updates arrive.

## Stop 9 - Name the number honestly

**Format/placement:** CHOICE, asked by Mira Chen beside `delivery-desk`.

**Metadata:** Concept: 16 - risk language; Keystone: thresholds/verification; Area: Orbit Determination Center; Learning role: RETRIEVE; Difficulty: L2; Story role: character.

**Call - exact player copy:** Talk to Mira Chen, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** The updated probability needs wording suitable for a public notice without turning uncertainty into certainty.

**Question card story setup - exact player copy:** The monitoring board shows a current impact probability, a Torino value, and a Palermo value for the same event. Choose the statement that reports what the 8.0% number means without adding certainty.

**Question card story-science connection - exact player copy:** The selected statement distinguishes model-based impact probability from an inevitable outcome or a hazard-scale category.

**Question card prompt - exact player copy:** Select the sentence that can appear unchanged in the official notice.

**Choices:**

1. The asteroid has an 8.0% model-based chance of impact under the current orbit distribution. **(correct)**

2. The asteroid will miss because the probability is below 50%.

3. The asteroid will hit because the probability rose.

4. Torino 2 means the impact probability is 2%.

**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "The current model gives an 8.0% impact probability and separately assigns Torino and Palermo hazard-scale values."
  choices:
    - {id: model_probability, label: "The asteroid has an 8.0% model-based chance of impact under the current orbit distribution.", correct: true}
    - {id: below_half_miss, label: "The asteroid will miss because the probability is below 50%.", correct: false}
    - {id: rising_means_hit, label: "The asteroid will hit because the probability rose.", correct: false}
    - {id: torino_percent, label: "Torino 2 means the impact probability is 2%.", correct: false}
  answer: model_probability
  rebuttals:
    below_half_miss: "A value below 50% still includes impact solutions and cannot establish a definite miss."
    rising_means_hit: "A rise changes the weight assigned to impact solutions but does not make impact certain."
    torino_percent: "The Torino value is a hazard category, not a percentage probability."
```

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

**Format/placement:** CHOICE, at `scopeboard`.

**Metadata:** Concept: 16 - probability evolution; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The probability rose after better observations, and the notice needs that apparent contradiction explained.

**Question card story setup - exact player copy:** With the language fixed, overlay the old and new orbit clouds on Earth's effective cross section. The new cloud is smaller, but Earth occupies more of it, so measure the resulting probability change.

**Question card story-science connection - exact player copy:** The fraction of the narrower orbit distribution intersecting Earth explains how precision can improve while assessed impact risk increases.

**Question card prompt - exact player copy:** Submit the old and new impact probabilities in percent and one conclusion explaining why the value changed.

**Expected submission - exact player copy:** two measured impact fractions in percent and one comparison conclusion

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 10 - Why better data made the number worse"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Submit the old and new impact probabilities in percent and one conclusion explaining why the value changed."
  payload: "~~~yaml cloud: old: {weighted_solutions: 240, impact_fraction: 0.032, width_km: 48000} new: {weighted_solutions: 180, impact_fraction: 0.080, width_km: 17000} points: - {id: old_cloud, setting: normalize old cloud, reading: 3.2 percent impact at 48000 km width} - {id: new_cloud, setting: normalize new cloud, reading: 8.0 percent impact at 17000 km width} earth_effective_radius_km: 7240 operations: [overlay, normalize_weights, measure_intersection] correct_conclusion: probability_rises_as_cloud_concentrates answerText: The smaller cloud places 8.0% of its weight on Earth, up from 3.2%. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```











**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "The old 48,000 km set of possible paths placed 3.2% of its probability on Earth; the new 17,000 km set places 8.0% on Earth after each set is normalized."
  choices:
    - {id: concentrated, label: "Impact probability rose from 3.2% to 8.0% because the smaller set became more concentrated on Earth.", correct: true}
    - {id: width, label: "Impact probability fell from 8.0% to 3.2% because a narrower set must carry less risk.", correct: false}
    - {id: certain, label: "Impact is now certain because the uncertainty region became smaller.", correct: false}
    - {id: counts, label: "The two probabilities cannot be compared unless both sets contain the same number of paths.", correct: false}
  answer: concentrated
  rebuttals:
    width: "A narrower uncertainty region can carry more impact probability when it contracts toward Earth."
    certain: "The new value is 8.0%, not 100%; improved precision does not itself create certainty."
    counts: "Normalized weights allow probability distributions with different sample counts to be compared."
```

**Correct result:** 3.2% old; 8.0% new.

**Answer text:** Better data narrowed the allowed region toward Earth, so the current impact probability increased.

**Why:** Probability is the normalized weight inside Earth's impact cross section, not the absolute width of the cloud.

**Wrong-path feedback:** Compare the fraction of each cloud on Earth, not which cloud looks larger on the screen.

**State/output:** Explanation sentence enters the notice; Stop 11 unlocks.

## Stop 11 - Stress the warning

**Format/placement:** STRESS, asked by Malik Rowan beside `delivery-desk`.

**Metadata:** Concept: 11 - robustness; Keystone: uncertainty/probability; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Malik Rowan, at the delivery desk in the Coordination Office.

**Stop reason - exact player copy:** The rising probability must survive reasonable error assumptions before it supports notification.

**Question card story setup - exact player copy:** Because the normalized cloud gives 8.0%, vary the astrometric weights, focusing radius, and one-frame timing uncertainty across justified ranges. Determine whether every reasonable case remains above the 1% notification line.

**Question card story-science connection - exact player copy:** The lowest supported probability determines whether the notification threshold is exceeded throughout the sensitivity tests.

**Question card prompt - exact player copy:** Submit the minimum probability in percent and one conclusion: ROBUSTLY ABOVE THRESHOLD or NOT ROBUST.

**Expected submission - exact player copy:** one minimum probability in percent and one above-or-below-threshold conclusion

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 11 - Stress the warning"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Submit the minimum probability in percent and one conclusion: ROBUSTLY ABOVE THRESHOLD or NOT ROBUST."
  payload: "~~~yaml stress: assumptions: - {id: optical_weight, min: 0.7, max: 1.3, baseline: 1.0} - {id: focusing_radius_km, min: 6800, max: 7600, baseline: 7240} - {id: frame_time_sigma_s, min: 0.2, max: 1.0, baseline: 0.7} outcomes_percent: {minimum: 6.7, baseline: 8.0, maximum: 9.4} threshold_percent: 1.0 correct_conclusion: robustly_above_notification answerText: Every justified case remains above 1%, so notification does not depend on one tuning choice. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "impact probability", min: 1, max: 8, nominal: 4.5, step: 1, unit: "%"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 4.5, max: 4.5}
      failsAt: 8
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 4.5, max: 8}
      failsAt: 1
    - id: robust_plan
      label: "Yes; minimum 6.7% remains above 1%."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 1, max: 8}
  robust: robust_plan
  question: "Submit the minimum probability in percent and one conclusion: ROBUSTLY ABOVE THRESHOLD or NOT ROBUST."
```

**Correct result:** Yes; minimum 6.7% remains above 1%.

**Answer text:** The exact probability varies, but the decision to notify is robust.

**Why:** Decision robustness depends on whether reasonable assumptions cross the action boundary, not whether they change the reported number.

**Wrong-path feedback:** Separate uncertainty in the exact percentage from uncertainty about which side of 1% it occupies.

**State/output:** Malik adds ROBUST THRESHOLD CROSSING; Stop 12 unlocks.

## Stop 12 - Write the line before the update

**Format/placement:** TRIGGER, at `scopeboard`.

**Metadata:** Concept: 29 - notification threshold; Keystone: thresholds/verification; Area: Coordination Office; Learning role: INTRODUCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The sensitivity tests justify a notice, whose conditions must be fixed before the next update.

**Question card story setup - exact player copy:** Because the impact probability remains above 1% under every justified test, write the action threshold before revealing the final update. Pair the threshold with consequence and uncertainty language that prevents it from sounding like certainty.

**Question card story-science connection - exact player copy:** The threshold and conditional wording determine when the notice is issued and what it can legitimately promise.

**Question card prompt - exact player copy:** Commit the numerical trigger first; after the 8.0% update appears, submit one action: CONDITIONAL NOTICE or NO NOTICE.

**Expected submission - exact player copy:** one numerical trigger setting and one triggered-action conclusion

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 12 - Write the line before the update"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Commit the numerical trigger first; after the 8.0% update appears, submit one action: CONDITIONAL NOTICE or NO NOTICE."
  payload: "~~~yaml trigger: decision_rule: Issue a conditional international notice when impact probability is greater than 1% and estimated diameter is greater than 10 m. scale: {min: 0, max: 100, unit: percent} anchors: - {value: 1, action: conditional_notice} - {value: 10, action: intensified_planning} - {value: 50, action: impact_as_leading_case} objective: begin coordination without claiming certainty direction: escalate_above consequence_limit: notice must include date, size range, and model uncertainty revealed_update_percent: 8.0 correct_action: conditional_notice answerText: Issue the conditional notice because the robust probability exceeds 1% for an object well above 10 m. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "impact probability", min: 0, max: 12, step: 0.5, unit: "%"}
  start: 2.4
  anchors:
    - {at: 2.4, means: "routine baseline, not the decision threshold"}
    - {at: 7.8, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 2, hoursLeft: 48}
    - {at: "T-24 h", value: 4, hoursLeft: 24}
    - {at: "T-12 h", value: 8, hoursLeft: 12}
    - {at: "T-6 h", value: 10, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 7.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 8, max: 12}, leadHours: 12}
  question: "Commit the numerical trigger first; after the 8.0% update appears, submit one action: CONDITIONAL NOTICE or NO NOTICE."
```

**Correct result:** Issue conditional notice with date, size range, probability, and uncertainty.

**Answer text:** The threshold starts international coordination; it does not announce a certain impact.

**Why:** Precommitted thresholds make action reproducible and reduce motivated changes after alarming evidence appears.

**Wrong-path feedback:** Waiting for certainty wastes warning time; declaring impact ignores the 92% of current probability that misses.

**State/output:** Notice transmits; public news wall activates; Mission 4 observing review unlocks.

## Mission outcome

Mission decision: Send a warning now, but state its limits. The 8.0% result stays above the 1% line in each test. The notice gives the date, size range, and doubt. The next update must earn trust with better data.

**Pre-card character beat:** Mira Chen, International NEO Response Director, sends the notice. Evelyn Park says by radio, “Now give people the condition, not just the number.”

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Outstanding reasoning. The key result is now settled: Send a warning now, but state its limits. Your result gives decision makers time to act without sounding a false alarm.

**Header:** MISSION 3 COMPLETE

**Timer:** TIME {elapsed} / TARGET 09:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The robust warning starts coordination, but incomplete headlines spread.

**Automatic bar change:** IMPACT SOLUTION +5 | OBSERVING RESERVE -2 | PUBLIC TRUST -6

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Solution +1, Response +5, Trust +4; bars 63 / 62 / 63 / 62; bank 0.

**Failure check:** Public Trust at 0% means later protective orders will fail; restore the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Probability Goes Up. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Probability Goes Up, with the language fixed, overlay the old and new orbit clouds on Earth's effective cross section. The next action depends on selecting the conclusion that fits all of those facts. Which statistical conclusion or procedure correctly uses Impact probability?

**Options - exact player copy:**

- A. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- B. The weighted fraction of allowed trajectories that strike Earth under the current model.
- C. A technical logarithmic comparison between one impact risk and the background hazard.
- D. Probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Impact probability; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Torino Scale, not Impact probability. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. the weighted fraction of allowed trajectories that strike Earth under the current model.
- C: This describes Palermo Scale, not Impact probability. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes risk language, not Impact probability. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Probability Goes Up: the monitoring board shows a current impact probability, a Torino value, and a Palermo value for the same event. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies Torino Scale to the observations and physics?

**Options - exact player copy:**

- A. The weighted fraction of allowed trajectories that strike Earth under the current model.
- B. A technical logarithmic comparison between one impact risk and the background hazard.
- C. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- D. Probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Torino Scale; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact probability, not Torino Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Palermo Scale, not Torino Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- D: This describes risk language, not Torino Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Probability Goes Up using new evidence: the monitoring board shows a current impact probability, a Torino value, and a Palermo value for the same event. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies Palermo Scale to the observations and physics?

**Options - exact player copy:**

- A. The weighted fraction of allowed trajectories that strike Earth under the current model.
- B. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- C. Probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.
- D. A technical logarithmic comparison between one impact risk and the background hazard.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Palermo Scale; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact probability, not Palermo Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Torino Scale, not Palermo Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes risk language, not Palermo Scale. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a technical logarithmic comparison between one impact risk and the background hazard.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Probability Goes Up: the monitoring board shows a current impact probability, a Torino value, and a Palermo value for the same event. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies risk language to the observations and physics?

**Options - exact player copy:**

- A. Probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.
- B. The weighted fraction of allowed trajectories that strike Earth under the current model.
- C. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- D. A technical logarithmic comparison between one impact risk and the background hazard.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for risk language; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. probability quantifies uncertainty; it does not become a yes/no fact until the trajectory is sufficiently constrained.
- B: This describes Impact probability, not risk language. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Torino Scale, not risk language. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Palermo Scale, not risk language. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Probability Goes Up decision, the team knows this: with the language fixed, overlay the old and new orbit clouds on Earth's effective cross section. The next action depends on selecting the conclusion that fits all of those facts. Which statistical conclusion or procedure correctly uses probability evolution?

**Options - exact player copy:**

- A. The weighted fraction of allowed trajectories that strike Earth under the current model.
- B. Probability is the normalized weight inside Earth's impact cross section, not the absolute width of the cloud.
- C. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- D. A technical logarithmic comparison between one impact risk and the background hazard.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for probability evolution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact probability, not probability evolution. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. probability is the normalized weight inside Earth's impact cross section, not the absolute width of the cloud.
- C: This describes Torino Scale, not probability evolution. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Palermo Scale, not probability evolution. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Probability Goes Up to this follow-up: because the normalized cloud gives 8.0%, vary the astrometric weights, focusing radius, and one-frame timing uncertainty across justified ranges. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which conclusion correctly applies robustness to the observations and physics?

**Options - exact player copy:**

- A. The weighted fraction of allowed trajectories that strike Earth under the current model.
- B. A public 0-to-10 scale combining impact probability and impact energy for events within 100 years.
- C. Decision robustness depends on whether reasonable assumptions cross the action boundary, not whether they change the reported number.
- D. A technical logarithmic comparison between one impact risk and the background hazard.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for robustness; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact probability, not robustness. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Torino Scale, not robustness. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. decision robustness depends on whether reasonable assumptions cross the action boundary, not whether they change the reported number.
- D: This describes Palermo Scale, not robustness. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** The asteroid will soon disappear into the Sun's glare, and the remaining possible paths include both hits and misses. Compare what pictures, radar, and heat measurements could reveal tonight. Spend the remaining observing time on the measurements most likely to change the response decision.

**Objective:** Fund the observing plan most likely to change the impact decision.

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
  - id: planetary_m04_we01
    title: Choose information that resolves a difference
    problem: 'Two candidate paths predict the same sky direction tonight but very different distances. Which new measurement is more discriminating: another same-precision direction or a precise distance?'
    rule: Useful information separates predictions that otherwise fit existing data.
    steps:
    - Another similar direction is compatible with both paths.
    - A sufficiently precise distance can distinguish their different range predictions.
    answer: The distance measurement is more discriminating in this stated comparison.
    common_mistake: More measurements are not automatically more useful than a new independent kind of measurement.
  - id: planetary_m04_we02
    title: Lengthen the observing arc
    problem: The first observation is at hour 2 and the last at hour 10. An added observation is at hour 14. Compare elapsed observing spans.
    rule: Arc duration=last observation time-first observation time.
    steps:
    - 'Set up the relationship: Arc duration=last observation time-first observation time.'
    - old span=10-2=8 h; new span=14-2=12 h.
    answer: The time span increases by 4 hours, or 50%.
    common_mistake: Adding an observation between hours 2 and 10 would not lengthen the span.
  - id: planetary_m04_we03
    title: Why a short arc is ambiguous
    problem: Two moving objects have the same sky direction and angular speed but different unknown distances. Do these observations uniquely determine their physical paths?
    rule: Sky angles alone do not specify full three-dimensional position and velocity.
    steps:
    - The same angular speed can correspond to different transverse speeds at different distances.
    - Different line-of-sight velocities can also remain consistent with a short angular record.
    answer: Several physical paths can fit the same short sky arc.
    common_mistake: A precise angle is not a direct measurement of distance.
  - id: planetary_m04_we04
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
  - id: planetary_m04_we05
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

**World state:** Malik Rowan, orbit-determination lead, points to a daylight gap on the fit-board: “More points tonight or one point later - those are not the same.”

**Panel/HUD text:** THE LAST DARK WINDOW / MISSION ACTIVE

**Dialogue bubbles -** Malik Rowan: “The mission is live. Start with the first evidence, and do not add a claim the board has not earned.”

**Unlocks:** Stop 13.

**Beat 2 - After Stop 13 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Low-value repeated exposures dim; later-baseline optical, radar, and thermal options remain bright.

**Panel/HUD text:** THE LAST DARK WINDOW / FIRST RESULT LOGGED

**Dialogue bubbles -** Malik Rowan: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 14.

**Beat 3 - After Stop 14 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The chosen schedule appears on the scopeboard with protected handoff blocks.

**Panel/HUD text:** THE LAST DARK WINDOW / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 15.

**Beat 4 - After Stop 15 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The error budget predicts orbit-width reduction from 17,000 km to 4,600 km.

**Panel/HUD text:** THE LAST DARK WINDOW / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 16.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Mira authorizes the plan; the aircraft changes from HELD to SIGNED OUT FOR PHASE 5.

**Panel/HUD text:** THE LAST DARK WINDOW / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 4 outcome, metric screen, concept review, and Mission 5 briefing.

## Location plan

**One location:** ORBIT only. The mission is an allocation decision using forecasted measurement value; the distant instruments do not operate until the plan is approved.

## Characters and dramatic beat

Malik favors a later optical baseline. Lena argues for dense immediate coverage before clouds arrive. Sanaa needs thermal time to stop size guesses. Tomás requests radar. The player funds a mixed plan and preserves a reserve instead of choosing one specialist's complete wish list.

## Key concepts, explained here

Cadence is the pattern of observations over time. Closely spaced data can measure short-term motion, while a longer arc reveals curvature. Solar elongation limits when the object can be seen. Information gain asks which measurement changes uncertainty relevant to a decision. A balanced plan separates orbit, size, and instrument failure.

## Stop 13 - Buy evidence, not volume

**Format/placement:** VALUE, asked by Malik Rowan beside `fit-board`.

**Metadata:** Concept: 18 - information gain; Keystone: telescope limits; Area: Orbit Determination Center; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Malik Rowan, at the orbit-fit board in the Orbit Determination Center.

**Stop reason - exact player copy:** The remaining observing window must target the uncertainties that still change the warning decision.

**Question card story setup - exact player copy:** Spend the fixed budget on measurements that can change the warning decision.

**Question card story-science connection - exact player copy:** The selected measurements determine whether the budget buys complementary range, time-baseline, and size information.

**Question card prompt - exact player copy:** Submit one observing plan costing at most 100 credits, its total cost, and the remaining reserve.

**Expected submission - exact player copy:** one selected plan with its decision-relevant result

**Complete format-specific interaction block:**

```yaml
value:
  budget: {value: 100, unit: "credits"}
  options:
    - {id: late_optical, label: "Late optical arc", cost: 30, information: "extends the time baseline and tests timestamp bias"}
    - {id: radar_range, label: "Radar range", cost: 35, information: "constrains physical distance"}
    - {id: thermal_size, label: "Thermal measurement", cost: 25, information: "constrains size and albedo"}
    - {id: same_night_stack, label: "More same-night optical frames", cost: 30, information: "refines an already precise sky direction"}
    - {id: publicity_image, label: "Publicity image", cost: 10, information: "adds no orbit constraint"}
  required_selection: [late_optical, radar_range, thermal_size]
  total_cost: 90
  reserve: 10
  pass_rule: "Select the three complementary measurements, spend no more than 100 credits, and report the remaining reserve."
```

**Correct result:** Late optical + radar + thermal = 90 credits.

**Answer text:** The mixed plan attacks time baseline, range, and size while preserving a small reserve.

**Why:** Independent measurement axes reduce different uncertainties; repeated same-night frames mostly refine an already precise direction.

**Wrong-path feedback:** Ask which current uncertainty each option reduces and whether another option measures the same thing.

**State/output:** Selected blocks move onto the schedule rail; Stop 14 unlocks.

## Stop 14 - Build the night

**Format/placement:** SEQUENCE, at `scope-schedule`.

**Metadata:** Concept: 20 - cadence; Keystone: telescope limits; Area: Orbit Determination Center; Learning role: PRACTICE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the observing schedule board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The funded observations will be useful only if their visibility windows and data handoffs fit together.

**Question card story setup - exact player copy:** With the three evidence blocks funded, their order must respect sky visibility, radar geometry, aircraft travel, and instrument handoff. Build a schedule that preserves the late optical baseline and transfers each result before the next fit.

**Question card story-science connection - exact player copy:** The schedule determines whether each observation reaches the orbit team before the next fit requires it.

**Question card prompt - exact player copy:** Order the funded work so visibility and evidence handoffs are physically possible.

**Expected submission - exact player copy:** one ordered plan

**Correct result:** Validate/early optical → radar → thermal → dawn optical → refit.

**Answer text:** The plan protects the long time baseline and delivers each measurement before the final fit.

**Why:** Observing cadence is constrained by sky position, geometry, travel, and processing time.

**Wrong-path feedback:** Keep the dawn recovery last among observations; it supplies the longest baseline.

**State/output:** Schedule rail locks; Stop 15 unlocks.

## Stop 15 - Propagate the error budget

**Format/placement:** PROPAGATE, at `fit-board`.

**Metadata:** Concept: 11 - error budget; Keystone: uncertainty/covariance; Area: Orbit Determination Center; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The observing schedule needs a forecast of uncertainty reduction before scarce time is committed.

**Question card story setup - exact player copy:** Because the observing order is fixed, the orbit team can forecast how each block changes the encounter uncertainty. Buy the measurement update that most reduces the b-plane width while preserving size information.

**Question card story-science connection - exact player copy:** The encounter-width comparison determines which measurement combination most improves the predicted impact region.

**Question card prompt - exact player copy:** Submit one observing-update plan costing no more than 65 credits and its resulting b-plane width in kilometers.

**Expected submission - exact player copy:** one selected update plan and its numerical propagated result

**§7 authored-board source - PROPAGATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 15 - Propagate the error budget"
  format: "PROPAGATE"
  source: "Handback 5 canonical interaction block"
  question: "Submit one observing-update plan costing no more than 65 credits and its resulting b-plane width in kilometers."
  payload: "~~~yaml propagate: current_error_budget: angular_arc_km: 6200 range_km: 13800 timing_km: 4100 model_km: 2900 candidate_updates: - {id: more_same_night, cost: 20, new_total_width_km: 13200} - {id: radar_range, cost: 35, new_total_width_km: 7600} - {id: dawn_arc, cost: 30, new_total_width_km: 8900} - {id: radar_plus_dawn, cost: 65, new_total_width_km: 4600} budget: 65 correct_update: radar_plus_dawn answerText: Radar plus the dawn recovery reduces the forecast encounter width to 4,600 km. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROPAGATE:**

**Handback 5 canonical interaction block - PROPAGATE:**

```yaml
propagate:
  costUnit: "observing credits"
  budget: 65
  inputs:
    - {id: angular_arc, label: "Angular-arc uncertainty", value: 6200, sigmaFrac: 1.0, exponent: 2, unit: "km", improvableTo: 4300, cost: 20}
    - {id: range, label: "Range uncertainty", value: 13800, sigmaFrac: 1.0, exponent: 1, unit: "km", improvableTo: 7600, cost: 50}
    - {id: timing, label: "Timing uncertainty", value: 4100, sigmaFrac: 1.0, exponent: 1, unit: "km", improvableTo: 3000, cost: 45}
    - {id: model, label: "Model uncertainty", value: 2900, sigmaFrac: 1.0, exponent: 1, unit: "km", improvableTo: 2500, cost: 25}
    - {id: radar_plus_dawn, label: "Radar plus dawn recovery", value: 16000, sigmaFrac: 1.0, exponent: 1, unit: "km", improvableTo: 4600, cost: 65}
  dominant: range
  improvable: [angular_arc, range, timing, model, radar_plus_dawn]
  correctUpgrade: radar_plus_dawn
  correctResult: "Radar plus dawn; 4,600 km forecast width."
```

**Handback 7 canonical interaction block - PROPAGATE:**

```yaml
propagate:
  costUnit: "observing credits"
  budget: 65
  output: {label: "b-plane corridor width", value: 16000, unit: "km"}
  inputs:
    - {id: angular_arc, label: "Angular-arc uncertainty", value: 6200, sigmaFrac: 0.388, exponent: 2, unit: "km", improvableTo: 0.269, cost: 20}
    - {id: range, label: "Range uncertainty", value: 13800, sigmaFrac: 0.863, exponent: 1, unit: "km", improvableTo: 0.288, cost: 50}
    - {id: timing, label: "Timing uncertainty", value: 4100, sigmaFrac: 0.256, exponent: 1, unit: "km", improvableTo: 0.188, cost: 45}
    - {id: model, label: "Model uncertainty", value: 2900, sigmaFrac: 0.181, exponent: 1, unit: "km", improvableTo: 0.156, cost: 25}
  dominant: range
  improvable: [angular_arc, range, timing, model]
  correctUpgrade: range
  correctResult: "Range is the widest contribution; the radar plus dawn recovery narrows it and the corridor closes to about 4,600 km."
```


**Correct result:** Radar plus dawn; 4,600 km forecast width.

**Answer text:** Geometry and time baseline together outperform more same-night precision.

**Why:** Correlated range and along-track uncertainty require complementary measurements.

**Wrong-path feedback:** A single smaller component does not guarantee the smallest propagated encounter width.

**State/output:** A 4,600 km success band appears on the board; Stop 16 unlocks.

## Stop 16 - Commit the shared plan

**Format/placement:** SCIENCETANK, asked by Mira Chen beside `orbit-delivery-desk`.

**Metadata:** Concept: 20 - observing allocation; Keystone: thresholds/verification; Area: Coordination Office; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Mira Chen, at the orbit delivery desk in the Orbit Determination Center.

**Stop reason - exact player copy:** The expected improvement depends on funding data transfer and analysis as well as instruments.

**Question card story setup - exact player copy:** With the expected error reduction known, allocate 100 coordination points across the proposals that make the mixed plan executable. Fund the chain, not the loudest department, and keep the final fit from losing its inputs.

**Question card story-science connection - exact player copy:** The coordination allocation determines whether optical, radar, thermal, and combined-fit work can all be completed.

**Question card prompt - exact player copy:** Submit one five-category allocation totaling exactly 100 points.

**Expected submission - exact player copy:** one allocation totaling the stated budget

**Complete format-specific interaction block:**

```yaml
scienceTank:
  pool: {value: 100, unit: "coordination points"}
  categories:
    - {id: optical, label: "Late optical observing", min: 0, max: 100, step: 5}
    - {id: radar, label: "Radar observing and reduction", min: 0, max: 100, step: 5}
    - {id: thermal, label: "Thermal observing and reduction", min: 0, max: 100, step: 5}
    - {id: integration, label: "Data transfer and combined orbit fit", min: 0, max: 100, step: 5}
    - {id: publicity, label: "Publicity imaging", min: 0, max: 100, step: 5}
  correct: {optical: 25, radar: 25, thermal: 20, integration: 30, publicity: 0}
  pass_rule: "The five allocations total exactly 100; optical, radar, thermal, and integration meet the keyed handoff plan; publicity receives no evidence budget."
```

**Correct result:** 25 / 25 / 20 / 30 / 0.

**Answer text:** The range funds optical, radar, thermal, and the final integration that gives those measurements meaning.

**Why:** Evidence has value only when acquisition, transfer, and combined inference all survive the resource plan.

**Wrong-path feedback:** A funded instrument without its handoff produces data that cannot change tonight's orbit decision.

**State/output:** Aircraft and three remote destinations unlock for later missions.

## Mission outcome

Mission decision: Use the last dark window for dawn images, radar, and heat data. These tests may cut the path width to about 4,600 km. The range will guard the handoff. The summit system must pass its checks first.

**Pre-card character beat:** Mira Chen signs the aircraft release. Malik says, “We are buying a longer lever, not a taller stack of images.”

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You handled that beautifully. You gave the team its answer: Use the last dark window for dawn images, radar, and heat data. The people beneath the risk corridor are safer because the evidence is sharper.

**Header:** MISSION 4 COMPLETE

**Timer:** TIME {elapsed} / TARGET 11:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The mixed observing plan is authorized and the aircraft/staff reserve is committed.

**Automatic bar change:** IMPACT SOLUTION +4 | RESPONSE READINESS +5 | OBSERVING RESERVE -5

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Reserve +7, Trust +3; bars 67 / 67 / 65 / 65; bank 0.

**Failure check:** Observing Reserve at 0% cancels the schedule and restores the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Last Dark Window. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Last Dark Window, the current orbit cloud is limited mainly by range, time baseline, and one possible timestamp bias, not by raw image count. Choose the next measurement now based on whether its result could change the decision. Which conclusion correctly applies Solar elongation to the observations and physics?

**Options - exact player copy:**

- A. The time span covered by measurements used in an orbit fit.
- B. The angle between an object and the Sun in the sky.
- C. The expected reduction in uncertainty that matters to a decision.
- D. Observing cadence is constrained by sky position, geometry, travel, and processing time.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Solar elongation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Observing arc, not Solar elongation. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. the angle between an object and the Sun in the sky.
- C: This describes Information gain, not Solar elongation. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes cadence, not Solar elongation. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Last Dark Window: with the expected error reduction known, allocate 100 coordination points across the proposals that make the mixed plan executable. Spend the evidence budget now on tests that can distinguish the explanations still in play. Which conclusion correctly applies Observing arc to the observations and physics?

**Options - exact player copy:**

- A. The angle between an object and the Sun in the sky.
- B. The expected reduction in uncertainty that matters to a decision.
- C. The time span covered by measurements used in an orbit fit.
- D. Observing cadence is constrained by sky position, geometry, travel, and processing time.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Observing arc; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Solar elongation, not Observing arc. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Information gain, not Observing arc. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. the time span covered by measurements used in an orbit fit.
- D: This describes cadence, not Observing arc. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Last Dark Window using new evidence: the current orbit cloud is limited mainly by range, time baseline, and one possible timestamp bias, not by raw image count. Choose the next measurement now based on whether its result could change the decision. Which conclusion correctly applies Information gain to the observations and physics?

**Options - exact player copy:**

- A. The angle between an object and the Sun in the sky.
- B. The time span covered by measurements used in an orbit fit.
- C. Observing cadence is constrained by sky position, geometry, travel, and processing time.
- D. The expected reduction in uncertainty that matters to a decision.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Information gain; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Solar elongation, not Information gain. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Observing arc, not Information gain. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes cadence, not Information gain. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. the expected reduction in uncertainty that matters to a decision.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Last Dark Window: with the three evidence blocks funded, their order must respect sky visibility, radar geometry, aircraft travel, and instrument handoff. Which conclusion correctly applies cadence to the observations and physics?

**Options - exact player copy:**

- A. Observing cadence is constrained by sky position, geometry, travel, and processing time.
- B. The angle between an object and the Sun in the sky.
- C. The time span covered by measurements used in an orbit fit.
- D. The expected reduction in uncertainty that matters to a decision.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for cadence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. observing cadence is constrained by sky position, geometry, travel, and processing time.
- B: This describes Solar elongation, not cadence. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Observing arc, not cadence. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Information gain, not cadence. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Last Dark Window decision, the team knows this: because the observing order is fixed, the orbit team can forecast how each block changes the encounter uncertainty. Carry each uncertainty into the final result now so the team can choose the measurement that would reduce the decision risk. Which statistical conclusion or procedure correctly uses error budget?

**Options - exact player copy:**

- A. The angle between an object and the Sun in the sky.
- B. Correlated range and along-track uncertainty require complementary measurements.
- C. The time span covered by measurements used in an orbit fit.
- D. The expected reduction in uncertainty that matters to a decision.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for error budget; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Solar elongation, not error budget. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. correlated range and along-track uncertainty require complementary measurements.
- C: This describes Observing arc, not error budget. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Information gain, not error budget. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Last Dark Window to this follow-up: with the expected error reduction known, allocate 100 coordination points across the proposals that make the mixed plan executable. Spend the evidence budget now on tests that can distinguish the explanations still in play. Which conclusion correctly applies observing allocation to the observations and physics?

**Options - exact player copy:**

- A. The angle between an object and the Sun in the sky.
- B. The time span covered by measurements used in an orbit fit.
- C. Evidence has value only when acquisition, transfer, and combined inference all survive the resource plan.
- D. The expected reduction in uncertainty that matters to a decision.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for observing allocation; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Solar elongation, not observing allocation. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Observing arc, not observing allocation. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. evidence has value only when acquisition, transfer, and combined inference all survive the resource plan.
- D: This describes Information gain, not observing allocation. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** A satellite trail and missed faint objects could have affected the discovery pictures. Test the telescope software using artificial objects whose positions are known. Decide whether the new measurements are reliable enough to guide the asteroid's predicted path and the public warning.

**Objective:** Validate the survey pipeline and certify the new optical positions.

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
  - id: planetary_m05_we01
    title: Measure detection completeness
    problem: Software is given 100 artificial sources of a specified brightness and recovers 80. Find completeness for that test bin.
    rule: Completeness=recovered injected sources/total injected sources.
    steps:
    - 'Set up the relationship: Completeness=recovered injected sources/total injected sources.'
    - completeness=80/100=0.80=80%.
    answer: The test-bin completeness is 80%.
    common_mistake: This result need not apply to fainter sources or different image conditions.
  - id: planetary_m05_we02
    title: False detections among candidates
    problem: A candidate list contains 20 objects, of which 5 are verified artifacts. Find the artifact fraction of this list.
    rule: Artifact fraction=false candidates/all candidates.
    steps:
    - 'Set up the relationship: Artifact fraction=false candidates/all candidates.'
    - fraction=5/20=0.25=25%.
    answer: One quarter of this candidate list is artifact.
    common_mistake: This is not the same denominator as detection completeness.
  - id: planetary_m05_we03
    title: Brightness ratios and magnitude
    problem: Source A is 100 times as bright as B. Find m_A-m_B.
    rule: m_A-m_B=-2.5 log10(F_A/F_B), with fluxes in the same band.
    steps:
    - 'Set up the relationship: m_A-m_B=-2.5 log10(F_A/F_B), with fluxes in the same band.'
    - m_A-m_B=-2.5 log10(100)=-2.5(2)=-5.
    answer: A is 5 magnitudes brighter, meaning its magnitude number is smaller.
    common_mistake: Brighter sources have smaller astronomical magnitudes.
  - id: planetary_m05_we04
    title: Separate detector and sky motion
    problem: Across images with a shifted camera pointing, a bright spot stays at the same detector pixel while the stars move. What does that suggest?
    rule: A detector defect stays tied to detector coordinates; a sky source follows the sky-to-detector mapping.
    steps:
    - Changing pointing moves real sky positions across pixels.
    - The stationary detector spot does not follow that mapping.
    answer: The pattern supports a detector artifact as a candidate explanation.
    common_mistake: This diagnostic needs the stated pointing change; one image alone is insufficient.
  - id: planetary_m05_we05
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

**Why this campaign needs it:** exposure settings must reach the fictional 2026 Planetary Defense Conference object (2026 PDC) without saturating the reference stars.

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

**World state:** The recovery map shows one localized gap. Waypoint: FLY TO CERRO ALTO - TEST THE CAMERA WHERE THE GAP OCCURS.

**Panel/HUD text:** THE SUMMIT TEST / FIRST RESULT LOGGED

**Dialogue bubbles -** Lena Ortiz: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Survey Telescope waypoint and Stop 18.

**Beat 3 - After Stop 18 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Dome shutter opens; the pipeline-bench displays the same image region.

**Panel/HUD text:** THE SUMMIT TEST / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Lena Ortiz: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 19.

**Beat 4 - After Stop 19 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Exposure setting locks; the bad-column mask shifts off and back on without moving the candidate.

**Panel/HUD text:** THE SUMMIT TEST / DECISION EVIDENCE READY

**Dialogue bubbles -** Lena Ortiz: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 20.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** A new point appears 0.31 arcsec from the independent prediction; the astrometry packet receives CERTIFIED WITH LOCAL SYSTEMATIC.

**Panel/HUD text:** THE SUMMIT TEST / MISSION DECISION LOGGED

**Dialogue bubbles -** Lena Ortiz: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 5 outcome, metric screen, concept review, and Mission 6 briefing.

## Location plan

**Two locations:** OPS Stop 1, then DISC Stops 2-4. The injection map identifies a detector-region problem that can only be tested by operating the physical summit camera.

## Characters and dramatic beat

Lena initially treats the localized completeness loss as harmless because it does not create sources. Malik joins by radio and insists it still affects formal uncertainty. The player certifies the positions while carrying the localized systematic into the orbit fit.

## Key concepts, explained here

Completeness measures recovery of real sources, not purity of detections. Limiting magnitude depends on exposure, sky, and instrument noise. An injection test maps pipeline performance with known inputs. A control changes one factor and reverses it. Verification requires a prediction written before the measurement appears.

## Stop 17 - Put known objects through the pipeline

**Format/placement:** INJECT, at `pipeline-link`.

**Metadata:** Concept: 29 - completeness; Keystone: telescope limits; Area: Survey Telescope; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the summit pipeline link, in the Coordination Office.

**Stop reason - exact player copy:** The funded optical recovery relies on a pipeline that may miss faint sources near the discovery trail.

**Question card story setup - exact player copy:** The funded recovery depends on a pipeline that lost sources near one bright satellite trail in the discovery night. Inject known moving points across magnitude and detector position, then count where the system fails.

**Question card story-science connection - exact player copy:** Recovery by brightness and detector region identifies where new optical positions need additional caution.

**Question card prompt - exact player copy:** Calculate and commit the 40-of-50 minimum plus the four-bin injection plan before the pipeline unlocks; then operate it, measure all four recovery fractions in percent, and submit the localized failure-bin conclusion.

**Expected submission - exact player copy:** one committed numerical minimum and four-bin test plan, four measured recovery fractions in percent, and one failure-bin conclusion

**§7 authored-board source - INJECT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 17 - Put known objects through the pipeline"
  format: "INJECT"
  source: "Handback 5 canonical interaction block"
  question: "Calculate and commit the 40-of-50 minimum plus the four-bin injection plan before the pipeline unlocks; then operate it, measure all four recovery fractions in percent, and submit the localized failure-bin conclusion."
  payload: "~~~yaml inject: prediction_commit_required: true equipment_unlocks_after_commit: true prediction: {minimum_acceptable_recovery_percent: 80, minimum_recovered_per_50_source_bin: 40} population: count: 200 magnitude_range: [20.0, 23.5] motion_range_arcsec_per_hour: [60, 130] bins: clean_bright: {injected: 50, recovered: 49} clean_faint: {injected: 50, recovered: 43} trail_bright: {injected: 50, recovered: 45} trail_faint: {injected: 50, recovered: 27} correct_conclusion: localized_completeness_loss_near_trail answerText: Recovery falls to 54% for faint moving sources near the trail but remains high elsewhere. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - INJECT:**

**Handback 5 canonical interaction block - INJECT:**

```yaml
inject:
  population: {label: "injected synthetic objects", n: 200}
  metric: {id: weakest_bin_recovery, label: "lowest recovery percentage across source bins"}
  configurations:
    - {id: current, label: "Current pipeline", detections: 164, metric: 54}
    - {id: broad, label: "Broad high-count recovery", detections: 180, metric: 70}
    - {id: trail_repair, label: "Trail-targeted recovery", detections: 172, metric: 86}
  best: trail_repair
  blindSpot: "objects outside every sampled path are never recovered"
  correctResult: "Trail/faint bin: 27/50 = 54%; localized loss."
```

**Correct result:** Trail/faint bin: 27/50 = 54%; localized loss.

**Answer text:** The pipeline does not invent the candidate, but it under-recovers faint sources near the trail.

**Why:** Known inputs reveal selection effects that cannot be measured from detected sources alone.

**Wrong-path feedback:** Compare recovered with injected in each bin; raw detection counts do not give completeness.

**State/output:** Detector-region map highlights the gap; DISC waypoint unlocks.

## Stop 18 - Find the usable exposure

**Format/placement:** SWEEP, at `dome-console`.

**Metadata:** Concept: 2 - exposure and magnitude; Keystone: light/telescopes; Area: Survey Telescope; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** The localized recovery failure makes exposure selection a balance between asteroid detection and usable reference stars.

**Question card story setup - exact player copy:** With the weak detector region located, sweep exposure time from 10 to 90 seconds and watch asteroid signal and star saturation together. Choose the shortest setting that reaches the signal goal without crossing the saturation limit.

**Question card story-science connection - exact player copy:** The signal and saturation readings determine the shortest exposure that preserves both asteroid visibility and the astrometric reference grid.

**Question card prompt - exact player copy:** Operate the sweep, then submit one exposure setting in seconds: the shortest value with asteroid S/N ≥ 5 and no more than one saturated reference star.

**Expected submission - exact player copy:** one exposure setting in seconds and one signal-versus-saturation interpretation

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: exposure, label: "Exposure time", values: [10, 30, 45, 60, 75, 90], unit: "s"}
  readings:
    - {at: 10, signal_to_noise: 2.1, saturated_reference_stars: 0}
    - {at: 30, signal_to_noise: 3.9, saturated_reference_stars: 0}
    - {at: 45, signal_to_noise: 5.2, saturated_reference_stars: 1}
    - {at: 60, signal_to_noise: 6.1, saturated_reference_stars: 3}
    - {at: 75, signal_to_noise: 6.8, saturated_reference_stars: 5}
    - {at: 90, signal_to_noise: 7.2, saturated_reference_stars: 8}
  constraints: {minimum_signal_to_noise: 5, maximum_saturated_reference_stars: 1}
  objective: "Choose the shortest exposure that satisfies both constraints."
  correct: 45
```

**Correct result:** 45 s.

**Answer text:** A 45-second exposure gives usable asteroid signal without destroying the reference grid.

**Why:** Longer exposure improves signal but eventually saturates bright stars needed for astrometry.

**Wrong-path feedback:** The highest signal is not automatically best; read both the minimum signal and maximum saturation goals.

**State/output:** Exposure control locks at 45 s; Stop 19 unlocks.

## Stop 19 - Move the mask, not the object

**Format/placement:** CONTROL, at `pipeline-bench`.

**Metadata:** Concept: 6 - causal artifact test; Keystone: measurement/inference; Area: Survey Telescope; Learning role: COMBINE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the pipeline bench, in the Survey Telescope.

**Stop reason - exact player copy:** The usable exposure leaves the detector mask as a possible source of position bias.

**Question card story setup - exact player copy:** Because 45 seconds gives a usable image, test whether the local bad-column mask moves the candidate centroid. Change only the mask, reverse it, and compare the position with the expected noise band.

**Question card story-science connection - exact player copy:** The reversible centroid shift determines whether moving the mask meaningfully changes the asteroid's measured position.

**Question card prompt - exact player copy:** Submit the mask-shift setting (+3 px), the changed and restored centroid measurements in pixels, and one conclusion about whether the centroid follows the mask.

**Expected submission - exact player copy:** one control setting, the before-and-after measurements, and one causal conclusion

**§7 authored-board source - CONTROL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 19 - Move the mask, not the object"
  format: "CONTROL"
  source: "Handback 5 canonical interaction block"
  question: "Submit the mask-shift setting (+3 px), the changed and restored centroid measurements in pixels, and one conclusion about whether the centroid follows the mask."
  payload: "~~~yaml control: changed: {bad_column_mask_shift_px: [0, 3]} held_fixed: [raw 45 s image, star catalog, world-coordinate solution, centroid algorithm] measurement_timing: [before change, after +3 px change, after restoration] variables: - {id: mask_shift_px, label: Bad-column mask shift, baseline: 0, test: 3, unit: px} - {id: raw_image, label: Raw image, baseline: 45, test: 45, unit: s exposure} - {id: star_catalog, label: Star catalog, baseline: fixed, test: fixed} - {id: coordinate_solution, label: World-coordinate solution, baseline: fixed, test: fixed} - {id: centroid_algorithm, label: Centroid algorithm, baseline: fixed, test: fixed} baseline: {centroid_x_px: 2048.62, noise_band_px: 0.08} candidates: - {id: mask, label: Shift bad-column mask by 3 px, response_px: 0.03} - {id: alignment, label: Shift world-coordinate solution, response_px: 0.41} - {id: exposure, label: Double exposure time, response_px: 0.12} reversal: required: true control_id: mask return_centroid_x_px: 2048.61 response: {label: centroid x, baseline_px: 2048.62, after_change_px: 2048.65, after_restore_px: 2048.61, noise_band_px: 0.08} required_sequence: [measure_baseline, change_mask_only, measure, restore_mask, measure_again] correct_control: mask correct: mask_shift_px answerText: Moving and restoring the mask changes the centroid by less than the 0.08 px noise band. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CONTROL:**

**Handback 5 canonical interaction block - CONTROL:**

```yaml
control:
  candidates:
    - {id: mask, label: "Bad-column mask shift", baseline: 0, treatment: 3, unit: "px"}
    - {id: alignment, label: "World-coordinate solution shift", baseline: 0, treatment: 1, unit: "solution change"}
    - {id: exposure, label: "Exposure time", baseline: 45, treatment: 90, unit: "s"}
  truth: mask
  responseLabel: "centroid stability evidence"
  baseline: {setting: 0, response: 0, reading: 2048.62, noise: 0.005}
  treatment: {setting: 3, response: 0.03, reading: 2048.65, change: 0.03}
  fixed: ["raw 45 s image", "star catalog", "world-coordinate solution", "centroid algorithm"]
  measureWhen: "before change, after +3 px shift, and after restoration"
  restore: {required: true, setting: 0, response: 0.01, reading: 2048.61, remeasure: true}
  correctConclusion: "Mask shift; response 0.03 px, below noise; returns to 2048.61 px."
```

**Correct result:** Mask shift; response 0.03 px, below noise; returns to 2048.61 px.

**Answer text:** The candidate position does not follow the detector mask.

**Why:** Causation requires changing the proposed cause while holding other factors fixed, then confirming by reversal.

**Wrong-path feedback:** Changing alignment directly moves every sky coordinate and cannot isolate the mask.

**State/output:** MASK ARTIFACT rejected; Stop 20 unlocks.

## Stop 20 - Predict, observe, verify

**Format/placement:** VERIFY, at `dome-console`.

**Metadata:** Concept: 18 - independent prediction; Keystone: astrometry/verification; Area: Survey Telescope; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** The exposure and mask checks allow the latest image to test an independent orbit prediction.

**Question card story setup - exact player copy:** With exposure and mask effects controlled, freeze Malik's independent predicted position before opening the latest frame. Measure the new centroid and decide whether its separation falls inside the 0.50-arcsecond acceptance radius.

**Question card story-science connection - exact player copy:** The centroid's separation from the committed position determines whether the new optical observation verifies the predicted track.

**Question card prompt - exact player copy:** First commit the predicted right-ascension (RA) and declination (Dec) offsets and the 0.50-arcsecond acceptance rule; this unlocks the frame. Then reveal and measure the centroid, calculate its separation, and submit VERIFIED or REJECTED.

**Expected submission - exact player copy:** one committed right-ascension and declination prediction pair in arcseconds, one measured pair and separation in arcseconds, and one verification conclusion






**Complete format-specific interaction block:**

```yaml
verify:
  prediction:
    ra_offset_arcsec: 0.40
    dec_offset_arcsec: -0.20
    acceptance_radius_arcsec: 0.50
  locked_before_reveal: true
  operation: "Reveal the new frame and measure its centroid."
  measurement:
    ra_offset_arcsec: 0.65
    dec_offset_arcsec: -0.38
  calculation: "separation=sqrt[(0.65-0.40)^2+(-0.38+0.20)^2]=0.31 arcsec"
  correct_conclusion: VERIFIED
  answerText: "The measured position is 0.31 arcsec from the committed prediction, inside the 0.50-arcsec acceptance radius."
```

**Correct result:** Verified; separation 0.31 arcsec.

**Answer text:** The new optical position passes the independent prediction test.

**Why:** A held prediction prevents post-measurement tuning from masquerading as verification.

**Wrong-path feedback:** Compare the two-dimensional separation with the printed goal, not either coordinate alone.

**State/output:** Astrometry packet transfers to ORBIT with a local systematic term; CHAR destination unlocks.

## Mission outcome

Mission decision: Add the new sky points to the impact model. Keep the local error term. Three tests support the result. The same frames show odd light, so the dome must test the body's size.

**Pre-card character beat:** Lena Ortiz, survey and discovery lead, stamps the packet and adds, “Keep the trail penalty. Clean enough is not the same as perfect.”

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Superb work. The record now supports this decision: Add the new sky points to the impact model. The planetary-defense plan now rests on a result the whole network can trust.

**Header:** MISSION 5 COMPLETE

**Timer:** TIME {elapsed} / TARGET 12:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Certified optical positions arrive; aircraft and summit time are spent.

**Automatic bar change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -6 | PUBLIC TRUST +2

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Response +1, Reserve +9; bars 75 / 68 / 68 / 67; bank 0.

**Failure check:** Observing Reserve at 0% loses the dawn recovery and restores the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Summit Test. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Summit Test, the funded recovery depends on a pipeline that lost sources near one bright satellite trail in the discovery night. Run the known signal through the pipeline now so the team knows what the real search can recover. Which conclusion correctly applies Completeness to the observations and physics?

**Options - exact player copy:**

- A. The faintest brightness a survey can detect reliably.
- B. The fraction of real objects a survey detects under stated conditions.
- C. Adding known synthetic sources to data and measuring how many the pipeline recovers.
- D. Longer exposure improves signal but eventually saturates bright stars needed for astrometry.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Completeness; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Limiting magnitude, not Completeness. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. the fraction of real objects a survey detects under stated conditions.
- C: This describes Injection test, not Completeness. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes exposure and magnitude, not Completeness. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Summit Test: with the weak detector region located, sweep exposure time from 10 to 90 seconds and watch asteroid signal and star saturation together. Which conclusion correctly applies Limiting magnitude to the observations and physics?

**Options - exact player copy:**

- A. The fraction of real objects a survey detects under stated conditions.
- B. Adding known synthetic sources to data and measuring how many the pipeline recovers.
- C. The faintest brightness a survey can detect reliably.
- D. Longer exposure improves signal but eventually saturates bright stars needed for astrometry.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Limiting magnitude; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Completeness, not Limiting magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Injection test, not Limiting magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. the faintest brightness a survey can detect reliably.
- D: This describes exposure and magnitude, not Limiting magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Summit Test using new evidence: because 45 seconds gives a usable image, test whether the local bad-column mask moves the candidate centroid. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which statistical conclusion or procedure correctly uses Injection test?

**Options - exact player copy:**

- A. The fraction of real objects a survey detects under stated conditions.
- B. The faintest brightness a survey can detect reliably.
- C. Longer exposure improves signal but eventually saturates bright stars needed for astrometry.
- D. Adding known synthetic sources to data and measuring how many the pipeline recovers.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Injection test; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Completeness, not Injection test. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Limiting magnitude, not Injection test. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes exposure and magnitude, not Injection test. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. adding known synthetic sources to data and measuring how many the pipeline recovers.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Summit Test: with the weak detector region located, sweep exposure time from 10 to 90 seconds and watch asteroid signal and star saturation together. Which conclusion correctly applies exposure and magnitude to the observations and physics?

**Options - exact player copy:**

- A. Longer exposure improves signal but eventually saturates bright stars needed for astrometry.
- B. The fraction of real objects a survey detects under stated conditions.
- C. The faintest brightness a survey can detect reliably.
- D. Adding known synthetic sources to data and measuring how many the pipeline recovers.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for exposure and magnitude; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. longer exposure improves signal but eventually saturates bright stars needed for astrometry.
- B: This describes Completeness, not exposure and magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Limiting magnitude, not exposure and magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Injection test, not exposure and magnitude. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Summit Test decision, the team knows this: because 45 seconds gives a usable image, test whether the local bad-column mask moves the candidate centroid. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which statistical conclusion or procedure correctly uses causal artifact test?

**Options - exact player copy:**

- A. The fraction of real objects a survey detects under stated conditions.
- B. Causation requires changing the proposed cause while holding other factors fixed, then confirming by reversal.
- C. The faintest brightness a survey can detect reliably.
- D. Adding known synthetic sources to data and measuring how many the pipeline recovers.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for causal artifact test; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Completeness, not causal artifact test. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. causation requires changing the proposed cause while holding other factors fixed, then confirming by reversal.
- C: This describes Limiting magnitude, not causal artifact test. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Injection test, not causal artifact test. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Summit Test to this follow-up: with exposure and mask effects controlled, freeze Malik's independent predicted position before opening the latest frame. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which conclusion correctly applies independent prediction to the observations and physics?

**Options - exact player copy:**

- A. The fraction of real objects a survey detects under stated conditions.
- B. The faintest brightness a survey can detect reliably.
- C. A held prediction prevents post-measurement tuning from masquerading as verification.
- D. Adding known synthetic sources to data and measuring how many the pipeline recovers.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for independent prediction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Completeness, not independent prediction. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Limiting magnitude, not independent prediction. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a held prediction prevents post-measurement tuning from masquerading as verification.
- D: This describes Injection test, not independent prediction. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** A bright asteroid could be small and reflective or large and dark, with very different consequences if it hits. Compare reflected sunlight with the heat the asteroid gives off. Decide what size range the emergency team must prepare for.

**Objective:** Break the brightness-size degeneracy and adopt a defensible diameter range.

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
  - id: planetary_m06_we01
    title: Size-reflectivity ambiguity
    problem: At equal distances and geometry, reflected brightness is proportional to pD², where p is reflectivity and D diameter. If p falls by a factor of four, what D preserves brightness?
    rule: For fixed brightness, D is proportional to 1/sqrt(p).
    steps:
    - 'Set up the relationship: For fixed brightness, D is proportional to 1/sqrt(p).'
    - D_new/D_old=sqrt(p_old/p_new)=sqrt(4)=2.
    answer: The diameter must double under this simplified reflected-light model.
    common_mistake: Equal brightness does not imply equal diameter.
  - id: planetary_m06_we02
    title: Diameter and cross section
    problem: One sphere has twice another's diameter. Compare projected areas.
    rule: Projected area A=πD²/4.
    steps:
    - 'Set up the relationship: Projected area A=πD²/4.'
    - A2/A1=(D2/D1)²=2²=4.
    answer: The larger sphere has four times the projected area.
    common_mistake: Area scales as diameter squared, not cubed.
  - id: planetary_m06_we03
    title: Thermal peak wavelength
    problem: A blackbody has temperature 300 K. Use Wien's constant b=3000 μm K for a rounded estimate. Find peak wavelength.
    rule: λ_peak=b/T.
    steps:
    - 'Set up the relationship: λ_peak=b/T.'
    - λ_peak=3000/300=10 μm.
    answer: The rounded peak wavelength is 10 micrometres in the infrared.
    common_mistake: A hotter blackbody peaks at a shorter wavelength.
  - id: planetary_m06_we04
    title: Read a repeating light curve
    problem: A brightness pattern repeats every 4 hours. What repetition period is measured, and what caution applies to rotation?
    rule: A light curve measures repeated brightness, which may repeat more than once per physical rotation.
    steps:
    - The observed brightness period is 4 h.
    - If the shape gives two similar brightness cycles per rotation, the rotation period could be 8 h.
    answer: The light curve alone may not distinguish 4-hour rotation from a double-peaked 8-hour rotation.
    common_mistake: Do not automatically identify every brightness cycle with one full turn.
  - id: planetary_m06_we05
    title: Separate a fitted product
    problem: A rectangle has area 24 cm². Can area alone determine its length and width?
    rule: Area = length × width. One equation may leave more than one unknown pair.
    steps:
    - 24 = 6×4 and 24 = 8×3. Both pairs have the correct area.
    - If width is independently measured as 4 cm, length = 24/4 = 6 cm.
    answer: Area alone is insufficient; the additional width measurement selects 6 cm by 4 cm.
    common_mistake: One matching output does not identify both input parameters.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**World state:** The 106 m estimate receives ASSUMES pv = 0.25. Waypoint: FLY TO EAST SUMMIT - MEASURE HEAT, NOT JUST REFLECTION.

**Panel/HUD text:** THE DARKER ANSWER / FIRST RESULT LOGGED

**Dialogue bubbles -** Sanaa Vale: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Spectroscopy Dome waypoint and Stop 22.

**Beat 3 - After Stop 22 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** The sizing-board shows reflected-light and thermal curves crossing at one region.

**Panel/HUD text:** THE DARKER ANSWER / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Sanaa Vale: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 23.

**Beat 4 - After Stop 23 | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Diameter range locks at 230-290 m; the albedo marker falls to 0.041.

**Panel/HUD text:** THE DARKER ANSWER / DECISION EVIDENCE READY

**Dialogue bubbles -** Sanaa Vale: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 24.

**Beat 5 - At mission end | automatic**

**Player control:** Pause local interaction while bubbles are open; Continue restores control.

**World state:** Consequence class changes from LOCAL to REGIONAL; the unequal light-curve peaks remain tagged STRUCTURE UNRESOLVED.

**Panel/HUD text:** THE DARKER ANSWER / MISSION DECISION LOGGED

**Dialogue bubbles -** Sanaa Vale: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 6 outcome, metric screen, concept review, and Mission 7 briefing.

## Location plan

**Two locations:** DISC Stop 1, then CHAR Stops 2-4. Visible photometry establishes the degeneracy; only the characterization dome has thermal and spectral measurements to break it.

## Characters and dramatic beat

Sanaa refuses the convenient bright-surface assumption. Evelyn joins by radio and needs a size range before changing public consequence language. The player's larger estimate raises the stakes and costs trust, but it also prevents an order-of-magnitude energy underestimate.

## Key concepts, explained here

Absolute magnitude H standardizes reflected brightness. Albedo changes how much sunlight a surface returns. Diameter and albedo therefore trade off along one reflected-light locus. Thermal flux measures emitting area after temperature is constrained. Because mass scales with diameter cubed, a factor of 2.5 in diameter changes energy by roughly a factor of 16 at fixed density and speed.

## Stop 21 - Reproduce the assumption

**Format/placement:** BALLPARK, at `dome-console`.

**Metadata:** Concept: 3 - H-to-diameter estimate; Keystone: albedo-size degeneracy; Area: Spectroscopy Dome; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the dome console, in the Survey Telescope.

**Stop reason - exact player copy:** Certified brightness does not establish size until the notice's assumed reflectivity is made explicit.

**Question card story setup - exact player copy:** The certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Estimate the diameter produced by that assumption and label the preliminary result as explicitly conditional.

**Question card story-science connection - exact player copy:** The conditional diameter shows how strongly the early size estimate depends on the adopted albedo.

**Question card prompt - exact player copy:** Using every displayed input, submit one conditional diameter in meters.

**Expected submission - exact player copy:** one conditional diameter in meters

**Correct result:** 0.106 km = 106 m; accept 98-114 m.

**Answer text:** The early estimate is about 106 m only if the surface reflects 25% under the adopted geometric model.

**Why:** Lower albedo requires a larger area to produce the same reflected brightness.

**Wrong-path feedback:** Keep the square root of albedo in the denominator and convert kilometers to meters at the end.

**State/output:** The old estimate gains an ASSUMED ALBEDO label; CHAR waypoint unlocks.

## Stop 22 - Break the reflected-light locus

**Format/placement:** DEGENERACY, at `sizing-board`.

**Metadata:** Concept: 3 - diameter-albedo degeneracy; Keystone: albedo-size; Area: Spectroscopy Dome; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The brightness-based estimate leaves size and reflectivity entangled.

**Question card story setup - exact player copy:** With the conditional 106 m result visible, slide diameter and albedo along every pair that matches the reflected brightness. Then add the thermal-area constraint and locate the smaller region that satisfies both.

**Question card story-science connection - exact player copy:** The thermal-area constraint separates diameter from albedo so consequence planning need not assume a bright surface.

**Question card prompt - exact player copy:** Submit the numerical pair (D in meters, pv dimensionless) that satisfies both the reflected-light and thermal controls.

**Expected submission - exact player copy:** one numerical pair that satisfies both named controls





**Complete format-specific interaction block:**

```yaml
degeneracy:
  parameters:
    x: {label: "Diameter D", unit: "m", range: [80, 340]}
    y: {label: "Visible reflectivity pv", unit: "dimensionless", range: [0.02, 0.30]}
  control_1:
    label: "Reflected-light brightness H=22.0"
    relationship: "D_km=1329*10^(-H/5)/sqrt(pv)"
    allowed_pairs: [[106,0.25],[180,0.087],[260,0.041],[320,0.027]]
  control_2:
    label: "Thermal emitting diameter"
    allowed_diameter_m: [230,290]
  candidates:
    - {pair: [106,0.25], fits: [control_1]}
    - {pair: [180,0.087], fits: [control_1]}
    - {pair: [260,0.041], fits: [control_1,control_2], correct: true}
    - {pair: [320,0.027], fits: [control_1]}
```

**Correct result:** D = 260 m, pv = 0.041; diameter range 230-290 m.

**Answer text:** The asteroid is large and dark, not small and bright.

**Why:** Two measurements with different parameter dependence break a degeneracy.

**Wrong-path feedback:** A point on only one curve is still ambiguous; find where both physical constraints overlap.

**State/output:** Sizing board locks 230-290 m; Stop 23 unlocks.

## Stop 23 - Check the thermal temperature

**Format/placement:** SWEEP, at `spectrograph`.

**Metadata:** Concept: 23 - Wien relation; Keystone: light/thermal characterization; Area: Spectroscopy Dome; Learning role: PRACTICE; Difficulty: L3; Story role: verification.

**Call - exact player copy:** Go to the thermal spectrograph, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The thermal size constraint depends on matching the measured spectral shape to a plausible temperature.

**Question card story setup - exact player copy:** Because the thermal locus selects a large dark body, sweep model temperature and compare the predicted spectral peak with the observed 10.2-micrometer maximum. Choose the temperature that aligns the shape before accepting the area.

**Question card story-science connection - exact player copy:** The temperature fit determines whether the emitting area used in the diameter estimate is physically supported.

**Question card prompt - exact player copy:** Calculate and commit the predicted temperature in kelvin before the temperature control unlocks; then operate the sweep, measure the model peak in micrometers, and submit the setting plus PASS or FAIL.

**Expected submission - exact player copy:** one temperature setting in kelvin, one measured peak in micrometers, and one PASS-or-FAIL conclusion





**Complete format-specific interaction block:**

```yaml
sweep:
  prediction:
    equation: "T=2898 micrometre*K / 10.2 micrometres"
    committed_temperature_K: 285
  control: {label: "Model temperature", unit: "K", values: [250,270,285,300,320]}
  readings:
    - {temperature_K: 250, peak_micrometres: 11.59}
    - {temperature_K: 270, peak_micrometres: 10.73}
    - {temperature_K: 285, peak_micrometres: 10.17}
    - {temperature_K: 300, peak_micrometres: 9.66}
    - {temperature_K: 320, peak_micrometres: 9.06}
  observed_peak_micrometres: 10.2
  pass_tolerance_micrometres: 0.20
  correct_setting_K: 285
  correct_conclusion: PASS
```

**Correct result:** 285 K.

**Answer text:** The thermal color temperature is about 285 K, supporting the large emitting area.

**Why:** Wien's law links a thermal spectrum's peak wavelength inversely to temperature.

**Wrong-path feedback:** Match the spectral peak, not the highest temperature or largest total flux.

**State/output:** Thermal constraint changes from PROVISIONAL to VERIFIED; Stop 24 unlocks.

## Stop 24 - Adopt the consequence body

**Format/placement:** DIAGNOSIS, at `sizing-board`.

**Metadata:** Concept: 3 - physical characterization; Keystone: size/structure; Area: Spectroscopy Dome; Learning role: TRANSFER; Difficulty: L4; Story role: decision/Twist 1.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The independent size and temperature evidence now needs one body model for consequence planning.

**Question card story setup - exact player copy:** With diameter and temperature constrained, compare explanations against H = 22.0, pv = 0.041, the 230-290 m thermal size, and unequal light-curve maxima. Name the physical model that fits every independent reading.

**Question card story-science connection - exact player copy:** The diagnosis determines which size, darkness, and shape description fits all measurements without overstating unresolved structure.

**Question card prompt - exact player copy:** Diagnose the one model that fits every reading, including the quiet lack of visible activity.

**Expected submission - exact player copy:** one physical-model diagnosis and one consequence-planning action





**Complete format-specific interaction block:**

```yaml
diagnosis:
  evidence:
    - "Absolute magnitude H=22.0"
    - "Visible reflectivity pv=0.041"
    - "Thermal diameter range 230-290 m"
    - "Unequal maxima repeat in the rotation light curve"
    - "No visible coma or gas activity"
  diagnoses:
    - {id: large_dark_irregular, text: "A large, dark, irregular or two-lobed asteroid.", correct: true}
    - {id: small_bright, text: "A small, bright, spherical asteroid."}
    - {id: active_comet, text: "An active comet whose coma supplies the brightness."}
    - {id: confirmed_binary, text: "A fully separated binary asteroid already proven by the light curve."}
  rebuttals:
    small_bright: "The low reflectivity and thermal area require a much larger body."
    active_comet: "The images show no coma or activity, and the thermal size already explains the flux."
    confirmed_binary: "Unequal maxima support an irregular or two-lobed shape but do not by themselves prove two separated bodies."
  consequence_action: "Use a roughly 260 m dark body for planning while radar tests its structure."
```

**Correct result:** Large, dark, irregular or two-lobed body.

**Answer text:** Consequence planning must use a roughly 260 m dark body while radar tests its structure.

**Why:** Thermal area breaks the size-albedo degeneracy; the light curve adds shape information without proving a binary.

**Wrong-path feedback:** A model that fits diameter but ignores the unequal rotation signature is incomplete.

**State/output:** Consequence class changes to REGIONAL; radar structure request unlocks.

## Mission outcome

Mission decision: Plan for a dark body that is 230–290 m wide. Its heat shows that it is larger than first thought. Its light may point to two lobes. Radar must test its shape and path.

**Pre-card character beat:** Sanaa Vale, physical-characterization lead, moves the 106 m card into ASSUMPTIONS. Evelyn Park says by radio, “Then the warning must change before the next headline changes it for us.”

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was exactly the insight the team needed. You resolved the central question: Plan for a dark body that is 230–290 m wide. The response team can protect threatened communities with better information.

**Header:** MISSION 6 COMPLETE

**Timer:** TIME {elapsed} / TARGET 13:00

**Accuracy:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The larger dark body improves the model but forces a more severe public consequence class.

**Automatic bar change:** IMPACT SOLUTION +5 | RESPONSE READINESS +4 | OBSERVING RESERVE -5 | PUBLIC TRUST -8

**Recovery Point line:** RP = clamp(4, 12, 11 + time modifier - incorrect submissions)

**Allocation prompt:** Spend one point to raise one unlocked bar by 1%, or bank it.

**Canonical QA example:** Award 10 RP; Reserve +3, Trust +7; bars 80 / 72 / 66 / 66; bank 0.

**Failure check:** Public Trust at 0% blocks later county action and restores the mission-start snapshot.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Darker Answer. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Darker Answer, the certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Which conclusion correctly applies Absolute magnitude H to the observations and physics?

**Options - exact player copy:**

- A. A measure of how strongly a surface reflects visible light.
- B. A standardized visible brightness used with albedo to estimate asteroid diameter.
- C. Brightness measured over time, often used to infer spin and shape.
- D. Heat radiation that can constrain emitting area and temperature.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Absolute magnitude H; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Albedo, not Absolute magnitude H. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. a standardized visible brightness used with albedo to estimate asteroid diameter.
- C: This describes Light curve, not Absolute magnitude H. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Thermal infrared, not Absolute magnitude H. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Darker Answer: the certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Which conclusion correctly applies Albedo to the observations and physics?

**Options - exact player copy:**

- A. A standardized visible brightness used with albedo to estimate asteroid diameter.
- B. Brightness measured over time, often used to infer spin and shape.
- C. A measure of how strongly a surface reflects visible light.
- D. Heat radiation that can constrain emitting area and temperature.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Albedo; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute magnitude H, not Albedo. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Light curve, not Albedo. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a measure of how strongly a surface reflects visible light.
- D: This describes Thermal infrared, not Albedo. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Darker Answer using new evidence: the certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Rotation phase",
  "yLabel": "Relative brightness",
  "caption": "A repeating light curve with unequal maxima.",
  "series": [
    {
      "name": "Brightness",
      "points": [
        [
          0,
          1.0
        ],
        [
          0.125,
          0.82
        ],
        [
          0.25,
          1.08
        ],
        [
          0.375,
          0.78
        ],
        [
          0.5,
          1.0
        ],
        [
          0.625,
          0.82
        ],
        [
          0.75,
          1.08
        ],
        [
          0.875,
          0.78
        ],
        [
          1,
          1.0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. A standardized visible brightness used with albedo to estimate asteroid diameter.
- B. A measure of how strongly a surface reflects visible light.
- C. Heat radiation that can constrain emitting area and temperature.
- D. Brightness measured over time, often used to infer spin and shape.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Absolute magnitude H, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Albedo, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Thermal infrared, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. brightness measured over time, often used to infer spin and shape.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Darker Answer: because the thermal locus selects a large dark body, sweep model temperature and compare the predicted spectral peak with the observed 10.2-micrometer maximum. Which conclusion correctly applies Thermal infrared to the observations and physics?

**Options - exact player copy:**

- A. Heat radiation that can constrain emitting area and temperature.
- B. A standardized visible brightness used with albedo to estimate asteroid diameter.
- C. A measure of how strongly a surface reflects visible light.
- D. Brightness measured over time, often used to infer spin and shape.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Thermal infrared; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. heat radiation that can constrain emitting area and temperature.
- B: This describes Absolute magnitude H, not Thermal infrared. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Albedo, not Thermal infrared. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Light curve, not Thermal infrared. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Darker Answer decision, the team knows this: the certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Which conclusion correctly applies H-to-diameter estimate to the observations and physics?

**Options - exact player copy:**

- A. A standardized visible brightness used with albedo to estimate asteroid diameter.
- B. Lower albedo requires a larger area to produce the same reflected brightness.
- C. A measure of how strongly a surface reflects visible light.
- D. Brightness measured over time, often used to infer spin and shape.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for H-to-diameter estimate; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute magnitude H, not H-to-diameter estimate. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. lower albedo requires a larger area to produce the same reflected brightness.
- C: This describes Albedo, not H-to-diameter estimate. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Light curve, not H-to-diameter estimate. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Darker Answer to this follow-up: the certified photometry gives H = 22.0, while the early notice silently assumed a bright albedo of 0.25. Which conclusion correctly applies diameter-albedo degeneracy to the observations and physics?

**Options - exact player copy:**

- A. A standardized visible brightness used with albedo to estimate asteroid diameter.
- B. A measure of how strongly a surface reflects visible light.
- C. Two measurements with different parameter dependence break a degeneracy.
- D. Brightness measured over time, often used to infer spin and shape.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for diameter-albedo degeneracy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Absolute magnitude H, not diameter-albedo degeneracy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Albedo, not diameter-albedo degeneracy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. two measurements with different parameter dependence break a degeneracy.
- D: This describes Light curve, not diameter-albedo degeneracy. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
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

**Card body:** Radar sends a signal toward the asteroid and measures its return to find distance and motion. Tonight's echo is faint, and a clock error could put the asteroid in the wrong place. Check the timing and deliver a measurement the team can trust.

**Objective:** Deliver one independently timed radar constraint the orbit team can safely use.

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
  - id: planetary_m07_we01
    title: Radar round-trip time
    problem: A radar echo returns after 2 s. Use c=300000 km/s. Find target distance.
    rule: Range=c×round-trip delay/2.
    steps:
    - 'Set up the relationship: Range=c×round-trip delay/2.'
    - R=300000(2)/2=300000 km.
    answer: The target is 300000 km away.
    common_mistake: The measured delay includes travel out and back.
  - id: planetary_m07_we02
    title: Range error from timing error
    problem: A radar delay is biased high by 0.002 s. Use c=300000 km/s. Find the range bias.
    rule: Range bias=c×delay bias/2.
    steps:
    - 'Set up the relationship: Range bias=c×delay bias/2.'
    - ΔR=300000(0.002)/2=300 km.
    answer: The inferred range is 300 km too large.
    common_mistake: A shared clock bias can shift many measurements together.
  - id: planetary_m07_we03
    title: A rounded radar Doppler estimate
    problem: For a receding target, use the nonrelativistic monostatic radar magnitude |Δf|=2v/λ. Let v=3 m/s and wavelength λ=0.1 m.
    rule: The factor 2 represents the outbound and returning Doppler shifts.
    steps:
    - 'Set up the relationship: The factor 2 represents the outbound and returning Doppler shifts.'
    - '|Δf|=2(3)/0.1=60 Hz.'
    answer: The return is shifted downward by about 60 Hz for recession under this convention.
    common_mistake: A one-way Doppler formula would omit the radar factor of two.
  - id: planetary_m07_we04
    title: Correct a known offset
    problem: A balance reads 52 g for a certified 50 g mass and 32 g for a second object. Assume a constant additive offset. Find the corrected second mass.
    rule: Offset = reading - reference; corrected value = reading - offset.
    steps:
    - offset = 52 - 50 = +2 g. The balance reads high.
    - corrected mass = 32 - 2 = 30 g. Subtract the same offset.
    answer: The corrected mass is 30 g.
    common_mistake: An additive offset is not a percentage error.
  - id: planetary_m07_we05
    title: Position residual
    problem: A model predicts sky coordinate 100 arcseconds and the observed coordinate is 103 arcseconds in the same reference. Find residual.
    rule: Residual=observed-predicted coordinate.
    steps:
    - 'Set up the relationship: Residual=observed-predicted coordinate.'
    - r=103-100=+3 arcseconds.
    answer: The model prediction is 3 arcseconds below the observed coordinate.
    common_mistake: Use the same coordinate reference and units.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Range: distance inferred from a radar echo’s round-trip travel time.

Doppler shift: a frequency change caused by motion toward or away from the radar.

Residual: the measured value minus the value predicted by a model.

Coordinated Universal Time (UTC): the shared time standard used to compare observations from different systems.

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

**Dialogue bubbles -** Tomás Ibarra: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 26.

**Beat 3 - After Stop 26 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A corrected echo lands exactly where one surviving orbit family predicts.

**Panel/HUD text:** THE ECHO CLOCK / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Tomás Ibarra: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 27.

**Beat 4 - After Stop 27 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A weaker shoulder appears beside the main return; Tomás preserves it without naming it.

**Panel/HUD text:** THE ECHO CLOCK / DECISION EVIDENCE READY

**Dialogue bubbles -** Tomás Ibarra: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 28.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ECHO CLOCK / MISSION DECISION LOGGED

**Dialogue bubbles -** Tomás Ibarra: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

**Unlocks:** Mission 7 outcome, metric screen, concept review, and Mission 8 briefing.

## Location plan

**Mission route:** OPS Coordination Office -> RADAR Bistatic Radar Range.   Travel follows the evidence and is never an orientation errand.

## Characters and dramatic beat

**Crew:** Mira Chen, Tomás Ibarra, Malik Rowan.   The central beat is: Turn a faint echo into an independent orbital constraint while preserving a suspicious second shoulder.

## Key concepts, explained here

Radar delay measures distance while Doppler measures line-of-sight motion. A shared clock error shifts many measurements together and cannot be averaged away. A weak unexplained feature should be preserved without being named prematurely. The player must use these ideas in the four graded stops rather than merely repeat their definitions.

## Stop 25 - Trace the time chain

**Format/placement:** TRACE, at `scopeboard`.

**Metadata:** Concept: 10 - radar timing; Keystone: systems/verification; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The incoming radar packet needs a clock audit before delay becomes a physical distance.

**Question card story setup - exact player copy:** The radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Trace the timestamp from observatory receipt backward and flag the device that can shift every derived range together.

**Question card story-science connection - exact player copy:** The timestamp dependency identifies a shared timing offset capable of biasing every range derived from the archive.

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

**Metadata:** Concept: 10 - radar acquisition; Keystone: procedure/control; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L4; Story role: method.

**Call - exact player copy:** Go to the radar timing board, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The clock fault can be corrected, but the original radar evidence must remain auditable.

**Question card story setup - exact player copy:** Tomás can repair the archive, but overwriting the raw packet would destroy the audit trail. Put the correction, calibration pulse, target integration, and independent clock comparison into a defensible operational order.

**Question card story-science connection - exact player copy:** The correction protocol determines whether calibrated range products retain raw data, timing provenance, and independent checks.

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

**Metadata:** Concept: 10 - range and radial speed; Keystone: equations/interpretation; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The corrected timing permits the radar return to constrain range and radial motion.

**Question card story setup - exact player copy:** The corrected return arrives 0.080 seconds after transmission and shifts toward the transmitter. Probe the clock, delay, Doppler, and background stations; calculate range and classify radial motion without inferring sideways speed.

**Question card story-science connection - exact player copy:** Delay and Doppler distinguish distance and line-of-sight velocity without claiming unmeasured sideways motion.

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

**§7 authored-board source - PROBE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 27 - Read delay and Doppler"
  format: "PROBE"
  source: "Handback 5 canonical interaction block"
  question: "Calculate and commit range in kilometers; then probe all four stations, measure each reading, and submit the range plus APPROACHING or RECEDING."
  payload: "~~~yaml probe: prediction_commit_required: true equipment_unlocks_after_commit: true points: - id: corrected_clock load: \"Corrected timing reference; verify zero residual clock offset before using the echo.\" reading: {clock_offset_s: 0.000} expected: {clock_offset_s: 0.000} comparison: \"The observed offset equals the station-specific zero-offset expectation.\" - id: delay_channel load: \"Round-trip echo timing; calculate R = cΔt/2 using c = 3.00 × 10^8 m/s and Δt = 0.080 s.\" reading: {round_trip_delay_s: 0.080} expected: {one_way_range_km: 12000} comparison: \"The calculated 12,000 km range is the station-specific expected result.\" - id: doppler_channel load: \"Frequency-shift direction relative to the transmitter; do not infer transverse speed.\" reading: {shift_direction: toward_transmitter} expected: {radial_motion: approaching} comparison: \"A shift toward the transmitter specifically means APPROACHING radial motion.\" - id: background_channel load: \"Off-target background gate; check that noise cannot imitate the timed return.\" reading: {signal_to_noise: 1.1} expected: {maximum_signal_to_noise: 1.5} comparison: \"The background stays below its station-specific 1.5 limit.\" correct_submission: {range_km: 12000, radial_motion: approaching} required_samples: [corrected_clock, delay_channel, doppler_channel, background_channel] truth: {range_km: 12000, radial_motion: approaching} commit_gate: All four stations sampled after the range prediction is committed. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROBE:**

**Handback 5 canonical interaction block - PROBE:**

```yaml
probe:
  stations:
    - {id: corrected_clock, label: "Corrected timing reference", reading: 0.000, expected: 0.000, unit: "s clock offset"}
    - {id: delay_channel, label: "Round-trip echo", reading: 0.080, expected: 0.080, unit: "s"}
    - {id: doppler_channel, label: "Doppler direction", reading: "toward transmitter", expected: "approaching", unit: "radial-motion class"}
    - {id: background_channel, label: "Off-target background", reading: 1.1, expected: 1.5, unit: "maximum S/N"}
  target: delay_channel
  quantityAndUnits: "Calculate and commit range in kilometers; then probe all four stations, measure each reading, and submit the range plus APPROACHING or RECEDING."
  correctConclusion: "12,000 km range; object is approaching along the line of sight."
```

**Correct result:** 12,000 km range; object is approaching along the line of sight.

**Answer text:** Delay gives distance, while the frequency shift gives only radial-motion direction.

**Why:** Round-trip light time is halved; Doppler does not reveal transverse velocity.

**Wrong-path feedback:** A one-way calculation doubles range, and Doppler alone cannot supply the full velocity vector.

**State/output:** RANGE 12,000 KM and APPROACHING enter the orbit packet.

## Stop 28 - Freeze the claim before the image

**Format/placement:** HOLDOUT, at `echo-archive`.

**Metadata:** Concept: 10 - echo interpretation; Keystone: bias/verification; Area: Bistatic Radar Range; Learning role: INTRODUCE; Difficulty: L5; Story role: judgment.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The predicted echo window must be frozen before the integrated radar image is opened.

**Question card story setup - exact player copy:** Malik's surviving orbit predicts the main echo window, but the integrated image remains hidden. Freeze the expected delay band and rejection condition before revealing a strong return plus a weak adjacent shoulder.

**Question card story-science connection - exact player copy:** The revealed main return tests the orbit constraint while the adjacent shoulder remains a separate unresolved feature.

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

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 28 - Freeze the claim before the image"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Commit the ±0.004 s window and rejection rule first; after reveal, submit the main-return offset in seconds, shoulder status, and ACCEPT or REJECT."
  payload: "~~~yaml holdout: commit_required: true fit: {main_echo_window_s: [-0.004, 0.004], reject_outside_window: true} reveal_after_commit: {main_echo_offset_s: 0.001, weak_adjacent_shoulder: present} score: main_range_constraint: accept shoulder_status: unexplained correct_conclusion: accept_main_range_and_preserve_unexplained_shoulder ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed main-return timing error", min: 0, max: 8, step: 2, unit: "ms"}
  fit: [{at: 0, value: 0.58}, {at: 2, value: 0.98}, {at: 4, value: 0.84}, {at: 6, value: 0.87}, {at: 8, value: 0.83}]
  test: [{at: 0, value: 0.36}, {at: 2, value: 0.47}, {at: 4, value: 0.77}, {at: 6, value: 0.86}, {at: 8, value: 0.84}]
  passScore: 0.80
  overfitAt: 2
  correctAt: 6
  committedWindow: {min: -4, max: 4, unit: "ms"}
  heldOutMeasurement: {mainReturnOffset: 1, shoulderPresent: true, unit: "ms"}
  correctConclusion: "Accept the main constraint and preserve the shoulder as unresolved."
```

**Correct result:** Accept the main constraint; label the shoulder unresolved.

**Answer text:** The main return passes the frozen test, while the shoulder becomes a clue rather than a conclusion.

**Why:** Pre-registration limits hindsight bias and protects anomalies for later testing.

**Wrong-path feedback:** Neither deleting the shoulder nor naming it a fragment is justified yet.

**State/output:** RADAR CONSTRAINT VALID; SECOND SHOULDER UNRESOLVED.

## Mission outcome

Mission decision: Accept the fixed main radar echo as a new range and speed check. Keep the weak shoulder marked as unknown. The orbit can now shrink without hiding that clue.

**Pre-card character beat:** Tomás sends Malik the traced radar packet and keeps the weak shoulder in a separate evidence lane.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You saw through the trap. Your analysis established the point that matters: Accept the fixed main radar echo as a new range and speed check. Cerro Alto now has a clearer path through the uncertainty.

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Tomás sends Malik the traced radar packet and keeps the weak shoulder in a separate evidence lane.



**Automatic change:** IMPACT SOLUTION +10 | OBSERVING RESERVE -6.

**Canonical QA allocation:** 10 RP; Reserve +2, Trust +2, Solution +6 -> bars 90 / 72 / 68 / 68.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Echo Clock. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Echo Clock, the radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which conclusion correctly applies Range to the observations and physics?

**Options - exact player copy:**

- A. A frequency change caused by motion toward or away from the radar.
- B. Distance inferred from a radar echo’s round-trip travel time.
- C. The measured value minus the value predicted by a model.
- D. The shared time standard used to compare observations from different systems.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Range; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Doppler shift, not Range. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. distance inferred from a radar echo’s round-trip travel time.
- C: This describes Residual, not Range. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Coordinated Universal Time (UTC), not Range. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Echo Clock: the radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "peaks",
  "xLabel": "Wavelength (nm)",
  "yLabel": "Relative intensity",
  "caption": "The measured spectral peak is shifted from the reference peak.",
  "series": [
    {
      "name": "Reference",
      "points": [
        [
          500,
          1.0
        ]
      ]
    },
    {
      "name": "Measured",
      "points": [
        [
          504,
          0.9
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Distance inferred from a radar echo’s round-trip travel time.
- B. The measured value minus the value predicted by a model.
- C. A frequency change caused by motion toward or away from the radar.
- D. The shared time standard used to compare observations from different systems.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Range, not Doppler shift. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Residual, not Doppler shift. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a frequency change caused by motion toward or away from the radar.
- D: This describes Coordinated Universal Time (UTC), not Doppler shift. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Echo Clock using new evidence: the radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which interpretation of the displayed evidence correctly uses the mission concept?

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

- A. Distance inferred from a radar echo’s round-trip travel time.
- B. A frequency change caused by motion toward or away from the radar.
- C. The shared time standard used to compare observations from different systems.
- D. The measured value minus the value predicted by a model.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Range, not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Doppler shift, not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Coordinated Universal Time (UTC), not Residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. the measured value minus the value predicted by a model.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Echo Clock: the radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which conclusion correctly applies Coordinated Universal Time (UTC) to the observations and physics?

**Options - exact player copy:**

- A. The shared time standard used to compare observations from different systems.
- B. Distance inferred from a radar echo’s round-trip travel time.
- C. A frequency change caused by motion toward or away from the radar.
- D. The measured value minus the value predicted by a model.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Coordinated Universal Time (UTC); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. the shared time standard used to compare observations from different systems.
- B: This describes Range, not Coordinated Universal Time (UTC). It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Doppler shift, not Coordinated Universal Time (UTC). It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Residual, not Coordinated Universal Time (UTC). It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Echo Clock decision, the team knows this: the radar packet passed through four clocks, but only three were synchronized to the range standard before transmission. Open the dependencies now so the team can distinguish independent evidence from readings that repeat one source. Which conclusion correctly applies radar timing to the observations and physics?

**Options - exact player copy:**

- A. Distance inferred from a radar echo’s round-trip travel time.
- B. TRACE follows provenance until one upstream cause explains correlated downstream error.
- C. A frequency change caused by motion toward or away from the radar.
- D. The measured value minus the value predicted by a model.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for radar timing; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Range, not radar timing. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. tRACE follows provenance until one upstream cause explains correlated downstream error.
- C: This describes Doppler shift, not radar timing. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Residual, not radar timing. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Echo Clock to this follow-up: tomás can repair the archive, but overwriting the raw packet would destroy the audit trail. Assign a response to each condition now so the crew has an action rule it can follow under pressure. Which conclusion correctly applies radar acquisition to the observations and physics?

**Options - exact player copy:**

- A. Distance inferred from a radar echo’s round-trip travel time.
- B. A frequency change caused by motion toward or away from the radar.
- C. A protocol orders controls before interpretation and preserves provenance.
- D. The measured value minus the value predicted by a model.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for radar acquisition; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Range, not radar acquisition. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Doppler shift, not radar acquisition. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a protocol orders controls before interpretation and preserves provenance.
- D: This describes Residual, not radar acquisition. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Radar delay gives range; Doppler gives radial motion; shared timing errors are systematic; a holdout protects anomalies from hindsight.

- **Mission takeaway:** Correct the clock, freeze the prediction, and keep unexplained structure alive.

---

# Mission 8 - The Orbit Narrows

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 7 DAYS, 12 HOURS

**Card title:** THE ORBIT NARROWS

**Go now:** Go to the Radar Range and meet Tomás Ibarra at the radar console, then carry the traced packet to Orbit Determination.

**Card body:** Pictures show where the asteroid appears in the sky; radar adds its distance and motion toward or away from Earth. Combine the independent measurements without counting the same evidence twice. Update the impact probability and state what remains uncertain.

**Objective:** Combine optical and radar evidence into a revised impact probability without double-counting shared errors.

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
  - id: planetary_m08_we01
    title: Combine independent estimates
    problem: Independent unbiased estimates are 10±1 and 14±2 units, with quoted independent Gaussian standard uncertainties. Find their inverse-variance weighted mean.
    rule: Weights are 1/σ²; weighted mean=sum(w x)/sum(w).
    steps:
    - 'Set up the relationship: Weights are 1/σ²; weighted mean=sum(w x)/sum(w).'
    - weights=1 and 1/4; mean=(10+14/4)/(1+1/4)=13.5/1.25=10.8.
    answer: The weighted mean is 10.8 units, closer to the more precise estimate.
    common_mistake: Shared systematic errors invalidate treating the estimates as independent in this combination.
  - id: planetary_m08_we02
    title: Correlated coordinate errors
    problem: Two estimated coordinates each change when the same image rotation is corrected. Can their errors be treated as independent automatically?
    rule: A common calibration parameter can correlate coordinate errors.
    steps:
    - Changing that parameter moves both coordinates in a linked way.
    - A joint uncertainty description should retain that relationship instead of multiplying separate independent probabilities.
    answer: Independence is not justified solely because the coordinates have different names.
    common_mistake: Ignoring covariance can distort the allowed region of positions.
  - id: planetary_m08_we03
    title: Count collision-compatible paths
    problem: In a deliberately equally weighted toy sample of 100 possible paths, 8 cross a target. Estimate collision probability within this sample.
    rule: For equally weighted representative paths, probability estimate=hits/total.
    steps:
    - 'Set up the relationship: For equally weighted representative paths, probability estimate=hits/total.'
    - p=8/100=0.08=8%.
    answer: The sample estimate is 8%, conditional on the model and equal weighting.
    common_mistake: Unweighted counting is invalid if the paths carry unequal probabilities.
  - id: planetary_m08_we04
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
  - id: planetary_m08_we05
    title: A simple uncertainty interval
    problem: A coordinate estimate is 10 units with standard uncertainty σ=2 units. Give the center ±3σ interval.
    rule: The stated three-sigma interval is estimate ±3×standard uncertainty.
    steps:
    - 'Set up the relationship: The stated three-sigma interval is estimate ±3×standard uncertainty.'
    - interval=[10-3(2),10+3(2)]=[4,16].
    answer: The interval is 4 to 16 units; a probability interpretation needs a distribution model.
    common_mistake: Three-sigma language alone does not prove a Gaussian error model.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**Dialogue bubbles -** Malik Rowan: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 30.

**Beat 3 - After Stop 30 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The b-plane cloud contracts across Earth's disk.

**Panel/HUD text:** THE ORBIT NARROWS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 31.

**Beat 4 - After Stop 31 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira asks for the strongest defensible sentence, not the largest number.

**Panel/HUD text:** THE ORBIT NARROWS / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 32.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ORBIT NARROWS / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 18 - data fusion; Keystone: provenance; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L4; Story role: evidence.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The released radar products include shared corrections that could be mistaken for independent confirmations.

**Question card story setup - exact player copy:** Four radar products are ready, but two inherit the same archive-clock correction and cannot count as independent confirmation. Build the evidence chain from raw packets through calibration to released range and Doppler products.

**Question card story-science connection - exact player copy:** The product dependencies determine which measurements supply new evidence and which carry the same timing uncertainty.

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

**§7 authored-board source - CHAIN:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 29 - Transfer the evidence chain"
  format: "CHAIN"
  source: "Handback 5 canonical interaction block"
  question: "Submit the completed evidence chain and name the correction shared by the range and Doppler products."
  payload: "~~~yaml chain: transfers: - {id: raw_a, label: Raw packet A to correction C, carries: uncorrected echo samples and archive time} - {id: range_a, label: Correction C to range product A, carries: corrected round-trip delay} - {id: doppler_a, label: Correction C to Doppler product A, carries: corrected frequency shift and shared time provenance} - {id: raw_b, label: Raw packet B to clock B, carries: independent echo samples and time} - {id: range_b, label: Clock B to range product B, carries: independent round-trip delay} - {id: gain, label: Calibration pulse to gain model, carries: echo-power calibration} order: [raw_a, range_a, doppler_a, raw_b, range_b, gain] decoys: - {id: independent_a_products, label: Treat range A and Doppler A as independent} - {id: clock_b_to_a, label: Route packet A through independent clock B} governing_relationship: Range A and Doppler A share correction C; range B has an independent clock path. correct: [raw_a, range_a, doppler_a, raw_b, range_b, gain] ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CHAIN:**

**Handback 5 canonical interaction block - CHAIN:**

```yaml
chain:
  links:
    - {id: raw_a, label: "Raw packet A to correction C", transfers: "uncorrected echo samples and archive time"}
    - {id: range_a, label: "Correction C to range product A", transfers: "corrected round-trip delay"}
    - {id: doppler_a, label: "Correction C to Doppler product A", transfers: "corrected frequency shift and shared time provenance"}
    - {id: raw_b, label: "Raw packet B to clock B", transfers: "independent echo samples and time"}
    - {id: range_b, label: "Clock B to range product B", transfers: "independent round-trip delay"}
    - {id: gain, label: "Calibration pulse to gain model", transfers: "echo-power calibration"}
  order: [raw_a, range_a, doppler_a, raw_b, range_b, gain]
  governingLink: range_a
  correctConclusion: "Mark A-products as correlated; preserve B-range as independent."
```

**Handback 6 canonical interaction block - CHAIN:**

```yaml
chain:
  links:
    - {id: raw_a, label: "Raw packet A to correction C", transfers: "uncorrected echo samples and archive time"}
    - {id: range_a, label: "Correction C to range product A", transfers: "corrected round-trip delay"}
    - {id: doppler_a, label: "Correction C to Doppler product A", transfers: "corrected frequency shift and shared time provenance"}
    - {id: raw_b, label: "Raw packet B to clock B", transfers: "independent echo samples and time"}
    - {id: range_b, label: "Clock B to range product B", transfers: "independent round-trip delay"}
    - {id: gain, label: "Calibration pulse to gain model", transfers: "echo-power calibration"}
  order: [raw_a, range_a, doppler_a, raw_b, range_b, gain]
  governingLink: range_a
  distractor: gain
  correctConclusion: "Mark A-products as correlated because they share correction C; preserve B-range as independent rather than choosing the conspicuous gain link."
```

**Correct result:** Mark A-products as correlated; preserve B-range as independent.

**Answer text:** Shared correction C links two products even though their reported units differ.

**Why:** CHAIN exposes dependency through transformations.

**Wrong-path feedback:** Different output columns do not guarantee independent error sources.

**State/output:** FUSION MANIFEST signed; travel to ORBIT.

## Stop 30 - Balance the fit

**Format/placement:** BALLPARK, at `fit-board`.

**Metadata:** Concept: 11 - weighted fit; Keystone: uncertainty/modeling; Area: Orbit Determination Center; Learning role: INTRODUCE; Difficulty: L5; Story role: model.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The orbit fit must combine precise radar range with the longer optical baseline without counting correlated products twice.

**Question card story setup - exact player copy:** The radar range has tiny uncertainty, while optical positions provide the longer time baseline and transverse motion. Balance the datasets by documented uncertainty and correlation, then reject equal weighting and simple vote counting.

**Question card story-science connection - exact player copy:** Uncertainty-aware weighting determines how each dataset constrains the fitted trajectory rather than letting record count decide.

**Question card prompt - exact player copy:** Optical position has uncertainty 2 units and the independent radar range has uncertainty 1 unit. Using inverse-variance weights and treating the two correlated radar products as one stream, submit the radar stream's normalized weight and justify the covariance grouping.

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

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 30 - Balance the fit"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Choose and justify the defensible fusion weighting."
  payload: "~~~yaml balance: target: {label: Defensible fused orbit, value: one, unit: solution} streams: - {id: optical, label: Optical sky-plane positions, information: sky-plane position and long time baseline, correlation_group: optical_pipeline, count: true} - {id: radar_range, label: Independent radar range, information: line-of-sight distance, correlation_group: radar_clock, count: true} - {id: radar_doppler, label: Radar Doppler, information: radial motion, correlation_group: radar_clock, count: true} - {id: clock_diagnostic, label: Archive-clock diagnostic, information: provenance for radar products, correlation_group: radar_clock, count: false} candidates: - Equal weight per row - Radar only - Inverse-variance weighting with covariance groups - Majority vote by observatory correctChoice: Inverse-variance weighting with covariance groups rationale: Weight by documented uncertainty while preventing correlated products from being counted as independent. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "normalized weight of the independent radar stream"
  unit: "normalized likelihood weight"
  inputs:
    - {label: "Optical uncertainty", value: 2, unit: "relative units"}
    - {label: "Radar uncertainty", value: 1, unit: "relative units"}
  operation: "radar inverse variance divided by the sum of optical and radar inverse variances"
  formula: "w_radar=(1/1^2)/[(1/2^2)+(1/1^2)]"
  start: 0
  correctResult: 0.8
  tolerance: 0.02
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Weight by uncertainty while grouping correlated radar products.

**Answer text:** Precision controls weight, covariance prevents double-counting, and optical timing preserves transverse information.

**Why:** BALANCE trades influence according to information content and dependence.

**Wrong-path feedback:** The smallest error bar does not make every other geometric constraint irrelevant.

**State/output:** COMBINED FIT converges; Stop 31 unlocks.

## Stop 31 - Read the b-plane cloud

**Format/placement:** CHOICE, at `astro-bench`.

**Metadata:** Concept: 11 - encounter uncertainty; Keystone: probability/visualization; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: interpretation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The combined fit is ready to translate its encounter distribution into a planning probability.

**Question card story setup - exact player copy:** The combined trials form a narrow cloud crossing Earth's b-plane disk; 63 percent intersect the disk. Classify the remaining miss solutions and state what the cloud does and does not establish.

**Question card story-science connection - exact player copy:** The impact and miss fractions determine whether impact is the leading case while preserving material uncertainty.

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

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 31 - Read the b-plane cloud"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Submit the impact and miss fractions in percent and one operational conclusion: IMPACT LEADING CASE or IMPACT CERTAIN."
  payload: "~~~yaml cloud: total_weighted_trials: 10000 impact_trials: 6300 miss_trials: 3700 points: - {id: impact_set, setting: Earth intersection, reading: 6300 weighted trials} - {id: miss_set, setting: outside Earth, reading: 3700 weighted trials} equation: probability_percent = count / total_weighted_trials * 100 expected: {impact_percent: 63, miss_percent: 37} correct_conclusion: impact_leading_case rejected_conclusion: impact_certain ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```











**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "Of 10,000 weighted trials, 6,300 intersect Earth and 3,700 miss."
  choices:
    - {id: leading, label: "Impact is the leading case at 63%, while the 37% miss set remains important.", correct: true}
    - {id: certain, label: "Impact is certain because more than half of the trials intersect Earth.", correct: false}
    - {id: miss, label: "Miss is the leading case at 63% because 3,700 trials avoid Earth.", correct: false}
    - {id: nominal, label: "Only the nominal path should be reported because weighted trials are not physical observations.", correct: false}
  answer: leading
  rebuttals:
    certain: "A majority makes impact the leading case but leaves substantial probability on a miss."
    miss: "3,700 of 10,000 is 37%, so this reverses the two outcomes."
    nominal: "The weighted set represents the measured orbit uncertainty that the probability must include."
```

**Correct result:** Impact is the leading case at 63%, with a material 37% miss set.

**Answer text:** Planning should intensify while observations continue to test both impact and miss solutions.

**Why:** A probability cloud represents distributed uncertainty, not a single certain track.

**Wrong-path feedback:** A nominal trajectory cannot replace the ensemble that produced the probability.

**State/output:** IMPACT PROBABILITY 63%; corridor work unlocks.

## Stop 32 - Stress the planning sentence

**Format/placement:** STRESS, asked by Malik Rowan beside `fit-board`.

**Metadata:** Concept: 11 - robust conclusion; Keystone: decisions/uncertainty; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Malik Rowan, at the orbit-fit board in the Orbit Determination Center.

**Stop reason - exact player copy:** The leading-case result needs testing against alternative error assumptions before preparations intensify.

**Question card story setup - exact player copy:** Malik reruns the fit with conservative optical errors, doubled radar errors, and each observatory removed once. Probabilities range from 55 to 69 percent, so test which proposed planning statement survives every run.

**Question card story-science connection - exact player copy:** The probability range determines which planning statement remains defensible across all justified refits.

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

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 32 - Stress the planning sentence"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Submit the minimum and maximum probability in percent and one statement that survives every test."
  payload: "~~~yaml stress: assumption_runs: - {label: conservative optical errors, probability_percent: 55} - {label: doubled radar errors, probability_percent: 59} - {label: leave-one-observatory-out, probability_percent: [57, 69]} planning_boundary_percent: 50 candidates: - Impact is certain - No action is needed - Impact remains the leading case and preparation should intensify - The exact corridor is fixed correctChoice: Impact remains the leading case and preparation should intensify correct_conclusion: impact_remains_leading_case_and_preparation_intensifies ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "impact probability", min: 1, max: 8, nominal: 4.5, step: 1, unit: "%"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 4.5, max: 4.5}
      failsAt: 8
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 4.5, max: 8}
      failsAt: 1
    - id: robust_plan
      label: "State that impact is the leading case and preparation should intensify."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 1, max: 8}
  robust: robust_plan
  question: "Submit the minimum and maximum probability in percent and one statement that survives every test."
```

**Correct result:** State that impact is the leading case and preparation should intensify.

**Answer text:** Every justified run remains above 50%, but none removes location uncertainty.

**Why:** Stress testing separates a stable decision from unstable precision.

**Wrong-path feedback:** Do not promote a robust majority into certainty or a fixed impact point.

**State/output:** 63% CONDITIONAL UPDATE released.

## Mission outcome

Mission decision: Report a 63% chance of impact. Treat impact as the lead case for plans. Keep the miss paths and the wide land band in view.

**Pre-card character beat:** Malik circles the 37% miss set before handing Mira the update. “Those paths are still evidence,” he says.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Impressive work under pressure. The team can now act on a firm conclusion: Report a 63% chance of impact. Your result gives decision makers time to act without sounding a false alarm.

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Malik circles the 37% miss set before handing Mira the update. “Those paths are still evidence,” he says.



**Automatic change:** IMPACT SOLUTION +8 | OBSERVING RESERVE -4.

**Canonical QA allocation:** 10 RP; Response +3, Reserve +3, Trust +4 -> bars 98 / 72 / 71 / 71.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Orbit Narrows. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Orbit Narrows, four radar products are ready, but two inherit the same archive-clock correction and cannot count as independent confirmation. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which conclusion correctly applies Data fusion to the observations and physics?

**Options - exact player copy:**

- A. Linked uncertainty between fitted quantities or measurements.
- B. Combining complementary measurements in one model.
- C. An imagined target plane used to describe a close planetary encounter.
- D. Evidence that does not share the same likely source of error.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Data fusion; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Covariance, not Data fusion. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. combining complementary measurements in one model.
- C: This describes B-plane, not Data fusion. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Independent evidence, not Data fusion. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Orbit Narrows: four radar products are ready, but two inherit the same archive-clock correction and cannot count as independent confirmation. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which conclusion correctly applies Covariance to the observations and physics?

**Options - exact player copy:**

- A. Combining complementary measurements in one model.
- B. An imagined target plane used to describe a close planetary encounter.
- C. Linked uncertainty between fitted quantities or measurements.
- D. Evidence that does not share the same likely source of error.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Covariance; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Data fusion, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes B-plane, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. linked uncertainty between fitted quantities or measurements.
- D: This describes Independent evidence, not Covariance. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Orbit Narrows using new evidence: the combined trials form a narrow cloud crossing Earth's b-plane disk; 63 percent intersect the disk. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies B-plane to the observations and physics?

**Options - exact player copy:**

- A. Combining complementary measurements in one model.
- B. Linked uncertainty between fitted quantities or measurements.
- C. Evidence that does not share the same likely source of error.
- D. An imagined target plane used to describe a close planetary encounter.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for B-plane; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Data fusion, not B-plane. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Covariance, not B-plane. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Independent evidence, not B-plane. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. an imagined target plane used to describe a close planetary encounter.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Orbit Narrows: four radar products are ready, but two inherit the same archive-clock correction and cannot count as independent confirmation. Build the causal path now so the crew knows which step changes the material or signal before it reaches the next location. Which conclusion correctly applies Independent evidence to the observations and physics?

**Options - exact player copy:**

- A. Evidence that does not share the same likely source of error.
- B. Combining complementary measurements in one model.
- C. Linked uncertainty between fitted quantities or measurements.
- D. An imagined target plane used to describe a close planetary encounter.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Independent evidence; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. evidence that does not share the same likely source of error.
- B: This describes Data fusion, not Independent evidence. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Covariance, not Independent evidence. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes B-plane, not Independent evidence. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Orbit Narrows decision, the team knows this: the radar range has tiny uncertainty, while optical positions provide the longer time baseline and transverse motion. Which conclusion correctly applies weighted fit to the observations and physics?

**Options - exact player copy:**

- A. Combining complementary measurements in one model.
- B. BALANCE trades influence according to information content and dependence.
- C. Linked uncertainty between fitted quantities or measurements.
- D. An imagined target plane used to describe a close planetary encounter.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for weighted fit; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Data fusion, not weighted fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. bALANCE trades influence according to information content and dependence.
- C: This describes Covariance, not weighted fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes B-plane, not weighted fit. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Orbit Narrows to this follow-up: the combined trials form a narrow cloud crossing Earth's b-plane disk; 63 percent intersect the disk. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies encounter uncertainty to the observations and physics?

**Options - exact player copy:**

- A. Combining complementary measurements in one model.
- B. Linked uncertainty between fitted quantities or measurements.
- C. A probability cloud represents distributed uncertainty, not a single certain track.
- D. An imagined target plane used to describe a close planetary encounter.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for encounter uncertainty; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Data fusion, not encounter uncertainty. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Covariance, not encounter uncertainty. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a probability cloud represents distributed uncertainty, not a single certain track.
- D: This describes B-plane, not encounter uncertainty. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Fuse complementary measurements; track covariance; read an ensemble, not only its nominal point; stress the decision language.

- **Mission takeaway:** Stronger evidence narrows uncertainty without abolishing it.

---

# Mission 9 - Where It Lands

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 6 DAYS

**Card title:** WHERE IT LANDS

**Go now:** Go to Orbit Determination and meet Malik Rowan at the astro-bench, then carry the corridor to the Entry and Consequences Lab.

**Card body:** The possible impact locations now form a long strip across Earth. A strike over ocean, desert, or a city would need different preparations. Estimate the impact energy and damage area, then decide where protective planning is warranted without pretending the exact location is known.

**Objective:** Define where protective planning is justified without drawing a false impact bullseye.

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
  - id: planetary_m09_we01
    title: Mass of a simple sphere
    problem: A uniform sphere has radius 1 m and density 3 kg/m³ in a toy model. Find mass.
    rule: m=ρV=ρ(4πr³/3).
    steps:
    - 'Set up the relationship: m=ρV=ρ(4πr³/3).'
    - m=3(4π×1³/3)=4π kg≈12.6 kg.
    answer: Mass is 4π kg in the stated toy model.
    common_mistake: Density multiplies volume, not projected area.
  - id: planetary_m09_we02
    title: Impact energy scaling
    problem: An object's mass is unchanged and its speed doubles. How does kinetic energy change?
    rule: K=mv²/2.
    steps:
    - 'Set up the relationship: K=mv²/2.'
    - K_new/K_old=(2v)²/v²=4.
    answer: The kinetic energy quadruples.
    common_mistake: Impact energy is not linear in speed.
  - id: planetary_m09_we03
    title: Diameter and mass
    problem: Two spheres have the same density, but one has twice the diameter. Compare masses.
    rule: Mass at fixed density is proportional to diameter cubed.
    steps:
    - 'Set up the relationship: Mass at fixed density is proportional to diameter cubed.'
    - m2/m1=2³=8.
    answer: The larger sphere has eight times the mass.
    common_mistake: A diameter uncertainty can produce a much larger fractional mass uncertainty.
  - id: planetary_m09_we04
    title: Interpret a possible-impact corridor
    problem: A model produces a strip of possible impact locations. Does the centerline identify a guaranteed impact point?
    rule: A corridor represents a spread of supported locations under uncertainty.
    steps:
    - Locations across the strip remain possible within the model.
    - The centerline is a summary of that distribution, not a guarantee about one location.
    answer: Planning should preserve the uncertainty rather than treat the centerline as certain.
    common_mistake: A narrow-looking map symbol can hide substantial uncertainty.
  - id: planetary_m09_we05
    title: Surface impact versus airburst
    problem: Two equal-energy objects enter an atmosphere, but one fragments high above the ground and the other reaches the surface. Must their damage patterns match?
    rule: Energy matters, but the altitude and manner of deposition affect consequences.
    steps:
    - The fragmenting object deposits more energy along an atmospheric path.
    - The surface-reaching object deposits energy differently, including at the ground.
    answer: Equal initial kinetic energy does not imply equal local damage patterns.
    common_mistake: Energy alone cannot determine a unique damage radius without a consequence model.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Impact corridor: the set of possible surface locations allowed by the current orbit uncertainty.

Airburst: atmospheric energy release after an object breaks apart or slows rapidly.

Kinetic energy: energy an object has because of its motion.

Trinitrotoluene equivalent (TNT equivalent): a comparison unit for released energy, not a claim about explosive material.

#### Primer concepts

- Diameter, density, and speed set the approximate energy scale.
- The same energy produces different consequences over ocean, desert, and a populated coast.
- Hazard describes physical effects; risk also includes exposure and vulnerability.

#### Equations first needed today

**Equation:** m = (4/3)πr³ρ

**What it is for:** estimating asteroid mass

**Symbols:** m is mass; r is radius; ρ is density

**Why this campaign needs it:** The consequence model needs mass before it can estimate energy.

**Equation:** kinetic energy (KE) = ½mv²

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

**Dialogue bubbles -** Evelyn Park: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Entry & Consequences Lab waypoint and Stop 34.

**Beat 3 - After Stop 34 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Outcome maps diverge over ocean and land.

**Panel/HUD text:** WHERE IT LANDS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Evelyn Park: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 35.

**Beat 4 - After Stop 35 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan asks what observation can shrink the population under warning.

**Panel/HUD text:** WHERE IT LANDS / DECISION EVIDENCE READY

**Dialogue bubbles -** Evelyn Park: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 36.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** WHERE IT LANDS / MISSION DECISION LOGGED

**Dialogue bubbles -** Evelyn Park: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 13 - kinetic energy; Keystone: mechanics/estimation; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The intensified response now needs an impact-energy scale rather than probability alone.

**Question card story setup - exact player copy:** Use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Estimate mass, kinetic energy, and TNT equivalent closely enough to catch a thousandfold unit mistake.

**Question card story-science connection - exact player copy:** Mass and kinetic energy establish the approximate physical consequence scale that the corridor assessment must consider.

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

**Metadata:** Concept: 14 - atmospheric entry; Keystone: causal systems; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L4; Story role: mechanism.

**Call - exact player copy:** Go to the impact-energy bench, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The energy estimate does not determine how the body deposits that energy during atmospheric entry.

**Question card story setup - exact player copy:** Evelyn separates the simulation into approach, atmospheric loading, fragmentation or survival, energy deposition, and surface effects. Place the stages in causal order, then identify which uncertain property most directly controls breakup altitude.

**Question card story-science connection - exact player copy:** The entry sequence identifies where material strength and structure influence breakup and subsequent surface effects.

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

**Metadata:** Concept: 30 - consequence mapping; Keystone: systems/interpretation; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the corridor risk display, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The entry model must be applied to different environments along the possible impact corridor.

**Question card story setup - exact player copy:** Probe four corridor stations: deep ocean, continental shelf, remote desert, and a dense coast. Compare blast, heat, waves, and evacuation exposure without assigning one casualty count to the full corridor.

**Question card story-science connection - exact player copy:** Segment-specific effects and exposure determine why ocean, desert, shelf, and populated coast require different protective planning.

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

**§7 authored-board source - PROBE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 35 - Compare corridor consequences"
  format: "PROBE"
  source: "Handback 5 canonical interaction block"
  question: "Submit one mapping from each of the four corridor stations to its dominant planning concern; do not submit one corridor-wide casualty number."
  payload: "~~~yaml probe: held_fixed: [diameter, density, speed, entry angle] points: - id: deep_ocean load: \"Same impactor over deep ocean; compare water-wave generation with direct blast and population exposure.\" reading: {blast: moderate, thermal: low_on_land, wave: regional, exposed_population: low_local} expected: {dominant_planning_concern: coastal_wave_uncertainty} comparison: \"The regional wave reading exceeds the direct local-exposure concern at this station.\" - id: continental_shelf load: \"Same impactor above the continental shelf; compare stronger coastal coupling with offshore exposure.\" reading: {blast: moderate, thermal: low_on_land, wave: high_coastal, exposed_population: moderate} expected: {dominant_planning_concern: coastal_wave_warning} comparison: \"The shallow-water wave reading raises coastal warning needs above the deep-ocean station.\" - id: remote_desert load: \"Same impactor over remote desert; keep the physical energy fixed while exposure changes.\" reading: {blast: high_local, thermal: high_local, wave: none, exposed_population: low} expected: {dominant_planning_concern: blast_and_thermal_with_low_exposure} comparison: \"Physical intensity is high, but low exposed population limits immediate evacuation demand.\" - id: dense_coast load: \"Same impactor over a dense coastal region; compare physical effects with evacuation exposure.\" reading: {blast: high, thermal: high, wave: possible, exposed_population: high} expected: {dominant_planning_concern: combined_effects_and_evacuation_exposure} comparison: \"High exposure makes evacuation capacity part of the dominant planning concern.\" correct_submission: deep_ocean: coastal_wave_uncertainty continental_shelf: coastal_wave_warning remote_desert: blast_and_thermal_with_low_exposure dense_coast: combined_effects_and_evacuation_exposure required_samples: [deep_ocean, continental_shelf, remote_desert, dense_coast] truth: {breaks_one_corridor_wide_risk_model: true} commit_gate: All four corridor stations sampled. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROBE:**

**Handback 5 canonical interaction block - PROBE:**

```yaml
probe:
  stations:
    - {id: deep_ocean, label: "Deep ocean", reading: "regional wave; low local exposure", expected: "coastal-wave uncertainty", unit: "planning concern"}
    - {id: continental_shelf, label: "Continental shelf", reading: "high coastal wave; moderate exposure", expected: "coastal-wave warning", unit: "planning concern"}
    - {id: remote_desert, label: "Remote desert", reading: "high local blast and heat; low exposure", expected: "blast and thermal monitoring", unit: "planning concern"}
    - {id: dense_coast, label: "Dense coast", reading: "blast, heat, possible wave, high exposure", expected: "combined effects and evacuation", unit: "planning concern"}
  target: dense_coast
  quantityAndUnits: "Submit one mapping from each of the four corridor stations to its dominant planning concern; do not submit one corridor-wide casualty number."
  correctConclusion: "Distinguish physical effects and exposed populations by segment."
```

**Correct result:** Distinguish physical effects and exposed populations by segment.

**Answer text:** The asteroid's energy is common, but the risk distribution is geographically conditional.

**Why:** PROBE examines model response across controlled location changes.

**Wrong-path feedback:** A corridor-wide average hides the places where action costs and benefits differ most.

**State/output:** CONDITIONAL CONSEQUENCE MAP appears.

## Stop 36 - Buy the decision-changing measurement

**Format/placement:** VALUE, asked by Evelyn Park beside `deflection-desk`.

**Metadata:** Concept: 18 - value of information; Keystone: decisions/resources; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Evelyn Park, at the intervention desk in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The consequence assessment leaves limited observing time for the uncertainty that most affects tomorrow's action.

**Question card story setup - exact player copy:** Choose the measurement with the largest expected change to tomorrow's protective decision.

**Question card story-science connection - exact player copy:** The selected measurement determines whether the next data can change corridor protection rather than merely refine a settled quantity.

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

**Happy ending card - exact player copy:** That was a careful and clever call. You replaced uncertainty with a defensible result: Start plans for the full path band. The people beneath the risk corridor are safer because the evidence is sharper.

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan studies the conditional map and says, “A corridor is not a city list. Not yet.”



**Automatic change:** IMPACT SOLUTION +5 | RESPONSE READINESS +8 | OBSERVING RESERVE -3 | PUBLIC TRUST -2.

**Canonical QA allocation:** 10 RP; Reserve +3, Trust +2, Solution +5 -> bars 100 / 80 / 74 / 73.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Where It Lands. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Where It Lands, use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Which conclusion correctly applies Impact corridor to the observations and physics?

**Options - exact player copy:**

- A. Atmospheric energy release after an object breaks apart or slows rapidly.
- B. The set of possible surface locations allowed by the current orbit uncertainty.
- C. Energy an object has because of its motion.
- D. A comparison unit for released energy, not a claim about explosive material.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Impact corridor; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Airburst, not Impact corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. the set of possible surface locations allowed by the current orbit uncertainty.
- C: This describes Kinetic energy, not Impact corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Trinitrotoluene equivalent (TNT equivalent), not Impact corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to Where It Lands: use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Which conclusion correctly applies Airburst to the observations and physics?

**Options - exact player copy:**

- A. The set of possible surface locations allowed by the current orbit uncertainty.
- B. Energy an object has because of its motion.
- C. Atmospheric energy release after an object breaks apart or slows rapidly.
- D. A comparison unit for released energy, not a claim about explosive material.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Airburst; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact corridor, not Airburst. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Kinetic energy, not Airburst. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. atmospheric energy release after an object breaks apart or slows rapidly.
- D: This describes Trinitrotoluene equivalent (TNT equivalent), not Airburst. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Where It Lands using new evidence: use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Which conclusion correctly applies Kinetic energy to the observations and physics?

**Options - exact player copy:**

- A. The set of possible surface locations allowed by the current orbit uncertainty.
- B. Atmospheric energy release after an object breaks apart or slows rapidly.
- C. A comparison unit for released energy, not a claim about explosive material.
- D. Energy an object has because of its motion.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Kinetic energy; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact corridor, not Kinetic energy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Airburst, not Kinetic energy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Trinitrotoluene equivalent (TNT equivalent), not Kinetic energy. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. energy an object has because of its motion.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Where It Lands: use diameter 260 meters, density 1,800 kilograms per cubic meter, and impact speed 19 kilometers per second. Which conclusion correctly applies Trinitrotoluene equivalent (TNT equivalent) to the observations and physics?

**Options - exact player copy:**

- A. A comparison unit for released energy, not a claim about explosive material.
- B. The set of possible surface locations allowed by the current orbit uncertainty.
- C. Atmospheric energy release after an object breaks apart or slows rapidly.
- D. Energy an object has because of its motion.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Trinitrotoluene equivalent (TNT equivalent); do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a comparison unit for released energy, not a claim about explosive material.
- B: This describes Impact corridor, not Trinitrotoluene equivalent (TNT equivalent). It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Airburst, not Trinitrotoluene equivalent (TNT equivalent). It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Kinetic energy, not Trinitrotoluene equivalent (TNT equivalent). It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Where It Lands decision, the team knows this: evelyn separates the simulation into approach, atmospheric loading, fragmentation or survival, energy deposition, and surface effects. Which conclusion correctly applies atmospheric entry to the observations and physics?

**Options - exact player copy:**

- A. The set of possible surface locations allowed by the current orbit uncertainty.
- B. SEQUENCE maps upstream physical conditions to downstream consequences.
- C. Atmospheric energy release after an object breaks apart or slows rapidly.
- D. Energy an object has because of its motion.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for atmospheric entry; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact corridor, not atmospheric entry. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. sEQUENCE maps upstream physical conditions to downstream consequences.
- C: This describes Airburst, not atmospheric entry. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Kinetic energy, not atmospheric entry. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from Where It Lands to this follow-up: probe four corridor stations: deep ocean, continental shelf, remote desert, and a dense coast. Sample the locations in order now so the crew can identify where the system first departs from normal. Which conclusion correctly applies consequence mapping to the observations and physics?

**Options - exact player copy:**

- A. The set of possible surface locations allowed by the current orbit uncertainty.
- B. Atmospheric energy release after an object breaks apart or slows rapidly.
- C. PROBE examines model response across controlled location changes.
- D. Energy an object has because of its motion.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for consequence mapping; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Impact corridor, not consequence mapping. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Airburst, not consequence mapping. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. pROBE examines model response across controlled location changes.
- D: This describes Kinetic energy, not consequence mapping. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Mass scales with diameter cubed; energy scales with speed squared; hazard differs from risk; value of information is decision-relative.

- **Mission takeaway:** Estimate the scale, preserve the corridor, and buy the observation that changes action.

---

# Mission 10 - One Object, Two Motions

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 5 DAYS

**Card title:** ONE OBJECT, TWO MOTIONS

**Go now:** Go to the Spectroscopy Dome and meet Sanaa Vale at the photometry bench, then compare her result with radar.

**Card body:** Both telescope and radar measurements disagree with the prediction for a simple, single-body asteroid. Compare possible shapes and the pattern of those disagreements. Decide whether the object is one compact body or two weakly joined parts that could behave differently.

**Objective:** Decide whether the asteroid is one compact body or a weak two-lobed system.

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
  - id: planetary_m10_we01
    title: Read a repeating light curve
    problem: A brightness pattern repeats every 4 hours. What repetition period is measured, and what caution applies to rotation?
    rule: A light curve measures repeated brightness, which may repeat more than once per physical rotation.
    steps:
    - The observed brightness period is 4 h.
    - If the shape gives two similar brightness cycles per rotation, the rotation period could be 8 h.
    answer: The light curve alone may not distinguish 4-hour rotation from a double-peaked 8-hour rotation.
    common_mistake: Do not automatically identify every brightness cycle with one full turn.
  - id: planetary_m10_we02
    title: Explain a repeating model mismatch
    problem: A spherical rotating-body model misses a repeated two-part brightness pattern also seen in an independent imaging measurement. What is a useful next model test?
    rule: Independent observations of the same pattern can motivate a more detailed shape model.
    steps:
    - A two-part shape could predict a pattern the sphere cannot represent.
    - Fit it on existing data, then test its prediction on withheld observations.
    answer: Test the more detailed model; the pattern alone is not proof that it is correct.
    common_mistake: Adding complexity must earn predictive improvement, not just a better description of old data.
  - id: planetary_m10_we03
    title: Diameter and cross section
    problem: One sphere has twice another's diameter. Compare projected areas.
    rule: Projected area A=πD²/4.
    steps:
    - 'Set up the relationship: Projected area A=πD²/4.'
    - A2/A1=(D2/D1)²=2²=4.
    answer: The larger sphere has four times the projected area.
    common_mistake: Area scales as diameter squared, not cubed.
  - id: planetary_m10_we04
    title: Recognize a systematic miss
    problem: A model has residuals +2,+2,+2,+2 units at four inputs. Another has -1,+1,-1,+1. What does the first pattern suggest?
    rule: Residuals are observations minus predictions; a repeated offset can indicate bias.
    steps:
    - first mean residual = (2+2+2+2)/4 = +2 units. Every prediction is low.
    - second mean residual = (-1+1-1+1)/4 = 0 units. Its signed errors cancel, though errors remain.
    answer: The first model shows a consistent underprediction that should be investigated.
    common_mistake: A zero mean residual does not by itself prove a model is accurate or free of pattern.
  - id: planetary_m10_we05
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

**Dialogue bubbles -** Sanaa Vale: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 38.

**Beat 3 - After Stop 38 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Radar frames show two delay concentrations moving together.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Sanaa Vale: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 39.

**Beat 4 - After Stop 39 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The team names the minimum shared explanation: a weak contact binary.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / DECISION EVIDENCE READY

**Dialogue bubbles -** Sanaa Vale: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 40.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** ONE OBJECT, TWO MOTIONS / MISSION DECISION LOGGED

**Dialogue bubbles -** Sanaa Vale: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 4 - light-curve model; Keystone: evidence/model failure; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L5; Story role: diagnosis.

**Call - exact player copy:** Go to the rotation photometry bench, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The new light-curve residuals contain a repeating pattern that the current simple body model does not explain.

**Question card story setup - exact player copy:** Identify the pattern that random measurement noise is least likely to produce.

**Question card story-science connection - exact player copy:** The alternating residuals determine whether random noise remains credible or more complex asteroid structure needs testing.

**Question card prompt - exact player copy:** Classify the residual pattern and state what it demands. Use ordered observation coordinates 1–5 on the residual axis.

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

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 37 - See the alternating residual"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Classify the residual pattern and state what it demands."
  payload: "~~~yaml residual: fields: - {cycle: 1, phase_signs: [positive, negative, positive, negative]} - {cycle: 2, phase_signs: [positive, negative, positive, negative]} - {cycle: 3, phase_signs: [positive, negative, positive, negative]} - {cycle: 4, phase_signs: [positive, negative, positive, negative]} expected_noise_pattern: uncorrelated_signs correct_classification: systematic_phase_locked_residual required_model_action: test_more_complex_shape_or_reflectance ~~~"
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
  correctConclusion: "Reject pure random noise; test a more complex body model."
```

**Correct result:** Reject pure random noise; test a more complex body model.

**Answer text:** Repetition at the same rotational phases points to missing structure.

**Why:** RESIDUAL compares leftover patterns to the noise behavior assumed by the model.

**Wrong-path feedback:** Random errors should not reproduce the same sign sequence every rotation.

**State/output:** SINGLE ELLIPSOID INADEQUATE.

## Stop 38 - Separate shape from surface

**Format/placement:** DEGENERACY, at `sizing-board`.

**Metadata:** Concept: 3 - inverse problems; Keystone: uncertainty/model selection; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L5; Story role: model.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The repeating brightness pattern could reflect shape, surface markings, or viewing geometry.

**Question card story setup - exact player copy:** Unequal peaks can arise from a two-lobed shape, patchy albedo, or a changed viewing geometry. Match each explanation to the additional observation that would most cleanly separate it from the others.

**Question card story-science connection - exact player copy:** The additional constraints determine whether unequal peaks arise mainly from body shape or reflectivity variations.

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

**§7 authored-board source - DEGENERACY:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 38 - Separate shape from surface"
  format: "DEGENERACY"
  source: "Handback 5 canonical interaction block"
  question: "Submit the numerical pair (q, A) that satisfies both named controls, then select SHAPE-DOMINATED or ALBEDO-DOMINATED."
  payload: "~~~yaml degeneracy: controls: - {id: shape_ratio_q, label: \"Long-to-short shape ratio\", min: 1.00, max: 2.00, step: 0.05} - {id: albedo_ratio_A, label: \"Bright-to-dark albedo ratio\", min: 0.70, max: 1.40, step: 0.05} held_fixed: [rotation period, viewing geometry, mean brightness, filter] constraint_1: {source: radar, q: 1.65, tolerance: 0.10} constraint_2: {source: color modulation, A: 1.00, tolerance: 0.05} truth_pair: [1.65, 1.00] interpretation: shape_dominated ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - DEGENERACY:**

**Handback 5 canonical interaction block - DEGENERACY:**

```yaml
degeneracy:
  controlA: {id: shape_ratio_q, label: "Long-to-short shape ratio", min: 1.00, max: 2.00, step: 0.05, tolerance: 0.10}
  controlB: {id: albedo_ratio_A, label: "Bright-to-dark albedo ratio", min: 0.70, max: 1.40, step: 0.05, tolerance: 0.05}
  firstLocus: [{x: 1.00, y: 1.35}, {x: 1.20, y: 1.25}, {x: 1.40, y: 1.15}, {x: 1.65, y: 1.00}, {x: 1.80, y: 0.95}]
  secondLocus: [{x: 1.55, y: 0.95}, {x: 1.65, y: 1.00}, {x: 1.75, y: 1.05}]
  secondMeasurement: {label: "Radar shape ratio and color modulation"}
  truth: {x: 1.65, y: 1.00}
  correctResult: "q = 1.65 and A = 1.00; SHAPE-DOMINATED."
```

**Correct result:** q = 1.65 and A = 1.00; SHAPE-DOMINATED.

**Answer text:** The light curve motivates hypotheses but cannot uniquely choose among them.

**Why:** DEGENERACY pairs look-alike models with observations where their predictions diverge.

**Wrong-path feedback:** A better photometric fit is not unique physical identification.

**State/output:** RADAR DISCRIMINATOR selected; travel unlocks.

## Stop 39 - Sweep the radar frames

**Format/placement:** SWEEP, at `radar-console`.

**Metadata:** Concept: 10 - delay-Doppler structure; Keystone: observation/controls; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The shape evidence makes the previously unresolved radar shoulder worth following through rotation.

**Question card story setup - exact player copy:** Mark features that persist at connected delay-Doppler positions as the body rotates.

**Question card story-science connection - exact player copy:** Persistence through connected radar positions determines whether the shoulder is physical target structure rather than an isolated artifact.

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

**§7 authored-board source - SWEEP:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 39 - Sweep the radar frames"
  format: "SWEEP"
  source: "Handback 5 canonical interaction block"
  question: "Sweep the frames and classify the shoulder."
  payload: "~~~yaml sweep: control: {label: calibrated radar frame, values: [1, 2, 3, 4, 5, 6, 7, 8]} readings: shoulder_present: [true, true, true, false, true, true, true, true] coherent_with_primary_rotation: [true, true, true, null, true, true, true, true] stationary_calibration_artifact: [false, false, false, false, false, false, false, false] goal: persistent motion connected to the primary in at least 6 of 8 frames correct_setting: all_eight_frames correct_interpretation: physical_secondary_structure ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - SWEEP:**

**Handback 5 canonical interaction block - SWEEP:**

```yaml
sweep:
  axis: {label: "calibrated radar frame", min: 1, max: 8, step: 1, unit: frame}
  start: 2
  target: 6
  tolerance: 0.5
  response: {label: "cumulative coherent shoulder detections", unit: "frames"}
  series:
    - {at: 1, value: 1}
    - {at: 2, value: 2}
    - {at: 3, value: 3}
    - {at: 4, value: 3}
    - {at: 5, value: 4}
    - {at: 6, value: 5}
    - {at: 7, value: 6}
    - {at: 8, value: 7}
  readings:
    shoulderPresent: [true, true, true, false, true, true, true, true]
    coherentWithPrimaryRotation: [true, true, true, null, true, true, true, true]
  passRule: "connected delay-Doppler motion in at least 6 of 8 frames"
  correctResult: "Classify the shoulder as physical secondary structure associated with the target."
```

**Correct result:** Classify the shoulder as physical secondary structure associated with the target.

**Answer text:** Its persistence and coherent motion make ordinary interference unlikely.

**Why:** SWEEP searches a controlled series for persistence and coordinated change.

**Wrong-path feedback:** One bright frame is weak evidence; seven coherently moving frames are not.

**State/output:** TWO-LOBE MODEL favored.

## Stop 40 - Diagnose the minimum model

**Format/placement:** DIAGNOSIS, at `echo-archive`.

**Metadata:** Concept: 4 - contact binary; Keystone: synthesis/modeling; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The optical and radar structure evidence now needs the least speculative shared interpretation.

**Question card story setup - exact player copy:** Diagnose the minimum shared model and state the new operational concern it raises.

**Question card story-science connection - exact player copy:** The body diagnosis determines whether separation should be monitored without inventing an already established fragment orbit.

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

**Happy ending card - exact player copy:** You gave the team the breakthrough it needed. The mission now has its answer: Treat 2026 PDC as a weak two-lobed body. The planetary-defense plan now rests on a result the whole network can trust.

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Sanaa points to the old weak shoulder. “It was never noise,” she says. Tomás answers, “It still is not a fragment.”



**Automatic change:** IMPACT SOLUTION -10 | OBSERVING RESERVE -4 | PUBLIC TRUST -6.

**Canonical QA allocation:** 10 RP; Reserve +4, Trust +6 -> bars 90 / 80 / 74 / 73.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed One Object, Two Motions. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to One Object, Two Motions, the two-lobe model explains alternating optical residuals and coherent radar structure, while a surface patch explains only photometry. Which conclusion correctly applies Contact binary to the observations and physics?

**Options - exact player copy:**

- A. A record of brightness changing with time.
- B. Two lobes touching or nearly touching.
- C. A radar map organized by range and line-of-sight speed.
- D. The observed value minus the model prediction.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Contact binary; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Light curve, not Contact binary. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. two lobes touching or nearly touching.
- C: This describes Delay-Doppler image, not Contact binary. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Model residual, not Contact binary. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to One Object, Two Motions: a single rotating ellipsoid matches the period, but its residuals alternate positive and negative at the same phases for four cycles. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Rotation phase",
  "yLabel": "Relative brightness",
  "caption": "A repeating light curve with unequal maxima.",
  "series": [
    {
      "name": "Brightness",
      "points": [
        [
          0,
          1.0
        ],
        [
          0.125,
          0.82
        ],
        [
          0.25,
          1.08
        ],
        [
          0.375,
          0.78
        ],
        [
          0.5,
          1.0
        ],
        [
          0.625,
          0.82
        ],
        [
          0.75,
          1.08
        ],
        [
          0.875,
          0.78
        ],
        [
          1,
          1.0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Two lobes touching or nearly touching.
- B. A radar map organized by range and line-of-sight speed.
- C. A record of brightness changing with time.
- D. The observed value minus the model prediction.

**Correct answer:** C

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Contact binary, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Delay-Doppler image, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a record of brightness changing with time.
- D: This describes Model residual, not Light curve. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks One Object, Two Motions using new evidence: a single rotating ellipsoid matches the period, but its residuals alternate positive and negative at the same phases for four cycles. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "peaks",
  "xLabel": "Wavelength (nm)",
  "yLabel": "Relative intensity",
  "caption": "The measured spectral peak is shifted from the reference peak.",
  "series": [
    {
      "name": "Reference",
      "points": [
        [
          500,
          1.0
        ]
      ]
    },
    {
      "name": "Measured",
      "points": [
        [
          504,
          0.9
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Two lobes touching or nearly touching.
- B. A record of brightness changing with time.
- C. The observed value minus the model prediction.
- D. A radar map organized by range and line-of-sight speed.

**Correct answer:** D

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Contact binary, not Delay-Doppler image. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Light curve, not Delay-Doppler image. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Model residual, not Delay-Doppler image. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a radar map organized by range and line-of-sight speed.
### Review question 4

**Prompt - exact player copy:** An unseen case extends One Object, Two Motions: a single rotating ellipsoid matches the period, but its residuals alternate positive and negative at the same phases for four cycles. Which interpretation of the displayed evidence correctly uses the mission concept?

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
          2.2
        ],
        [
          1,
          0.8
        ],
        [
          2,
          -0.6
        ],
        [
          3,
          -1.4
        ],
        [
          4,
          -0.5
        ],
        [
          5,
          0.9
        ],
        [
          6,
          2.1
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

- A. The observed value minus the model prediction.
- B. Two lobes touching or nearly touching.
- C. A record of brightness changing with time.
- D. A radar map organized by range and line-of-sight speed.

**Correct answer:** A

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: Correct. the observed value minus the model prediction.
- B: This describes Contact binary, not Model residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Light curve, not Model residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Delay-Doppler image, not Model residual. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another One Object, Two Motions decision, the team knows this: a single rotating ellipsoid matches the period, but its residuals alternate positive and negative at the same phases for four cycles. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Rotation phase",
  "yLabel": "Relative brightness",
  "caption": "A repeating light curve with unequal maxima.",
  "series": [
    {
      "name": "Brightness",
      "points": [
        [
          0,
          1.0
        ],
        [
          0.125,
          0.82
        ],
        [
          0.25,
          1.08
        ],
        [
          0.375,
          0.78
        ],
        [
          0.5,
          1.0
        ],
        [
          0.625,
          0.82
        ],
        [
          0.75,
          1.08
        ],
        [
          0.875,
          0.78
        ],
        [
          1,
          1.0
        ]
      ]
    }
  ]
}
```


**Options - exact player copy:**

- A. Two lobes touching or nearly touching.
- B. RESIDUAL compares leftover patterns to the noise behavior assumed by the model.
- C. A record of brightness changing with time.
- D. A radar map organized by range and line-of-sight speed.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Contact binary, not light-curve model. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. rESIDUAL compares leftover patterns to the noise behavior assumed by the model.
- C: This describes Light curve, not light-curve model. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Delay-Doppler image, not light-curve model. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from One Object, Two Motions to this follow-up: unequal peaks can arise from a two-lobed shape, patchy albedo, or a changed viewing geometry. Add the missing constraint now so the team can separate the explanations that still fit the earlier evidence. Which conclusion correctly applies inverse problems to the observations and physics?

**Options - exact player copy:**

- A. Two lobes touching or nearly touching.
- B. A record of brightness changing with time.
- C. DEGENERACY pairs look-alike models with observations where their predictions diverge.
- D. A radar map organized by range and line-of-sight speed.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for inverse problems; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Contact binary, not inverse problems. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Light curve, not inverse problems. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. dEGENERACY pairs look-alike models with observations where their predictions diverge.
- D: This describes Delay-Doppler image, not inverse problems. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Phase-locked residuals are systematic; degeneracies need discriminating evidence; coherent radar motion supports structure; diagnosis should remain minimal.

- **Mission takeaway:** When independent residuals agree, revise the model - and no further.

---

# Mission 11 - One Push

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 4 DAYS

**Card title:** ONE PUSH

**Go now:** Go to the Spectroscopy Dome for the mass estimate, continue to the Consequences Lab, and deliver the feasibility result to Mira Chen at Coordination.

**Card body:** A spacecraft collision might push the asteroid off course, but very little time remains for that push to make a difference. Calculate the needed change and compare it with what a spacecraft could deliver. Decide whether to attempt a push or concentrate on protecting people.

**Objective:** Decide whether space deflection is physically credible with the remaining warning time.

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
  - id: planetary_m11_we01
    title: A small velocity change over time
    problem: In a straight-line approximation, a sideways speed change Δv=0.01 m/s persists for 10000 s. Find displacement.
    rule: Δx≈Δv×t for constant transverse velocity change.
    steps:
    - 'Set up the relationship: Δx≈Δv×t for constant transverse velocity change.'
    - Δx=0.01(10000)=100 m.
    answer: The modeled transverse displacement is 100 m.
    common_mistake: This approximation omits full orbital dynamics and should not be treated as an exact orbit solution.
  - id: planetary_m11_we02
    title: Impulse and velocity change
    problem: An object has mass 1000 kg. A net impulse of 100 N s acts along one direction. Find velocity change.
    rule: J=mΔv.
    steps:
    - 'Set up the relationship: J=mΔv.'
    - Δv=J/m=100/1000=0.1 m/s.
    answer: The velocity changes by 0.1 m/s in the impulse direction.
    common_mistake: Divide impulse by mass, not multiply it.
  - id: planetary_m11_we03
    title: A specified momentum enhancement
    problem: An incoming projectile carries momentum 20 N s. A toy collision model has enhancement factor β=2. Find delivered impulse.
    rule: J=β p_projectile for the specified model and direction.
    steps:
    - 'Set up the relationship: J=β p_projectile for the specified model and direction.'
    - J=2(20)=40 N s.
    answer: The modeled delivered impulse is 40 N s.
    common_mistake: The enhancement factor must be supplied or supported by evidence; it is not universal.
  - id: planetary_m11_we04
    title: Compare lead times
    problem: For the same desired 100 m displacement, compare constant transverse speed changes over 1000 s and 10000 s.
    rule: Required Δv=desired displacement/lead time.
    steps:
    - 'Set up the relationship: Required Δv=desired displacement/lead time.'
    - short-time Δv=100/1000=0.1 m/s; long-time Δv=100/10000=0.01 m/s.
    answer: Ten times more lead time reduces the required change by ten in this approximation.
    common_mistake: Late action needs a larger change for the same accumulated displacement.
  - id: planetary_m11_we05
    title: Mass of a simple sphere
    problem: A uniform sphere has radius 1 m and density 3 kg/m³ in a toy model. Find mass.
    rule: m=ρV=ρ(4πr³/3).
    steps:
    - 'Set up the relationship: m=ρV=ρ(4πr³/3).'
    - m=3(4π×1³/3)=4π kg≈12.6 kg.
    answer: Mass is 4π kg in the stated toy model.
    common_mistake: Density multiplies volume, not projected area.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**Dialogue bubbles -** Arjun Sen: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Entry & Consequences Lab waypoint and Stop 42.

**Beat 3 - After Stop 42 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Arjun offers the strongest launch-ready impactor in the fiction.

**Panel/HUD text:** THE ONE PUSH / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Arjun Sen: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 43.

**Beat 4 - After Stop 43 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira asks for a go/no-go based on orders of magnitude.

**Panel/HUD text:** THE ONE PUSH / DECISION EVIDENCE READY

**Dialogue bubbles -** Arjun Sen: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Coordination Office waypoint and Stop 44.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE ONE PUSH / MISSION DECISION LOGGED

**Dialogue bubbles -** Arjun Sen: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 3 - mass range; Keystone: estimation/uncertainty; Area: Spectroscopy Dome; Learning role: REINFORCE; Difficulty: L4; Story role: calculation.

**Call - exact player copy:** Go to the physical-sizing board, in the Spectroscopy Dome.

**Stop reason - exact player copy:** The complex body model leaves a mass range that intervention calculations must preserve.

**Question card story setup - exact player copy:** Use the 260-meter diameter and plausible rubble-pile densities from 1,200 to 2,400 kilograms per cubic meter in the campaign model. Estimate a mass range and preserve it through the intervention calculation.

**Question card story-science connection - exact player copy:** The density-dependent mass interval establishes the range of momentum demand a proposed deflection must meet.

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

**§7 build completion - BALLPARK:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
estimate:
  target: 1.1
  tolerance: 0.05500000000000001
  unit: "units printed on the card"
  tiles: [{label: "displayed numerator", value: 2.2}, {label: "displayed divisor", value: 2}]
  formula: "m=displayed numerator/displayed divisor"
  correctResultText: "Roughly (1.1\\times10^{10}) to (2.2\\times10^{10}) kg."
```

**Handback 9 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "lower asteroid mass bound"
  unit: "kg"
  inputs:
    - {label: "Asteroid radius", value: 130, unit: "m"}
    - {label: "Low rubble-pile density", value: 1200, unit: "kg/m³"}
    - {label: "High rubble-pile density", value: 2400, unit: "kg/m³", contextOnly: true}
  operation: "calculate spherical volume and multiply by the low density; the high bound is twice the result because the high density is twice the low density"
  formula: "m=(4/3)pi(130^3)(1200)"
  correctResult: 11040000000
  tolerance: 880000000
  answerText: "The lower bound is about 1.1×10^10 kg; doubling for the high density gives about 2.2×10^10 kg."
```

**Correct result:** Roughly (1.1\times10^{10}) to (2.2\times10^{10}) kg.

**Answer text:** The intervention test must succeed across this range, not only at the lightest convenient value.

**Why:** BALLPARK carries parameter uncertainty into feasibility bounds.

**Wrong-path feedback:** Density multiplies volume; it cannot be omitted from momentum demand.

**State/output:** MASS ENVELOPE transferred to IMPACT.

## Stop 42 - Derive the required impulse

**Format/placement:** DERIVE, at `deflection-desk`.

**Metadata:** Concept: 15 - impulse requirement; Keystone: mechanics/derivation; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: calculation.

**Call - exact player copy:** Go to the intervention desk, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The remaining warning time must be translated into the velocity change needed to avoid the encounter.

**Question card story setup - exact player copy:** Grant the defender eight days of useful lead time and require 6,400 kilometers of accumulated displacement. Derive the velocity change and nominal impulse, treating the straight-line estimate as deliberately optimistic.

**Question card story-science connection - exact player copy:** The optimistic displacement and impulse requirement provides a lower-demand benchmark for evaluating the proposed defender.

**Question card prompt - exact player copy:** Submit Δv in metres per second and J in newton-seconds.

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

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Δv=Δx t`
2. `Δv=(6.4×10^6 m)(691200 s)`
3. `J=Δv/m`
4. `J=(9.26 m/s)/(1.66×10^10 kg)`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Displacement d = 6400 km = 6.4e6 m", "Lead time t = 8 days; 1 day = 86400 s", "Adopted asteroid mass m = 1.66e10 kg", "Delta v = d/t; J = m Delta v"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the required impulse in the form and units requested by the prompt"
  left_side: "J"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Δv = Δx/t", correct: true}
        - {text: "Δv=Δx t", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Δv = (6.4 × 10^6 m)/(691200 s) = 9.26 m/s", correct: true}
        - {text: "Δv = (6.4 × 10^6 m)(691200 s) = 4.42 × 10^12 m*s", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "J = mΔv", correct: true}
        - {text: "J=Δv/m", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "J = (1.66 × 10^10 kg)(9.26 m/s) = 1.54 × 10^11 N·s", correct: true}
        - {text: "J = (9.26 m/s)/(1.66 × 10^10 kg) = 5.58 × 10^-10 m/(kg*s)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** About 9.3 m/s and (1.5\times10^{11}) N·s.

**Answer text:** Even the simplified lower bound is enormous for a launch-ready response.

**Why:** DERIVE builds the requirement from displacement, time, and momentum definitions.

**Wrong-path feedback:** Eight days is seconds, and 6,400 kilometers is meters before division.

**State/output:** REQUIRED IMPULSE posted.

## Stop 43 - Stress the kinetic impactor

**Format/placement:** STRESS, asked by Arjun Sen beside `deflection-desk`.

**Metadata:** Concept: 15 - kinetic impactor; Keystone: feasibility/assumptions; Area: Entry & Consequences Lab; Learning role: INTRODUCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Talk to Arjun Sen, at the intervention desk in the Entry & Consequences Lab.

**Stop reason - exact player copy:** The required impulse is known, allowing the proposed impactor to face uncertain mass and momentum enhancement.

**Question card story setup - exact player copy:** Arjun offers a 1,000-kilogram impactor at 10 kilometers per second and grants an optimistic momentum enhancement of three. Compare delivered impulse with demand across the asteroid mass range and weaker enhancement.

**Question card story-science connection - exact player copy:** The delivered-to-required impulse comparison determines whether kinetic deflection is physically useful within the remaining time.

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

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 43 - Stress the kinetic impactor"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Submit delivered impulse in newton-seconds, the minimum shortfall factor, and one conclusion: FEASIBLE or INFEASIBLE."
  payload: "~~~yaml stress: equation: Jdeliver = β mi vi inputs: {impactor_mass_kg: 1000, impact_speed_m_per_s: 10000, beta: 3} settings: - {beta: 1, delivered_impulse_Ns: 1.0e7, minimum_shortfall_factor: 10000} - {beta: 2, delivered_impulse_Ns: 2.0e7, minimum_shortfall_factor: 5000} - {beta: 3, delivered_impulse_Ns: 3.0e7, minimum_shortfall_factor: 3333} delivered_impulse_Ns: 3.0e7 required_impulse_Ns: [1.0e11, 2.0e11] minimum_shortfall_factor: 3333 correct_conclusion: infeasible ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "delivered impulse", min: 1000000.0, max: 5000000.0, nominal: 3000000.0, step: 1000000.0, unit: "N·s"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 3000000.0, max: 3000000.0}
      failsAt: 5000000.0
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 3000000.0, max: 5000000.0}
      failsAt: 1000000.0
    - id: robust_plan
      label: "Infeasible by more than three orders of magnitude, even before navigation and launch delays."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 1000000.0, max: 5000000.0}
  robust: robust_plan
  question: "Submit delivered impulse in newton-seconds, the minimum shortfall factor, and one conclusion: FEASIBLE or INFEASIBLE."
```

**Correct result:** Infeasible by more than three orders of magnitude, even before navigation and launch delays.

**Answer text:** The proposed impactor supplies at most about one five-thousandth of nominal demand.

**Why:** STRESS compares best-case capacity with worst-relevant requirements.

**Wrong-path feedback:** A successful earlier kinetic-impact demonstration does not erase this object's mass and deadline.

**State/output:** KINETIC DEFLECTION NO-GO.

## Stop 44 - Choose the useful action

**Format/placement:** VALUE, asked by Arjun Sen beside `scopeboard`.

**Metadata:** Concept: 15 - response portfolio; Keystone: decisions/value; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Arjun Sen, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** The intervention gap leaves the last budget needing an achievable harm-reduction objective.

**Question card story setup - exact player copy:** The last budget can fund a symbolic impactor, corridor observations, civil-defense preparation, or a public demonstration. Rank all four by expected harm reduction under the verified warning time and intervention gap.

**Question card story-science connection - exact player copy:** The ranked uses determine whether money supports useful corridor observations and protection instead of an ineffective symbolic launch.

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

**Happy ending card - exact player copy:** Brilliant analysis. You found the result the team needed: Do not try to push the body now. The response team can protect threatened communities with better information.

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Arjun closes the launch window himself. “With years, this is a mission,” he says. “With days, it is theater.”



**Automatic change:** RESPONSE READINESS +8 | OBSERVING RESERVE -2.

**Canonical QA allocation:** 10 RP; Reserve +4, Trust +4, Solution +2 -> bars 90 / 88 / 78 / 77.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed One Push. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to One Push, use the 260-meter diameter and plausible rubble-pile densities from 1,200 to 2,400 kilograms per cubic meter in the campaign model. Which conclusion correctly applies Deflection to the observations and physics?

**Options - exact player copy:**

- A. Breaking an object into pieces rather than moving it intact.
- B. Changing an object’s motion before it reaches Earth.
- C. The change in momentum delivered to an object.
- D. Extra impulse from impact ejecta, represented by the factor beta.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Deflection; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Disruption, not Deflection. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. changing an object’s motion before it reaches Earth.
- C: This describes Impulse, not Deflection. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Momentum enhancement, not Deflection. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to One Push: use the 260-meter diameter and plausible rubble-pile densities from 1,200 to 2,400 kilograms per cubic meter in the campaign model. Which conclusion correctly applies Disruption to the observations and physics?

**Options - exact player copy:**

- A. Changing an object’s motion before it reaches Earth.
- B. The change in momentum delivered to an object.
- C. Breaking an object into pieces rather than moving it intact.
- D. Extra impulse from impact ejecta, represented by the factor beta.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Disruption; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Deflection, not Disruption. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Impulse, not Disruption. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. breaking an object into pieces rather than moving it intact.
- D: This describes Momentum enhancement, not Disruption. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks One Push using new evidence: grant the defender eight days of useful lead time and require 6,400 kilometers of accumulated displacement. Which conclusion correctly applies Impulse to the observations and physics?

**Options - exact player copy:**

- A. Changing an object’s motion before it reaches Earth.
- B. Breaking an object into pieces rather than moving it intact.
- C. Extra impulse from impact ejecta, represented by the factor beta.
- D. The change in momentum delivered to an object.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Impulse; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Deflection, not Impulse. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Disruption, not Impulse. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Momentum enhancement, not Impulse. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. the change in momentum delivered to an object.
### Review question 4

**Prompt - exact player copy:** An unseen case extends One Push: arjun offers a 1,000-kilogram impactor at 10 kilometers per second and grants an optimistic momentum enhancement of three. Test the conclusion across the supported uncertainty range now, before the team treats it as robust. Which conclusion correctly applies Momentum enhancement to the observations and physics?

**Options - exact player copy:**

- A. Extra impulse from impact ejecta, represented by the factor beta.
- B. Changing an object’s motion before it reaches Earth.
- C. Breaking an object into pieces rather than moving it intact.
- D. The change in momentum delivered to an object.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Momentum enhancement; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. extra impulse from impact ejecta, represented by the factor beta.
- B: This describes Deflection, not Momentum enhancement. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Disruption, not Momentum enhancement. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Impulse, not Momentum enhancement. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another One Push decision, the team knows this: use the 260-meter diameter and plausible rubble-pile densities from 1,200 to 2,400 kilograms per cubic meter in the campaign model. Which conclusion correctly applies mass range to the observations and physics?

**Options - exact player copy:**

- A. Changing an object’s motion before it reaches Earth.
- B. BALLPARK carries parameter uncertainty into feasibility bounds.
- C. Breaking an object into pieces rather than moving it intact.
- D. The change in momentum delivered to an object.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for mass range; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Deflection, not mass range. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. bALLPARK carries parameter uncertainty into feasibility bounds.
- C: This describes Disruption, not mass range. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Impulse, not mass range. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from One Push to this follow-up: grant the defender eight days of useful lead time and require 6,400 kilometers of accumulated displacement. Which conclusion correctly applies impulse requirement to the observations and physics?

**Options - exact player copy:**

- A. Changing an object’s motion before it reaches Earth.
- B. Breaking an object into pieces rather than moving it intact.
- C. DERIVE builds the requirement from displacement, time, and momentum definitions.
- D. The change in momentum delivered to an object.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for impulse requirement; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Deflection, not impulse requirement. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Disruption, not impulse requirement. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. dERIVE builds the requirement from displacement, time, and momentum definitions.
- D: This describes Impulse, not impulse requirement. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Deflection leverage grows with lead time; impulse equals mass times velocity change; best-case supply must meet lower-bound demand; opportunity cost matters.

- **Mission takeaway:** The scientifically brave answer can be no.

---

# Mission 12 - The Line We Promise

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 3 DAYS

**Card title:** THE LINE WE PROMISE

**Go now:** Go to the Consequences Lab, carry the response envelope to the Town Emergency Office, and publish the final rules from Coordination.

**Card body:** Evacuations and other emergency actions cost time and resources, but waiting too long can cost lives. Agree on which evidence should trigger each protective step before the next forecast arrives. Allocate the available resources and rehearse a plan that treats threatened communities consistently.

**Objective:** Approve a staged response plan before the next orbit result is known.

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
  - id: planetary_m12_we01
    title: Probability and expected loss
    problem: Two hypothetical events have probabilities 0.1 and 0.01 and losses 100 and 2000 units. Compare expected losses.
    rule: Expected loss=probability×loss in this two-outcome model.
    steps:
    - 'Set up the relationship: Expected loss=probability×loss in this two-outcome model.'
    - first=0.1(100)=10; second=0.01(2000)=20 units.
    answer: The less probable event has the larger expected loss in this simplified calculation.
    common_mistake: Expected loss is not the loss that must occur on one realization.
  - id: planetary_m12_we02
    title: Read an inclusive threshold
    problem: A fictional laboratory rule permits a sample concentration at or below 5 mg/L. A sample measures exactly 5 mg/L. Classify it under that rule.
    rule: At or below means concentration ≤ limit.
    steps:
    - comparison = 5 ≤ 5, which is true. Equality is included.
    - classification = passes this concentration rule. No claim about other requirements follows.
    answer: This measurement passes the stated inclusive threshold.
    common_mistake: Replacing ≤ with < would wrongly exclude equality.
  - id: planetary_m12_we03
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
  - id: planetary_m12_we04
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
  - id: planetary_m12_we05
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

**Dialogue bubbles -** Jordan Hale: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Emergency Management Office waypoint and Stop 46.

**Beat 3 - After Stop 46 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** The player assigns staged actions to escalating evidence.

**Panel/HUD text:** THE LINE WE PROMISE / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Jordan Hale: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 47.

**Beat 4 - After Stop 47 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Mira publishes the rule before the next orbit update.

**Panel/HUD text:** THE LINE WE PROMISE / DECISION EVIDENCE READY

**Dialogue bubbles -** Jordan Hale: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Coordination Office waypoint and Stop 48.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE LINE WE PROMISE / MISSION DECISION LOGGED

**Dialogue bubbles -** Jordan Hale: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 16 - staged response; Keystone: thresholds/decisions; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: design.

**Call - exact player copy:** Go to the corridor risk display, in the Entry & Consequences Lab.

**Stop reason - exact player copy:** Civil preparation now needs observable rules distinguishing watch, staging, protective orders, and stand-down.

**Question card story setup - exact player copy:** Define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Use probability, corridor population, warning time, and independent verification so each trigger is observable.

**Question card story-science connection - exact player copy:** The threshold-action matches determine how changing probability, exposure, warning time, and verification alter the response state.

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

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 45 - Draw the action thresholds"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Write and commit all four thresholds before updates unlock; then submit the four-stage threshold-to-action mapping."
  payload: "~~~yaml trigger: stages: - {id: watch, threshold: \"impact probability > 1% and diameter > 10 m\", action: maintain watch} - {id: stage, threshold: \"impact probability > 50% and the corridor contains population\", action: stage reversible resources} - {id: order, threshold: \"impact probability >= 90%, diameter >= 20 m, narrow populated three-sigma corridor, independent verification, and warning time < 2 days\", action: issue targeted protective order} - {id: stand_down, threshold: \"verified complete corridor excludes the jurisdiction\", action: stand down that jurisdiction} updates_hidden_until_commit: true blind_updates: - {id: update_watch, reading: \"p = 1.2%, D = 15 m, no populated corridor\", keyed_action: maintain watch} - {id: update_stage, reading: \"p = 63%, populated corridor, warning time = 3 days\", keyed_action: stage reversible resources} - {id: update_order, reading: \"p = 91%, D = 32 m, 180000 people, independent pass, warning time < 2 days\", keyed_action: issue targeted protective order} - {id: update_stand_down, reading: \"complete three-sigma corridor excludes jurisdiction\", keyed_action: stand down that jurisdiction} correct_conclusion: match_all_four_updates_to_the_committed_ladder ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "impact probability", min: 0, max: 100, step: 1, unit: "%"}
  start: 20
  anchors:
    - {at: 20, means: "routine baseline, not the decision threshold"}
    - {at: 65, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 1, hoursLeft: 48}
    - {at: "T-24 h", value: 3, hoursLeft: 24}
    - {at: "T-12 h", value: 8, hoursLeft: 12}
    - {at: "T-6 h", value: 20, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 7.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 8, max: 100}, leadHours: 12}
  question: "Write and commit all four thresholds before updates unlock; then submit the four-stage threshold-to-action mapping."
```

**Correct result:** Correct four trigger-action matches.

**Answer text:** Reversible preparation begins earlier; disruptive orders require narrower, independently verified evidence.

**Why:** TRIGGER binds a measurable condition to a predefined action.

**Wrong-path feedback:** One probability threshold cannot govern actions with radically different costs.

**State/output:** RESPONSE LADDER drafted.

## Stop 46 - Allocate limited capacity

**Format/placement:** ALLOCATE, at `evac-desk`.

**Metadata:** Concept: 16 - emergency resources; Keystone: optimization/equity; Area: Emergency Management Office; Learning role: INTRODUCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the response allocation desk, in the Emergency Management Office.

**Stop reason - exact player copy:** The response ladder allows preparation before the evidence supports a broad irreversible order.

**Question card story setup - exact player copy:** Allocate transport, shelters, medical teams, and communication capacity to reversible staging first.

**Question card story-science connection - exact player copy:** The capacity allocation determines which targeted staging can be completed while preserving a usable reserve.

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

**§7 authored-board source - ALLOCATE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 46 - Allocate limited capacity"
  format: "ALLOCATE"
  source: "Handback 5 canonical interaction block"
  question: "Submit one five-category allocation totaling 100 points that preserves at least 20 points in reserve."
  payload: "~~~yaml allocate: pool: {label: First-wave capacity, value: 100, unit: points} items: - {id: transport, label: Mobility-limited transport, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points} - {id: shelters, label: Shelter readiness, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points} - {id: hospitals, label: Hospital continuity, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points} - {id: communications, label: Multilingual alerts, cost_per_unit: 1, min: 10, max: 40, step: 5, unit: points} - {id: reserve, label: Reserve, cost_per_unit: 1, min: 20, max: 40, step: 5, unit: points} questions: - {id: mobility, label: \"Can mobility-limited residents be reached?\", required: true, needs: {transport: 10}} - {id: continuity, label: \"Can shelters and hospitals stay ready?\", required: true, needs: {shelters: 10, hospitals: 10}} - {id: access, label: \"Can every county receive accessible alerts?\", required: true, needs: {communications: 10}} - {id: extra_comfort, label: \"Can optional comfort sites be expanded now?\", required: false, needs: {shelters: 30}} correct: {transport: 20, shelters: 20, hospitals: 20, communications: 20, reserve: 20} pass_rule: total = 100; each operational item >= 10; reserve >= 20 forbidden_action: move_all_nine_million_people_now ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 4 canonical interaction block - ALLOCATE:**

**Handback 5 canonical interaction block - ALLOCATE:**

```yaml
allocate:
  pool: {label: "First-wave capacity", value: 100, unit: "points"}
  items:
    - {id: transport, label: "Mobility-limited transport", cost: 20}
    - {id: shelters, label: "Shelter readiness", cost: 20}
    - {id: hospitals, label: "Hospital continuity", cost: 20}
    - {id: communications, label: "Multilingual alerts", cost: 20}
    - {id: reserve, label: "Reserve", cost: 20}
    - {id: comfort, label: "Optional comfort sites", cost: 30}
  questions:
    - {id: mobility, requires: [transport], required: true}
    - {id: continuity, requires: [shelters, hospitals], required: true}
    - {id: accessibility, requires: [communications], required: true}
    - {id: response_reserve, requires: [reserve], required: true}
    - {id: extra_comfort, requires: [comfort], required: false}
  rule: "At least one outcome may be forgone; required outcomes are not pre-protected, so the player must choose a feasible basket."
  preProtected: []
  correct: [transport, shelters, hospitals, communications, reserve]
  decision_can_fail: true
  question: "Submit one five-category allocation totaling 100 points that preserves at least 20 points in reserve."
```

**Correct result:** Stage targeted capacity and retain a reserve; do not order corridor-wide evacuation.

**Answer text:** Staging buys speed without imposing the harms of premature mass movement.

**Why:** ALLOCATE distributes finite resources against expected need, reversibility, and equity.

**Wrong-path feedback:** Spending everything now leaves no capacity when the corridor narrows.

**State/output:** TOWN readiness package reaches 80%.

## Stop 47 - Rehearse the decision protocol

**Format/placement:** PROTOCOL, at `threshold-board`.

**Metadata:** Concept: 16 - emergency decision; Keystone: procedure/verification; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: application.

**Call - exact player copy:** Go to the public-action board, in the Emergency Management Office.

**Stop reason - exact player copy:** The staged resources need a decision protocol that prevents an unverified forecast from issuing an order.

**Question card story setup - exact player copy:** Insert an independent scientific verification gate before any protective order.

**Question card story-science connection - exact player copy:** The verification gate determines whether independent scientific confirmation occurs before protective authorization.

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

**Metadata:** Concept: 16 - risk communication; Keystone: evidence/ethics; Area: Emergency Management Office; Learning role: REINFORCE; Difficulty: L5; Story role: communication.

**Call - exact player copy:** Talk to Mira Chen, at the scopeboard in the Coordination Office.

**Stop reason - exact player copy:** The rehearsed response needs public statements that match the present evidence and conditional actions.

**Question card story setup - exact player copy:** Review five proposed public statements and sign only those supported by the current campaign evidence. Each accepted line must name its condition, intended action, and next update without promising certainty.

**Question card story-science connection - exact player copy:** The signed statements determine what the public can be told without promising certainty or an unsupported all-clear.

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

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Sign the public claims", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Sign the three conditional statements and reject both absolute claims.

**Answer text:** The plan is firm about actions precisely because it is honest about uncertainty.

**Why:** ATTEST requires explicit evidence ownership for public claims.

**Wrong-path feedback:** Confidence in a process is not permission to overstate its inputs.

**State/output:** PRECOMMITTED RESPONSE PLAN published.

## Mission outcome

Mission decision: Approve the staged plan. Start with broad steps that can be undone. Use strong orders only for a narrow, checked danger zone. Stand down places that the full path rules out.

**Pre-card character beat:** Jordan initials the threshold board before Mira opens the next orbit packet. “Now the map cannot move our principles,” they say.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** You turned a difficult clue into a clear decision. Your work produced a sound decision: Approve the staged plan. Cerro Alto now has a clearer path through the uncertainty.

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 11:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan initials the threshold board before Mira opens the next orbit packet. “Now the map cannot move our principles,” they say.



**Automatic change:** RESPONSE READINESS +12 | OBSERVING RESERVE -3 | PUBLIC TRUST +8.

**Canonical QA allocation:** 10 RP; Reserve +7, Trust +2, Response +1 -> bars 90 / 100 / 85 / 85.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Line We Promise. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Line We Promise, define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Write the action threshold now, before new evidence or operational pressure can move it. Which interpretation of the displayed evidence correctly uses the mission concept?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Ordered measurement",
  "yLabel": "Decision quantity",
  "caption": "Measurements approach and then cross the action threshold.",
  "series": [
    {
      "name": "Measured",
      "points": [
        [
          1,
          42
        ],
        [
          2,
          48
        ],
        [
          3,
          55
        ],
        [
          4,
          63
        ],
        [
          5,
          71
        ]
      ]
    }
  ],
  "limit": {
    "at": 60,
    "label": "Action threshold"
  }
}
```


**Options - exact player copy:**

- A. A step intended to reduce people’s exposure to harm.
- B. A measurable evidence level that triggers an action.
- C. Preparing resources without yet ordering mass movement.
- D. Choosing a rule before seeing the result that will test it.

**Correct answer:** B

**Hint - exact player copy:** Read the axes, units, direction, and any threshold before comparing the choices.

**Option feedback - exact player copy:**

- A: This describes Protective action, not Threshold. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. a measurable evidence level that triggers an action.
- C: This describes Staging, not Threshold. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Precommitment, not Threshold. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Line We Promise: define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Write the action threshold now, before new evidence or operational pressure can move it. Which conclusion correctly applies Protective action to the observations and physics?

**Options - exact player copy:**

- A. A measurable evidence level that triggers an action.
- B. Preparing resources without yet ordering mass movement.
- C. A step intended to reduce people’s exposure to harm.
- D. Choosing a rule before seeing the result that will test it.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Protective action; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold, not Protective action. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Staging, not Protective action. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. a step intended to reduce people’s exposure to harm.
- D: This describes Precommitment, not Protective action. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Line We Promise using new evidence: define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Write the action threshold now, before new evidence or operational pressure can move it. Which conclusion correctly applies Staging to the observations and physics?

**Options - exact player copy:**

- A. A measurable evidence level that triggers an action.
- B. A step intended to reduce people’s exposure to harm.
- C. Choosing a rule before seeing the result that will test it.
- D. Preparing resources without yet ordering mass movement.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Staging; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold, not Staging. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Protective action, not Staging. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Precommitment, not Staging. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. preparing resources without yet ordering mass movement.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Line We Promise: define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Write the action threshold now, before new evidence or operational pressure can move it. Which conclusion correctly applies Precommitment to the observations and physics?

**Options - exact player copy:**

- A. Choosing a rule before seeing the result that will test it.
- B. A measurable evidence level that triggers an action.
- C. A step intended to reduce people’s exposure to harm.
- D. Preparing resources without yet ordering mass movement.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Precommitment; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. choosing a rule before seeing the result that will test it.
- B: This describes Threshold, not Precommitment. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Protective action, not Precommitment. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Staging, not Precommitment. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Line We Promise decision, the team knows this: define four escalating states for watch, resource staging, targeted protective order, and verified stand-down across the response system. Write the action threshold now, before new evidence or operational pressure can move it. Which conclusion correctly applies staged response to the observations and physics?

**Options - exact player copy:**

- A. A measurable evidence level that triggers an action.
- B. TRIGGER binds a measurable condition to a predefined action.
- C. A step intended to reduce people’s exposure to harm.
- D. Preparing resources without yet ordering mass movement.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for staged response; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold, not staged response. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. tRIGGER binds a measurable condition to a predefined action.
- C: This describes Protective action, not staged response. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Staging, not staged response. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Line We Promise to this follow-up: nine million people lie under the current warning, full evacuation normally needs about thirty days, and discovery provided eleven. Before the plan can proceed, divide the limited supply so every required use is covered. Which conclusion correctly applies emergency resources to the observations and physics?

**Options - exact player copy:**

- A. A measurable evidence level that triggers an action.
- B. A step intended to reduce people’s exposure to harm.
- C. ALLOCATE distributes finite resources against expected need, reversibility, and equity.
- D. Preparing resources without yet ordering mass movement.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for emergency resources; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Threshold, not emergency resources. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Protective action, not emergency resources. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. aLLOCATE distributes finite resources against expected need, reversibility, and equity.
- D: This describes Staging, not emergency resources. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Triggers must be observable; reversible actions can begin earlier; resources need reserves and equity; every order needs verification and reassessment.

- **Mission takeaway:** Decide the rule before the result tests your courage.

---

# Mission 13 - Through the Keyhole

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 2 DAYS

**Card title:** THROUGH THE KEYHOLE

**Go now:** Go to Orbit Determination, verify the final primary-body prediction at Radar, and deliver the result to Coordination.

**Card body:** The final pictures and an independent radar observation can test whether the main asteroid will cross inhabited land. Check for a shared clock error and test the prediction against a withheld measurement. Decide whether to increase protection or tell the threatened communities they are clear.

**Objective:** Escalate the primary-body response or defensibly stand down the populated land corridor.

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
  - id: planetary_m13_we01
    title: Range error from timing error
    problem: A radar delay is biased high by 0.002 s. Use c=300000 km/s. Find the range bias.
    rule: Range bias=c×delay bias/2.
    steps:
    - 'Set up the relationship: Range bias=c×delay bias/2.'
    - ΔR=300000(0.002)/2=300 km.
    answer: The inferred range is 300 km too large.
    common_mistake: A shared clock bias can shift many measurements together.
  - id: planetary_m13_we02
    title: A simple uncertainty interval
    problem: A coordinate estimate is 10 units with standard uncertainty σ=2 units. Give the center ±3σ interval.
    rule: The stated three-sigma interval is estimate ±3×standard uncertainty.
    steps:
    - 'Set up the relationship: The stated three-sigma interval is estimate ±3×standard uncertainty.'
    - interval=[10-3(2),10+3(2)]=[4,16].
    answer: The interval is 4 to 16 units; a probability interpretation needs a distribution model.
    common_mistake: Three-sigma language alone does not prove a Gaussian error model.
  - id: planetary_m13_we03
    title: Position residual
    problem: A model predicts sky coordinate 100 arcseconds and the observed coordinate is 103 arcseconds in the same reference. Find residual.
    rule: Residual=observed-predicted coordinate.
    steps:
    - 'Set up the relationship: Residual=observed-predicted coordinate.'
    - r=103-100=+3 arcseconds.
    answer: The model prediction is 3 arcseconds below the observed coordinate.
    common_mistake: Use the same coordinate reference and units.
  - id: planetary_m13_we04
    title: Test a frozen prediction
    problem: Before seeing a new measurement, a model predicts 12 units with an allowed error of 1 unit. The new measurement is 15 units. Does it pass this test?
    rule: Absolute prediction error = |observed - predicted|.
    steps:
    - absolute error = |15-12| = 3 units. The prediction remains fixed.
    - comparison = 3 > 1. The error exceeds the prewritten tolerance.
    answer: The model fails this held-out test.
    common_mistake: Refitting to 15 before scoring would no longer test the original prediction.
  - id: planetary_m13_we05
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

**Dialogue bubbles -** Malik Rowan: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** Stop 50.

**Beat 3 - After Stop 50 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** A separately clocked radar holdout lands inside the ocean solution.

**Panel/HUD text:** THROUGH THE KEYHOLE / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Malik Rowan: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 51.

**Beat 4 - After Stop 51 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan stands down the nine-million-person land corridor under the published rule.

**Panel/HUD text:** THROUGH THE KEYHOLE / DECISION EVIDENCE READY

**Dialogue bubbles -** Malik Rowan: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 52.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THROUGH THE KEYHOLE / MISSION DECISION LOGGED

**Dialogue bubbles -** Malik Rowan: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 18 - astrometric control; Keystone: bias/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the tracking rack, in the Orbit Determination Center.

**Stop reason - exact player copy:** The new eastward shift includes a reference star, challenging the interpretation of an asteroid trajectory change.

**Question card story setup - exact player copy:** The newest positions all shift east by nearly the same amount, including measurements of a cataloged reference star. Use the reference as a control and determine whether the shift belongs to the asteroid or instrument.

**Question card story-science connection - exact player copy:** The reference correction determines whether the apparent motion is shared measurement bias rather than real target displacement.

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

**Metadata:** Concept: 8 - orbit correction; Keystone: modeling/residuals; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** The identified offset must be applied consistently before the revised orbit is trusted.

**Question card story setup - exact player copy:** Refit the complete optical batch with the documented correction and compare residuals before and after. The common eastward pattern disappears, while the remaining scatter stays centered near zero and within stated uncertainty.

**Question card story-science connection - exact player copy:** The corrected residual pattern determines whether the documented bias removal produces an adequate optical fit.

**Question card prompt - exact player copy:** Submit the corrected mean and scatter in arcseconds and one conclusion: PASS or FAIL. Use ordered observation coordinates 1–5 on the residual axis.

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

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 50 - Refit the corrected residuals"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Submit the corrected mean and scatter in arcseconds and one conclusion: PASS or FAIL."
  payload: "~~~yaml residual: fields: - {id: before, mean_east_arcsec: 0.37, scatter_arcsec: 0.10} - {id: after, mean_east_arcsec: 0.01, scatter_arcsec: 0.09} expected: {mean_east_arcsec: 0.00, one_sigma_scatter_arcsec: 0.10} acceptance: {absolute_mean_max_arcsec: 0.10, scatter_max_arcsec: 0.10} correct_classification: pass ~~~"
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
  correctConclusion: "Accept the fit and preserve correction provenance."
```

**Correct result:** Accept the fit and preserve correction provenance.

**Answer text:** Centered, expected scatter supports correction rather than overfitting.

**Why:** RESIDUAL tests the pattern left by a repair.

**Wrong-path feedback:** Perfect zeros would be suspicious; consistent scatter is the goal.

**State/output:** PRIMARY CORRIDOR refit.

## Stop 51 - Read the separated cloud

**Format/placement:** CHOICE, at `astro-bench`.

**Metadata:** Concept: 11 - primary corridor; Keystone: probability/response; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: interpretation.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The corrected fit changes geographic exposure, so the existing land alert needs reassessment.

**Question card story setup - exact player copy:** Read the cloud against the precommitted stand-down and continued-monitoring thresholds.

**Question card story-science connection - exact player copy:** The land-intersection result determines whether evacuation can stand down while ocean and coastal monitoring continue.

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

**§7 authored-board source - CLOUD:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 51 - Read the separated cloud"
  format: "CHOICE"
  source: "Handback 3 canonical interaction block"
  question: "Submit the 96% impact value, the land-intersection result, and one response conclusion: LAND STAND-DOWN or LAND EVACUATION."
  payload: "~~~yaml cloud: primary_impact_probability_percent: 96 confidence_envelope_sigma: 3 populated_land_intersection: false points: - {id: impact_weight, setting: full weighted cloud, reading: 96 percent intersects Earth} - {id: land_test, setting: complete three-sigma envelope, reading: no populated-land intersection} - {id: ocean_test, setting: primary impact region, reading: deep-ocean corridor} published_rule: verified_land_exclusion_allows_land_stand_down correct_conclusion: land_stand_down continuing_actions: [ocean_monitoring, coastal_monitoring, independent_verification] ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```











**Complete format-specific interaction block:**

```yaml
choice:
  evidence: "The full three-standard-deviation range gives a 96% Earth-impact probability, but no path crosses populated land; the main corridor is deep ocean."
  choices:
    - {id: coastal, label: "Stand down land evacuation while retaining ocean and coastal monitoring.", correct: true}
    - {id: all_clear, label: "End all monitoring because no populated land lies in the corridor.", correct: false}
    - {id: evacuate, label: "Continue the full land evacuation because Earth-impact probability is 96%.", correct: false}
    - {id: four_percent, label: "Report a 4% impact probability because 4% of the range avoids populated land.", correct: false}
  answer: coastal
  rebuttals:
    all_clear: "A deep-ocean impact can still create marine and coastal hazards and remains highly probable."
    evacuate: "Impact probability alone does not place the impact over populated land; the corridor determines exposure."
    four_percent: "The 4% is the miss probability, and land exposure is not the complement of Earth impact."
```

**Correct result:** Stand down land evacuation and retain ocean/coastal monitoring.

**Answer text:** The hazard remains, but exposure changed.

**Why:** CLOUD maps the ensemble to an action threshold.

**Wrong-path feedback:** Ocean impact is neither total all-clear nor land-evacuation trigger.

**State/output:** LAND CORRIDOR EXCLUDED pending holdout.

## Stop 52 - Reveal the independent holdout

**Format/placement:** HOLDOUT, at `radar-console`.

**Metadata:** Concept: 18 - independent verification; Keystone: prediction/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The apparent land exclusion needs independent range evidence before stand-down is executed.

**Question card story setup - exact player copy:** Freeze the ocean-range prediction before opening Tomás's separately clocked radar pass. Reveal its measured range, test the acceptance window, and carry the independent result to OPS under the published protocol.

**Question card story-science connection - exact player copy:** The held-out radar measurement determines whether the frozen ocean-track prediction passes its acceptance window.

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

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 52 - Reveal the independent holdout"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "Commit the 18,420 ± 12 km prediction first; after reveal, submit the measured range in kilometers and the resulting stand-down conclusion."
  payload: "~~~yaml holdout: commit_required: true fit: {predicted_range_km: 18420, acceptance_half_width_km: 12} reveal_after_commit: {measured_range_km: 18426} score: {absolute_difference_km: 6, result: pass, response_conclusion: land_stand_down} correct_conclusion: pass_holdout_and_stand_down_land_corridor ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed independent range error", min: 0, max: 20, step: 5, unit: "km"}
  fit: [{at: 0, value: 0.55}, {at: 5, value: 0.98}, {at: 10, value: 0.84}, {at: 15, value: 0.87}, {at: 20, value: 0.83}]
  test: [{at: 0, value: 0.33}, {at: 5, value: 0.46}, {at: 10, value: 0.78}, {at: 15, value: 0.86}, {at: 20, value: 0.84}]
  passScore: 0.80
  overfitAt: 5
  correctAt: 15
  prediction: {value: 18420, unit: "km"}
  heldOutMeasurement: {value: 18426, absoluteDifference: 6, unit: "km"}
  correctConclusion: "The independent range passes; execute the land stand-down."
```

**Correct result:** Holdout passes; execute the land stand-down.

**Answer text:** Independent radar supports the corrected optical solution.

**Why:** HOLDOUT tests a frozen prediction outside the fitted data.

**Wrong-path feedback:** Do not move the window after seeing the result.

**State/output:** PRIMARY SOLUTION VERIFIED; OPS issues stand-down.

## Mission outcome

Mission decision: End the land alert for the main body. Fixed sky data and a separate radar test put its full path over deep ocean. Keep a fair watch on the coast.

**Pre-card character beat:** Jordan cancels mass-movement staging for nine million people while keeping coastal monitoring active. For one quiet minute, the operations floor believes the hardest decision is over.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** That was first-rate reasoning. You pinned down the governing result: End the land alert for the main body. Your result gives decision makers time to act without sounding a false alarm.

**Header:** MISSION 13 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan cancels mass-movement staging for nine million people while keeping coastal monitoring active. For one quiet minute, the operations floor believes the hardest decision is over.



**Automatic change:** Solution +10 | Response +5 | Reserve -5 | Trust +4.

**Canonical QA:** Allocate 10 RP as Reserve +5, Trust +1, Response +4 -> 100 / 100 / 90 / 89.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed Through the Keyhole. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to Through the Keyhole, the newest positions all shift east by nearly the same amount, including measurements of a cataloged reference star. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which conclusion correctly applies Control to the observations and physics?

**Options - exact player copy:**

- A. Data withheld until after a prediction is frozen.
- B. A known reference used to reveal measurement bias.
- C. A common shift affecting multiple measurements together.
- D. A wide model uncertainty region used here to test land intersection.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Control; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Holdout, not Control. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. a known reference used to reveal measurement bias.
- C: This describes Systematic error, not Control. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Three-sigma envelope, not Control. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to Through the Keyhole: freeze the ocean-range prediction before opening Tomás's separately clocked radar pass. Which conclusion correctly applies Holdout to the observations and physics?

**Options - exact player copy:**

- A. A known reference used to reveal measurement bias.
- B. A common shift affecting multiple measurements together.
- C. Data withheld until after a prediction is frozen.
- D. A wide model uncertainty region used here to test land intersection.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Holdout; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Control, not Holdout. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Systematic error, not Holdout. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. data withheld until after a prediction is frozen.
- D: This describes Three-sigma envelope, not Holdout. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks Through the Keyhole using new evidence: the newest positions all shift east by nearly the same amount, including measurements of a cataloged reference star. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which statistical conclusion or procedure correctly uses Systematic error?

**Options - exact player copy:**

- A. A known reference used to reveal measurement bias.
- B. Data withheld until after a prediction is frozen.
- C. A wide model uncertainty region used here to test land intersection.
- D. A common shift affecting multiple measurements together.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Systematic error; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Control, not Systematic error. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Holdout, not Systematic error. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Three-sigma envelope, not Systematic error. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a common shift affecting multiple measurements together.
### Review question 4

**Prompt - exact player copy:** An unseen case extends Through the Keyhole: nearly all justified primary-body orbit trials intersect the ocean, and the complete three-sigma envelope no longer touches any populated land. The next action depends on selecting the conclusion that fits all of those facts. Which conclusion correctly applies Three-sigma envelope to the observations and physics?

**Options - exact player copy:**

- A. A wide model uncertainty region used here to test land intersection.
- B. A known reference used to reveal measurement bias.
- C. Data withheld until after a prediction is frozen.
- D. A common shift affecting multiple measurements together.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Three-sigma envelope; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a wide model uncertainty region used here to test land intersection.
- B: This describes Control, not Three-sigma envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Holdout, not Three-sigma envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Systematic error, not Three-sigma envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Through the Keyhole decision, the team knows this: the newest positions all shift east by nearly the same amount, including measurements of a cataloged reference star. Run the reversible comparison now so the crew can tell whether the proposed cause changes the measured response. Which conclusion correctly applies astrometric control to the observations and physics?

**Options - exact player copy:**

- A. A known reference used to reveal measurement bias.
- B. CONTROL holds expected reality fixed while testing measurement.
- C. Data withheld until after a prediction is frozen.
- D. A common shift affecting multiple measurements together.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for astrometric control; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Control, not astrometric control. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. cONTROL holds expected reality fixed while testing measurement.
- C: This describes Holdout, not astrometric control. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Systematic error, not astrometric control. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from Through the Keyhole to this follow-up: refit the complete optical batch with the documented correction and compare residuals before and after. Which conclusion correctly applies orbit correction to the observations and physics?

**Options - exact player copy:**

- A. A known reference used to reveal measurement bias.
- B. Data withheld until after a prediction is frozen.
- C. RESIDUAL tests the pattern left by a repair.
- D. A common shift affecting multiple measurements together.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for orbit correction; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Control, not orbit correction. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Holdout, not orbit correction. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. rESIDUAL tests the pattern left by a repair.
- D: This describes Systematic error, not orbit correction. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- Controls expose bias; corrections should leave plausible scatter; location changes risk; holdouts verify independently.

- **Mission takeaway:** A defensible stand-down is a planetary-defense success.

---

# Mission 14 - The Second Echo

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: 1 DAY

**Card title:** THE SECOND ECHO

**Go now:** Go to Coordination for the anomaly review, inspect the second return at Radar, and open any new orbit track at Orbit Determination.

**Card body:** The main asteroid is headed toward deep ocean, but a faint second radar echo does not fit its path. It might be an instrument error or a separate fragment. Compare independent observations and decide whether the apparent all-clear has missed another danger.

**Objective:** Decide whether the apparent all-clear hides a separate damaging fragment.

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
  - id: planetary_m14_we01
    title: Split equal-density volumes
    problem: A uniform body divides into two fragments of equal volume without material loss. Compare each fragment's mass with the original.
    rule: At unchanged density, mass is proportional to volume.
    steps:
    - 'Set up the relationship: At unchanged density, mass is proportional to volume.'
    - V_fragment=V_original/2, so m_fragment=m_original/2.
    answer: Each fragment has half the original mass, though not half its diameter.
    common_mistake: Halving volume reduces diameter by a cube-root factor, not by one half.
  - id: planetary_m14_we02
    title: Radar round-trip time
    problem: A radar echo returns after 2 s. Use c=300000 km/s. Find target distance.
    rule: Range=c×round-trip delay/2.
    steps:
    - 'Set up the relationship: Range=c×round-trip delay/2.'
    - R=300000(2)/2=300000 km.
    answer: The target is 300000 km away.
    common_mistake: The measured delay includes travel out and back.
  - id: planetary_m14_we03
    title: Explain a repeating model mismatch
    problem: A spherical rotating-body model misses a repeated two-part brightness pattern also seen in an independent imaging measurement. What is a useful next model test?
    rule: Independent observations of the same pattern can motivate a more detailed shape model.
    steps:
    - A two-part shape could predict a pattern the sphere cannot represent.
    - Fit it on existing data, then test its prediction on withheld observations.
    answer: Test the more detailed model; the pattern alone is not proof that it is correct.
    common_mistake: Adding complexity must earn predictive improvement, not just a better description of old data.
  - id: planetary_m14_we04
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
  - id: planetary_m14_we05
    title: Separate detector and sky motion
    problem: Across images with a shifted camera pointing, a bright spot stays at the same detector pixel while the stars move. What does that suggest?
    rule: A detector defect stays tied to detector coordinates; a sky source follows the sky-to-detector mapping.
    steps:
    - Changing pointing moves real sky positions across pixels.
    - The stationary detector spot does not follow that mapping.
    answer: The pattern supports a detector artifact as a candidate explanation.
    common_mistake: This diagnostic needs the stated pointing change; one image alone is insufficient.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

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

**Dialogue bubbles -** Tomás Ibarra: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Bistatic Radar Range waypoint and Stop 54.

**Beat 3 - After Stop 54 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Lena reports an uncataloged optical point at the secondary ephemeris.

**Panel/HUD text:** THE SECOND ECHO / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Tomás Ibarra: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** Stop 55.

**Beat 4 - After Stop 55 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Malik opens a distinct fragment track: approximately 32 meters.

**Panel/HUD text:** THE SECOND ECHO / DECISION EVIDENCE READY

**Dialogue bubbles -** Tomás Ibarra: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 56.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE SECOND ECHO / MISSION DECISION LOGGED

**Dialogue bubbles -** Tomás Ibarra: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 8 - primary solution; Keystone: evidence/verification; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the scopeboard, in the Coordination Office.

**Stop reason - exact player copy:** The stand-down must be protected from reversal by evidence that does not actually contradict the primary track.

**Question card story setup - exact player copy:** Verify whether any new evidence actually contradicts the main ocean-impact track.

**Question card story-science connection - exact player copy:** The primary-body verification determines whether the ocean solution remains valid while the separate radar feature is investigated.

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

**§7 build completion - VERIFY:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
verify:
  quantity: {label: "single requested quantity for Verify the primary track", unit: "units printed on the card"}
  predictionRange: {min: 50.0, max: 150.0, step: 10.0}
  measurement: {label: "independent measured value", truth: 100.0}
  passRatio: [0.95, 1.05]
  correctResultText: "Keep the primary ocean solution."
```

**Correct result:** Keep the primary ocean solution.

**Answer text:** A second signal may add an object without making the first solution wrong.

**Why:** VERIFY applies explicit acceptance criteria.

**Wrong-path feedback:** A new anomaly does not discard unrelated verified evidence.

**State/output:** PRIMARY TRACK LOCKED.

## Stop 54 - Probe the separated return

**Format/placement:** PROBE, at `radar-console`.

**Metadata:** Concept: 10 - secondary echo; Keystone: observation/analysis; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the radar console, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The weak radar feature now needs a time-series check for motion independent of the primary body.

**Question card story setup - exact player copy:** Track whether its delay changes independently over time.

**Question card story-science connection - exact player copy:** Its changing delay determines whether the return merits treatment as a candidate separated object.

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

**§7 authored-board source - PROBE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 54 - Probe the separated return"
  format: "PROBE"
  source: "Handback 5 canonical interaction block"
  question: "Submit all six measured secondary-minus-primary delays in milliseconds and one classification: CONNECTED LOBE, STATIONARY INTERFERENCE, or SEPARATING-BODY CANDIDATE."
  payload: "~~~yaml probe: points: - id: frame_1 load: \"Calibrated frame 1; measure secondary delay relative to the primary.\" reading: {secondary_minus_primary_delay_ms: 0.20} expected: {separating_body_delay_ms: 0.20} comparison: \"Matches the separating-body prediction; connected-lobe and interference baselines begin at 0.20 ms.\" - id: frame_2 load: \"Calibrated frame 2; compare with all three motion models.\" reading: {secondary_minus_primary_delay_ms: 0.34} expected: {separating_body_delay_ms: 0.35} comparison: \"Increases as predicted; stationary interference would remain near 0.20 ms.\" - id: frame_3 load: \"Calibrated frame 3; test for periodic merging or monotonic separation.\" reading: {secondary_minus_primary_delay_ms: 0.51} expected: {separating_body_delay_ms: 0.50} comparison: \"Matches monotonic separation; a connected lobe would begin returning toward the primary.\" - id: frame_4 load: \"Calibrated frame 4; continue the independent-delay track.\" reading: {secondary_minus_primary_delay_ms: 0.66} expected: {separating_body_delay_ms: 0.65} comparison: \"Continues outward instead of periodically merging.\" - id: frame_5 load: \"Calibrated frame 5; compare the measured offset with the free-separation prediction.\" reading: {secondary_minus_primary_delay_ms: 0.79} expected: {separating_body_delay_ms: 0.80} comparison: \"Within 0.01 ms of the station-specific free-separation expectation.\" - id: frame_6 load: \"Calibrated frame 6; perform the final model comparison.\" reading: {secondary_minus_primary_delay_ms: 0.96} expected: {separating_body_delay_ms: 0.95} comparison: \"The full series is monotonic; interference would be stationary and a lobe would merge periodically.\" model_expectations: connected_lobe: periodic_merge stationary_interference: constant_delay separating_body: monotonic_delay_increase correct_classification: separating_body_candidate required_samples: [frame_1, frame_2, frame_3, frame_4, frame_5, frame_6] truth: {motion_pattern: monotonic_delay_increase, classification: separating_body_candidate} commit_gate: All six calibrated frames sampled. ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - PROBE:**

**Handback 5 canonical interaction block - PROBE:**

```yaml
probe:
  stations:
    - {id: frame_1, label: "Frame 1", reading: 0.20, expected: 0.20, unit: "ms delay"}
    - {id: frame_2, label: "Frame 2", reading: 0.34, expected: 0.35, unit: "ms delay"}
    - {id: frame_3, label: "Frame 3", reading: 0.51, expected: 0.50, unit: "ms delay"}
    - {id: frame_4, label: "Frame 4", reading: 0.66, expected: 0.65, unit: "ms delay"}
    - {id: frame_5, label: "Frame 5", reading: 0.79, expected: 0.80, unit: "ms delay"}
    - {id: frame_6, label: "Frame 6", reading: 0.96, expected: 0.95, unit: "ms delay"}
  target: frame_6
  quantityAndUnits: "Submit all six measured secondary-minus-primary delays in milliseconds and one classification: CONNECTED LOBE, STATIONARY INTERFERENCE, or SEPARATING-BODY CANDIDATE."
  correctConclusion: "Candidate separated body, pending independent evidence."
```

**Correct result:** Candidate separated body, pending independent evidence.

**Answer text:** Its delay changes independently from the primary.

**Why:** PROBE tests competing time-series predictions.

**Wrong-path feedback:** Radar supports candidacy, not yet a public declaration.

**State/output:** SECONDARY TRACK CANDIDATE.

## Stop 55 - Trace independent confirmation

**Format/placement:** TRACE, at `echo-archive`.

**Metadata:** Concept: 18 - confirmation; Keystone: provenance/independence; Area: Bistatic Radar Range; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Go to the echo archive, in the Bistatic Radar Range.

**Stop reason - exact player copy:** The radar candidate needs confirmation from an optical search that did not inherit its processing errors.

**Question card story setup - exact player copy:** Lena reports a faint optical point near the predicted secondary ephemeris after the radar shift begins. Trace its image, timestamp, reduction pipeline, and blind-search log to decide whether it independently confirms the radar candidate.

**Question card story-science connection - exact player copy:** The image and timing provenance determines whether the faint optical point independently supports the secondary track.

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

**Metadata:** Concept: 19 - fragment identification; Keystone: synthesis/decision; Area: Orbit Determination Center; Learning role: REINFORCE; Difficulty: L5; Story role: diagnosis.

**Call - exact player copy:** Go to the orbit-fit board, in the Orbit Determination Center.

**Stop reason - exact player copy:** Independent confirmation requires a new track without prematurely declaring a particular city threatened.

**Question card story setup - exact player copy:** Radar separation, independent optical detection, and brightness consistent with roughly 32 meters now require one shared explanation. Diagnose the minimum claim, preserve broad trajectory uncertainty, and reopen the response protocol.

**Question card story-science connection - exact player copy:** The fragment diagnosis sets the minimum supported claim and the uncertainty that urgent recovery must reduce.

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

**Happy ending card - exact player copy:** You kept your head when the evidence became difficult. The evidence now points to one clear action: Keep the main-body land stand-down. The people beneath the risk corridor are safer because the evidence is sharper.

**Header:** MISSION 14 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 10:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The primary all-clear stays green as a second red track appears. Mira says, “We were right about the large body. Now be right about the smaller one.”



**Automatic change:** Solution -8 | Response +3 | Reserve -4 | Trust -4.

**Canonical QA:** Allocate 10 RP as Reserve +1, Trust +1, Solution +8 -> 92 / 100 / 91 / 90.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Second Echo. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Second Echo, radar separation, independent optical detection, and brightness consistent with roughly 32 meters now require one shared explanation. Which conclusion correctly applies Fragment to the observations and physics?

**Options - exact player copy:**

- A. Two distinguishable radar echoes.
- B. A separated piece moving on its own trajectory.
- C. A measurement path without the same likely error source.
- D. A prediction of an object’s position at specified times.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Fragment; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Dual return, not Fragment. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. a separated piece moving on its own trajectory.
- C: This describes Independent channel, not Fragment. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Ephemeris, not Fragment. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Second Echo: probe the latest radar frames and compare the weak return with predictions for a connected lobe, stationary interference, and a freely separating body. Sample the locations in order now so the crew can identify where the system first departs from normal. Which conclusion correctly applies Dual return to the observations and physics?

**Options - exact player copy:**

- A. A separated piece moving on its own trajectory.
- B. A measurement path without the same likely error source.
- C. Two distinguishable radar echoes.
- D. A prediction of an object’s position at specified times.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Dual return; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Fragment, not Dual return. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Independent channel, not Dual return. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. two distinguishable radar echoes.
- D: This describes Ephemeris, not Dual return. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Second Echo using new evidence: compare the released primary ephemeris with the corrected optical fit, independent radar holdout, and the complete archived provenance record. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which conclusion correctly applies Independent channel to the observations and physics?

**Options - exact player copy:**

- A. A separated piece moving on its own trajectory.
- B. Two distinguishable radar echoes.
- C. A prediction of an object’s position at specified times.
- D. A measurement path without the same likely error source.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Independent channel; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Fragment, not Independent channel. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Dual return, not Independent channel. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Ephemeris, not Independent channel. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. a measurement path without the same likely error source.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Second Echo: compare the released primary ephemeris with the corrected optical fit, independent radar holdout, and the complete archived provenance record. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which conclusion correctly applies Ephemeris to the observations and physics?

**Options - exact player copy:**

- A. A prediction of an object’s position at specified times.
- B. A separated piece moving on its own trajectory.
- C. Two distinguishable radar echoes.
- D. A measurement path without the same likely error source.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for Ephemeris; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a prediction of an object’s position at specified times.
- B: This describes Fragment, not Ephemeris. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Dual return, not Ephemeris. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Independent channel, not Ephemeris. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Second Echo decision, the team knows this: compare the released primary ephemeris with the corrected optical fit, independent radar holdout, and the complete archived provenance record. Commit the prediction and run the test now so the measurement can fairly accept or reject the proposed model. Which conclusion correctly applies primary solution to the observations and physics?

**Options - exact player copy:**

- A. A separated piece moving on its own trajectory.
- B. VERIFY applies explicit acceptance criteria.
- C. Two distinguishable radar echoes.
- D. A measurement path without the same likely error source.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for primary solution; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Fragment, not primary solution. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. vERIFY applies explicit acceptance criteria.
- C: This describes Dual return, not primary solution. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Independent channel, not primary solution. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Second Echo to this follow-up: probe the latest radar frames and compare the weak return with predictions for a connected lobe, stationary interference, and a freely separating body. Sample the locations in order now so the crew can identify where the system first departs from normal. Which conclusion correctly applies secondary echo to the observations and physics?

**Options - exact player copy:**

- A. A separated piece moving on its own trajectory.
- B. Two distinguishable radar echoes.
- C. PROBE tests competing time-series predictions.
- D. A measurement path without the same likely error source.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for secondary echo; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Fragment, not secondary echo. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Dual return, not secondary echo. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. pROBE tests competing time-series predictions.
- D: This describes Independent channel, not secondary echo. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- New evidence can add rather than overturn; relative motion signals separation; independence is provenance; existence and trajectory uncertainty differ.

- **Mission takeaway:** Preserve the anomaly long enough for it to become evidence.

---

# Mission 15 - The Honest Warning

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** IMPACT WINDOW: LESS THAN 12 HOURS

**Card title:** THE HONEST WARNING

**Go now:** Go to the Survey Telescope for the final recovery, carry the positions to Orbit Determination, and execute the response from the Town Emergency Office.

**Card body:** The smaller fragment could pass over land, and little warning time remains. Use the final observation to refine its path and estimate the possible harm. Apply the response rules you already agreed on, then issue the warning and carry out the necessary protection.

**Objective:** Issue the final warning and execute a proportionate protective response.

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
  - id: planetary_m15_we01
    title: Interpret a possible-impact corridor
    problem: A model produces a strip of possible impact locations. Does the centerline identify a guaranteed impact point?
    rule: A corridor represents a spread of supported locations under uncertainty.
    steps:
    - Locations across the strip remain possible within the model.
    - The centerline is a summary of that distribution, not a guarantee about one location.
    answer: Planning should preserve the uncertainty rather than treat the centerline as certain.
    common_mistake: A narrow-looking map symbol can hide substantial uncertainty.
  - id: planetary_m15_we02
    title: Surface impact versus airburst
    problem: Two equal-energy objects enter an atmosphere, but one fragments high above the ground and the other reaches the surface. Must their damage patterns match?
    rule: Energy matters, but the altitude and manner of deposition affect consequences.
    steps:
    - The fragmenting object deposits more energy along an atmospheric path.
    - The surface-reaching object deposits energy differently, including at the ground.
    answer: Equal initial kinetic energy does not imply equal local damage patterns.
    common_mistake: Energy alone cannot determine a unique damage radius without a consequence model.
  - id: planetary_m15_we03
    title: Count collision-compatible paths
    problem: In a deliberately equally weighted toy sample of 100 possible paths, 8 cross a target. Estimate collision probability within this sample.
    rule: For equally weighted representative paths, probability estimate=hits/total.
    steps:
    - 'Set up the relationship: For equally weighted representative paths, probability estimate=hits/total.'
    - p=8/100=0.08=8%.
    answer: The sample estimate is 8%, conditional on the model and equal weighting.
    common_mistake: Unweighted counting is invalid if the paths carry unequal probabilities.
  - id: planetary_m15_we04
    title: Probability and expected loss
    problem: Two hypothetical events have probabilities 0.1 and 0.01 and losses 100 and 2000 units. Compare expected losses.
    rule: Expected loss=probability×loss in this two-outcome model.
    steps:
    - 'Set up the relationship: Expected loss=probability×loss in this two-outcome model.'
    - first=0.1(100)=10; second=0.01(2000)=20 units.
    answer: The less probable event has the larger expected loss in this simplified calculation.
    common_mistake: Expected loss is not the loss that must occur on one realization.
  - id: planetary_m15_we05
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

Recovery: finding a previously detected object again to extend its observation arc.

Airburst corridor: the possible locations where atmospheric energy release may occur.

Action envelope: the places and people included in a protective response.

All-clear: a stand-down claim tied to one specific hazard track.

#### Primer concepts

- A 32-meter object can be locally devastating without being globally catastrophic.
- Risk decisions combine probability, consequence, warning time, and exposure.
- The final order should cover the verified corridor and preserve monitoring of the primary.

#### Equations first needed today

**Equation:** m = (4/3)πr³ρ; kinetic energy (KE) = ½mv²

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

**Dialogue bubbles -** Mira Chen: “Nice work. That result is now part of the record. Use it in the next test.”

**Unlocks:** The Orbit Determination Center waypoint and Stop 58.

**Beat 3 - After Stop 58 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Evelyn bounds the event near 0.7–2 megatons TNT.

**Panel/HUD text:** THE HONEST WARNING / EVIDENCE HANDOFF READY

**Dialogue bubbles -** Mira Chen: “Good thinking. The handoff is ready. Follow the newly unlocked evidence.”

**Unlocks:** The Emergency Management Office waypoint and Stop 59.

**Beat 4 - After Stop 59 | automatic**

**Player control:** Pause local interaction while bubbles or required panels are open; Continue restores control.

**World state:** Jordan applies the published threshold to protect 180,000 people.

**Panel/HUD text:** THE HONEST WARNING / DECISION EVIDENCE READY

**Dialogue bubbles -** Mira Chen: “Exactly right. The decision evidence is complete. Make the narrowest claim that fits it.”

**Unlocks:** Stop 60.

**Beat 5 - At mission end | automatic**

**Player control:** Pause for the outcome bubbles, then restore control for the metric screen.

**World state:** The final evidence product remains visible, the mission decision is delivered in character, and the next required location pulses on the map.

**Panel/HUD text:** THE HONEST WARNING / MISSION DECISION LOGGED

**Dialogue bubbles -** Mira Chen: “Outstanding work. You solved the mission. The decision is logged. Carry this result into the next shift.”

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

**Metadata:** Concept: 18 - fragment recovery; Keystone: evidence/verification; Area: Survey Telescope; Learning role: REINFORCE; Difficulty: L5; Story role: evidence.

**Call - exact player copy:** Talk to Lena Ortiz, at the pipeline bench in the Survey Telescope.

**Stop reason - exact player copy:** The fragment search has produced a moving point whose identity must be verified before response escalation.

**Question card story setup - exact player copy:** A faint point appears inside the fragment search box and moves consistently over three exposures. Attest its identity only after checking timestamps, star-field solution, motion, brightness, and the static-source archive.

**Question card story-science connection - exact player copy:** The timed-image and archive checks determine whether the search-box detection is a genuine recovery of the fragment.

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

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Attest the recovery", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Sign the verified recovery.

**Answer text:** Every identity check agrees, so the positions extend the fragment arc.

**Why:** ATTEST owns a claim against named criteria.

**Wrong-path feedback:** Search-box proximity alone is not identity.

**State/output:** FRAGMENT RECOVERED.

## Stop 58 - Balance orbit and consequence

**Format/placement:** BALLPARK, at `astro-bench`.

**Metadata:** Concept: 16 - fragment risk; Keystone: uncertainty/consequences; Area: Entry & Consequences Lab; Learning role: REINFORCE; Difficulty: L5; Story role: analysis.

**Call - exact player copy:** Go to the astrometry bench, in the Orbit Determination Center.

**Stop reason - exact player copy:** The verified fragment recovery allows its risk to be assessed against the published protective-order criteria.

**Question card story setup - exact player copy:** The recovered orbit gives a narrow damaging-airburst corridor over 180,000 people, while size and density ranges imply roughly 0.7 to 2 megatons TNT. Balance probability, consequence, timing, and reversibility against the published rule.

**Question card story-science connection - exact player copy:** Probability, consequence, warning time, and reversibility together determine whether a targeted order is justified.

**Question card prompt - exact player copy:** Submit one threshold conclusion - TARGETED ORDER or CONTINUE STAGING - and identify the numerical evidence that controls it.

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

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 58 - Balance orbit and consequence"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Submit one threshold conclusion - TARGETED ORDER or CONTINUE STAGING - and identify the numerical evidence that controls it."
  payload: "~~~yaml balance: streams: - {id: likelihood, label: Impact probability, value: 91, unit: percent, count: true} - {id: diameter, label: Diameter range, value: [28, 36], unit: m, count: true} - {id: energy, label: Energy range, value: [0.7, 2.0], unit: Mt TNT, count: true} - {id: exposure, label: Exposed population, value: 180000, unit: people, count: true} - {id: warning, label: Warning time, value: less_than_2, unit: days, count: true} - {id: verification, label: Independent verification, value: independent, unit: status, count: true} - {id: torino_summary, label: Torino summary, value: derived, unit: category, count: false} published_threshold: high_probability_narrow_damaging_verified_time_critical correct_conclusion: targeted_order ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "expected exposed population at the current impact probability"
  unit: "people"
  inputs:
    - {label: "Impact probability", value: 0.91, unit: "probability"}
    - {label: "Population in the exposed corridor", value: 180000, unit: "people"}
  operation: "multiply impact probability by exposed population"
  formula: "expected exposure=0.91×180000"
  start: 0
  correctResult: 163800
  tolerance: 100
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Every targeted-order criterion is crossed.

**Answer text:** High likelihood, damaging scale, narrow exposure, verification, and short time require action.

**Why:** BALANCE integrates unlike evidence at a decision boundary.

**Wrong-path feedback:** Smaller than the primary is not harmless.

**State/output:** TARGETED ORDER AUTHORIZED.

## Stop 59 - Trigger the promised action

**Format/placement:** TRIGGER, at `threshold-board`.

**Metadata:** Concept: 16 - protective order; Keystone: thresholds/response; Area: Emergency Management Office; Learning role: MASTER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the public-action board, in the Emergency Management Office.

**Stop reason - exact player copy:** The fragment criteria are met, so the response must follow the promised geographic and accessibility rules.

**Question card story setup - exact player copy:** Apply the published, precommitted response ladder to the newly verified 180,000-person fragment corridor. Choose geographic scope, protective action, accessibility measures, and reassessment time while preserving the primary-body stand-down elsewhere.

**Question card story-science connection - exact player copy:** The selected order determines whom to protect now while retaining the primary-body stand-down outside the fragment corridor.

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

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 59 - Trigger the promised action"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Submit the triggered plan for 180,000 people, naming the protective action, accessibility measures, reassessment timing, and preserved primary-body stand-down."
  payload: "~~~yaml trigger: committed_rule: high_probability_narrow_damaging_verified_time_critical observed_state: impact_probability_percent: 91 exposed_population: 180000 independently_verified: true warning_time_days: less_than_2 triggered_action: scope_people: 180000 action: shelter_or_move_outside_modeled_airburst_zone accessibility: [multilingual_alerts, mobility_support] reassessment: every_orbit_update preserve_primary_land_stand_down: true correct_conclusion: issue_targeted_accessible_updateable_order ~~~"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "population in threatened corridor", min: 0, max: 250000, step: 10000, unit: "people"}
  start: 50000
  anchors:
    - {at: 50000, means: "routine baseline, not the decision threshold"}
    - {at: 162500, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 60000, hoursLeft: 48}
    - {at: "T-24 h", value: 120000, hoursLeft: 24}
    - {at: "T-12 h", value: 180000, hoursLeft: 12}
    - {at: "T-6 h", value: 220000, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 179999}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 180000, max: 250000}, leadHours: 12}
  question: "Submit the triggered plan for 180,000 people, naming the protective action, accessibility measures, reassessment timing, and preserved primary-body stand-down."
```

**Correct result:** Issue the targeted, accessible, updateable order.

**Answer text:** The order is urgent, geographically limited, and revisable.

**Why:** TRIGGER converts verified conditions into promised action.

**Wrong-path feedback:** Nationwide evacuation and total all-clear both exceed evidence.

**State/output:** PROTECTIVE ORDER transmitted.

## Stop 60 - Allocate the final response

**Format/placement:** ALLOCATE, at `evac-desk`.

**Metadata:** Concept: 16 - execution; Keystone: resources/equity; Area: Emergency Management Office; Learning role: MASTER; Difficulty: L5; Story role: application.

**Call - exact player copy:** Go to the response allocation desk, in the Emergency Management Office.

**Stop reason - exact player copy:** The targeted order needs actual deployment without abandoning the continuing ocean-event watch.

**Question card story setup - exact player copy:** Complete deployment without stripping ongoing coastal monitoring for the primary ocean event.

**Question card story-science connection - exact player copy:** The final allocation determines whether transport, shelter, medical, communication, reserve, and coastal-monitoring commitments can all be met.

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

**Happy ending card - exact player copy:** Exceptional work. You brought the campaign to a decisive conclusion: Send and carry out the narrow safety order for 180,000 people. The planetary-defense plan now rests on a result the whole network can trust.

**Header:** MISSION 15 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** Jordan watches the final transport clear the vulnerable zone. Lena keeps the telescope on the fragment; Tomás keeps the ocean track; nobody calls uncertainty failure.



**Automatic change:** Solution +16 | Response +10 | Reserve +10 | Trust +15.

**Canonical QA:** No final RP spend; all bars cap at 100.

**Recovery Point line template:** RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} = {awarded_rp} (minimum 4; maximum 12)

**Allocation prompt:** Spend Recovery Points to raise any unlocked campaign bar, or save them in the Recovery Bank. One point raises one bar by 1%.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** You completed The Honest Warning. Choose GO DEEPER to revisit the four decisions and explore related course ideas; this optional review does not change your metrics or delay the next mission.

### Review focus

No additional prerequisite is required. These AP-style questions apply the mission's course ideas to follow-up evidence, including related topics not required in the four main stops.

### Review question 1

**Prompt - exact player copy:** In a follow-up to The Honest Warning, a faint point appears inside the fragment search box and moves consistently over three exposures. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which conclusion correctly applies Recovery to the observations and physics?

**Options - exact player copy:**

- A. The possible locations where atmospheric energy release may occur.
- B. Finding a previously detected object again to extend its observation arc.
- C. The places and people included in a protective response.
- D. A stand-down claim tied to one specific hazard track.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for Recovery; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Airburst corridor, not Recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. finding a previously detected object again to extend its observation arc.
- C: This describes Action envelope, not Recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes All-clear, not Recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 2

**Prompt - exact player copy:** the planetary-defense center receives a second case related to The Honest Warning: the recovered orbit gives a narrow damaging-airburst corridor over 180,000 people, while size and density ranges imply roughly 0.7 to 2 megatons TNT. Which conclusion correctly applies Airburst corridor to the observations and physics?

**Options - exact player copy:**

- A. Finding a previously detected object again to extend its observation arc.
- B. The places and people included in a protective response.
- C. The possible locations where atmospheric energy release may occur.
- D. A stand-down claim tied to one specific hazard track.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for Airburst corridor; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Recovery, not Airburst corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Action envelope, not Airburst corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. the possible locations where atmospheric energy release may occur.
- D: This describes All-clear, not Airburst corridor. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 3

**Prompt - exact player copy:** A teammate rechecks The Honest Warning using new evidence: apply the published, precommitted response ladder to the newly verified 180,000-person fragment corridor. Write the action threshold now, before new evidence or operational pressure can move it. Which conclusion correctly applies Action envelope to the observations and physics?

**Options - exact player copy:**

- A. Finding a previously detected object again to extend its observation arc.
- B. The possible locations where atmospheric energy release may occur.
- C. A stand-down claim tied to one specific hazard track.
- D. The places and people included in a protective response.

**Correct answer:** D

**Hint - exact player copy:** Use the stated evidence and the conditions for Action envelope; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Recovery, not Action envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Airburst corridor, not Action envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes All-clear, not Action envelope. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: Correct. the places and people included in a protective response.
### Review question 4

**Prompt - exact player copy:** An unseen case extends The Honest Warning: a faint point appears inside the fragment search box and moves consistently over three exposures. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which conclusion correctly applies All-clear to the observations and physics?

**Options - exact player copy:**

- A. A stand-down claim tied to one specific hazard track.
- B. Finding a previously detected object again to extend its observation arc.
- C. The possible locations where atmospheric energy release may occur.
- D. The places and people included in a protective response.

**Correct answer:** A

**Hint - exact player copy:** Use the stated evidence and the conditions for All-clear; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: Correct. a stand-down claim tied to one specific hazard track.
- B: This describes Recovery, not All-clear. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: This describes Airburst corridor, not All-clear. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Action envelope, not All-clear. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 5

**Prompt - exact player copy:** Before another Honest Warning decision, the team knows this: a faint point appears inside the fragment search box and moves consistently over three exposures. Before the record can be signed, identify which claims have independent support and which must remain unverified. Which conclusion correctly applies fragment recovery to the observations and physics?

**Options - exact player copy:**

- A. Finding a previously detected object again to extend its observation arc.
- B. ATTEST owns a claim against named criteria.
- C. The possible locations where atmospheric energy release may occur.
- D. The places and people included in a protective response.

**Correct answer:** B

**Hint - exact player copy:** Use the stated evidence and the conditions for fragment recovery; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Recovery, not fragment recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: Correct. aTTEST owns a claim against named criteria.
- C: This describes Airburst corridor, not fragment recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
- D: This describes Action envelope, not fragment recovery. It does not account for the quantities, conditions, or evidence in this planetary science case.
### Review question 6

**Prompt - exact player copy:** the planetary-defense center applies the lesson from The Honest Warning to this follow-up: the recovered orbit gives a narrow damaging-airburst corridor over 180,000 people, while size and density ranges imply roughly 0.7 to 2 megatons TNT. Which conclusion correctly applies fragment risk to the observations and physics?

**Options - exact player copy:**

- A. Finding a previously detected object again to extend its observation arc.
- B. The possible locations where atmospheric energy release may occur.
- C. BALANCE integrates unlike evidence at a decision boundary.
- D. The places and people included in a protective response.

**Correct answer:** C

**Hint - exact player copy:** Use the stated evidence and the conditions for fragment risk; do not choose an option merely because it names a familiar term.

**Option feedback - exact player copy:**

- A: This describes Recovery, not fragment risk. It does not account for the quantities, conditions, or evidence in this planetary science case.
- B: This describes Airburst corridor, not fragment risk. It does not account for the quantities, conditions, or evidence in this planetary science case.
- C: Correct. bALANCE integrates unlike evidence at a decision boundary.
- D: This describes Action envelope, not fragment risk. It does not account for the quantities, conditions, or evidence in this planetary science case.
**Optional review completion - exact player copy:** Excellent work. You went beyond the required mission and strengthened the ideas behind your decision.
## Quick concept review

- detect motion; fit orbit families and residuals; fuse optical and radar evidence; infer size cautiously; estimate energy; distinguish hazard from risk; test deflection against lead time; precommit thresholds; preserve anomalies; communicate conditional claims.

- **Mission takeaway:** Planetary defense is a chain of evidence, decisions, and proportionate action - not a single heroic technology.

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
| 6 | 2 | Add geometric leverage | CHOICE; astro-bench. |
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

- Bars start at 40 / 40 / 70 / 60 and remain between 0 and 100.
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


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `CHAR` roster owner: Lena Ortiz.
- `RADAR` roster owner: Lena Ortiz.
- `TOWN` roster owner: Lena Ortiz.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
