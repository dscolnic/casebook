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
