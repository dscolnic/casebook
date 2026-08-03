# Deep Watch — Source Inventory

Audit of the existing RECKON / Navy-course files that Deep Watch draws from. For
each source: game type, lesson content, key data structures, reusable logic,
material **not** carried forward, and the submarine subsystem/mission that
receives the content.

> Method: every relevant HTML/JS/JSON/MD file was inspected. The `navy_course_package/`
> JSON packs are the **authoring source of truth**; the shipped game HTML files
> embed copies of that content inline (`NC_GAMES` / `NC_PUZZLES` arrays).

---

## Course infrastructure (canonical wiring)

| File | Role |
|---|---|
| `reckon_course.js` | **Canonical progression engine** (`window.ReckonCourse`). Per-user, offline. |
| `navy_course.html` (root) | Live "voyage chart" course view — 30 stops (15 topic weeks + module chapters + 3 Battleship milestones). Uses `LESSONS[]`. |
| `navy_course_list.html` | List view of the same 30 stops. |
| `reckon-results.js` | Provides `window.reckonStart` / `window.reckonReport`; posts to `/api/results` when signed in, else no-ops. |
| `navy_course_package/navy_course.html` + `navy_course_mapping.*` | **Legacy** 15-week syllabus; manual "Mark complete"; key `reckon_navy_course_done_v1`. Superseded. |
| `navy_course_package/navy_course_puzzles.json` | Master puzzle registry, keyed by game name. |
| `navy_course_package/nc_*_puzzles.json` | Per-game content packs (the material to preserve). |
| `sw.js` | Self-retiring service worker (kills old caches; app is online-first). |
| `manifest.webmanifest` | Belongs to **Casebook**, not the course. |

### Progress / completion model (critical — must not be broken)
- Storage keys: **`reckon-user`** → `{name,email}`; **`reckon-course-progress::<email>`** (or `::guest`) → `{done:{nc_id:ts}, battleship:{easy,normal,hard}, seenUnlockCount}`.
- **Earned-only completion**: `reckon_course.js` wraps `window.reckonReport`; on `{won:true, gameId}` it calls `markSolved(gameId)` if `gameId` is in the `LESSON_SET` allow-list (`WEEK_NC` ∪ `MODULE_NC`). Games can only be completed by *winning*, never by a click.
- Some games instead call `window.ReckonCourse.markSolved("nc_dr_1")` directly (Dead Reckoning, Strait Support) or `markBattleship(level)` (Battleship).
- Deep-links: single-puzzle games use `#nc_id`; module games use `?chapter=`/`?level=` plus `&return=`.
- **ID discrepancy to preserve**: the flooding puzzle's Diagnosis pack id is `nc_flooding_diag`, but its runtime completion id is **`nc_flooding`**.
- Ship-unlock system: `unlockedCount = min(10, 2 + floor(completedLessons/3))` — one hull per 3 graded lessons; feeds Battleship via `?ships=`.

**Deep Watch guarantee**: progress lives under **new** namespaced keys (`deepwatch.progress.v1`, `deepwatch.settings.v1`). Deep Watch never writes `reckon*` or `reckon_navy_course_done_v1`. `SaveManager.probeLegacyReckon()` can *read-only* detect legacy keys for an optional acknowledgement.

---

## The ten source games

### 1. Sequence — `sequence.html` (canonical) · `sequence_prototype.html` (old)
- **Type / skill**: two-level ordering puzzle → **causal / sequential dependency reasoning** (put process steps in the one order where each enables the next).
- **Data**: `nc_sequence_puzzles.json` = array of puzzles; each `{ id, chapters:[{id, cards:[[cardId,text],…]}], chapterOrder:[…], terms, principles, hints, segues }`. Cards are `[id,text]` tuples; correctness = exact position of both cards and chapters.
- **Reusable logic**: `checkAnswer()` locks any card/chapter in its correct slot; 3-check limit; win = all locked. `reckonReport({game:'Sequence', gameId, won})`.
- **Content (4)**: `nc_sonar_path` (machinery noise → sonar track), `nc_radar_echo` (pulse → track), `nc_gas_turbine_drive` (intake air → propeller thrust), `nc_layered_defense` (search → engage → assess).
- **Not carried**: drag-and-drop card UI, hero SVG scenes.
- **Receiving subsystem**: **Physical system tracing** — walk/inspect the sonar chain (Mission 2), propulsion chain, and electrical-restoration order (`ElectricalSwitchboard` enforces source→bus→load).

