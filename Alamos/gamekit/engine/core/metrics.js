// metrics.js — the four campaign bars, and what a mission does to them.
//
// A campaign that runs on metrics has no funds, no day budget and no penalty
// box. What it has is four bars from 0 to 100, a stopwatch against a per-mission
// target, a count of committed wrong answers, and Recovery Points earned from
// those two and spent on the bars. Every rule below is from the campaign's own
// bible; none of it is invented here, and none of it is hard-coded to a theme —
// the bars, the targets, the deltas and the lock rules are all theme data, so a
// second campaign on this model is a manifest and not a patch.
//
// WHY IT IS ITS OWN MODULE AND PURE. Two reasons, and the repo has paid for
// both. It has to be testable without a browser, because the arithmetic is the
// part that can be quietly wrong — an RP formula that is out by one is invisible
// on screen and wrong for the whole campaign. And `gameState` is imported by
// everything, so a module that reaches back into it cannot be loaded by a node
// selftest at all.
//
// THE ONE THING TO KNOW. `applyDeltas` is the only way a bar moves, so locks,
// clamping and collapse are decided in one place. A caller that reaches into
// `state.metrics` and assigns is a second description of those rules.

/**
 * The bars a theme declares, normalised.
 *
 * @param theme  the manifest. `theme.metrics.bars` is `[{ key, label, start,
 *               lockFrom }]`, where `lockFrom` is the mission number after
 *               which reaching 100 makes the bar eligible to lock.
 */
export function metricBars(theme){
  return (theme?.metrics?.bars ?? []).map(b => ({
    key: String(b.key),
    label: String(b.label ?? b.key),
    start: clamp100(b.start ?? 100),
    lockFrom: Number.isFinite(b.lockFrom) ? b.lockFrom : null,
  }));
}

/** Does this theme run on metrics at all? Everything else keys off this. */
export function hasMetrics(theme){ return metricBars(theme).length > 0; }

const clamp100 = (n) => Math.max(0, Math.min(100, Math.round(n)));

/**
 * Starting values, on a fresh campaign.
 *
 * `locked` is a set of keys rather than a flag per bar, because a lock is a
 * campaign event — "Plant Integrity locked after Mission 10" — and reading it
 * back as a list is how the allocation screen greys the right rows.
 */
export function freshMetrics(theme){
  const out = { bars: {}, locked: [], bank: 0, awards: {} };
  for(const b of metricBars(theme)) out.bars[b.key] = b.start;
  return out;
}

/** The bar values, with anything missing filled in from the manifest. */
export function metricValues(theme, metrics){
  const out = {};
  for(const b of metricBars(theme)){
    const v = metrics?.bars?.[b.key];
    out[b.key] = Number.isFinite(v) ? clamp100(v) : b.start;
  }
  return out;
}

/**
 * Move the bars, and report what happened.
 *
 * @param deltas   `{ key: n }`, in percentage points. Zero and missing are the
 *                 same thing, and both are allowed: the bible writes
 *                 `Oxygen 0` for a mission that does not touch it.
 * @param opts.cause  what to name on screen. The bible is explicit that "the
 *                    event that caused every loss is named on screen", so a
 *                    delta with no cause is a number the player cannot argue
 *                    with.
 * @returns `{ changes: [{ key, from, to, delta, blocked }], collapsed: [keys] }`
 *          — `blocked` is a negative delta a lock refused, and `collapsed` is
 *          every bar that reached zero, which is a failed mission.
 */
export function applyDeltas(theme, metrics, deltas = {}, opts = {}){
  const locked = new Set(metrics?.locked ?? []);
  const changes = [], collapsed = [];
  for(const b of metricBars(theme)){
    const delta = Math.round(deltas[b.key] ?? 0);
    const from = clamp100(metrics.bars[b.key] ?? b.start);
    // A LOCKED BAR IGNORES LATER NEGATIVE DELTAS, and only negative ones: the
    // bible locks a bar at 100, so a positive delta on it is a no-op anyway and
    // reporting it as "blocked" would put a refusal on screen for nothing.
    const blocked = locked.has(b.key) && delta < 0;
    const to = blocked ? from : clamp100(from + delta);
    metrics.bars[b.key] = to;
    if(delta !== 0 || blocked) changes.push({ key: b.key, label: b.label, from, to, delta, blocked });
    if(to === 0) collapsed.push(b.key);
  }
  if(opts.cause) metrics.lastCause = String(opts.cause);
  return { changes, collapsed, cause: opts.cause ?? null };
}

