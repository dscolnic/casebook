---
name: alamos-world
description: World, render and input: the house rules learned the hard way (lights, DoubleSide text, ground height, kit.js (x,z,y), spawn clearance, crowd blocking, sky radiance floor, look.far, palettes under ACES), screenshot-before-believing-anything-visual, the touch input path, and how the map and markers find things and people. Read before touching engine/world, props, plans, materials, player, crowd, map, or touch.
---

## The games are played with thumbs too

`engine/core/touch.js` is the second input path, because the casebook app is opened on tablets. Touch fires
no `keydown`, so WASD is inert; iPadOS Safari has no Pointer Lock API, so `controls.lock()` never resolves —
and that is the half that matters, because **`isLocked` gates both `updatePlayer` and the interaction
raycast**. Without it the world renders perfectly and the player is welded to the spawn, which is house rule
8 through a different door. `initPlayer` builds the layer and sets `isLocked` by hand: there is no pointer to
capture, so there is nothing to be locked out of.

- **It writes the same `moveState` the keys write**, which is why it drives a scooter and flies a helicopter
  without knowing either exists — `driving.js` and `flying.js` read the player's key state through an
  `input()` callback. The stick is analogue, so a half-pushed thumb walks at half speed where a key only ever
  says 1.
- **Everything else is a synthetic `KeyboardEvent` on `window`** — use, map, summary, the collective.
  `main.js` stays the single description of what each control does; a touch button calling `activate()` itself
  would be a second copy of that decision.
- **Look is done here, not through PointerLockControls**, whose `onMouseMove` returns early unless *its*
  `isLocked` is true and that flag belongs to the browser. The rotation maths is lifted verbatim so a drag and
  a mouse move produce the same turn.
- **Turned on by `(pointer: coarse) and (hover: none)`, not by `maxTouchPoints`** — a touchscreen laptop
  answers yes to the second and has a mouse. `?touch=1` / `?touch=0` force it either way, the only way to
  iterate at a desk.
- **Anything absolutely positioned from a `Touch`'s `clientX/clientY` must be a child of `#touchLayer`.** It
  is the only element whose origin is the top left of the window; the move zone is anchored bottom-left, and
  the floating stick parented there drew several hundred pixels below the fold — invisible, and
  indistinguishable from the stick not working.
- **A panel opening has to zero the stick.** The panels cover the layer at a higher stacking level so they
  already swallow taps, but a thumb still resting on the stick keeps walking behind an open question card
  while the day's clock runs.

`gamekit.moveState` and `gamekit.updatePlayer` are on the dev handle so an input path can be stepped by hand
in a throttled tab. Importing `player.js` from the console does **not** work: it resolves to a second copy of
the module with its own uninitialised `camera`.

**`engine/device.js` is where the device question is answered**, not `touch.js`, because two layers need the
same answer and nothing under `engine/world` has ever imported from `engine/core`. `world/materials.js`
`tuneRendererForDevice()` is the other caller: pixel ratio 1.5 instead of 2 and `PCFShadowMap` instead of
`PCFSoftShadowMap` on a coarse pointer. A tablet reports a device pixel ratio of 2, which on an iPad is the
fragment count of a 4K monitor for a fraction of the GPU; 1.5 is 47% fewer fragments and invisible at that
density. **Five modules create a renderer** — the three engine worlds and the two themes bringing their own —
and all five wrote the same four lines, which is why the numbers moved into one function. **A mobile budget
applied in three places out of five is worse than none.** What that does *not* fix is the draw call count,
which is the real cost: Red Sand issues about 1,500 a frame from 1,973 meshes with 5 instanced, 1,601 of them
shadow casters. That is content work — instancing, and not every bolt needing to cast.

**`vh` is wrong on iOS wherever a panel is sized against the window.** It is the height with the browser
toolbars *hidden*, so `.modal{max-height:85vh}` let a long question panel run its bottom under the chrome —
and `.modalActions` is sticky to the bottom of that box, so the answer button went under with it. Every such
rule carries a `dvh` line after the `vh` one. Same bug as `#canvas` being `100vh`, and it will happen again
the next time something is sized in viewport units.

