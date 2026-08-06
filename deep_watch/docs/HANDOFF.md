# Deep Watch — Handoff

**Latest run scope:** **Units I and II are complete** — Missions 1, 2, 3 and
Command Episode 1, plus Missions 4, 5, 6 and Command Episode 2. Five simulation
systems have been added across the two runs (`SonarSystem`, `NavigationSystem`,
`AtmosphereSystem`, `FireSystem`, `CrewTeams`). Missions 7–10 and Command
Episode 3 are **not** started.

**Objective ceiling:** no mission may post more than **ten** objectives, enforced
by a test. An objective is a piece of WORK, not a keystroke — use
`MissionRuntime.checklist()`, which posts one objective covering several actions
and names in the HUD exactly which of them are still outstanding.

**Spec location:** there is no `DEEP_WATCH_MASTER_SPEC.md` in this repository. The
build specification is the Word document at the repo root,
`../Deep Watch Build Specification.docx`. Extract it with:
```bash
python3 -c "import zipfile,re,html;x=zipfile.ZipFile('Deep Watch Build Specification.docx').read('word/document.xml').decode();x=re.sub(r'</w:p>','\n',x);print(html.unescape(re.sub(r'<[^>]+>','',x)))"
```
The "EXAMPLE INTEGRATED MISSION LOGIC" section of that document is the causal
structure Mission 4 implements, step for step. The UNIT I mission list and the
Casebook / Sonar Spy / Dead Reckoning sections are what Missions 2, 3 and Command
Episode 1 implement.

---

## What runs today

```bash
cd deep_watch && npm install && npm run dev      # :5173, opens automatically
npm run build                                    # ✓ 62 modules, ~875 kB
npx playwright test                              # ✓ 85/85
```

Pick the watch from the **Watch** dropdown on the start screen: Boat Walkdown,
Contact in the Noise, Position Without a Trusted Fix, Silent Passage, Forward
Flooding, Electrical Fire, Atmosphere Degradation, Compound Casualty. `H` gives a hint and lights the place it is talking about; `K` (or the
pause menu) steps over an objective for practice; `SPACE` dismisses a message;
`G` opens the science behind whatever you are looking at (or the whole index).

---

## Unit II — the casualty unit

| # | Mission | Objectives | Primary mechanics | The one idea |
|---|---------|-----------|-------------------|--------------|
| 4 | Forward Flooding | 9 | Diagnosis, Protocol, Ballpark, Sequence | Pumping cannot win; the estimate is what tells you to stop the source |
| 5 | Electrical Fire | 8 | Protocol, Diagnosis, equipment selection | An electrical fire is put out by de-energizing it, not by the agent |
| 6 | Atmosphere Degradation | 6 | Diagnosis, Ballpark, evidence independence | An installed sensor is a report; a handheld reading is a measurement |
| E2 | Compound Casualty | 6 | all of the above + delegation | Command is deciding what YOU do and who does the rest |

### Mission 5 — Electrical Fire

`FireSystem` models the three legs of the fire triangle separately, because each is
a different player action: the **ignition source** (an energized fault, removed at
the switchboard), the **fuel** (cable insulation, which is what reflashes), and the
**oxygen** (the compartment atmosphere, which the fire consumes while giving back
CO, smoke and heat). Heat conducts through bulkheads, so boundaries are an IR
reading rather than a checkbox.

Every mistake is physical, never a label: a conductive agent on a live circuit
earths the fault through the stream and trips the breaker with the fire still
burning; smoke without breathing gear makes the compartment unreadable; trusting
the switchboard lamp instead of a meter leaves "isolated" a belief; restoring loads
before the seat is cold puts energy back into the fault. `REFLASH_DELAY_S = 22`.

### Mission 6 — Atmosphere Degradation

`AtmosphereSystem` gives every compartment its own air. People make CO₂ in
proportion to `OCCUPANCY`, the scrubber only reaches compartments whose dampers are
open, neighbours mix through open dampers, and the **installed sensors are a
separate layer from the truth** — one can be frozen or biased while the air is fine,
and vice versa. The mission is a matched pair: berthing is genuinely bad behind a
frozen sensor that reads normal, the radio room is genuinely fine behind a sensor
biased high. Only the handheld separates them, and the cause (a damper left shut)
is upstream of both.

### Command Episode 2 — Compound Casualty

`CrewTeams` makes the other people aboard real: they have trades, they walk at
about nine seconds per compartment, they are slower than the player, and they
report back either way. A team sent outside its trade still makes the trip. A task
can be `blockedBy` another — the flooding is behind the blocked passage — so the
priority order is scored on dependency as well as on life safety. The `CommandBoard`
station holds the two decisions that belong to whoever is in charge: the order, and
who does which. The blocked passage is a real collider (`world.setPassageBlocked`),
so "blocked" means the player genuinely cannot get past.

