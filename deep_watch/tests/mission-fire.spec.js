import { test, expect } from '@playwright/test';

/**
 * Mission 5 — Electrical Fire, and the two systems under it.
 *
 * The point of the mission is that the agent does not put the fire out; removing
 * the ignition source does. These tests exercise that directly: a conductive agent
 * on a live circuit, a correct agent on a live circuit (knockdown then reflash),
 * and the same agent on a dead one (out, once it is also cold).
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
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_05_fire'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
};
const stageId = (page) => page.evaluate(() => window.__DEEPWATCH__.missions.current?.stage?.id ?? null);
const waitForStage = async (page, want, timeout = 20000) =>
  page.waitForFunction((w) => window.__DEEPWATCH__.missions.current?.stage?.id === w, want, { timeout });

test('the mission seeds a live electrical fire with smoke already in the space', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const f = g.fire.fires[0];
    return {
      count: g.fire.fires.length,
      compartment: f.compartment,
      energized: g.fire.isEnergized(f),
      smoke: g.atmosphere.air('electrical').smoke,
      co: g.atmosphere.air('electrical').co,
    };
  });
  expect(r.count).toBe(1);
  expect(r.compartment).toBe('electrical');
  expect(r.energized).toBe(true);
  expect(r.smoke).toBeGreaterThan(0.2);
  expect(r.co).toBeGreaterThan(50);
});

test('a fire left alone eats the atmosphere it is burning in', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const before = { ...g.atmosphere.air('electrical') };
    g.advance(90);
    const after = { ...g.atmosphere.air('electrical') };
    return { before, after, intensity: g.fire.fires[0].intensity };
  });
  expect(r.after.co).toBeGreaterThan(r.before.co);
  expect(r.after.o2).toBeLessThan(r.before.o2);
  expect(r.after.tempC).toBeGreaterThan(r.before.tempC);
  expect(r.intensity).toBeGreaterThan(0.3);
});

test('a conductive agent on a live circuit is a shock hazard, not a suppression', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    let shock = null;
    g.bus.on('fire:shockHazard', (p) => { shock = p; });
    g.inventory.add('ext_afff', 'AFFF Extinguisher', 'gear');
    g.inventory.setActive('ext_afff');
    g.goTo('electrical');
    const res = g.fireControl.attack('electrical');
    const f = g.fire.fires[0];
    return { res, shock: !!shock, burning: f.intensity > 0.05, tripped: g.state.electricalPanels.aft_dist_2a.tripped };
  });
  expect(r.shock).toBe(true);
  expect(r.res.shock).toBe(true);
  // The protection tripping is not the same as isolating, and the fire is still lit.
  expect(r.burning).toBe(true);
});

test('CO2 on a live circuit knocks it down, and it comes straight back', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    let reflash = 0;
    g.bus.on('fire:reflash', () => { reflash += 1; });
    g.inventory.add('ext_co2', 'CO₂ Extinguisher', 'gear');
    g.inventory.setActive('ext_co2');
    g.goTo('electrical');
    const res = g.fireControl.attack('electrical');
    const knocked = g.fire.fires[0].intensity;
    g.advance(30);                       // longer than the reflash delay
    return { res, knocked, reflash, after: g.fire.fires[0].intensity };
  });
  expect(r.res.knockdown).toBe(true);
  expect(r.res.energized).toBe(true);
  expect(r.knocked).toBeLessThan(0.05);
  expect(r.reflash).toBe(1);
  expect(r.after).toBeGreaterThan(0.1);
});

test('de-energize first and the same bottle ends it — once it is also cold', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    let out = false;
    g.bus.on('fire:out', () => { out = true; });
    // Open the panel feeding it, at the handle.
    g.goTo('electrical');
    g.interact('aft_dist_2a');
    const energized = g.fire.isEnergized(g.fire.fires[0]);

    g.inventory.add('ext_co2', 'CO₂ Extinguisher', 'gear');
    g.inventory.setActive('ext_co2');
    const res = g.fireControl.attack('electrical');
    const immediatelyOut = out;          // still hot at this point
    g.advance(240);                      // let the seat cool
    return {
      energized, res, immediatelyOut, out,
      seat: g.fire.fires[0].seatTempC,
      extinguished: g.fire.fires[0].extinguished,
    };
  });
  expect(r.energized).toBe(false);
  expect(r.res.knockdown).toBe(true);
  // Dark is not out: the casualty is only over once the seat is cold.
  expect(r.immediatelyOut).toBe(false);
  expect(r.out).toBe(true);
  expect(r.seat).toBeLessThan(90);
  expect(r.extinguished).toBe(true);
});

test('the switchboard names the zone, and refuses to restore a load with its bus open', async ({ page }) => {
  // Several DOM round-trips plus a cold start; the default 30 s is not enough
  // headroom in this environment and the failure looks like a missing element.
  test.setTimeout(90000);
  await start(page);
  await page.evaluate(() => { window.__DEEPWATCH__.goTo('electrical'); window.__DEEPWATCH__.stations.open('electrical'); });
  await expect(page.locator('#station-overlay')).toBeVisible();

  // Zones face: marking the wrong panel says why it is wrong.
  await page.locator('[data-etab="panels"]').click();
  await page.locator('[data-zone="fwd_power_2f"]').click();
  await expect(page.locator('#esb-msg')).toContainText(/not where the casualty is/i);
  await page.locator('[data-zone="aft_dist_2a"]').click();
  await expect(page.locator('#esb-msg')).toContainText(/that is the zone/i);

  // Open the zone from the board, then try to restore a load whose bus is open.
  await page.locator('[data-panel="aft_dist_2a"]').click();
  await page.locator('[data-etab="buses"]').click();
  await page.locator('[data-bus="vital"]').click();          // trip the vital bus
  await page.locator('[data-etab="loads"]').click();
  await page.locator('[data-load="lighting"]').click();
  await expect(page.locator('#esb-msg')).toContainText(/will not hold in/i);
});

test('working in smoke without going on air impairs you; the manifold fixes it', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('electrical');
    g.advance(30);
    const exposed = { impairment: g.state.smokeImpairment, onAir: g.state.playerOnAir };
    g.interact('eab_electrical');
    g.advance(20);
    return { exposed, onAir: g.state.playerOnAir, after: g.state.smokeImpairment };
  });
  expect(r.exposed.onAir).toBe(false);
  expect(r.exposed.impairment).toBeGreaterThan(0.1);
  expect(r.onAir).toBe(true);
  expect(r.after).toBeLessThan(r.exposed.impairment);
});

test('boundary cooling only does something from the compartment next door', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(60);
    const hotBefore = g.fire.boundaryTempC('propulsion');
    const inFire = g.fireControl.coolBoundary('electrical');   // wrong side
    const nextDoor = g.fireControl.coolBoundary('propulsion'); // right side
    g.advance(60);
    return { hotBefore, inFire, nextDoor, hotAfter: g.fire.boundaryTempC('propulsion') };
  });
  expect(r.hotBefore).toBeGreaterThan(40);
  expect(r.inFire).toBe(false);
  expect(r.nextDoor).toBe(true);
  expect(r.hotAfter).toBeLessThan(r.hotBefore);
});

test('mission 5 plays through: air, zone, isolate, prove, attack, boundaries, reflash watch, restore', async ({ page }) => {
  test.setTimeout(120000);
  await start(page);
  expect(await stageId(page)).toBe('protect_yourself');

  // 1. On air, and carrying gear that will not electrocute anybody.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('machinery_control');
    g.interact('eab_machinery_control');
    g.stations.open('dc_locker', { contents: 'machinery' });
  });
  for (const id of ['ext_co2', 'multimeter', 'ir_thermometer']) {
    await page.locator(`[data-take="${id}"]`).click();
  }
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await waitForStage(page, 'find_the_zone');

  // 2. Eyes on it, then name the zone at the switchboard.
  await page.evaluate(() => window.__DEEPWATCH__.goTo('electrical'));
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('electrical'));
  await page.locator('[data-etab="panels"]').click();
  await page.locator('[data-zone="aft_dist_2a"]').click();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await waitForStage(page, 'isolate');

  // 3. De-energize at the panel handle.
  await page.evaluate(() => window.__DEEPWATCH__.interact('aft_dist_2a'));
  await waitForStage(page, 'prove_it');

  // 4. Prove it with a meter rather than a lamp.
  const volts = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.setActive('multimeter');
    return g.instruments.useActive().numeric;
  });
  expect(volts).toBeLessThan(1);
  await waitForStage(page, 'attack');

  // 5. Put it out with the non-conductive bottle.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.setActive('ext_co2');
    g.fireControl.attack('electrical');
  });
  await waitForStage(page, 'boundaries');

  // 6. Boundaries: read the bulkhead next door, then cool it.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('propulsion');
    g.inventory.setActive('ir_thermometer');
    g.instruments.useActive();
    g.interact('hose_propulsion');
  });
  await waitForStage(page, 'reflash_watch');

  // 7. Reflash watch: cool, then read the seat itself.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(240);
    g.goTo('electrical');
    g.inventory.setActive('ir_thermometer');
    g.instruments.useActive();
  });
  await waitForStage(page, 'restore');

  // 8. Clear the smoke and restore power in order.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.atmosphere.setDamper('electrical', true);
    g.advance(300);                       // fans clear the compartment
    g.stations.open('electrical');
  });
  await page.locator('[data-etab="panels"]').click();
  await page.locator('[data-panel="aft_dist_2a"]').click();     // close the zone again
  await page.locator('[data-etab="loads"]').click();
  await page.locator('[data-load="lighting"]').click();
  await page.locator('[data-load="vent_fans"]').click();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());

  await expect(page.locator('#debrief')).toBeVisible({ timeout: 15000 });
  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.mission_05_fire?.score ?? null);
  expect(score).toBeGreaterThan(50);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

test('no mission posts more than ten objectives', async ({ page }) => {
  // A mission card is a list of work, not a wizard. Ten is the ceiling.
  const tooLong = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return g.missions.list()
      .map((m) => ({ id: m.id, stages: g.missions.get(m.id).stages.length }))
      .filter((m) => m.stages > 10);
  });
  expect(tooLong).toEqual([]);
});