## House rules learned the hard way

1. **Do not fork the engine again.** Three copies meant every fix three times.
2. **Budget real lights.** 28 point lights took a floor from 118 fps to 20. Ambient + hemisphere +
   emissive panels + IBL. Ceiling of 6 real lights.
3. **Never put text on a `DoubleSide` material.** It renders mirrored from behind.
4. **One source of truth for ground height.** Shipped broken twice.
5. **Never dim gameplay elements with opacity.** Darken the colour instead.
6. **Outdoor palettes blow out.** Under ACES with a bright sky IBL a mid albedo renders near-white.
   `envMapIntensity` 0.35–0.5, exposure below 1.0, and an albedo darker than looks right.
7. **`kit.js` placers take `(x, z, y)` — ground last.** One call written `(x, y, z)` put six display
   boards sixteen metres in the air.
8. **Keep the spawn point and the route clear.** A prop over the spawn welds the player in place:
   renders perfectly, W does nothing.
9. **A crowd checks its destination, not its path — fix both.** `blocked` was consulted when a walker
   *chose* somewhere to go and never while it walked there, so on open ground people rarely crossed a
   building and in a submarine they walked through every bulkhead. The same predicate now takes a pad,
   since the margin that keeps somebody from being *placed* against a wall is wider than their
   shoulders. A fanned-out crowd position needs the same check: a person placed inside the furniture
   stands there all game, because every direction out is blocked and no target is reachable.
10. **The player's width is a theme decision.** 0.45 suits a street. A hatch is a 1.1 m opening, which
    leaves a twelve-centimetre slot — "sometimes I cannot get through the door". `look.playerRadius`.
11. **`scene.environmentIntensity` does not exist before three r163.** Setting it is silent and the
    environment applies at full strength — a submarine rendered with every bulkhead lifted to pale
    sage. `dampEnvironment(scene, level)` in `engine/world/materials.js` is the answer, per material.
12. **Compare a challenge format through `kindOf()`, never as a raw string.** The books spell them
    "Sequence", "SEQUENCE" and "Science Tank". Comparing raw strings left 72 of the hospital's lessons
    matching no branch and rendering "challenge type SEQUENCE is not yet implemented" in a shipped
    game. Both dev checkers canonicalise the same way.
13. **`walkCost()` charges the time itself.** It returns advanceTime's verdict, not a number of hours,
    so `advanceTime(walkCost(d))` adds `undefined` to the clock. NaN reached the sun angle before it
    reached the HUD, so the symptom was the whole world going black. `advanceTime` now refuses
    non-finite hours.
14. **A save belongs to the theme that wrote it.** `loadState` used to fall back to the hospital's
    legacy key for *every* theme, so playing the hospital and then opening either other game loaded a
    hospital campaign into it — group ids that theme has never heard of, and the first question panel
    died on `gs.issue` of undefined. `tryLoadSaved` rejects a save whose group ids do not match.
14b. **A control nobody complains about can still be backwards.** `rightDir` is `dir × up`, which *is*
    the camera's own right, and `updatePlayer` scaled it by `-right` — so A strafed right and D
    strafed left in all fifteen games, for as long as the engine has existed. Nobody reported it
    because a mouse corrects the heading faster than the error registers, and these are walk-to-a-place
    games where strafing is rarely load-bearing. A thumbstick has no such cover, which is how it
    surfaced. **Nothing in `check` asserts anything about input, and this is what that costs**: the fix
    is one character and it was available for years.
15. **The two older games fork `styles.css`.** Their forks stop before the instrument-panel rules, so
    anything the shared question UI draws had no styling there. Both now `@import` the engine sheet at
    the top of their fork — a `<link>` cannot do it, the path leaves Vite's root and 404s.
16. **Nobody may be *placed* without asking whether the spot is free.** A person dropped inside a
    collider is there permanently: every walker refuses to step into a blocked point, and from inside
    one every neighbouring point is blocked too. Three of the hospital's four spawn paths had no check.
    `settle()` rings outward to the nearest clear spot, and each walker rescues anybody already inside
    something.
