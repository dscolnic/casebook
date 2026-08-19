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
import { createPlaySurface, roundRect, fitText } from './playSurface.js';

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
  TRIGGER: 'Decide now at what reading you would act — before that reading exists. The action takes time to happen, so the line goes back from the limit by however far the quantity travels while it is being carried out. Draw it too far along and the rule fires with no time left to act on; draw it too early and it fires on a reading that showed nothing, which is not a rule but a standing order. Once the board is released the line is fixed and the readings fire it on their own.',
  VALUE: 'You cannot buy everything on this board. Buy the evidence that would change the decision — not the evidence that would make you more certain about something already settled.',
  CLOUD: 'The band is everything the measurements permit. Moving the middle of it moves the whole band; only new information makes it narrower. Get enough of it inside the limits.',
  ALLOCATE: 'Every item you buy is a question you can answer and, because the pool runs out, one you cannot. Watch the answers list, and know which one you are giving up.',
  TRACE: 'Open each channel to see what it was computed from. Keep the ones that stand on their own measurement, name the source the rest share, and do not throw away what never touched it.',
  ATTEST: 'Every claim here is signed. You cannot verify them all, so verify the ones that would hurt if they were wrong — and hold anything the evidence does not actually support.',
  CONTROL: 'Change one thing, run the measurement, then put it back and run it again. A reading names a cause only if the effect follows the change in both directions.',
  TRIANGULATE: 'One station gives a distance, not a place. Switch in enough of them to cross, decide what to do about the station you were warned about, then report the position.',
  DEGENERACY: 'Two controls, one measurement. Find out how many combinations fit it equally before you commit to any of them, and bring in the second measurement when you see why you need it.',
  // Neutral about WHAT travels, deliberately. Thirteen of the fourteen CHAIN
  // stops in the repo carry air, water, heat, current or oxygen; exactly one is
  // a structural load path. This line said "force reaches the ground" to all of
  // them, which is the format telling a sixth grader reading a scrubber panel
  // that the answer is about something not on the screen.
  CHAIN: 'Whatever this path carries has to be handed on by every link in it. Build the path in the order it actually travels, then name the one link it cannot get past — the rest of the chain does not get to be better than that one.',
  BALANCE: 'Reading a stream costs nothing. Counting it is a claim that it is part of the same quantity — so read everything, and count only what actually flows.',
  DERIVE: 'Take the derivation one line at a time, choosing the expression the previous line actually gives you. A wrong turn is not refused — the rail shows what you built, and the verdict shows where it left the correct path and what that path would have produced.',
  VERIFY: 'Lock a prediction first; it cannot be changed afterwards. Then act, and then spend what it takes to find out what actually happened. Not measuring is an answer too, and a poor one.',
  PROPAGATE: 'Each term contributes its own width times the power it is raised to. Find which one the output\'s uncertainty is really made of, then buy the measurement that shrinks it.',
  STRESS: 'The assumption has a range because nobody measured it exactly. Move it to the pessimistic end before you choose, and pick what still works there rather than what wins in the middle.',
  DELEGATE: 'Keep the one thing nobody else can do. Everything else goes to a person, with a first action and a condition that brings them back — an owner on their own is not a handover.',
  RESIDUAL: 'Look at what each fit leaves over, not at the number underneath it. Residuals that look like noise mean the model is complete; a pattern in them means something is missing.',
  INJECT: 'The population going in has known truth, so what comes back out measures your own pipeline. Judge a configuration by the thing you actually needed, not by how much it found.',
  ROUTE: 'Learn it as places, not as a count of paces or turns. Something will interrupt the route, and the only thing that survives an interruption is knowing where you are standing.',
  BELT: 'Send each thing to the side it belongs on before it reaches the end of the belt. The belt speeds up and there is no time to reason it out, which is the point: this is the sorting you should already be able to do without stopping to think.',
  LOB: 'Set the angle and the charge, and put it on the mark. Nothing here tells you the launch speed, so this cannot be computed — it has to be felt, and the way to feel it is to watch where the short one landed and move one control at a time.',
  STACK: 'Keep the stack down and answer the question on the rail. A wrong answer drops a packed row in under everything you have built, so the two halves are not separate: the questions are what the game costs you, and the stack is what makes you answer them under pressure rather than at leisure.',
  SPOT: 'Take only the ones the standing instruction wants. The instruction is written at the top of the board and it will be replaced during the run — nothing announces the change, and the cost of not noticing is the whole of what this measures.',
  HOLD: 'One number, one control, and something that will not stop pushing. Find out which way the control moves the number before you need to know, because the disturbances arrive whether you are ready or not and the band you have to stay inside gets narrower as the run goes on.',
  TRIAL: 'Run the route yourself. Every gate is lit and none of them is marked as next, because the order is the answer — work out which one has to come first and go there. There is a limit on the clock and it is enough to walk the route; what is graded is the order you took them in, not how fast.',
  GREET: 'Get round the site and say hello to as many of the people on the list as you can before the hour is out — not all of them, and the number you need is on the panel. Walking up to somebody is enough. Which of them you reach is decided before you set off, by the order you choose to walk them in.',
  FOLLOW: 'Stay with somebody who is walking somewhere and will not wait for you. There is a near figure as well as a far one, so this is a band rather than a chase: get in front of them when they stop and you have lost them as surely as dropping behind.',
  HUNT: 'Find a number of the same thing, scattered about, before the time goes. They are all on the map, so nothing is hidden — what is being asked is which ones are worth the walk and when to stop looking and come back.',
  CANVASS: 'Ask people a yes-or-no question and then answer it yourself. Everybody will answer and nobody will tell you how many is enough; ask only the nearest few and you have measured where you were standing rather than the thing you asked about.',
  EVADE: 'Keep a stated distance between you and somebody for a stated stretch of time. They are slower than you and they do not walk through buildings, so being caught is never a matter of speed — it is a matter of which ground you were on when they arrived.',
  TAG: 'Catch somebody who is walking away from you. They are slower than you are, so this is never a footrace — walking straight at them closes the gap at the difference between two walking paces, which is not quick enough on its own. What catches them is the fence, a building, or the corner they have to turn.',

  // The four that live in questionUI.js rather than here — Quantum's own panels,
  // built before this registry existed. Their lines are here because METHOD is
  // the one description of what each format's move is; keeping four of them in
  // another file is how the same sentence ends up written twice and differently.
  //
  // They had no method line and no goal line at all until a player got as far as
  // HOLDOUT and could not tell what either set of data was. Every other panel in
  // the engine answers "what kind of move is this" before it asks anything, and
  // these four — the most instrument-like in the whole engine — answered it
  // nowhere.
  SWEEP: 'Drag the control across its range and watch the response. Nothing is plotted until you visit it, so the shape of the curve is something you build by looking; the feature you are asked for is somewhere in it, and it is not marked.',
  HOLDOUT: 'You have two batches of the same kind of data. Choose your setting using the first batch only — then freeze it, which hands the frozen setting a batch it played no part in choosing. The second number is the honest one, and it is the one you report.',
  TALLY: 'Take shots in batches and watch the trace of the statistic they build. Early on it moves because there is not enough data behind it, not because anything is changing. The question is where it converges: run until the trace stops wandering, decide that it has, and report the value you had when you said so.',
  PROBE: 'No readings are given to you. Take them one station at a time along the chain, and find the place where the pattern changes — which is not the same as the place with the worst number on it.',
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
/**
 * What the player is aiming at, printed BEFORE they act.
 *
 * Rule 2 below says the panel never prints the *target* — meaning the answer.
 * This is the other thing, and conflating the two cost a stop: FLY graded a plan
 * against four numbers (arrive at 90 ± 3, stop, spend no more than 16 s of
 * thruster) and printed none of them until after the single run it allowed, so
 * the player set two sliders with no idea what either was for. The answer is
 * still the plan; a goal is the constraint the plan is written against, and a
 * constraint nobody can see is not difficulty, it is a guessing game.
 *
 * The line only goes on formats where the criterion is something to PLAN
 * against. Grading slack on a value the player reports — a BALLPARK tolerance,
 * a VERIFY band, a HOLDOUT pass mark — stays unprinted: knowing it changes
 * nothing about how you get there, and printing it invites aiming at the edge.
 */
/**
 * A quantity and its unit, agreeing in number.
 *
 * A junior edition writes its units as words — "degrees a second", not "deg/s" —
 * and a goal line reading "no more than 1 degrees a second" is the kind of thing
 * a sixth grader notices and an adult reads straight past. Only the leading word
 * is touched, and only where the unit is words: anything with a slash in it is a
 * symbol and "1 m/s" is already correct.
 */
const qty = (v, unit, d = 0) => {
  const u = String(unit ?? '').trim();
  if(!u) return nf(v, d);
  const one = Math.abs(Math.abs(+v) - 1) < 1e-9;
  const [head, ...rest] = u.split(' ');
  const single = one && !u.includes('/') && head.length > 2 && head.endsWith('s')
    ? [head.slice(0, -1), ...rest].join(' ') : u;
  return `${nf(v, d)} ${single}`;
};
/** Zero is zero. `-0.000` on a readout is a rounding artefact reading as a fault. */
const nz = (v) => (Math.abs(+v) < 5e-4 ? 0 : +v);
/**
 * A duration in the unit a person plans in, hours kept alongside.
 *
 * TRIGGER authors lead times in hours because that is what the grade compares,
 * and Headwater's board then reads "needs 120 h of lead" on a scale measured per
 * *day*, against a stream whose updates are two days apart. Three units in one
 * row, and the arithmetic that turns 120 into "five days, so the first two
 * updates" is the whole decision. Anything under two days stays in hours, where
 * hours are what a person would say.
 */
/** The same duration, short enough for an axis tick: 45m, 12h, 7d. */
const hoursShort = (h) => {
  const n = +h;
  if(!Number.isFinite(n)) return '';
  if(n < 1) return `${Math.round(n * 60)}m`;
  if(n < 48) return `${nf(n, Number.isInteger(n) ? 0 : 1)}h`;
  const days = n / 24;
  return `${Math.abs(days - Math.round(days)) < 1e-9 ? Math.round(days) : days.toFixed(1)}d`;
};
const hoursWords = (h) => {
  const n = +h;
  if(!Number.isFinite(n)) return '—';
  // Under the hour it is minutes. Ground Truth's launch window is 0.05 h of lead,
  // which rounded to "0 h" — a stage announcing that it needs no time at all.
  if(n < 1) return `${Math.round(n * 60)} min`;
  if(n < 48) return `${nf(n, Number.isInteger(n) ? 0 : 1)} h`;
  const days = n / 24;
  const dd = Math.abs(days - Math.round(days)) < 1e-9 ? String(Math.round(days)) : days.toFixed(1);
  return `${dd} days (${nf(n, 0)} h)`;
};
const goal = (parts) => {
  const list = (Array.isArray(parts) ? parts : [parts])
    .map(p => String(p ?? '').trim()).filter(Boolean);
  return list.length
    ? `<div class="instGoal"><span>What counts as done</span><ul>`
      + list.map(p => `<li>${esc(p)}</li>`).join('') + `</ul></div>`
    : '';
};
/**
 * The format's own line about what the move is. Rendered above the stop's hint.
 *
 * Skipped where the stop carries a `guide` — its second paragraph is the
 * instruction, written for that stop, and this is the generic version of the same
 * sentence. `ch.briefed` is stamped by engine/content/normalize.js from the lesson,
 * because a panel here is handed the challenge and nothing else. The stop's own
 * hint and its "what counts as done" both stay: they are short, specific, and the
 * goal is the constraint the answer is written against — see FLY, and the note on
 * rule 2 at the top of this file.
 */
const method = (fmt, ch) => (METHOD[fmt] && !ch?.briefed
  ? `<div class="instMethod"><span>What you are doing</span>${esc(METHOD[fmt])}</div>` : '');
/**
 * Both blocks, for the four panels that live in questionUI.js.
 *
 * SWEEP, HOLDOUT, TALLY and PROBE predate this file and are rendered there. They
 * still get the same two lines every panel here gets, and they get them from this
 * function rather than from a copy of the markup — the classes are styled once,
 * `fieldCoverage` follows them once, and a change to what "What counts as done"
 * looks like cannot apply to twenty-four panels and miss four.
 */
export { method as methodBlock, goal as goalBlock };
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
 * THREE ways to be wrong, and the third one was missing for as long as this
 * format has existed. A threshold that never fires. A threshold that fires so
 * late the action's own lead time has already run out. And — the one that made
 * every board in the repo free — a threshold that fires **too early**, on a
 * reading that had not yet shown the problem. Grading only the late half meant
 * the scale floor was a winning answer everywhere: it fires on update 0, which
 * has the most hours left of any update in the stream, so the panel congratulated
 * a player who had touched nothing. All fifteen authored stops passed untouched.
 *
 * So a stage carries a `window` — the band of readings it is allowed to fire on,
 * authored per stop and never printed, because it is the answer. What IS printed
 * is what the window is written against: the lead time each action needs, the
 * `consequenceLimit` the reading must not cross, and the stop's own `objective`.
 * That is the FLY distinction — print the constraint, never the target.
 *
 * `direction` is the other half. Five of the streams in the repo fall rather than
 * rise (germination dropping, a reserve draining), and `value >= threshold` cannot
 * express "act when it drops below 90" at all — on a falling board the floor of
 * the scale fired on the first reading and the format was pure decoration. A
 * falling board tests `value <= threshold`.
 *
 * The stream is scripted and the same for everybody, so the board is graded on
 * the rules and not on luck.
 */
