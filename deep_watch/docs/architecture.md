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
`SubmarineWorld`, compartments, audio) → player systems (controller, interaction,
inventory, instruments, stations, missions) → UI (HUD, notebook, settings) →
wires interactions and the mode state machine → starts the `GameLoop`.

## Mode state machine (in `Game`)
`menu → playing → { paused | station | notebook } → playing`.
- Entering a station or the notebook disables the player controller + interaction
  and releases pointer lock so the DOM overlay is usable; exiting restores both.
- Losing pointer lock while `playing` (Esc / click-away) pauses the game.

## The game loop (`core/GameLoop.js`)
- Fixed-step accumulator at 30 Hz drives `state.integrate()` and control easing
  (stable physics regardless of frame rate).
- Variable step drives player movement, interaction raycast, rendering, HUD.

## Systems map
```
core/        EventBus, GameLoop, Game, SaveManager, SettingsManager
simulation/  SubmarineState (central model; integrate() couples subsystems)
world/       SubmarineWorld (geometry + LAYOUT), CompartmentManager,
             CollisionSystem (segment+box push-out), LightingSystem, AudioEnvironment
player/      PlayerController, InteractionSystem, EquipmentInventory, HandheldViewmodel
instruments/ InstrumentManager (six evidence-producing tools)
stations/    StationManager + Sonar / Navigation / ControlRoom / Engineering /
             ElectricalSwitchboard / Radio consoles
missions/    MissionManager, MissionRuntime, definitions/mission_01_walkdown
ui/          HUD, Notebook, SettingsMenu
graphics/    MaterialFactory, ProceduralProps
content/     sourceMappings (game → submarine translation table)
```

## Collision
The interior is described as vertical **wall segments** (XZ) plus **AABB prop
boxes**. The player is a circle of radius 0.32 m; `CollisionSystem.resolve()` runs
a few relaxation passes pushing the circle out of anything it penetrates. Hatch
openings are gaps in the bulkhead segments; a closed hatch activates a segment
across the gap. Cheap, stable in tight spaces, no physics engine required.

## Cross-system couplings (in `SubmarineState.integrate` / `Game._easeControls`)
- Flooding → forward/aft bilge water → **trim** shifts (bow-down as forward water rises).
- Running **pumps** and higher **shaft rpm** raise the **sonar self-noise floor**
  → weaker sonar picture (visible on the waterfall) → silence-vs-safety tension.
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
