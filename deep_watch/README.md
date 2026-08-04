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
| Interact (hatch, station, locker, deck plate, valve, panel, rupture, sump, 7MC) | **E** |
| Use active instrument | **F** |
| Cycle carried tools | **[** and **]** (or mouse wheel) |
| Evidence notebook | **N** |
| Hint for the current objective (costs score) | **H** |
| First / third person | **V** |
| Skip the current objective (practice aid) | **K** |
| Dismiss a message | **Space** |
| Crouch | **Ctrl** (hold) or **C** (toggle) |
| Sprint (where sensible) | **Shift** |
| Pause / settings | **Esc** |

## What is in this build

The **foundation** (spec Phases 1–3 + core systems) plus one **complete, polished
vertical slice**: Mission 4, *Forward Flooding*. Pick it from the Watch dropdown on
the start screen (it is the default).

### The patrol
Underneath the missions there is a patrol running.

- **Two clocks, on purpose.** The *watch* clock is real time and drives every rate,
  reading and interval — a flooding rate has to be something you can watch. The
  *patrol* clock runs **an hour a real minute** and drives the days, the crew's
  fatigue, and the crossing. If the fast clock drove the physics, a bilge would
  rise a metre a second.
- **The crossing.** 12 000 nm in five legs. At the planned 4.2 kn transit speed
  that is about **four months** — and the passage plot in the control room shows
  exactly what going faster costs you in decibels, which is the same currency the
  sonar and flooding missions spend. There is no speed that is simply correct.
- **Sleep.** Your rack is in the berthing space. Six hours. You cannot turn in with
  a casualty running, and past about twenty hours awake the watch stops being
  reliable — the view goes soft until you sleep.
- **Qualification.** A fold-down desk in the berthing space posts **three questions
  a patrol day**, each about something the boat has already made you do. Ten correct
  earns your Dolphins. A wrong answer costs nothing but the explanation.
- **Third person.** **V** drops the camera back onto the watchstander. The boom
  pulls in around structure, and interaction reach is measured from the body rather
  than the camera, so the crosshair still means what it says.

### The vertical slice — Forward Flooding
A seawater line has failed under the deck plates of the forward equipment space.
The full loop the spec asks for, with nothing faked:

1. **Symptom in sonar** — a new broadband source with a constant *relative* bearing
   through a course change, and no blade rate. It is aboard, not in the water.
2. **Symptom in control** — depth making with nothing ordered, bow-down trim, planes
   and speed normal, ballast on plan.
3. **Instrument retrieval** — acoustic probe off the shelf, sounding tape and
   salinity probe out of a DC locker (which is full of plausible decoys).
4. **Acoustic tracing** — probe readings compartment by compartment; each reading
   tells you louder or quieter than the last. Follow the gradient forward.
5. **Discovery** — lift the deck plate. There is a real recess under the deck, real
   standing water, and a jet coming off a torn line.
6. **Report** on the 7MC; **secure the forward power panel** before the water
   reaches its gland.
7. **Rate estimate** — at the DC plotting board: measured rise × 11 m² plan area,
   checked against `0.62·A·√(2gh)`, against 45 m³/h of pumping. The pumps lose.
8. **Diagnosis** — seven candidate faults; the one you call has to explain the calm
   readings too.
9. **Valve isolation** — both ends of the branch, knowing what those valves also feed.
10. **Temporary patch** — which will blow off if you did step 9 second.
11. **Portable pump** — rigged in the sump, and audible on the noise floor.
12. **Verification in four places** — the bilge falls, sonar-array cooling recovers,
    sonar gets its weak contact back, control's trim and depth-control effort come down.
13. **Evidence notebook** reconstructs the chain; the debrief scores it and says why.

Everything else in the build:

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
- Nine handheld **instruments** that report evidence (not answers) from the central
  `SubmarineState` — flashlight, multimeter, vibration meter, acoustic probe,
  sounding tape, salinity probe, pressure gauge, gas detector, IR thermometer /
  thermal camera — plus carried damage-control gear (portable pump, soft patch,
  split clamp, shoring, breathing mask, extinguisher) taken out of physical lockers.
- An **evidence notebook** with evidence / hypotheses / source-dependency /
  mission-report faces, and an after-action **debrief** that scores the reasoning.
- **Save** (namespaced localStorage, never touches RECKON keys) and **settings**
  (graphics low/medium/high, audio, controls) that persist.
- A minimal **Boat Walkdown** mission to exercise movement and interaction, and the
  complete **Forward Flooding** mission described above.
- A procedural audio bed and submarine lighting states.

Missions 2, 3, 5–10 and the three command episodes are the subject of later runs —
see `docs/HANDOFF.md` for the exact next tasks. Mission 4 is the pattern they should
follow.

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
  `src/instruments/InstrumentManager.js` — a `measure(ctx)` returning
  `{ value, unit, level, note, numeric?, tag? }`, where `ctx` carries `state`,
  `compartment`, `position`, `layout`, `flooding`, `world` and the player's
  `previous` reading with that tool — then place a pickup in the world or add it to
  a locker's contents in `src/stations/EquipmentLockerPanel.js`. Give it a `tag` if
  a mission or station needs to find those readings later.
- **Import more RECKON content**: the packs live in `../navy_course_package/*.json`.
  Add a mapping to `src/content/sourceMappings.js` and consume the pack from a
  mission definition. Progress must stay under the `deepwatch.*` keys.
