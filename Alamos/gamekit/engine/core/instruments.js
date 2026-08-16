// instruments.js — the twelve formats the six interaction documents converged on.
//
// `FORMATS.md` is the argument for these: 104 authored interactions across six
// games, which turned out to be nineteen distinct designs, of which these twelve
// each carry four or more. Every one of them is a move a scientist makes and no
// existing format could render — writing a rule before the data arrives, finding
// which channels share a reference, closing a ledger with a term hidden in it.
//
// They live here rather than in questionUI.js for one reason: questionUI.js is
// already 2,350 lines and holds the modal, the verdict, the hint economy and
// eight formats. A thirteenth branch in that file is how the next fork starts.
//
// THE CONTRACT
//
//   INSTRUMENTS[NAME] = {
//     html(ch)                  -> the panel, as HTML
//     bind(container, ch, ctx)  -> wire it; call ctx.commit(...) when answered
//     verdict(ch, result)       -> the picture the panel cannot show afterwards
//     facts(game)               -> one line for engine/dev/instruments.html
//     tag(game)                 -> the mode chip on that page
//   }
//
// `ctx.commit(ok, answerText, extra)` is the only way out. questionUI supplies a
// ctx that records the answer on the active challenge and finishes the visit; the
// dev harness supplies one that does nothing, which is what lets every panel be
// drawn on a page without a campaign behind it.
//
// FOUR RULES EVERY ONE OF THESE OBEYS, each of which cost somebody a game:
//
//   1. Nothing marks the answer. No glowing correct valve, no green route, no
//      decisive option in a different colour. Every document states this in its
//      own words and it is the first thing a renderer gets wrong.
//   2. The panel never prints the target. `probeQuestions` reads the rendered
//      text; a format that helpfully labels the buffer region has answered itself.
//   3. Difficulty is judgment, never dexterity. Nothing here is timed, nothing
//      needs a cursor inside three pixels, and every control can be re-set until
//      the player commits.
//   4. A wrong action produces a consequence with physics in it, not a red X.
//      That is what `verdict` is for.

import { esc, clamp, seeded, shuffleSeeded } from './utils.js';
import { lineChart, bars } from './figures.js';

/**
 * What the player is DOING, one line per format.
 *
 * The panels answer "what is the situation" (the scene, on the card above) and
 * "what is being asked" (the question). They did not answer the one a player
 * actually has in front of an instrument they have never seen: *what kind of
 * move is this, and how do I know when I have made it*. With four options on a
 * screen you can infer the task from the options. With three checkboxes and a
 * Run button you cannot.
 *
 * Format-level on purpose. The move is the same in every game, so authoring it
 * per stop is how nineteen formats end up with ninety different descriptions of
 * themselves. What a particular stop wants said goes in its own `hint`, which
 * still renders underneath this.
 */
export const METHOD = {
  TRIGGER: 'Set every threshold before the board is released. Once it is released you cannot change them, and a rule that fires after its action\'s lead time has gone is a rule about something nobody can still do.',
  VALUE: 'You cannot buy everything on this board. Buy the evidence that would change the decision — not the evidence that would make you more certain about something already settled.',
  CLOUD: 'The band is everything the measurements permit. Moving the middle of it moves the whole band; only new information makes it narrower. Get enough of it inside the limits.',
  ALLOCATE: 'Every item you buy is a question you can answer and, because the pool runs out, one you cannot. Watch the answers list, and know which one you are giving up.',
  TRACE: 'Open each channel to see what it was computed from. Keep the ones that stand on their own measurement, name the source the rest share, and do not throw away what never touched it.',
  ATTEST: 'Every claim here is signed. You cannot verify them all, so verify the ones that would hurt if they were wrong — and hold anything the evidence does not actually support.',
  CONTROL: 'Change one thing, run the measurement, then put it back and run it again. A reading names a cause only if the effect follows the change in both directions.',
  TRIANGULATE: 'One station gives a distance, not a place. Switch in enough of them to cross, decide what to do about the station you were warned about, then report the position.',
  DEGENERACY: 'Two controls, one measurement. Find out how many combinations fit it equally before you commit to any of them, and bring in the second measurement when you see why you need it.',
  CHAIN: 'Force reaches the ground through a chain of transfers, and the chain is only as good as the weakest one it needs. Build the path, then name the transfer that governs it.',
  BALANCE: 'Reading a stream costs nothing. Counting it is a claim that it is part of the same quantity — so read everything, and count only what actually flows.',
  DERIVE: 'Take the derivation one line at a time. For each line, choose the expression the previous line actually gives you, and name the rule that licenses it. Both are graded: the right line for the wrong reason is the commonest way to pass a calculus course without learning it.',
  VERIFY: 'Lock a prediction first; it cannot be changed afterwards. Then act, and then spend what it takes to find out what actually happened. Not measuring is an answer too, and a poor one.',
  PROPAGATE: 'Each term contributes its own width times the power it is raised to. Find which one the output\'s uncertainty is really made of, then buy the measurement that shrinks it.',
  STRESS: 'The assumption has a range because nobody measured it exactly. Move it to the pessimistic end before you choose, and pick what still works there rather than what wins in the middle.',
  DELEGATE: 'Keep the one thing nobody else can do. Everything else goes to a person, with a first action and a condition that brings them back — an owner on their own is not a handover.',
  RESIDUAL: 'Look at what each fit leaves over, not at the number underneath it. Residuals that look like noise mean the model is complete; a pattern in them means something is missing.',
  INJECT: 'The population going in has known truth, so what comes back out measures your own pipeline. Judge a configuration by the thing you actually needed, not by how much it found.',
  ROUTE: 'Learn it as places, not as a count of paces or turns. Something will interrupt the route, and the only thing that survives an interruption is knowing where you are standing.',
};

/* ------------------------------------------------------------------ helpers */

const nf = (v, d = 2) => (Number.isFinite(v) ? (+v).toFixed(d) : '—');
/** Decimals enough to tell one step on this axis from the next. See questionUI. */
const decimals = (step) => {
  const s = Math.abs(+step) || 1;
  return s >= 1 ? 0 : Math.min(4, Math.max(1, Math.ceil(-Math.log10(s))));
};
const ask = (ch, fallback) =>
  `<div class="sweepAsk">${esc(ch.question || ch.task || fallback)}</div>`;
const hint = (t) => `<div class="sweepHint">${esc(t)}</div>`;
/** The format's own line about what the move is. Rendered above the stop's hint. */
const method = (fmt) => (METHOD[fmt]
  ? `<div class="instMethod"><span>What you are doing</span>${esc(METHOD[fmt])}</div>` : '');
const foot = (buttons) =>
  `<div class="modalActions">${buttons}</div><div id="visitFeedback"></div>`;
const btn = (id, label, { primary = false, disabled = false } = {}) =>
  `<button class="btn${primary ? ' primary' : ''}" id="${id}" type="button"`
  + `${disabled ? ' disabled' : ''}>${esc(label)}</button>`;
/** A no-op context, so every panel renders outside a campaign. */
export const INERT = { commit(){} };

/**
 * A verdict block that is prose and a table rather than a chart.
 *
 * Half of these formats are boards, not plots — a dependency map, a checklist,
 * a ledger — and forcing them through lineChart produced figures about nothing.
 * `verdictFigureHTML` inserts whatever string it is handed, so an HTML block is
 * as legitimate as an SVG and reads better for a list of claims.
 */
const board = (caption, rows) =>
  `<div class="instVerdict"><table class="instTable"><tbody>${rows}</tbody></table>`
  + `<div class="figureCaption">${esc(caption)}</div></div>`;
const row = (cells, cls = '') =>
  `<tr class="${cls}">${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
const tick = (ok) => `<span class="instMark ${ok ? 'ok' : 'no'}">${ok ? '✓' : '✕'}</span>`;

/**
 * The normal fraction inside [lo, hi], for CLOUD.
 *
 * Abramowitz and Stegun 7.1.26 — four significant figures, which is three more
 * than a panel showing "99.2%" needs, and no dependency.
 */
function erf(x){
  const s = x < 0 ? -1 : 1;
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t
    - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
}
const insideFraction = (centre, spread, lo, hi) => {
  const z = (v) => erf((v - centre) / (Math.max(spread, 1e-9) * Math.SQRT2));
  return clamp((z(hi) - z(lo)) / 2, 0, 1);
};

/* ================================================================= TRIGGER */
/**
 * TRIGGER — write the rule before the number moves, then be held to it.
 *
 * The highest-reach design in the whole corpus: five of the six documents ask
 * for it independently, and it is the one move none of the twelve older formats
 * can express. A decision made after seeing the number is a different decision,
 * and no amount of saying so lands. Here the player sets each stage's threshold
 * on a blank board, releases it, and *then* the updates arrive.
 *
 * Two ways to be wrong, and both are real. A threshold too high never fires. A
 * threshold that fires late fires at a moment when the action's own lead time
 * has already run out — the rule was correct and the evacuation was already
 * impossible, which is the failure the documents are actually about.
 *
 * The stream is scripted and the same for everybody, so the board is graded on
 * the rules and not on luck.
 */
const TRIGGER = {
  html(ch){
    const t = ch.trigger ?? {};
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const rows = (t.conditions ?? []).map((c, i) => `<div class="trigRow" data-cond="${i}">`
      + `<div class="trigHead"><b>${esc(c.label)}</b>`
      + `<span class="trigLead">needs ${esc(String(c.leadHours))} h of lead</span></div>`
      + (c.owner || c.action
          ? `<div class="trigWho">${esc([c.owner, c.action].filter(Boolean).join(' · '))}</div>` : '')
      + `<div class="trigSet"><span>fires at or above</span>`
      + `<input class="trigRange" type="range" min="${sc.min}" max="${sc.max}" step="${sc.step}"`
      + ` value="${sc.min}"><b class="trigAt">${nf(+sc.min, d)}${sc.unit ? ' ' + esc(sc.unit) : ''}</b></div>`
      + `<div class="trigResult" data-result="${i}"></div></div>`).join('');
    return ask(ch, 'Write the thresholds before the next update exists.')
      + `<div class="instPanel trigPanel">`
      + method('TRIGGER')
      + hint(t.hint ?? `Set each stage's threshold on the ${sc.label ?? 'scale'}, then release the`
        + ' board. The updates arrive afterwards and your own rules decide what happens.')
      + `<div class="trigRows">${rows}</div>`
      + `<div class="trigStream" id="trigStream"></div>`
      + foot(btn('trigRelease', t.release ?? 'Release the board', { primary: true })
        + btn('trigCommit', t.commit ?? 'Stand by the board', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.trigger ?? {};
    const panel = container.querySelector('.trigPanel');
    if(!panel) return;
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const conds = t.conditions ?? [];
    const stream = t.stream ?? [];
    const st = { thresholds: conds.map(() => +sc.min), released: false, fired: [] };
    const release = panel.querySelector('#trigRelease');
    const commit = panel.querySelector('#trigCommit');
    const log = panel.querySelector('#trigStream');

    panel.querySelectorAll('.trigRow').forEach((rowEl, i) => {
      const range = rowEl.querySelector('.trigRange');
      const at = rowEl.querySelector('.trigAt');
      range.addEventListener('input', () => {
        if(st.released) return;
        st.thresholds[i] = +range.value;
        at.textContent = `${nf(+range.value, d)}${sc.unit ? ' ' + sc.unit : ''}`;
      });
    });

    release.addEventListener('click', () => {
      if(st.released) return;
      st.released = true;
      release.disabled = true;
      commit.disabled = false;
      panel.querySelectorAll('.trigRange').forEach(r => { r.disabled = true; });
      // The stream, one line at a time, exactly as scripted.
      log.innerHTML = `<div class="trigStreamHead">The updates, as they came</div>`
        + stream.map(s => `<div class="trigTick"><b>${esc(s.at)}</b><span>${esc(s.update)}</span>`
          + `<em>${nf(s.value, d)}${sc.unit ? ' ' + sc.unit : ''} · ${nf(s.hoursLeft, 0)} h left</em></div>`).join('');
      // Each rule fires at the first update that reaches it.
      st.fired = conds.map((c, i) => {
        const hit = stream.find(s => +s.value >= st.thresholds[i]);
        return hit ? { at: hit.at, hoursLeft: +hit.hoursLeft,
          inTime: +hit.hoursLeft >= +c.leadHours } : null;
      });
      st.fired.forEach((f, i) => {
        const cell = panel.querySelector(`[data-result="${i}"]`);
        if(!cell) return;
        cell.className = 'trigResult ' + (!f ? 'never' : f.inTime ? 'good' : 'late');
        cell.textContent = !f
          ? 'Never fired.'
          : f.inTime
            ? `Fired at ${f.at}, with ${nf(f.hoursLeft, 0)} h in hand.`
            : `Fired at ${f.at} — ${nf(f.hoursLeft, 0)} h left, and it needs ${conds[i].leadHours}.`;
      });
    });

    commit.addEventListener('click', () => {
      if(!st.released) return;
      const ok = st.fired.length > 0 && st.fired.every(f => f && f.inTime);
      const missed = st.fired.filter(f => !f).length;
      const late = st.fired.filter(f => f && !f.inTime).length;
      ctx.commit(ok,
        `${conds.length - missed - late} of ${conds.length} stages fired in time`,
        { triggerFired: st.fired, triggerThresholds: st.thresholds });
    });
  },
  verdict(ch, r){
    const t = ch.trigger ?? {};
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const fired = r?.triggerFired ?? [];
    const rows = (t.conditions ?? []).map((c, i) => {
      const f = fired[i];
      const ok = !!(f && f.inTime);
      return row([tick(ok) + ' <b>' + esc(c.label) + '</b>',
        `your rule: ≥ ${nf(r?.triggerThresholds?.[i], d)}${sc.unit ? ' ' + sc.unit : ''}`,
        !f ? 'never fired'
           : `fired ${esc(f.at)}, ${nf(f.hoursLeft, 0)} h left of the ${c.leadHours} it needs`],
      ok ? '' : 'bad');
    }).join('');
    const stream = (t.stream ?? []).map(s => [+s.hoursLeft, +s.value]);
    const chart = stream.length >= 2 ? lineChart({
      series: [{ name: sc.label ?? 'Update', points: stream }],
      marks: (t.conditions ?? []).map((c, i) => fired[i]
        ? { x: fired[i].hoursLeft, label: c.label } : null).filter(Boolean),
      xLabel: 'Hours remaining (falling left to right is time passing)',
      yLabel: `${sc.label ?? ''}${sc.unit ? ` (${sc.unit})` : ''}`,
      caption: 'The updates as they arrived, with where each of your rules fired',
    }) : '';
    return chart + board('A rule that fires after its lead time has gone is a rule about'
      + ' something that can no longer be done', rows);
  },
  facts: (g) => `${g.trigger.conditions.length} stages · ${g.trigger.stream.length} updates`
    + ` · scale ${g.trigger.scale.min}–${g.trigger.scale.max} ${g.trigger.scale.unit ?? ''}`,
  tag: () => 'rules first',
};

/* =================================================================== VALUE */
/**
 * VALUE — what would this measurement change?
 *
 * Scarcity, orthogonality and irreversibility in one board. Every option costs
 * something the player does not have enough of, and the grade is not "did you
 * buy the most rigorous evidence" but "did you buy the thing that would have
 * changed the decision". Buying more of what you already know is the trap, and
 * it is a trap the player can walk into while feeling thorough.
 *
 * An option marked irreversible consumes the sample: it cannot be un-bought,
 * and its cost stays spent. That is the evidence-kit lesson in one flag.
 *
 * The decisive options are NOT distinguishable on the board. Their axis is
 * shown, which is the information the player is supposed to reason from.
 */
const VALUE = {
  html(ch){
    const v = ch.value ?? {};
    const b = v.budget ?? {};
    const cards = (v.options ?? []).map((o, i) => `<div class="valOpt" data-opt="${i}">`
      + `<div class="valTop"><b>${esc(o.label)}</b><span class="valCost">${esc(String(o.cost))}`
      + ` ${esc(b.unit ?? '')}</span></div>`
      + `<div class="valAxis">asks about: ${esc(o.axis)}</div>`
      + (o.irreversible ? `<div class="valIrrev">consumes the sample — cannot be undone</div>` : '')
      + `<div class="valReveal" data-reveal="${i}"></div>`
      + `<button class="btn valBuy" data-buy="${i}" type="button">Buy</button></div>`).join('');
    return ask(ch, 'Spend it on the thing that would change the decision.')
      + `<div class="instPanel valPanel">`
      + method('VALUE')
      + hint(v.hint ?? 'Everything here is real evidence. The question is which of it changes'
        + ' what you are about to decide.')
      + (String(v.decision ?? '').trim()
          && String(v.decision).trim() !== String(ch.question ?? '').trim()
          ? `<div class="valDecision"><span>the decision</span><b>${esc(v.decision)}</b></div>` : '')
      + `<div class="valSpend">Spent <b id="valSpent">0</b> of ${esc(String(b.amount))} ${esc(b.unit ?? '')}</div>`
      + `<div class="valGrid">${cards}</div>`
      + foot(btn('valCommit', v.commit ?? 'Commit the decision', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const v = ch.value ?? {};
    const panel = container.querySelector('.valPanel');
    if(!panel) return;
    const opts = v.options ?? [];
    const budget = +(v.budget ?? {}).amount || 0;
    const st = { bought: new Set(), spent: 0, done: false };
    const spentEl = panel.querySelector('#valSpent');

    const refresh = () => {
      spentEl.textContent = String(st.spent);
      panel.querySelectorAll('.valBuy').forEach(b => {
        const i = +b.dataset.buy;
        if(st.bought.has(i)){ b.disabled = true; b.textContent = 'Bought'; return; }
        b.disabled = st.done || st.spent + (+opts[i].cost || 0) > budget;
      });
      panel.classList.toggle('valBroke', opts.every((o, i) =>
        st.bought.has(i) || st.spent + (+o.cost || 0) > budget));
    };

    panel.querySelectorAll('.valBuy').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.buy;
        if(st.done || st.bought.has(i)) return;
        const cost = +opts[i].cost || 0;
        if(st.spent + cost > budget) return;
        st.bought.add(i);
        st.spent += cost;
        const cell = panel.querySelector(`[data-reveal="${i}"]`);
        if(cell) cell.innerHTML = `<em>${esc(String(opts[i].reveals ?? '').trim() || 'Bought.')}</em>`;
        panel.querySelector(`[data-opt="${i}"]`)?.classList.add('bought');
        refresh();
      });
    });
    refresh();

    panel.querySelector('#valCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const decisive = opts.map((o, i) => o.decisive ? i : -1).filter(i => i >= 0);
      const ok = decisive.every(i => st.bought.has(i));
      ctx.commit(ok,
        st.bought.size
          ? `bought ${[...st.bought].map(i => opts[i].label).join(', ')}`
          : 'bought nothing',
        { valueBought: [...st.bought] });
    });
  },
  verdict(ch, r){
    const v = ch.value ?? {};
    const boughtSet = new Set(r?.valueBought ?? []);
    const rows = (v.options ?? []).map((o, i) => row([
      tick(!!o.decisive === boughtSet.has(i) || (!o.decisive && !boughtSet.has(i)))
        + ` <b>${esc(o.label)}</b>`,
      esc(o.axis),
      boughtSet.has(i) ? 'you bought it' : 'you left it',
      o.decisive ? '<b>would have changed the decision</b>' : 'improves a number beside the decision',
    ], o.decisive && !boughtSet.has(i) ? 'bad' : '')).join('');
    return board(v.moral ?? 'The budget was never enough for all of it. It was enough for the'
      + ' evidence that changes what you do next', rows);
  },
  facts: (g) => `${g.value.budget.amount} ${g.value.budget.unit} against`
    + ` ${g.value.options.reduce((n, o) => n + (+o.cost || 0), 0)} on the board`
    + ` · ${g.value.options.filter(o => o.decisive).length} decisive`
    + ` · ${new Set(g.value.options.map(o => o.axis)).size} axes`,
  tag: () => 'value of information',
};