const TRIGGER = {
  /**
   * Where each rule is allowed to fire, as stream indices.
   *
   * The window is authored in scale units because that is what the player reads,
   * but the two failure modes — too soon, too late — are about position in the
   * stream, and comparing indices is direction-agnostic where comparing values is
   * not. Computed once here so the panel, the grade and the verdict cannot drift.
   */
  window(t, c){
    const stream = t.stream ?? [];
    const w = c.window ?? {};
    const lo = Number.isFinite(+w.min) ? +w.min : -Infinity;
    const hi = Number.isFinite(+w.max) ? +w.max : Infinity;
    const idx = stream.map((x, i) => (+x.value >= lo && +x.value <= hi ? i : -1))
      .filter(i => i >= 0);
    return idx.length ? { first: idx[0], last: idx[idx.length - 1] } : null;
  },
  /** The first update a threshold fires on, honouring the board's direction. */
  fireIndex(t, thr){
    const stream = t.stream ?? [];
    const falling = t.direction === 'falling';
    return stream.findIndex(x => (falling ? +x.value <= thr : +x.value >= thr));
  },
  /**
   * The first point of any series a threshold catches. `fireIndex` is this against
   * tonight's stream; the panel also runs it against the rehearsal, which is how a
   * player can see what a number means before spending the readings that grade it.
   */
  crossIndex(series, thr, falling){
    if(!Array.isArray(series) || !Number.isFinite(+thr)) return -1;
    return series.findIndex(x => (falling ? +x.value <= +thr : +x.value >= +thr));
  },
  /** One stage's outcome. `ok` needs all three: it fired, in time, in window. */
  grade(t, c, thr){
    const stream = t.stream ?? [];
    const k = this.fireIndex(t, thr);
    if(k < 0) return { fired: false, why: 'never' };
    const hit = stream[k];
    const win = this.window(t, c);
    const inTime = +hit.hoursLeft >= +c.leadHours;
    const soon = win ? k < win.first : false;
    const overdue = win ? k > win.last : false;
    return { fired: true, at: hit.at, value: +hit.value, hoursLeft: +hit.hoursLeft,
      inTime, soon, overdue, ok: inTime && !soon && !overdue,
      why: !inTime ? 'late' : soon ? 'soon' : overdue ? 'overdue' : 'ok' };
  },
  /**
   * The board as a picture: time along the bottom, the scale up the side.
   *
   * This is the fix for the complaint that no amount of prose answered. The player
   * sets a number on the *value* axis and is graded on where that number lands on
   * the *time* axis — which update it is first crossed by, and whether that update
   * still leaves the action its lead time. That is a mapping between two axes, and
   * a mapping between two axes is a plot. Three sliders and a paragraph asked
   * everybody to do the projection in their head.
   *
   * Nothing here animates. A panel that ran its own frame loop would need a
   * teardown hook and would put `instrumentDrive` back in the business of counting
   * frames, which has already cost a day once. The SVG is rebuilt on every slider
   * input and once more on release.
   *
   * What is drawn before the board is released: the axes, every update's position
   * in time, the rehearsal trace if the stop authors one, and each stage's own
   * line — solid while it would still be in time, dashed past the point where its
   * lead time has run out. What is NOT drawn is tonight's readings, which are the
   * answer.
   */
  plot(t, sc, st = {}){
    const stream = t.stream ?? [];
    const conds = t.conditions ?? [];
    if(!stream.length) return '';
    const d = decimals(sc.step);
    const falling = t.direction === 'falling';
    const W = 560, H = 250, L = 46, R = 14, T = 12, B = 44;
    const lo = +sc.min, hi = +sc.max;
    const h0 = +stream[0].hoursLeft;
    const span = Math.max(1e-6, h0 - +stream[stream.length - 1].hoursLeft);
    const px = (hoursLeft) => L + ((h0 - +hoursLeft) / span) * (W - L - R);
    const py = (v) => T + (1 - (Math.min(hi, Math.max(lo, +v)) - lo) / (hi - lo)) * (H - T - B);
    const COLOURS = ['#2f6f8f', '#b06a2a', '#6b5bb0', '#3f8f56'];
    const line = (x1, y1, x2, y2, attr) =>
      `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}"`
      + ` y2="${y2.toFixed(1)}" ${attr}/>`;
    let g = '';
    // The value axis: three labelled rules, so a threshold can be read off.
    [lo, (lo + hi) / 2, hi].forEach(v => {
      g += line(L, py(v), W - R, py(v), 'stroke="#e6eaee" stroke-width="1"')
        + `<text x="${L - 6}" y="${(py(v) + 3.5).toFixed(1)}" text-anchor="end"`
        + ` class="trigPlotTick">${nf(v, d)}</text>`;
    });
    // The time axis. Every update has a position on it; the labels thin out rather
    // than overlap, because a board can carry twelve updates.
    // Which updates get a name under them. Greedy from the left with a minimum gap,
    // and the last one always, dropping whatever it would have collided with — a
    // twelve-update board printed "update 10" through "update 11" otherwise.
    const labelled = [];
    let lastX = -Infinity;
    stream.forEach((u, i) => {
      const x = px(u.hoursLeft);
      if(x - lastX >= 82){ labelled.push(i); lastX = x; }
    });
    const lastI = stream.length - 1;
    if(!labelled.includes(lastI)){
      if(labelled.length && px(stream[lastI].hoursLeft) - px(stream[labelled[labelled.length - 1]].hoursLeft) < 82){
        labelled.pop();
      }
      labelled.push(lastI);
    }
    stream.forEach((u, i) => {
      const x = px(u.hoursLeft);
      g += line(x, T, x, H - B, 'stroke="#eef1f4" stroke-width="1"')
        + line(x, H - B, x, H - B + 4, 'stroke="#c3ccd2" stroke-width="1"');
      if(labelled.includes(i)){
        // The first and last labels are anchored to their ends, or they run off the
        // plot — the last one read "Saturday 2" for exactly that reason.
        const anchor = i === 0 ? 'start' : i === stream.length - 1 ? 'end' : 'middle';
        const ax = i === 0 ? L : i === stream.length - 1 ? W - R : x;
        g += `<text x="${ax.toFixed(1)}" y="${H - B + 16}" text-anchor="${anchor}"`
          + ` class="trigPlotTick">${esc(String(u.at))}</text>`
          + `<text x="${ax.toFixed(1)}" y="${H - B + 28}" text-anchor="${anchor}"`
          + ` class="trigPlotTick dim">${esc(hoursShort(u.hoursLeft))} left</text>`;
      }
    });
    g += line(L, H - B, W - R, H - B, 'stroke="#c3ccd2" stroke-width="1"')
      + line(L, T, L, H - B, 'stroke="#c3ccd2" stroke-width="1"');
    // A past campaign of the same quantity. It is not this campaign and cannot be
    // read off as the answer; what it gives is the one thing a bare scale cannot,
    // which is what a number on it looks like when it happens.
    // Once the board is released the past campaign has done its job, and leaving it
    // under tonight's readings is two traces of the same quantity on one picture.
    const reh = st.released ? [] : (t.rehearsal?.stream ?? []).filter(x => Number.isFinite(+x.value));
    if(reh.length > 1){
      const pts = reh.map(x => `${px(x.hoursLeft).toFixed(1)},${py(x.value).toFixed(1)}`).join(' ');
      // Solid once the player has actually run their rules against it: a practice
      // run is a run, and a dotted ghost reads as background either way.
      g += `<polyline points="${pts}" fill="none" stroke="#a9b4bc"`
        + ` stroke-width="${st.practice ? 2.4 : 2}"`
        + `${st.practice ? '' : ' stroke-dasharray="1 3"'} stroke-linecap="round"/>`;
      if(st.practice){
        reh.forEach(x => { g += `<circle cx="${px(x.hoursLeft).toFixed(1)}"`
          + ` cy="${py(x.value).toFixed(1)}" r="2.5" fill="#a9b4bc"/>`; });
      }
      // Named in the corner, not at the end of its own trace: the trace ends wherever
      // that campaign happened to end, which is often under somebody's threshold line.
      g += `<text x="${W - R - 4}" y="${T + 11}" text-anchor="end" class="trigPlotTick dim">`
        + `${esc(t.rehearsal?.note ?? 'a past campaign')} · grey</text>`;
    }
    // The line the whole board is written against. It is a constraint, not the
    // answer — the answer is where the player's own rules go — and a board that
    // grades against pH 7.5 while printing no 7.5 anywhere is the FLY defect.
    if(Number.isFinite(+t.consequenceLimit)){
      const ly = py(+t.consequenceLimit);
      g += line(L, ly, W - R, ly, 'stroke="#c0392b" stroke-width="1.5" stroke-dasharray="6 4"')
        + `<text x="${W - R - 4}" y="${(ly - 5).toFixed(1)}" text-anchor="end"`
        + ` class="trigPlotName" fill="#c0392b">limit ${nf(+t.consequenceLimit, d)}`
        + `${sc.unit ? ' ' + esc(sc.unit) : ''}</text>`;
    }
    // Tonight's readings, once the board is signed and not before.
    if(st.released){
      const pts = stream.map(x => `${px(x.hoursLeft).toFixed(1)},${py(x.value).toFixed(1)}`).join(' ');
      g += `<polyline points="${pts}" fill="none" stroke="#2f4652" stroke-width="2.4"`
        + ` stroke-linejoin="round"/>`;
      stream.forEach(x => { g += `<circle cx="${px(x.hoursLeft).toFixed(1)}"`
        + ` cy="${py(x.value).toFixed(1)}" r="3" fill="#2f4652"/>`; });
    }
    // One line per stage, at the number that stage is set to. Solid where it would
    // still be in time; dashed from the point its lead time has run out, which is
    // the constraint the row states in words.
    // Two stages set to nearly the same number put their names on top of each
    // other, which is how the first version rendered "Notify the reach" through
    // "Clear the low-lying farms". Labels are nudged apart, the lines are not.
    const taken = [];
    const labelY = (y) => {
      // Below the line when there is no room above it: a falling board opens with
      // every threshold at the top of the scale, and the names went off the picture.
      let ly = y - 5 < T + 10 ? y + 12 : y - 5;
      while(taken.some(u => Math.abs(u - ly) < 11)) ly += 11;
      if(ly > H - B - 4) ly = Math.max(T + 10, y - 5 - 11 * (taken.length + 1));
      taken.push(ly);
      return ly;
    };
    conds.forEach((c, i) => {
      const thr = st.thresholds?.[i];
      if(!Number.isFinite(+thr)) return;
      const y = py(thr);
      const colour = COLOURS[i % COLOURS.length];
      let k = -1;
      stream.forEach((x, j) => { if(+x.hoursLeft >= +c.leadHours) k = j; });
      const edge = k < 0 ? L
        : k >= stream.length - 1 ? W - R
          : (px(stream[k].hoursLeft) + px(stream[k + 1].hoursLeft)) / 2;
      // Where this line would have been crossed on the past campaign. Without it the
      // picture does not move when the slider does — the complaint that the curve
      // looks the same wherever the lines go — and the player has no way to see that
      // a threshold is a *time* until tonight's readings have already been spent.
      const rk = TRIGGER.crossIndex(reh, thr, falling);
      if(rk >= 0){
        g += `<circle cx="${px(reh[rk].hoursLeft).toFixed(1)}" cy="${py(thr).toFixed(1)}" r="4.5"`
          + ` fill="#fff" stroke="${colour}" stroke-width="2"/>`;
      }
      const name = String(c.label).length > 26 ? String(c.label).slice(0, 25) + '…' : c.label;
      g += line(L, y, edge, y, `stroke="${colour}" stroke-width="2"`)
        + line(edge, y, W - R, y, `stroke="${colour}" stroke-width="2" stroke-dasharray="3 4"`
          + ' opacity="0.5"')
        + `<text x="${L + 5}" y="${labelY(y).toFixed(1)}" class="trigPlotName"`
        + ` fill="${colour}">${esc(name)}</text>`;
      // Where this line caught the run, and what that cost.
      //
      // Tonight's readings are scripted and identical whatever the player does —
      // that is what makes the board a test of the rules rather than of luck — so
      // the only thing their choice moves is this mark. A player reported the trace
      // as "identical no matter the levels", which it is; the mark is the answer to
      // that, and it has to be loud enough to be the thing you look at.
      const f = (st.released ? st.fired?.[i] : st.practice?.[i]);
      if(f && f.fired){
        const x = px(f.hoursLeft);
        const mark = !st.released ? COLOURS[i % COLOURS.length]
          : f.ok ? '#3f8f56' : '#c0392b';
        const at = st.released ? f.hoursLeft : f.hoursLeft;
        g += line(x, y, x, H - B, `stroke="${mark}" stroke-width="1.2" stroke-dasharray="2 3"`)
          + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#fff"`
          + ` stroke="${mark}" stroke-width="3"/>`
          + `<text x="${(x + 9).toFixed(1)}" y="${(y - 8).toFixed(1)}" class="trigPlotName"`
          + ` fill="${mark}">fired · ${esc(hoursShort(at))} left</text>`;
      }
    });
    const yTitle = `${sc.label ?? ''}${sc.unit ? ` (${sc.unit})` : ''}`;
    return `<div class="trigPlot"><svg viewBox="0 0 ${W} ${H}" role="img"`
      + ` aria-label="${esc(yTitle)} against time">${g}</svg>`
      + `<div class="trigPlotFoot"><span>${esc(yTitle)} up the side, time along the bottom`
      + `</span><span>${st.released
        ? 'the readings are the same whatever you set — your line decides when the action fires'
        : st.practice ? 'where your line would have caught that run'
          : falling ? 'a rule fires when the trace drops to its line'
            : 'a rule fires when the trace reaches its line'}</span></div></div>`;
  },
  html(ch){
    const t = ch.trigger ?? {};
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const falling = t.direction === 'falling';
    const unit = sc.unit ? ' ' + esc(sc.unit) : '';
    // The slider opens at the end of the scale that cannot be a right answer, and
    // the importer asserts that both ends fail. An opening position that grades as
    // correct is the defect this whole format had.
    const start = falling ? +sc.max : +sc.min;
    const stream = t.stream ?? [];
    // The last update that still leaves this action its lead time. Derived, never
    // authored: `hoursLeft` never increases, so this is the deadline the row is
    // written against and the player can be told it outright. It is a constraint,
    // not the answer — which reading showed the problem is what stays hidden.
    const lastInTime = (c) => {
      let k = -1;
      stream.forEach((x, i) => { if(+x.hoursLeft >= +c.leadHours) k = i; });
      return k;
    };
    const byLine = (c) => {
      if(!stream.length) return '';
      const k = lastInTime(c);
      // Calm where the deadline binds nothing. An orange line under every row reads
      // as three warnings, and the one row that really is short of time stops being
      // the one the eye goes to.
      if(k >= stream.length - 1){
        return `<div class="trigBy plain">Every update leaves the ${hoursWords(c.leadHours)}`
          + ' this needs.</div>';
      }
      const said = k < 0
        ? `No update arrives with the ${hoursWords(c.leadHours)} this needs.`
        : `In time only up to ${esc(stream[k].at)} — later updates arrive with less than the`
          + ` ${hoursWords(c.leadHours)} it needs.`;
      return `<div class="trigBy">${said}</div>`;
    };
    const rows = (t.conditions ?? []).map((c, i) => `<div class="trigRow" data-cond="${i}">`
      + `<div class="trigHead"><b>${esc(c.label)}</b>`
      + `<span class="trigLead">needs ${esc(hoursWords(c.leadHours))} of lead</span></div>`
      + (c.owner || c.action
          ? `<div class="trigWho">${esc([c.owner, c.action].filter(Boolean).join(' · '))}</div>` : '')
      + `<div class="trigSet"><span>fires at or ${falling ? 'below' : 'above'}</span>`
      + `<input class="trigRange" type="range" min="${sc.min}" max="${sc.max}" step="${sc.step}"`
      + ` value="${start}"><b class="trigAt">${nf(start, d)}${unit}</b></div>`
      + byLine(c)
      + `<div class="trigResult" data-result="${i}"></div></div>`).join('');
    // The board, drawn. This replaces a text timetable of the same updates: the
    // schedule was the half of the problem a list could carry, and where a
    // threshold lands in time was the half it could not.
    const plot = `<div class="trigPlotBox" id="trigPlot">`
      + TRIGGER.plot(t, sc, { thresholds: (t.conditions ?? []).map(() => start) })
      + `</div>`;
    // What a reading on this scale would mean, authored per stop. A rate scale is
    // meaningless without the thing it fills: "1.2 m a day" is a number until
    // somebody says the crest is three days away at it, and then the lead times
    // become arithmetic instead of atmosphere.
    const anchors = (sc.anchors ?? []).map(a => `<div class="trigAnchor">`
      + `<b>${nf(+a.at, d)}${unit}</b><span>${esc(a.means)}</span></div>`).join('');
    const anchorBlock = anchors
      ? `<div class="trigAnchors"><div class="trigWhenHead">What a reading on this scale means`
        + `</div>${anchors}</div>` : '';
    // The name of the thing every slider is set on. It was in the data and on no
    // screen: the rows say "fires at or above" and then a number, so a player who
    // had not held on to the scene did not know whether they were setting a rate, a
    // level or a probability. Inside the rows box rather than above it, because a
    // caption is not a seventh block.
    const scaleName = sc.label
      ? `<div class="trigScale">The line below is set on <b>${esc(sc.label)}</b>`
        + `${sc.unit ? `, in ${esc(sc.unit)}` : ''}</div>` : '';
    // The limit's own precision, not the slider's. A step of 0.05 renders a pH
    // ceiling of 7.5 as "7.50", which reads as a tolerance rather than a line. And
    // it is dropped where the stop's own objective already names that number, or
    // the goal block says the same thing twice in two voices.
    const limit = Number.isFinite(+t.consequenceLimit)
      && !String(t.objective ?? '').includes(String(+t.consequenceLimit))
      ? `${sc.label || 'The reading'} never ${falling ? 'falls past' : 'passes'}`
        + ` ${+t.consequenceLimit}${sc.unit ? ' ' + sc.unit : ''}.`
      : '';
    // One sentence where every stage needs the same lead, because "1 h, 1 h of
    // lead" reads as a list of two different numbers that happen to match.
    const leads = [...new Set((t.conditions ?? []).map(c => +c.leadHours))];
    const leadLine = leads.length
      ? `The rule fires with its full ${hoursWords(leads[0])} of lead still on the clock.`
      : '';
    const nCond = (t.conditions ?? []).length;
    return ask(ch, 'Write the thresholds before the next update exists.')
      + `<div class="instPanel trigPanel">`
      + method('TRIGGER', ch)
      + goal([
        leadLine,
        limit,
        t.objective || 'No rule fires on a reading that had not yet shown it was needed.',
        'It is not fired by a reading that had shown nothing yet.',
      ])
      + hint(t.hint ?? `The readings ${falling ? 'fall' : 'climb'} once you release the board,`
        + ' and your rule fires on its own. Put the line where you would want the action'
        + ' taken — too far along and it fires with no time left to carry it out, too early'
        + ' and it fires before the readings have told you anything.')
      + plot
      + anchorBlock
      + `<div class="trigRows">${scaleName}${rows}</div>`
      + `<div class="trigStream" id="trigStream"></div>`
      + foot(((t.rehearsal?.stream ?? []).length > 1
          ? btn('trigTry', t.rehearse ?? 'Try this line on the last run') : '')
        + btn('trigRelease', t.release ?? 'Release the board', { primary: true })
        + btn('trigCommit', t.commit ?? 'Stand by the board', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.trigger ?? {};
    const panel = container.querySelector('.trigPanel');
    if(!panel) return;
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const falling = t.direction === 'falling';
    const unit = sc.unit ? ' ' + sc.unit : '';
    const conds = t.conditions ?? [];
    const stream = t.stream ?? [];
    const start = falling ? +sc.max : +sc.min;
    const st = { thresholds: conds.map(() => start), released: false, fired: [], practice: null };
    const plotBox = panel.querySelector('#trigPlot');
    const draw = () => { if(plotBox) plotBox.innerHTML = TRIGGER.plot(t, sc, st); };
    /**
     * What this line would have done on the past campaign, live under its own
     * slider.
     *
     * A threshold is a number the player sets and a *moment* they are graded on,
     * and until the board is released nothing connected the two — so moving a
     * slider changed a horizontal line and nothing else, and every position felt
     * identical. The rehearsal is a campaign that has already happened, so saying
     * where this line would have caught it gives away nothing about tonight while
     * making the number mean something before it is committed.
     */
    const reh = t.rehearsal?.stream ?? [];
    const say = (i) => {
      const cell = panel.querySelector(`[data-result="${i}"]`);
      if(!cell || !reh.length) return;
      st.practice = null;
      const c = conds[i];
      const k = TRIGGER.crossIndex(reh, st.thresholds[i], falling);
      const note = t.rehearsal?.note ?? 'the past campaign';
      cell.className = 'trigResult rehearse';
      const said = note.charAt(0).toUpperCase() + note.slice(1);
      cell.textContent = k < 0
        ? `${said}: this line was never reached.`
        : `${said}: this line would have fired with `
          + `${hoursWords(reh[k].hoursLeft)} left, and it needs ${hoursWords(c.leadHours)}.`;
    };
    conds.forEach((c, i) => say(i));
    const release = panel.querySelector('#trigRelease');
    const commit = panel.querySelector('#trigCommit');
    const log = panel.querySelector('#trigStream');

    panel.querySelectorAll('.trigRow').forEach((rowEl, i) => {
      const range = rowEl.querySelector('.trigRange');
      const at = rowEl.querySelector('.trigAt');
      range.addEventListener('input', () => {
        if(st.released) return;
        st.thresholds[i] = +range.value;
        at.textContent = `${nf(+range.value, d)}${unit}`;
        say(i);
        draw();
      });
    });

    /**
     * Run the player's own lines against the campaign that has already happened,
     * as many times as they like.
     *
     * The format's subject is that a decision made before the data is a different
     * decision, so tonight's readings can be spent exactly once — but a player who
     * cannot try anything is a player guessing, which is what "I still cannot follow
     * it" turned out to mean. A past campaign costs nothing to replay. What it
     * reports is *timing* only — where each line was caught, and whether that left
     * the action its lead time — and never whether the line was right, because
     * right is a property of tonight's readings and of the window that grades them.
     */
    const tryIt = panel.querySelector('#trigTry');
    tryIt?.addEventListener('click', () => {
      if(st.released) return;
      const past = { ...t, stream: reh };
      st.practice = conds.map((c, i) => {
        const g = TRIGGER.grade(past, { ...c, window: null }, st.thresholds[i]);
        return { ...g, ok: g.fired && g.inTime };
      });
      st.practice.forEach((f, i) => {
        const cell = panel.querySelector(`[data-result="${i}"]`);
        if(!cell) return;
        cell.className = 'trigResult ' + (!f.fired ? 'never' : f.inTime ? 'good' : 'late');
        cell.textContent = !f.fired
          ? `On that run this line was never reached — the action never happened.`
          : f.inTime
            ? `On that run it fired with ${hoursWords(f.hoursLeft)} left, which covers the `
              + `${hoursWords(conds[i].leadHours)} it needs.`
            : `On that run it fired with only ${hoursWords(f.hoursLeft)} left, and it needs `
              + `${hoursWords(conds[i].leadHours)} — too late to carry out.`;
      });
      draw();
    });

    release.addEventListener('click', () => {
      if(st.released) return;
      st.released = true;
      release.disabled = true;
      commit.disabled = false;
      st.practice = null;
      if(tryIt) tryIt.disabled = true;
      panel.querySelectorAll('.trigRange').forEach(r => { r.disabled = true; });
      // Tonight's readings go on the same axes the rules were drawn on.
      // The stream, one line at a time, exactly as scripted.
      log.innerHTML = `<div class="trigStreamHead">The updates, as they came</div>`
        + stream.map(s => `<div class="trigTick"><b>${esc(s.at)}</b><span>${esc(s.update)}</span>`
          + `<em>${nf(s.value, d)}${unit} · ${esc(hoursWords(s.hoursLeft))} left</em></div>`).join('');
      // Each rule fires at the first update that reaches it.
      st.fired = conds.map((c, i) => TRIGGER.grade(t, c, st.thresholds[i]));
      draw();
      st.fired.forEach((f, i) => {
        const cell = panel.querySelector(`[data-result="${i}"]`);
        if(!cell) return;
        cell.className = 'trigResult ' + (f.ok ? 'good' : !f.fired ? 'never' : 'late');
        cell.textContent = !f.fired
          ? 'Never fired — no reading ever reached this line.'
          : f.ok
            ? `Fired at ${f.at}, with ${hoursWords(f.hoursLeft)} in hand.`
            : !f.inTime
              ? `Fired at ${f.at} — ${hoursWords(f.hoursLeft)} left, and it needs`
                + ` ${hoursWords(conds[i].leadHours)}.`
              : f.soon
                ? `Fired at ${f.at}, before the reading showed this action was needed.`
                : `Fired at ${f.at} — in time to act, but later than this action should wait.`;
      });
    });

    commit.addEventListener('click', () => {
      if(!st.released) return;
      const ok = st.fired.length > 0 && st.fired.every(f => f && f.ok);
      const right = st.fired.filter(f => f && f.ok).length;
      ctx.commit(ok,
        `${right} of ${conds.length} stages fired where they should have`,
        { triggerFired: st.fired, triggerThresholds: st.thresholds });
    });
  },
  verdict(ch, r){
    const t = ch.trigger ?? {};
    const sc = t.scale ?? {};
    const d = decimals(sc.step);
    const unit = sc.unit ? ' ' + sc.unit : '';
    const fired = r?.triggerFired ?? [];
    const rows = (t.conditions ?? []).map((c, i) => {
      const f = fired[i];
      const ok = !!(f && f.ok);
      const said = !f || !f.fired ? 'never fired'
        : !f.inTime ? `fired ${esc(f.at)}, ${esc(hoursWords(f.hoursLeft))} left of the`
          + ` ${esc(hoursWords(c.leadHours))} it needs`
        : f.soon ? `fired ${esc(f.at)}, before the readings showed it was needed`
        : f.overdue ? `fired ${esc(f.at)} — in time to act, but this action should have gone earlier`
        : `fired ${esc(f.at)}, ${esc(hoursWords(f.hoursLeft))} in hand`;
      return row([tick(ok) + ' <b>' + esc(c.label) + '</b>',
        `your rule: ${t.direction === 'falling' ? '≤' : '≥'} `
          + `${nf(r?.triggerThresholds?.[i], d)}${unit}`,
        said], ok ? '' : 'bad');
    }).join('');
    // The same picture the player set the board on, with tonight's readings drawn.
    //
    // It used to be a lineChart on `hoursLeft`, which runs the axis from most time
    // remaining to least — so the verdict plotted the campaign backwards against the
    // panel, and a stream that climbed on the board fell on the answer card. A
    // player reported exactly that, and it is the same class of defect as the two
    // reading-level rulers: two views of one thing that disagree about an axis.
    const chart = TRIGGER.plot(t, sc,
      { released: true, thresholds: r?.triggerThresholds ?? [], fired });
    return chart + board('A rule that fires after its lead time has gone is a rule about'
      + ' something that can no longer be done — and one that fires before the readings'
      + ' show a problem is not a rule, it is a standing order', rows);
  },
  facts: (g) => `${g.trigger.conditions.length} stages · ${g.trigger.stream.length} updates`
    + ` · scale ${g.trigger.scale.min}–${g.trigger.scale.max} ${g.trigger.scale.unit ?? ''}`
    + (g.trigger.direction === 'falling' ? ' · falling' : ''),
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
      + method('VALUE', ch)
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
 * CLOUD — a distribution against a boundary, and the two numbers that report it.
 *
 * "You moved the dot. The cloud came with it." Every game asks for this and none
 * of the older formats can show it: a number with an error bar printed on a card
 * is read as a number. Here the spread is drawn as a spread, the corridor is
 * drawn as a corridor, and the fraction outside is a live readout that a
 * retarget does not improve.
 *
 * **The mean and the uncertainty are reported by placing them.** Three bars over
 * the scatter — the middle, and ±1σ either side of it — and the panel counts what
 * falls where as they move: how many points below the middle, how many above,
 * how many between the σ bars. A pair placed right splits the cloud in half and
 * holds about 68% of it, which is what one sigma *means*. A player who has only
 * ever read "9 ± 2" off a card has never had to find either number, and no
 * earlier version of this panel asked them to: it printed the true centre and
 * the true spread on its own readouts.
 *
 * Dragging the middle bar carries both σ bars with it, and dragging either σ bar
 * moves the other one the same distance the other way. That is the format's moral
 * rendered as a control: moving the nominal moves the whole band and changes
 * nothing about its width, and an uncertainty has one number in it, not two.
 *
 * `shift` actions move the centre. `narrow` actions multiply the spread. The
 * importer refuses a book where shifting alone reaches `pass`, because that is
 * the whole argument. An action redraws the cloud, which makes the report stale:
 * both bars have to be placed again, and the strip under the plot says which is
 * outstanding rather than grey-ing the button and saying nothing.
 *
 * What is graded: the reported middle and the reported σ against the cloud the
 * player is looking at, and the reported band's share inside the corridor against
 * `pass`. The bell drawn on the plot is the player's *own* report, never the
 * truth — a curve with its peak on the answer is a mean nobody has to find. The
 * tolerances stay unprinted: grading slack on a value the player reports is not a
 * goal, for the reason in the note on `goal` above.
 */
/**
 * Where a bar's caption sits, given the bar.
 *
 * The two σ captions are anchored outward — end on the low bar, start on the high
 * one — so that a narrow band does not stack three words in the same six pixels.
 * Which means the margin that keeps a caption inside the plot is different at each
 * end, and getting it wrong puts text outside the viewBox: invisible, and read by
 * the driver's overflow probe as a panel wider than its card.
 */
const cloudLabelX = (k, at) => (k === 'lo' ? clamp(at - 3, 24, 316)
  : k === 'hi' ? clamp(at + 3, 4, 296) : clamp(at, 16, 304));
/** The drawn window, the σ slider's range and its step — html and bind agree. */
const cloudFrame = (lo, hi) => {
  // Wider than the corridor, or a cloud sitting outside it is invisible and the
  // format has nothing to teach.
  const wLo = lo - (hi - lo) * 0.9, wHi = hi + (hi - lo) * 0.9;
  const step = (wHi - wLo) / 400;
  return { wLo, wHi, step, sigMin: step, sigMax: (wHi - wLo) / 2 };
};
const CLOUD = {
  html(ch){
    const c = ch.cloud ?? {};
    const b = c.bounds ?? {};
    const lo = +b.min, hi = +b.max;
    const { wLo, wHi, step, sigMin, sigMax } = cloudFrame(lo, hi);
    const d = decimals((hi - lo) / 100);
    // The bars open nowhere near the cloud. A bar that starts on the answer is a
    // bar nobody has to place, and the report is the question here.
    const mu0 = wLo + (wHi - wLo) * 0.12, sig0 = (wHi - wLo) * 0.08;
    const at = (v) => clamp(((v - wLo) / ((wHi - wLo) || 1)) * 320, 1, 319);
    const bar = (k, v, label, extra = '') =>
      `<g class="cloudHandle${extra}" data-h="${k}">`
      + `<line x1="${at(v).toFixed(1)}" x2="${at(v).toFixed(1)}"`
      + ` y1="${k === 'mu' ? 10 : 12}" y2="${k === 'mu' ? 108 : 106}"/>`
      + `<text x="${cloudLabelX(k, at(v)).toFixed(1)}" y="138">${label}</text></g>`;
    const acts = (c.actions ?? []).map((a, i) =>
      `<button class="btn cloudAct" data-act="${i}" type="button">${esc(a.label)}`
      + (a.cost ? `<span class="cloudCost">${esc(String(a.cost))} ${esc(c.costUnit ?? 'h')}</span>` : '')
      + `</button>`).join('');
    return ask(ch, 'Report the middle and the uncertainty, and say whether it clears the limits.')
      + `<div class="instPanel cloudPanel">`
      + method('CLOUD', ch)
      + hint(c.hint ?? 'The band is what the measurements permit, not what is most likely.'
        + ' Everything in it is a trajectory you might actually be on.')
      // The pass mark is a budgeting constraint, not the answer: which actions
      // buy it is still the whole question. Without it the live "inside the
      // limits" readout is a percentage against nothing, and the player cannot
      // tell a plan that is finished from one that is two purchases short.
      + goal([`Finish with at least ${(+c.pass * 100).toFixed(1)}% of the band you report inside`
        + `${b.label ? ' ' + b.label : ' the limits'}`,
        'Place the middle bar where the mean is, then a σ bar so that about 68.3% of the'
        + ' points sit between the two of them and the rest split evenly outside',
        (c.actions ?? []).some(a => a.cost)
          ? `Every action costs ${c.costUnit ?? 'h'} and can only be taken once` : ''])
      + `<svg class="cloudPlot" viewBox="0 0 320 142" role="img"`
      + ` aria-label="Distribution against ${esc(b.label ?? 'the limits')}">`
      + `<rect width="320" height="142" fill="#f7f9fa"/>`
      + `<rect class="cloudBand" x="0" y="14" width="0" height="86" fill="#e6f0e9"/>`
      + `<rect class="cloudRepBand" x="0" y="14" width="0" height="86"/>`
      + `<line class="cloudEdge" data-edge="lo" y1="10" y2="104" stroke="#c0392b" stroke-width="1.5"/>`
      + `<line class="cloudEdge" data-edge="hi" y1="10" y2="104" stroke="#c0392b" stroke-width="1.5"/>`
      + `<g class="cloudDots"></g>`
      // The bell is the player's own report drawn back at them, not the truth.
      + `<polyline class="cloudCurve" fill="none" stroke="#b06a2a" stroke-width="2" points=""/>`
      // Placed here as well as in `render`, because a panel rendered and never
      // bound — instruments.html, the driver's overflow probe — otherwise draws
      // three bars at x = 0 with centred labels hanging off the left edge.
      + bar('lo', mu0 - sig0, '−1σ') + bar('hi', mu0 + sig0, '+1σ')
      + bar('mu', mu0, 'mean', ' cloudMid')
      + `<g class="cloudScale"></g></svg>`
      + `<div class="cloudSliders">`
      + `<label class="cloudSlide"><span>the middle</span>`
      + `<input class="cloudRange" id="cloudMu" type="range" min="${wLo}" max="${wHi}"`
      + ` step="${step}" value="${mu0}" aria-label="the mean you report"></label>`
      + `<label class="cloudSlide"><span>one sigma each side</span>`
      + `<input class="cloudRange" id="cloudSig" type="range" min="${sigMin}" max="${sigMax}"`
      + ` step="${step}" value="${sig0}" aria-label="the uncertainty you report"></label>`
      + `</div>`
      + `<div class="sweepReadouts">`
      + `<div class="sweepReadout"><span>below / above</span><b class="cloudSplit">—</b></div>`
      + `<div class="sweepReadout"><span>inside one sigma</span><b class="cloudWithin">—</b></div>`
      + `<div class="sweepReadout"><span>you report</span><b class="cloudReport">—</b></div>`
      + `<div class="sweepReadout sweepTotal"><span>band inside the limits</span>`
      + `<b class="cloudInside">—</b></div>`
      + `</div>`
      + `<div class="cloudActs">${acts}</div>`
      + `<div class="cloudGate"></div>`
      + foot(btn('cloudCommit', c.commit ?? 'Report it', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const c = ch.cloud ?? {};
    const panel = container.querySelector('.cloudPanel');
    if(!panel) return;
    const b = c.bounds ?? {};
    const lo = +b.min, hi = +b.max;
    const d = decimals((hi - lo) / 100);
    const { wLo, wHi, sigMin, sigMax } = cloudFrame(lo, hi);
    const st = { centre: +c.centre, spread: +c.spread, used: new Set(), done: false, spent: 0 };
    const rep = { mu: wLo + (wHi - wLo) * 0.12, sig: (wHi - wLo) * 0.05,
                  placedMu: false, placedSig: false };
    const px = (v) => ((v - wLo) / ((wHi - wLo) || 1)) * 320;
    const unpx = (p) => wLo + clamp(p / 320, 0, 1) * (wHi - wLo);

    const svg = panel.querySelector('.cloudPlot');
    const curve = panel.querySelector('.cloudCurve');
    const dots = panel.querySelector('.cloudDots');
    const band = panel.querySelector('.cloudBand');
    const repBand = panel.querySelector('.cloudRepBand');
    const splitEl = panel.querySelector('.cloudSplit');
    const withinEl = panel.querySelector('.cloudWithin');
    const reportEl = panel.querySelector('.cloudReport');
    const insideEl = panel.querySelector('.cloudInside');
    const gateEl = panel.querySelector('.cloudGate');
    const commitEl = panel.querySelector('#cloudCommit');
    const muRange = panel.querySelector('#cloudMu');
    const sigRange = panel.querySelector('#cloudSig');
    const handle = (k) => panel.querySelector(`.cloudHandle[data-h="${k}"]`);
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
    const raw = Array.from({ length: N }, () => gauss());
    // Standardised, so the cloud on the screen has exactly the mean and the
    // spread the book authored. The report is graded against what the player can
    // see, and 90 draws off a seed are a fifth of a sigma out on the mean — which
    // would be the difference between a right answer and a wrong one, decided by
    // the seed rather than by the player.
    const m0 = raw.reduce((a, z) => a + z, 0) / N;
    const s0 = Math.sqrt(raw.reduce((a, z) => a + (z - m0) * (z - m0), 0) / N) || 1;
    const shape = raw.map(z => (z - m0) / s0);
    const sample = () => shape.map(z => st.centre + z * st.spread);

    const setMu = (v) => { rep.mu = clamp(v, wLo, wHi); rep.placedMu = true; };
    const setSig = (v) => { rep.sig = clamp(v, sigMin, sigMax); rep.placedSig = true; };

    const render = () => {
      const xs = sample();
      const pts = [];
      for(let i = 0; i <= 80; i++){
        const x = wLo + ((wHi - wLo) * i) / 80;
        const z = (x - rep.mu) / Math.max(rep.sig, 1e-9);
        pts.push(`${px(x).toFixed(1)},${(100 - 78 * Math.exp(-0.5 * z * z)).toFixed(1)}`);
      }
      curve.setAttribute('points', pts.join(' '));
      dots.innerHTML = xs.map((x, i) => {
        const out = x < lo || x > hi;
        return `<circle cx="${clamp(px(x), 2, 318).toFixed(1)}"`
          + ` cy="${(96 - (i % 9) * 2.1).toFixed(1)}" r="1.5"`
          + ` fill="${out ? '#c0392b' : '#2f6f8f'}" opacity=".75"/>`;
      }).join('');
      const rLo = rep.mu - rep.sig, rHi = rep.mu + rep.sig;
      repBand.setAttribute('x', px(rLo).toFixed(1));
      repBand.setAttribute('width', Math.max(0, px(rHi) - px(rLo)).toFixed(1));
      for(const [k, v] of [['mu', rep.mu], ['lo', rLo], ['hi', rHi]]){
        const g = handle(k);
        if(!g) continue;
        const at = clamp(px(v), 1, 319);
        g.querySelector('line').setAttribute('x1', at.toFixed(1));
        g.querySelector('line').setAttribute('x2', at.toFixed(1));
        // Kept off both edges: a centred label at x = 319 hangs half of itself
        // outside the viewBox, which reads as a clipped panel.
        g.querySelector('text').setAttribute('x', cloudLabelX(k, at).toFixed(1));
      }
      // The counts are the whole point: they move as the bars move, and they are
      // what a placement is argued from. Below and above are the mean's own test
      // — a middle in the right place halves the cloud — and the count between
      // the σ bars is the uncertainty's.
      const below = xs.filter(x => x < rep.mu).length;
      const within = xs.filter(x => x >= rLo && x <= rHi).length;
      splitEl.textContent = `${below} / ${xs.length - below}`;
      withinEl.textContent = `${within}/${xs.length} · ${(within / xs.length * 100).toFixed(0)} %`;
      reportEl.textContent = `${nf(rep.mu, d)} ± ${nf(rep.sig, d)}${b.unit ? ' ' + b.unit : ''}`;
      const f = insideFraction(rep.mu, rep.sig, lo, hi);
      insideEl.textContent = `${(f * 100).toFixed(1)} %`;
      st.inside = f;
      const want = [!rep.placedMu ? 'place the middle bar' : '',
                    !rep.placedSig ? 'place a σ bar' : ''].filter(Boolean);
      gateEl.textContent = st.done ? ''
        : want.length ? `Still to do: ${want.join(' and ')}.`
        : `${below} points below the middle, ${xs.length - below} above,`
          + ` ${within} between the σ bars.`;
      gateEl.classList.toggle('waiting', !st.done && want.length > 0);
      if(commitEl) commitEl.disabled = st.done || want.length > 0;
    };

    const sync = () => {
      if(muRange) muRange.value = String(rep.mu);
      if(sigRange) sigRange.value = String(rep.sig);
    };
    sync();
    render();

    muRange?.addEventListener('input', () => { setMu(+muRange.value); render(); });
    sigRange?.addEventListener('input', () => { setSig(+sigRange.value); render(); });

    // Dragging the bars themselves, because "move the mean to where it is" is the
    // move and a slider is the accessible way to do the same thing. Both write
    // one state; touch needs `touch-action:none` on the plot, which the sheet
    // sets, or the browser scrolls the card instead.
    let grab = null;
    const xAt = (ev) => {
      const r = svg.getBoundingClientRect();
      return unpx(((ev.clientX - r.left) / (r.width || 1)) * 320);
    };
    svg.addEventListener('pointerdown', (ev) => {
      if(st.done) return;
      const x = xAt(ev);
      let best = null, bd = Infinity;
      for(const [k, v] of [['mu', rep.mu], ['lo', rep.mu - rep.sig], ['hi', rep.mu + rep.sig]]){
        const dd = Math.abs(px(v) - px(x));
        if(dd < bd){ bd = dd; best = k; }
      }
      if(bd > 18) return;
      grab = best;
      ev.preventDefault();
      try{ svg.setPointerCapture(ev.pointerId); }catch{}
    });
    svg.addEventListener('pointermove', (ev) => {
      if(!grab || st.done) return;
      const x = xAt(ev);
      // A σ bar drags the other one with it: an uncertainty is one number, and
      // two half-widths would be a different claim about the distribution.
      if(grab === 'mu') setMu(x); else setSig(Math.abs(x - rep.mu));
      sync();
      render();
    });
    // Released on the window, not on the plot: a drag that finishes with the
    // pointer past the edge of the SVG otherwise never lets go, and the bar
    // follows the cursor around the card afterwards.
    for(const e of ['pointerup', 'pointercancel']){
      svg.addEventListener(e, () => { grab = null; });
      window.addEventListener(e, () => { grab = null; });
    }

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
        // The cloud has moved, so the report describes a measurement that no
        // longer exists. Both bars go back to being unplaced.
        rep.placedMu = false;
        rep.placedSig = false;
        render();
      });
    });

    panel.querySelector('#cloudCommit')?.addEventListener('click', () => {
      if(st.done || !rep.placedMu || !rep.placedSig) return;
      st.done = true;
      // Tolerances scale with the cloud the player is looking at: a spread that
      // has been narrowed can be located better, and a fixed number would make a
      // narrowed stop harder than the one it replaced. Authorable, never printed.
      const tolMu = Number.isFinite(+c.report?.centreTol) ? +c.report.centreTol : 0.3 * st.spread;
      const tolSig = Number.isFinite(+c.report?.spreadTol) ? +c.report.spreadTol : 0.3 * st.spread;
      const muOk = Math.abs(rep.mu - st.centre) <= tolMu;
      const sigOk = Math.abs(rep.sig - st.spread) <= tolSig;
      const insideOk = st.inside >= +c.pass;
      const ok = muOk && sigOk && insideOk;
      ctx.commit(ok, `reported ${nf(rep.mu, d)} ± ${nf(rep.sig, d)}`
        + `, ${(st.inside * 100).toFixed(1)}% of that band inside`
        + (muOk ? '' : ' · the middle is not where the points are')
        + (sigOk ? '' : ' · the band is the wrong width for this scatter')
        + (muOk && sigOk && !insideOk ? ' · reported honestly and it does not clear the limits' : ''),
        { cloudInside: st.inside, cloudCentre: st.centre, cloudSpread: st.spread,
          cloudRepCentre: rep.mu, cloudRepSpread: rep.sig,
          cloudMuOk: muOk, cloudSigOk: sigOk, cloudUsed: [...st.used] });
      render();
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
    const left = Number.isFinite(r?.cloudCentre)
      ? bell(r.cloudCentre, r.cloudSpread, 'where you left it') : null;
    const said = Number.isFinite(r?.cloudRepCentre)
      ? bell(r.cloudRepCentre, r.cloudRepSpread, 'what you reported') : null;
    const d = decimals((hi - lo) / 100);
    const readNote = r?.cloudMuOk === false || r?.cloudSigOk === false
      ? ` The measurements sat at ${nf(r?.cloudCentre, d)} ± ${nf(r?.cloudSpread, d)}`
        + `, and you reported ${nf(r?.cloudRepCentre, d)} ± ${nf(r?.cloudRepSpread, d)}:`
        + ' a middle in the right place has half the points either side of it, and a σ bar in the'
        + ' right place has about 68 of every 100 between the pair.'
      : '';
    return lineChart({
      series: [bell(+c.centre, +c.spread, 'as it started'),
               ...(left ? [left] : []), ...(said ? [said] : [])],
      marks: [{ x: lo, label: `${nf(lo, 1)} ${b.unit ?? ''}` },
              { x: hi, label: `${nf(hi, 1)} ${b.unit ?? ''}` }],
      xLabel: `${b.label ?? ''}${b.unit ? ` (${b.unit})` : ''}`,
      caption: `${((r?.cloudInside ?? 0) * 100).toFixed(1)}% of the band you reported finished inside`
        + ` the limits; ${(c.pass * 100).toFixed(1)}% was needed. Moving the nominal slides the`
        + ' whole curve — only information makes it narrower.' + readNote,
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
      + method('ALLOCATE', ch)
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

/**
 * TRACE's correction, printed as a given rather than left in the verdict.
 *
 * Aftershock's wrong zero graded the keep-set and the named source, and its
 * answerText then reasoned "a threefold ratio becomes roughly 4.8" from an
 * amplification of 1.6 that appeared on no screen: the book authored a
 * `correction` block, the importer dropped it, and no renderer had ever read it.
 * A player could name the source correctly and still not know what the reference
 * had turned out to be, which is the one fact the correction consists of.
 *
 * Every field is a string the book wrote. The engine does no arithmetic and
 * carries no seismology: a correction is a factor here and a clock offset
 * somewhere else, and the units are the author's to state — a numeric
 * `referenceAmplification: 1.6` rendered by the engine is how "3.0" ended up on
 * the board meaning nothing. `corrected` is deliberately NOT printed here; it is
 * the number the correction moves, which is the verdict's half.
 */
const correctionBlock = (c) => {
  if(!c) return '';
  const line = (k, v) => (String(v ?? '').trim()
    ? `<div class="traceFixLine"><span>${esc(k)}</span>${esc(v)}</div>` : '');
  // One word each: the column is fixed-width and "Taken to be" wrapped to three
  // lines beside a one-line value, which read as four separate rows.
  const body = line('Re-measured', c.what) + line('Assumed', c.was)
    + line('Measured', c.now) + line('So', c.effect);
  return body
    ? `<div class="traceFix"><div class="traceFixHead">The correction, already made</div>${body}</div>`
    : '';
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
      + method('TRACE', ch)
      + hint(t.hint ?? 'Open a channel to see what it was computed from. Tick the ones whose'
        + ' evidence still stands, then name the source at fault.')
      + correctionBlock(t.correction)
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
    // The other half of the correction: what the dependent numbers become. It is
    // teaching, so it arrives here rather than on the panel — and it arrives at
    // all, which it did not while `correction` reached no renderer.
    const moved = String(t.correction?.corrected ?? '').trim()
      ? `<tr><td><b>What it moves</b></td><td colspan="3">${esc(t.correction.corrected)}</td></tr>`
      : '';
    return board(
      r?.traceNamedOk && !r?.traceKeepOk
        ? 'The right source, and too much thrown away with it — the numerator was measured'
          + ' correctly, only the label on the denominator was wrong'
        : 'A shared source biases exactly what used it. Everything measured on its own chain'
          + ' keeps its evidence',
      row([`<b>You named</b>`, esc(named?.label ?? '—'),
        `<b>the source at fault was</b>`,
        esc((t.resources ?? []).find(x => String(x.id) === String(t.target))?.label ?? String(t.target))],
        r?.traceNamedOk ? '' : 'bad') + rows + moved);
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
      + method('ATTEST', ch)
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
      + method('CONTROL', ch)
      + hint(c.hint ?? 'Change what you like and run the measurement. What you change is a'
        + ' decision; what it tells you depends on how many things moved.')
      // The commit is gated on isolating the suspect and then reversing it, and
      // for as long as those were unstated a player who had named a machine sat
      // looking at a greyed-out button with nothing telling them what was
      // missing. Neither line says which machine — only what a finished
      // experiment looks like, which is the format's whole subject.
      + goal([`Run a trial with exactly one thing changed — several at once names none of them`,
        `Put it back and run it again; the reading has to follow the change both ways`,
        `Then name the one doing it`])
      + `<div class="ctrlHeld">held constant: ${esc((c.held ?? []).join(', ') || 'nothing stated')}</div>`
      + `<div class="ctrlVars">${rows}</div>`
      + `<div class="ctrlNeeds" id="ctrlNeeds"></div>`
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
    // `alone` is every variable that has been trialled by itself; `back` is every
    // one of those that has since been trialled *not* changed. Both are about
    // what the player did, never about which variable is the culprit — the gate
    // used to be `isolated the truth && reversed the truth`, which meant the
    // commit button lit up at the moment the player happened to secure the right
    // machine. That is rule 1 of this file, broken by the enabling rule of a
    // button: a player who cannot answer can find the answer by watching for the
    // click to become available.
    const st = { changed: new Set(), trials: 0, named: null, done: false,
      alone: new Set(), back: new Set() };
    const readEl = panel.querySelector('.ctrlRead');
    const trialsEl = panel.querySelector('.ctrlTrials');
    const log = panel.querySelector('#ctrlLog');
    const commit = panel.querySelector('#ctrlCommit');
    const truthIx = vars.findIndex(v => String(v.id) === String(c.truth));
    let draw = 0;

    const needs = panel.querySelector('#ctrlNeeds');
    // Live, and phrased as what is still outstanding rather than as a scolding.
    // Every line is about the variable the player has NAMED, so it says nothing
    // until they have named one and nothing about whether that choice is right.
    const refresh = () => {
      const isolated = st.named !== null && st.alone.has(st.named);
      const reversed = st.named !== null && st.back.has(st.named);
      commit.disabled = st.named === null || !isolated || !reversed;
      if(!needs) return;
      const who = st.named === null ? 'the one you name' : vars[st.named]?.label ?? '';
      const want = [
        [st.named !== null, 'a machine named'],
        [isolated, `a trial with ${who} changed and nothing else`],
        [reversed, `a trial with ${who} put back`],
      ];
      needs.innerHTML = want.map(([got, what]) =>
        `<span class="ctrlNeed ${got ? 'got' : ''}">${tick(!!got)} ${esc(what)}</span>`).join('');
    };

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
        st.alone.add([...st.changed][0]);
        text = `${nf(readingWith(suspectOff), 1)}${obs.unit ? ' ' + obs.unit : ''}`
          + ` — with ${vars[[...st.changed][0]].label} ${c.changeVerb ?? 'changed'}`;
        cls = '';
      }
      // The other half of the reversal: any variable already trialled on its own
      // and now not changed has been put back and measured again. A baseline run
      // reverses everything that has been isolated so far; a different single
      // change reverses all but itself.
      st.alone.forEach(i => { if(!st.changed.has(i)) st.back.add(i); });
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
      + method('TRIANGULATE', ch)
      + hint(t.hint ?? 'Switch a station in to draw what its own measurement permits. Click the'
        + ' map to report where you think it is.')
      // Three stations is a procedural requirement with nothing on screen to
      // announce it: a player who crosses two rings has a plausible point, marks
      // it, and is graded down for a rule they were never told. Saying so gives
      // away no position — where the rings cross is still theirs to find.
      + goal([`At least three stations switched in — two rings cross in a place,`
        + ` and that place is not a fix`,
        `Report a position within ${t.tolerance}${t.unit ? ' ' + t.unit : ''} of the true one`,
        t.systematic ? `Decide what to do about the station you were warned about` : ''])
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
      + method('DEGENERACY', ch)
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
 * the wall panel, the bearing, the pump. A path is limited by its weakest
 * *required* link, and how generous everything either side of it is does not
 * enter, which is a sentence nobody believes until they have built the chain.
 *
 * Three things a sixth grader found on the same panel, all of them here rather
 * than in any book:
 *  - **The bank printed only the label.** What a link *transfers* — the whole
 *    reason it sits where it sits — appeared only after it was placed, so the
 *    first pass through the path was a guess made from five nouns and the
 *    subtitles arrived as a report on a decision already taken.
 *  - **Nothing came back off the rail.** One misplacement and the only way out
 *    was Start again, from the top, five clicks.
 *  - **The format spoke about force.** See the METHOD note above.
 */
const CHAIN = {
  html(ch){
    const c = ch.chain ?? {};
    return ask(ch, 'Follow it from one end to the other.')
      + `<div class="instPanel chainPanel">`
      + method('CHAIN', ch)
      + hint(c.hint ?? 'Put the transfers in the order the thing actually travels, then say which'
        + ' one decides what the whole path can do.')
      + `<div class="chainRail" id="chainRail"></div>`
      + `<div class="chainPrompt" id="chainPrompt" hidden>Now click the link that governs it.</div>`
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
      const full = st.placed.length === (c.order ?? []).length;
      rail.innerHTML = st.placed.length
        ? st.placed.map((i, n) => `<div class="chainLink${st.governing === i ? ' gov' : ''}`
            + `${full ? ' pickable' : ''}" data-gov="${i}"><span class="chainNum">${n + 1}</span>`
            + `<div><b>${esc(links[i].label)}</b><em>${esc(links[i].transfers ?? '')}</em>`
            // The observed state of this link. On the rail rather than in the
            // bank, because it is what you weigh AFTER the path is built — a
            // reading beside a card you have not placed yet answers "which one
            // governs" before "what order is it in" has been asked.
            + (links[i].reading ? `<span class="chainRead">${esc(links[i].reading)}</span>` : '')
            + `</div>`
            // "this one governs" on every row at once is five identical
            // instructions where one is wanted; the invitation is the prompt
            // line below the rail, and the caption is hidden by CSS until the
            // row is hovered or chosen.
            + (full ? `<span class="chainPick">${st.governing === i ? 'governs' : 'this one governs'}</span>` : '')
            + `<button class="chainDrop" data-drop="${n}" type="button"`
            + ` aria-label="Take ${esc(links[i].label)} back off the path">×</button></div>`).join('')
        : `<div class="chainEmpty">Nothing placed yet.</div>`;
      // The bank says what each one CARRIES, not only what it is called. The
      // subtitle is the whole basis for ordering the path, and printing it only
      // after placement made the first pass a guess off five nouns.
      bank.innerHTML = order.filter(i => !st.placed.includes(i))
        .map(i => `<button class="btn chainAdd" data-add="${i}" type="button">`
          + `<b>${esc(links[i].label)}</b>`
          + (links[i].transfers ? `<em>${esc(links[i].transfers)}</em>` : '')
          + `</button>`).join('') || `<span class="chainEmpty">All placed.</span>`;
      // The path, not the bank: the bank may hold decoys that do not belong in
      // the path at all, and requiring every one of them to be placed would make
      // the decoy compulsory.
      commit.disabled = !full || st.governing === null;
      panel.querySelector('#chainPrompt').hidden = !full || st.governing !== null;
      bank.querySelectorAll('.chainAdd').forEach(b =>
        b.addEventListener('click', () => {
          if(st.done) return;
          st.placed.push(+b.dataset.add);
          render();
        }));
      // One placement comes back off the rail. Without this the only way out of
      // a single wrong link was Start again, which threw away four correct ones.
      // stopPropagation because the row itself is the governing picker once the
      // path closes — the same bubbling trap that made TRACE grade every right
      // answer wrong.
      rail.querySelectorAll('.chainDrop').forEach(b =>
        b.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if(st.done) return;
          st.placed.splice(+b.dataset.drop, 1);
          st.governing = null;   // the path is open again, so nothing governs yet
          render();
        }));
      // Only once the whole path is closed. Naming the governing link out of a
      // half-built chain is naming it out of a list, which is the format this
      // one replaces.
      if(full){
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
    return board(c.moral ?? 'A path runs at whatever its weakest required link allows. How'
      + ' generous everything either side of it is does not enter',
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
      + method('BALANCE', ch)
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
      + method('VERIFY', ch)
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
 * player watches fail to help. One of the candidates is not measurable at all
 * this season, which is the honest shape of the decision rather than a menu.
 *
 * `budget` is the second half of that, and for a while it was missing: the panel
 * printed a cost on every button, said "one of these is affordable", and had no
 * ledger anywhere in the engine, the importer or any book. So cost entered
 * neither the buttons nor the grade, and the constraint the prose claimed was
 * decoration. The ledger is now authored in the book's own `costUnit`, spent
 * across as many measurements as it covers, and the importer refuses a budget
 * that cannot afford the dominant term, one that affords it *and* the cheapest
 * decoy — which makes buying everything the winning play — and one that leaves
 * a single candidate affordable, since then affordability names the answer.
 */
const PROPAGATE = {
  html(ch){
    const p = ch.propagate ?? {};
    const unit = p.costUnit ?? '';
    const budget = +p.budget || 0;
    const rowOf = (id) => (p.inputs ?? []).findIndex(x => String(x.id) === String(id));
    const rows = (p.inputs ?? []).map((x, i) => `<tr data-input="${i}">`
      + `<td class="propName">${esc(x.label)}</td>`
      + `<td>${esc(String(x.value))} ${esc(x.unit ?? '')}</td>`
      + `<td class="propSigma" data-sigma="${i}">±${((+x.sigmaFrac) * 100).toFixed(0)} %</td>`
      + `<td>${esc(String(x.exponent))}</td>`
      + `<td class="propBarCell"><div class="propBarWrap"><i class="propBar" data-bar="${i}"></i></div>`
      + `<b class="propShare" data-share="${i}">—</b></td></tr>`).join('');
    // A measurement names the row it improves. The prose label says what the work
    // is — "layer-count the replicate core" — and nothing in it says which term
    // that moves, so the pairing was discoverable only by buying and watching a
    // number change.
    const buys = (p.improvable ?? []).map((m, i) => {
      const r = rowOf(m.id);
      const off = m.newSigmaFrac == null;
      const dear = !off && (+m.cost || 0) > budget;
      return `<button class="btn propBuy" data-buy="${i}" data-input="${r}" type="button"`
        + `${off || dear ? ' disabled' : ''}>`
        + `<span class="propTarget">${esc((p.inputs ?? [])[r]?.label ?? String(m.id))}</span>`
        + `<span class="propWhat">${esc(m.label)}</span>`
        + `<span class="propCost">${off ? 'not measurable'
            : qty(+m.cost || 0, unit) + (dear ? ' — more than is left' : '')}</span></button>`;
    }).join('');
    return ask(ch, 'Which measurement is worth buying?')
      + `<div class="instPanel propPanel">`
      + method('PROPAGATE', ch)
      + hint(p.hint ?? 'Each term contributes its own width times the power it is raised to.'
        + ' The bar is that contribution.')
      + `<table class="propTable"><thead><tr><th>Input</th><th>Value</th><th>Known to</th>`
      + `<th>Power</th><th>Share of the output width</th></tr></thead><tbody>${rows}</tbody></table>`
      + `<div class="sweepReadouts"><div class="sweepReadout sweepTotal">`
      + `<span>${esc(p.output?.label ?? 'Output')} is known to</span>`
      + `<b class="propTotal">—</b></div></div>`
      + `<div class="propBuysHead"><span>Each measurement costs, and the ledger will not`
      + ` cover them all</span><b class="propLeft">${qty(budget, unit)} left</b></div>`
      + `<div class="propBuys">${buys}</div>`
      + foot(btn('propCommit', p.commit ?? 'Report the range', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const p = ch.propagate ?? {};
    const panel = container.querySelector('.propPanel');
    if(!panel) return;
    const unit = p.costUnit ?? '';
    const budget = +p.budget || 0;
    const imp = p.improvable ?? [];
    const inputs = (p.inputs ?? []).map(x => ({ ...x, sigmaFrac: +x.sigmaFrac }));
    const st = { bought: [], spent: 0, done: false };
    const totalEl = panel.querySelector('.propTotal');
    const leftEl = panel.querySelector('.propLeft');

    // Fractional widths add in quadrature, each weighted by its own exponent.
    const terms = () => inputs.map(x => Math.abs(+x.exponent) * x.sigmaFrac);
    const total = () => Math.hypot(...terms());
    const left = () => budget - st.spent;
    // The ledger is what makes the choice exclusive: the term worth fixing is
    // dear enough that spending on a cheap one forfeits it. So a button dies when
    // what is left will not cover it, and the reason is printed on the button.
    const refresh = () => {
      panel.querySelectorAll('.propBuy').forEach(b => {
        const i = +b.dataset.buy, m = imp[i] ?? {};
        const off = m.newSigmaFrac == null;
        const dear = !off && (+m.cost || 0) > left();
        b.disabled = st.done || off || st.bought.includes(i) || dear;
        const c = b.querySelector('.propCost');
        if(c && !off) c.textContent = qty(+m.cost || 0, unit)
          + (dear && !st.bought.includes(i) ? ' — more than is left' : '');
      });
      if(leftEl) leftEl.textContent = `${qty(left(), unit)} left`;
    };
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
      refresh();
    };
    render();

    const lit = (b, on) => {
      const tr = panel.querySelector(`tr[data-input="${b.dataset.input}"]`);
      if(tr) tr.classList.toggle('propRowLit', on);
    };
    panel.querySelectorAll('.propBuy').forEach(b => {
      ['pointerenter', 'focus'].forEach(e => b.addEventListener(e, () => lit(b, true)));
      ['pointerleave', 'blur'].forEach(e => b.addEventListener(e, () => lit(b, false)));
      b.addEventListener('click', () => {
        const i = +b.dataset.buy;
        const m = imp[i] ?? {};
        const cost = +m.cost || 0;
        if(st.done || st.bought.includes(i) || m.newSigmaFrac == null || cost > left()) return;
        st.bought.push(i);
        st.spent += cost;
        const t = inputs.find(x => String(x.id) === String(m.id));
        if(t) t.sigmaFrac = +m.newSigmaFrac;
        b.classList.add('bought');
        panel.querySelector(`tr[data-input="${b.dataset.input}"]`)?.classList.add('propRowBought');
        render();
      });
    });

    panel.querySelector('#propCommit')?.addEventListener('click', () => {
      if(st.done) return;
      st.done = true;
      refresh();
      const ids = st.bought.map(i => String(imp[i].id));
      const ok = ids.includes(String(p.dominant));
      ctx.commit(ok, st.bought.length === 0
        ? `reported ±${(total() * 100).toFixed(0)}% without buying anything`
        : `bought ${st.bought.map(i => imp[i].label).join(' and ')} for`
          + ` ${qty(st.spent, unit)} of ${qty(budget, unit)},`
          + ` leaving ±${(total() * 100).toFixed(0)}%`,
        { propBought: ids, propSpent: st.spent, propTotal: total() });
    });
  },
  verdict(ch, r){
    const p = ch.propagate ?? {};
    const unit = p.costUnit ?? '';
    // One currency for "contributes": the share of the output width, which is
    // what the panel's own bar draws. The raw term — power times width — is the
    // arithmetic that gets there, and it is printed beside it rather than instead
    // of it, because two numbers under one word is how a measurement starts lying.
    const ts = (p.inputs ?? []).map(x => Math.abs(+x.exponent) * +x.sigmaFrac);
    const tot = Math.hypot(...ts) || 1;
    const shareOf = (i) => (ts[i] * ts[i]) / (tot * tot);
    const labelOf = (id) => (p.inputs ?? [])
      .find(x => String(x.id) === String(id))?.label ?? String(id);
    const rows = (p.inputs ?? []).map((x, i) => row([`<b>${esc(x.label)}</b>`,
      `known to ±${(+x.sigmaFrac * 100).toFixed(0)} %`,
      `raised to ${x.exponent}`,
      `${(shareOf(i) * 100).toFixed(0)} % of the width`])).join('');
    const got = r?.propBought;
    const spend = got == null ? '' : row([`<b>The ledger</b>`,
      `${qty(+r.propSpent || 0, unit)} of ${qty(+p.budget || 0, unit)}`,
      got.length ? `on ${got.map(labelOf).join(', ')}` : 'nothing bought',
      tick(got.includes(String(p.dominant)))]);
    return bars({
      bars: (p.inputs ?? []).map((x, i) => ({ name: x.label,
        value: +(shareOf(i) * 100).toFixed(1),
        status: String(x.id) === String(p.dominant) ? 'alarm' : 'normal' })),
      yLabel: 'share of the output width (%)',
      caption: 'A term contributes its own width times the power it is raised to. The tallest bar'
        + ' is the number worth improving, whatever its exponent',
    }) + board(p.moral ?? 'The exponent is not the whole story — it multiplies a width, and a'
      + ' width known badly enough outweighs a small one cubed', rows + spend);
  },
  facts: (g) => `${g.propagate.inputs.length} inputs · dominant ${g.propagate.dominant}`
    + ` · ${g.propagate.improvable.filter(m => m.newSigmaFrac != null).length} measurable of`
    + ` ${g.propagate.improvable.length} · ${g.propagate.budget} ${g.propagate.costUnit} to spend`,
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
      + method('STRESS', ch)
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
      + method('DELEGATE', ch)
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
 * the plan can be re-set and re-flown as often as the player likes; only
 * committing freezes it.
 *
 * The re-flying is not a convenience. A player who gets one run learns that they
 * overshot; a player who can run it again learns *how far the brake has to
 * lead*, which is the entire content of the format. It shipped one-shot, against
 * this comment, and the first person to play it asked for the obvious thing.
 *
 * "You stopped accelerating at ninety. You did not stop rotating."
 */
const FLY = {
  html(ch){
    const f = ch.fly ?? {};
    const s = f.state ?? {};
    return ask(ch, 'Get there, and arrive stopped.')
      + `<div class="instPanel flyPanel">`
      + method('FLY', ch)
      + hint(f.hint ?? 'There is nothing to slow it down. Whatever you put in has to be taken'
        + ' back out, and taking it out takes as long as putting it in.')
      + goal([
        `Arrive at ${qty(+f.target, s.unit, decimals(+f.target))}`
          + `, give or take ${qty(+f.tolerance, s.unit, decimals(+f.tolerance))}`,
        // Decimals from the value, not a fixed 1: a residual rate of 0.05 deg/s
        // printed as "0.1" is a different criterion from the one being graded.
        `Be stopped when you get there — no more than `
          + `${qty(+f.rateTolerance, f.rate?.unit, decimals(+f.rateTolerance))} still turning`,
        `Spend no more than ${qty(+f.budget, f.pulse?.unit, decimals(+f.budget))} of thruster,`
          + ` counting both pulses`,
        `Run the plan as many times as you like. Only the last one is reported.`,
      ])
      + `<svg class="flyPlot" viewBox="0 0 320 120" role="img" aria-label="Attitude against time">`
      + `<rect width="320" height="120" fill="#f7f9fa"/>`
      // Drawn at the height an untouched panel will use, not parked off-canvas
      // until the first run. Where the line is IS the question, and a player who
      // has to run once to find out what they were aiming at has already spent
      // the attempt the panel used to allow them.
      + `<line class="flyTarget" x1="0" x2="320" y1="26" y2="26" stroke="#3f8f56"`
      + ` stroke-width="1.5" stroke-dasharray="5 4"/>`
      + `<g class="flyGhosts"></g>`
      + `<polyline class="flyTrace" fill="none" stroke="#2f6f8f" stroke-width="2" points=""/>`
      + `<text class="flyIdle sweepTick" x="160" y="72" text-anchor="middle">`
      + `nothing run yet</text>`
      + `<g class="flyScale"><text x="316" y="23" text-anchor="end" class="sweepTick">`
      + `target ${nf(+f.target, 0)}${s.unit ? ' ' + esc(s.unit) : ''}</text></g></svg>`
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
      + `<div class="flyRuns" id="flyRuns">No run yet.</div>`
      + foot(btn('flyRun', f.run ?? 'Run it')
        + btn('flyCommit', f.commit ?? 'Report the attitude', { primary: true, disabled: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const f = ch.fly ?? {};
    const panel = container.querySelector('.flyPanel');
    if(!panel) return;
    const s = f.state ?? {}, acc = +f.accel;
    const st = { burn: +f.pulse.min, brake: +f.brake.min, ran: null, done: false, history: [] };
    const endEl = panel.querySelector('.flyEnd');
    const rateEl = panel.querySelector('.flyRate');
    const fuelEl = panel.querySelector('.flyFuel');
    const trace = panel.querySelector('.flyTrace');
    const ghosts = panel.querySelector('.flyGhosts');
    const runsEl = panel.querySelector('#flyRuns');
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
        // Only a committed plan freezes the controls. This used to also stop at
        // `st.ran`, which made the first run the only run: house rule 3 of this
        // file says every control can be re-set until the player commits, and
        // the format's own docstring says the plan can be reset — the code was
        // the one thing in the building that disagreed.
        if(st.done) return;
        if(r.dataset.ctl === 'burn') st.burn = +r.value; else st.brake = +r.value;
        render();
      });
    });
    render();

    /**
     * Every attempt, on one pair of axes.
     *
     * The scale is taken across the whole history rather than the latest run, or
     * an earlier attempt drawn under a later run's scale is a picture of a flight
     * that never happened. Older runs stay as ghosts because the thing being
     * learnt is the *difference* — braking ten degrees earlier moved the arrival
     * by this much — and that is invisible if the plot is wiped each time.
     */
    const drawAll = () => {
      const all = st.history.flatMap(h => h.pts);
      const tMax = Math.max(...all.map(p => p[0])) || 1;
      const lo = Math.min(0, ...all.map(p => p[1]));
      const hi = Math.max(+f.target * 1.15, ...all.map(p => p[1])) || 1;
      const px = (t) => (t / tMax) * 320;
      const py = (v) => 114 - ((v - lo) / ((hi - lo) || 1)) * 108;
      const line = (h) => h.pts.map(p => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(' ');
      ghosts.innerHTML = st.history.slice(0, -1).map(h =>
        `<polyline fill="none" stroke="#2f6f8f" stroke-width="1.5" opacity=".22"`
        + ` points="${line(h)}"/>`).join('');
      trace.setAttribute('points', line(st.history[st.history.length - 1]));
      const tl = panel.querySelector('.flyTarget');
      tl.setAttribute('y1', py(+f.target).toFixed(1));
      tl.setAttribute('y2', py(+f.target).toFixed(1));
      const scale = panel.querySelector('.flyScale');
      if(scale) scale.innerHTML =
        `<text x="316" y="${(py(+f.target) - 3).toFixed(1)}" text-anchor="end" class="sweepTick">`
        + `target ${nf(+f.target, 0)}${s.unit ? ' ' + s.unit : ''}</text>`;
    };

    panel.querySelector('#flyRun')?.addEventListener('click', () => {
      if(st.done) return;
      const out = simulate();
      st.ran = out;
      st.history.push({ ...out, burn: st.burn, brake: st.brake });
      panel.querySelector('.flyIdle')?.remove();
      commit.disabled = false;
      drawAll();
      endEl.textContent = `${nf(out.x, 1)}${s.unit ? ' ' + s.unit : ''}`;
      rateEl.textContent = `${nf(nz(out.v), 3)}${f.rate?.unit ? ' ' + f.rate.unit : ''}`;
      fuelEl.textContent = `${nf(out.fuel, 1)} of ${f.budget} ${f.pulse.unit ?? ''}`;
      if(runsEl) runsEl.textContent = st.history.length === 1
        ? 'Run 1. Change the plan and run it again, or report this one.'
        : `Run ${st.history.length}. The faint traces are your earlier attempts;`
          + ' the report takes the last one.';
    });

    commit.addEventListener('click', () => {
      if(st.done || !st.ran) return;
      st.done = true;
      panel.querySelectorAll('.flyRange').forEach(r => { r.disabled = true; });
      const run = panel.querySelector('#flyRun');
      if(run) run.disabled = true;
      const out = st.ran;
      const ok = Math.abs(out.x - +f.target) <= +f.tolerance
        && Math.abs(out.v) <= +f.rateTolerance
        && out.fuel <= +f.budget;
      ctx.commit(ok, `arrived at ${nf(out.x, 1)}${s.unit ? ' ' + s.unit : ''},`
        + ` still moving at ${nf(nz(out.v), 3)}${f.rate?.unit ? ' ' + f.rate.unit : ''}`
        + (st.history.length > 1 ? `, on attempt ${st.history.length}` : ''),
        { flyEnd: out.x, flyRate: out.v, flyFuel: out.fuel, flyRuns: st.history.length,
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
      + row([`<b>Still moving at</b>`, `${nf(nz(r?.flyRate), 3)} ${f.rate?.unit ?? ''}`,
        `<b>allowed</b>`, `${f.rateTolerance} ${f.rate?.unit ?? ''}`],
        Math.abs(r?.flyRate ?? Infinity) <= +f.rateTolerance ? '' : 'bad')
      + row([`<b>Used</b>`, `${nf(r?.flyFuel, 1)} ${f.pulse?.unit ?? ''}`,
        `<b>budget</b>`, `${f.budget} ${f.pulse?.unit ?? ''}`],
        (r?.flyFuel ?? Infinity) <= +f.budget ? '' : 'bad')
      + ((r?.flyRuns ?? 1) > 1
          ? row([`<b>Reported on attempt</b>`, String(r.flyRuns),
            `<b></b>`, 'flying it repeatedly is how the lead is found'], '') : ''));
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
      + method('RESIDUAL', ch)
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
      + method('INJECT', ch)
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
      + method('ROUTE', ch)
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
      + method('DERIVE', ch)
      + hint(d.hint ?? (d.askRule === true
        ? 'Choose the line that follows, and name the rule that gets you there.'
        : 'Choose the line that follows from the one above it.'))
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
    // Naming the rule is off unless a book asks for it, and that is the default
    // on purpose.
    //
    // It was written on the argument that the right line for the wrong reason is
    // the commonest way to pass a calculus course without learning it. That
    // holds only where the candidates genuinely differ in what licenses them,
    // and mostly they did not: in five of Midway's 29 steps and ten of
    // Headwater's 33, every candidate carried the *same* rule, so the second
    // half of the answer was a click with one possible value. What that teaches
    // is that the panel wants two clicks.
    //
    // `askRule: true` on the derive block turns it back on, and the importer
    // then insists on at least three rules — a list of two answers itself by
    // elimination. A `rules` list on its own does nothing: opting in has to be
    // deliberate, or the half comes back the first time somebody pastes a block
    // from an older book.
    const naming = d.askRule === true && rules.length > 0;
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
        + (naming
          ? `<div class="deriveRulesHead">and the rule that licenses it</div>`
            + `<div class="deriveRules">`
            + rules.map(r => `<button class="btn deriveRule${st.rule === r ? ' on' : ''}"`
              + ` data-rule="${esc(r)}" type="button">${esc(r)}</button>`).join('')
            + `</div>`
          : '');
      take.textContent = st.at === steps.length - 1
        ? (d.lastStep ?? 'Take the last step') : 'Take this step';
      take.disabled = st.pick === null || (naming && st.rule === null);
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
        const ruleOk = !naming || String(t.rule) === String(s.candidates[+s.answer]?.rule ?? '');
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
    const naming = d.askRule === true && (d.rules ?? []).length > 0;
    const taken = r?.deriveTaken ?? [];
    const rows = steps.map((s, n) => {
      const t = taken[n];
      const key = s.candidates[+s.answer] ?? {};
      const chosen = t ? s.candidates[t.pick] ?? {} : {};
      const lineOk = t && t.pick === +s.answer;
      const ruleOk = !naming || (t && String(t.rule) === String(key.rule ?? ''));
      return row(naming ? [
        `<b>${n + 1}</b>`,
        `<code>${esc(chosen.text ?? '—')}</code>`,
        `${tick(!!lineOk)} line`,
        `${esc(t?.rule ?? '—')} ${tick(!!ruleOk)}`,
      ] : [
        `<b>${n + 1}</b>`,
        `<code>${esc(chosen.text ?? '—')}</code>`,
        `${tick(!!lineOk)} line`,
      ], lineOk && ruleOk ? '' : 'bad')
        // The reason the wrong move is wrong, which is the whole teaching value
        // of a distractor. A step that fails silently teaches nothing.
        + (lineOk ? '' : row(naming
          ? [' ', `<em>${esc(chosen.why ?? key.why ?? '')}</em>`, ' ',
             `<em>${esc(key.text ? `should be ${key.text}` : '')}</em>`]
          : [' ', `<em>${esc(chosen.why ?? key.why ?? '')}</em>`,
             `<em>${esc(key.text ? `should be ${key.text}` : '')}</em>`], 'note'));
    }).join('');
    return board(d.caption ?? (naming ? 'Each line, and what licenses it.' : 'Each line you took.'), rows);
  },
  // `facts` is handed the challenge, not the block — the dev page printed
  // "0 line(s) · 0 rules offered" for a panel with four of each.
  facts: (g) => `${(g.derive?.steps ?? []).length} line(s)`
    + (g.derive?.askRule === true ? ` · ${(g.derive?.rules ?? []).length} rules offered` : '')
    + ` · goal ${g.derive?.goal ?? '—'}`,
  tag: () => 'derivation',
};

/* ==================================================================== BELT */
/**
 * BELT — sort what comes down the line, before it reaches the end.
 *
 * The first of the formats that are fun first. Everything above renders a move a
 * *scientist* makes; this renders a move a **player** makes, and carries one bit
 * of subject matter while doing it — a binary category, at a speed that leaves
 * no room to reason it out. Conductor or insulator, acid or base, dominant or
 * recessive, ionizing or not, sterile or contaminated. Every game in the repo
 * has one such pair and none of them has ever been drilled.
 *
 * ## Why it is a format and not a mini-game
 *
 * Because a second registry is a second thing that `questionUI`, `fieldCoverage`,
 * `instrumentGoals`, `instrumentTraps`, `instruments.html` and `instrumentDrive`
 * each have to learn about, and six tools learning a special case is how the
 * engine got forked the first time. It is an entry in INSTRUMENTS, authored as a
 * stop, graded through `ctx.commit`, and every existing check runs over it free.
 *
 * ## The clock, and what is actually graded
 *
 * `pausesClock` stops the day's countdown while this panel is open — the belt
 * has its own pressure and charging the day for it as well would make the fun
 * one the expensive one. See `panelFreezesClock` in questionUI.js.
 *
 * Rule 3 says difficulty is judgment, never dexterity, and a ramping belt is
 * plainly dexterity. The rule survives because **speed is the pressure and
 * accuracy is the grade**: `ctx.commit(ok)` is called on the fraction sorted
 * correctly, never on the score. A slow player who sorts twenty items right
 * passes; a fast one passes with a better number on the card. That distinction
 * is the whole reason this can live beside TRACE without eroding it.
 *
 * ## Two traps, both in the importer
 *
 * A belt whose items can be sorted by *spelling* teaches spelling. If one word
 * appearing in four or more names sorts them one way more than 80% of the time,
 * the bank is refused — the same argument as `answerShape.mjs`, that the longest
 * option must not be the answer key. And a bank that is 80% one bin is won by
 * holding one key, so the split has to be somewhere near even.
 */
const BELT = {
  // The day's countdown stops while this is up. The belt is the pressure.
  pausesClock: true,
  html(ch){
    const b = ch.belt ?? {};
    const need = +(b.need ?? 20);
    const lives = +(b.lives ?? 3);
    return ask(ch, 'Sort what comes down the belt.')
      + `<div class="instPanel beltPanel">`
      + method('BELT', ch)
      + hint(b.hint ?? 'Up sends it to the top bin, down to the bottom. Nothing comes back.')
      // The run length and the miss allowance are goals: constraints the player
      // plans against, and a player who does not know a miss costs a life plays
      // a different game. The accuracy the run is GRADED on is not printed —
      // same argument as a BALLPARK tolerance, that knowing it changes nothing
      // about how you sort and invites aiming at the edge of it.
      + goal([`${need} items come down the line`,
        `${lives} misses and the line stops`,
        'A wrong bin and a missed item both count'])
      // The two bin names are drawn on the canvas, inside their own zones, with
      // the key that sends a tile there. They were also printed in a strip above
      // it for one revision, which put every name on the panel twice and made
      // the strip and the zone disagree about which one was the control.
      + `<canvas class="beltCanvas" width="640" height="260"></canvas>`
      + `<div class="beltStrip"><span id="beltCount">0 / ${need}</span>`
      + `<span id="beltLives">${'●'.repeat(lives)}</span>`
      + `<span id="beltRun">run of 0</span></div>`
      + foot(btn('beltStart', b.commit ?? 'Start the line', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const b = ch.belt ?? {};
    const panel = container.querySelector('.beltPanel');
    const canvas = panel?.querySelector('.beltCanvas');
    if(!panel || !canvas) return;

    const need = +(b.need ?? 20);
    const lives = +(b.lives ?? 3);
    const pass = Number.isFinite(+b.pass) ? +b.pass : 0.8;
    const upName = b.left?.name ?? 'Left';
    const downName = b.right?.name ?? 'Right';
    const upColour = b.left?.colour ?? '#c8a24a';
    const downColour = b.right?.colour ?? '#5c6f86';

    // Seeded from the stop, not from Math.random: two players on one campaign
    // and one player retrying after a wrong call should meet the same line, or
    // "I got the hard one" is a real complaint with no answer.
    const seed = String(ch.id ?? ch.question ?? 'belt').length * 31 + need;
    const bank = shuffleSeeded((b.items ?? []).slice(), seed);

    const countEl = panel.querySelector('#beltCount');
    const livesEl = panel.querySelector('#beltLives');
    const runEl = panel.querySelector('#beltRun');
    const startBtn = panel.querySelector('#beltStart');

    const st = {
      running: false, done: false,
      at: 0,              // how far into the bank
      resolved: 0, right: 0, lost: 0,
      run: 0, best: 0,
      item: null,         // { name, bin, x, y, vy, verdict }
      leaving: [],        // tiles flying into a bin, for the half-second after
      wrong: [],          // what went where — the verdict is made of this
      shake: 0,
    };

    // Metres a second along a 640-wide belt. It rises every five items, which
    // is what makes the last third of a run feel different from the first.
    const speed = () => 118 + Math.min(st.resolved, 24) * 7.5;

    const nextItem = () => {
      if(st.at >= bank.length || st.resolved >= need){ st.item = null; return; }
      const src = bank[st.at++];
      st.item = { name: String(src.name), bin: String(src.bin), x: 660, y: 0, vy: 0 };
    };

    const settle = (ok) => {
      st.resolved++;
      if(ok){ st.right++; st.run++; st.best = Math.max(st.best, st.run); }
      else { st.run = 0; st.lost++; st.shake = 0.35; }
      countEl.textContent = `${st.resolved} / ${need}`;
      livesEl.textContent = '●'.repeat(Math.max(0, lives - st.lost))
        + '○'.repeat(Math.min(lives, st.lost));
      runEl.textContent = `run of ${st.run}`;
      if(st.lost >= lives || st.resolved >= need) finish();
      else nextItem();
    };

    const sort = (toUp) => {
      const it = st.item;
      if(!it) return;
      const wantUp = it.bin === 'left';
      const ok = wantUp === toUp;
      if(!ok) st.wrong.push({ name: it.name, sentTo: toUp ? upName : downName,
        belongs: wantUp ? upName : downName, missed: false });
      st.leaving.push({ ...it, vy: toUp ? -520 : 520, ok, life: 0.45 });
      st.item = null;
      settle(ok);
    };

    const missed = () => {
      const it = st.item;
      if(!it) return;
      st.wrong.push({ name: it.name, sentTo: null,
        belongs: it.bin === 'left' ? upName : downName, missed: true });
      st.item = null;
      settle(false);
    };

    let surface = null;
    function finish(){
      if(st.done) return;
      st.done = true;
      st.running = false;
      surface?.stop();
      const accuracy = st.resolved ? st.right / st.resolved : 0;
      const ok = st.resolved >= need && accuracy >= pass;
      startBtn.disabled = true;
      startBtn.textContent = 'Line stopped';
      ctx.commit(ok,
        `${st.right} of ${st.resolved} sorted correctly, best run of ${st.best}`,
        { beltRight: st.right, beltResolved: st.resolved, beltBest: st.best,
          beltWrong: st.wrong.slice(0, 8), beltNeed: need });
    }

    function step(dt, input){
      if(!st.running || st.done) return;
      st.shake = Math.max(0, st.shake - dt);
      for(const t of st.leaving){ t.y += t.vy * dt; t.life -= dt; }
      st.leaving = st.leaving.filter(t => t.life > 0);
      if(!st.item) return;
      // A press, not a hold: one item, one decision. `press` is consumed, so a
      // key held down through three tiles sorts one of them.
      if(input.press('up')) return sort(true);
      if(input.press('down')) return sort(false);
      st.item.x -= speed() * dt;
      if(st.item.x < -130) missed();
    }

    function paint(g, w, h){
      const mid = h / 2;
      const jitter = st.shake > 0 ? (Math.random() - 0.5) * 6 * (st.shake / 0.35) : 0;
      // the two bins
      g.fillStyle = upColour + '22';
      g.fillRect(0, 0, w, mid - 42);
      g.fillStyle = downColour + '22';
      g.fillRect(0, mid + 42, w, h - mid - 42);
      // Name and key together. Which way a tile goes is half of what the player
      // needs and the zone it goes to is the other half; printing them apart is
      // how the two came to disagree.
      g.fillStyle = upColour;
      g.font = '700 13px Inter, system-ui, sans-serif';
      g.textAlign = 'left';
      g.textBaseline = 'top';
      g.fillText(`▲  ${upName.toUpperCase()}`, 14, 12);
      g.fillStyle = downColour;
      g.textBaseline = 'bottom';
      g.fillText(`▼  ${downName.toUpperCase()}`, 14, h - 12);

      // the belt itself, with slats that move so a stopped line reads as stopped
      g.fillStyle = '#2b2f34';
      g.fillRect(0, mid - 42, w, 84);
      g.strokeStyle = '#3d444b';
      g.lineWidth = 2;
      const phase = (st.resolved * 37 + (st.item ? st.item.x : 0)) % 28;
      for(let x = -28 + phase; x < w; x += 28){
        g.beginPath();
        g.moveTo(x, mid - 42);
        g.lineTo(x, mid + 42);
        g.stroke();
      }

      const tile = (t, y, alpha = 1) => {
        g.globalAlpha = alpha;
        g.fillStyle = '#f2efe8';
        roundRect(g, t.x, y - 22, 124, 44, 8);
        g.fill();
        g.strokeStyle = t.ok === false ? '#b3261e' : (t.ok === true ? '#2f6d4f' : '#c9c4b8');
        g.lineWidth = t.ok === undefined ? 1.5 : 3;
        g.stroke();
        g.fillStyle = '#1a1a17';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        fitText(g, t.name, 110, 15);
        g.fillText(t.name, t.x + 62, y);
        g.globalAlpha = 1;
      };
      for(const t of st.leaving) tile(t, mid + t.y, Math.max(0, t.life / 0.45));
      if(st.item) tile(st.item, mid + jitter);

      if(!st.running && !st.done){
        g.fillStyle = 'rgba(16,18,20,0.55)';
        g.fillRect(0, 0, w, h);
        g.fillStyle = '#f2efe8';
        g.font = '600 15px Inter, system-ui, sans-serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText('Start the line when you are ready.', w / 2, mid);
      }
    }

    surface = createPlaySurface(canvas, { step, paint });
    // A frame loop nobody cancels keeps drawing into a detached canvas and keeps
    // eating arrow keys that now belong to the world.
    ctx.onClose?.(() => surface?.stop());

    startBtn.addEventListener('click', () => {
      if(st.running || st.done) return;
      st.running = true;
      startBtn.disabled = true;
      startBtn.textContent = 'Line running';
      nextItem();
    });
  },
  verdict(ch, r){
    const b = ch.belt ?? {};
    const wrong = r?.beltWrong ?? [];
    const rows = wrong.length
      ? wrong.map(x => row([tick(false) + ` <b>${esc(x.name)}</b>`,
          x.missed ? 'went past unsorted' : `you sent it to ${esc(x.sentTo)}`,
          `it is ${esc(x.belongs)}`], 'bad')).join('')
      : row([tick(true) + ' <b>Every item</b>', 'went to the right bin', '']);
    const tally = row([`<b>${r?.beltRight ?? 0} of ${r?.beltResolved ?? 0}</b>`,
      'sorted correctly', `best run of ${r?.beltBest ?? 0}`]);
    return board(b.moral ?? 'The ones that went wrong are the ones the category has not'
      + ' settled in yet. Speed is only the pressure — what is graded is which side'
      + ' each of these belongs on', tally + rows);
  },
  facts: (g) => `${(g.belt?.items ?? []).length} items · `
    + `${(g.belt?.items ?? []).filter(i => i.bin === 'left').length} ${g.belt?.left?.name ?? 'left'}`
    + ` / ${(g.belt?.items ?? []).filter(i => i.bin === 'right').length} ${g.belt?.right?.name ?? 'right'}`
    + ` · ${g.belt?.need ?? 20} to sort, ${g.belt?.lives ?? 3} misses`,
  tag: () => 'sorting',
};

/* ===================================================================== LOB */
/**
 * LOB — angle, charge, wind, and a mark to put it on.
 *
 * The bit of subject matter is projectile intuition with **no formula printed
 * anywhere**, and the way that is enforced is by withholding one number: the
 * distances are on the marks, the wind is on the flag, and the launch speed is
 * nowhere. Give a player the speed and this becomes an arithmetic exercise —
 * a perfectly good one, and not this one. Without it the only way through is to
 * watch where the short shot landed and move one control at a time, which is
 * how anybody has ever learned to throw anything.
 *
 * Range peaks near 45°, wind costs more at long range than at short, and a
 * player finds both by missing. Planetary Defense, Midway — where it is the
 * game's own syllabus — Aftershock and Ground Truth are the natural homes.
 *
 * ## The trap
 *
 * A mark that any angle reaches. The importer flies five angles at full charge
 * at every target, and refuses a board where three of them land inside the
 * radius: aiming is then decoration, the player hits by firing, and the format
 * teaches that projectiles go where you point them. The same check settles the
 * other end — a mark nothing reaches at all is refused too, because a stop the
 * player cannot pass is not difficulty.
 *
 * ## What is graded
 *
 * Every mark hit inside its shot allowance. Not the margin, and not the number
 * of shots used — a player who takes three ranging shots at each mark and hits
 * all three passes, which is the honest description of what the skill is.
 */
const LOB = {
  pausesClock: true,
  html(ch){
    const l = ch.lob ?? {};
    const shots = +(l.shots ?? 3);
    const marks = l.targets ?? [];
    return ask(ch, 'Put it on the mark.')
      + `<div class="instPanel lobPanel">`
      + method('LOB', ch)
      + hint(l.hint ?? 'Move one control at a time and watch where the short one lands.')
      + goal([`${marks.length} marks, ${shots} shots at each`,
        'The range to each mark is on its flag',
        'The charge is not calibrated in anything'])
      + `<canvas class="lobCanvas" width="640" height="300"></canvas>`
      + `<div class="lobStrip"><span class="lobShot">—</span>`
      + `<span class="lobWind">${l.wind ? `Wind ${+l.wind > 0 ? 'with' : 'against'} you` : 'No wind'}</span>`
      + `<span class="lobLeft">${shots} shots</span></div>`
      + `<label class="lobCtl"><span>Angle</span>`
      + `<input class="lobAngle" type="range" min="10" max="80" step="1" value="40"></label>`
      + `<label class="lobCtl"><span>Charge</span>`
      + `<input class="lobPower" type="range" min="0.2" max="1" step="0.01" value="0.6"></label>`
      + foot(btn('lobFire', l.commit ?? 'Fire', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const l = ch.lob ?? {};
    const panel = container.querySelector('.lobPanel');
    const canvas = panel?.querySelector('.lobCanvas');
    if(!panel || !canvas) return;

    const marks = (l.targets ?? []).map(t => ({ ...t, distance: +t.distance, radius: +t.radius }));
    const shots = +(l.shots ?? 3);
    const g0 = +(l.gravity ?? 9.81);
    const vMax = +(l.maxSpeed ?? 40);
    const wind = +(l.wind ?? 0);
    const y0 = +(l.height ?? 1.5);

    const angleEl = panel.querySelector('.lobAngle');
    const powerEl = panel.querySelector('.lobPower');
    const shotEl = panel.querySelector('.lobShot');
    const leftEl = panel.querySelector('.lobLeft');
    const fire = panel.querySelector('#lobFire');

    const st = {
      done: false, at: 0, used: 0,
      hits: 0, misses: [], flight: null, t: 0,
      results: [],
    };

    /** One shot, as a list of points. Shared by the panel and its verdict. */
    const trace = (deg, power) => {
      const th = deg * Math.PI / 180;
      const v = power * vMax;
      let x = 0, y = y0, vx = v * Math.cos(th), vy = v * Math.sin(th);
      const pts = [[0, y0]];
      for(let n = 0; n < 4000 && y >= 0; n++){
        vx += wind * 0.01;
        vy -= g0 * 0.01;
        x += vx * 0.01;
        y += vy * 0.01;
        pts.push([x, Math.max(0, y)]);
      }
      return { pts, land: pts[pts.length - 1][0] };
    };

    function shoot(){
      if(st.done || st.flight) return;
      const deg = +angleEl.value;
      const power = +powerEl.value;
      const shot = trace(deg, power);
      st.flight = { ...shot, i: 0 };
      // Locked while it is in the air. Without this a player leaning on the
      // button loses shots to a guard that silently returns, and the driver
      // could not tell a shot in flight from a shot that never left.
      fire.disabled = true;
      st.used++;
      leftEl.textContent = `${Math.max(0, shots - st.used)} shot${shots - st.used === 1 ? '' : 's'}`;
      const mark = marks[st.at];
      const off = shot.land - mark.distance;
      const hit = Math.abs(off) <= mark.radius;
      st.pending = { hit, off, mark, deg, power };
    }

    /** Called when the projectile has finished flying, so the card follows it. */
    function land(){
      const p = st.pending;
      st.pending = null;
      if(!st.done) fire.disabled = false;
      if(!p) return;
      shotEl.textContent = p.hit ? 'On the mark.'
        : `${Math.abs(p.off).toFixed(0)} m ${p.off > 0 ? 'long' : 'short'}.`;
      if(p.hit){
        st.hits++;
        st.results.push({ mark: p.mark.label, hit: true, shots: st.used, off: p.off });
        next();
      } else if(st.used >= shots){
        st.results.push({ mark: p.mark.label, hit: false, shots: st.used, off: p.off });
        next();
      }
    }
    function next(){
      st.at++;
      st.used = 0;
      leftEl.textContent = `${shots} shots`;
      if(st.at >= marks.length) finish();
      else shotEl.textContent = `${marks[st.at].label} — ${marks[st.at].distance} m`;
    }

    let surface = null;
    function finish(){
      if(st.done) return;
      st.done = true;
      surface?.stop();
      fire.disabled = true;
      fire.textContent = 'Done';
      angleEl.disabled = powerEl.disabled = true;
      ctx.commit(st.hits === marks.length,
        `${st.hits} of ${marks.length} marks hit`,
        { lobHits: st.hits, lobResults: st.results });
    }

    function step(dt){
      if(!st.flight) return;
      // Ten simulated centiseconds a frame — fast enough to read as a shot and
      // slow enough to see the arc, and independent of the frame rate.
      st.flight.i += Math.max(1, Math.round(dt * 600));
      if(st.flight.i >= st.flight.pts.length){
        st.flight = null;
        land();
      }
    }

    function paint(g, w, h){
      const reach = Math.max(...marks.map(m => m.distance));
      const far = reach * 1.25;
      // The vertical scale is the apex of a 45° shot to the farthest mark —
      // range over four — with half again for headroom. Scaling the height off
      // the RANGE instead put the whole flight in the bottom fifth of the
      // canvas: every arc read as flat, which is the one thing this format is
      // about not being.
      const high = (reach / 4) * 1.5;
      const sx = (x) => 30 + (x / far) * (w - 50);
      const sy = (y) => h - 30 - (y / high) * (h - 60);
      g.fillStyle = '#1b1e21';
      g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(242,239,232,0.22)';
      g.lineWidth = 2;
      g.beginPath(); g.moveTo(0, sy(0)); g.lineTo(w, sy(0)); g.stroke();
      // the marks, with their ranges — a goal, and the only number given
      marks.forEach((m, i) => {
        const x = sx(m.distance);
        const done = i < st.at;
        g.fillStyle = done ? 'rgba(63,143,86,0.5)' : (i === st.at ? '#e8b23a' : 'rgba(242,239,232,0.3)');
        g.fillRect(sx(m.distance - m.radius), sy(0) - 4, sx(m.distance + m.radius) - sx(m.distance - m.radius), 8);
        g.beginPath(); g.moveTo(x, sy(0)); g.lineTo(x, sy(0) - 26); g.stroke();
        g.font = '700 11px Inter, system-ui, sans-serif';
        g.textAlign = 'center';
        g.fillText(`${m.distance} m`, x, sy(0) - 32);
      });
      // the shot in the air, and the arc behind it
      if(st.flight){
        const upto = Math.min(st.flight.i, st.flight.pts.length - 1);
        g.strokeStyle = 'rgba(232,178,58,0.6)';
        g.lineWidth = 2;
        g.beginPath();
        for(let i = 0; i <= upto; i += 2){
          const [x, y] = st.flight.pts[i];
          i ? g.lineTo(sx(x), sy(y)) : g.moveTo(sx(x), sy(y));
        }
        g.stroke();
        const [px, py] = st.flight.pts[upto];
        g.beginPath();
        g.arc(sx(px), sy(py), 4, 0, Math.PI * 2);
        g.fillStyle = '#f2efe8';
        g.fill();
      }
      // the launcher, pointing where the controls point
      const th = +angleEl.value * Math.PI / 180;
      g.strokeStyle = '#8fd0e6';
      g.lineWidth = 3;
      g.beginPath();
      g.moveTo(sx(0), sy(y0));
      g.lineTo(sx(0) + Math.cos(th) * 26, sy(y0) - Math.sin(th) * 26);
      g.stroke();
      // the wind flag, if there is one
      if(wind){
        g.strokeStyle = 'rgba(143,208,230,0.7)';
        g.lineWidth = 2;
        const y = 26;
        const dir = wind > 0 ? 1 : -1;
        g.beginPath();
        g.moveTo(w / 2 - 24 * dir, y);
        g.lineTo(w / 2 + 24 * dir, y);
        g.lineTo(w / 2 + 14 * dir, y - 6);
        g.stroke();
      }
    }

    surface = createPlaySurface(canvas, { step, paint });
    ctx.onClose?.(() => surface?.stop());
    fire.addEventListener('click', shoot);
    shotEl.textContent = marks.length ? `${marks[0].label} — ${marks[0].distance} m` : '';
    leftEl.textContent = `${shots} shots`;
  },
  verdict(ch, r){
    const l = ch.lob ?? {};
    const got = r?.lobResults ?? [];
    const rows = (l.targets ?? []).map((m, i) => {
      const g2 = got[i];
      return row([tick(!!g2?.hit) + ` <b>${esc(m.label)}</b>`, `${m.distance} m`,
        g2 ? (g2.hit ? `hit on shot ${g2.shots}` : `${Math.abs(g2.off).toFixed(0)} m`
          + ` ${g2.off > 0 ? 'long' : 'short'} on the last`) : 'never reached'],
        g2?.hit ? '' : 'bad');
    }).join('');
    return board(l.moral ?? 'Range peaks near forty-five degrees and falls away either side, so'
      + ' two very different angles reach the same mark and only one of them is stable against a'
      + ' small mistake', rows);
  },
  facts: (g) => `${(g.lob?.targets ?? []).length} mark(s) at `
    + (g.lob?.targets ?? []).map(t => `${t.distance} m`).join(', ')
    + ` · ${g.lob?.shots ?? 3} shots each`
    + (g.lob?.wind ? ` · wind ${g.lob.wind}` : ''),
  tag: () => 'trajectory',
};

/* =================================================================== STACK */
/**
 * STACK — falling blocks with a question rail, and a wrong answer costs a row.
 *
 * Ported from `spectrum_stack.html` in the parent repo, which was a standalone
 * page: Tetris with a Navy course's question bank bolted to it. It comes across
 * as a format and stops being a page, which is the whole argument of `ARCADE.md`
 * — one shell, eighteen themes, and every check in `npm run check` running over
 * it for free.
 *
 * ## What survived the port and what did not
 *
 * Survived: the pressure row. A wrong answer packs a row in *under* the stack,
 * which is the one mechanic that ties the two halves together — without it the
 * questions are a sidebar and the game is Tetris. Did not survive: the chapter
 * and course menus, because the campaign is the course now, and the hard-coded
 * `CHAPTERS` constant, because the bank is the stop's.
 *
 * ## The heaviest of the fun-first four, and therefore the fussiest to place
 *
 * One four-option question per piece is a lot of reading for a format whose
 * pressure is a falling block. It is the one to author where a theme wants
 * drill, and the one to leave out otherwise.
 *
 * ## What is graded
 *
 * Answer accuracy, over the questions the run got through. Lines cleared are
 * score and they are pressure, and grading them would make this a Tetris exam —
 * rule 3 again, and the same answer BELT gives: speed is the pressure, accuracy
 * is the grade. A player who never clears a line and answers eight of eight
 * correctly passes.
 *
 * ## The options are DOM buttons, not canvas text
 *
 * Same reasoning as SPOT: touch works without being reimplemented, the text is
 * real text at the audience's own size, and `npm run drive` can click them. Only
 * the well is painted.
 */
const STACK = {
  pausesClock: true,
  html(ch){
    const b = ch.stack ?? {};
    const need = +(b.need ?? 8);
    return ask(ch, 'Answer the rail, and keep the stack down.')
      + `<div class="instPanel stackPanel">`
      + method('STACK', ch)
      + hint(b.hint ?? 'A wrong answer packs a row in under everything you have built.')
      + goal([`${need} questions before the run ends`,
        'A wrong answer costs a row, not a life',
        'Lines cleared are a score and are not graded'])
      + `<div class="stackWell"><canvas class="stackCanvas" width="300" height="480"></canvas>`
      + `<div class="stackSide"><div class="stackQ">—</div>`
      + `<div class="stackOpts"></div>`
      + `<div class="stackStrip"><span class="stackCount">0 / ${need}</span>`
      + `<span class="stackLines">0 lines</span></div></div></div>`
      + foot(btn('stackStart', b.commit ?? 'Start the run', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const b = ch.stack ?? {};
    const panel = container.querySelector('.stackPanel');
    const canvas = panel?.querySelector('.stackCanvas');
    if(!panel || !canvas) return;

    const COLS = +(b.cols ?? 10);
    const ROWS = +(b.rows ?? 16);
    const need = +(b.need ?? 8);
    const pass = Number.isFinite(+b.pass) ? +b.pass : 0.75;
    const doc = panel.ownerDocument;
    const seed = String(ch.id ?? ch.question ?? 'stack').length * 17 + need;

    // The seven tetrominoes, as offset lists. Rotation is about the piece's own
    // centre and is done by transposing, which is enough for a 4×4 well.
    const SHAPES = [
      [[0, 0], [1, 0], [0, 1], [1, 1]],            // O
      [[0, 0], [1, 0], [2, 0], [3, 0]],            // I
      [[0, 0], [1, 0], [2, 0], [1, 1]],            // T
      [[0, 0], [1, 0], [2, 0], [2, 1]],            // J
      [[0, 0], [1, 0], [2, 0], [0, 1]],            // L
      [[1, 0], [2, 0], [0, 1], [1, 1]],            // S
      [[0, 0], [1, 0], [1, 1], [2, 1]],            // Z
    ];
    const INK = ['#c8a24a', '#35a0c8', '#8f6bb5', '#3f8f56', '#c0392b', '#d78b3a', '#6e8ba6'];

    const bank = shuffleSeeded((b.questions ?? []).slice(), seed);
    const qEl = panel.querySelector('.stackQ');
    const optsEl = panel.querySelector('.stackOpts');
    const countEl = panel.querySelector('.stackCount');
    const linesEl = panel.querySelector('.stackLines');
    const startBtn = panel.querySelector('#stackStart');

    const st = {
      running: false, done: false,
      grid: Array.from({ length: ROWS }, () => Array(COLS).fill(-1)),
      piece: null, fall: 0, dropEvery: 0.75,
      lines: 0, asked: 0, right: 0, qIdx: 0,
      shown: null,
    };

    const fits = (cells) => cells.every(([x, y]) =>
      x >= 0 && x < COLS && y < ROWS && (y < 0 || st.grid[y][x] === -1));
    const cellsOf = (p) => p.cells.map(([x, y]) => [x + p.x, y + p.y]);

    function spawn(){
      const i = Math.floor(Math.random() * SHAPES.length);
      const p = { cells: SHAPES[i].map(c => c.slice()), ink: i,
        x: Math.floor(COLS / 2) - 1, y: -1 };
      st.piece = p;
      if(!fits(cellsOf(p))) finish();
    }

    function lock(){
      for(const [x, y] of cellsOf(st.piece)) if(y >= 0) st.grid[y][x] = st.piece.ink;
      st.piece = null;
      // Full rows go, from the bottom up.
      for(let y = ROWS - 1; y >= 0; y--){
        if(st.grid[y].every(v => v !== -1)){
          st.grid.splice(y, 1);
          st.grid.unshift(Array(COLS).fill(-1));
          st.lines++;
          linesEl.textContent = `${st.lines} line${st.lines === 1 ? '' : 's'}`;
          st.dropEvery = Math.max(0.22, 0.75 - st.lines * 0.04);
          y++;
        }
      }
      spawn();
    }

    /**
     * The pressure row: a wrong answer packs a row in UNDER the stack, with one
     * gap. This is the mechanic the whole port exists to keep — without it the
     * questions are a sidebar and the game is Tetris with reading next to it.
     */
    function pressureRow(){
      const gap = Math.floor(Math.random() * COLS);
      st.grid.shift();
      st.grid.push(Array.from({ length: COLS }, (_, x) => (x === gap ? -1 : 6)));
      if(st.piece) st.piece.y -= 1;
      if(st.grid[0].some(v => v !== -1)) finish();
    }

    function showQuestion(){
      if(st.asked >= need || st.qIdx >= bank.length){ finish(); return; }
      const q = bank[st.qIdx++];
      // Shuffled per question: a bank whose key sits at the same index is
      // winnable by position, and the importer refuses one — but shuffling here
      // as well means it is true of any bank, however it was authored.
      const order = shuffleSeeded(q.a.map((text, i) => ({ text, i })), seed + st.qIdx * 13);
      st.shown = { q, order };
      qEl.textContent = q.q;
      optsEl.innerHTML = '';
      order.forEach((o, n) => {
        const el = doc.createElement('button');
        el.type = 'button';
        el.className = 'stackOpt';
        el.innerHTML = `<b>${n + 1}</b><span>${esc(o.text)}</span>`;
        el.addEventListener('click', () => answer(n));
        optsEl.append(el);
      });
    }

    function answer(n){
      if(!st.running || st.done || !st.shown) return;
      const ok = st.shown.order[n]?.i === +st.shown.q.correct;
      st.asked++;
      if(ok) st.right++; else pressureRow();
      countEl.textContent = `${st.asked} / ${need}`;
      st.shown = null;
      if(!st.done) showQuestion();
    }

    function step(dt, input){
      if(!st.running || st.done) return;
      if(!st.piece) spawn();
      if(!st.piece) return;
      if(input.press('left')) move(-1);
      if(input.press('right')) move(1);
      if(input.press('up')) rotate();
      st.fall += dt * (input.held('down') ? 8 : 1);
      if(st.fall >= st.dropEvery){
        st.fall = 0;
        const down = { ...st.piece, y: st.piece.y + 1 };
        if(fits(cellsOf(down))) st.piece = down; else lock();
      }
    }
    function move(dx){
      const to = { ...st.piece, x: st.piece.x + dx };
      if(fits(cellsOf(to))) st.piece = to;
    }
    function rotate(){
      const cells = st.piece.cells.map(([x, y]) => [-y, x]);
      const minX = Math.min(...cells.map(c => c[0]));
      const minY = Math.min(...cells.map(c => c[1]));
      const to = { ...st.piece, cells: cells.map(([x, y]) => [x - minX, y - minY]) };
      if(fits(cellsOf(to))) st.piece = to;
    }

    let surface = null;
    function finish(){
      if(st.done) return;
      st.done = true;
      st.running = false;
      surface?.stop();
      optsEl.innerHTML = '';
      qEl.textContent = 'Run over.';
      startBtn.disabled = true;
      startBtn.textContent = 'Run over';
      const acc = st.asked ? st.right / st.asked : 0;
      ctx.commit(st.asked >= need && acc >= pass,
        `${st.right} of ${st.asked} answered correctly, ${st.lines} line`
        + `${st.lines === 1 ? '' : 's'} cleared`,
        { stackRight: st.right, stackAsked: st.asked, stackLines: st.lines, stackNeed: need });
    }

    function paint(g, w, h){
      const cw = w / COLS;
      const chh = h / ROWS;
      g.fillStyle = '#15181b';
      g.fillRect(0, 0, w, h);
      g.strokeStyle = 'rgba(242,239,232,0.05)';
      g.lineWidth = 1;
      for(let x = 1; x < COLS; x++){
        g.beginPath(); g.moveTo(x * cw, 0); g.lineTo(x * cw, h); g.stroke();
      }
      const block = (x, y, ink) => {
        g.fillStyle = INK[ink] ?? '#8a97a0';
        roundRect(g, x * cw + 1, y * chh + 1, cw - 2, chh - 2, 3);
        g.fill();
      };
      for(let y = 0; y < ROWS; y++) for(let x = 0; x < COLS; x++){
        if(st.grid[y][x] !== -1) block(x, y, st.grid[y][x]);
      }
      if(st.piece) for(const [x, y] of cellsOf(st.piece)) if(y >= 0) block(x, y, st.piece.ink);
      if(!st.running && !st.done){
        g.fillStyle = 'rgba(16,18,20,0.62)';
        g.fillRect(0, 0, w, h);
        g.fillStyle = '#f2efe8';
        g.font = '600 14px Inter, system-ui, sans-serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText('Start when you are ready.', w / 2, h / 2);
      }
    }

    surface = createPlaySurface(canvas, { step, paint });
    ctx.onClose?.(() => surface?.stop());
    // The number keys answer, which is the original page's one clever control:
    // the hand is already on the keyboard for the well.
    panel.addEventListener('keydown', (e) => {
      const n = ['Digit1', 'Digit2', 'Digit3', 'Digit4'].indexOf(e.code);
      if(n >= 0) answer(n);
    });
    startBtn.addEventListener('click', () => {
      if(st.running || st.done) return;
      st.running = true;
      startBtn.disabled = true;
      startBtn.textContent = 'Running';
      spawn();
      showQuestion();
      canvas.focus?.();
    });
  },
  verdict(ch, r){
    const b = ch.stack ?? {};
    const pass = Number.isFinite(+b.pass) ? +b.pass : 0.75;
    const asked = +(r?.stackAsked ?? 0);
    const acc = asked ? +(r?.stackRight ?? 0) / asked : 0;
    const rows = row([tick(acc >= pass && asked >= (+b.need || 8))
        + ` <b>${r?.stackRight ?? 0} of ${asked}</b>`, 'answered correctly', ''])
      + row([`<b>${r?.stackLines ?? 0}</b>`, 'lines cleared', 'a score, not a grade'])
      + row([`<b>${asked - (+r?.stackRight || 0)}</b>`, 'wrong answers',
        'each one packed a row in under the stack']);
    return board(b.moral ?? 'The lines are the score and the answers are the grade. A run that'
      + ' clears nothing and answers everything passes; a tidy well full of wrong answers does'
      + ' not', rows);
  },
  facts: (g) => `${(g.stack?.questions ?? []).length} question(s) · ${g.stack?.need ?? 8} to finish`
    + ` · ${g.stack?.cols ?? 10}×${g.stack?.rows ?? 16} well`,
  tag: () => 'drill',
};

/* ==================================================================== SPOT */
/**
 * SPOT — take the ones the standing instruction wants, and notice when it changes.
 *
 * The fourth fun-first format, and the only one whose subject *is* the timing.
 * Items arrive on a board, an instruction at the top says which of them to take,
 * and partway through the run the instruction is replaced with no announcement.
 * What is being measured is the cost of the switch: how long the player goes on
 * applying a rule that stopped being the rule.
 *
 * ## This is the one that argues with rule 3
 *
 * `instruments.js` rule 3 says difficulty is judgment, never dexterity. Every
 * other fun-first format obeys it by separating what is timed from what is
 * graded — the belt speeds up, the accuracy is the grade. This one cannot, and
 * saying so plainly is better than pretending: **the switch cost is measured in
 * time, and a version of this with no clock measures nothing.** Take the timer
 * out and you have a sorting exercise with an instruction that changes, which
 * every player gets right.
 *
 * What it does instead is refuse to grade *reaction speed* while grading
 * *adaptation*. Items sit on the board for well over a second; nobody is asked
 * to hit a three-pixel target or beat a reflex threshold. What is weighted is
 * the few seconds either side of a change, so a player who is uniformly slow and
 * uniformly attentive passes, and a player who is quick and keeps working to the
 * old instruction does not. For Sightline that is not a compromise — attention
 * and set-shifting are the syllabus, and a stop that measured them without a
 * clock would be teaching something else.
 *
 * ## The board is DOM, not canvas
 *
 * Real buttons, absolutely positioned. Touch and keyboard work without being
 * reimplemented, the labels are real text at whatever size the audience's
 * typography scale asks for, and `npm run drive` can see them — a canvas board
 * would have needed a hit-test mirror published somewhere just so the harness
 * could click it. `playSurface` runs the clock with no canvas at all.
 *
 * ## What is scored, and what is only on the board
 *
 * Only the items that **discriminate**: the ones the instruction in force wants,
 * the ones the instruction it replaced wanted, and anything the player took.
 * Everything else is filler — arriving, sitting there, and correctly ignored by
 * a player who has understood nothing. Scoring the filler is how the first
 * version of this graded a run that went on applying a withdrawn instruction at
 * 86% and passed it. `npm run drive` found that on the format's first run, which
 * is the entire argument for a harness that plays the wrong answer as well as
 * the right one.
 *
 * ## The trap: a change that changes nothing
 *
 * Two consecutive instructions that select the same items are not a switch. The
 * board looks identical, the player is rewarded for not noticing, and the stop
 * measures the opposite of its subject. The importer computes each rule's
 * selection and refuses. Three more beside it: a rule that takes everything, a
 * rule that takes nothing, and an item every rule wants — all of them make some
 * click unconditionally safe.
 */
const SPOT = {
  pausesClock: true,
  html(ch){
    const s = ch.spot ?? {};
    const duration = +(s.duration ?? 40);
    return ask(ch, 'Take the ones the instruction wants.')
      + `<div class="instPanel spotPanel">`
      + method('SPOT', ch)
      + hint(s.hint ?? 'The instruction is at the top of the board.')
      // The run length, and that the instruction is not fixed. Neither is the
      // answer: which items match it is, and how long the player takes to
      // notice a change is what is weighted. The pass mark stays unprinted.
      + goal([`${Math.round(duration)} seconds of work`,
        'The standing instruction can be replaced during the run',
        'Taking one it does not want costs the same as missing one it does'])
      + `<div class="spotRuleBar"><span>Standing instruction</span>`
      + `<b class="spotRule">—</b></div>`
      + `<div class="spotBoard"></div>`
      + `<div class="spotStrip"><span class="spotTook">0 taken</span>`
      + `<span class="spotLeft">${Math.round(duration)} s</span></div>`
      + foot(btn('spotStart', s.commit ?? 'Open the board', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const s = ch.spot ?? {};
    const panel = container.querySelector('.spotPanel');
    const board = panel?.querySelector('.spotBoard');
    if(!panel || !board) return;

    const items = s.targets ?? [];
    const rules = s.rules ?? [];
    const duration = +(s.duration ?? 40);
    const switchEvery = +(s.switchEvery ?? 10);
    const spawnEvery = +(s.spawnEvery ?? 0.9);
    const life = +(s.life ?? 1.9);
    const windowSec = +(s.window ?? 4);
    const pass = Number.isFinite(+s.pass) ? +s.pass : 0.75;
    const doc = panel.ownerDocument;

    const ruleEl = panel.querySelector('.spotRule');
    const tookEl = panel.querySelector('.spotTook');
    const leftEl = panel.querySelector('.spotLeft');
    const startBtn = panel.querySelector('#spotStart');

    const wanted = (item, rule) =>
      (rule?.want ?? []).some(tag => (item.tags ?? []).includes(tag));

    const st = {
      running: false, done: false,
      t: 0, ruleIdx: 0, prevIdx: null, lastSwitch: 0, nextSpawn: 0,
      live: [], took: 0,
      right: 0, total: 0,     // weighted, and only over the items that discriminate
      lateAfterSwitch: 0,     // items got wrong inside the window
      wrongTakes: 0, misses: 0, filler: 0,
    };

    const weightNow = () => (st.t - st.lastSwitch <= windowSec ? 3 : 1);

    /**
     * Score one item as it leaves the board, however it leaves.
     *
     * **Only the items that discriminate are counted**, and this is the whole
     * measurement rather than a detail. Most of what arrives is wanted by
     * neither the instruction in force nor the one it replaced, so leaving it
     * alone is correct whatever the player understands. Counting that filler
     * meant a run that went on applying a withdrawn instruction scored 86% and
     * passed — `npm run drive` found exactly that on the first run of this
     * format, which is what the wrong-answer path is for.
     *
     * So an item counts when the instruction in force wants it, or when the one
     * before it did — those are the perseveration probes, the items whose
     * correct handling changed at the switch — or when the player took it,
     * because taking something nothing asked for is always an error.
     */
    const settle = (el, clicked) => {
      const item = items[+el.dataset.item];
      const now = wanted(item, rules[st.ruleIdx]);
      const before = st.prevIdx !== null && wanted(item, rules[st.prevIdx]);
      const ok = now === !!clicked;
      if(!now && !before && !clicked){
        st.filler++;
        el.remove();
        st.live = st.live.filter(x => x.el !== el);
        return;
      }
      const w = +el.dataset.weight || 1;
      st.total += w;
      if(ok) st.right += w;
      else {
        if(clicked) st.wrongTakes++; else st.misses++;
        if(st.t - st.lastSwitch <= windowSec) st.lateAfterSwitch++;
      }
      el.remove();
      st.live = st.live.filter(x => x.el !== el);
    };

    function spawn(){
      const item = items[Math.floor(Math.random() * items.length)];
      const el = doc.createElement('button');
      el.type = 'button';
      el.className = 'spotTarget';
      el.textContent = item.label;
      el.dataset.item = String(items.indexOf(item));
      el.dataset.id = String(item.id);
      el.dataset.weight = String(weightNow());
      // Placed as a percentage so the board can be any width. Kept off the very
      // edges: a target half outside its board is a target a thumb cannot hit.
      el.style.left = `${8 + Math.random() * 74}%`;
      el.style.top = `${10 + Math.random() * 66}%`;
      el.addEventListener('click', () => {
        if(!st.running || st.done) return;
        st.took++;
        tookEl.textContent = `${st.took} taken`;
        settle(el, true);
      });
      board.append(el);
      st.live.push({ el, born: st.t });
    }

    function step(dt){
      if(!st.running || st.done) return;
      st.t += dt;
      if(st.t - st.lastSwitch >= switchEvery && rules.length > 1){
        st.lastSwitch = st.t;
        st.prevIdx = st.ruleIdx;
        st.ruleIdx = (st.ruleIdx + 1) % rules.length;
        // The instruction is replaced, and nothing else happens: no flash, no
        // sound, no pause. Noticing is the task.
        ruleEl.textContent = rules[st.ruleIdx].say;
      }
      if(st.t >= st.nextSpawn && st.live.length < 5){
        st.nextSpawn = st.t + spawnEvery;
        spawn();
      }
      for(const x of st.live.slice()) if(st.t - x.born > life) settle(x.el, false);
      leftEl.textContent = `${Math.max(0, duration - st.t).toFixed(0)} s`;
      if(st.t >= duration) finish();
    }

    let surface = null;
    function finish(){
      if(st.done) return;
      st.done = true;
      st.running = false;
      surface?.stop();
      for(const x of st.live.slice()) settle(x.el, false);
      startBtn.disabled = true;
      startBtn.textContent = 'Board closed';
      const acc = st.total ? st.right / st.total : 0;
      ctx.commit(acc >= pass,
        `${(acc * 100).toFixed(0)}% right, ${st.wrongTakes} taken that the instruction did not`
        + ` want and ${st.misses} it did`,
        { spotAcc: acc, spotWrongTakes: st.wrongTakes, spotMisses: st.misses,
          spotLate: st.lateAfterSwitch, spotTook: st.took, spotFiller: st.filler });
    }

    surface = createPlaySurface(null, { step, doc });
    ctx.onClose?.(() => surface?.stop());
    startBtn.addEventListener('click', () => {
      if(st.running || st.done) return;
      st.running = true;
      st.ruleIdx = 0;
      ruleEl.textContent = rules[0]?.say ?? '';
      startBtn.disabled = true;
      startBtn.textContent = 'Board open';
    });
  },
  verdict(ch, r){
    const s = ch.spot ?? {};
    const pass = Number.isFinite(+s.pass) ? +s.pass : 0.75;
    const acc = +(r?.spotAcc ?? 0);
    const rows = row([tick(acc >= pass) + ` <b>${(acc * 100).toFixed(0)}%</b>`,
        'of the board handled as the instruction in force asked', ''])
      + row([`<b>${r?.spotWrongTakes ?? 0}</b>`, 'taken that it did not want', ''])
      + row([`<b>${r?.spotMisses ?? 0}</b>`, 'left that it did', ''])
      + row([`<b>${r?.spotFiller ?? 0}</b>`, 'arrived that neither instruction wanted',
        'correctly left alone, and not scored'])
      + row([`<b>${r?.spotLate ?? 0}</b>`, 'of those errors fell in the seconds after',
        'the instruction changed'], (r?.spotLate ?? 0) ? 'bad' : '')
      + (s.rules ?? []).map(x => row([`<b>${esc(x.say)}</b>`,
        'wanted ' + (x.want ?? []).map(t => esc(t)).join(', '), ''])).join('');
    return board(s.moral ?? 'The errors that matter are the ones bunched just after the'
      + ' instruction changed. Going on applying a rule that has been withdrawn is not'
      + ' carelessness — it is what attention does, which is why the change is never announced',
      rows);
  },
  facts: (g) => `${(g.spot?.targets ?? []).length} items · ${(g.spot?.rules ?? []).length} rules`
    + ` · switches every ${g.spot?.switchEvery ?? 10} s of ${g.spot?.duration ?? 40}`,
  tag: () => 'attention',
};

/* ==================================================================== HOLD */
/**
 * HOLD — keep the needle in the band while something pushes it out.
 *
 * The third fun-first format, and the one closest to being a real instrument:
 * it has a quantity, a unit, a control and a disturbance, which is a thing an
 * operator actually does and which none of the twenty renders. CONTROL is
 * change-one-thing-and-reverse-it; this is hold-a-value-under-load. See
 * `ARCADE.md` §9.3 for the argument that it may yet graduate, and for the
 * argument against.
 *
 * ## What is carried, and what is deliberately not printed
 *
 * The bit of subject matter is the **unit and the direction**: 50.0 Hz, ±0.5,
 * and which way the governor moves it. The band is a *goal* and is printed —
 * `instrumentGoals.mjs` draws exactly this distinction, and a player who cannot
 * see the corridor is not being asked a question. Two things stay unprinted:
 *
 *   · **the direction.** It is the bit being taught. Printing "raise increases
 *     frequency" answers the only thing the format asks, and the player finds it
 *     in the first second by moving the control, which is the point.
 *   · **the pass fraction.** Grading slack on a value the player is producing,
 *     same as a BALLPARK tolerance: knowing it changes nothing about how you
 *     hold the needle and invites aiming at the edge of it.
 *
 * ## The physics is one line
 *
 * The disturbances are steps in the *rate*, not in the value: a load comes on
 * and the quantity starts falling, and goes on falling until the player pushes
 * back. That is what makes it a hold rather than a whack-a-mole, and it is what
 * lets the importer settle the trap in closed form.
 *
 *   rate  = Σ disturbances so far + control × authority
 *   value += rate × dt + noise
 *
 * ## Two traps, both about whether the run is a run
 *
 * A band a do-nothing run survives is decoration: the importer integrates the
 * authored disturbances with the control untouched and refuses a board that
 * never leaves the corridor. And a board whose control cannot out-push the
 * disturbances is unwinnable, which is the same defect from the other side —
 * both render perfectly and neither asks anything.
 */
const HOLD = {
  pausesClock: true,
  html(ch){
    const h = ch.hold ?? {};
    const d = decimals(h.band ?? 0.5);
    return ask(ch, `Hold ${esc(h.quantity ?? 'the value')} inside the band.`)
      + `<div class="instPanel holdPanel">`
      + method('HOLD', ch)
      + hint(h.hint ?? 'The control is the only thing that pushes back.')
      // The corridor and the length of the run: both are constraints the player
      // works against. The fraction of the run that has to be inside it is not
      // here, and must not be.
      + goal([`${esc(h.quantity ?? 'The value')} within ${qty(+h.band, h.unit, d)}`
        + ` of ${qty(+h.hold, h.unit, d)}`,
        `${Math.round(+(h.duration ?? 45))} seconds, and the band narrows as it runs`])
      + `<canvas class="holdCanvas" width="640" height="240"></canvas>`
      + `<div class="holdStrip"><span class="holdNow">—</span>`
      + `<span class="holdEvent"></span>`
      + `<span class="holdLeft">${Math.round(+(h.duration ?? 45))} s</span></div>`
      + `<label class="holdCtl"><span>${esc(h.control ?? 'Control')}</span>`
      + `<input class="holdRange" type="range" min="-1" max="1" step="0.02" value="0"></label>`
      + foot(btn('holdStart', h.commit ?? 'Take the controls', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const h = ch.hold ?? {};
    const panel = container.querySelector('.holdPanel');
    const canvas = panel?.querySelector('.holdCanvas');
    if(!panel || !canvas) return;

    const target = +h.hold;
    const band0 = +h.band;
    const bandEnd = Number.isFinite(+h.narrowTo) ? +h.narrowTo : band0;
    const duration = +(h.duration ?? 45);
    const authority = +(h.authority ?? 0.5);
    const sign = String(h.direction ?? 'raise') === 'lower' ? -1 : 1;
    const noise = +(h.noise ?? 0.02);
    const pass = Number.isFinite(+h.pass) ? +h.pass : 0.8;
    const events = (h.disturbances ?? []).map(e => ({ ...e, at: +e.at, amount: +e.amount }));
    const dp = decimals(band0);

    const range = panel.querySelector('.holdRange');
    const nowEl = panel.querySelector('.holdNow');
    const evEl = panel.querySelector('.holdEvent');
    const leftEl = panel.querySelector('.holdLeft');
    const startBtn = panel.querySelector('#holdStart');

    const st = {
      running: false, done: false,
      t: 0, value: target, rate: 0,
      inside: 0, worst: 0, fired: new Set(), missedBy: [],
      trace: [],
    };
    /** The corridor at time t: it closes linearly across the run. */
    const bandAt = (t) => band0 + (bandEnd - band0) * Math.min(1, t / Math.max(duration, 1e-6));

    function step(dt){
      if(!st.running || st.done) return;
      st.t += dt;
      for(const e of events){
        if(st.t >= e.at && !st.fired.has(e)){
          st.fired.add(e);
          st.rate += e.amount;
          evEl.textContent = e.label ?? '';
          evEl.classList.add('live');
          setTimeout(() => evEl.classList.remove('live'), 1400);
        }
      }
      const control = sign * (+range.value) * authority;
      // The noise is a random WALK, so its step scales with the square root of
      // the frame rather than with the frame. Scaled linearly it looks identical
      // on screen and accumulates completely differently: at 60 fps a per-frame
      // wobble of ±0.01 is half a unit of drift across a 45-second run, which
      // would swamp every disturbance the stop authored.
      st.value += (st.rate + control) * dt + (Math.random() - 0.5) * noise * Math.sqrt(dt);
      const b = bandAt(st.t);
      const off = Math.abs(st.value - target);
      if(off <= b) st.inside += dt;
      else st.missedBy.push({ t: st.t, by: off - b });
      st.worst = Math.max(st.worst, off);
      st.trace.push({ t: st.t, v: st.value, b });
      nowEl.textContent = qty(st.value, h.unit, dp);
      leftEl.textContent = `${Math.max(0, duration - st.t).toFixed(0)} s`;
      if(st.t >= duration) finish();
    }

    let surface = null;
    function finish(){
      if(st.done) return;
      st.done = true;
      st.running = false;
      surface?.stop();
      range.disabled = true;
      startBtn.disabled = true;
      startBtn.textContent = 'Run over';
      const held = st.inside / Math.max(duration, 1e-6);
      ctx.commit(held >= pass,
        `held inside the band for ${(held * 100).toFixed(0)}% of the run,`
        + ` worst excursion ${qty(st.worst, h.unit, dp)}`,
        { holdHeld: held, holdWorst: st.worst, holdTrace: st.trace.length,
          holdMissed: st.missedBy.length });
    }

    function paint(g, w, hgt){
      const pad = 26;
      const span = Math.max(band0, bandEnd, 0.001) * 3.2;
      const yOf = (v) => pad + (1 - (v - (target - span)) / (2 * span)) * (hgt - pad * 2);
      const xOf = (t) => pad + (t / Math.max(duration, 1e-6)) * (w - pad * 2);
      // the corridor, closing
      g.beginPath();
      g.moveTo(xOf(0), yOf(target + band0));
      g.lineTo(xOf(duration), yOf(target + bandEnd));
      g.lineTo(xOf(duration), yOf(target - bandEnd));
      g.lineTo(xOf(0), yOf(target - band0));
      g.closePath();
      g.fillStyle = 'rgba(63,143,86,0.16)';
      g.fill();
      g.strokeStyle = 'rgba(63,143,86,0.55)';
      g.lineWidth = 1.5;
      g.stroke();
      // the target line
      g.strokeStyle = 'rgba(242,239,232,0.30)';
      g.setLineDash([5, 5]);
      g.beginPath();
      g.moveTo(xOf(0), yOf(target));
      g.lineTo(xOf(duration), yOf(target));
      g.stroke();
      g.setLineDash([]);
      // the trace
      g.beginPath();
      st.trace.forEach((p, i) => (i ? g.lineTo(xOf(p.t), yOf(p.v)) : g.moveTo(xOf(p.t), yOf(p.v))));
      g.strokeStyle = '#e8b23a';
      g.lineWidth = 2;
      g.stroke();
      const last = st.trace[st.trace.length - 1];
      if(last){
        g.beginPath();
        g.arc(xOf(last.t), yOf(last.v), 4, 0, Math.PI * 2);
        g.fillStyle = Math.abs(last.v - target) <= last.b ? '#8fe0a8' : '#f08a7a';
        g.fill();
      }
      if(!st.running && !st.done){
        g.fillStyle = 'rgba(16,18,20,0.55)';
        g.fillRect(0, 0, w, hgt);
        g.fillStyle = '#f2efe8';
        g.font = '600 15px Inter, system-ui, sans-serif';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText('Take the controls when you are ready.', w / 2, hgt / 2);
      }
    }

    surface = createPlaySurface(canvas, { step, paint });
    ctx.onClose?.(() => surface?.stop());
    // The keys drive the same slider the thumb does, so there is one control and
    // one place its value lives.
    panel.addEventListener('keydown', (e) => {
      if(e.code !== 'ArrowLeft' && e.code !== 'ArrowRight') return;
      range.value = String(clamp(+range.value + (e.code === 'ArrowRight' ? 0.06 : -0.06), -1, 1));
    });
    startBtn.addEventListener('click', () => {
      if(st.running || st.done) return;
      st.running = true;
      startBtn.disabled = true;
      startBtn.textContent = 'Running';
      range.focus();
    });
  },
  verdict(ch, r){
    const h = ch.hold ?? {};
    const dp = decimals(+h.band);
    const held = +(r?.holdHeld ?? 0);
    const rows = row([tick(held >= (Number.isFinite(+h.pass) ? +h.pass : 0.8))
        + ` <b>${(held * 100).toFixed(0)}%</b>`, 'of the run inside the band', ''])
      + row([`<b>${qty(+(r?.holdWorst ?? 0), h.unit, dp)}</b>`, 'worst distance from',
        qty(+h.hold, h.unit, dp)])
      + (h.disturbances ?? []).map(e => row([`<b>${esc(e.label ?? 'Disturbance')}</b>`,
        `at ${Math.round(+e.at)} s`,
        `${+e.amount > 0 ? 'pushed it up' : 'pushed it down'} and kept pushing`])).join('');
    return board(h.moral ?? 'A step in the load is a step in the rate, not in the value — it does'
      + ' not knock the needle once and stop. Until the control answers it, the needle keeps'
      + ' going', rows);
  },
  facts: (g) => `${g.hold?.quantity ?? '—'} at ${g.hold?.hold} ${g.hold?.unit ?? ''}`
    + ` ±${g.hold?.band}${Number.isFinite(+g.hold?.narrowTo) ? `→${g.hold.narrowTo}` : ''}`
    + ` · ${(g.hold?.disturbances ?? []).length} disturbance(s) over ${g.hold?.duration ?? 45} s`,
  tag: () => 'holding',
};

/* =================================================================== TRIAL */
/**
 * TRIAL — drive the route, and be graded on the order rather than the time.
 *
 * The second of the formats that are fun first, and the one with the highest
 * return in the repo: eighteen finished worlds exist and nothing currently makes
 * a player look at one. A day sends you to three places and the walk between
 * them is dead time; this makes the walk the question.
 *
 * ## The shape, and why it is not a panel
 *
 * `html` renders a briefing — the gates, unordered, and what is being asked —
 * and one button. Pressing it *suspends* the panel: the overlay hides, the
 * player is put back at the spawn with the gates lit around them, and they
 * drive. When the last gate is taken the panel comes back with the order they
 * actually took, and only then is there anything to commit.
 *
 * That is three things no other format needs, and all three are optional fields
 * on `ctx` so that nothing else changes:
 *
 *   ctx.world      the world handle, or absent in every harness
 *   ctx.suspend()  hide the panel without ending the visit or releasing the stop
 *   ctx.resume(h)  bring it back with new content
 *
 * With no `ctx.world` — `engine/dev/instruments.html`, `instrumentDrive`, any
 * future headless reader — the briefing still renders and the button is disabled
 * with a line saying why. A format that threw without a world would be a format
 * that could not be inspected, and every one of the other twenty can.
 *
 * ## What is graded
 *
 * The order, exactly. Not the time — the clock is the pressure and the
 * leaderboard, and grading it would make this a reflex test, which is instrument
 * rule 3 and the line the fun-first formats are not allowed to cross. A player
 * who walks the route at walking pace and gets the order right passes.
 *
 * A finished run is not committed automatically: the panel shows the order taken
 * and offers "run it again". Nothing is revealed by that — the player already
 * knows what order they took, and no feedback about correctness is given until
 * they commit — so re-running can only buy them a better time or a change of
 * mind, which is rule 3's "every control can be re-set until commit" applied to
 * a route.
 *
 * ## The trap is geometric and lives in the importer
 *
 * If the authored order is the nearest-neighbour walk from the spawn, then the
 * fastest line is the correct line and the sequence is free. The importer
 * computes that route from the theme's own `site.js` and refuses. It is the only
 * check in the repo that reads the place to grade the content, and it has to:
 * the defect is invisible in the book and obvious on the ground.
 */
const TRIAL = {
  // The day's countdown stops while a run is on. The trial has its own clock,
  // and charging the day as well charges the player twice — the same argument
  // that stopped it for every panel, arriving in the one format whose pressure
  // continues after the overlay has closed.
  pausesClock: true,
  html(ch){
    const t = ch.trial ?? {};
    const gates = t.gates ?? [];
    // Deterministic, and NOT the answer order: the list is a set of places, and
    // printing it in the order it was authored would be printing the answer.
    const shown = shuffleSeeded(gates.slice(), gates.length * 7 + 3);
    const rows = shown.map(g => `<li class="trialGate">${esc(g.label)}`
      + (g.note ? `<span>${esc(g.note)}</span>` : '') + `</li>`).join('');
    return ask(ch, 'Take the gates in the order the work has to happen in.')
      + `<div class="instPanel trialPanel">`
      + method('TRIAL', ch)
      + hint(t.hint ?? 'Every gate is lit. None of them is marked as next.')
      + goal([`${gates.length} gates, in one run`,
        'The order is what is graded, and the clock is a limit rather than a score',
        'You start back at the gate, however you got here'])
      + `<ol class="trialGates">${rows}</ol>`
      // `bind` puts a line here when there is no world to run in. It is not
      // decided at render time because `html` is called in Node by
      // `instrumentGoals.mjs`, which has no opinion about worlds and should not
      // have to acquire one.
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('trialGo', t.go ?? 'Run it', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.trial ?? {};
    const panel = container.querySelector('.trialPanel');
    if(!panel) return;
    const world = ctx.world;
    const go = panel.querySelector('#trialGo');
    if(!world || !ctx.suspend || !ctx.resume){
      if(go) go.disabled = true;
      const note = panel.querySelector('.trialNoWorld');
      if(note){
        note.classList.remove('hidden');
        note.textContent = 'There is no world on this page, so the route cannot be run'
          + ' from here. Open the stop in the game.';
      }
      return;
    }
    const gates = t.gates ?? [];
    const label = (id) => gates.find(g => String(g.id) === String(id))?.label ?? String(id);

    const start = () => {
      ctx.suspend();
      world.run({ gates }, (result) => {
        ctx.resume(resultHTML(result));
        wire(result);
      });
    };

    // Three ways a run can come back short of every gate, and only one of them
    // used to be handled: given up, out of time, or simply fewer gates than the
    // board has. The clock runs down now, so "out of time" is a real ending, and a
    // partial order committed as a route would be graded against a full one.
    const short = (r) => !!r.abandoned || !!r.out || (r.order ?? []).length < gates.length;
    const resultHTML = (r) => {
      const taken = (r.order ?? []).map((id, i) =>
        `<li>${i + 1}. ${esc(label(id))}</li>`).join('');
      const why = r.abandoned ? 'You gave the run up.'
        : r.out ? 'The time went.'
        : short(r) ? 'You did not get round all of them.'
        : 'The route you took.';
      return `<div class="instPanel trialPanel">`
        + `<div class="sweepAsk">${esc(why)}</div>`
        // The order they took, and the time. No mark against either: whether it
        // was right is the answer, and the answer arrives when they commit.
        + hint(short(r)
          ? `${(r.order ?? []).length} of ${gates.length} gates.`
          : `${r.seconds.toFixed(1)} seconds.`)
        + `<ol class="trialTaken">${taken || '<li>No gates taken.</li>'}</ol>`
        // A run that did not reach every gate is not a route to stand by. The
        // button was already dead on an abandoned run and said nothing about it,
        // which reads as a broken panel rather than as a rule.
        + runAgainOnly(!short(r),
          'You did not get round all of them, so there is no route to report. Run it again.')
        + foot(btn('trialAgain', 'Run it again')
          + btn('trialCommit', t.commit ?? 'Stand by this route',
            { primary: true, disabled: short(r) }))
        + `</div>`;
    };

    const wire = (r) => {
      const live = container.querySelector('.trialPanel') ?? container;
      live.querySelector('#trialAgain')?.addEventListener('click', start);
      live.querySelector('#trialCommit')?.addEventListener('click', () => {
        const order = r.order ?? [];
        const want = (t.order ?? []).map(String);
        const ok = order.length === want.length
          && order.every((id, i) => String(id) === want[i]);
        ctx.commit(ok,
          order.map(id => label(id)).join(' → ') + ` — ${r.seconds.toFixed(1)} s`,
          { trialOrder: order, trialSeconds: r.seconds });
      });
    };

    go?.addEventListener('click', start);
    // A run left going when the player walks away from the panel is a run with
    // gates still standing in the world.
    ctx.onClose?.(() => world.abort?.());
  },
  verdict(ch, r){
    const t = ch.trial ?? {};
    const gates = t.gates ?? [];
    const label = (id) => gates.find(g => String(g.id) === String(id))?.label ?? String(id);
    const want = (t.order ?? []).map(String);
    const got = (r?.trialOrder ?? []).map(String);
    const rows = want.map((id, i) => row([
      tick(got[i] === id) + ` <b>${i + 1}. ${esc(label(id))}</b>`,
      esc(gates.find(g => String(g.id) === id)?.because ?? ''),
      got[i] === id ? '' : (got[i] ? `you took ${esc(label(got[i]))}` : 'you never got here'),
    ], got[i] === id ? '' : 'bad')).join('');
    const time = Number.isFinite(+r?.trialSeconds)
      ? row([`<b>${(+r.trialSeconds).toFixed(1)} s</b>`, 'your time', 'not graded'])
      : '';
    return board(t.moral ?? 'The order is the answer and the clock is only a clock. A route'
      + ' driven fast in the wrong order arrives with the work undone', rows + time);
  },
  facts: (g) => `${(g.trial?.gates ?? []).length} gates`
    + ` · order ${(g.trial?.order ?? []).join(' → ')}`,
  tag: () => 'route',
};


/* ================================================== the world-graded five */
/**
 * GREET, FOLLOW, HUNT, CANVASS and EVADE — TRIAL's shape, five more times.
 *
 * Everything TRIAL's header says applies here and is not repeated: the panel is
 * a briefing rather than a board, `ctx.world` is absent in every harness and the
 * run button says so, the run starts at the spawn, and `engine/world` owns the
 * three.js so that this file stays loadable in Node and on a page with no scene.
 *
 * What is new is that four of them are about **people**, and people are already
 * in the world with a body, a name and a walk. A run borrows them; it does not
 * build anybody. See `takeOver` in worldFormats.js.
 *
 * Rule 3, which is the one these are in tension with: the clock is the pressure
 * and the grade is coverage — who you greet, what you found, whether the call
 * you made was right. EVADE is the closest to the line and stays behind it by
 * making the clock stop while you are caught rather than ending the run, and by
 * refusing at import time any pursuer faster than the player.
 */

/** The shared "there is no world on this page" wiring. Four callers. */
function worldRunner(container, ctx, panelClass, goId, launch){
  const panel = container.querySelector(panelClass);
  if(!panel) return null;
  const go = panel.querySelector(goId);
  if(!ctx.world || !ctx.suspend || !ctx.resume){
    if(go) go.disabled = true;
    const note = panel.querySelector('.trialNoWorld');
    if(note){
      note.classList.remove('hidden');
      note.textContent = 'There is no world on this page, so this cannot be run from here.'
        + ' Open the stop in the game.';
    }
    return null;
  }
  go?.addEventListener('click', launch);
  ctx.onClose?.(() => ctx.world.abort?.());
  return panel;
}

/**
 * A run you did not finish cannot be handed in.
 *
 * The player asked for this and it is the right rule: these formats are a thing
 * you either did or did not do, and "report the round" on a round you abandoned
 * is a way of taking the loss and moving on that the other formats do not offer
 * either — a wrong call anywhere else is a penalty box you have to come back to.
 * So the commit button is dead until the goal is met, and the way out of the
 * panel is to run it again. Closing the card leaves the stop open, so nobody is
 * locked in: it is still there when they come back.
 *
 * What this must NOT do is gate on grading slack. FOLLOW is judged on the
 * fraction of the walk inside the band and that fraction is never printed, so
 * its gate is the two things the player can already see — they arrived, and they
 * did not walk into the back of the guide. Lighting the button on the pass
 * fraction would print it. See instrument rule 2 and `instrumentGoals.mjs`.
 */
const runAgainOnly = (done, what) => done ? ''
  : `<div class="sweepHint runAgain">${esc(what)}</div>`;

/** The line every one of these ends a run with. Never says whether it was right. */
const runLine = (t) => `<div class="sweepAsk">${esc(t)}</div>`;

/* =================================================================== GREET */
const GREET = {
  pausesClock: true,
  // A run you did not finish cannot be handed in — see runAgainOnly. The
  // driver reads this: for these five there is no wrong answer to reach
  // commit with, only a run that has not been done yet.
  successGated: true,
  html(ch){
    const g = ch.greet ?? {};
    const list = g.roster ?? [];
    const rows = shuffleSeeded(list.slice(), list.length * 5 + 1)
      .map(p => `<li class="trialGate">${esc(p.name)}`
        + (p.note ? `<span>${esc(p.note)}</span>` : '') + `</li>`).join('');
    return ask(ch, 'Get round the site and say hello.')
      + `<div class="instPanel trialPanel greetPanel">`
      + method('GREET', ch)
      + hint(g.hint ?? 'They are all walking about. The rings on the ground are the people on the list.')
      + goal([`${g.target} of the ${list.length} on the list`,
        `${g.minutes} minutes of the working day`,
        'Get to somebody and press Use to say hello — walking past is not a hello'])
      + `<ol class="trialGates">${rows}</ol>`
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('greetGo', g.go ?? 'Set off', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const g = ch.greet ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.greet({ roster: g.roster ?? [], target: +g.target, minutes: +g.minutes,
        radius: +g.radius || 0 }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => {
      const met = (r.met ?? []).map(id =>
        `<li>${esc((g.roster ?? []).find(p => String(p.id) === String(id))?.name ?? id)}</li>`).join('');
      return `<div class="instPanel trialPanel greetPanel">`
        + runLine(r.abandoned ? 'You broke off the round.'
          : r.out ? 'The hour went.' : 'You got round them.')
        + hint(`${(r.met ?? []).length} of ${g.target} in ${Math.round(r.seconds)} minutes.`)
        + `<ol class="trialTaken">${met || '<li>Nobody.</li>'}</ol>`
        + runAgainOnly((r.met ?? []).length >= +g.target,
          'The round is not done, so there is nothing to report. Go round again.')
        + foot(btn('greetAgain', 'Go round again')
          + btn('greetCommit', g.commit ?? 'Report the round',
            { primary: true, disabled: (r.met ?? []).length < +g.target }))
        + `</div>`;
    };
    const wire = (r) => {
      const live = container.querySelector('.greetPanel') ?? container;
      live.querySelector('#greetAgain')?.addEventListener('click', start);
      live.querySelector('#greetCommit')?.addEventListener('click', () => {
        const met = r.met ?? [];
        const ok = met.length >= +g.target;
        ctx.commit(ok, `${met.length} of ${g.target}`, { greetMet: met, greetSeconds: r.seconds });
      });
    };
    worldRunner(container, ctx, '.greetPanel', '#greetGo', start);
  },
  verdict(ch, r){
    const g = ch.greet ?? {};
    const met = (r?.greetMet ?? []).map(String);
    const rows = (g.roster ?? []).map(p => row([
      tick(met.includes(String(p.id))) + ` <b>${esc(p.name)}</b>`,
      esc(p.where ?? ''),
      met.includes(String(p.id)) ? '' : 'never got to them',
    ], met.includes(String(p.id)) ? '' : 'bad')).join('');
    return board(g.moral ?? 'A round is not a list of names — it is a route. Who you reach is'
      + ' decided before you set off, by the order you choose to take them in', rows);
  },
  facts: (g) => `${(g.greet?.roster ?? []).length} on the list`
    + ` · greet ${g.greet?.target} in ${g.greet?.minutes} min`,
  tag: () => 'round',
};

/* ================================================================== FOLLOW */
const FOLLOW = {
  pausesClock: true,
  // A run you did not finish cannot be handed in — see runAgainOnly. The
  // driver reads this: for these five there is no wrong answer to reach
  // commit with, only a run that has not been done yet.
  successGated: true,
  html(ch){
    const f = ch.follow ?? {};
    return ask(ch, 'Stay with them.')
      + `<div class="instPanel trialPanel followPanel">`
      + method('FOLLOW', ch)
      + hint(f.hint ?? 'They will not wait, and they will stop without saying so.')
      + goal([`Between ${f.band?.near} and ${f.band?.far} m of them`,
        'All the way to the end of the walk',
        `Inside ${f.band?.near} m and the walk is over — you are in front of them`])
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('followGo', f.go ?? 'Set off with them', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const f = ch.follow ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.follow({ guide: f.guide, path: f.path ?? [], speed: +f.speed,
        band: f.band, seconds: +f.seconds }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => {
      const pct = Math.round(100 * (r.inside ?? 0) / Math.max(0.001, r.total ?? 1));
      return `<div class="instPanel trialPanel followPanel">`
        + runLine(r.abandoned ? 'You gave the walk up.'
          : r.crowded ? 'You walked into the back of her, and the walk ended there.'
          : r.arrived ? 'They got where they were going.' : 'The walk ran out of time.')
        // The percentage they held, and no mark against it: the pass fraction is
        // grading slack and stays unprinted until the verdict.
        + hint(`You were with them for ${pct}% of it.`)
        + runAgainOnly(!!r.arrived && !r.crowded,
          'You did not get to the end of the walk with her, so there is nothing to report.'
          + ' Walk it again.')
        + foot(btn('followAgain', 'Walk it again')
          + btn('followCommit', f.commit ?? 'Report the walk',
            { primary: true, disabled: !r.arrived || !!r.crowded }))
        + `</div>`;
    };
    const wire = (r) => {
      const live = container.querySelector('.followPanel') ?? container;
      live.querySelector('#followAgain')?.addEventListener('click', start);
      live.querySelector('#followCommit')?.addEventListener('click', () => {
        const frac = (r.inside ?? 0) / Math.max(0.001, r.total ?? 1);
        const ok = !!r.arrived && !r.crowded && frac >= (+f.pass || 0.8);
        ctx.commit(ok, r.crowded ? 'walked into the back of them'
          : `${Math.round(frac * 100)}% inside the band`,
          { followInside: r.inside, followTotal: r.total, followArrived: !!r.arrived,
            followCrowded: !!r.crowded });
      });
    };
    worldRunner(container, ctx, '.followPanel', '#followGo', start);
  },
  verdict(ch, r){
    const f = ch.follow ?? {};
    const frac = (r?.followInside ?? 0) / Math.max(0.001, r?.followTotal ?? 1);
    const rows = row([`<b>${Math.round(frac * 100)}%</b>`, 'of the walk inside the band',
      frac >= (+f.pass || 0.8) ? '' : `${Math.round((+f.pass || 0.8) * 100)}% was wanted`],
      frac >= (+f.pass || 0.8) ? '' : 'bad')
      + row([tick(!!r?.followArrived) + ' <b>To the end</b>', 'the walk was completed',
        r?.followCrowded ? 'you got inside the near edge and it ended there'
          : r?.followArrived ? '' : 'it was not'], r?.followArrived ? '' : 'bad');
    return board(f.moral ?? 'Following is a band rather than a line. Too close and you are in'
      + ' front of them the moment they stop; too far and you are guessing where they went',
      rows);
  },
  facts: (g) => `${(g.follow?.path ?? []).length} legs`
    + ` · ${g.follow?.band?.near}–${g.follow?.band?.far} m`,
  tag: () => 'walk',
};

/* ==================================================================== HUNT */
const HUNT = {
  pausesClock: true,
  // A run you did not finish cannot be handed in — see runAgainOnly. The
  // driver reads this: for these five there is no wrong answer to reach
  // commit with, only a run that has not been done yet.
  successGated: true,
  html(ch){
    const h = ch.hunt ?? {};
    return ask(ch, 'Find them and bring the count back.')
      + `<div class="instPanel trialPanel huntPanel">`
      + method('HUNT', ch)
      + hint(h.hint ?? 'They are not on the map. You have to be close to one to see it.')
      + goal([`${h.target} of them`, `${h.minutes} minutes`,
        `${(h.at ?? []).length} are out there, so most of them can be left`,
        'Nothing is marked and nothing is on the map — you have to walk the ground'])
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('huntGo', h.go ?? 'Start looking', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const h = ch.hunt ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.hunt({ item: h.item ?? {}, at: h.at ?? [], target: +h.target,
        minutes: +h.minutes, radius: +h.radius || 0 }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => `<div class="instPanel trialPanel huntPanel">`
      + runLine(r.abandoned ? 'You came back early.' : r.out ? 'The time went.' : 'You have them.')
      + hint(`${r.got ?? 0} of ${h.target} in ${Math.round(r.seconds)} minutes.`)
      + runAgainOnly((r.got ?? 0) >= +h.target,
        'You are short, so there is nothing to hand in. Go out again.')
      + foot(btn('huntAgain', 'Go out again')
        + btn('huntCommit', h.commit ?? 'Hand them in',
          { primary: true, disabled: (r.got ?? 0) < +h.target }))
      + `</div>`;
    const wire = (r) => {
      const live = container.querySelector('.huntPanel') ?? container;
      live.querySelector('#huntAgain')?.addEventListener('click', start);
      live.querySelector('#huntCommit')?.addEventListener('click', () => {
        ctx.commit((r.got ?? 0) >= +h.target, `${r.got ?? 0} of ${h.target}`,
          { huntGot: r.got ?? 0, huntSeconds: r.seconds });
      });
    };
    worldRunner(container, ctx, '.huntPanel', '#huntGo', start);
  },
  verdict(ch, r){
    const h = ch.hunt ?? {};
    const got = +r?.huntGot || 0;
    const rows = row([`<b>${got}</b>`, `${esc(h.item?.name ?? 'found')}`,
      got >= +h.target ? '' : `${h.target} were wanted`], got >= +h.target ? '' : 'bad')
      + row([`<b>${(h.at ?? []).length}</b>`, 'were out there', '']);
    return board(h.moral ?? 'A search is a route with a stopping rule. The ones you leave are'
      + ' the ones that cost more to reach than the ones you have not looked for yet', rows);
  },
  facts: (g) => `${(g.hunt?.at ?? []).length} placed · find ${g.hunt?.target}`,
  tag: () => 'search',
};

/* ================================================================= CANVASS */
const CANVASS = {
  pausesClock: true,
  html(ch){
    const c = ch.canvass ?? {};
    const pop = c.population ?? [];
    return ask(ch, 'Ask enough of them to answer it.')
      + `<div class="instPanel trialPanel canvassPanel">`
      + method('CANVASS', ch)
      + `<div class="canvassClaim">${esc(c.claim ?? '')}</div>`
      + hint(c.hint ?? 'Everybody answers, and two people in the same room can answer'
        + ' differently. Nobody will tell you how many is enough.')
      + goal([`${pop.length} people work here`, `${c.minutes} minutes`,
        'Get to somebody and press Use to ask them',
        'You answer the claim yourself at the end, from what you were told'])
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('canvassGo', c.go ?? 'Go and ask', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const c = ch.canvass ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.canvass({ population: c.population ?? [], minutes: +c.minutes,
        radius: +c.radius || 0, skew: +c.skew || 0 }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => {
      const asked = r.asked ?? [];
      const yes = asked.filter(a => a.said).length;
      const rows = asked.map(a =>
        `<li>${esc(a.name)} — ${a.said ? esc(c.yes ?? 'yes') : esc(c.no ?? 'no')}</li>`).join('');
      return `<div class="instPanel trialPanel canvassPanel">`
        + `<div class="canvassClaim">${esc(c.claim ?? '')}</div>`
        + runLine(`You asked ${asked.length} of ${(c.population ?? []).length}.`)
        // The sample's own split, which is what they collected. Whether it is
        // enough of a sample is the question, so nothing here answers it.
        + hint(`${yes} said ${esc(c.yes ?? 'yes')}, ${asked.length - yes} said ${esc(c.no ?? 'no')}.`)
        + `<ol class="trialTaken canvassSample">${rows || '<li>You asked nobody.</li>'}</ol>`
        + foot(btn('canvassAgain', 'Ask more of them')
          + btn('canvassTrue', c.trueLabel ?? 'The claim holds', { primary: true })
          + btn('canvassFalse', c.falseLabel ?? 'The claim does not hold', { primary: true }))
        + `</div>`;
    };
    const wire = (r) => {
      const live = container.querySelector('.canvassPanel') ?? container;
      live.querySelector('#canvassAgain')?.addEventListener('click', start);
      const call = (said) => {
        const asked = r.asked ?? [];
        ctx.commit(said === !!c.answer,
          said ? (c.trueLabel ?? 'The claim holds') : (c.falseLabel ?? 'The claim does not hold'),
          { canvassSaid: said, canvassAsked: asked.length,
            canvassYes: asked.filter(a => a.said).length });
      };
      live.querySelector('#canvassTrue')?.addEventListener('click', () => call(true));
      live.querySelector('#canvassFalse')?.addEventListener('click', () => call(false));
    };
    worldRunner(container, ctx, '.canvassPanel', '#canvassGo', start);
  },
  verdict(ch, r){
    const c = ch.canvass ?? {};
    const pop = c.population ?? [];
    // What the site is expected to say, not how many people lean which way —
    // with a skew those are different numbers and the second one is not what
    // the player was sampling. See `skew` in worldFormats.js.
    const skew = +c.skew || 0.75;
    const popYes = Math.round(pop.filter(p => p.says).length * skew
      + pop.filter(p => !p.says).length * (1 - skew));
    const asked = +r?.canvassAsked || 0;
    const yes = +r?.canvassYes || 0;
    const said = !!r?.canvassSaid;
    const rows = row([tick(said === !!c.answer) + ' <b>Your call</b>',
      said ? esc(c.trueLabel ?? 'holds') : esc(c.falseLabel ?? 'does not hold'),
      said === !!c.answer ? '' : 'the site says otherwise'], said === !!c.answer ? '' : 'bad')
      + row([`<b>${yes} of ${asked}</b>`, 'what your sample said', ''])
      + row([`<b>about ${popYes} of ${pop.length}</b>`, 'what the site says, asked in full',
        asked < pop.length ? 'you did not ask them all, and did not have to' : ''])
    return board(c.moral ?? 'A sample is not a smaller copy of the place. Ask the nearest few'
      + ' and you have measured where you were standing, which is a fact about your route'
      + ' rather than about the question', rows);
  },
  facts: (g) => `${(g.canvass?.population ?? []).length} asked of`
    + ` · ${(g.canvass?.population ?? []).filter(p => p.says).length} say yes`,
  tag: () => 'sample',
};

/* =================================================================== EVADE */
const EVADE = {
  pausesClock: true,
  // A run you did not finish cannot be handed in — see runAgainOnly. The
  // driver reads this: for these five there is no wrong answer to reach
  // commit with, only a run that has not been done yet.
  successGated: true,
  html(ch){
    const e = ch.evade ?? {};
    return ask(ch, 'Keep out of their way.')
      + `<div class="instPanel trialPanel evadePanel">`
      + method('EVADE', ch)
      + hint(e.hint ?? 'They walk straight at you and they do not go through buildings.')
      + goal([`${e.distance} m of clear ground`, `${e.seconds} seconds of it, added up`,
        'The count stops while they are close, and starts again when you are clear'])
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('evadeGo', e.go ?? 'Start the drill', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const e = ch.evade ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.evade({ pursuer: e.pursuer, distance: +e.distance, seconds: +e.seconds,
        speed: +e.speed, limit: +e.limit || 0 }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => `<div class="instPanel trialPanel evadePanel">`
      + runLine(r.abandoned ? 'You stopped the drill.'
        : (r.held ?? 0) >= (r.need ?? 0) ? 'You stayed clear.' : 'Time went.')
      + hint(`${Math.floor(r.held ?? 0)} of ${e.seconds} seconds clear`
        + `, ${Math.floor(r.caught ?? 0)} spent inside ${e.distance} m.`)
      + runAgainOnly((r.held ?? 0) >= +e.seconds,
        'The tray never got its half minute, so there is nothing to report. Run it again.')
      + foot(btn('evadeAgain', 'Run the drill again')
        + btn('evadeCommit', e.commit ?? 'Report the drill',
          { primary: true, disabled: (r.held ?? 0) < +e.seconds }))
      + `</div>`;
    const wire = (r) => {
      const live = container.querySelector('.evadePanel') ?? container;
      live.querySelector('#evadeAgain')?.addEventListener('click', start);
      live.querySelector('#evadeCommit')?.addEventListener('click', () => {
        ctx.commit((r.held ?? 0) >= +e.seconds,
          `${Math.floor(r.held ?? 0)} s clear of ${e.seconds}`,
          { evadeHeld: r.held ?? 0, evadeCaught: r.caught ?? 0 });
      });
    };
    worldRunner(container, ctx, '.evadePanel', '#evadeGo', start);
  },
  verdict(ch, r){
    const e = ch.evade ?? {};
    const held = +r?.evadeHeld || 0;
    const rows = row([tick(held >= +e.seconds) + ` <b>${Math.floor(held)} s</b>`,
      `clear of ${e.distance} m`, held >= +e.seconds ? '' : `${e.seconds} s were wanted`],
      held >= +e.seconds ? '' : 'bad')
      + row([`<b>${Math.floor(+r?.evadeCaught || 0)} s</b>`, 'spent inside it', '']);
    return board(e.moral ?? 'Nobody here is faster than you, so being caught is never about'
      + ' speed. It is about the ground you chose to be standing on when they arrived', rows);
  },
  facts: (g) => `${g.evade?.distance} m for ${g.evade?.seconds} s`
    + ` · pursuer ${g.evade?.speed} m/s`,
  tag: () => 'drill',
};

/* ===================================================================== TAG */
const TAG = {
  pausesClock: true,
  // A run you did not finish cannot be handed in — see runAgainOnly. The
  // driver reads this: for these five there is no wrong answer to reach
  // commit with, only a run that has not been done yet.
  successGated: true,
  html(ch){
    const t = ch.tag ?? {};
    return ask(ch, 'Catch them before they get there.')
      + `<div class="instPanel trialPanel tagPanel">`
      + method('TAG', ch)
      + hint(t.hint ?? 'They walk away from you and nowhere else. They are slower than you are.')
      + goal([`Within ${t.reach} m of them`, `${t.seconds} seconds`,
        'Walking straight at them is not fast enough on its own'])
      + `<div class="trialNoWorld hidden"></div>`
      + foot(btn('tagGo', t.go ?? 'Go after them', { primary: true }))
      + `</div>`;
  },
  bind(container, ch, ctx = INERT){
    const t = ch.tag ?? {};
    const start = () => {
      ctx.suspend();
      ctx.world.tag({ quarry: t.quarry, reach: +t.reach, speed: +t.speed,
        seconds: +t.seconds }, (r) => {
        ctx.resume(resultHTML(r));
        wire(r);
      });
    };
    const resultHTML = (r) => `<div class="instPanel trialPanel tagPanel">`
      + runLine(r.abandoned ? 'You called the chase off.'
        : r.caught ? 'You got to them.' : 'They got there first.')
      + hint(r.caught ? `${Math.round(r.seconds)} seconds.`
        : `Closest you came was ${(r.closest ?? 0).toFixed(0)} m.`)
      + runAgainOnly(!!r.caught,
        'He got through the gate, so there is nothing to report. Go after him again.')
      + foot(btn('tagAgain', 'Try it again')
        + btn('tagCommit', t.commit ?? 'Report the chase',
          { primary: true, disabled: !r.caught }))
      + `</div>`;
    const wire = (r) => {
      const live = container.querySelector('.tagPanel') ?? container;
      live.querySelector('#tagAgain')?.addEventListener('click', start);
      live.querySelector('#tagCommit')?.addEventListener('click', () => {
        ctx.commit(!!r.caught,
          r.caught ? `caught in ${Math.round(r.seconds)} s`
            : `never got closer than ${(r.closest ?? 0).toFixed(0)} m`,
          { tagCaught: !!r.caught, tagClosest: r.closest ?? 0, tagSeconds: r.seconds });
      });
    };
    worldRunner(container, ctx, '.tagPanel', '#tagGo', start);
  },
  verdict(ch, r){
    const t = ch.tag ?? {};
    const caught = !!r?.tagCaught;
    const rows = row([tick(caught) + ' <b>Caught them</b>',
      `inside ${t.reach} m`, caught ? '' : 'they got away'], caught ? '' : 'bad')
      + row([`<b>${(+r?.tagClosest || 0).toFixed(0)} m</b>`, 'closest you came', ''])
      + (Number.isFinite(+r?.tagSeconds)
        ? row([`<b>${Math.round(+r.tagSeconds)} s</b>`, 'the chase took', 'not graded']) : '');
    return board(t.moral ?? 'Walking straight at somebody walking straight away closes the gap'
      + ' at the difference of two paces, and that is never quick enough. What catches them is'
      + ' the corner they have to turn', rows);
  },
  facts: (g) => `${g.tag?.reach} m inside ${g.tag?.seconds} s`
    + ` · quarry ${g.tag?.speed} m/s`,
  tag: () => 'chase',
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
  // Tier 3 — the ones that are fun first. Same contract, same ctx, same checks;
  // what differs is that the move they render is the player's rather than the
  // scientist's, and they carry one bit of subject matter at speed. `ARCADE.md`
  // is the argument, and the reason they are in this registry rather than a
  // second one.
  BELT, TRIAL, HOLD, SPOT, STACK, LOB,
  // Five more graded against the place rather than against a board. They share
  // TRIAL's `ctx.world` and its world module's lifecycle; see worldFormats.js.
  GREET, FOLLOW, HUNT, CANVASS, EVADE, TAG,
};

/** The block name a format keeps its data under: TRIGGER -> `trigger`. */
export const INSTRUMENT_BLOCK = Object.fromEntries(
  Object.keys(INSTRUMENTS).map(k => [k, k.toLowerCase()]));

/** Whether a canonical format name is one of these twelve. */
export const isInstrument = (kind) => Object.hasOwn(INSTRUMENTS, String(kind ?? ''));
