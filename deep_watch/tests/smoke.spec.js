import { test, expect } from '@playwright/test';

/**
 * Smoke tests — verify the application loads, boots the game, starts the walkdown
 * mission, moves the player, records evidence, opens the pause menu, and persists
 * settings/progress. These use the window.__DEEPWATCH__ debug handle plus real
 * DOM/keyboard where practical. Pointer-lock is not reliably grantable in headless
 * Chromium, so movement is exercised through the controller API rather than a real
 * lock, which is an accepted limitation documented in docs/test_report.md.
 */
const fatalErrors = [];

test.beforeEach(async ({ page }) => {
  fatalErrors.length = 0;
  page.on('pageerror', (err) => fatalErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    // Ignore benign resource 404s (e.g. an auto-requested favicon on some hosts);
    // we care about real script/runtime errors.
    if (/favicon|Failed to load resource/i.test(text)) return;
    fatalErrors.push(text);
  });
  await page.goto('/');
});

test('application loads with the start screen and no fatal errors', async ({ page }) => {
  await expect(page.locator('#start-screen')).toBeVisible();
  await expect(page.locator('.game-title')).toHaveText(/DEEP/);
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  // Allow a beat for any async errors.
  await page.waitForTimeout(300);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

test('game boots and exposes the debug handle with the boat layout', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  const layoutLen = await page.evaluate(() => window.__DEEPWATCH__.layout.length);
  expect(layoutLen).toBe(10);
  const hasControl = await page.evaluate(() => window.__DEEPWATCH__.layout.some((c) => c.id === 'control_room'));
  expect(hasControl).toBe(true);
});

test('start button begins the selected mission and shows the HUD', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await expect(page.locator('#mission-select')).toContainText('Boat Walkdown');
  await expect(page.locator('#mission-select')).toContainText('Forward Flooding');
  await page.locator('#btn-start').click();
  await expect(page.locator('#hud')).toBeVisible();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await expect(page.locator('#hud-objective')).toContainText(/Objective 1\//);
});

test('player can move (position changes over time)', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  const startZ = await page.evaluate(() => window.__DEEPWATCH__.player.position.z);
  // Drive the controller directly (headless pointer-lock is unreliable).
  await page.evaluate(() => {
    const p = window.__DEEPWATCH__.player;
    p.keys.add('KeyW');
    for (let i = 0; i < 40; i++) p.update(1 / 30);
    p.keys.clear();
  });
  const endZ = await page.evaluate(() => window.__DEEPWATCH__.player.position.z);
  // Spawn faces the bow (yaw 0 → looks down -Z), so W must move forward (-Z).
  // This guards against the movement-axis sign being flipped again.
  expect(endZ).toBeLessThan(startZ - 0.3);
});

test('player can retrieve an instrument into inventory', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  const added = await page.evaluate(() => window.__DEEPWATCH__.inventory.add('multimeter', 'Multimeter'));
  expect(added).toBe(true);
  const carrying = await page.evaluate(() => window.__DEEPWATCH__.inventory.has('multimeter'));
  expect(carrying).toBe(true);
});

test('taking a measurement records an evidence-notebook entry', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.add('multimeter', 'Multimeter');
    // Simulate pressing F.
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyF' }));
  });
  // Open notebook (N) and expect an entry.
  await page.keyboard.press('KeyN');
  await expect(page.locator('#notebook')).toBeVisible();
  await expect(page.locator('.notebook-entry')).toHaveCount(1);
});

test('mission objective advances when entering the sonar room', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  // Start the walkdown explicitly: the start screen's mission picker defaults to
  // this build's vertical slice (Forward Flooding), not the walkdown.
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_01_walkdown'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  // Force the first objective (report to control) then drive into sonar_room.
  const advanced = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const sonar = g.layout.find((c) => c.id === 'sonar_room');
    let lastObjective = '';
    g.bus.on('mission:objective', (o) => { lastObjective = o.text; });
    // Complete stage 1 (control) by emitting entry, then move to sonar.
    g.bus.emit('player:enteredCompartment', { compartment: g.layout.find((c) => c.id === 'control_room') });
    await new Promise((r) => setTimeout(r, 50));
    g.bus.emit('player:enteredCompartment', { compartment: sonar });
    await new Promise((r) => setTimeout(r, 50));
    return lastObjective;
  });
  expect(advanced.length).toBeGreaterThan(0);
});

