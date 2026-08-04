# Deep Watch — Test Report

## Environment
- **Machine**: MacBook (Apple Silicon), macOS 14.1.2 (Darwin 23.1.0).
- **Node**: v25.3.0 · **npm**: 11.7.0.
- **Browser under test**: system **Google Chrome 150.0.7871.187** via Playwright's
  `channel: 'chrome'` (Playwright test runner 1.62.1). Chrome is driven headless
  with SwiftShader so WebGL/Three.js runs without a GPU.
  - *Why the system channel*: Playwright's bundled Chromium (build 1234) stalled
    mid-download on this network. Switching to the already-installed system Chrome
    made the suite reproducible without a multi-hundred-MB download. Any machine
    with Chrome installed can run `npm test` as-is.

## Commands run
```bash
cd deep_watch
npm run build          # ✓ 45 modules, 643 kB (Three.js dominated), no errors
npx playwright test    # ✓ 34/34 passed (5.2 min); webServer = build + preview:4173
```

## Results — 34/34 PASS

### Smoke (`tests/smoke.spec.js`) — 11/11
| # | Test | Result |
|---|---|---|
| 1 | Application loads; start screen shown; **no fatal console errors** | ✓ |
| 2 | Game boots; debug handle exposes the 10-compartment boat layout | ✓ |
| 3 | Start button begins the selected mission; HUD appears; objective set | ✓ |
| 4 | Player can move (position changes when driving the controller) | ✓ |
| 5 | Player can retrieve an instrument into inventory | ✓ |
| 6 | Taking a measurement (F) records an evidence-notebook entry | ✓ |
| 7 | Mission objective advances on entering the sonar room | ✓ |
| 8 | Pause menu opens (pointer-lock lost) and closes (Escape) | ✓ |
| 9 | Settings persist to `deepwatch.settings.v1` | ✓ |
| 10 | Progress saves to `deepwatch.progress.v1` and creates **no `reckon*` keys** | ✓ |
| 11 | State sim: flooding raises the bilge and shifts trim bow-down | ✓ |

### Mission 4 — Forward Flooding (`tests/mission-flooding.spec.js`) — 13/13
| # | Test | Result |
|---|---|---|
| 12 | Mission seeds a real casualty in the forward bilge (source, inflow, start location) | ✓ |
| 13 | **The inflow beats every pump the boat has** — 48 m³/h in vs 45 m³/h out, level still rising with both pumps running | ✓ |
| 14 | **A soft patch on a pressurised line blows off**; on an isolated line it holds and the rate goes to zero | ✓ |
| 15 | **Isolating the seawater header takes sonar-array cooling with it**; the aft cross-connect brings it back | ✓ |
| 16 | **Water reaching the forward power panel trips it** and kills the installed pump (capacity → 0) | ✓ |
| 17 | **Full 19-stage playthrough** (below) | ✓ |
| 18 | Tool stage names the tools still missing by name; a single locker can supply all three | ✓ |
| 19 | **A stage already satisfied when it arms completes only itself** (stage-token regression) | ✓ |
| 20 | **Two soundings too close together do not make a rate** — and the instrument says why | ✓ |
| 21 | The measurement stage lists exactly which readings are still outstanding | ✓ |
| 22 | **Pressing H lights up where to go** — beacon, compartment, chevron trail, timeout, light restored | ✓ |
| 23 | Mission progress saved under `deepwatch.progress.v1` only | ✓ |
| 24 | Restart returns the boat to a clean condition (level, valves, deck plate, notebook, inventory, stage) | ✓ |

