import { test, expect } from '@playwright/test';

/**
 * Mission 4 — Forward Flooding, end to end.
 *
 * The mission is played the way a player plays it: real station DOM is clicked,
 * real interactables are fired, real instruments are read. Only two things are
 * shortcut, both because headless Chromium cannot do them reliably:
 *   - walking (pointer lock) → `goTo(compartment)` teleports and fires the same
 *     compartment-entered event the player's own movement would;
 *   - waiting (the watch clock advances at 1 s of real time per 1 s of watch
 *     time) → `advance(seconds)` runs the identical fixed step, faster.
 * Every stage still has to be satisfied by a physical fact in SubmarineState.
 */

const fatalErrors = [];

test.beforeEach(async ({ page }) => {
  fatalErrors.length = 0;
  page.on('pageerror', (err) => fatalErrors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (/favicon|Failed to load resource/i.test(text)) return;
    fatalErrors.push(text);
  });
  await page.goto('/');
  await page.waitForFunction(() => !!window.__DEEPWATCH__);
});

/** Start the flooding mission and wait for the first objective. */
async function startFlooding(page) {
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_04_flooding'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await expect(page.locator('#hud-objective')).toContainText(/sonar console/i);
}

/** Current mission stage id. */
const stageId = (page) => page.evaluate(() => window.__DEEPWATCH__.missions.current?.stage?.id ?? null);

async function waitForStage(page, id) {
  await page.waitForFunction(
    (want) => window.__DEEPWATCH__.missions.current?.stage?.id === want,
    id, { timeout: 20000 });
}

/** Open a station overlay, run a body callback, then step back. */
async function atStation(page, station, fn) {
  await page.evaluate((s) => window.__DEEPWATCH__.stations.open(s), station);
  await expect(page.locator('#station-overlay')).toBeVisible();
  await fn();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  await expect(page.locator('#station-overlay')).toBeHidden();
}

// ---------------------------------------------------------------------------

test('mission seeds a real casualty in the forward bilge', async ({ page }) => {
  await startFlooding(page);
  const s = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return {
      sources: g.flooding.sources.length,
      compartment: g.flooding.sources[0].compartment,
      inflow: g.flooding.totalInflow('forward_equipment'),
      level: g.state.bilgeLevels.forward_equipment,
      startedIn: g.compartments.currentId,
    };
  });
  expect(s.sources).toBe(1);
  expect(s.compartment).toBe('forward_equipment');
  expect(s.inflow).toBeGreaterThan(30);
  expect(s.level).toBeGreaterThan(0);
  expect(s.startedIn).toBe('sonar_room');
});

test('the inflow beats every pump the boat can bring to bear', async ({ page }) => {
  await startFlooding(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.bilgePumpFwd.on = true;
    g.state.pumpStates.portablePump.deployedIn = 'forward_equipment';
    g.state.pumpStates.portablePump.on = true;
    return {
      inflow: g.flooding.totalInflow('forward_equipment'),
      removal: g.flooding.removalFor('forward_equipment'),
      rate: g.flooding.riseRateCmPerMin('forward_equipment'),
    };
  });
  // Both pumps running and the level still climbs — this is what forces the
  // player to stop the source rather than out-pump it.
  expect(r.removal).toBe(45);
  expect(r.inflow).toBeGreaterThan(r.removal);
  expect(r.rate).toBeGreaterThan(0);
});

test('a soft patch on a pressurised line blows off; on an isolated line it holds', async ({ page }) => {
  await startFlooding(page);
  const blown = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const src = g.flooding.sources[0];
    g.flooding.applyRepair(src, 'soft_patch');
    const immediately = src.repair.holding;
    g.advance(30);
    return { immediately, after: !!src.repair, rate: g.flooding.sourceRate(src) };
  });
  expect(blown.immediately).toBe(true);
  expect(blown.after).toBe(false);          // it let go
  expect(blown.rate).toBeGreaterThan(30);   // and the flooding is back to full

  const held = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const src = g.flooding.sources[0];
    g.state.valveStates.fwd_sw_supply_inbd = 'shut';
    g.state.valveStates.fwd_sw_supply_outbd = 'shut';
    g.flooding.applyRepair(src, 'soft_patch');
    g.advance(30);
    return { holding: !!src.repair?.holding, rate: g.flooding.sourceRate(src) };
  });
  expect(held.holding).toBe(true);
  expect(held.rate).toBe(0);
});

