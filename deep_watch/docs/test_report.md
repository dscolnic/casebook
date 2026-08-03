# Deep Watch — Test Report

## Environment
- **Machine**: MacBook (Apple Silicon), macOS (Darwin 23.1.0).
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
npm install            # ok
npm run build          # ✓ 38 modules, 549 kB (Three.js dominated), no errors
npx playwright test    # ✓ 11/11 passed (~1.1 min); webServer = build + preview:4173
```

## Automated smoke tests — 11/11 PASS
Run with `npm run test` (auto-builds and serves the production bundle on :4173).

| # | Test | Result |
|---|---|---|
| 1 | Application loads; start screen shown; **no fatal console errors** | ✓ |
| 2 | Game boots; debug handle exposes the 10-compartment boat layout | ✓ |
| 3 | Start button begins the walkdown mission; HUD appears; objective set | ✓ |
| 4 | Player can move (position changes when driving the controller) | ✓ |
| 5 | Player can retrieve an instrument into inventory | ✓ |
| 6 | Taking a measurement (F) records an evidence-notebook entry | ✓ |
| 7 | Mission objective advances on entering the sonar room | ✓ |
| 8 | Pause menu opens (pointer-lock lost) and closes (Escape) | ✓ |
| 9 | Settings persist to `deepwatch.settings.v1` | ✓ |
| 10 | Progress saves to `deepwatch.progress.v1` and creates **no `reckon*` keys** | ✓ |
| 11 | State sim: flooding raises the bilge and shifts trim bow-down | ✓ |

Tests 4–7 also exercise: pointer-lock activation path, hatch/station/instrument
interaction wiring, and mission stage advancement. Test 11 is the state-system
check the spec calls for (flooding → bilge → trim coupling).

## Bugs found by the tests and fixed
1. **Overlays never hid.** `.overlay-panel`/`.overlay-screen` set `display:flex`,
   which overrode the UA `[hidden]` rule, so `#station-overlay` (z-index 45) stayed
   on top and swallowed every click — including the start button. Fixed with a
   global `[hidden] { display: none !important; }`. (Real gameplay bug, not just a
   test artifact.)
2. **Favicon 404** counted as a fatal console error. Added an inline SVG favicon
   and made the console-error filter ignore benign resource 404s.
3. **Pause panel overflow.** On a short window the settings-heavy pause menu pushed
   the action buttons off-screen. Made panels scroll internally (`max-height:88vh;
   overflow-y:auto`); the pause/resume test now uses the Escape control.

## Manual / interactive verification notes
- `npm run dev` serves the game at `http://localhost:5173`; the start screen,
  pointer-lock capture on canvas click, WASD movement through hatches, station
  overlays (sonar waterfall animates; nav uncertainty ellipse draws), instrument
  read-outs, and the notebook all render. (Interactive pointer-lock is exercised
  by a human; headless Chrome does not reliably grant it — see below.)

## Known limitations
- **Pointer lock in headless**: headless Chrome does not reliably grant pointer
  lock, so movement/pause tests drive the controller through the
  `window.__DEEPWATCH__` API rather than a real lock. Interactive play uses a real
  lock.
- **Mission-progression coverage** is currently the walkdown only (the sole mission
  in this build). `tests/mission-progression.spec.js` and richer state-system tests
  (`pump lowers water`, `electrical isolation changes loads`, `machinery→sonar
  noise`) are stubbed for the next run once those systems land.
- **Performance**: not yet formally profiled; the boat uses shared materials,
  reusable geometry, capped pixel ratio, fog, and pooled per-compartment lights to
  target ~60 FPS on medium. A frame-time capture is a Phase-10 task.
- Two npm-audit advisories exist in dev-only dependencies (Vite/Playwright chain);
  no runtime dependency is affected.

## Not claimed
No test result here is asserted without having been run. Tests not yet written
(full campaign progression, additional state-coupling checks, performance capture)
are listed above as pending, not as passing.