17. **The physical sky has a radiance floor.** With the sun below the horizon and both scattering terms
    at zero it still renders ~0.03 linear, which tone mapping lifts to flat grey. No uniform reaches
    it. A nocturnal theme sets `atmosphere.nightSky` and the dome is hidden below deep night. Related:
    `nightTurbidity` / `nightRayleigh` and `look.nightLift` exist because the defaults are tuned for a
    *daytime* game's dusk.
18. **`look.far` has to clear the sky dome outdoors — from the far end of the site, not the spawn.** At
    an interior's 160 the dome is clipped away and the sky renders black in broad daylight, with no
    error anywhere. 900 works on a compact site; the clearance is `atmosphere.scale + how far the
    player can get from the origin`, so Wellmere's 300 m of headland needs 1500 against a dome of 700.
    The symptom is a black band above the horizon at one end of the map only, which reads as a
    rendering bug and is a camera setting.
19. **Ground and crop have to be a value apart, and the ground is the one to move.** Wellmere's first
    field put mid-green plots on mid-green turf and 1,300 of them read as one flat smear from twenty
    metres. Lightening the crop turns it pastel under ACES; darkening and browning the *ground* — two
    stops below what looks right on the canvas — separates them and makes the alleys read as alleys.
20. **Grep for the previous game's nouns before assuming a module is generic.** `simulation.js` held
    one game's cast, `constants.js` one game's save key, `player.js` one game's field of view and floor
    height.
20b. **The sky model is Earth's, and it can be tinted rather than argued with.** `buildSky` runs
    three.js's Preetham sky, which solves for Rayleigh scattering off nitrogen and oxygen. No
    combination of its four uniforms reaches the butterscotch of a dusty carbon-dioxide atmosphere —
    turbidity and mie only make it hazier, rayleigh only moves it between blue and white. Red Sand
    added two optional keys: `atmosphere.tint` multiplies the dome's output *and* the dome that bakes
    the IBL, so the ground is lit by the sky the player sees, and `atmosphere.haze: { day, night }`
    replaces the hard-coded blue-grey the far ranks and fog are taken toward. Both inert unless set.
    Set one without the other and a seam appears along the skyline.
21. **A hard equation early is fine; a derived one before its base is not.** The test is dependency,
    not difficulty — Blackout opens on the swing equation and that is the right first question. What
    was wrong in eight of fifteen games was impulse on day 3 with `F = ma` computed nowhere, the chain
    rule on day 2 with the power rule not until day 7, apparent power on day 3 with `P = IV` on day 10.
    `needs` in `tools/syllabus.js` names what each equation is derived from, by `e` string rather than
    position, and `equationOrder.mjs` fails the game for an inversion. Only a question that *computes*
    settles it, so a base taught only through `CHOICE` — which has no relationship, template or worked
    solution — is a base the course never teaches. Corollary: a `DERIVE`'s own lines are arithmetic, and
    reading only `relationship` said Headwater computed the power rule on day 7 when the player had been
    applying it on day 1.

## Screenshot before believing anything visual

The most expensive lesson in the repo. In one session: a gable roof was inside out in the *shipped* game
and in the port of it; a building sign sat behind a canopy slab; half the crowd never moved; a walk
cycle's feet travelled twice as far as the body. **Every one passed every assertion available** — exports
present, meshes created, no errors, builds clean.

- A "before" screenshot is a baseline, not a correctness check. The roof was already wrong in the
  reference shot and I matched it faithfully.
- **A background browser tab gets no `requestAnimationFrame`.** The scene renders dark, nothing animates,
  `getCurrentTarget()` stays null, and synthetic key presses appear to do nothing. Check
  `document.visibilityState` before concluding anything is broken. `window.gamekit` exposes
  `updateCrowd`, `updateInteractions`, `getCurrentTarget` and `activate` so a throttled tab can be
  stepped by hand.
