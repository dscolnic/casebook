// metricScreen.js — what a mission is worth, and where the player puts it.
//
// The bible specifies this screen line by line, and the lines are quoted rather
// than paraphrased: `MISSION 1 COMPLETE`, `TIME {elapsed} / TARGET 06:00`,
// `INCORRECT SUBMISSIONS {n}`, the story event, the automatic bar change, and
// `RECOVERY POINTS = 11 + {time_modifier} - {incorrect_submissions} =
// {awarded_rp}`. That last one is deliberately shown as the arithmetic and not
// as a total: the player is being scored on two things they can change, and a
// bare number tells them neither.
//
// THE ALLOCATION IS THE PLAYER'S. This repo's panel rules say a panel that
// enforces the player's decision has removed it, so nothing here spends for
// them, nothing recommends a bar, and banking every point is a legitimate
// answer. What the screen does do is refuse impossible spends out loud —
// `metrics.spend` hands back why, and a greyed control that does not say what is
// missing is a control the player decides is broken.
//
// Rendering only. The arithmetic is `metrics.js`, which has its own selftest.
import { esc } from './utils.js';
import { metricBars, metricValues, spend, clockText } from './metrics.js';

/**
 * The screen, as HTML.
 *
 * @param report {
 *   mission,           1-based
 *   elapsed, target,   seconds
 *   incorrect,         committed wrong answers this mission
 *   rp,                { rp, timeModifier, base, min, max } from recoveryPoints
 *   awarded,           what actually reached the bank, from `award`
 *   changes,           from applyDeltas — the authored story deltas
 *   event,             what caused them
 *   collapsed,         bar keys that reached zero, if any
 * }
 */
export function metricScreenHTML(theme, state, report){
  const m = state.metrics ?? {};
  const bars = metricBars(theme);
  const vals = metricValues(theme, m);
  const locked = new Set(m.locked ?? []);

  // ---- the two lines the player is scored on
  const head =
    `<div class="metricHead">`
    + `<div class="metricLine"><span>TIME</span> <b>${clockText(report.elapsed)}</b>`
    + ` <span>/ TARGET</span> <b>${clockText(report.target)}</b></div>`
    + `<div class="metricLine"><span>INCORRECT SUBMISSIONS</span> `
    + `<b>${report.incorrect}</b></div>`
    + `</div>`;

  // ---- what the shift itself did, and what caused it
  //
  // NAMED, NOT LISTED. The bible is explicit that the event which caused every
  // loss is named on screen. A bar that fell for a reason the player cannot read
  // is a bar they cannot do anything about next time.
  const deltaBits = report.changes
    .filter(c => c.delta !== 0 || c.blocked)
    .map(c => `<span class="metricDelta${c.delta < 0 ? ' down' : c.delta > 0 ? ' up' : ''}">`
      + `${esc(c.label)} ${c.delta > 0 ? '+' : ''}${c.delta}`
      + `${c.blocked ? ' (locked)' : ''}</span>`)
    .join('');
  const story = report.event
    ? `<div class="briefBox metricEvent"><p>${esc(report.event)}</p>`
      + (deltaBits ? `<p class="metricDeltas">${deltaBits}</p>` : '')
      + `</div>`
    : '';

  // ---- the award, shown as its own arithmetic
  const rp = report.rp;
  const mod = rp.timeModifier;
  const sum = `RECOVERY POINTS = ${rp.base} ${mod < 0 ? '−' : '+'} ${Math.abs(mod)}`
    + ` − ${report.incorrect} = <b>${rp.rp}</b>`;
  const capNote = report.awarded && report.awarded.banked < report.awarded.gain
    ? `<p class="metricNote">The bank holds ${report.awarded.cap}, so `
      + `${report.awarded.banked} of those ${report.awarded.gain} arrived.</p>`
    : '';
  const replayNote = report.awarded && report.awarded.previous > 0
    ? `<p class="metricNote">This shift was worth ${report.awarded.previous} before, `
      + `so it pays the difference.</p>`
    : '';
  const award =
    `<div class="briefBox metricAward"><p class="metricSum">${sum}</p>`
    + `<p class="metricNote">Minimum ${rp.min}; maximum ${rp.max}.</p>`
    + capNote + replayNote + `</div>`;

  // ---- the allocation
  const rows = bars.map(b => {
    const v = vals[b.key];
    const lock = locked.has(b.key);
    const room = 100 - v;
    return `<div class="allocRow" data-bar="${esc(b.key)}"${lock ? ' data-locked="1"' : ''}>`
      + `<div class="allocName">${esc(b.label)}`
      + (lock ? ' <span class="allocLock">locked</span>' : '') + `</div>`
      + `<div class="allocTrack"><i style="width:${v}%"></i></div>`
      + `<div class="allocPct" data-role="pct">${v}%</div>`
      + `<div class="allocBtns">`
      + `<button class="btn tiny" type="button" data-alloc="-1"${lock || !v ? ' disabled' : ''}>−</button>`
      + `<button class="btn tiny" type="button" data-alloc="1"`
      + `${lock || room <= 0 ? ' disabled' : ''}>+</button>`
      + `</div>`
      + `<div class="allocWhy" data-role="why">`
      + (lock ? 'Locked for the rest of the campaign.' : '') + `</div>`
      + `</div>`;
  }).join('');

  const bank = m.bank ?? 0;
  return head + story + award
    + `<div class="briefBox metricAlloc">`
    + `<p>Spend Recovery Points to raise the four bars, or save them in the `
    + `Recovery Bank. One point raises one unlocked bar by 1%.</p>`
    + `<div class="allocBank">RECOVERY BANK <b data-role="bank">${bank}</b></div>`
    + `<div class="allocRows">${rows}</div>`
    + `</div>`
    + (report.collapsed?.length
      ? `<div class="briefBox metricFailed"><p><b>MISSION FAILED — `
        + `${esc((bars.find(b => b.key === report.collapsed[0]) || {}).label || '')
            .toUpperCase()} COLLAPSED</b></p></div>`
      : '');
}