### Missions 2, 3 and Command Episode 1 (`tests/mission-sonar-nav.spec.js`) — 10/10
| # | Test | Result |
|---|---|---|
| 25 | **A loud boat cannot hear its own picture** — the faint contact is under the floor until the plant is quieted, then it appears | ✓ |
| 26 | The faint contact resolves one or two lines, not a family; naming a class off it is wrong and "Unknown" is right | ✓ |
| 27 | **Two displays off one beamformer are not two pieces of evidence** — the same call is `independent: false` with the shared-chain explanation | ✓ |
| 28 | Mission 2 plays through: quiet the boat → designate four → merchant, biologic, own-ship, decline the fourth → report → debrief | ✓ |
| 29 | **A fix from the drifting source shrinks the ring without moving the plot**; the independent fix moves it onto the truth | ✓ |
| 30 | The plot drifts because dead reckoning does not know about the water | ✓ |
| 31 | Mission 3 plays through: datum → current → false fix → sounding disagrees → real fix → safe route → verify, and leaves the dependency note | ✓ |
| 32 | The episode accumulates acoustic exposure while the boat is loud and stops spending when it is quiet | ✓ |
| 33 | **The pinnacle is real** — setting east at depth loses water under the keel | ✓ |
| 34 | Episode 1 plays through the passage to a scored debrief with exposure and contact-awareness lines | ✓ |

### What the full playthrough (test 17) actually asserts
It plays the mission through real DOM and real interactables, and checks a physical
fact at each step — not that a click happened:

- the sonar bearing-history panel says the relative bearing has not moved, and the
  N01 track is present before it is classified;
- the control indications show bow-down trim before they are logged;
- the acoustic trace is **monotonically louder** across control → sonar → sonar
  electronics → forward equipment, with the maximum at the casualty;
- lifting the deck plate sets `discovered` and raises the casualty banner;
- securing the panel actually de-energizes it;
- the two soundings are >0.4 min apart and the second is higher; salinity >28 PSU;
  the pressure gauge note reports the lost pressure;
- a **deliberately wrong** diagnosis call ("hull breach") is made first and the board
  rejects it with the reading it fails to explain, then the correct call is accepted;
- shutting **one** valve does *not* advance the isolation stage; shutting the second does;
- after the patch, `flooding.stopped` is true;
- after dewatering, the sounding is <12 cm with a **negative** rate;
- the flow-noise source is gone and the self-noise floor is <50 dB (which requires
  securing the portable pump — running it keeps the boat too loud to pass);
- trim <0.3° and depth-control effort <32 % at control;
- the notebook's mission-report face reconstructs the chain, the debrief renders a
  score >50, the score persists to localStorage, and the score breakdown **docks the
  deliberate wrong call** ("1 incorrect call before the right one");
- **no fatal console errors** across the whole run.

State-system coverage the spec asks for is now real rather than stubbed: flooding
raises the bilge (11), bilge water changes trim (11), pumps lower water only when
capacity exceeds inflow (13, 17), machinery/flow state changes sonar noise (17),
and an electrical boundary changes what is connected (16).

## Bugs found by testing and fixed this run
1. **The deck matting covered the bilge opening.** Each compartment lays an accent
   plane over its deck; it spanned the new hole, so lifting the plate revealed a
   brown surface instead of the recess. Found by screenshotting the discovery beat,
   not by a test. The matting is now cut with the same rect-subtraction as the deck.
2. **The bilge was unreadable at deck level** — dark water on a dark bottom. Painted
   bilge walls lighter than the water, added a dim bilge light that follows the deck
   plate, and gave the jet its own light and a splash ring.
3. **Interaction prompts were static.** A valve's prompt has to say "Open" or "Shut"
   depending on its current position; `InteractionSystem` now accepts a function
   prompt and re-emits when the resolved text changes.
4. **The toast overlapped a three-line objective card.** Moved down to clear both the
   objective and the casualty banner.
5. **The tool-retrieval stage could soft-lock a player** (reported from real play):
   it needed three tools but the objective only said where two of them were, and the
   acoustic probe was a single small object on a shelf. If you could not spot it, the
   progress counter sat at 2 of 3 with nothing telling you which tool was missing.
   Fixed three ways: a spare probe is stowed in the same control-room locker as the
   other two, the objective card now names the specific tools still outstanding, and
   the hints point at the locker first. Test 18 covers it.