- A dynamic `import()` from the console may resolve to a **second copy** of the module graph with its own
  state. Compare `getState() === window.gamekit.getState()` before trusting a console test.

## Finding things and people

- **Anybody the day still wants has a cone over their head**, several at once, drawn with
  `depthTest: false` so it shows through walls. The only thing allowed to draw over everything.
- **Any open call is marked** — case beacon in a room, and in Mission Control a beacon over the console.
- **The map is drawn at the size it will be seen at.** `renderMap({ maxW, maxH })` fits the box and turns
  the plan sideways when that shows it larger; it used to be 720 px wide regardless and then scaled down
  by CSS, which made a long site's labels two pixels high. Interior rooms are drawn on their own side of
  the corridor — drawing every room full-width put opposite rooms on top of each other — and a name that
  will not fit inside its room goes outside with a leader line rather than being truncated.
- **A site spread over kilometres draws a window, not the whole place.** `site.mapRadius` (Planetary
  Defense: 170 m) centres the map on the player and reduces everything outside it to an arrow on the edge
  it lies beyond, with the distance — because the range is 1.6 km wide and base camp is seven buildings
  inside 200 m, so the whole-site map drew the only part anybody walks around as one unreadable blob. The
  window is half a radius in the short direction and opened out to the panel's aspect in the long one, and
  clamped inside the site so it never shows ground beyond the edge of the world. Arrow labels carry their
  distance after a `·`, so they are placed with `whole: true` — the label placer's shortening rule cut at
  exactly that separator and threw the distance away.
- **`maxW` for the map sheet is 760, because the card is `min(820px, 100%)`.** The caller asked for 1100
  for years and it never showed, because the aspect of a whole site capped the width first; the first map
  that could fill it ran its right-hand edge and every label under the edge of the card.

## The delivery board, and where a floor actually is

One room per campaign carries the board with a cell per piece and the case under
it with a block per piece earned — `engine/world/deliveryCase.js`, placed by
whichever builder owns the room:

| Game shape | Who places it |
| --- | --- |
| outdoor town (a door per area) | `interiorBuilding.js`, from `createInteriors` |
| a floor from `plan.js` | `interiorSite.js`, in the room loop |
| stacked floors / two wings | the same, through `interiorLevels` / `interiorTower` / Yellow Bay's world |
| its own world module | that module: Mission Control, the Ellery |

Four things this cost, and every one of them was found in a still:

- **A placement test that rejects everything looks exactly like a feature that
  was never built.** The first clearance test used a square footprint big enough
  to cover the case — which reaches THROUGH the wall it hangs on, and the walls
  are colliders, so every candidate position in every room was refused and the
  room came out exactly as before. The footprint is oriented to the wall now:
  2.8 m along it, 1.0 m out from it, stopping short of the face.
- **A wall fitting leaves no collider**, because nothing walks into a board at
  head height. So a test that reads `colliders` cannot see the pinboard, and Deep
  Watch's first screenshot had a cork board disappearing behind the delivery
  board's left edge. `interiorBuilding` records every fitting `against()` a wall
  and keeps 2.4 m of clear wall between centres — and extends `wallOk`, so the
  fit-out's own notices do not land on it either.
- **A room's floor is not always y = 0.** Mission Control and the Ellery stand
  their rooms on a raised tier, so the case — placed in world space at
  `PH / 2` — stood a metre and a half *under* the floor while the board on the
  wall above it looked perfect. `floorY` is the fix and the reason it exists.
- **The middle of a room is where the room's own thing is.** The board goes on
  the far wall 1.5 m off the centre line, because a theme's `fitOutRoom` runs
  after this and does not read `ctx.deliveryAt`: the hospital's first shot had the
  case standing in a treatment bed.

The board's face is a canvas texture repainted on `setPieces`, faintly emissive
(0.22, and 0.18 on the blocks) because three of the four room styles are dark and
a matte board four metres away in a night-adapted room is a rectangle you can
tell is a board. It is not a light.

An outdoor game refreshes it on entering the room; a floor game has no arrival to
hang that on, so `world.setDeliveryPieces(...)` is called from `refreshWorld` and
the board is right the moment a saved campaign loads.

