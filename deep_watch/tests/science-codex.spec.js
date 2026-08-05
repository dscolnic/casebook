import { test, expect } from '@playwright/test';

/**
 * The science codex: every object, every screen and every console must have an
 * explanation, reachable without leaving the game.
 *
 * The coverage test is the important one. Anything new placed in the boat — a
 * valve, a panel, a wall display — appears in the interactable list, and if it
 * has no entry this fails, which is the only way "every object" stays true after
 * the next feature.
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

test('every interactable object in the boat has a science entry', async ({ page }) => {
  const missing = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { resolveScienceKey, SCIENCE_NOTES } = g.content;
    return g.interactables()
      .filter(({ type, id }) => {
        const key = resolveScienceKey(type, id);
        return !key || !SCIENCE_NOTES[key];
      })
      .map(({ type, id }) => `${type}:${id}`);
  });
  expect(missing).toEqual([]);
});

test('every wall display is interactable and explains itself', async ({ page }) => {
  const r = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { SCIENCE_NOTES } = g.content;
    const panels = g.displays.displays;
    const records = g.displays.interactableRecords();
    return {
      panels: panels.length,
      records: records.length,
      unexplained: records.filter((rec) => !SCIENCE_NOTES[`display:${rec.data.display}`]).map((rec) => rec.id),
    };
  });
  expect(r.panels).toBeGreaterThan(8);
  expect(r.records).toBe(r.panels);      // every panel, not most of them
  expect(r.unexplained).toEqual([]);
});

/**
 * The two directions of the same promise: an explanation must describe numbers
 * that are actually on the screen, and a number on the screen must be explained.
 *
 * Forward direction is exact — every entry declares the on-screen text its number
 * refers to (or marks itself 'graphic' for a feature of the image, like the slope
 * of a waterfall streak, which has no text to match). Reverse direction is by
 * unit: any quantity drawn with a unit must have that unit accounted for in the
 * entry, which survives the values themselves changing every frame.
 */
async function panelText(page) {
  return page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { SCIENCE_NOTES } = g.content;
    return g.displays.displays.map((d) => {
      const drawn = [];
      const orig = d.ctx.fillText.bind(d.ctx);
      d.ctx.fillText = (txt, x, y) => { drawn.push(String(txt)); return orig(txt, x, y); };
      try { g.displays._draw(d); } finally { d.ctx.fillText = orig; }
      const entry = SCIENCE_NOTES[`display:${d.science}`];
      const explains = [
        ...(entry.numbers || []).flatMap((n) => [n[0], n[1]]),
        entry.how, entry.read, entry.trap || '',
        entry.math?.expr || '', ...(entry.math?.terms || []).flat(),
      ].join(' ');
      return {
        title: d.def.title,
        drawn: drawn.join(' '),
        numbers: (entry.numbers || []).map((n) => ({ label: n[0], onScreen: n[2] ?? null })),
        explains,
      };
    });
  });
}

// A number followed by a unit. The trailing lookahead matters: without it
// "1600 Atmosphere sampling" on the plan of the day reads as 1600 amps, and the
// check passes for the wrong reason because every entry contains the letter A.
const UNIT_RE = /\d[\d.,]*\s{0,2}(m³\/h|cm\/min|m\/min|psu|m²|°C|dB|kn|nm|rpm|kW|bar|Hz|cm|%|°|V|A|t|m|h)(?![\w²³])/g;
function unitsIn(text) {
  return new Set([...text.matchAll(UNIT_RE)].map((m) => m[1]));
}

test('every number an explanation describes is actually on that panel', async ({ page }) => {
  const panels = await panelText(page);
  const problems = [];
  for (const p of panels) {
    for (const n of p.numbers) {
      if (!n.onScreen) problems.push(`${p.title}: "${n.label}" declares no on-screen text`);
      else if (n.onScreen !== 'graphic' && !p.drawn.includes(n.onScreen)) {
        problems.push(`${p.title}: explains "${n.label}" but "${n.onScreen}" is not drawn`);
      }
    }
  }
  expect(problems).toEqual([]);
});

test('every quantity a panel draws is explained in its entry', async ({ page }) => {
  const panels = await panelText(page);
  const problems = [];
  for (const p of panels) {
    for (const unit of unitsIn(p.drawn)) {
      if (!p.explains.includes(unit)) {
        problems.push(`${p.title}: draws a value in "${unit}" that the entry never mentions`);
      }
    }
  }
  expect(problems).toEqual([]);
});