/**
 * Which bars become eligible to lock, having reached 100 after their mission.
 *
 * ELIGIBLE, NOT LOCKED. The bible distinguishes them: a bar deliberately
 * reaches 100 without locking — Flight-Ready Methane does it in Mission 12 and
 * falls again in Mission 14 — and locking is a campaign event with a mission
 * number on it. So this reports what may lock and the caller decides.
 */
export function lockable(theme, metrics, mission){
  const locked = new Set(metrics?.locked ?? []);
  return metricBars(theme)
    .filter(b => b.lockFrom !== null && mission >= b.lockFrom)
    .filter(b => !locked.has(b.key))
    .filter(b => (metrics.bars[b.key] ?? 0) >= 100)
    .map(b => b.key);
}

/** Lock a bar for the rest of the campaign. Idempotent. */
export function lock(metrics, key){
  if(!Array.isArray(metrics.locked)) metrics.locked = [];
  if(!metrics.locked.includes(key)) metrics.locked.push(key);
}

/**
 * How the clock scores.
 *
 * `+1` at or under target, `0` over it but inside 125%, `-2` past that. The
 * boundaries are inclusive at the friendly end on purpose: finishing exactly on
 * target is finishing on target, and a player who lands on the second should not
 * be told they were late.
 */
export function timeModifier({ target, elapsed }){
  if(!(target > 0)) return 0;
  if(elapsed <= target) return 1;
  if(elapsed <= target * 1.25) return 0;
  return -2;
}

/**
 * `RP = clamp(4, 12, 11 + time_modifier - incorrect_submissions)`.
 *
 * The floor is the point: a mission answered badly and slowly still pays 4, so
 * the campaign cannot be walked into a state it can never recover from. The
 * ceiling is what stops a fast perfect run banking its way past a later loss.
 */
export function recoveryPoints(theme, { target, elapsed, incorrect = 0 }){
  const rp = theme?.metrics?.rp ?? {};
  const base = Number.isFinite(rp.base) ? rp.base : 11;
  const min = Number.isFinite(rp.min) ? rp.min : 4;
  const max = Number.isFinite(rp.max) ? rp.max : 12;
  const mod = timeModifier({ target, elapsed });
  const raw = base + mod - Math.max(0, Math.round(incorrect));
  return { rp: Math.max(min, Math.min(max, raw)), timeModifier: mod, raw, base, min, max };
}

/**
 * Bank an award for one mission, and hand back what it actually added.
 *
 * REPLAYING PAYS THE DIFFERENCE, NEVER THE WHOLE AWARD AGAIN. The bible says so
 * outright, and the alternative is a mission farmed for points. A worse replay
 * pays nothing and does not take the old award away.
 */
export function award(theme, metrics, mission, rp){
  const cap = theme?.metrics?.bank ?? 30;
  if(!metrics.awards) metrics.awards = {};
  const had = metrics.awards[mission] ?? 0;
  const gain = Math.max(0, rp - had);
  metrics.awards[mission] = Math.max(had, rp);
  const before = metrics.bank ?? 0;
  metrics.bank = Math.min(cap, before + gain);
  // Banked is not always granted: the cap can swallow part of an award, and the
  // screen has to be able to say so rather than showing a number that did not
  // arrive.
  return { gain, banked: metrics.bank - before, bank: metrics.bank, cap, previous: had };
}

/**
 * Spend banked points on one bar. One point, one percentage point.
 *
 * Refuses rather than truncates when the bar is locked or the bank is short:
 * a spend that silently does less than it said is worse than a greyed button,
 * and the panel rule in this repo is that a refusal has to say what is missing.
 */