## Mission 4 — Forward Flooding

The full spec loop, with nothing faked: symptom in sonar → control-room evidence →
instrument retrieval → acoustic trace through compartments → discovery beneath a
deck plate → report → electrical boundary → measurement → diagnosis → rate estimate
→ valve isolation → temporary patch → portable pump → verification in four separate
places → notebook reconstruction → scored debrief. 19 stages.

`docs/mission_design.md` has the full stage table, the source-game mapping, the
mistake/recovery table, and the scoring weights. The essentials:

- **The numbers are chosen so pumping cannot win.** ≈48 m³/h in at 60 m; 11 m² bilge
  plan area (≈7 cm/min); 45 m³/h of pumping available. The estimate is what tells the
  player to stop the source, and the estimate is arithmetic they do themselves.
- **A stage only completes because a physical fact became true** in `SubmarineState`
  — a level fell, both valves are shut, the noise floor dropped, a reading exists.
  Keep this rule for the remaining missions; it is what stops them becoming quizzes.
- **Mistakes answer through the system, never a red label.** Patch before isolating
  and it blows off in ~14 s. Shut the wrong valve and you lose sonar cooling for
  nothing. Leave the power panel energized and 45 cm of water grounds it out, taking
  the installed pump with it. Leave pumps running and sonar cannot pass verification.
  All recoverable; hard failure is not used.

### The science codex (this run)

Every object, screen and console in the boat now carries an explanation of the
physics behind it, reachable with **G** without leaving the game.

- **`src/content/scienceNotes.js`** is the single content file. One entry per thing,
  each answering the same five questions in the same order: `oneLine`, `how` (the
  actual mechanism), `numbers` (every quantity on its face and what the value
  means), optional `math` (the relationship with every term named), `read` (how to
  interpret a change), `trap` (the misreading that costs people boats). Figures are
  imported from the simulation (`BILGE_AREA`, `PANEL_THREAT_CM`, `TOTAL_NM`, …) so
  an explanation cannot drift away from the model it describes.
- **`resolveScienceKey(type, id)`** is the only place that knows how world objects
  map onto entries. Per-valve entries are generated from `VALVES`, so a valve added
  to the simulation gets an explanation automatically, with its own dependants in it.
- **`src/ui/ScienceCodex.js`** renders entries, keeps a back stack, and offers a
  browsable index grouped by kind. Any element anywhere may open it with
  `data-science="<key>"` — that is how the station header button, the console
  captions and the qualification card all reach it with no per-caller wiring.
- **Wall panels are interactable.** `WallDisplays.interactableRecords()` returns one
  record per panel (`type: 'display'`), so pressing **E** on any screen opens what it
  is showing and why. Panels still cannot be operated; you man a station for that.
- **The world freezes while the codex is open** (mode `'science'` is not stepped in
  `_fixedUpdate`). Reading about the sounding tape must not cost you a compartment.
- **The qualification card was rebuilt around this.** 46 questions, all with a
  `science` key: instrument and sensor physics first (decibels as ratios, rise × area,
  Torricelli, discharge coefficient, priming and cavitation, emissivity, I²R, blade
  rate, delay-and-sum beamforming, spreading loss), then the mission-level reasoning
  questions. A wrong answer offers the codex entry behind it.

**The explanations and the screens are checked against each other, both ways.**
Every `numbers` row in a display entry carries a third element: the on-screen text
it refers to (or the literal `'graphic'` for a feature of the image, like the slope
of a waterfall streak, which has no text to match). `tests/science-codex.spec.js`
records every `fillText` a panel draws and asserts:

- forward — every number an entry explains is actually drawn on that panel;
- reverse — every quantity drawn with a unit is accounted for in the entry;
- instruments — every instrument's read-out unit appears in its own entry.

That audit found and fixed real drift: the ship-control entry explained a
self-noise figure that lives on the HUD and not on that panel; the pressure gauge
reads **psi** while its entry talked in bar; the plan of the day explained a patrol
day and hours-awake it never showed (now it does); distribution explained load
current and a ground lamp it never drew (now it does); auxiliary explained a
dewatering capacity that was only in the manual (now on the panel, where you need
it to subtract inflow from).

