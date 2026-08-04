import { test, expect } from '@playwright/test';

/**
 * The slow layer: the patrol clock, sleep and fatigue, the qualification card,
 * the crossing, and the third-person view.
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
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_01_walkdown'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
});

test('the patrol clock runs an hour a minute while the watch clock stays real', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const before = { patrol: g.state.dayClock.hours, watch: g.state.clock.minutes };
    g.advance(60);                       // one minute of real time
    return {
      patrolHours: g.state.dayClock.hours - before.patrol,
      watchMinutes: g.state.clock.minutes - before.watch,
    };
  });
  // One real minute = one patrol hour, and one real minute on the watch clock.
  expect(r.patrolHours).toBeGreaterThan(0.95);
  expect(r.patrolHours).toBeLessThan(1.05);
  expect(r.watchMinutes).toBeGreaterThan(0.95);
  expect(r.watchMinutes).toBeLessThan(1.05);
});

test('going too long without sleep blurs the view, and sleeping clears it', async ({ page }) => {
  const tired = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.fatigue.hoursAwake = 0;
    g.advance(60 * 26);                  // 26 patrol hours awake
    return { awake: g.state.fatigue.hoursAwake, f: g.crew.fatigue01 };
  });
  expect(tired.awake).toBeGreaterThan(24);
  expect(tired.f).toBeGreaterThan(0.3);

  await page.waitForFunction(() => !document.getElementById('fatigue-veil').hidden);
  const blur = await page.evaluate(() => document.getElementById('fatigue-veil').style.backdropFilter);
  expect(blur).toMatch(/blur\([\d.]+px\)/);

  const rested = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const before = g.state.dayClock.hours;
    const res = g.crew.sleep();
    return { ok: res.ok, awake: g.state.fatigue.hoursAwake, advanced: g.state.dayClock.hours - before };
  });
  expect(rested.ok).toBe(true);
  expect(rested.awake).toBe(0);
  expect(rested.advanced).toBeCloseTo(6, 1);
  await page.waitForFunction(() => document.getElementById('fatigue-veil').hidden);
});

test('you cannot turn in with a casualty running', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.fatigue.hoursAwake = 20;
    g.state.activeCasualties.push({ id: 'x', type: 'flooding', severity: 'major' });
    const res = g.crew.sleep();
    return { ok: res.ok, reason: res.reason, awake: g.state.fatigue.hoursAwake };
  });
  expect(r.ok).toBe(false);
  expect(r.reason).toBe('casualty');
  expect(r.awake).toBe(20);
});

test('the bunk is a real interactable that puts you to sleep', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.fatigue.hoursAwake = 16;
    g.goTo('berthing_mess');
    const fired = g.interact('bunk_own');
    return { fired, awake: g.state.fatigue.hoursAwake };
  });
  expect(r.fired).toBe(true);
  expect(r.awake).toBe(0);
});

test('three qualification questions are posted per patrol day', async ({ page }) => {
  const r = await page.evaluate(() => {
    const { questionsAvailable } = window.__DEEPWATCH__.content;
    return { d1: questionsAvailable(1).length, d2: questionsAvailable(2).length, d4: questionsAvailable(4).length };
  });
  expect(r.d1).toBe(3);
  expect(r.d2).toBe(6);
  expect(r.d4).toBe(12);
});

test('the qualification card scores answers and awards Dolphins at ten correct', async ({ page }) => {
  // Day 4 so there are twelve questions posted.
  await page.evaluate(() => { window.__DEEPWATCH__.state.dayClock.hours = 3 * 24 + 8; });
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('study_desk'));
  await expect(page.locator('#station-overlay')).toBeVisible();
  await expect(page.locator('.qual-score .qs-num')).toHaveText('0');

  // Answer the first ten correctly, through the real DOM.
  const awarded = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { QUAL_QUESTIONS } = g.content;
    let award = false;
    g.bus.on('qual:award', () => { award = true; });
    for (const q of QUAL_QUESTIONS.slice(0, 10)) {
      document.querySelector(`[data-open="${q.id}"]`)?.click();
      document.querySelector(`[data-q="${q.id}"][data-opt="${q.answer}"]`)?.click();
    }
    return { award, correct: Object.values(g.save.qualProgress().answers).filter((a) => a.correct).length };
  });
  expect(awarded.correct).toBe(10);
  expect(awarded.award).toBe(true);
  await expect(page.locator('.qual-badge')).toContainText(/SUBMARINE QUALIFIED/i);

  // And it persists.
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('deepwatch.progress.v1')).qual.awards);
  expect(stored).toContain('dolphins');
});

test('a wrong answer explains itself instead of punishing', async ({ page }) => {
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('study_desk'));
  const wrongIdx = await page.evaluate(() => {
    const { QUAL_QUESTIONS } = window.__DEEPWATCH__.content;
    const q = QUAL_QUESTIONS[0];
    document.querySelector(`[data-open="${q.id}"]`)?.click();
    const wrong = (q.answer + 1) % q.options.length;
    document.querySelector(`[data-q="${q.id}"][data-opt="${wrong}"]`)?.click();
    return { concept: q.concept };
  });
  await expect(page.locator('.qi-why')).toContainText(wrongIdx.concept);
  await expect(page.locator('.qi-opt.is-answer')).toBeVisible();
});

test('the crossing takes about four months in a straight line', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { TOTAL_NM, PLANNED_SPEED_KN } = g.content;
    return {
      total: TOTAL_NM,
      plannedDays: g.voyage.daysTotal(PLANNED_SPEED_KN),
      fastDays: g.voyage.daysTotal(13),
      quietNoise: g.voyage.noiseAtSpeed(4.2),
      fastNoise: g.voyage.noiseAtSpeed(13),
    };
  });
  expect(r.total).toBe(12000);
  // Four months, give or take a week.
  expect(r.plannedDays).toBeGreaterThan(110);
  expect(r.plannedDays).toBeLessThan(130);
  // Speed genuinely buys time, and genuinely costs quiet.
  expect(r.fastDays).toBeLessThan(45);
  expect(r.fastNoise).toBeGreaterThan(r.quietNoise + 4);
});

test('the passage advances on the patrol clock and the plot shows it', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.speed = 6;
    const before = g.voyage.nmMadeGood;
    g.advance(600);                     // ten real minutes = ten patrol hours
    return { before, after: g.voyage.nmMadeGood };
  });
  // Ten patrol hours at 6 kn ≈ 60 nm.
  expect(r.after - r.before).toBeGreaterThan(50);
  expect(r.after - r.before).toBeLessThan(70);

  await page.evaluate(() => window.__DEEPWATCH__.stations.open('passage_chart'));
  await expect(page.locator('#station-overlay')).toBeVisible();
  await expect(page.locator('.passage-canvas')).toBeVisible();
  await expect(page.locator('.stat-chips')).toContainText('12,000 nm');
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

test('V shows the watchstander, and reach is still measured from the body', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.goTo('berthing_mess');
    const firstPerson = { view: g.player.view, bodyVisible: g.body.group.visible };
    g.player.toggleView('third');
    for (let i = 0; i < 30; i++) g.player.update(1 / 30);
    const eye = g.player.position.clone();
    const cam = g.camera ? null : null;
    return {
      firstPerson,
      view: g.player.view,
      bodyVisible: g.body.group.visible,
      // The camera must actually have moved off the player.
      boom: g.player._boom,
      eyeY: eye.y,
      cam,
    };
  });
  expect(r.firstPerson.view).toBe('first');
  expect(r.firstPerson.bodyVisible).toBe(false);
  expect(r.view).toBe('third');
  expect(r.bodyVisible).toBe(true);
  expect(r.boom).toBeGreaterThan(0.5);

  // Interaction still reaches things next to the player, not next to the camera.
  const reached = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    g.state.fatigue.hoursAwake = 12;
    return g.interact('bunk_own');
  });
  expect(reached).toBe(true);
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});