test('isolating the seawater header takes sonar-array cooling with it', async ({ page }) => {
  await startFlooding(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const before = g.state.compartmentTemperature.sonar_electronics ?? 26;
    g.state.valveStates.fwd_sw_supply_inbd = 'shut';
    g.state.valveStates.fwd_sw_supply_outbd = 'shut';
    g.advance(240);
    const hot = g.state.compartmentTemperature.sonar_electronics;
    g.state.valveStates.sw_crossconnect = 'open';
    g.advance(240);
    return { before, hot, cooled: g.state.compartmentTemperature.sonar_electronics };
  });
  expect(r.hot).toBeGreaterThan(r.before + 5);
  expect(r.cooled).toBeLessThan(r.hot);
});

test('water reaching the forward power panel trips it and kills the installed pump', async ({ page }) => {
  await startFlooding(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.pumpStates.bilgePumpFwd.on = true;
    g.state.bilgeLevels.forward_equipment = 44;
    g.advance(120);
    return {
      tripped: g.state.electricalPanels.fwd_power_2f.tripped,
      pumpOn: g.state.pumpStates.bilgePumpFwd.on,
      capacity: g.flooding.removalFor('forward_equipment'),
    };
  });
  expect(r.tripped).toBe(true);
  expect(r.pumpOn).toBe(false);
  expect(r.capacity).toBe(0);
});

// ---------------------------------------------------------------------------