test('every instrument reads out in the units its explanation teaches', async ({ page }) => {
  // The other half of the same promise: an instrument that reports psi must not
  // be explained in bar. This caught exactly that on the pressure gauge, and a
  // PSU/psu case mismatch on the salinity probe.
  const problems = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { SCIENCE_NOTES } = g.content;
    const defs = g.instruments.constructor.defs();
    const out = [];
    for (const [id, def] of Object.entries(defs)) {
      if (!def.unit) continue;                       // gear and lights read nothing out
      const entry = SCIENCE_NOTES[`instrument:${id}`];
      if (!entry) { out.push(`${id}: no science entry`); continue; }
      const text = [
        ...(entry.numbers || []).flatMap((n) => [n[0], n[1]]),
        entry.oneLine, entry.how, entry.read, entry.trap || '',
        entry.math?.expr || '', ...(entry.math?.terms || []).flat(),
      ].join(' ');
      if (!text.includes(def.unit)) out.push(`${id}: reads out in "${def.unit}", entry never says so`);
    }
    return out;
  });
  expect(problems).toEqual([]);
});

test('every wall panel can actually be seen from where a player stands', async ({ page }) => {
  // Panels used to be placed by footprint alone, which put several of them behind
  // a pipe run at exactly panel height — visible as a sliver, if at all. Placement
  // is now scored on line of sight, and this keeps it that way: any new furniture
  // that shadows a screen fails here rather than in the player's face.
  const report = await page.evaluate(() => window.__DEEPWATCH__.displays.visibilityReport());
  expect(report.length).toBeGreaterThan(8);
  const blocked = report.filter((r) => r.visibility < 0.95)
    .map((r) => `${r.title} in ${r.compartment} (${r.side}) only ${Math.round(r.visibility * 100)}% visible`);
  expect(blocked).toEqual([]);
});

test('every station console can open its own science entry', async ({ page }) => {
  const missing = await page.evaluate(() => {
    const g = window.__DEEPWATCH__;
    const { resolveScienceKey, SCIENCE_NOTES } = g.content;
    const ids = ['sonar', 'navigation', 'control', 'engineering', 'electrical', 'radio',
      'dc_board', 'dc_locker', 'study_desk', 'passage_chart'];
    return ids.filter((id) => !SCIENCE_NOTES[resolveScienceKey('station', id)]);
  });
  expect(missing).toEqual([]);
});

test('every entry says how it works, what the numbers mean, and how to read it', async ({ page }) => {
  const bad = await page.evaluate(() => {
    const { SCIENCE_NOTES } = window.__DEEPWATCH__.content;
    return Object.entries(SCIENCE_NOTES)
      .filter(([, e]) => !e.title || !e.oneLine || !e.how || !e.read || !(e.numbers || []).length)
      .map(([k]) => k);
  });
  expect(bad).toEqual([]);
});

test('G opens the codex for the object under the crosshair and freezes the world', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');

  // Look at the forward power panel (as the interaction system would report it).
  await page.evaluate(() => {
    window.__DEEPWATCH__.bus.emit('interaction:prompt', { prompt: 'Energize panel', type: 'panel', id: 'fwd_power_2f' });
  });
  await page.keyboard.press('KeyG');
  await expect(page.locator('#science-overlay')).toBeVisible();
  await expect(page.locator('#science-title')).toContainText(/Forward Power Panel/i);
  await expect(page.locator('.sci-numbers')).toContainText('45 cm');
  expect(await page.evaluate(() => window.__DEEPWATCH__.getMode())).toBe('science');

  // Reading a manual must not cost you the compartment: nothing advances.
  const frozen = await page.evaluate(async () => {
    const g = window.__DEEPWATCH__;
    const t0 = g.state.clock.minutes;
    await new Promise((r) => setTimeout(r, 400));
    return g.state.clock.minutes - t0;
  });
  expect(frozen).toBeLessThan(0.01);

  // G again closes it and hands control back.
  await page.keyboard.press('KeyG');
  await expect(page.locator('#science-overlay')).toBeHidden();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});

test('G with nothing under the crosshair opens the browsable index', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__.bus.emit('interaction:prompt', null));
  await page.keyboard.press('KeyG');
  await expect(page.locator('#science-overlay')).toBeVisible();
  await expect(page.locator('#science-title')).toContainText(/How Everything Works/i);

  // Every kind is represented, and a row opens that entry.
  const rows = await page.locator('.sci-index-row').count();
  expect(rows).toBeGreaterThan(30);
  await page.locator('.sci-index-row').first().click();
  await expect(page.locator('.sci-oneline')).toBeVisible();
  // …and Back returns to the index.
  await page.locator('#btn-science-back').click();
  await expect(page.locator('#science-title')).toContainText(/How Everything Works/i);
});