6. **A stage could complete the stage after it** (found by a new test, and a real
   play bug). A stage's initial "is this already satisfied?" check runs on a queued
   microtask; if it passed, `complete()` fired *after* the runtime had already moved
   on, so the next objective was skipped silently — carrying all three tools before
   the tool stage armed skipped the whole acoustic trace. Unsubscribing in the
   teardown cannot help: the microtask has already escaped the bus. Each stage now
   gets a token and its `complete()` is bound to it. Test 19.
7. **Wall panels were being built inside the hull.** The side wall is a 0.2 m box
   centred on ±halfW, so its inner face is at halfW − 0.1; panels mounted at
   halfW − 0.13 were buried in the steel and invisible. Also, the first placement
   pass only consulted collision boxes, and much of the scenery (the seawater
   manifold, valve stands, the plotting board) has no collider — so panels landed
   behind furniture. Placement now measures real geometry from the world root.
8. **The after machinery space could not be walked through.** The heat exchanger and
   the after bilge coaming left a 0.75 m gap against a 0.64 m player. The bilge
   opening moved off the centreline and the exchanger moved forward and outboard;
   a test now walks the compartment end to end.
9. **`stopped` was true with no flooding at all.** `[].every()` is `true`, so
   `FloodingSystem.stopped` reported "casualty under control" in every mission
   that had no casualty — which fired the "Control has finished compensating"
   branch on the first tick and secured the trim pump. It silently changed the
   self-noise floor in Missions 2 and 3 and the episode. Found by a sonar test
   whose floor was 3 dB lower than the plant implied.
10. **The self-noise floor started stale.** It is a smoothed value, so at mission
   start it still held the previous value while the pumps that were actually
   running had not been counted yet. A "rig for quiet" objective could therefore
   satisfy itself in the first second, before the player touched anything. Missions
   now call `state.settleNoise()` once their plant lineup is set.
11. Two pre-existing smoke tests assumed the start button always launches the walkdown.
   The start screen now has a mission picker (defaulting to the vertical slice), so
   those tests select the walkdown explicitly.

## Manual / interactive verification
- `npm run dev` serves the game on :5173. Walked the forward equipment space in a
  real browser: the deck opening, coaming (which correctly stops you walking over
  the hole), the five tagged manifold valves, the power panel, the 7MC handset and
  the plotting board all render and are reachable.
- Screenshots captured headless at 1280×800 for the discovery beat (plate up, water
  rising, jet running) and the recovered state (jet gone, suction hose in the water,
  banner green and falling, dependent-system warning fired). Both read correctly.

## Known limitations
- **Pointer lock in headless**: headless Chrome does not reliably grant pointer lock,
  so tests move the player via `__DEEPWATCH__.goTo()` and drive the controller API
  rather than walking. Interactive play uses a real lock. `goTo()` fires the same
  compartment-entered event the player's own movement does.
- **Watch time in tests** is fast-forwarded with `__DEEPWATCH__.advance(seconds)`,
  which runs the identical 30 Hz fixed step — the physics is not shortcut, only the
  wall-clock wait.
- **Missions 2, 3, 5–10 and the command episodes are not implemented**, so
  `tests/mission-progression.spec.js` (full campaign progression) remains unwritten.
  Atmosphere and navigation state couplings are still the sketched versions.
- **Performance**: not formally profiled. One 643 kB chunk (Three.js dominated).
  A frame-time capture is still a Phase-10 task.
- Two npm-audit advisories exist in dev-only dependencies (Vite/Playwright chain);
  no runtime dependency is affected.

## Not claimed
No result here is asserted without having been run. Work not done (remaining
missions, campaign-progression tests, performance capture) is listed above as
pending, not as passing.