export function spend(theme, metrics, key, points){
  const n = Math.max(0, Math.round(points));
  if(!n) return { ok: false, why: 'nothing to spend' };
  if(!metricBars(theme).some(b => b.key === key)) return { ok: false, why: `no bar "${key}"` };
  if((metrics.locked ?? []).includes(key)) return { ok: false, why: 'that bar is locked' };
  if((metrics.bank ?? 0) < n) return { ok: false, why: `only ${metrics.bank ?? 0} in the bank` };
  const from = metrics.bars[key] ?? 0;
  if(from >= 100) return { ok: false, why: 'that bar is already at 100%' };
  // Never spend a point that cannot land. A bar at 98 takes two and no more.
  const room = 100 - from;
  if(n > room) return { ok: false, why: `that bar has room for ${room}` };
  metrics.bars[key] = clamp100(from + n);
  metrics.bank -= n;
  return { ok: true, from, to: metrics.bars[key], spent: n, bank: metrics.bank };
}

/** The per-mission target and authored deltas, as the theme declared them. */
export function missionPlan(theme, mission){
  const list = theme?.metrics?.missions ?? [];
  return list[mission - 1] ?? null;
}

/**
 * WHAT WINNING LOOKS LIKE, in the campaign's own four names.
 *
 * Read off `theme.metrics.bars`, never written out, so a second campaign with
 * different metrics gets its own sentence from its own manifest rather than a
 * patch here. A campaign may override the wording with `theme.metrics.goal`,
 * where `{bars}` is where the list goes.
 *
 * The list is joined the way English joins a list — "A, B, C, and D" — with the
 * Oxford comma, because the four names are themselves multi-word and without it
 * "Power Reserve and Plant Integrity" reads as one thing.
 */