test('full playthrough: symptom → trace → discovery → estimate → isolate → patch → dewater → verify → debrief', async ({ page }) => {
  test.setTimeout(120000);
  await startFlooding(page);

  // --- 1. Sonar: classify the new broadband source as an own-ship noise. ---
  await page.evaluate(() => window.__DEEPWATCH__.goTo('sonar_room'));
  await atStation(page, 'sonar', async () => {
    await expect(page.locator('#sonar-contacts')).toContainText('N01');
    await expect(page.locator('#bearing-note')).toContainText(/relative bearing has not moved/i);
    await page.locator('[data-call="internal"]').click();
  });
  // Objective 1 covers both symptoms, so it stays put until Control is logged too.
  expect(await stageId(page)).toBe('symptoms');

  // --- 2. Control: log the watch indications. ---
  await page.evaluate(() => window.__DEEPWATCH__.goTo('control_room'));
  await atStation(page, 'control', async () => {
    await expect(page.locator('#cr-indications')).toContainText(/bow-down/i);
    await page.locator('#cr-log').click();
  });
  await waitForStage(page, 'locate');

  // --- 3. Pick up the probe, and choose gear out of the control-room locker. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('acoustic_probe'));
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('dc_locker', { contents: 'control' }));
  await page.locator('[data-take="sounding_tape"]').click();
  await page.locator('[data-take="salinity_probe"]').click();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  expect(await stageId(page)).toBe('locate');

  // --- 4. Acoustic trace: read forward through the boat, loudest at the source. ---
  const trace = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    g.inventory.setActive('acoustic_probe');
    const out = [];
    for (const c of ['control_room', 'sonar_room', 'sonar_electronics', 'forward_equipment']) {
      g.goTo(c);
      out.push({ c, dB: g.instruments.useActive().numeric });
      g.advance(4);
    }
    return out;
  });
  // Monotonically louder toward the casualty — the gradient IS the evidence.
  for (let i = 1; i < trace.length; i++) expect(trace[i].dB).toBeGreaterThan(trace[i - 1].dB);
  expect(trace[trace.length - 1].c).toBe('forward_equipment');
  expect(await stageId(page)).toBe('locate');

  // --- 5. Lift the deck plate. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('deckplate_fwd'));
  expect(await page.evaluate(() => window.__DEEPWATCH__.flooding.sources[0].discovered)).toBe(true);
  await waitForStage(page, 'first_actions');
  await expect(page.locator('#hud-casualty')).toBeVisible();

  // --- 6. Report on the 7MC. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('handset_fwd'));
  expect(await stageId(page)).toBe('first_actions');

  // --- 7. Secure the forward power panel before the water gets to it. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('fwd_power_2f'));
  expect(await page.evaluate(() => window.__DEEPWATCH__.state.electricalPanels.fwd_power_2f.energized)).toBe(false);
  await waitForStage(page, 'measure');

  // --- 8. Measure: two soundings, salinity, and the manifold pressures. ---
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('dc_locker', { contents: 'forward' }));
  for (const id of ['pressure_gauge', 'soft_patch', 'portable_pump']) {
    await page.locator(`[data-take="${id}"]`).click();
  }
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());

  const measured = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const readWith = (id) => { g.inventory.setActive(id); return g.instruments.useActive(); };
    const first = readWith('sounding_tape');
    g.advance(45);                       // let the level move
    const second = readWith('sounding_tape');
    const sal = readWith('salinity_probe');
    const press = readWith('pressure_gauge');
    return {
      first: first.numeric, second: second.numeric,
      dtMin: second.minutes - first.minutes,
      salinity: sal.numeric, pressureNote: press.note,
    };
  });
  expect(measured.second).toBeGreaterThan(measured.first);
  expect(measured.dtMin).toBeGreaterThan(0.4);
  expect(measured.salinity).toBeGreaterThan(28);
  expect(measured.pressureNote).toMatch(/lost pressure/i);
  await waitForStage(page, 'work_the_board');

  // --- 9. Diagnosis at the plotting board. A wrong call is survivable. ---
  await atStation(page, 'dc_board', async () => {
    await page.locator('[data-tab="diagnosis"]').click();
    await page.locator('[data-call="hull"]').click();
    await expect(page.locator('#hyp-feedback')).toContainText(/does not fit/i);
    await page.locator('[data-call="sw_branch"]').click();
    await expect(page.locator('#hyp-feedback')).toContainText(/Ruptured forward seawater-supply branch/i);
  });
  expect(await stageId(page)).toBe('work_the_board');

  // --- 10. Estimate: two routes, then the verdict. ---
  await atStation(page, 'dc_board', async () => {
    await page.locator('[data-tab="estimate"]').click();
    await expect(page.locator('#est-a-out')).not.toHaveText('—');
    await expect(page.locator('#est-b-out')).not.toHaveText('—');
    await page.locator('[data-verdict="cannot"]').click();
  });
  expect(await stageId(page)).toBe('work_the_board');

  // --- 11. Boundaries: know what those valves feed before shutting them. ---
  await atStation(page, 'dc_board', async () => {
    await page.locator('[data-tab="boundaries"]').click();
    await expect(page.locator('.pipe-diagram')).toContainText('RUPTURE');
    await page.locator('#ack-bounds').click();
  });
  await waitForStage(page, 'isolate');

  // --- 12. Isolate both sides. One side alone must not satisfy it. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('fwd_sw_supply_inbd'));
  expect(await stageId(page)).toBe('isolate');
  await page.evaluate(() => window.__DEEPWATCH__.interact('fwd_sw_supply_outbd'));
  await waitForStage(page, 'patch');

  // --- 13. Patch the (now dead) line. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('rupture_fwd_sw'));
  await waitForStage(page, 'dewater');
  expect(await page.evaluate(() => window.__DEEPWATCH__.flooding.stopped)).toBe(true);

  // --- 14. Rig the portable pump in the sump. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('sump_fwd'));
  expect(await stageId(page)).toBe('dewater');

  // --- 15. Verify at the casualty: sound it again, falling and under 12 cm. ---
  const drained = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(240);
    g.inventory.setActive('sounding_tape');
    const r = g.instruments.useActive();
    return { level: r.numeric, rate: g.flooding.riseRateCmPerMin() };
  });
  expect(drained.level).toBeLessThan(12);
  expect(drained.rate).toBeLessThan(0);
  await waitForStage(page, 'verify');

  // --- 16. Verify the dependency: restore cooling, confirm with the IR gun. ---
  await page.evaluate(() => window.__DEEPWATCH__.interact('sw_crossconnect'));
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(120);
    g.goTo('sonar_electronics');
    g.interact('ir_thermometer');
    g.inventory.setActive('ir_thermometer');
    g.instruments.useActive();
  });
  expect(await stageId(page)).toBe('verify');

  // --- 17. Verify at sonar: flow noise gone and the boat quiet again. ---
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.interact('sump_fwd');       // secure the portable pump — it costs 3 dB
    g.advance(60);
    g.goTo('sonar_room');
  });
  await page.waitForTimeout(900);   // the verify checklist re-checks on a timer
  const quiet = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return {
      floor: g.state.sonarNoiseFloor,
      flow: g.state.machineryNoiseSources.some((n) => n.id === 'flood_flow'),
    };
  });
  expect(quiet.flow).toBe(false);
  expect(quiet.floor).toBeLessThan(50);

  // --- 18. Verify at control: trim back, planes no longer fighting. ---
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.advance(120);
    g.goTo('control_room');
  });
  await page.waitForTimeout(900);
  const recovered = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return { trim: Math.abs(g.state.trim), effort: g.state.depthControlEffort() };
  });
  expect(recovered.trim).toBeLessThan(0.3);
  expect(recovered.effort).toBeLessThan(32);

  // --- 19. File the report from the notebook and take the debrief. ---
  await page.keyboard.press('KeyN');
  await expect(page.locator('#notebook')).toBeVisible();
  await page.locator('[data-ntab="report"]').click();
  await expect(page.locator('.report-chain')).toContainText('Forward Equipment');
  await page.locator('#btn-submit-report').click();

  await expect(page.locator('#debrief')).toBeVisible();
  await expect(page.locator('.debrief-score .ds-num')).not.toHaveText('0');
  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.mission_04_flooding?.score ?? null);
  expect(score).toBeGreaterThan(50);

  // The evidence chain must actually reconstruct the reasoning, and the score
  // breakdown must dock the deliberate wrong diagnosis call made in step 9.
  await expect(page.locator('.debrief-chain')).toContainText(/seawater/i);
  await expect(page.locator('.score-row').filter({ hasText: 'Diagnosis' }))
    .toContainText(/incorrect call/i);

  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

