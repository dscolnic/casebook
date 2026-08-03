# Deep Watch — Game → Submarine Mapping

How each RECKON reasoning game becomes an **in-world submarine system**. The
original games are invisible reasoning engines: no iframes, no arcade UI, no
"Play Sequence" menu. Each row records the source files/content used, the
reasoning objective that must survive, and the physical submarine interaction
that carries it.

Normalized content schema (used by `src/content/sourceMappings.js`):
```js
{ sourceFile, sourceId, originalGameType, reasoningSkill, convertedSystem,
  convertedMission, convertedInteraction }
```

---

## 1. Sequence → Physical System Tracing
- **Source**: `sequence.html`; `navy_course_package/nc_sequence_puzzles.json` (`nc_sonar_path`, `nc_radar_echo`, `nc_gas_turbine_drive`, `nc_layered_defense`).
- **Reasoning to preserve**: causal / physical / process order; upstream enables downstream.
- **In-world system**: walking and inspecting a real chain instead of sorting cards.
  - Sonar chain: external sound → array reception → signal conditioning → processing → waterfall → track → classification (walk `sonar_electronics` → `sonar_room`).
  - Propulsion chain: source power → distribution → controller → motor → shaft → propulsor (`electrical` → `machinery_control` → `propulsion`).
  - **Electrical restoration** is order-enforced now: `ElectricalSwitchboard` refuses to close the vital bus before a main bus is energized (downstream-before-upstream fails *visibly*).
- **Missions**: 1 (walkdown traces a cooling path), 4, 7.
- **Status in this build**: electrical-order enforcement live; full guided chain-trace UI is a later run.

## 2. Ballpark → Operational Estimation
- **Source**: `ballpark.html`; `nc_ballpark_puzzles.json` (`nc_bp_sonar/navigation/depth/radar`).
- **Reasoning to preserve**: order-of-magnitude estimates that drive decisions; accept reasonable ranges.
- **In-world system**: physical estimation stations (nav grease board, engineering calculator, DC plotting board) that ask e.g. "can the portable pump keep up with flooding?", "how much water mass explains this trim change?", "how far could we drift before the next fix?".
- **Data reused**: `nc_bp_depth` (1 flooded m³ ≈ 1 tonne; ~1 MPa/100 m), `nc_bp_navigation` (set/drift cross-track), pump capacities live in `SubmarineState.pumpStates`.
- **Missions**: 4, 6, 9, and the final episode.
- **Status**: estimation quantities are wired into `SubmarineState` (pump capacity vs inflow, nav drift); dedicated estimation station UIs land with Missions 4/6.

## 3. Protocol → Physical Procedures & Tool Use
- **Source**: `protocol.html`; `nc_protocol_puzzles.json` (`nc_contact_protocol`, `nc_fire_protocol`, `nc_power_restore`, `nc_unrep_protocol`).
- **Reasoning to preserve**: match the stage to the correct action; identify useful vs decoy tools; order-sensitivity; consequence for premature action.
- **In-world system**: equipment-locker selection + ordered physical procedures. Decoy tools remain physically available and fail through system behavior, not a red "wrong" label.
- **In this build**: DC lockers are physical, openable objects (`interact:locker`) stocked with breathing gear / patch / wedges / portable pump (flavor now, functional in Mission 4/5). Fire response (`nc_fire_protocol`) and power restoration (`nc_power_restore`) map onto the electrical switchboard + suppression flow.
- **Missions**: 4 (flooding), 5 (fire), 9.

## 4. Diagnosis → Distributed Casualty Investigation
- **Source**: `diagnosis.html` engine; `navy_course_package/diagnosis/nc_flooding_playable.html` + `nc_diagnosis_puzzles.json` (`nc_flooding_diag`, runtime id **`nc_flooding`**).
- **Reasoning to preserve**: read *every* gauge; eliminate faults whose signature is inconsistent; one coherent explanation; reject the calm-reading traps.
- **In-world system**: evidence is **distributed** — control room (depth/trim/planes), engineering (pressures/isolation/pump discharge), the affected compartment (bilge level/salinity), and handheld tools (acoustic probe finds the flow beneath a deck plate). No single panel gives the answer.
- **Fault model reused verbatim**: the 7 flooding hypotheses (`hull, firemain, cooling, ballastx, sensor, pumpfail, normal`) and their 10-reading signatures; the sensor-fault vs real-flooding discriminator (salinity + redundant channel agreement).
- **Instruments** already implement evidence-not-answers: `acoustic_probe` reports flow noise near the source, `multimeter`/`ir_thermometer`/`gas_detector` report quantities, never "the pump is broken."
- **Missions**: 4 (Forward Flooding — the canonical full-loop mission), 6, 8.

## 5. Casebook → Independent Evidence & Common-Mode Error
- **Source**: `casebook_static.html`; `nc_casebook_puzzles.json` (`nc_greywake_case`).
- **Reasoning to preserve**: evaluate independent corroboration; spot shared dependencies; resist plausible-but-duplicated evidence.
- **In-world system**: the **source-dependency view** at the navigation table — chart overlay and radar overlay both trace to *Inertial Nav A*; the bottom-contour is the only independent source. Agreement between two displays on one bad source is flagged as *not* corroboration; the independent depth fix genuinely resets uncertainty.
- **Implemented now**: `NavigationTable` renders the dependency tree and the "two displays, one source" warning; taking the independent fix resets `navigationUncertainty` and fires a lesson card.
- **Missions**: 3, 6 (sensor-failure vs real atmosphere degradation), command episodes.

