**FIRST PERSON LEARNING**

**Player-copy editing rule:** Within each displayed passage, state each fact, equation, variable definition, and instruction once. Integrate new givens into the existing wording; do not append a paraphrase of the setup. A source panel may repeat essential inputs so it stands alone, but render it as its own surface rather than concatenating it with the question setup. Go Deeper questions must still supply their own context and data without referring to earlier cases.

**SAFETY FACTOR**

AP Physics 1 Campaign Implementation Bible

**15 missions | 60 graded stops | Corbin Park | Implementation-ready content specification**

## AP Physics 1 Campaign Implementation Bible

**Project:** First Person Learning

**World:** Corbin Park, a closed lakeside amusement park

**Player role:** Newly appointed Ride Engineer

**Campaign size:** 15 missions, 60 graded stops, 7 final ride decisions

**Audience:** AP Physics 1 students

**Primary implementation target:** `books/midway.yml` plus the existing Midway theme assets

**Revision:** v2.1 - build-decision traceability and action-clarity rewrite

**Status:** Complete authored campaign specification. Before shipping, map each named interaction block to the repository's current schema, verify character identity against the theme roster, recalculate all imported values, pass the importer and gameplay tests, and complete the action-clarity and format-payload audit in Section 12.

> *The design test: if the physics is removed, the park cannot be certified. If the story is removed, the student still completes a cumulative AP Physics 1 review in which motion, forces, energy, momentum, rotation, oscillation, fluids, and experimental design become tools for later decisions.*

## 1. One-page implementation brief

Corbin Park has been closed since a full-park test ended with three rides stopping beyond their expected marks. The first explanation is a common braking or controls failure. The player reconstructs the missing physics behind each operating limit and discovers that several apparently independent speed records share one portable measuring system. An operator card then makes operations lead Maya Hart appear responsible for interrupting the test, but oscillation data show that her override stopped the pirate ship from being driven near resonance. When the rides finally appear ready, a direct measurement shows that the coaster loop has a 7.4 m crown radius where the certification drawing says 5.6 m. The mathematics was correct for the drawing; the drawing was not the present machine.

The player does not win by approving every ride. They win by making and defending seven correct decisions: reopen, reopen with limits, or remain closed. Physics changes what the crew believes, which tests they risk, which limits they adopt, and what finally goes on the Corbin Park Safety Certificate.

Implementation remains linear at the evidence level. Wrong answers teach, permit retry, and do not remove a required AP concept or story revelation. Player performance changes the four campaign bars, Recovery Point choices, optional dialogue, and visible lighting, while every student reaches the same reconstructible twists.

### Non-negotiable engine rules

- Import with the repository's current `tools/import-book.mjs` command for `books/midway.yml` and verify the exact theme identifier.
- Every lesson carries exactly one canonical format from `engine/content/normalize.js`.
- Never use suspended `STACK`.
- Preserve all ten `DERIVE` stops. In Safety Factor, building and defending relationships is part of the course.
- Place decisions with people, calculations at rooms/benches/boards, and operated formats at the fixture being controlled.
- Every question setup is exactly two sentences totaling 30-45 words.
- Every mission briefing body is four sentences and 30-70 words; sentence four begins “By the end of the mission”.
- Every mission outcome begins “Mission decision:” and directly answers that promised decision.
- Mission cards present `Worth knowing first` in this order: compact glossary terms, primer concepts, equations first needed today.
- Glossary entries use one line in `Term: definition` form. Equation entries contain only equation, job, symbols, and campaign reason.
- Auxiliary scene and fixture blurbs are one simple sentence.
- No pre-mission race, greeting list, or sightseeing warm-up is required.
- Grade by authored answer logic and units, never prose similarity.
- Every player-facing prompt names the expected submission type: number, setting, pair, ordered plan or derivation, allocation, selected claims, or conclusion.
- Every numerical prompt visibly supplies every input, constant, unit, governing equation, and requested answer unit; hidden interaction data never substitute for visible instructions.
- When a question requires multiple phases, state them in interface order. Calculation-plus-experiment questions use `CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET`.
- VERIFY locks equipment until the player commits a numerical prediction, then requires operation, measurement, and an evidence-limited conclusion.
- CONTROL names the single changed variable, every fixed condition, measurement timing, and whether restoration is required.
- DEGENERACY names both controls and requires a numerical parameter pair with units.
- Every PROBE station carries its own observed `reading`, explicit `expected` value, unit, and useful `load` or comparison text; all required stations must be sampled before commit.
- Every CHOICE authors exactly four separately stored choices, copies the correct label verbatim into `answer`, and gives each of the three wrong choices its own keyed rebuttal. Never encode the candidates as slash-separated prose.
- Before handoff, validate every nonplain interaction against the current `FORMATS` registry, format payload documentation, and `tools/import-book.mjs`; prose describing an intended panel never substitutes for the required canonical data block.
- All operating thresholds in this book are fictional Corbin Park specifications, not real amusement-ride guidance.
- Every stop declares exactly one `Area:` from the Section 3 areas-of-study table.
- Every fixture, including a fixture introduced by this campaign, is declared once in the Section 3 fixture table with its exact ID, place, allowed kind, and player-facing caption; every placement uses that exact backticked ID.
- Every stop includes `Call - exact player copy` so the implementation never has to invent the player's next instruction.
- Every beat heading declares exactly one firing condition: `On arrival at <PLACE>`, `After Stop N`, `After Stops N and M`, or `At mission end`; its payload declares world state, panel/HUD text, named-speaker dialogue, unlocks, and any next waypoint.
- Every person-placed stop names exactly one character in `Format/placement`; it is never assigned to a crew, role, or unnamed group.
- `Answer text` is player-facing instructional feedback and must not duplicate `Correct result`, which is the compact grading key. Every authored wrong option receives its own keyed, option-specific rebuttal.

## 2. Campaign promise, clock, and player experience

### Opening sequence - exact player copy, five sentences

You are the ride engineer, which means you prove which rides can carry people again. At Corbin Park, you will use physics to make the call. The inspectors return in fifteen days. The park has been shut since the October test; families need proof behind each ride limit. Maya Hart, the park operations lead, hands you the keys and says, “I want these gates open as much as anyone, but you have my word: a ride stays shut until you’re satisfied.”

**Opening-card requirement:** The character quote is the final player-visible text on this card; place no explanatory sentence after it. Keep it brief and natural: it should add the speaker’s concern or commitment rather than summarize the preceding setup. Show the whole opening together with one Continue action.


**Delivery:** Show all five sentences together over the normal midway view at spawn. One Continue dismisses the card, reveals the four-bar HUD, and activates Mission 1. Do not run `TRIAL`, `GREET`, or another map tour before the first real investigation.

### Concrete stakes

The county review begins after Mission 15. Without a defensible certificate, the park loses its short operating season and its staff lose months of work. A weak approval could put riders on a machine whose loads or stopping motion have not been proven. A weak refusal could close a safe ride and help end the park. The player's job is not optimism or caution; it is evidence.

### Three major reversals

1. **Twist 1 - Agreement was not independence:** Several historical speed reports agree because they depend on one portable speed wheel, spring bracket, and timing procedure. The replacement controller is still sealed in its crate.
2. **Twist 2 - The apparent operator error was the safe act:** Hart manually interrupted the October test. The pirate ship's 6.15 s natural period and 5.85 s drive interval show why continuing could have amplified the swing.
3. **Twist 3 - The calculation used the wrong machine:** The coaster passes when the 1974 drawing is used. A direct crown measurement gives 7.4 m rather than 5.6 m, erasing the fictional required speed margin.

### Four campaign metrics and recovery economy

| Metric | Start | Meaning |
|---|---:|---|
| Certificate Complete | 10% | Fraction of the seven-ride certificate supported by a resolved written decision. A closure can increase this bar if it is correctly justified. |
| Independent Proof | 20% | Fraction of the evidence package supported by measurements without a hidden shared dependency. |
| Test Reserve | 70% | Staff time, instrument time, test cycles, and plant capacity still available before inspection. |
| Safety Confidence | 70% | Evidence-based confidence that every approved configuration remains inside its stated fictional limit. |

State keys: `certificate_complete`, `independent_proof`, `test_reserve`, `safety_confidence`.

### Timer and Recovery Points

Each timer starts after the arrival beat closes and Stop 1 becomes active. It runs during player movement and questions. It pauses for required dialogue, loading, app backgrounding, accessibility menus, and system interruptions.

`RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`.

The time modifier is +1 at or before target, 0 through 125% of target, and -2 beyond 125%. A committed wrong answer costs one point. One RP raises one unlocked bar by 1%; up to 30 RP may be banked.

### Resolution order, locks, and failure

After each mission: play the outcome beat, apply named automatic changes, check for a 0% bar, award RP, allow allocation, apply an earned lock, show the quick review, and activate the next briefing. If any bar reaches 0%, restore the mission-start snapshot.

Certificate Complete locks only after all seven ride decisions are signed. Independent Proof locks after the Mission 15 attestation. Safety Confidence locks after every approved ride has a verified limit and every closed ride is isolated. Test Reserve never locks and must still reach 100% through accumulated recovery allocation for final victory. The final gate is 100/100/100/100 plus seven signed decisions.

## 3. World and location plan

| ID | Place | Physics/story function | Signature fixtures |
|---|---|---|---|
| WHEEL | Ferris Wheel machine room | Torque, rotational motion, wind and load limits | hub-schedule, gondola-shell, brake-drum, arm-nine-file |
| SHIP | Pirate Ship console | Forces, pendulum motion, period, damping, resonance | arm-trestles, drive-console, seat-frame, timing-trace |
| CAROUSEL | Carousel Drive House | Circular motion and hanging-angle limits | chain-rig, pole-jig, drive-panel, platform-jacks, controller-crate |
| BUMPER | Bumper Car Pavilion | Work-energy, momentum, impulse, rider forces | car-on-stands, dummy-rig, floor-console, console-card |
| COASTER | Coaster Station | Energy, power, circular contact, model geometry | profile-drawing, station-wheel, lift-panel, crown-tape |
| TOWER | Drop Tower Control | Kinematics, stopping acceleration, apparent weight | fin-stack, drop-log, brake-desk, witness-sheet |
| FLUME | Flume Pumphouse | Pressure, buoyancy, flow, hydraulic force, pump power | header-gauge, gate-ram, hull-scales, pump-curve |
| WORKSHOP | Brennan's workshop | Notebooks, procedures, shared measurement chain | bench-notebooks |
| PLANT | Shared Plant Room | Mechanical power and coupled operating limits | motor-plate |
| ARCADE | Boarded Arcade | Projectile transfer test using the stall cannon | stall-cannon |
| BOARD | Reopening Board | Visible certificate pieces and final decisions | certificate board |
| GATE | Front Gate | Final witnessed signature and public reopening state | certificate-table |

### Areas of study and fixture declarations

Every `Area:` value below is the exact name of a place marked `yes`. A stop may still be asked at a fixture in a different place.

| Place | Area of study? | Fixture | Kind | What it is |
| --- | --- | --- | --- | --- |
| Ferris Wheel machine room | yes | `hub-schedule` | board | The old stopping trace and the wheel loading schedule share this marked board. |
| Ferris Wheel machine room | yes | `gondola-shell` | vessel | A grounded gondola shell shows the carried mass and attachment points. |
| Ferris Wheel machine room | yes | `brake-drum` | vessel | The guarded drum shows its prediction mark, stop mark, and operating-rule card. |
| Ferris Wheel machine room | yes | `arm-nine-file` | rack | The arm-nine inspection record waits in a yellow evidence sleeve. |
| Ferris Wheel machine room | yes | `machine-room-board` | board | This board carries rotational and stopping calculations beside the wheel. |
| Ferris Wheel machine room | yes | `hub-board` | board | This board turns the hub trace into a signed kinematics prediction. |
| Ferris Wheel machine room | yes | `wheel-case-stand` | bench | The wheel case stand holds the shared-capacity cards and inspection condition. |
| Pirate Ship console | yes | `arm-trestles` | bench | The trestles support the force diagram and static-load model. |
| Pirate Ship console | yes | `drive-console` | board | The drive console plots interval, amplitude growth, and the reversal test. |
| Pirate Ship console | yes | `seat-frame` | bench | The seat frame shows the system boundary around ship and riders. |
| Pirate Ship console | yes | `timing-trace` | board | The timing trace places the free period beside the October drive interval. |
| Pirate Ship console | yes | `ship-console-board` | board | The console board carries support-load and pendulum-period calculations. |
| Pirate Ship console | yes | `ship-diagnostic-panel` | board | The panel combines vertical, lateral, offset, and October-event readings. |
| Pirate Ship console | yes | `ship-rule-console` | board | The joint-rule console records the forbidden timing band and shared shutdown rules. |
| Carousel Drive House | yes | `chain-rig` | rack | The chair-chain rig shows radius, angle, weight, and inward force. |
| Carousel Drive House | yes | `pole-jig` | rack | The pole jig fixes the chair radius used by the operating model. |
| Carousel Drive House | yes | `drive-panel` | board | The drive panel sets chair speed and prints the inclusive shutdown threshold. |
| Carousel Drive House | yes | `platform-jacks` | vessel | The jacks level the platform and restore its original shim state for the control. |
| Carousel Drive House | yes | `controller-crate` | rack | The sealed replacement controller can connect only to the isolated simulator. |
| Carousel Drive House | yes | `controller-record` | board | The record board shows serial, delivery, power, and installation evidence. |
| Carousel Drive House | yes | `joint-setting-board` | board | The joint setting board overlays the angle locus, measured radius, and power limit. |
| Bumper Car Pavilion | yes | `car-on-stands` | vessel | The raised car exposes mass, wheels, floor contact, and momentum data. |
| Bumper Car Pavilion | yes | `dummy-rig` | vessel | The padded dummy rig records stopping time, momentum change, and force. |
| Bumper Car Pavilion | yes | `floor-console` | board | The floor console locks the prediction before the dry stopping test. |
| Bumper Car Pavilion | yes | `console-card` | rack | The October operator card slot shows when the record is present or missing. |
| Bumper Car Pavilion | yes | `pavilion-board` | board | The pavilion board carries the energy ledger and collision calculation. |
| Bumper Car Pavilion | yes | `sensor-booking-board` | board | The booking board prices each proposed source of new evidence. |
| Bumper Car Pavilion | yes | `collision-evidence-panel` | board | The panel compares timing, amplitude, force, and the manual stop. |
| Coaster Station | yes | `profile-drawing` | board | The old profile drawing carries the provisional loop geometry and frozen verdict. |
| Coaster Station | yes | `station-wheel` | vessel | The axle encoder stand compares independent and portable-wheel residuals. |
| Coaster Station | yes | `lift-panel` | board | The lift panel shows train mass, rise, time, efficiency, and motor demand. |
| Coaster Station | yes | `crown-tape` | rack | The crown tape reveals the physical loop radius only after prediction freeze. |
| Coaster Station | yes | `station-board` | board | The station board carries contact and required-margin derivations. |
| Drop Tower Control | yes | `fin-stack` | rack | The fin stack shows the brake hardware used by the tested configuration. |
| Drop Tower Control | yes | `drop-log` | board | The drop log shows release height, direction, and predicted entry speed. |
| Drop Tower Control | yes | `brake-desk` | bench | The brake desk carries the response sweep and rider-load transfer chain. |
| Drop Tower Control | yes | `witness-sheet` | board | The witness sheet records uncertainty, geometry checks, and procedure identity. |
| Drop Tower Control | yes | `tower-release-desk` | bench | The release desk holds the claims Hart must verify before arming. |
| Flume Pumphouse | yes | `header-gauge` | vessel | The probe panel reveals expected and observed values one station at a time. |
| Flume Pumphouse | yes | `gate-ram` | vessel | The gate ram shows its piston areas, pressure transfer, and commanded opening. |
| Flume Pumphouse | yes | `hull-scales` | bench | The hull scales compare log weight with displaced-water buoyancy. |
| Flume Pumphouse | yes | `pump-curve` | board | The pump curve marks flow, head, efficiency, and required input power. |
| Flume Pumphouse | yes | `pumphouse-board` | board | The pump-power board carries continuity and power derivations. |
| Flume Pumphouse | yes | `flume-case-stand` | bench | The case stand compares flume evidence with the coaster certificate claim. |
| Brennan's Workshop | no | `bench-notebooks` | bench | The notebook bench holds procedures, calibration records, wind cases, and shared dependencies. |
| Brennan's Workshop | no | `workshop-diagnosis-board` | board | The diagnosis board joins controller, brake, sensor, and shared-kit evidence. |
| Brennan's Workshop | no | `casebook-table` | bench | The Casebook table pairs Hart's card with only the claims it supports. |
| Brennan's Workshop | no | `configuration-desk` | bench | The desk holds the exact bumper and tower configurations for attestation. |
| Brennan's Workshop | no | `uncertainty-board` | board | The uncertainty board stresses all seven ride decisions across supported ranges. |
| Brennan's Workshop | no | `work-allocation-board` | board | The final allocation board shows useful work, protected reserve, and dead ends. |
| Shared Plant Room | no | `motor-plate` | board | The shared plate shows the 55 kW limit and every competing load. |
| Boarded Arcade | no | `stall-cannon` | vessel | The stall cannon turns water-exit speed into an independent projectile range. |
| Reopening Board | no | `certificate-board` | board | Seven rows show which ride decisions have enough proof to sign. |
| Reopening Board | no | `reopening-board` | board | The Reopening Board displays the full Casebook beside seven blank verdicts. |
| Front Gate | no | `certificate-table` | bench | The certificate table holds the final seven claims and both signatures. |

The whole site is walkable, but doors create progression. The Workshop opens in Mission 5, the Plant Room in Mission 10, and the Arcade in Mission 11. The new controller appears in Mission 6, Hart's operator card in Mission 7, the pirate timing trace in Mission 8, the arm-nine file in Mission 9, the crown tape in Mission 14, and the witnessed drop test in Mission 12.

### Location escalation

| Missions | Places | Rule |
|---|---:|---|
| 1-4 | 1 | One local investigation; no touring |
| 5-10 | 2 | The first result creates the reason to travel |
| 11-15 | 3 | The route joins systems and evidence |

Because the entire midway is crossed in about ninety seconds and has no true far tier, “distance” is not used as an artificial lock. Evidence and enterable doors control progression.


### Landmark-only spaces and visible scene objects

These spaces are walkable and ungraded. They never add a required tour, question, or travel cost. Their access follows existing mission access; final routes open only after the completion gate below. Each object remains inspectable after its trigger.

| Space ID | Place | Before | Visible change |
|---|---|---|---|
| `ticket-court` | Ticket Court | Shut ticket windows face a row of stacked queue rails. | After Stop 52, the rails form the approved opening route; after Stop 60, the public gate opens. |
| `staff-room` | Staff Room | Seasonal staff uniforms hang in covers beside an old group photo. | After Stop 32, Hart’s card gets its verified explanation; after Stop 60, staff collect uniforms for the cleared rides. |
| `midway-walk` | Midway Walk | Dark ride signs face the silent coaster track. | Milestone cards gain status lamps as tests pass; final opening brings music and moving cleared rides while the coaster stays dark. |

### Persistent prop and scene contract

The public-gate latch is a scene component of `certificate-table`; it opens only under the final completion gate. The barricade around arm nine is the visible scene component of `arm-nine-file`.

Each mission below declares one Physical aftermath with a home in the existing fixture table. Its dated prop occupies its own place on that fixture; later pages never erase earlier evidence. All scene actions fire once from the accepted stop, persist through revisits, and restore from the mission-start snapshot on failure. Replaying a completed stop never repeats an action or grants resources. Labels always include text, not color alone. New observations remain hidden until the relevant measurement; accepted-answer labels appear only after acceptance. No prop change substitutes for the existing grading, timing, or evidence checks.

Carousel, Bumper Cars, and Drop Tower open in verified configurations. Pirate Ship, Ferris Wheel, and Log Flume open only within their final signed limits and shared schedule. Keep coaster CLOSED. Arm nine’s barrier stays through Mission 9; its outside inspection occurs only after Stop 59 funds it and returns PASS WITH OPERATING ENVELOPE. Remove the barrier then, not after Mission 9. The handback’s earlier removal would contradict the graded inspection requirement. Ride lights before final victory mark test status, not permission for public boarding.

## 4. Character bible

### Maya Hart - WHEEL park operations lead and mission authority

**First entrance:** At the Ferris Wheel, removing the brake arming key before a technician can repeat an unapproved powered test.

**Wants:** A defensible reopening before the season is lost.

**Blind spot:** Trusts experienced operators and remembered settings more than formal models.

**Gameplay use:** Stakes, procedures, operational choices, CASEBOOK, VALUE, ATTEST, and the final signature.

**Verbal habit:** “What can we sign our names to?”

**Arc:** Her missing operator card makes her look responsible for the October event. The player later proves that her interruption prevented resonance, and she ends by accepting a scientifically justified coaster closure.

### Linh Chen - BUMPER instrumentation and test lead

**First entrance:** At the bumper-car dummy, fastening separate accelerometers to the seat frame and floor pan.

**Wants:** Measurements that survive county review.

**Blind spot:** Initially treats separate displays as independent even when they share one upstream clock or calibration.

**Gameplay use:** Graphs, uncertainty, impulse, CONTROL, TRACE, VERIFY, HOLDOUT, and RESIDUAL.

**Verbal habit:** “What measured that?”

**Arc:** Chen discovers the shared chain, then insists that the coaster model face unseen physical geometry.

### Luka Kovač - TOWER mechanical lead, working the coaster and the flume

**First entrance:** At the coaster station, disassembling the portable speed wheel instead of declaring it sound from its service label.

**Wants:** Find worn hardware, replace it, and return safe machines to service.

**Blind spot:** Mechanical wear is familiar, so it becomes the first explanation for unrelated anomalies.

**Gameplay use:** Friction, work, energy, torque, physical geometry, DIAGNOSIS, and STRESS.

**Verbal habit:** “What changed on the machine?”

**Arc:** Kovač moves from replacing the likely part to measuring the system before naming a failure.

### Tunde Idowu - CAROUSEL controls engineer

**First entrance:** At the Carousel Drive House, refusing to open the replacement-controller crate until a controlled test can justify the change.

**Wants:** Separate command errors from mechanical response.

**Blind spot:** Treats controls and mechanics as separate systems even when a drive can excite mechanical resonance.

**Gameplay use:** Timing, thresholds, reversal tests, CONTROL, SWEEP, and TRIGGER.

**Verbal habit:** “Change one thing, then change it back.”

**Arc:** Idowu first defends the controls, then helps write the forbidden timing band that makes the pirate ship operable.

### Ruth Brennan - SHIP former chief engineer and keeper of the notebooks

**First entrance:** In the Workshop, placing eleven notebooks in date order while admitting that none contains a complete test procedure.

**Wants:** Preserve the park knowledge accumulated over forty-one years.

**Blind spot:** Treats a long history of uneventful operation as evidence that copied dimensions and settings remain correct.

**Gameplay use:** Procedures, dimensional checks, records versus condition, SEQUENCE, PROTOCOL, and ATTEST.

**Verbal habit:** “That is how we always ran it.”

**Arc:** Brennan accepts that the notebooks record what people did, not what the rides physically are now.

**Division ownership:** `SHIP` former chief engineer and ride-history authority.

### Ana Silva - WORKSHOP reliability engineer

**First entrance:** In Brennan's Workshop, separating current inspection records from inherited notebooks.

**Wants:** A repair plan that can be reproduced. **Blind spot:** Initially assumes documentation gaps imply mechanical failure. **Gameplay use:** `WORKSHOP` division ownership, procedure checks, and evidence triage. **Verbal habit:** “Which record can we repeat?”

### Priya Nair - COASTER geometry engineer

**First entrance:** At the Coaster Station, measuring the crown radius from the rail rather than the drawing.

**Wants:** A physically correct coaster model. **Blind spot:** Initially trusts survey marks more than operating data. **Gameplay use:** `COASTER` division ownership, geometry, circular motion, and holdout testing. **Verbal habit:** “Measure the curve we have.”

### Mateo Ruiz - FLUME hydraulics engineer

**First entrance:** In the Flume Pumphouse, checking pressure at every header station before touching the pump.

**Wants:** Stable flow without consuming shared reserve. **Blind spot:** Initially treats a good pump curve as sufficient system proof. **Gameplay use:** `FLUME` division ownership, pressure, continuity, power, and probe tests. **Verbal habit:** “Where does the head go?”

### Minor voices

Use an unnamed county clerk, ride mechanic, or seasonal worker only to show a consequence. No minor voice introduces a subplot or exists merely to ask a school question.

## 5. Character direction and non-cinematic delivery

- Introduce competence through an action under pressure.
- Restate a character's name and working role on first mention in every mission.
- Keep an ordinary beat to two short bubbles.
- Keep essential information in reviewable dialogue, panels, banners, objects, and the mission log.
- Do not require film, voice acting, lip sync, forced camera movement, or custom animation.
- A character may be wrong about an explanation, not casually wrong about a basic fact in their domain.
- Wrong-answer dialogue identifies the failed mechanism and permits retry.
- Named reactions occur before the system-owned outcome card, never inside it.
- Festoon lights return as certificate sections become defensible, including a justified closure.

## 6. Physics spine and recurring concepts

**Motion representations:** Introduce M1; practice M3/M5; retrieve M7/M10; transfer M14-M15.

**Systems and forces:** Introduce M2; practice M3; retrieve M7/M8; combine M10/M12; transfer M15.

**Circular motion:** Introduce M3; retrieve M9; combine M10/M13; transfer M14-M15.

**Work, energy, and power:** Introduce M4; practice M5; retrieve M10; combine M11/M13; transfer M14-M15.

**Momentum and impulse:** Introduce M7; practice M7; delayed retrieve M12; combine M12; transfer M15.

**Torque, rotational inertia, and angular momentum:** Introduce M9; practice M9; delayed retrieve M13; transfer M15.

**Oscillation and resonance:** Introduce/practice M8; delayed retrieve and combine M13; transfer M15.

**Fluids:** Introduce/practice M11; delayed retrieve M13; transfer M15.

**Gravitation:** Introduce M8 through Earth's predicted surface field; compare with a pendulum measurement; retrieve in coaster and final system decisions.

**Evidence independence and model limits:** Introduce M1/M4; reveal M6; retrieve M10/M12; transfer M14-M15.

Difficulty moves from L1-L2 in Missions 1-4, through L2-L4 in Missions 5-10, to L3-L5 in Missions 11-15. Later questions are harder because the player must choose, combine, and defend models, not because the arithmetic becomes unpleasant.

## 7. Clue ledger

| Plant/payoff | Objective observation | Initial interpretation | True meaning | Concept needed |
|---|---|---|---|---|
| M1 -> M6 | Three historical stop records drift the same way | One common brake or controller failed | The reports share a timing and calibration chain | Evidence independence |
| M1 -> M6 | One speed-wheel bracket accepts three springs | Efficient standardization | Spring response links supposedly independent speed estimates | Calibration dependency |
| M3 -> M6 | A controller replacement is listed without an installation record | Idowu's update may have failed | The controller remains sealed and caused nothing | Causal control and attestation |
| M4 -> M8 | Hart's operator card is missing | Hart may be hiding an error | The card records an intervention, not its motive or effect | Evidence versus interpretation |
| M5/M7 -> M8 | Free swing is 6.15 s; drive interval is 5.85 s | The timing is only slightly off | Repeated forcing near the natural period can amplify motion | Resonance |
| M9 -> M15 | Arm nine has a 41 mm indication | A visible mark is automatically unsafe | It requires a bounded wind/load envelope and an independent physical inspection | Torque plus evidence |
| M10 -> M14 | The historical coaster calculation has positive margin | The coaster is nearly ready | The calculation uses copied geometry | Model assumptions |
| M11 -> M13/M15 | The flume pump meets its curve | The flume can always run | The 55 kW motor and shared plant capacity constrain simultaneous operation | Power and coupled systems |
| M12 -> M15 | A witnessed drop test records 5.4 g below the 6.0 g limit | The whole tower is certified | Only the tested configuration, sensor, and procedure are certified | Attestation |
| M14 -> M15 | The crown radius is 7.4 m, not 5.6 m | A small drawing error | The required top speed rises enough to erase the fictional 1.0 m/s margin | Circular dynamics and energy |


## 7.1 Persistent world-state ledger

| Mission | Accepted trigger | Home fixture | State that persists | Next visible problem |
|---|---|---|---|---|
| 1 | `accepted_stop_4` | `brake-drum` | Maya Hart clips the predicted and measured stop strip to the brake drum. | At `arm-trestles`, a load bag rests on the trestles beside an old October photograph. |
| 2 | `accepted_stop_8` | `arm-trestles` | Ruth Brennan pins the LOAD REMOVED: ZERO RETURNED record beside the support model. | At `chain-rig`, the chair chain hangs beside a tilted platform mark. |
| 3 | `accepted_stop_12` | `chain-rig` | Tunde Idowu clips the RUN 4.00 M/S / STOP 4.20 M/S card to the chain rig. | At `floor-console`, a dry-floor test mark stops before three copied speed strips. |
| 4 | `accepted_stop_16` | `floor-console` | Linh Chen pins the DRY-FLOOR RESULT ONLY strip beside the floor console. | At `configuration-desk`, eleven notebooks lie open without one complete test sequence. |
| 5 | `accepted_stop_20` | `configuration-desk` | Ana Silva clips the EMPTY TEST ONLY procedure into the configuration folder. | At `workshop-diagnosis-board`, a sealed controller crate sits under an October report. |
| 6 | `accepted_stop_24` | `workshop-diagnosis-board` | Tunde Idowu pins the INSTALLED AFTER OCTOBER date strip beside the crate record. | At `casebook-table`, a worn operator card lies beneath the padded-stop force trace. |
| 7 | `accepted_stop_28` | `casebook-table` | Maya Hart places the recovered October card in the evidence sleeve. | At `timing-trace`, the drive ticks line up with the ship's free swing marks. |
| 8 | `accepted_stop_32` | `timing-trace` | Ruth Brennan pins the FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S card to the trace. | At `arm-nine-file`, a barricade stays around arm nine beneath a chalked inspection mark. |
| 9 | `accepted_stop_36` | `arm-nine-file` | Maya Hart clips the EXTERNAL INSPECTION REQUIRED card to the arm-nine sleeve. | At `profile-drawing`, a taped-over track drawing rests beside the independent axle sensor. |
| 10 | `accepted_stop_40` | `profile-drawing` | Priya Nair pins the EMPTY TEST ONLY card over the passenger release line. | At `pump-curve`, the flume header pulses beside the shared motor plate. |
| 11 | `accepted_stop_44` | `pump-curve` | Mateo Ruiz clips the 0.45 CUBIC METRES PER SECOND / 44.1 KW card to the pump curve. | At `witness-sheet`, two test dummies sit beside the signed parts list. |
| 12 | `accepted_stop_48` | `witness-sheet` | Linh Chen pins the TESTED CONFIGURATIONS ONLY clearance to the witness sheet. | At `motor-plate`, three start requests hang under one 55 kW plate. |
| 13 | `accepted_stop_52` | `motor-plate` | Maya Hart pins the joint operating schedule beneath the motor plate. | At `crown-tape`, the crown tape lies across a drawing whose curve no longer matches. |
| 14 | `accepted_stop_56` | `crown-tape` | Priya Nair hangs a CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED tag on the coaster release. | At `certificate-table`, families wait beyond a gate with seven unsigned ride rows. |
| 15 | `accepted_stop_60` | `certificate-table` | Maya Hart turns the front-gate key. | At `certificate-table`, the signed operating conditions remain beside the final status. |

## 8. Mission content contract

Every mission below supplies an exact briefing, primer, story event, beat script, route, character conflict, concepts, four stops, outcome, metric screen, and quick review. Every stop supplies a why-now reason, a two-sentence setup, story-science connection, player-facing prompt with action order and submission type, answer, mechanism, wrong-path feedback, state change, and the structured content required by its format. Numerical cards display all required inputs, constants, equations, units, and requested answer units before submission.

The repository importer and schema remain the final authority for field spelling. Do not replace an operated or diagnostic interaction with generic choices if a block needs remapping.


## 8.1 Final playable scene and ending card

**Completion gate:** accepted_stop_60 AND every existing final scientific/evidence requirement AND the existing final metric target. Acceptance arms the scene; if metric allocation is still required, play it once that allocation passes. A wrong answer, missing proof, or failed check never starts the success animation.

**One visible change:** The public front gate opens onto the cleared midway.

**The next sixty seconds:** 0–15 seconds: the gate opens and midway music begins. 15–40 seconds: the player walks past the turning Carousel, Ferris Wheel, and Pirate Ship, each running its signed configuration. 40–60 seconds: the six cleared sections show operating cards and the dark coaster carries its closure reason in the same view.

**Ending card - exact player copy:** The wheel turns above the lit midway. The ship swings within its posted timing rule, and the carousel music starts. Beyond the crowd, the coaster gate stays shut beneath its measured closure card. Corbin Park is open, with every promise on the certificate still visible.

**Delivery:** Keep player control and normal world view. No new graded stop follows the final accepted decision. The ending card appears after the player reaches the payoff view, or through an accessible View ending control that skips movement without skipping any scientific gate. Optional review and worked examples remain available through the completed mission menu.


### Standalone Go Deeper question contract

Each optional review question must work when copied out on its own. Supply its setting, givens, units, definitions, and any required figure within that question. Do not mention a mission title, a prior case, a teammate rechecking earlier work, a completed plan, or unseen cards, observations, or results. Do not assume that another review question was read. Choices, hints, and feedback obey the same rule. Use brief conceptual questions or complete applied problems; figures must match the question rather than merely share its course.

# Mission 1 - Three Clocks

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 1 - 15 DAYS UNTIL THE PARK REVIEW.

**Card title:** THREE CLOCKS

**Go now:** Go to the Ferris Wheel machine room and meet Maya Hart, the park operations lead, at the hub schedule.

**Card body:** 15 days until the park review. Three old traces lie beside a drum with one fresh stop mark. Today you decide whether the wheel brake explains all three bad stops.

**Objective:** Decide whether matching stop records prove one common brake failure.

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
  - id: safety_m01_we01
    title: Average velocity
    problem: A cart moves from x=2 m at t=1 s to x=10 m at t=5 s. Find average velocity.
    rule: Average velocity=(final position-initial position)/(elapsed time).
    steps:
    - 'Set up the relationship: Average velocity=(final position-initial position)/(elapsed time).'
    - v_avg=(10-2)/(5-1)=8/4=2 m/s.
    answer: Average velocity is +2 m/s in the positive direction.
    common_mistake: Use changes in both position and time, not final values alone.
  - id: safety_m01_we02
    title: Average acceleration
    problem: Velocity changes from +6 m/s to +2 m/s in 2 s. Find acceleration.
    rule: a=(v_final-v_initial)/Δt.
    steps:
    - 'Set up the relationship: a=(v_final-v_initial)/Δt.'
    - a=(2-6)/2=-2 m/s².
    answer: The object slows while moving in the positive direction.
    common_mistake: A negative acceleration does not specify motion direction by itself.
  - id: safety_m01_we03
    title: Constant braking
    problem: A cart starts at 4 m/s and brakes with a=-2 m/s². Find stopping time.
    rule: v=v0+at for constant acceleration.
    steps:
    - 'Set up the relationship: v=v0+at for constant acceleration.'
    - 0=4-2t gives t=2 s.
    answer: It stops after 2 s under this model.
    common_mistake: The final velocity at stopping is zero, not the initial velocity with a minus sign.
  - id: safety_m01_we04
    title: Distance during braking
    problem: A cart slows uniformly from 4 m/s to rest in 2 s without reversing. Find distance.
    rule: For constant acceleration, displacement=[(v0+v)/2]t.
    steps:
    - 'Set up the relationship: For constant acceleration, displacement=[(v0+v)/2]t.'
    - distance=[(4+0)/2](2)=4 m.
    answer: The cart travels 4 m before stopping.
    common_mistake: Initial speed times time would assume the cart never slowed.
  - id: safety_m01_we05
    title: Read a position-time slope
    problem: A straight position-time line passes through (0 s,1 m) and (3 s,7 m). Find velocity.
    rule: Position-time slope equals velocity.
    steps:
    - 'Set up the relationship: Position-time slope equals velocity.'
    - v=(7-1)/(3-0)=2 m/s.
    answer: Velocity is constant at 2 m/s; acceleration is zero.
    common_mistake: A straight position-time graph does not mean zero velocity.
    figure:
      kind: line
      xLabel: Time (s)
      yLabel: Position (m)
      caption: A straight position-time record.
      series:
      - name: Position (m)
        points:
        - - 0
          - 1
        - - 1
          - 3
        - - 2
          - 5
        - - 3
          - 7
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Position: Position is an object's location relative to a chosen zero point and positive direction.

Velocity: Velocity is how quickly position changes, including direction; its sign follows the chosen axis.

Acceleration: Acceleration is how quickly velocity changes; slowing down does not always mean negative acceleration.

Slope: Slope is rise divided by run on a graph; position-time slope is velocity and velocity-time slope is acceleration.

#### Primer concepts

- Choose a positive direction before interpreting signs.
- Graph slope describes how one measured quantity changes with another.
- Matching results are strongest when they come from independent measurements.

#### Equations first needed today

**Equation:** `average velocity = change in position / change in time`  
**What it is for:** finding average motion between two recorded points  
**Symbols:** position is measured in metres; time is measured in seconds; velocity is measured in metres per second.  
**Why this campaign needs it:** The park must turn written stop positions into motion before deciding whether the brake record is abnormal.

**Equation:** `v = v0 + at`  
**What it is for:** predicting velocity under constant acceleration  
**Symbols:** `v` is final velocity, `v0` is initial velocity, `a` is acceleration, and `t` is elapsed time.  
**Why this campaign needs it:** The Ferris Wheel brake prediction must be rebuilt before its recorded stopping mark can be judged.

**Crew on this mission - mission log:** Maya Hart - park operations lead; Linh Chen - instrumentation and test lead.

## Main story happening - designer summary

Hart prevents an unapproved powered retest. The player reconstructs the Ferris Wheel's slow braking motion and finds that its physical test agrees with a direct prediction. The historical three-ride agreement remains suspicious but cannot prove a shared brake failure because the dependencies behind the records are still unknown.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Ferris Wheel machine room | automatic**

**Trigger:** mission_1_arrival.

**World state:** Three old traces lie beside a drum with one fresh stop mark.

**Panel/HUD text:** `STOP 1 READY`

**Dialogue bubbles -** Maya Hart: “No repeat run until the old record can make a prediction.”

**Unlocks:** Stop 1.

**Beat 2 - After Stop 1 | automatic**

**Trigger:** accepted_stop_1.

**World state:** At `hub-schedule`, the dated accepted-result slip for Stop 1 reads: "Interval 0.0-3.0 s; a ≈ -0.50 m/s²; no reversal.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 2 READY`

**Dialogue bubbles -** Linh Chen: “Nice work. The record gives motion, not a cause. Turn it into a number we can test.”

**Unlocks:** Stop 2.

**Beat 3 - After Stops 2 and 3 | automatic**

**Trigger:** accepted_stop_2.

**World state:** At `machine-room-board`, the dated accepted-result slip for Stop 2 reads: "Submit 1.4 m/s; accept 1.32-1.48 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `PREDICTED STOP: 2.25 m`

**Dialogue bubbles -** Maya Hart: “Good thinking. Now the brake gets one low-speed test.”

**Unlocks:** Stop 4.

**Beat 4 - After Stop 4 | automatic**

**Trigger:** accepted_stop_3.

**World state:** At `hub-board`, the dated accepted-result slip for Stop 3 reads: "Order velocity → stop time → displacement → comparison; t=3.00 s, Δx=2.25 m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Exactly right. One brake matched. We still do not know whether those three records are three witnesses or one.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_4.

**World state:** At `brake-drum`, Maya Hart clips the predicted and measured stop strip to the brake drum. The dated prop remains here on later visits.

**Panel/HUD text:** `NEXT: LOAD PATH AT THE PIRATE SHIP`

**Dialogue bubbles -** Maya Hart: "That mark clears this test. It does not clear the park. But Chen finds the same test kit named on all three records; the park still needs the force checks."

**Unlocks:** Mission 2.

**Waypoint:** Activate Pirate Ship console.

### Physical aftermath — safety-m01

**Home:** `brake-drum`. **Before:** The dated mission-1 evidence holder at this fixture has no accepted record. Three old traces lie beside a drum with one fresh stop mark.
**After — exact action:** Maya Hart clips the predicted and measured stop strip to the brake drum.
**Trigger:** accepted_stop_4. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `arm-trestles`, a load bag rests on the trestles beside an old October photograph.
**Segue - exact player copy:** But Chen finds the same test kit named on all three records; the park still needs the force checks.

## Location plan

**One location:** Ferris Wheel machine room. All four stops move from the hub schedule to the brake drum without sightseeing.

## Characters and dramatic beat

Hart demonstrates authority by preventing a risky test. Chen values measurement but plants the campaign's central question: how independent are the records?

## Key concepts, explained here

Position, velocity, and acceleration describe different features of motion. The sign depends on the chosen axis. A graph can reveal motion through slope, but it does not identify a physical cause. A prediction followed by a direct measurement tests one brake; it does not automatically validate unrelated records.

## Stop 1 - Read the stopping trace

**Format/placement:** SWEEP, asked at `hub-schedule`.

**Metadata:** Concept: 2 - graph interpretation; Keystone: motion representations; Area: Drop Tower Control; Prerequisites: units and signed position; Learning role: INTRODUCE; Difficulty: L1; Story role: clue.

**Call - exact player copy:** Go to the hub schedule, in Ferris Wheel machine room.

**Stop reason - exact player copy:** October's disputed stop needs a fresh reading before anyone trusts the brake settings.

**Question card story setup - exact player copy:** The hub schedule records position but never labels velocity or acceleration. Sweep through its time points to determine when the gondola slows and whether its direction ever reverses during the recorded stop.

**Question card story-science connection - exact player copy:** The slowing interval and direction show which part of the position record can support a braking prediction.

**Question card prompt - exact player copy:** OPERATE: Sweep time from 0.0 s to 4.0 s and inspect position in metres. INTERPRET: Submit one interval in seconds and one conclusion stating whether velocity reaches zero or reverses.

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: time, label: "Time", min: 0, max: 4, step: 0.5, unit: s}
  response: {label: "Position past brake start", unit: m}
  points: [[0,0.00],[0.5,0.70],[1.0,1.25],[1.5,1.69],[2.0,2.00],[2.5,2.19],[3.0,2.25],[3.5,2.25],[4.0,2.25]]
  correct_region: {min: 0, max: 3.0}
  conclusion: "The slope falls smoothly to zero; motion never reverses."
```

**Correct result:** Interval 0.0-3.0 s; a ≈ -0.50 m/s²; no reversal.

**Answer text:** The gondola keeps moving forward while its velocity falls to zero; it does not reverse.

**Why:** The position keeps increasing, so velocity remains positive. The slope becomes smaller at a steady rate, which indicates negative acceleration under the chosen positive direction.

**Wrong-path feedback:** A flattening position graph means velocity approaches zero. It does not mean position becomes zero or the gondola moves backward.

**State/output:** Set `evidence_flags.wheel_trace_read = true`; illuminate the 0-3 s interval.

## Stop 2 - Put a speed on the trace

**Format/placement:** BALLPARK, asked at `machine-room-board`.

**Metadata:** Concept: 1 - average velocity and scale; Keystone: motion representations; Area: Drop Tower Control; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the machine-room board, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The braking interval is identified, but its entry speed still needs measuring.

**Question card story setup - exact player copy:** With the direction established, estimate the gondola's speed at the start of the marked braking interval. That speed is the input needed to predict where constant braking should stop it.

**Question card story-science connection - exact player copy:** The starting speed fixes how far this gondola should travel before the brake brings it to rest.

**Question card prompt - exact player copy:** Given `Delta x = 0.70 m` and `Delta t = 0.50 s`, use `v_avg = Delta x / Delta t`. Submit one starting-speed number in `m/s`.

```yaml
estimate:
  labels: ["Position change", "Elapsed time"]
  values: [0.70, 0.50]
  slots: [numerator, denominator]
  template: "speed = {numerator} m / {denominator} s"
  formula: "v_avg=0.70/0.50"
  correct: 1.4
  target: 1.4
  tolerance: 0.08
  unit: "m/s"
```

**Correct result:** Submit 1.4 m/s; accept 1.32-1.48 m/s.

**Answer text:** The first interval gives an average starting speed of 1.4 m/s.

**Why:** Velocity is position change divided by time. The first interval is short enough to estimate the starting value used by the constant-acceleration model.

**Wrong-path feedback:** Dividing time by distance gives seconds per metre, not speed. Follow the units.

**State/output:** Write `v0 = 1.50 m/s model value; first-bin estimate = 1.4 m/s` on the board and unlock the derivation.

## Stop 3 - Rebuild the brake prediction

**Format/placement:** DERIVE, asked at `hub-board`.

**Metadata:** Concept: 3 - constant-acceleration motion; Keystone: motion representations; Area: Drop Tower Control; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the hub calculation board, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The speed estimate is ready, so the brake test needs a prediction written before the run.

**Question card story setup - exact player copy:** Use the model starting speed and measured acceleration to derive the stopping time and distance. The result becomes the value the live brake test must meet without adjusting the target afterward.

**Question card story-science connection - exact player copy:** Stopping time and distance give the crew a fixed target against which to judge the live brake.

**Fixture source panel - exact player copy:** Use the model starting speed and measured acceleration to derive the stopping time and distance. The result becomes the value the live brake test must meet without adjusting the target afterward. Given v0 = 1.50 m/s, a = -0.50 m/s^2, and v = 0 m/s, use v = v0 + at and Delta x = v0t + 0.5at^2.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation plus stopping time in `s` and stopping distance in `m`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["Given `v0 = 1.50 m/s`, `a = -0.50 m/s^2`, and `v = 0 m/s`, use `v = v0 + at` and `Delta x = v0t + 0.5at^2`."]
  lines:
    - {id: velocity, expression: "v = v0 + at", rule: "constant-acceleration definition"}
    - {id: stop_time, expression: "0 = 1.50 - 0.50t, so t = 3.00 s", rule: "set final velocity to zero"}
    - {id: displacement, expression: "dx = v0 t + 0.5at^2", rule: "constant-acceleration displacement"}
    - {id: result, expression: "dx = 1.50(3.00) + 0.5(-0.50)(3.00)^2 = 2.25 m", rule: "substitute with signs and units"}
  order: [velocity, stop_time, displacement, result]
  decoys:
    - {expression: "dx = 1.50/3.00", rule: "divide distance by time"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `v=v0+at²`
2. `0=1.50−0.50t, so t=0.333 s`
3. `dx=v0t+at², omitting one-half`
4. `dx=1.50(3.00)+0.5(+0.50)(3.00)²=6.75 m`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Given `v0 = 1.50 m/s`, `a = -0.50 m/s^2`, and `v = 0 m/s`, use `v = v0 + at` and `Delta x = v0t + 0.5at^2`."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Rebuild the brake prediction in the form and units requested by the prompt"
  left_side: "v"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v = v0 + at", correct: true}
        - {text: "v = v0 + a(t²)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "0 = 1.50 - 0.50t, so t = 3.00 s", correct: true}
        - {text: "0=1.50−0.50t, so t=0.333 s", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "dx = v0 t + 0.5at^2", correct: true}
        - {text: "dx = v0 t + 1.0at^2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "dx = 1.50(3.00) + 0.5(-0.50)(3.00)^2 = 2.25 m", correct: true}
        - {text: "dx=1.50(3.00)+0.5(+0.50)(3.00)²=6.75 m", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Order velocity → stop time → displacement → comparison; t=3.00 s, Δx=2.25 m.

**Answer text:** Constant acceleration predicts that the gondola stops after 3.00 s and 2.25 m.

**Why:** Setting final velocity to zero gives the stop time. Substitution into the displacement equation gives the precommitted mark.

**Wrong-path feedback:** Keep the braking acceleration negative under the chosen forward-positive axis. A positive sign predicts speeding up.

**State/output:** Paint a temporary `2.25 m PREDICTION` line beside the brake drum.

## Stop 4 - Test one brake, not a theory

**Format/placement:** VERIFY, asked at `brake-drum`.

**Metadata:** Concept: 3 - prediction-measurement comparison; Keystone: model limits and evidence independence; Area: Brennan's workshop; Learning role: PRACTICE; Difficulty: L3; Story role: decision.

**Call - exact player copy:** Go to the brake drum, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The predicted stop is recorded and the low-speed test is ready to run.

**Question card story setup - exact player copy:** The prediction is fixed at 2.25 m before the brake turns. Run the low-speed test, record the stop, and decide what this single result can honestly support about this wheel.

**Question card story-science connection - exact player copy:** The distance error determines whether this brake passes today's local test, not whether every ride is safe.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Given `v0 = 1.50 m/s`, `a = -0.50 m/s^2`, and `v = 0 m/s`, use `v^2 = v0^2 + 2a Delta x` and submit a stopping-distance prediction in `m`; the brake controls stay locked until you commit. OPERATE: Arm and run one low-speed brake cycle. MEASURE: Record the stopping distance in `m`. INTERPRET: Submit one conclusion comparing prediction and measurement using the `0.08 m` tolerance and limiting the claim to this wheel configuration.

**Complete format-specific interaction block:**

```yaml
verify:
  prediction: {label: "Stopping distance", value: 2.25, unit: m, tolerance: 0.08}
  commit_required_before_unlock: true
  phase_order: [calculate_and_commit, operate, measure, interpret]
  action: "Arm and run one low-speed brake cycle"
  measurement: {value: 2.26, unit: m}
  failure_if_unmeasured: true
  correct_conclusion: "Ferris brake matches its model; park-wide cause remains unproven."
```

**Correct result:** Prediction 2.25 m; measured 2.26 m; difference 0.01 m ≤ 0.08 m; local pass.

**Answer text:** The Ferris Wheel brake passes this low-speed model test, but the result does not prove why other rides overshot.

**Why:** A direct test supports the configuration tested. Generalizing it to other rides would require independent evidence connecting their mechanisms.

**Wrong-path feedback:** “This brake passed” and “all brakes passed” are different claims. Match the conclusion to the system tested.

**State/output:** Set `ride_status.wheel = amber`, `evidence_flags.wheel_brake_verified = true`; tag the speed-wheel bracket.

## Mission outcome

Mission decision: The three records do not prove one brake fault. The Ferris Wheel stops at the predicted mark. Its brake still needs load and wind checks. The team must trace the shared test gear.

**Segue - exact player copy:** But Chen finds the same test kit named on all three records; the park still needs the force checks.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Maya Hart clips the predicted and measured stop strip to the brake drum. But Chen finds the same test kit named on all three records; the park still needs the force checks.

**Header:** MISSION 1 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 07:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** A test cycle is used, but an unnecessary park-wide brake replacement is stopped.  
**Automatic bar change:** Certificate +4 | Proof +4 | Reserve -3 | Confidence +3  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Within target, 0 wrong, 12 RP. Spend Certificate +3, Proof +4, Reserve +3, Confidence +2. Result: 15 | 26 | 72 | 71. Bank 0.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Independent evidence:** Independent evidence is a measurement that does not rely on the same hidden instrument, clock, calibration, or assumption as another measurement.

### Review question 1


**Prompt - exact player copy:** Which statement best explains independent evidence?

**Options - exact player copy:**

- A. Position is an object's location relative to a chosen zero point and positive direction.
- B. Independent evidence is a measurement that does not rely on the same hidden instrument, clock, calibration, or assumption as another measurement.
- C. Velocity is how quickly position changes, including direction; its sign follows the chosen axis.
- D. Acceleration is how quickly velocity changes; slowing down does not always mean negative acceleration.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for independent evidence. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes position. It does not answer the question about independent evidence.
- B: Correct. Independent evidence is a measurement that does not rely on the same hidden instrument, clock, calibration, or assumption as another measurement.
- C: This describes velocity. It does not answer the question about independent evidence.
- D: This describes acceleration. It does not answer the question about independent evidence.

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

- A. 4 m.
- B. 8 m/s.
- C. 8 m.
- D. 16 m.

**Correct answer:** C

**Hint - exact player copy:** Read position from the vertical axis.

**Option feedback - exact player copy:**

- A: This uses 2t rather than 2t².
- B: That is a velocity unit, not a position unit.
- C: Correct. 8 m.
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
- B. 8 m.
- C. 0 m/s.
- D. 8 m/s.

**Correct answer:** D

**Hint - exact player copy:** Differentiate the stated position function.

**Option feedback - exact player copy:**

- A: The derivative is 4t, which equals 8 at t=2.
- B: This gives position units, not velocity units.
- C: The position curve has a positive slope at t=2.
- D: Correct. 8 m/s.

### Review question 4


**Prompt - exact player copy:** The graph samples x(t)=2t² metres. What is its acceleration?

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

- A. 4 m/s².
- B. 2 m/s².
- C. 4t m/s².
- D. 0 m/s².

**Correct answer:** A

**Hint - exact player copy:** Acceleration is the second derivative of position.

**Option feedback - exact player copy:**

- A: Correct. 4 m/s².
- B: Differentiate twice: x′=4t and x″=4.
- C: 4t is the velocity expression, not the second derivative.
- D: The position curve has a changing slope.

### Review question 5


**Prompt - exact player copy:** Which statement best explains slope?

**Options - exact player copy:**

- A. Independent evidence is a measurement that does not rely on the same hidden instrument, clock, calibration, or assumption as another measurement.
- B. Slope is rise divided by run on a graph; position-time slope is velocity and velocity-time slope is acceleration.
- C. Position is an object's location relative to a chosen zero point and positive direction.
- D. Velocity is how quickly position changes, including direction; its sign follows the chosen axis.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for slope. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes independent evidence. It does not answer the question about slope.
- B: Correct. Slope is rise divided by run on a graph; position-time slope is velocity and velocity-time slope is acceleration.
- C: This describes position. It does not answer the question about slope.
- D: This describes velocity. It does not answer the question about slope.

### Review question 6


**Prompt - exact player copy:** The velocity graph is linear over the shown interval. Which description is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Velocity (m/s)",
  "caption": "Velocity decreases linearly",
  "series": [
    {
      "name": "Velocity",
      "points": [
        [
          0,
          8
        ],
        [
          1,
          6
        ],
        [
          2,
          4
        ],
        [
          3,
          2
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. It moves backward because acceleration is negative.
- B. Its acceleration is +2 m/s².
- C. The object moves in the positive direction with acceleration -2 m/s².
- D. Its acceleration is zero because the graph is straight.

**Correct answer:** C

**Hint - exact player copy:** Velocity gives direction; the slope gives acceleration.

**Option feedback - exact player copy:**

- A: Velocity remains positive throughout the interval.
- B: The velocity slope is negative.
- C: Correct. The object moves in the positive direction with acceleration -2 m/s².
- D: A straight velocity graph has constant acceleration; zero acceleration would require a horizontal line.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Position-time slope is velocity; velocity-time slope is acceleration.
- A negative acceleration does not automatically mean backward motion.
- Predict before measuring when a test will judge a model.
- **Mission takeaway:** Matching records are not independent evidence until their measurement paths are known.

# Mission 2 - What Pushes Back

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 2 - 14 DAYS UNTIL THE PARK REVIEW.

**Card title:** WHAT PUSHES BACK

**Go now:** Go to the Pirate Ship console and meet Luka Kovač, the mechanical lead, beside the seat frame.

**Card body:** 14 days until the park review. A load bag rests on the trestles beside an old October photograph. Today you decide whether the ship support fits the measured load.

**Objective:** Decide whether the pirate ship's supports fail under the required static load.

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
  - id: safety_m02_we01
    title: Calculate weight
    problem: A 3 kg object is near a planet's surface where g=10 m/s². Find its weight.
    rule: Weight magnitude W=mg.
    steps:
    - 'Set up the relationship: Weight magnitude W=mg.'
    - W=3(10)=30 N downward.
    answer: Weight is 30 N; mass remains 3 kg.
    common_mistake: Kilograms measure mass, not force.
  - id: safety_m02_we02
    title: Balance two horizontal forces
    problem: A 2 kg block is pulled right by 10 N and left by 4 N. Find acceleration.
    rule: Net force=ma, with right positive.
    steps:
    - 'Set up the relationship: Net force=ma, with right positive.'
    - F_net=10-4=6 N; a=6/2=3 m/s² right.
    answer: Acceleration is 3 m/s² to the right.
    common_mistake: Use net force, not the larger force alone.
  - id: safety_m02_we03
    title: Share a stationary load
    problem: A stationary 100 N board is supported equally at two ends. Find each support force.
    rule: Vertical equilibrium requires total upward force equal weight.
    steps:
    - 'Set up the relationship: Vertical equilibrium requires total upward force equal weight.'
    - 2F=100 N, so F=50 N at each end.
    answer: Each support supplies 50 N upward.
    common_mistake: Equal sharing must be stated or justified by symmetry.
  - id: safety_m02_we04
    title: Draw external forces
    problem: A book rests on a horizontal table. Choose the book as the system and list its forces.
    rule: A free-body diagram includes forces acting on the chosen object.
    steps:
    - Earth exerts downward weight on the book; the table exerts an upward normal force.
    - The book's force on the table acts on a different object and is excluded.
    answer: The stationary book has two balancing vertical forces.
    common_mistake: An action-reaction pair acts on two objects, not on the same free-body diagram.
  - id: safety_m02_we05
    title: Use a friction model
    problem: A block slides on a horizontal surface with normal force 20 N and kinetic friction coefficient 0.25. Find friction magnitude.
    rule: Kinetic friction f_k=μ_k N.
    steps:
    - 'Set up the relationship: Kinetic friction f_k=μ_k N.'
    - f_k=0.25(20)=5 N, opposite the sliding direction.
    answer: The friction force has magnitude 5 N.
    common_mistake: The friction coefficient is dimensionless; friction is a force.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

System: System is the object or group chosen for analysis; interactions crossing its boundary are external forces.

Free-body diagram: Free-body diagram is a drawing of one chosen system with every external force acting on it.

Weight: Weight is earth's gravitational force on an object, directed downward and equal to `mg` near the surface.

Equilibrium: Equilibrium is a state with zero net force and therefore no acceleration.

#### Primer concepts

- Draw forces acting on the chosen system, not forces it exerts on other objects.
- A stationary object may have several nonzero forces whose vector sum is zero.
- The normal force or support force is not automatically equal to one object's weight.

#### Equations first needed today

**Equation:** `ΣF = ma`  
**What it is for:** connecting the net external force to acceleration  
**Symbols:** `ΣF` is the vector sum of external forces, `m` is mass, and `a` is acceleration.  
**Why this campaign needs it:** The support load must be calculated from all carried mass before the ship is allowed to swing.

**Equation:** `weight = mg`  
**What it is for:** finding Earth's downward pull near the ground  
**Symbols:** `m` is mass and `g = 9.80 m/s²` is the local gravitational-field magnitude used by the campaign.  
**Why this campaign needs it:** The ship structure carries both the empty vehicle and its riders.

**Crew on this mission - mission log:** Luka Kovač - mechanical lead; Maya Hart - park operations lead.

## Main story happening - designer summary

Kovač favors worn support hardware as the cause. The player builds a correct system model, calculates the two-support load, and finds that the low-power static test agrees. Quiet lateral readings rule out a bent support as the cause of the October stopping anomaly, pushing the investigation from static support toward driven motion.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Pirate Ship console | automatic**

**Trigger:** mission_2_arrival.

**World state:** A load bag rests on the trestles beside an old October photograph.

**Panel/HUD text:** `STOP 5 READY`

**Dialogue bubbles -** Luka Kovač: “Before we blame controls, prove the machine can carry people while standing still.”

**Unlocks:** Stop 5.

**Beat 2 - After Stop 5 | automatic**

**Trigger:** accepted_stop_5.

**World state:** At `seat-frame`, the dated accepted-result slip for Stop 5 reads: "Choice 1 - ship plus all riders.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `SYSTEM CHOSEN`

**Dialogue bubbles -** Luka Kovač: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 6.

**Beat 3 - After Stops 6 and 7 | automatic**

**Trigger:** accepted_stop_6.

**World state:** At `arm-trestles`, the dated accepted-result slip for Stop 6 reads: "Order: isolate system → external forces → axis → component equation.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 8 READY`

**Dialogue bubbles -** Luka Kovač: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 8.

**Beat 4 - After Stop 8 | automatic**

**Trigger:** accepted_stop_7.

**World state:** At `ship-console-board`, the dated accepted-result slip for Stop 7 reads: "Total 162 kN; left support 81 kN; right support 81 kN.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Luka Kovač: “Exactly right. The supports carry the load. That does not tell us what the drive did.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_8.

**World state:** At `arm-trestles`, Ruth Brennan pins the LOAD REMOVED: ZERO RETURNED record beside the support model. The dated prop remains here on later visits.

**Panel/HUD text:** `NEXT QUESTION: WHAT FORCE MAKES A RIDE TURN?`

**Dialogue bubbles -** Ruth Brennan: "The frame came back. Keep that fact separate from the October story. Therefore Idowu must test the turning ride next; a support that holds weight still has to turn it safely."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Carousel Drive House.

### Physical aftermath — safety-m02

**Home:** `arm-trestles`. **Before:** The dated mission-2 evidence holder at this fixture has no accepted record. A load bag rests on the trestles beside an old October photograph.
**After — exact action:** Ruth Brennan pins the LOAD REMOVED: ZERO RETURNED record beside the support model.
**Trigger:** accepted_stop_8. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `chain-rig`, the chair chain hangs beside a tilted platform mark.
**Segue - exact player copy:** Therefore Idowu must test the turning ride next; a support that holds weight still has to turn it safely.

## Location plan

**One location:** Pirate Ship console and its attached seat-frame fixtures.

## Characters and dramatic beat

Kovač supplies a plausible mechanical explanation. Hart insists that passing a static check does not certify dynamic operation.

## Key concepts, explained here

A free-body diagram begins with a chosen system. External forces cross that system boundary. When acceleration is zero, the vector sum of forces is zero even though each support may carry a large force. Quiet sideways readings can rule out a tilted or bent load path.

## Stop 5 - Choose the system

**Format/placement:** CHOICE, asked at Luka Kovač beside `seat-frame`.

**Metadata:** Concept: 6 - system boundary; Keystone: systems and forces; Area: Pirate Ship console; Learning role: INTRODUCE; Difficulty: L1; Story role: obstacle.

**Call - exact player copy:** Talk to Luka Kovač, at the seat frame in Pirate Ship console.

**Stop reason - exact player copy:** The loading test is next, and the support calculation must include the riders as well as the ship.

**Question card story setup - exact player copy:** The empty ship and sixty riders will be tested together, but the notebooks list their masses separately. Choose a system that includes everything the two main supports must carry during the test.

**Question card story-science connection - exact player copy:** The system boundary determines which weight the two main supports must carry.

**Question card prompt - exact player copy:** Submit one system-setting choice for the static support test: ship plus all riders, riders only, one support only, or Earth plus the entire park.

**Choices:**

1.  Ship plus all riders **(correct)**

2.  Riders only

3.  One support only

4.  Earth plus the entire park

**Correct result:** Choice 1 - ship plus all riders.

**Answer text:** Choose the ship plus all riders as the system.

**Why:** Both supports act on the combined vehicle-and-rider load. Leaving riders outside omits weight; choosing one support alone does not describe what the pair carries.

**Wrong-path feedback:** (2) Riders only omits the ship's weight. (3) One support only analyzes a support instead of the carried load. (4) Earth plus the entire park makes the relevant support interaction internal and includes unrelated objects.

**State/output:** Draw the system boundary and unlock the FBD rail.

## Stop 6 - Build the force picture

**Format/placement:** SEQUENCE, asked at `arm-trestles`.

**Metadata:** Concept: 6 - free-body diagram method; Keystone: systems and forces; Area: Pirate Ship console; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the arm trestles, in Pirate Ship console.

**Stop reason - exact player copy:** The loaded system is defined, but its external forces have not yet been separated.

**Question card story setup - exact player copy:** With the combined system chosen, build its free-body diagram before inserting numbers. The ordered method prevents the ship's own forces on the supports from being drawn as extra forces on the ship.

**Question card story-science connection - exact player copy:** A correct force diagram prevents double-counting forces when predicting support loads.

**Question card prompt - exact player copy:** Submit one ordered plan containing all five free-body-diagram steps, from drawing the chosen system through writing `sum Fy = 0`.

```yaml
cards: ["Draw the chosen system", "Add total weight downward", "Add left and right support forces upward", "Choose vertical positive", "Write sum Fy = 0"]
order: ["Draw the chosen system", "Add total weight downward", "Add left and right support forces upward", "Choose vertical positive", "Write sum Fy = 0"]
```

**Correct result:** Order: isolate system → external forces → axis → component equation.

**Answer text:** Isolate the system, draw only external forces, choose an axis, and then write the component equation.

**Why:** Forces the ship exerts on the supports are third-law partners acting on another system. They do not belong on this diagram.

**Wrong-path feedback:** If a reaction force appears on the same diagram, ask which object that force acts on.

**State/output:** Display the completed FBD above the bench.

## Stop 7 - Divide the load

**Format/placement:** BALLPARK, asked at `ship-console-board`.

**Metadata:** Concept: 23 - static equilibrium; Keystone: systems and forces; Area: Pirate Ship console; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the support-load board, in Pirate Ship console.

**Stop reason - exact player copy:** The force diagram is complete and the gauges need targets before the load is added.

**Question card story setup - exact player copy:** The force diagram now shows only total weight and two upward support forces. Calculate the equal reading expected from each support so the live gauges have a prewritten target before loading.

**Question card story-science connection - exact player copy:** The predicted force at each support lets the crew check whether the centered load is shared correctly.

**Question card prompt - exact player copy:** Given empty-ship mass `12,000 kg`, `60` riders at `70 kg` each, `g = 10.0 m/s^2`, two equal supports, and `F_left + F_right = mg`, submit the included force streams, total weight in `kN`, and one support-force number in `kN`.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Total downward weight", value: 162, unit: kN}
  streams:
    - {id: left, label: "Left support", value: 81, unit: kN, count: true}
    - {id: right, label: "Right support", value: 81, unit: kN, count: true}
    - {id: drive, label: "Horizontal drive while off", value: 0, unit: kN, count: false}
  correct_action: "Count both vertical supports; exclude the unpowered drive."
```

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 7 - Divide the load"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Given empty-ship mass `12,000 kg`, `60` riders at `70 kg` each, `g = 10.0 m/s^2`, two equal supports, and `F_left + F_right = mg`, submit the included force streams, total weight in `kN`, and one support-force number in `kN`."
  payload: "```yaml balance: target: {label: \"Total downward weight\", value: 162, unit: kN} streams: - {id: left, label: \"Left support\", value: 81, unit: kN, count: true} - {id: right, label: \"Right support\", value: 81, unit: kN, count: true} - {id: drive, label: \"Horizontal drive while off\", value: 0, unit: kN, count: false} correct_action: \"Count both vertical supports; exclude the unpowered drive.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "force carried by one of two equal supports"
  unit: "kN"
  inputs:
    - {label: "Empty-ship mass", value: 12000, unit: "kg"}
    - {label: "Riders", value: 60, unit: "people"}
    - {label: "Mass per rider", value: 70, unit: "kg/person"}
    - {label: "Gravitational field", value: 10.0, unit: "N/kg"}
    - {label: "Equal supports", value: 2, unit: "supports"}
  operation: "[(empty mass + riders × mass per rider) × g] ÷ 2 ÷ 1000"
  formula: "F_support=[(12000+60×70)(10.0)]/(2×1000)"
  start: 0
  correctResult: 81
  tolerance: 0.1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Total 162 kN; left support 81 kN; right support 81 kN.

**Answer text:** Each support should carry 81 kN during the centered static test.

**Why:** In equilibrium, `Fleft + Fright - mg = 0`. Symmetry makes the two upward forces equal.

**Wrong-path feedback:** Do not set each support equal to the full weight; together they balance it.

**State/output:** Put 81 kN target marks on both gauges.

## Stop 8 - Diagnose the loaded frame

**Format/placement:** DIAGNOSIS, asked at `ship-diagnostic-panel`.

**Metadata:** Concept: 5 - net force and support response; Keystone: systems and forces; Area: Pirate Ship console; Learning role: COMBINE; Difficulty: L3; Story role: decision.

**Call - exact player copy:** Go to the loaded-frame panel, in Pirate Ship console.

**Stop reason - exact player copy:** The test mass is in place and the support readings can now be compared with the prediction.

**Question card story setup - exact player copy:** The centered test mass is now on the ship, and both supports settle near the predicted value. Read every channel, including the quiet lateral gauges, before naming the condition of the frame.

**Question card story-science connection - exact player copy:** Agreement across vertical and lateral channels determines whether the frame passes this static loading test.

**Question card prompt - exact player copy:** Submit one conclusion that explains the left reading `79.6 kN`, right reading `79.2 kN`, lateral force `0.3 kN`, and permanent offset `0.0 mm` together.

**Complete format-specific interaction block:**

```yaml
headline: "PIRATE SHIP STATIC LOAD TEST"
readings:
  - {zone: left, label: "Left vertical", value: "79.6 kN", state: quiet}
  - {zone: right, label: "Right vertical", value: "79.2 kN", state: quiet}
  - {zone: lateral, label: "Side force", value: "0.3 kN", state: quiet}
  - {zone: frame, label: "Permanent offset after unload", value: "0.0 mm", state: quiet}
  - {zone: october, label: "October stopping event", value: "still unexplained by the passing static test", state: alarm}
choices:
  - {id: weak_left, label: "Weak left support", mechanism: "Would shift load or leave offset."}
  - {id: bent_frame, label: "Bent frame", mechanism: "Would create lateral load or permanent offset."}
  - {id: static_pass, label: "Static load path matches the force model", mechanism: "Both vertical readings match and quiet channels stay quiet."}
  - {id: no_gravity, label: "Weight vanished", mechanism: "Measured upward forces still balance weight."}
answer: static_pass
```

**Correct result:** Select static_pass; reject weak-support, bent-frame, and gravity-change diagnoses.

**Answer text:** The static load path matches the force model; a weak support does not explain the October stop.

**Why:** The two readings sum to the expected weight, remain nearly equal, and show no lateral load or permanent offset.

**Wrong-path feedback:** (weak_left) A weak left support should shift the vertical load split or leave offset; neither occurs. (bent_frame) A bent frame should create lateral force or permanent offset; both channels stay quiet. (no_gravity) The measured support forces still balance weight, so gravity has not vanished.

**State/output:** Set `evidence_flags.ship_static_pass = true`; support lamps turn amber.

## Mission outcome

Mission decision: A weak support did not cause the October stop. The loaded frame holds the expected weight. It returns to zero after the load is gone. The next test will study the force that turns a ride.

**Segue - exact player copy:** Therefore Idowu must test the turning ride next; a support that holds weight still has to turn it safely.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ruth Brennan pins the LOAD REMOVED: ZERO RETURNED record beside the support model. Therefore Idowu must test the turning ride next; a support that holds weight still has to turn it safely.

**Header:** MISSION 2 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 07:30`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Static loading uses one test block while ruling out a structural explanation.  
**Automatic bar change:** Certificate +3 | Proof +4 | Reserve -3 | Confidence +4  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** 12 RP: Certificate +3, Proof +3, Reserve +3, Confidence +3. Result from the canonical path: 23 | 35 | 70 | 82.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Normal force:** Normal force is a contact force perpendicular to a surface.
- **Tension:** Tension is a pulling force carried along a rope, chain, or support member.

### Review question 1


**Prompt - exact player copy:** Which statement best explains normal force?

**Options - exact player copy:**

- A. Tension is a pulling force carried along a rope, chain, or support member.
- B. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.
- C. Free-body diagram is a drawing of one chosen system with every external force acting on it.
- D. Normal force is a contact force perpendicular to a surface.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for normal force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes tension. It does not answer the question about normal force.
- B: This describes system. It does not answer the question about normal force.
- C: This describes free-body diagram. It does not answer the question about normal force.
- D: Correct. Normal force is a contact force perpendicular to a surface.

### Review question 2


**Prompt - exact player copy:** Which statement best explains tension?

**Options - exact player copy:**

- A. Tension is a pulling force carried along a rope, chain, or support member.
- B. Normal force is a contact force perpendicular to a surface.
- C. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.
- D. Free-body diagram is a drawing of one chosen system with every external force acting on it.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for tension. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Tension is a pulling force carried along a rope, chain, or support member.
- B: This describes normal force. It does not answer the question about tension.
- C: This describes system. It does not answer the question about tension.
- D: This describes free-body diagram. It does not answer the question about tension.

### Review question 3


**Prompt - exact player copy:** Which statement best explains system?

**Options - exact player copy:**

- A. Normal force is a contact force perpendicular to a surface.
- B. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.
- C. Tension is a pulling force carried along a rope, chain, or support member.
- D. Free-body diagram is a drawing of one chosen system with every external force acting on it.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for system. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes normal force. It does not answer the question about system.
- B: Correct. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.
- C: This describes tension. It does not answer the question about system.
- D: This describes free-body diagram. It does not answer the question about system.

### Review question 4


**Prompt - exact player copy:** Which statement best explains free-body diagram?

**Options - exact player copy:**

- A. Normal force is a contact force perpendicular to a surface.
- B. Tension is a pulling force carried along a rope, chain, or support member.
- C. Free-body diagram is a drawing of one chosen system with every external force acting on it.
- D. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for free-body diagram. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes normal force. It does not answer the question about free-body diagram.
- B: This describes tension. It does not answer the question about free-body diagram.
- C: Correct. Free-body diagram is a drawing of one chosen system with every external force acting on it.
- D: This describes system. It does not answer the question about free-body diagram.

### Review question 5


**Prompt - exact player copy:** Which statement best explains weight?

**Options - exact player copy:**

- A. Normal force is a contact force perpendicular to a surface.
- B. Tension is a pulling force carried along a rope, chain, or support member.
- C. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.
- D. Weight is earth's gravitational force on an object, directed downward and equal to mg near the surface.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for weight. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes normal force. It does not answer the question about weight.
- B: This describes tension. It does not answer the question about weight.
- C: This describes system. It does not answer the question about weight.
- D: Correct. Weight is earth's gravitational force on an object, directed downward and equal to mg near the surface.

### Review question 6


**Prompt - exact player copy:** Which statement best explains equilibrium?

**Options - exact player copy:**

- A. Equilibrium is a state with zero net force and therefore no acceleration.
- B. Normal force is a contact force perpendicular to a surface.
- C. Tension is a pulling force carried along a rope, chain, or support member.
- D. System is the object or group chosen for analysis; interactions crossing its boundary are external forces.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Equilibrium is a state with zero net force and therefore no acceleration.
- B: This describes normal force. It does not answer the question about equilibrium.
- C: This describes tension. It does not answer the question about equilibrium.
- D: This describes system. It does not answer the question about equilibrium.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Choose the system before drawing forces.
- A stationary object can carry large forces with zero net force.
- Third-law partner forces act on different objects.
- **Mission takeaway:** A static pass rules out a weak support under that load; it does not certify driven motion.

# Mission 3 - Turning Inward

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 3 - 13 DAYS UNTIL THE PARK REVIEW.

**Card title:** TURNING INWARD

**Go now:** Go to the Carousel Drive House and meet Tunde Idowu, the controls engineer, at the hanging-chair rig.

**Card body:** 13 days until the park review. The chair chain hangs beside a tilted platform mark. Today you decide which carousel speed stays inside the angle limit.

**Objective:** Set and test a safe carousel speed from the required inward force.

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
  - id: safety_m03_we01
    title: Centripetal acceleration
    problem: An object moves at 6 m/s on a circle of radius 3 m. Find inward acceleration.
    rule: a_c=v²/r.
    steps:
    - 'Set up the relationship: a_c=v²/r.'
    - a_c=6²/3=36/3=12 m/s².
    answer: Acceleration is 12 m/s² toward the center.
    common_mistake: Constant speed still allows changing velocity direction.
  - id: safety_m03_we02
    title: Required inward force
    problem: A 2 kg object moves at 4 m/s on radius 2 m. Find net inward force.
    rule: F_inward=mv²/r.
    steps:
    - 'Set up the relationship: F_inward=mv²/r.'
    - F_inward=2(4²)/2=16 N.
    answer: The net inward force must be 16 N.
    common_mistake: Centripetal force is the net inward force, not an extra independent force.
  - id: safety_m03_we03
    title: Speed-radius tradeoff
    problem: Two circular motions have the same inward acceleration. The second radius is four times the first. Compare speeds.
    rule: At fixed a_c, v=sqrt(a_c r).
    steps:
    - 'Set up the relationship: At fixed a_c, v=sqrt(a_c r).'
    - v2/v1=sqrt(r2/r1)=sqrt(4)=2.
    answer: The second speed is twice the first.
    common_mistake: Speed scales with the square root of radius here, not with radius itself.
  - id: safety_m03_we04
    title: Direction after release
    problem: A small object moves in a horizontal circle and its string breaks. Neglect all horizontal forces afterward. What is its initial path?
    rule: Velocity is tangent to the circle; the string supplied inward acceleration.
    steps:
    - Immediately before breaking, velocity points tangent to the circular path.
    - Without horizontal net force, that velocity remains unchanged.
    answer: The object initially travels along the tangent.
    common_mistake: It does not suddenly fly radially outward from the center.
  - id: safety_m03_we05
    title: A conical pendulum ratio
    problem: A suspended mass follows a horizontal circle with inward acceleration 5 m/s² where g=10 m/s². Find tan θ, where θ is string angle from vertical.
    rule: tan θ=a_c/g from horizontal and vertical tension components.
    steps:
    - 'Set up the relationship: tan θ=a_c/g from horizontal and vertical tension components.'
    - tan θ=5/10=0.5, so θ≈26.6° if an angle is needed.
    answer: The string angle satisfies tan θ=0.5.
    common_mistake: Measure the angle from vertical for this ratio.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Uniform circular motion: Uniform circular motion is motion around a circle at constant speed while velocity changes direction.

Centripetal acceleration: Centripetal acceleration is acceleration directed toward the center of a circular path.

Radial direction: Radial direction is the inward or outward direction along a circle's radius.

Tangential direction: Tangential direction is the direction touching a circular path at one point; instantaneous velocity points this way.

#### Primer concepts

- Constant speed does not mean zero acceleration when direction changes.
- “Centripetal force” is the name for the net inward force, not an additional force.
- Commit a safety threshold before seeing the test result.

#### Equations first needed today

**Equation:** `ac = v²/r`  
**What it is for:** finding the inward acceleration of circular motion  
**Symbols:** `ac` is centripetal acceleration, `v` is tangential speed, and `r` is path radius.  
**Why this campaign needs it:** The chair angle and chain force depend on how sharply the ride turns at its operating speed.

**Equation:** `ΣFin = mv²/r`  
**What it is for:** connecting real inward forces to circular motion  
**Symbols:** `ΣFin` is net inward force and `m`, `v`, and `r` are mass, speed, and radius.  
**Why this campaign needs it:** The park must set a speed whose required inward force can be supplied by the chair chains.

**Crew on this mission - mission log:** Tunde Idowu - controls engineer; Luka Kovač - mechanical lead.

## Main story happening - designer summary

The player derives the inward acceleration, holds the chair inside its fictional 20-degree limit, and separates a platform-tilt effect from a speed effect by reversal. The ride passes at 4.0 m/s with a shutdown threshold at 4.20 m/s. A listed controller replacement becomes suspicious, but no installation record is found.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Carousel Drive House | automatic**

**Trigger:** mission_3_arrival.

**World state:** The chair chain hangs beside a tilted platform mark.

**Panel/HUD text:** `STOP 9 READY`

**Dialogue bubbles -** Tunde Idowu: “We do not replace a cause we have not tested.”

**Unlocks:** Stop 9.

**Beat 2 - After Stop 9 | automatic**

**Trigger:** accepted_stop_9.

**World state:** At `chain-rig`, the dated accepted-result slip for Stop 9 reads: "Order: radial acceleration → force balance → tangent relation; ac=v²/r inward.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 10 READY`

**Dialogue bubbles -** Tunde Idowu: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 10.

**Beat 3 - After Stops 10 and 11 | automatic**

**Trigger:** accepted_stop_10.

**World state:** At `drive-panel`, the dated accepted-result slip for Stop 10 reads: "Maximum 4.22 m/s; submit operator setting 4.20 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 12 READY`

**Dialogue bubbles -** Luka Kovač: “Good thinking. The tilt was real. It was not the speed command.”

**Unlocks:** Stop 12.

**Beat 4 - After Stop 12 | automatic**

**Trigger:** accepted_stop_11.

**World state:** At `platform-jacks`, the dated accepted-result slip for Stop 11 reads: "Select level/unlevel control; response changes 2.4° → 0.1° → 2.4°.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Tunde Idowu: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_12.

**World state:** At `chain-rig`, Tunde Idowu clips the RUN 4.00 M/S / STOP 4.20 M/S card to the chain rig. The dated prop remains here on later visits.

**Panel/HUD text:** `NO INSTALLATION SIGN-OFF`

**Dialogue bubbles -** Tunde Idowu: "Level first. Then speed. Then sign. But Silva cannot find an install date for the new controller; the next evidence trail runs through the bumper stop and workshop."

**Unlocks:** Mission 4.

**Waypoint:** Activate Bumper Car Pavilion.

### Physical aftermath — safety-m03

**Home:** `chain-rig`. **Before:** The dated mission-3 evidence holder at this fixture has no accepted record. The chair chain hangs beside a tilted platform mark.
**After — exact action:** Tunde Idowu clips the RUN 4.00 M/S / STOP 4.20 M/S card to the chain rig.
**Trigger:** accepted_stop_12. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `floor-console`, a dry-floor test mark stops before three copied speed strips.
**Segue - exact player copy:** But Silva cannot find an install date for the new controller; the next evidence trail runs through the bumper stop and workshop.

## Location plan

**One location:** Carousel Drive House and chair rig.

## Characters and dramatic beat

Idowu rejects replacement by assumption. Kovač finds a genuine mechanical issue - platform tilt - but accepts that it does not explain the shared October record.

## Key concepts, explained here

Velocity changes when direction changes. A chair moving around the carousel therefore accelerates inward even at constant speed. Real forces, here chain tension and weight, combine to provide the net inward force. The hanging angle makes the inward requirement visible.

## Stop 9 - Derive the inward acceleration

**Format/placement:** DERIVE, asked at `chain-rig`.

**Metadata:** Concept: 9 - circular acceleration; Keystone: circular motion; Area: Carousel Drive House; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the chair-chain rig, in Carousel Drive House.

**Stop reason - exact player copy:** The chair's steady speed has hidden the acceleration caused by its changing direction.

**Question card story setup - exact player copy:** The chair travels at steady speed, but its velocity arrow turns continuously around the platform. Build the relation that converts that direction change into the inward acceleration used by the force model.

**Question card story-science connection - exact player copy:** The inward acceleration establishes the force needed to hold the chair on its circular path.

**Fixture source panel - exact player copy:** The chair travels at steady speed, but its velocity arrow turns continuously around the platform. Build the relation that converts that direction change into the inward acceleration used by the force model. Starting from Delta v / v = Delta s / r and Delta s = v Delta t

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit one ordered symbolic derivation ending with the magnitude and direction of centripetal acceleration.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The chair travels at steady speed, but its velocity arrow turns continuously around the platform.", "Starting from `Delta v / v = Delta s / r` and `Delta s = v Delta t`"]
  lines:
    - {id: similar, expression: "dv/v = ds/r", rule: "similar triangles for velocity and position"}
    - {id: arc, expression: "ds = v dt", rule: "distance traveled at speed v"}
    - {id: divide, expression: "dv/dt = v(v/r)", rule: "substitute and divide by dt"}
    - {id: result, expression: "ac = v^2/r toward the center", rule: "acceleration is velocity change per time"}
  order: [similar, arc, divide, result]
  decoys:
    - {expression: "ac = v/r", rule: "divide speed by radius once"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `dv/v=dr/r, using radial change instead of arc length`
2. `ds=r dt`
3. `dv/dt=v/r`
4. `a_c=v/r toward the center`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The chair travels at steady speed, but its velocity arrow turns continuously around the platform.", "Starting from `Delta v / v = Delta s / r` and `Delta s = v Delta t`"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the inward acceleration in the form and units requested by the prompt"
  left_side: "dv/v"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "dv/v = ds/r", correct: true}
        - {text: "dv / v = dr / r", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ds = v dt", correct: true}
        - {text: "ds=r dt", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "dv/dt = v(v/r)", correct: true}
        - {text: "dv/dt = v/r per second", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "ac = v^2/r toward the center", correct: true}
        - {text: "a_c=v/r toward the center", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Order: radial acceleration → force balance → tangent relation; ac=v²/r inward.

**Answer text:** Uniform circular motion has inward acceleration `v²/r` even when speed is constant.

**Why:** Direction changes by the same small angle as the position around the circle. Dividing the velocity change by time produces `v²/r`.

**Wrong-path feedback:** Constant speed fixes the velocity magnitude, not its direction.

**State/output:** Illuminate inward arrows on the carousel model.

## Stop 10 - Hold the chair inside its limit

**Format/placement:** HOLD, asked at `drive-panel`.

**Metadata:** Concept: 11 - speed, radius, and chair angle; Keystone: circular motion; Area: Carousel Drive House; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the Carousel drive panel, in Carousel Drive House.

**Stop reason - exact player copy:** The circular-motion model is ready, but the operator still needs a usable speed setting.

**Question card story setup - exact player copy:** The live angle shows whether the force balance remains acceptable.

**Question card story-science connection - exact player copy:** The speed limit keeps the chair's angle within the allowed range.

**Question card prompt - exact player copy:** Given `r = 5.0 m`, `g = 9.80 m/s^2`, `theta_max = 20.0 degrees`, and `tan theta = v^2/(rg)`, operate the chair-speed control for `30 s` and submit one maximum safe speed setting in `m/s`.

**Complete format-specific interaction block:**

```yaml
hold:
  control: {id: speed, label: "Chair speed", min: 2.5, max: 5.0, step: 0.05, unit: m/s}
  response: {label: "Chair angle", formula: "theta=atan(v^2/(rg))", unit: deg}
  fixed: {r: 5.0, g: 9.80}
  band: {min: 0, max: 20.0, inclusive: true}
  duration: 12
  correct_setting: {max: 4.20, unit: m/s, tolerance: 0.05}
  conclusion: "A 4.20 m/s maximum setting keeps the chair within the 20.0-degree limit."
```

**§7 build completion - HOLD:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
hold:
  quantity: "controlled response"
  control: "operator setting"
  hold: 50
  band: 5
  narrowTo: 2
  disturbances: [{time:1,delta:4},{time:2,delta:-6},{time:3,delta:3}]
```

**Handback 4 canonical interaction block - HOLD:**

**Handback 5 canonical interaction block - HOLD:**

```yaml
hold:
  quantity: "chair speed"
  unit: "m/s"
  control: "chair-speed control"
  hold: 4.20
  band: 0.20
  narrowTo: 0.05
  duration: 30
  direction: lower
  authority: 0.50
  pass: 0.80
  disturbances:
    - {label: "loaded-chair pull", at: 5, amount: 0.08}
    - {label: "uneven rider load", at: 13, amount: 0.06}
    - {label: "gust across the platform", at: 21, amount: -0.04}
  correctConclusion: "Use the control to keep chair speed within 4.20 ± 0.20 m/s for at least 80% of the run."
```

**Correct result:** Maximum 4.22 m/s; submit operator setting 4.20 m/s.

**Answer text:** A 4.20 m/s threshold keeps the five-metre-radius chair within the 20.0-degree campaign limit.

**Why:** `tan θ = v²/(rg)`. Speed enters squared, so a modest increase can use the remaining angle margin quickly.

**Wrong-path feedback:** Do not compare speed directly with degrees; use the force balance that connects them.

**State/output:** Store `carousel_speed_candidate = 4.20`.

## Stop 11 - Separate tilt from speed

**Format/placement:** CONTROL, asked at `platform-jacks`.

**Metadata:** Concept: 11 - controlled reversal; Keystone: model limits and evidence independence; Area: Brennan's workshop; Learning role: APPLY; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the platform jacks, in Carousel Drive House.

**Stop reason - exact player copy:** The chairs lean differently at the same command, so speed alone cannot explain the imbalance.

**Question card story setup - exact player copy:** Left-side chairs hang farther out than right-side chairs at the same drive command. Change one platform condition, reverse it, and determine whether leveling removes the asymmetry without changing the commanded speed.

**Question card story-science connection - exact player copy:** A reversible leveling test distinguishes platform tilt from a change in drive speed.

**Question card prompt - exact player copy:** BASELINE: At commanded speed `4.00 m/s`, measure the left-right chair-angle difference in degrees. CHANGE ONE CONTROL: Remove the platform shims to level the platform while keeping speed `4.00 m/s`, rider mass, chair radius, and drive program fixed. MEASURE: Record the angle difference after leveling. RESTORE: Reinstall the shims and remeasure; restoration is required. INTERPRET: Submit one conclusion naming whether platform tilt causes the asymmetry.

**Complete format-specific interaction block:**

```yaml
control:
  baseline: {label: "Left-right angle difference", value: 2.4, unit: deg}
  noise_band: 0.2
  changed_variable: "Platform level via removal and restoration of shims"
  fixed_conditions: ["Commanded speed 4.00 m/s", "Rider mass", "Chair radius", "Drive program"]
  measurement_timing: [baseline, after_leveling, after_shim_restoration]
  state_measurements: {baseline_deg: 2.4, leveled_deg: 0.1, restored_deg: 2.4}
  candidates:
    - {id: level, label: "Level the platform, then restore the shims", response: -2.3, correct: true}
    - {id: speed, label: "Lower all-chair speed", response: -0.1, correct: false}
    - {id: load, label: "Remove one rider", response: 0.1, correct: false}
  reversal_required: true
```

**Correct result:** Select level/unlevel control; response changes 2.4° → 0.1° → 2.4°.

**Answer text:** Platform tilt causes the left-right angle difference; the drive speed affects both sides together.

**Why:** The chosen intervention changes only level and reverses the response beyond the noise band.

**Wrong-path feedback:** (speed) Lowering all-chair speed changes both sides together, so it cannot isolate the left-right platform tilt. (load) Removing one rider changes the load asymmetrically and confounds the tilt test.

**State/output:** Level the platform permanently; set `evidence_flags.carousel_tilt_fixed = true`.

## Stop 12 - Write the rule before the run

**Format/placement:** TRIGGER, asked at `drive-panel`.

**Metadata:** Concept: 35 - precommitted threshold; Keystone: circular motion and model limits; Area: Carousel Drive House; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the Carousel drive panel, in Carousel Drive House.

**Stop reason - exact player copy:** The leveling test is complete and the crew must set the shutdown rule before the next run.

**Question card story setup - exact player copy:** The rule must keep every chair at or below the stated limit.

**Question card story-science connection - exact player copy:** An inclusive speed threshold tells the operator exactly when the carousel must stop.

**Question card prompt - exact player copy:** Given `r = 5.0 m`, `g = 9.80 m/s^2`, `theta_max = 20.0 degrees`, and `tan theta = v^2/(rg)`, submit one inclusive shutdown-threshold setting in `m/s` before the live speed unlocks; operation stops when measured speed is at or above that setting.

**Complete format-specific interaction block:**

```yaml
trigger:
  decision_rule: "Stop the ride when measured speed reaches or exceeds the threshold."
  scale: {min: 3.5, max: 4.6, step: 0.05, unit: m/s}
  anchors: [{value: 4.00, label: "planned operation"},{value: 4.22, label: "20-degree model boundary"}]
  objective: "Protect the 20.0-degree chair-angle limit with a practical margin."
  direction: "at_or_above"
  consequence_limit: {value: 20.0, unit: deg, inclusive: true}
  correct: 4.20
  tolerance: 0.05
  conclusion: "Stop the Carousel when measured speed reaches or exceeds 4.20 m/s."
```

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 12 - Write the rule before the run"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Given `r = 5.0 m`, `g = 9.80 m/s^2`, `theta_max = 20.0 degrees`, and `tan theta = v^2/(rg)`, submit one inclusive shutdown-threshold setting in `m/s` before the live speed unlocks; operation stops when measured speed is at or above that setting."
  payload: "```yaml trigger: decision_rule: \"Stop the ride when measured speed reaches or exceeds the threshold.\" scale: {min: 3.5, max: 4.6, step: 0.05, unit: m/s} anchors: [{value: 4.00, label: \"planned operation\"},{value: 4.22, label: \"20-degree model boundary\"}] objective: \"Protect the 20.0-degree chair-angle limit with a practical margin.\" direction: \"at_or_above\" consequence_limit: {value: 20.0, unit: deg, inclusive: true} correct: 4.20 tolerance: 0.05 conclusion: \"Stop the Carousel when measured speed reaches or exceeds 4.20 m/s.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "carousel speed", min: 3, max: 5, step: 0.05, unit: "m/s"}
  start: 3.4
  anchors:
    - {at: 3.4, means: "routine baseline, not the decision threshold"}
    - {at: 4.3, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 3.6, hoursLeft: 48}
    - {at: "T-24 h", value: 4.0, hoursLeft: 24}
    - {at: "T-12 h", value: 4.2, hoursLeft: 12}
    - {at: "T-6 h", value: 4.4, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 3, max: 4.19}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 4.2, max: 5}, leadHours: 12}
  question: "Given `r = 5.0 m`, `g = 9.80 m/s^2`, `theta_max = 20.0 degrees`, and `tan theta = v^2/(rg)`, submit one inclusive shutdown-threshold setting in `m/s` before the live speed unlocks; operation stops when measured speed is at or above that setting."
```

**Correct result:** Submit shutdown setting 4.20 m/s, comparator at_or_above; 4.00 m/s passes.

**Answer text:** Use an inclusive 4.20 m/s shutdown threshold; the 4.00 m/s test value passes.

**Why:** The exact model boundary is about 4.22 m/s. The authored threshold stays just below it and clearly states what happens at equality.

**Wrong-path feedback:** A threshold above the model boundary does not protect the angle limit.

**State/output:** Set `ride_status.carousel = conditional_pass`; print the threshold card.

## Mission outcome

Mission decision: The Carousel may run at 4.00 m/s. Its chair angle stays below 20 degrees. The platform is now level, and the stop rule is 4.20 m/s. The replacement controller has no signed install record.

**Segue - exact player copy:** But Silva cannot find an install date for the new controller; the next evidence trail runs through the bumper stop and workshop.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tunde Idowu clips the RUN 4.00 M/S / STOP 4.20 M/S card to the chain rig. But Silva cannot find an install date for the new controller; the next evidence trail runs through the bumper stop and workshop.

**Header:** MISSION 3 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 08:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Leveling work uses time but removes a real asymmetric load.  
**Automatic bar change:** Certificate +7 | Proof +4 | Reserve -4 | Confidence +5  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** 12 RP allocated +3/+3/+3/+3. Result: 31 | 40 | 71 | 86.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Operating threshold:** Operating threshold is a precommitted value that triggers an action when reached or crossed.

### Review question 1


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

### Review question 2


**Prompt - exact player copy:** Which statement best explains uniform circular motion?

**Options - exact player copy:**

- A. Operating threshold is a precommitted value that triggers an action when reached or crossed.
- B. Centripetal acceleration is acceleration directed toward the center of a circular path.
- C. Uniform circular motion is motion around a circle at constant speed while velocity changes direction.
- D. Radial direction is the inward or outward direction along a circle's radius.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for uniform circular motion. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes operating threshold. It does not answer the question about uniform circular motion.
- B: This describes centripetal acceleration. It does not answer the question about uniform circular motion.
- C: Correct. Uniform circular motion is motion around a circle at constant speed while velocity changes direction.
- D: This describes radial direction. It does not answer the question about uniform circular motion.

### Review question 3


**Prompt - exact player copy:** At a fixed radius of 2 m, the graph shows inward acceleration for two speeds. Which relationship explains the change?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Speed",
  "yLabel": "Inward acceleration (m/s²)",
  "caption": "Circular motion at a fixed radius of 2 m",
  "bars": [
    {
      "name": "2 m/s",
      "value": 2
    },
    {
      "name": "4 m/s",
      "value": 8
    }
  ]
}
```

**Options - exact player copy:**

- A. a=v/r, so doubling speed doubles acceleration.
- B. a=r/v², so acceleration falls as speed rises.
- C. Acceleration is zero at either constant speed.
- D. a=v²/r, so doubling speed quadruples inward acceleration.

**Correct answer:** D

**Hint - exact player copy:** Constant speed does not mean constant velocity around a circle.

**Option feedback - exact player copy:**

- A: This misses the squared speed dependence.
- B: It reverses the required relationship.
- C: Velocity changes direction even when speed is constant.
- D: Correct. a=v²/r, so doubling speed quadruples inward acceleration.

### Review question 4


**Prompt - exact player copy:** Which statement best explains radial direction?

**Options - exact player copy:**

- A. Radial direction is the inward or outward direction along a circle's radius.
- B. Operating threshold is a precommitted value that triggers an action when reached or crossed.
- C. Uniform circular motion is motion around a circle at constant speed while velocity changes direction.
- D. Centripetal acceleration is acceleration directed toward the center of a circular path.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for radial direction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Radial direction is the inward or outward direction along a circle's radius.
- B: This describes operating threshold. It does not answer the question about radial direction.
- C: This describes uniform circular motion. It does not answer the question about radial direction.
- D: This describes centripetal acceleration. It does not answer the question about radial direction.

### Review question 5


**Prompt - exact player copy:** Which statement best explains tangential direction?

**Options - exact player copy:**

- A. Operating threshold is a precommitted value that triggers an action when reached or crossed.
- B. Tangential direction is the direction touching a circular path at one point; instantaneous velocity points this way.
- C. Uniform circular motion is motion around a circle at constant speed while velocity changes direction.
- D. Centripetal acceleration is acceleration directed toward the center of a circular path.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for tangential direction. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes operating threshold. It does not answer the question about tangential direction.
- B: Correct. Tangential direction is the direction touching a circular path at one point; instantaneous velocity points this way.
- C: This describes uniform circular motion. It does not answer the question about tangential direction.
- D: This describes centripetal acceleration. It does not answer the question about tangential direction.

### Review question 6


**Prompt - exact player copy:** At a fixed radius of 2 m, the graph shows inward acceleration for two speeds. Which relationship explains the change?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Speed",
  "yLabel": "Inward acceleration (m/s²)",
  "caption": "Circular motion at a fixed radius of 2 m",
  "bars": [
    {
      "name": "2 m/s",
      "value": 2
    },
    {
      "name": "4 m/s",
      "value": 8
    }
  ]
}
```

**Options - exact player copy:**

- A. a=v/r, so doubling speed doubles acceleration.
- B. a=r/v², so acceleration falls as speed rises.
- C. a=v²/r, so doubling speed quadruples inward acceleration.
- D. Acceleration is zero at either constant speed.

**Correct answer:** C

**Hint - exact player copy:** Constant speed does not mean constant velocity around a circle.

**Option feedback - exact player copy:**

- A: This misses the squared speed dependence.
- B: It reverses the required relationship.
- C: Correct. a=v²/r, so doubling speed quadruples inward acceleration.
- D: Velocity changes direction even when speed is constant.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Circular motion accelerates inward even at constant speed.
- Real forces supply the net inward force `mv²/r`.
- Chair angle grows as speed squared.
- **Mission takeaway:** A safety model becomes useful when it produces a threshold written before the test.

# Mission 4 - Where the Energy Went

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 4 - 12 DAYS UNTIL THE PARK REVIEW.

**Card title:** WHERE THE ENERGY WENT

**Go now:** Go to the Bumper Car Pavilion and meet Linh Chen, the instrumentation and test lead, at the car on stands.

**Card body:** 12 days until the park review. A dry-floor test mark stops before three copied speed strips. Today you decide whether floor friction explains the bumper stop.

**Objective:** Determine whether the bumper-car overrun came from inadequate floor friction.

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
  - id: safety_m04_we01
    title: Kinetic energy
    problem: A 2 kg cart moves at 3 m/s. Find kinetic energy.
    rule: K=mv²/2.
    steps:
    - 'Set up the relationship: K=mv²/2.'
    - K=2(3²)/2=9 J.
    answer: The cart has 9 J of kinetic energy.
    common_mistake: Speed is squared; mass is not.
  - id: safety_m04_we02
    title: Doubling speed
    problem: The same object moves first at 2 m/s and then at 4 m/s. Compare kinetic energies.
    rule: At fixed mass, K is proportional to v².
    steps:
    - 'Set up the relationship: At fixed mass, K is proportional to v².'
    - K2/K1=(4/2)²=4.
    answer: Doubling speed quadruples kinetic energy.
    common_mistake: Energy does not merely double with speed.
  - id: safety_m04_we03
    title: Work by a constant force
    problem: A constant 5 N force acts along a 4 m displacement. Find work.
    rule: W=Fd cos θ, where θ is the force-displacement angle.
    steps:
    - 'Set up the relationship: W=Fd cos θ, where θ is the force-displacement angle.'
    - θ=0, so W=5(4)(1)=20 J.
    answer: The force transfers 20 J to the object.
    common_mistake: A perpendicular force would do zero work along that displacement.
  - id: safety_m04_we04
    title: Average power
    problem: A motor transfers 100 J in 5 s. Find average power.
    rule: P_avg=energy transferred/time.
    steps:
    - 'Set up the relationship: P_avg=energy transferred/time.'
    - P_avg=100/5=20 W.
    answer: Average power is 20 watts.
    common_mistake: Power is a rate of energy transfer, not stored energy.
  - id: safety_m04_we05
    title: Stopping with friction
    problem: A cart has kinetic energy 20 J. A constant 5 N friction force stops it on a level surface. Find stopping distance.
    rule: 'Friction removes energy: f d=initial kinetic energy.'
    steps:
    - 'Set up the relationship: Friction removes energy: f d=initial kinetic energy.'
    - d=20/5=4 m.
    answer: The stopping distance is 4 m.
    common_mistake: Do not count the normal force as additional work on a horizontal path.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Work: Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.

Kinetic energy: Kinetic energy is energy of motion, equal to one-half mass times speed squared.

Power: Power is the rate at which energy is transferred or work is done.

Nonconservative force: Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.

#### Primer concepts

- Speed enters kinetic energy as `v²`, so doubling speed quadruples energy.
- Friction can remove mechanical energy without removing total energy from the larger system.
- Compare initial and final states when the path details are unnecessary.

#### Equations first needed today

**Equation:** `K = 1/2 mv²`  
**What it is for:** calculating energy of motion  
**Symbols:** `K` is kinetic energy, `m` is mass, and `v` is speed.  
**Why this campaign needs it:** The floor must remove the car's kinetic energy before it crosses the marked stopping line.

**Equation:** `W = Fd cosθ` and `Wnet = ΔK`  
**What it is for:** connecting force through distance to a change in kinetic energy  
**Symbols:** `F` is force, `d` is displacement, `θ` is the force-to-motion angle, and `ΔK` is final minus initial kinetic energy.  
**Why this campaign needs it:** Friction does negative work while the car stops.

**Crew:** Linh Chen - instrumentation and test lead; Luka Kovač - mechanical lead.

## Main story happening - designer summary

The player quantifies the speed-squared risk, closes the friction ledger, and predicts 2.0 m for a dry floor. The live stop at 2.06 m is consistent. Floor friction explains the bumper-car event locally but cannot explain the other ride records. Chen uses the final evidence budget on independent acceleration sensors rather than another copy of the old speed measurement.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Bumper Car Pavilion | automatic**

**Trigger:** mission_4_arrival.

**World state:** A dry-floor test mark stops before three copied speed strips.

**Panel/HUD text:** `STOP 13 READY`

**Dialogue bubbles -** Linh Chen: “The floor and seat get separate witnesses this time.”

**Unlocks:** Stop 13.

**Beat 2 - After Stops 13 and 14 | automatic**

**Trigger:** accepted_stop_13.

**World state:** At `car-on-stands`, the dated accepted-result slip for Stop 13 reads: "Submit 4 as the energy multiplier.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 15 READY`

**Dialogue bubbles -** Linh Chen: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 15.

**Beat 3 - After Stop 15 | automatic**

**Trigger:** accepted_stop_14.

**World state:** At `pavilion-board`, the dated accepted-result slip for Stop 14 reads: "K=1920 J; fk=960 N; d=2.0 m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 16 READY`

**Dialogue bubbles -** Linh Chen: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 16.

**Beat 4 - After Stop 16 | automatic**

**Trigger:** accepted_stop_15.

**World state:** At `floor-console`, the dated accepted-result slip for Stop 15 reads: "Commit 2.0 m; measure 2.06 m; difference 0.06 m ≤ 0.08 m; local pass.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_16.

**World state:** At `floor-console`, Linh Chen pins the DRY-FLOOR RESULT ONLY strip beside the floor console. The dated prop remains here on later visits.

**Panel/HUD text:** `OPENS TOMORROW`

**Dialogue bubbles -** Linh Chen: "This floor explains this stop. Keep the other cases open. Therefore Silva opens the Workshop tomorrow; the tower cannot borrow a missing procedure from this bumper test."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Brennan's Workshop.

### Physical aftermath — safety-m04

**Home:** `floor-console`. **Before:** The dated mission-4 evidence holder at this fixture has no accepted record. A dry-floor test mark stops before three copied speed strips.
**After — exact action:** Linh Chen pins the DRY-FLOOR RESULT ONLY strip beside the floor console.
**Trigger:** accepted_stop_16. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `configuration-desk`, eleven notebooks lie open without one complete test sequence.
**Segue - exact player copy:** Therefore Silva opens the Workshop tomorrow; the tower cannot borrow a missing procedure from this bumper test.

## Location plan

**One location:** Bumper Car Pavilion.

## Characters and dramatic beat

Chen insists on evidence independence. Kovač correctly identifies friction as a local cause but can no longer use it as a universal explanation.

## Key concepts, explained here

Work transfers energy. A stopping car loses kinetic energy because friction does negative work, while the floor and tires gain thermal energy. Since kinetic energy grows with speed squared, a small speed increase can lengthen the stop substantially.

## Stop 13 - Speed squared

**Format/placement:** BALLPARK, asked at `car-on-stands`.

**Metadata:** Concept: 14 - Kinetic-energy scaling; Keystone: energy; Area: Coaster Station; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the car on stands, in Bumper Car Pavilion.

**Stop reason - exact player copy:** October's speed was twice the normal test speed, making its long stop worth checking physically.

**Question card story setup - exact player copy:** A normal test runs at 2.0 m/s, while the October log reports 4.0 m/s. Estimate the energy ratio before deciding whether the much longer October stopping distance is physically surprising.

**Question card story-science connection - exact player copy:** The energy multiplier shows how much more energy the brake must remove at the higher speed.

**Question card prompt - exact player copy:** Given the same mass at `v1 = 2.0 m/s` and `v2 = 4.0 m/s`, use `K = 0.5mv^2` and `K2/K1 = (v2/v1)^2`. Submit one dimensionless numerical energy ratio.

```yaml
estimate: {labels: ["Speed ratio", "Exponent"], values: [2,2], slots: [base,exponent], template: "ratio = {base}^{exponent}", formula: "K2/K1=2^2", correct: 4, target: 4, tolerance: 0.05}
```

**Correct result:** Submit 4 as the energy multiplier.

**Answer text:** Doubling speed quadruples kinetic energy.

**Why:** Mass is unchanged and `K` is proportional to `v²`.

**Wrong-path feedback:** A factor of two treats kinetic energy as linear in speed; square the speed ratio.

**State/output:** Mark the October car as `4x NORMAL ENERGY`.

## Stop 14 - Close the stopping ledger

**Format/placement:** BALLPARK, asked at `pavilion-board`.

**Metadata:** Concept: 16 - Work-energy; Keystone: energy; Area: Coaster Station; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the energy ledger board, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The energy increase is known, but the dry-floor stopping distance still needs a prediction.

**Question card story setup - exact player copy:** With the fourfold increase established, close the car's energy ledger from 4.0 m/s to rest. Use friction as the measured transfer and exclude forces that do no work along the floor.

**Question card story-science connection - exact player copy:** The energy transferred by friction determines whether the reported stopping distance is plausible.

**Question card prompt - exact player copy:** Given `m = 240 kg`, `v0 = 4.0 m/s`, `vf = 0 m/s`, `mu_k = 0.40`, and `g = 10.0 m/s^2`, use `K = 0.5mv0^2`, `f_k = mu_k mg`, and `f_k d = K`. Submit the included energy streams, initial energy in `J`, friction force in `N`, and stopping-distance number in `m`.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Initial kinetic energy", value: 1920, unit: J}
  streams:
    - {id: friction, label: "Energy transferred by friction", value: 1920, unit: J, count: true}
    - {id: finalK, label: "Final kinetic energy", value: 0, unit: J, count: true}
    - {id: normal, label: "Work by normal force", value: 0, unit: J, count: false}
  correct_action: "Use kinetic friction over distance; normal force is perpendicular to motion."
```

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 14 - Close the stopping ledger"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Given `m = 240 kg`, `v0 = 4.0 m/s`, `vf = 0 m/s`, `mu_k = 0.40`, and `g = 10.0 m/s^2`, use `K = 0.5mv0^2`, `f_k = mu_k mg`, and `f_k d = K`. Submit the included energy streams, initial energy in `J`, friction force in `N`, and stopping-distance number in `m`."
  payload: "```yaml balance: target: {label: \"Initial kinetic energy\", value: 1920, unit: J} streams: - {id: friction, label: \"Energy transferred by friction\", value: 1920, unit: J, count: true} - {id: finalK, label: \"Final kinetic energy\", value: 0, unit: J, count: true} - {id: normal, label: \"Work by normal force\", value: 0, unit: J, count: false} correct_action: \"Use kinetic friction over distance; normal force is perpendicular to motion.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "stopping distance"
  unit: "m"
  inputs:
    - {label: "Car mass", value: 240, unit: "kg"}
    - {label: "Initial speed", value: 4.0, unit: "m/s"}
    - {label: "Kinetic-friction coefficient", value: 0.40, unit: "dimensionless"}
    - {label: "Gravitational field", value: 10.0, unit: "N/kg"}
  operation: "(0.5 m v²)/(μ m g)"
  formula: "d=(0.5×240×4.0^2)/(0.40×240×10.0)"
  start: 0
  correctResult: 2.0
  tolerance: 0.05
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** K=1920 J; fk=960 N; d=2.0 m.

**Answer text:** The dry floor should stop the car in 2.0 m.

**Why:** `μmgd = 1/2 mv²`; mass cancels. The normal force does no work because it is perpendicular to motion.

**Wrong-path feedback:** Do not add normal-force work to horizontal motion.

**State/output:** Draw the 2.0 m prediction line.

## Stop 15 - Predict, brake, measure

**Format/placement:** VERIFY, asked at `floor-console`.

**Metadata:** Concept: 17 - Friction test; Keystone: energy and model limits; Area: Brennan's workshop; Learning role: APPLY; Difficulty: L3; Story role: decision.

**Call - exact player copy:** Go to the floor-test console, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The dry-floor prediction is fixed and the instrumented car is ready for its test.

**Question card story setup - exact player copy:** The energy ledger predicts a 2.0 m dry-floor stop at 4.0 m/s. Run the instrumented car once and measure whether the result falls inside the prewritten eight-centimetre acceptance tolerance today.

**Question card story-science connection - exact player copy:** The measured distance and tolerance decide whether the friction model passes this particular run.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Given `m = 240 kg`, `v0 = 4.0 m/s`, `vf = 0 m/s`, `mu_k = 0.40`, and `g = 10.0 m/s^2`, use `d = v0^2/(2mu_k g)` and submit a stopping-distance prediction in `m`; the car controls stay locked until you commit. OPERATE: Run one `4.0 m/s` dry-floor stop. MEASURE: Record the stopping distance in `m`. INTERPRET: Submit one conclusion comparing prediction and measurement using the `0.08 m` tolerance and limiting the claim to this car and floor.

**Complete format-specific interaction block:**

```yaml
verify: {prediction: {value: 2.0, unit: m, tolerance: 0.08}, commit_required_before_unlock: true, phase_order: [calculate_and_commit, operate, measure, interpret], action: "Run one 4.0 m/s stop", measurement: {value: 2.06, unit: m}, failure_if_unmeasured: true, correct_conclusion: "Dry-floor friction model passes."}
```

**Correct result:** Commit 2.0 m; measure 2.06 m; difference 0.06 m ≤ 0.08 m; local pass.

**Answer text:** The 2.06 m stop agrees with the 2.0 m prediction within tolerance.

**Why:** The difference is 0.06 m. This supports the local friction model, not a park-wide explanation.

**Wrong-path feedback:** Compare the absolute difference with the stated tolerance and keep the conclusion local.

**State/output:** Set `evidence_flags.bumper_energy_pass = true`.

## Stop 16 - Buy a different witness

**Format/placement:** VALUE, asked at Linh Chen beside `sensor-booking-board`.

**Metadata:** Concept: 35 - Value of information; Keystone: evidence independence; Area: Brennan's workshop; Learning role: APPLY; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Linh Chen, at the sensor-booking board in Bumper Car Pavilion.

**Stop reason - exact player copy:** The dry-floor result passes, but the disputed speed records still share measuring equipment.

**Question card story setup - exact player copy:** The dry-floor model passes, but the old speed record shares equipment with other rides. Spend the remaining test slot on evidence that can distinguish real car motion from a repeated calibration error.

**Question card story-science connection - exact player copy:** An independent motion sensor can separate a genuine speed change from a shared calibration error.

**Question card prompt - exact player copy:** With `10 test_points`, submit one test-slot allocation naming the funded test and its cost; the allocation must distinguish true car motion from a repeated shared-calibration error.

**Complete format-specific interaction block:**

```yaml
value:
  budget: {value: 10, unit: test_points}
  options:
    - {id: accel, label: "Independent seat and floor accelerometers", cost: 10, axis: acceleration, required: true}
    - {id: wheel, label: "Repeat portable speed-wheel reading", cost: 6, axis: shared_speed, required: false}
    - {id: paint, label: "Measure paint thickness", cost: 4, axis: cosmetic, required: false}
    - {id: mass, label: "Reweigh same car", cost: 7, axis: mass, required: false}
  correct: [accel]
```

**Correct result:** Choice 1 - independent seat and floor accelerometers; cost 10.

**Answer text:** Fund the independent seat and floor accelerometers.

**Why:** They measure a different quantity through a different chain and can test the disputed speed-derived stop.

**Wrong-path feedback:** (wheel) Repeating the portable wheel preserves the shared calibration dependency. (paint) Paint thickness is cosmetic and cannot test the motion record. (mass) Reweighing the same car does not independently verify speed or acceleration.

**State/output:** Set `test_plan.independent_accelerometers = true`.

## Mission outcome

Mission decision: Dry-floor friction explains the Bumper Car stop. It does not explain the other ride records. New sensors will replace another shared speed-wheel test. The Workshop opens next so the team can rebuild the Drop Tower test.

**Segue - exact player copy:** Therefore Silva opens the Workshop tomorrow; the tower cannot borrow a missing procedure from this bumper test.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Linh Chen pins the DRY-FLOOR RESULT ONLY strip beside the floor console. Therefore Silva opens the Workshop tomorrow; the tower cannot borrow a missing procedure from this bumper test.

**Header:** MISSION 4 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 08:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** One car test and one independent sensor booking consume reserve.  
**Automatic bar change:** Certificate +5 | Proof +7 | Reserve -5 | Confidence +3  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +3/+4/+3/+2. Result: 39 | 51 | 69 | 91.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains work?

**Options - exact player copy:**

- A. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- B. Power is the rate at which energy is transferred or work is done.
- C. Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.
- D. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for work. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes kinetic energy. It does not answer the question about work.
- B: This describes power. It does not answer the question about work.
- C: This describes nonconservative force. It does not answer the question about work.
- D: Correct. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.

### Review question 2


**Prompt - exact player copy:** Which statement best explains kinetic energy?

**Options - exact player copy:**

- A. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- B. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.
- C. Power is the rate at which energy is transferred or work is done.
- D. Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for kinetic energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- B: This describes work. It does not answer the question about kinetic energy.
- C: This describes power. It does not answer the question about kinetic energy.
- D: This describes nonconservative force. It does not answer the question about kinetic energy.

### Review question 3


**Prompt - exact player copy:** Which statement best explains power?

**Options - exact player copy:**

- A. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.
- B. Power is the rate at which energy is transferred or work is done.
- C. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- D. Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for power. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes work. It does not answer the question about power.
- B: Correct. Power is the rate at which energy is transferred or work is done.
- C: This describes kinetic energy. It does not answer the question about power.
- D: This describes nonconservative force. It does not answer the question about power.

### Review question 4


**Prompt - exact player copy:** Which statement best explains nonconservative force?

**Options - exact player copy:**

- A. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.
- B. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- C. Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.
- D. Power is the rate at which energy is transferred or work is done.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for nonconservative force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes work. It does not answer the question about nonconservative force.
- B: This describes kinetic energy. It does not answer the question about nonconservative force.
- C: Correct. Nonconservative force is a force such as friction that transfers mechanical energy into heat or deformation along a path.
- D: This describes power. It does not answer the question about nonconservative force.

### Review question 5


**Prompt - exact player copy:** Which statement best explains kinetic-energy scaling?

**Options - exact player copy:**

- A. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.
- B. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- C. Power is the rate at which energy is transferred or work is done.
- D. Mass is unchanged and K is proportional to v².

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for kinetic-energy scaling. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes work. It does not answer the question about kinetic-energy scaling.
- B: This describes kinetic energy. It does not answer the question about kinetic-energy scaling.
- C: This describes power. It does not answer the question about kinetic-energy scaling.
- D: Correct. Mass is unchanged and K is proportional to v².

### Review question 6


**Prompt - exact player copy:** A block slides to rest on a horizontal rough surface. Its initial speed is v, kinetic friction coefficient is μ, and gravitational acceleration is g. Air drag is negligible. Which relation gives the stopping distance d?

**Options - exact player copy:**

- A. μmgd=½mv²; mass cancels, and the normal force does no work because it is perpendicular to motion.
- B. Work is energy transferred when a force acts through a displacement; only the force component along the motion contributes.
- C. Kinetic energy is energy of motion, equal to one-half mass times speed squared.
- D. Power is the rate at which energy is transferred or work is done.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for work-energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. μmgd=½mv²; mass cancels, and the normal force does no work because it is perpendicular to motion.
- B: This describes work. It does not answer the question about work-energy.
- C: This describes kinetic energy. It does not answer the question about work-energy.
- D: This describes power. It does not answer the question about work-energy.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- `K = 1/2 mv²`; doubling speed quadruples kinetic energy.
- Friction transfers mechanical energy into thermal energy.
- Normal force does no work during horizontal motion.
- **Mission takeaway:** A model can explain one event without explaining a shared pattern.

# Mission 5 - The Missing Procedure

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 5 - 11 DAYS UNTIL THE PARK REVIEW.

**Card title:** THE MISSING PROCEDURE

**Go now:** Go to the Workshop and meet Ruth Brennan, the former chief engineer, at the eleven notebooks.

**Card body:** Eleven days remain before review. Eleven books lie open, but none has a full test plan. Today you decide if one empty tower test may run.

**Objective:** Reconstruct and attest a safe limited drop-tower test.

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
  - id: safety_m05_we01
    title: Speed after free fall
    problem: An object starts at rest and falls 5 m. Neglect air resistance and use g=10 m/s². Find speed.
    rule: v²=v0²+2g h for a downward fall of height h.
    steps:
    - 'Set up the relationship: v²=v0²+2g h for a downward fall of height h.'
    - v²=0+2(10)(5)=100, so v=10 m/s downward.
    answer: The speed is 10 m/s.
    common_mistake: The result is speed; a signed velocity depends on the chosen axis.
  - id: safety_m05_we02
    title: Apparent weight
    problem: A 2 kg mass accelerates upward at 2 m/s² where g=10 m/s². Find its support force N.
    rule: N-mg=ma, taking upward positive.
    steps:
    - 'Set up the relationship: N-mg=ma, taking upward positive.'
    - N=m(g+a)=2(10+2)=24 N.
    answer: The support force is 24 N, greater than its 20 N weight.
    common_mistake: The support force equals mg only when vertical acceleration is zero.
  - id: safety_m05_we03
    title: Support during downward acceleration
    problem: A 2 kg mass accelerates downward at 2 m/s² where g=10 m/s². Find upward support force.
    rule: With upward positive, N-mg=ma and a=-2 m/s².
    steps:
    - 'Set up the relationship: With upward positive, N-mg=ma and a=-2 m/s².'
    - N=2(10-2)=16 N.
    answer: The support force is 16 N.
    common_mistake: A downward acceleration does not necessarily mean the support force vanishes.
  - id: safety_m05_we04
    title: Constant braking
    problem: A cart starts at 4 m/s and brakes with a=-2 m/s². Find stopping time.
    rule: v=v0+at for constant acceleration.
    steps:
    - 'Set up the relationship: v=v0+at for constant acceleration.'
    - 0=4-2t gives t=2 s.
    answer: It stops after 2 s under this model.
    common_mistake: The final velocity at stopping is zero, not the initial velocity with a minus sign.
  - id: safety_m05_we05
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

Free fall: Free fall is motion under gravity alone after release.

Apparent weight: Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.

Stopping acceleration: Stopping acceleration is the change in velocity per time while the brake brings the car to rest.

Attestation: Attestation is checking that a claim is backed by the correct record, identity, time, and physical condition.

#### Primer concepts

- Predict the car's speed before the braking zone.
- Write abort conditions before releasing the test mass.
- A signed old record cannot replace verification of today's sensor and brake state.

#### Equations first needed today

**Equation:** `v² = v0² + 2aΔx`  
**What it is for:** connecting speed, acceleration, and distance without needing time  
**Symbols:** `v` and `v0` are final and initial velocity, `a` is acceleration, and `Δx` is displacement.  
**Why this campaign needs it:** The tower's drop height predicts entry speed, and the brake distance predicts stopping acceleration.

**Equation:** `N - mg = ma`  
**What it is for:** finding the support force felt during upward stopping acceleration  
**Symbols:** `N` is the upward seat force, `m` is mass, `g` is gravity, and `a` is upward acceleration.  
**Why this campaign needs it:** Corbin Park limits the peak support force on the instrumented test mass.

**Crew:** Ruth Brennan - former chief engineer; Maya Hart - operations lead; Linh Chen - test lead.

## Main story happening - designer summary

The Workshop opens as a meaningful evidence location. The player reconstructs the procedure, derives a 26.6 m/s brake-entry speed from a 36 m fall, samples the brake response, and attests the present configuration. A limited unmanned test is authorized, not a passenger run.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Brennan's Workshop | automatic**

**Trigger:** mission_5_arrival.

**World state:** Eleven notebooks lie open without one complete test sequence.

**Panel/HUD text:** `STOP 17 READY`

**Dialogue bubbles -** Rosa Brennan: “The settings are here. The order of the test is not.”

**Unlocks:** Stop 17.

**Beat 2 - After Stop 17 | automatic**

**Trigger:** accepted_stop_17.

**World state:** At `bench-notebooks`, the dated accepted-result slip for Stop 17 reads: "Order: identity → brake check → posted prediction → clear-zone release → disarm/inspect.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Maya Hart: “Nice work. Take the prediction to the tower.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Drop Tower Control.

**Beat 3 - On arrival at Drop Tower Control | automatic**

**Trigger:** accepted_stop_18.

**World state:** At `drop-log`, the dated accepted-result slip for Stop 18 reads: "Submit 26.6 m/s; accept 26.3-26.9 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 18-19 READY`

**Dialogue bubbles -** Rosa Brennan: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stops 18-19.

**Beat 4 - After Stop 19 | automatic**

**Trigger:** accepted_stop_19.

**World state:** At `brake-desk`, the dated accepted-result slip for Stop 19 reads: "Select monotonic response with no dead band; limited unmanned test may proceed.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 20 READY`

**Dialogue bubbles -** Rosa Brennan: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 20.

**Beat 5 - After Stop 20 | automatic**

**Trigger:** accepted_stop_20.

**World state:** At `configuration-desk`, Ana Silva clips the EMPTY TEST ONLY procedure into the configuration folder. The dated prop remains here on later visits.

**Panel/HUD text:** `LIMITED UNMANNED TEST`

**Dialogue bubbles -** Ana Silva: "Now another crew could repeat what we did. But Idowu's replacement crate is still sealed; the October controller claim needs a date check before the next test."

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m05

**Home:** `configuration-desk`. **Before:** The dated mission-5 evidence holder at this fixture has no accepted record. Eleven notebooks lie open without one complete test sequence.
**After — exact action:** Ana Silva clips the EMPTY TEST ONLY procedure into the configuration folder.
**Trigger:** accepted_stop_20. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `workshop-diagnosis-board`, a sealed controller crate sits under an October report.
**Segue - exact player copy:** But Idowu's replacement crate is still sealed; the October controller claim needs a date check before the next test.

## Location plan

**Two locations:** Workshop for procedure; Drop Tower for prediction, brake sweep, and authorization. The written procedure causes the travel.

## Characters and dramatic beat

Brennan admits the notebooks are incomplete instead of defending them. Hart limits authorization to exactly what has been verified.

## Key concepts, explained here

Free-fall speed follows from gravitational acceleration and distance. Stopping over a short distance requires a large upward acceleration. The seat's upward force must both balance weight and produce that acceleration, so apparent weight exceeds `mg` during braking.

## Stop 17 - Put the test in a safe order

**Format/placement:** PROTOCOL, asked at `bench-notebooks`.

**Metadata:** Concept: 35 - Experimental procedure; Keystone: model limits; Area: Brennan's workshop; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the notebook bench, in Brennan's Workshop.

**Stop reason - exact player copy:** The tower test cannot begin until its scattered instructions form one safe procedure.

**Question card story setup - exact player copy:** The notebooks list every task but never state a complete order. Match each test stage to its required response so an unsafe condition stops the sequence before the test mass is released.

**Question card story-science connection - exact player copy:** The test order ensures the brake, prediction, and clear zone are checked before release.

**Question card prompt - exact player copy:** Submit one four-step response plan by matching each displayed test stage to `Abort before arming`, `Abort before release`, `Authorize unmanned release`, or `Disarm and inspect`.

**Complete format-specific interaction block:**

```yaml
scenarios: ["Sensor identity not verified", "Brake current outside low-power band", "Release area clear and prediction posted", "Car returns and locks"]
choices: ["Abort before arming", "Abort before release", "Authorize unmanned release", "Disarm and inspect"]
mapping: ["Abort before arming", "Abort before release", "Authorize unmanned release", "Disarm and inspect"]
```

**Correct result:** Order: identity → brake check → posted prediction → clear-zone release → disarm/inspect.

**Answer text:** Verify identity, test the brake, post the prediction, release only when clear, then disarm and inspect.

**Why:** Each abort occurs before the hazardous step it protects.

**Wrong-path feedback:** Put verification before energizing and the brake check before release.

**State/output:** Print `DROP TEST PROCEDURE V1` and unlock travel.

## Stop 18 - Predict the brake-entry speed

**Format/placement:** DERIVE, asked at `drop-log`.

**Metadata:** Concept: 4 - Free-fall kinematics; Keystone: motion; Area: Drop Tower Control; Learning role: PRACTICE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the drop log, in Drop Tower Control.

**Stop reason - exact player copy:** The release procedure is ready, but the entry-speed sensor still needs its expected range.

**Question card story setup - exact player copy:** The test mass falls 36.0 m from rest before entering the brake stack. Derive its entry speed so Chen can set the sensor range and the abort threshold before release.

**Question card story-science connection - exact player copy:** The predicted brake-entry speed sets the measurement range and helps define the abort condition.

**Fixture source panel - exact player copy:** The test mass falls from rest through Delta x=36.0 m before entering the brake stack. Take downward as positive: v0=0 m/s and a=9.80 m/s². Use v²=v0²+2a Delta x to derive the entry speed so Chen can set the sensor range and abort threshold before release.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation and one entry-speed number in `m/s`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The test mass falls 36.0 m from rest before entering the brake stack.", "Given `v0 = 0 m/s`, downward acceleration `a = 9.80 m/s^2`, and downward displacement `Delta x = 36.0 m`, use `v^2 = v0^2 + 2a Delta x`."]
  lines:
    - {id: relation, expression: "v^2 = v0^2 + 2a dx", rule: "constant-acceleration relation without time"}
    - {id: substitute, expression: "v^2 = 0 + 2(9.80)(36.0)", rule: "released from rest; downward positive"}
    - {id: result, expression: "v = 26.6 m/s", rule: "take the physical positive speed"}
  order: [relation, substitute, result]
  decoys:
    - {expression: "v = a dx = 352.8 m/s", rule: "multiply acceleration by distance without the squared-speed relation"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `v=v0+aΔx`
2. `v²=2(9.80+36.0)`
3. `v=705.6 m/s without taking the square root`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The test mass falls 36.0 m from rest before entering the brake stack.", "Given `v0 = 0 m/s`, downward acceleration `a = 9.80 m/s^2`, and downward displacement `Delta x = 36.0 m`, use `v^2 = v0^2 + 2a Delta x`."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Predict the brake-entry speed in the form and units requested by the prompt"
  left_side: "v"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v^2 = v0^2 + 2a dx", correct: true}
        - {text: "v^2 = v0^2 + a(dx)^2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v^2 = 0 + 2(9.80)(36.0)", correct: true}
        - {text: "v² = 0 + 2(9.80+36.0)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v = 26.6 m/s", correct: true}
        - {text: "v = (26.6 m/s)^2 = 705.6 m/s", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Submit 26.6 m/s; accept 26.3-26.9 m/s.

**Answer text:** The predicted brake-entry speed is 26.6 m/s.

**Why:** Gravity increases downward speed over the 36.0 m free-fall distance.

**Wrong-path feedback:** Use the 36.0 m free-fall section, not the full 45 m tower height.

**State/output:** Set the brake-desk range to 0-30 m/s.

## Stop 19 - Sweep the brake response

**Format/placement:** SWEEP, asked at `brake-desk`.

**Metadata:** Concept: 2 - Acceleration trace; Keystone: motion and model limits; Area: Brennan's workshop; Learning role: APPLY; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the brake desk, in Drop Tower Control.

**Stop reason - exact player copy:** The entry-speed prediction is recorded, but the brake's response has not been checked since October.

**Question card story setup - exact player copy:** The procedure now has a predicted entry speed, but the brake has not carried a full drop since October. Sweep its low-power current and confirm that stopping response changes smoothly without a dead region.

**Question card story-science connection - exact player copy:** A smooth current-response curve supports proceeding to a limited unmanned drop test.

**Question card prompt - exact player copy:** OPERATE: Sweep brake current from `0%` to `100%` in `10%` steps while all other test conditions remain fixed. MEASURE: Record equivalent upward acceleration in `m/s^2` at each step. INTERPRET: Submit one conclusion stating whether the response is monotonic and whether a dead band appears.

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: current, label: "Brake test current", min: 0, max: 100, step: 10, unit: "%"}
  response: {label: "Equivalent upward acceleration", unit: "m/s^2"}
  points: [[0,0],[10,4.0],[20,8.1],[30,12.2],[40,16.4],[50,20.5],[60,24.7],[70,28.7],[80,32.8],[90,36.9],[100,43.1]]
  correct_region: {min: 0, max: 100}
  conclusion: "Response rises smoothly; no dead band appears."
```

**§7 authored-board source - SWEEP:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 19 - Sweep the brake response"
  format: "SWEEP"
  source: "Handback 5 canonical interaction block"
  question: "OPERATE: Sweep brake current from `0%` to `100%` in `10%` steps while all other test conditions remain fixed. MEASURE: Record equivalent upward acceleration in `m/s^2` at each step. INTERPRET: Submit one conclusion stating whether the response is monotonic and whether a dead band appears."
  payload: "```yaml sweep: control: {id: current, label: \"Brake test current\", min: 0, max: 100, step: 10, unit: \"%\"} response: {label: \"Equivalent upward acceleration\", unit: \"m/s^2\"} points: [[0,0],[10,4.0],[20,8.1],[30,12.2],[40,16.4],[50,20.5],[60,24.7],[70,28.7],[80,32.8],[90,36.9],[100,43.1]] correct_region: {min: 0, max: 100} conclusion: \"Response rises smoothly; no dead band appears.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - SWEEP:**

**Handback 5 canonical interaction block - SWEEP:**

```yaml
sweep:
  axis: {label: "brake test current", min: 0, max: 100, step: 10, unit: "%"}
  response: {label: "equivalent upward acceleration", unit: "m/s^2"}
  points: [[0,0],[10,4.0],[20,8.1],[30,12.2],[40,16.4],[50,20.5],[60,24.7],[70,28.7],[80,32.8],[90,36.9],[100,43.1]]
  start: 0
  target: 60
  tolerance: 5
  passRule: "response increases at every step and contains no dead band"
  correctResult: "Select monotonic response with no dead band; limited unmanned test may proceed."
```

**Correct result:** Select monotonic response with no dead band; limited unmanned test may proceed.

**Answer text:** Brake response rises smoothly through the tested range, so the limited unmanned test may proceed to attestation.

**Why:** Every current increase produces a response change larger than measurement noise.

**Wrong-path feedback:** Judge the pattern across all points, not one small rounding difference.

**State/output:** Set `evidence_flags.tower_brake_sweep_pass = true`.

## Stop 20 - Attest today's configuration

**Format/placement:** ATTEST, asked at Maya Hart beside `tower-release-desk`.

**Metadata:** Concept: 35 - Test authorization; Keystone: evidence independence; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Maya Hart, at the release desk in Drop Tower Control.

**Stop reason - exact player copy:** The prediction and brake sweep pass, leaving the present configuration to verify before authorization.

**Question card story setup - exact player copy:** The prediction and low-power sweep pass, but Hart will authorize only the exact present configuration. Verify the sensor identity, release height, clear zone, brake state, and procedure within the inspection limit.

**Question card story-science connection - exact player copy:** Configuration checks tie the permission to today's sensor, height, brake, and clear zone rather than an old signature.

**Question card prompt - exact player copy:** Submit one selected-claims attestation containing every presently verified requirement for limited unmanned release and excluding any historical claim that does not establish today's condition.

**Complete format-specific interaction block:**

```yaml
attest:
  verification_limit: 5
  claims:
    - {id: sensor, label: "Independent accelerometer ID C-17 installed", backed: true, critical: true}
    - {id: height, label: "Release mark is 36.0 m above brake entry", backed: true, critical: true}
    - {id: sweep, label: "Brake sweep passed today", backed: true, critical: true}
    - {id: clear, label: "Drop zone physically clear", backed: true, critical: true}
    - {id: old_signature, label: "1996 signature proves today's condition", backed: false, critical: true}
  critical_unbacked: [old_signature]
  correct: [sensor,height,sweep,clear]
```

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Attest today's configuration", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Submit checks [sensor, height, brake response, clear zone]; reject old signature.

**Answer text:** Authorize only after today's sensor, height, brake response, and clear zone are verified; the old signature is not present condition.

**Why:** Records support history. Physical identity and condition support today's test.

**Wrong-path feedback:** (old_signature) A 1996 signature records a past decision; it cannot establish today's sensor, release mark, brake response, or clear zone.

**State/output:** Turn the arming key; set `test_authorized.tower_unmanned = true`.

## Mission outcome

Mission decision: One tower test may run with no riders. The speed mark, sensor, brake sweep, and clear zone all pass. Riders are not yet allowed. The team will now check the controller record and shared test tools.

**Segue - exact player copy:** But Idowu's replacement crate is still sealed; the October controller claim needs a date check before the next test.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ana Silva clips the EMPTY TEST ONLY procedure into the configuration folder. But Idowu's replacement crate is still sealed; the October controller claim needs a date check before the next test.

**Header:** MISSION 5 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 09:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Procedure work and brake testing consume reserve while making one controlled drop possible.  
**Automatic bar change:** Certificate +4 | Proof +7 | Reserve -6 | Confidence +4  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +3/+3/+4/+2. Result: 46 | 61 | 67 | 97.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains free fall?

**Options - exact player copy:**

- A. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- B. Free fall is motion under gravity alone after release.
- C. Stopping acceleration is the change in velocity per time while the brake brings the car to rest.
- D. Attestation is checking that a claim is backed by the correct record, identity, time, and physical condition.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for free fall. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes apparent weight. It does not answer the question about free fall.
- B: Correct. Free fall is motion under gravity alone after release.
- C: This describes stopping acceleration. It does not answer the question about free fall.
- D: This describes attestation. It does not answer the question about free fall.

### Review question 2


**Prompt - exact player copy:** Which statement best explains apparent weight?

**Options - exact player copy:**

- A. Free fall is motion under gravity alone after release.
- B. Stopping acceleration is the change in velocity per time while the brake brings the car to rest.
- C. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- D. Attestation is checking that a claim is backed by the correct record, identity, time, and physical condition.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for apparent weight. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes free fall. It does not answer the question about apparent weight.
- B: This describes stopping acceleration. It does not answer the question about apparent weight.
- C: Correct. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- D: This describes attestation. It does not answer the question about apparent weight.

### Review question 3


**Prompt - exact player copy:** The velocity graph is linear over the shown interval. Which description is correct?

**Figure - exact player copy:**

```json
{
  "kind": "line",
  "xLabel": "Time (s)",
  "yLabel": "Velocity (m/s)",
  "caption": "Velocity decreases linearly",
  "series": [
    {
      "name": "Velocity",
      "points": [
        [
          0,
          8
        ],
        [
          1,
          6
        ],
        [
          2,
          4
        ],
        [
          3,
          2
        ]
      ]
    }
  ]
}
```

**Options - exact player copy:**

- A. It moves backward because acceleration is negative.
- B. Its acceleration is +2 m/s².
- C. Its acceleration is zero because the graph is straight.
- D. The object moves in the positive direction with acceleration -2 m/s².

**Correct answer:** D

**Hint - exact player copy:** Velocity gives direction; the slope gives acceleration.

**Option feedback - exact player copy:**

- A: Velocity remains positive throughout the interval.
- B: The velocity slope is negative.
- C: A straight velocity graph has constant acceleration; zero acceleration would require a horizontal line.
- D: Correct. The object moves in the positive direction with acceleration -2 m/s².

### Review question 4


**Prompt - exact player copy:** Which statement best explains attestation?

**Options - exact player copy:**

- A. Attestation is checking that a claim is backed by the correct record, identity, time, and physical condition.
- B. Free fall is motion under gravity alone after release.
- C. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- D. Stopping acceleration is the change in velocity per time while the brake brings the car to rest.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for attestation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Attestation is checking that a claim is backed by the correct record, identity, time, and physical condition.
- B: This describes free fall. It does not answer the question about attestation.
- C: This describes apparent weight. It does not answer the question about attestation.
- D: This describes stopping acceleration. It does not answer the question about attestation.

### Review question 5


**Prompt - exact player copy:** Which statement best explains experimental procedure?

**Options - exact player copy:**

- A. Free fall is motion under gravity alone after release.
- B. Each abort occurs before the hazardous step it protects.
- C. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- D. Stopping acceleration is the change in velocity per time while the brake brings the car to rest.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for experimental procedure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes free fall. It does not answer the question about experimental procedure.
- B: Correct. Each abort occurs before the hazardous step it protects.
- C: This describes apparent weight. It does not answer the question about experimental procedure.
- D: This describes stopping acceleration. It does not answer the question about experimental procedure.

### Review question 6


**Prompt - exact player copy:** An object falls 36.0 m from rest with no air resistance. Take downward as positive and g=9.80 m/s². Which statement describes its motion?

**Options - exact player copy:**

- A. Free fall is motion under gravity alone after release.
- B. Apparent weight is the support force a rider feels; it can differ from gravitational weight during acceleration.
- C. Gravity increases its downward speed; v²=2g×36.0 gives the speed just before the fall ends.
- D. Stopping acceleration is the change in velocity per time while the brake brings the car to rest.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for free-fall kinematics. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes free fall. It does not answer the question about free-fall kinematics.
- B: This describes apparent weight. It does not answer the question about free-fall kinematics.
- C: Correct. Gravity increases its downward speed; v²=2g×36.0 gives the speed just before the fall ends.
- D: This describes stopping acceleration. It does not answer the question about free-fall kinematics.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Use `v² = v0² + 2aΔx` when time is not needed.
- Short stops require large acceleration.
- Apparent weight is the support force, not always `mg`.
- **Mission takeaway:** A calculation authorizes only the configuration and procedure actually verified.

# Mission 6 - One Source, Three Readings

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 6 - 10 DAYS UNTIL THE PARK REVIEW.

**Card title:** ONE SOURCE, THREE READINGS

**Go now:** Go to the Carousel Drive House and meet Tunde Idowu, the controls engineer, beside the replacement-controller crate.

**Card body:** Ten days remain before review. A new control box is still in its sealed crate. Today you decide if it or the shared test kit explains the bad records.

**Objective:** Trace the agreeing records and test the common-controller explanation.

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
  - id: safety_m06_we01
    title: Correct a known offset
    problem: A balance reads 52 g for a certified 50 g mass and 32 g for a second object. Assume a constant additive offset. Find the corrected second mass.
    rule: Offset = reading - reference; corrected value = reading - offset.
    steps:
    - offset = 52 - 50 = +2 g. The balance reads high.
    - corrected mass = 32 - 2 = 30 g. Subtract the same offset.
    answer: The corrected mass is 30 g.
    common_mistake: An additive offset is not a percentage error.
  - id: safety_m06_we02
    title: A spring calibration
    problem: A spring extends 0.1 m under a 2 N pull within its linear range. Find stiffness k.
    rule: Force magnitude F=kx.
    steps:
    - 'Set up the relationship: Force magnitude F=kx.'
    - k=F/x=2/0.1=20 N/m.
    answer: The spring constant is 20 N/m.
    common_mistake: Use extension from equilibrium, not the spring's full length.
  - id: safety_m06_we03
    title: Use a reversible intervention
    problem: A lamp draws 2 A at setting A, 3 A at setting B, and 2 A after returning to A. Supply voltage and the lamp are unchanged. What does this support?
    rule: Change one proposed cause, hold other relevant factors fixed, then restore the original condition.
    steps:
    - A → B changes the current by 3-2 = 1 A.
    - B → A restores 2 A. The response reverses with the setting under the stated controls.
    answer: The result supports a setting effect under these test conditions.
    common_mistake: One intervention does not prove the effect is identical under every other condition.
  - id: safety_m06_we04
    title: Count independent evidence sources
    problem: Three reports copy one balance reading. A fourth report uses a separately calibrated balance. How many measurement sources are there?
    rule: Reports are not independent measurements when they copy a common source.
    steps:
    - source group 1 = the first balance and its three copies. Count that measurement once.
    - source group 2 = the second balance. It adds a separate measurement route.
    answer: There are two measurement sources, not four.
    common_mistake: Agreement among copies cannot establish independent confirmation.
  - id: safety_m06_we05
    title: Recognize a systematic miss
    problem: A model has residuals +2,+2,+2,+2 units at four inputs. Another has -1,+1,-1,+1. What does the first pattern suggest?
    rule: Residuals are observations minus predictions; a repeated offset can indicate bias.
    steps:
    - first mean residual = (2+2+2+2)/4 = +2 units. Every prediction is low.
    - second mean residual = (-1+1-1+1)/4 = 0 units. Its signed errors cancel, though errors remain.
    answer: The first model shows a consistent underprediction that should be investigated.
    common_mistake: A zero mean residual does not by itself prove a model is accurate or free of pattern.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Calibration: Calibration is comparison that connects an instrument reading to a known physical value.

Causal test: Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.

Quiet reading: Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.

Spring constant: Spring constant is a measure of spring stiffness; a larger value means more force is required for the same stretch or compression.

#### Primer concepts

- Separate displays are not independent if they share one upstream measurement.
- A cause must exist and change before it can produce an effect.
- A spring-based measuring tool is trustworthy only if its actual stiffness matches the value used in calibration.

#### Equations first needed today

**Equation:** `Fs = -kx`  
**What it is for:** connecting spring displacement to restoring force  
**Symbols:** `Fs` is spring force, `k` is spring constant, and `x` is displacement from equilibrium; the minus sign shows the force points back toward equilibrium.  
**Why this campaign needs it:** The portable speed wheel converts spring deflection into a speed estimate, so using the wrong stiffness biases every report that depends on it.

**Crew:** Tunde Idowu - controls engineer; Linh Chen - test lead; Ruth Brennan - former chief engineer.

## Main story happening - designer summary

Idowu proves the replacement controller is sealed, powered off, and logged as never installed. The player traces the three historical speed values to one portable wheel, bracket, and master clock. Independent accelerometers disagree with the shared chain in the predicted direction. Twist 1 lands: the common control-failure theory is rejected.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Carousel Drive House | automatic**

**Trigger:** mission_6_arrival.

**World state:** A sealed controller crate sits under an October report.

**Panel/HUD text:** `STOP 21-22 READY`

**Dialogue bubbles -** Tunde Idowu: “If this caused October, physics has learned to travel backward in time.”

**Unlocks:** Stops 21-22.

**Beat 2 - After Stop 22 | automatic**

**Trigger:** accepted_stop_21.

**World state:** At `controller-crate`, the dated accepted-result slip for Stop 21 reads: "Choice 1 - command the sealed crate; observed ride response 0.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `NOT INSTALLED`

**Dialogue bubbles -** Rosa Brennan: “Nice work. The three reports may still share the portable kit.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Brennan's Workshop.

**Beat 3 - On arrival at Brennan's Workshop | automatic**

**Trigger:** accepted_stop_22.

**World state:** At `controller-record`, the dated accepted-result slip for Stop 22 reads: "Submit evidence set [serial, delivered-after-event, never-powered].". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 23 READY`

**Dialogue bubbles -** Tunde Idowu: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 23.

**Beat 4 - After Stop 23 | automatic**

**Trigger:** accepted_stop_23.

**World state:** At `bench-notebooks`, the dated accepted-result slip for Stop 23 reads: "Shared dependency portable_speed_kit; independent channel seat_floor_accelerometers.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 24 READY`

**Dialogue bubbles -** Tunde Idowu: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 24.

**Beat 5 - After Stop 24 | automatic**

**Trigger:** accepted_stop_24.

**World state:** At `workshop-diagnosis-board`, Tunde Idowu pins the INSTALLED AFTER OCTOBER date strip beside the crate record. The dated prop remains here on later visits.

**Panel/HUD text:** `REJECTED`

**Dialogue bubbles -** Tunde Idowu: "The crate was not there. The old test kit was. But Hart's missing card has surfaced; Chen must test what her manual stop did to the rider load."

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m06

**Home:** `workshop-diagnosis-board`. **Before:** The dated mission-6 evidence holder at this fixture has no accepted record. A sealed controller crate sits under an October report.
**After — exact action:** Tunde Idowu pins the INSTALLED AFTER OCTOBER date strip beside the crate record.
**Trigger:** accepted_stop_24. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `casebook-table`, a worn operator card lies beneath the padded-stop force trace.
**Segue - exact player copy:** But Hart's missing card has surfaced; Chen must test what her manual stop did to the rider load.

## Location plan

**Two locations:** Carousel proves the controller could not act; that result sends the player to the Workshop to trace the source of agreement.

## Characters and dramatic beat

Idowu is vindicated on the replacement hardware but does not claim the whole control system is innocent. Chen admits that separate ride displays were not separate evidence. Brennan identifies the shared kit.

## Key concepts, explained here

Causation requires the proposed cause to precede and influence the effect. Independence concerns how evidence is produced, not how many screens show it. The portable wheel infers force from spring displacement, so a spring softer than its labeled calibration biases all three speeds. An independent sensor can expose the shared error.

## Stop 21 - Could the controller have acted?

**Format/placement:** CONTROL, asked at `controller-crate`.

**Metadata:** Concept: 5 - Causal intervention; Keystone: model limits; Area: Brennan's workshop; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the sealed controller crate, in Carousel Drive House.

**Stop reason - exact player copy:** A sealed replacement controller has been blamed for motion that occurred before its installation.

**Question card story setup - exact player copy:** The service list names a replacement controller, but the crate still carries its factory seal. Check power, command path, and reversal behavior to test whether it could have changed October's ride motion.

**Question card story-science connection - exact player copy:** Testing the command path establishes whether the controller could physically have affected the ride.

**Question card prompt - exact player copy:** BASELINE: With the ride unpowered and the replacement crate isolated, measure ride-command response in percent. CHANGE ONE CONTROL: Connect only the sealed controller to the isolated command simulator while keeping the installed ride controller, mechanical brake preload, load, and ride power state fixed. MEASURE: Record simulator output and ride-command response before connection, during the isolated check, and after restoration. RESTORE: Disconnect the simulator and restore crate isolation; restoration is required. INTERPRET: Submit one conclusion stating whether the sealed controller had a live command path in October.

**Complete format-specific interaction block:**

```yaml
control:
  baseline: {label: "Ride command response", value: 0, unit: "%"}
  noise_band: 0.1
  changed_variable: "Sealed-controller connection to isolated command simulator"
  fixed_conditions: ["Installed ride controller", "Mechanical brake preload", "Load", "Ride remains unpowered"]
  measurement_timing: [before_connection, during_isolated_check, after_isolation_restored]
  state_measurements: {baseline_ride_response_percent: 0, isolated_simulator_output_percent: 100, isolated_ride_response_percent: 0, restored_ride_response_percent: 0}
  candidates:
    - {id: crate, label: "Test sealed controller output, then restore isolation", response: 100, ride_response: 0, correct: true}
    - {id: live, label: "Change installed controller setting", response: 12, correct: false}
    - {id: brake, label: "Change mechanical brake preload", response: -8, correct: false}
  reversal_required: true
```

**Correct result:** Choice 1 - command the sealed crate; observed ride response 0.

**Answer text:** The sealed replacement controller has no command path and could not have caused October's motion.

**Why:** It is unpowered, disconnected, and still sealed. A proposed cause must be connected before the event.

**Wrong-path feedback:** (live) Changing the installed controller tests a different device and disturbs the live ride. (brake) Changing brake preload tests the mechanical stop path, not whether the sealed replacement crate has a command path.

**State/output:** Set `evidence_flags.new_controller_excluded = true`.

## Stop 22 - Verify the installation claim

**Format/placement:** ATTEST, asked at Tunde Idowu beside `controller-record`.

**Metadata:** Concept: 3 - Timing and identity; Keystone: evidence independence; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Talk to Tunde Idowu, at the controller record board in Carousel Drive House.

**Stop reason - exact player copy:** The controller produced no response, but the installation claim still needs documentary evidence.

**Question card story setup - exact player copy:** The response test is zero, but the certificate needs records as well as an intact seal. Verify serial number, delivery time, power history, and installation sign-off before closing this causal branch.

**Question card story-science connection - exact player copy:** Delivery and power records determine whether the controller belongs in the October causal account.

**Question card prompt - exact player copy:** Submit one selected-claims attestation about the replacement controller's serial, delivery date, power history, and installation sign-off; select only claims backed by the displayed records.

**Complete format-specific interaction block:**

```yaml
attest:
  verification_limit: 4
  claims:
    - {id: serial, label: "Crate serial matches replacement order", backed: true, critical: true}
    - {id: delivered, label: "Delivered after October test", backed: true, critical: true}
    - {id: power, label: "No power history", backed: true, critical: true}
    - {id: signoff, label: "Installation sign-off exists", backed: false, critical: true}
  correct: [serial,delivered,power]
```

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Verify the installation claim", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Submit evidence set [serial, delivered-after-event, never-powered].

**Answer text:** The replacement arrived after the event, was never powered, and has no installation sign-off.

**Why:** All three facts exclude it from the October causal chain.

**Wrong-path feedback:** (signoff) No installation sign-off exists; the order and serial records prove possession of the crate, not installation in the ride.

**State/output:** Add `REPLACEMENT CONTROLLER EXCLUDED` to Casebook.

## Stop 23 - Trace the agreement

**Format/placement:** TRACE, asked at `bench-notebooks`.

**Metadata:** Concept: 30 - Shared calibration; Keystone: evidence independence; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the notebook bench, in Brennan's Workshop.

**Stop reason - exact player copy:** The controller is excluded, leaving the suspicious agreement among three speed reports unexplained.

**Question card story setup - exact player copy:** The replacement controller is excluded, yet the three October speeds still agree too closely. Open every report's dependencies and identify whether separate displays share the portable wheel, spring bracket, or clock.

**Question card story-science connection - exact player copy:** Tracing shared equipment shows whether those reports are independent witnesses or one measurement repeated.

**Question card prompt - exact player copy:** Submit one trace conclusion naming the shared upstream measurement chain for all three historical speed reports and naming the one independent channel; use the displayed spring label `180 N/m`, measured spring constant `165 N/m`, and `F_s = -kx` as evidence.

**Complete format-specific interaction block:**

```yaml
trace:
  shared_upstream: "Portable speed wheel + bracket spring B + master clock K-4"
  calibration: {spring_label: "180 N/m", measured_spring_constant: "165 N/m", governing_relation: "Fs = -kx"}
  channels:
    - {id: wheel_report, label: "Ferris speed report", reading: "1.50 m/s", depends_on: [portable_kit], target_dependent: true}
    - {id: bumper_report, label: "Bumper speed report", reading: "4.00 m/s", depends_on: [portable_kit], target_dependent: true}
    - {id: coaster_report, label: "Coaster speed report", reading: "9.40 m/s", depends_on: [portable_kit], target_dependent: true}
    - {id: accel, label: "Chen independent accelerometer", reading: "3.72 m/s equivalent", depends_on: [sensor_C17], independent: true}
  correct: portable_kit
```

**Correct result:** Shared dependency portable_speed_kit; independent channel seat_floor_accelerometers.

**Answer text:** The three historical reports share the portable speed kit; Chen's accelerometer is independent.

**Why:** Different display labels do not erase a common source. Agreement among dependent channels is not corroboration.

**Wrong-path feedback:** Follow each value backward until the physical measurement differs.

**State/output:** Merge the three dependency lines visually.

## Stop 24 - Name the cause that fits

**Format/placement:** DIAGNOSIS, asked at `workshop-diagnosis-board`.

**Metadata:** Concept: 35 - Model comparison; Keystone: evidence independence; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the evidence diagnosis board, in Brennan's Workshop.

**Stop reason - exact player copy:** The shared speed kit is identified and the independent channels are available for comparison.

**Question card story setup - exact player copy:** The replacement controller is excluded, and the three matching speeds collapse to one shared kit. Compare the independent reading and quiet brake channels before deciding which explanation survives the complete evidence panel.

**Question card story-science connection - exact player copy:** The surviving explanation must account for both the matching speed reports and the quiet brake measurements.

**Question card prompt - exact player copy:** Submit one causal conclusion that explains the sealed later-delivered controller, three reports from one portable kit, the independent estimate `7%` lower, and the two quiet local brake tests together.

**Complete format-specific interaction block:**

```yaml
headline: "WHY DID THREE OCTOBER REPORTS AGREE?"
readings:
  - {zone: controller, label: "Replacement controller", value: "sealed; delivered later", state: quiet}
  - {zone: records, label: "Three speed reports", value: "one portable kit", state: alarm}
  - {zone: independent, label: "Independent acceleration estimate", value: "7% lower", state: alarm}
  - {zone: brakes, label: "Ferris and bumper local tests", value: "match local models", state: quiet}
choices:
  - {id: controller, label: "Common replacement-controller failure", mechanism: "Device was absent."}
  - {id: all_brakes, label: "Three identical brake failures", mechanism: "Quiet local tests contradict it."}
  - {id: shared_cal, label: "Shared speed-kit calibration error", mechanism: "Explains agreement and independent disagreement."}
  - {id: gravity, label: "Gravity changed during October", mechanism: "Would affect independent tests too."}
answer: shared_cal
```

**Correct result:** Choice 3 - shared speed-kit calibration error.

**Answer text:** A shared speed-kit calibration error best fits all readings.

**Why:** It creates matching historical values while allowing independent measurements and local brakes to behave normally.

**Wrong-path feedback:** (controller) The replacement controller arrived after the event and was never installed. (all_brakes) Independent local brake tests are quiet, so three identical brake failures do not fit. (gravity) A gravity change would also shift independent acceleration and period evidence, which it does not.

**State/output:** Reject common-controller theory; unlock independent retesting plan.

## Mission outcome

Mission decision: The new controller did not cause the October event. It came later and is still sealed. The three speed reports all used one test kit. Each ride now needs a test that does not use that kit.

**Segue - exact player copy:** But Hart's missing card has surfaced; Chen must test what her manual stop did to the rider load.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Tunde Idowu pins the INSTALLED AFTER OCTOBER date strip beside the crate record. But Hart's missing card has surfaced; Chen must test what her manual stop did to the rider load.

**Header:** MISSION 6 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 09:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Historical speed evidence is decertified, lowering apparent progress while improving the investigation.  
**Automatic bar change:** Certificate -8 | Proof +12 | Reserve -2 | Confidence -5  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +5/+2/+3/+2. Result: 43 | 75 | 68 | 94.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Upstream dependency:** Upstream dependency is a shared earlier source that several later readings rely on.
- A diagnosis must fit both abnormal and quiet readings.

### Review question 1


**Prompt - exact player copy:** Which statement best explains upstream dependency?

**Options - exact player copy:**

- A. Calibration is comparison that connects an instrument reading to a known physical value.
- B. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.
- C. Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.
- D. Upstream dependency is a shared earlier source that several later readings rely on.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for upstream dependency. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes calibration. It does not answer the question about upstream dependency.
- B: This describes causal test. It does not answer the question about upstream dependency.
- C: This describes quiet reading. It does not answer the question about upstream dependency.
- D: Correct. Upstream dependency is a shared earlier source that several later readings rely on.

### Review question 2


**Prompt - exact player copy:** Which statement best explains calibration?

**Options - exact player copy:**

- A. Calibration is comparison that connects an instrument reading to a known physical value.
- B. Upstream dependency is a shared earlier source that several later readings rely on.
- C. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.
- D. Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for calibration. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Calibration is comparison that connects an instrument reading to a known physical value.
- B: This describes upstream dependency. It does not answer the question about calibration.
- C: This describes causal test. It does not answer the question about calibration.
- D: This describes quiet reading. It does not answer the question about calibration.

### Review question 3


**Prompt - exact player copy:** Which statement best explains causal test?

**Options - exact player copy:**

- A. Upstream dependency is a shared earlier source that several later readings rely on.
- B. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.
- C. Calibration is comparison that connects an instrument reading to a known physical value.
- D. Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal test. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes upstream dependency. It does not answer the question about causal test.
- B: Correct. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.
- C: This describes calibration. It does not answer the question about causal test.
- D: This describes quiet reading. It does not answer the question about causal test.

### Review question 4


**Prompt - exact player copy:** Which statement best explains quiet reading?

**Options - exact player copy:**

- A. Upstream dependency is a shared earlier source that several later readings rely on.
- B. Calibration is comparison that connects an instrument reading to a known physical value.
- C. Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.
- D. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for quiet reading. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes upstream dependency. It does not answer the question about quiet reading.
- B: This describes calibration. It does not answer the question about quiet reading.
- C: Correct. Quiet reading is a normal measurement that can rule out explanations predicting an alarm there.
- D: This describes causal test. It does not answer the question about quiet reading.

### Review question 5


**Prompt - exact player copy:** Which statement best explains spring constant?

**Options - exact player copy:**

- A. Upstream dependency is a shared earlier source that several later readings rely on.
- B. Calibration is comparison that connects an instrument reading to a known physical value.
- C. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.
- D. Spring constant is a measure of spring stiffness; a larger value means more force is required for the same stretch or compression.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for spring constant. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes upstream dependency. It does not answer the question about spring constant.
- B: This describes calibration. It does not answer the question about spring constant.
- C: This describes causal test. It does not answer the question about spring constant.
- D: Correct. Spring constant is a measure of spring stiffness; a larger value means more force is required for the same stretch or compression.

### Review question 6


**Prompt - exact player copy:** A motor fails on Monday. A proposed cause is a replacement controller that arrived sealed on Wednesday and has never been connected. What does that timeline show?

**Options - exact player copy:**

- A. The replacement controller cannot have caused the Monday failure because it was absent and disconnected at the time.
- B. Upstream dependency is a shared earlier source that several later readings rely on.
- C. Calibration is comparison that connects an instrument reading to a known physical value.
- D. Causal test is an intervention that changes one proposed cause and checks whether the predicted response follows.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal intervention. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. The replacement controller cannot have caused the Monday failure because it was absent and disconnected at the time.
- B: This describes upstream dependency. It does not answer the question about causal intervention.
- C: This describes calibration. It does not answer the question about causal intervention.
- D: This describes causal test. It does not answer the question about causal intervention.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- A cause must precede and connect to its effect.
- Separate displays may share one upstream dependency.
- Quiet readings can rule explanations out.
- **Mission takeaway:** Agreement is not independent confirmation when every value comes from one measuring chain.

# Mission 7 - The Card in Hart's Hand

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 7 - 9 DAYS UNTIL THE PARK REVIEW.

**Card title:** THE CARD IN HART'S HAND

**Go now:** Go to the Bumper Car Pavilion and meet Linh Chen, the instrumentation and test lead, at the dummy rig.

**Card body:** 9 days until the park review. A worn operator card lies beneath the padded-stop force trace. Today you decide what the padded stop proves about Hart's action.

**Objective:** Use independent collision data to judge the effect of Hart's interruption.

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
  - id: safety_m07_we01
    title: Signed momentum
    problem: A 2 kg cart moves right at 3 m/s and a 1 kg cart moves left at 2 m/s. Find total momentum, right positive.
    rule: Total momentum=sum m_i v_i with signed velocities.
    steps:
    - 'Set up the relationship: Total momentum=sum m_i v_i with signed velocities.'
    - p_total=2(+3)+1(-2)=+4 kg m/s.
    answer: Total momentum is 4 kg m/s to the right.
    common_mistake: Opposite velocities must have opposite signs.
  - id: safety_m07_we02
    title: Objects stick together
    problem: A 2 kg cart at 3 m/s hits a stationary 1 kg cart and they stick. External impulse is negligible. Find final velocity.
    rule: Momentum conservation gives m1v1+m2v2=(m1+m2)vf.
    steps:
    - 'Set up the relationship: Momentum conservation gives m1v1+m2v2=(m1+m2)vf.'
    - vf=[2(3)+1(0)]/(2+1)=6/3=2 m/s.
    answer: The joined carts move at 2 m/s in the initial direction.
    common_mistake: Kinetic energy need not be conserved in a sticking collision.
  - id: safety_m07_we03
    title: Impulse from force and time
    problem: A constant 10 N net force acts for 0.2 s. Find impulse.
    rule: J=F_net Δt=Δp.
    steps:
    - 'Set up the relationship: J=F_net Δt=Δp.'
    - J=10(0.2)=2 N s=2 kg m/s.
    answer: Momentum changes by 2 kg m/s in the force direction.
    common_mistake: Impulse depends on duration as well as force.
  - id: safety_m07_we04
    title: Average stopping force
    problem: A 2 kg object slows from 4 m/s to rest in 0.5 s. Find average net force along the initial positive direction.
    rule: F_avg=Δp/Δt=m(vf-vi)/Δt.
    steps:
    - 'Set up the relationship: F_avg=Δp/Δt=m(vf-vi)/Δt.'
    - F_avg=2(0-4)/0.5=-16 N.
    answer: Average net force is 16 N opposite the original motion.
    common_mistake: This average is not necessarily the peak force.
  - id: safety_m07_we05
    title: Area under a force pulse
    problem: A triangular force-time pulse rises from 0 to 10 N and returns to 0 over 2 s. Find impulse.
    rule: Impulse is the signed area under the force-time graph.
    steps:
    - 'Set up the relationship: Impulse is the signed area under the force-time graph.'
    - J=(1/2)(2 s)(10 N)=10 N s.
    answer: The impulse is 10 N s.
    common_mistake: Peak force times duration treats the triangle as a rectangle.
    figure:
      kind: line
      xLabel: Time (s)
      yLabel: Force (N)
      caption: A triangular force pulse.
      series:
      - name: Force (N)
        points:
        - - 0
          - 0
        - - 1
          - 10
        - - 2
          - 0
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Momentum: Momentum is mass times velocity; it is a vector and carries the velocity's direction.

Impulse: Impulse is force applied over time; it equals the change in momentum.

Isolated system: Isolated system is a chosen system with negligible net external impulse during the interval studied.

Inelastic collision: Inelastic collision is a collision that conserves system momentum but not kinetic energy.

#### Primer concepts

- Assign signs before adding momentum.
- Momentum can be conserved through a collision even when kinetic energy is not.
- A longer stopping time produces a smaller average force for the same momentum change.

#### Equations first needed today

**Equation:** `p = mv` and `Σpbefore = Σpafter`  
**What it is for:** tracking motion through an isolated collision  
**Symbols:** `p` is momentum, `m` is mass, and `v` is signed velocity.  
**Why this campaign needs it:** The cars' post-impact motion must be predicted without the disputed speed wheel.

**Equation:** `J = FavgΔt = Δp`  
**What it is for:** connecting a momentum change to average force and collision time  
**Symbols:** `J` is impulse, `Favg` is average force, `Δt` is contact time, and `Δp` is momentum change.  
**Why this campaign needs it:** The dummy's neck load depends on how quickly the car and rider stop.

**Crew:** Linh Chen - test lead; Maya Hart - operations lead; Ruth Brennan - former chief engineer.

## Main story happening - designer summary

Independent acceleration and timing replace the shared speed kit. The player predicts a stuck-together speed of 0.88 m/s for the two test cars and verifies the impulse. Hart's card proves she manually interrupted the sequence, but the collision force is lower, not higher, because the extended stop time reduces average force. The action is established; motive remains open.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Bumper Car Pavilion | automatic**

**Trigger:** mission_7_arrival.

**World state:** A worn operator card lies beneath the padded-stop force trace.

**Panel/HUD text:** `STOP 25-27 READY`

**Dialogue bubbles -** Linh Chen: “This collision gets its own clock.”

**Unlocks:** Stops 25-27.

**Beat 2 - After Stop 27 | automatic**

**Trigger:** accepted_stop_25.

**World state:** At `car-on-stands`, the dated accepted-result slip for Stop 25 reads: "Submit +440 kg·m/s (right).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `BELOW TEST LIMIT`

**Dialogue bubbles -** Linh Chen: “Nice work. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Brennan's Workshop.

**Beat 3 - On arrival at Brennan's Workshop | automatic**

**Trigger:** accepted_stop_26.

**World state:** At `pavilion-board`, the dated accepted-result slip for Stop 26 reads: "Submit +0.88 m/s (right).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 28 READY`

**Dialogue bubbles -** Maya Hart: “Good thinking. I interrupted the sequence. The card says what I did, not whether it was right.”

**Unlocks:** Stop 28.

**Beat 4 - After Stop 28 | automatic**

**Trigger:** accepted_stop_27.

**World state:** At `dummy-rig`, the dated accepted-result slip for Stop 27 reads: "Commit 280 N; measure 291 N; both support a value below 350 N.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `ACTION VERIFIED / EFFECT NOT HARMFUL HERE`

**Dialogue bubbles -** Linh Chen: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_28.

**World state:** At `casebook-table`, Maya Hart places the recovered October card in the evidence sleeve. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 7 COMPLETE`

**Dialogue bubbles -** Maya Hart: "I stopped it. Now we can show what that stop did. But Brennan's ship trace still sits near six seconds; it may explain why Hart stopped the test."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Pirate Ship console.

### Physical aftermath — safety-m07

**Home:** `casebook-table`. **Before:** The dated mission-7 evidence holder at this fixture has no accepted record. A worn operator card lies beneath the padded-stop force trace.
**After — exact action:** Maya Hart places the recovered October card in the evidence sleeve.
**Trigger:** accepted_stop_28. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `timing-trace`, the drive ticks line up with the ship's free swing marks.
**Segue - exact player copy:** But Brennan's ship trace still sits near six seconds; it may explain why Hart stopped the test.

## Location plan

**Two locations:** Bumper Cars produces the independent physics result; that result is required to interpret Hart's card at the Workshop.

## Characters and dramatic beat

Hart admits the action rather than hiding it. Chen refuses to infer motive from a timestamp. Brennan reveals that the card had been filed with emergency procedures, not removed from the park.

## Key concepts, explained here

Momentum is conserved over a short collision when external impulse is negligible. Kinetic energy may become heat, sound, and deformation. Impulse equals momentum change, so spreading a change over more time lowers average force.

## Stop 25 - Put directions into momentum

**Format/placement:** BALLPARK, asked at `car-on-stands`.

**Metadata:** Concept: 19 - Signed momentum; Keystone: momentum; Area: Bumper Car Pavilion; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the car on stands, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The collision test is next, and opposite directions must be distinguished before combining momentum.

**Question card story setup - exact player copy:** A 240 kg car moves right at 4.0 m/s while a 260 kg car moves left at 2.0 m/s. Estimate their signed total momentum before the instrumented test impact begins.

**Question card story-science connection - exact player copy:** Signed total momentum predicts the direction of motion that the joined cars should retain.

**Question card prompt - exact player copy:** Given rightward momentum `+960 kg m/s` and leftward momentum `-520 kg m/s`, use `p_total = p1 + p2`. Submit one signed numerical total in `kg m/s` and state its direction.

```yaml
estimate: {labels: ["Rightward momentum", "Leftward momentum"], values: [960,-520], slots: [p1,p2], template: "ptotal = {p1} + {p2}", formula: "p_total=960-520", correct: 440, target: 440, tolerance: 0.03, unit: "kg m/s"}
```

**Correct result:** Submit +440 kg·m/s (right).

**Answer text:** Total momentum before impact is 440 kg m/s to the right.

**Why:** Opposite directions receive opposite signs.

**Wrong-path feedback:** Adding magnitudes predicts 1480 kg m/s and erases direction.

**State/output:** Display the rightward total-momentum arrow.

## Stop 26 - Derive the joined speed

**Format/placement:** DERIVE, asked at `pavilion-board`.

**Metadata:** Concept: 20 - Perfectly inelastic collision; Keystone: momentum; Area: Bumper Car Pavilion; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the momentum board, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The incoming momentum is established and the cars' shared post-impact speed is still unknown.

**Question card story setup - exact player copy:** Use signed momentum to derive their shared velocity immediately after collision.

**Question card story-science connection - exact player copy:** The joined velocity supplies the motion change needed for the restraint-force calculation.

**Fixture source panel - exact player copy:** Use signed momentum to derive their shared velocity immediately after collision. Given m1 = 240 kg, v1 = +4.0 m/s, m2 = 260 kg, and v2 = -2.0 m/s, use m1v1 + m2v2 = (m1 + m2)vf.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation and one signed common-velocity number in `m/s` with direction.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["Given `m1 = 240 kg`, `v1 = +4.0 m/s`, `m2 = 260 kg`, and `v2 = -2.0 m/s`, use `m1v1 + m2v2 = (m1 + m2)vf`."]
  lines:
    - {id: conserve, expression: "m1v1 + m2v2 = (m1+m2)vf", rule: "momentum conservation"}
    - {id: substitute, expression: "240(4.0)+260(-2.0)=500vf", rule: "use signed velocities"}
    - {id: result, expression: "vf = 0.88 m/s right", rule: "solve with direction"}
  order: [conserve,substitute,result]
  decoys:
    - {expression: "240(4.0)+260(2.0)=500vf", rule: "add speed magnitudes and ignore direction"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Momentum is not conserved because the carts stick`
2. `240(4.0)+260(2.0)=500v_f`
3. `v_f=2.96 m/s right`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Given `m1 = 240 kg`, `v1 = +4.0 m/s`, `m2 = 260 kg`, and `v2 = -2.0 m/s`, use `m1v1 + m2v2 = (m1 + m2)vf`."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the joined speed in the form and units requested by the prompt"
  left_side: "vf"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "m1v1 + m2v2 = (m1+m2)vf", correct: true}
        - {text: "m1v1 + m2v2 = (m1+m2)(0)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "240(4.0)+260(-2.0)=500vf", correct: true}
        - {text: "240(4.0)+260(2.0)=500v_f", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "vf = 0.88 m/s right", correct: true}
        - {text: "v_f = 2.96 m/s to the right", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Submit +0.88 m/s (right).

**Answer text:** The coupled cars move right at 0.88 m/s immediately after impact.

**Why:** The 440 kg m/s net momentum is shared by 500 kg.

**Wrong-path feedback:** Kinetic energy is not conserved in a collision where the cars couple.

**State/output:** Set test prediction to 0.88 m/s.

## Stop 27 - Verify the rider impulse

**Format/placement:** VERIFY, asked at `dummy-rig`.

**Metadata:** Concept: 21 - Impulse and force; Keystone: impulse; Area: Bumper Car Pavilion; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Call - exact player copy:** Go to the padded dummy rig, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The collision prediction is ready for comparison with the independent neck-rig measurement.

**Question card story setup - exact player copy:** The independent sensors measure a 0.88 m/s joined speed and a 0.22 s padded stop for the 70 kg dummy. Predict average force, then compare it with the separate neck-rig reading.

**Question card story-science connection - exact player copy:** The average restraint force determines whether this tested impact stays below the stated force limit.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Given dummy mass `m = 70 kg`, speed change magnitude `Delta v = 0.88 m/s`, stop time `Delta t = 0.22 s`, and campaign limit `350 N`, use `F_avg = m Delta v / Delta t` and submit a force prediction in `N`; the rig stays locked until you commit. OPERATE: Run the padded coupled-car stop. MEASURE: Record average stopping force in `N`. INTERPRET: Submit one conclusion comparing prediction and measurement with the `25 N` tolerance and the `350 N` limit.

**Complete format-specific interaction block:**

```yaml
verify: {prediction: {value: 280, unit: N, tolerance: 25}, commit_required_before_unlock: true, phase_order: [calculate_and_commit, operate, measure, interpret], action: "Run padded coupled-car stop", measurement: {value: 291, unit: N}, failure_if_unmeasured: true, correct_conclusion: "Force agrees and remains below the fictional 350 N test limit."}
```

**Correct result:** Commit 280 N; measure 291 N; both support a value below 350 N.

**Answer text:** The padded stop agrees with a 280 N prediction and remains below the 350 N campaign limit.

**Why:** The impulse is fixed by the velocity change; the 0.22 s duration spreads it out.

**Wrong-path feedback:** Dividing by a shorter time must increase, not decrease, average force.

**State/output:** Mark the dummy test as passing.

## Stop 28 - What does the card prove?

**Format/placement:** CASEBOOK, asked at Maya Hart beside `casebook-table`.

**Metadata:** Concept: 35 - Evidence interpretation; Keystone: model limits; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Talk to Maya Hart, at the Casebook table in Brennan's Workshop.

**Stop reason - exact player copy:** The impact result is known, but the interruption record still mixes an action with assumptions about motive.

**Question card story setup - exact player copy:** The independent collision test stays below its force limit, while Hart's card records a manual interruption at 14:03. Match each clue to the claim it can actually support about that event.

**Question card story-science connection - exact player copy:** Separating the verified action from its measured effect prevents the certificate from presenting speculation as evidence.

**Question card prompt - exact player copy:** Submit one four-pair casebook mapping from timestamp, manual-stop log, measured dummy force, and blank reason field to the single interpretation each clue supports.

**Complete format-specific interaction block:**

```yaml
scenarios: ["Card timestamp 14:03", "Manual-stop switch logged", "Dummy force 291 N", "Reason field blank"]
choices: ["Hart acted during the test", "The sequence was interrupted", "The tested stop remained below limit", "Motive is not recorded"]
mapping: ["Hart acted during the test", "The sequence was interrupted", "The tested stop remained below limit", "Motive is not recorded"]
```

**Correct result:** Map action to interruption verified; effect to not harmful here; motive not established.

**Answer text:** Hart interrupted the sequence; the card does not show harmful force or motive.

**Why:** Documentary evidence and physical evidence answer different questions.

**Wrong-path feedback:** Do not let an action record supply a motive it does not contain.

**State/output:** Set `evidence_flags.hart_action_verified = true`, `hart_motive_open = true`.

## Mission outcome

Mission decision: Hart did not raise the crash risk in the Bumper Car test. The long padded stop kept the mean force below the game limit. Her stop is real, but the card gives no reason. The Pirate Ship timing trace may show what she stopped.

**Segue - exact player copy:** But Brennan's ship trace still sits near six seconds; it may explain why Hart stopped the test.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Maya Hart places the recovered October card in the evidence sleeve. But Brennan's ship trace still sits near six seconds; it may explain why Hart stopped the test.

**Header:** MISSION 7 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 09:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Independent sensors consume reserve but restore one collision record.  
**Automatic bar change:** Certificate +6 | Proof +8 | Reserve -5 | Confidence +4  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +3/+3/+4/+2. Result: 52 | 86 | 67 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Center of mass:** Center of mass is the mass-weighted average position or velocity of a system.

### Review question 1


**Prompt - exact player copy:** Which statement best explains center of mass?

**Options - exact player copy:**

- A. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- B. Center of mass is the mass-weighted average position or velocity of a system.
- C. Impulse is force applied over time; it equals the change in momentum.
- D. Isolated system is a chosen system with negligible net external impulse during the interval studied.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for center of mass. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes momentum. It does not answer the question about center of mass.
- B: Correct. Center of mass is the mass-weighted average position or velocity of a system.
- C: This describes impulse. It does not answer the question about center of mass.
- D: This describes isolated system. It does not answer the question about center of mass.

### Review question 2


**Prompt - exact player copy:** Which statement best explains momentum?

**Options - exact player copy:**

- A. Center of mass is the mass-weighted average position or velocity of a system.
- B. Impulse is force applied over time; it equals the change in momentum.
- C. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- D. Isolated system is a chosen system with negligible net external impulse during the interval studied.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for momentum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes center of mass. It does not answer the question about momentum.
- B: This describes impulse. It does not answer the question about momentum.
- C: Correct. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- D: This describes isolated system. It does not answer the question about momentum.

### Review question 3


**Prompt - exact player copy:** Which statement best explains impulse?

**Options - exact player copy:**

- A. Center of mass is the mass-weighted average position or velocity of a system.
- B. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- C. Isolated system is a chosen system with negligible net external impulse during the interval studied.
- D. Impulse is force applied over time; it equals the change in momentum.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for impulse. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes center of mass. It does not answer the question about impulse.
- B: This describes momentum. It does not answer the question about impulse.
- C: This describes isolated system. It does not answer the question about impulse.
- D: Correct. Impulse is force applied over time; it equals the change in momentum.

### Review question 4


**Prompt - exact player copy:** Which statement best explains isolated system?

**Options - exact player copy:**

- A. Isolated system is a chosen system with negligible net external impulse during the interval studied.
- B. Center of mass is the mass-weighted average position or velocity of a system.
- C. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- D. Impulse is force applied over time; it equals the change in momentum.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for isolated system. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Isolated system is a chosen system with negligible net external impulse during the interval studied.
- B: This describes center of mass. It does not answer the question about isolated system.
- C: This describes momentum. It does not answer the question about isolated system.
- D: This describes impulse. It does not answer the question about isolated system.

### Review question 5


**Prompt - exact player copy:** Which statement best explains inelastic collision?

**Options - exact player copy:**

- A. Center of mass is the mass-weighted average position or velocity of a system.
- B. Inelastic collision is a collision that conserves system momentum but not kinetic energy.
- C. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- D. Impulse is force applied over time; it equals the change in momentum.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for inelastic collision. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes center of mass. It does not answer the question about inelastic collision.
- B: Correct. Inelastic collision is a collision that conserves system momentum but not kinetic energy.
- C: This describes momentum. It does not answer the question about inelastic collision.
- D: This describes impulse. It does not answer the question about inelastic collision.

### Review question 6


**Prompt - exact player copy:** Which statement best explains signed momentum?

**Options - exact player copy:**

- A. Center of mass is the mass-weighted average position or velocity of a system.
- B. Momentum is mass times velocity; it is a vector and carries the velocity's direction.
- C. Opposite directions receive opposite signs.
- D. Impulse is force applied over time; it equals the change in momentum.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for signed momentum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes center of mass. It does not answer the question about signed momentum.
- B: This describes momentum. It does not answer the question about signed momentum.
- C: Correct. Opposite directions receive opposite signs.
- D: This describes impulse. It does not answer the question about signed momentum.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Momentum is a signed vector.
- Momentum survives an isolated inelastic collision; kinetic energy need not.
- Impulse is change in momentum and also average force times time.
- **Mission takeaway:** Evidence that proves an action does not automatically prove its effect or motive.

# Mission 8 - Six Seconds

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 8 - 8 DAYS UNTIL THE PARK REVIEW.

**Card title:** SIX SECONDS

**Go now:** Go to the Pirate Ship console and meet Tunde Idowu, the controls engineer, at the timing trace.

**Card body:** 8 days until the park review. The drive ticks line up with the ship's free swing marks. Today you decide whether the drive timing made the swings grow.

**Objective:** Determine the physical effect of Hart's pirate-ship override.

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
  - id: safety_m08_we01
    title: Measure a period
    problem: An oscillator completes 5 cycles in 10 s. Find period and frequency.
    rule: Period T=total time/cycles; frequency f=1/T.
    steps:
    - 'Set up the relationship: Period T=total time/cycles; frequency f=1/T.'
    - T=10/5=2 s; f=1/2=0.5 Hz.
    answer: One cycle takes 2 s, and there are 0.5 cycles per second.
    common_mistake: Frequency and period are reciprocals, not the same quantity.
  - id: safety_m08_we02
    title: Mass-spring period
    problem: A mass m=1 kg is on a spring k=4 N/m. Find the ideal period.
    rule: T=2πsqrt(m/k) for small ideal mass-spring oscillations.
    steps:
    - 'Set up the relationship: T=2πsqrt(m/k) for small ideal mass-spring oscillations.'
    - T=2πsqrt(1/4)=π s.
    answer: The period is π seconds.
    common_mistake: The mass-to-stiffness ratio belongs inside the square root.
  - id: safety_m08_we03
    title: Change pendulum length
    problem: An ideal small-angle pendulum's length increases from 1 m to 4 m at the same gravity. Compare periods.
    rule: T=2πsqrt(L/g), so T2/T1=sqrt(L2/L1).
    steps:
    - 'Set up the relationship: T=2πsqrt(L/g), so T2/T1=sqrt(L2/L1).'
    - T2/T1=sqrt(4/1)=2.
    answer: The longer pendulum takes twice as long per swing.
    common_mistake: Its period does not quadruple when length quadruples.
  - id: safety_m08_we04
    title: Identify resonance
    problem: An oscillator has natural frequency 2 Hz. Equal small periodic forces at 1,2,3 Hz produce the largest amplitude near 2 Hz. Explain.
    rule: Driving near a system's natural frequency can produce resonance.
    steps:
    - The 2 Hz drive repeatedly adds energy at favorable phases of the motion.
    - Damping limits the eventual response; the forcing does not need to be large to create a large amplitude.
    answer: The peak response near 2 Hz is consistent with resonance.
    common_mistake: Resonance does not mean amplitude grows forever in a damped system.
  - id: safety_m08_we05
    title: Use a reversible intervention
    problem: A lamp draws 2 A at setting A, 3 A at setting B, and 2 A after returning to A. Supply voltage and the lamp are unchanged. What does this support?
    rule: Change one proposed cause, hold other relevant factors fixed, then restore the original condition.
    steps:
    - A → B changes the current by 3-2 = 1 A.
    - B → A restores 2 A. The response reverses with the setting under the stated controls.
    answer: The result supports a setting effect under these test conditions.
    common_mistake: One intervention does not prove the effect is identical under every other condition.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Oscillation: Oscillation is repeated motion around an equilibrium position.

Period: Period is time for one complete cycle.

Natural period: Natural period is the period a system follows when displaced and released without repeated driving.

Resonance: Resonance is large response produced when repeated driving occurs near a system's natural frequency.

#### Primer concepts

- Rider mass does not set the simple-pendulum period.
- Driving near the natural rhythm can add energy cycle after cycle.
- A brake problem and a resonance problem predict different timing patterns.

#### Equations first needed today

**Equation:** `T = 2π√(L/g)`  
**What it is for:** predicting the period of a small-angle pendulum  
**Symbols:** `T` is period, `L` is effective pendulum length, and `g` is gravitational-field magnitude.  
**Why this campaign needs it:** The measured free period must be compared with the programmed drive interval.

**Equation:** `g = G M_E/R_E²`  
**What it is for:** predicting Earth's surface gravitational field  
**Symbols:** `G` is the gravitational constant, `M_E` is Earth's mass, and `R_E` is Earth's radius.  
**Why this campaign needs it:** A gravity value predicted independently can check whether the timing model uses a plausible local `g`.

**Crew:** Tunde Idowu - controls engineer; Maya Hart - operations lead; Linh Chen - test lead.

## Main story happening - designer summary

The player measures a 6.15 s free period, derives the pendulum relation and mass cancellation, and verifies surface `g`. A low-power control sweep shows rapid amplitude growth near the 5.85 s drive interval. Twist 2 lands: Hart's manual interruption prevented continued near-resonant driving.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Pirate Ship console | automatic**

**Trigger:** mission_8_arrival.

**World state:** The drive ticks line up with the ship's free swing marks.

**Panel/HUD text:** `STOP 29-31 READY`

**Dialogue bubbles -** Tunde Idowu: “Close is not always harmless.”

**Unlocks:** Stops 29-31.

**Beat 2 - After Stop 31 | automatic**

**Trigger:** accepted_stop_29.

**World state:** At `timing-trace`, the dated accepted-result slip for Stop 29 reads: "Submit 6.15 s; accept 6.10-6.20 s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 32 READY`

**Dialogue bubbles -** Tunde Idowu: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 32.

**Beat 3 - After Stop 32 | automatic**

**Trigger:** accepted_stop_30.

**World state:** At `ship-console-board`, the dated accepted-result slip for Stop 30 reads: "Order model → substitute → solve → interpret; L≈9.39 m; mass cancels.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `POSSIBLE CAUSE`

**Dialogue bubbles -** Maya Hart: “Good thinking. I stopped it because each push was making the next swing larger.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 4 - After Stop 32 | automatic**

**Trigger:** accepted_stop_31.

**Beat ID:** `after-stop-32-holdout`

**World state:** At `drive-console`, the dated accepted-result slip for Stop 31 reads: "Choice 1 - change drive interval only, measure amplitude, restore and remeasure.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Tunde Idowu: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_32.

**World state:** At `timing-trace`, Ruth Brennan pins the FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S card to the trace. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 8 COMPLETE`

**Dialogue bubbles -** Ruth Brennan: "We had called it the usual rhythm. It was feeding the swing. Therefore Hart can clear the October accusation, but the mark on arm nine still needs an outside inspection."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Ferris Wheel machine room.

### Physical aftermath — safety-m08

**Home:** `timing-trace`. **Before:** The dated mission-8 evidence holder at this fixture has no accepted record. The drive ticks line up with the ship's free swing marks.
**After — exact action:** Ruth Brennan pins the FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S card to the trace.
**Trigger:** accepted_stop_32. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `arm-nine-file`, a barricade stays around arm nine beneath a chalked inspection mark.
**Segue - exact player copy:** Therefore Hart can clear the October accusation, but the mark on arm nine still needs an outside inspection.

## Location plan

**Two locations:** Pirate Ship for all physics and Bumper Car Pavilion for the final comparison with the independent interruption-force result from Mission 7.

## Characters and dramatic beat

Idowu connects controls to mechanics. Hart is vindicated by physics, not confession. Chen records that an emergency action may disturb one subsystem while preventing a larger failure elsewhere.

## Key concepts, explained here

A pendulum's restoring force is approximately proportional to displacement at small angles, producing simple harmonic motion. Its period depends on effective length and gravity, not mass. Repeated driving near the natural frequency can add energy coherently and increase amplitude.

## Stop 29 - Measure the free rhythm

**Format/placement:** SWEEP, asked at `timing-trace`.

**Metadata:** Concept: 28 - Period and amplitude; Keystone: oscillation; Area: Pirate Ship console; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the timing trace, in Pirate Ship console.

**Stop reason - exact player copy:** The disputed drive program is disconnected, allowing the ship's free motion to be measured.

**Question card story setup - exact player copy:** With the drive disconnected, sweep the displacement trace and mark successive peaks. Their spacing gives the ship's natural period without relying on the October control program or its disputed clock.

**Question card story-science connection - exact player copy:** Peak spacing establishes the natural period without depending on the disputed controller clock.

**Question card prompt - exact player copy:** OPERATE: Sweep the angular-displacement trace from `0.00 s` to `24.60 s`. MEASURE: Record two successive peak times in `s` and use `T = t_next - t_previous`. INTERPRET: Submit one numerical peak-to-peak period in `s`.

**Complete format-specific interaction block:**

```yaml
sweep:
  control: {id: time, label: "Time", min: 0, max: 24.6, step: 0.15, unit: s}
  response: {label: "Angular displacement", unit: deg}
  model: "theta = 4.0 exp(-0.015t) cos(2pi t/6.15)"
  peaks: [0,6.15,12.30,18.45,24.60]
  correct_region: {min: 6.10, max: 6.20}
  conclusion: "Successive positive peaks are separated by 6.15 s."
```

**Correct result:** Submit 6.15 s; accept 6.10-6.20 s.

**Answer text:** The natural period is 6.15 s.

**Why:** Period is the time between equivalent points such as adjacent positive peaks.

**Wrong-path feedback:** Peak-to-trough time is half a period.

**State/output:** Write `FREE PERIOD 6.15 s` beside `DRIVE INTERVAL 5.85 s`.

## Stop 30 - Derive what controls the period

**Format/placement:** DERIVE, asked at `ship-console-board`.

**Metadata:** Concept: 28 - Pendulum period; Keystone: oscillation and gravitation; Area: Pirate Ship console; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the period derivation board, in Pirate Ship console.

**Stop reason - exact player copy:** The natural period is measured, but the crew needs to know which physical properties determine it.

**Question card story setup - exact player copy:** Derive the small-angle relationship and identify which quantities cancel from the prediction.

**Question card story-science connection - exact player copy:** The period relationship distinguishes effective pendulum length from load mass when explaining the ship's rhythm.

**Fixture source panel - exact player copy:** Derive the small-angle relationship and identify which quantities cancel from the prediction. Given G = 6.67 x 10^-11 N m^2/kg^2, M_E = 5.97 x 10^24 kg, R_E = 6.37 x 10^6 m, and measured T = 6.15 s, use g = GM_E/R_E^2 and the small-angle torque model.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered symbolic derivation of `T = 2pi sqrt(L/g)`, one effective-length number in `m`, and a conclusion about mass dependence.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["Given `G = 6.67 x 10^-11 N m^2/kg^2`, `M_E = 5.97 x 10^24 kg`, `R_E = 6.37 x 10^6 m`, and measured `T = 6.15 s`, use `g = GM_E/R_E^2` and the small-angle torque model."]
  lines:
    - {id: gravity, expression: "g = G M_E/R_E^2 = 9.80 m/s^2", rule: "universal gravitation at Earth's surface"}
    - {id: torque, expression: "mL^2 theta_ddot = -mgL sin(theta)", rule: "rotational dynamics about pivot"}
    - {id: small, expression: "theta_ddot = -(g/L)theta", rule: "small-angle sin(theta) approximately theta; cancel m"}
    - {id: omega, expression: "omega^2 = g/L", rule: "SHM form"}
    - {id: period, expression: "T = 2pi sqrt(L/g)", rule: "T = 2pi/omega"}
  order: [gravity,torque,small,omega,period]
  decoys:
    - {expression: "T = 2pi sqrt(mL/g)", rule: "retain mass after it cancels from the equation of motion"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `g=GM_E/R_E`
2. `mLθ_ddot=−mg sinθ, missing a factor of L in torque/inertia`
3. `θ_ddot=−(mg/L)θ, retaining mass`
4. `ω=g/L`
5. `T=2πsqrt(mL/g), retaining mass after cancellation`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Given `G = 6.67 x 10^-11 N m^2/kg^2`, `M_E = 5.97 x 10^24 kg`, `R_E = 6.37 x 10^6 m`, and measured `T = 6.15 s`, use `g = GM_E/R_E^2` and the small-angle torque model."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive what controls the period in the form and units requested by the prompt"
  left_side: "g"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "g = G M_E/R_E^2 = 9.80 m/s^2", correct: true}
        - {text: "g = G M_E/R_E = 6.24×10^7 m/s²", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "mL^2 theta_ddot = -mgL sin(theta)", correct: true}
        - {text: "mL^2 theta_ddot = +mgL sin(theta)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "theta_ddot = -(g/L)theta", correct: true}
        - {text: "theta_ddot=-(mg/L)theta", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "omega^2 = g/L", correct: true}
        - {text: "omega^2 = (g/L)^2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "T = 2pi sqrt(L/g)", correct: true}
        - {text: "T = 2pi sqrt(mL/g)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: numerical_substitution
      doing: "Evaluate the stated operating condition"
      candidates:
        - {"text": "L=g(T/(2π))^2=9.80(6.15/(2π))^2=9.39 m", "correct": true}
        - {"text": "L=g(T/(2π))=9.80(6.15/(2π))=9.59 m", "correct": false, "survives": true, "reason": "The period relationship requires squaring T/(2π), not using it to the first power."}
```

**Correct result:** Order model → substitute → solve → interpret; L≈9.39 m; mass cancels.

**Answer text:** Universal gravitation predicts `g≈9.80 m/s²`; the small-angle period then depends on effective length and gravity, not rider mass.

**Why:** Both inertia and gravitational restoring torque scale with mass, so the mass cancels.

**Wrong-path feedback:** More mass increases both resistance to angular acceleration and gravitational torque by the same factor.

**State/output:** Add `LOAD DOES NOT REMOVE TIMING RISK` to the panel.

## Stop 31 - Establish resonance by reversal

**Format/placement:** CONTROL, asked at `drive-console`.

**Metadata:** Concept: 29 - Driven oscillation; Keystone: resonance; Area: Brennan's workshop; Learning role: PRACTICE; Difficulty: L3; Story role: reveal.

**Call - exact player copy:** Go to the Pirate Ship drive console, in Pirate Ship console.

**Stop reason - exact player copy:** The natural period suggests a timing problem that now needs a reversible test.

**Question card story setup - exact player copy:** Run low-power drives at separated intervals, then return to 5.85 s. If amplitude grows only near the free period and returns on reversal, drive timing is the physical cause here.

**Question card story-science connection - exact player copy:** Amplitude changes under a timing-only intervention test whether the drive is exciting resonance.

**Question card prompt - exact player copy:** BASELINE: At low fixed drive power and interval `5.85 s`, measure amplitude growth in degrees after five cycles. CHANGE ONE CONTROL: Set only the drive interval to `4.50 s`, keeping drive power, test mass, starting amplitude, and damping fixed. MEASURE: Record growth after five cycles at `4.50 s`. RESTORE: Return the interval to `5.85 s` and measure five more cycles; restoration is required. INTERPRET: Submit one conclusion stating whether near-resonant timing causes the growth.

**Complete format-specific interaction block:**

```yaml
control:
  baseline: {label: "Amplitude growth per 5 cycles at 5.85 s", value: 2.8, unit: deg}
  noise_band: 0.2
  changed_variable: "Drive interval from 5.85 s to 4.50 s and back"
  fixed_conditions: ["Low drive power", "Test mass", "Starting amplitude", "Damping"]
  measurement_timing: ["after five baseline cycles", "after five changed-interval cycles", "after five restored cycles"]
  state_measurements: {baseline_growth_deg: 2.8, changed_growth_deg: 0.1, restored_growth_deg: 2.7}
  candidates:
    - {id: timing, label: "Move drive to 4.50 s, then restore 5.85 s", response: -2.7, correct: true}
    - {id: riders, label: "Add test mass", response: 0.1, correct: false}
    - {id: paint, label: "Remove decorative panel", response: 0.0, correct: false}
  reversal_required: true
```

**Correct result:** Choice 1 - change drive interval only, measure amplitude, restore and remeasure.

**Answer text:** Moving the drive away removes growth, and restoring 5.85 s restores it; near-resonant timing is causal.

**Why:** The response follows one changed variable beyond noise and reverses when that variable returns.

**Wrong-path feedback:** (riders) Added mass does not shift the small-angle pendulum period and changes more than the drive timing. (paint) Removing a decorative panel does not change the programmed drive interval or test resonance.

**State/output:** Set `evidence_flags.resonance_verified = true`.

## Stop 32 - Reinterpret the interruption

**Format/placement:** DIAGNOSIS, asked at `collision-evidence-panel`.

**Metadata:** Concept: 35 - Whole-event diagnosis; Keystone: oscillation, impulse, evidence; Area: Pirate Ship console; Learning role: COMBINE; Difficulty: L4; Story role: twist.

**Call - exact player copy:** Go to the collision evidence panel, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The timing test is complete, so Hart's interruption can be judged against its measured effects.

**Question card story setup - exact player copy:** Diagnose the full effect of Hart's interruption across both tested ride systems today.

**Question card story-science connection - exact player copy:** The combined ride evidence determines whether the override increased danger or interrupted harmful motion.

**Question card prompt - exact player copy:** Submit one causal conclusion that explains the free period `6.15 s`, drive interval `5.85 s`, rising pre-stop amplitude, dummy force `291 N < 350 N`, and manual stop at `14:03` together.

**Complete format-specific interaction block:**

```yaml
headline: "EFFECT OF THE 14:03 MANUAL INTERRUPTION"
readings:
  - {zone: ship, label: "Free period / drive interval", value: "6.15 s / 5.85 s", state: alarm}
  - {zone: ship, label: "Amplitude trend before stop", value: "rising", state: alarm}
  - {zone: bumper, label: "Dummy average force", value: "291 N < 350 N", state: quiet}
  - {zone: control, label: "Manual stop", value: "14:03", state: quiet}
choices:
  - {id: caused, label: "Override created the resonance", mechanism: "Growth began before stop."}
  - {id: prevented, label: "Override interrupted near-resonant driving", mechanism: "Fits timing, growth, and quiet collision force."}
  - {id: mass, label: "Too many riders changed the period", mechanism: "Mass cancels."}
  - {id: brake, label: "One brake fault explains both", mechanism: "Timing dependence and quiet force contradict it."}
answer: prevented
```

**Correct result:** Choice 2 - near-resonant timing; Hart's override was protective.

**Answer text:** Hart's override interrupted near-resonant driving and prevented further amplitude growth.

**Why:** The ship was already gaining amplitude, moving the drive interval removes growth, and the bumper interruption did not exceed its force limit.

**Wrong-path feedback:** (caused) Amplitude growth begins before Hart's stop, so the override cannot have created it. (mass) Rider mass cancels from the small-angle period model. (brake) A shared brake fault does not explain the drive-interval dependence or the quiet collision-force evidence.

**State/output:** Set `hart_vindicated = true`; unlock forbidden drive-band design.

## Mission outcome

Mission decision: Hart stopped a larger risk. The Pirate Ship drive was close to its free period, so each swing grew. The Bumper Car force stayed below its limit. The card now shows a safety act, not harm.

**Segue - exact player copy:** Therefore Hart can clear the October accusation, but the mark on arm nine still needs an outside inspection.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Ruth Brennan pins the FORBIDDEN DRIVE BAND: 5.70 TO 6.30 S card to the trace. Therefore Hart can clear the October accusation, but the mark on arm nine still needs an outside inspection.

**Header:** MISSION 8 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 09:30`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** The pirate drive remains locked while a new timing rule is written.  
**Automatic bar change:** Certificate +5 | Proof +8 | Reserve -3 | Confidence +8  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +4/+3/+5/+0. Result: 61 | 97 | 69 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Restoring force:** Restoring force is a force directed back toward equilibrium.
- **Damping:** Damping is transfer of oscillation energy that reduces amplitude over time.

### Review question 1


**Prompt - exact player copy:** Which statement best explains restoring force?

**Options - exact player copy:**

- A. Damping is transfer of oscillation energy that reduces amplitude over time.
- B. Oscillation is repeated motion around an equilibrium position.
- C. Period is time for one complete cycle.
- D. Restoring force is a force directed back toward equilibrium.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for restoring force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes damping. It does not answer the question about restoring force.
- B: This describes oscillation. It does not answer the question about restoring force.
- C: This describes period. It does not answer the question about restoring force.
- D: Correct. Restoring force is a force directed back toward equilibrium.

### Review question 2


**Prompt - exact player copy:** Which statement best explains damping?

**Options - exact player copy:**

- A. Damping is transfer of oscillation energy that reduces amplitude over time.
- B. Restoring force is a force directed back toward equilibrium.
- C. Oscillation is repeated motion around an equilibrium position.
- D. Period is time for one complete cycle.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for damping. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Damping is transfer of oscillation energy that reduces amplitude over time.
- B: This describes restoring force. It does not answer the question about damping.
- C: This describes oscillation. It does not answer the question about damping.
- D: This describes period. It does not answer the question about damping.

### Review question 3


**Prompt - exact player copy:** Which statement best explains oscillation?

**Options - exact player copy:**

- A. Restoring force is a force directed back toward equilibrium.
- B. Oscillation is repeated motion around an equilibrium position.
- C. Damping is transfer of oscillation energy that reduces amplitude over time.
- D. Period is time for one complete cycle.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for oscillation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes restoring force. It does not answer the question about oscillation.
- B: Correct. Oscillation is repeated motion around an equilibrium position.
- C: This describes damping. It does not answer the question about oscillation.
- D: This describes period. It does not answer the question about oscillation.

### Review question 4


**Prompt - exact player copy:** Which statement best explains period?

**Options - exact player copy:**

- A. Restoring force is a force directed back toward equilibrium.
- B. Damping is transfer of oscillation energy that reduces amplitude over time.
- C. Period is time for one complete cycle.
- D. Oscillation is repeated motion around an equilibrium position.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for period. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes restoring force. It does not answer the question about period.
- B: This describes damping. It does not answer the question about period.
- C: Correct. Period is time for one complete cycle.
- D: This describes oscillation. It does not answer the question about period.

### Review question 5


**Prompt - exact player copy:** Which statement best explains natural period?

**Options - exact player copy:**

- A. Restoring force is a force directed back toward equilibrium.
- B. Damping is transfer of oscillation energy that reduces amplitude over time.
- C. Oscillation is repeated motion around an equilibrium position.
- D. Natural period is the period a system follows when displaced and released without repeated driving.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for natural period. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes restoring force. It does not answer the question about natural period.
- B: This describes damping. It does not answer the question about natural period.
- C: This describes oscillation. It does not answer the question about natural period.
- D: Correct. Natural period is the period a system follows when displaced and released without repeated driving.

### Review question 6


**Prompt - exact player copy:** Which statement best explains resonance?

**Options - exact player copy:**

- A. Resonance is large response produced when repeated driving occurs near a system's natural frequency.
- B. Restoring force is a force directed back toward equilibrium.
- C. Damping is transfer of oscillation energy that reduces amplitude over time.
- D. Oscillation is repeated motion around an equilibrium position.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for resonance. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Resonance is large response produced when repeated driving occurs near a system's natural frequency.
- B: This describes restoring force. It does not answer the question about resonance.
- C: This describes damping. It does not answer the question about resonance.
- D: This describes oscillation. It does not answer the question about resonance.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Period measures one complete cycle.
- Pendulum period depends on length and gravity, not mass.
- Driving near the natural period can add energy repeatedly.
- **Mission takeaway:** A disruptive action can be protective when it interrupts a growing physical instability.

# Mission 9 - Arm Nine

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 9 - 7 DAYS UNTIL THE PARK REVIEW.

**Card title:** ARM NINE

**Go now:** Go to the Ferris Wheel machine room and meet Luka Kovač, the mechanical lead, beside the arm-nine file.

**Card body:** 7 days until the park review. A barricade stays around arm nine beneath a chalked inspection mark. Today you decide which wheel limits still need an outside check.

**Objective:** Set a defensible load-and-wind envelope for the Ferris Wheel.

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
  - id: safety_m09_we01
    title: Calculate torque
    problem: A 10 N force acts perpendicular to a lever 0.5 m from its pivot. Find torque magnitude.
    rule: τ=rF sin θ.
    steps:
    - 'Set up the relationship: τ=rF sin θ.'
    - τ=0.5(10)sin90°=5 N m.
    answer: The turning effect is 5 N m about the pivot.
    common_mistake: Use the perpendicular lever arm, not any convenient distance.
  - id: safety_m09_we02
    title: Balance a lever
    problem: A 20 N load acts 1 m left of a pivot. Where should a 10 N load act on the right to balance it?
    rule: Rotational equilibrium requires equal opposite torque magnitudes.
    steps:
    - 'Set up the relationship: Rotational equilibrium requires equal opposite torque magnitudes.'
    - 20(1)=10r gives r=2 m.
    answer: Place the 10 N load 2 m to the right.
    common_mistake: Equal forces are unnecessary when lever arms differ.
  - id: safety_m09_we03
    title: Rotational inertia of a point mass
    problem: A 2 kg point mass is 3 m from an axis. Find rotational inertia.
    rule: I=mr² for a point mass.
    steps:
    - 'Set up the relationship: I=mr² for a point mass.'
    - I=2(3²)=18 kg m².
    answer: Rotational inertia is 18 kg m².
    common_mistake: Distance from the axis is squared.
  - id: safety_m09_we04
    title: Angular acceleration
    problem: A net torque of 12 N m acts on rotational inertia 3 kg m². Find angular acceleration.
    rule: τ_net=Iα.
    steps:
    - 'Set up the relationship: τ_net=Iα.'
    - α=12/3=4 rad/s².
    answer: Angular acceleration is 4 rad/s² in the torque direction.
    common_mistake: Use net torque, not one selected torque.
  - id: safety_m09_we05
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

Torque: Torque is the turning effect of a force about a pivot or axis.

Lever arm: Lever arm is perpendicular distance from the axis to the force's line of action.

Rotational inertia: Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.

Operating envelope: Operating envelope is the set of loads and conditions inside which operation is permitted.

#### Primer concepts

- Torque depends on force, angle, and lever arm.
- Equal forces at different radii do not produce equal torque.
- A visible indication is evidence requiring evaluation, not an automatic verdict.

#### Equations first needed today

**Equation:** `τ = rF sinθ` and `Στ = Iα`  
**What it is for:** finding turning effect and angular response  
**Symbols:** `τ` is torque, `r` is distance from axis, `F` is force, `θ` is the angle between them, `I` is rotational inertia, and `α` is angular acceleration.  
**Why this campaign needs it:** Rider loading, braking, and wind all create moments about the wheel axle.

**Equation:** `I = Σmr²`  
**What it is for:** estimating rotational inertia from distributed masses  
**Symbols:** each `m` is a component mass and `r` is its distance from the axis.  
**Why this campaign needs it:** The emergency-stop response changes with how gondola mass is distributed.

**Crew:** Luka Kovač - mechanical lead; Maya Hart - operations lead; Linh Chen - test lead.

## Main story happening - designer summary

The player balances loading, derives rotational response, stresses wind assumptions, and commits a restricted operating envelope. The 41 mm indication is not declared safe; the wheel receives conditional status pending independent inspection. Kovač learns to separate calculated loads from material condition.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Ferris Wheel machine room | automatic**

**Trigger:** mission_9_arrival.

**World state:** A barricade stays around arm nine beneath a chalked inspection mark.

**Panel/HUD text:** `STOP 33-34 READY`

**Dialogue bubbles -** Luka Kovač: “Forty-one millimetres is a size, not a judgment.”

**Unlocks:** Stops 33-34.

**Beat 2 - After Stop 34 | automatic**

**Trigger:** accepted_stop_33.

**World state:** At `hub-schedule`, the dated accepted-result slip for Stop 33 reads: "Submit -1.4 kN·m; accept within fictional ±2.0 kN·m tolerance.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 35 READY`

**Dialogue bubbles -** Luka Kovač: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 35.

**Beat 3 - After Stop 35 | automatic**

**Trigger:** accepted_stop_34.

**World state:** At `machine-room-board`, the dated accepted-result slip for Stop 34 reads: "Order torque → angular deceleration → stop time → stop angle; Δθ∝Iω₀²/τb.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 36 READY`

**Dialogue bubbles -** Maya Hart: “Good thinking. Take the surviving rule back to the brake drum.”

**Unlocks:** Stop 36.

**Beat 4 - After Stop 36 | automatic**

**Trigger:** accepted_stop_35.

**World state:** At `bench-notebooks`, the dated accepted-result slip for Stop 35 reads: "Choice 2 - 8.0 m/s wind cap plus balanced loading and arm-nine inspection.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Luka Kovač: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_36.

**World state:** At `arm-nine-file`, Maya Hart clips the EXTERNAL INSPECTION REQUIRED card to the arm-nine sleeve. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 9 COMPLETE`

**Dialogue bubbles -** Maya Hart: "Leave the barrier. A load model cannot inspect that mark. But Nair's coaster drawing has never faced the actual loop; one unresolved ride cannot borrow another's clearance."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Coaster Station.

### Physical aftermath — safety-m09

**Home:** `arm-nine-file`. **Before:** The dated mission-9 evidence holder at this fixture has no accepted record. A barricade stays around arm nine beneath a chalked inspection mark.
**After — exact action:** Maya Hart clips the EXTERNAL INSPECTION REQUIRED card to the arm-nine sleeve.
**Trigger:** accepted_stop_36. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `profile-drawing`, a taped-over track drawing rests beside the independent axle sensor.
**Segue - exact player copy:** But Nair's coaster drawing has never faced the actual loop; one unresolved ride cannot borrow another's clearance.

## Location plan

**Two locations:** Ferris Wheel for loads; Workshop for the historical hub drawing and the independent-inspection order.

## Characters and dramatic beat

Kovač wants a mechanical verdict from the mark. Hart and Chen require both a bounded load model and a separate condition inspection.

## Key concepts, explained here

Torque measures how force tends to rotate a system. Rotational inertia grows strongly when mass lies farther from the axis. Static balance and dynamic braking answer load questions; neither can identify a crack without an appropriate physical inspection.

## Stop 33 - Balance the wheel

**Format/placement:** BALLPARK, asked at `hub-schedule`.

**Metadata:** Concept: 23 - Torque equilibrium; Keystone: torque; Area: Ferris Wheel machine room; Learning role: INTRODUCE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the wheel loading schedule, in Ferris Wheel machine room.

**Stop reason - exact player copy:** Uneven test loads must be balanced before the wheel's braking response can be assessed.

**Question card story setup - exact player copy:** Twelve test gondolas are loaded unevenly around the wheel, creating clockwise and counterclockwise moments. Reassign the movable loads until the net torque about the axle is acceptably close to zero.

**Question card story-science connection - exact player copy:** Net axle torque shows whether the load arrangement meets the wheel's balance tolerance.

**Question card prompt - exact player copy:** Given clockwise moment `-126.0 kN m`, counterclockwise moment `+124.6 kN m`, hub-weight moment `0 kN m`, and acceptance band `+/-2.0 kN m`, use `tau_net = sum tau`. Submit the included moment streams, one signed net-torque number in `kN m`, and one pass/fail conclusion.

**Complete format-specific interaction block:**

```yaml
balance:
  target: {label: "Net torque", value: 0, unit: "kN m"}
  streams:
    - {id: cw, label: "Clockwise loaded gondolas", value: -126.0, unit: "kN m", count: true}
    - {id: ccw, label: "Counterclockwise loaded gondolas", value: 124.6, unit: "kN m", count: true}
    - {id: hub_weight, label: "Hub weight through axle", value: 0, unit: "kN m", count: false}
  tolerance: 2.0
  correct_action: "Count off-axis moments; exclude weight acting through the axle."
```

**§7 authored-board source - BALANCE:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 33 - Balance the wheel"
  format: "BALLPARK"
  source: "Handback 5 canonical interaction block"
  question: "Given clockwise moment `-126.0 kN m`, counterclockwise moment `+124.6 kN m`, hub-weight moment `0 kN m`, and acceptance band `+/-2.0 kN m`, use `tau_net = sum tau`. Submit the included moment streams, one signed net-torque number in `kN m`, and one pass/fail conclusion."
  payload: "```yaml balance: target: {label: \"Net torque\", value: 0, unit: \"kN m\"} streams: - {id: cw, label: \"Clockwise loaded gondolas\", value: -126.0, unit: \"kN m\", count: true} - {id: ccw, label: \"Counterclockwise loaded gondolas\", value: 124.6, unit: \"kN m\", count: true} - {id: hub_weight, label: \"Hub weight through axle\", value: 0, unit: \"kN m\", count: false} tolerance: 2.0 correct_action: \"Count off-axis moments; exclude weight acting through the axle.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - BALLPARK:**

**Handback 5 canonical interaction block - BALLPARK:**

```yaml
estimate:
  quantity: "signed net torque"
  unit: "kN·m"
  inputs:
    - {label: "Clockwise loaded-gondola moment", value: -126.0, unit: "kN·m"}
    - {label: "Counterclockwise loaded-gondola moment", value: 124.6, unit: "kN·m"}
    - {label: "Hub-weight moment", value: 0, unit: "kN·m", contextOnly: true}
  operation: "add the signed off-axis moments"
  formula: "tau_net=-126.0+124.6"
  start: 1
  correctResult: -1.4
  tolerance: 0.1
  commonMistake: "Mixing a contextual reading into the arithmetic or reversing the subtraction."
```

**Correct result:** Submit -1.4 kN·m; accept within fictional ±2.0 kN·m tolerance.

**Answer text:** The arranged test load is rotationally balanced within tolerance.

**Why:** A force through the axle has zero lever arm and creates no torque about that axis.

**Wrong-path feedback:** Force magnitude alone is not torque; include perpendicular distance.

**State/output:** Lock the test gondola positions.

## Stop 34 - Build the braking response

**Format/placement:** DERIVE, asked at `machine-room-board`.

**Metadata:** Concept: 22 - Rotational dynamics; Keystone: torque and inertia; Area: Ferris Wheel machine room; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the machine-room board, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The wheel is balanced, but the brake still needs a stopping-angle prediction.

**Question card story setup - exact player copy:** The wheel is balanced, but balance does not predict how quickly it stops. Derive the relationship between brake torque, rotational inertia, angular deceleration, and the wheel's total predicted stopping angle.

**Question card story-science connection - exact player copy:** The torque and inertia relationship shows how much rotation remains after braking starts.

**Fixture source panel - exact player copy:** The wheel is balanced, but balance does not predict how quickly it stops. Derive the relationship between brake torque, rotational inertia, angular deceleration, and the wheel's total predicted stopping angle. Using F_brake = kx, tau = rF_brake, tau = Ialpha, and 0 = omega0^2 + 2alpha Delta theta

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit one ordered symbolic derivation for positive stopping angle and a conclusion stating how `I`, `omega0`, and brake torque change that angle.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The wheel is balanced, but balance does not predict how quickly it stops.", "Using `F_brake = kx`, `tau = rF_brake`, `tau = Ialpha`, and `0 = omega0^2 + 2alpha Delta theta`"]
  lines:
    - {id: spring, expression: "F_brake = kx", rule: "Hooke's law for brake-band spring"}
    - {id: dynamics, expression: "sum tau = rF_brake = I alpha", rule: "torque and rotational Newton's second law"}
    - {id: acceleration, expression: "alpha = -rkx/I", rule: "brake opposes rotation"}
    - {id: kinematics, expression: "0 = omega0^2 + 2 alpha delta_theta", rule: "constant angular acceleration"}
    - {id: stop, expression: "delta_theta = I omega0^2/(2 tau_brake)", rule: "solve for positive stopping angle"}
  order: [spring,dynamics,acceleration,kinematics,stop]
  decoys:
    - {expression: "delta_theta = tau_brake/(2I omega0^2)", rule: "invert the work-energy dependence"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `F_brake=k/x`
2. `Στ=F_brake/r`
3. `α=+rkx/I, using the wrong braking sign`
4. `0=ω0+2αΔθ, forgetting squared angular speed`
5. `Δθ=τ_brake/(2Iω0²), inverting the work-energy dependence`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The wheel is balanced, but balance does not predict how quickly it stops.", "Using `F_brake = kx`, `tau = rF_brake`, `tau = Ialpha`, and `0 = omega0^2 + 2alpha Delta theta`"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Build the braking response in the form and units requested by the prompt"
  left_side: "F_brake"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "F_brake = kx", correct: true}
        - {text: "F_brake=k/x", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "sum tau = rF_brake = I alpha", correct: true}
        - {text: "sum tau = F_brake/r = I alpha", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "alpha = -rkx/I", correct: true}
        - {text: "alpha = +rkx/I", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "0 = omega0^2 + 2 alpha delta_theta", correct: true}
        - {text: "0 = omega0 + 2 alpha delta_theta", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_5
      doing: "select the next licensed transformation"
      candidates:
        - {text: "delta_theta = I omega0^2/(2 tau_brake)", correct: true}
        - {text: "delta_theta = tau_brake/(2I omega0^2)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Order torque → angular deceleration → stop time → stop angle; Δθ∝Iω₀²/τb.

**Answer text:** The spring supplies brake force; stopping angle grows with rotational inertia and initial angular speed squared, and falls with brake torque.

**Why:** Linear and rotational dynamics have matching structures, with torque, inertia, angular acceleration, and angular displacement.

**Wrong-path feedback:** Keep brake angular acceleration opposite the initial angular velocity.

**State/output:** Add rotational stop model to the wheel panel.

## Stop 35 - Stress the wind assumption

**Format/placement:** STRESS, asked at Linh Chen beside `bench-notebooks`.

**Metadata:** Concept: 36 - Uncertain wind load; Keystone: torque and model limits; Area: Brennan's workshop; Learning role: APPLY; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Talk to Linh Chen, at the wind-case notebook bench in Brennan's Workshop.

**Stop reason - exact player copy:** The braking model is ready, while gusts and loading still threaten its operating assumptions.

**Question card story setup - exact player copy:** The gondola shell presents a broad face to wind, and force uncertainty grows with gust speed. Move wind and loading assumptions through their ranges and watch which operating limits remain defensible.

**Question card story-science connection - exact player copy:** The sensitivity results identify wind and load restrictions that remain defensible across the tested uncertainty.

**Question card prompt - exact player copy:** Vary wind speed from `4 m/s` to `12 m/s` in `1 m/s` steps and occupied gondolas from `6` to `24` in steps of `6`. Submit one stress-test conclusion selecting the operating envelope that survives and naming any unresolved inspection condition.

**Complete format-specific interaction block:**

```yaml
stress:
  assumptions:
    - {id: wind, label: "Wind speed", min: 4, max: 12, step: 1, unit: m/s}
    - {id: occupied, label: "Occupied gondolas", min: 6, max: 24, step: 6}
  candidates:
    - {id: unrestricted, label: "Operate to 12 m/s", survives: false}
    - {id: bounded, label: "Operate to 8 m/s with balanced loading", survives: true}
    - {id: mark_safe, label: "Treat 41 mm indication as proven safe", survives: false}
  correct: bounded
  conclusion: "The 8.0 m/s balanced-load envelope survives; unrestricted wind and the uninspected arm do not."
```

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 35 - Stress the wind assumption"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Vary wind speed from `4 m/s` to `12 m/s` in `1 m/s` steps and occupied gondolas from `6` to `24` in steps of `6`. Submit one stress-test conclusion selecting the operating envelope that survives and naming any unresolved inspection condition."
  payload: "```yaml stress: assumptions: - {id: wind, label: \"Wind speed\", min: 4, max: 12, step: 1, unit: m/s} - {id: occupied, label: \"Occupied gondolas\", min: 6, max: 24, step: 6} candidates: - {id: unrestricted, label: \"Operate to 12 m/s\", survives: false} - {id: bounded, label: \"Operate to 8 m/s with balanced loading\", survives: true} - {id: mark_safe, label: \"Treat 41 mm indication as proven safe\", survives: false} correct: bounded conclusion: \"The 8.0 m/s balanced-load envelope survives; unrestricted wind and the uninspected arm do not.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "wind speed", min: 4, max: 12, nominal: 8.0, step: 1, unit: "m/s"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 8.0, max: 8.0}
      failsAt: 12
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 8.0, max: 12}
      failsAt: 4
    - id: robust_plan
      label: "Choice 2 - 8.0 m/s wind cap plus balanced loading and arm-nine inspection."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 4, max: 12}
  robust: robust_plan
  question: "Vary wind speed from `4 m/s` to `12 m/s` in `1 m/s` steps and occupied gondolas from `6` to `24` in steps of `6`. Submit one stress-test conclusion selecting the operating envelope that survives and naming any unresolved inspection condition."
```

**Correct result:** Choice 2 - 8.0 m/s wind cap plus balanced loading and arm-nine inspection.

**Answer text:** The 8.0 m/s balanced-load envelope survives; unrestricted wind and an uninspected arm do not.

**Why:** Wind moment rises across the range, and the material-condition claim is not supplied by the torque model.

**Wrong-path feedback:** (unrestricted) The 12 m/s cases fail the torque envelope. (mark_safe) A 41 mm indication alone does not establish material strength or remove the inspection hold.

**State/output:** Store candidate envelope and inspection hold.

## Stop 36 - Commit the wheel limits

**Format/placement:** TRIGGER, asked at `brake-drum`.

**Metadata:** Concept: 35 - Operating thresholds; Keystone: torque and model limits; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the brake-drum rule panel, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The wind tests are complete, but arm nine's inspection remains a condition of operation.

**Question card story setup - exact player copy:** Torque balance and wind stress now define a restricted region, while arm nine still requires inspection. Commit the complete stop rule before the forecast and passenger loading pattern are revealed.

**Question card story-science connection - exact player copy:** The combined threshold and inspection rule defines the restricted region in which the wheel may run.

**Question card prompt - exact player copy:** Using the tested wind boundary `8.0 m/s`, the `+/-2.0 kN m` loading-moment tolerance, and the unresolved arm-nine inspection, submit one operating-rule setting that states every prerequisite and uses an inclusive wind shutdown at or above its numerical value in `m/s`.

**Complete format-specific interaction block:**

```yaml
trigger:
  decision_rule: "Operate only after arm-nine inspection; stop at or above wind threshold or outside balance tolerance."
  scale: {min: 5, max: 12, step: 0.5, unit: m/s}
  anchors: [{value: 7.5, label: "near the stressed operating limit"},{value: 12.0, label: "failed unrestricted case"}]
  objective: "Protect bounded wind and loading moments."
  direction: at_or_above
  consequence_limit: {value: 8.0, unit: m/s, inclusive: true}
  correct: 8.0
  tolerance: 0.01
  conclusion: "Require the arm-nine inspection and balanced loading, then stop at wind of 8.0 m/s or greater."
```

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 36 - Commit the wheel limits"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Using the tested wind boundary `8.0 m/s`, the `+/-2.0 kN m` loading-moment tolerance, and the unresolved arm-nine inspection, submit one operating-rule setting that states every prerequisite and uses an inclusive wind shutdown at or above its numerical value in `m/s`."
  payload: "```yaml trigger: decision_rule: \"Operate only after arm-nine inspection; stop at or above wind threshold or outside balance tolerance.\" scale: {min: 5, max: 12, step: 0.5, unit: m/s} anchors: [{value: 7.5, label: \"near the stressed operating limit\"},{value: 12.0, label: \"failed unrestricted case\"}] objective: \"Protect bounded wind and loading moments.\" direction: at_or_above consequence_limit: {value: 8.0, unit: m/s, inclusive: true} correct: 8.0 tolerance: 0.01 conclusion: \"Require the arm-nine inspection and balanced loading, then stop at wind of 8.0 m/s or greater.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "Ferris Wheel wind speed", min: 0, max: 12, step: 0.5, unit: "m/s"}
  start: 2.4
  anchors:
    - {at: 2.4, means: "routine baseline, not the decision threshold"}
    - {at: 7.8, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 4, hoursLeft: 48}
    - {at: "T-24 h", value: 6, hoursLeft: 24}
    - {at: "T-12 h", value: 8, hoursLeft: 12}
    - {at: "T-6 h", value: 10, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 0, max: 7.99}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 8, max: 12}, leadHours: 12}
  question: "Using the tested wind boundary `8.0 m/s`, the `+/-2.0 kN m` loading-moment tolerance, and the unresolved arm-nine inspection, submit one operating-rule setting that states every prerequisite and uses an inclusive wind shutdown at or above its numerical value in `m/s`."
```

**Correct result:** Submit shutdown setting 8.0 m/s, comparator at_or_above, plus balance and inspection rules.

**Answer text:** Require independent arm-nine inspection, balanced loading, and shutdown at wind of 8.0 m/s or greater.

**Why:** The model supports loads only inside that envelope; physical inspection remains a separate binding condition.

**Wrong-path feedback:** Do not hide an unresolved condition behind a numerical operating limit.

**State/output:** Set `ride_status.wheel = restricted_pending_inspection`.

## Mission outcome

Mission decision: The Ferris Wheel may run only after an outside check of arm nine. Its load must stay balanced, and wind must stay below 8.0 m/s. The model sets these limits but cannot clear the arm mark. The coaster is next.

**Segue - exact player copy:** But Nair's coaster drawing has never faced the actual loop; one unresolved ride cannot borrow another's clearance.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Maya Hart clips the EXTERNAL INSPECTION REQUIRED card to the arm-nine sleeve. But Nair's coaster drawing has never faced the actual loop; one unresolved ride cannot borrow another's clearance.

**Header:** MISSION 9 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 10:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** The inspection hold delays completion but prevents a calculated load limit from replacing a material check.  
**Automatic bar change:** Certificate +5 | Proof +4 | Reserve -3 | Confidence +5  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +4/+3/+5/+0. Result: 70 | 100 | 71 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Rotational equilibrium:** Rotational equilibrium is zero net torque and no angular acceleration.

### Review question 1


**Prompt - exact player copy:** Which statement best explains rotational equilibrium?

**Options - exact player copy:**

- A. Torque is the turning effect of a force about a pivot or axis.
- B. Rotational equilibrium is zero net torque and no angular acceleration.
- C. Lever arm is perpendicular distance from the axis to the force's line of action.
- D. Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for rotational equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes torque. It does not answer the question about rotational equilibrium.
- B: Correct. Rotational equilibrium is zero net torque and no angular acceleration.
- C: This describes lever arm. It does not answer the question about rotational equilibrium.
- D: This describes rotational inertia. It does not answer the question about rotational equilibrium.

### Review question 2


**Prompt - exact player copy:** Which statement best explains torque?

**Options - exact player copy:**

- A. Rotational equilibrium is zero net torque and no angular acceleration.
- B. Lever arm is perpendicular distance from the axis to the force's line of action.
- C. Torque is the turning effect of a force about a pivot or axis.
- D. Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for torque. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes rotational equilibrium. It does not answer the question about torque.
- B: This describes lever arm. It does not answer the question about torque.
- C: Correct. Torque is the turning effect of a force about a pivot or axis.
- D: This describes rotational inertia. It does not answer the question about torque.

### Review question 3


**Prompt - exact player copy:** Which statement best explains lever arm?

**Options - exact player copy:**

- A. Rotational equilibrium is zero net torque and no angular acceleration.
- B. Torque is the turning effect of a force about a pivot or axis.
- C. Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.
- D. Lever arm is perpendicular distance from the axis to the force's line of action.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for lever arm. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes rotational equilibrium. It does not answer the question about lever arm.
- B: This describes torque. It does not answer the question about lever arm.
- C: This describes rotational inertia. It does not answer the question about lever arm.
- D: Correct. Lever arm is perpendicular distance from the axis to the force's line of action.

### Review question 4


**Prompt - exact player copy:** Which statement best explains rotational inertia?

**Options - exact player copy:**

- A. Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.
- B. Rotational equilibrium is zero net torque and no angular acceleration.
- C. Torque is the turning effect of a force about a pivot or axis.
- D. Lever arm is perpendicular distance from the axis to the force's line of action.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for rotational inertia. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Rotational inertia is resistance to angular acceleration determined by mass and its distance from the axis.
- B: This describes rotational equilibrium. It does not answer the question about rotational inertia.
- C: This describes torque. It does not answer the question about rotational inertia.
- D: This describes lever arm. It does not answer the question about rotational inertia.

### Review question 5


**Prompt - exact player copy:** Which statement best explains operating envelope?

**Options - exact player copy:**

- A. Rotational equilibrium is zero net torque and no angular acceleration.
- B. Operating envelope is the set of loads and conditions inside which operation is permitted.
- C. Torque is the turning effect of a force about a pivot or axis.
- D. Lever arm is perpendicular distance from the axis to the force's line of action.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for operating envelope. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes rotational equilibrium. It does not answer the question about operating envelope.
- B: Correct. Operating envelope is the set of loads and conditions inside which operation is permitted.
- C: This describes torque. It does not answer the question about operating envelope.
- D: This describes lever arm. It does not answer the question about operating envelope.

### Review question 6


**Prompt - exact player copy:** Which statement best explains torque equilibrium?

**Options - exact player copy:**

- A. Rotational equilibrium is zero net torque and no angular acceleration.
- B. Torque is the turning effect of a force about a pivot or axis.
- C. A force through the axle has zero lever arm and creates no torque about that axis.
- D. Lever arm is perpendicular distance from the axis to the force's line of action.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for torque equilibrium. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes rotational equilibrium. It does not answer the question about torque equilibrium.
- B: This describes torque. It does not answer the question about torque equilibrium.
- C: Correct. A force through the axle has zero lever arm and creates no torque about that axis.
- D: This describes lever arm. It does not answer the question about torque equilibrium.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Torque is force times perpendicular lever arm.
- Rotational response depends on torque and rotational inertia.
- Moving mass outward increases rotational inertia strongly.
- **Mission takeaway:** A load model can bound operation, but it cannot certify an unmeasured material condition.

# Mission 10 - The Loop on Paper

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 10 - 6 DAYS UNTIL THE PARK REVIEW.

**Card title:** THE LOOP ON PAPER

**Go now:** Go to the Coaster Station and meet Luka Kovač, the mechanical lead, at the 1974 profile drawing.

**Card body:** Six days remain before review. An old track drawing lies beside a new speed gauge. Today you decide if one empty run can test the coaster model.

**Objective:** Decide whether existing evidence supports a limited coaster measurement run.

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
  - id: safety_m10_we01
    title: Gravitational energy
    problem: A 2 kg object is lifted 3 m where g=10 m/s². Find its gravitational potential-energy increase.
    rule: ΔU=mgΔh.
    steps:
    - 'Set up the relationship: ΔU=mgΔh.'
    - ΔU=2(10)(3)=60 J.
    answer: Gravitational potential energy increases by 60 J.
    common_mistake: Only the height difference matters for this change.
  - id: safety_m10_we02
    title: Speed after free fall
    problem: An object starts at rest and falls 5 m. Neglect air resistance and use g=10 m/s². Find speed.
    rule: v²=v0²+2g h for a downward fall of height h.
    steps:
    - 'Set up the relationship: v²=v0²+2g h for a downward fall of height h.'
    - v²=0+2(10)(5)=100, so v=10 m/s downward.
    answer: The speed is 10 m/s.
    common_mistake: The result is speed; a signed velocity depends on the chosen axis.
  - id: safety_m10_we03
    title: Minimum speed at a loop top
    problem: An object follows the inside of a vertical loop of radius 2.5 m where g=10 m/s². Find ideal minimum top speed for contact.
    rule: At the minimum, normal force is zero and mg=mv²/r.
    steps:
    - 'Set up the relationship: At the minimum, normal force is zero and mg=mv²/r.'
    - v_min=sqrt(gr)=sqrt(10×2.5)=5 m/s.
    answer: The ideal contact minimum is 5 m/s; any required margin is additional.
    common_mistake: Do not set gravity to zero at the top.
  - id: safety_m10_we04
    title: Input versus useful power
    problem: A machine delivers 80 W useful output at efficiency 0.8. Find input power.
    rule: Efficiency=useful output/input power.
    steps:
    - 'Set up the relationship: Efficiency=useful output/input power.'
    - P_input=80/0.8=100 W.
    answer: The input is 100 W, with 20 W going to other transfers.
    common_mistake: Dividing by efficiency makes required input larger than useful output.
  - id: safety_m10_we05
    title: A measurement minus a prediction
    problem: A thermometer model predicts 20 °C; an independent thermometer reads 22 °C. Find the residual.
    rule: Residual = observed value - predicted value.
    steps:
    - residual = 22 °C - 20 °C. Keep observed first.
    - residual = +2 °C. The positive sign means the observation is above the prediction.
    answer: The model underpredicts this reading by 2 °C.
    common_mistake: Reversing the subtraction reverses the meaning of the sign.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Gravitational potential energy: Gravitational potential energy is energy associated with height in a near-Earth system, represented by `mgh` relative to a chosen zero.

Mechanical energy: Mechanical energy is the sum of kinetic and potential energies tracked for a system.

Loop contact condition: Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.

Residual: Residual is observed value minus model prediction; its pattern can reveal model failure.

#### Primer concepts

- Use energy between locations and forces at one location.
- At the loop crown, gravity and any normal force point inward.
- A good average residual can hide a patterned failure.

#### Equations first needed today

**Equation:** `Ki + Ugi + Wext = Kf + Ugf`  
**What it is for:** accounting for mechanical energy between two positions  
**Symbols:** `K` is kinetic energy, `Ug=mgh`, and `Wext` is external work added or removed.  
**Why this campaign needs it:** The lift height and losses determine the train's speed at the loop crown.

**Equation:** `vmin = √(gr)`  
**What it is for:** finding the minimum crown speed when gravity alone supplies the inward force  
**Symbols:** `g` is gravitational-field magnitude and `r` is loop radius.  
**Why this campaign needs it:** The train needs a fictional 1.0 m/s margin above this contact minimum.

**Crew:** Luka Kovač - mechanical lead; Linh Chen - test lead.

## Main story happening - designer summary

The player estimates ideal speed from the 26 m lift to the 20 m crown, derives the minimum contact speed, and detects patterned speed-wheel residuals. The shared Plant Room opens, and its 55 kW plate supports only a limited empty-train measurement run. The profile drawing is treated as an assumption to test, not certified geometry.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Coaster Station | automatic**

**Trigger:** mission_10_arrival.

**World state:** A taped-over track drawing rests beside the independent axle sensor.

**Panel/HUD text:** `STOP 37-39 READY`

**Dialogue bubbles -** Luka Kovač: “This drawing has been copied more often than the track has been measured.”

**Unlocks:** Stops 37-39.

**Beat 2 - After Stop 39 | automatic**

**Trigger:** accepted_stop_37.

**World state:** At `profile-drawing`, the dated accepted-result slip for Stop 37 reads: "Submit 10.84 m/s; accept 10.70-10.98 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Nice work. The model gets one run with an independent sensor.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Shared Plant Room.

**Beat 3 - On arrival at Shared Plant Room | automatic**

**Trigger:** accepted_stop_38.

**World state:** At `station-board`, the dated accepted-result slip for Stop 38 reads: "Contact minimum 7.41 m/s; campaign-margin setting 8.41 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 40 READY`

**Dialogue bubbles -** Luka Kovač: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 40.

**Beat 4 - After Stop 40 | automatic**

**Trigger:** accepted_stop_39.

**World state:** At `station-wheel`, the dated accepted-result slip for Stop 39 reads: "Select independent axle encoder; reject portable-wheel mean-only comparison.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Luka Kovač: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_40.

**World state:** At `profile-drawing`, Priya Nair pins the EMPTY TEST ONLY card over the passenger release line. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 10 COMPLETE`

**Dialogue bubbles -** Priya Nair: "No riders while the curve is still paper. But Ruiz's flume needs nearly the same shared power; the lift test cannot own the whole plant."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Flume Pumphouse.

### Physical aftermath — safety-m10

**Home:** `profile-drawing`. **Before:** The dated mission-10 evidence holder at this fixture has no accepted record. A taped-over track drawing rests beside the independent axle sensor.
**After — exact action:** Priya Nair pins the EMPTY TEST ONLY card over the passenger release line.
**Trigger:** accepted_stop_40. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `pump-curve`, the flume header pulses beside the shared motor plate.
**Segue - exact player copy:** But Ruiz's flume needs nearly the same shared power; the lift test cannot own the whole plant.

## Location plan

**Two locations:** Coaster for physics and residuals; Plant Room because only its motor plate can establish whether the lift can support the measurement run.

## Characters and dramatic beat

Kovač distrusts the speed wheel but initially trusts the drawing. Chen labels the drawing as a testable model input.

## Key concepts, explained here

Energy predicts speed between heights; circular dynamics tests contact at the crown. These steps answer different questions. A residual pattern can expose a biased measuring device even when the average error is small.

## Stop 37 - Estimate the ideal crown speed

**Format/placement:** BALLPARK, asked at `profile-drawing`.

**Metadata:** Concept: 16 - Energy conservation; Keystone: energy; Area: Coaster Station; Learning role: RETRIEVE; Difficulty: L2; Story role: obstacle.

**Call - exact player copy:** Go to the coaster profile drawing, in Coaster Station.

**Stop reason - exact player copy:** The coaster's crown speed needs an ideal benchmark before measured losses are included.

**Question card story setup - exact player copy:** The train starts nearly from rest at 26 m and reaches the loop crown at 20 m. Estimate the no-loss crown speed before adding the measured friction and wheel losses from testing.

**Question card story-science connection - exact player copy:** The height drop gives an upper benchmark for crown speed under the no-loss assumption.

**Question card prompt - exact player copy:** Given `g = 9.80 m/s^2` and vertical drop `Delta h = 6.0 m`, use `v = sqrt(2g Delta h)`. Submit one ideal crown-speed number in `m/s`.

```yaml
estimate: {labels: ["2g", "Height drop"], values: [19.6,6.0], slots: [factor,height], template: "v = sqrt({factor} x {height})", formula: "v=sqrt(19.6×6)", correct: 10.84, target: 10.8, tolerance: 0.05, unit: m/s}
```

**Correct result:** Submit 10.84 m/s; accept 10.70-10.98 m/s.

**Answer text:** The ideal crown speed is about 10.84 m/s.

**Why:** The lost gravitational potential energy becomes kinetic energy when no losses are included.

**Wrong-path feedback:** Use the height difference, not either absolute height.

**State/output:** Draw an `IDEAL MAXIMUM 10.84 m/s` line.

## Stop 38 - Derive the contact minimum

**Format/placement:** DERIVE, asked at `station-board`.

**Metadata:** Concept: 12 - Loop-top dynamics; Keystone: forces, circular motion, energy; Area: Carousel Drive House; Learning role: COMBINE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the station calculation board, in Coaster Station.

**Stop reason - exact player copy:** The crown-speed benchmark is available, but the train also needs enough speed to maintain rail contact.

**Question card story setup - exact player copy:** Derive the limiting speed where the rail's supporting normal force just reaches zero.

**Question card story-science connection - exact player copy:** The contact minimum and added campaign margin establish the required crown speed for this loop model.

**Fixture source panel - exact player copy:** Derive the limiting speed where the rail's supporting normal force just reaches zero. Given drawing radius r = 5.6 m, g = 9.80 m/s^2, and Corbin Park's fictional required margin 1.00 m/s, use mg + N = mv^2/r with N = 0 at minimum contact.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation, contact-minimum speed in `m/s`, and required-with-margin speed in `m/s`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["Derive the limiting speed where the rail's supporting normal force just reaches zero.", "Given drawing radius `r = 5.6 m`, `g = 9.80 m/s^2`, and Corbin Park's fictional required margin `1.00 m/s`, use `mg + N = mv^2/r` with `N = 0` at minimum contact."]
  lines:
    - {id: force, expression: "mg + N = mv^2/r", rule: "net inward force at crown"}
    - {id: limit, expression: "N = 0 at minimum contact", rule: "rail cannot pull"}
    - {id: solve, expression: "mg = mv_min^2/r", rule: "substitute limiting condition"}
    - {id: result, expression: "v_min = sqrt(gr)", rule: "solve and cancel mass"}
  order: [force,limit,solve,result]
  decoys:
    - {expression: "v_min = sqrt(g/r)", rule: "divide by radius and produce the wrong units"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `mg−N=mv²/r at the crown`
2. `N=mg at minimum contact`
3. `2mg=mv_min²/r`
4. `v_min=sqrt(g/r)`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["Derive the limiting speed where the rail's supporting normal force just reaches zero.", "Given drawing radius `r = 5.6 m`, `g = 9.80 m/s^2`, and Corbin Park's fictional required margin `1.00 m/s`, use `mg + N = mv^2/r` with `N = 0` at minimum contact."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive the contact minimum in the form and units requested by the prompt"
  left_side: "N"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "mg + N = mv^2/r", correct: true}
        - {text: "mg - N = mv^2/r at the loop crown", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "N = 0 at minimum contact", correct: true}
        - {text: "N=mg at minimum contact", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "mg = mv_min^2/r", correct: true}
        - {text: "2mg=mv_min²/r", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v_min = sqrt(gr)", correct: true}
        - {text: "v_min=sqrt(g/r)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: numerical_substitution
      doing: "Evaluate the stated operating condition"
      candidates:
        - {"text": "v_min=sqrt(9.80×5.6)=7.41 m/s; v_required=7.41+1.00=8.41 m/s", "correct": true}
        - {"text": "v_min=sqrt(9.80×5.6)=7.41 m/s; v_required=7.41-1.00=6.41 m/s", "correct": false, "survives": true, "reason": "The required margin is added to the contact minimum, not subtracted."}
```

**Correct result:** Contact minimum 7.41 m/s; campaign-margin setting 8.41 m/s.

**Answer text:** The drawing requires at least 7.41 m/s for contact and 8.41 m/s with Corbin Park's 1.0 m/s margin.

**Why:** At the limit, gravity alone supplies the inward acceleration.

**Wrong-path feedback:** Setting `N=mg` is not the limiting condition; set `N=0`.

**State/output:** Add drawing-based threshold to profile.

## Stop 39 - Refuse the lowest average error

**Format/placement:** RESIDUAL, asked at `station-wheel`.

**Metadata:** Concept: 30 - Residual pattern; Keystone: evidence independence; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the axle encoder stand, in Coaster Station.

**Stop reason - exact player copy:** Similar average errors conceal a repeating pattern in one speed calibration.

**Question card story setup - exact player copy:** Two calibrations have similar average error, but one alternates high and low with the bracket spring. Compare their complete residual fields and choose the measurement model without that physical pattern.

**Question card story-science connection - exact player copy:** The full residual pattern identifies a sensor whose errors are not tied to bracket motion.

**Question card prompt - exact player copy:** Compare the displayed portable-wheel residuals in `m/s` with the independent axle-encoder residuals in `m/s`. Submit one calibration selection and one conclusion naming the residual pattern that justifies it. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:**

```yaml
residual:
  fields:
    - {id: portable, label: "Portable wheel", values: [0.42,-0.39,0.44,-0.41,0.40,-0.43], rms: 0.415, pattern: alternating}
    - {id: independent, label: "Independent axle encoder", values: [0.10,-0.12,0.08,-0.09,0.11,-0.07], rms: 0.096, pattern: none}
  correct: independent
  conclusion: "Use independent axle encoder; portable wheel misses spring-bracket response."
```

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 39 - Refuse the lowest average error"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare the displayed portable-wheel residuals in `m/s` with the independent axle-encoder residuals in `m/s`. Submit one calibration selection and one conclusion naming the residual pattern that justifies it."
  payload: "```yaml residual: fields: - {id: portable, label: \"Portable wheel\", values: [0.42,-0.39,0.44,-0.41,0.40,-0.43], rms: 0.415, pattern: alternating} - {id: independent, label: \"Independent axle encoder\", values: [0.10,-0.12,0.08,-0.09,0.11,-0.07], rms: 0.096, pattern: none} correct: independent conclusion: \"Use independent axle encoder; portable wheel misses spring-bracket response.\" ```"
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
  correctConclusion: "Select independent axle encoder; reject portable-wheel mean-only comparison."
```

**Correct result:** Select independent axle encoder; reject portable-wheel mean-only comparison.

**Answer text:** Use the independent axle encoder; the portable wheel has an alternating residual pattern.

**Why:** Alternation tied to bracket changes is evidence of a missed systematic effect.

**Wrong-path feedback:** (portable) Alternating positive and negative residuals can average near zero while remaining large and patterned, so the portable wheel is not the independent field to trust.

**State/output:** Retire the portable wheel from certificate measurements.

## Stop 40 - Can the lift support the run?

**Format/placement:** DIAGNOSIS, asked at `motor-plate`.

**Metadata:** Concept: 18 - Mechanical power; Keystone: energy and model limits; Area: Coaster Station; Learning role: TRANSFER; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the shared motor plate, in Shared Plant Room.

**Stop reason - exact player copy:** The independent encoder is selected, leaving lift power and brake status to check before an empty run.

**Question card story setup - exact player copy:** The independent encoder is chosen, but the empty train still must climb 26 m in 70 s. Compare required mechanical power, motor efficiency, and quiet brake readings before authorizing the run.

**Question card story-science connection - exact player copy:** The power requirement determines whether the motor can support this limited test without authorizing passengers.

**Question card prompt - exact player copy:** Given empty-train mass `12,000 kg`, rise `26 m`, lift time `70 s`, `g = 9.80 m/s^2`, efficiency `0.80`, and motor plate `55 kW`, use `P_mech = mgh/t` and `P_in = P_mech/eta`. Submit mechanical power in `kW`, input power in `kW`, and one operating plan.

**Complete format-specific interaction block:**

```yaml
headline: "COASTER MEASUREMENT-RUN READINESS"
readings:
  - {zone: train, label: "Empty train mass", value: "12,000 kg", state: quiet}
  - {zone: lift, label: "Rise / time", value: "26 m / 70 s", state: quiet}
  - {zone: motor, label: "Efficiency / plate", value: "80% / 55 kW", state: quiet}
  - {zone: brake, label: "Brake self-test", value: "normal", state: quiet}
  - {zone: geometry, label: "Physical loop geometry", value: "not yet measured; drawing only", state: alarm}
choices:
  - {id: full, label: "Run loaded train", mechanism: "Not supported by this empty-train calculation."}
  - {id: limited, label: "Run one empty train with independent encoder", mechanism: "Required input power is about 54.6 kW, just within plate."}
  - {id: no_loss, label: "Ignore efficiency", mechanism: "Understates input power."}
  - {id: certify, label: "Certify from drawing", mechanism: "Geometry remains unmeasured."}
answer: limited
```

**Correct result:** Choice 2 - one limited empty-train encoder run; passenger operation remains locked.

**Answer text:** Authorize one empty-train measurement run with the independent encoder; do not certify passenger operation.

**Why:** `P=mgh/t`, then divide by 0.80 efficiency. The result fits only narrowly and says nothing about drawing accuracy.

**Wrong-path feedback:** (full) The calculation and power plate support only the empty-train case, not a loaded run. (no_loss) Ignoring 80% efficiency understates required input power. (certify) A copied drawing cannot certify the still-unmeasured physical loop geometry.

**State/output:** Set `test_authorized.coaster_empty = true`; Plant Room opens permanently.

## Mission outcome

Mission decision: One empty coaster run may test the old plan. The axle sensor will replace the portable wheel. The lift just fits the 55 kW plate. Riders are not cleared because the track shape has not been checked.

**Segue - exact player copy:** But Ruiz's flume needs nearly the same shared power; the lift test cannot own the whole plant.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Priya Nair pins the EMPTY TEST ONLY card over the passenger release line. But Ruiz's flume needs nearly the same shared power; the lift test cannot own the whole plant.

**Header:** MISSION 10 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 10:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** One empty-train run is reserved; the shared speed kit is retired.  
**Automatic bar change:** Certificate +5 | Proof +8 | Reserve -5 | Confidence +3  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +6/+0/+6/+0. Result: 81 | 100 | 72 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains gravitational potential energy?

**Options - exact player copy:**

- A. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- B. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.
- C. Residual is observed value minus model prediction; its pattern can reveal model failure.
- D. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for gravitational potential energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes mechanical energy. It does not answer the question about gravitational potential energy.
- B: This describes loop contact condition. It does not answer the question about gravitational potential energy.
- C: This describes residual. It does not answer the question about gravitational potential energy.
- D: Correct. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.

### Review question 2


**Prompt - exact player copy:** Which statement best explains mechanical energy?

**Options - exact player copy:**

- A. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- B. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.
- C. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.
- D. Residual is observed value minus model prediction; its pattern can reveal model failure.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for mechanical energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- B: This describes gravitational potential energy. It does not answer the question about mechanical energy.
- C: This describes loop contact condition. It does not answer the question about mechanical energy.
- D: This describes residual. It does not answer the question about mechanical energy.

### Review question 3


**Prompt - exact player copy:** Which statement best explains loop contact condition?

**Options - exact player copy:**

- A. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.
- B. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.
- C. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- D. Residual is observed value minus model prediction; its pattern can reveal model failure.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for loop contact condition. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes gravitational potential energy. It does not answer the question about loop contact condition.
- B: Correct. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.
- C: This describes mechanical energy. It does not answer the question about loop contact condition.
- D: This describes residual. It does not answer the question about loop contact condition.

### Review question 4


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

### Review question 5


**Prompt - exact player copy:** Which statement best explains energy conservation?

**Options - exact player copy:**

- A. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.
- B. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- C. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.
- D. The lost gravitational potential energy becomes kinetic energy when no losses are included.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for energy conservation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes gravitational potential energy. It does not answer the question about energy conservation.
- B: This describes mechanical energy. It does not answer the question about energy conservation.
- C: This describes loop contact condition. It does not answer the question about energy conservation.
- D: Correct. The lost gravitational potential energy becomes kinetic energy when no losses are included.

### Review question 6


**Prompt - exact player copy:** Which statement best explains loop-top dynamics?

**Options - exact player copy:**

- A. At the limit, gravity alone supplies the inward acceleration.
- B. Gravitational potential energy is energy associated with height in a near-Earth system, represented by mgh relative to a chosen zero.
- C. Mechanical energy is the sum of kinetic and potential energies tracked for a system.
- D. Loop contact condition is the minimum inward acceleration needed for the train to remain in contact at the loop crown.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for loop-top dynamics. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. At the limit, gravity alone supplies the inward acceleration.
- B: This describes gravitational potential energy. It does not answer the question about loop-top dynamics.
- C: This describes mechanical energy. It does not answer the question about loop-top dynamics.
- D: This describes loop contact condition. It does not answer the question about loop-top dynamics.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Use energy between positions and forces at the loop crown.
- `vmin=√(gr)` is the contact minimum, not a full safety margin.
- Power is energy transferred per time; efficiency raises required input.
- **Mission takeaway:** Correct mathematics cannot certify an input that has not been physically verified.

# Mission 11 - Water Has a Budget

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 11 - 5 DAYS UNTIL THE PARK REVIEW.

**Card title:** WATER HAS A BUDGET

**Go now:** Go to the Flume Pumphouse and meet Linh Chen, the instrumentation and test lead, at the header gauge.

**Card body:** 5 days until the park review. The flume header pulses beside the shared motor plate. Today you decide whether the flume fits its water and power budget.

**Objective:** Set a verified flume flow and power schedule.

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
  - id: safety_m11_we01
    title: Pressure from force
    problem: A 100 N perpendicular force is spread over 0.5 m². Find pressure.
    rule: P=F/A.
    steps:
    - 'Set up the relationship: P=F/A.'
    - P=100/0.5=200 Pa.
    answer: Pressure is 200 pascals.
    common_mistake: The same force produces greater pressure over a smaller area.
  - id: safety_m11_we02
    title: Hydrostatic gauge pressure
    problem: Water has density 1000 kg/m³. Find gauge pressure 2 m below its surface using g=10 m/s².
    rule: Gauge pressure=ρgh for a static liquid.
    steps:
    - 'Set up the relationship: Gauge pressure=ρgh for a static liquid.'
    - P_gauge=1000(10)(2)=20000 Pa=20 kPa.
    answer: Pressure is 20 kPa above the surface pressure.
    common_mistake: Absolute pressure would also include the surface pressure.
  - id: safety_m11_we03
    title: Buoyant force
    problem: An object displaces 0.002 m³ of water with density 1000 kg/m³. Use g=10 m/s².
    rule: Buoyant force=ρ_fluid g V_displaced.
    steps:
    - 'Set up the relationship: Buoyant force=ρ_fluid g V_displaced.'
    - F_b=1000(10)(0.002)=20 N upward.
    answer: The buoyant force is 20 N.
    common_mistake: Use displaced-fluid density, not the object's density.
  - id: safety_m11_we04
    title: Continuity of flow
    problem: Water flows at 2 m/s through area 0.04 m², then through area 0.02 m². Find the second speed for steady incompressible flow.
    rule: A1v1=A2v2.
    steps:
    - 'Set up the relationship: A1v1=A2v2.'
    - v2=(0.04×2)/0.02=4 m/s.
    answer: The narrower section has speed 4 m/s.
    common_mistake: Conserved volume flow does not mean equal speed at unequal areas.
  - id: safety_m11_we05
    title: Input versus useful power
    problem: A machine delivers 80 W useful output at efficiency 0.8. Find input power.
    rule: Efficiency=useful output/input power.
    steps:
    - 'Set up the relationship: Efficiency=useful output/input power.'
    - P_input=80/0.8=100 W.
    answer: The input is 100 W, with 20 W going to other transfers.
    common_mistake: Dividing by efficiency makes required input larger than useful output.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Pressure: Pressure is force per area; fluid pressure acts in all directions at a point.

Gauge pressure: Gauge pressure is pressure above atmospheric pressure.

Buoyant force: Buoyant force is upward force equal to the weight of displaced fluid.

Continuity: Continuity is conservation of volume flow for steady incompressible fluid.

#### Primer concepts

- Pressure depends on depth, not container width.
- A floating object's buoyant force equals its weight.
- A narrower channel carries the same steady volume flow at greater speed.

#### Equations first needed today

**Equation:** `P = ρgh` and `Fb = ρfluid Vdisplaced g`  
**What it is for:** calculating fluid pressure and buoyant force  
**Symbols:** `ρ` is density, `g` is gravity, `h` is depth, and `Vdisplaced` is displaced volume.  
**Why this campaign needs it:** The header gauge and loaded log must both match the water they physically contact.

**Equation:** `F1/A1 = F2/A2`  
**What it is for:** relating forces produced by the same pressure in connected hydraulic fluid  
**Symbols:** `F1` and `F2` are forces on pistons with areas `A1` and `A2`.  
**Why this campaign needs it:** The small gate-control ram must create the force required at the larger gate piston.

**Equation:** `Q = Av` and `Ppump = ρgQH/η`  
**What it is for:** connecting area, speed, flow, head, and pump power  
**Symbols:** `Q` is volume flow, `A` is cross-sectional area, `v` is speed, `H` is pump head, and `η` is efficiency.  
**Why this campaign needs it:** The flume flow must fit both the channel and the 55 kW shared motor limit.

**Crew:** Linh Chen - test lead; Tunde Idowu - controls engineer.

## Main story happening - designer summary

The player locates the header divergence, derives the flow relation, allocates plant power, and uses projectile motion at the Arcade to check nozzle speed independently. The flume can run at 0.45 m³/s with 7.0 m head and 70% efficiency, requiring 44.1 kW, but cannot overlap the coaster lift.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Flume Pumphouse | automatic**

**Trigger:** mission_11_arrival.

**World state:** The flume header pulses beside the shared motor plate.

**Panel/HUD text:** `STOP 41-42 READY`

**Dialogue bubbles -** Linh Chen: “One gauge says water is here. The channel says it is not.”

**Unlocks:** Stops 41-42.

**Beat 2 - After Stop 42 | automatic**

**Trigger:** accepted_stop_41.

**World state:** At `header-gauge`, the dated accepted-result slip for Stop 41 reads: "Select first divergence station downstream_of_gate_valve.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Tunde Idowu: “Nice work. The pump does not own the motor feeding it.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Shared Plant Room.

**Beat 3 - After Stop 43 | automatic**

**Trigger:** accepted_stop_42.

**World state:** At `pumphouse-board`, the dated accepted-result slip for Stop 42 reads: "Submit 44.1 kW; accept 43.5-44.7 kW.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Good thinking. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Arcade Test Stall.

**Beat 4 - On arrival at Arcade Test Stall | automatic**

**Trigger:** accepted_stop_43.

**World state:** At `motor-plate`, the dated accepted-result slip for Stop 43 reads: "Allocation {flume:44.1 kW, shutdown:5.0 kW, logging:3.0 kW, coaster:0 kW}.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 44 READY`

**Dialogue bubbles -** Linh Chen: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 44.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_44.

**World state:** At `pump-curve`, Mateo Ruiz clips the 0.45 CUBIC METRES PER SECOND / 44.1 KW card to the pump curve. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 11 COMPLETE`

**Dialogue bubbles -** Mateo Ruiz: "The water fits. The shared power still needs a schedule. Therefore Chen must clear the rider-load tests while the lift stays off; the 55 kW supply cannot serve both demands."

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m11

**Home:** `pump-curve`. **Before:** The dated mission-11 evidence holder at this fixture has no accepted record. The flume header pulses beside the shared motor plate.
**After — exact action:** Mateo Ruiz clips the 0.45 CUBIC METRES PER SECOND / 44.1 KW card to the pump curve.
**Trigger:** accepted_stop_44. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `witness-sheet`, two test dummies sit beside the signed parts list.
**Segue - exact player copy:** Therefore Chen must clear the rider-load tests while the lift stays off; the 55 kW supply cannot serve both demands.

## Location plan

**Three locations:** Pumphouse identifies duty, Plant Room allocates power, Arcade independently checks water-exit speed through projectile range.

## Characters and dramatic beat

Chen wants an independent measurement. Idowu accepts a schedule restriction rather than treating the 55 kW plate as spare capacity.

## Key concepts, explained here

Depth creates pressure. Buoyancy depends on displaced fluid. Continuity connects channel area to flow speed. Pump power adds gravitational energy to a flowing volume, and efficiency determines the required input.

## Stop 41 - Probe the header

**Format/placement:** PROBE, asked at `header-gauge`.

**Metadata:** Concept: 31 - Hydrostatic pressure; Keystone: fluids and evidence; Area: Flume Pumphouse; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Call - exact player copy:** Go to the header gauge, in Flume Pumphouse.

**Stop reason - exact player copy:** The water ride's readings disagree, and the first physical mismatch needs locating before repairs.

**Question card story setup - exact player copy:** Take readings at the lake intake, header, gate ram, log hull, downstream side of the gate valve, and channel inlet. Use pressure, hydraulic force, and buoyancy to identify the first station whose measurement stops matching its physical prediction.

**Question card story-science connection - exact player copy:** Pressure, force, and buoyancy comparisons identify where the hydraulic system first departs from its prediction.

**Question card prompt - exact player copy:** OPERATE: Probe the lake intake, header, gate ram, log hull, downstream side of the gate valve, and channel inlet in that order. MEASURE: At every station, compare its displayed expected value with its observed reading and load text in `kPa`, or in `kN` for the hull. INTERPRET: Submit one location conclusion naming the first station where prediction and measurement break apart.

**Complete format-specific interaction block:**

```yaml
probe:
  target: {id: first_break, label: "First station where observation departs from prediction"}
  minimum_readings: 6
  commit: {requires_all_station_readings: true, disabled_message: "Probe all six stations before submitting the first-break conclusion."}
  stations:
    - {id: lake, label: "Lake intake", load: "2.0 m water depth", reading: 19.5, expected: 19.6, unit: kPa, comparison: "0.1 kPa below expected; within the established instrument tolerance"}
    - {id: header, label: "Header", load: "4.0 m water column", reading: 39.0, expected: 39.2, unit: kPa, comparison: "0.2 kPa below expected; pattern still holds"}
    - {id: ram, label: "Gate ram", load: "2 cm input piston and 9 cm output piston", reading: 38.8, expected: 39.0, unit: kPa, comparison: "0.2 kPa below expected; hydraulic transfer remains consistent"}
    - {id: hull, label: "Log hull", load: "550 kg log displacing 0.550 m3", reading: 5.38, expected: 5.39, unit: kN, comparison: "0.01 kN below expected; buoyancy check passes"}
    - {id: valve, label: "Downstream of gate valve", load: "Valve commanded to the verified test opening", reading: 29.1, expected: 37.8, unit: kPa, comparison: "8.7 kPa below expected; first clear break"}
    - {id: channel, label: "Channel inlet", load: "Same verified valve command and pump condition", reading: 26.4, expected: 35.0, unit: kPa, comparison: "8.6 kPa below expected; downstream consequence of the valve break"}
  correct_break: valve
  conclusion: "The first physical prediction failure occurs downstream of the gate valve."
```

**Correct result:** Select first divergence station downstream_of_gate_valve.

**Answer text:** The pattern first breaks downstream of the gate valve.

**Why:** Intake and header agree with `ρgh`, the ram carries equal pressure, and the floating log's 5.39 kN buoyant force matches its weight. The sudden pressure loss begins after the valve and persists downstream.

**Wrong-path feedback:** (lake) The 0.1 kPa lake difference is within tolerance. (header) The 0.2 kPa header difference continues the expected pattern. (ram) The 0.2 kPa ram difference shows pressure transfer still holds. (hull) The 0.01 kN hull difference passes the buoyancy check. (channel) The channel is already downstream of the earlier valve break, so it is a consequence rather than the first divergence.

**State/output:** Highlight the gate valve and unlock flow derivation.

## Stop 42 - Build the flow and power result

**Format/placement:** DERIVE, asked at `pumphouse-board`.

**Metadata:** Concept: 34 - Continuity and pump power; Keystone: fluids and energy; Area: Flume Pumphouse; Learning role: INTRODUCE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the pump-power board, in Flume Pumphouse.

**Stop reason - exact player copy:** The valve is cleaned and its planned flow must now be translated into electrical demand.

**Question card story setup - exact player copy:** The cleaned valve must deliver 0.45 m³/s against 7.0 m of head at 70% efficiency. Derive the volume-flow relationship and electrical input power required by that full planned operating duty.

**Question card story-science connection - exact player copy:** Required pump power tells the crew how much shared plant capacity the flume test needs.

**Fixture source panel - exact player copy:** The cleaned valve must deliver flow Q=0.45 m³/s against head H=7.0 m at efficiency eta=0.70. With water density rho=1000 kg/m³ and g=9.80 m/s², use P_useful=rho gQH and P_input=P_useful/eta to derive the volume-flow relationship and electrical input power for the planned duty.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation and one pump-input-power number in `kW`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The cleaned valve must deliver 0.45 m³/s against 7.0 m of head at 70% efficiency.", "Given flow `Q = 0.45 m^3/s`, head `H = 7.0 m`, water density `rho = 1000 kg/m^3`, `g = 9.80 m/s^2`, and efficiency `eta = 0.70`, use `P_useful = rho gQH` and `P_input = P_useful/eta`."]
  lines:
    - {id: flow, expression: "Q = Av", rule: "steady incompressible continuity"}
    - {id: useful, expression: "P_useful = rho g Q H", rule: "gravitational energy added per time"}
    - {id: input, expression: "P_input = rho g Q H / eta", rule: "efficiency = useful/input"}
    - {id: result, expression: "P_input = 1000(9.80)(0.45)(7.0)/0.70 = 44.1 kW", rule: "substitute SI values"}
  order: [flow,useful,input,result]
  decoys:
    - {expression: "P_input = rho g Q H * eta", rule: "multiply by efficiency instead of dividing by it"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `Q=A/v`
2. `P_useful=ρgH/Q`
3. `P_input=ηρgQH`
4. `P_input=1000(9.80)(0.45)(7.0)(0.70)=21.6 kW`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The cleaned valve must deliver 0.45 m³/s against 7.0 m of head at 70% efficiency.", "Given flow `Q = 0.45 m^3/s`, head `H = 7.0 m`, water density `rho = 1000 kg/m^3`, `g = 9.80 m/s^2`, and efficiency `eta = 0.70`, use `P_useful = rho gQH` and `P_input = P_useful/eta`."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Build the flow and power result in the form and units requested by the prompt"
  left_side: "Q"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Q = Av", correct: true}
        - {text: "Q=A/v", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "P_useful = rho g Q H", correct: true}
        - {text: "P_useful = rho g H/Q", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "P_input = rho g Q H / eta", correct: true}
        - {text: "P_input = rho g Q H * eta", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "P_input = 1000(9.80)(0.45)(7.0)/0.70 = 44.1 kW", correct: true}
        - {text: "P_input=1000(9.80)(0.45)(7.0)(0.70)=21.6 kW", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Submit 44.1 kW; accept 43.5-44.7 kW.

**Answer text:** The required pump input power is 44.1 kW.

**Why:** The pump raises flowing water against gravity; only 70% of input reaches the water.

**Wrong-path feedback:** Divide by efficiency; multiplying would make input smaller than useful output.

**State/output:** Mark duty point on `pump-curve` and send 44.1 kW request to Plant Room.

## Stop 43 - Allocate shared plant power

**Format/placement:** ALLOCATE, asked at `motor-plate`.

**Metadata:** Concept: 18 - Finite power; Keystone: energy and coupled systems; Area: Brennan's workshop; Learning role: COMBINE; Difficulty: L4; Story role: decision.

**Call - exact player copy:** Go to the shared motor plate, in Shared Plant Room.

**Stop reason - exact player copy:** The flume's power demand is known, but shutdown and logging must also fit in the test block.

**Question card story setup - exact player copy:** The flume needs 44.1 kW, while the coaster measurement run needs 54.6 kW and shutdown controls need protected reserve. Allocate one complete test block without exceeding the shared plant limit.

**Question card story-science connection - exact player copy:** The allocation determines whether the test can run without sacrificing essential monitoring or emergency power.

**Question card prompt - exact player copy:** From a `55 kW` pool, submit one numerical allocation in `kW` among flume `44.1`, protected shutdown controls `5.0`, independent logging `3.0`, and coaster lift `54.6`; name what runs now, what waits, and whether shutdown remains protected.

**Complete format-specific interaction block:**

```yaml
allocate:
  pool: 55
  items:
    - {id: flume, label: "Flume verified duty", cost: 44.1, required: true}
    - {id: shutdown, label: "Protected shutdown controls", cost: 5.0, protected: true, required: true}
    - {id: logging, label: "Independent logging", cost: 3.0, required: true}
    - {id: coaster, label: "Coaster lift", cost: 54.6, required: false}
  questions: ["Which loads fit now?", "Which load must be scheduled later?", "Is protected shutdown preserved?"]
  correct_allocation: {flume: 44.1, shutdown: 5.0, logging: 3.0, coaster: 0}
```

**Correct result:** Allocation {flume:44.1 kW, shutdown:5.0 kW, logging:3.0 kW, coaster:0 kW}.

**Answer text:** Run flume, shutdown controls, and logging now; schedule the coaster separately.

**Why:** The safe allocation totals 52.1 kW. Adding the coaster is impossible.

**Wrong-path feedback:** Protected shutdown is a required load, not spare capacity.

**State/output:** Print non-overlap schedule.

## Stop 44 - Use the water arc as a speed check

**Format/placement:** LOB, asked at `stall-cannon`.

**Metadata:** Concept: 3 - Projectile motion transfer; Keystone: motion and fluids; Area: Drop Tower Control; Learning role: TRANSFER; Difficulty: L3; Story role: payoff.

**Call - exact player copy:** Go to the stall cannon, in Boarded Arcade.

**Stop reason - exact player copy:** The cleaned water line is ready for an independent exit-speed check.

**Question card story setup - exact player copy:** The stall cannon uses the same cleaned water line and launches from ground level toward a mark 3.60 m away. Set the angle and pressure charge that reproduce the predicted 5.94 m/s exit speed.

**Question card story-science connection - exact player copy:** The projectile's range links the water arc to launch speed and tests the line's predicted delivery.

**Question card prompt - exact player copy:** Given target range `R = 3.60 m +/- 0.12 m`, `g = 9.80 m/s^2`, launch and landing at equal height, angle control `20-70 degrees`, and charge-speed control `3.0-7.0 m/s`, use `R = v^2 sin(2theta)/g`. Submit one numerical pair: launch angle in `degrees` and charge-speed setting in `m/s`.

**Complete format-specific interaction block:**

```yaml
lob:
  angle: {min: 20, max: 70, step: 1, unit: deg}
  charge: {min: 3.0, max: 7.0, step: 0.1, maps_to_speed: true, unit: "m/s"}
  target: {range: 3.60, tolerance: 0.12, unit: m}
  hidden_launch_speed: true
  correct: {angle: 45, charge: 5.94}
```

**§7 build completion - LOB:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
lob:
  marks: [{label:"low",value:25},{label:"nominal",value:50},{label:"high",value:75}]
  target: nominal
```

**Handback 4 canonical interaction block - LOB:**

**Handback 5 canonical interaction block - LOB:**

```yaml
lob:
  angle: {min: 20, max: 70, step: 1, unit: "degrees"}
  charge: {min: 3.0, max: 7.0, step: 0.1, unit: "m/s"}
  marks:
    - {id: short, label: "Short marker", range: 3.0, unit: "m"}
    - {id: target, label: "Target marker", range: 3.60, unit: "m"}
    - {id: long, label: "Long marker", range: 4.2, unit: "m"}
  target: target
  correct: {angle: 45, charge: 5.94}
  tolerance: {range: 0.12, speed: 0.09}
```

**Correct result:** Submit pair (45°, 5.94 m/s); accept speed 5.85-6.03 m/s.

**Answer text:** At 45 degrees, a 5.94 m/s launch reaches about 3.60 m on level ground.

**Why:** `R=v² sin(2θ)/g`; range is greatest at 45 degrees for equal launch and landing height.

**Wrong-path feedback:** Split launch velocity into horizontal and vertical components.

**State/output:** Set `evidence_flags.flume_speed_independent = true`.

## Mission outcome

Mission decision: The Log Flume can run at 0.45 m3/s and 44.1 kW once the gate is clear. It cannot share power with the coaster lift test. Stop power must stay safe. The water arc backs the flow result.

**Segue - exact player copy:** Therefore Chen must clear the rider-load tests while the lift stays off; the 55 kW supply cannot serve both demands.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Mateo Ruiz clips the 0.45 CUBIC METRES PER SECOND / 44.1 KW card to the pump curve. Therefore Chen must clear the rider-load tests while the lift stays off; the 55 kW supply cannot serve both demands.

**Header:** MISSION 11 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 10:30`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Valve cleaning and three instrumented tests consume reserve; non-overlap prevents overload.  
**Automatic bar change:** Certificate +6 | Proof +6 | Reserve -6 | Confidence +4  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +5/+0/+7/+0. Result: 92 | 100 | 73 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Additional concepts kept out of the required mission card

- **Flow rate:** Flow rate is volume passing a location per time.

### Review question 1


**Prompt - exact player copy:** Which statement best explains flow rate?

**Options - exact player copy:**

- A. Pressure is force per area; fluid pressure acts in all directions at a point.
- B. Flow rate is volume passing a location per time.
- C. Gauge pressure is pressure above atmospheric pressure.
- D. Buoyant force is upward force equal to the weight of displaced fluid.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for flow rate. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes pressure. It does not answer the question about flow rate.
- B: Correct. Flow rate is volume passing a location per time.
- C: This describes gauge pressure. It does not answer the question about flow rate.
- D: This describes buoyant force. It does not answer the question about flow rate.

### Review question 2


**Prompt - exact player copy:** Which statement best explains pressure?

**Options - exact player copy:**

- A. Flow rate is volume passing a location per time.
- B. Gauge pressure is pressure above atmospheric pressure.
- C. Pressure is force per area; fluid pressure acts in all directions at a point.
- D. Buoyant force is upward force equal to the weight of displaced fluid.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for pressure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes flow rate. It does not answer the question about pressure.
- B: This describes gauge pressure. It does not answer the question about pressure.
- C: Correct. Pressure is force per area; fluid pressure acts in all directions at a point.
- D: This describes buoyant force. It does not answer the question about pressure.

### Review question 3


**Prompt - exact player copy:** Which statement best explains gauge pressure?

**Options - exact player copy:**

- A. Flow rate is volume passing a location per time.
- B. Pressure is force per area; fluid pressure acts in all directions at a point.
- C. Buoyant force is upward force equal to the weight of displaced fluid.
- D. Gauge pressure is pressure above atmospheric pressure.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for gauge pressure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes flow rate. It does not answer the question about gauge pressure.
- B: This describes pressure. It does not answer the question about gauge pressure.
- C: This describes buoyant force. It does not answer the question about gauge pressure.
- D: Correct. Gauge pressure is pressure above atmospheric pressure.

### Review question 4


**Prompt - exact player copy:** Which statement best explains buoyant force?

**Options - exact player copy:**

- A. Buoyant force is upward force equal to the weight of displaced fluid.
- B. Flow rate is volume passing a location per time.
- C. Pressure is force per area; fluid pressure acts in all directions at a point.
- D. Gauge pressure is pressure above atmospheric pressure.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for buoyant force. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Buoyant force is upward force equal to the weight of displaced fluid.
- B: This describes flow rate. It does not answer the question about buoyant force.
- C: This describes pressure. It does not answer the question about buoyant force.
- D: This describes gauge pressure. It does not answer the question about buoyant force.

### Review question 5


**Prompt - exact player copy:** Which statement best explains continuity?

**Options - exact player copy:**

- A. Flow rate is volume passing a location per time.
- B. Continuity is conservation of volume flow for steady incompressible fluid.
- C. Pressure is force per area; fluid pressure acts in all directions at a point.
- D. Gauge pressure is pressure above atmospheric pressure.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for continuity. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes flow rate. It does not answer the question about continuity.
- B: Correct. Continuity is conservation of volume flow for steady incompressible fluid.
- C: This describes pressure. It does not answer the question about continuity.
- D: This describes gauge pressure. It does not answer the question about continuity.

### Review question 6


**Prompt - exact player copy:** Pressure in a water line matches its expected level before a valve but is much lower immediately after it and farther downstream. The flow is steady. Where should testing focus first?

**Options - exact player copy:**

- A. Flow rate is volume passing a location per time.
- B. Pressure is force per area; fluid pressure acts in all directions at a point.
- C. On a restriction or pressure loss at the valve, rather than on a source that would also lower the upstream pressure.
- D. Gauge pressure is pressure above atmospheric pressure.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for hydrostatic pressure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes flow rate. It does not answer the question about hydrostatic pressure.
- B: This describes pressure. It does not answer the question about hydrostatic pressure.
- C: Correct. On a restriction or pressure loss at the valve, rather than on a source that would also lower the upstream pressure.
- D: This describes gauge pressure. It does not answer the question about hydrostatic pressure.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Fluid gauge pressure is `ρgh`.
- A floating object displaces its own weight of fluid.
- Continuity conserves volume flow.
- **Mission takeaway:** A subsystem can meet its own requirement and still need a shared-resource schedule.

# Mission 12 - The Force a Rider Feels

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 12 - 4 DAYS UNTIL THE PARK REVIEW.

**Card title:** THE FORCE A RIDER FEELS

**Go now:** Go to the Bumper Car Pavilion and meet Linh Chen, the instrumentation and test lead, at the dummy rig.

**Card body:** 4 days until the park review. Two test dummies sit beside the signed parts list. Today you decide which tested setups meet the rider-load limits.

**Objective:** Verify the bumper-car and drop-tower rider-force limits.

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
  - id: safety_m12_we01
    title: Average stopping force
    problem: A 2 kg object slows from 4 m/s to rest in 0.5 s. Find average net force along the initial positive direction.
    rule: F_avg=Δp/Δt=m(vf-vi)/Δt.
    steps:
    - 'Set up the relationship: F_avg=Δp/Δt=m(vf-vi)/Δt.'
    - F_avg=2(0-4)/0.5=-16 N.
    answer: Average net force is 16 N opposite the original motion.
    common_mistake: This average is not necessarily the peak force.
  - id: safety_m12_we02
    title: Area under a force pulse
    problem: A triangular force-time pulse rises from 0 to 10 N and returns to 0 over 2 s. Find impulse.
    rule: Impulse is the signed area under the force-time graph.
    steps:
    - 'Set up the relationship: Impulse is the signed area under the force-time graph.'
    - J=(1/2)(2 s)(10 N)=10 N s.
    answer: The impulse is 10 N s.
    common_mistake: Peak force times duration treats the triangle as a rectangle.
    figure:
      kind: line
      xLabel: Time (s)
      yLabel: Force (N)
      caption: A triangular force pulse.
      series:
      - name: Force (N)
        points:
        - - 0
          - 0
        - - 1
          - 10
        - - 2
          - 0
  - id: safety_m12_we03
    title: Apparent weight
    problem: A 2 kg mass accelerates upward at 2 m/s² where g=10 m/s². Find its support force N.
    rule: N-mg=ma, taking upward positive.
    steps:
    - 'Set up the relationship: N-mg=ma, taking upward positive.'
    - N=m(g+a)=2(10+2)=24 N.
    answer: The support force is 24 N, greater than its 20 N weight.
    common_mistake: The support force equals mg only when vertical acceleration is zero.
  - id: safety_m12_we04
    title: A support-force ratio
    problem: An object weighs 20 N while its support force is 60 N. Find the load factor.
    rule: Load factor=support force/ordinary weight.
    steps:
    - 'Set up the relationship: Load factor=support force/ordinary weight.'
    - load factor=60/20=3.
    answer: The support force is three times the object's ordinary weight.
    common_mistake: This ratio does not mean gravity itself became three times stronger.
  - id: safety_m12_we05
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

Peak force: Peak force is largest force reached during an interval; it may exceed the average force.

Load factor: Load factor is support force divided by ordinary weight `mg`; a reading of 5.4 means the support force is 5.4 times weight.

Configuration: Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.

#### Primer concepts

- Momentum determines impulse; time shapes average force.
- Acceleration and apparent weight must use consistent directions.
- Certify only the configuration actually tested.

#### Equations first needed today

No new equation is introduced. This mission combines `p=mv`, `J=FavgΔt`, `v²=v0²+2aΔx`, and `N-mg=ma` from earlier missions.

**Crew:** Linh Chen - test lead; Maya Hart - operations lead; Ruth Brennan - former chief engineer.

## Main story happening - designer summary

The player retrieves collision momentum, builds a causal chain from motion to rider load, stresses uncertainty around the drop result, and attests the exact test configurations. Both pass their fictional limits, but only for verified masses, speeds, restraints, sensors, and procedures.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Bumper Car Pavilion | automatic**

**Trigger:** mission_12_arrival.

**World state:** Two test dummies sit beside the signed parts list.

**Panel/HUD text:** `STOP 45 READY`

**Dialogue bubbles -** Linh Chen: “One number describes the whole stop. The other catches the hardest instant.”

**Unlocks:** Stop 45.

**Beat 2 - After Stop 45 | automatic**

**Trigger:** accepted_stop_45.

**World state:** At `dummy-rig`, the dated accepted-result slip for Stop 45 reads: "Submit 61.6 kg·m/s; accept 60.4-62.8 kg·m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Nice work. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Drop Tower Control.

**Beat 3 - After Stop 47 | automatic**

**Trigger:** accepted_stop_46.

**World state:** At `brake-desk`, the dated accepted-result slip for Stop 46 reads: "Order motion evidence → momentum/kinematics → restraint force.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Good thinking. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Brennan's Workshop.

**Beat 4 - After Stop 48 | automatic**

**Trigger:** accepted_stop_47.

**World state:** At `witness-sheet`, the dated accepted-result slip for Stop 47 reads: "Choice 1 - exact tested configuration remains below 6.0 over uncertainty.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Linh Chen: “Exactly right. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_48.

**World state:** At `witness-sheet`, Linh Chen pins the TESTED CONFIGURATIONS ONLY clearance to the witness sheet. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 12 COMPLETE`

**Dialogue bubbles -** Linh Chen: "These parts. These loads. These steps. That is what passed. But Hart has three moving rides asking for one reserve; separate passes do not make a park schedule."

**Unlocks:** Close the mission and preserve its Casebook evidence.

**Waypoint:** Activate Carousel Drive House.

### Physical aftermath — safety-m12

**Home:** `witness-sheet`. **Before:** The dated mission-12 evidence holder at this fixture has no accepted record. Two test dummies sit beside the signed parts list.
**After — exact action:** Linh Chen pins the TESTED CONFIGURATIONS ONLY clearance to the witness sheet.
**Trigger:** accepted_stop_48. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `motor-plate`, three start requests hang under one 55 kW plate.
**Segue - exact player copy:** But Hart has three moving rides asking for one reserve; separate passes do not make a park schedule.

## Location plan

**Three locations:** Bumper Cars for impact; Drop Tower for braking load; Workshop for configuration attestation.

## Characters and dramatic beat

Chen distinguishes average from peak. Hart refuses to broaden a passing test beyond its configuration. Brennan turns the lesson from incomplete records into an exact procedure match.

## Key concepts, explained here

Momentum change creates impulse. Stop time sets average force, while the force trace gives peak force. During upward tower braking, the seat force exceeds weight because it both supports the rider and accelerates upward.

## Stop 45 - Retrieve the collision result

**Format/placement:** BALLPARK, asked at `dummy-rig`.

**Metadata:** Concept: 20 - Collision energy and momentum; Keystone: momentum; Area: Bumper Car Pavilion; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the padded dummy rig, in Bumper Car Pavilion.

**Stop reason - exact player copy:** The restraint review needs the dummy's momentum change before interpreting its force-time record.

**Question card story setup - exact player copy:** The joined test cars move at 0.88 m/s after impact, and the 70 kg dummy stops with them. Estimate the dummy's momentum change before using the separately measured force-time trace.

**Question card story-science connection - exact player copy:** Momentum change gives the impulse that the independently measured force trace should account for.

**Question card prompt - exact player copy:** Given dummy mass `m = 70 kg` and speed-change magnitude `Delta v = 0.88 m/s`, use `|Delta p| = m|Delta v|`. Submit one momentum-change number in `kg m/s`.

```yaml
estimate: {labels: ["Dummy mass", "Speed change"], values: [70,0.88], slots: [mass,dv], template: "delta p = {mass} x {dv}", formula: "|Delta p|=70×0.88", correct: 61.6, target: 62, tolerance: 0.05, unit: "kg m/s"}
```

**Correct result:** Submit 61.6 kg·m/s; accept 60.4-62.8 kg·m/s.

**Answer text:** The dummy's momentum changes by 61.6 kg m/s.

**Why:** It moves from 0.88 m/s to rest.

**Wrong-path feedback:** Momentum uses velocity change, not stopping distance.

**State/output:** Send `Δp=61.6 kg m/s` to force-chain board.

## Stop 46 - Build the load chain

**Format/placement:** CHAIN, asked at `brake-desk`.

**Metadata:** Concept: 35 - Causal transfer; Keystone: momentum, impulse, force; Area: Bumper Car Pavilion; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the rider-load chain desk, in Drop Tower Control.

**Stop reason - exact player copy:** The motion and impulse records are available, but their links to restraint loading must be explicit.

**Question card story setup - exact player copy:** Name the governing physics relationship at every required transfer.

**Question card story-science connection - exact player copy:** The ordered physical relationships connect measured motion to the force the restraint must withstand.

**Question card prompt - exact player copy:** Submit one ordered five-step plan from measured initial velocity through momentum change, impulse/average force, stopping-distance acceleration, and final support force; use `p = mv`, `J = Delta p = F_avg Delta t`, `v_f^2 = v_i^2 + 2a Delta x`, and `N - mg = ma`.

**Complete format-specific interaction block:**

```yaml
chain:
  transfers:
    - {id: motion, label: "Measure initial motion", carried_quantity: velocity}
    - {id: momentum, label: "Calculate momentum change", carried_quantity: momentum}
    - {id: impulse, label: "Use stopping time for average force", carried_quantity: impulse}
    - {id: acceleration, label: "Use stopping distance for acceleration", carried_quantity: acceleration}
    - {id: support, label: "Add weight to obtain support force", carried_quantity: force}
  order: [motion,momentum,impulse,acceleration,support]
  governing_relationship: "p=mv; J=delta p; v^2 relation; N-mg=ma"
```

**§7 authored-board source - CHAIN:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 46 - Build the load chain"
  format: "CHAIN"
  source: "Handback 5 canonical interaction block"
  question: "Submit one ordered five-step plan from measured initial velocity through momentum change, impulse/average force, stopping-distance acceleration, and final support force; use `p = mv`, `J = Delta p = F_avg Delta t`, `v_f^2 = v_i^2 + 2a Delta x`, and `N - mg = ma`."
  payload: "```yaml chain: transfers: - {id: motion, label: \"Measure initial motion\", carried_quantity: velocity} - {id: momentum, label: \"Calculate momentum change\", carried_quantity: momentum} - {id: impulse, label: \"Use stopping time for average force\", carried_quantity: impulse} - {id: acceleration, label: \"Use stopping distance for acceleration\", carried_quantity: acceleration} - {id: support, label: \"Add weight to obtain support force\", carried_quantity: force} order: [motion,momentum,impulse,acceleration,support] governing_relationship: \"p=mv; J=delta p; v^2 relation; N-mg=ma\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - CHAIN:**

**Handback 5 canonical interaction block - CHAIN:**

```yaml
chain:
  links:
    - {id: motion, label: "Measure initial motion", transfers: "velocity"}
    - {id: momentum, label: "Calculate momentum change", transfers: "momentum"}
    - {id: impulse, label: "Use stopping time", transfers: "impulse and average force"}
    - {id: acceleration, label: "Use stopping distance", transfers: "acceleration"}
    - {id: support, label: "Add rider weight", transfers: "support force"}
  order: [motion, momentum, impulse, acceleration, support]
  governingLink: impulse
  correctConclusion: "Order motion evidence → momentum/kinematics → restraint force."
```

**Handback 6 canonical interaction block - CHAIN:**

```yaml
chain:
  links:
    - {id: motion, label: "Measure initial motion", transfers: "velocity"}
    - {id: momentum, label: "Calculate momentum change", transfers: "momentum"}
    - {id: impulse, label: "Use stopping time", transfers: "impulse and average force"}
    - {id: acceleration, label: "Use stopping distance", transfers: "acceleration"}
    - {id: support, label: "Add rider weight", transfers: "support force"}
  order: [motion, momentum, impulse, acceleration, support]
  governingLink: impulse
  distractor: support
  correctConclusion: "Order motion evidence → momentum/kinematics → restraint force; impulse, not the rider's large static weight, governs the collision-force transfer."
```

**Correct result:** Order motion evidence → momentum/kinematics → restraint force.

**Answer text:** Begin with measured motion, then use momentum or kinematics, and finish with the force the restraint or seat supplies.

**Why:** Force is not read directly from distance; the intermediate time or acceleration relation matters.

**Wrong-path feedback:** Identify what physical quantity each step passes to the next.

**State/output:** Illuminate both rider-load paths.

## Stop 47 - Stress the tower result

**Format/placement:** STRESS, asked at Linh Chen beside `witness-sheet`.

**Metadata:** Concept: 35 - Uncertainty and threshold; Keystone: forces and model limits; Area: Pirate Ship console; Learning role: TRANSFER; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Talk to Linh Chen, at the tower witness sheet in Drop Tower Control.

**Stop reason - exact player copy:** The tower's measured support force passes nominally, leaving timing and distance uncertainty to test.

**Question card story setup - exact player copy:** The witnessed drop reports a peak support force of 5.4 times ordinary weight. Move timing and distance through their measured ranges and test whether the result remains below the inclusive 6.0 limit.

**Question card story-science connection - exact player copy:** The worst supported force ratio determines whether this exact drop configuration remains under the limit.

**Question card prompt - exact player copy:** Given entry speed `26.3-26.8 m/s`, effective stop time `0.60-0.64 s`, `g = 9.80 m/s^2`, and campaign limit `6.0 x weight`, use `N/(mg) = 1 + v/(g Delta t)`. Submit the numerical load-factor range in `x weight` and one survival conclusion limited to the tested configuration.

**Complete format-specific interaction block:**

```yaml
stress:
  assumptions:
    - {id: stop_time, label: "Effective stop time", min: 0.60, max: 0.64, step: 0.01, unit: s}
    - {id: entry_speed, label: "Entry speed", min: 26.3, max: 26.8, step: 0.1, unit: m/s}
  candidates:
    - {id: pass, label: "Tested configuration remains below 6.0", survives: true}
    - {id: all_loads, label: "All passenger loads are certified", survives: false}
    - {id: no_peak, label: "Average force makes peak irrelevant", survives: false}
  output_range: {min: 5.19, max: 5.56, unit: "x weight"}
  correct: pass
  conclusion: "The tested Drop Tower configuration remains below 6.0 times weight across the stated uncertainty range."
```

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 47 - Stress the tower result"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Given entry speed `26.3-26.8 m/s`, effective stop time `0.60-0.64 s`, `g = 9.80 m/s^2`, and campaign limit `6.0 x weight`, use `N/(mg) = 1 + v/(g Delta t)`. Submit the numerical load-factor range in `x weight` and one survival conclusion limited to the tested configuration."
  payload: "```yaml stress: assumptions: - {id: stop_time, label: \"Effective stop time\", min: 0.60, max: 0.64, step: 0.01, unit: s} - {id: entry_speed, label: \"Entry speed\", min: 26.3, max: 26.8, step: 0.1, unit: m/s} candidates: - {id: pass, label: \"Tested configuration remains below 6.0\", survives: true} - {id: all_loads, label: \"All passenger loads are certified\", survives: false} - {id: no_peak, label: \"Average force makes peak irrelevant\", survives: false} output_range: {min: 5.19, max: 5.56, unit: \"x weight\"} correct: pass conclusion: \"The tested Drop Tower configuration remains below 6.0 times weight across the stated uncertainty range.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "effective stop time", min: 0.6, max: 0.64, nominal: 0.62, step: 0.01, unit: "s"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 0.62, max: 0.62}
      failsAt: 0.64
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 0.62, max: 0.64}
      failsAt: 0.6
    - id: robust_plan
      label: "Choice 1 - exact tested configuration remains below 6.0 over uncertainty."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 0.6, max: 0.64}
  robust: robust_plan
  question: "Given entry speed `26.3-26.8 m/s`, effective stop time `0.60-0.64 s`, `g = 9.80 m/s^2`, and campaign limit `6.0 x weight`, use `N/(mg) = 1 + v/(g Delta t)`. Submit the numerical load-factor range in `x weight` and one survival conclusion limited to the tested configuration."
```

**Correct result:** Choice 1 - exact tested configuration remains below 6.0 over uncertainty.

**Answer text:** The tested configuration remains below 6.0 across the stated uncertainty range.

**Why:** The worst supported case is 5.56 times weight. That does not certify untested masses or settings.

**Wrong-path feedback:** (all_loads) The uncertainty test covers only the named configuration, not every passenger load. (no_peak) Average force cannot rule out a short peak, so the peak channel remains necessary.

**State/output:** Mark witness sheet `ROBUST PASS: TEST CONFIGURATION`.

## Stop 48 - Attest both configurations

**Format/placement:** ATTEST, asked at Maya Hart beside `configuration-desk`.

**Metadata:** Concept: 35 - Configuration-limited certification; Keystone: evidence; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Maya Hart, at the configuration attestation desk in Brennan's Workshop.

**Stop reason - exact player copy:** Both force checks pass, but the certificate must distinguish today's hardware from older configurations.

**Question card story setup - exact player copy:** Both force results pass, but old records mix masses, restraints, and sensors. Verify the claims that connect today's numbers to today's exact operating configurations before either final certificate section closes.

**Question card story-science connection - exact player copy:** Verifying masses, restraints, and sensors prevents a passing result from being applied to an untested setup.

**Question card prompt - exact player copy:** Submit one selected-claims attestation containing only the displayed, currently verified bumper-car and tower configuration facts; exclude the historical all-load claim.

**Complete format-specific interaction block:**

```yaml
attest:
  verification_limit: 6
  claims:
    - {id: bumper_mass, label: "Bumper car mass 240 kg", backed: true, critical: true}
    - {id: bumper_pad, label: "0.22 s padded stop installed", backed: true, critical: true}
    - {id: tower_height, label: "36.0 m release mark", backed: true, critical: true}
    - {id: tower_sensor, label: "Sensor C-17 used", backed: true, critical: true}
    - {id: tower_brake, label: "Current brake stack matches test", backed: true, critical: true}
    - {id: old_allloads, label: "Old signature certifies every load", backed: false, critical: true}
  correct: [bumper_mass,bumper_pad,tower_height,tower_sensor,tower_brake]
```

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Attest both configurations", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Submit verified set [bumper mass, bumper pad, tower height, tower sensor, tower brake].

**Answer text:** Certify only the verified bumper and tower configurations; reject the old all-load claim.

**Why:** Changing mass, restraint, height, sensor, or brake state changes the modeled or measured result.

**Wrong-path feedback:** (old_allloads) The old signature cannot extend today's verified bumper and tower configurations to every passenger load.

**State/output:** Set `ride_status.bumper=pass`, `ride_status.tower=pass`.

## Mission outcome

Mission decision: Both tested ride setups meet the game force limits. The padded Bumper Car passes. The Drop Tower stays below 6.0 times weight across its test range. Only the tested loads, parts, sensors, and steps are cleared.

**Segue - exact player copy:** But Hart has three moving rides asking for one reserve; separate passes do not make a park schedule.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Linh Chen pins the TESTED CONFIGURATIONS ONLY clearance to the witness sheet. But Hart has three moving rides asking for one reserve; separate passes do not make a park schedule.

**Header:** MISSION 12 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 11:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Independent force testing completes two ride sections while consuming final test blocks.  
**Automatic bar change:** Certificate +10 | Proof +6 | Reserve -7 | Confidence +5  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP +0/+0/+12/+0. Result: 100 | 100 | 78 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** A fictional test allows a peak support force of at most 6 times weight. The bars include each trial’s uncertainty allowance. Which conclusion follows?

**Figure - exact player copy:**

```json
{
  "kind": "bars",
  "xLabel": "Category",
  "yLabel": "Peak support force / weight",
  "caption": "Worst supported peak load for each tested configuration",
  "bars": [
    {
      "name": "Trial 1",
      "value": 4.8
    },
    {
      "name": "Trial 2",
      "value": 5.2
    },
    {
      "name": "Trial 3",
      "value": 5.56
    }
  ]
}
```

**Options - exact player copy:**

- A. Trial 3 fails because 5.56 is greater than 5.
- B. All untested configurations are also safe.
- C. Only the average of the three bars needs to pass.
- D. All three tested configurations pass this load limit.

**Correct answer:** D

**Hint - exact player copy:** Compare each bar with 6; do not broaden the claim beyond the tests.

**Option feedback - exact player copy:**

- A: The stated limit is 6, not 5.
- B: The graph supports only the tested configurations and stated limit.
- C: Each configuration must meet the limit individually.
- D: Correct. All three tested configurations pass this load limit.

### Review question 2


**Prompt - exact player copy:** Which statement best explains load factor?

**Options - exact player copy:**

- A. Load factor is support force divided by ordinary weight mg; a reading of 5.4 means the support force is 5.4 times weight.
- B. Peak force is largest force reached during an interval; it may exceed the average force.
- C. Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.
- D. It moves from 0.88 m/s to rest.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for load factor. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Load factor is support force divided by ordinary weight mg; a reading of 5.4 means the support force is 5.4 times weight.
- B: This describes peak force. It does not answer the question about load factor.
- C: This describes configuration. It does not answer the question about load factor.
- D: This describes collision energy and momentum. It does not answer the question about load factor.

### Review question 3


**Prompt - exact player copy:** Which statement best explains configuration?

**Options - exact player copy:**

- A. Peak force is largest force reached during an interval; it may exceed the average force.
- B. Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.
- C. Load factor is support force divided by ordinary weight mg; a reading of 5.4 means the support force is 5.4 times weight.
- D. It moves from 0.88 m/s to rest.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for configuration. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes peak force. It does not answer the question about configuration.
- B: Correct. Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.
- C: This describes load factor. It does not answer the question about configuration.
- D: This describes collision energy and momentum. It does not answer the question about configuration.

### Review question 4


**Prompt - exact player copy:** A pair of carts moves together at 0.88 m/s and is then brought to rest by padding. What change in velocity should be used for the stopping impulse?

**Options - exact player copy:**

- A. Peak force is largest force reached during an interval; it may exceed the average force.
- B. Load factor is support force divided by ordinary weight mg; a reading of 5.4 means the support force is 5.4 times weight.
- C. Δv=0-0.88=-0.88 m/s along the original positive direction.
- D. Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for collision energy and momentum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes peak force. It does not answer the question about collision energy and momentum.
- B: This describes load factor. It does not answer the question about collision energy and momentum.
- C: Correct. Δv=0-0.88=-0.88 m/s along the original positive direction.
- D: This describes configuration. It does not answer the question about collision energy and momentum.

### Review question 5


**Prompt - exact player copy:** Which statement best explains causal transfer?

**Options - exact player copy:**

- A. Peak force is largest force reached during an interval; it may exceed the average force.
- B. Load factor is support force divided by ordinary weight mg; a reading of 5.4 means the support force is 5.4 times weight.
- C. Configuration is the exact mass, speed, brake state, restraint, and procedure under which a result applies.
- D. Force is not read directly from distance; the intermediate time or acceleration relation matters.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for causal transfer. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes peak force. It does not answer the question about causal transfer.
- B: This describes load factor. It does not answer the question about causal transfer.
- C: This describes configuration. It does not answer the question about causal transfer.
- D: Correct. Force is not read directly from distance; the intermediate time or acceleration relation matters.

### Review question 6


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

- A. 2 minutes.
- B. 1 minute.
- C. 3 minutes.
- D. No stop is needed because the average is below 5.

**Correct answer:** A

**Hint - exact player copy:** At least includes equality.

**Option feedback - exact player copy:**

- A: Correct. 2 minutes.
- B: The reading is only 3 units at 1 minute.
- C: Waiting until 3 minutes misses the first qualifying check.
- D: The rule applies to each reading, not the average.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Momentum change fixes impulse.
- Stop time controls average force; the trace supplies peak force.
- During upward braking, support force exceeds ordinary weight.
- **Mission takeaway:** Certify the tested configuration, not a broader category suggested by an old record.

# Mission 13 - One Park, Not Seven Machines

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 13 - 3 DAYS UNTIL THE PARK REVIEW.

**Card title:** ONE PARK, NOT SEVEN MACHINES

**Go now:** Go to the Carousel Drive House and meet Tunde Idowu, the controls engineer, at the drive panel.

**Card body:** 3 days until the park review. Three start requests hang under one 55 kW plate. Today you decide how the rides share power and stop reserve.

**Objective:** Write one compatible operating plan for the three rotating rides.

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
  - id: safety_m13_we01
    title: Angular momentum
    problem: A rigid object has I=2 kg m² and angular speed ω=3 rad/s about a fixed axis. Find angular momentum.
    rule: L=Iω.
    steps:
    - 'Set up the relationship: L=Iω.'
    - L=2(3)=6 kg m²/s.
    answer: Angular momentum magnitude is 6 kg m²/s.
    common_mistake: Angular momentum is linear in angular speed, unlike rotational energy.
  - id: safety_m13_we02
    title: Rotational kinetic energy
    problem: A rigid object has I=2 kg m² and ω=3 rad/s. Find rotational kinetic energy.
    rule: K_rot=Iω²/2.
    steps:
    - 'Set up the relationship: K_rot=Iω²/2.'
    - K_rot=2(3²)/2=9 J.
    answer: Rotational energy is 9 J.
    common_mistake: Angular speed must be squared.
  - id: safety_m13_we03
    title: Pull mass toward an axis
    problem: No external torque acts. Rotational inertia decreases from 4 to 2 kg m²; initial angular speed is 3 rad/s. Find final speed.
    rule: Conservation of angular momentum gives I1ω1=I2ω2.
    steps:
    - 'Set up the relationship: Conservation of angular momentum gives I1ω1=I2ω2.'
    - ω2=(4×3)/2=6 rad/s.
    answer: Angular speed doubles to 6 rad/s.
    common_mistake: Rotational kinetic energy need not stay constant when internal work changes the mass distribution.
  - id: safety_m13_we04
    title: Separate a fitted product
    problem: A rectangle has area 24 cm². Can area alone determine its length and width?
    rule: Area = length × width. One equation may leave more than one unknown pair.
    steps:
    - 24 = 6×4 and 24 = 8×3. Both pairs have the correct area.
    - If width is independently measured as 4 cm, length = 24/4 = 6 cm.
    answer: Area alone is insufficient; the additional width measurement selects 6 cm by 4 cm.
    common_mistake: One matching output does not identify both input parameters.
  - id: safety_m13_we05
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Angular momentum: Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.

Rotational kinetic energy: Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.

Degeneracy: Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

Protected reserve: Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.

#### Primer concepts

- Rotational inertia depends on how mass is distributed.
- Two individually acceptable settings can conflict through shared resources.
- A complete operating rule includes normal settings and automatic stop conditions.

#### Equations first needed today

**Equation:** `L = Iω` and `Krot = 1/2 Iω²`  
**What it is for:** tracking angular momentum and rotational energy  
**Symbols:** `L` is angular momentum, `I` is rotational inertia, `ω` is angular speed, and `Krot` is rotational kinetic energy.  
**Why this campaign needs it:** Emergency stopping and restart loads depend on both ride speed and mass distribution.

**Crew:** Tunde Idowu - controls engineer; Maya Hart - operations lead; Luka Kovač - mechanical lead.

## Main story happening - designer summary

The player collapses an ambiguous speed/timing choice, derives rotational stopping demand, allocates shared capacity, and writes the joint trigger rules. The carousel, pirate ship, and wheel become compatible only with non-overlap, a forbidden pirate timing band, balanced wheel loading, and protected shutdown capacity.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Carousel Drive House | automatic**

**Trigger:** mission_13_arrival.

**World state:** Three start requests hang under one 55 kW plate.

**Panel/HUD text:** `STOP 49 READY`

**Dialogue bubbles -** Tunde Idowu: “A second constraint decides which one the park can live with.”

**Unlocks:** Stop 49.

**Waypoint:** Activate Pirate Ship console.

**Beat 2 - After Stop 49 | automatic**

**Trigger:** accepted_stop_49.

**World state:** At `joint-setting-board`, the dated accepted-result slip for Stop 49 reads: "Submit numerical pair (5.0 m, 4.0 m/s).". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 50 READY`

**Dialogue bubbles -** Tunde Idowu: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 50.

**Waypoint:** Activate Ferris Wheel machine room.

**Beat 3 - After Stop 50 | automatic**

**Trigger:** accepted_stop_50.

**World state:** At `machine-room-board`, the dated accepted-result slip for Stop 50 reads: "Order mass distribution → rotational inertia → angular momentum/energy → brake demand.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 51 READY`

**Dialogue bubbles -** Tunde Idowu: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 51.

**Beat 4 - After Stop 51 | automatic**

**Trigger:** accepted_stop_51.

**World state:** At `wheel-case-stand`, the dated accepted-result slip for Stop 51 reads: "Allocation: run Carousel and Pirate Ship; reserve Ferris Wheel for next block; protect shutdown reserve.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 52 READY`

**Dialogue bubbles -** Tunde Idowu: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 52.

**Beat 5 - At mission end | automatic**

**Trigger:** accepted_stop_52.

**World state:** At `motor-plate`, Maya Hart pins the joint operating schedule beneath the motor plate. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 13 COMPLETE`

**Dialogue bubbles -** Maya Hart: "The reserve belongs to the stop before it belongs to a start. But Nair's new crown tape gives a different radius; the coaster's final margin must face the track itself."

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m13

**Home:** `motor-plate`. **Before:** The dated mission-13 evidence holder at this fixture has no accepted record. Three start requests hang under one 55 kW plate.
**After — exact action:** Maya Hart pins the joint operating schedule beneath the motor plate.
**Trigger:** accepted_stop_52. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `crown-tape`, the crown tape lies across a drawing whose curve no longer matches.
**Segue - exact player copy:** But Nair's new crown tape gives a different radius; the coaster's final margin must face the track itself.

## Location plan

**Three locations:** Carousel identifies compatible speed, Pirate Ship supplies timing exclusion, Ferris Wheel supplies rotational and wind loads for final allocation and triggers.

## Characters and dramatic beat

Idowu now treats the drive and machine as one coupled system. Kovač accepts scheduling as a physical control, and Hart refuses to count protected shutdown capacity as ordinary supply.

## Key concepts, explained here

Rotating systems store energy and carry angular momentum. Their stopping demands depend on rotational inertia and speed. A degeneracy disappears when an additional physical constraint is applied. Shared resources can make individually valid settings jointly impossible.

## Stop 49 - Collapse the setting degeneracy

**Format/placement:** DEGENERACY, asked at `joint-setting-board`.

**Metadata:** Concept: 30 - Competing settings; Keystone: circular motion and models; Area: Carousel Drive House; Learning role: COMBINE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Go to the joint setting board, in Carousel Drive House.

**Stop reason - exact player copy:** Several settings fit the motion evidence, but the fixed radius and protected power narrow the choices.

**Question card story setup - exact player copy:** Apply the fixed five-metre radius and protected-power condition to collapse the alternatives.

**Question card story-science connection - exact player copy:** The radius-speed pair identifies an operating setting that satisfies the physical and power constraints together.

**Question card prompt - exact player copy:** Adjust both controls: chair radius `r` from `4.0 m` to `6.0 m` in `0.5 m` steps and chair speed `v` from `3.4 m/s` to `4.6 m/s` in `0.2 m/s` steps. Apply the `18.0-degree` angle locus from `tan theta = v^2/(rg)` with `g = 9.80 m/s^2`, then apply measured radius `r = 5.0 m` and shared-power limit `v <= 4.0 m/s`. Submit one numerical parameter pair `(r in m, v in m/s)`.

**Complete format-specific interaction block:**

```yaml
degeneracy:
  controls:
    - {id: radius, label: "Chair radius", min: 4.0, max: 6.0, step: 0.5, unit: m}
    - {id: speed, label: "Chair speed", min: 3.4, max: 4.6, step: 0.2, unit: m/s}
  required_submission: {type: numerical_parameter_pair, order: [radius, speed], units: [m, m/s]}
  tolerance: 0.1
  first_locus: {label: "18-degree chair angle", points: [[4.0,3.57],[4.5,3.79],[5.0,3.99],[5.5,4.19],[6.0,4.37]]}
  second_locus: {label: "Measured radius and shared-power limit", points: [[5.0,3.8],[5.0,4.0],[5.0,4.2]]}
  physical_constraint: "r = 5.0 m measured; v <= 4.0 m/s during joint schedule"
  truth_pair: {radius: 5.0, speed: 4.0}
```

**Correct result:** Submit numerical pair (5.0 m, 4.0 m/s).

**Answer text:** The physical ride and shared-power rule select a 5.0 m radius and 4.0 m/s speed.

**Why:** The angle relation alone admits many pairs; measured geometry and available power add independent constraints.

**Wrong-path feedback:** A point on the first curve is not unique until the physical constraints are applied.

**State/output:** Lock Carousel joint-setting card.

## Stop 50 - Derive rotational stop demand

**Format/placement:** DERIVE, asked at `machine-room-board`.

**Metadata:** Concept: 24 - Rotational energy and momentum; Keystone: rotation; Area: Ferris Wheel machine room; Learning role: RETRIEVE; Difficulty: L3; Story role: obstacle.

**Call - exact player copy:** Go to the machine-room board, in Ferris Wheel machine room.

**Stop reason - exact player copy:** The balanced wheel load has moved outward, so the old braking demand needs revisiting.

**Question card story setup - exact player copy:** The wheel's balanced test load increases rotational inertia without changing its operating angular speed. Derive how angular momentum, stored energy, and required stopping work scale with that outward mass distribution.

**Question card story-science connection - exact player copy:** Increased rotational inertia changes angular momentum and stopping work even at the same angular speed.

**Fixture source panel - exact player copy:** The wheel's balanced test load increases rotational inertia without changing its operating angular speed. Derive how angular momentum, stored energy, and required stopping work scale with that outward mass distribution. Using I = sum mr^2, L = Iomega, K_rot = 0.5Iomega^2, and tau_brake Delta theta = K_rot

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit one ordered symbolic derivation and one conclusion stating how moving mass outward changes stopping demand at fixed `omega`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The wheel's balanced test load increases rotational inertia without changing its operating angular speed.", "Using `I = sum mr^2`, `L = Iomega`, `K_rot = 0.5Iomega^2`, and `tau_brake Delta theta = K_rot`"]
  lines:
    - {id: inertia, expression: "I = sum m r^2", rule: "rotational inertia of distributed masses"}
    - {id: momentum, expression: "L = I omega", rule: "angular momentum for fixed-axis rotation"}
    - {id: energy, expression: "Krot = 0.5 I omega^2", rule: "rotational kinetic energy"}
    - {id: work, expression: "tau_brake delta_theta = Krot", rule: "brake work removes rotational energy"}
  order: [inertia,momentum,energy,work]
  decoys:
    - {expression: "I = sum mr", rule: "omit the squared radius in rotational inertia"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `I=Σmr`
2. `L=I/ω`
3. `K_rot=Iω², omitting one-half`
4. `τ_brake/Δθ=K_rot`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The wheel's balanced test load increases rotational inertia without changing its operating angular speed.", "Using `I = sum mr^2`, `L = Iomega`, `K_rot = 0.5Iomega^2`, and `tau_brake Delta theta = K_rot`"]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Derive rotational stop demand in the form and units requested by the prompt"
  left_side: "I"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "I = sum m r^2", correct: true}
        - {text: "I = sum m r", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "L = I omega", correct: true}
        - {text: "L = I/omega", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "Krot = 0.5 I omega^2", correct: true}
        - {text: "Krot = I omega^2", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "tau_brake delta_theta = Krot", correct: true}
        - {text: "tau_brake/delta_theta = Krot", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Order mass distribution → rotational inertia → angular momentum/energy → brake demand.

**Answer text:** Outward mass raises `I`, angular momentum, stored rotational energy, and stopping work at fixed angular speed.

**Why:** Radius enters inertia as `r²`.

**Wrong-path feedback:** Total mass alone does not set rotational inertia; distribution matters.

**State/output:** Add wheel shutdown demand to shared plan.

## Stop 51 - Allocate shared capacity

**Format/placement:** ALLOCATE, asked at `wheel-case-stand`.

**Metadata:** Concept: 35 - Resource coupling; Keystone: energy and systems; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the wheel case stand, in Ferris Wheel machine room.

**Stop reason - exact player copy:** Three rides are ready for scheduling, but they cannot all use the shared supply at once.

**Question card story setup - exact player copy:** The three rides need operating power, monitoring, and a protected emergency reserve. Allocate the 100-point block so the schedule runs two rides at once without losing required emergency shutdown capacity.

**Question card story-science connection - exact player copy:** The capacity allocation selects a workable ride pair while preserving emergency shutdown reserve.

**Question card prompt - exact player copy:** From a `100-point` shared-capacity pool, submit one numerical allocation among Carousel `24`, Pirate Ship `28`, Ferris Wheel `30`, independent monitoring `8`, and protected shutdown reserve `18`; run exactly two rides now, fund monitoring, protect reserve, and identify the deferred ride.

**Complete format-specific interaction block:**

```yaml
allocate:
  pool: 100
  items:
    - {id: carousel, label: "Carousel operating block", cost: 24, required: true}
    - {id: ship, label: "Pirate Ship operating block", cost: 28, required: true}
    - {id: wheel, label: "Ferris Wheel operating block", cost: 30, required: false}
    - {id: monitor, label: "Independent monitoring", cost: 8, required: true}
    - {id: shutdown, label: "Protected shutdown reserve", cost: 18, protected: true, required: true}
  questions: ["Which two rides run together?", "Is monitoring funded?", "Is shutdown reserve protected?"]
  correct_allocation: {carousel: 24, ship: 28, wheel: 0, monitor: 8, shutdown: 18}
```

**Correct result:** Allocation: run Carousel and Pirate Ship; reserve Ferris Wheel for next block; protect shutdown reserve.

**Answer text:** Run Carousel and Pirate Ship with monitoring and protected reserve; schedule the Ferris Wheel in the next block.

**Why:** All three together exceed the pool. Sequential operation preserves the required 18-point shutdown reserve.

**Wrong-path feedback:** Do not spend protected reserve to make an impossible simultaneous schedule appear possible.

**State/output:** Print alternating schedule.

## Stop 52 - Commit the joint rules

**Format/placement:** TRIGGER, asked at `ship-rule-console`.

**Metadata:** Concept: 35 - Coupled thresholds; Keystone: circular, oscillation, rotation; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Go to the joint-rule console, in Pirate Ship console.

**Stop reason - exact player copy:** The joint schedule is funded and needs explicit stop conditions before operation starts.

**Question card story setup - exact player copy:** The joint schedule is funded, but it still needs automatic stop conditions. Commit the carousel speed, pirate timing exclusion, wheel wind limit, and non-overlap rule before the operating scenario appears.

**Question card story-science connection - exact player copy:** The joint rules keep speed, resonance, wind, and overlapping demand within their separate tested limits.

**Question card prompt - exact player copy:** Submit one operating-rule plan containing these numerical settings and actions: stop Carousel at or above `4.20 m/s`; forbid Pirate Ship drive intervals from `5.70 s` through `6.30 s`; stop Ferris Wheel at or above `8.0 m/s` wind; and prevent Ferris Wheel overlap with the two-ride block.

**Complete format-specific interaction block:**

```yaml
trigger:
  decision_rule: "Stop or block operation when any validated boundary is reached."
  scale: {min: 0, max: 10, step: 0.1, unit: mixed_rule_index}
  anchors:
    - {value: 4.20, label: "Carousel stop speed m/s"}
    - {value: 5.70, label: "Pirate forbidden interval lower s"}
    - {value: 6.30, label: "Pirate forbidden interval upper s"}
    - {value: 8.0, label: "Wheel wind stop m/s"}
  objective: "Enforce all four named limits and never overlap wheel with the two-ride block."
  correct_rule: {carousel_speed_at_or_above: 4.20, pirate_drive_interval_forbidden: [5.70,6.30], wheel_wind_at_or_above: 8.0, wheel_overlap: false}
  conclusion: "Enforce all four operating limits and block Ferris Wheel overlap with the two-ride block."
```

**§7 authored-board source - TRIGGER:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 52 - Commit the joint rules"
  format: "TRIGGER"
  source: "Handback 3 canonical interaction block"
  question: "Submit one operating-rule plan containing these numerical settings and actions: stop Carousel at or above `4.20 m/s`; forbid Pirate Ship drive intervals from `5.70 s` through `6.30 s`; stop Ferris Wheel at or above `8.0 m/s` wind; and prevent Ferris Wheel overlap with the two-ride block."
  payload: "```yaml trigger: decision_rule: \"Stop or block operation when any validated boundary is reached.\" scale: {min: 0, max: 10, step: 0.1, unit: mixed_rule_index} anchors: - {value: 4.20, label: \"Carousel stop speed m/s\"} - {value: 5.70, label: \"Pirate forbidden interval lower s\"} - {value: 6.30, label: \"Pirate forbidden interval upper s\"} - {value: 8.0, label: \"Wheel wind stop m/s\"} objective: \"Enforce all four named limits and never overlap wheel with the two-ride block.\" correct_rule: {carousel_speed_at_or_above: 4.20, pirate_drive_interval_forbidden: [5.70,6.30], wheel_wind_at_or_above: 8.0, wheel_overlap: false} conclusion: \"Enforce all four operating limits and block Ferris Wheel overlap with the two-ride block.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - TRIGGER:**

```yaml
trigger:
  rule: "Commit the threshold before the stream appears; act only when a reading enters the action window with enough lead time."
  scale: {label: "carousel speed", min: 3, max: 5, step: 0.05, unit: "m/s"}
  start: 3.4
  anchors:
    - {at: 3.4, means: "routine baseline, not the decision threshold"}
    - {at: 4.3, means: "elevated evidence requiring attention"}
  direction: rising
  updates:
    - {at: "T-48 h", value: 3.8, hoursLeft: 48}
    - {at: "T-24 h", value: 4.0, hoursLeft: 24}
    - {at: "T-12 h", value: 4.2, hoursLeft: 12}
    - {at: "T-6 h", value: 4.5, hoursLeft: 6}
  stages:
    - {id: watch, label: "Increase monitoring", window: {min: 3, max: 4.19}, leadHours: 24}
    - {id: act, label: "Take the protective action", window: {min: 4.2, max: 5}, leadHours: 12}
  question: "Submit one operating-rule plan containing these numerical settings and actions: stop Carousel at or above `4.20 m/s`; forbid Pirate Ship drive intervals from `5.70 s` through `6.30 s`; stop Ferris Wheel at or above `8.0 m/s` wind; and prevent Ferris Wheel overlap with the two-ride block."
```

**Correct result:** Submit joint rule set: Carousel 4.20 m/s; Pirate Ship exclude 5.70-6.30 s; Wheel wind stop 8.0 m/s; no forbidden overlap.

**Answer text:** Enforce the 4.20 m/s carousel stop, forbid pirate drive intervals from 5.70-6.30 s, stop the wheel at 8.0 m/s wind, and prevent forbidden overlap.

**Why:** Each threshold comes from a different physical mechanism and all must hold together.

**Wrong-path feedback:** A joint plan fails if even one binding subsystem limit is omitted.

**State/output:** Set `joint_rotating_plan = verified`.

## Mission outcome

Mission decision: The three rides need one shared work plan. Carousel speed stays below 4.20 m/s. Pirate Ship drive time stays outside 5.70 to 6.30 s. The wheel needs its check, wind below 8.0 m/s, and saved stop power.

**Segue - exact player copy:** But Nair's new crown tape gives a different radius; the coaster's final margin must face the track itself.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Maya Hart pins the joint operating schedule beneath the motor plate. But Nair's new crown tape gives a different radius; the coaster's final margin must face the track itself.

**Header:** MISSION 13 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 11:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Writing and testing the joint schedule consumes reserve.  
**Automatic bar change:** Certificate +4 | Proof 0 | Reserve -8 | Confidence 0  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** All other bars clamp at 100; allocate 12 RP to Reserve. Result: 100 | 100 | 82 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains angular momentum?

**Options - exact player copy:**

- A. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- B. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- C. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.
- D. Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for angular momentum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes rotational kinetic energy. It does not answer the question about angular momentum.
- B: Correct. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- C: This describes degeneracy. It does not answer the question about angular momentum.
- D: This describes protected reserve. It does not answer the question about angular momentum.

### Review question 2


**Prompt - exact player copy:** Which statement best explains rotational kinetic energy?

**Options - exact player copy:**

- A. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- B. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.
- C. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- D. Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for rotational kinetic energy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes angular momentum. It does not answer the question about rotational kinetic energy.
- B: This describes degeneracy. It does not answer the question about rotational kinetic energy.
- C: Correct. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- D: This describes protected reserve. It does not answer the question about rotational kinetic energy.

### Review question 3


**Prompt - exact player copy:** Which statement best explains degeneracy?

**Options - exact player copy:**

- A. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- B. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- C. Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.
- D. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for degeneracy. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes angular momentum. It does not answer the question about degeneracy.
- B: This describes rotational kinetic energy. It does not answer the question about degeneracy.
- C: This describes protected reserve. It does not answer the question about degeneracy.
- D: Correct. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

### Review question 4


**Prompt - exact player copy:** Which statement best explains protected reserve?

**Options - exact player copy:**

- A. Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.
- B. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- C. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- D. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for protected reserve. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Protected reserve is capacity kept available for shutdown or recovery rather than ordinary operation.
- B: This describes angular momentum. It does not answer the question about protected reserve.
- C: This describes rotational kinetic energy. It does not answer the question about protected reserve.
- D: This describes degeneracy. It does not answer the question about protected reserve.

### Review question 5


**Prompt - exact player copy:** Which statement best explains competing settings?

**Options - exact player copy:**

- A. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- B. The angle relation alone admits many pairs; measured geometry and available power add independent constraints.
- C. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- D. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for competing settings. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes angular momentum. It does not answer the question about competing settings.
- B: Correct. The angle relation alone admits many pairs; measured geometry and available power add independent constraints.
- C: This describes rotational kinetic energy. It does not answer the question about competing settings.
- D: This describes degeneracy. It does not answer the question about competing settings.

### Review question 6


**Prompt - exact player copy:** Which statement best explains rotational energy and momentum?

**Options - exact player copy:**

- A. Angular momentum is rotational quantity equal to rotational inertia times angular velocity for a rigid body about a fixed axis.
- B. Rotational kinetic energy is energy of rotation, equal to one-half rotational inertia times angular speed squared.
- C. Radius enters inertia as r².
- D. Degeneracy is a situation where more than one setting fits limited evidence until another physical constraint is applied.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for rotational energy and momentum. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes angular momentum. It does not answer the question about rotational energy and momentum.
- B: This describes rotational kinetic energy. It does not answer the question about rotational energy and momentum.
- C: Correct. Radius enters inertia as r².
- D: This describes degeneracy. It does not answer the question about rotational energy and momentum.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- `L=Iω` and `Krot=1/2 Iω²` describe rotating motion.
- Mass farther from the axis increases inertia as radius squared.
- Additional physical constraints collapse multiple mathematical solutions.
- **Mission takeaway:** Individually safe machines may require a shared operating rule.

# Mission 14 - The Wrong Radius

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 14 - 2 DAYS UNTIL THE PARK REVIEW.

**Card title:** THE WRONG RADIUS

**Go now:** Go to the Coaster Station and meet Linh Chen, the instrumentation and test lead, at the profile drawing.

**Card body:** 2 days until the park review. The crown tape lies across a drawing whose curve no longer matches. Today you decide whether the real coaster loop has enough margin.

**Objective:** Test the coaster model against the physically measured loop radius.

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
  - id: safety_m14_we01
    title: Minimum speed at a loop top
    problem: An object follows the inside of a vertical loop of radius 2.5 m where g=10 m/s². Find ideal minimum top speed for contact.
    rule: At the minimum, normal force is zero and mg=mv²/r.
    steps:
    - 'Set up the relationship: At the minimum, normal force is zero and mg=mv²/r.'
    - v_min=sqrt(gr)=sqrt(10×2.5)=5 m/s.
    answer: The ideal contact minimum is 5 m/s; any required margin is additional.
    common_mistake: Do not set gravity to zero at the top.
  - id: safety_m14_we02
    title: Doubling speed
    problem: The same object moves first at 2 m/s and then at 4 m/s. Compare kinetic energies.
    rule: At fixed mass, K is proportional to v².
    steps:
    - 'Set up the relationship: At fixed mass, K is proportional to v².'
    - K2/K1=(4/2)²=4.
    answer: Doubling speed quadruples kinetic energy.
    common_mistake: Energy does not merely double with speed.
  - id: safety_m14_we03
    title: Test a frozen prediction
    problem: Before seeing a new measurement, a model predicts 12 units with an allowed error of 1 unit. The new measurement is 15 units. Does it pass this test?
    rule: Absolute prediction error = |observed - predicted|.
    steps:
    - absolute error = |15-12| = 3 units. The prediction remains fixed.
    - comparison = 3 > 1. The error exceeds the prewritten tolerance.
    answer: The model fails this held-out test.
    common_mistake: Refitting to 15 before scoring would no longer test the original prediction.
  - id: safety_m14_we04
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
  - id: safety_m14_we05
    title: A measurement minus a prediction
    problem: A thermometer model predicts 20 °C; an independent thermometer reads 22 °C. Find the residual.
    rule: Residual = observed value - predicted value.
    steps:
    - residual = 22 °C - 20 °C. Keep observed first.
    - residual = +2 °C. The positive sign means the observation is above the prediction.
    answer: The model underpredicts this reading by 2 °C.
    common_mistake: Reversing the subtraction reverses the meaning of the sign.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Holdout data: Holdout data are measurements hidden until a model and prediction are fixed.

Model input: Model input is a measured or assumed quantity used to produce a prediction.

Safety margin: Safety margin is amount by which a measured result exceeds a required boundary.

Falsification: Falsification is evidence showing that a model or assumption fails a stated test.

#### Primer concepts

- Freeze predictions before revealing holdout measurements.
- Recalculate from the physical machine when geometry disagrees with a drawing.
- A correct derivation can produce a wrong decision when its input is wrong.

#### Equations first needed today

No new equation is introduced. This mission combines energy, `ΣFin=mv²/r`, `vmin=√(gr)`, residuals, and uncertainty from earlier missions.

**Crew:** Linh Chen - test lead; Luka Kovač - mechanical lead; Maya Hart - operations lead.

## Main story happening - designer summary

The player freezes the drawing-based model before the crown tape appears. The actual 7.4 m radius raises the minimum-with-margin speed from 8.41 to 9.52 m/s. The independent empty-train measurement is 9.40 m/s, so the fictional 1.0 m/s margin fails despite contact still being possible. Twist 3 lands and the coaster remains closed.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Coaster Station | automatic**

**Trigger:** mission_14_arrival.

**World state:** The crown tape lies across a drawing whose curve no longer matches.

**Panel/HUD text:** `STOP 53 READY`

**Dialogue bubbles -** Linh Chen: “Write the prediction before you see the geometry we held back.”

**Unlocks:** Stop 53.

**Beat 2 - After Stop 53 | automatic**

**Trigger:** accepted_stop_53.

**World state:** At `profile-drawing`, the dated accepted-result slip for Stop 53 reads: "Commit requirement 8.41 m/s and provisional pass before radius unlock; reveal 7.4 m.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `7.4 m`

**Dialogue bubbles -** Linh Chen: “Nice work. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 54.

**Waypoint:** Activate Drop Tower Control.

**Beat 3 - On arrival at Drop Tower Control | automatic**

**Trigger:** accepted_stop_54.

**World state:** At `crown-tape`, the dated accepted-result slip for Stop 54 reads: "Real contact minimum 8.52 m/s; margin requirement 9.52 m/s; measured 9.40 m/s; fail by 0.12 m/s.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 55 READY`

**Dialogue bubbles -** Linh Chen: “Good thinking. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 55.

**Waypoint:** Activate Flume Pumphouse.

**Beat 4 - On arrival at Flume Pumphouse | automatic**

**Trigger:** accepted_stop_55.

**World state:** At `witness-sheet`, the dated accepted-result slip for Stop 55 reads: "Select Coaster: constant geometry residual +1.8 m; Tower and Flume unpatterned.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 56 READY`

**Dialogue bubbles -** Linh Chen: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 56.

**Beat 5 - After Stop 56 | automatic**

**Trigger:** accepted_stop_56.

**World state:** At `crown-tape`, Priya Nair hangs a CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED tag on the coaster release. The dated prop remains here on later visits.

**Panel/HUD text:** `MISSION 14 COMPLETE`

**Dialogue bubbles -** Priya Nair: "The calculation survived. The old drawing did not. Therefore Hart must sign tomorrow's opening with one ride dark; a full park is not worth a false certificate."

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m14

**Home:** `crown-tape`. **Before:** The dated mission-14 evidence holder at this fixture has no accepted record. The crown tape lies across a drawing whose curve no longer matches.
**After — exact action:** Priya Nair hangs a CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED tag on the coaster release.
**Trigger:** accepted_stop_56. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `certificate-table`, families wait beyond a gate with seven unsigned ride rows.
**Segue - exact player copy:** Therefore Hart must sign tomorrow's opening with one ride dark; a full park is not worth a false certificate.

## Location plan

**Three locations:** Coaster holdout and recalculation; Drop Tower and Flume provide independent examples where measured geometry supports the model rather than copied drawings.

## Characters and dramatic beat

Chen enforces the holdout. Kovač accepts closure because the evidence distinguishes a model-input failure from a brake or power failure. Hart protects the validity of the full certificate by refusing one ride.

## Key concepts, explained here

Holdout testing prevents a model from being adjusted to whatever data appear. The actual radius changes the inward acceleration requirement. The train may remain in contact while still failing the park's additional speed margin.

## Stop 53 - Freeze the old prediction

**Format/placement:** HOLDOUT, asked at `profile-drawing`.

**Metadata:** Concept: 30 - Model validation; Keystone: evidence and models; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the coaster profile drawing, in Coaster Station.

**Stop reason - exact player copy:** The drawing-based coaster model is complete and must be frozen before the hidden measurement is revealed.

**Question card story setup - exact player copy:** Fit the drawing-based model to the visible lift height, crown height, losses, and 5.6 m radius. Freeze its required speed and provisional verdict before Chen uncovers the hidden holdout measurement.

**Question card story-science connection - exact player copy:** A precommitted speed requirement makes the later geometry measurement a genuine test of the model.

**Question card prompt - exact player copy:** CALCULATE AND COMMIT: Given lift height `26 m`, crown height `20 m`, drawing radius `5.6 m`, measured crown speed `9.40 m/s`, `g = 9.80 m/s^2`, and required margin `1.00 m/s`, use `v_min = sqrt(gr)` and submit contact minimum, required speed, and provisional pass/fail conclusion in `m/s`; the physical-radius measurement stays locked until you commit. REVEAL: Unlock and record the physical crown radius in `m`. INTERPRET: Submit one conclusion stating whether the frozen drawing-based verdict must be retested.

**Complete format-specific interaction block:**

```yaml
holdout:
  training:
    inputs: {lift_height_m: 26, crown_height_m: 20, drawing_radius_m: 5.6, measured_crown_speed_mps: 9.40}
    required_margin_mps: 1.0
  frozen_prediction: {contact_min_mps: 7.41, required_with_margin_mps: 8.41, verdict: pass}
  holdout: {label: "Physical crown radius", hidden_until_freeze: true, value: 7.4, unit: m}
  correct_conclusion: "Drawing-based verdict must be retested with physical radius."
```

**§7 authored-board source - HOLDOUT:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 53 - Freeze the old prediction"
  format: "HOLDOUT"
  source: "Handback 5 canonical interaction block"
  question: "CALCULATE AND COMMIT: Given lift height `26 m`, crown height `20 m`, drawing radius `5.6 m`, measured crown speed `9.40 m/s`, `g = 9.80 m/s^2`, and required margin `1.00 m/s`, use `v_min = sqrt(gr)` and submit contact minimum, required speed, and provisional pass/fail conclusion in `m/s`; the physical-radius measurement stays locked until you commit. REVEAL: Unlock and record the physical crown radius in `m`. INTERPRET: Submit one conclusion stating whether the frozen drawing-based verdict must be retested."
  payload: "```yaml holdout: training: inputs: {lift_height_m: 26, crown_height_m: 20, drawing_radius_m: 5.6, measured_crown_speed_mps: 9.40} required_margin_mps: 1.0 frozen_prediction: {contact_min_mps: 7.41, required_with_margin_mps: 8.41, verdict: pass} holdout: {label: \"Physical crown radius\", hidden_until_freeze: true, value: 7.4, unit: m} correct_conclusion: \"Drawing-based verdict must be retested with physical radius.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - HOLDOUT:**

**Handback 5 canonical interaction block - HOLDOUT:**

```yaml
holdout:
  axis: {label: "allowed crown-speed prediction error", min: 0, max: 2, step: 0.5, unit: "m/s"}
  fit: [{at: 0, value: 0.60}, {at: 0.5, value: 0.98}, {at: 1.0, value: 0.83}, {at: 1.5, value: 0.87}, {at: 2.0, value: 0.84}]
  test: [{at: 0, value: 0.34}, {at: 0.5, value: 0.46}, {at: 1.0, value: 0.76}, {at: 1.5, value: 0.86}, {at: 2.0, value: 0.85}]
  passScore: 0.80
  overfitAt: 0.5
  correctAt: 1.5
  fittedPrediction: {drawingRadius: 5.6, requiredSpeed: 8.41, unit: "m/s"}
  heldOutMeasurement: {physicalRadius: 7.4, recalculatedRequirement: 9.52, unit: "m/s"}
  correctConclusion: "The drawing-based verdict fails the physical-radius holdout and must be retested."
```

**Correct result:** Commit requirement 8.41 m/s and provisional pass before radius unlock; reveal 7.4 m.

**Answer text:** Freeze a drawing-based requirement of 8.41 m/s and a provisional pass before revealing the physical radius.

**Why:** The model uses `√(gr)+1.0 m/s`; its result is conditional on `r=5.6 m`.

**Wrong-path feedback:** Do not view or tune to the holdout before committing the model.

**State/output:** Reveal `crown-tape: 7.4 m`.

## Stop 54 - Recompute for the real loop

**Format/placement:** DERIVE, asked at `crown-tape`.

**Metadata:** Concept: 12 - Circular dynamics plus margin; Keystone: force, energy, models; Area: Carousel Drive House; Learning role: RETRIEVE; Difficulty: L4; Story role: reveal.

**Call - exact player copy:** Go to the crown measuring tape, in Coaster Station.

**Stop reason - exact player copy:** The measured crown radius differs from the drawing, so the old contact requirement no longer applies.

**Question card story setup - exact player copy:** The physical crown radius is 7.4 m, not 5.6 m. Rebuild the contact minimum and add Corbin Park's fictional 1.0 m/s safety margin before comparing the new independent measured speed.

**Question card story-science connection - exact player copy:** The revised speed margin determines whether the independently measured train speed is sufficient for the real loop.

**Fixture source panel - exact player copy:** The physical crown radius is r=7.4 m; the drawing had shown 5.6 m. Using g=9.80 m/s², rebuild v_min=sqrt(gr), then add Corbin Park's fictional 1.00 m/s margin to obtain v_required. Compare it with the independent measured crown speed of 9.40 m/s.

**Source-panel timing:** Show at this stop’s declared fixture before its DERIVE choices unlock. Keep visible while the player works. These are model inputs and prior observations, not new measurements or an accepted answer. Symbolic derivations stay symbolic; do not invent a number merely to force substitution.

**Question card prompt - exact player copy:** Submit an ordered derivation, both required speeds in `m/s`, a pass/fail conclusion, and the signed margin difference in `m/s`.

**Complete format-specific interaction block:**

```yaml
derive:
  givens: ["The physical crown radius is 7.4 m, not 5.6 m. Rebuild the contact minimum and add Corbin Park's fictional 1.0 m/s safety margin before comparing the new independent measured speed.", "Given physical radius `r = 7.4 m`, `g = 9.80 m/s^2`, required margin `1.00 m/s`, and measured crown speed `9.40 m/s`, use `v_min = sqrt(gr)` and `v_required = v_min + margin`."]
  lines:
    - {id: contact, expression: "v_min = sqrt(gr)", rule: "loop contact limit"}
    - {id: number, expression: "v_min = sqrt(9.80*7.4) = 8.52 m/s", rule: "use physical radius"}
    - {id: margin, expression: "v_required = 8.52 + 1.00 = 9.52 m/s", rule: "Corbin Park fictional margin"}
    - {id: verdict, expression: "9.40 < 9.52, so margin fails by 0.12 m/s", rule: "compare independent speed"}
  order: [contact,number,margin,verdict]
  decoys:
    - {expression: "v_min = sqrt(9.80*5.6) = 7.41 m/s", rule: "reuse the drawing radius after the physical radius is revealed"}
```

**DERIVE per-step choice rule:** Present each authored correct line as a two-choice step, paired with the common-mistake alternative below. Show exactly these two choices for that step, randomize their left/right order, and advance only after the player selects the correct one.

**Common-mistake alternatives, in authored step order:**
1. `v_min=sqrt(g/r)`
2. `v_min=sqrt(9.80×5.6)=7.41 m/s, reusing the drawing radius`
3. `v_required=8.52−1.00=7.52 m/s`
4. `9.40>7.52, so the real margin passes`

**§7 build completion - DERIVE (two-option override):** Each step has exactly two choices, as explicitly required by the campaign owner.

```yaml
derive:
  givens: ["The physical crown radius is 7.4 m, not 5.6 m. Rebuild the contact minimum and add Corbin Park's fictional 1.0 m/s safety margin before comparing the new independent measured speed.", "Given physical radius `r = 7.4 m`, `g = 9.80 m/s^2`, required margin `1.00 m/s`, and measured crown speed `9.40 m/s`, use `v_min = sqrt(gr)` and `v_required = v_min + margin`."]
  start: "Begin with the complete starting relation on the card. Preserve its named left side on every line."
  goal: "Recompute for the real loop in the form and units requested by the prompt"
  left_side: "v_min"
  steps:
    - id: step_1
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v_min = sqrt(gr)", correct: true}
        - {text: "v_min=sqrt(g/r)", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_2
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v_min = sqrt(9.80*7.4) = 8.52 m/s", correct: true}
        - {text: "v_min = sqrt(9.80*5.6) = 7.41 m/s", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_3
      doing: "select the next licensed transformation"
      candidates:
        - {text: "v_required = 8.52 + 1.00 = 9.52 m/s", correct: true}
        - {text: "v_required=8.52−1.00=7.52 m/s", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
    - id: step_4
      doing: "select the next licensed transformation"
      candidates:
        - {text: "9.40 < 9.52, so margin fails by 0.12 m/s", correct: true}
        - {text: "9.40>7.52, so the real margin passes", correct: false, survives: true, reason: "This is the common mistake for this step: it changes a sign, operation, unit, dependency, or governing rule used by the authored correct line."}
```

**Correct result:** Real contact minimum 8.52 m/s; margin requirement 9.52 m/s; measured 9.40 m/s; fail by 0.12 m/s.

**Answer text:** The real loop requires 9.52 m/s with margin; the 9.40 m/s measurement fails by 0.12 m/s.

**Why:** The train may retain contact above 8.52 m/s but does not meet the separate required margin.

**Wrong-path feedback:** Do not confuse minimum contact with the campaign's additional margin.

**State/output:** Set `coaster_margin = fail`.

## Stop 55 - Compare residual fields

**Format/placement:** RESIDUAL, asked at `witness-sheet`.

**Metadata:** Concept: 30 - Model-input diagnosis; Keystone: evidence; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L4; Story role: clue.

**Call - exact player copy:** Go to the geometry witness sheet, in Drop Tower Control.

**Stop reason - exact player copy:** The coaster's geometry changed the verdict, prompting a comparison with the tower and flume surveys.

**Question card story setup - exact player copy:** Compare residuals for the coaster's copied radius, the tower's measured release height, and the flume's measured depth. Identify which complete residual field shows a systematic geometry mismatch rather than random noise.

**Question card story-science connection - exact player copy:** Residual patterns distinguish a copied dimension from ordinary measurement scatter in the other rides.

**Question card prompt - exact player copy:** Compare the displayed coaster residuals in `m`, tower residuals in `m`, and flume residuals in `m`. Submit one field selection and one conclusion naming the constant-bias pattern and the assumption it invalidates. Use ordered observation coordinates 1–5 on the residual axis.

**Complete format-specific interaction block:**

```yaml
residual:
  fields:
    - {id: coaster, label: "Coaster drawing minus tape", values: [-1.8,-1.8,-1.8,-1.8], rms: 1.8, pattern: constant_bias}
    - {id: tower, label: "Tower mark minus laser", values: [0.02,-0.01,0.01,-0.02], rms: 0.016, pattern: none}
    - {id: flume, label: "Header depth minus staff gauge", values: [0.01,0.00,-0.02,0.01], rms: 0.012, pattern: none}
  correct: coaster
  conclusion: "The coaster field alone shows a constant 1.8 m geometry bias, invalidating the copied drawing radius."
```

**§7 authored-board source - RESIDUAL:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 55 - Compare residual fields"
  format: "RESIDUAL"
  source: "Handback 3 canonical interaction block"
  question: "Compare the displayed coaster residuals in `m`, tower residuals in `m`, and flume residuals in `m`. Submit one field selection and one conclusion naming the constant-bias pattern and the assumption it invalidates."
  payload: "```yaml residual: fields: - {id: coaster, label: \"Coaster drawing minus tape\", values: [-1.8,-1.8,-1.8,-1.8], rms: 1.8, pattern: constant_bias} - {id: tower, label: \"Tower mark minus laser\", values: [0.02,-0.01,0.01,-0.02], rms: 0.016, pattern: none} - {id: flume, label: \"Header depth minus staff gauge\", values: [0.01,0.00,-0.02,0.01], rms: 0.012, pattern: none} correct: coaster conclusion: \"The coaster field alone shows a constant 1.8 m geometry bias, invalidating the copied drawing radius.\" ```"
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
  correctConclusion: "Select Coaster: constant geometry residual +1.8 m; Tower and Flume unpatterned."
```

**Correct result:** Select Coaster: constant geometry residual +1.8 m; Tower and Flume unpatterned.

**Answer text:** The coaster alone shows a constant 1.8 m geometry bias.

**Why:** Tower and flume measurements agree with their physical geometry, so gravity and the shared equations are not the failing element.

**Wrong-path feedback:** (tower) Tower residuals alternate only at small, unpatterned measurement-noise scale. (flume) Flume residuals also remain small and unpatterned; neither comparison shows the Coaster's constant 1.8 m bias.

**State/output:** Set `failure_scope = coaster_geometry`.

## Stop 56 - Diagnose the failed certificate

**Format/placement:** DIAGNOSIS, asked at `flume-case-stand`.

**Metadata:** Concept: 35 - Whole-case diagnosis; Keystone: models; Area: Brennan's workshop; Learning role: DECIDE; Difficulty: L5; Story role: twist.

**Call - exact player copy:** Go to the flume case stand, in Flume Pumphouse.

**Stop reason - exact player copy:** The new radius and speed comparison must now be reconciled with the earlier certificate.

**Question card story setup - exact player copy:** Name the single failure that fits every displayed reading.

**Question card story-science connection - exact player copy:** The diagnosis identifies why the coaster's old approval fails and whether it must remain closed.

**Question card prompt - exact player copy:** Submit one causal conclusion that explains drawing radius `5.6 m`, physical radius `7.4 m`, measured speed `9.40 m/s`, required speed `9.52 m/s`, quiet lift power, and quiet brake self-test together.

**Complete format-specific interaction block:**

```yaml
headline: "COASTER CROWN MARGIN FAILURE"
readings:
  - {zone: geometry, label: "Drawing / physical radius", value: "5.6 m / 7.4 m", state: alarm}
  - {zone: speed, label: "Measured / required with margin", value: "9.40 / 9.52 m/s", state: alarm}
  - {zone: lift, label: "Empty-run lift power", value: "within plate", state: quiet}
  - {zone: brakes, label: "Brake self-test", value: "normal", state: quiet}
  - {zone: comparisons, label: "Tower and flume geometry", value: "independently verified", state: quiet}
choices:
  - {id: gravity, label: "Gravity equation failed", mechanism: "Other systems contradict it."}
  - {id: brake, label: "Brake failure", mechanism: "Does not explain radius mismatch."}
  - {id: geometry, label: "Copied loop geometry invalidated the margin", mechanism: "Fits every reading."}
  - {id: power, label: "Lift motor underpowered", mechanism: "Empty run fits plate and does not create tape mismatch."}
answer: geometry
```

**Correct result:** Choice 3 - copied loop geometry; Coaster remains closed.

**Answer text:** Copied loop geometry invalidated the drawing-based margin; the coaster remains closed.

**Why:** The equations correctly respond to the real radius. The old certificate modeled a different geometry.

**Wrong-path feedback:** (gravity) Independently verified Tower and Flume geometry contradict a gravity-model failure. (brake) A brake fault cannot create the measured 1.8 m radius mismatch. (power) The empty run fits the motor plate, and lift power cannot explain the tape-versus-drawing discrepancy.

**State/output:** Set `ride_status.coaster = closed_geometry`; trigger Twist 3.

## Mission outcome

Mission decision: The coaster does not have enough loop margin. Its measured speed is 9.40 m/s, but the real loop needs 9.52 m/s. The math was right for the old plan. The plan used the wrong track shape, so the coaster stays shut.

**Segue - exact player copy:** Therefore Hart must sign tomorrow's opening with one ride dark; a full park is not worth a false certificate.
### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** Your checks made the difference. Priya Nair hangs a CLOSED: 9.40 M/S AVAILABLE / 9.52 M/S REQUIRED tag on the coaster release. Therefore Hart must sign tomorrow's opening with one ride dark; a full park is not worth a false certificate.

**Header:** MISSION 14 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 11:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** The coaster's provisional pass is withdrawn, but the correct closure strengthens the certificate.  
**Automatic bar change:** Certificate 0 | Proof 0 | Reserve -6 | Confidence 0  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`; minimum 4, maximum 12.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Allocate 12 RP to Reserve. Result: 100 | 100 | 88 | 100.

## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


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
- B. It makes the test observations part of the training data retroactively.
- C. It removes all uncertainty from the observations.
- D. It tests prediction on data that did not set the model.

**Correct answer:** D

**Hint - exact player copy:** Ask whether the model could have been tuned to these test values.

**Option feedback - exact player copy:**

- A: Agreement at these inputs cannot establish universal correctness.
- B: The prediction was fixed without using these observations.
- C: Withholding data does not eliminate measurement uncertainty.
- D: Correct. It tests prediction on data that did not set the model.

### Review question 2


**Prompt - exact player copy:** Which statement best explains model input?

**Options - exact player copy:**

- A. Model input is a measured or assumed quantity used to produce a prediction.
- B. Holdout data are measurements hidden until a model and prediction are fixed.
- C. Safety margin is amount by which a measured result exceeds a required boundary.
- D. Falsification is evidence showing that a model or assumption fails a stated test.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for model input. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Model input is a measured or assumed quantity used to produce a prediction.
- B: This describes holdout data. It does not answer the question about model input.
- C: This describes safety margin. It does not answer the question about model input.
- D: This describes falsification. It does not answer the question about model input.

### Review question 3


**Prompt - exact player copy:** Which statement best explains safety margin?

**Options - exact player copy:**

- A. Holdout data are measurements hidden until a model and prediction are fixed.
- B. Safety margin is amount by which a measured result exceeds a required boundary.
- C. Model input is a measured or assumed quantity used to produce a prediction.
- D. Falsification is evidence showing that a model or assumption fails a stated test.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for safety margin. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes holdout data. It does not answer the question about safety margin.
- B: Correct. Safety margin is amount by which a measured result exceeds a required boundary.
- C: This describes model input. It does not answer the question about safety margin.
- D: This describes falsification. It does not answer the question about safety margin.

### Review question 4


**Prompt - exact player copy:** Which statement best explains falsification?

**Options - exact player copy:**

- A. Holdout data are measurements hidden until a model and prediction are fixed.
- B. Model input is a measured or assumed quantity used to produce a prediction.
- C. Falsification is evidence showing that a model or assumption fails a stated test.
- D. Safety margin is amount by which a measured result exceeds a required boundary.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for falsification. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes holdout data. It does not answer the question about falsification.
- B: This describes model input. It does not answer the question about falsification.
- C: Correct. Falsification is evidence showing that a model or assumption fails a stated test.
- D: This describes safety margin. It does not answer the question about falsification.

### Review question 5


**Prompt - exact player copy:** A model requires speed v=√(gr)+1.0 m/s at a loop crown. A calculation uses r=5.6 m, but the actual radius has not been measured. What limits the conclusion?

**Options - exact player copy:**

- A. Holdout data are measurements hidden until a model and prediction are fixed.
- B. Model input is a measured or assumed quantity used to produce a prediction.
- C. Safety margin is amount by which a measured result exceeds a required boundary.
- D. The calculated requirement is conditional on the assumed radius; the physical geometry must be checked before applying it.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for model validation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes holdout data. It does not answer the question about model validation.
- B: This describes model input. It does not answer the question about model validation.
- C: This describes safety margin. It does not answer the question about model validation.
- D: Correct. The calculated requirement is conditional on the assumed radius; the physical geometry must be checked before applying it.

### Review question 6


**Prompt - exact player copy:** A loop's minimum contact speed is 8.52 m/s. A separate rule requires 1.00 m/s above that value. A train reaches 9.40 m/s. Does it meet both requirements?

**Options - exact player copy:**

- A. It exceeds the contact minimum but falls below the separate 9.52 m/s operating requirement.
- B. Holdout data are measurements hidden until a model and prediction are fixed.
- C. Model input is a measured or assumed quantity used to produce a prediction.
- D. Safety margin is amount by which a measured result exceeds a required boundary.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for circular dynamics plus margin. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. It exceeds the contact minimum but falls below the separate 9.52 m/s operating requirement.
- B: This describes holdout data. It does not answer the question about circular dynamics plus margin.
- C: This describes model input. It does not answer the question about circular dynamics plus margin.
- D: This describes safety margin. It does not answer the question about circular dynamics plus margin.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Freeze a model before revealing holdout data.
- Model inputs must describe the physical system.
- Contact minimum and required safety margin are different thresholds.
- **Mission takeaway:** Correct equations cannot rescue incorrect measured or assumed inputs.

# Mission 15 - The Name on the Certificate

**MISSION BRIEFING CARD - EXACT PLAYER COPY**

**Header:** MISSION 15 - 1 DAY UNTIL THE PARK REVIEW.

**Card title:** THE NAME ON THE CERTIFICATE

**Go now:** Go to the Reopening Board and meet Maya Hart, the park operations lead, beside the seven blank ride decisions.

**Card body:** 1 day until the park review. Families wait beyond a gate with seven unsigned ride rows. Today you decide which rides can reopen and which must stay shut.

**Objective:** Sign seven defensible ride decisions and the shared operating plan.

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
  - id: safety_m15_we01
    title: A support-force ratio
    problem: An object weighs 20 N while its support force is 60 N. Find the load factor.
    rule: Load factor=support force/ordinary weight.
    steps:
    - 'Set up the relationship: Load factor=support force/ordinary weight.'
    - load factor=60/20=3.
    answer: The support force is three times the object's ordinary weight.
    common_mistake: This ratio does not mean gravity itself became three times stronger.
  - id: safety_m15_we02
    title: Stopping with friction
    problem: A cart has kinetic energy 20 J. A constant 5 N friction force stops it on a level surface. Find stopping distance.
    rule: 'Friction removes energy: f d=initial kinetic energy.'
    steps:
    - 'Set up the relationship: Friction removes energy: f d=initial kinetic energy.'
    - d=20/5=4 m.
    answer: The stopping distance is 4 m.
    common_mistake: Do not count the normal force as additional work on a horizontal path.
  - id: safety_m15_we03
    title: Test an entire allowed range
    problem: A component must operate at or below 80 °C. Its estimated temperature is 77 ± 4 °C. Does every allowed value pass?
    rule: Test the worst allowed value against the stated bound.
    steps:
    - allowed interval = [77-4, 77+4] = [73,81] °C.
    - maximum allowed temperature = 81 °C > 80 °C. At least one allowed value fails.
    answer: The estimate does not establish that every allowed temperature passes.
    common_mistake: Checking only the central estimate ignores the uncertainty.
  - id: safety_m15_we04
    title: Apply simultaneous conditions
    problem: A sample must have purity ≥95% and temperature ≤30 °C. It has purity 97% and temperature 32 °C. Does it pass?
    rule: When both conditions are required, both must be true.
    steps:
    - purity test = 97 ≥ 95, true.
    - temperature test = 32 ≤ 30, false. A passing purity cannot cancel a failed temperature.
    answer: The sample fails the combined specification.
    common_mistake: Averaging a pass and a fail is not a logical AND.
  - id: safety_m15_we05
    title: Protect a required reserve
    problem: A lab has 100 energy units. Essential tasks need 30 and 40 units, and reserve must be at least 20. How much remains for an optional task?
    rule: Optional capacity = total - essential use - protected reserve.
    steps:
    - essential use = 30+40 = 70 units.
    - optional capacity = 100-70-20 = 10 units.
    answer: At most 10 units may fund the optional task while preserving the reserve.
    common_mistake: Treating the reserve as freely available breaks the stated requirement.
```
<!-- END OPTIONAL WORKED EXAMPLES -->

### Worth knowing first - exact player copy

#### Glossary terms

Binding condition: Binding condition is a requirement that must pass for a decision to remain valid.

Robust decision: Robust decision is a decision that stays the same across the supported uncertainty range.

Conditional approval: Conditional approval is permission to operate only while named limits and checks remain satisfied.

Closure: Closure is a defensible safety decision when a binding condition fails or remains unverified.

#### Primer concepts

- No new major physics is introduced.
- Retrieve the correct model for each system and apply every binding condition.
- A justified closure completes a certificate rather than representing failure.

#### Equations first needed today

No new equation is introduced. Use the motion, force, energy, momentum, rotation, oscillation, gravitation, and fluid relationships already recorded in the mission log.

**Crew:** Maya Hart - operations lead; Linh Chen - test lead; Luka Kovač - mechanical lead; Tunde Idowu - controls engineer; Ruth Brennan - former chief engineer.

## Main story happening - designer summary

The player reconciles every major clue, stresses the proposed decisions, allocates the last 100 work points, and attests seven ride outcomes. Three reopen, three reopen with explicit limits, and the coaster remains closed. After the final metric allocation reaches 100/100/100/100, Hart signs the certificate and the park lights show six resolved operating sections plus one deliberate red closure.

## Player-facing beat script - dialogue bubbles and world changes

**Beat 1 - On arrival at Reopening Board | automatic**

**Trigger:** mission_15_arrival.

**World state:** Families wait beyond a gate with seven unsigned ride rows.

**Panel/HUD text:** `STOP 57 READY`

**Dialogue bubbles -** Maya Hart: “A red decision can be right. An unsupported green one cannot.”

**Unlocks:** Stop 57.

**Beat 2 - After Stop 57 | automatic**

**Trigger:** accepted_stop_57.

**World state:** At `reopening-board`, the dated accepted-result slip for Stop 57 reads: "Submit one evidence label for every clue; preserve observations and replace unsupported interpretations.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `CASEBOOK UPDATED`

**Dialogue bubbles -** Maya Hart: “Nice work. This evidence changes what we test next, not more than that.”

**Unlocks:** No new stop; preserve the current mission state.

**Waypoint:** Activate Brennan's Workshop.

**Beat 3 - On arrival at Brennan's Workshop | automatic**

**Trigger:** accepted_stop_58.

**World state:** At `uncertainty-board`, the dated accepted-result slip for Stop 58 reads: "Choice 2 - three open, three conditional, Coaster closed across uncertainty.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 59 READY`

**Dialogue bubbles -** Maya Hart: “Good thinking. Spend the last work only where it can change or secure a decision.”

**Unlocks:** Stop 59.

**Beat 4 - After Stop 59 | automatic**

**Trigger:** accepted_stop_59.

**World state:** At `work-allocation-board`, the dated accepted-result slip for Stop 59 reads: "Submit allocation {arm inspection:30, independent verification:25, operating cards:20, protected reserve:25, other:0}.". The slip remains in that fixture’s evidence holder.

**Panel/HUD text:** `STOP 60 READY`

**Dialogue bubbles -** Maya Hart: “Exactly right. The next check is ready; keep the current evidence visible.”

**Unlocks:** Stop 60.

**Waypoint:** Activate Front Gate.

**Beat 5 - After Stop 60 | automatic**

**Trigger:** accepted_stop_60.

**World state:** At `certificate-table`, Maya Hart turns the front-gate key. The final scene follows the completion gate below.

**Panel/HUD text:** `SIGN CERTIFICATE`

**Dialogue bubbles -** Maya Hart: "You gave this park a future we can sign our names to. Therefore the six cleared sections can run within their cards while the coaster keeps its closure; Hart's signature names both."

**Unlocks:** No new stop; preserve the current mission state.

**Beat 6 - At mission end | automatic**

**World state:** Hart signs beside the player.

**Panel/HUD text:** `CAMPAIGN COMPLETE`

**Dialogue bubbles -** Maya Hart: “We did not prove the park was safe. We proved exactly what can run.”

**Unlocks:** Close the mission and preserve its Casebook evidence.

### Physical aftermath — safety-m15

**Home:** `certificate-table`. **Before:** The dated mission-15 evidence holder at this fixture has no accepted record. Families wait beyond a gate with seven unsigned ride rows.
**After — exact action:** Maya Hart turns the front-gate key.
**Trigger:** accepted_stop_60; final scene requires the completion gate in section 8.1. **Persistence:** retain the changed prop at its home for later inspection; retries do not repeat the action.
**The next problem, physically:** At `certificate-table`, the signed operating conditions remain beside the final status.
**Segue - exact player copy:** Therefore the six cleared sections can run within their cards while the coaster keeps its closure; Hart's signature names both.

## Location plan

**Three locations:** Reopening Board for evidence classification, Workshop for stress and final-work allocation, and Front Gate for attestation and signature.

## Characters and dramatic beat

Each specialist owns one constraint. Chen owns independent evidence, Kovač physical condition, Idowu controls and triggers, Brennan records and procedure, Hart operating authority. The player alone integrates all seven decisions.

## Key concepts, explained here

No new major concept appears. The task is transfer and decision: select the right model, preserve direction and units, distinguish conservation laws, apply uncertainty, and match every conclusion to the system and configuration actually tested.

### Candidate final decisions

- **Carousel - REOPEN:** leveled platform, operation below 4.20 m/s.
- **Bumper Cars - REOPEN:** verified 240 kg configuration and padded 0.22 s stop.
- **Drop Tower - REOPEN:** verified 36.0 m release, named sensor, present brake stack, load factor below 6.0.
- **Pirate Ship - REOPEN WITH LIMITS:** forbid drive intervals from 5.70 through 6.30 s and preserve automatic interruption.
- **Ferris Wheel - REOPEN WITH LIMITS:** independent arm-nine inspection passes; balanced loading; stop at wind of 8.0 m/s or greater.
- **Log Flume - REOPEN WITH LIMITS:** 0.45 m³/s duty; do not overlap its 44.1 kW block with coaster lift demand.
- **Coaster - CLOSED:** measured 9.40 m/s crown speed misses the 9.52 m/s fictional requirement for the real radius.

## Stop 57 - Rebuild the whole case

**Format/placement:** CASEBOOK, asked at Maya Hart beside `reopening-board`.

**Metadata:** Concept: 35 - Evidence reconciliation; Keystone: whole-campaign evidence; Area: Brennan's workshop; Learning role: RETRIEVE; Difficulty: L4; Story role: obstacle.

**Call - exact player copy:** Talk to Maya Hart, at the Reopening Board in Reopening Board.

**Stop reason - exact player copy:** The final certificate is approaching, and early interpretations still sit beside verified observations.

**Question card story setup - exact player copy:** The Casebook still contains true observations beside rejected explanations. Match each major clue to what it now establishes so no early accusation or copied assumption enters the final signed certificate.

**Question card story-science connection - exact player copy:** Matching each clue to its supported claim keeps rejected explanations out of the signed record.

**Question card prompt - exact player copy:** Submit one six-pair casebook mapping from the displayed speed reports, controller, operator card, timing comparison, arm indication, and crown tape to the single final meaning each clue supports.

**Complete format-specific interaction block:**

```yaml
scenarios: ["Three agreeing speed reports", "Sealed controller", "Hart's 14:03 card", "6.15 s versus 5.85 s", "41 mm arm indication", "7.4 m crown tape"]
choices: ["Shared measurement chain", "Could not cause October event", "Interruption occurred", "Near-resonant drive", "Requires independent condition check", "Old coaster geometry invalid"]
mapping: ["Shared measurement chain", "Could not cause October event", "Interruption occurred", "Near-resonant drive", "Requires independent condition check", "Old coaster geometry invalid"]
```

**Correct result:** Submit one evidence label for every clue; preserve observations and replace unsupported interpretations.

**Answer text:** The final case preserves every observation while replacing unsupported interpretations.

**Why:** Fair twists change what evidence supports, not what physically happened.

**Wrong-path feedback:** Ask what the clue directly proves after all later measurements are included.

**State/output:** Set all clue ledger items to final status.

## Stop 58 - Stress all seven decisions

**Format/placement:** STRESS, asked at Linh Chen beside `uncertainty-board`.

**Metadata:** Concept: 35 - Robustness; Keystone: whole-campaign models; Area: Brennan's workshop; Learning role: TRANSFER; Difficulty: L5; Story role: obstacle.

**Call - exact player copy:** Talk to Linh Chen, at the uncertainty board in Brennan's Workshop.

**Stop reason - exact player copy:** The seven ride decisions are drafted and need one final uncertainty test.

**Question card story setup - exact player copy:** Move speed, time, wind, radius, force, flow, and power through their supported uncertainties. Keep only complete ride decisions that remain valid without dropping a required condition or inventing extra margin.

**Question card story-science connection - exact player copy:** The stress test identifies which opening, restriction, and closure decisions survive the supported measurement ranges.

**Question card prompt - exact player copy:** Stress the seven decisions across Carousel speed `3.95-4.05 m/s`, Pirate period `6.10-6.20 s`, Wheel wind `0-8.0 m/s`, coaster radius `7.35-7.45 m`, tower load `5.19-5.56 x weight`, and flume power `43.5-44.8 kW`. Submit one complete-set conclusion.

**Complete format-specific interaction block:**

```yaml
stress:
  assumptions:
    - {id: carousel_speed, min: 3.95, max: 4.05, unit: m/s}
    - {id: pirate_period, min: 6.10, max: 6.20, unit: s}
    - {id: wheel_wind, min: 0, max: 8.0, unit: m/s}
    - {id: coaster_radius, min: 7.35, max: 7.45, unit: m}
    - {id: tower_load, min: 5.19, max: 5.56, unit: "x weight"}
    - {id: flume_power, min: 43.5, max: 44.8, unit: kW}
  candidates:
    - {id: all_open, label: "Open all seven", survives: false}
    - {id: final_set, label: "Three open, three conditional, coaster closed", survives: true}
    - {id: all_closed, label: "Close all seven", survives: false}
  correct: final_set
  conclusion: "Three open, three conditional, and the coaster closed survives every supported uncertainty range."
```

**§7 authored-board source - STRESS:** Convert this stop from its authored interaction block below. Do not substitute a format-level template. The panel must state the goal without printing the keyed answer.

```yaml
authored_board:
  stop: "Stop 58 - Stress all seven decisions"
  format: "STRESS"
  source: "Handback 3 canonical interaction block"
  question: "Stress the seven decisions across Carousel speed `3.95-4.05 m/s`, Pirate period `6.10-6.20 s`, Wheel wind `0-8.0 m/s`, coaster radius `7.35-7.45 m`, tower load `5.19-5.56 x weight`, and flume power `43.5-44.8 kW`. Submit one complete-set conclusion."
  payload: "```yaml stress: assumptions: - {id: carousel_speed, min: 3.95, max: 4.05, unit: m/s} - {id: pirate_period, min: 6.10, max: 6.20, unit: s} - {id: wheel_wind, min: 0, max: 8.0, unit: m/s} - {id: coaster_radius, min: 7.35, max: 7.45, unit: m} - {id: tower_load, min: 5.19, max: 5.56, unit: \"x weight\"} - {id: flume_power, min: 43.5, max: 44.8, unit: kW} candidates: - {id: all_open, label: \"Open all seven\", survives: false} - {id: final_set, label: \"Three open, three conditional, coaster closed\", survives: true} - {id: all_closed, label: \"Close all seven\", survives: false} correct: final_set conclusion: \"Three open, three conditional, and the coaster closed survives every supported uncertainty range.\" ```"
  axis_and_units: "Use only quantities and units named in this question and payload."
  candidates_and_numbers: "Use only candidates and numbers named in this question and payload."
  panel_rule: "Print the goal, never the target or keyed answer."
```

**Handback 3 canonical interaction block - STRESS:**

```yaml
stress:
  assumption: {label: "wheel wind speed", min: 0, max: 8, nominal: 4.0, step: 1, unit: "m/s"}
  criteria:
    - {id: evidence_fit, label: "fit to the stop evidence", direction: maximise}
    - {id: safety_margin, label: "margin at the adverse end", direction: maximise}
  optimiseOn: evidence_fit
  candidates:
    - id: nominal_only
      label: "Use only the nominal reading"
      scores: {evidence_fit: 95, safety_margin: 20}
      validRange: {min: 4.0, max: 4.0}
      failsAt: 8
    - id: common_extreme_mistake
      label: "Use the favorable extreme as if it were guaranteed"
      scores: {evidence_fit: 88, safety_margin: 5}
      validRange: {min: 4.0, max: 8}
      failsAt: 0
    - id: robust_plan
      label: "Choice 2 - three open, three conditional, Coaster closed across uncertainty."
      scores: {evidence_fit: 82, safety_margin: 92}
      validRange: {min: 0, max: 8}
  robust: robust_plan
  question: "Stress the seven decisions across Carousel speed `3.95-4.05 m/s`, Pirate period `6.10-6.20 s`, Wheel wind `0-8.0 m/s`, coaster radius `7.35-7.45 m`, tower load `5.19-5.56 x weight`, and flume power `43.5-44.8 kW`. Submit one complete-set conclusion."
```

**Correct result:** Choice 2 - three open, three conditional, Coaster closed across uncertainty.

**Answer text:** Three open, three conditional, and the coaster closed remains valid across supported uncertainty.

**Why:** The coaster margin remains negative, while the other decisions retain their named limits.

**Wrong-path feedback:** (all_open) Opening all seven ignores the Coaster's failed physical-radius margin. (all_closed) Closing all seven discards six decisions that remain supported across their uncertainty ranges.

**State/output:** Freeze final candidate decision set.

## Stop 59 - Spend the last 100 work points

**Format/placement:** SCIENCETANK, asked at Maya Hart beside `work-allocation-board`.

**Metadata:** Concept: 35 - Value and resource strategy; Keystone: evidence and systems; Area: Brennan's workshop; Learning role: DECIDE; Difficulty: L5; Story role: decision.

**Call - exact player copy:** Talk to Maya Hart, at the final work allocation board in Brennan's Workshop.

**Stop reason - exact player copy:** Only one work block remains before handover, with inspections and independent checks still to fund.

**Question card story setup - exact player copy:** Spend the last work block on inspection, independent verification, operator cards, and protected reserve. Do not fund cosmetic work or another repeated coaster calculation that cannot correct its measured physical geometry.

**Question card story-science connection - exact player copy:** The final allocation completes required safety work without spending scarce capacity on tasks that cannot fix the coaster.

**Question card prompt - exact player copy:** Submit one numerical allocation totaling exactly `100 points` among arm-nine inspection, independent verification, operating cards, protected reserve, repeated coaster math, and paint. Meet minima `25`, `20`, `15`, and `20` points for the first four respectively, and allocate `0` to the last two.

**Complete format-specific interaction block:**

```yaml
proposals:
  - {id: arm, label: "Independent arm-nine inspection", min: 25, evidence: "Binding condition for wheel."}
  - {id: verify, label: "Final independent sensor verification", min: 20, evidence: "Secures proof chain."}
  - {id: cards, label: "Print and install operating-limit cards", min: 15, evidence: "Turns models into action."}
  - {id: reserve, label: "Protected test and shutdown reserve", min: 20, evidence: "Keeps execution recoverable."}
  - {id: coaster_math, label: "Repeat coaster calculation with same radius", min: 0, evidence: "Cannot change measured geometry."}
  - {id: paint, label: "Repaint closed coaster gate", min: 0, evidence: "Cosmetic only."}
recommended: {arm: 30, verify: 25, cards: 20, reserve: 25, coaster_math: 0, paint: 0}
evidence: {required_total: 100, pass_rules: ["arm >= 25","verify >= 20","cards >= 15","reserve >= 20","coaster_math = 0","paint = 0","total = 100"]}
```

**Correct result:** Submit allocation {arm inspection:30, independent verification:25, operating cards:20, protected reserve:25, other:0}.

**Answer text:** Use 30 points for arm inspection, 25 for independent verification, 20 for operating cards, and 25 for protected reserve.

**Why:** Each funded item changes or secures a binding decision. Repeating correct coaster arithmetic cannot repair its geometry.

**Wrong-path feedback:** Spend on evidence or action that can change the certificate.

**State/output:** Arm-nine inspection returns `PASS WITH OPERATING ENVELOPE`; final cards install.

## Stop 60 - Attest the certificate

**Format/placement:** ATTEST, asked at Maya Hart beside `certificate-table`.

**Metadata:** Concept: 35 - Whole-campaign synthesis; Keystone: whole-campaign transfer; Area: Brennan's workshop; Learning role: DECIDE; Difficulty: L5; Story role: final commitment.

**Call - exact player copy:** Talk to Maya Hart, at the certificate table in Front Gate.

**Stop reason - exact player copy:** The remaining work is assigned and every ride's final status is ready for signature.

**Question card story setup - exact player copy:** Read every final ride condition, inspection, threshold, and closure reason. Attest the seven decisions only if each claim matches the tested physical system and no failed safety margin is hidden.

**Question card story-science connection - exact player copy:** The attestation ties each opening, restriction, or closure to the tested configuration and its actual safety margin.

**Question card prompt - exact player copy:** Submit one seven-claim certificate attestation: select exactly one supported final decision for each named ride, including every numerical operating limit, and exclude the unsupported all-open claim.

**Complete format-specific interaction block:**

```yaml
attest:
  verification_limit: 7
  claims:
    - {id: carousel, label: "Carousel reopen below 4.20 m/s", backed: true, critical: true}
    - {id: bumper, label: "Bumper Cars reopen in verified padded configuration", backed: true, critical: true}
    - {id: tower, label: "Drop Tower reopen in verified tested configuration", backed: true, critical: true}
    - {id: ship, label: "Pirate Ship conditional; avoid 5.70-6.30 s", backed: true, critical: true}
    - {id: wheel, label: "Ferris Wheel conditional; inspection, balance, wind below 8.0 m/s", backed: true, critical: true}
    - {id: flume, label: "Flume conditional; 0.45 m3/s and non-overlap power schedule", backed: true, critical: true}
    - {id: coaster, label: "Coaster closed; measured margin fails", backed: true, critical: true}
    - {id: all_open, label: "All seven reopen because calculations are complete", backed: false, critical: true}
  correct: [carousel,bumper,tower,ship,wheel,flume,coaster]
```

**§7 build completion - ATTEST:** This block supplies the panel fields omitted above; the authored prompt, science, and correct result remain authoritative.

```yaml
attest:
  checks: 3
  claims:
    - {id: primary, label: "primary claim for Attest the certificate", critical: true, backed: true, verification: "the signed source reproduces the displayed result"}
    - {id: independent, label: "independent confirmation", critical: true, backed: true, verification: "the independent record agrees within the stated tolerance"}
    - {id: scope, label: "scope and date", critical: false, backed: true, verification: "the record names the population and time window"}
    - {id: extension, label: "stronger untested extension", critical: true, backed: false, verification: "no independent check supports the extension; it must be held"}
  correctAction: "verify primary, independent, and scope; hold extension"
```

**Correct result:** Submit ordered decisions [Carousel open, Bumper open, Tower open, Pirate conditional, Wheel conditional, Flume conditional, Coaster closed].

**Answer text:** Sign three reopenings, three conditional reopenings, and one evidence-based coaster closure.

**Why:** Every approved ride has a verified configuration and operating rule. The coaster's physical measurement fails its required margin.

**Wrong-path feedback:** (all_open) The all-open claim contradicts the measured Coaster radius and failed 0.12 m/s operating margin; certificate completion requires a supported closure for that row.

**State/output:** Set all seven final decisions; stop timer; open final metric screen.

### Post-mission metric screen - exact player copy

**Happy ending card - exact player copy:** The wheel turns above the lit midway. The ship swings within its posted timing rule, and the carousel music starts. Beyond the crowd, the coaster gate stays shut beneath its measured closure card. Corbin Park is open, with every promise on the certificate still visible.

**Header:** MISSION 15 COMPLETE  
**Timer:** `TIME {elapsed} / TARGET 12:00`  
**Accuracy:** `INCORRECT SUBMISSIONS {incorrect_submissions}`  
**Story event:** Final verification and operating-card installation consume the last planned work block.  
**Automatic bar change:** Certificate 0 | Proof 0 | Reserve 0 | Confidence 0  
**Recovery Points:** `11 + {time_modifier} - {incorrect_submissions} = {awarded_rp}`.  
**Allocation prompt:** Spend points on any unlocked bar or save them in the Recovery Bank.  
**Canonical QA example:** Within target, 0 wrong, 12 RP; allocate all 12 to Reserve. Result: 100 | 100 | 100 | 100.  
**Final gate:** Lock all four bars and reveal `SIGN CERTIFICATE`. Otherwise show `CERTIFICATE HOLD - RECOVERY INCOMPLETE`.

## Mission outcome and epilogue - no further quiz

Mission decision: Which rides can reopen and which must stay shut. Apply the existing final evidence and metric gates before the world payoff below.

The wheel turns above the lit midway. The ship swings within its posted timing rule, and the carousel music starts. Beyond the crowd, the coaster gate stays shut beneath its measured closure card. Corbin Park is open, with every promise on the certificate still visible.
## Optional secondary brief and six-question review

**Availability:** Reveal only after mission completion when the player selects **GO DEEPER**. This section is optional, ungraded for campaign progress, and does not change metrics, Recovery Points, or the next-mission unlock.

**Secondary briefing card - exact player copy:** Try six independent practice questions. Each includes its own context and any needed data; no mission records are required.

### Review focus

No additional prerequisite is required. These practice questions review related course ideas. Each question stands alone, including its choices and figure.

### Review question 1


**Prompt - exact player copy:** Which statement best explains binding condition?

**Options - exact player copy:**

- A. Robust decision is a decision that stays the same across the supported uncertainty range.
- B. Binding condition is a requirement that must pass for a decision to remain valid.
- C. Conditional approval is permission to operate only while named limits and checks remain satisfied.
- D. Closure is a defensible safety decision when a binding condition fails or remains unverified.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for binding condition. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes robust decision. It does not answer the question about binding condition.
- B: Correct. Binding condition is a requirement that must pass for a decision to remain valid.
- C: This describes conditional approval. It does not answer the question about binding condition.
- D: This describes closure. It does not answer the question about binding condition.

### Review question 2


**Prompt - exact player copy:** Which statement best explains robust decision?

**Options - exact player copy:**

- A. Binding condition is a requirement that must pass for a decision to remain valid.
- B. Conditional approval is permission to operate only while named limits and checks remain satisfied.
- C. Robust decision is a decision that stays the same across the supported uncertainty range.
- D. Closure is a defensible safety decision when a binding condition fails or remains unverified.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for robust decision. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes binding condition. It does not answer the question about robust decision.
- B: This describes conditional approval. It does not answer the question about robust decision.
- C: Correct. Robust decision is a decision that stays the same across the supported uncertainty range.
- D: This describes closure. It does not answer the question about robust decision.

### Review question 3


**Prompt - exact player copy:** Which statement best explains conditional approval?

**Options - exact player copy:**

- A. Binding condition is a requirement that must pass for a decision to remain valid.
- B. Robust decision is a decision that stays the same across the supported uncertainty range.
- C. Closure is a defensible safety decision when a binding condition fails or remains unverified.
- D. Conditional approval is permission to operate only while named limits and checks remain satisfied.

**Correct answer:** D

**Hint - exact player copy:** Identify the defining relationship or mechanism for conditional approval. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes binding condition. It does not answer the question about conditional approval.
- B: This describes robust decision. It does not answer the question about conditional approval.
- C: This describes closure. It does not answer the question about conditional approval.
- D: Correct. Conditional approval is permission to operate only while named limits and checks remain satisfied.

### Review question 4


**Prompt - exact player copy:** Which statement best explains closure?

**Options - exact player copy:**

- A. Closure is a defensible safety decision when a binding condition fails or remains unverified.
- B. Binding condition is a requirement that must pass for a decision to remain valid.
- C. Robust decision is a decision that stays the same across the supported uncertainty range.
- D. Conditional approval is permission to operate only while named limits and checks remain satisfied.

**Correct answer:** A

**Hint - exact player copy:** Identify the defining relationship or mechanism for closure. All needed information is in this question.

**Option feedback - exact player copy:**

- A: Correct. Closure is a defensible safety decision when a binding condition fails or remains unverified.
- B: This describes binding condition. It does not answer the question about closure.
- C: This describes robust decision. It does not answer the question about closure.
- D: This describes conditional approval. It does not answer the question about closure.

### Review question 5


**Prompt - exact player copy:** A new timestamp shows that an emergency stop preceded a equipment failure rather than followed it. How should the explanation change?

**Options - exact player copy:**

- A. Binding condition is a requirement that must pass for a decision to remain valid.
- B. Revise which causal claims the evidence supports while preserving the recorded events themselves.
- C. Robust decision is a decision that stays the same across the supported uncertainty range.
- D. Conditional approval is permission to operate only while named limits and checks remain satisfied.

**Correct answer:** B

**Hint - exact player copy:** Identify the defining relationship or mechanism for evidence reconciliation. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes binding condition. It does not answer the question about evidence reconciliation.
- B: Correct. Revise which causal claims the evidence supports while preserving the recorded events themselves.
- C: This describes robust decision. It does not answer the question about evidence reconciliation.
- D: This describes conditional approval. It does not answer the question about evidence reconciliation.

### Review question 6


**Prompt - exact player copy:** One design fails its required margin for every plausible measurement value. Two other designs pass all their limits across the same uncertainty analysis. Which decision is supported?

**Options - exact player copy:**

- A. Binding condition is a requirement that must pass for a decision to remain valid.
- B. Robust decision is a decision that stays the same across the supported uncertainty range.
- C. Reject the consistently failing design and retain approval of the two passing designs only within their tested conditions.
- D. Conditional approval is permission to operate only while named limits and checks remain satisfied.

**Correct answer:** C

**Hint - exact player copy:** Identify the defining relationship or mechanism for robustness. All needed information is in this question.

**Option feedback - exact player copy:**

- A: This describes binding condition. It does not answer the question about robustness.
- B: This describes robust decision. It does not answer the question about robustness.
- C: Correct. Reject the consistently failing design and retain approval of the two passing designs only within their tested conditions.
- D: This describes conditional approval. It does not answer the question about robustness.

**Optional review completion - exact player copy:** Good work. You have completed six independent practice questions.

## Quick concept review

- Choose the model that matches the system and interval.
- Use conservation laws only where their conditions hold.
- Independent measurements test assumptions that repeated calculations cannot.
- A safety threshold must name the action taken at equality.
- **Mission takeaway:** Good physics supports both approval and refusal by stating exactly what the evidence proves.

# 9. Mission-at-a-glance production map

### Mission 1

Ferris Wheel only. Read motion, predict a stop, test one brake. Decision: matching records do not prove one common fault.

### Mission 2

Pirate Ship only. Build the force model and static load test. Decision: weak supports do not explain October.

### Mission 3

Carousel only. Derive circular acceleration, correct tilt, commit speed threshold. Decision: 4.00 m/s setting passes below 4.20 m/s trigger.

### Mission 4

Bumper Cars only. Close energy ledger and verify friction stop. Decision: local floor friction explains this overrun.

### Mission 5

Workshop to Drop Tower. Reconstruct procedure and attest limited test. Decision: unmanned tower test authorized.

### Mission 6

Carousel to Workshop. Exclude sealed controller and trace shared speed kit. **Twist 1.**

### Mission 7

Bumper Cars to Workshop. Measure momentum, impulse, and Hart's action. Decision: interruption did not increase tested collision danger.

### Mission 8

Pirate Ship to Bumper Cars. Establish near-resonant drive and reinterpret override. **Twist 2.**

### Mission 9

Ferris Wheel to Workshop. Calculate torque and write restricted envelope. Decision: conditional pending inspection.

### Mission 10

Coaster to Plant Room. Combine energy, circular contact, residuals, and power. Decision: limited empty measurement run.

### Mission 11

Flume to Plant Room to Arcade. Verify pressure, flow, pump power, and projectile speed. Decision: restricted flow and non-overlap schedule.

### Mission 12

Bumper Cars to Drop Tower to Workshop. Connect momentum, acceleration, and rider load. Decision: tested configurations pass.

### Mission 13

Carousel to Pirate Ship to Ferris Wheel. Build joint rotating-rides plan. Decision: shared schedule and triggers.

### Mission 14

Coaster to Drop Tower to Flume. Reveal real radius and diagnose wrong model input. **Twist 3.**

### Mission 15

Reopening Board to Workshop to Front Gate. Reconcile, stress, allocate, attest, and sign seven decisions.

# 10. Stop manifest

| Mission | Stops | Formats |
|---|---|---|
| 1 | 1-4 | SWEEP, BALLPARK, DERIVE, VERIFY |
| 2 | 5-8 | CHOICE, SEQUENCE, BALANCE, DIAGNOSIS |
| 3 | 9-12 | DERIVE, HOLD, CONTROL, TRIGGER |
| 4 | 13-16 | BALLPARK, BALANCE, VERIFY, VALUE |
| 5 | 17-20 | PROTOCOL, DERIVE, SWEEP, ATTEST |
| 6 | 21-24 | CONTROL, ATTEST, TRACE, DIAGNOSIS |
| 7 | 25-28 | BALLPARK, DERIVE, VERIFY, CASEBOOK |
| 8 | 29-32 | SWEEP, DERIVE, CONTROL, DIAGNOSIS |
| 9 | 33-36 | BALANCE, DERIVE, STRESS, TRIGGER |
| 10 | 37-40 | BALLPARK, DERIVE, RESIDUAL, DIAGNOSIS |
| 11 | 41-44 | PROBE, DERIVE, ALLOCATE, LOB |
| 12 | 45-48 | BALLPARK, CHAIN, STRESS, ATTEST |
| 13 | 49-52 | DEGENERACY, DERIVE, ALLOCATE, TRIGGER |
| 14 | 53-56 | HOLDOUT, DERIVE, RESIDUAL, DIAGNOSIS |
| 15 | 57-60 | CASEBOOK, STRESS, SCIENCETANK, ATTEST |

Ten stops use DERIVE. No format exceeds one third of the 60 stops. `STACK`, filler warm-ups, and noncanonical formats are absent.

# 11. Narrative implementation notes

## Environmental state changes

- M1: Ferris brake lamp red to amber; shared bracket tagged.
- M3: Carousel platform visibly leveled; speed card mounted.
- M4: Bumper dry-floor prediction and test marks remain visible.
- M5: Workshop opens; tower arming key shows limited-test status.
- M6: Controller crate receives `NOT INSTALLED`; three report lines merge visually.
- M7: Hart's card appears on the Workshop bench.
- M8: Pirate timing trace persists; drive forbidden band appears.
- M9: Arm nine remains barricaded; wind/load card mounts.
- M10: Plant Room opens; portable speed wheel is retired.
- M11: Arcade opens; flume pump curve and non-overlap schedule remain visible.
- M12: Bumper and tower receive verified-configuration tags.
- M13: Three rotating-ride cards and corresponding festoon lights activate.
- M14: Coaster crown tape appears; station light stays red.
- M15: Six resolved ride areas illuminate; coaster remains red and barricaded; front certificate is signed.

## Dialogue state

- Hart shifts from suspected interrupter to trusted safety authority after M8.
- Chen's greetings shift from confidence in multiple displays to questions about upstream independence after M6.
- Kovač stops proposing replacement before measurement after M10 and openly accepts closure after M14.
- Idowu begins treating controls and mechanics as one coupled system after M8.
- Brennan's optional dialogue distinguishes historical practice from present proof after M6.

## Mission endings

Every final stop produces the briefing's promised decision. Each outcome begins with `Mission decision:`. Mission 15 stops the timer after Stop 60, shows the metric gate, and then delivers an epilogue with no further graded question.

# 12. Content and UI acceptance tests

## Scientific checks

- Recalculate every numerical result after schema import.
- Confirm `4.22 m/s` for the carousel 20-degree boundary at `r=5.0 m` and `g=9.80 m/s²`.
- Confirm bumper stop `2.0 m` for `v=4.0 m/s`, `μ=0.40`, and `g=10.0 m/s²`.
- Confirm collision result `0.88 m/s` and dummy average force `280 N`.
- Confirm pirate effective length `9.38 m` for `T=6.15 s`.
- Confirm pump input `44.1 kW` for `Q=0.45 m³/s`, `H=7.0 m`, `η=0.70`.
- Confirm coaster `vmin=7.41 m/s` at 5.6 m and `8.52 m/s` at 7.4 m.
- Confirm real-radius fictional requirement `9.52 m/s` and 0.12 m/s failure for measured 9.40 m/s.
- Treat all ride limits as fictional campaign specifications.

## Format checks

- Each lesson has exactly one canonical type.
- All ten DERIVE blocks preserve expression and rule selection.
- Every DIAGNOSIS includes quiet readings.
- TRACE includes three dependent channels and one independent channel.
- CONTROL uses a meaningful reversal.
- HOLDOUT hides the crown radius until prediction freeze.
- VALUE costs exceed budget and composition/evidence axis is binding.
- ALLOCATE pools, protected items, and required items are valid.
- ATTEST includes at least one critical unsupported claim before the final fully backed set.
- No suspended STACK interaction appears.

## Action-clarity and format-payload audit

Run this audit on authored Markdown and again on the imported interface. A complete hidden payload is not a pass if the visible card omits an action, value, unit, equation, control, measurement, or submission type; clear prose is not a pass if the canonical interaction block is missing or malformed.

### Canonical source gate

At the repository commit being shipped, inspect `engine/content/normalize.js` for `FORMATS`, `DECISION_FORMATS`, `CALCULATION_FORMATS`, and `SUSPENDED_FORMATS`; inspect `engine/core/instruments.js` for `INSTRUMENTS`, `INSTRUMENT_BLOCK`, and `isInstrument`; compare base-format fields with `tools/BOOK_TEMPLATE.md`; compare every instrument payload with the matching worked stop in `books/instruments.yml`; then run `tools/import-book.mjs`. The repository files at that commit outrank this bible and any older prose summary.

- Reject any type that does not canonicalize to a current `FORMATS` entry.
- Reject any stop whose payload root or required fields differ from the current worked canonical example.
- Reject generic `choices` used as a fallback for an operated or diagnostic panel.
- Confirm `stopKind` placement: decisions at people, calculations at rooms/benches/boards, and operated formats at the fixture the player controls.
- Run the repository's format traps, lesson tests, and right-first/wrong-first gameplay paths after import. A prose-only review cannot mark this gate complete.

### Build-decision traceability gate

- Count 60 stop blocks and require exactly one declared `Area:` and one `Call - exact player copy:` in each block.
- Resolve every backticked placement fixture against the Section 3 fixture declarations; reject undeclared IDs, mismatched places, missing player-facing captions, or kinds outside `vessel`, `rack`, `bench`, and `board`.
- Parse every beat heading and reject any trigger outside `On arrival at <PLACE>`, `After Stop N`, `After Stops N and M`, or `At mission end`. Require a world-state sentence, panel/HUD line, named-speaker dialogue, unlock declaration, and a waypoint whenever travel is the next required action.
- For each person-placed stop, require exactly one full character name and verify that the same person appears in the stop's exact Call. Reject crew names, role-only labels, and multi-person placements.
- Compare `Correct result` with `Answer text` after whitespace normalization and reject equality. Treat the former as grading logic and the latter as player-facing feedback.
- Enumerate every wrong option in CHOICE and every wrong candidate in diagnostic, control, value, and stress payloads. Require one keyed, option-specific rebuttal for each; a general explanation cannot satisfy this check.

### Campaign payload inventory

| Canonical format | Stops | Required authored payload check before importer |
| --- | --- | --- |
| CHOICE | 5 | Exactly four distinct `choices`; `answer` is one label verbatim; exactly three keyed option-specific `rebuttals`; no slash-delimited candidate string. |
| BALLPARK | 2, 13, 25, 37, 45 | `estimate` includes labels, values, slots, template, formula, correct value, target, tolerance, and units where dimensional. |
| PROTOCOL | 17 | `scenarios`, distinct `choices`, and a complete one-to-one `mapping`. |
| SEQUENCE | 6 | Distinct `cards` and a complete `order` containing each card once. |
| CASEBOOK | 28, 57 | Distinct clues and interpretations with a complete one-to-one `mapping`; never degrade to CHOICE. |
| DIAGNOSIS | 8, 24, 32, 40, 56 | Headline, at least three zoned readings including quiet evidence, separately stored choices with mechanisms, and keyed answer. |
| SCIENCETANK | 59 | Proposals, numerical recommendation totaling the authored pool, and explicit evidence/pass rules. |
| DERIVE | 3, 9, 18, 26, 30, 34, 38, 42, 50, 54 | `derive.lines` each contain expression and licensing rule; `order` is complete; no conversion to another format. |
| BALANCE | 7, 14, 33 | Target, separately stored streams, count/exclude status, units, and correct closing action. |
| VALUE | 16 | Budget, separate options with costs and evidence axes, and keyed funded choice. |
| STRESS | 35, 47, 58 | Assumption ranges with units, separate candidates, survival state, and keyed conclusion. |
| ATTEST | 20, 22, 48, 60 | Verification limit, separate claims, backed and critical states, unsupported traps where authored, and exact correct claim set. |
| SWEEP | 1, 19, 29 | `sweep` includes movable control, response, points or model, graded region, and conclusion; response appears only as the player sweeps. |
| VERIFY | 4, 15, 27 | `verify` includes numerical prediction and tolerance, pre-action commit lock, action, measurement, mandatory-measurement failure, conclusion, and exact four-phase order. |
| HOLD | 10 | Control range and unit, response equation/unit, fixed values, inclusive band, and duration. |
| CONTROL | 11, 21, 31 | Baseline, changed variable, fixed conditions, measurement timing, state measurements, noise band, separate candidates, and required restoration/reversal. |
| TRIGGER | 12, 36, 52 | Decision rule, controls or threshold scale, anchors, direction/equality behavior, consequence limit, and committed correct rule before updates reveal. |
| TRACE | 23 | Shared upstream dependency, channel-level dependency lists, target dependence, independent channel, and keyed shared source. |
| PROBE | 41 | Every station has `reading`, `expected`, unit, and `load`/comparison; target, minimum readings, all-stations commit gate, keyed first break, and conclusion are present. |
| ALLOCATE | 43, 51 | Pool, separate costed items, required/protected flags, decision questions, and a valid numerical allocation. |
| LOB | 44 | Both control ranges and units, target and tolerance, withheld launch-speed behavior, and keyed numerical control pair. |
| CHAIN | 46 | Separate transfers, complete order, carried quantities, and governing relationship. |
| DEGENERACY | 49 | Two named numerical controls with ranges, steps, and units; both loci/constraints; tolerance; and required ordered numerical parameter pair. |
| RESIDUAL | 39, 55 | Separate residual fields, values, RMS, pattern, keyed field, and evidence-limited conclusion. |
| HOLDOUT | 53 | Training inputs, frozen prediction/verdict, explicitly hidden holdout, unlock only after freeze, and post-reveal conclusion. |

### Player-action checks

- For all 60 stops, verify that the visible prompt explicitly names the expected submission: number, setting, numerical pair, ordered plan or derivation, allocation, selected claims, or conclusion.
- For every numerical stop, compare the visible card against the answer logic field by field. Every input, constant, value, unit, governing equation, tolerance when used, and requested answer unit must appear before submission.
- For every multi-phase stop, play the interface in the written order and confirm that the prompt order matches the actual enabled-control order.
- For every calculation-plus-experiment stop, confirm the visible sequence is exactly `CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET`.
- For Stops 4, 15, and 27, confirm the prediction is numerically committed before equipment controls unlock; verify that operation cannot begin from an empty, editable, or post-measurement prediction field.
- For Stops 11, 21, and 31, confirm the card names the changed variable, all fixed conditions, measurement timing, and required restoration; confirm the interface captures baseline, changed-state, and restored-state measurements.
- For Stop 49, confirm both radius and speed controls are named with ranges, steps, and units, and reject submissions that are not a numerical `(radius, speed)` pair in `(m, m/s)`.
- For Stop 53, confirm the drawing-based numerical prediction and verdict are frozen before the physical crown radius unlocks.
- For Stop 5, confirm four separate choice controls render; submit each wrong option and verify its own rebuttal appears rather than one generic message.
- For Stop 41, confirm all six stations render their own observed reading, expected value, unit, and comparison/load text; keep commit disabled until all six have been sampled, with the missing-action message visible.
- Fail validation if any instruction depends on reading designer-only YAML, answer text, feedback, or a measurement that is not yet visible to the player.

## Story and throughline checks

- Every briefing body is four sentences, 30-70 words, and ends with the promised decision.
- Every setup is two sentences and 30-45 words.
- After Stop 1, each setup explicitly builds from the prior result.
- Every outcome directly answers sentence four of its briefing.
- Each twist has at least two planted clues and changes interpretation without changing observed facts.
- Correct answers may create bad news, especially M6 and M14.
- No character is a quiz dispenser or an incompetent foil.
- Every move is caused by evidence, a test, or a required decision.

## Metric-economy checks

- Clamp every bar to 0-100.
- Apply automatic deltas before Recovery Points.
- Confirm the canonical path reaches 100/100/100/100 without perfect play being mandatory.
- A correctly justified closure increases certificate completion.
- If any bar reaches zero, restore the mission-start snapshot.
- Do not lower a bar without the named story event shown on the metric screen.

## Tone and accessibility checks

- Run automated word and sentence counts on all briefing bodies and question setups.
- Run closing-card readability at grade 6.5 or below.
- Define every required term before first use.
- Keep glossary terms one compact line each.
- Keep equation entries to equation, job, symbols, and campaign reason.
- Use text and icons with color.
- Pause mission timers for required dialogue.
- Keep completed dialogue and conclusions in the mission log.
- Keep auxiliary blurbs to one simple sentence.

# 13. Suggested YAML assembly order

1. Preserve the current Midway theme IDs, fixtures, coordinates, and asset references.
2. Reconcile this bible's canonical names with existing theme character objects; update all references together if the theme uses different identities.
3. Create the campaign metadata, four bars, recovery bank, timer, clue flags, ride-status keys, and final gate.
4. Author Mission 1 and validate every panel before copying structural patterns.
5. Add Missions 2-5 and validate one-location/two-location transition.
6. Add M6 Twist 1 and verify the TRACE and controller state changes.
7. Add M7-M10 and verify Hart's card, timing trace, arm-nine file, and Plant Room gates.
8. Add M11-M14 and verify Arcade, witness sheet, crown tape, and holdout behavior.
9. Add M15, stop the timer after Stop 60, and ensure no question follows the signed certificate.
10. Run importer, traps, lessons, content, location, reachability, word-count, glossary, and right-first/wrong-first play tests.

## Recommended content object shape

Use the repository's exact current fields. Preserve the following authored intent even if field names require mapping:

```yaml
mission:
  briefing: {header, title, goNow, body, objective, primer}
  route: [place_ids]
  beats: [{trigger, location, presentation, playerControl, worldState, dialogue, panelText, unlocks}]
  lessons:
    - {id, at, person, game, reason, scene, connection, question, answerText, why, feedback, state}
  outcome: {decision, consequence, hook}
  metricScreen: {target, automaticDeltas, recovery, canonicalQA}
  review: [bullets]
```

# 14. Final handoff checklist

- [ ] Existing Midway identifiers and fixtures preserved.
- [ ] Character names, roles, and pronouns synchronized with theme files.
- [ ] Fifteen missions and sixty stops import.
- [ ] Exactly ten DERIVE stops remain.
- [ ] Every operated/diagnostic format has complete canonical data.
- [ ] Every mission card contains compact glossary, primer concepts, and equation blocks.
- [ ] Every briefing promise matches its outcome.
- [ ] Every question setup contains exactly two sentences and 30-45 words.
- [ ] All units, answers, tolerances, and explanations agree.
- [ ] Every prompt names its expected submission type.
- [ ] All 60 stops declare exactly one valid `Area:` and one `Call - exact player copy:`.
- [ ] Every placement fixture resolves to a Section 3 declaration with exact ID, place, allowed kind, and player-facing caption.
- [ ] Every beat uses one allowed firing condition and supplies world state, panel/HUD text, named-speaker dialogue, unlocks, and any required waypoint.
- [ ] Every person stop names exactly one character, and that same person appears in its exact Call.
- [ ] No `Answer text` duplicates its `Correct result`; every wrong option or candidate has one keyed, option-specific rebuttal.
- [ ] Every numerical card visibly shows all inputs, constants, units, equations, and requested answer units.
- [ ] Every multi-phase card lists actions in interface order.
- [ ] VERIFY predictions commit before equipment unlocks and follow `CALCULATE AND COMMIT -> OPERATE -> MEASURE -> INTERPRET`.
- [ ] CONTROL cards name the changed variable, fixed conditions, measurement timing, and restoration requirement.
- [ ] DEGENERACY names both controls and requires a numerical parameter pair with units.
- [ ] Every PROBE station has explicit `reading`, `expected`, unit, and useful `load`/comparison text; all required readings gate commit.
- [ ] Every CHOICE has four separately stored choices, the correct label verbatim, and three option-specific rebuttals; no candidate list is slash-delimited prose.
- [ ] Every nonplain stop matches the current canonical payload example and placement classification at the repository commit being shipped.
- [ ] `tools/import-book.mjs`, format traps, lesson tests, and right-first/wrong-first gameplay tests pass without replacing an operated or diagnostic format with generic choices.
- [ ] The Section 12 action-clarity and format-payload audit passes in authored Markdown and imported gameplay.
- [ ] All four metrics can reach 100 through the canonical economy.
- [ ] Three twists reconstruct from planted clues.
- [ ] M1-M4 use one place; M5-M10 use two; M11-M15 use three.
- [ ] No filler orientation task or suspended format appears.
- [ ] Visible world state remembers the player's scientific progress.
- [ ] Final payoff begins after Stop 60 with no additional quiz.

The campaign is ready only when the player can say: I know what happened, why I went there, what each test established, how the physics changed the story, and exactly why each ride received its final decision.


## Build reachability corrections

The following group ownership is authoritative for reachability; it does not add characters or change stop placement.

- `BUMPER` roster owner: Maya Hart.
- `CAROUSEL` roster owner: Maya Hart.
- `WORKSHOP` roster owner: Ana Silva.
- `COASTER` roster owner: Priya Nair.
- `FLUME` roster owner: Mateo Ruiz.
- `WHEEL` roster owner: Maya Hart.

- Rename the second Mission 8 beat id to `after-stop-32-holdout`; triggers and dialogue remain unchanged.

## Mental-math number rule for calculated-response cards

This rule is binding for this campaign and for future games built from it. When the player must perform the arithmetic without a supplied calculator or a displayed intermediate result, author inputs as friendly integers or simple ratios. Prefer products and quotients that can be completed mentally and key results to an integer or at most one useful decimal place. Update every dependent prompt, board payload, prediction, measurement, tolerance, correct result, answer text, and feedback together. Preserve more complex real-world values only when the interface supplies the calculator or the intermediate value and the learning target is interpretation rather than arithmetic. Never make arithmetic friction the hidden difficulty of a concept question.
