# Deep Watch — Architecture

## Principles
- **One source of truth**: `simulation/SubmarineState.js` holds the boat's entire
  physical condition. Systems read/write it; they do not hold their own copies.
- **Loose coupling via events**: `core/EventBus.js` is a synchronous pub/sub.
  Systems emit domain events; others subscribe. No system imports another just to
  poke it.
- **Data-driven missions**: a mission is a plain object with ordered `stages`;
  `missions/MissionRuntime.js` runs it. No giant mission switch statement.
- **Modular, not one giant file**: ES modules organized by concern.
- **Performance by construction**: shared materials, reusable geometry kits,
  pooled per-compartment lights capped by the graphics preset, capped pixel ratio,
  fog + limited draw distance.

## Boot flow
`index.html` → `src/main.js` → `new Game().init()`.
`Game` builds: renderer/scene/camera → world (materials, collision, lighting,
`SubmarineWorld`, compartments, audio, `FloodingSystem`) → player systems
(controller, interaction, inventory, instruments, `DamageControl`, stations,
missions) → UI (HUD, notebook, debrief, settings) → wires interactions and the mode
state machine → starts the `GameLoop`.

## Mode state machine (in `Game`)
`menu → playing → { paused | station | notebook } → playing`, plus `debrief` at
mission end.
- Entering a station or the notebook disables the player controller + interaction
  and releases pointer lock so the DOM overlay is usable; exiting restores both.
- Losing pointer lock while `playing` (Esc / click-away) pauses the game.
- **A casualty does not pause because you are reading a gauge.** Physics keeps
  running in `station` and `notebook` mode; only a real pause freezes the boat.

## The game loop (`core/GameLoop.js`)
- Fixed-step accumulator at 30 Hz drives `flooding.update()` then
  `state.integrate()` (stable physics regardless of frame rate). Subsystems write
  their own quantities into the state; `integrate()` applies the couplings.
- Variable step drives player movement, interaction raycast, rendering, HUD.

## Systems map
```
core/        EventBus, GameLoop, Game, SaveManager, SettingsManager
simulation/  SubmarineState (central model; integrate() couples subsystems),
             FloodingSystem (inflow/bilge/mass/progressive flooding/fault set),
             DamageControl (player DC actions → simulation + consequences)
world/       SubmarineWorld (geometry + LAYOUT + deck openings), BilgeVisuals,
             CompartmentManager, CollisionSystem (segment+box push-out),
             LightingSystem, AudioEnvironment
player/      PlayerController, InteractionSystem, EquipmentInventory, HandheldViewmodel
instruments/ InstrumentManager (nine evidence-producing tools + carried DC gear)
stations/    StationManager + Sonar / Navigation / ControlRoom / Engineering /
             ElectricalSwitchboard / Radio / DamageControlBoard / EquipmentLockerPanel
missions/    MissionManager, MissionRuntime,
             definitions/{mission_01_walkdown, mission_04_flooding}
ui/          HUD, Notebook, Debrief, SettingsMenu
graphics/    MaterialFactory, ProceduralProps
content/     sourceMappings (game → submarine translation table)
```

## Collision
The interior is described as vertical **wall segments** (XZ) plus **AABB prop
boxes**. The player is a circle of radius 0.32 m; `CollisionSystem.resolve()` runs
a few relaxation passes pushing the circle out of anything it penetrates. Hatch
openings are gaps in the bulkhead segments; a closed hatch activates a segment
across the gap. Cheap, stable in tight spaces, no physics engine required.

## Cross-system couplings (all in `SubmarineState.integrate` + `FloodingSystem`)
Control easing used to live in `Game._easeControls`; it moved into
`SubmarineState.integrate()` so every coupling is testable from a bare state object.

- Flooding → bilge level × plan area → **water mass**, placed at a per-compartment
  **trim moment arm** → bow-down trim; uncompensated mass also makes the boat
  **heavy**, so it sinks through the ordered depth.
- Trim + water mass + low speed → **depth-control effort**, the number the control
  room uses to confirm a casualty is actually fixed rather than masked.
- An open flooding path is a broadband **flow-noise source**; running **pumps**
  (+3 dB each) and **shaft rpm** raise the **self-noise floor**, masking weak sonar
  contacts. Dewatering therefore costs you the sonar picture — silence vs. safety.
- Water above 45 cm at an **energized local power panel** → ground fault → the panel
  trips and takes the installed forward bilge pump with it.
- Shutting the forward seawater header also secures **sonar-array cooling**; cabinet
  temperature climbs until the aft cross-connect is opened.
- A recess full to 90 cm spills across the boundary into the next compartment
  (**progressive flooding**).
- **Navigation uncertainty** grows with time and speed until an independent fix
  resets it; the true position is never displayed.
- Low **speed** reduces control authority → sluggish depth/heading response.

## Persistence
- `deepwatch.progress.v1` — campaign progress (completed missions, instruments
  qualified, compartments learned, notebook concepts, settings-independent).
- `deepwatch.settings.v1` — graphics/audio/control settings.
- **Never** writes any `reckon*` key. `SaveManager.probeLegacyReckon()` is a
  read-only probe for an optional legacy acknowledgement.

## Graphics presets (`SettingsManager.GRAPHICS_PRESETS`)
Control pixel-ratio cap, shadows on/off + map size, max dynamic lights, particle
density, smoke quality, draw distance, post-processing, environment detail.
Default: medium.