### 2. Ballpark — `ballpark.html`
- **Type / skill**: estimation builder → **order-of-magnitude reasoning** (assemble the right factors + units).
- **Data**: `nc_ballpark_puzzles.json` = array; each `{ id, eqs:[{ id, q, unit, factors:[{label,value,display,source}], ops, answer, explain }], terms }`. Exact tile-value matching (`same()`); 3 rounds; score `Σ(4−round)`/12, win ≥ 8.
- **Content (4)**: `nc_bp_sonar` (wavelength, travel time, echo depth, spreading loss), `nc_bp_navigation` (DR advance, set/drift cross-track, current correction), `nc_bp_depth` (pressure/buoyancy, flooded-mass ≈ tonnes), `nc_bp_radar` (radar horizon, echo range, pulse resolution).
- **Not carried**: factor-card drag interface.
- **Receiving subsystem**: **Operational estimation stations** — nav grease board, engineering calculator, DC plotting board (e.g. "can the pump keep up with flooding?", "how far could we drift before the next fix?"). Values reused in `nc_bp_depth`/`nc_bp_navigation`.

### 3. Protocol — `protocol.html`
- **Type / skill**: stage→tool matching over a timeline → **constraint-based selection / evidence fusion** (pick the system supplying the needed observable; reject decoys).
- **Data**: `nc_protocol_puzzles.json` = array; each `{ id, mission, briefing, events:[{title,text,answer,why}], cards:[{id,name,spec}] }` (cards include decoys). `submit()` = id-equality per step; 3 attempts.
- **localStorage**: `reckon-protocol:{id}:v2`, `reckon-protocol-seen-how` (the only game with its own persistence).
- **Content (4)**: `nc_contact_protocol` (ID an uncorrelated contact), `nc_fire_protocol` (motor-controller-room fire), `nc_power_restore` (restore a split electrical plant), `nc_unrep_protocol` (underway replenishment).
- **Not carried**: action-card UI.
- **Receiving subsystem**: **Physical procedures & tool use** — equipment-locker selection + order-sensitive actions for fire (Mission 5), flooding (Mission 4), power restoration. Decoys survive as plausible physical choices that fail through system behavior.

### 4. Diagnosis — `diagnosis.html` (canonical engine) + `dpack_*.js` sources + `build_diagnosis.js` (pack injector)
- **Type / skill**: instrument-panel deduction → **use every gauge, eliminate inconsistent faults, find one coherent explanation** (including the *calm* readings).
- **Data**: a PACK = `{ salient:[…], readings:{id:{name,pin,zone}}, hypotheses:{id:{label,call,sig:{readingId:state}}}, dismissal, reassuring, rounds:[{answer,alarm,vals,reasons,resolve}] }`. `sig` is the predicted signature over **every** reading; `difficulty()` classifies L1–L4 by how separable the answer is.
- **Flooding pack** `nc_flooding_diag` ("The Water Keeps Rising", runtime id **`nc_flooding`**) in `navy_course_package/diagnosis/nc_flooding_playable.html`: 10 readings (`level, salinity, firemain, cooling, isolation, list, ballast, pump, redundant, adjacent`), 7 hypotheses (`hull, firemain, cooling, ballastx, sensor, pumpfail, normal`), 3 escalating rounds. Richer schema: `vals:{observed,reference}`, per-round `logic:[obs,conclusion]`, `intro.cards`. Key teaching: trace water across boundaries; reject sensor-fault overreaction and the `normal` do-nothing trap.
- **Not carried**: standalone gauge panel (evidence must be *distributed* across compartments); the string-vs-object `vals` renderer mismatch in the playable file.
- **Receiving subsystem**: **Distributed casualty investigation** — Mission 4 (Forward Flooding) reuses this fault model with readings spread across control/engineering/affected compartment + handheld measurements.

