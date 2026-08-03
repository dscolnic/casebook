# Deep Watch — Mission Design

The campaign is **10 missions + 3 command episodes** across three units. This
build implements only **Mission 1 (Boat Walkdown)**; the rest are specified here
as the design contract for later runs. Every casualty mission follows the same
loop the spec mandates:

> symptom → measurement → interpretation → travel → second measurement →
> intervention → cross-compartment verification.

## Data-driven definition shape
```js
{
  id, title, unit, startLocation, sourceGames: [...],
  learningObjectives: [...],
  onStart(rt),                       // optional setup / opening lesson card
  stages: [ { id, label, objective, arm(rt) => cleanupFn } ],
  scoring(rt) => number,
}
```
`arm(rt)` wires the triggers that advance the stage and returns a teardown.
Helpers on `rt`: `onEnter(compartmentId)`, `onInteractCount(type,n)`,
`onEvent(name, note, predicate)`, plus `complete()`, `toast()`, `flags`.

---

## UNIT I — Qualify on the Boat
- **M1 Boat Walkdown** *(implemented)* — Sequence + spatial memory. Report to
  control, find sonar/engineering/forward, open two DC lockers, man a machinery
  station to read a cooling loop, walk aft, deliver a message back to Control with
  no waypoint. Proves traversal + interaction.
- **M2 Contact in the Noise** — Sonar Spy + Casebook. Detect several sources on
  the `SonarConsole`, distinguish biologic/merchant/own-ship/uncertain by tonal
  signature (`freqMap`), create a track, justify confidence across displays.
- **M3 Position Without a Trusted Fix** — Dead Reckoning + Ballpark + Casebook.
  Record the last trusted fix, advance the estimate, apply current, identify the
  two nav displays that share one inertial source (source-dependency view), compare
  bottom contour, choose a safe route.
- **Command Episode 1 — Silent Passage** — cross a constrained area keeping contact
  awareness without unnecessary acoustic exposure.

## UNIT II — Keep the Boat Alive
- **M4 Forward Flooding** *(the canonical full-loop mission)* — Diagnosis +
  Protocol + Ballpark + Sequence. Uses the `nc_flooding_diag` fault model. Detect
  bow-down trend + new low-frequency noise in sonar; trace with the acoustic probe
  through control → forward passage → deck plates → bilge; estimate pump-vs-inflow;
  isolate, patch, dewater; **verify in ≥ 2 places** (bilge falls, trim stabilizes,
  sonar self-noise clears).
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
