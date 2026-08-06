import { test, expect } from '@playwright/test';

/**
 * Command Episode 2 — Compound Casualty.
 *
 * Five casualties, one player, and a set of teams who are slower than they are.
 * These tests check the things that make it a command problem rather than a
 * checklist: the blocked passage is real, a team sent to the wrong trade wastes
 * the trip, a blocked task cannot be worked until its blocker clears, and the
 * priority order is scored on dependency as well as on life safety.
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
  await page.evaluate(() => window.__DEEPWATCH__.startMission('episode_02_compound'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
};
const waitForStage = async (page, want, timeout = 25000) =>
  page.waitForFunction((w) => window.__DEEPWATCH__.missions.current?.stage?.id === w, want, { timeout });

/**
 * Stepping back from a console asks for pointer lock again, and headless Chrome
 * will not grant it — so the game pauses, exactly as it would if a real player
 * clicked away. Escape resumes, which is what a player does too.
 */
const ensurePlaying = async (page) => {
  if (await page.evaluate(() => window.__DEEPWATCH__.getMode()) === 'paused') {
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  }
};

test('the episode starts with five casualties that interact', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    return {
      tasks: [...g.teams.tasks.values()].map((t) => ({ id: t.id, kind: t.kind, blockedBy: t.blockedBy })),
      flooding: g.flooding.sources.length,
      stbd: g.state.electricalBuses.stbdMain.energized,
      uncertainty: g.state.navigationUncertainty,
      injured: g.state.activeCasualties.some((c) => c.type === 'injury'),
    };
  });
  expect(r.tasks).toHaveLength(4);
  expect(r.flooding).toBe(1);
  expect(r.stbd).toBe(false);
  expect(r.uncertainty).toBeGreaterThan(1.5);
  expect(r.injured).toBe(true);
  // The flooding is behind the blockage. That dependency is the whole episode.
  expect(r.tasks.find((t) => t.id === 'task_flood').blockedBy).toBe('task_debris');
});

test('the blocked passage physically stops the player getting aft', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const c = g.layout.find((x) => x.id === 'propulsion');
    const walk = () => {
      g.player.setPose(0, c.zStart + 0.35, 180);
      g.player.enabled = true;
      g.player.keys.add('KeyW');
      for (let i = 0; i < 400; i++) g.player.update(1 / 30);
      g.player.keys.clear();
      return g.player.position.z;
    };
    const blocked = walk();
    g.world.setPassageBlocked('propulsion', false);
    const clear = walk();
    return { blocked, clear, zEnd: c.zEnd };
  });
  // Blocked: stopped near the forward end. Clear: makes it down the compartment.
  expect(r.blocked).toBeLessThan(r.clear - 1.5);
  expect(r.clear).toBeGreaterThan(r.blocked + 1.5);
});

test('a team sent outside its trade walks there, cannot help, and says so', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const reports = [];
    g.bus.on('teams:report', (p) => reports.push(p.text));
    const res = g.teams.assign('corpsman', 'task_power');   // wrong trade, allowed
    g.advance(120);
    return { res, reports, done: g.teams.task('task_power').done };
  });
  expect(r.res.ok).toBe(true);
  expect(r.res.qualified).toBe(false);
  expect(r.done).toBe(false);
  expect(r.reports.join(' ')).toMatch(/wrong trade/i);
});

test('a blocked task cannot be worked until its blocker is cleared', async ({ page }) => {
  await start(page);
  const r = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const reports = [];
    g.bus.on('teams:report', (p) => reports.push(p.text));
    g.teams.assign('dc_party', 'task_flood');     // the passage is still blocked
    g.advance(120);
    const first = { done: g.teams.task('task_flood').done, reports: reports.slice() };

    // Clear the blockage, then send them again.
    g.teams.assign('auxiliaryman', 'task_debris');
    g.advance(200);
    g.teams.assign('dc_party', 'task_flood');
    g.advance(220);
    return { first, cleared: g.teams.task('task_debris').done, flood: g.teams.task('task_flood').done };
  });
  expect(r.first.done).toBe(false);
  expect(r.first.reports.join(' ')).toMatch(/passage is still blocked/i);
  expect(r.cleared).toBe(true);
  expect(r.flood).toBe(true);
});

test('the priority board scores dependency as well as life safety', async ({ page }) => {
  test.setTimeout(90000);
  await start(page);
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('control_room');
    g.stations.open('command_board');
  });
  await expect(page.locator('#station-overlay')).toBeVisible();

  // Flooding before the blockage that is in front of it, and power before people.
  for (const id of ['task_power', 'task_flood', 'task_debris', 'task_injury']) {
    await page.locator(`[data-pick="${id}"]`).click();
  }
  await page.locator('#cb-commit').click();
  await expect(page.locator('#cb-msg')).toContainText(/out of sequence/i);
  const bad = await page.evaluate(() => window.__DEEPWATCH__.missions.current.flags.inversions);
  expect(bad).toBeGreaterThan(0);
});

test('episode 2 plays through: assess, prioritise, delegate, keep one, the water, report', async ({ page }) => {
  test.setTimeout(300000);
  await start(page);

  // 1. Read the board, then go and look at the blockage.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('control_room');
    g.stations.open('command_board');
    g.stations.close();
    g.goTo('propulsion');
  });
  await waitForStage(page, 'prioritise');

  // 2. Commit a defensible order: the man, the blockage, the water, the power.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('control_room');
    g.stations.open('command_board');
  });
  for (const id of ['task_injury', 'task_debris', 'task_flood', 'task_power']) {
    await page.locator(`[data-pick="${id}"]`).click();
  }
  await page.locator('#cb-commit').click();
  await expect(page.locator('#cb-msg')).toContainText(/defensible/i);
  await waitForStage(page, 'delegate');
  await page.evaluate(() => window.__DEEPWATCH__.stations.close());   // step back from the board
  await ensurePlaying(page);

  // 3. Delegate three of the four, each to a team that can actually do it.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.teams.assign('corpsman', 'task_injury');
    g.teams.assign('auxiliaryman', 'task_debris');
    g.teams.assign('electrician', 'task_power');
    g.advance(200);
  });
  await waitForStage(page, 'keep_one');

  // 4. The one that cannot be delegated: an independent fix.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('control_room');
    g.nav.takeFix('contour');
    g.nav.takeFix('contour');
  });
  await waitForStage(page, 'finish_flooding');

  // 5. The water: send the DC party now the passage is clear, and pump it out.
  await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.teams.assign('dc_party', 'task_flood');
    g.advance(200);                       // travel plus the work itself
    g.state.pumpStates.bilgePumpAft.on = true;
    g.advance(200);                       // and the pump takes the water out
  });
  await waitForStage(page, 'report_out');

  // 6. File it. Opened through the notebook's own API rather than with N: in
  // headless Chrome, resuming from the pause that a station close provokes asks
  // for pointer lock again, fails, and pauses again — and the notebook now
  // deliberately refuses to open underneath another panel. The DOM work that
  // matters (the report tab, the submit button) is still exercised.
  await page.evaluate(() => window.__DEEPWATCH__.notebook.toggle(true));
  await expect(page.locator('#notebook')).toBeVisible();
  await page.locator('[data-ntab="report"]').click();
  await page.locator('#btn-submit-report').click();

  await expect(page.locator('#debrief')).toBeVisible({ timeout: 15000 });
  const score = await page.evaluate(() =>
    window.__DEEPWATCH__.save.data.completedMissions.episode_02_compound?.score ?? null);
  expect(score).toBeGreaterThan(50);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});