/* =================================================================== CLOUD */
/**
 * CLOUD — a distribution against a boundary.
 *
 * "You moved the dot. The cloud came with it." Every game asks for this and none
 * of the older formats can show it: a number with an error bar printed on a card
 * is read as a number. Here the spread is drawn as a spread, the corridor is
 * drawn as a corridor, and the fraction outside is a live readout that a
 * retarget does not improve.
 *
 * `shift` actions move the centre. `narrow` actions multiply the spread. The
 * importer refuses a book where shifting alone reaches `pass`, because that is
 * the whole argument.
 */
const CLOUD = {
  html(ch){
    const c = ch.cloud ?? {};
    const b = c.bounds ?? {};
    const acts = (c.actions ?? []).map((a, i) =>
      `<button class="btn cloudAct" data-act="${i}" type="button">${esc(a.label)}`
      + (a.cost ? `<span class="cloudCost">${esc(String(a.cost))} ${esc(c.costUnit ?? 'h')}</span>` : '')
      + `</button>`).join('');
    return ask(ch, 'Is the spread inside the corridor?')
      + `<div class="instPanel cloudPanel">`
      + method('CLOUD')
      + hint(c.hint ?? 'The band is what the measurements permit, not what is most likely.'
        + ' Everything in it is a trajectory you might actually be on.')
      + `<svg class="cloudPlot" viewBox="0 0 320 130" role="img"`
      + ` aria-label="Distribution against ${esc(b.label ?? 'the limits')}">`
      + `<rect width="320" height="130" fill="#f7f9fa"/>`
      + `<rect class="cloudBand" x="0" y="14" width="0" height="86" fill="#e6f0e9"/>`
      + `<line class="cloudEdge" data-edge="lo" y1="10" y2="104" stroke="#c0392b" stroke-width="1.5"/>`
      + `<line class="cloudEdge" data-edge="hi" y1="10" y2="104" stroke="#c0392b" stroke-width="1.5"/>`
      + `<polyline class="cloudCurve" fill="none" stroke="#2f6f8f" stroke-width="2" points=""/>`
      + `<g class="cloudDots"></g>`
      + `<line class="cloudCentre" y1="10" y2="104" stroke="#2f4652" stroke-width="1" stroke-dasharray="3 3"/>`
      + `<g class="cloudScale"></g></svg>`
      + `<div class="sweepReadouts">`
      + `<div class="sweepReadout"><span>inside the limits</span>`
      + `<b class="cloudInside">—</b></div>`
      + `<div class="sweepReadout"><span>nominal</span><b class="cloudCentreVal">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>spread (1σ)</span><b class="cloudSpread">—</b></div>`
      + `</div>`
      + `<div class="cloudActs">${acts}</div>`
      + foot(btn('cloudCommit', c.commit ?? 'Declare it ready', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const c = ch.cloud ?? {};
    const panel = container.querySelector('.cloudPanel');
    if(!panel) return;
    const b = c.bounds ?? {};
    const lo = +b.min, hi = +b.max;
    const d = decimals((hi - lo) / 100);
    // The drawn window is wider than the corridor, or a cloud sitting outside it
    // is invisible and the format has nothing to teach.
    const wLo = lo - (hi - lo) * 0.9, wHi = hi + (hi - lo) * 0.9;
    const st = { centre: +c.centre, spread: +c.spread, used: new Set(), done: false, spent: 0 };
    const px = (v) => ((v - wLo) / ((wHi - wLo) || 1)) * 320;

    const curve = panel.querySelector('.cloudCurve');
    const dots = panel.querySelector('.cloudDots');
    const band = panel.querySelector('.cloudBand');
    const centreLine = panel.querySelector('.cloudCentre');
    const insideEl = panel.querySelector('.cloudInside');
    const centreEl = panel.querySelector('.cloudCentreVal');
    const spreadEl = panel.querySelector('.cloudSpread');
    band.setAttribute('x', px(lo).toFixed(1));
    band.setAttribute('width', Math.max(0, px(hi) - px(lo)).toFixed(1));
    panel.querySelector('[data-edge="lo"]').setAttribute('x1', px(lo).toFixed(1));
    panel.querySelector('[data-edge="lo"]').setAttribute('x2', px(lo).toFixed(1));
    panel.querySelector('[data-edge="hi"]').setAttribute('x1', px(hi).toFixed(1));
    panel.querySelector('[data-edge="hi"]').setAttribute('x2', px(hi).toFixed(1));
    const scale = panel.querySelector('.cloudScale');
    if(scale) scale.innerHTML =
      `<text x="${px(lo).toFixed(1)}" y="122" text-anchor="middle" class="sweepTick">${nf(lo, d)}</text>`
      + `<text x="${px(hi).toFixed(1)}" y="122" text-anchor="middle" class="sweepTick">${nf(hi, d)}</text>`
      + `<text x="160" y="10" text-anchor="middle" class="sweepTick">${esc(b.label ?? '')}`
      + `${b.unit ? ' (' + esc(b.unit) + ')' : ''}</text>`;

    // The samples are drawn from the campaign's own seed, so the picture is the
    // same one every time this stop is opened and a reload cannot reroll it.
    const N = 90;
    let draw = 0;
    const gauss = () => {
      const u = Math.max(1e-9, seeded(c.seed ?? 1 + draw++ * 7919));
      const v = seeded((c.seed ?? 1) * 31 + draw++ * 104729);
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    const shape = Array.from({ length: N }, () => gauss());

    const render = () => {
      const pts = [];
      for(let i = 0; i <= 80; i++){
        const x = wLo + ((wHi - wLo) * i) / 80;
        const z = (x - st.centre) / Math.max(st.spread, 1e-9);
        pts.push(`${px(x).toFixed(1)},${(100 - 78 * Math.exp(-0.5 * z * z)).toFixed(1)}`);
      }
      curve.setAttribute('points', pts.join(' '));
      dots.innerHTML = shape.map((z, i) => {
        const x = st.centre + z * st.spread;
        const out = x < lo || x > hi;
        return `<circle cx="${clamp(px(x), 2, 318).toFixed(1)}"`
          + ` cy="${(96 - (i % 9) * 2.1).toFixed(1)}" r="1.5"`
          + ` fill="${out ? '#c0392b' : '#2f6f8f'}" opacity=".75"/>`;
      }).join('');
      centreLine.setAttribute('x1', px(st.centre).toFixed(1));
      centreLine.setAttribute('x2', px(st.centre).toFixed(1));
      const f = insideFraction(st.centre, st.spread, lo, hi);
      insideEl.textContent = `${(f * 100).toFixed(1)} %`;
      centreEl.textContent = `${nf(st.centre, d)}${b.unit ? ' ' + b.unit : ''}`;
      spreadEl.textContent = `${nf(st.spread, d)}${b.unit ? ' ' + b.unit : ''}`;
      st.inside = f;
    };
    render();

    panel.querySelectorAll('.cloudAct').forEach(el => {
      el.addEventListener('click', () => {
        const i = +el.dataset.act;
        if(st.done || st.used.has(i)) return;
        const a = (c.actions ?? [])[i];
        st.used.add(i);
        st.spent += +a.cost || 0;
        el.disabled = true;
        el.classList.add('used');
        if(a.effect === 'narrow') st.spread *= (+a.amount || 1);
        // A shift moves the nominal toward the corridor's middle, which is exactly
        // the move that feels like progress and is not.
        else st.centre += ((lo + hi) / 2 - st.centre) * clamp(+a.amount || 1, 0, 1);
        render();
      });
    });

    panel.querySelector('#cloudCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const ok = st.inside >= +c.pass;
      ctx.commit(ok, `${(st.inside * 100).toFixed(1)}% inside, nominal ${nf(st.centre, d)}`
        + `, spread ${nf(st.spread, d)}`,
        { cloudInside: st.inside, cloudCentre: st.centre, cloudSpread: st.spread,
          cloudUsed: [...st.used] });
    });
  },
  verdict(ch, r){
    const c = ch.cloud ?? {};
    const b = c.bounds ?? {};
    const lo = +b.min, hi = +b.max;
    const bell = (centre, spread, name) => {
      const pts = [];
      for(let i = 0; i <= 60; i++){
        const x = lo - (hi - lo) * 0.9 + ((hi - lo) * 2.8 * i) / 60;
        const z = (x - centre) / Math.max(spread, 1e-9);
        pts.push([x, Math.exp(-0.5 * z * z)]);
      }
      return { name, points: pts };
    };
    const yours = Number.isFinite(r?.cloudCentre)
      ? bell(r.cloudCentre, r.cloudSpread, 'where you left it') : null;
    return lineChart({
      series: [bell(+c.centre, +c.spread, 'as it started'), ...(yours ? [yours] : [])],
      marks: [{ x: lo, label: `${nf(lo, 1)} ${b.unit ?? ''}` },
              { x: hi, label: `${nf(hi, 1)} ${b.unit ?? ''}` }],
      xLabel: `${b.label ?? ''}${b.unit ? ` (${b.unit})` : ''}`,
      caption: `${((r?.cloudInside ?? 0) * 100).toFixed(1)}% of the distribution finished inside`
        + ` the limits; ${(c.pass * 100).toFixed(1)}% was needed. Moving the nominal slides the`
        + ' whole curve — only information makes it narrower',
    });
  },
  facts: (g) => `bounds ${g.cloud.bounds.min}–${g.cloud.bounds.max} ${g.cloud.bounds.unit ?? ''}`
    + ` · starts at ${g.cloud.centre} ± ${g.cloud.spread}`
    + ` · ${(g.cloud.actions ?? []).filter(a => a.effect === 'narrow').length} narrowing actions`
    + ` · passes at ${(g.cloud.pass * 100).toFixed(1)}%`,
  tag: () => 'distribution',
};

/* ================================================================ ALLOCATE */
/**
 * ALLOCATE — a finite pool across competing claims.
 *
 * Two variants under one renderer. A **scalar** pool is twenty sample bottles or
 * a yard budget. An **integrated** pool is amp-hours: the item carries a rate and
 * the hours it runs, and the cost is their product — which is the whole of
 * "you saved watts, I asked you to save watt-hours".
 *
 * What makes it a format rather than a shopping list is the questions panel. It
 * does not say whether the plan is good; it says which of the day's questions the
 * current plan can answer, live, as items go in and out. The player discovers the
 * trade-off by watching an answer go dark when they buy coverage with it.
 */
const ALLOCATE = {
  html(ch){
    const a = ch.allocate ?? {};
    const p = a.pool ?? {};
    const items = (a.items ?? []).map((it, i) => `<label class="allocItem" data-item="${i}">`
      + `<input type="checkbox" data-pick="${i}"${it.protected ? ' checked disabled' : ''}>`
      + `<span class="allocName">${esc(it.label)}`
      + (it.protected ? `<em>protected — it stays in</em>` : '')
      + (it.note ? `<em>${esc(it.note)}</em>` : '')
      + `</span><b class="allocCost">${esc(String(it.cost))}</b></label>`).join('');
    const answers = (a.answers ?? []).map((q, i) =>
      `<div class="allocAnswer" data-answer="${i}"><span class="instMark no">✕</span>`
      + `<span>${esc(q.question)}</span>`
      + (q.required ? `<em>the day needs this one</em>` : '') + `</div>`).join('');
    return ask(ch, 'Spend the pool.')
      + `<div class="instPanel allocPanel">`
      + method('ALLOCATE')
      + hint(a.hint ?? 'Nothing here is a wrong choice on its own. What a plan cannot answer is'
        + ' the cost of what it can.')
      + `<div class="allocMeter"><span>Committed</span><b id="allocSpent">0</b>`
      + `<span>of ${esc(String(p.amount))} ${esc(p.unit ?? '')}</span>`
      + `<div class="allocBar"><i id="allocFill"></i></div></div>`
      + `<div class="allocItems">${items}</div>`
      + `<div class="allocAnswersHead">What this plan can answer</div>`
      + `<div class="allocAnswers">${answers}</div>`
      + foot(btn('allocCommit', a.commit ?? 'Commit the plan', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const a = ch.allocate ?? {};
    const panel = container.querySelector('.allocPanel');
    if(!panel) return;
    const items = a.items ?? [];
    const answers = a.answers ?? [];
    const pool = +(a.pool ?? {}).amount || 0;
    const st = { picked: new Set(items.map((it, i) => it.protected ? i : -1).filter(i => i >= 0)),
      done: false };
    const spentEl = panel.querySelector('#allocSpent');
    const fill = panel.querySelector('#allocFill');

    const spend = () => [...st.picked].reduce((n, i) => n + (+items[i].cost || 0), 0);
    const has = (id) => items.some((it, i) => st.picked.has(i) && String(it.id) === String(id));
    const refresh = () => {
      const s = spend();
      spentEl.textContent = String(+s.toFixed(2));
      fill.style.width = `${clamp((s / (pool || 1)) * 100, 0, 100)}%`;
      panel.classList.toggle('allocOver', s > pool);
      answers.forEach((q, i) => {
        const okq = (q.requires ?? []).every(has);
        const el = panel.querySelector(`[data-answer="${i}"]`);
        if(!el) return;
        el.classList.toggle('on', okq);
        const mark = el.querySelector('.instMark');
        if(mark){ mark.className = `instMark ${okq ? 'ok' : 'no'}`; mark.textContent = okq ? '✓' : '✕'; }
      });
      // Anything that would break the pool is refused rather than silently
      // allowed: an over-budget plan is not a plan, and reporting it only at the
      // commit hides which item did it.
      panel.querySelectorAll('[data-pick]').forEach(box => {
        const i = +box.dataset.pick;
        if(items[i].protected || st.picked.has(i)) return;
        box.disabled = st.done || s + (+items[i].cost || 0) > pool;
      });
    };

    panel.querySelectorAll('[data-pick]').forEach(box => {
      box.addEventListener('change', () => {
        const i = +box.dataset.pick;
        if(st.done || items[i].protected) return;
        if(box.checked) st.picked.add(i); else st.picked.delete(i);
        panel.querySelector(`[data-item="${i}"]`)?.classList.toggle('on', box.checked);
        refresh();
      });
    });
    refresh();

    panel.querySelector('#allocCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const s = spend();
      const protectedIn = items.every((it, i) => !it.protected || st.picked.has(i));
      const answered = answers.map(q => (q.requires ?? []).every(has));
      const ok = s <= pool && protectedIn
        && answers.every((q, i) => !q.required || answered[i]);
      ctx.commit(ok,
        `${st.picked.size} item(s), ${+s.toFixed(2)} of ${pool} ${(a.pool ?? {}).unit ?? ''}`,
        { allocPicked: [...st.picked], allocAnswered: answered, allocSpend: s });
    });
  },
  verdict(ch, r){
    const a = ch.allocate ?? {};
    const picked = new Set(r?.allocPicked ?? []);
    const rows = (a.answers ?? []).map((q, i) => {
      const got = r?.allocAnswered?.[i];
      return row([tick(!!got) + ' ' + esc(q.question),
        q.required ? '<b>the day needed it</b>' : 'optional',
        (q.requires ?? []).map(id => {
          const it = (a.items ?? []).find(x => String(x.id) === String(id));
          const inPlan = (a.items ?? []).some((x, j) => picked.has(j) && String(x.id) === String(id));
          return `<span class="${inPlan ? '' : 'instMiss'}">${esc(it?.label ?? id)}</span>`;
        }).join(', ')],
      q.required && !got ? 'bad' : '');
    }).join('');
    return board(a.moral ?? 'A plan is what it can answer. The items it left out are the'
      + ' questions nobody will be able to settle later', rows);
  },
  facts: (g) => `${g.allocate.pool.amount} ${g.allocate.pool.unit} (${g.allocate.pool.mode ?? 'scalar'})`
    + ` against ${g.allocate.items.reduce((n, i) => n + (+i.cost || 0), 0)} on the board`
    + ` · ${g.allocate.items.filter(i => i.protected).length} protected`
    + ` · ${g.allocate.answers.filter(q => q.required).length}/${g.allocate.answers.length} answers required`,
  tag: (g) => g.allocate.pool.mode === 'integrated' ? 'rate × time' : 'finite pool',
};

/* =================================================================== TRACE */
/**
 * TRACE — does agreement mean independence?
 *
 * The best instance in the corpus is Aftershock's wrong zero: five channels
 * agree, one of them is a reference, and correcting it must change exactly the
 * conclusions that used it and nothing else. That "and nothing else" is why this
 * cannot be a CHOICE. The player has to name the shared resource *and* say which
 * channels survive it, and getting the first right while condemning the whole
 * fortnight is a different mistake with its own character line.
 *
 * A channel's dependencies are hidden until opened, the way `PROBE`'s readings
 * are: handing over the dependency graph makes the answer a matter of reading a
 * column.
 */
const TRACE = {
  html(ch){
    const t = ch.trace ?? {};
    const rows = (t.channels ?? []).map((c, i) => `<div class="traceRow" data-chan="${i}">`
      + `<button class="btn traceOpen" data-open="${i}" type="button">Depends on…</button>`
      + `<div class="traceBody"><b>${esc(c.label)}</b>`
      + `<div class="traceReading">${esc(c.reading)}</div>`
      + `<div class="traceDeps" data-deps="${i}"><span class="probeBlank">not traced</span></div></div>`
      + `<label class="traceKeep"><input type="checkbox" data-keep="${i}"><span>still stands</span></label>`
      + `</div>`).join('');
    const res = (t.resources ?? []).map((r, i) =>
      `<button class="btn traceRes" data-res="${i}" type="button">${esc(r.label)}</button>`).join('');
    return ask(ch, 'Which of these agree because they are right, and which because they share a source?')
      + `<div class="instPanel tracePanel">`
      + method('TRACE')
      + hint(t.hint ?? 'Open a channel to see what it was computed from. Tick the ones whose'
        + ' evidence still stands, then name the source at fault.')
      + `<div class="traceRows">${rows}</div>`
      // The container is deliberately NOT `.traceRes`: it was, and a click on a
      // button inside it bubbled to a handler that read `dataset.res` off the div
      // and set the selection to NaN. The panel looked right and graded the right
      // answer wrong, every time.
      + `<div class="traceResHead">The source at fault</div>`
      + `<div class="traceResRow">${res}</div>`
      + foot(btn('traceCommit', t.commit ?? 'Correct it', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.trace ?? {};
    const panel = container.querySelector('.tracePanel');
    if(!panel) return;
    const chans = t.channels ?? [];
    const resources = t.resources ?? [];
    const st = { opened: new Set(), keep: new Set(), res: null, done: false };
    const commit = panel.querySelector('#traceCommit');
    const refresh = () => { commit.disabled = st.res === null; };

    panel.querySelectorAll('.traceOpen').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.open;
        if(st.done) return;
        st.opened.add(i);
        b.disabled = true;
        const cell = panel.querySelector(`[data-deps="${i}"]`);
        const deps = chans[i].depends ?? [];
        cell.innerHTML = deps.length
          ? deps.map(id => `<span class="traceDep">${esc(
              resources.find(r => String(r.id) === String(id))?.label ?? id)}</span>`).join('')
          : `<span class="traceDep own">its own measurement chain</span>`;
      });
    });
    panel.querySelectorAll('[data-keep]').forEach(box => {
      box.addEventListener('change', () => {
        const i = +box.dataset.keep;
        if(st.done) return;
        if(box.checked) st.keep.add(i); else st.keep.delete(i);
      });
    });
    panel.querySelectorAll('[data-res]').forEach(b => {
      b.addEventListener('click', () => {
        if(st.done) return;
        st.res = +b.dataset.res;
        panel.querySelectorAll('[data-res]').forEach(x =>
          x.classList.toggle('on', +x.dataset.res === st.res));
        refresh();
      });
    });
    refresh();

    commit.addEventListener('click', () => {
      if(st.done || st.res === null) return;
      st.done = true;
      const named = resources[st.res];
      const namedOk = String(named?.id) === String(t.target);
      const want = new Set((t.independent ?? []).map(String));
      const got = new Set([...st.keep].map(i => String(chans[i].id)));
      const keepOk = want.size === got.size && [...want].every(id => got.has(id));
      ctx.commit(namedOk && keepOk,
        `${named?.label ?? '—'}, keeping ${got.size} of ${chans.length} channels`,
        { traceRes: st.res, traceKeep: [...got], traceNamedOk: namedOk, traceKeepOk: keepOk });
    });
  },
  verdict(ch, r){
    const t = ch.trace ?? {};
    const kept = new Set((r?.traceKeep ?? []).map(String));
    const want = new Set((t.independent ?? []).map(String));
    const rows = (t.channels ?? []).map(c => {
      const shouldKeep = want.has(String(c.id));
      const didKeep = kept.has(String(c.id));
      return row([tick(shouldKeep === didKeep) + ` <b>${esc(c.label)}</b>`,
        (c.depends ?? []).length
          ? 'computed from ' + (c.depends ?? []).map(id =>
              esc((t.resources ?? []).find(x => String(x.id) === String(id))?.label ?? id)).join(', ')
          : 'its own measurement chain',
        shouldKeep ? 'still stands' : 'inherits the fault',
        didKeep ? 'you kept it' : 'you dropped it'],
      shouldKeep === didKeep ? '' : 'bad');
    }).join('');
    const named = (t.resources ?? [])[r?.traceRes];
    return board(
      r?.traceNamedOk && !r?.traceKeepOk
        ? 'The right source, and too much thrown away with it — the numerator was measured'
          + ' correctly, only the label on the denominator was wrong'
        : 'A shared source biases exactly what used it. Everything measured on its own chain'
          + ' keeps its evidence',
      row([`<b>You named</b>`, esc(named?.label ?? '—'),
        `<b>the source at fault was</b>`,
        esc((t.resources ?? []).find(x => String(x.id) === String(t.target))?.label ?? String(t.target))],
        r?.traceNamedOk ? '' : 'bad') + rows);
  },
  facts: (g) => `${g.trace.channels.length} channels · ${g.trace.resources.length} resources`
    + ` · ${g.trace.independent.length} independent`
    + ` · ${g.trace.channels.filter(c => (c.depends ?? []).map(String).includes(String(g.trace.target))).length}`
    + ` share the fault`,
  tag: () => 'common mode',
};

/* ================================================================== ATTEST */
/**
 * ATTEST — the record is not the condition.
 *
 * A board of claims that are all signed, indicated or drawn. Some are backed by
 * evidence taken now; some are backed by a log, a lamp or a signature from
 * somebody who was ashore. Verifying costs time and the clock does not cover the
 * whole list, so checking everything is its own failure — Deep Watch says the
 * interface should reward risk-based focus, and an unlimited budget cannot.
 *
 * A claim cannot be held without being verified first. Flagging on suspicion is
 * the thing this format exists to replace.
 */
const ATTEST = {
  html(ch){
    const a = ch.attest ?? {};
    const rows = (a.claims ?? []).map((c, i) => `<div class="attRow" data-claim="${i}">`
      + `<div class="attBody"><b>${esc(c.label)}</b>`
      + `<div class="attSig">signed by ${esc(c.signedBy ?? '—')}`
      + (c.critical ? ` · <em class="attCrit">critical</em>` : '') + `</div>`
      + `<div class="attEvidence" data-ev="${i}"><span class="probeBlank">not verified</span></div></div>`
      + `<div class="attBtns"><button class="btn attCheck" data-check="${i}" type="button">Verify</button>`
      + `<button class="btn attHold" data-hold="${i}" type="button" disabled>Hold</button></div>`
      + `</div>`).join('');
    return ask(ch, 'Close the list with evidence behind every critical claim.')
      + `<div class="instPanel attPanel">`
      + method('ATTEST')
      + hint(a.hint ?? 'Every one of these is signed. Verifying costs time and there is not'
        + ' enough of it for the whole list.')
      + `<div class="attMeter">Verifications left <b id="attLeft">${esc(String(a.checks ?? 0))}</b></div>`
      + `<div class="attRows">${rows}</div>`
      + foot(btn('attCommit', a.commit ?? 'Close the list', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const a = ch.attest ?? {};
    const panel = container.querySelector('.attPanel');
    if(!panel) return;
    const claims = a.claims ?? [];
    const st = { checked: new Set(), held: new Set(), left: +a.checks || 0, done: false };
    const leftEl = panel.querySelector('#attLeft');
    const refresh = () => {
      leftEl.textContent = String(st.left);
      panel.querySelectorAll('.attCheck').forEach(b => {
        const i = +b.dataset.check;
        b.disabled = st.done || st.checked.has(i) || st.left <= 0;
      });
    };
    panel.querySelectorAll('.attCheck').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.check;
        if(st.done || st.checked.has(i) || st.left <= 0) return;
        st.checked.add(i);
        st.left--;
        b.textContent = 'Verified';
        const c = claims[i];
        const cell = panel.querySelector(`[data-ev="${i}"]`);
        // What the verification found — never a verdict on it. Whether "the log
        // says isolated and the circuit reads energized" is acceptable is the
        // player's call, and it is the whole stop.
        if(cell) cell.innerHTML = `<span class="attFound">${esc(c.evidence ?? '—')}</span>`;
        const hold = panel.querySelector(`[data-hold="${i}"]`);
        if(hold) hold.disabled = false;
        refresh();
      });
    });
    panel.querySelectorAll('.attHold').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.hold;
        if(st.done || !st.checked.has(i)) return;
        if(st.held.has(i)){ st.held.delete(i); b.textContent = 'Hold'; }
        else { st.held.add(i); b.textContent = 'Held'; }
        panel.querySelector(`[data-claim="${i}"]`)?.classList.toggle('held', st.held.has(i));
      });
    });
    refresh();

    panel.querySelector('#attCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      // Exactly the critical claims that turned out to be unbacked, and nothing
      // else. Holding a claim that was fine is its own cost in every one of these
      // stories — it is the four-day coring programme.
      const want = new Set(claims.map((c, i) => (c.critical && !c.backed) ? i : -1).filter(i => i >= 0));
      const ok = want.size === st.held.size && [...want].every(i => st.held.has(i));
      ctx.commit(ok, `${st.held.size} claim(s) held, ${st.checked.size} verified`,
        { attHeld: [...st.held], attChecked: [...st.checked] });
    });
  },
  verdict(ch, r){
    const a = ch.attest ?? {};
    const held = new Set(r?.attHeld ?? []);
    const checked = new Set(r?.attChecked ?? []);
    const rows = (a.claims ?? []).map((c, i) => {
      const should = !!(c.critical && !c.backed);
      return row([tick(should === held.has(i)) + ` <b>${esc(c.label)}</b>`,
        esc(c.signedBy ?? '—'),
        checked.has(i) ? esc(c.evidence ?? '') : '<span class="instMiss">never verified</span>',
        should ? '<b>had to be held</b>' : (c.critical ? 'critical, and backed' : 'not critical')],
      should === held.has(i) ? '' : 'bad');
    }).join('');
    return board(a.moral ?? 'A signature records who is responsible. It does not record what is'
      + ' true, and the two come apart exactly where nobody looked', rows);
  },
  facts: (g) => `${g.attest.claims.length} claims · ${g.attest.checks} verifications`
    + ` · ${g.attest.claims.filter(c => c.critical && !c.backed).length} critical and unbacked`,
  tag: () => 'evidence audit',
};