**Panel placement is now decided by line of sight.** `_placeBest` scores every
candidate — both side walls, both transverse bulkheads, three heights, three
widths — by casting sight lines from where a player actually stands to the panel's
centre and corners against the real geometry. Several panels used to end up behind
a pipe run at exactly panel height (sonar electronics, radio, electrical), which is
why screens were "covered and only partially seen". All eleven now score 1.0, and
`visibilityReport()` plus a test keep it that way. The sonar-electronics compartment
— 4 m long with four cabinets and a full-length cooling run — had its cabinets moved
forward and its run shortened to leave a display bay.

**A latent loop bug fell out of that work and is fixed.** `GameLoop.start()` stamps
`_last` with `performance.now()`, but the first rAF callback carries the timestamp
of the frame already in flight — i.e. from BEFORE the synchronous world build. The
delta is negative, and the accumulator wore it as debt: with the heavier placement
search the simulation sat frozen for ~1.3 s after every start, which failed three
flooding tests. `_tick` now clamps dt at both ends, and the placement search was
made cheap (per-compartment occluder filtering, small props dropped: 0.4 ms, 230
boxes). Both fixes matter — the clamp is correct regardless of how fast the build is.

**Getting a sonar call wrong now tells you what to do about it.** A classification
can fail in three separate ways and they need different actions, so
`SonarConsole._callHelp()` names which one happened, restates what the displays
actually say, and gives numbered next steps — and it escalates, because repeating
the same sentence to somebody who has missed twice is not help:

| miss | what the player gets |
|------|----------------------|
| 1st | the failure named (wrong class / one chain cited twice / nothing cited) and the next action |
| 2nd | the decision rule as a table — which evidence maps to which class |
| 3rd | the call worked through to the answer, with the one observation that decides it |

Nothing is failed or locked; the call can be logged again the moment it is right,
and a correct call clears the escalation. The correction is also written into the
guide strip at the top of the console immediately, not on the next slow rebuild.

Adding anything to the boat now has a matching obligation: `tests/science-codex.spec.js`
walks every interactable and fails if it has no entry.

### Unit I (this run)

- **`simulation/SonarSystem.js`** — contacts that exist independently of the player:
  source level, spreading loss, and a detection threshold set by the boat's own
  noise. Harmonic families from Sonar Spy's `freqMap` are the classification
  evidence, and `tonalQuality()` decides whether a signature can carry a name at
  all. Displays are tagged with a PROCESSING CHAIN, so `classify()` can report that
  two cited displays were one measurement shown twice.
- **`simulation/NavigationSystem.js`** — true position advanced by course, speed AND
  the water; the estimate advanced by course and speed alone. Fix sources are tagged
  with what they depend on: the inertial ones shrink the ring without moving the
  plot, the fathometer actually corrects it. Bathymetry with a bank and a pinnacle
  on its eastern shoulder, so a lateral position error becomes lost water.
- **`stations/SonarConsole.js`** rebuilt around four faces with chain tags,
  designation, bearing-time history and a classification panel that requires the
  player to say what the call rests on.
- **`stations/NavigationTable.js`** rebuilt with Plot / Dead reckoning / Fix sources
  / Route faces and a chart that draws the bank to scale.
- Missions `mission_02_contact`, `mission_03_navigation`, `episode_01_silent_passage`.

### Mission 4 code (previous run)
```
simulation/FloodingSystem.js     inflow vs depth, bilge geometry, pump prime,
                                 progressive flooding, water mass, flow noise,
                                 panel threat, cooling dependency, the 7-fault set
simulation/DamageControl.js      player DC actions → simulation + consequences
world/BilgeVisuals.js            recess, water surface, overflow sheet, jet, splash,
                                 suction hose
stations/DamageControlBoard.js   Estimate / Diagnosis / System-boundaries faces
stations/EquipmentLockerPanel.js locker contents and the choice of what to carry
missions/definitions/mission_04_flooding.js
ui/Debrief.js                    score breakdown + reconstructed evidence chain
tests/mission-flooding.spec.js   8 tests incl. the full 19-stage playthrough
```

### Changed code worth knowing about
- **`SubmarineState.integrate()` now owns control easing.** `Game._easeControls()`
  is gone. Every coupling is testable from a bare `new SubmarineState()`.
- **The deck has holes in it.** `SubmarineWorld` builds the deck (and the per-
  compartment accent matting) by rect-subtracting `DECK_OPENINGS`. If you add a
  compartment accent or a floor overlay, cut it the same way or it will lie over the
  bilge opening — this exact bug cost an hour this run.
- **`InteractionSystem` prompts may be functions**, re-evaluated per frame, so a
  valve reads "Open"/"Shut" correctly.
- **Physics runs while a station or the notebook is open.** Only a real pause freezes
  the boat. A casualty should not wait for you to finish reading a gauge.
