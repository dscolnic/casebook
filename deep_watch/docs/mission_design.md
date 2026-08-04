# Deep Watch — Mission Design

The campaign is **10 missions + 3 command episodes** across three units. This
build implements **Unit I complete** — Mission 1 (Boat Walkdown), Mission 2
(Contact in the Noise), Mission 3 (Position Without a Trusted Fix) and Command
Episode 1 (Silent Passage) — plus **Mission 4 (Forward Flooding)** as the Unit II
vertical slice. Missions 5–10 and Command Episodes 2–3 are specified here as the
design contract for later runs. Every casualty mission follows the same
loop the spec mandates:

> symptom → measurement → interpretation → travel → second measurement →
> intervention → cross-compartment verification.

## Data-driven definition shape
```js
{
  id, title, unit, startLocation, sourceGames: [...], sourceIds: [...],
  learningObjectives: [...],
  onStart(rt),                       // seed the casualty / opening lesson card
  stages: [ { id, label, objective, hints: [...], arm(rt) => cleanupFn } ],
  scoring(rt) => number,             // sets rt.scoreParts for the debrief
}
```
`arm(rt)` wires the triggers that advance the stage and returns a teardown.
Helpers on `rt`: `onEnter(compartmentId)`, `onInteractCount(type,n)`,
`onEvent(name, note, predicate)`, `subscribe(event, fn)` (mission-lifetime),
plus `complete()`, `toast()`, `hint()`, `flags`. `rt` also carries the systems a
mission may touch: `state`, `flooding`, `dc`, `inventory`, `instruments`, `world`,
`notebook`, `compartments`.

**A stage may only complete because a physical fact became true.** No stage in
Mission 4 advances on "the player clicked the right thing" — it advances because
the bilge level fell, both boundary valves are shut, the noise floor dropped, or a
reading was actually taken. That is the rule to keep for the remaining missions.

---

## UNIT I — Qualify on the Boat
- **M1 Boat Walkdown** *(implemented)* — Sequence + spatial memory. Report to
  control, find sonar/engineering/forward, open two DC lockers, man a machinery
  station to read a cooling loop, walk aft, deliver a message back to Control with
  no waypoint. Proves traversal + interaction.
- **M2 Contact in the Noise** *(implemented)* — Sonar Spy + Casebook. Four sources:
  a merchant with a full harmonic family, a biologic chorus with no propulsion
  lines, an own-ship source holding a constant relative bearing, and one contact
  too faint to name. The player must quiet the boat to hear the fourth at all,
  designate tracks, classify what the signature supports, decline what it does not,
  and cite two INDEPENDENT displays — the broadband waterfall, auto-detect list and
  bearing-time record are all one beamformer, so citing two of them is citing one
  measurement twice.
- **M3 Position Without a Trusted Fix** *(implemented)* — Dead Reckoning + Ballpark
  + Casebook. Three and a half hours of DR with an unapplied current. Record the
  datum, work distance run and the current offset, discover that a "fix" from the
  inertial displays shrinks the ring without moving the plot (precision with no
  accuracy), get a real correction from the fathometer, and choose a route whose
  charted least depth survives the position ring. The forecast current the table
  shows is deliberately not the current the sea is using, so applying it helps and
  does not finish the job.
- **Command Episode 1 — Silent Passage** *(implemented)* — cross the constriction
  holding a merchant, keeping the boat quiet, and knowing the position well enough
  to know what is under the keel. Scored continuously: acoustic exposure is
  integrated in dB·seconds above the quiet floor, time without the contact is
  integrated, and the ring, the true error and the least clearance are checked at
  the exit. Speed, pumps, depth, fixes and EMCON all pull against each other; there
  is no single right setting.

## UNIT II — Keep the Boat Alive
- **M4 Forward Flooding** *(implemented — the canonical full-loop mission)* —
  Diagnosis + Ballpark + Protocol + Sequence + Casebook. See the dedicated section
  below.
- **M5 Electrical Fire** — Protocol + Diagnosis + equipment selection. Breathing
  protection, identify the energized zone, isolate + **verify isolation**, correct
  suppression, monitor boundaries, restore essential loads in dependency order
  (the `ElectricalSwitchboard` order rule), check for reflash.
- **M6 Atmosphere Degradation** — Diagnosis + Ballpark + evidence independence.
  Crew symptoms, measure multiple compartments with the gas detector, trace airflow,
  distinguish a sensor failure from real degradation, restore ventilation/scrubbing,
  verify over time.
- **Command Episode 2 — Compound Casualty** — flooding + partial power loss +
  reduced nav confidence + injury + blocked passage. Prioritize and delegate.

## UNIT III — Operate the Complete System
- **M7 Sonar Blinded by the Boat** — Sonar + Diagnosis + Sequence. Correlate sonar
  self-noise with vibration/machinery state (misaligned pump / cavitation / fan
  harmonic / loose mount) using the vibration meter and thermal camera.
- **M8 Uncontrolled Depth Change** — Diagnosis + Ballpark + Protocol. Distinguish
  symptom from cause among water entry / trim transfer / speed loss / stuck valve /
  planes discrepancy / depth-sensor error.
- **M9 Silent-Running Configuration** — Strait Support + equipment + estimation.
  Decide what to secure/reschedule/isolate while preserving cooling, atmosphere,
  navigation, control, sonar, safety.