/* ================================================================= CONTROL */
/**
 * CONTROL — change one thing, hold the rest, confirm by reversal.
 *
 * The controlled experiment as an object rather than a definition. Securing four
 * machines at once makes the display quieter and settles nothing, and that is
 * what the panel reports: *ambiguous*, in the readout, not as a scolding.
 *
 * The reversal is graded, and it is the part everybody skips. Naming the machine
 * that changed when the noise appeared is a coincidence until the noise comes
 * back with it. The commit is refused until the player has run the suspect down
 * and up again.
 */
const CONTROL = {
  html(ch){
    const c = ch.control ?? {};
    const rows = (c.variables ?? []).map((v, i) => `<label class="ctrlVar" data-var="${i}">`
      + `<input type="checkbox" data-set="${i}"><span>${esc(v.label)}</span>`
      + `<button class="btn ctrlName" data-name="${i}" type="button">This one</button></label>`).join('');
    return ask(ch, 'Find which one is doing it.')
      + `<div class="instPanel ctrlPanel">`
      + method('CONTROL')
      + hint(c.hint ?? 'Change what you like and run the measurement. What you change is a'
        + ' decision; what it tells you depends on how many things moved.')
      + `<div class="ctrlHeld">held constant: ${esc((c.held ?? []).join(', ') || 'nothing stated')}</div>`
      + `<div class="ctrlVars">${rows}</div>`
      + `<div class="sweepReadouts"><div class="sweepReadout"><span>${esc(c.observable?.label ?? 'Reading')}</span>`
      + `<b class="ctrlRead">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>trials</span><b class="ctrlTrials">0</b></div></div>`
      + `<div class="ctrlLog" id="ctrlLog"></div>`
      + foot(btn('ctrlRun', c.run ?? 'Run the measurement')
        + btn('ctrlCommit', c.commit ?? 'Name it', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const c = ch.control ?? {};
    const panel = container.querySelector('.ctrlPanel');
    if(!panel) return;
    const vars = c.variables ?? [];
    const obs = c.observable ?? {};
    const base = +c.baseline || 0, resp = +c.response || 0, noise = +(c.noise ?? 0);
    const st = { changed: new Set(), trials: 0, named: null, done: false,
      isolated: false, reversed: false, sawSuspectChanged: false };
    const readEl = panel.querySelector('.ctrlRead');
    const trialsEl = panel.querySelector('.ctrlTrials');
    const log = panel.querySelector('#ctrlLog');
    const commit = panel.querySelector('#ctrlCommit');
    const truthIx = vars.findIndex(v => String(v.id) === String(c.truth));
    let draw = 0;

    const refresh = () => { commit.disabled = st.named === null || !st.isolated || !st.reversed; };

    panel.querySelectorAll('[data-set]').forEach(box => {
      box.addEventListener('change', () => {
        const i = +box.dataset.set;
        if(st.done) return;
        if(box.checked) st.changed.add(i); else st.changed.delete(i);
      });
    });
    panel.querySelectorAll('.ctrlName').forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        if(st.done) return;
        st.named = +b.dataset.name;
        panel.querySelectorAll('.ctrlVar').forEach((row2, i) =>
          row2.classList.toggle('named', i === st.named));
        refresh();
      });
    });

    panel.querySelector('#ctrlRun')?.addEventListener('click', () => {
      if(st.done) return;
      st.trials++;
      trialsEl.textContent = String(st.trials);
      const n = st.changed.size;
      const suspectOff = st.changed.has(truthIx);
      // Wobble, so a reading is a measurement and not an oracle. Seeded, so the
      // same trial in the same campaign reads the same.
      const jitter = noise ? (seeded(2654435761 + draw++ * 40503) - 0.5) * 2 * noise : 0;
      let text, cls;
      const readingWith = (changed) => base + (changed ? resp : 0) + jitter;
      if(n === 0){
        text = `${nf(readingWith(false), 1)}${obs.unit ? ' ' + obs.unit : ''} — nothing changed`;
        cls = '';
      } else if(n > 1){
        // The honest report: several things moved, so the reading cannot say which.
        text = `${nf(readingWith(suspectOff), 1)}${obs.unit ? ' ' + obs.unit : ''}`
          + ` — ${n} things moved at once, so this reading names none of them`;
        cls = 'ambiguous';
      } else {
        if(suspectOff) st.sawSuspectChanged = true;
        else if(st.sawSuspectChanged) st.reversed = st.reversed;   // unrelated single change
        if(suspectOff) st.isolated = true;
        // Restoring the suspect after having secured it, alone, is the reversal.
        if(!suspectOff && st.sawSuspectChanged && st.isolated
           && !st.changed.has(truthIx)) st.reversed = true;
        text = `${nf(readingWith(suspectOff), 1)}${obs.unit ? ' ' + obs.unit : ''}`
          + ` — with ${vars[[...st.changed][0]].label} ${c.changeVerb ?? 'changed'}`;
        cls = '';
      }
      // A single-variable trial with the suspect back in, after it had been out,
      // is the confirming half of the reversal.
      if(n === 0 && st.isolated) st.reversed = true;
      readEl.textContent = text.split(' — ')[0];
      log.insertAdjacentHTML('afterbegin',
        `<div class="ctrlTrial ${cls}"><b>${st.trials}</b><span>${esc(text)}</span></div>`);
      refresh();
    });
    refresh();

    commit.addEventListener('click', () => {
      if(st.done || st.named === null) return;
      st.done = true;
      const ok = String(vars[st.named]?.id) === String(c.truth);
      ctx.commit(ok, `${vars[st.named]?.label}, after ${st.trials} trial(s) and a reversal`,
        { ctrlNamed: st.named, ctrlTrials: st.trials });
    });
  },
  verdict(ch, r){
    const c = ch.control ?? {};
    const vars = c.variables ?? [];
    const rows = vars.map((v, i) => row([
      tick(String(v.id) === String(c.truth) ? i === r?.ctrlNamed : i !== r?.ctrlNamed)
        + ` <b>${esc(v.label)}</b>`,
      String(v.id) === String(c.truth)
        ? `moves the reading by ${(+c.response > 0 ? '+' : '')}${nf(+c.response, 1)}`
          + `${c.observable?.unit ? ' ' + c.observable.unit : ''}`
        : 'leaves the reading where it was',
      i === r?.ctrlNamed ? 'you named it' : ''],
    String(v.id) === String(c.truth) && i !== r?.ctrlNamed ? 'bad' : '')).join('');
    const truth = vars.find(v => String(v.id) === String(c.truth));
    return board(c.moral ?? 'One variable at a time gives a candidate. Putting it back and'
      + ' watching the reading return is what makes it a cause',
      row([`<b>The tone was coming from</b>`, esc(truth?.label ?? ''),
        `<b>you named</b>`, esc(vars[r?.ctrlNamed]?.label ?? '—')],
        String(vars[r?.ctrlNamed]?.id) === String(c.truth) ? '' : 'bad') + rows);
  },
  facts: (g) => `${g.control.variables.length} variables · response ${g.control.response}`
    + `${g.control.observable?.unit ? ' ' + g.control.observable.unit : ''}`
    + ` · noise ±${g.control.noise ?? 0} · reversal required`,
  tag: () => 'controlled trial',
};

