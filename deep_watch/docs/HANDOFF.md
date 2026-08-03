# Deep Watch — Handoff

**Latest run scope:** one complete, polished vertical slice — **Mission 4, Forward
Flooding** — built on the existing foundation, tested end to end, and documented.
The other campaign missions were deliberately **not** started.

**Spec location:** there is no `DEEP_WATCH_MASTER_SPEC.md` in this repository. The
build specification is the Word document at the repo root,
`../Deep Watch Build Specification.docx`. Extract it with:
```bash
python3 -c "import zipfile,re,html;x=zipfile.ZipFile('Deep Watch Build Specification.docx').read('word/document.xml').decode();x=re.sub(r'</w:p>','\n',x);print(html.unescape(re.sub(r'<[^>]+>','',x)))"
```
The "EXAMPLE INTEGRATED MISSION LOGIC" section of that document is the causal
structure Mission 4 implements, step for step.

---

## What runs today

```bash
cd deep_watch && npm install && npm run dev      # :5173, opens automatically
npm run build                                    # ✓ 45 modules, 643 kB
npx playwright test                              # ✓ 19/19
```

Pick the watch from the **Watch** dropdown on the start screen. It defaults to
**Forward Flooding**; **Boat Walkdown** is the other entry.

---

## Mission 4 — Forward Flooding (this run)

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

### New code this run
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
`stations`, `missions`, `world`, `compartments`.

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
- **Only Missions 1 and 4 exist.** Missions 2, 3, 5–10 and the three command episodes
  are unbuilt, so there is no campaign-progression test.
- **Atmosphere and navigation couplings are still sketches** inside `integrate()`;
  they have not been pulled out into `AtmosphereSystem` / `NavigationSystem` the way
  flooding now has its own module.
- **Crew NPCs, smoke/particles, and the submarine map overlay** are still absent.
- Multi-deck ladders are props; the world is single-deck.
- **Vite root is pinned** to the config file's directory so a cwd containing `#`/`?`
  cannot break root detection.

---

## Exact next implementation tasks (in order)

1. **Mission 2 — Contact in the Noise** and **Mission 3 — Position Without a Trusted
   Fix**, to complete the spec's Phase-7 vertical slice. Mission 4 is the pattern:
   copy its shape (stages that complete on physical facts, hints, `scoreParts`,
   consequences over labels), not its content. Sonar Spy / Dead Reckoning / Casebook
   content is already inventoried, and `SonarConsole` already has the bearing-history
   panel and masking that Mission 2 needs.
2. **Extract `SonarSystem` and `NavigationSystem`** into `src/simulation/` the way
   `FloodingSystem` was extracted, so contacts and position drift are simulated
   rather than drawn. Mission 2/3 will need this.
3. **Mission 5 — Electrical Fire.** `ElectricalSwitchboard` already enforces
   restoration order; add `AtmosphereSystem` (smoke, boundaries, reflash) and the
   breathing-gear path. The locker/decoy machinery from Mission 4 transfers directly.
4. **Crew system** (`CrewManager` / `CrewMember` / `CrewBehaviors`): station-manned
   NPCs, casualty-state movement, reports over internal comms. The 7MC handset is
   currently the only crew interface and it is a stub that talks back in toasts.
5. **Submarine map overlay** (`ui/SubmarineMap.js`) + campaign screen (side cutaway,
   compartments illuminate as qualified). Must not reveal undiscovered faults.
6. **Missions 6–10 and the three command episodes**, then Phase 9 content-migration
   review against the old HTML, then polish/perf/tests.

## Where things live
- Add a mission: `src/missions/definitions/` + register in `MissionManager.js`.
- Add an instrument: `DEFS` in `src/instruments/InstrumentManager.js`, plus a world
  pickup or a locker entry in `stations/EquipmentLockerPanel.js`.
- Boat layout: `LAYOUT` in `src/world/SubmarineWorld.js`; deck holes: `DECK_OPENINGS`.
- Couplings: `SubmarineState.integrate()` and the per-system modules in `simulation/`.
- Debug handle for tests: `window.__DEEPWATCH__`.
