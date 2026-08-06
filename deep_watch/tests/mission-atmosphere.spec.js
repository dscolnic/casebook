import { test, expect } from '@playwright/test';

/**
 * Mission 6 — Atmosphere Degradation.
 *
 * The mission is a pair of opposite errors: a compartment that is genuinely bad
 * behind a sensor that says it is fine, and a compartment that is fine behind a
 * sensor that says it is bad. These tests check that both exist, that only a
 * handheld reading separates them, and that the cause is upstream of both.
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

const start = async (page) => {
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_06_atmosphere'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
};
const waitForStage = async (page, want, timeout = 20000) =>
  page.waitForFunction((w) => window.__DEEPWATCH__.missions.current?.stage?.id === w, want, { timeout });

test('the boat starts with one lying sensor and one genuinely bad compartment', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return {
      berthTruth: g.atmosphere.measure('berthing_mess'),
      berthSensor: g.atmosphere.sensorReading('berthing_mess'),
      radioTruth: g.atmosphere.measure('radio_room'),
      radioSensor: g.atmosphere.sensorReading('radio_room'),
      damper: g.state.ventDampers.berthing_mess,
    };
  });
  // Berthing: bad air, sensor frozen at a perfectly ordinary number.
  expect(r.berthTruth.co2).toBeGreaterThan(1.0);
  expect(r.berthSensor.co2).toBeLessThan(0.6);
  expect(r.damper).toBe('shut');
  // Radio: fine air, sensor reading high.
  expect(r.radioTruth.co2).toBeLessThan(0.7);
  expect(r.radioSensor.co2).toBeGreaterThan(1.0);
});

test('a sealed compartment goes bad on its own, and opening the damper recovers it', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const start = g.atmosphere.air('berthing_mess').co2;
    g.advance(240);
    const sealed = g.atmosphere.air('berthing_mess').co2;
    g.atmosphere.setDamper('berthing_mess', true);
    g.advance(600);
    return { start, sealed, opened: g.atmosphere.air('berthing_mess').co2 };
  });
  // Six people and no scrubber: it climbs.
  expect(r.sealed).toBeGreaterThan(r.start);
  // Back in the loop: it comes down, and not instantly.
  expect(r.opened).toBeLessThan(0.5);
});

test('the handheld reads the compartment you are in, not a ship average', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.add('gas_detector', 'Gas Detector', 'measure');
    g.inventory.setActive('gas_detector');
    const out = {};
    for (const c of ['control_room', 'berthing_mess', 'radio_room']) {
      g.goTo(c);
      const r2 = g.instruments.useActive();
      out[c] = { co2: r2.numeric, note: r2.note };
    }
    return out;
  });
  expect(r.berthing_mess.co2).toBeGreaterThan(1.0);
  expect(r.control_room.co2).toBeLessThan(0.8);
  // And it says so when the installed sensor disagrees with it.
  expect(r.berthing_mess.note).toMatch(/does NOT match/i);
  expect(r.radio_room.note).toMatch(/does NOT match/i);
});

test('calling a sensor fault where the air is really bad is allowed, and says why it is wrong', async ({ page }) => {
  test.setTimeout(90000);
  await start(page);
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.add('gas_detector', 'Gas Detector', 'measure');
    g.inventory.setActive('gas_detector');
    g.goTo('berthing_mess');
    g.instruments.useActive();
    g.goTo('machinery_control');
    g.stations.open('atmosphere_control');
  });
  await expect(page.locator('#station-overlay')).toBeVisible();

  await page.locator('[data-call="sensor"][data-comp="berthing_mess"]').click();
  await expect(page.locator('#atm-msg')).toContainText(/leaves people breathing it/i);

  await page.locator('[data-call="real"][data-comp="berthing_mess"]').click();
  await expect(page.locator('#atm-msg')).toContainText(/air really is going bad/i);
});

test('calling without measuring is judging the sensor by the sensor', async ({ page }) => {
  test.setTimeout(90000);
  await start(page);
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('machinery_control');
    g.stations.open('atmosphere_control');
  });
  await page.locator('[data-call="real"][data-comp="radio_room"]').click();
  await expect(page.locator('#atm-msg')).toContainText(/without measuring/i);
});

test('mission 6 plays through: symptoms, survey, the two calls, trace, restore, verify', async ({ page }) => {
  test.setTimeout(120000);
  await start(page);

  // 1. Go where the people are, with a detector.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.add('gas_detector', 'Gas Detector', 'measure');
    g.inventory.setActive('gas_detector');
    g.goTo('berthing_mess');
    g.instruments.useActive();
  });
  await waitForStage(page, 'survey');

  // 2. Survey the boat by hand, including the compartment the board is worried about.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    for (const c of ['control_room', 'radio_room', 'machinery_control', 'sonar_room']) {
      g.goTo(c);
      g.instruments.useActive();
    }
  });
  await waitForStage(page, 'call_them');

  // 3. Call both disagreements, each the right way round.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('machinery_control');
    g.stations.open('atmosphere_control');
  });
  await page.locator('[data-call="real"][data-comp="berthing_mess"]').click();
  await page.locator('[data-call="sensor"][data-comp="radio_room"]').click();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await waitForStage(page, 'trace');

  // 4. Trace it to the damper that was left shut, and open it.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('berthing_mess');
    g.interact('damper_berthing_mess');
  });
  // 5. The restore objective is already satisfied the moment the damper opens —
  // the fans and scrubber were running all along, which is the point: the fault
  // was a boundary somebody left shut, not a broken machine. So the mission goes
  // straight through it to the verification.
  const lineup = await page.evaluate(() => window.__DEEPWATCH__.state.ventilationRoutes);
  expect(lineup.supply && lineup.scrubber).toBe(true);
  await waitForStage(page, 'verify');

  // 6. Wait for the air to actually come back, then measure it by hand.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(900);
    g.goTo('berthing_mess');
    g.inventory.setActive('gas_detector');
    g.instruments.useActive();
  });

  await expect(page.locator('#debrief')).toBeVisible({ timeout: 15000 });
  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.mission_06_atmosphere?.score ?? null);
  expect(score).toBeGreaterThan(50);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});
