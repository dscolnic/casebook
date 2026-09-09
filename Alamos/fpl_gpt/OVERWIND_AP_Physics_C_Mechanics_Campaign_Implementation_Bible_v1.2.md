# OVERWIND

## AP Physics C: Mechanics Campaign Implementation Bible

**Version:** 1.2 — Ensemble and optional-depth expansion, source-reviewed edition

**Campaign length:** 12 days, 48 graded stops, 12 DERIVE stops, 60 optional worked examples, 72 optional GO DEEPER questions

**Setting:** Kerrow Mine No. 3, a 1240 m shaft beneath a 32 m headframe on a moor

**Primary subject:** AP Physics C: Mechanics

## 0. Readiness boundary

Canonical artifact: `OVERWIND_AP_Physics_C_Mechanics_Campaign_Implementation_Bible_v1.1.md`. This revision follows Whiteout’s section order and A–K mission format. OVERWIND_HANDBACK_CHECK.md records the current handback source checks and limitations. The v1.0 Giant Gate assessment and ledgers are historical, not a fresh full-gate assessment of v1.1. The handback reports that the original build played; current importer, runtime and project readability checker were not supplied for this revision. No release-readiness claim is made.

| Source category | Expected | Supplied | Status | Authority/action |
|---|---|---|---|---|
| Course | AP Physics C: Mechanics | The-Simple-AP-Physics-C_-Mechanics-Cheat-Sheet (1).pdf | MATCH | Seven-unit concept reference; specific peripheral bullets mapped below |
| Place | Kerrow Mine No. 3 | overwind.txt | MATCH | Preserve six groups, coordinates, silhouette and persistent fixture IDs |
| Format | Canonical interactions | QUESTION_TYPES(1).md | MATCH | Provisional supplied format and stopKind authority |
| Master | Current campaign design | Campaign_Design_and_Implementation_Master_Brief_v3.5.md | MATCH | Authoring and copy authority |
| Ledger | Current authoring ledger | FIRST_PERSON_LEARNING_AUTHORING_LEDGER_TEMPLATE_v1.5.md | MATCH | Original filled companion and machine ledger are historical; regenerate from v1.1 before import |
| Gate | Current static gate | FIRST_PERSON_LEARNING_GIANT_CAMPAIGN_GATE_CHECK_v2.5.md | MATCH | Original exact-ID gate report is historical; current check covers the handback revision |
| Format exemplar | Whiteout bible | WHITEOUT_AP_Computer_Science_A_Campaign_Implementation_Bible_v2.11_HAND_BACK_4(1).md | MATCH | Numbered front matter and mission A–K shape; no inherited handback claims |
| Schema/importer | Current repository | Not supplied | MISSING | Importer/schema/render/runtime gates NOT TESTED |
| World implementation | Referenced source modules | Place export only | PARTIAL | Source geometry preserved; runtime reachability NOT TESTED |
| Prior campaign implementation | Existing full Overwind lessons | No lesson book supplied | MISSING | New authored stop numbering; existing place IDs preserved |
## 0.1 Physical model and limits of inference

The March cage was moving **upward** toward a deep landing with about 1200 m of rope hanging. It passed that landing by 1.6 m; it did not strike the top steel. The concern at the surface is whether any permitted approach can consume the available overhead space. A deep-landing amplitude is not copied unchanged to the surface.

For the instructional axial first-mode approximation, rope linear density is 10 kg/m and fitted axial rigidity EA is 15,000,000 N. At hanging length L, k(L)=EA/L and m_eff(M,L)=M+λL/3. The one-third factor represents a linearly varying rope velocity shape; it is a Rayleigh approximation, not an exact distributed-string solution. The campaign uses a calculator and π button wherever noninteger arithmetic is needed. Physical constants, fictional equipment limits and synthetic measurements are explicit campaign specifications; this is not a mine operating procedure.

For March, M=4000 kg, L=1200 m, m_eff=8000 kg and k=12500 N/m. Define t=0 **after a finite drum-braking ramp**, when the measured drum has reached rest. Independent cage measurements give x0=0 and upward v0=2 m/s, with x measured from the new loaded fixed-support equilibrium. That equilibrium coincides with the March landing in this synthetic record. The record, not an impossible rigid-rope assumption, supplies these initial conditions. Thus x=1.6 sin(1.25t) m, the first peak is 1.6 m upward at 1.2566 s, and the period is 5.0265 s. The approximation retains tension: T_cage=M(g+x″)=M(g−ω²x) gives minimum 4000(10−1.25²×1.6)=30000 N >0. A model predicting negative tension must be rejected; ropes cannot push.

The signed passenger load interval is **M=1000–4000 kg**, hanging length **L=40–1200 m**, with fixed conservative g=10 m/s². The original shaft is 1240 m deep; 1200 m is the modeled working rope interval, not a renamed shaft depth. Synthetic survey g=9.80 is used as a cross-check and does not replace the conservative force table. Gravity-at-depth is a setting-specific supplement absent from the supplied seven-unit cheat sheet.

The controlled final braking family has an independently characterized range bound: b≥1 m/s² and, after the finite ramp, x0≈0 within the absorbed measurement margin and residual cage speed u obeys u≤min(v, g/(2ω)). This restriction is essential at short rope lengths and light loads. It ensures modal amplitude A=u/ω≤min(v/ω, g/(2ω²)), so cage tension stays at least half static weight throughout the permitted rebound. The controller acceptance record includes this residual-state restriction; a braking trajectory outside it is not covered by the signed plan. The five-metre excursion allowance is net of the calibration/initial-position margin.

| Hanging length L | k at that length (N/m) | m_eff for M=4000 kg | ω (rad/s) | Residual-speed ceiling at approach v=2 m/s | A ceiling (m) | Minimum cage tension |
|---:|---:|---:|---:|---:|---:|---:|
| 40 m | 375000 | 4133.33 | 9.525 | 0.525 m/s | 0.0551 | 20000 N |
| 600 m | 25000 | 6000 | 2.041 | 2.000 m/s | 0.9798 | 23670 N |
| 1200 m | 12500 | 8000 | 1.250 | 2.000 m/s | 1.6000 | 30000 N |

These are values of the stipulated continuous envelope; they are not three trials claimed to prove all intermediate conditions. Because k/m_eff=EA/[L(M+λL/3)] decreases with both positive M and L, the smallest ω over the stated rectangle is 1.25 rad/s. Adding drum-equivalent travel and the largest allowed residual amplitude gives the conservative global bound d_bound=v²/(2bmin)+v/ωmin. The two worst contributions need not peak simultaneously. Surface travel uses its local, much smaller amplitude where available; the final discrete-speed approval deliberately uses the global upper bound. A 2.0 m/s candidate has global bound 3.6 m; 2.5 m/s gives 5.125 m and fails the net 5 m allowance. This establishes the fastest **listed tested candidate**, not the continuous optimum or a universal physical maximum.

The synthetic engineering envelope is an authored campaign input supplied before the late decisions, distinct from what the player’s limited empty test proves. Real distributed modes, lateral motion, bending stiffness, rope wear, fatigue, motor control transients, governor dynamics, damping, legal certification and rescue operations remain outside the model. The bible never treats its fictitious limits as real-world engineering guidance.

## Build decisions register

- Preserve overwind theme/group/fixture IDs and all source coordinates; use the six low buildings and the existing 32 m headframe as the sole tall silhouette. Spawn remains (0,70), yaw 0; terrain size 1000, playerLimit 340, rolling profile. The rope run from Winder House to sheaves remains overhead, with walking clearance and no new prop across spawn or the main route.
- Source geography lists the Gravity Station as 367 m from spawn although Euclidean distance from the exported rounded coordinates is about 366.7 m; retain coordinates and the source rounded distance. Do not move the station inward. The source’s automatic day-4 far lap is suppressed as filler under Master Brief §8.1; the vehicle becomes available after Day 4 for the evidence-driven Day 7 survey only. This is an explicit required build override, not a claim the existing engine already does it.
- The source `test-trace` exists from Day 11. `march-drawer` is available through Day 9 and its contents transfer to `march-board` on Day 10; the original “until day 10”/“from day 10” overlap is resolved to one active inquiry display. `bin-bolts` remains through Day 7; its photographs persist afterward. Add no question-specific fixture.
- The Safe Winding Plan board is rendered on the existing winder-desk, not as a seventh room or stop-shaped object. All twelve accepted entries persist in its log even on days that close elsewhere; the assigned area owner signs the local entry and Ewan receives its copy.
- Four graded stops per day unlock sequentially. DERIVE choices randomize left/right at every step, with exactly one key and one reviewed wrong line. Post-grade keys, correct flags, targets and solution prose remain hidden until submission. A calculator, square root and π key are available in numerical boards.
- VERIFY starts with no prediction; committing unlocks RUN, running unlocks a single costed READ token, and measuring unlocks the two conclusion buttons. The token is local, supplied once per attempt, and does not spend Recovery Points. Wrong predictions, missing measurements or wrong interpretations never change world state and can be reset for another attempt.
- The final graded answer records the signed profile immediately. Its consequence is the unoccupied acceptance tag and open inspection access. Passenger release waits until the subsequent Day 12 automatic event and recovery allocation settle all four bars; then the existing passenger gate at The Bank visibly opens and the forty-one lamp tallies switch to READY. No extra quiz follows. This prevents a pre-allocation victory deadlock.
- Numeric boundaries are inclusive except explicit wrong ranges. Text accompanies every colored status. The log stores dialogue, measurements, decisions, routes and equations. Structural headings, including worked examples, are never roster people.

# 1. Campaign premise and opening

Forty-one miners are waiting to return to the inspected winding route. Ruth Bell’s brother Finn was in the cage when it passed its March landing; he got out unhurt, but Ruth heard his voice on the cage phone while the drum-stop lamp was already lit. Ada Kerr signed the check that treated that lamp as proof of a stopped cage. Neither knows yet why the two records disagree.

The inspector arrives in twelve days. In this fictional inspection order, passenger access stays closed unless a supported winding range is signed; missing the date sends the mine into an extended review, with underground shifts suspended. Ewan Price has promised management a faster schedule to recover lost production. He needs the mine to keep working, and the same miners who fear another overrun also need their shifts. Management has tied next week’s planned overtime to the faster timetable; a slower reopening saves regular access but will cost the crew that extra pay. His pressure comes through revised schedule sheets and requests for narrower evidence, never an instruction to test on people.

You are the lift safety engineer who must write the twelve-part Safe Winding Plan. Every page can keep a useful part of the service alive, but no page alone can open the gate. The central conflict grows as correct calculations seem to support Ewan’s schedule, then reveal what that success leaves unproved. All tests remain unoccupied or use isolated rigs. No miner is trapped below for the player to rescue; the danger is authorizing the next loaded journey with the same incomplete model.

## Opening card — exact player copy

Forty-one miners wait at Kerrow No. 3, and Ruth Bell’s brother rode the cage that would not stop. The drum was still, but the cage passed its March landing. You have twelve days to write a Safe Winding Plan, or passenger access stays shut for a longer review. Ada Kerr puts her signed check beside you and says, “I trusted the drum lamp, so show me what I missed.”

### Opening implementation state

One card over normal spawn, all four sentences visible together, one Continue action. Dismissal reveals the four bars at the starts below, opens the Day 1 briefing icon and leaves the player in normal view. Movement is learned while following the Day 1 evidence to the Bank; no greeting list, race or map tour is scheduled.

## 1.1 Safe Winding Plan — delivery contract

The Winder House plan board shows all twelve names from arrival. Piece M1 belongs to Mission 1, and so on in order; each changes from pending to signed after that mission’s successful outcome. The names below replace any inherited delivery list. Ruth’s shift tally stays beside the board; Ewan’s proposed schedule remains pinned beneath it, visibly amended as the limits narrow. Existing stop slips, mission unlocks and the four bars keep their specified behavior.

```yaml
delivery:
  name: "Safe Winding Plan"
  what: "A twelve-part record explaining the March overrun and setting the fastest supported passenger profile within its tested range."
  pieces:
    - "The measured cage stop"
    - "The drum’s true inertia"
    - "The rope’s own weight"
    - "The motor’s two demands"
    - "The full lift energy"
    - "The staged ore feed"
    - "The corrected gravity record"
    - "The steady cruise ceiling"
    - "The rope’s own clock"
    - "The March stop reconstruction"
    - "The loaded stopping envelope"
    - "The signed passenger range"
```

# 2. Campaign metrics, timer, and recovery economy

| Bar | Start | Meaning | What changes it | Zero consequence | Lock |
|---|---:|---|---|---|---|
| Safe Winding Plan | 40% | Accepted evidence and operating limits in the twelve-part plan | Named day events and RP-funded follow-up checks | Halt the current trial and restore the mission-start snapshot | All locks earned only after final signed range and allocation |
| Test Evidence | 45% | Independent support for the signed model | Named day events and RP-funded follow-up checks | Halt the current trial and restore the mission-start snapshot | All locks earned only after final signed range and allocation |
| Workshop Reserve | 75% | Remaining practical capacity to maintain and test the machinery | Named day events and RP-funded follow-up checks | Halt the current trial and restore the mission-start snapshot | All locks earned only after final signed range and allocation |
| Passenger Safeguards | 65% | Passenger access controls and protected stopping margin | Named day events and RP-funded follow-up checks | Halt the current trial and restore the mission-start snapshot | All locks earned only after final signed range and allocation |

Exactly four bars are clamped to 0–100. Victory requires all four at 100 and all final scientific flags, including the positive-tension residual-state envelope and unoccupied acceptance. A zero bar ends the attempt before recovery allocation; restore bars, bank, solved stops, fixtures, log and access to the mission-start snapshot, with a clear RETRY DAY button. An older successful mission never needs to be replayed.

The visible timer starts after the arrival bubble closes. Target: 12:00 every day. It pauses during required dialogue, loading, accessibility menus, backgrounding, system interruptions, all optional worked-example help and the aftermath/recovery/review. Wrong committed answers count once per submission; exploratory edits do not. RP=clamp(4,12,11+time_modifier−incorrect_submissions), where time_modifier is +1 by target, 0 through 15:00 inclusive, and −2 after 15:00. One RP raises one unlocked bar by one point. Bank cap is 30; overflow after every bar is full may be discarded without blocking play.

Post-day order is outcome → named automatic deltas → zero check → timer/accuracy → RP award → allocation/bank → earned locks → review → next briefing. No bar locks early, because every evidence stream can be reconsidered until the signed range exists. The negative Day 11 changes reflect revoking the false scope of the empty-test approval, not random punishment.

## 2.1 Minimum-RP canonical path and stress paths

The reference path earns only 4 RP per day (for example, eight wrong submissions at target time, or five wrong submissions after 15 minutes). It allocates to the lowest unlocked bar, ties in table order. This is deliberately a nonperfect path; a right-first run earns 12 RP and can bank excess. The high-error path with 20 wrong submissions per day also receives the floor of 4 RP and has the same viable bar path. Errors do not silently damage bars; named story events do.

| Day | Automatic changes in bar order | Four-RP allocation | End bars | Bank |
|---:|---|---|---|---:|
| 1 | [5, 3, -1, 2] | [4, 0, 0, 0] | [49, 48, 74, 67] | 0 |
| 2 | [5, 3, -1, 2] | [1, 3, 0, 0] | [55, 54, 73, 69] | 0 |
| 3 | [5, 3, -1, 2] | [1, 3, 0, 0] | [61, 60, 72, 71] | 0 |
| 4 | [5, 3, -1, 2] | [1, 3, 0, 0] | [67, 66, 71, 73] | 0 |
| 5 | [5, 3, -2, 2] | [0, 2, 2, 0] | [72, 71, 71, 75] | 0 |
| 6 | [4, 4, -2, 3] | [0, 0, 4, 0] | [76, 75, 73, 78] | 0 |
| 7 | [4, 4, -1, 2] | [0, 0, 4, 0] | [80, 79, 76, 80] | 0 |
| 8 | [4, 4, -2, 2] | [0, 0, 4, 0] | [84, 83, 78, 82] | 0 |
| 9 | [4, 5, -1, 3] | [0, 0, 4, 0] | [88, 88, 81, 85] | 0 |
| 10 | [5, 5, -1, 3] | [0, 0, 4, 0] | [93, 93, 84, 88] | 0 |
| 11 | [-3, 5, -2, -2] | [0, 0, 4, 0] | [90, 98, 86, 86] | 0 |
| 12 | [10, 8, 20, 12] | [0, 0, 0, 2] | [100, 100, 100, 100] | 2 |

# 3. Kerrow Mine No. 3 — areas and fixtures

## BANK — The Bank

Source position (-9, -4); canonical named owner Ruth Bell, cage operator.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| profile-desk | The profile desk | bench | BANK — The Bank | left | A sloping oak desk with a hinged clear sheet and pencil groove. | The planned speed curve lies under a clear cover. | 1, 2, 42 |
| signal-board | The signal board | board | BANK — The Bank | back | A black timber board with brass bell handle and forty-one tally hooks. | The bell handle carries a red test lock. | 4, 36 |
| depth-dial | The depth indicator | board | BANK — The Bank | right | A round brass dial with a long pointer behind scratched glass. | The pointer marks the cage position. | 3, 35, 45 |
## WIND — Winder House

Source position (-30, 6); canonical named owner Ewan Price, winding engineer.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| drum | The drum | vessel | WIND — Winder House | left | A broad steel cylinder with bolted flanges and a visible central opening. | Fresh flange bolts ring the winding drum. | 7, 15 |
| winder-desk | The winder desk | bench | WIND — Winder House | back | A scarred writing desk with a binder cradle and clip for operating sheets. | The Safe Winding Plan sits beside the motor record. | 5, 6, 8, 13, 14, 16, 19, 20, 29, 30, 44, 48 |
| test-trace | The test wind trace | rack | WIND — Winder House | left | A wall rack holding two rolls of ruled paper under separate retaining clips. | The unoccupied test trace hangs beside the drum record. | 43, 47 |
## ROPE — Rope Shop

Source position (-34, 34); canonical named owner Mara Shaw, rope technician.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| rope-bench | The rope bench | bench | ROPE — Rope Shop | left | A long timber bench with rope-end samples and a steel measuring rule. | The rope record lists four shortened ends. | 9, 10, 12, 27, 28, 33, 34, 39, 40, 46 |
| coil-rig | The coil rig | rack | ROPE — Rope Shop | left | Two fixed anchors hold a short test coil above a mechanical extension gauge. | A gauge measures the stretch between two anchors. | 11 |
| cappel | The spare cappel | vessel | ROPE — Rope Shop | right | A heavy socket fitting encloses a short cut length of winding rope. | The spare fitting grips a cut rope end. | None; inspectable persistent reference |
## CAGE — Shaft and Brake House

Source position (20, -4); canonical named owner Ada Kerr, mine safety engineer.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| body-bench | The bench drawing | bench | CAGE — Shaft and Brake House | left | A flat drawing bench carries a cage outline and loose force-arrow cards. | A scale drawing separates the cage from its rope. | 17, 18 |
| pad-bench | The pad bench | bench | CAGE — Shaft and Brake House | right | A steel tray holds worn brake pads beside a clip of paper certificates. | Cold test certificates lie beside worn brake pads. | 23, 24, 41 |
| arrestor | The crush-tested arrestor | rack | CAGE — Shaft and Brake House | left | A buckled metal buffer rests on a rack beside a ruler and test photographs. | The folded metal shows how far the buffer crushed. | None; inspectable persistent reference |
| march-drawer | The inquiry drawer | bench | CAGE — Shaft and Brake House | right | A shallow locked drawer has a glass label pocket and a tape case inside. | The sealed March tape waits under its case number. | None; inspectable persistent reference |
| march-board | The March board | board | CAGE — Shaft and Brake House | left | A broad pinboard has clips for three records and a rope-length scale. | The recovered tape shares a board with the rope measurements. | 37, 38 |
## TIP — Tip and Conveyor

Source position (34, -30); canonical named owner Ivo Reed, conveyor foreman.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| belt-drive | The belt drive | rack | TIP — Tip and Conveyor | left | A guarded belt drive has an inspection window and a bracket for maintenance tags. | The belt motor carries two recent trip tags. | 31 |
| weightometer | The weightometer | board | TIP — Tip and Conveyor | back | A large mechanical scale stands beside a tray for dated ore tickets. | The scale records the ore delivered each minute. | 21, 22, 32 |
| bin-bolts | Two sheared bin bolts | bench | TIP — Tip and Conveyor | right | Two fractured bolts lie in separate grooves beneath their matching photographs. | The broken bolts lie beside their test photographs. | None; inspectable persistent reference |
## GRAV — Gravity Station

Source position (-70, -290); canonical named owner Nia Cole, survey engineer.

| ID | Persistent object | Kind | Area/place | Wall | Physical appearance | Player-facing caption | Graded stop references |
|---|---|---|---|---|---|---|---|
| gravimeter | The gravimeter | vessel | GRAV — Gravity Station | right | A compact instrument sits level in an open padded carrying case. | The meter rests in a padded case. | 25 |
| level-book | The level book | bench | GRAV — Gravity Station | right | A clothbound survey book lies open beneath a weighted straightedge. | Survey heights and reading times fill the book. | 26 |
| pillar | The station pillar | rack | GRAV — Gravity Station | back | A low concrete pillar has a smooth instrument seat and a marked reference point. | A concrete pillar reaches down to solid rock. | None; inspectable persistent reference |

## Landmark-only spaces

- Compressor House at (40,22): Air for the drills is supplied here.
- Lamp Room at (12,8): Forty-one numbered lamps record who is below.
- Change House at (28,44): The shift begins and ends here.
- Shift board at (14,52): The current shift can read the passenger access status here.

# 4. Canonical roster

### Ruth Bell

- **Display name:** Ruth Bell
- **Role:** cage operator
- **Pronouns:** she/her
- **Allowed short name:** Ruth
- **Area ownership:** BANK
- **First entrance:** refuses boarding when the fast control is locked.
- **Wants:** Her brother Finn rode the March cage and was unhurt. She wants his next shift to run, but she will not use the drum lamp as his safety check again.
- **Blind spot:** The drum record has usually been a sufficient proxy for cage motion.
- **Scientific domain:** motion and passenger access.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “Which part is still moving?”
- **Arc:** She moves from privately asking for reassurance to publicly refusing to post a faster schedule without a cage trace.
- **Changed greeting after relevant reveal:** “I want the cage trace beside the drum trace.”
- **Gameplay necessity:** Removing this owner removes the independent motion and passenger access constraint from final sign-off.


**Bio reading check — exact player copy:** Why does Ruth now ask for two motion traces?

```yaml
bioCheck:
  prompt: "Why does Ruth now ask for two motion traces?"
  choices:
    - text: "The cage can keep moving after the drum stops."
      correct: true
      feedback: "The cage record showed motion that the drum record missed."
    - text: "A drum trace always measures cage motion."
      correct: false
      feedback: "The cage record showed motion that the drum record missed."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

### Ewan Price

- **Display name:** Ewan Price
- **Role:** winding engineer
- **Pronouns:** he/him
- **Allowed short name:** Ewan
- **Area ownership:** WIND
- **First entrance:** isolates the motor before opening the drum record.
- **Wants:** He promised management a faster timetable before the inspection. A longer access closure means suspended underground shifts for the crew he works beside.
- **Blind spot:** The old inertia drawing and a good empty test initially look adequate.
- **Scientific domain:** rotation, torque, power and signed operation.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “What else must this shaft turn?”
- **Arc:** He first argues that each passed limit brings his promise within reach. At the warm-pad reversal he crosses out his own faster timetable and signs the slower supported range.
- **Changed greeting after relevant reveal:** “Put the load and pad state beside that pass.”
- **Gameplay necessity:** Removing this owner removes the independent rotation, torque, power and signed operation constraint from final sign-off.


**Bio reading check — exact player copy:** What must Ewan attach to a passed stop test?

```yaml
bioCheck:
  prompt: "What must Ewan attach to a passed stop test?"
  choices:
    - text: "The tested load and pad state."
      correct: true
      feedback: "A pass supports the conditions tested, not every load and brake state."
    - text: "Only the fastest motor speed."
      correct: false
      feedback: "A pass supports the conditions tested, not every load and brake state."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

### Mara Shaw

- **Display name:** Mara Shaw
- **Role:** rope technician
- **Pronouns:** she/her
- **Allowed short name:** Mara
- **Area ownership:** ROPE
- **First entrance:** clamps the test coil before weighing a cut sample.
- **Wants:** Management wants a quick rope-replacement answer. She needs to show whether replacing sound steel would solve the motion problem or merely spend the remaining workshop reserve.
- **Blind spot:** A passed mean-pull test can distract from rapidly changing stretch.
- **Scientific domain:** mass distribution and elasticity.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “What length was hanging?”
- **Arc:** She defends measured rope condition without defending the old model, then insists that length and rebound limits appear on the signed plan.
- **Changed greeting after relevant reveal:** “A pull limit needs a motion limit beside it.”
- **Gameplay necessity:** Removing this owner removes the independent mass distribution and elasticity constraint from final sign-off.


**Bio reading check — exact player copy:** Why does Mara ask what rope length was hanging?

```yaml
bioCheck:
  prompt: "Why does Mara ask what rope length was hanging?"
  choices:
    - text: "Length changes both moving mass and stretch response."
      correct: true
      feedback: "More hanging rope adds mass and changes the fitted stiffness."
    - text: "All lengths have the same mass and stiffness."
      correct: false
      feedback: "More hanging rope adds mass and changes the fitted stiffness."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

### Ada Kerr

- **Display name:** Ada Kerr
- **Role:** mine safety engineer
- **Pronouns:** she/her
- **Allowed short name:** Ada
- **Area ownership:** CAGE
- **First entrance:** locks the fast start control at the opening.
- **Wants:** Her signature is on the March drum-stop check. She gives you that page at arrival, with no attempt to hide it, but still hopes the new empty test will settle the inquiry.
- **Blind spot:** An empty success initially seems close to full acceptance.
- **Scientific domain:** brakes, impulse and evidence boundaries.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “What did this test actually prove?”
- **Arc:** She explains her own mistaken inference in front of Ruth, then limits the empty-test claim even though the correction weakens the case for quick reopening.
- **Changed greeting after relevant reveal:** “A good test earns its own conditions, no more.”
- **Gameplay necessity:** Removing this owner removes the independent brakes, impulse and evidence boundaries constraint from final sign-off.


**Bio reading check — exact player copy:** What does Ada ask before a test earns approval?

```yaml
bioCheck:
  prompt: "What does Ada ask before a test earns approval?"
  choices:
    - text: "Which conditions the test actually proved."
      correct: true
      feedback: "Approval must stay within the evidence from the stated conditions."
    - text: "Whether its display looked reassuring."
      correct: false
      feedback: "Approval must stay within the evidence from the stated conditions."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

### Ivo Reed

- **Display name:** Ivo Reed
- **Role:** conveyor foreman
- **Pronouns:** he/him
- **Allowed short name:** Ivo
- **Area ownership:** TIP
- **First entrance:** stops feed while collecting intact bolt fragments.
- **Wants:** His broken bin has cut ore flow just as the lift is losing time. He fears that a feed cut will be treated as the crew failing to keep up.
- **Blind spot:** Standing belt mass has been his familiar overload measure.
- **Scientific domain:** momentum flux and mechanical power.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “How much arrives each second?”
- **Arc:** He uses the staged chute to keep daily delivery while reducing impact, giving the crew a practical gain that does not require a faster passenger cage.
- **Changed greeting after relevant reveal:** “The scale cannot tell us how hard it lands.”
- **Gameplay necessity:** Removing this owner removes the independent momentum flux and mechanical power constraint from final sign-off.


**Bio reading check — exact player copy:** Why can a lightly loaded belt still trip?

```yaml
bioCheck:
  prompt: "Why can a lightly loaded belt still trip?"
  choices:
    - text: "Incoming ore must gain momentum each second."
      correct: true
      feedback: "A stream needs force to gain speed even when little mass sits on the belt."
    - text: "Standing belt mass alone sets the drive force."
      correct: false
      feedback: "A stream needs force to gain speed even when little mass sits on the belt."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

### Nia Cole

- **Display name:** Nia Cole
- **Role:** survey engineer
- **Pronouns:** she/her
- **Allowed short name:** Nia
- **Area ownership:** GRAV
- **First entrance:** levels the meter before accepting a reading.
- **Wants:** The repeated gravity readings were taken on her watch. She must own the drift correction without letting it become a convenient explanation for March.
- **Blind spot:** A tidy spherical model can be easier to discuss than messy local evidence.
- **Scientific domain:** gravitation, drift and uncertainty.
- **Decision function:** receives the local day decision and signs the corresponding evidence page.
- **Verbal habit:** “What did the reference do?”
- **Arc:** She signs the corrected survey and refuses to let a small weight change stand in for the missing account of delayed motion.
- **Changed greeting after relevant reveal:** “Keep the model assumption with the number.”
- **Gameplay necessity:** Removing this owner removes the independent gravitation, drift and uncertainty constraint from final sign-off.


**Bio reading check — exact player copy:** Why does Nia repeat the reference reading?

```yaml
bioCheck:
  prompt: "Why does Nia repeat the reference reading?"
  choices:
    - text: "To separate meter drift from a change with depth."
      correct: true
      feedback: "A repeat reference can reveal a time-dependent instrument offset."
    - text: "To force local readings to match an ideal sphere."
      correct: false
      feedback: "A repeat reference can reveal a time-dependent instrument offset."
```

**Bio check behavior:** Show with this roster passage when opened; one answer reveals feedback, with retry available. This is an optional, state-neutral reading check: no stop number, RP, timer cost, mission prerequisite or mastery credit.

## 4.1 Evidence changes relationships

The following conversation state reads accepted core evidence only. `accepted_stop_N` means Stop N's existing accepted completion, and `mission_complete_N` means its existing outcome/metric transition has finished. These are aliases for existing progression, not new gates or trust scores. Optional dialogue never sets them. A restart restores the mission snapshot; replay never doubles an object action or reward. Every required beat is logged, timer-paused, at most two short bubbles, and returns control after one Continue. Intermediate conversations attach to the listed acceptance event, not to opening a question or submitting a wrong attempt.

| Relationship | Early position | Evidence that changes it | Later conduct shown in exact beats |
|---|---|---|---|
| Ruth Bell / Ada Kerr | M1: Ruth wants a cage check; Ada owns the March drum-based sign-off. | M9 Stop 34 establishes a separate oscillation period; M10 Stop 38 reconstructs the delayed motion. | M10: Ada attaches her old signed check rather than removing it. M12: Ruth agrees to reopen only with Ada's limits still attached. |
| Ewan Price / Ivo Reed | M4: Ewan wants a faster passenger timetable; Ivo wants ore throughput kept separate. | M6 Stop 22 gives a way to spread momentum transfer; M8 Stop 30 establishes only a power bound. | M8: Ewan labels his proposed speed as power-only. M12: he personally posts the slower sheet and owns the lost overtime promise. |
| Mara Shaw / Nia Cole | M3: Mara will not let a local measurement represent the whole hanging rope; Nia asks which assumptions travel with it. | M7 Stops 26–27 distinguish the ideal gravity model from site evidence; M9 Stop 34 couples rope stiffness and effective mass. | M9: Nia asks for Mara's length labels on the period record. M11: both preserve the full-range conditions rather than promote a single successful trial. |

## 4.2 Conditional greetings — exact player copy

At each main character's existing fixture, an optional TALK action offers the highest-priority eligible greeting: late (3), then middle (2), else early (1, unconditional fallback). Present locally when that owner is present; otherwise show a labeled radio response from the same person without moving them. Read evidence at the moment TALK opens. Show each state automatically at most once only when TALK is selected; a REPLAY GREETING action can repeat it. Closing/reopening is state-neutral: no timer, bar, RP, mastery, story-flag or unlock effect. These lines replace generic 'keep the tested conditions' greetings in the mission F descriptions.

| Person | Priority / condition | Exact greeting |
|---|---|---|
| Ruth Bell | 1 / otherwise | “Finn's tally stays here until the cage has a check of its own.” |
| Ruth Bell | 2 / accepted_stop_34 | “A stopped drum leaves a moving cage. Now I know why I wanted both traces.” |
| Ruth Bell | 3 / mission_complete_12 | “Finn took his tally. The limits stay up for the next forty-one.” |
| Ewan Price | 1 / otherwise | “I promised extra trips. Show me which part of that promise the machine can keep.” |
| Ewan Price | 2 / accepted_stop_30 | “The motor can supply the power. That is all this page says.” |
| Ewan Price | 3 / mission_complete_12 | “The lost overtime was my promise. I will explain the new sheet myself.” |
| Mara Shaw | 1 / otherwise | “This end is short enough to lift. The hanging rope is another matter.” |
| Mara Shaw | 2 / accepted_stop_34 | “Nia kept the length beside the period. We can finally compare like with like.” |
| Mara Shaw | 3 / accepted_stop_44 | “We kept the warm test's conditions. A neat trace must not erase them.” |
| Ada Kerr | 1 / otherwise | “My signature is on the March check. Leave it there while we find what it missed.” |
| Ada Kerr | 2 / accepted_stop_38 | “The delay fits the rope's motion. My old check watched the wrong stopping event.” |
| Ada Kerr | 3 / mission_complete_12 | “Ruth has the full range, including what would require us to stop and test again.” |
| Ivo Reed | 1 / otherwise | “Ore can wait in a bin. People cannot be our test load.” |
| Ivo Reed | 2 / accepted_stop_24 | “The staged chute gives the ore more time to change momentum. That is our gain.” |
| Ivo Reed | 3 / mission_complete_12 | “I will work around the posted trips. Ewan is not asking the cage to make up my losses.” |
| Nia Cole | 1 / otherwise | “Tell me which depth and which reference. Then I can tell you what the reading means.” |
| Nia Cole | 2 / accepted_stop_28 | “The gravity correction belongs in the survey. It does not explain a delayed bounce.” |
| Nia Cole | 3 / accepted_stop_44 | “Mara's length labels stay with my records. Neither of us will certify an unnamed range.” |

## 4.3 Supporting voices and physical props

These three people are supporting cast, not new stop owners. Finn Bell is a miner, Ruth's brother and an unhurt March passenger; Mina Holt is a brake fitter; Jon Pike is the ore dispatch clerk. Their exact lines appear only in the named mission beat below: Finn M1-END, Mina M5-R3, Jon M6-END. Only one supporting voice appears in any scene. Finn remains outside the passenger gate throughout testing and takes his tally only after the finale's existing gates. Mina speaks over the maintenance radio; Jon speaks over the dispatch radio. No new compulsory route, quiz or person stop is added.

| Prop ID | Physical object and home | Initial state / permitted use |
|---|---|---|
| ow-start-sheet | Fast-start sheet at signal-board | Posted proposal; removed and retained after M1 decision. |
| ow-drum-tag | Superseded-drawing tag at drum | Loose paper tag; tied onto the obsolete drawing after M2 decision. |
| ow-rope-tags | Length tags at rope-bench | Untied measured-length labels; attached after M3. |
| ow-load-envelope | Load-envelope card at winder-desk | Unmarked card; clipped to the selected system drawing after M4. |
| ow-brake-slip | Brake-check slip at pad-bench | Cold-test-only sheet; clipped to the worn pad tray after M5. |
| ow-chute-tag | Staged-chute tag at bin-bolts | Spare maintenance tag; attached to the approved arrangement after M6. |
| ow-survey-tab | Reference tab at level-book | Loose tab; placed beside the corrected site entry after M7. |
| ow-power-sheet | Power-only proposal sheet at winder-desk | Blank heading; posted with BRAKE PAGE OPEN after M8. |
| ow-two-trace-slip | Two-trace check slip at signal-board | One empty cage-trace box; clipped beside the drum-check box after M9. |
| ow-march-check | Ada's signed old check at march-board | Preserved with March file; pinned next to reconstructed cage motion after M10. |
| ow-range-sleeve | Conditions sleeve at test-trace | Open transparent document sleeve; loaded with the warm surrogate record after M11. |
| ow-shift-sheet | Amended timetable at winder-desk | Old promise visible; slower sheet posted above it after final approval. |

Props belong to the listed persistent fixture; IDs identify visual state, not inventory slots. If that fixture is in an earlier room of the same mission, the owner reports the physical action over radio and its after-state is retained there; the existing final-room aftermath inspection shows the corresponding retained decision sheet. Never add a return trip or wait for inspection of the remote prop to complete the mission. Retained paper stays inspectable at its home. They require no fetching and never carry a prerequisite absent from the core question. The original shift-board landmark mirrors the timetable and removed start-sheet states; it does not become a new graded fixture.

## 4.4 Optional depth presentation contract

Each mission's section K now includes GO DEEPER in addition to its unchanged quick review and five worked examples. The button becomes available after `mission_complete_N`. It opens the secondary brief, concepts, and six individually selectable review cards. Every review card has one four-choice question, hint, and feedback for each option; reveal selected feedback on submission, permit retry, and expose the solution on request. It is ungraded, timer-paused and reopenable; it changes no bars, RP, mastery, evidence flags, travel or unlocks. IDs `OW-GD-Mn-Qn` are review IDs, never graded stops. M12 is different only in presentation order: show its GO DEEPER button solely after the ending's Continue has returned normal control, and open it only on explicit player selection. Do not place optional review between sign-off and the ending. The current importer must map this authored contract; source review does not establish runtime behavior.

# 5. Authoritative numbered concept spine

| # | Concept | Prerequisites | Enables and later use |
|---:|---|---|---|
| 1 | Calculus kinematics and reference frames | Algebra and derivatives/integrals introduced in Day 1 primer | Motion and derivatives distinguish a position from its rate and a rate from its accumulation; used by the associated stops in the encounter matrix |
| 2 | Newton laws and system boundaries | 1 | Forces and boundaries require the external force sum and the mass to refer to the same selected body; used by the associated stops in the encounter matrix |
| 3 | Mass distribution and rotational inertia | Integration from 1 | Mass distribution matters because each mass element is weighted by its squared distance from the selected axis; used by the associated stops in the encounter matrix |
| 4 | Torque and angular acceleration | 1,2,3 | Torque and rotation link the motor to the moving load through the working radius; used by the associated stops in the encounter matrix |
| 5 | Work and potential energy | 1,2,3 | Energy accounting requires a declared system boundary and a destination for transferred energy; used by the associated stops in the encounter matrix |
| 6 | Momentum, impulse and open systems | 1,2 | Momentum and impulse track the change in directed motion over the actual time interval; used by the associated stops in the encounter matrix |
| 7 | Gravitation and measurement models (setting supplement) | 2,3; stated spherical assumption | Models and evidence must preserve the distinction between a measurement and a result obtained under ideal assumptions; used by the associated stops in the encounter matrix |
| 8 | Power and efficiency | 1,4,5 | Power and rate describe how quickly energy must move through the machine; used by the associated stops in the encounter matrix |
| 9 | Elasticity and simple harmonic motion | 1,2,3,5 | Oscillations are motion about a loaded equilibrium, with restoring force and inertia both present; used by the associated stops in the encounter matrix |
| 10 | Energy and momentum in rotating systems | 3,4,5 | Energy accounting includes rotational motion whenever a real body turns; used by the associated stops in the encounter matrix |
| 11 | Stopping, friction and conservative limits | 1,2,5,9 | Constraints and uncertainty require the least favorable conditions inside the stated operating range; used by the associated stops in the encounter matrix |
| 12 | Integrated model verification | All needed earlier concepts; no new law | Models and evidence support a signed plan only over the conditions used to obtain its limits; used by the associated stops in the encounter matrix |

## 5.1 Keystone set

Motion and derivatives, Forces and boundaries, Mass distribution, Torque and rotation, Energy accounting, Momentum and impulse, Models and evidence, Power and rate, Oscillations, Constraints and uncertainty.

## 5.2 Dependency graph

1→2; 1→3; (1,2,3)→4; (1,2,3)→5; (1,2)→6; (2,3)→7 supplement; (1,4,5)→8; (1,2,3,5)→9; (3,4,5)→10; (1,2,5,9)→11; tested constraints→12. Primers supply a local relation before its first graded use; an earlier ungraded mention is not counted as graded mastery.

## 5.3 Keystone utility and honest recurrence limits

The twelve-day source is kept intact rather than lengthened into a survey course. Motion and rotation return in the Day 4 angular-acceleration retrieval; forces and mass distribution return in Day 8; energy returns in the Day 10 diagnosis; momentum, power and oscillations are independently necessary quiet and active controls in the Day 11 diagnosis, after intervening days. All reach a later COMBINE decision. Momentum has an explicit scale exception to three separated missions: its focused graded work is Day 6, followed by the Day 11 diagnosis and same-day decision. Power has Day 8, Day 11 and Day 12; oscillations have Days 9–12. Future expansion should add independent transfer work for collision, rolling and pendulum families; their example-only coverage is not counted as graded mastery.

| Keystone | Useful decision | Misconception | Encounters |
|---|---|---|---|
| Motion and derivatives | Which complete profile can be signed for the defined operating range? | e1 | D1 Stop 1 INTRODUCE; D1 Stop 2 PRACTICE; D1 Stop 3 COMBINE; D1 Stop 4 COMBINE; D2 Stop 5 PRACTICE; D4 Stop 13 RETRIEVE; D8 Stop 30 PRACTICE; D9 Stop 35 COMBINE; D9 Stop 36 COMBINE; D10 Stop 37 RETRIEVE; D10 Stop 38 PRACTICE; D10 Stop 40 COMBINE; D11 Stop 42 PRACTICE; D11 Stop 43 COMBINE; D11 Stop 44 COMBINE; D12 Stop 45 COMBINE |
| Forces and boundaries | Which complete profile can be signed for the defined operating range? | e1 | D3 Stop 9 INTRODUCE; D3 Stop 10 PRACTICE; D3 Stop 11 COMBINE; D3 Stop 12 COMBINE; D4 Stop 14 PRACTICE; D4 Stop 15 COMBINE; D4 Stop 16 COMBINE; D5 Stop 17 INTRODUCE; D5 Stop 20 COMBINE; D6 Stop 21 COMBINE; D6 Stop 22 PRACTICE; D6 Stop 24 COMBINE; D7 Stop 27 PRACTICE; D7 Stop 28 COMBINE; D8 Stop 29 RETRIEVE; D9 Stop 34 PRACTICE; D9 Stop 36 COMBINE; D10 Stop 40 COMBINE; D11 Stop 41 RETRIEVE; D12 Stop 46 COMBINE; D12 Stop 48 COMBINE |
| Mass distribution | Can a drum stop time alone predict when the cage stops? | 1 | D2 Stop 6 PRACTICE; D2 Stop 7 PRACTICE; D2 Stop 8 COMBINE; D3 Stop 9 INTRODUCE; D3 Stop 10 PRACTICE; D3 Stop 12 COMBINE; D5 Stop 18 PRACTICE; D7 Stop 26 PRACTICE; D8 Stop 29 RETRIEVE; D9 Stop 33 INTRODUCE; D9 Stop 34 PRACTICE |
| Torque and rotation | Which complete profile can be signed for the defined operating range? | 4 m | D2 Stop 5 PRACTICE; D2 Stop 6 PRACTICE; D2 Stop 8 COMBINE; D4 Stop 13 RETRIEVE; D4 Stop 14 PRACTICE; D4 Stop 15 COMBINE; D4 Stop 16 COMBINE; D5 Stop 19 COMBINE; D5 Stop 20 COMBINE; D12 Stop 46 COMBINE; D12 Stop 48 COMBINE |
| Energy accounting | Which complete profile can be signed for the defined operating range? | e1 | D5 Stop 17 INTRODUCE; D5 Stop 18 PRACTICE; D5 Stop 19 COMBINE; D5 Stop 20 COMBINE; D8 Stop 30 PRACTICE; D8 Stop 32 COMBINE; D9 Stop 33 INTRODUCE; D10 Stop 37 RETRIEVE; D10 Stop 38 PRACTICE; D10 Stop 40 COMBINE; D11 Stop 42 PRACTICE; D11 Stop 44 COMBINE; D12 Stop 46 COMBINE; D12 Stop 47 COMBINE; D12 Stop 48 COMBINE |
| Momentum and impulse | Does the empty test authorize the faster passenger profile? | The supported ore exceeds the belt mass limit. | D6 Stop 21 COMBINE; D6 Stop 22 PRACTICE; D6 Stop 23 PRACTICE; D6 Stop 24 COMBINE; D8 Stop 31 COMBINE; D11 Stop 41 RETRIEVE |
| Models and evidence | Which complete profile can be signed for the defined operating range? | e1 | D1 Stop 1 INTRODUCE; D1 Stop 3 COMBINE; D2 Stop 7 PRACTICE; D2 Stop 8 COMBINE; D3 Stop 11 COMBINE; D4 Stop 15 COMBINE; D7 Stop 25 RETRIEVE; D7 Stop 26 PRACTICE; D7 Stop 27 PRACTICE; D7 Stop 28 COMBINE; D8 Stop 31 COMBINE; D9 Stop 35 COMBINE; D9 Stop 36 COMBINE; D10 Stop 37 RETRIEVE; D10 Stop 39 COMBINE; D10 Stop 40 COMBINE; D11 Stop 41 RETRIEVE; D11 Stop 43 COMBINE; D11 Stop 44 COMBINE; D12 Stop 45 COMBINE; D12 Stop 47 COMBINE; D12 Stop 48 COMBINE |
| Power and rate | Which complete profile can be signed for the defined operating range? | 1 | D8 Stop 30 PRACTICE; D8 Stop 31 COMBINE; D8 Stop 32 COMBINE; D11 Stop 41 RETRIEVE; D12 Stop 46 COMBINE; D12 Stop 48 COMBINE |
| Oscillations | Which complete profile can be signed for the defined operating range? | e1 | D9 Stop 33 INTRODUCE; D9 Stop 34 PRACTICE; D9 Stop 35 COMBINE; D9 Stop 36 COMBINE; D10 Stop 37 RETRIEVE; D10 Stop 38 PRACTICE; D10 Stop 39 COMBINE; D10 Stop 40 COMBINE; D11 Stop 41 RETRIEVE; D11 Stop 42 PRACTICE; D11 Stop 44 COMBINE; D12 Stop 46 COMBINE; D12 Stop 47 COMBINE; D12 Stop 48 COMBINE |
| Constraints and uncertainty | Which complete profile can be signed for the defined operating range? | Approve this start because the replay agrees. | D1 Stop 4 COMBINE; D3 Stop 12 COMBINE; D4 Stop 16 COMBINE; D5 Stop 20 COMBINE; D6 Stop 23 PRACTICE; D6 Stop 24 COMBINE; D7 Stop 25 RETRIEVE; D7 Stop 28 COMBINE; D8 Stop 32 COMBINE; D11 Stop 41 RETRIEVE; D11 Stop 42 PRACTICE; D11 Stop 43 COMBINE; D11 Stop 44 COMBINE; D12 Stop 45 COMBINE; D12 Stop 46 COMBINE; D12 Stop 47 COMBINE; D12 Stop 48 COMBINE |

## 5.4 Concept encounter matrix

| Concept | Actual graded encounters |
|---:|---|
| 1 | D1 Stop 1 INTRODUCE; D1 Stop 2 PRACTICE; D1 Stop 3 COMBINE; D1 Stop 4 COMBINE; D2 Stop 5 PRACTICE |
| 2 | D3 Stop 9 INTRODUCE; D3 Stop 10 PRACTICE; D3 Stop 11 COMBINE; D3 Stop 12 COMBINE; D8 Stop 29 RETRIEVE |
| 3 | D2 Stop 6 PRACTICE; D2 Stop 7 PRACTICE; D2 Stop 8 COMBINE |
| 4 | D4 Stop 13 RETRIEVE; D4 Stop 14 PRACTICE; D4 Stop 15 COMBINE; D4 Stop 16 COMBINE |
| 5 | D5 Stop 17 INTRODUCE; D5 Stop 18 PRACTICE; D5 Stop 20 COMBINE |
| 6 | D6 Stop 21 COMBINE; D6 Stop 22 PRACTICE; D6 Stop 23 PRACTICE; D6 Stop 24 COMBINE |
| 7 | D7 Stop 25 RETRIEVE; D7 Stop 26 PRACTICE; D7 Stop 27 PRACTICE; D7 Stop 28 COMBINE |
| 8 | D8 Stop 30 PRACTICE; D8 Stop 31 COMBINE; D8 Stop 32 COMBINE |
| 9 | D9 Stop 33 INTRODUCE; D9 Stop 34 PRACTICE; D9 Stop 35 COMBINE; D9 Stop 36 COMBINE; D10 Stop 37 RETRIEVE; D10 Stop 38 PRACTICE; D10 Stop 40 COMBINE |
| 10 | D5 Stop 19 COMBINE |
| 11 | D11 Stop 41 RETRIEVE; D11 Stop 42 PRACTICE; D11 Stop 43 COMBINE; D11 Stop 44 COMBINE |
| 12 | D10 Stop 39 COMBINE; D12 Stop 45 COMBINE; D12 Stop 46 COMBINE; D12 Stop 47 COMBINE; D12 Stop 48 COMBINE |

## 5.5 Cheat-sheet coverage and limitations

This is a mechanics campaign with an especially strong derivation spine, not a claim that all supplied-sheet topics have independent graded coverage. Nothing from AP Physics C: Electricity and Magnetism is silently added.

| Supplied material | Coverage level | Evidence | Limit |
|---|---|---|---|
| Calculus kinematics, graphs, constant/variable acceleration | Graded | 1–4, 13, 38, 42 | Central derivative/integral rail; v² relation retrieved at stopping |
| Projectile motion, horizontal/vertical independence, range and unequal landing heights | Example/primer only | Day 1 example 4; course supplement below | Not a graded mine-lift objective |
| Relative velocity and accelerating frames | Example/primer only | Day 1 example 5; course supplement below | No graded river-crossing or accelerating-frame question |
| FBD, Newton laws, tension, system constraints | Graded | 9–16, 17, 23–24 | Massive rope distinguishes equal tension idealization |
| Friction, inclines, Atwood, normal force | Example/primer plus applied braking | Day 3 examples 3–5; Day 11 example 3 | No dedicated graded incline or Atwood derivation |
| Circular force and terminal drag | Supplement only | Course supplement below | Not represented as graded mechanics coverage |
| Work, energy, potential, power and efficiency | Graded with examples | 17–20, 29–32; Days 5 and 8 examples | Potential curves and efficiency receive ungraded examples |
| Impulse, open mass streams and collision force | Graded | 21–24 | Continuous flow and fixed-system impulse are distinguished |
| Elastic/inelastic collisions, recoil, center of mass, 2D collisions | Example/supplement only | Day 6 examples 4–5; course supplement below | No claim of graded collision-family mastery |
| Rocket thrust and ballistic pendulum | Supplement only | Course supplement below | Transfer relations stated with system assumptions |
| Torque, rotational inertia and angular kinematics | Graded | 5–8, 13–16, 19, 42 | Annular integral used in actual motor decision |
| Standard inertias, parallel-axis theorem, static equilibrium | Example/supplement only | Day 2 examples; Day 4 example 5 | No dedicated graded static-beam problem |
| Rotational kinetic energy and angular work/power | Graded | 19, 30–32 | Useful rotational energy and τω links retained |
| Rolling, shape race, slip-to-roll, angular momentum, precession | Example/supplement only | Day 11 examples 4–5; course supplement below | Not a comprehensive graded rotating-systems review |
| SHM, energy, initial conditions, vertical equilibrium | Graded | 33–40, 42, 46–48 | Single-mode rope approximation and its regime are explicit |
| Pendulums, springs in series/parallel, damping and resonance | Example/supplement only | Day 7 example 5; Day 9 example 4; Day 10 example 5; supplement | Not all oscillation families are independently graded |
| FRQ setup, symbolic work, units and limiting cases | Cross-cutting practice | All 12 DERIVE and mechanism fields | No exam timing claims reproduced from potentially dated footer |
| Gravity at depth | Setting supplement, graded | 25–28 | Not in supplied seven-unit outline; ideal sphere is distinguished from actual survey |

### Course supplement — transparent ungraded reference

The following completes the reference map without pretending that every cheat-sheet bullet has its own graded stop. These notes are optional in the course log and do not replace the mission’s five examples or create extra stops.

- Projectile components are vx=v0 cosθ and vy=v0 sinθ−gt. Integrate the components separately and use one common time. For equal launch/landing height, range is v0²sin(2θ)/g, flight time is 2v0sinθ/g, and maximum height above launch is v0²sin²θ/(2g). Those range/time shortcuts do not apply unchanged to unequal heights.
- Relative velocity is vA/B=vA−vB. In a frame accelerating at a_frame, an inertial-force term −ma_frame can be introduced consistently. For a river, pointing perpendicular to the banks minimizes crossing time for fixed swimming speed; cancelling current gives a straight ground track when possible. The sheet’s “perpendicular → shortest path (diagonal)” phrase is misleading; time and path length are different objectives.
- Circular motion requires inward net force mv²/r; centripetal force is not an extra force. At terminal falling speed the upward drag balances mg, making acceleration zero while velocity remains nonzero. Kinetic friction does negative work in simple sliding against a fixed surface; the universal sign depends on the body and frame chosen. Static friction satisfies |f|≤μsN and adjusts to the required value.
- For an isolated collision, conserve each component of momentum. Elastic collisions also conserve total kinetic energy; sticking collisions share one final velocity and lose mechanical kinetic energy for the given initial state. The center of mass is Σmixi/Σmi and obeys Fext=M a_cm. Recoil from initial rest has m1v1=−m2v2. In a ballistic pendulum, use momentum during sticking and mechanical energy during the subsequent ideal swing, not energy conservation across the impact.
- Ideal rocket thrust magnitude is exhaust speed relative to the rocket times expelled mass rate. This is an open-system momentum statement; one must define the exhaust velocity frame and external forces rather than applying constant-mass F=ma to rocket-plus-changing-propellant without care.
- For uniform ideal bodies about the stated symmetry axes: a disk has I=MR²/2, a hoop MR², a solid sphere 2MR²/5, a rod about its center ML²/12, and a rod about its end ML²/3. A parallel shifted axis gives I=Icm+Md². Torque rFsinθ follows the right-hand direction rule; equilibrium requires both force and torque sums zero about the chosen axis.
- Pure rolling gives vcm=ωR and Ktotal=Mvcm²/2+Iω²/2. On the same ideal no-slip descent, smaller I/(MR²) gives faster center-of-mass motion: solid sphere, solid cylinder, hollow sphere, hoop. Static friction can supply torque without work at a stationary contact point on a fixed surface. Sliding-to-rolling requires the coupled force/torque equations until vcm=ωR; the pure-rolling constraint cannot be imposed before then.
- Angular momentum is L=Iω about the rotation axis or r×p for a particle. If external torque about an inertial origin vanishes, total angular momentum is conserved; bringing mass inward raises angular speed without conserving rotational kinetic energy automatically. Angular impulse ∫τdt=ΔL. In an off-axis sticking impact, angular momentum about the pivot can survive the short collision even though kinetic energy is lost. A spinning top under gravity experiences torque that changes the direction of angular momentum; the detailed precession solution is ungraded enrichment here.
- Small-angle pendulum periods are 2π√(l/g) for a point mass on a light string and 2π√(I/(mgd)) for a physical pendulum with center-of-mass distance d below the pivot. A spring oscillator has conserved ideal energy kA²/2 and speed ω√(A²−x²). Damping reduces amplitude; underdamped motion has angular frequency below the undamped value. Critical damping is the boundary between oscillatory and nonoscillatory free return in the linear viscous model; forced resonance and its width depend on damping and the measured response quantity.
- For written derivations, name the system and positive direction, write the governing law, keep symbols until the final substitution, and check units and limiting cases. A force perpendicular to instantaneous velocity changes direction but does no instantaneous work; it does not change speed through that force alone. This corrects the ambiguous speed-change warning in the supplied sheet.

# 6. Dramatic spine and clue ledger

## 6.1 Major turns

1. Days 2–4: the brake is not the first wrong component; an obsolete drum model and ignored rope mass make the speed proposal unreliable before braking begins.
2. Days 9–10: the drum really did stop on time; the cage’s independent elastic motion explains the unchanged March evidence.
3. Days 11–12: a successful empty test is real but insufficient; warm-pad loaded conditions impose a stricter limit than the apparent victory.

## 6.2 Clue ledger

| Planted | Objective observation | Initial interpretation | True meaning | Concept | Reinforced | Payoff |
|---|---|---|---|---|---|---|
| D1 | Drum still while cage passed landing | The brake report must be false | Two bodies can have different motions | Elasticity and initial conditions | D5 separate energy; D9 period | D10 |
| D1 hook | Drum drawing omits visible central opening | A harmless old drawing | Wrong mass distribution changes I | Rotational inertia | D2 mass and radius checks | D4 |
| D2 hook | Rope weighs 12000 kg at full length | Only a material inventory | Hanging steel contributes force and energy | System boundaries and integration | D3 mean pull | D5 |
| D5 hook | Belt trips with modest standing mass | An intermittent jam | Momentum arrives at a large rate | Momentum flux | D6 quiet mass plus flow | D6 chute decision |
| D7 hook | Work budget passes but high-speed power fails | Enough energy should suffice | Rate can bind independently | P=Fv | D8 scaled drive | D12 |
| D9 | Coil keeps moving after support stops | A small irrelevant bench bounce | The cage needs its own dynamics | SHM | D9 independent period | D10 |
| D5 | Brake certificate is marked cold | A complete brake approval | Test conditions restrict its scope | Friction and evidence | D10 hook; D11 empty success | D11 loaded warm bound |

## 6.3 Mission science / mystery / stakes movement

| Day | Science | Mystery | Stakes |
|---:|---|---|---|
| 1 | Calculus kinematics and reference frames | Reject the proposed start; its acceleration exceeds the trial limit. | Today you decide if Ruth can put the fast start on the shift sheet that includes her brother. |
| 2 | Mass distribution and rotational inertia | Use 45,000 kg m² and retire the old solid-disk value. | Today you decide which drum record Ewan must use, even if it breaks the timetable he promised. |
| 3 | Newton laws and system boundaries | The one-unit acceleration passes the stated pull limit, with a massive-rope model. | Today you decide what the rope test proves before Mara spends reserve on a fix that may miss the cause. |
| 4 | Torque and angular acceleration | Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit. | Today you decide which start Ewan can defend to the crew who need their shifts back. |
| 5 | Work and potential energy | The full lift energy budget passes, but it does not certify an emergency stop. | Today you decide if Ada can close her brake page just because the lift has enough energy. |
| 6 | Momentum, impulse and open systems | Spread the incoming momentum change over more time with the staged chute. | Today you choose how Ivo can protect the bin and keep ore moving without a faster passenger cage. |
| 7 | Gravitation and measurement models (setting supplement) | Use the corrected survey value, but reject gravity as the explanation of the delayed overrun. | Today you decide if Nia’s corrected reading explains March or leaves Ada’s old check unanswered. |
| 8 | Power and efficiency | Cap cruise at 3.5 m/s pending the emergency-stop test. | Today you choose what speed Ewan may list as a power-only proposal while Ruth keeps the gate shut. |
| 9 | Elasticity and simple harmonic motion | No; the rope and cage have their own oscillation period. | Today you decide if Ruth can trust the lamp that was lit while her brother was still moving. |
| 10 | Elasticity and simple harmonic motion | The moving cage continued into an elastic oscillation after the drum stopped. | Today you decide what Ada must put beside her signed March check when Ruth reads the inquiry. |
| 11 | Stopping, friction and conservative limits | Reject that authorization; loaded warm-pad stopping needs the slower candidate. | Today you decide if a clean empty run lets Ewan keep his faster promise to the waiting shift. |
| 12 | Integrated model verification | Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance. | Today you choose the full profile Ruth can use to open the gate for all forty-one miners. |

## 6.4 Smaller reversals and cadence

The fast start is rejected despite its correct replay (D1); rope pull passes while motor torque fails (D3–4); a sufficient lift budget does not certify a stop (D5); the belt trips below its static mass limit (D6); corrected gravity changes the force table slightly without explaining the delay (D7); power passes before brake scope fails (D8–11). Correct work can narrow the available action rather than deliver an easy celebration.

## 6.5 Human pressure and earned reversals

- **Days 1–4 — A promise loses its supports.** Ruth’s family stake and Ewan’s timetable arrive together. Rejecting the start, replacing the drum model and separating rope pull from motor torque cost Ewan specific assumptions, while still preserving a usable slower start.
- **Days 5–8 — Real wins invite the wrong conclusion.** The lift-energy page passes. Ivo’s feed fix protects throughput without speeding up the cage. Nia owns a survey error. Ewan finally earns a power-feasible cruise proposal, but Ruth writes its missing brake condition across the posted sheet. The player can see why the crew wants a yes and why this yes is too narrow.
- **Days 9–10 — The old signature becomes evidence.** Rope dynamics explains why Ruth heard Finn while the drum lamp was lit. Ada’s original record remains visible beside the independent traces; she owns the inference it could not support. The sealed timestamp tests the model, so this confrontation follows physics rather than a confession that solves the mystery.
- **Days 11–12 — Give up the promise to keep the service.** A clean empty run briefly looks like the answer, then the warm-pad limit breaks the faster timetable. Ewan must cross it out publicly. The final acceptance earns a bounded service the crew can actually use. The inspection does not erase March or promise that all future changes are safe.

The pressure is persistent copy on the existing plan and shift boards. No extra mission, test passenger, hidden accident, arbitrary resource penalty or rescue clock is introduced. Finn is a named member of the shift and Ruth’s family connection. His March experience comes through Ruth’s account, and his return through the ending card. No new NPC, voice, character model, fixture or required conversation is needed; the six existing owners carry all interactions.

# 7. Mission route overview

| Day | Route and graded-stop distribution | Evidence causing travel |
|---:|---|---|
| 1 | The Bank; Stop 1: The profile desk; Stop 2: The profile desk; Stop 3: The depth indicator; Stop 4: The signal board | Local investigation; no travel unlock. |
| 2 | Winder House; Stop 5: The winder desk; Stop 6: The winder desk; Stop 7: The drum; Stop 8: The winder desk | Local investigation; no travel unlock. |
| 3 | Rope Shop; Stop 9: The rope bench; Stop 10: The rope bench; Stop 11: The coil rig; Stop 12: The rope bench | Local investigation; no travel unlock. |
| 4 | Winder House; Stop 13: The winder desk; Stop 14: The winder desk; Stop 15: The drum; Stop 16: The winder desk | Local investigation; no travel unlock. |
| 5 | Shaft and Brake House → Winder House; Stop 17: The bench drawing; Stop 18: The bench drawing; Stop 19: The winder desk; Stop 20: The winder desk | Wtotal=MgL+λgL²/2=120000000 J requires The winder desk for the independent record or test. |
| 6 | Tip and Conveyor → Shaft and Brake House; Stop 21: The weightometer; Stop 22: The weightometer; Stop 23: The pad bench; Stop 24: The pad bench | F=Δp/Δt=ṁv=1000 N for ṁ=200 kg/s and v=5 m/s requires The pad bench for the independent record or test. |
| 7 | Gravity Station → Rope Shop; Stop 25: The gravimeter; Stop 26: The level book; Stop 27: The rope bench; Stop 28: The rope bench | g(R−d)=g0(1−d/R)=9.998 m/s² requires The rope bench for the independent record or test. |
| 8 | Winder House → Tip and Conveyor; Stop 29: The winder desk; Stop 30: The winder desk; Stop 31: The belt drive; Stop 32: The weightometer | P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv requires The belt drive for the independent record or test. |
| 9 | Rope Shop → The Bank; Stop 33: The rope bench; Stop 34: The rope bench; Stop 35: The depth indicator; Stop 36: The signal board | ω=1.25 rad/s; Tperiod=2π/ω≈5.03 s requires The depth indicator for the independent record or test. |
| 10 | Shaft and Brake House → Rope Shop; Stop 37: The March board; Stop 38: The March board; Stop 39: The rope bench; Stop 40: The rope bench | xmax=v0/ω=1.60 m at t=π/(2ω)≈1.26 s requires The rope bench for the independent record or test. |
| 11 | Shaft and Brake House → The Bank → Winder House; Stop 41: The pad bench; Stop 42: The profile desk; Stop 43: The test wind trace; Stop 44: The winder desk | d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v requires The test wind trace for the independent record or test. |
| 12 | The Bank → Rope Shop → Winder House; Stop 45: The depth indicator; Stop 46: The rope bench; Stop 47: The test wind trace; Stop 48: The winder desk | v=2.0 m/s: P=320 kW and d_bound=3.6 m; faster listed speeds fail stopping requires The test wind trace for the independent record or test. |

## 7.1 Persistent world-state ledger

| Day | Persists after successful completion | Next visible problem |
|---:|---|---|
| 1 | The fast start is removed from the passenger schedule. Every completed stop slip stays in the log. | But Ewan Price’s faster timetable also rests on a drum drawing that leaves out a hole in the steel. |
| 2 | The old drum drawing receives a superseded tag. Every completed stop slip stays in the log. | Now Mara Shaw must defend the next load record: 12,000 kg of rope hangs above the cage. |
| 3 | The rope limit is written beside the measured length. Every completed stop slip stays in the log. | Yet Ewan Price still needs the motor to pull that steel and speed up the drum before he can keep his promise. |
| 4 | The start control gains a tested acceleration stop. Every completed stop slip stays in the log. | Now Ada Kerr has enough torque for a start, but the full 1,200 m lift still needs an energy page. |
| 5 | The energy page is accepted while the brake page stays open. Every completed stop slip stays in the log. | But Ivo Reed has broken bin bolts and a tripping belt, so lost ore time adds pressure to Ewan’s schedule. |
| 6 | A staged chute is marked for installation beside the bin. Every completed stop slip stays in the log. | Now Nia Cole must explain two readings that do not match, before a small gravity change is blamed for March. |
| 7 | The drift correction is attached to the load table. Every completed stop slip stays in the log. | Yet Ewan Price’s timetable still asks the motor to supply energy faster than it may be able to. |
| 8 | The cruise proposal is reduced while the brake restriction remains. Every completed stop slip stays in the log. | But Mara Shaw’s test mass keeps bouncing after its support stops, just as Finn’s cage did in March. |
| 9 | The drum-only stop prediction receives an incomplete-model tag. Every completed stop slip stays in the log. | Now Ada Kerr must unseal the March tape and test the model against the delay her old check missed. |
| 10 | The March board replaces the sealed inquiry drawer. Every completed stop slip stays in the log. | Yet Ada Kerr’s new empty pass faces a lower warm-pad brake limit, so explaining March has not cleared Ewan’s schedule. |
| 11 | The empty-test approval is narrowed to its tested load. Every completed stop slip stays in the log. | Now Ruth Bell needs the last unoccupied wind and a signed range before the inspector can clear passenger access. |
| 12 | The signed range and unoccupied acceptance unlock the passenger gate. Every completed stop slip stays in the log. | Now Ruth Bell can call the shift forward, but Ewan Price’s posted limits must hold even when production falls behind. |

## 7.2 Mission answer ledger

| Day | Question | Actual answer | Four-stop evidence chain | Visible consequence | Next problem |
|---:|---|---|---|---|---|
| 1 | Can the proposed start be used for passenger trips? | Reject the proposed start; its acceleration exceeds the trial limit. | Read the motion record → Differentiate the proposed start → Test the displacement → Commit the day’s plan | The fast start is removed from the passenger schedule. | But Ewan Price’s faster timetable also rests on a drum drawing that leaves out a hole in the steel. |
| 2 | Which drum inertia belongs in the winding model? | Use 45,000 kg m² and retire the old solid-disk value. | Rope-contact radius → Integrate the ring → Check the drum drawing → Commit the day’s plan | The old drum drawing receives a superseded tag. | Now Mara Shaw must defend the next load record: 12,000 kg of rope hangs above the cage. |
| 3 | Does the proposed one-unit acceleration pass the rope pull limit? | The one-unit acceleration passes the stated pull limit, with a massive-rope model. | Choose what the force acts on → Sum the moving rope → Load the sample model → Commit the day’s plan | The rope limit is written beside the measured length. | Yet Ewan Price still needs the motor to pull that steel and speed up the drum before he can keep his promise. |
| 4 | Which starting acceleration can the motor supply? | Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit. | Drum angular acceleration → Add the two torque demands → Check the faster start → Commit the day’s plan | The start control gains a tested acceleration stop. | Now Ada Kerr has enough torque for a start, but the full 1,200 m lift still needs an energy page. |
| 5 | Does the lift energy budget clear the emergency stop? | The full lift energy budget passes, but it does not certify an emergency stop. | Set the energy boundary → Lift a rope one piece at a time → Drum motion energy → Commit the day’s plan | The energy page is accepted while the brake page stays open. | But Ivo Reed has broken bin bolts and a tripping belt, so lost ore time adds pressure to Ewan’s schedule. |
| 6 | Which feed change protects the conveyor and bin? | Spread the incoming momentum change over more time with the staged chute. | Explain the belt trips → Derive the force of the stream → Mean bin impact force → Commit the day’s plan | A staged chute is marked for installation beside the bin. | Now Nia Cole must explain two readings that do not match, before a small gravity change is blamed for March. |
| 7 | Can the local gravity correction explain the March overrun? | Use the corrected survey value, but reject gravity as the explanation of the delayed overrun. | Find the drifting reference → Derive the ideal depth trend → Separate survey from assumption → Commit the day’s plan | The drift correction is attached to the load table. | Yet Ewan Price’s timetable still asks the motor to supply energy faster than it may be able to. |
| 8 | Which cruise speed fits the motor power limit? | Cap cruise at 3.5 m/s pending the emergency-stop test. | Recall the full-length pull → Turn lift work into power → Check a scaled steady drive → Commit the day’s plan | The cruise proposal is reduced while the brake restriction remains. | But Mara Shaw’s test mass keeps bouncing after its support stops, just as Finn’s cage did in March. |
| 9 | Can a drum stop time alone predict when the cage stops? | No; the rope and cage have their own oscillation period. | Distinguish mass from stiffness → Derive the bounce period → Read an independent period → Commit the day’s plan | The drum-only stop prediction receives an incomplete-model tag. | Now Ada Kerr must unseal the March tape and test the model against the delay her old check missed. |
| 10 | What caused the cage to overrun its March landing? | The moving cage continued into an elastic oscillation after the drum stopped. | Read the three independent records → Reconstruct the overshoot → Keep the inquiry test honest → Commit the day’s plan | The March board replaces the sealed inquiry drawer. | Yet Ada Kerr’s new empty pass faces a lower warm-pad brake limit, so explaining March has not cleared Ewan’s schedule. |
| 11 | Does the empty test authorize the faster passenger profile? | Reject that authorization; loaded warm-pad stopping needs the slower candidate. | Read the certificate conditions → Bound the stopping travel → Test a warm loaded surrogate → Commit the day’s plan | The empty-test approval is narrowed to its tested load. | Now Ruth Bell needs the last unoccupied wind and a signed range before the inspector can clear passenger access. |
| 12 | Which complete profile can be signed for the defined operating range? | Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance. | Commit the empty acceptance prediction → Combine the signed limits → Check the independent safety margin → Commit the day’s plan | The signed range and unoccupied acceptance unlock the passenger gate. | Now Ruth Bell can call the shift forward, but Ewan Price’s posted limits must hold even when production falls behind. |

## 7.3 Campaign-local format contract sheet

| Format | Player verb | stopKind / placement | Required block and minima | Trap and concealment |
|---|---|---|---|---|
| CHOICE | decide | decision / named owner at declared object | question, four choices, one answer, why, rebuttals for each wrong | No answer-length cue; key hidden; no slash bundles |
| DERIVE | derive | calculation / room desk or board | derive start, non-answer goal, steps with exactly two choices and one key each; own wrong why and survives | Randomize sides; no keyed result in goal; wrong line substantial |
| VERIFY | predict, operate, measure, compare | operated / named equipment | verify predictionRange, truth, positive costed measurement, tolerance, correct_action, answerText | Truth in range and legal wrong predictions; hidden truth until READ |
| BALLPARK | calculate with quantity tiles | calculation / room desk | estimate labels/values, numeric slots, index correct, slot-letter formula, numeric target/correctResult, units, tolerance | Wrong tiles available; target and correct indexes hidden |
| PROTOCOL | match evidence and response | calculation / room board | scenarios and choices with IDs; total permutation mapping | Every mismatch receives row-specific mechanism plus selected response contrast |
| PROBE | inspect stations | operated / named equipment | probe ≥4 stations each reading, expected, load; target resolves; correctConclusion | Observe all stations before submission; no highlighted target |
| DIAGNOSIS | diagnose from all readings | calculation / room evidence panel | headline, ≥3 full readings with status, four explanations, one answer and per-wrong rebuttals | Quiet control matters; no key-length cue |
| SEQUENCE | order evidence dependencies | calculation / room desk | cards, exact order, legal constraints | Starting order randomized; every wrong ordering identifies the first reversed dependency |

These contracts use supplied QUESTION_TYPES and Master Brief v3.3 provisionally; the unavailable importer is still the highest authority at conversion. No suspended format is used. One typed interaction belongs to each stop. Counts: {'PROTOCOL': 5, 'DERIVE': 12, 'VERIFY': 8, 'CHOICE': 12, 'BALLPARK': 5, 'PROBE': 2, 'DIAGNOSIS': 3, 'SEQUENCE': 1}.

---
# Mission 1 — THE CAGE THAT KEPT GOING

## A. Mission briefing card — exact player copy

**Header:** DAY 1 OF 12 — INSPECTION IN 12 DAYS

**Card title:** THE CAGE THAT KEPT GOING

**Go now:** Go to The Bank and meet Ruth Bell, cage operator, at The profile desk.

**Card body (51 words; 4 sentences):** The March stop left the cage past its landing, and the mine now wants faster trips. A rope pulls the cage that holds the shift. At the Bank, check the planned motion with a small test. By the end of the mission, you decide if the fast start can carry people.

**Objective:** Can the proposed start be used for passenger trips?

**Stake — exact player copy:** Today you decide if Ruth can put the fast start on the shift sheet that includes her brother.

**Segue — exact player copy:** But Ewan Price’s faster timetable also rests on a drum drawing that leaves out a hole in the steel.

### Worth knowing first — exact player copy

#### Glossary terms

Velocity: speed with a direction.

Acceleration: the rate at which velocity changes.

Derivative: the instantaneous rate at which a quantity changes.

Integral: an accumulated total found from a rate.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- A slope and an area answer different questions about the same motion.

#### Equations first needed today

**Equation:** v = dy/dt; a = dv/dt; Δy = ∫v dt

**What it is for:** calculus kinematics and reference frames in the measured system.

**Symbols:** y position in metres; t time in seconds; v velocity in metres per second; a acceleration in metres per second squared; Δy change in position.

**Why this campaign needs it:** Can the proposed start be used for passenger trips?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. For y=3t² metres, differentiate to obtain v=6t metres per second; at t=2 seconds, v=12 metres per second.

2. For v=5t metres per second from t=0 to 3 seconds, integrate: Δy=[5t²/2]₀³=22.5 metres.

3. A cart starts at 2 metres per second with acceleration 3 metres per second squared for 2 seconds; v=2+3×2=8 metres per second.

4. A ball leaves a table horizontally at 3 metres per second from height 5 metres with g=10 metres per second squared; t=√(2h/g)=1 second and range=3 metres.

5. A platform moves east at 4 metres per second and a walker moves east at 1 metre per second relative to it; ground velocity is 4+1=5 metres per second.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** No later room unlock is required in this local investigation.

## B. Main story happening — designer summary

The fast start is removed from the passenger schedule. The day moves from read the motion record through differentiate the proposed start and test the displacement to the owner’s signed decision. The drum record lists a shape that no longer matches the drum. Ruth takes the fast-start sheet off the shift board. Her brother Finn’s tally stays on the hook with the other forty; no one boards for a test.

## C. Designer intent — not shown to player

Reject the proposed start; its acceleration exceeds the trial limit. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D1-ARR — On arrival at The Bank

**Location:** The Bank.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ruth Bell, by radio:** “Finn was in that cage. I want to know when the cage stops, not just when its drum does.”

**Dialogue bubble — Ada Kerr, by radio:** “My March check recorded the drum. Today we start with what the proposed motion actually demands.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 1.

### Beat OW-D1-R2 — After Stop 2

**Location:** The Bank.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** a(t)=2 m/s². The accepted result stays in the log beside the next unresolved test.

**Panel text:** “a(t)=2 m/s². The accepted result stays in the log beside the next unresolved test.”

**Dialogue bubble — Ada Kerr, by radio:** “That acceleration exceeds the trial limit. My old check cannot turn it into permission.”

**Dialogue bubble — Ruth Bell, by radio:** “Keep it on the page. I can explain a closed gate if the reason is there.”

**Unlocks:** Stop 3.

### Beat OW-D1-R3 — After Stop 3 is accepted

**Location:** Current Stop 3 fixture (The Bank, The depth indicator (`depth-dial`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 3 evidence is retained; no additional state or reward.

**Dialogue bubble — Ruth Bell, by radio:** “The separate displacement check is in. Leave the fast-start sheet within reach while we decide.”

**Unlocks:** No new gate; continue to existing Stop 4.

### Beat OW-D1-DEC — After Stop 4

**Location:** The Bank.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Reject the proposed start; its acceleration exceeds the trial limit.

**Panel text:** “Reject the proposed start; its acceleration exceeds the trial limit.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D1-END — At mission end

**Location:** The Bank.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The fast start is removed from the passenger schedule. The drum record lists a shape that no longer matches the drum.

**Panel text:** “Ruth takes the fast-start sheet off the shift board. Her brother Finn’s tally stays on the hook with the other forty; no one boards for a test. But Ewan Price’s faster timetable also rests on a drum drawing that leaves out a hole in the steel.”

**Dialogue bubble — Finn Bell, by radio:** “My tally can stay on that hook. Tell me what will be different before I take it.”

**Dialogue bubble — Ruth Bell, by radio:** “The new check will follow the cage. You will not ride in a test.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-start-sheet

**Home:** `signal-board`. **Before:** Posted fast-start proposal. **After — exact action:** Ruth removes the proposal and clips it behind the restricted sheet.

**Trigger:** accepted_stop_4. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**1 locations:** The Bank.

- Stop 1: The Bank, The profile desk (`profile-desk`).
- Stop 2: The Bank, The profile desk (`profile-desk`).
- Stop 3: The Bank, The depth indicator (`depth-dial`).
- Stop 4: The Bank, The signal board (`signal-board`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ruth Bell, cage operator, owns the BANK evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Motion and derivatives distinguish a position from its rate and a rate from its accumulation. The coordinate direction must remain fixed across the record. Agreement with one curve does not independently establish safe acceleration or stopping. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 1 — Read the motion record

**Format/placement:** PROTOCOL, The Bank — The profile desk.

**Required stop kind:** calculation. **Player verb:** Match every evidence row to one response

**Metadata:** Concept: 1 — Read the motion record; Keystone: Motion and derivatives, Models and evidence; Area: BANK; Prerequisites: Opening algebra and calculus primer; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Can the proposed start be used for passenger trips?

**Actual mission answer — authoring only:** Reject the proposed start; its acceleration exceeds the trial limit.

**Call — exact player copy:** Go to The Bank and inspect The profile desk.

**Stop reason — exact player copy:** The March record must be understood before the fast start is restored.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ruth Bell notes that the March record follows the drum, but the passenger cage passed its landing after the drum was still. Read what the motion graphs actually measure before deciding which parts of the proposed faster start can be trusted.

**Question card story-science connection — exact player copy:** The meaning of a motion record determines which part of the passenger proposal can be approved.

**Data/readings — exact player copy:** Position curve has a constant positive slope; Velocity graph rises linearly from rest; Velocity graph encloses positive area

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Position curve has a constant positive slope
  reading: Position curve has a constant positive slope
- id: e2
  label: Velocity graph rises linearly from rest
  reading: Velocity graph rises linearly from rest
- id: e3
  label: Velocity graph encloses positive area
  reading: Velocity graph encloses positive area
choices:
- id: r1
  label: Velocity is constant upward
- id: r2
  label: Acceleration is constant upward
- id: r3
  label: Net displacement is upward
mapping:
  e1: r1
  e2: r2
  e3: r3
answerText: A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows.
```

**Question card prompt — exact player copy:** Match every evidence row to one response; use each response once and submit all connections.

**Correct result:** Position curve has a constant positive slope → Velocity is constant upward; Velocity graph rises linearly from rest → Acceleration is constant upward; Velocity graph encloses positive area → Net displacement is upward. Acceptance: exact authored key.

**Answer text:** A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows.

**Why/mechanism:** A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows. The evidence ‘Position curve has a constant positive slope’ requires the response ‘Velocity is constant upward’. The evidence ‘Velocity graph rises linearly from rest’ requires the response ‘Acceleration is constant upward’. The evidence ‘Velocity graph encloses positive area’ requires the response ‘Net displacement is upward’. Position curve has a constant positive slope; Velocity graph rises linearly from rest; Velocity graph encloses positive area.

**Misconception:** e1.

**Wrong-path feedback:**

- **e1:** For Position curve has a constant positive slope, use Velocity is constant upward; A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows.
- **e2:** For Velocity graph rises linearly from rest, use Acceleration is constant upward; A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows.
- **e3:** For Velocity graph encloses positive area, use Net displacement is upward; A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The profile desk gains a dated evidence slip: Position curve has a constant positive slope → Velocity is constant upward; Velocity graph rises linearly from rest → Acceleration is constant upward; Velocity graph encloses positive area → Net displacement is upward

**Unlock:** Stop 2.

**Retrieval:** Opening algebra and calculus primer; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which drum inertia belongs in the winding model?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 1 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 2 — Differentiate the proposed start

**Format/placement:** DERIVE, The Bank — The profile desk.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 1 — Differentiate the proposed start; Keystone: Motion and derivatives; Area: BANK; Prerequisites: Stop 1 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Can the proposed start be used for passenger trips?

**Actual mission answer — authoring only:** Reject the proposed start; its acceleration exceeds the trial limit.

**Call — exact player copy:** Go to The Bank and inspect The profile desk.

**Stop reason — exact player copy:** The proposed start must meet the passenger acceleration limit.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ruth Bell sees that the graph review separates a position curve from the speed it implies, so the start proposal can now be read correctly. Derive its changing motion before comparing the passenger acceleration with the limit on the trial sheet.

**Question card story-science connection — exact player copy:** The meaning of a motion record determines which part of the passenger proposal can be approved.

**Data/readings — exact player copy:** Upward y(t)=t² metres for 0≤t≤4 seconds; y(0)=0.

**Format-specific interaction block:**
```yaml
derive:
  start: Upward y(t)=t² metres for 0≤t≤4 seconds; y(0)=0.
  goal: Obtain velocity and acceleration as functions of time.
  steps:
  - id: line1
    prompt: Differentiate position with respect to time.
    choices:
    - line: v(t)=2t m/s
      correct: true
    - line: v(t)=t² m/s
      correct: false
      survives: true
      why: Copying the position expression leaves the time dependence unchanged and does not calculate velocity.
  - id: line2
    prompt: Differentiate velocity with respect to time.
    choices:
    - line: a(t)=2 m/s²
      correct: true
    - line: a(t)=2t m/s²
      correct: false
      survives: true
      why: The derivative of 2t is constant; keeping t confuses velocity with acceleration.
  - id: line3
    prompt: Substitute t=4 s into the derived velocity.
    choices:
    - line: v(4)=2×4=8 m/s
      correct: true
    - line: v(4)=4²=16 m/s
      correct: false
      survives: true
      why: Squaring time repeats the position rule instead of substituting into v=2t.
  answerText: The power rule changes t² into 2t and then into 2; the proposed upward start therefore has constant acceleration, not constant speed.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** a(t)=2 m/s². Acceptance: exact authored key.

**Answer text:** The power rule changes t² into 2t and then into 2; the proposed upward start therefore has constant acceleration, not constant speed.

**Why/mechanism:** The power rule differentiates y=t² to v=2t and then differentiates velocity to a=2. The first expression has units of metres per second, while the second has units of metres per second squared. Copying the position expression cannot calculate its slope. Keeping the time factor in the acceleration would instead describe a velocity curve with changing slope. The actual proposed start has constant upward acceleration throughout the stated four-second interval, so that constant must be compared with the passenger trial limit.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Copying the position expression leaves the time dependence unchanged and does not calculate velocity.
- **2:** The derivative of 2t is constant; keeping t confuses velocity with acceleration.
- **3:** Squaring time repeats the position rule instead of substituting into v=2t.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The profile desk gains a dated evidence slip: a(t)=2 m/s²

**Unlock:** Stop 3.

**Retrieval:** Stop 1 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which drum inertia belongs in the winding model?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 2 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 3 — Test the displacement

**Format/placement:** VERIFY, The Bank — The depth indicator.

**Required stop kind:** operated. **Player verb:** First, calculate and commit upward displacement in m from the visible data. OPERATE: run the four-second encoder replay. Keep the time interval and velocity law fixed. MEASURE: press READ once after the run and record upward displacement. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 1 — Test the displacement; Keystone: Motion and derivatives, Models and evidence; Area: BANK; Prerequisites: Stop 2 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Can the proposed start be used for passenger trips?

**Actual mission answer — authoring only:** Reject the proposed start; its acceleration exceeds the trial limit.

**Call — exact player copy:** Go to The Bank and inspect The depth indicator.

**Stop reason — exact player copy:** The planned travel needs a prediction before the replay can test it.

**Question card story setup — exact player copy (40 words; 2 sentences):** Ruth Bell confirms that the derived start rises faster each second, and its predicted travel must match a separate position record. Commit the distance before running the replay so an agreeable display cannot substitute for a prediction made in advance.

**Question card story-science connection — exact player copy:** The meaning of a motion record determines which part of the passenger proposal can be approved.

**Data/readings — exact player copy:** Isolated encoder replay: v(t)=2t m/s, 0≤t≤4 s; initial position 0 m; displacement is ∫v dt.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit upward displacement in m before RUN unlocks.
  predictionRange:
    min: 0
    max: 40
    step: 1
    unit: m
  truth: 16
  measurement:
    label: upward displacement
    cost: 1
  tolerance: 0.1
  correct_action: SUPPORTS MODEL
  answerText: ∫₀⁴2t dt=[t²]₀⁴=16 m. The replay gives 16 m, supporting the motion record.
```

**Question card prompt — exact player copy:** First, calculate and commit upward displacement in m from the visible data. OPERATE: run the four-second encoder replay. Keep the time interval and velocity law fixed. MEASURE: press READ once after the run and record upward displacement. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 16 m; SUPPORTS MODEL. Acceptance: 0.1.

**Answer text:** ∫₀⁴2t dt=[t²]₀⁴=16 m. The replay gives 16 m, supporting the motion record.

**Why/mechanism:** ∫₀⁴2t dt=[t²]₀⁴=16 m. The replay gives 16 m, supporting the motion record. Using final acceleration as speed loses the integral. The alternative ‘32 m’ fails for this reason: Final speed times full time ignores the rise from rest. The alternative ‘REJECTS MODEL’ fails for this reason: The recorded displacement agrees with the committed integral. Isolated encoder replay: v(t)=2t m/s, 0≤t≤4 s; initial position 0 m; displacement is ∫v dt.

**Misconception:** 8 m.

**Wrong-path feedback:**

- **8 m:** Using final acceleration as speed loses the integral.
- **32 m:** Final speed times full time ignores the rise from rest.
- **REJECTS MODEL:** The recorded displacement agrees with the committed integral.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The depth indicator gains a dated evidence slip: 16 m; SUPPORTS MODEL

**Unlock:** Stop 4.

**Retrieval:** Stop 2 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which drum inertia belongs in the winding model?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 3 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 4 — Commit the day’s plan

**Format/placement:** CHOICE, Ruth Bell at The signal board.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 1 — Commit the day’s plan; Keystone: Motion and derivatives, Constraints and uncertainty; Area: BANK; Prerequisites: Stop 3 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** Can the proposed start be used for passenger trips?

**Actual mission answer — authoring only:** Reject the proposed start; its acceleration exceeds the trial limit.

**Call — exact player copy:** Go to The Bank and meet Ruth Bell, cage operator, at The signal board.

**Stop reason — exact player copy:** A matching replay still leaves the passenger limit to check.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ruth Bell finds that the replay agrees with the calculated travel, but the passenger trial also has a separate acceleration limit. Use both results to tell the operator whether this particular start belongs on the schedule while the overrun remains under investigation.

**Question card story-science connection — exact player copy:** The meaning of a motion record determines which part of the passenger proposal can be approved.

**Data/readings — exact player copy:** Recorded start: a=2 m/s²; campaign passenger-trial limit a≤1.5 m/s²; replay displacement=16 m; no brake or rope compliance test has occurred.

**Format-specific interaction block:**
```yaml
question: Can the proposed start be used for passenger trips?
choices:
- Reject this start and retain the slower schedule.
- Approve this start because the replay agrees.
- Approve this start because it lasts four seconds.
- Cancel every future trip without further tests.
answer: Reject this start and retain the slower schedule.
why: The tested calculation is internally correct but violates the stated acceleration constraint; the old slower schedule remains under review.
rebuttals:
  Approve this start because the replay agrees.: Agreement validates the motion calculation, not compliance with the 1.5 m/s² limit.
  Approve this start because it lasts four seconds.: Duration does not reduce the 2 m/s² acceleration.
  Cancel every future trip without further tests.: This trial rejects one profile; it does not establish that every slower profile fails.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Reject this start and retain the slower schedule.. Acceptance: exact authored key.

**Answer text:** The tested calculation is internally correct but violates the stated acceleration constraint; the old slower schedule remains under review.

**Why/mechanism:** The tested calculation is internally correct but violates the stated acceleration constraint; the old slower schedule remains under review. The alternative ‘Approve this start because the replay agrees.’ fails for this reason: Agreement validates the motion calculation, not compliance with the 1.5 m/s² limit. The alternative ‘Cancel every future trip without further tests.’ fails for this reason: This trial rejects one profile; it does not establish that every slower profile fails.

**Misconception:** Approve this start because the replay agrees..

**Wrong-path feedback:**

- **Approve this start because the replay agrees.:** Agreement validates the motion calculation, not compliance with the 1.5 m/s² limit.
- **Approve this start because it lasts four seconds.:** Duration does not reduce the 2 m/s² acceleration.
- **Cancel every future trip without further tests.:** This trial rejects one profile; it does not establish that every slower profile fails.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The signal board gains a dated evidence slip: Reject this start and retain the slower schedule.

**Unlock:** Day 1 outcome and recovery allocation.

**Retrieval:** Stop 3 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which drum inertia belongs in the winding model?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 4 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Reject the fast start. Its speed grows too fast for the stated limit. The slow schedule stays in place. The old drum drawing is now on the desk. Ruth takes the fast-start sheet off the shift board. Her brother Finn’s tally stays on the hook with the other forty; no one boards for a test.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 1 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The fast start is removed from the passenger schedule. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +3 | Workshop Reserve -1 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [4, 0, 0, 0]; bars [49, 48, 74, 67]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- A slope gives a rate, while an area accumulates that rate; the plotted quantity determines which physical result follows..
- The power rule changes t² into 2t and then into 2; the proposed upward start therefore has constant acceleration, not constant speed..
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** A correct motion calculation can still fail a safety limit.

---

### GO DEEPER — Mission 1 — optional exact player copy

**Availability:** After mission_complete_1, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Try motion records for a cart and a falling package. Use slopes for instantaneous rates and signed areas for displacement; then decide what each measurement can establish.

**Supporting concepts:**

- Instantaneous velocity is the derivative of position: v=dx/dt. Differentiate before substituting a time.
- Displacement is the signed integral of velocity. Distance instead adds the magnitudes of motion in both directions.
- Acceleration is dv/dt. A zero velocity at one instant does not require zero acceleration.
- Independent checks use a separately obtained observation; differentiating and integrating the same fitted curve do not create independent evidence.

#### OW-GD-M1-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cart has x(t)=2t³−3t metres. What is its velocity at t=2 s?

- **A.** 10 m/s
- **B.** 21 m/s
- **C.** 24 m/s
- **D.** 9 m/s

**Correct key:** B

**Hint:** Find dx/dt before inserting t.

**Feedback A:** 10 is the position in metres at 2 s, not the derivative in m/s.

**Feedback B:** Differentiate to get 6t²−3, then substitute 2 s.

**Feedback C:** The derivative of −3t is −3, which must remain.

**Feedback D:** The squared time in 6t² cannot be replaced by t.

**Independent solution:** v=6t²−3; v(2)=24−3=21 m/s.

#### OW-GD-M1-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cart travels at +3 m/s for 2 s, then −2 m/s for 1 s. What are its displacement and distance?

- **A.** 8 m; 8 m
- **B.** 4 m; 4 m
- **C.** 4 m; 8 m
- **D.** 1 m; 5 m

**Correct key:** C

**Hint:** Calculate the length of each leg first.

**Feedback A:** Displacement must subtract the return leg.

**Feedback B:** Distance counts the return leg positively.

**Feedback C:** Signed motion is 6−2; distance is 6+2.

**Feedback D:** Velocity values cannot be added without their durations.

**Independent solution:** Forward leg=6 m; reverse leg=2 m. Displacement=4 m, distance=8 m.

#### OW-GD-M1-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** At the top of a vertical throw, neglect air resistance and use upward positive. Which pair describes velocity and acceleration?

- **A.** 0; −g
- **B.** 0; 0
- **C.** +g; 0
- **D.** −g; −g

**Correct key:** A

**Hint:** Distinguish a turning point from force balance.

**Feedback A:** The velocity is momentarily zero while gravity still accelerates downward.

**Feedback B:** Gravity does not switch off at the turning point.

**Feedback C:** g is an acceleration, not a velocity.

**Feedback D:** Velocity and acceleration have different units; velocity is zero here.

**Independent solution:** At maximum height v=0 and a=−g.

#### OW-GD-M1-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A velocity graph rises linearly from 2 to 8 m/s over 3 s. How far does the cart move?

- **A.** 18 m
- **B.** 24 m
- **C.** 10 m
- **D.** 15 m

**Correct key:** D

**Hint:** For a straight-line graph, use the average of the endpoint velocities.

**Feedback A:** This uses the velocity change times time, not the area under velocity.

**Feedback B:** The final speed is not maintained for all 3 seconds.

**Feedback C:** The mean speed is 5 m/s and acts for 3 seconds.

**Feedback D:** The trapezoid area is (2+8)×3/2.

**Independent solution:** Δx=[(v_initial+v_final)/2]Δt=[(2+8)/2]×3=15 m.

#### OW-GD-M1-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A package leaves a horizontal table at 4 m/s from height 1.25 m. With g=10 m/s² and no drag, how far horizontally does it travel before impact?

- **A.** 0.5 m
- **B.** 2 m
- **C.** 5 m
- **D.** 8 m

**Correct key:** B

**Hint:** Use h=gt²/2 for time, then horizontal distance=vt.

**Feedback A:** 0.5 is the fall time in seconds, not the horizontal range.

**Feedback B:** The fall takes 0.5 s and horizontal speed remains 4 m/s.

**Feedback C:** Multiplying speed by height mixes incompatible quantities.

**Feedback D:** The fall time is not 2 s.

**Independent solution:** t=sqrt(2×1.25/10)=0.5 s; range=4×0.5=2 m.

#### OW-GD-M1-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A fitted position curve predicts a cart travels 15 m in an interval. Which is an independent check of that prediction?

- **A.** Differentiate the fitted curve
- **B.** Integrate that derivative
- **C.** Measure the interval travel with a separate calibrated distance sensor
- **D.** Measure the fitted curve’s plotted length with a ruler

**Correct key:** C

**Hint:** Ask where the new evidence comes from.

**Feedback A:** This derives another quantity from the same fitted evidence.

**Feedback B:** This recovers the fitted displacement, not a new observation.

**Feedback C:** A separately obtained displacement can test the prediction.

**Feedback D:** That still measures a representation of the same fitted evidence.

**Independent solution:** Only the separate calibrated distance observation is independent of the fitted curve.


# Mission 2 — STEEL OUTSIDE THE AXIS

## A. Mission briefing card — exact player copy

**Header:** DAY 2 OF 12 — INSPECTION IN 11 DAYS

**Card title:** STEEL OUTSIDE THE AXIS

**Go now:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Card body (51 words; 4 sentences):** The fast start is held, but the drum record may be wrong too. Steel far from the shaft makes a drum harder to speed up. At the Winder House, check its shape against the old drawing. By the end of the mission, you decide which drum model belongs in the plan.

**Objective:** Which drum inertia belongs in the winding model?

**Stake — exact player copy:** Today you decide which drum record Ewan must use, even if it breaks the timetable he promised.

**Segue — exact player copy:** Now Mara Shaw must defend the next load record: 12,000 kg of rope hangs above the cage.

### Worth knowing first — exact player copy

#### Glossary terms

Rotational inertia: a measure of how mass distribution resists changes in turning speed.

Axis: the line around which an object turns.

Annulus: a ring with an inner and an outer radius.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- Keep each earlier accepted result attached to the model assumptions that produced it.

#### Equations first needed today

**Equation:** I = ∫r² dm; v = Rω

**What it is for:** mass distribution and rotational inertia in the measured system.

**Symbols:** I rotational inertia in kilogram metres squared; r distance of a mass element dm from the axis in metres; R rope-contact radius in metres; ω angular speed in radians per second; v rope speed in metres per second.

**Why this campaign needs it:** Which drum inertia belongs in the winding model?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A 6 kilogram hoop of radius 0.5 metres has I=MR²=6×0.25=1.5 kilogram metres squared.

2. A uniform 8 kilogram disk of radius 1 metre has I=MR²/2=4 kilogram metres squared.

3. For a 3 kilogram object with Icm=2 kilogram metres squared, shifting the parallel axis by 2 metres gives I=2+3×4=14 kilogram metres squared.

4. A wheel of radius 0.25 metres rolls without slipping at 2 metres per second; ω=v/R=8 radians per second.

5. A uniform rod of mass 12 kilograms and length 2 metres has Icm=ML²/12=4 kilogram metres squared; about an end it has I=ML²/3=16 kilogram metres squared.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** No later room unlock is required in this local investigation.

## B. Main story happening — designer summary

The old drum drawing receives a superseded tag. The day moves from rope-contact radius through integrate the ring and check the drum drawing to the owner’s signed decision. The rope record lists more hanging steel than the cage and its load. Ewan marks the old drum drawing superseded in his own hand. The first record behind his promised timetable has failed a physical check.

## C. Designer intent — not shown to player

Use 45,000 kg m² and retire the old solid-disk value. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D2-ARR — On arrival at Winder House

**Location:** Winder House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ewan Price, by radio:** “I priced those extra trips using the old drum drawing. If the steel is different, my timetable is too.”

**Dialogue bubble — Mara Shaw, by radio:** “Then let the measured drum settle it before we blame the rope.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 5.

### Beat OW-D2-R2 — After Stop 6

**Location:** Winder House.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** I=M(A²+B²)/2=45000 kg m². The accepted result stays in the log beside the next unresolved test.

**Panel text:** “I=M(A²+B²)/2=45000 kg m². The accepted result stays in the log beside the next unresolved test.”

**Dialogue bubble — Mara Shaw, by radio:** “The removed centre and outer steel do not contribute the same inertia per kilogram.”

**Dialogue bubble — Ewan Price, by radio:** “I used the mass as if its position did not matter. Mark that drawing as superseded.”

**Unlocks:** Stop 7.

### Beat OW-D2-R3 — After Stop 7 is accepted

**Location:** Current Stop 7 fixture (Winder House, The drum (`drum`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 7 evidence is retained; no additional state or reward.

**Dialogue bubble — Ewan Price, by radio:** “The independent check agrees with the revised drum model. I can no longer use the old drawing's smaller demand.”

**Unlocks:** No new gate; continue to existing Stop 8.

### Beat OW-D2-DEC — After Stop 8

**Location:** Winder House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Use 45,000 kg m² and retire the old solid-disk value.

**Panel text:** “Use 45,000 kg m² and retire the old solid-disk value.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D2-END — At mission end

**Location:** Winder House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The old drum drawing receives a superseded tag. The rope record lists more hanging steel than the cage and its load.

**Panel text:** “Ewan marks the old drum drawing superseded in his own hand. The first record behind his promised timetable has failed a physical check. Now Mara Shaw must defend the next load record: 12,000 kg of rope hangs above the cage.”

**Dialogue bubble — Ewan Price, by radio:** “The obsolete drawing is tagged. I have to revise my promise before someone builds a shift around it.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-drum-tag

**Home:** `drum`. **Before:** Obsolete drawing has no warning tag. **After — exact action:** Ewan ties the superseded tag through the drawing clip.

**Trigger:** accepted_stop_8. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**1 locations:** Winder House.

- Stop 5: Winder House, The winder desk (`winder-desk`).
- Stop 6: Winder House, The winder desk (`winder-desk`).
- Stop 7: Winder House, The drum (`drum`).
- Stop 8: Winder House, The winder desk (`winder-desk`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Mass distribution matters because each mass element is weighted by its squared distance from the selected axis. The correct shape and axis are therefore evidence, not decorative geometry. Total mass alone cannot select the inertia or the subsequent torque. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 5 — Rope-contact radius

**Format/placement:** BALLPARK, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Choose the quantity tiles for the displayed formula a/b

**Metadata:** Concept: 1 — Rope-contact radius; Keystone: Motion and derivatives, Torque and rotation; Area: WIND; Prerequisites: Stop 4 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which drum inertia belongs in the winding model?

**Actual mission answer — authoring only:** Use 45,000 kg m² and retire the old solid-disk value.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The working radius must be known before the drum model is corrected.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ewan Price notes that the rejected start puts the drum record under review, and its contact radius must be established before any torque calculation. Use the paired speed readings to identify the working radius rather than trusting the old drawing beside the desk.

**Question card story-science connection — exact player copy:** The meaning of a motion record determines which part of the passenger proposal can be approved.

**Data/readings — exact player copy:** Tachometer ω=3 rad/s and rope speed v=6 m/s; no slip at the drum; R=v/ω.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Rope-contact radius
  labels:
  - rim speed (m/s)
  - angular speed (rad/s)
  - half-turn distractor
  values:
  - 6
  - 3
  - 2
  slots: 2
  template: Use the labeled quantities to fill 2 blanks.
  formula: a/b
  correct:
  - 0
  - 1
  target: 2
  tolerance: 0.01
  units: m
  correctResult: 2
answerText: R=6/3=2 m; the rope-contact radius is not the drum diameter.
```

**Question card prompt — exact player copy:** Choose the quantity tiles for the displayed formula a/b; submit the resulting rope-contact radius in m.

**Correct result:** 2 m. Acceptance: 0.01.

**Answer text:** R=6/3=2 m; the rope-contact radius is not the drum diameter.

**Why/mechanism:** A point at radius R travels arc length Rθ when the drum rotates through angle θ. Differentiating with respect to time gives the no-slip speed relation v=Rω. The paired readings therefore give R=6/3=2 m. A diameter would be twice this distance and cannot be substituted for the torque arm. Multiplying the two speeds would also have the wrong units for a radius. The measured contact radius is the geometric link needed before the drum’s inertia and motor demand can be compared.

**Misconception:** 4 m.

**Wrong-path feedback:**

- **4 m:** Doubling v/ω substitutes diameter for radius.
- **18 m:** Multiplication violates v=Rω.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: 2 m

**Unlock:** Stop 6.

**Retrieval:** Stop 4 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the proposed one-unit acceleration pass the rope pull limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 5 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 6 — Integrate the ring

**Format/placement:** DERIVE, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 3 — Integrate the ring; Keystone: Mass distribution, Torque and rotation; Area: WIND; Prerequisites: Stop 5 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which drum inertia belongs in the winding model?

**Actual mission answer — authoring only:** Use 45,000 kg m² and retire the old solid-disk value.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The central hole changes how the drum’s mass resists turning.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ewan Price sees that the speed readings establish the working radius, but the drum contains a central hole absent from its older drawing. Build the mass distribution into the inertia calculation before deciding how much turning resistance the motor must overcome.

**Question card story-science connection — exact player copy:** A measured mass distribution changes the motor demand that the crew can safely authorize.

**Data/readings — exact player copy:** Uniform drum annulus: M=18000 kg, inner radius A=1 m, outer radius B=2 m; dm=2Mr dr/(B²−A²).

**Format-specific interaction block:**
```yaml
derive:
  start: 'Uniform drum annulus: M=18000 kg, inner radius A=1 m, outer radius B=2 m; dm=2Mr dr/(B²−A²).'
  goal: Find the rotational inertia about the central axis.
  steps:
  - id: line1
    prompt: Substitute the given mass element into I=∫r² dm.
    choices:
    - line: I=2M/(B²−A²) ∫[A,B] r³ dr
      correct: true
    - line: I=2M/(B²−A²) ∫[A,B] r² dr
      correct: false
      survives: true
      why: The radial mass element contains another factor r; omitting it misweights the outer rings.
  - id: line2
    prompt: Integrate and factor B⁴−A⁴.
    choices:
    - line: I=M(A²+B²)/2=18000×(1²+2²)/2=45000 kg m²
      correct: true
    - line: I=MB²/2=18000(2²)/2=36000 kg m²
      correct: false
      survives: true
      why: The solid-disk expression assumes mass fills the missing central hole; the annular mass is farther out.
  answerText: The integral gives M(B⁴−A⁴)/(2(B²−A²)); factoring cancels the difference of squares and leaves 18000(1+4)/2=45000 kg m².
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** I=M(A²+B²)/2=45000 kg m². Acceptance: exact authored key.

**Answer text:** The integral gives M(B⁴−A⁴)/(2(B²−A²)); factoring cancels the difference of squares and leaves 18000(1+4)/2=45000 kg m².

**Why/mechanism:** The integral gives M(B⁴−A⁴)/(2(B²−A²)); factoring cancels the difference of squares and leaves 18000(1+4)/2=45000 kg m². The radial mass element contains another factor r; omitting it misweights the outer rings. The solid-disk expression assumes mass fills the missing central hole; the annular mass is farther out. Uniform drum annulus: M=18000 kg, inner radius A=1 m, outer radius B=2 m; dm=2Mr dr/(B²−A²).

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** The radial mass element contains another factor r; omitting it misweights the outer rings.
- **2:** The solid-disk expression assumes mass fills the missing central hole; the annular mass is farther out.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: I=M(A²+B²)/2=45000 kg m²

**Unlock:** Stop 7.

**Retrieval:** Stop 5 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the proposed one-unit acceleration pass the rope pull limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 6 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 7 — Check the drum drawing

**Format/placement:** PROBE, Winder House — The drum.

**Required stop kind:** operated. **Player verb:** Select and read all four stations without changing their loads, then submit the station with a mismatch and its implication. No controls need restoration.

**Metadata:** Concept: 3 — Check the drum drawing; Keystone: Mass distribution, Models and evidence; Area: WIND; Prerequisites: Stop 6 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which drum inertia belongs in the winding model?

**Actual mission answer — authoring only:** Use 45,000 kg m² and retire the old solid-disk value.

**Call — exact player copy:** Go to Winder House and inspect The drum.

**Stop reason — exact player copy:** The old drawing needs a physical dimension check.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ewan Price confirms that the annular calculation disagrees with the old solid-disk record, so the drawing needs an independent check against the machine. Inspect its dimensions and mass to find which assumption changed before discarding a record that once served the crew.

**Question card story-science connection — exact player copy:** A measured mass distribution changes the motor demand that the crew can safely authorize.

**Data/readings — exact player copy:** Compare each reading with its own expected value; Radii in m and mass in kg; identify the old drawing’s failed dimension.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: rim
    label: Outer rim
    reading: 2.0 m
    expected: 2.0 m
    load: radius
  - id: hub
    label: Inner bore
    reading: 1.0 m
    expected: 0.0 m
    load: old solid-disk drawing
  - id: mass
    label: Weighed drum
    reading: 18000 kg
    expected: 18000 kg
    load: whole drum
  - id: contact
    label: Rope contact
    reading: 2.0 m
    expected: 2.0 m
    load: working radius
  target: hub
  quantityAndUnits: Radii in m and mass in kg; identify the old drawing’s failed dimension.
  correctConclusion: The 1.0 m bore contradicts the solid-disk drawing; mass and outer radius agree, so the inertia model needs revision.
  answerText: The 1.0 m bore contradicts the solid-disk drawing; mass and outer radius agree, so the inertia model needs revision.
```

**Question card prompt — exact player copy:** Select and read all four stations without changing their loads, then submit the station with a mismatch and its implication. No controls need restoration.

**Correct result:** hub. Acceptance: exact authored key.

**Answer text:** The 1.0 m bore contradicts the solid-disk drawing; mass and outer radius agree, so the inertia model needs revision.

**Why/mechanism:** The 1.0 m bore contradicts the solid-disk drawing; mass and outer radius agree, so the inertia model needs revision. Outer rim: observed 2.0 m, expected 2.0 m; compare this pair rather than another station. Weighed drum: observed 18000 kg, expected 18000 kg; compare this pair rather than another station. The alternative ‘contact’ fails for this reason: Rope contact: observed 2.0 m, expected 2.0 m; compare this pair rather than another station.

**Misconception:** rim.

**Wrong-path feedback:**

- **rim:** Outer rim: observed 2.0 m, expected 2.0 m; compare this pair rather than another station.
- **mass:** Weighed drum: observed 18000 kg, expected 18000 kg; compare this pair rather than another station.
- **contact:** Rope contact: observed 2.0 m, expected 2.0 m; compare this pair rather than another station.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The drum gains a dated evidence slip: hub

**Unlock:** Stop 8.

**Retrieval:** Stop 6 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the proposed one-unit acceleration pass the rope pull limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 7 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 8 — Commit the day’s plan

**Format/placement:** CHOICE, Ewan Price at The winder desk.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 3 — Commit the day’s plan; Keystone: Mass distribution, Torque and rotation, Models and evidence; Area: WIND; Prerequisites: Stop 7 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** Which drum inertia belongs in the winding model?

**Actual mission answer — authoring only:** Use 45,000 kg m² and retire the old solid-disk value.

**Call — exact player copy:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Stop reason — exact player copy:** The next torque calculation needs the drum that is actually installed.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ewan Price finds that the bore measurement supports the annular model while the whole mass and outer radius still match their records. Choose the inertia entry that follows all three observations so the next motor calculation starts from the drum actually standing here.

**Question card story-science connection — exact player copy:** A measured mass distribution changes the motor demand that the crew can safely authorize.

**Data/readings — exact player copy:** Whole mass 18000 kg; annular radii 1 and 2 m; old solid-disk value 36000 kg m²; new integral 45000 kg m².

**Format-specific interaction block:**
```yaml
question: Which drum inertia belongs in the winding model?
choices:
- Use the annular value of 45000 kg m².
- Keep the disk value of 36000 kg m².
- Use the hoop value of 72000 kg m².
- Ignore the drum inertia during acceleration.
answer: Use the annular value of 45000 kg m².
why: The measured mass distribution, not the mass alone, selects the correct integral and the replacement plan entry.
rebuttals:
  Keep the disk value of 36000 kg m².: The measured bore invalidates the solid-disk mass distribution.
  Use the hoop value of 72000 kg m².: A hoop places all mass at 2 m; this drum has material throughout the annulus.
  Ignore the drum inertia during acceleration.: Changing drum speed requires torque because I is nonzero.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Use the annular value of 45000 kg m².. Acceptance: exact authored key.

**Answer text:** The measured mass distribution, not the mass alone, selects the correct integral and the replacement plan entry.

**Why/mechanism:** The measured mass distribution, not the mass alone, selects the correct integral and the replacement plan entry. The measured bore invalidates the solid-disk mass distribution. The alternative ‘Use the hoop value of 72000 kg m².’ fails for this reason: A hoop places all mass at 2 m; this drum has material throughout the annulus. The alternative ‘Ignore the drum inertia during acceleration.’ fails for this reason: Changing drum speed requires torque because I is nonzero.

**Misconception:** Keep the disk value of 36000 kg m²..

**Wrong-path feedback:**

- **Keep the disk value of 36000 kg m².:** The measured bore invalidates the solid-disk mass distribution.
- **Use the hoop value of 72000 kg m².:** A hoop places all mass at 2 m; this drum has material throughout the annulus.
- **Ignore the drum inertia during acceleration.:** Changing drum speed requires torque because I is nonzero.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: Use the annular value of 45000 kg m².

**Unlock:** Day 2 outcome and recovery allocation.

**Retrieval:** Stop 7 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the proposed one-unit acceleration pass the rope pull limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 8 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Use the ring-shaped drum model. The measured hole changes how its mass is spread. The old drawing gets a warning tag. The rope record is next. Ewan marks the old drum drawing superseded in his own hand. The first record behind his promised timetable has failed a physical check.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 2 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The old drum drawing receives a superseded tag. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +3 | Workshop Reserve -1 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [1, 3, 0, 0]; bars [55, 54, 73, 69]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- R=6/3=2 m; the rope-contact radius is not the drum diameter..
- The integral gives M(B⁴−A⁴)/(2(B²−A²)); factoring cancels the difference of squares and leaves 18000(1+4)/2=45000 kg m²..
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** Where mass sits matters when a body turns.

---

### GO DEEPER — Mission 2 — optional exact player copy

**Availability:** After mission_complete_2, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Use simple rotating bodies to test why the position of mass matters. Compare inertia, torque and energy, and keep angular speed distinct from the speed of a point on a rim.

**Supporting concepts:**

- Moment of inertia is I=Σmr² for point masses; a uniform disk has I=MR²/2 and a thin hoop has I=MR².
- Net torque produces angular acceleration: τ=Iα. For a tangential force at radius R, τ=FR.
- Rotational kinetic energy is Iω²/2. At a fixed angular speed, moving mass outward increases this energy.
- For rigid rotation, all points share angular speed ω, while tangential speed is v=ωr.

#### OW-GD-M2-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Two 2 kg point masses are each 0.5 m from a light axle. What is their total moment of inertia?

- **A.** 1 kg m²
- **B.** 2 kg m²
- **C.** 0.5 kg m²
- **D.** 4 kg m²

**Correct key:** A

**Hint:** Add mr² for both masses.

**Feedback A:** Each contributes 2×0.5²=0.5 kg m².

**Feedback B:** The radius must be squared, not used once.

**Feedback C:** That counts only one mass.

**Feedback D:** Total mass alone is not moment of inertia.

**Independent solution:** I=2×2×0.5²=1 kg m².

#### OW-GD-M2-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A uniform disk and thin hoop each have mass 4 kg and radius 1 m. The same net torque acts on each. How do their angular accelerations compare?

- **A.** Equal
- **B.** Hoop twice disk
- **C.** Disk four times hoop
- **D.** Disk twice hoop

**Correct key:** D

**Hint:** Use α=τ/I.

**Feedback A:** Their moments of inertia differ despite equal mass and radius.

**Feedback B:** The hoop has more inertia, so it accelerates less.

**Feedback C:** The disk has half, not one quarter, of the hoop inertia.

**Feedback D:** I_disk=2 and I_hoop=4 kg m², so τ/I is twice as large for the disk.

**Independent solution:** I_disk=2; I_hoop=4; α_disk/α_hoop=2.

#### OW-GD-M2-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A rotor with I=3 kg m² accelerates at 2 rad/s². What net torque acts on it?

- **A.** 1.5 N m
- **B.** 6 N m
- **C.** 12 N m
- **D.** 2 N m

**Correct key:** B

**Hint:** Use the rotational form of Newton’s second law.

**Feedback A:** Torque is I times α, not I divided by α.

**Feedback B:** The product Iα gives 6 N m.

**Feedback C:** Angular acceleration is not squared in τ=Iα.

**Feedback D:** This omits the inertia.

**Independent solution:** τ=3×2=6 N m.

#### OW-GD-M2-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg m² rotor turns at 3 rad/s. How much rotational kinetic energy does it have?

- **A.** 3 J
- **B.** 6 J
- **C.** 9 J
- **D.** 18 J

**Correct key:** C

**Hint:** Use K=Iω²/2.

**Feedback A:** Angular speed must be squared and multiplied by I/2.

**Feedback B:** This omits the square on angular speed.

**Feedback C:** K=0.5×2×3².

**Feedback D:** This omits the factor one half.

**Independent solution:** K=Iω²/2=(2×3²)/2=9 J.

#### OW-GD-M2-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A disk rotates at 4 rad/s. What are the tangential speeds at radii 0.25 m and 0.5 m?

- **A.** 1 m/s and 2 m/s
- **B.** 4 m/s and 4 m/s
- **C.** 2 m/s and 1 m/s
- **D.** 16 m/s and 8 m/s

**Correct key:** A

**Hint:** Points share ω, not v.

**Feedback A:** Multiplying the common angular speed by each radius gives these speeds.

**Feedback B:** Common angular speed does not mean common tangential speed.

**Feedback C:** The outer point travels faster, not slower.

**Feedback D:** The relation is ωr, not ω/r.

**Independent solution:** v_inner=4×0.25=1; v_outer=4×0.5=2 m/s.

#### OW-GD-M2-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 5 N force acts tangentially at radius 0.4 m. Which change doubles its torque?

- **A.** Move the force to radius 0.2 m
- **B.** Keep radius fixed and direct the force radially
- **C.** Halve the force at the same radius
- **D.** Use 10 N tangentially at the same radius

**Correct key:** D

**Hint:** Torque depends on the perpendicular force times lever arm.

**Feedback A:** That halves the torque.

**Feedback B:** A radial force gives zero torque about the centre.

**Feedback C:** That halves the torque.

**Feedback D:** The perpendicular force doubles while the lever arm stays fixed.

**Independent solution:** Initial τ=2 N m; 10×0.4=4 N m.


# Mission 3 — THE ROPE IS A LOAD

## A. Mission briefing card — exact player copy

**Header:** DAY 3 OF 12 — INSPECTION IN 10 DAYS

**Card title:** THE ROPE IS A LOAD

**Go now:** Go to Rope Shop and meet Mara Shaw, rope technician, at The rope bench.

**Card body (52 words; 4 sentences):** The drum model is fixed, but the rope adds its own weight. The upper rope must pull the cage and all the steel below it. At the Rope Shop, weigh a sample and test the pull. By the end of the mission, you decide if the rope can take the planned rise.

**Objective:** Does the proposed one-unit acceleration pass the rope pull limit?

**Stake — exact player copy:** Today you decide what the rope test proves before Mara spends reserve on a fix that may miss the cause.

**Segue — exact player copy:** Yet Ewan Price still needs the motor to pull that steel and speed up the drum before he can keep his promise.

### Worth knowing first — exact player copy

#### Glossary terms

Tension: the pulling force carried by a stretched rope.

Linear density: mass per unit length.

Free-body diagram: a drawing of the external forces acting on one chosen object.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- The upper rope supports every hanging piece below the cut.

#### Equations first needed today

**Equation:** T(s) = (M + λs)(g + a)

**What it is for:** newton laws and system boundaries in the measured system.

**Symbols:** T tension in newtons; s hanging length below the cut in metres; M cage plus payload mass in kilograms; λ rope mass per metre; g gravitational acceleration; a upward acceleration in metres per second squared.

**Why this campaign needs it:** Does the proposed one-unit acceleration pass the rope pull limit?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A 2 kilogram mass accelerates upward at 3 metres per second squared with g=10; T−20=6 gives T=26 newtons.

2. A rope has mass 18 kilograms over 6 metres; λ=18/6=3 kilograms per metre.

3. A 5 kilogram block rests on a 30 degree incline with g=10; the downslope weight is 50 sin30°=25 newtons and the normal force is 50 cos30°≈43.3 newtons.

4. For the incline block, μs=0.8 gives maximum static friction 0.8×43.3≈34.6 newtons; actual friction is 25 newtons, so the block can remain at rest.

5. Two masses 3 and 1 kilograms hang from an ideal light pulley with g=10; a=(3−1)10/(3+1)=5 metres per second squared and T=3(10−5)=15 newtons.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** No later room unlock is required in this local investigation.

## B. Main story happening — designer summary

The rope limit is written beside the measured length. The day moves from choose what the force acts on through sum the moving rope and load the sample model to the owner’s signed decision. The motor must pull the rope and speed up the heavy drum together. Mara keeps the sound rope in the plan and pins its measured mass beside the pull limit. She refuses a replacement order that would leave the missing dynamics unexplained.

## C. Designer intent — not shown to player

The one-unit acceleration passes the stated pull limit, with a massive-rope model. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D3-ARR — On arrival at Rope Shop

**Location:** Rope Shop.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Mara Shaw, by radio:** “This rope has four shortened ends in its record. Nobody gets to call its hanging mass negligible today.”

**Dialogue bubble — Nia Cole, by radio:** “Keep the measured length with each number. I cannot correct a depth that nobody wrote down.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 9.

### Beat OW-D3-R2 — After Stop 10

**Location:** Rope Shop.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** T=(M+λs)(g+a)=176000 N at s=1200 m. The accepted result stays in the log beside the next unresolved test.

**Panel text:** “T=(M+λs)(g+a)=176000 N at s=1200 m. The accepted result stays in the log beside the next unresolved test.”

**Dialogue bubble — Nia Cole, by radio:** “The integral counts each hanging piece once. A single end sample cannot replace that sum.”

**Dialogue bubble — Mara Shaw, by radio:** “Good. Attach the length as firmly as the answer.”

**Unlocks:** Stop 11.

### Beat OW-D3-R3 — After Stop 11 is accepted

**Location:** Current Stop 11 fixture (Rope Shop, The coil rig (`coil-rig`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 11 evidence is retained; no additional state or reward.

**Dialogue bubble — Mara Shaw, by radio:** “The measured extension has its own record now. I will not merge a local coil test with the full hanging rope.”

**Unlocks:** No new gate; continue to existing Stop 12.

### Beat OW-D3-DEC — After Stop 12

**Location:** Rope Shop.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The one-unit acceleration passes the stated pull limit, with a massive-rope model.

**Panel text:** “The one-unit acceleration passes the stated pull limit, with a massive-rope model.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D3-END — At mission end

**Location:** Rope Shop.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The rope limit is written beside the measured length. The motor must pull the rope and speed up the heavy drum together.

**Panel text:** “Mara keeps the sound rope in the plan and pins its measured mass beside the pull limit. She refuses a replacement order that would leave the missing dynamics unexplained. Yet Ewan Price still needs the motor to pull that steel and speed up the drum before he can keep his promise.”

**Dialogue bubble — Mara Shaw, by radio:** “The length tags stay on. Tomorrow's load calculation must carry this rope with it.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-rope-tags

**Home:** `rope-bench`. **Before:** Length tags lie loose beside measured rope ends. **After — exact action:** Mara attaches each length tag to its matching sample record.

**Trigger:** accepted_stop_12. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**1 locations:** Rope Shop.

- Stop 9: Rope Shop, The rope bench (`rope-bench`).
- Stop 10: Rope Shop, The rope bench (`rope-bench`).
- Stop 11: Rope Shop, The coil rig (`coil-rig`).
- Stop 12: Rope Shop, The rope bench (`rope-bench`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Mara Shaw, rope technician, owns the ROPE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Forces and boundaries require the external force sum and the mass to refer to the same selected body. An internal action-reaction pair cannot cancel two forces on one isolated object. Mean force and rapid elastic response are separate claims. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 9 — Choose what the force acts on

**Format/placement:** PROTOCOL, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Match every evidence row to one response

**Metadata:** Concept: 2 — Choose what the force acts on; Keystone: Forces and boundaries, Mass distribution; Area: ROPE; Prerequisites: Stop 8 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: INTRODUCE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Does the proposed one-unit acceleration pass the rope pull limit?

**Actual mission answer — authoring only:** The one-unit acceleration passes the stated pull limit, with a massive-rope model.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The upper rope must carry more than the cage alone.

**Question card story setup — exact player copy (42 words; 2 sentences):** Mara Shaw notes that the corrected drum drawing settles one moving mass, but the rope shop record describes another large load above the cage. Separate the possible system boundaries before choosing which forces and masses belong together in the next pull calculation.

**Question card story-science connection — exact player copy:** The chosen system determines which load the next force limit must protect.

**Data/readings — exact player copy:** Cut just above the cage; Cut at the upper end of the hanging rope; Pair of forces from rope and cage on each other

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Cut just above the cage
  reading: Cut just above the cage
- id: e2
  label: Cut at the upper end of the hanging rope
  reading: Cut at the upper end of the hanging rope
- id: e3
  label: Pair of forces from rope and cage on each other
  reading: Pair of forces from rope and cage on each other
choices:
- id: r1
  label: Include cage weight and rope pull on the cage
- id: r2
  label: Include cage and hanging-rope weight below the cut
- id: r3
  label: Place the two forces on different free-body diagrams
mapping:
  e1: r1
  e2: r2
  e3: r3
answerText: Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted.
```

**Question card prompt — exact player copy:** Match every evidence row to one response; use each response once and submit all connections.

**Correct result:** Cut just above the cage → Include cage weight and rope pull on the cage; Cut at the upper end of the hanging rope → Include cage and hanging-rope weight below the cut; Pair of forces from rope and cage on each other → Place the two forces on different free-body diagrams. Acceptance: exact authored key.

**Answer text:** Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted.

**Why/mechanism:** Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted. The evidence ‘Cut just above the cage’ requires the response ‘Include cage weight and rope pull on the cage’. The evidence ‘Cut at the upper end of the hanging rope’ requires the response ‘Include cage and hanging-rope weight below the cut’. The evidence ‘Pair of forces from rope and cage on each other’ requires the response ‘Place the two forces on different free-body diagrams’.

**Misconception:** e1.

**Wrong-path feedback:**

- **e1:** For Cut just above the cage, use Include cage weight and rope pull on the cage; Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted.
- **e2:** For Cut at the upper end of the hanging rope, use Include cage and hanging-rope weight below the cut; Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted.
- **e3:** For Pair of forces from rope and cage on each other, use Place the two forces on different free-body diagrams; Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Cut just above the cage → Include cage weight and rope pull on the cage; Cut at the upper end of the hanging rope → Include cage and hanging-rope weight below the cut; Pair of forces from rope and cage on each other → Place the two forces on different free-body diagrams

**Unlock:** Stop 10.

**Retrieval:** Stop 8 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which starting acceleration can the motor supply?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 9 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 10 — Sum the moving rope

**Format/placement:** DERIVE, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 2 — Sum the moving rope; Keystone: Forces and boundaries, Mass distribution; Area: ROPE; Prerequisites: Stop 9 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Does the proposed one-unit acceleration pass the rope pull limit?

**Actual mission answer — authoring only:** The one-unit acceleration passes the stated pull limit, with a massive-rope model.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The full hanging length must enter the mean-pull prediction.

**Question card story setup — exact player copy (41 words; 2 sentences):** Mara Shaw sees that the force drawings distinguish the cage alone from the cage with hanging rope, making the omitted mass visible. Accumulate that rope mass and derive the pull at the upper end before anyone proposes a loaded acceleration test.

**Question card story-science connection — exact player copy:** The chosen system determines which load the next force limit must protect.

**Data/readings — exact player copy:** M=4000 kg; λ=10 kg/m; hanging length s=1200 m at the upper cut; g=10 m/s²; upward a=1 m/s²; treat rope as inextensible for mean acceleration only.

**Format-specific interaction block:**
```yaml
derive:
  start: M=4000 kg; λ=10 kg/m; hanging length s=1200 m at the upper cut; g=10 m/s²; upward a=1 m/s²; treat rope as inextensible for mean acceleration only.
  goal: Express tension at a cut and evaluate it at s=1200 m.
  steps:
  - id: line1
    prompt: Accumulate the rope mass below the cut.
    choices:
    - line: m_below=M+∫[0,s] λ du=M+λs
      correct: true
    - line: m_below=M+∫[0,s] λu du=M+λs²/2
      correct: false
      survives: true
      why: λ already has units kg/m; another factor u would give the wrong mass units.
  - id: line2
    prompt: Apply net upward force equals total mass times acceleration.
    choices:
    - line: T=(M+λs)(g+a)=(4000+10×1200)×(10+1)=176000 N
      correct: true
    - line: T=(M+λs)g+Ma=16000×10+4000×1=164000 N at s=1200 m
      correct: false
      survives: true
      why: The second expression accelerates the cage but forgets to accelerate the hanging rope.
  answerText: The rope contributes 12000 kg and the cage with payload contributes 4000 kg; 16000(10+1)=176000 N. This mean-load approximation does not claim that the rope cannot stretch.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** T=(M+λs)(g+a)=176000 N at s=1200 m. Acceptance: exact authored key.

**Answer text:** The rope contributes 12000 kg and the cage with payload contributes 4000 kg; 16000(10+1)=176000 N. This mean-load approximation does not claim that the rope cannot stretch.

**Why/mechanism:** The rope contributes 12000 kg and the cage with payload contributes 4000 kg; 16000(10+1)=176000 N. This mean-load approximation does not claim that the rope cannot stretch. λ already has units kg/m; another factor u would give the wrong mass units. M=4000 kg; λ=10 kg/m; hanging length s=1200 m at the upper cut; g=10 m/s²; upward a=1 m/s²; treat rope as inextensible for mean acceleration only.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** λ already has units kg/m; another factor u would give the wrong mass units.
- **2:** The second expression accelerates the cage but forgets to accelerate the hanging rope.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: T=(M+λs)(g+a)=176000 N at s=1200 m

**Unlock:** Stop 11.

**Retrieval:** Stop 9 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which starting acceleration can the motor supply?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 10 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 11 — Load the sample model

**Format/placement:** VERIFY, Rope Shop — The coil rig.

**Required stop kind:** operated. **Player verb:** First, calculate and commit support force in N from the visible data. OPERATE: run the upward acceleration test. Keep the supported mass and gravity setting fixed. MEASURE: press READ once after the run and record support force. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 2 — Load the sample model; Keystone: Forces and boundaries, Models and evidence; Area: ROPE; Prerequisites: Stop 10 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Does the proposed one-unit acceleration pass the rope pull limit?

**Actual mission answer — authoring only:** The one-unit acceleration passes the stated pull limit, with a massive-rope model.

**Call — exact player copy:** Go to Rope Shop and inspect The coil rig.

**Stop reason — exact player copy:** A small rig can check the force relation without carrying passengers.

**Question card story setup — exact player copy (42 words; 2 sentences):** Mara Shaw confirms that the full-length calculation now counts the hanging steel as well as the cage, but the acceleration relation needs a check. Predict a smaller rig measurement before operating it so the pull model earns support without putting passengers aboard.

**Question card story-science connection — exact player copy:** The chosen system determines which load the next force limit must protect.

**Data/readings — exact player copy:** Scaled isolated rig: supported mass 20 kg, upward acceleration 1 m/s², g=10 m/s²; T=m(g+a).

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit support force in N before RUN unlocks.
  predictionRange:
    min: 0
    max: 400
    step: 1
    unit: N
  truth: 220
  measurement:
    label: support force
    cost: 1
  tolerance: 1
  correct_action: SUPPORTS MODEL
  answerText: T=20(10+1)=220 N. The rig reads 220 N and supports the accelerating-load relation.
```

**Question card prompt — exact player copy:** First, calculate and commit support force in N from the visible data. OPERATE: run the upward acceleration test. Keep the supported mass and gravity setting fixed. MEASURE: press READ once after the run and record support force. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 220 N; SUPPORTS MODEL. Acceptance: 1.

**Answer text:** T=20(10+1)=220 N. The rig reads 220 N and supports the accelerating-load relation.

**Why/mechanism:** T=20(10+1)=220 N. The rig reads 220 N and supports the accelerating-load relation. The alternative ‘200 N’ fails for this reason: This is weight only and omits ma. The alternative ‘REJECTS MODEL’ fails for this reason: The 220 N force agrees within the 1 N acceptance band. Scaled isolated rig: supported mass 20 kg, upward acceleration 1 m/s², g=10 m/s²; T=m(g+a).

**Misconception:** 200 N.

**Wrong-path feedback:**

- **200 N:** This is weight only and omits ma.
- **180 N:** This uses downward acceleration although the test accelerates upward.
- **REJECTS MODEL:** The 220 N force agrees within the 1 N acceptance band.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The coil rig gains a dated evidence slip: 220 N; SUPPORTS MODEL

**Unlock:** Stop 12.

**Retrieval:** Stop 10 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which starting acceleration can the motor supply?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 11 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 12 — Commit the day’s plan

**Format/placement:** CHOICE, Mara Shaw at The rope bench.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 2 — Commit the day’s plan; Keystone: Forces and boundaries, Mass distribution, Constraints and uncertainty; Area: ROPE; Prerequisites: Stop 11 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** Does the proposed one-unit acceleration pass the rope pull limit?

**Actual mission answer — authoring only:** The one-unit acceleration passes the stated pull limit, with a massive-rope model.

**Call — exact player copy:** Go to Rope Shop and meet Mara Shaw, rope technician, at The rope bench.

**Stop reason — exact player copy:** The mean-pull pass must not erase the untested bounce.

**Question card story setup — exact player copy (40 words; 2 sentences):** Mara Shaw finds that the smaller rig supports the accelerating-load relation, and the full-length prediction can now be compared with the rope limit. Decide what this result permits while keeping the unresolved stretch response visible beside the accepted mean-load calculation.

**Question card story-science connection — exact player copy:** The chosen system determines which load the next force limit must protect.

**Data/readings — exact player copy:** Recorded full-length pull 176 kN at a=1 m/s²; campaign mean-pull limit 220 kN inclusive; upper-rope mass 12000 kg; cage plus payload 4000 kg.

**Format-specific interaction block:**
```yaml
question: Does the proposed one-unit acceleration pass the rope pull limit?
choices:
- Accept this mean pull and retain a separate bounce test.
- Reject this mean pull because it exceeds 220 kN.
- Approve every faster rise because this test passes.
- Model only the cage because rope mass is fixed.
answer: Accept this mean pull and retain a separate bounce test.
why: Mean tension passes this campaign limit, but the model explicitly leaves rapid elastic motion unresolved.
rebuttals:
  Reject this mean pull because it exceeds 220 kN.: 176 kN is below 220 kN.
  Approve every faster rise because this test passes.: A pass at one acceleration gives no bound on higher acceleration or oscillation.
  Model only the cage because rope mass is fixed.: A fixed amount of rope still has mass that must be supported and accelerated.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Accept this mean pull and retain a separate bounce test.. Acceptance: exact authored key.

**Answer text:** Mean tension passes this campaign limit, but the model explicitly leaves rapid elastic motion unresolved.

**Why/mechanism:** Mean tension passes this campaign limit, but the model explicitly leaves rapid elastic motion unresolved. The alternative ‘Approve every faster rise because this test passes.’ fails for this reason: A pass at one acceleration gives no bound on higher acceleration or oscillation. The alternative ‘Model only the cage because rope mass is fixed.’ fails for this reason: A fixed amount of rope still has mass that must be supported and accelerated.

**Misconception:** Reject this mean pull because it exceeds 220 kN..

**Wrong-path feedback:**

- **Reject this mean pull because it exceeds 220 kN.:** 176 kN is below 220 kN.
- **Approve every faster rise because this test passes.:** A pass at one acceleration gives no bound on higher acceleration or oscillation.
- **Model only the cage because rope mass is fixed.:** A fixed amount of rope still has mass that must be supported and accelerated.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Accept this mean pull and retain a separate bounce test.

**Unlock:** Day 3 outcome and recovery allocation.

**Retrieval:** Stop 11 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which starting acceleration can the motor supply?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 12 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: The slower rise passes the mean rope-pull limit. The rope’s own weight is part of that pull. The bounce test stays open. The motor must now prove it can turn the drum. Mara keeps the sound rope in the plan and pins its measured mass beside the pull limit. She refuses a replacement order that would leave the missing dynamics unexplained.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 3 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The rope limit is written beside the measured length. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +3 | Workshop Reserve -1 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [1, 3, 0, 0]; bars [61, 60, 72, 71]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- Newton’s third-law pair acts on different bodies; changing the system boundary changes the mass and external forces counted..
- The rope contributes 12000 kg and the cage with payload contributes 4000 kg; 16000(10+1)=176000 N.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** A hanging rope is part of the load.

---

### GO DEEPER — Mission 3 — optional exact player copy

**Availability:** After mission_complete_3, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** A hanging chain lets you connect integration to a real distributed load. Compare different lengths and extensions without confusing a short sample with the complete system.

**Supporting concepts:**

- A uniform rope with linear density λ has mass λL over length L.
- For a stationary vertical rope, tension at a point supports the mass hanging below that point.
- An ideal uniform elastic member has stiffness k=EA/L; E is Young’s modulus and A cross-sectional area.
- Elastic energy is kx²/2 for extension x within the linear range. A local spring model requires its own stated length and loading assumptions.

#### OW-GD-M3-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 6 m uniform rope has linear density 2 kg/m. What is its mass?

- **A.** 3 kg
- **B.** 12 kg
- **C.** 8 kg
- **D.** 24 kg

**Correct key:** B

**Hint:** Treat λ as kilograms in each metre.

**Feedback A:** Length divided by density does not give the rope mass.

**Feedback B:** Mass is density per length times total length.

**Feedback C:** Adding length and density is dimensionally invalid.

**Feedback D:** There is no extra factor two in λL.

**Independent solution:** m=2×6=12 kg.

#### OW-GD-M3-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A stationary 5 m rope of linear density 2 kg/m hangs from a ceiling with no end load. With g=10 m/s², what is the top tension?

- **A.** 20 N
- **B.** 50 N
- **C.** 100 N
- **D.** 0 N

**Correct key:** C

**Hint:** Count all mass below the top.

**Feedback A:** That is the weight of one metre only.

**Feedback B:** This omits the density of 2 kg/m.

**Feedback C:** The top supports all 10 kg of rope.

**Feedback D:** No end load does not mean the rope has no weight.

**Independent solution:** T=λLg=2×5×10=100 N.

#### OW-GD-M3-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A stationary vertical rope has λ=1 kg/m and a 3 kg mass on its bottom. At a point 2 m above the bottom, what is tension for g=10 m/s²?

- **A.** 50 N
- **B.** 30 N
- **C.** 20 N
- **D.** 10 N

**Correct key:** A

**Hint:** Choose the system below the point.

**Feedback A:** It supports the 3 kg mass and 2 kg of rope below.

**Feedback B:** This omits the rope below the chosen point.

**Feedback C:** This omits the attached mass.

**Feedback D:** Both contributions act downward and add.

**Independent solution:** T=(3+1×2)×10=50 N.

#### OW-GD-M3-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Two elastic rods have the same E and A. Rod B is twice as long as rod A. If k_A=800 N/m, what is k_B?

- **A.** 1600 N/m
- **B.** 800 N/m
- **C.** 200 N/m
- **D.** 400 N/m

**Correct key:** D

**Hint:** Use k=EA/L.

**Feedback A:** Doubling length reduces stiffness in EA/L.

**Feedback B:** Length matters even with the same material and area.

**Feedback C:** The dependence is inverse length, not inverse length squared.

**Feedback D:** Twice the length gives half the stiffness.

**Independent solution:** k_B=800/2=400 N/m.

#### OW-GD-M3-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An ideal spring has k=200 N/m and extension 0.1 m. What elastic energy is stored?

- **A.** 20 J
- **B.** 1 J
- **C.** 2 J
- **D.** 10 J

**Correct key:** B

**Hint:** Energy is area under the force-extension graph.

**Feedback A:** That is the numerical value of force, not energy.

**Feedback B:** U=0.5×200×0.1².

**Feedback C:** This omits the one-half factor.

**Feedback D:** The extension must be squared.

**Independent solution:** U=kx²/2=(200×0.1²)/2=1 J.

#### OW-GD-M3-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A uniform rod stays in its linear elastic range. Which pair of measurements best tests the prediction that doubling force doubles extension?

- **A.** Two forces on rods of different length
- **B.** One extension measured twice at one force
- **C.** Extensions at F and 2F on the same rod under unchanged conditions
- **D.** Extensions at F on two rods with different cross-sectional areas

**Correct key:** C

**Hint:** Hold the member and its conditions fixed.

**Feedback A:** Length changes stiffness and confounds the comparison.

**Feedback B:** This tests repeatability, not the doubling prediction.

**Feedback C:** Only applied force changes, so the proportionality can be tested.

**Feedback D:** Area changes stiffness, while the force never doubles.

**Independent solution:** Same E,A,L gives constant k; x=F/k predicts x_2=2x_1.


# Mission 4 — ONE MOTOR, TWO JOBS

## A. Mission briefing card — exact player copy

**Header:** DAY 4 OF 12 — INSPECTION IN 9 DAYS

**Card title:** ONE MOTOR, TWO JOBS

**Go now:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Card body (52 words; 4 sentences):** The rope can take the slower rise, but the motor has two jobs. It must pull the load and make the drum turn faster. At the Winder House, add those two demands before the start control is freed. By the end of the mission, you decide which start the motor can supply.

**Objective:** Which starting acceleration can the motor supply?

**Stake — exact player copy:** Today you decide which start Ewan can defend to the crew who need their shifts back.

**Segue — exact player copy:** Now Ada Kerr has enough torque for a start, but the full 1,200 m lift still needs an energy page.

### Worth knowing first — exact player copy

#### Glossary terms

Torque: the turning effect of a force about an axis.

Angular acceleration: the rate at which turning speed changes.

Radian: the angle that spans an arc equal to its radius.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- Keep each earlier accepted result attached to the model assumptions that produced it.

#### Equations first needed today

**Equation:** τmotor − TR = Iα; α = a/R

**What it is for:** torque and angular acceleration in the measured system.

**Symbols:** τmotor motor torque in newton metres; T rope tension in newtons; R drum radius in metres; I rotational inertia; α angular acceleration in radians per second squared; a rope acceleration.

**Why this campaign needs it:** Which starting acceleration can the motor supply?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A tangential 7 newton force at radius 2 metres gives torque 14 newton metres.

2. A force of 10 newtons at radius 3 metres and angle 30 degrees gives τ=30 sin30°=15 newton metres.

3. A rotor with I=5 kilogram metres squared under net torque 20 newton metres has α=20/5=4 radians per second squared.

4. A wheel starts from rest with α=2 radians per second squared for 3 seconds; ω=6 radians per second and angle turned is 9 radians.

5. A horizontal beam 4 metres long carries a 60 newton central load; torque balance about the left support gives 4Fright=60×2, so each support supplies 30 newtons.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** No later room unlock is required in this local investigation.

## B. Main story happening — designer summary

The start control gains a tested acceleration stop. The day moves from drum angular acceleration through add the two torque demands and check the faster start to the owner’s signed decision. The energy budget says a complete lift should still be possible. Ewan locks the start to 1 m/s². He must now tell management why a rope that passes cannot make the motor deliver the faster start.

## C. Designer intent — not shown to player

Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D4-ARR — On arrival at Winder House

**Location:** Winder House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ewan Price, by radio:** “The motor turns the drum and raises the load. I need to know where the same pull appears in both jobs.”

**Dialogue bubble — Ivo Reed, by radio:** “And I need the ore plan kept separate from passenger approval.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 13.

### Beat OW-D4-R2 — After Stop 14

**Location:** Winder House.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** τmotor=TR+Ia/R=374500 N m. The accepted result stays in the log beside the next unresolved test.

**Panel text:** “τmotor=TR+Ia/R=374500 N m. The accepted result stays in the log beside the next unresolved test.”

**Dialogue bubble — Ivo Reed, by radio:** “Changing the system boundary changes which forces are external. It does not create extra motor capacity.”

**Dialogue bubble — Ewan Price, by radio:** “Then I will keep the drum torque and lifting work on separate lines.”

**Unlocks:** Stop 15.

### Beat OW-D4-R3 — After Stop 15 is accepted

**Location:** Current Stop 15 fixture (Winder House, The drum (`drum`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 15 evidence is retained; no additional state or reward.

**Dialogue bubble — Ivo Reed, by radio:** “The demand is now separated by job. We can choose the start without disguising one job as the other.”

**Unlocks:** No new gate; continue to existing Stop 16.

### Beat OW-D4-DEC — After Stop 16

**Location:** Winder House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.

**Panel text:** “Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D4-END — At mission end

**Location:** Winder House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The start control gains a tested acceleration stop. The energy budget says a complete lift should still be possible.

**Panel text:** “Ewan locks the start to 1 m/s². He must now tell management why a rope that passes cannot make the motor deliver the faster start. Now Ada Kerr has enough torque for a start, but the full 1,200 m lift still needs an energy page.”

**Dialogue bubble — Ivo Reed, by radio:** “Now the passenger start has a limit of its own. I will look for the ore gain at the chute.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-load-envelope

**Home:** `winder-desk`. **Before:** Loose load card beside system drawing. **After — exact action:** Ada clips the accepted load-envelope card to the drawing.

**Trigger:** accepted_stop_16. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**1 locations:** Winder House.

- Stop 13: Winder House, The winder desk (`winder-desk`).
- Stop 14: Winder House, The winder desk (`winder-desk`).
- Stop 15: Winder House, The drum (`drum`).
- Stop 16: Winder House, The winder desk (`winder-desk`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Torque and rotation link the motor to the moving load through the working radius. The opposing load torque and the net torque needed to change angular speed are different quantities. A valid equation must keep their signs and the chosen axis consistent. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 13 — Drum angular acceleration

**Format/placement:** BALLPARK, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Choose the quantity tiles for the displayed formula a/b

**Metadata:** Concept: 4 — Drum angular acceleration; Keystone: Motion and derivatives, Torque and rotation; Area: WIND; Prerequisites: Stop 12 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: RETRIEVE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which starting acceleration can the motor supply?

**Actual mission answer — authoring only:** Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The motor must accelerate the drum as well as lift the load.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ewan Price notes that the rope passes the slower mean pull, but the motor must also change the speed of the corrected heavy drum. Recover the relation between linear and angular acceleration before adding the two demands on the winding shaft.

**Question card story-science connection — exact player copy:** The torque result decides which start the installed motor can actually supply.

**Data/readings — exact player copy:** Required rope acceleration a=1 m/s²; R=2 m; α=a/R.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Drum angular acceleration
  labels:
  - linear acceleration (m/s²)
  - contact radius (m)
  - diameter distractor (m)
  values:
  - 1
  - 2
  - 4
  slots: 2
  template: Use the labeled quantities to fill 2 blanks.
  formula: a/b
  correct:
  - 0
  - 1
  target: 0.5
  tolerance: 0.01
  units: rad/s²
  correctResult: 0.5
answerText: α=1/2=0.5 rad/s² links the linear start to the rotating drum.
```

**Question card prompt — exact player copy:** Choose the quantity tiles for the displayed formula a/b; submit the resulting drum angular acceleration in rad/s².

**Correct result:** 0.5 rad/s². Acceptance: 0.01.

**Answer text:** α=1/2=0.5 rad/s² links the linear start to the rotating drum.

**Why/mechanism:** The same no-slip geometry that relates rope speed to drum turning speed also relates their accelerations when the working radius is fixed. Differentiate v=Rω to obtain a=Rα, then divide by the measured radius. With a=1 m/s² and R=2 m, α=0.5 rad/s². Using the four-metre diameter gives only half the required angular acceleration. Multiplication by radius reverses the physical relation: a larger drum radius needs less angular acceleration to produce the same upward rope acceleration.

**Misconception:** 2 rad/s².

**Wrong-path feedback:**

- **2 rad/s²:** Multiplying by radius reverses the no-slip relation.
- **0.25 rad/s²:** Using diameter instead of radius halves the required angular acceleration.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: 0.5 rad/s²

**Unlock:** Stop 14.

**Retrieval:** Stop 12 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; delayed retrieval after an intervening day.

**Later payoff:** Does the lift energy budget clear the emergency stop?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 13 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 14 — Add the two torque demands

**Format/placement:** DERIVE, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 4 — Add the two torque demands; Keystone: Forces and boundaries, Torque and rotation; Area: WIND; Prerequisites: Stop 13 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which starting acceleration can the motor supply?

**Actual mission answer — authoring only:** Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The motor limit applies to both torque demands together.

**Question card story setup — exact player copy (40 words; 2 sentences):** Ewan Price sees that the angular acceleration is now fixed by the rope motion, and the measured rope pull acts against the motor. Put those effects into one torque equation before deciding whether the slower start fits the installed machine.

**Question card story-science connection — exact player copy:** The torque result decides which start the installed motor can actually supply.

**Data/readings — exact player copy:** At full length, T=176000 N from Day 3; R=2 m; I=45000 kg m²; a=1 m/s²; no slipping or bearing loss in this start model.

**Format-specific interaction block:**
```yaml
derive:
  start: At full length, T=176000 N from Day 3; R=2 m; I=45000 kg m²; a=1 m/s²; no slipping or bearing loss in this start model.
  goal: Obtain the motor torque from the load and rotational acceleration.
  steps:
  - id: line1
    prompt: Choose positive rotation for lifting.
    choices:
    - line: τmotor−TR=I(a/R)
      correct: true
    - line: τmotor+TR=I(a/R)
      correct: false
      survives: true
      why: Rope tension opposes the lifting rotation, so it subtracts from motor torque in the net torque equation.
  - id: line2
    prompt: Solve for the torque the motor must provide.
    choices:
    - line: τmotor=TR+Ia/R=176000×2+45000×1/2=374500 N m
      correct: true
    - line: τmotor=TR−Ia/R=329500 N m
      correct: false
      survives: true
      why: The motor must add the inertia demand to the load torque, not use it as assistance.
  answerText: The rope demands 176000×2=352000 N m; changing drum speed demands 45000×1/2=22500 N m; total torque is 374500 N m.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** τmotor=TR+Ia/R=374500 N m. Acceptance: exact authored key.

**Answer text:** The rope demands 176000×2=352000 N m; changing drum speed demands 45000×1/2=22500 N m; total torque is 374500 N m.

**Why/mechanism:** The rope demands 176000×2=352000 N m; changing drum speed demands 45000×1/2=22500 N m; total torque is 374500 N m. Rope tension opposes the lifting rotation, so it subtracts from motor torque in the net torque equation. At full length, T=176000 N from Day 3; R=2 m; I=45000 kg m²; a=1 m/s²; no slipping or bearing loss in this start model.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Rope tension opposes the lifting rotation, so it subtracts from motor torque in the net torque equation.
- **2:** The motor must add the inertia demand to the load torque, not use it as assistance.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: τmotor=TR+Ia/R=374500 N m

**Unlock:** Stop 15.

**Retrieval:** Stop 13 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the lift energy budget clear the emergency stop?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 14 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 15 — Check the faster start

**Format/placement:** VERIFY, Winder House — The drum.

**Required stop kind:** operated. **Player verb:** First, calculate and commit motor torque in N m from the visible data. OPERATE: run the simulated 2 m/s² start. Keep the mass, radius and rotational inertia fixed. MEASURE: press READ once after the run and record motor torque. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 4 — Check the faster start; Keystone: Forces and boundaries, Torque and rotation, Models and evidence; Area: WIND; Prerequisites: Stop 14 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: clue.

**Briefing decision advanced:** Which starting acceleration can the motor supply?

**Actual mission answer — authoring only:** Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.

**Call — exact player copy:** Go to Winder House and inspect The drum.

**Stop reason — exact player copy:** The faster proposal needs its own torque prediction.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ewan Price confirms that the slower start fits the calculated motor demand, but the proposed faster start changes both the rope pull and drum acceleration. Commit its total torque before running the isolated model so the two limits can be compared fairly.

**Question card story-science connection — exact player copy:** The torque result decides which start the installed motor can actually supply.

**Data/readings — exact player copy:** Isolated motor model: Mtotal=16000 kg; g=10 m/s²; a=2 m/s²; R=2 m; I=45000 kg m²; τ=Mtotal(g+a)R+Ia/R; calculator available.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit motor torque in N m before RUN unlocks.
  predictionRange:
    min: 0
    max: 600000
    step: 500
    unit: N m
  truth: 429000
  measurement:
    label: motor torque
    cost: 1
  tolerance: 500
  correct_action: SUPPORTS MODEL
  answerText: 16000×12×2+45000×2/2=384000+45000=429000 N m, agreeing with the isolated run.
```

**Question card prompt — exact player copy:** First, calculate and commit motor torque in N m from the visible data. OPERATE: run the simulated 2 m/s² start. Keep the mass, radius and rotational inertia fixed. MEASURE: press READ once after the run and record motor torque. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 429000 N m; SUPPORTS MODEL. Acceptance: 500.

**Answer text:** 16000×12×2+45000×2/2=384000+45000=429000 N m, agreeing with the isolated run.

**Why/mechanism:** 16000×12×2+45000×2/2=384000+45000=429000 N m, agreeing with the isolated run. Load torque alone omits the rotating drum acceleration. The alternative ‘339000 N m’ fails for this reason: Subtracting drum inertia incorrectly lets it assist acceleration. Isolated motor model: Mtotal=16000 kg; g=10 m/s²; a=2 m/s²; R=2 m; I=45000 kg m²; τ=Mtotal(g+a)R+Ia/R; calculator available.

**Misconception:** 384000 N m.

**Wrong-path feedback:**

- **384000 N m:** Load torque alone omits the rotating drum acceleration.
- **339000 N m:** Subtracting drum inertia incorrectly lets it assist acceleration.
- **REJECTS MODEL:** The measured torque matches the complete two-demand model.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The drum gains a dated evidence slip: 429000 N m; SUPPORTS MODEL

**Unlock:** Stop 16.

**Retrieval:** Stop 14 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the lift energy budget clear the emergency stop?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 15 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 16 — Commit the day’s plan

**Format/placement:** CHOICE, Ewan Price at The winder desk.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 4 — Commit the day’s plan; Keystone: Forces and boundaries, Torque and rotation, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 15 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L2; Story role: decision.

**Briefing decision advanced:** Which starting acceleration can the motor supply?

**Actual mission answer — authoring only:** Use 1 m/s²; the 2 m/s² start exceeds the motor torque limit.

**Call — exact player copy:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Stop reason — exact player copy:** Only a start that passes both limits can return to the control.

**Question card story setup — exact player copy (40 words; 2 sentences):** Ewan Price finds that the faster-start run confirms the larger torque demand, even though the rope itself can still withstand that mean pull. Decide which start survives both limits before the operator restores any acceleration setting on the live control.

**Question card story-science connection — exact player copy:** The torque result decides which start the installed motor can actually supply.

**Data/readings — exact player copy:** Campaign motor torque ceiling 400000 N m; a=1 requires 374500 N m, a=2 requires 429000 N m; Day 1 trial acceleration ceiling 1.5 m/s².

**Format-specific interaction block:**
```yaml
question: Which starting acceleration can the motor supply?
choices:
- Keep the start at 1 m/s² and retain speed review.
- Use 2 m/s² because the rope pull still passes.
- Use 2 m/s² because torque lasts only briefly.
- Stop checking speed once the torque limit passes.
answer: Keep the start at 1 m/s² and retain speed review.
why: The one-unit start meets both the acceleration and torque ceilings; the faster start breaches both, so top speed remains a separate question.
rebuttals:
  Use 2 m/s² because the rope pull still passes.: Rope tension and motor torque are separate constraints.
  Use 2 m/s² because torque lasts only briefly.: The authored ceiling applies during the start too.
  Stop checking speed once the torque limit passes.: Power and emergency stopping still depend on speed.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Keep the start at 1 m/s² and retain speed review.. Acceptance: exact authored key.

**Answer text:** The one-unit start meets both the acceleration and torque ceilings; the faster start breaches both, so top speed remains a separate question.

**Why/mechanism:** The one-unit start meets both the acceleration and torque ceilings; the faster start breaches both, so top speed remains a separate question. The alternative ‘Use 2 m/s² because the rope pull still passes.’ fails for this reason: Rope tension and motor torque are separate constraints. Campaign motor torque ceiling 400000 N m; a=1 requires 374500 N m, a=2 requires 429000 N m; Day 1 trial acceleration ceiling 1.5 m/s².

**Misconception:** Use 2 m/s² because the rope pull still passes..

**Wrong-path feedback:**

- **Use 2 m/s² because the rope pull still passes.:** Rope tension and motor torque are separate constraints.
- **Use 2 m/s² because torque lasts only briefly.:** The authored ceiling applies during the start too.
- **Stop checking speed once the torque limit passes.:** Power and emergency stopping still depend on speed.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: Keep the start at 1 m/s² and retain speed review.

**Unlock:** Day 4 outcome and recovery allocation.

**Retrieval:** Stop 15 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the lift energy budget clear the emergency stop?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 16 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Use the slower start. The faster start asks too much of the motor. The control gains a stop at the tested setting. The full lift still needs its energy check. Ewan locks the start to 1 m/s². He must now tell management why a rope that passes cannot make the motor deliver the faster start.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 4 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The start control gains a tested acceleration stop. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +3 | Workshop Reserve -1 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [1, 3, 0, 0]; bars [67, 66, 71, 73]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- α=1/2=0.5 rad/s² links the linear start to the rotating drum..
- The rope demands 176000×2=352000 N m; changing drum speed demands 45000×1/2=22500 N m; total torque is 374500 N m..
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** The motor must supply load torque and acceleration torque.

---

### GO DEEPER — Mission 4 — optional exact player copy

**Availability:** After mission_complete_4, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Draw boundaries around a translating load and a rotating drive. Use force, torque and energy to describe the same motion without counting an internal force twice.

**Supporting concepts:**

- A free-body diagram includes only forces exerted on the chosen body by something outside it.
- For an upward-accelerating mass, T−mg=ma. T is rope tension on that mass.
- A massless rope on a no-slip pulley links tangential and angular acceleration: a=Rα.
- With no losses, net work equals change in total kinetic energy; translational and rotational energy are separate terms.

#### OW-GD-M4-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 3 kg mass accelerates upward at 2 m/s². Using g=10 m/s², what upward rope tension is required?

- **A.** 24 N
- **B.** 30 N
- **C.** 6 N
- **D.** 36 N

**Correct key:** D

**Hint:** Write upward force minus downward force.

**Feedback A:** Subtracting ma would describe downward acceleration.

**Feedback B:** Weight alone corresponds to zero acceleration.

**Feedback C:** Net force is 6 N, but tension must also oppose weight.

**Feedback D:** T=m(g+a)=3×12.

**Independent solution:** T−30=6, so T=36 N.

#### OW-GD-M4-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Two blocks are connected by a light cord on a frictionless table. For the system containing both blocks and the cord, how is the cord tension treated?

- **A.** Internal; it does not enter the net external force sum
- **B.** External twice
- **C.** External once
- **D.** Always zero on each block

**Correct key:** A

**Hint:** Ask whether the interacting objects lie inside the boundary.

**Feedback A:** Forces between parts of the selected system cancel in its total momentum balance.

**Feedback B:** Both tension forces act within the selected boundary.

**Feedback C:** There is no cord force crossing this chosen boundary.

**Feedback D:** Each block can have a nonzero tension force even though it cancels for the combined system.

**Independent solution:** Both blocks and cord are inside; internal tensions cancel in the combined force sum.

#### OW-GD-M4-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A no-slip pulley has radius 0.5 m and angular acceleration 4 rad/s². What is rope acceleration?

- **A.** 8 m/s²
- **B.** 4 m/s²
- **C.** 2 m/s²
- **D.** 1 m/s²

**Correct key:** C

**Hint:** Use the acceleration of the rim.

**Feedback A:** The relation multiplies by radius rather than divides.

**Feedback B:** The angular value is not directly the linear value.

**Feedback C:** a=Rα=0.5×4.

**Feedback D:** No factor one half enters the kinematic constraint.

**Independent solution:** a=Rα=0.5×4=2 m/s².

#### OW-GD-M4-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg cart moves at 3 m/s while its attached rotor has I=1 kg m² and ω=2 rad/s. What is their total kinetic energy?

- **A.** 9 J
- **B.** 11 J
- **C.** 13 J
- **D.** 5 J

**Correct key:** B

**Hint:** Add mv²/2 and Iω²/2.

**Feedback A:** That includes only translation.

**Feedback B:** Translation gives 9 J and rotation gives 2 J.

**Feedback C:** The rotor energy requires a factor one half.

**Feedback D:** Both speed terms must be squared.

**Independent solution:** K=0.5×2×9+0.5×1×4=11 J.

#### OW-GD-M4-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A drum has opposing tangential forces 30 N and 10 N at radius 0.2 m. What is its net torque magnitude?

- **A.** 8 N m
- **B.** 20 N m
- **C.** 2 N m
- **D.** 4 N m

**Correct key:** D

**Hint:** Choose a positive rotation direction and subtract opposing torques.

**Feedback A:** Opposing torques subtract rather than add.

**Feedback B:** The net tangential force still needs a lever arm.

**Feedback C:** That counts only the smaller opposing torque.

**Feedback D:** (30−10)×0.2 gives the net torque.

**Independent solution:** τ_net=6−2=4 N m.

#### OW-GD-M4-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A frictionless machine receives 40 J of net work and gains 15 J of translational kinetic energy, with no potential-energy change. What rotational energy gain remains?

- **A.** 25 J
- **B.** 55 J
- **C.** 40 J
- **D.** 15 J

**Correct key:** A

**Hint:** Account for the whole system’s energy once.

**Feedback A:** Energy conservation leaves 40−15 J for rotation.

**Feedback B:** The input is shared, not added again to one output.

**Feedback C:** This would ignore the translational gain.

**Feedback D:** The two forms need not receive equal energy.

**Independent solution:** ΔK_rot=40−15=25 J.


# Mission 5 — ENOUGH ENERGY IS NOT ENOUGH

## A. Mission briefing card — exact player copy

**Header:** DAY 5 OF 12 — INSPECTION IN 8 DAYS

**Card title:** ENOUGH ENERGY IS NOT ENOUGH

**Go now:** Go to Shaft and Brake House and meet Ada Kerr, mine safety engineer, at The bench drawing.

**Card body (53 words; 4 sentences):** The motor can start the load, but a full lift still needs enough energy. Work adds up force over each part of a trip. At the brake house and Winder House, check the lift and stored motion. By the end of the mission, you decide if that budget also proves a safe stop.

**Objective:** Does the lift energy budget clear the emergency stop?

**Stake — exact player copy:** Today you decide if Ada can close her brake page just because the lift has enough energy.

**Segue — exact player copy:** But Ivo Reed has broken bin bolts and a tripping belt, so lost ore time adds pressure to Ewan’s schedule.

### Worth knowing first — exact player copy

#### Glossary terms

Work: energy transferred by a force through a displacement.

Potential energy: energy associated with a system’s position or arrangement.

Kinetic energy: energy of motion.

Conservative force: a force whose work depends only on start and end positions.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- Energy inside the chosen system must not be counted again as outside work.

#### Equations first needed today

**Equation:** W = ∫F dy; Krot = Iω²/2

**What it is for:** work and potential energy in the measured system.

**Symbols:** W work in joules; F force in newtons; y upward travel in metres; Krot rotational kinetic energy in joules; I rotational inertia; ω angular speed.

**Why this campaign needs it:** Does the lift energy budget clear the emergency stop?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A constant 12 newton force moves an object 3 metres along the force; W=12×3=36 joules.

2. For F=4x newtons from x=0 to 2 metres, W=∫4x dx=[2x²]₀²=8 joules.

3. A 3 kilogram block rises 2 metres with g=10; gravitational potential energy increases by 3×10×2=60 joules.

4. For U=5x² joules, F=−dU/dx=−10x newtons; x=0 is a stable minimum because displacement produces a restoring force.

5. A rotor with I=6 kilogram metres squared at ω=3 radians per second stores K=6×9/2=27 joules.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 17 first unlocks the intermediate room and Stop 18 unlocks the third.

## B. Main story happening — designer summary

The energy page is accepted while the brake page stays open. The day moves from set the energy boundary through lift a rope one piece at a time and drum motion energy to the owner’s signed decision. The conveyor trips even when the load on its belt is small. Ada signs the energy page but leaves her brake page open. She places the March check beside it so the crew can see that enough lift energy has answered a different question.

## C. Designer intent — not shown to player

The full lift energy budget passes, but it does not certify an emergency stop. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D5-ARR — On arrival at Shaft and Brake House

**Location:** Shaft and Brake House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ada Kerr, by radio:** “This certificate came from cold pads. The worn pair beside it did not work under those conditions.”

**Dialogue bubble — Ruth Bell, by radio:** “Then leave the certificate open until its limits are clear.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 17.

### Beat OW-D5-R2 — After Stop 18

**Location:** Shaft and Brake House.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Wtotal=MgL+λgL²/2=120000000 J. Take this evidence to Winder House at The winder desk; only that record or test can check the next part.

**Panel text:** “Wtotal=MgL+λgL²/2=120000000 J. Take this evidence to Winder House at The winder desk; only that record or test can check the next part.”

**Dialogue bubble — Ruth Bell, by radio:** “The energy calculation gives a total. It does not tell us the peak force during contact.”

**Dialogue bubble — Ada Kerr, by radio:** “Exactly. The certificate must say what the stopping hardware can actually withstand.”

**Unlocks:** Stop 19 and waypoint to Winder House.

### Beat OW-D5-R3 — After Stop 19 is accepted

**Location:** Current Stop 19 fixture (Winder House, The winder desk (`winder-desk`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 19 evidence is retained; no additional state or reward.

**Dialogue bubble — Mina Holt, by radio:** “These pads are off the machine. Keep their cold-test slip with them so nobody calls it a warm-stop approval.”

**Unlocks:** No new gate; continue to existing Stop 20.

### Beat OW-D5-DEC — After Stop 20

**Location:** Winder House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The full lift energy budget passes, but it does not certify an emergency stop.

**Panel text:** “The full lift energy budget passes, but it does not certify an emergency stop.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D5-END — At mission end

**Location:** Winder House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The energy page is accepted while the brake page stays open. The conveyor trips even when the load on its belt is small.

**Panel text:** “Ada signs the energy page but leaves her brake page open. She places the March check beside it so the crew can see that enough lift energy has answered a different question. But Ivo Reed has broken bin bolts and a tripping belt, so lost ore time adds pressure to Ewan’s schedule.”

**Dialogue bubble — Ada Kerr, by radio:** “The pad tray keeps its slip. A total energy number will not conceal a peak-force limit.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-brake-slip

**Home:** `pad-bench`. **Before:** Cold-test slip loose beside pad tray. **After — exact action:** Ada clips the slip to the worn-pad tray with its limits visible.

**Trigger:** accepted_stop_20. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Shaft and Brake House → Winder House.

- Stop 17: Shaft and Brake House, The bench drawing (`body-bench`).
- Stop 18: Shaft and Brake House, The bench drawing (`body-bench`).
- Stop 19: Winder House, The winder desk (`winder-desk`).
- Stop 20: Winder House, The winder desk (`winder-desk`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ada Kerr, mine safety engineer, owns the CAGE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Energy accounting requires a declared system boundary and a destination for transferred energy. The total amount accumulated over a journey differs from the force at one instant. A budget can pass while another independent operating limit still fails. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 17 — Set the energy boundary

**Format/placement:** PROTOCOL, Shaft and Brake House — The bench drawing.

**Required stop kind:** calculation. **Player verb:** Match every evidence row to one response

**Metadata:** Concept: 5 — Set the energy boundary; Keystone: Forces and boundaries, Energy accounting; Area: CAGE; Prerequisites: Stop 16 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Does the lift energy budget clear the emergency stop?

**Actual mission answer — authoring only:** The full lift energy budget passes, but it does not certify an emergency stop.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The bench drawing.

**Stop reason — exact player copy:** The energy page cannot count internal work twice.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ada Kerr notes that the slower start is available, but the complete lift still needs an energy account that does not double-count internal transfers. Choose the system boundaries at the brake-house drawing before adding the work done on cage, rope and drum.

**Question card story-science connection — exact player copy:** An energy account establishes one necessary condition without replacing the separate stopping limits.

**Data/readings — exact player copy:** Cage plus Earth during upward travel; Brake pad sliding against the drum; Rope tension treated inside cage-plus-rope system

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Cage plus Earth during upward travel
  reading: Cage plus Earth during upward travel
- id: e2
  label: Brake pad sliding against the drum
  reading: Brake pad sliding against the drum
- id: e3
  label: Rope tension treated inside cage-plus-rope system
  reading: Rope tension treated inside cage-plus-rope system
choices:
- id: r1
  label: Record increasing gravitational potential energy
- id: r2
  label: Record mechanical energy transferred to heat
- id: r3
  label: Do not count that internal transfer twice
mapping:
  e1: r1
  e2: r2
  e3: r3
answerText: Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice.
```

**Question card prompt — exact player copy:** Match every evidence row to one response; use each response once and submit all connections.

**Correct result:** Cage plus Earth during upward travel → Record increasing gravitational potential energy; Brake pad sliding against the drum → Record mechanical energy transferred to heat; Rope tension treated inside cage-plus-rope system → Do not count that internal transfer twice. Acceptance: exact authored key.

**Answer text:** Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice.

**Why/mechanism:** Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice. The evidence ‘Cage plus Earth during upward travel’ requires the response ‘Record increasing gravitational potential energy’. The evidence ‘Brake pad sliding against the drum’ requires the response ‘Record mechanical energy transferred to heat’. The evidence ‘Rope tension treated inside cage-plus-rope system’ requires the response ‘Do not count that internal transfer twice’.

**Misconception:** e1.

**Wrong-path feedback:**

- **e1:** For Cage plus Earth during upward travel, use Record increasing gravitational potential energy; Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice.
- **e2:** For Brake pad sliding against the drum, use Record mechanical energy transferred to heat; Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice.
- **e3:** For Rope tension treated inside cage-plus-rope system, use Do not count that internal transfer twice; Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The bench drawing gains a dated evidence slip: Cage plus Earth during upward travel → Record increasing gravitational potential energy; Brake pad sliding against the drum → Record mechanical energy transferred to heat; Rope tension treated inside cage-plus-rope system → Do not count that internal transfer twice

**Unlock:** Stop 18.

**Retrieval:** Stop 16 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which feed change protects the conveyor and bin?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 17 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 18 — Lift a rope one piece at a time

**Format/placement:** DERIVE, Shaft and Brake House — The bench drawing.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 5 — Lift a rope one piece at a time; Keystone: Mass distribution, Energy accounting; Area: CAGE; Prerequisites: Stop 17 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Does the lift energy budget clear the emergency stop?

**Actual mission answer — authoring only:** The full lift energy budget passes, but it does not certify an emergency stop.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The bench drawing.

**Stop reason — exact player copy:** Each rope piece travels a different vertical distance.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ada Kerr sees that the system review separates internal pulls from energy supplied to lift the load, and different rope pieces travel different distances. Integrate those rises before comparing the full journey with the energy reserved for the next trial wind.

**Question card story-science connection — exact player copy:** An energy account establishes one necessary condition without replacing the separate stopping limits.

**Data/readings — exact player copy:** M=4000 kg; λ=10 kg/m; g=10 m/s²; L=1200 m initially hanging; lift all this length to the upper level; neglect friction and net final kinetic energy.

**Format-specific interaction block:**
```yaml
derive:
  start: M=4000 kg; λ=10 kg/m; g=10 m/s²; L=1200 m initially hanging; lift all this length to the upper level; neglect friction and net final kinetic energy.
  goal: Derive total gravitational work for cage and rope.
  steps:
  - id: line1
    prompt: Each rope piece rises from its initial depth u.
    choices:
    - line: Wrope=∫[0,L] λg u du=λgL²/2
      correct: true
    - line: Wrope=∫[0,L] λgL du=λgL(L−0)=λgL²
      correct: false
      survives: true
      why: Assigning every rope piece the bottom depth overestimates the rise of all but the lowest piece.
  - id: line2
    prompt: Add cage rise and distributed rope rise.
    choices:
    - line: Wtotal=MgL+λgL²/2=4000×10×1200+10×10×1200²/2=120000000 J
      correct: true
    - line: Wtotal=MgL+λgL²=48000000+144000000=192000000 J
      correct: false
      survives: true
      why: The rope’s center of mass rises L/2, not L; omitting the half repeats the depth error.
  answerText: Cage work is 4000×10×1200=48 MJ; rope work is 10×10×1200²/2=72 MJ; total 120 MJ. This ideal lift ends with the same zero kinetic energy with which it began.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** Wtotal=MgL+λgL²/2=120000000 J. Acceptance: exact authored key.

**Answer text:** Cage work is 4000×10×1200=48 MJ; rope work is 10×10×1200²/2=72 MJ; total 120 MJ. This ideal lift ends with the same zero kinetic energy with which it began.

**Why/mechanism:** Cage work is 4000×10×1200=48 MJ; rope work is 10×10×1200²/2=72 MJ; total 120 MJ. This ideal lift ends with the same zero kinetic energy with which it began. Assigning every rope piece the bottom depth overestimates the rise of all but the lowest piece. M=4000 kg; λ=10 kg/m; g=10 m/s²; L=1200 m initially hanging; lift all this length to the upper level; neglect friction and net final kinetic energy.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Assigning every rope piece the bottom depth overestimates the rise of all but the lowest piece.
- **2:** The rope’s center of mass rises L/2, not L; omitting the half repeats the depth error.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The bench drawing gains a dated evidence slip: Wtotal=MgL+λgL²/2=120000000 J

**Unlock:** Stop 19.

**Retrieval:** Stop 17 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which feed change protects the conveyor and bin?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 18 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 19 — Drum motion energy

**Format/placement:** BALLPARK, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Choose the quantity tiles for the displayed formula a*b*c*c

**Metadata:** Concept: 10 — Drum motion energy; Keystone: Torque and rotation, Energy accounting; Area: WIND; Prerequisites: Stop 18 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Does the lift energy budget clear the emergency stop?

**Actual mission answer — authoring only:** The full lift energy budget passes, but it does not certify an emergency stop.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The moving drum stores energy that a brake must remove.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ewan Price confirms that the lift-work total fits the reserved energy, but the drum also stores motion energy whenever it is turning. Carry the accepted inertia to the winding desk and calculate that separate store before discussing what a brake must absorb.

**Question card story-science connection — exact player copy:** Stored rotational energy remains part of the brake’s job even when the lift supply is sufficient.

**Data/readings — exact player copy:** Use I=45000 kg m² and ω=2 rad/s at a reviewed 4 m/s speed; Krot=Iω²/2.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Drum motion energy
  labels:
  - inertia (kg m²)
  - angular speed (rad/s)
  - half
  values:
  - 45000
  - 2
  - 0.5
  slots: 3
  template: Use the labeled quantities to fill 3 blanks.
  formula: a*b*c*c
  correct:
  - 2
  - 0
  - 1
  target: 90000
  tolerance: 90.0
  units: J
  correctResult: 90000
answerText: Krot=0.5×45000×2²=90000 J; the stored rotational motion also needs an energy destination during stopping.
```

**Question card prompt — exact player copy:** Choose the quantity tiles for the displayed formula a*b*c*c; submit the resulting drum motion energy in J.

**Correct result:** 90000 J. Acceptance: 90.0.

**Answer text:** Krot=0.5×45000×2²=90000 J; the stored rotational motion also needs an energy destination during stopping.

**Why/mechanism:** Krot=0.5×45000×2²=90000 J; the stored rotational motion also needs an energy destination during stopping. The alternative ‘45000 J’ fails for this reason: Forgetting to square angular speed loses a factor of two here. The alternative ‘180000 J’ fails for this reason: Omitting the half doubles rotational energy. Use I=45000 kg m² and ω=2 rad/s at a reviewed 4 m/s speed; Krot=Iω²/2.

**Misconception:** 45000 J.

**Wrong-path feedback:**

- **45000 J:** Forgetting to square angular speed loses a factor of two here.
- **180000 J:** Omitting the half doubles rotational energy.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: 90000 J

**Unlock:** Stop 20.

**Retrieval:** Stop 18 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which feed change protects the conveyor and bin?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 19 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 20 — Commit the day’s plan

**Format/placement:** CHOICE, Ewan Price at The winder desk.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 5 — Commit the day’s plan; Keystone: Forces and boundaries, Torque and rotation, Energy accounting, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 19 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Does the lift energy budget clear the emergency stop?

**Actual mission answer — authoring only:** The full lift energy budget passes, but it does not certify an emergency stop.

**Call — exact player copy:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Stop reason — exact player copy:** An energy supply does not certify a stopping trajectory.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ewan Price finds that the lift work and the drum energy are now recorded as different quantities with different operational consequences for the crew. Decide whether the available lift supply settles the emergency-stop question or leaves the pad performance still to be tested.

**Question card story-science connection — exact player copy:** An energy account establishes one necessary condition without replacing the separate stopping limits.

**Data/readings — exact player copy:** Ideal lift requires 120 MJ; campaign usable lift allocation is 130 MJ; drum alone stores 90 kJ at 4 m/s; pad performance at working temperature remains untested.

**Format-specific interaction block:**
```yaml
question: Does the lift energy budget clear the emergency stop?
choices:
- Accept lift energy and keep the stop uncertified.
- Approve the stop because 120 is below 130 MJ.
- Reject the lift because rope work is 144 MJ.
- Remove the drum energy from the brake review.
answer: Accept lift energy and keep the stop uncertified.
why: The available work is sufficient for the ideal lift, but neither available energy nor drum energy establishes a safe stopping force and trajectory.
rebuttals:
  Approve the stop because 120 is below 130 MJ.: Stored supply energy does not establish brake force or stopping distance.
  Reject the lift because rope work is 144 MJ.: Each piece of rope rises a different distance; correct rope work is 72 MJ.
  Remove the drum energy from the brake review.: The spinning drum contains kinetic energy that must be transferred during the stop.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Accept lift energy and keep the stop uncertified.. Acceptance: exact authored key.

**Answer text:** The available work is sufficient for the ideal lift, but neither available energy nor drum energy establishes a safe stopping force and trajectory.

**Why/mechanism:** The available work is sufficient for the ideal lift, but neither available energy nor drum energy establishes a safe stopping force and trajectory. The alternative ‘Approve the stop because 120 is below 130 MJ.’ fails for this reason: Stored supply energy does not establish brake force or stopping distance. The alternative ‘Reject the lift because rope work is 144 MJ.’ fails for this reason: Each piece of rope rises a different distance; correct rope work is 72 MJ.

**Misconception:** Approve the stop because 120 is below 130 MJ..

**Wrong-path feedback:**

- **Approve the stop because 120 is below 130 MJ.:** Stored supply energy does not establish brake force or stopping distance.
- **Reject the lift because rope work is 144 MJ.:** Each piece of rope rises a different distance; correct rope work is 72 MJ.
- **Remove the drum energy from the brake review.:** The spinning drum contains kinetic energy that must be transferred during the stop.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: Accept lift energy and keep the stop uncertified.

**Unlock:** Day 5 outcome and recovery allocation.

**Retrieval:** Stop 19 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which feed change protects the conveyor and bin?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 20 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: The lift has enough energy, but the stop is not cleared. The drum stores motion energy too. The brake page stays open. Two trip tags now hang on the feed belt. Ada signs the energy page but leaves her brake page open. She places the March check beside it so the crew can see that enough lift energy has answered a different question.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 5 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The energy page is accepted while the brake page stays open. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +3 | Workshop Reserve -2 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 2, 2, 0]; bars [72, 71, 71, 75]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- Choose the system before assigning work or potential energy; changing the boundary must not count the same transfer twice..
- Cage work is 4000×10×1200=48 MJ; rope work is 10×10×1200²/2=72 MJ; total 120 MJ.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** Enough energy does not establish a safe stop.

---

### GO DEEPER — Mission 5 — optional exact player copy

**Availability:** After mission_complete_5, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Compare brakes and buffers through work and impulse. A device may absorb enough total energy while still producing an unacceptable peak force, so keep averages and maxima separate.

**Supporting concepts:**

- Work is the integral of force along displacement; stopping work has magnitude equal to the removed kinetic energy.
- Impulse is the integral of force over time and equals momentum change.
- Average stopping force is energy divided by stopping distance only for the corresponding distance-averaged force.
- A maximum cannot generally be inferred from an average. A force profile or independent peak measurement is needed.

#### OW-GD-M5-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg cart moving at 4 m/s is stopped. How much kinetic energy must be removed?

- **A.** 8 J
- **B.** 32 J
- **C.** 16 J
- **D.** 4 J

**Correct key:** C

**Hint:** Use the kinetic energy before stopping.

**Feedback A:** The speed is squared in kinetic energy.

**Feedback B:** This omits the one-half factor.

**Feedback C:** K=0.5×2×4².

**Feedback D:** This omits both mass and the speed square.

**Independent solution:** K=mv²/2=(2×4²)/2=16 J.

#### OW-GD-M5-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A brake removes 30 J over 0.5 m. What is the magnitude of its distance-averaged resisting force?

- **A.** 15 N
- **B.** 60 N
- **C.** 30 N
- **D.** 120 N

**Correct key:** B

**Hint:** Use the area under the force-distance graph.

**Feedback A:** Energy must be divided by distance.

**Feedback B:** 30 J divided by 0.5 m is 60 N.

**Feedback C:** Joules do not equal newtons without a distance.

**Feedback D:** No extra factor two enters work divided by distance.

**Independent solution:** F_average=30/0.5=60 N.

#### OW-GD-M5-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A constant 12 N horizontal force opposes a cart for 0.25 s. What impulse magnitude does it deliver?

- **A.** 48 N s
- **B.** 12 N s
- **C.** 0.25 N s
- **D.** 3 N s

**Correct key:** D

**Hint:** For constant force, J=FΔt.

**Feedback A:** Impulse multiplies force by time.

**Feedback B:** The force does not last one second.

**Feedback C:** Time alone does not give impulse.

**Feedback D:** 12×0.25=3 N s.

**Independent solution:** J=FΔt=12×0.25=3 N s.

#### OW-GD-M5-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A buffer force rises linearly from zero to 100 N over 0.2 m of compression. What work does the buffer absorb?

- **A.** 10 J
- **B.** 20 J
- **C.** 50 J
- **D.** 500 J

**Correct key:** A

**Hint:** Sketch a triangle under the force-distance line.

**Feedback A:** The triangular force-distance area is 100×0.2/2.

**Feedback B:** That rectangular area assumes maximum force throughout.

**Feedback C:** The average force still must be multiplied by compression.

**Feedback D:** Force divided by distance is stiffness, not work.

**Independent solution:** W=(F_peak×compression)/2=(100×0.2)/2=10 J.

#### OW-GD-M5-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Two brakes stop identical carts through the same distance on a level track; each brake is the only force doing work. One produces a short large force peak. What follows from their equal initial kinetic energies?

- **A.** Their peak forces are equal
- **B.** Their stopping times are equal
- **C.** They absorb equal total work, but their peak forces can differ
- **D.** The peaked brake absorbs more energy

**Correct key:** C

**Hint:** Distinguish area from maximum height.

**Feedback A:** Equal areas do not require equal heights.

**Feedback B:** Equal distance and energy do not fix the force-time profile.

**Feedback C:** The force-distance integrals agree while the profiles may differ.

**Feedback D:** Both carts lose the same kinetic energy under the stated conditions.

**Independent solution:** Both remove the same K; equal work alone does not fix peak force.

#### OW-GD-M5-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 1 kg cart slows from +6 to +2 m/s. What signed impulse acts on it?

- **A.** +4 N s
- **B.** −4 N s
- **C.** −8 N s
- **D.** +2 N s

**Correct key:** B

**Hint:** Use final momentum minus initial momentum.

**Feedback A:** The cart loses positive momentum, so the change is negative.

**Feedback B:** Δp=1×(2−6).

**Feedback C:** Subtract velocities; do not add their magnitudes.

**Feedback D:** That is final momentum, not its change.

**Independent solution:** J=Δp=m(v_final−v_initial)=1×(2−6)=−4 N s.


# Mission 6 — THE STREAM HITS BACK

## A. Mission briefing card — exact player copy

**Header:** DAY 6 OF 12 — INSPECTION IN 7 DAYS

**Card title:** THE STREAM HITS BACK

**Go now:** Go to Tip and Conveyor and meet Ivo Reed, conveyor foreman, at The weightometer.

**Card body (52 words; 4 sentences):** The lift has enough energy, but the feed belt still stops with small loads. A moving stream can push hard on the belt. At the Tip and brake house, check steady flow and sudden impacts. By the end of the mission, you choose the feed change that protects the belt and bin.

**Objective:** Which feed change protects the conveyor and bin?

**Stake — exact player copy:** Today you choose how Ivo can protect the bin and keep ore moving without a faster passenger cage.

**Segue — exact player copy:** Now Nia Cole must explain two readings that do not match, before a small gravity change is blamed for March.

### Worth knowing first — exact player copy

#### Glossary terms

Momentum: mass multiplied by velocity.

Impulse: the change in momentum caused by force over time.

Mass flow: the mass passing a point each second.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- A stream carries momentum into and out of the chosen region.

#### Equations first needed today

**Equation:** F = ṁ(vout−vin); J = ∫F dt = Δp

**What it is for:** momentum, impulse and open systems in the measured system.

**Symbols:** F force on the stream in newtons; ṁ mass flow in kilograms per second; vout and vin exit and entry velocities; J impulse in newton seconds; p momentum in kilogram metres per second.

**Why this campaign needs it:** Which feed change protects the conveyor and bin?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A 2 kilogram cart changes speed from 1 to 4 metres per second; Δp=2(4−1)=6 kilogram metres per second.

2. A 15 newton force acts for 0.2 seconds; impulse is 15×0.2=3 newton seconds.

3. A triangular force pulse peaks at 40 newtons over 0.5 seconds; impulse is half the rectangle, 10 newton seconds.

4. A 2 kilogram cart at 3 metres per second sticks to a stationary 1 kilogram cart; common speed is 6/3=2 metres per second and kinetic energy falls from 9 to 6 joules.

5. Two equal-mass carts collide elastically in one dimension, one initially at 4 metres per second and the other stationary; momentum and kinetic energy conservation give speeds 0 and 4 metres per second.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 21 first unlocks the intermediate room and Stop 22 unlocks the third.

## B. Main story happening — designer summary

A staged chute is marked for installation beside the bin. The day moves from explain the belt trips through derive the force of the stream and mean bin impact force to the owner’s signed decision. The survey book carries an unexplained change between repeated gravity readings. Ivo marks the staged chute for installation. It preserves daily delivery in the stated model, removing one reason to demand that the passenger cage make up lost ore time.

## C. Designer intent — not shown to player

Spread the incoming momentum change over more time with the staged chute. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D6-ARR — On arrival at Tip and Conveyor

**Location:** Tip and Conveyor.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ivo Reed, by radio:** “We can change how ore enters the bin. We cannot ask the passenger cage to make every lost minute back.”

**Dialogue bubble — Ewan Price, by radio:** “Show me a throughput gain I can defend without adding passenger speed.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 21.

### Beat OW-D6-R2 — After Stop 22

**Location:** Tip and Conveyor.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** F=Δp/Δt=ṁv=1000 N for ṁ=200 kg/s and v=5 m/s. Take this evidence to Shaft and Brake House at The pad bench; only that record or test can check the next part.

**Panel text:** “F=Δp/Δt=ṁv=1000 N for ṁ=200 kg/s and v=5 m/s. Take this evidence to Shaft and Brake House at The pad bench; only that record or test can check the next part.”

**Dialogue bubble — Ewan Price, by radio:** “The same incoming momentum can be transferred over more time.”

**Dialogue bubble — Ivo Reed, by radio:** “That gives the chute a job. I do not need to promise a faster cage to make it useful.”

**Unlocks:** Stop 23 and waypoint to Shaft and Brake House.

### Beat OW-D6-R3 — After Stop 23 is accepted

**Location:** Current Stop 23 fixture (Shaft and Brake House, The pad bench (`pad-bench`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 23 evidence is retained; no additional state or reward.

**Dialogue bubble — Ivo Reed, by radio:** “The comparison supports the staged feed. Let us label that arrangement before the next ore run.”

**Unlocks:** No new gate; continue to existing Stop 24.

### Beat OW-D6-DEC — After Stop 24

**Location:** Shaft and Brake House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Spread the incoming momentum change over more time with the staged chute.

**Panel text:** “Spread the incoming momentum change over more time with the staged chute.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D6-END — At mission end

**Location:** Shaft and Brake House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** A staged chute is marked for installation beside the bin. The survey book carries an unexplained change between repeated gravity readings.

**Panel text:** “Ivo marks the staged chute for installation. It preserves daily delivery in the stated model, removing one reason to demand that the passenger cage make up lost ore time. Now Nia Cole must explain two readings that do not match, before a small gravity change is blamed for March.”

**Dialogue bubble — Jon Pike, by radio:** “I have labeled the staged ore feed. The passenger timetable is still the old restricted sheet.”

**Dialogue bubble — Ivo Reed, by radio:** “Keep them separate. This gain belongs to the chute.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-chute-tag

**Home:** `bin-bolts`. **Before:** Arrangement tag unassigned. **After — exact action:** Ivo attaches the staged-feed tag beside the fracture photographs.

**Trigger:** accepted_stop_24. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Tip and Conveyor → Shaft and Brake House.

- Stop 21: Tip and Conveyor, The weightometer (`weightometer`).
- Stop 22: Tip and Conveyor, The weightometer (`weightometer`).
- Stop 23: Shaft and Brake House, The pad bench (`pad-bench`).
- Stop 24: Shaft and Brake House, The pad bench (`pad-bench`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ivo Reed, conveyor foreman, owns the TIP evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ada Kerr, mine safety engineer, owns the CAGE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Momentum and impulse track the change in directed motion over the actual time interval. A small standing mass does not imply a small rate of momentum transfer. The response must distinguish continuous loading from a brief collision or impact. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 21 — Explain the belt trips

**Format/placement:** DIAGNOSIS, Tip and Conveyor — The weightometer.

**Required stop kind:** calculation. **Player verb:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Metadata:** Concept: 6 — Explain the belt trips; Keystone: Forces and boundaries, Momentum and impulse; Area: TIP; Prerequisites: Stop 20 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L4; Story role: reversal.

**Briefing decision advanced:** Which feed change protects the conveyor and bin?

**Actual mission answer — authoring only:** Spread the incoming momentum change over more time with the staged chute.

**Call — exact player copy:** Go to Tip and Conveyor and inspect The weightometer.

**Stop reason — exact player copy:** The belt trips while its standing load stays below the limit.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ivo Reed notes that the energy page is accepted, but the conveyor keeps tripping even when its scale reports a modest standing load. Read the incoming flow and speed alongside the quiet mass reading to decide which missing force the drive must supply.

**Question card story-science connection — exact player copy:** The momentum history decides whether the feed arrangement can protect the machinery while keeping ore moving.

**Data/readings — exact player copy:** belt: steady mass on belt 4000 kg, below 5000 kg limit (normal); feed: horizontal arrival velocity 0 m/s before reaching 5 m/s belt (watch); drive: flow-dependent extra pull 1000 N at 200 kg/s (alarm)

**Format-specific interaction block:**
```yaml
headline: Explain the belt trips
readings:
- zone: belt
  label: steady mass on belt
  value: 4000 kg, below 5000 kg limit
  status: normal
- zone: feed
  label: horizontal arrival velocity
  value: 0 m/s before reaching 5 m/s belt
  status: watch
- zone: drive
  label: flow-dependent extra pull
  value: 1000 N at 200 kg/s
  status: alarm
choices:
- label: Incoming ore must gain horizontal momentum.
  mechanism: Incoming ore must gain horizontal momentum.
- label: The supported ore exceeds the belt mass limit.
  mechanism: The supported ore exceeds the belt mass limit.
- label: The ore arrives already moving with the belt.
  mechanism: The ore arrives already moving with the belt.
- label: A fixed jam creates force unrelated to flow.
  mechanism: A fixed jam creates force unrelated to flow.
answer: Incoming ore must gain horizontal momentum.
rebuttals:
  The supported ore exceeds the belt mass limit.: The normal 4000 kg reading is below the mass limit.
  The ore arrives already moving with the belt.: Incoming speed is measured as zero, not 5 m/s.
  A fixed jam creates force unrelated to flow.: The added pull changes with incoming flow, contrary to a flow-independent jam.
why: The quiet mass reading rejects overload, while entry speed and flow-dependent force identify the momentum imparted to the entering ore.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Correct result:** Incoming ore must gain horizontal momentum.. Acceptance: exact authored key.

**Answer text:** The quiet mass reading rejects overload, while entry speed and flow-dependent force identify the momentum imparted to the entering ore.

**Why/mechanism:** The quiet mass reading rejects overload, while entry speed and flow-dependent force identify the momentum imparted to the entering ore. The alternative ‘The supported ore exceeds the belt mass limit.’ fails for this reason: The normal 4000 kg reading is below the mass limit. The alternative ‘A fixed jam creates force unrelated to flow.’ fails for this reason: The added pull changes with incoming flow, contrary to a flow-independent jam.

**Misconception:** The supported ore exceeds the belt mass limit..

**Wrong-path feedback:**

- **The supported ore exceeds the belt mass limit.:** The normal 4000 kg reading is below the mass limit.
- **The ore arrives already moving with the belt.:** Incoming speed is measured as zero, not 5 m/s.
- **A fixed jam creates force unrelated to flow.:** The added pull changes with incoming flow, contrary to a flow-independent jam.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The weightometer gains a dated evidence slip: Incoming ore must gain horizontal momentum.

**Unlock:** Stop 22.

**Retrieval:** Stop 20 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can the local gravity correction explain the March overrun?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 21 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 22 — Derive the force of the stream

**Format/placement:** DERIVE, Tip and Conveyor — The weightometer.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 6 — Derive the force of the stream; Keystone: Forces and boundaries, Momentum and impulse; Area: TIP; Prerequisites: Stop 21 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** Which feed change protects the conveyor and bin?

**Actual mission answer — authoring only:** Spread the incoming momentum change over more time with the staged chute.

**Call — exact player copy:** Go to Tip and Conveyor and inspect The weightometer.

**Stop reason — exact player copy:** Incoming ore creates a force by gaining momentum.

**Question card story setup — exact player copy (40 words; 2 sentences):** Ivo Reed sees that the panel points to incoming ore gaining speed, so the force depends on material entering rather than only material already present. Derive that momentum rate before using the belt result to investigate the broken bin bolts.

**Question card story-science connection — exact player copy:** The momentum history decides whether the feed arrangement can protect the machinery while keeping ore moving.

**Data/readings — exact player copy:** During Δt, incoming mass Δm=ṁΔt gains horizontal speed from 0 to v; ṁ=200 kg/s and v=5 m/s; ignore horizontal drag after loading.

**Format-specific interaction block:**
```yaml
derive:
  start: During Δt, incoming mass Δm=ṁΔt gains horizontal speed from 0 to v; ṁ=200 kg/s and v=5 m/s; ignore horizontal drag after loading.
  goal: Obtain the steady horizontal force required to load the belt.
  steps:
  - id: line1
    prompt: Count the momentum gained by mass entering during the interval.
    choices:
    - line: Δp=(ṁΔt)v
      correct: true
    - line: Δp=(ṁ/Δt)v
      correct: false
      survives: true
      why: Dividing by elapsed time when finding incoming mass reverses the definition of mass flow.
  - id: line2
    prompt: Divide momentum change by the interval.
    choices:
    - line: F=Δp/Δt=ṁv=200×5=1000 N
      correct: true
    - line: F=Δp/Δt=ṁv²=5000 N for ṁ=200 kg/s and v=5 m/s
      correct: false
      survives: true
      why: Squaring speed gives energy per time units, not the force supplied by the belt.
  answerText: In each second 200 kg acquires 5 m/s of horizontal speed, so the belt supplies 1000 kg m/s of momentum per second; the equal opposite reaction loads the drive.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** F=Δp/Δt=ṁv=1000 N for ṁ=200 kg/s and v=5 m/s. Acceptance: exact authored key.

**Answer text:** In each second 200 kg acquires 5 m/s of horizontal speed, so the belt supplies 1000 kg m/s of momentum per second; the equal opposite reaction loads the drive.

**Why/mechanism:** In each second 200 kg acquires 5 m/s of horizontal speed, so the belt supplies 1000 kg m/s of momentum per second; the equal opposite reaction loads the drive. Dividing by elapsed time when finding incoming mass reverses the definition of mass flow. Squaring speed gives energy per time units, not the force supplied by the belt. During Δt, incoming mass Δm=ṁΔt gains horizontal speed from 0 to v; ṁ=200 kg/s and v=5 m/s; ignore horizontal drag after loading.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Dividing by elapsed time when finding incoming mass reverses the definition of mass flow.
- **2:** Squaring speed gives energy per time units, not the force supplied by the belt.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The weightometer gains a dated evidence slip: F=Δp/Δt=ṁv=1000 N for ṁ=200 kg/s and v=5 m/s

**Unlock:** Stop 23.

**Retrieval:** Stop 21 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can the local gravity correction explain the March overrun?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 22 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 23 — Mean bin impact force

**Format/placement:** BALLPARK, Shaft and Brake House — The pad bench.

**Required stop kind:** calculation. **Player verb:** Choose the quantity tiles for the displayed formula a/b

**Metadata:** Concept: 6 — Mean bin impact force; Keystone: Momentum and impulse, Constraints and uncertainty; Area: CAGE; Prerequisites: Stop 22 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** Which feed change protects the conveyor and bin?

**Actual mission answer — authoring only:** Spread the incoming momentum change over more time with the staged chute.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The pad bench.

**Stop reason — exact player copy:** A short bin impact is different from a steady feed.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ada Kerr confirms that the continuous loading force is understood, but the broken bolts belong to a short impact with a different time history. Use the transferred momentum and stopping interval at the test bench to check the force the bin must withstand.

**Question card story-science connection — exact player copy:** The momentum history decides whether the feed arrangement can protect the machinery while keeping ore moving.

**Data/readings — exact player copy:** Instrumented bin surrogate receives 600 kg m/s momentum and stops it in 0.2 s; Favg=Δp/Δt; force limit 1500 N.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Mean bin impact force
  labels:
  - arriving momentum (kg m/s)
  - stopping time (s)
  - longer-time alternative (s)
  values:
  - 600
  - 0.2
  - 0.6
  slots: 2
  template: Use the labeled quantities to fill 2 blanks.
  formula: a/b
  correct:
  - 0
  - 1
  target: 3000
  tolerance: 3.0
  units: N
  correctResult: 3000
answerText: Favg=600/0.2=3000 N, so the short impact exceeds the fictional 1500 N limit; a 0.6 s stop would give 1000 N.
```

**Question card prompt — exact player copy:** Choose the quantity tiles for the displayed formula a/b; submit the resulting mean bin impact force in N.

**Correct result:** 3000 N. Acceptance: 3.0.

**Answer text:** Favg=600/0.2=3000 N, so the short impact exceeds the fictional 1500 N limit; a 0.6 s stop would give 1000 N.

**Why/mechanism:** Favg=600/0.2=3000 N, so the short impact exceeds the fictional 1500 N limit; a 0.6 s stop would give 1000 N. Multiplying momentum by time does not give force. The alternative ‘1000 N’ fails for this reason: That is the proposed longer stop, not the measured short stop. Instrumented bin surrogate receives 600 kg m/s momentum and stops it in 0.2 s; Favg=Δp/Δt; force limit 1500 N.

**Misconception:** 120 N.

**Wrong-path feedback:**

- **120 N:** Multiplying momentum by time does not give force.
- **1000 N:** That is the proposed longer stop, not the measured short stop.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The pad bench gains a dated evidence slip: 3000 N

**Unlock:** Stop 24.

**Retrieval:** Stop 22 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can the local gravity correction explain the March overrun?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 23 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 24 — Commit the day’s plan

**Format/placement:** CHOICE, Ada Kerr at The pad bench.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 6 — Commit the day’s plan; Keystone: Forces and boundaries, Momentum and impulse, Constraints and uncertainty; Area: CAGE; Prerequisites: Stop 23 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Which feed change protects the conveyor and bin?

**Actual mission answer — authoring only:** Spread the incoming momentum change over more time with the staged chute.

**Call — exact player copy:** Go to Shaft and Brake House and meet Ada Kerr, mine safety engineer, at The pad bench.

**Stop reason — exact player copy:** The bin needs a longer stop without losing the delivery target.

**Question card story setup — exact player copy (44 words; 2 sentences):** Ada Kerr finds that the short impact exceeds the bin limit even though the steady belt force is acceptable under its own operating conditions. Compare the staged chute with the unchanged drop before choosing a feed arrangement that preserves delivery without repeating the damage.

**Question card story-science connection — exact player copy:** The momentum history decides whether the feed arrangement can protect the machinery while keeping ore moving.

**Data/readings — exact player copy:** Steady loading requires 1000 N; bin mean-force limit 1500 N; short impact is 3000 N; staged chute extends the same 600 kg m/s momentum change to 0.6 s, giving 1000 N; staging does not change daily mass delivery.

**Format-specific interaction block:**
```yaml
question: Which feed change protects the conveyor and bin?
choices:
- Fit the staged chute and preserve the flow target.
- Keep the short drop because the belt mass is low.
- Triple belt speed to reduce its required drive force.
- Certify the bin from the steady belt force alone.
answer: Fit the staged chute and preserve the flow target.
why: The chute reduces peak demand by extending the stopping time; the steady stream and the impact must each meet their own stated constraint.
rebuttals:
  Keep the short drop because the belt mass is low.: Mass sitting on the belt does not bound an impact’s force.
  Triple belt speed to reduce its required drive force.: F=ṁv increases with belt speed at fixed incoming flow.
  Certify the bin from the steady belt force alone.: A continuous loading force and a short collision have different momentum histories.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Fit the staged chute and preserve the flow target.. Acceptance: exact authored key.

**Answer text:** The chute reduces peak demand by extending the stopping time; the steady stream and the impact must each meet their own stated constraint.

**Why/mechanism:** The chute reduces peak demand by extending the stopping time; the steady stream and the impact must each meet their own stated constraint. Mass sitting on the belt does not bound an impact’s force. Steady loading requires 1000 N; bin mean-force limit 1500 N; short impact is 3000 N; staged chute extends the same 600 kg m/s momentum change to 0.6 s, giving 1000 N; staging does not change daily mass delivery.

**Misconception:** Keep the short drop because the belt mass is low..

**Wrong-path feedback:**

- **Keep the short drop because the belt mass is low.:** Mass sitting on the belt does not bound an impact’s force.
- **Triple belt speed to reduce its required drive force.:** F=ṁv increases with belt speed at fixed incoming flow.
- **Certify the bin from the steady belt force alone.:** A continuous loading force and a short collision have different momentum histories.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The pad bench gains a dated evidence slip: Fit the staged chute and preserve the flow target.

**Unlock:** Day 6 outcome and recovery allocation.

**Retrieval:** Stop 23 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can the local gravity correction explain the March overrun?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 24 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Fit the staged chute. The longer stop lowers the force on the bin. Ore can still reach the belt at the planned rate. The next file holds two gravity readings that disagree. Ivo marks the staged chute for installation. It preserves daily delivery in the stated model, removing one reason to demand that the passenger cage make up lost ore time.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 6 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** A staged chute is marked for installation beside the bin. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +4 | Test Evidence +4 | Workshop Reserve -2 | Passenger Safeguards +3.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [76, 75, 73, 78]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- The quiet mass reading rejects overload, while entry speed and flow-dependent force identify the momentum imparted to the entering ore..
- In each second 200 kg acquires 5 m/s of horizontal speed, so the belt supplies 1000 kg m/s of momentum per second; the equal opposite reaction loads the drive..
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** Changing momentum over a longer time can reduce force.

---

### GO DEEPER — Mission 6 — optional exact player copy

**Availability:** After mission_complete_6, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Study a stream of small parcels entering a receiver. Distinguish the momentum carried in each second from the momentum of the material already collected, and use impulse to compare gentler catches.

**Supporting concepts:**

- Momentum is mv, and a chosen system’s momentum changes through external impulse.
- A steady stream arriving at mass rate ṁ and losing velocity Δv transfers momentum at rate ṁΔv.
- For a fixed momentum change, a longer stopping time lowers the time-averaged force.
- In a perfectly inelastic collision objects stick; momentum can be conserved while kinetic energy decreases.

#### OW-GD-M6-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A stream supplies 3 kg/s horizontally at 4 m/s and is brought to horizontal rest. What horizontal force magnitude does it exert on the receiver?

- **A.** 12 N
- **B.** 0.75 N
- **C.** 7 N
- **D.** 48 N

**Correct key:** A

**Hint:** Use arriving momentum per second.

**Feedback A:** The momentum flux removed is 3×4.

**Feedback B:** Momentum flux multiplies mass rate and velocity change.

**Feedback C:** Mass rate and velocity cannot be added.

**Feedback D:** The velocity is not squared in momentum flux.

**Independent solution:** F=ṁΔv=3×4=12 N.

#### OW-GD-M6-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg parcel loses 6 m/s of horizontal velocity. The stop lasts 0.3 s. What is the average resisting force magnitude?

- **A.** 3.6 N
- **B.** 20 N
- **C.** 12 N
- **D.** 40 N

**Correct key:** D

**Hint:** Average force is impulse divided by duration.

**Feedback A:** That multiplies momentum change by time rather than dividing.

**Feedback B:** This omits the parcel mass.

**Feedback C:** 12 is the impulse in N s, not the force.

**Feedback D:** Momentum change 12 kg m/s divided by 0.3 s gives 40 N.

**Independent solution:** F_avg=2×6/0.3=40 N.

#### OW-GD-M6-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A catcher doubles stopping time for the same incoming parcel and final rest state. What happens to average force?

- **A.** It doubles
- **B.** It halves
- **C.** It stays fixed
- **D.** It becomes zero

**Correct key:** B

**Hint:** The momentum change stays fixed.

**Feedback A:** The same impulse is spread over more time.

**Feedback B:** F_avg=Δp/Δt gives half the force.

**Feedback C:** Impulse is fixed, not average force.

**Feedback D:** A finite momentum change still requires nonzero impulse.

**Independent solution:** New F_avg=Δp/(2Δt)=old F_avg/2.

#### OW-GD-M6-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg cart at +3 m/s sticks to a stationary 1 kg cart on a frictionless track. What is their common final velocity?

- **A.** +3 m/s
- **B.** +1 m/s
- **C.** +2 m/s
- **D.** 0 m/s

**Correct key:** C

**Hint:** Conserve total momentum across the collision.

**Feedback A:** The original momentum is now shared by more mass.

**Feedback B:** Initial momentum is 6 kg m/s, not 3.

**Feedback C:** 6 kg m/s divided by 3 kg gives 2 m/s.

**Feedback D:** There is no opposite initial momentum to cancel it.

**Independent solution:** v_f=(2×3+1×0)/(2+1)=2 m/s.

#### OW-GD-M6-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** For that collision—2 kg at 3 m/s sticking to 1 kg initially at rest, ending at 2 m/s—how much kinetic energy is lost?

- **A.** 3 J
- **B.** 0 J
- **C.** 6 J
- **D.** 9 J

**Correct key:** A

**Hint:** Compute both kinetic energies.

**Feedback A:** Initial K=9 J and final K=6 J.

**Feedback B:** Sticking does not conserve kinetic energy.

**Feedback C:** That is final kinetic energy, not the loss.

**Feedback D:** The joined carts are still moving after impact.

**Independent solution:** Loss=0.5×2×9−0.5×3×4=3 J.

#### OW-GD-M6-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A horizontal stream strikes a stationary wall at 5 m/s, then leaves horizontally at −5 m/s, with mass rate 2 kg/s. What horizontal force magnitude acts on the wall?

- **A.** 10 N
- **B.** 5 N
- **C.** 0 N
- **D.** 20 N

**Correct key:** D

**Hint:** Include the sign reversal.

**Feedback A:** That would apply if the stream only stopped.

**Feedback B:** The mass rate and full velocity change both matter.

**Feedback C:** Equal speed does not mean equal velocity.

**Feedback D:** Reversal changes velocity by 10 m/s; the momentum flux magnitude is 20 N.

**Independent solution:** |F|=2×|−5−5|=20 N.


# Mission 7 — WHAT DEPTH CAN CHANGE

## A. Mission briefing card — exact player copy

**Header:** DAY 7 OF 12 — INSPECTION IN 6 DAYS

**Card title:** WHAT DEPTH CAN CHANGE

**Go now:** Go to Gravity Station and meet Nia Cole, survey engineer, at The gravimeter.

**Card body (51 words; 4 sentences):** The feed fix works, but two gravity readings in the lift file do not match. A meter can drift while the ground stays the same. At the Gravity Station and Rope Shop, check drift and depth. By the end of the mission, you decide if gravity can explain the March overrun.

**Objective:** Can the local gravity correction explain the March overrun?

**Stake — exact player copy:** Today you decide if Nia’s corrected reading explains March or leaves Ada’s old check unanswered.

**Segue — exact player copy:** Yet Ewan Price’s timetable still asks the motor to supply energy faster than it may be able to.

### Worth knowing first — exact player copy

#### Glossary terms

Gravity: the attraction between masses.

Drift: a measuring instrument’s gradual change over time.

Spherical symmetry: mass distributed equally in every direction from a center.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- A uniform sphere is an explicit idealization, not a survey of local rock.

#### Equations first needed today

**Equation:** g(r)=GM(r)/r²; M(r)=Mtotal(r/R)³ for a uniform sphere

**What it is for:** gravitation and measurement models in the measured system.

**Symbols:** g gravitational acceleration; G gravitational constant; M(r) mass inside radius r; Mtotal full sphere mass; R sphere radius; r distance from the sphere center.

**Why this campaign needs it:** Can the local gravity correction explain the March overrun?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. For a spherical body with GM=200 in compatible units, gravity at radius 10 is 200/100=2 acceleration units.

2. In a uniform sphere at radius R/2, enclosed mass is M/8; dividing by radius squared gives local gravity half the surface value.

3. A repeated reference reads 9.80 then 9.83 metres per second squared; a simultaneous field reading of 9.78 is corrected by subtracting 0.03 to give 9.75.

4. A 50 kilogram mass at g=9.6 metres per second squared weighs 480 newtons; using g=10 gives 500 newtons, 20 newtons too high.

5. A small-angle pendulum of length 1 metre with g=π² metres per second squared has period 2π√(1/π²)=2 seconds.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 25 first unlocks the intermediate room and Stop 26 unlocks the third.

## B. Main story happening — designer summary

The drift correction is attached to the load table. The day moves from find the drifting reference through derive the ideal depth trend and separate survey from assumption to the owner’s signed decision. The fastest requested lift still exceeds the motor power budget. Nia signs the drift correction and keeps the March inquiry open. A fault in her reading does not erase the separate evidence of the moving cage.

## C. Designer intent — not shown to player

Use the corrected survey value, but reject gravity as the explanation of the delayed overrun. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D7-ARR — On arrival at Gravity Station

**Location:** Gravity Station.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Nia Cole, by radio:** “The reference shifted between readings. Let us repair that comparison before we give gravity the blame.”

**Dialogue bubble — Mara Shaw, by radio:** “I will keep the rope lengths beside your survey. Neither record should travel alone.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 25.

### Beat OW-D7-R2 — After Stop 26

**Location:** Gravity Station.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** g(R−d)=g0(1−d/R)=9.998 m/s². Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.

**Panel text:** “g(R−d)=g0(1−d/R)=9.998 m/s². Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.”

**Dialogue bubble — Mara Shaw, by radio:** “Your ideal depth trend uses a model of the Earth. Does that certify this shaft's reading?”

**Dialogue bubble — Nia Cole, by radio:** “No. The corrected site record and the ideal model must remain distinct.”

**Unlocks:** Stop 27 and waypoint to Rope Shop.

### Beat OW-D7-R3 — After Stop 27 is accepted

**Location:** Current Stop 27 fixture (Rope Shop, The rope bench (`rope-bench`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 27 evidence is retained; no additional state or reward.

**Dialogue bubble — Nia Cole, by radio:** “The site correction is worth keeping. It still does not produce a delayed cage bounce.”

**Unlocks:** No new gate; continue to existing Stop 28.

### Beat OW-D7-DEC — After Stop 28

**Location:** Rope Shop.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.

**Panel text:** “Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D7-END — At mission end

**Location:** Rope Shop.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The drift correction is attached to the load table. The fastest requested lift still exceeds the motor power budget.

**Panel text:** “Nia signs the drift correction and keeps the March inquiry open. A fault in her reading does not erase the separate evidence of the moving cage. Yet Ewan Price’s timetable still asks the motor to supply energy faster than it may be able to.”

**Dialogue bubble — Nia Cole, by radio:** “The corrected survey is filed. Ada still deserves an answer about the delay in March.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-survey-tab

**Home:** `level-book`. **Before:** Reference tab loose. **After — exact action:** Nia places the tab against the corrected entry without erasing the original.

**Trigger:** accepted_stop_28. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Gravity Station → Rope Shop.

- Stop 25: Gravity Station, The gravimeter (`gravimeter`).
- Stop 26: Gravity Station, The level book (`level-book`).
- Stop 27: Rope Shop, The rope bench (`rope-bench`).
- Stop 28: Rope Shop, The rope bench (`rope-bench`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Nia Cole, survey engineer, owns the GRAV evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Mara Shaw, rope technician, owns the ROPE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Models and evidence must preserve the distinction between a measurement and a result obtained under ideal assumptions. A repeat observation can expose a measuring offset without changing the physical system. Evidence supports only the claim its conditions actually test. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 25 — Find the drifting reference

**Format/placement:** PROBE, Gravity Station — The gravimeter.

**Required stop kind:** operated. **Player verb:** Select and read all four stations without changing their loads, then submit the station with a mismatch and its implication. No controls need restoration.

**Metadata:** Concept: 7 — Find the drifting reference; Keystone: Models and evidence, Constraints and uncertainty; Area: GRAV; Prerequisites: Stop 24 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can the local gravity correction explain the March overrun?

**Actual mission answer — authoring only:** Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.

**Call — exact player copy:** Go to Gravity Station and inspect The gravimeter.

**Stop reason — exact player copy:** Repeated reference readings disagree before the depth correction is trusted.

**Question card story setup — exact player copy (41 words; 2 sentences):** Nia Cole notes that the chute change solves the feed problem, but the lift file contains two different readings from the same gravity reference. Compare each station with its own expected value before deciding whether the survey needs a drift correction.

**Question card story-science connection — exact player copy:** Separating a model from a measurement keeps the survey from becoming a false explanation of March.

**Data/readings — exact player copy:** Compare each reading with its own expected value; Synthetic instructional survey; compare units within each station only.

**Format-specific interaction block:**
```yaml
probe:
  stations:
  - id: ref1
    label: Reference at start
    reading: 9.80 m/s²
    expected: 9.80 m/s²
    load: same pillar, 09:00
  - id: test
    label: Check mass
    reading: 1.000 kg
    expected: 1.000 kg
    load: balance check
  - id: level
    label: Level check
    reading: 0.00 degrees
    expected: 0.00 degrees
    load: instrument level
  - id: ref2
    label: Reference at end
    reading: 9.82 m/s²
    expected: 9.80 m/s²
    load: same pillar, 10:00
  target: ref2
  quantityAndUnits: Synthetic instructional survey; compare units within each station only.
  correctConclusion: Only the repeated reference shifts; subtract the measured +0.02 m/s² instrument offset from readings at 10:00.
  answerText: Only the repeated reference shifts; subtract the measured +0.02 m/s² instrument offset from readings at 10:00.
```

**Question card prompt — exact player copy:** Select and read all four stations without changing their loads, then submit the station with a mismatch and its implication. No controls need restoration.

**Correct result:** ref2. Acceptance: exact authored key.

**Answer text:** Only the repeated reference shifts; subtract the measured +0.02 m/s² instrument offset from readings at 10:00.

**Why/mechanism:** Only the repeated reference shifts; subtract the measured +0.02 m/s² instrument offset from readings at 10:00. The alternative ‘ref1’ fails for this reason: Reference at start: observed 9.80 m/s², expected 9.80 m/s²; compare this pair rather than another station. The alternative ‘test’ fails for this reason: Check mass: observed 1.000 kg, expected 1.000 kg; compare this pair rather than another station.

**Misconception:** ref1.

**Wrong-path feedback:**

- **ref1:** Reference at start: observed 9.80 m/s², expected 9.80 m/s²; compare this pair rather than another station.
- **test:** Check mass: observed 1.000 kg, expected 1.000 kg; compare this pair rather than another station.
- **level:** Level check: observed 0.00 degrees, expected 0.00 degrees; compare this pair rather than another station.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The gravimeter gains a dated evidence slip: ref2

**Unlock:** Stop 26.

**Retrieval:** Stop 24 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; delayed retrieval after an intervening day.

**Later payoff:** Which cruise speed fits the motor power limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 25 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 26 — Derive the ideal depth trend

**Format/placement:** DERIVE, Gravity Station — The level book.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 7 — Derive the ideal depth trend; Keystone: Mass distribution, Models and evidence; Area: GRAV; Prerequisites: Stop 25 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can the local gravity correction explain the March overrun?

**Actual mission answer — authoring only:** Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.

**Call — exact player copy:** Go to Gravity Station and inspect The level book.

**Stop reason — exact player copy:** The ideal depth trend must stay separate from local evidence.

**Question card story setup — exact player copy (43 words; 2 sentences):** Nia Cole sees that the repeated reference reveals an instrument offset, which must be separated from any physical effect of going deeper underground. Derive the prediction for a deliberately simple spherical body before deciding what that ideal model can tell the local survey.

**Question card story-science connection — exact player copy:** Separating a model from a measurement keeps the survey from becoming a false explanation of March.

**Data/readings — exact player copy:** Uniform ideal spherical body, surface radius R=6200000 m and surface gravity g0=10 m/s²; radius at depth d is r=R−d; only interior mass contributes to net gravity by spherical symmetry. Evaluate depth d=1240 m; calculator available.

**Format-specific interaction block:**
```yaml
derive:
  start: Uniform ideal spherical body, surface radius R=6200000 m and surface gravity g0=10 m/s²; radius at depth d is r=R−d; only interior mass contributes to net gravity by spherical symmetry. Evaluate depth d=1240 m; calculator available.
  goal: Derive a ratio of depth gravity to surface gravity and evaluate d=1240 m.
  steps:
  - id: line1
    prompt: Combine enclosed mass and the inverse-square relation.
    choices:
    - line: g(r)/g0=(r/R)³(R/r)²=r/R
      correct: true
    - line: g(r)/g0=(R/r)² while retaining the whole mass
      correct: false
      survives: true
      why: Inside a uniform sphere the outer shells contribute no net force; retaining the whole mass treats the interior point as outside.
  - id: line2
    prompt: Substitute the interior radius and simplify.
    choices:
    - line: g(R−d)=g0(1−d/R)=10×(1−1240/6200000)=9.998 m/s²
      correct: true
    - line: g(R−d)=g0(1+d/R)=10.002 m/s²
      correct: false
      survives: true
      why: The interior radius is smaller, so the uniform-sphere model predicts a smaller gravity, not a larger one.
  answerText: For the stipulated sphere d/R=0.0002, so g=10(0.9998)=9.998 m/s². Real mine geology need not follow this uniform model; the corrected survey, not this idealization, supplies operating g.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** g(R−d)=g0(1−d/R)=9.998 m/s². Acceptance: exact authored key.

**Answer text:** For the stipulated sphere d/R=0.0002, so g=10(0.9998)=9.998 m/s². Real mine geology need not follow this uniform model; the corrected survey, not this idealization, supplies operating g.

**Why/mechanism:** For the stipulated sphere d/R=0.0002, so g=10(0.9998)=9.998 m/s². Real mine geology need not follow this uniform model; the corrected survey, not this idealization, supplies operating g. Inside a uniform sphere the outer shells contribute no net force; retaining the whole mass treats the interior point as outside. The interior radius is smaller, so the uniform-sphere model predicts a smaller gravity, not a larger one.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Inside a uniform sphere the outer shells contribute no net force; retaining the whole mass treats the interior point as outside.
- **2:** The interior radius is smaller, so the uniform-sphere model predicts a smaller gravity, not a larger one.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The level book gains a dated evidence slip: g(R−d)=g0(1−d/R)=9.998 m/s²

**Unlock:** Stop 27.

**Retrieval:** Stop 25 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which cruise speed fits the motor power limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 26 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 27 — Separate survey from assumption

**Format/placement:** PROTOCOL, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Match every evidence row to one response

**Metadata:** Concept: 7 — Separate survey from assumption; Keystone: Forces and boundaries, Models and evidence; Area: ROPE; Prerequisites: Stop 26 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can the local gravity correction explain the March overrun?

**Actual mission answer — authoring only:** Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The rope table needs a corrected measurement, not an assumed planet.

**Question card story setup — exact player copy (43 words; 2 sentences):** Mara Shaw confirms that the ideal depth calculation supplies a useful comparison, but its assumed mass distribution is not a measurement of this mine. Apply the observed drift correction and separate the survey result from the model before returning to the overrun explanation.

**Question card story-science connection — exact player copy:** Separating a model from a measurement keeps the survey from becoming a false explanation of March.

**Data/readings — exact player copy:** Field reading 9.82 m/s² at 10:00 with reference offset +0.02; Uniform-sphere calculation at depth gives 9.998 m/s²; Same static load but cage keeps moving after drum stops

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Field reading 9.82 m/s² at 10:00 with reference offset +0.02
  reading: Field reading 9.82 m/s² at 10:00 with reference offset +0.02
- id: e2
  label: Uniform-sphere calculation at depth gives 9.998 m/s²
  reading: Uniform-sphere calculation at depth gives 9.998 m/s²
- id: e3
  label: Same static load but cage keeps moving after drum stops
  reading: Same static load but cage keeps moving after drum stops
choices:
- id: r1
  label: Use corrected field value 9.80 m/s²
- id: r2
  label: Treat it as an ideal comparison rather than a local survey
- id: r3
  label: Test time-dependent rope motion rather than only weight
mapping:
  e1: r1
  e2: r2
  e3: r3
answerText: A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage.
```

**Question card prompt — exact player copy:** Match every evidence row to one response; use each response once and submit all connections.

**Correct result:** Field reading 9.82 m/s² at 10:00 with reference offset +0.02 → Use corrected field value 9.80 m/s²; Uniform-sphere calculation at depth gives 9.998 m/s² → Treat it as an ideal comparison rather than a local survey; Same static load but cage keeps moving after drum stops → Test time-dependent rope motion rather than only weight. Acceptance: exact authored key.

**Answer text:** A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage.

**Why/mechanism:** A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage. The evidence ‘Field reading 9.82 m/s² at 10:00 with reference offset +0.02’ requires the response ‘Use corrected field value 9.80 m/s²’. The evidence ‘Uniform-sphere calculation at depth gives 9.998 m/s²’ requires the response ‘Treat it as an ideal comparison rather than a local survey’.

**Misconception:** e1.

**Wrong-path feedback:**

- **e1:** For Field reading 9.82 m/s² at 10:00 with reference offset +0.02, use Use corrected field value 9.80 m/s²; A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage.
- **e2:** For Uniform-sphere calculation at depth gives 9.998 m/s², use Treat it as an ideal comparison rather than a local survey; A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage.
- **e3:** For Same static load but cage keeps moving after drum stops, use Test time-dependent rope motion rather than only weight; A static gravity correction changes the mean force; it does not by itself explain delayed relative motion between a fixed drum and a moving cage.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Field reading 9.82 m/s² at 10:00 with reference offset +0.02 → Use corrected field value 9.80 m/s²; Uniform-sphere calculation at depth gives 9.998 m/s² → Treat it as an ideal comparison rather than a local survey; Same static load but cage keeps moving after drum stops → Test time-dependent rope motion rather than only weight

**Unlock:** Stop 28.

**Retrieval:** Stop 26 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which cruise speed fits the motor power limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 27 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 28 — Commit the day’s plan

**Format/placement:** CHOICE, Mara Shaw at The rope bench.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 7 — Commit the day’s plan; Keystone: Forces and boundaries, Models and evidence, Constraints and uncertainty; Area: ROPE; Prerequisites: Stop 27 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Can the local gravity correction explain the March overrun?

**Actual mission answer — authoring only:** Use the corrected survey value, but reject gravity as the explanation of the delayed overrun.

**Call — exact player copy:** Go to Rope Shop and meet Mara Shaw, rope technician, at The rope bench.

**Stop reason — exact player copy:** A small weight correction must explain the time history to close March.

**Question card story setup — exact player copy (42 words; 2 sentences):** Mara Shaw finds that the corrected survey slightly lowers the estimated weight, while the March record still shows delayed motion after the drum stopped. Decide whether a static force correction accounts for that time history or whether another physical model is needed.

**Question card story-science connection — exact player copy:** Separating a model from a measurement keeps the survey from becoming a false explanation of March.

**Data/readings — exact player copy:** Corrected campaign survey g=9.80 m/s²; load table conservatively uses g=10 m/s²; at full length the static pull difference is 16000×0.20=3200 N; March record shows delayed relative motion after drum rest.

**Format-specific interaction block:**
```yaml
question: Can the local gravity correction explain the March overrun?
choices:
- Keep the conservative table and test the rope motion.
- Explain the delayed motion using gravity drift alone.
- Replace the local survey with the uniform-sphere result.
- Raise all speed limits because measured gravity is lower.
answer: Keep the conservative table and test the rope motion.
why: The 3.2 kN static correction is modest and conservatively covered; the time dependence of March remains unexplained and requires an elastic model.
rebuttals:
  Explain the delayed motion using gravity drift alone.: The instrument drift alters inferred weight; it does not supply the observed periodic motion.
  Replace the local survey with the uniform-sphere result.: The spherical calculation makes a stated mass-distribution assumption that the local survey does not.
  Raise all speed limits because measured gravity is lower.: A smaller weight does not certify braking, power or bounce constraints.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Keep the conservative table and test the rope motion.. Acceptance: exact authored key.

**Answer text:** The 3.2 kN static correction is modest and conservatively covered; the time dependence of March remains unexplained and requires an elastic model.

**Why/mechanism:** The 3.2 kN static correction is modest and conservatively covered; the time dependence of March remains unexplained and requires an elastic model. The instrument drift alters inferred weight; it does not supply the observed periodic motion. Corrected campaign survey g=9.80 m/s²; load table conservatively uses g=10 m/s²; at full length the static pull difference is 16000×0.20=3200 N; March record shows delayed relative motion after drum rest.

**Misconception:** Explain the delayed motion using gravity drift alone..

**Wrong-path feedback:**

- **Explain the delayed motion using gravity drift alone.:** The instrument drift alters inferred weight; it does not supply the observed periodic motion.
- **Replace the local survey with the uniform-sphere result.:** The spherical calculation makes a stated mass-distribution assumption that the local survey does not.
- **Raise all speed limits because measured gravity is lower.:** A smaller weight does not certify braking, power or bounce constraints.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Keep the conservative table and test the rope motion.

**Unlock:** Day 7 outcome and recovery allocation.

**Retrieval:** Stop 27 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which cruise speed fits the motor power limit?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 28 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Correct the survey, but do not blame gravity for March. The weight change is small. It does not explain the delayed cage motion. The power chart still rejects the fastest cruise. Nia signs the drift correction and keeps the March inquiry open. A fault in her reading does not erase the separate evidence of the moving cage.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 7 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The drift correction is attached to the load table. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +4 | Test Evidence +4 | Workshop Reserve -1 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [80, 79, 76, 80]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- Only the repeated reference shifts; subtract the measured +0.02 m/s² instrument offset from readings at 10:00..
- For the stipulated sphere d/R=0.0002, so g=10(0.9998)=9.998 m/s².
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** An ideal depth model is different from a measured gravity value.

---

### GO DEEPER — Mission 7 — optional exact player copy

**Availability:** After mission_complete_7, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Separate a gravitational model from an instrument reading. Work with ideal spherical bodies and simple reference corrections, then decide which claims need additional evidence.

**Supporting concepts:**

- Outside a spherical mass M, gravitational field magnitude is GM/r² at distance r from its centre.
- Inside an ideal uniform-density sphere of radius R, the field magnitude is g_surface r/R. Real Earth density is not uniform.
- An instrument offset adds to the true reading; a repeated known reference can reveal a change in that offset.
- A gravitational potential-energy difference near one location is approximately mgΔh only when g is effectively constant over the height change.

#### OW-GD-M7-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Outside a spherical planet, a probe moves from radius r to 2r. What happens to gravitational field magnitude?

- **A.** It halves
- **B.** It doubles
- **C.** It becomes one quarter
- **D.** It stays unchanged

**Correct key:** C

**Hint:** Square the new radius in the denominator.

**Feedback A:** The dependence is inverse square, not inverse distance.

**Feedback B:** Field decreases as distance increases.

**Feedback C:** GM/(2r)²=g(r)/4.

**Feedback D:** Outside the body, radius affects the field.

**Independent solution:** g(2r)/g(r)=r²/(4r²)=1/4.

#### OW-GD-M7-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An ideal uniform-density sphere has surface field 12 m/s². What is the field magnitude halfway from its centre to its surface?

- **A.** 24 m/s²
- **B.** 6 m/s²
- **C.** 3 m/s²
- **D.** 12 m/s²

**Correct key:** B

**Hint:** Use g=g_surface r/R for the stated ideal sphere.

**Feedback A:** The outside inverse-square law cannot be applied inside with all the mass at the centre.

**Feedback B:** Inside this model g is proportional to r.

**Feedback C:** The interior relation is linear, not quadratic.

**Feedback D:** Interior field is not constant in the stated model.

**Independent solution:** g=12×0.5=6 m/s².

#### OW-GD-M7-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A reference standard has true value 100 units. A sensor reads it as 103, then reads a sample as 118 under the same additive offset. What corrected sample value follows?

- **A.** 121 units
- **B.** 18 units
- **C.** 118 units
- **D.** 115 units

**Correct key:** D

**Hint:** Find the offset using the known standard.

**Feedback A:** The positive offset must be subtracted.

**Feedback B:** Subtracting the full standard value discards the sample baseline.

**Feedback C:** That leaves the measured offset uncorrected.

**Feedback D:** The offset is +3, so subtract 3 from 118.

**Independent solution:** b=103−100=3; sample_true=118−3=115 units.

#### OW-GD-M7-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A 2 kg object is raised 3 m where g=10 m/s² can be treated as constant. What is its gravitational potential-energy gain?

- **A.** 60 J
- **B.** 20 J
- **C.** 30 J
- **D.** 6 J

**Correct key:** A

**Hint:** Use m g Δh.

**Feedback A:** mgh=2×10×3.

**Feedback B:** That is the weight’s numerical value, not the energy gain.

**Feedback C:** This omits the object mass.

**Feedback D:** This omits g.

**Independent solution:** ΔU=mgΔh=2×10×3=60 J.

#### OW-GD-M7-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Two spherical planets have the same radius, but planet B has twice planet A’s mass. How do their surface escape speeds compare? Use v_escape=√(2GM/R).

- **A.** B twice A
- **B.** Equal
- **C.** B is √2 times A
- **D.** B half A

**Correct key:** C

**Hint:** Take the ratio before substituting any constants.

**Feedback A:** Mass appears under a square root.

**Feedback B:** The masses are different.

**Feedback C:** At fixed R, escape speed scales with √M.

**Feedback D:** Larger mass increases escape speed.

**Independent solution:** v_B/v_A=sqrt(M_B/M_A)=sqrt(2).

#### OW-GD-M7-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A sensor’s reading of a stable reference rises by 2 units between two visits, while the sample reading also rises by 2. Assuming the reference is stable and the offset is additive, what is supported?

- **A.** The sample truly increased by 2
- **B.** The corrected sample is unchanged
- **C.** The sample decreased by 2
- **D.** The instrument has zero offset

**Correct key:** B

**Hint:** Compare sample minus reference on both visits.

**Feedback A:** The same rise in the reference indicates an offset change.

**Feedback B:** Subtracting each visit’s reference offset removes the common rise.

**Feedback C:** No residual decrease remains after correction.

**Feedback D:** An offset change is supported; zero absolute offset is not.

**Independent solution:** Δ(sample−reference)=2−2=0; corrected change is zero.


# Mission 8 — POWER ARRIVES TOO LATE

## A. Mission briefing card — exact player copy

**Header:** DAY 8 OF 12 — INSPECTION IN 5 DAYS

**Card title:** POWER ARRIVES TOO LATE

**Go now:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Card body (52 words; 4 sentences):** The weight table holds, but the motor cannot give energy at any rate. Power is the rate at which a machine does work. At the Winder House and Tip, check the lift and a small drive. By the end of the mission, you choose a cruise speed that fits the power limit.

**Objective:** Which cruise speed fits the motor power limit?

**Stake — exact player copy:** Today you choose what speed Ewan may list as a power-only proposal while Ruth keeps the gate shut.

**Segue — exact player copy:** But Mara Shaw’s test mass keeps bouncing after its support stops, just as Finn’s cage did in March.

### Worth knowing first — exact player copy

#### Glossary terms

Power: the rate of energy transfer.

Efficiency: useful output energy divided by input energy over the same interval.

Cruise: motion at a steady planned speed.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- Keep each earlier accepted result attached to the model assumptions that produced it.

#### Equations first needed today

**Equation:** P = Fv = τω; Pin = Pout/η

**What it is for:** power and efficiency in the measured system.

**Symbols:** P power in watts; F force in newtons; v speed in metres per second; τ torque; ω angular speed; Pin input power; Pout useful output power; η efficiency.

**Why this campaign needs it:** Which cruise speed fits the motor power limit?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A 30 newton force moves its point of application at 2 metres per second; power is 60 watts.

2. A motor delivers 80 joules in 4 seconds; average useful power is 20 watts.

3. A motor supplies 40 watts with efficiency 0.8; its input is 40/0.8=50 watts.

4. A shaft turns at 5 radians per second under torque 8 newton metres; power is 8×5=40 watts.

5. A constant upward force of 100 newtons lifts at 0.5 metres per second for 6 seconds; power is 50 watts and work is 300 joules.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 29 first unlocks the intermediate room and Stop 30 unlocks the third.

## B. Main story happening — designer summary

The cruise proposal is reduced while the brake restriction remains. The day moves from recall the full-length pull through turn lift work into power and check a scaled steady drive to the owner’s signed decision. A hanging test mass keeps bouncing after the support is still. Ewan pins up 3.5 m/s as a power-only proposal. Ruth adds BRAKE PAGE OPEN across it before anyone can mistake that limited pass for passenger approval.

## C. Designer intent — not shown to player

Cap cruise at 3.5 m/s pending the emergency-stop test. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D8-ARR — On arrival at Winder House

**Location:** Winder House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ewan Price, by radio:** “I owe the crew a timetable. Today I can put a power limit on it, but the brake page is still open.”

**Dialogue bubble — Ivo Reed, by radio:** “Write that on the sheet. Dispatch will read the large number first.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 29.

### Beat OW-D8-R2 — After Stop 30

**Location:** Winder House.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv. Take this evidence to Tip and Conveyor at The belt drive; only that record or test can check the next part.

**Panel text:** “P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv. Take this evidence to Tip and Conveyor at The belt drive; only that record or test can check the next part.”

**Dialogue bubble — Ivo Reed, by radio:** “That speed fits the power calculation. Has it passed stopping?”

**Dialogue bubble — Ewan Price, by radio:** “No. Put POWER ONLY in the heading before anyone posts it as a schedule.”

**Unlocks:** Stop 31 and waypoint to Tip and Conveyor.

### Beat OW-D8-R3 — After Stop 31 is accepted

**Location:** Current Stop 31 fixture (Tip and Conveyor, The belt drive (`belt-drive`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 31 evidence is retained; no additional state or reward.

**Dialogue bubble — Ewan Price, by radio:** “The scaled drive supports the power relation. It has not tested the passenger stop.”

**Unlocks:** No new gate; continue to existing Stop 32.

### Beat OW-D8-DEC — After Stop 32

**Location:** Tip and Conveyor.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Cap cruise at 3.5 m/s pending the emergency-stop test.

**Panel text:** “Cap cruise at 3.5 m/s pending the emergency-stop test.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D8-END — At mission end

**Location:** Tip and Conveyor.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The cruise proposal is reduced while the brake restriction remains. A hanging test mass keeps bouncing after the support is still.

**Panel text:** “Ewan pins up 3.5 m/s as a power-only proposal. Ruth adds BRAKE PAGE OPEN across it before anyone can mistake that limited pass for passenger approval. But Mara Shaw’s test mass keeps bouncing after its support stops, just as Finn’s cage did in March.”

**Dialogue bubble — Ewan Price, by radio:** “POWER ONLY is across the proposal. Ivo was right to ask what dispatch would read first.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-power-sheet

**Home:** `winder-desk`. **Before:** Power proposal unposted. **After — exact action:** Ewan posts the power-only sheet with BRAKE PAGE OPEN across it.

**Trigger:** accepted_stop_32. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Winder House → Tip and Conveyor.

- Stop 29: Winder House, The winder desk (`winder-desk`).
- Stop 30: Winder House, The winder desk (`winder-desk`).
- Stop 31: Tip and Conveyor, The belt drive (`belt-drive`).
- Stop 32: Tip and Conveyor, The weightometer (`weightometer`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ivo Reed, conveyor foreman, owns the TIP evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Power and rate describe how quickly energy must move through the machine. The largest required rate can fail even when the journey uses less energy than the available supply. The speed decision must therefore preserve both the work budget and its timing. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 29 — Recall the full-length pull

**Format/placement:** BALLPARK, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Choose the quantity tiles for the displayed formula a*b

**Metadata:** Concept: 2 — Recall the full-length pull; Keystone: Forces and boundaries, Mass distribution; Area: WIND; Prerequisites: Stop 28 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: RETRIEVE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which cruise speed fits the motor power limit?

**Actual mission answer — authoring only:** Cap cruise at 3.5 m/s pending the emergency-stop test.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The cruise demand needs weight at the longest hanging length.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ewan Price notes that the conservative weight table survives the survey check, but the requested cruise may demand energy faster than the motor supplies it. Recover the full-length pull at steady speed before turning the accepted work account into a power calculation.

**Question card story-science connection — exact player copy:** The chosen system determines which load the next force limit must protect.

**Data/readings — exact player copy:** At steady cruise a=0; cage plus hanging rope mass 16000 kg; g=10 m/s²; T=mg.

**Format-specific interaction block:**
```yaml
estimate:
  quantity: Recall the full-length pull
  labels:
  - total hanging mass (kg)
  - conservative gravity (m/s²)
  - acceleration distractor
  values:
  - 16000
  - 10
  - 1
  slots: 2
  template: Use the labeled quantities to fill 2 blanks.
  formula: a*b
  correct:
  - 0
  - 1
  target: 160000
  tolerance: 160.0
  units: N
  correctResult: 160000
answerText: T=16000×10=160000 N; steady speed removes ma but not the load’s weight.
```

**Question card prompt — exact player copy:** Choose the quantity tiles for the displayed formula a*b; submit the resulting recall the full-length pull in N.

**Correct result:** 160000 N. Acceptance: 160.0.

**Answer text:** T=16000×10=160000 N; steady speed removes ma but not the load’s weight.

**Why/mechanism:** Cruise means the cage has constant speed, so its acceleration is zero and the mean net force on the hanging system is zero. Tension must still balance the weight of both the cage and the rope: 16000×10=160000 N. The earlier 176000 N result included an upward acceleration that is absent here. Using only 40000 N would discard the hanging steel. This steady pull is the force whose work rate increases when the proposed cruise speed is raised.

**Misconception:** 176000 N.

**Wrong-path feedback:**

- **176000 N:** That includes the Day 3 upward acceleration, absent at cruise.
- **40000 N:** That discards hanging-rope weight.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: 160000 N

**Unlock:** Stop 30.

**Retrieval:** Stop 28 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; delayed retrieval after an intervening day.

**Later payoff:** Can a drum stop time alone predict when the cage stops?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 29 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 30 — Turn lift work into power

**Format/placement:** DERIVE, Winder House — The winder desk.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 8 — Turn lift work into power; Keystone: Motion and derivatives, Energy accounting, Power and rate; Area: WIND; Prerequisites: Stop 29 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which cruise speed fits the motor power limit?

**Actual mission answer — authoring only:** Cap cruise at 3.5 m/s pending the emergency-stop test.

**Call — exact player copy:** Go to Winder House and inspect The winder desk.

**Stop reason — exact player copy:** The full trip’s energy can still arrive too slowly.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ewan Price sees that the full-length steady pull is established, and the hanging rope becomes shorter as the cage climbs toward the surface. Derive how that changing load affects power so the speed decision uses the most demanding part of the journey.

**Question card story-science connection — exact player copy:** The largest work rate determines which cruise proposal the motor can sustain.

**Data/readings — exact player copy:** At constant speed v, lifted distance y leaves hanging length L−y; T(y)=[M+λ(L−y)]g; dW=T dy; v=dy/dt; M=4000 kg, λ=10 kg/m, L=1200 m, g=10 m/s²; evaluate the full-length cruise at v=3.5 m/s.

**Format-specific interaction block:**
```yaml
derive:
  start: At constant speed v, lifted distance y leaves hanging length L−y; T(y)=[M+λ(L−y)]g; dW=T dy; v=dy/dt; M=4000 kg, λ=10 kg/m, L=1200 m, g=10 m/s²; evaluate the full-length cruise at v=3.5 m/s.
  goal: Derive cruise power as a function of lift position and speed.
  steps:
  - id: line1
    prompt: Apply the chain rule to work as position changes.
    choices:
    - line: P=dW/dt=T(dy/dt)=Tv
      correct: true
    - line: P=dW/dt=T(dt/dy)=T/v
      correct: false
      survives: true
      why: dt/dy is the reciprocal speed, not dy/dt; it has the wrong units for power.
  - id: line2
    prompt: Locate the greatest hanging weight during the cruise.
    choices:
    - line: P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv=(4000+10×1200)×10×3.5=560000 W
      correct: true
    - line: P(y)=[M+λy]gv; Pmax=P(y=0)=Mgv
      correct: false
      survives: true
      why: At the bottom the hanging rope is longest; the wrong expression reverses which end of the journey carries most rope.
  answerText: At steady speed the tension work rate is Tv; the largest value occurs at the start of a full-length cruise because that is where the most rope remains suspended.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv. Acceptance: exact authored key.

**Answer text:** At steady speed the tension work rate is Tv; the largest value occurs at the start of a full-length cruise because that is where the most rope remains suspended.

**Why/mechanism:** Power is the work supplied each second. The chain rule gives dW/dt=(dW/dy)(dy/dt)=Tv, so dividing tension by speed cannot describe power. The hanging rope becomes shorter as the cage rises, which reduces the steady pull. The largest cruise demand therefore occurs with the full length hanging. Substituting the stated mass, length, gravity and speed gives 560000 W. This checks the motor’s ability to sustain that cruise; it does not establish the distance needed for an emergency stop.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** dt/dy is the reciprocal speed, not dy/dt; it has the wrong units for power.
- **2:** At the bottom the hanging rope is longest; the wrong expression reverses which end of the journey carries most rope.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: P(y)=[M+λ(L−y)]gv; Pmax=(M+λL)gv

**Unlock:** Stop 31.

**Retrieval:** Stop 29 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can a drum stop time alone predict when the cage stops?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 30 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 31 — Check a scaled steady drive

**Format/placement:** VERIFY, Tip and Conveyor — The belt drive.

**Required stop kind:** operated. **Player verb:** First, calculate and commit useful power in W from the visible data. OPERATE: run the scaled drive at 2 m/s. Keep the 800 N drive force and load direction fixed. MEASURE: press READ once after the run and record useful power. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 8 — Check a scaled steady drive; Keystone: Momentum and impulse, Power and rate, Models and evidence; Area: TIP; Prerequisites: Stop 30 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which cruise speed fits the motor power limit?

**Actual mission answer — authoring only:** Cap cruise at 3.5 m/s pending the emergency-stop test.

**Call — exact player copy:** Go to Tip and Conveyor and inspect The belt drive.

**Stop reason — exact player copy:** The power relation needs an independent drive check.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ivo Reed confirms that the lift calculation identifies where cruise power is largest, but its force-times-speed relation can also be checked on a smaller drive. Predict the useful output before operating that drive and compare the measured rate with the model.

**Question card story-science connection — exact player copy:** The largest work rate determines which cruise proposal the motor can sustain.

**Data/readings — exact player copy:** Isolated drive applies F=800 N at v=2 m/s with constant speed; useful mechanical power P=Fv.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit useful power in W before RUN unlocks.
  predictionRange:
    min: 0
    max: 3000
    step: 100
    unit: W
  truth: 1600
  measurement:
    label: useful power
    cost: 1
  tolerance: 10
  correct_action: SUPPORTS MODEL
  answerText: P=800×2=1600 W; the meter supports the steady force-times-speed relation.
```

**Question card prompt — exact player copy:** First, calculate and commit useful power in W from the visible data. OPERATE: run the scaled drive at 2 m/s. Keep the 800 N drive force and load direction fixed. MEASURE: press READ once after the run and record useful power. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 1600 W; SUPPORTS MODEL. Acceptance: 10.

**Answer text:** P=800×2=1600 W; the meter supports the steady force-times-speed relation.

**Why/mechanism:** P=800×2=1600 W; the meter supports the steady force-times-speed relation. The alternative ‘400 W’ fails for this reason: Dividing by speed reverses the work-rate relationship. The alternative ‘800 W’ fails for this reason: Force alone has units N, not W. The alternative ‘REJECTS MODEL’ fails for this reason: Measured power equals the predicted mechanical work rate. Isolated drive applies F=800 N at v=2 m/s with constant speed; useful mechanical power P=Fv.

**Misconception:** 400 W.

**Wrong-path feedback:**

- **400 W:** Dividing by speed reverses the work-rate relationship.
- **800 W:** Force alone has units N, not W.
- **REJECTS MODEL:** Measured power equals the predicted mechanical work rate.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The belt drive gains a dated evidence slip: 1600 W; SUPPORTS MODEL

**Unlock:** Stop 32.

**Retrieval:** Stop 30 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can a drum stop time alone predict when the cage stops?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 31 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 32 — Commit the day’s plan

**Format/placement:** CHOICE, Ivo Reed at The weightometer.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 8 — Commit the day’s plan; Keystone: Energy accounting, Power and rate, Constraints and uncertainty; Area: TIP; Prerequisites: Stop 31 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Which cruise speed fits the motor power limit?

**Actual mission answer — authoring only:** Cap cruise at 3.5 m/s pending the emergency-stop test.

**Call — exact player copy:** Go to Tip and Conveyor and meet Ivo Reed, conveyor foreman, at The weightometer.

**Stop reason — exact player copy:** The cruise choice must fit the available shaft power.

**Question card story setup — exact player copy (40 words; 2 sentences):** Ivo Reed finds that the smaller drive confirms the work-rate relation, and the two cruise proposals can now be compared with available shaft power. Choose the speed that passes this limit while leaving the unresolved emergency-stop requirement on the plan.

**Question card story-science connection — exact player copy:** The largest work rate determines which cruise proposal the motor can sustain.

**Data/readings — exact player copy:** Campaign cruise shaft-power ceiling 600 kW, already net of auxiliary demand; full-length tension 160 kN; proposed cruise speeds 3.5 m/s and 4 m/s; products are 560 and 640 kW respectively; braking still unapproved.

**Format-specific interaction block:**
```yaml
question: Which cruise speed fits the motor power limit?
choices:
- Cap cruise at 3.5 m/s until braking is tested.
- Approve 4 m/s because lift energy is sufficient.
- Approve 4 m/s because its torque is steady.
- Treat 3.5 m/s as final passenger clearance.
answer: Cap cruise at 3.5 m/s until braking is tested.
why: The 560 kW cruise passes while 640 kW exceeds the 600 kW shaft limit; the result narrows the candidate set without granting passenger clearance.
rebuttals:
  Approve 4 m/s because lift energy is sufficient.: Total energy does not bound the required instantaneous power.
  Approve 4 m/s because its torque is steady.: Steady torque still transfers power at a rate that rises with speed.
  Treat 3.5 m/s as final passenger clearance.: Passing power does not settle emergency stopping.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Cap cruise at 3.5 m/s until braking is tested.. Acceptance: exact authored key.

**Answer text:** The 560 kW cruise passes while 640 kW exceeds the 600 kW shaft limit; the result narrows the candidate set without granting passenger clearance.

**Why/mechanism:** The 560 kW cruise passes while 640 kW exceeds the 600 kW shaft limit; the result narrows the candidate set without granting passenger clearance. The alternative ‘Approve 4 m/s because lift energy is sufficient.’ fails for this reason: Total energy does not bound the required instantaneous power. The alternative ‘Approve 4 m/s because its torque is steady.’ fails for this reason: Steady torque still transfers power at a rate that rises with speed.

**Misconception:** Approve 4 m/s because lift energy is sufficient..

**Wrong-path feedback:**

- **Approve 4 m/s because lift energy is sufficient.:** Total energy does not bound the required instantaneous power.
- **Approve 4 m/s because its torque is steady.:** Steady torque still transfers power at a rate that rises with speed.
- **Treat 3.5 m/s as final passenger clearance.:** Passing power does not settle emergency stopping.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The weightometer gains a dated evidence slip: Cap cruise at 3.5 m/s until braking is tested.

**Unlock:** Day 8 outcome and recovery allocation.

**Retrieval:** Stop 31 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Can a drum stop time alone predict when the cage stops?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 32 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Cap cruise at three and a half metres per second for now. The faster choice needs too much power. The brake limit is still open. A test mass keeps moving after its support stops. Ewan pins up 3.5 m/s as a power-only proposal. Ruth adds BRAKE PAGE OPEN across it before anyone can mistake that limited pass for passenger approval.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 8 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The cruise proposal is reduced while the brake restriction remains. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +4 | Test Evidence +4 | Workshop Reserve -2 | Passenger Safeguards +2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [84, 83, 78, 82]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- T=16000×10=160000 N; steady speed removes ma but not the load’s weight..
- At steady speed the tension work rate is Tv; the largest value occurs at the start of a full-length cruise because that is where the most rope remains suspended..
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** Power limits how fast usable energy can be delivered.

---

### GO DEEPER — Mission 8 — optional exact player copy

**Availability:** After mission_complete_8, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Connect work rate to speed, efficiency and stored energy. A steady-power calculation describes a specified operating phase; it does not replace an acceleration or stopping analysis.

**Supporting concepts:**

- Mechanical power is dW/dt and equals Fv when force and velocity are parallel.
- At constant speed a lifted mass needs useful power mgv, neglecting other loads and losses.
- Efficiency is useful output power divided by input power; it is dimensionless.
- Energy is accumulated power over time. A short power peak and a long modest demand can use different total energies.

#### OW-GD-M8-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A motor pulls with 80 N at steady speed 3 m/s. What useful mechanical power does it deliver?

- **A.** 240 W
- **B.** 80 W
- **C.** 26.7 W
- **D.** 720 W

**Correct key:** A

**Hint:** Use P=Fv.

**Feedback A:** Power is force times parallel velocity.

**Feedback B:** The force still needs the velocity factor.

**Feedback C:** Dividing force by speed does not give power.

**Feedback D:** Velocity is not squared in Fv.

**Independent solution:** P=80×3=240 W.

#### OW-GD-M8-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A motor supplies 300 W useful output while drawing 500 W. What is its efficiency?

- **A.** 167%
- **B.** 40%
- **C.** 80%
- **D.** 60%

**Correct key:** D

**Hint:** Divide useful output by input.

**Feedback A:** This reverses output and input.

**Feedback B:** That is the fraction lost, not the useful fraction.

**Feedback C:** 300/500 is 0.6, not 0.8.

**Feedback D:** Efficiency is 300/500=0.6.

**Independent solution:** η=P_useful/P_input=300/500=0.6=60%.

#### OW-GD-M8-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An ideal motor lifts 5 kg at constant 2 m/s with g=10 m/s². What power is needed?

- **A.** 50 W
- **B.** 100 W
- **C.** 25 W
- **D.** 200 W

**Correct key:** B

**Hint:** At steady speed, lifting force equals weight.

**Feedback A:** That is the weight without the velocity factor.

**Feedback B:** mgv=5×10×2.

**Feedback C:** Dividing by velocity gives the wrong dependence.

**Feedback D:** No extra factor two is present.

**Independent solution:** P=Fv=mgv=5×10×2=100 W.

#### OW-GD-M8-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A device uses a constant 20 W for 15 s. How much energy does it use?

- **A.** 35 J
- **B.** 1.33 J
- **C.** 300 J
- **D.** 150 J

**Correct key:** C

**Hint:** Integrate constant power over the interval.

**Feedback A:** Power and time are multiplied, not added.

**Feedback B:** Dividing power by time does not give energy.

**Feedback C:** Energy is the area under the power-time graph.

**Feedback D:** There is no triangle factor for constant power.

**Independent solution:** E=PΔt=20×15=300 J.

#### OW-GD-M8-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A drive can deliver at most 600 W against a constant 200 N resistance. What is its maximum steady speed under this power constraint alone?

- **A.** 3 m/s
- **B.** 120000 m/s
- **C.** 0.33 m/s
- **D.** 6 m/s

**Correct key:** A

**Hint:** Solve P=Fv for v.

**Feedback A:** v=P/F=600/200.

**Feedback B:** Multiplying power and force does not give speed.

**Feedback C:** This reverses P/F.

**Feedback D:** At 6 m/s the required power would be 1200 W.

**Independent solution:** v_max=3 m/s; this statement alone says nothing about stopping.

#### OW-GD-M8-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A motor can sustain a chosen steady speed within its power limit. What additional evidence is needed before claiming the moving system can stop within a specified distance?

- **A.** A steady-speed test showing the predicted electrical input power
- **B.** An acceleration test that establishes the motor’s starting torque
- **C.** The system’s kinetic energy calculated at the chosen speed
- **D.** A stopping test supporting the force and response-delay model for that load

**Correct key:** D

**Hint:** Ask which quantities control the deceleration and delay.

**Feedback A:** That supports steady operation but does not measure braking.

**Feedback B:** Starting torque does not establish braking response or stopping travel.

**Feedback C:** Energy to remove is necessary information but does not alone set stopping distance.

**Feedback D:** This directly tests the quantities that determine stopping travel.

**Independent solution:** A steady power bound does not bound reaction delay, braking deceleration or stored elastic motion; a validated stopping model does.


# Mission 9 — THE ROPE HAS ITS OWN CLOCK

## A. Mission briefing card — exact player copy

**Header:** DAY 9 OF 12 — INSPECTION IN 4 DAYS

**Card title:** THE ROPE HAS ITS OWN CLOCK

**Go now:** Go to Rope Shop and meet Mara Shaw, rope technician, at The rope bench.

**Card body (53 words; 4 sentences):** The power limit is met, but the cage can move after its support stops. A stretched rope can pull a load back toward rest. At the Rope Shop and Bank, check stretch and bounce. By the end of the mission, you decide if drum stop time alone can tell when the cage stops.

**Objective:** Can a drum stop time alone predict when the cage stops?

**Stake — exact player copy:** Today you decide if Ruth can trust the lamp that was lit while her brother was still moving.

**Segue — exact player copy:** Now Ada Kerr must unseal the March tape and test the model against the delay her old check missed.

### Worth knowing first — exact player copy

#### Glossary terms

Elasticity: the ability to store energy while stretched and return toward the original shape.

Equilibrium: a position where the net force is zero.

Oscillation: repeated motion about an equilibrium position.

Effective mass: the mass assigned to a simplified motion model to represent distributed moving material.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- The fixed-support equilibrium already includes the steady effect of weight.

#### Equations first needed today

**Equation:** m_eff x″ + kx = 0; ω = √(k/m_eff); Tperiod = 2π/ω

**What it is for:** elasticity and simple harmonic motion in the measured system.

**Symbols:** m_eff effective moving mass in kilograms; x upward displacement from the fixed-support equilibrium in metres; x″ second time derivative; k restoring stiffness in newtons per metre; ω angular frequency; Tperiod oscillation period in seconds.

**Why this campaign needs it:** Can a drum stop time alone predict when the cage stops?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A spring with k=20 newtons per metre stretched 0.3 metres exerts a restoring force of magnitude 6 newtons.

2. A 2 kilogram oscillator with k=8 newtons per metre has ω=√4=2 radians per second and period π seconds.

3. For x=0.4 cos(3t) metres, v=−1.2 sin(3t) metres per second and a=−3.6 cos(3t) metres per second squared.

4. Two springs with stiffness 12 and 6 newtons per metre in parallel have k=18; in series 1/k=1/12+1/6 gives k=4 newtons per metre.

5. A hanging spring mass of 1 kilogram with k=50 newtons per metre and g=10 stretches 0.2 metres at equilibrium; small motion about that position has ω=√50 radians per second.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 33 first unlocks the intermediate room and Stop 34 unlocks the third.

## B. Main story happening — designer summary

The drum-only stop prediction receives an incomplete-model tag. The day moves from distinguish mass from stiffness through derive the bounce period and read an independent period to the owner’s signed decision. The March tape is unsealed for comparison with the measured period. Ruth puts a second space on the shift check for the cage trace. The drum-stop lamp that was lit while Finn was still moving can no longer close that check alone.

## C. Designer intent — not shown to player

No; the rope and cage have their own oscillation period. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D9-ARR — On arrival at Rope Shop

**Location:** Rope Shop.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Mara Shaw, by radio:** “Watch the test mass after its support stops. The rope still has work to do.”

**Dialogue bubble — Ruth Bell, by radio:** “That is the gap in the March lamp check. Can we give it a measured time?”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 33.

### Beat OW-D9-R2 — After Stop 34

**Location:** Rope Shop.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** ω=1.25 rad/s; Tperiod=2π/ω≈5.03 s. Take this evidence to The Bank at The depth indicator; only that record or test can check the next part.

**Panel text:** “ω=1.25 rad/s; Tperiod=2π/ω≈5.03 s. Take this evidence to The Bank at The depth indicator; only that record or test can check the next part.”

**Dialogue bubble — Nia Cole, by radio:** “The period needs both effective mass and stiffness. I will label the hanging length beside it.”

**Dialogue bubble — Mara Shaw, by radio:** “Thank you. A period without those conditions would mislead the next shift.”

**Unlocks:** Stop 35 and waypoint to The Bank.

### Beat OW-D9-R3 — After Stop 35 is accepted

**Location:** Current Stop 35 fixture (The Bank, The depth indicator (`depth-dial`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 35 evidence is retained; no additional state or reward.

**Dialogue bubble — Ruth Bell, by radio:** “The independent period belongs beside the drum time. One lamp cannot answer both questions.”

**Unlocks:** No new gate; continue to existing Stop 36.

### Beat OW-D9-DEC — After Stop 36

**Location:** The Bank.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** No; the rope and cage have their own oscillation period.

**Panel text:** “No; the rope and cage have their own oscillation period.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D9-END — At mission end

**Location:** The Bank.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The drum-only stop prediction receives an incomplete-model tag. The March tape is unsealed for comparison with the measured period.

**Panel text:** “Ruth puts a second space on the shift check for the cage trace. The drum-stop lamp that was lit while Finn was still moving can no longer close that check alone. Now Ada Kerr must unseal the March tape and test the model against the delay her old check missed.”

**Dialogue bubble — Ruth Bell, by radio:** “There are two boxes on the shift check now. Ada can open March knowing what we need to compare.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-two-trace-slip

**Home:** `signal-board`. **Before:** Shift check has only its old drum entry. **After — exact action:** Ruth clips the added cage-trace box beside the drum-check box.

**Trigger:** accepted_stop_36. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Rope Shop → The Bank.

- Stop 33: Rope Shop, The rope bench (`rope-bench`).
- Stop 34: Rope Shop, The rope bench (`rope-bench`).
- Stop 35: The Bank, The depth indicator (`depth-dial`).
- Stop 36: The Bank, The signal board (`signal-board`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Mara Shaw, rope technician, owns the ROPE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ruth Bell, cage operator, owns the BANK evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Oscillations are motion about a loaded equilibrium, with restoring force and inertia both present. A stationary support does not remove the load’s velocity or stored elastic energy. The linear approximation remains admissible only while the rope stays under positive tension. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 33 — Distinguish mass from stiffness

**Format/placement:** PROTOCOL, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Match every evidence row to one response

**Metadata:** Concept: 9 — Distinguish mass from stiffness; Keystone: Mass distribution, Energy accounting, Oscillations; Area: ROPE; Prerequisites: Stop 32 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: INTRODUCE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can a drum stop time alone predict when the cage stops?

**Actual mission answer — authoring only:** No; the rope and cage have their own oscillation period.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The load keeps moving after the support is still.

**Question card story setup — exact player copy (40 words; 2 sentences):** Mara Shaw notes that the cruise proposal meets the power ceiling, but a hanging test mass keeps moving after its support has stopped. Distinguish stored stretch energy from moving mass before using the rope measurements to predict the cage response.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** Twice the force causes twice the small extension; A long rope also moves while the cage moves; The load is measured from its resting stretch position

**Format-specific interaction block:**
```yaml
scenarios:
- id: e1
  label: Twice the force causes twice the small extension
  reading: Twice the force causes twice the small extension
- id: e2
  label: A long rope also moves while the cage moves
  reading: A long rope also moves while the cage moves
- id: e3
  label: The load is measured from its resting stretch position
  reading: The load is measured from its resting stretch position
choices:
- id: r1
  label: Use a linear spring relation in this tested range
- id: r2
  label: Include the rope contribution in effective mass
- id: r3
  label: Balance the constant weight before modeling the bounce
mapping:
  e1: r1
  e2: r2
  e3: r3
answerText: The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration.
```

**Question card prompt — exact player copy:** Match every evidence row to one response; use each response once and submit all connections.

**Correct result:** Twice the force causes twice the small extension → Use a linear spring relation in this tested range; A long rope also moves while the cage moves → Include the rope contribution in effective mass; The load is measured from its resting stretch position → Balance the constant weight before modeling the bounce. Acceptance: exact authored key.

**Answer text:** The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration.

**Why/mechanism:** The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration. The evidence ‘Twice the force causes twice the small extension’ requires the response ‘Use a linear spring relation in this tested range’. Twice the force causes twice the small extension; A long rope also moves while the cage moves; The load is measured from its resting stretch position.

**Misconception:** e1.

**Wrong-path feedback:**

- **e1:** For Twice the force causes twice the small extension, use Use a linear spring relation in this tested range; The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration.
- **e2:** For A long rope also moves while the cage moves, use Include the rope contribution in effective mass; The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration.
- **e3:** For The load is measured from its resting stretch position, use Balance the constant weight before modeling the bounce; The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Twice the force causes twice the small extension → Use a linear spring relation in this tested range; A long rope also moves while the cage moves → Include the rope contribution in effective mass; The load is measured from its resting stretch position → Balance the constant weight before modeling the bounce

**Unlock:** Stop 34.

**Retrieval:** Stop 32 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** What caused the cage to overrun its March landing?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 33 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 34 — Derive the bounce period

**Format/placement:** DERIVE, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 9 — Derive the bounce period; Keystone: Forces and boundaries, Mass distribution, Oscillations; Area: ROPE; Prerequisites: Stop 33 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can a drum stop time alone predict when the cage stops?

**Actual mission answer — authoring only:** No; the rope and cage have their own oscillation period.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The cage response needs a clock set by mass and stiffness.

**Question card story setup — exact player copy (42 words; 2 sentences):** Mara Shaw sees that the stretch test supports a restoring force, and the rope mass must participate in the model of the moving cage. Derive the period from the fitted stiffness and effective mass before comparing it with an independent position record.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** Linear first-mode approximation: M=4000 kg, λ=10 kg/m, L=1200 m; m_eff=M+λL/3=8000 kg; fitted k=12500 N/m; fixed upper support after stopping.

**Format-specific interaction block:**
```yaml
derive:
  start: 'Linear first-mode approximation: M=4000 kg, λ=10 kg/m, L=1200 m; m_eff=M+λL/3=8000 kg; fitted k=12500 N/m; fixed upper support after stopping.'
  goal: Obtain the natural angular frequency and period of this model.
  steps:
  - id: line1
    prompt: Divide the restoring-force equation by effective mass.
    choices:
    - line: x″=−(k/m_eff)x=−ω²x
      correct: true
    - line: x″=−(m_eff/k)x=−ω²x
      correct: false
      survives: true
      why: Inverting k/m changes both dimensions and the response to a heavier load.
  - id: line2
    prompt: Relate one full angular cycle to elapsed time.
    choices:
    - line: ω=√(12500/8000)=1.25 rad/s; Tperiod=2π/1.25≈5.03 s
      correct: true
    - line: ω=1.25 rad/s; Tperiod=ω/(2π)≈0.20 s
      correct: false
      survives: true
      why: ω/(2π) is frequency in cycles per second, not the period in seconds.
  answerText: The effective mass approximation assigns one third of the rope mass to this shape of motion; √(12500/8000)=1.25 rad/s and 2π/1.25=5.0265 s. The stated single-mode fit is an instructional approximation.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** ω=1.25 rad/s; Tperiod=2π/ω≈5.03 s. Acceptance: exact authored key.

**Answer text:** The effective mass approximation assigns one third of the rope mass to this shape of motion; √(12500/8000)=1.25 rad/s and 2π/1.25=5.0265 s. The stated single-mode fit is an instructional approximation.

**Why/mechanism:** The effective mass approximation assigns one third of the rope mass to this shape of motion; √(12500/8000)=1.25 rad/s and 2π/1.25=5.0265 s. The stated single-mode fit is an instructional approximation. Inverting k/m changes both dimensions and the response to a heavier load. Linear first-mode approximation: M=4000 kg, λ=10 kg/m, L=1200 m; m_eff=M+λL/3=8000 kg; fitted k=12500 N/m; fixed upper support after stopping.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Inverting k/m changes both dimensions and the response to a heavier load.
- **2:** ω/(2π) is frequency in cycles per second, not the period in seconds.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: ω=1.25 rad/s; Tperiod=2π/ω≈5.03 s

**Unlock:** Stop 35.

**Retrieval:** Stop 33 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** What caused the cage to overrun its March landing?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 34 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 35 — Read an independent period

**Format/placement:** VERIFY, The Bank — The depth indicator.

**Required stop kind:** operated. **Player verb:** First, calculate and commit oscillation period in s from the visible data. OPERATE: release the test mass from a small displacement and run one cycle. Keep the mass, stiffness and fixed support fixed. MEASURE: press READ once after the run and record oscillation period. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 9 — Read an independent period; Keystone: Motion and derivatives, Oscillations, Models and evidence; Area: BANK; Prerequisites: Stop 34 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Can a drum stop time alone predict when the cage stops?

**Actual mission answer — authoring only:** No; the rope and cage have their own oscillation period.

**Call — exact player copy:** Go to The Bank and inspect The depth indicator.

**Stop reason — exact player copy:** The period needs a record independent of drum timing.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ruth Bell confirms that the full-depth rope model predicts a period, but the clock relation can be checked without relying on the winding drum. Run the separate small oscillator after committing its cycle time so the measurement tests the predicted response.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** Scaled fixed-support oscillator: m=5 kg, k=20 N/m; period T=2π√(m/k); calculator available.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit oscillation period in s before RUN unlocks.
  predictionRange:
    min: 0
    max: 8
    step: 0.01
    unit: s
  truth: 3.14
  measurement:
    label: oscillation period
    cost: 1
  tolerance: 0.02
  correct_action: SUPPORTS MODEL
  answerText: T=2π√(5/20)=π≈3.14 s; the position record matches the predicted period.
```

**Question card prompt — exact player copy:** First, calculate and commit oscillation period in s from the visible data. OPERATE: release the test mass from a small displacement and run one cycle. Keep the mass, stiffness and fixed support fixed. MEASURE: press READ once after the run and record oscillation period. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 3.14 s; SUPPORTS MODEL. Acceptance: 0.02.

**Answer text:** T=2π√(5/20)=π≈3.14 s; the position record matches the predicted period.

**Why/mechanism:** T=2π√(5/20)=π≈3.14 s; the position record matches the predicted period. That is approximately frequency rather than period. The alternative ‘1.57 s’ fails for this reason: That is half a full cycle. The alternative ‘REJECTS MODEL’ fails for this reason: The period falls within 0.02 s of the prediction. Scaled fixed-support oscillator: m=5 kg, k=20 N/m; period T=2π√(m/k); calculator available.

**Misconception:** 0.32 s.

**Wrong-path feedback:**

- **0.32 s:** That is approximately frequency rather than period.
- **1.57 s:** That is half a full cycle.
- **REJECTS MODEL:** The period falls within 0.02 s of the prediction.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The depth indicator gains a dated evidence slip: 3.14 s; SUPPORTS MODEL

**Unlock:** Stop 36.

**Retrieval:** Stop 34 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** What caused the cage to overrun its March landing?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 35 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 36 — Commit the day’s plan

**Format/placement:** CHOICE, Ruth Bell at The signal board.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 9 — Commit the day’s plan; Keystone: Motion and derivatives, Forces and boundaries, Models and evidence, Oscillations; Area: BANK; Prerequisites: Stop 35 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Can a drum stop time alone predict when the cage stops?

**Actual mission answer — authoring only:** No; the rope and cage have their own oscillation period.

**Call — exact player copy:** Go to The Bank and meet Ruth Bell, cage operator, at The signal board.

**Stop reason — exact player copy:** Passenger protection needs the motion of the cage itself.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ruth Bell finds that the independent oscillator confirms that a suspended load has a motion timescale separate from the stopping time of its support. Decide which records the winding plan must retain before the sealed March tape is compared with this new model.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** Full-depth fitted model period 5.03 s; drum encoder reports zero motion after its brake engages; independent cage sensor can still record oscillation; tension remains positive in the tested amplitude range. Operating range recorded now: M=1000–4000 kg; L=40–1200 m; k=15000000/L N/m; m_eff=M+10L/3 kg; ω=√(k/m_eff). Residual-state acceptance requires x0≈0 and u≤min(v,g/(2ω)), ensuring tension≥Mg/2. The all-range frequency bound is ω≥1.25 rad/s.

**Format-specific interaction block:**
```yaml
question: Can a drum stop time alone predict when the cage stops?
choices:
- Record separate drum and cage stopping histories.
- Use drum rest as proof that the cage is at rest.
- Erase the cage record because the rope is steel.
- Use the bounce period as a motor start delay only.
answer: Record separate drum and cage stopping histories.
why: The measured independent response requires a model with separate support and cage motion; a drum-only record cannot certify the cage stopping position.
rebuttals:
  Use drum rest as proof that the cage is at rest.: A fixed support does not stop motion of an elastic suspended load instantly.
  Erase the cage record because the rope is steel.: Steel can stretch elastically; the independent period supports that response.
  Use the bounce period as a motor start delay only.: The period is evidence about cage dynamics, not merely an arbitrary timing delay.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Record separate drum and cage stopping histories.. Acceptance: exact authored key.

**Answer text:** The measured independent response requires a model with separate support and cage motion; a drum-only record cannot certify the cage stopping position.

**Why/mechanism:** The measured independent response requires a model with separate support and cage motion; a drum-only record cannot certify the cage stopping position. The alternative ‘Use drum rest as proof that the cage is at rest.’ fails for this reason: A fixed support does not stop motion of an elastic suspended load instantly. The alternative ‘Erase the cage record because the rope is steel.’ fails for this reason: Steel can stretch elastically; the independent period supports that response.

**Misconception:** Use drum rest as proof that the cage is at rest..

**Wrong-path feedback:**

- **Use drum rest as proof that the cage is at rest.:** A fixed support does not stop motion of an elastic suspended load instantly.
- **Erase the cage record because the rope is steel.:** Steel can stretch elastically; the independent period supports that response.
- **Use the bounce period as a motor start delay only.:** The period is evidence about cage dynamics, not merely an arbitrary timing delay.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The signal board gains a dated evidence slip: Record separate drum and cage stopping histories.

**Unlock:** Day 9 outcome and recovery allocation.

**Retrieval:** Stop 35 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** What caused the cage to overrun its March landing?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 36 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Keep separate records for drum and cage. The rope gives the cage its own bounce time. Drum rest alone cannot prove cage rest. The sealed March tape is now ready to read. Ruth puts a second space on the shift check for the cage trace. The drum-stop lamp that was lit while Finn was still moving can no longer close that check alone.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 9 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The drum-only stop prediction receives an incomplete-model tag. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +4 | Test Evidence +5 | Workshop Reserve -1 | Passenger Safeguards +3.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [88, 88, 81, 85]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- The modal model separates the static equilibrium from motion about it; stiffness determines restoring force, while distributed mass determines resistance to acceleration..
- The effective mass approximation assigns one third of the rope mass to this shape of motion; √(12500/8000)=1.25 rad/s and 2π/1.25=5.0265 s.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** A fixed support can hold a load that is still moving.

---

### GO DEEPER — Mission 9 — optional exact player copy

**Availability:** After mission_complete_9, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Explore an ideal spring oscillator around equilibrium. Compare mass, stiffness, phase and energy, while keeping the model’s displacement coordinate distinct from the spring’s total stretch.

**Supporting concepts:**

- For small ideal oscillations about equilibrium, ẍ=−(k/m)x and angular frequency ω=√(k/m).
- The period is T=2π/ω. Increasing mass at fixed stiffness lengthens the period.
- Total oscillation energy is kA²/2, with maximum speed ωA at equilibrium.
- In a vertical spring system, measuring x from the static equilibrium removes the constant gravity term from the oscillation equation.

#### OW-GD-M9-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An ideal oscillator has m=2 kg and k=18 N/m. What is its angular frequency?

- **A.** 9 rad/s
- **B.** 3 rad/s
- **C.** 6 rad/s
- **D.** 0.33 rad/s

**Correct key:** B

**Hint:** Take the square root of k/m.

**Feedback A:** k/m is ω², not ω.

**Feedback B:** ω=√(18/2)=3.

**Feedback C:** The square root of 9 is 3.

**Feedback D:** This uses √(m/k), which is 1/ω.

**Independent solution:** ω=√(k/m)=√(18/2)=√9=3 rad/s.

#### OW-GD-M9-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An oscillator has angular frequency 4 rad/s. What is its period?

- **A.** 4π s
- **B.** 4 s
- **C.** π/2 s
- **D.** 1/4 s

**Correct key:** C

**Hint:** One cycle advances phase by 2π radians.

**Feedback A:** The period decreases as angular frequency increases.

**Feedback B:** Radians per second are not seconds.

**Feedback C:** T=2π/4.

**Feedback D:** This omits the full-cycle factor 2π.

**Independent solution:** T=2π/ω=2π/4=π/2 s.

#### OW-GD-M9-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** The mass on a spring is multiplied by four while stiffness stays fixed. How does the period change?

- **A.** It doubles
- **B.** It quadruples
- **C.** It halves
- **D.** It stays fixed

**Correct key:** A

**Hint:** Use a ratio of T=2π√(m/k).

**Feedback A:** T∝√m, so √4=2.

**Feedback B:** Mass enters under a square root.

**Feedback C:** A larger mass oscillates more slowly.

**Feedback D:** Mass affects the ideal oscillator period.

**Independent solution:** T_new/T_old=sqrt(4)=2.

#### OW-GD-M9-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A spring oscillator has ω=5 rad/s and amplitude 0.2 m. What is maximum speed?

- **A.** 25 m/s
- **B.** 0.04 m/s
- **C.** 5 m/s
- **D.** 1 m/s

**Correct key:** D

**Hint:** Speed is largest at equilibrium.

**Feedback A:** Speed is ωA, not ω/A.

**Feedback B:** This reverses ω and A.

**Feedback C:** This omits amplitude.

**Feedback D:** ωA=5×0.2.

**Independent solution:** v_max=ωA=5×0.2=1 m/s.

#### OW-GD-M9-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An oscillator is instantaneously at x=+0.1 m relative to equilibrium, with ω=2 rad/s. What is its acceleration?

- **A.** +0.4 m/s²
- **B.** −0.4 m/s²
- **C.** −0.2 m/s²
- **D.** 0 m/s²

**Correct key:** B

**Hint:** Keep the restoring minus sign.

**Feedback A:** Acceleration points back toward equilibrium.

**Feedback B:** a=−ω²x=−4×0.1.

**Feedback C:** Angular frequency must be squared.

**Feedback D:** Displacement from equilibrium gives a restoring acceleration.

**Independent solution:** a=−ω²x=−2²×0.1=−0.4 m/s².

#### OW-GD-M9-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A vertical spring is already stretched to static equilibrium. Why does the small-oscillation equation in displacement x from that point omit a separate constant mg term?

- **A.** Gravity has disappeared
- **B.** The spring no longer exerts a force
- **C.** Gravity cancels the equilibrium part of spring force
- **D.** Mass no longer affects the period

**Correct key:** C

**Hint:** Separate static extension from displacement about it.

**Feedback A:** Gravity still acts on the mass.

**Feedback B:** The spring supports the mass and provides the changing restoring force.

**Feedback C:** Only the additional spring force −kx remains in the net force.

**Feedback D:** Mass remains in ω=√(k/m).

**Independent solution:** With total extension z_eq+x and kz_eq=mg, net force=mg−k(z_eq+x)=−kx for downward-positive x.


# Mission 10 — MARCH, SECOND BY SECOND

## A. Mission briefing card — exact player copy

**Header:** DAY 10 OF 12 — INSPECTION IN 3 DAYS

**Card title:** MARCH, SECOND BY SECOND

**Go now:** Go to Shaft and Brake House and meet Ada Kerr, mine safety engineer, at The March board.

**Card body (52 words; 4 sentences):** The cage has its own bounce period, so the sealed March tape can now be tested. A load can move while its rope changes stretch. At the brake house and Rope Shop, trace that motion from the stop. By the end of the mission, you decide why the cage passed its landing.

**Objective:** What caused the cage to overrun its March landing?

**Stake — exact player copy:** Today you decide what Ada must put beside her signed March check when Ruth reads the inquiry.

**Segue — exact player copy:** Yet Ada Kerr’s new empty pass faces a lower warm-pad brake limit, so explaining March has not cleared Ewan’s schedule.

### Worth knowing first — exact player copy

#### Glossary terms

Initial condition: a measured starting position or velocity used to choose one motion from a family of solutions.

Amplitude: the largest displacement from equilibrium in an oscillation.

Phase: the part of an oscillation’s cycle at a chosen time.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- Initial position and velocity determine the phase and size of the later motion.

#### Equations first needed today

**Equation:** x(t)=x0 cos(ωt)+(v0/ω)sin(ωt)

**What it is for:** elasticity and simple harmonic motion in the measured system.

**Symbols:** x upward displacement from fixed-support equilibrium; x0 initial displacement; v0 initial upward velocity; ω angular frequency; t time since drum reached rest.

**Why this campaign needs it:** What caused the cage to overrun its March landing?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. An oscillator starts at x0=0 with v0=3 metres per second and ω=2 radians per second; amplitude is v0/ω=1.5 metres.

2. An oscillator has x0=0.3 metres, v0=0.8 metres per second and ω=2; A=√(0.3²+0.4²)=0.5 metres.

3. For ω=4 radians per second and positive initial velocity at equilibrium, the first maximum occurs at t=π/(2ω)=π/8 seconds.

4. A 10 newton per metre spring with amplitude 0.2 metres stores total energy kA²/2=0.2 joules; at equilibrium that energy is kinetic.

5. For a damped oscillator with envelope A(t)=0.6 exp(−0.1t) metres, after 10 seconds the envelope is 0.6/e≈0.221 metres; damping reduces successive peaks.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 37 first unlocks the intermediate room and Stop 38 unlocks the third.

## B. Main story happening — designer summary

The March board replaces the sealed inquiry drawer. The day moves from read the three independent records through reconstruct the overshoot and keep the inquiry test honest to the owner’s signed decision. The empty test looks safe, but the warm-pad certificate carries a lower braking limit. Ada places her signed March check below the two traces. She tells Ruth why its inference failed; the measured delayed peak supports the account without turning it into permission for the next trip.

## C. Designer intent — not shown to player

The moving cage continued into an elastic oscillation after the drum stopped. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D10-ARR — On arrival at Shaft and Brake House

**Location:** Shaft and Brake House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ada Kerr, by radio:** “My signature stays in this file. If we explain March, the file must also show what I failed to check.”

**Dialogue bubble — Ruth Bell, by radio:** “I want Finn's next trip protected. I do not need the old page to disappear.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 37.

### Beat OW-D10-R2 — After Stop 38

**Location:** Shaft and Brake House.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** xmax=v0/ω=1.60 m at t=π/(2ω)≈1.26 s. Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.

**Panel text:** “xmax=v0/ω=1.60 m at t=π/(2ω)≈1.26 s. Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.”

**Dialogue bubble — Ada Kerr, by radio:** “The reconstructed cage keeps moving after the drum stops. My check ended before the event that mattered.”

**Dialogue bubble — Ruth Bell, by radio:** “Put that sentence beside your signature. Then we can change the check together.”

**Unlocks:** Stop 39 and waypoint to Rope Shop.

### Beat OW-D10-R3 — After Stop 39 is accepted

**Location:** Current Stop 39 fixture (Rope Shop, The rope bench (`rope-bench`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 39 evidence is retained; no additional state or reward.

**Dialogue bubble — Mara Shaw, by radio:** “The inquiry order keeps the prediction separate from the observed tape. We have not tuned the test to its answer.”

**Unlocks:** No new gate; continue to existing Stop 40.

### Beat OW-D10-DEC — After Stop 40

**Location:** Rope Shop.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The moving cage continued into an elastic oscillation after the drum stopped.

**Panel text:** “The moving cage continued into an elastic oscillation after the drum stopped.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D10-END — At mission end

**Location:** Rope Shop.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The March board replaces the sealed inquiry drawer. The empty test looks safe, but the warm-pad certificate carries a lower braking limit.

**Panel text:** “Ada places her signed March check below the two traces. She tells Ruth why its inference failed; the measured delayed peak supports the account without turning it into permission for the next trip. Yet Ada Kerr’s new empty pass faces a lower warm-pad brake limit, so explaining March has not cleared Ewan’s schedule.”

**Dialogue bubble — Ada Kerr, by radio:** “I pinned my old check beside the reconstruction. The next inspector will see the mistake and the repair.”

**Dialogue bubble — Ruth Bell, by radio:** “And Finn will see why I ask for both traces now.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-march-check

**Home:** `march-board`. **Before:** Signed old check preserved in file. **After — exact action:** Ada pins her signed check beside the reconstructed cage record.

**Trigger:** accepted_stop_40. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**2 locations:** Shaft and Brake House → Rope Shop.

- Stop 37: Shaft and Brake House, The March board (`march-board`).
- Stop 38: Shaft and Brake House, The March board (`march-board`).
- Stop 39: Rope Shop, The rope bench (`rope-bench`).
- Stop 40: Rope Shop, The rope bench (`rope-bench`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ada Kerr, mine safety engineer, owns the CAGE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Mara Shaw, rope technician, owns the ROPE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Oscillations are motion about a loaded equilibrium, with restoring force and inertia both present. A stationary support does not remove the load’s velocity or stored elastic energy. The linear approximation remains admissible only while the rope stays under positive tension. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 37 — Read the three independent records

**Format/placement:** DIAGNOSIS, Shaft and Brake House — The March board.

**Required stop kind:** calculation. **Player verb:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Metadata:** Concept: 9 — Read the three independent records; Keystone: Motion and derivatives, Models and evidence, Oscillations, Energy accounting; Area: CAGE; Prerequisites: Stop 36 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: RETRIEVE; Difficulty: L4; Story role: reversal.

**Briefing decision advanced:** What caused the cage to overrun its March landing?

**Actual mission answer — authoring only:** The moving cage continued into an elastic oscillation after the drum stopped.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The March board.

**Stop reason — exact player copy:** The opened March tape must be read as independent motion records.

**Question card story setup — exact player copy (42 words; 2 sentences):** Ada Kerr notes that the measured period gives the investigation a testable explanation, and the March drawer has now been opened under the inquiry seal. Read the independent drum and cage records together to identify which explanation survives their different motion histories.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** drum: position after brake completion constant within 0.01 m (normal); cage: velocity at drum rest 2.0 m/s upward (alarm); cage: first upward peak 1.60 m upward; precise peak timestamp sealed until reconstruction (alarm); rope: subsequent cycle time about 5.0 s (watch) First-mode energy check: 0.5×8000×2²=16000 J initially and 0.5×12500×1.60²=16000 J at the known upward peak; timing remains sealed.

**Format-specific interaction block:**
```yaml
headline: Read the three independent records
readings:
- zone: drum
  label: position after brake completion
  value: constant within 0.01 m
  status: normal
- zone: cage
  label: velocity at drum rest
  value: 2.0 m/s upward
  status: alarm
- zone: cage
  label: first upward peak
  value: 1.60 m upward; precise peak timestamp sealed until reconstruction
  status: alarm
- zone: rope
  label: subsequent cycle time
  value: about 5.0 s
  status: watch
- zone: rope model
  label: energy exchange at known distance
  value: initial kinetic energy 16000 J; elastic energy at 1.60 m 16000 J
  status: normal
choices:
- label: Elastic rope motion carries the cage beyond the landing.
  mechanism: Elastic rope motion carries the cage beyond the landing.
- label: Continued drum rotation lifts the cage beyond the landing.
  mechanism: Continued drum rotation lifts the cage beyond the landing.
- label: A constant gravity offset moves both records equally.
  mechanism: A constant gravity offset moves both records equally.
- label: A single sensor spike creates the apparent cage motion.
  mechanism: A single sensor spike creates the apparent cage motion.
answer: Elastic rope motion carries the cage beyond the landing.
rebuttals:
  Continued drum rotation lifts the cage beyond the landing.: The independent drum record is constant after brake completion.
  A constant gravity offset moves both records equally.: A static offset does not produce a measured cycle.
  A single sensor spike creates the apparent cage motion.: A sustained position and velocity history with repeated cycles is not one isolated spike.
why: The quiet drum record rules out continued winding while the cage velocity, delayed peak and repeated period agree with an elastic response.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Correct result:** Elastic rope motion carries the cage beyond the landing.. Acceptance: exact authored key.

**Answer text:** The quiet drum record rules out continued winding while the cage velocity, delayed peak and repeated period agree with an elastic response.

**Why/mechanism:** The quiet drum record rules out continued winding, while the cage velocity and repeated period agree with an elastic response. Energy accounting also closes: half of 8000 times 2 squared is 16000 J, matching half of 12500 times 1.6 squared at the known peak. A static gravity offset does not produce that exchange or repeated motion. The exact peak timestamp remains sealed, so the next derivation can test timing without pretending that the already reported distance is unseen evidence.

**Misconception:** Continued drum rotation lifts the cage beyond the landing..

**Wrong-path feedback:**

- **Continued drum rotation lifts the cage beyond the landing.:** The independent drum record is constant after brake completion.
- **A constant gravity offset moves both records equally.:** A static offset does not produce a measured cycle.
- **A single sensor spike creates the apparent cage motion.:** A sustained position and velocity history with repeated cycles is not one isolated spike.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The March board gains a dated evidence slip: Elastic rope motion carries the cage beyond the landing.

**Unlock:** Stop 38.

**Retrieval:** Stop 36 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; delayed retrieval after an intervening day.

**Later payoff:** Does the empty test authorize the faster passenger profile?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 37 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 38 — Reconstruct the overshoot

**Format/placement:** DERIVE, Shaft and Brake House — The March board.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 9 — Reconstruct the overshoot; Keystone: Motion and derivatives, Energy accounting, Oscillations; Area: CAGE; Prerequisites: Stop 37 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** What caused the cage to overrun its March landing?

**Actual mission answer — authoring only:** The moving cage continued into an elastic oscillation after the drum stopped.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The March board.

**Stop reason — exact player copy:** The measured initial state must predict the withheld peak.

**Question card story setup — exact player copy (44 words; 2 sentences):** Ada Kerr sees that the records show a stationary drum with the cage still moving upward, which fixes the start of a separate motion problem. Use the measured position and velocity to predict the first peak time before comparing it with the sealed timestamp.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** After the finite brake ramp ends, define t=0 at drum rest; measured cage x0=0 relative to its fixed-support equilibrium, v0=+2 m/s upward; ω=1.25 rad/s. The March landing coincides with that equilibrium for this record.

**Format-specific interaction block:**
```yaml
derive:
  start: After the finite brake ramp ends, define t=0 at drum rest; measured cage x0=0 relative to its fixed-support equilibrium, v0=+2 m/s upward; ω=1.25 rad/s. The March landing coincides with that equilibrium for this record.
  goal: Obtain the first upward peak from the measured initial conditions.
  steps:
  - id: line1
    prompt: Apply x(0)=0 and x′(0)=v0 to the general solution.
    choices:
    - line: x(t)=(v0/ω)sin(ωt)
      correct: true
    - line: x(t)=(v0/ω)cos(ωt)
      correct: false
      survives: true
      why: Cosine starts at maximum displacement and zero velocity, contradicting both measured initial conditions.
  - id: line2
    prompt: Find the first zero velocity with positive displacement.
    choices:
    - line: xmax=v0/ω=2/1.25=1.60 m at t=π/(2×1.25)≈1.26 s
      correct: true
    - line: xmax=v0ω=2.0×1.25=2.50 m at t=π/(2ω)≈1.26 s
      correct: false
      survives: true
      why: Multiplying by frequency instead of dividing fails the initial-velocity relation vmax=Aω.
  answerText: The finite braking history has already produced the measured t=0 state; no instantaneous cage stop is assumed. The solution gives x(1.2566)=1.6 m upward, matching both the overrun and its delay; the support stays fixed while the cage returns.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** xmax=v0/ω=1.60 m at t=π/(2ω)≈1.26 s. Acceptance: exact authored key.

**Answer text:** The finite braking history has already produced the measured t=0 state; no instantaneous cage stop is assumed. The solution gives x(1.2566)=1.6 m upward, matching both the overrun and its delay; the support stays fixed while the cage returns.

**Why/mechanism:** The finite braking history has already produced the measured t=0 state; no instantaneous cage stop is assumed. The solution gives x(1.2566)=1.6 m upward, matching both the overrun and its delay; the support stays fixed while the cage returns. After the finite brake ramp ends, define t=0 at drum rest; measured cage x0=0 relative to its fixed-support equilibrium, v0=+2 m/s upward; ω=1.25 rad/s.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Cosine starts at maximum displacement and zero velocity, contradicting both measured initial conditions.
- **2:** Multiplying by frequency instead of dividing fails the initial-velocity relation vmax=Aω.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The March board gains a dated evidence slip: xmax=v0/ω=1.60 m at t=π/(2ω)≈1.26 s

**Unlock:** Stop 39.

**Retrieval:** Stop 37 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the empty test authorize the faster passenger profile?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 38 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 39 — Keep the inquiry test honest

**Format/placement:** SEQUENCE, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Arrange the four evidence operations in the order that produces a prediction before its test

**Metadata:** Concept: 12 — Keep the inquiry test honest; Keystone: Models and evidence, Oscillations; Area: ROPE; Prerequisites: Stop 38 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** What caused the cage to overrun its March landing?

**Actual mission answer — authoring only:** The moving cage continued into an elastic oscillation after the drum stopped.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The inquiry must keep prediction separate from fitting the answer.

**Question card story setup — exact player copy (43 words; 2 sentences):** Mara Shaw confirms that the calculated distance matches the known overrun, but the inquiry must preserve how that prediction was obtained from independent evidence. Order the reconstruction steps so another reviewer can distinguish the withheld timing test from fitting the already known distance.

**Question card story-science connection — exact player copy:** The final approval is useful only when every tested limit remains attached to the signed profile.

**Data/readings — exact player copy:** The overrun distance of 1.6 m is known, but its precise timestamp remains sealed; clock synchronization, initial-state extraction, timing prediction and comparison are distinct operations.

**Format-specific interaction block:**
```yaml
cards:
- id: independent
  label: Preserve drum and cage records from the same clock
- id: state
  label: Read cage position and velocity when the drum is at rest
- id: predict
  label: Predict the peak time from independent stiffness, mass and initial state
- id: compare
  label: Unseal the peak timestamp and compare it with the committed prediction
order:
- independent
- state
- predict
- compare
constraints:
- Initial conditions require synchronized independent records.
- The peak timestamp stays sealed until the timing prediction is committed; the known distance is not a holdout.
answerText: The 1.6 m distance is already known and cannot count as an unseen test. The precise peak time is withheld until the model and initial state produce a committed timing prediction; agreement at 1.26 s then tests a separate feature of the event.
```

**Question card prompt — exact player copy:** Arrange the four evidence operations in the order that produces a prediction before its test; submit the ordered rail.

**Correct result:** independent → state → predict → compare; unsealed peak timestamp 1.26 s matches the committed 1.26 s prediction. Acceptance: exact authored key.

**Answer text:** The 1.6 m distance is already known and cannot count as an unseen test. The precise peak time is withheld until the model and initial state produce a committed timing prediction; agreement at 1.26 s then tests a separate feature of the event.

**Why/mechanism:** The 1.6 m distance is already known and cannot count as an unseen test. The precise peak time is withheld until the independent rope model and measured initial state produce a committed timing prediction. Synchronizing the drum and cage records must precede reading that state; otherwise the velocity could refer to a different support condition. Unsealing the timestamp last gives 1.26 s, matching the prediction. Reading that value first would instead allow the period to be adjusted to the answer.

**Misconception:** state before independent.

**Wrong-path feedback:**

- **state before independent:** Without synchronized records, the velocity might refer to a different support state.
- **compare before predict:** Reading the exact timestamp first would allow fitting the period to that answer; the known distance alone is not this timing test.
- **predict before state:** The solution requires the actual starting position and velocity.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: independent → state → predict → compare

**Unlock:** Stop 40.

**Retrieval:** Stop 38 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the empty test authorize the faster passenger profile?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 39 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 40 — Commit the day’s plan

**Format/placement:** CHOICE, Mara Shaw at The rope bench.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 9 — Commit the day’s plan; Keystone: Motion and derivatives, Forces and boundaries, Energy accounting, Models and evidence, Oscillations; Area: ROPE; Prerequisites: Stop 39 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** What caused the cage to overrun its March landing?

**Actual mission answer — authoring only:** The moving cage continued into an elastic oscillation after the drum stopped.

**Call — exact player copy:** Go to Rope Shop and meet Mara Shaw, rope technician, at The rope bench.

**Stop reason — exact player copy:** The signed account must explain both the peak and its delay.

**Question card story setup — exact player copy (44 words; 2 sentences):** Mara Shaw finds that the reconstruction now links the measured initial motion, the rope period and the delayed peak without continued movement of the drum. Decide which explanation belongs in the inquiry while preserving the distinction between explaining March and approving every future trip.

**Question card story-science connection — exact player copy:** The cage’s own motion must be bounded before a stationary drum can count as a safe stop.

**Data/readings — exact player copy:** Predicted peak 1.60 m upward at 1.26 s; observed 1.60 m at 1.26 s; drum stationary; fitted k=12500 N/m and m_eff=8000 kg; minimum cage tension in ±1.6 m modal range remains 30 kN using T=M(g−ω²x).

**Format-specific interaction block:**
```yaml
question: What caused the cage to overrun its March landing?
choices:
- Explain March with elastic motion after drum rest.
- Blame continued winding after the brake finished.
- Treat the match as proof that every speed is safe.
- Blame gravity while discarding the measured period.
answer: Explain March with elastic motion after drum rest.
why: The model predicts the peak’s size and timing from the initial state; positive minimum tension keeps this simplified solution within the rope’s pulling-only regime.
rebuttals:
  Blame continued winding after the brake finished.: The drum’s independent position remained fixed.
  Treat the match as proof that every speed is safe.: Explaining one event is not a bound on all loads, lengths, or speeds.
  Blame gravity while discarding the measured period.: Gravity alone does not predict the measured phase and period.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Explain March with elastic motion after drum rest.. Acceptance: exact authored key.

**Answer text:** The model predicts the peak’s size and timing from the initial state; positive minimum tension keeps this simplified solution within the rope’s pulling-only regime.

**Why/mechanism:** The model predicts the peak’s size and timing from the initial state; positive minimum tension keeps this simplified solution within the rope’s pulling-only regime. The alternative ‘Blame continued winding after the brake finished.’ fails for this reason: The drum’s independent position remained fixed. The alternative ‘Treat the match as proof that every speed is safe.’ fails for this reason: Explaining one event is not a bound on all loads, lengths, or speeds.

**Misconception:** Blame continued winding after the brake finished..

**Wrong-path feedback:**

- **Blame continued winding after the brake finished.:** The drum’s independent position remained fixed.
- **Treat the match as proof that every speed is safe.:** Explaining one event is not a bound on all loads, lengths, or speeds.
- **Blame gravity while discarding the measured period.:** Gravity alone does not predict the measured phase and period.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: Explain March with elastic motion after drum rest.

**Unlock:** Day 10 outcome and recovery allocation.

**Retrieval:** Stop 39 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Does the empty test authorize the faster passenger profile?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 40 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: The cage kept moving as the rope changed stretch. The model predicts the peak and its delay. The drum really was still. A passed empty test now sits beside a warm-pad warning. Ada places her signed March check below the two traces. She tells Ruth why its inference failed; the measured delayed peak supports the account without turning it into permission for the next trip.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 10 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The March board replaces the sealed inquiry drawer. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan +5 | Test Evidence +5 | Workshop Reserve -1 | Passenger Safeguards +3.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [93, 93, 84, 88]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- The quiet drum record rules out continued winding while the cage velocity, delayed peak and repeated period agree with an elastic response..
- The finite braking history has already produced the measured t=0 state; no instantaneous cage stop is assumed.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** Initial motion and restoring force can explain a delayed overrun.

---

### GO DEEPER — Mission 10 — optional exact player copy

**Availability:** After mission_complete_10, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Reconstruct an oscillator from its initial state and compare its predicted trace with an independent record. A fitted match is useful only when you keep track of what was supplied and what was predicted.

**Supporting concepts:**

- For x(0)=0 and v(0)=v₀, an ideal oscillator follows x(t)=(v₀/ω)sin(ωt).
- The first turning point occurs one quarter-period after crossing equilibrium with positive velocity.
- For arbitrary initial x₀ and v₀, amplitude satisfies A²=x₀²+(v₀/ω)².
- Choosing model parameters using one record and testing on another separates calibration from an independent prediction check.

#### OW-GD-M10-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An oscillator starts at equilibrium with v₀=3 m/s and ω=2 rad/s. What is its amplitude?

- **A.** 6 m
- **B.** 0.67 m
- **C.** 3 m
- **D.** 1.5 m

**Correct key:** D

**Hint:** Use x(0)=0 and v_max=ωA.

**Feedback A:** Amplitude is v₀/ω, not the product.

**Feedback B:** This reverses the ratio.

**Feedback C:** Initial speed alone is not a length.

**Feedback D:** A=3/2.

**Independent solution:** A=v₀/ω=3/2=1.5 m.

#### OW-GD-M10-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An oscillator crosses equilibrium moving positively and has period 8 s. When does it first reach maximum positive displacement?

- **A.** 2 s
- **B.** 4 s
- **C.** 8 s
- **D.** 1 s

**Correct key:** A

**Hint:** Follow sine from zero to its first maximum.

**Feedback A:** The first maximum comes after one quarter-cycle.

**Feedback B:** After half a cycle it crosses equilibrium moving negatively.

**Feedback C:** A full cycle returns to the starting state.

**Feedback D:** That is only one eighth-cycle.

**Independent solution:** t=T/4=8/4=2 s.

#### OW-GD-M10-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An ideal oscillator has x₀=0.3 m, v₀=0.8 m/s and ω=2 rad/s. What is its amplitude?

- **A.** 0.7 m
- **B.** 0.4 m
- **C.** 0.5 m
- **D.** 1.1 m

**Correct key:** C

**Hint:** Use A²=x₀²+(v₀/ω)².

**Feedback A:** The components combine as squares, not by simple addition.

**Feedback B:** This omits the initial displacement energy.

**Feedback C:** A=√(0.3²+0.4²)=0.5.

**Feedback D:** Velocity cannot be added directly to displacement.

**Independent solution:** A²=0.09+0.16=0.25 m²; A=0.5 m.

#### OW-GD-M10-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A predicted trace is x(t)=0.4 sin(πt) metres. What position is predicted at t=1.5 s?

- **A.** +0.4 m
- **B.** −0.4 m
- **C.** 0 m
- **D.** −0.6 m

**Correct key:** B

**Hint:** Evaluate the phase in radians first.

**Feedback A:** sin(3π/2) is negative.

**Feedback B:** The sine is −1 at phase 3π/2.

**Feedback C:** Zero crossings occur at integer seconds for this trace.

**Feedback D:** The sine is not proportional to time across a full cycle.

**Independent solution:** πt=3π/2; x=0.4×(−1)=−0.4 m.

#### OW-GD-M10-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** An oscillator has amplitude 0.5 m and stiffness 8 N/m. What is its total energy relative to equilibrium?

- **A.** 4 J
- **B.** 2 J
- **C.** 0.5 J
- **D.** 1 J

**Correct key:** D

**Hint:** At a turning point all oscillation energy is elastic.

**Feedback A:** This omits both the square on amplitude and the half factor.

**Feedback B:** This omits the half factor.

**Feedback C:** 0.5×8×0.25 is 1, not 0.5.

**Feedback D:** E=kA²/2=8×0.25/2.

**Independent solution:** E=kA²/2=(8×0.5²)/2=1 J.

#### OW-GD-M10-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A model’s period and amplitude were tuned to trace A. Which procedure best tests whether it predicts a second run?

- **A.** Lock the model and initial-condition procedure, then predict trace B before viewing its outcomes
- **B.** Retune the model until it matches B, then call B independent
- **C.** Delete the largest differences from B without a measurement reason
- **D.** Average A and B before fitting one curve to both

**Correct key:** A

**Hint:** Separate choosing parameters from testing them.

**Feedback A:** This prevents using B’s outcome to tune the prediction.

**Feedback B:** B has become calibration evidence.

**Feedback C:** This selects evidence for agreement.

**Feedback D:** Both records then contribute to calibration; neither remains an independent test.

**Independent solution:** A locked model with independently supplied initial conditions generates a prediction against which previously unseen B can be compared.


# Mission 11 — THE TEST THAT PASSED

## A. Mission briefing card — exact player copy

**Header:** DAY 11 OF 12 — INSPECTION IN 2 DAYS

**Card title:** THE TEST THAT PASSED

**Go now:** Go to Shaft and Brake House and meet Ada Kerr, mine safety engineer, at The pad bench.

**Card body (54 words; 4 sentences):** March is explained, and the empty cage stops within the marked space. Warm brake pads and more load can change that distance. At the brake house, Bank and Winder House, check those limits before the shift rides. By the end of the mission, you decide if the empty test earns a faster passenger run.

**Objective:** Does the empty test authorize the faster passenger profile?

**Stake — exact player copy:** Today you decide if a clean empty run lets Ewan keep his faster promise to the waiting shift.

**Segue — exact player copy:** Now Ruth Bell needs the last unoccupied wind and a signed range before the inspector can clear passenger access.

### Worth knowing first — exact player copy

#### Glossary terms

Braking deceleration: the positive size of acceleration opposite motion.

Safety margin: the unused space or capacity between a predicted demand and a stated limit.

Envelope: a bound that covers every case in a stated range.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- An empty cold test and a loaded warm limit have different meanings.

#### Equations first needed today

**Equation:** d = v²/(2b); d_bound = v²/(2bmin)+v/ωmin

**What it is for:** stopping, friction and conservative limits in the measured system.

**Symbols:** d drum-equivalent braking travel in metres; v initial speed; b positive braking deceleration; d_bound conservative total excursion bound; bmin worst allowed braking deceleration; ωmin lowest allowed angular frequency.

**Why this campaign needs it:** Does the empty test authorize the faster passenger profile?

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A cart at 6 metres per second brakes with deceleration 3 metres per second squared; distance is 36/(2×3)=6 metres.

2. If speed doubles while deceleration stays fixed, braking distance grows by a factor of four because it depends on speed squared.

3. A 4 kilogram block slides on a level surface with μk=0.2 and g=10; friction is 8 newtons and deceleration is 2 metres per second squared.

4. A rotor with I=4 kilogram metres squared slows from 5 radians per second to rest in 2 seconds; angular impulse is −20 kilogram metres squared per second and mean torque is −10 newton metres.

5. A rolling solid cylinder has I=MR²/2, so total motion energy is 3Mv²/4; for M=2 kilograms and v=2 metres per second it is 6 joules, exceeding the translational 4 joules.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 41 first unlocks the intermediate room and Stop 42 unlocks the third.

## B. Main story happening — designer summary

The empty-test approval is narrowed to its tested load. The day moves from read the certificate conditions through bound the stopping travel and test a warm loaded surrogate to the owner’s signed decision. The final plan now has a tested speed choice and a clear limit on what was proved. Ewan crosses out the faster passenger timetable in front of Ruth and cancels the overtime it was meant to support. Ada marks the empty pass with its load and pad state, then carries only the slower candidate into final review.

## C. Designer intent — not shown to player

Reject that authorization; loaded warm-pad stopping needs the slower candidate. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D11-ARR — On arrival at Shaft and Brake House

**Location:** Shaft and Brake House.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ada Kerr, by radio:** “The empty test passed its own conditions. That is the beginning of the passenger question, not its answer.”

**Dialogue bubble — Ewan Price, by radio:** “Then show me exactly what survives a warm, loaded surrogate.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 41.

### Beat OW-D11-R1 — After Stop 41

**Location:** Shaft and Brake House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Load and warm-pad limits restrict the passed test.. Take this evidence to The Bank at The profile desk; only that record or test can check the next part.

**Panel text:** “Load and warm-pad limits restrict the passed test.. Take this evidence to The Bank at The profile desk; only that record or test can check the next part.”

**Unlocks:** Stop 42 and waypoint to The Bank.

### Beat OW-D11-R2 — After Stop 42

**Location:** The Bank.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v. Take this evidence to Winder House at The test wind trace; only that record or test can check the next part.

**Panel text:** “d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v. Take this evidence to Winder House at The test wind trace; only that record or test can check the next part.”

**Dialogue bubble — Mara Shaw, by radio:** “A shorter stopping distance in an empty trial cannot stand in for the whole loaded range.”

**Dialogue bubble — Nia Cole, by radio:** “We will keep the range and brake assumptions on the same sleeve as the trace.”

**Unlocks:** Stop 43 and waypoint to Winder House.

### Beat OW-D11-R3 — After Stop 43 is accepted

**Location:** Current Stop 43 fixture (Winder House, The test wind trace (`test-trace`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 43 evidence is retained; no additional state or reward.

**Dialogue bubble — Ada Kerr, by radio:** “The warm loaded surrogate has a record now. Its conditions stay attached through sign-off.”

**Unlocks:** No new gate; continue to existing Stop 44.

### Beat OW-D11-DEC — After Stop 44

**Location:** Winder House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Reject that authorization; loaded warm-pad stopping needs the slower candidate.

**Panel text:** “Reject that authorization; loaded warm-pad stopping needs the slower candidate.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D11-END — At mission end

**Location:** Winder House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The empty-test approval is narrowed to its tested load. The final plan now has a tested speed choice and a clear limit on what was proved.

**Panel text:** “Ewan crosses out the faster passenger timetable in front of Ruth and cancels the overtime it was meant to support. Ada marks the empty pass with its load and pad state, then carries only the slower candidate into final review. Now Ruth Bell needs the last unoccupied wind and a signed range before the inspector can clear passenger access.”

**Dialogue bubble — Ewan Price, by radio:** “I will take the slower supported proposal to the last check. The overtime promise is mine to withdraw.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-range-sleeve

**Home:** `test-trace`. **Before:** Transparent conditions sleeve open. **After — exact action:** Ada encloses the warm-surrogate record with its range and assumptions.

**Trigger:** accepted_stop_44. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The same state is used by the existing mission aftermath; this is a concrete rendering of that consequence, not a second reward.

## E. Location plan

**3 locations:** Shaft and Brake House → The Bank → Winder House.

- Stop 41: Shaft and Brake House, The pad bench (`pad-bench`).
- Stop 42: The Bank, The profile desk (`profile-desk`).
- Stop 43: Winder House, The test wind trace (`test-trace`).
- Stop 44: Winder House, The winder desk (`winder-desk`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ada Kerr, mine safety engineer, owns the CAGE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ruth Bell, cage operator, owns the BANK evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Constraints and uncertainty require the least favorable conditions inside the stated operating range. A successful observation under easier conditions cannot replace that range limit. The brake motion and the later elastic excursion must remain separately defined when their bounds are combined. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 41 — Read the certificate conditions

**Format/placement:** DIAGNOSIS, Shaft and Brake House — The pad bench.

**Required stop kind:** calculation. **Player verb:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Metadata:** Concept: 11 — Read the certificate conditions; Keystone: Forces and boundaries, Momentum and impulse, Power and rate, Oscillations, Models and evidence, Constraints and uncertainty; Area: CAGE; Prerequisites: Stop 40 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: RETRIEVE; Difficulty: L4; Story role: reversal.

**Briefing decision advanced:** Does the empty test authorize the faster passenger profile?

**Actual mission answer — authoring only:** Reject that authorization; loaded warm-pad stopping needs the slower candidate.

**Call — exact player copy:** Go to Shaft and Brake House and inspect The pad bench.

**Stop reason — exact player copy:** The empty test certificate does not cover every load or pad state.

**Question card story setup — exact player copy (44 words; 2 sentences):** Ada Kerr notes that the March explanation fits, and an empty wind now stops cleanly inside its test marks beside the shaft. Compare the test conditions with the working-pad record before the crew treats that visible success as permission to carry a full shift.

**Question card story-science connection — exact player copy:** The adverse stopping bound determines which speed fits the actual space above the landing.

**Data/readings — exact player copy:** empty test: cold-pad deceleration 2.0 m/s² (normal); loaded warm rig: moving mass and stopping time 16000 kg, 2 m/s to rest in 2 s; net braking force 16000 N (watch); motor: drive torque during braking 0 N m at shaft angular speed 1 rad/s (normal); rope: measured angular frequency 1.25 rad/s, matching the earlier full-length model (normal); pad record: working-temperature pull limit lower than the cold certificate (alarm) Use J=Δp=FnetΔt, P=τω, and the Day 9 natural-frequency record to compare possible causes.

**Format-specific interaction block:**
```yaml
headline: Read the certificate conditions
readings:
- zone: empty test
  label: cold-pad deceleration
  value: 2.0 m/s²
  status: normal
- zone: loaded warm rig
  label: moving mass and stopping time
  value: 16000 kg, 2 m/s to rest in 2 s; net braking force 16000 N
  status: watch
- zone: motor
  label: drive torque during braking
  value: 0 N m at shaft angular speed 1 rad/s
  status: normal
- zone: rope
  label: measured angular frequency
  value: 1.25 rad/s, matching the earlier full-length model
  status: normal
- zone: pad record
  label: working-temperature pull limit
  value: lower than the cold certificate
  status: alarm
choices:
- label: Load and warm-pad limits restrict the passed test.
  mechanism: Load and warm-pad limits restrict the passed test.
- label: The motor keeps supplying power during the stop.
  mechanism: The motor keeps supplying power during the stop.
- label: A changed rope period explains the longer braking.
  mechanism: A changed rope period explains the longer braking.
- label: An empty pass certifies every larger moving load.
  mechanism: An empty pass certifies every larger moving load.
answer: Load and warm-pad limits restrict the passed test.
rebuttals:
  The motor keeps supplying power during the stop.: Drive power is τω=0×1=0 W, so continued motor work cannot explain the stop.
  A changed rope period explains the longer braking.: The measured 1.25 rad/s matches the earlier rope model; the changed braking term is not a new natural period.
  An empty pass certifies every larger moving load.: The loaded impulse is 16000×2=32000 N s; with 16000 N net braking, it requires 2 s, so the cold empty test cannot certify that case.
why: The loaded rig must remove 16000×2=32000 N s of momentum; its 16000 N net braking force takes 2 s, giving b=1 m/s². Motor power is zero and the rope frequency is unchanged, so neither continued motor work nor a changed bounce period explains the longer braking. The warm-pad loaded condition restricts the scope of the empty cold pass.
```

**Question card prompt — exact player copy:** Read every measurement, including the normal readings, and select the one cause consistent with the whole panel.

**Correct result:** Load and warm-pad limits restrict the passed test.. Acceptance: exact authored key.

**Answer text:** The loaded rig must remove 16000×2=32000 N s of momentum; its 16000 N net braking force takes 2 s, giving b=1 m/s². Motor power is zero and the rope frequency is unchanged, so neither continued motor work nor a changed bounce period explains the longer braking. The warm-pad loaded condition restricts the scope of the empty cold pass.

**Why/mechanism:** The loaded rig must remove 16000×2=32000 N s of momentum; its 16000 N net braking force takes 2 s, giving b=1 m/s². Motor power is zero because τω=0×1=0 W, and the rope frequency still matches 1.25 rad/s. Neither continued motor work nor changed oscillations explains the longer braking. The warm-pad loaded condition restricts the scope of the empty cold pass, whose larger deceleration belonged to a different test condition.

**Misconception:** An empty pass certifies every larger moving load..

**Wrong-path feedback:**

- **The motor keeps supplying power during the stop.:** Drive power is τω=0×1=0 W, so continued motor work cannot explain the stop.
- **A changed rope period explains the longer braking.:** The measured 1.25 rad/s matches the earlier rope model; the changed braking term is not a new natural period.
- **An empty pass certifies every larger moving load.:** The loaded impulse is 16000×2=32000 N s; with 16000 N net braking, it requires 2 s, so the cold empty test cannot certify that case.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The pad bench gains a dated evidence slip: Load and warm-pad limits restrict the passed test.

**Unlock:** Stop 42.

**Retrieval:** Stop 40 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; delayed retrieval after an intervening day.

**Later payoff:** Which complete profile can be signed for the defined operating range?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 41 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 42 — Bound the stopping travel

**Format/placement:** DERIVE, The Bank — The profile desk.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 11 — Bound the stopping travel; Keystone: Motion and derivatives, Energy accounting, Oscillations, Constraints and uncertainty; Area: BANK; Prerequisites: Stop 41 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: PRACTICE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** Does the empty test authorize the faster passenger profile?

**Actual mission answer — authoring only:** Reject that authorization; loaded warm-pad stopping needs the slower candidate.

**Call — exact player copy:** Go to The Bank and inspect The profile desk.

**Stop reason — exact player copy:** The overhead allowance must cover adverse braking and residual motion.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ruth Bell sees that the working-pad record gives less braking than the empty test, so the largest stopping travel must use the adverse condition. Combine that travel with the established rope-motion bound before comparing the candidate speeds with the space above the landing.

**Question card story-science connection — exact player copy:** The adverse stopping bound determines which speed fits the actual space above the landing.

**Data/readings — exact player copy:** For constant braking size b>0, a=−b and v dv/dy=−b; for the full campaign length/load range use bmin=1 m/s² and ωmin=1.25 rad/s. A validated envelope supplies residual amplitude ≤v/ωmin beyond drum-equivalent travel. Evaluate the candidate v=2 m/s.

**Format-specific interaction block:**
```yaml
derive:
  start: For constant braking size b>0, a=−b and v dv/dy=−b; for the full campaign length/load range use bmin=1 m/s² and ωmin=1.25 rad/s. A validated envelope supplies residual amplitude ≤v/ωmin beyond drum-equivalent travel. Evaluate the candidate v=2 m/s.
  goal: Derive total conservative stopping excursion as a function of approach speed.
  steps:
  - id: line1
    prompt: Integrate the velocity-position form of acceleration.
    choices:
    - line: ∫[v,0] u du=−b∫[0,d] dy; d=v²/(2b)
      correct: true
    - line: ∫[v,0] u du=−b∫[0,d] dy; d=(v−0)/(2b)
      correct: false
      survives: true
      why: Integrating u gives u²/2; losing the square changes both dimensions and the speed dependence.
  - id: line2
    prompt: Add the adverse remaining oscillation bound.
    choices:
    - line: d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v; at v=2, d_bound=2²/(2×1)+2/1.25=3.6 m
      correct: true
    - line: d_bound=v²/(2bmin)−v/ωmin=0.5v²−0.8v
      correct: false
      survives: true
      why: A safety envelope must include an excursion in the same adverse direction; subtracting it assumes a favorable phase.
  answerText: The integral gives translational braking travel; adding the separately validated worst-phase modal excursion is a conservative envelope, not a claim that both peaks occur simultaneously. Its range is limited to the campaign’s certified loads, lengths and response tests.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v. Acceptance: exact authored key.

**Answer text:** The integral gives translational braking travel; adding the separately validated worst-phase modal excursion is a conservative envelope, not a claim that both peaks occur simultaneously. Its range is limited to the campaign’s certified loads, lengths and response tests.

**Why/mechanism:** The integral gives translational braking travel; adding the separately validated worst-phase modal excursion is a conservative envelope, not a claim that both peaks occur simultaneously. Its range is limited to the campaign’s certified loads, lengths and response tests. Integrating u gives u²/2; losing the square changes both dimensions and the speed dependence. A safety envelope must include an excursion in the same adverse direction; subtracting it assumes a favorable phase.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** Integrating u gives u²/2; losing the square changes both dimensions and the speed dependence.
- **2:** A safety envelope must include an excursion in the same adverse direction; subtracting it assumes a favorable phase.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The profile desk gains a dated evidence slip: d_bound=v²/(2bmin)+v/ωmin=0.5v²+0.8v

**Unlock:** Stop 43.

**Retrieval:** Stop 41 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which complete profile can be signed for the defined operating range?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 42 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 43 — Test a warm loaded surrogate

**Format/placement:** VERIFY, Winder House — The test wind trace.

**Required stop kind:** operated. **Player verb:** First, calculate and commit drum-equivalent braking travel in m from the visible data. OPERATE: run the loaded warm-pad surrogate. Keep the 2 m/s approach speed and pad temperature fixed. MEASURE: press READ once after the run and record drum-equivalent braking travel. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 11 — Test a warm loaded surrogate; Keystone: Motion and derivatives, Models and evidence, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 42 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: reversal.

**Briefing decision advanced:** Does the empty test authorize the faster passenger profile?

**Actual mission answer — authoring only:** Reject that authorization; loaded warm-pad stopping needs the slower candidate.

**Call — exact player copy:** Go to Winder House and inspect The test wind trace.

**Stop reason — exact player copy:** The loaded warm-pad braking term needs a direct surrogate check.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ewan Price confirms that the stopping bound now uses the loaded warm-pad limit, but its braking term needs a separate instrumented check before sign-off. Carry that prediction to the winding trace and test the surrogate under the same stated load and pad conditions.

**Question card story-science connection — exact player copy:** The adverse stopping bound determines which speed fits the actual space above the landing.

**Data/readings — exact player copy:** Isolated loaded warm-pad surrogate uses v=2 m/s and constant braking b=1 m/s²; requested quantity is drum-equivalent braking travel only, d=v²/(2b), excluding the separately bounded rope excursion.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit drum-equivalent braking travel in m before RUN unlocks.
  predictionRange:
    min: 0
    max: 6
    step: 0.1
    unit: m
  truth: 2
  measurement:
    label: drum-equivalent braking travel
    cost: 1
  tolerance: 0.1
  correct_action: SUPPORTS MODEL
  answerText: d=2²/(2×1)=2.0 m; the surrogate supports the loaded warm-pad braking term, not an occupied full-shaft test.
```

**Question card prompt — exact player copy:** First, calculate and commit drum-equivalent braking travel in m from the visible data. OPERATE: run the loaded warm-pad surrogate. Keep the 2 m/s approach speed and pad temperature fixed. MEASURE: press READ once after the run and record drum-equivalent braking travel. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 2 m; SUPPORTS MODEL. Acceptance: 0.1.

**Answer text:** d=2²/(2×1)=2.0 m; the surrogate supports the loaded warm-pad braking term, not an occupied full-shaft test.

**Why/mechanism:** d=2²/(2×1)=2.0 m; the surrogate supports the loaded warm-pad braking term, not an occupied full-shaft test. The alternative ‘1 m’ fails for this reason: That uses the cold empty deceleration of 2 m/s². Isolated loaded warm-pad surrogate uses v=2 m/s and constant braking b=1 m/s²; requested quantity is drum-equivalent braking travel only, d=v²/(2b), excluding the separately bounded rope excursion.

**Misconception:** 1 m.

**Wrong-path feedback:**

- **1 m:** That uses the cold empty deceleration of 2 m/s².
- **3.6 m:** That adds the separate rope bound to a measurement of drum-equivalent travel only.
- **REJECTS MODEL:** The measured 2.0 m agrees with the loaded warm-pad prediction.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The test wind trace gains a dated evidence slip: 2 m; SUPPORTS MODEL

**Unlock:** Stop 44.

**Retrieval:** Stop 42 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which complete profile can be signed for the defined operating range?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 43 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 44 — Commit the day’s plan

**Format/placement:** CHOICE, Ewan Price at The winder desk.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 11 — Commit the day’s plan; Keystone: Motion and derivatives, Energy accounting, Models and evidence, Oscillations, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 43 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Does the empty test authorize the faster passenger profile?

**Actual mission answer — authoring only:** Reject that authorization; loaded warm-pad stopping needs the slower candidate.

**Call — exact player copy:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Stop reason — exact player copy:** The faster proposal exceeds the allowed stopping space.

**Question card story setup — exact player copy (41 words; 2 sentences):** Ewan Price finds that the surrogate supports the adverse braking term, and the higher-speed proposal now fails the combined space allowance above the landing. Decide what the empty success actually permits before carrying a narrower candidate into the final plan review.

**Question card story-science connection — exact player copy:** The adverse stopping bound determines which speed fits the actual space above the landing.

**Data/readings — exact player copy:** Campaign overhead allowance 5.0 m inclusive; allowed speed menu 1.5,2.0,2.5,3.0,3.5 m/s; d_bound=0.5v²+0.8v; at 2.0 m/s bound=3.6 m, at 2.5 bound=5.125 m; function rises for v≥0; empty cold pass does not certify loaded warm travel.

**Format-specific interaction block:**
```yaml
question: Does the empty test authorize the faster passenger profile?
choices:
- Reject faster clearance and carry 2 m/s to final review.
- Approve 2.5 m/s because the empty test passed.
- Approve 3.5 m/s because motor power passes.
- Reject 2 m/s because the cold result was different.
answer: Reject faster clearance and carry 2 m/s to final review.
why: The fastest admissible listed speed is 2.0 m/s under the adverse stopping envelope; full passenger clearance still needs the final independent acceptance and signed range.
rebuttals:
  Approve 2.5 m/s because the empty test passed.: The loaded warm bound is 5.125 m, above the 5.0 m allowance.
  Approve 3.5 m/s because motor power passes.: Power compliance does not remove the stricter stopping bound.
  Reject 2 m/s because the cold result was different.: Different tested conditions explain the difference; the loaded model is independently supported.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Reject faster clearance and carry 2 m/s to final review.. Acceptance: exact authored key.

**Answer text:** The fastest admissible listed speed is 2.0 m/s under the adverse stopping envelope; full passenger clearance still needs the final independent acceptance and signed range.

**Why/mechanism:** The fastest admissible listed speed is 2.0 m/s under the adverse stopping envelope; full passenger clearance still needs the final independent acceptance and signed range. The alternative ‘Approve 2.5 m/s because the empty test passed.’ fails for this reason: The loaded warm bound is 5.125 m, above the 5.0 m allowance. The alternative ‘Approve 3.5 m/s because motor power passes.’ fails for this reason: Power compliance does not remove the stricter stopping bound.

**Misconception:** Approve 2.5 m/s because the empty test passed..

**Wrong-path feedback:**

- **Approve 2.5 m/s because the empty test passed.:** The loaded warm bound is 5.125 m, above the 5.0 m allowance.
- **Approve 3.5 m/s because motor power passes.:** Power compliance does not remove the stricter stopping bound.
- **Reject 2 m/s because the cold result was different.:** Different tested conditions explain the difference; the loaded model is independently supported.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: Reject faster clearance and carry 2 m/s to final review.

**Unlock:** Day 11 outcome and recovery allocation.

**Retrieval:** Stop 43 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Which complete profile can be signed for the defined operating range?

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 44 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: The empty test does not clear the faster passenger trip. The loaded warm case needs more space. Keep the two-metre-per-second choice for final review. The last empty test is ready. Ewan crosses out the faster passenger timetable in front of Ruth and cancels the overtime it was meant to support. Ada marks the empty pass with its load and pad state, then carries only the slower candidate into final review.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 11 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The empty-test approval is narrowed to its tested load. The test work consumes workshop reserve.

**Automatic bar change:** Safe Winding Plan -3 | Test Evidence +5 | Workshop Reserve -2 | Passenger Safeguards -2.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 4, 0]; bars [90, 98, 86, 86]; bank 0.

**Lock/failure result:** No permanent locks today; a zero bar before allocation restores the day-start snapshot.

## K. Quick concept review

- The loaded rig must remove 16000×2=32000 N s of momentum; its 16000 N net braking force takes 2 s, giving b=1 m/s².
- The integral gives translational braking travel; adding the separately validated worst-phase modal excursion is a conservative envelope, not a claim that both peaks occur simultaneously.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** A test approves only the conditions it actually covers.

---

### GO DEEPER — Mission 11 — optional exact player copy

**Availability:** After mission_complete_11, on explicit GO DEEPER selection. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Build conservative stopping bounds from response delay and braking. Compare trials only within their stated loads and conditions, and use a failed candidate to learn which limit binds.

**Supporting concepts:**

- For constant deceleration magnitude b>0, braking distance is v²/(2b).
- A response delay τ before braking adds vτ if speed stays constant during the delay.
- A conservative excursion bound may add a separately justified positive residual-motion allowance A; its assumptions must be stated.
- Testing one load and temperature does not establish the same braking performance at all other loads and temperatures.

#### OW-GD-M11-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cart at 4 m/s brakes at constant magnitude 2 m/s² with no delay. What is stopping distance?

- **A.** 2 m
- **B.** 4 m
- **C.** 8 m
- **D.** 16 m

**Correct key:** B

**Hint:** Use v_f²=v_i²−2bd with v_f=0.

**Feedback A:** That is the stopping time in seconds, not distance.

**Feedback B:** d=4²/(2×2).

**Feedback C:** This omits the factor two in the denominator.

**Feedback D:** The speed square still needs division by 2b.

**Independent solution:** d=v²/(2b)=4²/(2×2)=16/4=4 m.

#### OW-GD-M11-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cart remains at 3 m/s for a 0.4 s response delay before braking starts. How much distance does the delay add?

- **A.** 7.5 m
- **B.** 0.4 m
- **C.** 1.2 m
- **D.** 3.4 m

**Correct key:** C

**Hint:** No deceleration occurs during the stated delay.

**Feedback A:** Delay travel multiplies speed by time.

**Feedback B:** The speed must be included.

**Feedback C:** vτ=3×0.4.

**Feedback D:** Speed and time cannot be added.

**Independent solution:** d_delay=vτ=3×0.4=1.2 m.

#### OW-GD-M11-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cart has v=2 m/s, delay τ=0.5 s, braking magnitude b=1 m/s² and a separately justified residual allowance A=0.3 m. What is the bound vτ+v²/(2b)+A?

- **A.** 3.3 m
- **B.** 2.3 m
- **C.** 1.3 m
- **D.** 5.3 m

**Correct key:** A

**Hint:** Calculate each term before adding.

**Feedback A:** The three terms are 1, 2 and 0.3 m.

**Feedback B:** This omits travel during delay.

**Feedback C:** This omits the braking distance.

**Feedback D:** The braking term is 2 m, not 4 m.

**Independent solution:** d_bound=2×0.5+4/(2×1)+0.3=3.3 m.

#### OW-GD-M11-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Available travel is 5 m. A candidate’s conservative excursion bound is 4.2 m. What positive margin remains?

- **A.** 9.2 m
- **B.** 4.2 m
- **C.** −0.8 m
- **D.** 0.8 m

**Correct key:** D

**Hint:** Define margin as available minus required.

**Feedback A:** Margin subtracts required travel from available travel.

**Feedback B:** That is the required bound, not unused travel.

**Feedback C:** The sign is positive because available travel is larger.

**Feedback D:** 5−4.2=0.8 m.

**Independent solution:** margin=available travel−required bound=5−4.2=0.8 m.

#### OW-GD-M11-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** At the same initial speed and zero delay, available deceleration magnitude halves. What happens to braking distance?

- **A.** It halves
- **B.** It doubles
- **C.** It quadruples
- **D.** It stays fixed

**Correct key:** B

**Hint:** Hold speed fixed in v²/(2b).

**Feedback A:** A weaker brake needs more distance.

**Feedback B:** d∝1/b for fixed v.

**Feedback C:** Only a factor two change in inverse b is present.

**Feedback D:** Braking magnitude appears in the stopping-distance denominator.

**Independent solution:** d_new=v²/[2(b/2)]=2d_old.

#### OW-GD-M11-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A cold, lightly loaded trial meets its stopping prediction. Which statement is justified by that trial alone?

- **A.** All warm loaded trials must pass
- **B.** The model is false for heavy loads
- **C.** The prediction agrees under the tested cold, light conditions
- **D.** The fastest possible speed has been found

**Correct key:** C

**Hint:** Keep the claim inside the observed conditions.

**Feedback A:** Those conditions were not tested or bounded by the single trial.

**Feedback B:** Lack of evidence is not proof of failure.

**Feedback C:** The claim remains within the evidence’s domain.

**Feedback D:** One trial does not optimize speed over all relevant constraints.

**Independent solution:** Agreement is established only for the measured trial; extending the range requires evidence or justified bounds.


# Mission 12 — FORTY-ONE TALLIES

## A. Mission briefing card — exact player copy

**Header:** DAY 12 OF 12 — INSPECTION IN 1 DAYS

**Card title:** FORTY-ONE TALLIES

**Go now:** Go to The Bank and meet Ruth Bell, cage operator, at The depth indicator.

**Card body (52 words; 4 sentences):** The slower speed fits the worst stop, and the last test is ready. The plan must meet each limit for the loads it covers. At the Bank, Rope Shop and Winder House, check the final record. By the end of the mission, you choose the full profile that can open passenger access.

**Objective:** Which complete profile can be signed for the defined operating range?

**Stake — exact player copy:** Today you choose the full profile Ruth can use to open the gate for all forty-one miners.

**Segue — exact player copy:** Now Ruth Bell can call the shift forward, but Ewan Price’s posted limits must hold even when production falls behind.

### Worth knowing first — exact player copy

#### Glossary terms

Operating range: the loads, lengths and conditions for which a plan has been checked.

Acceptance test: a final comparison between a committed prediction and an independent measurement.

Constraint: a condition that every permitted plan must satisfy.

#### Primer concepts

- Name the body, positive direction and quantity before using a relation.
- Compare a result only with the condition and range that its record actually covers.
- A plan fails if any one of its required constraints fails.

#### Equations first needed today

No new equation is introduced today; retrieve the force, torque, power, stopping and oscillation relationships already recorded in the mission log.

**Optional help button:** `WORKED EXAMPLES (5)` — opens the five examples below; they are ungraded, pause the timer, change no bars, world state, unlocks or retrieval credit, and can be closed and reopened.

### Optional worked examples — exact player copy

1. A plan uses 70 newtons against an 80 newton limit and 30 watts against a 25 watt limit; it fails overall because every constraint must pass.

2. A test predicts 1.2 metres with tolerance 0.1 metres; a reading of 1.25 metres passes since the absolute difference is 0.05 metres.

3. An excursion bound is v²+v metres with v in metres per second; an allowance of 6 metres permits v=2 but rejects v=3 because the results are 6 and 12 metres.

4. A machine delivers 24 joules in 3 seconds at constant rate; power is 8 watts, so a 10 watt limit passes even though the energy and power numbers have different units.

5. An oscillator with ω=3 radians per second and initial speed 0.6 metres per second at equilibrium has amplitude 0.2 metres; halving speed halves amplitude while reducing kinetic energy to one quarter.

**Authoring-only failure consequence:** An unsupported approval could expose the shift to an unsafe trip; the required briefing ties the tests to passenger access.

**Authoring-only later travel:** Evidence after the first two stops unlocks the next named room; in the final two days, Stop 45 first unlocks the intermediate room and Stop 46 unlocks the third.

## B. Main story happening — designer summary

The signed range and unoccupied acceptance unlock the passenger gate. The day moves from commit the empty acceptance prediction through combine the signed limits and check the independent safety margin to the owner’s signed decision. The passenger gate opens and the completed plan remains available for review. Ruth opens the passenger gate for the signed range. Ewan posts the slower timetable above his crossed-out promise. The crew regains regular access but loses the planned overtime; Ruth’s ending account says Finn takes his tally only after the final checks are complete.

## C. Designer intent — not shown to player

Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance. The four stops produce evidence for this answer in order. A correct calculation never supplies a broader approval than its measured conditions support; each wrong candidate represents a specific alternative mechanism. The outcome changes the working site rather than adding a fifth quiz.

## D. Player-facing beat script

### Beat OW-D12-ARR — On arrival at The Bank

**Location:** The Bank.

**Presentation:** nearby_character_bubble.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** The day’s record is open and passenger approval is still limited.

**Dialogue bubble — Ruth Bell, by radio:** “Forty-one tallies are still here. We finish the empty checks before I call anyone forward.”

**Dialogue bubble — Ewan Price, by radio:** “The old overtime promise is beside the new sheet. I will not hide what this decision costs.”

**Panel text:** “The day’s record is open and passenger approval is still limited.”

**Unlocks:** Stop 45.

### Beat OW-D12-R1 — After Stop 45

**Location:** The Bank.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** 0.25 m; SUPPORTS MODEL. Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.

**Panel text:** “0.25 m; SUPPORTS MODEL. Take this evidence to Rope Shop at The rope bench; only that record or test can check the next part.”

**Unlocks:** Stop 46 and waypoint to Rope Shop.

### Beat OW-D12-R2 — After Stop 46

**Location:** Rope Shop.

**Presentation:** equipment_panel_update with two radio dialogue bubbles.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** v=2.0 m/s: P=320 kW and d_bound=3.6 m; faster listed speeds fail stopping. Take this evidence to Winder House at The test wind trace; only that record or test can check the next part.

**Panel text:** “v=2.0 m/s: P=320 kW and d_bound=3.6 m; faster listed speeds fail stopping. Take this evidence to Winder House at The test wind trace; only that record or test can check the next part.”

**Dialogue bubble — Ewan Price, by radio:** “Two metres per second is the fastest listed candidate that survives the combined limits.”

**Dialogue bubble — Ruth Bell, by radio:** “Keep 'listed' and the tested range on the sheet. Nobody should read that as an unlimited promise.”

**Unlocks:** Stop 47 and waypoint to Winder House.

### Beat OW-D12-R3 — After Stop 47 is accepted

**Location:** Current Stop 47 fixture (Winder House, The test wind trace (`test-trace`).); the named speaker uses radio unless already local.

**Presentation:** radio dialogue bubble.

**Player control:** One Continue; timer paused, line logged, immediate control return.

**World state:** Existing accepted Stop 47 evidence is retained; no additional state or reward.

**Dialogue bubble — Ruth Bell, by radio:** “The independent margin is recorded. The gate stays shut until the decision and final allocation are complete.”

**Unlocks:** No new gate; continue to existing Stop 48.

### Beat OW-D12-DEC — After Stop 48

**Location:** Winder House.

**Presentation:** equipment_panel_update.

**Player control:** One Continue; timer paused while the required text is visible, then immediate control return.

**World state:** Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.

**Panel text:** “Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.”

**Unlocks:** outcome and free-play aftermath.

### Beat OW-D12-END — At mission end

**Location:** Winder House.

**Presentation:** persistent_world_change.

**Player control:** Free movement for 60 seconds with timer paused; inspect the changed object to open metrics.

**World state:** The signed range and unoccupied acceptance unlock the passenger gate. The passenger gate opens and the completed plan remains available for review.

**Panel text:** “Ruth opens the passenger gate for the signed range. Ewan posts the slower timetable above his crossed-out promise. The crew regains regular access but loses the planned overtime; Ruth’s ending account says Finn takes his tally only after the final checks are complete. Now Ruth Bell can call the shift forward, but Ewan Price’s posted limits must hold even when production falls behind.”

**Dialogue bubble — Ruth Bell, by radio:** “The signed limits stay here when this shift leaves. Ada, they belong to the next operator too.”

**Dialogue bubble — Ada Kerr, by radio:** “They will. Ewan's slower sheet carries the conditions, not just the speed.”

**Unlocks:** metric screen after the changed-state inspection.

### Physical aftermath — ow-shift-sheet

**Home:** `winder-desk`. **Before:** Old overtime promise posted. **After — exact action:** Ewan pins the slower timetable above the crossed-out promise.

**Trigger:** mission_complete_12 AND final allocation complete AND all original final gates satisfied. The accepted decision causes this visible action once; it is not triggered by optional dialogue or merely opening a question. **Persistence:** retain the changed prop at its home for later inspection; retries and replay do not repeat the action or award resources. Restoring a mission-start snapshot restores its matching prop state; re-acceptance reapplies it once. **Interaction:** existing changed-object inspection only, no inventory or new graded task. The gate and passenger movement still wait for the existing final checks; this action accompanies their successful transition.

## E. Location plan

**3 locations:** The Bank → Rope Shop → Winder House.

- Stop 45: The Bank, The depth indicator (`depth-dial`).
- Stop 46: Rope Shop, The rope bench (`rope-bench`).
- Stop 47: Winder House, The test wind trace (`test-trace`).
- Stop 48: Winder House, The winder desk (`winder-desk`).

Every transition is caused by the preceding record. The next room supplies a specific independent test, archived instrument, physical rope measurement or final signing authority unavailable at the previous fixture. Waypoint copy appears in the after-stop beat; no waypoint opens before its evidence dependency.

## F. Characters and dramatic beat

Ruth Bell, cage operator, owns the BANK evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Mara Shaw, rope technician, owns the ROPE evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

Ewan Price, winding engineer, owns the WIND evidence and can stop an unsupported approval. Optional greeting selection follows the exact milestone rules in §4.2.

## G. Key concepts, explained here

Models and evidence support a signed plan only over the conditions used to obtain its limits. Every constraint must hold at the same time. The final acceptance adds evidence for its own conditions and cannot silently authorize heavier loads or an altered rope. The source-scope supplement remains available from the log; it does not create additional graded stops.

## H1. Stop 45 — Commit the empty acceptance prediction

**Format/placement:** VERIFY, The Bank — The depth indicator.

**Required stop kind:** operated. **Player verb:** First, calculate and commit drum-equivalent braking travel in m from the visible data. OPERATE: run the unoccupied 1 m/s acceptance wind. Keep the empty-cage mass, pad state and 1 m/s test speed fixed. MEASURE: press READ once after the run and record drum-equivalent braking travel. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 12 — Commit the empty acceptance prediction; Keystone: Motion and derivatives, Models and evidence, Constraints and uncertainty; Area: BANK; Prerequisites: Stop 44 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which complete profile can be signed for the defined operating range?

**Actual mission answer — authoring only:** Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.

**Call — exact player copy:** Go to The Bank and inspect The depth indicator.

**Stop reason — exact player copy:** The final empty acceptance needs a committed prediction.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ruth Bell notes that the slower candidate survives the adverse envelope, but the final unoccupied acceptance still needs a prediction committed before the wind. Check its own measured conditions at the Bank so a successful empty run is recorded without overstating its scope.

**Question card story-science connection — exact player copy:** The final approval is useful only when every tested limit remains attached to the signed profile.

**Data/readings — exact player copy:** Unoccupied cage acceptance: initial speed 1 m/s; independently measured cold-empty b=2 m/s²; predict drum-equivalent braking travel d=v²/(2b); rope motion is logged separately.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit drum-equivalent braking travel in m before RUN unlocks.
  predictionRange:
    min: 0
    max: 2
    step: 0.01
    unit: m
  truth: 0.25
  measurement:
    label: drum-equivalent braking travel
    cost: 1
  tolerance: 0.02
  correct_action: SUPPORTS MODEL
  answerText: d=1²/(2×2)=0.25 m; the unoccupied acceptance record reads 0.25 m. It supports this test condition without replacing the loaded envelope.
```

**Question card prompt — exact player copy:** First, calculate and commit drum-equivalent braking travel in m from the visible data. OPERATE: run the unoccupied 1 m/s acceptance wind. Keep the empty-cage mass, pad state and 1 m/s test speed fixed. MEASURE: press READ once after the run and record drum-equivalent braking travel. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 0.25 m; SUPPORTS MODEL. Acceptance: 0.02.

**Answer text:** d=1²/(2×2)=0.25 m; the unoccupied acceptance record reads 0.25 m. It supports this test condition without replacing the loaded envelope.

**Why/mechanism:** d=1²/(2×2)=0.25 m; the unoccupied acceptance record reads 0.25 m. It supports this test condition without replacing the loaded envelope. The alternative ‘0.5 m’ fails for this reason: This uses the loaded warm value of b rather than the stated test value. Unoccupied cage acceptance: initial speed 1 m/s; independently measured cold-empty b=2 m/s²; predict drum-equivalent braking travel d=v²/(2b); rope motion is logged separately.

**Misconception:** 0.5 m.

**Wrong-path feedback:**

- **0.5 m:** This uses the loaded warm value of b rather than the stated test value.
- **1.05 m:** This adds a rope bound to the drum-only measurement.
- **REJECTS MODEL:** The measured quarter-metre travel matches the committed prediction.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The depth indicator gains a dated evidence slip: 0.25 m; SUPPORTS MODEL

**Unlock:** Stop 46.

**Retrieval:** Stop 44 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Passenger gate opens only after the signed operating range and four bars pass.

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 45 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H2. Stop 46 — Combine the signed limits

**Format/placement:** DERIVE, Rope Shop — The rope bench.

**Required stop kind:** calculation. **Player verb:** Build the derivation by selecting one expression at each step

**Metadata:** Concept: 12 — Combine the signed limits; Keystone: Forces and boundaries, Torque and rotation, Energy accounting, Power and rate, Oscillations, Constraints and uncertainty; Area: ROPE; Prerequisites: Stop 45 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which complete profile can be signed for the defined operating range?

**Actual mission answer — authoring only:** Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.

**Call — exact player copy:** Go to Rope Shop and inspect The rope bench.

**Stop reason — exact player copy:** The signed speed must satisfy every limit at once.

**Question card story setup — exact player copy (42 words; 2 sentences):** Mara Shaw sees that the unoccupied acceptance matches its prediction, and every earlier constraint can now be applied to the final speed menu together. Carry the signed records to the rope bench and select the fastest candidate that satisfies all of them.

**Question card story-science connection — exact player copy:** The final approval is useful only when every tested limit remains attached to the signed profile.

**Data/readings — exact player copy:** Candidate menu v={1.5,2.0,2.5,3.0,3.5} m/s; a=1 m/s²; full-length mean T=176 kN; torque=374.5 kN m; cruise power=160v kW; stopping bound=0.5v²+0.8v m; ceilings T≤220 kN, torque≤400 kN m, power≤600 kW, excursion≤5 m.

**Format-specific interaction block:**
```yaml
derive:
  start: Candidate menu v={1.5,2.0,2.5,3.0,3.5} m/s; a=1 m/s²; full-length mean T=176 kN; torque=374.5 kN m; cruise power=160v kW; stopping bound=0.5v²+0.8v m; ceilings T≤220 kN, torque≤400 kN m, power≤600 kW, excursion≤5 m.
  goal: Apply all independent constraints and identify the fastest listed admissible speed.
  steps:
  - id: line1
    prompt: Require every independent operating limit.
    choices:
    - line: admissible=ALL{T≤220, τ≤400, 160v≤600, 0.5v²+0.8v≤5}
      correct: true
    - line: admissible=ANY{T≤220, τ≤400, 160v≤600, 0.5v²+0.8v≤5}
      correct: false
      survives: true
      why: An OR condition would approve a plan that violates three limits merely because one passes.
  - id: line2
    prompt: Choose the fastest listed speed surviving the combined conditions.
    choices:
    - line: 'v=2.0 m/s: P=160×2=320 kW; d_bound=0.5×2²+0.8×2=3.6 m; at 2.5, d_bound=0.5×2.5²+0.8×2.5=5.125 m > 5 m'
      correct: true
    - line: 'v=3.5 m/s: P=560 kW and d_bound=8.925 m; passing power permits the plan'
      correct: false
      survives: true
      why: The higher-speed option passes power but exceeds the 5 m stopping allowance; a single pass cannot replace the conjunction.
  answerText: The start already passes mean pull and torque; cruise power at 2 m/s is 320 kW and the total excursion bound is 3.6 m. Since the stopping function increases for positive speed and 2.5 m/s fails, every faster listed candidate fails too.
```

**Question card prompt — exact player copy:** Build the derivation by selecting one expression at each step; inspect the stated physical reason before committing each line.

**Correct result:** v=2.0 m/s: P=320 kW and d_bound=3.6 m; faster listed speeds fail stopping. Acceptance: exact authored key.

**Answer text:** The start already passes mean pull and torque; cruise power at 2 m/s is 320 kW and the total excursion bound is 3.6 m. Since the stopping function increases for positive speed and 2.5 m/s fails, every faster listed candidate fails too.

**Why/mechanism:** The start already passes mean pull and torque; cruise power at 2 m/s is 320 kW and the total excursion bound is 3.6 m. Since the stopping function increases for positive speed and 2.5 m/s fails, every faster listed candidate fails too. An OR condition would approve a plan that violates three limits merely because one passes. The higher-speed option passes power but exceeds the 5 m stopping allowance; a single pass cannot replace the conjunction.

**Misconception:** 1.

**Wrong-path feedback:**

- **1:** An OR condition would approve a plan that violates three limits merely because one passes.
- **2:** The higher-speed option passes power but exceeds the 5 m stopping allowance; a single pass cannot replace the conjunction.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The rope bench gains a dated evidence slip: v=2.0 m/s: P=320 kW and d_bound=3.6 m; faster listed speeds fail stopping

**Unlock:** Stop 47.

**Retrieval:** Stop 45 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Passenger gate opens only after the signed operating range and four bars pass.

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 46 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H3. Stop 47 — Check the independent safety margin

**Format/placement:** VERIFY, Winder House — The test wind trace.

**Required stop kind:** operated. **Player verb:** First, calculate and commit remaining stopping margin in m from the visible data. OPERATE: run the independent signed-plan margin check. Keep the recorded allowance and adverse bound fixed. MEASURE: press READ once after the run and record remaining stopping margin. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required

**Metadata:** Concept: 12 — Check the independent safety margin; Keystone: Energy accounting, Models and evidence, Oscillations, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 46 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L3; Story role: clue.

**Briefing decision advanced:** Which complete profile can be signed for the defined operating range?

**Actual mission answer — authoring only:** Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.

**Call — exact player copy:** Go to Winder House and inspect The test wind trace.

**Stop reason — exact player copy:** The remaining stopping margin needs an independent arithmetic check.

**Question card story setup — exact player copy (43 words; 2 sentences):** Ewan Price confirms that the combined limits leave one fastest listed candidate, but the remaining space needs an independent arithmetic check before the plan is signed. Commit that margin at the winding trace and verify the calculation against the locked allowance and demand.

**Question card story-science connection — exact player copy:** The final approval is useful only when every tested limit remains attached to the signed profile.

**Data/readings — exact player copy:** Separate signed-plan calculator takes overhead allowance 5.0 m minus the adverse excursion bound 3.6 m at 2 m/s; margin = allowance − bound. This is a software arithmetic check, not another physical test.

**Format-specific interaction block:**
```yaml
verify:
  prediction_prompt: Commit remaining stopping margin in m before RUN unlocks.
  predictionRange:
    min: 0
    max: 5
    step: 0.1
    unit: m
  truth: 1.4
  measurement:
    label: remaining stopping margin
    cost: 1
  tolerance: 0.05
  correct_action: SUPPORTS MODEL
  answerText: Margin=5.0−3.6=1.4 m, so the independent calculation supports the committed plan arithmetic; physical validation remains the earlier test evidence.
```

**Question card prompt — exact player copy:** First, calculate and commit remaining stopping margin in m from the visible data. OPERATE: run the independent signed-plan margin check. Keep the recorded allowance and adverse bound fixed. MEASURE: press READ once after the run and record remaining stopping margin. INTERPRET: compare with your prediction and submit SUPPORTS MODEL or REJECTS MODEL. No restoration or second reading is required; this isolated test resets on retry.

**Correct result:** 1.4 m; SUPPORTS MODEL. Acceptance: 0.05.

**Answer text:** Margin=5.0−3.6=1.4 m, so the independent calculation supports the committed plan arithmetic; physical validation remains the earlier test evidence.

**Why/mechanism:** Margin=5.0−3.6=1.4 m, so the independent calculation supports the committed plan arithmetic; physical validation remains the earlier test evidence. Adding demand to allowance does not measure remaining space. The alternative ‘3.6 m’ fails for this reason: This is the demand, not the remaining margin. Separate signed-plan calculator takes overhead allowance 5.0 m minus the adverse excursion bound 3.6 m at 2 m/s; margin = allowance − bound.

**Misconception:** 8.6 m.

**Wrong-path feedback:**

- **8.6 m:** Adding demand to allowance does not measure remaining space.
- **3.6 m:** This is the demand, not the remaining margin.
- **REJECTS MODEL:** The independent arithmetic check agrees with the recorded margin.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The test wind trace gains a dated evidence slip: 1.4 m; SUPPORTS MODEL

**Unlock:** Stop 48.

**Retrieval:** Stop 46 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Passenger gate opens only after the signed operating range and four bars pass.

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 47 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## H4. Stop 48 — Commit the day’s plan

**Format/placement:** CHOICE, Ewan Price at The winder desk.

**Required stop kind:** decision. **Player verb:** Read the recorded evidence and select one operating decision.

**Metadata:** Concept: 12 — Commit the day’s plan; Keystone: Forces and boundaries, Torque and rotation, Energy accounting, Models and evidence, Power and rate, Oscillations, Constraints and uncertainty; Area: WIND; Prerequisites: Stop 47 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; Learning role: COMBINE; Difficulty: L5; Story role: decision.

**Briefing decision advanced:** Which complete profile can be signed for the defined operating range?

**Actual mission answer — authoring only:** Sign the 2 m/s profile with a 1 m/s² start, tested range limits and unoccupied acceptance.

**Call — exact player copy:** Go to Winder House and meet Ewan Price, winding engineer, at The winder desk.

**Stop reason — exact player copy:** Passenger access needs a signed profile with explicit limits.

**Question card story setup — exact player copy (44 words; 2 sentences):** Ewan Price finds that the independent check confirms the remaining margin, and the unoccupied acceptance record is complete beside the twelve-page winding plan. Give the winding engineer the final profile and its tested limits so passenger access opens only for the conditions actually covered.

**Question card story-science connection — exact player copy:** The final approval is useful only when every tested limit remains attached to the signed profile.

**Data/readings — exact player copy:** Signable campaign range: total cage plus payload 1000≤M≤4000 kg; hanging length 40–1200 m; start a≤1 m/s²; v menu as above; g table 10 m/s² conservatively covers synthetic survey; rope mean-pull≤220 kN; motor torque≤400 kN m; cruise power≤600 kW; working-pad b≥1 m/s²; modal envelope ω≥1.25 rad/s and residual amplitude≤v/ω; overhead allowance≥5 m; inspection/test flags all complete; bars are settled after the decision before passenger release. Residual-state acceptance also requires x0≈0 and u≤min(v,g/(2ω)); no slack-rope trajectory is permitted.

**Format-specific interaction block:**
```yaml
question: Which complete profile can be signed for the defined operating range?
choices:
- Sign 2 m/s within the tested range and retain its limits.
- Sign 2.5 m/s because its power is below the ceiling.
- Sign 2 m/s for all future loads and rope changes.
- Sign 3.5 m/s because the empty cage passed today.
answer: Sign 2 m/s within the tested range and retain its limits.
why: All limits hold for the listed 2 m/s profile within the stipulated certified range; any change outside that range requires renewed engineering review and no automatic passenger release.
rebuttals:
  Sign 2.5 m/s because its power is below the ceiling.: The 2.5 m/s stopping bound exceeds the available 5 m.
  Sign 2 m/s for all future loads and rope changes.: The signed result depends on explicit mass, length, pad and elastic-response limits.
  Sign 3.5 m/s because the empty cage passed today.: The empty acceptance does not certify a heavier warm-pad case or erase the stopping envelope.
```

**Question card prompt — exact player copy:** Read the recorded evidence and select one operating decision.

**Correct result:** Sign 2 m/s within the tested range and retain its limits.. Acceptance: exact authored key.

**Answer text:** All limits hold for the listed 2 m/s profile within the stipulated certified range; any change outside that range requires renewed engineering review and no automatic passenger release.

**Why/mechanism:** All limits hold for the listed 2 m/s profile within the stipulated certified range; any change outside that range requires renewed engineering review and no automatic passenger release. The 2.5 m/s stopping bound exceeds the available 5 m. The alternative ‘Sign 2 m/s for all future loads and rope changes.’ fails for this reason: The signed result depends on explicit mass, length, pad and elastic-response limits.

**Misconception:** Sign 2.5 m/s because its power is below the ceiling..

**Wrong-path feedback:**

- **Sign 2.5 m/s because its power is below the ceiling.:** The 2.5 m/s stopping bound exceeds the available 5 m.
- **Sign 2 m/s for all future loads and rope changes.:** The signed result depends on explicit mass, length, pad and elastic-response limits.
- **Sign 3.5 m/s because the empty cage passed today.:** The empty acceptance does not certify a heavier warm-pad case or erase the stopping envelope.

Retry: dismiss feedback, review the unchanged data, reset the unsolved board and commit again; the next stop stays locked until a correct submission. For matching, each wrong connection identifies the evidence row and explains why the selected response belongs to a different row; no credit comes from an incomplete mapping.

**State/output:** The winder desk gains a dated evidence slip: Sign 2 m/s within the tested range and retain its limits.

**Unlock:** Day 12 outcome and recovery allocation.

**Retrieval:** Stop 47 result in the mission log; current mission primer; preceding numbered spine relationships used in the visible data; an adjacent reuse is practice, not a delayed encounter.

**Later payoff:** Passenger gate opens only after the signed operating range and four bars pass.

**Stop kernel and numerical/data consistency bundle:** Canonical v1.1 source data, exact key, feedback and follow-on references are the fields immediately above. Rebuild companion ledger row 48 from these fields before import; a v1.0 ledger is historical and must not override this revision.

## I. Mission outcome

Mission decision: Sign the two-metre-per-second plan within its tested range. The slower start and all limits stay attached. The empty test agrees with its prediction. Once the four bars are full, the passenger gate opens. Ruth opens the passenger gate for the signed range. Ewan posts the slower timetable above his crossed-out promise. The crew regains regular access but loses the planned overtime; Ruth’s ending account says Finn takes his tally only after the final checks are complete.

## J. Post-mission metric screen — exact player copy

**Header:** MISSION 12 COMPLETE

**Timer line template:** TIME {elapsed} / TARGET 12:00

**Accuracy line template:** INCORRECT SUBMISSIONS {incorrect_submissions}

**Story event:** The signed range and unoccupied acceptance unlock the passenger gate. The completed work releases the protected reserve.

**Automatic bar change:** Safe Winding Plan +10 | Test Evidence +8 | Workshop Reserve +20 | Passenger Safeguards +12.

**Recovery Point line template:** RP = clamp(4,12,11 + time modifier − incorrect submissions) = {awarded}.

**Allocation prompt:** Spend one point to raise an unlocked bar by one percent, or bank it up to 30 points.

**Canonical QA example:** 4 RP; allocation [0, 0, 0, 2]; bars [100, 100, 100, 100]; bank 2.

**Lock/failure result:** After allocation, lock all bars at 100 only when all final scientific flags are true; open the passenger gate and mark the shift READY.

## K. Quick concept review

- d=1²/(2×2)=0.25 m; the unoccupied acceptance record reads 0.25 m.
- The start already passes mean pull and torque; cruise power at 2 m/s is 320 kW and the total excursion bound is 3.6 m.
- When checking a new operating proposal, retrieve the earlier model and verify that its conditions still apply.
- **Mission takeaway:** A signed profile must keep every constraint and its tested range.

---
### GO DEEPER — Mission 12 — optional exact player copy

**Availability:** Only on explicit selection after the ending card has closed and normal control has returned. Use the state-neutral review contract in §4.4; no graded-stop, timer, RP, bar or unlock effects.

**Secondary brief:** Combine independent constraints in a new transport example. Find the fastest listed choice that survives every bound, then state the operating range and what would trigger a new check.

**Supporting concepts:**

- Feasibility requires every applicable inequality to hold; passing one cannot compensate for failing another.
- The fastest feasible member of a finite list is not a proof of the global maximum over all possible profiles.
- A signed operating range states loads, geometry and performance assumptions together with the chosen setting.
- A repeat acceptance test checks its specified case; continued validity also depends on the assumptions remaining true.

#### OW-GD-M12-Q1

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** Listed speeds are 1, 2, 3 and 4 m/s. Power requires v≤3 m/s and stopping requires v≤2.5 m/s. Which is the fastest listed feasible speed?

- **A.** 1 m/s
- **B.** 3 m/s
- **C.** 4 m/s
- **D.** 2 m/s

**Correct key:** D

**Hint:** Intersect the constraints before selecting from the list.

**Feedback A:** It is feasible, but 2 m/s is also feasible and faster.

**Feedback B:** It violates the stopping limit.

**Feedback C:** It violates both limits.

**Feedback D:** It is the largest listed value below both bounds.

**Independent solution:** Combined bound is v≤2.5; feasible listed choices are 1 and 2; choose 2 m/s.

#### OW-GD-M12-Q2

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A proposal must satisfy T≤90 N and P≤160 W. Candidate A has T=80 N, P=150 W; candidate B has T=95 N, P=120 W. Which is feasible?

- **A.** A only
- **B.** B only
- **C.** Both
- **D.** Neither

**Correct key:** A

**Hint:** Check each candidate against each inequality.

**Feedback A:** A passes both; B fails tension despite using less power.

**Feedback B:** Lower power cannot compensate for excessive tension.

**Feedback C:** B violates the tension inequality.

**Feedback D:** A is within both bounds.

**Independent solution:** A:80≤90 and150≤160. B:95>90, so B fails.

#### OW-GD-M12-Q3

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A test cart at 1.2 m/s brakes at 1.8 m/s² with no delay. What stopping distance should be committed before the test?

- **A.** 0.8 m
- **B.** 0.6 m
- **C.** 0.4 m
- **D.** 1.44 m

**Correct key:** C

**Hint:** Use the specified constant-braking model.

**Feedback A:** The denominator includes the factor two.

**Feedback B:** This is not v²/(2b).

**Feedback C:** 1.2²/(2×1.8)=1.44/3.6.

**Feedback D:** This is only the squared speed, not a distance calculation.

**Independent solution:** d=v²/(2b)=1.2²/(2×1.8)=1.44/3.6=0.4 m.

#### OW-GD-M12-Q4

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A machine has constant resisting force 120 N, input power limit 400 W and efficiency 75%. What is the steady-speed ceiling from power alone?

- **A.** 3.33 m/s
- **B.** 2.5 m/s
- **C.** 0.4 m/s
- **D.** 4 m/s

**Correct key:** B

**Hint:** Apply efficiency before dividing by force.

**Feedback A:** That treats all input power as useful output.

**Feedback B:** Useful power=300 W, so v=300/120.

**Feedback C:** This reverses force and useful power.

**Feedback D:** At 4 m/s useful power would be 480 W, beyond the input limit.

**Independent solution:** P_useful=0.75×400=300 W; v=300/120=2.5 m/s.

#### OW-GD-M12-Q5

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A plan assumes braking magnitude at least 2 m/s². A later check measures 1.5 m/s² under the same load. What follows?

- **A.** Keep the same stopping bound because the load is unchanged
- **B.** Lower only the acceleration while retaining the approved cruise speed
- **C.** Use the original empty-trial stopping distance for the present load
- **D.** Suspend use of that approval and recalculate or restore the braking performance

**Correct key:** D

**Hint:** Which inequality justified the approved stopping travel?

**Feedback A:** The brake assumption itself has failed.

**Feedback B:** Lower start acceleration does not restore the failed braking bound.

**Feedback C:** A different trial cannot erase the failed braking assumption.

**Feedback D:** The stated operating conditions no longer support the old bound.

**Independent solution:** The old bound used b≥2; measured b=1.5 violates it, increasing v²/(2b) at fixed speed.

#### OW-GD-M12-Q6

**Objective:** Apply or evaluate the mission’s mechanics model in a new case.

**Prompt:** A report says “2 m/s is the fastest listed candidate passing all limits.” Which revision preserves its actual scope?

- **A.** “Use 2 m/s within the documented load and response bounds; other profiles require evaluation.”
- **B.** “No possible design can exceed 2 m/s.”
- **C.** “Any load is safe at 2 m/s.”
- **D.** “A later brake change needs no new check.”

**Correct key:** A

**Hint:** Retain the candidate-list qualification and operating domain.

**Feedback A:** This states the approved setting and its domain without claiming a global optimum.

**Feedback B:** A finite candidate list cannot establish that universal claim.

**Feedback C:** The load range remains part of the evidence.

**Feedback D:** Changing an essential assumption can invalidate the approval.

**Independent solution:** A finite feasible selection establishes only the chosen listed setting under its specified constraints.

## Ending card — exact player copy

The inspector has read all twelve pages. Ruth Bell opens the passenger gate, and her brother Finn takes his tally from the row of forty-one. Ada’s March check stays beside the new cage trace. You showed what it missed: the drum was still, but the cage rose on while the rope changed stretch.

Ewan has crossed out his faster promise. The signed plan allows a 1 m/s² start and a 2 m/s cruise, the fastest listed choice that passed every limit. It covers loads from 1,000 to 4,000 kg and hanging rope from 40 to 1,200 m, with the stated brake and rope response bounds. The last empty wind passed its own check; the wider range rests on the full record.

The mine has a service it can use, but the crew has lost the planned overtime and its pay. Ewan must defend the slower shift sheet when work falls behind. New loads, worn parts or changed brake response still need new evidence. Ruth leaves the plan on the board for the next shift. This time, the check has a place for what the cage does after the drum stops.

**Ending display contract:** Show this single three-paragraph card after Mission 12’s outcome, final RP allocation and existing final gates have succeeded. The passenger gate opens under those same conditions. One Continue returns to free movement; the signed plan and this ending remain readable at the Winder House board. Replace inherited closing copy; add no new graded stop or gate.

# 8. Implementation boundary and handoff

This artifact specifies new content and world decisions; it is not an engine patch. Convert against the actual current importer, preserve all resolved build decisions and verify every rendered phase. Run import, schema, content, world parity, reachable fixtures, lessons, duplicate IDs, format mix, copy length, readability and both full playthroughs. The exact current project commands and version are unavailable, so no command completion or runtime PASS is asserted. The v1.0 ledger, author script, numeric audit and Giant Gate assessment are historical. This v1.2 bible preserves the v1.1 handback and adds the ensemble/depth requirements from Master v3.5, Ledger v1.5 and Gate v2.5. OVERWIND_EXPANSION_CHECK.md and OVERWIND_REVIEW_QUESTIONS.json document the current source checks; regenerate imports and rerun build checks against this version.