test('pause menu opens and closes', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__ && window.dispatchEvent(new Event('blur')));
  // Trigger pause via the game API (pointer-lock path is environment-dependent).
  await page.evaluate(() => window.__DEEPWATCH__.bus.emit('player:pointerLock', false));
  await expect(page.locator('#pause-menu')).toBeVisible();
  // Close via Escape (the documented primary pause/resume control).
  await page.keyboard.press('Escape');
  await expect(page.locator('#pause-menu')).toBeHidden();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
});

test('settings persist to localStorage', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.evaluate(() => window.__DEEPWATCH__.settings.set('graphicsPreset', 'high'));
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('deepwatch.settings.v1')).graphicsPreset);
  expect(stored).toBe('high');
});

test('progress saves to a namespaced key that does not touch RECKON keys', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.evaluate(() => window.__DEEPWATCH__.save.markMissionComplete('mission_01_walkdown', { score: 100 }));
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('deepwatch.progress.v1')));
  expect(stored.completedMissions.mission_01_walkdown).toBeTruthy();
  // Ensure we did not create a reckon key.
  const reckonKeys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('reckon')));
  expect(reckonKeys).toEqual([]);
});

test('state simulation: flooding raises bilge and shifts trim', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  const result = await page.evaluate(() => {
    const s = window.__DEEPWATCH__.state;
    s.bilgeLevels['fwd_bilge'] = 0;
    const trim0 = s.trim;
    // Simulate inflow into the forward bilge and integrate.
    for (let i = 0; i < 60; i++) { s.bilgeLevels['fwd_bilge'] += 1; s.integrate(1); }
    return { bilge: s.bilgeLevels['fwd_bilge'], trim0, trim1: s.trim };
  });
  expect(result.bilge).toBeGreaterThan(0);
  expect(result.trim1).toBeGreaterThan(result.trim0); // bow-down as forward water rises
});

test('every compartment can be walked end to end down the centreline', async ({ page }) => {
  // Furniture placed on the centreline sits directly in line with the bulkhead
  // hatch, so a player steps through and walks straight into it. That has now
  // happened three times (the after machinery space, the forward bilge coaming,
  // the propulsion motor), so it gets a test: walk each compartment from just
  // inside its forward boundary to just inside its after one, holding W.
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_01_walkdown'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');

  const results = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const out = [];
    for (const c of g.layout) {
      g.goTo(c.id);
      g.player.setPose(0, c.zStart + 0.45, 180);       // just inside, facing aft
      g.player.enabled = true;
      g.player.keys.add('KeyW');
      const target = c.zEnd - 0.45;
      let stuck = 0, last = g.player.position.z;
      for (let i = 0; i < 900 && g.player.position.z < target; i++) {
        g.player.update(1 / 30);
        if (Math.abs(g.player.position.z - last) < 0.001) stuck++; else stuck = 0;
        last = g.player.position.z;
        if (stuck > 40) break;                          // wedged against something
      }
      g.player.keys.clear();
      out.push({ id: c.id, reached: g.player.position.z, need: target });
    }
    return out;
  });

  const blocked = results.filter((r) => r.reached < r.need - 0.05);
  expect(blocked.map((b) => `${b.id} stopped at ${b.reached.toFixed(2)} of ${b.need.toFixed(2)}`)).toEqual([]);
});

test('V shows the watchstander and the body follows them', async ({ page }) => {
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  expect(await page.evaluate(() => window.__DEEPWATCH__.body.group.visible)).toBe(false);

  await page.keyboard.press('KeyV');
  await page.waitForTimeout(250);
  const third = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    for (let i = 0; i < 20; i++) g.player.update(1 / 30);
    return {
      view: g.player.view,
      visible: g.body.group.visible,
      bodyZ: g.body.group.position.z,
      playerZ: g.player.position.z,
    };
  });
  expect(third.view).toBe('third');
  expect(third.visible).toBe(true);
  expect(Math.abs(third.bodyZ - third.playerZ)).toBeLessThan(0.01);
});