- `EquipmentInventory` now carries gear as well as instruments and can `consume()`.
- `Notebook` has four faces (evidence / hypotheses / source dependencies / report)
  and entries carry a `tag` that stations query.

### Test hooks (`window.__DEEPWATCH__`)
`goTo(compartmentId)`, `interact(interactableId)`, `advance(seconds)` (runs the real
30 Hz step, just faster), plus `flooding`, `dc`, `instruments`, `notebook`,
`stations`, `missions`, `world`, `displays`, `hintBeacon`, `sonar`, `nav`, `compartments`.

---

## Earlier runs (still true)

### Phase 1 — repository audit
`docs/source_inventory.md`, `docs/game_to_submarine_mapping.md`, and
`src/content/sourceMappings.js`. The progress model that must not break: earned-only
completion via the `reckonReport` wrapper; keys `reckon-user`,
`reckon-course-progress::<email>`; the `nc_flooding_diag` → runtime `nc_flooding` id
discrepancy; ship-unlock cadence. Deep Watch writes only `deepwatch.*`.

### Phase 2 — runnable foundation
Vite + Three.js, no framework. Start screen → first-person controller (WASD,
pointer-lock, crouch, head-bob) with segment+AABB collision. Interaction system.
`SaveManager` / `SettingsManager`, both persisting.

### Phase 3 — persistent submarine shell
Ten furnished connected compartments, operable hatches, overhead pipe/cable runs,
signs, DC lockers, escape trunks, bilge access.

### Systems
Central `SubmarineState`; live stations (sonar waterfall + narrowband + BTR +
bearing history, navigation table with the source-dependency view, ship control,
machinery control, switchboard, radio); handheld instruments; lighting states;
procedural audio; HUD; the data-driven mission framework and the Boat Walkdown.

---

## Known problems / limitations
- **Playwright browser**: the config uses the **system Google Chrome**
  (`channel: 'chrome'`) because Playwright's bundled Chromium stalled mid-download on
  this network. `npx playwright test` runs 19/19 with no large download.
- **Pointer lock in headless** is unreliable, so tests move the player with `goTo()`
  and drive the controller API. Interactive play uses a real lock.
- **Bundle size**: one 643 kB chunk, mostly Three.js. Fine locally; code-split if hosted.
- **Missions 5–10 and Command Episodes 2–3 are unbuilt**, so there is still no
  full campaign-progression test.
- **Atmosphere is still a sketch** inside `integrate()`; it has not been pulled out
  into an `AtmosphereSystem` the way flooding, sonar and navigation now have modules.
- **The episode's continuous scoring runs on a real-time interval**, so a test that
  fast-forwards with `advance()` skips those samples. Interactive play is unaffected;
  a future version should drive the accumulators from the fixed step instead.
- **Crew NPCs, smoke/particles, and the submarine map overlay** are still absent.
- Multi-deck ladders are props; the world is single-deck.
- **Vite root is pinned** to the config file's directory so a cwd containing `#`/`?`
  cannot break root detection.

---

## Exact next implementation tasks (in order)

1. **Unit III (Missions 7–10) and Command Episode 3.** The systems are now in
   place for most of it: `FireSystem`, `AtmosphereSystem` and `CrewTeams` are
   general, not mission-specific.
2. **Visible crew** — `CrewTeams` gives teams state, travel time and reports, but
   nobody is rendered. Bodies moving through the boat would make delegation legible
   at a glance instead of only on the board.
3. **Submarine map overlay** (`ui/SubmarineMap.js`) + campaign screen (side cutaway,
   compartments illuminate as qualified). Must not reveal undiscovered faults.
4. **A smoke veil.** `state.smokeImpairment` is computed by `FireControl` and drives
   nothing visual yet; the fatigue veil is the model to follow.

## Where things live
- Add a mission: `src/missions/definitions/` + register in `MissionManager.js`.
- Add an instrument: `DEFS` in `src/instruments/InstrumentManager.js`, plus a world
  pickup or a locker entry in `stations/EquipmentLockerPanel.js`. **Also add a
  science entry** — `src/content/scienceNotes.js` — or the coverage test fails.
- Explain something: `src/content/scienceNotes.js`; open it from anywhere with
  `data-science="<key>"` on any element.
- Add a qualification question: `src/content/qualQuestions.js`, with a `science` key.
- Boat layout: `LAYOUT` in `src/world/SubmarineWorld.js`; deck holes: `DECK_OPENINGS`.
- Couplings: `SubmarineState.integrate()` and the per-system modules in `simulation/`.
- Debug handle for tests: `window.__DEEPWATCH__`.