## 6. Spectrum Stack → Rapid Equipment / Modality Selection
- **Source**: `spectrum_stack.html` (modality-selection game).
- **Reasoning to preserve**: map a situation to the right sensing modality; fast categorization under pressure.
- **In-world system**: the equipment locker / carried-tool wheel. Given symptoms (e.g. elevated bearing temperature + rhythmic sound + normal current) the useful next tools are the vibration meter and thermal camera; less-useful tools remain available and merely produce irrelevant readings.
- **Implemented now**: six handheld instruments exist as physical pickups, each returning modality-appropriate evidence from `SubmarineState`; wrong tools cost time / give irrelevant readings rather than auto-failing.
- **Missions**: 5, 7, 8.

## 7. Sonar Spy → Full Sonar Watch
- **Source**: `silent_watch_hunt_mvp.html` — `freqMap`, `bearingTo`, `getGeometryInfo`, classification hints; levels `nc_sonar_spy_1/2/3`.
- **Reasoning to preserve**: detect; classify from incomplete signature; bearing-time history; maneuver for geometry; active-vs-passive.
- **In-world system**: the **Sonar Room** consoles — broadband waterfall (bearing × time), narrowband tonal lines drawn from the exact per-type `freqMap` harmonics, bearing-time history, and a contact list with classification confidence. Own-ship self-noise (from `SubmarineState.sonarNoiseFloor`) masks weak contacts, so a quiet boat hears more.
- **Implemented now**: `SonarConsole` renders a live scrolling waterfall + narrowband + contact list; self-noise floor visibly affects the picture.
- **Missions**: 2 (Contact in the Noise), 7 (Sonar Blinded by the Boat), command episodes.

## 8. Dead Reckoning → Navigation Table
- **Source**: `dead_reckoning_three_chapter_course_edition.html` — estimate `st.e`, uncertainty `st.u`, currents, spoofed GPS, silent-run scoring; `nc_dr_1/2/3`.
- **Reasoning to preserve**: maintain an estimated position; account for set & drift; choose imperfect fixes; precision vs accuracy; the true position is never shown.
- **In-world system**: the **chart table** — estimated (dead-reckoned) track, growing 1σ uncertainty ellipse, last trusted fix, set/drift, bottom-depth comparison, and a costly independent-fix control. True position stays hidden.
- **Implemented now**: `NavigationTable` renders the estimate + uncertainty ellipse (scaled from `navigationUncertainty`, which grows with time/speed in `SubmarineState.integrate`) and the independent-fix reset.
- **Missions**: 3 (Position Without a Trusted Fix), command episodes.

## 9. Strait Support → Tactical & Casualty-Network Planning
- **Source**: `strait_support_navy_course_relationship_v8.html` — `coverageCells`, `overlapOnRoute`, coverage types; `nc_strait_1/2/3`.
- **Reasoning to preserve**: systems relationships; overlapping coverage; connectivity; multiple valid configurations.
- **In-world system**: (a) tactical-picture integration combining sonar tracks + nav constraints + reports; (b) the **damage-control resource network** — assign repair teams, boundary monitors, portable pumps (with power + discharge path), medical route, comms relay. Success depends on relationships (an isolated bus must not disable the only dewatering pump).
- **Implemented now**: dependency reasoning is seeded in `EngineeringPanel` (pumps need power; isolating a bus disables dependent loads). The full spatial planner is a later run.
- **Missions**: 9 (Silent-Running Configuration), Compound Casualty.

## 10. SensorShip / Battleship → Recurring Command Episodes
- **Source**: `battleship.html` + `reckon_course.js` unlock cadence.
- **Reasoning to preserve**: hidden information; active-vs-passive sensing; exposure-vs-information; a recurring mastery milestone.
- **In-world system**: three control-room command episodes (Silent Passage, Compound Casualty, Deep Watch) — passive sensing and safe navigation under uncertain contacts; information may carry a cost. **No Battleship grid; no offensive weapons procedures.**
- **Implemented now**: the exposure cost is modelled by `RadioConsole` (EMCON state, transmit raises exposure) and `SubmarineState.sonarNoiseFloor` (speed/pumps raise signature). Episode scripting is a later run.

## 11. Science Tank → Refit & Improvement Decisions
- **Source**: `sciencetank.html`; `nc_sciencetank_rounds_puzzles.json` / `nc_sciencetank_game_sets.json` (`nc_naval_innovation`).
- **Reasoning to preserve**: evaluate innovations before outcomes are known; judgment under uncertainty; return vs cost.
- **In-world system**: a wardroom / maintenance-planning scene between patrols. Upgrades (improved vibration isolation, quieter cooling pump, enhanced battery monitoring, extra atmosphere sensors, redundant nav cross-check, improved sonar processing, better emergency lighting, extra portable pump, more efficient fan) each carry cost / install time / maintenance burden / uncertain benefit / later-mission effect. Historical-innovation content is contextual background; the actual upgrades are fictional.
- **Missions**: 10 (Refit Decision).

---

## Cross-cutting design rules honored
- **Every measurement affects the mission**: instruments feed the notebook and are wired to eliminate hypotheses / expose dependencies (flooding, atmosphere, self-noise).
- **Instruments are evidence, not answers**: `InstrumentManager` reports quantities + a short observation, never a verdict.
- **Verification is mandatory** (design intent for Missions 4–8): recovery must show in ≥ 2 places (bilge falls *and* trim stabilizes *and* sonar self-noise clears).
- **One persistent boat**: a single `SubmarineWorld` with fixed compartment/locker/escape-route locations the player learns; later missions rely on that spatial memory.