/**
 * Wire the plus and minus controls.
 *
 * SPENDING IS IMMEDIATE AND REVERSIBLE. A point put on a bar goes on it now and
 * comes back off with minus, rather than being staged behind a Commit — the
 * staged version needs its own model of what has been provisionally spent, and
 * two descriptions of the bank is the shape this repo keeps paying for.
 *
 * @param onChange  called after any successful move, so the caller can refresh
 *                  the HUD bars behind the card.
 */
export function bindMetricScreen(container, theme, state, { onChange } = {}){
  if(!container) return;
  const m = state.metrics ?? {};
  const bankEl = container.querySelector('[data-role="bank"]');
  /**
   * What THIS screen has put on each bar.
   *
   * Minus takes back a point the player just spent; it is not a way to shave a
   * bar the shift itself lowered and get a point for it. Declared above
   * `redraw`, which reads it: a binding read by a closure defined earlier in
   * the file is the shape a TDZ bug hides in, and this repo has already paid
   * for one of those.
   */
  const spentHere = {};

  const redraw = () => {
    const vals = metricValues(theme, m);
    const locked = new Set(m.locked ?? []);
    if(bankEl) bankEl.textContent = String(m.bank ?? 0);
    for(const row of container.querySelectorAll('.allocRow')){
      const key = row.dataset.bar;
      const v = vals[key] ?? 0;
      const lock = locked.has(key);
      row.querySelector('.allocTrack i').style.width = `${v}%`;
      row.querySelector('[data-role="pct"]').textContent = `${v}%`;
      const minus = row.querySelector('[data-alloc="-1"]');
      const plus = row.querySelector('[data-alloc="1"]');
      // Minus takes back a point this screen put on, so it is only available
      // while there is one to take back.
      const put = spentHere[key] ?? 0;
      if(minus) minus.disabled = lock || put <= 0;
      if(plus) plus.disabled = lock || v >= 100 || (m.bank ?? 0) <= 0;
    }
  };

  container.querySelectorAll('[data-alloc]').forEach((btn) => {
    btn.onclick = () => {
      const row = btn.closest('.allocRow');
      const key = row?.dataset.bar;
      if(!key) return;
      const why = row.querySelector('[data-role="why"]');
      const step = Number(btn.dataset.alloc);
      if(step > 0){
        const res = spend(theme, m, key, 1);
        // THE REFUSAL SAYS WHAT IS MISSING. `spend` hands back the reason and
        // this prints it: "only 3 in the bank", "that bar has room for 1".
        if(!res.ok){ if(why) why.textContent = res.why; redraw(); return; }
        spentHere[key] = (spentHere[key] ?? 0) + 1;
        if(why) why.textContent = '';
      } else {
        if((spentHere[key] ?? 0) <= 0){
          if(why) why.textContent = 'Nothing spent on this one yet.';
          return;
        }
        m.bars[key] = Math.max(0, (m.bars[key] ?? 0) - 1);
        m.bank = (m.bank ?? 0) + 1;
        spentHere[key] -= 1;
        if(why) why.textContent = '';
      }
      redraw();
      onChange?.();
    };
  });
  redraw();
}

/** The quick concept review, which the bible puts between the award and the next briefing. */
export function reviewHTML(lines = []){
  if(!lines.length) return '';
  return `<div class="briefBox"><ul class="metricReview">`
    + lines.map(l => `<li>${l}</li>`).join('')
    + `</ul></div>`;
}