## Motion, weather, sound, and a crowd that sits down

Four layers the engine did not have until September 2026, found by looking at eight
games' contact sheets side by side: nothing moved but the waypoint ring, nothing was in
the air, nothing made a sound, and every extra was either walking or standing. Each is
one shared module; the props layer only declares.

- **`engine/world/animators.js` is the one list of things that move.** `animate(fn)`
  registers `fn(t, dt, eye)`; every world module's `updateWorldAnimation(t, eye)` runs the
  list. Helpers: `spin`, `blink`, `flicker`, `sway`, `bob`, `scrollUV`, `patrol`, `wander`.
  A throwing animator is stopped and named, never fatal — the `stateHooks` rule. `dt` is
  clamped at 0.1 s because a background tab hands the first frame back a delta of minutes,
  and a wheel that turns a hundred radians in one frame reads as a glitch. **The cheap
  rig has legs and a merged torso, no arms**, so an extra's gesture is torso and head; a
  named person's work pose (`stationedIdle`) can put hands on the bench.
- **`engine/world/weather.js` is one `Points` cloud that follows the eye.** `site.weather
  = { kind: rain|drizzle|snow|dust, density, wind: {x, z}, lightning: { every } }`. Hidden
  when the eye is past `DISTRICT_X - 500`, because a room has a roof. Lightning spikes
  the ambient and hemisphere and decays; `onLightning(cb)` is how the sound layer learns
  the distance to delay the thunder by. Flash restores the *captured* intensities, since
  `updateTimeOfDay` rewrites them every half second.
- **`engine/core/audio.js` synthesises everything.** No asset files: noise buffers and
  filters make wind, surf, rain, hum, city, waterfall, machinery, transformer, generator,
  fan, crowd. `theme.audio = { bed, indoors, gain, emitters: [{ x, z, kind, r, gain }] }`,
  with defaults per world kind (wind outdoors, hum indoors). Gain by distance and a
  stereo pan from the camera yaw — right is `(cos yaw, -sin yaw)` — not a `PannerNode`,
  which is the one thing on a tablet dearer than the renderer. Starts on the first
  gesture (`unlockAudio()` from the title button), `M` and `#audioBtn` toggle, the choice
  is in `localStorage`. Indoors (`interiors.current`) crossfades to the room bed and
  muffles emitters; a card up ducks the mix. A misspelt voice is *silence*, so
  `engine/dev/ambience.mjs` checks the names against the engine's own lists.
- **`interiorBuilding` has more than four rooms now.** Styles `lab`, `timber`,
  `observatory`, `steel`, `module`, `station`, `plant`, `island`; ceilings `tiles`,
  `rafters`, `ribbed`, `strip`, `concrete`, `truss`; wall kinds `paint`, `board`, `block`,
  `ribbed`, `plywood`; floors `sheet`, `plank`, `deck`, `concrete`. A Martian module had a
  suspended tile ceiling and green carpet; that is what this is for.
- **Every doorway in every outdoor game's rooms was a black rectangle**, because the
  district is an empty scene. `spec.outside = { sky, ground }` (read off the site by
  `outsideOf` in app.js) paints a sky-over-ground gradient behind the door, and
  `room.setOutsideNight()` darkens it from `dayBlendAt()` — exported from
  `outdoorSite.js` so the sun and the doorway agree.
- **The crowd has three kinds of extra**: a quarter sit on whatever `world.getSeats()`
  returns (bench seats outdoors, `plan.seats` indoors, `poseSeated` and never
  re-grounded), every third walker brings a partner and stands talking, the rest walk.
  `stationPeople(who, station, { work })` puts one person at the room's `workSpot` — a
  metre in front of the first bench, facing it — with hands on the worktop.