test('the tool stage names what is still missing, and one locker can supply all three', async ({ page }) => {
  await startFlooding(page);
  // Skip to the tool stage without touching any pickups.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.bus.emit('sonar:anomalyClassified', { internal: true, id: 'N01' });
    g.bus.emit('control:indicationsLogged', {});
  });
  await waitForStage(page, 'locate');

  // With nothing carried, the objective card must name all three by name.
  await expect(page.locator('#hud-objective')).toContainText('Acoustic Probe');
  await expect(page.locator('#hud-objective')).toContainText('Sounding Tape');
  await expect(page.locator('#hud-objective')).toContainText('Salinity Probe');

  // Take two: the card must name only the one still outstanding.
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('dc_locker', { contents: 'control' }));
  await page.locator('[data-take="sounding_tape"]').click();
  await page.locator('[data-take="salinity_probe"]').click();
  await expect(page.locator('#hud-objective')).toContainText('draw Acoustic Probe from a DC locker');
  await expect(page.locator('#hud-objective')).not.toContainText('Sounding Tape');

  // The same locker carries the third — the shelf pickup can never be a blocker.
  await page.locator('[data-take="acoustic_probe"]').click();
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());
  // Tools done; the objective stays on `locate` for the trace and the deck plate.
  await expect(page.locator('#hud-objective')).toContainText('acoustic readings in at least three compartments');
  expect(await stageId(page)).toBe('locate');
});

