import { test, expect } from '@playwright/test';

/**
 * Missions 2 and 3 and Command Episode 1.
 *
 * As with the flooding tests, only walking and waiting are shortcut (`goTo` and
 * `advance` — the latter runs the identical fixed step, just faster). Every stage
 * still has to be satisfied by a real change in the simulation.
 */
const fatalErrors = [];

test.beforeEach(async ({ page }) => {
  fatalErrors.length = 0;
  page.on('pageerror', (err) => fatalErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    if (/favicon|Failed to load resource/i.test(msg.text())) return;
    fatalErrors.push(msg.text());
  });
  await page.goto('/');
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
});

const stageId = (page) => page.evaluate(() => window.__DEEPWATCH__.missions.current?.stage?.id ?? null);
async function waitForStage(page, id, timeout = 20000) {
  await page.waitForFunction((want) => window.__DEEPWATCH__.missions.current?.stage?.id === want, id, { timeout });
}
async function start(page, id) {
  await page.evaluate((m) => window.__DEEPWATCH__.startMission(m), id);
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
}

// ===================== MISSION 2 =====================

test('a loud boat cannot hear its own picture', async ({ page }) => {
  await start(page, 'mission_02_contact');
  const loud = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(4);
    return { floor: g.state.sonarNoiseFloor, audible: g.sonar.audible().map((c) => c.id) };
  });
  // The faint fishing boat is under the floor while the pumps are running.
  expect(loud.floor).toBeGreaterThan(48);
  expect(loud.audible).not.toContain('S03');

  const quiet = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.state.propulsionState.shaftRpm = 40;
    g.advance(10);
    return { floor: g.state.sonarNoiseFloor, audible: g.sonar.audible().map((c) => c.id) };
  });
  expect(quiet.floor).toBeLessThan(48);
  expect(quiet.audible).toContain('S03');
});

test('the faint contact will not support a classification, and the strong one will', async ({ page }) => {
  await start(page, 'mission_02_contact');
  const q = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.state.propulsionState.shaftRpm = 40;
    g.advance(10);
    const byId = (id) => g.sonar.audible().find((c) => c.id === id);
    return {
      merchant: g.sonar.tonalQuality(byId('S01')),
      faint: g.sonar.tonalQuality(byId('S03')),
      merchantLines: g.sonar.tonalsFor(byId('S01')).length,
      faintLines: g.sonar.tonalsFor(byId('S03')).length,
    };
  });
  expect(q.merchant).toBe('family');
  expect(q.merchantLines).toBeGreaterThan(3);
  expect(q.faint).toBe('partial');
  expect(q.faintLines).toBeLessThan(3);

  // Naming a class off two lines is wrong; "Unknown" is right.
  const calls = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.sonar.designate('S03');
    const guess = g.sonar.classify('S03', 'Fishing', ['narrowband', 'broadband']);
    const honest = g.sonar.classify('S03', 'Unknown', ['narrowband', 'broadband']);
    return { guess: guess.correct, honest: honest.correct };
  });
  expect(calls.guess).toBe(false);
  expect(calls.honest).toBe(true);
});

test('two displays off one beamformer are not two pieces of evidence', async ({ page }) => {
  await start(page, 'mission_02_contact');
  const res = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.advance(6);
    g.sonar.designate('S01');
    const shared = g.sonar.classify('S01', 'Merchant', ['broadband', 'autodetect']);
    const indep = g.sonar.classify('S01', 'Merchant', ['broadband', 'narrowband']);
    return { shared, indep };
  });
  expect(res.shared.correct).toBe(true);
  expect(res.shared.independent).toBe(false);
  expect(res.shared.shared).toMatch(/one measurement shown twice/i);
  expect(res.indep.independent).toBe(true);
});