export function goalSentence(theme){
  const names = metricBars(theme).map(b => b.label);
  if(!names.length) return '';
  const list = names.length === 1 ? names[0]
    : names.length === 2 ? `${names[0]} and ${names[1]}`
    : `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
  const tpl = theme?.metrics?.goal
    ?? 'To complete this mission, you must make sure {bars} are all at 100%. Good luck.';
  return String(tpl).replace('{bars}', list);
}

/** mm:ss, for the timer line on the metric screen. */
export function clockText(seconds){
  const s = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

// --------------------------------------------------------------- selftest
//
//   node engine/core/metrics.js --selftest
//
// The arithmetic here decides a whole campaign and shows the player almost none
// of its working, so every rule the bible states in words has a case. The
// canonical example at the end is the bible's own QA line, reproduced number for
// number: if that one drifts, the model is not the model that was written.
if(typeof process !== 'undefined' && process.argv?.includes('--selftest')){
  const fails = [];
  let ran = 0;
  const check = (what, ok, extra = '') => {
    ran++;
    if(!ok) fails.push(`${what}${extra ? ` — ${extra}` : ''}`);
    console.log(`  ${ok ? 'ok  ' : 'FAIL'}  ${what}`);
  };

  const theme = {
    metrics: {
      bank: 30,
      rp: { base: 11, min: 4, max: 12 },
      bars: [
        { key: 'flight_ready_methane', label: 'Flight-ready methane', start: 82 },
        { key: 'ascent_oxygen', label: 'Ascent oxygen', start: 88, lockFrom: 13 },
        { key: 'power_reserve', label: 'Power reserve', start: 72 },
        { key: 'plant_integrity', label: 'Plant integrity', start: 70, lockFrom: 10 },
      ],
      missions: [{ target: 360, event: 'a shift spent on the ledger',
                   deltas: { flight_ready_methane: -2, power_reserve: -2, plant_integrity: 4 } }],
    },
  };

  // 1 — the bars open where the bible says
  const m = freshMetrics(theme);
  check('the four bars open at 82 / 88 / 72 / 70',
        m.bars.flight_ready_methane === 82 && m.bars.ascent_oxygen === 88
        && m.bars.power_reserve === 72 && m.bars.plant_integrity === 70);
  check('the bank opens empty', m.bank === 0);

  // 2 — deltas, clamping, and the zero that is not a change
  const one = applyDeltas(theme, m, theme.metrics.missions[0].deltas, { cause: 'the ledger' });
  check('mission 1 deltas land', m.bars.flight_ready_methane === 80
        && m.bars.power_reserve === 70 && m.bars.plant_integrity === 74);
  check('a bar the mission does not touch is left alone', m.bars.ascent_oxygen === 88);
  check('…and is not reported as a change',
        !one.changes.some(c => c.key === 'ascent_oxygen'),
        'a screen that lists "Oxygen 0" as an event is naming a thing that did not happen');
  check('the cause is carried, because a loss has to be named', one.cause === 'the ledger');

  const floor = freshMetrics(theme);
  applyDeltas(theme, floor, { power_reserve: -500 });
  check('a bar cannot go below zero', floor.bars.power_reserve === 0);
  check('…and reaching zero is reported as a collapse',
        applyDeltas(theme, freshMetrics(theme), { power_reserve: -72 }).collapsed
          .includes('power_reserve'));
  const ceil = freshMetrics(theme);
  applyDeltas(theme, ceil, { plant_integrity: 500 });
  check('a bar cannot go above 100', ceil.bars.plant_integrity === 100);

  // 3 — locks, and the deliberate absence of one
  const late = freshMetrics(theme);
  late.bars.plant_integrity = 100;
  check('integrity is not lockable before its mission', lockable(theme, late, 9).length === 0);
  check('…and is lockable at 100 after it', lockable(theme, late, 10).includes('plant_integrity'));
  check('methane never becomes lockable, by design',
        !lockable(theme, { bars: { flight_ready_methane: 100 }, locked: [] }, 15)
          .includes('flight_ready_methane'),
        'the bible has it reach 100 in mission 12 and fall in mission 14');
  lock(late, 'plant_integrity');
  const refused = applyDeltas(theme, late, { plant_integrity: -20 });
  check('a locked bar ignores a later loss', late.bars.plant_integrity === 100);
  check('…and the refusal is reported rather than silent',
        refused.changes.some(c => c.key === 'plant_integrity' && c.blocked));
  lock(late, 'plant_integrity');
  check('locking twice is one lock', late.locked.filter(k => k === 'plant_integrity').length === 1);

  // 4 — the clock
  check('on target is on target', timeModifier({ target: 360, elapsed: 360 }) === 1,
        'landing on the second is not late');
  check('under target pays +1', timeModifier({ target: 360, elapsed: 200 }) === 1);
  check('over target but inside 125% pays nothing',
        timeModifier({ target: 360, elapsed: 400 }) === 0);
  check('exactly 125% still pays nothing', timeModifier({ target: 360, elapsed: 450 }) === 0);
  check('past 125% costs 2', timeModifier({ target: 360, elapsed: 451 }) === -2);

  // 5 — RP, including both ends of the clamp
  check('fast and perfect pays the maximum',
        recoveryPoints(theme, { target: 360, elapsed: 300, incorrect: 0 }).rp === 12);
  check('one wrong answer inside target pays 11',
        recoveryPoints(theme, { target: 360, elapsed: 300, incorrect: 1 }).rp === 11);
  check('slow and wrong still pays the floor',
        recoveryPoints(theme, { target: 360, elapsed: 900, incorrect: 9 }).rp === 4,
        'a campaign that can be walked into an unrecoverable state has no floor');
  check('…and the floor is 4, not 0',
        recoveryPoints(theme, { target: 360, elapsed: 9000, incorrect: 99 }).rp === 4);

  // 6 — banking, the cap, and the replay rule
  const bank = freshMetrics(theme);
  check('a first award banks in full', award(theme, bank, 1, 12).gain === 12 && bank.bank === 12);
  check('a worse replay pays nothing', award(theme, bank, 1, 8).gain === 0 && bank.bank === 12,
        'the whole award again is a mission farmed for points');
  check('…and does not take the old award away', bank.awards[1] === 12);
  check('a better replay pays the difference',
        award(theme, bank, 1, 12) && award(theme, bank, 1, 12).gain === 0);
  const better = freshMetrics(theme);
  award(theme, better, 1, 8);
  check('a better replay pays exactly the difference', award(theme, better, 1, 11).gain === 3);
  const full = freshMetrics(theme);
  full.bank = 28;
  const capped = award(theme, full, 2, 12);
  check('the bank caps at 30', full.bank === 30);
  check('…and says how much of the award actually arrived', capped.banked === 2 && capped.gain === 12,
        'a screen showing 12 banked when 2 arrived is lying to the player');

  // 7 — spending, and every refusal
  const sp = freshMetrics(theme);
  sp.bank = 10;
  check('a point is a percentage point', spend(theme, sp, 'power_reserve', 4).ok
        && sp.bars.power_reserve === 76 && sp.bank === 6);
  check('spending more than the bank is refused',
        spend(theme, sp, 'power_reserve', 99).ok === false);
  check('…and says what is missing',
        /only 6 in the bank/.test(spend(theme, sp, 'power_reserve', 99).why),
        'a greyed refusal that does not say why is a button the player decides is broken');
  sp.bars.ascent_oxygen = 99;
  check('a bar takes only the room it has',
        spend(theme, sp, 'ascent_oxygen', 3).ok === false
        && /room for 1/.test(spend(theme, sp, 'ascent_oxygen', 3).why),
        'truncating the spend silently loses the points');
  check('…and takes exactly that room', spend(theme, sp, 'ascent_oxygen', 1).ok === true
        && sp.bars.ascent_oxygen === 100);
  check('a bar at 100 is refused', spend(theme, sp, 'ascent_oxygen', 1).ok === false);
  lock(sp, 'power_reserve');
  check('a locked bar cannot be spent on', spend(theme, sp, 'power_reserve', 1).ok === false);
  check('an unknown bar is refused', spend(theme, sp, 'nonsense', 1).ok === false);

  // 8 — THE GOAL SENTENCE, built from the bars and not written out
  check('the goal names all four bars, in order and with the Oxford comma',
        goalSentence(theme) === 'To complete this mission, you must make sure '
          + 'Flight-ready methane, Ascent oxygen, Power reserve, and Plant integrity '
          + 'are all at 100%. Good luck.');
  check('a campaign with two bars gets "A and B"',
        /make sure One and Two are all/.test(goalSentence({ metrics: { bars: [
          { key: 'a', label: 'One' }, { key: 'b', label: 'Two' }] } })),
        'a list of two takes no comma');
  check('a campaign with three gets the comma back',
        /make sure One, Two, and Three are/.test(goalSentence({ metrics: { bars: [
          { key: 'a', label: 'One' }, { key: 'b', label: 'Two' },
          { key: 'c', label: 'Three' }] } })));
  check('a campaign may write its own sentence',
        goalSentence({ metrics: { goal: 'Get {bars} home.', bars: [
          { key: 'a', label: 'One' }, { key: 'b', label: 'Two' }] } })
        === 'Get One and Two home.',
        'the wording is a campaign’s to choose; the names are its manifest’s to supply');
  check('a campaign with no bars says nothing', goalSentence({}) === '',
        'the sixty campaigns with no metrics may not be handed a sentence about bars');

  // 9 — mm:ss
  check('the clock reads mm:ss', clockText(360) === '06:00' && clockText(65) === '01:05'
        && clockText(0) === '00:00');

  // 10 — THE BIBLE'S OWN QA EXAMPLE, number for number.
  //
  // "0 incorrect, finished within target, 12 RP awarded. Spend: Methane +4;
  // Power +6. Result: METHANE 84% | OXYGEN 88% | POWER 76% | INTEGRITY 74%.
  // Recovery Bank: 2 RP."
  const qa = freshMetrics(theme);
  applyDeltas(theme, qa, theme.metrics.missions[0].deltas, { cause: 'x' });
  const got = recoveryPoints(theme, { target: 360, elapsed: 340, incorrect: 0 });
  check('QA: the award is 12 RP', got.rp === 12);
  award(theme, qa, 1, got.rp);
  spend(theme, qa, 'flight_ready_methane', 4);
  spend(theme, qa, 'power_reserve', 6);
  check('QA: the bars end at 84 / 88 / 76 / 74',
        qa.bars.flight_ready_methane === 84 && qa.bars.ascent_oxygen === 88
        && qa.bars.power_reserve === 76 && qa.bars.plant_integrity === 74,
        'this is the one line in the bible that pins the whole model to numbers');
  check('QA: 2 RP are left in the bank', qa.bank === 2);

  if(fails.length){
    console.log(`\nmetrics --selftest: ${fails.length} case(s) failed.`);
    for(const f of fails) console.log(`  - ${f}`);
    process.exitCode = 1;
  } else {
    console.log(`\nmetrics --selftest: ${ran} cases, and the bible's QA example to the point.`);
  }
}
