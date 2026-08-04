# Deep Watch — Handoff

**Latest run scope:** **Unit I is complete** — Missions 1, 2, 3 and Command
Episode 1 — on top of the Unit II vertical slice, Mission 4 (Forward Flooding).
Two new simulation systems (`SonarSystem`, `NavigationSystem`) sit under them.
Missions 5–10 and Command Episodes 2–3 are **not** started.

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
npx playwright test                              # ✓ 58/58
```

Pick the watch from the **Watch** dropdown on the start screen: Boat Walkdown,
Contact in the Noise, Position Without a Trusted Fix, Silent Passage, Forward
Flooding. `H` gives a hint and lights the place it is talking about; `K` (or the
pause menu) steps over an objective for practice; `SPACE` dismisses a message;
`G` opens the science behind whatever you are looking at (or the whole index).

---

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

1. **Mission 5 — Electrical Fire.** `ElectricalSwitchboard` already enforces
   restoration order; add `AtmosphereSystem` (smoke, boundaries, reflash) and the
   breathing-gear path. The locker/decoy machinery from Mission 4 transfers directly.
2. **Crew system** (`CrewManager` / `CrewMember` / `CrewBehaviors`): station-manned
   NPCs, casualty-state movement, reports over internal comms. The 7MC handset is
   currently the only crew interface and it is a stub that talks back in toasts.
3. **Submarine map overlay** (`ui/SubmarineMap.js`) + campaign screen (side cutaway,
   compartments illuminate as qualified). Must not reveal undiscovered faults.
4. **Missions 6–10 and Command Episodes 2–3**, then Phase 9 content-migration
   review against the old HTML, then polish/perf/tests.

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