test('mission 2 plays through to a debrief', async ({ page }) => {
  test.setTimeout(90000);
  await start(page, 'mission_02_contact');

  await page.evaluate(() => window.__DEEPWATCH__.goTo('sonar_room'));
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('sonar'));
  await expect(page.locator('#station-overlay')).toBeVisible();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await waitForStage(page, 'quiet_ship');

  // Quiet the boat at the machinery panel, for real.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('machinery_control');
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.state.propulsionState.shaftRpm = 42;
    g.advance(10);
  });
  await waitForStage(page, 'designate');

  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('sonar_room');
    for (const c of g.sonar.audible()) g.sonar.designate(c.id);
  });
  await waitForStage(page, 'classify_merchant');

  await page.evaluate(() => window.__DEEPWATCH__.sonar.classify('S01', 'Merchant', ['broadband', 'narrowband']));
  await waitForStage(page, 'classify_biologic');
  await page.evaluate(() => window.__DEEPWATCH__.sonar.classify('S02', 'Biologics', ['narrowband', 'manoeuvre']));
  await waitForStage(page, 'classify_ownship');
  await page.evaluate(() => window.__DEEPWATCH__.sonar.classify('N01', 'Own-ship', ['btr', 'manoeuvre']));
  await waitForStage(page, 'decline_uncertain');
  await page.evaluate(() => window.__DEEPWATCH__.sonar.classify('S03', 'Unknown', ['narrowband', 'manoeuvre']));
  await waitForStage(page, 'report_picture');

  await page.evaluate(() => { const g = window.__DEEPWATCH__; g.goTo('control_room'); g.dc.report(); });
  await waitForStage(page, 'file_report');

  await page.keyboard.press('KeyN');
  await page.locator('[data-ntab="report"]').click();
  await page.locator('#btn-submit-report').click();
  await expect(page.locator('#debrief')).toBeVisible();

  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.mission_02_contact?.score ?? null);
  expect(score).toBeGreaterThan(60);
  await expect(page.locator('.score-row').filter({ hasText: 'Evidence independence' })).toBeVisible();
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

// ===================== MISSION 3 =====================

test('a fix from the drifting source shrinks the ring without moving the plot', async ({ page }) => {
  await start(page, 'mission_03_navigation');
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const before = { u: g.state.navigationUncertainty, err: g.nav.trueError };
    g.nav.takeFix('inertial');
    const after = { u: g.state.navigationUncertainty, err: g.nav.trueError };
    g.nav.takeFix('contour');
    const real = { u: g.state.navigationUncertainty, err: g.nav.trueError };
    return { before, after, real };
  });
  // Precision without accuracy: ring down, error unchanged.
  expect(r.after.u).toBeLessThan(r.before.u);
  expect(Math.abs(r.after.err - r.before.err)).toBeLessThan(0.001);
  // The independent fix moves the estimate onto the truth.
  expect(r.real.err).toBeLessThan(r.before.err * 0.3);
  expect(r.real.u).toBeLessThan(0.3);
});

test('the plot drifts because it does not know about the water', async ({ page }) => {
  await start(page, 'mission_03_navigation');
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const err0 = g.nav.trueError;
    g.advance(600);              // ten minutes of dead reckoning
    return { err0, err1: g.nav.trueError };
  });
  expect(r.err1).toBeGreaterThan(r.err0);
});