- **M10 Refit Decision** — Science Tank. Choose upgrades before the final patrol
  with cost / install time / uncertain benefit.
- **Command Episode 3 — Deep Watch** — the integrated finale (uncertain contact,
  degraded nav, small flooding, atmosphere concern, propulsion limit, need for
  acoustic discretion, crew injury, comms decision). Scored on survival, crew
  safety, contact awareness, nav uncertainty, restored systems, evidence quality,
  acoustic exposure, unnecessary actions, verification discipline.

## Scoring philosophy
Recoverable consequences over hard resets: a wrong instrument wastes time, a wrong
valve disables another subsystem, incomplete isolation worsens a casualty. Hard
failure is reserved for unrecoverable loss of the boat. Deadlines only where the
underlying event justifies one — no arbitrary countdowns.


---

## Mission 4 — Forward Flooding (implemented)

`src/missions/definitions/mission_04_flooding.js` · 19 stages · start location
`sonar_room`.

### The fault
A forward seawater-supply branch has failed below the deck plates of the forward
equipment space. At 60 m it passes **≈48 m³/h**; the forward bilge has an **11 m²**
plan area, so it rises about **7 cm/min**. The installed forward bilge pump (25 m³/h,
fed from the forward power panel) plus the portable pump (20 m³/h) total **45 m³/h** —
deliberately *less* than the inflow. Pumping cannot win. The player has to stop the
source, and the estimate is what tells them so.

### Stage chain
| # | Stage | Completes because |
|---|---|---|
| 1 | `sonar_symptom` | N01 classified as an own-ship source (constant *relative* bearing through a 20° course change, no blade rate, no harmonic family) |
| 2 | `control_evidence` | Watch indications logged at Ship Control |
| 3 | `retrieve_probe` | Acoustic probe + sounding tape + salinity probe carried |
| 4 | `trace_acoustic` | ≥3 compartments probed and the maximum is in the forward space |
| 5 | `discover_bilge` | Deck plate lifted; the source becomes `discovered` |
| 6 | `report_flooding` | 7MC report made *after* discovery (Control starts compensating trim) |
| 7 | `secure_panel` | Forward power panel secured — or it flooded and tripped (recoverable, scored) |
| 8 | `measure_water` | Two soundings >0.4 min apart + salinity + manifold pressures |
| 9 | `diagnose` | Correct fault called on the plotting board |
| 10 | `estimate` | Inflow computed two ways; verdict "dewatering cannot hold this" |
| 11 | `boundaries` | Dependent systems acknowledged *before* shutting anything |
| 12 | `isolate` | **Both** supply valves shut (one alone does not satisfy it) |
| 13 | `patch` | Repair holding on a dead line |
| 14 | `dewater` | Portable pump rigged in the sump |
| 15 | `verify_bilge` | A sounding below 12 cm with a negative rate |
| 16 | `restore_cooling` | Cross-connect open and IR thermometer confirms <42 °C in Sonar-Array Electronics |
| 17 | `verify_sonar` | In the sonar room, no flow-noise source and self-noise <50 dB |
| 18 | `verify_control` | In control, trim <0.3° and depth-control effort <32 % |
| 19 | `file_report` | Casualty report filed from the notebook |

### Where the source games went
| Source | Pack id | What it became |
|---|---|---|
| Diagnosis | `nc_flooding_diag` | The seven candidate faults on the plotting board, each with the reading it fails to explain. Evidence is distributed across sonar, control, the manifold, and the bilge — never one panel. |
| Ballpark | `nc_bp_depth` | Two independent inflow routes: measured rise × plan area, and `0.62·A·√(2gh)`. Ranges accepted, agreement rewarded. |
| Protocol | `nc_fire_protocol` | Physical, order-sensitive procedure with real decoy gear in the lockers. |
| Sequence | `nc_sonar_path` | The boundary face: sea → outboard valve → rupture → inboard valve → header, and what each valve also feeds. |
| Casebook | `nc_greywake_case` | The bilge alarm and its control-room repeat come off one float switch — two agreeing displays, one measurement. Logged as a notebook dependency. |

### Mistakes, and how the boat answers them
Nothing prints "wrong"; the system responds and the player can recover.
- **Patch before isolating** → the soft patch bulges, then blows off after ~14 s and
  the inflow returns. There is another patch in the locker.
- **Wrong valve** → no change in rate, and it secures something you needed (the tag
  and the toast say exactly what).
- **Leaving the power panel energized** → ground fault at 45 cm: the panel trips and
  takes the installed pump with it. Resettable once the level is below 30 cm.
- **Isolating without opening the cross-connect** → sonar-array cabinets climb toward
  63 °C.
- **Leaving pumps running after dewatering** → +3 dB each; `verify_sonar` will not
  pass until the boat is quiet again.
- **Recess full (90 cm)** → progressive flooding across the boundary aft.

Hard failure is not used. The worst case is a low score and a wet compartment.

### Scoring (100 points, `rt.scoreParts` drives the debrief)
Diagnosis 25 (−8 per wrong call) · evidence gathered before the call 20 ·
estimation 10 · procedure order 20 · restraint (unnecessary valve operations) 15 ·
casualty control (peak level) 10 · independence (hints) 10.