### 5. Casebook — `casebook.html` (server/daily) · `casebook_static.html` (offline twin)
- **Type / skill**: three-informant WHO/WHERE/WHAT deduction → **independent corroboration vs shared-dependency / common-mode error** (agreeing channels that share one bad source are not corroboration).
- **Data**: pack (`schemaVersion:3`) = `{ CATS:{who/where/what:{truth, items:[{id,label}]}}, READING_ORDER, CHARACTERS, TOPICS:{id:{q:[{o:[{t,v,fb}], clue}]}}, endings:{overclaimWhat, dismissalWhat} }`. Only `v:'expert'` options file a clue.
- **Content (1)**: `nc_greywake_case` ("The Greywake Shoal") — a chart+radar overlay agree because both ride one biased gyro; truth = wrong gyro correction with independent fixes waived. Rejects GPS-spoof overclaim and blame-the-current dismissal. Anchored by Anschütz (gyrocompass common-mode), Sumner (line of position), Maury (current budget).
- **Not carried**: informant "cards" framing; server/auth/daily gating.
- **Receiving subsystem**: **Independent-evidence & common-mode** — the `NavigationTable` **source-dependency view** (two displays on one Inertial Nav) and evidence-independence checks in Missions 3 & 6.

### 6. Sonar Spy — `silent_watch_hunt_mvp.html`
- **Type / skill**: passive-sonar inference → **detect → classify from incomplete signature → use bearing history → maneuver for geometry**.
- **Data**: `createContact(id,type,x,y,heading,speed,color,hostile)`; `freqMap` = per-type harmonic arrays — **Submarine [46,92,138,185], Merchant [20,41,82,123,164], Fishing [28,57,79,109,149], Biologics [12,31,52]**. `bearingTo(a,b)`; tracks `{bearing, uncertainty, classification, solution, rangeKnown}`. `getGeometryInfo()` scores broadside geometry (`|sin(relative)|`). Levels `nc_sonar_spy_1/2/3` via `?level=`.
- **Not carried**: arcade waterfall + torpedo fire loop (offensive weapons employment is out of scope).
- **Receiving subsystem**: **Full sonar watch** — the `SonarConsole` (broadband waterfall, narrowband tonals from `freqMap`, bearing-time history, contact list w/ confidence, own-ship noise reference). Missions 2 & 7 + command episodes.

### 7. Dead Reckoning — `dead_reckoning_three_chapter_course_edition.html`
- **Type / skill**: estimate true position from an unreliable DR estimate under current/denial/spoofing → **set & drift, imperfect fixes, precision vs accuracy, stealth of information**.
- **Data**: mission `{ start, dest, currents:{"r,c":{dx,dy}}, tools, gps:{mode:"spoofed",offset}, maxEmissions }`; runtime `st.e` (estimate), `st.t` (true, hidden), `st.u` (uncertainty scalar), `conf()` labels. `fuse()`/`exactFix()` reset `u` on a good fix; `finish()` stars reward silent runs. Chapters `nc_dr_1/2/3`.
- **Not carried**: abstract 7×7 grid; true position is **never** shown.
- **Receiving subsystem**: **Navigation table** — the `NavigationTable` (estimated track, growing uncertainty ellipse, last trusted fix, set/drift, contour compare, independent-fix control that resets `u`). Mission 3 + command episodes.