test('a stage that is already satisfied when it arms completes only itself', async ({ page }) => {
  await startFlooding(page);
  // Carry all three tools BEFORE the tool stage arms. Its initial check passes
  // immediately, on a queued microtask — which must not also complete the
  // acoustic-trace stage behind it.
  const seen = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const completed = [];
    g.bus.on('mission:stageComplete', (s) => completed.push(s.id));
    ['acoustic_probe', 'sounding_tape', 'salinity_probe'].forEach((i) => g.inventory.add(i, i));
    g.bus.emit('sonar:anomalyClassified', { internal: true, id: 'N01' });
    g.bus.emit('control:indicationsLogged', {});
    await new Promise((r) => setTimeout(r, 200));
    return { completed, stage: g.missions.current.stage.id };
  });
  // The symptoms objective completes on its own; carrying the tools must NOT
  // also complete `locate` behind it, because the water has not been found.
  expect(seen.completed).toEqual(['symptoms']);
  expect(seen.stage).toBe('locate');
});

test('two soundings taken too close together do not make a rate, and say so', async ({ page }) => {
  await startFlooding(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('forward_equipment');
    g.interact('deckplate_fwd');
    g.inventory.add('sounding_tape', 'Sounding Tape');
    g.inventory.setActive('sounding_tape');
    const first = g.instruments.useActive();
    g.advance(4);                       // a few seconds — nowhere near an interval
    const tooSoon = g.instruments.useActive();
    g.advance(40);                      // now a real interval
    const proper = g.instruments.useActive();
    return {
      firstValid: first.valid,
      tooSoonNote: tooSoon.note,
      properNote: proper.note,
      gap: proper.minutes - tooSoon.minutes,
    };
  });
  expect(r.firstValid).toBe(true);
  // The instrument must explain itself rather than looking broken.
  expect(r.tooSoonNote).toMatch(/too close together to give a rate/i);
  expect(r.properNote).toMatch(/Up [\d.]+ cm in [\d.]+ min/i);
  expect(r.gap).toBeGreaterThan(0.4);
});

test('the measurement stage lists exactly which readings are still outstanding', async ({ page }) => {
  await startFlooding(page);
  // Jump to the measurement stage.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.bus.emit('sonar:anomalyClassified', { internal: true, id: 'N01' });
    g.bus.emit('control:indicationsLogged', {});
    ['acoustic_probe', 'sounding_tape', 'salinity_probe'].forEach((i) => g.inventory.add(i, i));
    g.goTo('forward_equipment');
  });
  await waitForStage(page, 'locate');
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.setActive('acoustic_probe');
    for (const c of ['control_room', 'sonar_room', 'forward_equipment']) {
      g.goTo(c); g.instruments.useActive();
    }
  });
  await waitForStage(page, 'locate');
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.interact('deckplate_fwd');
    g.interact('handset_fwd');
    g.interact('fwd_power_2f');
  });
  await waitForStage(page, 'measure');

  // Nothing measured yet: all four wanted items named.
  await expect(page.locator('#hud-objective')).toContainText('a first sounding of this bilge');
  await expect(page.locator('#hud-objective')).toContainText('the salinity of the water');
  await expect(page.locator('#hud-objective')).toContainText('the manifold pressures');

  // One sounding, then a second far too soon: the card must call out the interval.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.inventory.setActive('sounding_tape');
    g.instruments.useActive();
    g.advance(3);
    g.instruments.useActive();
  });
  await expect(page.locator('#hud-objective')).toContainText(/a second sounding at least \d+ s after the first/i);
  expect(await stageId(page)).toBe('measure');
});

