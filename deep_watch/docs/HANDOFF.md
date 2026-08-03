# Deep Watch — Handoff

**Run scope:** spec Phases 1–3 plus core systems, stations, save/settings, a
minimal Boat Walkdown, tests, and docs. Campaign missions (beyond the walkdown)
were intentionally **not** started.

---

## Completed work

### Phase 1 — Repository audit
- Inspected every relevant RECKON / Navy-course source file (10 games + course
  infrastructure) via four parallel audits.
- **`docs/source_inventory.md`** — per-file game type, lesson content, data
  structures, reusable logic, canonical-vs-old, material not carried, and the
  receiving submarine subsystem.
- **`docs/game_to_submarine_mapping.md`** — how each game becomes an in-world
  system, with source files/content cited.
- **`src/content/sourceMappings.js`** — machine-readable translation table.
- Identified the progress model that must not break: earned-only completion via
  the `reckonReport` wrapper; keys `reckon-user`, `reckon-course-progress::<email>`;
  the `nc_flooding_diag` → runtime `nc_flooding` id discrepancy; ship-unlock cadence.

### Phase 2 — Runnable foundation
- Vite + Three.js project (no framework). `npm install / dev / build / preview /
  test` all wired. **`npm run build` succeeds** (38 modules, no errors).
- Start screen → first-person controller (WASD, mouse-look/pointer-lock, crouch,
  head-bob, limited sprint) with custom segment+AABB collision.
- Interaction system (raycast prompts, E to interact) for hatches, stations,
  lockers, deck plates, instrument pickups.
- `SaveManager` (namespaced `deepwatch.progress.v1`, never touches RECKON keys) and
  `SettingsManager` (`deepwatch.settings.v1`, graphics/audio/controls) — both persist.

### Phase 3 — Persistent submarine shell
- One boat, **10 furnished connected compartments** (forward equipment, sonar
  electronics, sonar room, control room, radio, berthing/mess/medical, machinery
  control, propulsion, electrical, auxiliary/bilge), bulkheads with **operable
  hatches**, overhead pipe/cable runs, compartment signs, DC lockers, escape
  trunks, deck-plate bilge access.
- Compartments are recognizably furnished (racks, consoles, machinery housings,
  switchboards, bunks, valve manifolds) — not empty labeled boxes.

### Extra systems delivered this run
- **Central simulation** `SubmarineState` with the full spec field list and coupled
  `integrate()` (flooding→trim, machinery/pumps→self-noise, nav uncertainty growth,
  low-speed→reduced control authority).
- **Recognizable live stations**: Sonar (scrolling waterfall + narrowband tonals
  from the real `freqMap` + BTR + contact list), Navigation table (estimated track,
  uncertainty ellipse, last trusted fix, set/drift, **source-dependency view** +
  independent-fix reset), Ship Control (helm/depth/course/trim), Machinery Control
  (buses/propulsion/cooling/pumps), Electrical Switchboard (order-enforced
  restoration), Radio (EMCON exposure tradeoff).
- **Six handheld instruments** (flashlight, multimeter, vibration meter, acoustic
  probe, gas detector, IR thermometer + thermal camera) that report **evidence, not
  answers**, from `SubmarineState`; a first-person viewmodel; the flashlight is a
  real spotlight.
- **Evidence notebook** (records instrument measurements with compartment/time).
- **Lighting states** (normal/dim/red/emergency/blackout + flicker) tied to state.
- **Procedural audio** bed (ventilation hum, shaft tone tracking rpm, seawater flow).
- **HUD** (objective, compartment, boat status, in-hand tool, interaction prompt,
  transient lesson cards), pause/settings menu, mode state machine.
- **Data-driven mission framework** (`MissionRuntime` + registry) and the minimal
  **Boat Walkdown** (8 stages, bow-to-stern-and-back, lockers + a station).

---

## Commands run
```bash
git checkout -b deep-watch-integration
mkdir -p deep_watch/... (scaffold)
cd deep_watch && npm install            # ok (2 npm-audit advisories in dev deps)
npm run build                           # ✓ 38 modules, 549 kB (Three.js), no errors
npx playwright install chromium
npx playwright test                     # see docs/test_report.md
```

---

## Known problems / limitations
- **Playwright browser**: Playwright's bundled Chromium (build 1234) stalled
  mid-download on this network, so the config uses the **system Google Chrome**
  (`channel: 'chrome'`) — `npm test` runs 11/11 green with no large download. If you
  prefer the bundled browser, run `npx playwright install chromium` from inside
  `deep_watch/` and drop the `channel` from `playwright.config.js`. See
  `docs/test_report.md`.
- **Pointer lock in headless tests**: headless Chromium does not reliably grant
  pointer lock, so movement/pause are exercised through the `window.__DEEPWATCH__`
  controller API rather than a real lock. Interactive play in a real browser uses
  true pointer lock.
- **Bundle size**: one 549 kB chunk (mostly Three.js). Fine for a local Mac target;
  code-split later if hosting.
- **Stations are recognizable but not yet fully operable end-to-end** — they display
  live state and support the interactions their missions need, but the full
  casualty procedures (patch/dewater/suppress) arrive with Missions 4–5.
- **Crew NPCs, richer per-compartment audio evidence, smoke/particles, and the
  submarine map overlay** are stubbed or minimal this run.
- Multi-deck ladders are present as props but the world is currently single-deck;
  vertical traversal is a later addition.

---

## Exact next implementation tasks (in order)
1. **Phase 4 finish** — flesh the instrument framework: calibration/startup
   animations, save-measurement affordance, ambiguity/failure modes; add portable
   pump, pipe clamp, patch, breathing gear as *carriable* DC items.
2. **Phase 5 — core simulations**: implement `FloodingSystem`, `ElectricalSystem`,
   `AtmosphereSystem`, `NavigationSystem`, `SonarSystem`, `AcousticSignatureSystem`
   as modules that mutate `SubmarineState` each fixed step (the couplings are
   already sketched in `integrate()`; move them into dedicated systems).
3. **Phase 6 — Mission 4 Forward Flooding** end-to-end using `nc_flooding_diag`:
   symptom in sonar → acoustic-probe trace → deck-plate discovery → pump-vs-inflow
   estimate → isolate/patch/dewater → verify in control + sonar + bilge. This is the
   full-loop proof; test it before proceeding.
4. **Phase 7 — vertical slice**: Mission 2 (Contact in the Noise) and Mission 3
   (Position Without a Trusted Fix) to prove Sonar Spy, Dead Reckoning, and Casebook
   are transformed into in-world interactions.
5. **Crew system** (`CrewManager`/`CrewMember`/`CrewBehaviors`): station-manned
   NPCs, casualty-state movement, reports through internal comms.
6. **Submarine map overlay** (`ui/SubmarineMap.js`) + campaign screen (side cutaway,
   compartments illuminate as qualified) — must not reveal undiscovered faults.
7. **Phase 8+** — remaining missions, three command episodes, refit (Science Tank),
   content-migration review against the old HTML, then polish/perf/tests.

## Where things live
- Add a mission: `src/missions/definitions/` + register in `MissionManager.js`.
- Add an instrument: `DEFS` in `src/instruments/InstrumentManager.js` + a world pickup.
- Boat layout: `LAYOUT` in `src/world/SubmarineWorld.js`.
- Couplings: `SubmarineState.integrate()` and `Game._easeControls()`.
- Debug handle for tests: `window.__DEEPWATCH__`.