### 8. Strait Support — `strait_support_navy_course_relationship_v8.html`
- **Type / skill**: place assets so coverage overlaps into a connected network → **spatial relational planning; multiple valid configurations**.
- **Data**: `levels[]` with `terrain[]`, `pieces[{id,solution,coverage:{type,range,dir}}]`; coverage types `square/diamond/adjacent8/los/cone`. `coverageCells()`, `overlapOnRoute(a,b)` evaluate connectivity. `STORAGE_KEY="straitSupportRelationshipV8"`; chapters `nc_strait_1/2/3`.
- **Not carried**: the board-game grid appearance.
- **Receiving subsystem**: **Tactical & casualty-network planning** — DC resource network (repair teams, boundary monitors, pumps with power+discharge path) and tactical-picture integration. Mission 9 + command episodes. (Reasoning captured now via `EngineeringPanel` dependencies; full planner is a later run.)

### 9. SensorShip / Battleship — `battleship.html` (+ `reckon_course.js` unlocks)
- **Type / skill**: hidden-information reasoning under **active-vs-passive sensing** (ping reveals you; listening is safe but limited).
- **Data**: `LIB[]` ship defs `{key,length,activeRange,passiveRange,mobility}`; detection Sets (`playerDetected/Exposed`, …); `resolveSensors()`; probability-density AI (`densityShot`). Reads unlocked ships from `?ships=`; wins call `ReckonCourse.markBattleship(diff)`.
- **Not carried**: the Battleship grid and offensive weapons procedures.
- **Receiving subsystem**: **Recurring command episodes** (Silent Passage, Compound Casualty, Deep Watch) — passive sensing, exposure-vs-information tradeoffs in the control room; `RadioConsole` EMCON models the exposure cost.

### 10. Science Tank — `sciencetank.html` (+ `nc_sciencetank_*` packs)
- **Type / skill**: allocate capital across concealed ideas before returns are revealed → **judgment under uncertainty; return vs cost**.
- **Data**: rounds `{ ideas:[{ concealedTitle, knownAdvantages, knownRisks, reveal:{returnMultiplier,impactTier}, researchPackage:{costMillions} }], calibrationTarget:{ideaWeights} }`. `computeResult()`, `benchmarkFactor()` (hindsight-ideal), `computeCalibration()`. Set `nc_naval_innovation`; `STORAGE_KEY='futurePortfolioSaveV11'`.
- **Content (3 rounds)**: Fleet radio 1908 (spark wireless ×2.8), Fire control 1940 (radar ×2.65), Navigation 1960 (Transit satellite ×2.45 / LORAN-C / inertial). Return multipliers are pedagogical proxies.
- **Not carried**: literal historical-company framing (submarine upgrades become fictional).
- **Receiving subsystem**: **Refit & improvement decisions** — Mission 10 wardroom scene: choose upgrades (vibration isolation, quieter pump, extra atmosphere sensors, redundant nav cross-check, better sonar processing) with cost / install time / uncertain benefit.

---

## Canonical-vs-old quick reference
- **Sequence**: `sequence.html` canonical; `sequence_prototype.html` old (different engine).
- **Diagnosis**: `diagnosis.html` canonical engine; `dpack_*.js` = editable pack sources; `build_diagnosis.js` = injector; the `diagnosis_*_prototype.html` / `_logic` / `_map` files are earlier single-theme variants (reference only).
- **Casebook**: `casebook.html` canonical (server); `casebook_static.html` = offline reuse template.
- **Course**: root `navy_course.html` + `reckon_course.js` canonical; `navy_course_package/` = earlier self-contained syllabus.

## Material explicitly NOT carried into Deep Watch
Iframe/tab embedding of old games; arcade UIs (falling blocks, card drag, board grids); standalone quiz panels; the offensive torpedo/weapons loop; server/auth/daily gating; the true-position reveal in navigation; any real classified layout, authentication, or weapons-employment procedure.