- **Do not edit a served file while `npm run shots` is running.** Vite reloads the page,
  the harness's `window.gamekit` vanishes mid-run, and the report is `Cannot read
  properties of undefined (reading 'teleport')` — which looks like a crash in the game and
  is not one. A `git stash` round trip does the same. Cost three renders in one session.

## What eight games at once turned up, and the engine gaps behind them

Eight parallel world passes in September 2026, one per game. Every finding below was
invisible to `npm run check` and most were invisible until somebody looked at a still.

**The engine gaps, all now closed:**

- **The sky is not the size of the world.** `sky.scale.setScalar(A.scale)` is a BOX, so
  its half-extent is `scale / 2` — 475 m on a 950 m scale — and the star field sits at
  `scale × 0.92`. Planetary Defense lets the player 1,300 m out, so on the summits they
  stood *outside their own sky*, and the response had been to give up and set
  `dayWindow: [8, 20]` — a nocturnal campaign played in daylight, which is how it
  shipped. It cannot be bought off with a bigger dome either: `updateSky` bakes the IBL
  with `pmrem.fromScene(envScene, 0, 1, 900)`, so a dome past 900 m bakes black wedges
  into the environment. `parkSkyOnEye(x, z)` moves the dome and the stars with the
  player, in x and z only — following in y would take the horizon with it.
- **`kit.setWindowGlow` was exported and called by nothing**, for the life of the repo.
  Every framed `litWindow` pane in every outdoor game sat at `emissiveIntensity: 0`, so
  a town at one in the morning was a set of dark boxes. `updateTimeOfDay` calls it now.
- **A `lightPanels` entry may be a mesh, a material, or `{ material, night }`.** It was
  read only as a mesh, so a theme registering a bare material was silently skipped —
  Planetary Defense's pad strobes among them. And `night: true` inverts the curve, for
  the thing a tower is built around: a city across a river is dark at noon and lit after
  dusk. Changeover had to register a stand-in object with an inverting setter to get it.
- **The interior fit-out's `soft` is `(x, z, r)` and the outdoor one takes `{x, z, r}`.**
  Six themes write the object form. Passed to the interior one it produced
  `{x: {…}, z: undefined, r: undefined}` — a collider whose every comparison is NaN, so
  it does not merely sit in the wrong place, it does nothing. Headwater had three, and
  every seat, machine and standpipe in that building was uncollidable. It takes both now
  and rejects a non-finite.
- **`teleport` could not pitch and `--sol` only worked for room shots.** So nothing tall
  was photographable — a 60 m mast, a fly tower, a lift hill — and every outdoor
  screenshot ever taken was of day one whatever the flag said, which is why no
  day-gated world change had ever been seen. `teleport(pos, yaw, pitch)` in YXZ, and the
  sol block is hoisted above the view loop and calls `refreshWorld` so props state hooks
  actually fire.
- **`updatePlayer` builds its collision box at an absolute y of 0 to eye height**, never
  relative to the ground. Every collider on Vellan's foreshore sits between −9 and −1,
  so a quay and a slipway were geometrically perfect and blocked nothing. Not yet fixed:
  a theme with a dock, a pit or a quarry must top its colliders out above zero. Nothing
  in `npm run check` looks at colliders in y.

**The theme-side traps, which recur:**

- **Five of eight games had a question sited at a fixture nothing declares** — see the
  tripwire. `placement.mjs` had been red on each for months.
- **`computeFrenetFrames` has no curvature to work from on a straight**, so it falls back
  to a world axis: Corbin Park's coaster had its two rails stacked *vertically* for the
  whole lift hill, and it survived because from most angles that reads as one rail. Found
  by printing frames, not by looking. Parallel transport from world up, arc-length
  indexed, with the closing roll error spread. Only `blackout` and `midway` make the same
  call. A repeated control point on a `closed: true` curve also stalls the arc-length
  table — the train concertina'd every lap.
- **A bench centred on the room's own centre line stands on `getStopEntry`.** Three of
  The Trial's rooms could only be entered by half a metre.
- **A theme's `plan.world` is read literally by `vite.config.js`**, so an edition that
  copies its parent's plan points at the parent's directory.
- **Two animators on one property: the later registration wins**, because `runAnimators`
  iterates backwards. Fold them, do not stack them.