test('mission 3 plays through: datum, current, false fix, sounding, real fix, route', async ({ page }) => {
  test.setTimeout(90000);
  await start(page, 'mission_03_navigation');
  await page.evaluate(() => window.__DEEPWATCH__.goTo('control_room'));

  await page.evaluate(() => window.__DEEPWATCH__.stations.open('navigation'));
  await expect(page.locator('#station-overlay')).toBeVisible();
  await page.locator('#nav-record').click();
  await waitForStage(page, 'advance_dr');

  await page.locator('[data-ntab2="dr"]').click();
  await page.locator('#dr-apply').click();
  await waitForStage(page, 'false_fix');

  await page.locator('[data-ntab2="sources"]').click();
  await page.locator('[data-fix="inertial"]').click();
  await expect(page.locator('#fix-out')).toContainText(/more confidence, no more accuracy/i);
  await waitForStage(page, 'sound_bottom');

  await page.locator('[data-ntab2="dr"]').click();
  await page.locator('#dr-sound').click();
  await waitForStage(page, 'independent_fix');

  await page.locator('[data-ntab2="sources"]').click();
  await page.locator('[data-fix="contour"]').click();
  await expect(page.locator('#fix-out')).toContainText(/Independent fix/i);
  await waitForStage(page, 'choose_route');

  // The gut is the trap while the ring is still open; south-about always works.
  await page.locator('[data-ntab2="route"]').click();
  await page.locator('[data-route="south"]').click();
  await waitForStage(page, 'verify_contour');

  await page.evaluate(() => window.__DEEPWATCH__.advance(60));
  await page.locator('[data-ntab2="dr"]').click();
  await page.locator('#dr-sound').click();
  await waitForStage(page, 'file_report');

  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await page.keyboard.press('KeyN');
  await page.locator('[data-ntab="report"]').click();
  await page.locator('#btn-submit-report').click();
  await expect(page.locator('#debrief')).toBeVisible();

  // The dependency note the Casebook lesson is supposed to leave behind.
  const deps = await page.evaluate(() => window.__DEEPWATCH__.notebook.dependencies.map((d) => d.id));
  expect(deps).toContain('nav_inertial_chain');
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

// ===================== COMMAND EPISODE 1 =====================

test('the episode accumulates acoustic exposure and blind time while you work', async ({ page }) => {
  await start(page, 'episode_01_silent_passage');
  const noisy = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    await new Promise((r) => setTimeout(r, 2200));      // let the episode ticker run loud
    return { exposure: g.missions.current.flags.exposure, floor: g.state.sonarNoiseFloor };
  });
  expect(noisy.floor).toBeGreaterThan(47);
  expect(noisy.exposure).toBeGreaterThan(0);

  const quiet = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.state.propulsionState.shaftRpm = 38;
    g.advance(8);
    const before = g.missions.current.flags.exposure;
    await new Promise((r) => setTimeout(r, 1600));
    return { grew: g.missions.current.flags.exposure - before, floor: g.state.sonarNoiseFloor };
  });
  expect(quiet.floor).toBeLessThan(47);
  expect(quiet.grew).toBeLessThan(1);      // quiet boat stops spending
});

test('the pinnacle is real: setting east at depth loses water under the keel', async ({ page }) => {
  await start(page, 'episode_01_silent_passage');
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const depthAt = (x, y) => { g.state.truePosition = { x, y }; return g.nav.soundBottom(); };
    return { clear: depthAt(0.1, 2.4), pinnacle: depthAt(1.15, 3.85) };
  });
  expect(r.clear).toBeGreaterThan(70);
  expect(r.pinnacle).toBeLessThan(45);
});

test('episode 1 plays through the passage to a scored debrief', async ({ page }) => {
  test.setTimeout(120000);
  await start(page, 'episode_01_silent_passage');

  await page.evaluate(() => window.__DEEPWATCH__.goTo('control_room'));
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('navigation'));
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await waitForStage(page, 'rig_quiet');

  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('machinery_control');
    g.state.pumpStates.seawaterPump.on = false;
    g.state.pumpStates.trimPump.on = false;
    g.state.propulsionState.shaftRpm = 40;
    g.advance(8);
  });
  await waitForStage(page, 'hold_contact');

  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('sonar_room');
    g.sonar.designate('M11');
  });
  await waitForStage(page, 'know_where');

  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('control_room');
    g.nav.takeFix('contour');
  });
  await waitForStage(page, 'transit');

  // Run the passage: keep clear of the eastern shoulder and drive north.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.orderedHeading = 350;
    g.state.heading = 350;
    g.state.speed = 10;
    g.advance(600);
  });
  await waitForStage(page, 'account');

  // Water under the keel where the boat actually ended up.
  const clearance = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return g.nav.soundBottom() - g.state.depth;
  });
  expect(clearance).toBeGreaterThan(15);

  await page.keyboard.press('KeyN');
  await page.locator('[data-ntab="report"]').click();
  await page.locator('#btn-submit-report').click();
  await expect(page.locator('#debrief')).toBeVisible();
  await expect(page.locator('.score-row').filter({ hasText: 'Acoustic discretion' })).toBeVisible();
  await expect(page.locator('.score-row').filter({ hasText: 'Contact awareness' })).toBeVisible();

  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.episode_01_silent_passage?.score ?? null);
  expect(score).toBeGreaterThan(40);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});
