# Deep Watch
### Reasoning Under Pressure Beneath the Surface

A first-person 3D submarine-operations game that integrates the RECKON Navy-course
reasoning games as **in-world submarine systems** — one persistent, extensively
modeled composite boat, not a menu that launches separate games. You walk the
submarine, man real consoles, read handheld instruments, and reason through
casualties. The original games (Sequence, Ballpark, Protocol, Diagnosis, Casebook,
Sonar Spy, Dead Reckoning, Strait Support, SensorShip, Science Tank) run as
invisible reasoning engines underneath.

> **Fictional composite vessel.** No real submarine class, classified layout,
> authentication process, or weapons-employment procedure is represented.

---

## Run it

```bash
cd deep_watch
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # serve the build on :4173
npm run test:install   # one-time: download the Chromium test browser
npm run test       # Playwright smoke tests (builds + serves automatically)
```

Runs in a modern Chromium browser on a Mac. Targets ~60 FPS on medium settings.
No API keys, cloud services, or external engines.

## Controls

| Action | Key |
|---|---|
| Move | **W A S D** |
| Look | **Mouse** (click the canvas to capture the pointer) |
| Interact (hatch, station, locker, instrument) | **E** |
| Use active instrument | **F** |
| Cycle carried tools | **[** and **]** (or mouse wheel) |
| Evidence notebook | **N** |
| Crouch | **Ctrl** (hold) or **C** (toggle) |
| Sprint (where sensible) | **Shift** |
| Pause / settings | **Esc** |

## What is in this build

This is the **foundation** (spec Phases 1–3 + core systems). It contains:

- A runnable Vite + Three.js project (no framework).
- A first-person controller with collision, crouch, head-bob, and pointer-lock.
- **One persistent boat**: 10 furnished, connected compartments (forward
  equipment, sonar electronics, sonar room, control room, radio, berthing/mess,
  machinery control, propulsion, electrical, auxiliary) linked by bulkheads with
  operable hatches.
- Recognizable, live **stations**: sonar (waterfall / narrowband / BTR / contacts),
  navigation table (estimated track + uncertainty ellipse + source-dependency view),
  ship control (helm/depth/course), machinery control, electrical switchboard,
  and radio (EMCON).
- Six handheld **instruments** that report evidence (not answers) from the central
  `SubmarineState`, plus an evidence notebook.
- **Save** (namespaced localStorage, never touches RECKON keys) and **settings**
  (graphics low/medium/high, audio, controls) that persist.
- A minimal **Boat Walkdown** mission to exercise movement and interaction.
- A procedural audio bed and submarine lighting states.

The full ten-mission campaign, three command episodes, and casualty simulations
(flooding, fire, atmosphere, self-noise, depth) are the subject of later runs —
see `docs/HANDOFF.md` for the exact next tasks.

## Architecture

See `docs/architecture.md`. In short: a central `SubmarineState` is the single
source of truth; systems communicate through an `EventBus`; missions are
**data-driven** definitions run by `MissionRuntime` (no giant switch statement).

## Source mapping

`docs/source_inventory.md` audits every RECKON/Navy-course source file.
`docs/game_to_submarine_mapping.md` documents how each game becomes an in-world
system. `src/content/sourceMappings.js` is the machine-readable version.

## How to extend

- **Add a mission**: create `src/missions/definitions/mission_XX.js` exporting a
  definition (`{ id, title, stages:[{ id, objective, arm(rt) }], scoring }`) and
  register it in `src/missions/MissionManager.js`. Use the `MissionRuntime`
  helpers (`onEnter`, `onInteractCount`, `onEvent`).
- **Add an instrument**: add a definition to `DEFS` in
  `src/instruments/InstrumentManager.js` (a `measure(state, compartmentId)` that
  returns `{ value, unit, level, note }`) and place a pickup in the world.
- **Import more RECKON content**: the packs live in `../navy_course_package/*.json`.
  Add a mapping to `src/content/sourceMappings.js` and consume the pack from a
  mission definition. Progress must stay under the `deepwatch.*` keys.