test('pressing H lights up where the player has to go', async ({ page }) => {
  await startFlooding(page);
  await page.evaluate(() => window.__DEEPWATCH__.goTo('sonar_room'));

  // Nothing lit before the hint is asked for.
  expect(await page.evaluate(() => window.__DEEPWATCH__.hintBeacon.active)).toBe(false);

  // Stage 1's target is a sonar console, in the compartment the player is in.
  await page.keyboard.press('KeyH');
  const first = await page.evaluate(() => {
    const b = window.__DEEPWATCH__.hintBeacon;
    return { active: b.active, compartment: b.targetCompartment, z: b.target.z, visible: b.group.visible };
  });
  expect(first.active).toBe(true);
  expect(first.visible).toBe(true);
  expect(first.compartment).toBe('sonar_room');
  await expect(page.locator('#hud-hint')).toContainText(/Here, in Sonar Room/i);

  // Advance a stage: the beacon must follow the new objective, not the old one.
  // Objective 1 needs both symptoms, so both are supplied here.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.bus.emit('sonar:anomalyClassified', { internal: true, id: 'N01' });
    g.bus.emit('control:indicationsLogged', {});
  });
  await waitForStage(page, 'locate');
  expect(await page.evaluate(() => window.__DEEPWATCH__.hintBeacon.active)).toBe(false);

  await page.keyboard.press('KeyH');
  const second = await page.evaluate(() => {
    const b = window.__DEEPWATCH__.hintBeacon;
    return { compartment: b.targetCompartment, chevrons: b.chevrons.filter((c) => c.visible).length };
  });
  // Objective 2 starts at the control-room DC locker.
  expect(second.compartment).toBe('control_room');
  // Control is aft of sonar, so a trail should be laid down the centreline.
  expect(second.chevrons).toBeGreaterThan(0);
  await expect(page.locator('#hud-hint')).toContainText(/Aft of you, in Control Room/i);

  // Each hint is still charged against the score.
  expect(await page.evaluate(() => window.__DEEPWATCH__.missions.current.hintsUsed)).toBe(2);

  // Arriving clears the trail but leaves the marker on the thing itself. The
  // target is the control-room DC locker, so walk to the locker rather than
  // stopping in the middle of the compartment.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const c = g.layout.find((x) => x.id === 'control_room');
    g.goTo('control_room');
    g.player.setPose(0, c.zStart + 0.6, 0);
    g.compartments.update(g.player.position.z);
    g.hintBeacon.update(0.1, 1, g.player.position);
  });
  const arrived = await page.evaluate(() => {
    const b = window.__DEEPWATCH__.hintBeacon;
    return { active: b.active, chevrons: b.chevrons.filter((c) => c.visible).length };
  });
  expect(arrived.active).toBe(true);
  expect(arrived.chevrons).toBe(0);

  // It is temporary: it times out and puts the compartment lighting back.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    for (let i = 0; i < 300; i++) g.hintBeacon.update(0.1, i * 0.1, g.player.position);
  });
  expect(await page.evaluate(() => window.__DEEPWATCH__.hintBeacon.active)).toBe(false);
  expect(await page.evaluate(() => !!window.__DEEPWATCH__.hintBeacon._savedLight)).toBe(false);
});

test('mission progress is saved under the Deep Watch key only', async ({ page }) => {
  await startFlooding(page);
  await page.evaluate(() => window.__DEEPWATCH__.save.markMissionComplete('mission_04_flooding', { score: 77 }));
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('deepwatch.progress.v1')));
  expect(stored.completedMissions.mission_04_flooding.score).toBe(77);
  const reckonKeys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('reckon')));
  expect(reckonKeys).toEqual([]);
});

test('restarting the mission puts the boat back to a clean condition', async ({ page }) => {
  await startFlooding(page);
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.interact('deckplate_fwd');
    g.state.valveStates.fwd_sw_supply_inbd = 'shut';
    g.advance(60);
  });
  const dirty = await page.evaluate(() => window.__DEEPWATCH__.state.bilgeLevels.forward_equipment);
  expect(dirty).toBeGreaterThan(6);

  await page.evaluate(() => window.__DEEPWATCH__.missions.restart());
  const clean = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return {
      level: g.state.bilgeLevels.forward_equipment,
      valve: g.state.valveStates.fwd_sw_supply_inbd,
      sources: g.flooding.sources.length,
      plateOpen: g.world.bilges.get('forward_equipment').plateRecord.data.open,
      notebook: g.notebook.entries.length,
      carrying: g.inventory.list().length,
      stage: g.missions.current.stage.id,
    };
  });
  // Back to the seeded 6 cm (the running loop may have ticked once since).
  expect(clean.level).toBeGreaterThanOrEqual(6);
  expect(clean.level).toBeLessThan(6.5);
  expect(clean.valve).toBe('open');
  expect(clean.sources).toBe(1);
  expect(clean.plateOpen).toBe(false);
  expect(clean.notebook).toBe(0);
  expect(clean.carrying).toBe(0);
  expect(clean.stage).toBe('symptoms');
});