/* ============================================================ TRIANGULATE */
/**
 * TRIANGULATE — several constraints, one region.
 *
 * One station gives a ring. Three give an area, and the area is the answer: a
 * report that names a point claims a precision the measurements do not have.
 * Then a clock correction moves one ring, the whole intersection translates, and
 * no individual measurement looked wrong at any moment.
 *
 * The player places the marker by clicking the map, which is the one place in
 * these formats where a cursor position is the answer — so the tolerance is
 * authored in world units and generous. Difficulty is in deciding to apply the
 * correction, not in aiming.
 */
const TRIANGULATE = {
  html(ch){
    const t = ch.triangulate ?? {};
    const rows = (t.stations ?? []).map((s, i) =>
      `<label class="triStation" data-st="${i}"><input type="checkbox" data-on="${i}">`
      + `<span><b>${esc(s.label)}</b><em>${esc(s.observation)}</em></span></label>`).join('');
    return ask(ch, 'Where is it?')
      + `<div class="instPanel triPanel">`
      + method('TRIANGULATE')
      + hint(t.hint ?? 'Switch a station in to draw what its own measurement permits. Click the'
        + ' map to report where you think it is.')
      + `<svg class="triMap" viewBox="0 0 320 220" role="img" aria-label="Station map">`
      + `<rect width="320" height="220" fill="#f7f9fa"/><g class="triRings"></g>`
      + `<g class="triDots"></g><g class="triMark"></g></svg>`
      + `<div class="triStations">${rows}</div>`
      + (t.systematic ? `<label class="triFix"><input type="checkbox" id="triFix">`
          + `<span>${esc(t.systematic.label)}</span></label>` : '')
      + `<div class="triReport" id="triReport">No position reported.</div>`
      + foot(btn('triCommit', t.commit ?? 'Report the position', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.triangulate ?? {};
    const panel = container.querySelector('.triPanel');
    if(!panel) return;
    const stations = t.stations ?? [];
    const map = panel.querySelector('.triMap');
    const rings = panel.querySelector('.triRings');
    const dots = panel.querySelector('.triDots');
    const markG = panel.querySelector('.triMark');
    const report = panel.querySelector('#triReport');
    const commit = panel.querySelector('#triCommit');
    const fixBox = panel.querySelector('#triFix');
    const st = { on: new Set(), fixed: false, mark: null, done: false };

    // The window covers every station, the true source and the largest ring, so
    // nothing the player needs is off the edge.
    const xs = stations.map(s => +s.x).concat([+t.truth.x]);
    const ys = stations.map(s => +s.y).concat([+t.truth.y]);
    const rmax = Math.max(...stations.map(s => +s.distance));
    const lo = { x: Math.min(...xs) - rmax * 0.25, y: Math.min(...ys) - rmax * 0.25 };
    const hi = { x: Math.max(...xs) + rmax * 0.25, y: Math.max(...ys) + rmax * 0.25 };
    const span = Math.max(hi.x - lo.x, hi.y - lo.y) || 1;
    const sx = (x) => 20 + ((x - lo.x) / span) * 280;
    const sy = (y) => 200 - ((y - lo.y) / span) * 180;
    const inv = (px2, py2) => ({ x: lo.x + ((px2 - 20) / 280) * span,
                                 y: lo.y + ((200 - py2) / 180) * span });
    const scaleR = (r) => (r / span) * 280;

    // Labels drop a row while the one before is still within reach, the same rule
    // lineChart uses on its marks: two stations a few kilometres apart had their
    // names drawn at the same height and overlapped into mush.
    let lastX = -Infinity, lastY = 0, tier = 0;
    dots.innerHTML = [...stations]
      .sort((a, b) => sx(+a.x) - sx(+b.x))
      .map(s => {
        const x = sx(+s.x), y = sy(+s.y);
        const near = (x - lastX) < Math.max(34, String(s.label).length * 4.4)
          && Math.abs(y - lastY) < 14;
        tier = near ? tier + 1 : 0;
        lastX = x; lastY = y;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#2f4652"/>`
          + `<text x="${(x + 6).toFixed(1)}" y="${(y - 5 + tier * 9).toFixed(1)}"`
          + ` class="sweepTick">${esc(s.label)}</text>`;
      }).join('');

    const distanceOf = (s) => {
      const sysid = String((t.systematic ?? {}).appliesTo ?? '');
      const bias = (!st.fixed && String(s.id) === sysid) ? +(t.systematic.delta || 0) : 0;
      return +s.distance + bias;
    };
    const render = () => {
      rings.innerHTML = [...st.on].map(i => {
        const s = stations[i];
        return `<circle cx="${sx(+s.x).toFixed(1)}" cy="${sy(+s.y).toFixed(1)}"`
          + ` r="${scaleR(distanceOf(s)).toFixed(1)}" fill="none" stroke="#2f6f8f"`
          + ` stroke-width="1.4" opacity=".85"/>`;
      }).join('');
      markG.innerHTML = st.mark
        ? `<circle cx="${sx(st.mark.x).toFixed(1)}" cy="${sy(st.mark.y).toFixed(1)}" r="4"`
          + ` fill="none" stroke="#c0392b" stroke-width="2"/>`
          + `<line x1="${(sx(st.mark.x) - 7).toFixed(1)}" y1="${sy(st.mark.y).toFixed(1)}"`
          + ` x2="${(sx(st.mark.x) + 7).toFixed(1)}" y2="${sy(st.mark.y).toFixed(1)}"`
          + ` stroke="#c0392b" stroke-width="1"/>`
          + `<line x1="${sx(st.mark.x).toFixed(1)}" y1="${(sy(st.mark.y) - 7).toFixed(1)}"`
          + ` x2="${sx(st.mark.x).toFixed(1)}" y2="${(sy(st.mark.y) + 7).toFixed(1)}"`
          + ` stroke="#c0392b" stroke-width="1"/>` : '';
      report.textContent = st.mark
        ? `Reported at ${nf(st.mark.x, 1)}, ${nf(st.mark.y, 1)} ${t.unit ?? ''}`
          + ` from ${st.on.size} station(s).`
        : `No position reported. ${st.on.size} station(s) switched in.`;
      // Three constraints, or the report is a distance rather than a location.
      commit.disabled = !st.mark || st.on.size < 3;
    };

    panel.querySelectorAll('[data-on]').forEach(box => {
      box.addEventListener('change', () => {
        const i = +box.dataset.on;
        if(st.done) return;
        if(box.checked) st.on.add(i); else st.on.delete(i);
        render();
      });
    });
    fixBox?.addEventListener('change', () => {
      if(st.done) return;
      st.fixed = fixBox.checked;
      render();
    });
    map.addEventListener('click', (e) => {
      if(st.done) return;
      const r = map.getBoundingClientRect();
      const px2 = ((e.clientX - r.left) / r.width) * 320;
      const py2 = ((e.clientY - r.top) / r.height) * 220;
      st.mark = inv(px2, py2);
      render();
    });
    render();

    commit.addEventListener('click', () => {
      if(st.done || !st.mark) return;
      st.done = true;
      const d = Math.hypot(st.mark.x - +t.truth.x, st.mark.y - +t.truth.y);
      const ok = d <= +t.tolerance && st.on.size >= 3 && (!t.systematic || st.fixed);
      ctx.commit(ok, `${nf(st.mark.x, 1)}, ${nf(st.mark.y, 1)} ${t.unit ?? ''}`
        + `${t.systematic ? (st.fixed ? ', correction applied' : ', correction not applied') : ''}`,
        { triMark: st.mark, triFixed: st.fixed, triOn: st.on.size, triMiss: d });
    });
  },
  verdict(ch, r){
    const t = ch.triangulate ?? {};
    const rows = row([`<b>Your report</b>`,
      r?.triMark ? `${nf(r.triMark.x, 1)}, ${nf(r.triMark.y, 1)} ${t.unit ?? ''}` : '—',
      `<b>missed by</b>`, `${nf(r?.triMiss, 1)} ${t.unit ?? ''} against a tolerance of ${t.tolerance}`],
      (r?.triMiss ?? Infinity) <= +t.tolerance ? '' : 'bad')
      + row([`<b>Stations used</b>`, String(r?.triOn ?? 0),
        `<b>${esc((t.systematic ?? {}).label ?? 'no systematic')}</b>`,
        t.systematic ? (r?.triFixed ? 'applied' : 'not applied') : '—'],
        t.systematic && !r?.triFixed ? 'bad' : '');
    return board(t.moral ?? 'One station is a distance. Three are a region — and a timing error'
      + ' moves the whole region while every waveform still looks right', rows);
  },
  facts: (g) => `${g.triangulate.stations.length} stations · tolerance ${g.triangulate.tolerance}`
    + ` ${g.triangulate.unit ?? ''}`
    + (g.triangulate.systematic ? ` · systematic ${g.triangulate.systematic.delta} on `
        + `${g.triangulate.systematic.appliesTo}` : ' · no systematic'),
  tag: () => 'constraints',
};

/* ============================================================== DEGENERACY */
/**
 * DEGENERACY — many solutions, one observable.
 *
 * Two controls and one measurement, and a whole locus of combinations that
 * reproduce it equally well. The player slides both and watches the match stay
 * perfect, which is the moment: the brightness is not under-measured, it is
 * under-determined, and no amount of a better optical image fixes that.
 *
 * Then a measurement with different physics arrives. The second locus crosses
 * the first, the family becomes a point, and the readout that was flat the whole
 * way along the first curve is suddenly discriminating.
 *
 * `still` names what is left inferred afterwards — the density, the strength —
 * because the other half of the lesson is knowing which number you now have and
 * which you merely have a surface for.
 */
const DEGENERACY = {
  html(ch){
    const d = ch.degeneracy ?? {};
    const cs = d.controls ?? [];
    const slider = (c, i) => `<div class="degCtl"><div class="sweepHead">`
      + `<span class="sweepAxisLabel">${esc(c.label)}</span>`
      + `<b class="degAt" data-at="${i}">—</b></div>`
      + `<input class="degRange" data-ctl="${i}" type="range" min="${c.min}" max="${c.max}"`
      + ` step="${c.step}" value="${c.min}"></div>`;
    return ask(ch, 'What size is it?')
      + `<div class="instPanel degPanel">`
      + method('DEGENERACY')
      + hint(d.hint ?? 'Both controls change the model. The match to the measurement is the'
        + ' number to watch.')
      + `<svg class="degPlot" viewBox="0 0 320 150" role="img" aria-label="Solution space">`
      + `<rect width="320" height="150" fill="#f7f9fa"/>`
      + `<polyline class="degLocus1" fill="none" stroke="#2f6f8f" stroke-width="2" points="" opacity=".55"/>`
      + `<polyline class="degLocus2" fill="none" stroke="#b06a2a" stroke-width="2"`
      + ` stroke-dasharray="4 3" points="" opacity="0"/>`
      + `<circle class="degDot" r="3.4" cx="-20" cy="-20" fill="#c0392b"/>`
      + `<g class="degScale"></g></svg>`
      + cs.map(slider).join('')
      + `<div class="sweepReadouts">`
      + `<div class="sweepReadout"><span>${esc(d.observable?.label ?? 'Measurement')}</span>`
      + `<b class="degMatch1">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>${esc(d.second?.label ?? 'Second measurement')}</span>`
      + `<b class="degMatch2">not applied</b></div></div>`
      + foot(btn('degApply', d.second?.apply ?? 'Apply the second measurement')
        + btn('degCommit', d.commit ?? 'Report the size', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const d = ch.degeneracy ?? {};
    const panel = container.querySelector('.degPanel');
    if(!panel) return;
    const cs = d.controls ?? [];
    if(cs.length < 2) return;
    const [ca, cb] = cs;
    const st = { a: +ca.min, b: +cb.min, applied: false, done: false };
    const px = (v) => 12 + ((v - +ca.min) / ((+ca.max - +ca.min) || 1)) * 296;
    // Bottom stop at 132, not 138: the axis caption sits on the last row and a
    // locus that reaches the floor of the box runs straight through it.
    const py = (v) => 132 - ((v - +cb.min) / ((+cb.max - +cb.min) || 1)) * 114;
    const l1 = panel.querySelector('.degLocus1');
    const l2 = panel.querySelector('.degLocus2');
    const dot = panel.querySelector('.degDot');
    const m1 = panel.querySelector('.degMatch1');
    const m2 = panel.querySelector('.degMatch2');
    const scale = panel.querySelector('.degScale');
    if(scale) scale.innerHTML =
      `<text x="314" y="147" text-anchor="end" class="sweepTick">${esc(ca.label)} \u2192</text>`
      + `<text x="6" y="12" class="sweepTick">\u2191 ${esc(cb.label)}</text>`;
    const path = (locus) => (locus ?? []).map(p =>
      `${px(+p.a).toFixed(1)},${py(+p.b).toFixed(1)}`).join(' ');
    l1.setAttribute('points', path(d.locus));
    l2.setAttribute('points', path(d.second?.locus));

    // How well (a, b) sits on a locus, as a percentage. Distance to the nearest
    // authored point, scaled by the control ranges so both axes count equally.
    const matchTo = (locus) => {
      const na = (v) => (v - +ca.min) / ((+ca.max - +ca.min) || 1);
      const nb = (v) => (v - +cb.min) / ((+cb.max - +cb.min) || 1);
      const best = (locus ?? []).reduce((m, p) =>
        Math.min(m, Math.hypot(na(st.a) - na(+p.a), nb(st.b) - nb(+p.b))), Infinity);
      return clamp(100 * (1 - best / 0.14), 0, 100);
    };
    const render = () => {
      panel.querySelector('[data-at="0"]').textContent =
        `${nf(st.a, decimals(ca.step))}${ca.unit ? ' ' + ca.unit : ''}`;
      panel.querySelector('[data-at="1"]').textContent =
        `${nf(st.b, decimals(cb.step))}${cb.unit ? ' ' + cb.unit : ''}`;
      dot.setAttribute('cx', clamp(px(st.a), 4, 316).toFixed(1));
      dot.setAttribute('cy', clamp(py(st.b), 4, 146).toFixed(1));
      m1.textContent = `${matchTo(d.locus).toFixed(0)} %`;
      if(st.applied) m2.textContent = `${matchTo(d.second?.locus).toFixed(0)} %`;
    };
    panel.querySelectorAll('.degRange').forEach(r => {
      r.addEventListener('input', () => {
        if(st.done) return;
        if(+r.dataset.ctl === 0) st.a = +r.value; else st.b = +r.value;
        render();
      });
    });
    render();

    panel.querySelector('#degApply')?.addEventListener('click', (e) => {
      if(st.applied || st.done) return;
      st.applied = true;
      e.target.disabled = true;
      l2.setAttribute('opacity', '.9');
      render();
    });
    panel.querySelector('#degCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const tol = d.tolerance ?? {};
      const ok = st.applied
        && Math.abs(st.a - +d.truth.a) <= +tol.a
        && Math.abs(st.b - +d.truth.b) <= +tol.b;
      ctx.commit(ok, `${esc(ca.label)} ${nf(st.a, decimals(ca.step))}, `
        + `${esc(cb.label)} ${nf(st.b, decimals(cb.step))}`
        + (st.applied ? '' : ' — from the first measurement alone'),
        { degA: st.a, degB: st.b, degApplied: st.applied });
    });
  },
  verdict(ch, r){
    const d = ch.degeneracy ?? {};
    const [ca, cb] = d.controls ?? [{}, {}];
    return lineChart({
      series: [
        { name: d.observable?.label ?? 'First measurement',
          points: (d.locus ?? []).map(p => [+p.a, +p.b]) },
        { name: d.second?.label ?? 'Second measurement',
          points: (d.second?.locus ?? []).map(p => [+p.a, +p.b]) },
      ],
      marks: [
        ...(Number.isFinite(r?.degA) ? [{ x: r.degA, label: 'yours' }] : []),
        { x: +d.truth.a, label: `${nf(+d.truth.a, 0)}${ca.unit ? ' ' + ca.unit : ''}` },
      ],
      xLabel: `${ca.label ?? ''}${ca.unit ? ` (${ca.unit})` : ''}`,
      yLabel: `${cb.label ?? ''}${cb.unit ? ` (${cb.unit})` : ''}`,
      caption: (r?.degApplied
        ? 'Both curves. They meet in one place, and that is the only pair both measurements allow'
        : 'The first measurement alone is the solid curve — every point on it fits equally, which'
          + ' is why any answer taken from it is a choice of assumption')
        + (d.still?.length ? ` Still inferred: ${d.still.join(', ')}.` : ''),
    });
  },
  facts: (g) => `${g.degeneracy.locus.length} points on the first locus`
    + ` · ${(g.degeneracy.second?.locus ?? []).length} on the second`
    + ` · truth ${g.degeneracy.truth.a}/${g.degeneracy.truth.b}`
    + ` ±${g.degeneracy.tolerance.a}/${g.degeneracy.tolerance.b}`,
  tag: () => 'under-determined',
};

/* =================================================================== CHAIN */
/**
 * CHAIN — trace the path, name the governing link.
 *
 * Pure topology: no readings, no averaging, nothing to plot. The player assembles
 * the transfer path in order out of a shuffled bank, which refuses to close while
 * an interface is missing — "point at the thing that carries it across" — and
 * then names the link that governs.
 *
 * The distractor is authored and it is always the largest, most obvious member:
 * the wall panel, the bearing, the pump. A load path is limited by its weakest
 * *required* transfer, and the strength of everything either side of it is not
 * relevant, which is a sentence nobody believes until they have built the chain.
 */
const CHAIN = {
  html(ch){
    const c = ch.chain ?? {};
    return ask(ch, 'Follow it from one end to the other.')
      + `<div class="instPanel chainPanel">`
      + method('CHAIN')
      + hint(c.hint ?? 'Put the transfers in the order the force actually takes, then say which'
        + ' one decides whether the path holds.')
      + `<div class="chainRail" id="chainRail"></div>`
      + `<div class="chainBankHead">Available transfers</div>`
      + `<div class="chainBank" id="chainBank"></div>`
      + foot(btn('chainReset', 'Start again')
        + btn('chainCommit', c.commit ?? 'Name the governing transfer', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const c = ch.chain ?? {};
    const panel = container.querySelector('.chainPanel');
    if(!panel) return;
    const links = c.links ?? [];
    const rail = panel.querySelector('#chainRail');
    const bank = panel.querySelector('#chainBank');
    const commit = panel.querySelector('#chainCommit');
    // Shuffled on the lesson's own text, so it is stable inside a campaign and
    // is not the order the book wrote them in.
    const order = shuffleSeeded(links.map((_, i) => i),
      links.reduce((n, l) => n + String(l.id).length * 31, 7));
    const st = { placed: [], governing: null, done: false };

    const render = () => {
      rail.innerHTML = st.placed.length
        ? st.placed.map((i, n) => `<div class="chainLink${st.governing === i ? ' gov' : ''}"`
            + ` data-gov="${i}"><span class="chainNum">${n + 1}</span>`
            + `<div><b>${esc(links[i].label)}</b><em>${esc(links[i].transfers ?? '')}</em></div>`
            + `<span class="chainPick">${st.placed.length === (c.order ?? []).length
                ? (st.governing === i ? 'governs' : 'this one governs') : ''}</span></div>`).join('')
        : `<div class="chainEmpty">Nothing placed yet.</div>`;
      bank.innerHTML = order.filter(i => !st.placed.includes(i))
        .map(i => `<button class="btn chainAdd" data-add="${i}" type="button">`
          + `${esc(links[i].label)}</button>`).join('') || `<span class="chainEmpty">All placed.</span>`;
      // The path, not the bank: the bank may hold decoys that do not belong in
      // the path at all, and requiring every one of them to be placed would make
      // the decoy compulsory.
      commit.disabled = st.placed.length !== (c.order ?? []).length || st.governing === null;
      bank.parentElement.querySelectorAll('.chainAdd').forEach(b =>
        b.addEventListener('click', () => {
          if(st.done) return;
          st.placed.push(+b.dataset.add);
          render();
        }));
      // Only once the whole path is closed. Naming the governing link out of a
      // half-built chain is naming it out of a list, which is the format this
      // one replaces.
      if(st.placed.length === (c.order ?? []).length){
        rail.querySelectorAll('[data-gov]').forEach(el =>
          el.addEventListener('click', () => {
            if(st.done) return;
            st.governing = +el.dataset.gov;
            render();
          }));
      }
    };
    render();

    panel.querySelector('#chainReset')?.addEventListener('click', () => {
      if(st.done) return;
      st.placed = []; st.governing = null; render();
    });
    commit.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const pathOk = st.placed.length === (c.order ?? []).length
        && st.placed.every((i, n) => String(links[i].id) === String(c.order[n]));
      const govOk = String(links[st.governing]?.id) === String(c.governing);
      ctx.commit(pathOk && govOk,
        `${st.placed.map(i => links[i].label).join(' → ')}; governed by`
        + ` ${links[st.governing]?.label ?? '—'}`,
        { chainPlaced: st.placed, chainGov: st.governing, chainPathOk: pathOk });
    });
  },
  verdict(ch, r){
    const c = ch.chain ?? {};
    const links = c.links ?? [];
    const byId = (id) => links.find(l => String(l.id) === String(id));
    const rows = (c.order ?? []).map((id, n) => {
      const yours = links[(r?.chainPlaced ?? [])[n]];
      const l = byId(id);
      const ok = yours && String(yours.id) === String(id);
      return row([tick(!!ok) + ` <b>${n + 1}. ${esc(l?.label ?? id)}</b>`,
        esc(l?.transfers ?? ''),
        ok ? '' : `you put <em>${esc(yours?.label ?? 'nothing')}</em> here`], ok ? '' : 'bad');
    }).join('');
    const gov = byId(c.governing);
    const yourGov = links[r?.chainGov];
    return board(c.moral ?? 'A load path is limited by its weakest required transfer. The'
      + ' strength of everything either side of it does not enter',
      row([`<b>Governed by</b>`, esc(gov?.label ?? ''),
        `<b>you named</b>`, esc(yourGov?.label ?? '—')],
        String(yourGov?.id) === String(c.governing) ? '' : 'bad') + rows);
  },
  facts: (g) => `${g.chain.links.length} transfers · governed by ${g.chain.governing}`
    + (g.chain.distractor ? ` · distractor ${g.chain.distractor}` : ''),
  tag: () => 'transfer path',
};

/* ================================================================= BALANCE */
/**
 * BALANCE — close the ledger, find the hidden term.
 *
 * The bilge rose at 320 litres a minute while the pump removed 90, so the leak
 * was 410. Every game has a version: the water leaves the plant cleaner while
 * seventy-one kilograms sit in the sludge hopper; the outlet rises two degrees
 * because the flow is at forty-five per cent.
 *
 * The panel is a set of streams the player reads and then decides to *count*.
 * Reading is free; counting is the claim. The hidden term is the one that is not
 * a reading at all — a pump that has been running the whole time — and the sum
 * of everything obvious is authored to miss, so leaving it out is wrong on the
 * arithmetic rather than on a rule.
 */
const BALANCE = {
  html(ch){
    const b = ch.balance ?? {};
    const rows = (b.streams ?? []).map((s, i) => `<div class="balRow" data-stream="${i}">`
      + `<button class="btn balRead" data-read="${i}" type="button">Read</button>`
      + `<div class="balBody"><b>${esc(s.label)}</b>`
      + (s.note ? `<em>${esc(s.note)}</em>` : '')
      + `<div class="balValue" data-val="${i}"><span class="probeBlank">not read</span></div></div>`
      // A row the player may read and may not count: a composition among flows,
      // a rate among totals. Rendered EXACTLY like the others until it is read —
      // an uncountable row that looks different from the outset has announced
      // itself, and spotting that it is a different quantity is the point.
      + `<label class="balCount" data-slot="${i}">`
      + `<input type="checkbox" data-count="${i}" disabled><span>count it</span></label>`
      + `</div>`).join('');
    return ask(ch, 'What is the total?')
      + `<div class="instPanel balPanel">`
      + method('BALANCE')
      + hint(b.hint ?? 'Reading a stream is free. Counting it is the claim you are making about'
        + ' where the quantity went.')
      + `<div class="balRows">${rows}</div>`
      + `<div class="sweepReadouts"><div class="sweepReadout sweepTotal">`
      + `<span>${esc((b.total ?? {}).label ?? 'Total')}</span>`
      + `<b class="balSum">0 ${esc((b.total ?? {}).unit ?? '')}</b></div></div>`
      + foot(btn('balCommit', b.commit ?? 'Report the total', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const b = ch.balance ?? {};
    const panel = container.querySelector('.balPanel');
    if(!panel) return;
    const streams = b.streams ?? [];
    const unit = (b.total ?? {}).unit ?? '';
    const st = { read: new Set(), counted: new Set(), done: false };
    const sumEl = panel.querySelector('.balSum');
    const commit = panel.querySelector('#balCommit');
    const sum = () => [...st.counted].reduce((n, i) => n + (+streams[i].value || 0), 0);
    const refresh = () => {
      sumEl.textContent = `${+sum().toFixed(2)} ${unit}`;
      commit.disabled = st.counted.size === 0;
    };
    panel.querySelectorAll('.balRead').forEach(el => {
      el.addEventListener('click', () => {
        const i = +el.dataset.read;
        if(st.done || st.read.has(i)) return;
        st.read.add(i);
        el.disabled = true;
        const cell = panel.querySelector(`[data-val="${i}"]`);
        if(cell) cell.innerHTML = `<span class="balNum">${esc(streams[i].display
          ?? `${streams[i].value} ${unit}`)}</span>`;
        // Only once it has been read. Saying "this is not a flow" before the
        // player has seen what it is would be marking the answer.
        if(streams[i].countable === false){
          const slot = panel.querySelector(`[data-slot="${i}"]`);
          if(slot){
            slot.classList.add('balNotFlow');
            slot.innerHTML = `<span>${esc(streams[i].unitNote ?? 'not a flow')}</span>`;
          }
        } else {
          const box = panel.querySelector(`[data-count="${i}"]`);
          if(box) box.disabled = false;
        }
        refresh();
      });
    });
    panel.querySelectorAll('[data-count]').forEach(box => {
      box.addEventListener('change', () => {
        const i = +box.dataset.count;
        if(st.done) return;
        if(box.checked) st.counted.add(i); else st.counted.delete(i);
        panel.querySelector(`[data-stream="${i}"]`)?.classList.toggle('on', box.checked);
        refresh();
      });
    });
    refresh();
    commit.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const s = sum();
      const ok = Math.abs(s - +(b.total ?? {}).amount) <= +(b.tolerance ?? 0);
      ctx.commit(ok, `${+s.toFixed(2)} ${unit}, from ${st.counted.size} stream(s)`,
        { balSum: s, balCounted: [...st.counted], balRead: [...st.read] });
    });
  },
  verdict(ch, r){
    const b = ch.balance ?? {};
    const counted = new Set(r?.balCounted ?? []);
    const unit = (b.total ?? {}).unit ?? '';
    const rows = (b.streams ?? []).map((s, i) => row([
      tick(counted.has(i)) + ` <b>${esc(s.label)}</b>`,
      `${s.value} ${unit}`,
      counted.has(i) ? 'you counted it' : '<span class="instMiss">left out</span>',
      s.hidden ? '<b>not a reading — it has been running the whole time</b>' : ''],
    counted.has(i) ? '' : 'bad')).join('');
    return bars({
      bars: [
        ...(b.streams ?? []).map((s, i) => ({ name: s.label, value: +s.value || 0,
          status: counted.has(i) ? 'normal' : 'alarm' })),
        { name: 'the real total', value: +(b.total ?? {}).amount || 0 },
      ],
      yLabel: unit,
      caption: `You reported ${nf(r?.balSum, 0)} ${unit} against ${(b.total ?? {}).amount} ${unit}`
        + '. Red is a stream you read and did not count',
    }) + board(b.moral ?? 'What accumulates is what is left after everything already leaving'
      + ' has left. The removal term does not announce itself', rows);
  },
  facts: (g) => `${g.balance.streams.length} streams · total ${g.balance.total.amount}`
    + ` ${g.balance.total.unit} ±${g.balance.tolerance}`
    + ` · ${g.balance.streams.filter(s => s.hidden).length} hidden term(s)`,
  tag: () => 'ledger',
};

/* ================================================================== VERIFY */
/**
 * VERIFY — predict, act, measure, compare.
 *
 * "Do not let spacecraft hit asteroid equal mission succeeded." The player states
 * a number first, commits the intervention, and then has to spend something to
 * find out what actually happened. Skipping the measurement is a distinct
 * failure with its own verdict, and it is the failure the format exists for —
 * every other format in the engine grades what you said, and this one grades
 * whether you went and looked.
 *
 * The prediction is a range, not a point, wherever the book gives an uncertain
 * factor: an enhancement between 1 and 5 is not a number and pretending it is is
 * the second mistake this stop catches.
 */
const VERIFY = {
  html(ch){
    const v = ch.verify ?? {};
    const p = v.prediction ?? {};
    return ask(ch, 'Predict it, do it, then find out.')
      + `<div class="instPanel verPanel">`
      + method('VERIFY')
      + hint(v.hint ?? 'Lock a prediction before the intervention. Nothing about it can be'
        + ' changed afterwards, which is the point of making it first.')
      + `<div class="verStep on" data-step="1"><b>1 · The prediction</b>`
      + `<div class="sweepHead"><span class="sweepAxisLabel">${esc(p.label ?? '')}</span>`
      + `<b class="verAt">—</b></div>`
      + `<input class="verRange" type="range" min="${p.min}" max="${p.max}" step="${p.step}"`
      + ` value="${p.min}">`
      + `<div class="sweepEnds"><span>${esc(String(p.min))} ${esc(p.unit ?? '')}</span>`
      + `<span>${esc(String(p.max))} ${esc(p.unit ?? '')}</span></div></div>`
      + `<div class="verStep" data-step="2"><b>2 · ${esc(v.intervention?.label ?? 'The intervention')}</b>`
      + `<div class="verNote">${esc(v.intervention?.note ?? '')}</div></div>`
      + `<div class="verStep" data-step="3"><b>3 · ${esc(v.measurement?.label ?? 'The measurement')}</b>`
      + `<div class="verNote">${esc(v.measurement?.note ?? '')}`
      + (v.measurement?.cost ? ` <em>costs ${esc(String(v.measurement.cost))}`
          + ` ${esc(v.measurement.costUnit ?? '')}</em>` : '') + `</div>`
      + `<div class="verResult" id="verResult"></div></div>`
      + foot(btn('verLock', v.lock ?? 'Lock the prediction')
        + btn('verRun', v.run ?? 'Commit it', { disabled: true })
        + btn('verMeasure', v.measure ?? 'Take the measurement', { disabled: true })
        + btn('verCommit', v.commit ?? 'Report', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const v = ch.verify ?? {};
    const panel = container.querySelector('.verPanel');
    if(!panel) return;
    const p = v.prediction ?? {};
    const d = decimals(p.step);
    const st = { pred: +p.min, locked: false, ran: false, measured: null, done: false };
    const range = panel.querySelector('.verRange');
    const at = panel.querySelector('.verAt');
    const lock = panel.querySelector('#verLock');
    const run = panel.querySelector('#verRun');
    const meas = panel.querySelector('#verMeasure');
    const commit = panel.querySelector('#verCommit');
    const result = panel.querySelector('#verResult');
    const step = (n) => panel.querySelectorAll('.verStep').forEach(el =>
      el.classList.toggle('on', +el.dataset.step === n));

    const show = () => { at.textContent = `${nf(st.pred, d)}${p.unit ? ' ' + p.unit : ''}`; };
    range.addEventListener('input', () => { if(!st.locked){ st.pred = +range.value; show(); } });
    show();

    lock.addEventListener('click', () => {
      if(st.locked) return;
      st.locked = true;
      range.disabled = true;
      lock.disabled = true;
      run.disabled = false;
      step(2);
    });
    run.addEventListener('click', () => {
      if(!st.locked || st.ran) return;
      st.ran = true;
      run.disabled = true;
      meas.disabled = false;
      // The intervention always "succeeds". That is the trap: a confirmed impact
      // is not a confirmed deflection, and the commit is enabled here on purpose
      // so that reporting without measuring is a thing the player can do.
      commit.disabled = false;
      step(3);
      result.innerHTML = `<div class="verLine">${esc(v.intervention?.outcome
        ?? 'Delivered. Confirmed.')}</div>`;
    });
    meas.addEventListener('click', () => {
      if(!st.ran || st.measured !== null) return;
      st.measured = +v.truth;
      meas.disabled = true;
      result.insertAdjacentHTML('beforeend',
        `<div class="verLine measured"><b>${esc(v.measurement?.label ?? 'Measured')}</b>`
        + `<span>${nf(st.measured, d)}${p.unit ? ' ' + p.unit : ''}</span></div>`);
    });
    commit.addEventListener('click', () => {
      if(st.done || !st.ran) return;
      st.done = true;
      const [rlo, rhi] = v.passRatio ?? [0.5, 2];
      const ratio = st.measured === null ? null : st.pred / (st.measured || 1);
      const ok = st.measured !== null && ratio >= rlo && ratio <= rhi;
      ctx.commit(ok,
        st.measured === null
          ? `predicted ${nf(st.pred, d)}${p.unit ? ' ' + p.unit : ''}, never measured`
          : `predicted ${nf(st.pred, d)}, measured ${nf(st.measured, d)}${p.unit ? ' ' + p.unit : ''}`,
        { verPred: st.pred, verMeasured: st.measured });
    });
  },
  verdict(ch, r){
    const v = ch.verify ?? {};
    const p = v.prediction ?? {};
    const d = decimals(p.step);
    const never = r?.verMeasured === null || r?.verMeasured === undefined;
    return board(
      never
        ? (v.unmeasuredMoral ?? 'The intervention was delivered and nobody found out what it did.'
          + ' A confirmed action is not a confirmed effect')
        : (v.moral ?? 'The prediction carried an uncertain factor. Only the measurement says'
          + ' which end of it the world chose'),
      row([`<b>You predicted</b>`, `${nf(r?.verPred, d)} ${p.unit ?? ''}`], '')
      + row([`<b>It actually was</b>`,
          never ? '<span class="instMiss">never measured</span>'
                : `${nf(+v.truth, d)} ${p.unit ?? ''}`], never ? 'bad' : '')
      + row([`<b>Accepted within</b>`,
          `${(v.passRatio ?? [])[0]}× to ${(v.passRatio ?? [])[1]}× of the measurement`], ''));
  },
  facts: (g) => `predicts ${g.verify.prediction.min}–${g.verify.prediction.max}`
    + ` ${g.verify.prediction.unit ?? ''} · truth ${g.verify.truth}`
    + ` · accepted ${g.verify.passRatio[0]}×–${g.verify.passRatio[1]}×`
    + ` · measurement is skippable`,
  tag: () => 'predict then measure',
};

/* =============================================================== PROPAGATE */
/**
 * PROPAGATE — the error budget.
 *
 * Which input term dominates the output uncertainty, and therefore which
 * measurement is worth buying. The trap is arithmetic that everybody knows and
 * nobody applies: a term's contribution is its exponent times its own fractional
 * width, so a radius known to eight per cent and cubed contributes less than a
 * density known to forty-five and not raised to anything. Ranked by exponent —
 * which is how it gets ranked — the answer comes out backwards.
 *
 * The panel computes the whole budget live, so improving a term is something the
 * player watches fail to help. One measurement is affordable and one of the
 * candidates is not measurable at all this season, which is the honest shape of
 * the decision rather than a menu.
 */
const PROPAGATE = {
  html(ch){
    const p = ch.propagate ?? {};
    const rows = (p.inputs ?? []).map((x, i) => `<tr data-input="${i}">`
      + `<td class="propName">${esc(x.label)}</td>`
      + `<td>${esc(String(x.value))} ${esc(x.unit ?? '')}</td>`
      + `<td class="propSigma" data-sigma="${i}">±${((+x.sigmaFrac) * 100).toFixed(0)} %</td>`
      + `<td>${esc(String(x.exponent))}</td>`
      + `<td class="propBarCell"><div class="propBarWrap"><i class="propBar" data-bar="${i}"></i></div>`
      + `<b class="propShare" data-share="${i}">—</b></td></tr>`).join('');
    const buys = (p.improvable ?? []).map((m, i) =>
      `<button class="btn propBuy" data-buy="${i}" type="button"${m.newSigmaFrac == null ? ' disabled' : ''}>`
      + `${esc(m.label)}<span class="propCost">${m.newSigmaFrac == null ? 'not measurable'
          : esc(String(m.cost)) + ' ' + esc(p.costUnit ?? '')}</span></button>`).join('');
    return ask(ch, 'Which measurement is worth buying?')
      + `<div class="instPanel propPanel">`
      + method('PROPAGATE')
      + hint(p.hint ?? 'Each term contributes its own width times the power it is raised to.'
        + ' The bar is that contribution.')
      + `<table class="propTable"><thead><tr><th>Input</th><th>Value</th><th>Known to</th>`
      + `<th>Power</th><th>Share of the output width</th></tr></thead><tbody>${rows}</tbody></table>`
      + `<div class="sweepReadouts"><div class="sweepReadout sweepTotal">`
      + `<span>${esc(p.output?.label ?? 'Output')} is known to</span>`
      + `<b class="propTotal">—</b></div></div>`
      + `<div class="propBuysHead">One of these is affordable</div>`
      + `<div class="propBuys">${buys}</div>`
      + foot(btn('propCommit', p.commit ?? 'Report the range', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const p = ch.propagate ?? {};
    const panel = container.querySelector('.propPanel');
    if(!panel) return;
    const inputs = (p.inputs ?? []).map(x => ({ ...x, sigmaFrac: +x.sigmaFrac }));
    const st = { bought: null, done: false };
    const totalEl = panel.querySelector('.propTotal');

    // Fractional widths add in quadrature, each weighted by its own exponent.
    const terms = () => inputs.map(x => Math.abs(+x.exponent) * x.sigmaFrac);
    const total = () => Math.hypot(...terms());
    const render = () => {
      const ts = terms(), tot = total() || 1;
      inputs.forEach((x, i) => {
        const share = (ts[i] * ts[i]) / (tot * tot);
        const bar = panel.querySelector(`[data-bar="${i}"]`);
        if(bar) bar.style.width = `${(share * 100).toFixed(1)}%`;
        const sh = panel.querySelector(`[data-share="${i}"]`);
        if(sh) sh.textContent = `${(share * 100).toFixed(0)} %`;
        const sg = panel.querySelector(`[data-sigma="${i}"]`);
        if(sg) sg.textContent = `±${(x.sigmaFrac * 100).toFixed(0)} %`;
      });
      totalEl.textContent = `± ${(total() * 100).toFixed(0)} %`;
    };
    render();

    panel.querySelectorAll('.propBuy').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.buy;
        const m = (p.improvable ?? [])[i];
        if(st.done || st.bought !== null || m.newSigmaFrac == null) return;
        st.bought = i;
        const t = inputs.find(x => String(x.id) === String(m.id));
        if(t) t.sigmaFrac = +m.newSigmaFrac;
        panel.querySelectorAll('.propBuy').forEach(x => { x.disabled = true; });
        b.classList.add('bought');
        render();
      });
    });

    panel.querySelector('#propCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const m = (p.improvable ?? [])[st.bought];
      const ok = st.bought !== null && String(m?.id) === String(p.dominant);
      ctx.commit(ok, st.bought === null
        ? `reported ±${(total() * 100).toFixed(0)}% without buying anything`
        : `bought ${m.label}, leaving ±${(total() * 100).toFixed(0)}%`,
        { propBought: st.bought, propTotal: total() });
    });
  },
  verdict(ch, r){
    const p = ch.propagate ?? {};
    const rows = (p.inputs ?? []).map(x => {
      const share = Math.abs(+x.exponent) * +x.sigmaFrac;
      return row([`<b>${esc(x.label)}</b>`,
        `known to ±${(+x.sigmaFrac * 100).toFixed(0)} %`,
        `raised to ${x.exponent}`,
        `contributes ${(share * 100).toFixed(0)}`],
      String(x.id) === String(p.dominant) ? '' : '');
    }).join('');
    return bars({
      bars: (p.inputs ?? []).map(x => ({ name: x.label,
        value: +(Math.abs(+x.exponent) * +x.sigmaFrac * 100).toFixed(1),
        status: String(x.id) === String(p.dominant) ? 'alarm' : 'normal' })),
      yLabel: 'contribution to the output width (%)',
      caption: 'A term contributes its own width times the power it is raised to. The tallest bar'
        + ' is the number worth improving, whatever its exponent',
    }) + board(p.moral ?? 'The exponent is not the whole story — it multiplies a width, and a'
      + ' width known badly enough outweighs a small one cubed', rows);
  },
  facts: (g) => `${g.propagate.inputs.length} inputs · dominant ${g.propagate.dominant}`
    + ` · ${g.propagate.improvable.filter(m => m.newSigmaFrac != null).length} measurable of`
    + ` ${g.propagate.improvable.length}`,
  tag: () => 'error budget',
};

/* ================================================================== STRESS */
/**
 * STRESS — the choice that survives being wrong.
 *
 * Candidates in a table and one assumption the player can move through its
 * stated range. At the nominal a particular option is best on the criterion
 * everybody is optimising; somewhere in the range it stops being feasible at
 * all. "You optimized the estimate. I asked you to survive the error bar."
 *
 * The slider is the format. A table of four routes with their numbers is a
 * CHOICE; a table whose rows go dark as an assumption moves is an argument.
 */
const STRESS = {
  html(ch){
    const s = ch.stress ?? {};
    const a = s.assumption ?? {};
    const crits = s.criteria ?? [];
    const head = `<tr><th>Candidate</th>${crits.map(c =>
      `<th>${esc(c.label)}${c.unit ? ` (${esc(c.unit)})` : ''}</th>`).join('')}<th></th></tr>`;
    const rows = (s.candidates ?? []).map((c, i) => `<tr class="stressRow" data-cand="${i}">`
      + `<td class="stressName">${esc(c.label)}</td>`
      + crits.map(k => `<td>${esc(String((s.scores ?? {})[c.id]?.[k.key] ?? '—'))}</td>`).join('')
      + `<td><button class="btn stressPick" data-pick="${i}" type="button">Choose</button></td></tr>`).join('');
    return ask(ch, 'Which one still works when the assumption moves?')
      + `<div class="instPanel stressPanel">`
      + method('STRESS')
      + hint(s.hint ?? 'The assumption has a range because nobody measured it exactly. Move it'
        + ' through the range before you choose.')
      + `<div class="sweepHead"><span class="sweepAxisLabel">${esc(a.label ?? '')}</span>`
      + `<b class="stressAt">—</b></div>`
      + `<input class="stressRange" type="range" min="${a.min}" max="${a.max}" step="${a.step}"`
      + ` value="${a.nominal}">`
      + `<div class="sweepEnds"><span>${esc(String(a.min))} ${esc(a.unit ?? '')}`
      + ` — pessimistic</span><span>${esc(String(a.max))} ${esc(a.unit ?? '')}</span></div>`
      + `<table class="stressTable"><thead>${head}</thead><tbody>${rows}</tbody></table>`
      + `<div class="stressNote" id="stressNote"></div>`
      + foot(btn('stressCommit', s.commit ?? 'Commit the choice', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const s = ch.stress ?? {};
    const panel = container.querySelector('.stressPanel');
    if(!panel) return;
    const a = s.assumption ?? {};
    const d = decimals(a.step);
    const cands = s.candidates ?? [];
    const st = { at: +a.nominal, picked: null, done: false, seenLow: false };
    const range = panel.querySelector('.stressRange');
    const atEl = panel.querySelector('.stressAt');
    const note = panel.querySelector('#stressNote');
    const commit = panel.querySelector('#stressCommit');
    // A candidate needs at least this much of the assumption to remain possible.
    const needs = (c) => +((s.feasible ?? {})[c.id] ?? -Infinity);

    const render = () => {
      atEl.textContent = `${nf(st.at, d)}${a.unit ? ' ' + a.unit : ''}`;
      let out = 0;
      cands.forEach((c, i) => {
        const dead = st.at < needs(c);
        if(dead) out++;
        panel.querySelector(`[data-cand="${i}"]`)?.classList.toggle('dead', dead);
        const pick = panel.querySelector(`[data-pick="${i}"]`);
        if(pick) pick.textContent = st.picked === i ? 'Chosen' : 'Choose';
      });
      note.textContent = out
        ? `${out} of ${cands.length} are not possible at this figure.`
        : 'Every candidate is possible at this figure.';
      commit.disabled = st.picked === null;
    };
    range.addEventListener('input', () => {
      if(st.done) return;
      st.at = +range.value;
      // Whether they ever looked at the bad end. Not graded — reported, the way
      // a PROBE reports how many stations were read.
      if(st.at <= +a.min + (+a.max - +a.min) * 0.15) st.seenLow = true;
      render();
    });
    panel.querySelectorAll('.stressPick').forEach(b => {
      b.addEventListener('click', () => {
        if(st.done) return;
        st.picked = +b.dataset.pick;
        panel.querySelectorAll('.stressRow').forEach((rowEl, i) =>
          rowEl.classList.toggle('picked', i === st.picked));
        render();
      });
    });
    render();

    commit.addEventListener('click', () => {
      if(st.done || st.picked === null) return;
      st.done = true;
      const c = cands[st.picked];
      const ok = String(c?.id) === String(s.robust);
      ctx.commit(ok, `${c?.label}${st.seenLow ? '' : ', without moving the assumption to its'
        + ' pessimistic end'}`,
        { stressPicked: st.picked, stressSeenLow: st.seenLow });
    });
  },
  verdict(ch, r){
    const s = ch.stress ?? {};
    const a = s.assumption ?? {};
    const rows = (s.candidates ?? []).map((c, i) => {
      const need = +((s.feasible ?? {})[c.id] ?? -Infinity);
      const survives = need <= +a.min;
      return row([tick(survives === (String(c.id) === String(s.robust)))
          + ` <b>${esc(c.label)}</b>`,
        Number.isFinite(need) && need > +a.min
          ? `stops being possible below ${nf(need, decimals(a.step))} ${a.unit ?? ''}`
          : 'possible across the whole range',
        i === r?.stressPicked ? 'you chose it' : ''],
      String(c.id) === String(s.robust) ? '' : (i === r?.stressPicked ? 'bad' : ''));
    }).join('');
    return board(s.moral ?? 'The nominal is one point in a range nobody measured. A choice that'
      + ' is only best at that point is a choice that has not been tested', rows);
  },
  facts: (g) => `${g.stress.candidates.length} candidates · assumption`
    + ` ${g.stress.assumption.min}–${g.stress.assumption.max} ${g.stress.assumption.unit ?? ''}`
    + ` (nominal ${g.stress.assumption.nominal}) · robust ${g.stress.robust}`,
  tag: () => 'robustness',
};

/* ================================================================ DELEGATE */
/**
 * DELEGATE — a finite team against problems that evolve while you look elsewhere.
 *
 * `ALLOCATE` with a clock and consequences. Two things are graded and both come
 * straight out of Deep Watch: which condition command changes *first*, and
 * whether every other one was handed over with something a person can act on
 * without coming back. "Watch it" produces no action and no report until the
 * threshold has already been passed, so an assignment without a first action
 * and a return condition does not count as an assignment.
 *
 * The loud problem is deliberately not the first one. What decides the order is
 * a trend against an irreversible limit, not a colour.
 */
const DELEGATE = {
  html(ch){
    const d = ch.delegate ?? {};
    const team = d.team ?? [];
    const acts = d.firstActions ?? [];
    const rows = (d.problems ?? []).map((p, i) => `<div class="delRow" data-prob="${i}">`
      + `<div class="delBody"><b>${esc(p.label)}</b>`
      + `<div class="delTrend"><em>${esc(p.trend)}</em> · ${esc(p.rate)}`
      + ` · ${esc(p.consequence)}</div>`
      + `<div class="delAssign">`
      + `<select data-owner="${i}"><option value="">owner…</option>`
      + team.map(t => `<option value="${esc(t.id)}">${esc(t.label)}</option>`).join('') + `</select>`
      + `<select data-action="${i}"><option value="">first action…</option>`
      + acts.map(x => `<option value="${esc(x.id)}">${esc(x.label)}</option>`).join('') + `</select>`
      + `<input data-threshold="${i}" type="text" placeholder="report back when…">`
      + `</div></div>`
      + `<button class="btn delFirst" data-first="${i}" type="button">Change this first</button>`
      + `</div>`).join('');
    return ask(ch, 'What do you change first, and who has the rest?')
      + `<div class="instPanel delPanel">`
      + method('DELEGATE')
      + hint(d.hint ?? 'One of these you deal with yourself. Everything else goes to somebody,'
        + ' with a first action and a condition that brings them back.')
      + `<div class="delRows">${rows}</div>`
      + `<div class="delNote" id="delNote"></div>`
      + foot(btn('delCommit', d.commit ?? 'Take the watch', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const d = ch.delegate ?? {};
    const panel = container.querySelector('.delPanel');
    if(!panel) return;
    const problems = d.problems ?? [];
    const st = { first: null, done: false };
    const note = panel.querySelector('#delNote');
    const commit = panel.querySelector('#delCommit');

    const assignmentOf = (i) => ({
      owner: panel.querySelector(`[data-owner="${i}"]`)?.value ?? '',
      action: panel.querySelector(`[data-action="${i}"]`)?.value ?? '',
      threshold: (panel.querySelector(`[data-threshold="${i}"]`)?.value ?? '').trim(),
    });
    // A complete handover is an owner, a first action and a condition that brings
    // them back. Two of the three is the "watch it" assignment.
    const complete = (i) => {
      const a = assignmentOf(i);
      return !!(a.owner && a.action && a.threshold.length >= 3);
    };
    const refresh = () => {
      const rest = problems.map((_, i) => i).filter(i => i !== st.first);
      const short = rest.filter(i => !complete(i)).length;
      // Every owner is a person, and a person handed two problems is one problem
      // being watched. Reported rather than blocked — command may double up.
      const owners = rest.map(assignmentOf).map(a => a.owner).filter(Boolean);
      const doubled = owners.length - new Set(owners).size;
      note.textContent = st.first === null
        ? 'Nothing chosen to change first.'
        : `${rest.length - short} of ${rest.length} handed over`
          + (short ? `; ${short} still missing an owner, an action or a return condition.` : '.')
          + (doubled ? ` ${doubled} person(s) carrying more than one.` : '');
      commit.disabled = st.first === null || short > 0;
    };
    panel.querySelectorAll('.delFirst').forEach(b => {
      b.addEventListener('click', () => {
        if(st.done) return;
        st.first = +b.dataset.first;
        panel.querySelectorAll('.delRow').forEach((rowEl, i) =>
          rowEl.classList.toggle('first', i === st.first));
        panel.querySelectorAll('.delFirst').forEach((x, i) => {
          x.textContent = i === st.first ? 'Yours' : 'Change this first';
        });
        refresh();
      });
    });
    panel.querySelectorAll('[data-owner],[data-action],[data-threshold]').forEach(el => {
      el.addEventListener('input', refresh);
      el.addEventListener('change', refresh);
    });
    refresh();

    commit.addEventListener('click', () => {
      if(st.done || st.first === null) return;
      st.done = true;
      const p = problems[st.first];
      const ok = String(p?.id) === String(d.first);
      ctx.commit(ok, `took ${p?.label} yourself, handed over ${problems.length - 1}`,
        { delFirst: st.first,
          delAssigned: problems.map((_, i) => (i === st.first ? null : assignmentOf(i))) });
    });
  },
  verdict(ch, r){
    const d = ch.delegate ?? {};
    const rows = (d.problems ?? []).map((p, i) => {
      const shouldBeFirst = String(p.id) === String(d.first);
      const a = r?.delAssigned?.[i];
      return row([tick(shouldBeFirst === (i === r?.delFirst)) + ` <b>${esc(p.label)}</b>`,
        `${esc(p.trend)} · ${esc(p.rate)}`,
        esc(p.consequence),
        i === r?.delFirst ? '<b>you took it</b>'
          : (a ? `${esc(a.owner || '—')}, back when ${esc(a.threshold || '—')}` : '')],
      shouldBeFirst && i !== r?.delFirst ? 'bad' : '');
    }).join('');
    return board(d.moral ?? 'What command keeps is what nobody else can do, which is not always'
      + ' the most urgent thing — the most urgent thing is sometimes a phone call. Everything'
      + ' handed over needs an owner, a first action and a condition that brings them back', rows);
  },
  facts: (g) => `${g.delegate.problems.length} problems · ${g.delegate.team.length} on the team`
    + ` · first ${g.delegate.first}`
    + ` · ${g.delegate.problems.filter(p => p.trend === 'rising').length} rising`,
  tag: () => 'command and handover',
};

/* ===================================================================== FLY */
/**
 * FLY — bounded commands on undamped dynamics.
 *
 * The state keeps moving after the input stops, so the input has to lead. Every
 * document that asks for this also insists that difficulty must not come from
 * dexterity, so it is built as *commit a plan, watch it run*: the player sets
 * the accelerating pulse and the angle at which the braking pulse begins, then
 * presses Run and the simulation plays out at its own pace. Nothing is timed and
 * the plan can be reset until it is committed.
 *
 * "You stopped accelerating at ninety. You did not stop rotating."
 */
const FLY = {
  html(ch){
    const f = ch.fly ?? {};
    const s = f.state ?? {};
    return ask(ch, 'Get there, and arrive stopped.')
      + `<div class="instPanel flyPanel">`
      + method('FLY')
      + hint(f.hint ?? 'There is nothing to slow it down. Whatever you put in has to be taken'
        + ' back out, and taking it out takes as long as putting it in.')
      + `<svg class="flyPlot" viewBox="0 0 320 120" role="img" aria-label="Attitude against time">`
      + `<rect width="320" height="120" fill="#f7f9fa"/>`
      + `<line class="flyTarget" x1="0" x2="320" y1="-10" y2="-10" stroke="#3f8f56"`
      + ` stroke-width="1.5" stroke-dasharray="5 4"/>`
      + `<polyline class="flyTrace" fill="none" stroke="#2f6f8f" stroke-width="2" points=""/>`
      + `<text class="flyIdle sweepTick" x="160" y="64" text-anchor="middle">`
      + `nothing run yet</text>`
      + `<g class="flyScale"></g></svg>`
      + `<div class="flyCtl"><div class="sweepHead">`
      + `<span class="sweepAxisLabel">${esc(f.pulseLabel ?? 'Pulse')}</span>`
      + `<b class="flyAt" data-at="burn">—</b></div>`
      + `<input class="flyRange" data-ctl="burn" type="range" min="${f.pulse?.min}"`
      + ` max="${f.pulse?.max}" step="${f.pulse?.step}" value="${f.pulse?.min}"></div>`
      + `<div class="flyCtl"><div class="sweepHead">`
      + `<span class="sweepAxisLabel">${esc(f.brakeLabel ?? 'Begin braking at')}</span>`
      + `<b class="flyAt" data-at="brake">—</b></div>`
      + `<input class="flyRange" data-ctl="brake" type="range" min="${f.brake?.min}"`
      + ` max="${f.brake?.max}" step="${f.brake?.step}" value="${f.brake?.min}"></div>`
      + `<div class="sweepReadouts">`
      + `<div class="sweepReadout"><span>arrived at</span><b class="flyEnd">—</b></div>`
      + `<div class="sweepReadout"><span>still moving at</span><b class="flyRate">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>used</span><b class="flyFuel">—</b></div>`
      + `</div>`
      + foot(btn('flyRun', f.run ?? 'Run it')
        + btn('flyCommit', f.commit ?? 'Report the attitude', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const f = ch.fly ?? {};
    const panel = container.querySelector('.flyPanel');
    if(!panel) return;
    const s = f.state ?? {}, acc = +f.accel;
    const st = { burn: +f.pulse.min, brake: +f.brake.min, ran: null, done: false };
    const endEl = panel.querySelector('.flyEnd');
    const rateEl = panel.querySelector('.flyRate');
    const fuelEl = panel.querySelector('.flyFuel');
    const trace = panel.querySelector('.flyTrace');
    const commit = panel.querySelector('#flyCommit');
    const dB = decimals(f.pulse.step), dA = decimals(f.brake.step);

    /**
     * Accelerate for `burn`, coast, brake for `burn`. The braking pulse starts at
     * `brake` and the state carries on moving through the whole of it — which is
     * the format. Returned as a trace so the plot is the simulation and not a
     * drawing of it.
     */
    const simulate = () => {
      const dt = 0.05;
      const pts = [];
      let x = +s.init, v = 0, t = 0, braking = false, braked = 0;
      for(let i = 0; i < 4000; i++){
        const accelerating = t < st.burn;
        if(!accelerating && !braking && x >= st.brake) braking = true;
        const a = accelerating ? acc : (braking && braked < st.burn ? -acc : 0);
        if(braking && braked < st.burn) braked += dt;
        v += a * dt; x += v * dt; t += dt;
        pts.push([t, x]);
        if(!accelerating && braked >= st.burn && Math.abs(v) < 1e-6) break;
        if(t > 180) break;
      }
      return { pts, x, v, fuel: st.burn * 2 };
    };

    const render = () => {
      panel.querySelector('[data-at="burn"]').textContent =
        `${nf(st.burn, dB)} ${f.pulse.unit ?? ''}`;
      panel.querySelector('[data-at="brake"]').textContent =
        `${nf(st.brake, dA)} ${f.brake.unit ?? ''}`;
    };
    panel.querySelectorAll('.flyRange').forEach(r => {
      r.addEventListener('input', () => {
        if(st.done || st.ran) return;
        if(r.dataset.ctl === 'burn') st.burn = +r.value; else st.brake = +r.value;
        render();
      });
    });
    render();

    panel.querySelector('#flyRun')?.addEventListener('click', (e) => {
      if(st.done) return;
      const out = simulate();
      st.ran = out;
      e.target.disabled = true;
      panel.querySelector('.flyIdle')?.remove();
      panel.querySelectorAll('.flyRange').forEach(r => { r.disabled = true; });
      commit.disabled = false;
      const xs = out.pts.map(p => p[0]), ys = out.pts.map(p => p[1]);
      const tMax = Math.max(...xs) || 1;
      const lo = Math.min(0, ...ys), hi = Math.max(+f.target * 1.15, ...ys) || 1;
      const px = (t) => (t / tMax) * 320;
      const py = (v) => 114 - ((v - lo) / ((hi - lo) || 1)) * 108;
      trace.setAttribute('points', out.pts.map(p =>
        `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(' '));
      const tl = panel.querySelector('.flyTarget');
      tl.setAttribute('y1', py(+f.target).toFixed(1));
      tl.setAttribute('y2', py(+f.target).toFixed(1));
      const scale = panel.querySelector('.flyScale');
      if(scale) scale.innerHTML =
        `<text x="316" y="${(py(+f.target) - 3).toFixed(1)}" text-anchor="end" class="sweepTick">`
        + `target ${nf(+f.target, 0)}${s.unit ? ' ' + s.unit : ''}</text>`;
      endEl.textContent = `${nf(out.x, 1)}${s.unit ? ' ' + s.unit : ''}`;
      rateEl.textContent = `${nf(out.v, 3)}${f.rate?.unit ? ' ' + f.rate.unit : ''}`;
      fuelEl.textContent = `${nf(out.fuel, 1)} of ${f.budget} ${f.pulse.unit ?? ''}`;
    });

    commit.addEventListener('click', () => {
      if(st.done || !st.ran) return;
      st.done = true;
      const out = st.ran;
      const ok = Math.abs(out.x - +f.target) <= +f.tolerance
        && Math.abs(out.v) <= +f.rateTolerance
        && out.fuel <= +f.budget;
      ctx.commit(ok, `arrived at ${nf(out.x, 1)}${s.unit ? ' ' + s.unit : ''},`
        + ` still moving at ${nf(out.v, 3)}${f.rate?.unit ? ' ' + f.rate.unit : ''}`,
        { flyEnd: out.x, flyRate: out.v, flyFuel: out.fuel,
          flyTrace: out.pts.filter((_, i) => i % 4 === 0) });
    });
  },
  verdict(ch, r){
    const f = ch.fly ?? {};
    const s = f.state ?? {};
    const pts = r?.flyTrace ?? [];
    const chart = pts.length >= 2 ? lineChart({
      series: [{ name: s.label ?? 'State', points: pts }],
      limit: { at: +f.target, label: `target ${nf(+f.target, 0)}${s.unit ? ' ' + s.unit : ''}` },
      xLabel: 'Seconds from the first pulse',
      yLabel: `${s.label ?? ''}${s.unit ? ` (${s.unit})` : ''}`,
      caption: 'Your plan, run out. The distance between the trace and the target after the'
        + ' braking pulse ends is the part that had nowhere to go',
    }) : '';
    return chart + board(f.moral ?? 'Angular velocity persists until an opposing torque removes'
      + ' it, and removing it takes the same integrated torque that created it',
      row([`<b>Arrived at</b>`, `${nf(r?.flyEnd, 1)} ${s.unit ?? ''}`,
        `<b>target</b>`, `${f.target} ± ${f.tolerance} ${s.unit ?? ''}`],
        Math.abs((r?.flyEnd ?? Infinity) - +f.target) <= +f.tolerance ? '' : 'bad')
      + row([`<b>Still moving at</b>`, `${nf(r?.flyRate, 3)} ${f.rate?.unit ?? ''}`,
        `<b>allowed</b>`, `${f.rateTolerance} ${f.rate?.unit ?? ''}`],
        Math.abs(r?.flyRate ?? Infinity) <= +f.rateTolerance ? '' : 'bad')
      + row([`<b>Used</b>`, `${nf(r?.flyFuel, 1)} ${f.pulse?.unit ?? ''}`,
        `<b>budget</b>`, `${f.budget} ${f.pulse?.unit ?? ''}`],
        (r?.flyFuel ?? Infinity) <= +f.budget ? '' : 'bad'));
  },
  facts: (g) => `target ${g.fly.target} ± ${g.fly.tolerance} ${g.fly.state.unit ?? ''}`
    + ` · accel ${g.fly.accel} · budget ${g.fly.budget} ${g.fly.pulse.unit ?? ''}`
    + ` · residual rate under ${g.fly.rateTolerance}`,
  tag: () => 'plan then run',
};

/* ================================================================ RESIDUAL */
/**
 * RESIDUAL — structure in what is left over.
 *
 * A low RMS with a pattern in it is worse than one isolated large residual, and
 * the format exists because that sentence changes nobody's mind. Here the
 * candidate fits are side by side: one has the best number and a sign flip
 * across a chip boundary, one has a slightly worse number and residuals that
 * look like noise. Accepting the first buries a systematic inside a fitted term,
 * where it will bias every prediction in the same direction.
 *
 * The residual field is drawn, not described. That is the whole argument.
 */
const RESIDUAL = {
  html(ch){
    const r = ch.residual ?? {};
    const tabs = (r.fits ?? []).map((f, i) =>
      `<button class="btn resTab${i === 0 ? ' on' : ''}" data-fit="${i}" type="button">`
      + `${esc(f.label)}<span class="resRms">RMS ${esc(String(f.rms))}</span></button>`).join('');
    return ask(ch, 'Which fit would you propagate?')
      + `<div class="instPanel resPanel">`
      + method('RESIDUAL')
      + hint(r.hint ?? 'Each residual is one reference star, drawn where it sits on the focal'
        + ' plane. Up is a positive residual, down a negative one.')
      + `<div class="resTabs">${tabs}</div>`
      + `<svg class="resPlot" viewBox="0 0 320 180" role="img" aria-label="Residuals over the field">`
      + `<rect width="320" height="180" fill="#f7f9fa"/>`
      + `<line x1="0" y1="90" x2="320" y2="90" stroke="#cfd8dd" stroke-width="1"/>`
      + `<line x1="160" y1="0" x2="160" y2="180" stroke="#cfd8dd" stroke-width="1"/>`
      + `<g class="resField"></g></svg>`
      + `<div class="sweepReadouts">`
      + `<div class="sweepReadout"><span>this fit</span><b class="resWhich">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>RMS</span><b class="resRmsBig">—</b></div>`
      + `</div>`
      + foot(btn('resCommit', r.commit ?? 'Accept this fit', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const r = ch.residual ?? {};
    const panel = container.querySelector('.resPanel');
    if(!panel) return;
    const fits = r.fits ?? [];
    const st = { at: 0, done: false, looked: new Set([0]) };
    const field = panel.querySelector('.resField');
    const whichEl = panel.querySelector('.resWhich');
    const rmsEl = panel.querySelector('.resRmsBig');

    const render = () => {
      const f = fits[st.at];
      const pts = f.residuals ?? [];
      const xs = pts.map(p => +p.x), ys = pts.map(p => +p.y);
      const vs = pts.map(p => Math.abs(+p.value));
      const spanX = (Math.max(...xs) - Math.min(...xs)) || 1;
      const spanY = (Math.max(...ys) - Math.min(...ys)) || 1;
      const big = Math.max(...vs) || 1;
      field.innerHTML = pts.map(p => {
        const cx = 24 + ((+p.x - Math.min(...xs)) / spanX) * 272;
        const cy = 156 - ((+p.y - Math.min(...ys)) / spanY) * 132;
        // The residual as a stick: length is its size, direction is its sign. A
        // dot cannot show a sign flip, and the sign flip is the whole lesson.
        const len = (+p.value / big) * 22;
        return `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${cx.toFixed(1)}"`
          + ` y2="${(cy - len).toFixed(1)}" stroke="${len >= 0 ? '#2f6f8f' : '#b06a2a'}"`
          + ` stroke-width="1.6"/>`
          + `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1.6" fill="#2f4652"/>`;
      }).join('');
      whichEl.textContent = f.label;
      rmsEl.textContent = String(f.rms);
      panel.querySelectorAll('.resTab').forEach((t, i) => t.classList.toggle('on', i === st.at));
    };
    panel.querySelectorAll('.resTab').forEach(b => {
      b.addEventListener('click', () => {
        if(st.done) return;
        st.at = +b.dataset.fit;
        st.looked.add(st.at);
        render();
      });
    });
    render();

    panel.querySelector('#resCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      const f = fits[st.at];
      const ok = String(f?.id) === String(r.accept);
      ctx.commit(ok, `${f?.label}, RMS ${f?.rms}`
        + (st.looked.size < fits.length ? `, having looked at ${st.looked.size} of ${fits.length}` : ''),
        { resAt: st.at, resLooked: [...st.looked] });
    });
  },
  verdict(ch, r){
    const rr = ch.residual ?? {};
    const rows = (rr.fits ?? []).map((f, i) => row([
      tick(String(f.id) === String(rr.accept) ? i === r?.resAt : i !== r?.resAt)
        + ` <b>${esc(f.label)}</b>`,
      `RMS ${f.rms}`,
      f.structured ? '<b>a pattern across the field</b>' : 'residuals look like noise',
      i === r?.resAt ? 'you accepted it' : ''],
    String(f.id) === String(rr.accept) && i !== r?.resAt ? 'bad' : '')).join('');
    return board(rr.moral ?? 'A pattern in the residuals is an unmodelled systematic, and it will'
      + ' bias every future prediction in the same direction. One large outlier is one bad'
      + ' measurement, and it averages out', rows);
  },
  facts: (g) => `${g.residual.fits.length} candidate fits · accept ${g.residual.accept}`
    + ` · lowest RMS is ${g.residual.fits.reduce((a, b) => (+b.rms < +a.rms ? b : a)).id}`,
  tag: () => 'what is left over',
};

/* ================================================================== INJECT */
/**
 * INJECT — measure your own blind spot.
 *
 * The only design in the corpus that measures the *measurement* rather than the
 * world: push a population whose truth you already know through your own
 * pipeline and count what comes back. What it finds is not noise — it is a
 * direction from which nothing is ever recovered, at any depth, and no amount of
 * a better instrument closes it.
 *
 * Graded on the output metric the book names, which is deliberately not the
 * number of detections. "More objects, same amount of notice."
 */
const INJECT = {
  html(ch){
    const j = ch.inject ?? {};
    const rows = (j.configs ?? []).map((c, i) => `<div class="injRow" data-cfg="${i}">`
      + `<button class="btn injRun" data-run="${i}" type="button">Run</button>`
      + `<div class="injBody"><b>${esc(c.label)}</b>`
      + `<div class="injOut" data-out="${i}"><span class="probeBlank">not run</span></div></div>`
      + `<button class="btn injPick" data-pick="${i}" type="button" disabled>Fund this</button>`
      + `</div>`).join('');
    return ask(ch, 'Which upgrade actually buys anything?')
      + `<div class="instPanel injPanel">`
      + method('INJECT')
      + hint(j.hint ?? 'The population is synthetic and its truth is known, so what comes back'
        + ' out is a measurement of the pipeline rather than of the sky.')
      + `<div class="injPop">${esc(String(j.population?.n ?? 0))} injected objects,`
      + ` known orbits and sizes</div>`
      + `<div class="injRows">${rows}</div>`
      + `<div class="injBlind" id="injBlind"></div>`
      + foot(btn('injCommit', j.commit ?? 'Fund it', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const j = ch.inject ?? {};
    const panel = container.querySelector('.injPanel');
    if(!panel) return;
    const cfgs = j.configs ?? [];
    const st = { run: new Set(), picked: null, done: false };
    const blind = panel.querySelector('#injBlind');
    const commit = panel.querySelector('#injCommit');
    const metric = j.metric ?? {};

    const refresh = () => { commit.disabled = st.picked === null; };
    panel.querySelectorAll('.injRun').forEach(b => {
      b.addEventListener('click', () => {
        const i = +b.dataset.run;
        if(st.done || st.run.has(i)) return;
        st.run.add(i);
        b.disabled = true;
        const c = cfgs[i];
        const cell = panel.querySelector(`[data-out="${i}"]`);
        if(cell) cell.innerHTML =
          `<span><em>recovered</em> ${esc(String(c.detections))} of ${esc(String(j.population?.n))}</span>`
          + `<span><em>${esc(metric.label ?? 'metric')}</em> ${esc(String(c.metric))}`
          + ` ${esc(metric.unit ?? '')}</span>`;
        const pick = panel.querySelector(`[data-pick="${i}"]`);
        if(pick) pick.disabled = false;
        // The blind spot appears once anything has been run, because it is the
        // same in every configuration — which is the finding.
        if(j.blindSpot && st.run.size >= 1){
          blind.textContent = j.blindSpot;
        }
        refresh();
      });
    });
    panel.querySelectorAll('.injPick').forEach(b => {
      b.addEventListener('click', () => {
        if(st.done) return;
        st.picked = +b.dataset.pick;
        panel.querySelectorAll('.injRow').forEach((rowEl, i) =>
          rowEl.classList.toggle('picked', i === st.picked));
        refresh();
      });
    });
    refresh();

    commit.addEventListener('click', () => {
      if(st.done || st.picked === null) return;
      st.done = true;
      const c = cfgs[st.picked];
      const ok = String(c?.id) === String(j.best);
      ctx.commit(ok, `${c?.label} — ${c?.detections} recovered,`
        + ` ${metric.label ?? 'metric'} ${c?.metric} ${metric.unit ?? ''}`,
        { injPicked: st.picked, injRun: [...st.run] });
    });
  },
  verdict(ch, r){
    const j = ch.inject ?? {};
    const metric = j.metric ?? {};
    return bars({
      bars: (j.configs ?? []).map(c => ({ name: c.label, value: +c.metric,
        status: String(c.id) === String(j.best) ? 'normal' : undefined })),
      yLabel: `${metric.label ?? ''}${metric.unit ? ` (${metric.unit})` : ''}`,
      caption: `Detections and ${metric.label ?? 'the metric'} are different quantities, and the`
        + ' configuration that maximises one does not maximise the other',
    }) + board(j.moral ?? 'A pipeline has a selection function, and injecting a known population'
      + ' is how you measure it. What never comes back is not absent from the sky',
      (j.configs ?? []).map((c, i) => row([
        tick(String(c.id) === String(j.best) ? i === r?.injPicked : i !== r?.injPicked)
          + ` <b>${esc(c.label)}</b>`,
        `${c.detections} recovered`,
        `${metric.label ?? ''} ${c.metric} ${metric.unit ?? ''}`,
        (r?.injRun ?? []).includes(i) ? (i === r?.injPicked ? 'you funded it' : 'you ran it')
          : '<span class="instMiss">never run</span>'],
      String(c.id) === String(j.best) && i !== r?.injPicked ? 'bad' : '')).join(''));
  },
  facts: (g) => `${g.inject.population.n} injected · ${g.inject.configs.length} configurations`
    + ` · best on ${g.inject.metric.label} is ${g.inject.best}`
    + ` · most detections is ${g.inject.configs.reduce((a, b) =>
        (+b.detections > +a.detections ? b : a)).id}`,
  tag: () => 'selection function',
};

/* =================================================================== ROUTE */
/**
 * ROUTE — a sequence that survives an interruption.
 *
 * One instance in the whole corpus and it is a world feature as much as a panel,
 * which is why `FORMATS.md` lists it last. What makes it a format at all is the
 * second half: a pace count and a turn count both produce an answer, and both
 * are destroyed by one blocked hatch, because neither can say *where you are
 * now*. A compartment sequence can be rejoined from any point in it.
 *
 * So the panel is in two halves. Walk it once with the names showing, then walk
 * it with the names gone and only the landmarks — and part-way through, the
 * route is interrupted and the player has to say which compartment they are
 * standing in from its landmark alone before they can carry on.
 */
const ROUTE = {
  html(ch){
    const r = ch.route ?? {};
    const stops = r.stops ?? [];
    const lit = stops.map((s, i) => `<div class="routeStopRow"><span class="chainNum">${i + 1}</span>`
      + `<div><b>${esc(s.label)}</b><em>${esc(s.landmark)}</em></div></div>`).join('');
    return ask(ch, 'Learn it, then find it again with the lights down.')
      + `<div class="instPanel routePanel">`
      + method('ROUTE')
      + hint(r.hint ?? 'Walk it once with the names showing. They will not be there on the way'
        + ' back, and one of the hatches will not open.')
      + `<div class="routeLit" id="routeLit"><div class="routeHead">Lit — the route as it is</div>`
      + lit + `</div>`
      + `<div class="routeDark" id="routeDark" hidden>`
      + `<div class="routeHead">Degraded — no labels, one route blocked</div>`
      + `<div class="routeRail" id="routeRail"></div>`
      + `<div class="routeBankHead">The compartments, in no order</div>`
      + `<div class="routeBank" id="routeBank"></div>`
      + `<div class="routeLost" id="routeLost" hidden></div>`
      + `</div>`
      + foot(btn('routeGo', r.go ?? 'Walk it back')
        + btn('routeReset', 'Start again')
        + btn('routeCommit', r.commit ?? 'Report your position', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const r = ch.route ?? {};
    const panel = container.querySelector('.routePanel');
    if(!panel) return;
    const stops = r.stops ?? [];
    const st = { placed: [], lost: false, named: null, done: false };
    const rail = panel.querySelector('#routeRail');
    const bank = panel.querySelector('#routeBank');
    const lost = panel.querySelector('#routeLost');
    const commit = panel.querySelector('#routeCommit');
    // Shuffled on the stop ids, so it is stable inside a campaign and is not the
    // order the book wrote them in.
    const order = shuffleSeeded(stops.map((_, i) => i),
      stops.reduce((n, s) => n + String(s.id).length * 37, 11));
    // Where the interruption fires: after this many correct placements.
    const at = Math.max(1, Math.min(stops.length - 1, +r.interruptAfter || 2));

    const render = () => {
      rail.innerHTML = st.placed.length
        ? st.placed.map((i, n) => `<div class="chainLink"><span class="chainNum">${n + 1}</span>`
            + `<div><b>${esc(stops[i].landmark)}</b></div></div>`).join('')
        : `<div class="chainEmpty">Nothing placed yet.</div>`;
      bank.innerHTML = order.filter(i => !st.placed.includes(i))
        .map(i => `<button class="btn routeAdd" data-add="${i}" type="button">`
          + `${esc(stops[i].landmark)}</button>`).join('')
        || `<span class="chainEmpty">All placed.</span>`;
      bank.querySelectorAll('.routeAdd').forEach(b =>
        b.addEventListener('click', () => {
          if(st.done || st.lost) return;
          st.placed.push(+b.dataset.add);
          // The interruption. Not a failure — the route is blocked and the player
          // is somewhere else, which is the situation the format is about.
          if(st.placed.length === at && !st.lost){
            st.lost = true;
            lost.hidden = false;
            lost.innerHTML = `<b>The hatch ahead will not open.</b>`
              + `<p>${esc(r.detour ?? 'You go round, and come out somewhere with no label on it.'
                + ' What you can see is:')}</p>`
              + `<div class="routeLandmark">${esc(stops.find(s =>
                  String(s.id) === String(r.resumeAt))?.landmark ?? '')}</div>`
              + `<div class="routeGuess">`
              + stops.map((s, i) => `<button class="btn routeName" data-name="${i}" type="button">`
                  + `${esc(s.label)}</button>`).join('')
              + `</div>`;
            lost.querySelectorAll('.routeName').forEach(nb =>
              nb.addEventListener('click', () => {
                if(st.done) return;
                st.named = +nb.dataset.name;
                lost.querySelectorAll('.routeName').forEach((x, i) =>
                  x.classList.toggle('on', i === st.named));
                commit.disabled = false;
              }));
          }
          render();
        }));
      if(!st.lost) commit.disabled = true;
    };

    panel.querySelector('#routeGo')?.addEventListener('click', (e) => {
      panel.querySelector('#routeLit').hidden = true;
      panel.querySelector('#routeDark').hidden = false;
      e.target.disabled = true;
      render();
    });
    panel.querySelector('#routeReset')?.addEventListener('click', () => {
      if(st.done) return;
      st.placed = []; st.lost = false; st.named = null;
      lost.hidden = true; lost.innerHTML = '';
      render();
    });
    render();

    commit.addEventListener('click', () => {
      if(st.done || st.named === null) return;
      st.done = true;
      // Both halves. Getting the order right and then not knowing where you are
      // is exactly the pace count, which is the thing being replaced.
      const orderOk = st.placed.every((i, n) => String(stops[i].id) === String((r.order ?? [])[n]));
      const nameOk = String(stops[st.named]?.id) === String(r.resumeAt);
      ctx.commit(orderOk && nameOk,
        `${st.placed.length} placed in order, then named ${stops[st.named]?.label}`,
        { routePlaced: st.placed, routeNamed: st.named, routeOrderOk: orderOk });
    });
  },
  verdict(ch, r){
    const rr = ch.route ?? {};
    const stops = rr.stops ?? [];
    const rows = (rr.order ?? []).map((id, n) => {
      const s = stops.find(x => String(x.id) === String(id));
      const yours = stops[(r?.routePlaced ?? [])[n]];
      const placed = (r?.routePlaced ?? []).length > n;
      const ok = !placed || (yours && String(yours.id) === String(id));
      return row([tick(!!ok) + ` <b>${n + 1}. ${esc(s?.label ?? id)}</b>`,
        esc(s?.landmark ?? ''),
        placed && !ok ? `you had <em>${esc(yours?.landmark ?? '')}</em> here` : ''],
      ok ? '' : 'bad');
    }).join('');
    const named = stops[r?.routeNamed];
    const want = stops.find(s => String(s.id) === String(rr.resumeAt));
    return board(rr.moral ?? 'A count of paces or turns produces an answer and cannot be'
      + ' rejoined. A sequence of places can be re-entered from any point in it, which is what'
      + ' an interruption asks for',
      row([`<b>After the blocked hatch you were in</b>`, esc(want?.label ?? ''),
        `<b>you said</b>`, esc(named?.label ?? '—')],
        String(named?.id) === String(rr.resumeAt) ? '' : 'bad') + rows);
  },
  facts: (g) => `${g.route.stops.length} compartments · interrupted after`
    + ` ${g.route.interruptAfter} · resumes at ${g.route.resumeAt}`,
  tag: () => 'sequence memory',
};

/* ================================================================== DERIVE */
/**
 * DERIVE — build the derivation a line at a time, and say what licenses each one.
 *
 * The one move a mathematics course is actually about, and nothing else here can
 * render it. SEQUENCE is the near miss and it is the wrong shape twice over: it
 * hands the player every line and asks only for the order, which the ORDER probe
 * exists because it is usually guessable from the wording — and a derivation's
 * difficulty was never in the order. It is in knowing which line the previous one
 * gives you.
 *
 * So this grades the *move*: at each step the player picks the next expression
 * from candidates that are the manipulations students really make — the chain
 * rule's inner factor dropped, an exponent left undecremented, a product
 * differentiated term by term — and separately names the rule they applied.
 *
 * Three things make it a format rather than a quiz:
 *
 *   · **Both halves are graded.** Picking the right expression and calling it the
 *     power rule is not a correct step. It is the commonest way to pass calculus
 *     without learning it, and this is the only format in the set that can see it.
 *   · **The derivation carries on from the line the player chose.** A wrong turn
 *     is not refused at the moment it is made; the rail shows what they actually
 *     built, and the verdict shows where it left the correct path and what number
 *     that path would have produced. A panel that refuses a wrong line teaches the
 *     player to hunt for the one it accepts, which is the opposite of a derivation.
 *   · **Nothing marks the answer.** Candidates are shuffled on the lesson's own
 *     text, the rules are the full list for the course rather than the two that
 *     are plausible here, and the goal is stated as a *form* — "dQ/dt in terms of
 *     dH/dt" — never as the expression the derivation ends on.
 *
 * The trap, which is an importer check: at least one wrong candidate has to stay
 * algebraically *valid* for the rest of the derivation. A step whose wrong
 * branches are all immediately broken is a corridor with the walls painted to
 * look like doors, and the player learns to pick whatever is not obviously
 * malformed. `tools/import-book.mjs` refuses a DERIVE where no wrong candidate
 * carries `survives`.
 */
const DERIVE = {
  html(ch){
    const d = ch.derive ?? {};
    return ask(ch, 'Work it through, one line at a time.')
      + `<div class="instPanel derivePanel">`
      + method('DERIVE')
      + hint(d.hint ?? 'Choose the line that follows, and name the rule that gets you there.')
      + `<div class="deriveGoal"><span>Goal</span><b>${esc(d.goal ?? '')}</b></div>`
      + `<div class="deriveRail" id="deriveRail"></div>`
      + `<div class="deriveStep" id="deriveStep"></div>`
      + foot(btn('deriveBack', 'Take that line back')
        + btn('deriveTake', 'Take this step', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const d = ch.derive ?? {};
    const panel = container.querySelector('.derivePanel');
    if(!panel) return;
    const steps = d.steps ?? [];
    const rules = d.rules ?? [];
    const rail = panel.querySelector('#deriveRail');
    const stepEl = panel.querySelector('#deriveStep');
    const take = panel.querySelector('#deriveTake');
    const back = panel.querySelector('#deriveBack');
    // Per step, and seeded on that step's own text: stable within a campaign,
    // never the order the book wrote them in.
    const orderFor = (i) => shuffleSeeded((steps[i].candidates ?? []).map((_, n) => n),
      String(steps[i].ask ?? i).split('').reduce((n, c) => n + c.charCodeAt(0), 11));
    const st = { at: 0, taken: [], pick: null, rule: null, done: false };

    const lineHTML = (text, n, rule, bad) =>
      `<div class="deriveLine${bad ? ' bad' : ''}"><span class="deriveNum">${n}</span>`
      + `<code>${esc(text)}</code>`
      + (rule ? `<em>${esc(rule)}</em>` : '') + `</div>`;

    const render = () => {
      rail.innerHTML = lineHTML(d.start ?? '', 0, d.startNote ?? 'given')
        + st.taken.map((t, n) => lineHTML(
          steps[n].candidates[t.pick]?.text ?? '', n + 1,
          t.rule, false)).join('');

      if(st.at >= steps.length || st.done){
        stepEl.innerHTML = `<div class="deriveDone">Every line is down. Commit it.</div>`;
        take.textContent = d.commit ?? 'Commit the derivation';
        take.disabled = false;
        back.disabled = st.taken.length === 0;
        return;
      }
      const s = steps[st.at];
      stepEl.innerHTML = `<div class="deriveAsk">${esc(s.ask ?? '')}</div>`
        + `<div class="deriveCands">`
        + orderFor(st.at).map(i => `<button class="btn deriveCand${st.pick === i ? ' on' : ''}"`
          + ` data-cand="${i}" type="button"><code>${esc(s.candidates[i].text)}</code></button>`).join('')
        + `</div>`
        + `<div class="deriveRulesHead">and the rule that licenses it</div>`
        + `<div class="deriveRules">`
        + rules.map(r => `<button class="btn deriveRule${st.rule === r ? ' on' : ''}"`
          + ` data-rule="${esc(r)}" type="button">${esc(r)}</button>`).join('')
        + `</div>`;
      take.textContent = st.at === steps.length - 1
        ? (d.lastStep ?? 'Take the last step') : 'Take this step';
      take.disabled = st.pick === null || st.rule === null;
      back.disabled = st.taken.length === 0;

      stepEl.querySelectorAll('[data-cand]').forEach(b => b.addEventListener('click', () => {
        if(st.done) return;
        st.pick = +b.dataset.cand; render();
      }));
      stepEl.querySelectorAll('[data-rule]').forEach(b => b.addEventListener('click', () => {
        if(st.done) return;
        st.rule = b.dataset.rule; render();
      }));
    };
    render();

    back.addEventListener('click', () => {
      if(st.done || !st.taken.length) return;
      const last = st.taken.pop();
      st.at = st.taken.length;
      st.pick = last.pick; st.rule = last.rule;
      render();
    });

    take.addEventListener('click', () => {
      if(st.done) return;
      if(st.at < steps.length){
        st.taken.push({ pick: st.pick, rule: st.rule });
        st.at += 1;
        st.pick = null; st.rule = null;
        render();
        return;
      }
      st.done = true;
      const wrong = st.taken.map((t, n) => {
        const s = steps[n];
        const lineOk = t.pick === +s.answer;
        const ruleOk = String(t.rule) === String(s.candidates[+s.answer]?.rule ?? '');
        return lineOk && ruleOk ? null : { n, lineOk, ruleOk };
      }).filter(Boolean);
      const ok = wrong.length === 0;
      ctx.commit(ok,
        st.taken.map((t, n) => steps[n].candidates[t.pick]?.text).join('  →  '),
        { deriveTaken: st.taken, deriveWrong: wrong });
    });
  },
  verdict(ch, r){
    const d = ch.derive ?? {};
    const steps = d.steps ?? [];
    const taken = r?.deriveTaken ?? [];
    const rows = steps.map((s, n) => {
      const t = taken[n];
      const key = s.candidates[+s.answer] ?? {};
      const chosen = t ? s.candidates[t.pick] ?? {} : {};
      const lineOk = t && t.pick === +s.answer;
      const ruleOk = t && String(t.rule) === String(key.rule ?? '');
      return row([
        `<b>${n + 1}</b>`,
        `<code>${esc(chosen.text ?? '—')}</code>`,
        `${tick(!!lineOk)} line`,
        `${esc(t?.rule ?? '—')} ${tick(!!ruleOk)}`,
      ], lineOk && ruleOk ? '' : 'bad')
        // The reason the wrong move is wrong, which is the whole teaching value
        // of a distractor. A step that fails silently teaches nothing.
        + (lineOk ? '' : row([' ', `<em>${esc(chosen.why ?? key.why ?? '')}</em>`, ' ',
          `<em>${esc(key.text ? `should be ${key.text}` : '')}</em>`], 'note'));
    }).join('');
    return board(d.caption ?? 'Each line, and what licenses it.', rows);
  },
  // `facts` is handed the challenge, not the block — the dev page printed
  // "0 line(s) · 0 rules offered" for a panel with four of each.
  facts: (g) => `${(g.derive?.steps ?? []).length} line(s) ·`
    + ` ${(g.derive?.rules ?? []).length} rules offered · goal ${g.derive?.goal ?? '—'}`,
  tag: () => 'derivation',
};

/* ================================================================ registry */

export const INSTRUMENTS = {
  // Tier 1 of FORMATS.md — four or more authored instances each.
  TRIGGER, VALUE, CLOUD, ALLOCATE, TRACE, ATTEST,
  CONTROL, TRIANGULATE, DEGENERACY, CHAIN, BALANCE, VERIFY,
  // The thirteenth, written for a calculus course: the one move a mathematics
  // syllabus is about, which none of the twelve above can express.
  DERIVE,
  // Tier 2 — two or three each, and ROUTE with one. Thinner reach, same rules:
  // nothing marks the answer, the panel never prints the target, difficulty is
  // judgment, and a wrong action gets a consequence with physics in it.
  PROPAGATE, STRESS, DELEGATE, FLY, RESIDUAL, INJECT, ROUTE,
};

/** The block name a format keeps its data under: TRIGGER -> `trigger`. */
export const INSTRUMENT_BLOCK = Object.fromEntries(
  Object.keys(INSTRUMENTS).map(k => [k, k.toLowerCase()]));

/** Whether a canonical format name is one of these twelve. */
export const isInstrument = (kind) => Object.hasOwn(INSTRUMENTS, String(kind ?? ''));