test('a wall display opens its explanation when you press E on it', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  const fired = await page.evaluate(() => window.__DEEPWATCH__.interact('display_plant_mimic'));
  expect(fired).toBe(true);
  await expect(page.locator('#science-overlay')).toBeVisible();
  await expect(page.locator('#science-title')).toContainText(/Plant Mimic/i);
});

test('a station console carries a science button that opens its own entry', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('sonar'));
  await expect(page.locator('#station-overlay')).toBeVisible();

  const btn = page.locator('#btn-station-science');
  await expect(btn).toBeVisible();
  await expect(btn).toHaveAttribute('data-science', 'station:sonar');
  await btn.click();
  await expect(page.locator('#science-overlay')).toBeVisible();
  await expect(page.locator('#science-title')).toContainText(/Sonar/i);
  await expect(page.locator('.sci-expr')).toContainText('SL');

  // Closing the codex leaves you at the console you were manning, not adrift.
  await page.locator('#btn-close-science').click();
  await expect(page.locator('#science-overlay')).toBeHidden();
  await expect(page.locator('#station-overlay')).toBeVisible();
  expect(await page.evaluate(() => window.__DEEPWATCH__.getMode())).toBe('station');
});

test('the sonar console captions link to the display physics', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('sonar'));
  await page.locator('.display-caption [data-science="display:narrowband"]').first().click();
  await expect(page.locator('#science-title')).toContainText(/Narrowband Analyser/i);
  await expect(page.locator('.sci-expr')).toContainText('blade rate');
});

test('the HUD prompt advertises G on anything with an explanation', async ({ page }) => {
  await page.locator('#btn-start').click();
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__.bus.emit('interaction:prompt',
    { prompt: 'Take Acoustic Probe', type: 'instrument', id: 'acoustic_probe' }));
  await expect(page.locator('#hud-prompt')).toContainText('How it works');
  // A wall panel does not double up: E on it already opens the explanation.
  await page.evaluate(() => window.__DEEPWATCH__.bus.emit('interaction:prompt',
    { prompt: 'What Plant Mimic is showing', type: 'display', id: 'display_plant_mimic' }));
  await expect(page.locator('#hud-prompt')).not.toContainText('How it works');
});

test('every qualification question is about equipment science and links to its entry', async ({ page }) => {
  const r = await page.evaluate(() => {
    const { QUAL_QUESTIONS, SCIENCE_NOTES } = window.__DEEPWATCH__.content;
    return {
      total: QUAL_QUESTIONS.length,
      withScience: QUAL_QUESTIONS.filter((q) => q.science).length,
      dangling: QUAL_QUESTIONS.filter((q) => q.science && !SCIENCE_NOTES[q.science]).map((q) => q.id),
      // Every question must have a real explanation and a valid answer index.
      malformed: QUAL_QUESTIONS.filter((q) =>
        !q.why || !q.concept || q.answer == null || q.answer < 0 || q.answer >= q.options.length).map((q) => q.id),
    };
  });
  expect(r.dangling).toEqual([]);
  expect(r.malformed).toEqual([]);
  expect(r.withScience).toBe(r.total);
  expect(r.total).toBeGreaterThan(40);
});

test('answering a question offers the science behind it', async ({ page }) => {
  await page.evaluate(() => window.__DEEPWATCH__.startMission('mission_01_walkdown'));
  await page.waitForFunction(() => window.__DEEPWATCH__.getMode() === 'playing');
  await page.evaluate(() => window.__DEEPWATCH__.stations.open('study_desk'));

  const q = await page.evaluate(() => {
    const { QUAL_QUESTIONS } = window.__DEEPWATCH__.content;
    const first = QUAL_QUESTIONS[0];
    document.querySelector(`[data-open="${first.id}"]`)?.click();
    document.querySelector(`[data-q="${first.id}"][data-opt="${first.answer}"]`)?.click();
    return { science: first.science, concept: first.concept };
  });
  await expect(page.locator('.qi-why')).toContainText(q.concept);
  await page.locator(`.qi-why [data-science="${q.science}"]`).first().click();
  await expect(page.locator('#science-overlay')).toBeVisible();
  expect(fatalErrors, fatalErrors.join('\n')).toEqual([]);
});
